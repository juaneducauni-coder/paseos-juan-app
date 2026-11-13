// Vista del rol Coordinador (definido por Juan el 13/11/2026):
// - Organiza las RUTAS Y LOS HORARIOS: plantilla semanal (`plantillas`) y cambios de un día (`rutas`).
// - Aplica los pedidos de cambio que le manda el supervisor (`solicitudes`).
// - Gestiona los CLIENTES de los paseos (`clientes`) y los pedidos (`pedidos`, incluidos los de la web).
// - AVISA lo que pasa en cada barrio (`avisos`).
// - No ve plata: nada de pagos, montos ni precios por cliente (los pagos son solo del admin).
//
// Los datos viven en el servidor (src/api/client.js, ver docs/datos-compartidos.md).
// En este dispositivo solo quedan comodidades: qué secciones están abiertas y la vista de rutas elegida.
import {
  PENDIENTE,
  DATA_UPDATED,
  BUSINESS_INFO,
  REAL_DOGS,
  REAL_PLANS,
  WEEK_DAYS,
  TEAM,
  BARRIOS_BASE,
  goesOn,
  plantillasDesdePlanilla,
  sumarMinutos,
} from "../data/realData.js";
import { session, registros, onDataChange, hoyAR } from "../api/client.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { render } from "../app.js";

/* ------------------------------------------------------------------ */
/* Almacenamiento local (solo preferencias de pantalla)                */
/* ------------------------------------------------------------------ */

// Claves de la versión anterior (todo quedaba en el dispositivo). Se suben una vez y se borran.
// La de pagos NO se toca: los pagos ahora son solo del admin y el coordinador no puede subirlos.
const LEGACY = {
  resueltos: "paseosJuan_coord_resueltos",
  pedidos: "paseosJuan_coord_pedidos",
  altas: "paseosJuan_coord_altas",
  borradores: "paseosJuan_coord_borradores",
};
const SECTIONS_KEY = "paseosJuan_coord_secciones";

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(fallback)) return Array.isArray(value) ? value : fallback;
    return value && typeof value === "object" && !Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado): vale hasta recargar.
  }
}

function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // nada
  }
}

/* ------------------------------------------------------------------ */
/* Mensajes de estado (aria-live)                                      */
/* ------------------------------------------------------------------ */

let flash = null;
let lastDeleted = null;

function setFlash(sectionKey, text, tone = "ok") {
  flash = { section: sectionKey, text, tone };
  if (tone === "error") announceError(text);
  else announce(text);
}

// Regiones aria-live persistentes (fuera de #app, para que sobrevivan al redibujado).
function liveRegion(id, role, politeness) {
  let live = document.getElementById(id);
  if (!live) {
    live = document.createElement("div");
    live.id = id;
    live.className = "coord-sr-only";
    live.setAttribute("role", role);
    live.setAttribute("aria-live", politeness);
    document.body.appendChild(live);
  }
  return live;
}

function speak(live, text) {
  live.textContent = "";
  window.setTimeout(() => {
    live.textContent = text;
  }, 40);
}

function announce(text) {
  speak(liveRegion("coord-live", "status", "polite"), text);
}

function announceError(text) {
  speak(liveRegion("coord-alerta", "alert", "assertive"), text);
}

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

const TZ = "America/Argentina/Buenos_Aires";

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// "2026-11-13" → "13/11/2026"
function fmtDate(iso) {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ""));
  return match ? `${match[3]}/${match[2]}/${match[1]}` : String(iso || "");
}

