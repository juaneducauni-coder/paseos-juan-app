// Vista del rol Paseador y del Ayudante de paseador (página /paseador).
// Pensada para la calle, tipo app de reparto: celular en una mano, correas en la otra, al sol.
// Pocas letras, botones grandes, lo importante abajo al alcance del pulgar.
//
// Pantallas (barra fija abajo): Ruta (perro en curso + siguientes + listos), Equipo (checklist),
// Incidente (3 pasos) y Más (día y turno, avisos, datos del turno, salir).
// Cada perro: "Retiré" → "Foto del paseo" (la foto lo pasa a "En paseo") → "Entregué". Sin foto
// igual se entrega y queda marcado "sin foto del paseo".
// Modo ayudante (rol "ayudante", docs/datos-compartidos.md "Tareas del ayudante"): en Ruta ve sus
// tareas con fotos y botones grandes: integrar, devolver (máx. 2), agua, curación y cruce o perro suelto.
//
// Ruta del día (docs/datos-compartidos.md, "Rutas y horarios"): la arma el coordinador.
// Ruta efectiva = registro de `rutas` de la fecha si existe; si no, la `plantillas` del día de la
// semana; si el servidor todavía no tiene plantillas, la planilla RPJ (plantillasDesdePlanilla())
// con el aviso de que falta que el coordinador la confirme.
// Lo que se marca se guarda en los datos compartidos (src/api/client.js): avance de cada perro en
// `paseos` (el mismo registro que ve y toca el supervisor), equipo en `checklists` (uno por usuario),
// incidentes en `incidentes` y la foto de cada perro en `fotos`. Los avisos vienen de `avisos`.
// En este celular solo quedan el borrador del incidente y la ruta elegida cuando el usuario no
// figura en ninguna.
// No hay datos de tutores en esta página (tampoco para el ayudante).
import {
  REAL_DOGS,
  TEAM,
  todayName,
  EQUIPMENT,
  INCIDENT_PROTOCOL,
  SHIFTS,
  WEEK_DAYS,
  CATEGORIES,
  BUSINESS_INFO,
  PENDIENTE,
  plantillasDesdePlanilla,
  sumarMinutos,
} from "../data/realData.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";
import { session, registros, onDataChange, fotosPerros, fotosPaseo, archivos } from "../api/client.js";

const TZ = "America/Argentina/Buenos_Aires";
// Claves de la versión anterior (todo en el celular). Solo se leen una vez para migrar.
const LEGACY_PROGRESS_KEY = "paseosJuan_paseador_progreso";
const LEGACY_EQUIP_KEY = "paseosJuan_paseador_equipo";
// Borrador del incidente mientras se escribe (no es un dato compartido).
const INCIDENT_KEY = "paseosJuan_paseador_incidente";
// Ruta elegida en este dispositivo cuando el usuario no figura en ninguna ("¿Qué ruta hacés?").
const ROUTE_PICK_KEY = "paseosJuan_paseador_ruta";

// Cada paso guarda su hora, quién lo marcó y deja el estado del contrato de `paseos`.
// "Retiré" deja el perro "retirado"; la FOTO del paseo (fotosPaseo.sacar) lo pasa a "paseando";
// "Entregué" lo cierra. La foto no bloquea la entrega: sin foto queda `sinFotoPaseo: true`.
const STEPS = [
  { label: "Retiro", button: "Retiré", done: "Retirado", field: "horaRetiro", estado: "retirado" },
  { label: "Foto", button: "Foto del paseo", done: "En paseo", field: "horaPaseo", estado: "paseando" },
  { label: "Entrega", button: "Entregué", done: "Entregado", field: "horaEntrega", estado: "entregado" },
];
// Campos de `paseos` que no son pasos: foto del paseo y lo que marca el ayudante.
// `devuelvePor`: el ayudante dijo "Voy a entregar" (el paseador ve "Lo entrega …").
const EXTRA_FIELDS = ["fotoPaseoId", "fotoPendiente", "sinFotoPaseo", "horaIntegrado", "horaIntegradoPor", "horaIntegradoPorNombre", "devuelvePor", "devuelvePorNombre"];
const ESTADO_STEP = { pendiente: 0, retirado: 1, paseando: 2, entregado: 3 };
const NO_SALE = "no-sale";
const TURNO_ID = { Mañana: "manana", Tarde: "tarde" };
const SAFE_ID = /^[a-z0-9][a-z0-9_.-]{0,60}$/i;
const SAFE_IMG = /^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+$/i;

const SHIFT_BY_LABEL = { Mañana: SHIFTS.manana, Tarde: SHIFTS.tarde };

// Incidente: qué pasó (hechos observables, nada de etiquetas), lesión y riesgo.
const INCIDENT_TYPES = ["Se soltó", "Se escapó", "Pelea entre perros", "Mordió", "Lo mordieron", "Gruñó o ladró", "Se lastimó", "Comió algo", "Otro"];
const RISK_LEVELS = ["Bajo", "Medio", "Alto"];
const INJURY_OPTIONS = ["Sí", "No"];
const EXTERNAL_DOG = "Perro externo";
const FORBIDDEN_WORDS = /\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i;
const INCIDENT_STEPS = ["Qué pasó", "Perros", "Lesión"];

// Checklist del ayudante antes de salir (definido por Juan el 13/11/2026): 4 interruptores.
const HELPER_ITEMS = [
  { item: "Botiquín", label: "Botiquín", sub: "agua oxigenada y gasa", icon: "briefcaseMedical" },
  { item: "Botella bebedero", label: "Botella bebedero", icon: "droplets" },
  { item: "Bolsas", label: "Bolsas", icon: "shoppingBag" },
  { item: "Celular cargado", label: "Celular cargado", icon: "phone" },
];

// Tareas del ayudante.
const MAX_RETURN = 2;
const WATER_REMINDER_MIN = 40;
const CURE_TYPES = ["Raspón", "Corte chico", "Pata", "Otro"];
const HERD_LINES = ["Dividan los perros y pasen de a grupos", "Calmá a los que se alteran"];

// Checklist del paseador: su equipo según el inventario, agrupado.
// El inventario tiene columna solo para Juan y Sebastián: a ellos se les muestra su cantidad.
// Cualquier otro paseador ve el equipo de paseo sin cantidades (no se inventan) y sin "tenés N bozales".
const EQUIPMENT_COLUMNS = ["sebastian", "juan"];
const WALK_KIT = EQUIPMENT.filter((row) => row.sebastian > 0);
const WALKER_GROUPS = [
  { title: "Para pasear", test: /correa|pechera|cintur|muslera|gancho/i, icon: "pawPrint" },
  { title: "Seguridad", test: /bozal/i, icon: "shieldCheck" },
  { title: "Agua y cuidado", test: /bebedero|cepillo|tijera/i, icon: "droplets" },
];

// Punto de partida si el servidor todavía no tiene plantillas (horarios reales de BASE RUTAS).
const PLANILLA = plantillasDesdePlanilla();

// Estado de la pantalla (no se guarda: al recargar vuelve a Ruta, a hoy y al turno actual).
const view = {
  tab: "ruta",
  day: null,
  shift: null,
  detailId: "",
  open: { done: false, more: false, message: false, help: false },
  confirmClear: false,
  incidentStatus: "",
  incidentWarn: false,
  incidentSavedText: "",
  equipStatus: "",
  syncError: "",
  routeChange: null,
  toast: null,
  photoBusy: {},
  walkBusy: {},
  // Modo ayudante: perros elegidos para devolver, curación en curso y "cruce o perro suelto" abierto.
  helper: { picks: [], cure: null, herd: false, status: "" },
};

// Lo que dibujó el último render (lo usa el encabezado, que se arma después del contenido).
let headerInfo = { title: "Paseos Juan", route: "", shift: "" };

// ---------- utilidades ----------

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado): vale solo mientras la página esté abierta.
  }
}

function plain(text) {
  return String(text || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
}

// Íconos que no están en ui/shared.js.
const EXTRA_ICONS = {
  phone: `<rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" />`,
  more: `<circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" />`,
  check: `<path d="m5 12.5 4.5 4.5L19 7.5" />`,
  arrowLeft: `<path d="M19 12H5" /><path d="m11 6-6 6 6 6" />`,
  undo: `<path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />`,
};

function ic(name, className = "pw-icon") {
  if (EXTRA_ICONS[name]) {
    return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${EXTRA_ICONS[name]}</svg>`;
  }
  return icon(name, className);
}

// Fecha y hora de Argentina, sin importar la zona horaria del dispositivo.
function nowAR() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((part) => [part.type, part.value]),
  );
  const localDate = new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  return {
    iso: `${parts.year}-${parts.month}-${parts.day}`,
    date: `${parts.day}/${parts.month}/${parts.year}`,
    time: `${parts.hour}:${parts.minute}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    day: todayName(localDate),
  };
}

function isoToLabel(iso) {
  const [y, m, d] = String(iso).split("-");
  return d ? `${d}/${m}/${y}` : iso;
}

// Próxima fecha (desde hoy) de un día de la semana: para planificar otro día.
function isoForDay(day, now) {
  const offset = (WEEK_DAYS.indexOf(day) - WEEK_DAYS.indexOf(now.day) + 7) % 7;
  const [y, m, d] = now.iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + offset)).toISOString().slice(0, 10);
}

// Turno según la hora: mañana hasta las 13:30, después tarde.
function shiftByClock(now) {
  return now.minutes < 13 * 60 + 30 ? "Mañana" : "Tarde";
}

function selection() {
  const now = nowAR();
  const day = view.day || now.day;
  const shift = view.shift || shiftByClock(now);
  const isToday = day === now.day;
  const iso = isToday ? now.iso : isoForDay(day, now);
  return { now, day, shift, isToday, iso };
}

function listNames(names) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

function shiftHours(shift) {
  const data = SHIFT_BY_LABEL[shift];
  return `${data.from} a ${data.to}`;
}

