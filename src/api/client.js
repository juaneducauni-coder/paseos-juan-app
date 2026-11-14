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
//   mensajes.resumen() / mensajes.list(canal) / mensajes.enviar(canal, texto) → chats (ver docs/datos-compartidos.md)
//   mensajes.enviar(canal, texto, { encolar: true }) → sin señal queda en pj_mensajes_pendientes y se manda solo

const SESSION_KEY = "pj_sesion";
const OUTBOX_KEY = "pj_pendientes";
const CACHE_PREFIX = "pj_cache_";
// Cada cuánto se buscan datos nuevos. Con la planilla de Google: cada minuto. Con el
// almacenamiento provisorio de Vercel (cupo gratis chico): cada 5 minutos.
let POLL_MS = 60 * 1000;
// Chats: el canal abierto se refresca cada 10 s; el resumen (sin leer) cada 60 s, o 5 min con el provisorio.
const CHAT_MS = 10 * 1000;
let RESUMEN_MS = 60 * 1000;
fetch("/api/salud")
  .then((r) => r.json())
  .then((data) => {
    if (/provisorio/i.test(data.almacenamiento || "")) {
      POLL_MS = 5 * 60 * 1000;
      RESUMEN_MS = 5 * 60 * 1000;
    }
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
  // "mensajes" va al final: la primera página es la de inicio de cada rol.
  admin: ["admin", "coordinador", "supervisor", "paseador", "cliente", "mensajes"],
  coordinador: ["coordinador", "cliente", "mensajes"],
  supervisor: ["supervisor", "paseador", "cliente", "mensajes"],
  paseador: ["paseador", "mensajes"],
  ayudante: ["paseador", "mensajes"],
  marketing: [],
  cliente: ["cliente"],
};

export const ROLE_LABELS = {
  admin: "Admin",
  coordinador: "Coordinador",
  supervisor: "Supervisor",
  paseador: "Paseador",
  ayudante: "Ayudante de paseador",
  marketing: "Marketing",
  cliente: "Cliente",
};

export function homeFor(rol) {
  return { admin: "/admin", coordinador: "/coordinador", supervisor: "/supervisor", paseador: "/paseador", ayudante: "/paseador", cliente: "/cliente" }[rol] || "/";
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
  // Abre la foto en una pestaña nueva (la baja con la sesión, no queda pública). Los PDF se descargan.
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
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      if (/^image\//.test(blob.type)) {
        ventana.location.href = url;
      } else {
        // PDF y lo que no sea imagen: se descarga (no se abre una pestaña blob: con el origen de la app).
        ventana.close();
        const disposicion = response.headers.get("Content-Disposition") || "";
        const nombre = /filename="([^"]+)"/.exec(disposicion)?.[1] || "archivo";
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = nombre;
        enlace.rel = "noopener";
        document.body.appendChild(enlace);
        enlace.click();
        enlace.remove();
      }
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

// ---------- Portal del cliente (acceso por enlace /c/<token>, sin PIN) ----------
session.loginCliente = async function loginCliente(token) {
  const data = await request("/api/auth/cliente", { method: "POST", body: { token }, auth: false });
  session.set(data.token, data.user);
  return data.user; // { usuario: "cliente:<id>", nombre, rol: "cliente", clienteId, perros }
};

// Acceso de clientes (P-01): pedir alta (formulario web) → Juan aprueba con horario → el cliente recibe su enlace.
// aprobar(): SOLO admin. datos: { pedidoId | clienteId, perros: ["PJ-0xx"], dias: ["lunes", ...], turno: "Mañana"|"Tarde", hora?, plan? }
//   → { cliente, enlace: "/c/<token>", url }. El enlace se ve UNA sola vez (en el servidor queda solo su hash).
// crear(): enlace NUEVO para un cliente ya aprobado (si lo perdió). Admin y coordinador. Invalida el anterior.
// revocar(): corta el enlace y las sesiones abiertas. Admin y coordinador.
export const clientesAcceso = {
  async aprobar(datos) {
    const data = await request("/api/clientes/aprobar", { method: "POST", body: datos });
    return { cliente: data.cliente, enlace: data.enlace, url: `${window.location.origin}${data.enlace}`, acceso: data.acceso };
  },
  async crear(clienteId) {
    const data = await request("/api/clientes/acceso", { method: "POST", body: { clienteId } });
    return { enlace: data.enlace, url: `${window.location.origin}${data.enlace}`, acceso: data.acceso };
  },
  async revocar(clienteId) {
    const data = await request("/api/clientes/acceso", { method: "POST", body: { clienteId, revocar: true } });
    return data.acceso;
  },
};