// Marca de tiempo ISO → "13/11/2026 10:15" en hora de Argentina.
function fmtStamp(isoTs) {
  const date = new Date(isoTs);
  if (!isoTs || Number.isNaN(date.getTime())) return "";
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("es-AR", { timeZone: TZ, day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute}`;
}

function isISODate(text) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(text || ""));
  if (!match) return false;
  const [, y, m, d] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function addDaysISO(iso, days) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().slice(0, 10);
}

// "2026-11-13" → "Viernes"
function dayNameISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return WEEK_DAYS[(new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7];
}

function dayLabel(iso) {
  return `${dayNameISO(iso)} ${fmtDate(iso)}`;
}

function haceDias(n) {
  return addDaysISO(hoyAR(), -n);
}

// Próximas fechas (desde hoy) que caen en ese día de la semana.
function nextDatesFor(dia, count = 6) {
  const out = [];
  const hoy = hoyAR();
  for (let i = 0; i < 70 && out.length < count; i += 1) {
    const iso = addDaysISO(hoy, i);
    if (dayNameISO(iso) === dia) out.push(iso);
  }
  return out;
}

function normalize(text) {
  return String(text || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

function slugDia(dia) {
  return normalize(dia);
}

function listJoin(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

const DAY_SHORT = { Lunes: "lun", Martes: "mar", Miércoles: "mié", Jueves: "jue", Viernes: "vie", Sábado: "sáb", Domingo: "dom" };

function daysLabel(days) {
  if (!days?.length) return "Sin días";
  const work = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  if (work.every((d) => days.includes(d))) return days.includes("Sábado") ? "Lun a sáb" : "Lun a vie";
  return days.map((d) => DAY_SHORT[d] || d).join(", ");
}

function scheduleLabel(dog) {
  const parts = SHIFT_LABELS.map((shift) => {
    const days = WEEK_DAYS.filter((day) => goesOn(dog, day, shift));
    return days.length ? `${shift.toLowerCase()}: ${daysLabel(days).toLowerCase()}` : "";
  }).filter(Boolean);
  return parts.length ? parts.join(" · ") : "Sin días en rutas";
}

// Secciones plegables y vista elegida: se recuerdan en el dispositivo.
function isOpen(key, fallback = false) {
  const state = readJSON(SECTIONS_KEY, {});
  return key in state ? Boolean(state[key]) : fallback;
}

function setOpen(key, value) {
  writeJSON(SECTIONS_KEY, { ...readJSON(SECTIONS_KEY, {}), [key]: value });
}

const openCards = new Set();

function prefersCalm() {
  return document.documentElement.dataset.motion === "calm";
}

function goTo(id, focusSelector) {
  requestAnimationFrame(() => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: prefersCalm() ? "auto" : "smooth", block: "start" });
    const focusable = focusSelector ? target.querySelector(focusSelector) : null;
    (focusable || target).focus({ preventScroll: true });
  });
}

function focusById(id) {
  requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: false }));
}

function currentUser() {
  return session.user() || { usuario: "", nombre: PENDIENTE, rol: "" };
}

function minutesOf(hora) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(hora || ""));
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

function validHora(hora) {
  return minutesOf(hora) !== null;
}

function padHora(hora) {
  const total = minutesOf(hora);
  if (total === null) return "";
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/* Perros y equipo                                                     */
/* ------------------------------------------------------------------ */

const SERVICE_DAYS = WEEK_DAYS.filter((day) => day !== "Domingo");
const SHIFT_LABELS = ["Mañana", "Tarde"];
const SHIFT_START = { Mañana: "09:00", Tarde: "14:45" };
const DOG_BY_ID = new Map(REAL_DOGS.map((dog) => [dog.id, dog]));
const DOG_BY_NAME = new Map(REAL_DOGS.map((dog) => [normalize(dog.name), dog]));
const REVIEW_DOGS = REAL_DOGS.filter((dog) => dog.review || dog.status !== "Activo");

function dogOf(stop) {
  return (stop.perroId && DOG_BY_ID.get(stop.perroId)) || DOG_BY_NAME.get(normalize(stop.perroNombre)) || null;
}

function hasMuzzle(dog) {
  return Boolean(dog?.safety?.some((note) => /bozal/i.test(note)));
}

// Nombre para mostrar de un usuario o nombre del equipo autorizado.
function personName(value) {
  if (!value) return "";
  const n = normalize(value);
  const member = TEAM.find((t) => t.id === n || normalize(t.name) === n || normalize(t.name.split(" ")[0]) === n);
  return member ? member.name : value;
}

/* ------------------------------------------------------------------ */
/* Datos compartidos: lectura, refresco y redibujado                   */
/* ------------------------------------------------------------------ */

// Colección → opciones de lectura (las que son por fecha se piden desde una fecha).
const COLS = {
  solicitudes: () => ({ desde: haceDias(14) }),
  plantillas: () => ({}),
  rutas: () => ({ desde: hoyAR() }),
  clientes: () => ({}),
  avisos: () => ({}),
  pedidos: () => ({}),
  fichas: () => ({}),
  resueltos: () => ({}),
  observaciones: () => ({ desde: haceDias(6) }),
  incidentes: () => ({ desde: haceDias(6) }),
};
const COL_NAMES = Object.keys(COLS);
const LEGACY_COLS = ["pedidos", "fichas", "resueltos"];

function cached(col) {
  return registros.cached(col, COLS[col]());
}

const loaded = new Set();
const loadErrors = new Map();
const syncing = new Map();
let dataWired = false;
let rerenderQueued = false;

// Se registra UNA sola vez: cuando llegan datos nuevos se vuelve a dibujar la página.
function wireData() {
  if (dataWired) return;
  dataWired = true;
  onDataChange((col) => {
    if (!COL_NAMES.includes(col)) return;
    loaded.add(col);
    loadErrors.delete(col);
    scheduleRerender();
  });
  window.addEventListener("online", scheduleRerender);
  window.addEventListener("offline", scheduleRerender);
}

// Pide cada colección una vez (para saber si hubo error) y la deja refrescando sola.
function ensureSync() {
  const user = session.user();
  if (!user) return;
  COL_NAMES.forEach((col) => {
    const opts = COLS[col]();
    const key = `${user.usuario}|${opts.desde || ""}`;
    const current = syncing.get(col);
    if (current?.key === key) return;
    current?.stop?.();
    const entry = { key, stop: null };
    syncing.set(col, entry);
    registros
      .list(col, opts)
      .then(() => {
        loaded.add(col);
        loadErrors.delete(col);
      })
      .catch((error) => {
        if (error.status === 401) return;
        loadErrors.set(col, error.message);
        announceError(error.message);
      })
      .finally(() => {
        if (syncing.get(col) === entry) entry.stop = registros.watch(col, opts);
        scheduleRerender();
        maybeMigrate();
      });
  });
}

function retrySync() {
  [...syncing.values()].forEach((entry) => entry.stop?.());
  syncing.clear();
  loadErrors.clear();
  ensureSync();
}

function scheduleRerender() {
  if (rerenderQueued) return;
  rerenderQueued = true;
  requestAnimationFrame(() => {
    rerenderQueued = false;
    if (!document.querySelector(".coord-shell")) return;
    rerenderKeepingState();
  });
}

// Vuelve a dibujar sin perder lo que se está escribiendo ni el foco.
function rerenderKeepingState() {
  document.querySelectorAll(".coord-shell [data-coord-form]").forEach((formEl) => {
    const form = formEl.dataset.coordForm;
    if (!clearedForms.has(form)) drafts[form] = serializeForm(formEl);
  });
  const active = document.activeElement;
  const activeId = active?.closest?.(".coord-shell") && active.id ? active.id : null;
  let selection = null;
  try {
    if (activeId && typeof active.selectionStart === "number") selection = [active.selectionStart, active.selectionEnd];
  } catch {
    selection = null;
  }
  const scrollY = window.scrollY;
  render();
  if (Math.abs(window.scrollY - scrollY) > 1) window.scrollTo(0, scrollY);
  if (activeId) {
    const again = document.getElementById(activeId);
    if (again) {
      again.focus({ preventScroll: true });
      try {
        if (selection) again.setSelectionRange(selection[0], selection[1]);
      } catch {
        // Algunos campos (select, hora, número) no tienen selección.
      }
    }
  }
}

function byNewest(a, b) {
  return String(b.creadoEn || "9999").localeCompare(String(a.creadoEn || "9999"));
}

// Borrar: admin siempre; el resto, solo lo que cargó en las últimas 24 horas.
function canDelete(record) {
  const user = session.user();
  if (!user || !record || record.pendiente || !record.creadoEn) return false;
  if (user.rol === "admin") return true;
  return record.creadoPor === user.usuario && Date.now() - Date.parse(record.creadoEn) < 24 * 3600 * 1000;
}

function whoLine(record, { web = false } = {}) {
  const parts = [];
  if (web) {
    parts.push(`Llegó por la página web${record.creadoEn ? ` el ${fmtStamp(record.creadoEn)}` : ""}`);
  } else if (record.creadoPorNombre) {
    parts.push(`Cargado por ${esc(record.creadoPorNombre)}${record.creadoEn ? ` el ${fmtStamp(record.creadoEn)}` : ""}`);
  }
  if (record.actualizadoEn && record.actualizadoEn !== record.creadoEn) {
    const quien = record.actualizadoPorNombre;
    parts.push(`Último cambio${quien ? ` de ${esc(quien)}` : ""}: ${fmtStamp(record.actualizadoEn)}`);
  }
  const pending = record.pendiente
    ? `<p class="coord-meta is-pending">${icon("clock", "coord-icon")}<span>Sin señal: se enviará cuando vuelva.</span></p>`
    : "";
  return `${parts.length ? `<p class="coord-meta">${parts.join(" · ")}</p>` : ""}${pending}`;
}

/* ------------------------------------------------------------------ */
/* Guardado                                                            */
/* ------------------------------------------------------------------ */

const busy = new Set();

async function guardar(col, data, { section: sectionKey, ok }) {
  try {
    const result = await registros.save(col, data);
    setFlash(sectionKey, result.pendiente ? `${ok} Sin señal: se enviará cuando vuelva.` : ok);
    return result;
  } catch (error) {
    setFlash(sectionKey, `No se pudo guardar: ${error.message}`, "error");
    return null;
  } finally {
    scheduleRerender();
  }
}

async function borrar(col, record, { section: sectionKey, ok, undo = true }) {
  try {
    await registros.remove(col, record.id);
    lastDeleted = undo ? { col, record, section: sectionKey } : null;
    setFlash(sectionKey, ok);
    flash.undo = undo;
    return true;
  } catch (error) {
    setFlash(sectionKey, `No se pudo borrar: ${error.message}`, "error");
    return false;
  } finally {
    scheduleRerender();
  }
}

function run(key, fn) {
  if (busy.has(key)) return;
  busy.add(key);
  Promise.resolve()
    .then(fn)
    .finally(() => busy.delete(key));
}

/* ------------------------------------------------------------------ */
/* Migración de la versión anterior (todo estaba en el dispositivo)    */
/* ------------------------------------------------------------------ */

let migrationDone = false;
let migrating = false;
let migrationNote = "";
const LEGACY_ID = /^[a-z0-9][a-z0-9_.-]{0,90}$/i;
const ESTADOS = ["nuevo", "en-curso", "resuelto"];

function legacyId(oldId) {
  return LEGACY_ID.test(String(oldId || "")) ? `ant_${String(oldId)}` : undefined;
}

function isoFromDMY(text) {
  const match = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(text || ""));
  if (!match) return null;
  const iso = `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
  return isISODate(iso) ? iso : null;
}

function legacyRecords() {
  const hoy = hoyAR();
  const out = [];
  readJSON(LEGACY.pedidos, []).forEach((old) => {
    const tipo = old.tipo || "Otro";
    out.push({
      key: LEGACY.pedidos,
      oldId: old.id,
      col: "pedidos",
      data: {
        id: legacyId(old.id),
        fecha: isoFromDMY(old.fecha) || hoy,
        tipo,
        estado: old.estado === "curso" ? "en-curso" : ESTADOS.includes(old.estado) ? old.estado : "nuevo",
        titulo: `${tipo}: ${old.perro || "sin perro indicado"}`,
        detalle: old.detalle || "",
        origen: "app",
        datos: { perro: old.perro || "", canal: old.canal || "" },
        migrado: true,
      },
    });
  });
  readJSON(LEGACY.altas, []).forEach((old) => {
    const { id, fecha, supervisor, categoria, primerPaseo, ...datos } = old;
    out.push({
      key: LEGACY.altas,
      oldId: id,
      col: "fichas",
      data: { id: legacyId(id), fecha: isoFromDMY(fecha) || hoy, perroNombre: old.nombre || PENDIENTE, datos: { ...datos, primerPaseo: "Individual" }, categoria: "SIN EVALUAR", estado: "lista", migrado: true },
    });
  });
  const enServidor = new Set(cached("resueltos").map((r) => r.perroId || r.id));
  Object.entries(readJSON(LEGACY.resueltos, {})).forEach(([dogId, date]) => {
    if (enServidor.has(dogId)) {
      out.push({ key: LEGACY.resueltos, oldId: dogId, skip: true });
      return;
    }
    const dog = DOG_BY_ID.get(dogId);
    out.push({
      key: LEGACY.resueltos,
      oldId: dogId,
      col: "resueltos",
      data: { id: dogId, perroId: dogId, perroNombre: dog?.name || dogId, resuelto: true, nota: `Marcado como resuelto el ${date} en un solo dispositivo (versión anterior de la página).`, migrado: true },
    });
  });
  return out;
}

async function maybeMigrate() {
  if (migrationDone || migrating) return;
  if (!LEGACY_COLS.every((col) => loaded.has(col))) return;
  migrating = true;
  try {
    const oldDrafts = readJSON(LEGACY.borradores, {});
    Object.entries(oldDrafts).forEach(([form, values]) => {
      if (form !== "pago" && !drafts[form]) drafts[form] = values;
    });
    removeKey(LEGACY.borradores);
    const items = legacyRecords();
    if (!items.length) {
      migrationDone = true;
      return;
    }
    const failed = new Set();
    let subidos = 0;
    let error = "";
    for (const item of items) {
      if (item.skip) continue;
      try {
        await registros.save(item.col, item.data);
        subidos += 1;
      } catch (err) {
        failed.add(`${item.key}|${item.oldId}`);
        error = err.message;
      }
    }
    [LEGACY.pedidos, LEGACY.altas].forEach((key) => {
      const left = readJSON(key, []).filter((old) => failed.has(`${key}|${old.id}`));
      if (left.length) writeJSON(key, left);
      else removeKey(key);
    });
    const leftResueltos = Object.fromEntries(Object.entries(readJSON(LEGACY.resueltos, {})).filter(([id]) => failed.has(`${LEGACY.resueltos}|${id}`)));
    if (Object.keys(leftResueltos).length) writeJSON(LEGACY.resueltos, leftResueltos);
    else removeKey(LEGACY.resueltos);
    if (subidos) {
      migrationNote = `Subimos ${subidos} ${subidos === 1 ? "registro que estaba guardado" : "registros que estaban guardados"} solo en este dispositivo.`;
      announce(migrationNote);
    }
    if (failed.size) {
      loadErrors.set("migracion", `Quedaron ${failed.size} registros de este dispositivo sin subir: ${error}`);
      announceError(loadErrors.get("migracion"));
    } else {
      migrationDone = true;
    }
  } finally {
    migrating = false;
    scheduleRerender();
  }
}

/* ------------------------------------------------------------------ */
/* Rutas: plantilla semanal, cambios del día y ruta efectiva           */
/* ------------------------------------------------------------------ */

const TURNO_ORDER = { Mañana: 0, Tarde: 1 };
const ROUTE_CODE = /^[A-Z0-9][A-Z0-9_]{1,19}$/;

function isRoute(record) {
  return record && Array.isArray(record.paradas) && record.ruta && record.dia;
}

function byRouteOrder(a, b) {
  return (TURNO_ORDER[a.turno] ?? 9) - (TURNO_ORDER[b.turno] ?? 9) || String(a.ruta).localeCompare(String(b.ruta));
}

function plantillaId(ruta, dia) {
  return `${ruta}_${slugDia(dia)}`;
}

function rutaDiaId(fecha, ruta) {
  return `${fecha}_${ruta}`;
}

function getPlantillas() {
  return cached("plantillas").filter(isRoute);
}

function getRutasDia() {
  return cached("rutas").filter((r) => isRoute(r) && r.fecha);
}

function plantillasDe(dia) {
  return getPlantillas().filter((p) => p.dia === dia).sort(byRouteOrder);
}

// Ruta efectiva de un día: el cambio del día si existe; si no, la plantilla de ese día de la semana.
function effectiveRoutes(fecha) {
  const dia = dayNameISO(fecha);
  const overrides = new Map(getRutasDia().filter((r) => r.fecha === fecha).map((r) => [r.ruta, r]));
  const out = plantillasDe(dia).map((p) => {
    const over = overrides.get(p.ruta);
    overrides.delete(p.ruta);
    return over ? { ...over, origen: "dia", plantillaId: p.id } : { ...p, origen: "plantilla", plantillaId: p.id };
  });
  overrides.forEach((r) => out.push({ ...r, origen: "dia", plantillaId: "" }));
  return out.sort(byRouteOrder);
}

function stopsSorted(route) {
  return (route.paradas || []).filter((s) => validHora(s.hora)).map((s) => s.hora).sort((a, b) => minutesOf(a) - minutesOf(b));
}

function routeSpan(route) {
  const horas = stopsSorted(route);
  if (!horas.length) return "Sin horarios";
  return horas.length === 1 ? padHora(horas[0]) : `${padHora(horas[0])} a ${padHora(horas[horas.length - 1])}`;
}

// Próxima hora libre: la última hora cargada + 15 minutos (o el inicio del turno).
function nextFreeHora(route) {
  const horas = stopsSorted(route);
  if (!horas.length) return SHIFT_START[route.turno] || "09:00";
  return sumarMinutos(padHora(horas[horas.length - 1]), 15);
}

function stopWindow(stop) {
  const start = minutesOf(stop.hora);
  if (start === null) return null;
  return [start, start + (Number(stop.minutos) || 45)];
}

function overlaps(a, b) {
  return a && b && a[0] < b[1] && b[0] < a[1];
}

// Avisos al armar una ruta. No bloquean: se marcan en rojo.
// others: las demás rutas del mismo día (para ver si un perro quedó en dos rutas a la misma hora).
function routeWarnings(route, others = []) {
  const list = [];
  const byStop = new Map();
  const add = (indices, text) => {
    list.push(text);
    indices.forEach((i) => byStop.set(i, [...(byStop.get(i) || []), text]));
  };
  const stops = (route.paradas || []).map((stop, index) => ({ stop, index, dog: dogOf(stop), win: stopWindow(stop) }));

  stops.forEach(({ stop, index, dog, win }) => {
    const name = stop.perroNombre || dog?.name || PENDIENTE;
    if (!win) add([index], `${name}: falta la hora de retiro.`);
    if (!dog) add([index], `${name}: no está en el registro de perros (perro sin ficha).`);
    else if (dog.status !== "Activo") add([index], `${name}: estado «${dog.status}».`);
  });

  // Tamaños mezclados: un aviso por perro pequeño que comparte franja con perros grandes.
  const mixed = new Map();
  for (let i = 0; i < stops.length; i += 1) {
    for (let j = i + 1; j < stops.length; j += 1) {
      const a = stops[i];
      const b = stops[j];
      if (!a.dog || !b.dog) continue;
      if (a.dog.id === b.dog.id) {
        add([a.index, b.index], `${a.dog.name} está dos veces en esta ruta.`);
        continue;
      }
      if (!overlaps(a.win, b.win)) continue;
      const incompatible = (a.dog.incompatibleWith || []).includes(b.dog.name) || (b.dog.incompatibleWith || []).includes(a.dog.name);
      if (incompatible) add([a.index, b.index], `No juntar: ${a.dog.name} y ${b.dog.name} van en la misma franja (${padHora(a.stop.hora)} y ${padHora(b.stop.hora)}).`);
      const small = a.dog.size === "Pequeño" && b.dog.size === "Grande" ? a : b.dog.size === "Pequeño" && a.dog.size === "Grande" ? b : null;
      if (small) {
        const big = small === a ? b : a;
        if (!mixed.has(small.index)) mixed.set(small.index, { small, bigs: [] });
        mixed.get(small.index).bigs.push(big);
      }
    }
  }
  mixed.forEach(({ small, bigs }) => {
    const names = [...new Set(bigs.map((b) => b.dog.name))];
    add([small.index, ...bigs.map((b) => b.index)], `Tamaños mezclados: ${small.dog.name} (pequeño) comparte franja con ${listJoin(names)} (${names.length === 1 ? "grande" : "grandes"}).`);
  });

  others.filter((o) => o.ruta !== route.ruta).forEach((other) => {
    (other.paradas || []).forEach((otherStop) => {
      const otherDog = dogOf(otherStop);
      stops.forEach(({ index, dog, win }) => {
        if (!dog || !otherDog || dog.id !== otherDog.id) return;
        if (overlaps(win, stopWindow(otherStop))) add([index], `${dog.name} también está en ${other.ruta} a las ${padHora(otherStop.hora)}.`);
      });
    });
  });

  return { list: [...new Set(list)], byStop };
}

function warningsForPlantilla(p) {
  return routeWarnings(p, plantillasDe(p.dia));
}

function warningsForDay(route, fecha) {
  return routeWarnings(route, effectiveRoutes(fecha));
}

function routeText(route, { fecha } = {}) {
  const head = fecha ? `${route.ruta} · ${dayLabel(fecha)} · ${route.turno}` : `${route.ruta} · ${route.dia} · ${route.turno} (plantilla semanal)`;
  const lines = [
    `*Ruta ${head}*`,
    `Paseador: ${personName(route.paseador) || PENDIENTE} | Ayudante: ${personName(route.ayudante) || "sin ayudante"} | Supervisa: ${personName(route.supervisor) || PENDIENTE}`,
  ];
  const stops = (route.paradas || []).slice().sort((a, b) => (minutesOf(a.hora) ?? 9999) - (minutesOf(b.hora) ?? 9999));
  stops.forEach((stop, i) => {
    const dog = dogOf(stop);
    const extra = [];
    if (stop.nota) extra.push(stop.nota);
    if (hasMuzzle(dog) && !/bozal/i.test(stop.nota || "")) extra.push("Usa bozal");
    lines.push(`${i + 1}) ${padHora(stop.hora) || "sin hora"} ${stop.perroNombre || dog?.name || PENDIENTE} · ${Number(stop.minutos) || 45} min${extra.length ? ` · ${extra.join(" · ")}` : ""}`);
  });
  if (!stops.length) lines.push("Sin perros cargados.");
  if (route.notas) lines.push(`Notas: ${route.notas}`);
  return lines.join("\n");
}

/* ---------- Editor de una ruta (en memoria) ---------- */

let editor = null;
let editorQuery = "";
let editorHora = "";
let editorConfirm = "";
let cargaConfirm = false;
let cargaProgreso = "";
let rutasFecha = "";

function rutasVista() {
  return readJSON(SECTIONS_KEY, {}).rutasVista === "dia" ? "dia" : "semana";
}

function setRutasVista(vista) {
  writeJSON(SECTIONS_KEY, { ...readJSON(SECTIONS_KEY, {}), rutasVista: vista });
}

function currentRutasFecha() {
  const hoy = hoyAR();
  if (!isISODate(rutasFecha) || rutasFecha < hoy) rutasFecha = hoy;
  return rutasFecha;
}

function cleanStops(paradas) {
  return (paradas || []).map((s) => ({
    perroId: s.perroId || "",
    perroNombre: s.perroNombre || dogOf(s)?.name || "",
    hora: padHora(s.hora) || s.hora || "",
    minutos: Number(s.minutos) || 45,
    nota: s.nota || "",
  }));
}

function openEditor(route, { modo, fecha = "", nuevo = false, solicitud = null } = {}) {
  editor = {
    modo,
    fecha,
    nuevo,
    id: modo === "plantilla" ? plantillaId(route.ruta, route.dia) : rutaDiaId(fecha, route.ruta),
    dia: modo === "dia" ? dayNameISO(fecha) : route.dia,
    turno: route.turno,
    ruta: route.ruta,
    paseador: route.paseador || "",
    ayudante: route.ayudante || "",
    supervisor: route.supervisor || "",
    notas: route.notas || "",
    paradas: cleanStops(route.paradas),
    plantillaId: route.plantillaId || (modo === "plantilla" ? route.id : ""),
    existeDia: modo === "dia" && route.origen === "dia" ? route : null,
    soloDia: modo === "plantilla" ? nextDatesFor(route.dia)[0] || "" : "",
    solicitudId: solicitud?.id || "",
    precarga: "",
    respuesta: "",
    sucio: false,
  };
  editorQuery = "";
  editorHora = "";
  editorConfirm = "";
}

function closeEditor() {
  editor = null;
  editorQuery = "";
  editorHora = "";
  editorConfirm = "";
}

function nextRouteCode(existing, turno) {
  const letter = turno === "Mañana" ? "M" : "T";
  for (let n = 1; n < 10; n += 1) {
    const code = `PJ_${n}${letter}`;
    if (!existing.some((r) => r.ruta === code)) return code;
  }
  return `PJ_X${letter}`;
}

function editorWarnings() {
  if (!editor) return { list: [], byStop: new Map() };
  const others = editor.modo === "plantilla" ? plantillasDe(editor.dia) : effectiveRoutes(editor.fecha);
  return routeWarnings(editor, others);
}

function addStop(dog, nombreLibre) {
  const hora = validHora(editorHora) ? padHora(editorHora) : nextFreeHora(editor);
  editor.paradas.push({
    perroId: dog?.id || "",
    perroNombre: dog?.name || nombreLibre,
    hora,
    minutos: dog?.minutes || 45,
    nota: dog?.incompatibleWith?.length ? `No juntar con ${listJoin(dog.incompatibleWith)}` : hasMuzzle(dog) ? "Bozal" : "",
  });
  editor.sucio = true;
  editorQuery = "";
  editorHora = "";
}

function sortStops() {
  editor.paradas.sort((a, b) => (minutesOf(a.hora) ?? 9999) - (minutesOf(b.hora) ?? 9999));
  editor.sucio = true;
}

function routeRecordFromEditor() {
  return {
    dia: editor.dia,
    turno: editor.turno,
    ruta: editor.ruta,
    paseador: editor.paseador.trim(),
    ayudante: editor.ayudante.trim(),
    supervisor: editor.supervisor.trim(),
    notas: editor.notas.trim(),
    paradas: cleanStops(editor.paradas),
  };
}

function editorError() {
  const code = String(editor.ruta || "").trim().toUpperCase().replace(/\s+/g, "_");
  if (!ROUTE_CODE.test(code)) return ["El código de la ruta tiene que ser como PJ_1M (letras, números y guion bajo).", "coord-ed-ruta"];
  editor.ruta = code;
  if (editor.nuevo) {
    const taken = editor.modo === "plantilla"
      ? getPlantillas().some((p) => p.id === plantillaId(code, editor.dia))
      : effectiveRoutes(editor.fecha).some((r) => r.ruta === code);
    if (taken) return [`Ya hay una ruta ${code} ese día. Elegí otro código o editá la que existe.`, "coord-ed-ruta"];
  }
  const sinHora = editor.paradas.findIndex((s) => !validHora(s.hora));
  if (sinHora >= 0) return [`Falta la hora de retiro de ${editor.paradas[sinHora].perroNombre || "un perro"}.`, `coord-ed-hora-${sinHora}`];
  return null;
}

/* ------------------------------------------------------------------ */
/* Pedidos de cambio del supervisor (`solicitudes`)                    */
/* ------------------------------------------------------------------ */

const rechazos = {};
let rechazoAbierto = "";

function getSolicitudes() {
  return cached("solicitudes").slice().sort(byNewest);
}

function solicitudesPendientes() {
  return getSolicitudes()
    .filter((s) => (s.estado || "pendiente") === "pendiente")
    .sort((a, b) => Number(Boolean(b.urgente)) - Number(Boolean(a.urgente)) || String(a.fecha || "").localeCompare(String(b.fecha || "")) || byNewest(b, a));
}

function solicitudPerro(s) {
  if (s.perroId && DOG_BY_ID.get(s.perroId)) return DOG_BY_ID.get(s.perroId);
  return DOG_BY_NAME.get(normalize(s.perroNombre)) || null;
}

function horaEnTexto(text) {
  const match = /(\d{1,2})\s*[:.h]\s*(\d{2})/.exec(String(text || ""));
  if (!match) return "";
  return padHora(`${match[1]}:${match[2]}`);
}

// Abre el editor de esa ruta para ESE día, con el cambio precargado cuando se puede.
function aplicarSolicitud(s) {
  const fecha = isISODate(s.fecha) ? s.fecha : hoyAR();
  const dog = solicitudPerro(s);
  const routes = effectiveRoutes(fecha);
  let route = s.ruta ? routes.find((r) => r.ruta === s.ruta) : null;
  if (!route && dog) route = routes.find((r) => (!s.turno || r.turno === s.turno) && (r.paradas || []).some((p) => dogOf(p)?.id === dog.id));
  if (!route && s.turno) route = routes.find((r) => r.turno === s.turno);
  const nuevo = !route;
  if (!route) {
    const turno = s.turno || "Mañana";
    route = { ruta: s.ruta || nextRouteCode(routes, turno), dia: dayNameISO(fecha), turno, paradas: [], origen: "plantilla" };
  }
  openEditor(route, { modo: "dia", fecha, nuevo, solicitud: s });
  const tipo = normalize(s.tipo);
  const idx = dog ? editor.paradas.findIndex((p) => dogOf(p)?.id === dog.id) : editor.paradas.findIndex((p) => normalize(p.perroNombre) === normalize(s.perroNombre));
  const hora = horaEnTexto(s.detalle);
  const nombre = dog?.name || s.perroNombre || "el perro";
  if (tipo === "no sale") {
    if (idx >= 0) {
      editor.paradas.splice(idx, 1);
      editor.precarga = `Ya saqué a ${nombre} de la ruta. Revisá y guardá.`;
    } else editor.precarga = `${nombre} no está en esta ruta: revisá a mano.`;
  } else if (tipo === "cambiar hora") {
    if (idx >= 0 && hora) {
      editor.paradas[idx].hora = hora;
      editor.precarga = `Ya cambié la hora de ${nombre} a las ${hora}. Revisá y guardá.`;
    } else editor.precarga = "No pude precargar la hora nueva: cambiala a mano.";
  } else if (tipo === "agregar perro") {
    if (idx >= 0) editor.precarga = `${nombre} ya estaba en la ruta: revisá la hora.`;
    else if (dog || s.perroNombre) {
      if (hora) editorHora = hora;
      addStop(dog, s.perroNombre);
      editor.precarga = `Ya agregué a ${nombre} a las ${editor.paradas[editor.paradas.length - 1].hora}. Revisá y guardá.`;
    } else editor.precarga = "No dice qué perro agregar: buscalo abajo.";
  } else {
    editor.precarga = "Este cambio se hace a mano: revisá el pedido y ajustá la ruta.";
  }
  editor.sucio = true;
  editor.respuesta = "";
}

/* ------------------------------------------------------------------ */
/* Clientes, avisos y pedidos                                          */
/* ------------------------------------------------------------------ */

const CLIENTE_ESTADOS = [
  ["activo", "Activo"],
  ["pausa", "En pausa"],
  ["baja", "De baja"],
];
const CLIENTE_PLANES = [PENDIENTE, ...REAL_PLANS.map((plan) => `${plan.name} (${plan.walks} paseos por semana)`), "Paseo suelto", "Otro (anotalo en notas)"];
const CLIENTE_TURNOS = [PENDIENTE, "Mañana", "Tarde", "Mañana y tarde"];
const AVISO_TIPOS = ["obra o corte", "perro suelto", "clima", "seguridad", "cambio de horario", "otro"];

let clienteQuery = "";

function getClientes() {
  return cached("clientes").slice().sort((a, b) => String(a.nombre || "").localeCompare(String(b.nombre || ""), "es"));
}

function getAvisos() {
  return cached("avisos").slice().sort(byNewest);
}

function avisoVigente(aviso, hoy = hoyAR()) {
  if (isISODate(aviso.vigenteHasta)) return aviso.vigenteHasta >= hoy;
  return (aviso.fecha || "") === hoy;
}

function avisosVigentes() {
  return getAvisos().filter((a) => avisoVigente(a));
}

function groupByBarrio(avisos) {
  const map = new Map();
  avisos.forEach((a) => {
    const key = a.barrio || "Sin barrio";
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(a);
  });
  return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0], "es"));
}

function barriosConocidos() {
  const set = new Map();
  [...BARRIOS_BASE, ...getClientes().map((c) => c.barrio), ...getAvisos().map((a) => a.barrio)].forEach((b) => {
    const value = String(b || "").trim();
    if (value && !set.has(normalize(value))) set.set(normalize(value), value);
  });
  return [...set.values()].sort((a, b) => a.localeCompare(b, "es"));
}

function avisoText(aviso) {
  return [
    `*Aviso Paseos Juan · ${aviso.barrio || "Sin barrio"}*`,
    `Tipo: ${aviso.tipo || "otro"}`,
    aviso.mensaje || "",
    `Vigente hasta: ${isISODate(aviso.vigenteHasta) ? fmtDate(aviso.vigenteHasta) : fmtDate(aviso.fecha)}`,
  ].filter(Boolean).join("\n");
}

