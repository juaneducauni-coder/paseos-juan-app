import "./accesibilidad.css";

// Preferencias de accesibilidad: tema (claro / oscuro / automático) y movimiento
// (normal / calmo). El modo calmo apaga animaciones, transiciones y el fondo en movimiento:
// pensado para personas con epilepsia fotosensible, migrañas o mareos.
// Se guarda solo en este dispositivo y se aplica en todas las páginas.

const STORAGE_KEY = "paseosJuan_accesibilidad";
const DEFAULTS = { theme: "auto", motion: "auto" };
const listeners = new Set();

let prefs = readPrefs();
let panelOpen = false;
let abridor = null; // elemento que abrió el panel, para devolverle el foco al cerrar

function readPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...DEFAULTS, ...(saved || {}) };
  } catch {
    return { ...DEFAULTS };
  }
}

function savePrefs() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Sin almacenamiento (modo privado): la preferencia vale solo para esta visita.
  }
}

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

export function isDarkTheme() {
  if (prefs.theme === "oscuro") return true;
  if (prefs.theme === "claro") return false;
  return darkQuery.matches;
}

export function isCalmMotion() {
  if (prefs.motion === "calmo") return true;
  if (prefs.motion === "normal") return false;
  return motionQuery.matches;
}

export function onAccessibilityChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function apply() {
  const root = document.documentElement;
  root.dataset.theme = isDarkTheme() ? "dark" : "light";
  root.dataset.motion = isCalmMotion() ? "calm" : "normal";
  root.style.colorScheme = isDarkTheme() ? "dark" : "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", isDarkTheme() ? "#0f1512" : "#f7f5ef");
  renderControl();
  listeners.forEach((callback) => callback({ dark: isDarkTheme(), calm: isCalmMotion() }));
}

function option(group, value, label, current) {
  const pressed = current === value;
  return `<button type="button" class="a11y-option ${pressed ? "is-active" : ""}" data-a11y-set="${group}:${value}" aria-pressed="${pressed}">${label}</button>`;
}

function renderControl() {
  let root = document.getElementById("a11y-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "a11y-root";
    document.body.appendChild(root);
  }
  root.innerHTML = `
    <button type="button" class="a11y-toggle" data-a11y-toggle aria-expanded="${panelOpen}" aria-controls="a11y-panel" aria-label="Opciones de accesibilidad: tema y movimiento">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"></path>
      </svg>
    </button>
    <section class="a11y-panel ${panelOpen ? "is-open" : ""}" id="a11y-panel" role="dialog" aria-label="Accesibilidad" ${panelOpen ? "" : "hidden"}>
      <header>
        <strong>Accesibilidad</strong>
        <button type="button" class="a11y-close" data-a11y-toggle aria-label="Cerrar">×</button>
      </header>
      <div class="a11y-group" role="group" aria-label="Tema">
        <span>Tema</span>
        <div class="a11y-options">
          ${option("theme", "claro", "Claro", prefs.theme)}
          ${option("theme", "oscuro", "Oscuro", prefs.theme)}
          ${option("theme", "auto", "Automático", prefs.theme)}
        </div>
      </div>
      <div class="a11y-group" role="group" aria-label="Movimiento">
        <span>Movimiento</span>
        <div class="a11y-options">
          ${option("motion", "normal", "Normal", prefs.motion)}
          ${option("motion", "calmo", "Calmo", prefs.motion)}
          ${option("motion", "auto", "Automático", prefs.motion)}
        </div>
        <small>El modo calmo apaga animaciones y el fondo en movimiento. Recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</small>
      </div>
    </section>
  `;
}

function volverFoco() {
  const destino = abridor && document.contains(abridor) && abridor.offsetParent !== null ? abridor : document.querySelector(".a11y-toggle");
  destino?.focus();
  abridor = null;
}

// Abre el panel de accesibilidad desde cualquier botón de la página (por ejemplo, "Tema y movimiento").
export function abrirAccesibilidad() {
  abridor = document.activeElement;
  panelOpen = true;
  renderControl();
  document.querySelector("#a11y-panel .a11y-option.is-active")?.focus();
}

export function initAccessibility() {
  if (!document.querySelector('meta[name="theme-color"]')) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-a11y-toggle]")) {
      if (!panelOpen) abridor = document.activeElement;
      panelOpen = !panelOpen;
      renderControl();
      if (panelOpen) document.querySelector("#a11y-panel .a11y-option.is-active")?.focus();
      else volverFoco();
      return;
    }
    const setter = event.target.closest("[data-a11y-set]");
    if (setter) {
      const [group, value] = setter.dataset.a11ySet.split(":");
      prefs = { ...prefs, [group]: value };
      savePrefs();
      apply();
      document.querySelector(`[data-a11y-set="${group}:${value}"]`)?.focus();
      return;
    }
    if (panelOpen && !event.target.closest("#a11y-root")) {
      panelOpen = false;
      renderControl();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panelOpen) {
      panelOpen = false;
      renderControl();
      volverFoco();
    }
  });

  darkQuery.addEventListener?.("change", apply);
  motionQuery.addEventListener?.("change", apply);
  apply();
}
