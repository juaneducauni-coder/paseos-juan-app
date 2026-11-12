// Vista del rol Admin.
import { getStore, openModal, showToast } from "../store/paseosJuanStore.js";
import { getChatConversations } from "../data/chatDemo.js";
import {
  ADMIN_SUMMARY,
  ADMIN_HIERARCHY,
  ADMIN_USERS,
  ADMIN_REPORTS,
  ADMIN_CLIENTS,
  ADMIN_SETTINGS,
  ADMIN_CRITICAL_ALERTS,
  PLAN_SIZES,
  PLANS,
  DISCOUNTS,
} from "../data/mock.js";
import { icon, getStoredArray, actionClickHandlers, clickHandlers } from "../ui/shared.js";
import { navigate } from "../app.js";

export function adminShell(content) {
  return `
    <div class="admin-shell">
      ${AdminHeader()}
      ${content}
    </div>
  `;
}

function AdminHeader() {
  return `
    <header class="admin-header">
      <a class="admin-brand" href="/admin" data-link aria-label="Paseos Juan Admin">
        <span class="admin-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Admin</strong>
          <small>Dirección general</small>
        </span>
      </a>
      <div class="admin-header-actions">
        <span class="admin-chip"><b></b> Online</span>
        <span class="admin-chip is-role">${icon("lock", "walker-button-icon")} Administrador</span>
        <button class="admin-secondary-button" type="button" data-admin-logout>
          ${icon("logOut", "walker-button-icon")}
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
}

export function adminDashboard() {
  return `
    <main class="admin-dashboard">
      ${AdminCommandCenter()}
      ${AdminSummaryCards()}
      <section class="admin-two-column">
        ${AdminHierarchy()}
        ${AdminCriticalAlerts()}
      </section>
      <section class="admin-two-column">
        ${AdminUsersPermissions()}
        ${AdminFinancePanel()}
      </section>
      <section class="admin-two-column">
        ${AdminPricingPanel()}
        ${AdminReportsPanel()}
      </section>
      ${AdminClientsDogs()}
      <section class="admin-two-column">
        ${AdminSystemSettings()}
        ${AdminCommunicationAudit()}
      </section>
    </main>
  `;
}

function AdminCommandCenter() {
  return `
    <section class="admin-hero">
      <div>
        <p class="admin-eyebrow">Centro directivo</p>
        <h1>Dirección general</h1>
        <p>Control total del sistema: operación, equipo, clientes, cobros, permisos, precios y reportes.</p>
      </div>
      <div class="admin-action-grid">
        ${[
          ["Ver reportes", "fileUp", "reports"],
          ["Gestionar usuarios", "radar", "users"],
          ["Configurar precios", "creditCard", "prices"],
          ["Revisar alertas", "alertTriangle", "alerts"],
        ].map(([label, iconName, actionType], index) => `
          <button class="${index === 0 ? "admin-primary-button" : "admin-secondary-button"}" type="button" data-admin-action="${actionType}">
            ${icon(iconName, "walker-button-icon")}
            ${label}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminSummaryCards() {
  return `
    <section class="admin-summary-section">
      <div class="admin-section-title">
        <p class="admin-eyebrow">Panorama</p>
        <h2>Resumen general</h2>
      </div>
      <div class="admin-summary-grid">
        ${ADMIN_SUMMARY.map(([title, value, iconName], index) => `
          <article class="admin-card admin-summary-card ${index === 5 ? "is-featured" : ""}">
            <span>${icon(iconName)}</span>
            <small>${title}</small>
            <strong>${value}</strong>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminPanelHeader(eyebrow, title, iconName) {
  return `
    <header class="admin-panel-head">
      <span>${icon(iconName)}</span>
      <div>
        <p class="admin-eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
      </div>
    </header>
  `;
}

function AdminHierarchy() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Solo admin", "Jerarquía operativa", "shieldCheck")}
      <div class="admin-hierarchy-list">
        ${ADMIN_HIERARCHY.map(([role, text, iconName]) => `
          <article class="admin-hierarchy-item">
            <span>${icon(iconName)}</span>
            <div>
              <strong>${role}</strong>
              <p>${text}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminUsersPermissions() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Accesos", "Usuarios y permisos", "users")}
      <div class="admin-table-list">
        ${ADMIN_USERS.map(([name, role, status]) => `
          <article class="admin-table-row">
            <div>
              <strong>${name}</strong>
              <small>${role}</small>
            </div>
            <span class="admin-status">${status}</span>
            <div class="admin-row-actions">
              <button class="admin-secondary-button" type="button" data-admin-action="user-change-role">Cambiar rol</button>
              <button class="admin-secondary-button" type="button" data-admin-action="user-toggle">Activar/desactivar</button>
              <button class="admin-secondary-button" type="button" data-admin-action="user-permissions">Ver permisos</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminPricingPanel() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Configuración global", "Precios y planes", "sliders")}
      <div class="admin-price-grid">
        ${PLANS.map((plan, index) => `
          <article class="admin-price-card ${index === 1 ? "is-featured" : ""}">
            <small>${plan.walks}</small>
            <strong>${plan.name}</strong>
            ${PLAN_SIZES.map((size, sizeIndex) => `
              <div>
                <span>${size}</span>
                <b>${plan.prices[sizeIndex]}</b>
              </div>
            `).join("")}
            <button class="admin-secondary-button" type="button" data-admin-action="edit-plan">Editar plan</button>
          </article>
        `).join("")}
      </div>
      <div class="admin-discount-row">
        ${DISCOUNTS.map(([dogs, discount]) => `<span>${dogs}: <b>${discount}</b></span>`).join("")}
      </div>
    </section>
  `;
}

function AdminFinancePanel() {
  let totalCobrado = 6920000;
  const history = getStoredArray("paseosJuanPaymentHistory");
  history.forEach(p => {
    if (p.status === "Confirmado") {
      const amountStr = p.amount.replace(/[^0-9]/g, '');
      totalCobrado += parseInt(amountStr, 10) || 0;
    }
  });
  const items = [
    ["Ingresos estimados", "$8.400.000"],
    ["Cobrado", "$" + totalCobrado.toLocaleString('es-AR')],
    ["Pendiente", "$245.000"],
    ["Deuda", "$85.000"],
    ["Pagos por confirmar", history.length ? "Ver historial" : "2"],
    ["Costos operativos", "$3.100.000"],
    ["Resultado estimado", "$5.300.000"],
  ];

  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Dirección financiera", "Finanzas generales", "wallet")}
      <div class="admin-finance-grid">
        ${items.map(([label, value], index) => `
          <article class="${index === 6 ? "is-featured" : ""}">
            <small>${label}</small>
            <strong>${value}</strong>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminReportsPanel() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Inteligencia operativa", "Reportes operativos", "fileText")}
      <div class="admin-report-grid">
        ${ADMIN_REPORTS.map(([title, text, iconName]) => `
          <article>
            <span>${icon(iconName)}</span>
            <strong>${title}</strong>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminClientsDogs() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Base general", "Clientes y perros", "database")}
      <div class="admin-client-grid">
        ${[...(getStore().clients || []).map(c => [c.client, c.dogs, c.zone, c.plan, c.documentation, c.status]), ...ADMIN_CLIENTS].map(([client, dogs, zone, plan, documentation, status]) => `
          <article class="admin-client-row">
            <div><small>Cliente</small><strong>${client}</strong><span>${dogs}</span></div>
            <div><small>Zona</small><strong>${zone}</strong><span>${plan}</span></div>
            <div><small>Documentación</small><strong>${documentation}</strong><span>${status}</span></div>
            <div class="admin-row-actions">
              <button class="admin-secondary-button" type="button" data-admin-action="view-client">Ver ficha</button>
              <button class="admin-secondary-button" type="button" data-admin-action="audit-client">Auditar</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminSystemSettings() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Sistema", "Configuración del sistema", "settings")}
      <div class="admin-settings-grid">
        ${ADMIN_SETTINGS.map((setting) => `
          <button class="admin-setting-button" type="button" data-admin-action="settings">
            ${icon("settings", "walker-button-icon")}
            ${setting}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminCriticalAlerts() {
  return `
    <section class="admin-panel admin-alert-panel">
      ${AdminPanelHeader("Riesgo", "Alertas críticas", "alertTriangle")}
      <div class="admin-alert-list">
        ${[...(getStore().alerts || []).map(a => [a.dog, a.type, a.description]), ...ADMIN_CRITICAL_ALERTS].map(([subject, title, text]) => `
          <article>
            <span>${subject}</span>
            <strong>${title}</strong>
            <p>${text}</p>
            <button class="admin-secondary-button" type="button" data-admin-action="review-alert">Revisar</button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminCommunicationAudit() {
  const conversations = getChatConversations();

  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Auditoría", "Auditoría de comunicación", "message")}
      <p class="admin-muted">Cliente escribe. Coordinador responde. Supervisor responde. Paseador solo lectura. Admin audita el historial.</p>
      <div class="admin-audit-list">
        ${conversations.map((conversation) => {
          const last = conversation.messages[conversation.messages.length - 1];
          return `
            <article>
              <div>
                <strong>${conversation.clientName}</strong>
                <small>${conversation.dogs.join(", ")} · ${conversation.status}</small>
              </div>
              <p>${last?.senderName || "Sistema"}: ${last?.text || "Sin mensajes"}</p>
              <span>${last?.timestamp || "--:--"}</span>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}


// Clicks de la vista admin. Devuelve true si atendió el click (corta la cadena).
function handleAdminClick(event) {
  const adminLogout = event.target.closest("[data-admin-logout]");
  if (adminLogout) {
    navigate("/login");
    return true;
  }

  return false;
}

function handleAdminActionClick(event) {
  const adminAction = event.target.closest("[data-admin-action]");
  if (adminAction) {
    const act = adminAction.dataset.adminAction;
    if (act === 'reports') openModal('admin-reports');
    if (act === 'users') openModal('admin-users');
    if (act === 'prices') openModal('admin-prices');
    if (act === 'alerts') openModal('admin-alerts');
    if (act === 'user-change-role') { showToast("Rol actualizado (Demo)"); }
    if (act === 'user-toggle') { showToast("Usuario activado/desactivado (Demo)", "warning"); }
    if (act === 'user-permissions') openModal('admin-users');
    if (act === 'edit-plan') openModal('admin-prices');
    if (act === 'view-client') openModal('admin-client');
    if (act === 'audit-client') openModal('admin-audit');
    if (act === 'settings') openModal('admin-settings');
    if (act === 'review-alert') { showToast("Alerta resuelta."); }
    return true;
  }

  return false;
}

export function registerAdminEvents() {
  clickHandlers.push(handleAdminClick);
  actionClickHandlers.push(handleAdminActionClick);
}
