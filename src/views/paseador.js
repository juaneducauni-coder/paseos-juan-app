// Vista del rol Paseador.
import { getStore } from "../store/paseosJuanStore.js";
import { WALKER_DOGS, WALKER_CHECKLIST, WALK_STEPS, WALKER_COMMANDS } from "../data/mock.js";
import {
  icon,
  getStoredArray,
  getStoredObject,
  WalkerPanelHeader,
  SharedChatPanel,
  changeHandlers,
  clickHandlers,
} from "../ui/shared.js";
import { navigate, render } from "../app.js";

export function walkerShell(content) {
  return `
    <div class="walker-shell">
      ${WalkerHeader()}
      ${content}
    </div>
  `;
}

export function walkerDashboard() {
  const currentStep = Number(localStorage.getItem("paseosJuanWalkStep") || 0);
  const shiftStarted = localStorage.getItem("paseosJuanWalkerShift") === "started";
  const statusText = currentStep === 4 ? "Finalizado" : shiftStarted ? "En curso" : "Pendiente de inicio";

  return `
    <main class="walker-dashboard">
      ${WalkerShiftStatus(shiftStarted)}
      ${WalkerSummaryCards(statusText)}
      <section class="walker-two-column">
        ${TacticalChecklist()}
        ${WalkStatusProgress(currentStep)}
      </section>
      ${AssignedDogsList()}
      <section class="walker-two-column">
        ${OperativeRouteCard()}
        ${WalkerQuickCommands()}
      </section>
      <section class="walker-two-column">
        ${WalkMediaUpload()}
        ${OperativeIncidentReport()}
      </section>
      ${SharedChatPanel("paseador", "Historial operativo", "Solo lectura. La comunicación con clientes la gestiona coordinación o supervisión.")}
    </main>
  `;
}

function WalkerHeader() {
  return `
    <header class="walker-header">
      <a class="walker-brand" href="/paseador" data-link aria-label="Paseos Juan Operativo">
        <span class="walker-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Operativo</strong>
          <small>Panel paseador</small>
        </span>
      </a>
      <div class="walker-header-actions">
        <span class="walker-online"><b></b> Online</span>
        <button class="walker-ghost-button" type="button" data-walker-logout>
          ${icon("logOut", "walker-button-icon")}
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
}

function WalkerShiftStatus(shiftStarted) {
  const feedback = localStorage.getItem("paseosJuanWalkerFeedback");
  return `
    <section class="walker-shift-card reveal">
      <div class="walker-shift-copy">
        <p class="walker-eyebrow">Modo operativo</p>
        <h1>Hola, Sebastián</h1>
        <p>Jornada asignada, perros, ruta y reportes organizados en un solo lugar.</p>
        <div class="walker-shift-meta">
          <span>Grupo tarde</span>
          <span>Inicio: 15:00 hs</span>
          <span>Zona: Mapuche Country Club</span>
          <span>Referente operativo: Nico</span>
        </div>
      </div>
      <div class="walker-shift-actions">
        <span class="walker-shift-state">${shiftStarted ? "Jornada iniciada" : "Jornada pendiente"}</span>
        <button class="walker-primary-button" type="button" data-walker-start>
          ${icon("play", "walker-button-icon")}
          ${shiftStarted ? "Jornada iniciada" : "Iniciar jornada"}
        </button>
        <button class="walker-secondary-button" type="button" data-walker-incident>
          ${icon("alertTriangle", "walker-button-icon")}
          Reportar incidente
        </button>
        ${feedback ? `<small class="walker-feedback">${feedback}</small>` : ""}
      </div>
    </section>
  `;
}

function WalkerSummaryCards(statusText) {
  const cards = [
    ["Grupo asignado", "Grupo tarde · 15:00 hs", "calendarCheck"],
    ["Perros asignados", `${WALKER_DOGS.length} perros`, "pawPrint"],
    ["Duración estimada", "60 minutos", "clock"],
    ["Estado actual", statusText, "shieldCheck"],
  ];

  return `
    <section class="walker-summary-grid reveal">
      ${cards.map(([title, text, iconName]) => `
        <article class="walker-summary-card">
          <span>${icon(iconName)}</span>
          <small>${title}</small>
          <strong>${text}</strong>
        </article>
      `).join("")}
    </section>
  `;
}

function TacticalChecklist() {
  const checked = getStoredArray("paseosJuanWalkerChecklist");
  const feedback = localStorage.getItem("paseosJuanChecklistFeedback");
  const confirmed = localStorage.getItem("paseosJuanChecklistConfirmed") === "true";

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Checklist táctico", "Confirmá el equipamiento antes de retirar perros.", "clipboardCheck")}
      <div class="tactical-checklist">
        ${WALKER_CHECKLIST.map((item) => `
          <label class="tactical-check ${checked.includes(item) ? "is-checked" : ""}">
            <input data-checklist-item="${item}" type="checkbox" ${checked.includes(item) ? "checked" : ""} />
            <span>${icon("checkCircle")}</span>
            ${item}
          </label>
        `).join("")}
      </div>
      <button class="walker-primary-button" type="button" data-checklist-confirm>Confirmar checklist</button>
      ${feedback ? `<p class="walker-form-feedback ${confirmed ? "is-success" : "is-warning"}">${feedback}</p>` : ""}
    </section>
  `;
}

