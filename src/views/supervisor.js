// Vista del rol Supervisor: se asegura de que se cumplan los paseos del momento.
// El supervisor NO arma rutas (eso es del coordinador): las VE y, si hace falta un cambio
// porque habló con alguien o pasó algo, se lo PIDE al coordinador (colección `solicitudes`).
//
// Pensada para el celular (una mano, al sol), con 4 pestañas fijas abajo:
// - Ahora: contador grande (a tiempo · atrasados · entregados) y una tarjeta por perro con foto,
//   hora del próximo paso, estado y un botón grande (Marcar retirado → Marcar entregado), más
//   "No sale" (segundo toque: "Sí, avisar" al coordinador o "Solo marcar"), "Cambio" (pedido al
//   coordinador en una hoja de abajo: tipo + Enviar, el motivo es opcional) y "Más" (nota, desmarcar,
//   foto nueva). Los atrasados van primero; los listos quedan plegados. "Deshacer" dura 5 segundos
//   y mientras dura las tarjetas no cambian de lugar. Arriba, una fila de botones cortos de alertas.
// - Rutas: cada ruta con paseador, ayudante, checklist, WhatsApp y los perros en orden.
// - Pedidos: mis pedidos de cambio y la respuesta del coordinador.
// - Más: cerrar turno (resumen armado + Copiar + Cerrar), observaciones, avisos por barrio,
//   seguridad, incidentes, modo paseador y ayuda.
//
// Datos compartidos (src/api/client.js, contrato en docs/datos-compartidos.md):
// - Ruta efectiva = `rutas` del día si existe; si no, `plantillas` del día de la semana;
//   si el servidor no tiene ninguna, la planilla RPJ (plantillasDesdePlanilla) como respaldo.
// - paseos: el MISMO registro por perro, día y turno que marca el paseador.
// - checklists e incidentes: los carga el equipo en la calle (acá se leen).
// - avisos, solicitudes, observaciones y cierres: los carga el supervisor.
// - fotos: miniatura de cada perro (fotosPerros); la foto se saca con la cámara del celular.
// En localStorage quedan solo comodidades de este dispositivo: turno y pestaña elegidos,
// secciones abiertas, respuestas ya vistas y borradores sin guardar.
import {
  REAL_DOGS,
  SHIFTS,
  WEEK_DAYS,
  CATEGORIES,
  PENDIENTE,
  DATA_UPDATED,
  BUSINESS_INFO,
  TEAM,
  BARRIOS_BASE,
  plantillasDesdePlanilla,
} from "../data/realData.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";
import { session, registros, onDataChange, hoyAR, fotosPerros, archivos } from "../api/client.js";

const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SHIFT_KEYS = ["manana", "tarde"];
const FORBIDDEN_LABELS = /(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i;
// Un número largo parece un teléfono: no va en avisos ni pedidos (privacidad).
const PHONE_LIKE = /(\d[\s.-]?){8,}/;
// Tolerancias del control en vivo (definidas por Juan): retiro +10 min, paseo +15 min.
const PICKUP_GRACE = 10;
const DELIVERY_GRACE = 15;
// Colecciones compartidas que usa esta página.
const COLS = ["paseos", "checklists", "incidentes", "plantillas", "rutas", "avisos", "solicitudes", "observaciones", "cierres", "fotos"];
// Las observaciones se muestran de los últimos 7 días (pueden cargarse con fecha anterior).
const OBS_DAYS = 7;
// Pedidos de cambio: los de hoy en adelante y los de los 2 días anteriores.
const REQUEST_DAYS_BACK = 2;
const AVISO_TYPES = ["obra o corte", "perro suelto", "clima", "seguridad", "cambio de horario", "otro"];
const REQUEST_TYPES = ["no sale", "agregar perro", "cambiar hora", "cambiar paseador o ayudante", "otro"];
const REQUEST_STATES = {
  pendiente: { label: "Pendiente", tone: "warn" },
  aplicado: { label: "Aplicado", tone: "ok" },
  rechazado: { label: "Rechazado", tone: "danger" },
};
// Plantilla inicial de la planilla RPJ (respaldo si el servidor no tiene rutas).
const PLANILLA = plantillasDesdePlanilla();

// Comodidades de este dispositivo (no son datos del trabajo).
const KEYS = {
  view: "paseosJuanSupervisor_vista",
  folds: "paseosJuanSupervisor_plegado",
  observationDraft: "paseosJuanSupervisor_observacionBorrador",
  avisoDraft: "paseosJuanSupervisor_avisoBorrador",
  requestDraft: "paseosJuanSupervisor_pedidoBorrador",
  nav: "paseosJuanSupervisor_pestana",
  seen: "paseosJuanSupervisor_respuestasVistas",
};

// Claves de la versión anterior, que guardaba todo solo en el teléfono. Se suben una vez y se borran.
// (Las rutas viejas no se suben: ahora las arma el coordinador.)
const LEGACY = {
  observations: "paseosJuanSupervisor_observaciones",
  closure: "paseosJuanSupervisor_cierre",
};

// Último mensaje de estado (zona aria-live de la sección que corresponde).
let flash = null;
// Observación que espera confirmación para borrarse (paso doble, sin diálogos del navegador).
let pendingObservationDelete = null;
// Notas del cierre mientras se escriben (se guardan al salir del campo).
let closureDraft = null;
// Notas para el paseador mientras se escriben (por id de paseo) y paradas con "Nota" abierta.
const noteDrafts = new Map();
const openStops = new Set();
// Registros que se están guardando (evita doble toque mientras viaja el pedido).
const inFlight = new Set();
// Lo último que devolvió el servidor al guardar desde esta página, hasta que llegue en la lista.
const recent = new Map();
const saveQueues = new Map();
// Colecciones que ya respondieron al menos una vez (para no mostrar "vacío" mientras carga).
const loaded = new Set();
const loadErrors = new Map();
const started = new Set();
// Estado conocido de cada pedido de cambio (para avisar cuando el coordinador responde).
const requestStates = new Map();
let requestsPrimed = false;
let liveRegistered = false;
let liveTimer = null;
let lastMinute = "";
let migrationState = "idle";
// Último toque en la pantalla (para no redibujar justo debajo del dedo).
let lastPointer = 0;
const TOUCH_CALM_MS = 900;

// ---------- Utilidades ----------

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value === null || value === undefined) return fallback;
    if (Array.isArray(fallback) !== Array.isArray(value) || typeof value !== typeof fallback) return fallback;
    return value;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado): el dato vale solo mientras la página esté abierta.
  }
}

function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // nada
  }
}

// El mensaje se mantiene unos segundos aunque la página se redibuje (llegan datos, pasa el minuto).
const FLASH_MS = 8000;

function setFlash(area, text, tone = "ok") {
  flash = { area, text, tone, at: Date.now() };
  // Cuando vence, se redibuja para sacarlo de la pantalla.
  setTimeout(scheduleLive, FLASH_MS + 60);
}

function flashFor(area) {
  if (flash && Date.now() - flash.at > FLASH_MS) flash = null;
  return flash && flash.area === area ? flash : null;
}

// Zonas de mensaje dibujadas en esta pasada (lo demás va al aviso flotante de abajo).
const renderedAreas = new Set();

function statusRegion(area) {
  renderedAreas.add(area);
  const message = flashFor(area);
  return `
    <p class="sv-status ${message ? `is-${message.tone}` : ""}" role="status" aria-live="polite">${message ? esc(message.text) : ""}</p>
  `;
}

function listWithAnd(items, last = "y") {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${last} ${items[items.length - 1]}`;
}

function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

// Minutos del día a "HH:MM".
function clock(minutes) {
  const total = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// Minutos a texto completo (Juan pidió palabras sin abreviar): "25 minutos", "2 horas y 24 minutos".
function duration(minutes) {
  const total = Math.max(0, Math.round(Number(minutes) || 0));
  const minutos = (n) => `${n} ${n === 1 ? "minuto" : "minutos"}`;
  if (total < 60) return minutos(total);
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  const horas = `${hours} ${hours === 1 ? "hora" : "horas"}`;
  return rest ? `${horas} y ${minutos(rest)}` : horas;
}

function toMinutes(time) {
  const match = String(time || "").match(/^(\d{1,2}):(\d{2})/);
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function safeId(text) {
  return String(text).replace(/[^a-z0-9_.-]/gi, "-").slice(0, 100);
}

function plain(text) {
  return String(text || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

// Fecha y hora actuales en Argentina, sin depender de la zona del dispositivo.
function nowInArgentina() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TIME_ZONE,
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
  const iso = `${parts.year}-${parts.month}-${parts.day}`;
  const weekday = new Date(`${iso}T12:00:00Z`).getUTCDay();
  return {
    iso,
    label: `${parts.day}/${parts.month}/${parts.year}`,
    time: `${parts.hour}:${parts.minute}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    dayName: WEEK_DAYS[(weekday + 6) % 7],
  };
}

function addDays(iso, days) {
  const date = new Date(`${iso}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function isoToLabel(iso) {
  const [year, month, day] = String(iso || "").split("-");
  return year && month && day ? `${day}/${month}/${year}` : PENDIENTE;
}

// "DD/MM/AAAA" → "AAAA-MM-DD" solo si es una fecha real del calendario.
function labelToIso(label) {
  const match = String(label || "").trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  const iso = `${match[3]}-${match[2]}-${match[1]}`;
  const date = new Date(`${iso}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === iso ? iso : null;
}

// Hora argentina (HH:MM) de una marca de tiempo del servidor.
function timeOf(isoStamp) {
  const date = new Date(isoStamp || "");
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
}

function dateOfStamp(isoStamp) {
  const date = new Date(isoStamp || "");
  return Number.isNaN(date.getTime()) ? null : hoyAR(date);
}

function stampFromLegacyId(id) {
  const ms = Number(String(id || "").replace(/^\D+/, ""));
  return Number.isFinite(ms) && ms > 1e12 ? new Date(ms).toISOString() : null;
}

function currentShiftKey(now) {
  // Entre turnos (después de las 13:30) ya se muestra la tarde.
  return now.minutes < 13 * 60 + 30 ? "manana" : "tarde";
}

// "Mañana" / "manana" / "Tarde" → "manana" / "tarde".
function shiftKeyOf(turno) {
  const text = plain(turno);
  if (text.startsWith("man")) return "manana";
  if (text.startsWith("tar")) return "tarde";
  return null;
}

function shiftMoment(shiftKey, now) {
  const shift = SHIFTS[shiftKey];
  if (now.minutes < toMinutes(shift.from)) return { label: `Empieza a las ${shift.from}`, tone: "next" };
  if (now.minutes <= toMinutes(shift.to)) return { label: "En curso", tone: "live" };
  return { label: "Terminado", tone: "done" };
}

function currentUser() {
  return session.user() || {};
}

function canDelete(record) {
  const user = currentUser();
  if (!record || record.pendiente) return false;
  return user.rol === "admin" || (record.creadoPor && record.creadoPor === user.usuario);
}

// Nombre para mostrar de un usuario: equipo autorizado, nombres que guardó el servidor o el usuario tal cual.
function personName(usuario, record) {
  if (!usuario) return "";
  if (record?.actualizadoPor === usuario && record.actualizadoPorNombre) return record.actualizadoPorNombre;
  if (record?.creadoPor === usuario && record.creadoPorNombre) return record.creadoPorNombre;
  const user = currentUser();
  if (user.usuario === usuario && user.nombre) return user.nombre;
  const team = TEAM.find((person) => person.id === usuario);
  if (team) return team.name;
  if (routeNames.has(usuario)) return routeNames.get(usuario);
  for (const col of ["checklists", "paseos", "incidentes"]) {
    for (const item of records(col)) {
      if (item.creadoPor === usuario && item.creadoPorNombre) return item.creadoPorNombre;
      if (item.actualizadoPor === usuario && item.actualizadoPorNombre) return item.actualizadoPorNombre;
    }
  }
  return usuario;
}

// "Marcó Sebastián a las 10:15 hs" (o aviso si todavía no salió por falta de señal).
function lastMark(record, verb = "Marcó") {
  if (!record) return "";
  if (record.pendiente) return "Se enviará cuando haya señal.";
  const who = personName(record.actualizadoPor || record.creadoPor, record);
  const at = timeOf(record.actualizadoEn || record.creadoEn);
  return who ? `${verb} ${who}${at ? ` a las ${at}` : ""}.` : "";
}

// ---------- Datos compartidos ----------

function watchOpts(col) {
  const today = hoyAR();
  if (col === "plantillas" || col === "avisos" || col === "fotos") return {};
  if (col === "observaciones") return { desde: addDays(today, -(OBS_DAYS - 1)) };
  if (col === "solicitudes") return { desde: addDays(today, -REQUEST_DAYS_BACK) };
  return { desde: today };
}

function startWatching() {
  if (!session.token()) return;
  COLS.forEach((col) => {
    const opts = watchOpts(col);
    const key = `${col}|${opts.desde || ""}`;
    if (started.has(key)) return;
    started.add(key);
    if (col === "solicitudes") primeRequests();
    registros.watch(col, opts);
    // Primera carga: sirve para saber cuándo ya respondió el servidor (y mostrar errores).
    registros
      .list(col, opts)
      .then(() => {
        loaded.add(col);
        loadErrors.delete(col);
      })
      .catch((error) => {
        loaded.add(col);
        loadErrors.set(col, error?.message || "No se pudieron traer los datos.");
      })
      .finally(scheduleLive);
  });
}

// Lo que hay en caché (instantáneo) + lo que acabamos de guardar, quedándose con lo más nuevo.
function records(col) {
  const byId = new Map(registros.cached(col, watchOpts(col)).map((record) => [record.id, record]));
  recent.forEach((record, key) => {
    if (!key.startsWith(`${col}:`)) return;
    const current = byId.get(record.id);
    if (!current || (!current.pendiente && String(current.actualizadoEn || "") < String(record.actualizadoEn || ""))) {
      byId.set(record.id, record);
    }
  });
  return [...byId.values()];
}

// Los guardados de un mismo registro van en fila: así ninguno pisa al otro.
function persist(col, data, area, okText, tone = "ok") {
  if (!data.id) return persistNow(col, data, area, okText, tone);
  const key = `${col}:${data.id}`;
  const next = (saveQueues.get(key) || Promise.resolve()).then(() => persistNow(col, data, area, okText, tone));
  saveQueues.set(key, next);
  next.then(() => {
    if (saveQueues.get(key) === next) saveQueues.delete(key);
  });
  return next;
}

async function persistNow(col, data, area, okText, tone) {
  try {
    const result = await registros.save(col, data);
    if (result.pendiente) {
      setFlash(area, `${okText} Sin señal: se enviará cuando haya conexión.`, "info");
    } else {
      const key = `${col}:${result.id}`;
      const previous = recent.get(key);
      if (!previous || String(previous.actualizadoEn || "") <= String(result.actualizadoEn || "")) recent.set(key, result);
      setFlash(area, okText, tone);
    }
    return result;
  } catch (error) {
    setFlash(area, error?.message || "No se pudo guardar. Probá de nuevo.", "error");
    return null;
  }
}

async function removeRecord(col, id, area, okText) {
  try {
    await registros.remove(col, id);
    recent.delete(`${col}:${id}`);
    setFlash(area, okText, "info");
    return true;
  } catch (error) {
    setFlash(area, error?.message || "No se pudo borrar. Probá de nuevo.", "error");
    return false;
  }
}

async function refreshAll(announce = true) {
  if (!session.token()) return;
  const results = await Promise.allSettled(COLS.map((col) => registros.list(col, watchOpts(col))));
  results.forEach((result, index) => {
    loaded.add(COLS[index]);
    if (result.status === "rejected") loadErrors.set(COLS[index], result.reason?.message || "No se pudieron traer los datos.");
    else loadErrors.delete(COLS[index]);
  });
  if (!announce) return;
  const failed = results.find((result) => result.status === "rejected");
  if (failed) setFlash("sync", failed.reason?.message || "No se pudieron traer los datos.", "error");
  else if (!navigator.onLine) setFlash("sync", "Sin señal: ves lo último que se guardó en este teléfono.", "info");
  else setFlash("sync", `Datos actualizados a las ${nowInArgentina().time} hs.`);
  rerender("sv-refresh");
}

function onSupervisorPage() {
  return window.location.pathname.replace(/\/+$/, "") === "/supervisor";
}

// Redibuja cuando llegan datos nuevos sin perder lo que se está escribiendo ni el foco.
function liveRerender() {
  liveTimer = null;
  if (!onSupervisorPage() || !document.querySelector(".sv-shell")) return;
  // Si el dedo acaba de tocar la pantalla se espera un poco: así una tarjeta no se mueve bajo el dedo.
  const wait = TOUCH_CALM_MS - (Date.now() - lastPointer);
  if (wait > 0) {
    liveTimer = setTimeout(liveRerender, wait);
    return;
  }
  renderKeepingFocus();
}

// Las secciones que se acaban de abrir o cerrar se respetan aunque el evento toggle no haya llegado.
function syncFolds() {
  const folds = readJSON(KEYS.folds, {});
  let foldsChanged = false;
  document.querySelectorAll(".sv-shell [data-sv-fold]").forEach((details) => {
    if (folds[details.dataset.svFold] !== details.open) {
      folds[details.dataset.svFold] = details.open;
      foldsChanged = true;
    }
  });
  if (foldsChanged) writeJSON(KEYS.folds, folds);
  document.querySelectorAll(".sv-shell [data-sv-stop-more]").forEach((details) => {
    if (details.open) openStops.add(details.dataset.svStopMore);
    else openStops.delete(details.dataset.svStopMore);
  });
}

function renderKeepingFocus() {
  syncFolds();
  const active = document.activeElement;
  const id = active?.id || "";
  let selection = null;
  try {
    if (active && typeof active.selectionStart === "number") selection = [active.selectionStart, active.selectionEnd];
  } catch {
    selection = null;
  }
  const scrollY = window.scrollY;
  render();
  if (Math.abs(window.scrollY - scrollY) > 2) window.scrollTo(0, scrollY);
  if (!id) return;
  const element = document.getElementById(id);
  if (!element) return;
  element.focus({ preventScroll: true });
  if (selection && typeof element.setSelectionRange === "function") {
    try {
      element.setSelectionRange(selection[0], selection[1]);
    } catch {
      // Algunos campos (fecha, hora) no admiten selección.
    }
  }
}

function scheduleLive() {
  if (liveTimer) return;
  liveTimer = setTimeout(liveRerender, 40);
}

// Cada minuto se recalculan los atrasos aunque no lleguen datos nuevos.
function minuteTick() {
  if (!onSupervisorPage() || !document.querySelector(".sv-shell")) return;
  const time = nowInArgentina().time;
  if (time === lastMinute) return;
  // Con un desplegable abierto se espera al próximo control (redibujar lo cerraría).
  if (document.activeElement?.tagName === "SELECT") return;
  scheduleLive();
}

// Guarda el estado conocido de los pedidos sin avisar (lo que ya estaba en este teléfono).
function primeRequests() {
  if (requestsPrimed) return;
  records("solicitudes").forEach((item) => requestStates.set(item.id, item.estado || "pendiente"));
  requestsPrimed = true;
}

// Si el coordinador respondió un pedido mío, se avisa y se traen las rutas al instante.
function checkRequestAnswers() {
  const me = currentUser().usuario;
  const answered = [];
  records("solicitudes").forEach((item) => {
    const estado = item.estado || "pendiente";
    const before = requestStates.get(item.id);
    if (requestsPrimed && before && before !== estado && estado !== "pendiente" && item.creadoPor === me) answered.push(item);
    requestStates.set(item.id, estado);
  });
  if (!answered.length) return;
  const applied = answered.filter((item) => item.estado === "aplicado");
  const text = answered
    .map((item) => `${item.estado === "aplicado" ? "aplicó" : "rechazó"} «${requestTitle(item)}»${item.respuesta ? `: ${item.respuesta}` : ""}`)
    .join(" · ");
  setFlash("requests", `El coordinador ${text}.${applied.length ? " La ruta ya muestra el cambio." : ""}`, applied.length ? "ok" : "info");
  if (applied.length) {
    registros.list("rutas", watchOpts("rutas")).catch(() => {});
    registros.list("plantillas", watchOpts("plantillas")).catch(() => {});
  }
}

// Se registra UNA sola vez (al arrancar la app).
function registerLive() {
  if (liveRegistered) return;
  liveRegistered = true;
  onDataChange((col) => {
    if (!COLS.includes(col)) return;
    loaded.add(col);
    if (col === "solicitudes") checkRequestAnswers();
    scheduleLive();
  });
  document.addEventListener("pointerdown", () => {
    lastPointer = Date.now();
  }, true);
  window.addEventListener("online", scheduleLive);
  window.addEventListener("offline", scheduleLive);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && onSupervisorPage()) refreshAll(false);
  });
  setInterval(minuteTick, 10 * 1000);
}

