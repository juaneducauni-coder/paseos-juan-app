// Vista del rol Supervisor: Juan (turno mañana) y Nicolás (turno tarde).
// Arriba va lo del turno que se está mirando (por defecto, el turno actual en Argentina):
// incidentes del día (si hay), seguridad, perros y control de retiro y entrega. El resto
// (armado de rutas, observaciones de conducta, cierre del turno y referencias) queda en
// secciones plegables.
//
// Los datos del trabajo son compartidos (src/api/client.js, contrato en docs/datos-compartidos.md):
// - paseos: el MISMO registro por perro, día y turno que marca el paseador desde su celular.
// - rutas, observaciones y cierres: lo que carga el supervisor.
// - incidentes y checklists: lo que carga el paseador (acá solo se leen).
// En localStorage quedan solo comodidades de este dispositivo: día y turno elegidos, secciones
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
  dogsForShift,
} from "../data/realData.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";
import { session, registros, onDataChange, hoyAR } from "../api/client.js";

const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SHIFT_KEYS = ["manana", "tarde"];
const WALKER_OPTIONS = ["Paseador asignado", "Sebastián"];
const FORBIDDEN_LABELS = /(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i;
// Colecciones compartidas que usa esta página.
const COLS = ["paseos", "checklists", "incidentes", "observaciones", "rutas", "cierres"];
// Las observaciones se muestran de los últimos 7 días (pueden cargarse con fecha anterior).
const OBS_DAYS = 7;
const ROLE_LABELS = { admin: "Admin", supervisor: "Supervisor", coordinador: "Coordinación", paseador: "Paseador" };

// Comodidades de este dispositivo (no son datos del trabajo).
const KEYS = {
  view: "paseosJuanSupervisor_vista",
  folds: "paseosJuanSupervisor_plegado",
  routeDraft: "paseosJuanSupervisor_rutaBorrador",
  observationDraft: "paseosJuanSupervisor_observacionBorrador",
};

// Claves de la versión anterior, que guardaba todo solo en el teléfono. Se suben una vez y se borran.
const LEGACY = {
  routes: "paseosJuanSupervisor_rutas",
  observations: "paseosJuanSupervisor_observaciones",
  closure: "paseosJuanSupervisor_cierre",
};

// Mensajes de estado que se muestran una vez (zona aria-live de cada sección).
let flash = null;
// Ruta u observación que espera confirmación para borrarse (paso doble, sin diálogos del navegador).
let pendingRouteDelete = null;
let pendingObservationDelete = null;
// Notas del cierre mientras se escriben (se guardan al salir del campo).
let closureDraft = null;
// Registros que se están guardando (evita doble toque mientras viaja el pedido).
const inFlight = new Set();
// Lo último que devolvió el servidor al guardar desde esta página, hasta que llegue en la lista.
const recent = new Map();
const saveQueues = new Map();
let liveRegistered = false;
let liveTimer = null;
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

function setFlash(area, text, tone = "ok") {
  flash = { area, text, tone };
}

function flashFor(area) {
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

function toMinutes(time) {
  const [hours, minutes] = String(time).split(":").map(Number);
  return hours * 60 + minutes;
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

function dayNameOf(iso) {
  return WEEK_DAYS[(new Date(`${iso}T12:00:00Z`).getUTCDay() + 6) % 7];
}

// Próxima fecha (hoy incluido) que cae en ese día de la semana.
function nextDateFor(dayName, fromIso) {
  const from = WEEK_DAYS.indexOf(dayNameOf(fromIso));
  const target = WEEK_DAYS.indexOf(dayName);
  return addDays(fromIso, (target - from + 7) % 7);
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

function currentShiftKey(now) {
  // Entre turnos (después de las 13:30) ya se muestra la tarde.
  return now.minutes < toMinutes("13:30") ? "manana" : "tarde";
}

// "Mañana" / "manana" / "Tarde" → "manana" / "tarde".
function shiftKeyOf(turno) {
  const text = String(turno || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  if (text.startsWith("man")) return "manana";
  if (text.startsWith("tar")) return "tarde";
  return null;
}

function shiftRoutes(shiftKey) {
  const shift = SHIFTS[shiftKey];
  return shift.routes || [shift.route];
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

// Nombre para mostrar de un usuario del servidor (el servidor guarda el nombre solo de quien lo creó).
function personName(usuario, record) {
  if (!usuario) return "";
  if (record?.creadoPor === usuario && record.creadoPorNombre) return record.creadoPorNombre;
  const user = currentUser();
  if (user.usuario === usuario && user.nombre) return user.nombre;
  return TEAM.find((person) => person.id === usuario)?.name || usuario;
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
  return { desde: col === "observaciones" ? addDays(today, -(OBS_DAYS - 1)) : today };
}

function startWatching() {
  if (!session.token()) return;
  COLS.forEach((col) => registros.watch(col, watchOpts(col)));
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

// Los guardados de un mismo registro van en fila (por ejemplo, notas del cierre y "cerrar turno"
// casi juntos): así ninguno pisa al otro.
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

function renderKeepingFocus() {
  const active = document.activeElement;
  const id = active?.id || "";
  let selection = null;
  try {
    if (active && typeof active.selectionStart === "number") selection = [active.selectionStart, active.selectionEnd];
  } catch {
    selection = null;
  }
  render();
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

// Se registra UNA sola vez (al arrancar la app).
function registerLive() {
  if (liveRegistered) return;
  liveRegistered = true;
  onDataChange((col) => {
    if (COLS.includes(col)) scheduleLive();
  });
  window.addEventListener("online", scheduleLive);
  window.addEventListener("offline", scheduleLive);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && onSupervisorPage()) refreshAll(false);
  });
}

// ---------- Migración de la versión anterior ----------

function legacyPending() {
  try {
    return Object.values(LEGACY).some((key) => localStorage.getItem(key) !== null);
  } catch {
    return false;
  }
}

function safeId(text) {
  return String(text).replace(/[^a-z0-9_.-]/gi, "-").slice(0, 100);
}

function stampFromLegacyId(id) {
  const ms = Number(String(id || "").replace(/^\D+/, ""));
  return Number.isFinite(ms) && ms > 1e12 ? new Date(ms).toISOString() : null;
}

function legacyRouteRecord(route) {
  if (!route || typeof route !== "object" || !Array.isArray(route.dogIds) || !SHIFT_KEYS.includes(route.shift)) return null;
  // La ruta se armaba para un día de la semana: va a la primera fecha de ese día desde que se guardó.
  const savedIso = labelToIso(String(route.savedAt || "").slice(0, 10)) || dateOfStamp(stampFromLegacyId(route.id)) || hoyAR();
  const fecha = WEEK_DAYS.includes(route.day) ? nextDateFor(route.day, savedIso) : savedIso;
  const turno = SHIFTS[route.shift].label;
  return {
    id: safeId(`${fecha}_${route.id || Date.now()}`),
    fecha,
    turno,
    ruta: route.route || "",
    paseador: route.walker || WALKER_OPTIONS[0],
    perros: route.dogIds.filter((id) => dogById(id)),
    conflictos: Array.isArray(route.conflicts) ? route.conflicts : [],
    medida: route.reason || "",
    notas: route.notes || "",
    titulo: `Ruta ${route.route || ""} · ${turno} · ${isoToLabel(fecha)}`,
    migrado: true,
  };
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

  const oldRoutes = readJSON(LEGACY.routes, []);
  const keepRoutes = [];
  for (const route of oldRoutes) {
    const record = legacyRouteRecord(route);
    if (!record) continue;
    const error = await uploadLegacy("rutas", record);
    if (error) {
      keepRoutes.push(route);
      failed += 1;
      lastError = error;
    } else uploaded += 1;
  }
  if (keepRoutes.length) writeJSON(LEGACY.routes, keepRoutes);
  else removeKey(LEGACY.routes);

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

function getView() {
  const now = nowInArgentina();
  const stored = readJSON(KEYS.view, {});
  const fallback = { day: now.dayName, shift: currentShiftKey(now) };
  // La selección guardada vale solo para el día de hoy: mañana arranca otra vez en el turno actual.
  const view = stored.date === now.iso ? { ...fallback, ...stored } : fallback;
  if (!WEEK_DAYS.includes(view.day)) view.day = fallback.day;
  if (!SHIFT_KEYS.includes(view.shift)) view.shift = fallback.shift;
  const isToday = view.day === now.dayName;
  // Otro día de la semana = la próxima fecha que cae ese día (para planificar).
  const fecha = isToday ? now.iso : nextDateFor(view.day, now.iso);
  return { day: view.day, shift: view.shift, now, isToday, fecha, fechaLabel: isoToLabel(fecha) };
}

function saveView(view) {
  writeJSON(KEYS.view, { date: nowInArgentina().iso, day: view.day, shift: view.shift });
}

function isFoldOpen(name, fallback = false) {
  const folds = readJSON(KEYS.folds, {});
  return typeof folds[name] === "boolean" ? folds[name] : fallback;
}

// ---------- Paseos (retiro y entrega) ----------

function paseoId(fecha, dogId, shiftKey) {
  return `${fecha}_${dogId}_${shiftKey}`;
}

function paseosById() {
  return new Map(records("paseos").map((record) => [record.id, record]));
}

function paseoState(record) {
  const estado = record?.estado || "pendiente";
  const noSale = estado === "no-sale";
  const retirado = ["retirado", "paseando", "entregado"].includes(estado);
  return {
    record,
    estado,
    noSale,
    retirado,
    paseando: estado === "paseando",
    entregado: estado === "entregado",
    horaRetiro: retirado ? record?.horaRetiro || "" : "",
    horaPaseo: retirado ? record?.horaPaseo || "" : "",
    horaEntrega: estado === "entregado" ? record?.horaEntrega || "" : "",
    nota: record?.nota || "",
  };
}

function controlFor(view, dogs) {
  const byId = paseosById();
  const control = {};
  dogs.forEach((dog) => {
    control[dog.id] = paseoState(byId.get(paseoId(view.fecha, dog.id, view.shift)));
  });
  return control;
}

// ---------- Checklists e incidentes (los carga el paseador) ----------

function checklistsFor(fecha, shiftKey) {
  return records("checklists").filter(
    (record) => record.fecha === fecha && (shiftKeyOf(record.turno) === shiftKey || String(record.id).endsWith(`_${shiftKey}`)),
  );
}

function checklistInfo(record) {
  const items = record.items && typeof record.items === "object" ? Object.entries(record.items) : [];
  const missing = items.filter(([, value]) => !value).map(([name]) => humanize(name));
  const complete = typeof record.completo === "boolean" ? record.completo : items.length > 0 && !missing.length;
  return { complete, missing, who: personName(record.actualizadoPor || record.creadoPor, record), at: timeOf(record.actualizadoEn || record.creadoEn) };
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

// ---------- Perros y riesgos ----------

function dogById(id) {
  return REAL_DOGS.find((dog) => dog.id === id);
}

function shiftDogs(day, shiftKey) {
  return dogsForShift(day, SHIFTS[shiftKey].label);
}

function usesMuzzle(dog) {
  return dog.safety.some((note) => /bozal/i.test(note));
}

function muzzleNote(dog) {
  return dog.safety.find((note) => /bozal/i.test(note)) || "";
}

function incompatiblePairs(dogs) {
  const names = new Set(dogs.map((dog) => dog.name));
  const seen = new Set();
  const pairs = [];
  dogs.forEach((dog) => {
    (dog.incompatibleWith || []).forEach((other) => {
      if (!names.has(other)) return;
      const key = [dog.name, other].sort().join("|");
      if (seen.has(key)) return;
      seen.add(key);
      pairs.push([dog.name, other]);
    });
  });
  return pairs;
}

function analyzeDogs(dogs) {
  const sizes = new Set(dogs.map((dog) => dog.size));
  return {
    pairs: incompatiblePairs(dogs),
    muzzle: dogs.filter(usesMuzzle),
    review: dogs.filter((dog) => dog.review),
    inactive: dogs.filter((dog) => dog.status !== "Activo"),
    unevaluated: dogs.filter((dog) => dog.category === "SIN EVALUAR"),
    sizeMix: sizes.has("Pequeño") && sizes.has("Grande"),
  };
}

function pairText(pairs) {
  return pairs.map(([a, b]) => `${a} con ${b}`);
}

// Avisos del turno, ordenados por gravedad. Los de seguridad (no juntar y bozal) van siempre primero.
function shiftWarnings(dogs) {
  const risk = analyzeDogs(dogs);
  const warnings = [];

  if (risk.pairs.length) {
    warnings.push({
      tone: "danger",
      icon: "alertTriangle",
      title: risk.pairs.length === 1 ? "Hay 2 perros que no pueden ir juntos" : `Hay ${risk.pairs.length} parejas que no pueden ir juntas`,
      lines: pairText(risk.pairs).map((text) => `No juntar: ${text}.`),
      action: "Armá grupos o rutas separadas antes de salir.",
      source: "Fuente: indicaciones de seguridad de la planilla RPJ.",
    });
  }

  if (risk.muzzle.length) {
    warnings.push({
      tone: "warn",
      icon: "shieldCheck",
      title: `Confirmá el bozal de ${risk.muzzle.length} perro${risk.muzzle.length === 1 ? "" : "s"}`,
      lines: risk.muzzle.map((dog) => `${dog.name}: ${muzzleNote(dog)}.`),
      action: "Que salga con el bozal puesto y revisado.",
      source: "Fuente: indicaciones de seguridad de la planilla RPJ.",
    });
  }

  if (risk.inactive.length) {
    warnings.push({
      tone: "warn",
      icon: "alertCircle",
      title: `Confirmá si ${risk.inactive.length === 1 ? `sale ${risk.inactive[0].name}` : `salen ${risk.inactive.length} perros`}`,
      lines: risk.inactive.map((dog) => `${dog.name} (${dog.status}): ${dog.review || PENDIENTE}`),
      action: "Preguntale a Juan antes de retirarlo.",
      source: "Fuente: Perros paseados (noviembre) y BASE RUTAS.",
    });
  }

  if (risk.review.length) {
    const reviewOnly = risk.review.filter((dog) => dog.status === "Activo");
    if (reviewOnly.length) {
      warnings.push({
        tone: "info",
        icon: "fileText",
        title: `${reviewOnly.length} perro${reviewOnly.length === 1 ? " tiene" : "s tienen"} datos a revisar`,
        lines: reviewOnly.map((dog) => `${dog.name}: ${dog.review}`),
        action: "No frena el paseo. Anotalo para coordinación.",
        source: `Fuente: datos cargados al ${DATA_UPDATED}.`,
      });
    }
  }

  if (risk.unevaluated.length > 1) {
    warnings.push({
      tone: "info",
      icon: "eye",
      title: `${risk.unevaluated.length} perros salen en grupo SIN EVALUAR`,
      lines: [`${CATEGORIES["SIN EVALUAR"]} Observá cómo se comportan en grupo y registrá lo que veas.`],
      action: "Usá «Registrar observación de conducta».",
      source: "Fuente: Registro maestro de perros, 14/08/2026.",
    });
  }

  return warnings;
}

// ---------- Rutas ----------

function normalizeRoute(record) {
  const conflicts = Array.isArray(record.conflictos) ? record.conflictos : record.conflictos ? [String(record.conflictos)] : [];
  return {
    id: record.id,
    record,
    route: record.ruta || PENDIENTE,
    walker: record.paseador || WALKER_OPTIONS[0],
    dogIds: Array.isArray(record.perros) ? record.perros : [],
    notes: record.notas || "",
    conflicts,
    reason: record.medida || "",
  };
}

function routesFor(fecha, shiftKey) {
  return records("rutas")
    .filter((record) => record.fecha === fecha && shiftKeyOf(record.turno) === shiftKey)
    .sort((a, b) => String(a.ruta || "").localeCompare(String(b.ruta || "")) || String(a.creadoEn || "").localeCompare(String(b.creadoEn || "")))
    .map(normalizeRoute);
}

function emptyRouteDraft(view) {
  return {
    day: view.day,
    fecha: view.fecha,
    shift: view.shift,
    route: shiftRoutes(view.shift)[0],
    walker: WALKER_OPTIONS[0],
    dogIds: [],
    notes: "",
    confirm: false,
    reason: "",
    showAll: false,
    editingId: null,
  };
}

function getRouteDraft(view) {
  const stored = readJSON(KEYS.routeDraft, {});
  // El borrador pertenece a un día y turno: si cambiás de turno, empieza uno nuevo.
  if (stored.day !== view.day || stored.shift !== view.shift || (stored.fecha && stored.fecha !== view.fecha)) return emptyRouteDraft(view);
  const draft = { ...emptyRouteDraft(view), ...stored, fecha: view.fecha };
  draft.dogIds = Array.isArray(draft.dogIds) ? draft.dogIds.filter((id) => dogById(id)) : [];
  if (!shiftRoutes(view.shift).includes(draft.route)) draft.route = shiftRoutes(view.shift)[0];
  if (!WALKER_OPTIONS.includes(draft.walker)) draft.walker = WALKER_OPTIONS[0];
  // Si la ruta que se editaba ya no existe (la borraron o era de la versión anterior), pasa a ser nueva.
  if (draft.editingId && !routesFor(view.fecha, view.shift).some((route) => route.id === draft.editingId)) draft.editingId = null;
  return draft;
}

function saveRouteDraft(draft) {
  writeJSON(KEYS.routeDraft, draft);
}

function routeCheck(draft) {
  const dogs = draft.dogIds.map(dogById).filter(Boolean);
  const risk = analyzeDogs(dogs);
  const inShift = new Set(shiftDogs(draft.day, draft.shift).map((dog) => dog.id));
  const otherRoutes = routesFor(draft.fecha, draft.shift).filter((route) => route.id !== draft.editingId);
  const conflicts = [];
  const warnings = [];

  pairText(risk.pairs).forEach((text) => conflicts.push({ tone: "danger", text: `Incompatibles: ${text}. No pueden ir en la misma ruta.` }));
  if (risk.sizeMix) {
    const small = dogs.filter((dog) => dog.size === "Pequeño").map((dog) => dog.name);
    const big = dogs.filter((dog) => dog.size === "Grande").map((dog) => dog.name);
    conflicts.push({ tone: "warn", text: `Tamaños mezclados: pequeños (${small.join(", ")}) con grandes (${big.join(", ")}).` });
  }

  risk.muzzle.forEach((dog) => warnings.push({ tone: "warn", text: `${dog.name}: ${muzzleNote(dog)}. Confirmá el bozal antes de salir.` }));
  risk.inactive.forEach((dog) => warnings.push({ tone: "warn", text: `${dog.name} figura como «${dog.status}». Confirmá con Juan antes de sumarlo.` }));
  dogs
    .filter((dog) => !inShift.has(dog.id))
    .forEach((dog) => warnings.push({ tone: "info", text: `${dog.name} no figura en BASE RUTAS para ${draft.day} a la ${SHIFTS[draft.shift].label.toLowerCase()}.` }));
  dogs.forEach((dog) => {
    const other = otherRoutes.find((route) => route.dogIds.includes(dog.id));
    if (other) warnings.push({ tone: "info", text: `${dog.name} ya está en la ruta ${other.route} guardada para este turno.` });
  });

  return { dogs, conflicts, warnings };
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

function closureSummary(view, dogs, closureOverride) {
  const shift = SHIFTS[view.shift];
  const control = controlFor(view, dogs);
  const closure = closureOverride || getClosure(view);
  const risk = analyzeDogs(dogs);
  const routes = routesFor(view.fecha, view.shift);
  const goingDogs = dogs.filter((dog) => !control[dog.id].noSale);
  const pickedUp = goingDogs.filter((dog) => control[dog.id].retirado);
  const delivered = goingDogs.filter((dog) => control[dog.id].entregado);
  const absent = dogs.filter((dog) => control[dog.id].noSale);
  const notDelivered = goingDogs.filter((dog) => !control[dog.id].entregado);
  const observations = getObservations().filter((obs) => obs.fecha === view.fecha && shiftKeyOf(obs.turno) === view.shift);
  const incidents = incidentsFor(view.fecha);
  const checklists = checklistsFor(view.fecha, view.shift).map(checklistInfo);
  const notes = closureNotes(view);
  const user = currentUser();

  const lines = [
    `Cierre de turno — ${BUSINESS_INFO.name}`,
    `Fecha: ${view.fechaLabel} (${view.day})`,
    `Turno: ${shift.label} (${shift.from} a ${shift.to} hs) · Supervisó: ${user.nombre || PENDIENTE}${user.nombre !== shift.supervisor ? ` (según planilla: ${shift.supervisor})` : ""}`,
    `Rutas: ${shiftRoutes(view.shift).join(" y ")}`,
    ...routes.map((route) => `- ${route.route} (${route.walker}): ${route.dogIds.map((id) => dogById(id)?.name).filter(Boolean).join(", ")}${route.conflicts.length ? ` · conflicto confirmado, medida: ${route.reason || PENDIENTE}` : ""}`),
    `Perros previstos: ${dogs.length}`,
    `Retirados: ${pickedUp.length} de ${goingDogs.length} · Entregados: ${delivered.length} de ${goingDogs.length}`,
    `No salieron: ${absent.length ? absent.map((dog) => dog.name).join(", ") : "ninguno"}`,
    `Sin entrega marcada: ${notDelivered.length ? notDelivered.map((dog) => dog.name).join(", ") : "ninguno"}`,
    `Checklist del paseador: ${checklists.length ? checklists.map((item) => `${item.who}: ${item.complete ? "equipo completo" : `incompleto${item.missing.length ? ` (falta ${item.missing.join(", ")})` : ""}`}`).join("; ") : "sin cargar"}`,
    `Incidentes del día: ${incidents.length ? incidents.map((item) => `${item.hora || "sin hora"} ${item.titulo || incidentDogs(item)}`).join("; ") : "ninguno cargado"}`,
    "Seguridad del turno:",
    `- No juntar: ${risk.pairs.length ? pairText(risk.pairs).join("; ") : "sin incompatibles en el turno"}`,
    `- Bozal: ${risk.muzzle.length ? risk.muzzle.map((dog) => dog.name).join(", ") : "nadie en este turno"}`,
    `Observaciones de conducta registradas hoy en este turno: ${observations.length}`,
    `Notas del supervisor: ${notes.trim() || "sin notas"}`,
  ];
  if (closure?.cerrado) lines.push(`Turno cerrado a las ${closure.horaCierre || timeOf(closure.actualizadoEn) || PENDIENTE} hs por ${personName(closure.actualizadoPor, closure) || PENDIENTE}.`);
  return lines.join("\n");
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
          <small>Supervisión de turno</small>
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
  const dogs = shiftDogs(view.day, view.shift);
  const content = `
    <main class="sv-main" id="sv-main">
      ${SyncBar()}
      ${IncidentsPanel(view)}
      ${ShiftPanel(view, dogs)}
      ${SafetyPanel(view, dogs)}
      ${DogControl(view, dogs)}
      ${RouteBuilder(view)}
      ${ObservationLog(view, dogs)}
      ${ShiftClosure(view, dogs)}
      ${ReferencePanel()}
    </main>
  `;
  flash = null;
  if (migrationState === "idle" && legacyPending()) setTimeout(migrateLegacy, 0);
  return content;
}

// ---------- 0. Estado de los datos compartidos ----------

function SyncBar() {
  const pending = registros.pendingCount();
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  const tone = offline || pending ? "warn" : "ok";
  const waiting = `${pending} cambio${pending === 1 ? " espera" : "s esperan"} señal para enviarse.`;
  const text = offline
    ? `Sin señal: ves lo último guardado en este teléfono.${pending ? ` ${waiting}` : ""}`
    : pending
      ? waiting
      : "Datos compartidos con el equipo. Se actualizan solos cada minuto.";
  return `
    <section class="sv-sync is-${tone}" aria-label="Estado de los datos">
      <p class="sv-sync-text">${icon(offline || pending ? "uploadCloud" : "radio", "sv-icon")} <span>${esc(text)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${statusRegion("sync")}
    </section>
  `;
}

// ---------- Incidentes del día (los carga el paseador) ----------

function IncidentsPanel(view) {
  const today = view.now.iso;
  const incidents = incidentsFor(today);
  if (!incidents.length) return "";
  return `
    <section class="sv-card sv-incidents" aria-labelledby="sv-incidents-title">
      <div class="sv-section-head">
        <h2 id="sv-incidents-title" class="sv-title">${icon("alertTriangle", "sv-icon")} ${incidents.length === 1 ? "Hay 1 incidente cargado hoy" : `Hay ${incidents.length} incidentes cargados hoy`}</h2>
        <p>${view.isToday ? "" : `Son de hoy, ${view.now.label}. `}${incidents.length === 1 ? "Revisalo" : "Revisalos"} antes de seguir con el turno.</p>
      </div>
      <ul class="sv-incident-list">
        ${incidents.map((item) => `
          <li class="sv-incident">
            <div class="sv-saved-head">
              <strong>${esc(item.titulo || "Incidente")}</strong>
              <span>${item.hora ? `${esc(item.hora)} hs · ` : ""}${esc(incidentDogs(item))}${item.lugar ? ` · ${esc(item.lugar)}` : ""}</span>
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

// ---------- 1. Panel del turno ----------

function TeamCheck(view) {
  if (!view.isToday) return "";
  const list = checklistsFor(view.fecha, view.shift);
  if (!list.length) {
    const started = view.now.minutes >= toMinutes(SHIFTS[view.shift].from);
    return `
      <div class="sv-team-check sv-note ${started ? "is-warn" : "is-info"}">
        <strong>Checklist de salida:</strong> el paseador todavía no lo cargó para este turno.
      </div>
    `;
  }
  return `
    <div class="sv-team-check">
      ${list.map((record) => {
        const info = checklistInfo(record);
        return `
          <p class="sv-note ${record.pendiente ? "is-info" : info.complete ? "is-ok" : "is-danger"}">
            ${icon(info.complete ? "checkCircle" : "alertTriangle", "sv-icon")}
            <strong>Checklist de ${esc(info.who || PENDIENTE)}:</strong>
            ${info.complete ? "salió con el equipo completo." : `equipo incompleto${info.missing.length ? `. Falta: ${esc(info.missing.join(", "))}` : ""}.`}
            ${info.at ? `<small>(${esc(info.at)} hs)</small>` : ""}
          </p>
        `;
      }).join("")}
    </div>
  `;
}

function ShiftPanel(view, dogs) {
  const shift = SHIFTS[view.shift];
  const user = currentUser();
  const moment = view.isToday ? shiftMoment(view.shift, view.now) : null;
  const otherKey = view.shift === "manana" ? "tarde" : "manana";
  const otherCount = shiftDogs(view.day, otherKey).length;
  const savedRoutes = routesFor(view.fecha, view.shift);
  const routes = shiftRoutes(view.shift);
  const activeCount = dogs.filter((dog) => dog.status === "Activo").length;

  return `
    <section class="sv-hero" aria-labelledby="sv-hero-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">${view.isToday ? `Hoy · ${esc(view.day)} ${view.now.label}` : `Planificación · ${esc(view.day)} ${view.fechaLabel}`}</p>
          <h1 id="sv-hero-title">Turno ${shift.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${shift.from} a ${shift.to} hs · Supervisa <strong>${esc(user.nombre || PENDIENTE)}</strong>
            ${moment ? `<span class="sv-moment is-${moment.tone}">${moment.label}</span>` : ""}
          </p>
          ${user.nombre !== shift.supervisor ? `<p class="sv-source">Según la planilla, este turno lo supervisa ${esc(shift.supervisor)}.</p>` : ""}
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno">
            ${SHIFT_KEYS.map((key) => `
              <button type="button" id="sv-shift-${key}" class="sv-segment-option ${view.shift === key ? "is-active" : ""}" data-sv-shift="${key}" aria-pressed="${view.shift === key}">
                ${SHIFTS[key].label}
                <small>${shiftDogs(view.day, key).length} perros</small>
              </button>
            `).join("")}
          </div>
          <label class="sv-field sv-field-inline" for="sv-day">Día
            <select id="sv-day" data-sv-day>
              ${WEEK_DAYS.map((day) => `<option value="${day}" ${day === view.day ? "selected" : ""}>${day}${day === view.now.dayName ? " (hoy)" : ""}</option>`).join("")}
            </select>
          </label>
          ${view.isToday ? "" : `<button type="button" class="sv-button sv-button-quiet" id="sv-today" data-sv-today>Volver a hoy</button>`}
        </div>
      </div>

      ${view.isToday ? "" : `
        <p class="sv-note is-info">Estás mirando ${esc(view.day)} ${view.fechaLabel} para planificar. El control de retiro y entrega se usa solo el día de hoy.</p>
      `}

      ${TeamCheck(view)}

      <dl class="sv-stats">
        <div><dt>Perros en el turno</dt><dd>${dogs.length}${activeCount !== dogs.length ? ` <small>(${activeCount} activos)</small>` : ""}</dd></div>
        <div><dt>Turno ${SHIFTS[otherKey].label.toLowerCase()}</dt><dd>${otherCount} <small>perros</small></dd></div>
      </dl>

      <ul class="sv-route-list" aria-label="Rutas del turno">
        ${routes.map((code) => {
          const saved = savedRoutes.find((route) => route.route === code);
          const count = saved ? `${saved.dogIds.length} perros (ruta armada)` : routes.length === 1 ? `${dogs.length} perros` : `Reparto: ${PENDIENTE}`;
          return `
            <li>
              <span class="sv-route-code">${code}</span>
              <span class="sv-route-walker">${icon("userCheck", "sv-icon")} ${esc(saved?.walker || WALKER_OPTIONS[0])}</span>
              <span class="sv-route-count">${count}</span>
            </li>
          `;
        }).join("")}
      </ul>
      ${routes.length > 1 && savedRoutes.length < routes.length ? `
        <p class="sv-hint">La planilla no dice qué perros van en cada ruta de la tarde: armalas en «Armar rutas del turno».</p>
      ` : ""}
    </section>
  `;
}

// ---------- 2. Seguridad y detector de riesgos ----------

function SafetyPanel(view, dogs) {
  if (!dogs.length) {
    return `
      <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
        <h2 id="sv-safety-title" class="sv-title">${icon("shieldCheck", "sv-icon")} Seguridad del turno</h2>
        <p class="sv-empty">No hay perros cargados en BASE RUTAS para ${esc(view.day)} a la ${SHIFTS[view.shift].label.toLowerCase()}.</p>
      </section>
    `;
  }

  const warnings = shiftWarnings(dogs);
  const top = warnings.slice(0, 3);
  const rest = warnings.slice(3);

  return `
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${icon("shieldCheck", "sv-icon")} Seguridad del turno</h2>
        <p>Lo primero que tenés que resolver antes de salir. Máximo 3 prioridades.</p>
      </div>
      ${top.length ? `
        <ol class="sv-priorities">
          ${top.map((warning, index) => WarningCard(warning, index + 1)).join("")}
        </ol>
      ` : `<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${rest.length ? `
        <details class="sv-more" data-sv-fold="avisos" ${isFoldOpen("avisos") ? "open" : ""}>
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

// ---------- 3. Perros del turno con control de retiro y entrega ----------

function safetyChips(dog) {
  const chips = dog.safety.map((note) => {
    const tone = /no juntar/i.test(note) ? "danger" : /bozal/i.test(note) ? "warn" : "neutral";
    return `<li class="sv-chip is-${tone}">${tone === "neutral" ? esc(note) : `<b>${esc(note)}</b>`}</li>`;
  });
  if (dog.status !== "Activo") chips.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${esc(dog.status)}</li>`);
  if (dog.review) chips.push(`<li class="sv-chip is-info"><b>Dato a revisar</b></li>`);
  if (dog.category !== "SIN EVALUAR") chips.push(`<li class="sv-chip is-neutral"><b>${esc(dog.category)}</b> · ${esc(dog.categorySource)}</li>`);
  return chips.length ? `<ul class="sv-chips" aria-label="Avisos de ${esc(dog.name)}">${chips.join("")}</ul>` : "";
}

function DogControl(view, dogs) {
  const open = isFoldOpen("perros", true);
  const control = controlFor(view, dogs);
  const going = dogs.filter((dog) => !control[dog.id].noSale);
  const picked = going.filter((dog) => control[dog.id].retirado).length;
  const delivered = going.filter((dog) => control[dog.id].entregado).length;
  const absent = dogs.length - going.length;
  const allUnevaluated = dogs.length && dogs.every((dog) => dog.category === "SIN EVALUAR");

  return `
    <details class="sv-fold" data-sv-fold="perros" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("clipboardCheck", "sv-icon")} Perros del turno: retiro y entrega</span>
        <span class="sv-fold-meta">${view.isToday ? `Retirados ${picked}/${going.length} · Entregados ${delivered}/${going.length}` : `${dogs.length} perros`}</span>
      </summary>
      <div class="sv-fold-body">
        ${dogs.length ? `
          ${view.isToday ? `
            <div class="sv-progress" aria-hidden="true"><span style="width:${going.length ? Math.round((delivered / going.length) * 100) : 0}%"></span></div>
            <p class="sv-hint">Tocá «Retirado» al levantar a cada perro y «Entregado» al dejarlo. Es el mismo registro que marca el paseador desde su celular: lo que marca uno lo ve el otro.${absent ? ` No salen hoy: ${absent}.` : ""}</p>
          ` : ""}
          ${allUnevaluated ? `<p class="sv-hint">Categoría de todos: <strong>SIN EVALUAR</strong> · Fuente: Registro maestro de perros, 14/08/2026.</p>` : ""}
          <ul class="sv-dog-list">
            ${dogs.map((dog) => DogRow(dog, control[dog.id], view)).join("")}
          </ul>
          ${statusRegion("control")}
        ` : `<p class="sv-empty">No hay perros para este día y turno.</p>`}
      </div>
    </details>
  `;
}

function DogRow(dog, state, view) {
  const isToday = view.isToday;
  const absent = state.noSale;
  const busy = inFlight.has(paseoId(view.fecha, dog.id, view.shift));
  const marks = [
    state.horaRetiro ? `Retiro ${state.horaRetiro} hs` : "",
    state.horaPaseo ? `Paseo ${state.horaPaseo} hs` : "",
    state.horaEntrega ? `Entrega ${state.horaEntrega} hs` : "",
  ].filter(Boolean);
  const meta = isToday && state.record ? `
    <div class="sv-dog-meta">
      ${state.paseando ? `<p class="sv-tag is-info">Paseando ahora</p>` : ""}
      ${marks.length ? `<p>${esc(marks.join(" · "))}</p>` : ""}
      ${state.nota ? `<p><b>Nota:</b> ${esc(state.nota)}</p>` : ""}
      <p class="sv-source">${esc(lastMark(state.record))}</p>
    </div>
  ` : "";
  return `
    <li class="sv-dog ${absent ? "is-absent" : ""} ${state.entregado ? "is-done" : ""}">
      <div class="sv-dog-info">
        <div class="sv-dog-head">
          <h3>${esc(dog.name)}</h3>
          ${isToday && !absent && !state.retirado ? `<button type="button" class="sv-link" id="sv-absent-${dog.id}" data-sv-absent="${dog.id}" aria-label="${esc(dog.name)} no sale hoy">No sale hoy</button>` : ""}
        </div>
        <p>${esc(dog.size)} · ${dog.minutes ? `${dog.minutes} min` : PENDIENTE} · ${esc(dog.plan)}</p>
        ${safetyChips(dog)}
      </div>
      ${isToday ? `
        <div class="sv-dog-actions" ${busy ? `aria-busy="true"` : ""}>
          ${absent ? `
            <p class="sv-dog-state">No sale hoy</p>
            <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${dog.id}" data-sv-absent="${dog.id}" aria-label="Deshacer: ${esc(dog.name)} sí sale hoy">Deshacer</button>
          ` : `
            <button type="button" class="sv-button ${state.retirado ? "is-checked" : "sv-button-primary"}" id="sv-pickup-${dog.id}" data-sv-pickup="${dog.id}" aria-pressed="${state.retirado}" aria-label="${state.retirado ? `Desmarcar retiro de ${esc(dog.name)}` : `Marcar a ${esc(dog.name)} como retirado`}">
              ${state.retirado ? `${icon("checkCircle", "sv-icon")} Retirado ${esc(state.horaRetiro)}` : "Retirado"}
            </button>
            <button type="button" class="sv-button ${state.entregado ? "is-checked" : ""}" id="sv-deliver-${dog.id}" data-sv-deliver="${dog.id}" aria-pressed="${state.entregado}" ${state.retirado ? "" : "disabled"} aria-label="${state.entregado ? `Desmarcar entrega de ${esc(dog.name)}` : `Marcar a ${esc(dog.name)} como entregado`}">
              ${state.entregado ? `${icon("checkCircle", "sv-icon")} Entregado ${esc(state.horaEntrega)}` : "Entregado"}
            </button>
          `}
          ${meta}
        </div>
      ` : ""}
    </li>
  `;
}

// ---------- 4. Armado de rutas ----------

function RouteBuilder(view) {
  const open = isFoldOpen("rutas");
  const draft = getRouteDraft(view);
  const check = routeCheck(draft);
  const saved = routesFor(view.fecha, view.shift);
  const shiftIds = new Set(shiftDogs(view.day, view.shift).map((dog) => dog.id));
  const candidates = draft.showAll ? REAL_DOGS : REAL_DOGS.filter((dog) => shiftIds.has(dog.id) || draft.dogIds.includes(dog.id));
  const otherRoutes = saved.filter((route) => route.id !== draft.editingId);
  const hasConflict = check.conflicts.length > 0;
  const when = `${esc(view.day)} ${view.fechaLabel} · ${SHIFTS[view.shift].label.toLowerCase()}`;

  return `
    <details class="sv-fold" data-sv-fold="rutas" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("route", "sv-icon")} Armar rutas del turno</span>
        <span class="sv-fold-meta">${saved.length ? `${saved.length} guardada${saved.length === 1 ? "" : "s"}` : "Sin rutas armadas"}</span>
      </summary>
      <div class="sv-fold-body">
        ${saved.length ? `
          <h3 class="sv-subtitle">Rutas guardadas · ${when}</h3>
          <ul class="sv-saved-routes">
            ${saved.map((route) => SavedRoute(route)).join("")}
          </ul>
        ` : ""}

        <form class="sv-builder" data-sv-route-form novalidate>
          <h3 class="sv-subtitle">${draft.editingId ? "Editar ruta" : "Nueva ruta"} · ${when}</h3>
          <div class="sv-form-grid">
            <label class="sv-field" for="sv-route-code">Ruta
              <select id="sv-route-code" data-sv-route-field="route">
                ${shiftRoutes(view.shift).map((code) => `<option ${code === draft.route ? "selected" : ""}>${code}</option>`).join("")}
              </select>
            </label>
            <label class="sv-field" for="sv-route-walker">Paseador
              <select id="sv-route-walker" data-sv-route-field="walker">
                ${WALKER_OPTIONS.map((name) => `<option ${name === draft.walker ? "selected" : ""}>${name}</option>`).join("")}
              </select>
            </label>
          </div>

          <fieldset class="sv-dog-picker">
            <legend>Perros de la ruta <span>(${draft.dogIds.length} elegidos)</span></legend>
            <label class="sv-check" for="sv-route-all">
              <input type="checkbox" id="sv-route-all" data-sv-route-all ${draft.showAll ? "checked" : ""} />
              <span>Mostrar también perros de otros días y turnos</span>
            </label>
            ${candidates.length ? `
              <ul class="sv-pick-list">
                ${candidates.map((dog) => {
                  const selected = draft.dogIds.includes(dog.id);
                  const elsewhere = otherRoutes.find((route) => route.dogIds.includes(dog.id));
                  const notes = [
                    usesMuzzle(dog) ? `<span class="sv-tag is-warn">Bozal</span>` : "",
                    dog.incompatibleWith?.length ? `<span class="sv-tag is-danger">No juntar con ${esc(listWithAnd(dog.incompatibleWith, "ni"))}</span>` : "",
                    dog.status !== "Activo" ? `<span class="sv-tag is-danger">${esc(dog.status)}</span>` : "",
                    !shiftIds.has(dog.id) ? `<span class="sv-tag is-info">Fuera de este turno</span>` : "",
                    elsewhere ? `<span class="sv-tag is-neutral">Ya en ${esc(elsewhere.route)}</span>` : "",
                  ].join("");
                  return `
                    <li>
                      <label class="sv-pick ${selected ? "is-selected" : ""}" for="sv-pick-${dog.id}">
                        <input type="checkbox" id="sv-pick-${dog.id}" data-sv-route-dog="${dog.id}" ${selected ? "checked" : ""} />
                        <span class="sv-pick-name">${esc(dog.name)} <small>${esc(dog.size)}</small></span>
                        ${notes ? `<span class="sv-pick-tags">${notes}</span>` : ""}
                      </label>
                    </li>
                  `;
                }).join("")}
              </ul>
            ` : `<p class="sv-empty">No hay perros en este turno. Marcá «Mostrar también perros de otros días y turnos».</p>`}
          </fieldset>

          ${check.dogs.length > 1 ? `
            <div class="sv-order">
              <h4>Orden de retiro</h4>
              <ol>
                ${check.dogs.map((dog, index) => `
                  <li>
                    <span><b>${index + 1}.</b> ${esc(dog.name)}</span>
                    <span class="sv-order-buttons">
                      <button type="button" class="sv-mini" id="sv-up-${dog.id}" data-sv-order="up" data-dog="${dog.id}" ${index === 0 ? "disabled" : ""} aria-label="Subir a ${esc(dog.name)}">Subir</button>
                      <button type="button" class="sv-mini" id="sv-down-${dog.id}" data-sv-order="down" data-dog="${dog.id}" ${index === check.dogs.length - 1 ? "disabled" : ""} aria-label="Bajar a ${esc(dog.name)}">Bajar</button>
                    </span>
                  </li>
                `).join("")}
              </ol>
            </div>
          ` : ""}

          <div class="sv-check-results" aria-live="polite">
            ${check.conflicts.map((item) => `<p class="sv-note is-${item.tone}">${icon("alertTriangle", "sv-icon")} ${esc(item.text)}</p>`).join("")}
            ${check.warnings.map((item) => `<p class="sv-note is-${item.tone}">${esc(item.text)}</p>`).join("")}
            ${check.dogs.length && !hasConflict && !check.warnings.length ? `<p class="sv-note is-ok">${icon("checkCircle", "sv-icon")} Sin incompatibles ni tamaños mezclados.</p>` : ""}
          </div>

          ${hasConflict ? `
            <fieldset class="sv-confirm">
              <legend>Esta ruta tiene ${check.conflicts.length === 1 ? "un conflicto" : `${check.conflicts.length} conflictos`}</legend>
              <p>Lo más seguro es cambiar los perros. Si igual la necesitás así, confirmalo y escribí la medida que vas a tomar.</p>
              <label class="sv-check" for="sv-route-confirm">
                <input type="checkbox" id="sv-route-confirm" data-sv-route-confirm ${draft.confirm ? "checked" : ""} />
                <span>Revisé el conflicto y quiero guardar la ruta igual</span>
              </label>
              <label class="sv-field" for="sv-route-reason">Medida que vas a tomar (obligatoria)
                <textarea id="sv-route-reason" rows="2" data-sv-route-field="reason" placeholder="Ej.: Pistacho va con el supervisor, separado del grupo.">${esc(draft.reason)}</textarea>
              </label>
            </fieldset>
          ` : ""}

          <label class="sv-field" for="sv-route-notes">Notas de la ruta (opcional)
            <textarea id="sv-route-notes" rows="2" data-sv-route-field="notes" placeholder="Ej.: Retirar primero a los perros con bozal.">${esc(draft.notes)}</textarea>
          </label>

          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-route-save">${icon("checkCircle", "sv-icon")} ${draft.editingId ? "Guardar cambios" : "Guardar ruta"}</button>
            <button type="button" class="sv-button" id="sv-route-reset" data-sv-route-reset>${draft.editingId ? "Cancelar edición" : "Vaciar"}</button>
          </div>
          ${statusRegion("route")}
        </form>
      </div>
    </details>
  `;
}

function SavedRoute(route) {
  const names = route.dogIds.map((id) => dogById(id)?.name).filter(Boolean);
  const confirmingDelete = pendingRouteDelete === route.id;
  const record = route.record;
  const author = record.pendiente
    ? "Se enviará cuando haya señal."
    : `Armó ${record.creadoPorNombre || PENDIENTE}${record.creadoEn ? ` a las ${timeOf(record.creadoEn)} hs` : ""}${record.actualizadoPor && record.actualizadoPor !== record.creadoPor ? ` · Cambió ${personName(record.actualizadoPor, record)} a las ${timeOf(record.actualizadoEn)} hs` : ""}.`;
  return `
    <li class="sv-saved ${route.conflicts.length ? "has-conflict" : ""}">
      <div class="sv-saved-head">
        <strong>${esc(route.route)}</strong>
        <span>${esc(route.walker)} · ${names.length} perros</span>
      </div>
      <p>${names.map((name, index) => `${index + 1}. ${esc(name)}`).join(" · ")}</p>
      ${route.conflicts.length ? `
        <div class="sv-note is-warn">
          <strong>Guardada con conflicto confirmado.</strong>
          <ul>${route.conflicts.map((text) => `<li>${esc(text)}</li>`).join("")}</ul>
          <span>Medida: ${esc(route.reason || PENDIENTE)}</span>
        </div>
      ` : ""}
      ${route.notes ? `<p class="sv-hint">Notas: ${esc(route.notes)}</p>` : ""}
      <p class="sv-source">${esc(author)}</p>
      <div class="sv-actions">
        ${confirmingDelete ? `
          <button type="button" class="sv-button sv-button-danger" id="sv-route-del-ok-${route.id}" data-sv-route-delete-ok="${route.id}">Sí, borrar ${esc(route.route)}</button>
          <button type="button" class="sv-button" id="sv-route-del-no-${route.id}" data-sv-route-delete-cancel>No borrar</button>
        ` : `
          <button type="button" class="sv-button" id="sv-route-edit-${route.id}" data-sv-route-edit="${route.id}">Editar</button>
          ${canDelete(record) ? `<button type="button" class="sv-button" id="sv-route-del-${route.id}" data-sv-route-delete="${route.id}">Borrar</button>` : ""}
        `}
      </div>
    </li>
  `;
}

// ---------- 5. Observaciones de conducta ----------

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

// ---------- 6. Cierre del turno ----------

function ShiftClosure(view, dogs) {
  const open = isFoldOpen("cierre");
  const closure = getClosure(view);

  if (!view.isToday) {
    return `
      <details class="sv-fold" data-sv-fold="cierre" ${open ? "open" : ""}>
        <summary>
          <span class="sv-fold-title">${icon("flag", "sv-icon")} Cerrar el turno</span>
          <span class="sv-fold-meta">Solo para hoy</span>
        </summary>
        <div class="sv-fold-body">
          <p class="sv-empty">El cierre se hace el mismo día del turno. Tocá «Volver a hoy».</p>
        </div>
      </details>
    `;
  }

  const summary = closureSummary(view, dogs);
  const closedAt = closure?.cerrado ? closure.horaCierre || timeOf(closure.actualizadoEn) : "";
  return `
    <details class="sv-fold" data-sv-fold="cierre" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("flag", "sv-icon")} Cerrar el turno</span>
        <span class="sv-fold-meta">${closure?.cerrado ? `Cerrado ${esc(closedAt)} hs` : "Abierto"}</span>
      </summary>
      <div class="sv-fold-body">
        ${closure ? `<p class="sv-source">${esc(closure.cerrado ? lastMark(closure, "Lo cerró") : lastMark(closure, "Última nota de"))}</p>` : ""}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${esc(closureNotes(view))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar
          <textarea id="sv-close-summary" class="sv-summary" rows="14" readonly>${esc(summary)}</textarea>
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

// ---------- 7. Referencias ----------

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
          <li>Rutas, días y turnos: ${BUSINESS_INFO.officialSources.routes}, leída el ${DATA_UPDATED}.</li>
          <li>Perros: ${BUSINESS_INFO.officialSources.dogs}.</li>
          <li>Qué perros van en PJ_1T y en PJ_2T: ${PENDIENTE}.</li>
          <li>Retiros, rutas, observaciones y cierres se comparten con el equipo (paseador, coordinación y Juan, según permisos). Incidentes y checklist los carga el paseador.</li>
        </ul>
      </div>
    </details>
  `;
}

// ---------- Eventos ----------

function rerender(focusId) {
  if (!focusId) return renderKeepingFocus();
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

// Retiro, entrega y "no sale": actualiza el MISMO registro de paseos que usa el paseador.
async function markWalk(dogId, action, focusId) {
  const view = getView();
  if (!view.isToday) return;
  const dog = dogById(dogId);
  if (!dog) return;
  const id = paseoId(view.fecha, dogId, view.shift);
  if (inFlight.has(id)) return;
  const state = paseoState(paseosById().get(id));
  const hora = timeNow();
  const clearTimes = { horaRetiro: "", horaPaseo: "", horaEntrega: "" };
  let changes = null;
  let text = "";
  let tone = "ok";

  if (action === "retiro") {
    if (state.retirado) {
      changes = { estado: "pendiente", ...clearTimes };
      text = `${dog.name}: retiro desmarcado.`;
      tone = "info";
    } else {
      changes = { estado: "retirado", horaRetiro: hora };
      text = `${dog.name}: retirado a las ${hora} hs.`;
    }
  } else if (action === "entrega") {
    if (!state.retirado) return;
    if (state.entregado) {
      changes = { estado: state.horaPaseo ? "paseando" : "retirado", horaEntrega: "" };
      text = `${dog.name}: entrega desmarcada.`;
      tone = "info";
    } else {
      changes = { estado: "entregado", horaEntrega: hora };
      text = `${dog.name}: entregado a las ${hora} hs.`;
    }
  } else if (action === "no-sale") {
    if (state.noSale) {
      changes = { estado: "pendiente" };
      text = `${dog.name}: vuelve a la lista.`;
    } else {
      if (state.retirado) return;
      changes = { estado: "no-sale", ...clearTimes };
      text = `${dog.name}: no sale hoy.`;
    }
  }
  if (!changes) return;

  inFlight.add(id);
  await persist(
    "paseos",
    { id, fecha: view.fecha, perroId: dog.id, perroNombre: dog.name, turno: SHIFTS[view.shift].label, ...changes },
    "control",
    text,
    tone,
  );
  inFlight.delete(id);
  rerender(focusId);
}

async function saveRoute() {
  const view = getView();
  const draft = getRouteDraft(view);
  const check = routeCheck(draft);

  if (!check.dogs.length) {
    setFlash("route", "Elegí al menos un perro para guardar la ruta.", "error");
    return rerender("sv-route-save");
  }
  if (check.conflicts.length && !draft.confirm) {
    setFlash("route", "La ruta tiene conflictos: marcá «Revisé el conflicto» para guardarla igual.", "error");
    return rerender("sv-route-confirm");
  }
  if (check.conflicts.length && !draft.reason.trim()) {
    setFlash("route", "Escribí qué medida vas a tomar para guardar una ruta con conflicto.", "error");
    return rerender("sv-route-reason");
  }

  const turno = SHIFTS[view.shift].label;
  const conflictos = check.conflicts.map((item) => item.text);
  const record = {
    fecha: view.fecha,
    turno,
    ruta: draft.route,
    paseador: draft.walker,
    perros: check.dogs.map((dog) => dog.id),
    conflictos,
    medida: conflictos.length ? draft.reason.trim() : "",
    notas: draft.notes.trim(),
    titulo: `Ruta ${draft.route} · ${turno} · ${view.fechaLabel}${conflictos.length ? " · con conflicto confirmado" : ""}`,
  };
  if (draft.editingId) record.id = draft.editingId;
  const result = await persist(
    "rutas",
    record,
    "route",
    `Ruta ${draft.route} guardada con ${record.perros.length} perros${conflictos.length ? " (conflicto confirmado)" : ""}. La ve el equipo.`,
  );
  if (result) saveRouteDraft(emptyRouteDraft(view));
  return rerender("sv-route-save");
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
  const next = { ...(getClosure(view) || {}), ...changes, notas, actualizadoPor: user.usuario, actualizadoEn: new Date().toISOString(), pendiente: false };
  const resumen = closureSummary(view, shiftDogs(view.day, view.shift), next);
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
    const view = getView();
    saveView({ ...view, shift: shiftButton.dataset.svShift });
    rerender(shiftButton.id);
    return true;
  }

  if (target.closest("[data-sv-today]")) {
    const now = nowInArgentina();
    saveView({ day: now.dayName, shift: currentShiftKey(now) });
    rerender("sv-day");
    return true;
  }

  const pickup = target.closest("[data-sv-pickup]");
  if (pickup) {
    markWalk(pickup.dataset.svPickup, "retiro", pickup.id);
    return true;
  }

  const deliver = target.closest("[data-sv-deliver]");
  if (deliver) {
    markWalk(deliver.dataset.svDeliver, "entrega", deliver.id);
    return true;
  }

  const absent = target.closest("[data-sv-absent]");
  if (absent) {
    const dogId = absent.dataset.svAbsent;
    const view = getView();
    const wasAbsent = paseoState(paseosById().get(paseoId(view.fecha, dogId, view.shift))).noSale;
    markWalk(dogId, "no-sale", wasAbsent ? `sv-pickup-${dogId}` : `sv-absent-${dogId}`);
    return true;
  }

  const order = target.closest("[data-sv-order]");
  if (order) {
    const view = getView();
    const draft = getRouteDraft(view);
    const ids = draft.dogIds;
    const index = ids.indexOf(order.dataset.dog);
    const swap = order.dataset.svOrder === "up" ? index - 1 : index + 1;
    if (index >= 0 && swap >= 0 && swap < ids.length) {
      [ids[index], ids[swap]] = [ids[swap], ids[index]];
      saveRouteDraft(draft);
    }
    // Si el perro llegó a un extremo, ese botón queda deshabilitado: el foco pasa al otro.
    const position = ids.indexOf(order.dataset.dog);
    const atEdge = order.dataset.svOrder === "up" ? position === 0 : position === ids.length - 1;
    rerender(atEdge ? `sv-${order.dataset.svOrder === "up" ? "down" : "up"}-${order.dataset.dog}` : order.id);
    return true;
  }

  if (target.closest("[data-sv-route-reset]")) {
    const view = getView();
    saveRouteDraft(emptyRouteDraft(view));
    setFlash("route", "Borrador vacío.", "info");
    rerender("sv-route-code");
    return true;
  }

  const routeEdit = target.closest("[data-sv-route-edit]");
  if (routeEdit) {
    const view = getView();
    const route = routesFor(view.fecha, view.shift).find((item) => item.id === routeEdit.dataset.svRouteEdit);
    if (route) {
      saveRouteDraft({
        day: view.day,
        fecha: view.fecha,
        shift: view.shift,
        route: route.route,
        walker: route.walker,
        dogIds: [...route.dogIds],
        notes: route.notes || "",
        confirm: false,
        reason: route.reason || "",
        showAll: false,
        editingId: route.id,
      });
      setFlash("route", `Editando ${route.route}. Si sigue con conflicto, vas a tener que confirmarlo de nuevo.`, "info");
    }
    rerender("sv-route-code");
    return true;
  }

  const routeDelete = target.closest("[data-sv-route-delete]");
  if (routeDelete) {
    pendingRouteDelete = routeDelete.dataset.svRouteDelete;
    rerender(`sv-route-del-no-${pendingRouteDelete}`);
    return true;
  }

  const routeDeleteOk = target.closest("[data-sv-route-delete-ok]");
  if (routeDeleteOk) {
    const id = routeDeleteOk.dataset.svRouteDeleteOk;
    const view = getView();
    const route = routesFor(view.fecha, view.shift).find((item) => item.id === id);
    pendingRouteDelete = null;
    removeRecord("rutas", id, "route", `Ruta ${route?.route || ""} borrada.`).then((ok) => {
      if (ok && getRouteDraft(view).editingId === id) saveRouteDraft(emptyRouteDraft(view));
      rerender("sv-route-code");
    });
    return true;
  }

  if (target.closest("[data-sv-route-delete-cancel]")) {
    const id = pendingRouteDelete;
    pendingRouteDelete = null;
    rerender(`sv-route-del-${id}`);
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
    const text = closureSummary(view, shiftDogs(view.day, view.shift));
    copyText(text, "sv-close-summary").then((ok) => {
      setFlash("closure", ok ? "Resumen copiado. Pegalo en el grupo del equipo." : "No se pudo copiar: seleccioná el texto del resumen y copialo a mano.", ok ? "ok" : "error");
      rerender("sv-close-copy");
    });
    return true;
  }

  if (target.closest("[data-sv-close-done]")) {
    const view = getView();
    saveClosure(view, { cerrado: true, horaCierre: timeNow() }, "Turno marcado como cerrado. No te olvides de copiar el resumen.", "sv-close-copy");
    return true;
  }

  if (target.closest("[data-sv-close-reopen]")) {
    const view = getView();
    saveClosure(view, { cerrado: false, horaCierre: "" }, "Turno reabierto.", "sv-close-done");
    return true;
  }

  return false;
}

function handleSupervisorChange(event) {
  const target = event.target;
  if (!target.closest?.(".sv-shell")) return false;

  if (target.matches("[data-sv-day]")) {
    const view = getView();
    saveView({ ...view, day: target.value });
    rerender("sv-day");
    return true;
  }

  const view = getView();

  if (target.matches("[data-sv-route-field]")) {
    const draft = getRouteDraft(view);
    draft[target.dataset.svRouteField] = target.value;
    saveRouteDraft(draft);
    // Ruta y paseador cambian el resumen; las notas se guardan sin redibujar.
    if (target.tagName === "SELECT") rerender(target.id);
    return true;
  }

  if (target.matches("[data-sv-route-all]")) {
    const draft = getRouteDraft(view);
    draft.showAll = target.checked;
    saveRouteDraft(draft);
    rerender(target.id);
    return true;
  }

  if (target.matches("[data-sv-route-dog]")) {
    const draft = getRouteDraft(view);
    const id = target.dataset.svRouteDog;
    draft.dogIds = target.checked ? [...new Set([...draft.dogIds, id])] : draft.dogIds.filter((item) => item !== id);
    // Cambiar perros invalida una confirmación anterior: hay que volver a confirmar.
    draft.confirm = false;
    saveRouteDraft(draft);
    rerender(target.id);
    return true;
  }

  if (target.matches("[data-sv-route-confirm]")) {
    const draft = getRouteDraft(view);
    draft.confirm = target.checked;
    saveRouteDraft(draft);
    return true;
  }

  if (target.matches("[data-sv-obs]")) {
    const draft = getObservationDraft(view);
    draft[target.dataset.svObs] = target.type === "checkbox" ? target.checked : target.value;
    writeJSON(KEYS.observationDraft, draft);
    return true;
  }

  // Las notas del cierre se guardan en el servidor al salir del campo (no en cada tecla).
  if (target.matches("[data-sv-close-notes]")) {
    if (!view.isToday) return true;
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

  if (target.matches("[data-sv-route-field]") && target.tagName !== "SELECT") {
    const draft = getRouteDraft(view);
    draft[target.dataset.svRouteField] = target.value;
    saveRouteDraft(draft);
  } else if (target.matches("[data-sv-obs]") && target.type !== "checkbox") {
    const draft = getObservationDraft(view);
    draft[target.dataset.svObs] = target.value;
    writeJSON(KEYS.observationDraft, draft);
  } else if (target.matches("[data-sv-close-notes]")) {
    closureDraft = { id: closureId(view), notas: target.value };
    const summary = document.getElementById("sv-close-summary");
    if (summary) summary.value = closureSummary(view, shiftDogs(view.day, view.shift));
  }
}

function handleSupervisorSubmit(event) {
  const form = event.target;
  if (form.matches?.("[data-sv-route-form]")) {
    event.preventDefault();
    saveRoute();
  } else if (form.matches?.("[data-sv-obs-form]")) {
    event.preventDefault();
    saveObservation(form);
  }
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
  document.addEventListener("toggle", handleSupervisorToggle, true);
  registerLive();
}
