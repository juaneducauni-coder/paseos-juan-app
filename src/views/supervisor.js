// Vista del rol Supervisor.
import { getStore, saveStore, showToast } from "../store/paseosJuanStore.js";
import {
  SUPERVISOR_WALKERS,
  SUPERVISOR_GROUPS,
  SUPERVISOR_PICKUPS,
  SUPERVISOR_ALERTS,
  SUPERVISOR_CHECKLIST,
  SUPERVISOR_REPORTS,
  SUPERVISOR_SHARED_DOGS,
  SUPERVISOR_ROUTE_DOGS,
} from "../data/mock.js";
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

function getSharedAssignments() {
  const storedAssignments = getStoredObject("paseosJuanSharedAssignments");
  return SUPERVISOR_SHARED_DOGS.reduce((assignments, dog) => {
    assignments[dog.id] = storedAssignments[dog.id] || "unassigned";
    return assignments;
  }, {});
}

function getSharedDistributionCounts(assignments) {
  return Object.values(assignments).reduce(
    (counts, assignment) => {
      if (assignment === "walker") counts.walker += 1;
      if (assignment === "supervisor") counts.supervisor += 1;
      return counts;
    },
    { walker: 0, supervisor: 0 },
  );
}

function getSharedDistributionValidation(assignments) {
  const counts = getSharedDistributionCounts(assignments);
  const total = counts.walker + counts.supervisor;
  const errors = [];
  const warnings = [];

  if (counts.walker > 6) errors.push("El paseador no puede llevar más de 6 perros.");
  if (counts.supervisor > 4) errors.push("El supervisor no puede llevar más de 4 perros en acompañamiento.");
  if (total > 10) errors.push("El equipo paseador + supervisor no puede superar 10 perros.");

  SUPERVISOR_SHARED_DOGS.forEach((dog) => {
    if (dog.recommended === "Supervisor" && assignments[dog.id] === "walker") {
      warnings.push(`${dog.name}: Este perro requiere revisión. Se recomienda manejo del supervisor.`);
    }
  });

  return { counts, total, errors, warnings };
}

function suggestSharedDistribution() {
  const assignments = {};
  let walkerCount = 0;
  let supervisorCount = 0;

  SUPERVISOR_SHARED_DOGS.forEach((dog) => {
    if (dog.recommended === "Supervisor" && supervisorCount < 4) {
      assignments[dog.id] = "supervisor";
      supervisorCount += 1;
      return;
    }

    if (walkerCount < 6) {
      assignments[dog.id] = "walker";
      walkerCount += 1;
      return;
    }

    if (supervisorCount < 4) {
      assignments[dog.id] = "supervisor";
      supervisorCount += 1;
      return;
    }

    assignments[dog.id] = "unassigned";
  });

  return assignments;
}

function getRouteDog(dogId) {
  return SUPERVISOR_ROUTE_DOGS.find((dog) => dog.id === dogId);
}

function getRouteDraft() {
  const storedDraft = getStoredObject("paseosJuanRouteDraft");
  const selectedDogIds = Array.isArray(storedDraft.selectedDogIds) ? storedDraft.selectedDogIds : [];
  const storedOrder = Array.isArray(storedDraft.order) ? storedDraft.order : [];
  const order = [
    ...storedOrder.filter((dogId) => selectedDogIds.includes(dogId)),
    ...selectedDogIds.filter((dogId) => !storedOrder.includes(dogId)),
  ];

  return {
    name: storedDraft.name || "Ruta A - Mapuche Norte",
    walker: storedDraft.walker || "",
    routeType: storedDraft.routeType || "Ruta normal",
    zone: storedDraft.zone || "Mapuche Norte",
    start: storedDraft.start || "15:00",
    selectedDogIds,
    order,
    notes: storedDraft.notes || "",
  };
}

function saveRouteDraft(draft) {
  localStorage.setItem("paseosJuanRouteDraft", JSON.stringify(draft));
  localStorage.removeItem("paseosJuanCreateRouteFeedback");
}

function getCreatedRoutes() {
  return getStoredArray("paseosJuanCreatedRoutes");
}

function getRouteWarnings(dogIds) {
  const dogs = dogIds.map(getRouteDog).filter(Boolean);
  const mediumRiskCount = dogs.filter((dog) => dog.risk === "Medio" || dog.risk === "Alto").length;
  const highEnergyCount = dogs.filter((dog) => dog.energy === "Alta").length;
  const warnings = [];

  if (mediumRiskCount > 2) warnings.push("Grupo con riesgo medio elevado. Revisar antes de confirmar.");
  if (highEnergyCount > 3) warnings.push("Grupo con energía alta acumulada. Revisar distribución.");
  if (dogs.some((dog) => dog.id === "forest")) warnings.push("Forest requiere bozal confirmado antes de salir.");
  if (dogs.some((dog) => dog.id === "luna")) warnings.push("Luna: evitar motos y perros externos.");

  return warnings;
}

function validateRouteDraft(draft) {
  const errors = [];
  const warnings = getRouteWarnings(draft.order);
  const dogCount = draft.order.length;

  if (!draft.walker) errors.push("Seleccioná un paseador responsable.");
  if (!dogCount) errors.push("Seleccioná al menos un perro.");
  if (draft.routeType === "Ruta normal" && dogCount > 6) errors.push("Ruta normal: el paseador no puede llevar más de 6 perros.");
  if (draft.routeType === "Ruta cubierta por supervisor" && dogCount > 7) errors.push("Ruta cubierta por supervisor: Nico no puede llevar más de 7 perros.");
  if (draft.routeType === "Ruta acompañada por supervisor" && dogCount > 10) errors.push("Ruta acompañada por supervisor: el equipo no puede superar 10 perros.");

  return { errors, warnings };
}

function getRouteRiskAverage(dogIds) {
  const dogs = dogIds.map(getRouteDog).filter(Boolean);
  if (dogs.some((dog) => dog.risk === "Alto")) return "Alto";
  if (dogs.some((dog) => dog.risk === "Medio")) return "Medio";
  return "Bajo";
}

function getAssignedRouteForWalker(walkerName) {
  return getCreatedRoutes().find((route) => route.walker === walkerName);
}

export function supervisorShell(content) {
  return `
    <div class="walker-shell supervisor-shell">
      ${SupervisorHeader()}
      ${content}
    </div>
  `;
}

