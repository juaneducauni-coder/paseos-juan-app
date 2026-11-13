// Service worker de Paseos Juan: guarda solo el "cascarón" de la app (index.html,
// archivos compilados, íconos y logos) para que abra con poca señal.
//
// Reglas de seguridad:
// - /api/* NUNCA pasa por el caché: datos y sesiones van siempre a la red.
// - Solo se guardan respuestas GET del mismo sitio, completas (200) y de archivos
//   estáticos conocidos. Nada de páginas con datos ni respuestas de otros sitios.
// - Navegación: primero la red; si no hay señal, el index.html guardado.
//
// Versión: instalar.js registra "/sw.js?v=<nombre del bundle>" (por ejemplo
// index-AbC123). Cada despliegue cambia el bundle, el navegador ve un service
// worker nuevo, arma un caché nuevo y borra los viejos.

const PREFIJO = "paseos-juan-";
const VERSION = new URL(self.location.href).searchParams.get("v") || "sin-version";
const CACHE = `${PREFIJO}${VERSION.replace(/[^\w.-]/g, "")}`;

// Archivos fijos de public/ que siempre conviene tener.
const FIJOS = [
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
  "/paseos-juan-logo-green.svg",
  "/paseos-juan-logo-white.svg",
  "/paseos-juan-logo.png",
];

// Qué se puede guardar: compilados de Vite, íconos y archivos estáticos de la raíz.
const ESTATICO = /^\/(assets\/[^/]+|icons\/[^/]+|[^/]+\.(?:png|svg|webp|jpg|jpeg|ico|webmanifest|woff2?))$/i;

function esApi(url) {
  return url.pathname === "/api" || url.pathname.startsWith("/api/");
}

function sePuedeGuardar(response) {
  return Boolean(response) && response.ok && response.status === 200 && response.type === "basic";
}

// Lee el index.html recién publicado y saca los archivos compilados que usa
// (JS y CSS de /assets/), para guardarlos junto con el cascarón.
async function archivosDelIndex() {
  try {
    const res = await fetch("/index.html", { cache: "no-store" });
    if (!sePuedeGuardar(res)) return [];
    const html = await res.text();
    const encontrados = html.match(/\/assets\/[\w.\-]+\.(?:js|css)/g) || [];
    return [...new Set(encontrados)];
  } catch {
    return [];
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const lista = [...new Set([...FIJOS, ...(await archivosDelIndex())])];
      // Uno por uno: si falta un archivo, el resto se guarda igual.
      await Promise.allSettled(
        lista.map(async (ruta) => {
          const res = await fetch(ruta, { cache: "no-store" });
          if (sePuedeGuardar(res)) await cache.put(ruta, res);
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const nombres = await caches.keys();
      await Promise.all(
        nombres.filter((n) => n.startsWith(PREFIJO) && n !== CACHE).map((n) => caches.delete(n)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Datos y sesiones: siempre a la red, sin tocar el caché.
  if (esApi(url)) return;

  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          const cache = await caches.open(CACHE);
          const guardado = await cache.match("/index.html");
          if (guardado) return guardado;
          return new Response(
            "<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'><title>Paseos Juan</title><p style='font-family:system-ui;padding:24px'>Sin conexión. Probá de nuevo en un rato.</p>",
            { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } },
          );
        }
      })(),
    );
    return;
  }

  if (!ESTATICO.test(url.pathname) || url.search) return;

  // Estáticos: primero el caché; si no está, la red y se guarda para la próxima.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const guardado = await cache.match(url.pathname);
      if (guardado) return guardado;
      const res = await fetch(request);
      if (sePuedeGuardar(res)) cache.put(url.pathname, res.clone()).catch(() => {});
      return res;
    })(),
  );
});
