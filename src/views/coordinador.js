// Vista del rol Coordinador (definido por Juan el 13/11/2026):
// - Organiza las RUTAS Y LOS HORARIOS: plantilla semanal (`plantillas`) y cambios de un día (`rutas`).
// - Aplica los pedidos de cambio que le manda el supervisor (`solicitudes`).
// - Gestiona los CLIENTES de los paseos (`clientes`) y los pedidos (`pedidos`, incluidos los de la web).
// - AVISA lo que pasa en cada barrio (`avisos`).
// - No ve plata: nada de pagos, montos ni precios por cliente (los pagos son solo del admin).
// - ARCHIVOS: ve y sube el carnet de vacunas y documentos de cada cliente y perro (`archivos`).
//   Los comprobantes de pago NO se muestran en esta página (los abre solo el admin).
//
// - FOTOS: cada perro tiene su foto (`fotos`); quien la ve sin foto puede sacarla con «Foto».
//
// Diseño (E024): celular primero, una mano. Barra fija abajo (Inicio · Rutas · Clientes · Más),
// tarjetas con foto del perro, pocas letras y botones grandes. Lo que se usa poco va a «Más».
//
// Los datos viven en el servidor (src/api/client.js, ver docs/datos-compartidos.md).
// En este dispositivo solo quedan comodidades: la pestaña abierta, secciones plegadas y la vista de rutas.
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
import { session, registros, onDataChange, hoyAR, archivos as archivosApi, fotosPerros } from "../api/client.js";
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

// Un solo aviso flotante (abajo, encima de la barra). Si trae «Deshacer», dura 5 segundos.
let toast = null;
let toastTimer = 0;

// local: el «Deshacer» es de algo que todavía no se guardó (el editor): se borra al cerrarlo.
function showToast(text, { tone = "ok", undo = null, local = false } = {}) {
  toast = { text, tone, undo, local };
  if (tone === "error") announceError(text);
  else announce(text);
  window.clearTimeout(toastTimer);
  const ms = undo ? 5000 : tone === "error" ? 9000 : 3500;
  toastTimer = window.setTimeout(() => {
    toast = null;
    scheduleRerender();
  }, ms);
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
  archivos: () => ({}),
  fotos: () => ({}),
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
  window.addEventListener("online", () => {
    // Volvió la señal: el aviso de "no se subió por falta de señal" ya no corresponde.
    if (subida?.errorSenal) {
      subida.error = "";
      subida.errorSenal = false;
    }
    scheduleRerender();
  });
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
    ? `<p class="coord-meta is-pending">${icon("clock", "coord-icon")}<span>Se envía con señal.</span></p>`
    : "";
  return `${parts.length ? `<p class="coord-meta">${parts.join(" · ")}</p>` : ""}${pending}`;
}

/* ------------------------------------------------------------------ */
/* Guardado                                                            */
/* ------------------------------------------------------------------ */

const busy = new Set();

// undo: función que deja todo como estaba (se ofrece «Deshacer» 5 segundos).
async function guardar(col, data, { ok, undo = null }) {
  try {
    const result = await registros.save(col, data);
    showToast(result.pendiente ? `${ok} Se envía con señal.` : ok, { undo });
    return result;
  } catch (error) {
    showToast(`No se pudo guardar: ${error.message}`, { tone: "error" });
    return null;
  } finally {
    scheduleRerender();
  }
}

