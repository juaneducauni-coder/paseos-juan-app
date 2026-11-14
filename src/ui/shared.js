// Helpers y componentes de UI compartidos por varias vistas, más el registro de eventos.
import { closeModal, getStore, saveStore, showToast } from "../store/paseosJuanStore.js";
import { canReplyToClient, getChatConversations, sendChatMessage } from "../data/chatDemo.js";
import { state } from "../state.js";
import { BUSINESS, PLAN_SIZES, MENU_ITEMS } from "../data/mock.js";
import { render } from "../app.js";
import { session } from "../api/client.js";

// Escapa texto para meterlo en HTML (contenido y atributos).
export function esc(value) {
  return String(value ?? "").replace(/[&<>"'`]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" })[c]);
}

export function whatsappLink(message) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function icon(name, className = "line-icon") {
  const attrs = `class="${className}" viewBox="0 0 24 24" aria-hidden="true"`;
  const paths = {
    activity: `<path d="M4 12h4l2-6 4 12 2-6h4" />`,
    arrowRight: `<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,
    briefcase: `<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><path d="M4 7h16v12H4z" /><path d="M9 12h6" />`,
    briefcaseMedical: `<path d="M10 6V5a2 2 0 0 1 4 0v1" /><path d="M4 7h16v12H4z" /><path d="M12 11v5" /><path d="M9.5 13.5h5" />`,
    calendarCheck: `<path d="M7 3v4" /><path d="M17 3v4" /><path d="M4 8h16" /><path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="m9 15 2 2 4-5" />`,
    camera: `<path d="M14 6 13 4h-2L10 6H6a2 2 0 0 0-2 2v10h16V8a2 2 0 0 0-2-2Z" /><circle cx="12" cy="13" r="3" />`,
    checkCircle: `<circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.4 2.4 4.9-5" />`,
    chart: `<path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15V9" /><path d="M12 15V6" /><path d="M16 15v-4" />`,
    clipboardCheck: `<path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 4h6" /><path d="m8.5 14 2 2 4.8-5" />`,
    clock: `<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`,
    alertCircle: `<circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" />`,
    alertTriangle: `<path d="M12 3 22 20H2L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" />`,
    archive: `<rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v12h14V8" /><path d="M10 12h4" />`,
    bell: `<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" />`,
    bone: `<path d="M7.5 8.5a3 3 0 1 1 2-5.2 3 3 0 0 1 5 0 3 3 0 1 1 2 5.2l-8 7a3 3 0 1 1-2-5.2 3 3 0 0 1 0-3.6 3 3 0 0 1 1 1.8Z" />`,
    chevronDown: `<path d="m6 9 6 6 6-6" />`,
    compass: `<circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />`,
    creditCard: `<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" />`,
    database: `<ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />`,
    copy: `<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,
    dollarSign: `<path d="M12 2v20" /><path d="M17 6.5c-1.2-1-2.8-1.5-5-1.5-3 0-5 1.4-5 3.5 0 5 10 2.5 10 7.5 0 2.1-2 3.5-5 3.5-2.2 0-4-.6-5.5-1.8" />`,
    droplets: `<path d="M7 3C5 6 4 8.2 4 10a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" /><path d="M17 3c-2 3-3 5.2-3 7a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" />`,
    eye: `<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />`,
    fileCheck: `<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="m8.5 15 2 2 4.5-5" />`,
    fileText: `<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M8 13h8" /><path d="M8 17h5" />`,
    fileUp: `<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M12 17v-6" /><path d="m9 14 3-3 3 3" />`,
    heartPulse: `<path d="M20.5 8.8c0 5.2-8.5 10.2-8.5 10.2S3.5 14 3.5 8.8A4.3 4.3 0 0 1 11 6a4.3 4.3 0 0 1 9.5 2.8Z" /><path d="M7 12h3l1-2 2 5 1.5-3H17" />`,
    help: `<circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.2-1.7 2.6" /><path d="M12 17h.01" />`,
    home: `<path d="m4 11 8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-6h4v6" />`,
    logIn: `<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M4 12h10" /><path d="m10 8 4 4-4 4" />`,
    logOut: `<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M14 12H4" /><path d="m18 8 4 4-4 4" />`,
    lock: `<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" />`,
    mail: `<path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />`,
    mapPin: `<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />`,
    medal: `<path d="M8 3h8l-2 5h-4L8 3Z" /><circle cx="12" cy="14" r="5" /><path d="m10.5 14 1 1.2 2.2-2.4" />`,
    message: `<path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8 8 0 1 1 21 12Z" />`,
    navigation: `<path d="m12 2 7 19-7-4-7 4 7-19Z" />`,
    packageCheck: `<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4.5 8 12 12.2 19.5 8" /><path d="M12 21v-8.8" /><path d="m9.2 16 1.8 1.8 3.8-4.1" />`,
    // Huella de perro realista: almohadilla central trilobulada, cuatro dedos y marcas de uñas.
    pawPrint: `<g fill="currentColor" stroke="none"><path d="M12 11.3c-2.5 0-4.9 2.1-5.7 4.5-.6 1.8.3 3.5 1.9 3.8 1 .2 1.8-.3 2.6-.7.8-.3 1.6-.3 2.4 0 .8.4 1.6.9 2.6.7 1.6-.3 2.5-2 1.9-3.8-.8-2.4-3.2-4.5-5.7-4.5Z" /><ellipse cx="9.5" cy="7" rx="1.75" ry="2.5" transform="rotate(-9 9.5 7)" /><ellipse cx="14.5" cy="7" rx="1.75" ry="2.5" transform="rotate(9 14.5 7)" /><ellipse cx="5.5" cy="10.9" rx="1.5" ry="2.15" transform="rotate(-30 5.5 10.9)" /><ellipse cx="18.5" cy="10.9" rx="1.5" ry="2.15" transform="rotate(30 18.5 10.9)" /><path d="M8.85 3.6 9.1 2.3l.6 1.2Z" /><path d="M15.15 3.6 14.9 2.3l-.6 1.2Z" /><path d="M3.9 8.2 3.6 6.9l.95.95Z" /><path d="M20.1 8.2l.3-1.3-.95.95Z" /></g>`,
    sun: `<circle cx="12" cy="12" r="4" /><path d="M12 2.5v2.5" /><path d="M12 19v2.5" /><path d="M2.5 12H5" /><path d="M19 12h2.5" /><path d="m5.3 5.3 1.8 1.8" /><path d="m16.9 16.9 1.8 1.8" /><path d="m5.3 18.7 1.8-1.8" /><path d="m16.9 7.1 1.8-1.8" />`,
    gift: `<path d="M4 11h16v9H4z" /><path d="M3 7h18v4H3z" /><path d="M12 7v13" /><path d="M12 7c-1.2-3.4-5.2-3.6-5.2-1.4C6.8 7 9.6 7 12 7Z" /><path d="M12 7c1.2-3.4 5.2-3.6 5.2-1.4C17.2 7 14.4 7 12 7Z" />`,
    play: `<circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" />`,
    flag: `<path d="M5 21V4" /><path d="M5 4h12l-1.5 4L17 12H5" />`,
    radar: `<circle cx="12" cy="12" r="8" /><path d="M12 12 17 7" /><path d="M12 4v2" /><path d="M12 18v2" /><path d="M4 12h2" /><path d="M18 12h2" />`,
    radio: `<path d="M4 9h16v11H4z" /><path d="m8 9 8-6" /><circle cx="8" cy="14" r="2" /><path d="M14 14h3" /><path d="M14 17h2" />`,
    plus: `<path d="M12 5v14" /><path d="M5 12h14" />`,
    receipt: `<path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1V3Z" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" />`,
    route: `<circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />`,
    shieldCheck: `<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" />`,
    send: `<path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" />`,
    settings: `<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 3.6-.2-.1a1.7 1.7 0 0 0-2 .3l-.3.2a1.7 1.7 0 0 0-1 1.5V23H9.8v-.5a1.7 1.7 0 0 0-1-1.5l-.3-.2a1.7 1.7 0 0 0-2-.3l-.2.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-3.6.2.1a1.7 1.7 0 0 0 2-.3l.3-.2a1.7 1.7 0 0 0 1-1.5V1h4.4v.5a1.7 1.7 0 0 0 1 1.5l.3.2a1.7 1.7 0 0 0 2 .3l.2-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z" />`,
    sliders: `<path d="M4 6h8" /><path d="M16 6h4" /><path d="M14 4v4" /><path d="M4 12h4" /><path d="M12 12h8" /><path d="M10 10v4" /><path d="M4 18h10" /><path d="M18 18h2" /><path d="M16 16v4" />`,
    shoppingBag: `<path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /><path d="M9.5 14h5" />`,
    uploadCloud: `<path d="M16 16 12 12l-4 4" /><path d="M12 12v9" /><path d="M20 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 0 0 3 10.4" /><path d="M5 18a4 4 0 0 1 0-8" />`,
    userCheck: `<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="m16 13 2 2 4-5" />`,
    userPlus: `<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 8v6" /><path d="M15 11h6" />`,
    users: `<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 11a3 3 0 0 0 0-6" /><path d="M17 20a5 5 0 0 0-2-4" />`,
    wallet: `<path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V6" /><path d="M16 13h.01" />`,
    x: `<path d="M6 6 18 18" /><path d="M18 6 6 18" />`,
  };

  return `<svg ${attrs} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.shieldCheck}</svg>`;
}

