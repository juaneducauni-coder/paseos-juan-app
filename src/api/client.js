// Cliente del servidor de Paseos Juan: sesión, datos compartidos y cola sin conexión.
//
// Uso en las vistas:
//   import { session, registros, onDataChange } from "../api/client.js";
//   session.user()                         → { usuario, nombre, rol } o null
//   await registros.list("paseos", { desde: "2026-11-13" })  → array (usa caché)
//   registros.cached("paseos")             → último resultado sin esperar (o [])
//   await registros.save("paseos", { id, fecha, ... })      → guarda (o encola si no hay señal)
//   await registros.remove("pedidos", id)
//   onDataChange((col) => ...)             → avisa cuando llegan datos nuevos de una colección
//   registros.watch("paseos", { desde })   → refresca cada minuto mientras la pestaña está visible

const SESSION_KEY = "pj_sesion";
const OUTBOX_KEY = "pj_pendientes";
const CACHE_PREFIX = "pj_cache_";
const POLL_MS = 60 * 1000;

const listeners = new Set();
const watchers = new Map();

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento disponible: se sigue trabajando en memoria.
  }
}

function emit(col) {
  listeners.forEach((fn) => {
    try {
      fn(col);
    } catch (error) {
      console.error(error);
    }
  });
}

export function onDataChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = session.token();
  if (auth && token) headers.Authorization = `Bearer ${token}`;
  let response;
  try {
    response = await fetch(path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  } catch {
    throw new ApiError(0, "Sin conexión. Revisá la señal.");
  }
  let data = {};
  try {
    data = await response.json();
  } catch {
    data = { ok: false, error: "El servidor no respondió bien." };
  }
  if (response.status === 401 && auth && token) {
    session.clear();
    emit("sesion");
  }
  if (!response.ok || data.ok === false) throw new ApiError(response.status, data.error || "Error del servidor.");
  return data;
}

// ---------- Sesión ----------
export const session = {
  token: () => readJson(SESSION_KEY, null)?.token || null,
  user: () => readJson(SESSION_KEY, null)?.user || null,
  set(token, user) {
    writeJson(SESSION_KEY, { token, user });
    emit("sesion");
  },
  clear() {
    try {
      localStorage.removeItem(SESSION_KEY);
      Object.keys(localStorage).filter((k) => k.startsWith(CACHE_PREFIX)).forEach((k) => localStorage.removeItem(k));
    } catch {
      // nada
    }
  },
  async status() {
    return request("/api/auth/me", { auth: false });
  },
  async login(usuario, pin) {
    const data = await request("/api/auth/login", { method: "POST", body: { usuario, pin }, auth: false });
    session.set(data.token, data.user);
    return data.user;
  },
  async setup({ nombre, usuario, pin, codigo }) {
    const data = await request("/api/auth/setup", { method: "POST", body: { nombre, usuario, pin, codigo }, auth: false });
    session.set(data.token, data.user);
    return data.user;
  },
  async refresh() {
    const token = session.token();
    if (!token) return null;
    const data = await request("/api/auth/me");
    // Solo si la sesión sigue siendo la misma (pudo cerrarse mientras tanto).
    if (data.user && session.token() === token) session.set(token, data.user);
    return data.user;
  },
  async changePin(actual, nuevo) {
    const data = await request("/api/auth/pin", { method: "POST", body: { actual, nuevo } });
    session.set(data.token, data.user);
    return data.user;
  },
  logout() {
    session.clear();
    emit("sesion");
  },
};

// Qué páginas puede abrir cada rol. El admin ve todo.
export const ROLE_PAGES = {
  admin: ["admin", "coordinador", "supervisor", "paseador", "cliente"],
  coordinador: ["coordinador", "cliente"],
  supervisor: ["supervisor", "paseador", "cliente"],
  paseador: ["paseador"],
  marketing: [],
};

export function homeFor(rol) {
  return { admin: "/admin", coordinador: "/coordinador", supervisor: "/supervisor", paseador: "/paseador" }[rol] || "/";
}

// ---------- Usuarios (solo admin) ----------
export const usuarios = {
  list: async () => (await request("/api/usuarios")).usuarios,
  save: async (datos) => (await request("/api/usuarios", { method: "POST", body: datos })).usuario,
  deactivate: (usuario) => request(`/api/usuarios?usuario=${encodeURIComponent(usuario)}`, { method: "DELETE" }),
};

// ---------- Datos compartidos ----------
function cacheKey(col, opts = {}) {
  return `${CACHE_PREFIX}${col}_${opts.desde || ""}_${opts.prefijo || ""}`;
}