async function borrar(col, record, { ok, undo = true }) {
  try {
    await registros.remove(col, record.id);
    const { pendiente, ...copia } = record;
    showToast(ok, { undo: undo ? () => guardar(col, copia, { ok: "Listo, se recuperó." }) : null });
    return true;
  } catch (error) {
    showToast(`No se pudo borrar: ${error.message}`, { tone: "error" });
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
let soloSinCarnet = false;

function rutasVista() {
  return readJSON(SECTIONS_KEY, {}).rutasVista === "semana" ? "semana" : "dia";
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
    // Dónde se guarda: "dia" (solo ese día) o "semana" (todas las semanas). Se elige antes de guardar.
    destino: modo === "plantilla" ? "semana" : "dia",
    picker: false,
    agregados: 0,
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
  if (toast?.local) toast = null;
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

function addStop(dog, nombreLibre, { keepQuery = false } = {}) {
  const query = editorQuery;
  const hora = validHora(editorHora) ? padHora(editorHora) : nextFreeHora(editor);
  editor.paradas.push({
    perroId: dog?.id || "",
    perroNombre: dog?.name || nombreLibre,
    hora,
    minutos: dog?.minutes || 45,
    nota: dog?.incompatibleWith?.length ? `No juntar con ${listJoin(dog.incompatibleWith)}` : hasMuzzle(dog) ? "Bozal" : "",
  });
  editor.sucio = true;
  editorQuery = keepQuery ? query : "";
  editorHora = "";
}

// Fecha del cambio de un día (según desde dónde se abrió el editor).
function editorFechaDia() {
  return editor.modo === "plantilla" ? editor.soloDia : editor.fecha;
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
    const taken = editor.destino === "semana"
      ? getPlantillas().some((p) => p.id === plantillaId(code, editor.dia))
      : effectiveRoutes(editorFechaDia()).some((r) => r.ruta === code);
    if (taken) return [`Ya hay una ruta ${code} ese día. Cambiá el código.`, "coord-ed-ruta"];
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
    } else editor.precarga = "No dice qué perro: tocá «Agregar perro».";
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
/* Archivos: carnet de vacunas y documentos                            */
/* ------------------------------------------------------------------ */

const TIPO_CARNET = "carnet de vacunas";
const TIPOS_SUBIDA = [
  [TIPO_CARNET, "Carnet de vacunas"],
  ["documento", "Otro documento"],
];
const TIPO_LABEL = { [TIPO_CARNET]: "Carnet de vacunas", documento: "Documento", foto: "Foto" };

// Los comprobantes de pago son solo del admin: esta página no los muestra nunca (tampoco al admin).
function esComprobante(a) {
  return a?.tipo === "comprobante de pago";
}

function getArchivos() {
  return cached("archivos").filter((a) => a?.id && !esComprobante(a)).sort(byNewest);
}

function archivoPorId(id) {
  return getArchivos().find((a) => a.id === id) || null;
}

function esCarnet(a) {
  return a?.tipo === TIPO_CARNET;
}

function tipoLabel(tipo) {
  return TIPO_LABEL[tipo] || "Documento";
}

function fmtTamano(bytes) {
  const n = Number(bytes) || 0;
  if (!n) return "";
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
  return `${(n / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

function sinSenal() {
  return navigator.onLine === false;
}

// Mensaje claro, en castellano, para un error al subir o abrir un archivo.
function mensajeArchivo(error, accion) {
  if (sinSenal() || error?.status === 0 || error?.name === "TypeError") {
    return `Sin señal: para ${accion} archivos hace falta conexión. Probá de nuevo cuando vuelva.`;
  }
  return error?.message || `No se pudo ${accion} el archivo.`;
}

// Archivos de un pedido: el carnet del formulario web y los que se subieron con su id.
function archivosDePedido(pedido) {
  const ids = new Set([pedido.carnet?.id, ...(Array.isArray(pedido.archivos) ? pedido.archivos : [])].filter(Boolean));
  getArchivos().filter((a) => a.pedidoId === pedido.id).forEach((a) => ids.add(a.id));
  const crudos = new Map(cached("archivos").map((a) => [a.id, a]));
  return [...ids]
    .filter((id) => !esComprobante(crudos.get(id)))
    .map((id) => crudos.get(id) || (id === pedido.carnet?.id
      ? { id, tipo: TIPO_CARNET, nombreArchivo: pedido.carnet.nombre || "", perroNombre: pedido.datos?.perro || "" }
      : { id, tipo: "documento" }));
}

// Archivos de un cliente: los vinculados a él, a sus perros o al pedido del que salió.
function archivosDeCliente(c) {
  const ids = new Set(Array.isArray(c.archivos) ? c.archivos : []);
  const perros = new Set(Array.isArray(c.perros) ? c.perros : []);
  return getArchivos().filter((a) => ids.has(a.id)
    || (a.clienteId && a.clienteId === c.id)
    || (a.perroId && perros.has(a.perroId))
    || (c.pedidoId && a.pedidoId === c.pedidoId));
}

// Perro → carnets cargados. Cuenta el carnet con ese perroId y, si el carnet no dice de qué
// perro es (ej.: el del formulario web), el que el cliente tiene asignado a ese perro
// (`archivosPerro`) o el vinculado a un cliente que tiene ese único perro.
let carnetIdx = new Map();

function buildCarnetIndex() {
  const idx = new Map();
  const add = (dogId, a) => {
    if (!DOG_BY_ID.has(dogId)) return;
    if (!idx.has(dogId)) idx.set(dogId, []);
    if (!idx.get(dogId).some((x) => x.id === a.id)) idx.get(dogId).push(a);
  };
  const clientes = getClientes();
  getArchivos().filter(esCarnet).forEach((a) => {
    if (a.perroId) {
      add(a.perroId, a);
      return;
    }
    clientes.forEach((c) => {
      const asignado = c.archivosPerro?.[a.id];
      if (asignado) {
        add(asignado, a);
        return;
      }
      const perros = Array.isArray(c.perros) ? c.perros : [];
      if (perros.length !== 1) return;
      const vinculado = (Array.isArray(c.archivos) && c.archivos.includes(a.id)) || (a.clienteId && a.clienteId === c.id) || (c.pedidoId && a.pedidoId === c.pedidoId);
      if (vinculado) add(perros[0], a);
    });
  });
  return idx;
}

function tieneCarnet(dog) {
  return Boolean(dog && carnetIdx.get(dog.id)?.length);
}

/* ---------- Mensajes de archivos (dentro de la tarjeta donde se tocó) ---------- */

let fileFlash = null;

function setFileFlash(key, text, tone = "ok") {
  fileFlash = { key, text, tone, until: Date.now() + 15000 };
  if (tone === "error") announceError(text);
  else announce(text);
}

function fileFeedback(key) {
  if (!fileFlash || fileFlash.key !== key || Date.now() > fileFlash.until) return "";
  return `<p class="coord-flash is-${fileFlash.tone} is-small">${icon(fileFlash.tone === "error" ? "alertCircle" : "checkCircle", "coord-icon")}<span>${esc(fileFlash.text)}</span></p>`;
}

// Abre el archivo en otra pestaña con la sesión (nunca un link público ni de Drive).
function abrirArchivo(id, scope) {
  if (sinSenal()) {
    setFileFlash(scope, "Sin señal: para abrir archivos hace falta conexión. Probá de nuevo cuando vuelva.", "error");
    scheduleRerender();
    return;
  }
  announce("Abriendo el archivo en otra pestaña.");
  archivosApi.abrir(id).catch((error) => {
    setFileFlash(scope, mensajeArchivo(error, "abrir"), "error");
    scheduleRerender();
  });
}

/* ---------- Subida desde la ficha de un cliente ---------- */

// Una sola subida abierta a la vez. El archivo elegido queda en memoria: el <input type="file">
// se vacía cada vez que la página se vuelve a dibujar, pero lo elegido no se pierde.
let subida = null;

function abrirSubida(c) {
  const perros = Array.isArray(c.perros) ? c.perros.filter((id) => DOG_BY_ID.has(id)) : [];
  subida = { clienteId: c.id, tipo: TIPO_CARNET, perroId: perros.length === 1 ? perros[0] : "", nota: "", file: null, estado: "", error: "" };
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
    if (fieldEl.type === "radio") {
      if (groups.has(fieldEl.name)) return;
      groups.add(fieldEl.name);
      const marcado = formEl.querySelector(`[name="${fieldEl.name}"]:checked`);
      values[fieldEl.name] = marcado ? marcado.value : "";
      return;
    }
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
/* Navegación: Inicio · Rutas · Clientes · Más                         */
/* ------------------------------------------------------------------ */

const TABS = ["inicio", "rutas", "clientes", "mas"];
const SUBS = ["cambios", "pedidos", "avisos", "fichas", "datos", "docs", "incidentes"];
let view = null;

function getView() {
  if (!view) {
    const saved = readJSON(SECTIONS_KEY, {});
    const tab = TABS.includes(saved.tab) ? saved.tab : "inicio";
    view = { tab, sub: tab === "mas" && SUBS.includes(saved.sub) ? saved.sub : "" };
  }
  return view;
}

// "mas:pedidos" → pestaña Más, sección Pedidos.
function goView(target) {
  const [tab, sub = ""] = String(target || "inicio").split(":");
  view = { tab: TABS.includes(tab) ? tab : "inicio", sub: SUBS.includes(sub) ? sub : "" };
  if (view.sub) view.tab = "mas";
  writeJSON(SECTIONS_KEY, { ...readJSON(SECTIONS_KEY, {}), tab: view.tab, sub: view.sub });
}

function toTop(focusId = "coord-view-title") {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById(focusId)?.focus({ preventScroll: true });
  });
}

// Formularios que ocupan toda la pantalla (con «Guardar» fijo abajo).
let clienteFormOpen = false;
let avisoFormOpen = false;
let pedidoFormOpen = false;
let altaFormOpen = false;
let pedidosFiltro = "nuevo";
const fotoBusy = new Set();

/* ------------------------------------------------------------------ */
/* Componentes                                                         */
/* ------------------------------------------------------------------ */

// Íconos que no están en el set compartido.
const EXTRA_ICONS = {
  menu: `<circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" />`,
  arrowUp: `<path d="M12 19V5" /><path d="m6 11 6-6 6 6" />`,
  arrowDown: `<path d="M12 5v14" /><path d="m6 13 6 6 6-6" />`,
  arrowLeft: `<path d="M19 12H5" /><path d="m11 6-6 6 6 6" />`,
  search: `<circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" />`,
  check: `<path d="m5 12 5 5 9-10" />`,
  trash: `<path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" />`,
};

function ic(name, cls = "coord-icon") {
  if (!EXTRA_ICONS[name]) return icon(name, cls);
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${EXTRA_ICONS[name]}</svg>`;
}

function button(label, attrs, variant = "secondary", iconName = "") {
  return `<button class="coord-btn is-${variant}" type="button" ${attrs}>${iconName ? ic(iconName) : ""}<span>${label}</span></button>`;
}

// Chip de estado: siempre con texto. Tonos: neutral (gris), info (azul), ok (verde), warn (amarillo), alert (rojo).
function chip(text, tone = "neutral", iconName = "") {
  return `<span class="cd-chip is-${tone}">${iconName ? ic(iconName, "coord-icon is-xs") : ""}<span>${text}</span></span>`;
}

function shortList(names, max = 2) {
  if (names.length <= max) return listJoin(names);
  return `${names.slice(0, max).join(", ")} +${names.length - max}`;
}

function firstName(value) {
  return String(personName(value) || "").split(" ")[0];
}

// Foto del perro (miniatura) o círculo con la inicial.
function Ava(dog, name = "", size = "md") {
  const src = dog?.id ? fotosPerros.de(dog.id) : null;
  const n = String(name || dog?.name || "?").trim();
  if (src) return `<img class="cd-ava is-${size}" src="${esc(src)}" alt="" loading="lazy" decoding="async" />`;
  return `<span class="cd-ava is-${size} is-initial" aria-hidden="true">${esc((n[0] || "?").toUpperCase())}</span>`;
}

// Botón de cámara para el perro que todavía no tiene foto.
function FotoBtn(dog, { compact = false } = {}) {
  if (!dog?.id || fotosPerros.de(dog.id)) return "";
  const busy = fotoBusy.has(dog.id);
  return `
    <label class="cd-foto-btn ${compact ? "is-compact" : ""} ${busy ? "is-busy" : ""}">
      ${ic("camera")}<span>${busy ? "Subiendo" : "Foto"}</span><span class="coord-sr-only"> de ${esc(dog.name)}</span>
      <input type="file" accept="image/*" capture="environment" data-coord-foto="${esc(dog.id)}" ${busy ? "disabled" : ""} />
    </label>
  `;
}

// Seguridad siempre a la vista: bozal (rojo) y «no juntar» (amarillo).
function safetyChips(dog) {
  if (!dog) return "";
  const out = [];
  if (hasMuzzle(dog)) out.push(chip("Bozal", "alert", "alertTriangle"));
  if (dog.incompatibleWith?.length) out.push(chip(`No juntar: ${esc(shortList(dog.incompatibleWith))}`, "warn"));
  return out.join("");
}

function carnetChip(dog) {
  return tieneCarnet(dog) ? chip("Carnet", "ok", "check") : chip("Sin carnet", "warn");
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

function field(form, name, label, { value = "", placeholder = "", hint = "", type = "text", required = false, span = false, attrs = "" } = {}) {
  const id = `coord-${form}-${name}`;
  return `
    <div class="coord-field ${span ? "is-wide" : ""}">
      <label for="${id}">${label}${required ? ' <span class="coord-required">*<span class="coord-sr-only"> obligatorio</span></span>' : ""}</label>
      <input id="${id}" name="${name}" type="${type}" value="${esc(value)}" ${placeholder ? `placeholder="${esc(placeholder)}"` : ""} ${required ? "required" : ""} ${hint ? `aria-describedby="${id}-hint"` : ""} ${attrs} />
      ${hint ? `<small id="${id}-hint">${hint}</small>` : ""}
    </div>
  `;
}

function selectField(form, name, label, options, { value = "", hint = "", span = false } = {}) {
  const id = `coord-${form}-${name}`;
  const opts = options.map((option) => (Array.isArray(option) ? option : [option, option]));
  return `
    <div class="coord-field ${span ? "is-wide" : ""}">
      <label for="${id}">${label}</label>
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
      <label for="${id}">${label}${required ? ' <span class="coord-required">*<span class="coord-sr-only"> obligatorio</span></span>' : ""}</label>
      <textarea id="${id}" name="${name}" rows="3" ${placeholder ? `placeholder="${esc(placeholder)}"` : ""} ${hint ? `aria-describedby="${id}-hint"` : ""} ${attrs}>${esc(value)}</textarea>
      ${hint ? `<small id="${id}-hint">${hint}</small>` : ""}
    </div>
  `;
}

// Botones de un toque que completan un campo (barrio, fecha…).
function quickFill(targetId, options, current = "") {
  return `
    <div class="cd-chiprow" role="group" aria-label="Opciones rápidas">
      ${options.map(([value, text]) => `<button type="button" class="cd-pill" data-coord-set-field="${targetId}" data-value="${esc(value)}" aria-pressed="${normalize(value) === normalize(current)}">${esc(text)}</button>`).join("")}
    </div>
  `;
}

// Días como botones (checkbox con forma de chip).
function daysField(form, days) {
  return `
    <div class="coord-field is-wide">
      <span class="coord-label" id="coord-${form}-dias-label">Días</span>
      <div class="cd-chiprow" role="group" aria-labelledby="coord-${form}-dias-label">
        ${SERVICE_DAYS.map((day) => `
          <label class="cd-pill is-check"><input type="checkbox" id="coord-${form}-dia-${slugDia(day)}" name="dias" value="${day}" ${days.includes(day) ? "checked" : ""} /><span>${DAY_SHORT[day]}</span><span class="coord-sr-only"> ${day}</span></label>
        `).join("")}
      </div>
    </div>
  `;
}

// Sección plegable ("?" o "Más"): se recuerda abierta o cerrada en el dispositivo.
function fold(key, summary, body, { open = false, id = "" } = {}) {
  return `
    <details class="cd-fold" ${id ? `id="${id}"` : ""} ${isOpen(key, open) ? "open" : ""}>
      <summary data-coord-toggle="${key}"><span>${summary}</span>${ic("chevronDown", "coord-icon cd-chev")}</summary>
      <div class="cd-fold-body">${body}</div>
    </details>
  `;
}

// Plegable que se recuerda solo mientras la página está abierta (una tarjeta).
function cardMore(memKey, summary, body, forceOpen = false) {
  return `
    <details class="cd-fold is-card" ${forceOpen || openCards.has(memKey) ? "open" : ""}>
      <summary data-coord-mem-toggle="${esc(memKey)}"><span>${summary}</span>${ic("chevronDown", "coord-icon cd-chev")}</summary>
      <div class="cd-fold-body">${body}</div>
    </details>
  `;
}

function warnList(list) {
  if (!list.length) return "";
  return `<ul class="cd-warns">${list.map((text) => `<li>${ic("alertTriangle")}<span>${esc(text)}</span></li>`).join("")}</ul>`;
}

function emptyState(text, iconName = "checkCircle") {
  return `<p class="cd-empty">${ic(iconName)}<span>${text}</span></p>`;
}

function ArchivoItem(a, scope) {
  const titulo = `${tipoLabel(a.tipo)}${a.perroNombre ? ` de ${a.perroNombre}` : ""}`;
  const meta = [
    a.creadoPor === "web" ? "Web" : a.creadoPorNombre || "",
    a.creadoEn ? fmtStamp(a.creadoEn) : fmtDate(a.fecha),
    fmtTamano(a.tamano),
    a.ubicacion === "drive" ? "Drive" : "",
  ].filter(Boolean).join(" · ");
  return `
    <li class="coord-file">
      <span class="coord-file-icon">${ic(esCarnet(a) ? "fileCheck" : "fileText")}</span>
      <span class="coord-file-text">
        <b>${esc(titulo)}</b>
        ${meta ? `<small>${esc(meta)}</small>` : ""}
        ${a.nota ? `<small>${esc(a.nota)}</small>` : ""}
      </span>
      ${button(`Ver<span class="coord-sr-only"> ${esc(titulo.toLowerCase())} (se abre en otra pestaña)</span>`, `data-coord-archivo-abrir="${esc(a.id)}" data-scope="${esc(scope)}"`, "ghost", "eye")}
    </li>
  `;
}

// Archivos adjuntos a un pedido (el carnet del formulario web).
function AdjuntosPedido(pedido) {
  const adjuntos = archivosDePedido(pedido);
  const scope = `pedido-${pedido.id}`;
  if (!adjuntos.length) return fileFeedback(scope);
  return `
    <div class="coord-attach">
      ${adjuntos.map((a) => {
        const carnet = esCarnet(a);
        return `
          <p class="coord-attach-row">
            ${ic(carnet ? "fileCheck" : "fileText")}
            <span><b>${carnet ? "Carnet adjunto" : `${esc(tipoLabel(a.tipo))} adjunto`}</b>${a.creadoEn ? `<small>${esc(fmtStamp(a.creadoEn))}</small>` : ""}</span>
            ${button(`Ver<span class="coord-sr-only"> ${carnet ? "carnet" : "archivo"} (se abre en otra pestaña)</span>`, `data-coord-archivo-abrir="${esc(a.id)}" data-scope="${esc(scope)}"`, "secondary", "eye")}
          </p>`;
      }).join("")}
    </div>
    ${fileFeedback(scope)}
  `;
}

// Botón para elegir el archivo (foto o PDF). El <input> queda oculto pero con foco visible.
function filePicker(id, text, attrs, hintId) {
  return `
    <label class="coord-btn is-secondary coord-file-pick" for="${id}">
      ${ic("camera")}<span>${text}</span>
      <input id="${id}" type="file" accept="image/*,application/pdf" capture="environment" ${attrs} aria-describedby="${hintId}" />
    </label>
  `;
}

function SubidaForm(c, perros) {
  const id = esc(c.id);
  const s = subida;
  const subiendo = s.estado === "subiendo";
  const hintId = `coord-subida-hint-${id}`;
  return `
    <div class="coord-upload" id="coord-subida-${id}" role="group" aria-labelledby="coord-subida-title-${id}">
      <p class="coord-upload-title" id="coord-subida-title-${id}">Subir documento</p>
      ${sinSenal() ? `<p class="coord-inline-alert">${ic("alertTriangle")}<span>Sin señal: los archivos necesitan señal.</span></p>` : ""}
      <div class="cd-chiprow" role="group" aria-label="Qué es">
        ${TIPOS_SUBIDA.map(([v, t]) => `<button type="button" class="cd-pill" id="coord-subida-tipo-${id}-${v === TIPO_CARNET ? "carnet" : "doc"}" data-coord-subida-set="tipo" data-value="${v}" aria-pressed="${v === s.tipo}">${t === "Carnet de vacunas" ? "Carnet" : "Otro"}</button>`).join("")}
      </div>
      ${perros.length ? `
        <div class="coord-field">
          <label for="coord-subida-perro-${id}">Perro${s.tipo === TIPO_CARNET && perros.length > 1 ? ' <span class="coord-required">*</span>' : ""}</label>
          <select id="coord-subida-perro-${id}" data-coord-subida-campo="perroId">
            <option value="">${s.tipo === TIPO_CARNET ? "Elegí" : "Ninguno"}</option>
            ${perros.map((d) => `<option value="${d.id}" ${d.id === s.perroId ? "selected" : ""}>${esc(d.name)}</option>`).join("")}
          </select>
        </div>` : ""}
      ${filePicker(`coord-subida-archivo-${id}`, s.file ? "Cambiar" : "Foto o PDF", "data-coord-subida-archivo", hintId)}
      <small id="${hintId}" class="cd-muted">${s.file ? `${esc(s.file.name)} (${fmtTamano(s.file.size)})` : "Hasta 3,5 MB."}</small>
      <div class="coord-field">
        <label for="coord-subida-nota-${id}">Nota</label>
        <input id="coord-subida-nota-${id}" type="text" value="${esc(s.nota)}" data-coord-subida-campo="nota" autocomplete="off" placeholder="Opcional" />
      </div>
      <p class="coord-upload-status" role="status">${subiendo ? `${ic("clock")}<span>Subiendo…</span>` : ""}</p>
      ${s.error ? `<p class="coord-inline-alert">${ic("alertCircle")}<span>${esc(s.error)}</span></p>` : ""}
      <div class="cd-actions">
        ${button(subiendo ? "Subiendo…" : "Subir", `id="coord-subida-ok-${id}" data-coord-subida-ok="${id}" ${subiendo ? 'aria-disabled="true"' : ""}`, "primary", "uploadCloud")}
        ${button("Cancelar", `id="coord-subida-cancel-${id}" data-coord-subida-cancel="${id}"`, "ghost")}
      </div>
    </div>
  `;
}

function DocumentosCliente(c) {
  const id = esc(c.id);
  const docs = archivosDeCliente(c);
  const perros = (Array.isArray(c.perros) ? c.perros : []).map((dogId) => DOG_BY_ID.get(dogId)).filter(Boolean);
  const scope = `cliente-${c.id}`;
  return `
    <div class="coord-docs" role="group" aria-labelledby="coord-docs-${id}">
      <h4 id="coord-docs-${id}">${ic("fileText")}<span>Documentos</span> <span class="cd-count">${docs.length}</span></h4>
      ${docs.length
        ? `<ul class="coord-files">${docs.map((a) => ArchivoItem(a, scope)).join("")}</ul>`
        : `<p class="cd-muted">${loaded.has("archivos") ? "Sin documentos." : "Cargando…"}</p>`}
      ${fileFeedback(scope)}
      ${subida?.clienteId === c.id
        ? SubidaForm(c, perros)
        : button("Subir", `id="coord-subir-${id}" data-coord-subir="${id}"`, "secondary", "fileUp")}
    </div>
  `;
}

const TEAM_DATALIST = `
  <datalist id="coord-team-users">${TEAM.map((t) => `<option value="${esc(t.id)}">${esc(t.name)}</option>`).join("")}</datalist>
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
      <a class="coord-brand" href="/coordinador" data-link aria-label="Paseos Juan, coordinación">
        <span class="coord-logo">
          <img class="coord-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="coord-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="coord-brand-text"><strong>Coordinación</strong></span>
      </a>
      <div class="coord-header-actions">
        <button class="coord-btn is-ghost is-compact" type="button" data-a11y-toggle aria-controls="a11y-panel">
          ${ic("eye")}<span class="cd-hide-xs">Accesibilidad</span><span class="coord-sr-only cd-show-xs">Accesibilidad</span>
        </button>
        <a class="coord-btn is-ghost is-compact" href="/salir" data-link>${ic("logOut")}<span>Salir</span></a>
      </div>
    </header>
  `;
}

export function coordinatorDashboard() {
  wireData();
  ensureSync();
  carnetIdx = buildCarnetIndex();
  const v = getView();
  let main;
  let full = false;
  if (editor) {
    main = editor.picker ? DogPicker() : RouteEditor();
    full = true;
  } else if (v.tab === "clientes" && clienteFormOpen) {
    main = ClienteForm();
    full = true;
  } else if (v.tab === "mas" && v.sub === "fichas" && altaFormOpen) {
    main = AltaForm();
    full = true;
  } else {
    main = { inicio: InicioView, rutas: RutasView, clientes: ClientesView, mas: MasView }[v.tab]();
  }
  clearedForms.clear();
  return `
    <main class="coord-main ${full ? "has-savebar" : "has-tabbar"}" id="coord-main" tabindex="-1">
      ${SyncStrip()}
      ${main}
      ${TEAM_DATALIST}
    </main>
    ${full ? "" : TabBar()}
    ${Toast()}
  `;
}

function TabBar() {
  const v = getView();
  const sols = solicitudesPendientes().length;
  const web = webNuevos(getPedidos()).length;
  const items = [
    ["inicio", "home", "Inicio", sols + web],
    ["rutas", "route", "Rutas", 0],
    ["clientes", "users", "Clientes", 0],
    ["mas", "menu", "Más", 0],
  ];
  return `
    <nav class="cd-tabbar" aria-label="Secciones">
      ${items.map(([tab, iconName, label, n]) => `
        <button type="button" class="cd-tab ${v.tab === tab ? "is-on" : ""}" data-coord-go="${tab}" ${v.tab === tab ? 'aria-current="page"' : ""}>
          ${ic(iconName)}<span>${label}</span>${n ? `<b class="cd-tab-n" aria-label="${n} para resolver">${n}</b>` : ""}
        </button>`).join("")}
    </nav>
  `;
}

function Toast() {
  if (!toast) return "";
  return `
    <div class="cd-toast is-${toast.tone}">
      ${ic(toast.tone === "error" ? "alertCircle" : "checkCircle")}
      <span>${esc(toast.text)}</span>
      ${toast.undo ? `<button type="button" class="cd-toast-undo" id="coord-toast-undo" data-coord-toast-undo>Deshacer</button>` : ""}
      <button type="button" class="cd-toast-x" data-coord-toast-x aria-label="Cerrar aviso">${ic("x")}</button>
    </div>
  `;
}

/* ---------- Estado de la conexión (una línea) ---------- */

function SyncStrip() {
  const pending = registros.pendingCount();
  const offline = navigator.onLine === false;
  const errors = [...new Set(loadErrors.values())];
  const items = [];
  if (offline || pending) {
    items.push(`<p class="cd-sync is-warn">${ic("clock")}<span>${offline ? "Sin señal: seguí marcando, se envía solo." : ""}${pending ? ` ${pending} ${pending === 1 ? "cambio espera" : "cambios esperan"} señal.` : ""}${offline ? " Fotos y archivos: con señal." : ""}</span></p>`);
  }
  if (errors.length) {
    items.push(`<div class="cd-sync is-error">${ic("alertCircle")}<span>${errors.map(esc).join(" ")}</span>${button("Reintentar", "data-coord-retry", "secondary")}</div>`);
  }
  if (migrationNote) items.push(`<p class="cd-sync is-ok">${ic("uploadCloud")}<span>${esc(migrationNote)}</span></p>`);
  return items.join("");
}

/* ------------------------------------------------------------------ */
/* Inicio                                                              */
/* ------------------------------------------------------------------ */

function Tile({ go, iconName, n, label, sub, tone }) {
  return `
    <button type="button" class="cd-tile is-${tone}" data-coord-go="${go}" id="coord-tile-${go.replace(":", "-")}">
      <span class="cd-tile-top">${ic(iconName)}<b class="cd-tile-n">${n}</b></span>
      <span class="cd-tile-label">${label}</span>
      <small>${sub}</small>
    </button>
  `;
}

function InicioView() {
  const hoy = hoyAR();
  const user = currentUser();
  const sols = solicitudesPendientes();
  const urg = sols.filter((s) => s.urgente).length;
  const web = webNuevos(getPedidos());
  const vig = avisosVigentes();
  const barrios = groupByBarrio(vig).map(([b]) => b);
  const cargando = (col) => !loaded.has(col);
  return `
    <header class="cd-hello">
      <p class="cd-date">${esc(dayLabel(hoy))}</p>
      <h1 id="coord-view-title" tabindex="-1">Hola, ${esc(firstName(user.nombre) || user.nombre)}</h1>
    </header>
    <div class="cd-tiles">
      ${Tile({ go: "mas:cambios", iconName: "bell", n: sols.length, label: "Pedidos de cambio", tone: urg ? "alert" : sols.length ? "warn" : "ok", sub: cargando("solicitudes") && !sols.length ? "…" : urg ? `${urg} ${urg === 1 ? "urgente" : "urgentes"}` : sols.length ? "Pendientes" : "Al día" })}
      ${Tile({ go: "mas:pedidos", iconName: "clipboardCheck", n: web.length, label: "Pedidos nuevos", tone: web.length ? "warn" : "ok", sub: cargando("pedidos") && !web.length ? "…" : web.length ? "De la web" : "Al día" })}
      ${Tile({ go: "mas:avisos", iconName: "mapPin", n: vig.length, label: "Avisos", tone: vig.length ? "warn" : "ok", sub: vig.length ? esc(shortList(barrios, 1)) : "Sin avisos" })}
    </div>
    ${sols.length ? `
      <section class="cd-sec" aria-labelledby="coord-inicio-sol">
        <h2 class="cd-h2" id="coord-inicio-sol">Para resolver</h2>
        <ul class="cd-list">${sols.slice(0, 2).map((s) => SolicitudCard(s)).join("")}</ul>
        ${sols.length > 2 ? button(`Ver todos (${sols.length})`, `data-coord-go="mas:cambios"`, "ghost", "arrowRight") : ""}
      </section>` : ""}
    <section class="cd-sec" aria-labelledby="coord-inicio-rutas">
      <div class="cd-h2-row">
        <h2 class="cd-h2" id="coord-inicio-rutas">Rutas de hoy</h2>
        ${button("Semana", `data-coord-go-rutas="semana"`, "ghost", "calendarCheck")}
      </div>
      ${RoutesList(hoy)}
    </section>
  `;
}

/* ------------------------------------------------------------------ */
/* Rutas                                                               */
/* ------------------------------------------------------------------ */

function sortedStops(route) {
  return (route.paradas || []).slice().sort((a, b) => (minutesOf(a.hora) ?? 9999) - (minutesOf(b.hora) ?? 9999));
}

function Thumbs(stops, max = 7) {
  if (!stops.length) return `<p class="cd-muted">Sin perros</p>`;
  const more = stops.length - max;
  return `
    <div class="cd-thumbs" aria-hidden="true">
      ${stops.slice(0, more > 0 ? max - 1 : max).map((s) => Ava(dogOf(s), s.perroNombre, "sm")).join("")}
      ${more > 0 ? `<span class="cd-ava is-sm is-more">+${more + 1}</span>` : ""}
    </div>
  `;
}

function MiniStop(s, alert) {
  const dog = dogOf(s);
  return `
    <li class="cd-mini ${alert ? "is-alert" : ""}">
      <b class="cd-mini-hora">${esc(padHora(s.hora) || "--:--")}</b>
      ${Ava(dog, s.perroNombre, "sm")}
      <span class="cd-mini-name">${esc(s.perroNombre || dog?.name || PENDIENTE)}</span>
      <span class="cd-chips">${safetyChips(dog)}${dog ? carnetChip(dog) : chip("Sin ficha", "warn")}</span>
    </li>
  `;
}

function RouteCard(r, fecha, { detalle = false, filtro = false } = {}) {
  const w = warningsForDay(r, fecha);
  const todas = sortedStops(r);
  const stops = filtro ? todas.filter((s) => !tieneCarnet(dogOf(s))) : todas;
  const n = todas.length;
  const memKey = `ruta-${fecha}-${r.ruta}`;
  const indexOf = (s) => (r.paradas || []).indexOf(s);
  return `
    <li class="cd-card cd-route ${w.list.length ? "is-alert" : ""}">
      <div class="cd-route-top">
        <strong class="cd-route-code">${esc(r.ruta)}</strong>
        ${chip(esc(r.turno), "info")}
        ${r.origen === "dia" ? chip("Cambio del día", "warn") : ""}
        ${w.list.length ? chip(`${w.list.length} ${w.list.length === 1 ? "alerta" : "alertas"}`, "alert", "alertTriangle") : ""}
      </div>
      <p class="cd-route-time">${esc(routeSpan(r))}</p>
      <p class="cd-route-meta">${ic("users")}<span>${esc(firstName(r.paseador) || "Sin paseador")}${r.ayudante ? ` + ${esc(firstName(r.ayudante))}` : ""} · ${n} ${n === 1 ? "perro" : "perros"}</span></p>
      ${Thumbs(todas)}
      ${detalle ? cardMore(memKey, filtro ? `Sin carnet (${stops.length})` : "Paradas", `
        ${warnList(w.list)}
        ${stops.length ? `<ol class="cd-minis">${stops.map((s) => MiniStop(s, w.byStop.has(indexOf(s)))).join("")}</ol>` : `<p class="cd-muted">${filtro ? "Todos tienen carnet." : "Sin perros."}</p>`}
      `, filtro) : ""}
      <div class="cd-actions">
        ${button("Editar", `id="coord-ed-dia-${esc(r.ruta)}" data-coord-edit-dia="${esc(r.ruta)}" data-fecha="${fecha}" aria-label="Editar ${esc(r.ruta)} ${esc(r.turno.toLowerCase())}"`, "primary", "sliders")}
        ${button("Copiar", `data-coord-copy-ruta="${esc(r.ruta)}" data-fecha="${fecha}" aria-label="Copiar ${esc(r.ruta)} para WhatsApp"`, "ghost", "copy")}
      </div>
    </li>
  `;
}

function RoutesList(fecha, { detalle = false, filtro = false } = {}) {
  const plantillas = getPlantillas();
  if (!loaded.has("plantillas") && !plantillas.length) return emptyState("Cargando rutas…", "clock");
  if (!plantillas.length && !getRutasDia().length) {
    return `${emptyState("Todavía no hay rutas.", "route")}${button("Cargar rutas", `data-coord-go-rutas="dia"`, "primary", "uploadCloud")}`;
  }
  const routes = effectiveRoutes(fecha);
  if (!routes.length) return emptyState("No hay rutas este día.", "route");
  return `<ul class="cd-list">${routes.map((r) => RouteCard(r, fecha, { detalle, filtro })).join("")}</ul>`;
}

function RutasView() {
  const plantillas = getPlantillas();
  const head = `<div class="cd-viewhead"><h1 id="coord-view-title" tabindex="-1">Rutas</h1></div>`;
  if (!loaded.has("plantillas") && !plantillas.length) return `${head}${emptyState("Cargando rutas…", "clock")}`;
  if (!plantillas.length || cargaProgreso) return `${head}${CargaPlanilla()}`;
  const vista = rutasVista();
  return `
    ${head}
    <div class="cd-seg" role="group" aria-label="Qué ver">
      <button type="button" class="cd-seg-btn" id="coord-vista-dia" data-coord-vista="dia" aria-pressed="${vista === "dia"}">${ic("route")}<span>Día</span></button>
      <button type="button" class="cd-seg-btn" id="coord-vista-semana" data-coord-vista="semana" aria-pressed="${vista === "semana"}">${ic("calendarCheck")}<span>Semana</span></button>
    </div>
    ${vista === "semana" ? WeekView() : DayView()}
  `;
}

function CargaPlanilla() {
  const base = plantillasDesdePlanilla();
  const paseos = base.reduce((sum, p) => sum + p.paradas.length, 0);
  return `
    <div class="cd-card cd-carga">
      <p class="cd-big">${ic("uploadCloud")}<span><b>${base.length} rutas</b> · ${paseos} paseos</span></p>
      <p class="cd-muted">De la planilla RPJ (BASE RUTAS, 12/11/2026). Sin «Llak»: no coincide con ningún perro.</p>
      ${cargaProgreso ? `<p class="cd-note" role="status">${ic("clock")}<span>${esc(cargaProgreso)}</span></p>` : ""}
      ${cargaConfirm ? `
        <div class="cd-confirm" role="group" aria-labelledby="coord-carga-q">
          <p id="coord-carga-q"><b>¿Cargar las ${base.length} rutas?</b> Las ve todo el equipo.</p>
          <div class="cd-actions">
            ${button("Sí, cargar", `id="coord-carga-ok" data-coord-carga-ok`, "primary", "checkCircle")}
            ${button("Cancelar", `id="coord-carga-cancel" data-coord-carga-cancel`, "ghost")}
          </div>
        </div>`
        : button("Cargar rutas", `id="coord-carga" data-coord-carga`, "primary", "uploadCloud")}
    </div>
  `;
}

function shortDay(iso) {
  return `${DAY_SHORT[dayNameISO(iso)] || ""} ${fmtDate(iso).slice(0, 5)}`;
}

function DayView() {
  const hoy = hoyAR();
  const fecha = currentRutasFecha();
  const routes = effectiveRoutes(fecha);
  const total = routes.reduce((sum, r) => sum + (r.paradas || []).length, 0);
  const sinCarnet = new Set();
  routes.forEach((r) => (r.paradas || []).forEach((s) => {
    const dog = dogOf(s);
    if (!tieneCarnet(dog)) sinCarnet.add(dog?.id || normalize(s.perroNombre));
  }));
  const filtro = soloSinCarnet && routes.length > 0;
  const quick = [0, 1, 2].map((n) => addDaysISO(hoy, n));
  return `
    <div class="cd-chiprow cd-daypick" role="group" aria-label="Día">
      ${quick.map((iso, n) => `<button type="button" class="cd-pill" id="coord-dia-${n}" data-coord-ver-dia="${iso}" aria-pressed="${iso === fecha}">${n === 0 ? "Hoy" : esc(shortDay(iso))}</button>`).join("")}
      <label class="cd-pill is-date"><span class="coord-sr-only">Otro día</span>${ic("calendarCheck")}<input id="coord-rutas-fecha" type="date" value="${fecha}" min="${hoy}" max="${addDaysISO(hoy, 90)}" data-coord-rutas-fecha /></label>
    </div>
    <p class="cd-dayline"><b>${esc(dayLabel(fecha))}</b> · ${routes.length} ${routes.length === 1 ? "ruta" : "rutas"} · ${total} perros</p>
    ${routes.length ? `
      <div class="cd-chiprow">
        <button type="button" class="cd-pill" id="coord-filtro-carnet" data-coord-filtro-carnet aria-pressed="${filtro}">${ic("fileText", "coord-icon is-xs")}Sin carnet (${sinCarnet.size})</button>
        <button type="button" class="cd-pill" id="coord-copy-dia" data-coord-copy-dia="${fecha}">${ic("copy", "coord-icon is-xs")}Copiar todo</button>
      </div>` : ""}
    ${RoutesList(fecha, { detalle: true, filtro })}
    <div class="cd-actions is-split">
      ${SHIFT_LABELS.map((turno) => button(`Ruta ${turno.toLowerCase()}<span class="coord-sr-only"> extra, solo el ${esc(dayLabel(fecha).toLowerCase())}</span>`, `id="coord-extra-${slugDia(turno)}" data-coord-new-dia data-turno="${turno}" data-fecha="${fecha}"`, "ghost", "plus")).join("")}
    </div>
  `;
}

function WeekRouteButton(p, dia, turno) {
  const warns = warningsForPlantilla(p).list.length;
  const n = (p.paradas || []).length;
  return `
    <li>
      <button type="button" class="cd-wroute ${warns ? "is-alert" : ""}" id="coord-wr-${esc(p.id)}" data-coord-edit-plantilla="${esc(p.id)}" aria-label="Editar ${esc(p.ruta)}, ${dia.toLowerCase()} ${turno.toLowerCase()}, ${n} perros">
        <span class="cd-wroute-top"><strong>${esc(p.ruta)}</strong>${warns ? chip(String(warns), "alert", "alertTriangle") : ""}<span class="cd-wroute-n">${n} ${n === 1 ? "perro" : "perros"}</span></span>
        <span class="cd-wroute-meta">${esc(routeSpan(p))} · ${esc(firstName(p.paseador) || "Sin paseador")}</span>
        ${Thumbs(sortedStops(p), 6)}
      </button>
    </li>
  `;
}

function WeekView() {
  const plantillas = getPlantillas();
  const today = dayNameISO(hoyAR());
  const days = plantillas.some((p) => p.dia === "Domingo") ? WEEK_DAYS : SERVICE_DAYS;
  return `
    <p class="cd-muted">Se repite cada semana. Tocá una ruta para editarla.</p>
    <div class="cd-week">
      ${days.map((dia) => {
        const del = plantillasDe(dia);
        const perros = del.reduce((sum, p) => sum + p.paradas.length, 0);
        const warns = del.reduce((sum, p) => sum + warningsForPlantilla(p).list.length, 0);
        return `
          <details class="cd-fold cd-wday ${dia === today ? "is-today" : ""}" ${isOpen(`wd-${slugDia(dia)}`, dia === today) ? "open" : ""}>
            <summary data-coord-toggle="wd-${slugDia(dia)}">
              <span class="cd-wday-title"><b>${dia}</b>${dia === today ? chip("Hoy", "info") : ""}${warns ? chip(String(warns), "alert", "alertTriangle") : ""}</span>
              <span class="cd-muted">${del.length} ${del.length === 1 ? "ruta" : "rutas"} · ${perros}</span>
              ${ic("chevronDown", "coord-icon cd-chev")}
            </summary>
            <div class="cd-fold-body">
              ${SHIFT_LABELS.map((turno) => {
                const routes = del.filter((p) => p.turno === turno);
                return `
                  <div class="cd-wturno">
                    <p class="cd-wturno-label">${turno}</p>
                    ${routes.length ? `<ul class="cd-wroutes">${routes.map((p) => WeekRouteButton(p, dia, turno)).join("")}</ul>` : ""}
                    <button type="button" class="cd-add-mini" id="coord-wadd-${slugDia(dia)}-${slugDia(turno)}" data-coord-new-route data-dia="${dia}" data-turno="${turno}">${ic("plus")}<span>Ruta</span><span class="coord-sr-only"> nueva el ${dia.toLowerCase()} a la ${turno.toLowerCase()}</span></button>
                  </div>
                `;
              }).join("")}
            </div>
          </details>
        `;
      }).join("")}
    </div>
  `;
}

/* ---------- Editor de ruta ---------- */

// Alerta de una parada en 1 o 2 palabras (el texto completo queda en «Alertas» y en «Más» de la parada).
function shortWarn(msg) {
  if (/^No juntar/.test(msg)) return "No juntar";
  if (/^Tamaños/.test(msg)) return "Tamaños";
  if (/falta la hora/.test(msg)) return "Sin hora";
  if (/dos veces/.test(msg)) return "Repetido";
  if (/también está en/.test(msg)) return "En 2 rutas";
  if (/sin ficha/.test(msg)) return "";
  if (/estado/.test(msg)) return "";
  return "Revisar";
}

function StopCard(stop, index, warnings) {
  const dog = dogOf(stop);
  const msgs = warnings.byStop.get(index) || [];
  const last = editor.paradas.length - 1;
  const name = stop.perroNombre || dog?.name || PENDIENTE;
  const memKey = `stop-${editor.id}-${index}`;
  const end = validHora(stop.hora) ? sumarMinutos(padHora(stop.hora), stop.minutos || 45) : "";
  return `
    <li class="cd-stop ${msgs.length ? "is-alert" : ""}" id="coord-stop-${index}">
      <div class="cd-stop-row">
        <span class="cd-stop-ava">${Ava(dog, name, "md")}<b class="cd-stop-num" aria-hidden="true">${index + 1}</b></span>
        <div class="cd-stop-main">
          <strong>${esc(name)}</strong>
          <span class="cd-chips">${[...new Set(msgs.map(shortWarn).filter(Boolean))].map((w) => chip(w, "alert", "alertTriangle")).join("")}${safetyChips(dog)}${!dog ? chip("Sin ficha", "warn") : dog.status !== "Activo" ? chip(esc(dog.status), "alert") : ""}</span>
        </div>
        <label class="cd-hora-wrap" for="coord-ed-hora-${index}">
          <span class="coord-sr-only">Hora de retiro de ${esc(name)}</span>
          <input class="cd-hora" id="coord-ed-hora-${index}" type="time" step="300" value="${esc(padHora(stop.hora))}" data-coord-stop="${index}" data-k="hora" ${!validHora(stop.hora) ? 'aria-invalid="true"' : ""} />
        </label>
      </div>
      ${msgs.length ? `<p class="coord-sr-only">${esc(msgs.join(" "))}</p>` : ""}
      <div class="cd-stop-tools">
        <button type="button" class="cd-icon-btn" id="coord-ed-up-${index}" data-coord-stop-up="${index}" ${index === 0 ? "disabled" : ""} aria-label="Subir a ${esc(name)}">${ic("arrowUp")}</button>
        <button type="button" class="cd-icon-btn" id="coord-ed-down-${index}" data-coord-stop-down="${index}" ${index === last ? "disabled" : ""} aria-label="Bajar a ${esc(name)}">${ic("arrowDown")}</button>
        <button type="button" class="cd-icon-btn is-danger" id="coord-ed-del-${index}" data-coord-stop-del="${index}" aria-label="Quitar a ${esc(name)}">${ic("x")}</button>
        ${cardMore(memKey, `${Number(stop.minutos) || 45} min${stop.nota ? " · nota" : ""}`, `
          ${warnList(msgs)}
          <div class="cd-chiprow" role="group" aria-label="Minutos de ${esc(name)}">
            ${[20, 30, 45, 60].map((m) => `<button type="button" class="cd-pill" id="coord-ed-min-${index}-${m}" data-coord-stop-min="${index}" data-value="${m}" aria-pressed="${(Number(stop.minutos) || 45) === m}">${m} min</button>`).join("")}
          </div>
          ${end ? `<p class="cd-muted">Vuelve ~${end}</p>` : ""}
          <div class="coord-field">
            <label for="coord-ed-nota-${index}">Nota</label>
            <input id="coord-ed-nota-${index}" type="text" value="${esc(stop.nota)}" data-coord-stop="${index}" data-k="nota" placeholder="Ej.: bozal" autocomplete="off" />
          </div>
        `)}
      </div>
    </li>
  `;
}

function TeamChips(fieldName, label, current, { conNinguno = false, porNombre = false } = {}) {
  const opts = TEAM.map((t) => [porNombre ? t.name.split(" ")[0] : t.id, t.name.split(" ")[0]]);
  if (conNinguno) opts.unshift(["", "Ninguno"]);
  const known = opts.some(([value]) => normalize(value) === normalize(current));
  return `
    <div class="cd-team-row">
      <span class="coord-label" id="coord-ed-${fieldName}-label">${label}</span>
      <div class="cd-chiprow" role="group" aria-labelledby="coord-ed-${fieldName}-label">
        ${opts.map(([value, text]) => `<button type="button" class="cd-pill" id="coord-ed-set-${fieldName}-${slugDia(value) || "ninguno"}" data-coord-ed-set="${fieldName}" data-value="${esc(value)}" aria-pressed="${normalize(value) === normalize(current)}">${esc(text)}</button>`).join("")}
      </div>
      <input id="coord-ed-${fieldName}" class="cd-team-other" type="text" ${porNombre ? "" : 'list="coord-team-users"'} value="${known ? "" : esc(current)}" data-coord-ed-field="${fieldName}" autocomplete="off" placeholder="Otro${porNombre ? "" : " usuario"}" aria-label="${label}: otro" />
    </div>
  `;
}

function destinoLabel(e) {
  if (e.modo === "dia") return e.fecha === hoyAR() ? "Solo hoy" : `Solo ${shortDay(e.fecha)}`;
  return "Solo un día";
}

function RouteEditor() {
  const e = editor;
  const warnings = editorWarnings();
  const solicitud = e.solicitudId ? getSolicitudes().find((s) => s.id === e.solicitudId) : null;
  const isPlantilla = e.modo === "plantilla";
  const fechas = isPlantilla ? nextDatesFor(e.dia) : [];
  const semana = e.destino === "semana";
  const equipo = [firstName(e.paseador) || "Sin paseador", e.ayudante ? `+ ${firstName(e.ayudante)}` : "", e.supervisor ? `· sup. ${firstName(e.supervisor)}` : ""].filter(Boolean).join(" ");
  return `
    <section class="cd-editor" id="coord-editor" aria-labelledby="coord-view-title">
      <div class="cd-subhead">
        <button type="button" class="cd-back" id="coord-ed-close" data-coord-ed-close>${ic("arrowLeft")}<span>Volver</span></button>
        <div>
          <h1 id="coord-view-title" tabindex="-1">${esc(e.ruta)} · ${esc(e.turno)}</h1>
          <p class="cd-muted">${isPlantilla ? `Todos los ${esc(e.dia.toLowerCase())}` : esc(dayLabel(e.fecha))}${e.nuevo ? " · nueva" : ""}</p>
        </div>
      </div>

      ${editorConfirm === "salir" ? `
        <div class="cd-confirm" role="group" aria-labelledby="coord-salir-q">
          <p id="coord-salir-q"><b>¿Salir sin guardar?</b> Se pierden los cambios.</p>
          <div class="cd-actions">
            ${button("Salir", `id="coord-ed-close-ok" data-coord-ed-close-ok`, "danger", "x")}
            ${button("Seguir", `id="coord-ed-close-cancel" data-coord-ed-close-cancel`, "secondary")}
          </div>
        </div>` : ""}

      ${solicitud ? `
        <div class="cd-sol-box" role="note">
          <p>${ic("bell")}<span><b>${esc(firstName(solicitud.creadoPorNombre) || "Supervisor")}:</b> ${esc(solicitud.titulo || solicitud.tipo || "")}${solicitud.detalle ? ` · ${esc(solicitud.detalle)}` : ""}</span></p>
          ${e.precarga ? `<p class="cd-done">${ic("checkCircle")}<span>${esc(e.precarga)}</span></p>` : ""}
          <div class="coord-field">
            <label for="coord-ed-respuesta">Respuesta</label>
            <input id="coord-ed-respuesta" type="text" value="${esc(e.respuesta)}" data-coord-ed-field="respuesta" placeholder="Opcional" autocomplete="off" />
          </div>
        </div>` : ""}

      ${e.nuevo ? `
        <div class="coord-field">
          <label for="coord-ed-ruta">Código</label>
          <input id="coord-ed-ruta" type="text" value="${esc(e.ruta)}" data-coord-ed-field="ruta" autocomplete="off" placeholder="PJ_2M" />
        </div>` : ""}

      ${fold(`ed-equipo`, `${ic("users")}<b>Equipo</b> <span class="cd-muted">${esc(equipo)}</span>`, `
        ${TeamChips("paseador", "Paseador", e.paseador)}
        ${TeamChips("ayudante", "Ayudante", e.ayudante, { conNinguno: true })}
        ${TeamChips("supervisor", "Supervisa", e.supervisor, { porNombre: true })}
      `, { open: e.nuevo || !e.paseador })}

      ${warnings.list.length ? cardMore(`ed-warn-${e.id}`, `${ic("alertTriangle")}<b>${warnings.list.length} ${warnings.list.length === 1 ? "alerta" : "alertas"}</b> <span class="cd-muted">No frena el guardado</span>`, warnList(warnings.list)) : ""}

      <div class="cd-h2-row">
        <h2 class="cd-h2">Perros <span class="cd-count">${e.paradas.length}</span></h2>
        ${e.paradas.length > 1 ? button("Por hora", `id="coord-ed-sort" data-coord-ed-sort`, "ghost", "clock") : ""}
      </div>
      ${e.paradas.length ? `<ol class="cd-stops">${e.paradas.map((s, i) => StopCard(s, i, warnings)).join("")}</ol>` : emptyState("Sin perros todavía.", "pawPrint")}

      <button type="button" class="coord-btn is-secondary is-block" id="coord-ed-picker" data-coord-ed-picker>${ic("plus")}<span>Agregar perro</span></button>

      ${fold("ed-mas", `${ic("menu")}<b>Más</b>`, `
        <div class="coord-field">
          <label for="coord-ed-notas">Notas de la ruta</label>
          <textarea id="coord-ed-notas" rows="2" data-coord-ed-field="notas" placeholder="Ej.: arrancar por Mapuche">${esc(e.notas)}</textarea>
        </div>
        <div class="cd-actions">
          ${button("Copiar", `id="coord-ed-copy" data-coord-ed-copy`, "ghost", "copy")}
          ${e.existeDia && canDelete(e.existeDia) ? button("Igual que la semana", `id="coord-ed-revert" data-coord-ed-revert`, "ghost", "calendarCheck") : ""}
        </div>
      `)}

      <div class="cd-savebar">
        <div class="cd-switch" role="radiogroup" aria-label="Guardar para">
          <button type="button" role="radio" class="cd-switch-btn" id="coord-ed-destino-dia" data-coord-ed-destino="dia" aria-checked="${!semana}">${esc(destinoLabel(e))}</button>
          <button type="button" role="radio" class="cd-switch-btn" id="coord-ed-destino-semana" data-coord-ed-destino="semana" aria-checked="${semana}">Toda la semana</button>
        </div>
        ${isPlantilla && !semana ? `
          <label class="coord-sr-only" for="coord-ed-solodia">Qué día</label>
          <select id="coord-ed-solodia" class="cd-savebar-select" data-coord-ed-field="soloDia">
            ${fechas.map((f) => `<option value="${f}" ${f === e.soloDia ? "selected" : ""}>${esc(dayLabel(f))}${f === hoyAR() ? " (hoy)" : ""}${getRutasDia().some((r) => r.id === rutaDiaId(f, e.ruta)) ? " · se reemplaza" : ""}</option>`).join("")}
          </select>` : `<p class="cd-savebar-hint">${semana ? `Cambia todos los ${esc(e.dia.toLowerCase())}.` : "La semana no cambia."}</p>`}
        <button type="button" class="coord-btn is-primary is-block is-big" id="coord-ed-save" data-coord-ed-save>${ic("checkCircle")}<span>Guardar</span></button>
      </div>
    </section>
  `;
}

/* ---------- Grilla de fotos para agregar perros ---------- */

function pickerGrid() {
  if (!editor) return "";
  const q = normalize(editorQuery);
  const inRoute = new Set(editor.paradas.map((s) => dogOf(s)?.id).filter(Boolean));
  const salen = (dog) => goesOn(dog, editor.dia, editor.turno);
  const list = REAL_DOGS
    .filter((dog) => !q || normalize(dog.name).includes(q))
    .sort((a, b) => Number(salen(b)) - Number(salen(a)) || a.name.localeCompare(b.name, "es"));
  const exact = REAL_DOGS.some((dog) => normalize(dog.name) === q);
  const hora = validHora(editorHora) ? padHora(editorHora) : nextFreeHora(editor);
  return `
    ${list.length ? `
      <ul class="cd-dog-grid">
        ${list.map((dog) => {
          const ya = inRoute.has(dog.id);
          return `
            <li class="cd-dog-tile ${ya ? "is-in" : ""}">
              <button type="button" class="cd-dog-add" id="coord-add-${dog.id}" data-coord-add-dog="${dog.id}" aria-label="${ya ? `${esc(dog.name)} ya está. Agregar otra vez a las ${hora}` : `Agregar a ${esc(dog.name)} a las ${hora}`}">
                ${Ava(dog, dog.name, "lg")}
                ${ya ? `<span class="cd-dog-in">${ic("check")}</span>` : ""}
                <b>${esc(dog.name)}</b>
                <span class="cd-chips">${hasMuzzle(dog) ? chip("Bozal", "alert") : ""}${dog.incompatibleWith?.length ? chip("No juntar", "warn") : ""}${dog.status !== "Activo" ? chip(esc(dog.status), "alert") : salen(dog) ? chip("Suele salir", "info") : ""}</span>
              </button>
              ${FotoBtn(dog, { compact: true })}
            </li>`;
        }).join("")}
      </ul>` : emptyState("Ningún perro con ese nombre.", "search")}
    ${!exact && editorQuery.trim().length >= 2 ? `
      <button type="button" class="coord-btn is-ghost is-block" id="coord-add-libre" data-coord-add-libre>${ic("plus")}<span>«${esc(editorQuery.trim())}» sin ficha · ${hora}</span></button>` : ""}
  `;
}

function DogPicker() {
  const e = editor;
  const suggested = validHora(editorHora) ? padHora(editorHora) : nextFreeHora(e);
  return `
    <section class="cd-picker" aria-labelledby="coord-view-title">
      <div class="cd-subhead">
        <button type="button" class="cd-back" id="coord-picker-back" data-coord-ed-picker-close>${ic("arrowLeft")}<span>Ruta</span></button>
        <div>
          <h1 id="coord-view-title" tabindex="-1">Agregar perro</h1>
          <p class="cd-muted">${esc(e.ruta)} · ${esc(e.turno)} · ${e.paradas.length} perros</p>
        </div>
      </div>
      <div class="cd-picker-tools">
        <label class="cd-search" for="coord-ed-buscar">
          ${ic("search")}<span class="coord-sr-only">Buscar perro</span>
          <input id="coord-ed-buscar" type="search" value="${esc(editorQuery)}" data-coord-ed-search autocomplete="off" placeholder="Buscar" aria-controls="coord-picker-grid" />
        </label>
        <label class="cd-hora-wrap is-small" for="coord-ed-nueva-hora">
          <span class="cd-muted">Hora</span>
          <input class="cd-hora" id="coord-ed-nueva-hora" type="time" step="300" value="${esc(suggested)}" data-coord-ed-hora />
        </label>
      </div>
      <div id="coord-picker-grid">${pickerGrid()}</div>
      <div class="cd-savebar">
        <button type="button" class="coord-btn is-primary is-block is-big" id="coord-picker-done" data-coord-ed-picker-close>${ic("check")}<span>Listo${e.agregados ? ` (${e.agregados})` : ""}</span></button>
      </div>
    </section>
  `;
}

/* ------------------------------------------------------------------ */
/* Pedidos de cambio del supervisor                                    */
/* ------------------------------------------------------------------ */

const RECHAZOS_RAPIDOS = [
  ["Sin lugar", "No hay lugar en la ruta ese día."],
  ["Ya estaba", "Ya estaba así en la ruta."],
  ["Falta info", "Falta info: decime qué perro, qué día y a qué hora."],
  ["Lo hablo", "Lo hablo con Juan y te aviso."],
];

function SolicitudCard(s) {
  const id = esc(s.id);
  const estado = s.estado || "pendiente";
  const dog = solicitudPerro(s);
  const nombre = s.perroNombre || dog?.name || "";
  const que = s.titulo || [s.tipo, nombre].filter(Boolean).join(": ") || "Pedido de cambio";
  const rechazo = rechazoAbierto === s.id;
  const estadoChip = estado === "aplicado" ? chip("Aplicado", "ok") : estado === "rechazado" ? chip("Rechazado", "neutral") : chip("Pendiente", "warn");
  return `
    <li class="cd-card cd-sol ${s.urgente && estado === "pendiente" ? "is-urgent" : ""}" id="coord-sol-${id}" tabindex="-1">
      <div class="cd-row">
        ${Ava(dog, nombre || s.tipo, "md")}
        <div class="cd-row-main">
          <strong>${esc(que)}</strong>
          <small>${esc([s.fecha ? shortDay(s.fecha) : "", s.turno, s.ruta].filter(Boolean).join(" · ") || PENDIENTE)}</small>
        </div>
      </div>
      <p class="cd-chips">${s.urgente ? chip("Urgente", "alert", "alertTriangle") : ""}${estadoChip}${safetyChips(dog)}</p>
      ${s.detalle ? `<p class="cd-line">${esc(s.detalle)}</p>` : ""}
      ${cardMore(`sol-${s.id}`, "Más", dataList([
        ["Por qué", s.motivo],
        ["Pidió", s.creadoPorNombre ? `${s.creadoPorNombre}${s.creadoEn ? `, ${fmtStamp(s.creadoEn)}` : ""}` : ""],
        ["Respuesta", s.respuesta],
      ]) || `<p class="cd-muted">Sin más datos.</p>`)}
      ${s.pendiente ? `<p class="coord-meta is-pending">${ic("clock")}<span>Se envía con señal.</span></p>` : ""}
      ${estado === "pendiente" ? rechazo ? `
        <div class="cd-reject" role="group" aria-labelledby="coord-rechazo-t-${id}">
          <p class="cd-reject-title" id="coord-rechazo-t-${id}">Respuesta rápida</p>
          <div class="cd-chiprow">
            ${RECHAZOS_RAPIDOS.map(([label, texto], i) => `<button type="button" class="cd-pill" id="coord-rapido-${id}-${i}" data-coord-sol-rapido="${id}" data-texto="${esc(texto)}">${esc(label)}</button>`).join("")}
          </div>
          <div class="coord-field">
            <label for="coord-rechazo-${id}">O escribí</label>
            <textarea id="coord-rechazo-${id}" rows="2" data-coord-rechazo="${id}" placeholder="Ej.: lo pasamos al lunes">${esc(rechazos[s.id] || "")}</textarea>
          </div>
          <div class="cd-actions">
            ${button("Enviar", `id="coord-rechazar-ok-${id}" data-coord-sol-rechazar-ok="${id}"`, "primary", "send")}
            ${button("Cancelar", `data-coord-sol-rechazar-cancel="${id}"`, "ghost")}
          </div>
        </div>` : `
        <div class="cd-actions is-split">
          ${button("Aplicar", `id="coord-aplicar-${id}" data-coord-sol-aplicar="${id}"`, "primary", "checkCircle")}
          ${button("Rechazar", `id="coord-rechazar-${id}" data-coord-sol-rechazar="${id}"`, "ghost", "x")}
        </div>` : ""}
    </li>
  `;
}

function CambiosView() {
  const pend = solicitudesPendientes();
  const done = getSolicitudes().filter((s) => (s.estado || "pendiente") !== "pendiente");
  return `
    ${SubHead("Pedidos de cambio", pend.length)}
    <p class="cd-muted">Del supervisor. «Aplicar» abre la ruta con el cambio listo.</p>
    ${pend.length ? `<ul class="cd-list">${pend.map((s) => SolicitudCard(s)).join("")}</ul>` : emptyState(loaded.has("solicitudes") ? "No hay pedidos pendientes." : "Cargando…", loaded.has("solicitudes") ? "checkCircle" : "clock")}
    ${done.length ? fold("solHist", `Respondidos (${done.length})`, `<ul class="cd-list">${done.map((s) => SolicitudCard(s)).join("")}</ul>`) : ""}
  `;
}

/* ------------------------------------------------------------------ */
/* Clientes                                                            */
/* ------------------------------------------------------------------ */

function dogNames(ids) {
  return (Array.isArray(ids) ? ids : []).map((id) => DOG_BY_ID.get(id)?.name || id);
}

function ClienteCard(c) {
  const id = esc(c.id);
  const estado = CLIENTE_ESTADOS.find(([v]) => v === c.estado) || CLIENTE_ESTADOS[0];
  const perros = (Array.isArray(c.perros) ? c.perros : []).map((dogId) => DOG_BY_ID.get(dogId) || { id: "", name: dogId });
  const docs = archivosDeCliente(c).length;
  const abierto = subida?.clienteId === c.id || (fileFlash?.key === `cliente-${c.id}` && Date.now() < fileFlash.until);
  return `
    <li class="cd-card cd-cli is-${esc(estado[0])}" id="coord-cli-${id}">
      <div class="cd-row">
        ${Ava(perros[0]?.id ? perros[0] : null, perros[0]?.name || c.nombre, "md")}
        <div class="cd-row-main">
          <strong>${esc(c.nombre || PENDIENTE)}</strong>
          <small>${esc(c.barrio || "Sin barrio")}</small>
        </div>
        ${chip(estado[1], estado[0] === "activo" ? "ok" : estado[0] === "pausa" ? "warn" : "neutral")}
      </div>
      ${perros.length ? `
        <ul class="cd-cli-dogs">
          ${perros.map((d) => `
            <li>
              ${Ava(d.id ? d : null, d.name, "sm")}
              <span class="cd-cli-dog">${esc(d.name)}</span>
              <span class="cd-chips">${d.id ? `${safetyChips(d)}${carnetChip(d)}` : chip("Sin ficha", "warn")}</span>
              ${FotoBtn(d.id ? d : null, { compact: true })}
            </li>`).join("")}
        </ul>` : `<p class="cd-muted">Sin perros cargados.</p>`}
      ${c.pendiente ? `<p class="coord-meta is-pending">${ic("clock")}<span>Se envía con señal.</span></p>` : ""}
      <div class="cd-actions is-split">
        ${c.telefono ? whatsappLinkTo(c.telefono, `Hola ${c.nombre || ""}, te escribo de Paseos Juan.`.replace(" ,", ","), "whatsapp", "WhatsApp") : ""}
        ${button("Editar", `id="coord-cli-edit-${id}" data-coord-cliente-edit="${id}"`, "ghost", "sliders")}
      </div>
      ${cardMore(`cli-${c.id}`, `Más datos · Docs (${docs})`, `
        ${dataList([
          ["Teléfono", c.telefono],
          ["Plan", c.plan && c.plan !== PENDIENTE ? c.plan : ""],
          ["Días", Array.isArray(c.dias) && c.dias.length ? daysLabel(c.dias) : ""],
          ["Turno", c.turno && c.turno !== PENDIENTE ? c.turno : ""],
          ["Notas", c.notas],
        ], "is-compact")}
        ${DocumentosCliente(c)}
      `, abierto)}
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
    return emptyState(!loaded.has("clientes") ? "Cargando clientes…" : clienteQuery ? "Ningún cliente coincide." : "Todavía no hay clientes.", !loaded.has("clientes") ? "clock" : "users");
  }
  return `<ul class="cd-list is-grid">${list.map(ClienteCard).join("")}</ul>`;
}

function ClientesView() {
  const clientes = getClientes();
  const activos = clientes.filter((c) => (c.estado || "activo") === "activo").length;
  return `
    <div class="cd-viewhead">
      <h1 id="coord-view-title" tabindex="-1">Clientes</h1>
      ${clientes.length ? chip(`${activos} ${activos === 1 ? "activo" : "activos"}`, "ok") : ""}
    </div>
    <div class="cd-toolbar">
      <label class="cd-search" for="coord-clientes-buscar">
        ${ic("search")}<span class="coord-sr-only">Buscar cliente</span>
        <input id="coord-clientes-buscar" type="search" value="${esc(clienteQuery)}" data-coord-clientes-buscar placeholder="Tutor, perro o barrio" autocomplete="off" aria-controls="coord-clientes-lista" />
      </label>
      ${button("Nuevo", `id="coord-cliente-new" data-coord-cliente-new`, "primary", "plus")}
    </div>
    <div id="coord-clientes-lista" aria-live="polite">${clientesListHTML()}</div>
  `;
}

function ClienteForm() {
  const draft = getDraft("cliente");
  const editing = Boolean(draft.id);
  const perros = Array.isArray(draft.perros) ? draft.perros : [];
  const dias = Array.isArray(draft.dias) ? draft.dias : [];
  const adjuntos = (Array.isArray(draft.archivos) ? draft.archivos : []).map((archivoId) => archivoPorId(archivoId) || { id: archivoId, tipo: TIPO_CARNET });
  const dogOptions = REAL_DOGS.slice().sort((a, b) => Number(perros.includes(b.id)) - Number(perros.includes(a.id)) || a.name.localeCompare(b.name, "es"));
  const barrios = barriosConocidos();
  return `
    <form class="cd-form" id="coord-cliente-form" data-coord-form="cliente" novalidate>
      <div class="cd-subhead">
        <button type="button" class="cd-back" data-coord-cliente-cancel>${ic("arrowLeft")}<span>Clientes</span></button>
        <h1 id="coord-view-title" tabindex="-1">${editing ? esc(draft.nombre || "Editar") : "Cliente nuevo"}</h1>
      </div>
      ${draft.pedidoId ? `<p class="cd-note">${ic("clipboardCheck")}<span>Con datos del pedido. Revisalo.</span></p>` : ""}
      ${!editing && adjuntos.length ? `<p class="cd-done">${ic("fileCheck")}<span>${adjuntos.some(esCarnet) ? "El carnet del pedido queda vinculado." : "Los archivos del pedido quedan vinculados."}</span></p>` : ""}
      <input type="hidden" name="id" value="${esc(draft.id || "")}" />
      <input type="hidden" name="pedidoId" value="${esc(draft.pedidoId || "")}" />
      ${field("cliente", "nombre", "Tutor", { value: draft.nombre, required: true, attrs: 'autocomplete="off"' })}
      ${field("cliente", "telefono", "Celular", { value: draft.telefono, type: "tel", attrs: 'autocomplete="off" inputmode="tel" placeholder="11 1234-5678"' })}
      <div class="coord-field">
        <label for="coord-cliente-barrio">Barrio</label>
        <input id="coord-cliente-barrio" name="barrio" type="text" value="${esc(draft.barrio || "")}" list="coord-barrios" autocomplete="off" />
        ${quickFill("coord-cliente-barrio", barrios.slice(0, 6).map((b) => [b, b]), draft.barrio)}
      </div>
      <div class="coord-field">
        <span class="coord-label" id="coord-cliente-perros-label">Perros${perros.length ? ` (${perros.length})` : ""}</span>
        <label class="cd-search is-small" for="coord-cliente-perros-buscar">
          ${ic("search")}<span class="coord-sr-only">Filtrar perros</span>
          <input id="coord-cliente-perros-buscar" type="search" data-coord-filter-perros placeholder="Buscar perro" autocomplete="off" />
        </label>
        <div class="cd-pick-grid" role="group" aria-labelledby="coord-cliente-perros-label">
          ${dogOptions.map((dog) => `
            <label class="cd-pick-dog" data-name="${esc(normalize(dog.name))}">
              <input type="checkbox" id="coord-cliente-perro-${dog.id}" name="perros" value="${dog.id}" ${perros.includes(dog.id) ? "checked" : ""} />
              ${Ava(dog, dog.name, "md")}
              <span>${esc(dog.name)}</span>
              <span class="cd-pick-check" aria-hidden="true">${ic("check")}</span>
            </label>`).join("")}
        </div>
      </div>
      ${fold("cli-mas", `${ic("menu")}<b>Más datos</b>`, `
        ${selectField("cliente", "plan", "Plan", CLIENTE_PLANES, { value: draft.plan || PENDIENTE })}
        ${selectField("cliente", "turno", "Turno", CLIENTE_TURNOS, { value: draft.turno || PENDIENTE })}
        ${selectField("cliente", "estado", "Estado", CLIENTE_ESTADOS, { value: draft.estado || "activo" })}
        ${daysField("cliente", dias)}
        ${textArea("cliente", "notas", "Notas", { value: draft.notas, placeholder: "Llaves, portería, horarios", hint: "Sin salud ni pagos." })}
      `)}
      <datalist id="coord-barrios">${barrios.map((b) => `<option value="${esc(b)}"></option>`).join("")}</datalist>
      <div class="cd-savebar is-row">
        ${button("Cancelar", `data-coord-cliente-cancel`, "ghost")}
        <button type="button" class="coord-btn is-primary is-big" id="coord-cliente-save" data-coord-cliente-save>${ic("checkCircle")}<span>Guardar</span></button>
      </div>
    </form>
  `;
}

/* ------------------------------------------------------------------ */
/* Más                                                                 */
/* ------------------------------------------------------------------ */

function SubHead(title, count) {
  return `
    <div class="cd-subhead">
      <button type="button" class="cd-back" data-coord-go="mas">${ic("arrowLeft")}<span>Más</span></button>
      <h1 id="coord-view-title" tabindex="-1">${title}${count ? ` <span class="cd-count">${count}</span>` : ""}</h1>
    </div>
  `;
}

function MasView() {
  const sub = getView().sub;
  if (sub) {
    return {
      cambios: CambiosView,
      pedidos: PedidosView,
      avisos: AvisosView,
      fichas: FichasView,
      datos: DatosView,
      docs: DocsView,
      incidentes: IncidentesView,
    }[sub]();
  }
  const pedidos = getPedidos();
  const abiertos = pedidos.filter((p) => estadoDe(p) !== "resuelto").length;
  const activos = REAL_DOGS.filter((dog) => dog.status === "Activo");
  const sinCarnet = activos.filter((dog) => !tieneCarnet(dog)).length;
  const desde = haceDias(6);
  const incidentes = cached("incidentes").filter((r) => !r.fecha || r.fecha >= desde).length;
  const items = [
    ["cambios", "bell", "Cambios", solicitudesPendientes().length, "alert"],
    ["pedidos", "clipboardCheck", "Pedidos", abiertos, "warn"],
    ["avisos", "mapPin", "Avisos", avisosVigentes().length, "warn"],
    ["fichas", "userPlus", "Fichas", 0, "neutral"],
    ["datos", "help", "Datos a confirmar", pendingReview().length, "warn"],
    ["docs", "fileText", "Documentos", sinCarnet, "warn"],
    ["incidentes", "activity", "Incidentes", incidentes, "alert"],
  ];
  return `
    <div class="cd-viewhead"><h1 id="coord-view-title" tabindex="-1">Más</h1></div>
    <div class="cd-menu">
      ${items.map(([sub, iconName, label, n, tone]) => `
        <button type="button" class="cd-menu-btn" id="coord-mas-${sub}" data-coord-go="mas:${sub}">
          ${ic(iconName)}<span>${label}</span>${n ? `<b class="cd-menu-n is-${tone}">${n}</b>` : ""}
        </button>`).join("")}
    </div>
    <p class="cd-foot">Rutas: ${esc(BUSINESS_INFO.officialSources.routes)} (${DATA_UPDATED}). Perros: ${esc(BUSINESS_INFO.officialSources.dogs)}. Carnets y documentos: privados. Pagos: solo Juan.</p>
  `;
}

/* ---------- Avisos por barrio ---------- */

function avisoTone(tipo) {
  return tipo === "seguridad" || tipo === "perro suelto" ? "alert" : tipo === "clima" || tipo === "cambio de horario" ? "info" : "warn";
}

function AvisoCard(aviso, { history = false } = {}) {
  const id = esc(aviso.id);
  return `
    <li class="cd-card cd-aviso ${history ? "is-old" : ""}">
      <p class="cd-chips">${chip(esc(aviso.tipo || "otro"), avisoTone(aviso.tipo), "alertTriangle")}${chip(esc(aviso.barrio || "Sin barrio"), "neutral", "mapPin")}${chip(`${history ? "Venció" : "Hasta"} ${esc(fmtDate(isISODate(aviso.vigenteHasta) ? aviso.vigenteHasta : aviso.fecha).slice(0, 5))}`, history ? "neutral" : "info")}</p>
      <p class="cd-aviso-msg">${esc(aviso.mensaje || aviso.titulo || "")}</p>
      ${whoLine(aviso)}
      <div class="cd-actions">
        ${button("Copiar", `data-coord-aviso-copy="${id}" aria-label="Copiar aviso de ${esc(aviso.barrio || "barrio")} para WhatsApp"`, "ghost", "copy")}
        ${!history ? button("Terminó", `id="coord-aviso-fin-${id}" data-coord-aviso-fin="${id}"`, "ghost", "checkCircle") : ""}
      </div>
    </li>
  `;
}

function AvisoForm() {
  const draft = getDraft("aviso");
  const hoy = hoyAR();
  const tipo = AVISO_TIPOS.includes(draft.tipo) ? draft.tipo : AVISO_TIPOS[0];
  const hasta = draft.vigenteHasta || hoy;
  return `
    <form class="cd-card cd-form is-inline" id="coord-aviso-form" data-coord-form="aviso" novalidate>
      <div class="coord-field">
        <span class="coord-label" id="coord-aviso-tipo-label">Tipo</span>
        <div class="cd-chiprow" role="radiogroup" aria-labelledby="coord-aviso-tipo-label">
          ${AVISO_TIPOS.map((t) => `<label class="cd-pill is-check"><input type="radio" name="tipo" value="${esc(t)}" ${t === tipo ? "checked" : ""} /><span>${esc(t[0].toUpperCase() + t.slice(1))}</span></label>`).join("")}
        </div>
      </div>
      <div class="coord-field">
        <label for="coord-aviso-barrio">Barrio <span class="coord-required">*<span class="coord-sr-only"> obligatorio</span></span></label>
        <input id="coord-aviso-barrio" name="barrio" type="text" value="${esc(draft.barrio || "")}" list="coord-barrios-aviso" autocomplete="off" />
        ${quickFill("coord-aviso-barrio", barriosConocidos().slice(0, 6).map((b) => [b, b]), draft.barrio)}
      </div>
      ${textArea("aviso", "mensaje", "Qué pasa", { value: draft.mensaje, required: true, placeholder: "Ej.: corte en la entrada, usar la puerta 2" })}
      <div class="coord-field">
        <label for="coord-aviso-vigenteHasta">Hasta</label>
        <input id="coord-aviso-vigenteHasta" name="vigenteHasta" type="date" value="${esc(hasta)}" min="${hoy}" />
        ${quickFill("coord-aviso-vigenteHasta", [[hoy, "Hoy"], [addDaysISO(hoy, 1), "Mañana"], [addDaysISO(hoy, 7), "7 días"]], hasta)}
      </div>
      <datalist id="coord-barrios-aviso">${barriosConocidos().map((b) => `<option value="${esc(b)}"></option>`).join("")}</datalist>
      <div class="cd-actions is-split">
        <button type="button" class="coord-btn is-primary" id="coord-aviso-save" data-coord-aviso-save>${ic("send")}<span>Avisar</span></button>
        ${button("Cancelar", `data-coord-aviso-cancel`, "ghost")}
      </div>
    </form>
  `;
}

function AvisosView() {
  const hoy = hoyAR();
  const all = getAvisos();
  const vigentes = all.filter((a) => avisoVigente(a, hoy));
  const viejos = all.filter((a) => !avisoVigente(a, hoy)).slice(0, 20);
  return `
    ${SubHead("Avisos", vigentes.length)}
    ${avisoFormOpen ? AvisoForm() : button("Nuevo aviso", `id="coord-aviso-new" data-coord-aviso-new`, "primary", "plus")}
    ${vigentes.length
      ? groupByBarrio(vigentes).map(([barrio, avisos]) => `
        <section class="cd-sec" aria-label="Avisos en ${esc(barrio)}">
          <h2 class="cd-h2">${ic("mapPin")}<span>${esc(barrio)}</span> <span class="cd-count">${avisos.length}</span></h2>
          <ul class="cd-list">${avisos.map((a) => AvisoCard(a)).join("")}</ul>
        </section>`).join("")
      : emptyState(loaded.has("avisos") ? "Sin avisos vigentes." : "Cargando…", loaded.has("avisos") ? "checkCircle" : "clock")}
    ${viejos.length ? fold("avisosViejos", `Vencidos (${viejos.length})`, `<ul class="cd-list">${viejos.map((a) => AvisoCard(a, { history: true })).join("")}</ul>`) : ""}
  `;
}

/* ---------- Pedidos de clientes y evaluaciones ---------- */

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
  const perroNombre = isWeb ? d.perro : pedidoPerro(pedido);
  const dog = DOG_BY_NAME.get(normalize(perroNombre)) || null;
  const bite = d.mordida && d.mordida !== "No";
  const tieneCarnetPedido = archivosDePedido(pedido).some(esCarnet);
  const next = {
    nuevo: button("Empezar", `data-coord-pedido-move="${id}" data-estado="en-curso"`, "secondary", "play"),
    "en-curso": button("Resolver", `data-coord-pedido-move="${id}" data-estado="resuelto"`, "secondary", "checkCircle"),
    resuelto: button("Reabrir", `data-coord-pedido-move="${id}" data-estado="en-curso"`, "ghost"),
  }[estado];
  const canFicha = (isWeb || /evaluaci/i.test(pedido.tipo || "")) && !ficha && estado !== "resuelto";
  const saludo = d.responsable ? `Hola ${d.responsable}` : "Hola";
  const pedirCarnet = tieneCarnetPedido ? "" : " Cuando puedas, mandanos una foto del carnet de vacunas.";
  return `
    <li class="cd-card cd-pedido ${isWeb ? "is-web" : ""}" id="coord-pedido-${id}" tabindex="-1">
      <div class="cd-row">
        ${Ava(dog, perroNombre || pedido.tipo, "md")}
        <div class="cd-row-main">
          <strong>${esc(perroNombre || pedido.tipo || "Pedido")}</strong>
          <small>${esc([pedido.tipo || (isWeb ? "Formulario web" : ""), fmtDate(pedido.fecha).slice(0, 5), d.canal].filter(Boolean).join(" · "))}</small>
        </div>
        ${isWeb ? chip("Web", "info") : ""}
      </div>
      <p class="cd-chips">
        ${chip(ESTADO_LABEL[estado], estado === "nuevo" ? "neutral" : estado === "en-curso" ? "info" : "ok")}
        ${bite ? chip("Mordió", "alert", "alertTriangle") : ""}
        ${d.perros === "No" ? chip("No con perros", "warn") : ""}
        ${isWeb && estado !== "resuelto" ? tieneCarnetPedido ? chip("Carnet", "ok", "check") : chip("Sin carnet", "warn") : ""}
        ${ficha ? chip("Ficha", "ok", "check") : ""}
        ${cliente ? chip("Cliente", "ok", "check") : ""}
      </p>
      ${isWeb ? `<p class="cd-line">${esc([d.responsable, [d.zona, d.referencia].filter(Boolean).join(" · ")].filter(Boolean).join(" · ") || PENDIENTE)}</p>` : pedido.detalle ? `<p class="cd-line">${esc(pedido.detalle)}</p>` : ""}
      <div class="cd-actions is-split">
        ${estado !== "resuelto" && isWeb ? whatsappLinkTo(d.telefono, `${saludo}, te escribo de Paseos Juan por el pedido de evaluación de ${d.perro || "tu perro"}.${pedirCarnet}`, "whatsapp", "WhatsApp") : ""}
        ${next}
      </div>
      ${cardMore(`pedido-${pedido.id}`, "Más", `
        ${isWeb ? webData(pedido) : ""}
        ${AdjuntosPedido(pedido)}
        ${whoLine(pedido, { web: isWeb })}
        <div class="cd-actions">
          ${!cliente && (isWeb || d.responsable) ? button("Hacer cliente", `data-coord-pedido-cliente="${id}"`, "ghost", "userPlus") : ""}
          ${canFicha ? button("Hacer ficha", `data-coord-pedido-ficha="${id}"`, "ghost", "fileText") : ""}
          ${estado === "en-curso" ? button("A nuevo", `data-coord-pedido-move="${id}" data-estado="nuevo"`, "ghost") : ""}
          ${estado === "nuevo" ? button("Resolver", `data-coord-pedido-move="${id}" data-estado="resuelto"`, "ghost", "checkCircle") : ""}
          ${estado === "resuelto" && canDelete(pedido) ? button("Borrar", `data-coord-pedido-delete="${id}"`, "danger", "trash") : ""}
        </div>
      `)}
    </li>
  `;
}

function PedidoForm() {
  const draft = getDraft("pedido");
  return `
    <form class="cd-card cd-form is-inline" data-coord-form="pedido" novalidate>
      ${selectField("pedido", "tipo", "Tipo", PEDIDO_TIPOS, { value: draft.tipo })}
      ${field("pedido", "perro", "Perro", { value: draft.perro, placeholder: "Nombre o «perro nuevo»", attrs: 'list="coord-dog-names" autocomplete="off"' })}
      <div class="coord-field">
        <span class="coord-label" id="coord-pedido-canal-label">Llegó por</span>
        <div class="cd-chiprow" role="radiogroup" aria-labelledby="coord-pedido-canal-label">
          ${PEDIDO_CANALES.map((c) => `<label class="cd-pill is-check"><input type="radio" name="canal" value="${esc(c)}" ${c === (draft.canal || PEDIDO_CANALES[0]) ? "checked" : ""} /><span>${esc(c)}</span></label>`).join("")}
        </div>
      </div>
      ${textArea("pedido", "detalle", "Qué resolver", { value: draft.detalle, hint: "Sin teléfonos ni domicilios." })}
      <datalist id="coord-dog-names">${REAL_DOGS.map((dog) => `<option value="${esc(dog.name)}"></option>`).join("")}</datalist>
      <div class="cd-actions is-split">
        ${button("Guardar", `data-coord-pedido-save`, "primary", "checkCircle")}
        ${button("Cancelar", `data-coord-pedido-cancel`, "ghost")}
      </div>
    </form>
  `;
}

function PedidosView() {
  const pedidos = getPedidos();
  const fichaPorPedido = new Map(getFichas().filter((f) => f.datos?.pedidoId).map((f) => [f.datos.pedidoId, f]));
  const clientePorPedido = new Map(getClientes().filter((c) => c.pedidoId).map((c) => [c.pedidoId, c]));
  const filtro = PEDIDO_COLUMNAS.some(([e]) => e === pedidosFiltro) ? pedidosFiltro : "nuevo";
  const items = pedidos.filter((p) => estadoDe(p) === filtro);
  if (filtro === "nuevo") items.sort((a, b) => Number(b.origen === "web") - Number(a.origen === "web"));
  const isLoading = !loaded.has("pedidos") && !pedidos.length;
  return `
    ${SubHead("Pedidos", pedidos.filter((p) => estadoDe(p) !== "resuelto").length)}
    <div class="cd-seg is-3" role="group" aria-label="Estado">
      ${PEDIDO_COLUMNAS.map(([estado, label]) => {
        const n = pedidos.filter((p) => estadoDe(p) === estado).length;
        return `<button type="button" class="cd-seg-btn" id="coord-pedidos-${estado}" data-coord-pedidos-filtro="${estado}" aria-pressed="${estado === filtro}"><span>${label}</span><b>${n}</b></button>`;
      }).join("")}
    </div>
    ${items.length
      ? `<ul class="cd-list is-grid">${items.map((p) => PedidoCard(p, fichaPorPedido, clientePorPedido)).join("")}</ul>`
      : emptyState(isLoading ? "Cargando…" : filtro === "nuevo" ? "Sin pedidos nuevos." : filtro === "en-curso" ? "Nada en curso." : "Sin resueltos.", isLoading ? "clock" : "checkCircle")}
    ${pedidoFormOpen ? PedidoForm() : button("Cargar pedido", `id="coord-pedido-new" data-coord-pedido-new`, "ghost", "plus")}
  `;
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
    archivos: archivosDePedido(pedido).map((a) => a.id),
    notas: [`Desde el pedido del ${fmtDate(pedido.fecha)}.`, !dog && d.perro ? `Perro: ${d.perro} (todavía sin ficha en el registro).` : ""].filter(Boolean).join(" "),
  };
}