export function getDemoClient() {
  try {
    return JSON.parse(localStorage.getItem("paseosJuanDemoClient"));
  } catch {
    return null;
  }
}

export function getStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function getStoredObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

export function shell(content, activeRole = "visitante") {
  // Cliente con sesión en su página: encabezado mínimo, sin el menú de la página pública.
  if (activeRole === "cliente" && session.user()?.rol === "cliente") {
    return `
      ${ClientHeader()}
      ${SmoothScrollWrapper(content)}
    `;
  }
  return `
    ${HeaderMinimal(activeRole)}
    ${MobileMenu()}
    ${SmoothScrollWrapper(content)}
  `;
}

// Encabezado de la página del cliente: logo + "Mi página" y el botón de tema y movimiento
// (abre el mismo panel de accesibilidad; el botón flotante no se muestra en esta página).
function ClientHeader() {
  return `
    <header class="topbar topbar-cliente">
      <a class="brand" href="/cliente" data-link aria-label="Mi página de Paseos Juan">
        <span class="brand-mark">
          <img src="/paseos-juan-logo.png" alt="" />
        </span>
        <span>
          <strong>Mi página</strong>
          <small>Paseos Juan</small>
        </span>
      </a>
      <button class="topbar-a11y" type="button" data-a11y-toggle aria-controls="a11y-panel">
        ${icon("eye", "topbar-a11y-icon")}<span>Tema y movimiento</span>
      </button>
    </header>
  `;
}

