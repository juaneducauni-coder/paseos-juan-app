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
import { landingPage, authPage, registerLandingEvents } from "./views/landing.js";
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
    app.innerHTML = authPage("login");
    hydrateAfterRender();
    return;
  }

  if (path === "/registro" || path === "/register") {
    app.innerHTML = authPage("register");
    hydrateAfterRender();
    return;
  }

  const directRole = path.slice(1);
  if (ROLES[directRole] && directRole !== "visitante") {
    app.innerHTML = dashboardPage(directRole);
    hydrateAfterRender();
    return;
  }

  const legacyMatch = path.match(/^\/dashboard\/([a-z]+)$/);
  if (legacyMatch && ROLES[legacyMatch[1]]) {
    app.innerHTML = dashboardPage(legacyMatch[1]);
    hydrateAfterRender();
    return;
  }

  app.innerHTML = notFoundPage();
  hydrateAfterRender();
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

render();

document.addEventListener("click", (event) => {
  runHandlers(actionClickHandlers, event);
});