/* ---------- Datos a confirmar ---------- */

function ReviewCard(dog, record) {
  const who = record ? record.actualizadoPorNombre || record.creadoPorNombre : "";
  return `
    <li class="cd-card cd-review ${record ? "is-resolved" : ""}" id="coord-dato-${dog.id}" tabindex="-1">
      <div class="cd-row">
        ${Ava(dog, dog.name, "md")}
        <div class="cd-row-main">
          <strong>${esc(dog.name)}</strong>
          <small>${esc(dog.plan)} · ${esc(dog.size)}</small>
        </div>
        ${dog.status !== "Activo" ? chip(esc(dog.status), "alert") : chip("Activo", "ok")}
      </div>
      <p class="cd-line">${ic("help")}<span>${esc(dog.review || `Estado "${dog.status}".`)}</span></p>
      <p class="cd-chips">${safetyChips(dog)}${carnetChip(dog)}</p>
      ${record?.nota ? `<p class="cd-muted">${esc(record.nota)}</p>` : ""}
      <div class="cd-actions">
        ${record
          ? `<p class="cd-done">${ic("checkCircle")}<span>Resuelto${who ? ` · ${esc(firstName(who))}` : ""}${record.pendiente ? " · se envía con señal" : ""}</span></p>${button("Deshacer", `data-coord-unresolve="${dog.id}"`, "ghost")}`
          : button("Resuelto", `id="coord-resolve-${dog.id}" data-coord-resolve="${dog.id}"`, "primary", "checkCircle")}
        ${FotoBtn(dog)}
      </div>
    </li>
  `;
}

