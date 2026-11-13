// Vista del rol Admin (Juan Buitrago, fundador).
// Datos fijos: src/data/realData.js (BASE RUTAS, precios). Datos del día: servidor compartido
// (src/api/client.js): paseos, incidentes, checklists, pedidos, rutas, plantillas y avisos.
// Solo admin: pagos (registro de apoyo, con su comprobante) y resumen de clientes. Usuarios: /api/usuarios.
// Archivos recibidos (carnets, comprobantes, documentos): colección "archivos" (admin y coordinador;
// los comprobantes de pago los abre solo el admin). Se suben con archivos.subir: sin señal no se encolan.
// Lo que no está confirmado se rotula como "Pendiente de confirmar".
// Las marcas de "hecho" de las prioridades se guardan solo en este dispositivo.
import {
  PENDIENTE,
  DATA_UPDATED,
  BUSINESS_INFO,
  BUSINESS_FACTS,
  TEAM,
  ROLE_OWNERS,
  SHIFTS,
  WEEK_DAYS,
  REAL_DOGS,
  REAL_PLANS,
  REAL_SINGLE_WALK,
  MULTI_DOG_DISCOUNTS,
  CATEGORIES,
  formatPeso,
  goesOn,
  plantillasDesdePlanilla,
} from "../data/realData.js";
import { icon, getStoredArray, actionClickHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";
import { session, registros, usuarios, archivos, onDataChange, hoyAR, ROLE_PAGES, ROLE_LABELS } from "../api/client.js";

const DONE_KEY = "paseosJuanAdmin_prioridadesHechas";
const OPEN_KEY = "paseosJuanAdmin_seccionesAbiertas";
const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SIZES = ["Pequeño", "Mediano", "Grande"];
const SHIFT_MORNING = SHIFTS.manana.label;
const SHIFT_AFTERNOON = SHIFTS.tarde.label;
const LIVE_COLS = ["paseos", "incidentes", "checklists", "pedidos", "rutas", "plantillas", "avisos"];
// Solo admin: registro de apoyo de pagos y clientes (para el resumen por barrio, sin teléfonos),
// y los archivos recibidos (el admin es el único que abre los comprobantes de pago).
const ADMIN_COLS = ["pagos", "clientes", "archivos"];
// Un perro está atrasado si pasaron más de estos minutos desde la hora prevista y no se retiró.
const LATE_MINUTES = 10;
const PAGO_MEDIOS = ["Efectivo", "Transferencia", "Naranja X"];
const LIBRO = "Libro contable del Sistema de Gestión";
// Tipos de archivo del servidor (api/_lib/archivos.js), con su etiqueta y color.
const ARCHIVO_TIPOS = {
  "carnet de vacunas": { label: "Carnet de vacunas", tone: "ok" },
  "comprobante de pago": { label: "Comprobante de pago", tone: "info" },
  documento: { label: "Documento", tone: "neutral" },
  foto: { label: "Foto", tone: "neutral" },
};
// Lo mismo que acepta prepararArchivo() en src/api/client.js.
const ARCHIVO_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
const ARCHIVO_MIME = /^(image\/(jpeg|png|webp)|application\/pdf)$/;
const DAY_MS = 24 * 60 * 60 * 1000;
// Cuántos archivos se muestran en "Archivos recibidos" (los más nuevos primero).
const ARCHIVOS_SHOWN = 20;

// Último mensaje de estado (se escribe en la región aria-live después de cada render).
let pendingStatus = "";

// Estado en memoria de la página (no se guarda en el dispositivo: puede tener un PIN recién creado).
const ui = {
  users: null, // lista de /api/usuarios (sin PIN)
  usersLoading: false,
  usersError: "",
  showCreate: false,
  resetFor: null, // usuario con el formulario de PIN abierto
  confirmOff: null, // usuario esperando confirmación para desactivar
  credential: null, // { tipo, usuario, nombre, pin } — se muestra una sola vez
  busy: false,
  openDogs: new Set(), // listas de perros abiertas en "El día en vivo"
  liveDay: null,
  liveError: "",
  adminLoaded: false,
  adminError: "",
  pagosMes: null, // "AAAA-MM" o "todos"; null = mes actual
  archivosTipo: "todos", // filtro de "Archivos recibidos"
  savingPago: false, // se está subiendo el comprobante o guardando el pago
  lateSignature: "",
  msgs: { users: null, live: null, pagos: null, archivos: null },
};

// Lo que se va escribiendo en los formularios, para no perderlo si la página se vuelve a dibujar.
const emptyPago = () => ({ fecha: hoyAR(), concepto: "", monto: "", medio: "", pasadoAlLibro: false });
// pagoArchivo: el comprobante elegido (File) se guarda acá porque el <input type="file"> se vacía al
// redibujar. pagoSubido: si el comprobante ya subió pero el pago no se pudo guardar, no se sube dos veces.
const drafts = {
  crear: { nombre: "", usuario: "", rol: "paseador", pin: "" },
  reset: { pin: "" },
  roles: {},
  pago: emptyPago(),
  pagoArchivo: null,
  pagoSubido: null,
};

/* ---------- Utilidades ---------- */

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function listJoin(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

const SHORT_DAYS = { Lunes: "Lun", Martes: "Mar", Miércoles: "Mié", Jueves: "Jue", Viernes: "Vie", Sábado: "Sáb", Domingo: "Dom" };

function daysText(days) {
  const ordered = WEEK_DAYS.filter((day) => days.includes(day));
  // Tramos seguidos: "Lun a Vie" en vez de "Lun, Mar, Mié, Jue, Vie".
  const indexes = ordered.map((day) => WEEK_DAYS.indexOf(day));
  const contiguous = indexes.length >= 3 && indexes.every((value, i) => i === 0 || value === indexes[i - 1] + 1);
  if (contiguous) return `${SHORT_DAYS[ordered[0]]} a ${SHORT_DAYS[ordered[ordered.length - 1]]}`;
  return ordered.map((day) => SHORT_DAYS[day]).join(", ");
}

function todayInfo() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("es-AR", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type)?.value || "";
  const weekday = get("weekday");
  const dayName = WEEK_DAYS.find((day) => day.toLowerCase() === weekday.toLowerCase()) || weekday;
  return { dayName, date: `${get("day")}/${get("month")}/${get("year")}` };
}

function readDone() {
  return getStoredArray(DONE_KEY);
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado): vale solo para esta visita.
  }
}

function openSections() {
  return new Set(getStoredArray(OPEN_KEY));
}

function timeAR(iso) {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}

function dateAR(iso) {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", { timeZone: TIME_ZONE, day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function ymdToAR(ymd) {
  const [y, m, d] = String(ymd || "").split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
}

// "820 KB" o "1,4 MB".
function fileSize(bytes) {
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "";
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
  return `${(n / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

function byNewest(a, b) {
  return String(b.creadoEn || "").localeCompare(String(a.creadoEn || ""));
}

function isOffline() {
  return navigator.onLine === false;
}

function currentUser() {
  return session.user() || { usuario: "", nombre: "", rol: "admin" };
}

function firstName(nombre) {
  return String(nombre || "").trim().split(/\s+/)[0] || "";
}

function isAdminPage() {
  return /^\/(dashboard\/)?admin\/?$/.test(window.location.pathname);
}

/* ---------- El día en vivo (datos compartidos) ---------- */

function liveOpts(col, hoy) {
  // Pedidos nuevos y avisos vigentes pueden ser de días anteriores; las plantillas no tienen fecha
  // (se repiten cada semana); pagos y clientes se miran completos.
  return ["pedidos", "plantillas", "avisos", ...ADMIN_COLS].includes(col) ? {} : { desde: hoy };
}

function shiftOf(record) {
  const turno = String(record.turno || "").toLowerCase();
  if (turno.startsWith("ma")) return "manana";
  if (turno.startsWith("ta")) return "tarde";
  if (/_manana$/.test(record.id || "")) return "manana";
  if (/_tarde$/.test(record.id || "")) return "tarde";
  return "otro";
}

function recordTime(record) {
  return record.hora || timeAR(record.creadoEn);
}

// Minutos desde la medianoche, en hora de Argentina.
function nowMinutesAR(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(date);
  const get = (type) => Number(parts.find((part) => part.type === type)?.value || 0);
  return (get("hour") % 24) * 60 + get("minute");
}

function toMinutes(hhmm) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm || "").trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

// Separa la mañana de la tarde por la hora (el sábado la planilla dice "Mañana" con horas de tarde).
const MIDDAY = 13 * 60 + 30;

function normText(value) {
  return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Ruta efectiva de hoy: el cambio del día (rutas) manda sobre la plantilla semanal. Si el servidor
// todavía no tiene plantilla para este día, se usan los horarios de BASE RUTAS con aviso.
function effectiveRoutes(hoy, dayName) {
  const rutasHoy = registros.cached("rutas", liveOpts("rutas", hoy)).filter((ruta) => ruta.fecha === hoy);
  const plantillas = registros.cached("plantillas", liveOpts("plantillas", hoy)).filter((p) => normText(p.dia) === normText(dayName));
  const fromSheet = !plantillas.length;
  const base = fromSheet ? plantillasDesdePlanilla().filter((p) => normText(p.dia) === normText(dayName)) : plantillas;
  const byCode = new Map();
  base.forEach((p) => byCode.set(p.ruta || p.id, { ...p, fuente: fromSheet ? "planilla" : "plantilla" }));
  rutasHoy.forEach((r) => byCode.set(r.ruta || String(r.id).slice(11), { ...r, fuente: "dia" }));
  const firstTime = (route) => (route.paradas || []).map((stop) => stop.hora || "99:99").sort()[0] || "99:99";
  const list = [...byCode.values()].sort((a, b) => firstTime(a).localeCompare(firstTime(b)) || String(a.ruta).localeCompare(String(b.ruta)));
  return { list, fromSheet: list.some((route) => route.fuente === "planilla") };
}

// Cumplimiento por ruta: a tiempo / atrasados (hora prevista + 10 min sin retiro) / entregados.
function routeCompliance(routes, paseos, nowMin) {
  const sameDog = (stop, paseo) => (stop.perroId && paseo.perroId
    ? stop.perroId === paseo.perroId
    : normText(stop.perroNombre) && normText(stop.perroNombre) === normText(paseo.perroNombre));
  const stopsOfDog = (stop) => routes.reduce((sum, route) => sum + (route.paradas || []).filter((other) => sameDog(stop, other)).length, 0);

  return routes.map((route) => {
    const shift = shiftOf({ turno: route.turno });
    const stops = (route.paradas || []).map((stop) => {
      const candidates = paseos.filter((paseo) => sameDog(stop, paseo));
      const paseo = candidates.find((item) => shiftOf(item) === shift)
        || (candidates.length === 1 && stopsOfDog(stop) === 1 ? candidates[0] : null);
      const estado = paseo?.estado || "pendiente";
      const prevista = toMinutes(stop.hora);
      let status = "a-tiempo";
      if (estado === "entregado") status = "entregado";
      else if (estado === "no-sale") status = "no-sale";
      else if (estado === "pendiente" && prevista !== null && nowMin > prevista + LATE_MINUTES) status = "atrasado";
      return { ...stop, paseo, estado, status, prevista, atraso: status === "atrasado" ? nowMin - prevista : 0 };
    });
    const count = (status) => stops.filter((stop) => stop.status === status).length;
    return {
      route,
      shift,
      stops,
      aTiempo: count("a-tiempo"),
      atrasados: count("atrasado"),
      entregados: count("entregado"),
      noSale: count("no-sale"),
    };
  });
}

// Avisos por barrio vigentes hoy: desde su fecha hasta "vigenteHasta" (si no tiene, solo ese día).
function avisosVigentes(hoy) {
  return registros.cached("avisos", liveOpts("avisos", hoy))
    .filter((aviso) => {
      const desde = aviso.fecha || String(aviso.creadoEn || "").slice(0, 10);
      const hasta = aviso.vigenteHasta || desde;
      return desde && desde <= hoy && hasta >= hoy;
    })
    .sort((a, b) => String(b.creadoEn || "").localeCompare(String(a.creadoEn || "")));
}

function liveData() {
  const hoy = hoyAR();
  const deHoy = (record) => (record.fecha || String(record.creadoEn || "").slice(0, 10)) === hoy;
  const newest = (a, b) => String(b.actualizadoEn || b.creadoEn || "").localeCompare(String(a.actualizadoEn || a.creadoEn || ""));
  const paseos = registros.cached("paseos", liveOpts("paseos", hoy)).filter(deHoy);
  const incidentes = registros.cached("incidentes", liveOpts("incidentes", hoy)).filter(deHoy)
    .sort((a, b) => String(b.creadoEn || "").localeCompare(String(a.creadoEn || "")));
  const checklists = registros.cached("checklists", liveOpts("checklists", hoy)).filter(deHoy).sort(newest);
  const pedidosNuevos = registros.cached("pedidos", liveOpts("pedidos", hoy))
    .filter((pedido) => (pedido.estado || "nuevo") === "nuevo")
    .sort((a, b) => String(b.creadoEn || "").localeCompare(String(a.creadoEn || "")));

  const shifts = ["manana", "tarde", "otro"].map((key) => {
    const rows = paseos.filter((record) => shiftOf(record) === key);
    const count = (...states) => rows.filter((record) => states.includes(record.estado || "pendiente")).length;
    return {
      key,
      rows,
      total: rows.length,
      noSale: count("no-sale"),
      salen: rows.length - count("no-sale"),
      retirados: count("retirado", "paseando", "entregado"),
      paseando: count("paseando"),
      entregados: count("entregado"),
      pendientes: count("pendiente"),
    };
  });
  const nowMin = nowMinutesAR();
  const effective = effectiveRoutes(hoy, todayInfo().dayName);
  const compliance = routeCompliance(effective.list, paseos, nowMin);
  const late = compliance.flatMap((item) => item.stops.filter((stop) => stop.status === "atrasado").map((stop) => ({ ...stop, route: item.route })));
  // Atrasos del turno actual: misma mitad del día que ahora.
  const lateNow = late.filter((stop) => (stop.prevista < MIDDAY) === (nowMin < MIDDAY));
  const avisos = avisosVigentes(hoy);
  // Carnets de vacunas que llegaron por el formulario de la web en las últimas 24 horas.
  const carnetsWeb = registros.cached("archivos", liveOpts("archivos", hoy))
    .filter((archivo) => archivo.tipo === "carnet de vacunas" && archivo.creadoPor === "web"
      && Date.now() - Date.parse(archivo.creadoEn || "") < DAY_MS)
    .sort(byNewest);
  return { hoy, paseos, incidentes, checklists, pedidosNuevos, shifts, nowMin, effective, compliance, late, lateNow, avisos, carnetsWeb };
}

function lateSignature(live) {
  return live.late.map((stop) => `${stop.route.ruta}:${stop.perroId || stop.perroNombre}`).join("|");
}

// Primera carga del día: se pide todo una vez (para poder mostrar errores) y después
// registros.watch lo refresca solo cada minuto con la pestaña visible.
function startLive() {
  const hoy = hoyAR();
  if (!ui.adminLoaded) {
    ui.adminLoaded = true;
    refreshAdminData().finally(() => {
      ADMIN_COLS.forEach((col) => registros.watch(col, liveOpts(col, hoy)));
    });
  }
  if (ui.liveDay === hoy) return;
  ui.liveDay = hoy;
  refreshLive(false).finally(() => {
    LIVE_COLS.forEach((col) => registros.watch(col, liveOpts(col, hoy)));
  });
}

// Pagos, clientes y archivos (solo admin). Los errores de pagos y clientes se muestran en la
// sección de pagos; los de archivos, en "Archivos recibidos".
async function refreshAdminData() {
  const hoy = hoyAR();
  const results = await Promise.allSettled(ADMIN_COLS.map((col) => registros.list(col, liveOpts(col, hoy))));
  const errorsOf = (cols) => [...new Set(results
    .filter((r, i) => r.status === "rejected" && cols.includes(ADMIN_COLS[i]))
    .map((r) => r.reason?.message || "No se pudieron traer los datos."))].join(" ");
  const before = ui.adminError;
  const pagosError = errorsOf(["pagos", "clientes"]);
  const archivosError = errorsOf(["archivos"]);
  ui.adminError = [pagosError, archivosError].filter(Boolean).join(" ");
  if (pagosError) setMsg("pagos", `No se pudieron traer pagos o clientes: ${pagosError}`, true);
  if (archivosError) setMsg("archivos", `No se pudo traer la lista de archivos: ${archivosError}`, true);
  if (before !== ui.adminError) rerender();
}

async function refreshLive(manual) {
  const hoy = hoyAR();
  const results = await Promise.allSettled(LIVE_COLS.map((col) => registros.list(col, liveOpts(col, hoy))));
  const errors = [...new Set(results.filter((r) => r.status === "rejected").map((r) => r.reason?.message || "No se pudieron traer los datos."))];
  const before = ui.liveError;
  ui.liveError = errors.join(" ");
  if (ui.liveError) setMsg("live", `No se pudieron actualizar los datos del día: ${ui.liveError}`, true);
  else if (manual) setMsg("live", navigator.onLine === false ? "Sin conexión: se muestra lo último que llegó." : "Datos del día actualizados.");
  else if (before) setMsg("live", "Datos del día actualizados.");
  if (manual || before !== ui.liveError) rerender();
}

/* ---------- Usuarios y accesos ---------- */

// Etiquetas de los roles: ROLE_LABELS de src/api/client.js (incluye "Ayudante de paseador").
const PAGE_LABELS = { admin: "Admin", coordinador: "Coordinación", supervisor: "Supervisor", paseador: "Paseador" };
// Qué hace y qué datos ve cada rol (tabla de roles de docs/datos-compartidos.md, 13/11/2026,
// y api/_lib/permisos.js), en una línea.
const ROLE_DATA = {
  admin: "todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.",
  coordinador: "arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.",
  supervisor: "controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.",
  paseador: "hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.",
  ayudante: "acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.",
  marketing: "pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.",
};

function roleLine(rol) {
  const pages = (ROLE_PAGES[rol] || []).filter((page) => PAGE_LABELS[page])
    .map((page) => (rol === "ayudante" && page === "paseador" ? "Paseador (modo ayudante)" : PAGE_LABELS[page]));
  const panels = pages.length ? `Paneles: ${listJoin(pages)}.` : "Todavía no tiene panel.";
  return `${panels} Qué hace: ${ROLE_DATA[rol] || PENDIENTE}`;
}

function loadUsers() {
  ui.usersLoading = true;
  return usuarios.list()
    .then((list) => {
      ui.users = list;
      ui.usersError = "";
    })
    .catch((error) => {
      ui.usersError = error.message || "No se pudo traer la lista de usuarios.";
      setMsg("users", ui.usersError, true);
    })
    .finally(() => {
      ui.usersLoading = false;
      rerender();
    });
}

// Mismas reglas que el servidor (api/_lib/auth.js), para avisar antes de enviar.
function normalizeUsuario(value) {
  return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function pinProblem(pin) {
  if (!/^\d{6,8}$/.test(pin)) return "El PIN tiene que tener entre 6 y 8 números.";
  if (/^(\d)\1+$/.test(pin) || "0123456789".includes(pin) || "9876543210".includes(pin)) return "Ese PIN es muy fácil de adivinar. Elegí otro.";
  return "";
}

function randomPin() {
  for (;;) {
    const values = crypto.getRandomValues(new Uint8Array(6));
    const pin = [...values].map((v) => String(v % 10)).join("");
    if (!pinProblem(pin)) return pin;
  }
}

function credentialText(credential) {
  const loginUrl = `${window.location.origin}/login`;
  if (credential.tipo === "alta") {
    return `Tu usuario de la app de Paseos Juan es ${credential.usuario} y tu PIN inicial es ${credential.pin}. Entrá en ${loginUrl} y cambialo desde 'Cambiar mi PIN'.`;
  }
  return `Tu PIN nuevo de la app de Paseos Juan es ${credential.pin} (tu usuario es ${credential.usuario}). Entrá en ${loginUrl} y cambialo desde 'Cambiar mi PIN'.`;
}

/* ---------- Mensajes y redibujo ---------- */

// Mensaje visible en una región aria-live. "fresh" = todavía no se anunció.
function setMsg(area, text, error = false) {
  ui.msgs[area] = text ? { text, error, fresh: true } : null;
}

function MsgRegion(area) {
  const msg = ui.msgs[area];
  return `<p class="adm-msg ${msg?.error ? "is-error" : ""}" role="status" aria-live="polite" data-adm-msg="${area}">${msg && !msg.fresh ? esc(msg.text) : ""}</p>`;
}

function flushMsgs() {
  Object.entries(ui.msgs).forEach(([area, msg]) => {
    if (!msg?.fresh) return;
    const region = document.querySelector(`[data-adm-msg="${area}"]`);
    if (!region) return;
    region.textContent = msg.text;
    msg.fresh = false;
  });
}

// Cómo volver a encontrar el elemento con foco después de redibujar: por id o, si no tiene,
// por su atributo data-adm-* (y su posición entre los iguales). Los títulos de las secciones
// plegables se buscan por la sección.
function focusKey(el) {
  if (!el || el === document.body || !el.closest?.(".adm-shell")) return null;
  if (el.id) return { selector: `#${CSS.escape(el.id)}`, index: 0 };
  let selector = "";
  if (el.tagName === "SUMMARY" && el.parentElement) {
    const attr = [...el.parentElement.attributes].find((a) => a.name.startsWith("data-adm-"));
    if (attr) selector = `[${attr.name}="${CSS.escape(attr.value)}"] > summary`;
  } else {
    const attr = [...el.attributes].find((a) => a.name.startsWith("data-adm-") && a.name !== "data-adm-area");
    if (attr) selector = `${el.tagName.toLowerCase()}[${attr.name}="${CSS.escape(attr.value)}"]`;
  }
  if (!selector) return null;
  return { selector, index: Math.max(0, [...document.querySelectorAll(selector)].indexOf(el)) };
}

