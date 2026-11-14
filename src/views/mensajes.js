// Pantalla de chats del equipo (página /mensajes, E-047).
// Para admin, coordinador, supervisor, paseador y ayudante. Celular primero, tipo app de reparto:
// filas grandes, pocas letras, el campo para escribir siempre abajo.
//
// Pantalla 1 "Mensajes" (/mensajes): los canales que devuelve mensajes.resumen(), en Grupos,
// Directos y Clientes, y el botón "Nuevo mensaje directo" (elige a alguien de mensajes.contactos()).
// Pantalla 2 chat abierto (/mensajes?c=<canal>): burbujas (las mías a la derecha), avisos
// automáticos como nota del sistema, fotos (se bajan con la sesión), respuestas rápidas de la
// calle, dictado por voz si el navegador lo tiene y "Enviar" grande.
// El servidor decide qué canales ve cada rol: acá solo se muestra lo que trae el resumen (el
// paseador y el ayudante no ven las conversaciones de los clientes).
// Contrato: docs/datos-compartidos.md, "Chats y portal del cliente (E-045)".
// Sin señal (E-058): lo que no sale queda en el celular (src/api/client.js, pj_mensajes_pendientes),
// se ve al final del chat como "Sin enviar" y se manda solo cuando vuelve la señal. Si es un aviso
// urgente ("Necesito ayuda", "Perro suelto"), arriba aparece un aviso rojo con "Mandar por WhatsApp".
// Nada más se guarda en el celular salvo lo que ya guarda src/api/client.js (caché de mensajes).
import { icon, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";
import { session, mensajes, canalDirecto, onDataChange, archivos, homeFor, ROLE_LABELS } from "../api/client.js";
import { BUSINESS_INFO } from "../data/realData.js";

const TZ = "America/Argentina/Buenos_Aires";
export const ROLES_MENSAJES = ["admin", "coordinador", "supervisor", "paseador", "ayudante"];
const CANAL_OK = /^(equipo|calle|coordinacion|clientes|dm_[a-z0-9._-]{3,31}__[a-z0-9._-]{3,31}|cliente_[a-z0-9][a-z0-9_.-]{0,79})$/i;
const ARCHIVO_OK = /^[a-z0-9][a-z0-9_.-]{0,120}$/i;

const GRUPOS = {
  equipo: { titulo: "Equipo", sub: "Todo el equipo", icono: "users" },
  calle: { titulo: "Calle", sub: "Lo que pasa en el turno", icono: "mapPin" },
  coordinacion: { titulo: "Coordinación", sub: "Supervisión y coordinación", icono: "route" },
  clientes: { titulo: "Comunidad de clientes", sub: "Clientes y Paseos Juan", icono: "pawPrint" },
};
const ORDEN_GRUPOS = ["equipo", "calle", "coordinacion", "clientes"];

// Respuestas rápidas para la calle: un toque y se mandan. Las dos últimas, en rojo.
const RAPIDAS = [
  { texto: "Llegué" },
  { texto: "Salimos" },
  { texto: "Todo bien" },
  { texto: "Necesito ayuda", urgente: true },
  { texto: "Perro suelto", urgente: true },
];

// Los urgentes se ven en rojo y, si no salen, muestran el aviso rojo de arriba.
function esUrgente(texto) {
  return RAPIDAS.some((r) => r.urgente && r.texto === String(texto || "").trim());
}

const EXTRA = {
  back: `<path d="M15 5 8 12l7 7" />`,
  mic: `<rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" />`,
  plus: `<path d="M12 5v14" /><path d="M5 12h14" />`,
  photo: `<rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-5-5-8 8" />`,
};

function ic(name, cls = "msj-icon") {
  if (EXTRA[name]) {
    return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${EXTRA[name]}</svg>`;
  }
  return icon(name, cls);
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- Estado de la pantalla (solo en memoria) ----------
const ui = {
  canal: "", // chat abierto
  listo: "", // chat abierto que ya respondió (desde ahí se anuncian los mensajes nuevos)
  stopCanal: null,
  guardia: 0,
  picker: false,
  contactos: null,
  cargandoContactos: false,
  errorContactos: "",
  errorResumen: "",
  cargandoResumen: false,
  errorChat: "", // no se pudo abrir el chat (permiso, etc.)
  errorEnvio: "",
  enviando: false,
  cargados: new Set(), // canales que ya respondieron al menos una vez
  vistos: new Map(), // canal → Set de ids ya dibujados (para anunciar solo lo nuevo)
  borradores: new Map(), // canal → texto sin enviar
  directosNuevos: new Map(), // canal → { titulo, con } del directo recién elegido
  dictado: null,
  hidratar: false,
};
const fotos = new Map(); // adjuntoId → { url, cargando, error, at }

function yo() {
  return session.user() || {};
}

function canalDeLaDireccion() {
  const canal = new URLSearchParams(window.location.search).get("c") || "";
  return CANAL_OK.test(canal) ? canal : "";
}

function enMensajes() {
  return window.location.pathname.replace(/\/+$/, "") === "/mensajes";
}

// ---------- Fechas y horas (Argentina) ----------
const fmtHora = new Intl.DateTimeFormat("es-AR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: false });
const fmtDia = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });

function fecha(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

function diaAR(d) {
  return fmtDia.format(d);
}

function ayerAR() {
  return diaAR(new Date(Date.now() - 24 * 60 * 60 * 1000));
}

function hora(iso) {
  const d = fecha(iso);
  return d ? fmtHora.format(d) : "";
}

function ddmmaaaa(dia) {
  const [a, m, d] = dia.split("-");
  return `${d}/${m}/${a}`;
}

function etiquetaDia(iso) {
  const d = fecha(iso);
  if (!d) return "";
  const dia = diaAR(d);
  if (dia === diaAR(new Date())) return "Hoy";
  if (dia === ayerAR()) return "Ayer";
  return ddmmaaaa(dia);
}

// En la lista: hora si es de hoy, "Ayer" o la fecha corta.
function cuandoCorto(iso) {
  const d = fecha(iso);
  if (!d) return "";
  const dia = diaAR(d);
  if (dia === diaAR(new Date())) return fmtHora.format(d);
  if (dia === ayerAR()) return "Ayer";
  return ddmmaaaa(dia).slice(0, 5);
}

function primerNombre(nombre) {
  return String(nombre || "").trim().split(/\s+/)[0] || "";
}

function inicial(nombre) {
  return (String(nombre || "").trim()[0] || "?").toUpperCase();
}

function rolDe(rol) {
  return ROLE_LABELS[rol] || "";
}

// ---------- Datos de cada canal ----------
function otroDelDirecto(canal) {
  if (!canal.startsWith("dm_")) return "";
  const [a, b] = canal.slice(3).split("__");
  return a === yo().usuario ? b : a;
}

function infoCanal(canal) {
  const item = mensajes.cachedResumen().find((c) => c.canal === canal);
  if (GRUPOS[canal]) return { tipo: canal === "clientes" ? "comunidad" : "grupo", ...GRUPOS[canal], ...(item ? { titulo: item.titulo || GRUPOS[canal].titulo } : {}) };
  if (canal.startsWith("dm_")) {
    const nuevo = ui.directosNuevos.get(canal);
    const con = item?.con || nuevo?.con || { usuario: otroDelDirecto(canal), nombre: otroDelDirecto(canal), rol: "" };
    return { tipo: "directo", titulo: item?.titulo || nuevo?.titulo || con.nombre, sub: rolDe(con.rol) || "Mensaje directo", con };
  }
  return { tipo: "cliente", titulo: item?.titulo || "Cliente", sub: "Chat con el cliente", icono: "pawPrint" };
}

// ---------- Entrada desde otras pantallas (pestaña "Mensajes" con los sin leer) ----------
// tipo: "pw" (barra del paseador), "sv" (barra del supervisor), "cd" (barra del coordinador).
// Arranca el resumen (cada 60 s) para que el globito se mantenga al día.
export function pestanaMensajes(tipo) {
  if (session.token()) mensajes.watchResumen();
  const n = mensajes.sinLeer();
  const etiqueta = n ? `Mensajes, ${n} sin leer` : "Mensajes";
  const insignia = `<b class="${{ pw: "pw-tab-badge", sv: "sv-badge", cd: "cd-tab-n", adm: "adm-nav-badge adm-nav-badge--red" }[tipo] || "msj-insignia"} msj-tab-n" data-msj-badge aria-hidden="true" ${n ? "" : "hidden"}>${n > 99 ? "99+" : n}</b>`;
  const comun = `href="/mensajes" data-link data-msj-tab aria-label="${etiqueta}"`;
  if (tipo === "pw") {
    return `<a class="pw-tab pw-tab--mensajes msj-tab" ${comun}><span class="pw-tab-icon">${icon("message", "pw-icon")}${insignia}</span><span class="pw-tab-label">Mensajes</span></a>`;
  }
  if (tipo === "adm") {
    return `<a class="adm-nav-item msj-tab" ${comun}><span class="adm-nav-icon">${icon("message", "adm-icon")}${insignia}</span><span class="adm-nav-label">Mensajes</span></a>`;
  }
  if (tipo === "sv") {
    return `<a class="sv-nav-item msj-tab" ${comun}><span class="sv-nav-icon">${icon("message", "sv-icon")}${insignia}</span><span>Mensajes</span></a>`;
  }
  return `<a class="cd-tab msj-tab" ${comun}>${icon("message", "coord-icon")}<span>Mensajes</span>${insignia}</a>`;
}

function actualizarInsignias() {
  const n = mensajes.sinLeer();
  document.querySelectorAll("[data-msj-tab]").forEach((a) => {
    a.setAttribute("aria-label", n ? `Mensajes, ${n} sin leer` : "Mensajes");
    const b = a.querySelector("[data-msj-badge]");
    if (!b) return;
    b.textContent = n > 99 ? "99+" : String(n);
    b.hidden = !n;
  });
}

// ---------- Página ----------
export function mensajesPage() {
  const canal = canalDeLaDireccion();
  prepararCanal(canal);
  ui.hidratar = true;
  queueMicrotask(hidratar);
  return canal ? ChatScreen(canal) : ListScreen();
}

// Abre o cierra la escucha del canal (cada 10 s mientras el chat está abierto).
function prepararCanal(canal) {
  if (ui.canal === canal) return;
  pararCanal();
  ui.canal = canal;
  ui.listo = "";
  ui.errorChat = "";
  ui.errorEnvio = "";
  if (!canal) return;
  // Al abrir un chat se manda lo que quedó sin señal.
  mensajes.enviarPendientes();
  mensajes.list(canal)
    .then(() => {
      if (ui.canal !== canal) return;
      ui.cargados.add(canal);
      ui.listo = canal;
      ui.stopCanal = mensajes.watch(canal);
      leer(canal);
      // La comunidad trae sus reglas con la primera lectura: se dibuja todo de nuevo.
      if (canal === "clientes" && enMensajes()) render();
      else actualizarChat(true);
    })
    .catch((error) => {
      if (ui.canal !== canal) return;
      ui.cargados.add(canal);
      ui.errorChat = error.status === 403 ? "No podés ver este chat." : error.message || "No se pudo abrir el chat.";
      if (enMensajes()) render();
    });
  // Si se sale de la página (otro panel, salir), se deja de pedir el chat.
  ui.guardia = setInterval(() => {
    if (!enMensajes() || canalDeLaDireccion() !== ui.canal) {
      pararCanal();
      if (!enMensajes()) ui.canal = "";
    }
  }, 1500);
}

function pararCanal() {
  ui.stopCanal?.();
  ui.stopCanal = null;
  clearInterval(ui.guardia);
  pararDictado();
}

function leer(canal) {
  if (document.visibilityState !== "visible") return;
  mensajes.marcarLeido(canal).catch(() => {});
}

function cabecera({ titulo, sub = "", volver, volverTexto, a11y = true }) {
  return `
    <header class="msj-header">
      <a class="msj-back" href="${esc(volver)}" data-link aria-label="${esc(volverTexto)}">${ic("back")}</a>
      <div class="msj-head-text">
        <h1 id="msj-titulo" tabindex="-1">${esc(titulo)}</h1>
        ${sub ? `<p>${esc(sub)}</p>` : ""}
      </div>
      ${a11y ? `<button class="msj-head-btn" type="button" data-a11y-toggle aria-controls="a11y-panel" aria-label="Accesibilidad: tema y movimiento">${ic("eye")}</button>` : ""}
    </header>
  `;
}

// ---------- Pantalla 1: lista de chats ----------
function ListScreen() {
  const user = yo();
  if (session.token()) mensajes.watchResumen();
  if (ui.picker) return PickerScreen();
  const lista = mensajes.cachedResumen();
  const grupos = ORDEN_GRUPOS.map((c) => lista.find((i) => i.canal === c)).filter(Boolean);
  const directos = lista.filter((i) => i.tipo === "directo");
  const clientes = lista.filter((i) => i.tipo === "cliente");
  // Un directo nuevo que todavía no salió (sin señal) no está en el resumen: se muestra igual.
  if (lista.length) {
    [...new Set(mensajes.pendientes().map((p) => p.canal))]
      .filter((c) => c.startsWith("dm_") && !lista.some((i) => i.canal === c))
      .forEach((c) => {
        const info = infoCanal(c);
        directos.push({ canal: c, tipo: "directo", titulo: info.titulo, con: info.con });
      });
  }
  const seccion = (titulo, items, vacio = "") => (items.length || vacio ? `
    <section class="msj-seccion" aria-labelledby="msj-s-${esc(titulo)}">
      <h2 id="msj-s-${esc(titulo)}">${esc(titulo)}</h2>
      ${items.length ? `<ul class="msj-filas">${items.map(Fila).join("")}</ul>` : `<p class="msj-vacio">${esc(vacio)}</p>`}
    </section>` : "");

  let cuerpo;
  if (!lista.length && ui.errorResumen) {
    cuerpo = `<div class="msj-nota msj-nota--error" role="alert">${ic("alertTriangle")}<span>${esc(ui.errorResumen)}</span><button class="msj-btn msj-btn--chico" type="button" data-msj-reintentar>Reintentar</button></div>`;
  } else if (!lista.length) {
    cuerpo = `<p class="msj-vacio" role="status">Cargando chats…</p>`;
  } else {
    cuerpo = `
      ${BannerUrgente()}
      ${seccion("Grupos", grupos)}
      ${seccion("Directos", directos, "Todavía no tenés mensajes directos.")}
      ${seccion("Clientes", clientes)}
      ${ui.errorResumen ? `<p class="msj-nota msj-nota--aviso" role="status">${ic("alertTriangle")}<span>${esc(ui.errorResumen)}</span></p>` : ""}
    `;
  }

  return `
    <div class="msj-shell" data-msj-screen="lista">
      ${cabecera({ titulo: "Mensajes", volver: homeFor(user.rol), volverTexto: "Volver a mi panel" })}
      <main class="msj-main" id="msj-main">
        <button class="msj-btn msj-btn--grande msj-nuevo" type="button" data-msj-nuevo>${ic("plus")}<span>Nuevo mensaje directo</span></button>
        <div id="msj-canales" class="msj-canales">${cuerpo}</div>
      </main>
      <p class="msj-sr" id="msj-live" aria-live="polite"></p>
    </div>
  `;
}

function avatarDe(item) {
  if (item.tipo === "directo") return `<span class="msj-avatar msj-avatar--persona" aria-hidden="true">${esc(inicial(item.con?.nombre || item.titulo))}</span>`;
  const icono = GRUPOS[item.canal]?.icono || (item.tipo === "cliente" ? "pawPrint" : "message");
  return `<span class="msj-avatar msj-avatar--${item.tipo === "cliente" ? "cliente" : "grupo"}" aria-hidden="true">${ic(icono)}</span>`;
}

function vistaPrevia(item) {
  const u = item.ultimo;
  if (!u) return GRUPOS[item.canal]?.sub || (item.tipo === "directo" ? rolDe(item.con?.rol) : "") || "Sin mensajes";
  const texto = u.tipo === "foto" && !u.texto ? "Foto" : u.texto || (u.tipo === "foto" ? "Foto" : "");
  if (u.autor === yo().usuario) return `Vos: ${texto}`;
  if (item.tipo === "directo" || u.autor === "sistema") return texto;
  return `${primerNombre(u.autorNombre) || "Alguien"}: ${texto}`;
}

// "1 sin enviar" / "1 no se pudo enviar" en la fila del canal (no cuentan como sin leer).
function SinEnviar(canal) {
  const pend = mensajes.pendientes(canal);
  if (!pend.length) return "";
  const fallidos = pend.filter((p) => p.estado === "error").length;
  const esperando = pend.length - fallidos;
  const urgente = pend.some((p) => p.urgente || esUrgente(p.texto));
  const partes = [];
  if (esperando) partes.push(`${esperando} sin enviar`);
  if (fallidos) partes.push(`${fallidos} ${fallidos === 1 ? "no se pudo enviar" : "no se pudieron enviar"}`);
  return `<span class="msj-fila-pend ${fallidos || urgente ? "is-alerta" : ""}">${ic(fallidos || urgente ? "alertTriangle" : "clock", "msj-icon msj-icon--sm")}${esc(partes.join(" · "))}</span>`;
}

function Fila(item) {
  const n = item.sinLeer || 0;
  const cuando = item.ultimo?.creadoEn;
  return `
    <li>
      <a class="msj-fila ${n ? "tiene-nuevos" : ""}" href="/mensajes?c=${encodeURIComponent(item.canal)}" data-link>
        ${avatarDe(item)}
        <span class="msj-fila-texto">
          <span class="msj-fila-top">
            <strong>${esc(item.titulo || GRUPOS[item.canal]?.titulo || "Chat")}</strong>
            ${cuando ? `<time datetime="${esc(cuando)}">${esc(cuandoCorto(cuando))}</time>` : ""}
          </span>
          <span class="msj-fila-prev">${esc(vistaPrevia(item))}</span>
          ${SinEnviar(item.canal)}
        </span>
        ${n ? `<b class="msj-insignia" aria-hidden="true">${n > 99 ? "99+" : n}</b><span class="msj-sr">, ${n} sin leer</span>` : ""}
      </a>
    </li>
  `;
}

function PickerScreen() {
  let cuerpo;
  if (ui.errorContactos) {
    cuerpo = `<div class="msj-nota msj-nota--error" role="alert">${ic("alertTriangle")}<span>${esc(ui.errorContactos)}</span><button class="msj-btn msj-btn--chico" type="button" data-msj-nuevo>Reintentar</button></div>`;
  } else if (!ui.contactos) {
    cuerpo = `<p class="msj-vacio" role="status">Cargando el equipo…</p>`;
  } else if (!ui.contactos.length) {
    cuerpo = `<p class="msj-vacio">Todavía no hay más gente en el equipo.</p>`;
  } else {
    cuerpo = `<ul class="msj-filas">${ui.contactos.map((c) => `
      <li>
        <button class="msj-fila" type="button" data-msj-contacto="${esc(c.usuario)}">
          <span class="msj-avatar msj-avatar--persona" aria-hidden="true">${esc(inicial(c.nombre))}</span>
          <span class="msj-fila-texto">
            <strong>${esc(c.nombre)}</strong>
            <span class="msj-fila-prev">${esc(rolDe(c.rol))}</span>
          </span>
          ${ic("arrowRight", "msj-icon msj-fila-flecha")}
        </button>
      </li>`).join("")}</ul>`;
  }
  return `
    <div class="msj-shell" data-msj-screen="contactos">
      <header class="msj-header">
        <button class="msj-back" type="button" data-msj-cerrar-picker aria-label="Cancelar y volver a mensajes">${ic("back")}</button>
        <div class="msj-head-text"><h1 id="msj-titulo" tabindex="-1">¿A quién le escribís?</h1></div>
      </header>
      <main class="msj-main" id="msj-main">${cuerpo}</main>
      <p class="msj-sr" id="msj-live" aria-live="polite"></p>
    </div>
  `;
}

// ---------- Pantalla 2: chat abierto ----------
function ChatScreen(canal) {
  const info = infoCanal(canal);
  const puedeRapidas = info.tipo === "grupo" || info.tipo === "directo";
  const comunidad = info.tipo === "comunidad" ? mensajes.infoComunidad() : null;
  const silenciado = comunidad?.silenciadoHasta && new Date(comunidad.silenciadoHasta) > new Date();
  const borrador = ui.borradores.get(canal) || "";
  const dictar = Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);

  if (ui.errorChat) {
    return `
      <div class="msj-shell msj-shell--chat" data-msj-screen="chat">
        ${cabecera({ titulo: info.titulo, sub: info.sub, volver: "/mensajes", volverTexto: "Volver a mensajes" })}
        <main class="msj-main">
          <div class="msj-nota msj-nota--error" role="alert">${ic("alertTriangle")}<span>${esc(ui.errorChat)}</span></div>
          <a class="msj-btn msj-btn--grande" href="/mensajes" data-link>Volver a mensajes</a>
        </main>
      </div>
    `;
  }

  return `
    <div class="msj-shell msj-shell--chat" data-msj-screen="chat" data-msj-canal="${esc(canal)}">
      ${cabecera({ titulo: info.tipo === "comunidad" ? "Comunidad" : info.titulo, sub: info.sub, volver: "/mensajes", volverTexto: "Volver a mensajes" })}
      <div class="msj-urgente-lugar" id="msj-urgente">${BannerUrgente()}</div>
      <main class="msj-chat" id="msj-chat">
        ${comunidad?.reglas?.length ? `
          <section class="msj-reglas" aria-label="Reglas de la comunidad">
            <h2>Reglas</h2>
            <ul>${comunidad.reglas.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
          </section>` : ""}
        <ol class="msj-lista" id="msj-lista" aria-label="Mensajes de ${esc(info.titulo)}">${ListaItems(canal)}</ol>
      </main>
      <form class="msj-composer" data-msj-form novalidate>
        <p class="msj-error" id="msj-error" role="alert" ${ui.errorEnvio ? "" : "hidden"}>${ic("alertTriangle")}<span>${esc(ui.errorEnvio)}</span></p>
        ${silenciado ? `<p class="msj-nota msj-nota--aviso">${ic("lock")}<span>El admin te silenció en la comunidad hasta el ${esc(etiquetaDia(comunidad.silenciadoHasta))} a las ${esc(hora(comunidad.silenciadoHasta))}.</span></p>` : ""}
        ${puedeRapidas && !silenciado ? `
          <div class="msj-rapidas" role="group" aria-label="Respuestas rápidas: se mandan con un toque">
            ${RAPIDAS.map((r) => `<button class="msj-chip ${r.urgente ? "is-urgente" : ""}" type="button" data-msj-rapida="${esc(r.texto)}">${r.urgente ? ic("alertTriangle") : ""}${esc(r.texto)}</button>`).join("")}
          </div>` : ""}
        <div class="msj-fila-composer">
          ${dictar && !silenciado ? `<button class="msj-dictar" type="button" data-msj-dictar aria-pressed="false" aria-label="Dictar con la voz">${ic("mic")}</button>` : ""}
          <label class="msj-sr" for="msj-texto">Escribí tu mensaje</label>
          <textarea id="msj-texto" class="msj-texto" data-msj-input rows="1" maxlength="1000" placeholder="Escribí acá" autocomplete="off" enterkeyhint="send" ${silenciado ? "disabled" : ""}>${esc(borrador)}</textarea>
          <button class="msj-enviar" type="submit" data-msj-enviar ${silenciado ? "disabled" : ""}>${ic("send")}<span>Enviar</span></button>
        </div>
      </form>
      <p class="msj-sr" id="msj-live" aria-live="polite"></p>
    </div>
  `;
}

// Aviso rojo arriba del chat (y de la lista) si un aviso urgente mío no salió.
// No hay teléfono del supervisor en el código: se ofrece el WhatsApp del negocio (BUSINESS_INFO).
function BannerUrgente() {
  const urgentes = mensajes.pendientes().filter((p) => p.urgente || esUrgente(p.texto));
  if (!urgentes.length) return "";
  const textos = [...new Set(urgentes.map((p) => p.texto))];
  const quien = yo().nombre || yo().usuario || "";
  const texto = `URGENTE: ${textos.join(". ")}.${quien ? ` Soy ${quien}.` : ""} Por el chat de la app no salió.`;
  const href = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(texto)}`;
  const esperando = urgentes.some((p) => p.estado !== "error");
  return `
    <section class="msj-urgente" role="alert" aria-labelledby="msj-urgente-t">
      <p class="msj-urgente-t" id="msj-urgente-t">${ic("alertTriangle")}<span>Tu aviso urgente no salió. Llamá al supervisor.</span></p>
      <p class="msj-urgente-sub">“${esc(textos.join("”, “"))}” · ${esperando ? "se manda solo cuando vuelva la señal" : "no se va a mandar solo"}</p>
      <a class="msj-urgente-btn" href="${esc(href)}" target="_blank" rel="noopener noreferrer">${ic("message")}<span>Mandar por WhatsApp</span></a>
    </section>
  `;
}

// Mis mensajes que todavía no salieron: al final del chat, con su estado.
function Pendiente(p) {
  const urgente = p.urgente || esUrgente(p.texto);
  const fallido = p.estado === "error";
  const enviando = p.estado === "enviando" && Date.now() - (p.enviandoDesde || 0) < 60 * 1000;
  const estado = fallido
    ? `<p class="msj-estado is-error">${ic("alertTriangle", "msj-icon msj-icon--sm")}<span>No se pudo enviar</span></p>
       ${p.error ? `<p class="msj-estado-detalle">${esc(p.error)}</p>` : ""}
       <button class="msj-btn msj-btn--chico msj-borrar" type="button" data-msj-borrar-pend="${esc(p.cid)}">${ic("x")}<span>Borrar</span></button>`
    : `<p class="msj-estado">${ic("clock", "msj-icon msj-icon--sm")}<span>${enviando ? "Enviando…" : "Sin enviar · se manda cuando vuelva la señal"}</span></p>`;
  return `
    <li class="msj-item msj-item--mio msj-item--pendiente" data-msj-cid="${esc(p.cid)}">
      <div class="msj-burbuja is-pendiente ${urgente ? "is-urgente" : ""} ${fallido ? "is-fallido" : ""}">
        <span class="msj-sr">Vos, sin enviar: </span>
        <p class="msj-texto-burbuja">${urgente ? ic("alertTriangle", "msj-icon msj-icon--sm") : ""}${esc(p.texto)}</p>
        ${estado}
      </div>
    </li>
  `;
}

function ListaItems(canal) {
  const lista = mensajes.cached(canal);
  const pendientes = mensajes.pendientes(canal).map(Pendiente).join("");
  if (!lista.length) {
    if (pendientes) return pendientes;
    return `<li class="msj-vacio-chat">${ui.cargados.has(canal) ? "Todavía no hay mensajes. Escribí el primero." : "Cargando mensajes…"}</li>`;
  }
  const me = yo().usuario;
  const info = infoCanal(canal);
  let diaPrevio = "";
  let autorPrevio = "";
  return lista.map((m) => {
    const dia = etiquetaDia(m.creadoEn);
    let out = "";
    if (dia && dia !== diaPrevio) {
      out += `<li class="msj-dia"><span>${esc(dia)}</span></li>`;
      diaPrevio = dia;
      autorPrevio = "";
    }
    out += Mensaje(m, { me, info, mostrarAutor: m.autor !== autorPrevio });
    autorPrevio = m.automatico || m.tipo === "aviso" ? "" : m.autor;
    return out;
  }).join("") + pendientes;
}

function FotoAdjunta(m) {
  const id = String(m.adjuntoId || "");
  if (!id || !ARCHIVO_OK.test(id)) return "";
  const alt = m.perroNombre ? `Foto de ${m.perroNombre}` : "Foto";
  const f = fotos.get(id);
  return `
    <button class="msj-foto" type="button" data-msj-abrir-foto="${esc(id)}" aria-label="${esc(`${alt}. Abrir en grande`)}">
      ${f?.url ? `<img src="${esc(f.url)}" alt="" data-msj-foto="${esc(id)}" />` : `<span class="msj-foto-cargando" data-msj-foto="${esc(id)}">${ic("photo")}<span>${f?.error ? "No se pudo ver la foto" : "Cargando foto"}</span></span>`}
    </button>
  `;
}

function Mensaje(m, { me, info, mostrarAutor }) {
  // Si se escribió sin señal y llegó más tarde, se muestra la hora en que se escribió.
  const escrito = m.escritoEn || m.creadoEn;
  const tarde = m.escritoEn && Date.parse(m.creadoEn) - Date.parse(m.escritoEn) > 2 * 60 * 1000;
  const cuando = `<time class="msj-hora" datetime="${esc(escrito)}">${esc(hora(escrito))}${tarde ? ` · llegó ${esc(hora(m.creadoEn))}` : ""}</time>`;
  if (m.borrado) {
    return `<li class="msj-item msj-item--sistema"><p class="msj-aviso is-borrado"><span>Mensaje borrado por el admin</span>${cuando}</p></li>`;
  }
  if (m.automatico || m.tipo === "aviso") {
    const quien = m.automatico || m.autor === "sistema" ? "" : `Aviso de ${primerNombre(m.autorNombre) || "el equipo"}: `;
    return `
      <li class="msj-item msj-item--sistema">
        <div class="msj-aviso ${/^URGENTE\b/.test(m.texto || "") ? "is-urgente" : ""}">
          ${ic(/^URGENTE\b/.test(m.texto || "") ? "alertTriangle" : "bell")}
          <p><span>${esc(quien)}${esc(m.texto)}</span>${cuando}</p>
        </div>
        ${m.adjuntoId ? FotoAdjunta(m) : ""}
      </li>
    `;
  }
  const mio = m.autor === me;
  const autor = mio
    ? `<span class="msj-sr">Vos: </span>`
    : info.tipo === "directo" || !mostrarAutor
      ? `<span class="msj-sr">${esc(m.autorNombre || "")}: </span>`
      : `<p class="msj-autor">${esc(m.autorNombre || "Alguien")}${rolDe(m.autorRol) ? ` <span class="msj-rol">${esc(rolDe(m.autorRol))}</span>` : ""}</p>`;
  const urgente = esUrgente(m.texto);
  return `
    <li class="msj-item ${mio ? "msj-item--mio" : "msj-item--otro"} ${mostrarAutor ? "" : "is-seguido"}" data-msj-id="${esc(m.id)}">
      <div class="msj-burbuja ${urgente ? "is-urgente" : ""}">
        ${autor}
        ${m.adjuntoId ? FotoAdjunta(m) : ""}
        ${m.texto ? `<p class="msj-texto-burbuja">${urgente ? ic("alertTriangle", "msj-icon msj-icon--sm") : ""}${esc(m.texto)}</p>` : ""}
        ${cuando}
      </div>
    </li>
  `;
}

// ---------- Después de dibujar ----------
function hidratar() {
  if (!ui.hidratar) return;
  ui.hidratar = false;
  const pantalla = document.querySelector(".msj-shell")?.dataset.msjScreen;
  if (!pantalla) return;
  if (pantalla === "chat" && ui.canal && !ui.errorChat) {
    const lista = mensajes.cached(ui.canal);
    const vistos = ui.vistos.get(ui.canal) || new Set();
    lista.forEach((m) => vistos.add(m.id));
    ui.vistos.set(ui.canal, vistos);
    ajustarAlto(document.getElementById("msj-texto"));
    abajo();
    cargarFotos();
    const texto = document.getElementById("msj-texto");
    if (texto && !texto.disabled && !document.activeElement?.closest?.(".msj-composer")) {
      texto.focus({ preventScroll: true });
      const fin = texto.value.length;
      texto.setSelectionRange(fin, fin);
    }
    return;
  }
  if (pantalla === "lista") refrescarResumen();
  const active = document.activeElement;
  if (!active || active === document.body) document.getElementById("msj-titulo")?.focus({ preventScroll: true });
}

function refrescarResumen() {
  if (ui.cargandoResumen || !session.token()) return;
  ui.cargandoResumen = true;
  mensajes.resumen()
    .then(() => {
      ui.errorResumen = "";
    })
    .catch((error) => {
      ui.errorResumen = error.status === 0 ? "Sin conexión: mostramos lo último guardado." : error.message || "No se pudieron traer los chats.";
    })
    .finally(() => {
      ui.cargandoResumen = false;
      actualizarLista();
    });
}

function actualizarLista() {
  const cont = document.getElementById("msj-canales");
  if (!cont || document.querySelector(".msj-shell")?.dataset.msjScreen !== "lista") return;
  const tmp = document.createElement("div");
  tmp.innerHTML = ListScreen();
  const nuevo = tmp.querySelector("#msj-canales");
  if (nuevo && nuevo.innerHTML !== cont.innerHTML) cont.innerHTML = nuevo.innerHTML;
}

function chatEl() {
  return document.getElementById("msj-chat");
}

function cercaDelFinal() {
  const el = chatEl();
  if (!el) return true;
  return el.scrollHeight - el.scrollTop - el.clientHeight < 140;
}

function abajo() {
  const el = chatEl();
  if (el) el.scrollTop = el.scrollHeight;
}

// Redibuja solo la lista de mensajes (el campo de texto y el foco no se tocan).
function actualizarChat(primeraVez = false) {
  const canal = ui.canal;
  const cont = document.getElementById("msj-lista");
  if (!canal || !cont || document.querySelector(".msj-shell")?.dataset.msjCanal !== canal) return;
  const estabaAbajo = primeraVez || cercaDelFinal();
  const lista = mensajes.cached(canal);
  const html = ListaItems(canal);
  if (cont.innerHTML !== html) cont.innerHTML = html;
  actualizarBanner();
  const vistos = ui.vistos.get(canal) || new Set();
  const nuevos = lista.filter((m) => !vistos.has(m.id));
  const me = yo().usuario;
  const deOtros = nuevos.filter((m) => m.autor !== me && !m.borrado);
  if (!primeraVez && ui.listo === canal && deOtros.length) {
    const ultimo = deOtros[deOtros.length - 1];
    anunciar(`Nuevo mensaje de ${ultimo.autorNombre || "Paseos Juan"}: ${ultimo.texto || (ultimo.adjuntoId ? "foto" : "")}`);
  }
  nuevos.forEach((m) => vistos.add(m.id));
  ui.vistos.set(canal, vistos);
  if (estabaAbajo || nuevos.some((m) => m.autor === me)) abajo();
  cargarFotos();
  if (deOtros.length) leer(canal);
}

// El aviso rojo de arriba del chat (solo se toca si cambió, para no repetirlo en el lector de pantalla).
function actualizarBanner() {
  const cont = document.getElementById("msj-urgente");
  if (!cont) return;
  const html = BannerUrgente();
  if (cont.innerHTML !== html) cont.innerHTML = html;
}

function anunciar(texto) {
  const live = document.getElementById("msj-live");
  if (!live) return;
  live.textContent = "";
  setTimeout(() => {
    live.textContent = texto;
  }, 60);
}

// Las fotos se bajan con la sesión (no quedan públicas) y se muestran como blob.
function cargarFotos() {
  document.querySelectorAll("[data-msj-foto]").forEach((el) => {
    const id = el.dataset.msjFoto;
    if (!ARCHIVO_OK.test(id)) return;
    const f = fotos.get(id);
    if (f?.url) {
      if (el.tagName !== "IMG") ponerFoto(id);
      return;
    }
    if (f && (f.cargando || Date.now() - f.at < 60 * 1000)) return;
    if (navigator.onLine === false || !session.token()) return;
    const entry = { url: "", cargando: true, error: false, at: Date.now() };
    fotos.set(id, entry);
    fetch(`/api/archivos?id=${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${session.token()}` } })
      .then((r) => (r.ok ? r.blob() : null))
      .then((blob) => {
        if (blob && /^image\//.test(blob.type)) entry.url = URL.createObjectURL(blob);
        else entry.error = true;
      })
      .catch(() => {
        entry.error = true;
      })
      .finally(() => {
        entry.cargando = false;
        entry.at = Date.now();
        ponerFoto(id);
      });
  });
}

function ponerFoto(id) {
  const f = fotos.get(id);
  document.querySelectorAll(`[data-msj-foto="${CSS.escape(id)}"]`).forEach((el) => {
    if (f?.url) {
      const estabaAbajo = cercaDelFinal();
      const img = document.createElement("img");
      img.src = f.url;
      img.alt = "";
      img.dataset.msjFoto = id;
      img.addEventListener("load", () => {
        if (estabaAbajo) abajo();
      }, { once: true });
      el.replaceWith(img);
    } else if (f?.error) {
      const texto = el.querySelector("span");
      if (texto) texto.textContent = "No se pudo ver la foto";
    }
  });
}

// ---------- Enviar ----------
function textoEl() {
  return document.getElementById("msj-texto");
}

function mostrarError(texto) {
  ui.errorEnvio = texto;
  const el = document.getElementById("msj-error");
  if (!el) return;
  el.hidden = !texto;
  const span = el.querySelector("span");
  if (span) span.textContent = texto;
}

function estadoEnviando() {
  const boton = document.querySelector("[data-msj-enviar]");
  if (!boton) return;
  boton.disabled = ui.enviando;
  boton.querySelector("span").textContent = ui.enviando ? "Enviando" : "Enviar";
  document.querySelectorAll("[data-msj-rapida]").forEach((b) => {
    b.disabled = ui.enviando;
  });
}

async function enviar(texto, { rapida = false } = {}) {
  const canal = ui.canal;
  const limpio = String(texto || "").trim();
  if (!canal || !limpio || ui.enviando) return;
  ui.enviando = true;
  mostrarError("");
  estadoEnviando();
  pararDictado();
  try {
    const urgente = esUrgente(limpio);
    // Sin señal no falla: queda guardado en el celular y se manda solo (E-058).
    const r = await mensajes.enviar(canal, limpio, { encolar: true, urgente });
    if (!rapida) {
      ui.borradores.delete(canal);
      const t = textoEl();
      if (t) {
        t.value = "";
        ajustarAlto(t);
      }
    }
    actualizarChat();
    abajo();
    if (r?.pendiente) {
      anunciar(urgente ? "Tu aviso urgente no salió. Llamá al supervisor o mandalo por WhatsApp." : "Sin señal: se manda solo cuando vuelva.");
    } else {
      mensajes.resumen().catch(() => {});
    }
  } catch (error) {
    const t = textoEl();
    // La respuesta rápida que no salió queda en el campo para reintentar con "Enviar".
    if (rapida && t && !t.value.trim()) {
      t.value = limpio;
      ui.borradores.set(canal, limpio);
      ajustarAlto(t);
    }
    mostrarError(error.status === 0 || navigator.onLine === false ? "Sin conexión: no se envió, probá de nuevo." : error.message || "No se envió. Probá de nuevo.");
  } finally {
    ui.enviando = false;
    estadoEnviando();
    textoEl()?.focus({ preventScroll: true });
  }
}

function ajustarAlto(t) {
  if (!t) return;
  t.style.height = "auto";
  t.style.height = `${Math.min(t.scrollHeight, 150)}px`;
}

// ---------- Dictado por voz (si el navegador lo tiene) ----------
function pararDictado() {
  if (!ui.dictado) return;
  try {
    ui.dictado.abort();
  } catch {
    // ya estaba cortado
  }
  ui.dictado = null;
  estadoDictado(false);
}

function estadoDictado(activo) {
  const b = document.querySelector("[data-msj-dictar]");
  if (!b) return;
  b.setAttribute("aria-pressed", String(activo));
  b.setAttribute("aria-label", activo ? "Dejar de dictar" : "Dictar con la voz");
  b.classList.toggle("is-activo", activo);
}

function dictar() {
  if (ui.dictado) {
    try {
      ui.dictado.stop();
    } catch {
      pararDictado();
    }
    return;
  }
  const Reconocimiento = window.SpeechRecognition || window.webkitSpeechRecognition;
  const t = textoEl();
  if (!Reconocimiento || !t) return;
  const rec = new Reconocimiento();
  rec.lang = "es-AR";
  rec.interimResults = true;
  rec.continuous = false;
  const base = t.value;
  const canal = ui.canal;
  rec.onresult = (event) => {
    const dicho = [...event.results].map((r) => r[0]?.transcript || "").join("").trim();
    const campo = textoEl();
    if (!campo || ui.canal !== canal) return;
    campo.value = base && dicho ? `${base.replace(/\s+$/, "")} ${dicho}` : base || dicho;
    ui.borradores.set(canal, campo.value);
    ajustarAlto(campo);
  };
  rec.onerror = (event) => {
    mostrarError(event.error === "not-allowed" || event.error === "service-not-allowed"
      ? "Permití el micrófono para dictar."
      : event.error === "no-speech" ? "No te escuchamos. Probá de nuevo." : "No se pudo dictar. Escribí el mensaje.");
  };
  rec.onend = () => {
    if (ui.dictado === rec) ui.dictado = null;
    estadoDictado(false);
    textoEl()?.focus({ preventScroll: true });
  };
  try {
    rec.start();
    ui.dictado = rec;
    mostrarError("");
    estadoDictado(true);
    anunciar("Escuchando. Hablá ahora.");
  } catch {
    mostrarError("No se pudo dictar. Escribí el mensaje.");
  }
}

// ---------- Directo nuevo ----------
function abrirPicker() {
  ui.picker = true;
  ui.errorContactos = "";
  render();
  document.getElementById("msj-titulo")?.focus({ preventScroll: true });
  if (ui.cargandoContactos) return;
  ui.cargandoContactos = true;
  mensajes.contactos()
    .then((lista) => {
      ui.contactos = lista;
    })
    .catch((error) => {
      ui.errorContactos = error.status === 0 ? "Sin conexión: no se pudo traer el equipo." : error.message || "No se pudo traer el equipo.";
    })
    .finally(() => {
      ui.cargandoContactos = false;
      if (ui.picker && enMensajes()) {
        const main = document.getElementById("msj-main");
        const tmp = document.createElement("div");
        tmp.innerHTML = PickerScreen();
        if (main) main.innerHTML = tmp.querySelector("#msj-main").innerHTML;
      }
    });
}

function elegirContacto(usuario) {
  const c = (ui.contactos || []).find((x) => x.usuario === usuario);
  const me = yo().usuario;
  if (!c || !me) return;
  const canal = canalDirecto(me, c.usuario);
  ui.directosNuevos.set(canal, { titulo: c.nombre, con: c });
  ui.picker = false;
  navigate(`/mensajes?c=${encodeURIComponent(canal)}`);
}

// ---------- Eventos ----------
export function registerMensajesEvents() {
  clickHandlers.push((event) => {
    if (!event.target.closest?.(".msj-shell")) return false;
    const rapida = event.target.closest("[data-msj-rapida]");
    if (rapida) {
      event.preventDefault();
      enviar(rapida.dataset.msjRapida, { rapida: true });
      return true;
    }
    if (event.target.closest("[data-msj-dictar]")) {
      event.preventDefault();
      dictar();
      return true;
    }
    const borrar = event.target.closest("[data-msj-borrar-pend]");
    if (borrar) {
      event.preventDefault();
      mensajes.borrarPendiente(borrar.dataset.msjBorrarPend);
      textoEl()?.focus({ preventScroll: true });
      return true;
    }
    const foto = event.target.closest("[data-msj-abrir-foto]");
    if (foto) {
      event.preventDefault();
      archivos.abrir(foto.dataset.msjAbrirFoto).catch((error) => mostrarError(error.message || "No se pudo abrir la foto."));
      return true;
    }
    if (event.target.closest("[data-msj-nuevo]")) {
      event.preventDefault();
      abrirPicker();
      return true;
    }
    if (event.target.closest("[data-msj-cerrar-picker]")) {
      event.preventDefault();
      ui.picker = false;
      render();
      document.querySelector("[data-msj-nuevo]")?.focus({ preventScroll: true });
      return true;
    }
    const contacto = event.target.closest("[data-msj-contacto]");
    if (contacto) {
      event.preventDefault();
      elegirContacto(contacto.dataset.msjContacto);
      return true;
    }
    if (event.target.closest("[data-msj-reintentar]")) {
      event.preventDefault();
      refrescarResumen();
      return true;
    }
    // Al volver a la lista desde el chat, se cierra el selector si quedó abierto.
    if (event.target.closest('.msj-back[href="/mensajes"]')) ui.picker = false;
    return false;
  });

  document.addEventListener("submit", (event) => {
    const form = event.target.closest?.("[data-msj-form]");
    if (!form) return;
    event.preventDefault();
    enviar(textoEl()?.value || "");
  });

  document.addEventListener("keydown", (event) => {
    if (!event.target.matches?.("[data-msj-input]")) return;
    // Enter manda; Shift + Enter hace un salto de línea.
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      enviar(event.target.value);
    }
  });

  document.addEventListener("input", (event) => {
    if (!event.target.matches?.("[data-msj-input]")) return;
    ui.borradores.set(ui.canal, event.target.value);
    ajustarAlto(event.target);
    if (ui.errorEnvio) mostrarError("");
  });

  onDataChange((col) => {
    if (col === "mensajes") {
      actualizarInsignias();
      actualizarLista();
      actualizarBanner();
      return;
    }
    if (col === "sesion" && !session.token()) {
      pararCanal();
      ui.canal = "";
      ui.contactos = null;
      ui.borradores.clear();
      ui.vistos.clear();
      return;
    }
    if (col === `mensajes:${ui.canal}`) actualizarChat();
  });

  // Al volver a la pestaña con el chat abierto, se marca como leído.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && ui.canal && document.querySelector(`[data-msj-canal]`)) leer(ui.canal);
  });
}