function DatosView() {
  const resolved = getResolved();
  const pending = REVIEW_DOGS.filter((dog) => !resolved[dog.id]);
  const done = REVIEW_DOGS.filter((dog) => resolved[dog.id]);
  return `
    ${SubHead("Datos a confirmar", pending.length)}
    <p class="cd-muted">Confirmalo en la planilla y tocá «Resuelto».</p>
    ${pending.length ? `<ul class="cd-list is-grid">${pending.map((dog) => ReviewCard(dog)).join("")}</ul>` : emptyState("No quedan datos por confirmar.")}
    ${done.length ? fold("datosResueltos", `Resueltos (${done.length})`, `<ul class="cd-list is-grid">${done.map((dog) => ReviewCard(dog, resolved[dog.id])).join("")}</ul>`) : ""}
  `;
}

/* ---------- Documentos: carnets y archivos ---------- */

function clienteDePerro(dogId) {
  return getClientes().find((c) => Array.isArray(c.perros) && c.perros.includes(dogId)) || null;
}

function DocsView() {
  const activos = REAL_DOGS.filter((dog) => dog.status === "Activo");
  const faltan = activos.filter((dog) => !tieneCarnet(dog)).sort((a, b) => a.name.localeCompare(b.name, "es"));
  const listo = loaded.has("archivos") && loaded.has("clientes");
  const archivos = getArchivos().slice(0, 20);
  return `
    ${SubHead("Documentos")}
    <div class="cd-card cd-stat">
      <p class="cd-big">${ic("fileCheck")}<span><b>${activos.length - faltan.length} de ${activos.length}</b> con carnet</span></p>
      <p class="cd-muted">El carnet se sube desde la ficha del cliente.</p>
    </div>
    ${!listo ? emptyState("Cargando…", "clock") : faltan.length ? `
      <h2 class="cd-h2">Sin carnet <span class="cd-count">${faltan.length}</span></h2>
      <ul class="cd-list cd-nocarnet">
        ${faltan.map((dog) => {
          const cli = clienteDePerro(dog.id);
          return `
            <li class="cd-card cd-row">
              ${Ava(dog, dog.name, "md")}
              <div class="cd-row-main"><strong>${esc(dog.name)}</strong><small>${esc(scheduleLabel(dog))}</small></div>
              ${FotoBtn(dog, { compact: true })}
              ${cli ? button("Cliente", `data-coord-ver-cliente="${esc(cli.id)}" aria-label="Ver cliente de ${esc(dog.name)}"`, "ghost", "users") : ""}
            </li>`;
        }).join("")}
      </ul>` : emptyState("Todos los activos tienen carnet.")}
    ${archivos.length ? fold("docsRecientes", `Últimos archivos (${archivos.length})`, `<ul class="coord-files">${archivos.map((a) => ArchivoItem(a, "docs")).join("")}</ul>${fileFeedback("docs")}`) : ""}
  `;
}

