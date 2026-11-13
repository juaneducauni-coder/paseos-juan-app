// Vista del rol Supervisor: se asegura de que se cumplan los paseos del momento.
// El supervisor NO arma rutas (eso es del coordinador): las VE y, si hace falta un cambio
// porque habló con alguien o pasó algo, se lo PIDE al coordinador (colección `solicitudes`).
//
// Arriba va "Ahora": el turno actual (hora de Argentina), cada ruta del turno con paseador,
// ayudante y perros en orden con hora prevista de retiro y estado real, atrasos y un contador
// que se recalcula cada minuto. Después: avisos por barrio, seguridad, pedidos de cambio,
// observaciones de conducta y cierre del turno.
//
// Datos compartidos (src/api/client.js, contrato en docs/datos-compartidos.md):
// - Ruta efectiva = `rutas` del día si existe; si no, `plantillas` del día de la semana;
//   si el servidor no tiene ninguna, la planilla RPJ (plantillasDesdePlanilla) como respaldo.
// - paseos: el MISMO registro por perro, día y turno que marca el paseador.
// - checklists e incidentes: los carga el equipo en la calle (acá se leen).
// - avisos, solicitudes, observaciones y cierres: los carga el supervisor.
// En localStorage quedan solo comodidades de este dispositivo: turno elegido, secciones
// abiertas y borradores sin guardar.
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
import { session, registros, onDataChange, hoyAR } from "../api/client.js";

const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SHIFT_KEYS = ["manana", "tarde"];
const FORBIDDEN_LABELS = /(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i;
// Un número largo parece un teléfono: no va en avisos ni pedidos (privacidad).
const PHONE_LIKE = /(\d[\s.-]?){8,}/;
// Tolerancias del control en vivo (definidas por Juan): retiro +10 min, paseo +15 min.
const PICKUP_GRACE = 10;
const DELIVERY_GRACE = 15;
// Colecciones compartidas que usa esta página.
const COLS = ["paseos", "checklists", "incidentes", "plantillas", "rutas", "avisos", "solicitudes", "observaciones", "cierres"];
// Las observaciones se muestran de los últimos 7 días (pueden cargarse con fecha anterior).
const OBS_DAYS = 7;
// Pedidos de cambio: los de hoy en adelante y los de los 2 días anteriores.
const REQUEST_DAYS_BACK = 2;
const ROLE_LABELS = { admin: "Admin", supervisor: "Supervisor", coordinador: "Coordinación", paseador: "Paseador", ayudante: "Ayudante de paseador" };
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
}

function flashFor(area) {
  if (flash && Date.now() - flash.at > FLASH_MS) flash = null;
  return flash && flash.area === area ? flash : null;
}

function statusRegion(area) {
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
  if (now.minutes < toMinutes(shift.from)) return { label: `Arranca ${shift.from} hs`, tone: "next" };
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
  return who ? `${verb} ${who}${at ? ` a las ${at} hs` : ""}.` : "";
}

// ---------- Datos compartidos ----------

function watchOpts(col) {
  const today = hoyAR();
  if (col === "plantillas" || col === "avisos") return {};
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
  renderKeepingFocus();
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

// ---------- Rutas efectivas (las arma el coordinador; acá solo se leen) ----------

function sameDay(a, b) {
  return plain(a) === plain(b);
}

function normalizeStop(stop) {
  const dog = (stop.perroId && dogById(stop.perroId)) || (stop.perroNombre && dogByName(stop.perroNombre)) || null;
  const minutos = Number(stop.minutos) || dog?.minutes || null;
  return {
    perroId: dog?.id || stop.perroId || "",
    perroNombre: stop.perroNombre || dog?.name || PENDIENTE,
    hora: toMinutes(stop.hora) === null ? "" : String(stop.hora).slice(0, 5),
    minutos,
    nota: stop.nota || "",
    dog,
  };
}

function normalizeRoute(record, source) {
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
      return { ...base, kind: "demorada", label: `Entrega demorada ${walked - minutos} min`, tone: "danger", live: "atrasado", walked, late: true };
    }
    const label = estado === "paseando" ? "Paseando" : `Retirado${record?.horaRetiro ? ` ${record.horaRetiro}` : ""}`;
    return { ...base, kind: "curso", label, tone: "info", live: "atiempo", walked, late: pickupLate };
  }

  if (planned === null) return { ...base, kind: "sinhora", label: "Hora sin confirmar", tone: "neutral", live: "atiempo" };
  const delay = nowMinutes - planned;
  if (delay > PICKUP_GRACE) return { ...base, kind: "atrasado", label: `Atrasado ${delay} min`, tone: "danger", live: "atrasado", delay, late: true };
  if (delay >= 0) return { ...base, kind: "ahora", label: "Retirar ahora", tone: "warn", live: "atiempo", delay };
  return { ...base, kind: "espera", label: `Retira ${stop.hora}`, tone: "neutral", live: "atiempo" };
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
  return `${item.tipo || "Cambio"}${item.perroNombre ? ` · ${item.perroNombre}` : ""}${item.ruta ? ` · ${item.ruta}` : ""}`;
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

