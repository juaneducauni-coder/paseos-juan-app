// POST /api/auth/setup { nombre, usuario, pin, codigo }
// Crea el primer usuario admin. Solo funciona si todavía no hay ningún usuario y:
// - en desarrollo local, o
// - en una versión de prueba de Vercel sin SETUP_CODE (protegida con la cuenta de Vercel), o
// - con el código SETUP_CODE (obligatorio en producción y en todo Vercel si está configurado).
import { handler, send, readJson, HttpError } from "../../_lib/http.js";
import { hashPin, validatePin, normalizeUser, issueToken, publicUser } from "../../_lib/auth.js";
import { store } from "../../_lib/store.js";

export default handler({ POST: 1 }, async (req, res) => {
  const body = await readJson(req);
  const users = await store.listUsers();
  if (users.length > 0) throw new HttpError(409, "La app ya tiene usuarios. Ingresá con el tuyo.");

  const env = process.env.VERCEL_ENV;
  const codeOk = process.env.SETUP_CODE && body.codigo === process.env.SETUP_CODE;
  // En producción siempre; en cualquier despliegue de Vercel (preview incluido) si hay código configurado.
  const pideCodigo = env === "production" || Boolean(process.env.VERCEL && process.env.SETUP_CODE);
  if (pideCodigo && !codeOk) {
    throw new HttpError(403, "El primer usuario se crea desde la versión de prueba o con el código de configuración.");
  }

  const nombre = String(body.nombre || "").trim().slice(0, 60);
  if (nombre.length < 2) throw new HttpError(400, "Escribí tu nombre.");
  const usuario = normalizeUser(body.usuario);
  validatePin(body.pin);
  const { salt, hash } = hashPin(body.pin);
  const user = {
    usuario,
    nombre,
    rol: "admin",
    activo: true,
    salt,
    hash,
    version: 1,
    creadoEn: new Date().toISOString(),
    creadoPor: "configuracion-inicial",
  };
  await store.putUser(user);
  send(res, 201, { ok: true, token: issueToken(user), user: publicUser(user) });
});