// ---------- Migración de la versión anterior ----------

function legacyPending() {
  try {
    return Object.values(LEGACY).some((key) => localStorage.getItem(key) !== null);
  } catch {
    return false;
  }
}

function legacyObservationRecord(obs) {
  if (!obs || typeof obs !== "object" || !obs.dogId) return null;
  const dog = dogById(obs.dogId);
  const fecha = labelToIso(obs.fecha) || dateOfStamp(stampFromLegacyId(obs.id)) || hoyAR();
  return {
    id: safeId(`${fecha}_${obs.id || Date.now()}`),
    fecha,
    hora: obs.hora || "",
    perroId: obs.dogId,
    perroNombre: dog ? dog.name : "",
    lugar: obs.lugar || "",
    estimulo: obs.estimulo || "",
    reaccion: obs.reaccion || "",
    accion: obs.accion || "",
    resultado: obs.resultado || "",
    seguimiento: Boolean(obs.seguimiento),
    turno: SHIFTS[obs.shift]?.label || "",
    titulo: `Observación: ${dog ? dog.name : PENDIENTE}`,
    autorAnterior: obs.autor || "",
    migrado: true,
  };
}

async function uploadLegacy(col, record) {
  try {
    await registros.save(col, record);
    return null;
  } catch (error) {
    return error?.message || "Error al subir.";
  }
}

