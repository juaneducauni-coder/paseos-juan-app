// Arranque de la app: router, render y listeners globales.
import { state } from "./state.js";
import { ROLES, PERMISSIONS } from "./data/mock.js";
import {
  shell,
  FloatingClientChat,
  notFoundPage,
  GlobalModal,
  GlobalToast,
  actionClickHandlers,
  changeHandlers,
  clickHandlers,
  registerSharedEvents,
  runHandlers,
} from "./ui/shared.js";
import { startLavaLamp, hydrateReveal } from "./ui/lava.js";
import { initAccessibility, onAccessibilityChange } from "./ui/accesibilidad.js";
import { landingPage, registerLandingEvents } from "./views/landing.js";
import { loginPage, registroPage, sinPermisoPage, registerAccesoEvents } from "./views/acceso.js";
import { session, ROLE_PAGES, onDataChange, flushPending } from "./api/client.js";
import { clientDashboard, registerClienteEvents } from "./views/cliente.js";
import { walkerShell, walkerDashboard, registerPaseadorEvents } from "./views/paseador.js";
import { supervisorShell, supervisorDashboard, registerSupervisorEvents } from "./views/supervisor.js";
import { coordinatorShell, coordinatorDashboard, registerCoordinadorEvents } from "./views/coordinador.js";
import { adminShell, adminDashboard, registerAdminEvents } from "./views/admin.js";

const app = document.querySelector("#app");

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function navigate(path) {
  if (path.includes("#")) {
    const [pathname, hash] = path.split("#");
    window.history.pushState({}, "", `${pathname || window.location.pathname}#${hash}`);
    state.menuOpen = false;
    render();
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }));
    return;
  }

  window.history.pushState({}, "", path);
  state.menuOpen = false;
  render();
}

window.addEventListener("popstate", render);

window.addEventListener("paseosJuanStoreUpdate", render);

window.addEventListener("storage", (e) => {
  if (e.key === "paseosJuanChatMessages") {
    render();
  }
});

registerSharedEvents();
registerLandingEvents();
registerAccesoEvents();
registerClienteEvents();
registerPaseadorEvents();
registerSupervisorEvents();
registerCoordinadorEvents();
registerAdminEvents();

document.addEventListener("click", (event) => {
  if (runHandlers(clickHandlers, event)) return;

  const link = event.target.closest("[data-link]");
  if (!link) return;
  event.preventDefault();
  navigate(link.getAttribute("href"));
});

document.addEventListener("change", (event) => {
  runHandlers(changeHandlers, event);
});

export function render() {
  const path = normalizePath(window.location.pathname);

  if (path === "/") {
    app.innerHTML = landingPage();
    hydrateAfterRender();
    return;
  }

  if (path === "/login") {
    app.innerHTML = loginPage();
    hydrateAfterRender();
    return;
  }

  if (path === "/salir") {
    // Primero se cambia la dirección y después se borra la sesión, sin volver a dibujar dos veces.
    window.history.replaceState({}, "", "/login");
    session.clear();
    app.innerHTML = loginPage();
    hydrateAfterRender();
    return;
  }

  if (path === "/registro" || path === "/register") {
    app.innerHTML = registroPage();
    hydrateAfterRender();
    return;
  }

  const legacyMatch = path.match(/^\/dashboard\/([a-z]+)$/);
  const roleKey = legacyMatch ? legacyMatch[1] : path.slice(1);
  if (ROLES[roleKey] && roleKey !== "visitante") {
    app.innerHTML = guardedDashboard(roleKey);
    hydrateAfterRender();
    return;
  }

  app.innerHTML = notFoundPage();
  hydrateAfterRender();
}


// Los paneles del equipo piden usuario. La página del cliente es de ejemplo y queda abierta.
function guardedDashboard(roleKey) {
  if (roleKey === "cliente") return dashboardPage(roleKey);
  const user = session.user();
  if (!user) {
    window.history.replaceState({}, "", `/login?volver=/${roleKey}`);
    return loginPage();
  }
  if (!(ROLE_PAGES[user.rol] || []).includes(roleKey)) return sinPermisoPage(roleKey);
  return dashboardPage(roleKey);
}

function hydrateAfterRender() {
  let overlay = document.getElementById("global-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "global-overlay";
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = GlobalModal() + GlobalToast();

  document.body.classList.toggle("menu-locked", state.menuOpen);
  hydrateReveal();
  startLavaLamp();
}

function dashboardPage(roleKey) {
  const role = ROLES[roleKey];
  const isClientDashboard = roleKey === "cliente";
  const isWalkerDashboard = roleKey === "paseador";
  const isSupervisorDashboard = roleKey === "supervisor";
  const content = {
    admin: adminDashboard,
    coordinador: coordinatorDashboard,
    supervisor: supervisorDashboard,
    paseador: walkerDashboard,
    cliente: clientDashboard,
  }[roleKey]();

  if (isWalkerDashboard) {
    return walkerShell(content);
  }

  if (isSupervisorDashboard) {
    return supervisorShell(content);
  }

  if (roleKey === "coordinador") {
    return coordinatorShell(content);
  }

  if (roleKey === "admin") {
    return adminShell(content);
  }

  return shell(`
    <main class="dashboard ${isClientDashboard ? "dashboard-client" : ""}">
      ${isClientDashboard ? "" : `
        <aside class="sidebar reveal">
          <p class="eyebrow">Perfil activo</p>
          <h1>${role.label}</h1>
          <p>${role.intent}</p>
          <div class="permission-list">
            ${PERMISSIONS.map(([name, permission]) => `
              <div class="${name.toLowerCase() === roleKey ? "selected" : ""}">
                <strong>${name}</strong>
                <small>${permission}</small>
              </div>
            `).join("")}
          </div>
        </aside>
      `}
      <section class="dashboard-content reveal">
        ${content}
      </section>
    </main>
    ${isClientDashboard ? FloatingClientChat() : ""}
  `, roleKey);
}

initAccessibility();
// Si la sesión cambia (ingreso, salida o vencimiento), se vuelve a dibujar la página.
onDataChange((col) => {
  if (col === "sesion") render();
});
if (session.user()) {
  session.refresh().catch(() => {});
  flushPending();
}
onAccessibilityChange(() => startLavaLamp());
render();

document.addEventListener("click", (event) => {
  runHandlers(actionClickHandlers, event);
});