// ---------- Datos de pago para clientes ----------
// El alias NO está en el código: lo carga el admin (colección "ajustes", id "pagos") y lo ven el admin y los clientes con sesión.
export const PENDIENTE = "Pendiente de confirmar";
export const datosPago = {
  // → { alias, instrucciones, pendiente } (alias = "Pendiente de confirmar" si Juan todavía no lo cargó)
  async leer() {
    let registro = null;
    try {
      registro = (await registros.list("ajustes")).find((r) => r.id === "pagos") || null;
    } catch (error) {
      if (error.status !== 403) throw error;
    }
    return { alias: registro?.alias || PENDIENTE, instrucciones: registro?.instrucciones || "", pendiente: !registro?.alias };
  },
  // Solo admin. alias: 6 a 20 letras, números, puntos o guiones ("" lo borra).
  guardar({ alias, instrucciones }) {
    return registros.save("ajustes", { id: "pagos", alias, instrucciones });
  },
};

// ---------- Mensajes (chats del equipo y con los clientes) ----------
// Canales: "equipo", "calle", "coordinacion", "clientes" (comunidad de clientes), directos canalDirecto(a, b)
// y "cliente_<clienteId>" (chat privado del cliente con Paseos Juan).
// Avisa con onDataChange("mensajes") cuando cambia el resumen y onDataChange("mensajes:<canal>") con mensajes nuevos.
export function canalDirecto(a, b) {
  const [x, y] = [String(a), String(b)].sort();
  return `dm_${x}__${y}`;
}

const MSJ_KEY = (canal) => `${CACHE_PREFIX}msj_${canal}`;
const RESUMEN_KEY = `${CACHE_PREFIX}msj__resumen`;
const msjWatchers = new Map();