// Sube una sola vez lo que quedó guardado solo en este teléfono y deja de usar esas claves.
async function migrateLegacy() {
  if (migrationState !== "idle" || !session.token() || !legacyPending() || !navigator.onLine) return;
  migrationState = "running";
  let uploaded = 0;
  let failed = 0;
  let lastError = "";

  const oldObservations = readJSON(LEGACY.observations, []);
  const keepObservations = [];
  for (const obs of oldObservations) {
    const record = legacyObservationRecord(obs);
    if (!record) continue;
    const error = await uploadLegacy("observaciones", record);
    if (error) {
      keepObservations.push(obs);
      failed += 1;
      lastError = error;
    } else uploaded += 1;
  }
  if (keepObservations.length) writeJSON(LEGACY.observations, keepObservations);
  else removeKey(LEGACY.observations);

  // Cierres: no se pisa un cierre que ya esté cargado en el servidor (otro supervisor pudo cerrarlo).
  const oldClosures = readJSON(LEGACY.closure, {});
  const entries = Object.entries(oldClosures).filter(([key, value]) => {
    const [iso, shift] = key.split("|");
    return /^\d{4}-\d{2}-\d{2}$/.test(iso) && SHIFT_KEYS.includes(shift) && value && (String(value.notas || "").trim() || value.cerrado);
  });
  if (entries.length) {
    const desde = entries.map(([key]) => key.split("|")[0]).sort()[0];
    let existing = null;
    try {
      existing = new Set((await registros.list("cierres", { desde })).filter((record) => !record.pendiente).map((record) => record.id));
    } catch (error) {
      lastError = error?.message || "No se pudieron revisar los cierres.";
    }
    if (existing) {
      const keepClosures = {};
      for (const [key, value] of entries) {
        const [iso, shift] = key.split("|");
        const id = `${iso}_${shift}`;
        if (existing.has(id)) continue;
        const error = await uploadLegacy("cierres", {
          id,
          fecha: iso,
          turno: SHIFTS[shift].label,
          notas: String(value.notas || ""),
          resumen: "",
          cerrado: Boolean(value.cerrado),
          horaCierre: value.cerrado ? String(value.cerrado) : "",
          migrado: true,
        });
        if (error) {
          keepClosures[key] = value;
          failed += 1;
          lastError = error;
        } else uploaded += 1;
      }
      if (Object.keys(keepClosures).length) writeJSON(LEGACY.closure, keepClosures);
      else removeKey(LEGACY.closure);
    } else {
      failed += entries.length;
    }
  } else {
    removeKey(LEGACY.closure);
  }

  migrationState = "done";
  if (uploaded || failed) {
    setFlash(
      "sync",
      failed
        ? `Se subieron ${uploaded} registros de la versión anterior y ${failed} no se pudieron subir (${lastError}). Quedan en este teléfono.`
        : `Se subieron ${uploaded} registro${uploaded === 1 ? "" : "s"} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,
      failed ? "error" : "ok",
    );
  }
  scheduleLive();
}

// ---------- Estado de la vista ----------

// El supervisor mira siempre HOY. Puede pasar al otro turno del día (por defecto, el actual).
function getView() {
  const now = nowInArgentina();
  const stored = readJSON(KEYS.view, {});
  const fallback = currentShiftKey(now);
  const shift = stored.date === now.iso && SHIFT_KEYS.includes(stored.shift) ? stored.shift : fallback;
  return { day: now.dayName, shift, now, isToday: true, isCurrent: shift === fallback, fecha: now.iso, fechaLabel: now.label };
}

function saveView(shift) {
  writeJSON(KEYS.view, { date: nowInArgentina().iso, shift });
}

function isFoldOpen(name, fallback = false) {
  const folds = readJSON(KEYS.folds, {});
  return typeof folds[name] === "boolean" ? folds[name] : fallback;
}

// ---------- Perros ----------

function dogById(id) {
  return REAL_DOGS.find((dog) => dog.id === id);
}

function dogByName(name) {
  const key = plain(name);
  return REAL_DOGS.find((dog) => plain(dog.name) === key);
}

function usesMuzzle(dog) {
  return (dog?.safety || []).some((note) => /bozal/i.test(note));
}

function muzzleNote(dog) {
  return (dog?.safety || []).find((note) => /bozal/i.test(note)) || "";
}

// Con quién NO puede ir un perro, en los dos sentidos: la planilla a veces lo anota en uno solo
// (Pistacho dice "no juntar con Cashi", pero la ficha de Cashi no dice nada).
function noJuntarNames(dog) {
  if (!dog) return [];
  const names = new Set(dog.incompatibleWith || []);
  REAL_DOGS.forEach((other) => {
    if (other.id !== dog.id && (other.incompatibleWith || []).includes(dog.name)) names.add(other.name);
  });
  return [...names];
}

// ---------- Rutas efectivas (las arma el coordinador; acá solo se leen) ----------

function sameDay(a, b) {
  return plain(a) === plain(b);
}

function normalizeStop(stop) {
  const dog = (stop.perroId && dogById(stop.perroId)) || (stop.perroNombre && dogByName(stop.perroNombre)) || null;
  const minutos = Number(stop.minutos) || dog?.minutes || null;
  return {
    // Solo ids con formato seguro: el valor se usa en atributos del HTML.
    perroId: dog?.id || (/^[A-Za-z0-9_.-]{1,40}$/.test(String(stop.perroId || "")) ? String(stop.perroId) : ""),
    perroNombre: stop.perroNombre || dog?.name || PENDIENTE,
    hora: toMinutes(stop.hora) === null ? "" : String(stop.hora).slice(0, 5),
    minutos,
    nota: stop.nota || "",
    dog,
  };
}

// Nombres que el coordinador guardó en la ruta (paseadorNombre / ayudanteNombre), si los guardó.
const routeNames = new Map();

function normalizeRoute(record, source) {
  if (record.paseador && record.paseadorNombre) routeNames.set(record.paseador, String(record.paseadorNombre));
  if (record.ayudante && record.ayudanteNombre) routeNames.set(record.ayudante, String(record.ayudanteNombre));
  // Registros de la versión anterior (lista de perros sin horario).
  const stops = Array.isArray(record.paradas)
    ? record.paradas
    : Array.isArray(record.perros)
      ? record.perros.map((id) => ({ perroId: id, perroNombre: dogById(id)?.name || id, hora: "" }))
      : [];
  return {
    code: record.ruta || record.id || PENDIENTE,
    source,
    record,
    paseador: record.paseador || "",
    ayudante: record.ayudante || "",
    supervisor: record.supervisor || "",
    notas: record.notas || "",
    stops: stops.map(normalizeStop),
  };
}

// Ruta efectiva de hoy para un turno: rutas del día > plantilla semanal > planilla RPJ (respaldo).
function routesFor(view) {
  const byCode = new Map();
  records("plantillas")
    .filter((record) => sameDay(record.dia, view.day) && shiftKeyOf(record.turno) === view.shift)
    .forEach((record) => byCode.set(record.ruta || record.id, normalizeRoute(record, "plantilla")));
  records("rutas")
    .filter((record) => record.fecha === view.fecha && shiftKeyOf(record.turno) === view.shift)
    .forEach((record) => byCode.set(record.ruta || record.id, normalizeRoute(record, "dia")));
  const loading = !(loaded.has("plantillas") && loaded.has("rutas"));
  let fallback = false;
  if (!byCode.size) {
    PLANILLA.filter((record) => sameDay(record.dia, view.day) && shiftKeyOf(record.turno) === view.shift).forEach((record) =>
      byCode.set(record.ruta, normalizeRoute(record, "planilla")),
    );
    fallback = byCode.size > 0;
  }
  const routes = [...byCode.values()].sort((a, b) => a.code.localeCompare(b.code));
  return { routes, fallback, loading };
}

function routeSourceLabel(route) {
  if (route.source === "dia") return "Cambio del día (coordinador)";
  if (route.source === "plantilla") return "Plantilla semanal (coordinador)";
  return "Planilla RPJ (respaldo)";
}

// Perros únicos del turno (con ficha), en el orden en que aparecen en las rutas.
function routeDogs(routes) {
  const seen = new Map();
  routes.forEach((route) =>
    route.stops.forEach((stop) => {
      if (stop.dog && !seen.has(stop.dog.id)) seen.set(stop.dog.id, stop.dog);
    }),
  );
  return [...seen.values()];
}

// ---------- Paseos (retiro y entrega) y atrasos ----------

function paseoId(fecha, dogId, shiftKey) {
  return `${fecha}_${dogId}_${shiftKey}`;
}

function paseosById() {
  return new Map(records("paseos").map((record) => [record.id, record]));
}

// Estado real de un perro contra el horario previsto. live: se compara con la hora actual.
function stopStatus(stop, record, nowMinutes) {
  const estado = record?.estado || "pendiente";
  const planned = toMinutes(stop.hora);
  const minutos = Number(stop.minutos) || null;
  const pickedAt = toMinutes(record?.horaRetiro);
  const retirado = ["retirado", "paseando", "entregado"].includes(estado);
  const start = pickedAt ?? planned;
  const pickupDelay = retirado && pickedAt !== null && planned !== null ? pickedAt - planned : 0;
  const pickupLate = pickupDelay > PICKUP_GRACE;
  const base = { estado, retirado, record, pickupDelay, pickupLate, planned, minutos };

  if (estado === "no-sale") return { ...base, kind: "nosale", label: "No sale", tone: "neutral", live: "nosale" };

  if (estado === "entregado") {
    const deliveredAt = toMinutes(record?.horaEntrega);
    const duration = deliveredAt !== null && start !== null ? deliveredAt - start : null;
    const deliveryLate = duration !== null && minutos ? duration > minutos + DELIVERY_GRACE : false;
    return {
      ...base,
      kind: "entregado",
      label: `Entregado${record?.horaEntrega ? ` ${record.horaEntrega}` : ""}`,
      tone: "ok",
      live: "entregado",
      duration,
      deliveryLate,
      late: pickupLate || deliveryLate,
    };
  }

  if (retirado) {
    const walked = start !== null ? nowMinutes - start : null;
    if (walked !== null && minutos && walked > minutos + DELIVERY_GRACE) {
      return { ...base, kind: "demorada", label: `Demora ${duration(walked - minutos)}`, tone: "danger", live: "atrasado", walked, late: true };
    }
    const label = estado === "paseando" ? "Paseando" : `Retirado${record?.horaRetiro ? ` ${record.horaRetiro}` : ""}`;
    return { ...base, kind: "curso", label, tone: "info", live: "atiempo", walked, late: pickupLate };
  }

  if (planned === null) return { ...base, kind: "sinhora", label: "Sin hora", tone: "neutral", live: "atiempo" };
  const delay = nowMinutes - planned;
  if (delay > PICKUP_GRACE) return { ...base, kind: "atrasado", label: `Atrasado ${duration(delay)}`, tone: "danger", live: "atrasado", delay, late: true };
  if (delay >= 0) return { ...base, kind: "ahora", label: "Retirar ya", tone: "warn", live: "atiempo", delay };
  return { ...base, kind: "espera", label: "Pendiente", tone: "neutral", live: "atiempo" };
}

function routeStatuses(view, route, byId = paseosById()) {
  return route.stops.map((stop) => {
    const id = stop.perroId ? paseoId(view.fecha, stop.perroId, view.shift) : "";
    return { stop, id, status: stopStatus(stop, id ? byId.get(id) : null, view.now.minutes) };
  });
}

function countLive(items) {
  const counts = { atiempo: 0, atrasado: 0, entregado: 0, nosale: 0 };
  items.forEach(({ status }) => {
    counts[status.live] += 1;
  });
  return counts;
}

// ---------- Checklists, incidentes, avisos y pedidos ----------

function checklistsFor(fecha, shiftKey) {
  return records("checklists").filter(
    (record) => record.fecha === fecha && (shiftKeyOf(record.turno) === shiftKey || String(record.id).endsWith(`_${shiftKey}`)),
  );
}

function checklistOf(fecha, shiftKey, usuario) {
  if (!usuario) return null;
  return checklistsFor(fecha, shiftKey).find((record) => record.id === `${fecha}_${usuario}_${shiftKey}` || record.creadoPor === usuario) || null;
}

function checklistInfo(record) {
  const items = record.items && typeof record.items === "object" ? Object.entries(record.items) : [];
  const missing = items.filter(([, value]) => !value).map(([name]) => humanize(name));
  const complete = typeof record.completo === "boolean" ? record.completo : items.length > 0 && !missing.length;
  return { complete, missing, who: personName(record.creadoPor || record.actualizadoPor, record), at: timeOf(record.actualizadoEn || record.creadoEn) };
}

function humanize(name) {
  const text = String(name).replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").trim().toLowerCase();
  return text ? text[0].toUpperCase() + text.slice(1) : PENDIENTE;
}

function incidentsFor(fecha) {
  return records("incidentes")
    .filter((record) => record.fecha === fecha)
    .sort((a, b) => String(a.hora || a.creadoEn || "").localeCompare(String(b.hora || b.creadoEn || "")));
}

function incidentDogs(record) {
  if (record.perroNombre) return record.perroNombre;
  const names = (Array.isArray(record.perros) ? record.perros : []).map((id) => dogById(id)?.name || id);
  return names.length ? listWithAnd(names) : PENDIENTE;
}

// Avisos vigentes: hasta la fecha que dice el aviso (o solo el día en que se cargó).
function activeAvisos(today) {
  return records("avisos")
    .filter((record) => (record.vigenteHasta ? record.vigenteHasta >= today : record.fecha === today) && (!record.fecha || record.fecha <= today))
    .sort((a, b) => Number(b.tipo === "seguridad") - Number(a.tipo === "seguridad") || String(b.fecha || "").localeCompare(String(a.fecha || "")));
}

function requestTitle(item) {
  const tipo = item.tipo ? `${item.tipo[0].toUpperCase()}${item.tipo.slice(1)}` : "Cambio";
  return `${tipo}${item.perroNombre ? ` · ${item.perroNombre}` : ""}${item.ruta ? ` · ${item.ruta}` : ""}`;
}

function requestsFor(fecha, shiftKey) {
  return records("solicitudes").filter((item) => item.fecha === fecha && shiftKeyOf(item.turno) === shiftKey);
}

function myRequests(today) {
  const me = currentUser().usuario;
  return records("solicitudes")
    .filter((item) => (item.creadoPor ? item.creadoPor === me : item.pendiente) && (item.fecha >= today || (item.estado || "pendiente") === "pendiente"))
    .sort((a, b) => String(b.creadoEn || "9").localeCompare(String(a.creadoEn || "9")));
}

// Pedido de cambio a medio armar (hoja de abajo). from: desde dónde se abrió (perro, ruta o turno).
function emptyRequest(view, ruta = "", perroId = "", open = false, from = "turno", tipo = "") {
  const dog = perroId ? dogById(perroId) : null;
  return {
    fecha: view.fecha,
    shift: view.shift,
    ruta,
    perroId: dog?.id || "",
    perroNombre: dog?.name || "",
    from,
    tipo: tipo || (dog ? "no sale" : "otro"),
    motivo: "",
    texto: "",
    hora: "",
    extraDog: "",
    urgente: false,
    open,
  };
}

function getRequestDraft(view) {
  const stored = readJSON(KEYS.requestDraft, {});
  if (stored.fecha !== view.fecha || stored.shift !== view.shift) return emptyRequest(view);
  return { ...emptyRequest(view), ...stored };
}

// ---------- Seguridad ----------

function incompatiblePairs(routes) {
  const seen = new Set();
  const pairs = [];
  routes.forEach((route) => {
    const names = new Set(route.stops.map((stop) => stop.dog?.name).filter(Boolean));
    route.stops.forEach(({ dog }) => {
      (dog?.incompatibleWith || []).forEach((other) => {
        const key = [dog.name, other].sort().join("|");
        if (seen.has(key)) return;
        const otherRoute = names.has(other) ? route : routes.find((item) => item.stops.some((stop) => stop.dog?.name === other));
        if (!otherRoute) return;
        seen.add(key);
        pairs.push({ a: dog.name, b: other, sameRoute: otherRoute === route, route: route.code, otherRoute: otherRoute.code });
      });
    });
  });
  return pairs.sort((x, y) => Number(y.sameRoute) - Number(x.sameRoute));
}

// Avisos del turno, ordenados por gravedad. Los de seguridad (no juntar y bozal) van siempre primero.
function shiftWarnings(routes) {
  const dogs = routeDogs(routes);
  const pairs = incompatiblePairs(routes);
  const muzzle = dogs.filter(usesMuzzle);
  const inactive = dogs.filter((dog) => dog.status !== "Activo");
  const review = dogs.filter((dog) => dog.review && dog.status === "Activo");
  const unevaluated = dogs.filter((dog) => dog.category === "SIN EVALUAR");
  const noFile = routes.flatMap((route) => route.stops.filter((stop) => !stop.dog).map((stop) => `${stop.perroNombre} (${route.code})`));
  const warnings = [];

  if (pairs.length) {
    warnings.push({
      tone: "danger",
      icon: "alertTriangle",
      title: pairs.length === 1 ? "Hay 2 perros que no pueden ir juntos" : `Hay ${pairs.length} parejas que no pueden ir juntas`,
      short: `No juntar: ${plural(pairs.length, "pareja", "parejas")}`,
      chip: "No juntar",
      count: pairs.length,
      lines: pairs.map((pair) => `No juntar: ${pair.a} con ${pair.b}${pair.sameRoute ? ` (los dos en ${pair.route})` : ` (${pair.route} y ${pair.otherRoute}: que no se crucen)`}.`),
      action: pairs.some((pair) => pair.sameRoute)
        ? "Que no caminen juntos. Si la ruta los junta, pedile el cambio al coordinador."
        : "Que los paseadores no se crucen con esos perros.",
      source: "Fuente: indicaciones de seguridad de la planilla RPJ.",
    });
  }

  if (muzzle.length) {
    warnings.push({
      tone: "warn",
      icon: "shieldCheck",
      title: `Confirmá el bozal de ${plural(muzzle.length, "perro", "perros")}`,
      short: `Bozal: ${muzzle.map((dog) => dog.name).join(", ")}`,
      chip: "Bozal",
      count: muzzle.length,
      lines: muzzle.map((dog) => `${dog.name}: ${muzzleNote(dog)}.`),
      action: "Que salga con el bozal puesto y revisado.",
      source: "Fuente: indicaciones de seguridad de la planilla RPJ.",
    });
  }

  if (inactive.length) {
    warnings.push({
      tone: "warn",
      icon: "alertCircle",
      title: `Confirmá si ${inactive.length === 1 ? `sale ${inactive[0].name}` : `salen ${inactive.length} perros`}`,
      short: `¿Sale? ${inactive.map((dog) => dog.name).join(", ")}`,
      chip: "¿Sale?",
      count: inactive.length,
      lines: inactive.map((dog) => `${dog.name} (${dog.status}): ${dog.review || PENDIENTE}`),
      action: "Preguntale a Juan antes de retirarlo.",
      source: "Fuente: Perros paseados (noviembre) y BASE RUTAS.",
    });
  }

  if (noFile.length) {
    warnings.push({
      tone: "warn",
      icon: "alertCircle",
      title: `${plural(noFile.length, "perro de la ruta no tiene", "perros de la ruta no tienen")} ficha`,
      short: `Sin ficha: ${plural(noFile.length, "perro", "perros")}`,
      chip: "Sin ficha",
      count: noFile.length,
      lines: noFile.map((text) => `${text}: ${PENDIENTE}.`),
      action: "No se puede marcar el retiro desde acá. Pedile al coordinador que lo revise.",
      source: "Fuente: rutas del coordinador y registro de perros.",
    });
  }

  if (review.length) {
    warnings.push({
      tone: "info",
      icon: "fileText",
      title: `${plural(review.length, "perro tiene", "perros tienen")} datos a revisar`,
      lines: review.map((dog) => `${dog.name}: ${dog.review}`),
      action: "No frena el paseo. Anotalo para coordinación.",
      source: `Fuente: datos cargados al ${DATA_UPDATED}.`,
    });
  }

  if (unevaluated.length > 1) {
    warnings.push({
      tone: "info",
      icon: "eye",
      title: `${unevaluated.length} perros salen en grupo SIN EVALUAR`,
      lines: [`${CATEGORIES["SIN EVALUAR"]} Observá cómo se comportan en grupo y registrá lo que veas.`],
      action: "Usá «Observación» en Más.",
      source: "Fuente: Registro maestro de perros, 14/08/2026.",
    });
  }

  return warnings;
}

// ---------- Observaciones ----------

const OBSERVATION_FIELDS = [
  { key: "lugar", label: "Lugar", hint: "Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.", type: "input" },
  { key: "estimulo", label: "Estímulo: qué pasó antes", hint: "Ej.: se cruzó un perro suelto a 5 metros.", type: "textarea" },
  { key: "reaccion", label: "Reacción: qué hizo el perro", hint: "Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.", type: "textarea" },
  { key: "accion", label: "Acción: qué hiciste vos", hint: "Ej.: crucé de vereda y le di distancia.", type: "textarea" },
  { key: "resultado", label: "Resultado: cómo terminó", hint: "Ej.: a los 30 segundos se calmó y siguió caminando.", type: "textarea" },
];

function emptyObservation(view) {
  return { dogId: "", fecha: view.now.label, hora: "", lugar: "", estimulo: "", reaccion: "", accion: "", resultado: "", seguimiento: false };
}

function getObservationDraft(view) {
  return { ...emptyObservation(view), ...readJSON(KEYS.observationDraft, {}) };
}

// Observaciones compartidas de los últimos días, de la más nueva a la más vieja.
function getObservations() {
  const desde = watchOpts("observaciones").desde;
  return records("observaciones")
    .filter((record) => String(record.fecha || "") >= desde)
    .sort((a, b) => `${b.fecha || ""} ${b.hora || ""} ${b.creadoEn || ""}`.localeCompare(`${a.fecha || ""} ${a.hora || ""} ${a.creadoEn || ""}`));
}

function observationAuthor(obs) {
  if (obs.migrado && obs.autorAnterior) return `${obs.autorAnterior} (versión anterior; la subió ${obs.creadoPorNombre || PENDIENTE})`;
  if (obs.pendiente && !obs.creadoPorNombre) return `${currentUser().nombre || PENDIENTE} (se enviará cuando haya señal)`;
  return obs.creadoPorNombre || PENDIENTE;
}

function observationText(obs) {
  return [
    `Observación de conducta — ${BUSINESS_INFO.name}`,
    `Perro: ${obs.perroNombre || dogById(obs.perroId)?.name || PENDIENTE}`,
    `Fecha: ${isoToLabel(obs.fecha)}${obs.hora ? ` · ${obs.hora}` : ""}`,
    `Lugar: ${obs.lugar || PENDIENTE}`,
    `Estímulo: ${obs.estimulo || PENDIENTE}`,
    `Reacción: ${obs.reaccion || PENDIENTE}`,
    `Acción: ${obs.accion || PENDIENTE}`,
    `Resultado: ${obs.resultado || PENDIENTE}`,
    `Seguimiento: ${obs.seguimiento ? "Sí, requiere seguimiento" : "No"}`,
    `Registró: ${observationAuthor(obs)}`,
  ].join("\n");
}

// ---------- Cierre ----------

function closureId(view) {
  return `${view.fecha}_${view.shift}`;
}

function getClosure(view) {
  return records("cierres").find((record) => record.id === closureId(view)) || null;
}

function closureNotes(view) {
  if (closureDraft && closureDraft.id === closureId(view)) return closureDraft.notas;
  return getClosure(view)?.notas || "";
}

function personLabel(usuario, record) {
  return usuario ? personName(usuario, record) : "";
}

// Cumplimiento del turno contra el horario: a tiempo, con atraso, no salieron.
function compliance(view, routes) {
  const byId = paseosById();
  const items = routes.flatMap((route) => routeStatuses(view, route, byId).map((item) => ({ ...item, route })));
  const going = items.filter((item) => item.status.kind !== "nosale");
  const late = going.filter((item) => item.status.late);
  return {
    items,
    going,
    late,
    onTime: going.filter((item) => !item.status.late),
    noSale: items.filter((item) => item.status.kind === "nosale"),
    delivered: going.filter((item) => item.status.kind === "entregado"),
    notPicked: going.filter((item) => !item.status.retirado),
    notDelivered: going.filter((item) => item.status.retirado && item.status.kind !== "entregado"),
  };
}

function lateDetail(item) {
  const { stop, status } = item;
  const parts = [];
  if (status.kind === "atrasado") parts.push(`sin retiro, previsto ${stop.hora} (${duration(status.delay)})`);
  if (status.pickupLate) parts.push(`retiro previsto ${stop.hora}, retirado ${status.record?.horaRetiro} (+${duration(status.pickupDelay)})`);
  if (status.kind === "demorada") parts.push(`entrega demorada: ${duration(status.walked)} de ${duration(status.minutos)} previstos`);
  if (status.deliveryLate) parts.push(`entrega demorada: ${duration(status.duration)} de ${duration(status.minutos)} previstos`);
  return `${stop.perroNombre} (${parts.join("; ") || "con atraso"})`;
}

function closureSummary(view, closureOverride) {
  const shift = SHIFTS[view.shift];
  const { routes, fallback } = routesFor(view);
  const result = compliance(view, routes);
  const closure = closureOverride || getClosure(view);
  const pairs = incompatiblePairs(routes);
  const muzzle = routeDogs(routes).filter(usesMuzzle);
  const observations = getObservations().filter((obs) => obs.fecha === view.fecha && shiftKeyOf(obs.turno) === view.shift);
  const incidents = incidentsFor(view.fecha);
  const requests = requestsFor(view.fecha, view.shift);
  const notes = closureNotes(view);
  const user = currentUser();
  const team = teamFor(view, routes);
  const names = (list) => (list.length ? list.map((item) => item.stop.perroNombre).join(", ") : "ninguno");

  const lines = [
    `Cierre de turno — ${BUSINESS_INFO.name}`,
    `Fecha: ${view.fechaLabel} (${view.day})`,
    `Turno: ${shift.label} (de ${shift.from} a ${shift.to}) · Supervisó: ${user.nombre || PENDIENTE}`,
    `Rutas${fallback ? " (tomadas de la planilla RPJ)" : ""}:`,
    ...routes.map(
      (route) =>
        `- ${route.code}: paseador ${personLabel(route.paseador) || PENDIENTE}${route.ayudante ? `, ayudante ${personLabel(route.ayudante)}` : ""} · ${plural(route.stops.length, "perro", "perros")}`,
    ),
    `Cumplimiento: ${result.onTime.length} a tiempo · ${result.late.length} con atraso · ${result.noSale.length} no salieron (de ${result.items.length} previstos)`,
    `- Con atraso: ${result.late.length ? result.late.map(lateDetail).join("; ") : "ninguno"}`,
    `- No salieron: ${names(result.noSale)}`,
    `- Sin retiro marcado: ${names(result.notPicked)}`,
    `- Sin entrega marcada: ${names(result.notDelivered)}`,
    `Entregados: ${result.delivered.length} de ${result.going.length}`,
    `Checklist del equipo: ${team.length ? team.map((person) => `${person.name}: ${person.checklist ? (checklistInfo(person.checklist).complete ? "equipo completo" : `incompleto${checklistInfo(person.checklist).missing.length ? ` (falta ${checklistInfo(person.checklist).missing.join(", ")})` : ""}`) : "sin cargar"}`).join("; ") : "sin equipo asignado"}`,
    `Incidentes del día: ${incidents.length ? incidents.map((item) => `${item.hora || "sin hora"} ${item.titulo || incidentDogs(item)}`).join("; ") : "ninguno cargado"}`,
    `Pedidos de cambio al coordinador: ${requests.length ? requests.map((item) => `${requestTitle(item)} (${REQUEST_STATES[item.estado]?.label || "Pendiente"})`).join("; ") : "ninguno"}`,
    "Seguridad del turno:",
    `- No juntar: ${pairs.length ? pairs.map((pair) => `${pair.a} con ${pair.b}`).join("; ") : "sin incompatibles en el turno"}`,
    `- Bozal: ${muzzle.length ? muzzle.map((dog) => dog.name).join(", ") : "nadie en este turno"}`,
    `Observaciones de conducta registradas hoy en este turno: ${observations.length}`,
    `Notas del supervisor: ${notes.trim() || "sin notas"}`,
  ];
  if (closure?.cerrado) lines.push(`Turno cerrado a las ${closure.horaCierre || timeOf(closure.actualizadoEn) || PENDIENTE} por ${personName(closure.actualizadoPor, closure) || PENDIENTE}.`);
  return lines.join("\n");
}

// Equipo del turno: paseador y ayudante de cada ruta, más quien haya cargado checklist.
function teamFor(view, routes) {
  const people = new Map();
  const add = (usuario, role, code) => {
    if (!usuario) return;
    const person = people.get(usuario) || { usuario, name: personName(usuario), roles: [] };
    person.roles.push(`${role} ${code}`);
    people.set(usuario, person);
  };
  routes.forEach((route) => {
    add(route.paseador, "Paseador", route.code);
    add(route.ayudante, "Ayudante", route.code);
  });
  checklistsFor(view.fecha, view.shift).forEach((record) => {
    const usuario = record.creadoPor || String(record.id).split("_")[1];
    if (usuario && !people.has(usuario)) people.set(usuario, { usuario, name: personName(usuario, record), roles: ["Sin ruta asignada"] });
  });
  return [...people.values()].map((person) => ({ ...person, checklist: checklistOf(view.fecha, view.shift, person.usuario) }));
}

// ---------- Navegación: pestañas fijas abajo ----------

const TABS = [
  { key: "ahora", label: "Ahora", icon: "clock" },
  { key: "rutas", label: "Rutas", icon: "route" },
  { key: "pedidos", label: "Pedidos", icon: "send" },
  { key: "mas", label: "Más", icon: "sliders" },
];

// Secciones de "Más" (lo que se usa menos va acá).
const SUBS = {
  observacion: { label: "Observación", icon: "eye" },
  avisos: { label: "Avisos", icon: "mapPin" },
  seguridad: { label: "Seguridad", icon: "shieldCheck" },
  incidentes: { label: "Incidentes", icon: "alertTriangle" },
  ayuda: { label: "Ayuda", icon: "help" },
};

const REQUEST_CHIPS = [
  { value: "no sale", label: "No sale" },
  { value: "cambiar hora", label: "Cambiar hora" },
  { value: "agregar perro", label: "Agregar perro" },
  { value: "cambiar paseador o ayudante", label: "Cambiar paseador" },
  { value: "otro", label: "Otro" },
];
const MOTIVO_CHIPS = ["Habló el tutor", "Perro enfermo", "Clima", "Problema en la calle", "Otro"];

// Deshacer: las acciones que no borran se pueden revertir durante 5 segundos.
const UNDO_MS = 5000;
let undo = null;
// Hoja de cierre abierta y botón que abrió la hoja actual (para devolverle el foco).
let closureSheetOpen = false;
let sheetOpener = "";
// Fotos que se están subiendo (por perro).
const photoBusy = new Set();
// Tarjeta que está preguntando "¿Avisar al coordinador?" después de tocar "No sale" (id de paseo).
let absentAsk = "";

function getNav() {
  const stored = readJSON(KEYS.nav, {});
  const tab = TABS.some((item) => item.key === stored.tab) ? stored.tab : "ahora";
  const sub = tab === "mas" && SUBS[stored.sub] ? stored.sub : "";
  return { tab, sub };
}

function saveNav(tab, sub = "") {
  writeJSON(KEYS.nav, { tab, sub });
}

function offerUndo(text, run, focusId = "") {
  const entry = { text, run, focusId, at: Date.now() };
  undo = entry;
  setTimeout(() => {
    if (undo === entry) {
      undo = null;
      scheduleLive();
    }
  }, UNDO_MS + 60);
}

function activeUndo() {
  if (undo && Date.now() - undo.at >= UNDO_MS) undo = null;
  return undo;
}

// Orden de las tarjetas congelado mientras dura "Deshacer" (ver NowTab).
let orderFreeze = null;

function freezeOrder() {
  const view = getView();
  const ids = [...document.querySelectorAll(".sv-shell #sv-dogs-now > .sv-dog")].map((card) => card.id.replace(/^sv-dog-/, ""));
  orderFreeze = ids.length ? { ids, fecha: view.fecha, shift: view.shift, until: Date.now() + UNDO_MS } : null;
}

function frozenOrder(view) {
  if (!orderFreeze || Date.now() >= orderFreeze.until || orderFreeze.fecha !== view.fecha || orderFreeze.shift !== view.shift) {
    orderFreeze = null;
    return null;
  }
  return new Map(orderFreeze.ids.map((id, index) => [id, index]));
}

// Respuestas del coordinador que ya vi en este teléfono (para marcar las nuevas).
function seenSet() {
  return new Set(readJSON(KEYS.seen, []));
}

function markSeen(id) {
  const list = readJSON(KEYS.seen, []).filter((item) => item !== id);
  list.push(id);
  writeJSON(KEYS.seen, list.slice(-200));
}

function isAnswered(item) {
  return (item.estado || "pendiente") !== "pendiente";
}

function isFreshAnswer(item, seen = seenSet()) {
  return isAnswered(item) && item.creadoPor === currentUser().usuario && !seen.has(item.id);
}

// Fotos de los perros (colección compartida "fotos"). Se leen una vez por dibujo: las miniaturas pesan.
let photoCache = null;

function photoRecord(perroId) {
  if (!perroId) return null;
  if (!photoCache) {
    photoCache = new Map();
    registros.cached("fotos").forEach((item) => {
      if (item?.miniatura) photoCache.set(item.perroId || item.id, item);
    });
  }
  return photoCache.get(perroId) || null;
}

function cardDomId(route, stop) {
  return safeId(`${route.code}-${stop.perroId || stop.perroNombre}`);
}

function requestOpenerId(ruta, perroId, tipo = "") {
  return safeId(`sv-req-open-${ruta || "turno"}-${perroId || "ruta"}${tipo ? `-${tipo}` : ""}`);
}

// Avisos cortos de seguridad para listas compactas.
function shortSafety(dog) {
  if (!dog) return "";
  const chips = [];
  if (noJuntarNames(dog).length) chips.push(`<span class="sv-mini is-danger">No juntar</span>`);
  if (usesMuzzle(dog)) chips.push(`<span class="sv-mini is-warn">Bozal</span>`);
  return chips.join("");
}

// ---------- Estructura ----------

export function supervisorShell(content) {
  return `
    <div class="sv-shell">
      ${SupervisorHeader()}
      ${content}
    </div>
  `;
}

function SupervisorHeader() {
  const user = currentUser();
  return `
    <header class="sv-header">
      <a class="sv-brand" href="/supervisor" data-link aria-label="Paseos Juan, supervisión. Ir a Ahora">
        <span class="sv-logo" aria-hidden="true">
          <img class="sv-logo-light" src="/paseos-juan-logo.png" alt="" />
          <img class="sv-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="sv-brand-text">
          <strong>Supervisión</strong>
          <small>${esc(user.nombre || PENDIENTE)}</small>
        </span>
      </a>
      <div class="sv-header-end">
        ${SyncPill()}
        <span class="sv-a11y-slot" aria-hidden="true"></span>
        <button class="sv-logout-btn" type="button" id="sv-logout" data-sv-logout>
          ${icon("logOut", "sv-icon")} <span>Salir</span>
        </button>
      </div>
    </header>
  `;
}

function SyncPill() {
  const pending = registros.pendingCount();
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const [tone, label] = offline
    ? ["warn", "Sin señal"]
    : pending
      ? ["warn", `${pending} sin enviar`]
      : loadErrors.size
        ? ["danger", "Error"]
        : ["ok", "Al día"];
  return `
    <button type="button" class="sv-sync is-${tone}" id="sv-refresh" data-sv-refresh aria-label="${esc(label)}. Tocá para actualizar">
      <span class="sv-dot" aria-hidden="true"></span><span>${esc(label)}</span>
    </button>
  `;
}

export function supervisorDashboard() {
  startWatching();
  renderedAreas.clear();
  photoCache = null;
  const view = getView();
  lastMinute = view.now.time;
  const nav = getNav();
  const routeInfo = routesFor(view);
  const byId = paseosById();
  const items = routeInfo.routes.flatMap((route) => routeStatuses(view, route, byId).map((item) => ({ ...item, route })));
  const body =
    nav.tab === "rutas"
      ? RoutesTab(view, routeInfo, byId)
      : nav.tab === "pedidos"
        ? RequestsTab(view)
        : nav.tab === "mas"
          ? MoreTab(view, routeInfo, nav.sub)
          : NowTab(view, routeInfo, items);
  const sheets = `${RequestSheet(view, routeInfo)}${closureSheetOpen ? ClosureSheet(view) : ""}`;
  const content = `
    <main class="sv-main" id="sv-main" data-tab="${nav.tab}">
      ${NetworkLine()}
      ${body}
    </main>
    ${BottomNav(view, nav.tab, items)}
    ${sheets}
    ${Toast()}
  `;
  if (migrationState === "idle" && legacyPending()) setTimeout(migrateLegacy, 0);
  return content;
}

// Una línea con el estado de la señal o de los errores de carga.
function NetworkLine() {
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  if (offline) {
    return `<p class="sv-line is-warn">${icon("uploadCloud", "sv-icon")} <span>Sin señal: seguí marcando, se envía solo.</span></p>`;
  }
  if (!loadErrors.size) return "";
  return `
    <p class="sv-line is-danger">
      ${icon("alertCircle", "sv-icon")}
      <span>No se pudieron traer datos.</span>
      <button type="button" class="sv-btn sv-btn-small" id="sv-retry" data-sv-refresh>Reintentar</button>
    </p>
  `;
}

function BottomNav(view, active, items) {
  const late = items.filter((item) => item.status.live === "atrasado").length;
  const fresh = myRequests(view.fecha).filter((item) => isFreshAnswer(item)).length;
  const badges = { ahora: late, pedidos: fresh };
  return `
    <nav class="sv-nav" aria-label="Secciones">
      ${TABS.map((tab) => {
        const badge = badges[tab.key] || 0;
        const badgeText = tab.key === "ahora" ? `${badge} ${badge === 1 ? "atrasado" : "atrasados"}` : `${badge} ${badge === 1 ? "respuesta nueva" : "respuestas nuevas"}`;
        return `
          <button type="button" class="sv-nav-item ${active === tab.key ? "is-active" : ""}" id="sv-tab-${tab.key}" data-sv-tab="${tab.key}" ${active === tab.key ? `aria-current="page"` : ""}>
            <span class="sv-nav-icon">${icon(tab.icon, "sv-icon")}${badge ? `<span class="sv-badge" aria-hidden="true">${badge}</span>` : ""}</span>
            <span>${tab.label}</span>
            ${badge ? `<span class="visually-hidden">, ${badgeText}</span>` : ""}
          </button>
        `;
      }).join("")}
    </nav>
  `;
}

function Toast() {
  const pendingUndo = activeUndo();
  let message = flash ? flashFor(flash.area) : null;
  if (message && renderedAreas.has(message.area)) message = null;
  return `
    <div class="sv-toast-zone" role="status" aria-live="polite">
      ${message ? `<p class="sv-toast is-${message.tone}">${esc(message.text)}</p>` : ""}
      ${pendingUndo ? `
        <p class="sv-toast is-undo">
          <span>${esc(pendingUndo.text)}</span>
          <button type="button" class="sv-toast-btn" id="sv-undo" data-sv-undo>Deshacer</button>
        </p>
      ` : ""}
    </div>
  `;
}

// ---------- Partes comunes ----------

function ShiftBar(view) {
  const shift = SHIFTS[view.shift];
  const moment = shiftMoment(view.shift, view.now);
  const current = SHIFTS[currentShiftKey(view.now)];
  return `
    <section class="sv-shiftbar" aria-label="Turno">
      <div class="sv-segment" role="group" aria-label="Turno de hoy, ${esc(view.day)} ${view.now.label}">
        ${SHIFT_KEYS.map((key) => `
          <button type="button" id="sv-shift-${key}" class="sv-segment-option ${view.shift === key ? "is-active" : ""}" data-sv-shift="${key}" aria-pressed="${view.shift === key}">${SHIFTS[key].label}</button>
        `).join("")}
      </div>
      <p class="sv-shift-hours"><span>${shift.from}–${shift.to}</span>${moment.tone === "live" ? `<span class="visually-hidden">, en curso</span>` : ` <span class="sv-moment is-${moment.tone}">${esc(moment.label)}</span>`}</p>
    </section>
    ${view.isCurrent ? "" : `<p class="sv-line is-info">${icon("clock", "sv-icon")} <span>Mirás la ${shift.label.toLowerCase()}. Ahora es la ${current.label.toLowerCase()}.</span></p>`}
  `;
}

function FallbackLine(view, routeInfo) {
  if (!routeInfo.fallback) return "";
  return `
    <p class="sv-line is-warn">
      ${icon("alertCircle", "sv-icon")}
      <span>${routeInfo.loading ? "Cargando rutas…" : "Falta cargar la ruta de hoy"}</span>
    </p>
  `;
}

// Miniatura del perro: foto, o círculo con la inicial y botón de cámara.
function Avatar(stop, domId, small = false) {
  const name = stop.perroNombre || "";
  const initial = esc((String(name).trim()[0] || "?").toUpperCase());
  const record = photoRecord(stop.perroId);
  const src = record?.miniatura || null;
  const cls = `sv-avatar${small ? " is-small" : ""}`;
  if (src) {
    if (small || !record?.archivoId) return `<span class="${cls}"><img src="${esc(src)}" alt="" /></span>`;
    return `
      <button type="button" class="${cls} is-button" id="sv-photo-open-${domId}" data-sv-photo-open="${esc(stop.perroId)}">
        <img src="${esc(src)}" alt="" /><span class="visually-hidden">Ver foto grande de ${esc(name)}</span>
      </button>
    `;
  }
  if (small || !stop.perroId) return `<span class="${cls} is-empty" aria-hidden="true"><span class="sv-initial">${initial}</span></span>`;
  const busy = photoBusy.has(stop.perroId);
  return `
    <span class="${cls} is-empty ${busy ? "is-busy" : ""}">
      <input type="file" class="sv-file" id="sv-photo-${domId}" accept="image/*" capture="environment" data-sv-photo="${esc(stop.perroId)}" data-name="${esc(name)}" ${busy ? "disabled" : ""} />
      <label for="sv-photo-${domId}" class="sv-avatar-label">
        <span class="sv-initial" aria-hidden="true">${initial}</span>
        <span class="sv-avatar-cam" aria-hidden="true">${icon("camera", "sv-icon")}${busy ? "…" : "Foto"}</span>
        <span class="visually-hidden">${busy ? `Subiendo foto de ${esc(name)}` : `Sacar foto de ${esc(name)}`}</span>
      </label>
    </span>
  `;
}

// Bozal y "no juntar" siempre a la vista en la tarjeta del perro.
function safetyChips(stop) {
  const dog = stop.dog;
  const chips = [];
  const add = (tone, html) => chips.push({ tone, html: `<li class="sv-chip is-${tone}">${html}</li>` });
  if (!dog) add("danger", "<b>Sin ficha</b>");
  if (dog && dog.status !== "Activo") add("danger", `<b>${esc(dog.status)}</b>`);
  (dog?.safety || []).forEach((note) => {
    const tone = /no juntar/i.test(note) ? "danger" : /bozal/i.test(note) ? "warn" : "neutral";
    // "Sale con Sonia (misma familia)" → "Sale con Sonia": menos letras, mismo dato.
    const text = note.replace(/^(Sale con .+?)\s*\(misma familia\)\s*$/i, "$1");
    add(tone, tone === "neutral" ? esc(text) : `<b>${esc(text)}</b>`);
  });
  // "No juntar" que la ficha de este perro no dice, pero sí la del otro perro.
  const written = plain((dog?.safety || []).filter((note) => /no juntar/i.test(note)).join(" "));
  const missing = noJuntarNames(dog).filter((name) => !written.includes(plain(name)));
  if (missing.length) add("danger", `<b>No juntar con ${esc(listWithAnd(missing, "ni"))}</b>`);
  if (stop.nota && !(dog?.safety || []).some((note) => plain(note).includes(plain(stop.nota)))) {
    const tone = /no juntar/i.test(stop.nota) ? "danger" : /bozal/i.test(stop.nota) ? "warn" : "info";
    add(tone, `<b>Ruta:</b> ${esc(stop.nota)}`);
  }
  // Lo más grave primero: no juntar y sin ficha (rojo), después bozal (amarillo).
  const rank = { danger: 0, warn: 1, info: 2, neutral: 3 };
  chips.sort((a, b) => rank[a.tone] - rank[b.tone]);
  return chips.length ? `<ul class="sv-chips" aria-label="Avisos de ${esc(stop.perroNombre)}">${chips.map((chip) => chip.html).join("")}</ul>` : "";
}

function whatsappText(view, route, items) {
  const user = currentUser();
  const shift = SHIFTS[view.shift];
  const name = personLabel(route.paseador);
  const late = items.filter((item) => item.status.live === "atrasado");
  const counts = countLive(items);
  const lines = [
    `Hola${name ? ` ${name}` : ""}, te escribe ${user.nombre || "el supervisor"} (supervisión ${BUSINESS_INFO.name}).`,
    `Ruta ${route.code}, turno ${shift.label.toLowerCase()} ${view.fechaLabel}: ${counts.entregado} entregados de ${items.length - counts.nosale}.`,
  ];
  if (late.length) {
    lines.push(`Veo atrasados: ${late.map((item) => `${item.stop.perroNombre} (${item.status.kind === "demorada" ? "entrega demorada" : `retiro ${item.stop.hora}`}, ${item.status.label.replace(/^\D+/, "")})`).join("; ")}.`);
    lines.push("¿Cómo vienen? Avisame si necesitás ayuda.");
  } else {
    lines.push("¿Cómo vienen? Avisame cualquier cosa.");
  }
  return lines.join("\n");
}

// tipo: abre la hoja con ese pedido ya elegido (ahorra un toque).
function RequestButton(ruta, perroId, label = "Cambio", name = "", tipo = "", iconName = "send") {
  const aria = tipo
    ? `${label}: pedir al coordinador`
    : name ? `Cambio: pedir para ${name}` : ruta ? `Cambio: pedir en la ruta ${ruta}` : `${label}: pedir cambio al coordinador`;
  return `
    <button type="button" class="sv-btn" id="${requestOpenerId(ruta, perroId, tipo)}" data-sv-request-open data-ruta="${esc(ruta)}" data-dog="${esc(perroId)}" ${tipo ? `data-tipo="${esc(tipo)}"` : ""} aria-label="${esc(aria)}">
      ${icon(iconName, "sv-icon")} <span>${esc(label)}</span>
    </button>
  `;
}

// Respuesta del coordinador como notificación en la tarjeta.
function RequestNotice(requests) {
  if (!requests.length) return "";
  const item = requests[0];
  const state = REQUEST_STATES[item.estado] || REQUEST_STATES.pendiente;
  if (!isAnswered(item)) {
    return `<p class="sv-notice is-warn">${icon("send", "sv-icon")} <span>Pedido «${esc(item.tipo || "cambio")}»: ${item.pendiente ? "sin señal, se envía solo" : "esperando"}</span></p>`;
  }
  const fresh = isFreshAnswer(item);
  return `
    <div class="sv-notice is-${state.tone} ${fresh ? "is-new" : ""}">
      ${icon(item.estado === "aplicado" ? "checkCircle" : "alertCircle", "sv-icon")}
      <p><b>Coordinador: ${esc(state.label.toLowerCase())}</b>${item.respuesta ? ` · ${esc(item.respuesta)}` : ""}</p>
      ${fresh ? `<button type="button" class="sv-btn sv-btn-small" id="sv-seen-${safeId(item.id)}" data-sv-seen="${esc(item.id)}" aria-label="Entendido">OK</button>` : ""}
    </div>
  `;
}

function sortedRequests(list) {
  return [...list].sort((a, b) => String(b.creadoEn || "9").localeCompare(String(a.creadoEn || "9")));
}

// ---------- Pestaña "Ahora": panel de pedidos ----------

function NowTab(view, routeInfo, items) {
  const counts = countLive(items);
  // Justo después de marcar, las tarjetas que se veían quedan en su lugar (aunque el perro pase a
  // "Listos" o deje de estar atrasado): así no aparece otro perro debajo del dedo.
  const frozen = frozenOrder(view);
  const keyOf = (item) => cardDomId(item.route, item.stop);
  const kept = frozen ? items.filter((item) => frozen.has(keyOf(item))).sort((a, b) => frozen.get(keyOf(a)) - frozen.get(keyOf(b))) : [];
  const rest = items.filter((item) => !kept.includes(item));
  const late = rest.filter((item) => item.status.live === "atrasado");
  const done = rest.filter((item) => item.status.kind === "entregado" || item.status.kind === "nosale");
  const active = rest.filter((item) => !late.includes(item) && !done.includes(item));
  const byTime = (a, b) => (a.status.planned ?? 9999) - (b.status.planned ?? 9999) || String(a.stop.perroNombre).localeCompare(String(b.stop.perroNombre));
  const shiftRequests = requestsFor(view.fecha, view.shift);
  // Con una sola ruta en el turno, la ruta y el paseador son los mismos en todas las tarjetas: no se repiten.
  const showRoute = routeInfo.routes.length > 1;
  const card = (item) =>
    DogCard(view, item, sortedRequests(shiftRequests.filter((req) => req.perroId && req.perroId === item.stop.perroId)), showRoute);
  const closure = getClosure(view);
  const moment = shiftMoment(view.shift, view.now);

  let list = "";
  if (!routeInfo.routes.length) {
    list = `
      <div class="sv-empty-box">
        <p>${routeInfo.loading ? "Cargando rutas…" : "Sin rutas para este turno."}</p>
        ${routeInfo.loading ? "" : RequestButton("", "", "Pedir ruta")}
      </div>
    `;
  } else {
    list = `
      ${kept.length || late.length || active.length ? `
        <ol class="sv-dogs" id="sv-dogs-now" aria-label="Perros por atender">
          ${[...kept, ...late.sort(byTime), ...active.sort(byTime)].map(card).join("")}
        </ol>
      ` : `<p class="sv-line is-ok">${icon("checkCircle", "sv-icon")} <span>Todo listo en este turno.</span></p>`}
      ${done.length ? `
        <details class="sv-fold" data-sv-fold="listos" ${isFoldOpen("listos") ? "open" : ""}>
          <summary><span class="sv-fold-title">${icon("checkCircle", "sv-icon")} Listos</span><span class="sv-pill">${done.length}</span></summary>
          <ol class="sv-dogs">${done.sort(byTime).map(card).join("")}</ol>
        </details>
      ` : ""}
    `;
  }

  return `
    ${ShiftBar(view)}
    ${Counter(counts, items.length)}
    ${FallbackLine(view, routeInfo)}
    ${AlertChips(view, routeInfo.routes)}
    ${moment.tone === "done" && !closure?.cerrado && routeInfo.routes.length ? `
      <button type="button" class="sv-btn sv-btn-primary sv-btn-main sv-wide" id="sv-close-open-now" data-sv-close-open>${icon("flag", "sv-icon")} Cerrar turno</button>
    ` : ""}
    <h1 class="visually-hidden">Ahora: turno ${esc(SHIFTS[view.shift].label.toLowerCase())}</h1>
    ${list}
  `;
}

function Counter(counts, total) {
  return `
    <section class="sv-counter" aria-label="Cumplimiento del turno">
      <div class="sv-tiles" role="status" aria-live="polite">
        <p class="sv-tile is-info"><b>${counts.atiempo}</b><span>A tiempo</span></p>
        <p class="sv-tile ${counts.atrasado ? "is-danger" : "is-neutral"}"><b>${counts.atrasado}</b><span>${counts.atrasado === 1 ? "Atrasado" : "Atrasados"}</span></p>
        <p class="sv-tile is-ok"><b>${counts.entregado}</b><span>${counts.entregado === 1 ? "Entregado" : "Entregados"}</span></p>
      </div>
      ${counts.nosale ? `<p class="sv-counter-note">${counts.nosale} no ${counts.nosale === 1 ? "sale" : "salen"} · ${plural(total, "perro", "perros")} en el turno</p>` : ""}
    </section>
  `;
}

// Una fila de botones cortos: incidentes, seguridad y avisos por barrio. Cada uno lleva a su sección.
// El texto largo va en aria-label; en pantalla, ícono + 1 o 2 palabras + número.
function AlertChips(view, routes) {
  const chips = [];
  const incidents = incidentsFor(view.fecha);
  if (incidents.length) {
    const last = incidents[incidents.length - 1];
    chips.push({
      id: "sv-goto-incidentes",
      goto: "mas:incidentes",
      tone: "danger",
      icon: "alertTriangle",
      label: incidents.length === 1 ? "Incidente" : "Incidentes",
      count: incidents.length,
      aria: `${plural(incidents.length, "incidente", "incidentes")} hoy. Último: ${last.titulo || incidentDogs(last)}. Ver`,
    });
  }
  if (routes.some((route) => route.stops.length)) {
    shiftWarnings(routes)
      .filter((warning) => warning.tone !== "info" && warning.chip)
      .forEach((warning, index) => {
        chips.push({
          id: `sv-goto-seguridad${index ? `-${index}` : ""}`,
          goto: "mas:seguridad",
          tone: warning.tone,
          icon: warning.icon,
          label: warning.chip,
          count: warning.count,
          aria: `${warning.short || warning.title}. Ver seguridad`,
        });
      });
  }
  const avisos = activeAvisos(view.fecha);
  if (avisos.length) {
    const danger = avisos.some((item) => item.tipo === "seguridad" || item.tipo === "perro suelto");
    const first = avisos[0];
    chips.push({
      id: "sv-goto-avisos",
      goto: "mas:avisos",
      tone: danger ? "danger" : "warn",
      icon: "mapPin",
      label: avisos.length === 1 ? first.barrio || "Aviso" : "Avisos",
      count: avisos.length > 1 ? avisos.length : 0,
      aria: avisos.length === 1
        ? `Aviso en ${first.barrio || PENDIENTE}: ${first.mensaje || first.tipo || ""}. Ver avisos`
        : `${avisos.length} avisos por barrio. Ver avisos`,
    });
  }
  if (!chips.length) return "";
  return `
    <ul class="sv-alerts" aria-label="Alertas del turno">
      ${chips.map((chip) => `
        <li>
          <button type="button" class="sv-alert-chip is-${chip.tone}" id="${chip.id}" data-sv-goto="${chip.goto}" aria-label="${esc(`${chip.label}${chip.count ? ` ${chip.count}` : ""}. ${chip.aria}`)}">
            ${icon(chip.icon, "sv-icon")}
            <b>${esc(chip.label)}</b>
            ${chip.count ? `<span class="sv-alert-n">${chip.count}</span>` : ""}
          </button>
        </li>
      `).join("")}
    </ul>
  `;
}

// La hora grande es el próximo compromiso: el retiro y, ya retirado, la entrega prevista.
function cardTime(stop, status) {
  if (status.retirado && status.kind !== "entregado") {
    const start = toMinutes(status.record?.horaRetiro) ?? status.planned;
    if (start !== null && status.minutos) {
      const end = start + status.minutos;
      return { time: `${String(Math.floor(end / 60) % 24).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`, label: "entrega" };
    }
  }
  return { time: stop.hora || "--:--", label: "" };
}

function DogCard(view, item, requests, showRoute = true) {
  const { stop, id, status, route } = item;
  const when = cardTime(stop, status);
  const domId = cardDomId(route, stop);
  const record = status.record;
  const walker = personLabel(route.paseador);
  const optionsOpen = Boolean(id) && (openStops.has(id) || (noteDrafts.has(id) && noteDrafts.get(id) !== (record?.nota || "")));
  const extraLate =
    status.kind === "entregado" && status.late
      ? `<span class="sv-state is-warn">Con atraso</span>`
      : status.kind === "curso" && status.pickupLate
        ? `<span class="sv-state is-warn">Retiro +${duration(status.pickupDelay)}</span>`
        : "";
  return `
    <li class="sv-dog is-${status.tone}" id="sv-dog-${domId}" tabindex="-1" aria-labelledby="sv-dog-name-${domId}">
      <div class="sv-dog-top">
        ${Avatar(stop, domId)}
        <div class="sv-dog-main">
          <h3 class="sv-dog-name" id="sv-dog-name-${domId}">${esc(stop.perroNombre)}</h3>
          ${showRoute ? `<p class="sv-dog-sub">${esc(route.code)}${walker ? ` · ${esc(walker)}` : ""}</p>` : ""}
          <p class="sv-dog-state"><span class="sv-state is-${status.tone}">${esc(status.label)}</span>${extraLate}</p>
        </div>
        <p class="sv-dog-time">
          <strong>${esc(when.time)}</strong>
          ${when.label ? `<small>${when.label}<span class="visually-hidden"> prevista</span></small>` : `<span class="visually-hidden">Retiro previsto</span>`}
        </p>
      </div>
      ${safetyChips(stop)}
      ${RequestNotice(requests)}
      ${record?.nota ? `<p class="sv-dog-note">${icon("message", "sv-icon")} <span>${esc(record.nota)}</span></p>` : ""}
      ${stop.perroId ? DogActions(item, domId, optionsOpen) : `
        <p class="sv-line is-warn">${icon("alertCircle", "sv-icon")} <span>Sin ficha: no se marca desde acá.</span></p>
        <div class="sv-row">${RequestButton(route.code, "", "Cambio")}</div>
      `}
      ${optionsOpen ? DogOptions(item, domId) : ""}
    </li>
  `;
}

function DogActions(item, domId, optionsOpen) {
  const { stop, status, route, id } = item;
  const busy = inFlight.has(id);
  const ruta = esc(route.code);
  const dog = esc(stop.perroId);
  const name = esc(stop.perroNombre);
  const disabled = busy ? "disabled" : "";
  let main = "";
  if (status.kind === "nosale") {
    main = `<button type="button" class="sv-btn sv-btn-main" id="sv-main-${domId}" data-sv-absent="${dog}" data-ruta="${ruta}" aria-label="${name} sí sale" ${disabled}>${icon("play", "sv-icon")} Sí sale</button>`;
  } else if (status.kind === "entregado") {
    main = "";
  } else if (status.retirado) {
    main = `<button type="button" class="sv-btn sv-btn-primary sv-btn-main" id="sv-main-${domId}" data-sv-deliver="${dog}" data-ruta="${ruta}" aria-label="Marcar a ${name} como entregado" ${disabled}>${icon("packageCheck", "sv-icon")} Marcar entregado</button>`;
  } else {
    main = `<button type="button" class="sv-btn sv-btn-primary sv-btn-main" id="sv-main-${domId}" data-sv-pickup="${dog}" data-ruta="${ruta}" aria-label="Marcar a ${name} como retirado" ${disabled}>${icon("checkCircle", "sv-icon")} Marcar retirado</button>`;
  }
  const canAbsent = !status.retirado && status.kind !== "nosale";
  // "No sale" no marca de una: pregunta si avisa al coordinador (un toque más manda el pedido).
  if (canAbsent && absentAsk === id) return AbsentAsk(item, domId, busy);
  const secondary = [
    canAbsent
      ? `<button type="button" class="sv-btn" id="sv-absent-${domId}" data-sv-absent-ask="${esc(id)}" aria-label="${name} no sale" ${disabled}>${icon("x", "sv-icon")} <span>No sale</span></button>`
      : "",
    RequestButton(route.code, stop.perroId, "Cambio", stop.perroNombre),
    `<button type="button" class="sv-btn" id="sv-opt-${domId}" data-sv-options="${esc(id)}" aria-expanded="${optionsOpen}" aria-controls="sv-optbox-${domId}" aria-label="Más opciones de ${name}">${icon("sliders", "sv-icon")} <span>Más</span></button>`,
  ].filter(Boolean);
  return `
    <div class="sv-dog-actions" ${busy ? `aria-busy="true"` : ""}>
      ${main}
      <div class="sv-row cols-${secondary.length}">${secondary.join("")}</div>
    </div>
  `;
}

// Segundo toque de "No sale": avisar al coordinador (marca y manda el pedido) o solo marcar.
function AbsentAsk(item, domId, busy) {
  const { stop, route } = item;
  const ruta = esc(route.code);
  const dog = esc(stop.perroId);
  const name = esc(stop.perroNombre);
  const disabled = busy ? "disabled" : "";
  return `
    <div class="sv-dog-actions sv-ask" role="group" aria-labelledby="sv-ask-title-${domId}" ${busy ? `aria-busy="true"` : ""}>
      <p class="sv-ask-title" id="sv-ask-title-${domId}">${name} no sale. ¿Avisar al coordinador?</p>
      <button type="button" class="sv-btn sv-btn-primary sv-btn-main" id="sv-absent-send-${domId}" data-sv-absent-send="${dog}" data-ruta="${ruta}" ${disabled}>${icon("send", "sv-icon")} Sí, avisar</button>
      <div class="sv-row cols-2">
        <button type="button" class="sv-btn" id="sv-absent-only-${domId}" data-sv-absent="${dog}" data-ruta="${ruta}" ${disabled}>${icon("x", "sv-icon")} <span>Solo marcar</span></button>
        <button type="button" class="sv-btn" id="sv-absent-cancel-${domId}" data-sv-absent-cancel="${dog}" ${disabled}><span>Volver</span></button>
      </div>
    </div>
  `;
}

function DogOptions(item, domId) {
  const { stop, status, route, id } = item;
  const record = status.record;
  const noteValue = noteDrafts.has(id) ? noteDrafts.get(id) : record?.nota || "";
  const unmark = status.kind === "entregado" ? ["entrega", "Desmarcar entrega"] : status.retirado ? ["retiro", "Desmarcar retiro"] : null;
  const hasPhoto = Boolean(photoRecord(stop.perroId));
  const marks = [
    record?.horaRetiro && status.retirado ? `Retiro ${record.horaRetiro}` : "",
    record?.horaPaseo && status.retirado ? `Paseo ${record.horaPaseo}` : "",
    record?.horaEntrega && status.kind === "entregado" ? `Entrega ${record.horaEntrega}` : "",
  ].filter(Boolean);
  const busyPhoto = photoBusy.has(stop.perroId);
  return `
    <div class="sv-optbox" id="sv-optbox-${domId}">
      <div class="sv-note-row">
        <label class="sv-field" for="sv-note-${domId}">Nota al paseador
          <input type="text" id="sv-note-${domId}" data-sv-note="${esc(id)}" value="${esc(noteValue)}" maxlength="200" placeholder="Sin datos de tutores" autocomplete="off" enterkeyhint="send" />
        </label>
        <button type="button" class="sv-btn sv-btn-primary" id="sv-note-save-${domId}" data-sv-note-save="${esc(stop.perroId)}" data-ruta="${esc(route.code)}">Guardar</button>
      </div>
      <div class="sv-row cols-${unmark ? 2 : 1}">
        ${unmark ? `<button type="button" class="sv-btn" id="sv-unmark-${domId}" data-sv-unmark="${esc(stop.perroId)}" data-step="${unmark[0]}" data-ruta="${esc(route.code)}">${icon("x", "sv-icon")} <span>${unmark[1]}</span></button>` : ""}
        ${hasPhoto ? `
          <span class="sv-file-btn">
            <input type="file" class="sv-file" id="sv-photo-new-${domId}" accept="image/*" capture="environment" data-sv-photo="${esc(stop.perroId)}" data-name="${esc(stop.perroNombre)}" ${busyPhoto ? "disabled" : ""} />
            <label for="sv-photo-new-${domId}" class="sv-btn">${icon("camera", "sv-icon")} <span>${busyPhoto ? "Subiendo…" : "Foto nueva"}</span></label>
          </span>
        ` : ""}
      </div>
      ${marks.length || record ? `<p class="sv-source">${esc([marks.join(" · "), lastMark(record)].filter(Boolean).join(" · "))}</p>` : ""}
    </div>
  `;
}

// ---------- Pestaña "Rutas" ----------

function RoutesTab(view, routeInfo, byId) {
  const { routes } = routeInfo;
  const inRoutes = new Set(routes.flatMap((route) => route.stops.map((stop) => stop.perroId)).filter(Boolean));
  const extras = records("paseos").filter(
    (record) => record.fecha === view.fecha && String(record.id).endsWith(`_${view.shift}`) && record.perroId && !inRoutes.has(record.perroId),
  );
  const loose = teamFor(view, routes).filter((person) => person.roles.includes("Sin ruta asignada"));
  return `
    ${ShiftBar(view)}
    ${FallbackLine(view, routeInfo)}
    <h1 class="sv-h1">Rutas</h1>
    ${!routes.length ? `
      <div class="sv-empty-box">
        <p>${routeInfo.loading ? "Cargando rutas…" : "Sin rutas para este turno."}</p>
        ${routeInfo.loading ? "" : RequestButton("", "", "Pedir ruta")}
      </div>
    ` : routes.map((route) => RouteCard(view, route, byId)).join("")}
    ${routes.length ? `<p class="sv-source">WhatsApp: elegís el chat. Teléfonos del equipo: ${PENDIENTE}.</p>` : ""}
    ${loose.length ? `
      <section class="sv-card" aria-labelledby="sv-loose-title">
        <h2 class="sv-h2" id="sv-loose-title">Sin ruta</h2>
        <ul class="sv-people">${loose.map((person) => `<li>${PersonChip("Equipo", person.usuario, view)}</li>`).join("")}</ul>
      </section>
    ` : ""}
    ${extras.length ? `
      <section class="sv-card" aria-labelledby="sv-extras-title">
        <h2 class="sv-h2" id="sv-extras-title">Fuera de ruta</h2>
        <ul class="sv-plain-list">
          ${extras.map((record) => `<li><b>${esc(record.perroNombre || record.perroId)}</b> · ${esc(record.estado || "pendiente")} <small>${esc(lastMark(record))}</small></li>`).join("")}
        </ul>
      </section>
    ` : ""}
  `;
}

// Persona del turno con el estado de su checklist de salida.
function PersonChip(role, usuario, view) {
  if (!usuario) return `<span class="sv-person"><small>${esc(role)}</small><b>${role === "Ayudante" ? "Sin ayudante" : PENDIENTE}</b></span>`;
  const started = view.now.minutes >= toMinutes(SHIFTS[view.shift].from);
  const record = checklistOf(view.fecha, view.shift, usuario);
  const info = record ? checklistInfo(record) : null;
  const [tone, label] = !info
    ? [started ? "warn" : "neutral", "Sin checklist"]
    : record.pendiente
      ? ["info", "Checklist sin enviar"]
      : info.complete
        ? ["ok", "Checklist ✓"]
        : ["danger", "Checklist incompleto"];
  return `
    <span class="sv-person">
      <small>${esc(role)}</small>
      <b>${esc(personName(usuario) || PENDIENTE)}</b>
      <span class="sv-state is-${tone}">${esc(label)}</span>
      ${info && !info.complete && info.missing.length ? `<small class="sv-person-miss">Falta: ${esc(info.missing.join(", "))}</small>` : ""}
    </span>
  `;
}

function RouteCard(view, route, byId) {
  const items = routeStatuses(view, route, byId);
  const counts = countLive(items);
  const walker = personLabel(route.paseador);
  const requests = sortedRequests(requestsFor(view.fecha, view.shift).filter((item) => item.ruta === route.code && !item.perroId));
  const titleId = `sv-route-${safeId(route.code)}`;
  return `
    <article class="sv-card sv-route" aria-labelledby="${titleId}">
      <header class="sv-route-head">
        <h2 class="sv-h2" id="${titleId}">${esc(route.code)}</h2>
        <p class="sv-route-counts">
          <span class="sv-state is-neutral">${plural(route.stops.length, "perro", "perros")}</span>
          ${counts.atrasado ? `<span class="sv-state is-danger">${plural(counts.atrasado, "atrasado", "atrasados")}</span>` : ""}
          <span class="sv-state is-ok">${plural(counts.entregado, "listo", "listos")}</span>
        </p>
      </header>
      <ul class="sv-people">
        <li>${PersonChip("Paseador", route.paseador, view)}</li>
        <li>${PersonChip("Ayudante", route.ayudante, view)}</li>
      </ul>
      ${route.notas ? `<p class="sv-dog-note">${icon("message", "sv-icon")} <span>${esc(route.notas)}</span></p>` : ""}
      ${RequestNotice(requests)}
      <div class="sv-row">
        <a class="sv-btn sv-btn-wa" id="sv-wa-${safeId(route.code)}" href="https://wa.me/?text=${encodeURIComponent(whatsappText(view, route, items))}" target="_blank" rel="noopener noreferrer" aria-label="Avisar${walker ? ` a ${esc(walker)}` : " al paseador"} por WhatsApp. Se abre WhatsApp con el mensaje y elegís el chat">
          ${icon("message", "sv-icon")} <span>Avisar por WhatsApp (elegí el chat)</span>
        </a>
        ${RequestButton(route.code, "", "Cambio")}
      </div>
      <ol class="sv-stops" aria-label="Perros de ${esc(route.code)} en orden">
        ${items.map((item) => StopRow(route, item)).join("")}
      </ol>
      <p class="sv-source">${esc(routeSourceLabel(route))}${route.record.actualizadoEn && route.source !== "planilla" ? ` · ${esc(lastMark(route.record, "Último cambio de"))}` : ""}</p>
    </article>
  `;
}

function StopRow(route, item) {
  const { stop, status } = item;
  const domId = cardDomId(route, stop);
  const done = status.kind === "entregado" || status.kind === "nosale";
  return `
    <li>
      <button type="button" class="sv-stop is-${status.tone}" id="sv-stop-${domId}" data-sv-goto-dog="${domId}" data-done="${done ? "1" : ""}">
        <span class="sv-stop-time">${esc(stop.hora || "--:--")}</span>
        ${Avatar(stop, domId, true)}
        <span class="sv-stop-name"><b>${esc(stop.perroNombre)}</b>${shortSafety(stop.dog)}</span>
        <span class="sv-state is-${status.tone}">${esc(status.label)}</span>
      </button>
    </li>
  `;
}

// ---------- Pestaña "Pedidos" ----------

function RequestsTab(view) {
  const list = myRequests(view.fecha);
  const seen = seenSet();
  const pending = list.filter((item) => !isAnswered(item)).length;
  return `
    <h1 class="sv-h1">Pedidos</h1>
    <p class="sv-lead">El coordinador cambia la ruta y te responde.</p>
    <div class="sv-row cols-3 sv-quick" role="group" aria-label="Nuevo pedido">
      ${RequestButton("", "", "Sumar perro", "", "agregar perro", "plus")}
      ${RequestButton("", "", "Paseador", "", "cambiar paseador o ayudante", "users")}
      ${RequestButton("", "", "Otro", "", "otro", "message")}
    </div>
    ${list.length ? `
      <p class="sv-route-counts"><span class="sv-state is-warn">${pending} esperando</span><span class="sv-state is-neutral">${list.length} en total</span></p>
      <ul class="sv-requests">${list.map((item) => RequestCard(item, seen)).join("")}</ul>
    ` : `<div class="sv-empty-box"><p>${loaded.has("solicitudes") ? "Sin pedidos." : "Cargando…"}</p></div>`}
  `;
}

function RequestCard(item, seen) {
  const state = REQUEST_STATES[item.estado] || REQUEST_STATES.pendiente;
  const fresh = isFreshAnswer(item, seen);
  const when = item.pendiente ? "Sin señal: se envía solo" : `${isoToLabel(item.fecha)} · ${String(item.turno || "").toLowerCase()} · ${timeOf(item.creadoEn)}`;
  return `
    <li class="sv-request is-${state.tone} ${fresh ? "is-new" : ""}">
      <p class="sv-request-head">
        <span class="sv-state is-${state.tone}">${esc(state.label)}</span>
        ${item.urgente ? `<span class="sv-state is-danger">Urgente</span>` : ""}
        ${fresh ? `<span class="sv-state is-info">Nuevo</span>` : ""}
      </p>
      <h2 class="sv-h3">${esc(requestTitle(item))}</h2>
      ${item.detalle ? `<p>${esc(item.detalle)}</p>` : ""}
      ${item.motivo ? `<p class="sv-muted">Motivo: ${esc(item.motivo)}</p>` : ""}
      <p class="sv-answer">${icon("message", "sv-icon")} <span>${esc(item.respuesta || (isAnswered(item) ? "Sin comentario." : "Todavía no respondió."))}</span></p>
      <p class="sv-source">${esc(when)}</p>
      ${fresh ? `<button type="button" class="sv-btn sv-btn-small" id="sv-seen-${safeId(item.id)}" data-sv-seen="${esc(item.id)}">OK, visto</button>` : ""}
    </li>
  `;
}

// ---------- Pestaña "Más" ----------

function MoreTab(view, routeInfo, sub) {
  if (sub) {
    const section = {
      observacion: () => ObservationSection(view, routeDogs(routeInfo.routes)),
      avisos: () => AvisosSection(view),
      seguridad: () => SafetySection(routeInfo.routes),
      incidentes: () => IncidentsSection(view),
      ayuda: () => HelpSection(),
    }[sub]();
    return `
      <div class="sv-subhead">
        <button type="button" class="sv-btn sv-btn-back" id="sv-back" data-sv-sub="" aria-label="Volver a Más">${icon("arrowRight", "sv-icon sv-flip")} Más</button>
        <h1 class="sv-h1">${esc(SUBS[sub].label)}</h1>
      </div>
      ${section}
    `;
  }
  const closure = getClosure(view);
  const closedAt = closure?.cerrado ? closure.horaCierre || timeOf(closure.actualizadoEn) : "";
  const avisos = activeAvisos(view.fecha).length;
  const warnings = routeInfo.routes.some((route) => route.stops.length) ? shiftWarnings(routeInfo.routes).length : 0;
  const incidents = incidentsFor(view.fecha).length;
  const observations = getObservations().length;
  const tile = (attrs, iconName, title, meta, tone = "") => `
    <li>
      <button type="button" class="sv-menu-tile ${tone}" ${attrs}>
        ${icon(iconName, "sv-icon")}
        <b>${title}</b>
        ${meta ? `<small>${meta}</small>` : ""}
      </button>
    </li>
  `;
  return `
    <h1 class="sv-h1">Más</h1>
    <ul class="sv-menu">
      ${tile(`id="sv-close-open" data-sv-close-open`, "flag", "Cerrar turno", closure?.cerrado ? `Cerrado ${esc(closedAt)}` : `${esc(SHIFTS[view.shift].label)} abierto`, closure?.cerrado ? "is-ok" : "is-primary")}
      ${tile(`id="sv-sub-observacion" data-sv-sub="observacion"`, "eye", "Observación", observations ? `${observations} en ${OBS_DAYS} días` : "Conducta")}
      ${tile(`id="sv-sub-avisos" data-sv-sub="avisos"`, "mapPin", "Avisos", avisos ? plural(avisos, "vigente", "vigentes") : "Por barrio", avisos ? "is-warn" : "")}
      ${tile(`id="sv-sub-seguridad" data-sv-sub="seguridad"`, "shieldCheck", "Seguridad", warnings ? plural(warnings, "aviso", "avisos") : "Sin avisos")}
      ${tile(`id="sv-sub-incidentes" data-sv-sub="incidentes"`, "alertTriangle", "Incidentes", incidents ? `${incidents} hoy` : "Ninguno hoy", incidents ? "is-danger" : "")}
      <li>
        <a class="sv-menu-tile" id="sv-go-paseador" href="/paseador" data-link>
          ${icon("pawPrint", "sv-icon")}<b>Modo paseador</b><small>Ver su ruta</small>
        </a>
      </li>
      ${tile(`id="sv-sub-ayuda" data-sv-sub="ayuda"`, "help", "Ayuda", "Colores y fuentes")}
      ${tile(`id="sv-refresh-more" data-sv-refresh`, "radio", "Actualizar", "Traer lo nuevo")}
      ${tile(`id="sv-logout-more" data-sv-logout`, "logOut", "Salir", "")}
    </ul>
  `;
}

function SafetySection(routes) {
  if (!routes.some((route) => route.stops.length)) return `<div class="sv-empty-box"><p>Sin perros en este turno.</p></div>`;
  const warnings = shiftWarnings(routes);
  if (!warnings.length) return `<p class="sv-line is-ok">${icon("checkCircle", "sv-icon")} <span>Sin incompatibles, bozales ni datos a revisar.</span></p>`;
  // Lo que frena o cuida el paseo, a la vista; los datos a revisar (no frenan), plegados.
  const urgent = warnings.filter((warning) => warning.tone !== "info");
  const info = warnings.filter((warning) => warning.tone === "info");
  return `
    ${urgent.length ? `<ol class="sv-warnings">${urgent.map((warning) => WarningCard(warning)).join("")}</ol>` : `<p class="sv-line is-ok">${icon("checkCircle", "sv-icon")} <span>Sin incompatibles ni bozales.</span></p>`}
    ${info.length ? `
      <details class="sv-fold" data-sv-fold="seguridad-info" ${isFoldOpen("seguridad-info") ? "open" : ""}>
        <summary><span class="sv-fold-title">${icon("fileText", "sv-icon")} A revisar</span><span class="sv-pill">${info.reduce((sum, warning) => sum + warning.lines.length, 0)}</span></summary>
        <ol class="sv-warnings sv-fold-body">${info.map((warning) => WarningCard(warning)).join("")}</ol>
      </details>
    ` : ""}
  `;
}

function WarningCard(warning) {
  return `
    <li class="sv-warning is-${warning.tone}">
      <h2 class="sv-h3">${icon(warning.icon, "sv-icon")} ${esc(warning.title)}</h2>
      <ul class="sv-plain-list">
        ${warning.lines.map((line) => `<li>${esc(line)}</li>`).join("")}
      </ul>
      <p class="sv-warning-action"><b>Qué hacer:</b> ${esc(warning.action)}</p>
      <p class="sv-source">${esc(warning.source)}</p>
    </li>
  `;
}

function IncidentsSection(view) {
  const incidents = incidentsFor(view.fecha);
  if (!incidents.length) return `<div class="sv-empty-box"><p>${loaded.has("incidentes") ? "Sin incidentes hoy." : "Cargando…"}</p></div>`;
  return `
    <ul class="sv-requests">
      ${incidents.map((item) => `
        <li class="sv-request is-danger">
          <p class="sv-request-head">
            ${item.riesgo ? `<span class="sv-state is-danger">Riesgo: ${esc(item.riesgo)}</span>` : ""}
            ${item.lesiones ? `<span class="sv-state is-warn">Lesiones: ${esc(item.lesiones)}</span>` : ""}
          </p>
          <h2 class="sv-h3">${esc(item.titulo || "Incidente")}</h2>
          <p class="sv-muted">${item.hora ? `${esc(item.hora)} · ` : ""}${esc(incidentDogs(item))}${item.lugar ? ` · ${esc(item.lugar)}` : ""}${item.barrio ? ` · ${esc(item.barrio)}` : ""}</p>
          <dl class="sv-detail">
            ${[["Antes", item.antes], ["Conducta", item.conducta], ["Acción", item.accion], ["Después", item.despues], ["Protocolo", item.protocolo]]
              .filter(([, value]) => value)
              .map(([label, value]) => `<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`)
              .join("")}
          </dl>
          <p class="sv-source">${esc(lastMark(item, "Cargó"))}</p>
        </li>
      `).join("")}
    </ul>
  `;
}

function HelpSection() {
  const legend = [
    ["neutral", "Pendiente", "Todavía no es la hora."],
    ["warn", "Retirar ya", "Es la hora de retiro."],
    ["info", "Retirado", "En la calle."],
    ["ok", "Entregado", "Volvió a casa."],
    ["danger", "Atrasado", `Pasaron ${PICKUP_GRACE} minutos de la hora de retiro, o ${DELIVERY_GRACE} minutos del final del paseo. Se recalcula cada minuto.`],
  ];
  return `
    <section class="sv-card" aria-labelledby="sv-legend-title">
      <h2 class="sv-h2" id="sv-legend-title">Colores</h2>
      <ul class="sv-legend">
        ${legend.map(([tone, label, text]) => `<li><span class="sv-state is-${tone}">${label}</span> ${text}</li>`).join("")}
        <li><span class="sv-chip is-danger"><b>No juntar</b></span> Esos perros no caminan juntos.</li>
        <li><span class="sv-chip is-warn"><b>Bozal</b></span> Sale con bozal puesto y revisado.</li>
      </ul>
    </section>
    <section class="sv-card" aria-labelledby="sv-how-title">
      <h2 class="sv-h2" id="sv-how-title">Cómo se usa</h2>
      <ul class="sv-plain-list">
        <li><b>Marcar retirado / entregado:</b> un toque. Si te equivocás, «Deshacer» abajo.</li>
        <li><b>No sale:</b> tocás «No sale» y después «Sí, avisar» (le llega al coordinador) o «Solo marcar».</li>
        <li><b>Cambio:</b> se lo pedís al coordinador. Elegís qué y «Enviar». El motivo es opcional. Vos no cambiás la ruta.</li>
        <li><b>WhatsApp:</b> abre WhatsApp con el mensaje armado y elegís el chat. Teléfonos del equipo: ${PENDIENTE}.</li>
        <li><b>Sin señal:</b> seguí marcando, se envía solo. Las fotos necesitan señal.</li>
      </ul>
    </section>
    <details class="sv-fold" data-sv-fold="referencias" ${isFoldOpen("referencias") ? "open" : ""}>
      <summary><span class="sv-fold-title">${icon("fileText", "sv-icon")} Categorías y fuentes</span></summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(CATEGORIES).map(([name, text]) => `
            <div class="is-${name === "SIN EVALUAR" ? "none" : name.toLowerCase()}"><dt>${name}</dt><dd>${text}</dd></div>
          `).join("")}
        </dl>
        <p class="sv-source">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-plain-list sv-source">
          <li>Rutas y horarios: los arma el coordinador. Respaldo: ${BUSINESS_INFO.officialSources.routes}, leída el ${DATA_UPDATED}.</li>
          <li>Perros: ${BUSINESS_INFO.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador.</li>
        </ul>
      </div>
    </details>
  `;
}

// ---------- Avisos por barrio ----------

function getAvisoDraft(view) {
  return { barrio: "", tipo: AVISO_TYPES[0], mensaje: "", vigenteHasta: view.fecha, ...readJSON(KEYS.avisoDraft, {}) };
}

function AvisosSection(view) {
  const avisos = activeAvisos(view.fecha);
  const draft = getAvisoDraft(view);
  const open = isFoldOpen("aviso-form", !avisos.length);
  return `
    ${avisos.length ? `
      <ul class="sv-requests">
        ${avisos.map((item) => {
          const danger = item.tipo === "seguridad" || item.tipo === "perro suelto";
          return `
            <li class="sv-request is-${danger ? "danger" : "warn"}">
              <p class="sv-request-head"><span class="sv-state is-${danger ? "danger" : "warn"}">${esc(item.tipo || "otro")}</span></p>
              <h2 class="sv-h3">${esc(item.barrio || PENDIENTE)}</h2>
              <p>${esc(item.mensaje || "")}</p>
              <p class="sv-source">${item.vigenteHasta ? `Hasta ${esc(isoToLabel(item.vigenteHasta))}` : "Hoy"} · ${esc(lastMark(item, "Cargó"))}</p>
            </li>
          `;
        }).join("")}
      </ul>
    ` : `<div class="sv-empty-box"><p>${loaded.has("avisos") ? "Sin avisos vigentes." : "Cargando…"}</p></div>`}
    <details class="sv-fold" data-sv-fold="aviso-form" ${open ? "open" : ""}>
      <summary><span class="sv-fold-title">${icon("plus", "sv-icon")} Nuevo aviso</span></summary>
      <form class="sv-form sv-fold-body" data-sv-aviso-form novalidate>
        <label class="sv-field" for="sv-aviso-barrio">Barrio
          <input type="text" id="sv-aviso-barrio" data-sv-aviso="barrio" list="sv-barrios" value="${esc(draft.barrio)}" autocomplete="off" required />
          <datalist id="sv-barrios">${BARRIOS_BASE.map((name) => `<option value="${esc(name)}"></option>`).join("")}</datalist>
        </label>
        <fieldset class="sv-chipset">
          <legend>Tipo</legend>
          ${AVISO_TYPES.map((tipo, index) => `
            <label class="sv-chip-opt" for="sv-aviso-tipo-${index}">
              <input type="radio" name="sv-aviso-tipo" id="sv-aviso-tipo-${index}" value="${tipo}" data-sv-aviso="tipo" ${tipo === draft.tipo ? "checked" : ""} />
              <span>${tipo[0].toUpperCase()}${tipo.slice(1)}</span>
            </label>
          `).join("")}
        </fieldset>
        <label class="sv-field" for="sv-aviso-mensaje">Qué pasa
          <textarea id="sv-aviso-mensaje" rows="2" data-sv-aviso="mensaje" placeholder="Ej.: corte en la entrada sur hasta las 12" required>${esc(draft.mensaje)}</textarea>
        </label>
        <label class="sv-field sv-field-short" for="sv-aviso-hasta">Vale hasta
          <input type="date" id="sv-aviso-hasta" data-sv-aviso="vigenteHasta" value="${esc(draft.vigenteHasta)}" min="${view.fecha}" required />
        </label>
        <p class="sv-source">Lo ve el equipo y marketing. Sin domicilios ni teléfonos.</p>
        ${statusRegion("aviso")}
        <button type="submit" class="sv-btn sv-btn-primary sv-btn-main" id="sv-aviso-save">${icon("send", "sv-icon")} Publicar</button>
      </form>
    </details>
  `;
}

// ---------- Observaciones de conducta ----------

function ObservationSection(view, dogs) {
  const draft = getObservationDraft(view);
  const saved = getObservations();
  const shiftIds = new Set(dogs.map((dog) => dog.id));
  const others = REAL_DOGS.filter((dog) => !shiftIds.has(dog.id));
  return `
    <p class="sv-lead">Contá lo que se vio y se oyó, sin etiquetas.</p>
    <form class="sv-form sv-card" data-sv-obs-form novalidate>
      <label class="sv-field" for="sv-obs-dog">Perro
        <select id="sv-obs-dog" data-sv-obs="dogId" required>
          <option value="">Elegí</option>
          ${dogs.length ? `<optgroup label="De este turno">${dogs.map((dog) => `<option value="${dog.id}" ${draft.dogId === dog.id ? "selected" : ""}>${esc(dog.name)}</option>`).join("")}</optgroup>` : ""}
          <optgroup label="Otros">${others.map((dog) => `<option value="${dog.id}" ${draft.dogId === dog.id ? "selected" : ""}>${esc(dog.name)}</option>`).join("")}</optgroup>
        </select>
      </label>
      <div class="sv-grid-2">
        <label class="sv-field" for="sv-obs-fecha">Fecha
          <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${esc(draft.fecha)}" inputmode="numeric" placeholder="${view.now.label}" maxlength="10" autocomplete="off" required />
        </label>
        <label class="sv-field" for="sv-obs-hora">Hora
          <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${esc(draft.hora)}" />
        </label>
      </div>
      ${OBSERVATION_FIELDS.map((field) => `
        <label class="sv-field" for="sv-obs-${field.key}">${OBS_SHORT[field.key]}
          ${field.type === "input"
            ? `<input type="text" id="sv-obs-${field.key}" data-sv-obs="${field.key}" value="${esc(draft[field.key])}" placeholder="${esc(OBS_PLACEHOLDER[field.key])}" required />`
            : `<textarea id="sv-obs-${field.key}" rows="2" data-sv-obs="${field.key}" placeholder="${esc(OBS_PLACEHOLDER[field.key])}" required>${esc(draft[field.key])}</textarea>`}
        </label>
      `).join("")}
      <label class="sv-switch" for="sv-obs-seguimiento">
        <input type="checkbox" role="switch" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${draft.seguimiento ? "checked" : ""} />
        <span class="sv-switch-track" aria-hidden="true"></span>
        <span>Avisar a Juan (seguimiento)</span>
      </label>
      ${statusRegion("observation")}
      <button type="submit" class="sv-btn sv-btn-primary sv-btn-main" id="sv-obs-save">${icon("checkCircle", "sv-icon")} Guardar</button>
    </form>
    ${saved.length ? `
      <details class="sv-fold" data-sv-fold="obs-lista" ${isFoldOpen("obs-lista") ? "open" : ""}>
        <summary><span class="sv-fold-title">${icon("eye", "sv-icon")} Registradas</span><span class="sv-pill">${saved.length}</span></summary>
        <ul class="sv-requests sv-fold-body">${saved.map((obs) => ObservationCard(obs)).join("")}</ul>
      </details>
    ` : ""}
  `;
}

const OBS_SHORT = { lugar: "Lugar", estimulo: "Qué pasó antes", reaccion: "Qué hizo el perro", accion: "Qué hiciste vos", resultado: "Cómo terminó" };
const OBS_PLACEHOLDER = {
  lugar: "Calle o plaza. Sin domicilios.",
  estimulo: "Ej.: pasó un perro suelto a 5 m",
  reaccion: "Ej.: ladró y tiró de la correa",
  accion: "Ej.: crucé de vereda",
  resultado: "Ej.: a los 30 s se calmó",
};

function ObservationCard(obs) {
  const confirming = pendingObservationDelete === obs.id;
  const name = obs.perroNombre || dogById(obs.perroId)?.name || PENDIENTE;
  const domId = safeId(obs.id);
  return `
    <li class="sv-request ${obs.seguimiento ? "is-warn" : "is-neutral"}">
      <p class="sv-request-head">${obs.seguimiento ? `<span class="sv-state is-warn">Seguimiento</span>` : ""}<span class="sv-muted">${esc(isoToLabel(obs.fecha))}${obs.hora ? ` · ${esc(obs.hora)}` : ""}</span></p>
      <h2 class="sv-h3">${esc(name)}${obs.lugar ? ` · ${esc(obs.lugar)}` : ""}</h2>
      <dl class="sv-detail">
        <div><dt>Antes</dt><dd>${esc(obs.estimulo || PENDIENTE)}</dd></div>
        <div><dt>Perro</dt><dd>${esc(obs.reaccion || PENDIENTE)}</dd></div>
        <div><dt>Acción</dt><dd>${esc(obs.accion || PENDIENTE)}</dd></div>
        <div><dt>Final</dt><dd>${esc(obs.resultado || PENDIENTE)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${esc(observationAuthor(obs))}</p>
      <div class="sv-row cols-2">
        ${confirming ? `
          <button type="button" class="sv-btn sv-btn-danger" id="sv-obs-del-ok-${domId}" data-sv-obs-delete-ok="${esc(obs.id)}">Sí, borrar</button>
          <button type="button" class="sv-btn" id="sv-obs-del-no-${domId}" data-sv-obs-delete-cancel>No</button>
        ` : `
          <button type="button" class="sv-btn" id="sv-obs-copy-${domId}" data-sv-obs-copy="${esc(obs.id)}">${icon("copy", "sv-icon")} <span>Copiar</span></button>
          ${canDelete(obs) ? `<button type="button" class="sv-btn" id="sv-obs-del-${domId}" data-sv-obs-delete="${esc(obs.id)}">${icon("x", "sv-icon")} <span>Borrar</span></button>` : ""}
        `}
      </div>
    </li>
  `;
}

// ---------- Hojas de abajo (pedido de cambio y cierre) ----------

function Sheet(titleId, title, sub, body, closeLabel) {
  return `
    <div class="sv-sheet-wrap">
      <div class="sv-backdrop" data-sv-sheet-close aria-hidden="true"></div>
      <section class="sv-sheet" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
        <header class="sv-sheet-head">
          <div>
            <h2 class="sv-h2" id="${titleId}">${title}</h2>
            ${sub ? `<p class="sv-muted">${sub}</p>` : ""}
          </div>
          <button type="button" class="sv-icon-btn" id="sv-sheet-x" data-sv-sheet-close aria-label="${esc(closeLabel)}">${icon("x", "sv-icon")}</button>
        </header>
        ${body}
      </section>
    </div>
  `;
}

function RequestSheet(view, routeInfo) {
  const draft = getRequestDraft(view);
  if (!draft.open) return "";
  const routes = routeInfo.routes;
  const target = [draft.perroNombre, draft.ruta ? draft.ruta : `Turno ${SHIFTS[view.shift].label.toLowerCase()}`].filter(Boolean).join(" · ");
  const showRoutes = draft.from === "turno" && routes.length > 1;
  const inShift = new Set(routes.flatMap((route) => route.stops.map((stop) => stop.perroId)).filter(Boolean));
  const extraDogs = REAL_DOGS.filter((dog) => !inShift.has(dog.id) && dog.status === "Activo").sort((a, b) => a.name.localeCompare(b.name));
  const stop = draft.perroId ? routes.find((route) => route.code === draft.ruta)?.stops.find((item) => item.perroId === draft.perroId) : null;
  // Horas sugeridas a partir de la hora de retiro de la ruta: tocar una ya elige «Cambiar hora».
  const stopRecord = stop ? paseosById().get(paseoId(view.fecha, stop.perroId, view.shift)) : null;
  const pickedUp = ["retirado", "paseando", "entregado"].includes(stopRecord?.estado);
  const planned = pickedUp ? null : toMinutes(stop?.hora);
  const hourChips = planned === null ? [] : [15, 30, 60].map((plus) => {
    const value = clock(planned + plus);
    return { value, label: value };
  });
  const radios = (name, options, current, prefix) =>
    options
      .map(({ value, label }, index) => `
        <label class="sv-chip-opt" for="${prefix}-${index}">
          <input type="radio" name="${name}" id="${prefix}-${index}" value="${esc(value)}" data-sv-req="${name.replace("sv-req-", "")}" ${value === current ? "checked" : ""} />
          <span>${esc(label)}</span>
        </label>
      `)
      .join("");
  const body = `
    <form class="sv-form" data-sv-request-form novalidate>
      <fieldset class="sv-chipset">
        <legend>Qué</legend>
        ${radios("sv-req-tipo", REQUEST_CHIPS, draft.tipo, "sv-req-tipo")}
      </fieldset>
      ${showRoutes ? `
        <fieldset class="sv-chipset">
          <legend>Ruta</legend>
          ${radios("sv-req-ruta", [...routes.map((route) => ({ value: route.code, label: route.code })), { value: "", label: "Todas" }], draft.ruta, "sv-req-ruta")}
        </fieldset>
      ` : ""}
      ${hourChips.length ? `
        <fieldset class="sv-chipset">
          <legend>Cambiar hora <span class="sv-legend-note">(era ${esc(stop.hora)})</span></legend>
          ${radios("sv-req-hora", hourChips, draft.tipo === "cambiar hora" ? draft.hora : "", "sv-req-hora")}
        </fieldset>
      ` : ""}
      ${draft.tipo === "cambiar hora" ? `
        <label class="sv-field sv-field-short" for="sv-req-hora">${hourChips.length ? "Otra hora" : `Hora nueva${stop?.hora ? ` (era ${esc(stop.hora)})` : ""}`}
          <input type="time" id="sv-req-hora" data-sv-req="hora" value="${esc(draft.hora)}" step="300" />
        </label>
      ` : ""}
      ${draft.tipo === "agregar perro" ? `
        <label class="sv-field" for="sv-req-extra">Perro a sumar
          <select id="sv-req-extra" data-sv-req="extraDog">
            <option value="">Elegí</option>
            ${extraDogs.map((dog) => `<option value="${dog.id}" ${draft.extraDog === dog.id ? "selected" : ""}>${esc(dog.name)}</option>`).join("")}
          </select>
        </label>
      ` : ""}
      <fieldset class="sv-chipset">
        <legend>Por qué <span class="sv-legend-note">(opcional)</span></legend>
        ${radios("sv-req-motivo", MOTIVO_CHIPS.map((value) => ({ value, label: value })), draft.motivo, "sv-req-motivo")}
      </fieldset>
      <label class="sv-field" for="sv-req-texto">Detalle
        <input type="text" id="sv-req-texto" data-sv-req="texto" value="${esc(draft.texto)}" maxlength="140" placeholder="Opcional. Sin teléfonos." autocomplete="off" />
      </label>
      <label class="sv-switch" for="sv-req-urgente">
        <input type="checkbox" role="switch" id="sv-req-urgente" data-sv-req="urgente" ${draft.urgente ? "checked" : ""} />
        <span class="sv-switch-track" aria-hidden="true"></span>
        <span>Urgente</span>
      </label>
      <div class="sv-sheet-foot">
        ${statusRegion("request-form")}
        <button type="submit" class="sv-btn sv-btn-primary sv-btn-main" id="sv-req-save">${icon("send", "sv-icon")} Enviar</button>
      </div>
    </form>
  `;
  return Sheet("sv-req-title", "Pedir cambio", esc(target), body, "Volver sin enviar");
}

function ClosureSheet(view) {
  const closure = getClosure(view);
  const notes = closureNotes(view);
  const closedAt = closure?.cerrado ? closure.horaCierre || timeOf(closure.actualizadoEn) : "";
  const body = `
    <p class="sv-line ${closure?.cerrado ? "is-ok" : "is-info"}">
      ${icon(closure?.cerrado ? "checkCircle" : "fileText", "sv-icon")}
      <span>${closure?.cerrado ? esc(`Cerrado ${closedAt} hs. ${lastMark(closure, "Lo cerró")}`) : "Resumen listo. Copialo y cerrá."}</span>
    </p>
    <label class="sv-field" for="sv-close-summary"><span class="visually-hidden">Resumen del turno</span>
      <textarea id="sv-close-summary" class="sv-summary" rows="9" readonly>${esc(closureSummary(view))}</textarea>
    </label>
    <details class="sv-fold sv-fold-flat" data-sv-fold="cierre-nota" ${isFoldOpen("cierre-nota") || notes ? "open" : ""}>
      <summary><span class="sv-fold-title">${icon("plus", "sv-icon")} Nota</span></summary>
      <label class="sv-field sv-fold-body" for="sv-close-notes">Nota del turno (opcional)
        <textarea id="sv-close-notes" rows="2" data-sv-close-notes placeholder="Novedades. Sin datos de tutores.">${esc(notes)}</textarea>
      </label>
    </details>
    ${statusRegion("closure")}
    <div class="sv-row cols-2">
      <button type="button" class="sv-btn sv-btn-main" id="sv-close-copy" data-sv-close-copy>${icon("copy", "sv-icon")} Copiar</button>
      ${closure?.cerrado
        ? `<button type="button" class="sv-btn sv-btn-main" id="sv-close-reopen" data-sv-close-reopen>Reabrir</button>`
        : `<button type="button" class="sv-btn sv-btn-primary sv-btn-main" id="sv-close-done" data-sv-close-done>${icon("flag", "sv-icon")} Cerrar</button>`}
    </div>
  `;
  return Sheet("sv-close-title", `Cerrar turno ${esc(SHIFTS[view.shift].label.toLowerCase())}`, esc(`${view.day} ${view.fechaLabel}`), body, "Volver");
}

// ---------- Eventos ----------

function rerender(focusId) {
  if (!focusId) return renderKeepingFocus();
  syncFolds();
  render();
  focusById(focusId);
}

// Pone el foco y, si quedó fuera de la pantalla, lo trae a la vista (sin animación).
function focusById(focusId) {
  const element = focusId && document.getElementById(focusId);
  if (!element || !element.getClientRects().length) return false;
  element.focus({ preventScroll: true });
  const rect = element.getBoundingClientRect();
  const bottomLimit = window.innerHeight - 150;
  if (rect.top < 70 || rect.bottom > bottomLimit) element.scrollIntoView({ block: "center" });
  return true;
}

function timeNow() {
  return nowInArgentina().time;
}

async function copyText(text, fallbackId) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = fallbackId && document.getElementById(fallbackId);
    if (area) {
      area.focus();
      area.select();
      try {
        return document.execCommand("copy");
      } catch {
        return false;
      }
    }
    return false;
  }
}

function findStop(view, code, dogId) {
  const route = routesFor(view).routes.find((item) => item.code === code);
  const stop = route?.stops.find((item) => item.perroId === dogId);
  return route && stop ? { route, stop } : null;
}

// Datos para guardar en `paseos`: mismo id del contrato y solo los campos que cambian
// (si el registro todavía no existe, se suman los datos del perro).
function paseoPayload(view, route, stop, changes) {
  const id = paseoId(view.fecha, stop.perroId, view.shift);
  const existing = paseosById().get(id);
  const data = { id, fecha: view.fecha, ...changes };
  if (!existing) Object.assign(data, { perroId: stop.perroId, perroNombre: stop.perroNombre, turno: SHIFTS[view.shift].label });
  if (existing?.ruta !== route.code) data.ruta = route.code;
  return data;
}

// Retiro, entrega y "no sale": actualiza el MISMO registro de paseos que usa el paseador.
// Después del cambio queda "Deshacer" 5 segundos.
// notify: con "no-sale", además le manda al coordinador el pedido «no sale» (sin motivo: es opcional).
async function markWalk(code, dogId, action, focusId, notify = false) {
  const view = getView();
  const found = findStop(view, code, dogId);
  if (!found) return;
  const { route, stop } = found;
  const id = paseoId(view.fecha, dogId, view.shift);
  if (inFlight.has(id)) return;
  const record = paseosById().get(id);
  const status = stopStatus(stop, record, view.now.minutes);
  const hora = timeNow();
  const clearTimes = { horaRetiro: "", horaPaseo: "", horaEntrega: "" };
  const name = stop.perroNombre;
  const prev = {
    estado: record?.estado || "pendiente",
    horaRetiro: record?.horaRetiro || "",
    horaPaseo: record?.horaPaseo || "",
    horaEntrega: record?.horaEntrega || "",
  };
  let changes = null;
  let text = "";

  if (action === "retiro") {
    if (status.retirado) {
      changes = { estado: "pendiente", ...clearTimes };
      text = `${name}: retiro desmarcado.`;
    } else {
      changes = { estado: "retirado", horaRetiro: hora };
      const delay = status.planned !== null ? view.now.minutes - status.planned : 0;
      text = `${name} retirado ${hora}${delay > PICKUP_GRACE ? ` (+${duration(delay)})` : ""}.`;
    }
  } else if (action === "entrega") {
    if (!status.retirado) return;
    if (status.kind === "entregado") {
      changes = { estado: record?.horaPaseo ? "paseando" : "retirado", horaEntrega: "" };
      text = `${name}: entrega desmarcada.`;
    } else {
      changes = { estado: "entregado", horaEntrega: hora };
      text = `${name} entregado ${hora}.`;
    }
  } else if (action === "no-sale") {
    if (status.kind === "nosale") {
      changes = { estado: "pendiente" };
      text = `${name} vuelve a la lista.`;
    } else {
      if (status.retirado) return;
      changes = { estado: "no-sale", ...clearTimes };
      text = `${name} no sale hoy.`;
    }
  }
  if (!changes) return;

  inFlight.add(id);
  // Se congela el orden antes de guardar: si llegan datos mientras viaja, la lista no se mueve.
  freezeOrder();
  const result = await persist("paseos", paseoPayload(view, route, stop, changes), "toast", text);
  let request = null;
  if (result && notify && changes.estado === "no-sale") request = await notifyAbsent(view, route, stop);
  inFlight.delete(id);
  const mainId = `sv-main-${cardDomId(route, stop)}`;
  if (!result) orderFreeze = null;
  if (result && !(notify && !request)) {
    flash = null;
    const told = request ? " Avisado al coordinador." : "";
    const offline = result.pendiente || request?.pendiente ? " Sin señal: se envía solo." : "";
    offerUndo(`${text}${told}${offline}`, async () => {
      await restoreWalk(code, dogId, prev, name);
      // Si el pedido ya llegó y lo creaste vos recién, se borra también.
      if (request?.id && !request.pendiente && !request.existing) {
        try {
          await registros.remove("solicitudes", request.id);
          recent.delete(`solicitudes:${request.id}`);
        } catch {
          setFlash("toast", "El pedido al coordinador quedó enviado. Borralo desde Pedidos si no va.", "info");
        }
      }
    }, mainId);
  }
  syncFolds();
  render();
  // Si la tarjeta pasó a "Listos" (plegado), el foco va a "Deshacer".
  if (!focusById(focusId) && !focusById(mainId)) focusById("sv-undo");
}

// Pedido «no sale» al coordinador desde la tarjeta (un toque). Si ya hay uno pendiente, no se repite.
async function notifyAbsent(view, route, stop) {
  const same = requestsFor(view.fecha, view.shift).find(
    (item) => item.perroId === stop.perroId && item.tipo === "no sale" && (item.estado || "pendiente") === "pendiente",
  );
  if (same) return { ...same, existing: true };
  const turno = SHIFTS[view.shift].label;
  const record = {
    fecha: view.fecha,
    turno,
    ruta: route.code,
    tipo: "no sale",
    perroId: stop.perroId,
    perroNombre: stop.perroNombre,
    detalle: `${stop.perroNombre} no sale hoy.`,
    motivo: "",
    urgente: false,
    estado: "pendiente",
    respuesta: "",
    titulo: `No sale · ${stop.perroNombre} · ${route.code} · ${turno} ${view.fechaLabel}`,
  };
  const result = await persist("solicitudes", record, "toast", "Pedido enviado al coordinador.");
  if (result && !result.pendiente) requestStates.set(result.id, "pendiente");
  return result;
}

async function restoreWalk(code, dogId, prev, name) {
  const view = getView();
  const found = findStop(view, code, dogId);
  if (!found) return;
  const id = paseoId(view.fecha, dogId, view.shift);
  inFlight.add(id);
  await persist("paseos", paseoPayload(view, found.route, found.stop, prev), "toast", `${name}: deshecho.`, "info");
  inFlight.delete(id);
}

async function saveNote(code, dogId, focusId) {
  const view = getView();
  const found = findStop(view, code, dogId);
  if (!found) return;
  const { route, stop } = found;
  const id = paseoId(view.fecha, dogId, view.shift);
  const nota = String(noteDrafts.has(id) ? noteDrafts.get(id) : document.querySelector(`[data-sv-note="${id}"]`)?.value || "").trim();
  if (PHONE_LIKE.test(nota)) {
    setFlash("toast", "La nota parece tener un teléfono. Sacalo.", "error");
    return rerender(focusId);
  }
  const result = await persist(
    "paseos",
    paseoPayload(view, route, stop, { nota }),
    "toast",
    nota ? `Nota guardada: ${stop.perroNombre}.` : `Nota borrada: ${stop.perroNombre}.`,
  );
  if (result) {
    noteDrafts.delete(id);
    openStops.delete(id);
  }
  rerender(result ? `sv-opt-${cardDomId(route, stop)}` : focusId);
}

// Lee los campos de un formulario (los radios, solo el elegido).
function readFields(form, attr, draft) {
  form.querySelectorAll(`[${attr}]`).forEach((field) => {
    const key = field.getAttribute(attr);
    if (field.type === "radio") {
      if (field.checked) draft[key] = field.value;
    } else {
      draft[key] = field.type === "checkbox" ? field.checked : field.value;
    }
  });
  return draft;
}

async function saveAviso(form) {
  const view = getView();
  const draft = readFields(form, "data-sv-aviso", getAvisoDraft(view));
  writeJSON(KEYS.avisoDraft, draft);
  const barrio = String(draft.barrio || "").trim();
  const mensaje = String(draft.mensaje || "").trim();
  if (!barrio || !mensaje) {
    setFlash("aviso", `Falta: ${listWithAnd([!barrio && "barrio", !mensaje && "qué pasa"].filter(Boolean))}.`, "error");
    return rerender(!barrio ? "sv-aviso-barrio" : "sv-aviso-mensaje");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.vigenteHasta) || draft.vigenteHasta < view.fecha) {
    setFlash("aviso", `Elegí hasta cuándo vale (desde hoy, ${view.fechaLabel}).`, "error");
    return rerender("sv-aviso-hasta");
  }
  if (PHONE_LIKE.test(mensaje) || PHONE_LIKE.test(barrio)) {
    setFlash("aviso", "Parece tener un teléfono. Sacalo: los avisos no llevan contactos.", "error");
    return rerender("sv-aviso-mensaje");
  }
  const tipo = AVISO_TYPES.includes(draft.tipo) ? draft.tipo : "otro";
  const result = await persist(
    "avisos",
    { fecha: view.fecha, barrio, tipo, mensaje, vigenteHasta: draft.vigenteHasta, titulo: `${tipo[0].toUpperCase()}${tipo.slice(1)} · ${barrio}` },
    "aviso",
    `Aviso de ${barrio} publicado.`,
  );
  if (result) writeJSON(KEYS.avisoDraft, { barrio: "", tipo: AVISO_TYPES[0], mensaje: "", vigenteHasta: view.fecha });
  return rerender("sv-aviso-save");
}

async function saveRequest(form) {
  const view = getView();
  const draft = readFields(form, "data-sv-req", getRequestDraft(view));
  writeJSON(KEYS.requestDraft, draft);
  const texto = String(draft.texto || "").trim();
  const tipo = REQUEST_TYPES.includes(draft.tipo) ? draft.tipo : "otro";
  const extraDog = tipo === "agregar perro" ? dogById(draft.extraDog) : null;
  const fail = (text, focusId) => {
    setFlash("request-form", text, "error");
    return rerender(focusId);
  };
  if (tipo === "cambiar hora" && !draft.hora && !texto) return fail("Poné la hora nueva.", "sv-req-hora");
  if (tipo === "agregar perro" && !extraDog && !texto) return fail("Elegí el perro a sumar.", "sv-req-extra");
  if (tipo === "otro" && !texto) return fail("Contá qué cambiar en Detalle.", "sv-req-texto");
  if (PHONE_LIKE.test(texto)) return fail("Parece tener un teléfono. Sacalo.", "sv-req-texto");

  const ruta = draft.ruta || "";
  const stop = draft.perroId ? findStop(view, ruta, draft.perroId)?.stop : null;
  const name = draft.perroNombre || "";
  const autoDetail = {
    "no sale": `${name || "El perro"} no sale hoy.`,
    "cambiar hora": draft.hora ? `Retirar${name ? ` a ${name}` : ""} a las ${draft.hora}${stop?.hora ? ` (en vez de ${stop.hora})` : ""}.` : "",
    "agregar perro": extraDog ? `Sumar a ${extraDog.name}${ruta ? ` a ${ruta}` : ""}.` : "",
    "cambiar paseador o ayudante": "Cambiar paseador o ayudante.",
    otro: "",
  }[tipo];
  // El motivo es opcional: si eligió «Otro» y escribió algo, el detalle es el motivo.
  const chip = MOTIVO_CHIPS.includes(draft.motivo) ? draft.motivo : "";
  const otherReason = chip === "Otro" && texto;
  const motivo = otherReason ? texto : chip;
  const detalle = [autoDetail, otherReason ? "" : texto].filter(Boolean).join(" ");
  const perroId = extraDog ? extraDog.id : draft.perroId || "";
  const perroNombre = extraDog ? extraDog.name : name;
  const turno = SHIFTS[view.shift].label;
  const record = {
    fecha: view.fecha,
    turno,
    ruta,
    tipo,
    perroId,
    perroNombre,
    detalle,
    motivo,
    urgente: Boolean(draft.urgente),
    estado: "pendiente",
    respuesta: "",
    titulo: `${draft.urgente ? "URGENTE · " : ""}${tipo[0].toUpperCase()}${tipo.slice(1)}${perroNombre ? ` · ${perroNombre}` : ""}${ruta ? ` · ${ruta}` : ""} · ${turno} ${view.fechaLabel}`,
  };
  const result = await persist("solicitudes", record, "request-form", "Pedido enviado al coordinador.");
  if (!result) return rerender("sv-req-save");
  if (!result.pendiente) requestStates.set(result.id, "pendiente");
  // Se cierra la hoja: el mensaje pasa al aviso de abajo.
  if (flash) flash.area = "toast";
  writeJSON(KEYS.requestDraft, emptyRequest(view));
  const opener = sheetOpener;
  sheetOpener = "";
  syncFolds();
  render();
  if (!focusById(opener)) focusById("sv-main");
}

async function saveObservation(form) {
  const view = getView();
  const draft = readFields(form, "data-sv-obs", getObservationDraft(view));
  writeJSON(KEYS.observationDraft, draft);

  const missing = [];
  if (!draft.dogId) missing.push("perro");
  if (!draft.fecha) missing.push("fecha");
  OBSERVATION_FIELDS.forEach((field) => {
    if (!String(draft[field.key]).trim()) missing.push(OBS_SHORT[field.key].toLowerCase());
  });
  const fechaIso = labelToIso(draft.fecha);
  if (!missing.length && !fechaIso) {
    setFlash("observation", `Fecha como DD/MM/AAAA, por ejemplo ${view.now.label}.`, "error");
    return rerender("sv-obs-fecha");
  }
  if (!missing.length && fechaIso > view.now.iso) {
    setFlash("observation", "La fecha no puede ser posterior a hoy.", "error");
    return rerender("sv-obs-fecha");
  }
  if (missing.length) {
    setFlash("observation", `Falta: ${listWithAnd(missing)}.`, "error");
    const first = !draft.dogId ? "sv-obs-dog" : !draft.fecha ? "sv-obs-fecha" : `sv-obs-${OBSERVATION_FIELDS.find((field) => !String(draft[field.key]).trim()).key}`;
    return rerender(first);
  }

  const labelled = OBSERVATION_FIELDS.find((field) => FORBIDDEN_LABELS.test(draft[field.key]));
  if (labelled) {
    const word = draft[labelled.key].match(FORBIDDEN_LABELS)[2];
    setFlash("observation", `En «${OBS_SHORT[labelled.key]}» dice «${word}». Contá lo que se vio: «ladró y tiró de la correa».`, "error");
    return rerender(`sv-obs-${labelled.key}`);
  }

  const dog = dogById(draft.dogId);
  const result = await persist(
    "observaciones",
    {
      fecha: fechaIso,
      hora: draft.hora || "",
      perroId: draft.dogId,
      perroNombre: dog?.name || "",
      lugar: draft.lugar.trim(),
      estimulo: draft.estimulo.trim(),
      reaccion: draft.reaccion.trim(),
      accion: draft.accion.trim(),
      resultado: draft.resultado.trim(),
      seguimiento: Boolean(draft.seguimiento),
      turno: SHIFTS[view.shift].label,
      titulo: `Observación: ${dog?.name || PENDIENTE}${draft.seguimiento ? " (requiere seguimiento)" : ""}`,
    },
    "observation",
    `Observación de ${dog?.name || PENDIENTE} guardada.`,
  );
  if (result) writeJSON(KEYS.observationDraft, emptyObservation(view));
  return rerender("sv-obs-save");
}

async function saveClosure(view, changes, text, focusId) {
  const id = closureId(view);
  const notas = closureNotes(view);
  const user = currentUser();
  // El resumen se guarda con el estado ya actualizado (cerrado o no, con las notas nuevas).
  const next = { ...(getClosure(view) || {}), ...changes, notas, actualizadoPor: user.usuario, actualizadoPorNombre: user.nombre, actualizadoEn: new Date().toISOString(), pendiente: false };
  const resumen = closureSummary(view, next);
  const result = await persist(
    "cierres",
    { id, fecha: view.fecha, turno: SHIFTS[view.shift].label, notas, resumen, ...changes },
    closureSheetOpen ? "closure" : "toast",
    text,
    changes.cerrado === false ? "info" : "ok",
  );
  if (result && closureDraft?.id === id && closureDraft.notas === notas) closureDraft = null;
  if (focusId !== false) rerender(focusId);
  return result;
}

function closeSheets() {
  const view = getView();
  const draft = getRequestDraft(view);
  if (draft.open) writeJSON(KEYS.requestDraft, emptyRequest(view));
  closureSheetOpen = false;
  const opener = sheetOpener;
  sheetOpener = "";
  syncFolds();
  render();
  if (!focusById(opener)) focusById("sv-main");
}

function anySheetOpen() {
  return Boolean(document.querySelector(".sv-shell .sv-sheet"));
}

async function uploadPhoto(input) {
  const file = input.files?.[0];
  const perroId = input.dataset.svPhoto;
  const name = input.dataset.name || "";
  if (!file || !perroId) return;
  const focusId = input.id;
  if (navigator.onLine === false) {
    input.value = "";
    setFlash("toast", "Sin señal: la foto necesita conexión.", "error");
    return rerender(focusId);
  }
  photoBusy.add(perroId);
  setFlash("toast", `Subiendo foto de ${name}…`, "info");
  rerender(focusId);
  try {
    await fotosPerros.subir(perroId, name, file);
    setFlash("toast", `Foto de ${name} lista. La ve el equipo.`);
  } catch (error) {
    // Los errores del servidor vienen en castellano; los del navegador (foto que no se puede leer) no.
    const text = typeof error?.status === "number" && error.message
      ? error.message
      : "No se pudo leer la foto. Probá sacarla de nuevo.";
    setFlash("toast", text, "error");
  }
  photoBusy.delete(perroId);
  rerender();
}

function handleSupervisorClick(event) {
  const target = event.target;
  if (!target.closest?.(".sv-shell")) return false;

  if (target.closest("[data-sv-logout]")) {
    navigate("/salir");
    return true;
  }

  if (target.closest("[data-sv-refresh]")) {
    refreshAll(true);
    return true;
  }

  if (target.closest("[data-sv-sheet-close]")) {
    closeSheets();
    return true;
  }

  const undoButton = target.closest("[data-sv-undo]");
  if (undoButton) {
    const pending = activeUndo();
    undo = null;
    if (pending) {
      Promise.resolve(pending.run()).then(() => rerender(pending.focusId || "sv-main"));
    } else {
      rerender();
    }
    return true;
  }

  const tabButton = target.closest("[data-sv-tab]");
  if (tabButton) {
    const tab = tabButton.dataset.svTab;
    const nav = getNav();
    saveNav(tab, "");
    syncFolds();
    render();
    if (nav.tab !== tab || nav.sub) window.scrollTo(0, 0);
    document.getElementById(tabButton.id)?.focus({ preventScroll: true });
    return true;
  }

  const subButton = target.closest("[data-sv-sub]");
  if (subButton) {
    const sub = subButton.dataset.svSub;
    const previous = getNav().sub;
    saveNav("mas", sub);
    syncFolds();
    render();
    window.scrollTo(0, 0);
    focusById(sub ? "sv-back" : `sv-sub-${previous}`);
    return true;
  }

  const gotoButton = target.closest("[data-sv-goto]");
  if (gotoButton) {
    const [tab, sub] = gotoButton.dataset.svGoto.split(":");
    saveNav(tab, sub || "");
    syncFolds();
    render();
    window.scrollTo(0, 0);
    focusById(sub ? "sv-back" : `sv-tab-${tab}`);
    return true;
  }

  const gotoDog = target.closest("[data-sv-goto-dog]");
  if (gotoDog) {
    if (gotoDog.dataset.done) {
      const folds = readJSON(KEYS.folds, {});
      folds.listos = true;
      writeJSON(KEYS.folds, folds);
    }
    saveNav("ahora", "");
    render();
    const card = document.getElementById(`sv-dog-${gotoDog.dataset.svGotoDog}`);
    if (card) {
      card.scrollIntoView({ block: "center" });
      card.focus({ preventScroll: true });
    }
    return true;
  }

  const shiftButton = target.closest("[data-sv-shift]");
  if (shiftButton) {
    saveView(shiftButton.dataset.svShift);
    rerender(shiftButton.id);
    return true;
  }

  const pickup = target.closest("[data-sv-pickup]");
  if (pickup) {
    markWalk(pickup.dataset.ruta, pickup.dataset.svPickup, "retiro", pickup.id);
    return true;
  }

  const deliver = target.closest("[data-sv-deliver]");
  if (deliver) {
    markWalk(deliver.dataset.ruta, deliver.dataset.svDeliver, "entrega", deliver.id);
    return true;
  }

  const absentAskButton = target.closest("[data-sv-absent-ask]");
  if (absentAskButton) {
    absentAsk = absentAskButton.dataset.svAbsentAsk;
    rerender(absentAskButton.id.replace(/^sv-absent-/, "sv-absent-send-"));
    return true;
  }

  const absentCancel = target.closest("[data-sv-absent-cancel]");
  if (absentCancel) {
    absentAsk = "";
    rerender(absentCancel.id.replace(/^sv-absent-cancel-/, "sv-absent-"));
    return true;
  }

  const absentSend = target.closest("[data-sv-absent-send]");
  if (absentSend) {
    absentAsk = "";
    markWalk(absentSend.dataset.ruta, absentSend.dataset.svAbsentSend, "no-sale", absentSend.id, true);
    return true;
  }

  const absent = target.closest("[data-sv-absent]");
  if (absent) {
    absentAsk = "";
    markWalk(absent.dataset.ruta, absent.dataset.svAbsent, "no-sale", absent.id);
    return true;
  }

  const unmark = target.closest("[data-sv-unmark]");
  if (unmark) {
    markWalk(unmark.dataset.ruta, unmark.dataset.svUnmark, unmark.dataset.step === "entrega" ? "entrega" : "retiro", unmark.id);
    return true;
  }

  const options = target.closest("[data-sv-options]");
  if (options) {
    const id = options.dataset.svOptions;
    if (openStops.has(id)) {
      openStops.delete(id);
      noteDrafts.delete(id);
    } else {
      openStops.add(id);
    }
    rerender(options.id);
    return true;
  }

  const noteSave = target.closest("[data-sv-note-save]");
  if (noteSave) {
    saveNote(noteSave.dataset.ruta, noteSave.dataset.svNoteSave, noteSave.id);
    return true;
  }

  const photoOpen = target.closest("[data-sv-photo-open]");
  if (photoOpen) {
    const record = photoRecord(photoOpen.dataset.svPhotoOpen);
    if (record?.archivoId) {
      if (navigator.onLine === false) {
        setFlash("toast", "Sin señal: la foto grande necesita conexión.", "error");
        rerender(photoOpen.id);
      } else {
        archivos.abrir(record.archivoId).catch((error) => {
          setFlash("toast", error?.message || "No se pudo abrir la foto.", "error");
          rerender(photoOpen.id);
        });
      }
    }
    return true;
  }

  const seenButton = target.closest("[data-sv-seen]");
  if (seenButton) {
    markSeen(seenButton.dataset.svSeen);
    rerender();
    return true;
  }

  const requestOpen = target.closest("[data-sv-request-open]");
  if (requestOpen) {
    const view = getView();
    let ruta = requestOpen.dataset.ruta || "";
    const perroId = requestOpen.dataset.dog || "";
    const from = perroId ? "perro" : ruta ? "ruta" : "turno";
    const routes = routesFor(view).routes;
    if (from === "turno" && routes.length === 1) ruta = routes[0].code;
    const record = perroId ? paseosById().get(paseoId(view.fecha, perroId, view.shift)) : null;
    const retirado = ["retirado", "paseando", "entregado"].includes(record?.estado);
    const tipo = REQUEST_TYPES.includes(requestOpen.dataset.tipo) ? requestOpen.dataset.tipo : perroId ? (retirado ? "otro" : "no sale") : "otro";
    closureSheetOpen = false;
    sheetOpener = requestOpen.id;
    writeJSON(KEYS.requestDraft, emptyRequest(view, ruta, perroId, true, from, tipo));
    const index = REQUEST_CHIPS.findIndex((chip) => chip.value === tipo);
    rerender(`sv-req-tipo-${Math.max(index, 0)}`);
    return true;
  }

  if (target.closest("[data-sv-close-open]")) {
    const opener = target.closest("[data-sv-close-open]");
    const view = getView();
    if (getRequestDraft(view).open) writeJSON(KEYS.requestDraft, emptyRequest(view));
    closureSheetOpen = true;
    sheetOpener = opener.id;
    rerender(getClosure(view)?.cerrado ? "sv-close-copy" : "sv-close-done");
    return true;
  }

  if (target.closest("[data-sv-close-copy]")) {
    const view = getView();
    copyText(closureSummary(view), "sv-close-summary").then((ok) => {
      setFlash("closure", ok ? "Copiado. Pegalo en el grupo del equipo." : "No se pudo copiar: seleccioná el texto y copialo a mano.", ok ? "ok" : "error");
      rerender("sv-close-copy");
    });
    return true;
  }

  if (target.closest("[data-sv-close-done]")) {
    const view = getView();
    const hora = timeNow();
    saveClosure(view, { cerrado: true, horaCierre: hora }, "Turno cerrado.", false).then((result) => {
      if (!result) return rerender("sv-close-done");
      closureSheetOpen = false;
      flash = null;
      offerUndo(`Turno cerrado ${hora}.${result.pendiente ? " Sin señal: se envía solo." : ""}`, () => saveClosure(getView(), { cerrado: false, horaCierre: "" }, "Turno reabierto.", false), sheetOpener);
      const opener = sheetOpener;
      sheetOpener = "";
      syncFolds();
      render();
      if (!focusById(opener)) focusById("sv-undo");
    });
    return true;
  }

  if (target.closest("[data-sv-close-reopen]")) {
    saveClosure(getView(), { cerrado: false, horaCierre: "" }, "Turno reabierto.", "sv-close-done");
    return true;
  }

  const obsCopy = target.closest("[data-sv-obs-copy]");
  if (obsCopy) {
    const obs = getObservations().find((item) => item.id === obsCopy.dataset.svObsCopy);
    if (obs) {
      copyText(observationText(obs)).then((ok) => {
        setFlash("observation", ok ? "Copiado. Pegalo en el registro o en WhatsApp." : "No se pudo copiar en este navegador.", ok ? "ok" : "error");
        rerender(obsCopy.id);
      });
    }
    return true;
  }

  const obsDelete = target.closest("[data-sv-obs-delete]");
  if (obsDelete) {
    pendingObservationDelete = obsDelete.dataset.svObsDelete;
    rerender(`sv-obs-del-no-${safeId(pendingObservationDelete)}`);
    return true;
  }

  const obsDeleteOk = target.closest("[data-sv-obs-delete-ok]");
  if (obsDeleteOk) {
    pendingObservationDelete = null;
    removeRecord("observaciones", obsDeleteOk.dataset.svObsDeleteOk, "observation", "Observación borrada.").then(() => rerender("sv-obs-save"));
    return true;
  }

  if (target.closest("[data-sv-obs-delete-cancel]")) {
    const id = pendingObservationDelete;
    pendingObservationDelete = null;
    rerender(`sv-obs-del-${safeId(id)}`);
    return true;
  }

  return false;
}

function handleSupervisorChange(event) {
  const target = event.target;
  if (!target.closest?.(".sv-shell")) return false;
  const view = getView();

  if (target.matches("[data-sv-photo]")) {
    uploadPhoto(target);
    return true;
  }

  if (target.matches("[data-sv-obs]")) {
    const draft = getObservationDraft(view);
    draft[target.dataset.svObs] = target.type === "checkbox" ? target.checked : target.value;
    writeJSON(KEYS.observationDraft, draft);
    return true;
  }

  if (target.matches("[data-sv-aviso]")) {
    if (target.type === "radio" && !target.checked) return true;
    const draft = getAvisoDraft(view);
    draft[target.dataset.svAviso] = target.value;
    writeJSON(KEYS.avisoDraft, draft);
    return true;
  }

  if (target.matches("[data-sv-req]")) {
    if (target.type === "radio" && !target.checked) return true;
    const draft = getRequestDraft(view);
    draft[target.dataset.svReq] = target.type === "checkbox" ? target.checked : target.value;
    writeJSON(KEYS.requestDraft, draft);
    // Tocar una hora sugerida ya elige «Cambiar hora» (un solo paso).
    if (target.dataset.svReq === "hora" && target.type === "radio") {
      draft.tipo = "cambiar hora";
      writeJSON(KEYS.requestDraft, draft);
      rerender(target.id);
      return true;
    }
    // El tipo cambia los campos de la hoja (hora nueva o perro a sumar).
    if (target.dataset.svReq === "tipo") rerender(target.id);
    return true;
  }

  // Las notas del cierre se guardan en el servidor al salir del campo (no en cada tecla).
  if (target.matches("[data-sv-close-notes]")) {
    closureDraft = { id: closureId(view), notas: target.value };
    if (target.value === (getClosure(view)?.notas || "")) {
      closureDraft = null;
      return true;
    }
    saveClosure(view, {}, "Nota guardada.", document.activeElement?.id || "sv-close-notes");
    return true;
  }

  return false;
}

// Borradores de texto: se guardan mientras escribís, sin redibujar (no se pierde el foco).
function handleSupervisorInput(event) {
  const target = event.target;
  if (!target.closest?.(".sv-shell")) return;
  const view = getView();

  if (target.matches("[data-sv-obs]") && target.type !== "checkbox") {
    const draft = getObservationDraft(view);
    draft[target.dataset.svObs] = target.value;
    writeJSON(KEYS.observationDraft, draft);
  } else if (target.matches("[data-sv-aviso]") && target.type !== "radio") {
    const draft = getAvisoDraft(view);
    draft[target.dataset.svAviso] = target.value;
    writeJSON(KEYS.avisoDraft, draft);
  } else if (target.matches("[data-sv-req]") && target.type !== "checkbox" && target.type !== "radio") {
    const draft = getRequestDraft(view);
    draft[target.dataset.svReq] = target.value;
    writeJSON(KEYS.requestDraft, draft);
  } else if (target.matches("[data-sv-note]")) {
    noteDrafts.set(target.dataset.svNote, target.value);
    openStops.add(target.dataset.svNote);
  } else if (target.matches("[data-sv-close-notes]")) {
    closureDraft = { id: closureId(view), notas: target.value };
    const summary = document.getElementById("sv-close-summary");
    if (summary) summary.value = closureSummary(view);
  }
}

function handleSupervisorSubmit(event) {
  const form = event.target;
  if (!form.closest?.(".sv-shell")) return;
  if (form.matches?.("[data-sv-obs-form]")) {
    event.preventDefault();
    saveObservation(form);
  } else if (form.matches?.("[data-sv-aviso-form]")) {
    event.preventDefault();
    saveAviso(form);
  } else if (form.matches?.("[data-sv-request-form]")) {
    event.preventDefault();
    saveRequest(form);
  }
}

// Enter en la nota la guarda; Escape cierra la hoja; Tab no se escapa de la hoja abierta.
function handleSupervisorKeydown(event) {
  const target = event.target;
  if (event.key === "Escape" && anySheetOpen()) {
    event.preventDefault();
    closeSheets();
    return;
  }
  if (event.key === "Tab" && anySheetOpen()) {
    const sheet = document.querySelector(".sv-shell .sv-sheet");
    const focusables = [...sheet.querySelectorAll("button, input, select, textarea, summary, a[href]")].filter(
      (element) => !element.disabled && element.getClientRects().length && !(element.type === "radio" && !element.checked && sheet.querySelector(`input[name="${element.name}"]:checked`)),
    );
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
    return;
  }
  if (event.key !== "Enter" || !target.matches?.(".sv-shell [data-sv-note]")) return;
  event.preventDefault();
  const button = target.closest(".sv-note-row")?.querySelector("[data-sv-note-save]");
  if (button) saveNote(button.dataset.ruta, button.dataset.svNoteSave, target.id);
}

// El evento toggle de <details> no burbujea: se escucha en captura para recordar qué está abierto.
function handleSupervisorToggle(event) {
  const details = event.target;
  if (!details.matches?.("[data-sv-fold]")) return;
  const folds = readJSON(KEYS.folds, {});
  if (folds[details.dataset.svFold] === details.open) return;
  folds[details.dataset.svFold] = details.open;
  writeJSON(KEYS.folds, folds);
}

export function registerSupervisorEvents() {
  clickHandlers.push(handleSupervisorClick);
  changeHandlers.push(handleSupervisorChange);
  document.addEventListener("input", handleSupervisorInput);
  document.addEventListener("submit", handleSupervisorSubmit);
  document.addEventListener("keydown", handleSupervisorKeydown);
  document.addEventListener("toggle", handleSupervisorToggle, true);
  registerLive();
}
