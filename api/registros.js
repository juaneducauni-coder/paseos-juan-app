// /api/registros — datos compartidos entre usuarios.
// GET    ?col=paseos&desde=2026-11-13      lista (opcional: desde=fecha, prefijo=texto)
// POST   { col, id?, fecha?, ...datos }    crea o actualiza si llega id
// DELETE ?col=pedidos&id=...               borra
import { randomBytes } from "node:crypto";
import { handler, send, readJson, query, HttpError } from "./_lib/http.js";
import { requireUser } from "./_lib/auth.js";
import { store } from "./_lib/store.js";
import { coleccion, puedeLeer, puedeEscribir } from "./_lib/permisos.js";

const ID = /^[a-z0-9][a-z0-9_.-]{0,100}$/i;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const RESERVADOS = ["col", "creadoPor", "creadoEn", "actualizadoPor", "actualizadoEn", "creadoPorNombre", "actualizadoPorNombre"];
const MAX_RECORD = 20 * 1024;

export function nuevoId(fecha) {
  const now = new Date();
  const stamp = now.toISOString().slice(11, 19).replace(/:/g, "");
  return `${fecha || now.toISOString().slice(0, 10)}_${stamp}_${randomBytes(3).toString("hex")}`;
}

function limpiar(datos) {
  const out = {};
  for (const [key, value] of Object.entries(datos || {})) {
    if (RESERVADOS.includes(key)) continue;
    if (!/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/.test(key)) continue;
    out[key] = value;
  }
  if (JSON.stringify(out).length > MAX_RECORD) throw new HttpError(413, "El registro es demasiado grande.");
  return out;
}

export default handler({ GET: 1, POST: 1, DELETE: 1 }, async (req, res) => {
  const user = await requireUser(req);
  const params = query(req);

  if (req.method === "GET") {
    const col = params.get("col");
    if (!coleccion(col)) throw new HttpError(400, "Colección desconocida.");
    if (!puedeLeer(user.rol, col)) throw new HttpError(403, "Tu usuario no puede ver estos datos.");
    const desde = params.get("desde");
    const prefijo = params.get("prefijo") || "";
    if (desde && !FECHA.test(desde)) throw new HttpError(400, "Fecha no válida (AAAA-MM-DD).");
    if (prefijo && !ID.test(prefijo)) throw new HttpError(400, "Prefijo no válido.");
    let registros = await store.list(col, prefijo);
    if (desde) registros = registros.filter((r) => (r.fecha || r.creadoEn?.slice(0, 10) || "") >= desde);
    registros.sort((a, b) => String(b.actualizadoEn || b.creadoEn).localeCompare(String(a.actualizadoEn || a.creadoEn)));
    return send(res, 200, { ok: true, registros });
  }

  if (req.method === "POST") {
    const body = await readJson(req);
    const col = body.col;
    if (!coleccion(col)) throw new HttpError(400, "Colección desconocida.");
    // Los archivos solo se crean subiéndolos por /api/archivos (así nadie inventa a qué archivo apunta).
    if (col === "archivos") throw new HttpError(400, "Los archivos se suben desde /api/archivos.");
    if (!puedeEscribir(user.rol, col)) throw new HttpError(403, "Tu usuario no puede cargar estos datos.");
    if (body.fecha && !FECHA.test(body.fecha)) throw new HttpError(400, "Fecha no válida (AAAA-MM-DD).");
    if (coleccion(col).porFecha && !body.fecha) throw new HttpError(400, "Falta la fecha.");
    const id = body.id ? String(body.id) : nuevoId(body.fecha);
    if (!ID.test(id)) throw new HttpError(400, "Identificador no válido.");

    const ahora = new Date().toISOString();
    const previo = body.id ? await store.get(col, id) : null;
    const registro = {
      ...(previo || {}),
      ...limpiar(body),
      id,
      col,
      creadoPor: previo?.creadoPor || user.usuario,
      creadoPorNombre: previo?.creadoPorNombre || user.nombre,
      creadoEn: previo?.creadoEn || ahora,
      actualizadoPor: user.usuario,
      actualizadoPorNombre: user.nombre,
      actualizadoEn: ahora,
    };
    await store.put(col, registro);
    return send(res, previo ? 200 : 201, { ok: true, registro });
  }

  // DELETE
  const col = params.get("col");
  const id = params.get("id");
  if (!coleccion(col)) throw new HttpError(400, "Colección desconocida.");
  if (!id || !ID.test(id)) throw new HttpError(400, "Identificador no válido.");
  const previo = await store.get(col, id);
  if (!previo) return send(res, 200, { ok: true, borrado: false });
  const esDueno = previo.creadoPor === user.usuario && Date.now() - Date.parse(previo.creadoEn) < 24 * 3600 * 1000;
  if (user.rol !== "admin" && !(esDueno && puedeEscribir(user.rol, col))) {
    throw new HttpError(403, "Solo el admin, o quien lo cargó en las últimas 24 horas, puede borrarlo.");
  }
  await store.remove(col, id);
  return send(res, 200, { ok: true, borrado: true });
});