export const mensajes = {
  // [{ canal, tipo: "grupo"|"comunidad"|"directo"|"cliente", titulo, ultimo, sinLeer, leidoHasta, con?, clienteId?, perros? }]
  cachedResumen() {
    return readJson(RESUMEN_KEY, []);
  },
  async resumen() {
    try {
      const data = await request("/api/mensajes?resumen=1");
      const before = localStorage.getItem(RESUMEN_KEY);
      writeJson(RESUMEN_KEY, data.canales);
      if (before !== JSON.stringify(data.canales)) emit("mensajes");
      return data.canales;
    } catch (error) {
      if (error.status === 0) return mensajes.cachedResumen();
      throw error;
    }
  },
  // Total de mensajes sin leer (para un globito en el menú).
  sinLeer() {
    return mensajes.cachedResumen().reduce((n, c) => n + (c.sinLeer || 0), 0);
  },
  cached(canal) {
    return readJson(MSJ_KEY(canal), []);
  },
  // Mensajes del canal en orden cronológico. Pide solo los nuevos (o cambiados) y los suma a los guardados.
  // Cada mensaje: { id, canal, texto, tipo, adjuntoId, perroId, perroNombre, autor, autorNombre, autorRol,
  //   automatico, creadoEn, borrado? }. Si borrado es true, mostrar "Mensaje borrado por el admin".
  async list(canal) {
    const previos = mensajes.cached(canal);
    // Los que sumó este celular al enviar (local: true) no cuentan: si no, se saltearían los
    // mensajes de otros que llegaron mientras tanto (por ejemplo, después de un rato sin señal).
    const desde = previos.filter((m) => !m.local).reduce((max, m) => [max, m.creadoEn || "", m.actualizadoEn || ""].sort().pop(), "");
    const params = new URLSearchParams({ canal });
    if (desde) params.set("desde", desde);
    try {
      const data = await request(`/api/mensajes?${params}`);
      if (data.reglas) writeJson(`${MSJ_KEY(canal)}_info`, { reglas: data.reglas, silenciadoHasta: data.silenciadoHasta });
      if (!data.mensajes.length && desde) return previos;
      const byId = new Map(previos.map((m) => [m.id, m]));
      data.mensajes.forEach((m) => byId.set(m.id, m));
      const lista = [...byId.values()].sort((a, b) => String(a.creadoEn).localeCompare(String(b.creadoEn))).slice(-200);
      writeJson(MSJ_KEY(canal), lista);
      emit(`mensajes:${canal}`);
      return lista;
    } catch (error) {
      if (error.status === 0) return previos;
      throw error;
    }
  },
  // opts: { tipo: "texto"|"aviso"|"foto", adjuntoId, perroId, perroNombre }
  // Para avisarle al cliente de un perro sin conocer el cliente: enviar("cliente", texto, { tipo: "aviso", perroId }).
  // Sin encolar: necesita señal; si no hay, lanza ApiError(0) para que la pantalla muestre "No se envió".
  // Con encolar: true (chat del equipo, E-058): sin señal o con el servidor caído, el mensaje queda en
  // "pj_mensajes_pendientes" y se manda solo; devuelve { cid, canal, texto, ..., pendiente: true }.
  // urgente: true lo marca para el aviso rojo de la pantalla. Si hay mensajes míos esperando en ese
  // canal, el nuevo se pone atrás (se mantiene el orden).
  async enviar(canal, texto, opts = {}) {
    const datos = { canal, texto, tipo: opts.tipo || "texto", adjuntoId: opts.adjuntoId, perroId: opts.perroId, perroNombre: opts.perroNombre };
    if (opts.encolar) {
      const esperando = msjMios().some((p) => p.canal === canal && p.estado !== "error");
      if (esperando || navigator.onLine === false) {
        const item = encolarMensaje(datos, opts);
        mensajes.enviarPendientes();
        return item;
      }
    }
    let mensaje;
    try {
      ({ mensaje } = await request("/api/mensajes", { method: "POST", body: datos }));
    } catch (error) {
      if (!opts.encolar || !transitorio(error.status)) throw error;
      // Pudo haber llegado al servidor (la señal se cortó en la respuesta): antes de reintentar se revisa.
      return encolarMensaje(datos, opts, error.status === 429 ? null : marcaRevision(canal));
    }
    sumarAlCanal(mensaje, canal);
    return mensaje;
  },
  // Mensajes míos que esperan señal (o que el servidor rechazó), en orden. canal es opcional.
  // Cada uno: { cid, canal, texto, tipo, perroId, perroNombre, adjuntoId, createdAt, urgente,
  //   estado: "pendiente"|"enviando"|"error", error, enviandoDesde }
  pendientes(canal) {
    return msjMios().filter((p) => !canal || p.canal === canal);
  },
  // Borra uno que no salió (botón "Borrar"). Los que esperan señal no se borran.
  borrarPendiente(cid) {
    const item = msjMios().find((p) => p.cid === cid);
    if (!item || item.estado !== "error") return false;
    guardarOutbox((lista) => lista.filter((p) => p.cid !== cid));
    emit(`mensajes:${item.canal}`);
    emit("mensajes");
    return true;
  },
  // Manda en orden lo que quedó sin señal. Se llama sola (al volver la señal, al volver a la
  // pestaña y cada 30 s) y al abrir un chat. Devuelve cuántos salieron.
  enviarPendientes() {
    return flushMensajes();
  },
  async marcarLeido(canal) {
    const data = await request("/api/mensajes", { method: "POST", body: { canal, leido: true } });
    const resumen = mensajes.cachedResumen();
    const item = resumen.find((c) => c.canal === canal);
    if (item && item.sinLeer) {
      item.sinLeer = 0;
      item.leidoHasta = data.leidoHasta;
      writeJson(RESUMEN_KEY, resumen);
      emit("mensajes");
    }
    return data.leidoHasta;
  },
  // Comunidad "clientes": { reglas: [textos], silenciadoHasta: ISO|null } (después de list("clientes")).
  infoComunidad() {
    return readJson(`${MSJ_KEY("clientes")}_info`, { reglas: [], silenciadoHasta: null });
  },
  // Moderación (SOLO admin): borrar un mensaje de un grupo, la comunidad o un chat de cliente.
  async borrar(mensajeId) {
    const { mensaje } = await request("/api/mensajes", { method: "POST", body: { borrar: mensajeId } });
    const lista = mensajes.cached(mensaje.canal);
    if (lista.length) {
      writeJson(MSJ_KEY(mensaje.canal), lista.map((m) => (m.id === mensaje.id ? mensaje : m)));
      emit(`mensajes:${mensaje.canal}`);
    }
    return mensaje;
  },
  // Silenciar en la comunidad (horas = 0 lo quita). usuario: el "autor" del mensaje (por ejemplo "cliente:<id>").
  async silenciar(usuario, horas = 24) {
    return (await request("/api/mensajes", { method: "POST", body: { silenciar: usuario, horas } })).silenciados;
  },
  // { usuario: ISO hasta } de los silenciados vigentes (solo admin).
  async silenciados() {
    return (await request("/api/mensajes?moderacion=1")).silenciados;
  },
  // Gente del equipo para abrir un directo: [{ usuario, nombre, rol }] (no para clientes).
  async contactos() {
    return (await request("/api/mensajes?contactos=1")).contactos;
  },
  // watch(canal): refresca el chat cada 10 s SOLO mientras está abierto y la pestaña visible.
  // watch() sin canal: refresca el resumen cada 60 s (5 min con el almacenamiento provisorio).
  // Devuelve una función para cortar: llamala al cerrar el chat.
  watch(canal) {
    const key = canal || "_resumen";
    if (msjWatchers.has(key)) return msjWatchers.get(key);
    const tick = () => {
      if (document.visibilityState !== "visible" || !session.token()) return;
      (canal ? mensajes.list(canal) : mensajes.resumen()).catch(() => {});
    };
    tick();
    ticks.add(tick);
    let timer = setInterval(tick, canal ? CHAT_MS : RESUMEN_MS);
    const reprogramar = canal ? null : setTimeout(() => {
      clearInterval(timer);
      timer = setInterval(tick, RESUMEN_MS);
    }, 3000);
    const stop = () => {
      ticks.delete(tick);
      clearInterval(timer);
      clearTimeout(reprogramar);
      msjWatchers.delete(key);
    };
    msjWatchers.set(key, stop);
    return stop;
  },
  watchResumen() {
    return mensajes.watch();
  },
};

