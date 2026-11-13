// /api/archivos
// POST { tipo, archivo: { nombre, mime, base64 }, perroId?, perroNombre?, clienteId?, pedidoId?, nota? }
//   → sube el archivo (Drive o Vercel privado) y deja el registro en la colección "archivos".
// GET ?id=...  → devuelve el archivo (solo para quien puede ver la colección "archivos").
// La lista se pide como cualquier colección: /api/registros?col=archivos
import { handler, send, readJson, query, HttpError } from "./_lib/http.js";
import { requireUser } from "./_lib/auth.js";
import { store } from "./_lib/store.js";
import { puedeLeer, puedeEscribir, puedeVerArchivo, puedeSubirArchivo } from "./_lib/permisos.js";
import { guardarArchivo, TIPOS } from "./_lib/archivos.js";

export default handler({ GET: 1, POST: 1 }, async (req, res) => {
  const user = await requireUser(req);

  if (req.method === "POST") {
    if (!puedeEscribir(user.rol, "archivos")) throw new HttpError(403, "Tu usuario no puede subir archivos.");
    const body = await readJson(req, 5 * 1024 * 1024);
    if (!Object.prototype.hasOwnProperty.call(TIPOS, body.tipo)) throw new HttpError(400, "Tipo de archivo no válido.");
    if (!puedeSubirArchivo(user.rol, body.tipo)) throw new HttpError(403, "Tu usuario no puede subir este tipo de archivo.");
    const registro = await guardarArchivo(body, user);
    return send(res, 201, { ok: true, registro });
  }

  if (!puedeLeer(user.rol, "archivos")) throw new HttpError(403, "Tu usuario no puede ver archivos.");
  const id = query(req).get("id");
  if (!id) throw new HttpError(400, "Falta el identificador del archivo.");
  const meta = await store.get("archivos", id);
  if (!meta) throw new HttpError(404, "Ese archivo no existe.");
  if (!puedeVerArchivo(user.rol, meta)) {
    throw new HttpError(403, meta.tipo === "comprobante de pago" ? "Los comprobantes de pago los ve solo el admin." : "Tu usuario no puede ver este archivo.");
  }
  const buffer = await store.readFile(id, meta);
  if (!buffer) throw new HttpError(404, "No se encontró el archivo guardado.");
  res.statusCode = 200;
  res.setHeader("Content-Type", meta.mime);
  // Las fotos se muestran; lo demás (PDF) se descarga y, si igual se abre, queda aislado.
  const esImagen = /^image\//.test(String(meta.mime || ""));
  const nombre = String(meta.nombreArchivo || "archivo").replace(/["\\\r\n]/g, "");
  res.setHeader("Content-Disposition", `${esImagen ? "inline" : "attachment"}; filename="${nombre}"`);
  if (!esImagen) res.setHeader("Content-Security-Policy", "default-src 'none'; sandbox");
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.end(buffer);
});
