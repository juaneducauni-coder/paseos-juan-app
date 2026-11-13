// Vista del rol Paseador (Sebastián).
// Pensada para usar en la calle: celular en una mano, correas en la otra, al sol.
// Lo urgente primero, botones grandes, textos cortos.
//
// Datos: src/data/realData.js (planilla RPJ, BASE RUTAS e Inventario de equipamiento).
// Lo que Sebastián marca (progreso, equipo, borrador de incidente) se guarda solo en
// este dispositivo (localStorage). No hay datos de tutores en esta página.
import {
  REAL_DOGS,
  dogsForShift,
  todayName,
  EQUIPMENT,
  INCIDENT_PROTOCOL,
  SHIFTS,
  WEEK_DAYS,
  CATEGORIES,
  BUSINESS_INFO,
  DATA_UPDATED,
} from "../data/realData.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";

const TZ = "America/Argentina/Buenos_Aires";
const WALKER = "Sebastián";
const PROGRESS_KEY = "paseosJuan_paseador_progreso";
const EQUIP_KEY = "paseosJuan_paseador_equipo";
const INCIDENT_KEY = "paseosJuan_paseador_incidente";

const STEPS = [
  { label: "Retiro", action: "Marcar retirado", done: "Retirado" },
  { label: "Paseo", action: "Marcar paseado", done: "Paseado" },
  { label: "Entrega", action: "Marcar entregado", done: "Entregado" },
];

const SHIFT_BY_LABEL = { Mañana: SHIFTS.manana, Tarde: SHIFTS.tarde };

const RISK_LEVELS = ["Bajo", "Medio", "Alto"];
const INJURY_OPTIONS = ["No se ven", "Sí", "No sé"];
const EXTERNAL_DOG = "Perro externo";
const FORBIDDEN_WORDS = /\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i;

// Estado de la pantalla (no se guarda: al recargar vuelve a hoy y al turno actual).
const view = {
  day: null,
  shift: null,
  pickerOpen: false,
  confirmClear: false,
  previewOpen: false,
  incidentStatus: "",
  equipStatus: "",
};

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

// Turno según la hora: mañana hasta las 13:30, después tarde.
function shiftByClock(now) {
  return now.minutes < 13 * 60 + 30 ? "Mañana" : "Tarde";
}

function selection() {
  const now = nowAR();
  const day = view.day || now.day;
  const shift = view.shift || shiftByClock(now);
  return { now, day, shift, isToday: day === now.day };
}

function listNames(names) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

function shiftHours(shift) {
  const data = SHIFT_BY_LABEL[shift];
  return `${data.from} a ${data.to}`;
}

