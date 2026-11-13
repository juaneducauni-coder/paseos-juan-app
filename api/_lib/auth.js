// Ingreso con usuario y PIN. Los PIN se guardan con scrypt + sal; la sesión es un token
// firmado con HMAC (AUTH_SECRET). Sin dependencias externas.
import { scryptSync, randomBytes, timingSafeEqual, createHmac } from "node:crypto";
import { HttpError } from "./http.js";
import { store } from "./store.js";

export const ROLES = ["admin", "coordinador", "supervisor", "paseador", "marketing"];
const SESSION_DAYS = 30;
const MAX_FAILS = 5;
const LOCK_MINUTES = 15;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (value && value.length >= 32) return value;
  if (process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview") {
    throw new HttpError(503, "Falta configurar la clave de sesiones (AUTH_SECRET).");
  }
  return "solo-para-desarrollo-local-no-usar-en-produccion-000";
}

export function hashPin(pin, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(String(pin), salt, 32).toString("hex");
  return { salt, hash };
}

export function checkPin(pin, salt, hash) {
  const candidate = scryptSync(String(pin), salt, 32);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

export function validatePin(pin) {
  if (!/^\d{6,8}$/.test(String(pin || ""))) {
    throw new HttpError(400, "El PIN tiene que tener entre 6 y 8 números.");
  }
  if (/^(\d)\1+$/.test(pin) || "0123456789".includes(pin) || "9876543210".includes(pin)) {
    throw new HttpError(400, "Ese PIN es muy fácil de adivinar. Elegí otro.");
  }
}

export function normalizeUser(usuario) {
  const value = String(usuario || "").trim().toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (!/^[a-z][a-z0-9._-]{2,30}$/.test(value)) {
    throw new HttpError(400, "El usuario tiene que tener entre 3 y 31 letras o números, sin espacios.");
  }
  return value;
}

const b64 = (value) => Buffer.from(value).toString("base64url");

function sign(payload) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function issueToken(user) {
  const payload = b64(JSON.stringify({
    u: user.usuario,
    r: user.rol,
    v: user.version || 1,
    exp: Date.now() + SESSION_DAYS * 24 * 3600 * 1000,
  }));
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  const [payload, signature] = String(token || "").split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  if (expected.length !== signature.length) return null;
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (!data.exp || data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export function publicUser(user) {
  if (!user) return null;
  const { usuario, nombre, rol, activo, creadoEn, ultimoIngreso, debeCambiarPin } = user;
  return { usuario, nombre, rol, activo, creadoEn, ultimoIngreso, debeCambiarPin: Boolean(debeCambiarPin) };
}

// Devuelve el usuario de la sesión o corta con 401/403.
export async function requireUser(req, roles = null) {
  const header = req.headers?.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const data = readToken(token);
  if (!data) throw new HttpError(401, "Tu sesión venció. Volvé a ingresar.");
  const user = await store.getUser(data.u);
  if (!user || !user.activo || (user.version || 1) !== data.v) {
    throw new HttpError(401, "Tu sesión ya no es válida. Volvé a ingresar.");
  }
  if (roles && !roles.includes(user.rol)) {
    throw new HttpError(403, "Tu usuario no tiene permiso para esto.");
  }
  return user;
}

export async function login(usuarioRaw, pin) {
  const usuario = normalizeUser(usuarioRaw);
  const user = await store.getUser(usuario);
  const generic = new HttpError(401, "Usuario o PIN incorrectos.");
  if (!user || !user.activo) throw generic;

  if (user.bloqueadoHasta && Date.parse(user.bloqueadoHasta) > Date.now()) {
    throw new HttpError(429, "Demasiados intentos. Esperá 15 minutos y probá de nuevo.");
  }
  if (!checkPin(pin, user.salt, user.hash)) {
    const fallos = (user.fallos || 0) + 1;
    const update = { ...user, fallos };
    if (fallos >= MAX_FAILS) {
      update.fallos = 0;
      update.bloqueadoHasta = new Date(Date.now() + LOCK_MINUTES * 60000).toISOString();
    }
    await store.putUser(update);
    throw generic;
  }
  const updated = { ...user, fallos: 0, bloqueadoHasta: null, ultimoIngreso: new Date().toISOString() };
  await store.putUser(updated);
  return { token: issueToken(updated), user: publicUser(updated) };
}
