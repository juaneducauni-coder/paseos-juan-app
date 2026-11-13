// Vista del rol Admin (Juan Buitrago, fundador). Celular primero: pocas letras, botones grandes,
// barra fija abajo (Inicio · Equipo · Plata · Más) y lo importante arriba (un próximo paso,
// hasta 3 prioridades y "Hoy en números").
// Datos fijos: src/data/realData.js (BASE RUTAS, precios). Datos del día: servidor compartido
// (src/api/client.js): paseos, incidentes, checklists, pedidos, rutas, plantillas, avisos y fotos.
// Solo admin: pagos (registro de apoyo, con su comprobante) y resumen de clientes. Usuarios: /api/usuarios.
// Archivos recibidos (carnets, comprobantes, documentos): colección "archivos" (admin y coordinador;
// los comprobantes de pago los abre solo el admin). Se suben con archivos.subir: sin señal no se encolan.
// Fotos de los perros: colección "fotos" (fotosPerros.de / fotosPerros.subir), necesitan señal.
// Lo que no está confirmado se rotula como "Pendiente de confirmar".
// Las marcas de "hecho" de las prioridades, la pestaña elegida y las secciones abiertas se guardan
// solo en este dispositivo.
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
import { session, registros, usuarios, archivos, fotosPerros, onDataChange, hoyAR, ROLE_PAGES, ROLE_LABELS } from "../api/client.js";

const DONE_KEY = "paseosJuanAdmin_prioridadesHechas";
const FOLD_KEY = "paseosJuanAdmin_plegables";
const TAB_KEY = "paseosJuanAdmin_pestana";
const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SIZES = ["Pequeño", "Mediano", "Grande"];
const SHIFT_MORNING = SHIFTS.manana.label;
const SHIFT_AFTERNOON = SHIFTS.tarde.label;
const LIVE_COLS = ["paseos", "incidentes", "checklists", "pedidos", "rutas", "plantillas", "avisos", "fotos"];
// Solo admin: registro de apoyo de pagos y clientes (para el resumen por barrio, sin teléfonos),
// y los archivos recibidos (el admin es el único que abre los comprobantes de pago).
const ADMIN_COLS = ["pagos", "clientes", "archivos"];
// Un perro está atrasado si pasaron más de estos minutos desde la hora prevista y no se retiró.
const LATE_MINUTES = 10;
const PAGO_MEDIOS = ["Efectivo", "Transferencia", "Naranja X"];
const PAGO_CONCEPTOS = ["Plan 1", "Plan 2", "Plan 3", "Paseo suelto"];
const LIBRO = "Libro contable del Sistema de Gestión";
// Tipos de archivo del servidor (api/_lib/archivos.js), con su etiqueta y color.
const ARCHIVO_TIPOS = {
  "carnet de vacunas": { label: "Carnet", tone: "green" },
  "comprobante de pago": { label: "Comprobante", tone: "blue" },
  documento: { label: "Documento", tone: "gray" },
  foto: { label: "Foto", tone: "gray" },
};
// Lo mismo que acepta prepararArchivo() en src/api/client.js.
const ARCHIVO_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
const ARCHIVO_MIME = /^(image\/(jpeg|png|webp)|application\/pdf)$/;
const DAY_MS = 24 * 60 * 60 * 1000;
const ARCHIVOS_SHOWN = 20;
const PAGOS_SHORT = 8;
const UNDO_MS = 5000;

const TABS = [
  { id: "inicio", label: "Inicio", icon: "home" },
  { id: "equipo", label: "Equipo", icon: "users" },
  { id: "plata", label: "Plata", icon: "wallet" },
  { id: "mas", label: "Más", icon: "grid" },
];

// Pantallas del menú "Más".
const MAS_VIEWS = {
  fotos: { title: "Fotos de perros", icon: "camera" },
  carga: { title: "Carga semanal", icon: "chart" },
  planes: { title: "Planes y precios", icon: "creditCard" },
  archivos: { title: "Archivos", icon: "fileUp" },
  datos: { title: "Datos a revisar", icon: "clipboardCheck" },
  clientes: { title: "Clientes por barrio", icon: "mapPin" },
  indicadores: { title: "Indicadores", icon: "activity" },
};

// A qué pestaña (y pantalla de "Más") lleva cada destino de los botones "Ver".
const TARGETS = {
  "adm-usuarios": ["equipo"],
  "adm-pagos": ["plata"],
  "adm-finanzas": ["plata"],
  "adm-fotos": ["mas", "fotos"],
  "adm-carga": ["mas", "carga"],
  "adm-precios": ["mas", "planes"],
  "adm-archivos": ["mas", "archivos"],
  "adm-datos": ["mas", "datos"],
  "adm-clientes": ["mas", "clientes"],
  "adm-indicadores": ["mas", "indicadores"],
};

// Último mensaje de estado (se escribe en la región aria-live después de cada render).
let pendingStatus = "";
let undoTimer = null;

// Estado en memoria de la página (no se guarda en el dispositivo: puede tener un PIN recién creado).
const ui = {
  tab: readTab().tab,
  mas: readTab().mas,
  sheet: null, // "pago" | "crear"
  sheetReturn: "", // selector del botón que abrió la hoja (para volver el foco)
  sheetEnter: false,
  users: null, // lista de /api/usuarios (sin PIN)
  usersLoading: false,
  usersError: "",
  roleFor: null, // usuario con los botones de rol abiertos
  resetFor: null, // usuario con el formulario de PIN abierto
  confirmOff: null, // usuario esperando confirmación para desactivar
  credential: null, // { tipo, usuario, nombre, pin } — se muestra una sola vez
  busy: false,
  liveDay: null,
  liveError: "",
  adminLoaded: false,
  adminError: "",
  pagosMes: null, // "AAAA-MM" o "todos"; null = mes actual
  pagosTodos: false, // lista larga de pagos
  archivosTipo: "todos",
  fotosFiltro: "faltan",
  fotosSubiendo: new Set(),
  savingPago: false,
  lateSignature: "",
  navBadges: {},
  undo: null, // { text, run }
  msgs: { users: null, live: null, pagos: null, archivos: null, fotos: null },
};

// Lo que se va escribiendo en los formularios, para no perderlo si la página se vuelve a dibujar.
const emptyPago = () => ({ fecha: hoyAR(), concepto: "", monto: "", medioSel: "", medioOtro: "", pasadoAlLibro: false });
const emptyCrear = () => ({ nombre: "", usuario: "", usuarioTocado: false, rol: "paseador", pin: "" });
// pagoArchivo: el comprobante elegido (File) se guarda acá porque el <input type="file"> se vacía al
// redibujar. pagoSubido: si el comprobante ya subió pero el pago no se pudo guardar, no se sube dos veces.
const drafts = {
  crear: emptyCrear(),
  reset: { pin: "" },
  pago: emptyPago(),
  pagoArchivo: null,
  pagoSubido: null,
};

/* ---------- Íconos que no están en el set compartido ---------- */

const LOCAL_ICONS = {
  grid: `<rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" />`,
  refresh: `<path d="M20 11a8 8 0 0 0-14.7-4.3L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.7 4.3L20 16" /><path d="M20 20v-4h-4" />`,
  check: `<path d="m5 12.5 4.5 4.5L19 7.5" />`,
  arrowLeft: `<path d="M19 12H5" /><path d="m11 6-6 6 6 6" />`,
  key: `<circle cx="8" cy="15" r="4" /><path d="m11 12 9-9" /><path d="m16 7 3 3" />`,
  undo: `<path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 0 12h-3" />`,
  off: `<circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" />`,
};