function HeaderMinimal(activeRole) {
  return `
    <header class="topbar ${state.menuOpen ? "menu-is-open" : ""}">
      <a class="brand" href="/" data-link aria-label="Ir al inicio">
        <span class="brand-mark">
          <img src="/paseos-juan-logo.png" alt="" />
        </span>
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <div class="header-actions">
        ${session.user()?.rol === "cliente" ? `<a class="header-cta" href="/cliente" data-link>Mi página</a>` : `<a class="header-cta" href="/#evaluacion" data-link>Pedí tu evaluación</a>`}
        <button class="menu-button ${state.menuOpen ? "is-open" : ""}" type="button" data-menu-toggle aria-expanded="${state.menuOpen}" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `;
}

function MobileMenu() {
  return `
    <div class="menu-backdrop ${state.menuOpen ? "is-open" : ""}" data-menu-close></div>
    <aside class="mobile-menu ${state.menuOpen ? "is-open" : ""}" aria-hidden="${!state.menuOpen}">
      <div class="mobile-menu-head">
        <a class="menu-brand" href="/" data-link>
          <img src="/paseos-juan-logo.png" alt="" />
          <span>
            <strong>Paseos Juan</strong>
            <small>Más que un simple paseo</small>
          </span>
        </a>
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menu">${icon("x")}</button>
      </div>
      <nav class="menu-nav" aria-label="Menu principal">
        ${MENU_ITEMS.map(([label, href, iconName]) => `
          <a href="${href}" data-link>
            <span>${icon(iconName, "menu-icon")}</span>
            ${label}
          </a>
        `).join("")}
      </nav>
      <a class="menu-evaluation" href="/#evaluacion" data-link>Pedí tu evaluación</a>
      <a class="menu-whatsapp" href="${whatsappLink("Hola, quiero información sobre los paseos de Paseos Juan.")}" target="_blank" rel="noreferrer">
        WhatsApp ${BUSINESS.whatsappLabel}
      </a>
    </aside>
  `;
}

