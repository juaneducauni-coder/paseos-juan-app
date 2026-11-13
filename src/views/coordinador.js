// Vista del rol Coordinador: datos a confirmar, pedidos, altas, carga semanal y pagos de apoyo.
// Usa solo datos reales de src/data/realData.js. Lo que el coordinador carga en pantalla
// se guarda únicamente en este dispositivo (localStorage), nunca en el código.
import { getStore, saveStore } from "../store/paseosJuanStore.js";
import {
  PENDIENTE,
  DATA_UPDATED,
  BUSINESS_INFO,
  ROLE_OWNERS,
  REAL_DOGS,
  REAL_PLANS,
  WEEK_DAYS,
  dogsForShift,
  goesOn,
  todayName,
  formatPeso,
} from "../data/realData.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";

/* ------------------------------------------------------------------ */
/* Almacenamiento local (solo en este dispositivo)                     */
/* ------------------------------------------------------------------ */

const KEYS = {
  resueltos: "paseosJuan_coord_resueltos",
  pedidos: "paseosJuan_coord_pedidos",
  altas: "paseosJuan_coord_altas",
  pagos: "paseosJuan_coord_pagos",
  borradores: "paseosJuan_coord_borradores",
  secciones: "paseosJuan_coord_secciones",
};

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
    // Sin almacenamiento (modo privado): el cambio vale solo hasta recargar.
  }
}

// Mensaje de estado de la última acción (se muestra en la sección y se anuncia).
let flash = null;
// Último elemento borrado, para poder deshacer.
let lastDeleted = null;

function setFlash(section, text, tone = "ok") {
  flash = { section, text, tone };
  announce(text);
}

// Región aria-live persistente (fuera de #app, para que el lector de pantalla la anuncie).
function announce(text) {
  let live = document.getElementById("coord-live");
  if (!live) {
    live = document.createElement("div");
    live.id = "coord-live";
    live.className = "coord-sr-only";
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    document.body.appendChild(live);
  }
  live.textContent = "";
  window.setTimeout(() => {
    live.textContent = text;
  }, 40);
}

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function argentinaNow() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Argentina/Buenos_Aires" }));
}

function formatDate(date = argentinaNow()) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}

function newId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
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

function isOpen(key, fallback = false) {
  const state = readJSON(KEYS.secciones, {});
  return key in state ? Boolean(state[key]) : fallback;
}

function setOpen(key, value) {
  writeJSON(KEYS.secciones, { ...readJSON(KEYS.secciones, {}), [key]: value });
}

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

/* ------------------------------------------------------------------ */
/* Estado local                                                        */
/* ------------------------------------------------------------------ */

function getResolved() {
  return readJSON(KEYS.resueltos, {});
}

function pendingReview() {
  const resolved = getResolved();
  return REVIEW_DOGS.filter((dog) => !resolved[dog.id]);
}

function getPedidos() {
  return readJSON(KEYS.pedidos, []);
}

function getAltas() {
  return readJSON(KEYS.altas, []);
}

function getPagos() {
  return readJSON(KEYS.pagos, []);
}

function getDraft(form) {
  return readJSON(KEYS.borradores, {})[form] || {};
}

function saveDraft(form, values) {
  writeJSON(KEYS.borradores, { ...readJSON(KEYS.borradores, {}), [form]: values });
}

