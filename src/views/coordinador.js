// Vista del rol Coordinador: pedidos (incluidos los del formulario web), datos a confirmar,
// altas, carga semanal, observaciones e incidentes recientes y pagos de apoyo.
//
// Los datos del trabajo viven en el servidor (src/api/client.js, ver docs/datos-compartidos.md):
// pedidos, fichas, resueltos y pagos se comparten con el resto del equipo según su rol.
// La carga semanal y los datos a confirmar salen de src/data/realData.js.
// En este dispositivo solo queda qué secciones están abiertas.
import {
  PENDIENTE,
  DATA_UPDATED,
  BUSINESS_INFO,
  REAL_DOGS,
  REAL_PLANS,
  WEEK_DAYS,
  dogsForShift,
  goesOn,
  todayName,
  formatPeso,
} from "../data/realData.js";
import { session, registros, onDataChange, hoyAR } from "../api/client.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { render } from "../app.js";

/* ------------------------------------------------------------------ */
/* Almacenamiento local                                                */
/* ------------------------------------------------------------------ */

// Claves de la versión anterior (todo quedaba en el dispositivo). Se suben una vez y se borran.
const LEGACY = {
  resueltos: "paseosJuan_coord_resueltos",
  pedidos: "paseosJuan_coord_pedidos",
  altas: "paseosJuan_coord_altas",
  pagos: "paseosJuan_coord_pagos",
  borradores: "paseosJuan_coord_borradores",
};
// Única clave que se sigue usando: qué secciones están abiertas (preferencia de pantalla).
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

// Mensaje de la última acción (se muestra en la sección y se anuncia).
let flash = null;
// Último registro borrado, para poder deshacer.
let lastDeleted = null;

function setFlash(section, text, tone = "ok") {
  flash = { section, text, tone };
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

function argentinaNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: TZ }));
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

// "13/11/2026" → "2026-11-13" (o null si no es una fecha válida).
function isoFromDMY(text) {
  const match = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(text || ""));
  if (!match) return null;
  const [, d, m, y] = match.map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null;
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function todayDMY() {
  return fmtDate(hoyAR());
}

// Fecha desde la que se muestran observaciones e incidentes (hoy y los 6 días anteriores).
function desde7() {
  return hoyAR(new Date(Date.now() - 6 * 24 * 3600 * 1000));
}