function shiftRoutes(shift) {
  const data = SHIFT_BY_LABEL[shift];
  const routes = data.routes || [data.route];
  return routes.length > 1 ? `Rutas ${listNames(routes)}` : `Ruta ${routes[0]}`;
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

const MY_EQUIPMENT = EQUIPMENT.filter((row) => row.sebastian > 0);
const OTHER_EQUIPMENT = EQUIPMENT.filter((row) => row.sebastian === 0 && row.juan > 0);
const MY_MUZZLES = EQUIPMENT.filter((row) => /^bozal/i.test(row.item)).reduce((sum, row) => sum + row.sebastian, 0);

// ---------- datos guardados en el dispositivo ----------

function slotKey(iso, shift) {
  return `${iso}|${shift}`;
}

// Guarda solo lo de hoy: lo de días anteriores se descarta para no acumular.
function saveForToday(storageKey, iso, slot, value) {
  const all = readJSON(storageKey, {});
  const kept = Object.fromEntries(Object.entries(all).filter(([key]) => key.startsWith(iso)));
  kept[slot] = value;
  writeJSON(storageKey, kept);
}

function getProgress(iso, shift) {
  const all = readJSON(PROGRESS_KEY, {});
  return all[slotKey(iso, shift)] || {};
}

function getEquipment(iso, shift) {
  const all = readJSON(EQUIP_KEY, {});
  const list = all[slotKey(iso, shift)];
  return Array.isArray(list) ? list : [];
}

function getDraft() {
  const draft = readJSON(INCIDENT_KEY, {});
  return {
    dogs: Array.isArray(draft.dogs) ? draft.dogs : [],
    hora: draft.hora || "",
    lugar: draft.lugar || "",
    antes: draft.antes || "",
    conducta: draft.conducta || "",
    accion: draft.accion || "",
    despues: draft.despues || "",
    riesgo: draft.riesgo || "",
    lesiones: draft.lesiones || "",
    protocolo: Array.isArray(draft.protocolo) ? draft.protocolo : [],
  };
}

// ---------- vista ----------

export function walkerShell(content) {
  return `
    <div class="pw-shell">
      ${WalkerHeader()}
      ${content}
    </div>
  `;
}

export function walkerDashboard() {
  const sel = selection();
  const all = dogsForShift(sel.day, sel.shift);
  const active = all.filter((dog) => dog.status === "Activo");
  const flagged = all.filter((dog) => dog.status !== "Activo");
  const conflicts = conflictsFor(all);

  return `
    <main class="pw-main" id="pw-inicio">
      ${TodayCard(sel, active, flagged, conflicts)}
      ${DogsSection(sel, active, flagged, conflicts)}
      <div class="pw-columns">
        ${EquipmentSection(sel)}
        ${IncidentSection(sel, all)}
      </div>
      <footer class="pw-footer">
        <p>Datos: ${esc(BUSINESS_INFO.officialSources.routes)} e Inventario de equipamiento, actualizados el ${DATA_UPDATED}.</p>
        <p>Lo que marcás en esta página se guarda solo en este celular.</p>
      </footer>
    </main>
  `;
}

function WalkerHeader() {
  return `
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel del paseador">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>Paseador · ${WALKER}</small>
        </span>
      </a>
      <div class="pw-header-actions">
        <button class="pw-btn pw-btn--danger pw-btn--compact" type="button" data-pw-goto="pw-incidente">
          ${icon("alertTriangle", "pw-icon")}
          Incidente
        </button>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-logout>
          ${icon("logOut", "pw-icon")}
          Salir
        </button>
      </div>
    </header>
  `;
}

function TodayCard(sel, active, flagged, conflicts) {
  const shiftData = SHIFT_BY_LABEL[sel.shift];
  const title = sel.isToday
    ? `Hoy, ${sel.day.toLowerCase()} · turno ${sel.shift.toLowerCase()}`
    : `${sel.day} · turno ${sel.shift.toLowerCase()}`;
  const kicker = sel.isToday ? `Hola, ${WALKER} · ${sel.now.date}` : `Hola, ${WALKER} · Planificación: no es hoy`;

  return `
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${kicker}</p>
          <h1 id="pw-today-title">${title}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${active.length}</b> ${active.length === 1 ? "perro" : "perros"}</li>
            <li>${shiftHours(sel.shift)}</li>
            <li>Supervisa: ${esc(shiftData.supervisor)}</li>
            <li>${shiftRoutes(sel.shift)}</li>
          </ul>
        </div>
        <div class="pw-today-actions">
          ${sel.isToday ? "" : `
            <button class="pw-btn pw-btn--primary" type="button" data-pw-today>
              ${icon("calendarCheck", "pw-icon")}
              Volver a hoy
            </button>
          `}
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${view.pickerOpen}" aria-controls="pw-picker">
            ${icon("sliders", "pw-icon")}
            ${view.pickerOpen ? "Cerrar selector" : "Cambiar día o turno"}
          </button>
        </div>
      </div>
      ${view.pickerOpen ? Picker(sel) : ""}
      ${Priorities(sel, active, flagged, conflicts)}
    </section>
  `;
}

function Picker(sel) {
  const short = { Lunes: "Lun", Martes: "Mar", Miércoles: "Mié", Jueves: "Jue", Viernes: "Vie", Sábado: "Sáb", Domingo: "Dom" };
  return `
    <div class="pw-picker" id="pw-picker">
      <div class="pw-picker-group" role="group" aria-label="Día">
        <span class="pw-picker-label">Día</span>
        <div class="pw-days">
          ${WEEK_DAYS.map((day) => `
            <button type="button" class="pw-chip ${day === sel.day ? "is-active" : ""}" data-pw-day="${day}" aria-pressed="${day === sel.day}" aria-label="${day}${day === sel.now.day ? " (hoy)" : ""}">
              ${short[day]}${day === sel.now.day ? "<small>hoy</small>" : ""}
            </button>
          `).join("")}
        </div>
      </div>
      <div class="pw-picker-group" role="group" aria-label="Turno">
        <span class="pw-picker-label">Turno</span>
        <div class="pw-shifts">
          ${["Mañana", "Tarde"].map((shift) => `
            <button type="button" class="pw-chip pw-chip--wide ${shift === sel.shift ? "is-active" : ""}" data-pw-shift="${shift}" aria-pressed="${shift === sel.shift}">
              ${shift}<small>${shiftHours(shift)}</small>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// Máximo 3 prioridades, de la más urgente a la menos urgente.
function Priorities(sel, active, flagged, conflicts) {
  const items = [];

  if (conflicts.length) {
    items.push({
      kind: "danger",
      icon: "alertTriangle",
      title: "No juntar en el mismo grupo",
      text: `${groupConflicts(conflicts).join(". ")}.`,
      goto: "pw-perros",
      button: "Ver perros",
    });
  }

  const muzzled = active.filter(usesMuzzle);
  if (muzzled.length) {
    const short = muzzled.length > MY_MUZZLES;
    items.push({
      kind: "warn",
      icon: "shieldCheck",
      title: `Bozal: ${listNames(muzzled.map((dog) => dog.name))}`,
      text: short
        ? `Según el inventario tenés ${MY_MUZZLES} ${MY_MUZZLES === 1 ? "bozal" : "bozales"}. Confirmá con Juan antes de salir.`
        : "Llevá el bozal puesto en cada uno durante todo el paseo.",
      goto: "pw-equipo",
      button: "Ver equipo",
    });
  }

  if (flagged.length) {
    items.push({
      kind: "warn",
      icon: "alertCircle",
      title: `Confirmar antes de retirar: ${listNames(flagged.map((dog) => dog.name))}`,
      text: flagged.length === 1
        ? `Figura en la ruta con estado "${esc(flagged[0].status)}". No lo retires sin confirmarlo con Juan.`
        : "Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con Juan.",
      goto: "pw-perros",
      button: "Ver perros",
    });
  }

  if (sel.isToday && active.length) {
    const checked = getEquipment(sel.now.iso, sel.shift).length;
    const progress = getProgress(sel.now.iso, sel.shift);
    const delivered = active.filter((dog) => (progress[dog.id] || []).length >= STEPS.length).length;
    if (checked < MY_EQUIPMENT.length) {
      items.push({
        kind: "info",
        icon: "clipboardCheck",
        title: `Equipo: ${checked} de ${MY_EQUIPMENT.length} listo`,
        text: "Revisá el equipo antes de retirar al primer perro.",
        goto: "pw-equipo",
        button: "Ir al equipo",
      });
    } else {
      items.push({
        kind: delivered === active.length ? "ok" : "info",
        icon: delivered === active.length ? "checkCircle" : "pawPrint",
        title: `Entregados: ${delivered} de ${active.length}`,
        text: delivered === active.length ? "Turno completo. ¡Buen trabajo!" : "Equipo listo. Marcá cada retiro, paseo y entrega.",
        goto: "pw-perros",
        button: "Ver perros",
      });
    }
  }

  if (!active.length) {
    return `
      <div class="pw-empty">
        <p><strong>No hay perros cargados para este día y turno.</strong></p>
        <p>Si te pidieron un paseo, confirmalo con Juan.</p>
      </div>
    `;
  }

  if (!items.length) return "";

  return `
    <div class="pw-priorities">
      <h2 class="pw-section-label">Lo primero</h2>
      <ol class="pw-prio-list">
        ${items.slice(0, 3).map((item) => `
          <li>
            <button class="pw-prio pw-prio--${item.kind}" type="button" data-pw-goto="${item.goto}">
              <span class="pw-prio-icon" aria-hidden="true">${icon(item.icon, "pw-icon")}</span>
              <span class="pw-prio-text">
                <strong>${item.title}</strong>
                <span>${item.text}</span>
                <span class="pw-prio-go">${item.button} ${icon("arrowRight", "pw-icon pw-icon--sm")}</span>
              </span>
            </button>
          </li>
        `).join("")}
      </ol>
    </div>
  `;
}

function DogsSection(sel, active, flagged, conflicts) {
  const progress = sel.isToday ? getProgress(sel.now.iso, sel.shift) : {};
  const delivered = active.filter((dog) => (progress[dog.id] || []).length >= STEPS.length).length;
  const percent = active.length ? Math.round((delivered / active.length) * 100) : 0;

  return `
    <section class="pw-section" id="pw-perros" aria-labelledby="pw-perros-title" tabindex="-1">
      <div class="pw-section-head">
        <div>
          <h2 id="pw-perros-title">Perros del turno <span class="pw-count">${active.length}</span></h2>
          <p class="pw-muted">Orden de la planilla RPJ. Horario de retiro por perro: Pendiente de confirmar.</p>
        </div>
        ${sel.isToday && active.length ? `
          <div class="pw-progress" aria-label="Avance del turno">
            <strong>${delivered} de ${active.length} entregados</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${percent}%"></span></span>
          </div>
        ` : ""}
      </div>

      ${conflicts.length ? `
        <div class="pw-banner pw-banner--danger" role="alert">
          ${icon("alertTriangle", "pw-icon pw-icon--lg")}
          <div>
            <strong>Hay perros que no se pueden juntar en este turno</strong>
            <ul>${groupConflicts(conflicts).map((group) => `<li>${group}</li>`).join("")}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${esc(SHIFT_BY_LABEL[sel.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      ` : ""}

      ${flagged.map((dog) => `
        <div class="pw-banner pw-banner--warn">
          ${icon("alertCircle", "pw-icon pw-icon--lg")}
          <div>
            <strong>${esc(dog.name)}: ${esc(dog.status)}</strong>
            <p>${esc(dog.review || "Figura en la ruta, pero su estado no es Activo.")} No lo retires sin confirmarlo con Juan.</p>
          </div>
        </div>
      `).join("")}

      ${!sel.isToday && active.length ? `
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      ` : ""}

      ${active.length ? `
        <ul class="pw-dogs" role="list">
          ${active.map((dog) => DogCard(dog, sel, progress[dog.id] || [], partnersInList(dog, conflicts))).join("")}
        </ul>
        <p class="pw-muted pw-legend">
          Categoría operativa de todos los perros: <b>SIN EVALUAR</b>. ${esc(CATEGORIES["SIN EVALUAR"])}
          Fuente: Registro maestro, 14/08/2026.
        </p>
      ` : `
        <div class="pw-empty">
          <p><strong>Sin perros para ${sel.day.toLowerCase()} a la ${sel.shift.toLowerCase()}.</strong></p>
          <p>Probá otro día o turno con “Cambiar día o turno”.</p>
        </div>
      `}
    </section>
  `;
}

function DogCard(dog, sel, times, partners) {
  const step = Math.min(times.length, STEPS.length);
  const done = step >= STEPS.length;
  const ownNoJuntar = dog.safety.filter((text) => safetyKind(text) === "danger").join(" ");
  const extraPartners = partners.filter((name) => !ownNoJuntar.includes(name));
  const alerts = dog.safety.filter((text) => safetyKind(text) !== "info");
  const notes = dog.safety.filter((text) => safetyKind(text) === "info");
  const hasAlert = alerts.length || partners.length;

  return `
    <li class="pw-dog ${hasAlert ? "has-alert" : ""} ${done ? "is-done" : ""}" data-pw-dog="${dog.id}">
      <div class="pw-dog-head">
        <h3>${esc(dog.name)}</h3>
        <span class="pw-dog-facts">${esc(dog.size)} · ${dog.minutes ? `${dog.minutes} min` : "Duración pendiente de confirmar"}</span>
      </div>

      ${hasAlert ? `
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${esc(dog.name)}">
          ${alerts.map((text) => `
            <li class="pw-alert pw-alert--${safetyKind(text)}">
              ${icon(safetyKind(text) === "danger" ? "alertTriangle" : "shieldCheck", "pw-icon")}
              <span>${esc(text)}${safetyKind(text) === "danger" && partners.length ? `<b class="pw-today-tag">En este turno: ${listNames(partners)}</b>` : ""}</span>
            </li>
          `).join("")}
          ${extraPartners.length ? `
            <li class="pw-alert pw-alert--danger">
              ${icon("alertTriangle", "pw-icon")}
              <span>No juntar con ${listNames(extraPartners)}<b class="pw-today-tag">En este turno</b></span>
            </li>
          ` : ""}
        </ul>
      ` : ""}

      ${notes.map((text) => `<p class="pw-dog-note">${icon("users", "pw-icon pw-icon--sm")} ${esc(text)}</p>`).join("")}
      ${dog.review ? `<p class="pw-dog-review"><b>Dato a confirmar:</b> ${esc(dog.review)}</p>` : ""}
      <p class="pw-dog-category"><span>SIN EVALUAR</span> Registro maestro 14/08/2026</p>

      ${sel.isToday ? `
        <ol class="pw-steps" aria-label="Avance de ${esc(dog.name)}">
          ${STEPS.map((item, index) => `
            <li class="${index < step ? "is-done" : ""} ${index === step ? "is-next" : ""}">
              <span class="pw-step-dot" aria-hidden="true">${index < step ? icon("checkCircle", "pw-icon pw-icon--sm") : index + 1}</span>
              <span>${item.label}${index < step ? `<small>${esc(times[index])}</small>` : ""}</span>
              <span class="pw-sr">${index < step ? "hecho" : "pendiente"}</span>
            </li>
          `).join("")}
        </ol>
        <div class="pw-dog-actions">
          ${done ? `
            <p class="pw-done-label">${icon("checkCircle", "pw-icon")} Entregado ${esc(times[STEPS.length - 1])}</p>
          ` : `
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${dog.id}">
              ${STEPS[step].action}
            </button>
          `}
          ${step > 0 ? `
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${dog.id}" aria-label="Deshacer el último paso de ${esc(dog.name)}">Deshacer</button>
          ` : ""}
        </div>
      ` : ""}
    </li>
  `;
}

function EquipmentSection(sel) {
  const checked = getEquipment(sel.now.iso, sel.shift);
  const complete = checked.length >= MY_EQUIPMENT.length;

  return `
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">Tu equipo según el inventario. Hoy, turno ${sel.shift.toLowerCase()}.</p>
        </div>
        <span class="pw-count ${complete ? "is-ok" : ""}">${checked.length}/${MY_EQUIPMENT.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${MY_EQUIPMENT.map((row) => {
          const isChecked = checked.includes(row.item);
          const id = `pw-eq-${row.item.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`;
          return `
            <li>
              <input class="pw-check-input" type="checkbox" id="${id}" data-pw-equip="${esc(row.item)}" ${isChecked ? "checked" : ""} />
              <label class="pw-check" for="${id}">
                <span class="pw-check-box" aria-hidden="true">${icon("checkCircle", "pw-icon")}</span>
                <span class="pw-check-text">${esc(row.item)}</span>
                <span class="pw-check-qty">${row.sebastian}</span>
              </label>
            </li>
          `;
        }).join("")}
      </ul>
      <div class="pw-row">
        ${complete
          ? `<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`
          : `<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      <p class="pw-status" role="status">${esc(view.equipStatus)}</p>
      ${OTHER_EQUIPMENT.length ? `
        <p class="pw-muted pw-small">Lo tiene Juan: ${OTHER_EQUIPMENT.map((row) => `${esc(row.item.toLowerCase())} (${row.juan})`).join(", ")}.</p>
      ` : ""}
    </section>
  `;
}

function IncidentSection(sel, dogs) {
  const draft = getDraft();
  const dogNames = [...dogs.map((dog) => dog.name), EXTERNAL_DOG];
  // Si el borrador tiene perros de otro turno, se siguen mostrando para no perderlos.
  draft.dogs.forEach((name) => {
    if (!dogNames.includes(name)) dogNames.unshift(name);
  });
  const message = view.previewOpen ? buildMessage(draft, sel) : null;

  return `
    <section class="pw-section pw-card pw-incident" id="pw-incidente" aria-labelledby="pw-incidente-title" tabindex="-1">
      <div class="pw-section-head">
        <div>
          <h2 id="pw-incidente-title">${icon("alertTriangle", "pw-icon")} Reporte de incidente</h2>
          <p class="pw-muted">Primero la seguridad. El reporte se escribe después.</p>
        </div>
      </div>

      <fieldset class="pw-fieldset pw-protocol">
        <legend>Protocolo, en este orden</legend>
        <ol class="pw-protocol-list">
          ${INCIDENT_PROTOCOL.map((step, index) => {
            const id = `pw-proto-${index}`;
            return `
              <li>
                <input class="pw-check-input" type="checkbox" id="${id}" data-pw-field="protocolo" value="${index}" ${draft.protocolo.includes(index) ? "checked" : ""} />
                <label class="pw-check pw-check--step" for="${id}">
                  <span class="pw-check-box" aria-hidden="true">${icon("checkCircle", "pw-icon")}</span>
                  <span class="pw-check-text"><b>${index + 1}.</b> ${esc(step)}</span>
                </label>
              </li>
            `;
          }).join("")}
        </ol>
        <p class="pw-muted pw-small">Tildá cada paso cuando lo hayas hecho. Queda en el mensaje para Juan.</p>
      </fieldset>

      <fieldset class="pw-fieldset">
        <legend>Perros involucrados <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-toggle-grid">
          ${dogNames.map((name, index) => `
            <span class="pw-toggle">
              <input type="checkbox" id="pw-inc-dog-${index}" data-pw-field="dogs" value="${esc(name)}" ${draft.dogs.includes(name) ? "checked" : ""} />
              <label for="pw-inc-dog-${index}">${esc(name)}</label>
            </span>
          `).join("")}
        </div>
      </fieldset>

      <div class="pw-grid-2">
        <label class="pw-field">Hora
          <input type="time" data-pw-field="hora" value="${esc(draft.hora || sel.now.time)}" />
        </label>
        <label class="pw-field">Lugar
          <input type="text" data-pw-field="lugar" value="${esc(draft.lugar)}" placeholder="Ej.: plaza, esquina (sin domicilios)" autocomplete="off" />
        </label>
      </div>

      <p class="pw-hint">Escribí lo que viste y oíste. Ej.: “tiró de la correa y gruñó”, no “se puso agresivo”.</p>

      <label class="pw-field">Antes: ¿qué estaba pasando?
        <textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto a 3 metros">${esc(draft.antes)}</textarea>
      </label>
      <label class="pw-field">Conducta: ¿qué hizo el perro? <span class="pw-req">(obligatorio)</span>
        <textarea data-pw-field="conducta" rows="2" placeholder="Ej.: se paró en dos patas, ladró y tiró hacia el otro perro">${esc(draft.conducta)}</textarea>
      </label>
      <label class="pw-field">¿Qué hiciste vos?
        <textarea data-pw-field="accion" rows="2" placeholder="Ej.: corté distancia, crucé la calle y lo senté">${esc(draft.accion)}</textarea>
      </label>
      <label class="pw-field">Después: ¿cómo quedó?
        <textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto y siguió el paseo">${esc(draft.despues)}</textarea>
      </label>

      <fieldset class="pw-fieldset">
        <legend>Nivel de riesgo <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-seg pw-seg--risk">
          ${RISK_LEVELS.map((level) => `
            <span class="pw-toggle pw-toggle--${level.toLowerCase()}">
              <input type="radio" name="pw-riesgo" id="pw-riesgo-${level}" data-pw-field="riesgo" value="${level}" ${draft.riesgo === level ? "checked" : ""} />
              <label for="pw-riesgo-${level}">${level}</label>
            </span>
          `).join("")}
        </div>
      </fieldset>

      <fieldset class="pw-fieldset">
        <legend>¿Hay lesiones?</legend>
        <div class="pw-seg">
          ${INJURY_OPTIONS.map((option, index) => `
            <span class="pw-toggle">
              <input type="radio" name="pw-lesiones" id="pw-lesiones-${index}" data-pw-field="lesiones" value="${option}" ${draft.lesiones === option ? "checked" : ""} />
              <label for="pw-lesiones-${index}">${option}</label>
            </span>
          `).join("")}
        </div>
      </fieldset>

      <div class="pw-row">
        <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-generate>
          ${icon("fileText", "pw-icon")}
          Armar mensaje para Juan
        </button>
        <button class="pw-btn pw-btn--ghost ${view.confirmClear ? "is-confirm" : ""}" type="button" data-pw-clear>
          ${view.confirmClear ? "¿Seguro? Tocá de nuevo" : "Borrar reporte"}
        </button>
      </div>
      <p class="pw-status ${view.incidentStatus.startsWith("Falta") || view.incidentStatus.startsWith("Cambiá") ? "is-warn" : ""}" role="status" data-pw-incident-status>${esc(view.incidentStatus)}</p>

      ${message && message.ok ? MessagePreview(message.text) : ""}
      <p class="pw-muted pw-small">El borrador se guarda solo en este celular hasta que lo borres.</p>
    </section>
  `;
}

function MessagePreview(text) {
  return `
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${esc(text)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${whatsappHref(text)}" target="_blank" rel="noopener noreferrer">
          ${icon("message", "pw-icon")}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${icon("copy", "pw-icon")}
          Copiar
        </button>
      </div>
    </div>
  `;
}

function whatsappHref(text) {
  return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
}

// ---------- mensaje de incidente ----------

function validateDraft(draft) {
  const missing = [];
  if (!draft.dogs.length) missing.push({ label: "los perros involucrados", focus: '[data-pw-field="dogs"]' });
  if (!draft.conducta.trim()) missing.push({ label: "qué hizo el perro", focus: '[data-pw-field="conducta"]' });
  if (!draft.riesgo) missing.push({ label: "el nivel de riesgo", focus: '[data-pw-field="riesgo"]' });

  const texts = [draft.antes, draft.conducta, draft.accion, draft.despues, draft.lugar].join(" ");
  const word = texts.match(FORBIDDEN_WORDS)?.[0];
  return { missing, word };
}

function buildMessage(draft, sel) {
  const { missing, word } = validateDraft(draft);
  if (missing.length || word) return { ok: false, missing, word };

  const shift = shiftByClock(sel.now);
  const line = (label, value) => `${label}: ${value.trim() ? value.trim() : "Sin dato"}`;
  const protocol = INCIDENT_PROTOCOL.map((step, index) => {
    const short = step.split(/[:.]/)[0];
    return `- ${draft.protocolo.includes(index) ? "Hecho" : "Pendiente"}: ${short}`;
  });

  const text = [
    "REPORTE DE INCIDENTE - Paseos Juan",
    `Fecha: ${sel.now.date} · Hora: ${draft.hora || sel.now.time} · Turno: ${shift.toLowerCase()}`,
    `Paseador: ${WALKER}`,
    `Perros: ${draft.dogs.join(", ")}`,
    `Nivel de riesgo: ${draft.riesgo}`,
    line("Lesiones", draft.lesiones),
    line("Lugar", draft.lugar),
    "",
    line("Antes", draft.antes),
    line("Conducta observada", draft.conducta),
    line("Qué hice", draft.accion),
    line("Después", draft.despues),
    "",
    "Protocolo:",
    ...protocol,
  ].join("\n");

  return { ok: true, text };
}

function readDraftFromForm() {
  const draft = getDraft();
  const root = document.getElementById("pw-incidente");
  if (!root) return draft;
  ["hora", "lugar", "antes", "conducta", "accion", "despues"].forEach((name) => {
    const field = root.querySelector(`[data-pw-field="${name}"]`);
    if (field) draft[name] = field.value;
  });
  draft.dogs = [...root.querySelectorAll('[data-pw-field="dogs"]:checked')].map((input) => input.value);
  draft.protocolo = [...root.querySelectorAll('[data-pw-field="protocolo"]:checked')].map((input) => Number(input.value));
  draft.riesgo = root.querySelector('[data-pw-field="riesgo"]:checked')?.value || "";
  draft.lesiones = root.querySelector('[data-pw-field="lesiones"]:checked')?.value || "";
  return draft;
}

function saveDraftFromForm() {
  const draft = readDraftFromForm();
  writeJSON(INCIDENT_KEY, draft);
  return draft;
}

// Si el mensaje ya está a la vista, se actualiza mientras Sebastián corrige el reporte.
function refreshPreview(draft) {
  if (!view.previewOpen) return;
  const result = buildMessage(draft, selection());
  const box = document.querySelector("[data-pw-preview]");
  const status = document.querySelector("[data-pw-incident-status]");
  if (!result.ok) {
    box?.remove();
    view.previewOpen = false;
    view.incidentStatus = "Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.";
    if (status) {
      status.textContent = view.incidentStatus;
      status.classList.add("is-warn");
    }
    return;
  }
  const textarea = document.querySelector("[data-pw-message]");
  const link = document.querySelector("[data-pw-whatsapp]");
  if (textarea) textarea.value = result.text;
  if (link) link.href = whatsappHref(result.text);
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

// Vuelve a dibujar la página y devuelve el foco al control que se tocó.
function rerender(focusSelector) {
  render();
  if (!focusSelector) return;
  const target = document.querySelector(focusSelector);
  target?.focus({ preventScroll: true });
}

function scrollBehavior() {
  return document.documentElement.dataset.motion === "calm" ? "auto" : "smooth";
}

function goTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  target.focus({ preventScroll: true });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.querySelector("[data-pw-message]");
    if (!textarea) return false;
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    }
  }
}

// ---------- eventos ----------

function handlePaseadorClick(event) {
  if (!event.target.closest(".pw-shell")) return false;

  if (event.target.closest("[data-pw-logout]")) {
    navigate("/login");
    return true;
  }

  const goto = event.target.closest("[data-pw-goto]");
  if (goto) {
    goTo(goto.dataset.pwGoto);
    return true;
  }

  if (event.target.closest("[data-pw-picker]")) {
    view.pickerOpen = !view.pickerOpen;
    rerender("[data-pw-picker]");
    return true;
  }

  const dayButton = event.target.closest("[data-pw-day]");
  if (dayButton) {
    const now = nowAR();
    const day = dayButton.dataset.pwDay;
    view.day = day === now.day ? null : day;
    rerender(`[data-pw-day="${day}"]`);
    announce(`Mostrando ${day.toLowerCase()}.`);
    return true;
  }

  const shiftButton = event.target.closest("[data-pw-shift]");
  if (shiftButton) {
    view.shift = shiftButton.dataset.pwShift;
    rerender(`[data-pw-shift="${view.shift}"]`);
    announce(`Mostrando el turno ${view.shift.toLowerCase()}.`);
    return true;
  }

  if (event.target.closest("[data-pw-today]")) {
    view.day = null;
    view.shift = null;
    view.pickerOpen = false;
    rerender("#pw-today-title");
    announce("Mostrando hoy.");
    return true;
  }

  const stepButton = event.target.closest("[data-pw-step]");
  if (stepButton) {
    const id = stepButton.dataset.pwStep;
    const sel = selection();
    if (!sel.isToday) return true;
    const progress = getProgress(sel.now.iso, sel.shift);
    const times = progress[id] || [];
    if (times.length >= STEPS.length) return true;
    const doneStep = STEPS[times.length];
    progress[id] = [...times, sel.now.time];
    saveForToday(PROGRESS_KEY, sel.now.iso, slotKey(sel.now.iso, sel.shift), progress);
    const dog = REAL_DOGS.find((item) => item.id === id);
    const nextFocus = progress[id].length >= STEPS.length ? `[data-pw-undo="${id}"]` : `[data-pw-step="${id}"]`;
    rerender(nextFocus);
    announce(`${dog?.name || "Perro"}: ${doneStep.done.toLowerCase()} a las ${sel.now.time}.`);
    return true;
  }

  const undoButton = event.target.closest("[data-pw-undo]");
  if (undoButton) {
    const id = undoButton.dataset.pwUndo;
    const sel = selection();
    const progress = getProgress(sel.now.iso, sel.shift);
    const times = progress[id] || [];
    if (!times.length) return true;
    progress[id] = times.slice(0, -1);
    saveForToday(PROGRESS_KEY, sel.now.iso, slotKey(sel.now.iso, sel.shift), progress);
    const dog = REAL_DOGS.find((item) => item.id === id);
    rerender(`[data-pw-step="${id}"]`);
    announce(`${dog?.name || "Perro"}: se deshizo "${STEPS[times.length - 1].done.toLowerCase()}".`);
    return true;
  }

  if (event.target.closest("[data-pw-equip-all]")) {
    const sel = selection();
    saveForToday(EQUIP_KEY, sel.now.iso, slotKey(sel.now.iso, sel.shift), MY_EQUIPMENT.map((row) => row.item));
    view.equipStatus = "Equipo completo. ¡A salir!";
    rerender("[data-pw-equip-reset]");
    announce(view.equipStatus);
    return true;
  }

  if (event.target.closest("[data-pw-equip-reset]")) {
    const sel = selection();
    saveForToday(EQUIP_KEY, sel.now.iso, slotKey(sel.now.iso, sel.shift), []);
    view.equipStatus = "Lista de equipo desmarcada.";
    rerender("[data-pw-equip-all]");
    announce(view.equipStatus);
    return true;
  }

  if (event.target.closest("[data-pw-generate]")) {
    const draft = saveDraftFromForm();
    const result = buildMessage(draft, selection());
    view.confirmClear = false;
    if (!result.ok) {
      view.previewOpen = false;
      view.incidentStatus = result.missing.length
        ? `Falta completar: ${listNames(result.missing.map((item) => item.label))}.`
        : `Cambiá “${result.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`;
      const focus = result.missing.length ? result.missing[0].focus : '[data-pw-field="conducta"]';
      rerender(focus);
      announce(view.incidentStatus);
      return true;
    }
    view.previewOpen = true;
    view.incidentStatus = "Mensaje listo. Revisalo y mandalo por WhatsApp.";
    rerender("[data-pw-message]");
    announce(view.incidentStatus);
    return true;
  }

  if (event.target.closest("[data-pw-copy]")) {
    const text = document.querySelector("[data-pw-message]")?.value || "";
    copyText(text).then((ok) => {
      view.incidentStatus = ok ? "Texto copiado. Pegalo en el chat con Juan." : "No se pudo copiar: mantené apretado el texto y copialo a mano.";
      const status = document.querySelector("[data-pw-incident-status]");
      if (status) {
        status.textContent = view.incidentStatus;
        status.classList.toggle("is-warn", !ok);
      }
      announce(view.incidentStatus);
    });
    return true;
  }

  if (event.target.closest("[data-pw-clear]")) {
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
    view.previewOpen = false;
    view.incidentStatus = "Reporte borrado.";
    rerender("#pw-incidente");
    announce(view.incidentStatus);
    return true;
  }

  if (view.confirmClear && !event.target.closest("[data-pw-clear]")) {
    view.confirmClear = false;
    const clear = document.querySelector("[data-pw-clear]");
    if (clear) {
      clear.textContent = "Borrar reporte";
      clear.classList.remove("is-confirm");
    }
  }

  return false;
}

function handlePaseadorChange(event) {
  const equip = event.target.closest("[data-pw-equip]");
  if (equip) {
    const sel = selection();
    const checked = getEquipment(sel.now.iso, sel.shift);
    const item = equip.dataset.pwEquip;
    const next = equip.checked ? [...new Set([...checked, item])] : checked.filter((value) => value !== item);
    saveForToday(EQUIP_KEY, sel.now.iso, slotKey(sel.now.iso, sel.shift), next);
    view.equipStatus = next.length >= MY_EQUIPMENT.length ? "Equipo completo. ¡A salir!" : "";
    rerender(`[data-pw-equip="${item}"]`);
    if (view.equipStatus) announce(view.equipStatus);
    return true;
  }

  if (event.target.closest("[data-pw-field]")) {
    refreshPreview(saveDraftFromForm());
    return true;
  }

  return false;
}

function handlePaseadorInput(event) {
  if (!event.target.closest?.("[data-pw-field]")) return;
  refreshPreview(saveDraftFromForm());
}

export function registerPaseadorEvents() {
  clickHandlers.push(handlePaseadorClick);
  changeHandlers.push(handlePaseadorChange);
  document.addEventListener("input", handlePaseadorInput);
}
