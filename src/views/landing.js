// Página pública de presentación (/): todo lo que abarca Paseos Juan, sin precios.
// Los precios están en /precios (views/precios.js) y la tienda en /tienda (views/tienda.js).
import { BUSINESS, PROMO } from "../data/mock.js";
import { whatsappLink, icon, faqItem } from "../ui/shared.js";
import { state } from "../state.js";
import { enviarEvaluacion, prepararArchivo, botonGoogle } from "../api/client.js";

const WHATSAPP_INFO = "Hola, quiero información sobre Paseos Juan.";

function isPromoActive(now = new Date()) {
  return now <= new Date(`${PROMO.until}T23:59:59-03:00`);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

// ---------- Encabezado y menú de las páginas públicas (presentación y precios) ----------

const PUBLIC_MENU = [
  ["Inicio", "/", "home"],
  ["Servicios", "/#servicios", "pawPrint"],
  ["Precios", "/precios", "dollarSign"],
  ["Tienda", "/tienda", "shoppingBag"],
  ["Cómo trabajamos", "/#como-trabajamos", "shieldCheck"],
  ["Preguntas frecuentes", "/#faq", "help"],
  ["Pedí tu evaluación", "/#evaluacion", "clipboardCheck"],
  ["Ingresar (equipo)", "/login", "logIn"],
];

export function publicShell(content, current = "/") {
  return `
    <header class="topbar ${state.menuOpen ? "menu-is-open" : ""}">
      <a class="brand" href="/" data-link aria-label="Paseos Juan, ir al inicio">
        <span class="brand-mark"><img src="/paseos-juan-logo.png" alt="" /></span>
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <div class="header-actions">
        <a class="header-link ${current === "/precios" ? "is-current" : ""}" href="/precios" data-link ${current === "/precios" ? 'aria-current="page"' : ""}>Precios</a>
        <a class="header-link" href="/tienda" data-link>Tienda</a>
        <a class="header-cta" href="/#evaluacion" data-link>Pedí tu evaluación</a>
        <button class="menu-button ${state.menuOpen ? "is-open" : ""}" type="button" data-menu-toggle aria-expanded="${state.menuOpen}" aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <div class="menu-backdrop ${state.menuOpen ? "is-open" : ""}" data-menu-close></div>
    <aside class="mobile-menu ${state.menuOpen ? "is-open" : ""}" aria-hidden="${!state.menuOpen}">
      <div class="mobile-menu-head">
        <a class="menu-brand" href="/" data-link>
          <img src="/paseos-juan-logo.png" alt="" />
          <span><strong>Paseos Juan</strong><small>Más que un simple paseo</small></span>
        </a>
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menú">${icon("x")}</button>
      </div>
      <nav class="menu-nav" aria-label="Menú principal">
        ${PUBLIC_MENU.map(([label, href, iconName]) => `
          <a href="${href}" data-link ${href === current ? 'aria-current="page"' : ""}>
            <span>${icon(iconName, "menu-icon")}</span>
            ${label}
          </a>
        `).join("")}
      </nav>
      <a class="menu-evaluation" href="/precios" data-link>Ver precios</a>
      <a class="menu-whatsapp" href="${whatsappLink(WHATSAPP_INFO)}" target="_blank" rel="noreferrer">WhatsApp ${BUSINESS.whatsappLabel}</a>
    </aside>
    <div class="smooth-wrapper">${content}</div>
  `;
}

export function publicFooter() {
  return `
    <footer class="footer reveal">
      <a class="menu-brand" href="/" data-link>
        <img src="/paseos-juan-logo.png" alt="" />
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <nav class="footer-links" aria-label="Páginas">
        <a href="/#servicios" data-link>Servicios</a>
        <a href="/precios" data-link>Precios</a>
        <a href="/tienda" data-link>Tienda</a>
      </nav>
      <p>Paseos grupales, baños y más. ${BUSINESS.zone}.</p>
      <a class="footer-whatsapp" href="${whatsappLink(WHATSAPP_INFO)}" target="_blank" rel="noreferrer">WhatsApp ${BUSINESS.whatsappLabel}</a>
    </footer>
  `;
}

// ---------- Presentación ----------

export function landingPage() {
  return publicShell(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${HeroSection()}
      ${ServicesSection()}
      ${PricesStrip()}
      ${HowWeWorkSection()}
      ${TrustSection()}
      ${CTASection()}
      ${publicFooter()}
      <a class="whatsapp" href="${whatsappLink(WHATSAPP_INFO)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `);
}

function HeroSection() {
  return `
    <section class="hero" id="inicio">
      <div class="hero-pattern" aria-hidden="true"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Paseos · Baños · Estadía · Tienda</p>
        <h1>
          <span>Disciplina.</span>
          <span>Libertad.</span>
          <span>Bienestar.</span>
        </h1>
        <p>
          Paseos grupales organizados por conducta, energía y compatibilidad. Cuidado y confianza
          como en casa, en ${BUSINESS.zone}.
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="#evaluacion" data-link>Pedí tu evaluación</a>
          <a class="secondary-button" href="#servicios" data-link>Ver servicios</a>
        </div>
      </div>
      <div class="hero-media reveal">
        <div class="dog-frame">
          <img src="/hero-dog-premium.png" alt="Perro atento con arnés, imagen de Paseos Juan" />
        </div>
        <div class="dog-glass-card">
          <span class="glass-icon">${icon("radar")}</span>
          <strong>Seguimiento del paseo</strong>
          <span>Registramos el retiro, la foto del paseo y la entrega.</span>
        </div>
      </div>
      <a class="scroll-indicator" href="#servicios" data-link aria-label="Bajar a servicios">
        <span>Scroll</span>
        <b>${icon("chevronDown")}</b>
      </a>
    </section>
  `;
}

function serviceCard({ iconName, title, text, action, extraClass = "" }) {
  return `
    <article class="service-card ${extraClass}">
      <span class="service-icon">${icon(iconName)}</span>
      <h3>${title}</h3>
      <p>${text}</p>
      ${action}
    </article>
  `;
}

function consultButton(message, label = "Consultar") {
  return `<a class="primary-button service-button" href="${whatsappLink(message)}" target="_blank" rel="noreferrer">${label}</a>`;
}

function ServicesSection() {
  const promo = isPromoActive()
    ? serviceCard({
        iconName: "bone",
        title: PROMO.title,
        text: `${PROMO.detail} Hasta el ${PROMO.untilLabel}.`,
        action: consultButton("Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.", "Quiero la promo"),
        extraClass: "service-card--promo",
      })
    : "";
  return `
    <section class="services-section reveal" id="servicios" aria-labelledby="servicios-titulo">
      <span class="anchor-alias" id="sobre-nosotros" aria-hidden="true"></span>
      <div class="services-heading">
        <p class="eyebrow">Servicios</p>
        <h2 id="servicios-titulo">Todo para tu perro, en un solo lugar.</h2>
      </div>
      <div class="services-grid">
        ${serviceCard({
          iconName: "pawPrint",
          title: "Paseos grupales",
          text: "Grupos armados por conducta, energía y compatibilidad. Antes de sumarlo al grupo, hacemos una evaluación inicial.",
          action: consultButton("Hola, quiero consultar por los paseos grupales de Paseos Juan."),
        })}
        ${serviceCard({
          iconName: "droplets",
          title: "Baños",
          text: "Baño completo con paseo de ida y vuelta caminando, corte de uñas, lavado de dientes, emprolijamiento y golosina de regalo.",
          action: consultButton("Hola, quiero consultar por el baño para mi perro."),
        })}
        ${serviceCard({
          iconName: "home",
          title: "Estadía / guardería",
          text: "Consultá disponibilidad por WhatsApp.",
          action: consultButton("Hola, quiero consultar disponibilidad de estadía / guardería.", "Consultar disponibilidad"),
        })}
        ${serviceCard({
          iconName: "shoppingBag",
          title: "Tienda de alimento",
          text: "Alimento y productos DogPro y CatPro para perros y gatos.",
          action: `<a class="primary-button service-button" href="/tienda" data-link>Ver la tienda</a>`,
          extraClass: "service-card--shop",
        })}
        ${promo}
      </div>
    </section>
  `;
}

function PricesStrip() {
  return `
    <section class="prices-strip reveal" id="planes" aria-labelledby="precios-franja-titulo">
      <div>
        <h2 id="precios-franja-titulo">¿Querés ver los precios?</h2>
        <p>Planes semanales, paseo suelto y descuentos por varios perros, todo resumido.</p>
      </div>
      <a class="primary-button" href="/precios" data-link>Ver precios</a>
    </section>
  `;
}

function HowWeWorkSection() {
  const items = [
    ["shieldCheck", "Seguridad", "Evaluación inicial, checklist en cada salida y seguimiento durante todo el paseo."],
    ["users", "Grupos compatibles", "Cada grupo se arma según conducta, energía y compatibilidad."],
    ["message", "Comunicación clara", "Hablamos directo por WhatsApp, sin vueltas."],
    ["mapPin", "Zona", `${BUSINESS.zone}. ¿Estás cerca? Escribinos y te confirmamos.`],
  ];
  return `
    <section class="how-section reveal" id="como-trabajamos" aria-labelledby="como-titulo">
      <div>
        <p class="eyebrow">Cómo trabajamos</p>
        <h2 id="como-titulo">Orden, criterio y presencia.</h2>
      </div>
      <ul class="how-list">
        ${items.map(([iconName, title, text]) => `
          <li>
            <span class="service-icon">${icon(iconName)}</span>
            <div><strong>${title}</strong><p>${text}</p></div>
          </li>
        `).join("")}
      </ul>
    </section>
  `;
}

function TrustSection() {
  return `
    <section class="trust-section reveal" id="testimonios">
      <div>
        <p class="eyebrow">Nuestro compromiso</p>
        <blockquote>
          "Que tu perro esté tan bien cuidado como cuando lo cuidás vos."
        </blockquote>
        <cite>Paseos Juan · ${BUSINESS.zone}</cite>
      </div>
      <div class="faq" id="faq">
        <h3>Preguntas frecuentes</h3>
        ${faqItem("¿Cómo empieza el servicio?", "Con una evaluación inicial para conocer conducta, energía, vacunas y compatibilidades, antes de sumarlo al grupo.")}
        ${faqItem("¿En qué zona trabajan?", `En ${BUSINESS.zone}. Si estás cerca y no sabés si llegamos, escribinos y te confirmamos.`)}
        ${faqItem("¿Qué pasa si mi perro no se lleva bien con otros perros?", "Lo evaluamos antes de sumarlo a un grupo y te contamos si puede sumarse o qué adaptación necesita.")}
        ${faqItem("¿Dónde veo los precios?", "En la página de precios. Pueden cambiar: confirmalos por WhatsApp.")}
        ${faqItem("¿Cómo consulto disponibilidad?", `Escribinos por WhatsApp al ${BUSINESS.whatsappLabel} o completá el formulario de evaluación.`)}
      </div>
    </section>
  `;
}

// ---------- Formulario de evaluación (rápido, con voz y borrador) ----------

const DRAFT_KEY = "paseosJuan_evaluacionBorrador";
const DRAFT_FIELDS = ["perro", "responsable", "telefono", "tamano", "energia", "perros", "mordida", "horario", "dias",
  "conducta", "edad", "raza", "zona", "referencia", "email", "comentario"];
const OPTIONAL_FOLDED = ["edad", "raza", "zona", "referencia", "email", "comentario"];
const REQUIRED_FIELDS = [["perro", "nombre del perro"], ["responsable", "tu nombre"], ["telefono", "WhatsApp"]];

// "Continuar con Google": el token queda solo en memoria (nunca en el borrador).
let googleSession = null;
let googleAvailable = false;

function joinWithY(items) {
  return items.length > 1 ? `${items.slice(0, -1).join(", ")} y ${items.at(-1)}` : items[0] || "";
}

function missingRequired(values) {
  return REQUIRED_FIELDS.filter(([key]) => !String(values[key] || "").trim()).map(([, label]) => label);
}

function missingText(missing) {
  return missing.length ? `Falta: ${joinWithY(missing)}` : "Listo para enviar";
}

// Solo para mostrar nombre y correo: el servidor es el que verifica el token con Google.
function decodeGooglePayload(credential) {
  try {
    const part = credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(part.padEnd(part.length + ((4 - (part.length % 4)) % 4), "="));
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    return { email: String(payload.email || ""), nombre: String(payload.name || "") };
  } catch {
    return { email: "", nombre: "" };
  }
}
const DAYS = [["L", "Lunes"], ["M", "Martes"], ["X", "Miércoles"], ["J", "Jueves"], ["V", "Viernes"], ["S", "Sábado"], ["D", "Domingo"]];

function readDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function writeDraft(draft) {
  try {
    const hasData = Object.values(draft).some((value) => (Array.isArray(value) ? value.length : String(value).trim()));
    if (hasData) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Sin almacenamiento (modo privado): el borrador no se guarda.
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Nada para borrar.
  }
}

function speechSupported() {
  return typeof window !== "undefined" && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

const MIC_SVG = `<svg class="mic-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>`;

function micMini(field, what, voice) {
  if (!voice) return "";
  return `<button class="mic-mini" type="button" data-dictar="${field}" aria-pressed="false" aria-label="Dictar ${what}" title="Dictar ${what}">${MIC_SVG}</button>`;
}

function textField({ name, label, draft, voice, required = false, placeholder = "", autocomplete = "off", type = "text", inputmode = "", what = "" }) {
  return `
    <label class="quick-field"><span>${label}${required ? ' <span class="req" aria-hidden="true">*</span>' : ""}</span>
      <span class="field-with-mic">
        <input name="${name}" type="${type}" ${required ? "required" : ""} autocomplete="${autocomplete}" ${inputmode ? `inputmode="${inputmode}"` : ""} placeholder="${placeholder}" value="${esc(draft[name] || "")}" />
        ${what ? micMini(name, what, voice) : ""}
      </span>
    </label>
  `;
}

function choiceGroup({ name, legend, options, draft, multiple = false }) {
  const saved = draft[name];
  const isChecked = (value) => (multiple ? Array.isArray(saved) && saved.includes(value) : saved === value);
  return `
    <fieldset class="choice-group ${multiple ? "choice-group--days" : ""}">
      <legend>${legend}</legend>
      <div class="choice-row">
        ${options.map(([label, value, hiddenLabel]) => `
          <label class="choice">
            <input type="${multiple ? "checkbox" : "radio"}" name="${name}" value="${value}" ${isChecked(value) ? "checked" : ""} />
            <span>${hiddenLabel ? `<span aria-hidden="true">${label}</span><span class="visually-hidden">${hiddenLabel}</span>` : label}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function CTASection() {
  const draft = readDraft();
  const voice = speechSupported();
  const foldedOpen = OPTIONAL_FOLDED.some((key) => String(draft[key] || "").trim());
  const missing = missingRequired(draft);
  return `
    <section class="contact-section reveal" id="contacto">
      <div class="evaluation-heading">
        <p class="eyebrow">Evaluación inicial</p>
        <h2>Pedí tu evaluación en 1 minuto</h2>
        <p>Con 3 datos alcanza. Lo demás, si querés, lo dictás o nos lo contás por WhatsApp.</p>
      </div>
      <form class="evaluation-form quick-form" id="evaluacion" data-evaluation-form novalidate>
        <label class="visually-hidden" aria-hidden="true">No completar <input name="sitio" tabindex="-1" autocomplete="off" /></label>
        <input type="hidden" name="tipo" value="Grupal" />

        <fieldset class="evaluation-board quick-required">
          <legend>Lo único obligatorio</legend>
          <div class="google-box" data-google-box ${googleAvailable || googleSession ? "" : "hidden"}>
            <div class="google-button" data-google-boton ${googleSession ? "hidden" : ""}></div>
            <p class="google-connected" data-google-connected ${googleSession ? "" : "hidden"}>
              Conectado como <strong data-google-email>${esc(googleSession?.email || "")}</strong> ·
              <button class="link-button" type="button" data-google-cambiar>Cambiar</button>
            </p>
            <p class="google-or" aria-hidden="true" ${googleSession ? "hidden" : ""}>o completá a mano</p>
          </div>
          ${textField({ name: "perro", label: "Nombre del perro", draft, voice, required: true, placeholder: "Ej. Luna", what: "el nombre del perro" })}
          ${textField({ name: "responsable", label: "Tu nombre", draft, voice, required: true, placeholder: "Tu nombre", autocomplete: "name", what: "tu nombre" })}
          ${textField({ name: "telefono", label: "Tu WhatsApp", draft, voice, required: true, placeholder: "11 0000 0000", autocomplete: "tel", type: "tel", inputmode: "tel" })}
        </fieldset>

        <fieldset class="evaluation-board quick-optional">
          <legend>Si querés, sumá más (opcional)</legend>
          ${choiceGroup({ name: "tamano", legend: "Tamaño", draft, options: [["Chico", "Pequeño"], ["Mediano", "Mediano"], ["Grande", "Grande"]] })}
          ${choiceGroup({ name: "energia", legend: "Energía", draft, options: [["Baja", "Baja"], ["Media", "Media"], ["Alta", "Alta"]] })}
          ${choiceGroup({ name: "perros", legend: "¿Se lleva bien con otros perros?", draft, options: [["Sí", "Sí"], ["No", "No"], ["Depende", "Depende"]] })}
          ${choiceGroup({ name: "mordida", legend: "¿Alguna vez mordió o intentó morder?", draft, options: [["No", "No"], ["Sí", "Sí"], ["No sé", "No estoy seguro"]] })}
          ${choiceGroup({ name: "horario", legend: "Turno", draft, options: [["Mañana", "Mañana"], ["Tarde", "Tarde"], ["Indistinto", "Indistinto"]] })}
          ${choiceGroup({ name: "dias", legend: "Días (tocá todos los que quieras)", draft, multiple: true, options: DAYS.map(([short, long]) => [short, long, long]) })}

          <div class="voice-field">
            <label for="campo-conducta">Contanos de tu perro</label>
            <textarea id="campo-conducta" name="conducta" placeholder="Miedos, si tira de la correa, cómo se porta con otros perros…">${esc(draft.conducta || "")}</textarea>
            ${voice
              ? `<button class="voice-button" type="button" data-dictar="conducta" aria-pressed="false">${MIC_SVG}<span data-voice-label>Hablar</span></button>`
              : `<p class="voice-hint">Tocá el micrófono de tu teclado para dictar.</p>`}
          </div>
          <p class="visually-hidden" data-voice-status role="status" aria-live="polite"></p>

          <details class="quick-more" ${foldedOpen ? "open" : ""}>
            <summary>Contanos más (opcional)</summary>
            <div class="form-grid">
              ${textField({ name: "edad", label: "Edad", draft, voice, placeholder: "Ej. 4 años", what: "la edad" })}
              ${textField({ name: "raza", label: "Raza o cruza", draft, voice, placeholder: "Ej. Mestizo", what: "la raza" })}
              ${textField({ name: "zona", label: "Barrio o zona", draft, voice, placeholder: "Ej. Pilar", what: "el barrio" })}
              ${textField({ name: "referencia", label: "Barrio privado o referencia", draft, voice, placeholder: "Ej. nombre del barrio", what: "la referencia" })}
              ${textField({ name: "email", label: "Correo", draft, voice, placeholder: "Se completa solo con Google", autocomplete: "email", type: "email", inputmode: "email" })}
              <label class="span-2">Carnet de vacunas
                <input name="carnet" type="file" accept="image/*,application/pdf" capture="environment" />
                <small class="field-help">Sacale una foto o subí el PDF. Lo guardamos privado y solo lo ve el equipo.</small>
              </label>
              <label class="span-2">Comentario
                <span class="field-with-mic">
                  <textarea name="comentario" placeholder="Algo más que quieras contarnos">${esc(draft.comentario || "")}</textarea>
                  ${micMini("comentario", "un comentario", voice)}
                </span>
              </label>
            </div>
          </details>

        </fieldset>
        <p class="quick-note">Se abre WhatsApp con tus respuestas listas: solo tocás Enviar. Te contestamos para coordinar la evaluación.</p>

        <div class="quick-submit-bar" data-submit-bar>
          <div class="quick-submit-text">
            <p class="quick-missing" data-missing aria-live="polite">${missingText(missing)}</p>
            <p class="evaluation-status" data-evaluation-status role="status" aria-live="polite"></p>
          </div>
          <button class="primary-button quick-submit" type="submit" data-quick-submit aria-disabled="${missing.length > 0}">Enviar</button>
        </div>
      </form>
    </section>
  `;
}

function formValue(data, key) {
  if (key === "dias") return data.getAll("dias").map(String).join(", ");
  return (data.get(key) || "").toString().trim();
}

function buildEvaluationMessage(data) {
  const line = (label, key) => (formValue(data, key) ? `${label}: ${formValue(data, key)}` : null);
  const section = (title, lines) => {
    const filled = lines.filter(Boolean);
    return filled.length ? ["", title, ...filled] : [];
  };
  return [
    "Hola, quiero pedir una evaluación para mi perro.",
    ...section("*Perro*", [line("Nombre", "perro"), line("Edad", "edad"), line("Tamaño", "tamano"), line("Raza o cruza", "raza")]),
    ...section("*Conducta y energía*", [line("Energía", "energia"), line("Se lleva bien con otros perros", "perros"),
      line("Mordió o intentó morder", "mordida"), line("Sobre el perro", "conducta")]),
    ...section("*Responsable*", [line("Nombre", "responsable"), line("Teléfono", "telefono"), line("Correo", "email"),
      line("Zona", "zona"), line("Referencia", "referencia")]),
    ...section("*Preferencias*", [line("Turno", "horario"), line("Días", "dias"), line("Comentario", "comentario")]),
    data.get("carnet")?.size ? "\nCarnet de vacunas: lo adjunté en el formulario de la página." : null,
  ].filter((item) => item !== null).join("\n");
}

function collectDraft(form) {
  const data = new FormData(form);
  return Object.fromEntries(DRAFT_FIELDS.map((key) => [key, key === "dias" ? data.getAll("dias").map(String) : formValue(data, key)]));
}

// Vacía el formulario después de enviar. No uso form.reset(): los valores del borrador
// se dibujan como valores iniciales y reset() los volvería a poner.
function clearForm(form) {
  for (const field of form.elements) {
    if (field.type === "hidden" || field.name === "sitio" || !field.name) continue;
    if (field.type === "radio" || field.type === "checkbox") field.checked = false;
    else field.value = "";
  }
}

// Barra fija de "Enviar": se ve deshabilitada y dice qué falta hasta tener los 3 obligatorios.
function updateSubmitBar(form) {
  const values = Object.fromEntries(REQUIRED_FIELDS.map(([key]) => [key, form.elements[key]?.value || ""]));
  const missing = missingRequired(values);
  const text = missingText(missing);
  const label = form.querySelector("[data-missing]");
  if (label && label.textContent !== text) label.textContent = text;
  form.querySelector("[data-quick-submit]")?.setAttribute("aria-disabled", String(missing.length > 0));
}

function handleEvaluationInput(event) {
  const form = event.target.closest?.("[data-evaluation-form]");
  if (!form || event.target.name === "carnet" || event.target.name === "sitio") return;
  if (event.target.hasAttribute("aria-invalid") && event.target.value.trim()) event.target.removeAttribute("aria-invalid");
  writeDraft(collectDraft(form));
  updateSubmitBar(form);
}

// ---------- Continuar con Google ----------

function paintGoogle(form) {
  const box = form.querySelector("[data-google-box]");
  if (!box) return;
  box.hidden = !(googleAvailable || googleSession);
  form.querySelector("[data-google-boton]").hidden = Boolean(googleSession);
  form.querySelector("[data-google-connected]").hidden = !googleSession;
  form.querySelector("[data-google-email]").textContent = googleSession?.email || "";
  form.querySelector(".google-or").hidden = Boolean(googleSession);
}

function onGoogleCredential(credential) {
  const form = document.querySelector("[data-evaluation-form]");
  const { email, nombre } = decodeGooglePayload(credential);
  googleSession = { credential, email, nombre };
  if (!form) return;
  if (nombre && !form.elements.responsable.value.trim()) form.elements.responsable.value = nombre;
  if (email) form.elements.email.value = email;
  writeDraft(collectDraft(form));
  updateSubmitBar(form);
  paintGoogle(form);
  const status = form.querySelector("[data-evaluation-status]");
  status.classList.remove("is-error");
  status.textContent = "Listo, conectado con Google.";
}

async function mountGoogle() {
  const form = document.querySelector("[data-evaluation-form]");
  const target = form?.querySelector("[data-google-boton]");
  if (!target || target.dataset.mounted) return;
  target.dataset.mounted = "1";
  const ok = await botonGoogle(target, onGoogleCredential).catch(() => false);
  googleAvailable = Boolean(ok);
  if (form.isConnected) paintGoogle(form);
}

function handleGoogleChange(event) {
  const button = event.target.closest?.("[data-google-cambiar]");
  if (!button) return;
  const form = button.closest("[data-evaluation-form]");
  if (googleSession && form.elements.email.value === googleSession.email) form.elements.email.value = "";
  googleSession = null;
  try {
    window.google?.accounts?.id?.disableAutoSelect?.();
  } catch {
    // Sin Google cargado no hay nada que desconectar.
  }
  writeDraft(collectDraft(form));
  paintGoogle(form);
  form.querySelector("[data-evaluation-status]").textContent = "Elegí otra cuenta de Google o completá a mano.";
}

function handleEvaluationSubmit(event) {
  const form = event.target.closest("[data-evaluation-form]");
  if (!form) return;
  event.preventDefault();
  stopDictation();

  const status = form.querySelector("[data-evaluation-status]");
  const missing = [...form.querySelectorAll("[required]")].filter((field) => !field.value.trim());
  form.querySelectorAll("[required]").forEach((field) => field.toggleAttribute("aria-invalid", missing.includes(field)));
  if (missing.length) {
    status.textContent = "Completá el nombre del perro, tu nombre y tu WhatsApp para poder contactarte.";
    status.classList.add("is-error");
    missing[0].focus();
    return;
  }

  status.classList.remove("is-error");
  const formData = new FormData(form);
  // WhatsApp se abre primero (en el mismo toque) para que el navegador no lo bloquee.
  window.open(whatsappLink(buildEvaluationMessage(formData)), "_blank", "noopener");
  status.textContent = "Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.";
  clearDraft();
  // Además, el pedido queda guardado en la app para que el equipo lo vea.
  const archivo = formData.get("carnet");
  const datos = {};
  for (const key of new Set(formData.keys())) {
    if (key === "carnet") continue;
    datos[key] = key === "dias" ? formValue(formData, "dias") : formData.get(key);
  }
  // El servidor verifica el token con Google y guarda el correo verificado.
  if (googleSession) datos.googleCredential = googleSession.credential;
  (async () => {
    if (archivo && archivo.size) {
      try {
        datos.carnet = await prepararArchivo(archivo);
      } catch (error) {
        status.textContent = `${error.message} Tu pedido igual se envía; el carnet mandalo por WhatsApp.`;
      }
    }
    await enviarEvaluacion(datos);
  })()
    .then(() => {
      clearForm(form);
      googleSession = null;
      paintGoogle(form);
      updateSubmitBar(form);
      status.textContent = datos.carnet
        ? "Listo: recibimos tu pedido y el carnet. Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar."
        : "Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.";
    })
    .catch(() => {
      status.textContent = "Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.";
    });
}

// ---------- Dictado por voz (Web Speech API) ----------

let dictation = null;

function voiceStatus(text) {
  const live = document.querySelector("[data-voice-status]");
  if (live) live.textContent = text;
}

function setListening(button, listening) {
  button.setAttribute("aria-pressed", String(listening));
  button.classList.toggle("is-listening", listening);
  const label = button.querySelector("[data-voice-label]");
  if (label) label.textContent = listening ? "Frenar" : "Hablar";
  if (!label) button.setAttribute("aria-label", listening ? "Frenar el dictado" : button.title);
}

function stopDictation() {
  if (dictation) dictation.recognition.stop();
}

function startDictation(button) {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const form = button.closest("[data-evaluation-form]");
  const field = form?.elements[button.dataset.dictar];
  if (!Recognition || !field) return;

  if (dictation) {
    const same = dictation.button === button;
    dictation.recognition.stop();
    if (same) return;
  }

  const recognition = new Recognition();
  const isLong = field.tagName === "TEXTAREA";
  recognition.lang = "es-AR";
  recognition.interimResults = true;
  recognition.continuous = isLong;
  recognition.maxAlternatives = 1;
  const base = isLong ? field.value.trim() : "";
  const current = { recognition, button, field };
  dictation = current;

  recognition.onstart = () => {
    setListening(button, true);
    field.classList.add("is-dictating");
    voiceStatus("Te escucho. Hablá ahora.");
  };
  recognition.onresult = (event) => {
    let text = "";
    for (let i = 0; i < event.results.length; i += 1) text += event.results[i][0].transcript;
    text = text.trim();
    field.value = base && text ? `${base} ${text}` : base || text;
    field.dispatchEvent(new Event("input", { bubbles: true }));
  };
  recognition.onerror = (event) => {
    const messages = {
      "not-allowed": "No hay permiso para usar el micrófono. Podés escribir o usar el micrófono del teclado.",
      "service-not-allowed": "No hay permiso para usar el micrófono. Podés escribir o usar el micrófono del teclado.",
      "no-speech": "No escuché nada. Tocá de nuevo para probar.",
      "audio-capture": "No encontramos un micrófono. Podés escribir.",
    };
    voiceStatus(messages[event.error] || "No se pudo dictar. Podés escribir.");
    current.failed = true;
  };
  recognition.onend = () => {
    setListening(button, false);
    field.classList.remove("is-dictating");
    if (!current.failed) voiceStatus("Listo, terminé de escuchar. Revisá el texto.");
    if (dictation === current) dictation = null;
  };

  try {
    // El navegador pide el permiso del micrófono recién acá, al tocar "Hablar".
    recognition.start();
  } catch {
    dictation = null;
    voiceStatus("No se pudo usar el micrófono. Podés escribir.");
  }
}

function handleDictationClick(event) {
  const button = event.target.closest?.("[data-dictar]");
  if (!button) return;
  event.preventDefault();
  startDictation(button);
}

export function registerLandingEvents() {
  document.addEventListener("submit", handleEvaluationSubmit);
  document.addEventListener("input", handleEvaluationInput);
  document.addEventListener("change", handleEvaluationInput);
  document.addEventListener("click", handleDictationClick);
  document.addEventListener("click", handleGoogleChange);
  // Después de cada dibujo de la página, se monta el botón de Google (si está activado).
  const app = document.getElementById("app");
  if (app) new MutationObserver(() => mountGoogle()).observe(app, { childList: true });
}