function emptyRequest(view, ruta = "", perroId = "", open = false) {
  const dog = perroId ? dogById(perroId) : null;
  return {
    fecha: view.fecha,
    shift: view.shift,
    ruta,
    perroId: dog?.id || "",
    perroNombre: dog?.name || "",
    tipo: dog ? "no sale" : "otro",
    detalle: "",
    motivo: "",
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
      action: "Usá «Registrar observación de conducta».",
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
    `Fecha: ${isoToLabel(obs.fecha)}${obs.hora ? ` · ${obs.hora} hs` : ""}`,
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
  if (status.kind === "atrasado") parts.push(`sin retiro, previsto ${stop.hora} (${status.delay} min)`);
  if (status.pickupLate) parts.push(`retiro previsto ${stop.hora}, retirado ${status.record?.horaRetiro} (+${status.pickupDelay} min)`);
  if (status.kind === "demorada") parts.push(`entrega demorada: ${status.walked} min de ${status.minutos} previstos`);
  if (status.deliveryLate) parts.push(`entrega demorada: ${status.duration} min de ${status.minutos} previstos`);
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
    `Turno: ${shift.label} (${shift.from} a ${shift.to} hs) · Supervisó: ${user.nombre || PENDIENTE}`,
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
  if (closure?.cerrado) lines.push(`Turno cerrado a las ${closure.horaCierre || timeOf(closure.actualizadoEn) || PENDIENTE} hs por ${personName(closure.actualizadoPor, closure) || PENDIENTE}.`);
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
      <a class="sv-brand" href="/supervisor" data-link aria-label="Paseos Juan, panel de supervisión">
        <span class="sv-logo" aria-hidden="true">
          <img class="sv-logo-light" src="/paseos-juan-logo.png" alt="" />
          <img class="sv-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan</strong>
          <small>Supervisión del turno</small>
        </span>
      </a>
      <div class="sv-header-end">
        <p class="sv-user">
          <strong>${esc(user.nombre || PENDIENTE)}</strong>
          <small>${esc(ROLE_LABELS[user.rol] || user.rol || "")}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${icon("logOut", "sv-icon")}
          Salir
        </button>
      </div>
    </header>
  `;
}

export function supervisorDashboard() {
  startWatching();
  const view = getView();
  lastMinute = view.now.time;
  const routeInfo = routesFor(view);
  const content = `
    <main class="sv-main" id="sv-main">
      ${SyncBar()}
      ${IncidentsPanel(view)}
      ${NowPanel(view, routeInfo)}
      ${AvisosPanel(view)}
      ${SafetyPanel(view, routeInfo.routes)}
      ${RoutesPanel(view, routeInfo)}
      ${RequestsPanel(view)}
      ${ObservationLog(view, routeDogs(routeInfo.routes))}
      ${ShiftClosure(view)}
      ${ReferencePanel()}
    </main>
  `;
  if (migrationState === "idle" && legacyPending()) setTimeout(migrateLegacy, 0);
  return content;
}

// ---------- 0. Estado de los datos compartidos ----------

function SyncBar() {
  const pending = registros.pendingCount();
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const errors = [...new Set(loadErrors.values())];
  const tone = offline || pending || errors.length ? "warn" : "ok";
  const waiting = `${pending} cambio${pending === 1 ? " espera" : "s esperan"} señal para enviarse.`;
  const text = offline
    ? `Sin señal: ves lo último guardado en este teléfono.${pending ? ` ${waiting}` : ""}`
    : pending
      ? waiting
      : errors.length
        ? `No se pudieron traer algunos datos: ${errors.join(" ")}`
        : "Datos compartidos con el equipo. Se actualizan solos.";
  return `
    <section class="sv-sync is-${tone}" aria-label="Estado de los datos">
      <p class="sv-sync-text" aria-live="polite">${icon(tone === "ok" ? "radio" : "uploadCloud", "sv-icon")} <span>${esc(text)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${statusRegion("sync")}
    </section>
  `;
}

// ---------- Incidentes del día (destacados arriba) ----------

function IncidentsPanel(view) {
  const incidents = incidentsFor(view.fecha);
  if (!incidents.length) return "";
  return `
    <section class="sv-card sv-incidents" aria-labelledby="sv-incidents-title">
      <div class="sv-section-head">
        <h2 id="sv-incidents-title" class="sv-title">${icon("alertTriangle", "sv-icon")} ${incidents.length === 1 ? "Hay 1 incidente cargado hoy" : `Hay ${incidents.length} incidentes cargados hoy`}</h2>
        <p>${incidents.length === 1 ? "Revisalo" : "Revisalos"} antes de seguir con el turno.</p>
      </div>
      <ul class="sv-incident-list">
        ${incidents.map((item) => `
          <li class="sv-incident">
            <div class="sv-saved-head">
              <strong>${esc(item.titulo || "Incidente")}</strong>
              <span>${item.hora ? `${esc(item.hora)} hs · ` : ""}${esc(incidentDogs(item))}${item.lugar ? ` · ${esc(item.lugar)}` : ""}${item.barrio ? ` · ${esc(item.barrio)}` : ""}</span>
            </div>
            ${item.riesgo || item.lesiones ? `
              <p class="sv-chips">
                ${item.riesgo ? `<span class="sv-tag is-danger">Riesgo: ${esc(item.riesgo)}</span>` : ""}
                ${item.lesiones ? `<span class="sv-tag is-warn">Lesiones: ${esc(item.lesiones)}</span>` : ""}
              </p>
            ` : ""}
            <dl class="sv-obs-detail">
              ${[["Antes", item.antes], ["Conducta", item.conducta], ["Acción", item.accion], ["Después", item.despues], ["Protocolo", item.protocolo]]
                .filter(([, value]) => value)
                .map(([label, value]) => `<div><dt>${label}</dt><dd>${esc(value)}</dd></div>`)
                .join("")}
            </dl>
            <p class="sv-source">${esc(lastMark(item, "Cargó"))}</p>
          </li>
        `).join("")}
      </ul>
    </section>
  `;
}

// ---------- 1. Ahora ----------

function TeamList(view, routes) {
  const team = teamFor(view, routes);
  const started = view.now.minutes >= toMinutes(SHIFTS[view.shift].from);
  if (!team.length) {
    return `<p class="sv-note is-info"><strong>Equipo del turno:</strong> ${PENDIENTE}. La ruta no tiene paseador asignado y nadie cargó el checklist.</p>`;
  }
  return `
    <div class="sv-team">
      <h2 class="sv-subtitle">Equipo del turno: checklist de salida</h2>
      <ul class="sv-team-list">
        ${team.map((person) => {
          const info = person.checklist ? checklistInfo(person.checklist) : null;
          const tone = !info ? (started ? "warn" : "info") : person.checklist.pendiente ? "info" : info.complete ? "ok" : "danger";
          const text = !info
            ? "Todavía no cargó el checklist."
            : info.complete
              ? "Salió con el equipo completo."
              : `Equipo incompleto${info.missing.length ? `. Falta: ${info.missing.join(", ")}` : ""}.`;
          return `
            <li class="sv-note is-${tone}">
              ${icon(info?.complete ? "checkCircle" : "alertTriangle", "sv-icon")}
              <strong>${esc(person.name)}</strong> <small>(${esc(person.roles.join(", "))})</small>:
              ${esc(text)} ${info?.at ? `<small>${esc(info.at)} hs</small>` : ""}
            </li>
          `;
        }).join("")}
      </ul>
    </div>
  `;
}

function NowPanel(view, routeInfo) {
  const shift = SHIFTS[view.shift];
  const moment = shiftMoment(view.shift, view.now);
  const user = currentUser();
  const statuses = routeInfo.routes.flatMap((route) => routeStatuses(view, route));
  const counts = countLive(statuses);
  const planned = routeInfo.routes.map((route) => route.supervisor).filter(Boolean);
  const plannedSupervisor = [...new Set(planned)].join(" y ") || shift.supervisor;

  return `
    <section class="sv-hero sv-now" aria-labelledby="sv-now-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">Ahora · ${esc(view.day)} ${view.now.label} · ${view.now.time} hs</p>
          <h1 id="sv-now-title">Turno ${shift.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${shift.from} a ${shift.to} hs
            <span class="sv-moment is-${moment.tone}">${moment.label}</span>
          </p>
          <p class="sv-source">Supervisa ${esc(user.nombre || PENDIENTE)}${plannedSupervisor && plannedSupervisor !== user.nombre ? ` · Según la ruta: ${esc(plannedSupervisor)}` : ""}.</p>
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno de hoy">
            ${SHIFT_KEYS.map((key) => `
              <button type="button" id="sv-shift-${key}" class="sv-segment-option ${view.shift === key ? "is-active" : ""}" data-sv-shift="${key}" aria-pressed="${view.shift === key}">
                ${SHIFTS[key].label}
                <small>${key === currentShiftKey(view.now) ? "Turno actual" : `${SHIFTS[key].from} a ${SHIFTS[key].to}`}</small>
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      ${view.isCurrent ? "" : `<p class="sv-note is-info">Estás mirando el turno ${shift.label.toLowerCase()} de hoy. El turno actual es el de la ${SHIFTS[currentShiftKey(view.now)].label.toLowerCase()}.</p>`}

      <div class="sv-counter" role="status" aria-live="polite" aria-label="Cumplimiento del turno">
        <p class="sv-counter-line">
          <span class="sv-count is-ok"><b>${counts.atiempo}</b> a tiempo</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count ${counts.atrasado ? "is-danger" : ""}"><b>${counts.atrasado}</b> ${counts.atrasado === 1 ? "atrasado" : "atrasados"}</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count"><b>${counts.entregado}</b> ${counts.entregado === 1 ? "entregado" : "entregados"}</span>
        </p>
        <p class="sv-source">${plural(statuses.length, "perro previsto", "perros previstos")}${counts.nosale ? ` · ${counts.nosale} no ${counts.nosale === 1 ? "sale" : "salen"}` : ""} · Atrasado: pasó la hora de retiro + ${PICKUP_GRACE} min. Entrega demorada: el paseo superó lo previsto + ${DELIVERY_GRACE} min. Se recalcula cada minuto.</p>
      </div>

      ${routeInfo.fallback ? `
        <p class="sv-note is-warn">${icon("alertCircle", "sv-icon")} <strong>Rutas tomadas de la planilla.</strong> ${routeInfo.loading ? "Cargando las rutas del coordinador…" : `El coordinador todavía no cargó en la app la ruta de ${esc(view.day.toLowerCase())} a la ${shift.label.toLowerCase()}.`} Paseador y ayudante: ${PENDIENTE}.</p>
      ` : ""}

      ${TeamList(view, routeInfo.routes)}
    </section>
  `;
}

// ---------- 2. Avisos por barrio ----------

function getAvisoDraft(view) {
  return { barrio: "", tipo: AVISO_TYPES[0], mensaje: "", vigenteHasta: view.fecha, ...readJSON(KEYS.avisoDraft, {}) };
}

function AvisosPanel(view) {
  const avisos = activeAvisos(view.fecha);
  const draft = getAvisoDraft(view);
  const open = isFoldOpen("aviso-form");
  return `
    <section class="sv-card sv-avisos" aria-labelledby="sv-avisos-title">
      <div class="sv-section-head">
        <h2 id="sv-avisos-title" class="sv-title">${icon("mapPin", "sv-icon")} Avisos por barrio vigentes</h2>
        <p>${avisos.length ? "Lo que el equipo tiene que saber hoy en cada barrio." : loaded.has("avisos") ? "No hay avisos vigentes." : "Cargando avisos…"}</p>
      </div>
      ${avisos.length ? `
        <ul class="sv-aviso-list">
          ${avisos.map((item) => `
            <li class="sv-aviso ${item.tipo === "seguridad" || item.tipo === "perro suelto" ? "is-danger" : ""}">
              <div class="sv-saved-head">
                <strong>${esc(item.barrio || PENDIENTE)}</strong>
                <span class="sv-tag ${item.tipo === "seguridad" || item.tipo === "perro suelto" ? "is-danger" : "is-warn"}">${esc(item.tipo || "otro")}</span>
              </div>
              <p>${esc(item.mensaje || "")}</p>
              <p class="sv-source">${item.vigenteHasta ? `Vigente hasta ${esc(isoToLabel(item.vigenteHasta))}` : "Vigente hoy"} · ${esc(lastMark(item, "Cargó"))}</p>
            </li>
          `).join("")}
        </ul>
      ` : ""}
      <details class="sv-more" data-sv-fold="aviso-form" ${open ? "open" : ""}>
        <summary>${icon("plus", "sv-icon")} Cargar un aviso nuevo</summary>
        <form class="sv-form" data-sv-aviso-form novalidate>
          <p class="sv-hint">Lo ve todo el equipo y marketing. Sin domicilios, teléfonos ni datos de tutores.</p>
          <div class="sv-form-grid">
            <label class="sv-field" for="sv-aviso-barrio">Barrio
              <input type="text" id="sv-aviso-barrio" data-sv-aviso="barrio" list="sv-barrios" value="${esc(draft.barrio)}" autocomplete="off" required />
              <datalist id="sv-barrios">${BARRIOS_BASE.map((name) => `<option value="${esc(name)}"></option>`).join("")}</datalist>
            </label>
            <label class="sv-field" for="sv-aviso-tipo">Tipo
              <select id="sv-aviso-tipo" data-sv-aviso="tipo">
                ${AVISO_TYPES.map((tipo) => `<option value="${tipo}" ${tipo === draft.tipo ? "selected" : ""}>${tipo[0].toUpperCase()}${tipo.slice(1)}</option>`).join("")}
              </select>
            </label>
          </div>
          <label class="sv-field" for="sv-aviso-mensaje">Qué pasa
            <span class="sv-field-hint" id="sv-aviso-mensaje-hint">Ej.: corte de calle en la entrada sur hasta las 12. Entrar por la otra puerta.</span>
            <textarea id="sv-aviso-mensaje" rows="2" data-sv-aviso="mensaje" aria-describedby="sv-aviso-mensaje-hint" required>${esc(draft.mensaje)}</textarea>
          </label>
          <label class="sv-field sv-field-short" for="sv-aviso-hasta">Vigente hasta
            <input type="date" id="sv-aviso-hasta" data-sv-aviso="vigenteHasta" value="${esc(draft.vigenteHasta)}" min="${view.fecha}" required />
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-aviso-save">${icon("send", "sv-icon")} Publicar aviso</button>
          </div>
        </form>
      </details>
      ${statusRegion("aviso")}
    </section>
  `;
}

// ---------- 3. Seguridad ----------

function SafetyPanel(view, routes) {
  if (!routes.some((route) => route.stops.length)) return "";
  const warnings = shiftWarnings(routes);
  const top = warnings.slice(0, 3);
  const rest = warnings.slice(3);
  return `
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${icon("shieldCheck", "sv-icon")} Seguridad del turno</h2>
        <p>Bozales e incompatibles primero. Máximo 3 prioridades.</p>
      </div>
      ${top.length ? `
        <ol class="sv-priorities">
          ${top.map((warning, index) => WarningCard(warning, index + 1)).join("")}
        </ol>
      ` : `<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${rest.length ? `
        <details class="sv-more" data-sv-fold="avisos-detector" ${isFoldOpen("avisos-detector") ? "open" : ""}>
          <summary>Más avisos del detector (${rest.length})</summary>
          <ul class="sv-more-list">
            ${rest.map((warning) => WarningCard(warning)).join("")}
          </ul>
        </details>
      ` : ""}
    </section>
  `;
}

function WarningCard(warning, rank) {
  return `
    <li class="sv-warning is-${warning.tone}">
      <div class="sv-warning-head">
        ${rank ? `<span class="sv-rank" aria-label="Prioridad ${rank}">${rank}</span>` : `<span class="sv-warning-icon">${icon(warning.icon, "sv-icon")}</span>`}
        <h3>${esc(warning.title)}</h3>
      </div>
      <ul class="sv-warning-lines">
        ${warning.lines.map((line) => `<li>${esc(line)}</li>`).join("")}
      </ul>
      <p class="sv-warning-action"><strong>Qué hacer:</strong> ${esc(warning.action)}</p>
      <p class="sv-source">${esc(warning.source)}</p>
    </li>
  `;
}

// ---------- 4. Rutas del turno: control en vivo ----------

function safetyChips(stop) {
  const dog = stop.dog;
  const chips = (dog?.safety || []).map((note) => {
    const tone = /no juntar/i.test(note) ? "danger" : /bozal/i.test(note) ? "warn" : "neutral";
    return `<li class="sv-chip is-${tone}">${tone === "neutral" ? esc(note) : `<b>${esc(note)}</b>`}</li>`;
  });
  if (stop.nota && !(dog?.safety || []).some((note) => plain(note).includes(plain(stop.nota)))) {
    const tone = /no juntar/i.test(stop.nota) ? "danger" : /bozal/i.test(stop.nota) ? "warn" : "info";
    chips.push(`<li class="sv-chip is-${tone}"><b>Ruta:</b> ${esc(stop.nota)}</li>`);
  }
  if (dog && dog.status !== "Activo") chips.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${esc(dog.status)}</li>`);
  if (!dog) chips.unshift(`<li class="sv-chip is-danger"><b>Sin ficha:</b> ${PENDIENTE}</li>`);
  return chips.length ? `<ul class="sv-chips" aria-label="Avisos de ${esc(stop.perroNombre)}">${chips.join("")}</ul>` : "";
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

function RoutesPanel(view, routeInfo) {
  const { routes } = routeInfo;
  if (!routes.length) {
    return `
      <section class="sv-card" aria-labelledby="sv-routes-title">
        <h2 id="sv-routes-title" class="sv-title">${icon("route", "sv-icon")} Rutas del turno</h2>
        <p class="sv-empty">${routeInfo.loading ? "Cargando rutas…" : `No hay rutas cargadas para ${esc(view.day.toLowerCase())} a la ${SHIFTS[view.shift].label.toLowerCase()} (ni en la app ni en la planilla).`}</p>
        ${RequestButton(view, "", "", "Pedir una ruta al coordinador")}
        ${RequestForm(view, "", "")}
      </section>
    `;
  }
  const byId = paseosById();
  const inRoutes = new Set(routes.flatMap((route) => route.stops.map((stop) => stop.perroId)).filter(Boolean));
  const extras = records("paseos").filter(
    (record) => record.fecha === view.fecha && String(record.id).endsWith(`_${view.shift}`) && record.perroId && !inRoutes.has(record.perroId),
  );
  return `
    <section class="sv-routes" aria-labelledby="sv-routes-title">
      <div class="sv-section-head sv-routes-head">
        <h2 id="sv-routes-title" class="sv-title">${icon("route", "sv-icon")} Rutas del turno: retiro y entrega</h2>
        <p>Las arma el coordinador. Vos controlás que se cumplan. Si hay que cambiar algo, pedíselo con «Pedir cambio al coordinador».</p>
      </div>
      ${routes.map((route) => RouteCard(view, route, byId)).join("")}
      ${extras.length ? `
        <div class="sv-card">
          <h3 class="sv-subtitle">Marcados fuera de la ruta</h3>
          <ul class="sv-extra-list">
            ${extras.map((record) => `<li class="sv-note is-info"><strong>${esc(record.perroNombre || record.perroId)}</strong>: ${esc(record.estado || "pendiente")}. ${esc(lastMark(record))}</li>`).join("")}
          </ul>
        </div>
      ` : ""}
    </section>
  `;
}

function RouteCard(view, route, byId) {
  const items = routeStatuses(view, route, byId);
  const counts = countLive(items);
  const walker = personLabel(route.paseador);
  const helper = personLabel(route.ayudante);
  const requests = requestsFor(view.fecha, view.shift).filter((item) => item.ruta === route.code && !item.perroId);
  const area = `control-${route.code}`;
  return `
    <article class="sv-card sv-route-card" aria-labelledby="sv-route-${safeId(route.code)}">
      <div class="sv-route-head">
        <div>
          <h3 id="sv-route-${safeId(route.code)}" class="sv-route-title"><span class="sv-route-code">${esc(route.code)}</span> ${plural(route.stops.length, "perro", "perros")}</h3>
          <p class="sv-route-people">
            <span>${icon("userCheck", "sv-icon")} Paseador: <strong>${esc(walker || PENDIENTE)}</strong></span>
            <span>${icon("users", "sv-icon")} Ayudante: <strong>${esc(helper || (route.source === "planilla" ? PENDIENTE : "sin ayudante"))}</strong></span>
          </p>
          <p class="sv-source">${esc(routeSourceLabel(route))}${route.record.actualizadoEn && route.source !== "planilla" ? ` · ${esc(lastMark(route.record, "Último cambio de"))}` : ""}</p>
          ${route.notas ? `<p class="sv-hint">Notas de la ruta: ${esc(route.notas)}</p>` : ""}
        </div>
        <p class="sv-route-counts">
          <span class="sv-tag is-ok">${counts.atiempo} a tiempo</span>
          <span class="sv-tag ${counts.atrasado ? "is-danger" : "is-neutral"}">${plural(counts.atrasado, "atrasado", "atrasados")}</span>
          <span class="sv-tag is-neutral">${plural(counts.entregado, "entregado", "entregados")}</span>
        </p>
      </div>
      <div class="sv-actions">
        <a class="sv-button" id="sv-wa-${safeId(route.code)}" href="https://wa.me/?text=${encodeURIComponent(whatsappText(view, route, items))}" target="_blank" rel="noopener noreferrer">
          ${icon("message", "sv-icon")} ${walker ? `Escribirle a ${esc(walker)} por WhatsApp` : "Escribir al paseador por WhatsApp"}
        </a>
        ${RequestButton(view, route.code, "", "Pedir cambio al coordinador")}
      </div>
      ${RequestBadges(requests)}
      ${RequestForm(view, route.code, "")}
      ${statusRegion(area)}
      <ol class="sv-stop-list">
        ${items.map((item) => StopRow(view, route, item)).join("")}
      </ol>
    </article>
  `;
}

function StopRow(view, route, item) {
  const { stop, id, status } = item;
  const busy = id && inFlight.has(id);
  const record = status.record;
  const domId = safeId(`${route.code}-${stop.perroId || stop.perroNombre}`);
  const marks = [
    record?.horaRetiro && status.retirado ? `Retiro ${record.horaRetiro}` : "",
    record?.horaPaseo && status.retirado ? `Paseo ${record.horaPaseo}` : "",
    record?.horaEntrega && status.kind === "entregado" ? `Entrega ${record.horaEntrega}` : "",
  ].filter(Boolean);
  const requests = requestsFor(view.fecha, view.shift).filter((req) => req.perroId && req.perroId === stop.perroId);
  const noteValue = noteDrafts.has(id) ? noteDrafts.get(id) : record?.nota || "";
  const moreOpen = openStops.has(id) || (noteDrafts.has(id) && noteDrafts.get(id) !== (record?.nota || ""));
  const extraLate = status.kind === "entregado" && status.late ? `<span class="sv-tag is-warn">Con atraso</span>` : status.kind === "curso" && status.pickupLate ? `<span class="sv-tag is-warn">Retiro +${status.pickupDelay} min</span>` : "";

  return `
    <li class="sv-stop is-${status.kind}">
      <div class="sv-stop-time">
        <strong>${esc(stop.hora || "--:--")}</strong>
        <small>${stop.minutos ? `${stop.minutos} min` : "min sin confirmar"}</small>
      </div>
      <div class="sv-stop-body">
        <div class="sv-stop-head">
          <h4>${esc(stop.perroNombre)}</h4>
          <span class="sv-state is-${status.tone}">${esc(status.label)}</span>
          ${extraLate}
        </div>
        ${safetyChips(stop)}
        ${marks.length || record ? `
          <p class="sv-source">${esc(marks.join(" · "))}${marks.length ? " · " : ""}${esc(lastMark(record))}</p>
        ` : ""}
        ${record?.nota ? `<p class="sv-stop-note"><b>Nota para el paseador:</b> ${esc(record.nota)}</p>` : ""}
        ${RequestBadges(requests)}
        ${stop.perroId ? `
          <div class="sv-stop-actions" ${busy ? `aria-busy="true"` : ""}>
            ${status.kind === "nosale" ? `
              <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${domId}" data-sv-absent="${stop.perroId}" data-ruta="${esc(route.code)}" aria-label="Deshacer: ${esc(stop.perroNombre)} sí sale">Deshacer «no sale»</button>
            ` : `
              <button type="button" class="sv-button ${status.retirado ? "is-checked" : "sv-button-primary"}" id="sv-pickup-${domId}" data-sv-pickup="${stop.perroId}" data-ruta="${esc(route.code)}" aria-pressed="${status.retirado}" aria-label="${status.retirado ? `Desmarcar retiro de ${esc(stop.perroNombre)}` : `Marcar a ${esc(stop.perroNombre)} como retirado`}">
                ${status.retirado ? `${icon("checkCircle", "sv-icon")} Retirado` : "Retirado"}
              </button>
              <button type="button" class="sv-button ${status.kind === "entregado" ? "is-checked" : ""}" id="sv-deliver-${domId}" data-sv-deliver="${stop.perroId}" data-ruta="${esc(route.code)}" aria-pressed="${status.kind === "entregado"}" ${status.retirado ? "" : "disabled"} aria-label="${status.kind === "entregado" ? `Desmarcar entrega de ${esc(stop.perroNombre)}` : `Marcar a ${esc(stop.perroNombre)} como entregado`}">
                ${status.kind === "entregado" ? `${icon("checkCircle", "sv-icon")} Entregado` : "Entregado"}
              </button>
              ${status.retirado ? "" : `<button type="button" class="sv-button sv-button-quiet" id="sv-absent-${domId}" data-sv-absent="${stop.perroId}" data-ruta="${esc(route.code)}" aria-label="${esc(stop.perroNombre)} no sale">No sale</button>`}
            `}
          </div>
          <details class="sv-stop-more" data-sv-stop-more="${id}" ${moreOpen ? "open" : ""}>
            <summary>Nota para el paseador y pedido de cambio</summary>
            <div class="sv-stop-more-body">
              <label class="sv-field" for="sv-note-${domId}">Nota para el paseador
                <span class="sv-field-hint" id="sv-note-${domId}-hint">La ve en su ruta. Sin datos de tutores.</span>
                <input type="text" id="sv-note-${domId}" data-sv-note="${id}" value="${esc(noteValue)}" maxlength="200" aria-describedby="sv-note-${domId}-hint" autocomplete="off" />
              </label>
              <div class="sv-actions">
                <button type="button" class="sv-button" id="sv-note-save-${domId}" data-sv-note-save="${stop.perroId}" data-ruta="${esc(route.code)}">Guardar nota</button>
                ${RequestButton(view, route.code, stop.perroId, "Pedir cambio al coordinador")}
              </div>
            </div>
          </details>
          ${RequestForm(view, route.code, stop.perroId)}
        ` : `<p class="sv-hint">Sin ficha en el registro de perros: no se puede marcar desde acá.</p>`}
      </div>
    </li>
  `;
}

// ---------- 5. Pedidos de cambio al coordinador ----------

function RequestButton(view, ruta, perroId, label) {
  const domId = safeId(`sv-req-open-${ruta || "turno"}-${perroId || "ruta"}`);
  return `<button type="button" class="sv-button sv-button-quiet" id="${domId}" data-sv-request-open data-ruta="${esc(ruta)}" data-dog="${esc(perroId)}">${icon("send", "sv-icon")} ${esc(label)}</button>`;
}

function RequestBadges(requests) {
  if (!requests.length) return "";
  return `
    <ul class="sv-request-badges">
      ${requests.map((item) => {
        const state = REQUEST_STATES[item.estado] || REQUEST_STATES.pendiente;
        return `<li class="sv-tag is-${state.tone}">Pedido «${esc(item.tipo || "cambio")}»: ${state.label}${item.pendiente ? " (sin enviar)" : ""}</li>`;
      }).join("")}
    </ul>
  `;
}

function RequestForm(view, ruta, perroId) {
  const draft = getRequestDraft(view);
  if (!draft.open || draft.ruta !== ruta || (draft.perroId || "") !== (perroId || "")) return "";
  const target = `${ruta ? `Ruta ${ruta}` : `Turno ${SHIFTS[view.shift].label.toLowerCase()}`}${draft.perroNombre ? ` · ${draft.perroNombre}` : ""}`;
  return `
    <form class="sv-form sv-request-form" data-sv-request-form novalidate aria-labelledby="sv-req-title">
      <h4 id="sv-req-title">Pedir cambio al coordinador · ${esc(target)}</h4>
      <p class="sv-hint">El coordinador lo aplica en la ruta y te responde. Hoy, ${esc(view.fechaLabel)}.</p>
      <label class="sv-field" for="sv-req-tipo">Qué hay que cambiar
        <select id="sv-req-tipo" data-sv-req="tipo">
          ${REQUEST_TYPES.map((tipo) => `<option value="${tipo}" ${tipo === draft.tipo ? "selected" : ""}>${tipo[0].toUpperCase()}${tipo.slice(1)}</option>`).join("")}
        </select>
      </label>
      <label class="sv-field" for="sv-req-detalle">Detalle${draft.tipo === "no sale" ? " (opcional)" : ""}
        <span class="sv-field-hint" id="sv-req-detalle-hint">Ej.: retirarlo 10:30 en vez de 10:00. O: sumar a Paco a la ruta.</span>
        <textarea id="sv-req-detalle" rows="2" data-sv-req="detalle" aria-describedby="sv-req-detalle-hint">${esc(draft.detalle)}</textarea>
      </label>
      <label class="sv-field" for="sv-req-motivo">Qué pasó o con quién hablaste
        <span class="sv-field-hint" id="sv-req-motivo-hint">Ej.: hablé con la familia, hoy no está. Sin teléfonos ni domicilios.</span>
        <textarea id="sv-req-motivo" rows="2" data-sv-req="motivo" aria-describedby="sv-req-motivo-hint" required>${esc(draft.motivo)}</textarea>
      </label>
      <label class="sv-check" for="sv-req-urgente">
        <input type="checkbox" id="sv-req-urgente" data-sv-req="urgente" ${draft.urgente ? "checked" : ""} />
        <span>Urgente: afecta al turno de ahora</span>
      </label>
      <div class="sv-actions">
        <button type="submit" class="sv-button sv-button-primary" id="sv-req-save">${icon("send", "sv-icon")} Enviar pedido</button>
        <button type="button" class="sv-button" id="sv-req-cancel" data-sv-request-cancel>Cancelar</button>
      </div>
      ${statusRegion("request-form")}
    </form>
  `;
}

function RequestsPanel(view) {
  const list = myRequests(view.fecha);
  const pending = list.filter((item) => (item.estado || "pendiente") === "pendiente").length;
  const open = isFoldOpen("pedidos", true);
  return `
    <details class="sv-fold" data-sv-fold="pedidos" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("send", "sv-icon")} Mis pedidos de cambio</span>
        <span class="sv-fold-meta">${list.length ? `${pending} pendiente${pending === 1 ? "" : "s"} de ${list.length}` : loaded.has("solicitudes") ? "Sin pedidos" : "Cargando…"}</span>
      </summary>
      <div class="sv-fold-body">
        ${statusRegion("requests")}
        ${list.length ? `
          <ul class="sv-request-list">
            ${list.map((item) => {
              const state = REQUEST_STATES[item.estado] || REQUEST_STATES.pendiente;
              const answeredBy = item.actualizadoPor && item.actualizadoPor !== item.creadoPor ? lastMark(item, "Respondió") : "";
              return `
                <li class="sv-request is-${state.tone}">
                  <div class="sv-saved-head">
                    <strong>${item.urgente ? `<span class="sv-tag is-danger">Urgente</span> ` : ""}${esc(requestTitle(item))}</strong>
                    <span class="sv-state is-${state.tone}">${state.label}</span>
                  </div>
                  <p class="sv-source">${esc(isoToLabel(item.fecha))} · Turno ${esc(String(item.turno || "").toLowerCase() || PENDIENTE)} · ${item.pendiente ? "Se enviará cuando haya señal." : `Pedido a las ${esc(timeOf(item.creadoEn))} hs`}</p>
                  <dl class="sv-obs-detail">
                    ${item.detalle ? `<div><dt>Detalle</dt><dd>${esc(item.detalle)}</dd></div>` : ""}
                    <div><dt>Motivo</dt><dd>${esc(item.motivo || PENDIENTE)}</dd></div>
                    <div><dt>Respuesta del coordinador</dt><dd>${esc(item.respuesta || ((item.estado || "pendiente") === "pendiente" ? "Todavía no respondió." : "Sin comentario."))}</dd></div>
                  </dl>
                  ${answeredBy ? `<p class="sv-source">${esc(answeredBy)}</p>` : ""}
                </li>
              `;
            }).join("")}
          </ul>
        ` : `<p class="sv-empty">Todavía no pediste cambios. Usá «Pedir cambio al coordinador» en una ruta o en un perro.</p>`}
      </div>
    </details>
  `;
}

// ---------- 6. Observaciones de conducta ----------

function ObservationLog(view, dogs) {
  const open = isFoldOpen("observaciones");
  const draft = getObservationDraft(view);
  const saved = getObservations();
  const shiftIds = new Set(dogs.map((dog) => dog.id));
  const others = REAL_DOGS.filter((dog) => !shiftIds.has(dog.id));

  return `
    <details class="sv-fold" data-sv-fold="observaciones" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("eye", "sv-icon")} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${saved.length ? `${saved.length} en ${OBS_DAYS} días` : "Sin registros"}</span>
      </summary>
      <div class="sv-fold-body">
        <p class="sv-note is-info">Describí lo que se vio y se oyó, no lo que creés que siente el perro. No uses etiquetas como «agresivo», «malo» o «dominante». Sin datos de tutores.</p>
        <form class="sv-obs-form" data-sv-obs-form novalidate>
          <div class="sv-form-grid sv-form-grid-3">
            <label class="sv-field" for="sv-obs-dog">Perro
              <select id="sv-obs-dog" data-sv-obs="dogId" required>
                <option value="">Elegí un perro</option>
                ${dogs.length ? `<optgroup label="De este turno">${dogs.map((dog) => `<option value="${dog.id}" ${draft.dogId === dog.id ? "selected" : ""}>${esc(dog.name)}</option>`).join("")}</optgroup>` : ""}
                <optgroup label="Otros perros">${others.map((dog) => `<option value="${dog.id}" ${draft.dogId === dog.id ? "selected" : ""}>${esc(dog.name)}</option>`).join("")}</optgroup>
              </select>
            </label>
            <label class="sv-field" for="sv-obs-fecha">Fecha (DD/MM/AAAA)
              <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${esc(draft.fecha)}" inputmode="numeric" placeholder="${view.now.label}" maxlength="10" autocomplete="off" required />
            </label>
            <label class="sv-field" for="sv-obs-hora">Hora (opcional)
              <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${esc(draft.hora)}" />
            </label>
          </div>
          ${OBSERVATION_FIELDS.map((field) => `
            <label class="sv-field" for="sv-obs-${field.key}">${field.label}
              <span class="sv-field-hint" id="sv-obs-${field.key}-hint">${field.hint}</span>
              ${field.type === "input"
                ? `<input type="text" id="sv-obs-${field.key}" data-sv-obs="${field.key}" value="${esc(draft[field.key])}" aria-describedby="sv-obs-${field.key}-hint" required />`
                : `<textarea id="sv-obs-${field.key}" rows="2" data-sv-obs="${field.key}" aria-describedby="sv-obs-${field.key}-hint" required>${esc(draft[field.key])}</textarea>`}
            </label>
          `).join("")}
          <label class="sv-check" for="sv-obs-seguimiento">
            <input type="checkbox" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${draft.seguimiento ? "checked" : ""} />
            <span>Requiere seguimiento (avisar a Juan)</span>
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-obs-save">${icon("checkCircle", "sv-icon")} Guardar observación</button>
          </div>
          ${statusRegion("observation")}
        </form>

        ${saved.length ? `
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${OBS_DAYS} días</h3>
          <ul class="sv-obs-list">
            ${saved.map((obs) => ObservationCard(obs)).join("")}
          </ul>
        ` : ""}
      </div>
    </details>
  `;
}

function ObservationCard(obs) {
  const confirming = pendingObservationDelete === obs.id;
  const name = obs.perroNombre || dogById(obs.perroId)?.name || PENDIENTE;
  return `
    <li class="sv-obs ${obs.seguimiento ? "needs-follow" : ""}">
      <div class="sv-saved-head">
        <strong>${esc(name)}</strong>
        <span>${esc(isoToLabel(obs.fecha))}${obs.hora ? ` · ${esc(obs.hora)} hs` : ""}${obs.lugar ? ` · ${esc(obs.lugar)}` : ""}</span>
      </div>
      ${obs.seguimiento ? `<p class="sv-tag is-warn">Requiere seguimiento</p>` : ""}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${esc(obs.estimulo || PENDIENTE)}</dd></div>
        <div><dt>Reacción</dt><dd>${esc(obs.reaccion || PENDIENTE)}</dd></div>
        <div><dt>Acción</dt><dd>${esc(obs.accion || PENDIENTE)}</dd></div>
        <div><dt>Resultado</dt><dd>${esc(obs.resultado || PENDIENTE)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${esc(observationAuthor(obs))}</p>
      <div class="sv-actions">
        ${confirming ? `
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${obs.id}" data-sv-obs-delete-ok="${obs.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${obs.id}" data-sv-obs-delete-cancel>No borrar</button>
        ` : `
          <button type="button" class="sv-button" id="sv-obs-copy-${obs.id}" data-sv-obs-copy="${obs.id}">${icon("copy", "sv-icon")} Copiar texto</button>
          ${canDelete(obs) ? `<button type="button" class="sv-button" id="sv-obs-del-${obs.id}" data-sv-obs-delete="${obs.id}">Borrar</button>` : ""}
        `}
      </div>
    </li>
  `;
}

// ---------- 7. Cierre del turno ----------

function ShiftClosure(view) {
  const open = isFoldOpen("cierre");
  const closure = getClosure(view);
  const summary = closureSummary(view);
  const closedAt = closure?.cerrado ? closure.horaCierre || timeOf(closure.actualizadoEn) : "";
  return `
    <details class="sv-fold" data-sv-fold="cierre" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("flag", "sv-icon")} Cerrar el turno ${SHIFTS[view.shift].label.toLowerCase()}</span>
        <span class="sv-fold-meta">${closure?.cerrado ? `Cerrado ${esc(closedAt)} hs` : "Abierto"}</span>
      </summary>
      <div class="sv-fold-body">
        ${closure ? `<p class="sv-source">${esc(closure.cerrado ? lastMark(closure, "Lo cerró") : lastMark(closure, "Última nota de"))}</p>` : ""}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${esc(closureNotes(view))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar (incluye el cumplimiento del horario)
          <textarea id="sv-close-summary" class="sv-summary" rows="16" readonly>${esc(summary)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${icon("copy", "sv-icon")} Copiar resumen</button>
          ${closure?.cerrado
            ? `<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`
            : `<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${icon("flag", "sv-icon")} Marcar turno cerrado</button>`}
        </div>
        ${statusRegion("closure")}
      </div>
    </details>
  `;
}

// ---------- 8. Referencias ----------

function ReferencePanel() {
  const open = isFoldOpen("referencias");
  return `
    <details class="sv-fold" data-sv-fold="referencias" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("help", "sv-icon")} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(CATEGORIES).map(([name, text]) => `
            <div class="is-${name === "SIN EVALUAR" ? "none" : name.toLowerCase()}"><dt>${name}</dt><dd>${text}</dd></div>
          `).join("")}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas y horarios: los arma el coordinador (plantilla semanal y cambios del día). Respaldo: ${BUSINESS_INFO.officialSources.routes}, leída el ${DATA_UPDATED}.</li>
          <li>Perros: ${BUSINESS_INFO.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador. Incidentes y checklist los carga el equipo en la calle.</li>
          <li>Avisos por barrio, pedidos de cambio, observaciones y cierres se comparten con el equipo según permisos.</li>
        </ul>
      </div>
    </details>
  `;
}

// ---------- Eventos ----------

function rerender(focusId) {
  if (!focusId) return renderKeepingFocus();
  syncFolds();
  render();
  if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
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
async function markWalk(code, dogId, action, focusId) {
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
  let changes = null;
  let text = "";
  let tone = "ok";

  if (action === "retiro") {
    if (status.retirado) {
      changes = { estado: "pendiente", ...clearTimes };
      text = `${name}: retiro desmarcado.`;
      tone = "info";
    } else {
      changes = { estado: "retirado", horaRetiro: hora };
      const delay = status.planned !== null ? view.now.minutes - status.planned : 0;
      text = `${name}: retirado a las ${hora} hs${delay > PICKUP_GRACE ? ` (${delay} min después de lo previsto)` : ""}.`;
    }
  } else if (action === "entrega") {
    if (!status.retirado) return;
    if (status.kind === "entregado") {
      changes = { estado: record?.horaPaseo ? "paseando" : "retirado", horaEntrega: "" };
      text = `${name}: entrega desmarcada.`;
      tone = "info";
    } else {
      changes = { estado: "entregado", horaEntrega: hora };
      text = `${name}: entregado a las ${hora} hs.`;
    }
  } else if (action === "no-sale") {
    if (status.kind === "nosale") {
      changes = { estado: "pendiente" };
      text = `${name}: vuelve a la lista.`;
    } else {
      if (status.retirado) return;
      changes = { estado: "no-sale", ...clearTimes };
      text = `${name}: no sale hoy. Si cambia la ruta, pedíselo al coordinador.`;
    }
  }
  if (!changes) return;

  inFlight.add(id);
  await persist("paseos", paseoPayload(view, route, stop, changes), `control-${route.code}`, text, tone);
  inFlight.delete(id);
  rerender(focusId);
}

async function saveNote(code, dogId, focusId) {
  const view = getView();
  const found = findStop(view, code, dogId);
  if (!found) return;
  const { route, stop } = found;
  const id = paseoId(view.fecha, dogId, view.shift);
  const nota = String(noteDrafts.has(id) ? noteDrafts.get(id) : document.querySelector(`[data-sv-note="${id}"]`)?.value || "").trim();
  if (PHONE_LIKE.test(nota)) {
    setFlash(`control-${route.code}`, "La nota parece tener un teléfono. Sacalo: acá no van datos de tutores.", "error");
    return rerender(focusId);
  }
  const result = await persist(
    "paseos",
    paseoPayload(view, route, stop, { nota }),
    `control-${route.code}`,
    nota ? `Nota para el paseador guardada en ${stop.perroNombre}.` : `Nota de ${stop.perroNombre} borrada.`,
  );
  if (result) noteDrafts.delete(id);
  rerender(focusId);
}

async function saveAviso(form) {
  const view = getView();
  const draft = getAvisoDraft(view);
  form.querySelectorAll("[data-sv-aviso]").forEach((field) => {
    draft[field.dataset.svAviso] = field.value;
  });
  writeJSON(KEYS.avisoDraft, draft);
  const barrio = draft.barrio.trim();
  const mensaje = draft.mensaje.trim();
  if (!barrio || !mensaje) {
    setFlash("aviso", `Falta completar: ${listWithAnd([!barrio && "barrio", !mensaje && "qué pasa"].filter(Boolean))}.`, "error");
    return rerender(!barrio ? "sv-aviso-barrio" : "sv-aviso-mensaje");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.vigenteHasta) || draft.vigenteHasta < view.fecha) {
    setFlash("aviso", `Elegí hasta cuándo vale el aviso (hoy, ${view.fechaLabel}, o después).`, "error");
    return rerender("sv-aviso-hasta");
  }
  if (PHONE_LIKE.test(mensaje) || PHONE_LIKE.test(barrio)) {
    setFlash("aviso", "El aviso parece tener un teléfono. Sacalo: los avisos no llevan datos de contacto.", "error");
    return rerender("sv-aviso-mensaje");
  }
  const tipo = AVISO_TYPES.includes(draft.tipo) ? draft.tipo : "otro";
  const result = await persist(
    "avisos",
    { fecha: view.fecha, barrio, tipo, mensaje, vigenteHasta: draft.vigenteHasta, titulo: `${tipo[0].toUpperCase()}${tipo.slice(1)} · ${barrio}` },
    "aviso",
    `Aviso de ${barrio} publicado. Lo ve el equipo.`,
  );
  if (result) writeJSON(KEYS.avisoDraft, { barrio: "", tipo: AVISO_TYPES[0], mensaje: "", vigenteHasta: view.fecha });
  return rerender("sv-aviso-save");
}

async function saveRequest(form) {
  const view = getView();
  const draft = getRequestDraft(view);
  form.querySelectorAll("[data-sv-req]").forEach((field) => {
    draft[field.dataset.svReq] = field.type === "checkbox" ? field.checked : field.value;
  });
  writeJSON(KEYS.requestDraft, draft);
  const detalle = String(draft.detalle || "").trim();
  const motivo = String(draft.motivo || "").trim();
  const missing = [];
  if (!detalle && draft.tipo !== "no sale") missing.push("detalle");
  if (!motivo) missing.push("qué pasó o con quién hablaste");
  if (missing.length) {
    setFlash("request-form", `Falta completar: ${listWithAnd(missing)}.`, "error");
    return rerender(!detalle && draft.tipo !== "no sale" ? "sv-req-detalle" : "sv-req-motivo");
  }
  if (PHONE_LIKE.test(detalle) || PHONE_LIKE.test(motivo)) {
    setFlash("request-form", "El pedido parece tener un teléfono. Sacalo: acá no van datos de tutores.", "error");
    return rerender("sv-req-motivo");
  }
  const tipo = REQUEST_TYPES.includes(draft.tipo) ? draft.tipo : "otro";
  const turno = SHIFTS[view.shift].label;
  const record = {
    fecha: view.fecha,
    turno,
    ruta: draft.ruta || "",
    tipo,
    perroId: draft.perroId || "",
    perroNombre: draft.perroNombre || "",
    detalle: detalle || (tipo === "no sale" ? `${draft.perroNombre || "El perro"} no sale hoy.` : ""),
    motivo,
    urgente: Boolean(draft.urgente),
    estado: "pendiente",
    respuesta: "",
    titulo: `${draft.urgente ? "URGENTE · " : ""}${tipo[0].toUpperCase()}${tipo.slice(1)}${draft.perroNombre ? ` · ${draft.perroNombre}` : ""}${draft.ruta ? ` · ${draft.ruta}` : ""} · ${turno} ${view.fechaLabel}`,
  };
  const area = draft.ruta ? `control-${draft.ruta}` : "requests";
  const result = await persist("solicitudes", record, area, `Pedido enviado al coordinador: ${requestTitle(record)}. Lo vas a ver en «Mis pedidos de cambio».`);
  if (!result) {
    // El error se muestra en el mismo formulario y lo escrito queda.
    if (flash) flash.area = "request-form";
    return rerender("sv-req-save");
  }
  if (!result.pendiente) requestStates.set(result.id, "pendiente");
  writeJSON(KEYS.requestDraft, emptyRequest(view));
  const opener = safeId(`sv-req-open-${draft.ruta || "turno"}-${draft.perroId || "ruta"}`);
  return rerender(opener);
}

async function saveObservation(form) {
  const view = getView();
  const draft = getObservationDraft(view);
  form.querySelectorAll("[data-sv-obs]").forEach((field) => {
    draft[field.dataset.svObs] = field.type === "checkbox" ? field.checked : field.value;
  });
  writeJSON(KEYS.observationDraft, draft);

  const missing = [];
  if (!draft.dogId) missing.push("perro");
  if (!draft.fecha) missing.push("fecha");
  OBSERVATION_FIELDS.forEach((field) => {
    if (!String(draft[field.key]).trim()) missing.push(field.label.split(":")[0].toLowerCase());
  });
  const fechaIso = labelToIso(draft.fecha);
  if (!missing.length && !fechaIso) {
    setFlash("observation", `Escribí una fecha real como DD/MM/AAAA, por ejemplo ${view.now.label}.`, "error");
    return rerender("sv-obs-fecha");
  }
  if (!missing.length && fechaIso > view.now.iso) {
    setFlash("observation", "La fecha no puede ser posterior a hoy.", "error");
    return rerender("sv-obs-fecha");
  }
  if (missing.length) {
    setFlash("observation", `Falta completar: ${listWithAnd(missing)}.`, "error");
    const first = !draft.dogId ? "sv-obs-dog" : !draft.fecha ? "sv-obs-fecha" : `sv-obs-${OBSERVATION_FIELDS.find((field) => !String(draft[field.key]).trim()).key}`;
    return rerender(first);
  }

  const labelled = OBSERVATION_FIELDS.find((field) => FORBIDDEN_LABELS.test(draft[field.key]));
  if (labelled) {
    const word = draft[labelled.key].match(FORBIDDEN_LABELS)[2];
    setFlash("observation", `En «${labelled.label.split(":")[0]}» aparece «${word}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`, "error");
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
    `Observación de ${dog?.name || PENDIENTE} guardada. La ve el equipo.`,
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
    "closure",
    text,
    changes.cerrado === false ? "info" : "ok",
  );
  if (result && closureDraft?.id === id && closureDraft.notas === notas) closureDraft = null;
  rerender(focusId);
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

  const absent = target.closest("[data-sv-absent]");
  if (absent) {
    const domId = safeId(`${absent.dataset.ruta}-${absent.dataset.svAbsent}`);
    const view = getView();
    const wasAbsent = paseosById().get(paseoId(view.fecha, absent.dataset.svAbsent, view.shift))?.estado === "no-sale";
    markWalk(absent.dataset.ruta, absent.dataset.svAbsent, "no-sale", wasAbsent ? `sv-pickup-${domId}` : `sv-absent-${domId}`);
    return true;
  }

  const noteSave = target.closest("[data-sv-note-save]");
  if (noteSave) {
    saveNote(noteSave.dataset.ruta, noteSave.dataset.svNoteSave, noteSave.id);
    return true;
  }

  const requestOpen = target.closest("[data-sv-request-open]");
  if (requestOpen) {
    const view = getView();
    const current = getRequestDraft(view);
    const ruta = requestOpen.dataset.ruta || "";
    const perroId = requestOpen.dataset.dog || "";
    // Si ya había un pedido a medio escribir para lo mismo, se retoma; si no, empieza uno nuevo.
    const same = current.open && current.ruta === ruta && (current.perroId || "") === perroId;
    writeJSON(KEYS.requestDraft, same ? current : emptyRequest(view, ruta, perroId, true));
    rerender("sv-req-tipo");
    return true;
  }

  if (target.closest("[data-sv-request-cancel]")) {
    const view = getView();
    const draft = getRequestDraft(view);
    writeJSON(KEYS.requestDraft, emptyRequest(view));
    rerender(safeId(`sv-req-open-${draft.ruta || "turno"}-${draft.perroId || "ruta"}`));
    return true;
  }

  const obsCopy = target.closest("[data-sv-obs-copy]");
  if (obsCopy) {
    const obs = getObservations().find((item) => item.id === obsCopy.dataset.svObsCopy);
    if (obs) {
      copyText(observationText(obs)).then((ok) => {
        setFlash("observation", ok ? "Texto copiado. Pegalo en el registro o en WhatsApp." : "No se pudo copiar automáticamente en este navegador.", ok ? "ok" : "error");
        rerender(obsCopy.id);
      });
    }
    return true;
  }

  const obsDelete = target.closest("[data-sv-obs-delete]");
  if (obsDelete) {
    pendingObservationDelete = obsDelete.dataset.svObsDelete;
    rerender(`sv-obs-del-no-${pendingObservationDelete}`);
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
    rerender(`sv-obs-del-${id}`);
    return true;
  }

  if (target.closest("[data-sv-close-copy]")) {
    const view = getView();
    copyText(closureSummary(view), "sv-close-summary").then((ok) => {
      setFlash("closure", ok ? "Resumen copiado. Pegalo en el grupo del equipo." : "No se pudo copiar: seleccioná el texto del resumen y copialo a mano.", ok ? "ok" : "error");
      rerender("sv-close-copy");
    });
    return true;
  }

  if (target.closest("[data-sv-close-done]")) {
    saveClosure(getView(), { cerrado: true, horaCierre: timeNow() }, "Turno marcado como cerrado. No te olvides de copiar el resumen.", "sv-close-copy");
    return true;
  }

  if (target.closest("[data-sv-close-reopen]")) {
    saveClosure(getView(), { cerrado: false, horaCierre: "" }, "Turno reabierto.", "sv-close-done");
    return true;
  }

  return false;
}

function handleSupervisorChange(event) {
  const target = event.target;
  if (!target.closest?.(".sv-shell")) return false;
  const view = getView();

  if (target.matches("[data-sv-obs]")) {
    const draft = getObservationDraft(view);
    draft[target.dataset.svObs] = target.type === "checkbox" ? target.checked : target.value;
    writeJSON(KEYS.observationDraft, draft);
    return true;
  }

  if (target.matches("[data-sv-aviso]")) {
    const draft = getAvisoDraft(view);
    draft[target.dataset.svAviso] = target.value;
    writeJSON(KEYS.avisoDraft, draft);
    return true;
  }

  if (target.matches("[data-sv-req]")) {
    const draft = getRequestDraft(view);
    draft[target.dataset.svReq] = target.type === "checkbox" ? target.checked : target.value;
    writeJSON(KEYS.requestDraft, draft);
    // El tipo cambia si el detalle es obligatorio.
    if (target.tagName === "SELECT") rerender(target.id);
    return true;
  }

  // Las notas del cierre se guardan en el servidor al salir del campo (no en cada tecla).
  if (target.matches("[data-sv-close-notes]")) {
    closureDraft = { id: closureId(view), notas: target.value };
    if (target.value === (getClosure(view)?.notas || "")) {
      closureDraft = null;
      return true;
    }
    saveClosure(view, {}, "Notas del cierre guardadas.");
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
  } else if (target.matches("[data-sv-aviso]")) {
    const draft = getAvisoDraft(view);
    draft[target.dataset.svAviso] = target.value;
    writeJSON(KEYS.avisoDraft, draft);
  } else if (target.matches("[data-sv-req]") && target.type !== "checkbox") {
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

// Enter en la nota para el paseador la guarda (sin enviar ningún formulario).
function handleSupervisorKeydown(event) {
  const target = event.target;
  if (event.key !== "Enter" || !target.matches?.(".sv-shell [data-sv-note]")) return;
  event.preventDefault();
  const button = target.closest(".sv-stop-more-body")?.querySelector("[data-sv-note-save]");
  if (button) saveNote(button.dataset.ruta, button.dataset.svNoteSave, target.id);
}

// El evento toggle de <details> no burbujea: se escucha en captura para recordar qué está abierto.
function handleSupervisorToggle(event) {
  const details = event.target;
  if (details.matches?.("[data-sv-stop-more]")) {
    if (details.open) openStops.add(details.dataset.svStopMore);
    else openStops.delete(details.dataset.svStopMore);
    return;
  }
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