function SmoothScrollWrapper(content) {
  return `<div class="smooth-wrapper">${content}</div>`;
}

export function WalkerPanelHeader(title, text, iconName) {
  return `
    <header class="walker-panel-head">
      <span>${icon(iconName)}</span>
      <div>
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
    </header>
  `;
}

export function SharedChatPanel(role, title, subtitle) {
  const conversations = getChatConversations();
  conversations.sort((a, b) => b.lastUpdated - a.lastUpdated);

  const activeChatId = localStorage.getItem("paseosJuanActiveChat") || conversations[0]?.id;
  const activeChat = conversations.find(c => c.id === activeChatId);
  const canReply = canReplyToClient(role);

  let quickActions = [];
  if (role === "coordinador") {
    quickActions = ["Pedir carnet de vacunas", "Enviar alias de pago", "Pedir comprobante", "Coordinar evaluación", "Enviar planes", "Derivar al supervisor"];
  } else if (role === "supervisor") {
    quickActions = ["Avisar demora", "Confirmar retiro", "Confirmar entrega", "Consultar cambio de conducta", "Avisar situación de campo"];
  }

  const senderName = role === "coordinador" ? "Coordinador" : role === "supervisor" ? "Supervisor" : "Paseador";
  const bgClass = role === "supervisor" || role === "paseador" ? "dark-panel" : "";

  return `
    <section class="shared-chat-panel reveal ${bgClass}">
      <header class="chat-panel-header">
        <div>
          <h2>${esc(title)}</h2>
          <p>${esc(subtitle)}</p>
        </div>
      </header>
      <div class="chat-panel-layout">
        <aside class="chat-conversations-list">
          ${conversations.map(c => `
            <button class="chat-conversation-item ${c.id === activeChatId ? 'is-active' : ''}" data-chat-select="${esc(c.id)}">
              <strong>${esc(c.clientName)}</strong>
              <small>${esc((c.dogs || []).join(", "))}</small>
              <em>${esc(c.status)}</em>
            </button>
          `).join("")}
        </aside>
        
        ${activeChat ? `
          <div class="chat-active-window">
            <div class="chat-active-header">
              <strong>${esc(activeChat.clientName)} · ${esc((activeChat.dogs || []).join(", "))}</strong>
              <span class="status-pill">${esc(activeChat.status)}</span>
            </div>
            
            <div class="chat-messages-area">
              ${activeChat.messages.map(m => `
                <div class="chat-message-bubble ${m.senderRole === role ? 'is-mine' : 'is-other'}">
                  <div class="chat-message-meta">
                    <b>${esc(m.senderName)}</b>
                    <time>${esc(m.timestamp)}</time>
                  </div>
                  <div class="chat-message-text">${esc(m.text)}</div>
                </div>
              `).join("")}
            </div>

            ${canReply ? `
              <div class="chat-input-area">
                <div class="chat-quick-actions-row">
                  ${quickActions.map(action => `
                    <button class="chat-quick-pill" type="button" data-chat-quick-shared="${esc(action)}" data-chat-role="${esc(role)}" data-chat-sender="${esc(senderName)}" data-chat-conversation="${esc(activeChat.id)}">
                      ${esc(action)}
                    </button>
                  `).join("")}
                </div>
                <div class="chat-compose-row">
                  <input type="text" placeholder="Escribir mensaje..." data-chat-input-shared="${esc(activeChat.id)}" />
                  <button class="primary-button" type="button" data-chat-send-shared="${esc(activeChat.id)}" data-chat-role="${esc(role)}" data-chat-sender="${esc(senderName)}">
                    Enviar
                  </button>
                </div>
              </div>
            ` : `
              <div class="chat-readonly-banner">
                <p>Solo lectura. Los mensajes al cliente los responde coordinación o supervisión.</p>
              </div>
            `}
          </div>
        ` : `
          <div class="chat-empty-state">
            <p>Seleccioná una conversación para ver los mensajes.</p>
          </div>
        `}
      </div>
    </section>
  `;
}

