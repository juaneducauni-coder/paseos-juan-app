// Vista del rol Cliente (tutor de un perro).
//
// Es la cara del servicio: arranca por lo más importante del día (el paseo de hoy y el
// próximo), muestra el plan con los precios oficiales y deja que el tutor complete la ficha
// de su perro. Todo lo que el tutor carga se guarda solo en su dispositivo (localStorage).
//
// Para la demo se usa un perro de ejemplo ("Tu perro") con un plan real. No se usan perros
// reales, ni nombres de tutores, ni alias o datos de pago.
import {
  BUSINESS_INFO,
  CATEGORIES,
  MULTI_DOG_DISCOUNTS,
  PENDIENTE,
  REAL_PLANS,
  REAL_SINGLE_WALK,
  SHIFTS,
  WEEK_DAYS,
  formatPeso,
} from "../data/realData.js";
import { PROMO } from "../data/mock.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { isCalmMotion } from "../ui/accesibilidad.js";

// ---------------------------------------------------------------------------
// Datos guardados en el dispositivo del tutor
// ---------------------------------------------------------------------------

const KEYS = {
  plan: "paseosJuan_cliente_plan",
  ficha: "paseosJuan_cliente_ficha",
  ausencias: "paseosJuan_cliente_ausencias",
  carnet: "paseosJuan_cliente_carnet",
  comprobantes: "paseosJuan_cliente_comprobantes",
  foto: "paseosJuan_cliente_foto",
};

const DEFAULT_DOG_NAME = "Tu perro";

// Plan de ejemplo: Plan 2 (5 paseos por semana), de lunes a viernes, turno mañana.
const DEFAULT_PLAN = {
  planId: "plan2",
  size: "Mediano",
  shift: "Mañana",
  days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
};

const SIZES = ["Pequeño", "Mediano", "Grande"];
// Días que hoy figuran en las rutas (no hay rutas cargadas los domingos).
const PLAN_DAYS = WEEK_DAYS.filter((day) => day !== "Domingo");
const SHIFT_BY_LABEL = { Mañana: SHIFTS.manana, Tarde: SHIFTS.tarde };

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
    return true;
  } catch {
    return false;
  }
}

function getPlanSettings() {
  const saved = readJSON(KEYS.plan, null);
  if (!saved || typeof saved !== "object") return { ...DEFAULT_PLAN };
  const plan = REAL_PLANS.find((item) => item.id === saved.planId) ? saved.planId : DEFAULT_PLAN.planId;
  const size = SIZES.includes(saved.size) ? saved.size : DEFAULT_PLAN.size;
  const shift = SHIFT_BY_LABEL[saved.shift] ? saved.shift : DEFAULT_PLAN.shift;
  const days = Array.isArray(saved.days) ? PLAN_DAYS.filter((day) => saved.days.includes(day)) : DEFAULT_PLAN.days;
  return { planId: plan, size, shift, days: days.length ? days : DEFAULT_PLAN.days };
}

function getFicha() {
  const saved = readJSON(KEYS.ficha, {});
  return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
}

function getAbsences() {
  const saved = readJSON(KEYS.ausencias, []);
  return Array.isArray(saved) ? saved.filter((item) => item && typeof item.date === "string") : [];
}

function getFileList(key) {
  const saved = readJSON(key, []);
  return Array.isArray(saved) ? saved.filter((item) => item && typeof item.name === "string") : [];
}

function getCarnet() {
  const saved = readJSON(KEYS.carnet, null);
  return saved && typeof saved.name === "string" ? saved : null;
}