// ---------- Mensajes sin señal (E-058) ----------
// Igual que la cola de registros (pj_pendientes): por usuario, se saca solo lo que el servidor
// confirmó (201) y lo rechazado (4xx) no se reintenta: queda marcado con el error y "Borrar".
// Para no mandar dos veces: el que se está mandando queda marcado ("enviando", con la hora) y, si
// el intento anterior pudo haber llegado (la señal se cortó en la respuesta, error del servidor o
// la pestaña se cerró a mitad), antes de reintentar se busca en el servidor si ya está.
const MSJ_OUTBOX_KEY = "pj_mensajes_pendientes";
// Pasado este tiempo sin señal ya no se manda solo (un "Llegué" o un "Perro suelto" viejo confunde).
const MSJ_VENCE_MS = 3 * 60 * 60 * 1000;
// Un "enviando" más viejo que esto es de una pestaña que se cerró o se colgó.
const MSJ_EN_VUELO_MS = 60 * 1000;

function msjOutbox() {
  const lista = readJson(MSJ_OUTBOX_KEY, []);
  return Array.isArray(lista) ? lista : [];
}

function msjMios() {
  const me = session.user()?.usuario;
  return me ? msjOutbox().filter((p) => p.usuario === me) : [];
}

// Siempre se lee lo último guardado (otra pestaña pudo cambiarlo) y se escribe enseguida.
function guardarOutbox(cambio) {
  writeJson(MSJ_OUTBOX_KEY, cambio(msjOutbox()));
}

