// Vista del rol Cliente.
import { openModal } from "../store/paseosJuanStore.js";
import { DOGS, PRODUCTS, PLANS } from "../data/mock.js";
import {
  icon,
  getDemoClient,
  compactPlanCard,
  dogCard,
  actionClickHandlers,
  changeHandlers,
  clickHandlers,
} from "../ui/shared.js";
import { render } from "../app.js";

function getVaccineDocument() {
  return {
    fileName: localStorage.getItem("paseosJuanVaccineFile"),
    status: localStorage.getItem("paseosJuanVaccineStatus") || "Pendiente de revisión",
  };
}

export function clientDashboard() {
  const demoClient = getDemoClient();
  const clientName = demoClient?.name?.split(" ")[0] || "Martín";
  const clientHighlights = [
    {
      title: "Próximo paseo",
      text: "Revisá el estado y horario estimado del próximo paseo.",
      icon: "calendarCheck",
    },
    {
      title: "Mi perro",
      text: "Consultá datos, conducta, vacunas y observaciones importantes.",
      icon: "pawPrint",
    },
    {
      title: "Beneficios",
      text: "Accedé a beneficios del plan, productos recomendados y comunicación directa.",
      icon: "shieldCheck",
    },
  ];

  return `
    <section class="client-hero-card">
      <div class="client-hero-copy">
        <p class="eyebrow">Perfil cliente</p>
        <h2>Hola, ${clientName}</h2>
        <p>Todo lo que necesitás para seguir la experiencia de tu perro con Paseos Juan.</p>
        <small>Estado del paseo, documentación, beneficios, pagos y comunicación en un solo lugar.</small>
        <button class="primary-button">Solicitar evaluación inicial</button>
      </div>
      <div class="client-highlight-grid">
        ${clientHighlights.map((item) => `
          <article class="client-highlight-card">
            <span>${icon(item.icon)}</span>
            <strong>${item.title}</strong>
            <p>${item.text}</p>
          </article>
        `).join("")}
      </div>
    </section>
    ${demoClient ? `
      <article class="panel demo-client-card">
        <div>
          <p class="eyebrow">Cuenta demo activa</p>
          <h3>${demoClient.dogName}</h3>
          <small>${demoClient.email} · Tamaño ${demoClient.dogSize}</small>
        </div>
        <button class="ghost-button" type="button" data-clear-demo>Salir demo</button>
      </article>
    ` : ""}
    <div class="dashboard-grid">
      <article class="panel wide">
        <h3>Estado del próximo paseo</h3>
        <div class="status-track">
          ${["Esperando retiro", "Retirado", "Paseando", "Regresando", "Entregado"].map((step, index) => `
            <span class="${index === 0 ? "current" : ""}">${step}</span>
          `).join("")}
        </div>
      </article>
      <article class="panel">
        <h3>Notificaciones</h3>
        ${["Retiro programado 10:00", "Vacuna de Tango pendiente", "Nuevo album disponible"].map((notice) => `
          <div class="notice">${notice}</div>
        `).join("")}
      </article>
    </div>
    <section class="dog-grid">
      ${DOGS.slice(0, 2).map((dog) => dogCard(dog)).join("")}
    </section>
    ${VaccinationUploadCard()}
    <div class="dashboard-grid">
      <article class="panel">
        <h3>Crear perfil de perro</h3>
        <label>Edad <input placeholder="Ej. 3 anos" /></label>
        <label>Raza <input placeholder="Ej. Labrador" /></label>
        <label>Conducta <textarea placeholder="Sociable, reactivo, miedos, rutinas"></textarea></label>
        <label>Veterinario <input placeholder="Nombre y telefono" /></label>
        <label>Vacunas <input placeholder="Estado de vacunas" /></label>
      </article>
      <article class="panel">
        <h3>Pagos y planes</h3>
        <div class="client-plan-list">
          ${PLANS.map((plan) => compactPlanCard(plan)).join("")}
        </div>
        <button class="secondary-button" data-client-action="pay-online">Pagar online</button>
      </article>
      <article class="panel">
        <h3>Cambios de conducta</h3>
        <textarea placeholder="Contanos que cambio observaste"></textarea>
        <button class="secondary-button">Reportar cambio</button>
      </article>
      <article class="panel">
        <h3>Seguimiento en tiempo real</h3>
        <strong class="metric">Futuro</strong>
        <small>La vista queda reservada para mapa, ubicacion y ETA del paseo.</small>
      </article>
    </div>
    <article class="panel">
      <h3>Historial y material del paseo</h3>
      <div class="media-grid">
        <div>Foto paseo</div>
        <div>Video corto</div>
        <div>Reporte final</div>
      </div>
    </article>
    ${ProductBenefits()}
  `;
}

