// Página del cliente con datos reales (E-049).
//
// Se usa cuando el tutor entró con su enlace /c/<token> (sesión con rol "cliente").
// Muestra SOLO lo que el servidor le deja ver (docs/datos-compartidos.md, E-045):
//   - paseos y fotos de sus perros (sin ruta, notas ni equipo),
//   - su chat privado cliente_<id> (avisos automáticos y respuestas),
//   - la comunidad "clientes" con las reglas del servidor,
//   - el alias de pago (ajustes/pagos).
// No inventa datos: lo que falta dice "Pendiente de confirmar".
import { session, registros, mensajes, datosPago, archivos, onDataChange, hoyAR, PENDIENTE } from "../api/client.js";
import { BUSINESS_INFO, REAL_DOGS } from "../data/realData.js";
import { icon } from "../ui/shared.js";
import { isCalmMotion } from "../ui/accesibilidad.js";

const TZ = "America/Argentina/Buenos_Aires";
const SAFE_ID = /^[a-z0-9][a-z0-9_.:-]{0,100}$/i;
const COMUNIDAD = "clientes";
const PASO_AVISOS = 15;
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// ---------------------------------------------------------------------------
// Estado de la vista (sobrevive a los re-render globales)
// ---------------------------------------------------------------------------

const ui = {
  status: {},
  open: new Set(),
  avisosVisibles: PASO_AVISOS,
  marcadoHasta: "",
  ultimoAnunciado: "",
  cargado: new Set(),
  pago: { estado: "cargando", alias: "", instrucciones: "" },
  pagoPedido: false,
  reglasAbiertas: false,
};

// Consultas que se repiten mientras la página está abierta (se cortan al salir de /cliente).
const live = { stops: new Map(), guard: null };
// Fotos bajadas con la sesión (no quedan públicas): id → { url, loading, at }.
const blobs = new Map();

export function esClienteReal() {
  const user = session.user();
  return Boolean(user && user.rol === "cliente" && user.clienteId && session.token());
}

function canalPrivado(user = session.user()) {
  return `cliente_${user?.clienteId || ""}`;
}

