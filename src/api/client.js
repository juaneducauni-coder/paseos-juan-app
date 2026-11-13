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
// Cada cuánto se buscan datos nuevos. Con la planilla de Google: cada minuto. Con el
// almacenamiento provisorio de Vercel (cupo gratis chico): cada 5 minutos.
let POLL_MS = 60 * 1000;
fetch("/api/salud")
  .then((r) => r.json())
  .then((data) => {
    if (/provisorio/i.test(data.almacenamiento || "")) POLL_MS = 5 * 60 * 1000;
  })
  .catch(() => {});

const listeners = new Set();
const watchers = new Map();
const ticks = new Set();
// Al volver a la pestaña o desbloquear el celular, se piden los datos nuevos enseguida.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") ticks.forEach((tick) => tick());
});

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
  ayudante: ["paseador"],
  marketing: [],
};

export const ROLE_LABELS = {
  admin: "Admin",
  coordinador: "Coordinador",
  supervisor: "Supervisor",
  paseador: "Paseador",
  ayudante: "Ayudante de paseador",
  marketing: "Marketing",
};

export function homeFor(rol) {
  return { admin: "/admin", coordinador: "/coordinador", supervisor: "/supervisor", paseador: "/paseador", ayudante: "/paseador" }[rol] || "/";
}