/* ---------- Fichas: alta de perro nuevo ---------- */

const SI_NO = [PENDIENTE, "Sí", "No"];

// Carnet elegido en el alta (queda en memoria hasta guardar la ficha) y, si ya se subió
// pero la ficha no se pudo guardar, el registro subido (así no se sube dos veces).
let altaCarnet = null;
let altaCarnetSubido = null;
let altaSubiendo = false;
let altaVaciarConfirm = false;

function CarnetAltaField(draft) {
  const pedido = draft.pedidoId ? findIn(getPedidos(), draft.pedidoId) : null;
  const delPedido = pedido ? archivosDePedido(pedido).filter(esCarnet) : [];
  const hintId = "coord-alta-carnet-hint";
  let hint = "Opcional. Se sube al guardar (con señal).";
  if (altaCarnetSubido) hint = `Ya subido (${esc(altaCarnetSubido.nombreArchivo || "archivo")}).`;
  else if (altaCarnet) hint = `${esc(altaCarnet.name)} (${fmtTamano(altaCarnet.size)}). Se sube al guardar.`;
  return `
    <div class="coord-field">
      <span class="coord-label">Carnet de vacunas</span>
      ${delPedido.map((a) => `
        <p class="coord-attach-row">
          ${ic("fileCheck")}
          <span><b>Carnet del pedido</b><small>Queda vinculado.</small></span>
          ${button('Ver<span class="coord-sr-only"> carnet (se abre en otra pestaña)</span>', `data-coord-archivo-abrir="${esc(a.id)}" data-scope="alta"`, "secondary", "eye")}
        </p>`).join("")}
      ${altaCarnetSubido ? "" : filePicker("coord-alta-carnet", altaCarnet ? "Cambiar" : delPedido.length ? "Otro carnet" : "Foto o PDF", "data-coord-alta-carnet", hintId)}
      <small id="${hintId}" class="cd-muted">${hint}</small>
      ${altaCarnet && sinSenal() ? `<p class="coord-inline-alert">${ic("alertTriangle")}<span>Sin señal: el carnet necesita señal.</span></p>` : ""}
      ${altaCarnet || altaCarnetSubido ? button("Quitar carnet", `id="coord-alta-carnet-quitar" data-coord-alta-carnet-quitar`, "ghost", "x") : ""}
      ${fileFeedback("alta")}
    </div>
  `;
}