function minutesOf(hora) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(hora || "").trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function durationText(total) {
  if (total < 60) return `${total} min`;
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

// Cuenta regresiva o atraso contra la hora prevista (texto corto).
function countdown(hora, nowMinutes) {
  const target = minutesOf(hora);
  if (target === null) return { text: "Sin hora", kind: "idle" };
  const diff = target - nowMinutes;
  if (diff > 0) return { text: `En ${durationText(diff)}`, kind: diff <= 10 ? "soon" : "ok" };
  if (diff === 0) return { text: "Ahora", kind: "soon" };
  return { text: `${durationText(-diff)} tarde`, kind: "late" };
}

function Countdown(hora, nowMinutes) {
  const cd = countdown(hora, nowMinutes);
  return `<span class="pw-cd pw-cd--${cd.kind}" data-pw-countdown="${esc(hora)}">${esc(cd.text)}</span>`;
}

function safetyKind(text) {
  if (/^no juntar/i.test(text)) return "danger";
  if (/bozal/i.test(text)) return "warn";
  return "info";
}

// Pares de perros que no se pueden juntar y que figuran en la misma lista.
function conflictsFor(dogs) {
  const names = new Set(dogs.map((dog) => dog.name));
  const pairs = new Map();
  dogs.forEach((dog) => {
    (dog.incompatibleWith || []).forEach((other) => {
      if (!names.has(other)) return;
      const key = [dog.name, other].sort().join("|");
      pairs.set(key, [dog.name, other].sort());
    });
  });
  return [...pairs.values()];
}

// Agrupa los pares por el perro con más conflictos: "Pistacho con Cashi, Lokaku y Sam".
function groupConflicts(conflicts) {
  let remaining = conflicts.map((pair) => [...pair]);
  const groups = [];
  while (remaining.length) {
    const degree = {};
    remaining.flat().forEach((name) => {
      degree[name] = (degree[name] || 0) + 1;
    });
    const hub = Object.keys(degree).sort((a, b) => degree[b] - degree[a] || a.localeCompare(b))[0];
    const partners = remaining.filter((pair) => pair.includes(hub)).map((pair) => pair.find((name) => name !== hub)).sort();
    groups.push(`${hub} con ${listNames(partners)}`);
    remaining = remaining.filter((pair) => !pair.includes(hub));
  }
  return groups;
}

function partnersInList(dog, conflicts) {
  return conflicts.filter((pair) => pair.includes(dog.name)).map((pair) => pair.find((name) => name !== dog.name));
}

function usesMuzzle(dog) {
  return dog.safety.some((text) => /bozal/i.test(text));
}

function initialOf(name) {
  return (String(name || "?").trim()[0] || "?").toUpperCase();
}

// ---------- usuario ----------

function currentUser() {
  return session.user() || {};
}

function walkerName() {
  return currentUser().nombre || "equipo";
}

function isHelper() {
  return currentUser().rol === "ayudante";
}

// Columna del inventario del usuario ("sebastian" o "juan"); vacío si no tiene columna propia.
function equipColumn() {
  const usuario = plain(currentUser().usuario || "");
  return EQUIPMENT_COLUMNS.includes(usuario) ? usuario : "";
}

function myEquipment() {
  const col = equipColumn();
  return col ? EQUIPMENT.filter((row) => row[col] > 0) : WALK_KIT;
}

// Bozales propios según el inventario; null si el usuario no tiene columna (no se muestra cantidad).
function myMuzzles() {
  const col = equipColumn();
  if (!col) return null;
  return EQUIPMENT.filter((row) => /^bozal/i.test(row.item)).reduce((sum, row) => sum + row[col], 0);
}

// Lo que no está en el equipo propio y tiene Juan (a Juan no se le muestra).
function otherEquipment() {
  if (equipColumn() === "juan") return [];
  const mine = myEquipment();
  return EQUIPMENT.filter((row) => !mine.includes(row) && row.juan > 0);
}

// Faltan bozales: solo si se sabe cuántos tiene el usuario.
function muzzleShort(muzzled) {
  const own = myMuzzles();
  return !isHelper() && own !== null && muzzled.length > own ? own : null;
}

function isMe(usuario) {
  const user = currentUser();
  if (!usuario || !user.usuario) return false;
  const value = plain(usuario);
  return value === plain(user.usuario) || (user.nombre && value === plain(user.nombre));
}

// Nombre para mostrar de un usuario (las rutas guardan el usuario, no el nombre).
function personName(usuario, names = new Map()) {
  if (!usuario) return "";
  if (isMe(usuario)) return currentUser().nombre || String(usuario);
  const key = String(usuario);
  return names.get(key) || names.get(plain(key)) || TEAM.find((member) => member.id === plain(key))?.name || key;
}

// ---------- rutas y horarios ----------

function sameDay(a, b) {
  return plain(a) === plain(b);
}

function turnoLabel(value) {
  return plain(value).startsWith("tarde") ? "Tarde" : "Mañana";
}

function dogForStop(parada) {
  const known = REAL_DOGS.find((dog) => dog.id === parada.perroId) || REAL_DOGS.find((dog) => plain(dog.name) === plain(parada.perroNombre));
  if (known) return known;
  // Perro que sumó el coordinador y todavía no está en el registro maestro de esta página.
  return {
    id: SAFE_ID.test(String(parada.perroId || "")) ? String(parada.perroId) : "",
    name: String(parada.perroNombre || "Perro sin nombre"),
    size: PENDIENTE,
    minutes: null,
    safety: [],
    status: "Activo",
    unknown: true,
  };
}

function normalizeRoute(raw, fuente) {
  const paradas = (Array.isArray(raw.paradas) ? raw.paradas : []).filter((p) => p && (p.perroId || p.perroNombre));
  const stops = paradas
    .map((parada, index) => {
      const dog = dogForStop(parada);
      const minutos = Number(parada.minutos) || dog.minutes || null;
      const hora = minutesOf(parada.hora) === null ? "" : String(parada.hora).trim().padStart(5, "0");
      return {
        index,
        dog,
        hora,
        minutos,
        salida: hora && minutos ? sumarMinutos(hora, minutos) : "",
        nota: String(parada.nota || "").trim(),
        canSave: Boolean(dog.id),
      };
    })
    // En orden de retiro. Sin hora van al final; a igual hora se respeta el orden del coordinador.
    .sort((a, b) => (minutesOf(a.hora) ?? 9999) - (minutesOf(b.hora) ?? 9999) || a.index - b.index);
  return {
    ruta: String(raw.ruta || PENDIENTE),
    turno: turnoLabel(raw.turno),
    dia: raw.dia || "",
    paseador: String(raw.paseador || ""),
    ayudante: String(raw.ayudante || ""),
    supervisor: String(raw.supervisor || ""),
    notas: String(raw.notas || ""),
    fuente,
    record: raw,
    stops,
  };
}

// Ruta efectiva de una fecha: cambio del día > plantilla semanal > planilla (si no hay nada en el servidor).
function effectiveRoutes(iso, day, todayIso) {
  const daily = new Map();
  registros
    .cached("rutas", { desde: todayIso })
    .filter((record) => record.fecha === iso && record.ruta && Array.isArray(record.paradas))
    .sort((a, b) => String(a.actualizadoEn || "").localeCompare(String(b.actualizadoEn || "")))
    .forEach((record) => daily.set(record.ruta, record));

  const plantillas = registros.cached("plantillas").filter((record) => record.ruta && Array.isArray(record.paradas));
  const fromPlanilla = plantillas.length === 0;
  const byRuta = new Map();
  (fromPlanilla ? PLANILLA : plantillas)
    .filter((record) => sameDay(record.dia, day))
    .forEach((record) => byRuta.set(record.ruta, normalizeRoute(record, fromPlanilla ? "planilla" : "plantilla")));
  daily.forEach((record, ruta) => byRuta.set(ruta, normalizeRoute(record, "dia")));

  return [...byRuta.values()].sort((a, b) => (a.turno === b.turno ? a.ruta.localeCompare(b.ruta) : a.turno === "Mañana" ? -1 : 1));
}

function pickedRoute(sel) {
  const saved = readJSON(ROUTE_PICK_KEY, {});
  const mine = saved?.[currentUser().usuario || ""];
  return mine && mine.iso === sel.iso && mine.turno === sel.shift ? mine.ruta : "";
}

function savePickedRoute(sel, ruta) {
  const saved = readJSON(ROUTE_PICK_KEY, {});
  const all = saved && typeof saved === "object" ? saved : {};
  all[currentUser().usuario || ""] = ruta ? { iso: sel.iso, turno: sel.shift, ruta } : null;
  writeJSON(ROUTE_PICK_KEY, all);
}

// Qué rutas se muestran: donde figura el usuario (paseador o ayudante); si no figura, todas las
// del turno o la que eligió en este dispositivo.
function routePlan(sel) {
  const all = effectiveRoutes(sel.iso, sel.day, sel.now.iso);
  const ofShift = all.filter((route) => route.turno === sel.shift);
  const mine = ofShift.filter((route) => isMe(route.paseador) || isMe(route.ayudante));
  const elsewhere = all.filter((route) => route.turno !== sel.shift && (isMe(route.paseador) || isMe(route.ayudante)));
  const picked = mine.length ? "" : ofShift.some((route) => route.ruta === pickedRoute(sel)) ? pickedRoute(sel) : "";
  const shown = mine.length ? mine : picked ? ofShift.filter((route) => route.ruta === picked) : ofShift;
  return {
    all,
    ofShift,
    mine,
    elsewhere,
    picked,
    shown,
    assigned: mine.length > 0,
    helping: mine.find((route) => isMe(route.ayudante) && !isMe(route.paseador)) || null,
    fromPlanilla: shown.some((route) => route.fuente === "planilla"),
  };
}

function stopsOf(routes) {
  return routes.flatMap((route) => route.stops.map((stop) => ({ ...stop, route })));
}

function findStop(sel, dogId) {
  return stopsOf(routePlan(sel).shown).find((stop) => stop.dog.id === dogId) || null;
}

// "La ruta cambió": se compara lo que se ve con lo que se vio antes (mismo día, turno y ruta).
const routeMemory = new Map();

function detectRouteChanges(sel, routes) {
  if (!sel.isToday || !loaded.ready) return;
  const changes = [];
  routes.forEach((route) => {
    const key = `${sel.iso}|${route.turno}|${route.ruta}`;
    const current = new Map(route.stops.map((stop) => [stop.dog.id || plain(stop.dog.name), stop]));
    const before = routeMemory.get(key);
    routeMemory.set(key, current);
    if (!before) return;
    const added = [...current.entries()].filter(([id]) => !before.has(id)).map(([, stop]) => `${stop.dog.name}${stop.hora ? ` (${stop.hora})` : ""}`);
    const removed = [...before.entries()].filter(([id]) => !current.has(id)).map(([, stop]) => stop.dog.name);
    const moved = [...current.entries()]
      .filter(([id, stop]) => before.has(id) && before.get(id).hora !== stop.hora)
      .map(([id, stop]) => `${stop.dog.name} ${before.get(id).hora || "sin hora"} → ${stop.hora || "sin hora"}`);
    const parts = [];
    if (added.length) parts.push(`+ ${listNames(added)}`);
    if (removed.length) parts.push(`− ${listNames(removed)}`);
    if (moved.length) parts.push(`hora: ${listNames(moved)}`);
    if (parts.length) changes.push(`${routes.length > 1 ? `${route.ruta}: ` : ""}${parts.join(" · ")}`);
  });
  if (!changes.length) return;
  view.routeChange = { text: changes.join(". "), time: sel.now.time };
  announce(`La ruta cambió: ${view.routeChange.text}`);
}

// ---------- avisos por barrio ----------

function activeNotices(iso) {
  return registros
    .cached("avisos")
    .filter((aviso) => {
      const desde = String(aviso.fecha || "");
      const hasta = String(aviso.vigenteHasta || "");
      if (desde && desde > iso) return false;
      return hasta ? hasta >= iso : desde === iso;
    })
    .sort((a, b) => String(b.actualizadoEn || b.fecha || "").localeCompare(String(a.actualizadoEn || a.fecha || "")));
}

// Avisos que este usuario ya marcó como vistos (solo en este celular; no borra el aviso).
const SEEN_NOTICES_KEY = "paseosJuan_avisos_vistos";

function seenNotices() {
  try {
    const list = JSON.parse(localStorage.getItem(SEEN_NOTICES_KEY));
    return Array.isArray(list) ? list.map(String) : [];
  } catch {
    return [];
  }
}

function markNoticeSeen(id) {
  try {
    localStorage.setItem(SEEN_NOTICES_KEY, JSON.stringify([...new Set([...seenNotices(), String(id)])].slice(-200)));
  } catch {
    // Sin lugar en el celular: el aviso se sigue mostrando.
  }
}

function unseenNotices(iso) {
  const seen = seenNotices();
  return activeNotices(iso).filter((aviso) => !seen.includes(String(aviso.id)));
}

// Rojo: ya pasó algo (seguridad, perro suelto). Azul: alerta preventiva (clima, obras, etc.).
function NoticeList(notices, { full = false } = {}) {
  const seen = seenNotices();
  return `
    <ul class="pw-notices" role="list">
      ${notices.map((aviso, index) => {
        const urgent = /seguridad|perro suelto|incidente|accidente/i.test(aviso.tipo || "");
        const isSeen = seen.includes(String(aviso.id));
        return `
          <li class="pw-notice ${urgent ? "pw-notice--danger" : "pw-notice--info"} ${isSeen ? "is-seen" : ""}">
            <span class="pw-notice-num" aria-hidden="true">${index + 1}</span>
            <div>
              <p class="pw-notice-head"><strong>${esc(aviso.barrio || "Barrio sin cargar")}</strong>${aviso.tipo ? ` · ${esc(aviso.tipo)}` : ""}</p>
              <p>${esc(aviso.mensaje || aviso.titulo || "")}</p>
              ${full ? `<p class="pw-notice-meta">${aviso.vigenteHasta ? `Hasta el ${esc(isoToLabel(aviso.vigenteHasta))}` : "Solo hoy"}${aviso.creadoPorNombre ? ` · ${esc(aviso.creadoPorNombre)}` : ""}</p>` : ""}
            </div>
            ${isSeen ? `<span class="pw-notice-seen">${ic("check", "pw-icon pw-icon--sm")}Visto</span>` : `<button class="pw-notice-btn" type="button" data-pw-notice-seen="${esc(aviso.id)}">Visto</button>`}
          </li>
        `;
      }).join("")}
    </ul>
  `;
}

// ---------- datos compartidos (src/api/client.js) ----------

// Ids del contrato (docs/datos-compartidos.md): un registro por perro, día y turno.
function paseoId(iso, dogId, shift) {
  return `${iso}_${dogId}_${TURNO_ID[shift]}`;
}

function checklistId(iso, shift, usuario = currentUser().usuario) {
  return `${iso}_${usuario || "sin-usuario"}_${TURNO_ID[shift]}`;
}

// Lo recién tocado se muestra al instante, mientras viaja al servidor.
const optimistic = new Map();

function recordsFor(col, iso) {
  const byId = new Map(registros.cached(col, { desde: iso }).map((record) => [record.id, record]));
  optimistic.forEach((record, key) => {
    if (!key.startsWith(`${col}:`)) return;
    byId.set(record.id, { ...(byId.get(record.id) || {}), ...record, enviando: true });
  });
  return byId;
}

// Paso alcanzado según el estado y las horas guardadas (lo marque el paseador, el ayudante o el supervisor).
function paseoState(record) {
  const times = STEPS.map((step) => (record?.[step.field] ? String(record[step.field]) : ""));
  if (!record) return { step: 0, noSale: false, times, record: null };
  const byTimes = times.reduce((last, time, index) => (time ? index + 1 : last), 0);
  const noSale = record.estado === NO_SALE;
  const step = noSale ? 0 : Math.max(ESTADO_STEP[record.estado] ?? 0, byTimes);
  return { step, noSale, times, record };
}

function progressFor(iso, shift, dogs) {
  const records = recordsFor("paseos", iso);
  return Object.fromEntries(dogs.filter((dog) => dog.id).map((dog) => [dog.id, paseoState(records.get(paseoId(iso, dog.id, shift)))]));
}

function stateOf(progress, stop) {
  return (stop.dog.id && progress[stop.dog.id]) || paseoState(null);
}

function routeTotals(stops, progress) {
  const noSale = stops.filter((stop) => stateOf(progress, stop).noSale).length;
  const delivered = stops.filter((stop) => !stateOf(progress, stop).noSale && stateOf(progress, stop).step >= STEPS.length).length;
  return { noSale, delivered, toWalk: stops.length - noSale, closed: delivered + noSale === stops.length };
}

// Ítems del checklist según el rol: corto para el ayudante, el inventario para el paseador.
function checklistItems() {
  return isHelper() ? HELPER_ITEMS.map((row) => row.item) : myEquipment().map((row) => row.item);
}

function checklistFor(iso, shift) {
  const record = recordsFor("checklists", iso).get(checklistId(iso, shift));
  const items = record?.items && typeof record.items === "object" ? record.items : {};
  return { record, checked: checklistItems().filter((item) => items[item] === true) };
}

// Nombres para "Marcó …" y "Último cambio": el servidor guarda usuario y nombre de quien carga.
function teamNames(iso) {
  const names = new Map();
  const add = (usuario, nombre) => {
    if (usuario && nombre) names.set(String(usuario), String(nombre));
  };
  [["paseos", { desde: iso }], ["checklists", { desde: iso }], ["rutas", { desde: iso }], ["plantillas", {}], ["avisos", {}]].forEach(([col, opts]) => {
    registros.cached(col, opts).forEach((record) => {
      add(record.creadoPor, record.creadoPorNombre);
      add(record.actualizadoPor, record.actualizadoPorNombre);
      STEPS.forEach((step) => add(record[`${step.field}Por`], record[`${step.field}PorNombre`]));
      add(record.horaIntegradoPor, record.horaIntegradoPorNombre);
      add(record.devuelvePor, record.devuelvePorNombre);
      // Rutas y plantillas: el coordinador guarda el nombre de la persona además del usuario.
      add(record.paseador, record.paseadorNombre);
      add(record.ayudante, record.ayudanteNombre);
    });
  });
  return names;
}

function whoName(usuario, names) {
  if (!usuario) return PENDIENTE;
  if (isMe(usuario)) return "vos";
  return personName(usuario, names);
}

function timeAR(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
}

function lastChange(record, names) {
  if (!record) return "";
  if (record.enviando) return "Guardando…";
  if (record.pendiente) return "Sin señal: se envía solo.";
  if (!record.actualizadoEn) return "";
  const time = timeAR(record.actualizadoEn);
  return `Último cambio: ${whoName(record.actualizadoPor, names)}${time ? `, ${time}` : ""}`;
}

// Quién marcó un paso (solo si fue otra persona: el ayudante, el paseador o el supervisor).
function markerOf(record, index, names) {
  const field = STEPS[index].field;
  const usuario = record?.[`${field}Por`];
  if (!usuario || isMe(usuario)) return "";
  return record[`${field}PorNombre`] || personName(usuario, names);
}

// Guarda de a uno, en orden, para que dos toques seguidos no se pisen.
let saveChain = Promise.resolve();

function saveShared(col, build, { optimisticRecord: own } = {}) {
  const key = own ? `${col}:${own.id}` : "";
  // Dos toques seguidos sobre el mismo registro se suman (no se pisan) mientras viajan.
  const optimisticRecord = key ? { ...(optimistic.get(key) || {}), ...own } : null;
  if (key) optimistic.set(key, optimisticRecord);
  const job = saveChain.then(async () => {
    const record = typeof build === "function" ? build() : build;
    try {
      const saved = await registros.save(col, record);
      if (view.syncError) view.syncError = "";
      return saved;
    } catch (error) {
      view.syncError = `No se guardó: ${error?.message || "error del servidor"} Probá de nuevo.`;
      announceError(view.syncError);
      return null;
    } finally {
      if (key && optimistic.get(key) === optimisticRecord) optimistic.delete(key);
      scheduleRender();
    }
  });
  saveChain = job.catch(() => null);
  return job;
}

function savePaseo(stop, sel, changes) {
  const iso = sel.now.iso;
  const record = {
    id: paseoId(iso, stop.dog.id, sel.shift),
    fecha: iso,
    perroId: stop.dog.id,
    perroNombre: stop.dog.name,
    turno: sel.shift,
    ruta: stop.route.ruta,
    ...changes,
  };
  return saveShared("paseos", record, { optimisticRecord: record });
}

// Foto del registro de `paseos` antes de tocarlo: "Deshacer" lo deja exactamente como estaba.
function snapshotPaseo(state) {
  const record = state.record || {};
  const snap = { estado: record.estado || "pendiente" };
  STEPS.forEach((step) => {
    snap[step.field] = record[step.field] || "";
    snap[`${step.field}Por`] = record[`${step.field}Por`] || "";
    snap[`${step.field}PorNombre`] = record[`${step.field}PorNombre`] || "";
  });
  EXTRA_FIELDS.forEach((field) => {
    snap[field] = ["fotoPendiente", "sinFotoPaseo"].includes(field) ? record[field] === true : record[field] || "";
  });
  return snap;
}

function saveChecklist(sel, checked) {
  const iso = sel.now.iso;
  const list = checklistItems();
  const items = Object.fromEntries(list.map((item) => [item, checked.includes(item)]));
  const record = { id: checklistId(iso, sel.shift), fecha: iso, turno: sel.shift, items, completo: list.every((item) => checked.includes(item)) };
  return saveShared("checklists", record, { optimisticRecord: record });
}

// Trae los datos de hoy una vez por usuario y día, y después los refresca cada minuto.
// Hasta que llega la primera respuesta (o se confirma que no hay señal), los botones de avance
// quedan en espera: así un toque apurado no pisa lo que ya marcó el supervisor o el ayudante.
const loaded = { key: "", stops: [], ready: false };

function ensureShared(iso) {
  const key = `${iso}|${currentUser().usuario || ""}`;
  if (loaded.key === key) return;
  loaded.stops.forEach((stop) => stop());
  loaded.key = key;
  loaded.stops = [];
  loaded.ready = false;
  const sources = [
    ["paseos", { desde: iso }],
    ["checklists", { desde: iso }],
    ["rutas", { desde: iso }],
    ["plantillas", {}],
    ["avisos", {}],
  ];
  Promise.allSettled(sources.map(([col, opts]) => registros.list(col, opts)))
    .then((results) => {
      const failed = results.find((result) => result.status === "rejected");
      if (failed) {
        view.syncError = `No se pudieron traer los datos del equipo: ${failed.reason?.message || "error del servidor"}`;
        announceError(view.syncError);
      }
      return migrateLegacy(iso);
    })
    .catch(() => null)
    .finally(() => {
      if (loaded.key !== key) return;
      loaded.ready = true;
      scheduleRender();
      loaded.stops = sources.map(([col, opts]) => registros.watch(col, opts));
    });
}

// Fotos de los perros: una sola vez (la miniatura se ve en todas las tarjetas).
let photosWatching = false;

function ensurePhotos() {
  if (photosWatching || !session.token()) return;
  photosWatching = true;
  registros.watch("fotos");
}

// Migración: la versión anterior guardaba el avance solo en el celular. Lo de hoy se sube una vez.
let legacyChecked = false;

async function migrateLegacy(iso) {
  if (legacyChecked) return;
  legacyChecked = true;
  const progress = readJSON(LEGACY_PROGRESS_KEY, null);
  const equip = readJSON(LEGACY_EQUIP_KEY, null);
  if (!progress && !equip) return;

  const jobs = [];
  const paseos = recordsFor("paseos", iso);
  Object.entries(progress && typeof progress === "object" ? progress : {}).forEach(([slot, dogs]) => {
    const [day, shift] = slot.split("|");
    if (day !== iso || !TURNO_ID[shift] || !dogs || typeof dogs !== "object") return;
    Object.entries(dogs).forEach(([dogId, times]) => {
      const dog = REAL_DOGS.find((item) => item.id === dogId);
      if (!dog || !Array.isArray(times) || !times.length) return;
      const id = paseoId(iso, dogId, shift);
      const shared = paseoState(paseos.get(id));
      const steps = Math.min(times.length, STEPS.length);
      // Si lo compartido ya está igual o más adelante (o el supervisor marcó "no sale"), no se pisa.
      if (shared.noSale || shared.step >= steps) return;
      const record = { id, fecha: iso, perroId: dog.id, perroNombre: dog.name, turno: shift, estado: STEPS[steps - 1].estado };
      STEPS.forEach((step, index) => {
        record[step.field] = index < steps ? shared.times[index] || String(times[index] || "") : "";
      });
      jobs.push(saveShared("paseos", record, { optimisticRecord: record }));
    });
  });

  const checklists = recordsFor("checklists", iso);
  Object.entries(equip && typeof equip === "object" ? equip : {}).forEach(([slot, list]) => {
    const [day, shift] = slot.split("|");
    if (day !== iso || !TURNO_ID[shift] || !Array.isArray(list)) return;
    const known = list.filter((item) => checklistItems().includes(item));
    if (!known.length || checklists.has(checklistId(iso, shift))) return;
    jobs.push(saveChecklist({ now: { iso }, shift }, known));
  });

  const results = await Promise.all(jobs);
  if (results.every(Boolean)) {
    try {
      localStorage.removeItem(LEGACY_PROGRESS_KEY);
      localStorage.removeItem(LEGACY_EQUIP_KEY);
    } catch {
      // Sin almacenamiento: no hay nada que limpiar.
    }
    if (jobs.length) announce("Se subió al equipo lo que tenías marcado en este celular.");
  }
}

// ---------- borrador del incidente ----------

function getDraft() {
  const draft = readJSON(INCIDENT_KEY, {}) || {};
  const legacyInjury = { "No se ven": "No", "No sé": "" };
  const lesiones = draft.lesiones in legacyInjury ? legacyInjury[draft.lesiones] : draft.lesiones;
  return {
    step: [1, 2, 3].includes(draft.step) ? draft.step : 1,
    tipos: Array.isArray(draft.tipos) ? draft.tipos.filter((tipo) => INCIDENT_TYPES.includes(tipo)) : [],
    // La versión anterior guardaba un texto largo en "conducta": pasa como detalle.
    detalle: typeof draft.detalle === "string" ? draft.detalle : String(draft.conducta || ""),
    dogs: Array.isArray(draft.dogs) ? draft.dogs.filter((name) => typeof name === "string") : [],
    hora: draft.hora || "",
    lugar: draft.lugar || "",
    antes: draft.antes || "",
    accion: draft.accion || "",
    despues: draft.despues || "",
    riesgo: RISK_LEVELS.includes(draft.riesgo) ? draft.riesgo : "",
    lesiones: INJURY_OPTIONS.includes(lesiones) ? lesiones : "",
    protocolo: Array.isArray(draft.protocolo) ? draft.protocolo.filter((n) => Number.isInteger(n)) : [],
    // Id del registro en `incidentes` una vez guardado: si se corrige, se actualiza el mismo.
    registroId: typeof draft.registroId === "string" ? draft.registroId : "",
    enviado: draft.enviado === true,
    // Vino de "Es más grave" (curación del ayudante): WhatsApp a Juan arriba de todo.
    urgente: draft.urgente === true,
  };
}

function writeDraft(changes) {
  const draft = { ...getDraft(), ...changes };
  writeJSON(INCIDENT_KEY, draft);
  return draft;
}

function draftHasContent(draft) {
  return Boolean(draft.tipos.length || draft.detalle.trim() || draft.dogs.length || draft.lesiones || draft.riesgo || draft.antes || draft.accion || draft.despues || draft.lugar);
}

function conductaOf(draft) {
  return [draft.tipos.join(", "), draft.detalle.trim()].filter(Boolean).join(". ");
}

// ---------- fotos de los perros ----------

function photoOf(dog) {
  if (!dog?.id) return "";
  const src = fotosPerros.de(dog.id);
  return src && SAFE_IMG.test(src) ? src : "";
}

function photoRecord(dogId) {
  return registros.cached("fotos").find((foto) => foto.id === dogId || foto.perroId === dogId) || null;
}

function Avatar(dog, size) {
  const src = photoOf(dog);
  return `
    <span class="pw-ava pw-ava--${size} ${src ? "has-photo" : ""}" aria-hidden="true">
      ${src ? `<img src="${esc(src)}" alt="" />` : `<span class="pw-ava-initial">${esc(initialOf(dog.name))}</span>`}
    </span>
  `;
}

// Botón de cámara: un <label> con el input de archivo adentro (abre la cámara del celular).
function PhotoInput(dog, label, extraClass = "") {
  const busy = Boolean(view.photoBusy[dog.id]);
  return `
    <label class="pw-photo-btn ${extraClass} ${busy ? "is-busy" : ""}">
      <input class="pw-file" type="file" accept="image/*" capture="environment" data-pw-photo="${esc(dog.id)}" ${busy ? "disabled" : ""} aria-label="${esc(`${label}: ${dog.name}`)}" />
      ${ic("camera", "pw-icon pw-icon--sm")}<span>${busy ? "Subiendo…" : esc(label)}</span>
    </label>
  `;
}

// La foto (o la inicial) de la tarjeta: con foto abre el detalle; sin foto abre la cámara para la
// foto de PERFIL (solo un ícono chico, sin la palabra "Foto": "Foto paseo" es el que marca el paseo).
function AvatarControl(dog, size, where) {
  if (dog.id && !photoOf(dog)) {
    const busy = Boolean(view.photoBusy[dog.id]);
    return `
      <label class="pw-ava-btn pw-ava-btn--${size} ${busy ? "is-busy" : ""}">
        <input class="pw-file" type="file" accept="image/*" capture="environment" data-pw-photo="${esc(dog.id)}" data-pw-where="${where}" ${busy ? "disabled" : ""} aria-label="${esc(`Foto de perfil de ${dog.name}`)}" />
        ${Avatar(dog, size)}
        <span class="pw-ava-cam" aria-hidden="true">${ic("camera", "pw-icon pw-icon--xs")}</span>
      </label>
    `;
  }
  if (!dog.id) return `<span class="pw-ava-btn pw-ava-btn--${size}">${Avatar(dog, size)}</span>`;
  return `
    <button class="pw-ava-btn pw-ava-btn--${size}" type="button" data-pw-open="${esc(dog.id)}" data-pw-where="${where}-foto" aria-label="${esc(`Ver ${dog.name}`)}">
      ${Avatar(dog, size)}
    </button>
  `;
}

async function uploadPhoto(dogId, file) {
  if (!file || !dogId) return;
  const dog = REAL_DOGS.find((item) => item.id === dogId) || stopsOf(routePlan(selection()).shown).find((stop) => stop.dog.id === dogId)?.dog;
  const name = dog?.name || dogId;
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    showToast("Sin señal: la foto necesita señal.");
    return;
  }
  view.photoBusy[dogId] = true;
  scheduleRender();
  announce(`Subiendo la foto de ${name}…`);
  try {
    const saved = await fotosPerros.subir(dogId, name, file);
    showToast(saved?.pendiente ? `Foto de ${name}: se envía con señal.` : `Foto de ${name} guardada.`);
  } catch (error) {
    view.syncError = `La foto no se subió: ${error?.message || "error del servidor"}`;
    announceError(view.syncError);
  } finally {
    delete view.photoBusy[dogId];
    scheduleRender();
  }
}

// ---------- vista ----------

export function walkerShell(content) {
  return `
    <div class="pw-shell ${view.detailId ? "has-sheet" : ""}" data-pw-screen="${view.tab}">
      ${WalkerHeader()}
      ${content}
    </div>
  `;
}

export function walkerDashboard() {
  const sel = selection();
  ensureShared(sel.now.iso);
  ensurePhotos();
  const plan = routePlan(sel);
  detectRouteChanges(sel, plan.shown);
  clockState.iso = sel.now.iso;
  clockState.shift = shiftByClock(sel.now);
  clockState.minute = sel.now.minutes;
  const ctx = routeContext(sel, plan);
  const { stops } = ctx;
  headerInfo = headerFor(ctx);

  const screens = { ruta: RouteScreen, equipo: EquipScreen, incidente: IncidentScreen, mas: MoreScreen };
  const screen = (screens[view.tab] || RouteScreen)(ctx);
  // Si el perro del detalle ya no está en la ruta (la cambió el coordinador), se cierra.
  if (view.detailId && !stops.some((stop) => stop.dog.id === view.detailId)) view.detailId = "";

  return `
    <main class="pw-main" id="pw-main">
      ${SyncBar()}
      ${screen}
    </main>
    ${view.detailId ? DogSheet(ctx) : ""}
    <div class="pw-toast-slot" data-pw-toast-slot>${ToastInner()}</div>
    ${TabBar(ctx)}
  `;
}

