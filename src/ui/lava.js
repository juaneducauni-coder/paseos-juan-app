// Efectos visuales: fondo tipo lámpara de lava y aparición de secciones al hacer scroll.
import { state } from "../state.js";
import { isCalmMotion, isDarkTheme } from "./accesibilidad.js";

// Fondo tipo lámpara de lava: manchas que suben, bajan y se funden entre sí.
// Se dibuja en baja resolución y el navegador lo agranda suave: liviano también en celulares.
const LAVA = {
  frame: null,
  lastDraw: 0,
  blobs: [
    { x: 0.84, r: 0.26, speed: 0.021, phase: 0.0, sway: 0.05 },
    { x: 0.66, r: 0.19, speed: 0.027, phase: 2.1, sway: 0.07 },
    { x: 0.94, r: 0.16, speed: 0.033, phase: 4.0, sway: 0.04 },
    { x: 0.18, r: 0.2, speed: 0.024, phase: 1.2, sway: 0.06 },
    { x: 0.04, r: 0.15, speed: 0.03, phase: 3.3, sway: 0.05 },
    { x: 0.42, r: 0.13, speed: 0.036, phase: 5.2, sway: 0.08 },
    { x: 0.56, r: 0.22, speed: 0.018, phase: 0.7, sway: 0.04 },
  ],
};

export function startLavaLamp() {
  if (LAVA.frame) cancelAnimationFrame(LAVA.frame);
  LAVA.frame = null;

  const canvas = document.querySelector("[data-lava]");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  if (!context) return;

  const scale = 4;
  // Modo calmo (o el sistema pide menos movimiento): se dibuja un solo cuadro quieto.
  const still = isCalmMotion();
  // Colores de marca: de verde suave (#EAF4EF) en el borde a verde medio en el centro.
  // En modo oscuro, verdes profundos que no encandilan.
  const edge = isDarkTheme() ? [22, 52, 39] : [184, 218, 198];
  const core = isDarkTheme() ? [34, 92, 66] : [132, 186, 157];
  let image;

  function resize() {
    const width = Math.max(40, Math.ceil(window.innerWidth / scale));
    const height = Math.max(40, Math.ceil(window.innerHeight / scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      image = context.createImageData(width, height);
    }
    image ||= context.createImageData(width, height);
  }

  function draw(seconds) {
    resize();
    const { width, height } = canvas;
    const unit = Math.min(width, height);
    const blobs = LAVA.blobs.map((blob) => {
      const wave = Math.sin(seconds * blob.speed * Math.PI * 2 + blob.phase);
      const pulse = 1 + 0.14 * Math.sin(seconds * blob.speed * 5 + blob.phase * 1.7);
      const radius = blob.r * unit * pulse;
      return {
        x: (blob.x + blob.sway * Math.sin(seconds * blob.speed * 3.1 + blob.phase)) * width,
        y: (0.5 - 0.62 * wave) * height,
        rr: radius * radius,
      };
    });

    const data = image.data;
    let index = 0;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        let field = 0;
        for (const blob of blobs) {
          const dx = x - blob.x;
          const dy = y - blob.y;
          field += blob.rr / (dx * dx + dy * dy + 1);
        }
        const alpha = Math.min(1, Math.max(0, (field - 0.95) / 0.09));
        const depth = Math.min(1, Math.max(0, (field - 1.05) / 1.6));
        data[index] = edge[0] + (core[0] - edge[0]) * depth;
        data[index + 1] = edge[1] + (core[1] - edge[1]) * depth;
        data[index + 2] = edge[2] + (core[2] - edge[2]) * depth;
        data[index + 3] = alpha * 255;
        index += 4;
      }
    }
    context.putImageData(image, 0, 0);
  }

  const start = performance.now() / 1000;
  if (still) {
    draw(start);
    return;
  }

  function loop(now) {
    // ~30 cuadros por segundo alcanzan para un movimiento lento y ahorran batería.
    if (now - LAVA.lastDraw > 33) {
      LAVA.lastDraw = now;
      draw(now / 1000);
    }
    LAVA.frame = requestAnimationFrame(loop);
  }
  LAVA.frame = requestAnimationFrame(loop);
}

export function hydrateReveal() {
  state.revealObserver?.disconnect();
  state.revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          state.revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  document.querySelectorAll(".reveal").forEach((element) => state.revealObserver.observe(element));
}