function cambiarPendiente(cid, datos) {
  guardarOutbox((lista) => lista.map((p) => (p.cid === cid ? { ...p, ...datos } : p)));
}

// Sin señal, servidor caído o "esperá un minuto": se reintenta. El resto de los 4xx, nunca.
function transitorio(status) {
  return status === 0 || status === 408 || status === 429 || status >= 500;
}

function cambioDe(m) {
  return [m.creadoEn || "", m.actualizadoEn || ""].sort().pop();
}

// Desde cuándo buscar en el servidor un mensaje que pudo haber llegado: lo último que este
// celular conoce del canal (hora del servidor). Si no conoce nada, 2 minutos antes de escribirlo.
function marcaRevision(canal, at = Date.now()) {
  const conocido = mensajes.cached(canal).reduce((max, m) => [max, cambioDe(m)].sort().pop(), "");
  return conocido || new Date(at - 2 * 60 * 1000).toISOString();
}

function encolarMensaje(datos, opts, revisar = null) {
  const usuario = session.user()?.usuario;
  if (!usuario) throw new ApiError(0, "Sin conexión. Revisá la señal.");
  const ahora = Date.now();
  const item = {
    cid: `c${ahora.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    usuario,
    canal: datos.canal,
    texto: datos.texto,
    tipo: datos.tipo || "texto",
    perroId: datos.perroId || "",
    perroNombre: datos.perroNombre || "",
    adjuntoId: datos.adjuntoId || "",
    urgente: Boolean(opts.urgente),
    createdAt: new Date(ahora).toISOString(),
    at: ahora,
    estado: "pendiente",
    error: "",
    enviandoDesde: 0,
    revisar,
  };
  guardarOutbox((lista) => [...lista, item]);
  // Si el celular no deja guardar (memoria llena, modo privado), no se finge que quedó guardado.
  if (!msjOutbox().some((p) => p.cid === item.cid)) throw new ApiError(0, "Sin conexión. Revisá la señal.");
  emit(`mensajes:${item.canal}`);
  emit("mensajes");
  return { ...item, pendiente: true };
}

// Suma al chat guardado el mensaje que confirmó el servidor (local: true hasta que lo traiga list()).
function sumarAlCanal(mensaje, canalPedido = mensaje.canal) {
  const lista = mensajes.cached(mensaje.canal);
  if (!lista.length && mensaje.canal !== canalPedido) return;
  if (!lista.some((m) => m.id === mensaje.id)) {
    writeJson(MSJ_KEY(mensaje.canal), [...lista, { ...mensaje, local: true }].slice(-200));
  }
  emit(`mensajes:${mensaje.canal}`);
}

function textoComparable(texto) {
  return String(texto ?? "").replace(/<[^>]*>/g, "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

// ¿Ya está en el servidor? (mismo autor, tipo y texto, después de la marca). Sin señal lanza ApiError(0).
async function yaLlego(item) {
  const params = new URLSearchParams({ canal: item.canal, desde: item.revisar });
  const data = await request(`/api/mensajes?${params}`);
  const texto = textoComparable(item.texto);
  return (data.mensajes || []).find((m) => m.autor === item.usuario && !m.borrado && (m.tipo || "texto") === item.tipo && textoComparable(m.texto) === texto) || null;
}

function vencerViejos(me) {
  const vencidos = msjOutbox().filter((p) => p.usuario === me && p.estado === "pendiente" && Date.now() - (p.at || 0) > MSJ_VENCE_MS);
  if (!vencidos.length) return [];
  const ids = new Set(vencidos.map((p) => p.cid));
  guardarOutbox((lista) => lista.map((p) => (ids.has(p.cid)
    ? { ...p, estado: "error", error: "Pasaron más de 3 horas sin señal y no se mandó. Si todavía hace falta, escribilo de nuevo." }
    : p)));
  return vencidos.map((p) => p.canal);
}

let msjFlushing = false;
let msjOtraVez = false; // se pidió mandar mientras se mandaba: al terminar se repasa la cola

async function flushMensajes() {
  const me = session.user()?.usuario;
  if (msjFlushing) {
    msjOtraVez = true;
    return 0;
  }
  if (!me || !session.token()) return 0;
  const tocados = new Set(vencerViejos(me));
  const ids = msjOutbox().filter((p) => p.usuario === me && p.estado !== "error").map((p) => p.cid);
  if (!ids.length || navigator.onLine === false) {
    tocados.forEach((c) => emit(`mensajes:${c}`));
    if (tocados.size) emit("mensajes");
    return 0;
  }
  msjFlushing = true;
  msjOtraVez = false;
  let enviados = 0;
  let cortado = false;
  try {
    for (const cid of ids) {
      let item = msjOutbox().find((p) => p.cid === cid);
      if (!item || item.estado === "error") continue;
      if (item.estado === "enviando") {
        // Otra pestaña lo está mandando: se espera (y se corta acá para no cambiar el orden).
        if (Date.now() - (item.enviandoDesde || 0) < MSJ_EN_VUELO_MS) {
          cortado = true;
          break;
        }
        // Quedó a mitad (pestaña cerrada): pudo haber llegado.
        if (!item.revisar) item = { ...item, revisar: marcaRevision(item.canal, item.at) };
      }
      tocados.add(item.canal);
      cambiarPendiente(cid, { estado: "enviando", enviandoDesde: Date.now(), revisar: item.revisar || null });
      emit(`mensajes:${item.canal}`);
      try {
        let mensaje = item.revisar ? await yaLlego(item) : null;
        if (!mensaje) {
          ({ mensaje } = await request("/api/mensajes", {
            method: "POST",
            body: { canal: item.canal, texto: item.texto, tipo: item.tipo, adjuntoId: item.adjuntoId || undefined, perroId: item.perroId || undefined, perroNombre: item.perroNombre || undefined },
          }));
        }
        // Confirmado: se saca de la cola y se suma al chat en el mismo momento (no se ve dos veces).
        guardarOutbox((lista) => lista.filter((p) => p.cid !== cid));
        sumarAlCanal(mensaje, item.canal);
        enviados += 1;
      } catch (error) {
        if (transitorio(error.status) || error.status === 401) {
          // Queda esperando. Si el intento pudo llegar al servidor, la próxima vez se revisa antes.
          const pudoLlegar = error.status !== 401 && error.status !== 429 && navigator.onLine !== false;
          cambiarPendiente(cid, { estado: "pendiente", enviandoDesde: 0, revisar: item.revisar || (pudoLlegar ? marcaRevision(item.canal, item.at) : null) });
          cortado = true;
          break;
        }
        cambiarPendiente(cid, { estado: "error", enviandoDesde: 0, error: error.message || "El servidor no lo aceptó." });
      }
    }
  } finally {
    msjFlushing = false;
    tocados.forEach((c) => emit(`mensajes:${c}`));
    if (tocados.size) emit("mensajes");
  }
  if (msjOtraVez && !cortado) setTimeout(() => flushMensajes(), 0);
  msjOtraVez = false;
  if (enviados) mensajes.resumen().catch(() => {});
  return enviados;
}

window.addEventListener("online", () => flushMensajes());
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") flushMensajes();
});
setInterval(() => flushMensajes(), 30 * 1000);
setTimeout(() => flushMensajes(), 2000);
