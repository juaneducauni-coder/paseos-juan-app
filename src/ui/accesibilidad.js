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
  requestAnimationFrame(() => updateFloating());
}

export function initAccessibility() {
  if (!document.querySelector('meta[name="theme-color"]')) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.appendChild(meta);
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-a11y-toggle]")) {
      panelOpen = !panelOpen;
      renderControl();
      if (panelOpen) document.querySelector("#a11y-panel .a11y-option.is-active")?.focus();
      else document.querySelector(".a11y-toggle")?.focus();
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
      document.querySelector(".a11y-toggle")?.focus();
    }
  });

  darkQuery.addEventListener?.("change", apply);
  motionQuery.addEventListener?.("change", apply);
  apply();
  initFloatingGuard();
}

// ---- Botones flotantes que no tapan contenido ----
// El botón de accesibilidad (abajo a la izquierda) y el de WhatsApp (abajo a la derecha):
// - mientras se hace scroll se achican y quedan semitransparentes;
// - cuando el scroll se frena, si en su lugar hay texto, un campo o un botón, se corren al borde
//   de la pantalla y queda a la vista solo una pestaña angosta (dentro del margen, sin tapar nada).
//   Tocar la pestaña o llegar con el teclado los muestra enteros.

const FLOATING = [
  { box: () => document.getElementById("a11y-root"), button: () => document.querySelector(".a11y-toggle") },
  { box: () => document.querySelector("a.whatsapp"), button: () => document.querySelector("a.whatsapp") },
];
const CONTENT_SKIP = "#a11y-root, a.whatsapp, .topbar, .tienda-bar, .mobile-menu, .menu-backdrop, script, style, noscript, .visually-hidden, [hidden]";
const INTERACTIVE = "input:not([type=hidden]), textarea, select, button, a[href], summary";

let scrollTimer = 0;

// Lugar que ocupa el botón cuando está entero (sin la transformación de "corrido al borde").
function homeRect(box) {
  const style = getComputedStyle(box);
  const width = box.offsetWidth;
  const height = box.offsetHeight;
  const viewW = document.documentElement.clientWidth;
  const viewH = window.innerHeight;
  const bottom = viewH - (parseFloat(style.bottom) || 0);
  const left = style.left !== "auto" ? parseFloat(style.left) || 0 : viewW - (parseFloat(style.right) || 0) - width;
  return { left, right: left + width, top: bottom - height, bottom };
}

// Lo que está dentro de un desplegable cerrado no se ve (menos su título).
function insideClosedDetails(element) {
  const details = element.closest("details:not([open])");
  return Boolean(details && !element.closest("summary"));
}

function intersects(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function isShown(element) {
  const style = getComputedStyle(element);
  return style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0.05;
}

// ¿Hay texto, un campo o un botón debajo de este rectángulo? (Una foto de fondo no cuenta.)
export function coversContent(rect) {
  const root = document.getElementById("app") || document.body;
  const zone = { left: rect.left - 4, right: rect.right + 4, top: rect.top - 4, bottom: rect.bottom + 4 };
  for (const element of root.querySelectorAll(INTERACTIVE)) {
    if (element.closest(CONTENT_SKIP) || insideClosedDetails(element)) continue;
    const box = element.getBoundingClientRect();
    if (box.width && box.height && intersects(box, zone) && isShown(element)) return true;
  }
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest(CONTENT_SKIP) || insideClosedDetails(parent)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const parentBox = node.parentElement.getBoundingClientRect();
    if (!intersects(parentBox, zone)) continue;
    range.selectNodeContents(node);
    for (const box of range.getClientRects()) {
      if (box.width && intersects(box, zone) && isShown(node.parentElement)) return true;
    }
  }
  return false;
}

function updateFloating() {
  for (const item of FLOATING) {
    const box = item.box();
    const button = item.button();
    if (!box || !button) continue;
    const keepOpen = panelOpen || button.matches(":focus-visible") || button.dataset.floatingOpen === "1";
    const covers = !keepOpen && coversContent(homeRect(box));
    button.classList.toggle("is-tucked", covers);
  }
}

function onScroll() {
  document.documentElement.classList.add("is-scrolling");
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    document.documentElement.classList.remove("is-scrolling");
    FLOATING.forEach((item) => { const b = item.button(); if (b) delete b.dataset.floatingOpen; });
    updateFloating();
  }, 160);
}

function initFloatingGuard() {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  // Tocar la pestaña muestra el botón entero (el primer toque no abre nada).
  document.addEventListener("click", (event) => {
    const tucked = event.target.closest?.(".is-tucked");
    if (!tucked || !FLOATING.some((item) => item.button() === tucked)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    tucked.dataset.floatingOpen = "1";
    tucked.classList.remove("is-tucked");
  }, true);
  document.addEventListener("focusin", (event) => {
    if (event.target.matches?.(".a11y-toggle, a.whatsapp")) event.target.classList.remove("is-tucked");
  });
  document.addEventListener("focusout", (event) => {
    if (event.target.matches?.(".a11y-toggle, a.whatsapp")) setTimeout(updateFloating, 0);
  });
  // Después de cada dibujo de la página (y cuando cambia el contenido) se vuelve a revisar.
  const app = document.getElementById("app");
  let pending = 0;
  const schedule = () => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => requestAnimationFrame(updateFloating));
  };
  if (app) new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  window.addEventListener("load", schedule);
  // Las secciones que aparecen con movimiento terminan de ubicarse un rato después.
  setTimeout(updateFloating, 1300);
  schedule();
}