function WalkStatusProgress(currentStep) {
  const actions = [
    ["Iniciar retiro", 1],
    ["Iniciar paseo", 2],
    ["Finalizar paseo", 3],
    ["Confirmar entregas", 4],
  ];

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Estado del paseo", "Avanzá la operación según el momento real del grupo.", "flag")}
      <div class="walk-progress">
        ${WALK_STEPS.map((step, index) => `
          <div class="walk-step ${index === currentStep ? "is-active" : ""} ${index < currentStep ? "is-done" : ""}">
            <b>${index + 1}</b>
            <span>${step}</span>
          </div>
        `).join("")}
      </div>
      <div class="walk-action-grid">
        ${actions.map(([label, step]) => `
          <button class="walker-secondary-button ${currentStep >= step ? "is-complete" : ""}" type="button" data-walk-step="${step}">
            ${label}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function AssignedDogsList() {
  return `
    <section class="walker-section reveal">
      <div class="walker-section-heading">
        <p class="walker-eyebrow">Unidad asignada</p>
        <h2>Perros del grupo</h2>
        <p>Perros del grupo y observaciones críticas para ejecutar el paseo con control.</p>
      </div>
      <div class="assigned-dog-grid">
        ${[...(getStore().dogs || []).map(d => ({id: d.id, name: d.name, size: "Mediano", energy: d.energy, risk: d.risk, behavior: d.compatibility, location: "Asignado nuevo", note: ""})), ...WALKER_DOGS].map((dog) => AssignedDogCard(dog)).join("")}
      </div>
    </section>
  `;
}

function AssignedDogCard(dog) {
  const statuses = getStoredObject("paseosJuanDogStatuses");
  const status = statuses[dog.id] || "Pendiente de retiro";
  const activeDetail = localStorage.getItem("paseosJuanDogDetail") === dog.id;

  return `
    <article class="assigned-dog-card ${status === "Retirado" ? "is-retired" : ""}">
      <div class="assigned-dog-head">
        <div>
          <small>${status}</small>
          <h3>${dog.name}</h3>
        </div>
        <span class="dog-status-icon">${icon(status === "Retirado" ? "checkCircle" : "pawPrint")}</span>
      </div>
      <div class="dog-chip-row">
        <span>${dog.size}</span>
        <span>Energía ${dog.energy}</span>
        <span class="risk-chip risk-${dog.risk.toLowerCase()}">Riesgo ${dog.risk}</span>
      </div>
      <p>${dog.behavior}</p>
      ${activeDetail ? `
        <div class="dog-detail-box">
          <span>${icon("mapPin", "walker-button-icon")} ${dog.location}</span>
          <span>${dog.note}</span>
        </div>
      ` : ""}
      <div class="dog-card-actions">
        <button class="walker-primary-button" type="button" data-dog-retired="${dog.id}">
          Marcar retirado
        </button>
        <button class="walker-secondary-button" type="button" data-dog-detail="${dog.id}">
          ${activeDetail ? "Ocultar detalle" : "Ver detalle"}
        </button>
      </div>
    </article>
  `;
}

function OperativeRouteCard() {
  return `
    <section class="walker-panel route-panel reveal">
      ${WalkerPanelHeader("Ruta operativa", "Orden sugerido de retiro y entrega según ubicación y organización del grupo.", "route")}
      <div class="route-stats">
        <span>Zona: <b>Mapuche Country Club</b></span>
        <span>Tiempo estimado: <b>60 minutos</b></span>
        <span>Distancia estimada: <b>3.2 km</b></span>
      </div>
      <ol class="operative-route-list">
        ${[...(getStore().dogs || []).map(d => ({id: d.id, name: d.name, location: "Asignado nuevo"})), ...WALKER_DOGS].map((dog, index) => `
          <li>
            <b>${index + 1}</b>
            <span><strong>${dog.name}</strong><small>${dog.location}</small></span>
          </li>
        `).join("")}
      </ol>
      <button class="walker-primary-button" type="button" data-open-route>
        ${icon("navigation", "walker-button-icon")}
        Abrir ruta
      </button>
    </section>
  `;
}

function WalkerQuickCommands() {
  const feedback = localStorage.getItem("paseosJuanQuickCommand");
  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Comandos rápidos", "Mensajes operativos para avisar novedades sin perder tiempo.", "message")}
      <div class="quick-command-grid">
        ${WALKER_COMMANDS.map((command) => `
          <button type="button" data-quick-command="${command}">
            ${icon("send", "walker-button-icon")}
            ${command}
          </button>
        `).join("")}
      </div>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function WalkMediaUpload() {
  const photo = localStorage.getItem("paseosJuanWalkerMediaPhoto");
  const video = localStorage.getItem("paseosJuanWalkerMediaVideo");
  const comment = localStorage.getItem("paseosJuanMaterialComment") || "";
  const feedback = localStorage.getItem("paseosJuanMaterialFeedback");

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Material del paseo", "Cargá fotos, videos o comentarios que luego puedan compartirse con el cliente.", "camera")}
      <div class="walker-upload-grid">
        ${WalkerUploadField("Subir foto", "Photo", ".jpg,.jpeg,.png", photo)}
        ${WalkerUploadField("Subir video corto", "Video", ".mp4", video)}
      </div>
      <label class="walker-field">Comentario del paseo
        <textarea data-material-comment placeholder="Ej. Grupo estable, buen ritmo, sin novedades.">${comment}</textarea>
      </label>
      <button class="walker-primary-button" type="button" data-save-material>Guardar material</button>
      <small class="walker-muted">Formatos permitidos: JPG, PNG o MP4.</small>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function OperativeIncidentReport() {
  const reportFile = localStorage.getItem("paseosJuanReportFile");
  const feedback = localStorage.getItem("paseosJuanReportFeedback");

  return `
    <section class="walker-panel reveal" id="reporte-operativo">
      ${WalkerPanelHeader("Reporte operativo", "Registrá cualquier situación relevante durante el paseo.", "alertTriangle")}
      <div class="walker-form-grid">
        <label class="walker-field">Perro involucrado
          <select>
            ${WALKER_DOGS.map((dog) => `<option>${dog.name}</option>`).join("")}
          </select>
        </label>
        <label class="walker-field">Tipo de incidente
          <select>
            <option>Tirón fuerte</option>
            <option>Cruce con perro externo</option>
            <option>Pelea</option>
            <option>Lesión</option>
            <option>Escape</option>
            <option>Otro</option>
          </select>
        </label>
        <label class="walker-field">Nivel de riesgo
          <select>
            <option>Bajo</option>
            <option>Medio</option>
            <option>Alto</option>
          </select>
        </label>
        <label class="walker-field">Subir foto/video opcional
          <input data-report-file type="file" accept=".jpg,.jpeg,.png,.mp4" />
          <small>${reportFile || "Sin archivo adjunto"}</small>
        </label>
      </div>
      <label class="walker-field">Descripción
        <textarea placeholder="Describir situación, perro involucrado y acción tomada."></textarea>
      </label>
      <button class="walker-primary-button" type="button" data-send-report>Enviar reporte</button>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function WalkerUploadField(label, type, accept, fileName) {
  const inputId = `walker-media-${type.toLowerCase()}`;
  return `
    <div class="walker-upload-field">
      <input id="${inputId}" data-walker-media="${type}" type="file" accept="${accept}" />
      <label for="${inputId}">
        ${icon("uploadCloud")}
        <strong>${label}</strong>
        <small>${fileName || "Sin archivo cargado"}</small>
      </label>
    </div>
  `;
}


// Clicks de la vista paseador. Devuelve true si atendió el click (corta la cadena).
function handlePaseadorClick(event) {
  const walkerLogout = event.target.closest("[data-walker-logout]");
  if (walkerLogout) {
    localStorage.removeItem("paseosJuanWalkerShift");
    navigate("/login");
    return true;
  }

  const walkerStart = event.target.closest("[data-walker-start]");
  if (walkerStart) {
    localStorage.setItem("paseosJuanWalkerShift", "started");
    localStorage.setItem("paseosJuanWalkerFeedback", "Jornada iniciada");
    render();
    return true;
  }

  const walkerIncidentShortcut = event.target.closest("[data-walker-incident]");
  if (walkerIncidentShortcut) {
    document.getElementById("reporte-operativo")?.scrollIntoView({ behavior: "smooth" });
    return true;
  }

  const checklistConfirm = event.target.closest("[data-checklist-confirm]");
  if (checklistConfirm) {
    const checked = getStoredArray("paseosJuanWalkerChecklist");
    const complete = WALKER_CHECKLIST.every((item) => checked.includes(item));
    localStorage.setItem(
      "paseosJuanChecklistFeedback",
      complete ? "Checklist confirmado." : "Completá el checklist antes de iniciar el paseo.",
    );
    localStorage.setItem("paseosJuanChecklistConfirmed", complete ? "true" : "false");
    render();
    return true;
  }

  const walkAction = event.target.closest("[data-walk-step]");
  if (walkAction) {
    localStorage.setItem("paseosJuanWalkStep", walkAction.dataset.walkStep);
    render();
    return true;
  }

  const dogRetired = event.target.closest("[data-dog-retired]");
  if (dogRetired) {
    const statuses = getStoredObject("paseosJuanDogStatuses");
    statuses[dogRetired.dataset.dogRetired] = "Retirado";
    localStorage.setItem("paseosJuanDogStatuses", JSON.stringify(statuses));
    render();
    return true;
  }

  const dogDetail = event.target.closest("[data-dog-detail]");
  if (dogDetail) {
    const active = localStorage.getItem("paseosJuanDogDetail");
    const next = active === dogDetail.dataset.dogDetail ? "" : dogDetail.dataset.dogDetail;
    if (next) {
      localStorage.setItem("paseosJuanDogDetail", next);
    } else {
      localStorage.removeItem("paseosJuanDogDetail");
    }
    render();
    return true;
  }

  const routeOpen = event.target.closest("[data-open-route]");
  if (routeOpen) {
    localStorage.setItem("paseosJuanWalkerFeedback", "Ruta operativa abierta en modo demo.");
    render();
    return true;
  }

  const quickCommand = event.target.closest("[data-quick-command]");
  if (quickCommand) {
    localStorage.setItem("paseosJuanQuickCommand", `${quickCommand.dataset.quickCommand} enviado.`);
    render();
    return true;
  }

  const materialSave = event.target.closest("[data-save-material]");
  if (materialSave) {
    const comment = document.querySelector("[data-material-comment]")?.value?.trim();
    if (comment) localStorage.setItem("paseosJuanMaterialComment", comment);
    localStorage.setItem("paseosJuanMaterialFeedback", "Material guardado correctamente.");
    render();
    return true;
  }

  const reportSend = event.target.closest("[data-send-report]");
  if (reportSend) {
    localStorage.setItem("paseosJuanReportFeedback", "Reporte registrado correctamente.");
    render();
    return true;
  }

  return false;
}

function handlePaseadorChange(event) {
  const checklistItem = event.target.closest("[data-checklist-item]");
  if (checklistItem) {
    const checked = getStoredArray("paseosJuanWalkerChecklist");
    const item = checklistItem.dataset.checklistItem;
    const next = checklistItem.checked
      ? [...new Set([...checked, item])]
      : checked.filter((value) => value !== item);
    localStorage.setItem("paseosJuanWalkerChecklist", JSON.stringify(next));
    localStorage.removeItem("paseosJuanChecklistFeedback");
    render();
    return true;
  }

  const mediaInput = event.target.closest("[data-walker-media]");
  if (mediaInput) {
    const file = mediaInput.files?.[0];
    if (!file) return true;
    localStorage.setItem(`paseosJuanWalkerMedia${mediaInput.dataset.walkerMedia}`, file.name);
    render();
    return true;
  }

  const reportFile = event.target.closest("[data-report-file]");
  if (reportFile) {
    const file = reportFile.files?.[0];
    if (!file) return true;
    localStorage.setItem("paseosJuanReportFile", file.name);
    render();
    return true;
  }

  return false;
}

export function registerPaseadorEvents() {
  clickHandlers.push(handlePaseadorClick);
  changeHandlers.push(handlePaseadorChange);
}