function SupervisorHeader() {
  return `
    <header class="walker-header supervisor-header">
      <a class="walker-brand" href="/supervisor" data-link aria-label="Paseos Juan Control">
        <span class="walker-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Control</strong>
          <small>Panel supervisor</small>
        </span>
      </a>
      <div class="walker-header-actions">
        <span class="walker-online"><b></b> Online</span>
        <button class="walker-ghost-button" type="button" data-supervisor-logout>
          ${icon("logOut", "walker-button-icon")}
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
}

export function supervisorDashboard() {
  return `
    <main class="walker-dashboard supervisor-dashboard">
      ${SupervisorShiftStatus()}
      ${CreateRouteModal()}
      ${CreatedRoutesBoard()}
      ${SupervisorSummaryCards()}
      ${SupervisorModeSelector()}
      ${ActiveWalkers()}
      ${SupervisorGroups()}
      ${PickupDeliveryControl()}
      <section class="walker-two-column">
        ${RiskAlerts()}
        ${SupervisorChecklist()}
      </section>
      <section class="walker-two-column">
        ${TeamCommunication()}
        ${ReceivedReports()}
      </section>
      ${SharedChatPanel("supervisor", "Chat operativo con clientes", "Comunicación directa para novedades de campo, seguridad y seguimiento.")}
      ${ShiftClosure()}
    </main>
  `;
}

function SupervisorShiftStatus() {
  const active = localStorage.getItem("paseosJuanSupervisorShift") === "active";
  const feedback = localStorage.getItem("paseosJuanSupervisorFeedback");

  return `
    <section class="walker-shift-card supervisor-command-card reveal">
      <div class="walker-shift-copy">
        <p class="walker-eyebrow">Modo supervisión</p>
        <h1>Hola, Nico</h1>
        <p>Controlá paseadores, perros, grupos, riesgos y reportes desde un solo panel.</p>
        <p class="supervisor-command-note">
          El supervisor puede acompañar rutas complejas y tomar el control de los perros con carácter más fuerte, sin superar los límites operativos del equipo.
        </p>
        <div class="walker-shift-meta">
          <span>Turno: Tarde</span>
          <span>Inicio operativo: 15:00 hs</span>
          <span>Zona: Mapuche Country Club</span>
          <span>Paseadores activos: 2</span>
          <span>Perros totales: 12</span>
        </div>
      </div>
      <div class="walker-shift-actions">
        <span class="walker-shift-state">${active ? "Supervisión activa" : "Supervisión pendiente"}</span>
        <button class="walker-primary-button create-route-main-button" type="button" data-open-create-route>
          ${icon("plus", "walker-button-icon")}
          Crear ruta
        </button>
        <button class="walker-secondary-button" type="button" data-manage-absence>
          ${icon("userCheck", "walker-button-icon")}
          Gestionar ausencia
        </button>
        <button class="walker-secondary-button" type="button" data-activate-companion-top>
          ${icon("users", "walker-button-icon")}
          Activar acompañamiento
        </button>
        <button class="walker-secondary-button" type="button" data-contact-walkers-top>
          ${icon("message", "walker-button-icon")}
          Contactar paseadores
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-create-alert>
          ${icon("bell", "walker-button-icon")}
          Crear alerta
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-close-shift>
          ${icon("flag", "walker-button-icon")}
          Cerrar jornada
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-start>
          ${icon("radio", "walker-button-icon")}
          Iniciar supervisión
        </button>
        ${feedback ? `<small class="walker-feedback">${feedback}</small>` : ""}
      </div>
    </section>
  `;
}

function SupervisorSummaryCards() {
  const reviewedAlerts = getStoredArray("paseosJuanReviewedAlerts");
  const openAlerts = Math.max(0, SupervisorAlertData().filter((alert) => !reviewedAlerts.includes(alert.id)).length);
  const cards = [
    ["Perros del día", "12 perros", "pawPrint"],
    ["Paseadores activos", "2 paseadores", "users"],
    ["Grupos activos", "2 grupos", "route"],
    ["Alertas abiertas", `${openAlerts} alerta${openAlerts === 1 ? "" : "s"}`, "alertTriangle"],
    ["Estado general", "Operación estable", "shieldCheck"],
  ];

  return `
    <section class="walker-summary-grid supervisor-summary-grid reveal">
      ${cards.map(([title, text, iconName]) => `
        <article class="walker-summary-card supervisor-summary-card">
          <span>${icon(iconName)}</span>
          <small>${title}</small>
          <strong>${text}</strong>
        </article>
      `).join("")}
    </section>
  `;
}

function CreateRouteModal() {
  const isOpen = localStorage.getItem("paseosJuanCreateRouteOpen") === "true";
  if (!isOpen) return "";

  const draft = getRouteDraft();
  const validation = validateRouteDraft(draft);
  const feedback = localStorage.getItem("paseosJuanCreateRouteFeedback");
  const selectedDogs = draft.order.map(getRouteDog).filter(Boolean);
  const isAccompanied = draft.routeType === "Ruta acompañada por supervisor";
  const sharedAssignments = getSharedAssignments();
  const sharedValidation = getSharedDistributionValidation(sharedAssignments);
  const walkerDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => sharedAssignments[dog.id] === "walker");
  const supervisorDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => sharedAssignments[dog.id] === "supervisor");

  return `
    <section class="route-modal-backdrop reveal">
      <div class="route-modal">
        <header class="route-modal-head">
          <div>
            <p class="walker-eyebrow">Nueva ruta de campo</p>
            <h2>Crear ruta</h2>
          </div>
          <button type="button" class="route-modal-close" data-close-create-route aria-label="Cerrar">${icon("x", "walker-button-icon")}</button>
        </header>

        <div class="route-form-grid">
          <label class="walker-field">Nombre de la ruta
            <input data-route-draft="name" value="${draft.name}" placeholder="Ruta A - Mapuche Norte" />
          </label>
          <label class="walker-field">Paseador responsable
            <select data-route-draft="walker">
              <option value="">Seleccionar paseador</option>
              <option ${draft.walker === "Sebastián" ? "selected" : ""}>Sebastián</option>
              <option ${draft.walker === "Bauti" ? "selected" : ""}>Bauti</option>
              <option ${draft.walker === "Nico supervisor / reemplazo de emergencia" ? "selected" : ""}>Nico supervisor / reemplazo de emergencia</option>
            </select>
          </label>
          <label class="walker-field">Tipo de ruta
            <select data-route-draft="routeType">
              <option ${draft.routeType === "Ruta normal" ? "selected" : ""}>Ruta normal</option>
              <option ${draft.routeType === "Ruta acompañada por supervisor" ? "selected" : ""}>Ruta acompañada por supervisor</option>
              <option ${draft.routeType === "Ruta cubierta por supervisor" ? "selected" : ""}>Ruta cubierta por supervisor</option>
            </select>
          </label>
          <label class="walker-field">Zona
            <select data-route-draft="zone">
              <option ${draft.zone === "Mapuche Norte" ? "selected" : ""}>Mapuche Norte</option>
              <option ${draft.zone === "Mapuche Sur" ? "selected" : ""}>Mapuche Sur</option>
              <option ${draft.zone === "Mapuche Centro" ? "selected" : ""}>Mapuche Centro</option>
              <option ${draft.zone === "Otra zona" ? "selected" : ""}>Otra zona</option>
            </select>
          </label>
          <label class="walker-field">Horario de inicio
            <input data-route-draft="start" value="${draft.start}" placeholder="15:00" />
          </label>
        </div>

        ${isAccompanied ? `
          <div class="route-accompanied-detail">
            <span><small>Paseador responsable</small><b>${draft.walker || "Sin seleccionar"}</b></span>
            <span><small>Supervisor acompañante</small><b>Nico</b></span>
            <span><small>Perros del paseador</small><b>${walkerDogs.map((dog) => dog.name).join(", ") || "Sin asignar"}</b></span>
            <span><small>Perros del supervisor</small><b>${supervisorDogs.map((dog) => dog.name).join(", ") || "Sin asignar"}</b></span>
            <span><small>Total máximo</small><b>${sharedValidation.total}/10 perros</b></span>
          </div>
        ` : ""}

        ${DogSelectionList(draft)}
        ${RouteOrderList(selectedDogs)}

        <label class="walker-field">Observaciones de ruta
          <textarea data-route-draft="notes" placeholder="Evitar motos cerca de Casa 18. Confirmar bozal de Forest.">${draft.notes}</textarea>
        </label>

        <div class="route-validation-list">
          ${validation.errors.map((message) => `<p class="walker-form-feedback is-warning">${message}</p>`).join("")}
          ${validation.warnings.map((message) => `<p class="walker-form-feedback is-warning">${message}</p>`).join("")}
          ${feedback ? `<p class="walker-form-feedback is-warning">${feedback}</p>` : ""}
        </div>

        <footer class="route-modal-actions">
          <button class="walker-secondary-button" type="button" data-close-create-route>Cancelar</button>
          <button class="walker-primary-button" type="button" data-create-route>Crear ruta</button>
        </footer>
      </div>
    </section>
  `;
}

function DogSelectionList(draft) {
  return `
    <section class="dog-selection-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Selección de perros</h3>
          <p>Elegí los perros de la ruta. Cada tarjeta muestra zona, ubicación, energía, riesgo y compatibilidad.</p>
        </div>
        <span>${draft.selectedDogIds.length} seleccionados</span>
      </div>
      <div class="route-dog-list">
        ${[...(getStore().dogs || []).map(d => ({id: d.id, name: d.name, zone: d.zone, location: "A asignar", energy: d.energy, risk: d.risk, compatibility: d.compatibility})), ...SUPERVISOR_ROUTE_DOGS].map((dog) => `
          <label class="route-dog-option ${draft.selectedDogIds.includes(dog.id) ? "is-selected" : ""}">
            <input data-route-dog="${dog.id}" type="checkbox" ${draft.selectedDogIds.includes(dog.id) ? "checked" : ""} />
            <span>${dog.name}</span>
            <small>${dog.zone} · ${dog.location} · Energía ${dog.energy} · Riesgo ${dog.risk}</small>
            <em>${dog.compatibility}</em>
          </label>
        `).join("")}
      </div>
    </section>
  `;
}

function RouteOrderList(selectedDogs) {
  return `
    <section class="route-order-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Orden de retiro</h3>
          <p>Orden sugerido según selección. Podés subir, bajar o quitar sin drag and drop.</p>
        </div>
      </div>
      <ol class="route-order-list">
        ${selectedDogs.length ? selectedDogs.map((dog, index) => `
          <li>
            <b>${index + 1}</b>
            <span><strong>${dog.name}</strong><small>${dog.location}</small></span>
            <div>
              <button type="button" data-dog-id="${dog.id}" data-route-order="up">Subir</button>
              <button type="button" data-dog-id="${dog.id}" data-route-order="down">Bajar</button>
              <button type="button" data-dog-id="${dog.id}" data-route-order="remove">Quitar</button>
            </div>
          </li>
        `).join("") : `<li class="empty-route-order">Seleccioná perros para ver el orden.</li>`}
      </ol>
    </section>
  `;
}

function CreatedRoutesBoard() {
  const routes = getCreatedRoutes();

  return `
    <section class="walker-section created-routes-board reveal">
      ${SupervisorSectionHeading("Rutas creadas", "Rutas armadas por supervisión y listas para confirmar o ajustar.")}
      ${routes.length ? `
        <div class="created-route-grid">
          ${routes.map((route) => CreatedRouteCard(route)).join("")}
        </div>
      ` : `
        <div class="empty-routes-state">
          <span>${icon("route")}</span>
          <div>
            <h3>Sin rutas creadas</h3>
            <p>Usá el botón principal + Crear ruta para asignar perros a un paseador.</p>
          </div>
          <button class="walker-primary-button" type="button" data-open-create-route>${icon("plus", "walker-button-icon")} Crear ruta</button>
        </div>
      `}
    </section>
  `;
}

function CreatedRouteCard(route) {
  const dogs = route.dogIds.map(getRouteDog).filter(Boolean);
  const riskAverage = getRouteRiskAverage(route.dogIds);

  return `
    <article class="created-route-card">
      <div class="created-route-head">
        <div>
          <small>${route.status}</small>
          <h3>${route.name}</h3>
        </div>
        <span class="risk-chip risk-${riskAverage.toLowerCase()}">${riskAverage}</span>
      </div>
      <div class="created-route-meta">
        <span><small>Responsable</small><b>${route.walker}</b></span>
        <span><small>Tipo</small><b>${route.routeType}</b></span>
        <span><small>Zona</small><b>${route.zone}</b></span>
        <span><small>Horario</small><b>${route.start}</b></span>
        <span><small>Perros</small><b>${dogs.length}/${route.routeType === "Ruta normal" ? "6" : route.routeType === "Ruta cubierta por supervisor" ? "7" : "10"}</b></span>
      </div>
      <ol class="created-route-dog-list">
        ${dogs.map((dog, index) => `<li><b>${index + 1}.</b> ${dog.name} — ${dog.location}</li>`).join("")}
      </ol>
      ${route.notes ? `<p class="created-route-notes">${route.notes}</p>` : ""}
      <div class="created-route-actions">
        <button class="walker-primary-button" type="button" data-route-confirm="${route.id}">Confirmar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-edit="${route.id}">Editar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-delete="${route.id}">Eliminar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-contact="${route.id}">Contactar paseador</button>
      </div>
    </article>
  `;
}

function SupervisorModeSelector() {
  const mode = localStorage.getItem("paseosJuanSupervisorMode") || "general";

  return `
    <section class="walker-panel companion-mode-panel reveal">
      ${WalkerPanelHeader("Acompañamiento de paseador", "Cuando un grupo requiere más control, el supervisor puede acompañar al paseador y encargarse de los perros más fuertes o conflictivos.", "users")}
      <div class="companion-mode-copy">
        <label class="walker-field">Modo del supervisor
          <select data-supervisor-mode>
            <option value="general" ${mode === "general" ? "selected" : ""}>Supervisión general de campo</option>
            <option value="companion" ${mode === "companion" ? "selected" : ""}>Acompañar a un paseador</option>
            <option value="cover" ${mode === "cover" ? "selected" : ""}>Cubrir ruta por ausencia</option>
          </select>
        </label>
        <div class="companion-rule-grid">
          <span><b>6</b><small>Paseador solo</small></span>
          <span><b>7</b><small>Supervisor cubriendo emergencia</small></span>
          <span><b>10</b><small>Equipo acompañado</small></span>
          <span><b>4</b><small>Perros bajo supervisor</small></span>
        </div>
      </div>
      ${mode === "companion" ? WalkerCompanionMode() : SupervisorModeEmptyState(mode)}
    </section>
  `;
}

function SupervisorModeEmptyState(mode) {
  const isCover = mode === "cover";

  return `
    <div class="companion-empty-state">
      <span>${icon(isCover ? "route" : "shieldCheck")}</span>
      <div>
        <h3>${isCover ? "Ruta cubierta por supervisor" : "Supervisión general activa"}</h3>
        <p>
          ${isCover
            ? "En ausencia de paseador, el supervisor puede cubrir una ruta de emergencia con máximo 7 perros."
            : "Usá este modo para monitorear paseadores, grupos, alertas, retiros y entregas desde el centro de control."
          }
        </p>
      </div>
      <button class="walker-primary-button" type="button" data-companion-activate>Activar acompañamiento</button>
    </div>
  `;
}

function WalkerCompanionMode() {
  const walker = localStorage.getItem("paseosJuanCompanionWalker") || "Sebastián";
  const route = localStorage.getItem("paseosJuanCompanionRoute") || "Ruta A";
  const assignments = getSharedAssignments();
  const validation = getSharedDistributionValidation(assignments);
  const feedback = localStorage.getItem("paseosJuanCompanionFeedback");

  return `
    <div class="companion-config-grid">
      <label class="walker-field">Seleccionar paseador acompañado
        <select data-companion-walker>
          <option ${walker === "Sebastián" ? "selected" : ""}>Sebastián</option>
          <option ${walker === "Bauti" ? "selected" : ""}>Bauti</option>
        </select>
      </label>
      <label class="walker-field">Seleccionar ruta
        <select data-companion-route>
          <option ${route === "Ruta A" ? "selected" : ""}>Ruta A</option>
          <option ${route === "Ruta B" ? "selected" : ""}>Ruta B</option>
        </select>
      </label>
    </div>
    ${SharedDogDistribution(walker, route, assignments, validation)}
    ${ConflictDogAssignment(assignments)}
    ${SharedRouteSummary(walker, assignments, validation)}
    ${CompanionRoutePreview(walker, assignments, validation)}
    <div class="companion-action-row">
      <button class="walker-primary-button" type="button" data-companion-suggest>${icon("navigation", "walker-button-icon")} Sugerir distribución</button>
      <button class="walker-secondary-button" type="button" data-companion-confirm>Confirmar distribución compartida</button>
      <button class="walker-secondary-button" type="button" data-companion-sensitive>Reasignar perros sensibles</button>
      <button class="walker-secondary-button" type="button" data-companion-sensitive>Pasar perros conflictivos al supervisor</button>
      <button class="walker-secondary-button" type="button" data-companion-contact>Contactar paseador</button>
    </div>
    ${feedback ? `<p class="walker-form-feedback ${validation.errors.length ? "is-warning" : "is-success"}">${feedback}</p>` : ""}
  `;
}

function SharedDogDistribution(walker, route, assignments, validation) {
  const walkerDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "walker");
  const supervisorDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "supervisor");

  return `
    <section class="shared-distribution">
      <div class="shared-distribution-head">
        <div>
          <h3>Distribución operativa · ${route}</h3>
          <p>El supervisor acompaña sin reemplazar al paseador y toma control de los perros más delicados.</p>
        </div>
        <span>Total del equipo: <b>${validation.total}/10 perros</b></span>
      </div>
      <div class="shared-columns">
        ${SharedHandlerColumn("Paseador", walker, "Perros bajo manejo del paseador", `${validation.counts.walker}/6 perros`, walkerDogs)}
        ${SharedHandlerColumn("Supervisor", "Nico", "Perros de mayor control", `${validation.counts.supervisor}/4 perros`, supervisorDogs)}
      </div>
      ${DistributionMessages(validation)}
    </section>
  `;
}

function SharedHandlerColumn(role, name, text, capacity, dogs) {
  return `
    <article class="shared-handler-card">
      <small>${role}</small>
      <h3>${name}</h3>
      <p>${text}</p>
      <span class="shared-capacity">${capacity}</span>
      <div class="shared-assigned-list">
        ${dogs.length ? dogs.map((dog) => SharedAssignedDog(dog)).join("") : `<em>Sin perros asignados</em>`}
      </div>
    </article>
  `;
}

function SharedAssignedDog(dog) {
  return `
    <div>
      <strong>${dog.name}</strong>
      <span class="risk-chip risk-${dog.risk.toLowerCase()}">${dog.risk}</span>
    </div>
  `;
}

function ConflictDogAssignment(assignments) {
  return `
    <section class="conflict-assignment">
      <div class="shared-distribution-head">
        <div>
          <h3>Asignación de perros</h3>
          <p>Los perros de riesgo medio, energía alta, bozal o carácter fuerte deben priorizar manejo del supervisor.</p>
        </div>
      </div>
      <div class="conflict-dog-grid">
        ${SUPERVISOR_SHARED_DOGS.map((dog) => {
          const assignment = assignments[dog.id];
          const needsReview = dog.recommended === "Supervisor" && assignment === "walker";
          return `
            <article class="conflict-dog-card ${needsReview ? "needs-review" : ""}">
              <div class="conflict-dog-head">
                <div>
                  <small>Manejo recomendado: ${dog.recommended}</small>
                  <h4>${dog.name}</h4>
                </div>
                <span class="risk-chip risk-${dog.risk.toLowerCase()}">${dog.risk}</span>
              </div>
              <div class="dog-chip-row">
                <span>Energía ${dog.energy}</span>
                <span>${assignment === "walker" ? "Asignado a paseador" : assignment === "supervisor" ? "Asignado a supervisor" : "Sin asignar"}</span>
              </div>
              ${dog.reason ? `<p>${dog.reason}</p>` : `<p>Perfil apto para manejo operativo estándar.</p>`}
              ${needsReview ? `<p class="assignment-warning">Este perro requiere revisión. Se recomienda manejo del supervisor.</p>` : ""}
              <div class="assignment-button-row">
                <button type="button" data-dog-id="${dog.id}" data-shared-assign="walker">Paseador</button>
                <button type="button" data-dog-id="${dog.id}" data-shared-assign="supervisor">Supervisor</button>
                <button type="button" data-dog-id="${dog.id}" data-shared-assign="unassigned">Sin asignar</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function SharedRouteSummary(walker, assignments, validation) {
  const supervisorDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "supervisor");

  return `
    <section class="shared-route-summary">
      <div>
        <p class="walker-eyebrow">Distribución compartida</p>
        <h3>Equipo acompañado</h3>
      </div>
      <div class="closure-metrics">
        <span><small>Paseador</small><strong>${walker} — ${validation.counts.walker}/6 perros</strong></span>
        <span><small>Supervisor</small><strong>Nico — ${validation.counts.supervisor}/4 perros</strong></span>
        <span><small>Total</small><strong>${validation.total}/10 perros</strong></span>
      </div>
      <div class="supervisor-controlled-dogs">
        <strong>Perros bajo control del supervisor</strong>
        <p>${supervisorDogs.length ? supervisorDogs.map((dog) => dog.name).join(", ") : "Sin perros asignados al supervisor."}</p>
        <small>Motivo: Perros con mayor energía, riesgo medio, bozal o carácter fuerte.</small>
      </div>
    </section>
  `;
}

function CompanionRoutePreview(walker, assignments, validation) {
  const routeType = localStorage.getItem("paseosJuanCreateRouteType") || "Ruta normal";
  const isAccompanied = routeType === "Ruta acompañada por supervisor";
  const walkerDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "walker");
  const supervisorDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "supervisor");

  return `
    <section class="create-route-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Crear ruta</h3>
          <p>Configuración demo para rutas normales, acompañadas o cubiertas por supervisor.</p>
        </div>
      </div>
      <label class="walker-field">Tipo de ruta
        <select data-create-route-type>
          <option ${routeType === "Ruta normal" ? "selected" : ""}>Ruta normal</option>
          <option ${routeType === "Ruta acompañada por supervisor" ? "selected" : ""}>Ruta acompañada por supervisor</option>
          <option ${routeType === "Ruta cubierta por supervisor" ? "selected" : ""}>Ruta cubierta por supervisor</option>
        </select>
      </label>
      ${isAccompanied ? `
        <div class="create-route-detail-grid">
          <span><small>Paseador responsable</small><b>${walker}</b></span>
          <span><small>Supervisor acompañante</small><b>Nico</b></span>
          <span><small>Perros del paseador</small><b>${walkerDogs.map((dog) => dog.name).join(", ") || "Sin asignar"}</b></span>
          <span><small>Perros del supervisor</small><b>${supervisorDogs.map((dog) => dog.name).join(", ") || "Sin asignar"}</b></span>
          <span><small>Total máximo</small><b>${validation.total}/10 perros</b></span>
        </div>
      ` : ""}
    </section>
  `;
}

function DistributionMessages(validation) {
  const messages = [...validation.errors, ...validation.warnings];
  if (!messages.length) {
    return `<p class="walker-form-feedback is-success">Distribución dentro de los límites operativos.</p>`;
  }

  return `
    <div class="distribution-messages">
      ${messages.map((message) => `<p class="walker-form-feedback is-warning">${message}</p>`).join("")}
    </div>
  `;
}

function ActiveWalkers() {
  return `
    <section class="walker-section reveal">
      ${SupervisorSectionHeading("Paseadores activos", "Seguimiento del equipo en operación.")}
      <div class="supervisor-walker-grid">
        ${SUPERVISOR_WALKERS.map((walker) => {
          const assignedRoute = getAssignedRouteForWalker(walker.name);
          return `
            <article class="supervisor-walker-card">
              <div class="assigned-dog-head">
                <div>
                  <small>${walker.role}</small>
                  <h3>${walker.name}</h3>
                </div>
                <span class="dog-status-icon">${icon("userCheck")}</span>
              </div>
              <div class="supervisor-detail-grid">
                <span><small>Ruta asignada</small><b>${assignedRoute?.name || walker.group}</b></span>
                <span><small>Horario</small><b>${assignedRoute?.start || walker.schedule}</b></span>
                <span><small>Estado</small><b>${assignedRoute?.status || walker.status}</b></span>
                <span><small>Perros asignados</small><b>${assignedRoute?.dogIds?.length || walker.dogs}</b></span>
              </div>
              <div class="dog-card-actions">
                <button class="walker-secondary-button" type="button">Ver grupo</button>
                <button class="walker-secondary-button" type="button" data-walker-message="${walker.name}">Enviar mensaje</button>
                <button class="walker-secondary-button" type="button" data-walker-delay="${walker.name}">Reportar demora</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function SupervisorGroups() {
  return `
    <section class="walker-section reveal">
      ${SupervisorSectionHeading("Grupos asignados", "Distribución de perros por paseador y nivel de riesgo.")}
      <div class="supervisor-group-grid">
        ${SUPERVISOR_GROUPS.map((group) => `
          <article class="supervisor-group-card">
            <div class="supervisor-group-head">
              <span>${icon("route")}</span>
              <div>
                <small>${group.name} — ${group.walker}</small>
                <h3>${group.dogs.length} perros asignados</h3>
              </div>
            </div>
            <div class="route-stats">
              <span>Riesgo promedio: <b>${group.averageRisk}</b></span>
              <span>Estado: <b>${group.status}</b></span>
            </div>
            <div class="compact-dog-list">
              ${group.dogs.map(([name, risk]) => `
                <div>
                  <strong>${name}</strong>
                  <span class="risk-chip risk-${risk.toLowerCase()}">${risk}</span>
                </div>
              `).join("")}
            </div>
            <button class="walker-primary-button" type="button">${icon("eye", "walker-button-icon")} Revisar grupo</button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function PickupDeliveryControl() {
  const statuses = getStoredObject("paseosJuanPickupStatuses");
  return `
    <section class="walker-panel supervisor-control-panel reveal">
      ${WalkerPanelHeader("Control de retiros y entregas", "Validá que cada perro sea retirado y entregado correctamente.", "clipboardCheck")}
      <div class="pickup-list">
        ${SUPERVISOR_PICKUPS.map((item) => {
          const status = statuses[item.id] || item.status;
          return `
            <article class="pickup-row">
              <div><small>Perro</small><strong>${item.dog}</strong></div>
              <div><small>Ubicación</small><span>${item.location}</span></div>
              <div><small>Paseador</small><span>${item.walker}</span></div>
              <div><small>Estado</small><span class="status-chip">${status}</span></div>
              <div><small>Hora estimada</small><span>${item.eta}</span></div>
              <div class="pickup-actions">
                <button type="button" data-pickup-id="${item.id}" data-pickup-action="Retirado">Marcar retirado</button>
                <button type="button" data-pickup-id="${item.id}" data-pickup-action="Entregado">Marcar entregado</button>
                <button type="button">${icon("eye", "walker-button-icon")} Ver detalle</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function RiskAlerts() {
  const reviewed = getStoredArray("paseosJuanReviewedAlerts");
  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Alertas operativas", "Situaciones que requieren atención del supervisor.", "alertTriangle")}
      <div class="risk-alert-list">
        ${SupervisorAlertData().map((alert) => {
          const isReviewed = reviewed.includes(alert.id);
          return `
            <article class="risk-alert-card risk-${alert.level.toLowerCase()} ${isReviewed ? "is-reviewed" : ""}">
              <div>
                <small>${alert.type}</small>
                <h3>${alert.dog}</h3>
              </div>
              <span class="risk-chip risk-${alert.level.toLowerCase()}">${isReviewed ? "Revisada" : alert.level}</span>
              <p>${alert.description}</p>
              <div class="dog-card-actions">
                <button class="walker-secondary-button" type="button" data-alert-reviewed="${alert.id}">Marcar revisada</button>
                <button class="walker-secondary-button" type="button" data-alert-notify="${alert.dog}">Notificar paseador</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function SupervisorChecklist() {
  const checked = getStoredArray("paseosJuanSupervisorChecklist");
  const feedback = localStorage.getItem("paseosJuanSupervisorChecklistFeedback");
  const confirmed = localStorage.getItem("paseosJuanSupervisorChecklistConfirmed") === "true";
  const showDetails = localStorage.getItem("paseosJuanSupervisorChecklistDetails") !== "false";

  if (confirmed && !showDetails) {
    return `
      <section class="walker-panel reveal" style="background: #13291c; border: 1px solid rgba(31, 143, 90, 0.45);">
        <header class="walker-panel-head">
          <span style="color: rgba(31, 143, 90, 1);">${icon("checkCircle")}</span>
          <div>
            <h2 style="color: #f4f1e8;">Supervisión confirmada</h2>
            <p style="color: #9ca39d;">Todos los puntos críticos fueron revisados antes de iniciar la operación.</p>
          </div>
        </header>
        <div style="color: #9ca39d; margin-top: -10px; margin-bottom: 20px; font-size: 0.9rem;">
          <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
            <li>Paseadores presentes</li>
            <li>Rutas verificadas</li>
            <li>Equipamiento confirmado</li>
            <li>Comunicación activa</li>
          </ul>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="walker-secondary-button" style="border-radius: 9999px; padding: 4px 16px; font-size: 0.85rem; min-height: 36px; border-color: rgba(31, 143, 90, 0.45); color: #f4f1e8;" type="button" data-supervisor-checklist-view>Ver checklist</button>
          <button class="walker-secondary-button" style="border-radius: 9999px; padding: 4px 16px; font-size: 0.85rem; min-height: 36px; border-color: rgba(31, 143, 90, 0.45); color: #f4f1e8;" type="button" data-supervisor-checklist-edit>Editar revisión</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Checklist de supervisión", "Confirmaciones mínimas antes y durante la operación.", "clipboardCheck")}
      <div class="tactical-checklist">
        ${SUPERVISOR_CHECKLIST.map((item) => `
          <label class="tactical-check ${checked.includes(item) ? "is-checked" : ""}">
            <input data-supervisor-checklist-item="${item}" type="checkbox" ${checked.includes(item) ? "checked" : ""} />
            <span>${icon("checkCircle")}</span>
            ${item}
          </label>
        `).join("")}
      </div>
      <button class="walker-primary-button" type="button" data-supervisor-checklist-confirm>Confirmar supervisión</button>
      ${feedback ? `<p class="walker-form-feedback ${confirmed ? "is-success" : "is-warning"}">${feedback}</p>` : ""}
    </section>
  `;
}

function TeamCommunication() {
  const feedback = localStorage.getItem("paseosJuanSupervisorMessageFeedback");
  const draft = localStorage.getItem("paseosJuanSupervisorDraft") || "";
  const quickMessages = ["Avisar cambio de ruta", "Reforzar control", "Confirmar retiro", "Solicitar foto", "Contactar coordinación"];

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Comunicación con equipo", "Enviá mensajes rápidos a paseadores o coordinación.", "message")}
      <label class="walker-field">Destinatario
        <select>
          <option>Sebastián</option>
          <option>Bauti</option>
          <option>Todos los paseadores</option>
          <option>Coordinador</option>
        </select>
      </label>
      <div class="quick-command-grid">
        ${quickMessages.map((message) => `
          <button type="button" data-supervisor-quick-message="${message}">
            ${icon("send", "walker-button-icon")}
            ${message}
          </button>
        `).join("")}
      </div>
      <label class="walker-field">Mensaje
        <textarea placeholder="Escribí una instrucción operativa...">${draft}</textarea>
      </label>
      <button class="walker-primary-button" type="button" data-supervisor-send-message>Enviar mensaje</button>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function ReceivedReports() {
  const statuses = getStoredObject("paseosJuanSupervisorReportStatuses");
  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Reportes recibidos", "Incidentes o novedades enviadas por paseadores.", "fileText")}
      <div class="received-report-list">
        ${SUPERVISOR_REPORTS.map((report) => `
          <article class="received-report-card">
            <div>
              <small>${report.walker} · ${report.dog}</small>
              <h3>${report.type}</h3>
            </div>
            <span class="risk-chip risk-${report.level.toLowerCase()}">${report.level}</span>
            <p>${report.description}</p>
            <small>Estado: ${statuses[report.id] || report.status}</small>
            <div class="dog-card-actions">
              <button class="walker-secondary-button" type="button" data-report-id="${report.id}" data-report-action="Revisado">${icon("eye", "walker-button-icon")} Revisar</button>
              <button class="walker-secondary-button" type="button" data-report-id="${report.id}" data-report-action="Archivado">${icon("archive", "walker-button-icon")} Archivar</button>
              <button class="walker-secondary-button" type="button" data-walker-message="${report.walker}">Contactar paseador</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function ShiftClosure() {
  const feedback = localStorage.getItem("paseosJuanSupervisorClosureFeedback");
  const closureItems = [
    "Todos los perros entregados",
    "Reportes revisados",
    "Material cargado",
    "Paseadores confirmados",
    "Clientes notificados si corresponde",
  ];

  return `
    <section class="walker-panel supervisor-closure-panel reveal">
      ${WalkerPanelHeader("Cierre de jornada", "Resumen operativo antes de finalizar el turno.", "flag")}
      <div class="closure-metrics">
        ${[
          ["Perros paseados", "12"],
          ["Grupos completados", "2"],
          ["Incidentes abiertos", "1"],
          ["Material pendiente", "2"],
          ["Estado general", "Estable"],
        ].map(([label, value]) => `<span><small>${label}</small><strong>${value}</strong></span>`).join("")}
      </div>
      <div class="closure-checklist">
        ${closureItems.map((item) => `<span>${icon("checkCircle", "walker-button-icon")} ${item}</span>`).join("")}
      </div>
      <button class="walker-primary-button" type="button" data-closure-confirm>Cerrar jornada</button>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function SupervisorAlertData() {
  const extraAlert = localStorage.getItem("paseosJuanSupervisorExtraAlert") === "true"
    ? [{
        id: "demo-extra",
        dog: "Caipi",
        type: "Control inicial",
        level: "Medio",
        description: "Nueva alerta demo creada para revisar al iniciar el grupo.",
      }]
    : [];

  return [...SUPERVISOR_ALERTS, ...extraAlert];
}

function SupervisorSectionHeading(title, text) {
  return `
    <div class="walker-section-heading">
      <p class="walker-eyebrow">Centro de control</p>
      <h2>${title}</h2>
      <p>${text}</p>
    </div>
  `;
}


// Clicks de la vista supervisor. Devuelve true si atendió el click (corta la cadena).
function handleSupervisorClick(event) {
  const supervisorLogout = event.target.closest("[data-supervisor-logout]");
  if (supervisorLogout) {
    localStorage.removeItem("paseosJuanSupervisorShift");
    navigate("/login");
    return true;
  }

  const supervisorStart = event.target.closest("[data-supervisor-start]");
  if (supervisorStart) {
    localStorage.setItem("paseosJuanSupervisorShift", "active");
    localStorage.setItem("paseosJuanSupervisorFeedback", "Supervisión activa");
    render();
    return true;
  }

  const openCreateRoute = event.target.closest("[data-open-create-route]");
  if (openCreateRoute) {
    localStorage.setItem("paseosJuanCreateRouteOpen", "true");
    localStorage.removeItem("paseosJuanCreateRouteFeedback");
    render();
    return true;
  }

  const closeCreateRoute = event.target.closest("[data-close-create-route]");
  if (closeCreateRoute) {
    localStorage.setItem("paseosJuanCreateRouteOpen", "false");
    localStorage.removeItem("paseosJuanCreateRouteFeedback");
    render();
    return true;
  }

  const createRoute = event.target.closest("[data-create-route]");
  if (createRoute) {
    const draft = getRouteDraft();
    const validation = validateRouteDraft(draft);

    if (validation.errors.length) {
      localStorage.setItem("paseosJuanCreateRouteFeedback", validation.errors[0]);
      render();
      return true;
    }

    const routes = getCreatedRoutes();
    const route = {
      id: `route-${Date.now()}`,
      name: draft.name || `${draft.routeType === "Ruta cubierta por supervisor" ? "Ruta cubierta" : "Ruta"} - ${draft.zone}`,
      walker: draft.walker,
      routeType: draft.routeType,
      zone: draft.zone,
      start: draft.start || "15:00",
      dogIds: draft.order,
      notes: draft.notes,
      status: "Lista para confirmar",
    };

    const store = getStore();
    store.routes = [route, ...(store.routes || [])];
    saveStore(store);
    
    localStorage.setItem("paseosJuanCreatedRoutes", JSON.stringify([route, ...routes]));
    localStorage.setItem("paseosJuanCreateRouteOpen", "false");
    localStorage.removeItem("paseosJuanRouteDraft");
    showToast("Ruta creada correctamente.");
    return true;
  }

  const routeOrder = event.target.closest("[data-route-order]");
  if (routeOrder) {
    const draft = getRouteDraft();
    const dogId = routeOrder.dataset.dogId;
    const index = draft.order.indexOf(dogId);
    if (index === -1) return true;

    if (routeOrder.dataset.routeOrder === "up" && index > 0) {
      [draft.order[index - 1], draft.order[index]] = [draft.order[index], draft.order[index - 1]];
    }

    if (routeOrder.dataset.routeOrder === "down" && index < draft.order.length - 1) {
      [draft.order[index + 1], draft.order[index]] = [draft.order[index], draft.order[index + 1]];
    }

    if (routeOrder.dataset.routeOrder === "remove") {
      draft.selectedDogIds = draft.selectedDogIds.filter((id) => id !== dogId);
      draft.order = draft.order.filter((id) => id !== dogId);
    }

    saveRouteDraft(draft);
    render();
    return true;
  }

  const routeConfirm = event.target.closest("[data-route-confirm]");
  if (routeConfirm) {
    const routes = getCreatedRoutes().map((route) => (
      route.id === routeConfirm.dataset.routeConfirm ? { ...route, status: "Ruta confirmada" } : route
    ));
    localStorage.setItem("paseosJuanCreatedRoutes", JSON.stringify(routes));
    render();
    return true;
  }

  const routeEdit = event.target.closest("[data-route-edit]");
  if (routeEdit) {
    const route = getCreatedRoutes().find((item) => item.id === routeEdit.dataset.routeEdit);
    if (!route) return true;
    saveRouteDraft({
      name: route.name,
      walker: route.walker,
      routeType: route.routeType,
      zone: route.zone,
      start: route.start,
      selectedDogIds: route.dogIds,
      order: route.dogIds,
      notes: route.notes || "",
    });
    localStorage.setItem("paseosJuanCreateRouteOpen", "true");
    render();
    return true;
  }

  const routeDelete = event.target.closest("[data-route-delete]");
  if (routeDelete) {
    const routes = getCreatedRoutes().filter((route) => route.id !== routeDelete.dataset.routeDelete);
    localStorage.setItem("paseosJuanCreatedRoutes", JSON.stringify(routes));
    render();
    return true;
  }

  const routeContact = event.target.closest("[data-route-contact]");
  if (routeContact) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", "Mensaje enviado al paseador de la ruta.");
    render();
    return true;
  }

  const manageAbsence = event.target.closest("[data-manage-absence]");
  if (manageAbsence) {
    localStorage.setItem("paseosJuanSupervisorMode", "cover");
    localStorage.setItem("paseosJuanSupervisorFeedback", "Modo cobertura por ausencia activado.");
    render();
    return true;
  }

  const activateCompanionTop = event.target.closest("[data-activate-companion-top]");
  if (activateCompanionTop) {
    localStorage.setItem("paseosJuanSupervisorMode", "companion");
    localStorage.setItem("paseosJuanCompanionFeedback", "Acompañamiento activado.");
    render();
    return true;
  }

  const contactWalkersTop = event.target.closest("[data-contact-walkers-top]");
  if (contactWalkersTop) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", "Mensaje preparado para todos los paseadores.");
    document.getElementById("comunicacion-equipo")?.scrollIntoView({ behavior: "smooth" });
    return true;
  }

  const supervisorCreateAlert = event.target.closest("[data-supervisor-create-alert]");
  if (supervisorCreateAlert) {
    localStorage.setItem("paseosJuanSupervisorExtraAlert", "true");
    localStorage.setItem("paseosJuanSupervisorFeedback", "Alerta demo creada.");
    render();
    return true;
  }

  const companionActivate = event.target.closest("[data-companion-activate]");
  if (companionActivate) {
    localStorage.setItem("paseosJuanSupervisorMode", "companion");
    localStorage.setItem("paseosJuanCompanionFeedback", "Acompañamiento activado.");
    render();
    return true;
  }

  const companionSuggest = event.target.closest("[data-companion-suggest]");
  if (companionSuggest) {
    localStorage.setItem("paseosJuanSharedAssignments", JSON.stringify(suggestSharedDistribution()));
    localStorage.setItem("paseosJuanCompanionFeedback", "Distribución sugerida aplicada.");
    render();
    return true;
  }

  const companionSensitive = event.target.closest("[data-companion-sensitive]");
  if (companionSensitive) {
    localStorage.setItem("paseosJuanSharedAssignments", JSON.stringify(suggestSharedDistribution()));
    localStorage.setItem("paseosJuanCompanionFeedback", "Perros sensibles reasignados al supervisor.");
    render();
    return true;
  }

  const companionConfirm = event.target.closest("[data-companion-confirm]");
  if (companionConfirm) {
    const validation = getSharedDistributionValidation(getSharedAssignments());
    localStorage.setItem(
      "paseosJuanCompanionFeedback",
      validation.errors.length ? "Revisá los límites antes de confirmar." : "Distribución compartida confirmada.",
    );
    render();
    return true;
  }

  const companionContact = event.target.closest("[data-companion-contact]");
  if (companionContact) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", "Mensaje enviado al paseador acompañado.");
    render();
    return true;
  }

  const sharedAssign = event.target.closest("[data-shared-assign]");
  if (sharedAssign) {
    const assignments = getSharedAssignments();
    assignments[sharedAssign.dataset.dogId] = sharedAssign.dataset.sharedAssign;
    localStorage.setItem("paseosJuanSharedAssignments", JSON.stringify(assignments));
    localStorage.removeItem("paseosJuanCompanionFeedback");
    render();
    return true;
  }

  const supervisorCloseShift = event.target.closest("[data-supervisor-close-shift]");
  if (supervisorCloseShift) {
    localStorage.setItem("paseosJuanSupervisorClosureFeedback", "Jornada cerrada correctamente.");
    localStorage.setItem("paseosJuanSupervisorFeedback", "Jornada cerrada correctamente.");
    render();
    return true;
  }

  const walkerMessage = event.target.closest("[data-walker-message]");
  if (walkerMessage) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", `Mensaje enviado a ${walkerMessage.dataset.walkerMessage}.`);
    render();
    return true;
  }

  const walkerDelay = event.target.closest("[data-walker-delay]");
  if (walkerDelay) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", `Demora reportada para ${walkerDelay.dataset.walkerDelay}.`);
    render();
    return true;
  }

  const pickupAction = event.target.closest("[data-pickup-action]");
  if (pickupAction) {
    const statuses = getStoredObject("paseosJuanPickupStatuses");
    statuses[pickupAction.dataset.pickupId] = pickupAction.dataset.pickupAction;
    localStorage.setItem("paseosJuanPickupStatuses", JSON.stringify(statuses));
    render();
    return true;
  }

  const alertReviewed = event.target.closest("[data-alert-reviewed]");
  if (alertReviewed) {
    const reviewed = getStoredArray("paseosJuanReviewedAlerts");
    localStorage.setItem(
      "paseosJuanReviewedAlerts",
      JSON.stringify([...new Set([...reviewed, alertReviewed.dataset.alertReviewed])]),
    );
    render();
    return true;
  }

  const alertNotify = event.target.closest("[data-alert-notify]");
  if (alertNotify) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", `Paseador notificado por alerta de ${alertNotify.dataset.alertNotify}.`);
    render();
    return true;
  }

  const supervisorChecklistConfirm = event.target.closest("[data-supervisor-checklist-confirm]");
  if (supervisorChecklistConfirm) {
    const checked = getStoredArray("paseosJuanSupervisorChecklist");
    const complete = SUPERVISOR_CHECKLIST.every((item) => checked.includes(item));
    localStorage.setItem(
      "paseosJuanSupervisorChecklistFeedback",
      complete ? "Supervisión confirmada." : "Faltan puntos críticos por confirmar.",
    );
    localStorage.setItem("paseosJuanSupervisorChecklistConfirmed", complete ? "true" : "false");
    if (complete) {
      localStorage.setItem("paseosJuanSupervisorChecklistDetails", "false");
    }
    render();
    return true;
  }

  const supervisorChecklistView = event.target.closest("[data-supervisor-checklist-view]");
  if (supervisorChecklistView) {
    localStorage.setItem("paseosJuanSupervisorChecklistDetails", "true");
    render();
    return true;
  }

  const supervisorChecklistEdit = event.target.closest("[data-supervisor-checklist-edit]");
  if (supervisorChecklistEdit) {
    localStorage.setItem("paseosJuanSupervisorChecklistDetails", "true");
    localStorage.setItem("paseosJuanSupervisorChecklistConfirmed", "false");
    localStorage.removeItem("paseosJuanSupervisorChecklistFeedback");
    render();
    return true;
  }

  const supervisorQuickMessage = event.target.closest("[data-supervisor-quick-message]");
  if (supervisorQuickMessage) {
    localStorage.setItem("paseosJuanSupervisorDraft", supervisorQuickMessage.dataset.supervisorQuickMessage);
    render();
    return true;
  }

  const supervisorSendMessage = event.target.closest("[data-supervisor-send-message]");
  if (supervisorSendMessage) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", "Mensaje enviado correctamente.");
    localStorage.removeItem("paseosJuanSupervisorDraft");
    render();
    return true;
  }

  const reportAction = event.target.closest("[data-report-action]");
  if (reportAction) {
    const statuses = getStoredObject("paseosJuanSupervisorReportStatuses");
    statuses[reportAction.dataset.reportId] = reportAction.dataset.reportAction;
    localStorage.setItem("paseosJuanSupervisorReportStatuses", JSON.stringify(statuses));
    render();
    return true;
  }

  const closureConfirm = event.target.closest("[data-closure-confirm]");
  if (closureConfirm) {
    localStorage.setItem("paseosJuanSupervisorClosureFeedback", "Jornada cerrada correctamente.");
    render();
    return true;
  }

  return false;
}

function handleSupervisorChange(event) {
  const supervisorChecklistItem = event.target.closest("[data-supervisor-checklist-item]");
  if (supervisorChecklistItem) {
    const checked = getStoredArray("paseosJuanSupervisorChecklist");
    const item = supervisorChecklistItem.dataset.supervisorChecklistItem;
    const next = supervisorChecklistItem.checked
      ? [...new Set([...checked, item])]
      : checked.filter((value) => value !== item);
    localStorage.setItem("paseosJuanSupervisorChecklist", JSON.stringify(next));
    localStorage.removeItem("paseosJuanSupervisorChecklistFeedback");
    render();
    return true;
  }

  const supervisorMode = event.target.closest("[data-supervisor-mode]");
  if (supervisorMode) {
    localStorage.setItem("paseosJuanSupervisorMode", supervisorMode.value);
    render();
    return true;
  }

  const companionWalker = event.target.closest("[data-companion-walker]");
  if (companionWalker) {
    localStorage.setItem("paseosJuanCompanionWalker", companionWalker.value);
    render();
    return true;
  }

  const companionRoute = event.target.closest("[data-companion-route]");
  if (companionRoute) {
    localStorage.setItem("paseosJuanCompanionRoute", companionRoute.value);
    render();
    return true;
  }

  const createRouteType = event.target.closest("[data-create-route-type]");
  if (createRouteType) {
    localStorage.setItem("paseosJuanCreateRouteType", createRouteType.value);
    render();
    return true;
  }

  const routeDraftField = event.target.closest("[data-route-draft]");
  if (routeDraftField) {
    const draft = getRouteDraft();
    draft[routeDraftField.dataset.routeDraft] = routeDraftField.value;
    saveRouteDraft(draft);
    render();
    return true;
  }

  const routeDog = event.target.closest("[data-route-dog]");
  if (routeDog) {
    const draft = getRouteDraft();
    const dogId = routeDog.dataset.routeDog;
    if (routeDog.checked) {
      draft.selectedDogIds = [...new Set([...draft.selectedDogIds, dogId])];
      draft.order = [...draft.order.filter((id) => draft.selectedDogIds.includes(id)), dogId];
    } else {
      draft.selectedDogIds = draft.selectedDogIds.filter((id) => id !== dogId);
      draft.order = draft.order.filter((id) => id !== dogId);
    }
    saveRouteDraft(draft);
    render();
  }

  return false;
}

export function registerSupervisorEvents() {
  clickHandlers.push(handleSupervisorClick);
  changeHandlers.push(handleSupervisorChange);
}