// Vuelve a dibujar sin perder el foco ni lo escrito (los borradores viven en "drafts").
function rerender() {
  if (!isAdminPage() || session.user()?.rol !== "admin") return;
  const active = document.activeElement;
  const key = focusKey(active);
  let selection = null;
  try {
    if (active && typeof active.selectionStart === "number") selection = [active.selectionStart, active.selectionEnd];
  } catch {
    selection = null;
  }
  render();
  if (!key) return;
  const matches = document.querySelectorAll(key.selector);
  const again = matches[key.index] || matches[0];
  if (!again) return;
  again.focus({ preventScroll: true });
  if (selection) {
    try {
      again.setSelectionRange(...selection);
    } catch {
      // Algunos tipos de campo no permiten selección.
    }
  }
}

/* ---------- Cálculos con datos reales ---------- */

// Perros que hoy figuran en BASE RUTAS como activos.
function activeDogs() {
  return REAL_DOGS.filter((dog) => dog.status === "Activo" && dog.days.length > 0);
}

function weeklyLoad() {
  const dogs = activeDogs();
  const rows = WEEK_DAYS.map((day) => {
    const morning = dogs.filter((dog) => goesOn(dog, day, SHIFT_MORNING)).length;
    const afternoon = dogs.filter((dog) => goesOn(dog, day, SHIFT_AFTERNOON)).length;
    const distinct = dogs.filter((dog) => dog.days.includes(day)).length;
    return { day, morning, afternoon, total: morning + afternoon, distinct };
  });
  const maxShift = Math.max(1, ...rows.map((row) => Math.max(row.morning, row.afternoon)));
  const maxTotal = Math.max(...rows.map((row) => row.total));
  const busiest = rows.filter((row) => row.total === maxTotal && maxTotal > 0).map((row) => row.day);
  const weekTotal = rows.reduce((sum, row) => sum + row.total, 0);
  const twoShifts = dogs.filter((dog) => dog.shifts.length > 1);
  return { rows, maxShift, maxTotal, busiest, weekTotal, twoShifts };
}

// Pares de perros marcados "no juntar" que comparten día y turno en BASE RUTAS.
function safetyConflicts() {
  const dogs = activeDogs();
  const byName = new Map(REAL_DOGS.map((dog) => [dog.name, dog]));
  const conflicts = [];
  const missing = [];
  const notRouted = [];
  const seen = new Set();

  REAL_DOGS.forEach((dog) => {
    (dog.incompatibleWith || []).forEach((otherName) => {
      const key = [dog.name, otherName].sort().join("|");
      if (seen.has(key)) return;
      seen.add(key);
      const other = byName.get(otherName);
      if (!other) {
        missing.push({ dog: dog.name, other: otherName });
        return;
      }
      if (!dogs.includes(dog) || !dogs.includes(other)) {
        notRouted.push({ dog: dog.name, other: otherName, idle: dogs.includes(dog) ? other.name : dog.name });
        return;
      }
      [SHIFT_MORNING, SHIFT_AFTERNOON].forEach((shift) => {
        const days = WEEK_DAYS.filter((day) => goesOn(dog, day, shift) && goesOn(other, day, shift));
        if (days.length) conflicts.push({ a: dog.name, b: other.name, shift, days });
      });
    });
  });
  return { conflicts, missing, notRouted };
}

function safetyDogs() {
  return activeDogs().filter((dog) => dog.safety.some((note) => /bozal|no juntar/i.test(note)));
}

function reviewDogs() {
  return REAL_DOGS.filter((dog) => dog.review || dog.status !== "Activo");
}

function routeFor(shift) {
  return shift === SHIFT_MORNING ? SHIFTS.manana.route : SHIFTS.tarde.routes.join(" o ");
}

// ¿El pedido trae carnet de vacunas? (campo carnet del formulario web o un archivo con su pedidoId)
function hasCarnet(pedido, live) {
  return Boolean(pedido.carnet?.id) || live.carnetsWeb.some((archivo) => archivo.pedidoId === pedido.id);
}