export function FloatingClientChat() {
  const conversations = getChatConversations();
  const demoClient = getDemoClient();
  const clientName = demoClient?.name?.split(" ")[0] || "Tutor de ejemplo";
  // Conversación de ejemplo por defecto para la demo
  const myChat = conversations.find(c => c.id === "conv-martin-bruno") || conversations[1];
  
  const draft = localStorage.getItem("paseosJuanChatDraft") || "";
  
  const quickActions = [
    "Avisar cambio de conducta",
    "Consultar pago",
    "Consultar próximo paseo",
    "Subir comprobante",
    "Subir carnet de vacunas"
  ];

  return `
    <aside class="floating-chat ${state.chatOpen ? "is-open" : ""}" aria-live="polite">
      <div class="chat-window">
        <div class="chat-head">
          <span class="chat-head-icon">${icon("message")}</span>
          <span>
            <strong>Paseos Juan</strong>
            <small>Consultas sobre paseos, pagos o cambios de conducta.</small>
          </span>
          <button type="button" data-chat-close aria-label="Cerrar chat">${icon("x")}</button>
        </div>
        <div class="chat-messages-area floating-chat-messages">
          <div class="chat-message-bubble is-other">
            <div class="chat-message-meta"><b>Soporte</b></div>
            <div class="chat-message-text">Hola, ¿en qué podemos ayudarte hoy?</div>
          </div>
          ${myChat.messages.map(m => `
            <div class="chat-message-bubble ${m.senderRole === 'cliente' ? 'is-mine' : 'is-other'}">
              <div class="chat-message-meta">
                <b>${esc(m.senderName)}</b>
                <time>${esc(m.timestamp)}</time>
              </div>
              <div class="chat-message-text">${esc(m.text)}</div>
            </div>
          `).join("")}
        </div>
        <div class="chat-quick-actions">
          ${quickActions.map(action => `
            <button type="button" data-chat-quick-shared="${esc(action)}" data-chat-role="cliente" data-chat-sender="${esc(clientName)}" data-chat-conversation="${esc(myChat.id)}">
              ${icon("alertCircle")} ${esc(action)}
            </button>
          `).join("")}
        </div>
        <div class="chat-compose">
          <textarea data-chat-input-shared="${esc(myChat.id)}" placeholder="Escribí tu consulta..."></textarea>
          <button class="primary-button" type="button" data-chat-send-shared="${esc(myChat.id)}" data-chat-role="cliente" data-chat-sender="${esc(clientName)}">
            ${icon("send")} Enviar
          </button>
        </div>
      </div>
      <button class="chat-bubble" type="button" data-chat-toggle>
        ${icon("message")}
        <span>Ayuda</span>
      </button>
    </aside>
  `;
}

export function priceCard(plan) {
  return `
    <article class="price-card">
      <strong>${plan.name}</strong>
      <small>${plan.walks}</small>
      <div class="plan-price-list">
        ${PLAN_SIZES.map((size, index) => `
          <div>
            <span>${size}</span>
            <b>${plan.prices[index]}</b>
          </div>
        `).join("")}
      </div>
      <a class="ghost-button" href="${whatsappLink(`Hola, quiero consultar por el ${plan.name} (${plan.walks}) para mi perro.`)}" target="_blank" rel="noreferrer">Consultar</a>
    </article>
  `;
}

export function compactPlanCard(plan) {
  return `
    <article class="compact-plan-card">
      <span>
        <strong>${plan.name}</strong>
        <small>${plan.walks}</small>
      </span>
      <b>${plan.prices[0]} - ${plan.prices[2]}</b>
    </article>
  `;
}

export function faqItem(question, answer) {
  return `
    <details>
      <summary>${question}</summary>
      <p>${answer}</p>
    </details>
  `;
}