function getDogPhoto() {
  try {
    const photo = localStorage.getItem(KEYS.foto);
    return photo?.startsWith("data:image/") ? photo : "";
  } catch {
    return "";
  }
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function waLink(message) {
  return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Fecha y hora actuales en Argentina, sin depender de la zona horaria del dispositivo.
function argentinaNow() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Argentina/Buenos_Aires",
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
  const date = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
  return { date, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

function addDays(date, amount) {
  return new Date(date.getTime() + amount * 86400000);
}

function dayName(date) {
  return WEEK_DAYS[(date.getUTCDay() + 6) % 7];
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatDate(date) {
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getUTCFullYear()}`;
}

function formatIso(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return formatDate(new Date(Date.UTC(y, m - 1, d)));
}

function dateFromIso(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function shortDay(day) {
  return { Lunes: "Lun", Martes: "Mar", Miércoles: "Mié", Jueves: "Jue", Viernes: "Vie", Sábado: "Sáb", Domingo: "Dom" }[day];
}

function listJoin(items) {
  return items.length > 1 ? `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}` : items.join("");
}

function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

// ---------------------------------------------------------------------------
// Cálculos del día y del plan
// ---------------------------------------------------------------------------

function getContext() {
  const settings = getPlanSettings();
  const plan = REAL_PLANS.find((item) => item.id === settings.planId);
  const shift = SHIFT_BY_LABEL[settings.shift];
  const ficha = getFicha();
  const now = argentinaNow();
  const todayIso = isoDate(now.date);
  const absences = getAbsences().filter((item) => item.date >= todayIso).sort((a, b) => a.date.localeCompare(b.date));
  const absentDates = new Set(absences.map((item) => item.date));
  const dogName = (ficha.nombre || "").trim() || DEFAULT_DOG_NAME;
  return { settings, plan, shift, ficha, now, todayIso, absences, absentDates, dogName };
}

function todayStatus(ctx) {
  const { settings, shift, now, todayIso, absentDates } = ctx;
  const today = dayName(now.date);
  const from = toMinutes(shift.from);
  const to = toMinutes(shift.to);

  if (!settings.days.includes(today)) {
    return { kind: "libre", title: "Hoy no tiene paseo", step: -1 };
  }
  if (absentDates.has(todayIso)) {
    return { kind: "ausente", title: "Hoy no sale: avisaste una ausencia", step: -1 };
  }
  if (now.minutes < from) return { kind: "programado", title: "Hoy sale a pasear", step: 0 };
  if (now.minutes <= to) return { kind: "en-curso", title: "Hoy sale a pasear", step: 1 };
  return { kind: "terminado", title: "El paseo de hoy ya pasó", step: 2 };
}

// Próximas fechas de paseo según los días del plan. Si el turno de hoy ya terminó, no cuenta.
function upcomingWalks(ctx, count = 10, skipAbsent = true) {
  const { settings, shift, now, absentDates } = ctx;
  const result = [];
  for (let offset = 0; offset < 70 && result.length < count; offset += 1) {
    const date = addDays(now.date, offset);
    if (!settings.days.includes(dayName(date))) continue;
    if (offset === 0 && now.minutes > toMinutes(shift.to)) continue;
    if (skipAbsent && absentDates.has(isoDate(date))) continue;
    result.push(date);
  }
  return result;
}

const FICHA_GROUPS = [
  {
    id: "identificacion",
    title: "Identificación",
    iconName: "pawPrint",
    fields: [
      { key: "nombre", label: "Nombre", placeholder: "Cómo se llama" },
      { key: "raza", label: "Raza o cruza" },
      { key: "edad", label: "Edad o fecha de nacimiento" },
      { key: "sexo", label: "Sexo", options: ["Macho castrado", "Macho sin castrar", "Hembra castrada", "Hembra sin castrar"] },
      { key: "senas", label: "Color y señas particulares" },
      { key: "chapita", label: "Chapita o microchip", options: ["Tiene chapita", "Tiene microchip", "Tiene los dos", "No tiene"] },
      { key: "fotos", label: "Fotos en las redes de Paseos Juan", options: ["Autorizo", "No autorizo"] },
    ],
  },
  {
    id: "salud",
    title: "Salud",
    iconName: "heartPulse",
    fields: [
      { key: "vacunas", label: "Vacunas", options: ["Al día", "Atrasadas", "No sé"] },
      { key: "desparasitacion", label: "Última desparasitación", placeholder: "Por ejemplo: 10/2026" },
      { key: "alergias", label: "Alergias o medicación" },
      { key: "cuidados", label: "Lesiones, cirugías o cuidados especiales", textarea: true },
      { key: "veterinaria", label: "Veterinaria de referencia" },
    ],
  },
  {
    id: "equipo",
    title: "Equipo y paseo",
    iconName: "shieldCheck",
    fields: [
      { key: "equipo", label: "Con qué sale", placeholder: "Collar, pechera, correa…" },
      { key: "bozal", label: "Bozal", options: ["No usa bozal", "Usa bozal"] },
      {
        key: "retiro",
        label: "Indicaciones para el retiro y la entrega",
        textarea: true,
        placeholder: "Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.",
      },
    ],
  },
  {
    id: "comportamiento",
    title: "Comportamiento y control",
    iconName: "eye",
    hint: "Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.",
    fields: [
      { key: "otrosPerros", label: "Con otros perros", textarea: true, placeholder: "Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente." },
      { key: "personas", label: "Con personas y chicos", textarea: true },
      { key: "estimulos", label: "Qué lo pone nervioso o le da miedo", placeholder: "Motos, ruidos fuertes, bicicletas…" },
      { key: "correa", label: "En la correa", placeholder: "Si tira o si vuelve al llamarlo" },
      { key: "noJuntar", label: "Perros con los que no debe juntarse", placeholder: "Si no hay, escribí “ninguno”" },
    ],
  },
  {
    id: "emergencia",
    title: "Contacto de emergencia",
    iconName: "users",
    hint: "Alguien a quien llamar si no te encontramos a vos.",
    fields: [
      { key: "contactoNombre", label: "Nombre" },
      { key: "contactoRelacion", label: "Relación", placeholder: "Familiar, vecino, amigo…" },
      { key: "contactoTelefono", label: "Teléfono", type: "tel", autocomplete: "tel" },
    ],
  },
];

const ALL_FIELDS = FICHA_GROUPS.flatMap((group) => group.fields);

function filled(ficha, key) {
  return Boolean(String(ficha[key] ?? "").trim());
}

function groupProgress(ficha, group) {
  return group.fields.filter((field) => filled(ficha, field.key)).length;
}

function fichaProgress(ficha) {
  return ALL_FIELDS.filter((field) => filled(ficha, field.key)).length;
}

function safetyAlerts(ficha) {
  const alerts = [];
  if (ficha.bozal === "Usa bozal") alerts.push("Usa bozal");
  const noJuntar = String(ficha.noJuntar ?? "").trim();
  if (noJuntar && !/^ningun[oa]?\.?$/i.test(noJuntar)) alerts.push(`No juntar con: ${noJuntar}`);
  return alerts;
}

// Máximo 3 pendientes, ordenados por seguridad primero.
function pendingItems(ctx) {
  const { ficha } = ctx;
  const items = [];
  const emergencia = FICHA_GROUPS.find((group) => group.id === "emergencia");
  if (groupProgress(ficha, emergencia) < emergencia.fields.length) {
    items.push({ text: "Cargá un contacto de emergencia", detail: "Por si no te encontramos durante el paseo.", go: "ficha-emergencia" });
  }
  if (!getCarnet()) {
    items.push({ text: "Subí el carnet de vacunas", detail: "Foto o PDF. Lo revisamos antes de los paseos en grupo.", go: "cl-vacunas" });
  }
  const done = fichaProgress(ficha);
  if (done < ALL_FIELDS.length) {
    items.push({ text: "Completá la ficha de tu perro", detail: `Tenés ${done} de ${ALL_FIELDS.length} datos cargados.`, go: "cl-ficha" });
  }
  return items.slice(0, 3);
}

function isPromoActive(ctx) {
  return ctx.todayIso <= PROMO.until;
}

// ---------------------------------------------------------------------------
// Estado de la vista (sobrevive a los re-render globales)
// ---------------------------------------------------------------------------

const ui = {
  status: {},
  openGroups: new Set(["identificacion"]),
  resetArmed: false,
};

function setStatus(region, message, html = "") {
  ui.status[region] = { message, html };
}

function statusRegion(region) {
  const status = ui.status[region];
  const text = status ? `${esc(status.message)} ${status.html}`.trim() : "";
  return `<p class="cl-status" role="status" aria-live="polite" data-cl-status="${region}">${text}</p>`;
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

export function clientDashboard() {
  const ctx = getContext();
  return `
    <div class="cl-page" data-cl-root>
      ${pageContent(ctx)}
    </div>
  `;
}

function pageContent(ctx) {
  return `
    <p class="cl-demo-note">
      ${icon("help", "cl-icon-sm")}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${todaySection(ctx)}
    ${quickActions(ctx)}
    <div class="cl-more-list" aria-label="Más opciones">
      ${morePanel("cl-detalle-hoy", "calendarCheck", "Detalle de hoy", todayDetails(ctx))}
      ${morePanel("cl-ausencia", "bell", "Ausencias", absenceSection(ctx))}
      ${morePanel("cl-vacunas", "fileUp", "Carnet de vacunas", vaccineSection())}
      ${morePanel("cl-plan", "calendarCheck", "Mi plan", planSection(ctx))}
      ${morePanel("cl-ficha", "fileText", "Ficha de mi perro", fichaSection(ctx))}
      ${morePanel("cl-pagos", "wallet", "Pagos y comprobantes", paymentSection(ctx))}
      ${isPromoActive(ctx) ? morePanel("cl-promo", "medal", "Promo", promoSection()) : ""}
      ${morePanel("cl-accesibilidad", "eye", "Accesibilidad", accessibilityNote())}
      ${morePanel("cl-privacidad", "lock", "Mis datos", privacySection())}
    </div>
  `;
}

function todayDetails(ctx) {
  const status = todayStatus(ctx);
  const steps = ["Programado", "Turno en curso", "Turno terminado"];
  const pending = pendingItems(ctx);
  return `
    <section class="cl-card cl-section" aria-labelledby="cl-detail-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${icon("calendarCheck", "cl-icon")}</span>
        <div>
          <h2 id="cl-detail-title" class="cl-h2" tabindex="-1">Detalle de hoy</h2>
          <p>Estado según el horario del turno.</p>
        </div>
      </header>
      ${status.step >= 0 ? `
        <ol class="cl-steps" aria-label="Estado del paseo según el horario del turno">
          ${steps.map((step, index) => `
            <li class="${index < status.step ? "is-done" : ""} ${index === status.step ? "is-current" : ""}" ${index === status.step ? 'aria-current="step"' : ""}>
              <span class="cl-step-dot" aria-hidden="true"></span>
              <span>${step}</span>
            </li>
          `).join("")}
        </ol>
      ` : ""}
      ${weekStrip(ctx)}
      <div class="cl-pending" data-cl-region="pendientes">${pendingList(ctx, pending)}</div>
    </section>
  `;
}

function morePanel(id, iconName, label, content) {
  const open = ui.openGroups.has(id);
  return `
    <details class="cl-more" id="${id}" data-cl-details="${id}" ${open ? "open" : ""}>
      <summary>
        <span class="cl-more-icon">${icon(iconName, "cl-icon")}</span>
        <span><strong>${label}</strong><small>Más</small></span>
        ${icon("chevronDown", "cl-icon-sm cl-chevron")}
      </summary>
      <div class="cl-more-body">${content}</div>
    </details>
  `;
}

function todaySection(ctx) {
  const { shift, settings, dogName, ficha } = ctx;
  const status = todayStatus(ctx);
  const alerts = safetyAlerts(ficha);
  const next = upcomingWalks(ctx, 1)[0];
  const nextIsToday = next && isoDate(next) === ctx.todayIso;
  const dogPhoto = getDogPhoto();
  const initial = dogName.trim().charAt(0).toUpperCase() || "P";
  const shortStatus = status.kind === "terminado"
    ? "Ya volvió"
    : status.kind === "libre" || status.kind === "ausente"
      ? "No sale hoy"
      : `Sale hoy · Turno ${settings.shift.toLowerCase()}`;

  const statusText = {
    libre: `Los días de paseo de tu plan son ${listJoin(settings.days.map((d) => d.toLowerCase()))}.`,
    ausente: "Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.",
    programado: `Sale en el turno ${settings.shift.toLowerCase()}, entre las ${shift.from} y las ${shift.to}.`,
    "en-curso": "En horario del turno",
    terminado: `El turno ${settings.shift.toLowerCase()} terminó a las ${shift.to}. Si no te llegó el aviso de entrega, escribinos.`,
  }[status.kind];

  return `
    <section class="cl-today" aria-labelledby="cl-today-heading">
      <div class="cl-today-main cl-card">
        <p class="cl-eyebrow" id="cl-today-heading">Hoy</p>
        <div class="cl-dog-hero">
          <div class="cl-photo-wrap">
            ${dogPhoto
              ? `<img class="cl-dog-photo" src="${dogPhoto}" alt="Foto de ${esc(dogName)}" />`
              : `<span class="cl-avatar" aria-label="Sin foto">${esc(initial)}</span>`}
            <input id="cl-dog-photo" class="cl-file-input" type="file" accept="image/*" capture="environment" data-cl-dog-photo />
            <label class="cl-photo-btn" for="cl-dog-photo">${dogPhoto ? "Cambiar foto" : "Sumar foto"}</label>
          </div>
          <div class="cl-dog-main">
            <h1 class="cl-dog-name" data-cl-dogname>${esc(dogName)}</h1>
            <p class="cl-status-chip is-${status.kind}">${esc(shortStatus)}</p>
            <p class="cl-today-line">${esc(statusText)}</p>
          </div>
        </div>
        ${statusRegion("foto")}
        <div class="cl-next-inline">
          <span>${icon("calendarCheck", "cl-icon-sm")} Próximo paseo</span>
          <strong>${next ? `${nextIsToday ? "Hoy" : esc(dayName(next))} · ${formatDate(next)} · ${esc(settings.shift)}` : PENDIENTE}</strong>
        </div>
        <div data-cl-region="alertas-hoy">${alertsBlock(alerts, true)}</div>
      </div>
    </section>
  `;
}

function pendingList(ctx, pending = pendingItems(ctx)) {
  if (!pending.length) {
    return `<p class="cl-all-done">${icon("checkCircle", "cl-icon-sm")} Todo al día. Gracias por mantener la ficha completa.</p>`;
  }
  return `
    <ol class="cl-pending-list">
      ${pending.map((item, index) => `
        <li>
          <button type="button" class="cl-pending-item" data-cl-go="${item.go}">
            <span class="cl-pending-num" aria-hidden="true">${index + 1}</span>
            <span>
              <strong>${esc(item.text)}</strong>
              <small>${esc(item.detail)}</small>
            </span>
            ${icon("arrowRight", "cl-icon-sm")}
          </button>
        </li>
      `).join("")}
    </ol>
  `;
}

function alertsBlock(alerts, compact = false) {
  if (!alerts.length) return "";
  return `
    <div class="cl-alert ${compact ? "is-compact" : ""}" role="note" aria-label="Alertas de seguridad">
      ${icon("alertTriangle", "cl-icon")}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${alerts.map((alert) => `<li>${esc(alert)}</li>`).join("")}</ul>
      </div>
    </div>
  `;
}

function weekStrip(ctx) {
  const { now, settings, absentDates, todayIso } = ctx;
  const monday = addDays(now.date, -((now.date.getUTCDay() + 6) % 7));
  const days = WEEK_DAYS.map((_, index) => addDays(monday, index));
  return `
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${days.map((date) => {
          const iso = isoDate(date);
          const name = dayName(date);
          const walks = settings.days.includes(name);
          const absent = walks && absentDates.has(iso);
          const isToday = iso === todayIso;
          const label = absent ? "ausencia avisada" : walks ? "con paseo" : "sin paseo";
          return `
            <li class="${walks ? "has-walk" : ""} ${absent ? "is-absent" : ""} ${isToday ? "is-today" : ""}" aria-label="${name} ${formatDate(date)}: ${label}${isToday ? " (hoy)" : ""}">
              <span aria-hidden="true">${shortDay(name)}</span>
              <b aria-hidden="true">${date.getUTCDate()}</b>
              <i aria-hidden="true">${absent ? "Ausente" : walks ? "Paseo" : "—"}</i>
            </li>
          `;
        }).join("")}
      </ul>
    </div>
  `;
}

function quickActions(ctx) {
  const actions = [
    { label: "Avisar ausencia", go: "cl-ausencia", iconName: "bell" },
    { label: "Carnet de vacunas", go: "cl-vacunas", iconName: "fileUp" },
    { label: "Mi plan", go: "cl-plan", iconName: "calendarCheck" },
  ];
  return `
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${actions.map((action) => `
        <button type="button" class="cl-quick-btn" data-cl-go="${action.go}">
          ${icon(action.iconName, "cl-icon")}
          <span>${action.label}</span>
        </button>
      `).join("")}
      <a class="cl-quick-btn is-whatsapp" href="${waLink("Hola, tengo una consulta sobre los paseos de mi perro.")}" target="_blank" rel="noreferrer">
        ${icon("message", "cl-icon")}
        <span>WhatsApp</span>
      </a>
    </nav>
  `;
}

function accessibilityNote() {
  return `
    <p class="cl-a11y-note">Modo oscuro y modo calmo: botón redondo abajo a la izquierda.</p>
  `;
}

function absenceSection(ctx) {
  const options = upcomingWalks(ctx, 10);
  return `
    <section class="cl-card cl-section" aria-labelledby="cl-ausencia-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${icon("bell", "cl-icon")}</span>
        <div>
          <h2 id="cl-ausencia-title" class="cl-h2" tabindex="-1">Avisar una ausencia</h2>
          <p>Si tu perro no puede salir algún día, avisanos con tiempo así reorganizamos el grupo.</p>
        </div>
      </header>
      <div class="cl-absence-grid">
        <div class="cl-form">
          ${options.length ? `
            <label for="cl-absence-date">Día que no sale
              <select id="cl-absence-date" data-cl-absence-date>
                ${options.map((date) => `<option value="${isoDate(date)}">${esc(dayName(date))} ${formatDate(date)} · turno ${esc(ctx.settings.shift.toLowerCase())}</option>`).join("")}
              </select>
            </label>
            <label for="cl-absence-reason"><span>Motivo <span class="cl-optional">(opcional)</span></span>
              <input id="cl-absence-reason" type="text" maxlength="140" placeholder="Por ejemplo: viaje" data-cl-absence-reason />
            </label>
            <button type="button" class="cl-btn" data-cl-absence-save>
              ${icon("message", "cl-icon-sm")} Avisar por WhatsApp
            </button>
            <p class="cl-fine">Se abre WhatsApp con el mensaje listo: solo tenés que tocar Enviar. El aviso también queda anotado en este dispositivo.</p>
          ` : `<p>${PENDIENTE}: no hay próximos paseos con los días de tu plan.</p>`}
          ${statusRegion("ausencia")}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${ctx.absences.length ? `
            <ul class="cl-list">
              ${ctx.absences.map((item) => `
                <li>
                  <span>
                    <strong>${esc(dayName(dateFromIso(item.date)))} ${formatIso(item.date)}</strong>
                    ${item.reason ? `<small>${esc(item.reason)}</small>` : ""}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${esc(item.date)}" aria-label="Quitar la ausencia del ${formatIso(item.date)}">Quitar</button>
                </li>
              `).join("")}
            </ul>
          ` : `<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `;
}

function planSection(ctx) {
  const { plan, settings, shift } = ctx;
  const daysOk = settings.days.length === plan.walks;
  return `
    <section class="cl-card cl-section" aria-labelledby="cl-plan-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${icon("calendarCheck", "cl-icon")}</span>
        <div>
          <h2 id="cl-plan-title" class="cl-h2" tabindex="-1">Tu plan</h2>
          <p>Precios oficiales por semana y por perro, según el tamaño.</p>
        </div>
      </header>

      <div class="cl-plan-summary">
        <div class="cl-plan-main">
          <p class="cl-eyebrow">Plan contratado (ejemplo)</p>
          <p class="cl-plan-name">${esc(plan.name)}</p>
          <p class="cl-plan-walks">${plural(plan.walks, "paseo", "paseos")} por semana · ${esc(settings.size)}</p>
          <p class="cl-plan-price"><b>${formatPeso(plan.prices[settings.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${PLAN_DAYS.map((day) => `<li class="${settings.days.includes(day) ? "is-on" : ""}" aria-label="${day}: ${settings.days.includes(day) ? "contratado" : "no contratado"}"><span aria-hidden="true">${shortDay(day)}</span></li>`).join("")}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${esc(settings.shift)} · ${shift.from} a ${shift.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${PENDIENTE}</dd></div>
        </dl>
      </div>
      ${daysOk ? "" : `<p class="cl-warning">${icon("alertCircle", "cl-icon-sm")} El ${esc(plan.name)} incluye ${plural(plan.walks, "paseo", "paseos")} por semana y hay ${plural(settings.days.length, "día cargado", "días cargados")}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${esc(settings.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${REAL_PLANS.map((item) => `
          <li class="cl-plan-card ${item.id === plan.id ? "is-current" : ""}">
            ${item.id === plan.id ? `<span class="cl-badge">Tu plan</span>` : ""}
            <strong>${esc(item.name)}</strong>
            <span>${plural(item.walks, "paseo", "paseos")} por semana</span>
            <b>${formatPeso(item.prices[settings.size])}</b>
            <small>por semana</small>
          </li>
        `).join("")}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto en grupo (${esc(settings.size.toLowerCase())}):</strong> ${formatPeso(REAL_SINGLE_WALK[settings.size].grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${MULTI_DOG_DISCOUNTS.map((item) => `${item.dogs} perros ${item.discount}`).join(" · ")} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${ui.openGroups.has("plan") ? "open" : ""}>
        <summary>${icon("sliders", "cl-icon-sm")} Probar con otro plan (solo vista previa)</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${REAL_PLANS.map((item) => `<option value="${item.id}" ${item.id === plan.id ? "selected" : ""}>${esc(item.name)} · ${plural(item.walks, "paseo", "paseos")}</option>`).join("")}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${SIZES.map((size) => `<option ${size === settings.size ? "selected" : ""}>${size}</option>`).join("")}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(SHIFT_BY_LABEL).map(([label, item]) => `<option value="${label}" ${label === settings.shift ? "selected" : ""}>${label} (${item.from} a ${item.to})</option>`).join("")}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${PLAN_DAYS.map((day) => `
                <label class="cl-check">
                  <input type="checkbox" value="${day}" data-cl-plan-day ${settings.days.includes(day) ? "checked" : ""} />
                  <span>${day}</span>
                </label>
              `).join("")}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${statusRegion("plan")}
        </div>
      </details>
    </section>
  `;
}

function fichaSection(ctx) {
  const { ficha } = ctx;
  const done = fichaProgress(ficha);
  const total = ALL_FIELDS.length;
  return `
    <section class="cl-card cl-section" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${icon("fileText", "cl-icon")}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${esc(ctx.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Si todavía no cargaste información, vas a ver “Sin cargar”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${fichaProgressBlock(done, total)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${esc(CATEGORIES["SIN EVALUAR"])} Evaluación pendiente: antes de sumarlo al grupo, coordinamos una evaluación inicial para conocerlo.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${alertsBlock(safetyAlerts(ficha))}</div>

      <div class="cl-ficha-groups">
        ${FICHA_GROUPS.map((group) => fichaGroup(group, ficha)).join("")}
      </div>
      ${statusRegion("ficha")}
    </section>
  `;
}

function fichaProgressBlock(done, total) {
  const percent = Math.round((done / total) * 100);
  return `
    <p class="cl-progress-label"><strong>${done} de ${total}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}" aria-valuetext="${done} de ${total} datos cargados">
      <span style="width:${percent}%"></span>
    </div>
  `;
}

function groupCountLabel(ficha, group) {
  const count = groupProgress(ficha, group);
  if (count === group.fields.length) return `<span class="cl-count is-done">${icon("checkCircle", "cl-icon-xs")} Completo</span>`;
  return `<span class="cl-count">${count} de ${group.fields.length}</span>`;
}

function fichaGroup(group, ficha) {
  const open = ui.openGroups.has(group.id);
  return `
    <details class="cl-group" id="ficha-${group.id}" data-cl-details="${group.id}" ${open ? "open" : ""}>
      <summary>
        <span class="cl-group-icon">${icon(group.iconName, "cl-icon-sm")}</span>
        <span class="cl-group-title">${group.title}</span>
        <span data-cl-count="${group.id}">${groupCountLabel(ficha, group)}</span>
        ${icon("chevronDown", "cl-icon-sm cl-chevron")}
      </summary>
      <div class="cl-group-body">
        ${group.hint ? `<p class="cl-fine">${group.hint}</p>` : ""}
        <div class="cl-fields">
          ${group.fields.map((field) => fichaField(field, ficha)).join("")}
        </div>
      </div>
    </details>
  `;
}

function fichaField(field, ficha) {
  const id = `cl-f-${field.key}`;
  const value = ficha[field.key] ?? "";
  const wide = field.textarea ? "is-wide" : "";
  let control;
  if (field.options) {
    control = `
      <select id="${id}" data-cl-ficha="${field.key}">
        <option value="">Elegí una opción</option>
        ${field.options.map((option) => `<option ${option === value ? "selected" : ""}>${esc(option)}</option>`).join("")}
      </select>
    `;
  } else if (field.textarea) {
    control = `<textarea id="${id}" rows="3" maxlength="600" data-cl-ficha="${field.key}" placeholder="${esc(field.placeholder || "Escribí acá")}">${esc(value)}</textarea>`;
  } else {
    control = `<input id="${id}" type="${field.type || "text"}" maxlength="140" ${field.autocomplete ? `autocomplete="${field.autocomplete}"` : 'autocomplete="off"'} data-cl-ficha="${field.key}" value="${esc(value)}" placeholder="${esc(field.placeholder || "Escribí acá")}" />`;
  }
  return `
    <label class="cl-field ${wide}" for="${id}">
      <span>${field.label}</span>
      ${control}
    </label>
  `;
}

function vaccineSection() {
  const carnet = getCarnet();
  return `
    <section class="cl-card cl-section" aria-labelledby="cl-vacunas-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${icon(carnet ? "fileCheck" : "uploadCloud", "cl-icon")}</span>
        <div>
          <h2 id="cl-vacunas-title" class="cl-h2" tabindex="-1">Carnet de vacunas</h2>
          <p>Subí una foto o PDF del carnet. Lo revisamos antes de los paseos en grupo.</p>
        </div>
      </header>
      <div class="cl-upload">
        <input id="cl-vaccine-file" class="cl-file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" data-cl-file="carnet" />
        <label for="cl-vaccine-file" class="cl-upload-box">
          ${icon("fileUp", "cl-icon")}
          <strong>${carnet ? "Cambiar archivo" : "Elegir foto o PDF"}</strong>
          <small>JPG, PNG o PDF</small>
        </label>
      </div>
      <dl class="cl-file-status">
        <div><dt>Archivo</dt><dd>${carnet ? esc(carnet.name) : "Sin archivo"}</dd></div>
        <div><dt>Estado</dt><dd>${carnet ? `Pendiente de revisión · cargado el ${esc(carnet.date)}` : PENDIENTE}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${waLink("Hola, te mando el carnet de vacunas de mi perro.")}" target="_blank" rel="noreferrer">
        ${icon("message", "cl-icon-sm")} Mandar carnet por WhatsApp
      </a>
      ${statusRegion("carnet")}
    </section>
  `;
}

function paymentSection(ctx) {
  const receipts = getFileList(KEYS.comprobantes);
  return `
    <section class="cl-card cl-section" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${icon("wallet", "cl-icon")}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${formatPeso(ctx.plan.prices[ctx.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${waLink("Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?")}" target="_blank" rel="noreferrer">
        ${icon("message", "cl-icon-sm")} Pedir alias y detalle por WhatsApp
      </a>
      <p class="cl-fine"><strong>Después mandanos la imagen por WhatsApp.</strong></p>
      <a class="cl-btn is-secondary" href="${waLink("Hola, te mando la imagen del comprobante para que la revisen.")}" target="_blank" rel="noreferrer">
        ${icon("message", "cl-icon-sm")} Mandar imagen por WhatsApp
      </a>
      <div class="cl-upload">
        <input id="cl-receipt-file" class="cl-file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" data-cl-file="comprobante" />
        <label for="cl-receipt-file" class="cl-upload-box is-small">
          ${icon("receipt", "cl-icon")}
          <strong>Subir comprobante</strong>
          <small>JPG, PNG o PDF</small>
        </label>
      </div>
      ${receipts.length ? `
        <ul class="cl-list" aria-label="Comprobantes cargados">
          ${receipts.slice(0, 5).map((item) => `
            <li>
              <span><strong>${esc(item.name)}</strong><small>Cargado el ${esc(item.date)} · Pendiente de confirmación</small></span>
            </li>
          `).join("")}
        </ul>
        <a class="cl-btn is-secondary" href="${waLink("Hola, te mando el comprobante de pago del plan de mi perro.")}" target="_blank" rel="noreferrer">
          ${icon("message", "cl-icon-sm")} Mandar comprobante por WhatsApp
        </a>
      ` : `<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${statusRegion("comprobante")}
    </section>
  `;
}

function promoSection() {
  return `
    <section class="cl-card cl-section cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${icon("medal", "cl-icon")}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${esc(PROMO.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${esc(PROMO.title)}</h2>
        <p>${esc(PROMO.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${waLink("Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.")}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `;
}

function privacySection() {
  return `
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${icon("lock", "cl-icon-sm")} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${ui.resetArmed ? "is-danger" : ""}" data-cl-reset>
        ${ui.resetArmed ? "Tocá de nuevo para borrar todo" : "Borrar mis datos de este dispositivo"}
      </button>
      ${statusRegion("privacidad")}
    </section>
  `;
}

// ---------------------------------------------------------------------------
// Actualización de la página sin re-render global (mantiene foco y scroll)
// ---------------------------------------------------------------------------

function refreshPage(focusSelector) {
  const root = document.querySelector("[data-cl-root]");
  if (!root) return;
  const active = document.activeElement;
  const activeId = active?.id;
  root.innerHTML = pageContent(getContext());
  const target = (focusSelector && root.querySelector(focusSelector)) || (activeId && document.getElementById(activeId));
  target?.focus({ preventScroll: true });
}

function refreshFichaParts() {
  const root = document.querySelector("[data-cl-root]");
  if (!root) return;
  const ctx = getContext();
  const regions = {
    pendientes: () => pendingList(ctx),
    "alertas-hoy": () => alertsBlock(safetyAlerts(ctx.ficha), true),
    "alertas-ficha": () => alertsBlock(safetyAlerts(ctx.ficha)),
    "ficha-progreso": () => fichaProgressBlock(fichaProgress(ctx.ficha), ALL_FIELDS.length),
  };
  Object.entries(regions).forEach(([name, build]) => {
    root.querySelectorAll(`[data-cl-region="${name}"]`).forEach((element) => {
      element.innerHTML = build();
    });
  });
  FICHA_GROUPS.forEach((group) => {
    const element = root.querySelector(`[data-cl-count="${group.id}"]`);
    if (element) element.innerHTML = groupCountLabel(ctx.ficha, group);
  });
  root.querySelectorAll("[data-cl-dogname]").forEach((element) => {
    element.textContent = ctx.dogName;
  });
}

function showStatus(region, message, html = "") {
  setStatus(region, message, html);
  const element = document.querySelector(`[data-cl-status="${region}"]`);
  if (element) element.innerHTML = `${esc(message)} ${html}`.trim();
}

function goTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (target.tagName === "DETAILS") {
    target.open = true;
    ui.openGroups.add(target.dataset.clDetails);
  }
  target.scrollIntoView({ behavior: isCalmMotion() ? "auto" : "smooth", block: "start" });
  const focusable = target.matches("details")
    ? target.querySelector("input, select, textarea")
    : target.querySelector("[tabindex='-1']");
  focusable?.focus({ preventScroll: true });
}

function todayLabel() {
  return formatDate(argentinaNow().date);
}

function resizeDogPhoto(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("El archivo no es una imagen."));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No pudimos leer la imagen."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("No pudimos abrir la imagen."));
      image.onload = () => {
        const scale = Math.min(1, 240 / Math.max(image.naturalWidth, image.naturalHeight));
        const width = Math.max(1, Math.round(image.naturalWidth * scale));
        const height = Math.max(1, Math.round(image.naturalHeight * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// ---------------------------------------------------------------------------
// Eventos
// ---------------------------------------------------------------------------

function handleClienteClick(event) {
  if (!event.target.closest("[data-cl-root]")) return false;

  const go = event.target.closest("[data-cl-go]");
  if (go) {
    goTo(go.dataset.clGo);
    return true;
  }

  if (event.target.closest("[data-cl-open-a11y]")) {
    // Se abre después de este click: si no, el mismo click cerraría el panel.
    setTimeout(() => {
      const panel = document.getElementById("a11y-panel");
      if (panel && !panel.hidden) {
        panel.querySelector(".a11y-option.is-active")?.focus();
        return;
      }
      document.querySelector(".a11y-toggle")?.click();
    }, 0);
    return true;
  }

  if (event.target.closest("[data-cl-absence-save]")) {
    const date = document.querySelector("[data-cl-absence-date]")?.value;
    const reason = document.querySelector("[data-cl-absence-reason]")?.value?.trim() || "";
    if (!date) return true;
    const ctx = getContext();
    const absences = getAbsences().filter((item) => item.date !== date);
    absences.push({ date, reason });
    writeJSON(KEYS.ausencias, absences);
    const name = ctx.dogName === DEFAULT_DOG_NAME ? "mi perro" : `mi perro ${ctx.dogName}`;
    const message = [
      `Hola, aviso que ${name} no sale al paseo el ${dayName(dateFromIso(date)).toLowerCase()} ${formatIso(date)} (turno ${ctx.settings.shift.toLowerCase()}).`,
      reason ? `Motivo: ${reason}.` : "",
      "¡Gracias!",
    ].filter(Boolean).join(" ");
    const link = waLink(message);
    window.open(link, "_blank", "noopener");
    setStatus(
      "ausencia",
      `Listo: anotamos la ausencia del ${formatIso(date)}. Si WhatsApp no se abrió,`,
      `<a href="${link}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`,
    );
    refreshPage("[data-cl-status='ausencia']");
    return true;
  }

  const remove = event.target.closest("[data-cl-absence-remove]");
  if (remove) {
    const date = remove.dataset.clAbsenceRemove;
    writeJSON(KEYS.ausencias, getAbsences().filter((item) => item.date !== date));
    setStatus("ausencia", `Quitamos la ausencia del ${formatIso(date)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`);
    refreshPage("#cl-ausencia-title");
    return true;
  }

  if (event.target.closest("[data-cl-plan-save]")) {
    const field = (name) => document.querySelector(`[data-cl-plan-field="${name}"]`)?.value;
    const days = [...document.querySelectorAll("[data-cl-plan-day]:checked")].map((input) => input.value);
    const planId = field("planId");
    const plan = REAL_PLANS.find((item) => item.id === planId);
    if (!days.length) {
      showStatus("plan", "Elegí al menos un día de paseo.");
      return true;
    }
    if (plan && days.length !== plan.walks) {
      showStatus("plan", `El ${plan.name} incluye ${plural(plan.walks, "paseo", "paseos")} por semana: elegí ${plural(plan.walks, "día", "días")} (marcaste ${days.length}).`);
      return true;
    }
    writeJSON(KEYS.plan, { planId, size: field("size"), shift: field("shift"), days });
    setStatus("plan", "Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.");
    refreshPage("[data-cl-plan-save]");
    return true;
  }

  if (event.target.closest("[data-cl-reset]")) {
    if (!ui.resetArmed) {
      ui.resetArmed = true;
      refreshPage("[data-cl-reset]");
      return true;
    }
    Object.values(KEYS).forEach((key) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // Sin almacenamiento disponible: no hay nada que borrar.
      }
    });
    ui.resetArmed = false;
    ui.status = {};
    setStatus("privacidad", "Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.");
    refreshPage("[data-cl-reset]");
    return true;
  }

  if (ui.resetArmed && !event.target.closest("[data-cl-reset]")) {
    ui.resetArmed = false;
    const button = document.querySelector("[data-cl-reset]");
    if (button) {
      button.classList.remove("is-danger");
      button.textContent = "Borrar mis datos de este dispositivo";
    }
  }

  return false;
}

// Archivos: se anota solo el nombre y la fecha (el archivo no sale del dispositivo).
async function handleClienteChange(event) {
  const dogPhotoInput = event.target.closest("[data-cl-dog-photo]");
  if (dogPhotoInput) {
    const file = dogPhotoInput.files?.[0];
    if (!file) return false;
    try {
      const dataUrl = await resizeDogPhoto(file);
      localStorage.setItem(KEYS.foto, dataUrl);
      setStatus("foto", "Foto guardada solo en este dispositivo.");
    } catch {
      setStatus("foto", "No pudimos guardar la foto. Probá con otra imagen.");
    }
    refreshPage("[data-cl-status='foto']");
    return false;
  }

  const input = event.target.closest("[data-cl-file]");
  if (input) {
    const file = input.files?.[0];
    if (!file) return false;
    const entry = { name: file.name, date: todayLabel() };
    if (input.dataset.clFile === "carnet") {
      writeJSON(KEYS.carnet, entry);
      setStatus("carnet", `Anotamos “${file.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`);
      refreshPage("[data-cl-status='carnet']");
    } else {
      const list = [entry, ...getFileList(KEYS.comprobantes)].slice(0, 10);
      writeJSON(KEYS.comprobantes, list);
      setStatus("comprobante", `Anotamos “${file.name}”. Mandalo por WhatsApp así lo confirmamos.`);
      refreshPage("[data-cl-status='comprobante']");
    }
    return false;
  }

  const fichaInput = event.target.closest("[data-cl-ficha]");
  if (fichaInput) {
    const ficha = getFicha();
    const ok = writeJSON(KEYS.ficha, { ...ficha, [fichaInput.dataset.clFicha]: fichaInput.value.trim() });
    showStatus("ficha", ok ? "Ficha guardada en este dispositivo." : "No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.");
  }
  return false;
}

// Guardado mientras se escribe, sin mover el foco.
function handleClienteInput(event) {
  const fichaInput = event.target.closest?.("[data-cl-ficha]");
  if (!fichaInput) return;
  const ficha = getFicha();
  writeJSON(KEYS.ficha, { ...ficha, [fichaInput.dataset.clFicha]: fichaInput.value.trim() });
  refreshFichaParts();
}

// Recordar qué grupos de la ficha quedaron abiertos.
function handleClienteToggle(event) {
  const details = event.target;
  if (!(details instanceof HTMLDetailsElement) || !details.dataset.clDetails) return;
  if (details.open) ui.openGroups.add(details.dataset.clDetails);
  else ui.openGroups.delete(details.dataset.clDetails);
}

export function registerClienteEvents() {
  clickHandlers.push(handleClienteClick);
  changeHandlers.push(handleClienteChange);
  document.addEventListener("input", handleClienteInput);
  document.addEventListener("toggle", handleClienteToggle, true);
}