const PEDIDO_TIPOS = ["Consulta", "Evaluación inicial", "Documentación", "Cambio de días o plan", "Ausencia", "Otro"];
const PEDIDO_CANALES = ["WhatsApp", "Llamada", "En persona", "Otro"];
const PEDIDO_COLUMNAS = [
  ["nuevo", "Nuevo"],
  ["en-curso", "En curso"],
  ["resuelto", "Resuelto"],
];
const ESTADO_LABEL = { nuevo: "Nuevo", "en-curso": "En curso", resuelto: "Resuelto" };

function estadoDe(pedido) {
  if (pedido.estado === "curso") return "en-curso";
  return ESTADOS.includes(pedido.estado) ? pedido.estado : "nuevo";
}

function getPedidos() {
  return cached("pedidos").slice().sort(byNewest);
}

function getFichas() {
  return cached("fichas").slice().sort(byNewest);
}

function getResolved() {
  const map = {};
  cached("resueltos").forEach((r) => {
    if (r.resuelto) map[r.perroId || r.id] = r;
  });
  return map;
}

function pedidoPerro(pedido) {
  return pedido.datos?.perro || pedido.perro || "";
}

function webNuevos(pedidos) {
  return pedidos.filter((p) => p.origen === "web" && estadoDe(p) === "nuevo");
}

function pendingReview() {
  const resolved = getResolved();
  return REVIEW_DOGS.filter((dog) => !resolved[dog.id]);
}

// Teléfono → número para WhatsApp (celular de Argentina: 549 + 10 dígitos).
function whatsappNumber(raw) {
  let digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("54")) {
    digits = digits.slice(2);
    if (digits.startsWith("9")) digits = digits.slice(1);
  }
  if (digits.startsWith("0")) digits = digits.slice(1);
  if (digits.length === 12) {
    const cut = [2, 3, 4].find((at) => digits.slice(at, at + 2) === "15");
    if (cut) digits = digits.slice(0, cut) + digits.slice(cut + 2);
  }
  return digits.length === 10 ? `549${digits}` : "";
}

function whatsappLinkTo(phone, message, variant = "secondary", label = "Escribirle por WhatsApp") {
  if (!phone) return "";
  const number = whatsappNumber(phone);
  if (!number) return `<p class="coord-inline-alert">${icon("alertCircle", "coord-icon")}<span>Revisá el teléfono: no parece un celular de Argentina.</span></p>`;
  return `<a class="coord-btn is-${variant}" href="https://wa.me/${number}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer">${icon("message", "coord-icon")}<span>${label}</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`;
}

const SERVICE_DAYS_FOR_PARSE = SERVICE_DAYS;

// Días escritos por el tutor ("lunes, miércoles y viernes" o "lunes a viernes").
function parseDays(text) {
  const t = normalize(text);
  const names = SERVICE_DAYS_FOR_PARSE.map(normalize);
  const range = /(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);
  if (range) {
    const from = names.indexOf(range[1]);
    const to = names.indexOf(range[2]);
    if (from >= 0 && to >= from) return SERVICE_DAYS_FOR_PARSE.slice(from, to + 1);
  }
  return SERVICE_DAYS_FOR_PARSE.filter((day, index) => t.includes(names[index]));
}

/* ------------------------------------------------------------------ */
/* Borradores de formularios (solo en memoria)                         */
/* ------------------------------------------------------------------ */

const drafts = {};
const clearedForms = new Set();

function getDraft(form) {
  return drafts[form] || {};
}

function saveDraft(form, values) {
  drafts[form] = values;
  clearedForms.delete(form);
}

function clearDraft(form) {
  delete drafts[form];
  clearedForms.add(form);
}

function serializeForm(formEl) {
  const values = { ...getDraft(formEl.dataset.coordForm) };
  const groups = new Set();
  formEl.querySelectorAll("[name]").forEach((fieldEl) => {
    if (fieldEl.type === "file") return;
    if (fieldEl.type === "checkbox") {
      if (groups.has(fieldEl.name)) return;
      groups.add(fieldEl.name);
      const group = formEl.querySelectorAll(`[name="${fieldEl.name}"]`);
      values[fieldEl.name] = [...group].filter((box) => box.checked).map((box) => box.value);
      return;
    }
    values[fieldEl.name] = fieldEl.value;
  });
  return values;
}

/* ------------------------------------------------------------------ */
/* Componentes                                                         */
/* ------------------------------------------------------------------ */

function field(form, name, label, { value = "", placeholder = "", hint = "", type = "text", required = false, span = false, attrs = "" } = {}) {
  const id = `coord-${form}-${name}`;
  return `
    <div class="coord-field ${span ? "is-wide" : ""}">
      <label for="${id}">${label}${required ? ' <span class="coord-required">(obligatorio)</span>' : ""}</label>
      <input id="${id}" name="${name}" type="${type}" value="${esc(value)}" ${placeholder ? `placeholder="${esc(placeholder)}"` : ""} ${required ? "required" : ""} ${hint ? `aria-describedby="${id}-hint"` : ""} ${attrs} />
      ${hint ? `<small id="${id}-hint">${hint}</small>` : ""}
    </div>
  `;
}

function selectField(form, name, label, options, { value = "", hint = "", span = false, required = false } = {}) {
  const id = `coord-${form}-${name}`;
  const opts = options.map((option) => (Array.isArray(option) ? option : [option, option]));
  return `
    <div class="coord-field ${span ? "is-wide" : ""}">
      <label for="${id}">${label}${required ? ' <span class="coord-required">(obligatorio)</span>' : ""}</label>
      <select id="${id}" name="${name}" ${hint ? `aria-describedby="${id}-hint"` : ""}>
        ${opts.map(([val, text]) => `<option value="${esc(val)}" ${val === value ? "selected" : ""}>${esc(text)}</option>`).join("")}
      </select>
      ${hint ? `<small id="${id}-hint">${hint}</small>` : ""}
    </div>
  `;
}

function textArea(form, name, label, { value = "", placeholder = "", hint = "", span = true, attrs = "", required = false } = {}) {
  const id = `coord-${form}-${name}`;
  return `
    <div class="coord-field ${span ? "is-wide" : ""}">
      <label for="${id}">${label}${required ? ' <span class="coord-required">(obligatorio)</span>' : ""}</label>
      <textarea id="${id}" name="${name}" rows="3" ${placeholder ? `placeholder="${esc(placeholder)}"` : ""} ${hint ? `aria-describedby="${id}-hint"` : ""} ${attrs}>${esc(value)}</textarea>
      ${hint ? `<small id="${id}-hint">${hint}</small>` : ""}
    </div>
  `;
}

function daysField(form, days) {
  return `
    <div class="coord-field is-wide">
      <span class="coord-label" id="coord-${form}-dias-label">Días</span>
      <div class="coord-days" role="group" aria-labelledby="coord-${form}-dias-label">
        ${SERVICE_DAYS.map((day) => `
          <label class="coord-day"><input type="checkbox" id="coord-${form}-dia-${slugDia(day)}" name="dias" value="${day}" ${days.includes(day) ? "checked" : ""} /><span>${day}</span></label>
        `).join("")}
      </div>
    </div>
  `;
}

function feedback(sectionKey) {
  if (!flash || flash.section !== sectionKey) return "";
  const undo = flash.undo ? `<button class="coord-link" type="button" data-coord-undo>Deshacer</button>` : "";
  return `<p class="coord-flash is-${flash.tone}">${icon(flash.tone === "error" ? "alertCircle" : "checkCircle", "coord-icon")}<span>${esc(flash.text)}</span>${undo}</p>`;
}

function button(label, attrs, variant = "secondary", iconName = "") {
  return `<button class="coord-btn is-${variant}" type="button" ${attrs}>${iconName ? icon(iconName, "coord-icon") : ""}<span>${label}</span></button>`;
}

function section({ key, id, iconName, title, intro, badges = "", body, open = false }) {
  return `
    <details class="coord-section" id="${id}" ${isOpen(key, open) ? "open" : ""}>
      <summary data-coord-toggle="${key}">
        <span class="coord-section-icon">${icon(iconName, "coord-icon")}</span>
        <span class="coord-section-title">
          <h2>${title}</h2>
          <small>${intro}</small>
        </span>
        <span class="coord-section-badges">${badges}</span>
        <span class="coord-chevron">${icon("chevronDown", "coord-icon")}</span>
      </summary>
      <div class="coord-section-body">${body}</div>
    </details>
  `;
}

function badge(text, tone = "neutral") {
  return `<span class="coord-badge is-${tone}">${text}</span>`;
}

function safetyChips(dog) {
  if (!dog?.safety?.length) return "";
  return `
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${esc(dog.name)}">
      ${dog.safety.map((note) => `<li class="${/bozal|no juntar/i.test(note) ? "is-alert" : ""}">${icon(/bozal|no juntar/i.test(note) ? "alertTriangle" : "users", "coord-icon")}${esc(note)}</li>`).join("")}
    </ul>
  `;
}

function dataList(rows, className = "") {
  const visible = rows.filter(([, value]) => String(value ?? "").trim());
  if (!visible.length) return "";
  return `
    <dl class="coord-data ${className}">
      ${visible.map(([label, value, tone]) => `<div class="${tone ? `is-${tone}` : ""}"><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join("")}
    </dl>
  `;
}

function warnList(list, id) {
  if (!list.length) return "";
  return `
    <div class="coord-warn-box" role="note" ${id ? `id="${id}"` : ""}>
      <h3>${icon("alertTriangle", "coord-icon")}<span>${list.length === 1 ? "1 aviso para revisar" : `${list.length} avisos para revisar`}</span></h3>
      <ul>${list.map((text) => `<li>${esc(text)}</li>`).join("")}</ul>
      <p>No bloquea el guardado: revisalo antes de mandar la ruta.</p>
    </div>
  `;
}

const TEAM_DATALIST = `
  <datalist id="coord-team-users">${TEAM.map((t) => `<option value="${esc(t.id)}">${esc(t.name)} · ${esc(t.label)}</option>`).join("")}</datalist>
  <datalist id="coord-team-names">${TEAM.map((t) => `<option value="${esc(t.name.split(" ")[0])}">${esc(t.name)}</option>`).join("")}</datalist>