function AltaForm() {
  const draft = getDraft("alta");
  const days = Array.isArray(draft.dias) ? draft.dias : [];
  const planOptions = [PENDIENTE, ...REAL_PLANS.map((plan) => `${plan.name} (${plan.walks} paseos por semana)`), "Paseo suelto"];
  return `
    <form class="cd-form" id="coord-alta-form" data-coord-form="alta" novalidate>
      <div class="cd-subhead">
        <button type="button" class="cd-back" data-coord-alta-close>${ic("arrowLeft")}<span>Fichas</span></button>
        <h1 id="coord-view-title" tabindex="-1">Perro nuevo</h1>
      </div>
      <p class="cd-chips">${chip("SIN EVALUAR", "neutral")}${chip("1.er paseo individual", "warn", "shieldCheck")}</p>
      ${draft.pedidoId ? `<p class="cd-note">${ic("clipboardCheck")}<span>Con datos del pedido web. Revisalos.</span></p>` : ""}
      ${field("alta", "nombre", "Nombre del perro", { value: draft.nombre, required: true })}
      <div class="coord-field">
        <span class="coord-label" id="coord-alta-tamano-label">Tamaño</span>
        <div class="cd-chiprow" role="radiogroup" aria-labelledby="coord-alta-tamano-label">
          ${["Pequeño", "Mediano", "Grande"].map((t) => `<label class="cd-pill is-check"><input type="radio" name="tamano" value="${t}" ${draft.tamano === t ? "checked" : ""} /><span>${t}</span></label>`).join("")}
        </div>
      </div>
      ${field("alta", "tutor", "Tutor", { value: draft.tutor, attrs: 'autocomplete="off"' })}
      ${field("alta", "contacto", "Celular del tutor", { value: draft.contacto, type: "tel", attrs: 'autocomplete="off" inputmode="tel"' })}
      ${CarnetAltaField(draft)}
      ${fold("alta-mas", `${ic("menu")}<b>Más datos</b>`, `
        <fieldset>
          <legend>Perro</legend>
          ${field("alta", "raza", "Raza o cruza", { value: draft.raza })}
          ${field("alta", "edad", "Edad", { value: draft.edad })}
          ${selectField("alta", "sexo", "Sexo", [PENDIENTE, "Macho", "Hembra"], { value: draft.sexo })}
          ${selectField("alta", "castrado", "Castrado/a", SI_NO, { value: draft.castrado })}
        </fieldset>
        <fieldset>
          <legend>Contacto</legend>
          ${field("alta", "emergencia", "Emergencia", { value: draft.emergencia, attrs: 'autocomplete="off"' })}
          ${selectField("alta", "zona", "Zona", [PENDIENTE, "Pilar", "La Lonja", "Otra zona"], { value: draft.zona })}
          ${field("alta", "referencia", "Barrio o referencia", { value: draft.referencia, attrs: 'autocomplete="off"' })}
        </fieldset>
        <fieldset>
          <legend>Salud</legend>
          ${selectField("alta", "vacunas", "Vacunas al día", SI_NO, { value: draft.vacunas })}
          ${field("alta", "veterinario", "Veterinaria", { value: draft.veterinario })}
          ${textArea("alta", "salud", "Alergias o medicación", { value: draft.salud, hint: "Lo que dice el tutor." })}
        </fieldset>
        <fieldset>
          <legend>Equipo</legend>
          ${selectField("alta", "sujecion", "Collar o pechera", [PENDIENTE, "Collar", "Pechera", "Collar y pechera"], { value: draft.sujecion })}
          ${selectField("alta", "bozal", "Bozal", SI_NO, { value: draft.bozal })}
          ${selectField("alta", "correa", "Correa propia", SI_NO, { value: draft.correa })}
        </fieldset>
        <fieldset>
          <legend>Conducta observada</legend>
          ${draft.relatoTutor ? textArea("alta", "relatoTutor", "Lo que contó el tutor (no observado)", { value: draft.relatoTutor, attrs: "readonly" }) : ""}
          ${textArea("alta", "conPerros", "Con otros perros", { value: draft.conPerros })}
          ${textArea("alta", "conPersonas", "Con personas", { value: draft.conPersonas })}
          ${textArea("alta", "estimulos", "Lo altera", { value: draft.estimulos, placeholder: "Ej.: motos, ruidos" })}
          ${field("alta", "noJuntar", "No juntar con", { value: draft.noJuntar, attrs: 'list="coord-dog-names" autocomplete="off"' })}
        </fieldset>
        <fieldset>
          <legend>Servicio</legend>
          ${selectField("alta", "plan", "Plan", planOptions, { value: draft.plan })}
          ${selectField("alta", "turno", "Turno", [PENDIENTE, "Mañana", "Tarde"], { value: draft.turno })}
          ${daysField("alta", days)}
        </fieldset>
      `, { open: Boolean(draft.pedidoId) })}
      <datalist id="coord-dog-names">${REAL_DOGS.map((dog) => `<option value="${esc(dog.name)}"></option>`).join("")}</datalist>
      ${altaSubiendo ? `<p class="coord-upload-status" role="status">${ic("clock")}<span>Subiendo el carnet…</span></p>` : ""}
      ${altaVaciarConfirm ? `
        <div class="cd-confirm" role="group" aria-labelledby="coord-alta-vaciar-q">
          <p id="coord-alta-vaciar-q"><b>¿Vaciar la ficha?</b> Se borra lo escrito.</p>
          <div class="cd-actions is-split">
            ${button("Vaciar", `id="coord-alta-vaciar-ok" data-coord-alta-clear-ok`, "danger", "trash")}
            ${button("No", `id="coord-alta-vaciar-cancel" data-coord-alta-clear-cancel`, "secondary")}
          </div>
        </div>` : ""}
      <div class="cd-savebar is-row">
        ${button("Vaciar", `id="coord-alta-clear" data-coord-alta-clear`, "ghost", "trash")}
        <button type="button" class="coord-btn is-primary is-big" id="coord-alta-save" data-coord-alta-save ${altaSubiendo ? 'aria-disabled="true"' : ""}>${ic("checkCircle")}<span>${altaSubiendo ? "Guardando…" : "Guardar"}</span></button>
      </div>
    </form>
  `;
}

function FichasView() {
  const fichas = getFichas();
  return `
    ${SubHead("Fichas", fichas.length)}
    ${button("Perro nuevo", `id="coord-alta-new" data-coord-alta-new`, "primary", "plus")}
    ${fichas.length ? `
      <ul class="cd-list is-grid">
        ${fichas.map((ficha) => {
          const a = ficha.datos || {};
          const dias = Array.isArray(a.dias) ? a.dias : [];
          const ids = [...new Set([ficha.carnet?.id, ...(Array.isArray(ficha.archivos) ? ficha.archivos : [])].filter(Boolean))];
          const carnet = ids.map((archivoId) => archivoPorId(archivoId)).find(esCarnet) || (ficha.carnet?.id ? { id: ficha.carnet.id } : null);
          const scope = `ficha-${ficha.id}`;
          const nombre = ficha.perroNombre || a.nombre || PENDIENTE;
          return `
            <li class="cd-card">
              <div class="cd-row">
                ${Ava(DOG_BY_NAME.get(normalize(nombre)), nombre, "md")}
                <div class="cd-row-main"><strong>${esc(nombre)}</strong><small>Alta ${esc(fmtDate(ficha.fecha))}</small></div>
              </div>
              <p class="cd-chips">${chip(esc(ficha.categoria || "SIN EVALUAR"), "neutral")}${chip("1.er paseo individual", "warn")}${carnet ? chip("Carnet", "ok", "check") : chip("Sin carnet", "warn")}</p>
              <p class="cd-line">${esc(!a.tamano || a.tamano === PENDIENTE ? "Tamaño ?" : a.tamano)} · ${dias.length ? esc(daysLabel(dias)) : "Días ?"} · ${esc(!a.turno || a.turno === PENDIENTE ? "Turno ?" : a.turno)}</p>
              ${fileFeedback(scope)}
              ${whoLine(ficha)}
              <div class="cd-actions">
                ${carnet ? button('Carnet<span class="coord-sr-only"> (se abre en otra pestaña)</span>', `data-coord-archivo-abrir="${esc(carnet.id)}" data-scope="${esc(scope)}"`, "secondary", "eye") : ""}
                ${button("Copiar", `data-coord-alta-copy="${esc(ficha.id)}"`, "ghost", "copy")}
                ${canDelete(ficha) ? button("Borrar", `data-coord-alta-delete="${esc(ficha.id)}"`, "danger", "trash") : ""}
              </div>
            </li>`;
        }).join("")}
      </ul>` : emptyState(loaded.has("fichas") ? "Todavía no hay fichas." : "Cargando…", loaded.has("fichas") ? "userPlus" : "clock")}
  `;
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
    tamano: ["Pequeño", "Mediano", "Grande"].includes(d.tamano) ? d.tamano : "",
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

/* ---------- Incidentes y observaciones (solo lectura) ---------- */

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
  const dogName = dogNameFor(record);
  const firstId = record.perroId || (Array.isArray(record.perros) ? record.perros[0] : "");
  const dog = (firstId && DOG_BY_ID.get(firstId)) || DOG_BY_NAME.get(normalize(dogName)) || null;
  const title = record.titulo || (kind === "incidente" ? "Incidente" : "Observación");
  const riesgo = record.riesgo ? String(record.riesgo) : "";
  const rows = kind === "incidente"
    ? [["Lugar", [record.lugar, record.barrio].filter(Boolean).join(" · ")], ["Antes", record.antes], ["Conducta", record.conducta], ["Acción", record.accion], ["Después", record.despues], ["Lesiones", record.lesiones, record.lesiones && !/^no/i.test(record.lesiones) ? "alert" : ""], ["Protocolo", record.protocolo]]
    : [["Lugar", record.lugar], ["Estímulo", record.estimulo], ["Reacción", record.reaccion], ["Acción", record.accion], ["Resultado", record.resultado]];
  const memKey = `act-${record.id || title}`;
  return `
    <li class="cd-card ${kind === "incidente" ? "is-incident" : ""}">
      <div class="cd-row">
        ${Ava(dog, dogName || title, "md")}
        <div class="cd-row-main"><strong>${esc(dogName || title)}</strong><small>${esc(fmtDate(record.fecha).slice(0, 5))}${record.hora ? ` · ${esc(record.hora)}` : ""}</small></div>
      </div>
      <p class="cd-chips">${chip(kind === "incidente" ? "Incidente" : "Observación", kind === "incidente" ? "alert" : "info")}${riesgo ? chip(`Riesgo ${esc(riesgo)}`, /alto|grave/i.test(riesgo) ? "alert" : "warn") : ""}</p>
      ${dogName && record.titulo ? `<p class="cd-line">${esc(record.titulo)}</p>` : ""}
      ${cardMore(memKey, "Detalle", `${dataList(rows)}${whoLine(record)}`)}
    </li>
  `;
}

function IncidentesView() {
  const desde = haceDias(6);
  const incidentes = cached("incidentes").filter((r) => !r.fecha || r.fecha >= desde).sort(byMoment);
  const observaciones = cached("observaciones").filter((r) => !r.fecha || r.fecha >= desde).sort(byMoment);
  return `
    ${SubHead("Incidentes", incidentes.length)}
    <p class="cd-muted">Últimos 7 días. Solo lectura.</p>
    ${incidentes.length ? `<ul class="cd-list is-grid">${incidentes.map((r) => ActivityItem(r, "incidente")).join("")}</ul>` : emptyState(loaded.has("incidentes") ? "Sin incidentes." : "Cargando…", loaded.has("incidentes") ? "checkCircle" : "clock")}
    ${fold("observaciones", `Observaciones (${observaciones.length})`, observaciones.length ? `<ul class="cd-list is-grid">${observaciones.map((r) => ActivityItem(r, "observacion")).join("")}</ul>` : `<p class="cd-muted">${loaded.has("observaciones") ? "Sin observaciones." : "Cargando…"}</p>`)}
  `;
}

/* ------------------------------------------------------------------ */
/* Eventos                                                             */
/* ------------------------------------------------------------------ */

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

function copyAndTell(text, _sectionKey, okText) {
  copyText(text).then((ok) => {
    showToast(ok ? okText : "No se pudo copiar. Probá de nuevo.", { tone: ok ? "ok" : "error" });
    scheduleRerender();
  });
}

function findIn(list, id) {
  return list.find((item) => item.id === id);
}

