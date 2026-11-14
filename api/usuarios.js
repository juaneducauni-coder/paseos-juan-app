// /api/usuarios — solo admin.
// GET                                   lista de usuarios (sin PIN)
// POST { usuario, nombre, rol, pin }    crea o actualiza (si no llega pin, lo deja igual)
// DELETE ?usuario=...                   desactiva (no borra: queda el historial)
import { handler, send, readJson, query, HttpError } from "./_lib/http.js";
import { requireUser, hashPin, validatePin, normalizeUser, publicUser, issueToken, ROLES } from "./_lib/auth.js";
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
    // "cliente…" queda reservado para el portal del cliente y "__" separa los chats directos.
    if (!previo && (usuario.startsWith("cliente") || usuario.includes("__"))) {
      throw new HttpError(400, "Ese nombre de usuario no se puede usar. Elegí otro.");
    }
    if (body.crear && previo) throw new HttpError(409, "Ese usuario ya existe. Elegí otro nombre de usuario.");
    const rol = body.rol || previo?.rol;
    if (!ROLES.includes(rol)) throw new HttpError(400, "Rol no válido.");
    const nombre = String(body.nombre || previo?.nombre || "").trim().slice(0, 60);
    if (nombre.length < 2) throw new HttpError(400, "Escribí el nombre.");
    if (usuario === admin.usuario && rol !== "admin") {
      throw new HttpError(400, "No podés sacarte el rol de admin a vos mismo.");
    }
    // Gmail vinculado para "Entrar con Google" (opcional). "" lo desvincula.
    let google = previo?.google || "";
    if (body.google !== undefined) {
      google = String(body.google || "").trim().toLowerCase();
      if (google && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(google)) throw new HttpError(400, "El correo de Google no es válido.");
      if (google) {
        const otro = (await store.listUsers()).find((u) => u.google === google && u.usuario !== usuario);
        if (otro) throw new HttpError(409, "Ese correo ya está vinculado a otro usuario.");
      }
    }
    let credenciales = previo ? { salt: previo.salt, hash: previo.hash } : null;
    let version = previo?.version || 1;
    if (body.pin) {
      validatePin(body.pin);
      credenciales = hashPin(body.pin);
      version += previo ? 1 : 0;
    }
    if (!credenciales) throw new HttpError(400, "Falta el PIN inicial.");
    // Cambiar o desvincular un Gmail ya vinculado cierra las sesiones abiertas (incluidas las que
    // se abrieron con ese Gmail). Vincular uno por primera vez no hace falta: no había sesiones con él.
    const cambioGoogle = Boolean(previo?.google) && google !== previo.google;
    const user = {
      ...(previo || {}),
      usuario,
      nombre,
      rol,
      activo: body.activo === undefined ? previo?.activo ?? true : Boolean(body.activo),
      ...credenciales,
      google,
      version: version + (cambioGoogle ? 1 : 0) + (body.activo === false ? 1 : 0),
      fallos: 0,
      bloqueadoHasta: null,
      debeCambiarPin: body.pin ? true : previo?.debeCambiarPin || false,
      creadoEn: previo?.creadoEn || new Date().toISOString(),
      creadoPor: previo?.creadoPor || admin.usuario,
    };
    await store.putUser(user);
    // Si el admin se cambió su propio Gmail, su sesión se cerró: le damos una nueva.
    const propia = usuario === admin.usuario && user.version !== (previo?.version || 1);
    return send(res, previo ? 200 : 201, { ok: true, usuario: publicUser(user), ...(propia ? { token: issueToken(user) } : {}) });
  }

  const usuario = normalizeUser(query(req).get("usuario"));
  if (usuario === admin.usuario) throw new HttpError(400, "No podés desactivar tu propio usuario.");
  const previo = await store.getUser(usuario);
  if (!previo) throw new HttpError(404, "Ese usuario no existe.");
  // Parche (no reescribe todo): un ingreso en curso no puede deshacer la desactivación.
  await store.patchUser(usuario, { activo: false, version: (previo.version || 1) + 1 });
  return send(res, 200, { ok: true });
});