function opcionesPaseos() {
  return { desde: hoyAR() };
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function waLink(message) {
  return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

function ddmmaaaa(isoDate) {
  const [y, m, d] = String(isoDate).split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
}

function diaSemana(isoDate) {
  const [y, m, d] = String(isoDate).split("-").map(Number);
  return DIAS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] || "";
}

function sumarDias(isoDate, n) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

function horaAR(date) {
  return new Intl.DateTimeFormat("es-AR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
}

// "Hoy · 09:45", "Ayer · 18:10" o "12/11/2026 · 10:40".
function cuando(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const fecha = hoyAR(date);
  const hoy = hoyAR();
  const dia = fecha === hoy ? "Hoy" : fecha === sumarDias(hoy, -1) ? "Ayer" : ddmmaaaa(fecha);
  return `${dia} · ${horaAR(date)}`;
}

function turnoTexto(turno) {
  return turno ? `turno ${String(turno).toLowerCase()}` : "";
}

function primerNombre(nombre) {
  return String(nombre || "").trim().split(/\s+/)[0] || "";
}

function listaNombres(items) {
  return items.length > 1 ? `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}` : items.join("");
}

// ---------------------------------------------------------------------------
// Datos
// ---------------------------------------------------------------------------

function ordenTurno(turno) {
  return /tarde/i.test(turno || "") ? 1 : 0;
}

function perrosDelCliente(user = session.user()) {
  const ids = (Array.isArray(user?.perros) ? user.perros : [])
    .map((p) => (typeof p === "string" ? p : p?.id))
    .filter(Boolean);
  const hoy = hoyAR();
  const paseos = registros.cached("paseos", opcionesPaseos());
  const fotos = registros.cached("fotos");
  const avisos = mensajes.cached(canalPrivado(user));
  return ids.map((id) => {
    const foto = fotos.find((f) => (f.perroId || f.id) === id);
    const propios = paseos.filter((p) => p.perroId === id && p.fecha >= hoy);
    // Primero el nombre de la planilla de perros; después lo que llegó con la foto o el paseo.
    const nombre = REAL_DOGS.find((dog) => dog.id === id)?.name
      || foto?.perroNombre
      || propios.find((p) => p.perroNombre)?.perroNombre
      || avisos.find((m) => m.perroId === id && m.perroNombre)?.perroNombre
      || "";
    const miniatura = typeof foto?.miniatura === "string" && foto.miniatura.startsWith("data:image/") ? foto.miniatura : "";
    const paseosHoy = propios.filter((p) => p.fecha === hoy).sort((a, b) => ordenTurno(a.turno) - ordenTurno(b.turno));
    const proximo = propios
      .filter((p) => p.fecha > hoy && p.estado !== "no-sale")
      .sort((a, b) => a.fecha.localeCompare(b.fecha) || ordenTurno(a.turno) - ordenTurno(b.turno))[0] || null;
    return { id, nombre, miniatura, paseosHoy, proximo };
  });
}

function nombrePerro(perro) {
  return perro.nombre || "Tu perro";
}

// Foto del paseo o de un aviso: se baja con la sesión y se muestra como blob.
function fotoUrl(id) {
  const fileId = String(id || "");
  if (!fileId || !SAFE_ID.test(fileId)) return "";
  const known = blobs.get(fileId);
  if (known?.url) return known.url;
  if (known && (known.loading || Date.now() - known.at < 60 * 1000)) return "";
  if (typeof navigator !== "undefined" && navigator.onLine === false) return "";
  if (!session.token()) return "";
  const entry = { url: "", loading: true, at: Date.now() };
  blobs.set(fileId, entry);
  fetch(`/api/archivos?id=${encodeURIComponent(fileId)}`, { headers: { Authorization: `Bearer ${session.token()}` } })
    .then((response) => (response.ok ? response.blob() : null))
    .then((blob) => {
      if (blob && /^image\//.test(blob.type)) {
        entry.url = URL.createObjectURL(blob);
        actualizar("hoy");
        actualizar("avisos");
      }
    })
    .catch(() => null)
    .finally(() => {
      entry.loading = false;
      entry.at = Date.now();
    });
  return "";
}

function leerPago() {
  if (ui.pagoPedido) return;
  ui.pagoPedido = true;
  datosPago.leer()
    .then((datos) => {
      ui.pago = { estado: "listo", alias: datos.pendiente ? "" : datos.alias, instrucciones: datos.instrucciones || "" };
    })
    .catch(() => {
      ui.pago = { ...ui.pago, estado: "error" };
    })
    .finally(() => actualizar("pago"));
}

// ---------------------------------------------------------------------------
// Consultas en vivo
// ---------------------------------------------------------------------------

function iniciarConsultas() {
  const user = session.user();
  if (!user?.clienteId) return;
  const canal = canalPrivado(user);
  const agregar = (key, start) => {
    if (!live.stops.has(key)) live.stops.set(key, start());
  };
  agregar(`paseos_${hoyAR()}`, () => registros.watch("paseos", opcionesPaseos()));
  agregar("fotos", () => registros.watch("fotos"));
  agregar(canal, () => mensajes.watch(canal));
  if (ui.open.has("clr-comunidad")) agregar(COMUNIDAD, () => mensajes.watch(COMUNIDAD));
  leerPago();
  if (!live.guard) live.guard = setInterval(revisarSiSigue, 5000);
}

function cortarComunidad() {
  live.stops.get(COMUNIDAD)?.();
  live.stops.delete(COMUNIDAD);
}

function cortarConsultas() {
  live.stops.forEach((stop) => stop());
  live.stops.clear();
  clearInterval(live.guard);
  live.guard = null;
  ui.pagoPedido = false;
}

// Si se salió de /cliente o se cerró la sesión, se dejan de pedir datos.
function revisarSiSigue() {
  if (!document.querySelector("[data-clr-root]") || !esClienteReal()) cortarConsultas();
}

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

export function clienteRealPage() {
  const user = session.user();
  iniciarConsultas();
  despuesDeDibujar();
  return `
    <div class="cl-page clr-page" data-clr-root>
      ${encabezado(user)}
      <section class="clr-hoy" aria-labelledby="clr-hoy-title">
        <h2 id="clr-hoy-title" class="clr-visually-hidden">Hoy</h2>
        <div data-clr-region="hoy">${hoyContenido()}</div>
        ${statusRegion("foto")}
      </section>
      ${accesos()}
      ${avisosSeccion()}
      <div class="cl-more-list" aria-label="Más opciones">
        ${panel("clr-pagar", "wallet", "Pagar", "Alias para transferir", `<div data-clr-region="pago">${pagoContenido()}</div>`)}
        ${panel("clr-comunidad", "users", "Comunidad", "Chat entre clientes", comunidadSeccion())}
        ${panel("clr-ausencia", "calendarCheck", "Avisar ausencia", "Un día que no sale", ausenciaSeccion())}
        ${panel("clr-carnet", "fileUp", "Carnet de vacunas", "Mandalo por WhatsApp", carnetSeccion())}
      </div>
      <p class="clr-salir-pie">
        <a class="cl-btn is-ghost" href="/salir" data-link>${icon("logOut", "cl-icon-sm")} Cerrar sesión</a>
      </p>
      <p class="clr-visually-hidden" role="status" aria-live="polite" data-clr-anuncio></p>
    </div>
  `;
}

function encabezado(user) {
  const hoy = hoyAR();
  const nombre = primerNombre(user?.nombre);
  return `
    <header class="clr-head">
      <div>
        <h1 class="clr-hola">${nombre ? `Hola, ${esc(nombre)}` : "Hola"}</h1>
        <p class="clr-fecha">${esc(diaSemana(hoy))} ${esc(ddmmaaaa(hoy))}</p>
      </div>
    </header>
  `;
}

function hoyContenido() {
  const perros = perrosDelCliente();
  if (!perros.length) {
    return `
      <article class="cl-card cl-today-main clr-perro">
        <p class="cl-eyebrow">Hoy</p>
        <p class="clr-perro-linea">Tu perro todavía no está cargado en tu cuenta: ${PENDIENTE}.</p>
        <a class="cl-btn is-secondary" href="${waLink("Hola, entré a mi página de Paseos Juan y no veo a mi perro.")}" target="_blank" rel="noreferrer">${icon("message", "cl-icon-sm")} Avisar por WhatsApp</a>
      </article>
    `;
  }
  return perros.map((perro) => tarjetaPerro(perro)).join("");
}

const ESTADOS = {
  pendiente: { chip: "Sale hoy", tono: "plan", paso: -1 },
  retirado: { chip: "Lo retiramos", tono: "run", paso: 0 },
  paseando: { chip: "Está paseando", tono: "run", paso: 1 },
  entregado: { chip: "Ya volvió", tono: "done", paso: 2 },
  "no-sale": { chip: "Hoy no sale", tono: "off", paso: -1 },
};

// Próximo paseo según el horario que asignó Juan al aprobar el alta (días y turno de la sesión).
function proximoSegunHorario(desdeManana) {
  const user = session.user() || {};
  const dias = Array.isArray(user.dias) ? user.dias.map((d) => String(d).toLowerCase()) : [];
  if (!dias.length) return null;
  const hoy = hoyAR();
  for (let i = desdeManana ? 1 : 0; i <= 7; i += 1) {
    const fecha = sumarDias(hoy, i);
    if (dias.includes(diaSemana(fecha).toLowerCase())) return { fecha, turno: user.turno || "", hora: user.hora || "" };
  }
  return null;
}

function tarjetaPerro(perro) {
  const nombre = nombrePerro(perro);
  const inicial = perro.nombre ? perro.nombre.charAt(0).toUpperCase() : "";
  const pendienteHoy = perro.paseosHoy.find((p) => (p.estado || "pendiente") === "pendiente");
  const proximo = pendienteHoy ? null : perro.proximo || proximoSegunHorario(perro.paseosHoy.length > 0);
  return `
    <article class="cl-card cl-today-main clr-perro" aria-labelledby="clr-perro-${esc(perro.id)}">
      <p class="cl-eyebrow">Hoy</p>
      <div class="clr-perro-top">
        ${perro.miniatura
          ? `<img class="clr-avatar" src="${esc(perro.miniatura)}" alt="Foto de ${esc(nombre)}" />`
          : `<span class="clr-avatar is-empty" aria-hidden="true">${inicial ? esc(inicial) : icon("pawPrint", "cl-icon")}</span>`}
        <h2 class="clr-perro-nombre" id="clr-perro-${esc(perro.id)}">${esc(nombre)}</h2>
      </div>
      ${perro.paseosHoy.length
        ? perro.paseosHoy.map((paseo) => paseoHoy(paseo, nombre, perro.paseosHoy.length > 1)).join("")
        : `<p class="clr-perro-linea">Todavía no hay novedades de hoy. Te avisamos acá cuando lo retiremos.</p>`}
      ${pendienteHoy ? "" : `
        <p class="clr-proximo">
          <span>${icon("calendarCheck", "cl-icon-sm")} Próximo paseo</span>
          <strong>${proximo ? `${esc(diaSemana(proximo.fecha))} ${esc(ddmmaaaa(proximo.fecha))}${proximo.turno ? ` · ${esc(turnoTexto(proximo.turno))}` : ""}${proximo.hora ? ` · ${esc(proximo.hora)}` : ""}` : PENDIENTE}</strong>
        </p>
      `}
    </article>
  `;
}

function paseoHoy(paseo, nombre, varios) {
  const estado = ESTADOS[paseo.estado] ? paseo.estado : "pendiente";
  const info = ESTADOS[estado];
  const turno = turnoTexto(paseo.turno);
  const chip = `${info.chip}${varios && turno ? ` · ${turno}` : ""}`;
  if (estado === "no-sale") {
    return `
      <div class="clr-paseo">
        <p class="clr-chip is-${info.tono}">${esc(chip)}</p>
        <p class="clr-perro-linea">Este turno ${esc(nombre)} no sale.</p>
      </div>
    `;
  }
  const pasos = [
    { label: "Retirado", hora: paseo.horaRetiro },
    { label: "Paseando", hora: paseo.horaPaseo },
    { label: "Entregado", hora: paseo.horaEntrega },
  ];
  const foto = paseo.fotoPaseoId ? fotoUrl(paseo.fotoPaseoId) : "";
  return `
    <div class="clr-paseo">
      <p class="clr-chip is-${info.tono}">${esc(chip)}</p>
      ${estado === "pendiente" ? `<p class="clr-perro-linea">Sale hoy${turno ? `, ${esc(turno)}` : ""}. Te avisamos acá cuando lo retiremos.</p>` : ""}
      <ol class="cl-steps clr-pasos" aria-label="Paseo de hoy${turno ? `, ${esc(turno)}` : ""}">
        ${pasos.map((paso, index) => {
          const hecho = index <= info.paso;
          const actual = index === info.paso && index < 2;
          return `
            <li class="${hecho ? "is-done" : ""} ${actual ? "is-current" : ""}" ${actual ? 'aria-current="step"' : ""}>
              <span class="cl-step-dot" aria-hidden="true"></span>
              <span>${paso.label}${hecho && paso.hora ? ` <b>${esc(paso.hora)}</b>` : hecho ? "" : '<span class="clr-visually-hidden"> (todavía no)</span>'}</span>
            </li>
          `;
        }).join("")}
      </ol>
      ${paseo.fotoPaseoId ? `
        <button type="button" class="clr-foto" data-clr-foto="${esc(paseo.fotoPaseoId)}">
          ${foto ? `<img src="${esc(foto)}" alt="Foto del paseo de ${esc(nombre)}" />` : `<span class="clr-foto-vacia">${icon("camera", "cl-icon")} Cargando la foto del paseo…</span>`}
          <span class="clr-foto-ver">${icon("eye", "cl-icon-sm")} Ver grande</span>
        </button>
      ` : ""}
    </div>
  `;
}

function accesos() {
  const items = [
    { go: "clr-avisos", iconName: "bell", label: "Avisos" },
    { go: "clr-pagar", iconName: "wallet", label: "Pagar" },
    { go: "clr-comunidad", iconName: "users", label: "Comunidad" },
    { go: "clr-ausencia", iconName: "calendarCheck", label: "Avisar ausencia" },
    { go: "clr-carnet", iconName: "fileUp", label: "Carnet de vacunas" },
  ];
  return `
    <nav class="cl-quick clr-quick" aria-label="Accesos rápidos">
      ${items.map((item) => `
        <button type="button" class="cl-quick-btn" data-clr-go="${item.go}">
          ${icon(item.iconName, "cl-icon")}
          <span>${item.label}</span>
        </button>
      `).join("")}
      <a class="cl-quick-btn is-whatsapp" href="${waLink("Hola, tengo una consulta sobre los paseos de mi perro.")}" target="_blank" rel="noreferrer">
        ${icon("message", "cl-icon")}
        <span>WhatsApp</span>
      </a>
    </nav>
  `;
}

function panel(id, iconName, label, sub, content) {
  return `
    <details class="cl-more" id="${id}" data-clr-panel="${id}" ${ui.open.has(id) ? "open" : ""}>
      <summary>
        <span class="cl-more-icon">${icon(iconName, "cl-icon")}</span>
        <span><strong>${label}</strong><small>${sub}</small></span>
        ${icon("chevronDown", "cl-icon-sm cl-chevron")}
      </summary>
      <div class="cl-more-body">${content}</div>
    </details>
  `;
}

function statusRegion(region) {
  const { text = "", error = false } = ui.status[region] || {};
  return `<p class="cl-status ${error ? "is-error" : ""}" role="status" aria-live="polite" data-clr-status="${region}">${esc(text)}</p>`;
}

function showStatus(region, text, error = false) {
  ui.status[region] = { text, error };
  const element = document.querySelector(`[data-clr-status="${region}"]`);
  if (element) {
    element.textContent = text;
    element.classList.toggle("is-error", error);
  }
}

// ---- Avisos (chat privado con Paseos Juan) ----

function avisosSeccion() {
  return `
    <section class="cl-card cl-section clr-avisos" id="clr-avisos" aria-labelledby="clr-avisos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${icon("bell", "cl-icon")}</span>
        <div>
          <h2 id="clr-avisos-title" class="cl-h2" tabindex="-1">Avisos</h2>
          <p>Te avisamos cuando lo retiramos, cuando pasea y cuando lo entregamos.</p>
        </div>
      </header>
      <form class="clr-compose" data-clr-form="avisos">
        <label for="clr-avisos-texto">Escribile a Paseos Juan</label>
        <textarea id="clr-avisos-texto" name="texto" rows="2" maxlength="1000" placeholder="Tu mensaje" required></textarea>
        <button type="submit" class="cl-btn">${icon("send", "cl-icon-sm")} Enviar</button>
        ${statusRegion("avisos")}
      </form>
      <div data-clr-region="avisos">${avisosLista()}</div>
    </section>
  `;
}

function autorDe(m, user) {
  if (m.autor === user?.usuario) return "Vos";
  if (m.autor === "sistema" || m.automatico) return "Paseos Juan";
  return m.autorNombre || "Paseos Juan";
}

function mensajeItem(m, user, { conFoto = true } = {}) {
  const mio = m.autor === user?.usuario;
  const auto = m.autor === "sistema" || m.automatico;
  const equipo = !mio && !auto && /^(admin|coordinador|supervisor|paseador|ayudante)$/.test(m.autorRol || "");
  const foto = conFoto && !m.borrado && m.adjuntoId ? fotoUrl(m.adjuntoId) : "";
  return `
    <li class="clr-msg ${mio ? "is-mine" : ""} ${auto ? "is-auto" : ""} ${equipo ? "is-team" : ""}">
      <p class="clr-msg-meta">
        <strong>${esc(autorDe(m, user))}</strong>
        <time datetime="${esc(m.creadoEn || "")}">${esc(cuando(m.creadoEn))}</time>
      </p>
      ${m.borrado
        ? `<p class="clr-msg-text is-deleted">Mensaje borrado por el admin</p>`
        : `<p class="clr-msg-text">${esc(m.texto || "")}</p>`}
      ${conFoto && !m.borrado && m.adjuntoId ? `
        <button type="button" class="clr-foto is-small" data-clr-foto="${esc(m.adjuntoId)}">
          ${foto ? `<img src="${esc(foto)}" alt="Foto${m.perroNombre ? ` de ${esc(m.perroNombre)}` : ""}" />` : `<span class="clr-foto-vacia">${icon("camera", "cl-icon")} Cargando foto…</span>`}
          <span class="clr-foto-ver">${icon("eye", "cl-icon-sm")} Ver grande</span>
        </button>
      ` : ""}
    </li>
  `;
}

function avisosLista() {
  const user = session.user();
  const canal = canalPrivado(user);
  const lista = mensajes.cached(canal).slice().reverse();
  if (!lista.length) {
    return ui.cargado.has(canal)
      ? `<p class="cl-empty clr-vacio">Todavía no hay avisos. Cuando retiremos a tu perro, te avisamos acá.</p>`
      : `<p class="cl-empty clr-vacio">Cargando avisos…</p>`;
  }
  const visibles = lista.slice(0, ui.avisosVisibles);
  return `
    <ol class="clr-msgs" aria-label="Avisos y mensajes, del más nuevo al más viejo">
      ${visibles.map((m) => mensajeItem(m, user)).join("")}
    </ol>
    ${lista.length > visibles.length ? `<button type="button" class="cl-btn is-ghost clr-mas" data-clr-mas>Ver avisos anteriores</button>` : ""}
  `;
}

// Marca el chat como leído cuando llega algo nuevo de Paseos Juan y la página está a la vista.
function marcarLeidoSiHaceFalta() {
  const user = session.user();
  const canal = canalPrivado(user);
  const ultimo = mensajes.cached(canal).filter((m) => m.autor !== user?.usuario).pop();
  if (!ultimo?.creadoEn || ultimo.creadoEn <= ui.marcadoHasta) return;
  if (ui.marcadoHasta && ultimo.id !== ui.ultimoAnunciado) {
    // Aviso nuevo mientras la página está abierta: se lee en voz alta para lectores de pantalla.
    const anuncio = document.querySelector("[data-clr-anuncio]");
    if (anuncio && !ultimo.borrado) anuncio.textContent = `Aviso nuevo: ${ultimo.texto || ""}`;
  }
  ui.ultimoAnunciado = ultimo.id;
  ui.marcadoHasta = ultimo.creadoEn;
  if (document.visibilityState === "visible") mensajes.marcarLeido(canal).catch(() => {});
}

// ---- Pagar ----

function pagoContenido() {
  const { estado, alias, instrucciones } = ui.pago;
  if (estado === "cargando") return `<p class="cl-empty">Cargando…</p>`;
  if (estado === "error" && !alias) {
    return `
      <p class="cl-warning">${icon("alertCircle", "cl-icon-sm")} No se pudo cargar el alias. Revisá la señal y volvé a entrar.</p>
    `;
  }
  return `
    <div class="cl-section clr-pago">
      <div class="clr-alias-box">
        <p class="cl-eyebrow">Alias para transferir</p>
        ${alias
          ? `<p class="clr-alias" id="clr-alias">${esc(alias)}</p>
             <button type="button" class="cl-btn clr-copiar" data-clr-copiar="${esc(alias)}">${icon("copy", "cl-icon-sm")} Copiar alias</button>`
          : `<p class="clr-alias is-pending">${PENDIENTE}</p>`}
        ${statusRegion("pago")}
      </div>
      ${instrucciones ? `<p class="clr-instrucciones">${esc(instrucciones)}</p>` : ""}
      <p class="clr-nota">${icon("checkCircle", "cl-icon-sm")} Juan confirma tu pago.</p>
      ${alias
        ? `<a class="cl-btn is-secondary" href="${waLink("Hola, te mando el comprobante de la transferencia de los paseos.")}" target="_blank" rel="noreferrer">${icon("message", "cl-icon-sm")} Mandá el comprobante por WhatsApp</a>`
        : `<a class="cl-btn is-secondary" href="${waLink("Hola, ¿me pasan el alias para pagar los paseos?")}" target="_blank" rel="noreferrer">${icon("message", "cl-icon-sm")} Pedí el alias por WhatsApp</a>`}
    </div>
  `;
}

// ---- Comunidad ----

function comunidadSeccion() {
  return `
    <div class="cl-section clr-comunidad">
      <div class="cl-community-board clr-board" data-clr-region="comunidad" tabindex="0" aria-label="Mensajes de la comunidad">${comunidadLista()}</div>
      <div data-clr-region="reglas">${reglasBloque()}</div>
      <form class="clr-compose" data-clr-form="comunidad">
        <label for="clr-comunidad-texto">Escribí en la comunidad</label>
        <textarea id="clr-comunidad-texto" name="texto" rows="2" maxlength="1000" placeholder="Tu mensaje para otros clientes" required></textarea>
        <button type="submit" class="cl-btn" data-clr-comunidad-enviar>${icon("send", "cl-icon-sm")} Publicar</button>
        ${statusRegion("comunidad")}
      </form>
    </div>
  `;
}

function comunidadLista() {
  const user = session.user();
  const lista = mensajes.cached(COMUNIDAD).slice(-60);
  if (!lista.length) {
    return ui.cargado.has(COMUNIDAD)
      ? `<p class="cl-empty clr-vacio">Todavía no hay mensajes. ¡Saludá a la comunidad!</p>`
      : `<p class="cl-empty clr-vacio">Cargando mensajes…</p>`;
  }
  return `<ol class="clr-msgs is-chat">${lista.map((m) => mensajeItem(m, user, { conFoto: false })).join("")}</ol>`;
}

function reglasBloque() {
  const { reglas, silenciadoHasta } = mensajes.infoComunidad();
  const hasta = silenciadoHasta ? new Date(silenciadoHasta) : null;
  const silenciado = hasta && hasta.getTime() > Date.now();
  return `
    ${Array.isArray(reglas) && reglas.length ? `
      <details class="clr-reglas" data-clr-reglas ${ui.reglasAbiertas ? "open" : ""}>
        <summary>${icon("shieldCheck", "cl-icon-sm")} Reglas de la comunidad ${icon("chevronDown", "cl-icon-sm cl-chevron")}</summary>
        <ul>${reglas.map((regla) => `<li>${esc(regla)}</li>`).join("")}</ul>
      </details>
    ` : ""}
    ${silenciado ? `<p class="cl-warning" data-clr-silenciado>${icon("alertCircle", "cl-icon-sm")} El admin te silenció hasta el ${esc(ddmmaaaa(hoyAR(hasta)))} a las ${esc(horaAR(hasta))}.</p>` : ""}
  `;
}

function estadoComposerComunidad() {
  const { silenciadoHasta } = mensajes.infoComunidad();
  const silenciado = silenciadoHasta && new Date(silenciadoHasta).getTime() > Date.now();
  document.querySelectorAll("[data-clr-form='comunidad'] textarea, [data-clr-form='comunidad'] button").forEach((el) => {
    el.disabled = Boolean(silenciado);
  });
}

// ---- Ausencia ----

function ausenciaSeccion() {
  const hoy = hoyAR();
  const perros = perrosDelCliente();
  return `
    <form class="cl-form clr-ausencia" data-clr-form="ausencia">
      ${perros.length > 1 ? `
        <label for="clr-ausencia-perro">Perro
          <select id="clr-ausencia-perro" name="perro">
            <option value="">Todos</option>
            ${perros.map((p) => `<option value="${esc(p.id)}">${esc(nombrePerro(p))}</option>`).join("")}
          </select>
        </label>
      ` : ""}
      <label for="clr-ausencia-fecha">Día que no sale
        <input id="clr-ausencia-fecha" name="fecha" type="date" min="${hoy}" max="${sumarDias(hoy, 90)}" value="${sumarDias(hoy, 1)}" required />
      </label>
      <label for="clr-ausencia-motivo"><span>Motivo <span class="cl-optional">(opcional)</span></span>
        <input id="clr-ausencia-motivo" name="motivo" type="text" maxlength="140" placeholder="Por ejemplo: viaje" />
      </label>
      <button type="submit" class="cl-btn">${icon("send", "cl-icon-sm")} Avisar a Paseos Juan</button>
      <p class="cl-fine">Le llega a Paseos Juan. La respuesta la ves en Avisos.</p>
      ${statusRegion("ausencia")}
    </form>
  `;
}

// ---- Carnet ----

function carnetSeccion() {
  return `
    <div class="cl-section clr-carnet">
      <p class="cl-lead">Mandanos una foto o un PDF del carnet. Lo revisamos antes de los paseos en grupo.</p>
      <a class="cl-btn" href="${waLink("Hola, te mando el carnet de vacunas de mi perro.")}" target="_blank" rel="noreferrer">${icon("message", "cl-icon-sm")} Mandá el carnet por WhatsApp</a>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Actualizar partes de la página (sin perder lo que se está escribiendo)
// ---------------------------------------------------------------------------

const REGIONES = {
  hoy: hoyContenido,
  avisos: avisosLista,
  comunidad: comunidadLista,
  reglas: reglasBloque,
  pago: pagoContenido,
};

function actualizar(region) {
  const root = document.querySelector("[data-clr-root]");
  if (!root) return;
  const element = root.querySelector(`[data-clr-region="${region}"]`);
  if (!element) return;
  const focoDentro = element.contains(document.activeElement) ? document.activeElement : null;
  const focoClave = focoDentro?.dataset?.clrFoto || (focoDentro?.matches?.("[data-clr-mas]") ? "mas" : "") || (focoDentro?.matches?.("[data-clr-copiar]") ? "copiar" : "") || (focoDentro?.matches?.("[data-clr-reglas] > summary") ? "reglas" : "");
  let pegadoAbajo = false;
  if (region === "comunidad") pegadoAbajo = element.scrollHeight - element.scrollTop - element.clientHeight < 40 || !element.dataset.clrListo;
  element.innerHTML = REGIONES[region]();
  if (region === "comunidad") {
    if (pegadoAbajo) element.scrollTop = element.scrollHeight;
    element.dataset.clrListo = "1";
  }
  if (region === "reglas") estadoComposerComunidad();
  if (focoClave) {
    const fijos = { mas: "[data-clr-mas]", copiar: "[data-clr-copiar]", reglas: "[data-clr-reglas] > summary" };
    const selector = fijos[focoClave] || `[data-clr-foto="${CSS.escape(focoClave)}"]`;
    element.querySelector(selector)?.focus({ preventScroll: true });
  }
}

function alCambiarDatos(col) {
  if (!document.querySelector("[data-clr-root]")) return;
  const canal = canalPrivado();
  if (col === "paseos" || col === "fotos") {
    ui.cargado.add(col);
    actualizar("hoy");
    return;
  }
  if (col === `mensajes:${canal}`) {
    ui.cargado.add(canal);
    actualizar("avisos");
    actualizar("hoy");
    marcarLeidoSiHaceFalta();
    return;
  }
  if (col === `mensajes:${COMUNIDAD}`) {
    ui.cargado.add(COMUNIDAD);
    actualizar("comunidad");
    actualizar("reglas");
  }
}

// Después de dibujar la página completa: la comunidad queda mostrando lo último.
function despuesDeDibujar() {
  requestAnimationFrame(() => {
    const board = document.querySelector("[data-clr-region='comunidad']");
    if (board) {
      board.scrollTop = board.scrollHeight;
      board.dataset.clrListo = "1";
    }
    estadoComposerComunidad();
  });
}

// ---------------------------------------------------------------------------
// Eventos
// ---------------------------------------------------------------------------

function irA(id) {
  const target = document.getElementById(id);
  if (!target) return;
  if (target.tagName === "DETAILS" && !target.open) {
    target.open = true;
    abrioPanel(id, true);
  }
  target.scrollIntoView({ behavior: isCalmMotion() ? "auto" : "smooth", block: "start" });
  const focusable = target.matches("details")
    ? target.querySelector("summary")
    : target.querySelector("[tabindex='-1']");
  focusable?.focus({ preventScroll: true });
}

function abrioPanel(id, abierto) {
  if (abierto) ui.open.add(id);
  else ui.open.delete(id);
  if (id === "clr-comunidad") {
    if (abierto) {
      if (!live.stops.has(COMUNIDAD)) live.stops.set(COMUNIDAD, mensajes.watch(COMUNIDAD));
      despuesDeDibujar();
    } else {
      cortarComunidad();
    }
  }
}

async function copiarAlias(alias) {
  let ok = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(alias);
      ok = true;
    }
  } catch {
    ok = false;
  }
  if (!ok) {
    // Respaldo para navegadores sin acceso al portapapeles.
    const area = document.createElement("textarea");
    area.value = alias;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      ok = document.execCommand("copy");
    } catch {
      ok = false;
    }
    area.remove();
  }
  showStatus("pago", ok ? "Alias copiado. Pegalo en tu banco o billetera." : "No se pudo copiar. Mantené apretado el alias para copiarlo.", !ok);
  if (!ok) {
    const el = document.getElementById("clr-alias");
    if (el) window.getSelection()?.selectAllChildren(el);
  }
}

function handleClick(event) {
  if (!event.target.closest("[data-clr-root]")) return false;

  const go = event.target.closest("[data-clr-go]");
  if (go) {
    irA(go.dataset.clrGo);
    return true;
  }

  const copiar = event.target.closest("[data-clr-copiar]");
  if (copiar) {
    copiarAlias(copiar.dataset.clrCopiar);
    return true;
  }

  const foto = event.target.closest("[data-clr-foto]");
  if (foto) {
    archivos.abrir(foto.dataset.clrFoto).catch((error) => {
      const region = foto.closest("[data-clr-region='avisos']") ? "avisos" : "foto";
      const msg = error?.message || "No se pudo abrir la foto.";
      showStatus(region, msg, true);
    });
    return true;
  }

  if (event.target.closest("[data-clr-mas]")) {
    ui.avisosVisibles += PASO_AVISOS;
    actualizar("avisos");
    return true;
  }

  return false;
}

function textoError(error) {
  if (error?.status === 0) return "No se envió. Revisá la señal.";
  return error?.message || "No se pudo enviar. Probá de nuevo.";
}

async function enviarDesde(form, canal, region, texto, opts, okTexto) {
  const boton = form.querySelector("button[type='submit']");
  if (boton) boton.disabled = true;
  showStatus(region, "Enviando…");
  try {
    await mensajes.enviar(canal, texto, opts);
    showStatus(region, okTexto);
    return true;
  } catch (error) {
    showStatus(region, textoError(error), true);
    return false;
  } finally {
    if (boton) boton.disabled = false;
    if (region === "comunidad") estadoComposerComunidad();
  }
}

async function handleSubmit(event) {
  const form = event.target.closest?.("[data-clr-form]");
  if (!form || !form.closest("[data-clr-root]")) return;
  event.preventDefault();
  const tipo = form.dataset.clrForm;
  const user = session.user();
  if (!user?.clienteId) return;

  if (tipo === "avisos" || tipo === "comunidad") {
    const area = form.querySelector("textarea");
    const texto = (area?.value || "").trim();
    if (!texto) {
      showStatus(tipo, "Escribí un mensaje.", true);
      area?.focus();
      return;
    }
    const canal = tipo === "avisos" ? canalPrivado(user) : COMUNIDAD;
    const ok = await enviarDesde(form, canal, tipo, texto, {}, tipo === "avisos" ? "Enviado. Te responden por acá." : "Publicado.");
    if (ok && area) area.value = "";
    if (ok) actualizar(tipo === "avisos" ? "avisos" : "comunidad");
    return;
  }

  if (tipo === "ausencia") {
    const fecha = form.querySelector("[name='fecha']")?.value || "";
    const motivo = (form.querySelector("[name='motivo']")?.value || "").trim();
    const perroId = form.querySelector("[name='perro']")?.value || "";
    const hoy = hoyAR();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || fecha < hoy) {
      showStatus("ausencia", "Elegí un día de hoy en adelante.", true);
      return;
    }
    const perros = perrosDelCliente(user);
    const elegidos = perroId ? perros.filter((p) => p.id === perroId) : perros;
    const nombres = elegidos.map((p) => p.nombre).filter(Boolean);
    const quien = nombres.length ? listaNombres(nombres) : perros.length > 1 ? "Mis perros" : "Mi perro";
    const verbo = elegidos.length > 1 ? "no salen" : "no sale";
    const texto = `Aviso de ausencia: ${quien} ${verbo} el ${diaSemana(fecha).toLowerCase()} ${ddmmaaaa(fecha)}.${motivo ? ` Motivo: ${motivo}.` : ""}`;
    const opts = elegidos.length === 1 ? { perroId: elegidos[0].id, perroNombre: elegidos[0].nombre || undefined } : {};
    const ok = await enviarDesde(form, canalPrivado(user), "ausencia", texto, opts, `Listo: avisamos que ${verbo} el ${ddmmaaaa(fecha)}. La respuesta la ves en Avisos.`);
    if (ok) {
      const motivoInput = form.querySelector("[name='motivo']");
      if (motivoInput) motivoInput.value = "";
      actualizar("avisos");
    }
  }
}

function handleToggle(event) {
  const details = event.target;
  if (!(details instanceof HTMLDetailsElement)) return;
  if (details.matches("[data-clr-reglas]")) {
    ui.reglasAbiertas = details.open;
    return;
  }
  if (!details.dataset.clrPanel) return;
  const id = details.dataset.clrPanel;
  if (details.open !== ui.open.has(id)) abrioPanel(id, details.open);
}

let registrado = false;

export function registerClienteRealEvents(clickHandlers) {
  if (registrado) return;
  registrado = true;
  clickHandlers.push(handleClick);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("toggle", handleToggle, true);
  onDataChange(alCambiarDatos);
}
