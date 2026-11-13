// /api/usuarios — solo admin.
// GET                                   lista de usuarios (sin PIN)
// POST { usuario, nombre, rol, pin }    crea o actualiza (si no llega pin, lo deja igual)
// DELETE ?usuario=...                   desactiva (no borra: queda el historial)
import { handler, send, readJson, query, HttpError } from "./_lib/http.js";
import { requireUser, hashPin, validatePin, normalizeUser, publicUser, ROLES } from "./_lib/auth.js";
import { store } from "./_lib/store.js";

export default handler({ GET: 1, POST: 1, DELETE: 1 }, async (req, res) => {
  const admin = await requireUser(req, ["admin"]);

  if (req.method === "GET") {
    const users = (await store.listUsers()).map(publicUser).sort((a, b) => a.nombre.localeCompare(b.nombre));
    return send(res, 200, { ok: true, usuarios: users });
  }

  if (req.method === "POST") {
    const body = await readJson(req);
    const usuario = normalizeUser(body.usuario);
    const previo = await store.getUser(usuario);
    const rol = body.rol || previo?.rol;
    if (!ROLES.includes(rol)) throw new HttpError(400, "Rol no válido.");
    const nombre = String(body.nombre || previo?.nombre || "").trim().slice(0, 60);
    if (nombre.length < 2) throw new HttpError(400, "Escribí el nombre.");
    if (usuario === admin.usuario && rol !== "admin") {
      throw new HttpError(400, "No podés sacarte el rol de admin a vos mismo.");
    }
    let credenciales = previo ? { salt: previo.salt, hash: previo.hash } : null;
    let version = previo?.version || 1;
    if (body.pin) {
      validatePin(body.pin);
      credenciales = hashPin(body.pin);
      version += previo ? 1 : 0;
    }
    if (!credenciales) throw new HttpError(400, "Falta el PIN inicial.");
    const user = {
      ...(previo || {}),
      usuario,
      nombre,
      rol,
      activo: body.activo === undefined ? previo?.activo ?? true : Boolean(body.activo),
      ...credenciales,
      version: body.activo === false ? version + 1 : version,
      fallos: 0,
      bloqueadoHasta: null,
      debeCambiarPin: body.pin ? true : previo?.debeCambiarPin || false,
      creadoEn: previo?.creadoEn || new Date().toISOString(),
      creadoPor: previo?.creadoPor || admin.usuario,
    };
    await store.putUser(user);
    return send(res, previo ? 200 : 201, { ok: true, usuario: publicUser(user) });
  }

  const usuario = normalizeUser(query(req).get("usuario"));
  if (usuario === admin.usuario) throw new HttpError(400, "No podés desactivar tu propio usuario.");
  const previo = await store.getUser(usuario);
  if (!previo) throw new HttpError(404, "Ese usuario no existe.");
  await store.putUser({ ...previo, activo: false, version: (previo.version || 1) + 1 });
  return send(res, 200, { ok: true });
});