`;

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export function coordinatorShell(content) {
  return `
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${CoordinatorHeader()}
      ${content}
    </div>
  `;
}

function CoordinatorHeader() {
  return `
    <header class="coord-header">
      <a class="coord-brand" href="/coordinador" data-link aria-label="Paseos Juan, panel de coordinación">
        <span class="coord-logo">
          <img class="coord-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="coord-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="coord-brand-text">
          <strong>Coordinación</strong>
          <small>Paseos Juan</small>
        </span>
      </a>
      <div class="coord-header-actions">
        <button class="coord-btn is-ghost is-compact" type="button" data-a11y-toggle aria-controls="a11y-panel">
          ${icon("eye", "coord-icon")}<span>Accesibilidad</span>
        </button>
        <a class="coord-btn is-ghost is-compact" href="/salir" data-link>
          ${icon("logOut", "coord-icon")}<span>Salir</span>
        </a>
      </div>
    </header>
  `;
}

export function coordinatorDashboard() {
  wireData();
  ensureSync();
  const content = `
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${SyncStrip()}
      ${TodayPanel()}
      ${AvisosStrip()}
      ${RoutesBlock()}
      ${SolicitudesSection()}
      ${ClientesSection()}
      ${AvisosSection()}
      ${RequestsSection()}
      ${ReviewSection()}
      ${IntakeSection()}
      ${ActivitySection()}
      <p class="coord-footnote">
        Rutas de partida: ${esc(BUSINESS_INFO.officialSources.routes)} (${DATA_UPDATED}). Datos de perros: ${esc(BUSINESS_INFO.officialSources.dogs)}.
        Rutas, clientes, avisos y pedidos se guardan en los datos compartidos del equipo. Los pagos los ve solo Juan.
      </p>
      ${TEAM_DATALIST}
    </main>
  `;
  flash = null;
  clearedForms.clear();
  return content;
}

/* ---------- Estado de la conexión ---------- */

function SyncStrip() {
  const pending = registros.pendingCount();
  const offline = navigator.onLine === false;
  const errors = [...new Set(loadErrors.values())];
  const items = [];
  if (pending) {
    items.push(`<p class="coord-sync is-warn">${icon("clock", "coord-icon")}<span><b>${pending} ${pending === 1 ? "cambio pendiente" : "cambios pendientes"} sin señal.</b> Se ${pending === 1 ? "envía solo" : "envían solos"} cuando vuelva.</span></p>`);
  } else if (offline) {
    items.push(`<p class="coord-sync is-warn">${icon("clock", "coord-icon")}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva.</span></p>`);
  }
  if (errors.length) {
    items.push(`<div class="coord-sync is-error">${icon("alertCircle", "coord-icon")}<span>${errors.map(esc).join(" ")}</span>${button("Reintentar", "data-coord-retry", "secondary")}</div>`);
  }
  if (migrationNote) items.push(`<p class="coord-sync is-ok">${icon("uploadCloud", "coord-icon")}<span>${esc(migrationNote)}</span></p>`);
  return items.length ? `<div class="coord-sync-list">${items.join("")}</div>` : "";
}

/* ---------- 1. Lo urgente de hoy ---------- */

function SolicitudItem(s, { compact = false } = {}) {
  const id = esc(s.id);
  const estado = s.estado || "pendiente";
  const nombre = s.perroNombre || solicitudPerro(s)?.name || "";
  const quien = s.creadoPorNombre ? `${s.creadoPorNombre}${s.creadoEn ? `, ${fmtStamp(s.creadoEn)}` : ""}` : PENDIENTE;
  const que = s.titulo || [s.tipo, nombre].filter(Boolean).join(": ");
  const rechazo = rechazoAbierto === s.id;
  return `
    <li class="coord-sol ${s.urgente ? "is-urgent" : ""} is-${esc(estado)}" id="coord-sol-${id}" tabindex="-1">
      <div class="coord-sol-head">
        <strong>${esc(que || "Pedido de cambio")}</strong>
        <span class="coord-badges">${s.urgente ? badge("Urgente", "alert") : ""}${estado === "aplicado" ? badge("Aplicado", "ok") : estado === "rechazado" ? badge("Rechazado", "warn") : badge("Pendiente", "warn")}</span>
      </div>
      <p class="coord-sol-where">${icon("route", "coord-icon")}<span>${esc([s.fecha ? dayLabel(s.fecha) : "", s.turno, s.ruta].filter(Boolean).join(" · ") || PENDIENTE)}</span></p>
      ${dataList([
        ["Qué cambiar", s.detalle],
        ["Por qué", s.motivo],
        ["Pidió", quien],
        ["Respuesta", s.respuesta],
      ], compact ? "is-compact" : "")}
      ${s.pendiente ? `<p class="coord-meta is-pending">${icon("clock", "coord-icon")}<span>Sin señal: se enviará cuando vuelva.</span></p>` : ""}
      ${estado === "pendiente" ? `
        ${rechazo ? `
          <div class="coord-reject">
            <label for="coord-rechazo-${id}">Respuesta para el supervisor <span class="coord-required">(obligatorio)</span></label>
            <textarea id="coord-rechazo-${id}" rows="2" data-coord-rechazo="${id}" placeholder="Ej.: Ese día no hay lugar en la ruta; lo pasamos al lunes.">${esc(rechazos[s.id] || "")}</textarea>
            <div class="coord-actions">
              ${button("Enviar rechazo", `id="coord-rechazar-ok-${id}" data-coord-sol-rechazar-ok="${id}"`, "primary")}
              ${button("Cancelar", `data-coord-sol-rechazar-cancel="${id}"`, "ghost")}
            </div>
          </div>` : `
          <div class="coord-actions">
            ${button("Aplicar", `id="coord-aplicar-${id}" data-coord-sol-aplicar="${id}"`, "primary", "checkCircle")}
            ${button("Rechazar", `id="coord-rechazar-${id}" data-coord-sol-rechazar="${id}"`, "ghost", "x")}
          </div>`}` : ""}
    </li>
  `;
}

function TodayPanel() {
  const hoy = hoyAR();
  const user = currentUser();
  const pedidos = getPedidos();
  const web = webNuevos(pedidos);
  const solicitudes = solicitudesPendientes();
  const urgentes = solicitudes.filter((s) => s.urgente);
  const plantillasCargadas = getPlantillas().length > 0;
  const hoyRoutes = effectiveRoutes(hoy);
  const hoyWarnings = hoyRoutes.reduce((sum, r) => sum + warningsForDay(r, hoy).list.length, 0);
  const hoyDogs = hoyRoutes.reduce((sum, r) => sum + (r.paradas || []).length, 0);
  const vigentes = avisosVigentes();
  const barrios = groupByBarrio(vigentes).map(([b]) => b);
  const review = pendingReview();

  let next;
  if (urgentes.length) {
    next = { text: `Resolvé el pedido urgente de <b>${esc(urgentes[0].creadoPorNombre || "supervisión")}</b>: ${esc(urgentes[0].titulo || urgentes[0].tipo || "cambio de ruta")}.`, action: button("Aplicar", `data-coord-sol-aplicar="${esc(urgentes[0].id)}"`, "primary", "arrowRight") };
  } else if (web.length) {
    const oldest = web[web.length - 1];
    const d = oldest.datos || {};
    next = { text: `Escribile a <b>${esc(d.responsable || "quien hizo el pedido")}</b> por la evaluación de <b>${esc(d.perro || "su perro")}</b>.`, action: button("Ver pedido", `data-coord-goto-pedido="${esc(oldest.id)}"`, "primary", "arrowRight") };
  } else if (!plantillasCargadas && loaded.has("plantillas")) {
    next = { text: "Cargá las rutas de la planilla RPJ para tener la semana armada.", action: button("Ir a rutas", `data-coord-goto="coord-rutas"`, "primary", "arrowRight") };
  } else if (solicitudes.length) {
    next = { text: `Respondé el pedido de cambio de <b>${esc(solicitudes[0].creadoPorNombre || "supervisión")}</b>.`, action: button("Aplicar", `data-coord-sol-aplicar="${esc(solicitudes[0].id)}"`, "primary", "arrowRight") };
  } else if (hoyWarnings) {
    next = { text: `Revisá ${hoyWarnings === 1 ? "el aviso" : `los ${hoyWarnings} avisos`} de las rutas de hoy.`, action: button("Ver rutas de hoy", `data-coord-ver-dia="${hoy}"`, "primary", "arrowRight") };
  } else if (review.length) {
    next = { text: `Confirmá el dato de <b>${esc(review[0].name)}</b>: ${esc(review[0].review || `estado "${review[0].status}"`)}`, action: button("Ver datos", `data-coord-open="datos"`, "primary", "arrowRight") };
  } else {
    next = { text: "Todo en orden. Mirá las rutas del día siguiente.", action: button("Ver el día siguiente", `data-coord-ver-dia="${addDaysISO(hoy, 1)}"`, "primary", "arrowRight") };
  }

  const shownSol = solicitudes.slice(0, 3);
  return `
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${dayLabel(hoy)}</p>
        <p class="coord-greeting">Hola, ${esc(user.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
      </div>

      ${solicitudes.length ? `
        <div class="coord-sol-alert" id="coord-sol-urgente" tabindex="-1">
          <h2>${icon("bell", "coord-icon")}<span>${solicitudes.length === 1 ? "1 pedido de cambio del supervisor" : `${solicitudes.length} pedidos de cambio del supervisor`}</span></h2>
          ${feedback("solicitudes")}
          <ul class="coord-sol-list">${shownSol.map((s) => SolicitudItem(s, { compact: true })).join("")}</ul>
          ${solicitudes.length > shownSol.length ? `<p>Y ${solicitudes.length - shownSol.length} más. ${button("Ver todos", `data-coord-open="solicitudes"`, "ghost")}</p>` : ""}
        </div>` : feedback("solicitudes")}

      <ol class="coord-priorities">
        <li class="coord-priority ${web.length ? "is-alert" : "is-ok"}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Pedidos nuevos de la web</h2>
            <p class="coord-big"><b>${web.length}</b> <span>${web.length === 1 ? "sin responder" : "sin responder"}</span></p>
            <p>${web.length ? esc(listJoin(web.slice(0, 3).map((p) => p.datos?.perro || PENDIENTE))) : loaded.has("pedidos") ? "No hay pedidos nuevos." : "Cargando pedidos…"}</p>
          </div>
          ${button("Ver pedidos", `data-coord-open="pedidos"`, "secondary")}
        </li>
        <li class="coord-priority ${!plantillasCargadas ? "is-warn" : hoyWarnings ? "is-alert" : "is-ok"}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Rutas de hoy</h2>
            ${!plantillasCargadas && !hoyRoutes.length
              ? `<p class="coord-big"><b>0</b> <span>rutas</span></p><p>${loaded.has("plantillas") ? "Todavía no hay rutas cargadas." : "Cargando rutas…"}</p>`
              : `<p class="coord-big"><b>${hoyRoutes.length}</b> <span>${hoyRoutes.length === 1 ? "ruta" : "rutas"}</span> <b>${hoyDogs}</b> <span>paseos</span></p>
                 ${hoyWarnings ? `<p class="coord-inline-alert is-strong">${icon("alertTriangle", "coord-icon")}<span>${hoyWarnings} ${hoyWarnings === 1 ? "aviso" : "avisos"} para revisar</span></p>` : `<p>Sin avisos.</p>`}`}
          </div>
          ${button(plantillasCargadas ? "Ver rutas de hoy" : "Cargar rutas", plantillasCargadas ? `data-coord-ver-dia="${hoy}"` : `data-coord-goto="coord-rutas"`, "secondary")}
        </li>
        <li class="coord-priority ${vigentes.length ? "is-warn" : "is-ok"}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Avisos de barrio vigentes</h2>
            <p class="coord-big"><b>${vigentes.length}</b> <span>${barrios.length === 1 ? "en 1 barrio" : `en ${barrios.length} barrios`}</span></p>
            <p>${vigentes.length ? esc(listJoin(barrios.slice(0, 3))) : "Sin avisos vigentes."}</p>
          </div>
          ${button(vigentes.length ? "Ver avisos" : "Cargar un aviso", vigentes.length ? `data-coord-goto="coord-avisos-vigentes"` : `data-coord-open="avisos"`, "secondary")}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${next.text}</p>
        ${next.action}
      </div>
    </section>
  `;
}

/* ---------- Avisos vigentes por barrio (arriba) ---------- */

function AvisoCard(aviso, { history = false } = {}) {
  const id = esc(aviso.id);
  return `
    <li class="coord-aviso ${history ? "is-old" : ""}">
      <div class="coord-aviso-head">
        ${history ? `<strong>${esc(aviso.barrio || "Sin barrio")}</strong>` : ""}
        ${badge(esc(aviso.tipo || "otro"), aviso.tipo === "seguridad" || aviso.tipo === "perro suelto" ? "alert" : "warn")}
        <small>${history ? "Venció" : "Hasta"} el ${esc(fmtDate(isISODate(aviso.vigenteHasta) ? aviso.vigenteHasta : aviso.fecha))}</small>
      </div>
      <p>${esc(aviso.mensaje || aviso.titulo || "")}</p>
      ${whoLine(aviso)}
      <div class="coord-actions">
        ${button("Copiar para WhatsApp", `data-coord-aviso-copy="${id}"`, "ghost", "copy")}
        ${!history ? button("Ya no está vigente", `data-coord-aviso-fin="${id}"`, "ghost") : ""}
      </div>
    </li>
  `;
}

function AvisosStrip() {
  const vigentes = avisosVigentes();
  if (!vigentes.length) return "";
  return `
    <section class="coord-block coord-avisos-strip" id="coord-avisos-vigentes" tabindex="-1" aria-labelledby="coord-avisos-vig-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-avisos-vig-title">Avisos vigentes por barrio</h2>
          <p>Lo que el equipo tiene que saber hoy en cada barrio.</p>
        </div>
        ${button("Cargar un aviso", `data-coord-open="avisos"`, "secondary", "plus")}
      </div>
      ${feedback("avisosTop")}
      <div class="coord-barrios">
        ${groupByBarrio(vigentes).map(([barrio, avisos]) => `
          <section class="coord-barrio" aria-label="Avisos en ${esc(barrio)}">
            <h3>${icon("mapPin", "coord-icon")}<span>${esc(barrio)}</span> <small>${avisos.length}</small></h3>
            <ul class="coord-aviso-list">${avisos.map((a) => AvisoCard(a)).join("")}</ul>
          </section>
        `).join("")}
      </div>
    </section>
  `;
}

/* ---------- 2. Rutas y horarios ---------- */

function RoutesBlock() {
  const plantillas = getPlantillas();
  const loading = !loaded.has("plantillas") && !plantillas.length;
  let body;
  if (editor) body = RouteEditor();
  else if (loading) body = `<p class="coord-empty">${icon("clock", "coord-icon")}Cargando rutas…</p>`;
  else if (!plantillas.length || cargaProgreso) body = CargaPlanilla();
  else {
    const vista = rutasVista();
    body = `
      <div class="coord-seg" role="group" aria-label="Qué querés ver">
        <button type="button" class="coord-seg-btn" id="coord-vista-semana" data-coord-vista="semana" aria-pressed="${vista === "semana"}">${icon("calendarCheck", "coord-icon")}<span>Semana (se repite)</span></button>
        <button type="button" class="coord-seg-btn" id="coord-vista-dia" data-coord-vista="dia" aria-pressed="${vista === "dia"}">${icon("route", "coord-icon")}<span>Un día puntual</span></button>
      </div>
      ${vista === "semana" ? WeekView() : DayView()}
    `;
  }
  return `
    <section class="coord-block coord-routes" id="coord-rutas" tabindex="-1" aria-labelledby="coord-rutas-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-rutas-title">Rutas y horarios</h2>
          <p>La <b>semana</b> se repite todas las semanas. Si un día puntual cambia algo, guardalo <b>solo para ese día</b>: la semana no se toca.</p>
        </div>
      </div>
      ${feedback("rutas")}
      ${body}
    </section>
  `;
}

function CargaPlanilla() {
  const base = plantillasDesdePlanilla();
  const paseos = base.reduce((sum, p) => sum + p.paradas.length, 0);
  return `
    <div class="coord-carga">
      <p>Todavía no hay rutas armadas en la app. Podés arrancar con las rutas reales de la planilla RPJ (hoja BASE RUTAS, leída el 12/11/2026): <b>${base.length} rutas</b> y <b>${paseos} paseos</b> con su hora de retiro. Después las cambiás acá.</p>
      ${cargaProgreso ? `<p class="coord-note" role="status">${icon("clock", "coord-icon")}<span>${esc(cargaProgreso)}</span></p>` : ""}
      ${cargaConfirm ? `
        <div class="coord-confirm" role="group" aria-labelledby="coord-carga-q">
          <p id="coord-carga-q"><b>¿Confirmás?</b> Se guardan ${base.length} rutas como semana base. Las ve todo el equipo.</p>
          <div class="coord-actions">
            ${button("Sí, cargar las rutas", `id="coord-carga-ok" data-coord-carga-ok`, "primary", "checkCircle")}
            ${button("Cancelar", `id="coord-carga-cancel" data-coord-carga-cancel`, "ghost")}
          </div>
        </div>`
        : `<button class="coord-btn is-primary coord-btn-big" type="button" id="coord-carga" data-coord-carga>${icon("uploadCloud", "coord-icon")}<span>Cargar las rutas de la planilla RPJ</span></button>`}
      <p class="coord-meta">No incluye a «Llak» (jueves tarde): el nombre no coincide con ningún perro. Paseador y ayudante quedan para completar.</p>
    </div>
  `;
}

function RouteButton(route, { warnings, attrs }) {
  const n = (route.paradas || []).length;
  return `
    <button type="button" class="coord-wroute ${warnings ? "is-alert" : ""}" ${attrs}>
      <span class="coord-wroute-top"><strong>${esc(route.ruta)}</strong>${warnings ? `<span class="coord-wroute-warn">${icon("alertTriangle", "coord-icon")}${warnings}<span class="coord-sr-only"> ${warnings === 1 ? "aviso" : "avisos"}</span></span>` : ""}</span>
      <span>${n} ${n === 1 ? "perro" : "perros"} · ${esc(routeSpan(route))}</span>
      <small>${route.paseador ? esc(personName(route.paseador)) : "Sin paseador"}</small>
    </button>
  `;
}

function WeekView() {
  const plantillas = getPlantillas();
  const today = dayNameISO(hoyAR());
  const days = plantillas.some((p) => p.dia === "Domingo") ? WEEK_DAYS : SERVICE_DAYS;
  const total = plantillas.reduce((sum, p) => sum + p.paradas.length, 0);
  return `
    <p class="coord-meta">${plantillas.length} rutas · ${total} paseos por semana. Tocá una ruta para editar sus horarios.</p>
    <div class="coord-week">
      ${days.map((dia) => `
        <section class="coord-wday ${dia === today ? "is-today" : ""}" aria-labelledby="coord-wday-${slugDia(dia)}">
          <h3 id="coord-wday-${slugDia(dia)}">${dia}${dia === today ? ' <span class="coord-tag">Hoy</span>' : ""}</h3>
          ${SHIFT_LABELS.map((turno) => {
            const routes = plantillasDe(dia).filter((p) => p.turno === turno);
            return `
              <div class="coord-wturno">
                <p class="coord-wturno-label">${turno}</p>
                ${routes.map((p) => RouteButton(p, { warnings: warningsForPlantilla(p).list.length, attrs: `id="coord-wr-${esc(p.id)}" data-coord-edit-plantilla="${esc(p.id)}" aria-label="Editar ${esc(p.ruta)} del ${dia.toLowerCase()} a la ${turno.toLowerCase()}"` })).join("")}
                <button type="button" class="coord-wadd" id="coord-wadd-${slugDia(dia)}-${slugDia(turno)}" data-coord-new-route data-dia="${dia}" data-turno="${turno}">${icon("plus", "coord-icon")}<span>Ruta</span><span class="coord-sr-only"> nueva el ${dia.toLowerCase()} a la ${turno.toLowerCase()}</span></button>
              </div>
            `;
          }).join("")}
        </section>
      `).join("")}
    </div>
  `;
}

function DayView() {
  const hoy = hoyAR();
  const fecha = currentRutasFecha();
  const routes = effectiveRoutes(fecha);
  const total = routes.reduce((sum, r) => sum + (r.paradas || []).length, 0);
  return `
    <div class="coord-dayview">
      <div class="coord-day-pick">
        <div class="coord-field">
          <label for="coord-rutas-fecha">Día</label>
          <input id="coord-rutas-fecha" type="date" value="${fecha}" min="${hoy}" max="${addDaysISO(hoy, 90)}" data-coord-rutas-fecha />
        </div>
        <div class="coord-day-quick">
          ${button("Hoy", `id="coord-dia-hoy" data-coord-ver-dia="${hoy}"`, fecha === hoy ? "secondary" : "ghost")}
          ${button("Día siguiente", `id="coord-dia-manana" data-coord-ver-dia="${addDaysISO(hoy, 1)}"`, fecha === addDaysISO(hoy, 1) ? "secondary" : "ghost")}
        </div>
      </div>
      <h3 class="coord-day-title">${esc(dayLabel(fecha))} · ${routes.length} ${routes.length === 1 ? "ruta" : "rutas"} · ${total} paseos</h3>
      ${routes.length ? `<div class="coord-actions">${button("Copiar todas las rutas del día", `id="coord-copy-dia" data-coord-copy-dia="${fecha}"`, "ghost", "copy")}</div>` : `<p class="coord-empty is-small">No hay rutas para este día.</p>`}
      <ul class="coord-dayroutes">
        ${routes.map((r) => {
          const w = warningsForDay(r, fecha);
          const stops = (r.paradas || []).slice().sort((a, b) => (minutesOf(a.hora) ?? 9999) - (minutesOf(b.hora) ?? 9999));
          return `
            <li class="coord-dayroute ${w.list.length ? "is-alert" : ""}">
              <div class="coord-card-head">
                <strong>${esc(r.ruta)} · ${esc(r.turno)}</strong>
                ${r.origen === "dia" ? badge("Cambio solo para este día", "warn") : badge("Igual que la semana", "neutral")}
              </div>
              <p>${stops.length} ${stops.length === 1 ? "perro" : "perros"} · ${esc(routeSpan(r))} · Paseador: ${esc(personName(r.paseador) || PENDIENTE)}${r.ayudante ? ` · Ayudante: ${esc(personName(r.ayudante))}` : ""}</p>
              ${w.list.length ? `<p class="coord-inline-alert is-strong">${icon("alertTriangle", "coord-icon")}<span>${esc(w.list.slice(0, 2).join(" "))}${w.list.length > 2 ? ` Y ${w.list.length - 2} más.` : ""}</span></p>` : ""}
              <details class="coord-card-more">
                <summary>Ver paradas ${icon("chevronDown", "coord-icon")}</summary>
                <ol class="coord-stops-mini">${stops.map((s, i) => `<li class="${w.byStop.has((r.paradas || []).indexOf(s)) ? "is-alert" : ""}"><b>${esc(padHora(s.hora) || "--:--")}</b> ${esc(s.perroNombre)} <small>${Number(s.minutos) || 45} min${s.nota ? ` · ${esc(s.nota)}` : ""}</small><span class="coord-sr-only"> (parada ${i + 1})</span></li>`).join("")}</ol>
              </details>
              <div class="coord-actions">
                ${button("Cambiar solo este día", `id="coord-ed-dia-${esc(r.ruta)}" data-coord-edit-dia="${esc(r.ruta)}" data-fecha="${fecha}"`, "primary", "sliders")}
                ${button("Copiar para WhatsApp", `data-coord-copy-ruta="${esc(r.ruta)}" data-fecha="${fecha}"`, "ghost", "copy")}
              </div>
            </li>
          `;
        }).join("")}
      </ul>
      <div class="coord-actions">
        ${SHIFT_LABELS.map((turno) => button(`Ruta extra solo este día (${turno.toLowerCase()})`, `id="coord-extra-${slugDia(turno)}" data-coord-new-dia data-turno="${turno}" data-fecha="${fecha}"`, "ghost", "plus")).join("")}
      </div>
    </div>
  `;
}

function StopRow(stop, index, warnings) {
  const dog = dogOf(stop);
  const msgs = warnings.byStop.get(index) || [];
  const end = validHora(stop.hora) ? sumarMinutos(padHora(stop.hora), stop.minutos || 45) : "";
  const last = editor.paradas.length - 1;
  const name = stop.perroNombre || dog?.name || PENDIENTE;
  return `
    <li class="coord-stop ${msgs.length ? "is-alert" : ""}">
      <div class="coord-stop-head">
        <span class="coord-stop-num" aria-hidden="true">${index + 1}</span>
        <div class="coord-stop-name">
          <strong>${esc(name)}</strong>
          <small>${dog ? `${esc(dog.size)}${dog.status !== "Activo" ? ` · ${esc(dog.status)}` : ""}` : "Sin ficha en el registro"}</small>
        </div>
        <div class="coord-stop-tools">
          <button type="button" class="coord-icon-btn" id="coord-ed-up-${index}" data-coord-stop-up="${index}" ${index === 0 ? "disabled" : ""} aria-label="Subir a ${esc(name)}">${icon("chevronDown", "coord-icon is-up")}</button>
          <button type="button" class="coord-icon-btn" id="coord-ed-down-${index}" data-coord-stop-down="${index}" ${index === last ? "disabled" : ""} aria-label="Bajar a ${esc(name)}">${icon("chevronDown", "coord-icon")}</button>
          <button type="button" class="coord-icon-btn is-danger" id="coord-ed-del-${index}" data-coord-stop-del="${index}" aria-label="Quitar a ${esc(name)} de la ruta">${icon("x", "coord-icon")}</button>
        </div>
      </div>
      <div class="coord-stop-fields">
        <div class="coord-field">
          <label for="coord-ed-hora-${index}">Retiro</label>
          <input id="coord-ed-hora-${index}" type="time" step="300" value="${esc(padHora(stop.hora))}" data-coord-stop="${index}" data-k="hora" ${!validHora(stop.hora) ? 'aria-invalid="true"' : ""} />
        </div>
        <div class="coord-field">
          <label for="coord-ed-min-${index}">Minutos</label>
          <input id="coord-ed-min-${index}" type="number" min="5" max="240" step="5" inputmode="numeric" value="${esc(stop.minutos)}" data-coord-stop="${index}" data-k="minutos" />
        </div>
        <p class="coord-stop-end">${end ? `Vuelve ~${end}` : ""}</p>
        <div class="coord-field is-wide">
          <label for="coord-ed-nota-${index}">Nota</label>
          <input id="coord-ed-nota-${index}" type="text" value="${esc(stop.nota)}" data-coord-stop="${index}" data-k="nota" placeholder="Ej.: bozal, sale con…" autocomplete="off" />
        </div>
      </div>
      ${msgs.length ? `<ul class="coord-stop-warn">${msgs.map((m) => `<li>${icon("alertTriangle", "coord-icon")}<span>${esc(m)}</span></li>`).join("")}</ul>` : ""}
    </li>
  `;
}

function dogResults() {
  if (!editor) return "";
  const q = normalize(editorQuery);
  if (!q) return `<p class="coord-meta">Escribí el nombre del perro. Se agrega a la hora de arriba.</p>`;
  const inRoute = new Set(editor.paradas.map((s) => dogOf(s)?.id).filter(Boolean));
  const matches = REAL_DOGS.filter((dog) => normalize(dog.name).includes(q)).slice(0, 6);
  const exact = REAL_DOGS.some((dog) => normalize(dog.name) === q);
  const hora = validHora(editorHora) ? padHora(editorHora) : nextFreeHora(editor);
  return `
    <ul class="coord-results">
      ${matches.map((dog) => `
        <li>
          <button type="button" class="coord-result" id="coord-add-${dog.id}" data-coord-add-dog="${dog.id}">
            ${icon("plus", "coord-icon")}
            <span><b>${esc(dog.name)}</b> <small>${esc(dog.size)} · ${esc(scheduleLabel(dog))}</small></span>
            ${dog.status !== "Activo" ? badge(esc(dog.status), "alert") : ""}
            ${inRoute.has(dog.id) ? badge("Ya está en la ruta", "warn") : ""}
            <span class="coord-result-hora">${hora}</span>
          </button>
        </li>`).join("")}
      ${!exact && editorQuery.trim().length >= 2 ? `
        <li>
          <button type="button" class="coord-result is-free" id="coord-add-libre" data-coord-add-libre>
            ${icon("plus", "coord-icon")}<span>Agregar «${esc(editorQuery.trim())}» (perro sin ficha)</span><span class="coord-result-hora">${hora}</span>
          </button>
        </li>` : ""}
    </ul>
    ${!matches.length ? `<p class="coord-meta">No hay perros con ese nombre en el registro.</p>` : ""}
  `;
}

function RouteEditor() {
  const e = editor;
  const warnings = editorWarnings();
  const solicitud = e.solicitudId ? getSolicitudes().find((s) => s.id === e.solicitudId) : null;
  const isPlantilla = e.modo === "plantilla";
  const fechas = isPlantilla ? nextDatesFor(e.dia) : [];
  const suggested = validHora(editorHora) ? padHora(editorHora) : nextFreeHora(e);
  return `
    <div class="coord-editor ${isPlantilla ? "is-plantilla" : "is-dia"}" id="coord-editor" tabindex="-1" aria-labelledby="coord-editor-title">
      <div class="coord-editor-mode" role="note">
        ${icon(isPlantilla ? "calendarCheck" : "alertTriangle", "coord-icon")}
        <div>
          <p class="coord-editor-kicker">${isPlantilla ? "Estás editando la SEMANA" : "Estás editando SOLO UN DÍA"}</p>
          <h3 id="coord-editor-title">${esc(e.ruta)} · ${isPlantilla ? `${esc(e.dia)} · ${esc(e.turno)}` : `${esc(dayLabel(e.fecha))} · ${esc(e.turno)}`}</h3>
          <p>${isPlantilla ? `Se repite todos los ${esc(e.dia.toLowerCase())}. Si es algo de un solo día, usá «Guardar solo para un día».` : "La semana no cambia. Este cambio manda sobre la semana solo ese día."}${e.nuevo ? " Ruta nueva." : ""}</p>
        </div>
      </div>

      ${solicitud ? `
        <div class="coord-editor-sol" role="note">
          <p><b>Pedido de ${esc(solicitud.creadoPorNombre || "supervisión")}:</b> ${esc(solicitud.titulo || solicitud.tipo || "")}${solicitud.detalle ? ` · ${esc(solicitud.detalle)}` : ""}${solicitud.motivo ? ` · Motivo: ${esc(solicitud.motivo)}` : ""}</p>
          ${e.precarga ? `<p class="coord-done">${icon("checkCircle", "coord-icon")}<span>${esc(e.precarga)}</span></p>` : ""}
          <div class="coord-field is-wide">
            <label for="coord-ed-respuesta">Respuesta para el supervisor (opcional)</label>
            <input id="coord-ed-respuesta" type="text" value="${esc(e.respuesta)}" data-coord-ed-field="respuesta" placeholder="Ej.: Listo, ya lo saqué de la ruta." autocomplete="off" />
          </div>
        </div>` : ""}

      ${feedback("editor")}

      <div class="coord-grid coord-editor-team">
        ${e.nuevo ? `
          <div class="coord-field">
            <label for="coord-ed-ruta">Código de la ruta</label>
            <input id="coord-ed-ruta" type="text" value="${esc(e.ruta)}" data-coord-ed-field="ruta" autocomplete="off" aria-describedby="coord-ed-ruta-hint" />
            <small id="coord-ed-ruta-hint">Ej.: PJ_2M (mañana) o PJ_3T (tarde).</small>
          </div>` : ""}
        <div class="coord-field">
          <label for="coord-ed-paseador">Paseador</label>
          <input id="coord-ed-paseador" type="text" list="coord-team-users" value="${esc(e.paseador)}" data-coord-ed-field="paseador" autocomplete="off" aria-describedby="coord-ed-paseador-hint" />
          <small id="coord-ed-paseador-hint">Usuario de la app (ej.: sebastian).</small>
        </div>
        <div class="coord-field">
          <label for="coord-ed-ayudante">Ayudante</label>
          <input id="coord-ed-ayudante" type="text" list="coord-team-users" value="${esc(e.ayudante)}" data-coord-ed-field="ayudante" autocomplete="off" placeholder="Sin ayudante" />
        </div>
        <div class="coord-field">
          <label for="coord-ed-supervisor">Supervisa</label>
          <input id="coord-ed-supervisor" type="text" list="coord-team-names" value="${esc(e.supervisor)}" data-coord-ed-field="supervisor" autocomplete="off" />
        </div>
      </div>

      <div class="coord-add" role="group" aria-labelledby="coord-add-title">
        <h4 id="coord-add-title">${icon("plus", "coord-icon")}<span>Agregar un perro</span></h4>
        <div class="coord-add-row">
          <div class="coord-field coord-add-search">
            <label for="coord-ed-buscar">Buscar perro</label>
            <input id="coord-ed-buscar" type="search" value="${esc(editorQuery)}" data-coord-ed-search autocomplete="off" placeholder="Nombre del perro" aria-controls="coord-ed-results" />
          </div>
          <div class="coord-field coord-add-hora">
            <label for="coord-ed-nueva-hora">Hora de retiro</label>
            <input id="coord-ed-nueva-hora" type="time" step="300" value="${esc(suggested)}" data-coord-ed-hora aria-describedby="coord-ed-nueva-hora-hint" />
            <small id="coord-ed-nueva-hora-hint">Sugerida: la última + 15 min.</small>
          </div>
        </div>
        <div id="coord-ed-results" aria-live="polite">${dogResults()}</div>
      </div>

      <div class="coord-stops-head">
        <h4>Paradas en orden <span>${e.paradas.length}</span></h4>
        ${e.paradas.length > 1 ? button("Ordenar por hora", `id="coord-ed-sort" data-coord-ed-sort`, "ghost", "clock") : ""}
      </div>
      ${e.paradas.length ? `<ol class="coord-stops">${e.paradas.map((s, i) => StopRow(s, i, warnings)).join("")}</ol>` : `<p class="coord-empty is-small">La ruta no tiene perros todavía. Buscalos arriba.</p>`}

      ${warnList(warnings.list, "coord-ed-warnings")}

      <div class="coord-field is-wide">
        <label for="coord-ed-notas">Notas de la ruta</label>
        <textarea id="coord-ed-notas" rows="2" data-coord-ed-field="notas" placeholder="Ej.: arrancar por Mapuche">${esc(e.notas)}</textarea>
      </div>

      <div class="coord-editor-save">
        ${isPlantilla ? `
          <div class="coord-save-box is-main">
            <p><b>Guardar en la semana:</b> cambia todos los ${esc(e.dia.toLowerCase())}.</p>
            ${button("Guardar en la semana", `id="coord-ed-save" data-coord-ed-save="plantilla"`, "primary", "checkCircle")}
          </div>
          <div class="coord-save-box">
            <div class="coord-field">
              <label for="coord-ed-solodia">¿Es solo por un día? Elegí cuál</label>
              <select id="coord-ed-solodia" data-coord-ed-field="soloDia">
                ${fechas.map((f) => `<option value="${f}" ${f === e.soloDia ? "selected" : ""}>${esc(dayLabel(f))}${f === hoyAR() ? " (hoy)" : ""}${getRutasDia().some((r) => r.id === rutaDiaId(f, e.ruta)) ? " · ya tiene un cambio: se reemplaza" : ""}</option>`).join("")}
              </select>
            </div>
            ${button("Guardar solo para ese día", `id="coord-ed-save-dia" data-coord-ed-save="dia"`, "secondary")}
          </div>` : `
          <div class="coord-save-box is-main">
            <p><b>Guardar solo para el ${esc(dayLabel(e.fecha).toLowerCase())}.</b>${solicitud ? " El pedido del supervisor queda como aplicado." : ""}</p>
            ${button(`Guardar solo para el ${esc(fmtDate(e.fecha))}`, `id="coord-ed-save" data-coord-ed-save="dia"`, "primary", "checkCircle")}
          </div>
          ${e.existeDia && canDelete(e.existeDia) ? `
            <div class="coord-save-box">
              <p>¿Ese día tiene que quedar igual que la semana?</p>
              ${button("Volver a la ruta de la semana", `id="coord-ed-revert" data-coord-ed-revert`, "ghost")}
            </div>` : ""}`}
      </div>

      ${editorConfirm === "salir" ? `
        <div class="coord-confirm" role="group" aria-labelledby="coord-salir-q">
          <p id="coord-salir-q"><b>Tenés cambios sin guardar.</b> ¿Salir igual y descartarlos?</p>
          <div class="coord-actions">
            ${button("Sí, descartar", `id="coord-ed-close-ok" data-coord-ed-close-ok`, "primary")}
            ${button("Seguir editando", `id="coord-ed-close-cancel" data-coord-ed-close-cancel`, "ghost")}
          </div>
        </div>` : ""}

      <div class="coord-actions coord-editor-foot">
        ${button("Copiar para WhatsApp", `id="coord-ed-copy" data-coord-ed-copy`, "ghost", "copy")}
        ${button(e.sucio ? "Cerrar sin guardar" : "Volver", `id="coord-ed-close" data-coord-ed-close`, "ghost", "x")}
      </div>
    </div>
  `;
}

/* ---------- 3. Pedidos de cambio del supervisor (todos) ---------- */

function SolicitudesSection() {
  const all = getSolicitudes();
  const pend = solicitudesPendientes();
  const done = all.filter((s) => (s.estado || "pendiente") !== "pendiente");
  const body = `
    <p class="coord-note">${icon("users", "coord-icon")}<span>El supervisor mira las rutas y, si habló con alguien o pasó algo, te pide el cambio. Vos lo aplicás o lo rechazás con una respuesta: la ve el supervisor.</span></p>
    ${feedback("solicitudesTodas")}
    <h3 class="coord-subtitle">Pendientes <span>${pend.length}</span></h3>
    ${pend.length ? `<ul class="coord-sol-list">${pend.map((s) => SolicitudItem(s)).join("")}</ul>` : `<p class="coord-empty is-small">${loaded.has("solicitudes") ? "No hay pedidos pendientes." : "Cargando…"}</p>`}
    ${done.length ? `
      <details class="coord-more" ${isOpen("solHist") ? "open" : ""}>
        <summary data-coord-toggle="solHist">Respondidos en las últimas 2 semanas (${done.length}) ${icon("chevronDown", "coord-icon")}</summary>
        <ul class="coord-sol-list">${done.map((s) => SolicitudItem(s, { compact: true })).join("")}</ul>
      </details>` : ""}
  `;
  return section({
    key: "solicitudes",
    id: "coord-solicitudes",
    iconName: "bell",
    title: "Pedidos de cambio del supervisor",
    intro: "Aplicalos en la ruta del día o respondé por qué no.",
    badges: pend.length ? badge(`${pend.length} ${pend.length === 1 ? "pendiente" : "pendientes"}`, "alert") : badge("Al día", "neutral"),
    body,
  });
}

/* ---------- 4. Clientes ---------- */

function dogNames(ids) {
  return (Array.isArray(ids) ? ids : []).map((id) => DOG_BY_ID.get(id)?.name || id);
}

function ClienteCard(c) {
  const id = esc(c.id);
  const estado = CLIENTE_ESTADOS.find(([v]) => v === c.estado) || CLIENTE_ESTADOS[0];
  const perros = dogNames(c.perros);
  return `
    <li class="coord-card coord-cliente is-${esc(estado[0])}">
      <div class="coord-card-head">
        <strong>${esc(c.nombre || PENDIENTE)}</strong>
        ${badge(estado[1], estado[0] === "activo" ? "ok" : estado[0] === "pausa" ? "warn" : "neutral")}
      </div>
      ${dataList([
        ["Perros", perros.length ? listJoin(perros) : PENDIENTE],
        ["Barrio", c.barrio],
        ["Plan", c.plan && c.plan !== PENDIENTE ? c.plan : ""],
        ["Días", Array.isArray(c.dias) && c.dias.length ? daysLabel(c.dias) : ""],
        ["Turno", c.turno && c.turno !== PENDIENTE ? c.turno : ""],
        ["Teléfono", c.telefono],
        ["Notas", c.notas],
      ], "is-compact")}
      ${c.pendiente ? `<p class="coord-meta is-pending">${icon("clock", "coord-icon")}<span>Sin señal: se enviará cuando vuelva.</span></p>` : ""}
      <div class="coord-actions">
        ${whatsappLinkTo(c.telefono, `Hola ${c.nombre || ""}, te escribo de Paseos Juan.`.replace(" ,", ","), "secondary", "WhatsApp")}
        ${button("Editar", `id="coord-cli-edit-${id}" data-coord-cliente-edit="${id}"`, "ghost", "sliders")}
      </div>
    </li>
  `;
}

function clientesFiltrados() {
  const q = normalize(clienteQuery);
  const list = getClientes();
  if (!q) return list;
  return list.filter((c) => normalize([c.nombre, c.barrio, c.telefono, c.notas, ...dogNames(c.perros)].join(" ")).includes(q));
}

function clientesListHTML() {
  const list = clientesFiltrados();
  if (!list.length) {
    return `<p class="coord-empty is-small">${!loaded.has("clientes") ? "Cargando clientes…" : clienteQuery ? "Ningún cliente coincide con la búsqueda." : "Todavía no hay clientes cargados."}</p>`;
  }
  return `<ul class="coord-card-list is-grid">${list.map(ClienteCard).join("")}</ul>`;
}

function ClientesSection() {
  const clientes = getClientes();
  const draft = getDraft("cliente");
  const editing = Boolean(draft.id);
  const perros = Array.isArray(draft.perros) ? draft.perros : [];
  const dias = Array.isArray(draft.dias) ? draft.dias : [];
  const activos = clientes.filter((c) => (c.estado || "activo") === "activo").length;
  const dogOptions = REAL_DOGS.slice().sort((a, b) => a.name.localeCompare(b.name, "es"));

  const body = `
    ${feedback("clientes")}
    <div class="coord-field coord-search">
      <label for="coord-clientes-buscar">Buscar cliente</label>
      <input id="coord-clientes-buscar" type="search" value="${esc(clienteQuery)}" data-coord-clientes-buscar placeholder="Tutor, perro o barrio" autocomplete="off" aria-controls="coord-clientes-lista" />
    </div>
    <div id="coord-clientes-lista" aria-live="polite">${clientesListHTML()}</div>

    <form class="coord-form" id="coord-cliente-form" data-coord-form="cliente" novalidate tabindex="-1">
      <h3>${editing ? `Editando a ${esc(draft.nombre || "un cliente")}` : "Cargar un cliente"}</h3>
      ${draft.pedidoId ? `<p class="coord-note">${icon("clipboardCheck", "coord-icon")}<span>Completado con los datos de un pedido. Revisalo antes de guardar.</span></p>` : ""}
      <input type="hidden" name="id" value="${esc(draft.id || "")}" />
      <input type="hidden" name="pedidoId" value="${esc(draft.pedidoId || "")}" />
      <div class="coord-grid">
        ${field("cliente", "nombre", "Nombre del tutor", { value: draft.nombre, required: true, attrs: 'autocomplete="off"' })}
        ${field("cliente", "telefono", "Teléfono", { value: draft.telefono, type: "tel", attrs: 'autocomplete="off" inputmode="tel"', hint: "Celular con código de área (ej.: 11 1234-5678)." })}
        ${field("cliente", "barrio", "Barrio", { value: draft.barrio, attrs: 'list="coord-barrios" autocomplete="off"', hint: "Elegí uno o escribí otro." })}
        ${selectField("cliente", "plan", "Plan", CLIENTE_PLANES, { value: draft.plan || PENDIENTE })}
        ${selectField("cliente", "turno", "Turno", CLIENTE_TURNOS, { value: draft.turno || PENDIENTE })}
        ${selectField("cliente", "estado", "Estado", CLIENTE_ESTADOS, { value: draft.estado || "activo" })}
        <div class="coord-field is-wide">
          <span class="coord-label" id="coord-cliente-perros-label">Perros${perros.length ? ` (${perros.length})` : ""}</span>
          <input id="coord-cliente-perros-buscar" type="search" data-coord-filter-perros placeholder="Filtrar perros" autocomplete="off" aria-label="Filtrar la lista de perros" />
          <div class="coord-checks" role="group" aria-labelledby="coord-cliente-perros-label">
            ${dogOptions.map((dog) => `<label class="coord-check" data-name="${esc(normalize(dog.name))}"><input type="checkbox" id="coord-cliente-perro-${dog.id}" name="perros" value="${dog.id}" ${perros.includes(dog.id) ? "checked" : ""} /><span>${esc(dog.name)} <small>${esc(dog.size)}</small></span></label>`).join("")}
          </div>
          <small>Si el perro todavía no está en el registro, anotalo en notas y cargá su ficha en «Alta de perro nuevo».</small>
        </div>
        ${daysField("cliente", dias)}
        ${textArea("cliente", "notas", "Notas", { value: draft.notas, hint: "Lo operativo: llaves, portería, horarios. Sin datos de salud ni de pago." })}
      </div>
      <datalist id="coord-barrios">${barriosConocidos().map((b) => `<option value="${esc(b)}"></option>`).join("")}</datalist>
      <div class="coord-actions">
        ${button(editing ? "Guardar cambios" : "Guardar cliente", `id="coord-cliente-save" data-coord-cliente-save`, "primary", "plus")}
        ${editing || draft.pedidoId ? button("Cancelar", `data-coord-cliente-cancel`, "ghost") : ""}
      </div>
    </form>
  `;
  return section({
    key: "clientes",
    id: "coord-clientes",
    iconName: "users",
    title: "Clientes",
    intro: "Tutores, sus perros, plan, días y turno. Solo lo ven Juan y coordinación.",
    badges: clientes.length ? badge(`${activos} ${activos === 1 ? "activo" : "activos"}`, "neutral") : "",
    body,
  });
}

/* ---------- 5. Avisos por barrio ---------- */

function AvisosSection() {
  const draft = getDraft("aviso");
  const hoy = hoyAR();
  const all = getAvisos();
  const vigentes = all.filter((a) => avisoVigente(a, hoy));
  const viejos = all.filter((a) => !avisoVigente(a, hoy)).slice(0, 20);
  const body = `
    ${feedback("avisos")}
    <form class="coord-form" data-coord-form="aviso" novalidate>
      <h3>Cargar un aviso</h3>
      <div class="coord-grid">
        ${field("aviso", "barrio", "Barrio", { value: draft.barrio, required: true, attrs: 'list="coord-barrios-aviso" autocomplete="off"' })}
        ${selectField("aviso", "tipo", "Tipo", AVISO_TIPOS, { value: draft.tipo || AVISO_TIPOS[0] })}
        ${field("aviso", "vigenteHasta", "Vigente hasta", { value: draft.vigenteHasta || hoy, type: "date", attrs: `min="${hoy}"` })}
        ${textArea("aviso", "mensaje", "Qué pasa", { value: draft.mensaje, required: true, placeholder: "Ej.: Corte de calle en la entrada principal. Entrar por la puerta 2." })}
      </div>
      <datalist id="coord-barrios-aviso">${barriosConocidos().map((b) => `<option value="${esc(b)}"></option>`).join("")}</datalist>
      <div class="coord-actions">${button("Guardar aviso", `id="coord-aviso-save" data-coord-aviso-save`, "primary", "plus")}</div>
    </form>
    <div class="coord-subblock">
      <h3>Vigentes <span>${vigentes.length}</span></h3>
      ${vigentes.length ? `<p class="coord-meta">Están arriba, agrupados por barrio.</p>` : `<p class="coord-empty is-small">${loaded.has("avisos") ? "No hay avisos vigentes." : "Cargando…"}</p>`}
    </div>
    ${viejos.length ? `
      <details class="coord-more" ${isOpen("avisosViejos") ? "open" : ""}>
        <summary data-coord-toggle="avisosViejos">Avisos vencidos (${viejos.length}) ${icon("chevronDown", "coord-icon")}</summary>
        <ul class="coord-aviso-list">${viejos.map((a) => AvisoCard(a, { history: true })).join("")}</ul>
      </details>` : ""}
  `;
  return section({
    key: "avisos",
    id: "coord-avisos",
    iconName: "mapPin",
    title: "Avisos por barrio",
    intro: "Obras, cortes, perros sueltos, clima o seguridad. Los ve todo el equipo.",
    badges: vigentes.length ? badge(`${vigentes.length} ${vigentes.length === 1 ? "vigente" : "vigentes"}`, "warn") : "",
    body,
  });
}

/* ---------- 6. Pedidos de clientes y evaluaciones ---------- */

function webData(pedido) {
  const d = pedido.datos || {};
  const bite = d.mordida && d.mordida !== "No";
  const perro = [d.edad, d.tamano, d.raza].filter(Boolean).join(" · ");
  const servicio = [d.tipo, d.horario, d.dias].filter(Boolean).join(" · ");
  return dataList([
    ["Perro", perro ? `${d.perro || PENDIENTE} (${perro})` : d.perro || PENDIENTE],
    ["Mordió o intentó morder", d.mordida, bite ? "alert" : ""],
    ["Con otros perros", d.perros, d.perros === "No" ? "warn" : ""],
    ["Energía", d.energia],
    ["Conducta", d.conducta],
    ["Responsable", d.responsable],
    ["Teléfono", d.telefono],
    ["Zona", [d.zona, d.referencia].filter(Boolean).join(" · ")],
    ["Quiere", servicio],
    ["Comentario", d.comentario],
  ]);
}

function PedidoCard(pedido, fichaPorPedido, clientePorPedido) {
  const estado = estadoDe(pedido);
  const isWeb = pedido.origen === "web";
  const d = pedido.datos || {};
  const id = esc(pedido.id);
  const ficha = fichaPorPedido.get(pedido.id);
  const cliente = clientePorPedido.get(pedido.id);
  const moves = {
    nuevo: button("Empezar", `data-coord-pedido-move="${id}" data-estado="en-curso"`, "secondary") + button("Resolver", `data-coord-pedido-move="${id}" data-estado="resuelto"`, "ghost"),
    "en-curso": button("Resolver", `data-coord-pedido-move="${id}" data-estado="resuelto"`, "secondary") + button("Volver a nuevo", `data-coord-pedido-move="${id}" data-estado="nuevo"`, "ghost"),
    resuelto: button("Reabrir", `data-coord-pedido-move="${id}" data-estado="en-curso"`, "secondary"),
  }[estado];
  const memKey = `pedido-${pedido.id}`;
  const showDataOpen = estado !== "resuelto" || openCards.has(memKey);
  const canFicha = (isWeb || /evaluaci/i.test(pedido.tipo || "")) && !ficha && estado !== "resuelto";
  const details = isWeb
    ? estado === "resuelto"
      ? `<details class="coord-card-more" ${showDataOpen ? "open" : ""}><summary data-coord-mem-toggle="${esc(memKey)}">Ver datos del formulario ${icon("chevronDown", "coord-icon")}</summary>${webData(pedido)}</details>`
      : webData(pedido)
    : `<p class="coord-card-dog">${icon("pawPrint", "coord-icon")}${esc(pedidoPerro(pedido) || PENDIENTE)}</p>${pedido.detalle ? `<p>${esc(pedido.detalle)}</p>` : ""}`;
  const saludo = d.responsable ? `Hola ${d.responsable}` : "Hola";
  return `
    <li class="coord-card ${isWeb ? "is-web" : ""}" id="coord-pedido-${id}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${esc(isWeb ? d.perro || PENDIENTE : pedido.tipo || "Pedido")}</strong>
        <small>${isWeb ? esc(pedido.tipo || "Formulario web") : `${esc(fmtDate(pedido.fecha))}${d.canal ? ` · ${esc(d.canal)}` : ""}`}</small>
      </div>
      ${isWeb ? `<p class="coord-badges">${badge("Formulario web", "warn")}</p>` : ""}
      ${details}
      ${whoLine(pedido, { web: isWeb })}
      ${ficha ? `<p class="coord-done">${icon("checkCircle", "coord-icon")}<span>Ficha creada para ${esc(ficha.perroNombre)}</span></p>` : ""}
      ${cliente ? `<p class="coord-done">${icon("checkCircle", "coord-icon")}<span>Cliente cargado: ${esc(cliente.nombre)}</span></p>` : ""}
      <div class="coord-actions">
        ${estado !== "resuelto" && isWeb ? whatsappLinkTo(d.telefono, `${saludo}, te escribo de Paseos Juan por el pedido de evaluación de ${d.perro || "tu perro"}.`, "primary") : ""}
        ${moves}
        ${!cliente && (isWeb || d.responsable) ? button("Convertir en cliente", `data-coord-pedido-cliente="${id}"`, "ghost", "userPlus") : ""}
        ${canFicha ? button("Armar ficha con estos datos", `data-coord-pedido-ficha="${id}"`, "ghost", "fileText") : ""}
        ${estado === "resuelto" && canDelete(pedido) ? button("Borrar", `data-coord-pedido-delete="${id}"`, "ghost") : ""}
      </div>
    </li>
  `;
}

function RequestsSection() {
  const pedidos = getPedidos();
  const draft = getDraft("pedido");
  const open = pedidos.filter((p) => estadoDe(p) !== "resuelto").length;
  const web = webNuevos(pedidos).length;
  const fichaPorPedido = new Map(getFichas().filter((f) => f.datos?.pedidoId).map((f) => [f.datos.pedidoId, f]));
  const clientePorPedido = new Map(getClientes().filter((c) => c.pedidoId).map((c) => [c.pedidoId, c]));
  const isLoading = !loaded.has("pedidos") && !pedidos.length;
  const body = `
    ${feedback("pedidos")}
    <div class="coord-board">
      ${PEDIDO_COLUMNAS.map(([estado, label]) => {
        const items = pedidos.filter((p) => estadoDe(p) === estado);
        if (estado === "nuevo") items.sort((a, b) => Number(b.origen === "web") - Number(a.origen === "web"));
        return `
          <section class="coord-column" aria-labelledby="coord-col-${estado}">
            <h3 id="coord-col-${estado}">${label} <span>${items.length}</span></h3>
            ${items.length
              ? `<ul class="coord-card-list">${items.map((p) => PedidoCard(p, fichaPorPedido, clientePorPedido)).join("")}</ul>`
              : `<p class="coord-empty is-small">${isLoading ? "Cargando…" : estado === "nuevo" ? "Sin pedidos nuevos." : estado === "en-curso" ? "Nada en curso." : "Todavía no hay resueltos."}</p>`}
          </section>
        `;
      }).join("")}
    </div>
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${selectField("pedido", "tipo", "Tipo de pedido", PEDIDO_TIPOS, { value: draft.tipo })}
        ${field("pedido", "perro", "Perro", { value: draft.perro, placeholder: "Nombre del perro o «perro nuevo»", attrs: 'list="coord-dog-names" autocomplete="off"' })}
        ${selectField("pedido", "canal", "Llegó por", PEDIDO_CANALES, { value: draft.canal })}
        ${textArea("pedido", "detalle", "Qué hay que resolver", { value: draft.detalle, hint: "Sin teléfonos ni domicilios: solo lo necesario para resolverlo." })}
      </div>
      <datalist id="coord-dog-names">${REAL_DOGS.map((dog) => `<option value="${esc(dog.name)}"></option>`).join("")}</datalist>
      <div class="coord-actions">${button("Guardar pedido", "data-coord-pedido-save", "primary", "plus")}</div>
    </form>
  `;
  return section({
    key: "pedidos",
    id: "coord-pedidos",
    iconName: "clipboardCheck",
    title: "Pedidos y evaluaciones",
    intro: "Los del formulario de la web y los que cargás vos.",
    badges: `${web ? badge(`${web} ${web === 1 ? "nuevo" : "nuevos"} de la web`, "alert") : ""}${open ? badge(`${open} abiertos`, "warn") : badge("Sin pedidos abiertos", "neutral")}`,
    body,
    open: web > 0,
  });
}

function draftClienteFromPedido(pedido) {
  const d = pedido.datos || {};
  const dog = DOG_BY_NAME.get(normalize(d.perro));
  return {
    pedidoId: pedido.id,
    nombre: d.responsable || "",
    telefono: d.telefono || "",
    barrio: [d.zona, d.referencia].filter(Boolean).join(" · "),
    perros: dog ? [dog.id] : [],
    plan: PENDIENTE,
    dias: parseDays(d.dias),
    turno: ["Mañana", "Tarde"].includes(d.horario) ? d.horario : PENDIENTE,
    estado: "activo",
    notas: [`Desde el pedido del ${fmtDate(pedido.fecha)}.`, !dog && d.perro ? `Perro: ${d.perro} (todavía sin ficha en el registro).` : ""].filter(Boolean).join(" "),
  };
}

/* ---------- 7. Datos a confirmar ---------- */

function ReviewCard(dog, record) {
  const who = record ? record.actualizadoPorNombre || record.creadoPorNombre : "";
  return `
    <li class="coord-review ${record ? "is-resolved" : ""}" id="coord-dato-${dog.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${esc(dog.name)} <small>${dog.id}</small></h3>
        ${dog.status !== "Activo" ? badge(esc(dog.status), "alert") : badge("Activo", "neutral")}
      </div>
      <p class="coord-review-meta">${esc(dog.plan)} · ${esc(dog.size)} · ${esc(scheduleLabel(dog))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${esc(dog.review || `Estado "${dog.status}".`)}</p>
      ${safetyChips(dog)}
      ${record?.nota ? `<p class="coord-meta">${esc(record.nota)}</p>` : ""}
      <div class="coord-actions">
        ${record
          ? `<p class="coord-done">${icon("checkCircle", "coord-icon")}<span>Resuelto${who ? ` por ${esc(who)}` : ""}${record.actualizadoEn ? ` el ${fmtStamp(record.actualizadoEn)}` : ""}${record.pendiente ? " (sin señal: se enviará cuando vuelva)" : ""}</span></p>${button("Deshacer", `data-coord-unresolve="${dog.id}"`, "ghost")}`
          : button("Marcar como resuelto", `data-coord-resolve="${dog.id}"`, "primary", "checkCircle")}
      </div>
    </li>
  `;
}

function ReviewSection() {
  const resolved = getResolved();
  const pending = REVIEW_DOGS.filter((dog) => !resolved[dog.id]);
  const done = REVIEW_DOGS.filter((dog) => resolved[dog.id]);
  const body = `
    <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
    ${feedback("datos")}
    ${pending.length ? `<ul class="coord-review-list">${pending.map((dog) => ReviewCard(dog)).join("")}</ul>` : `<p class="coord-empty">${icon("checkCircle", "coord-icon")}No quedan datos por confirmar.</p>`}
    ${done.length ? `
      <details class="coord-more" ${isOpen("datosResueltos") ? "open" : ""}>
        <summary data-coord-toggle="datosResueltos">Resueltos (${done.length}) ${icon("chevronDown", "coord-icon")}</summary>
        <ul class="coord-review-list">${done.map((dog) => ReviewCard(dog, resolved[dog.id])).join("")}</ul>
      </details>` : ""}
    <p class="coord-note">${icon("fileText", "coord-icon")}<span>El cambio todavía debe incorporarse al ${esc(BUSINESS_INFO.officialSources.dogs.toLowerCase())}.</span></p>
  `;
  return section({
    key: "datos",
    id: "coord-datos",
    iconName: "help",
    title: "Datos a confirmar",
    intro: `${done.length} de ${REVIEW_DOGS.length} resueltos.`,
    badges: pending.length ? badge(`${pending.length} pendientes`, "warn") : badge("Todo confirmado", "ok"),
    body,
  });
}

/* ---------- 8. Alta de perro nuevo ---------- */

const SI_NO = [PENDIENTE, "Sí", "No"];

function IntakeSection() {
  const draft = getDraft("alta");
  const fichas = getFichas();
  const days = Array.isArray(draft.dias) ? draft.dias : [];
  const planOptions = [PENDIENTE, ...REAL_PLANS.map((plan) => `${plan.name} (${plan.walks} paseos por semana)`), "Paseo suelto"];
  const body = `
    <div class="coord-rule" role="note">
      ${icon("shieldCheck", "coord-icon")}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${feedback("alta")}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${draft.pedidoId ? `<p class="coord-note">${icon("clipboardCheck", "coord-icon")}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>` : ""}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${field("alta", "nombre", "Nombre del perro", { value: draft.nombre, required: true })}
          ${selectField("alta", "tamano", "Tamaño", [PENDIENTE, "Pequeño", "Mediano", "Grande"], { value: draft.tamano })}
          ${field("alta", "raza", "Raza o cruza", { value: draft.raza })}
          ${field("alta", "edad", "Edad aproximada", { value: draft.edad })}
          ${selectField("alta", "sexo", "Sexo", [PENDIENTE, "Macho", "Hembra"], { value: draft.sexo })}
          ${selectField("alta", "castrado", "Castrado o castrada", SI_NO, { value: draft.castrado })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${field("alta", "tutor", "Nombre del tutor", { value: draft.tutor, attrs: 'autocomplete="off"' })}
          ${field("alta", "contacto", "Contacto del tutor", { value: draft.contacto, type: "tel", attrs: 'autocomplete="off"' })}
          ${field("alta", "emergencia", "Contacto de emergencia", { value: draft.emergencia, attrs: 'autocomplete="off"' })}
          ${selectField("alta", "zona", "Zona", [PENDIENTE, "Pilar", "La Lonja", "Otra zona"], { value: draft.zona })}
          ${field("alta", "referencia", "Barrio o referencia", { value: draft.referencia, attrs: 'autocomplete="off"' })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${selectField("alta", "vacunas", "Vacunas al día", SI_NO, { value: draft.vacunas })}
          ${field("alta", "veterinario", "Veterinaria de referencia", { value: draft.veterinario })}
          ${textArea("alta", "salud", "Condiciones, alergias o medicación", { value: draft.salud, hint: "Lo que dice el tutor. Sin diagnósticos propios." })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${selectField("alta", "sujecion", "Collar o pechera", [PENDIENTE, "Collar", "Pechera", "Collar y pechera"], { value: draft.sujecion })}
          ${selectField("alta", "bozal", "Usa bozal", SI_NO, { value: draft.bozal })}
          ${selectField("alta", "correa", "Tiene correa propia", SI_NO, { value: draft.correa })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${draft.relatoTutor ? textArea("alta", "relatoTutor", "Lo que contó el tutor en el formulario (no observado)", { value: draft.relatoTutor, attrs: "readonly" }) : ""}
          ${textArea("alta", "conPerros", "Con otros perros", { value: draft.conPerros, span: false })}
          ${textArea("alta", "conPersonas", "Con personas", { value: draft.conPersonas, span: false })}
          ${textArea("alta", "estimulos", "Situaciones que lo alteran", { value: draft.estimulos, placeholder: "Ej.: motos, bicicletas, ruidos fuertes", span: false })}
          ${field("alta", "noJuntar", "No juntar con", { value: draft.noJuntar, attrs: 'list="coord-dog-names" autocomplete="off"' })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${selectField("alta", "plan", "Plan pedido", planOptions, { value: draft.plan })}
          ${selectField("alta", "turno", "Turno", [PENDIENTE, "Mañana", "Tarde"], { value: draft.turno })}
          ${daysField("alta", days)}
        </div>
      </fieldset>
      <div class="coord-actions">
        ${button("Guardar ficha", "data-coord-alta-save", "primary", "plus")}
        ${button("Vaciar formulario", "data-coord-alta-clear", "ghost")}
      </div>
    </form>
    <div class="coord-subblock">
      <h3>Fichas cargadas <span>${fichas.length}</span></h3>
      ${fichas.length ? `
        <ul class="coord-card-list is-grid">
          ${fichas.map((ficha) => {
            const a = ficha.datos || {};
            const dias = Array.isArray(a.dias) ? a.dias : [];
            return `
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${esc(ficha.perroNombre || a.nombre || PENDIENTE)}</strong>
                <small>Alta ${esc(fmtDate(ficha.fecha))}</small>
              </div>
              <p class="coord-badges">${badge(esc(ficha.categoria || "SIN EVALUAR"), "neutral")} ${badge("Primer paseo individual", "warn")}</p>
              <p>${esc(!a.tamano || a.tamano === PENDIENTE ? "Tamaño pendiente" : a.tamano)} · Días: ${dias.length ? esc(daysLabel(dias).toLowerCase()) : "pendientes"} · Turno: ${esc(!a.turno || a.turno === PENDIENTE ? "pendiente" : a.turno.toLowerCase())}</p>
              ${whoLine(ficha)}
              <div class="coord-actions">
                ${button("Copiar ficha", `data-coord-alta-copy="${esc(ficha.id)}"`, "ghost", "copy")}
                ${canDelete(ficha) ? button("Borrar", `data-coord-alta-delete="${esc(ficha.id)}"`, "ghost") : ""}
              </div>
            </li>`;
          }).join("")}
        </ul>` : `<p class="coord-empty is-small">${loaded.has("fichas") ? "Todavía no hay perros nuevos cargados." : "Cargando fichas…"}</p>`}
    </div>
  `;
  return section({
    key: "alta",
    id: "coord-alta",
    iconName: "userPlus",
    title: "Alta de perro nuevo",
    intro: "Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.",
    badges: fichas.length ? badge(`${fichas.length} ${fichas.length === 1 ? "cargada" : "cargadas"}`, "neutral") : "",
    body,
  });
}

function altaText(ficha) {
  const a = ficha.datos || {};
  const v = (value) => value || PENDIENTE;
  return [
    `Ficha de alta: ${ficha.perroNombre || a.nombre} (cargada el ${fmtDate(ficha.fecha)}${ficha.creadoPorNombre ? ` por ${ficha.creadoPorNombre}` : ""})`,
    `Categoría: ${ficha.categoria || "SIN EVALUAR"}. Primer paseo: individual.`,
    `Identificación: ${v(a.tamano)}; raza o cruza: ${v(a.raza)}; edad: ${v(a.edad)}; sexo: ${v(a.sexo)}; castrado/a: ${v(a.castrado)}.`,
    `Tutor: ${v(a.tutor)}; contacto: ${v(a.contacto)}; emergencia: ${v(a.emergencia)}; zona: ${v(a.zona)}${a.referencia ? ` (${a.referencia})` : ""}.`,
    `Salud: vacunas al día: ${v(a.vacunas)}; veterinaria: ${v(a.veterinario)}; observaciones: ${v(a.salud)}.`,
    `Equipo: ${v(a.sujecion)}; bozal: ${v(a.bozal)}; correa propia: ${v(a.correa)}.`,
    a.relatoTutor ? `Lo que contó el tutor (no observado): ${a.relatoTutor.replace(/\n/g, "; ")}.` : "",
    `Con otros perros: ${v(a.conPerros)}. Con personas: ${v(a.conPersonas)}. Lo alteran: ${v(a.estimulos)}. No juntar con: ${a.noJuntar || "Sin indicación"}.`,
    `Servicio: ${v(a.plan)}; días: ${Array.isArray(a.dias) && a.dias.length ? a.dias.join(", ") : PENDIENTE}; turno: ${v(a.turno)}.`,
  ].filter(Boolean).join("\n");
}

function draftFromPedido(pedido) {
  const d = pedido.datos || {};
  const zona = ["Pilar", "La Lonja"].find((z) => normalize(d.zona) === normalize(z));
  const relato = [
    d.energia ? `Energía: ${d.energia}` : "",
    d.perros ? `Se lleva bien con otros perros: ${d.perros}` : "",
    d.mordida ? `Mordió o intentó morder: ${d.mordida}` : "",
    d.conducta ? `Conducta: ${d.conducta}` : "",
    d.comentario ? `Comentario: ${d.comentario}` : "",
  ].filter(Boolean).join("\n");
  return {
    pedidoId: pedido.id,
    nombre: d.perro || "",
    tamano: ["Pequeño", "Mediano", "Grande"].includes(d.tamano) ? d.tamano : PENDIENTE,
    raza: d.raza || "",
    edad: d.edad || "",
    tutor: d.responsable || "",
    contacto: d.telefono || "",
    zona: zona || (d.zona ? "Otra zona" : PENDIENTE),
    referencia: [zona ? "" : d.zona, d.referencia].filter(Boolean).join(" · "),
    relatoTutor: relato,
    turno: ["Mañana", "Tarde"].includes(d.horario) ? d.horario : PENDIENTE,
    dias: parseDays(d.dias),
  };
}

/* ---------- 9. Observaciones e incidentes (solo lectura) ---------- */

function dogNameFor(record) {
  if (record.perroNombre) return record.perroNombre;
  const ids = Array.isArray(record.perros) ? record.perros : record.perroId ? [record.perroId] : [];
  const names = ids.map((id) => DOG_BY_ID.get(id)?.name || id);
  return names.length ? listJoin(names) : "";
}

function byMoment(a, b) {
  return `${b.fecha || ""} ${b.hora || ""}`.localeCompare(`${a.fecha || ""} ${a.hora || ""}`) || byNewest(a, b);
}

function ActivityItem(record, kind) {
  const dog = dogNameFor(record);
  const title = record.titulo || (kind === "incidente" ? "Incidente" : "Observación");
  const riesgo = record.riesgo ? String(record.riesgo) : "";
  const rows = kind === "incidente"
    ? [["Perro", dog], ["Lugar", record.lugar], ["Barrio", record.barrio], ["Antes", record.antes], ["Conducta", record.conducta], ["Acción", record.accion], ["Después", record.despues], ["Lesiones", record.lesiones, record.lesiones && !/^no/i.test(record.lesiones) ? "alert" : ""], ["Protocolo", record.protocolo]]
    : [["Perro", dog], ["Lugar", record.lugar], ["Estímulo", record.estimulo], ["Reacción", record.reaccion], ["Acción", record.accion], ["Resultado", record.resultado]];
  return `
    <li class="coord-card coord-feed-item ${kind === "incidente" ? "is-incident" : ""}">
      <div class="coord-card-head">
        <strong>${esc(title)}</strong>
        <small>${esc(fmtDate(record.fecha))}${record.hora ? ` · ${esc(record.hora)}` : ""}</small>
      </div>
      ${riesgo ? `<p class="coord-badges">${badge(`Riesgo: ${esc(riesgo)}`, /alto|grave/i.test(riesgo) ? "alert" : "warn")}</p>` : ""}
      ${dataList(rows)}
      ${whoLine(record)}
    </li>
  `;
}

function ActivitySection() {
  const desde = haceDias(6);
  const incidentes = cached("incidentes").filter((r) => !r.fecha || r.fecha >= desde).sort(byMoment);
  const observaciones = cached("observaciones").filter((r) => !r.fecha || r.fecha >= desde).sort(byMoment);
  const body = `
    <p class="coord-note">${icon("eye", "coord-icon")}<span>Solo lectura. Las cargan los paseadores y supervisión. Últimos 7 días (desde el ${esc(fmtDate(desde))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${incidentes.length}</span></h3>
        ${incidentes.length ? `<ul class="coord-card-list">${incidentes.map((r) => ActivityItem(r, "incidente")).join("")}</ul>` : `<p class="coord-empty is-small">${loaded.has("incidentes") ? "Sin incidentes en los últimos 7 días." : "Cargando…"}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${observaciones.length}</span></h3>
        ${observaciones.length ? `<ul class="coord-card-list">${observaciones.map((r) => ActivityItem(r, "observacion")).join("")}</ul>` : `<p class="coord-empty is-small">${loaded.has("observaciones") ? "Sin observaciones en los últimos 7 días." : "Cargando…"}</p>`}
      </section>
    </div>
  `;
  return section({
    key: "actividad",
    id: "coord-actividad",
    iconName: "activity",
    title: "Observaciones e incidentes",
    intro: "Lo que registró el equipo en la calle en los últimos 7 días.",
    badges: `${incidentes.length ? badge(`${incidentes.length} ${incidentes.length === 1 ? "incidente" : "incidentes"}`, "alert") : ""}${observaciones.length ? badge(`${observaciones.length} ${observaciones.length === 1 ? "observación" : "observaciones"}`, "neutral") : ""}`,
    body,
  });
}

/* ------------------------------------------------------------------ */
/* Eventos                                                             */
/* ------------------------------------------------------------------ */

function openAndGo(key, id, focusSelector) {
  setOpen(key, true);
  render();
  goTo(id, focusSelector);
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Se intenta de la otra forma.
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

function copyAndTell(text, sectionKey, okText) {
  copyText(text).then((ok) => {
    setFlash(sectionKey, ok ? okText : "No se pudo copiar. Probá de nuevo o copialo a mano.", ok ? "ok" : "error");
    scheduleRerender();
  });
}

function findIn(list, id) {
  return list.find((item) => item.id === id);
}

function showRoutesDay(fecha) {
  rutasFecha = fecha;
  setRutasVista("dia");
  render();
  goTo("coord-rutas");
}

async function saveEditor(destino) {
  const error = editorError();
  if (error) {
    setFlash("editor", error[0], "error");
    render();
    focusById(error[1]);
    return;
  }
  const record = routeRecordFromEditor();
  const e = editor;
  let saved;
  if (destino === "plantilla") {
    saved = await guardar("plantillas", { id: plantillaId(record.ruta, record.dia), ...record }, { section: "rutas", ok: `${record.ruta} del ${record.dia.toLowerCase()} guardada en la semana. Se repite todas las semanas.` });
  } else {
    const fecha = e.modo === "plantilla" ? e.soloDia : e.fecha;
    if (!isISODate(fecha)) {
      setFlash("editor", "Elegí el día.", "error");
      render();
      return;
    }
    saved = await guardar("rutas", { id: rutaDiaId(fecha, record.ruta), fecha, ...record, dia: dayNameISO(fecha), basadaEn: e.plantillaId || "" }, { section: "rutas", ok: `${record.ruta}: cambio guardado solo para el ${dayLabel(fecha).toLowerCase()}. La semana no cambió.` });
    if (saved && e.solicitudId) {
      const sol = getSolicitudes().find((s) => s.id === e.solicitudId);
      // `solicitudes` es por fecha: el servidor pide la fecha también al actualizar.
      await guardar("solicitudes", { id: e.solicitudId, fecha: isISODate(sol?.fecha) ? sol.fecha : fecha, estado: "aplicado", respuesta: e.respuesta.trim() || `Aplicado en la ruta ${record.ruta} del ${fmtDate(fecha)}.` }, { section: "rutas", ok: `Cambio aplicado y pedido del supervisor marcado como aplicado.` });
    }
    if (saved) {
      rutasFecha = fecha;
      setRutasVista("dia");
    }
  }
  if (saved && editor === e) {
    closeEditor();
    render();
    goTo("coord-rutas");
  }
}

function handleCoordinadorClick(event) {
  if (!event.target.closest(".coord-shell")) return false;
  const t = event.target;

  const toggle = t.closest("[data-coord-toggle]");
  if (toggle) {
    const details = toggle.parentElement;
    setOpen(toggle.dataset.coordToggle, !details.open);
    return true;
  }

  const memToggle = t.closest("[data-coord-mem-toggle]");
  if (memToggle) {
    const key = memToggle.dataset.coordMemToggle;
    if (memToggle.parentElement.open) openCards.delete(key);
    else openCards.add(key);
    return true;
  }

  if (t.closest("[data-coord-retry]")) {
    retrySync();
    migrationDone = false;
    announce("Volviendo a pedir los datos.");
    return true;
  }

  const goto = t.closest("[data-coord-goto]");
  if (goto) {
    goTo(goto.dataset.coordGoto);
    return true;
  }

  const gotoPedido = t.closest("[data-coord-goto-pedido]");
  if (gotoPedido) {
    openAndGo("pedidos", `coord-pedido-${gotoPedido.dataset.coordGotoPedido}`);
    return true;
  }

  const openSection = t.closest("[data-coord-open]");
  if (openSection) {
    const key = openSection.dataset.coordOpen;
    const focus = { avisos: "#coord-aviso-barrio", clientes: "#coord-clientes-buscar" }[key] || null;
    openAndGo(key, `coord-${key}`, focus);
    return true;
  }

  const undo = t.closest("[data-coord-undo]");
  if (undo) {
    const deleted = lastDeleted;
    lastDeleted = null;
    if (deleted) {
      const { pendiente, ...record } = deleted.record;
      run("undo", () => guardar(deleted.col, record, { section: deleted.section, ok: "Listo, se recuperó." }));
    }
    return true;
  }

  /* ---------- Rutas ---------- */

  const vista = t.closest("[data-coord-vista]");
  if (vista) {
    setRutasVista(vista.dataset.coordVista);
    render();
    focusById(`coord-vista-${vista.dataset.coordVista}`);
    return true;
  }

  const verDia = t.closest("[data-coord-ver-dia]");
  if (verDia) {
    if (editor) {
      goTo("coord-rutas");
      return true;
    }
    showRoutesDay(verDia.dataset.coordVerDia);
    return true;
  }

  if (t.closest("[data-coord-carga]")) {
    cargaConfirm = true;
    render();
    focusById("coord-carga-ok");
    return true;
  }

  if (t.closest("[data-coord-carga-cancel]")) {
    cargaConfirm = false;
    render();
    focusById("coord-carga");
    return true;
  }

  if (t.closest("[data-coord-carga-ok]")) {
    run("carga", async () => {
      const base = plantillasDesdePlanilla();
      let ok = 0;
      let pend = 0;
      let lastError = "";
      for (const p of base) {
        cargaProgreso = `Guardando ${ok + 1} de ${base.length}…`;
        scheduleRerender();
        try {
          const result = await registros.save("plantillas", p);
          ok += 1;
          if (result.pendiente) pend += 1;
        } catch (error) {
          lastError = error.message;
        }
      }
      cargaConfirm = false;
      cargaProgreso = "";
      if (lastError) setFlash("rutas", `Se guardaron ${ok} de ${base.length} rutas. Error: ${lastError}`, "error");
      else setFlash("rutas", `Listo: ${ok} rutas cargadas en la semana.${pend ? " Sin señal: se envían cuando vuelva." : ""}`);
      setRutasVista("semana");
      scheduleRerender();
    });
    return true;
  }

  const editPlantilla = t.closest("[data-coord-edit-plantilla]");
  if (editPlantilla) {
    const p = findIn(getPlantillas(), editPlantilla.dataset.coordEditPlantilla);
    if (p) {
      openEditor(p, { modo: "plantilla" });
      render();
      goTo("coord-editor");
    }
    return true;
  }

  const newRoute = t.closest("[data-coord-new-route]");
  if (newRoute) {
    const { dia, turno } = newRoute.dataset;
    openEditor({ ruta: nextRouteCode(plantillasDe(dia), turno), dia, turno, paradas: [], supervisor: "" }, { modo: "plantilla", nuevo: true });
    render();
    goTo("coord-editor", "#coord-ed-ruta");
    return true;
  }

  const editDia = t.closest("[data-coord-edit-dia]");
  if (editDia) {
    const fecha = editDia.dataset.fecha;
    const r = effectiveRoutes(fecha).find((x) => x.ruta === editDia.dataset.coordEditDia);
    if (r) {
      openEditor(r, { modo: "dia", fecha });
      render();
      goTo("coord-editor");
    }
    return true;
  }

  const newDia = t.closest("[data-coord-new-dia]");
  if (newDia) {
    const { fecha, turno } = newDia.dataset;
    openEditor({ ruta: nextRouteCode(effectiveRoutes(fecha), turno), dia: dayNameISO(fecha), turno, paradas: [] }, { modo: "dia", fecha, nuevo: true });
    render();
    goTo("coord-editor", "#coord-ed-ruta");
    return true;
  }

  const copyRuta = t.closest("[data-coord-copy-ruta]");
  if (copyRuta) {
    const fecha = copyRuta.dataset.fecha;
    const r = effectiveRoutes(fecha).find((x) => x.ruta === copyRuta.dataset.coordCopyRuta);
    if (r) copyAndTell(routeText(r, { fecha }), "rutas", `${r.ruta} copiada. Pegala en el grupo de WhatsApp del equipo.`);
    return true;
  }

  const copyDia = t.closest("[data-coord-copy-dia]");
  if (copyDia) {
    const fecha = copyDia.dataset.coordCopyDia;
    const text = effectiveRoutes(fecha).map((r) => routeText(r, { fecha })).join("\n\n");
    copyAndTell(text, "rutas", `Rutas del ${dayLabel(fecha).toLowerCase()} copiadas.`);
    return true;
  }

  // Editor
  if (editor) {
    const addDog = t.closest("[data-coord-add-dog]");
    if (addDog) {
      const dog = DOG_BY_ID.get(addDog.dataset.coordAddDog);
      if (dog) {
        addStop(dog);
        announce(`${dog.name} agregado a las ${editor.paradas[editor.paradas.length - 1].hora}.`);
        render();
        focusById("coord-ed-buscar");
      }
      return true;
    }
    if (t.closest("[data-coord-add-libre]")) {
      const nombre = editorQuery.trim();
      if (nombre) {
        addStop(null, nombre);
        announce(`${nombre} agregado como perro sin ficha.`);
        render();
        focusById("coord-ed-buscar");
      }
      return true;
    }
    const up = t.closest("[data-coord-stop-up]");
    const down = t.closest("[data-coord-stop-down]");
    if (up || down) {
      const i = Number((up || down).dataset[up ? "coordStopUp" : "coordStopDown"]);
      const j = up ? i - 1 : i + 1;
      if (j >= 0 && j < editor.paradas.length) {
        [editor.paradas[i], editor.paradas[j]] = [editor.paradas[j], editor.paradas[i]];
        editor.sucio = true;
        render();
        const target = document.getElementById(`coord-ed-${up ? "up" : "down"}-${j}`);
        focusById(target && !target.disabled ? target.id : `coord-ed-hora-${j}`);
        announce(`${editor.paradas[j].perroNombre} ahora es la parada ${j + 1}.`);
      }
      return true;
    }
    const del = t.closest("[data-coord-stop-del]");
    if (del) {
      const i = Number(del.dataset.coordStopDel);
      const [removed] = editor.paradas.splice(i, 1);
      editor.sucio = true;
      announce(`${removed?.perroNombre || "Perro"} quitado de la ruta.`);
      render();
      focusById(editor.paradas.length ? `coord-ed-hora-${Math.min(i, editor.paradas.length - 1)}` : "coord-ed-buscar");
      return true;
    }
    if (t.closest("[data-coord-ed-sort]")) {
      sortStops();
      announce("Paradas ordenadas por hora.");
      render();
      focusById("coord-ed-sort");
      return true;
    }
    const save = t.closest("[data-coord-ed-save]");
    if (save) {
      run("editor-save", () => saveEditor(save.dataset.coordEdSave));
      return true;
    }
    if (t.closest("[data-coord-ed-revert]")) {
      const record = editor.existeDia;
      run("editor-revert", async () => {
        const ok = await borrar("rutas", record, { section: "rutas", ok: `${record.ruta} del ${fmtDate(record.fecha)} vuelve a ser igual que la semana.`, undo: false });
        if (ok) {
          closeEditor();
          scheduleRerender();
        }
      });
      return true;
    }
    if (t.closest("[data-coord-ed-copy]")) {
      const text = routeText(routeRecordFromEditor(), editor.modo === "dia" ? { fecha: editor.fecha } : {});
      copyAndTell(text, "editor", "Ruta copiada. Pegala en el grupo de WhatsApp del equipo.");
      return true;
    }
    if (t.closest("[data-coord-ed-close]")) {
      if (editor.sucio) {
        editorConfirm = "salir";
        render();
        focusById("coord-ed-close-cancel");
      } else {
        closeEditor();
        render();
        goTo("coord-rutas");
      }
      return true;
    }
    if (t.closest("[data-coord-ed-close-ok]")) {
      closeEditor();
      render();
      goTo("coord-rutas");
      return true;
    }
    if (t.closest("[data-coord-ed-close-cancel]")) {
      editorConfirm = "";
      render();
      focusById("coord-ed-close");
      return true;
    }
  }

  /* ---------- Pedidos de cambio del supervisor ---------- */

  const aplicar = t.closest("[data-coord-sol-aplicar]");
  if (aplicar) {
    const s = findIn(getSolicitudes(), aplicar.dataset.coordSolAplicar);
    if (!s) return true;
    if (editor?.sucio && editor.solicitudId !== s.id) {
      setFlash("editor", "Primero guardá o cerrá la ruta que estás editando.", "error");
      render();
      goTo("coord-editor");
      return true;
    }
    aplicarSolicitud(s);
    render();
    goTo("coord-editor");
    return true;
  }

  const rechazar = t.closest("[data-coord-sol-rechazar]");
  if (rechazar) {
    rechazoAbierto = rechazar.dataset.coordSolRechazar;
    render();
    focusById(`coord-rechazo-${rechazoAbierto}`);
    return true;
  }

  if (t.closest("[data-coord-sol-rechazar-cancel]")) {
    const id = rechazoAbierto;
    rechazoAbierto = "";
    render();
    focusById(`coord-rechazar-${id}`);
    return true;
  }

  const rechazarOk = t.closest("[data-coord-sol-rechazar-ok]");
  if (rechazarOk) {
    const id = rechazarOk.dataset.coordSolRechazarOk;
    const area = document.getElementById(`coord-rechazo-${id}`);
    const respuesta = (area?.value || rechazos[id] || "").trim();
    const inSection = Boolean(t.closest("#coord-solicitudes"));
    const sectionKey = inSection ? "solicitudesTodas" : "solicitudes";
    if (respuesta.length < 3) {
      setFlash(sectionKey, "Escribí una respuesta corta para el supervisor.", "error");
      rechazos[id] = respuesta;
      render();
      focusById(`coord-rechazo-${id}`);
      return true;
    }
    const sol = findIn(getSolicitudes(), id);
    run(`sol-${id}`, async () => {
      const saved = await guardar("solicitudes", { id, fecha: isISODate(sol?.fecha) ? sol.fecha : hoyAR(), estado: "rechazado", respuesta }, { section: sectionKey, ok: "Pedido rechazado. El supervisor ve tu respuesta." });
      if (saved) {
        delete rechazos[id];
        rechazoAbierto = "";
      }
    });
    return true;
  }

  /* ---------- Clientes ---------- */

  if (t.closest("[data-coord-cliente-save]")) {
    const form = t.closest("[data-coord-form]");
    const values = serializeForm(form);
    saveDraft("cliente", values);
    if (!values.nombre?.trim()) {
      setFlash("clientes", "Falta el nombre del tutor.", "error");
      render();
      focusById("coord-cliente-nombre");
      return true;
    }
    const data = {
      nombre: values.nombre.trim(),
      telefono: values.telefono?.trim() || "",
      barrio: values.barrio?.trim() || "",
      perros: Array.isArray(values.perros) ? values.perros : [],
      plan: values.plan || PENDIENTE,
      dias: Array.isArray(values.dias) ? values.dias : [],
      turno: values.turno || PENDIENTE,
      estado: values.estado || "activo",
      notas: values.notas?.trim() || "",
    };
    if (values.id) data.id = values.id;
    if (values.pedidoId) data.pedidoId = values.pedidoId;
    run("cliente-save", async () => {
      const saved = await guardar("clientes", data, { section: "clientes", ok: values.id ? `Cambios de ${data.nombre} guardados.` : `${data.nombre} quedó cargado como cliente.` });
      if (saved) {
        clearDraft("cliente");
        if (values.pedidoId && !values.id) {
          const pedido = findIn(getPedidos(), values.pedidoId);
          if (pedido && estadoDe(pedido) === "nuevo") await registros.save("pedidos", { id: pedido.id, estado: "en-curso" }).catch(() => {});
        }
      }
    });
    return true;
  }

  if (t.closest("[data-coord-cliente-cancel]")) {
    clearDraft("cliente");
    setFlash("clientes", "Formulario vacío.");
    render();
    return true;
  }

  const clienteEdit = t.closest("[data-coord-cliente-edit]");
  if (clienteEdit) {
    const c = findIn(getClientes(), clienteEdit.dataset.coordClienteEdit);
    if (c) {
      drafts.cliente = { id: c.id, pedidoId: c.pedidoId || "", nombre: c.nombre || "", telefono: c.telefono || "", barrio: c.barrio || "", perros: c.perros || [], plan: c.plan || PENDIENTE, dias: c.dias || [], turno: c.turno || PENDIENTE, estado: c.estado || "activo", notas: c.notas || "" };
      clearedForms.delete("cliente");
      render();
      goTo("coord-cliente-form", "#coord-cliente-nombre");
    }
    return true;
  }

  /* ---------- Avisos ---------- */

  if (t.closest("[data-coord-aviso-save]")) {
    const form = t.closest("[data-coord-form]");
    const values = serializeForm(form);
    saveDraft("aviso", values);
    const hoy = hoyAR();
    const error = !values.barrio?.trim()
      ? ["Falta el barrio.", "coord-aviso-barrio"]
      : !values.mensaje?.trim()
        ? ["Escribí qué pasa.", "coord-aviso-mensaje"]
        : values.vigenteHasta && (!isISODate(values.vigenteHasta) || values.vigenteHasta < hoy)
          ? ["La fecha de «vigente hasta» tiene que ser hoy o después.", "coord-aviso-vigenteHasta"]
          : null;
    if (error) {
      setFlash("avisos", error[0], "error");
      render();
      focusById(error[1]);
      return true;
    }
    const barrio = values.barrio.trim();
    const tipo = AVISO_TIPOS.includes(values.tipo) ? values.tipo : "otro";
    run("aviso-save", async () => {
      const saved = await guardar("avisos", { fecha: hoy, barrio, tipo, mensaje: values.mensaje.trim(), vigenteHasta: values.vigenteHasta || hoy, titulo: `${tipo[0].toUpperCase()}${tipo.slice(1)} en ${barrio}` }, { section: "avisos", ok: `Aviso de ${barrio} guardado. Ya lo ve el equipo.` });
      if (saved) clearDraft("aviso");
    });
    return true;
  }

  const avisoCopy = t.closest("[data-coord-aviso-copy]");
  if (avisoCopy) {
    const aviso = findIn(getAvisos(), avisoCopy.dataset.coordAvisoCopy);
    const sectionKey = t.closest("#coord-avisos") ? "avisos" : "avisosTop";
    if (aviso) copyAndTell(avisoText(aviso), sectionKey, "Aviso copiado. Pegalo en el grupo de WhatsApp del equipo.");
    return true;
  }

  const avisoFin = t.closest("[data-coord-aviso-fin]");
  if (avisoFin) {
    const aviso = findIn(getAvisos(), avisoFin.dataset.coordAvisoFin);
    if (aviso) run(`aviso-${aviso.id}`, () => guardar("avisos", { id: aviso.id, vigenteHasta: addDaysISO(hoyAR(), -1) }, { section: "avisos", ok: `Aviso de ${aviso.barrio || "barrio"} marcado como terminado.` }));
    return true;
  }

  /* ---------- Datos a confirmar ---------- */

  const resolve = t.closest("[data-coord-resolve]");
  if (resolve) {
    const id = resolve.dataset.coordResolve;
    const dog = DOG_BY_ID.get(id);
    run(`resuelto-${id}`, () => guardar("resueltos", { id, perroId: id, perroNombre: dog?.name || id, resuelto: true, nota: "" }, { section: "datos", ok: `${dog?.name || id}: marcado como resuelto.` }));
    return true;
  }

  const unresolve = t.closest("[data-coord-unresolve]");
  if (unresolve) {
    const id = unresolve.dataset.coordUnresolve;
    const dog = DOG_BY_ID.get(id);
    run(`resuelto-${id}`, () => guardar("resueltos", { id, perroId: id, perroNombre: dog?.name || id, resuelto: false, nota: "" }, { section: "datos", ok: `${dog?.name || id}: volvió a pendientes.` }));
    return true;
  }

  /* ---------- Pedidos ---------- */

  if (t.closest("[data-coord-pedido-save]")) {
    const form = t.closest("[data-coord-form]");
    const values = serializeForm(form);
    saveDraft("pedido", values);
    if (!values.perro?.trim() && !values.detalle?.trim()) {
      setFlash("pedidos", "Escribí el perro o qué hay que resolver.", "error");
      render();
      focusById("coord-pedido-perro");
      return true;
    }
    const tipo = values.tipo || PEDIDO_TIPOS[0];
    const perro = values.perro?.trim() || "";
    run("pedido-save", async () => {
      const saved = await guardar("pedidos", { fecha: hoyAR(), tipo, estado: "nuevo", origen: "app", titulo: `${tipo}: ${perro || "sin perro indicado"}`, detalle: values.detalle?.trim() || "", datos: { perro, canal: values.canal || PEDIDO_CANALES[0] } }, { section: "pedidos", ok: `Pedido guardado en "Nuevo".` });
      if (saved) clearDraft("pedido");
    });
    return true;
  }

  const move = t.closest("[data-coord-pedido-move]");
  if (move) {
    const id = move.dataset.coordPedidoMove;
    const estado = move.dataset.estado;
    run(`pedido-${id}`, () => guardar("pedidos", { id, estado }, { section: "pedidos", ok: `Pedido movido a "${ESTADO_LABEL[estado]}".` }));
    return true;
  }

  const pedidoDelete = t.closest("[data-coord-pedido-delete]");
  if (pedidoDelete) {
    const pedido = findIn(getPedidos(), pedidoDelete.dataset.coordPedidoDelete);
    if (pedido) run(`pedido-${pedido.id}`, () => borrar("pedidos", pedido, { section: "pedidos", ok: "Pedido borrado." }));
    return true;
  }

  const pedidoCliente = t.closest("[data-coord-pedido-cliente]");
  if (pedidoCliente) {
    const pedido = findIn(getPedidos(), pedidoCliente.dataset.coordPedidoCliente);
    if (!pedido) return true;
    drafts.cliente = draftClienteFromPedido(pedido);
    clearedForms.delete("cliente");
    setFlash("clientes", `Formulario completado con el pedido de ${pedido.datos?.responsable || "la web"}. Revisalo y guardalo.`);
    openAndGo("clientes", "coord-cliente-form", "#coord-cliente-nombre");
    return true;
  }

  const pedidoFicha = t.closest("[data-coord-pedido-ficha]");
  if (pedidoFicha) {
    const pedido = findIn(getPedidos(), pedidoFicha.dataset.coordPedidoFicha);
    if (!pedido) return true;
    drafts.alta = draftFromPedido(pedido);
    clearedForms.delete("alta");
    setFlash("alta", `Formulario completado con el pedido de ${pedidoPerro(pedido) || "la web"}. Revisalo y guardalo.`);
    openAndGo("alta", "coord-alta", "#coord-alta-nombre");
    return true;
  }

  /* ---------- Altas ---------- */

  if (t.closest("[data-coord-alta-save]")) {
    const form = t.closest("[data-coord-form]");
    const values = serializeForm(form);
    saveDraft("alta", values);
    if (!values.nombre?.trim()) {
      setFlash("alta", "Falta el nombre del perro.", "error");
      render();
      focusById("coord-alta-nombre");
      return true;
    }
    const nombre = values.nombre.trim();
    const datos = { ...values, nombre, dias: Array.isArray(values.dias) ? values.dias : [], primerPaseo: "Individual" };
    run("alta-save", async () => {
      const saved = await guardar("fichas", { fecha: hoyAR(), perroNombre: nombre, datos, categoria: "SIN EVALUAR", estado: "lista" }, { section: "alta", ok: `Ficha de ${nombre} guardada. Arranca SIN EVALUAR y con primer paseo individual.` });
      if (saved) clearDraft("alta");
    });
    return true;
  }

  if (t.closest("[data-coord-alta-clear]")) {
    clearDraft("alta");
    setFlash("alta", "Formulario vacío.");
    render();
    return true;
  }

  const altaCopy = t.closest("[data-coord-alta-copy]");
  if (altaCopy) {
    const ficha = findIn(getFichas(), altaCopy.dataset.coordAltaCopy);
    if (ficha) copyAndTell(altaText(ficha), "alta", "Ficha copiada. Pegala en el registro maestro.");
    return true;
  }

  const altaDelete = t.closest("[data-coord-alta-delete]");
  if (altaDelete) {
    const ficha = findIn(getFichas(), altaDelete.dataset.coordAltaDelete);
    if (ficha) run(`ficha-${ficha.id}`, () => borrar("fichas", ficha, { section: "alta", ok: "Ficha borrada." }));
    return true;
  }

  return false;
}

// Mientras se escribe: actualiza el estado en memoria sin redibujar toda la página.
function handleCoordinadorInput(event) {
  const target = event.target;
  if (!target.closest?.(".coord-shell")) return;

  if (editor) {
    if (target.matches("[data-coord-ed-search]")) {
      editorQuery = target.value;
      const box = document.getElementById("coord-ed-results");
      if (box) box.innerHTML = dogResults();
      return;
    }
    if (target.matches("[data-coord-ed-hora]")) {
      editorHora = target.value;
      const box = document.getElementById("coord-ed-results");
      if (box) box.innerHTML = dogResults();
      return;
    }
    if (target.matches("[data-coord-ed-field]")) {
      editor[target.dataset.coordEdField] = target.value;
      editor.sucio = true;
      return;
    }
    if (target.matches("[data-coord-stop]")) {
      const stop = editor.paradas[Number(target.dataset.coordStop)];
      if (stop) {
        stop[target.dataset.k] = target.dataset.k === "minutos" ? target.value : target.value;
        editor.sucio = true;
      }
      return;
    }
  }

  if (target.matches("[data-coord-rechazo]")) {
    rechazos[target.dataset.coordRechazo] = target.value;
    return;
  }

  if (target.matches("[data-coord-clientes-buscar]")) {
    clienteQuery = target.value;
    const box = document.getElementById("coord-clientes-lista");
    if (box) box.innerHTML = clientesListHTML();
    return;
  }

  if (target.matches("[data-coord-filter-perros]")) {
    const q = normalize(target.value);
    target.parentElement.querySelectorAll(".coord-check").forEach((label) => {
      label.hidden = Boolean(q) && !label.dataset.name.includes(q) && !label.querySelector("input").checked;
    });
  }
}

function handleCoordinadorChange(event) {
  const target = event.target;
  if (!target.closest?.(".coord-shell")) return false;

  if (target.matches("[data-coord-rutas-fecha]")) {
    if (isISODate(target.value)) {
      rutasFecha = target.value;
      scheduleRerender();
    }
    return true;
  }

  if (editor && target.matches("[data-coord-stop]")) {
    const stop = editor.paradas[Number(target.dataset.coordStop)];
    if (stop) {
      stop[target.dataset.k] = target.dataset.k === "minutos" ? Number(target.value) || 45 : target.value;
      editor.sucio = true;
      if (target.dataset.k !== "nota") scheduleRerender();
    }
    return true;
  }

  if (editor && target.matches("[data-coord-ed-field]")) {
    editor[target.dataset.coordEdField] = target.value;
    editor.sucio = true;
    return true;
  }

  if (target.matches("[data-coord-ed-hora], [data-coord-ed-search], [data-coord-rechazo], [data-coord-clientes-buscar], [data-coord-filter-perros]")) return true;

  const formEl = target.closest("[data-coord-form]");
  if (formEl) {
    saveDraft(formEl.dataset.coordForm, serializeForm(formEl));
    if (formEl.dataset.coordForm === "cliente" && target.name === "perros") {
      const label = document.getElementById("coord-cliente-perros-label");
      const n = (drafts.cliente.perros || []).length;
      if (label) label.textContent = `Perros${n ? ` (${n})` : ""}`;
    }
    return true;
  }
  return false;
}

// Enter dentro de un formulario o del buscador: no recarga la página.
function handleCoordinadorSubmit(event) {
  const form = event.target.closest?.(".coord-shell [data-coord-form]");
  if (!form) return;
  event.preventDefault();
  form.querySelector(".coord-btn.is-primary")?.click();
}

function handleCoordinadorKeydown(event) {
  if (event.key !== "Enter") return;
  const target = event.target;
  if (target.matches?.(".coord-shell [data-coord-ed-search]")) {
    event.preventDefault();
    document.querySelector("#coord-ed-results .coord-result")?.click();
  }
}

export function registerCoordinadorEvents() {
  clickHandlers.push(handleCoordinadorClick);
  changeHandlers.push(handleCoordinadorChange);
  document.addEventListener("input", handleCoordinadorInput);
  document.addEventListener("submit", handleCoordinadorSubmit);
  document.addEventListener("keydown", handleCoordinadorKeydown);
}