// Lo que necesitan las pantallas: selección, rutas, paradas, avance y nombres.
function routeContext(sel = selection(), plan = routePlan(sel)) {
  const stops = stopsOf(plan.shown);
  const progress = sel.isToday ? progressFor(sel.iso, sel.shift, stops.map((stop) => stop.dog)) : {};
  return { sel, plan, stops, progress, names: teamNames(sel.now.iso) };
}

// Ruta con la que va el ayudante: donde figura como ayudante o la que eligió ("¿Con qué ruta vas?").
function helperRoute(plan) {
  if (plan.helping) return plan.helping;
  return isHelper() && plan.shown.length === 1 ? plan.shown[0] : null;
}

function firstWord(name) {
  return String(name || "").trim().split(/\s+/)[0] || "";
}

// Encabezado: el nombre (o "Con <paseador>") en una línea y la ruta en un chip aparte.
function headerFor({ sel, plan, names }) {
  const helping = helperRoute(plan);
  let title = firstWord(walkerName()) || walkerName();
  let route = "";
  if (helping) {
    const partner = firstWord(personName(helping.paseador, names));
    title = partner ? `Con ${partner}` : title;
    route = helping.ruta;
  } else if (plan.assigned) {
    route = plan.mine.map((item) => item.ruta).join(" + ");
  } else if (plan.shown.length === 1) {
    route = plan.shown[0].ruta;
  }
  return { title, route, shift: sel.isToday ? sel.shift : `${sel.day.slice(0, 3)} · ${sel.shift}` };
}

function WalkerHeader() {
  const pending = registros.pendingCount() + fotosPaseo.pendientes();
  return `
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, ${isHelper() ? "ayudante de paseador" : "paseador"}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
      </a>
      <p class="pw-head-title">
        <strong>${esc(headerInfo.title)}</strong>
        ${headerInfo.route ? `<span class="pw-head-route">${ic("route", "pw-icon pw-icon--xs")}${esc(headerInfo.route)}</span>` : ""}
      </p>
      ${pending ? `<span class="pw-head-sync" role="img" aria-label="${pending} ${pending === 1 ? "cambio espera" : "cambios esperan"} señal">${ic("uploadCloud", "pw-icon pw-icon--sm")}${pending}</span>` : ""}
      <button class="pw-head-chip" type="button" data-pw-shift-menu aria-label="${esc(`Turno: ${headerInfo.shift}. Cambiar día o turno`)}">${esc(headerInfo.shift)}<span aria-hidden="true">▾</span></button>
      <button class="pw-head-out" type="button" data-pw-logout>${ic("logOut", "pw-icon pw-icon--sm")}<span>Salir</span></button>
    </header>
  `;
}

const TABS = [
  { id: "ruta", label: "Ruta", icon: "route" },
  { id: "equipo", label: "Equipo", icon: "clipboardCheck" },
  { id: "incidente", label: "Incidente", icon: "alertTriangle" },
  { id: "mas", label: "Más", icon: "more" },
];

