import "./instalar.css";

// Instalar la app en el celular (pedido de Juan: que el equipo la abra como una app).
// - Android / Chrome: botón chico "Instalar app" cuando el navegador lo ofrece.
// - iPhone (Safari): una tarjeta corta, una sola vez, con los pasos para instalarla.
// Solo aparece en las páginas del equipo. Además registra el service worker
// (public/sw.js), solo en producción: en el servidor de desarrollo rompería el
// recargado en caliente.

const RUTAS_EQUIPO = ["/admin", "/coordinador", "/supervisor", "/paseador", "/login"];
const CLAVE_IOS = "paseosJuan_instalarIosVisto";

let pedidoInstalar = null; // evento beforeinstallprompt guardado
let iosVisto = leerIosVisto();

function leerIosVisto() {
  try {
    return localStorage.getItem(CLAVE_IOS) === "1";
  } catch {
    return false;
  }
}

function guardarIosVisto() {
  iosVisto = true;
  try {
    localStorage.setItem(CLAVE_IOS, "1");
  } catch {
    // Sin almacenamiento (modo privado): no vuelve a aparecer en esta visita.
  }
}

function enPaginaDelEquipo() {
  const ruta = window.location.pathname.replace(/\/+$/, "") || "/";
  return RUTAS_EQUIPO.includes(ruta);
}

function yaInstalada() {
  return (
    window.matchMedia?.("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

// iPhone o iPad con Safari (los otros navegadores de iOS no muestran "Agregar a inicio" igual).
function esSafariIos() {
  const ua = window.navigator.userAgent || "";
  const ios = /iphone|ipad|ipod/i.test(ua) || (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
  return ios && /safari/i.test(ua) && !/crios|fxios|edgios|opios/i.test(ua);
}

function raiz() {
  let root = document.getElementById("instalar-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "instalar-root";
    document.body.appendChild(root);
  }
  return root;
}

function dibujar() {
  const root = raiz();
  let modo = "";
  if (!yaInstalada() && enPaginaDelEquipo()) {
    if (pedidoInstalar) modo = "boton";
    else if (esSafariIos() && !iosVisto) modo = "ios";
  }
  if (root.dataset.modo === modo) return;
  root.dataset.modo = modo;

  if (modo === "boton") {
    root.innerHTML = `
      <button type="button" class="instalar-boton" data-instalar aria-label="Instalar la app de Paseos Juan en este celular">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 4v11"></path><path d="m7 10 5 5 5-5"></path><path d="M5 20h14"></path>
        </svg>
        <span>Instalar app</span>
      </button>`;
  } else if (modo === "ios") {
    root.innerHTML = `
      <section class="instalar-ios" role="region" aria-labelledby="instalar-ios-texto">
        <p id="instalar-ios-texto">Para instalarla: tocá
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 3v12"></path><path d="m8 7 4-4 4 4"></path><path d="M6 11H5v10h14V11h-1"></path>
          </svg>
          <strong>Compartir</strong> y después <strong>Agregar a inicio</strong>.</p>
        <button type="button" class="instalar-ok" data-instalar-ok>Entendido</button>
      </section>`;
  } else {
    root.innerHTML = "";
  }
}

async function instalar() {
  const pedido = pedidoInstalar;
  if (!pedido) return;
  pedidoInstalar = null;
  dibujar();
  try {
    await pedido.prompt();
    await pedido.userChoice;
  } catch {
    // Si el navegador no deja mostrar el aviso, no pasa nada.
  }
}

function registrarServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  if (!import.meta.env.PROD) {
    // En desarrollo no hay service worker: si quedó uno de antes, se saca.
    navigator.serviceWorker.getRegistrations?.().then((regs) => regs.forEach((r) => r.unregister())).catch(() => {});
    return;
  }

  // La versión es el nombre del bundle compilado (cambia en cada despliegue).
  const bundle = new URL(import.meta.url).pathname.split("/").pop().replace(/\.js$/, "");
  const registrar = () => {
    navigator.serviceWorker
      .register(`/sw.js?v=${encodeURIComponent(bundle || "sin-version")}`, { scope: "/", updateViaCache: "none" })
      .catch(() => {});
  };
  if (document.readyState === "complete") registrar();
  else window.addEventListener("load", registrar, { once: true });
}

function iniciar() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    pedidoInstalar = event;
    dibujar();
  });

  window.addEventListener("appinstalled", () => {
    pedidoInstalar = null;
    dibujar();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-instalar]")) {
      instalar();
      return;
    }
    if (event.target.closest("[data-instalar-ok]")) {
      guardarIosVisto();
      dibujar();
    }
  });

  // La app cambia de página sin recargar: cuando se redibuja #app, se revisa la ruta.
  window.addEventListener("popstate", dibujar);
  const app = document.getElementById("app");
  if (app) new MutationObserver(dibujar).observe(app, { childList: true });

  dibujar();
  registrarServiceWorker();
}

iniciar();