export function dogCard(dog, operational = false) {
  return `
    <article class="dog-card">
      <div class="dog-card-header">
        <span class="dog-avatar">${dog.name.slice(0, 1)}</span>
        <span>
          <strong>${dog.name}</strong>
          <small>${dog.breed} · ${dog.age}</small>
        </span>
      </div>
      <dl>
        <div><dt>Conducta</dt><dd>${dog.behavior}</dd></div>
        <div><dt>Energia</dt><dd>${dog.energy}</dd></div>
        <div><dt>Riesgo</dt><dd><span class="risk ${dog.risk.toLowerCase()}">${dog.risk}</span></dd></div>
        <div><dt>Compatibilidad</dt><dd>${dog.compatibility}</dd></div>
        <div><dt>Observaciones</dt><dd>${dog.observations}</dd></div>
        ${operational ? "" : `
          <div><dt>Veterinario</dt><dd>${dog.vet}</dd></div>
          <div><dt>Vacunas</dt><dd>${dog.vaccines}</dd></div>
        `}
      </dl>
    </article>
  `;
}

function metric(label, value) {
  return `
    <div class="metric-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function summaryPanel(title, value, helper) {
  return `
    <article class="panel">
      <h3>${title}</h3>
      <strong class="metric">${value}</strong>
      <small>${helper}</small>
    </article>
  `;
}

export function walkRow(walk) {
  return `
    <div class="list-row">
      <span>
        <strong>${walk.time} · ${walk.zone}</strong>
        <small>${walk.dogs.join(", ")} · Paseador: ${walk.walker}</small>
      </span>
      <span class="status-pill">${walk.status}</span>
    </div>
  `;
}

export function notFoundPage() {
  return shell(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">404</p>
        <h1>Ruta no encontrada</h1>
        <p>Volver a la landing pública o entrar a un dashboard por rol.</p>
        <a class="primary-button" href="/" data-link>Ir al inicio</a>
      </section>
    </main>
  `);
}

export function GlobalModal() {
  const modalStr = localStorage.getItem("paseosJuanActiveModal");
  if (!modalStr) return "";
  let type = "";
  try {
    ({ type } = JSON.parse(modalStr) || {});
  } catch {
    // Dato roto en el celular: se descarta y no se muestra nada.
    localStorage.removeItem("paseosJuanActiveModal");
    return "";
  }

  let html = "";
  switch(type) {
    case 'admin-reports': html = "<h3>Reportes operativos</h3><p>Reportes filtrables. (Demo)</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-users': html = "<h3>Usuarios y permisos</h3><p>Gestionar usuarios demo.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-prices': html = "<h3>Precios y planes</h3><p>Editar precios y descuentos.</p><button class='primary-button' data-modal-action='save-prices'>Guardar cambios</button> <button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-alerts': html = "<h3>Alertas críticas</h3><p>Resolver alertas operativas.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-client': html = "<h3>Ficha del cliente</h3><p>Detalle demo del cliente.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-audit': html = "<h3>Auditoría</h3><p>Auditoría de cambios y chats.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-settings': html = "<h3>Configuración del sistema</h3><p>Opciones generales demo.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'client-pay': html = "<h3>Enviar comprobante</h3><p>El alias y el detalle de pago te los enviamos por WhatsApp. Cuando pagues, subí acá el comprobante.</p><label>Subir comprobante <input type='file' accept='image/*,.pdf' /></label><button class='primary-button' data-modal-action='confirm-pay'>Enviar comprobante</button> <button data-modal-action='close'>Cerrar</button>"; break;
    default: html = "<h3>Modal</h3><button data-modal-action='close'>Cerrar</button>";
  }

  return `
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal-content panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width: 90%; max-width: 500px;">
        ${html}
      </div>
    </div>
  `;
}

let toastTimer = null;

export function GlobalToast() {
  let toast = null;
  try {
    toast = JSON.parse(localStorage.getItem("paseosJuanToast"));
  } catch {
    toast = null;
  }
  if (!toast) return "";

  // Un solo temporizador por aviso, aunque la página se redibuje mientras está visible.
  if (!toastTimer) {
    toastTimer = setTimeout(() => {
      toastTimer = null;
      if (localStorage.getItem("paseosJuanToast")) {
        localStorage.removeItem("paseosJuanToast");
        window.dispatchEvent(new Event("paseosJuanStoreUpdate"));
      }
    }, 3500);
  }

  return `
    <div class="toast is-${toast.type === "error" ? "error" : "success"}" role="status" aria-live="polite">
      ${esc(toast.message)}
    </div>
  `;
}