function VaccinationUploadCard() {
  const vaccineDocument = getVaccineDocument();
  const hasFile = Boolean(vaccineDocument.fileName);

  return `
    <section class="panel vaccination-card">
      <div class="vaccination-copy">
        <span class="document-icon">${icon(hasFile ? "fileCheck" : "uploadCloud")}</span>
        <div>
          <p class="eyebrow">Documentación del perro</p>
          <h3>Vacunas y documentación</h3>
          <p>
            Subí una foto o PDF del carnet de vacunas para mantener la información del perro
            actualizada.
          </p>
        </div>
      </div>
      <div class="vaccination-upload-box">
        <input id="vaccine-file" data-vaccine-file type="file" accept=".jpg,.jpeg,.png,.pdf" />
        <label for="vaccine-file">
          ${icon("fileUp")}
          <strong>${hasFile ? "Cambiar archivo" : "Subir documentación"}</strong>
          <small>Formatos permitidos: JPG, PNG o PDF.</small>
        </label>
      </div>
      <div class="vaccination-status">
        <span>
          <small>Estado de revisión</small>
          <strong>${vaccineDocument.status}</strong>
        </span>
        <span>
          <small>Archivo cargado</small>
          <strong>${hasFile ? vaccineDocument.fileName : "Sin archivo cargado"}</strong>
        </span>
      </div>
    </section>
  `;
}

function ProductBenefits() {
  return `
    <section class="client-benefits">
      <div class="client-benefits-heading">
        <p class="eyebrow">Beneficios de ser parte de Paseos Juan</p>
        <h3>Productos recomendados para tu perro</h3>
        <p>
          Equipamiento y productos seleccionados para mejorar la seguridad, la rutina y la
          experiencia del paseo.
        </p>
      </div>
      <div class="product-benefit-grid">
        ${PRODUCTS.map((product) => `
          <article class="product-benefit-card">
            <span class="product-icon">${icon(product.icon)}</span>
            <small>${product.tag}</small>
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <strong>${product.price}</strong>
            <button class="secondary-button" type="button">Consultar producto</button>
          </article>
        `).join("")}
      </div>
      <p class="product-benefit-note">
        Los productos recomendados pueden variar según tamaño, conducta y necesidades de cada perro.
      </p>
    </section>
  `;
}


// Clicks de la vista cliente. Devuelve true si atendió el click (corta la cadena).
function handleClienteClick(event) {
  const clearDemo = event.target.closest("[data-clear-demo]");
  if (clearDemo) {
    localStorage.removeItem("paseosJuanDemoClient");
    render();
    return true;
  }

  return false;
}

// Era un listener "change" propio: nunca corta la cadena (no devuelve true).
function handleVaccineChange(event) {
  const vaccineInput = event.target.closest("[data-vaccine-file]");
  if (!vaccineInput) return;

  const file = vaccineInput.files?.[0];
  if (!file) return;

  localStorage.setItem("paseosJuanVaccineFile", file.name);
  localStorage.setItem("paseosJuanVaccineStatus", "Pendiente de revisión");
  render();
}

function handleClienteActionClick(event) {
  const clientAction = event.target.closest("[data-client-action]");
  if (clientAction) {
    if (clientAction.dataset.clientAction === "pay-online") {
      openModal('client-pay');
    }
  }

  return false;
}

export function registerClienteEvents() {
  clickHandlers.push(handleClienteClick);
  changeHandlers.push(handleVaccineChange);
  actionClickHandlers.push(handleClienteActionClick);
}
