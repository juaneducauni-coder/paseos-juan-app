// Página pública (landing) y pantallas de ingreso/registro.
import { BUSINESS, PROMO, PLAN_SIZES, PLANS, DISCOUNTS, SINGLE_WALK_PRICES } from "../data/mock.js";
import { whatsappLink, icon, shell, priceCard, faqItem } from "../ui/shared.js";
import { enviarEvaluacion } from "../api/client.js";

function isPromoActive(now = new Date()) {
  return now <= new Date(`${PROMO.until}T23:59:59-03:00`);
}

export function landingPage() {
  return shell(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${HeroSection()}
      ${FeatureCards()}
      ${CTASection()}
      ${Footer()}
      <a class="whatsapp" href="${whatsappLink("Hola, quiero información sobre los paseos de Paseos Juan.")}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `);
}

function HeroSection() {
  return `
    <section class="hero" id="inicio">
      <div class="hero-pattern" aria-hidden="true"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Paseos grupales profesionales</p>
        <h1>
          <span>Disciplina.</span>
          <span>Libertad.</span>
          <span>Bienestar.</span>
        </h1>
        <p>
          Paseos organizados por conducta, energía y compatibilidad para que tu perro viva una
          experiencia segura, activa y equilibrada. Cuidado y confianza como en casa, en ${BUSINESS.zone}.
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="#evaluacion" data-link>Pedí tu evaluación</a>
          <a class="secondary-button" href="#sobre-nosotros" data-link>Conocé más</a>
        </div>
      </div>
      <div class="hero-media reveal">
        <div class="dog-frame">
          <img src="/hero-dog-premium.png" alt="Perro entrenado con estética premium de Paseos Juan" />
        </div>
        <div class="dog-glass-card">
          <span class="glass-icon">${icon("radar")}</span>
          <strong>Control total</strong>
          <span>Seguimiento operativo durante todo el paseo.</span>
        </div>
      </div>
      <a class="scroll-indicator" href="#sobre-nosotros" data-link>
        <span>Scroll</span>
        <b>${icon("chevronDown")}</b>
      </a>
    </section>
  `;
}

function FeatureCards() {
  return `
    <section class="section-grid reveal" id="sobre-nosotros">
      <div>
        <p class="eyebrow">Sobre nosotros</p>
        <h2>Paseos con orden, criterio y presencia.</h2>
      </div>
      <p>
        Paseos Juan combina evaluación inicial, grupos compatibles, checklist operativo y
        comunicación clara para cuidar la rutina de cada perro con disciplina y bienestar.
      </p>
    </section>

    ${PricingSection()}

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
        ${faqItem("¿Cómo empieza el servicio?", "Con una evaluación inicial para conocer conducta, energía, vacunas y compatibilidades.")}
        ${faqItem("¿En qué zona trabajan?", `En ${BUSINESS.zone}. Si estás cerca y no sabés si llegamos, escribinos y te confirmamos.`)}
        ${faqItem("¿Qué pasa si mi perro no se lleva bien con otros perros?", "Lo evaluamos antes de sumarlo a un grupo. Si necesita paseo individual o una adaptación, te lo contamos antes de empezar.")}
        ${faqItem("¿Cómo consulto disponibilidad?", `Escribinos por WhatsApp al ${BUSINESS.whatsappLabel} o completá el formulario de evaluación.`)}
      </div>
    </section>
  `;
}

function CTASection() {
  return `
    <section class="contact-section reveal" id="contacto">
      <div class="evaluation-heading">
        <p class="eyebrow">Reserva de evaluación</p>
        <h2>Reservá una evaluación inicial</h2>
        <p>
          Antes de sumar un perro al grupo, evaluamos su conducta, energía y necesidades
          para armar una experiencia segura.
        </p>
      </div>
      <form class="evaluation-form" id="evaluacion" data-evaluation-form novalidate>
        <label class="visually-hidden" aria-hidden="true">No completar <input name="sitio" tabindex="-1" autocomplete="off" /></label>
        <fieldset class="evaluation-board">
          <legend>Datos del perro</legend>
          <p>Información básica para entender tamaño, edad y contexto general.</p>
          <div class="form-grid">
            <label>Nombre del perro * <input name="perro" required autocomplete="off" placeholder="Ej. Luna" /></label>
            <label>Edad del perro <input name="edad" placeholder="Ej. 4 años" /></label>
            <label>Tamaño
              <select name="tamano">
                <option>Pequeño</option>
                <option>Mediano</option>
                <option>Grande</option>
              </select>
            </label>
            <label>Raza o cruza <input name="raza" placeholder="Ej. Mestizo" /></label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Conducta y energía</legend>
          <p>Datos clave para definir compatibilidad, ritmo y nivel de supervisión.</p>
          <div class="form-grid">
            <label>Nivel de energía
              <select name="energia">
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </label>
            <label>¿Se lleva bien con otros perros?
              <select name="perros">
                <option>Sí</option>
                <option>No</option>
                <option>Depende</option>
              </select>
            </label>
            <label>¿Alguna vez mordió o intentó morder a una persona o a otro perro?
              <select name="mordida">
                <option>No</option>
                <option>Sí</option>
                <option>No estoy seguro</option>
              </select>
            </label>
            <label class="span-2">Observaciones de conducta
              <textarea name="conducta" placeholder="Miedos, cosas que lo ponen nervioso (motos, bicis, ruidos), si tira de la correa"></textarea>
            </label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Datos del responsable</legend>
          <p>Canales y zona para coordinar la primera evaluación.</p>
          <div class="form-grid">
            <label>Tu nombre * <input name="responsable" required autocomplete="name" placeholder="Tu nombre" /></label>
            <label>Teléfono / WhatsApp * <input name="telefono" required type="tel" autocomplete="tel" placeholder="11 0000 0000" /></label>
            <label>Zona o barrio <input name="zona" placeholder="Ej. Pilar" /></label>
            <label>Barrio privado o referencia <input name="referencia" placeholder="Ej. nombre del barrio" /></label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Preferencia del servicio</legend>
          <p>Preferencias iniciales para orientar la propuesta.</p>
          <div class="form-grid">
            <label>Tipo de paseo
              <select name="tipo">
                <option>Grupal</option>
                <option>Evaluación inicial</option>
                <option>Consulta</option>
              </select>
            </label>
            <label>Horario preferido
              <select name="horario">
                <option>Mañana</option>
                <option>Tarde</option>
                <option>Indistinto</option>
              </select>
            </label>
            <label>Días posibles <input name="dias" placeholder="Ej. lunes, miércoles y viernes" /></label>
            <label class="span-2">Comentario adicional
              <textarea name="comentario" placeholder="Contanos cualquier detalle que ayude a evaluar mejor"></textarea>
            </label>
          </div>
        </fieldset>

        <div class="evaluation-submit">
          <button class="primary-button" type="submit">Enviar por WhatsApp</button>
          <small>
            Se abre WhatsApp con tus respuestas listas para enviar. Te contestamos para coordinar
            la evaluación y confirmar si tu perro puede sumarse a un grupo. Los campos con * son obligatorios.
          </small>
          <p class="evaluation-status" data-evaluation-status role="status" aria-live="polite"></p>
        </div>
      </form>
    </section>
  `;
}

function PricingSection() {
  return `
    <section class="pricing-section reveal" id="planes">
      <div class="pricing-heading">
        <div>
          <p class="eyebrow">Tarifario</p>
          <h2>Planes por semana y por perro.</h2>
        </div>
        <aside class="discount-card">
          <h3>Descuentos</h3>
          ${DISCOUNTS.map(([dogs, discount]) => `
            <div>
              <span>${dogs}</span>
              <strong>${discount}</strong>
            </div>
          `).join("")}
        </aside>
      </div>

      <div class="tariff-table">
        <div class="tariff-sizes">
          <span>Tamaño</span>
          ${PLAN_SIZES.map((size) => `<strong>${size}</strong>`).join("")}
        </div>
        ${PLANS.map((plan) => priceCard(plan)).join("")}
      </div>

      <div class="pricing-details-grid">
        <article class="panel benefits-panel">
          <h3>Beneficios del plan</h3>
          ${PLANS.map((plan) => `
            <div class="benefit-group">
              <strong>${plan.name}</strong>
              <ul>
                ${plan.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </article>

        <article class="panel single-prices-panel">
          <h3>Precios por paseo</h3>
          ${SINGLE_WALK_PRICES.map((item) => `
            <div class="single-price-row">
              <strong>${item.size}</strong>
              <span>Individual <b>${item.individual}</b></span>
              <span>Grupo <b>${item.group}</b></span>
            </div>
          `).join("")}
        </article>

        ${PromoPanel()}
      </div>
    </section>
  `;
}

function PromoPanel() {
  if (isPromoActive()) {
    return `
      <aside class="panel products-panel promo-panel">
        <p class="eyebrow">Promo hasta el ${PROMO.untilLabel}</p>
        <h3>${PROMO.title}</h3>
        <p>${PROMO.detail}</p>
        <a class="primary-button" href="${whatsappLink("Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.")}" target="_blank" rel="noreferrer">Quiero la promo</a>
      </aside>
    `;
  }
  return `
    <aside class="panel products-panel promo-panel">
      <h3>¿Tenés dudas?</h3>
      <p>Escribinos y te contamos qué plan le conviene a tu perro.</p>
      <a class="primary-button" href="${whatsappLink("Hola, quiero información sobre los paseos de Paseos Juan.")}" target="_blank" rel="noreferrer">Escribinos</a>
    </aside>
  `;
}

function buildEvaluationMessage(data) {
  const line = (label, key) => (data.get(key) || "").toString().trim() ? `${label}: ${data.get(key).toString().trim()}` : null;
  return [
    "Hola, quiero pedir una evaluación para mi perro.",
    "",
    "*Perro*",
    line("Nombre", "perro"), line("Edad", "edad"), line("Tamaño", "tamano"), line("Raza o cruza", "raza"),
    "",
    "*Conducta y energía*",
    line("Energía", "energia"), line("Se lleva bien con otros perros", "perros"),
    line("Mordió o intentó morder", "mordida"), line("Observaciones", "conducta"),
    "",
    "*Responsable*",
    line("Nombre", "responsable"), line("Teléfono", "telefono"), line("Zona", "zona"), line("Referencia", "referencia"),
    "",
    "*Preferencias*",
    line("Tipo", "tipo"), line("Horario", "horario"), line("Días", "dias"), line("Comentario", "comentario"),
  ].filter((item) => item !== null).join("\n");
}

function Footer() {
  return `
    <footer class="footer reveal">
      <a class="menu-brand" href="/" data-link>
        <img src="/paseos-juan-logo.png" alt="" />
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <p>Paseos grupales profesionales con orden, seguridad y bienestar. ${BUSINESS.zone}.</p>
      <a class="footer-whatsapp" href="${whatsappLink("Hola, quiero información sobre los paseos de Paseos Juan.")}" target="_blank" rel="noreferrer">WhatsApp ${BUSINESS.whatsappLabel}</a>
    </footer>
  `;
}

function handleEvaluationSubmit(event) {
  const form = event.target.closest("[data-evaluation-form]");
  if (!form) return;
  event.preventDefault();

  const status = form.querySelector("[data-evaluation-status]");
  const missing = [...form.querySelectorAll("[required]")].filter((field) => !field.value.trim());
  form.querySelectorAll("[required]").forEach((field) => field.toggleAttribute("aria-invalid", missing.includes(field)));
  if (missing.length) {
    status.textContent = "Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.";
    status.classList.add("is-error");
    missing[0].focus();
    return;
  }

  status.classList.remove("is-error");
  const formData = new FormData(form);
  // WhatsApp se abre primero (en el mismo toque) para que el navegador no lo bloquee.
  window.open(whatsappLink(buildEvaluationMessage(formData)), "_blank", "noopener");
  status.textContent = "Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.";
  // Además, el pedido queda guardado en la app para que el equipo lo vea.
  enviarEvaluacion(Object.fromEntries(formData))
    .then(() => {
      status.textContent = "Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.";
    })
    .catch(() => {
      status.textContent = "Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.";
    });
}

export function registerLandingEvents() {
  document.addEventListener("submit", handleEvaluationSubmit);
}