// Registro de manejadores de eventos. Cada vista agrega los suyos con register<Rol>Events().
// Un manejador devuelve true cuando atendió el evento: equivale a los `return` tempranos
// del listener único original y corta la cadena (por ejemplo, evita la navegación por data-link).
export const clickHandlers = [];
export const changeHandlers = [];
export const actionClickHandlers = [];

export function runHandlers(handlers, event) {
  for (const handler of handlers) {
    if (handler(event)) return true;
  }
  return false;
}

// Clicks de chat compartido y menú. Devuelve true si atendió el click (corta la cadena).
function handleSharedClick(event) {
  const chatSelect = event.target.closest("[data-chat-select]");
  if (chatSelect) {
    localStorage.setItem("paseosJuanActiveChat", chatSelect.dataset.chatSelect);
    render();
    return true;
  }

  const chatSendShared = event.target.closest("[data-chat-send-shared]");
  if (chatSendShared) {
    const conversationId = chatSendShared.dataset.chatSendShared;
    const input = document.querySelector(`[data-chat-input-shared="${conversationId}"]`);
    const text = input?.value?.trim();
    if (!text) return true;

    const role = chatSendShared.dataset.chatRole;
    const senderName = chatSendShared.dataset.chatSender;

    if (sendChatMessage(conversationId, role, senderName, text)) {
      if (input) input.value = "";
      localStorage.removeItem("paseosJuanChatDraft");
      // Notify other tabs in same domain explicitly if needed, but local storage event only fires on OTHER tabs.
      // So we call render here for the CURRENT tab.
      render();
    }
    return true;
  }

  const chatQuickShared = event.target.closest("[data-chat-quick-shared]");
  if (chatQuickShared) {
    const text = chatQuickShared.dataset.chatQuickShared;
    const role = chatQuickShared.dataset.chatRole;
    const senderName = chatQuickShared.dataset.chatSender;
    const conversationId = chatQuickShared.dataset.chatConversation;

    if (sendChatMessage(conversationId, role, senderName, text)) {
      render();
    }
    return true;
  }

  const menuToggle = event.target.closest("[data-menu-toggle]");
  if (menuToggle) {
    state.menuOpen = !state.menuOpen;
    render();
    return true;
  }

  const menuClose = event.target.closest("[data-menu-close]");
  if (menuClose) {
    state.menuOpen = false;
    render();
    return true;
  }

  const chatToggle = event.target.closest("[data-chat-toggle]");
  if (chatToggle) {
    state.chatOpen = !state.chatOpen;
    render();
    return true;
  }

  const chatClose = event.target.closest("[data-chat-close]");
  if (chatClose) {
    state.chatOpen = false;
    render();
    return true;
  }

  return false;
}

// Segundo listener de click: modal global (se ejecuta antes que las acciones de cada rol).
function handleSharedActionClick(event) {
  const action = event.target.closest("[data-modal-action]");
  if (action) {
    if (action.dataset.modalAction === 'close') {
      closeModal();
    }
    if (action.dataset.modalAction === 'confirm-pay') {
      const store = getStore();
      store.alerts = [{ id: 'alert-'+Date.now(), dog: 'Pago cliente', type: 'Pago por confirmar', level: 'Medio', description: 'Cliente subió comprobante.' }, ...(store.alerts || [])];
      saveStore(store);
      showToast('Comprobante enviado. Estado: Pago por confirmar.');
      closeModal();
    }
    if (action.dataset.modalAction === 'save-prices') {
      showToast("Precios actualizados correctamente.");
      closeModal();
    }
    return true;
  }

  if (event.target.closest("[data-modal-backdrop]") && event.target === event.target.closest("[data-modal-backdrop]")) {
    closeModal();
    return true;
  }

  return false;
}

export function registerSharedEvents() {
  clickHandlers.push(handleSharedClick);
  actionClickHandlers.push(handleSharedActionClick);
}