// ---------- Usuarios (solo admin) ----------
export const usuarios = {
  list: async () => (await request("/api/usuarios")).usuarios,
  save: async (datos) => {
    const data = await request("/api/usuarios", { method: "POST", body: datos });
    // El servidor manda un token nuevo si el admin se cambió su propio Gmail o PIN (cierra sesiones).
    if (data.token) session.set(data.token, data.usuario);
    return data.usuario;
  },
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
      // Si ya había un cambio pendiente del mismo registro, se combinan (no se pierde el anterior).
      const all = readJson(OUTBOX_KEY, []);
      const prev = all.find((p) => p.col === col && p.data.id === record.id);
      const outbox = all.filter((p) => p !== prev && !(p.col === col && p.data.id === record.id));
      outbox.push({ op: "save", col, data: { ...(prev?.data || {}), ...record }, usuario: session.user()?.usuario, at: Date.now() });
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
    ticks.add(tick);
    let timer = setInterval(tick, POLL_MS);
    // Si el intervalo cambia (se detectó el almacenamiento), se reprograma una vez.
    setTimeout(() => {
      clearInterval(timer);
      timer = setInterval(tick, POLL_MS);
    }, 3000);
    const stop = () => {
      ticks.delete(tick);
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
let flushing = false;

export async function flushPending() {
  if (flushing || !session.token()) return 0;
  const me = session.user()?.usuario;
  const outbox = readJson(OUTBOX_KEY, []);
  if (!outbox.length) return 0;
  flushing = true;
  const done = new Set();
  const touched = new Set();
  try {
    for (const item of outbox) {
      // Lo que dejó pendiente otra persona en este mismo celular no se envía con mi usuario.
      if (item.usuario && item.usuario !== me) {
        done.add(item.at);
        continue;
      }
      try {
        if (item.op === "save") {
          const result = await request("/api/registros", { method: "POST", body: { col: item.col, ...item.data } });
          updateCaches(item.col, result.registro);
          touched.add(item.col);
        }
        done.add(item.at);
      } catch (error) {
        // Sin señal: queda para después. Otros errores (permiso, datos inválidos) no se reintentan.
        if (error.status !== 0) done.add(item.at);
      }
    }
  } finally {
    // Se saca solo lo procesado: lo que se encoló mientras tanto queda en la cola.
    writeJson(OUTBOX_KEY, readJson(OUTBOX_KEY, []).filter((i) => !done.has(i.at)));
    flushing = false;
    touched.forEach((col) => emit(col));
  }
  return done.size;
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

// ---------- Archivos (carnet de vacunas, comprobantes, documentos, fotos) ----------
// Las fotos se achican en el celular antes de subir (máx. 1600 px, JPG): un carnet pesa ~300 KB.
const MAX_LADO = 1600;

async function achicarImagen(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const escala = Math.min(1, MAX_LADO / Math.max(bitmap.width, bitmap.height));
    if (escala === 1 && file.size < 900 * 1024) return file;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * escala);
    canvas.height = Math.round(bitmap.height * escala);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

function aBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new ApiError(400, "No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

// Prepara un archivo del <input type="file"> para mandarlo al servidor.
export async function prepararArchivo(file) {
  if (!file) throw new ApiError(400, "Elegí un archivo.");
  if (!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(file.type)) {
    throw new ApiError(400, "Solo se aceptan fotos (JPG, PNG, WEBP) o PDF.");
  }
  const listo = await achicarImagen(file);
  if (listo.size > 3.5 * 1024 * 1024) throw new ApiError(413, "El archivo es muy pesado (máximo 3,5 MB).");
  return { nombre: listo.name, mime: listo.type, base64: await aBase64(listo) };
}

export const archivos = {
  // tipo: "carnet de vacunas" | "comprobante de pago" | "documento" | "foto"
  // datos: { perroId, perroNombre, clienteId, pedidoId, nota }
  async subir(tipo, file, datos = {}) {
    const archivo = await prepararArchivo(file);
    const result = await request("/api/archivos", { method: "POST", body: { tipo, archivo, ...datos } });
    updateCaches("archivos", result.registro);
    emit("archivos");
    return result.registro;
  },
  // Abre el archivo en una pestaña nueva (lo baja con la sesión, no queda público).
  async abrir(id) {
    const ventana = window.open("", "_blank");
    if (!ventana) {
      throw new ApiError(0, "El navegador bloqueó la ventana nueva: permití las ventanas emergentes de esta página para ver el archivo.");
    }
    try {
      const response = await fetch(`/api/archivos?id=${encodeURIComponent(id)}`, {
        headers: { Authorization: `Bearer ${session.token()}` },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new ApiError(response.status, data.error || "No se pudo abrir el archivo.");
      }
      const url = URL.createObjectURL(await response.blob());
      ventana.location.href = url;
      setTimeout(() => URL.revokeObjectURL(url), 60 * 1000);
    } catch (error) {
      ventana?.close();
      throw error;
    }
  },
};

// ---------- Fotos de los perros ----------
// Cada perro tiene una foto de perfil: la grande queda en archivos (Drive), y una miniatura
// liviana (~15 KB) en la colección "fotos" (id = id del perro) para mostrar en todas las listas.
async function miniaturaDe(file, lado = 240) {
  const bitmap = await createImageBitmap(file);
  const min = Math.min(bitmap.width, bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = lado;
  canvas.height = lado;
  // Recorte cuadrado al centro.
  canvas.getContext("2d").drawImage(bitmap, (bitmap.width - min) / 2, (bitmap.height - min) / 2, min, min, 0, 0, lado, lado);
  return canvas.toDataURL("image/jpeg", 0.72);
}

export const fotosPerros = {
  // Devuelve la miniatura (data URL) del perro o null.
  de(perroId) {
    if (!perroId) return null;
    const foto = registros.cached("fotos").find((f) => f.id === perroId || f.perroId === perroId);
    return foto?.miniatura || null;
  },
  // Saca/elige foto → sube la grande (necesita señal) y guarda la miniatura.
  async subir(perroId, perroNombre, file) {
    if (!perroId) throw new ApiError(400, "Falta el perro.");
    if (!file || !/^image\//.test(file.type)) throw new ApiError(400, "Elegí una foto.");
    const miniatura = await miniaturaDe(file);
    const grande = await archivos.subir("foto", file, { perroId, perroNombre, nota: "Foto de perfil" });
    return registros.save("fotos", { id: perroId, perroId, perroNombre, miniatura, archivoId: grande.id });
  },
};

// ---------- Iniciar sesión con Google ----------
// Necesita GOOGLE_CLIENT_ID configurado en Vercel (lo informa /api/salud). Si no está, no se muestra nada.
let googleConfig = null;

async function googleClientIdPublico() {
  if (googleConfig) return googleConfig;
  googleConfig = fetch("/api/salud")
    .then((r) => r.json())
    .then((d) => d.googleClientId || null)
    .catch(() => null);
  return googleConfig;
}

function cargarScriptGoogle() {
  if (window.google?.accounts?.id) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existente = document.querySelector('script[data-gsi]');
    if (existente) {
      existente.addEventListener("load", () => resolve());
      return;
    }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.dataset.gsi = "1";
    s.onload = () => resolve();
    s.onerror = () => reject(new ApiError(0, "No se pudo cargar Google."));
    document.head.appendChild(s);
  });
}

// Dibuja el botón oficial de Google dentro de `contenedor`. onCredential recibe el ID token.
// Devuelve false si Google no está activado (el contenedor queda vacío).
export async function botonGoogle(contenedor, onCredential, { texto = "continue_with" } = {}) {
  const clientId = await googleClientIdPublico();
  if (!clientId || !contenedor) return false;
  await cargarScriptGoogle();
  window.google.accounts.id.initialize({ client_id: clientId, callback: (r) => onCredential(r.credential), ux_mode: "popup" });
  const oscuro = document.documentElement.dataset.theme === "dark";
  window.google.accounts.id.renderButton(contenedor, {
    type: "standard",
    theme: oscuro ? "filled_black" : "outline",
    size: "large",
    text: texto,
    shape: "pill",
    locale: "es",
    width: Math.min(contenedor.clientWidth || 320, 400),
  });
  return true;
}

session.loginGoogle = async function loginGoogle(credential) {
  const data = await request("/api/auth/google", { method: "POST", body: { credential }, auth: false });
  session.set(data.token, data.user);
  return data.user;
};

// ---------- Foto del paseo (reemplaza el botón "En paseo") ----------
// Sacar la foto marca el paseo: guarda la foto (tipo "foto", nota "Foto del paseo") y actualiza
// el registro de "paseos" con estado "paseando", horaPaseo y fotoPaseoId.
// Sin señal: el paseo se marca igual (queda en la cola de siempre) y la foto queda guardada
// en el celular y se sube sola cuando vuelve la señal.
const FOTOS_PENDIENTES_KEY = "pj_fotos_paseo_pendientes";

function horaAR(date = new Date()) {
  return new Intl.DateTimeFormat("es-AR", { timeZone: "America/Argentina/Buenos_Aires", hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}

export const fotosPaseo = {
  // paseo: { id, fecha, perroId, perroNombre, turno, ruta } (id = AAAA-MM-DD_PJ-001_manana)
  async sacar(paseo, file) {
    if (!file || !/^image\//.test(file.type)) throw new ApiError(400, "Sacá una foto del perro.");
    const archivo = await prepararArchivo(file);
    const hora = horaAR();
    const datosPaseo = { ...paseo, estado: "paseando", horaPaseo: hora };
    try {
      const result = await request("/api/archivos", {
        method: "POST",
        body: { tipo: "foto", archivo, perroId: paseo.perroId, perroNombre: paseo.perroNombre, nota: `Foto del paseo ${paseo.fecha} ${hora}` },
      });
      updateCaches("archivos", result.registro);
      emit("archivos");
      return registros.save("paseos", { ...datosPaseo, fotoPaseoId: result.registro.id });
    } catch (error) {
      if (error.status !== 0) throw error;
      // Sin señal: se guarda la foto para después y el paseo se marca igual.
      const pendientes = readJson(FOTOS_PENDIENTES_KEY, []).filter((p) => p.paseo.id !== paseo.id);
      pendientes.push({ paseo: datosPaseo, archivo, usuario: session.user()?.usuario, at: Date.now() });
      writeJson(FOTOS_PENDIENTES_KEY, pendientes);
      return registros.save("paseos", { ...datosPaseo, fotoPendiente: true });
    }
  },
  pendientes() {
    return readJson(FOTOS_PENDIENTES_KEY, []).length;
  },
  // Sube las fotos que quedaron sin señal. Se llama sola cada 30 s y al volver la conexión.
  async subirPendientes() {
    const lista = readJson(FOTOS_PENDIENTES_KEY, []);
    if (!lista.length || !session.token()) return 0;
    const me = session.user()?.usuario;
    const hechos = new Set();
    for (const item of lista) {
      if (item.usuario && item.usuario !== me) continue;
      try {
        const result = await request("/api/archivos", {
          method: "POST",
          body: { tipo: "foto", archivo: item.archivo, perroId: item.paseo.perroId, perroNombre: item.paseo.perroNombre, nota: `Foto del paseo ${item.paseo.fecha} ${item.paseo.horaPaseo}` },
        });
        await registros.save("paseos", { id: item.paseo.id, fecha: item.paseo.fecha, fotoPaseoId: result.registro.id, fotoPendiente: false });
        hechos.add(item.at);
      } catch (error) {
        if (error.status !== 0) hechos.add(item.at);
      }
    }
    writeJson(FOTOS_PENDIENTES_KEY, readJson(FOTOS_PENDIENTES_KEY, []).filter((i) => !hechos.has(i.at)));
    if (hechos.size) emit("paseos");
    return hechos.size;
  },
};

window.addEventListener("online", () => fotosPaseo.subirPendientes());
setInterval(() => fotosPaseo.subirPendientes(), 30 * 1000);
