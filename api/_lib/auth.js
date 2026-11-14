// Ingreso con usuario y PIN. Los PIN se guardan con scrypt + sal; la sesión es un token
// firmado con HMAC (AUTH_SECRET). Sin dependencias externas.
import { scryptSync, randomBytes, timingSafeEqual, createHmac, createHash } from "node:crypto";
import { HttpError } from "./http.js";
import { store } from "./store.js";

export const ROLES = ["admin", "coordinador", "supervisor", "paseador", "ayudante", "marketing"];
const SESSION_DAYS = 30;
// Portal del cliente: entra por un enlace (sin PIN) y la sesión dura 90 días.
export const ROL_CLIENTE = "cliente";
const CLIENT_SESSION_DAYS = 90;
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

// Sesión del cliente (portal): lleva el id del cliente y la fecha en que se creó su enlace.
// Si el enlace se revoca o se genera uno nuevo, la sesión deja de valer.
export function issueClientToken(clienteId, acceso) {
  const payload = b64(JSON.stringify({
    c: clienteId,
    r: ROL_CLIENTE,
    v: acceso.creadoEn,
    exp: Date.now() + CLIENT_SESSION_DAYS * 24 * 3600 * 1000,
  }));
  return `${payload}.${sign(payload)}`;
}

// Enlace del cliente: token aleatorio fuerte. En el servidor se guarda SOLO su hash.
export function nuevoTokenCliente() {
  return randomBytes(32).toString("base64url");
}

export function hashTokenCliente(token) {
  return createHash("sha256").update(String(token)).digest("hex");
}

export const TOKEN_CLIENTE = /^[A-Za-z0-9_-]{43}$/;

// Ids de los perros de un cliente (acepta ["PJ-001"] o [{ id: "PJ-001" }]).
export function perrosDeCliente(cliente) {
  const lista = Array.isArray(cliente?.perros) ? cliente.perros : [];
  return lista.map((p) => String(p && typeof p === "object" ? p.id || p.perroId || "" : p || "").trim()).filter(Boolean);
}

export function usuarioCliente(cliente) {
  return {
    usuario: `cliente:${cliente.id}`,
    nombre: String(cliente.nombre || "Cliente"),
    rol: ROL_CLIENTE,
    clienteId: cliente.id,
    perros: perrosDeCliente(cliente),
  };
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
  if (user.rol === ROL_CLIENTE) {
    const { usuario, nombre, rol, clienteId, perros } = user;
    return { usuario, nombre, rol, clienteId, perros };
  }
  const { usuario, nombre, rol, activo, creadoEn, ultimoIngreso, debeCambiarPin, google } = user;
  return { usuario, nombre, rol, activo, creadoEn, ultimoIngreso, debeCambiarPin: Boolean(debeCambiarPin), google: google || "" };
}

// Devuelve el usuario de la sesión o corta con 401/403.
// Acepta también la sesión del cliente (portal): { usuario: "cliente:<id>", nombre, rol: "cliente", clienteId, perros }.
export async function requireUser(req, roles = null) {
  const header = req.headers?.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const data = readToken(token);
  if (!data) throw new HttpError(401, "Tu sesión venció. Volvé a ingresar.");
  if (data.r === ROL_CLIENTE) {
    if (!data.c || !/^[a-z0-9][a-z0-9_.-]{0,100}$/i.test(String(data.c))) throw new HttpError(401, "Tu sesión ya no es válida.");
    const cliente = await store.get("clientes", data.c);
    if (!cliente || !cliente.acceso?.activo || cliente.acceso.creadoEn !== data.v) {
      throw new HttpError(401, "Este enlace ya no está activo. Pedile uno nuevo a Paseos Juan.");
    }
    if (roles && !roles.includes(ROL_CLIENTE)) throw new HttpError(403, "Tu usuario no tiene permiso para esto.");
    return usuarioCliente({ ...cliente, id: data.c });
  }
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