function ico(name, className = "adm-icon-sm") {
  if (!LOCAL_ICONS[name]) return icon(name, className);
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${LOCAL_ICONS[name]}</svg>`;
}

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

function readJsonKey(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado): vale solo para esta visita.
  }
}

function readDone() {
  return getStoredArray(DONE_KEY);
}

function readTab() {
  const stored = readJsonKey(TAB_KEY, {});
  const tab = TABS.some((item) => item.id === stored?.tab) ? stored.tab : "inicio";
  const mas = tab === "mas" && MAS_VIEWS[stored?.mas] ? stored.mas : null;
  return { tab, mas };
}

function storeTab() {
  writeStored(TAB_KEY, { tab: ui.tab, mas: ui.mas });
}

// Plegables: si el usuario lo abrió o cerró, se respeta; si no, vale lo que diga la página.
function foldOpen(key, byDefault = false) {
  const stored = readJsonKey(FOLD_KEY, {});
  return typeof stored?.[key] === "boolean" ? stored[key] : byDefault;
}

function rememberFold(key, open) {
  const stored = readJsonKey(FOLD_KEY, {});
  writeStored(FOLD_KEY, { ...(stored && typeof stored === "object" ? stored : {}), [key]: open });
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

function initial(nombre) {
  return (String(nombre || "").trim().charAt(0) || "?").toUpperCase();
}

function isAdminPage() {
  return /^\/(dashboard\/)?admin\/?$/.test(window.location.pathname);
}

// "?" que se despliega: la explicación larga queda guardada acá, no a la vista.
function Help(text, label = "Más info") {
  return `
    <details class="adm-help">
      <summary aria-label="${esc(label)}"><span aria-hidden="true">?</span></summary>
      <div class="adm-help-body">${text}</div>
    </details>
  `;
}

/* ---------- Perros, fotos y seguridad ---------- */

function dogById(perroId, nombre) {
  return REAL_DOGS.find((dog) => dog.id === perroId)
    || (nombre ? REAL_DOGS.find((dog) => normText(dog.name) === normText(nombre)) : null)
    || null;
}

// Chips de seguridad: bozal (rojo) y "no juntar" (amarillo), siempre con texto.
function SafetyChips(dog) {
  if (!dog) return "";
  const bozal = dog.safety.some((note) => /bozal/i.test(note));
  const noJuntar = (dog.incompatibleWith || []).length > 0 || dog.safety.some((note) => /no juntar/i.test(note));
  if (!bozal && !noJuntar) return "";
  const noJuntarText = (dog.incompatibleWith || []).length ? `No juntar con ${listJoin(dog.incompatibleWith)}` : "No juntar";
  return `
    <span class="adm-chips">
      ${bozal ? `<span class="adm-chip adm-chip--red">${ico("alertTriangle", "adm-icon-xs")} Bozal</span>` : ""}
      ${noJuntar ? `<span class="adm-chip adm-chip--yellow" title="${esc(noJuntarText)}">${ico("x", "adm-icon-xs")} No juntar<span class="adm-sr-only">: ${esc(noJuntarText)}</span></span>` : ""}
    </span>
  `;
}

// Miniatura cuadrada redondeada o círculo con la inicial.
function DogAvatar(perroId, nombre, size = "md") {
  const src = fotosPerros.de(perroId);
  if (src) return `<img class="adm-avatar adm-avatar--${size}" src="${esc(src)}" alt="" loading="lazy" />`;
  return `<span class="adm-avatar adm-avatar--${size} adm-avatar--empty" aria-hidden="true">${esc(initial(nombre))}</span>`;
}

function fotoDe(perroId) {
  if (!perroId) return null;
  return registros.cached("fotos").find((foto) => foto.id === perroId || foto.perroId === perroId) || null;
}

// Botón "Foto" (abre la cámara). Necesita señal: lo dice en una línea arriba de la lista.
function FotoButton(perroId, nombre, { compact = false, change = false } = {}) {
  if (!perroId) return "";
  const busy = ui.fotosSubiendo.has(perroId);
  const label = busy ? "Subiendo…" : change ? "Cambiar" : "Foto";
  return `
    <label class="adm-btn ${change ? "adm-btn--ghost" : "adm-btn--soft"} ${compact ? "adm-btn--icon" : "adm-btn--sm"} adm-file-button ${busy ? "is-busy" : ""}" data-adm-foto-label="${esc(perroId)}">
      ${ico("camera")}<span class="${compact ? "adm-sr-only" : ""}">${label}${compact ? ` de ${esc(nombre)}` : ""}</span>
      <input class="adm-file-input" type="file" accept="image/*" capture="environment" data-adm-foto="${esc(perroId)}" data-adm-foto-nombre="${esc(nombre)}" ${busy ? "disabled" : ""} aria-label="${change ? "Cambiar la foto" : "Sacar foto"} de ${esc(nombre)}" />
    </label>
  `;
}

/* ---------- El día en vivo (datos compartidos) ---------- */

function liveOpts(col, hoy) {
  // Pedidos nuevos y avisos vigentes pueden ser de días anteriores; las plantillas no tienen fecha
  // (se repiten cada semana); fotos, pagos y clientes se miran completos.
  return ["pedidos", "plantillas", "avisos", "fotos", ...ADMIN_COLS].includes(col) ? {} : { desde: hoy };
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
  return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
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
  // Hoy en números: perros que salen según la ruta de hoy, entregados, atrasados e incidentes.
  const perrosHoy = compliance.reduce((sum, item) => sum + item.stops.length - item.noSale, 0);
  const entregados = paseos.filter((paseo) => paseo.estado === "entregado").length;
  return { hoy, paseos, incidentes, checklists, pedidosNuevos, shifts, nowMin, effective, compliance, late, lateNow, avisos, carnetsWeb, perrosHoy, entregados };
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

// Pagos, clientes y archivos (solo admin). Los errores de pagos y clientes se muestran en Plata;
// los de archivos, en "Archivos".
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
  if (archivosError) setMsg("archivos", `No se pudo traer la lista: ${archivosError}`, true);
  if (before !== ui.adminError) rerender();
}

async function refreshLive(manual) {
  const hoy = hoyAR();
  const results = await Promise.allSettled(LIVE_COLS.map((col) => registros.list(col, liveOpts(col, hoy))));
  const errors = [...new Set(results.filter((r) => r.status === "rejected").map((r) => r.reason?.message || "No se pudieron traer los datos."))];
  const before = ui.liveError;
  ui.liveError = errors.join(" ");
  if (ui.liveError) setMsg("live", `No se pudo actualizar: ${ui.liveError}`, true);
  else if (manual) setMsg("live", isOffline() ? "Sin señal: ves lo último que llegó." : "Actualizado.");
  else if (before) setMsg("live", "Actualizado.");
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
// Botones de rol: el más usado primero, con ícono, nombre corto y una línea.
const ROLE_CHOICES = [
  { rol: "paseador", short: "Paseador", icon: "pawPrint", line: "Hace su ruta y marca cada paso." },
  { rol: "ayudante", short: "Ayudante", icon: "userCheck", line: "Acompaña al paseador. Sin datos de clientes." },
  { rol: "supervisor", short: "Supervisor", icon: "radar", line: "Controla los paseos del momento. No ve plata." },
  { rol: "coordinador", short: "Coordinador", icon: "route", line: "Rutas, horarios, clientes y avisos. No ve plata." },
  { rol: "marketing", short: "Marketing", icon: "message", line: "Pedidos y avisos. Nada de plata." },
  { rol: "admin", short: "Admin", icon: "shieldCheck", line: "Todo, incluida la plata." },
].filter((choice) => ROLE_LABELS[choice.rol]);

function roleShort(rol) {
  return ROLE_CHOICES.find((choice) => choice.rol === rol)?.short || ROLE_LABELS[rol] || rol;
}

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

// Usuario sugerido a partir del nombre: el primer nombre sin tildes; si ya existe, se suma el apellido
// o un número.
function suggestUsuario(nombre) {
  const words = normalizeUsuario(nombre).split(/\s+/).map((word) => word.replace(/[^a-z0-9]/g, "")).filter(Boolean);
  if (!words.length) return "";
  const taken = new Set((ui.users || []).map((user) => user.usuario));
  let base = words[0];
  if (!/^[a-z]/.test(base)) base = `u${base}`;
  base = base.slice(0, 24);
  if (base.length < 3) base = (base + (words[1] || "") + "pj").slice(0, 24);
  if (!taken.has(base)) return base;
  if (words[1]) {
    const withLast = `${base}.${words[1]}`.slice(0, 31);
    if (!taken.has(withLast)) return withLast;
  }
  for (let n = 2; n < 100; n += 1) {
    if (!taken.has(`${base}${n}`)) return `${base}${n}`;
  }
  return base;
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
// por su atributo data-adm-* (y su posición entre los iguales). Los títulos de los plegables
// se buscan por el plegable.
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

// Vuelve a dibujar sin perder el foco, lo escrito (los borradores viven en "drafts") ni el
// lugar dentro de la hoja abierta.
function rerender() {
  if (!isAdminPage() || session.user()?.rol !== "admin") return;
  const active = document.activeElement;
  const key = focusKey(active);
  const sheetScroll = document.querySelector(".adm-sheet-body")?.scrollTop || 0;
  let selection = null;
  try {
    if (active && typeof active.selectionStart === "number") selection = [active.selectionStart, active.selectionEnd];
  } catch {
    selection = null;
  }
  render();
  const sheetBody = document.querySelector(".adm-sheet-body");
  if (sheetBody && sheetScroll) sheetBody.scrollTop = sheetScroll;
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

// Nombre de un usuario a partir de la lista de usuarios (si ya llegó).
function nameOf(usuario) {
  return ui.users?.find((user) => user.usuario === usuario)?.nombre || usuario || "";
}

// Hasta 3 prioridades calculadas, en orden: incidente de hoy, atrasos del turno actual,
// pedidos nuevos (con los carnets que llegaron por la web), cruces de seguridad, datos, evaluación.
// "short" es lo que se ve en la tarjeta; "title" y "detail" quedan en el "?".
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
      tag: "Incidente",
      tone: "red",
      short: count === 1 ? `Incidente${dogs.length ? `: ${dogs[0]}` : " hoy"}` : `${count} incidentes hoy`,
      title: count === 1
        ? `Hubo un incidente hoy${dogs.length ? ` con ${dogs[0]}` : ""}`
        : `Hubo ${count} incidentes hoy${dogs.length ? ` (${listJoin(dogs)})` : ""}`,
      detail: `${count > 1 ? "El último lo cargó" : "Lo cargó"} ${who}${recordTime(latest) ? ` a las ${recordTime(latest)}` : ""}. Riesgo: ${latest.riesgo || PENDIENTE}. Lesiones: ${latest.lesiones || PENDIENTE}.`,
      action: `Leé el incidente${dogs.length ? ` de ${listJoin(dogs)}` : ""} y hablá con ${who} hoy.`,
      target: "adm-incidentes",
      targetLabel: count === 1 ? "Ver incidente" : "Ver incidentes",
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
        tone: "yellow",
        short: "Nadie marca retiros",
        title: `Nadie marcó retiros hoy: ${plural(count, "perro figura", "perros figuran")} pasados de hora en el turno ${turno}`,
        detail: `Según la ruta de hoy, ${listJoin(names)}${count > 3 ? ` y ${plural(count - 3, "más", "más")}` : ""} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,
        action: `Preguntale a ${contact} si el equipo está marcando los retiros en la app.`,
        target: "adm-cumplimiento",
        targetLabel: "Ver rutas",
      });
    } else priorities.push({
      id: `atrasos-${live.hoy}-${turno}-${count}`,
      tag: "Atrasos",
      tone: "red",
      short: `${plural(count, "atrasado", "atrasados")} (${turno})`,
      title: `${plural(count, "perro atrasado", "perros atrasados")} en el turno ${turno}`,
      detail: `${listJoin(names)}${count > 3 ? ` y ${plural(count - 3, "más", "más")}` : ""}. Pasaron más de ${LATE_MINUTES} minutos de la hora prevista y nadie marcó el retiro.`,
      action: `Preguntale a ${contact} qué pasa con ${worst.perroNombre} (retiro ${worst.hora}, ruta ${routes.join(" y ")}).`,
      target: "adm-cumplimiento",
      targetLabel: count === 1 ? "Ver atraso" : "Ver atrasos",
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
        tone: "blue",
        short: `${plural(count, "pedido nuevo", "pedidos nuevos")}${conCarnet.length ? " · con carnet" : ""}`,
        title: `${plural(count, "pedido nuevo", "pedidos nuevos")} sin responder${conCarnet.length ? ` · ${conCarnet.length === count && count === 1 ? "trae carnet de vacunas" : `${conCarnet.length} con carnet`}` : ""}`,
        detail: `${listJoin(titles)}${count > 3 ? ` y ${plural(count - 3, "más", "más")}` : ""}. Llegan del formulario de la web o los carga el equipo.${sueltosText ? ` ${sueltosText}` : ""}`,
        action: count === 1
          ? `Respondé el pedido “${oldest}”${hasCarnet(oldestPedido, live) ? " y mirá el carnet que mandó" : ""}.`
          : `Respondé los ${count} pedidos nuevos, empezando por “${oldest}”${hasCarnet(oldestPedido, live) ? " (trae carnet)" : ""}.`,
        target: "adm-pedidos",
        targetLabel: count === 1 ? "Ver pedido" : "Ver pedidos",
      });
    } else {
      const first = carnetsSueltos[0];
      priorities.push({
        id: `carnets-web-${first.id}-${carnetsSueltos.length}`,
        tag: "Pedidos",
        tone: "blue",
        short: carnetsSueltos.length === 1 ? `Carnet de ${first.perroNombre || "un perro"}` : `${carnetsSueltos.length} carnets nuevos`,
        title: carnetsSueltos.length === 1
          ? `Pedido nuevo con carnet: llegó el carnet de ${first.perroNombre || "un perro"} por la web`
          : `Pedidos nuevos con carnet: llegaron ${carnetsSueltos.length} carnets por la web`,
        detail: sueltosText,
        action: `Abrí el carnet de ${first.perroNombre || "ese perro"} en “Archivos” y sumalo a su ficha.`,
        target: "adm-archivos",
        targetLabel: carnetsSueltos.length === 1 ? "Ver carnet" : "Ver carnets",
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
      tone: "red",
      short: `${center}: no juntar`,
      title: `${center} comparte turno con perros marcados “no juntar”`,
      detail: `Según BASE RUTAS, ${center} sale en el turno ${shifts.map((s) => s.toLowerCase()).join(" y ")} (ruta ${routes}) los mismos días que ${listJoin(others)}. Hay ${plural(conflicts.length, "cruce", "cruces")} en la semana.`,
      action: `Confirmá con Sebastián cómo se separa a ${center} de ${listJoin(others)} en la ruta ${routes}.`,
      target: "adm-seguridad",
      targetLabel: "Ver cruces",
    });
  }

  if (reviews.length) {
    const names = statusIssues.map((dog) => dog.name);
    priorities.push({
      id: "datos-a-revisar",
      tag: "Datos",
      tone: "yellow",
      short: `${plural(reviews.length, "perro", "perros")} a revisar`,
      title: `${plural(reviews.length, "perro tiene", "perros tienen")} datos a revisar`,
      detail: statusIssues.length
        ? `Primero el estado de ${listJoin(names)}: ${statusIssues.length === 1 ? "no está" : "no están"} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`
        : "Planes que no coinciden con los días, nombres distintos o duración a revisar.",
      action: statusIssues.length
        ? `Decidí el estado de ${listJoin(names)} y corregilo en la planilla.`
        : "Revisá la lista de datos a confirmar y corregí la planilla.",
      target: "adm-datos",
      targetLabel: "Ver lista",
    });
  }

  if (unevaluated.length) {
    const first = toEvaluate.length ? toEvaluate : unevaluated.slice(0, 5);
    priorities.push({
      id: "evaluaciones",
      tag: "Evaluación",
      tone: "blue",
      short: `${unevaluated.length} sin evaluar`,
      title: `${unevaluated.length} de ${active.length} perros en ruta siguen SIN EVALUAR`,
      detail: `Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${listJoin(first.map((dog) => dog.name))}.`,
      action: `Agendá la evaluación de ${listJoin(first.map((dog) => dog.name))}.`,
      target: "adm-seguridad",
      targetLabel: "Ver perros",
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

/* ---------- Armazón: encabezado, barra de abajo y "Deshacer" ---------- */

export function adminShell(content) {
  return `
    <div class="adm-shell ${ui.sheet ? "has-sheet" : ""}">
      ${AdminHeader()}
      ${content}
      ${BottomNav()}
      ${UndoBar()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </div>
  `;
}

function AdminHeader() {
  const pending = registros.pendingCount();
  const offline = isOffline();
  return `
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Admin · ${esc(firstName(currentUser().nombre) || "Juan")}</small>
        </span>
      </a>
      <div class="adm-header-actions">
        ${pending ? `<span class="adm-chip adm-chip--yellow" title="Se envían solos cuando hay señal">${ico("clock", "adm-icon-xs")} ${pending} sin enviar</span>` : ""}
        <button class="adm-btn adm-btn--ghost adm-btn--icon" id="adm-refresh" type="button" data-adm-refresh aria-label="Actualizar datos">${ico("refresh")}</button>
        <button class="adm-btn adm-btn--ghost adm-btn--head" type="button" data-admin-logout>${ico("logOut")}<span>Salir</span></button>
      </div>
    </header>
    ${offline ? `<p class="adm-offline">${ico("alertCircle")} <span>Sin señal: lo que marques se envía solo. Fotos y archivos necesitan señal.</span></p>` : ""}
  `;
}

function BottomNav() {
  const badges = ui.navBadges || {};
  return `
    <nav class="adm-nav" aria-label="Secciones del admin">
      ${TABS.map((tab) => {
        const current = ui.tab === tab.id;
        const badge = badges[tab.id];
        return `
          <button class="adm-nav-item ${current ? "is-current" : ""}" type="button" data-adm-tab="${tab.id}" ${current ? `aria-current="page"` : ""}>
            <span class="adm-nav-icon">${ico(tab.icon, "adm-icon")}${badge ? `<span class="adm-nav-badge adm-nav-badge--${badge.tone}">${badge.count}</span>` : ""}</span>
            <span class="adm-nav-label">${tab.label}</span>
            ${badge ? `<span class="adm-sr-only">: ${esc(badge.label)}</span>` : ""}
          </button>
        `;
      }).join("")}
    </nav>
  `;
}

function UndoBar() {
  if (!ui.undo) return "";
  return `
    <div class="adm-undo" role="status">
      <span>${esc(ui.undo.text)}</span>
      ${ui.undo.run ? `<button class="adm-btn adm-btn--undo" type="button" data-adm-undo>${ico("undo")} Deshacer</button>` : ""}
    </div>
  `;
}

// Muestra un aviso abajo 5 segundos, con "Deshacer" si hay run() para volver atrás.
function offerUndo(text, run) {
  clearTimeout(undoTimer);
  ui.undo = { text, run };
  undoTimer = setTimeout(() => {
    ui.undo = null;
    rerender();
  }, UNDO_MS);
}

/* ---------- Página ---------- */

export function adminDashboard() {
  startLive();
  if (ui.users === null && !ui.usersLoading && !ui.usersError) loadUsers();
  const live = liveData();
  ui.lateSignature = lateSignature(live);
  const pagos = pagosData();
  ui.navBadges = {
    inicio: live.incidentes.length + live.lateNow.length
      ? { count: live.incidentes.length + live.lateNow.length, tone: "red", label: `${plural(live.incidentes.length, "incidente", "incidentes")} y ${plural(live.lateNow.length, "atrasado", "atrasados")}` }
      : null,
    plata: pagos.faltan.length ? { count: pagos.faltan.length, tone: "yellow", label: `${plural(pagos.faltan.length, "pago sin pasar", "pagos sin pasar")} al Libro` } : null,
  };
  // Los mensajes nuevos se escriben un instante después, para que el lector de pantalla los lea.
  setTimeout(flushMsgs, 60);

  let page;
  if (ui.tab === "equipo") page = EquipoTab();
  else if (ui.tab === "plata") page = PlataTab(pagos);
  else if (ui.tab === "mas") page = MasTab();
  else page = InicioTab(live);

  return `
    <main class="adm-page adm-page--${ui.tab}" id="adm-main" tabindex="-1">
      ${page}
    </main>
    ${ui.sheet === "pago" ? PagoSheet() : ""}
    ${ui.sheet === "crear" ? CrearSheet() : ""}
  `;
}

/* ---------- Inicio ---------- */

function InicioTab(live) {
  const priorities = buildPriorities(live);
  const done = readDone();
  const { dayName, date } = todayInfo();
  const name = firstName(currentUser().nombre);

  return `
    <div class="adm-hello">
      <h1 id="adm-title" tabindex="-1">Hola${name ? `, ${esc(name)}` : ""}</h1>
      <p>${esc(dayName)} ${esc(date)}</p>
    </div>
    ${MsgRegion("live")}
    <div class="adm-home">
      <div class="adm-home-main">
        ${NextCard(priorities, done)}
        ${PriorityList(priorities, done)}
        ${Numbers(live)}
      </div>
      <div class="adm-home-side">
        ${SafetyCard()}
        ${IncidentsBlock(live)}
        ${RoutesFold(live)}
        ${PedidosFold(live)}
        ${AvisosFold(live)}
        ${ChecklistsFold(live)}
      </div>
    </div>
  `;
}

function NextCard(priorities, done) {
  const next = priorities.find((priority) => !done.includes(priority.id));
  if (!next) {
    return `
      <section class="adm-next adm-next--done" aria-labelledby="adm-next-title">
        <p class="adm-next-label" id="adm-next-title">${ico("checkCircle")} Próximo paso</p>
        <p class="adm-next-text">Todo hecho. Mirá la carga de la semana.</p>
        <button class="adm-btn adm-btn--primary adm-btn--block" type="button" data-adm-goto="adm-carga">${ico("chart")} Carga semanal</button>
      </section>
    `;
  }
  return `
    <section class="adm-next adm-next--${next.tone}" aria-labelledby="adm-next-title">
      <p class="adm-next-label" id="adm-next-title">${ico("arrowRight")} Próximo paso</p>
      <p class="adm-next-text">${esc(next.action)}</p>
      <button class="adm-btn adm-btn--primary adm-btn--block" type="button" data-adm-goto="${next.target}">${esc(next.targetLabel)} ${ico("arrowRight")}</button>
    </section>
  `;
}

function PriorityList(priorities, done) {
  if (!priorities.length) return "";
  return `
    <section class="adm-block" aria-labelledby="adm-prio-title">
      <h2 class="adm-h2" id="adm-prio-title">Prioridades</h2>
      <ol class="adm-prios">
        ${priorities.map((priority, index) => {
          const isDone = done.includes(priority.id);
          return `
            <li class="adm-prio adm-prio--${priority.tone} ${isDone ? "is-done" : ""}">
              <div class="adm-prio-head">
                <span class="adm-prio-num" aria-hidden="true">${index + 1}</span>
                <div class="adm-prio-text">
                  <span class="adm-chip adm-chip--${isDone ? "green" : priority.tone}">${esc(priority.tag)}${isDone ? " · Hecho" : ""}</span>
                  <h3>${esc(priority.short)}</h3>
                </div>
                ${Help(`<p><strong>${esc(priority.title)}.</strong> ${esc(priority.detail)}</p>`, `Más info: ${priority.short}`)}
              </div>
              <div class="adm-prio-actions">
                <button class="adm-btn adm-btn--ghost" type="button" data-adm-goto="${priority.target}">${esc(priority.targetLabel)}</button>
                <button class="adm-btn ${isDone ? "adm-btn--done" : "adm-btn--soft"}" type="button" data-adm-done="${esc(priority.id)}" data-adm-done-label="${esc(priority.short)}" aria-pressed="${isDone}">
                  ${ico("check")} ${isDone ? "Hecho" : "Listo"}
                </button>
              </div>
            </li>
          `;
        }).join("")}
      </ol>
    </section>
  `;
}

function Numbers(live) {
  const items = [
    { label: "Perros hoy", value: live.perrosHoy, tone: "gray", target: "adm-cumplimiento" },
    { label: "Entregados", value: live.entregados, tone: live.entregados ? "green" : "gray", target: "adm-cumplimiento" },
    { label: "Atrasados", value: live.late.length, tone: live.late.length ? "red" : "gray", target: "adm-cumplimiento" },
    { label: "Incidentes", value: live.incidentes.length, tone: live.incidentes.length ? "red" : "gray", target: "adm-incidentes" },
  ];
  return `
    <section class="adm-block" aria-labelledby="adm-num-title">
      <div class="adm-h2-row">
        <h2 class="adm-h2" id="adm-num-title">Hoy en números</h2>
        ${Help(`<p>Perros hoy: los que salen según la ruta de hoy (sin contar los “no sale”). Entregados: marcados en la app. Atrasado: pasaron más de ${LATE_MINUTES} minutos de la hora prevista y nadie marcó el retiro. Se actualiza solo cada minuto.</p>`, "Qué cuenta cada número")}
      </div>
      <div class="adm-nums">
        ${items.map((item) => `
          <button class="adm-num adm-num--${item.tone}" type="button" data-adm-goto="${item.target}" data-adm-num="${esc(item.label)}">
            <strong>${item.value}</strong>
            <span>${item.label}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

// Seguridad: siempre visible en Inicio. Cruces "no juntar" y perros con bozal, con su foto.
function SafetyCard() {
  const { conflicts, missing, notRouted } = safetyConflicts();
  const dogs = safetyDogs();
  return `
    <section class="adm-card adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <div class="adm-h2-row">
        <h2 class="adm-h2" id="adm-safety-title">${ico("alertTriangle")} Seguridad</h2>
        ${Help(`<p>Fuente: BASE RUTAS (${DATA_UPDATED}). Siempre visible.</p>
          ${missing.length || notRouted.length ? `<ul>
            ${missing.map((m) => `<li>${esc(m.dog)} figura “no juntar con ${esc(m.other)}”, pero ${esc(m.other)} no está en el registro: ${PENDIENTE}.</li>`).join("")}
            ${notRouted.map((n) => `<li>${esc(n.dog)} y ${esc(n.other)}: hoy ${esc(n.idle)} no tiene ruta. Si vuelve, revisá el turno.</li>`).join("")}
          </ul>` : ""}`, "Más info de seguridad")}
      </div>
      ${conflicts.length ? `
        <ul class="adm-cross-list" aria-label="Perros marcados no juntar que comparten turno">
          ${conflicts.map((c) => {
            const reviewNote = [c.a, c.b].filter((name) => /día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(REAL_DOGS.find((dog) => dog.name === name)?.review || ""));
            return `
              <li class="adm-cross">
                <span class="adm-cross-dogs">
                  ${DogAvatar(dogById(null, c.a)?.id, c.a, "sm")}<strong>${esc(c.a)}</strong>
                  <span class="adm-cross-x" aria-label="no juntar con">✕</span>
                  ${DogAvatar(dogById(null, c.b)?.id, c.b, "sm")}<strong>${esc(c.b)}</strong>
                </span>
                <span class="adm-chip adm-chip--yellow">${esc(c.shift)} · ${esc(daysText(c.days))}</span>
                ${reviewNote.length ? `<span class="adm-chip adm-chip--gray">Días a revisar</span>` : ""}
              </li>
            `;
          }).join("")}
        </ul>
      ` : `<p class="adm-empty">Sin cruces “no juntar” en BASE RUTAS.</p>`}
      <ul class="adm-dog-chips" aria-label="Perros con indicaciones de seguridad">
        ${dogs.map((dog) => `
          <li>
            ${DogAvatar(dog.id, dog.name, "sm")}
            <span class="adm-dog-chip-name">${esc(dog.name)}</span>
            ${SafetyChips(dog)}
          </li>
        `).join("")}
      </ul>
    </section>
  `;
}

const ESTADOS = {
  pendiente: { label: "Por retirar", tone: "gray" },
  retirado: { label: "Retirado", tone: "blue" },
  paseando: { label: "Paseando", tone: "blue" },
  entregado: { label: "Entregado", tone: "green" },
  "no-sale": { label: "No sale", tone: "yellow" },
};

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

function Fold(key, { title, iconName, count = null, tone = "gray", open = false, id = "" }, body) {
  return `
    <details class="adm-fold" ${id ? `id="${id}" tabindex="-1"` : ""} data-adm-fold="${esc(key)}" ${foldOpen(key, open) ? "open" : ""}>
      <summary>
        <span class="adm-fold-icon">${ico(iconName)}</span>
        <span class="adm-fold-title">${title}</span>
        ${count !== null ? `<span class="adm-count adm-count--${tone}">${count}</span>` : ""}
        <span class="adm-chevron">${ico("chevronDown")}</span>
      </summary>
      <div class="adm-fold-body">${body}</div>
    </details>
  `;
}

function IncidentsBlock(live) {
  const { incidentes } = live;
  if (!incidentes.length) {
    return `<p class="adm-ok-line" id="adm-incidentes" tabindex="-1">${ico("checkCircle")} Sin incidentes hoy</p>`;
  }
  const fields = [
    ["lugar", "Lugar"],
    ["antes", "Antes"],
    ["conducta", "Qué pasó"],
    ["accion", "Qué se hizo"],
    ["despues", "Después"],
    ["lesiones", "Lesiones"],
    ["protocolo", "Protocolo"],
  ];
  return `
    <section class="adm-card adm-card--red" id="adm-incidentes" tabindex="-1" aria-labelledby="adm-inc-title">
      <h2 class="adm-h2" id="adm-inc-title">${ico("alertTriangle")} ${plural(incidentes.length, "incidente hoy", "incidentes hoy")}</h2>
      <ul class="adm-list">
        ${incidentes.map((item) => {
          const dog = dogById(Array.isArray(item.perros) ? item.perros[0] : null, item.perroNombre);
          const facts = fields.filter(([key]) => item[key]);
          return `
            <li class="adm-row">
              ${DogAvatar(dog?.id, item.perroNombre || item.titulo || "!", "md")}
              <div class="adm-row-main">
                <strong class="adm-row-title">${esc(item.titulo || item.perroNombre || "Incidente")}</strong>
                <span class="adm-row-meta">${recordTime(item) ? `${esc(recordTime(item))} h · ` : ""}${esc(item.creadoPorNombre || nameOf(item.creadoPor) || "")}</span>
                <span class="adm-chips">
                  ${item.riesgo ? `<span class="adm-chip adm-chip--red">Riesgo: ${esc(item.riesgo)}</span>` : ""}
                  ${item.lesiones ? `<span class="adm-chip adm-chip--yellow">Lesiones: ${esc(item.lesiones)}</span>` : ""}
                </span>
                ${facts.length ? `
                  <details class="adm-more" data-adm-fold-inner="inc-${esc(item.id)}" ${foldOpen(`inc-${item.id}`) ? "open" : ""}>
                    <summary>Ver detalle</summary>
                    <dl class="adm-facts-dl">
                      ${facts.map(([key, label]) => `<div><dt>${label}</dt><dd>${esc(Array.isArray(item[key]) ? item[key].join(", ") : item[key])}</dd></div>`).join("")}
                    </dl>
                  </details>
                ` : ""}
              </div>
            </li>
          `;
        }).join("")}
      </ul>
    </section>
  `;
}

const STOP_STATUS = {
  atrasado: { label: "Atrasado", tone: "red" },
  entregado: { label: "Entregado", tone: "green" },
  "no-sale": { label: "No sale", tone: "yellow" },
};

const ROUTE_SOURCE = {
  dia: "Cambio del día",
  plantilla: "Plantilla",
  planilla: "BASE RUTAS",
};

function stopStatus(stop) {
  if (STOP_STATUS[stop.status]) return STOP_STATUS[stop.status];
  return ESTADOS[stop.estado] || { label: stop.estado, tone: "gray" };
}

function StopRow(stop) {
  const st = stopStatus(stop);
  const dog = dogById(stop.perroId, stop.perroNombre);
  const perroId = stop.perroId || dog?.id || "";
  const extra = [
    stop.status === "atrasado" ? `${stop.atraso} min tarde` : "",
    stop.paseo?.horaRetiro ? `retiro ${stop.paseo.horaRetiro}` : "",
    stop.paseo?.horaEntrega ? `entrega ${stop.paseo.horaEntrega}` : "",
    stop.nota ? stop.nota : "",
  ].filter(Boolean).join(" · ");
  return `
    <li class="adm-row adm-stop ${stop.status === "atrasado" ? "is-late" : ""}">
      ${DogAvatar(perroId, stop.perroNombre, "md")}
      <div class="adm-row-main">
        <span class="adm-stop-top"><strong class="adm-stop-time">${esc(stop.hora || "--:--")}</strong> <strong class="adm-row-title">${esc(stop.perroNombre || "Perro sin nombre")}</strong></span>
        <span class="adm-chips">
          <span class="adm-chip adm-chip--${st.tone}">${esc(st.label)}${stop.paseo?.pendiente ? " · sin enviar" : ""}</span>
          ${SafetyChips(dog)}
        </span>
        ${extra ? `<span class="adm-row-meta">${esc(extra)}</span>` : ""}
      </div>
      ${perroId && !fotosPerros.de(perroId) ? FotoButton(perroId, stop.perroNombre, { compact: true }) : ""}
    </li>
  `;
}

function RouteCard(item) {
  const { route, stops } = item;
  const salen = stops.length - item.noSale;
  const key = `ruta-${route.ruta}`;
  const people = [
    route.paseador ? nameOf(route.paseador) : "Paseador sin asignar",
    route.ayudante ? `+ ${nameOf(route.ayudante)}` : "",
    route.supervisor ? `· supervisa ${route.supervisor}` : "",
  ].filter(Boolean).join(" ");
  const late = stops.filter((stop) => stop.status === "atrasado");
  const ratio = salen ? item.entregados / salen : 0;
  return `
    <article class="adm-route ${late.length ? "has-late" : ""}" aria-labelledby="adm-route-${esc(route.ruta)}">
      <div class="adm-route-head">
        <h3 id="adm-route-${esc(route.ruta)}">${esc(route.ruta || "Ruta")} <span>${esc(route.turno || "")}</span></h3>
        <span class="adm-chip adm-chip--gray">${esc(ROUTE_SOURCE[route.fuente] || "")}</span>
      </div>
      <p class="adm-row-meta">${esc(people)}</p>
      ${stops.length ? `
        <p class="adm-route-progress"><strong>${item.entregados}</strong> de ${salen} entregados</p>
        <span class="adm-progress" aria-hidden="true"><span style="--v:${ratio.toFixed(3)}"></span></span>
        <span class="adm-chips">
          ${item.atrasados ? `<span class="adm-chip adm-chip--red">${plural(item.atrasados, "atrasado", "atrasados")}</span>` : `<span class="adm-chip adm-chip--green">Sin atrasos</span>`}
          ${item.noSale ? `<span class="adm-chip adm-chip--yellow">${item.noSale} no ${item.noSale === 1 ? "sale" : "salen"}</span>` : ""}
        </span>
        ${late.length ? `<ul class="adm-list adm-list--tight">${late.map(StopRow).join("")}</ul>` : ""}
        <details class="adm-more" data-adm-fold-inner="${esc(key)}" ${foldOpen(key) ? "open" : ""}>
          <summary>Ver las ${stops.length} paradas</summary>
          <ol class="adm-list adm-list--tight">${stops.map(StopRow).join("")}</ol>
        </details>
      ` : `<p class="adm-empty">Sin paradas cargadas.</p>`}
    </article>
  `;
}

function RoutesFold(live) {
  const { compliance, effective, late } = live;
  const shiftLine = (key, label) => {
    const shift = live.shifts.find((item) => item.key === key);
    if (!shift?.total) return "";
    return `<span class="adm-chip adm-chip--blue">${label}: ${shift.retirados} retirados · ${shift.paseando} paseando · ${shift.pendientes} por retirar</span>`;
  };
  const shifts = [shiftLine("manana", "Mañana"), shiftLine("tarde", "Tarde"), shiftLine("otro", "Sin turno")].filter(Boolean).join("");
  return Fold("rutas", {
    title: "Rutas de hoy",
    iconName: "route",
    count: late.length ? `${late.length} tarde` : compliance.length,
    tone: late.length ? "red" : "gray",
    open: late.length > 0,
    id: "adm-cumplimiento",
  }, `
    ${effective.fromSheet ? `<div class="adm-warn-line">${ico("alertCircle")} <span>Sin plantilla en la app: horarios de BASE RUTAS.</span> ${Help(`<p>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${PENDIENTE.toLowerCase()}. La plantilla la arma el coordinador.</p>`, "Por qué BASE RUTAS")}</div>` : ""}
    ${shifts ? `<div class="adm-chips adm-chips--wrap">${shifts}</div>` : ""}
    ${!isOffline() && registros.cached("fotos").length < REAL_DOGS.length ? `<p class="adm-row-meta">${ico("camera", "adm-icon-xs")} “Foto” abre la cámara (necesita señal).</p>` : ""}
    ${compliance.length ? `<div class="adm-routes">${compliance.map(RouteCard).join("")}</div>` : `<p class="adm-empty">Hoy no hay rutas.</p>`}
  `);
}

function PedidosFold(live) {
  const { pedidosNuevos } = live;
  return Fold("pedidos", {
    title: "Pedidos nuevos",
    iconName: "message",
    count: pedidosNuevos.length,
    tone: pedidosNuevos.length ? "blue" : "gray",
    open: pedidosNuevos.length > 0,
    id: "adm-pedidos",
  }, pedidosNuevos.length ? `
    <ul class="adm-list">
      ${pedidosNuevos.slice(0, 6).map((pedido) => {
        const carnetId = pedido.carnet?.id || live.carnetsWeb.find((archivo) => archivo.pedidoId === pedido.id)?.id || "";
        return `
          <li class="adm-row">
            <div class="adm-row-main">
              <strong class="adm-row-title">${esc(pedido.titulo || pedido.tipo || "Pedido sin título")}</strong>
              <span class="adm-row-meta">${esc(ymdToAR(pedido.fecha) || dateAR(pedido.creadoEn))} · ${pedido.origen === "web" ? "Web" : esc(pedido.creadoPorNombre || "App")}</span>
              ${carnetId ? `<span class="adm-chips"><span class="adm-chip adm-chip--green">${ico("fileCheck", "adm-icon-xs")} Trae carnet</span></span>` : ""}
            </div>
            ${carnetId ? `<button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-archivo-abrir="${esc(carnetId)}" data-adm-area="live" aria-label="Ver el carnet${pedido.datos?.perro ? ` de ${esc(pedido.datos.perro)}` : ""}">${ico("eye")} Carnet</button>` : ""}
          </li>
        `;
      }).join("")}
    </ul>
    ${pedidosNuevos.length > 6 ? `<p class="adm-row-meta">Y ${plural(pedidosNuevos.length - 6, "más", "más")}. Los responde el coordinador.</p>` : ""}
  ` : `<p class="adm-empty">Sin pedidos nuevos.</p>`);
}

const AVISO_TONES = { "perro suelto": "red", seguridad: "red", "obra o corte": "yellow", clima: "blue", "cambio de horario": "blue" };

function AvisosFold(live) {
  const { avisos } = live;
  return Fold("avisos", {
    title: "Avisos por barrio",
    iconName: "mapPin",
    count: avisos.length,
    tone: avisos.length ? "yellow" : "gray",
    open: avisos.some((aviso) => AVISO_TONES[aviso.tipo] === "red"),
    id: "adm-avisos",
  }, avisos.length ? `
    <ul class="adm-list">
      ${avisos.map((aviso) => `
        <li class="adm-row">
          <div class="adm-row-main">
            <span class="adm-chips">
              <strong class="adm-row-title">${esc(aviso.barrio || "Barrio sin indicar")}</strong>
              <span class="adm-chip adm-chip--${AVISO_TONES[aviso.tipo] || "gray"}">${esc(aviso.tipo || "otro")}</span>
            </span>
            <span>${esc(aviso.mensaje || aviso.titulo || "")}</span>
            <span class="adm-row-meta">${aviso.vigenteHasta ? `Hasta ${esc(ymdToAR(aviso.vigenteHasta))}` : "Solo hoy"}${byLine(aviso, true) ? ` · ${esc(byLine(aviso, true))}` : ""}</span>
          </div>
        </li>
      `).join("")}
    </ul>
  ` : `<p class="adm-empty">Sin avisos vigentes.</p>`);
}

function checklistLine(record) {
  const items = record.items && typeof record.items === "object" ? Object.values(record.items) : [];
  const ok = items.filter(Boolean).length;
  const complete = record.completo === true || (items.length > 0 && ok === items.length);
  return { complete, text: items.length ? `${ok}/${items.length}` : "" };
}

function ChecklistsFold(live) {
  const { checklists } = live;
  const incomplete = checklists.filter((record) => !checklistLine(record).complete).length;
  return Fold("checklists", {
    title: "Checklists",
    iconName: "clipboardCheck",
    count: checklists.length,
    tone: incomplete ? "yellow" : checklists.length ? "green" : "gray",
  }, checklists.length ? `
    <ul class="adm-list">
      ${checklists.map((record) => {
        const line = checklistLine(record);
        return `
          <li class="adm-row">
            <span class="adm-avatar adm-avatar--sm adm-avatar--empty" aria-hidden="true">${esc(initial(record.creadoPorNombre || record.creadoPor))}</span>
            <div class="adm-row-main">
              <strong class="adm-row-title">${esc(record.creadoPorNombre || record.creadoPor || "Sin nombre")}</strong>
              <span class="adm-row-meta">${esc(record.turno || "Turno sin indicar")}</span>
            </div>
            <span class="adm-chip ${line.complete ? "adm-chip--green" : "adm-chip--yellow"}">${line.complete ? "Completo" : "Incompleto"}${line.text ? ` ${line.text}` : ""}</span>
          </li>
        `;
      }).join("")}
    </ul>
  ` : `<p class="adm-empty">Nadie cargó el checklist hoy.</p>`);
}

/* ---------- Equipo (usuarios y accesos) ---------- */

function CredentialBox() {
  const cred = ui.credential;
  if (!cred) return "";
  const text = credentialText(cred);
  return `
    <section class="adm-card adm-cred" id="adm-cred" tabindex="-1" aria-labelledby="adm-cred-title">
      <span class="adm-chip adm-chip--yellow">Solo se ve ahora</span>
      <h2 class="adm-h2" id="adm-cred-title">${cred.tipo === "alta" ? `Listo: ${esc(cred.nombre)}` : `PIN nuevo de ${esc(cred.nombre)}`}</h2>
      <dl class="adm-cred-data">
        <div><dt>Usuario</dt><dd>${esc(cred.usuario)}</dd></div>
        <div><dt>PIN</dt><dd class="adm-pin-big">${esc(cred.pin)}</dd></div>
      </dl>
      <a class="adm-btn adm-btn--whatsapp adm-btn--block" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener noreferrer">${ico("message")} Mandar por WhatsApp</a>
      <div class="adm-btn-row">
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-cred-copy>${ico("copy")} Copiar</button>
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-cred-hide>${ico("check")} Listo</button>
      </div>
      ${Help(`<p>Mensaje: “${esc(text)}”</p><p>El PIN no queda guardado en la página: al tocar “Listo” desaparece. Si se pierde, generá uno nuevo con “PIN”.</p>`, "Ver el mensaje")}
    </section>
  `;
}

function RolePicker(user) {
  return `
    <div class="adm-role-picker" role="group" aria-label="Rol de ${esc(user.nombre)}">
      ${ROLE_CHOICES.map((choice) => `
        <button class="adm-choice ${choice.rol === user.rol ? "is-on" : ""}" type="button" data-adm-role-set="${esc(user.usuario)}" data-adm-rol="${choice.rol}" aria-pressed="${choice.rol === user.rol}">
          ${ico(choice.icon)} <span>${esc(choice.short)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function ResetForm(user) {
  const reactivar = !user.activo;
  return `
    <form class="adm-inline-form" data-adm-form="reset" data-adm-usuario="${esc(user.usuario)}" novalidate aria-labelledby="adm-reset-title">
      <p id="adm-reset-title"><strong>${reactivar ? "Reactivar" : "PIN nuevo para"} ${esc(user.nombre)}</strong></p>
      <div class="adm-pin-row">
        <label class="adm-sr-only" for="adm-reset-pin">PIN nuevo, de 6 a 8 números</label>
        <input class="adm-input adm-input--pin" id="adm-reset-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required placeholder="6 a 8 números" value="${esc(drafts.reset.pin)}" data-adm-draft="reset" data-adm-key="pin" />
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-gen-pin="reset">${ico("key")} Generar</button>
      </div>
      <div class="adm-btn-row">
        <button class="adm-btn adm-btn--primary" type="submit">${ico("check")} ${reactivar ? "Reactivar" : "Guardar"}</button>
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-reset-cancel>Cancelar</button>
      </div>
      ${reactivar ? "" : `<p class="adm-row-meta">Se cierra su sesión en todos lados.</p>`}
    </form>
  `;
}

function ConfirmOff(user) {
  return `
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${esc(user.nombre)}?</strong> No va a poder entrar. Lo que cargó queda.</p>
      <div class="adm-btn-row">
        <button class="adm-btn adm-btn--danger" type="button" data-adm-off-confirm="${esc(user.usuario)}">${ico("off")} Desactivar</button>
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `;
}

function UserCard(user, me) {
  const isMe = user.usuario === me;
  const lastLogin = user.ultimoIngreso ? `Entró ${dateAR(user.ultimoIngreso)}` : "Nunca entró";
  return `
    <li class="adm-user ${user.activo ? "" : "is-off"}">
      <div class="adm-user-head">
        <span class="adm-avatar adm-avatar--md adm-avatar--empty adm-avatar--person" aria-hidden="true">${esc(initial(user.nombre))}</span>
        <div class="adm-row-main">
          <strong class="adm-row-title">${esc(user.nombre)}</strong>
          <span class="adm-row-meta">${esc(user.usuario)} · ${esc(lastLogin)}</span>
        </div>
        <span class="adm-chips adm-chips--end">
          <span class="adm-chip adm-chip--blue">${esc(roleShort(user.rol))}</span>
          ${user.activo ? "" : `<span class="adm-chip adm-chip--gray">Desactivado</span>`}
          ${isMe ? `<span class="adm-chip adm-chip--green">Vos</span>` : ""}
        </span>
      </div>
      ${isMe ? `
        <div class="adm-btn-row">
          <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/login" data-link>${ico("key")} Cambiar mi PIN</a>
        </div>
      ` : user.activo ? `
        <div class="adm-btn-row adm-btn-row--3">
          <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-rolefor="${esc(user.usuario)}" aria-expanded="${ui.roleFor === user.usuario}">${ico("userCheck")} Rol</button>
          <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-reset="${esc(user.usuario)}" aria-expanded="${ui.resetFor === user.usuario}">${ico("key")} PIN</button>
          <button class="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger-ghost" type="button" data-adm-off="${esc(user.usuario)}">${ico("off")} Baja</button>
        </div>
      ` : `
        <div class="adm-btn-row">
          <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-reset="${esc(user.usuario)}" aria-expanded="${ui.resetFor === user.usuario}">${ico("refresh")} Reactivar</button>
        </div>
      `}
      ${!isMe && user.activo && ui.roleFor === user.usuario ? RolePicker(user) : ""}
      ${!isMe && ui.resetFor === user.usuario ? ResetForm(user) : ""}
      ${!isMe && ui.confirmOff === user.usuario ? ConfirmOff(user) : ""}
    </li>
  `;
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

function EquipoTab() {
  const me = currentUser().usuario;
  const list = (ui.users || []).slice().sort((a, b) => String(a.nombre).localeCompare(String(b.nombre)));
  const activos = list.filter((user) => user.activo);
  const inactivos = list.filter((user) => !user.activo);

  let body;
  if (ui.users === null && ui.usersLoading) body = `<p class="adm-empty">Cargando…</p>`;
  else if (ui.users === null) body = `<p class="adm-empty">No se pudo traer la lista.</p><button class="adm-btn adm-btn--ghost" id="adm-users-refresh" type="button" data-adm-users-refresh>${ico("refresh")} Reintentar</button>`;
  else if (!list.length) body = `<p class="adm-empty">Todavía no hay usuarios.</p>`;
  else {
    body = `
      <ul class="adm-users">${activos.map((user) => UserCard(user, me)).join("")}</ul>
      ${inactivos.length ? Fold("inactivos", { title: "Desactivados", iconName: "off", count: inactivos.length }, `<ul class="adm-users">${inactivos.map((user) => UserCard(user, me)).join("")}</ul>`) : ""}
    `;
  }

  return `
    <div class="adm-title-row" id="adm-usuarios" tabindex="-1">
      <h1 id="adm-title" tabindex="-1">Equipo</h1>
      ${ui.users ? `<span class="adm-count adm-count--gray">${activos.length} activos</span>` : ""}
      ${Help(`<p>Quién entra a la app y qué ve. Los PIN guardados nunca se muestran.</p><p>Equipo autorizado: ${esc(listJoin(TEAM.map((person) => person.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>`, "Qué es Equipo")}
    </div>
    ${CredentialBox()}
    <button class="adm-btn adm-btn--primary adm-btn--block adm-btn--big" id="adm-crear-abrir" type="button" data-adm-sheet="crear">${ico("userPlus", "adm-icon")} Nuevo usuario</button>
    ${ui.sheet === "crear" ? "" : MsgRegion("users")}
    ${body}
    ${Fold("roles", { title: "Qué ve cada rol", iconName: "eye" }, `
      <ul class="adm-role-help">
        ${ROLE_CHOICES.map((choice) => `<li>${ico(choice.icon)}<div><strong>${esc(ROLE_LABELS[choice.rol])}</strong><span>${esc(roleLine(choice.rol))}</span></div></li>`).join("")}
      </ul>
    `)}
    ${Fold("equipo", { title: "Equipo y permisos", iconName: "users", count: TEAM.length, id: "adm-equipo" }, `
      <ul class="adm-list">
        ${TEAM.map((person) => {
          const panel = ROLE_PANELS[person.role];
          return `
            <li class="adm-row">
              <span class="adm-avatar adm-avatar--sm adm-avatar--empty adm-avatar--person" aria-hidden="true">${esc(initial(person.name))}</span>
              <div class="adm-row-main">
                <strong class="adm-row-title">${esc(person.name)}</strong>
                <span class="adm-row-meta">${esc(person.label)} · ${panel ? `<a class="adm-link" href="${panel.path}" data-link>Panel ${panel.panel}</a>` : `Panel: ${PENDIENTE}`}</span>
                <span class="adm-row-meta">${esc(person.tasks)}</span>
              </div>
            </li>
          `;
        }).join("")}
      </ul>
      <div class="adm-roles">
        ${ROLE_PERMISSIONS.map((item) => `
          <article class="adm-role">
            <h3>${item.role}</h3>
            <p class="adm-row-meta">${esc(item.who)}</p>
            <ul>${item.can.map((permission) => `<li>${esc(permission)}</li>`).join("")}</ul>
          </article>
        `).join("")}
      </div>
      <p class="adm-row-meta">Vos decidís la distribución final. Otros paseadores figuran como “Paseador asignado”.</p>
    `)}
  `;
}

function CrearSheet() {
  const d = drafts.crear;
  const choice = ROLE_CHOICES.find((item) => item.rol === d.rol);
  return Sheet("crear", "Nuevo usuario", `
    <form class="adm-sheet-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-sheet-title">
      <label class="adm-field" for="adm-crear-nombre">
        <span>Nombre</span>
        <input class="adm-input adm-input--big" id="adm-crear-nombre" name="nombre" autocomplete="off" maxlength="60" required placeholder="Ej. Sebastián" value="${esc(d.nombre)}" data-adm-draft="crear" data-adm-key="nombre" />
      </label>
      <fieldset class="adm-field">
        <legend>Rol</legend>
        <div class="adm-role-grid">
          ${ROLE_CHOICES.map((item) => `
            <label class="adm-choice ${item.rol === d.rol ? "is-on" : ""}">
              <input type="radio" name="rol" value="${item.rol}" ${item.rol === d.rol ? "checked" : ""} data-adm-draft="crear" data-adm-key="rol" />
              ${ico(item.icon)} <span>${esc(item.short)}</span>
            </label>
          `).join("")}
        </div>
        <p class="adm-row-meta" data-adm-role-hint aria-live="polite">${esc(choice?.line || "")}</p>
      </fieldset>
      <label class="adm-field" for="adm-crear-usuario">
        <span>Usuario <small>para entrar</small></span>
        <input class="adm-input" id="adm-crear-usuario" name="usuario" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="31" required placeholder="Ej. sebastian" value="${esc(d.usuario)}" data-adm-draft="crear" data-adm-key="usuario" />
      </label>
      <div class="adm-field">
        <label for="adm-crear-pin"><span>PIN <small>6 a 8 números</small></span></label>
        <div class="adm-pin-row">
          <input class="adm-input adm-input--pin" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${esc(d.pin)}" data-adm-draft="crear" data-adm-key="pin" />
          <button class="adm-btn adm-btn--ghost" type="button" data-adm-gen-pin="crear">${ico("key")} Generar PIN</button>
        </div>
      </div>
      ${MsgRegion("users")}
      <div class="adm-sheet-foot">
        <button class="adm-btn adm-btn--primary adm-btn--block adm-btn--big" type="submit">${ico("userPlus")} Crear</button>
      </div>
    </form>
  `);
}

function Sheet(kind, title, body) {
  return `
    <div class="adm-sheet ${ui.sheetEnter ? "is-entering" : ""}" data-adm-sheet-backdrop>
      <div class="adm-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="adm-sheet-title">
        <div class="adm-sheet-head">
          <h2 id="adm-sheet-title">${esc(title)}</h2>
          <button class="adm-btn adm-btn--ghost adm-btn--icon" id="adm-sheet-close" type="button" data-adm-sheet-close aria-label="Cerrar">${ico("x")}</button>
        </div>
        <div class="adm-sheet-body" data-adm-sheet-kind="${kind}">${body}</div>
      </div>
    </div>
  `;
}

/* ---------- Plata (pagos: registro de apoyo, solo admin) ---------- */

function monthLabel(ym, short = false) {
  const [y, m] = String(ym).split("-").map(Number);
  if (!y || !m) return ym;
  const text = new Intl.DateTimeFormat("es-AR", { month: short ? "short" : "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(y, m - 1, 15)));
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
      <div class="adm-pago-top">
        <div class="adm-row-main">
          <strong class="adm-row-title">${esc(pago.concepto || "Sin concepto")}</strong>
          <span class="adm-row-meta">${esc(ymdToAR(pago.fecha) || dateAR(pago.creadoEn) || PENDIENTE)}${pago.medio ? ` · ${esc(pago.medio)}` : ""}</span>
        </div>
        <strong class="adm-pago-amount">${hasMonto ? esc(formatPeso(monto)) : PENDIENTE}</strong>
      </div>
      <span class="adm-chips">
        <span class="adm-chip ${pago.pasadoAlLibro ? "adm-chip--green" : "adm-chip--yellow"}">${pago.pasadoAlLibro ? "En el Libro" : "Falta el Libro"}</span>
        ${pago.comprobanteId ? `<span class="adm-chip adm-chip--green">${ico("fileCheck", "adm-icon-xs")} Comprobante</span>` : `<span class="adm-chip adm-chip--gray">Sin comprobante</span>`}
        ${pago.pendiente ? `<span class="adm-chip adm-chip--blue">Sin enviar</span>` : ""}
        ${fromOther ? `<span class="adm-chip adm-chip--blue" title="Lo cargó ${esc(ROLE_LABELS[creator.rol] || creator.rol)} antes del cambio de roles">Antes del cambio</span>` : ""}
      </span>
      <div class="adm-btn-row">
        <button class="adm-btn ${pago.pasadoAlLibro ? "adm-btn--done" : "adm-btn--soft"} adm-btn--sm" type="button" data-adm-pago-libro="${esc(pago.id)}" aria-pressed="${pago.pasadoAlLibro ? "true" : "false"}">
          ${ico("check")} ${pago.pasadoAlLibro ? "En el Libro" : "Pasé al Libro"}
        </button>
        ${pago.comprobanteId ? `
          <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-archivo-abrir="${esc(pago.comprobanteId)}" data-adm-area="pagos" aria-label="Ver comprobante de ${esc(pago.concepto || "este pago")}">${ico("eye")} Ver</button>
        ` : pago.pendiente ? "" : `
          <label class="adm-btn adm-btn--ghost adm-btn--sm adm-file-button">
            ${ico("camera")} <span>Comprobante</span>
            <input class="adm-file-input" type="file" accept="${ARCHIVO_ACCEPT}" data-adm-pago-adjuntar="${esc(pago.id)}" aria-label="Adjuntar comprobante a ${esc(pago.concepto || "este pago")}" />
          </label>
        `}
      </div>
    </li>
  `;
}

function PlataTab(data) {
  const mesText = data.mes === "todos" ? "Todos los meses" : monthLabel(data.mes);
  const shown = ui.pagosTodos ? data.filtered.slice(0, 60) : data.filtered.slice(0, PAGOS_SHORT);
  const chips = [...data.months.slice(0, 3), "todos"];
  if (data.mes !== "todos" && !chips.includes(data.mes)) chips.splice(3, 0, data.mes);
  return `
    <div class="adm-title-row" id="adm-pagos" tabindex="-1">
      <h1 id="adm-title" tabindex="-1">Plata</h1>
      ${Help(`<p>Registro de apoyo para no olvidarte de nada. Fuente oficial: ${LIBRO}. Cada pago se pasa al Libro. Solo vos lo ves.</p>`, "Qué es Plata")}
    </div>
    <section class="adm-card adm-money" aria-label="Resumen de ${esc(mesText)}">
      <p class="adm-money-label">${esc(mesText)}</p>
      <p class="adm-money-total">${esc(formatPeso(data.total))}</p>
      <span class="adm-chips">
        <span class="adm-chip adm-chip--gray">${plural(data.filtered.length, "pago", "pagos")}</span>
        ${data.faltanMes.length ? `<span class="adm-chip adm-chip--yellow" data-adm-pagos-faltan>${data.faltanMes.length} sin pasar al Libro</span>` : data.filtered.length ? `<span class="adm-chip adm-chip--green" data-adm-pagos-faltan>Todo en el Libro</span>` : ""}
        ${data.sinComprobanteMes.length ? `<span class="adm-chip adm-chip--gray">${data.sinComprobanteMes.length} sin comprobante</span>` : ""}
        ${data.mes !== "todos" && data.faltan.length > data.faltanMes.length ? `<span class="adm-chip adm-chip--yellow">${data.faltan.length - data.faltanMes.length} de otros meses</span>` : ""}
      </span>
    </section>
    <button class="adm-btn adm-btn--primary adm-btn--block adm-btn--big" id="adm-pago-abrir" type="button" data-adm-sheet="pago">${ico("plus", "adm-icon")} Cargar pago</button>
    ${ui.sheet === "pago" ? "" : MsgRegion("pagos")}
    <div class="adm-seg" role="group" aria-label="Mes">
      ${chips.map((m) => `<button class="adm-seg-item ${m === data.mes ? "is-on" : ""}" type="button" data-adm-pagos-mes="${m}" aria-pressed="${m === data.mes}">${m === "todos" ? "Todos" : esc(monthLabel(m, true))}</button>`).join("")}
    </div>
    ${shown.length ? `
      <ul class="adm-pagos" aria-label="Pagos de ${esc(mesText)}">${shown.map(PagoRow).join("")}</ul>
      ${data.filtered.length > shown.length ? `<button class="adm-btn adm-btn--ghost adm-btn--block" type="button" data-adm-pagos-todos>Ver los ${data.filtered.length}</button>` : ""}
    ` : `<p class="adm-empty">Sin pagos en ${esc(mesText.toLowerCase())}.</p>`}
    ${data.deOtros.length ? `<p class="adm-row-meta">${plural(data.deOtros.length, "pago lo cargó", "pagos los cargó")} otro rol antes del cambio de roles (el coordinador ya no ve plata).</p>` : ""}
    ${FinanceFold()}
  `;
}

function FinanceFold() {
  const billing = theoreticalBilling();
  return Fold("finanzas", { title: "Facturación teórica", iconName: "chart", id: "adm-finanzas" }, `
    <p class="adm-money-total adm-money-total--sm">${formatPeso(billing.total)} <small>por semana</small></p>
    <span class="adm-chips"><span class="adm-chip adm-chip--yellow">Teórica · no es lo cobrado</span></span>
    <ul class="adm-list adm-list--tight">
      ${billing.byPlan.map((row) => `<li class="adm-row"><div class="adm-row-main"><strong class="adm-row-title">${row.plan.name}</strong><span class="adm-row-meta">${plural(row.count, "perro", "perros")}</span></div><strong>${formatPeso(row.subtotal)}</strong></li>`).join("")}
    </ul>
    ${Help(`<p>Suma del precio de tabla de ${plural(billing.included.length, "perro activo", "perros activos")} con Plan 1, 2 o 3 según su tamaño. Sin descuentos ni acuerdos personales. Lo cobrado está en el ${esc(BUSINESS_INFO.officialSources.money)}.</p>
      ${billing.excluded.length ? `<p>No incluye ${plural(billing.excluded.length, "perro", "perros")} con planes fuera de la tabla (precio ${PENDIENTE.toLowerCase()}):</p><ul>${billing.excludedPlans.map((plan) => `<li>${esc(plan)}: ${listJoin(billing.excluded.filter((dog) => dog.plan === plan).map((dog) => esc(dog.name)))}.</li>`).join("")}</ul>` : ""}`, "Cómo se calcula")}
  `);
}

function ayerAR() {
  return hoyAR(new Date(Date.now() - DAY_MS));
}

// Comprobante elegido para el pago nuevo (sigue elegido aunque la página se vuelva a dibujar).
function PagoArchivoField() {
  const file = drafts.pagoArchivo;
  const offline = isOffline();
  if (file) {
    return `
      <p class="adm-file-chosen">
        ${ico(file.type === "application/pdf" ? "fileText" : "fileCheck")}
        <span><strong>${esc(file.name || "Comprobante")}</strong>${fileSize(file.size) ? ` · ${esc(fileSize(file.size))}` : ""}${drafts.pagoSubido ? " · ya subido" : ""}</span>
        <button class="adm-btn adm-btn--ghost adm-btn--sm" id="adm-pago-archivo-quitar" type="button" data-adm-pago-quitar>${ico("x")} Quitar</button>
      </p>
    `;
  }
  return `
    <label class="adm-btn adm-btn--soft adm-btn--block adm-file-button">
      ${ico("camera")} <span>Sacar foto del comprobante</span>
      <input class="adm-file-input" id="adm-pago-foto" type="file" accept="image/*" capture="environment" data-adm-pago-archivo />
    </label>
    <label class="adm-btn adm-btn--link adm-file-button">
      ${ico("fileUp")} <span>Elegir archivo</span>
      <input class="adm-file-input" id="adm-pago-archivo" type="file" accept="${ARCHIVO_ACCEPT}" data-adm-pago-archivo />
    </label>
    <p class="adm-row-meta">${offline ? "Sin señal no se sube: guardalo sin comprobante y adjuntalo después." : "Opcional. Foto o PDF, hasta 3,5 MB."}</p>
  `;
}

function PagoSheet() {
  const d = drafts.pago;
  const hoy = hoyAR();
  const ayer = ayerAR();
  const monto = parseMonto(d.monto);
  const medioOtro = d.medioSel === "Otro";
  return Sheet("pago", "Cargar pago", `
    <form class="adm-sheet-form" id="adm-pago-form" data-adm-form="pago" novalidate aria-labelledby="adm-sheet-title">
      <label class="adm-field" for="adm-pago-monto">
        <span>Monto</span>
        <span class="adm-money-input">
          <span aria-hidden="true">$</span>
          <input class="adm-input adm-input--money" id="adm-pago-monto" inputmode="numeric" autocomplete="off" maxlength="15" required placeholder="0" value="${esc(d.monto)}" data-adm-draft="pago" data-adm-key="monto" aria-describedby="adm-monto-preview" />
        </span>
        <span class="adm-row-meta" id="adm-monto-preview" data-adm-monto-preview>${Number.isFinite(monto) && monto > 0 ? esc(formatPeso(monto)) : "Solo números"}</span>
      </label>
      <fieldset class="adm-field">
        <legend>Medio</legend>
        <div class="adm-seg adm-seg--wrap">
          ${[...PAGO_MEDIOS, "Otro"].map((medio) => `
            <label class="adm-seg-item ${d.medioSel === medio ? "is-on" : ""}">
              <input type="radio" name="medio" value="${esc(medio)}" ${d.medioSel === medio ? "checked" : ""} data-adm-draft="pago" data-adm-key="medioSel" />
              ${esc(medio)}
            </label>
          `).join("")}
        </div>
        ${medioOtro ? `<label class="adm-sr-only" for="adm-pago-medio-otro">Otro medio</label><input class="adm-input" id="adm-pago-medio-otro" autocomplete="off" maxlength="40" placeholder="¿Cuál?" value="${esc(d.medioOtro)}" data-adm-draft="pago" data-adm-key="medioOtro" />` : ""}
      </fieldset>
      <div class="adm-field">
        <label for="adm-pago-concepto"><span>Concepto</span></label>
        <div class="adm-seg adm-seg--wrap" role="group" aria-label="Conceptos rápidos">
          ${PAGO_CONCEPTOS.map((concepto) => `<button class="adm-seg-item ${d.concepto === concepto ? "is-on" : ""}" type="button" data-adm-concepto="${esc(concepto)}" aria-pressed="${d.concepto === concepto}">${esc(concepto)}</button>`).join("")}
        </div>
        <input class="adm-input" id="adm-pago-concepto" autocomplete="off" maxlength="120" required placeholder="Ej. Plan 2, semana del 09/11" value="${esc(d.concepto)}" data-adm-draft="pago" data-adm-key="concepto" />
      </div>
      <fieldset class="adm-field">
        <legend>Fecha</legend>
        <div class="adm-seg adm-seg--wrap">
          <button class="adm-seg-item ${d.fecha === hoy ? "is-on" : ""}" type="button" data-adm-fecha="${hoy}" aria-pressed="${d.fecha === hoy}">Hoy</button>
          <button class="adm-seg-item ${d.fecha === ayer ? "is-on" : ""}" type="button" data-adm-fecha="${ayer}" aria-pressed="${d.fecha === ayer}">Ayer</button>
          <label class="adm-sr-only" for="adm-pago-fecha">Otra fecha</label>
          <input class="adm-input adm-input--date" id="adm-pago-fecha" type="date" required value="${esc(d.fecha)}" data-adm-draft="pago" data-adm-key="fecha" />
        </div>
      </fieldset>
      <div class="adm-field">
        <span class="adm-field-label">Comprobante</span>
        ${PagoArchivoField()}
      </div>
      <label class="adm-switch" for="adm-pago-libro">
        <input id="adm-pago-libro" type="checkbox" ${d.pasadoAlLibro ? "checked" : ""} data-adm-draft="pago" data-adm-key="pasadoAlLibro" />
        <span class="adm-switch-ui" aria-hidden="true"></span>
        <span>Ya está en el Libro</span>
      </label>
      ${MsgRegion("pagos")}
      <div class="adm-sheet-foot">
        <button class="adm-btn adm-btn--primary adm-btn--block adm-btn--big" id="adm-pago-guardar" type="submit" aria-disabled="${ui.savingPago}">
          ${ico("check")} ${ui.savingPago ? (drafts.pagoArchivo && !drafts.pagoSubido ? "Subiendo…" : "Guardando…") : "Guardar pago"}
        </button>
      </div>
    </form>
  `);
}

/* ---------- Más ---------- */

function fotosResumen() {
  const conFoto = REAL_DOGS.filter((dog) => fotosPerros.de(dog.id)).length;
  return { conFoto, total: REAL_DOGS.length };
}

function MasTab() {
  if (ui.mas && MAS_VIEWS[ui.mas]) return MasView(ui.mas);
  const fotos = fotosResumen();
  const archivosNuevos = archivosData().nuevos.length;
  const datos = reviewDogs().length;
  const tiles = [
    { id: "fotos", sub: `${fotos.conFoto} de ${fotos.total}`, tone: fotos.conFoto < fotos.total ? "yellow" : "green" },
    { id: "carga", sub: `${weeklyLoad().weekTotal} salidas` },
    { id: "planes", sub: `${REAL_PLANS.length} planes` },
    { id: "archivos", sub: archivosNuevos ? `${archivosNuevos} nuevos` : `${archivosData().all.length}`, tone: archivosNuevos ? "blue" : "" },
    { id: "datos", sub: `${datos} perros`, tone: datos ? "yellow" : "" },
    { id: "clientes", sub: `${clientesResumen().totals.activo} activos` },
    { id: "indicadores", sub: "Con fuente" },
  ];
  return `
    <div class="adm-title-row">
      <h1 id="adm-title" tabindex="-1">Más</h1>
    </div>
    <div class="adm-tiles">
      ${tiles.map((tile) => `
        <button class="adm-tile" type="button" data-adm-mas="${tile.id}">
          <span class="adm-tile-icon">${ico(MAS_VIEWS[tile.id].icon, "adm-icon")}</span>
          <strong>${esc(MAS_VIEWS[tile.id].title)}</strong>
          <span class="${tile.tone ? `adm-chip adm-chip--${tile.tone}` : "adm-row-meta"}">${esc(tile.sub)}</span>
        </button>
      `).join("")}
      <button class="adm-tile" type="button" data-a11y-toggle aria-controls="a11y-panel">
        <span class="adm-tile-icon">${ico("eye", "adm-icon")}</span>
        <strong>Tema y movimiento</strong>
        <span class="adm-row-meta">Oscuro, calmo</span>
      </button>
      <button class="adm-tile" type="button" data-adm-copy>
        <span class="adm-tile-icon">${ico("copy", "adm-icon")}</span>
        <strong>Copiar resumen</strong>
        <span class="adm-row-meta">Para WhatsApp</span>
      </button>
    </div>
    <h2 class="adm-h2">Ver como</h2>
    <div class="adm-btn-row adm-btn-row--3">
      <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/coordinador" data-link>${ico("route")} Coordina</a>
      <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/supervisor" data-link>${ico("radar")} Supervisa</a>
      <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/paseador" data-link>${ico("pawPrint")} Pasea</a>
    </div>
    <div class="adm-btn-row">
      <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/login" data-link>${ico("key")} Cambiar mi PIN</a>
    </div>
    <div class="adm-foot">Datos al ${DATA_UPDATED}. ${Help(`<p>Perros: ${esc(BUSINESS_INFO.officialSources.dogs)}. Rutas: ${esc(BUSINESS_INFO.officialSources.routes)}. Plata: ${esc(BUSINESS_INFO.officialSources.money)}.</p><p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${LIBRO}.</p>`, "Fuentes")}</div>
  `;
}

function MasView(view) {
  const info = MAS_VIEWS[view];
  const body = {
    fotos: FotosView,
    carga: CargaView,
    planes: PlanesView,
    archivos: ArchivosView,
    datos: DatosView,
    clientes: ClientesView,
    indicadores: IndicadoresView,
  }[view]();
  return `
    <button class="adm-btn adm-btn--link adm-back" type="button" data-adm-mas-back>${ico("arrowLeft")} Más</button>
    <section class="adm-view" id="adm-${view === "planes" ? "precios" : view}" tabindex="-1" aria-labelledby="adm-title">
      <h1 id="adm-title" tabindex="-1">${esc(info.title)}</h1>
      ${body}
    </section>
  `;
}

function FotosView() {
  const { conFoto, total } = fotosResumen();
  const faltan = REAL_DOGS.filter((dog) => !fotosPerros.de(dog.id));
  const filtro = ui.fotosFiltro === "todos" || !faltan.length ? "todos" : "faltan";
  const dogs = (filtro === "faltan" ? faltan : REAL_DOGS).slice()
    .sort((a, b) => (a.status === "Activo" ? 0 : 1) - (b.status === "Activo" ? 0 : 1) || a.name.localeCompare(b.name));
  return `
    <div class="adm-photo-progress">
      <p><strong>${conFoto} de ${total}</strong> con foto</p>
      <span class="adm-progress" aria-hidden="true"><span style="--v:${(total ? conFoto / total : 0).toFixed(3)}"></span></span>
    </div>
    <p class="adm-row-meta">${ico("camera", "adm-icon-xs")} ${isOffline() ? "Sin señal: las fotos se suben cuando vuelva." : "Las fotos necesitan señal."}</p>
    <div class="adm-seg" role="group" aria-label="Qué perros mostrar">
      <button class="adm-seg-item ${filtro === "faltan" ? "is-on" : ""}" type="button" data-adm-fotos-filtro="faltan" aria-pressed="${filtro === "faltan"}" ${faltan.length ? "" : "disabled"}>Faltan (${faltan.length})</button>
      <button class="adm-seg-item ${filtro === "todos" ? "is-on" : ""}" type="button" data-adm-fotos-filtro="todos" aria-pressed="${filtro === "todos"}">Todos (${total})</button>
    </div>
    ${MsgRegion("fotos")}
    <ul class="adm-photo-grid">
      ${dogs.map((dog) => {
        const foto = fotoDe(dog.id);
        const src = foto?.miniatura || null;
        return `
          <li class="adm-photo ${dog.status !== "Activo" ? "is-inactive" : ""}" data-adm-foto-card="${esc(dog.id)}">
            ${src && foto?.archivoId
              ? `<button class="adm-photo-img" type="button" data-adm-foto-ver="${esc(foto.archivoId)}" aria-label="Ver la foto grande de ${esc(dog.name)}"><img src="${esc(src)}" alt="" loading="lazy" /></button>`
              : src
                ? `<span class="adm-photo-img"><img src="${esc(src)}" alt="Foto de ${esc(dog.name)}" loading="lazy" /></span>`
                : `<span class="adm-photo-img adm-photo-img--empty" aria-hidden="true">${esc(initial(dog.name))}</span>`}
            <strong class="adm-photo-name">${esc(dog.name)}</strong>
            ${dog.status !== "Activo" ? `<span class="adm-chip adm-chip--gray">${esc(dog.status)}</span>` : SafetyChips(dog)}
            ${FotoButton(dog.id, dog.name, { change: Boolean(src) })}
          </li>
        `;
      }).join("")}
    </ul>
    ${!dogs.length ? `<p class="adm-empty">Todos tienen foto.</p>` : ""}
  `;
}

function CargaView() {
  const load = weeklyLoad();
  const busiestText = load.busiest.length ? listJoin(load.busiest) : "Sin datos";
  return `
    <span class="adm-chips"><span class="adm-chip adm-chip--blue">Más carga: ${esc(busiestText)} (${load.maxTotal})</span><span class="adm-chip adm-chip--gray">${load.weekTotal} salidas</span></span>
    <div class="adm-load-legend" aria-hidden="true"><span class="adm-dot"></span> Mañana <span class="adm-dot adm-dot--tarde"></span> Tarde</div>
    <ul class="adm-load" aria-label="Perros por día y turno">
      ${load.rows.map((row) => {
        const isBusiest = load.busiest.includes(row.day);
        return `
          <li class="adm-load-row ${isBusiest ? "is-busiest" : ""}">
            <strong class="adm-load-day">${SHORT_DAYS[row.day]}<span class="adm-sr-only"> (${row.day})</span></strong>
            <span class="adm-load-bars">
              <span class="adm-bar-cell"><span class="adm-bar" style="--v:${(row.morning / load.maxShift).toFixed(3)}" aria-hidden="true"></span><span class="adm-bar-value"><span class="adm-sr-only">Mañana: </span>${row.morning}</span></span>
              <span class="adm-bar-cell"><span class="adm-bar adm-bar--tarde" style="--v:${(row.afternoon / load.maxShift).toFixed(3)}" aria-hidden="true"></span><span class="adm-bar-value"><span class="adm-sr-only">Tarde: </span>${row.afternoon}</span></span>
            </span>
            <strong class="adm-load-total"><span class="adm-sr-only">Total: </span>${row.total || "—"}</strong>
          </li>
        `;
      }).join("")}
    </ul>
    ${Help(`<p>Perros por día y turno, de BASE RUTAS (${DATA_UPDATED}). Solo perros activos.</p>
      <p>${listJoin(load.twoShifts.map((dog) => esc(dog.name)))} ${load.twoShifts.length === 1 ? "sale" : "salen"} en los dos turnos: cuentan dos veces en el total.</p>
      <p>Mañana: ruta ${SHIFTS.manana.route} (${SHIFTS.manana.from} a ${SHIFTS.manana.to}), supervisa ${SHIFTS.manana.supervisor}. Tarde: rutas ${SHIFTS.tarde.routes.join(" y ")} (${SHIFTS.tarde.from} a ${SHIFTS.tarde.to}), supervisa ${SHIFTS.tarde.supervisor}.</p>
      <p>Máximo diario histórico: ${esc(BUSINESS_FACTS.find((f) => /máximo/i.test(f.label))?.value || PENDIENTE)} perros.</p>`, "Cómo se cuenta")}
  `;
}

function PlanesView() {
  return `
    <ul class="adm-plans">
      ${REAL_PLANS.map((plan) => `
        <li class="adm-card adm-plan">
          <div class="adm-plan-head"><strong>${plan.name}</strong><span class="adm-chip adm-chip--gray">${plan.walks} paseos/sem</span></div>
          <dl class="adm-plan-prices">
            ${SIZES.map((size) => `<div><dt>${size}</dt><dd>${formatPeso(plan.prices[size])}</dd></div>`).join("")}
          </dl>
        </li>
      `).join("")}
      <li class="adm-card adm-plan">
        <div class="adm-plan-head"><strong>Paseo suelto</strong><span class="adm-chip adm-chip--gray">Individual / grupo</span></div>
        <dl class="adm-plan-prices">
          ${SIZES.map((size) => `<div><dt>${size}</dt><dd>${formatPeso(REAL_SINGLE_WALK[size].individual)}<small>${formatPeso(REAL_SINGLE_WALK[size].grupo)}</small></dd></div>`).join("")}
        </dl>
      </li>
    </ul>
    <h2 class="adm-h2">Varios perros</h2>
    <div class="adm-chips adm-chips--wrap">
      ${MULTI_DOG_DISCOUNTS.map((item) => `<span class="adm-chip adm-chip--green">${item.dogs} perros: −${item.discount}</span>`).join("")}
    </div>
    ${Help(`<p>Precio semanal por perro según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p><p>En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${PENDIENTE.toLowerCase()}.</p>`, "Fuente de los precios")}
  `;
}

/* ---------- Archivos recibidos (carnets, comprobantes, documentos) ---------- */

const UBICACIONES = {
  drive: "Drive",
  vercel: "Vercel (provisorio)",
  local: "Servidor de prueba",
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
  if (archivo.clienteId) {
    const cliente = registros.cached("clientes", liveOpts("clientes")).find((item) => item.id === archivo.clienteId);
    links.push(`Cliente: ${cliente?.nombre || archivo.clienteId}`);
  }
  if (archivo.pedidoId) {
    const pedido = registros.cached("pedidos", liveOpts("pedidos")).find((item) => item.id === archivo.pedidoId);
    const estado = pedido ? { nuevo: "nuevo", "en-curso": "en curso", resuelto: "resuelto" }[pedido.estado || "nuevo"] || pedido.estado : "";
    links.push(pedido
      ? `Pedido: ${pedido.titulo || pedido.tipo || "sin título"}${estado ? ` (${estado})` : ""}`
      : "Pedido de la web");
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
  const tipo = ARCHIVO_TIPOS[archivo.tipo] || { label: archivo.tipo || "Archivo", tone: "gray" };
  const links = archivoLinks(archivo);
  const who = archivo.creadoPor === "web" ? "Web" : archivo.creadoPorNombre || nameOf(archivo.creadoPor) || "";
  const when = archivo.creadoEn ? dateAR(archivo.creadoEn) : ymdToAR(archivo.fecha);
  const isNew = Date.now() - Date.parse(archivo.creadoEn || "") < DAY_MS;
  const label = `${tipo.label}${archivo.perroNombre ? ` de ${archivo.perroNombre}` : ""}`;
  const driveUrl = /^https:\/\//i.test(archivo.driveUrl || "") ? archivo.driveUrl : "";
  const dog = dogById(archivo.perroId, archivo.perroNombre);
  return `
    <li class="adm-row adm-archivo">
      ${archivo.perroId || archivo.perroNombre ? DogAvatar(dog?.id || archivo.perroId, archivo.perroNombre || "?", "md") : `<span class="adm-avatar adm-avatar--md adm-avatar--empty" aria-hidden="true">${ico(archivo.mime === "application/pdf" ? "fileText" : "fileUp")}</span>`}
      <div class="adm-row-main">
        <strong class="adm-row-title">${esc(archivo.perroNombre || pagoDeArchivo(archivo)?.concepto || archivo.nombreOriginal || archivo.nombreArchivo || tipo.label)}</strong>
        <span class="adm-chips">
          <span class="adm-chip adm-chip--${tipo.tone}">${esc(tipo.label)}</span>
          ${isNew ? `<span class="adm-chip adm-chip--blue">Nuevo</span>` : ""}
          ${archivo.ubicacion && archivo.ubicacion !== "drive" ? `<span class="adm-chip adm-chip--gray">${esc(UBICACIONES[archivo.ubicacion] || archivo.ubicacion)}</span>` : ""}
        </span>
        <span class="adm-row-meta">${esc([who, when, fileSize(archivo.tamano), ...links].filter(Boolean).join(" · "))}${driveUrl ? ` · <a class="adm-link" href="${esc(driveUrl)}" target="_blank" rel="noopener noreferrer">Drive<span class="adm-sr-only"> (se abre en otra pestaña)</span></a>` : ""}</span>
      </div>
      <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-archivo-abrir="${esc(archivo.id)}" data-adm-area="archivos" aria-label="Abrir ${esc(label)}">${ico("eye")} Abrir</button>
    </li>
  `;
}

function ArchivosView() {
  const data = archivosData();
  const shown = data.filtered.slice(0, ARCHIVOS_SHOWN);
  const tipoText = data.tipo === "todos" ? "" : ` de tipo “${ARCHIVO_TIPOS[data.tipo].label.toLowerCase()}”`;
  return `
    ${isOffline() ? `<p class="adm-warn-line">${ico("alertCircle")} <span>Sin señal: para abrir archivos hace falta señal.</span></p>` : ""}
    ${data.enVercel || data.enPrueba ? `<div class="adm-warn-line">${ico("alertCircle")} <span>${data.enVercel + data.enPrueba} fuera de Drive.</span> ${Help(`<p>${listJoin([
      data.enVercel ? `${data.enVercel === 1 ? "1 archivo está guardado" : `${data.enVercel} archivos están guardados`} en Vercel (provisorio)` : "",
      data.enPrueba ? `${data.enPrueba === 1 ? "1 archivo está" : `${data.enPrueba} archivos están`} en el servidor de prueba` : "",
    ].filter(Boolean))}. Cuando se conecte la planilla, los nuevos van a tu Google Drive; los que ya llegaron quedan donde están.</p>`, "Dónde están los archivos")}</div>` : ""}
    ${data.all.length ? `
      <div class="adm-seg adm-seg--wrap" role="group" aria-label="Tipo de archivo">
        <button class="adm-seg-item ${data.tipo === "todos" ? "is-on" : ""}" type="button" data-adm-archivos-tipo="todos" aria-pressed="${data.tipo === "todos"}">Todos (${data.all.length})</button>
        ${Object.entries(ARCHIVO_TIPOS).filter(([key]) => data.counts[key]).map(([key, item]) => `<button class="adm-seg-item ${data.tipo === key ? "is-on" : ""}" type="button" data-adm-archivos-tipo="${esc(key)}" aria-pressed="${data.tipo === key}">${esc(item.label)} (${data.counts[key]})</button>`).join("")}
      </div>
    ` : ""}
    ${MsgRegion("archivos")}
    ${shown.length ? `
      <ul class="adm-list" aria-label="Archivos${esc(tipoText)}">${shown.map(ArchivoRow).join("")}</ul>
      ${data.filtered.length > shown.length ? `<p class="adm-row-meta">Últimos ${shown.length} de ${data.filtered.length}.</p>` : ""}
    ` : `<p class="adm-empty">${data.all.length ? "No hay archivos de este tipo." : "Todavía no llegó ningún archivo."}</p>`}
    ${Help(`<p>Carnets de vacunas, comprobantes y documentos que manda la gente desde el formulario de la web o que sube el equipo. Los comprobantes de pago los abrís solo vos.</p>`, "Qué hay acá")}
  `;
}

function DatosView() {
  const dogs = reviewDogs().sort((a, b) => (a.status === "Activo") - (b.status === "Activo"));
  return `
    <ul class="adm-list">
      ${dogs.map((dog) => `
        <li class="adm-row">
          ${DogAvatar(dog.id, dog.name, "md")}
          <div class="adm-row-main">
            <span class="adm-chips"><strong class="adm-row-title">${esc(dog.name)}</strong><span class="adm-chip ${dog.status === "Activo" ? "adm-chip--gray" : "adm-chip--yellow"}">${esc(dog.status)}</span></span>
            <span>${esc(dog.review || PENDIENTE)}</span>
            <span class="adm-row-meta">${esc(dog.id)} · ${esc(dog.plan)}</span>
          </div>
        </li>
      `).join("")}
    </ul>
    ${Help(`<p>Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${esc(BUSINESS_INFO.officialSources.dogs)}).</p>`, "De dónde salen")}
  `;
}

/* ---------- Clientes (resumen de solo lectura) ---------- */

const CLIENT_STATES = [["activo", "Activos"], ["pausa", "Pausa"], ["baja", "Baja"]];

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

function ClientesView() {
  const data = clientesResumen();
  const withOther = data.totals.otro > 0;
  if (!data.total) return `<p class="adm-empty">El coordinador todavía no cargó clientes.</p>`;
  return `
    <span class="adm-chips">
      <span class="adm-chip adm-chip--green">${data.totals.activo} activos</span>
      <span class="adm-chip adm-chip--yellow">${data.totals.pausa} en pausa</span>
      <span class="adm-chip adm-chip--gray">${data.totals.baja} de baja</span>
    </span>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <caption class="adm-sr-only">Clientes por barrio y estado</caption>
        <thead>
          <tr><th scope="col">Barrio</th>${CLIENT_STATES.map(([, label]) => `<th scope="col">${label}</th>`).join("")}${withOther ? `<th scope="col">Otro</th>` : ""}</tr>
        </thead>
        <tbody>
          ${data.rows.map((row) => `
            <tr><th scope="row">${esc(row.barrio)}</th>${CLIENT_STATES.map(([key]) => `<td>${row[key]}</td>`).join("")}${withOther ? `<td>${row.otro}</td>` : ""}</tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    ${Help("<p>Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>", "Qué es")}
  `;
}

function kindTone(kind) {
  if (/meta/i.test(kind)) return "blue";
  if (/hist/i.test(kind)) return "gray";
  if (/calc/i.test(kind)) return "yellow";
  return "green";
}

function IndicadoresView() {
  const active = activeDogs();
  const load = weeklyLoad();
  const unevaluated = active.filter((dog) => dog.category === "SIN EVALUAR").length;
  const computed = [
    { label: "Perros con ruta activa", value: String(active.length), source: `Calculado de BASE RUTAS, ${DATA_UPDATED}`, kind: "Calculado" },
    { label: "Salidas por semana", value: String(load.weekTotal), source: `Calculado de BASE RUTAS, ${DATA_UPDATED}`, kind: "Calculado" },
    { label: "Perros evaluados", value: `${active.length - unevaluated} de ${active.length}`, source: "Registro maestro, 14/08/2026", kind: "Dato" },
  ];
  const facts = [...BUSINESS_FACTS, ...computed];
  return `
    <ul class="adm-facts">
      ${facts.map((fact) => `
        <li class="adm-fact">
          <strong class="adm-fact-value">${esc(fact.value)}</strong>
          <span class="adm-fact-label">${esc(fact.label)}</span>
          <span class="adm-chip adm-chip--${kindTone(fact.kind)}" title="Fuente: ${esc(fact.source)}">${esc(fact.kind)}</span>
          <span class="adm-row-meta">${esc(fact.source)}</span>
        </li>
      `).join("")}
    </ul>
    ${Fold("categorias", { title: "Categorías de conducta", iconName: "help" }, `
      <dl class="adm-categories">
        ${Object.entries(CATEGORIES).map(([name, text]) => `<div><dt><span class="adm-cat adm-cat--${name.toLowerCase().replace(/\s+/g, "-")}">${name}</span></dt><dd>${esc(text)}</dd></div>`).join("")}
      </dl>
    `)}
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

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "auto" });
}

function focusTitle() {
  requestAnimationFrame(() => (document.getElementById("adm-title") || document.getElementById("adm-main"))?.focus({ preventScroll: true }));
}

function setTab(tab, mas = null) {
  ui.tab = tab;
  ui.mas = tab === "mas" ? mas : null;
  ui.sheet = null;
  storeTab();
}

// Lleva al destino de un botón "Ver": cambia de pestaña si hace falta, abre el plegable y lo enfoca.
function goTo(targetId) {
  const [tab, mas = null] = TARGETS[targetId] || ["inicio"];
  if (ui.tab !== tab || ui.mas !== mas) {
    setTab(tab, mas);
    render();
  }
  const target = document.getElementById(targetId) || document.getElementById("adm-main");
  if (!target) return;
  if (target.tagName === "DETAILS" && !target.open) {
    target.open = true;
    if (target.dataset.admFold) rememberFold(target.dataset.admFold, true);
  }
  const calm = document.documentElement.dataset.motion === "calm";
  target.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  const focusable = target.tagName === "DETAILS" ? target.querySelector("summary") : target;
  focusable?.focus({ preventScroll: true });
}

function resetSession() {
  ui.credential = null;
  ui.users = null;
  ui.usersError = "";
  ui.sheet = null;
  ui.undo = null;
  clearTimeout(undoTimer);
  // Al volver a entrar se piden de nuevo los datos (y no queda un pago a medio escribir).
  ui.liveDay = null;
  ui.adminLoaded = false;
  ui.pagosMes = null;
  ui.archivosTipo = "todos";
  drafts.pago = emptyPago();
  drafts.pagoArchivo = null;
  drafts.pagoSubido = null;
  drafts.crear = emptyCrear();
}

// Clicks que tienen que cortar la cadena (por ejemplo, antes de la navegación por data-link).
function handleAdminClick(event) {
  if (event.target.closest("[data-admin-logout]")) {
    resetSession();
    navigate("/salir");
    return true;
  }
  // Ir a otro panel con una hoja abierta: se cierra la hoja.
  if (event.target.closest(".adm-shell [data-link]")) ui.sheet = null;
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

function openSheet(kind, opener) {
  ui.sheet = kind;
  ui.sheetReturn = opener?.id ? `#${CSS.escape(opener.id)}` : kind === "pago" ? "#adm-pago-abrir" : "#adm-crear-abrir";
  if (kind === "crear") {
    ui.credential = null;
    if (!drafts.crear.pin) drafts.crear.pin = randomPin();
    setMsg("users", "");
  }
  if (kind === "pago") setMsg("pagos", "");
  // La animación de entrada va solo al abrir (no en cada redibujo).
  ui.sheetEnter = true;
  render();
  ui.sheetEnter = false;
  focusLater(kind === "pago" ? "#adm-pago-monto" : "#adm-crear-nombre");
}

function closeSheet() {
  const back = ui.sheetReturn;
  ui.sheet = null;
  render();
  if (back) focusLater(back);
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
    let field = "";
    if (nombre.length < 2) [problem, field] = ["Escribí el nombre.", "#adm-crear-nombre"];
    else if (!/^[a-z][a-z0-9._-]{2,30}$/.test(usuario)) [problem, field] = ["Usuario: 3 a 31 letras o números, sin espacios, empezando con letra.", "#adm-crear-usuario"];
    else if (ui.users?.some((user) => user.usuario === usuario)) [problem, field] = [`Ya existe “${usuario}”. Elegí otro usuario.`, "#adm-crear-usuario"];
    else if (!ROLE_LABELS[d.rol]) problem = "Elegí un rol.";
    else [problem, field] = [pinProblem(pin), "#adm-crear-pin"];
    if (problem) {
      setMsg("users", problem, true);
      rerender();
      if (field) focusLater(field);
      return;
    }
    setBusy(form, true);
    try {
      const saved = await usuarios.save({ nombre, usuario, rol: d.rol, pin, crear: true });
      ui.credential = { tipo: "alta", usuario: saved.usuario, nombre: saved.nombre, pin };
      drafts.crear = emptyCrear();
      ui.sheet = null;
      setMsg("users", `Listo: se creó ${saved.usuario}.`);
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
      setMsg("users", reactivar ? `Listo: ${user.nombre} quedó activo.` : `Listo: ${user.nombre} tiene PIN nuevo.`);
      ui.busy = false;
      await loadUsers();
      scrollTop();
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
  const medio = (d.medioSel === "Otro" ? d.medioOtro : d.medioSel || "").trim();
  const monto = parseMonto(d.monto);
  const file = drafts.pagoArchivo;
  let problem = "";
  let field = "";
  if (!Number.isFinite(monto) || monto <= 0) [problem, field] = ["Escribí el monto (solo números).", "#adm-pago-monto"];
  else if (concepto.length < 2) [problem, field] = ["Elegí o escribí el concepto.", "#adm-pago-concepto"];
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(d.fecha)) [problem, field] = ["Elegí la fecha.", "#adm-pago-fecha"];
  else if (file && !drafts.pagoSubido && isOffline()) {
    [problem, field] = ["Sin señal no se sube el comprobante. Tocá “Quitar” y adjuntalo después.", "#adm-pago-archivo-quitar"];
  }
  if (problem) {
    setMsg("pagos", problem, true);
    rerender();
    if (field) focusLater(field);
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
      setMsg("pagos", `No se pudo subir el comprobante: ${error.message || "error del servidor."} El pago no se guardó: probá de nuevo o tocá “Quitar”.`, true);
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
    ui.sheet = null;
    setMsg("pagos", saved.pendiente
      ? "Se enviará cuando haya señal."
      : `Listo: ${formatPeso(monto)} guardado${comprobanteId ? " con comprobante" : ""}${d.pasadoAlLibro ? "" : ". Falta pasarlo al Libro"}.`);
    focusLater("#adm-pago-abrir");
  } catch (error) {
    setMsg("pagos", `${error.message || "No se pudo guardar el pago."}${comprobanteId ? " El comprobante ya se subió: no se sube otra vez." : ""}`, true);
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
    setMsg("pagos", "Solo fotos (JPG, PNG, WEBP) o PDF.", true);
    rerender();
    return;
  }
  if (file.type === "application/pdf" && file.size > 3.5 * 1024 * 1024) {
    setMsg("pagos", "El PDF pesa mucho (máximo 3,5 MB). Probá con una captura.", true);
    rerender();
    return;
  }
  drafts.pagoArchivo = file;
  drafts.pagoSubido = null;
  setMsg("pagos", "Comprobante listo. Se sube al guardar.");
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
  if (ui.busy) problem = "Esperá a que termine lo que se está guardando.";
  else if (!ARCHIVO_MIME.test(file.type)) problem = "Solo fotos (JPG, PNG, WEBP) o PDF.";
  else if (isOffline()) problem = "Sin señal no se sube el comprobante. Probá cuando vuelva.";
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
      ? "Comprobante subido. El cambio se enviará cuando haya señal."
      : `Listo: ${what} tiene comprobante.`);
  } catch (error) {
    setMsg("pagos", `${registro ? "El comprobante se subió pero no se pudo vincular al pago" : "No se pudo subir el comprobante"}: ${error.message || "error del servidor."}`, true);
  } finally {
    ui.busy = false;
    rerender();
    focusLater(registro ? `.adm-pago [data-adm-archivo-abrir="${CSS.escape(registro.id)}"]` : `[data-adm-pago-adjuntar="${CSS.escape(id)}"]`);
  }
}

// Saca o elige la foto de un perro y la sube (la grande va a archivos, la miniatura a "fotos").
async function subirFoto(input) {
  const perroId = input.dataset.admFoto;
  const nombre = input.dataset.admFotoNombre || perroId;
  const file = input.files?.[0];
  input.value = "";
  if (!file || !perroId) return;
  // El mensaje va a Fotos si se está ahí; si no, a la zona del día.
  const area = ui.tab === "mas" && ui.mas === "fotos" ? "fotos" : "live";
  let problem = "";
  if (isOffline()) problem = "Sin señal: la foto no se pudo subir. Probá cuando vuelva.";
  else if (!/^image\//.test(file.type)) problem = "Eso no es una foto.";
  if (problem) {
    setMsg(area, problem, true);
    rerender();
    return;
  }
  ui.fotosSubiendo.add(perroId);
  setMsg(area, `Subiendo la foto de ${nombre}…`);
  rerender();
  try {
    const saved = await fotosPerros.subir(perroId, nombre, file);
    setMsg(area, saved?.pendiente ? `Foto de ${nombre} subida. Se termina de guardar cuando haya señal.` : `Listo: foto de ${nombre}.`);
  } catch (error) {
    setMsg(area, `No se pudo subir la foto de ${nombre}: ${error.message || "error del servidor."}`, true);
  } finally {
    ui.fotosSubiendo.delete(perroId);
    rerender();
    focusLater(`[data-adm-foto="${CSS.escape(perroId)}"]`);
  }
}

// Abre un archivo con la sesión (pestaña nueva). Los errores van a la región de la sección.
function abrirArchivo(id, areaName) {
  const area = ui.msgs[areaName] !== undefined ? areaName : "archivos";
  if (isOffline()) {
    setMsg(area, "Sin señal no se puede abrir. Probá cuando vuelva.", true);
    rerender();
    return;
  }
  archivos.abrir(id).catch((error) => {
    const text = error.status === 403
      ? "Tu usuario no puede abrir este archivo."
      : error.status === 404
        ? "No se encontró el archivo. Puede que lo hayan borrado de Drive."
        : `No se pudo abrir: ${error.message || "error del servidor."}`;
    setMsg(area, text, true);
    rerender();
  });
}

async function setPagoLibro(id, value, withUndo = true) {
  const pago = registros.cached("pagos", liveOpts("pagos")).find((item) => item.id === id);
  if (!pago || ui.busy) return;
  ui.busy = true;
  try {
    const saved = await registros.save("pagos", { id, fecha: pago.fecha, pasadoAlLibro: value });
    if (saved.pendiente) setMsg("pagos", "Se enviará cuando haya señal.");
    if (withUndo) {
      offerUndo(value ? "Marcado: en el Libro." : "Desmarcado del Libro.", () => setPagoLibro(id, !value, false));
    }
  } catch (error) {
    setMsg("pagos", error.message || "No se pudo cambiar la marca.", true);
  } finally {
    ui.busy = false;
    rerender();
    focusLater(`[data-adm-pago-libro="${CSS.escape(id)}"]`);
  }
}

async function runUserAction(work, okMessage, errorMessage) {
  if (ui.busy) return false;
  ui.busy = true;
  try {
    await work();
    if (okMessage) setMsg("users", okMessage);
    ui.busy = false;
    await loadUsers();
    return true;
  } catch (error) {
    setMsg("users", error.message || errorMessage, true);
    ui.busy = false;
    rerender();
    return false;
  }
}

function changeRole(usuario, rol, withUndo = true) {
  const user = ui.users?.find((item) => item.usuario === usuario);
  if (!user || rol === user.rol) {
    ui.roleFor = null;
    render();
    return;
  }
  const before = user.rol;
  ui.roleFor = null;
  runUserAction(() => usuarios.save({ usuario, rol }), "", "No se pudo cambiar el rol.").then((ok) => {
    if (!ok) return;
    if (withUndo) offerUndo(`${user.nombre}: ${roleShort(rol)}.`, () => changeRole(usuario, before, false));
    else setMsg("users", `${user.nombre} volvió a ${roleShort(before)}.`);
    rerender();
    focusLater(`[data-adm-rolefor="${CSS.escape(usuario)}"]`);
  });
}

function handleUsersClick(event) {
  if (event.target.closest("[data-adm-users-refresh]")) {
    ui.usersError = "";
    loadUsers();
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

  const roleFor = event.target.closest("[data-adm-rolefor]");
  if (roleFor) {
    const usuario = roleFor.dataset.admRolefor;
    ui.roleFor = ui.roleFor === usuario ? null : usuario;
    ui.resetFor = null;
    ui.confirmOff = null;
    render();
    focusLater(ui.roleFor ? `[data-adm-role-set="${CSS.escape(usuario)}"].is-on` : `[data-adm-rolefor="${CSS.escape(usuario)}"]`);
    return true;
  }

  const roleSet = event.target.closest("[data-adm-role-set]");
  if (roleSet) {
    changeRole(roleSet.dataset.admRoleSet, roleSet.dataset.admRol);
    return true;
  }

  const reset = event.target.closest("[data-adm-reset]");
  if (reset) {
    const usuario = reset.dataset.admReset;
    ui.resetFor = ui.resetFor === usuario ? null : usuario;
    ui.confirmOff = null;
    ui.roleFor = null;
    drafts.reset.pin = ui.resetFor ? randomPin() : "";
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
    ui.roleFor = null;
    render();
    focusLater("#adm-confirm");
    return true;
  }

  if (event.target.closest("[data-adm-off-cancel]")) {
    const usuario = ui.confirmOff || "";
    ui.confirmOff = null;
    render();
    focusLater(`[data-adm-off="${CSS.escape(usuario)}"]`);
    announce("Cancelado.");
    return true;
  }

  const offConfirm = event.target.closest("[data-adm-off-confirm]");
  if (offConfirm) {
    const usuario = offConfirm.dataset.admOffConfirm;
    const user = ui.users?.find((item) => item.usuario === usuario);
    ui.confirmOff = null;
    runUserAction(() => usuarios.deactivate(usuario), `Listo: ${user?.nombre || usuario} ya no puede entrar.`, "No se pudo desactivar.");
    return true;
  }

  if (event.target.closest("[data-adm-cred-copy]")) {
    if (ui.credential) {
      copyText(credentialText(ui.credential)).then((ok) => {
        announce(ok ? "Mensaje copiado." : "No se pudo copiar. Abrí “Ver el mensaje” y copialo a mano.");
      });
    }
    return true;
  }

  if (event.target.closest("[data-adm-cred-hide]")) {
    ui.credential = null;
    render();
    focusLater("#adm-crear-abrir");
    announce("Listo. El PIN ya no se muestra.");
    return true;
  }

  return false;
}

function handleDraftInput(event) {
  if (!event.target.closest?.(".adm-shell")) return;
  if (event.target.matches?.("[data-adm-foto]")) {
    if (event.type === "change") subirFoto(event.target);
    return;
  }
  if (event.target.matches?.("[data-adm-pago-archivo], [data-adm-pago-adjuntar]")) {
    if (event.type !== "change") return;
    if (event.target.dataset.admPagoAdjuntar !== undefined) adjuntarComprobante(event.target);
    else choosePagoArchivo(event.target);
    return;
  }
  const field = event.target.closest?.("[data-adm-draft]");
  if (!field) return;
  const form = field.dataset.admDraft;
  const key = field.dataset.admKey;
  if (field.type === "radio" && !field.checked) return;
  const value = field.type === "checkbox" ? field.checked : field.value;
  drafts[form][key] = value;

  if (form === "crear" && key === "nombre" && !drafts.crear.usuarioTocado) {
    drafts.crear.usuario = suggestUsuario(value);
    const input = document.getElementById("adm-crear-usuario");
    if (input) input.value = drafts.crear.usuario;
  }
  if (form === "crear" && key === "usuario") drafts.crear.usuarioTocado = value.trim() !== "";
  if (form === "crear" && key === "rol") {
    document.querySelectorAll('.adm-role-grid .adm-choice').forEach((label) => {
      label.classList.toggle("is-on", label.querySelector("input")?.checked === true);
    });
    const hint = document.querySelector("[data-adm-role-hint]");
    if (hint) hint.textContent = ROLE_CHOICES.find((item) => item.rol === value)?.line || "";
  }
  if (form === "pago" && key === "monto") {
    const preview = document.querySelector("[data-adm-monto-preview]");
    const monto = parseMonto(value);
    if (preview) preview.textContent = Number.isFinite(monto) && monto > 0 ? formatPeso(monto) : "Solo números";
  }
  // Elegir un medio, la fecha o el concepto cambia qué botón queda marcado: se redibuja.
  if (form === "pago" && (key === "medioSel" || (key === "fecha" && event.type === "change") || (key === "concepto" && event.type === "change"))) {
    rerender();
    if (key === "medioSel" && value === "Otro") focusLater("#adm-pago-medio-otro");
  }
}

function toggleDone(id, label) {
  const done = readDone();
  const isDone = done.includes(id);
  writeStored(DONE_KEY, isDone ? done.filter((item) => item !== id) : [...done, id]);
  if (!isDone) {
    offerUndo(`Listo: ${label}.`, () => {
      writeStored(DONE_KEY, readDone().filter((item) => item !== id));
    });
  } else {
    ui.undo = null;
  }
  render();
  document.querySelector(`.adm-prio [data-adm-done="${CSS.escape(id)}"]`)?.focus({ preventScroll: true });
  announce(isDone ? "Prioridad desmarcada." : "Hecho. Cambió el próximo paso.");
}

// Acciones de la página. Corre después del control de accesibilidad.
function handleAdminActionClick(event) {
  if (!event.target.closest(".adm-shell")) return false;

  // Tocar el fondo oscuro cierra la hoja.
  const backdrop = event.target.closest("[data-adm-sheet-backdrop]");
  if (backdrop && event.target === backdrop) {
    closeSheet();
    return true;
  }
  if (event.target.closest("[data-adm-sheet-close]")) {
    closeSheet();
    return true;
  }
  const sheetOpen = event.target.closest("[data-adm-sheet]");
  if (sheetOpen) {
    openSheet(sheetOpen.dataset.admSheet, sheetOpen);
    return true;
  }

  const tab = event.target.closest("[data-adm-tab]");
  if (tab) {
    const same = ui.tab === tab.dataset.admTab;
    setTab(tab.dataset.admTab);
    render();
    scrollTop();
    if (!same) focusTitle();
    else document.querySelector(`[data-adm-tab="${tab.dataset.admTab}"]`)?.focus({ preventScroll: true });
    return true;
  }

  const mas = event.target.closest("[data-adm-mas]");
  if (mas) {
    setTab("mas", mas.dataset.admMas);
    render();
    scrollTop();
    focusTitle();
    return true;
  }

  if (event.target.closest("[data-adm-mas-back]")) {
    const from = ui.mas;
    setTab("mas");
    render();
    scrollTop();
    focusLater(`[data-adm-mas="${from}"]`);
    return true;
  }

  const undo = event.target.closest("[data-adm-undo]");
  if (undo) {
    const action = ui.undo;
    ui.undo = null;
    clearTimeout(undoTimer);
    action?.run?.();
    render();
    announce("Deshecho.");
    return true;
  }

  if (event.target.closest("[data-adm-refresh]")) {
    refreshLive(true);
    refreshAdminData();
    if (ui.tab === "equipo") loadUsers();
    announce("Actualizando…");
    return true;
  }

  const doneButton = event.target.closest("[data-adm-done]");
  if (doneButton) {
    toggleDone(doneButton.dataset.admDone, doneButton.dataset.admDoneLabel || "prioridad");
    return true;
  }

  const goButton = event.target.closest("[data-adm-goto]");
  if (goButton) {
    event.preventDefault();
    goTo(goButton.dataset.admGoto);
    return true;
  }

  const abrir = event.target.closest("[data-adm-archivo-abrir]");
  if (abrir) {
    abrirArchivo(abrir.dataset.admArchivoAbrir, abrir.dataset.admArea);
    return true;
  }

  const fotoVer = event.target.closest("[data-adm-foto-ver]");
  if (fotoVer) {
    abrirArchivo(fotoVer.dataset.admFotoVer, "fotos");
    return true;
  }

  const filtro = event.target.closest("[data-adm-fotos-filtro]");
  if (filtro) {
    ui.fotosFiltro = filtro.dataset.admFotosFiltro;
    rerender();
    return true;
  }

  const libro = event.target.closest("[data-adm-pago-libro]");
  if (libro) {
    const pago = registros.cached("pagos", liveOpts("pagos")).find((item) => item.id === libro.dataset.admPagoLibro);
    if (pago) setPagoLibro(pago.id, !pago.pasadoAlLibro);
    return true;
  }

  const mes = event.target.closest("[data-adm-pagos-mes]");
  if (mes) {
    ui.pagosMes = mes.dataset.admPagosMes;
    ui.pagosTodos = false;
    rerender();
    announce(`Pagos de ${ui.pagosMes === "todos" ? "todos los meses" : monthLabel(ui.pagosMes).toLowerCase()}.`);
    return true;
  }

  if (event.target.closest("[data-adm-pagos-todos]")) {
    ui.pagosTodos = true;
    rerender();
    return true;
  }

  const tipo = event.target.closest("[data-adm-archivos-tipo]");
  if (tipo) {
    ui.archivosTipo = tipo.dataset.admArchivosTipo;
    rerender();
    return true;
  }

  const fecha = event.target.closest("[data-adm-fecha]");
  if (fecha) {
    drafts.pago.fecha = fecha.dataset.admFecha;
    rerender();
    return true;
  }

  const concepto = event.target.closest("[data-adm-concepto]");
  if (concepto) {
    drafts.pago.concepto = concepto.dataset.admConcepto;
    rerender();
    return true;
  }

  if (event.target.closest("[data-adm-pago-quitar]")) {
    drafts.pagoArchivo = null;
    drafts.pagoSubido = null;
    setMsg("pagos", "Comprobante quitado.");
    rerender();
    focusLater("#adm-pago-foto");
    return true;
  }

  if (handleUsersClick(event)) return true;

  if (event.target.closest("[data-adm-copy]")) {
    copyText(summaryText()).then((ok) => {
      announce(ok ? "Resumen copiado." : "No se pudo copiar. Probá de nuevo.");
      if (ok) offerUndo("Resumen copiado.", null);
      rerender();
    });
    return true;
  }

  return false;
}

function handleToggle(event) {
  const el = event.target;
  if (!el.closest?.(".adm-shell")) return;
  const key = el.dataset?.admFold || el.dataset?.admFoldInner;
  if (key) rememberFold(key, el.open);
}

function handleKeydown(event) {
  if (event.key !== "Escape" || !ui.sheet || !isAdminPage()) return;
  if (document.querySelector("#a11y-panel:not([hidden])")) return;
  event.preventDefault();
  closeSheet();
}

export function registerAdminEvents() {
  clickHandlers.push(handleAdminClick);
  actionClickHandlers.push(handleAdminActionClick);
  // El evento toggle no burbujea: se escucha en captura.
  document.addEventListener("toggle", handleToggle, true);
  document.addEventListener("submit", handleUsersSubmit);
  document.addEventListener("input", handleDraftInput);
  document.addEventListener("change", handleDraftInput);
  document.addEventListener("keydown", handleKeydown);
  // Una sola vez: cuando llegan datos nuevos, se vuelve a dibujar el panel.
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