// Hasta 3 prioridades calculadas, en orden: incidente de hoy, atrasos del turno actual,
// pedidos nuevos (con los carnets que llegaron por la web), cruces de seguridad, datos, evaluación.
function buildPriorities(live = liveData()) {
  const { conflicts } = safetyConflicts();
  const statusIssues = REAL_DOGS.filter((dog) => dog.status !== "Activo");
  const reviews = reviewDogs();
  const toEvaluate = safetyDogs().filter((dog) => dog.category === "SIN EVALUAR");
  const active = activeDogs();
  const unevaluated = active.filter((dog) => dog.category === "SIN EVALUAR");
  const priorities = [];

  if (live.incidentes.length) {
    const count = live.incidentes.length;
    const latest = live.incidentes[0];
    const dogs = [...new Set(live.incidentes.map((item) => item.perroNombre).filter(Boolean))];
    const who = latest.creadoPorNombre || "quien lo cargó";
    priorities.push({
      id: `incidentes-${live.hoy}-${count}`,
      tag: "Incidente de hoy",
      tone: "danger",
      title: count === 1
        ? `Hubo un incidente hoy${dogs.length ? ` con ${dogs[0]}` : ""}`
        : `Hubo ${count} incidentes hoy${dogs.length ? ` (${listJoin(dogs)})` : ""}`,
      detail: `${count > 1 ? "El último lo cargó" : "Lo cargó"} ${who}${recordTime(latest) ? ` a las ${recordTime(latest)}` : ""}. Riesgo: ${latest.riesgo || PENDIENTE}. Lesiones: ${latest.lesiones || PENDIENTE}.`,
      action: `Leé el incidente${dogs.length ? ` de ${listJoin(dogs)}` : ""} y hablá con ${who} antes de que termine el día.`,
      target: "adm-vivo",
      targetLabel: count === 1 ? "Ver el incidente" : "Ver los incidentes",
    });
  }

  if (live.lateNow.length) {
    const count = live.lateNow.length;
    const turno = live.nowMin < MIDDAY ? "mañana" : "tarde";
    const sorted = live.lateNow.slice().sort((x, y) => y.atraso - x.atraso);
    const worst = sorted[0];
    const names = sorted.slice(0, 3).map((stop) => `${stop.perroNombre} (${stop.hora}, ${stop.route.ruta})`);
    const routes = [...new Set(sorted.map((stop) => stop.route.ruta))];
    const contact = worst.route.supervisor || nameOf(worst.route.paseador) || "el supervisor del turno";
    // Si hoy nadie marcó ningún paseo en la app, lo más probable es que no se esté usando:
    // se dice así en vez de dar a todos por atrasados.
    if (!live.paseos.length) {
      priorities.push({
        id: `atrasos-sin-marcas-${live.hoy}-${turno}`,
        tag: "Atrasos",
        tone: "warning",
        title: `Nadie marcó retiros hoy: ${plural(count, "perro figura", "perros figuran")} pasados de hora en el turno ${turno}`,
        detail: `Según la ruta de hoy, ${listJoin(names)}${count > 3 ? ` y ${plural(count - 3, "más", "más")}` : ""} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,
        action: `Preguntale a ${contact} si el equipo está marcando los retiros en la página del paseador.`,
        target: "adm-cumplimiento",
        targetLabel: "Ver el cumplimiento",
      });
    } else priorities.push({
      id: `atrasos-${live.hoy}-${turno}-${count}`,
      tag: "Atrasos",
      tone: "warning",
      title: `${plural(count, "perro atrasado", "perros atrasados")} en el turno ${turno}`,
      detail: `${listJoin(names)}${count > 3 ? ` y ${plural(count - 3, "más", "más")}` : ""}. Pasaron más de ${LATE_MINUTES} minutos de la hora prevista y nadie marcó el retiro.`,
      action: `Preguntale a ${contact} qué pasa con ${worst.perroNombre} (retiro previsto ${worst.hora}, ruta ${routes.join(" y ")}).`,
      target: "adm-cumplimiento",
      targetLabel: count === 1 ? "Ver el atraso" : "Ver los atrasos",
    });
  }

  // Pedidos nuevos. Un carnet que llegó por la web en las últimas 24 h cuenta como "pedido nuevo
  // con carnet" dentro de esta misma prioridad (no suma una prioridad aparte).
  const pedidoIds = new Set(live.pedidosNuevos.map((pedido) => pedido.id));
  const carnetsSueltos = live.carnetsWeb.filter((archivo) => !pedidoIds.has(archivo.pedidoId));
  if (live.pedidosNuevos.length || carnetsSueltos.length) {
    const count = live.pedidosNuevos.length;
    const conCarnet = live.pedidosNuevos.filter((pedido) => hasCarnet(pedido, live));
    const titleOf = (pedido) => pedido.titulo || pedido.tipo || "Pedido sin título";
    const sueltosNames = [...new Set(carnetsSueltos.map((archivo) => archivo.perroNombre || "perro sin nombre"))];
    const sueltosText = carnetsSueltos.length
      ? `${count ? "Además, l" : "L"}${carnetsSueltos.length === 1 ? "legó 1 carnet de vacunas" : `legaron ${carnetsSueltos.length} carnets de vacunas`} por la web en las últimas 24 h (${listJoin(sueltosNames)}) de ${carnetsSueltos.length === 1 ? "un pedido que" : "pedidos que"} ya no ${carnetsSueltos.length === 1 ? "está" : "están"} como nuevo${carnetsSueltos.length === 1 ? "" : "s"}.`
      : "";
    if (count) {
      const titles = live.pedidosNuevos.slice(0, 3).map((pedido) => `${titleOf(pedido)}${hasCarnet(pedido, live) ? " (con carnet)" : ""}`);
      const oldestPedido = live.pedidosNuevos[count - 1];
      const oldest = titleOf(oldestPedido);
      const carnetCount = conCarnet.length + carnetsSueltos.length;
      priorities.push({
        id: `pedidos-${live.pedidosNuevos[0].id}-${count}-${carnetCount}`,
        tag: "Pedidos",
        tone: "info",
        title: `${plural(count, "pedido nuevo", "pedidos nuevos")} sin responder${conCarnet.length ? ` · ${conCarnet.length === count && count === 1 ? "trae carnet de vacunas" : `${conCarnet.length} con carnet`}` : ""}`,
        detail: `${listJoin(titles)}${count > 3 ? ` y ${plural(count - 3, "más", "más")}` : ""}. Llegan del formulario de la web o los carga el equipo.${sueltosText ? ` ${sueltosText}` : ""}`,
        action: count === 1
          ? `Respondé el pedido “${oldest}”${hasCarnet(oldestPedido, live) ? " y mirá el carnet que mandó" : ""}.`
          : `Respondé los ${count} pedidos nuevos, empezando por el más viejo: “${oldest}”${hasCarnet(oldestPedido, live) ? " (trae carnet)" : ""}.`,
        target: "adm-pedidos",
        targetLabel: count === 1 ? "Ver el pedido" : "Ver los pedidos",
      });
    } else {
      const first = carnetsSueltos[0];
      priorities.push({
        id: `carnets-web-${first.id}-${carnetsSueltos.length}`,
        tag: "Pedidos",
        tone: "info",
        title: carnetsSueltos.length === 1
          ? `Pedido nuevo con carnet: llegó el carnet de ${first.perroNombre || "un perro"} por la web`
          : `Pedidos nuevos con carnet: llegaron ${carnetsSueltos.length} carnets por la web`,
        detail: sueltosText,
        action: `Abrí el carnet de ${first.perroNombre || "ese perro"} en “Archivos recibidos” y sumalo a su ficha.`,
        target: "adm-archivos",
        targetLabel: carnetsSueltos.length === 1 ? "Ver el carnet" : "Ver los carnets",
      });
    }
  }

  if (conflicts.length) {
    const main = conflicts.map((c) => c.a).concat(conflicts.map((c) => c.b));
    const counts = main.reduce((acc, name) => ({ ...acc, [name]: (acc[name] || 0) + 1 }), {});
    const center = Object.keys(counts).sort((x, y) => counts[y] - counts[x])[0];
    const others = [...new Set(conflicts.flatMap((c) => [c.a, c.b]).filter((name) => name !== center))];
    const shifts = [...new Set(conflicts.map((c) => c.shift))];
    const routes = shifts.map(routeFor).join(" y ");
    priorities.push({
      id: "seguridad-cruces",
      tag: "Seguridad",
      tone: "danger",
      title: `${center} comparte turno con perros marcados “no juntar”`,
      detail: `Según BASE RUTAS, ${center} sale en el turno ${shifts.map((s) => s.toLowerCase()).join(" y ")} (ruta ${routes}) los mismos días que ${listJoin(others)}. Hay ${plural(conflicts.length, "cruce", "cruces")} en la semana.`,
      action: `Confirmá con Sebastián cómo se separa a ${center} de ${listJoin(others)} en la ruta ${routes}.`,
      target: "adm-seguridad",
      targetLabel: "Ver los cruces",
    });
  }

  if (reviews.length) {
    const names = statusIssues.map((dog) => dog.name);
    priorities.push({
      id: "datos-a-revisar",
      tag: "Datos",
      tone: "warning",
      title: `${plural(reviews.length, "perro tiene", "perros tienen")} datos a revisar`,
      detail: statusIssues.length
        ? `Primero el estado de ${listJoin(names)}: ${statusIssues.length === 1 ? "no está" : "no están"} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`
        : "Planes que no coinciden con los días, nombres distintos o duración a revisar.",
      action: statusIssues.length
        ? `Decidí el estado de ${listJoin(names)} y corregilo en la planilla.`
        : "Revisá la lista de datos a confirmar y corregí la planilla.",
      target: "adm-datos",
      targetLabel: "Ver la lista",
    });
  }

  if (unevaluated.length) {
    const first = toEvaluate.length ? toEvaluate : unevaluated.slice(0, 5);
    priorities.push({
      id: "evaluaciones",
      tag: "Evaluación",
      tone: "info",
      title: `${unevaluated.length} de ${active.length} perros en ruta siguen SIN EVALUAR`,
      detail: `Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${listJoin(first.map((dog) => dog.name))}.`,
      action: `Agendá la evaluación de ${listJoin(first.map((dog) => dog.name))}.`,
      target: "adm-seguridad",
      targetLabel: "Ver indicaciones de seguridad",
    });
  }

  return priorities.slice(0, 3);
}

function theoreticalBilling() {
  const dogs = activeDogs();
  const included = [];
  const excluded = [];
  dogs.forEach((dog) => {
    const plan = REAL_PLANS.find((item) => item.name === dog.plan);
    const price = plan?.prices[dog.size];
    if (price) included.push({ dog, plan, price });
    else excluded.push(dog);
  });
  const byPlan = REAL_PLANS.map((plan) => {
    const rows = included.filter((item) => item.plan.id === plan.id);
    return { plan, count: rows.length, subtotal: rows.reduce((sum, item) => sum + item.price, 0) };
  });
  const total = included.reduce((sum, item) => sum + item.price, 0);
  const excludedPlans = [...new Set(excluded.map((dog) => dog.plan))];
  return { included, excluded, excludedPlans, byPlan, total };
}

/* ---------- Componentes ---------- */

export function adminShell(content) {
  return `
    <div class="adm-shell">
      ${AdminHeader()}
      ${content}
    </div>
  `;
}

function AdminHeader() {
  return `
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${icon("lock", "adm-icon-sm")} ${esc(currentUser().nombre)} · ${esc(ROLE_LABELS[currentUser().rol] || currentUser().rol)}</span>
        <button class="adm-button adm-button--ghost" type="button" data-adm-a11y>
          ${icon("eye", "adm-icon-sm")}
          <span>Accesibilidad</span>
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-admin-logout>
          ${icon("logOut", "adm-icon-sm")}
          <span>Salir</span>
        </button>
      </div>
    </header>
  `;
}

export function adminDashboard() {
  startLive();
  if (ui.users === null && !ui.usersLoading && !ui.usersError) loadUsers();
  const live = liveData();
  ui.lateSignature = lateSignature(live);
  const priorities = buildPriorities(live);
  const done = readDone();
  const open = openSections();
  // Los mensajes nuevos se escriben un instante después, para que el lector de pantalla los lea.
  setTimeout(flushMsgs, 60);

  return `
    <main class="adm-page" id="adm-main">
      ${TodayHero(priorities, done, live)}
      ${LivePanel(live)}
      ${SafetyPanel()}
      ${UsersPanel()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${icon("chevronDown", "adm-icon-sm")} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${icon("copy", "adm-icon-sm")} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${ReviewSection(open)}
        ${ArchivosSection(open)}
        ${LoadSection(open)}
        ${ClientesSection(open)}
        ${PagosSection(open)}
        ${FactsSection(open)}
        ${TeamSection(open)}
        ${PricesSection(open)}
        ${FinanceSection(open)}
      </div>
      ${SourcesFooter()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `;
}

function TodayHero(priorities, done, live) {
  const { dayName, date } = todayInfo();
  const dogs = activeDogs();
  const morning = dogs.filter((dog) => goesOn(dog, dayName, SHIFT_MORNING)).length;
  const afternoon = dogs.filter((dog) => goesOn(dog, dayName, SHIFT_AFTERNOON)).length;
  const next = priorities.find((priority) => !done.includes(priority.id));
  const todayLine = morning + afternoon
    ? `Según BASE RUTAS, hoy salen ${plural(morning, "perro", "perros")} a la mañana y ${plural(afternoon, "perro", "perros")} a la tarde.`
    : "Hoy no hay paseos cargados en BASE RUTAS.";
  const name = firstName(currentUser().nombre);

  return `
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${esc(dayName)} ${esc(date)}</p>
        <h1 id="adm-hero-title">Hola${name ? `, ${esc(name)}` : ""}</h1>
        <p class="adm-hero-sub">${todayLine}</p>
        ${live.incidentes.length ? `
          <p class="adm-hero-alert">${icon("alertTriangle", "adm-icon-sm")} ${plural(live.incidentes.length, "incidente cargado hoy", "incidentes cargados hoy")}. Está primero en tus prioridades.</p>
        ` : ""}
      </div>

      ${next ? `
        <div class="adm-next" aria-labelledby="adm-next-title">
          <p class="adm-next-label" id="adm-next-title">${icon("arrowRight", "adm-icon-sm")} Próximo paso</p>
          <p class="adm-next-text">${esc(next.action)}</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-done="${next.id}">
              ${icon("checkCircle", "adm-icon-sm")} Listo, ya lo hice
            </button>
            <button class="adm-button adm-button--ghost" type="button" data-adm-goto="${next.target}">
              ${esc(next.targetLabel)}
            </button>
          </div>
        </div>
      ` : `
        <div class="adm-next adm-next--done">
          <p class="adm-next-label">${icon("checkCircle", "adm-icon-sm")} Próximo paso</p>
          <p class="adm-next-text">Marcaste las prioridades como hechas. Abrí “Carga semanal” y revisá el día con más perros.</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-goto="adm-carga">Ver la carga semanal</button>
          </div>
        </div>
      `}

      <h2 class="adm-priorities-title">Tus ${priorities.length} prioridades</h2>
      <ol class="adm-priorities">
        ${priorities.map((priority, index) => {
          const isDone = done.includes(priority.id);
          return `
            <li class="adm-priority adm-priority--${priority.tone} ${isDone ? "is-done" : ""}">
              <span class="adm-priority-number" aria-hidden="true">${index + 1}</span>
              <div class="adm-priority-body">
                <p class="adm-tag adm-tag--${priority.tone}">${priority.tag}${isDone ? " · Hecho" : ""}</p>
                <h3>${esc(priority.title)}</h3>
                <p>${esc(priority.detail)}</p>
                <button class="adm-link-button" type="button" data-adm-done="${priority.id}" aria-pressed="${isDone}">
                  ${isDone ? "Desmarcar" : "Marcar como hecho"}
                </button>
              </div>
            </li>
          `;
        }).join("")}
      </ol>
      <p class="adm-note">Las marcas de “hecho” se guardan solo en este dispositivo.</p>
    </section>
  `;
}

/* ---------- El día en vivo ---------- */

const ESTADOS = {
  pendiente: { label: "Por retirar", tone: "neutral" },
  retirado: { label: "Retirado", tone: "info" },
  paseando: { label: "Paseando", tone: "info" },
  entregado: { label: "Entregado", tone: "ok" },
  "no-sale": { label: "No sale", tone: "warning" },
};

function plannedToday(shift) {
  const { dayName } = todayInfo();
  return activeDogs().filter((dog) => goesOn(dog, dayName, shift)).length;
}

// Nombre de un usuario a partir de la lista de usuarios (si ya llegó).
function nameOf(usuario) {
  return ui.users?.find((user) => user.usuario === usuario)?.nombre || usuario || "";
}

// "Cargado por Sebastián a las 10:15" (o "Actualizado por …" si lo tocó otra persona).
function byLine(record, onlyCreated = false) {
  if (!onlyCreated && record.actualizadoPor && record.actualizadoPor !== record.creadoPor) {
    const time = timeAR(record.actualizadoEn);
    return `Actualizado por ${nameOf(record.actualizadoPor)}${time ? ` a las ${time}` : ""}`;
  }
  const who = record.creadoPorNombre || nameOf(record.creadoPor);
  const time = timeAR(onlyCreated ? record.creadoEn : record.actualizadoEn || record.creadoEn);
  if (who) return `Cargado por ${who}${time ? ` a las ${time}` : ""}`;
  return time ? `Cargado a las ${time}` : "";
}

function ShiftCard(shift) {
  const info = {
    manana: { title: "Turno mañana", hours: `${SHIFTS.manana.from} a ${SHIFTS.manana.to}`, planned: plannedToday(SHIFT_MORNING) },
    tarde: { title: "Turno tarde", hours: `${SHIFTS.tarde.from} a ${SHIFTS.tarde.to}`, planned: plannedToday(SHIFT_AFTERNOON) },
    otro: { title: "Sin turno indicado", hours: "", planned: null },
  }[shift.key];
  if (shift.key === "otro" && !shift.total) return "";
  const ratio = shift.salen ? shift.entregados / shift.salen : 0;
  const openKey = `perros-${shift.key}`;

  return `
    <article class="adm-shift" aria-labelledby="adm-shift-${shift.key}">
      <h3 id="adm-shift-${shift.key}">${info.title}${info.hours ? ` <span class="adm-th-sub">${info.hours}</span>` : ""}</h3>
      ${shift.total ? `
        <p class="adm-shift-big"><strong>${shift.entregados}</strong> de ${plural(shift.salen, "perro entregado", "perros entregados")}</p>
        <span class="adm-progress" aria-hidden="true"><span style="--v:${ratio.toFixed(3)}"></span></span>
        <ul class="adm-shift-stats">
          <li><strong>${shift.retirados}</strong> retirados</li>
          <li><strong>${shift.paseando}</strong> paseando</li>
          <li><strong>${shift.pendientes}</strong> por retirar</li>
          ${shift.noSale ? `<li><strong>${shift.noSale}</strong> no ${shift.noSale === 1 ? "sale" : "salen"}</li>` : ""}
        </ul>
        <details class="adm-inner adm-dogs" data-adm-dogs="${openKey}" ${ui.openDogs.has(openKey) ? "open" : ""}>
          <summary>Ver los ${shift.total} perros</summary>
          <ul class="adm-dog-list">
            ${shift.rows.slice().sort((a, b) => String(a.perroNombre || "").localeCompare(String(b.perroNombre || ""))).map((record) => {
              const estado = ESTADOS[record.estado || "pendiente"] || { label: record.estado, tone: "neutral" };
              return `
                <li>
                  <span class="adm-dog-name">${esc(record.perroNombre || record.perroId || "Perro sin nombre")}</span>
                  <span class="adm-pill adm-pill--${estado.tone}">${esc(estado.label)}${record.pendiente ? " · sin enviar" : ""}</span>
                  <span class="adm-dog-meta">${esc(byLine(record))}${record.nota ? ` · Nota: ${esc(record.nota)}` : ""}</span>
                </li>
              `;
            }).join("")}
          </ul>
        </details>
      ` : `<p class="adm-empty">Todavía nadie cargó paseos de este turno. Los marca el paseador en su página al retirar a cada perro.</p>`}
      ${info.planned !== null ? `<p class="adm-note">Previstos según BASE RUTAS: ${info.planned}.${shift.total ? " “Retirados” incluye a los que ya están paseando o entregados." : ""}</p>` : ""}
    </article>
  `;
}

function IncidentList(incidentes) {
  const fields = [
    ["perroNombre", "Perro"],
    ["lugar", "Lugar"],
    ["antes", "Antes"],
    ["conducta", "Qué pasó"],
    ["accion", "Qué se hizo"],
    ["despues", "Después"],
    ["lesiones", "Lesiones"],
    ["protocolo", "Protocolo"],
  ];
  return `
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${icon("alertTriangle", "adm-icon-sm")} ${plural(incidentes.length, "incidente hoy", "incidentes hoy")}</h3>
      <ul class="adm-incident-list">
        ${incidentes.map((item) => `
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${esc(item.titulo || item.perroNombre || "Incidente")}</strong>
              ${recordTime(item) ? `<span class="adm-muted">${esc(recordTime(item))} h</span>` : ""}
              ${item.riesgo ? `<span class="adm-pill adm-pill--danger">Riesgo: ${esc(item.riesgo)}</span>` : ""}
            </div>
            <dl class="adm-incident-facts">
              ${fields.filter(([key]) => item[key] && !(key === "perroNombre" && !item.titulo)).map(([key, label]) => `
                <div><dt>${label}</dt><dd>${esc(Array.isArray(item[key]) ? item[key].join(", ") : item[key])}</dd></div>
              `).join("")}
            </dl>
            ${byLine(item, true) ? `<p class="adm-note">${esc(byLine(item, true))}.</p>` : ""}
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function checklistLine(record) {
  const items = record.items && typeof record.items === "object" ? Object.values(record.items) : [];
  const ok = items.filter(Boolean).length;
  const complete = record.completo === true || (items.length > 0 && ok === items.length);
  return { complete, text: items.length ? `${ok} de ${items.length} ítems` : "" };
}

const STOP_STATUS = {
  "a-tiempo": { label: "A tiempo", tone: "ok" },
  atrasado: { label: "Atrasado", tone: "danger" },
  entregado: { label: "Entregado", tone: "ok" },
  "no-sale": { label: "No sale", tone: "warning" },
};

const ROUTE_SOURCE = {
  dia: "Cambio del día",
  plantilla: "Plantilla semanal",
  planilla: "Planilla BASE RUTAS",
};

function stopLine(stop) {
  const estado = ESTADOS[stop.estado] || { label: stop.estado };
  const parts = [`Retiro previsto ${stop.hora || PENDIENTE.toLowerCase()}`];
  if (stop.status === "atrasado") parts.push(`${stop.atraso} min de atraso`);
  else if (stop.paseo) parts.push(estado.label);
  if (stop.paseo?.horaRetiro) parts.push(`retirado ${stop.paseo.horaRetiro}`);
  if (stop.paseo?.horaEntrega) parts.push(`entregado ${stop.paseo.horaEntrega}`);
  return parts.join(" · ");
}

function RouteCard(item) {
  const { route, stops } = item;
  const salen = stops.length - item.noSale;
  const openKey = `ruta-${route.ruta}`;
  const people = [
    route.paseador ? `Paseador: ${nameOf(route.paseador)}` : "Paseador: sin asignar",
    route.ayudante ? `Ayudante: ${nameOf(route.ayudante)}` : "",
    route.supervisor ? `Supervisa: ${route.supervisor}` : "",
  ].filter(Boolean).join(" · ");
  const late = stops.filter((stop) => stop.status === "atrasado").sort((a, b) => b.atraso - a.atraso);

  return `
    <article class="adm-shift adm-route ${late.length ? "has-late" : ""}" aria-labelledby="adm-route-${esc(route.ruta)}">
      <h4 id="adm-route-${esc(route.ruta)}">${esc(route.ruta || "Ruta sin código")} <span class="adm-th-sub">${esc(route.turno || "Turno sin indicar")} · ${esc(ROUTE_SOURCE[route.fuente] || "")}</span></h4>
      <p class="adm-dog-meta">${esc(people)}</p>
      ${stops.length ? `
        <ul class="adm-route-stats" aria-label="Cumplimiento de ${esc(route.ruta)}">
          <li class="is-ok"><strong>${item.aTiempo}</strong> a tiempo</li>
          <li class="${item.atrasados ? "is-late" : ""}"><strong>${item.atrasados}</strong> ${item.atrasados === 1 ? "atrasado" : "atrasados"}</li>
          <li><strong>${item.entregados}</strong> de ${salen} ${item.entregados === 1 ? "entregado" : "entregados"}</li>
          ${item.noSale ? `<li><strong>${item.noSale}</strong> no ${item.noSale === 1 ? "sale" : "salen"}</li>` : ""}
        </ul>
        ${late.length ? `
          <ul class="adm-late-list" aria-label="Atrasados de ${esc(route.ruta)}">
            ${late.map((stop) => `<li><strong>${esc(stop.perroNombre || "Perro sin nombre")}</strong> <span>retiro ${esc(stop.hora)} · ${stop.atraso} min sin retiro</span></li>`).join("")}
          </ul>
        ` : ""}
        <details class="adm-inner adm-dogs" data-adm-dogs="${esc(openKey)}" ${ui.openDogs.has(openKey) ? "open" : ""}>
          <summary>Ver las ${stops.length} paradas en orden</summary>
          <ol class="adm-dog-list adm-stop-list">
            ${stops.map((stop) => {
              let st = STOP_STATUS[stop.status];
              if (stop.status === "a-tiempo") {
                st = stop.estado === "pendiente"
                  ? { label: "Por retirar · a tiempo", tone: "neutral" }
                  : { label: `${(ESTADOS[stop.estado] || { label: stop.estado }).label} · a tiempo`, tone: "info" };
              }
              return `
                <li>
                  <span class="adm-dog-name">${esc(stop.hora || "--:--")} · ${esc(stop.perroNombre || "Perro sin nombre")}</span>
                  <span class="adm-pill adm-pill--${st.tone}">${esc(st.label)}${stop.paseo?.pendiente ? " · sin enviar" : ""}</span>
                  <span class="adm-dog-meta">${esc(stopLine(stop))}${stop.nota ? ` · Nota: ${esc(stop.nota)}` : ""}</span>
                </li>
              `;
            }).join("")}
          </ol>
        </details>
      ` : `<p class="adm-empty">Esta ruta no tiene paradas cargadas.</p>`}
    </article>
  `;
}

function CompliancePanel(live) {
  const { compliance, effective, late } = live;
  return `
    <div class="adm-compliance" id="adm-cumplimiento" tabindex="-1" role="region" aria-labelledby="adm-compliance-title">
      <h3 id="adm-compliance-title">${icon("route", "adm-icon-sm")} Cumplimiento por ruta ${late.length ? `<span class="adm-count adm-count--danger">${plural(late.length, "atrasado", "atrasados")}</span>` : ""}</h3>
      <p class="adm-note">Atrasado = pasaron más de ${LATE_MINUTES} minutos de la hora prevista y nadie marcó el retiro. Hora de Argentina.</p>
      ${effective.fromSheet ? `
        <p class="adm-warn-box">${icon("alertCircle", "adm-icon-sm")} <span>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${PENDIENTE.toLowerCase()}.</span></p>
      ` : ""}
      ${compliance.length ? `
        <div class="adm-live-grid">${compliance.map(RouteCard).join("")}</div>
      ` : `<p class="adm-empty">Hoy no hay rutas: ni cambios del día, ni plantilla, ni paseos en la planilla.</p>`}
    </div>
  `;
}

const AVISO_TONES = { "perro suelto": "danger", seguridad: "danger", "obra o corte": "warning", clima: "info", "cambio de horario": "info" };

function AvisosPanel(live) {
  const { avisos } = live;
  return `
    <div class="adm-avisos" id="adm-avisos" role="region" aria-labelledby="adm-avisos-title">
      <h3 id="adm-avisos-title">${icon("mapPin", "adm-icon-sm")} Avisos por barrio vigentes <span class="adm-count">${avisos.length}</span></h3>
      ${avisos.length ? `
        <ul class="adm-aviso-list">
          ${avisos.map((aviso) => `
            <li class="adm-aviso">
              <div class="adm-aviso-head">
                <strong>${esc(aviso.barrio || "Barrio sin indicar")}</strong>
                <span class="adm-pill adm-pill--${AVISO_TONES[aviso.tipo] || "neutral"}">${esc(aviso.tipo || "otro")}</span>
                <span class="adm-muted">${aviso.vigenteHasta ? `Hasta el ${esc(ymdToAR(aviso.vigenteHasta))}` : "Solo hoy"}</span>
              </div>
              <p>${esc(aviso.mensaje || aviso.titulo || "")}</p>
              ${byLine(aviso, true) ? `<p class="adm-note">${esc(byLine(aviso, true))}.</p>` : ""}
            </li>
          `).join("")}
        </ul>
      ` : `<p class="adm-empty">No hay avisos vigentes por barrio. Los cargan el coordinador o el supervisor cuando pasa algo en una zona.</p>`}
    </div>
  `;
}

function LivePanel(live) {
  const offline = navigator.onLine === false;
  const { checklists, pedidosNuevos } = live;

  return `
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${icon("radio", "adm-icon")}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${esc(ymdToAR(live.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" id="adm-live-refresh" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${offline ? `<p class="adm-msg is-error">Sin conexión: ves lo último que llegó. Se actualiza solo cuando vuelve la señal.</p>` : ""}
      ${MsgRegion("live")}

      ${live.incidentes.length ? IncidentList(live.incidentes) : `
        <p class="adm-live-ok">${icon("checkCircle", "adm-icon-sm")} Sin incidentes cargados hoy.</p>
      `}

      ${CompliancePanel(live)}
      ${AvisosPanel(live)}

      <div class="adm-live-grid">
        ${live.shifts.map(ShiftCard).join("")}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${checklists.length ? `
            <ul class="adm-mini-list">
              ${checklists.map((record) => {
                const line = checklistLine(record);
                return `
                  <li>
                    <span><strong>${esc(record.creadoPorNombre || record.creadoPor || "Sin nombre")}</strong> · ${esc(record.turno || "Turno sin indicar")}</span>
                    <span class="adm-pill ${line.complete ? "adm-pill--ok" : "adm-pill--warning"}">${line.complete ? "Completo" : "Incompleto"}${line.text ? ` · ${line.text}` : ""}</span>
                  </li>
                `;
              }).join("")}
            </ul>
          ` : `<p class="adm-empty">Nadie cargó el checklist hoy. Lo completa cada paseador en su página antes de salir.</p>`}
        </article>

        <article class="adm-shift" id="adm-pedidos" tabindex="-1" aria-labelledby="adm-live-pedidos">
          <h3 id="adm-live-pedidos">Pedidos nuevos <span class="adm-count">${pedidosNuevos.length}</span></h3>
          ${pedidosNuevos.length ? `
            <ul class="adm-mini-list adm-pedido-list">
              ${pedidosNuevos.slice(0, 6).map((pedido) => {
                const carnetId = pedido.carnet?.id || live.carnetsWeb.find((archivo) => archivo.pedidoId === pedido.id)?.id || "";
                return `
                  <li>
                    <span><strong>${esc(pedido.titulo || pedido.tipo || "Pedido sin título")}</strong></span>
                    ${carnetId ? `<span class="adm-pill adm-pill--ok">${icon("fileCheck", "adm-icon-xs")} Trae carnet</span>` : ""}
                    <span class="adm-dog-meta">${esc(ymdToAR(pedido.fecha) || dateAR(pedido.creadoEn))} · ${pedido.origen === "web" ? "Formulario web" : esc(pedido.creadoPorNombre || "Cargado en la app")}</span>
                    ${carnetId ? `<button class="adm-link-button" type="button" data-adm-archivo-abrir="${esc(carnetId)}" data-adm-area="live">Ver el carnet${pedido.datos?.perro ? ` de ${esc(pedido.datos.perro)}` : ""}</button>` : ""}
                  </li>
                `;
              }).join("")}
            </ul>
            ${pedidosNuevos.length > 6 ? `<p class="adm-note">Y ${plural(pedidosNuevos.length - 6, "pedido más", "pedidos más")}. Los responde el coordinador desde su página.</p>` : ""}
          ` : `<p class="adm-empty">No hay pedidos nuevos. Llegan del formulario de la web o los carga el equipo.</p>`}
        </article>
      </div>
    </section>
  `;
}

/* ---------- Usuarios y accesos ---------- */

function roleOptions(selected) {
  return Object.entries(ROLE_LABELS).map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`).join("");
}

function CredentialBox() {
  const cred = ui.credential;
  if (!cred) return "";
  const text = credentialText(cred);
  return `
    <div class="adm-cred" id="adm-cred" tabindex="-1" role="region" aria-labelledby="adm-cred-title">
      <p class="adm-tag adm-tag--warning">Solo se muestra ahora</p>
      <h3 id="adm-cred-title">${cred.tipo === "alta" ? `Usuario creado: ${esc(cred.nombre)}` : `PIN nuevo de ${esc(cred.nombre)}`}</h3>
      <p>Copiá este mensaje y mandáselo por WhatsApp:</p>
      <p class="adm-cred-text">${esc(text)}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="button" data-adm-cred-copy>${icon("copy", "adm-icon-sm")} Copiar mensaje</button>
        <a class="adm-button adm-button--ghost" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener noreferrer">${icon("message", "adm-icon-sm")} Abrir WhatsApp</a>
        <button class="adm-button adm-button--ghost" type="button" data-adm-cred-hide>Listo, ya lo mandé</button>
      </div>
      <p class="adm-note">Este PIN no queda guardado en la página: cuando tocás “Listo” desaparece. Si se pierde, resetealo.</p>
    </div>
  `;
}

function CreateForm() {
  const d = drafts.crear;
  const team = listJoin(TEAM.map((person) => person.name));
  return `
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${esc(team)}. Si vas a sumar a otra persona, confirmalo antes.</p>
      <div class="adm-form-grid">
        <label class="adm-field" for="adm-crear-nombre">
          <span>Nombre</span>
          <input class="adm-input" id="adm-crear-nombre" name="nombre" autocomplete="off" maxlength="60" required placeholder="Ej. Sebastián" value="${esc(d.nombre)}" data-adm-draft="crear" data-adm-key="nombre" />
        </label>
        <label class="adm-field" for="adm-crear-usuario">
          <span>Usuario <small>para entrar, sin espacios</small></span>
          <input class="adm-input" id="adm-crear-usuario" name="usuario" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="31" required placeholder="Ej. sebastian" value="${esc(d.usuario)}" data-adm-draft="crear" data-adm-key="usuario" />
        </label>
        <label class="adm-field" for="adm-crear-rol">
          <span>Rol</span>
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${roleOptions(d.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${esc(d.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${esc(ROLE_LABELS[d.rol] || d.rol)}:</strong> ${esc(roleLine(d.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${icon("userPlus", "adm-icon-sm")} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `;
}

function ResetForm(user) {
  const reactivar = !user.activo;
  return `
    <form class="adm-form adm-form--inline" data-adm-form="reset" data-adm-usuario="${esc(user.usuario)}" novalidate aria-labelledby="adm-reset-title">
      <p id="adm-reset-title"><strong>${reactivar ? "Reactivar" : "Resetear el PIN de"} ${esc(user.nombre)}.</strong> ${reactivar ? "Va a poder entrar de nuevo con este PIN." : "Se cierra su sesión en todos lados y entra con el PIN nuevo."}</p>
      <label for="adm-reset-pin"><span>PIN nuevo <small>6 a 8 números</small></span></label>
      <div class="adm-pin-row">
        <input class="adm-input" id="adm-reset-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${esc(drafts.reset.pin)}" data-adm-draft="reset" data-adm-key="pin" />
        <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="reset">Generar</button>
      </div>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${reactivar ? "Reactivar" : "Guardar PIN nuevo"}</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-reset-cancel>Cancelar</button>
      </div>
    </form>
  `;
}

function ConfirmOff(user) {
  return `
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${esc(user.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${esc(user.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `;
}

function UserRow(user, me) {
  const isMe = user.usuario === me;
  const roleDraft = drafts.roles[user.usuario] || user.rol;
  const lastLogin = user.ultimoIngreso ? `Último ingreso: ${dateAR(user.ultimoIngreso)} ${timeAR(user.ultimoIngreso)}` : "Todavía no ingresó";
  const created = user.creadoEn ? ` · Creado el ${dateAR(user.creadoEn)}` : "";
  const safeId = String(user.usuario).replace(/[^a-z0-9_-]/gi, "_");

  return `
    <li class="adm-user-row ${user.activo ? "" : "is-off"}">
      <div class="adm-user-head">
        <strong>${esc(user.nombre)}</strong>
        <span class="adm-muted">usuario: ${esc(user.usuario)}</span>
        <span class="adm-pill adm-pill--neutral">${esc(ROLE_LABELS[user.rol] || user.rol)}</span>
        ${user.activo ? "" : `<span class="adm-pill adm-pill--warning">Desactivado</span>`}
        ${isMe ? `<span class="adm-pill adm-pill--ok">Sos vos</span>` : ""}
      </div>
      <p class="adm-user-meta">${esc(lastLogin)}${esc(created)}</p>
      ${isMe ? `
        <p class="adm-note">Tu PIN lo cambiás en <a class="adm-inline-link" href="/login" data-link>Cambiar mi PIN</a>. No podés cambiar tu propio rol ni desactivarte.</p>
      ` : user.activo ? `
        <div class="adm-user-actions">
          <div class="adm-role-change">
            <label for="adm-rol-${safeId}">Rol</label>
            <select class="adm-input adm-input--sm" id="adm-rol-${safeId}" data-adm-draft="roles" data-adm-key="${esc(user.usuario)}">${roleOptions(roleDraft)}</select>
            <button class="adm-button adm-button--ghost" type="button" data-adm-role-save="${esc(user.usuario)}">Cambiar rol</button>
          </div>
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${esc(user.usuario)}" aria-expanded="${ui.resetFor === user.usuario}">Resetear PIN</button>
          <button class="adm-button adm-button--ghost adm-button--danger-ghost" type="button" data-adm-off="${esc(user.usuario)}">Desactivar</button>
        </div>
      ` : `
        <div class="adm-user-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${esc(user.usuario)}" aria-expanded="${ui.resetFor === user.usuario}">Reactivar con PIN nuevo</button>
        </div>
      `}
      ${!isMe && ui.resetFor === user.usuario ? ResetForm(user) : ""}
      ${!isMe && ui.confirmOff === user.usuario ? ConfirmOff(user) : ""}
    </li>
  `;
}

function UsersPanel() {
  const me = currentUser().usuario;
  const list = (ui.users || []).slice().sort((a, b) => (b.activo === true) - (a.activo === true) || String(a.nombre).localeCompare(String(b.nombre)));
  const activeCount = list.filter((user) => user.activo).length;

  let body;
  if (ui.users === null && ui.usersLoading) body = `<p class="adm-empty">Cargando usuarios…</p>`;
  else if (ui.users === null) body = `<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`;
  else if (!list.length) body = `<p class="adm-empty">Todavía no hay usuarios.</p>`;
  else body = `<ul class="adm-user-list">${list.map((user) => UserRow(user, me)).join("")}</ul>`;

  return `
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${icon("users", "adm-icon")}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${ui.users ? `${plural(activeCount, "usuario activo", "usuarios activos")}. ` : ""}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${CredentialBox()}

      <div class="adm-form-actions">
        <button class="adm-button ${ui.showCreate ? "adm-button--ghost" : "adm-button--primary"}" type="button" data-adm-create-toggle aria-expanded="${ui.showCreate}" aria-controls="adm-create">
          ${icon(ui.showCreate ? "x" : "userPlus", "adm-icon-sm")} ${ui.showCreate ? "Cerrar el formulario" : "Crear usuario"}
        </button>
        <button class="adm-button adm-button--ghost" id="adm-users-refresh" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${ui.showCreate ? CreateForm() : ""}
      ${MsgRegion("users")}
      ${body}

      <details class="adm-inner" data-adm-inner="roles-ayuda" ${ui.openDogs.has("roles-ayuda") ? "open" : ""}>
        <summary>Qué puede ver cada rol</summary>
        <ul class="adm-role-help">
          ${Object.keys(ROLE_LABELS).map((rol) => `<li><strong>${ROLE_LABELS[rol]}:</strong> ${esc(roleLine(rol))}</li>`).join("")}
        </ul>
      </details>
    </section>
  `;
}

function SafetyPanel() {
  const { conflicts, missing, notRouted } = safetyConflicts();
  const dogs = safetyDogs();

  return `
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${icon("alertTriangle", "adm-icon")}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${DATA_UPDATED}).</p>
        </div>
      </header>

      ${conflicts.length ? `
        <div class="adm-table-wrap">
          <table class="adm-table adm-table--safety">
            <caption>Perros marcados “no juntar” que comparten turno</caption>
            <thead>
              <tr><th scope="col">Perros</th><th scope="col">Turno y ruta</th><th scope="col">Días</th></tr>
            </thead>
            <tbody>
              ${conflicts.map((c) => `
                <tr>
                  <th scope="row">
                    ${esc(c.a)} y ${esc(c.b)}
                    ${[c.a, c.b].filter((name) => /día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(REAL_DOGS.find((dog) => dog.name === name)?.review || "")).map((name) => `<span class="adm-row-note">Días de ${esc(name)}: dato a revisar</span>`).join("")}
                  </th>
                  <td>${esc(c.shift)} · ${esc(routeFor(c.shift))}</td>
                  <td>${esc(daysText(c.days))}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      ` : `<p class="adm-empty">No hay perros “no juntar” que compartan turno en BASE RUTAS.</p>`}

      <ul class="adm-safety-list" aria-label="Indicaciones de seguridad por perro">
        ${dogs.map((dog) => `
          <li>
            <strong>${esc(dog.name)}</strong>
            <span class="adm-safety-meta">${esc(dog.shifts.join(" y "))} · ${esc(daysText(dog.days))}</span>
            <span class="adm-safety-notes">${dog.safety.map((note) => `<span class="adm-pill adm-pill--danger">${esc(note)}</span>`).join("")}</span>
          </li>
        `).join("")}
      </ul>

      ${missing.length || notRouted.length ? `
        <ul class="adm-footnotes">
          ${missing.map((m) => `<li>${esc(m.dog)} figura “no juntar con ${esc(m.other)}”, pero ${esc(m.other)} no está en el registro: ${PENDIENTE}.</li>`).join("")}
          ${notRouted.map((n) => `<li>${esc(n.dog)} y ${esc(n.other)} figuran “no juntar”. Hoy ${esc(n.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join("")}
        </ul>
      ` : ""}
    </section>
  `;
}

function Section(id, open, { title, summary, iconName }, body) {
  return `
    <details class="adm-section" id="${id}" data-adm-section="${id}" ${open.has(id) ? "open" : ""}>
      <summary>
        <span class="adm-section-icon">${icon(iconName, "adm-icon")}</span>
        <span class="adm-section-title">
          <span class="adm-section-name">${title}</span>
          <span class="adm-section-summary">${summary}</span>
        </span>
        <span class="adm-chevron">${icon("chevronDown", "adm-icon-sm")}</span>
      </summary>
      <div class="adm-section-body">
        ${body}
      </div>
    </details>
  `;
}

function ReviewSection(open) {
  const dogs = reviewDogs().sort((a, b) => (a.status === "Activo") - (b.status === "Activo"));
  const statusCount = dogs.filter((dog) => dog.status !== "Activo").length;

  return Section("adm-datos", open, {
    title: "Datos a revisar",
    summary: `${plural(dogs.length, "perro", "perros")} · ${plural(statusCount, "con estado a definir", "con estado a definir")}`,
    iconName: "clipboardCheck",
  }, `
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${esc(BUSINESS_INFO.officialSources.dogs)}).</p>
    <ul class="adm-review-list">
      ${dogs.map((dog) => `
        <li class="${dog.status !== "Activo" ? "is-status" : ""}">
          <div class="adm-review-head">
            <strong>${esc(dog.name)}</strong>
            <span class="adm-muted">${esc(dog.id)} · ${esc(dog.plan)}</span>
            <span class="adm-pill ${dog.status === "Activo" ? "adm-pill--neutral" : "adm-pill--warning"}">${esc(dog.status)}</span>
          </div>
          <p>${esc(dog.review || PENDIENTE)}</p>
        </li>
      `).join("")}
    </ul>
  `);
}

function LoadSection(open) {
  const load = weeklyLoad();
  const busiestText = load.busiest.length ? listJoin(load.busiest) : "Sin datos";

  return Section("adm-carga", open, {
    title: "Carga semanal",
    summary: `Más carga: ${esc(busiestText)} (${plural(load.maxTotal, "salida", "salidas")})`,
    iconName: "chart",
  }, `
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${DATA_UPDATED}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-load">
        <caption class="adm-sr-only">Perros por día y turno</caption>
        <thead>
          <tr>
            <th scope="col">Día</th>
            <th scope="col">Mañana <span class="adm-th-sub">${SHIFTS.manana.from} a ${SHIFTS.manana.to}</span></th>
            <th scope="col">Tarde <span class="adm-th-sub">${SHIFTS.tarde.from} a ${SHIFTS.tarde.to}</span></th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          ${load.rows.map((row) => {
            const isBusiest = load.busiest.includes(row.day);
            return `
              <tr class="${isBusiest ? "is-busiest" : ""}">
                <th scope="row">
                  <span class="adm-day-full">${row.day}</span><span class="adm-day-short" aria-hidden="true">${SHORT_DAYS[row.day]}</span>
                  ${isBusiest ? `<span class="adm-busiest">Más carga</span>` : ""}
                </th>
                ${[row.morning, row.afternoon].map((value, i) => `
                  <td>
                    <span class="adm-bar-cell">
                      <span class="adm-bar ${i ? "adm-bar--tarde" : ""}" style="--v:${(value / load.maxShift).toFixed(3)}" aria-hidden="true"></span>
                      <span class="adm-bar-value">${value}</span>
                    </span>
                  </td>
                `).join("")}
                <td class="adm-total">${row.total ? row.total : "—"}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Semana</th>
            <td>${load.rows.reduce((s, r) => s + r.morning, 0)}</td>
            <td>${load.rows.reduce((s, r) => s + r.afternoon, 0)}</td>
            <td class="adm-total">${load.weekTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <ul class="adm-footnotes">
      <li>“Total” suma las salidas del día. ${listJoin(load.twoShifts.map((dog) => dog.name))} ${load.twoShifts.length === 1 ? "sale" : "salen"} en los dos turnos, por eso cuentan dos veces.</li>
      <li>Mañana: ruta ${SHIFTS.manana.route}, supervisa ${SHIFTS.manana.supervisor}. Tarde: rutas ${SHIFTS.tarde.routes.join(" y ")}, supervisa ${SHIFTS.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${esc(BUSINESS_FACTS.find((f) => /máximo/i.test(f.label))?.value || PENDIENTE)} perros (dato histórico).</li>
    </ul>
  `);
}

function kindClass(kind) {
  if (/meta/i.test(kind)) return "meta";
  if (/hist/i.test(kind)) return "historico";
  if (/calc/i.test(kind)) return "calculado";
  return "dato";
}

function FactsSection(open) {
  const active = activeDogs();
  const load = weeklyLoad();
  const unevaluated = active.filter((dog) => dog.category === "SIN EVALUAR").length;
  const computed = [
    { label: "Perros con ruta activa", value: String(active.length), source: `Calculado de BASE RUTAS, ${DATA_UPDATED}`, kind: "Calculado" },
    { label: "Salidas por semana", value: String(load.weekTotal), source: `Calculado de BASE RUTAS, ${DATA_UPDATED}`, kind: "Calculado" },
    { label: "Perros evaluados", value: `${active.length - unevaluated} de ${active.length}`, source: "Registro maestro, 14/08/2026", kind: "Dato" },
  ];
  const facts = [...BUSINESS_FACTS, ...computed];

  return Section("adm-indicadores", open, {
    title: "Indicadores del negocio",
    summary: `${facts.length} indicadores, cada uno con su fuente`,
    iconName: "activity",
  }, `
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${facts.map((fact) => `
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${kindClass(fact.kind)}">${esc(fact.kind)}</span>
          <strong class="adm-fact-value">${esc(fact.value)}</strong>
          <span class="adm-fact-label">${esc(fact.label)}</span>
          <span class="adm-fact-source">Fuente: ${esc(fact.source)}</span>
        </li>
      `).join("")}
    </ul>
    <details class="adm-inner" data-adm-inner="categorias" ${ui.openDogs.has("categorias") ? "open" : ""}>
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(CATEGORIES).map(([name, text]) => `
          <div><dt><span class="adm-cat adm-cat--${name.toLowerCase().replace(/\s+/g, "-")}">${name}</span></dt><dd>${esc(text)}</dd></div>
        `).join("")}
      </dl>
    </details>
  `);
}

const ROLE_PANELS = {
  admin: { panel: "Admin", path: "/admin" },
  paseador: { panel: "Paseador", path: "/paseador" },
  supervisor: { panel: "Supervisor", path: "/supervisor" },
};

// Roles definidos por Juan el 13/11/2026 (docs/datos-compartidos.md), en palabras simples.
const ROLE_PERMISSIONS = [
  { role: "Admin", who: ROLE_OWNERS.admin, can: ["Ve y decide sobre todo el sistema", "Usuarios, pagos e indicadores", "Único rol que ve y carga pagos"] },
  { role: "Coordinador", who: `${ROLE_OWNERS.coordinador} (${PENDIENTE.toLowerCase()})`, can: ["Armar rutas y horarios (plantilla semanal y cambios del día)", "Gestionar los clientes de los paseos", "Atender pedidos y cargar fichas", "Avisar lo que pasa en cada barrio", "No ve plata"] },
  { role: "Supervisor", who: ROLE_OWNERS.supervisor, can: ["Controlar los paseos del momento", "Quién falta retirar y atrasos contra el horario", "Entregas, incidentes y equipo", "Ve las rutas, no las arma"] },
  { role: "Paseador", who: ROLE_OWNERS.paseador, can: ["Hacer su ruta del turno, en orden y con horario", "Marcar retiro, paseo y entrega", "Reportar incidentes"] },
  { role: "Ayudante de paseador", who: PENDIENTE, can: ["Acompañar al paseador en su ruta", "Marcar pasos", "Reportar incidentes", "Sin datos de clientes"] },
  { role: "Cliente", who: "Cada tutor, solo su perro", can: ["Ver la ficha de su perro", "Escribir al chat", "Subir carnet de vacunas", "Subir comprobante", "Ver sus pagos", "Ver el estado del paseo"] },
];

function TeamSection(open) {
  return Section("adm-equipo", open, {
    title: "Equipo y permisos",
    summary: `${plural(TEAM.length, "persona", "personas")} · ${ROLE_PERMISSIONS.length} roles`,
    iconName: "users",
  }, `
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${TEAM.map((person) => {
        const panel = ROLE_PANELS[person.role];
        return `
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${esc(person.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${esc(person.label)}</span>
            </div>
            <p>${esc(person.tasks)}</p>
            <p class="adm-person-panel">Panel: ${panel ? `<a href="${panel.path}" data-link>${panel.panel}</a>` : `<span class="adm-pending">${PENDIENTE}</span>`}</p>
          </li>
        `;
      }).join("")}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${ROLE_PERMISSIONS.map((item) => `
        <article class="adm-role">
          <h4>${item.role}</h4>
          <p class="adm-role-who">${esc(item.who)}</p>
          <ul>${item.can.map((permission) => `<li>${esc(permission)}</li>`).join("")}</ul>
        </article>
      `).join("")}
    </div>
  `);
}

function PricesSection(open) {
  return Section("adm-precios", open, {
    title: "Planes y precios oficiales",
    summary: `${REAL_PLANS.length} planes semanales · paseo suelto · descuentos`,
    iconName: "creditCard",
  }, `
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${SIZES.map((size) => `<th scope="col">${size}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${REAL_PLANS.map((plan) => `
            <tr>
              <th scope="row">${plan.name}<span class="adm-th-sub">${plan.walks} paseos por semana</span></th>
              ${SIZES.map((size) => `<td>${formatPeso(plan.prices[size])}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Paseo suelto</h3>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Paseo suelto por tamaño</caption>
        <thead>
          <tr><th scope="col">Tipo</th>${SIZES.map((size) => `<th scope="col">${size}</th>`).join("")}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${SIZES.map((size) => `<td>${formatPeso(REAL_SINGLE_WALK[size].individual)}</td>`).join("")}</tr>
          <tr><th scope="row">En grupo</th>${SIZES.map((size) => `<td>${formatPeso(REAL_SINGLE_WALK[size].grupo)}</td>`).join("")}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${MULTI_DOG_DISCOUNTS.map((item) => `<li><strong>${item.discount}</strong><span>${item.dogs} perros</span></li>`).join("")}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${PENDIENTE.toLowerCase()}.</p>
  `);
}

/* ---------- Pagos (registro de apoyo, solo admin) ---------- */

function monthLabel(ym) {
  const [y, m] = String(ym).split("-").map(Number);
  if (!y || !m) return ym;
  const text = new Intl.DateTimeFormat("es-AR", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 15)));
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// "15.000", "15000", "15.000,50" o "$ 15000" → número. Si no se entiende, NaN.
function parseMonto(value) {
  let text = String(value || "").replace(/[$\s]/g, "");
  if (text.includes(",")) text = text.replace(/\./g, "").replace(",", ".");
  else if (/^\d{1,3}(\.\d{3})+$/.test(text)) text = text.replace(/\./g, "");
  return /^\d+(\.\d+)?$/.test(text) ? Number(text) : NaN;
}

function pagosData() {
  const all = registros.cached("pagos", liveOpts("pagos")).slice()
    .sort((a, b) => String(b.fecha || "").localeCompare(String(a.fecha || "")) || String(b.creadoEn || "").localeCompare(String(a.creadoEn || "")));
  const current = hoyAR().slice(0, 7);
  const months = [...new Set([current, ...all.map((p) => String(p.fecha || "").slice(0, 7)).filter((m) => /^\d{4}-\d{2}$/.test(m))])].sort().reverse();
  const mes = ui.pagosMes && (ui.pagosMes === "todos" || months.includes(ui.pagosMes)) ? ui.pagosMes : current;
  const filtered = mes === "todos" ? all : all.filter((p) => String(p.fecha || "").startsWith(mes));
  const faltan = all.filter((p) => !p.pasadoAlLibro);
  const total = filtered.reduce((sum, p) => sum + (Number(p.monto) || 0), 0);
  const deOtros = all.filter((p) => {
    const rol = ui.users?.find((user) => user.usuario === p.creadoPor)?.rol;
    return rol && rol !== "admin";
  });
  const sinComprobanteMes = filtered.filter((p) => !p.comprobanteId);
  return { all, months, mes, filtered, faltan, faltanMes: filtered.filter((p) => !p.pasadoAlLibro), total, deOtros, sinComprobanteMes };
}

function PagoRow(pago) {
  const creator = ui.users?.find((user) => user.usuario === pago.creadoPor);
  const fromOther = creator && creator.rol !== "admin";
  const monto = Number(pago.monto);
  const hasMonto = pago.monto !== "" && pago.monto !== null && pago.monto !== undefined && Number.isFinite(monto);
  return `
    <li class="adm-pago ${pago.pasadoAlLibro ? "" : "is-missing"}">
      <div class="adm-pago-main">
        <span class="adm-pago-date">${esc(ymdToAR(pago.fecha) || dateAR(pago.creadoEn) || PENDIENTE)}</span>
        <strong class="adm-pago-concept">${esc(pago.concepto || "Sin concepto")}</strong>
        <span class="adm-pago-amount">${hasMonto ? esc(formatPeso(monto)) : PENDIENTE}</span>
      </div>
      <div class="adm-pago-meta">
        <span class="adm-pill adm-pill--neutral">${esc(pago.medio || "Medio sin indicar")}</span>
        <span class="adm-pill ${pago.pasadoAlLibro ? "adm-pill--ok" : "adm-pill--warning"}">${pago.pasadoAlLibro ? "Pasado al Libro" : "Falta pasar al Libro"}</span>
        ${pago.comprobanteId
          ? `<span class="adm-pill adm-pill--ok">${icon("fileCheck", "adm-icon-xs")} Con comprobante</span>`
          : `<span class="adm-pill adm-pill--neutral adm-pill--dashed">Sin comprobante</span>`}
        ${pago.pendiente ? `<span class="adm-pill adm-pill--info">Se enviará cuando haya señal</span>` : ""}
        ${fromOther ? `<span class="adm-pill adm-pill--info">Lo cargó ${esc(ROLE_LABELS[creator.rol] || creator.rol)} antes del cambio</span>` : ""}
      </div>
      ${byLine(pago, true) ? `<p class="adm-note">${esc(byLine(pago, true))}.</p>` : ""}
      <div class="adm-pago-actions">
        ${pago.comprobanteId ? `
          <button class="adm-button adm-button--ghost adm-button--sm" type="button" data-adm-archivo-abrir="${esc(pago.comprobanteId)}" data-adm-area="pagos">
            ${icon("eye", "adm-icon-sm")} Ver comprobante
          </button>
        ` : pago.pendiente ? "" : `
          <label class="adm-button adm-button--ghost adm-button--sm adm-file-button">
            ${icon("fileUp", "adm-icon-sm")} Adjuntar comprobante
            <input class="adm-file-input" type="file" accept="${ARCHIVO_ACCEPT}" data-adm-pago-adjuntar="${esc(pago.id)}" aria-label="Adjuntar comprobante a ${esc(pago.concepto || "este pago")}" />
          </label>
        `}
        <button class="adm-link-button" type="button" data-adm-pago-libro="${esc(pago.id)}" aria-pressed="${pago.pasadoAlLibro ? "true" : "false"}">
          ${pago.pasadoAlLibro ? "Desmarcar “pasado al Libro”" : "Marcar como pasado al Libro"}
        </button>
      </div>
    </li>
  `;
}

// Comprobante elegido para el pago nuevo (sigue elegido aunque la página se vuelva a dibujar).
function PagoArchivoField() {
  const file = drafts.pagoArchivo;
  const offline = isOffline();
  return `
    <fieldset class="adm-file-field" aria-describedby="adm-pago-archivo-ayuda">
      <legend>Comprobante <small>opcional · foto o PDF, hasta 3,5 MB</small></legend>
      ${file ? `
        <p class="adm-file-chosen" id="adm-pago-archivo-elegido">
          ${icon(file.type === "application/pdf" ? "fileText" : "camera", "adm-icon-sm")}
          <span><strong>${esc(file.name || "Comprobante")}</strong>${fileSize(file.size) ? ` · ${esc(fileSize(file.size))}` : ""}${drafts.pagoSubido ? " · ya subido" : ""}</span>
          <button class="adm-link-button" id="adm-pago-archivo-quitar" type="button" data-adm-pago-quitar>Quitar</button>
        </p>
      ` : `
        <div class="adm-file-choices">
          <label class="adm-button adm-button--ghost adm-file-button">
            ${icon("camera", "adm-icon-sm")} Sacar foto
            <input class="adm-file-input" id="adm-pago-foto" type="file" accept="image/*" capture="environment" data-adm-pago-archivo />
          </label>
          <label class="adm-button adm-button--ghost adm-file-button">
            ${icon("fileUp", "adm-icon-sm")} Elegir foto o PDF
            <input class="adm-file-input" id="adm-pago-archivo" type="file" accept="${ARCHIVO_ACCEPT}" data-adm-pago-archivo />
          </label>
        </div>
      `}
      <p class="adm-note" id="adm-pago-archivo-ayuda">${offline
        ? "Sin señal no se pueden subir archivos (no quedan en espera). Guardá el pago sin comprobante y adjuntalo desde la lista cuando vuelva la señal."
        : "Sirve una captura de la transferencia de Naranja X o una foto del recibo. Lo ves solo vos."}</p>
    </fieldset>
  `;
}

function PagosSection(open) {
  const data = pagosData();
  const d = drafts.pago;
  const shown = data.filtered.slice(0, 20);
  const mesText = data.mes === "todos" ? "todos los meses" : monthLabel(data.mes).toLowerCase();

  return Section("adm-pagos", open, {
    title: "Pagos · registro de apoyo",
    summary: data.faltan.length ? `${plural(data.faltan.length, "pago falta", "pagos faltan")} pasar al Libro contable` : "Nada pendiente de pasar al Libro contable",
    iconName: "receipt",
  }, `
    <div class="adm-official">
      ${icon("fileCheck", "adm-icon")}
      <div>
        <strong>Fuente oficial: ${LIBRO}</strong>
        <p>Esto es un registro de apoyo para no olvidarte de nada: cada pago se tiene que pasar al Libro contable. Solo el admin lo ve y lo carga.</p>
      </div>
    </div>

    <form class="adm-form" id="adm-pago-form" data-adm-form="pago" novalidate aria-labelledby="adm-pago-title">
      <h3 id="adm-pago-title">Cargar un pago</h3>
      <div class="adm-form-grid">
        <label class="adm-field" for="adm-pago-fecha">
          <span>Fecha</span>
          <input class="adm-input" id="adm-pago-fecha" type="date" required value="${esc(d.fecha)}" data-adm-draft="pago" data-adm-key="fecha" />
        </label>
        <label class="adm-field" for="adm-pago-monto">
          <span>Monto <small>en pesos</small></span>
          <input class="adm-input" id="adm-pago-monto" inputmode="decimal" autocomplete="off" maxlength="15" required placeholder="Ej. 35000" value="${esc(d.monto)}" data-adm-draft="pago" data-adm-key="monto" />
        </label>
        <label class="adm-field" for="adm-pago-concepto">
          <span>Concepto</span>
          <input class="adm-input" id="adm-pago-concepto" autocomplete="off" maxlength="120" required placeholder="Ej. Plan 2, semana del 09/11" value="${esc(d.concepto)}" data-adm-draft="pago" data-adm-key="concepto" />
        </label>
        <label class="adm-field" for="adm-pago-medio">
          <span>Medio <small>elegí o escribí</small></span>
          <input class="adm-input" id="adm-pago-medio" list="adm-pago-medios" autocomplete="off" maxlength="40" placeholder="Ej. Efectivo" value="${esc(d.medio)}" data-adm-draft="pago" data-adm-key="medio" />
          <datalist id="adm-pago-medios">${PAGO_MEDIOS.map((medio) => `<option value="${esc(medio)}"></option>`).join("")}</datalist>
        </label>
      </div>
      ${PagoArchivoField()}
      <label class="adm-check" for="adm-pago-libro">
        <input id="adm-pago-libro" type="checkbox" ${d.pasadoAlLibro ? "checked" : ""} data-adm-draft="pago" data-adm-key="pasadoAlLibro" />
        <span>Ya lo pasé al Libro contable</span>
      </label>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" id="adm-pago-guardar" type="submit" aria-disabled="${ui.savingPago}">
          ${icon("plus", "adm-icon-sm")} ${ui.savingPago ? (drafts.pagoArchivo && !drafts.pagoSubido ? "Subiendo el comprobante…" : "Guardando…") : "Guardar pago"}
        </button>
      </div>
    </form>
    ${MsgRegion("pagos")}

    <div class="adm-pagos-head">
      <label class="adm-field adm-field--inline" for="adm-pagos-mes">
        <span>Mes</span>
        <select class="adm-input adm-input--sm" id="adm-pagos-mes" data-adm-pagos-mes>
          ${data.months.map((m) => `<option value="${m}" ${m === data.mes ? "selected" : ""}>${esc(monthLabel(m))}</option>`).join("")}
          <option value="todos" ${data.mes === "todos" ? "selected" : ""}>Todos los meses</option>
        </select>
      </label>
      ${data.filtered.length ? `
        <p class="adm-pagos-summary">
          <strong>${plural(data.filtered.length, "pago", "pagos")}</strong> en ${esc(mesText)} · suma ${esc(formatPeso(data.total))} ·
          <strong class="${data.faltanMes.length ? "adm-text-warning" : ""}" data-adm-pagos-faltan>${data.faltanMes.length} sin pasar al Libro</strong>${data.mes !== "todos" && data.faltan.length !== data.faltanMes.length ? ` (${data.faltan.length} contando todos los meses)` : ""}${data.sinComprobanteMes.length ? ` · ${data.sinComprobanteMes.length} sin comprobante` : ""}
        </p>
      ` : data.faltan.length ? `
        <p class="adm-pagos-summary"><strong class="adm-text-warning" data-adm-pagos-faltan>${plural(data.faltan.length, "pago", "pagos")} de otros meses sin pasar al Libro.</strong> Elegí “Todos los meses” para verlos.</p>
      ` : ""}
    </div>
    ${data.deOtros.length ? `<p class="adm-note">${data.deOtros.length === 1 ? "1 pago lo cargó" : `${data.deOtros.length} pagos los cargó`} otro rol antes del cambio de roles (el coordinador ya no ve plata). Se ven acá con la marca “antes del cambio”.</p>` : ""}
    ${shown.length ? `
      <ul class="adm-pago-list" aria-label="Pagos de ${esc(mesText)}">${shown.map(PagoRow).join("")}</ul>
      ${data.filtered.length > shown.length ? `<p class="adm-note">Se muestran los últimos ${shown.length}. Hay ${plural(data.filtered.length - shown.length, "pago más", "pagos más")} en ${esc(mesText)}.</p>` : ""}
    ` : `<p class="adm-empty">No hay pagos cargados en ${esc(mesText)}. Cargalos con el formulario de arriba cuando te paguen.</p>`}
    ${data.filtered.length ? `<p class="adm-note">La suma es solo de este registro de apoyo: no reemplaza al Libro contable.</p>` : ""}
  `);
}

/* ---------- Archivos recibidos (carnets, comprobantes, documentos) ---------- */

const UBICACIONES = {
  drive: "En tu Google Drive",
  vercel: "Guardado en Vercel (provisorio)",
  local: "Guardado en el servidor de prueba",
};

function archivosData() {
  const all = registros.cached("archivos", liveOpts("archivos")).slice().sort(byNewest);
  const tipo = ui.archivosTipo !== "todos" && ARCHIVO_TIPOS[ui.archivosTipo] ? ui.archivosTipo : "todos";
  const filtered = tipo === "todos" ? all : all.filter((archivo) => archivo.tipo === tipo);
  const counts = Object.fromEntries(Object.keys(ARCHIVO_TIPOS).map((key) => [key, all.filter((archivo) => archivo.tipo === key).length]));
  const enVercel = all.filter((archivo) => archivo.ubicacion === "vercel").length;
  const enPrueba = all.filter((archivo) => archivo.ubicacion === "local").length;
  const nuevos = all.filter((archivo) => Date.now() - Date.parse(archivo.creadoEn || "") < DAY_MS);
  return { all, tipo, filtered, counts, enVercel, enPrueba, nuevos };
}

// A qué perro, cliente, pedido o pago corresponde un archivo (solo con lo que ya está en la página).
function archivoLinks(archivo) {
  const links = [];
  if (archivo.perroNombre || archivo.perroId) {
    links.push(`Perro: ${archivo.perroNombre || archivo.perroId}${archivo.perroNombre && archivo.perroId ? ` (${archivo.perroId})` : ""}`);
  }
  if (archivo.clienteId) {
    const cliente = registros.cached("clientes", liveOpts("clientes")).find((item) => item.id === archivo.clienteId);
    links.push(`Cliente: ${cliente?.nombre || archivo.clienteId}`);
  }
  if (archivo.pedidoId) {
    const pedido = registros.cached("pedidos", liveOpts("pedidos")).find((item) => item.id === archivo.pedidoId);
    const estado = pedido ? { nuevo: "nuevo", "en-curso": "en curso", resuelto: "resuelto" }[pedido.estado || "nuevo"] || pedido.estado : "";
    links.push(pedido
      ? `Pedido: ${pedido.titulo || pedido.tipo || "sin título"}${estado ? ` (${estado})` : ""}`
      : "Pedido del formulario web");
  }
  const pago = pagoDeArchivo(archivo);
  if (pago) links.push(`Pago: ${pago.concepto || "sin concepto"}${pago.fecha ? ` del ${ymdToAR(pago.fecha)}` : ""}`);
  return links;
}

function pagoDeArchivo(archivo) {
  if (archivo.tipo !== "comprobante de pago") return null;
  return registros.cached("pagos", liveOpts("pagos")).find((item) => item.comprobanteId === archivo.id) || null;
}

function ArchivoRow(archivo) {
  const tipo = ARCHIVO_TIPOS[archivo.tipo] || { label: archivo.tipo || "Archivo", tone: "neutral" };
  const links = archivoLinks(archivo);
  const who = archivo.creadoPorNombre || nameOf(archivo.creadoPor) || "";
  const when = archivo.creadoEn ? `${dateAR(archivo.creadoEn)} a las ${timeAR(archivo.creadoEn)}` : ymdToAR(archivo.fecha);
  const isNew = Date.now() - Date.parse(archivo.creadoEn || "") < DAY_MS;
  const ubicacion = UBICACIONES[archivo.ubicacion] || "Lugar de guardado sin indicar";
  const kind = archivo.mime === "application/pdf" ? "PDF" : /^image\//.test(archivo.mime || "") ? "Foto" : "";
  const label = `${tipo.label}${archivo.perroNombre ? ` de ${archivo.perroNombre}` : ""}`;
  const driveUrl = /^https:\/\//i.test(archivo.driveUrl || "") ? archivo.driveUrl : "";
  return `
    <li class="adm-archivo adm-archivo--${tipo.tone}">
      <div class="adm-archivo-head">
        <span class="adm-pill adm-pill--${tipo.tone}">${esc(tipo.label)}</span>
        ${isNew ? `<span class="adm-pill adm-pill--info">Nuevo</span>` : ""}
        <strong class="adm-archivo-title">${esc(archivo.perroNombre || pagoDeArchivo(archivo)?.concepto || archivo.nombreOriginal || archivo.nombreArchivo || tipo.label)}</strong>
      </div>
      <p class="adm-archivo-links">${links.length ? esc(links.join(" · ")) : "Sin vincular a un perro, cliente o pedido."}</p>
      <p class="adm-note">${archivo.creadoPor === "web" ? "Llegó por el formulario de la web" : `Subido por ${esc(who || "alguien sin nombre")}`}${when ? ` el ${esc(when)}` : ""}${kind ? ` · ${kind}` : ""}${fileSize(archivo.tamano) ? ` · ${esc(fileSize(archivo.tamano))}` : ""}</p>
      <div class="adm-archivo-foot">
        <span class="adm-archivo-where ${archivo.ubicacion === "drive" ? "is-drive" : "is-temp"}">
          ${icon(archivo.ubicacion === "drive" ? "checkCircle" : "database", "adm-icon-sm")}
          ${archivo.ubicacion === "drive" && driveUrl
            ? `<a class="adm-inline-link" href="${esc(driveUrl)}" target="_blank" rel="noopener noreferrer">${ubicacion}<span class="adm-sr-only"> (se abre en otra pestaña)</span></a>`
            : esc(ubicacion)}
        </span>
        <button class="adm-button adm-button--ghost adm-button--sm" type="button" data-adm-archivo-abrir="${esc(archivo.id)}" data-adm-area="archivos" aria-label="Abrir ${esc(label)}">
          ${icon("eye", "adm-icon-sm")} Abrir
        </button>
      </div>
    </li>
  `;
}

function ArchivosSection(open) {
  const data = archivosData();
  const shown = data.filtered.slice(0, ARCHIVOS_SHOWN);
  const tipoText = data.tipo === "todos" ? "" : ` de tipo “${ARCHIVO_TIPOS[data.tipo].label.toLowerCase()}”`;
  const summary = data.all.length
    ? `${plural(data.all.length, "archivo", "archivos")}${data.nuevos.length ? ` · ${plural(data.nuevos.length, "nuevo", "nuevos")} en las últimas 24 h` : ""}`
    : "Todavía no llegó ningún archivo";

  return Section("adm-archivos", open, {
    title: "Archivos recibidos",
    summary,
    iconName: "fileUp",
  }, `
    <p class="adm-lead">Carnets de vacunas, comprobantes y documentos que manda la gente desde el formulario de la web o que sube el equipo. Cada uno dice a qué perro, cliente o pedido corresponde. Los comprobantes de pago los abrís solo vos.</p>
    ${isOffline() ? `<p class="adm-msg is-error">Sin señal: ves la lista que ya tenías. Para abrir o subir archivos hace falta señal.</p>` : ""}
    ${data.enVercel || data.enPrueba ? `
      <p class="adm-warn-box">${icon("alertCircle", "adm-icon-sm")} <span>${listJoin([
        data.enVercel ? `${data.enVercel === 1 ? "1 archivo está guardado" : `${data.enVercel} archivos están guardados`} en Vercel (provisorio)` : "",
        data.enPrueba ? `${data.enPrueba === 1 ? "1 archivo está" : `${data.enPrueba} archivos están`} en el servidor de prueba` : "",
      ].filter(Boolean))}. Cuando se conecte la planilla, los archivos nuevos van a ir a tu Google Drive; los que ya llegaron quedan donde están.</span></p>
    ` : ""}
    ${data.all.length ? `
      <div class="adm-pagos-head">
        <label class="adm-field adm-field--inline" for="adm-archivos-tipo">
          <span>Tipo</span>
          <select class="adm-input adm-input--sm" id="adm-archivos-tipo" data-adm-archivos-tipo>
            <option value="todos" ${data.tipo === "todos" ? "selected" : ""}>Todos (${data.all.length})</option>
            ${Object.entries(ARCHIVO_TIPOS).map(([key, item]) => `<option value="${esc(key)}" ${data.tipo === key ? "selected" : ""}>${esc(item.label)} (${data.counts[key]})</option>`).join("")}
          </select>
        </label>
      </div>
    ` : ""}
    ${MsgRegion("archivos")}
    ${shown.length ? `
      <ul class="adm-archivo-list" aria-label="Archivos recibidos${esc(tipoText)}">${shown.map(ArchivoRow).join("")}</ul>
      ${data.filtered.length > shown.length ? `<p class="adm-note">Se muestran los últimos ${shown.length}. Hay ${plural(data.filtered.length - shown.length, "archivo más", "archivos más")}${esc(tipoText)}.</p>` : ""}
    ` : data.all.length ? `
      <p class="adm-empty">No hay archivos${esc(tipoText)}. Elegí “Todos” para ver el resto.</p>
    ` : `
      <p class="adm-empty">Todavía no llegó ningún archivo. Aparecen acá cuando un tutor manda el carnet desde el formulario de la web, cuando el equipo sube uno o cuando adjuntás un comprobante a un pago.</p>
    `}
  `);
}

/* ---------- Clientes (resumen de solo lectura) ---------- */

const CLIENT_STATES = [["activo", "Activos"], ["pausa", "En pausa"], ["baja", "Baja"]];

// Solo cuenta por barrio y estado: no se lee ni se muestra ningún dato de contacto.
function clientesResumen() {
  const list = registros.cached("clientes", liveOpts("clientes"));
  const rows = new Map();
  list.forEach((cliente) => {
    const barrio = String(cliente.barrio || "").trim() || "Sin barrio";
    if (!rows.has(barrio)) rows.set(barrio, { barrio, activo: 0, pausa: 0, baja: 0, otro: 0 });
    const row = rows.get(barrio);
    const estado = String(cliente.estado || "").toLowerCase();
    if (CLIENT_STATES.some(([key]) => key === estado)) row[estado] += 1;
    else row.otro += 1;
  });
  const sorted = [...rows.values()].sort((a, b) => b.activo - a.activo || a.barrio.localeCompare(b.barrio));
  const totals = { activo: 0, pausa: 0, baja: 0, otro: 0 };
  sorted.forEach((row) => Object.keys(totals).forEach((key) => { totals[key] += row[key]; }));
  return { total: list.length, rows: sorted, totals };
}

function ClientesSection(open) {
  const data = clientesResumen();
  const withOther = data.totals.otro > 0;
  return Section("adm-clientes", open, {
    title: "Clientes por barrio",
    summary: data.total ? `${plural(data.totals.activo, "activo", "activos")} · ${data.totals.pausa} en pausa · ${data.totals.baja} de baja` : "Todavía no hay clientes cargados en la app",
    iconName: "mapPin",
  }, `
    <p class="adm-lead">Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>
    ${data.total ? `
      <div class="adm-table-wrap">
        <table class="adm-table adm-clients">
          <caption class="adm-sr-only">Clientes por barrio y estado</caption>
          <thead>
            <tr><th scope="col">Barrio</th>${CLIENT_STATES.map(([, label]) => `<th scope="col">${label}</th>`).join("")}${withOther ? `<th scope="col">Sin estado</th>` : ""}</tr>
          </thead>
          <tbody>
            ${data.rows.map((row) => `
              <tr><th scope="row">${esc(row.barrio)}</th>${CLIENT_STATES.map(([key]) => `<td>${row[key]}</td>`).join("")}${withOther ? `<td>${row.otro}</td>` : ""}</tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total</th>${CLIENT_STATES.map(([key]) => `<td>${data.totals[key]}</td>`).join("")}${withOther ? `<td>${data.totals.otro}</td>` : ""}</tr>
          </tfoot>
        </table>
      </div>
    ` : `<p class="adm-empty">El coordinador todavía no cargó clientes en la app.</p>`}
  `);
}

function FinanceSection(open) {
  const billing = theoreticalBilling();

  return Section("adm-finanzas", open, {
    title: "Finanzas",
    summary: `Fuente oficial: Libro contable`,
    iconName: "wallet",
  }, `
    <div class="adm-official">
      ${icon("fileCheck", "adm-icon")}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${esc(BUSINESS_INFO.officialSources.money)}. Esta sección no muestra montos cobrados: los pagos que anotes de apoyo están en <a class="adm-inline-link" href="#adm-pagos" data-adm-goto="adm-pagos">Pagos</a>.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${formatPeso(billing.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${plural(billing.included.length, "perro activo", "perros activos")} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${billing.byPlan.map((row) => `
              <tr><th scope="row">${row.plan.name}</th><td>${row.count}</td><td>${formatPeso(row.subtotal)}</td></tr>
            `).join("")}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${billing.included.length}</td><td>${formatPeso(billing.total)}</td></tr></tfoot>
        </table>
      </div>
      ${billing.excluded.length ? `
        <p class="adm-note">No incluye ${plural(billing.excluded.length, "perro", "perros")} con planes fuera de la tabla (precio ${PENDIENTE.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${billing.excludedPlans.map((plan) => `<li>${esc(plan)}: ${listJoin(billing.excluded.filter((dog) => dog.plan === plan).map((dog) => esc(dog.name)))}.</li>`).join("")}
        </ul>
      ` : ""}
    </div>
  `);
}

function SourcesFooter() {
  const sources = BUSINESS_INFO.officialSources;
  return `
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${DATA_UPDATED}.</strong> Perros: ${esc(sources.dogs)}. Rutas: ${esc(sources.routes)}. Plata: ${esc(sources.money)}.</p>
      <p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${LIBRO}.</p>
    </footer>
  `;
}

/* ---------- Resumen para copiar ---------- */

function summaryText() {
  const { dayName, date } = todayInfo();
  const live = liveData();
  const priorities = buildPriorities(live);
  const done = readDone();
  const next = priorities.find((priority) => !done.includes(priority.id));
  const load = weeklyLoad();
  const shiftText = (key, label) => {
    const shift = live.shifts.find((item) => item.key === key);
    return shift.total ? `${label}: ${shift.entregados} de ${shift.salen} entregados, ${shift.retirados} retirados.` : `${label}: sin paseos cargados.`;
  };
  const lines = [
    `Paseos Juan · Resumen del admin · ${dayName} ${date}`,
    "",
    "Prioridades:",
    ...priorities.map((p, i) => `${i + 1}. ${p.title}${done.includes(p.id) ? " (hecho)" : ""}`),
    "",
    "Hoy en la app:",
    shiftText("manana", "Mañana"),
    shiftText("tarde", "Tarde"),
    `Incidentes de hoy: ${live.incidentes.length}. Pedidos nuevos: ${live.pedidosNuevos.length}.`,
    `Perros atrasados (más de ${LATE_MINUTES} min sin retiro): ${live.late.length}. Avisos por barrio vigentes: ${live.avisos.length}.`,
    "",
    `Carga semanal: ${load.weekTotal} salidas. Más carga: ${listJoin(load.busiest)} (${load.maxTotal}).`,
    "",
    `PRÓXIMO PASO: ${next ? next.action : "Revisar la carga semanal."}`,
    "",
    `Datos de BASE RUTAS al ${DATA_UPDATED}.`,
  ];
  return lines.join("\n");
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Sigue con el método alternativo.
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

/* ---------- Eventos ---------- */

function announce(message) {
  pendingStatus = message;
  // Se escribe un instante después para que el lector de pantalla note el cambio.
  setTimeout(() => {
    const region = document.querySelector("[data-adm-status]");
    if (region) region.textContent = pendingStatus;
  }, 60);
}

function rememberSections() {
  const ids = [...document.querySelectorAll("[data-adm-section]")]
    .filter((section) => section.open)
    .map((section) => section.dataset.admSection);
  writeStored(OPEN_KEY, ids);
}

function goTo(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  if (target.tagName === "DETAILS") {
    target.open = true;
    rememberSections();
  }
  const calm = document.documentElement.dataset.motion === "calm";
  target.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  const focusable = target.tagName === "DETAILS" ? target.querySelector("summary") : target;
  focusable?.focus({ preventScroll: true });
}

// Clicks que tienen que cortar la cadena (por ejemplo, antes de la navegación por data-link).
function handleAdminClick(event) {
  if (event.target.closest("[data-admin-logout]")) {
    ui.credential = null;
    ui.users = null;
    ui.usersError = "";
    // Al volver a entrar se piden de nuevo los datos (y no queda un pago a medio escribir).
    ui.liveDay = null;
    ui.adminLoaded = false;
    ui.pagosMes = null;
    ui.archivosTipo = "todos";
    drafts.pago = emptyPago();
    drafts.pagoArchivo = null;
    drafts.pagoSubido = null;
    navigate("/salir");
    return true;
  }
  return false;
}

function focusLater(selector) {
  requestAnimationFrame(() => document.querySelector(selector)?.focus());
}

function setBusy(form, busy) {
  ui.busy = busy;
  form?.querySelectorAll("button").forEach((button) => {
    button.disabled = busy;
  });
}

async function handleUsersSubmit(event) {
  const form = event.target.closest?.("[data-adm-form]");
  if (!form || !form.closest(".adm-shell")) return;
  event.preventDefault();
  if (ui.busy) return;
  const tipo = form.dataset.admForm;

  if (tipo === "pago") {
    await savePago();
    return;
  }

  if (tipo === "crear") {
    const d = drafts.crear;
    const nombre = d.nombre.trim();
    const usuario = normalizeUsuario(d.usuario);
    const pin = d.pin.trim();
    let problem = "";
    if (nombre.length < 2) problem = "Escribí el nombre.";
    else if (!/^[a-z][a-z0-9._-]{2,30}$/.test(usuario)) problem = "El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.";
    else if (ui.users?.some((user) => user.usuario === usuario)) problem = `Ya existe el usuario “${usuario}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`;
    else if (!ROLE_LABELS[d.rol]) problem = "Elegí un rol.";
    else problem = pinProblem(pin);
    if (problem) {
      setMsg("users", problem, true);
      rerender();
      return;
    }
    setBusy(form, true);
    try {
      const saved = await usuarios.save({ nombre, usuario, rol: d.rol, pin, crear: true });
      ui.credential = { tipo: "alta", usuario: saved.usuario, nombre: saved.nombre, pin };
      drafts.crear = { nombre: "", usuario: "", rol: "paseador", pin: "" };
      ui.showCreate = false;
      setMsg("users", `Listo: se creó el usuario ${saved.usuario}. Mandale el mensaje.`);
      ui.busy = false;
      await loadUsers();
      focusLater("#adm-cred");
    } catch (error) {
      setMsg("users", error.message || "No se pudo crear el usuario.", true);
      ui.busy = false;
      rerender();
    }
    return;
  }

  if (tipo === "reset") {
    const usuario = form.dataset.admUsuario;
    const user = ui.users?.find((item) => item.usuario === usuario);
    const pin = drafts.reset.pin.trim();
    const problem = user ? pinProblem(pin) : "No encontré ese usuario. Actualizá la lista.";
    if (problem) {
      setMsg("users", problem, true);
      rerender();
      return;
    }
    setBusy(form, true);
    try {
      const reactivar = !user.activo;
      await usuarios.save({ usuario, pin, ...(reactivar ? { activo: true } : {}) });
      ui.credential = { tipo: "reset", usuario, nombre: user.nombre, pin };
      ui.resetFor = null;
      drafts.reset.pin = "";
      setMsg("users", reactivar ? `Listo: ${user.nombre} quedó activo con un PIN nuevo.` : `Listo: ${user.nombre} tiene PIN nuevo y se cerró su sesión.`);
      ui.busy = false;
      await loadUsers();
      focusLater("#adm-cred");
    } catch (error) {
      setMsg("users", error.message || "No se pudo cambiar el PIN.", true);
      ui.busy = false;
      rerender();
    }
  }
}

async function savePago() {
  const d = drafts.pago;
  const concepto = d.concepto.trim();
  const medio = d.medio.trim();
  const monto = parseMonto(d.monto);
  const file = drafts.pagoArchivo;
  let problem = "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.fecha)) problem = "Elegí la fecha del pago.";
  else if (concepto.length < 2) problem = "Escribí el concepto (por ejemplo, el plan y la semana).";
  else if (!Number.isFinite(monto) || monto <= 0) problem = "Escribí el monto en pesos, solo números (por ejemplo 35000).";
  else if (file && !drafts.pagoSubido && isOffline()) {
    problem = "Sin señal no se puede subir el comprobante (los archivos no quedan en espera). Tocá “Quitar” para guardar el pago sin comprobante y adjuntarlo después, o esperá a tener señal.";
  }
  if (problem) {
    setMsg("pagos", problem, true);
    rerender();
    return;
  }
  ui.busy = true;
  ui.savingPago = true;
  let comprobanteId = drafts.pagoSubido?.id || "";
  if (file && !comprobanteId) {
    setMsg("pagos", "Subiendo el comprobante…");
    rerender();
    try {
      // Sin nota ni monto: la lista de archivos la ve también el coordinador, que no ve plata.
      const registro = await archivos.subir("comprobante de pago", file);
      comprobanteId = registro.id;
      drafts.pagoSubido = { id: registro.id };
    } catch (error) {
      setMsg("pagos", `No se pudo subir el comprobante: ${error.message || "error del servidor."} El pago todavía no se guardó: probá de nuevo o tocá “Quitar” para guardarlo sin comprobante.`, true);
      ui.busy = false;
      ui.savingPago = false;
      rerender();
      return;
    }
  }
  try {
    const saved = await registros.save("pagos", {
      fecha: d.fecha,
      concepto,
      monto,
      medio,
      pasadoAlLibro: d.pasadoAlLibro === true,
      ...(comprobanteId ? { comprobanteId } : {}),
    });
    drafts.pago = emptyPago();
    drafts.pagoArchivo = null;
    drafts.pagoSubido = null;
    ui.pagosMes = d.fecha.slice(0, 7);
    const conComprobante = comprobanteId ? " con su comprobante" : "";
    setMsg("pagos", saved.pendiente
      ? `Se enviará cuando haya señal. Queda anotado en este dispositivo${conComprobante ? " (el comprobante ya se subió)" : ""}.`
      : `Listo: pago de ${formatPeso(monto)} guardado${conComprobante}${d.pasadoAlLibro ? "" : ". Acordate de pasarlo al Libro contable"}.`);
  } catch (error) {
    setMsg("pagos", `${error.message || "No se pudo guardar el pago."}${comprobanteId ? " El comprobante ya se subió: al tocar “Guardar pago” de nuevo no se sube otra vez." : ""}`, true);
  } finally {
    ui.busy = false;
    ui.savingPago = false;
    rerender();
  }
}

// Comprobante elegido para el pago nuevo: se revisa el tipo enseguida y se guarda en memoria.
function choosePagoArchivo(input) {
  const file = input.files?.[0];
  input.value = "";
  if (!file) return;
  if (!ARCHIVO_MIME.test(file.type)) {
    setMsg("pagos", "Ese archivo no sirve: solo fotos (JPG, PNG, WEBP) o PDF.", true);
    rerender();
    return;
  }
  if (file.type === "application/pdf" && file.size > 3.5 * 1024 * 1024) {
    setMsg("pagos", "El PDF es muy pesado (máximo 3,5 MB). Probá con una captura de pantalla.", true);
    rerender();
    return;
  }
  drafts.pagoArchivo = file;
  drafts.pagoSubido = null;
  setMsg("pagos", `Comprobante elegido: ${file.name || "archivo"}. Se sube al tocar “Guardar pago”.`);
  rerender();
  focusLater("#adm-pago-archivo-quitar");
}

// Adjunta el comprobante a un pago que ya estaba cargado.
async function adjuntarComprobante(input) {
  const id = input.dataset.admPagoAdjuntar;
  const file = input.files?.[0];
  input.value = "";
  const pago = registros.cached("pagos", liveOpts("pagos")).find((item) => item.id === id);
  if (!file || !pago) return;
  const what = `${pago.concepto || "el pago"}${pago.fecha ? ` del ${ymdToAR(pago.fecha)}` : ""}`;
  let problem = "";
  if (ui.busy) problem = "Esperá a que termine lo que se está guardando y probá de nuevo.";
  else if (!ARCHIVO_MIME.test(file.type)) problem = "Ese archivo no sirve: solo fotos (JPG, PNG, WEBP) o PDF.";
  else if (isOffline()) problem = "Sin señal no se puede subir el comprobante (los archivos no quedan en espera). Probá cuando vuelva la señal.";
  if (problem) {
    setMsg("pagos", problem, true);
    rerender();
    return;
  }
  ui.busy = true;
  setMsg("pagos", `Subiendo el comprobante de ${what}…`);
  rerender();
  let registro = null;
  try {
    registro = await archivos.subir("comprobante de pago", file);
    const saved = await registros.save("pagos", { id, fecha: pago.fecha, comprobanteId: registro.id });
    setMsg("pagos", saved.pendiente
      ? "El comprobante se subió. El cambio del pago se enviará cuando haya señal."
      : `Listo: ${what} ya tiene su comprobante.`);
  } catch (error) {
    setMsg("pagos", `${registro ? "El comprobante se subió pero no se pudo vincular al pago" : "No se pudo subir el comprobante"}: ${error.message || "error del servidor."}`, true);
  } finally {
    ui.busy = false;
    rerender();
    focusLater(registro ? `.adm-pago [data-adm-archivo-abrir="${CSS.escape(registro.id)}"]` : `[data-adm-pago-adjuntar="${CSS.escape(id)}"]`);
  }
}

// Abre un archivo con la sesión (pestaña nueva). Los errores van a la región de la sección.
function abrirArchivo(button) {
  const id = button.dataset.admArchivoAbrir;
  const area = ui.msgs[button.dataset.admArea] !== undefined ? button.dataset.admArea : "archivos";
  if (isOffline()) {
    setMsg(area, "Sin señal no se puede abrir el archivo. Probá cuando vuelva la señal.", true);
    rerender();
    return;
  }
  archivos.abrir(id).catch((error) => {
    const text = error.status === 403
      ? "Tu usuario no puede abrir este archivo. Los comprobantes de pago los abre solo el admin."
      : error.status === 404
        ? "No se encontró el archivo guardado. Puede que lo hayan borrado de Drive."
        : `No se pudo abrir el archivo: ${error.message || "error del servidor."}`;
    setMsg(area, text, true);
    rerender();
  });
}

async function togglePagoLibro(id) {
  const pago = registros.cached("pagos", liveOpts("pagos")).find((item) => item.id === id);
  if (!pago || ui.busy) return;
  ui.busy = true;
  const next = !pago.pasadoAlLibro;
  try {
    const saved = await registros.save("pagos", { id, fecha: pago.fecha, pasadoAlLibro: next });
    const what = `${pago.concepto || "El pago"}${pago.fecha ? ` del ${ymdToAR(pago.fecha)}` : ""}`;
    setMsg("pagos", saved.pendiente
      ? "Se enviará cuando haya señal."
      : next ? `Listo: ${what} quedó como pasado al Libro.` : `Listo: ${what} quedó como pendiente de pasar al Libro.`);
  } catch (error) {
    setMsg("pagos", error.message || "No se pudo cambiar la marca.", true);
  } finally {
    ui.busy = false;
    rerender();
    focusLater(`[data-adm-pago-libro="${CSS.escape(id)}"]`);
  }
}

async function runUserAction(work, okMessage, errorMessage) {
  if (ui.busy) return;
  ui.busy = true;
  try {
    await work();
    setMsg("users", okMessage);
    ui.busy = false;
    await loadUsers();
  } catch (error) {
    setMsg("users", error.message || errorMessage, true);
    ui.busy = false;
    rerender();
  }
}

function handleUsersClick(event) {
  if (event.target.closest("[data-adm-create-toggle]")) {
    ui.showCreate = !ui.showCreate;
    ui.resetFor = null;
    ui.confirmOff = null;
    render();
    focusLater(ui.showCreate ? "#adm-crear-nombre" : "[data-adm-create-toggle]");
    return true;
  }

  if (event.target.closest("[data-adm-users-refresh]")) {
    ui.usersError = "";
    loadUsers().then(() => {
      if (!ui.usersError) {
        setMsg("users", "Lista de usuarios actualizada.");
        rerender();
      }
    });
    return true;
  }

  const gen = event.target.closest("[data-adm-gen-pin]");
  if (gen) {
    const form = gen.dataset.admGenPin;
    drafts[form].pin = randomPin();
    const input = document.getElementById(form === "crear" ? "adm-crear-pin" : "adm-reset-pin");
    if (input) input.value = drafts[form].pin;
    announce(`PIN generado: ${drafts[form].pin.split("").join(" ")}.`);
    return true;
  }

  const roleSave = event.target.closest("[data-adm-role-save]");
  if (roleSave) {
    const usuario = roleSave.dataset.admRoleSave;
    const user = ui.users?.find((item) => item.usuario === usuario);
    if (!user) return true;
    const rol = drafts.roles[usuario] || user.rol;
    if (rol === user.rol) {
      setMsg("users", `${user.nombre} ya tiene el rol ${ROLE_LABELS[rol]}. Elegí otro en la lista y tocá “Cambiar rol”.`, true);
      rerender();
      return true;
    }
    runUserAction(async () => {
      await usuarios.save({ usuario, rol });
      delete drafts.roles[usuario];
    }, `Listo: ${user.nombre} ahora tiene el rol ${ROLE_LABELS[rol]}.`, "No se pudo cambiar el rol.");
    return true;
  }

  const reset = event.target.closest("[data-adm-reset]");
  if (reset) {
    const usuario = reset.dataset.admReset;
    ui.resetFor = ui.resetFor === usuario ? null : usuario;
    ui.confirmOff = null;
    drafts.reset.pin = "";
    render();
    if (ui.resetFor) focusLater("#adm-reset-pin");
    return true;
  }

  if (event.target.closest("[data-adm-reset-cancel]")) {
    const usuario = ui.resetFor || "";
    ui.resetFor = null;
    drafts.reset.pin = "";
    render();
    focusLater(`[data-adm-reset="${CSS.escape(usuario)}"]`);
    return true;
  }

  const off = event.target.closest("[data-adm-off]");
  if (off) {
    ui.confirmOff = off.dataset.admOff;
    ui.resetFor = null;
    render();
    focusLater("#adm-confirm");
    return true;
  }

  if (event.target.closest("[data-adm-off-cancel]")) {
    const usuario = ui.confirmOff || "";
    ui.confirmOff = null;
    render();
    focusLater(`[data-adm-off="${CSS.escape(usuario)}"]`);
    announce("Cancelado: no se desactivó a nadie.");
    return true;
  }

  const offConfirm = event.target.closest("[data-adm-off-confirm]");
  if (offConfirm) {
    const usuario = offConfirm.dataset.admOffConfirm;
    const user = ui.users?.find((item) => item.usuario === usuario);
    ui.confirmOff = null;
    runUserAction(() => usuarios.deactivate(usuario), `Listo: ${user?.nombre || usuario} quedó desactivado y ya no puede entrar.`, "No se pudo desactivar.");
    return true;
  }

  if (event.target.closest("[data-adm-cred-copy]")) {
    if (ui.credential) {
      copyText(credentialText(ui.credential)).then((ok) => {
        announce(ok ? "Mensaje copiado. Pegalo en WhatsApp." : "No se pudo copiar. Seleccioná el texto y copialo a mano.");
      });
    }
    return true;
  }

  if (event.target.closest("[data-adm-cred-hide]")) {
    ui.credential = null;
    render();
    focusLater("#adm-usuarios");
    announce("Listo. El PIN ya no se muestra.");
    return true;
  }

  if (event.target.closest("[data-adm-live-refresh]")) {
    refreshLive(true);
    return true;
  }

  const libro = event.target.closest("[data-adm-pago-libro]");
  if (libro) {
    togglePagoLibro(libro.dataset.admPagoLibro);
    return true;
  }

  const abrir = event.target.closest("[data-adm-archivo-abrir]");
  if (abrir) {
    abrirArchivo(abrir);
    return true;
  }

  if (event.target.closest("[data-adm-pago-quitar]")) {
    drafts.pagoArchivo = null;
    drafts.pagoSubido = null;
    setMsg("pagos", "Comprobante quitado. El pago se guarda sin comprobante.");
    rerender();
    focusLater("#adm-pago-archivo");
    return true;
  }

  return false;
}

function handleDraftInput(event) {
  if (event.target.matches?.("[data-adm-pago-archivo], [data-adm-pago-adjuntar]")) {
    if (event.type !== "change") return;
    if (event.target.dataset.admPagoAdjuntar !== undefined) adjuntarComprobante(event.target);
    else choosePagoArchivo(event.target);
    return;
  }
  const tipo = event.target.closest?.("[data-adm-archivos-tipo]");
  if (tipo) {
    if (event.type === "change" && ui.archivosTipo !== tipo.value) {
      ui.archivosTipo = tipo.value;
      rerender();
      announce(tipo.value === "todos" ? "Se muestran todos los archivos." : `Se muestran los archivos de tipo ${(ARCHIVO_TIPOS[tipo.value]?.label || tipo.value).toLowerCase()}.`);
    }
    return;
  }
  const month = event.target.closest?.("[data-adm-pagos-mes]");
  if (month) {
    if (event.type === "change" && ui.pagosMes !== month.value) {
      ui.pagosMes = month.value;
      rerender();
      announce(`Pagos de ${month.value === "todos" ? "todos los meses" : monthLabel(month.value).toLowerCase()}.`);
    }
    return;
  }
  const field = event.target.closest?.("[data-adm-draft]");
  if (!field) return;
  const form = field.dataset.admDraft;
  const key = field.dataset.admKey;
  const value = field.type === "checkbox" ? field.checked : field.value;
  if (form === "roles") drafts.roles[key] = value;
  else drafts[form][key] = value;
  if (form === "crear" && key === "rol") {
    const hint = document.querySelector("[data-adm-role-hint]");
    if (hint) hint.innerHTML = `<strong>${esc(ROLE_LABELS[field.value] || field.value)}:</strong> ${esc(roleLine(field.value))}`;
  }
}

// Acciones de la página. Corre después del control de accesibilidad.
function handleAdminActionClick(event) {
  if (!event.target.closest(".adm-shell")) return false;

  const a11y = event.target.closest("[data-adm-a11y]");
  if (a11y) {
    document.querySelector(".a11y-toggle")?.click();
    return true;
  }

  const doneButton = event.target.closest("[data-adm-done]");
  if (doneButton) {
    const id = doneButton.dataset.admDone;
    const done = readDone();
    const isDone = done.includes(id);
    writeStored(DONE_KEY, isDone ? done.filter((item) => item !== id) : [...done, id]);
    render();
    const nextFocus = document.querySelector(`.adm-priority [data-adm-done="${id}"]`);
    nextFocus?.focus({ preventScroll: true });
    announce(isDone ? "Prioridad desmarcada." : "Prioridad marcada como hecha. Se actualizó el próximo paso.");
    return true;
  }

  const goButton = event.target.closest("[data-adm-goto]");
  if (goButton) {
    event.preventDefault();
    goTo(goButton.dataset.admGoto);
    return true;
  }

  if (handleUsersClick(event)) return true;

  const expand = event.target.closest("[data-adm-expand]");
  if (expand) {
    const shouldOpen = expand.dataset.admExpand === "open";
    document.querySelectorAll("[data-adm-section]").forEach((section) => {
      section.open = shouldOpen;
    });
    rememberSections();
    announce(shouldOpen ? "Secciones abiertas." : "Secciones cerradas.");
    return true;
  }

  if (event.target.closest("[data-adm-copy]")) {
    copyText(summaryText()).then((ok) => {
      announce(ok ? "Resumen copiado. Pegalo en WhatsApp o en tus notas." : "No se pudo copiar. Probá de nuevo.");
    });
    return true;
  }

  return false;
}

function handleSectionToggle(event) {
  if (event.target.matches?.("[data-adm-section]")) rememberSections();
  // Listas y ayudas plegables de adentro: se recuerda si están abiertas para no cerrarlas al redibujar.
  if (event.target.matches?.("[data-adm-dogs], [data-adm-inner]")) {
    const key = event.target.dataset.admDogs || event.target.dataset.admInner;
    if (event.target.open) ui.openDogs.add(key);
    else ui.openDogs.delete(key);
  }
}

export function registerAdminEvents() {
  clickHandlers.push(handleAdminClick);
  actionClickHandlers.push(handleAdminActionClick);
  // El evento toggle no burbujea: se escucha en captura.
  document.addEventListener("toggle", handleSectionToggle, true);
  document.addEventListener("submit", handleUsersSubmit);
  document.addEventListener("input", handleDraftInput);
  document.addEventListener("change", handleDraftInput);
  // Una sola vez: cuando llegan datos nuevos del día, se vuelve a dibujar el panel.
  onDataChange((col) => {
    if (LIVE_COLS.includes(col) || ADMIN_COLS.includes(col)) rerender();
  });
  // Los atrasos cambian con la hora aunque no lleguen datos nuevos: se revisa cada 30 segundos
  // y solo se vuelve a dibujar si cambió quién está atrasado.
  setInterval(() => {
    if (!isAdminPage() || session.user()?.rol !== "admin" || document.visibilityState !== "visible") return;
    const signature = lateSignature(liveData());
    if (signature !== ui.lateSignature) {
      ui.lateSignature = signature;
      rerender();
    }
  }, 30 * 1000);
  window.addEventListener("online", () => rerender());
  window.addEventListener("offline", () => rerender());
}