function clearDraft(form) {
  const drafts = readJSON(KEYS.borradores, {});
  delete drafts[form];
  writeJSON(KEYS.borradores, drafts);
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

function textArea(form, name, label, { value = "", placeholder = "", hint = "", span = true } = {}) {
  const id = `coord-${form}-${name}`;
  return `
    <div class="coord-field ${span ? "is-wide" : ""}">
      <label for="${id}">${label}</label>
      <textarea id="${id}" name="${name}" rows="3" ${placeholder ? `placeholder="${esc(placeholder)}"` : ""} ${hint ? `aria-describedby="${id}-hint"` : ""}>${esc(value)}</textarea>
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
        <button class="coord-btn is-ghost is-compact" type="button" data-coordinator-logout>
          ${icon("logOut", "coord-icon")}<span>Salir</span>
        </button>
      </div>
    </header>
  `;
}

export function coordinatorDashboard() {
  const content = `
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${TodayPanel()}
      ${ReviewSection()}
      ${RequestsSection()}
      ${IntakeSection()}
      ${LoadSection()}
      ${PaymentsSection()}
      <p class="coord-footnote">
        Datos actualizados al ${DATA_UPDATED}. Fuentes: ${esc(BUSINESS_INFO.officialSources.dogs)} y ${esc(BUSINESS_INFO.officialSources.routes)}.
        Lo que cargás en esta página queda guardado solo en este dispositivo.
      </p>
    </main>
  `;
  // El mensaje de estado se muestra una sola vez.
  flash = null;
  return content;
}

/* ---------- 1. Lo urgente de hoy ---------- */

function TodayPanel() {
  const now = argentinaNow();
  const today = todayName(now);
  const pending = pendingReview();
  const pedidos = getPedidos();
  const openPedidos = pedidos.filter((p) => p.estado !== "resuelto");
  const nuevos = pedidos.filter((p) => p.estado === "nuevo").length;
  const manana = activeForShift(today, "Mañana");
  const tarde = activeForShift(today, "Tarde");
  const muzzleToday = [...new Set([...manana, ...tarde].filter(hasMuzzle).map((dog) => dog.name))];
  const conflictsToday = [
    ...conflictsFor(today, "Mañana").map((pair) => `${pair} (mañana)`),
    ...conflictsFor(today, "Tarde").map((pair) => `${pair} (tarde)`),
  ];
  const noService = manana.length + tarde.length === 0;
  const owner = ROLE_OWNERS.coordinador;

  let next;
  if (pending.length) {
    const dog = pending[0];
    next = {
      text: `Confirmá el dato de <b>${esc(dog.name)}</b>: ${esc(dog.review || `estado "${dog.status}"`)}`,
      action: button(`Ir a ${esc(dog.name)}`, `data-coord-goto-dog="${dog.id}"`, "primary", "arrowRight"),
    };
  } else if (openPedidos.length) {
    next = {
      text: `Avanzá con el pedido más viejo: <b>${esc(openPedidos[openPedidos.length - 1].tipo)}</b>.`,
      action: button("Ver pedidos", `data-coord-open="pedidos"`, "primary", "arrowRight"),
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
        <p class="coord-kicker">${today} ${formatDate(now)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
        <p class="coord-owner">A cargo: ${esc(owner)} <span>(${PENDIENTE.toLowerCase()})</span></p>
      </div>

      <ol class="coord-priorities">
        <li class="coord-priority ${pending.length ? "is-warn" : "is-ok"}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Datos a confirmar</h2>
            <p class="coord-big"><b>${pending.length}</b> <span>de ${REVIEW_DOGS.length} perros</span></p>
            <p>${pending.length ? "Diferencias entre planillas o perros sin ruta." : "Todo confirmado en este dispositivo."}</p>
          </div>
          ${button("Ver la lista", `data-coord-goto="coord-datos"`, "secondary")}
        </li>
        <li class="coord-priority ${nuevos ? "is-warn" : ""}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Pedidos abiertos</h2>
            <p class="coord-big"><b>${openPedidos.length}</b> <span>${nuevos ? `${nuevos} sin empezar` : "pedidos"}</span></p>
            <p>${pedidos.length ? "Consultas, evaluaciones y avisos de clientes." : "Todavía no cargaste pedidos."}</p>
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

function ReviewCard(dog, resolvedOn) {
  return `
    <li class="coord-review ${resolvedOn ? "is-resolved" : ""}" id="coord-dato-${dog.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${esc(dog.name)} <small>${dog.id}</small></h3>
        ${dog.status !== "Activo" ? badge(esc(dog.status), "alert") : badge("Activo", "neutral")}
      </div>
      <p class="coord-review-meta">${esc(dog.plan)} · ${esc(dog.size)} · ${esc(scheduleLabel(dog))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${esc(dog.review || `Estado "${dog.status}".`)}</p>
      ${safetyChips(dog)}
      <div class="coord-actions">
        ${resolvedOn
          ? `<p class="coord-done">${icon("checkCircle", "coord-icon")}Resuelto el ${esc(resolvedOn)}</p>${button("Deshacer", `data-coord-unresolve="${dog.id}"`, "ghost")}`
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
        : `<p class="coord-empty">${icon("checkCircle", "coord-icon")}No quedan datos por confirmar en este dispositivo.</p>`}
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
      <p class="coord-note">${icon("fileText", "coord-icon")}<span>Marcar como resuelto queda solo en este dispositivo. El cambio todavía debe incorporarse al ${esc(BUSINESS_INFO.officialSources.dogs.toLowerCase())}.</span></p>
    </section>
  `;
}

/* ---------- 3. Pedidos de clientes y evaluaciones ---------- */

const PEDIDO_TIPOS = ["Consulta", "Evaluación inicial", "Documentación", "Cambio de días o plan", "Ausencia", "Otro"];
const PEDIDO_CANALES = ["WhatsApp", "Llamada", "En persona", "Otro"];
const PEDIDO_COLUMNAS = [
  ["nuevo", "Nuevo"],
  ["curso", "En curso"],
  ["resuelto", "Resuelto"],
];

function PedidoCard(pedido) {
  const actions = {
    nuevo: button("Empezar", `data-coord-pedido-move="${pedido.id}:curso"`, "secondary") + button("Resolver", `data-coord-pedido-move="${pedido.id}:resuelto"`, "secondary"),
    curso: button("Resolver", `data-coord-pedido-move="${pedido.id}:resuelto"`, "primary") + button("Volver a nuevo", `data-coord-pedido-move="${pedido.id}:nuevo"`, "ghost"),
    resuelto: button("Reabrir", `data-coord-pedido-move="${pedido.id}:curso"`, "secondary") + button("Borrar", `data-coord-pedido-delete="${pedido.id}"`, "ghost"),
  }[pedido.estado];
  const canNotify = pedido.tipo === "Evaluación inicial" && pedido.estado !== "resuelto";

  return `
    <li class="coord-card">
      <div class="coord-card-head">
        <strong>${esc(pedido.tipo)}</strong>
        <small>${esc(pedido.fecha)} · ${esc(pedido.canal)}</small>
      </div>
      <p class="coord-card-dog">${icon("pawPrint", "coord-icon")}${esc(pedido.perro || PENDIENTE)}</p>
      ${pedido.detalle ? `<p>${esc(pedido.detalle)}</p>` : ""}
      ${pedido.supervisor ? `<p class="coord-done">${icon("checkCircle", "coord-icon")}Supervisor avisado</p>` : ""}
      <div class="coord-actions">
        ${actions}
        ${canNotify && !pedido.supervisor ? button("Avisar al supervisor", `data-coord-pedido-supervisor="${pedido.id}"`, "ghost", "send") : ""}
      </div>
    </li>
  `;
}

function RequestsSection() {
  const pedidos = getPedidos();
  const draft = getDraft("pedido");
  const open = pedidos.filter((p) => p.estado !== "resuelto").length;
  const dogNames = REAL_DOGS.map((dog) => dog.name);

  const body = `
    ${feedback("pedidos")}
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido</h3>
      <div class="coord-grid">
        ${selectField("pedido", "tipo", "Tipo de pedido", PEDIDO_TIPOS, { value: draft.tipo })}
        ${field("pedido", "perro", "Perro", { value: draft.perro, placeholder: "Nombre del perro o «perro nuevo»", attrs: 'list="coord-dog-names" autocomplete="off"' })}
        ${selectField("pedido", "canal", "Llegó por", PEDIDO_CANALES, { value: draft.canal })}
        ${textArea("pedido", "detalle", "Qué hay que resolver", { value: draft.detalle, hint: "Sin teléfonos ni domicilios: solo lo necesario para resolverlo." })}
      </div>
      <datalist id="coord-dog-names">${dogNames.map((name) => `<option value="${esc(name)}"></option>`).join("")}</datalist>
      <div class="coord-actions">${button("Guardar pedido", "data-coord-pedido-save", "primary", "plus")}</div>
    </form>

    <div class="coord-board">
      ${PEDIDO_COLUMNAS.map(([estado, label]) => {
        const items = pedidos.filter((p) => p.estado === estado);
        return `
          <section class="coord-column" aria-labelledby="coord-col-${estado}">
            <h3 id="coord-col-${estado}">${label} <span>${items.length}</span></h3>
            ${items.length
              ? `<ul class="coord-card-list">${items.map(PedidoCard).join("")}</ul>`
              : `<p class="coord-empty is-small">${estado === "nuevo" ? "Sin pedidos nuevos." : estado === "curso" ? "Nada en curso." : "Todavía no hay resueltos."}</p>`}
          </section>
        `;
      }).join("")}
    </div>
  `;

  return section({
    key: "pedidos",
    id: "coord-pedidos",
    iconName: "clipboardCheck",
    title: "Pedidos y evaluaciones",
    intro: "Consultas de clientes, evaluaciones iniciales y avisos.",
    badges: open ? badge(`${open} abiertos`, "warn") : badge("Sin pedidos abiertos", "neutral"),
    body,
  });
}

/* ---------- 4. Alta de perro nuevo ---------- */

const SI_NO = ["Pendiente de confirmar", "Sí", "No"];

function IntakeSection() {
  const draft = getDraft("alta");
  const altas = getAltas();
  const days = Array.isArray(draft.dias) ? draft.dias : [];
  const planOptions = ["Pendiente de confirmar", ...REAL_PLANS.map((plan) => `${plan.name} (${plan.walks} paseos por semana)`), "Paseo suelto"];

  const body = `
    <div class="coord-rule" role="note">
      ${icon("shieldCheck", "coord-icon")}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${feedback("alta")}
    <form class="coord-form" data-coord-form="alta" novalidate>
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
        <p class="coord-fieldset-note">Se guarda solo en este dispositivo.</p>
        <div class="coord-grid">
          ${field("alta", "tutor", "Nombre del tutor", { value: draft.tutor, attrs: 'autocomplete="off"' })}
          ${field("alta", "contacto", "Contacto del tutor", { value: draft.contacto, type: "tel", attrs: 'autocomplete="off"' })}
          ${field("alta", "emergencia", "Contacto de emergencia", { value: draft.emergencia, attrs: 'autocomplete="off"' })}
          ${selectField("alta", "zona", "Zona", ["Pendiente de confirmar", "Pilar", "La Lonja", "Otra zona"], { value: draft.zona })}
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
      <h3>Altas cargadas en este dispositivo <span>${altas.length}</span></h3>
      ${altas.length ? `
        <ul class="coord-card-list is-grid">
          ${altas.map((alta) => `
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${esc(alta.nombre)}</strong>
                <small>Alta ${esc(alta.fecha)}</small>
              </div>
              <p class="coord-badges">${badge("SIN EVALUAR", "neutral")} ${badge("Primer paseo individual", "warn")}</p>
              <p>${esc(alta.tamano === PENDIENTE ? "Tamaño pendiente" : alta.tamano)} · Plan: ${esc(alta.plan === PENDIENTE ? "pendiente" : alta.plan)} · Días: ${alta.dias?.length ? esc(daysLabel(alta.dias).toLowerCase()) : "pendientes"} · Turno: ${esc(alta.turno === PENDIENTE ? "pendiente" : alta.turno.toLowerCase())}</p>
              ${alta.bozal === "Sí" || alta.noJuntar ? `<ul class="coord-safety">
                ${alta.bozal === "Sí" ? `<li class="is-alert">${icon("alertTriangle", "coord-icon")}Usa bozal</li>` : ""}
                ${alta.noJuntar ? `<li class="is-alert">${icon("alertTriangle", "coord-icon")}No juntar con ${esc(alta.noJuntar)}</li>` : ""}
              </ul>` : ""}
              ${alta.supervisor ? `<p class="coord-done">${icon("checkCircle", "coord-icon")}Supervisor avisado para el primer paseo</p>` : ""}
              <div class="coord-actions">
                ${alta.supervisor ? "" : button("Avisar al supervisor", `data-coord-alta-supervisor="${alta.id}"`, "secondary", "send")}
                ${button("Copiar ficha", `data-coord-alta-copy="${alta.id}"`, "ghost", "copy")}
                ${button("Borrar", `data-coord-alta-delete="${alta.id}"`, "ghost")}
              </div>
            </li>
          `).join("")}
        </ul>
        <p class="coord-note">${icon("fileText", "coord-icon")}<span>Estas fichas todavía deben incorporarse al ${esc(BUSINESS_INFO.officialSources.dogs.toLowerCase())}.</span></p>
      ` : `<p class="coord-empty is-small">Todavía no cargaste perros nuevos.</p>`}
    </div>
  `;

  return section({
    key: "alta",
    id: "coord-alta",
    iconName: "userPlus",
    title: "Alta de perro nuevo",
    intro: "Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.",
    badges: altas.length ? badge(`${altas.length} ${altas.length === 1 ? "cargada" : "cargadas"}`, "neutral") : "",
    body,
  });
}

function altaText(alta) {
  return [
    `Ficha de alta: ${alta.nombre} (cargada el ${alta.fecha})`,
    `Categoría: SIN EVALUAR. Primer paseo: individual.`,
    `Identificación: ${alta.tamano}; raza o cruza: ${alta.raza || PENDIENTE}; edad: ${alta.edad || PENDIENTE}; sexo: ${alta.sexo}; castrado/a: ${alta.castrado}.`,
    `Tutor: ${alta.tutor || PENDIENTE}; contacto: ${alta.contacto || PENDIENTE}; emergencia: ${alta.emergencia || PENDIENTE}; zona: ${alta.zona}.`,
    `Salud: vacunas al día: ${alta.vacunas}; carnet: ${alta.carnet || PENDIENTE}; veterinaria: ${alta.veterinario || PENDIENTE}; observaciones: ${alta.salud || PENDIENTE}.`,
    `Equipo: ${alta.sujecion}; bozal: ${alta.bozal}; correa propia: ${alta.correa}.`,
    `Con otros perros: ${alta.conPerros || PENDIENTE}. Con personas: ${alta.conPersonas || PENDIENTE}. Lo alteran: ${alta.estimulos || PENDIENTE}. No juntar con: ${alta.noJuntar || "Sin indicación"}.`,
    `Servicio: ${alta.plan}; días: ${alta.dias?.length ? alta.dias.join(", ") : PENDIENTE}; turno: ${alta.turno}.`,
  ].join("\n");
}

/* ---------- 5. Carga por día y turno ---------- */

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

/* ---------- 6. Pagos (registro local de apoyo) ---------- */

function PaymentsSection() {
  const pagos = getPagos();
  const draft = getDraft("pago");
  const sinPasar = pagos.filter((p) => !p.enLibro).length;
  const dogOptions = ["Elegí un perro", ...ACTIVE_DOGS.map((dog) => dog.name).sort((a, b) => a.localeCompare(b, "es")), "Otro (anotalo en la nota)"];

  const body = `
    <div class="coord-rule is-info" role="note">
      ${icon("fileText", "coord-icon")}
      <p><b>Fuente oficial:</b> el ${esc(BUSINESS_INFO.officialSources.money)} y la hoja Cobranza semanal. Acá no hay montos ni alias: esto es solo un registro de apoyo para no olvidarte de pasar un pago. El alias y el detalle de pago se envían por WhatsApp.</p>
    </div>
    ${feedback("pagos")}
    <form class="coord-form" data-coord-form="pago" novalidate>
      <h3>Anotar un pago recibido</h3>
      <div class="coord-grid">
        ${selectField("pago", "perro", "Perro", dogOptions, { value: draft.perro, required: true })}
        ${field("pago", "monto", "Monto recibido", { value: draft.monto, required: true, attrs: 'inputmode="numeric" autocomplete="off"', hint: "El que figura en el comprobante. Solo números." })}
        ${selectField("pago", "medio", "Medio de pago", ["Transferencia", "Efectivo", "Otro"], { value: draft.medio })}
        ${field("pago", "fecha", "Fecha del pago", { value: draft.fecha || formatDate(), placeholder: "DD/MM/AAAA", attrs: 'inputmode="numeric"' })}
        ${fileField("pago", "comprobante", "Comprobante", draft.comprobante, "Foto o PDF. Se guarda solo el nombre del archivo.")}
        ${field("pago", "nota", "Nota", { value: draft.nota, placeholder: "Opcional" })}
      </div>
      <div class="coord-actions">${button("Guardar registro", "data-coord-pago-save", "primary", "plus")}</div>
    </form>

    <div class="coord-subblock">
      <h3>Registros en este dispositivo <span>${pagos.length}</span></h3>
      ${pagos.length ? `
        <ul class="coord-pay-list">
          ${pagos.map((pago) => `
            <li class="coord-pay ${pago.enLibro ? "is-done" : ""}">
              <div class="coord-pay-main">
                <strong>${esc(pago.perro)}</strong>
                <span>${esc(pago.montoTexto)} · ${esc(pago.medio)} · ${esc(pago.fecha)}</span>
                ${pago.comprobante ? `<small>Comprobante: ${esc(pago.comprobante)}</small>` : `<small>Sin comprobante</small>`}
                ${pago.nota ? `<small>${esc(pago.nota)}</small>` : ""}
              </div>
              ${pago.enLibro ? badge("Pasado al Libro contable", "ok") : badge("Falta pasar al Libro contable", "warn")}
              <div class="coord-actions">
                ${button(pago.enLibro ? "Marcar como no pasado" : "Ya lo pasé al Libro", `data-coord-pago-libro="${pago.id}"`, pago.enLibro ? "ghost" : "secondary", pago.enLibro ? "" : "checkCircle")}
                ${button("Borrar", `data-coord-pago-delete="${pago.id}"`, "ghost")}
              </div>
            </li>
          `).join("")}
        </ul>
      ` : `<p class="coord-empty is-small">No hay pagos anotados en este dispositivo.</p>`}
    </div>
  `;

  return section({
    key: "pagos",
    id: "coord-pagos",
    iconName: "wallet",
    title: "Pagos",
    intro: "Registro de apoyo. La fuente oficial es el Libro contable.",
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

function updateList(key, list) {
  writeJSON(key, list);
}

function removeWithUndo(key, id, section, text) {
  const list = readJSON(key, []);
  const index = list.findIndex((item) => item.id === id);
  if (index < 0) return;
  lastDeleted = { key, item: list[index], index, section };
  list.splice(index, 1);
  updateList(key, list);
  setFlash(section, text);
  flash.undo = true;
}

function notifySupervisor(dogName, type, description) {
  const store = getStore();
  store.alerts = [
    { id: `alert-${Date.now()}`, dog: dogName, type, level: "Medio", description },
    ...(store.alerts || []),
  ];
  // saveStore dispara el evento que vuelve a dibujar la página.
  saveStore(store);
}

function copyText(text) {
  try {
    const result = navigator.clipboard?.writeText(text);
    result?.catch?.(() => {});
  } catch {
    // Sin portapapeles: no hacemos nada.
  }
}

function handleCoordinadorClick(event) {
  if (!event.target.closest(".coord-shell")) return false;

  const logout = event.target.closest("[data-coordinator-logout]");
  if (logout) {
    navigate("/login");
    return true;
  }

  // Abrir o cerrar una sección plegable: se recuerda en este dispositivo.
  const toggle = event.target.closest("[data-coord-toggle]");
  if (toggle) {
    const details = toggle.parentElement;
    setOpen(toggle.dataset.coordToggle, !details.open);
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

  const openSection = event.target.closest("[data-coord-open]");
  if (openSection) {
    const key = openSection.dataset.coordOpen;
    const focus = key === "pedidos" && !getPedidos().length ? "#coord-pedido-tipo" : null;
    openAndGo(key, `coord-${key}`, focus);
    return true;
  }

  const undo = event.target.closest("[data-coord-undo]");
  if (undo) {
    if (lastDeleted) {
      const list = readJSON(lastDeleted.key, []);
      list.splice(lastDeleted.index, 0, lastDeleted.item);
      updateList(lastDeleted.key, list);
      setFlash(lastDeleted.section, "Listo, se recuperó.");
      lastDeleted = null;
    }
    render();
    return true;
  }

  // Datos a confirmar
  const resolve = event.target.closest("[data-coord-resolve]");
  if (resolve) {
    const id = resolve.dataset.coordResolve;
    const dog = REAL_DOGS.find((d) => d.id === id);
    writeJSON(KEYS.resueltos, { ...getResolved(), [id]: formatDate() });
    setFlash("datos", `${dog?.name || id}: marcado como resuelto.`);
    flash.undo = false;
    lastDeleted = null;
    render();
    goTo("coord-datos");
    return true;
  }

  const unresolve = event.target.closest("[data-coord-unresolve]");
  if (unresolve) {
    const id = unresolve.dataset.coordUnresolve;
    const resolved = getResolved();
    delete resolved[id];
    writeJSON(KEYS.resueltos, resolved);
    const dog = REAL_DOGS.find((d) => d.id === id);
    setFlash("datos", `${dog?.name || id}: volvió a pendientes.`);
    render();
    return true;
  }

  // Pedidos
  if (event.target.closest("[data-coord-pedido-save]")) {
    const form = event.target.closest("[data-coord-form]");
    const values = serializeForm(form);
    if (!values.perro?.trim() && !values.detalle?.trim()) {
      saveDraft("pedido", values);
      setFlash("pedidos", "Escribí el perro o qué hay que resolver.", "error");
      render();
      goTo("coord-pedidos", "#coord-pedido-perro");
      return true;
    }
    const pedido = {
      id: newId("pedido"),
      tipo: values.tipo || PEDIDO_TIPOS[0],
      perro: values.perro?.trim() || "",
      canal: values.canal || PEDIDO_CANALES[0],
      detalle: values.detalle?.trim() || "",
      estado: "nuevo",
      fecha: formatDate(),
    };
    updateList(KEYS.pedidos, [pedido, ...getPedidos()]);
    clearDraft("pedido");
    setFlash("pedidos", `Pedido guardado en "Nuevo".`);
    render();
    return true;
  }

  const move = event.target.closest("[data-coord-pedido-move]");
  if (move) {
    const [id, estado] = move.dataset.coordPedidoMove.split(":");
    const labels = { nuevo: "Nuevo", curso: "En curso", resuelto: "Resuelto" };
    updateList(KEYS.pedidos, getPedidos().map((p) => (p.id === id ? { ...p, estado } : p)));
    setFlash("pedidos", `Pedido movido a "${labels[estado]}".`);
    render();
    return true;
  }

  const pedidoDelete = event.target.closest("[data-coord-pedido-delete]");
  if (pedidoDelete) {
    removeWithUndo(KEYS.pedidos, pedidoDelete.dataset.coordPedidoDelete, "pedidos", "Pedido borrado.");
    render();
    return true;
  }

  const pedidoSupervisor = event.target.closest("[data-coord-pedido-supervisor]");
  if (pedidoSupervisor) {
    const id = pedidoSupervisor.dataset.coordPedidoSupervisor;
    const pedido = getPedidos().find((p) => p.id === id);
    if (!pedido) return true;
    updateList(KEYS.pedidos, getPedidos().map((p) => (p.id === id ? { ...p, supervisor: true, estado: p.estado === "nuevo" ? "curso" : p.estado } : p)));
    setFlash("pedidos", "Supervisor avisado. El pedido pasó a «En curso».");
    notifySupervisor(pedido.perro || "Perro nuevo", "Evaluación inicial", "Pedido de evaluación derivado por coordinación. Primer paseo individual.");
    return true;
  }

  // Altas
  if (event.target.closest("[data-coord-alta-save]")) {
    const form = event.target.closest("[data-coord-form]");
    const values = serializeForm(form);
    if (!values.nombre?.trim()) {
      saveDraft("alta", values);
      setFlash("alta", "Falta el nombre del perro.", "error");
      render();
      goTo("coord-alta", "#coord-alta-nombre");
      return true;
    }
    const alta = {
      ...values,
      id: newId("alta"),
      nombre: values.nombre.trim(),
      dias: Array.isArray(values.dias) ? values.dias : [],
      categoria: "SIN EVALUAR",
      primerPaseo: "Individual",
      fecha: formatDate(),
    };
    updateList(KEYS.altas, [alta, ...getAltas()]);
    clearDraft("alta");
    setFlash("alta", `Ficha de ${alta.nombre} guardada en este dispositivo. Arranca SIN EVALUAR y con primer paseo individual.`);
    render();
    goTo("coord-alta");
    return true;
  }

  if (event.target.closest("[data-coord-alta-clear]")) {
    clearDraft("alta");
    setFlash("alta", "Formulario vacío.");
    render();
    return true;
  }

  const altaSupervisor = event.target.closest("[data-coord-alta-supervisor]");
  if (altaSupervisor) {
    const id = altaSupervisor.dataset.coordAltaSupervisor;
    const alta = getAltas().find((a) => a.id === id);
    if (!alta) return true;
    updateList(KEYS.altas, getAltas().map((a) => (a.id === id ? { ...a, supervisor: true } : a)));
    setFlash("alta", `Supervisor avisado: ${alta.nombre} necesita su primer paseo individual.`);
    notifySupervisor(alta.nombre, "Perro nuevo", "Alta nueva: SIN EVALUAR. Coordinar primer paseo individual.");
    return true;
  }

  const altaCopy = event.target.closest("[data-coord-alta-copy]");
  if (altaCopy) {
    const alta = getAltas().find((a) => a.id === altaCopy.dataset.coordAltaCopy);
    if (alta) copyText(altaText(alta));
    setFlash("alta", "Ficha copiada. Pegala en el registro maestro.");
    render();
    return true;
  }

  const altaDelete = event.target.closest("[data-coord-alta-delete]");
  if (altaDelete) {
    removeWithUndo(KEYS.altas, altaDelete.dataset.coordAltaDelete, "alta", "Ficha borrada de este dispositivo.");
    render();
    return true;
  }

  // Pagos
  if (event.target.closest("[data-coord-pago-save]")) {
    const form = event.target.closest("[data-coord-form]");
    const values = serializeForm(form);
    const digits = String(values.monto || "").replace(/[^\d]/g, "");
    if (!values.perro || values.perro === "Elegí un perro" || !digits) {
      saveDraft("pago", values);
      setFlash("pagos", !digits ? "Falta el monto del comprobante." : "Elegí el perro.", "error");
      render();
      goTo("coord-pagos", !digits ? "#coord-pago-monto" : "#coord-pago-perro");
      return true;
    }
    const pago = {
      id: newId("pago"),
      perro: values.perro,
      montoTexto: formatPeso(Number(digits)),
      medio: values.medio || "Transferencia",
      fecha: values.fecha?.trim() || formatDate(),
      comprobante: values.comprobante || "",
      nota: values.nota?.trim() || "",
      enLibro: false,
    };
    updateList(KEYS.pagos, [pago, ...getPagos()]);
    clearDraft("pago");
    setFlash("pagos", `Pago de ${pago.perro} anotado. Acordate de pasarlo al Libro contable.`);
    render();
    return true;
  }

  const pagoLibro = event.target.closest("[data-coord-pago-libro]");
  if (pagoLibro) {
    const id = pagoLibro.dataset.coordPagoLibro;
    let now = false;
    updateList(KEYS.pagos, getPagos().map((p) => {
      if (p.id !== id) return p;
      now = !p.enLibro;
      return { ...p, enLibro: now };
    }));
    setFlash("pagos", now ? "Marcado como pasado al Libro contable." : "Marcado como pendiente de pasar al Libro.");
    render();
    return true;
  }

  const pagoDelete = event.target.closest("[data-coord-pago-delete]");
  if (pagoDelete) {
    removeWithUndo(KEYS.pagos, pagoDelete.dataset.coordPagoDelete, "pagos", "Registro borrado.");
    render();
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

  // Borrador: se guarda en el dispositivo para no perder lo escrito si la página se redibuja.
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