function mergePending(col, list) {
  const pending = readJson(OUTBOX_KEY, []).filter((p) => p.col === col && p.op === "save");
  if (!pending.length) return list;
  const byId = new Map(list.map((r) => [r.id, r]));
  pending.forEach((p) => byId.set(p.data.id, { ...(byId.get(p.data.id) || {}), ...p.data, pendiente: true }));
  return [...byId.values()];
}

export const registros = {
  cached(col, opts = {}) {
    return mergePending(col, readJson(cacheKey(col, opts), []));
  },

  async list(col, opts = {}) {
    const params = new URLSearchParams({ col });
    if (opts.desde) params.set("desde", opts.desde);
    if (opts.prefijo) params.set("prefijo", opts.prefijo);
    try {
      const data = await request(`/api/registros?${params}`);
      const before = localStorage.getItem(cacheKey(col, opts));
      writeJson(cacheKey(col, opts), data.registros);
      if (before !== JSON.stringify(data.registros)) emit(col);
      return mergePending(col, data.registros);
    } catch (error) {
      if (error.status === 0) return registros.cached(col, opts);
      throw error;
    }
  },

  // Guarda un registro. Si no hay señal, queda en la cola y se envía después.
  async save(col, data) {
    const record = { ...data };
    if (!record.id) record.id = localId(record.fecha);
    try {
      const result = await request("/api/registros", { method: "POST", body: { col, ...record } });
      updateCaches(col, result.registro);
      emit(col);
      return result.registro;
    } catch (error) {
      if (error.status !== 0) throw error;
      const outbox = readJson(OUTBOX_KEY, []).filter((p) => !(p.col === col && p.data.id === record.id));
      outbox.push({ op: "save", col, data: record, at: Date.now() });
      writeJson(OUTBOX_KEY, outbox);
      emit(col);
      return { ...record, pendiente: true };
    }
  },

  async remove(col, id) {
    await request(`/api/registros?col=${encodeURIComponent(col)}&id=${encodeURIComponent(id)}`, { method: "DELETE" });
    Object.keys(localStorage).filter((k) => k.startsWith(`${CACHE_PREFIX}${col}_`)).forEach((k) => {
      writeJson(k, readJson(k, []).filter((r) => r.id !== id));
    });
    emit(col);
  },

  pendingCount() {
    return readJson(OUTBOX_KEY, []).length;
  },

  // Refresca cada minuto mientras la pestaña está visible. Devuelve una función para cortar.
  watch(col, opts = {}) {
    const key = cacheKey(col, opts);
    if (watchers.has(key)) return watchers.get(key);
    const tick = () => {
      if (document.visibilityState === "visible" && session.token()) registros.list(col, opts).catch(() => {});
    };
    tick();
    const timer = setInterval(tick, POLL_MS);
    const stop = () => {
      clearInterval(timer);
      watchers.delete(key);
    };
    watchers.set(key, stop);
    return stop;
  },
};

function localId(fecha) {
  const day = fecha || new Date().toISOString().slice(0, 10);
  const rand = Math.random().toString(16).slice(2, 8);
  return `${day}_${Date.now().toString(36)}_${rand}`;
}

function updateCaches(col, record) {
  Object.keys(localStorage).filter((k) => k.startsWith(`${CACHE_PREFIX}${col}_`)).forEach((k) => {
    const list = readJson(k, []);
    const index = list.findIndex((r) => r.id === record.id);
    if (index >= 0) list[index] = record;
    else list.unshift(record);
    writeJson(k, list);
  });
}

// Envía lo que quedó pendiente por falta de señal.
export async function flushPending() {
  const outbox = readJson(OUTBOX_KEY, []);
  if (!outbox.length || !session.token()) return 0;
  const left = [];
  for (const item of outbox) {
    try {
      if (item.op === "save") {
        const result = await request("/api/registros", { method: "POST", body: { col: item.col, ...item.data } });
        updateCaches(item.col, result.registro);
        emit(item.col);
      }
    } catch (error) {
      if (error.status === 0) left.push(item);
      // Otros errores (permiso, datos inválidos) no se reintentan para no trabar la cola.
    }
  }
  writeJson(OUTBOX_KEY, left);
  return outbox.length - left.length;
}

window.addEventListener("online", () => flushPending());
setInterval(() => flushPending(), 30 * 1000);

// Formulario público de evaluación (no requiere sesión).
export async function enviarEvaluacion(datos) {
  return request("/api/publico/evaluacion", { method: "POST", body: datos, auth: false });
}

// Fecha de hoy en Argentina en formato AAAA-MM-DD.
export function hoyAR(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  return parts;
}