// Abre el editor (pantalla completa) y lleva arriba.
function showEditor(focusId = "coord-view-title") {
  render();
  toTop(focusId);
}

async function saveEditor() {
  const error = editorError();
  if (error) {
    showToast(error[0], { tone: "error" });
    render();
    focusById(error[1]);
    return;
  }
  const record = routeRecordFromEditor();
  const e = editor;
  let saved;
  let fecha = "";
  if (e.destino === "semana") {
    saved = await guardar("plantillas", { id: plantillaId(record.ruta, record.dia), ...record }, { ok: `${record.ruta}: guardada para todos los ${record.dia.toLowerCase()}.` });
    // Si ese día ya tenía un cambio propio, queda igual a lo que se guardó (si no, seguiría mandando el viejo).
    if (saved && e.modo === "dia" && e.existeDia) {
      await registros.save("rutas", { id: rutaDiaId(e.fecha, record.ruta), fecha: e.fecha, ...record, dia: dayNameISO(e.fecha), basadaEn: e.plantillaId || "" }).catch(() => {});
    }
    fecha = e.modo === "dia" ? e.fecha : "";
  } else {
    fecha = editorFechaDia();
    if (!isISODate(fecha)) {
      showToast("Elegí el día.", { tone: "error" });
      render();
      focusById("coord-ed-solodia");
      return;
    }
    saved = await guardar("rutas", { id: rutaDiaId(fecha, record.ruta), fecha, ...record, dia: dayNameISO(fecha), basadaEn: e.plantillaId || "" }, { ok: `${record.ruta}: guardada solo para el ${shortDay(fecha)}. La semana no cambió.` });
  }
  if (saved && e.solicitudId) {
    const sol = getSolicitudes().find((s) => s.id === e.solicitudId);
    // `solicitudes` es por fecha: el servidor pide la fecha también al actualizar.
    await guardar("solicitudes", { id: e.solicitudId, fecha: isISODate(sol?.fecha) ? sol.fecha : fecha || hoyAR(), estado: "aplicado", respuesta: e.respuesta.trim() || `Aplicado en ${record.ruta}${fecha ? ` del ${fmtDate(fecha)}` : " (toda la semana)"}.` }, { ok: "Cambio aplicado. El supervisor ya lo ve." });
  }
  if (saved && editor === e) {
    if (fecha) rutasFecha = fecha;
    if (getView().tab === "rutas") setRutasVista(e.destino === "semana" && e.modo === "plantilla" ? "semana" : "dia");
    closeEditor();
    render();
    toTop();
  }
}

// Sube el carnet o documento elegido en la ficha de un cliente y lo deja vinculado a él.
async function subirDocumento(c) {
  const s = subida;
  const id = c.id;
  const perros = (Array.isArray(c.perros) ? c.perros : []).filter((dogId) => DOG_BY_ID.has(dogId));
  const fallar = (text, focusId, senal = false) => {
    s.error = text;
    s.errorSenal = senal;
    announceError(text);
    render();
    focusById(focusId);
  };
  if (!s.file) return fallar("Elegí la foto o el PDF.", `coord-subida-archivo-${id}`);
  if (s.tipo === TIPO_CARNET && perros.length > 1 && !s.perroId) return fallar("Elegí de qué perro es el carnet.", `coord-subida-perro-${id}`);
  if (sinSenal()) return fallar("Sin señal: tocá «Subir» cuando vuelva.", `coord-subida-ok-${id}`, true);
  s.estado = "subiendo";
  s.error = "";
  announce("Subiendo el archivo.");
  scheduleRerender();
  const dog = DOG_BY_ID.get(s.perroId) || null;
  try {
    const registro = await archivosApi.subir(s.tipo, s.file, { perroId: dog?.id || "", perroNombre: dog?.name || "", clienteId: id, nota: s.nota.trim() });
    // Queda vinculado por clienteId; además se anota en el cliente (como el carnet que llega por la web).
    const actual = findIn(getClientes(), id) || c;
    const vinculados = [...new Set([...(Array.isArray(actual.archivos) ? actual.archivos : []), registro.id])];
    await registros.save("clientes", { id, archivos: vinculados }).catch(() => {});
    if (subida === s) subida = null;
    const que = registro.tipo === TIPO_CARNET ? "Carnet" : "Documento";
    setFileFlash(`cliente-${id}`, `${que}${dog ? ` de ${dog.name}` : ""} guardado${registro.ubicacion === "drive" ? " en Drive" : ""}.`);
  } catch (error) {
    s.estado = "";
    s.error = mensajeArchivo(error, "subir");
    s.errorSenal = /^Sin señal/.test(s.error);
    announceError(s.error);
  } finally {
    scheduleRerender();
    focusById(subida === s ? `coord-subida-ok-${id}` : `coord-subir-${id}`);
  }
}

// Foto del perro: sube la grande y guarda la miniatura (necesita señal).
async function subirFoto(dogId, file) {
  const dog = DOG_BY_ID.get(dogId);
  if (!dog || !file) return;
  if (sinSenal()) {
    showToast("Sin señal: la foto necesita señal.", { tone: "error" });
    scheduleRerender();
    return;
  }
  fotoBusy.add(dogId);
  announce(`Subiendo la foto de ${dog.name}.`);
  scheduleRerender();
  try {
    await fotosPerros.subir(dogId, dog.name, file);
    showToast(`Foto de ${dog.name} guardada.`);
  } catch (error) {
    showToast(`La foto no se subió: ${mensajeArchivo(error, "subir")}`, { tone: "error" });
  } finally {
    fotoBusy.delete(dogId);
    scheduleRerender();
  }
}

// Cambios de estado que se pueden deshacer: guardan y ofrecen «Deshacer» 5 segundos.
function guardarConDeshacer(col, data, previo, ok, okDeshacer = "Listo, quedó como estaba.") {
  return guardar(col, data, { ok, undo: () => run(`undo-${col}-${data.id}`, () => guardar(col, previo, { ok: okDeshacer })) });
}

