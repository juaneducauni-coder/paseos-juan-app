// Vista del rol Coordinador (incluye cobros).
import { getStore, saveStore, showToast } from "../store/paseosJuanStore.js";
import { WALKS, PAYMENT_CLIENTS, PAYMENT_HISTORY, PAYMENT_ALIAS, COORDINATOR_REQUESTS } from "../data/mock.js";
import {
  icon,
  getStoredArray,
  getStoredObject,
  SharedChatPanel,
  walkRow,
  changeHandlers,
  clickHandlers,
} from "../ui/shared.js";
import { navigate, render } from "../app.js";

function getPaymentClient(clientId) {
  const statuses = getStoredObject("paseosJuanPaymentStatuses");
  return PAYMENT_CLIENTS.map((client) => ({
    ...client,
    status: statuses[client.id] || client.status,
    lastPayment: localStorage.getItem(`paseosJuanPaymentLast-${client.id}`) || client.lastPayment,
  })).find((client) => client.id === clientId);
}

function getPaymentClients() {
  return PAYMENT_CLIENTS.map((client) => getPaymentClient(client.id));
}

function getPaymentHistory() {
  return [...getStoredArray("paseosJuanPaymentHistory"), ...PAYMENT_HISTORY];
}

function addPaymentHistory(entry) {
  localStorage.setItem("paseosJuanPaymentHistory", JSON.stringify([entry, ...getStoredArray("paseosJuanPaymentHistory")]));
}

function getPaymentReminderText(client) {
  return `Hola, ${client.client}. Te recordamos que está pendiente el pago del plan de ${client.dogs}.

Plan: ${client.plan}
Monto: ${client.amount}

Podés transferir al alias:
${PAYMENT_ALIAS}

Cuando lo hagas, por favor envianos el comprobante para registrarlo.

Gracias.`;
}

export function coordinatorShell(content) {
  return `
    <div class="coordinator-shell">
      ${CoordinatorHeader()}
      ${content}
    </div>
  `;
}

