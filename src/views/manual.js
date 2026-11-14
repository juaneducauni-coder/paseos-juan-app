// Manual con historias (/manual): cómo se usa la app, por rol, en tarjetas cortas tipo historia.
// Cada tarjeta: un dibujo simple + una frase. Se avanza tocando, deslizando o con las flechas.
// Sin avance automático: cada persona va a su ritmo (y el modo calmo no tiene animaciones).
// El contenido está en data/manual.js. La historia abierta queda en la dirección (/manual?rol=...).
import { MANUAL_ROLES, MANUAL_ACCESOS } from "../data/manual.js";
import { icon, esc } from "../ui/shared.js";
import { publicShell, publicFooter } from "./landing.js";

const visor = { rol: null, paso: 0 };
let abridor = null; // rol cuyo botón abrió la historia, para devolverle el foco al cerrar
let toque = null; // inicio de un deslizamiento con el dedo
let ignorarClick = false;

// ---------- Dibujos (SVG a mano, colores por clase para que anden en modo oscuro) ----------

const fondo = `<path class="f-b" d="M34 38C62 8 128 2 176 16s68 48 52 84-58 50-116 48S4 124 10 90s2-30 24-52Z"/>`;
const piso = (y = 140) => `<path class="s" d="M14 ${y}h212"/>`;

function perro(x, y, s = 1, c = "f-g") {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path class="s" d="M10 16q-9-3-8-13"/><rect class="${c}" x="8" y="12" width="40" height="20" rx="10"/><rect class="${c}" x="11" y="26" width="6" height="18" rx="3"/><rect class="${c}" x="20" y="26" width="6" height="18" rx="3"/><rect class="${c}" x="34" y="26" width="6" height="18" rx="3"/><rect class="${c}" x="42" y="26" width="6" height="18" rx="3"/><circle class="${c}" cx="50" cy="10" r="10"/><rect class="${c}" x="54" y="9" width="13" height="9" rx="4.5"/><ellipse class="f-i" cx="45" cy="9" rx="3.5" ry="7" transform="rotate(15 45 9)"/><circle class="f-i" cx="52" cy="7" r="1.8"/><circle class="f-i" cx="66" cy="12" r="2.4"/></g>`;
}

// Persona parada. pechera: chaleco del paseador. muslera: riñonera en el muslo del ayudante.
function persona(x, y, s = 1, { pechera = false, muslera = false } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect class="f-i" x="10" y="58" width="9" height="42" rx="4.5"/><rect class="f-i" x="21" y="58" width="9" height="42" rx="4.5"/><path class="s" d="M9 32 2 56M31 32l7 24"/><rect class="f-m" x="6" y="24" width="28" height="38" rx="11"/>${pechera ? `<rect class="f-g" x="8" y="27" width="24" height="31" rx="7"/><rect class="f-p" x="8" y="44" width="24" height="4"/>` : ""}${muslera ? `<rect class="f-g" x="5" y="64" width="15" height="15" rx="4"/><rect class="f-p" x="8" y="68" width="9" height="3" rx="1.5"/>` : ""}<circle class="f-h" cx="20" cy="12" r="11"/><path class="f-i" d="M9 11a11 11 0 0 1 22 0c-6-4-15-4-22 0Z"/></g>`;
}

const tilde = (cx, cy, r = 14, c = "f-g") =>
  `<circle class="${c}" cx="${cx}" cy="${cy}" r="${r}"/><path class="s-w" d="M${cx - r * 0.42} ${cy}l${r * 0.3} ${r * 0.32} ${r * 0.56}-${r * 0.6}"/>`;
const barra = (x, y, w, c = "f-b") => `<rect class="${c}" x="${x}" y="${y}" width="${w}" height="7" rx="3.5"/>`;
const celular = (x, y, w, h, adentro = "") =>
  `<rect class="f-i o" x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/><rect class="f-p" x="${x + 5}" y="${y + 10}" width="${w - 10}" height="${h - 20}" rx="5"/>${adentro}`;
const pin = (x, y, c = "f-g") =>
  `<path class="${c}" d="M${x} ${y}c-8-10-12-15-12-21a12 12 0 0 1 24 0c0 6-4 11-12 21Z"/><circle class="f-p" cx="${x}" cy="${y - 21}" r="4.5"/>`;