function TabBar({ sel, stops }) {
  const equipPending = sel.isToday && stops.length && checklistFor(sel.now.iso, sel.shift).checked.length < checklistItems().length;
  const notices = unseenNotices(sel.now.iso).length;
  const draft = getDraft();
  const badge = { equipo: equipPending ? "!" : "", mas: notices ? String(notices) : "", incidente: draftHasContent(draft) && !draft.enviado ? "•" : "" };
  return `
    <nav class="pw-tabbar" aria-label="Secciones">
      ${TABS.map((tab) => `
        <button class="pw-tab pw-tab--${tab.id} ${view.tab === tab.id ? "is-active" : ""}" type="button" data-pw-tab="${tab.id}" ${view.tab === tab.id ? 'aria-current="page"' : ""}>
          <span class="pw-tab-icon">${ic(tab.icon, "pw-icon")}${badge[tab.id] ? `<b class="pw-tab-badge" aria-hidden="true">${esc(badge[tab.id])}</b>` : ""}</span>
          <span class="pw-tab-label">${tab.label}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

// Señal y errores: visible arriba de todo. Los anuncios para lector de pantalla van por pw-live.
function SyncBar() {
  const pending = registros.pendingCount();
  const photos = fotosPaseo.pendientes();
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const parts = [];
  if (pending || photos || offline) {
    const photoText = photos ? ` ${ic("camera", "pw-icon pw-icon--sm pw-inline-icon")}<b data-pw-photos-pending>${photos} ${photos === 1 ? "foto por subir" : "fotos por subir"}</b>.` : "";
    parts.push(`
      <p class="pw-sync-msg pw-sync-msg--offline">${ic("uploadCloud", "pw-icon")}
        <span>${pending ? `Sin señal: ${pending} ${pending === 1 ? "cambio se envía solo" : "cambios se envían solos"}.` : offline ? "Sin señal: seguí marcando, se envía solo." : "Subiendo lo pendiente."}${photoText}</span>
      </p>
    `);
  }
  if (view.syncError) {
    parts.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${ic("alertTriangle", "pw-icon")}
        <span>${esc(view.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-dismiss-error aria-label="Cerrar aviso">${ic("x", "pw-icon pw-icon--sm")}</button>
      </div>
    `);
  }
  // Sin nada que avisar queda vacío (y oculto), pero la región sigue en su lugar.
  return `<div class="pw-sync" aria-live="polite" data-pw-sync>${parts.join("")}</div>`;
}

function ToastInner() {
  if (!view.toast) return "";
  return `
    <div class="pw-toast">
      ${ic("checkCircle", "pw-icon")}
      <span>${esc(view.toast.text)}</span>
      ${view.toast.undo ? `<button class="pw-toast-undo" type="button" data-pw-toast-undo>${ic("undo", "pw-icon pw-icon--sm")}Deshacer</button>` : ""}
    </div>
  `;
}

let toastTimer = 0;

// Aviso corto abajo; con "Deshacer" por 5 segundos cuando la acción se puede revertir.
function showToast(text, undo = null) {
  clearTimeout(toastTimer);
  view.toast = { text, undo };
  announce(text);
  updateToast();
  toastTimer = setTimeout(() => {
    view.toast = null;
    updateToast();
  }, undo ? 5000 : 3500);
}

function updateToast() {
  const slot = document.querySelector("[data-pw-toast-slot]");
  if (slot) slot.innerHTML = ToastInner();
}

// ---------- pantalla: Ruta ----------

function RouteScreen(ctx) {
  const { sel, plan, stops, progress } = ctx;
  // Ayudante que no figura en ninguna ruta del turno: primero "¿Con qué ruta vas?" (así no se
  // mezclan perros ni "No juntar" de rutas distintas); después, su pantalla filtrada a esa ruta.
  if (isHelper() && sel.isToday && helperNeedsPick(plan)) return HelperRoutePick(ctx);
  if (isHelper() && sel.isToday && plan.shown.length) return HelperScreen(ctx);
  const queue = buildQueue(stops, progress, sel);
  const totals = routeTotals(stops, progress);
  const percent = totals.toWalk ? Math.round((totals.delivered / totals.toWalk) * 100) : 100;
  const notices = unseenNotices(sel.now.iso);

  return `
    <section class="pw-screen" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${sel.isToday ? "Hoy" : esc(sel.day)}${view.shift || !sel.isToday ? ` · ${esc(sel.shift)}` : ""}</h1>
        ${sel.isToday && stops.length ? `<span class="pw-title-count" aria-label="${totals.delivered} de ${totals.toWalk} entregados">${ic("checkCircle", "pw-icon pw-icon--sm")}${totals.delivered}/${totals.toWalk}</span>` : ""}
      </div>
      ${sel.isToday && stops.length ? `<span class="pw-progress-bar" aria-hidden="true"><span style="width:${percent}%"></span></span>` : ""}
      ${RouteChangeBanner()}
      ${PlanningBar(sel)}
      ${RoutePicker(sel, plan)}
      ${plan.shown.length ? `
        ${Hero(queue, ctx)}
        ${AlertStrip(ctx)}
        ${notices.length ? NoticeList(notices) : ""}
        ${NextList(queue, ctx)}
        ${DoneList(queue, ctx)}
      ` : `${EmptyRoute(sel, plan)}${notices.length ? NoticeList(notices) : ""}`}
      ${plan.fromPlanilla ? `<p class="pw-source">${ic("alertCircle", "pw-icon pw-icon--sm")}Ruta de la planilla: falta que la confirme el coordinador.</p>` : ""}
    </section>
  `;
}

function EmptyRoute(sel, plan) {
  const other = sel.shift === "Mañana" ? "Tarde" : "Mañana";
  return `
    <div class="pw-empty">
      ${ic("route", "pw-icon pw-icon--lg")}
      <p><strong>Sin ruta ${sel.isToday ? "hoy" : `el ${sel.day.toLowerCase()}`} a la ${sel.shift.toLowerCase()}.</strong></p>
      <p>Si te pidieron un paseo, avisale al coordinador.</p>
      <div class="pw-row">
        ${plan.elsewhere.length ? "" : `<button class="pw-btn pw-btn--ghost" type="button" data-pw-shift="${other}">Ver ${other.toLowerCase()}</button>`}
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-tab="mas">${ic("calendarCheck", "pw-icon")}Otro día</button>
      </div>
    </div>
  `;
}

function RouteChangeBanner() {
  if (!view.routeChange) return "";
  return `
    <div class="pw-change" data-pw-change>
      ${ic("route", "pw-icon")}
      <p><strong>Cambió la ruta (${esc(view.routeChange.time)})</strong> ${esc(view.routeChange.text)}</p>
      <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-change-ok>OK</button>
    </div>
  `;
}

function PlanningBar(sel) {
  if (!view.day && !view.shift) return "";
  return `
    <div class="pw-planning">
      ${ic("calendarCheck", "pw-icon")}
      <p>${sel.isToday ? "Otro turno" : "No es hoy: solo para mirar"}</p>
      <button class="pw-btn pw-btn--primary pw-btn--sm" type="button" data-pw-today>Volver a hoy</button>
    </div>
  `;
}

// "¿Qué ruta hacés?": solo si el usuario no figura en ninguna ruta del turno.
function RoutePicker(sel, plan) {
  const parts = [];
  if (!plan.assigned && plan.elsewhere.length) {
    const other = plan.elsewhere[0];
    parts.push(`
      <button class="pw-strip pw-strip--info" type="button" data-pw-shift="${other.turno}">
        ${ic("route", "pw-icon")}<span>Tu ruta: <b>${esc(other.ruta)}</b> (${other.turno.toLowerCase()})</span>${ic("arrowRight", "pw-icon pw-icon--sm")}
      </button>
    `);
  }
  if (!plan.assigned && plan.ofShift.length > 1) {
    parts.push(`
      <div class="pw-route-pick" role="group" aria-labelledby="pw-route-pick-label">
        <p id="pw-route-pick-label"><strong>${isHelper() ? "¿Con qué ruta vas?" : "¿Qué ruta hacés?"}</strong></p>
        <div class="pw-chip-row">
          ${plan.ofShift.map((route) => `
            <button type="button" class="pw-chip ${plan.picked === route.ruta ? "is-active" : ""}" data-pw-route="${esc(route.ruta)}" aria-pressed="${plan.picked === route.ruta}">
              ${esc(route.ruta)}<small>${route.stops.length} ${route.stops.length === 1 ? "perro" : "perros"}</small>
            </button>
          `).join("")}
          ${isHelper() ? "" : `<button type="button" class="pw-chip ${plan.picked ? "" : "is-active"}" data-pw-route="" aria-pressed="${!plan.picked}">Todas<small>${plan.ofShift.length}</small></button>`}
        </div>
      </div>
    `);
  }
  return parts.join("");
}

// Lo primero (máximo 3): seguridad del grupo, bozales, perros a confirmar y equipo.
function AlertStrip({ sel, plan, stops }, { skipEquip = false } = {}) {
  const items = [];
  const dogs = stops.map((stop) => stop.dog);
  const conflicts = conflictsFor(dogs);
  if (conflicts.length) {
    items.push(`<p class="pw-strip pw-strip--danger">${ic("alertTriangle", "pw-icon")}<span><b>No juntar:</b> ${esc(groupConflicts(conflicts).join(" · "))}</span></p>`);
  }
  const muzzled = dogs.filter(usesMuzzle);
  if (muzzled.length) {
    const own = muzzleShort(muzzled);
    items.push(`<p class="pw-strip pw-strip--warn">${ic("shieldCheck", "pw-icon")}<span><b>Bozal:</b> ${esc(listNames(muzzled.map((dog) => dog.name)))}${own !== null ? ` · tenés ${own}, avisá a Juan` : ""}</span></p>`);
  }
  const flagged = stops.filter((stop) => stop.dog.status !== "Activo");
  if (flagged.length) {
    items.push(`<p class="pw-strip pw-strip--warn">${ic("alertCircle", "pw-icon")}<span><b>Confirmar antes de retirar:</b> ${esc(listNames(flagged.map((stop) => stop.dog.name)))}</span></p>`);
  }
  if (sel.isToday && stops.length && !skipEquip) {
    const checked = checklistFor(sel.now.iso, sel.shift).checked.length;
    const total = checklistItems().length;
    if (checked < total) {
      items.push(`
        <button class="pw-strip pw-strip--idle" type="button" data-pw-tab="equipo">
          ${ic("clipboardCheck", "pw-icon")}<span><b>Equipo ${checked}/${total}</b></span>${ic("arrowRight", "pw-icon pw-icon--sm")}
        </button>
      `);
    }
  }
  const notes = plan.shown.filter((route) => route.notas).map((route) => `${plan.shown.length > 1 ? `${route.ruta}: ` : ""}${route.notas}`);
  const list = items.slice(0, 3);
  const water = sel.isToday && !isHelper() ? groupWater(sel, plan) : "";
  if (water) list.push(water);
  if (notes.length) list.push(`<p class="pw-strip pw-strip--info">${ic("fileText", "pw-icon")}<span><b>Nota:</b> ${esc(notes.join(" · "))}</span></p>`);
  return list.length ? `<div class="pw-strips">${list.join("")}</div>` : "";
}

// Cola del turno, como una app de reparto: lo que sigue según la hora (retiros y entregas juntos).
function buildQueue(stops, progress, sel) {
  const active = [];
  const done = [];
  stops.forEach((stop) => {
    const state = stateOf(progress, stop);
    const entry = { stop, state };
    if (!sel.isToday) return active.push({ ...entry, kind: "plan", time: stop.hora });
    if (!stop.canSave) return active.push({ ...entry, kind: "blocked", time: stop.hora });
    if (state.noSale) return done.push({ ...entry, kind: "nosale", time: stop.hora });
    if (state.step >= STEPS.length) return done.push({ ...entry, kind: "done", time: state.times[STEPS.length - 1] });
    if (state.step === 0) return active.push({ ...entry, kind: "pickup", time: stop.hora });
    // Lo lleva el ayudante ("Voy a entregar"): queda al final, para que el paseador siga con el resto.
    const handoff = state.record?.devuelvePor && !isMe(state.record.devuelvePor);
    // Retirado sin foto: lo que sigue es la foto del paseo (a la hora del retiro).
    if (state.step === 1) return active.push({ ...entry, kind: "photo", handoff, time: state.times[0] || stop.hora });
    return active.push({ ...entry, kind: "deliver", handoff, time: deliveryTime(stop, state) });
  });
  if (sel.isToday) {
    const rank = (entry) => ({ photo: 0, deliver: 1, pickup: 2 })[entry.kind] ?? 3;
    const last = (entry) => (entry.kind === "blocked" ? 2 : entry.handoff ? 1 : 0);
    active.sort((a, b) => last(a) - last(b) || (minutesOf(a.time) ?? 9999) - (minutesOf(b.time) ?? 9999) || rank(a) - rank(b));
  }
  return { active, done };
}

// El perro de la tarjeta grande: el primero que no está bloqueado ni lo lleva el ayudante.
function heroEntry(queue, sel) {
  if (!sel.isToday) return queue.active[0] || null;
  return queue.active.find((item) => item.kind !== "blocked" && !item.handoff) || queue.active.find((item) => item.kind !== "blocked") || null;
}

// Entrega prevista = retiro real + minutos del paseo (la misma cuenta que usa el supervisor para
// "Entrega demorada"). Así un perro que se retiró tarde no aparece "Entrega tarde" apenas se marca
// "Retiré". Sin hora de retiro, la salida de la ruta.
function deliveryTime(stop, state) {
  const start = state.times[0] || state.times[1];
  if (!start || !stop.minutos || minutesOf(start) === null) return stop.salida;
  return sumarMinutos(start, stop.minutos);
}

function isLate(entry, sel) {
  if (!sel.isToday || !["pickup", "deliver"].includes(entry.kind)) return false;
  return countdown(entry.time, sel.now.minutes).kind === "late";
}

// Hora prevista y si ya está atrasado: el reloj redibuja cuando cambia.
function dueAttrs(entry, sel) {
  if (!sel.isToday || !["pickup", "deliver"].includes(entry.kind) || minutesOf(entry.time) === null) return "";
  return `data-pw-due="${esc(entry.time)}" data-pw-late="${isLate(entry, sel) ? 1 : 0}"`;
}

// Chip de estado: siempre con texto (no solo color).
function StatusChip(entry, sel) {
  const { kind, state } = entry;
  let chip;
  if (kind === "plan") chip = { tone: "idle", text: "Planificado" };
  else if (kind === "blocked") chip = { tone: "warn", text: "Sin id" };
  else if (kind === "nosale") chip = { tone: "idle", text: "No sale" };
  else if (kind === "done") chip = { tone: "ok", text: `Entregado${entry.time ? ` ${entry.time}` : ""}` };
  else if (kind === "photo") chip = { tone: "run", text: `Retirado${state.times[0] ? ` ${state.times[0]}` : ""}` };
  else if (isLate(entry, sel)) chip = { tone: "late", text: kind === "deliver" ? "Entrega tarde" : "Atrasado" };
  else if (kind === "deliver") chip = { tone: "run", text: "En paseo" };
  else chip = { tone: "idle", text: "Pendiente" };
  return `<span class="pw-chip-st pw-chip-st--${chip.tone}">${esc(chip.text)}</span>`;
}

// Ayudante y foto del paseo en cada perro: "Integrado por …", "Lo entrega …", foto chiquita,
// "Foto por subir" (sin señal) y "Sin foto del paseo" (se entregó sin foto).
function WalkChips(entry, names, { thumb = true, compact = false } = {}) {
  const record = entry.state?.record;
  if (!record || entry.state.noSale) return "";
  const step = entry.state.step;
  const chips = [];
  // En la lista va solo el primer nombre (la tarjeta no crece); en la grande y el detalle, completo.
  const who = (usuario, nombre) => {
    if (isMe(usuario)) return "";
    const full = String(nombre || personName(usuario, names) || "");
    return compact ? full.split(/\s+/)[0] : full;
  };
  const src = thumb && step >= 2 ? walkThumbOf(record) : "";
  if (src) chips.push(`<span class="pw-walkthumb"><img src="${esc(src)}" alt="Foto del paseo" /></span>`);
  if (record.fotoPendiente === true && step >= 2) chips.push(`<span class="pw-chip-st pw-chip-st--warn">${ic("uploadCloud", "pw-icon pw-icon--xs")}Foto por subir</span>`);
  if (step >= STEPS.length && !hasWalkPhoto(record) && (record.sinFotoPaseo === true || !record.horaPaseo)) {
    chips.push(`<span class="pw-chip-st pw-chip-st--warn">${ic("camera", "pw-icon pw-icon--xs")}Sin foto del paseo</span>`);
  }
  if (record.horaIntegrado && step < STEPS.length) {
    const name = who(record.horaIntegradoPor, record.horaIntegradoPorNombre);
    chips.push(`<span class="pw-chip-st pw-chip-st--ok">${ic("users", "pw-icon pw-icon--xs")}${esc(name ? `Integrado por ${name}` : "Integrado")}</span>`);
  }
  if (record.devuelvePor && step < STEPS.length) {
    const name = who(record.devuelvePor, record.devuelvePorNombre);
    chips.push(`<span class="pw-chip-st pw-chip-st--run">${ic("arrowRight", "pw-icon pw-icon--xs")}${esc(name ? `Lo entrega ${name}` : "Lo entregás vos")}</span>`);
  }
  if (step >= STEPS.length && record.horaEntregaPor && !isMe(record.horaEntregaPor)) {
    chips.push(`<span class="pw-chip-st pw-chip-st--soft">${esc(`Lo entregó ${who(record.horaEntregaPor, record.horaEntregaPorNombre)}`)}</span>`);
  }
  return chips.join("");
}

// Bozal y "no juntar" a la vista en cada tarjeta.
function SafetyChips(dog, partners, { long = false, compact = false } = {}) {
  const chips = [];
  if (dog.status !== "Activo") chips.push(`<span class="pw-chip-st pw-chip-st--warn">Confirmar</span>`);
  if ((dog.safety || []).some((text) => safetyKind(text) === "danger") || partners.length) {
    chips.push(`<span class="pw-chip-st pw-chip-st--late">${ic("alertTriangle", "pw-icon pw-icon--xs")}No juntar${partners.length && !compact ? `: ${esc(listNames(partners))}` : ""}</span>`);
  }
  if (usesMuzzle(dog)) chips.push(`<span class="pw-chip-st pw-chip-st--warn">${ic("shieldCheck", "pw-icon pw-icon--xs")}Bozal</span>`);
  if (dog.unknown) chips.push(`<span class="pw-chip-st pw-chip-st--warn">Nuevo</span>`);
  if (long) {
    (dog.safety || []).filter((text) => safetyKind(text) === "info").forEach((text) => chips.push(`<span class="pw-chip-st pw-chip-st--soft">${esc(text)}</span>`));
  }
  return chips.join("");
}

function routePartners(stop, stops) {
  return partnersInList(stop.dog, conflictsFor(stops.map((item) => item.dog)));
}

// Quién marcó el último paso, si fue otra persona (así paseador y ayudante se reparten la ruta).
function otherMarker(entry, names) {
  const { state } = entry;
  for (let index = Math.min(state.step, STEPS.length) - 1; index >= 0; index -= 1) {
    const marker = markerOf(state.record, index, names);
    if (marker) return `${STEPS[index].done}: ${marker}`;
    if (state.times[index]) return "";
  }
  return "";
}

function StepButton(entry, where, { size = "xl", ghost = false } = {}) {
  const { stop, kind } = entry;
  if (!["pickup", "deliver", "photo"].includes(kind)) return "";
  // Retirado: el botón principal es la cámara; "Entregué" queda como secundario (la foto no bloquea).
  if (kind === "photo" && !ghost) return WalkPhotoButton(stop, where, size);
  const pickup = kind === "pickup";
  const label = loaded.ready ? (pickup ? "Retiré" : "Entregué") : "Cargando…";
  return `
    <button class="pw-btn ${ghost ? "pw-btn--ghost" : "pw-btn--go"} pw-btn--${size} ${pickup ? "" : "pw-btn--deliver"}" type="button" data-pw-step="${esc(stop.dog.id)}" data-pw-where="${where}" ${loaded.ready ? "" : 'aria-disabled="true"'} aria-label="${esc(`${pickup ? "Retiré" : "Entregué"}: ${stop.dog.name}`)}">
      ${ic(pickup ? "pawPrint" : "check", "pw-icon")}${label}
    </button>
  `;
}

// "Foto del paseo": botón de cámara (abre la cámara de atrás del celular). Sacarla marca el paseo.
function WalkPhotoButton(stop, where, size = "xl", { ghost = false, label = "" } = {}) {
  const id = stop.dog.id;
  const busy = Boolean(view.walkBusy[id]);
  const off = busy || !loaded.ready;
  const text = busy ? "Guardando…" : label || (size === "row" ? "Foto paseo" : "Foto del paseo");
  return `
    <label class="pw-btn ${ghost ? "pw-btn--ghost" : "pw-btn--go"} pw-btn--${size} pw-walk-btn ${busy ? "is-busy" : ""}" ${off ? 'aria-disabled="true"' : ""}>
      <input class="pw-file" type="file" accept="image/*" capture="environment" data-pw-walkphoto="${esc(id)}" data-pw-where="${where}" ${off ? "disabled" : ""} aria-label="${esc(`Foto del paseo: ${stop.dog.name}`)}" />
      ${ic("camera", "pw-icon")}<span>${esc(text)}</span>
    </label>
  `;
}

function Hero(queue, ctx) {
  const { sel, stops, names } = ctx;
  const entry = heroEntry(queue, sel);
  if (!entry) {
    if (!queue.done.length) return "";
    return `
      <article class="pw-hero pw-hero--done">
        ${ic("checkCircle", "pw-icon pw-icon--xl")}
        <h2>Ruta completa</h2>
        <p>¡Buen trabajo!</p>
      </article>
    `;
  }
  const { stop, kind } = entry;
  const { dog } = stop;
  const late = isLate(entry, sel);
  const kicker = { pickup: "Retirar", deliver: "Entregar", photo: "Foto del paseo", plan: "Primer retiro" }[kind];
  const marker = otherMarker(entry, names);
  const note = stopNote(stop);
  const group = kind === "pickup" ? queue.active.filter((item) => item !== entry && item.kind === "pickup" && item.time && item.time === entry.time) : [];

  return `
    <article class="pw-hero pw-hero--${kind} ${late ? "is-late" : ""}" aria-labelledby="pw-hero-name" ${dueAttrs(entry, sel)}>
      <div class="pw-hero-top">
        ${AvatarControl(dog, "xl", "hero")}
        <div class="pw-hero-info">
          <p class="pw-hero-kicker">${kicker}${stops.length && isMulti(ctx) ? ` · ${esc(stop.route.ruta)}` : ""}</p>
          <h2 class="pw-hero-name" id="pw-hero-name">
            <button class="pw-link" type="button" data-pw-open="${esc(dog.id)}" data-pw-where="hero-name" ${dog.id ? "" : "disabled"}>${esc(dog.name)}</button>
          </h2>
          <p class="pw-hero-time">${esc(entry.time || "Sin hora")}</p>
          ${sel.isToday && kind !== "photo" ? Countdown(entry.time, sel.now.minutes) : ""}
        </div>
      </div>
      <div class="pw-chips">${kind === "pickup" ? "" : StatusChip(entry, sel)}${WalkChips(entry, names)}${SafetyChips(dog, routePartners(stop, stops))}</div>
      ${marker ? `<p class="pw-hero-note">${ic("users", "pw-icon pw-icon--sm")}${esc(marker)}</p>` : ""}
      ${note ? `<p class="pw-hero-note">${ic("fileText", "pw-icon pw-icon--sm")}${esc(note)}</p>` : ""}
      ${group.length ? `<p class="pw-hero-note">${ic("clock", "pw-icon pw-icon--sm")}A la misma hora: ${esc(listNames(group.map((item) => item.stop.dog.name)))}</p>` : ""}
      ${sel.isToday ? `
        <div class="pw-hero-actions">
          ${StepButton(entry, "hero")}
        </div>
        <div class="pw-hero-more">
          ${kind === "pickup" ? `<button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-nosale="${esc(dog.id)}" ${loaded.ready ? "" : 'aria-disabled="true"'}>${ic("x", "pw-icon pw-icon--sm")}No sale</button>` : ""}
          ${kind === "photo" ? StepButton(entry, "hero-more", { size: "sm", ghost: true }) : ""}
          <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-open="${esc(dog.id)}" data-pw-where="hero-detail">${ic("eye", "pw-icon pw-icon--sm")}Detalle</button>
        </div>
      ` : ""}
    </article>
  `;
}

function isMulti({ plan }) {
  return plan.shown.length > 1;
}

function RowCard(entry, ctx, { actions = true } = {}) {
  const { sel, stops, names } = ctx;
  const { stop, kind } = entry;
  const { dog } = stop;
  const late = isLate(entry, sel);
  const multi = isMulti(ctx);
  // Lo lleva el ayudante: sin botón (si hace falta, "Entregué" está en el detalle).
  const showAction = actions && sel.isToday && !entry.handoff;
  return `
    <li class="pw-row-card pw-row-card--${kind} ${late ? "is-late" : ""}" ${dueAttrs(entry, sel)}>
      ${AvatarControl(dog, "md", "row")}
      ${dog.id ? `<button class="pw-row-body" type="button" data-pw-open="${esc(dog.id)}" data-pw-where="row">` : `<div class="pw-row-body">`}
        <span class="pw-row-name">${esc(dog.name)}</span>
        <span class="pw-row-meta"><b class="pw-row-time">${esc(entry.time || "--:--")}</b>${multi ? `<small>${esc(stop.route.ruta)}</small>` : ""}${StatusChip(entry, sel)}</span>
        <span class="pw-row-chips">${WalkChips(entry, names, { compact: true })}${SafetyChips(dog, routePartners(stop, stops), { compact: true })}</span>
      ${dog.id ? "</button>" : "</div>"}
      ${showAction ? `<div class="pw-row-act">${StepButton(entry, "row", { size: "row" })}</div>` : ""}
    </li>
  `;
}

function NextList(queue, ctx) {
  const { sel } = ctx;
  const hero = heroEntry(queue, sel);
  const rest = queue.active.filter((item) => item !== hero);
  if (!rest.length) return "";
  return `
    <section class="pw-list" aria-labelledby="pw-next-title">
      <h2 class="pw-list-title" id="pw-next-title">Siguientes <span class="pw-count">${rest.length}</span></h2>
      <ol class="pw-rows" role="list">
        ${rest.map((entry) => RowCard(entry, ctx)).join("")}
      </ol>
      ${rest.some((item) => item.kind === "blocked") ? `<p class="pw-source">${ic("alertCircle", "pw-icon pw-icon--sm")}"Sin id": no se puede marcar. Avisá al coordinador.</p>` : ""}
    </section>
  `;
}

function DoneList(queue, ctx) {
  if (!queue.done.length) return "";
  const open = view.open.done;
  return `
    <section class="pw-list pw-list--done">
      <button class="pw-fold" type="button" data-pw-fold="done" aria-expanded="${open}" aria-controls="pw-done-list">
        ${ic("checkCircle", "pw-icon")}<span>Listos <span class="pw-count is-ok">${queue.done.length}</span></span>${ic("chevronDown", "pw-icon pw-fold-icon")}
      </button>
      <ol class="pw-rows" role="list" id="pw-done-list" ${open ? "" : "hidden"}>
        ${queue.done.map((entry) => RowCard(entry, ctx, { actions: false })).join("")}
      </ol>
    </section>
  `;
}

// Nota de la ruta que no repite lo que ya dicen las alertas del perro.
function stopNote(stop) {
  if (!stop.nota) return "";
  if (/^bozal$/i.test(stop.nota) && usesMuzzle(stop.dog)) return "";
  if (/^no juntar/i.test(stop.nota) && stop.dog.safety.some((text) => safetyKind(text) === "danger")) return "";
  return stop.nota;
}

// ---------- pantalla: Ruta del ayudante ----------
// Sus tareas (definidas por Juan): integrar, devolver de a 2, agua, botiquín y cruce o perro suelto.
// Fotos de los perros, botones grandes y casi sin texto. Levantar caca no se registra.

// Paseador: última agua del grupo (la marca el ayudante de su ruta).
function groupWater(sel, plan) {
  const routes = plan.shown.filter((route) => route.ayudante && !isMe(route.ayudante));
  if (!routes.length) return "";
  const names = teamNames(sel.now.iso);
  const last = routes
    .map((route) => ({ hora: watersOf(waterRecord(sel.now.iso, sel.shift, route.ayudante)).pop() || "", who: personName(route.ayudante, names) }))
    .sort((a, b) => (minutesOf(b.hora) ?? -1) - (minutesOf(a.hora) ?? -1))[0];
  if (!last.hora) return `<p class="pw-strip pw-strip--idle">${ic("droplets", "pw-icon")}<span><b>Agua:</b> todavía no</span></p>`;
  return `<p class="pw-strip pw-strip--info">${ic("droplets", "pw-icon")}<span><b>Última agua ${esc(last.hora)}</b> · ${esc(last.who)}</span></p>`;
}

// El ayudante tiene que elegir ruta si no figura en ninguna del turno y hay más de una.
function helperNeedsPick(plan) {
  return !plan.assigned && !plan.picked && plan.ofShift.length > 1;
}

// "¿Con qué ruta vas?": una tarjeta grande por ruta (paseador, perros y primer retiro).
function HelperRoutePick({ sel, plan, names }) {
  const other = plan.elsewhere[0];
  return `
    <section class="pw-screen pw-helper" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">¿Con qué ruta vas?</h1>
      </div>
      ${RouteChangeBanner()}
      ${PlanningBar(sel)}
      ${other ? `
        <button class="pw-strip pw-strip--info" type="button" data-pw-shift="${other.turno}">
          ${ic("route", "pw-icon")}<span>Tu ruta: <b>${esc(other.ruta)}</b> (${other.turno.toLowerCase()})</span>${ic("arrowRight", "pw-icon pw-icon--sm")}
        </button>
      ` : ""}
      <div class="pw-route-cards" role="group" aria-labelledby="pw-tab-title">
        ${plan.ofShift.map((route) => {
          const walker = firstWord(personName(route.paseador, names));
          const first = route.stops.find((stop) => stop.hora)?.hora || "";
          return `
            <button type="button" class="pw-route-card" data-pw-route="${esc(route.ruta)}">
              <span class="pw-route-card-name">${ic("route", "pw-icon")}${esc(route.ruta)}</span>
              <span class="pw-route-card-meta">${walker ? `Con <b>${esc(walker)}</b>` : "Paseador: Pendiente de confirmar"}</span>
              <span class="pw-route-card-meta">${ic("pawPrint", "pw-icon pw-icon--sm")}${route.stops.length} ${route.stops.length === 1 ? "perro" : "perros"}${first ? ` · desde ${esc(first)}` : ""}</span>
            </button>
          `;
        }).join("")}
      </div>
      <p class="pw-source">${ic("alertCircle", "pw-icon pw-icon--sm")}Queda guardada en este celular. Si no sabés, preguntale al coordinador.</p>
    </section>
  `;
}

function HelperScreen(ctx) {
  if (view.helper.herd) return HerdScreen(ctx);
  if (view.helper.cure) return CureScreen(ctx);
  const { sel, plan } = ctx;
  const groups = helperGroups(ctx);
  const empty = groups.active.length === 0;
  const checklist = empty ? HelperChecklist(sel) : "";
  // Eligió la ruta en este celular (no figura asignado): puede cambiarla.
  const canChange = !plan.assigned && plan.picked && plan.ofShift.length > 1;
  return `
    <section class="pw-screen pw-helper" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">Manada</h1>
        <span class="pw-title-count" aria-label="${groups.active.length} ${groups.active.length === 1 ? "perro" : "perros"} en la manada">${ic("pawPrint", "pw-icon pw-icon--sm")}${groups.active.length}</span>
        ${canChange ? `<button class="pw-btn pw-btn--ghost pw-btn--sm pw-title-end" type="button" data-pw-route="">${ic("route", "pw-icon pw-icon--sm")}Cambiar ruta</button>` : ""}
      </div>
      ${RouteChangeBanner()}
      ${PlanningBar(sel)}
      ${empty ? PickupCard(groups, ctx) : ""}
      ${checklist}
      ${IntegrateList(groups, ctx)}
      ${DeliveringList(groups, ctx)}
      ${HelperActions(groups, sel)}
      ${ReturnPicker(groups)}
      ${NoPhotoList(groups)}
      ${AlertStrip(ctx, { skipEquip: Boolean(checklist) })}
      ${empty ? "" : NextPickup(groups)}
    </section>
  `;
}

// Manada vacía: el próximo perro que retira el paseador, con sus alertas (bozal, no juntar).
function PickupCard(groups, ctx) {
  const next = groups.next[0];
  if (!next) return "";
  const { stop } = next;
  const more = groups.next.length - 1;
  return `
    <article class="pw-hcard pw-hcard--next" aria-labelledby="pw-next-pickup">
      <div class="pw-hcard-top">
        ${Avatar(stop.dog, "lg")}
        <div class="pw-hcard-info">
          <p class="pw-hero-kicker">Por retirar</p>
          <h2 class="pw-hcard-name" id="pw-next-pickup">${esc(stop.dog.name)} <span class="pw-hcard-time">${esc(stop.hora || "Sin hora")}</span></h2>
          <div class="pw-chips">${SafetyChips(stop.dog, routePartners(stop, ctx.stops), { compact: true })}</div>
          ${more > 0 ? `<p class="pw-hcard-meta">Después: ${more} más</p>` : ""}
        </div>
      </div>
    </article>
  `;
}

// Checklist corto del ayudante arriba de la Manada (4 interruptores + "Listo"), mientras falte.
function HelperChecklist(sel) {
  const { checked } = checklistFor(sel.now.iso, sel.shift);
  if (checked.length >= HELPER_ITEMS.length) return "";
  return `
    <section class="pw-hsec pw-hcheck" aria-labelledby="pw-hcheck-title">
      <h2 class="pw-list-title" id="pw-hcheck-title">Antes de salir <span class="pw-count">${checked.length}/${HELPER_ITEMS.length}</span></h2>
      <div class="pw-switch-grid">${HELPER_ITEMS.map((row) => EquipSwitch(row, checked)).join("")}</div>
      <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-equip-all>${ic("check", "pw-icon")}Listo</button>
    </section>
  `;
}

// 1. Integrar: lo que el paseador marcó "Retiré" y todavía no se integró.
function IntegrateList(groups, ctx) {
  if (!groups.toIntegrate.length) return "";
  return `
    <section class="pw-hsec" aria-labelledby="pw-int-title">
      <h2 class="pw-list-title" id="pw-int-title">Integrar <span class="pw-count">${groups.toIntegrate.length}</span></h2>
      <p class="pw-hint">${ic("users", "pw-icon pw-icon--sm")}Que se olfateen y caminá la primera cuadra con él</p>
      ${groups.toIntegrate.map(({ stop, state }) => {
        const { dog } = stop;
        const by = markerOf(state.record, 0, ctx.names);
        return `
          <article class="pw-hcard">
            <div class="pw-hcard-top">
              ${AvatarControl(dog, "xl", "int")}
              <div class="pw-hcard-info">
                <h3 class="pw-hcard-name">${esc(dog.name)}</h3>
                <p class="pw-hcard-meta">Retirado ${esc(state.times[0] || "")}${by ? ` · ${esc(by)}` : ""}</p>
                <div class="pw-chips">${SafetyChips(dog, routePartners(stop, ctx.stops), { compact: true })}</div>
              </div>
            </div>
            <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-integrate="${esc(dog.id)}" ${loaded.ready ? "" : 'aria-disabled="true"'} aria-label="${esc(`Integrado: ${dog.name}`)}">${ic("check", "pw-icon")}Integrado</button>
          </article>
        `;
      }).join("")}
    </section>
  `;
}

// 2b. Los que el ayudante está devolviendo ("Voy a entregar"): "Entregado" en cada uno.
function DeliveringList(groups) {
  if (!groups.delivering.length) return "";
  return `
    <section class="pw-hsec" aria-labelledby="pw-dev-title">
      <h2 class="pw-list-title" id="pw-dev-title">Entregando <span class="pw-count">${groups.delivering.length}</span></h2>
      <ol class="pw-rows" role="list">
        ${groups.delivering.map(({ stop, state }) => {
          const { dog } = stop;
          const back = deliveryTime(stop, state);
          return `
            <li class="pw-row-card pw-row-card--deliver">
              ${Avatar(dog, "md")}
              <div class="pw-row-body pw-row-body--static">
                <span class="pw-row-name">${esc(dog.name)}</span>
                ${back ? `<span class="pw-row-meta"><b class="pw-row-time">${esc(back)}</b></span>` : ""}
              </div>
              <div class="pw-row-act">
                <button class="pw-btn pw-btn--go pw-btn--row" type="button" data-pw-step="${esc(dog.id)}" data-pw-where="ret" ${loaded.ready ? "" : 'aria-disabled="true"'} aria-label="${esc(`Entregado: ${dog.name}`)}">${ic("check", "pw-icon")}Entregado</button>
              </div>
            </li>
          `;
        }).join("")}
      </ol>
      <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-return-cancel>${ic("undo", "pw-icon pw-icon--sm")}No los llevo</button>
    </section>
  `;
}

// 3 a 5. Agua, botiquín y cruce o perro suelto: tres botones grandes, siempre a mano.
function HelperActions(groups, sel) {
  const record = waterRecord(sel.now.iso, sel.shift);
  const aguas = watersOf(record);
  const last = aguas[aguas.length - 1] || "";
  const hot = heatOn(sel, record);
  // Recordatorio suave con calor: más de 40 minutos desde la última agua (o desde el primer retiro).
  const firstPickup = groups.active.map((item) => item.state.times[0]).filter((hora) => minutesOf(hora) !== null).sort((a, b) => minutesOf(a) - minutesOf(b))[0];
  const from = last || firstPickup || "";
  const since = from ? sel.now.minutes - minutesOf(from) : null;
  const remind = hot && since !== null && since > WATER_REMINDER_MIN && groups.active.length > 0;
  return `
    <div class="pw-hact" role="group" aria-label="Tareas">
      <button class="pw-hact-btn pw-hact-btn--water ${remind ? "is-due" : ""}" type="button" data-pw-water>
        ${ic("droplets", "pw-icon")}<span>Di agua</span>
      </button>
      <button class="pw-hact-btn pw-hact-btn--cure" type="button" data-pw-cure-open>
        ${ic("briefcaseMedical", "pw-icon")}<span>Curación</span>
      </button>
      <button class="pw-hact-btn pw-hact-btn--herd" type="button" data-pw-herd-open>
        ${ic("alertTriangle", "pw-icon")}<span>Cruce o perro suelto</span>
      </button>
    </div>
    <div class="pw-water-row">
      <p class="pw-water-last" data-pw-water-last>${ic("droplets", "pw-icon pw-icon--sm")}${last ? `Última agua: <b>${esc(last)}</b>` : "Sin agua todavía"}</p>
      <button class="pw-pick pw-heat ${record?.calor === true ? "is-on" : ""}" type="button" data-pw-heat aria-pressed="${record?.calor === true}">Hace calor</button>
    </div>
    ${remind ? `<p class="pw-strip pw-strip--warn">${ic("droplets", "pw-icon")}<span>Hace calor: ${durationText(since)} sin agua. Ofreceles.</span></p>` : ""}
  `;
}

// 2. Devolver: tocar las fotos (máximo 2) → "Voy a entregar".
function ReturnPicker(groups) {
  if (!groups.returnable.length) return "";
  const count = groups.picks.length;
  const full = groups.room === 0;
  return `
    <section class="pw-hsec" aria-labelledby="pw-ret-title">
      <h2 class="pw-list-title" id="pw-ret-title">Devolver <span class="pw-max">máx. ${MAX_RETURN}</span></h2>
      <div class="pw-dog-grid" role="group" aria-labelledby="pw-ret-title">
        ${groups.returnable.map(({ stop }) => {
          const { dog } = stop;
          const on = groups.picks.includes(dog.id);
          return `
            <button type="button" class="pw-dog-pick pw-ret-pick ${on ? "is-on" : ""}" data-pw-return-pick="${esc(dog.id)}" aria-pressed="${on}" ${full || (!on && count >= groups.room) ? 'aria-disabled="true"' : ""}>
              ${Avatar(dog, "lg")}
              <span>${esc(dog.name)}</span>
              <span class="pw-dog-pick-mark" aria-hidden="true">${on ? ic("check", "pw-icon pw-icon--sm") : ""}</span>
            </button>
          `;
        }).join("")}
      </div>
      <p class="pw-status ${view.helper.status ? "is-warn" : ""}" role="status" data-pw-helper-status>${esc(view.helper.status)}</p>
      <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-return-go ${count && loaded.ready ? "" : 'aria-disabled="true"'}>${ic("arrowRight", "pw-icon")}Voy a entregar${count ? ` (${count})` : ""}</button>
    </section>
  `;
}

// Integrados que todavía no tienen la foto del paseo (la puede sacar el ayudante).
function NoPhotoList(groups) {
  if (!groups.noPhoto.length) return "";
  return `
    <section class="pw-hsec" aria-labelledby="pw-nophoto-title">
      <h2 class="pw-list-title" id="pw-nophoto-title">${ic("camera", "pw-icon pw-icon--sm")}Foto del paseo</h2>
      <div class="pw-row">
        ${groups.noPhoto.map(({ stop }) => WalkPhotoButton(stop, "nophoto", "lg", { ghost: true, label: stop.dog.name })).join("")}
      </div>
    </section>
  `;
}

function NextPickup(groups) {
  const next = groups.next[0];
  if (!next) return "";
  const more = groups.next.length - 1;
  return `<p class="pw-source">${ic("clock", "pw-icon pw-icon--sm")}<span>Próximo retiro: <b>${esc(next.stop.dog.name)}</b>${next.stop.hora ? ` ${esc(next.stop.hora)}` : ""}${more > 0 ? ` · ${more} más` : ""}</span></p>`;
}

// 4. Botiquín: perro (fotos) → qué tiene → agua oxigenada y gasa → "Listo". "Es más grave" abre el incidente.
function CureScreen(ctx) {
  const cure = view.helper.cure;
  const groups = helperGroups(ctx);
  const pool = groups.active.length ? groups.active.map((item) => item.stop) : ctx.stops.filter((stop) => stop.canSave);
  const stop = cure.dogId ? ctx.stops.find((item) => item.dog.id === cure.dogId) : null;
  const grave = `<button class="pw-btn pw-btn--danger pw-btn--xl" type="button" data-pw-cure-grave>${ic("alertTriangle", "pw-icon")}Es más grave</button>`;
  let body;
  if (!stop) {
    body = `
      <fieldset class="pw-q">
        <legend>¿Qué perro?</legend>
        <div class="pw-dog-grid">
          ${pool.map((item) => `
            <button type="button" class="pw-dog-pick pw-ret-pick" data-pw-cure-dog="${esc(item.dog.id)}">
              ${Avatar(item.dog, "lg")}
              <span>${esc(item.dog.name)}</span>
            </button>
          `).join("")}
        </div>
      </fieldset>
      ${grave}
    `;
  } else {
    body = `
      <div class="pw-cure-dog">
        ${Avatar(stop.dog, "md")}
        <p class="pw-hcard-name">${esc(stop.dog.name)}</p>
      </div>
      <fieldset class="pw-q">
        <legend>¿Qué tiene?</legend>
        <div class="pw-chip-grid">
          ${CURE_TYPES.map((tipo) => `<button type="button" class="pw-pick ${cure.tipos.includes(tipo) ? "is-on" : ""}" data-pw-cure-tipo="${esc(tipo)}" aria-pressed="${cure.tipos.includes(tipo)}">${esc(tipo)}</button>`).join("")}
        </div>
      </fieldset>
      <div class="pw-switch-list">
        <button class="pw-switch ${cure.gasa ? "is-on" : ""}" type="button" data-pw-cure-gasa aria-pressed="${cure.gasa}">
          <span class="pw-switch-icon">${ic("briefcaseMedical", "pw-icon")}</span>
          <span class="pw-switch-label">Agua oxigenada y gasa</span>
          <span class="pw-switch-mark" aria-hidden="true">${cure.gasa ? ic("check", "pw-icon") : ""}</span>
        </button>
      </div>
      <p class="pw-status ${view.helper.status ? "is-warn" : ""}" role="status" data-pw-helper-status>${esc(view.helper.status)}</p>
      <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-cure-ok>${ic("check", "pw-icon")}Listo</button>
      ${grave}
    `;
  }
  return `
    <section class="pw-screen pw-cure" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${ic("briefcaseMedical", "pw-icon")}Curación</h1>
        <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-cure-back>${ic("arrowLeft", "pw-icon pw-icon--sm")}Volver</button>
      </div>
      ${body}
    </section>
  `;
}

// 5. Se cruza otra manada o un perro suelto: dos líneas grandes y, si hace falta, aviso por WhatsApp.
// No hay teléfonos del equipo cargados (Pendiente de confirmar): el enlace abre WhatsApp y se elige el chat.
function HerdScreen(ctx) {
  const route = helperRoute(ctx.plan) || ctx.plan.shown[0];
  const text = `Paseos Juan: cruce con otra manada o un perro suelto${route ? ` (ruta ${route.ruta})` : ""}. Dividamos los perros y pasemos de a grupos.`;
  return `
    <section class="pw-screen pw-herd" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${ic("alertTriangle", "pw-icon")}Cruce o perro suelto</h1>
      </div>
      <ol class="pw-herd-lines">
        ${HERD_LINES.map((line) => `<li>${esc(line)}</li>`).join("")}
      </ol>
      <a class="pw-btn pw-btn--ghost pw-btn--lg" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener noreferrer">${ic("message", "pw-icon")}Avisar por WhatsApp (elegí el chat)</a>
      <button class="pw-btn pw-btn--primary pw-btn--xl" type="button" data-pw-herd-close>${ic("check", "pw-icon")}Listo</button>
    </section>
  `;
}

// ---------- detalle del perro (hoja que sube desde abajo) ----------

function DogSheet(ctx) {
  const { sel, stops, progress, names } = ctx;
  const stop = stops.find((item) => item.dog.id === view.detailId);
  if (!stop) return "";
  const { dog } = stop;
  const state = sel.isToday ? stateOf(progress, stop) : paseoState(null);
  const queue = buildQueue([stop], progress, sel);
  const entry = queue.active[0] || queue.done[0];
  const step = Math.min(state.step, STEPS.length);
  const foto = photoRecord(dog.id);
  const hasPhoto = Boolean(photoOf(dog));
  const alerts = dog.safety.filter((text) => safetyKind(text) !== "info");
  const partners = routePartners(stop, stops);
  const ownNoJuntar = alerts.filter((text) => safetyKind(text) === "danger").join(" ");
  const extraPartners = partners.filter((name) => !ownNoJuntar.includes(name));
  const note = stopNote(stop);
  const minutes = stop.minutos || dog.minutes;
  const change = lastChange(state.record, names);
  const canAct = sel.isToday && stop.canSave;
  const walkPhotoId = sel.isToday && SAFE_ID.test(String(state.record?.fotoPaseoId || "")) ? String(state.record.fotoPaseoId) : "";
  const walkThumb = sel.isToday ? walkThumbOf(state.record) : "";

  return `
    <div class="pw-sheet-backdrop" data-pw-close-sheet></div>
    <section class="pw-sheet" role="dialog" aria-modal="true" aria-labelledby="pw-sheet-title">
      <div class="pw-sheet-head">
        <span class="pw-sheet-photo">${Avatar(dog, "xl")}</span>
        <div class="pw-sheet-id">
          <h2 id="pw-sheet-title" tabindex="-1">${esc(dog.name)}</h2>
          <p>${esc(dog.unknown ? "Sin ficha" : dog.size)} · ${minutes ? `${minutes} min` : "Duración sin dato"}</p>
          <p class="pw-sheet-times">${ic("clock", "pw-icon pw-icon--sm")}${stop.hora ? `Retiro ${esc(stop.hora)}` : "Sin hora"}${entry?.kind === "deliver" && entry.time ? ` · vuelve ${esc(entry.time)}` : entry?.kind === "photo" && deliveryTime(stop, state) ? ` · vuelve ${esc(deliveryTime(stop, state))}` : stop.salida ? ` · vuelve ${esc(stop.salida)}` : ""}</p>
        </div>
        <button class="pw-sheet-close" type="button" data-pw-close-sheet aria-label="Cerrar">${ic("x", "pw-icon")}</button>
      </div>

      <div class="pw-sheet-photo-actions">
        ${dog.id ? PhotoInput(dog, hasPhoto ? "Cambiar foto" : "Sacar foto", "pw-btn pw-btn--ghost") : ""}
        ${foto?.archivoId ? `<button class="pw-btn pw-btn--ghost" type="button" data-pw-photo-big="${esc(foto.archivoId)}">${ic("eye", "pw-icon")}Ver grande</button>` : ""}
        ${walkPhotoId ? `<button class="pw-btn pw-btn--ghost pw-walk-view" type="button" data-pw-photo-big="${esc(walkPhotoId)}">${walkThumb ? `<span class="pw-walkthumb"><img src="${esc(walkThumb)}" alt="" /></span>` : ic("camera", "pw-icon")}Foto del paseo</button>` : ""}
      </div>

      ${entry ? `<div class="pw-chips">${StatusChip(entry, sel)}${WalkChips(entry, names, { thumb: false })}${SafetyChips(dog, partners, { long: true })}</div>` : ""}

      ${alerts.length || extraPartners.length || dog.status !== "Activo" ? `
        <ul class="pw-alerts" aria-label="Seguridad">
          ${dog.status !== "Activo" ? `<li class="pw-alert pw-alert--warn">${ic("alertCircle", "pw-icon")}<span>${esc(dog.status)}: ${esc(dog.review || "su estado no es Activo.")} Confirmalo antes de retirarlo.</span></li>` : ""}
          ${alerts.map((text) => `<li class="pw-alert pw-alert--${safetyKind(text)}">${ic(safetyKind(text) === "danger" ? "alertTriangle" : "shieldCheck", "pw-icon")}<span>${esc(text)}</span></li>`).join("")}
          ${extraPartners.length ? `<li class="pw-alert pw-alert--danger">${ic("alertTriangle", "pw-icon")}<span>No juntar con ${esc(listNames(extraPartners))}</span></li>` : ""}
        </ul>
      ` : ""}
      ${note ? `<p class="pw-sheet-line">${ic("fileText", "pw-icon pw-icon--sm")}<span><b>Nota de la ruta:</b> ${esc(note)}</span></p>` : ""}
      ${state.record?.nota ? `<p class="pw-sheet-line">${ic("message", "pw-icon pw-icon--sm")}<span><b>Nota:</b> ${esc(state.record.nota)}</span></p>` : ""}
      ${dog.review && dog.status === "Activo" ? `<p class="pw-sheet-line pw-sheet-line--muted">${ic("help", "pw-icon pw-icon--sm")}<span>A confirmar: ${esc(dog.review)}</span></p>` : ""}
      ${dog.unknown ? `<p class="pw-sheet-line pw-sheet-line--muted">${ic("help", "pw-icon pw-icon--sm")}<span>Perro nuevo: tamaño y alertas sin dato. Preguntale al coordinador.</span></p>` : ""}
      ${!stop.canSave && sel.isToday ? `<p class="pw-sheet-line pw-sheet-line--muted">${ic("alertCircle", "pw-icon pw-icon--sm")}<span>Sin identificador en la ruta: no se puede marcar. Avisale al coordinador.</span></p>` : ""}

      ${canAct ? `
        ${state.noSale ? `<p class="pw-nosale">${ic("x", "pw-icon")}No sale este turno</p>` : `
          <ol class="pw-steps" aria-label="Avance">
            ${STEPS.map((item, index) => {
              const marker = index < step ? markerOf(state.record, index, names) : "";
              return `
                <li class="${index < step ? "is-done" : ""} ${index === step ? "is-next" : ""}">
                  <span class="pw-step-dot" aria-hidden="true">${index < step ? ic("check", "pw-icon pw-icon--sm") : index + 1}</span>
                  <span>${item.label}<small>${index < step ? esc(state.times[index] || (index === 1 ? "sin foto" : "sin hora")) : "—"}</small>${marker ? `<small class="pw-step-who">${esc(marker)}</small>` : ""}</span>
                  <span class="pw-sr">${index < step ? "hecho" : "pendiente"}</span>
                </li>
              `;
            }).join("")}
          </ol>
        `}
        ${change ? `<p class="pw-change-line ${state.record?.pendiente ? "is-pending" : ""}">${esc(change)}</p>` : ""}
        <div class="pw-sheet-actions">
          ${entry && !state.noSale ? StepButton(entry, "sheet", { size: "lg" }) : ""}
          ${entry?.kind === "photo" && !state.noSale ? StepButton(entry, "sheet-deliver", { size: "lg", ghost: true }) : ""}
          ${!state.noSale && step === 0 ? `<button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${esc(dog.id)}" ${loaded.ready ? "" : 'aria-disabled="true"'}>${ic("x", "pw-icon")}No sale</button>` : ""}
          ${state.noSale || step > 0 ? `<button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${esc(dog.id)}" ${loaded.ready ? "" : 'aria-disabled="true"'}>${ic("undo", "pw-icon")}Deshacer paso</button>` : ""}
        </div>
      ` : ""}
      <p class="pw-sheet-foot">Categoría: <b>${esc(dog.category || "SIN EVALUAR")}</b> · ${dog.unknown ? "sin ficha" : "Registro maestro 14/08/2026"}</p>
    </section>
  `;
}

// ---------- pantalla: Equipo ----------

// Un interruptor del checklist (pantalla Equipo y Manada del ayudante).
function EquipSwitch({ item, label, icon: iconName, qty, sub }, checked) {
  const on = checked.includes(item);
  return `
    <button class="pw-switch ${on ? "is-on" : ""}" type="button" data-pw-equip="${esc(item)}" aria-pressed="${on}">
      <span class="pw-switch-icon">${ic(iconName, "pw-icon")}</span>
      <span class="pw-switch-label">${esc(label)}${qty ? ` <small>×${qty}</small>` : ""}${sub ? `<small class="pw-switch-sub">${esc(sub)}</small>` : ""}</span>
      <span class="pw-switch-mark" aria-hidden="true">${on ? ic("check", "pw-icon") : ""}</span>
    </button>
  `;
}

function EquipScreen({ sel, plan, stops, names }) {
  const items = checklistItems();
  const { checked, record } = checklistFor(sel.now.iso, sel.shift);
  const complete = checked.length >= items.length;
  const change = lastChange(record, names);
  const partner = plan.helping ? personName(plan.helping.paseador, names) : "";
  const muzzled = stops.map((stop) => stop.dog).filter(usesMuzzle);
  const own = muzzleShort(muzzled);
  const col = equipColumn();
  const extra = isHelper() ? [] : otherEquipment();

  const toggle = (row) => EquipSwitch(row, checked);

  let body;
  if (isHelper()) {
    body = `<div class="pw-switch-grid">${HELPER_ITEMS.map((row) => toggle(row)).join("")}</div>`;
  } else {
    const groups = [...WALKER_GROUPS, { title: "Otros", test: /.*/, icon: "packageCheck" }].map((group) => ({ ...group, rows: [] }));
    myEquipment().forEach((row) => groups.find((group) => group.test.test(row.item)).rows.push(row));
    body = groups.filter((group) => group.rows.length).map((group) => `
      <fieldset class="pw-equip-group">
        <legend>${esc(group.title)}</legend>
        <div class="pw-switch-list">
          ${group.rows.map((row) => toggle({ item: row.item, label: row.item, icon: group.icon, qty: col ? row[col] : 0 })).join("")}
        </div>
      </fieldset>
    `).join("");
  }

  return `
    <section class="pw-screen" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">Equipo</h1>
        <span class="pw-title-count ${complete ? "is-ok" : ""}" aria-label="${checked.length} de ${items.length} listo">${checked.length}/${items.length}</span>
      </div>
      <p class="pw-sub">${isHelper() ? `Antes de salir${partner ? ` con ${esc(partner)}` : ""}` : "Antes de salir"} · ${esc(sel.shift.toLowerCase())}${sel.isToday ? "" : " de hoy"}</p>
      ${own !== null ? `<p class="pw-strip pw-strip--warn">${ic("shieldCheck", "pw-icon")}<span>${muzzled.length} con bozal y tenés ${own}: avisá a Juan.</span></p>` : ""}
      ${body}
      <div class="pw-equip-foot">
        ${complete ? `
          <p class="pw-ready">${ic("checkCircle", "pw-icon pw-icon--lg")}Listo para salir</p>
          <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-equip-reset>Desmarcar</button>
        ` : `
          <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-equip-all>${ic("check", "pw-icon")}Listo</button>
        `}
      </div>
      ${change ? `<p class="pw-change-line ${record?.pendiente ? "is-pending" : ""}">${esc(change)}</p>` : ""}
      ${extra.length ? `<p class="pw-source">${ic("users", "pw-icon pw-icon--sm")}Lo tiene Juan: ${extra.map((row) => `${esc(row.item.toLowerCase())} (${row.juan})`).join(", ")}.</p>` : ""}
    </section>
  `;
}

// ---------- pantalla: Incidente (3 pasos) ----------

// Dictado por voz del detalle (si el celular lo permite). El texto queda en el borrador.
let dictation = null;

function speechOk() {
  return typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function stopDictation() {
  if (dictation) dictation.stop();
  dictation = null;
}

function toggleDictation(button) {
  if (dictation) {
    stopDictation();
    return;
  }
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) return;
  const recognition = new Recognition();
  recognition.lang = "es-AR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  const label = () => document.querySelector("[data-pw-dictar-text]");
  const setOn = (on) => {
    const current = document.querySelector("[data-pw-dictar]");
    if (current) {
      current.setAttribute("aria-pressed", String(on));
      current.classList.toggle("is-on", on);
    }
    if (label()) label().textContent = on ? "Te escucho… tocá para cortar" : "Contarlo con la voz";
  };
  recognition.onstart = () => setOn(true);
  recognition.onresult = (event) => {
    const text = String(event.results?.[0]?.[0]?.transcript || "").trim();
    if (!text) return;
    const base = getDraft().detalle.trim();
    writeDraft({ detalle: `${base ? `${base} ` : ""}${text}`.slice(0, 160) });
    view.incidentStatus = "Listo: revisá lo que quedó escrito.";
    view.incidentWarn = false;
  };
  recognition.onerror = () => {
    view.incidentStatus = "No te escuché. Probá de nuevo o escribilo.";
    view.incidentWarn = true;
  };
  recognition.onend = () => {
    dictation = null;
    rerender('[data-pw-field="detalle"]');
  };
  dictation = recognition;
  try {
    recognition.start();
  } catch {
    dictation = null;
  }
  void button;
}

function incidentDogs(stops, draft) {
  const list = stops.map((stop) => stop.dog);
  draft.dogs.forEach((name) => {
    if (name !== EXTERNAL_DOG && !list.some((dog) => dog.name === name)) list.push(REAL_DOGS.find((dog) => dog.name === name) || { id: "", name, safety: [] });
  });
  return list;
}

function IncidentScreen({ sel }) {
  const { stops } = incidentTeam();
  const draft = getDraft();
  if (draft.enviado) return IncidentSent(draft, sel);
  const step = draft.step;
  const warn = view.incidentWarn;

  let body = "";
  if (step === 1) {
    body = `
      <p class="pw-strip pw-strip--danger">${ic("shieldCheck", "pw-icon")}<span><b>Primero la seguridad:</b> separá y revisá lesiones.</span></p>
      <fieldset class="pw-q">
        <legend>¿Qué pasó?</legend>
        <div class="pw-chip-grid">
          ${INCIDENT_TYPES.map((tipo) => `
            <button type="button" class="pw-pick ${draft.tipos.includes(tipo) ? "is-on" : ""}" data-pw-inc-tipo="${esc(tipo)}" aria-pressed="${draft.tipos.includes(tipo)}">${esc(tipo)}</button>
          `).join("")}
        </div>
      </fieldset>
      <label class="pw-field">Detalle <small>(opcional)</small>
        <input type="text" maxlength="160" data-pw-field="detalle" value="${esc(draft.detalle)}" placeholder="Ej.: tiró de la correa y gruñó" autocomplete="off" />
      </label>
      ${speechOk() ? `<button class="pw-btn pw-btn--ghost pw-btn--block pw-voice-btn" type="button" data-pw-dictar aria-pressed="false">${ic("message", "pw-icon")}<span data-pw-dictar-text>Contarlo con la voz</span></button>` : ""}
      <button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-inc-none>No hubo incidente · volver a la ruta</button>
    `;
  } else if (step === 2) {
    const dogs = incidentDogs(stops, draft);
    body = `
      <fieldset class="pw-q">
        <legend>¿Qué perros?</legend>
        <div class="pw-dog-grid">
          ${dogs.map((dog) => {
            const on = draft.dogs.includes(dog.name);
            return `
              <button type="button" class="pw-dog-pick ${on ? "is-on" : ""}" data-pw-inc-dog="${esc(dog.name)}" aria-pressed="${on}">
                ${Avatar(dog, "md")}
                <span>${esc(dog.name)}</span>
                <span class="pw-dog-pick-mark" aria-hidden="true">${on ? ic("check", "pw-icon pw-icon--sm") : ""}</span>
              </button>
            `;
          }).join("")}
          <button type="button" class="pw-dog-pick ${draft.dogs.includes(EXTERNAL_DOG) ? "is-on" : ""}" data-pw-inc-dog="${EXTERNAL_DOG}" aria-pressed="${draft.dogs.includes(EXTERNAL_DOG)}">
            <span class="pw-ava pw-ava--md pw-ava--ext" aria-hidden="true">${ic("help", "pw-icon")}</span>
            <span>Otro perro</span>
            <span class="pw-dog-pick-mark" aria-hidden="true">${draft.dogs.includes(EXTERNAL_DOG) ? ic("check", "pw-icon pw-icon--sm") : ""}</span>
          </button>
        </div>
      </fieldset>
    `;
  } else {
    body = `
      <fieldset class="pw-q">
        <legend>¿Hubo lesión?</legend>
        <div class="pw-seg">
          ${INJURY_OPTIONS.map((option) => `
            <button type="button" class="pw-pick pw-pick--big ${option === "Sí" ? "pw-pick--danger" : ""} ${draft.lesiones === option ? "is-on" : ""}" data-pw-inc-lesion="${option}" aria-pressed="${draft.lesiones === option}">${option}</button>
          `).join("")}
        </div>
      </fieldset>
      ${draft.lesiones === "Sí" ? `<p class="pw-strip pw-strip--danger">${ic("heartPulse", "pw-icon")}<span>La veterinaria va antes que el reporte. Avisá a Juan.</span></p>` : ""}
      <fieldset class="pw-q">
        <legend>Riesgo</legend>
        <div class="pw-seg">
          ${RISK_LEVELS.map((level) => `
            <button type="button" class="pw-pick pw-pick--risk-${plain(level)} ${draft.riesgo === level ? "is-on" : ""}" data-pw-inc-riesgo="${level}" aria-pressed="${draft.riesgo === level}">${level}</button>
          `).join("")}
        </div>
      </fieldset>
      <button class="pw-fold" type="button" data-pw-fold="more" aria-expanded="${view.open.more}" aria-controls="pw-inc-more">
        ${ic("plus", "pw-icon")}<span>Más detalle <small>(opcional)</small></span>${ic("chevronDown", "pw-icon pw-fold-icon")}
      </button>
      <div class="pw-inc-more" id="pw-inc-more" ${view.open.more ? "" : "hidden"}>
        <div class="pw-grid-2">
          <label class="pw-field">Hora<input type="time" data-pw-field="hora" value="${esc(draft.hora || sel.now.time)}" /></label>
          <label class="pw-field">Lugar<input type="text" data-pw-field="lugar" value="${esc(draft.lugar)}" placeholder="Plaza, esquina" autocomplete="off" /></label>
        </div>
        <label class="pw-field">Antes<textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto">${esc(draft.antes)}</textarea></label>
        <label class="pw-field">Qué hiciste<textarea data-pw-field="accion" rows="2" placeholder="Ej.: crucé la calle y lo senté">${esc(draft.accion)}</textarea></label>
        <label class="pw-field">Después<textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto">${esc(draft.despues)}</textarea></label>
        <fieldset class="pw-q">
          <legend>Protocolo hecho</legend>
          <div class="pw-chip-grid">
            ${INCIDENT_PROTOCOL.map((text, index) => `
              <button type="button" class="pw-pick ${draft.protocolo.includes(index) ? "is-on" : ""}" data-pw-inc-proto="${index}" aria-pressed="${draft.protocolo.includes(index)}">${index + 1}. ${esc(text.split(/[:.]/)[0])}</button>
            `).join("")}
          </div>
        </fieldset>
      </div>
    `;
  }

  return `
    <section class="pw-screen pw-incident" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${ic("alertTriangle", "pw-icon")}Incidente</h1>
        <span class="pw-title-count">${step}/3</span>
      </div>
      ${draft.urgente ? UrgentStrip(draft, sel) : ""}
      <ol class="pw-stepper" aria-label="Pasos">
        ${INCIDENT_STEPS.map((label, index) => `<li class="${index + 1 < step ? "is-done" : ""} ${index + 1 === step ? "is-on" : ""}" ${index + 1 === step ? 'aria-current="step"' : ""}><span>${index + 1}</span>${label}</li>`).join("")}
      </ol>
      ${body}
      <p class="pw-status ${warn ? "is-warn" : ""}" role="status" data-pw-incident-status>${esc(view.incidentStatus)}</p>
      <div class="pw-wizard-nav">
        ${step > 1 ? `<button class="pw-btn pw-btn--ghost" type="button" data-pw-inc-back>${ic("arrowLeft", "pw-icon")}Atrás</button>` : `
          <button class="pw-btn pw-btn--ghost ${view.confirmClear ? "is-confirm" : ""}" type="button" data-pw-clear ${draftHasContent(draft) ? "" : "hidden"}>${view.confirmClear ? "¿Borrar? Tocá de nuevo" : "Borrar"}</button>
        `}
        ${step < 3 ? `
          <button class="pw-btn pw-btn--primary pw-btn--lg" type="button" data-pw-inc-next>Siguiente${ic("arrowRight", "pw-icon")}</button>
        ` : `
          <button class="pw-btn pw-btn--danger pw-btn--lg" type="button" data-pw-inc-send>${ic("send", "pw-icon")}Enviar</button>
        `}
      </div>
    </section>
  `;
}

function IncidentSent(draft, sel) {
  const result = buildMessage(draft, sel);
  const text = result.ok ? result.text : "";
  return `
    <section class="pw-screen pw-incident" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${ic("checkCircle", "pw-icon")}Reporte listo</h1>
      </div>
      <p class="pw-sub">${esc(draft.dogs.join(", "))} · ${esc(draft.tipos.join(", ") || "incidente")}</p>
      <p class="pw-status ${view.incidentWarn ? "is-warn" : ""}" role="status" data-pw-incident-status>${esc(view.incidentStatus)}</p>
      ${text ? `
        <a class="pw-btn pw-btn--whatsapp pw-btn--xl" data-pw-whatsapp href="${whatsappHref(text)}" target="_blank" rel="noopener noreferrer">${ic("message", "pw-icon")}WhatsApp a Juan</a>
        <div class="pw-row">
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>${ic("copy", "pw-icon")}Copiar</button>
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-fold="message" aria-expanded="${view.open.message}" aria-controls="pw-message-box">${ic("eye", "pw-icon")}Ver texto</button>
        </div>
        <div id="pw-message-box" ${view.open.message ? "" : "hidden"}>
          <label class="pw-sr" for="pw-message">Mensaje</label>
          <textarea id="pw-message" class="pw-message" readonly rows="14" data-pw-message>${esc(text)}</textarea>
        </div>
      ` : ""}
      <div class="pw-wizard-nav">
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-inc-edit>${ic("arrowLeft", "pw-icon")}Corregir</button>
        <button class="pw-btn pw-btn--primary" type="button" data-pw-inc-new>${ic("plus", "pw-icon")}Nuevo</button>
      </div>
    </section>
  `;
}

// Desde "Es más grave": aviso corto a Juan antes del reporte (sin datos de tutores).
function UrgentStrip(draft, sel) {
  const team = incidentTeam();
  const text = [
    "URGENTE - Paseos Juan",
    `${draft.dogs.join(", ") || "Un perro"} se lastimó y es más que una curación leve.${draft.detalle ? ` ${draft.detalle}.` : ""}`,
    `Hora: ${draft.hora || sel.now.time} · Ruta: ${team.rutas || PENDIENTE}`,
    `${isHelper() ? "Ayudante" : "Paseador"}: ${walkerName()}${team.paseador ? ` (con ${team.paseador})` : ""}`,
    "¿Vamos a la veterinaria?",
  ].join("\n");
  return `
    <p class="pw-strip pw-strip--danger">${ic("heartPulse", "pw-icon")}<span><b>Más que leve:</b> avisá a Juan y va a la veterinaria.</span></p>
    <a class="pw-btn pw-btn--whatsapp pw-btn--xl" href="${whatsappHref(text)}" target="_blank" rel="noopener noreferrer">${ic("message", "pw-icon")}WhatsApp a Juan</a>
  `;
}

function whatsappHref(text) {
  return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
}

// ---------- pantalla: Más ----------

function MoreScreen({ sel, plan, stops, names }) {
  const notices = activeNotices(sel.now.iso);
  const pending = registros.pendingCount();
  const supervisors = [...new Set(plan.shown.map((route) => route.supervisor).filter(Boolean))];
  const supervisor = supervisors.length ? listNames(supervisors) : SHIFT_BY_LABEL[sel.shift].supervisor;
  const hours = routeHours(plan.shown) || shiftHours(sel.shift);
  const short = { Lunes: "Lun", Martes: "Mar", Miércoles: "Mié", Jueves: "Jue", Viernes: "Vie", Sábado: "Sáb", Domingo: "Dom" };
  const people = [];
  plan.shown.forEach((route) => {
    if (route.paseador && !isMe(route.paseador)) people.push(["Paseador", personName(route.paseador, names)]);
    if (route.ayudante && !isMe(route.ayudante)) people.push(["Ayudante", personName(route.ayudante, names)]);
  });
  const facts = [
    ["Ruta", plan.shown.map((route) => route.ruta).join(", ") || "Sin ruta"],
    ["Perros", String(stops.length)],
    ["Horario", hours],
    ["Supervisa", supervisor],
    ...people,
    ["Fuente", plan.shown.map((route) => sourceText(route, names)).join(" · ") || "—"],
  ];

  return `
    <section class="pw-screen" aria-labelledby="pw-tab-title">
      <div class="pw-title-row"><h1 id="pw-tab-title" tabindex="-1">Más</h1></div>

      <div class="pw-box" role="group" aria-labelledby="pw-day-label">
        <h2 class="pw-box-title" id="pw-day-label">${ic("calendarCheck", "pw-icon")}Día y turno</h2>
        <div class="pw-days">
          ${WEEK_DAYS.map((day) => `
            <button type="button" class="pw-chip pw-chip--day ${day === sel.day ? "is-active" : ""}" data-pw-day="${day}" aria-pressed="${day === sel.day}" aria-label="${day}${day === sel.now.day ? " (hoy)" : ""}">
              ${short[day]}${day === sel.now.day ? "<small>hoy</small>" : ""}
            </button>
          `).join("")}
        </div>
        <div class="pw-chip-row">
          ${["Mañana", "Tarde"].map((shift) => `
            <button type="button" class="pw-chip pw-chip--wide ${shift === sel.shift ? "is-active" : ""}" data-pw-shift="${shift}" aria-pressed="${shift === sel.shift}">${shift}<small>${shiftHours(shift)}</small></button>
          `).join("")}
        </div>
        ${view.day || view.shift ? `<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-today>Volver a hoy</button>` : ""}
      </div>

      ${!plan.assigned && plan.ofShift.length > 1 ? `<div class="pw-box">${RoutePicker(sel, plan)}</div>` : ""}

      <div class="pw-box">
        <h2 class="pw-box-title">${ic("route", "pw-icon")}Turno</h2>
        <dl class="pw-facts">
          ${facts.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join("")}
        </dl>
      </div>

      <div class="pw-box">
        <h2 class="pw-box-title">${ic("bell", "pw-icon")}Avisos por barrio <span class="pw-count">${notices.length}</span></h2>
        ${notices.length ? NoticeList(notices, { full: true }) : `<p class="pw-sub">Sin avisos.</p>`}
      </div>

      <div class="pw-box">
        <p class="pw-sync-line">${ic(pending ? "uploadCloud" : "checkCircle", "pw-icon")}${pending ? `${pending} ${pending === 1 ? "cambio espera" : "cambios esperan"} señal` : "Todo enviado"}</p>
        <button class="pw-fold" type="button" data-pw-fold="help" aria-expanded="${view.open.help}" aria-controls="pw-help">
          ${ic("help", "pw-icon")}<span>Cómo funciona</span>${ic("chevronDown", "pw-icon pw-fold-icon")}
        </button>
        <ul class="pw-help" id="pw-help" ${view.open.help ? "" : "hidden"}>
          <li><span class="pw-chip-st pw-chip-st--idle">Pendiente</span><span class="pw-chip-st pw-chip-st--run">En paseo</span><span class="pw-chip-st pw-chip-st--ok">Entregado</span><span class="pw-chip-st pw-chip-st--late">Atrasado</span></li>
          <li>"Retiré" → "Foto del paseo" (lo pasa a "En paseo") → "Entregué". Sin foto se entrega igual y queda "sin foto del paseo".</li>
          ${isHelper() ? `<li>Ayudante: "Integrado" cuando ya caminó la primera cuadra con la manada. Devolvé de a 2 como máximo.</li>` : ""}
          <li>Lo que marcás lo ven ${isHelper() ? "el paseador" : "tu ayudante"}, Juan y quien supervisa.</li>
          <li>Sin señal: seguí marcando, se envía solo. La foto del paseo se sube sola al volver la señal; la foto de la ficha necesita señal.</li>
          <li>Categoría: <b>SIN EVALUAR</b> salvo otra. ${esc(CATEGORIES["SIN EVALUAR"])}</li>
          <li>Rutas: las arma el coordinador. Base: ${esc(BUSINESS_INFO.officialSources.routes)} (12/11/2026).</li>
        </ul>
      </div>

      <div class="pw-more-actions">
        <button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-a11y>${ic("eye", "pw-icon")}Tema y movimiento</button>
        <button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-logout>${ic("logOut", "pw-icon")}Salir</button>
      </div>
    </section>
  `;
}

function routeHours(routes) {
  const horas = routes.flatMap((route) => route.stops.map((stop) => stop.hora)).filter(Boolean).sort();
  const salidas = routes.flatMap((route) => route.stops.map((stop) => stop.salida)).filter(Boolean).sort();
  if (!horas.length) return "";
  return `${horas[0]} a ${salidas[salidas.length - 1] || horas[horas.length - 1]}`;
}

function sourceText(route, names) {
  if (route.fuente === "dia") {
    const who = route.record.actualizadoPor ? whoName(route.record.actualizadoPor, names) : "";
    const time = route.record.actualizadoEn ? timeAR(route.record.actualizadoEn) : "";
    return `${route.ruta}: cambio del día${[who, time].filter(Boolean).length ? ` · ${[who, time].filter(Boolean).join(" ")}` : ""}`;
  }
  if (route.fuente === "plantilla") return `${route.ruta}: plantilla semanal`;
  return `${route.ruta}: planilla RPJ, sin confirmar`;
}

// ---------- mensaje de incidente ----------

function validateStep(draft, step) {
  if (step === 1) {
    if (!draft.tipos.length && !draft.detalle.trim()) return { text: "Elegí qué pasó.", focus: "[data-pw-inc-tipo]" };
    if (draft.tipos.length === 1 && draft.tipos[0] === "Otro" && !draft.detalle.trim()) return { text: "Contá en pocas palabras qué pasó.", focus: '[data-pw-field="detalle"]' };
  }
  if (step === 2 && !draft.dogs.length) return { text: "Tocá los perros que estaban.", focus: "[data-pw-inc-dog]" };
  if (step === 3) {
    if (!draft.lesiones) return { text: "Marcá si hubo lesión.", focus: "[data-pw-inc-lesion]" };
    if (!draft.riesgo) return { text: "Marcá el riesgo.", focus: "[data-pw-inc-riesgo]" };
  }
  const texts = step === 1 ? draft.detalle : [draft.detalle, draft.antes, draft.accion, draft.despues, draft.lugar].join(" ");
  const word = texts.match(FORBIDDEN_WORDS)?.[0];
  if (word) {
    const field = ["detalle", "antes", "accion", "despues", "lugar"].find((name) => FORBIDDEN_WORDS.test(draft[name] || "")) || "detalle";
    return { text: `Cambiá “${word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`, focus: `[data-pw-field="${field}"]`, word };
  }
  return null;
}

function validateDraft(draft) {
  for (const step of [1, 2, 3]) {
    const problem = validateStep(draft, step);
    if (problem) return { ...problem, step };
  }
  return null;
}

function buildMessage(draft, sel) {
  if (validateDraft(draft)) return { ok: false };
  const shift = shiftByClock(sel.now);
  const team = incidentTeam();
  const line = (label, value) => `${label}: ${String(value || "").trim() ? String(value).trim() : "Sin dato"}`;
  const protocol = protocolLines(draft).map((text) => `- ${text}`);

  const text = [
    "REPORTE DE INCIDENTE - Paseos Juan",
    `Fecha: ${sel.now.date} · Hora: ${draft.hora || sel.now.time} · Turno: ${shift.toLowerCase()}`,
    isHelper() ? `Ayudante de paseador: ${walkerName()}${team.paseador ? ` (con ${team.paseador})` : ""}` : `Paseador: ${walkerName()}`,
    `Ruta: ${team.rutas || PENDIENTE}`,
    `Perros: ${draft.dogs.join(", ")}`,
    line("Qué pasó", conductaOf(draft)),
    `Lesiones: ${draft.lesiones}`,
    `Nivel de riesgo: ${draft.riesgo}`,
    line("Lugar", draft.lugar),
    "",
    line("Antes", draft.antes),
    line("Qué hice", draft.accion),
    line("Después", draft.despues),
    "",
    "Protocolo:",
    ...protocol,
  ].join("\n");

  return { ok: true, text };
}

function protocolLines(draft) {
  return INCIDENT_PROTOCOL.map((step, index) => {
    const short = step.split(/[:.]/)[0];
    return `${draft.protocolo.includes(index) ? "Hecho" : "Pendiente"}: ${short}`;
  });
}

// Ruta y paseador del turno actual, para el mensaje y el registro del incidente.
function incidentTeam() {
  const sel = selection();
  const plan = routePlan({ ...sel, day: sel.now.day, iso: sel.now.iso, isToday: true, shift: shiftByClock(sel.now) });
  const names = teamNames(sel.now.iso);
  return {
    rutas: plan.shown.map((route) => route.ruta).join(", "),
    paseador: plan.helping ? personName(plan.helping.paseador, names) : "",
    stops: stopsOf(plan.shown),
  };
}

// Registro para la colección `incidentes` (mismos datos que el mensaje de WhatsApp).
function incidentRecord(draft, sel) {
  const team = incidentTeam();
  const ids = draft.dogs
    .map((name) => team.stops.find((stop) => stop.dog.name === name)?.dog.id || REAL_DOGS.find((dog) => dog.name === name)?.id)
    .filter(Boolean);
  const names = draft.dogs.join(", ");
  return {
    ...(draft.registroId ? { id: draft.registroId } : {}),
    fecha: sel.now.iso,
    hora: draft.hora || sel.now.time,
    perros: ids,
    perroNombre: names,
    tipos: draft.tipos,
    lugar: draft.lugar.trim(),
    antes: draft.antes.trim(),
    conducta: conductaOf(draft),
    accion: draft.accion.trim(),
    despues: draft.despues.trim(),
    riesgo: draft.riesgo,
    lesiones: draft.lesiones,
    protocolo: protocolLines(draft),
    ruta: team.rutas,
    titulo: `Incidente: ${names} · ${draft.tipos.join(", ") || "ver detalle"} · riesgo ${draft.riesgo.toLowerCase()}`,
  };
}

function setIncidentStatus(message, warn = false) {
  view.incidentStatus = message;
  view.incidentWarn = warn;
  const status = document.querySelector("[data-pw-incident-status]");
  if (status) {
    status.textContent = message;
    status.classList.toggle("is-warn", warn);
  }
  announce(message);
}

// Guarda el incidente en la app. Si ya se guardó ese mismo texto, no hace nada;
// si se corrigió, actualiza el mismo registro (no crea otro).
function saveIncident(draft, text) {
  if (view.incidentSavedText === text) return Promise.resolve(null);
  view.incidentSavedText = text;
  const sel = selection();
  return saveShared("incidentes", () => incidentRecord({ ...draft, registroId: getDraft().registroId || draft.registroId }, sel)).then((saved) => {
    if (!saved) {
      view.incidentSavedText = "";
      setIncidentStatus("No se guardó en la app. Mandalo igual por WhatsApp.", true);
      return null;
    }
    if (readJSON(INCIDENT_KEY, null)) writeDraft({ registroId: saved.id });
    setIncidentStatus(saved.pendiente ? "Sin señal: se guarda en la app cuando vuelva. Mandalo por WhatsApp." : "Guardado en la app. Ahora mandalo por WhatsApp.");
    return saved;
  });
}

// ---------- foco y anuncios ----------

function announce(message) {
  let live = document.getElementById("pw-live");
  if (!live) {
    live = document.createElement("div");
    live.id = "pw-live";
    live.className = "pw-sr";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("role", "status");
    document.body.appendChild(live);
  }
  live.textContent = "";
  requestAnimationFrame(() => {
    live.textContent = message;
  });
}

// Errores: región aparte, fuera de la página, para que el lector de pantalla los lea siempre.
function announceError(message) {
  let live = document.getElementById("pw-live-error");
  if (!live) {
    live = document.createElement("div");
    live.id = "pw-live-error";
    live.className = "pw-sr";
    live.setAttribute("aria-live", "assertive");
    live.setAttribute("role", "alert");
    document.body.appendChild(live);
  }
  live.textContent = "";
  requestAnimationFrame(() => {
    live.textContent = message;
  });
}

// Selector para volver a encontrar el control con foco después de redibujar:
// todos sus atributos data-pw-* con su valor (así "Retiré" de la tarjeta grande no se confunde
// con el de la lista).
function focusSelectorFor(element) {
  if (!element || element === document.body || !element.closest?.(".pw-shell")) return "";
  if (element.id) return `#${CSS.escape(element.id)}`;
  const attrs = [...element.attributes].filter((item) => item.name.startsWith("data-pw-") && item.name !== "data-pw-listening");
  return attrs.map((item) => `[${item.name}="${CSS.escape(item.value)}"]`).join("");
}

// Redibuja por datos nuevos (del servidor, de la cola o del supervisor) sin perder
// el foco ni lo que se estaba escribiendo.
function softRender() {
  const active = document.activeElement;
  const selector = focusSelectorFor(active);
  const caret = active && typeof active.selectionStart === "number" ? [active.selectionStart, active.selectionEnd] : null;
  const scrollY = window.scrollY;
  render();
  if (Math.abs(window.scrollY - scrollY) > 2) window.scrollTo(0, scrollY);
  if (!selector) return;
  const target = document.querySelector(selector);
  if (!target) return;
  target.focus({ preventScroll: true });
  if (caret && typeof target.setSelectionRange === "function") {
    try {
      target.setSelectionRange(caret[0], caret[1]);
    } catch {
      // Algunos campos (hora) no tienen cursor.
    }
  }
}

let renderTimer = 0;

function scheduleRender() {
  clearTimeout(renderTimer);
  // Un poco de espera junta varios avisos seguidos y deja que la cola actualice su cuenta.
  renderTimer = setTimeout(() => {
    if (document.querySelector(".pw-shell")) softRender();
  }, 80);
}

// Vuelve a dibujar la página y devuelve el foco al control que se tocó (o al título).
function rerender(focusSelector) {
  render();
  if (!focusSelector) return;
  const target = document.querySelector(focusSelector) || document.getElementById("pw-tab-title");
  target?.focus({ preventScroll: true });
}

function goTab(tab) {
  // Curación y "cruce o perro suelto" se cierran al tocar cualquier botón de la barra (también "Ruta").
  view.helper.cure = null;
  view.helper.herd = false;
  view.tab = tab;
  view.detailId = "";
  view.confirmClear = false;
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
  document.getElementById("pw-tab-title")?.focus({ preventScroll: true });
}

// Curación o "cruce o perro suelto" del ayudante: ocupan la pantalla Ruta (se vuelve con "Volver"/"Listo").
function openHelperPanel({ cure = null, herd = false }) {
  view.tab = "ruta";
  view.detailId = "";
  view.helper.cure = cure;
  view.helper.herd = herd;
  view.helper.status = "";
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
  document.getElementById("pw-tab-title")?.focus({ preventScroll: true });
}

function openSheet(dogId) {
  view.detailId = dogId;
  render();
  document.getElementById("pw-sheet-title")?.focus({ preventScroll: true });
}

function closeSheet() {
  const id = view.detailId;
  view.detailId = "";
  render();
  const back = document.querySelector(`[data-pw-open="${CSS.escape(id)}"]`) || document.getElementById("pw-tab-title");
  back?.focus({ preventScroll: true });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.querySelector("[data-pw-message]");
    if (!textarea) return false;
    textarea.closest("[hidden]")?.removeAttribute("hidden");
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    }
  }
}

// ---------- acciones de la ruta ----------

function canTouch(sel, stop) {
  return sel.isToday && stop?.canSave && loaded.ready;
}

function undoTo(stop, snap) {
  const sel = selection();
  if (!canTouch(sel, stop)) return;
  savePaseo(stop, sel, snap);
  announce(`${stop.dog.name}: deshecho.`);
  scheduleRender();
}

// Los pasos ya marcados (y quién los marcó) viajan otra vez: si no hay señal, la cola guarda el
// registro completo.
function keptSteps(state) {
  const changes = {};
  STEPS.forEach((item, index) => {
    if (index >= state.step || !state.times[index]) return;
    changes[item.field] = state.times[index];
    if (state.record?.[`${item.field}Por`]) {
      changes[`${item.field}Por`] = state.record[`${item.field}Por`];
      changes[`${item.field}PorNombre`] = state.record[`${item.field}PorNombre`] || "";
    }
  });
  return changes;
}

function markStep(changes, index, time) {
  const user = currentUser();
  const field = STEPS[index].field;
  changes[field] = time;
  changes[`${field}Por`] = user.usuario || "";
  changes[`${field}PorNombre`] = user.nombre || "";
}

function hasWalkPhoto(record) {
  return Boolean(record?.fotoPaseoId || record?.fotoPendiente === true);
}

// "Retiré": deja el perro "retirado" (la foto del paseo lo pasa a "En paseo").
// "Entregué": lo cierra, con o sin foto. Con "Deshacer" 5 segundos.
function advance(id) {
  const sel = selection();
  const stop = findStop(sel, id);
  if (!canTouch(sel, stop)) return false;
  const state = progressFor(sel.now.iso, sel.shift, [stop.dog])[id];
  if (state.noSale || state.step >= STEPS.length) return false;
  const before = snapshotPaseo(state);
  const changes = keptSteps(state);
  let text;
  if (state.step === 0) {
    markStep(changes, 0, sel.now.time);
    changes.estado = "retirado";
    text = `${stop.dog.name}: retirado ${sel.now.time}`;
  } else {
    markStep(changes, 2, sel.now.time);
    changes.estado = "entregado";
    const noPhoto = !hasWalkPhoto(state.record);
    changes.sinFotoPaseo = noPhoto;
    text = `${stop.dog.name}: entregado ${sel.now.time}${noPhoto ? " · sin foto del paseo" : ""}`;
  }
  savePaseo(stop, sel, changes);
  showToast(text, () => undoTo(stop, before));
  return true;
}

// Foto del paseo: la miniatura propia se ve al instante (la de otro celular se baja con la sesión).
const localWalkThumbs = new Map();
const remoteWalkThumbs = new Map();

function walkThumbOf(record) {
  if (!record) return "";
  const local = localWalkThumbs.get(record.id);
  if (local && (record.fotoPaseoId || record.fotoPendiente || record.enviando)) return local;
  const fileId = String(record.fotoPaseoId || "");
  if (!fileId || !SAFE_ID.test(fileId) || typeof fetch !== "function" || !session.token()) return "";
  const known = remoteWalkThumbs.get(fileId);
  if (known?.url) return known.url;
  if (known && (known.loading || Date.now() - known.at < 60 * 1000)) return "";
  if (typeof navigator !== "undefined" && navigator.onLine === false) return "";
  const entry = { url: "", loading: true, at: Date.now() };
  remoteWalkThumbs.set(fileId, entry);
  fetch(`/api/archivos?id=${encodeURIComponent(fileId)}`, { headers: { Authorization: `Bearer ${session.token()}` } })
    .then((response) => (response.ok ? response.blob() : null))
    .then((blob) => {
      if (blob && /^image\//.test(blob.type)) {
        entry.url = URL.createObjectURL(blob);
        scheduleRender();
      }
    })
    .catch(() => null)
    .finally(() => {
      entry.loading = false;
      entry.at = Date.now();
    });
  return "";
}

// "Foto del paseo": sacarla marca el paseo (src/api/client.js, fotosPaseo.sacar). Sin señal se
// marca igual y la foto se sube sola después.
function takeWalkPhoto(id, file) {
  if (!file || !id) return;
  const sel = selection();
  const stop = findStop(sel, id);
  if (!canTouch(sel, stop)) return;
  const state = progressFor(sel.now.iso, sel.shift, [stop.dog])[id];
  if (state.noSale || state.step >= STEPS.length) return;
  if (!/^image\//.test(file.type || "")) {
    view.syncError = "Eso no es una foto. Probá de nuevo.";
    announceError(view.syncError);
    scheduleRender();
    return;
  }
  const iso = sel.now.iso;
  const changes = keptSteps(state);
  if (state.step === 0) markStep(changes, 0, sel.now.time);
  const user = currentUser();
  const paseo = {
    id: paseoId(iso, stop.dog.id, sel.shift),
    fecha: iso,
    perroId: stop.dog.id,
    perroNombre: stop.dog.name,
    turno: sel.shift,
    ruta: stop.route.ruta,
    ...changes,
    horaPaseoPor: user.usuario || "",
    horaPaseoPorNombre: user.nombre || "",
    sinFotoPaseo: false,
  };
  const before = snapshotPaseo(state);
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const key = `paseos:${paseo.id}`;
  const shown = { ...(optimistic.get(key) || {}), ...paseo, estado: "paseando", horaPaseo: sel.now.time, ...(offline ? { fotoPendiente: true } : {}) };
  optimistic.set(key, shown);
  try {
    const previous = localWalkThumbs.get(paseo.id);
    if (previous) URL.revokeObjectURL(previous);
    localWalkThumbs.set(paseo.id, URL.createObjectURL(file));
  } catch {
    // Sin vista previa: se ve cuando llegue del servidor.
  }
  view.walkBusy[id] = true;
  scheduleRender();
  announce(`${stop.dog.name}: guardando la foto del paseo…`);
  const job = saveChain.then(async () => {
    try {
      const saved = await fotosPaseo.sacar(paseo, file);
      if (view.syncError) view.syncError = "";
      const pending = saved?.pendiente || saved?.fotoPendiente;
      showToast(pending ? `${stop.dog.name}: en paseo · foto por subir` : `${stop.dog.name}: en paseo ${sel.now.time}`, () => undoTo(stop, before));
    } catch (error) {
      localWalkThumbs.delete(paseo.id);
      view.syncError = `La foto no se guardó: ${error?.message || "error del servidor"} Probá de nuevo.`;
      announceError(view.syncError);
    } finally {
      if (optimistic.get(key) === shown) optimistic.delete(key);
      delete view.walkBusy[id];
      scheduleRender();
    }
  });
  saveChain = job.catch(() => null);
}

function markNoSale(id) {
  const sel = selection();
  const stop = findStop(sel, id);
  if (!canTouch(sel, stop)) return false;
  const state = progressFor(sel.now.iso, sel.shift, [stop.dog])[id];
  const before = snapshotPaseo(state);
  savePaseo(stop, sel, { estado: NO_SALE });
  showToast(`${stop.dog.name}: no sale`, () => undoTo(stop, before));
  return true;
}

// Deshacer desde el detalle (más tarde que los 5 segundos): un paso para atrás.
function stepBack(id) {
  const sel = selection();
  const stop = findStop(sel, id);
  if (!canTouch(sel, stop)) return false;
  const state = progressFor(sel.now.iso, sel.shift, [stop.dog])[id];
  const before = snapshotPaseo(state);
  if (state.noSale) {
    const back = state.times.reduce((last, time, index) => (time ? index + 1 : last), 0);
    savePaseo(stop, sel, { estado: back ? STEPS[back - 1].estado : "pendiente" });
    showToast(`${stop.dog.name}: vuelve a la ruta`, () => undoTo(stop, before));
    return true;
  }
  if (!state.step) return false;
  // Si se entregó sin foto, vuelve a "retirado" (no a un paseo sin foto).
  let keep = state.step - 1;
  if (keep === 2 && !state.times[1]) keep = 1;
  const changes = { estado: keep ? STEPS[keep - 1].estado : "pendiente" };
  STEPS.forEach((item, index) => {
    changes[item.field] = index < keep ? state.times[index] : "";
    if (index >= keep) {
      changes[`${item.field}Por`] = "";
      changes[`${item.field}PorNombre`] = "";
    }
  });
  if (keep < 2) Object.assign(changes, { fotoPaseoId: "", fotoPendiente: false });
  if (keep < 3) Object.assign(changes, { sinFotoPaseo: false, devuelvePor: "", devuelvePorNombre: "" });
  if (keep < 1) Object.assign(changes, { horaIntegrado: "", horaIntegradoPor: "", horaIntegradoPorNombre: "" });
  savePaseo(stop, sel, changes);
  showToast(`${stop.dog.name}: ${keep ? STEPS[keep - 1].done.toLowerCase() : "pendiente"}`, () => undoTo(stop, before));
  return true;
}

// ---------- acciones del ayudante ----------

// "Integrado": el perro ya se olfateó con la manada y caminó la primera cuadra con el ayudante.
function integrate(id) {
  const sel = selection();
  const stop = findStop(sel, id);
  if (!canTouch(sel, stop)) return false;
  const state = progressFor(sel.now.iso, sel.shift, [stop.dog])[id];
  if (state.noSale || state.step < 1 || state.step >= STEPS.length) return false;
  const user = currentUser();
  const before = snapshotPaseo(state);
  savePaseo(stop, sel, { horaIntegrado: sel.now.time, horaIntegradoPor: user.usuario || "", horaIntegradoPorNombre: user.nombre || "" });
  showToast(`${stop.dog.name}: integrado`, () => undoTo(stop, before));
  return true;
}

// Perros del grupo (retirados o en paseo) para las tareas del ayudante.
function helperGroups({ sel, stops, progress }) {
  const items = stops.filter((stop) => stop.canSave).map((stop) => ({ stop, state: stateOf(progress, stop) }));
  const active = items.filter((item) => !item.state.noSale && item.state.step >= 1 && item.state.step < STEPS.length);
  const mine = (item) => isMe(item.state.record?.devuelvePor);
  const byOther = (item) => Boolean(item.state.record?.devuelvePor) && !mine(item);
  const delivering = active.filter(mine);
  // Para devolver: cualquiera de la manada que no esté llevando nadie. Integrar se recomienda pero
  // no es obligatorio (un perro recién retirado también se puede devolver).
  const returnable = active.filter((item) => !mine(item) && !byOther(item));
  const picks = view.helper.picks.filter((dogId) => returnable.some((item) => item.stop.dog.id === dogId));
  view.helper.picks = picks;
  return {
    items,
    active,
    toIntegrate: active.filter((item) => !item.state.record?.horaIntegrado),
    noPhoto: active.filter((item) => item.state.step === 1 && item.state.record?.horaIntegrado && !hasWalkPhoto(item.state.record)),
    delivering,
    returnable,
    picks,
    room: Math.max(0, MAX_RETURN - delivering.length),
    next: sel.isToday ? items.filter((item) => item.state.step === 0 && !item.state.noSale) : [],
  };
}

// Elegir hasta 2 perros tocando su foto (un tercero no se puede).
function toggleReturnPick(id, ctx) {
  const groups = helperGroups(ctx);
  if (!groups.returnable.some((item) => item.stop.dog.id === id)) return;
  if (groups.picks.includes(id)) {
    view.helper.picks = groups.picks.filter((value) => value !== id);
    view.helper.status = "";
    return;
  }
  if (groups.picks.length >= groups.room) {
    view.helper.status = groups.room < MAX_RETURN ? `Máximo ${MAX_RETURN} a la vez: entregá los que llevás.` : `Máximo ${MAX_RETURN} a la vez`;
    return;
  }
  view.helper.picks = [...groups.picks, id];
  view.helper.status = "";
}

// "Voy a entregar": el paseador ve "Lo entrega <ayudante>" y sigue buscando al resto.
function startReturn(ctx) {
  const groups = helperGroups(ctx);
  const chosen = groups.returnable.filter((item) => groups.picks.includes(item.stop.dog.id)).slice(0, groups.room);
  if (!chosen.length) {
    view.helper.status = "Tocá la foto de 1 o 2 perros.";
    return false;
  }
  const sel = selection();
  const user = currentUser();
  const befores = chosen.map((item) => [item.stop, snapshotPaseo(item.state)]);
  chosen.forEach((item) => savePaseo(item.stop, sel, { devuelvePor: user.usuario || "", devuelvePorNombre: user.nombre || "" }));
  view.helper.picks = [];
  view.helper.status = "";
  showToast(`Llevás a ${listNames(chosen.map((item) => item.stop.dog.name))}`, () => {
    befores.forEach(([stop, snap]) => undoTo(stop, snap));
  });
  return true;
}

function cancelReturn(id) {
  const sel = selection();
  const stop = findStop(sel, id);
  if (!canTouch(sel, stop)) return false;
  const state = progressFor(sel.now.iso, sel.shift, [stop.dog])[id];
  const before = snapshotPaseo(state);
  savePaseo(stop, sel, { devuelvePor: "", devuelvePorNombre: "" });
  showToast(`${stop.dog.name}: vuelve a la manada`, () => undoTo(stop, before));
  return true;
}

// Agua: cada "Di agua" suma la hora al checklist del ayudante del día (`aguas`).
function waterRecord(iso, shift, usuario = currentUser().usuario) {
  return recordsFor("checklists", iso).get(checklistId(iso, shift, usuario)) || null;
}

function watersOf(record) {
  return (Array.isArray(record?.aguas) ? record.aguas : [])
    .map((hora) => String(hora))
    .filter((hora) => minutesOf(hora) !== null)
    .sort((a, b) => minutesOf(a) - minutesOf(b));
}

function saveWaters(iso, shift, aguas) {
  const record = { id: checklistId(iso, shift), fecha: iso, turno: shift, aguas };
  return saveShared("checklists", record, { optimisticRecord: record });
}

function giveWater() {
  const sel = selection();
  if (!sel.isToday) return false;
  const iso = sel.now.iso;
  const time = sel.now.time;
  saveWaters(iso, sel.shift, [...watersOf(waterRecord(iso, sel.shift)), time]);
  showToast(`Agua ${time}`, () => {
    const rest = watersOf(waterRecord(iso, sel.shift));
    const index = rest.lastIndexOf(time);
    if (index >= 0) rest.splice(index, 1);
    saveWaters(iso, sel.shift, rest);
    scheduleRender();
  });
  return true;
}

function toggleHeat() {
  const sel = selection();
  const iso = sel.now.iso;
  const on = waterRecord(iso, sel.shift)?.calor === true;
  const record = { id: checklistId(iso, sel.shift), fecha: iso, turno: sel.shift, calor: !on };
  saveShared("checklists", record, { optimisticRecord: record });
  announce(on ? "Sin calor." : `Hace calor: aviso de agua cada ${WATER_REMINDER_MIN} minutos.`);
}

// Calor: lo marca el ayudante, o hay un aviso de clima con "calor" para hoy.
function heatOn(sel, record) {
  if (record?.calor === true) return true;
  return activeNotices(sel.now.iso).some((aviso) => /clima/i.test(aviso.tipo || "") && /calor/i.test(`${aviso.mensaje || ""} ${aviso.titulo || ""}`));
}

// Curación leve del botiquín: va a `incidentes` con riesgo bajo.
function saveCure(ctx) {
  const cure = view.helper.cure;
  const stop = ctx.stops.find((item) => item.dog.id === cure?.dogId);
  if (!cure || !stop) return false;
  if (!cure.tipos.length) {
    view.helper.status = "Tocá qué tiene.";
    return false;
  }
  const sel = selection();
  const tipos = cure.tipos.join(", ");
  saveShared("incidentes", {
    fecha: sel.now.iso,
    hora: sel.now.time,
    perros: [stop.dog.id],
    perroNombre: stop.dog.name,
    tipos: cure.tipos,
    tipo: "curación leve",
    riesgo: "bajo",
    lesiones: "Leve",
    conducta: `Curación leve: ${tipos}`,
    accion: cure.gasa ? "Agua oxigenada y gasa" : "",
    ruta: stop.route.ruta,
    titulo: `Curación leve: ${stop.dog.name} · ${tipos}`,
  });
  view.helper.cure = null;
  view.helper.status = "";
  showToast(`Curación de ${stop.dog.name} guardada`);
  return true;
}

// "Es más grave": abre el incidente completo con lo que ya se sabe y el WhatsApp a Juan arriba.
function escalateCure(ctx) {
  const cure = view.helper.cure;
  const stop = ctx.stops.find((item) => item.dog.id === cure?.dogId);
  const tipos = cure?.tipos || [];
  writeJSON(INCIDENT_KEY, {
    step: 3,
    tipos: ["Se lastimó"],
    detalle: tipos.length ? `Lastimadura: ${tipos.join(", ")}` : "",
    dogs: stop ? [stop.dog.name] : [],
    lesiones: "Sí",
    hora: selection().now.time,
    urgente: true,
  });
  view.incidentSavedText = "";
  view.incidentStatus = "";
  view.helper.cure = null;
  view.helper.status = "";
}

// ---------- eventos ----------

function handlePaseadorClick(event) {
  if (!event.target.closest(".pw-shell")) return false;
  const target = event.target;
  const sel = () => selection();

  if (target.closest("[data-pw-logout]")) {
    navigate("/salir");
    return true;
  }

  // Pastilla del turno ("Mañana ▾"): abre el cambio de día y turno (en Más).
  if (target.closest("[data-pw-shift-menu]")) {
    goTab("mas");
    const active = document.querySelector("[data-pw-day].is-active");
    active?.scrollIntoView({ block: "center", behavior: "auto" });
    active?.focus({ preventScroll: true });
    return true;
  }

  if (target.closest("[data-pw-a11y]")) {
    // Después de este clic (si no, el panel se cierra con el mismo toque).
    setTimeout(() => document.querySelector("[data-a11y-toggle]")?.click(), 0);
    return true;
  }

  // Cámara: el cambio se escucha en el mismo input (aunque la página se redibuje mientras
  // la cámara está abierta, el input viejo sigue avisando).
  const photo = target.closest("[data-pw-photo]");
  if (photo) {
    if (!photo.dataset.pwListening) {
      photo.dataset.pwListening = "1";
      photo.addEventListener("change", () => {
        const file = photo.files?.[0];
        photo.value = "";
        uploadPhoto(photo.dataset.pwPhoto, file);
      });
    }
    return false;
  }

  const walkPhoto = target.closest("[data-pw-walkphoto]");
  if (walkPhoto) {
    if (!walkPhoto.dataset.pwListening) {
      walkPhoto.dataset.pwListening = "1";
      walkPhoto.addEventListener("change", () => {
        const file = walkPhoto.files?.[0];
        walkPhoto.value = "";
        takeWalkPhoto(walkPhoto.dataset.pwWalkphoto, file);
      });
    }
    return false;
  }

  if (target.closest("[data-pw-photo-big]")) {
    const id = target.closest("[data-pw-photo-big]").dataset.pwPhotoBig;
    archivos.abrir(id).catch((error) => {
      view.syncError = error?.message || "No se pudo abrir la foto.";
      announceError(view.syncError);
      scheduleRender();
    });
    return true;
  }

  if (target.closest("[data-pw-toast-undo]")) {
    const undo = view.toast?.undo;
    clearTimeout(toastTimer);
    view.toast = null;
    updateToast();
    undo?.();
    return true;
  }

  if (target.closest("[data-pw-dismiss-error]")) {
    view.syncError = "";
    rerender("#pw-tab-title");
    return true;
  }

  const tab = target.closest("[data-pw-tab]");
  if (tab) {
    goTab(tab.dataset.pwTab);
    return true;
  }

  if (target.closest("[data-pw-close-sheet]")) {
    closeSheet();
    return true;
  }

  const open = target.closest("[data-pw-open]");
  if (open) {
    openSheet(open.dataset.pwOpen);
    return true;
  }

  const fold = target.closest("[data-pw-fold]");
  if (fold) {
    const key = fold.dataset.pwFold;
    view.open[key] = !view.open[key];
    rerender(`[data-pw-fold="${key}"]`);
    return true;
  }

  const dayButton = target.closest("[data-pw-day]");
  if (dayButton) {
    const now = nowAR();
    const day = dayButton.dataset.pwDay;
    view.day = day === now.day ? null : day;
    rerender(`[data-pw-day="${day}"]`);
    announce(`Mostrando ${day.toLowerCase()}.`);
    return true;
  }

  const shiftButton = target.closest("[data-pw-shift]");
  if (shiftButton) {
    const shift = shiftButton.dataset.pwShift;
    view.shift = shift === shiftByClock(nowAR()) && !view.day ? null : shift;
    if (view.tab !== "mas") {
      view.tab = "ruta";
      rerender("#pw-tab-title");
    } else {
      rerender(`[data-pw-shift="${shift}"]`);
    }
    announce(`Mostrando el turno ${shift.toLowerCase()}.`);
    return true;
  }

  if (target.closest("[data-pw-today]")) {
    view.day = null;
    view.shift = null;
    rerender(view.tab === "mas" ? "[data-pw-day]" : "#pw-tab-title");
    announce("Mostrando hoy.");
    return true;
  }

  if (target.closest("[data-pw-change-ok]")) {
    view.routeChange = null;
    rerender("#pw-tab-title");
    return true;
  }

  const routeButton = target.closest("[data-pw-route]");
  if (routeButton) {
    const ruta = routeButton.dataset.pwRoute;
    savePickedRoute(sel(), ruta);
    rerender(`[data-pw-route="${CSS.escape(ruta)}"]`);
    announce(ruta ? `Ruta ${ruta}. Queda recordada en este celular.` : isHelper() ? "Elegí con qué ruta vas." : "Todas las rutas del turno.");
    return true;
  }

  const stepButton = target.closest("[data-pw-step]");
  if (stepButton) {
    const id = stepButton.dataset.pwStep;
    const where = stepButton.dataset.pwWhere;
    if (!advance(id)) return true;
    if (where === "sheet" || where === "sheet-deliver") rerender("#pw-sheet-title");
    else if (where === "hero" || where === "hero-more") rerender('[data-pw-where="hero"]');
    else if (where === "ret") rerender('[data-pw-step][data-pw-where="ret"], [data-pw-return-pick], #pw-tab-title');
    else rerender(`[data-pw-step="${CSS.escape(id)}"][data-pw-where="row"], [data-pw-walkphoto="${CSS.escape(id)}"][data-pw-where="row"]`);
    return true;
  }

  // ----- ayudante -----
  const integrateButton = target.closest("[data-pw-integrate]");
  if (integrateButton) {
    if (integrate(integrateButton.dataset.pwIntegrate)) rerender("[data-pw-integrate], [data-pw-water]");
    return true;
  }

  const returnPick = target.closest("[data-pw-return-pick]");
  if (returnPick) {
    const id = returnPick.dataset.pwReturnPick;
    toggleReturnPick(id, routeContext());
    rerender(`[data-pw-return-pick="${CSS.escape(id)}"]`);
    if (view.helper.status) announce(view.helper.status);
    return true;
  }

  if (target.closest("[data-pw-return-go]")) {
    const ok = startReturn(routeContext());
    rerender(ok ? '[data-pw-step][data-pw-where="ret"]' : "[data-pw-return-go]");
    if (!ok) announce(view.helper.status);
    return true;
  }

  if (target.closest("[data-pw-return-cancel]")) {
    helperGroups(routeContext()).delivering.forEach((item) => cancelReturn(item.stop.dog.id));
    rerender("[data-pw-return-pick], #pw-tab-title");
    return true;
  }

  if (target.closest("[data-pw-water]")) {
    if (giveWater()) rerender("[data-pw-water]");
    return true;
  }

  if (target.closest("[data-pw-heat]")) {
    toggleHeat();
    rerender("[data-pw-heat]");
    return true;
  }

  if (target.closest("[data-pw-cure-open]")) {
    openHelperPanel({ cure: { dogId: "", tipos: [], gasa: false } });
    return true;
  }

  const cureDog = target.closest("[data-pw-cure-dog]");
  if (cureDog && view.helper.cure) {
    view.helper.cure.dogId = cureDog.dataset.pwCureDog;
    view.helper.status = "";
    rerender("#pw-tab-title");
    return true;
  }

  const cureTipo = target.closest("[data-pw-cure-tipo]");
  if (cureTipo && view.helper.cure) {
    const tipo = cureTipo.dataset.pwCureTipo;
    const list = view.helper.cure.tipos;
    view.helper.cure.tipos = list.includes(tipo) ? list.filter((item) => item !== tipo) : [...list, tipo];
    view.helper.status = "";
    rerender(`[data-pw-cure-tipo="${CSS.escape(tipo)}"]`);
    return true;
  }

  if (target.closest("[data-pw-cure-gasa]") && view.helper.cure) {
    view.helper.cure.gasa = !view.helper.cure.gasa;
    rerender("[data-pw-cure-gasa]");
    return true;
  }

  if (target.closest("[data-pw-cure-ok]")) {
    if (saveCure(routeContext())) {
      rerender("[data-pw-cure-open]");
    } else {
      rerender("[data-pw-cure-tipo]");
      announce(view.helper.status);
    }
    return true;
  }

  if (target.closest("[data-pw-cure-grave]")) {
    escalateCure(routeContext());
    goTab("incidente");
    return true;
  }

  if (target.closest("[data-pw-cure-back]")) {
    if (view.helper.cure?.dogId) view.helper.cure.dogId = "";
    else view.helper.cure = null;
    view.helper.status = "";
    rerender(view.helper.cure ? "#pw-tab-title" : "[data-pw-cure-open]");
    return true;
  }

  if (target.closest("[data-pw-herd-open]")) {
    openHelperPanel({ herd: true });
    announce(`${HERD_LINES.join(". ")}.`);
    return true;
  }

  if (target.closest("[data-pw-herd-close]")) {
    view.helper.herd = false;
    rerender("[data-pw-herd-open]");
    return true;
  }

  const noSaleButton = target.closest("[data-pw-nosale]");
  if (noSaleButton) {
    if (markNoSale(noSaleButton.dataset.pwNosale)) rerender(view.detailId ? "#pw-sheet-title" : '[data-pw-step][data-pw-where="hero"]');
    return true;
  }

  const undoButton = target.closest("[data-pw-undo]");
  if (undoButton) {
    if (stepBack(undoButton.dataset.pwUndo)) rerender("#pw-sheet-title");
    return true;
  }

  // ----- equipo -----
  const equip = target.closest("[data-pw-equip]");
  if (equip) {
    const s = sel();
    const { checked } = checklistFor(s.now.iso, s.shift);
    const item = equip.dataset.pwEquip;
    const next = checked.includes(item) ? checked.filter((value) => value !== item) : [...checked, item];
    saveChecklist(s, next);
    rerender(`[data-pw-equip="${CSS.escape(item)}"]`);
    if (next.length >= checklistItems().length) showToast("Equipo listo. ¡A salir!");
    return true;
  }

  if (target.closest("[data-pw-equip-all]")) {
    const s = sel();
    const before = checklistFor(s.now.iso, s.shift).checked;
    saveChecklist(s, checklistItems());
    rerender("[data-pw-equip-reset]");
    showToast("Equipo listo. ¡A salir!", () => {
      saveChecklist(selection(), before);
      scheduleRender();
    });
    return true;
  }

  if (target.closest("[data-pw-equip-reset]")) {
    const s = sel();
    const before = checklistFor(s.now.iso, s.shift).checked;
    saveChecklist(s, []);
    rerender("[data-pw-equip-all]");
    showToast("Equipo desmarcado", () => {
      saveChecklist(selection(), before);
      scheduleRender();
    });
    return true;
  }

  // ----- incidente -----
  const pick = (attr, key, multi) => {
    const button = target.closest(`[${attr}]`);
    if (!button) return false;
    const value = button.getAttribute(attr);
    const draft = getDraft();
    const parsed = key === "protocolo" ? Number(value) : value;
    if (multi) {
      const list = draft[key];
      writeDraft({ [key]: list.includes(parsed) ? list.filter((item) => item !== parsed) : [...list, parsed] });
    } else {
      writeDraft({ [key]: draft[key] === parsed ? "" : parsed });
    }
    view.incidentStatus = "";
    view.confirmClear = false;
    rerender(`[${attr}="${CSS.escape(value)}"]`);
    return true;
  };
  if (pick("data-pw-inc-tipo", "tipos", true)) return true;
  if (pick("data-pw-inc-dog", "dogs", true)) return true;
  if (pick("data-pw-inc-lesion", "lesiones", false)) return true;
  if (pick("data-pw-inc-riesgo", "riesgo", false)) return true;
  if (pick("data-pw-inc-proto", "protocolo", true)) return true;

  if (target.closest("[data-pw-inc-next]")) {
    const draft = getDraft();
    const problem = validateStep(draft, draft.step);
    view.confirmClear = false;
    if (problem) {
      view.incidentStatus = problem.text;
      view.incidentWarn = true;
      rerender(problem.focus);
      announce(problem.text);
      return true;
    }
    writeDraft({ step: Math.min(3, draft.step + 1) });
    view.incidentStatus = "";
    view.incidentWarn = false;
    rerender("#pw-tab-title");
    return true;
  }

  if (target.closest("[data-pw-inc-back]")) {
    const draft = getDraft();
    writeDraft({ step: Math.max(1, draft.step - 1) });
    view.incidentStatus = "";
    rerender("#pw-tab-title");
    return true;
  }

  if (target.closest("[data-pw-inc-send]")) {
    const draft = getDraft();
    const problem = validateDraft(draft);
    if (problem) {
      if (problem.step !== draft.step) writeDraft({ step: problem.step });
      if (problem.word) view.open.more = true;
      view.incidentStatus = problem.text;
      view.incidentWarn = true;
      rerender(problem.focus);
      announce(problem.text);
      return true;
    }
    const result = buildMessage(draft, selection());
    writeDraft({ enviado: true, hora: draft.hora || selection().now.time });
    view.incidentWarn = false;
    view.incidentStatus = view.incidentSavedText === result.text ? "Ya estaba guardado. Mandalo por WhatsApp." : "Guardando…";
    rerender("#pw-tab-title");
    saveIncident(getDraft(), buildMessage(getDraft(), selection()).text);
    return true;
  }

  if (target.closest("[data-pw-inc-edit]")) {
    writeDraft({ enviado: false, step: 3 });
    view.incidentStatus = "";
    rerender("#pw-tab-title");
    return true;
  }

  // Al mandar o copiar, si el reporte cambió desde que se guardó, se actualiza en la app.
  if (target.closest("[data-pw-whatsapp]")) {
    const draft = getDraft();
    const result = buildMessage(draft, selection());
    if (result.ok) saveIncident(draft, result.text);
    return false;
  }

  if (target.closest("[data-pw-copy]")) {
    const draft = getDraft();
    const result = buildMessage(draft, selection());
    if (!result.ok) return true;
    saveIncident(draft, result.text);
    copyText(result.text).then((ok) => {
      setIncidentStatus(ok ? "Copiado. Pegalo en el chat con Juan." : "No se pudo copiar: tocá “Ver texto” y copialo a mano.", !ok);
    });
    return true;
  }

  if (target.closest("[data-pw-inc-new]")) {
    try {
      localStorage.removeItem(INCIDENT_KEY);
    } catch {
      // Nada que borrar.
    }
    view.incidentSavedText = "";
    view.open.more = false;
    view.open.message = false;
    view.incidentStatus = "";
    rerender("#pw-tab-title");
    announce("Reporte nuevo.");
    return true;
  }

  const seenBtn = target.closest("[data-pw-notice-seen]");
  if (seenBtn) {
    markNoticeSeen(seenBtn.getAttribute("data-pw-notice-seen"));
    announce("Aviso marcado como visto.");
    rerender("#pw-tab-title");
    return true;
  }

  const dictar = target.closest("[data-pw-dictar]");
  if (dictar) {
    toggleDictation(dictar);
    return true;
  }

  // "No hubo incidente": descarta el borrador (si no se envió) y vuelve a la ruta.
  if (target.closest("[data-pw-inc-none]")) {
    stopDictation();
    if (!getDraft().enviado) {
      try {
        localStorage.removeItem(INCIDENT_KEY);
      } catch {
        // Nada que borrar.
      }
    }
    view.incidentStatus = "";
    view.incidentWarn = false;
    goTab("ruta");
    return true;
  }

  // Borrar un borrador sin enviar: se confirma (no se puede deshacer).
  if (target.closest("[data-pw-clear]")) {
    if (!view.confirmClear) {
      view.confirmClear = true;
      rerender("[data-pw-clear]");
      return true;
    }
    try {
      localStorage.removeItem(INCIDENT_KEY);
    } catch {
      // Nada que borrar.
    }
    view.confirmClear = false;
    view.incidentSavedText = "";
    view.incidentStatus = "Borrado.";
    view.incidentWarn = false;
    rerender("#pw-tab-title");
    announce(view.incidentStatus);
    return true;
  }

  if (view.confirmClear) {
    view.confirmClear = false;
    const clear = document.querySelector("[data-pw-clear]");
    if (clear) {
      clear.textContent = "Borrar";
      clear.classList.remove("is-confirm");
    }
  }

  return false;
}

function handlePaseadorChange(event) {
  // Fotos: si el input ya tiene su propio oyente (se tocó antes), lo maneja él (ver
  // handlePaseadorClick); si no (llegó el archivo sin clic previo), se sube desde acá.
  const photo = event.target.closest?.("[data-pw-photo]");
  if (photo) {
    if (!photo.dataset.pwListening) {
      const file = photo.files?.[0];
      photo.value = "";
      uploadPhoto(photo.dataset.pwPhoto, file);
    }
    return true;
  }
  const walkPhoto = event.target.closest?.("[data-pw-walkphoto]");
  if (walkPhoto) {
    if (!walkPhoto.dataset.pwListening) {
      const file = walkPhoto.files?.[0];
      walkPhoto.value = "";
      takeWalkPhoto(walkPhoto.dataset.pwWalkphoto, file);
    }
    return true;
  }
  if (event.target.closest?.(".pw-shell [data-pw-field]")) {
    saveFieldFromInput(event.target);
    return true;
  }
  return false;
}

function saveFieldFromInput(field) {
  const name = field.dataset.pwField;
  if (!["detalle", "hora", "lugar", "antes", "accion", "despues"].includes(name)) return;
  writeDraft({ [name]: field.value });
  if (view.incidentWarn && view.incidentStatus) {
    view.incidentStatus = "";
    view.incidentWarn = false;
    const status = document.querySelector("[data-pw-incident-status]");
    if (status) {
      status.textContent = "";
      status.classList.remove("is-warn");
    }
  }
}

function handlePaseadorInput(event) {
  const field = event.target.closest?.(".pw-shell [data-pw-field]");
  if (field) saveFieldFromInput(field);
}

function handlePaseadorKey(event) {
  if (event.key === "Escape" && view.detailId && document.querySelector(".pw-shell")) {
    event.preventDefault();
    closeSheet();
    return;
  }
  // La hoja de detalle retiene el foco mientras está abierta.
  if (event.key === "Tab" && view.detailId) {
    const sheet = document.querySelector(".pw-sheet");
    if (!sheet) return;
    const focusables = [...sheet.querySelectorAll("button:not([disabled]), input:not([disabled]), a[href], [tabindex='-1']")].filter((node) => !node.closest("[hidden]"));
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!sheet.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

export function registerPaseadorEvents() {
  clickHandlers.push(handlePaseadorClick);
  changeHandlers.push(handlePaseadorChange);
  document.addEventListener("input", handlePaseadorInput);
  document.addEventListener("keydown", handlePaseadorKey);
  // Una sola vez: cuando llegan datos nuevos (por ejemplo, lo que marcó el supervisor) se redibuja.
  onDataChange((col) => {
    if (["paseos", "checklists", "incidentes", "rutas", "plantillas", "avisos", "fotos"].includes(col)) scheduleRender();
  });
  window.addEventListener("online", scheduleRender);
  window.addEventListener("offline", scheduleRender);
  // Cuenta regresiva: cada 15 segundos se actualizan los textos en su lugar (sin redibujar);
  // si cambia el día o el turno según la hora, o un perro pasa a atrasado, se redibuja.
  setInterval(tickClock, 15 * 1000);
}

const clockState = { iso: "", shift: "", minute: -1 };

function tickClock() {
  if (!document.querySelector(".pw-shell")) return;
  const now = nowAR();
  if (now.iso !== clockState.iso || shiftByClock(now) !== clockState.shift) {
    scheduleRender();
    return;
  }
  if (now.minutes === clockState.minute) return;
  clockState.minute = now.minutes;
  document.querySelectorAll("[data-pw-countdown]").forEach((node) => {
    const cd = countdown(node.dataset.pwCountdown, now.minutes);
    node.textContent = cd.text;
    node.className = `pw-cd pw-cd--${cd.kind}`;
  });
  // Un perro que pasa a "atrasado" cambia de color y de chip: se redibuja (sin perder el foco).
  const turnedLate = [...document.querySelectorAll("[data-pw-due]")].some((node) => {
    const late = countdown(node.dataset.pwDue, now.minutes).kind === "late";
    return String(late ? 1 : 0) !== node.dataset.pwLate;
  });
  if (turnedLate) scheduleRender();
}