function handleCoordinadorClick(event) {
  if (!event.target.closest(".coord-shell")) return false;
  const t = event.target;

  /* ---------- Generales ---------- */

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

  if (t.closest("[data-coord-toast-undo]")) {
    const undo = toast?.undo;
    toast = null;
    window.clearTimeout(toastTimer);
    if (undo) undo();
    scheduleRerender();
    return true;
  }

  if (t.closest("[data-coord-toast-x]")) {
    toast = null;
    window.clearTimeout(toastTimer);
    scheduleRerender();
    return true;
  }

  if (t.closest("[data-coord-retry]")) {
    retrySync();
    migrationDone = false;
    announce("Volviendo a pedir los datos.");
    return true;
  }

  const go = t.closest("[data-coord-go]");
  if (go) {
    const target = go.dataset.coordGo;
    goView(target);
    clienteFormOpen = false;
    avisoFormOpen = false;
    pedidoFormOpen = false;
    altaFormOpen = false;
    altaVaciarConfirm = false;
    rechazoAbierto = "";
    render();
    toTop();
    return true;
  }

  const goRutas = t.closest("[data-coord-go-rutas]");
  if (goRutas) {
    goView("rutas");
    setRutasVista(goRutas.dataset.coordGoRutas);
    render();
    toTop();
    return true;
  }

  // Un campo se completa con un toque (barrio, fecha…).
  const setField = t.closest("[data-coord-set-field]");
  if (setField) {
    const input = document.getElementById(setField.dataset.coordSetField);
    if (input) {
      input.value = setField.dataset.value;
      const formEl = input.closest("[data-coord-form]");
      if (formEl) saveDraft(formEl.dataset.coordForm, serializeForm(formEl));
      const keep = setField.closest(".cd-chiprow")?.querySelectorAll(".cd-pill") || [];
      keep.forEach((pill) => pill.setAttribute("aria-pressed", String(pill === setField)));
      announce(`${setField.textContent.trim()} elegido.`);
    }
    return true;
  }

  /* ---------- Fotos ---------- */

  // La hora grande abre el selector del teléfono también en la compu.
  if (t.matches?.("input.cd-hora")) {
    try {
      t.showPicker?.();
    } catch {
      // Algunos navegadores no lo permiten: se escribe a mano.
    }
    return true;
  }

  /* ---------- Archivos ---------- */

  const abrir = t.closest("[data-coord-archivo-abrir]");
  if (abrir) {
    abrirArchivo(abrir.dataset.coordArchivoAbrir, abrir.dataset.scope || "");
    return true;
  }

  const subir = t.closest("[data-coord-subir]");
  if (subir) {
    const c = findIn(getClientes(), subir.dataset.coordSubir);
    if (c) {
      if (subida?.estado === "subiendo") {
        announceError("Esperá a que termine la subida en curso.");
        return true;
      }
      abrirSubida(c);
      openCards.add(`cli-${c.id}`);
      render();
      focusById(`coord-subida-tipo-${c.id}-carnet`);
    }
    return true;
  }

  const subidaSet = t.closest("[data-coord-subida-set]");
  if (subidaSet && subida) {
    subida[subidaSet.dataset.coordSubidaSet] = subidaSet.dataset.value;
    subida.error = "";
    render();
    focusById(subidaSet.id);
    return true;
  }

  const subidaCancel = t.closest("[data-coord-subida-cancel]");
  if (subidaCancel) {
    if (subida?.estado === "subiendo") {
      announceError("La subida está en curso: esperá a que termine.");
      return true;
    }
    const id = subidaCancel.dataset.coordSubidaCancel;
    subida = null;
    render();
    focusById(`coord-subir-${id}`);
    return true;
  }

  const subidaOk = t.closest("[data-coord-subida-ok]");
  if (subidaOk) {
    const c = findIn(getClientes(), subidaOk.dataset.coordSubidaOk);
    if (c && subida?.clienteId === c.id) run(`subida-${c.id}`, () => subirDocumento(c));
    return true;
  }

  if (t.closest("[data-coord-filtro-carnet]")) {
    soloSinCarnet = !soloSinCarnet;
    announce(soloSinCarnet ? "Solo perros sin carnet." : "Todos los perros.");
    render();
    focusById("coord-filtro-carnet");
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
    rutasFecha = verDia.dataset.coordVerDia;
    setRutasVista("dia");
    if (getView().tab !== "rutas") goView("rutas");
    render();
    focusById(verDia.id || "coord-view-title");
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
      if (lastError) showToast(`Se guardaron ${ok} de ${base.length} rutas. Error: ${lastError}`, { tone: "error" });
      else showToast(`Listo: ${ok} rutas cargadas.${pend ? " Se envían con señal." : ""}`);
      setRutasVista("dia");
      scheduleRerender();
    });
    return true;
  }

  const editPlantilla = t.closest("[data-coord-edit-plantilla]");
  if (editPlantilla) {
    const p = findIn(getPlantillas(), editPlantilla.dataset.coordEditPlantilla);
    if (p) {
      openEditor(p, { modo: "plantilla" });
      showEditor();
    }
    return true;
  }

  const newRoute = t.closest("[data-coord-new-route]");
  if (newRoute) {
    const { dia, turno } = newRoute.dataset;
    openEditor({ ruta: nextRouteCode(plantillasDe(dia), turno), dia, turno, paradas: [], supervisor: "" }, { modo: "plantilla", nuevo: true });
    showEditor("coord-ed-ruta");
    return true;
  }

  const editDia = t.closest("[data-coord-edit-dia]");
  if (editDia) {
    const fecha = editDia.dataset.fecha;
    const r = effectiveRoutes(fecha).find((x) => x.ruta === editDia.dataset.coordEditDia);
    if (r) {
      openEditor(r, { modo: "dia", fecha });
      showEditor();
    }
    return true;
  }

  const newDia = t.closest("[data-coord-new-dia]");
  if (newDia) {
    const { fecha, turno } = newDia.dataset;
    openEditor({ ruta: nextRouteCode(effectiveRoutes(fecha), turno), dia: dayNameISO(fecha), turno, paradas: [] }, { modo: "dia", fecha, nuevo: true });
    showEditor("coord-ed-ruta");
    return true;
  }

  const copyRuta = t.closest("[data-coord-copy-ruta]");
  if (copyRuta) {
    const fecha = copyRuta.dataset.fecha;
    const r = effectiveRoutes(fecha).find((x) => x.ruta === copyRuta.dataset.coordCopyRuta);
    if (r) copyAndTell(routeText(r, { fecha }), "rutas", `${r.ruta} copiada. Pegala en WhatsApp.`);
    return true;
  }

  const copyDia = t.closest("[data-coord-copy-dia]");
  if (copyDia) {
    const fecha = copyDia.dataset.coordCopyDia;
    const text = effectiveRoutes(fecha).map((r) => routeText(r, { fecha })).join("\n\n");
    copyAndTell(text, "rutas", `Rutas del ${shortDay(fecha)} copiadas.`);
    return true;
  }

  // Editor
  if (editor) {
    if (t.closest("[data-coord-ed-picker]")) {
      editor.picker = true;
      editor.agregados = 0;
      editorQuery = "";
      editorHora = "";
      showEditor("coord-view-title");
      return true;
    }
    if (t.closest("[data-coord-ed-picker-close]")) {
      editor.picker = false;
      editorQuery = "";
      editorHora = "";
      render();
      focusById("coord-ed-picker");
      return true;
    }
    const addDog = t.closest("[data-coord-add-dog]");
    if (addDog) {
      const dog = DOG_BY_ID.get(addDog.dataset.coordAddDog);
      if (dog) {
        addStop(dog, "", { keepQuery: true });
        editor.agregados += 1;
        const hora = editor.paradas[editor.paradas.length - 1].hora;
        const ed = editor;
        const index = editor.paradas.length - 1;
        showToast(`${dog.name} agregado a las ${hora}.`, {
          local: true,
          undo: () => {
            if (editor === ed && ed.paradas[index]?.perroId === dog.id) {
              ed.paradas.splice(index, 1);
              ed.agregados = Math.max(0, ed.agregados - 1);
              announce(`${dog.name} quitado.`);
            }
          },
        });
        render();
        focusById(`coord-add-${dog.id}`);
      }
      return true;
    }
    if (t.closest("[data-coord-add-libre]")) {
      const nombre = editorQuery.trim();
      if (nombre) {
        addStop(null, nombre);
        editor.agregados += 1;
        showToast(`${nombre} agregado (sin ficha).`);
        render();
        focusById("coord-ed-buscar");
      }
      return true;
    }
    const edSet = t.closest("[data-coord-ed-set]");
    if (edSet) {
      editor[edSet.dataset.coordEdSet] = edSet.dataset.value;
      editor.sucio = true;
      render();
      focusById(edSet.id);
      return true;
    }
    const destino = t.closest("[data-coord-ed-destino]");
    if (destino) {
      editor.destino = destino.dataset.coordEdDestino === "semana" ? "semana" : "dia";
      announce(editor.destino === "semana" ? "Se guarda para toda la semana." : "Se guarda solo para un día.");
      render();
      focusById(destino.id);
      return true;
    }
    const minBtn = t.closest("[data-coord-stop-min]");
    if (minBtn) {
      const stop = editor.paradas[Number(minBtn.dataset.coordStopMin)];
      if (stop) {
        stop.minutos = Number(minBtn.dataset.value) || 45;
        editor.sucio = true;
        render();
        focusById(minBtn.id);
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
        announce(`${editor.paradas[j].perroNombre} ahora es el ${j + 1}.`);
      }
      return true;
    }
    const del = t.closest("[data-coord-stop-del]");
    if (del) {
      const i = Number(del.dataset.coordStopDel);
      const [removed] = editor.paradas.splice(i, 1);
      editor.sucio = true;
      const ed = editor;
      showToast(`${removed?.perroNombre || "Perro"} quitado.`, {
        local: true,
        undo: () => {
          if (editor === ed && removed) {
            ed.paradas.splice(Math.min(i, ed.paradas.length), 0, removed);
            announce(`${removed.perroNombre} volvió a la ruta.`);
          }
        },
      });
      render();
      focusById(editor.paradas.length ? `coord-ed-del-${Math.min(i, editor.paradas.length - 1)}` : "coord-ed-picker");
      return true;
    }
    if (t.closest("[data-coord-ed-sort]")) {
      sortStops();
      announce("Ordenados por hora.");
      render();
      focusById("coord-ed-sort");
      return true;
    }
    if (t.closest("[data-coord-ed-save]")) {
      run("editor-save", () => saveEditor());
      return true;
    }
    if (t.closest("[data-coord-ed-revert]")) {
      const record = editor.existeDia;
      run("editor-revert", async () => {
        const ok = await borrar("rutas", record, { ok: `${record.ruta} del ${shortDay(record.fecha)}: igual que la semana.` });
        if (ok) {
          closeEditor();
          scheduleRerender();
          toTop();
        }
      });
      return true;
    }
    if (t.closest("[data-coord-ed-copy]")) {
      const text = routeText(routeRecordFromEditor(), editor.modo === "dia" ? { fecha: editor.fecha } : {});
      copyAndTell(text, "editor", "Ruta copiada. Pegala en WhatsApp.");
      return true;
    }
    if (t.closest("[data-coord-ed-close]")) {
      if (editor.sucio) {
        editorConfirm = "salir";
        render();
        toTop("coord-ed-close-cancel");
      } else {
        closeEditor();
        render();
        toTop();
      }
      return true;
    }
    if (t.closest("[data-coord-ed-close-ok]")) {
      closeEditor();
      render();
      toTop();
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
    aplicarSolicitud(s);
    showEditor();
    return true;
  }

  const rechazar = t.closest("[data-coord-sol-rechazar]");
  if (rechazar) {
    rechazoAbierto = rechazar.dataset.coordSolRechazar;
    render();
    focusById(`coord-rapido-${rechazoAbierto}-0`);
    return true;
  }

  if (t.closest("[data-coord-sol-rechazar-cancel]")) {
    const id = rechazoAbierto;
    rechazoAbierto = "";
    render();
    focusById(`coord-rechazar-${id}`);
    return true;
  }

  const rapido = t.closest("[data-coord-sol-rapido]");
  const rechazarOk = t.closest("[data-coord-sol-rechazar-ok]");
  if (rapido || rechazarOk) {
    const id = rapido ? rapido.dataset.coordSolRapido : rechazarOk.dataset.coordSolRechazarOk;
    const area = document.getElementById(`coord-rechazo-${id}`);
    const respuesta = (rapido ? rapido.dataset.texto : area?.value || rechazos[id] || "").trim();
    if (respuesta.length < 3) {
      rechazos[id] = respuesta;
      showToast("Elegí una respuesta o escribila.", { tone: "error" });
      render();
      focusById(`coord-rechazo-${id}`);
      return true;
    }
    const sol = findIn(getSolicitudes(), id);
    const fecha = isISODate(sol?.fecha) ? sol.fecha : hoyAR();
    run(`sol-${id}`, async () => {
      const saved = await guardarConDeshacer("solicitudes", { id, fecha, estado: "rechazado", respuesta }, { id, fecha, estado: "pendiente", respuesta: sol?.respuesta || "" }, "Rechazado. El supervisor ve tu respuesta.", "Volvió a pendiente.");
      if (saved) {
        delete rechazos[id];
        rechazoAbierto = "";
      }
    });
    return true;
  }

  /* ---------- Clientes ---------- */

  if (t.closest("[data-coord-cliente-new]")) {
    clearDraft("cliente");
    clienteFormOpen = true;
    render();
    toTop("coord-cliente-nombre");
    return true;
  }

  const verCliente = t.closest("[data-coord-ver-cliente]");
  if (verCliente) {
    const c = findIn(getClientes(), verCliente.dataset.coordVerCliente);
    if (c) {
      clienteQuery = c.nombre || "";
      openCards.add(`cli-${c.id}`);
      goView("clientes");
      render();
      toTop(`coord-cli-edit-${c.id}`);
    }
    return true;
  }

  if (t.closest("[data-coord-cliente-save]")) {
    const form = document.getElementById("coord-cliente-form");
    if (!form) return true;
    const values = serializeForm(form);
    saveDraft("cliente", values);
    if (!values.nombre?.trim()) {
      showToast("Falta el nombre del tutor.", { tone: "error" });
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
    // Archivos vinculados (el carnet del pedido web y lo que se subió desde la ficha).
    // Se suman a los que ya tiene: si mientras tanto alguien subió otro, no se pierde.
    const previo = values.id ? findIn(getClientes(), values.id) : null;
    const vinculados = [...new Set([...(Array.isArray(previo?.archivos) ? previo.archivos : []), ...(Array.isArray(values.archivos) ? values.archivos : [])])];
    if (vinculados.length) data.archivos = vinculados;
    // Un carnet que no dice de qué perro es (el de la web) queda asignado al perro del cliente
    // mientras tenga uno solo; así no se pierde si después se le suma otro perro.
    const asignados = { ...(previo?.archivosPerro || {}) };
    if (data.perros.length === 1) {
      vinculados.forEach((archivoId) => {
        const a = archivoPorId(archivoId);
        if (a && esCarnet(a) && !a.perroId && !asignados[archivoId]) asignados[archivoId] = data.perros[0];
      });
    }
    if (Object.keys(asignados).length) data.archivosPerro = asignados;
    run("cliente-save", async () => {
      const saved = await guardar("clientes", data, { ok: values.id ? `${data.nombre}: cambios guardados.` : `${data.nombre}: cliente cargado.` });
      if (saved) {
        clearDraft("cliente");
        clienteFormOpen = false;
        scheduleRerender();
        toTop();
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
    clienteFormOpen = false;
    render();
    toTop();
    return true;
  }

  const clienteEdit = t.closest("[data-coord-cliente-edit]");
  if (clienteEdit) {
    const c = findIn(getClientes(), clienteEdit.dataset.coordClienteEdit);
    if (c) {
      drafts.cliente = { id: c.id, pedidoId: c.pedidoId || "", nombre: c.nombre || "", telefono: c.telefono || "", barrio: c.barrio || "", perros: c.perros || [], plan: c.plan || PENDIENTE, dias: c.dias || [], turno: c.turno || PENDIENTE, estado: c.estado || "activo", notas: c.notas || "", archivos: c.archivos || [] };
      clearedForms.delete("cliente");
      clienteFormOpen = true;
      render();
      toTop("coord-cliente-nombre");
    }
    return true;
  }

  /* ---------- Avisos ---------- */

  if (t.closest("[data-coord-aviso-new]")) {
    avisoFormOpen = true;
    render();
    focusById("coord-aviso-barrio");
    return true;
  }

  if (t.closest("[data-coord-aviso-cancel]")) {
    avisoFormOpen = false;
    clearDraft("aviso");
    render();
    focusById("coord-aviso-new");
    return true;
  }

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
          ? ["«Hasta» tiene que ser hoy o después.", "coord-aviso-vigenteHasta"]
          : null;
    if (error) {
      showToast(error[0], { tone: "error" });
      render();
      focusById(error[1]);
      return true;
    }
    const barrio = values.barrio.trim();
    const tipo = AVISO_TIPOS.includes(values.tipo) ? values.tipo : "otro";
    run("aviso-save", async () => {
      const saved = await guardar("avisos", { fecha: hoy, barrio, tipo, mensaje: values.mensaje.trim(), vigenteHasta: values.vigenteHasta || hoy, titulo: `${tipo[0].toUpperCase()}${tipo.slice(1)} en ${barrio}` }, { ok: `Aviso de ${barrio} enviado al equipo.` });
      if (saved) {
        clearDraft("aviso");
        avisoFormOpen = false;
        scheduleRerender();
      }
    });
    return true;
  }

  const avisoCopy = t.closest("[data-coord-aviso-copy]");
  if (avisoCopy) {
    const aviso = findIn(getAvisos(), avisoCopy.dataset.coordAvisoCopy);
    if (aviso) copyAndTell(avisoText(aviso), "avisos", "Aviso copiado. Pegalo en WhatsApp.");
    return true;
  }

  const avisoFin = t.closest("[data-coord-aviso-fin]");
  if (avisoFin) {
    const aviso = findIn(getAvisos(), avisoFin.dataset.coordAvisoFin);
    if (aviso) run(`aviso-${aviso.id}`, async () => {
      await guardarConDeshacer("avisos", { id: aviso.id, vigenteHasta: addDaysISO(hoyAR(), -1) }, { id: aviso.id, vigenteHasta: aviso.vigenteHasta || aviso.fecha || hoyAR() }, `Aviso de ${aviso.barrio || "barrio"} terminado.`, "El aviso volvió.");
      focusById("coord-view-title");
    });
    return true;
  }

  /* ---------- Datos a confirmar ---------- */

  const resolve = t.closest("[data-coord-resolve]");
  if (resolve) {
    const id = resolve.dataset.coordResolve;
    const dog = DOG_BY_ID.get(id);
    run(`resuelto-${id}`, async () => {
      await guardarConDeshacer("resueltos", { id, perroId: id, perroNombre: dog?.name || id, resuelto: true, nota: "" }, { id, perroId: id, perroNombre: dog?.name || id, resuelto: false, nota: "" }, `${dog?.name || id}: resuelto.`, `${dog?.name || id}: volvió a pendientes.`);
      focusById("coord-view-title");
    });
    return true;
  }

  const unresolve = t.closest("[data-coord-unresolve]");
  if (unresolve) {
    const id = unresolve.dataset.coordUnresolve;
    const dog = DOG_BY_ID.get(id);
    run(`resuelto-${id}`, async () => {
      const saved = await guardar("resueltos", { id, perroId: id, perroNombre: dog?.name || id, resuelto: false, nota: "" }, { ok: `${dog?.name || id}: volvió a pendientes.` });
      if (saved) focusById(`coord-dato-${id}`);
    });
    return true;
  }

  /* ---------- Pedidos ---------- */

  const pedidosFiltroBtn = t.closest("[data-coord-pedidos-filtro]");
  if (pedidosFiltroBtn) {
    pedidosFiltro = pedidosFiltroBtn.dataset.coordPedidosFiltro;
    render();
    focusById(pedidosFiltroBtn.id);
    return true;
  }

  if (t.closest("[data-coord-pedido-new]")) {
    pedidoFormOpen = true;
    render();
    focusById("coord-pedido-tipo");
    return true;
  }

  if (t.closest("[data-coord-pedido-cancel]")) {
    pedidoFormOpen = false;
    clearDraft("pedido");
    render();
    focusById("coord-pedido-new");
    return true;
  }

  if (t.closest("[data-coord-pedido-save]")) {
    const form = t.closest("[data-coord-form]");
    const values = serializeForm(form);
    saveDraft("pedido", values);
    if (!values.perro?.trim() && !values.detalle?.trim()) {
      showToast("Escribí el perro o qué hay que resolver.", { tone: "error" });
      render();
      focusById("coord-pedido-perro");
      return true;
    }
    const tipo = values.tipo || PEDIDO_TIPOS[0];
    const perro = values.perro?.trim() || "";
    run("pedido-save", async () => {
      const saved = await guardar("pedidos", { fecha: hoyAR(), tipo, estado: "nuevo", origen: "app", titulo: `${tipo}: ${perro || "sin perro indicado"}`, detalle: values.detalle?.trim() || "", datos: { perro, canal: values.canal || PEDIDO_CANALES[0] } }, { ok: "Pedido guardado en «Nuevo»." });
      if (saved) {
        clearDraft("pedido");
        pedidoFormOpen = false;
        pedidosFiltro = "nuevo";
        scheduleRerender();
      }
    });
    return true;
  }

  const move = t.closest("[data-coord-pedido-move]");
  if (move) {
    const id = move.dataset.coordPedidoMove;
    const estado = move.dataset.estado;
    const pedido = findIn(getPedidos(), id);
    const antes = pedido ? estadoDe(pedido) : "nuevo";
    run(`pedido-${id}`, async () => {
      await guardarConDeshacer("pedidos", { id, estado }, { id, estado: antes }, `Pedido en «${ESTADO_LABEL[estado]}».`, `Pedido de vuelta en «${ESTADO_LABEL[antes]}».`);
      focusById(`coord-pedidos-${pedidosFiltro}`);
    });
    return true;
  }

  const pedidoDelete = t.closest("[data-coord-pedido-delete]");
  if (pedidoDelete) {
    const pedido = findIn(getPedidos(), pedidoDelete.dataset.coordPedidoDelete);
    if (pedido) run(`pedido-${pedido.id}`, async () => {
      if (await borrar("pedidos", pedido, { ok: "Pedido borrado." })) focusById("coord-toast-undo");
    });
    return true;
  }

  const pedidoCliente = t.closest("[data-coord-pedido-cliente]");
  if (pedidoCliente) {
    const pedido = findIn(getPedidos(), pedidoCliente.dataset.coordPedidoCliente);
    if (!pedido) return true;
    drafts.cliente = draftClienteFromPedido(pedido);
    clearedForms.delete("cliente");
    goView("clientes");
    clienteFormOpen = true;
    render();
    toTop("coord-cliente-nombre");
    return true;
  }

  const pedidoFicha = t.closest("[data-coord-pedido-ficha]");
  if (pedidoFicha) {
    const pedido = findIn(getPedidos(), pedidoFicha.dataset.coordPedidoFicha);
    if (!pedido) return true;
    drafts.alta = draftFromPedido(pedido);
    clearedForms.delete("alta");
    goView("mas:fichas");
    altaFormOpen = true;
    render();
    toTop("coord-alta-nombre");
    return true;
  }

  /* ---------- Fichas (alta de perro nuevo) ---------- */

  if (t.closest("[data-coord-alta-new]")) {
    altaFormOpen = true;
    render();
    toTop("coord-alta-nombre");
    return true;
  }

  if (t.closest("[data-coord-alta-close]")) {
    altaFormOpen = false;
    altaVaciarConfirm = false;
    render();
    toTop();
    return true;
  }

  if (t.closest("[data-coord-alta-save]")) {
    const form = document.getElementById("coord-alta-form");
    if (!form) return true;
    const values = serializeForm(form);
    saveDraft("alta", values);
    if (!values.nombre?.trim()) {
      showToast("Falta el nombre del perro.", { tone: "error" });
      render();
      focusById("coord-alta-nombre");
      return true;
    }
    const nombre = values.nombre.trim();
    const { archivos: delPedido, ...resto } = values;
    const datos = { ...resto, tamano: values.tamano || PENDIENTE, nombre, dias: Array.isArray(values.dias) ? values.dias : [], primerPaseo: "Individual" };
    if (altaCarnet && !altaCarnetSubido && sinSenal()) {
      showToast("Sin señal: el carnet necesita señal. Esperá o quitalo para guardar la ficha.", { tone: "error" });
      render();
      focusById("coord-alta-carnet-quitar");
      return true;
    }
    run("alta-save", async () => {
      // Primero el carnet (necesita señal); después la ficha, con el carnet vinculado.
      if (altaCarnet && !altaCarnetSubido) {
        altaSubiendo = true;
        announce("Subiendo el carnet de vacunas.");
        scheduleRerender();
        try {
          altaCarnetSubido = await archivosApi.subir(TIPO_CARNET, altaCarnet, { perroNombre: nombre, pedidoId: values.pedidoId || "", nota: "Alta de perro nuevo" });
          altaCarnet = null;
        } catch (error) {
          showToast(`No se pudo subir el carnet: ${mensajeArchivo(error, "subir")} La ficha no se guardó.`, { tone: "error" });
          return;
        } finally {
          altaSubiendo = false;
          scheduleRerender();
        }
      }
      const ids = [...new Set([...(Array.isArray(delPedido) ? delPedido : []), altaCarnetSubido?.id].filter(Boolean))];
      const carnetId = altaCarnetSubido?.id || ids.find((archivoId) => esCarnet(archivoPorId(archivoId)));
      const carnetReg = carnetId ? archivoPorId(carnetId) || altaCarnetSubido : null;
      const ficha = { fecha: hoyAR(), perroNombre: nombre, datos, categoria: "SIN EVALUAR", estado: "lista" };
      if (ids.length) ficha.archivos = ids;
      if (carnetId) ficha.carnet = { id: carnetId, nombre: carnetReg?.nombreArchivo || "" };
      const saved = await guardar("fichas", ficha, { ok: `Ficha de ${nombre} guardada${carnetId ? " con carnet" : ""}.` });
      if (saved) {
        clearDraft("alta");
        altaCarnet = null;
        altaCarnetSubido = null;
        altaFormOpen = false;
        scheduleRerender();
        toTop();
      }
    });
    return true;
  }

  if (t.closest("[data-coord-alta-clear]")) {
    altaVaciarConfirm = true;
    render();
    focusById("coord-alta-vaciar-cancel");
    return true;
  }

  if (t.closest("[data-coord-alta-clear-cancel]")) {
    altaVaciarConfirm = false;
    render();
    focusById("coord-alta-clear");
    return true;
  }

  if (t.closest("[data-coord-alta-clear-ok]")) {
    altaVaciarConfirm = false;
    altaCarnet = null;
    altaCarnetSubido = null;
    clearDraft("alta");
    showToast("Ficha vacía.");
    render();
    focusById("coord-alta-nombre");
    return true;
  }

  if (t.closest("[data-coord-alta-carnet-quitar]")) {
    altaCarnet = null;
    altaCarnetSubido = null;
    announce("Carnet quitado.");
    render();
    focusById("coord-alta-carnet");
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
    if (ficha) run(`ficha-${ficha.id}`, async () => {
      if (await borrar("fichas", ficha, { ok: "Ficha borrada." })) focusById("coord-toast-undo");
    });
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
      const box = document.getElementById("coord-picker-grid");
      if (box) box.innerHTML = pickerGrid();
      return;
    }
    if (target.matches("[data-coord-ed-hora]")) {
      editorHora = target.value;
      const box = document.getElementById("coord-picker-grid");
      if (box) box.innerHTML = pickerGrid();
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
        stop[target.dataset.k] = target.value;
        editor.sucio = true;
      }
      return;
    }
  }

  if (target.matches("[data-coord-rechazo]")) {
    rechazos[target.dataset.coordRechazo] = target.value;
    return;
  }

  if (subida && target.matches("[data-coord-subida-campo]")) {
    subida[target.dataset.coordSubidaCampo] = target.value;
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
    target.closest(".coord-field")?.querySelectorAll(".cd-pick-dog").forEach((label) => {
      label.hidden = Boolean(q) && !label.dataset.name.includes(q) && !label.querySelector("input").checked;
    });
  }
}

function handleCoordinadorChange(event) {
  const target = event.target;
  if (!target.closest?.(".coord-shell")) return false;

  // Foto del perro (cámara o galería).
  if (target.matches("[data-coord-foto]")) {
    const file = target.files?.[0];
    if (file) run(`foto-${target.dataset.coordFoto}`, () => subirFoto(target.dataset.coordFoto, file));
    return true;
  }

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
    if (["soloDia", "paseador", "ayudante", "supervisor"].includes(target.dataset.coordEdField)) scheduleRerender();
    return true;
  }

  if (target.matches("[data-coord-ed-hora], [data-coord-ed-search], [data-coord-rechazo], [data-coord-clientes-buscar], [data-coord-filter-perros]")) return true;

  // Archivo elegido: queda en memoria (el <input> se vacía al redibujar).
  if (target.matches("[data-coord-subida-archivo]")) {
    if (subida && target.files?.[0]) {
      subida.file = target.files[0];
      subida.error = "";
      announce(`Elegiste ${subida.file.name}. Tocá «Subir».`);
      scheduleRerender();
    }
    return true;
  }

  if (subida && target.matches("[data-coord-subida-campo]")) {
    subida[target.dataset.coordSubidaCampo] = target.value;
    if (target.dataset.coordSubidaCampo !== "nota") {
      subida.error = "";
      scheduleRerender();
    }
    return true;
  }

  if (target.matches("[data-coord-alta-carnet]")) {
    if (target.files?.[0]) {
      altaCarnet = target.files[0];
      altaCarnetSubido = null;
      announce(`Elegiste ${altaCarnet.name}. Se sube al guardar.`);
      scheduleRerender();
    }
    return true;
  }

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
  // Solo el botón de guardar del formulario (nunca un "Vaciar" que esté a la vista).
  form.querySelector("[data-coord-cliente-save], [data-coord-aviso-save], [data-coord-pedido-save], [data-coord-alta-save]")?.click();
}

function handleCoordinadorKeydown(event) {
  if (event.key !== "Enter") return;
  const target = event.target;
  if (target.matches?.(".coord-shell [data-coord-ed-search]")) {
    event.preventDefault();
    document.querySelector("#coord-picker-grid .cd-dog-add")?.click();
  }
}

export function registerCoordinadorEvents() {
  clickHandlers.push(handleCoordinadorClick);
  changeHandlers.push(handleCoordinadorChange);
  document.addEventListener("input", handleCoordinadorInput);
  document.addEventListener("submit", handleCoordinadorSubmit);
  document.addEventListener("keydown", handleCoordinadorKeydown);
}
