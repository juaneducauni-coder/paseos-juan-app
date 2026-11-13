// Vista del rol Supervisor: Juan (turno mañana) y Nicolás (turno tarde).
// Arriba va lo del turno que se está mirando (por defecto, el turno actual en Argentina):
// seguridad, perros y control de retiro y entrega. El resto (armado de rutas, observaciones
// de conducta, cierre del turno y referencias) queda agrupado en secciones plegables.
// Todo lo que se carga en esta pantalla se guarda solo en este dispositivo (localStorage).
import {
  REAL_DOGS,
  SHIFTS,
  WEEK_DAYS,
  CATEGORIES,
  PENDIENTE,
  DATA_UPDATED,
  BUSINESS_INFO,
  dogsForShift,
} from "../data/realData.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";

const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SHIFT_KEYS = ["manana", "tarde"];
const WALKER_OPTIONS = ["Paseador asignado", "Sebastián"];
const FORBIDDEN_LABELS = /(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i;

const KEYS = {
  view: "paseosJuanSupervisor_vista",
  folds: "paseosJuanSupervisor_plegado",
  control: "paseosJuanSupervisor_control",
  closure: "paseosJuanSupervisor_cierre",
  routes: "paseosJuanSupervisor_rutas",
  routeDraft: "paseosJuanSupervisor_rutaBorrador",
  observations: "paseosJuanSupervisor_observaciones",
  observationDraft: "paseosJuanSupervisor_observacionBorrador",
};

// Mensajes de estado que se muestran una vez (zona aria-live de cada sección).
let flash = null;
// Ruta que espera confirmación para borrarse (paso doble, sin diálogos del navegador).
let pendingRouteDelete = null;
let pendingObservationDelete = null;

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

function currentShiftKey(now) {
  // Entre turnos (después de las 13:30) ya se muestra la tarde.
  return now.minutes < toMinutes("13:30") ? "manana" : "tarde";
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

// ---------- Estado de la vista ----------

function getView() {
  const now = nowInArgentina();
  const stored = readJSON(KEYS.view, {});
  const fallback = { day: now.dayName, shift: currentShiftKey(now) };
  // La selección guardada vale solo para el día de hoy: mañana arranca otra vez en el turno actual.
  const view = stored.date === now.iso ? { ...fallback, ...stored } : fallback;
  if (!WEEK_DAYS.includes(view.day)) view.day = fallback.day;
  if (!SHIFT_KEYS.includes(view.shift)) view.shift = fallback.shift;
  return { ...view, now, isToday: view.day === now.dayName };
}

function saveView(view) {
  writeJSON(KEYS.view, { date: nowInArgentina().iso, day: view.day, shift: view.shift });
}

function isFoldOpen(name, fallback = false) {
  const folds = readJSON(KEYS.folds, {});
  return typeof folds[name] === "boolean" ? folds[name] : fallback;
}

function controlKey(view) {
  return `${view.now.iso}|${view.shift}`;
}

function getControl(view) {
  return readJSON(KEYS.control, {})[controlKey(view)] || {};
}

function saveControl(view, value) {
  const all = readJSON(KEYS.control, {});
  all[controlKey(view)] = value;
  writeJSON(KEYS.control, all);
}

function getClosure(view) {
  return readJSON(KEYS.closure, {})[controlKey(view)] || {};
}

function saveClosure(view, value) {
  const all = readJSON(KEYS.closure, {});
  all[controlKey(view)] = value;
  writeJSON(KEYS.closure, all);
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

function getRoutes() {
  return readJSON(KEYS.routes, []);
}

function saveRoutes(routes) {
  writeJSON(KEYS.routes, routes);
}

function routesFor(day, shiftKey) {
  return getRoutes().filter((route) => route.day === day && route.shift === shiftKey);
}

function emptyRouteDraft(view) {
  return {
    day: view.day,
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
  if (stored.day !== view.day || stored.shift !== view.shift) return emptyRouteDraft(view);
  const draft = { ...emptyRouteDraft(view), ...stored };
  draft.dogIds = Array.isArray(draft.dogIds) ? draft.dogIds.filter((id) => dogById(id)) : [];
  if (!shiftRoutes(view.shift).includes(draft.route)) draft.route = shiftRoutes(view.shift)[0];
  if (!WALKER_OPTIONS.includes(draft.walker)) draft.walker = WALKER_OPTIONS[0];
  return draft;
}

function saveRouteDraft(draft) {
  writeJSON(KEYS.routeDraft, draft);
}

function routeCheck(draft) {
  const dogs = draft.dogIds.map(dogById).filter(Boolean);
  const risk = analyzeDogs(dogs);
  const inShift = new Set(shiftDogs(draft.day, draft.shift).map((dog) => dog.id));
  const otherRoutes = routesFor(draft.day, draft.shift).filter((route) => route.id !== draft.editingId);
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

function getObservations() {
  return readJSON(KEYS.observations, []);
}

function observationText(obs) {
  const dog = dogById(obs.dogId);
  return [
    `Observación de conducta — ${BUSINESS_INFO.name}`,
    `Perro: ${dog ? dog.name : PENDIENTE}`,
    `Fecha: ${obs.fecha}${obs.hora ? ` · ${obs.hora} hs` : ""}`,
    `Lugar: ${obs.lugar}`,
    `Estímulo: ${obs.estimulo}`,
    `Reacción: ${obs.reaccion}`,
    `Acción: ${obs.accion}`,
    `Resultado: ${obs.resultado}`,
    `Seguimiento: ${obs.seguimiento ? "Sí, requiere seguimiento" : "No"}`,
    `Registró: ${obs.autor || PENDIENTE}`,
  ].join("\n");
}

// ---------- Cierre ----------

function closureSummary(view, dogs) {
  const shift = SHIFTS[view.shift];
  const control = getControl(view);
  const closure = getClosure(view);
  const risk = analyzeDogs(dogs);
  const routes = routesFor(view.day, view.shift);
  const goingDogs = dogs.filter((dog) => !control[dog.id]?.ausente);
  const pickedUp = goingDogs.filter((dog) => control[dog.id]?.retiro);
  const delivered = goingDogs.filter((dog) => control[dog.id]?.entrega);
  const absent = dogs.filter((dog) => control[dog.id]?.ausente);
  const notDelivered = goingDogs.filter((dog) => !control[dog.id]?.entrega);
  const observations = getObservations().filter((obs) => obs.fecha === view.now.label && obs.shift === view.shift);

  const lines = [
    `Cierre de turno — ${BUSINESS_INFO.name}`,
    `Fecha: ${view.now.label} (${view.day})`,
    `Turno: ${shift.label} (${shift.from} a ${shift.to} hs) · Supervisa: ${shift.supervisor}`,
    `Rutas: ${shiftRoutes(view.shift).join(" y ")}`,
    ...routes.map((route) => `- ${route.route} (${route.walker}): ${route.dogIds.map((id) => dogById(id)?.name).filter(Boolean).join(", ")}`),
    `Perros previstos: ${dogs.length}`,
    `Retirados: ${pickedUp.length} de ${goingDogs.length} · Entregados: ${delivered.length} de ${goingDogs.length}`,
    `No salieron: ${absent.length ? absent.map((dog) => dog.name).join(", ") : "ninguno"}`,
    `Sin entrega marcada: ${notDelivered.length ? notDelivered.map((dog) => dog.name).join(", ") : "ninguno"}`,
    "Seguridad del turno:",
    `- No juntar: ${risk.pairs.length ? pairText(risk.pairs).join("; ") : "sin incompatibles en el turno"}`,
    `- Bozal: ${risk.muzzle.length ? risk.muzzle.map((dog) => dog.name).join(", ") : "nadie en este turno"}`,
    `Observaciones de conducta registradas hoy en este turno: ${observations.length}`,
    `Notas del supervisor: ${closure.notas?.trim() || "sin notas"}`,
  ];
  if (closure.cerrado) lines.push(`Turno cerrado a las ${closure.cerrado} hs.`);
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
      <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
        ${icon("logOut", "sv-icon")}
        Salir
      </button>
    </header>
  `;
}

export function supervisorDashboard() {
  const view = getView();
  const dogs = shiftDogs(view.day, view.shift);
  const content = `
    <main class="sv-main" id="sv-main">
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
  return content;
}

// ---------- 1. Panel del turno ----------

function ShiftPanel(view, dogs) {
  const shift = SHIFTS[view.shift];
  const moment = view.isToday ? shiftMoment(view.shift, view.now) : null;
  const otherKey = view.shift === "manana" ? "tarde" : "manana";
  const otherCount = shiftDogs(view.day, otherKey).length;
  const savedRoutes = routesFor(view.day, view.shift);
  const routes = shiftRoutes(view.shift);
  const activeCount = dogs.filter((dog) => dog.status === "Activo").length;

  return `
    <section class="sv-hero" aria-labelledby="sv-hero-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">${view.isToday ? `Hoy · ${esc(view.day)} ${view.now.label}` : `Planificación · ${esc(view.day)}`}</p>
          <h1 id="sv-hero-title">Turno ${shift.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${shift.from} a ${shift.to} hs · Supervisa <strong>${shift.supervisor}</strong>
            ${moment ? `<span class="sv-moment is-${moment.tone}">${moment.label}</span>` : ""}
          </p>
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
        <p class="sv-note is-info">Estás mirando ${esc(view.day)} para planificar. El control de retiro y entrega se usa solo el día de hoy.</p>
      `}

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
  const control = getControl(view);
  const going = dogs.filter((dog) => !control[dog.id]?.ausente);
  const picked = going.filter((dog) => control[dog.id]?.retiro).length;
  const delivered = going.filter((dog) => control[dog.id]?.entrega).length;
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
            <p class="sv-hint">Tocá «Retirado» al levantar a cada perro y «Entregado» al dejarlo. Se guarda la hora en este dispositivo.${absent ? ` No salen hoy: ${absent}.` : ""}</p>
          ` : ""}
          ${allUnevaluated ? `<p class="sv-hint">Categoría de todos: <strong>SIN EVALUAR</strong> · Fuente: Registro maestro de perros, 14/08/2026.</p>` : ""}
          <ul class="sv-dog-list">
            ${dogs.map((dog) => DogRow(dog, control[dog.id] || {}, view.isToday)).join("")}
          </ul>
          ${statusRegion("control")}
        ` : `<p class="sv-empty">No hay perros para este día y turno.</p>`}
      </div>
    </details>
  `;
}

function DogRow(dog, state, isToday) {
  const absent = Boolean(state.ausente);
  return `
    <li class="sv-dog ${absent ? "is-absent" : ""} ${state.entrega ? "is-done" : ""}">
      <div class="sv-dog-info">
        <div class="sv-dog-head">
          <h3>${esc(dog.name)}</h3>
          ${isToday && !absent && !state.retiro ? `<button type="button" class="sv-link" id="sv-absent-${dog.id}" data-sv-absent="${dog.id}" aria-label="${esc(dog.name)} no sale hoy">No sale hoy</button>` : ""}
        </div>
        <p>${esc(dog.size)} · ${dog.minutes ? `${dog.minutes} min` : PENDIENTE} · ${esc(dog.plan)}</p>
        ${safetyChips(dog)}
      </div>
      ${isToday ? `
        <div class="sv-dog-actions">
          ${absent ? `
            <p class="sv-dog-state">No sale hoy</p>
            <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${dog.id}" data-sv-absent="${dog.id}" aria-label="Deshacer: ${esc(dog.name)} sí sale hoy">Deshacer</button>
          ` : `
            <button type="button" class="sv-button ${state.retiro ? "is-checked" : "sv-button-primary"}" id="sv-pickup-${dog.id}" data-sv-pickup="${dog.id}" aria-pressed="${Boolean(state.retiro)}" aria-label="${state.retiro ? `Desmarcar retiro de ${esc(dog.name)}` : `Marcar a ${esc(dog.name)} como retirado`}">
              ${state.retiro ? `${icon("checkCircle", "sv-icon")} Retirado ${state.retiro}` : "Retirado"}
            </button>
            <button type="button" class="sv-button ${state.entrega ? "is-checked" : ""}" id="sv-deliver-${dog.id}" data-sv-deliver="${dog.id}" aria-pressed="${Boolean(state.entrega)}" ${state.retiro ? "" : "disabled"} aria-label="${state.entrega ? `Desmarcar entrega de ${esc(dog.name)}` : `Marcar a ${esc(dog.name)} como entregado`}">
              ${state.entrega ? `${icon("checkCircle", "sv-icon")} Entregado ${state.entrega}` : "Entregado"}
            </button>
          `}
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
  const saved = routesFor(view.day, view.shift);
  const shiftIds = new Set(shiftDogs(view.day, view.shift).map((dog) => dog.id));
  const candidates = draft.showAll ? REAL_DOGS : REAL_DOGS.filter((dog) => shiftIds.has(dog.id) || draft.dogIds.includes(dog.id));
  const otherRoutes = saved.filter((route) => route.id !== draft.editingId);
  const hasConflict = check.conflicts.length > 0;

  return `
    <details class="sv-fold" data-sv-fold="rutas" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("route", "sv-icon")} Armar rutas del turno</span>
        <span class="sv-fold-meta">${saved.length ? `${saved.length} guardada${saved.length === 1 ? "" : "s"}` : "Sin rutas armadas"}</span>
      </summary>
      <div class="sv-fold-body">
        ${saved.length ? `
          <h3 class="sv-subtitle">Rutas guardadas · ${esc(view.day)} ${SHIFTS[view.shift].label.toLowerCase()}</h3>
          <ul class="sv-saved-routes">
            ${saved.map((route) => SavedRoute(route)).join("")}
          </ul>
        ` : ""}

        <form class="sv-builder" data-sv-route-form novalidate>
          <h3 class="sv-subtitle">${draft.editingId ? "Editar ruta" : "Nueva ruta"} · ${esc(view.day)} ${SHIFTS[view.shift].label.toLowerCase()}</h3>
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
                    elsewhere ? `<span class="sv-tag is-neutral">Ya en ${elsewhere.route}</span>` : "",
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
  return `
    <li class="sv-saved ${route.conflicts?.length ? "has-conflict" : ""}">
      <div class="sv-saved-head">
        <strong>${esc(route.route)}</strong>
        <span>${esc(route.walker)} · ${names.length} perros</span>
      </div>
      <p>${names.map((name, index) => `${index + 1}. ${esc(name)}`).join(" · ")}</p>
      ${route.conflicts?.length ? `
        <div class="sv-note is-warn">
          <strong>Guardada con conflicto confirmado.</strong>
          <ul>${route.conflicts.map((text) => `<li>${esc(text)}</li>`).join("")}</ul>
          <span>Medida: ${esc(route.reason)}</span>
        </div>
      ` : ""}
      ${route.notes ? `<p class="sv-hint">Notas: ${esc(route.notes)}</p>` : ""}
      <p class="sv-source">Guardada ${esc(route.savedAt)}</p>
      <div class="sv-actions">
        ${confirmingDelete ? `
          <button type="button" class="sv-button sv-button-danger" id="sv-route-del-ok-${route.id}" data-sv-route-delete-ok="${route.id}">Sí, borrar ${esc(route.route)}</button>
          <button type="button" class="sv-button" id="sv-route-del-no-${route.id}" data-sv-route-delete-cancel>No borrar</button>
        ` : `
          <button type="button" class="sv-button" id="sv-route-edit-${route.id}" data-sv-route-edit="${route.id}">Editar</button>
          <button type="button" class="sv-button" id="sv-route-del-${route.id}" data-sv-route-delete="${route.id}">Borrar</button>
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
        <span class="sv-fold-meta">${saved.length ? `${saved.length} registrada${saved.length === 1 ? "" : "s"}` : "Sin registros"}</span>
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
          <h3 class="sv-subtitle">Registradas en este dispositivo</h3>
          <ul class="sv-obs-list">
            ${saved.map((obs) => ObservationCard(obs)).join("")}
          </ul>
        ` : ""}
      </div>
    </details>
  `;
}

function ObservationCard(obs) {
  const dog = dogById(obs.dogId);
  const confirming = pendingObservationDelete === obs.id;
  return `
    <li class="sv-obs ${obs.seguimiento ? "needs-follow" : ""}">
      <div class="sv-saved-head">
        <strong>${esc(dog ? dog.name : PENDIENTE)}</strong>
        <span>${esc(obs.fecha)}${obs.hora ? ` · ${esc(obs.hora)} hs` : ""} · ${esc(obs.lugar)}</span>
      </div>
      ${obs.seguimiento ? `<p class="sv-tag is-warn">Requiere seguimiento</p>` : ""}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${esc(obs.estimulo)}</dd></div>
        <div><dt>Reacción</dt><dd>${esc(obs.reaccion)}</dd></div>
        <div><dt>Acción</dt><dd>${esc(obs.accion)}</dd></div>
        <div><dt>Resultado</dt><dd>${esc(obs.resultado)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${esc(obs.autor || PENDIENTE)}</p>
      <div class="sv-actions">
        ${confirming ? `
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${obs.id}" data-sv-obs-delete-ok="${obs.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${obs.id}" data-sv-obs-delete-cancel>No borrar</button>
        ` : `
          <button type="button" class="sv-button" id="sv-obs-copy-${obs.id}" data-sv-obs-copy="${obs.id}">${icon("copy", "sv-icon")} Copiar texto</button>
          <button type="button" class="sv-button" id="sv-obs-del-${obs.id}" data-sv-obs-delete="${obs.id}">Borrar</button>
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
  return `
    <details class="sv-fold" data-sv-fold="cierre" ${open ? "open" : ""}>
      <summary>
        <span class="sv-fold-title">${icon("flag", "sv-icon")} Cerrar el turno</span>
        <span class="sv-fold-meta">${closure.cerrado ? `Cerrado ${closure.cerrado} hs` : "Abierto"}</span>
      </summary>
      <div class="sv-fold-body">
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${esc(closure.notas || "")}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar
          <textarea id="sv-close-summary" class="sv-summary" rows="14" readonly>${esc(summary)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${icon("copy", "sv-icon")} Copiar resumen</button>
          ${closure.cerrado
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
          <li>Lo que cargás en esta pantalla se guarda solo en este dispositivo.</li>
        </ul>
      </div>
    </details>
  `;
}

// ---------- Eventos ----------

function rerender(focusId) {
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

function toggleControl(dogId, field, focusId) {
  const view = getView();
  if (!view.isToday) return;
  const control = getControl(view);
  const current = { ...(control[dogId] || {}) };
  const dog = dogById(dogId);
  if (field === "ausente") {
    current.ausente = !current.ausente;
    if (current.ausente) {
      delete current.retiro;
      delete current.entrega;
    }
    setFlash("control", current.ausente ? `${dog.name}: no sale hoy.` : `${dog.name}: vuelve a la lista.`);
  } else if (current[field]) {
    delete current[field];
    if (field === "retiro") delete current.entrega;
    setFlash("control", `${dog.name}: ${field === "retiro" ? "retiro" : "entrega"} desmarcado.`, "info");
  } else {
    current[field] = timeNow();
    setFlash("control", `${dog.name}: ${field === "retiro" ? "retirado" : "entregado"} a las ${current[field]} hs.`);
  }
  control[dogId] = current;
  saveControl(view, control);
  rerender(focusId);
}

function saveRoute() {
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

  const now = nowInArgentina();
  const route = {
    id: draft.editingId || `ruta-${Date.now()}`,
    day: draft.day,
    shift: draft.shift,
    route: draft.route,
    walker: draft.walker,
    dogIds: check.dogs.map((dog) => dog.id),
    notes: draft.notes.trim(),
    conflicts: check.conflicts.map((item) => item.text),
    reason: check.conflicts.length ? draft.reason.trim() : "",
    savedAt: `${now.label} ${now.time} hs`,
  };
  const routes = getRoutes();
  const index = routes.findIndex((item) => item.id === route.id);
  if (index >= 0) routes[index] = route;
  else routes.push(route);
  saveRoutes(routes);
  saveRouteDraft(emptyRouteDraft(view));
  setFlash("route", `Ruta ${route.route} guardada con ${route.dogIds.length} perros${route.conflicts.length ? " (conflicto confirmado)" : ""}.`);
  return rerender("sv-route-save");
}

function saveObservation(form) {
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
  if (!missing.length && !/^\d{2}\/\d{2}\/\d{4}$/.test(draft.fecha.trim())) {
    setFlash("observation", "Escribí la fecha como DD/MM/AAAA, por ejemplo 12/11/2026.", "error");
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

  const observation = {
    ...draft,
    id: `obs-${Date.now()}`,
    shift: view.shift,
    autor: `Supervisión turno ${SHIFTS[view.shift].label.toLowerCase()}`,
  };
  writeJSON(KEYS.observations, [observation, ...getObservations()]);
  writeJSON(KEYS.observationDraft, emptyObservation(view));
  setFlash("observation", `Observación de ${dogById(draft.dogId)?.name} guardada en este dispositivo.`);
  return rerender("sv-obs-save");
}

function handleSupervisorClick(event) {
  const target = event.target;
  if (!target.closest?.(".sv-shell")) return false;

  if (target.closest("[data-sv-logout]")) {
    navigate("/login");
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
    toggleControl(pickup.dataset.svPickup, "retiro", pickup.id);
    return true;
  }

  const deliver = target.closest("[data-sv-deliver]");
  if (deliver) {
    toggleControl(deliver.dataset.svDeliver, "entrega", deliver.id);
    return true;
  }

  const absent = target.closest("[data-sv-absent]");
  if (absent) {
    const dogId = absent.dataset.svAbsent;
    const wasAbsent = getControl(getView())[dogId]?.ausente;
    toggleControl(dogId, "ausente", wasAbsent ? `sv-pickup-${dogId}` : `sv-absent-${dogId}`);
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
    const route = getRoutes().find((item) => item.id === routeEdit.dataset.svRouteEdit);
    if (route) {
      saveRouteDraft({
        day: route.day,
        shift: route.shift,
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
    const route = getRoutes().find((item) => item.id === id);
    saveRoutes(getRoutes().filter((item) => item.id !== id));
    const view = getView();
    if (getRouteDraft(view).editingId === id) saveRouteDraft(emptyRouteDraft(view));
    pendingRouteDelete = null;
    setFlash("route", `Ruta ${route?.route || ""} borrada.`, "info");
    rerender("sv-route-code");
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
    writeJSON(KEYS.observations, getObservations().filter((item) => item.id !== obsDeleteOk.dataset.svObsDeleteOk));
    pendingObservationDelete = null;
    setFlash("observation", "Observación borrada.", "info");
    rerender("sv-obs-save");
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
    const closure = getClosure(view);
    saveClosure(view, { ...closure, cerrado: timeNow() });
    setFlash("closure", "Turno marcado como cerrado. No te olvides de copiar el resumen.");
    rerender("sv-close-copy");
    return true;
  }

  if (target.closest("[data-sv-close-reopen]")) {
    const view = getView();
    const closure = getClosure(view);
    delete closure.cerrado;
    saveClosure(view, closure);
    setFlash("closure", "Turno reabierto.", "info");
    rerender("sv-close-done");
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

  if (target.matches("[data-sv-close-notes]")) {
    saveClosure(view, { ...getClosure(view), notas: target.value });
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
    saveClosure(view, { ...getClosure(view), notas: target.value });
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
}