const casa = (x, y, s = 1, c = "f-g") =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path class="${c}" d="M0 22 24 2l24 20v30H0Z"/><rect class="f-p" x="18" y="32" width="12" height="20" rx="2"/></g>`;
const ojo = (cx, cy, s = 1) =>
  `<g transform="translate(${cx} ${cy}) scale(${s})"><path class="f-p o" d="M-26 0q26-26 52 0-26 26-52 0Z"/><circle class="f-g" r="10"/><circle class="f-i" r="4"/></g>`;
const numero = (cx, cy, n, c = "f-g") =>
  `<circle class="${c}" cx="${cx}" cy="${cy}" r="12"/><text class="f-p t" x="${cx}" y="${cy + 5}">${n}</text>`;
const flecha = (x1, y1, x2, y2) => `<path class="s" d="M${x1} ${y1}L${x2} ${y2}m-8-7 8 7-8 7"/>`;
const hoja = (x, y, w, h) => `<rect class="f-p o" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>`;
const reloj = (cx, cy, r = 30) =>
  `<circle class="f-p o" cx="${cx}" cy="${cy}" r="${r}"/><path class="s" d="M${cx} ${cy - r * 0.6}V${cy}l${r * 0.45} ${r * 0.3}"/>`;

const ARTE = {
  portada: () => fondo + persona(64, 30, 1.05, { pechera: true }) + `<path class="s" d="M104 89q22 18 50 15"/>` + perro(128, 96, 1.05, "f-g") + piso(),

  evaluacion: () => fondo + celular(34, 20, 64, 116, barra(46, 44, 40) + barra(46, 58, 30) + barra(46, 72, 36) + `<rect class="f-g" x="46" y="98" width="40" height="16" rx="8"/>`) + perro(126, 96, 1.1, "f-m") + tilde(206, 52) + piso(),
  regalo: () => fondo + `<rect class="f-g" x="44" y="70" width="84" height="66" rx="8"/><rect class="f-m" x="36" y="54" width="100" height="22" rx="7"/><rect class="f-p" x="80" y="54" width="12" height="82"/><ellipse class="f-m" cx="74" cy="46" rx="14" ry="9" transform="rotate(-20 74 46)"/><ellipse class="f-m" cx="98" cy="46" rx="14" ry="9" transform="rotate(20 98 46)"/>` + perro(146, 96, 1, "f-g") + piso(),
  pagina: () => fondo + celular(36, 16, 76, 128, perro(46, 36, 0.8, "f-g") + tilde(56, 96, 8) + barra(70, 92, 30) + tilde(56, 118, 8) + barra(70, 114, 24)) + hoja(132, 38, 84, 88) + `<rect class="f-g" x="132" y="38" width="84" height="20" rx="8"/>` + tilde(154, 80, 9) + tilde(174, 80, 9) + tilde(194, 80, 9) + tilde(154, 106, 9) + tilde(174, 106, 9),
  ausencia: () => fondo + hoja(52, 26, 136, 110) + `<rect class="f-g" x="52" y="26" width="136" height="26" rx="8"/>` + [0, 1, 2, 3].map((i) => `<rect class="f-b" x="${64 + i * 30}" y="64" width="22" height="22" rx="5"/><rect class="${i === 2 ? "f-r" : "f-b"}" x="${64 + i * 30}" y="98" width="22" height="22" rx="5"/>`).join("") + `<path class="s-w" d="M130 103l12 12m0-12-12 12"/>`,
  carnet: () => fondo + hoja(42, 22, 104, 118) + `<rect class="f-g" x="42" y="22" width="104" height="24" rx="8"/><path class="f-m" d="M84 60h20v14h14v20h-14v14H84V94H70V74h14Z"/>` + barra(62, 120, 64) + `<circle class="f-g" cx="184" cy="80" r="26"/><path class="s-w" d="M184 94V66m-11 11 11-11 11 11"/>`,
  whatsapp: () => fondo + `<path class="f-g" d="M40 40h112a14 14 0 0 1 14 14v40a14 14 0 0 1-14 14H82l-24 20v-20H40a14 14 0 0 1-14-14V54a14 14 0 0 1 14-14Z"/><circle class="f-p" cx="66" cy="74" r="6"/><circle class="f-p" cx="96" cy="74" r="6"/><circle class="f-p" cx="126" cy="74" r="6"/><path class="f-m" d="M150 96h56a12 12 0 0 1 12 12v14a12 12 0 0 1-12 12h-6v14l-18-14h-32a12 12 0 0 1-12-12v-14a12 12 0 0 1 12-12Z"/>`,

  ingreso: () => fondo + celular(78, 12, 84, 136, `<rect class="f-p o" x="92" y="36" width="56" height="16" rx="6"/>` + [0, 1, 2, 3].map((i) => `<circle class="f-g" cx="${100 + i * 13}" cy="74" r="4.5"/>`).join("") + `<rect class="f-g" x="92" y="96" width="56" height="18" rx="9"/>`) + tilde(186, 104),
  pechera: () => fondo + persona(78, 15, 1.25, { pechera: true }) + `<path class="s-g" d="M60 66l-10-6m10 22H46m90-16 10-6m-10 22h14"/>` + perro(150, 105, 0.8, "f-m") + piso(),
  ruta: () => fondo + `<path class="s-g d" d="M42 124C78 40 136 156 196 58"/>` + pin(42, 124, "f-g") + pin(120, 104, "f-m") + pin(196, 58, "f-g") + numero(60, 140, 1) + numero(138, 120, 2) + numero(214, 74, 3),
  secuencia: () => fondo + `<circle class="f-g" cx="44" cy="80" r="30"/>` + casa(32, 60, 0.5, "f-p") + flecha(80, 80, 96, 80) + `<circle class="f-m" cx="120" cy="80" r="30"/><rect class="f-p" x="102" y="70" width="36" height="24" rx="5"/><circle class="f-m" cx="120" cy="82" r="7"/><rect class="f-p" x="112" y="65" width="14" height="6" rx="2"/>` + flecha(156, 80, 172, 80) + tilde(196, 80, 30),
  avisos: () => fondo + hoja(30, 26, 136, 46) + `<rect class="f-r" x="30" y="26" width="14" height="46" rx="7"/><path class="f-r" d="M64 62l12-22 12 22Z"/>` + barra(98, 44, 52) + hoja(30, 86, 136, 46) + `<rect class="f-u" x="30" y="86" width="14" height="46" rx="7"/><circle class="f-u" cx="76" cy="109" r="11"/>` + barra(98, 104, 52) + ojo(196, 78, 0.7) + tilde(214, 104, 11),
  incidente: () => fondo + hoja(56, 20, 90, 124) + `<rect class="f-g" x="80" y="14" width="42" height="14" rx="6"/>` + barra(70, 48, 60) + barra(70, 66, 48) + barra(70, 84, 56) + barra(70, 102, 40) + ojo(184, 78, 0.9),

  checklist: () => fondo + `<rect class="f-g" x="16" y="52" width="32" height="28" rx="7"/><rect class="f-p" x="22" y="60" width="20" height="5" rx="2.5"/>` + `<rect class="f-p o" x="62" y="52" width="36" height="28" rx="6"/><path class="f-r" d="M76 57h8v7h7v8h-7v7h-8v-7h-7v-8h7Z"/>` + `<rect class="f-m" x="112" y="44" width="16" height="36" rx="6"/><rect class="f-g" x="115" y="38" width="10" height="8" rx="2"/>` + `<rect class="f-g" x="144" y="52" width="28" height="28" rx="12"/><circle class="f-p" cx="158" cy="66" r="5"/>` + `<rect class="f-i" x="188" y="42" width="24" height="40" rx="6"/><rect class="f-m" x="193" y="52" width="14" height="24" rx="2"/>` + [32, 80, 120, 158, 200].map((x) => tilde(x, 112, 10)).join(""),
  botiquin: () => fondo + `<path class="s" d="M76 46v-12h40v12"/><rect class="f-p o" x="52" y="46" width="88" height="70" rx="12"/><path class="f-r" d="M86 62h20v14h14v20h-14v14H86V96H72V76h14Z"/>` + `<rect class="f-u" x="160" y="58" width="26" height="58" rx="8"/><rect class="f-g" x="166" y="48" width="14" height="12" rx="3"/>` + `<circle class="f-p o" cx="206" cy="104" r="14"/><circle class="f-b" cx="206" cy="104" r="5"/>` + piso(118),
  integracion: () => fondo + persona(36, 40, 1, { muslera: true }) + `<path class="s" d="M74 96q26 22 58 15"/>` + perro(90, 96, 1, "f-m") + perro(172, 118, 0.5, "f-g") + perro(198, 118, 0.5, "f-g") + piso() + `<path class="s-g d" d="M30 150h180"/>`,
  devolver: () => fondo + casa(164, 72, 1.3, "f-g") + persona(20, 40, 1, { muslera: true }) + `<path class="s" d="M58 96q20 14 30 12M58 96q36 24 84 14"/>` + perro(72, 108, 0.7, "f-m") + perro(124, 108, 0.7, "f-g") + numero(110, 40, 2) + piso(),
  hidratar: () => fondo + perro(36, 88, 1.15, "f-g") + `<path class="f-u" d="M116 126h40l-4 14h-32Z"/><path class="f-u" d="M126 106q6-10 0-16-6 6 0 16Zm18-4q5-8 0-13-5 5 0 13Z"/>` + `<path class="f-g" d="M176 98h30l6 42h-42Z"/><path class="s" d="M184 98q7-12 14 0"/>` + piso(),
  dividir: () => fondo + persona(16, 66, 0.62, { pechera: true }) + perro(46, 108, 0.55, "f-g") + perro(52, 82, 0.5, "f-m") + `<path class="s-g d" d="M120 26v114"/>` + persona(138, 66, 0.62, { muslera: true }) + perro(168, 108, 0.55, "f-m") + perro(174, 82, 0.5, "f-g") + `<path class="s" d="M96 60q6-6 12 0m-6-14q6-6 12 0M210 60q6-6 12 0"/>` + piso(),

  tablero: () => fondo + hoja(22, 22, 196, 118) + `<circle class="f-r" cx="40" cy="40" r="6"/>` + barra(54, 36, 50, "f-m") + [62, 88, 114].map((y, i) => `<circle class="${i === 2 ? "f-m" : "f-g"}" cx="44" cy="${y + 4}" r="9"/>` + barra(62, y, i === 2 ? 70 : 110, "f-m") + (i < 2 ? tilde(196, y + 4, 9) : `<circle class="f-b" cx="196" cy="${y + 4}" r="9"/>`)).join(""),
  atrasados: () => fondo + reloj(76, 78, 40) + `<circle class="f-r" cx="108" cy="46" r="14"/><path class="s-w" d="M108 39v8m0 6v.5"/>` + hoja(136, 46, 82, 30) + `<rect class="f-r" x="136" y="46" width="12" height="30" rx="6"/>` + barra(156, 58, 50) + hoja(136, 88, 82, 30) + barra(156, 100, 44),
  pedido: () => fondo + celular(26, 16, 74, 128, `<rect class="f-g" x="40" y="44" width="46" height="18" rx="9"/><rect class="f-g" x="40" y="88" width="46" height="18" rx="9"/>`) + numero(114, 53, 1) + numero(114, 97, 2) + flecha(132, 75, 150, 75) + persona(160, 34, 1) + piso(),
  control: () => fondo + ojo(66, 78, 1.25) + flecha(110, 78, 132, 78) + persona(152, 34, 1) + `<rect class="f-p o" x="186" y="66" width="24" height="30" rx="4"/>` + barra(191, 74, 14, "f-g") + barra(191, 84, 10, "f-g") + piso(),

  rutas: () => fondo + `<path class="s-g d" d="M36 124C70 52 120 140 170 70"/>` + pin(36, 124) + pin(104, 106, "f-m") + pin(170, 70) + reloj(196, 112, 22),
  clientes: () => fondo + [0, 1, 2].map((i) => hoja(42 + i * 8, 24 + i * 38, 150, 32) + `<circle class="${i === 1 ? "f-m" : "f-g"}" cx="${62 + i * 8}" cy="${40 + i * 38}" r="10"/>` + barra(82 + i * 8, 36 + i * 38, 80 - i * 14)).join(""),
  barrio: () => fondo + `<path class="f-g" d="M30 66h14l40-22v72L44 94H30Z"/><rect class="f-m" x="40" y="94" width="12" height="22" rx="4"/><path class="s-g" d="M96 64q10 16 0 32m12-44q18 28 0 56"/>` + casa(130, 92, 0.8, "f-g") + casa(166, 82, 0.95, "f-m") + casa(204, 96, 0.7, "f-g") + piso(),
  sinPlata: () => fondo + `<rect class="f-m" x="38" y="56" width="120" height="64" rx="10"/><circle class="f-p" cx="98" cy="88" r="18"/><text class="f-g t" x="98" y="95">$</text>` + `<path class="s" d="M168 66v-12a18 18 0 0 1 36 0v12" /><rect class="f-g" x="160" y="66" width="52" height="44" rx="8"/><circle class="f-p" cx="186" cy="86" r="6"/>`,

  todo: () => fondo + `<rect class="f-g" x="50" y="22" width="62" height="54" rx="14"/><rect class="f-m" x="128" y="22" width="62" height="54" rx="14"/><rect class="f-m" x="50" y="88" width="62" height="54" rx="14"/><rect class="f-g" x="128" y="88" width="62" height="54" rx="14"/>` + persona(72, 30, 0.38) + casa(147, 36, 0.5, "f-p") + `<path class="s-w d" d="M62 128c10-26 26 0 38-18"/>` + `<path class="f-p" d="M159 98a10 10 0 0 1 10 10v10l4 6h-28l4-6v-10a10 10 0 0 1 10-10Z"/>`,
  plata: () => fondo + `<rect class="f-g" x="34" y="72" width="110" height="56" rx="10"/><rect class="f-m" x="44" y="58" width="110" height="56" rx="10"/><circle class="f-p" cx="99" cy="86" r="16"/><text class="f-g t" x="99" y="93">$</text>` + `<path class="f-g" d="M190 34l26 10v24c0 22-12 34-26 40-14-6-26-18-26-40V44Z"/><path class="s-w" d="M180 70l7 7 14-15"/>`,
  comprobante: () => fondo + `<path class="f-p o" d="M58 18h90v124l-11-8-11 8-11-8-12 8-11-8-11 8-11-8-12 8Z"/>` + barra(72, 40, 60) + barra(72, 58, 44) + barra(72, 76, 52) + `<rect class="f-m" x="72" y="98" width="40" height="12" rx="6"/>` + tilde(172, 104, 26),
  usuarios: () => fondo + persona(40, 40, 0.8) + persona(86, 30, 0.9) + persona(136, 40, 0.8) + `<circle class="f-g" cx="196" cy="56" r="20"/><path class="s-w" d="M196 46v20m-10-10h20"/>` + [0, 1, 2, 3].map((i) => `<circle class="f-g" cx="${178 + i * 12}" cy="104" r="4.5"/>`).join("") + piso(),
};

// Descripción en palabras de cada dibujo (para lectores de pantalla).
const ARTE_TEXTO = {
  portada: "Paseador con pechera y un perro con correa",
  evaluacion: "Celular con un formulario y un perro contento",
  regalo: "Caja de regalo al lado de un perro",
  pagina: "Celular con la página del cliente y un calendario con paseos hechos",
  ausencia: "Calendario con un día marcado como ausencia",
  carnet: "Carnet de vacunas y una flecha para mandarlo",
  whatsapp: "Burbujas de mensaje",
  ingreso: "Celular con usuario y PIN para entrar",
  pechera: "Paseador con la pechera puesta y un perro",
  ruta: "Mapa con la ruta del turno y tres paradas",
  secuencia: "Tres pasos: retirar en la casa, sacar la foto y entregar",
  avisos: "Aviso rojo, aviso azul y un ojo con el botón Visto",
  incidente: "Planilla de reporte y un ojo que observa",
  checklist: "Muslera, botiquín, botella, bolsas y celular, todos tildados",
  botiquin: "Botiquín con agua oxigenada y gasa",
  integracion: "Ayudante con muslera caminando con un perro nuevo",
  devolver: "Ayudante devolviendo dos perros a su casa",
  hidratar: "Perro tomando agua y una bolsa para la caca",
  dividir: "El grupo dividido en dos, cada uno con su persona",
  tablero: "Tablero en vivo con perros retirados y entregados",
  atrasados: "Reloj con un aviso rojo de atraso",
  pedido: "Celular con dos toques que llegan al coordinador",
  control: "Ojo que controla y una persona que hace el cambio",
  rutas: "Mapa con rutas y un reloj de horarios",
  clientes: "Fichas de clientes con sus perros",
  barrio: "Megáfono enviando un aviso a las casas del barrio",
  sinPlata: "Billete con un candado cerrado",
  todo: "Cuatro paneles: equipo, clientes, rutas y avisos",
  plata: "Billetes y un escudo de seguridad",
  comprobante: "Comprobante de pago con un tilde de confirmado",
  usuarios: "Tres personas del equipo y un PIN nuevo",
};

function dibujo(nombre, clase = "manual-art") {
  const arte = ARTE[nombre] || ARTE.portada;
  return `<svg class="${clase}" viewBox="0 0 240 160" role="img" aria-label="${esc(ARTE_TEXTO[nombre] || "Ilustración")}" focusable="false">${arte()}</svg>`;
}

// ---------- Visor de historias ----------

function rolDeLaDireccion() {
  const id = new URLSearchParams(window.location.search).get("rol");
  return MANUAL_ROLES.find((rol) => rol.id === id) || null;
}

function tarjeta(rol, paso) {
  const total = rol.pasos.length;
  const item = rol.pasos[paso];
  const ultimo = paso === total - 1;
  return `
    <figure class="manual-card">
      ${dibujo(item.arte)}
      <figcaption class="manual-text">${esc(item.texto)}</figcaption>
      ${ultimo ? `
        <div class="manual-cta">
          <a class="primary-button manual-cta-main" href="${rol.destino.href}" data-link data-manual-salir>${esc(rol.destino.texto)} ${icon("arrowRight")}</a>
          ${rol.extra ? `<a class="secondary-button" href="${rol.extra.href}" data-link data-manual-salir>${esc(rol.extra.texto)}</a>` : ""}
        </div>
      ` : ""}
    </figure>
  `;
}

function barras(rol, paso) {
  return rol.pasos.map((_, i) => `<span class="${i < paso ? "is-done" : i === paso ? "is-now" : ""}"></span>`).join("");
}

function textoPaso(rol, paso) {
  return `Paso ${paso + 1} de ${rol.pasos.length}`;
}

function visorHTML(rol) {
  if (visor.rol !== rol.id) {
    visor.rol = rol.id;
    visor.paso = 0;
  }
  const paso = Math.min(visor.paso, rol.pasos.length - 1);
  const ultimo = paso === rol.pasos.length - 1;
  return `
    <div class="manual-viewer" role="dialog" aria-modal="true" aria-labelledby="manual-viewer-title" data-manual-viewer>
      <div class="manual-sheet">
        <header class="manual-sheet-head">
          <div class="manual-bars" aria-hidden="true" data-manual-bars>${barras(rol, paso)}</div>
          <div class="manual-sheet-row">
            <h2 id="manual-viewer-title">${icon(rol.icono)} ${esc(rol.nombre)}</h2>
            <button class="manual-close" type="button" data-manual="cerrar" aria-label="Cerrar la historia">${icon("x")}</button>
          </div>
        </header>
        <div class="manual-stage" data-manual-stage>${tarjeta(rol, paso)}</div>
        <p class="visually-hidden" aria-live="polite" aria-atomic="true" data-manual-live></p>
        <div class="manual-controls">
          <button class="manual-nav" type="button" data-manual="anterior" ${paso === 0 ? "disabled" : ""}>${icon("arrowRight", "line-icon is-flipped")} Anterior</button>
          <span class="manual-count" data-manual-count aria-hidden="true">${paso + 1} de ${rol.pasos.length}</span>
          <button class="manual-nav manual-nav--next" type="button" data-manual="siguiente">${ultimo ? "Terminar" : `Siguiente ${icon("arrowRight")}`}</button>
        </div>
      </div>
    </div>
  `;
}

function anunciar(rol, paso) {
  const live = document.querySelector("[data-manual-live]");
  if (!live) return;
  live.textContent = "";
  // Pequeña pausa para que el lector de pantalla note el cambio.
  setTimeout(() => {
    live.textContent = `${textoPaso(rol, paso)}. ${rol.pasos[paso].texto}`;
  }, 60);
}

function irAPaso(nuevo) {
  const rol = MANUAL_ROLES.find((item) => item.id === visor.rol);
  const viewer = document.querySelector("[data-manual-viewer]");
  if (!rol || !viewer) return;
  if (nuevo >= rol.pasos.length) {
    cerrar();
    return;
  }
  const paso = Math.max(0, nuevo);
  if (paso === visor.paso && viewer.querySelector(".manual-card")) return;
  const adelante = paso > visor.paso;
  visor.paso = paso;
  const ultimo = paso === rol.pasos.length - 1;

  const stage = viewer.querySelector("[data-manual-stage]");
  stage.innerHTML = tarjeta(rol, paso);
  stage.firstElementChild?.classList.add(adelante ? "is-entering-next" : "is-entering-prev");
  viewer.querySelector("[data-manual-bars]").innerHTML = barras(rol, paso);
  viewer.querySelector("[data-manual-count]").textContent = `${paso + 1} de ${rol.pasos.length}`;

  const anterior = viewer.querySelector('[data-manual="anterior"]');
  const siguiente = viewer.querySelector('[data-manual="siguiente"]');
  const tenianFoco = document.activeElement === anterior;
  anterior.disabled = paso === 0;
  siguiente.innerHTML = ultimo ? "Terminar" : `Siguiente ${icon("arrowRight")}`;
  // Si el botón con foco quedó desactivado, el foco pasa a "Siguiente".
  if (tenianFoco && anterior.disabled) siguiente.focus();
  if (!viewer.contains(document.activeElement)) siguiente.focus();
  anunciar(rol, paso);
}

function abrir(id) {
  const rol = MANUAL_ROLES.find((item) => item.id === id);
  const root = document.getElementById("manual-viewer-root");
  if (!rol || !root) return;
  abridor = id;
  visor.rol = null; // cada vez que se abre, arranca del primer paso
  window.history.pushState({ manualHistoria: true }, "", `/manual?rol=${id}`);
  root.innerHTML = visorHTML(rol);
  enfocarVisor();
}

function enfocarVisor() {
  const rol = rolDeLaDireccion();
  const viewer = document.querySelector("[data-manual-viewer]");
  if (!rol || !viewer) return;
  viewer.querySelector('[data-manual="siguiente"]')?.focus();
  anunciar(rol, visor.paso);
}

function devolverFoco() {
  const boton = abridor && document.querySelector(`[data-manual-abrir="${abridor}"]`);
  if (boton) boton.focus();
}

function cerrar() {
  if (window.history.state?.manualHistoria) {
    // La historia se abrió desde esta página: "atrás" la cierra (también con el gesto del celular).
    window.history.back();
    return;
  }
  window.history.replaceState({}, "", "/manual");
  const root = document.getElementById("manual-viewer-root");
  if (root) root.innerHTML = "";
  devolverFoco();
}

// ---------- Página ----------

export function manualPage() {
  const rol = rolDeLaDireccion();
  return publicShell(`
    <main class="manual-main">
      <header class="manual-head">
        <div class="manual-head-copy">
          <p class="eyebrow">Manual</p>
          <h1>¿Qué sos?</h1>
          <p>Elegí tu rol y mirá la historia. Un paso por vez.</p>
        </div>
        ${dibujo("portada", "manual-hero-art")}
      </header>

      <ul class="manual-roles" aria-label="Elegí tu rol">
        ${MANUAL_ROLES.map((item) => `
          <li>
            <button class="manual-role" type="button" data-manual-abrir="${item.id}" aria-haspopup="dialog">
              <span class="manual-role-icon">${icon(item.icono)}</span>
              <span class="manual-role-copy">
                <span class="manual-role-name"><strong>${esc(item.nombre)}</strong><span class="manual-role-steps">${item.pasos.length} pasos</span></span>
                <small>${esc(item.resumen)}</small>
              </span>
            </button>
          </li>
        `).join("")}
      </ul>

      <section class="manual-accesos" aria-labelledby="manual-accesos-titulo">
        <h2 id="manual-accesos-titulo">Accesos directos</h2>
        <ul>
          ${MANUAL_ACCESOS.map((item) => `
            <li><a href="${item.href}" data-link>${icon(item.icono)}<span>${esc(item.texto)}</span></a></li>
          `).join("")}
        </ul>
      </section>
    </main>
    ${publicFooter()}
    <div id="manual-viewer-root">${rol ? visorHTML(rol) : ""}</div>
  `, "/manual");
}

// ---------- Eventos ----------

function enStage(event) {
  return event.target.closest?.("[data-manual-stage]");
}

function handleManualClick(event) {
  const abrirBoton = event.target.closest?.("[data-manual-abrir]");
  if (abrirBoton) {
    abrir(abrirBoton.dataset.manualAbrir);
    return;
  }
  // Un enlace de la última tarjeta: se sigue la navegación normal (data-link).
  if (event.target.closest?.("[data-manual-salir]")) {
    visor.rol = null;
    return;
  }
  const accion = event.target.closest?.("[data-manual]")?.dataset.manual;
  if (accion === "cerrar") return cerrar();
  if (accion === "anterior") return irAPaso(visor.paso - 1);
  if (accion === "siguiente") return irAPaso(visor.paso + 1);

  // Toque en la tarjeta: tercio izquierdo vuelve, el resto avanza (como las historias).
  const stage = enStage(event);
  if (stage && !event.target.closest("a, button")) {
    if (ignorarClick) {
      ignorarClick = false;
      return;
    }
    const caja = stage.getBoundingClientRect();
    irAPaso(event.clientX - caja.left < caja.width / 3 ? visor.paso - 1 : visor.paso + 1);
  }
}

function handleManualKey(event) {
  const viewer = document.querySelector("[data-manual-viewer]");
  if (!viewer) return;
  if (event.key === "Escape") {
    event.preventDefault();
    cerrar();
    return;
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    irAPaso(visor.paso + 1);
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    irAPaso(visor.paso - 1);
    return;
  }
  if (event.key === "Tab") {
    // El foco queda dentro de la historia mientras está abierta.
    const focos = [...viewer.querySelectorAll("a[href], button:not([disabled])")];
    if (!focos.length) return;
    const primero = focos[0];
    const ultimo = focos[focos.length - 1];
    if (!viewer.contains(document.activeElement)) {
      event.preventDefault();
      primero.focus();
    } else if (event.shiftKey && document.activeElement === primero) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault();
      primero.focus();
    }
  }
}

function handlePointerDown(event) {
  ignorarClick = false; // cada toque nuevo empieza limpio
  if (!enStage(event) || event.target.closest("a, button")) return;
  toque = { x: event.clientX, y: event.clientY };
}

function handlePointerUp(event) {
  if (!toque) return;
  const dx = event.clientX - toque.x;
  const dy = event.clientY - toque.y;
  toque = null;
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
    ignorarClick = true;
    irAPaso(dx < 0 ? visor.paso + 1 : visor.paso - 1);
  }
}

function handlePopState() {
  // app.js ya volvió a dibujar la página; acá solo se acomoda el foco.
  if (normalizar(window.location.pathname) !== "/manual") {
    visor.rol = null;
    return;
  }
  if (document.querySelector("[data-manual-viewer]")) enfocarVisor();
  else devolverFoco();
}

function normalizar(path) {
  return path.replace(/\/+$/, "") || "/";
}

export function registerManualEvents() {
  document.addEventListener("click", handleManualClick);
  document.addEventListener("keydown", handleManualKey);
  document.addEventListener("pointerdown", handlePointerDown);
  document.addEventListener("pointerup", handlePointerUp);
  document.addEventListener("pointercancel", () => { toque = null; });
  window.addEventListener("popstate", handlePopState);
}