function normalize(text) {
  return String(text || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

const DAY_SHORT = { Lunes: "lun", Martes: "mar", Miércoles: "mié", Jueves: "jue", Viernes: "vie", Sábado: "sáb", Domingo: "dom" };

function daysLabel(days) {
  if (!days?.length) return "Sin días en rutas";
  const work = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  if (work.every((d) => days.includes(d))) {
    return days.includes("Sábado") ? "Lun a sáb" : "Lun a vie";
  }
  return days.map((d) => DAY_SHORT[d]).join(", ");
}

// Horario por día (BASE RUTAS) agrupado por turno: "mañana: lun a vie · tarde: sáb".
function scheduleLabel(dog) {
  const parts = SHIFT_LABELS.map((shift) => {
    const days = WEEK_DAYS.filter((day) => goesOn(dog, day, shift));
    return days.length ? `${shift.toLowerCase()}: ${daysLabel(days).toLowerCase()}` : "";
  }).filter(Boolean);
  return parts.length ? parts.join(" · ") : "Sin días en rutas";
}

function listJoin(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

// Secciones plegables: se recuerda en el dispositivo qué está abierto.
function isOpen(key, fallback = false) {
  const state = readJSON(SECTIONS_KEY, {});
  return key in state ? Boolean(state[key]) : fallback;
}

function setOpen(key, value) {
  writeJSON(SECTIONS_KEY, { ...readJSON(SECTIONS_KEY, {}), [key]: value });
}

// Detalles de una tarjeta (por ejemplo, "Ver datos" de un pedido): solo en memoria.
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

function currentUser() {
  return session.user() || { usuario: "", nombre: PENDIENTE, rol: "" };
}

/* ------------------------------------------------------------------ */
/* Datos compartidos: lectura, refresco y redibujado                   */
/* ------------------------------------------------------------------ */

const SHARED = ["pedidos", "fichas", "resueltos", "pagos"];
const RECENT = ["observaciones", "incidentes"];

function optsFor(col) {
  return RECENT.includes(col) ? { desde: desde7() } : {};
}

function cached(col) {
  return registros.cached(col, optsFor(col));
}

const loaded = new Set();
const loadErrors = new Map();
const syncing = new Map(); // colección → { key, stop }
let dataWired = false;
let rerenderQueued = false;

// Se registra UNA sola vez: cuando llegan datos nuevos se vuelve a dibujar la página.
function wireData() {
  if (dataWired) return;
  dataWired = true;
  onDataChange((col) => {
    if (![...SHARED, ...RECENT].includes(col)) return;
    loaded.add(col);
    loadErrors.delete(col);
    scheduleRerender();
  });
  window.addEventListener("online", scheduleRerender);
  window.addEventListener("offline", scheduleRerender);
}

// Pide los datos una vez (para saber si hubo error) y después los deja refrescando cada minuto.
function ensureSync() {
  const user = session.user();
  if (!user) return;
  [...SHARED, ...RECENT].forEach((col) => {
    const opts = optsFor(col);
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
    // Un formulario recién guardado o vaciado no se vuelve a copiar desde la pantalla.
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
        // Algunos campos (select, número) no tienen selección.
      }
    }
  }
}

function byNewest(a, b) {
  return String(b.creadoEn || "9999").localeCompare(String(a.creadoEn || "9999"));
}

const ESTADOS = ["nuevo", "en-curso", "resuelto"];

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

function getPagos() {
  return cached("pagos").slice().sort(byNewest);
}

// Mapa id del perro → registro de "resueltos" marcado como resuelto.
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

// Borrar: admin siempre; el resto, solo lo que cargó en las últimas 24 horas.
function canDelete(record) {
  const user = session.user();
  if (!user || record.pendiente || !record.creadoEn) return false;
  if (user.rol === "admin") return true;
  return record.creadoPor === user.usuario && Date.now() - Date.parse(record.creadoEn) < 24 * 3600 * 1000;
}

// Quién cargó el registro y cuándo cambió por última vez.
function whoLine(record, { web = false } = {}) {
  const parts = [];
  if (web) {
    parts.push(`Llegó por la página web${record.creadoEn ? ` el ${fmtStamp(record.creadoEn)}` : ""}`);
  } else if (record.creadoPorNombre) {
    parts.push(`Cargado por ${esc(record.creadoPorNombre)}${record.creadoEn ? ` el ${fmtStamp(record.creadoEn)}` : ""}`);
  }
  if (record.actualizadoEn && record.actualizadoEn !== record.creadoEn) {
    const quien = record.actualizadoPorNombre || record.cambioPorNombre;
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

// Guarda en el servidor (o deja en cola sin señal) y avisa el resultado.
async function guardar(col, data, { section, ok }) {
  try {
    const result = await registros.save(col, data);
    setFlash(section, result.pendiente ? `${ok} Sin señal: se enviará cuando vuelva.` : ok);
    return result;
  } catch (error) {
    setFlash(section, `No se pudo guardar: ${error.message}`, "error");
    return null;
  } finally {
    scheduleRerender();
  }
}

async function borrar(col, record, { section, ok }) {
  try {
    await registros.remove(col, record.id);
    lastDeleted = { col, record, section };
    setFlash(section, ok);
    flash.undo = true;
  } catch (error) {
    setFlash(section, `No se pudo borrar: ${error.message}`, "error");
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

function legacyId(oldId) {
  const id = `ant_${String(oldId || "")}`;
  return LEGACY_ID.test(String(oldId || "")) ? id : undefined;
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
      data: {
        id: legacyId(id),
        fecha: isoFromDMY(fecha) || hoy,
        perroNombre: old.nombre || PENDIENTE,
        datos: { ...datos, primerPaseo: "Individual" },
        categoria: "SIN EVALUAR",
        estado: "lista",
        migrado: true,
      },
    });
  });

  readJSON(LEGACY.pagos, []).forEach((old) => {
    const monto = Number(String(old.montoTexto || old.monto || "").replace(/[^\d]/g, "")) || 0;
    out.push({
      key: LEGACY.pagos,
      oldId: old.id,
      col: "pagos",
      data: {
        id: legacyId(old.id),
        fecha: isoFromDMY(old.fecha) || hoy,
        concepto: `Pago de ${old.perro || PENDIENTE}`,
        perroNombre: old.perro || "",
        monto,
        medio: old.medio || "",
        comprobante: old.comprobante || "",
        nota: old.nota || "",
        pasadoAlLibro: Boolean(old.enLibro),
        migrado: true,
      },
    });
  });

  const enServidor = new Set(cached("resueltos").map((r) => r.perroId || r.id));
  Object.entries(readJSON(LEGACY.resueltos, {})).forEach(([dogId, date]) => {
    if (enServidor.has(dogId)) {
      out.push({ key: LEGACY.resueltos, oldId: dogId, skip: true });
      return;
    }
    const dog = REAL_DOGS.find((d) => d.id === dogId);
    out.push({
      key: LEGACY.resueltos,
      oldId: dogId,
      col: "resueltos",
      data: {
        id: dogId,
        perroId: dogId,
        perroNombre: dog?.name || dogId,
        resuelto: true,
        nota: `Marcado como resuelto el ${date} en un solo dispositivo (versión anterior de la página).`,
        migrado: true,
      },
    });
  });
  return out;
}

async function maybeMigrate() {
  if (migrationDone || migrating) return;
  if (!SHARED.every((col) => loaded.has(col))) return;
  migrating = true;
  try {
    // Borradores de formularios: pasan a memoria (pueden tener datos del tutor).
    const oldDrafts = readJSON(LEGACY.borradores, {});
    Object.entries(oldDrafts).forEach(([form, values]) => {
      if (!drafts[form]) drafts[form] = values;
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
    // Se borra de este dispositivo lo que ya subió (o quedó en cola para subir).
    [LEGACY.pedidos, LEGACY.altas, LEGACY.pagos].forEach((key) => {
      const left = readJSON(key, []).filter((old) => failed.has(`${key}|${old.id}`));
      if (left.length) writeJSON(key, left);
      else removeKey(key);
    });
    const leftResueltos = Object.fromEntries(Object.entries(readJSON(LEGACY.resueltos, {})).filter(([id]) => failed.has(`${LEGACY.resueltos}|${id}`)));
    if (Object.keys(leftResueltos).length) writeJSON(LEGACY.resueltos, leftResueltos);
    else removeKey(LEGACY.resueltos);

    if (subidos) {
      migrationNote = `Subimos ${subidos} ${subidos === 1 ? "registro que estaba guardado" : "registros que estaban guardados"} solo en este dispositivo. Ahora los ve el resto del equipo según su rol.`;
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
/* Datos calculados desde realData                                     */
/* ------------------------------------------------------------------ */

const ACTIVE_DOGS = REAL_DOGS.filter((dog) => dog.status === "Activo");
const SERVICE_DAYS = WEEK_DAYS.filter((day) => day !== "Domingo");
const SHIFT_LABELS = ["Mañana", "Tarde"];

function hasMuzzle(dog) {
  return dog.safety.some((note) => /bozal/i.test(note));
}

function activeForShift(day, shift) {
  return dogsForShift(day, shift).filter((dog) => dog.status === "Activo");
}

// Datos a revisar: perros con `review` o con estado distinto de Activo.
const REVIEW_DOGS = REAL_DOGS.filter((dog) => dog.review || dog.status !== "Activo");

// Cruces: perros con indicación "no juntar" que figuran en el mismo día y turno.
function conflictsFor(day, shift) {
  const dogs = activeForShift(day, shift);
  const names = new Set(dogs.map((dog) => dog.name));
  const pairs = new Map();
  dogs.forEach((dog) => {
    (dog.incompatibleWith || []).forEach((other) => {
      if (!names.has(other)) return;
      const key = [dog.name, other].sort().join(" y ");
      pairs.set(key, key);
    });
  });
  return [...pairs.keys()];
}

function weeklyConflicts() {
  const byPair = new Map();
  SERVICE_DAYS.forEach((day) => {
    SHIFT_LABELS.forEach((shift) => {
      conflictsFor(day, shift).forEach((pair) => {
        if (!byPair.has(pair)) byPair.set(pair, {});
        const entry = byPair.get(pair);
        entry[shift] = [...(entry[shift] || []), day];
      });
    });
  });
  return [...byPair.entries()].map(([pair, shifts]) => ({
    pair,
    detail: Object.entries(shifts)
      .map(([shift, days]) => `${shift.toLowerCase()}: ${daysLabel(days).toLowerCase()}`)
      .join(" · "),
  }));
}

// Nombres que figuran en "no juntar con" pero no están en la lista de perros.
function unknownIncompatibles() {
  const known = new Set(REAL_DOGS.map((dog) => dog.name));
  const unknown = new Set();
  REAL_DOGS.forEach((dog) => (dog.incompatibleWith || []).forEach((name) => !known.has(name) && unknown.add(name)));
  return [...unknown];
}

function weeklyLoad() {
  return SERVICE_DAYS.map((day) => {
    const manana = activeForShift(day, "Mañana");
    const tarde = activeForShift(day, "Tarde");
    const muzzle = new Set([...manana, ...tarde].filter(hasMuzzle).map((dog) => dog.name));
    return {
      day,
      manana: manana.length,
      tarde: tarde.length,
      total: manana.length + tarde.length,
      muzzle: [...muzzle],
      conflicts: conflictsFor(day, "Mañana").length + conflictsFor(day, "Tarde").length,
    };
  });
}

function pendingReview() {
  const resolved = getResolved();
  return REVIEW_DOGS.filter((dog) => !resolved[dog.id]);
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
  formEl.querySelectorAll("[name]").forEach((field) => {
    if (field.type === "file") return;
    if (field.type === "checkbox") {
      const group = formEl.querySelectorAll(`[name="${field.name}"]`);
      values[field.name] = [...group].filter((box) => box.checked).map((box) => box.value);
      return;
    }
    values[field.name] = field.value;
  });
  return values;
}

/* ------------------------------------------------------------------ */
/* Componentes de formulario                                           */
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
  return `
    <div class="coord-field ${span ? "is-wide" : ""}">
      <label for="${id}">${label}${required ? ' <span class="coord-required">(obligatorio)</span>' : ""}</label>
      <select id="${id}" name="${name}" ${hint ? `aria-describedby="${id}-hint"` : ""} ${required ? "required" : ""}>
        ${options.map((option) => `<option ${option === value ? "selected" : ""}>${esc(option)}</option>`).join("")}
      </select>
      ${hint ? `<small id="${id}-hint">${hint}</small>` : ""}
    </div>
  `;
}

function textArea(form, name, label, { value = "", placeholder = "", hint = "", span = true, attrs = "" } = {}) {
  const id = `coord-${form}-${name}`;
  return `
    <div class="coord-field ${span ? "is-wide" : ""}">
      <label for="${id}">${label}</label>
      <textarea id="${id}" name="${name}" rows="3" ${placeholder ? `placeholder="${esc(placeholder)}"` : ""} ${hint ? `aria-describedby="${id}-hint"` : ""} ${attrs}>${esc(value)}</textarea>
      ${hint ? `<small id="${id}-hint">${hint}</small>` : ""}
    </div>
  `;
}

function fileField(form, name, label, fileName, hint) {
  const id = `coord-${form}-${name}`;
  return `
    <div class="coord-field">
      <span class="coord-label" id="${id}-label">${label}</span>
      <div class="coord-file">
        <input class="coord-file-input" id="${id}" type="file" accept=".jpg,.jpeg,.png,.pdf" data-coord-file="${form}" data-coord-file-field="${name}" aria-labelledby="${id}-label ${id}-button" aria-describedby="${id}-hint" />
        <label class="coord-btn is-secondary is-compact" for="${id}" id="${id}-button">${icon("fileUp", "coord-icon")}<span>${fileName ? "Cambiar archivo" : "Elegir archivo"}</span></label>
        <span class="coord-file-name" data-coord-file-name>${fileName ? esc(fileName) : "Ningún archivo elegido"}</span>
      </div>
      <small id="${id}-hint">${hint}</small>
    </div>
  `;
}

function feedback(section) {
  if (!flash || flash.section !== section) return "";
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
  if (!dog.safety?.length) return "";
  return `
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${esc(dog.name)}">
      ${dog.safety.map((note) => `<li class="${/bozal|no juntar/i.test(note) ? "is-alert" : ""}">${icon(/bozal|no juntar/i.test(note) ? "alertTriangle" : "users", "coord-icon")}${esc(note)}</li>`).join("")}
    </ul>
  `;
}

// Lista de datos "etiqueta: valor" (solo los que tienen valor).
function dataList(rows, className = "") {
  const visible = rows.filter(([, value]) => String(value ?? "").trim());
  if (!visible.length) return "";
  return `
    <dl class="coord-data ${className}">
      ${visible.map(([label, value, tone]) => `<div class="${tone ? `is-${tone}` : ""}"><dt>${label}</dt><dd>${esc(value)}</dd></div>`).join("")}
    </dl>
  `;
}

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
      ${ReviewSection()}
      ${RequestsSection()}
      ${IntakeSection()}
      ${ActivitySection()}
      ${LoadSection()}
      ${PaymentsSection()}
      <p class="coord-footnote">
        Rutas y datos de perros al ${DATA_UPDATED}. Fuentes: ${esc(BUSINESS_INFO.officialSources.dogs)} y ${esc(BUSINESS_INFO.officialSources.routes)}.
        Pedidos, fichas, datos resueltos y pagos se guardan en los datos compartidos del equipo.
      </p>
    </main>
  `;
  // El mensaje de estado se muestra una sola vez.
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
  if (migrationNote) {
    items.push(`<p class="coord-sync is-ok">${icon("uploadCloud", "coord-icon")}<span>${esc(migrationNote)}</span></p>`);
  }
  return items.length ? `<div class="coord-sync-list">${items.join("")}</div>` : "";
}

/* ---------- 1. Lo urgente de hoy ---------- */

function WebAlert(nuevos) {
  if (!nuevos.length) return "";
  const shown = nuevos.slice(0, 3);
  return `
    <div class="coord-web-alert" role="note" aria-labelledby="coord-web-alert-title">
      <h2 id="coord-web-alert-title">${icon("bell", "coord-icon")}<span>${nuevos.length === 1 ? "Pedido nuevo desde la web" : `${nuevos.length} pedidos nuevos desde la web`}</span></h2>
      <ul>
        ${shown.map((p) => {
          const d = p.datos || {};
          const bite = d.mordida && d.mordida !== "No";
          return `
            <li>
              <div>
                <strong>${esc(d.perro || PENDIENTE)}</strong>
                <span>${esc([d.responsable, d.zona].filter(Boolean).join(" · ") || PENDIENTE)} · ${esc(fmtStamp(p.creadoEn) || fmtDate(p.fecha))}</span>
                ${bite ? `<span class="coord-inline-alert is-strong">${icon("alertTriangle", "coord-icon")}<span>Mordida: ${esc(d.mordida)}</span></span>` : ""}
              </div>
              ${button("Ver pedido", `data-coord-goto-pedido="${esc(p.id)}"`, "primary", "arrowRight")}
            </li>
          `;
        }).join("")}
      </ul>
      ${nuevos.length > shown.length ? `<p>Y ${nuevos.length - shown.length} más en el tablero de pedidos.</p>` : ""}
    </div>
  `;
}

function TodayPanel() {
  const now = argentinaNow();
  const today = todayName(now);
  const user = currentUser();
  const pending = pendingReview();
  const pedidos = getPedidos();
  const openPedidos = pedidos.filter((p) => estadoDe(p) !== "resuelto");
  const nuevos = pedidos.filter((p) => estadoDe(p) === "nuevo").length;
  const web = webNuevos(pedidos);
  const manana = activeForShift(today, "Mañana");
  const tarde = activeForShift(today, "Tarde");
  const muzzleToday = [...new Set([...manana, ...tarde].filter(hasMuzzle).map((dog) => dog.name))];
  const conflictsToday = [
    ...conflictsFor(today, "Mañana").map((pair) => `${pair} (mañana)`),
    ...conflictsFor(today, "Tarde").map((pair) => `${pair} (tarde)`),
  ];
  const noService = manana.length + tarde.length === 0;

  let next;
  if (web.length) {
    const oldest = web[web.length - 1];
    const d = oldest.datos || {};
    next = {
      text: `Escribile a <b>${esc(d.responsable || "quien hizo el pedido")}</b> por la evaluación de <b>${esc(d.perro || "su perro")}</b>.`,
      action: button("Ver pedido", `data-coord-goto-pedido="${esc(oldest.id)}"`, "primary", "arrowRight"),
    };
  } else if (pending.length) {
    const dog = pending[0];
    next = {
      text: `Confirmá el dato de <b>${esc(dog.name)}</b>: ${esc(dog.review || `estado "${dog.status}"`)}`,
      action: button(`Ir a ${esc(dog.name)}`, `data-coord-goto-dog="${dog.id}"`, "primary", "arrowRight"),
    };
  } else if (openPedidos.length) {
    const oldest = openPedidos[openPedidos.length - 1];
    next = {
      text: `Avanzá con el pedido más viejo: <b>${esc(oldest.titulo || oldest.tipo)}</b>.`,
      action: button("Ver pedido", `data-coord-goto-pedido="${esc(oldest.id)}"`, "primary", "arrowRight"),
    };
  } else {
    next = {
      text: "No hay datos ni pedidos pendientes. Revisá la carga de la semana.",
      action: button("Ver carga", `data-coord-open="carga"`, "primary", "arrowRight"),
    };
  }

  return `
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${today} ${todayDMY()}</p>
        <p class="coord-greeting">Hola, ${esc(user.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
        <p class="coord-owner">A cargo: ${esc(user.nombre)}</p>
      </div>

      ${WebAlert(web)}

      <ol class="coord-priorities">
        <li class="coord-priority ${pending.length ? "is-warn" : "is-ok"}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Datos a confirmar</h2>
            <p class="coord-big"><b>${pending.length}</b> <span>de ${REVIEW_DOGS.length} perros</span></p>
            <p>${pending.length ? "Diferencias entre planillas o perros sin ruta." : "Todo confirmado."}</p>
          </div>
          ${button("Ver la lista", `data-coord-goto="coord-datos"`, "secondary")}
        </li>
        <li class="coord-priority ${web.length ? "is-alert" : nuevos ? "is-warn" : ""}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Pedidos abiertos</h2>
            <p class="coord-big"><b>${openPedidos.length}</b> <span>${nuevos ? `${nuevos} sin empezar` : openPedidos.length === 1 ? "pedido" : "pedidos"}</span></p>
            <p>${pedidos.length ? "Consultas, evaluaciones de la web y avisos de clientes." : loaded.has("pedidos") ? "Todavía no hay pedidos." : "Cargando pedidos…"}</p>
          </div>
          ${button(pedidos.length ? "Ver pedidos" : "Cargar un pedido", `data-coord-open="pedidos"`, "secondary")}
        </li>
        <li class="coord-priority ${conflictsToday.length ? "is-alert" : ""}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Hoy en la calle</h2>
            ${noService
              ? `<p class="coord-big"><b>0</b> <span>perros</span></p><p>No hay rutas cargadas para hoy.</p>`
              : `<p class="coord-big"><b>${manana.length}</b> <span>mañana</span> <b>${tarde.length}</b> <span>tarde</span></p>
                 ${muzzleToday.length ? `<p class="coord-inline-alert">${icon("alertTriangle", "coord-icon")}<span>Con bozal: ${esc(listJoin(muzzleToday))}</span></p>` : ""}
                 ${conflictsToday.length ? `<p class="coord-inline-alert is-strong">${icon("alertTriangle", "coord-icon")}<span>No juntar, comparten turno: ${esc(listJoin(conflictsToday))}</span></p>` : ""}`}
          </div>
          ${button("Ver carga de la semana", `data-coord-open="carga"`, "secondary")}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${next.text}</p>
        ${next.action}
      </div>
    </section>
  `;
}

/* ---------- 2. Datos a confirmar ---------- */

function ReviewCard(dog, record) {
  const who = record ? record.actualizadoPorNombre || record.resueltoPorNombre || record.creadoPorNombre : "";
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
  const first = pending.slice(0, 4);
  const rest = pending.slice(4);
  const unknown = unknownIncompatibles();

  return `
    <section class="coord-block" id="coord-datos" tabindex="-1" aria-labelledby="coord-datos-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-datos-title">Datos a confirmar</h2>
          <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
        </div>
        <div class="coord-progress" aria-label="${done.length} de ${REVIEW_DOGS.length} resueltos">
          <b>${done.length}/${REVIEW_DOGS.length}</b><span>resueltos</span>
          <span class="coord-progress-bar" aria-hidden="true"><i style="width:${Math.round((done.length / REVIEW_DOGS.length) * 100)}%"></i></span>
        </div>
      </div>
      ${feedback("datos")}
      ${pending.length
        ? `<ul class="coord-review-list">${first.map((dog) => ReviewCard(dog)).join("")}</ul>`
        : `<p class="coord-empty">${icon("checkCircle", "coord-icon")}No quedan datos por confirmar.</p>`}
      ${rest.length ? `
        <details class="coord-more" ${isOpen("datosMas") ? "open" : ""}>
          <summary data-coord-toggle="datosMas">Ver los otros ${rest.length} pendientes ${icon("chevronDown", "coord-icon")}</summary>
          <ul class="coord-review-list">${rest.map((dog) => ReviewCard(dog)).join("")}</ul>
        </details>` : ""}
      ${done.length ? `
        <details class="coord-more" ${isOpen("datosResueltos") ? "open" : ""}>
          <summary data-coord-toggle="datosResueltos">Resueltos (${done.length}) ${icon("chevronDown", "coord-icon")}</summary>
          <ul class="coord-review-list">${done.map((dog) => ReviewCard(dog, resolved[dog.id])).join("")}</ul>
        </details>` : ""}
      ${unknown.length ? `<p class="coord-note">${icon("alertCircle", "coord-icon")}<span>También a confirmar: ${esc(listJoin(unknown))} figura en "no juntar con" pero no está en la lista de perros.</span></p>` : ""}
      <p class="coord-note">${icon("fileText", "coord-icon")}<span>Lo que marcás como resuelto lo ven Juan y coordinación. El cambio todavía debe incorporarse al ${esc(BUSINESS_INFO.officialSources.dogs.toLowerCase())}.</span></p>
    </section>
  `;
}

/* ---------- 3. Pedidos de clientes y evaluaciones ---------- */

const PEDIDO_TIPOS = ["Consulta", "Evaluación inicial", "Documentación", "Cambio de días o plan", "Ausencia", "Otro"];
const PEDIDO_CANALES = ["WhatsApp", "Llamada", "En persona", "Otro"];
const PEDIDO_COLUMNAS = [
  ["nuevo", "Nuevo"],
  ["en-curso", "En curso"],
  ["resuelto", "Resuelto"],
];
const ESTADO_LABEL = { nuevo: "Nuevo", "en-curso": "En curso", resuelto: "Resuelto" };

// Teléfono que dejó el tutor → número para WhatsApp (celular de Argentina: 549 + 10 dígitos).
function whatsappNumber(raw) {
  let digits = String(raw || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("54")) {
    digits = digits.slice(2);
    if (digits.startsWith("9")) digits = digits.slice(1);
  }
  if (digits.startsWith("0")) digits = digits.slice(1);
  // Formato local con 15 (ej.: 11 15 xxxx xxxx): se saca el 15 después del código de área.
  if (digits.length === 12) {
    const cut = [2, 3, 4].find((at) => digits.slice(at, at + 2) === "15");
    if (cut) digits = digits.slice(0, cut) + digits.slice(cut + 2);
  }
  return digits.length === 10 ? `549${digits}` : "";
}

function whatsappButton(pedido, variant) {
  const d = pedido.datos || {};
  if (!d.telefono) return "";
  const number = whatsappNumber(d.telefono);
  if (!number) {
    return `<p class="coord-inline-alert">${icon("alertCircle", "coord-icon")}<span>Revisá el teléfono: no parece un celular de Argentina. Escribile a mano.</span></p>`;
  }
  const saludo = d.responsable ? `Hola ${d.responsable}` : "Hola";
  const message = `${saludo}, te escribo de Paseos Juan por el pedido de evaluación de ${d.perro || "tu perro"}.`;
  return `<a class="coord-btn is-${variant}" href="https://wa.me/${number}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener noreferrer">${icon("message", "coord-icon")}<span>Escribirle por WhatsApp</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`;
}

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

function PedidoCard(pedido, fichaPorPedido) {
  const estado = estadoDe(pedido);
  const isWeb = pedido.origen === "web";
  const d = pedido.datos || {};
  const id = esc(pedido.id);
  const ficha = fichaPorPedido.get(pedido.id);
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
    : `
      <p class="coord-card-dog">${icon("pawPrint", "coord-icon")}${esc(pedidoPerro(pedido) || PENDIENTE)}</p>
      ${pedido.detalle ? `<p>${esc(pedido.detalle)}</p>` : ""}
    `;

  return `
    <li class="coord-card ${isWeb ? "is-web" : ""}" id="coord-pedido-${id}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${esc(isWeb ? d.perro || PENDIENTE : pedido.tipo || "Pedido")}</strong>
        <small>${isWeb ? esc(pedido.tipo || "Formulario web") : `${esc(fmtDate(pedido.fecha))}${d.canal || pedido.canal ? ` · ${esc(d.canal || pedido.canal)}` : ""}`}</small>
      </div>
      ${isWeb ? `<p class="coord-badges">${badge("Formulario web", "warn")}</p>` : ""}
      ${details}
      ${whoLine(pedido, { web: isWeb })}
      ${ficha ? `<p class="coord-done">${icon("checkCircle", "coord-icon")}<span>Ficha creada para ${esc(ficha.perroNombre)}</span></p>` : ""}
      <div class="coord-actions">
        ${estado !== "resuelto" ? whatsappButton(pedido, "primary") : ""}
        ${moves}
        ${canFicha ? button("Armar ficha con estos datos", `data-coord-pedido-ficha="${id}"`, "ghost", "userPlus") : ""}
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
  const dogNames = REAL_DOGS.map((dog) => dog.name);
  const fichaPorPedido = new Map(getFichas().filter((f) => f.datos?.pedidoId).map((f) => [f.datos.pedidoId, f]));
  const isLoading = !loaded.has("pedidos") && !pedidos.length;

  const body = `
    ${feedback("pedidos")}
    <div class="coord-board">
      ${PEDIDO_COLUMNAS.map(([estado, label]) => {
        const items = pedidos.filter((p) => estadoDe(p) === estado);
        // Los pedidos nuevos de la web van primero.
        if (estado === "nuevo") items.sort((a, b) => Number(b.origen === "web") - Number(a.origen === "web"));
        return `
          <section class="coord-column" aria-labelledby="coord-col-${estado}">
            <h3 id="coord-col-${estado}">${label} <span>${items.length}</span></h3>
            ${items.length
              ? `<ul class="coord-card-list">${items.map((p) => PedidoCard(p, fichaPorPedido)).join("")}</ul>`
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
      <datalist id="coord-dog-names">${dogNames.map((name) => `<option value="${esc(name)}"></option>`).join("")}</datalist>
      <div class="coord-actions">${button("Guardar pedido", "data-coord-pedido-save", "primary", "plus")}</div>
    </form>
  `;

  return section({
    key: "pedidos",
    id: "coord-pedidos",
    iconName: "clipboardCheck",
    title: "Pedidos y evaluaciones",
    intro: "Los del formulario de la web y los que cargás vos. Los ve todo coordinación.",
    badges: `${web ? badge(`${web} ${web === 1 ? "nuevo" : "nuevos"} de la web`, "alert") : ""}${open ? badge(`${open} abiertos`, "warn") : badge("Sin pedidos abiertos", "neutral")}`,
    body,
    open: web > 0,
  });
}

/* ---------- 4. Alta de perro nuevo ---------- */

const SI_NO = ["Pendiente de confirmar", "Sí", "No"];

function IntakeSection() {
  const draft = getDraft("alta");
  const fichas = getFichas();
  const days = Array.isArray(draft.dias) ? draft.dias : [];
  const planOptions = ["Pendiente de confirmar", ...REAL_PLANS.map((plan) => `${plan.name} (${plan.walks} paseos por semana)`), "Paseo suelto"];

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
          ${selectField("alta", "tamano", "Tamaño", ["Pendiente de confirmar", "Pequeño", "Mediano", "Grande"], { value: draft.tamano })}
          ${field("alta", "raza", "Raza o cruza", { value: draft.raza })}
          ${field("alta", "edad", "Edad aproximada", { value: draft.edad })}
          ${selectField("alta", "sexo", "Sexo", ["Pendiente de confirmar", "Macho", "Hembra"], { value: draft.sexo })}
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
          ${selectField("alta", "zona", "Zona", ["Pendiente de confirmar", "Pilar", "La Lonja", "Otra zona"], { value: draft.zona })}
          ${field("alta", "referencia", "Barrio o referencia", { value: draft.referencia, attrs: 'autocomplete="off"' })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${selectField("alta", "vacunas", "Vacunas al día", SI_NO, { value: draft.vacunas })}
          ${fileField("alta", "carnet", "Carnet de vacunas", draft.carnet, "Foto o PDF. Se guarda solo el nombre del archivo.")}
          ${field("alta", "veterinario", "Veterinaria de referencia", { value: draft.veterinario })}
          ${textArea("alta", "salud", "Condiciones, alergias o medicación", { value: draft.salud, hint: "Lo que dice el tutor. Sin diagnósticos propios." })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${selectField("alta", "sujecion", "Collar o pechera", ["Pendiente de confirmar", "Collar", "Pechera", "Collar y pechera"], { value: draft.sujecion })}
          ${selectField("alta", "bozal", "Usa bozal", SI_NO, { value: draft.bozal })}
          ${selectField("alta", "correa", "Tiene correa propia", SI_NO, { value: draft.correa })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${draft.relatoTutor ? textArea("alta", "relatoTutor", "Lo que contó el tutor en el formulario (no observado)", { value: draft.relatoTutor, attrs: "readonly" }) : ""}
          ${textArea("alta", "conPerros", "Con otros perros", { value: draft.conPerros, placeholder: "Ej.: se acerca con la cola baja y se aleja si el otro ladra", span: false })}
          ${textArea("alta", "conPersonas", "Con personas", { value: draft.conPersonas, span: false })}
          ${textArea("alta", "estimulos", "Situaciones que lo alteran", { value: draft.estimulos, placeholder: "Ej.: motos, bicicletas, ruidos fuertes", span: false })}
          ${field("alta", "noJuntar", "No juntar con", { value: draft.noJuntar, attrs: 'list="coord-dog-names" autocomplete="off"' })}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${selectField("alta", "plan", "Plan pedido", planOptions, { value: draft.plan, hint: "Precios oficiales en la tabla de planes." })}
          ${selectField("alta", "turno", "Turno", ["Pendiente de confirmar", "Mañana", "Tarde"], { value: draft.turno })}
          <div class="coord-field is-wide">
            <span class="coord-label" id="coord-alta-dias-label">Días pedidos</span>
            <div class="coord-days" role="group" aria-labelledby="coord-alta-dias-label">
              ${SERVICE_DAYS.map((day) => `
                <label class="coord-day"><input type="checkbox" name="dias" value="${day}" ${days.includes(day) ? "checked" : ""} /><span>${day}</span></label>
              `).join("")}
            </div>
          </div>
          <div class="coord-field">
            <span class="coord-label">Categoría</span>
            <p class="coord-fixed">${badge("SIN EVALUAR", "neutral")}</p>
          </div>
          <div class="coord-field">
            <span class="coord-label">Primer paseo</span>
            <p class="coord-fixed">${badge("Individual", "neutral")}</p>
          </div>
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
              <p class="coord-badges">${badge(esc(ficha.categoria || "SIN EVALUAR"), "neutral")} ${badge("Primer paseo individual", "warn")} ${ficha.estado === "borrador" ? badge("Borrador", "neutral") : ""}</p>
              <p>${esc(!a.tamano || a.tamano === PENDIENTE ? "Tamaño pendiente" : a.tamano)} · Plan: ${esc(!a.plan || a.plan === PENDIENTE ? "pendiente" : a.plan)} · Días: ${dias.length ? esc(daysLabel(dias).toLowerCase()) : "pendientes"} · Turno: ${esc(!a.turno || a.turno === PENDIENTE ? "pendiente" : a.turno.toLowerCase())}</p>
              ${a.bozal === "Sí" || a.noJuntar ? `<ul class="coord-safety">
                ${a.bozal === "Sí" ? `<li class="is-alert">${icon("alertTriangle", "coord-icon")}Usa bozal</li>` : ""}
                ${a.noJuntar ? `<li class="is-alert">${icon("alertTriangle", "coord-icon")}No juntar con ${esc(a.noJuntar)}</li>` : ""}
              </ul>` : ""}
              ${whoLine(ficha)}
              <div class="coord-actions">
                ${button("Copiar ficha", `data-coord-alta-copy="${esc(ficha.id)}"`, "ghost", "copy")}
                ${canDelete(ficha) ? button("Borrar", `data-coord-alta-delete="${esc(ficha.id)}"`, "ghost") : ""}
              </div>
            </li>
          `;
          }).join("")}
        </ul>
        <p class="coord-note">${icon("fileText", "coord-icon")}<span>Estas fichas todavía deben incorporarse al ${esc(BUSINESS_INFO.officialSources.dogs.toLowerCase())}.</span></p>
      ` : `<p class="coord-empty is-small">${loaded.has("fichas") ? "Todavía no hay perros nuevos cargados." : "Cargando fichas…"}</p>`}
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
    `Salud: vacunas al día: ${v(a.vacunas)}; carnet: ${v(a.carnet)}; veterinaria: ${v(a.veterinario)}; observaciones: ${v(a.salud)}.`,
    `Equipo: ${v(a.sujecion)}; bozal: ${v(a.bozal)}; correa propia: ${v(a.correa)}.`,
    a.relatoTutor ? `Lo que contó el tutor (no observado): ${a.relatoTutor.replace(/\n/g, "; ")}.` : "",
    `Con otros perros: ${v(a.conPerros)}. Con personas: ${v(a.conPersonas)}. Lo alteran: ${v(a.estimulos)}. No juntar con: ${a.noJuntar || "Sin indicación"}.`,
    `Servicio: ${v(a.plan)}; días: ${Array.isArray(a.dias) && a.dias.length ? a.dias.join(", ") : PENDIENTE}; turno: ${v(a.turno)}.`,
  ].filter(Boolean).join("\n");
}

// Días escritos por el tutor ("lunes, miércoles y viernes" o "lunes a viernes").
function parseDays(text) {
  const t = normalize(text);
  const names = SERVICE_DAYS.map(normalize);
  const range = /(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);
  if (range) {
    const from = names.indexOf(range[1]);
    const to = names.indexOf(range[2]);
    if (from >= 0 && to >= from) return SERVICE_DAYS.slice(from, to + 1);
  }
  return SERVICE_DAYS.filter((day, index) => t.includes(names[index]));
}

// Completa el formulario de alta con lo que dejó el tutor en el pedido web.
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

/* ---------- 5. Observaciones e incidentes recientes (solo lectura) ---------- */

function dogNameFor(record) {
  if (record.perroNombre) return record.perroNombre;
  const ids = Array.isArray(record.perros) ? record.perros : record.perroId ? [record.perroId] : [];
  const names = ids.map((id) => REAL_DOGS.find((dog) => dog.id === id)?.name || id);
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
    ? [
        ["Perro", dog],
        ["Lugar", record.lugar],
        ["Antes", record.antes],
        ["Conducta", record.conducta],
        ["Acción", record.accion],
        ["Después", record.despues],
        ["Lesiones", record.lesiones, record.lesiones && !/^no/i.test(record.lesiones) ? "alert" : ""],
        ["Protocolo", record.protocolo],
      ]
    : [
        ["Perro", dog],
        ["Lugar", record.lugar],
        ["Estímulo", record.estimulo],
        ["Reacción", record.reaccion],
        ["Acción", record.accion],
        ["Resultado", record.resultado],
      ];
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
  const incidentes = cached("incidentes").filter((r) => !r.fecha || r.fecha >= desde7()).sort(byMoment);
  const observaciones = cached("observaciones").filter((r) => !r.fecha || r.fecha >= desde7()).sort(byMoment);
  const loading = (col) => !loaded.has(col);

  const body = `
    <p class="coord-note">${icon("eye", "coord-icon")}<span>Solo lectura. Las cargan los paseadores y supervisión. Se muestran los últimos 7 días (desde el ${esc(fmtDate(desde7()))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${incidentes.length}</span></h3>
        ${incidentes.length
          ? `<ul class="coord-card-list">${incidentes.map((r) => ActivityItem(r, "incidente")).join("")}</ul>`
          : `<p class="coord-empty is-small">${loading("incidentes") ? "Cargando…" : "Sin incidentes en los últimos 7 días."}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${observaciones.length}</span></h3>
        ${observaciones.length
          ? `<ul class="coord-card-list">${observaciones.map((r) => ActivityItem(r, "observacion")).join("")}</ul>`
          : `<p class="coord-empty is-small">${loading("observaciones") ? "Cargando…" : "Sin observaciones en los últimos 7 días."}</p>`}
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

/* ---------- 6. Carga por día y turno ---------- */

function LoadSection() {
  const load = weeklyLoad();
  const today = todayName(argentinaNow());
  const max = Math.max(...load.map((row) => row.total), 1);
  const busiest = load.filter((row) => row.total === max).map((row) => row.day);
  const conflicts = weeklyConflicts();
  const doubleShift = ACTIVE_DOGS.filter((dog) => SERVICE_DAYS.some((day) => SHIFT_LABELS.every((shift) => goesOn(dog, day, shift)))).map((dog) => dog.name);
  const notCounted = REAL_DOGS.filter((dog) => dog.status !== "Activo").map((dog) => `${dog.name} (${dog.status.toLowerCase()})`);

  const body = `
    ${conflicts.length ? `
      <div class="coord-alert-box" role="note">
        <h3>${icon("alertTriangle", "coord-icon")}Perros que no se pueden juntar y comparten turno</h3>
        <ul>${conflicts.map((c) => `<li><b>${esc(c.pair)}</b> · ${esc(c.detail)}</li>`).join("")}</ul>
        <p>Según ${esc(BUSINESS_INFO.officialSources.routes)}. Revisá que no vayan en el mismo grupo.</p>
      </div>` : ""}
    <div class="coord-table-wrap">
      <table class="coord-table">
        <caption>Perros activos por día y turno (rutas del ${DATA_UPDATED}). Día con más carga: ${esc(listJoin(busiest.map((d) => d.toLowerCase())))}, ${max} paseos.</caption>
        <thead>
          <tr><th scope="col">Día</th><th scope="col">Mañana</th><th scope="col">Tarde</th><th scope="col">Total</th><th scope="col">Bozal</th></tr>
        </thead>
        <tbody>
          ${load.map((row) => `
            <tr class="${row.day === today ? "is-today" : ""} ${row.total === max ? "is-max" : ""}">
              <th scope="row"><span class="coord-day-name">${row.day}</span>${row.day === today ? '<span class="coord-tag">Hoy</span>' : ""}</th>
              <td>${row.manana}</td>
              <td>${row.tarde}</td>
              <td><span class="coord-total"><b>${row.total}</b><span class="coord-bar" aria-hidden="true"><i style="width:${Math.round((row.total / max) * 100)}%"></i></span></span></td>
              <td><span class="coord-cell-alerts">${row.muzzle.length}${row.conflicts ? `<span class="coord-tag is-alert">${icon("alertTriangle", "coord-icon")}${row.conflicts}<span class="coord-sr-only"> ${row.conflicts === 1 ? "cruce" : "cruces"} a revisar</span></span>` : ""}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
    <ul class="coord-notes">
      <li>Bozal: perros con bozal ese día. El ícono de alerta marca cuántos cruces de "no juntar" hay ese día.</li>
      <li>Domingo: sin rutas cargadas.</li>
      ${doubleShift.length ? `<li>${esc(listJoin(doubleShift))} ${doubleShift.length === 1 ? "sale" : "salen"} en los dos turnos el mismo día y cuenta${doubleShift.length === 1 ? "" : "n"} en ambos.</li>` : ""}
      ${notCounted.length ? `<li>No se cuentan: ${esc(listJoin(notCounted))}.</li>` : ""}
    </ul>
  `;

  return section({
    key: "carga",
    id: "coord-carga",
    iconName: "chart",
    title: "Carga por día y turno",
    intro: "Calculada con las rutas reales. Incluye bozales y cruces a revisar.",
    badges: conflicts.length ? badge(`${conflicts.length} ${conflicts.length === 1 ? "cruce" : "cruces"} a revisar`, "alert") : "",
    body,
  });
}

/* ---------- 7. Pagos (registro de apoyo compartido) ---------- */

function PaymentsSection() {
  const pagos = getPagos();
  const draft = getDraft("pago");
  const sinPasar = pagos.filter((p) => !p.pasadoAlLibro).length;
  const dogOptions = ["Elegí un perro", ...ACTIVE_DOGS.map((dog) => dog.name).sort((a, b) => a.localeCompare(b, "es")), "Otro (anotalo en la nota)"];

  const body = `
    <div class="coord-rule is-info" role="note">
      ${icon("fileText", "coord-icon")}
      <p><b>Fuente oficial:</b> el ${esc(BUSINESS_INFO.officialSources.money)} y la hoja Cobranza semanal. Esto es solo un registro de apoyo para no olvidarte de pasar un pago. No anotes alias ni datos bancarios: el detalle de pago se envía por WhatsApp.</p>
    </div>
    ${feedback("pagos")}
    <form class="coord-form" data-coord-form="pago" novalidate>
      <h3>Anotar un pago recibido</h3>
      <div class="coord-grid">
        ${selectField("pago", "perro", "Perro", dogOptions, { value: draft.perro, required: true })}
        ${field("pago", "monto", "Monto recibido", { value: draft.monto, required: true, attrs: 'inputmode="numeric" autocomplete="off"', hint: "El que figura en el comprobante. Solo números." })}
        ${selectField("pago", "medio", "Medio de pago", ["Transferencia", "Efectivo", "Otro"], { value: draft.medio })}
        ${field("pago", "fecha", "Fecha del pago", { value: draft.fecha || todayDMY(), placeholder: "DD/MM/AAAA", attrs: 'inputmode="numeric"', hint: "Formato DD/MM/AAAA." })}
        ${fileField("pago", "comprobante", "Comprobante", draft.comprobante, "Foto o PDF. Se guarda solo el nombre del archivo.")}
        ${field("pago", "nota", "Nota", { value: draft.nota, placeholder: "Opcional" })}
      </div>
      <div class="coord-actions">${button("Guardar registro", "data-coord-pago-save", "primary", "plus")}</div>
    </form>

    <div class="coord-subblock">
      <h3>Pagos anotados <span>${pagos.length}</span></h3>
      ${pagos.length ? `
        <ul class="coord-pay-list">
          ${pagos.map((pago) => `
            <li class="coord-pay ${pago.pasadoAlLibro ? "is-done" : ""}">
              <div class="coord-pay-main">
                <strong>${esc(pago.perroNombre || pago.concepto || PENDIENTE)}</strong>
                <span>${esc(Number.isFinite(Number(pago.monto)) && pago.monto !== "" ? formatPeso(pago.monto) : PENDIENTE)} · ${esc(pago.medio || PENDIENTE)} · ${esc(fmtDate(pago.fecha))}</span>
                ${pago.comprobante ? `<small>Comprobante: ${esc(pago.comprobante)}</small>` : `<small>Sin comprobante</small>`}
                ${pago.nota ? `<small>${esc(pago.nota)}</small>` : ""}
                ${whoLine(pago)}
              </div>
              ${pago.pasadoAlLibro ? badge("Pasado al Libro contable", "ok") : badge("Falta pasar al Libro contable", "warn")}
              <div class="coord-actions">
                ${button(pago.pasadoAlLibro ? "Marcar como no pasado" : "Ya lo pasé al Libro", `data-coord-pago-libro="${esc(pago.id)}"`, pago.pasadoAlLibro ? "ghost" : "secondary", pago.pasadoAlLibro ? "" : "checkCircle")}
                ${canDelete(pago) ? button("Borrar", `data-coord-pago-delete="${esc(pago.id)}"`, "ghost") : ""}
              </div>
            </li>
          `).join("")}
        </ul>
      ` : `<p class="coord-empty is-small">${loaded.has("pagos") ? "No hay pagos anotados." : "Cargando pagos…"}</p>`}
    </div>
  `;

  return section({
    key: "pagos",
    id: "coord-pagos",
    iconName: "wallet",
    title: "Pagos",
    intro: "Registro de apoyo compartido con Juan. La fuente oficial es el Libro contable.",
    badges: sinPasar ? badge(`${sinPasar} sin pasar al Libro`, "warn") : "",
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

function copyText(text) {
  try {
    const result = navigator.clipboard?.writeText(text);
    result?.catch?.(() => {});
  } catch {
    // Sin portapapeles: no hacemos nada.
  }
}

function findIn(list, id) {
  return list.find((item) => item.id === id);
}

function handleCoordinadorClick(event) {
  if (!event.target.closest(".coord-shell")) return false;

  // Abrir o cerrar una sección plegable: se recuerda en este dispositivo.
  const toggle = event.target.closest("[data-coord-toggle]");
  if (toggle) {
    const details = toggle.parentElement;
    setOpen(toggle.dataset.coordToggle, !details.open);
    return true;
  }

  const memToggle = event.target.closest("[data-coord-mem-toggle]");
  if (memToggle) {
    const key = memToggle.dataset.coordMemToggle;
    if (memToggle.parentElement.open) openCards.delete(key);
    else openCards.add(key);
    return true;
  }

  if (event.target.closest("[data-coord-retry]")) {
    retrySync();
    migrationDone = false;
    announce("Volviendo a pedir los datos.");
    return true;
  }

  const goto = event.target.closest("[data-coord-goto]");
  if (goto) {
    goTo(goto.dataset.coordGoto);
    return true;
  }

  const gotoDog = event.target.closest("[data-coord-goto-dog]");
  if (gotoDog) {
    const id = gotoDog.dataset.coordGotoDog;
    const indexInPending = pendingReview().findIndex((dog) => dog.id === id);
    if (indexInPending >= 4) {
      setOpen("datosMas", true);
      render();
    }
    goTo(`coord-dato-${id}`);
    return true;
  }

  const gotoPedido = event.target.closest("[data-coord-goto-pedido]");
  if (gotoPedido) {
    openAndGo("pedidos", `coord-pedido-${gotoPedido.dataset.coordGotoPedido}`);
    return true;
  }

  const openSection = event.target.closest("[data-coord-open]");
  if (openSection) {
    const key = openSection.dataset.coordOpen;
    const focus = key === "pedidos" && !getPedidos().length ? "#coord-pedido-tipo" : null;
    openAndGo(key, `coord-${key}`, focus);
    return true;
  }

  const undo = event.target.closest("[data-coord-undo]");
  if (undo) {
    const deleted = lastDeleted;
    lastDeleted = null;
    if (deleted) {
      const { pendiente, ...record } = deleted.record;
      run("undo", () => guardar(deleted.col, record, { section: deleted.section, ok: "Listo, se recuperó." }));
    }
    return true;
  }

  // Datos a confirmar
  const resolve = event.target.closest("[data-coord-resolve]");
  if (resolve) {
    const id = resolve.dataset.coordResolve;
    const dog = REAL_DOGS.find((d) => d.id === id);
    run(`resuelto-${id}`, async () => {
      const saved = await guardar("resueltos", { id, perroId: id, perroNombre: dog?.name || id, resuelto: true, nota: "" }, { section: "datos", ok: `${dog?.name || id}: marcado como resuelto.` });
      if (saved) goTo("coord-datos");
    });
    return true;
  }

  const unresolve = event.target.closest("[data-coord-unresolve]");
  if (unresolve) {
    const id = unresolve.dataset.coordUnresolve;
    const dog = REAL_DOGS.find((d) => d.id === id);
    run(`resuelto-${id}`, () => guardar("resueltos", { id, perroId: id, perroNombre: dog?.name || id, resuelto: false, nota: "" }, { section: "datos", ok: `${dog?.name || id}: volvió a pendientes.` }));
    return true;
  }

  // Pedidos
  if (event.target.closest("[data-coord-pedido-save]")) {
    const form = event.target.closest("[data-coord-form]");
    const values = serializeForm(form);
    saveDraft("pedido", values);
    if (!values.perro?.trim() && !values.detalle?.trim()) {
      setFlash("pedidos", "Escribí el perro o qué hay que resolver.", "error");
      render();
      goTo("coord-pedidos", "#coord-pedido-perro");
      return true;
    }
    const tipo = values.tipo || PEDIDO_TIPOS[0];
    const perro = values.perro?.trim() || "";
    run("pedido-save", async () => {
      const saved = await guardar("pedidos", {
        fecha: hoyAR(),
        tipo,
        estado: "nuevo",
        origen: "app",
        titulo: `${tipo}: ${perro || "sin perro indicado"}`,
        detalle: values.detalle?.trim() || "",
        datos: { perro, canal: values.canal || PEDIDO_CANALES[0] },
      }, { section: "pedidos", ok: `Pedido guardado en "Nuevo".` });
      if (saved) clearDraft("pedido");
    });
    return true;
  }

  const move = event.target.closest("[data-coord-pedido-move]");
  if (move) {
    const id = move.dataset.coordPedidoMove;
    const estado = move.dataset.estado;
    run(`pedido-${id}`, () => guardar("pedidos", { id, estado }, { section: "pedidos", ok: `Pedido movido a "${ESTADO_LABEL[estado]}".` }));
    return true;
  }

  const pedidoDelete = event.target.closest("[data-coord-pedido-delete]");
  if (pedidoDelete) {
    const pedido = findIn(getPedidos(), pedidoDelete.dataset.coordPedidoDelete);
    if (pedido) run(`pedido-${pedido.id}`, () => borrar("pedidos", pedido, { section: "pedidos", ok: "Pedido borrado." }));
    return true;
  }

  const pedidoFicha = event.target.closest("[data-coord-pedido-ficha]");
  if (pedidoFicha) {
    const pedido = findIn(getPedidos(), pedidoFicha.dataset.coordPedidoFicha);
    if (!pedido) return true;
    drafts.alta = draftFromPedido(pedido);
    setFlash("alta", `Formulario completado con el pedido de ${pedidoPerro(pedido) || "la web"}. Revisalo y guardalo.`);
    openAndGo("alta", "coord-alta", "#coord-alta-nombre");
    return true;
  }

  // Altas
  if (event.target.closest("[data-coord-alta-save]")) {
    const form = event.target.closest("[data-coord-form]");
    const values = serializeForm(form);
    saveDraft("alta", values);
    if (!values.nombre?.trim()) {
      setFlash("alta", "Falta el nombre del perro.", "error");
      render();
      goTo("coord-alta", "#coord-alta-nombre");
      return true;
    }
    const nombre = values.nombre.trim();
    const datos = { ...values, nombre, dias: Array.isArray(values.dias) ? values.dias : [], primerPaseo: "Individual" };
    run("alta-save", async () => {
      const saved = await guardar("fichas", { fecha: hoyAR(), perroNombre: nombre, datos, categoria: "SIN EVALUAR", estado: "lista" }, {
        section: "alta",
        ok: `Ficha de ${nombre} guardada. Arranca SIN EVALUAR y con primer paseo individual.`,
      });
      if (saved) {
        clearDraft("alta");
        goTo("coord-alta");
      }
    });
    return true;
  }

  if (event.target.closest("[data-coord-alta-clear]")) {
    clearDraft("alta");
    setFlash("alta", "Formulario vacío.");
    render();
    return true;
  }

  const altaCopy = event.target.closest("[data-coord-alta-copy]");
  if (altaCopy) {
    const ficha = findIn(getFichas(), altaCopy.dataset.coordAltaCopy);
    if (ficha) copyText(altaText(ficha));
    setFlash("alta", "Ficha copiada. Pegala en el registro maestro.");
    render();
    return true;
  }

  const altaDelete = event.target.closest("[data-coord-alta-delete]");
  if (altaDelete) {
    const ficha = findIn(getFichas(), altaDelete.dataset.coordAltaDelete);
    if (ficha) run(`ficha-${ficha.id}`, () => borrar("fichas", ficha, { section: "alta", ok: "Ficha borrada." }));
    return true;
  }

  // Pagos
  if (event.target.closest("[data-coord-pago-save]")) {
    const form = event.target.closest("[data-coord-form]");
    const values = serializeForm(form);
    saveDraft("pago", values);
    const digits = String(values.monto || "").replace(/[^\d]/g, "");
    const fecha = isoFromDMY(values.fecha || todayDMY());
    const error = !values.perro || values.perro === "Elegí un perro"
      ? ["Elegí el perro.", "#coord-pago-perro"]
      : !digits
        ? ["Falta el monto del comprobante.", "#coord-pago-monto"]
        : !fecha
          ? ["La fecha no es válida. Usá DD/MM/AAAA.", "#coord-pago-fecha"]
          : null;
    if (error) {
      setFlash("pagos", error[0], "error");
      render();
      goTo("coord-pagos", error[1]);
      return true;
    }
    run("pago-save", async () => {
      const saved = await guardar("pagos", {
        fecha,
        concepto: `Pago de ${values.perro}`,
        perroNombre: values.perro,
        monto: Number(digits),
        medio: values.medio || "Transferencia",
        comprobante: values.comprobante || "",
        nota: values.nota?.trim() || "",
        pasadoAlLibro: false,
      }, { section: "pagos", ok: `Pago de ${values.perro} anotado. Acordate de pasarlo al Libro contable.` });
      if (saved) clearDraft("pago");
    });
    return true;
  }

  const pagoLibro = event.target.closest("[data-coord-pago-libro]");
  if (pagoLibro) {
    const pago = findIn(getPagos(), pagoLibro.dataset.coordPagoLibro);
    if (!pago) return true;
    const now = !pago.pasadoAlLibro;
    run(`pago-${pago.id}`, () => guardar("pagos", { id: pago.id, pasadoAlLibro: now }, {
      section: "pagos",
      ok: now ? "Marcado como pasado al Libro contable." : "Marcado como pendiente de pasar al Libro.",
    }));
    return true;
  }

  const pagoDelete = event.target.closest("[data-coord-pago-delete]");
  if (pagoDelete) {
    const pago = findIn(getPagos(), pagoDelete.dataset.coordPagoDelete);
    if (pago) run(`pago-${pago.id}`, () => borrar("pagos", pago, { section: "pagos", ok: "Registro borrado." }));
    return true;
  }

  return false;
}

function handleCoordinadorChange(event) {
  const target = event.target;
  if (!target.closest?.(".coord-shell")) return false;

  const fileInput = target.closest("[data-coord-file]");
  if (fileInput) {
    const form = fileInput.dataset.coordFile;
    const file = fileInput.files?.[0];
    const formEl = fileInput.closest("[data-coord-form]");
    const values = formEl ? serializeForm(formEl) : getDraft(form);
    if (file) values[fileInput.dataset.coordFileField] = file.name;
    saveDraft(form, values);
    const nameEl = fileInput.parentElement.querySelector("[data-coord-file-name]");
    if (nameEl && file) nameEl.textContent = file.name;
    return true;
  }

  // Borrador en memoria: no se pierde lo escrito si la página se redibuja.
  const formEl = target.closest("[data-coord-form]");
  if (formEl) {
    saveDraft(formEl.dataset.coordForm, serializeForm(formEl));
    return true;
  }

  return false;
}

// Enter dentro de un formulario: guarda con el botón principal en vez de recargar la página.
function handleCoordinadorSubmit(event) {
  const form = event.target.closest?.(".coord-shell [data-coord-form]");
  if (!form) return;
  event.preventDefault();
  form.querySelector(".coord-btn.is-primary")?.click();
}

export function registerCoordinadorEvents() {
  clickHandlers.push(handleCoordinadorClick);
  changeHandlers.push(handleCoordinadorChange);
  document.addEventListener("submit", handleCoordinadorSubmit);
}