function CoordinatorHeader() {
  return `
    <header class="coordinator-header">
      <a class="coordinator-brand" href="/coordinador" data-link aria-label="Paseos Juan Gestión">
        <span class="coordinator-logo">
          <img src="/paseos-juan-logo-green.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Gestión</strong>
          <small>Panel coordinador</small>
        </span>
      </a>
      <div class="coordinator-header-actions">
        <span class="coordinator-online"><b></b> Online</span>
        <button class="secondary-button" type="button" data-coordinator-logout>
          ${icon("logOut", "walker-button-icon")}
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
}

export function coordinatorDashboard() {
  return `
    <main class="dashboard coordinator-dashboard">
      <section class="dashboard-content">
        ${CoordinatorHero()}
        ${NewDogIntake()}
        ${ClientRequestsBoard()}
        ${SendToSupervisorPanel()}
        ${CoordinatorOperationsGrid()}
        ${SharedChatPanel("coordinador", "Chat con clientes", "Coordinación y supervisor pueden responder. El cliente escribe desde su perfil y paseador queda solo lectura.")}
        ${PaymentsDashboard()}
      </section>
    </main>
  `;
}

function CoordinatorHero() {
  return `
    <section class="coordinator-hero">
      <div>
        <p class="eyebrow">Centro de gestión</p>
        <h1>Coordinación diaria</h1>
        <p>Clientes, perros nuevos, documentación, chat, cobros, evaluaciones y derivaciones al supervisor en un solo panel.</p>
      </div>
      <div class="coordinator-hero-stats">
        <span><b>5</b><small>Solicitudes abiertas</small></span>
        <span><b>3</b><small>Evaluaciones a coordinar</small></span>
        <span><b>4</b><small>Alertas de cobro</small></span>
      </div>
    </section>
  `;
}

function NewDogIntake() {
  const feedback = localStorage.getItem("paseosJuanCoordinatorDogFeedback");
  const documentName = localStorage.getItem("paseosJuanCoordinatorDocument");

  return `
    <section class="coordinator-module coordinator-intake" id="agregar-perro">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Nuevo ingreso</p>
          <h2>Agregar perro nuevo</h2>
          <p>Completá la ficha base para crear el perfil, revisar documentación y decidir si corresponde evaluación.</p>
        </div>
      </div>
      <div class="coordinator-form-grid">
        <label>Nombre del perro <input placeholder="Ej. Bruno" /></label>
        <label>Edad <input placeholder="Ej. 3 años" /></label>
        <label>Raza o cruza <input placeholder="Ej. mestizo, labrador, cruza" /></label>
        <label>Tamaño
          <select>
            <option>Pequeño</option>
            <option selected>Mediano</option>
            <option>Grande</option>
          </select>
        </label>
        <label>Energía
          <select>
            <option>Baja</option>
            <option selected>Media</option>
            <option>Alta</option>
          </select>
        </label>
        <label>Conducta <input placeholder="Ej. sociable, tira al inicio" /></label>
        <label>Sociabilidad
          <select>
            <option>Buena con perros</option>
            <option>Depende del grupo</option>
            <option>Requiere evaluación</option>
          </select>
        </label>
        <label>Antecedentes de agresividad
          <select>
            <option>No</option>
            <option>Depende del estímulo</option>
            <option>Sí</option>
          </select>
        </label>
        <label>Nombre del cliente <input placeholder="Ej. Martín Rivas" /></label>
        <label>WhatsApp <input placeholder="+54 9 11..." /></label>
        <label>Dirección <input placeholder="Casa, torre o referencia" /></label>
        <label>Zona
          <select>
            <option>Mapuche Norte</option>
            <option>Mapuche Sur</option>
            <option>Mapuche Centro</option>
            <option>Otra zona</option>
          </select>
        </label>
        <label>Vacunas/documentación
          <input data-coordinator-document type="file" accept=".jpg,.jpeg,.png,.pdf" />
          <small>${documentName || "JPG, PNG o PDF"}</small>
        </label>
        <label>Servicio solicitado
          <select>
            <option>Evaluación inicial</option>
            <option>Paseo grupal</option>
            <option>Consulta de plan</option>
            <option>Cambio de conducta</option>
          </select>
        </label>
        <label>Estado interno
          <select>
            <option>Nuevo ingreso</option>
            <option>Documentación pendiente</option>
            <option>Listo para evaluación</option>
            <option>En revisión de riesgo</option>
          </select>
        </label>
        <label class="span-2">Observaciones internas
          <textarea placeholder="Datos clave para coordinación y supervisor"></textarea>
        </label>
      </div>
      <div class="coordinator-action-row">
        <button class="secondary-button" type="button" data-coordinator-save-dog="save">Guardar perro</button>
        <button class="primary-button" type="button" data-coordinator-save-dog="evaluation">Guardar y enviar a evaluación</button>
      </div>
      ${feedback ? `<p class="coordinator-feedback">${feedback}</p>` : ""}
    </section>
  `;
}

function ClientRequestsBoard() {
  const feedback = localStorage.getItem("paseosJuanCoordinatorRequestFeedback");

  return `
    <section class="coordinator-module">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Entrada comercial y operativa</p>
          <h2>Solicitudes de clientes</h2>
          <p>Clasificá consultas, documentación pendiente, evaluaciones iniciales y cambios de conducta.</p>
        </div>
        ${feedback ? `<span class="coordinator-feedback is-compact">${feedback}</span>` : ""}
      </div>
      <div class="coordinator-request-grid">
        ${COORDINATOR_REQUESTS.map((request) => `
          <article class="coordinator-request-card">
            <div class="coordinator-request-head">
              <span>${request.type}</span>
              <b>${request.status}</b>
            </div>
            <h3>${request.client}</h3>
            <p>${request.dog} · ${request.zone}</p>
            <small>${request.detail}</small>
            <div class="coordinator-request-actions">
              ${["Ver solicitud", "Hablar con cliente", "Crear perfil", "Enviar a evaluación"].map((action) => `
                <button class="secondary-button" type="button" data-coordinator-request-action="${action}" data-request-dog="${request.dog}">
                  ${action}
                </button>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function SendToSupervisorPanel() {
  const feedback = localStorage.getItem("paseosJuanCoordinatorSupervisorFeedback");

  return `
    <section class="coordinator-module">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Derivación operativa</p>
          <h2>Enviar al supervisor</h2>
          <p>Derivá perros que requieren evaluación, integración al grupo, revisión de riesgo o seguimiento de conducta.</p>
        </div>
      </div>
      <div class="coordinator-form-grid compact">
        <label>Perro
          <select>
            ${["Bruno", "Luna", "Pistacho", "Frida", "Kiara", "Forest"].map((dog) => `<option>${dog}</option>`).join("")}
          </select>
        </label>
        <label>Cliente <input placeholder="Nombre del cliente" /></label>
        <label>Zona
          <select>
            <option>Mapuche Norte</option>
            <option>Mapuche Sur</option>
            <option>Mapuche Centro</option>
          </select>
        </label>
        <label>Motivo
          <select>
            <option>Evaluación inicial</option>
            <option>Integración a grupo</option>
            <option>Cambio de conducta</option>
            <option>Revisión de riesgo</option>
          </select>
        </label>
        <label class="span-2">Observaciones
          <textarea placeholder="Conducta, energía, documentación o punto crítico a revisar"></textarea>
        </label>
      </div>
      <div class="coordinator-action-row">
        <button class="primary-button" type="button" data-send-supervisor>Enviar al supervisor</button>
      </div>
      ${feedback ? `<p class="coordinator-feedback">${feedback}</p>` : ""}
    </section>
  `;
}

function CoordinatorOperationsGrid() {
  return `
    <section class="coordinator-operations-grid">
      <article class="coordinator-module">
        <div class="coordinator-module-head">
          <div>
            <p class="eyebrow">Agenda</p>
            <h2>Paseos y evaluaciones</h2>
          </div>
        </div>
        ${WALKS.map((walk) => walkRow(walk)).join("")}
      </article>
      <article class="coordinator-module">
        <div class="coordinator-module-head">
          <div>
            <p class="eyebrow">Prioridades</p>
            <h2>Alertas de gestión</h2>
          </div>
        </div>
        ${["Documentación de Bruno pendiente", "Frida requiere revisión de conducta", "Sol consultó Plan 2", "Vilma registra deuda"].map((alert) => `
          <div class="notice">${alert}</div>
        `).join("")}
      </article>
    </section>
  `;
}

function PaymentsDashboard() {
  return `
    <section class="payments-dashboard reveal">
      ${RegisterPaymentModal()}
      ${PaymentReminderModal()}
      <div class="payments-heading">
        <div>
          <p class="eyebrow">Cobros y pagos</p>
          <h2>Cobros y pagos</h2>
          <p>Controlá planes activos, pagos pendientes, deudas y recordatorios a clientes.</p>
        </div>
        <span class="payments-permissions">Coordinador: cobros, recordatorios, comprobantes y comunicación.</span>
      </div>
      ${PaymentsSummaryCards()}
      <div class="payments-layout">
        ${PaymentAliasCard()}
        ${PaymentAlerts()}
      </div>
      ${ClientPaymentsList()}
      ${PaymentHistory()}
    </section>
  `;
}

function PaymentsSummaryCards() {
  const cards = [
    ["Total a cobrar", "$245.000", "wallet"],
    ["Cobrado", "$160.000", "creditCard"],
    ["Pendiente", "$85.000", "receipt"],
    ["Clientes con deuda", "4 clientes", "alertTriangle"],
    ["Pagos por confirmar", "2 pagos", "checkCircle"],
  ];

  return `
    <div class="payments-summary-grid">
      ${cards.map(([title, value, iconName]) => `
        <article class="payment-summary-card">
          <span>${icon(iconName)}</span>
          <small>${title}</small>
          <strong>${value}</strong>
        </article>
      `).join("")}
    </div>
  `;
}

function ClientPaymentsList() {
  return `
    <section class="payments-panel">
      <div class="payments-section-head">
        <div>
          <h3>Clientes y cobros</h3>
          <p>Planes activos, vencimientos, estado de pago y acciones rápidas.</p>
        </div>
      </div>
      <div class="client-payments-grid">
        ${getPaymentClients().map((client) => PaymentClientCard(client)).join("")}
      </div>
    </section>
  `;
}

function PaymentClientCard(client) {
  return `
    <article class="client-payment-card">
      <div class="client-payment-head">
        <div>
          <small>${client.plan}</small>
          <h4>${client.client}</h4>
          <p>${client.dogs}</p>
        </div>
        <span class="payment-status ${paymentStatusClass(client.status)}">${client.status}</span>
      </div>
      <div class="payment-detail-grid">
        <span><small>Monto</small><b>${client.amount}</b></span>
        <span><small>Vencimiento</small><b>${client.due}</b></span>
        <span><small>Último pago</small><b>${client.lastPayment}</b></span>
      </div>
      <div class="payment-actions">
        <button class="secondary-button" type="button" data-register-payment="${client.id}">Registrar pago</button>
        <button class="secondary-button" type="button" data-payment-reminder="${client.id}">Enviar recordatorio</button>
        <button class="secondary-button" type="button" data-payment-history="${client.id}">Ver historial</button>
        <button class="secondary-button" type="button" data-payment-chat="${client.id}">Hablar con cliente</button>
      </div>
    </article>
  `;
}

function RegisterPaymentModal() {
  const modal = localStorage.getItem("paseosJuanPaymentModal");
  if (modal !== "register") return "";
  const client = getPaymentClient(localStorage.getItem("paseosJuanSelectedPaymentClient"));
  if (!client) return "";
  const receipt = localStorage.getItem(`paseosJuanPaymentReceipt-${client.id}`);

  return `
    <section class="payment-modal-backdrop">
      <div class="payment-modal">
        <header class="payment-modal-head">
          <div>
            <p class="eyebrow">Registrar pago</p>
            <h3>Registrar pago</h3>
          </div>
          <button type="button" data-close-payment-modal aria-label="Cerrar">${icon("x", "walker-button-icon")}</button>
        </header>
        <div class="payment-form-grid">
          <label>Cliente <input value="${client.client}" readonly /></label>
          <label>Perro/perros <input value="${client.dogs}" readonly /></label>
          <label>Monto recibido <input data-payment-amount value="${client.amount}" /></label>
          <label>Método de pago
            <select data-payment-method>
              <option>Transferencia</option>
              <option>Efectivo</option>
              <option>Mercado Pago</option>
              <option>Otro</option>
            </select>
          </label>
          <label>Fecha de pago <input data-payment-date placeholder="Ej. 24/05" /></label>
          <label>Comprobante
            <input data-payment-receipt="${client.id}" type="file" accept=".jpg,.jpeg,.png,.pdf" />
            <small>${receipt || "Imagen o PDF"}</small>
          </label>
          <label class="span-2">Observaciones
            <textarea data-payment-notes placeholder="Detalle del pago, comprobante o aclaración"></textarea>
          </label>
        </div>
        <footer class="payment-modal-actions">
          <button class="secondary-button" type="button" data-close-payment-modal>Cancelar</button>
          <button class="primary-button" type="button" data-confirm-payment="${client.id}">Confirmar pago</button>
        </footer>
      </div>
    </section>
  `;
}

function PaymentReminderModal() {
  const modal = localStorage.getItem("paseosJuanPaymentModal");
  if (modal !== "reminder") return "";
  const client = getPaymentClient(localStorage.getItem("paseosJuanSelectedPaymentClient"));
  if (!client) return "";

  return `
    <section class="payment-modal-backdrop">
      <div class="payment-modal">
        <header class="payment-modal-head">
          <div>
            <p class="eyebrow">Recordatorio de pago</p>
            <h3>Recordatorio de pago</h3>
          </div>
          <button type="button" data-close-payment-modal aria-label="Cerrar">${icon("x", "walker-button-icon")}</button>
        </header>
        <label class="payment-reminder-message">Mensaje editable
          <textarea data-reminder-message>${getPaymentReminderText(client)}</textarea>
        </label>
        <footer class="payment-modal-actions">
          <button class="secondary-button" type="button" data-copy-reminder="${client.id}">${icon("copy", "walker-button-icon")} Copiar mensaje</button>
          <button class="secondary-button" type="button" data-whatsapp-reminder="${client.id}">${icon("message", "walker-button-icon")} Enviar por WhatsApp</button>
          <button class="primary-button" type="button" data-mark-reminder-sent="${client.id}">Marcar recordatorio enviado</button>
        </footer>
      </div>
    </section>
  `;
}

function PaymentHistory() {
  return `
    <section class="payments-panel" id="historial-cobros">
      <div class="payments-section-head">
        <div>
          <h3>Historial de cobros</h3>
          <p>Pagos, recordatorios, comprobantes y observaciones de coordinación.</p>
        </div>
      </div>
      <div class="payment-history-list">
        ${getPaymentHistory().map((item) => `
          <article class="payment-history-row">
            <div><small>Cliente</small><strong>${item.client}</strong><span>${item.dogs}</span></div>
            <div><small>Monto</small><strong>${item.amount}</strong><span>${item.method}</span></div>
            <div><small>Fecha</small><strong>${item.date}</strong><span>${item.status}</span></div>
            <div><small>Observaciones</small><span>${item.notes}</span><b>${item.receipt || "Sin comprobante"}</b></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function PaymentAliasCard() {
  const feedback = localStorage.getItem("paseosJuanPaymentFeedback");
  return `
    <article class="payments-panel payment-alias-card">
      <span>${icon("wallet")}</span>
      <div>
        <h3>Datos de transferencia</h3>
        <p>Usá este alias para enviar recordatorios de pago a clientes.</p>
        <strong>${PAYMENT_ALIAS}</strong>
      </div>
      <button class="primary-button" type="button" data-copy-payment-alias>${icon("copy", "walker-button-icon")} Copiar alias</button>
      ${feedback ? `<small class="payment-feedback">${feedback}</small>` : ""}
    </article>
  `;
}

function PaymentAlerts() {
  const resolved = getStoredArray("paseosJuanResolvedPaymentAlerts");
  const alerts = [
    ["martin", "Martín", "$37.500", "Pendiente", "Enviar recordatorio y pedir comprobante."],
    ["sol", "Sol", "$37.500", "Pago por confirmar", "Validar comprobante recibido."],
    ["vilma", "Vilma", "$45.900", "Deuda", "Contactar y coordinar regularización."],
    ["laura", "Laura", "$72.500", "Al día", "Pago confirmado."],
  ].filter(([id]) => !resolved.includes(id));

  return `
    <section class="payments-panel">
      <div class="payments-section-head">
        <div>
          <h3>Alertas de cobro</h3>
          <p>Casos que requieren seguimiento administrativo.</p>
        </div>
      </div>
      <div class="payment-alert-list">
        ${alerts.map(([id, client, amount, status, action]) => `
          <article class="payment-alert-card">
            <span class="payment-status ${paymentStatusClass(status)}">${status}</span>
            <strong>${client}</strong>
            <small>${amount}</small>
            <p>${action}</p>
            <div class="payment-actions">
              <button class="secondary-button" type="button" data-resolve-payment-alert="${id}">Resolver</button>
              <button class="secondary-button" type="button" data-payment-chat="${id}">Hablar con cliente</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function paymentStatusClass(status) {
  return status
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "-");
}


// Clicks de la vista coordinador. Devuelve true si atendió el click (corta la cadena).
function handleCoordinadorClick(event) {
  const coordinatorLogout = event.target.closest("[data-coordinator-logout]");
  if (coordinatorLogout) {
    navigate("/login");
    return true;
  }

  const coordinatorSaveDog = event.target.closest("[data-coordinator-save-dog]");
  if (coordinatorSaveDog) {
    const mode = coordinatorSaveDog.dataset.coordinatorSaveDog;
    const form = coordinatorSaveDog.closest('.coordinator-intake');
    const inputs = form ? form.querySelectorAll('input, select, textarea') : [];
    let dogName = "Nuevo Perro";
    let clientName = "Cliente";
    let zone = "Mapuche Norte";
    let energy = "Media";
    let risk = "Medio";
    
    inputs.forEach(input => {
      if (input.placeholder?.includes('Bruno')) dogName = input.value || dogName;
      if (input.placeholder?.includes('Martín Rivas')) clientName = input.value || clientName;
    });
    
    const store = getStore();
    const newDog = { id: 'dog-'+Date.now(), name: dogName, client: clientName, zone, energy, risk, compatibility: 'A evaluar' };
    
    // Add to Dogs
    store.dogs = [newDog, ...(store.dogs || [])];
    
    // Add to Clients
    const newClient = { client: clientName, dogs: dogName, zone, plan: "Plan 1", documentation: "Pendiente", status: "Activo" };
    store.clients = [newClient, ...(store.clients || [])];
    
    // Add to Supervisor tasks if evaluation
    if (mode === "evaluation") {
      store.alerts = [{ id: 'alert-'+Date.now(), dog: dogName, type: 'Evaluación inicial', level: 'Medio', description: `Derivado por coordinador. Cliente: ${clientName}` }, ...(store.alerts || [])];
    }
    
    saveStore(store);
    showToast(mode === "evaluation" ? "Perro guardado y enviado a evaluación." : "Perro guardado correctamente.");
    return true;
  }

  const coordinatorRequestAction = event.target.closest("[data-coordinator-request-action]");
  if (coordinatorRequestAction) {
    localStorage.setItem(
      "paseosJuanCoordinatorRequestFeedback",
      `${coordinatorRequestAction.dataset.coordinatorRequestAction} registrado para ${coordinatorRequestAction.dataset.requestDog}.`,
    );
    render();
    return true;
  }

  const coordinatorSendSupervisor = event.target.closest("[data-send-supervisor]");
  if (coordinatorSendSupervisor) {
    const store = getStore();
    store.alerts = [{ id: 'alert-'+Date.now(), dog: "Perro derivado", type: 'Derivación', level: 'Medio', description: "Enviado por coordinador para revisión." }, ...(store.alerts || [])];
    saveStore(store);
    showToast("Solicitud enviada al supervisor.");
    return true;
  }

  const registerPayment = event.target.closest("[data-register-payment]");
  if (registerPayment) {
    localStorage.setItem("paseosJuanPaymentModal", "register");
    localStorage.setItem("paseosJuanSelectedPaymentClient", registerPayment.dataset.registerPayment);
    localStorage.removeItem("paseosJuanPaymentFeedback");
    render();
    return true;
  }

  const reminderPayment = event.target.closest("[data-payment-reminder]");
  if (reminderPayment) {
    localStorage.setItem("paseosJuanPaymentModal", "reminder");
    localStorage.setItem("paseosJuanSelectedPaymentClient", reminderPayment.dataset.paymentReminder);
    localStorage.removeItem("paseosJuanPaymentFeedback");
    render();
    return true;
  }

  const closePaymentModal = event.target.closest("[data-close-payment-modal]");
  if (closePaymentModal) {
    localStorage.removeItem("paseosJuanPaymentModal");
    localStorage.removeItem("paseosJuanSelectedPaymentClient");
    render();
    return true;
  }

  const confirmPayment = event.target.closest("[data-confirm-payment]");
  if (confirmPayment) {
    const client = getPaymentClient(confirmPayment.dataset.confirmPayment);
    if (!client) return true;
    const statuses = getStoredObject("paseosJuanPaymentStatuses");
    statuses[client.id] = "Al día";
    localStorage.setItem("paseosJuanPaymentStatuses", JSON.stringify(statuses));
    localStorage.setItem(`paseosJuanPaymentLast-${client.id}`, "Confirmado");
    addPaymentHistory({
      id: `payment-${Date.now()}`,
      client: client.client,
      dogs: client.dogs,
      amount: document.querySelector("[data-payment-amount]")?.value?.trim() || client.amount,
      method: document.querySelector("[data-payment-method]")?.value || "Transferencia",
      date: document.querySelector("[data-payment-date]")?.value?.trim() || "Hoy",
      status: "Confirmado",
      notes: document.querySelector("[data-payment-notes]")?.value?.trim() || "Pago registrado por coordinación.",
      receipt: localStorage.getItem(`paseosJuanPaymentReceipt-${client.id}`) || "",
    });
    localStorage.removeItem("paseosJuanPaymentModal");
    localStorage.setItem("paseosJuanPaymentFeedback", "Pago registrado correctamente.");
    render();
    return true;
  }

  const markReminderSent = event.target.closest("[data-mark-reminder-sent]");
  if (markReminderSent) {
    const client = getPaymentClient(markReminderSent.dataset.markReminderSent);
    if (!client) return true;
    addPaymentHistory({
      id: `reminder-${Date.now()}`,
      client: client.client,
      dogs: client.dogs,
      amount: client.amount,
      method: "Recordatorio",
      date: "Hoy",
      status: "Recordatorio enviado",
      notes: "Recordatorio enviado.",
      receipt: "",
    });
    localStorage.removeItem("paseosJuanPaymentModal");
    localStorage.setItem("paseosJuanPaymentFeedback", "Recordatorio enviado.");
    render();
    return true;
  }

  const copyPaymentAlias = event.target.closest("[data-copy-payment-alias]");
  if (copyPaymentAlias) {
    navigator.clipboard?.writeText(PAYMENT_ALIAS).catch(() => {});
    localStorage.setItem("paseosJuanPaymentFeedback", `Alias copiado: ${PAYMENT_ALIAS}`);
    render();
    return true;
  }

  const copyReminder = event.target.closest("[data-copy-reminder]");
  if (copyReminder) {
    const client = getPaymentClient(copyReminder.dataset.copyReminder);
    const message = document.querySelector("[data-reminder-message]")?.value?.trim() || (client ? getPaymentReminderText(client) : "");
    if (message) navigator.clipboard?.writeText(message).catch(() => {});
    localStorage.setItem("paseosJuanPaymentFeedback", "Mensaje de recordatorio copiado.");
    render();
    return true;
  }

  const whatsappReminder = event.target.closest("[data-whatsapp-reminder]");
  if (whatsappReminder) {
    const client = getPaymentClient(whatsappReminder.dataset.whatsappReminder);
    const message = document.querySelector("[data-reminder-message]")?.value?.trim() || (client ? getPaymentReminderText(client) : "");
    if (message) window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    localStorage.setItem("paseosJuanPaymentFeedback", "Recordatorio listo para enviar por WhatsApp.");
    render();
    return true;
  }

  const paymentHistory = event.target.closest("[data-payment-history]");
  if (paymentHistory) {
    document.getElementById("historial-cobros")?.scrollIntoView({ behavior: "smooth" });
    return true;
  }

  const paymentChat = event.target.closest("[data-payment-chat]");
  if (paymentChat) {
    localStorage.setItem("paseosJuanPaymentFeedback", "Chat con cliente preparado para cobros.");
    render();
    return true;
  }

  const resolvePaymentAlert = event.target.closest("[data-resolve-payment-alert]");
  if (resolvePaymentAlert) {
    const resolved = getStoredArray("paseosJuanResolvedPaymentAlerts");
    localStorage.setItem(
      "paseosJuanResolvedPaymentAlerts",
      JSON.stringify([...new Set([...resolved, resolvePaymentAlert.dataset.resolvePaymentAlert])]),
    );
    render();
    return true;
  }

  return false;
}

function handleCoordinadorChange(event) {
  const coordinatorDocument = event.target.closest("[data-coordinator-document]");
  if (coordinatorDocument) {
    const file = coordinatorDocument.files?.[0];
    if (file) {
      localStorage.setItem("paseosJuanCoordinatorDocument", file.name);
      render();
    }
    return true;
  }

  const paymentReceipt = event.target.closest("[data-payment-receipt]");
  if (paymentReceipt) {
    const file = paymentReceipt.files?.[0];
    const clientId = paymentReceipt.dataset.paymentReceipt;
    if (file && clientId) {
      localStorage.setItem(`paseosJuanPaymentReceipt-${clientId}`, file.name);
      render();
    }
    return true;
  }

  return false;
}

export function registerCoordinadorEvents() {
  clickHandlers.push(handleCoordinadorClick);
  changeHandlers.push(handleCoordinadorChange);
}
