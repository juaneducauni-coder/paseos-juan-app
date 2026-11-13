// Vista del rol Admin (Juan Buitrago, fundador).
// Datos fijos: src/data/realData.js (BASE RUTAS, precios). Datos del día: servidor compartido
// (src/api/client.js): paseos, incidentes, checklists y pedidos. Usuarios: /api/usuarios.
// Lo que no está confirmado se rotula como "Pendiente de confirmar".
// Las marcas de "hecho" de las prioridades se guardan solo en este dispositivo.
import {
  PENDIENTE,
  DATA_UPDATED,
  BUSINESS_INFO,
  BUSINESS_FACTS,
  TEAM,
  ROLE_OWNERS,
  SHIFTS,
  WEEK_DAYS,
  REAL_DOGS,
  REAL_PLANS,
  REAL_SINGLE_WALK,
  MULTI_DOG_DISCOUNTS,
  CATEGORIES,
  formatPeso,
  goesOn,
} from "../data/realData.js";
import { icon, getStoredArray, actionClickHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";
import { session, registros, usuarios, onDataChange, hoyAR, ROLE_PAGES } from "../api/client.js";

const DONE_KEY = "paseosJuanAdmin_prioridadesHechas";
const OPEN_KEY = "paseosJuanAdmin_seccionesAbiertas";
const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SIZES = ["Pequeño", "Mediano", "Grande"];
const SHIFT_MORNING = SHIFTS.manana.label;
const SHIFT_AFTERNOON = SHIFTS.tarde.label;
const LIVE_COLS = ["paseos", "incidentes", "checklists", "pedidos"];

// Último mensaje de estado (se escribe en la región aria-live después de cada render).
let pendingStatus = "";

// Estado en memoria de la página (no se guarda en el dispositivo: puede tener un PIN recién creado).
const ui = {
  users: null, // lista de /api/usuarios (sin PIN)
  usersLoading: false,
  usersError: "",
  showCreate: false,
  resetFor: null, // usuario con el formulario de PIN abierto
  confirmOff: null, // usuario esperando confirmación para desactivar
  credential: null, // { tipo, usuario, nombre, pin } — se muestra una sola vez
  busy: false,
  openDogs: new Set(), // listas de perros abiertas en "El día en vivo"
  liveDay: null,
  liveError: "",
  msgs: { users: null, live: null },
};

// Lo que se va escribiendo en los formularios, para no perderlo si la página se vuelve a dibujar.
const drafts = { crear: { nombre: "", usuario: "", rol: "paseador", pin: "" }, reset: { pin: "" }, roles: {} };

/* ---------- Utilidades ---------- */

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function listJoin(items) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

const SHORT_DAYS = { Lunes: "Lun", Martes: "Mar", Miércoles: "Mié", Jueves: "Jue", Viernes: "Vie", Sábado: "Sáb", Domingo: "Dom" };

function daysText(days) {
  const ordered = WEEK_DAYS.filter((day) => days.includes(day));
  // Tramos seguidos: "Lun a Vie" en vez de "Lun, Mar, Mié, Jue, Vie".
  const indexes = ordered.map((day) => WEEK_DAYS.indexOf(day));
  const contiguous = indexes.length >= 3 && indexes.every((value, i) => i === 0 || value === indexes[i - 1] + 1);
  if (contiguous) return `${SHORT_DAYS[ordered[0]]} a ${SHORT_DAYS[ordered[ordered.length - 1]]}`;
  return ordered.map((day) => SHORT_DAYS[day]).join(", ");
}

function todayInfo() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("es-AR", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).formatToParts(now);
  const get = (type) => parts.find((part) => part.type === type)?.value || "";
  const weekday = get("weekday");
  const dayName = WEEK_DAYS.find((day) => day.toLowerCase() === weekday.toLowerCase()) || weekday;
  return { dayName, date: `${get("day")}/${get("month")}/${get("year")}` };
}

function readDone() {
  return getStoredArray(DONE_KEY);
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado): vale solo para esta visita.
  }
}

function openSections() {
  return new Set(getStoredArray(OPEN_KEY));
}

function timeAR(iso) {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}

function dateAR(iso) {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", { timeZone: TIME_ZONE, day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

function ymdToAR(ymd) {
  const [y, m, d] = String(ymd || "").split("-");
  return y && m && d ? `${d}/${m}/${y}` : "";
}

function currentUser() {
  return session.user() || { usuario: "", nombre: "", rol: "admin" };
}

function firstName(nombre) {
  return String(nombre || "").trim().split(/\s+/)[0] || "";
}

function isAdminPage() {
  return /^\/(dashboard\/)?admin\/?$/.test(window.location.pathname);
}

/* ---------- El día en vivo (datos compartidos) ---------- */

function liveOpts(col, hoy) {
  // Los pedidos nuevos pueden ser de días anteriores: se piden todos.
  return col === "pedidos" ? {} : { desde: hoy };
}

function shiftOf(record) {
  const turno = String(record.turno || "").toLowerCase();
  if (turno.startsWith("ma")) return "manana";
  if (turno.startsWith("ta")) return "tarde";
  if (/_manana$/.test(record.id || "")) return "manana";
  if (/_tarde$/.test(record.id || "")) return "tarde";
  return "otro";
}

function recordTime(record) {
  return record.hora || timeAR(record.creadoEn);
}

function liveData() {
  const hoy = hoyAR();
  const deHoy = (record) => (record.fecha || String(record.creadoEn || "").slice(0, 10)) === hoy;
  const newest = (a, b) => String(b.actualizadoEn || b.creadoEn || "").localeCompare(String(a.actualizadoEn || a.creadoEn || ""));
  const paseos = registros.cached("paseos", liveOpts("paseos", hoy)).filter(deHoy);
  const incidentes = registros.cached("incidentes", liveOpts("incidentes", hoy)).filter(deHoy)
    .sort((a, b) => String(b.creadoEn || "").localeCompare(String(a.creadoEn || "")));
  const checklists = registros.cached("checklists", liveOpts("checklists", hoy)).filter(deHoy).sort(newest);
  const pedidosNuevos = registros.cached("pedidos", liveOpts("pedidos", hoy))
    .filter((pedido) => (pedido.estado || "nuevo") === "nuevo")
    .sort((a, b) => String(b.creadoEn || "").localeCompare(String(a.creadoEn || "")));

  const shifts = ["manana", "tarde", "otro"].map((key) => {
    const rows = paseos.filter((record) => shiftOf(record) === key);
    const count = (...states) => rows.filter((record) => states.includes(record.estado || "pendiente")).length;
    return {
      key,
      rows,
      total: rows.length,
      noSale: count("no-sale"),
      salen: rows.length - count("no-sale"),
      retirados: count("retirado", "paseando", "entregado"),
      paseando: count("paseando"),
      entregados: count("entregado"),
      pendientes: count("pendiente"),
    };
  });
  return { hoy, paseos, incidentes, checklists, pedidosNuevos, shifts };
}

// Primera carga del día: se pide todo una vez (para poder mostrar errores) y después
// registros.watch lo refresca solo cada minuto con la pestaña visible.
function startLive() {
  const hoy = hoyAR();
  if (ui.liveDay === hoy) return;
  ui.liveDay = hoy;
  refreshLive(false).finally(() => {
    LIVE_COLS.forEach((col) => registros.watch(col, liveOpts(col, hoy)));
  });
}

async function refreshLive(manual) {
  const hoy = hoyAR();
  const results = await Promise.allSettled(LIVE_COLS.map((col) => registros.list(col, liveOpts(col, hoy))));
  const errors = [...new Set(results.filter((r) => r.status === "rejected").map((r) => r.reason?.message || "No se pudieron traer los datos."))];
  const before = ui.liveError;
  ui.liveError = errors.join(" ");
  if (ui.liveError) setMsg("live", `No se pudieron actualizar los datos del día: ${ui.liveError}`, true);
  else if (manual) setMsg("live", navigator.onLine === false ? "Sin conexión: se muestra lo último que llegó." : "Datos del día actualizados.");
  else if (before) setMsg("live", "Datos del día actualizados.");
  if (manual || before !== ui.liveError) rerender();
}

/* ---------- Usuarios y accesos ---------- */

const ROLE_LABELS = { admin: "Admin", coordinador: "Coordinador", supervisor: "Supervisor", paseador: "Paseador", marketing: "Marketing" };
const PAGE_LABELS = { admin: "Admin", coordinador: "Coordinación", supervisor: "Supervisor", paseador: "Paseador" };
// Qué datos ve y carga cada rol (api/_lib/permisos.js y docs/datos-compartidos.md), en una línea.
const ROLE_DATA = {
  admin: "ve y carga todo, y crea usuarios.",
  coordinador: "ve paseos, incidentes, rutas y cierres; carga pedidos, fichas, observaciones y pagos de apoyo. No ve checklists.",
  supervisor: "ve y carga paseos, checklists, incidentes, observaciones, rutas y cierres; ve fichas. No ve pedidos ni pagos.",
  paseador: "ve y carga paseos, checklists, incidentes y observaciones; ve las rutas. No ve pedidos, fichas ni pagos.",
  marketing: "ve y carga pedidos (incluye los del formulario web). Nada de la operación.",
};

function roleLine(rol) {
  const pages = (ROLE_PAGES[rol] || []).filter((page) => PAGE_LABELS[page]).map((page) => PAGE_LABELS[page]);
  const panels = pages.length ? `Paneles: ${listJoin(pages)}.` : "Todavía no tiene panel.";
  return `${panels} Datos: ${ROLE_DATA[rol] || PENDIENTE}`;
}

function loadUsers() {
  ui.usersLoading = true;
  return usuarios.list()
    .then((list) => {
      ui.users = list;
      ui.usersError = "";
    })
    .catch((error) => {
      ui.usersError = error.message || "No se pudo traer la lista de usuarios.";
      setMsg("users", ui.usersError, true);
    })
    .finally(() => {
      ui.usersLoading = false;
      rerender();
    });
}

// Mismas reglas que el servidor (api/_lib/auth.js), para avisar antes de enviar.
function normalizeUsuario(value) {
  return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function pinProblem(pin) {
  if (!/^\d{6,8}$/.test(pin)) return "El PIN tiene que tener entre 6 y 8 números.";
  if (/^(\d)\1+$/.test(pin) || "0123456789".includes(pin) || "9876543210".includes(pin)) return "Ese PIN es muy fácil de adivinar. Elegí otro.";
  return "";
}

function randomPin() {
  for (;;) {
    const values = crypto.getRandomValues(new Uint8Array(6));
    const pin = [...values].map((v) => String(v % 10)).join("");
    if (!pinProblem(pin)) return pin;
  }
}

function credentialText(credential) {
  const loginUrl = `${window.location.origin}/login`;
  if (credential.tipo === "alta") {
    return `Tu usuario de la app de Paseos Juan es ${credential.usuario} y tu PIN inicial es ${credential.pin}. Entrá en ${loginUrl} y cambialo desde 'Cambiar mi PIN'.`;
  }
  return `Tu PIN nuevo de la app de Paseos Juan es ${credential.pin} (tu usuario es ${credential.usuario}). Entrá en ${loginUrl} y cambialo desde 'Cambiar mi PIN'.`;
}

/* ---------- Mensajes y redibujo ---------- */

// Mensaje visible en una región aria-live. "fresh" = todavía no se anunció.
function setMsg(area, text, error = false) {
  ui.msgs[area] = text ? { text, error, fresh: true } : null;
}

function MsgRegion(area) {
  const msg = ui.msgs[area];
  return `<p class="adm-msg ${msg?.error ? "is-error" : ""}" role="status" aria-live="polite" data-adm-msg="${area}">${msg && !msg.fresh ? esc(msg.text) : ""}</p>`;
}

function flushMsgs() {
  Object.entries(ui.msgs).forEach(([area, msg]) => {
    if (!msg?.fresh) return;
    const region = document.querySelector(`[data-adm-msg="${area}"]`);
    if (!region) return;
    region.textContent = msg.text;
    msg.fresh = false;
  });
}

// Vuelve a dibujar sin perder el foco ni lo escrito (los borradores viven en "drafts").
function rerender() {
  if (!isAdminPage() || session.user()?.rol !== "admin") return;
  const active = document.activeElement;
  const id = active?.id;
  let selection = null;
  try {
    if (active && typeof active.selectionStart === "number") selection = [active.selectionStart, active.selectionEnd];
  } catch {
    selection = null;
  }
  render();
  if (!id) return;
  const again = document.getElementById(id);
  if (!again) return;
  again.focus({ preventScroll: true });
  if (selection) {
    try {
      again.setSelectionRange(...selection);
    } catch {
      // Algunos tipos de campo no permiten selección.
    }
  }
}

/* ---------- Cálculos con datos reales ---------- */

// Perros que hoy figuran en BASE RUTAS como activos.
function activeDogs() {
  return REAL_DOGS.filter((dog) => dog.status === "Activo" && dog.days.length > 0);
}

function weeklyLoad() {
  const dogs = activeDogs();
  const rows = WEEK_DAYS.map((day) => {
    const morning = dogs.filter((dog) => goesOn(dog, day, SHIFT_MORNING)).length;
    const afternoon = dogs.filter((dog) => goesOn(dog, day, SHIFT_AFTERNOON)).length;
    const distinct = dogs.filter((dog) => dog.days.includes(day)).length;
    return { day, morning, afternoon, total: morning + afternoon, distinct };
  });
  const maxShift = Math.max(1, ...rows.map((row) => Math.max(row.morning, row.afternoon)));
  const maxTotal = Math.max(...rows.map((row) => row.total));
  const busiest = rows.filter((row) => row.total === maxTotal && maxTotal > 0).map((row) => row.day);
  const weekTotal = rows.reduce((sum, row) => sum + row.total, 0);
  const twoShifts = dogs.filter((dog) => dog.shifts.length > 1);
  return { rows, maxShift, maxTotal, busiest, weekTotal, twoShifts };
}

// Pares de perros marcados "no juntar" que comparten día y turno en BASE RUTAS.
function safetyConflicts() {
  const dogs = activeDogs();
  const byName = new Map(REAL_DOGS.map((dog) => [dog.name, dog]));
  const conflicts = [];
  const missing = [];
  const notRouted = [];
  const seen = new Set();

  REAL_DOGS.forEach((dog) => {
    (dog.incompatibleWith || []).forEach((otherName) => {
      const key = [dog.name, otherName].sort().join("|");
      if (seen.has(key)) return;
      seen.add(key);
      const other = byName.get(otherName);
      if (!other) {
        missing.push({ dog: dog.name, other: otherName });
        return;
      }
      if (!dogs.includes(dog) || !dogs.includes(other)) {
        notRouted.push({ dog: dog.name, other: otherName, idle: dogs.includes(dog) ? other.name : dog.name });
        return;
      }
      [SHIFT_MORNING, SHIFT_AFTERNOON].forEach((shift) => {
        const days = WEEK_DAYS.filter((day) => goesOn(dog, day, shift) && goesOn(other, day, shift));
        if (days.length) conflicts.push({ a: dog.name, b: other.name, shift, days });
      });
    });
  });
  return { conflicts, missing, notRouted };
}

function safetyDogs() {
  return activeDogs().filter((dog) => dog.safety.some((note) => /bozal|no juntar/i.test(note)));
}

function reviewDogs() {
  return REAL_DOGS.filter((dog) => dog.review || dog.status !== "Activo");
}

function routeFor(shift) {
  return shift === SHIFT_MORNING ? SHIFTS.manana.route : SHIFTS.tarde.routes.join(" o ");
}

// Hasta 3 prioridades calculadas, en orden: incidente de hoy, seguridad, pedidos web nuevos,
// datos, evaluación.
function buildPriorities(live = liveData()) {
  const { conflicts } = safetyConflicts();
  const statusIssues = REAL_DOGS.filter((dog) => dog.status !== "Activo");
  const reviews = reviewDogs();
  const toEvaluate = safetyDogs().filter((dog) => dog.category === "SIN EVALUAR");
  const active = activeDogs();
  const unevaluated = active.filter((dog) => dog.category === "SIN EVALUAR");
  const priorities = [];

  if (live.incidentes.length) {
    const count = live.incidentes.length;
    const latest = live.incidentes[0];
    const dogs = [...new Set(live.incidentes.map((item) => item.perroNombre).filter(Boolean))];
    const who = latest.creadoPorNombre || "quien lo cargó";
    priorities.push({
      id: `incidentes-${live.hoy}-${count}`,
      tag: "Incidente de hoy",
      tone: "danger",
      title: count === 1
        ? `Hubo un incidente hoy${dogs.length ? ` con ${dogs[0]}` : ""}`
        : `Hubo ${count} incidentes hoy${dogs.length ? ` (${listJoin(dogs)})` : ""}`,
      detail: `${count > 1 ? "El último lo cargó" : "Lo cargó"} ${who}${recordTime(latest) ? ` a las ${recordTime(latest)}` : ""}. Riesgo: ${latest.riesgo || PENDIENTE}. Lesiones: ${latest.lesiones || PENDIENTE}.`,
      action: `Leé el incidente${dogs.length ? ` de ${listJoin(dogs)}` : ""} y hablá con ${who} antes de que termine el día.`,
      target: "adm-vivo",
      targetLabel: count === 1 ? "Ver el incidente" : "Ver los incidentes",
    });
  }

  if (conflicts.length) {
    const main = conflicts.map((c) => c.a).concat(conflicts.map((c) => c.b));
    const counts = main.reduce((acc, name) => ({ ...acc, [name]: (acc[name] || 0) + 1 }), {});
    const center = Object.keys(counts).sort((x, y) => counts[y] - counts[x])[0];
    const others = [...new Set(conflicts.flatMap((c) => [c.a, c.b]).filter((name) => name !== center))];
    const shifts = [...new Set(conflicts.map((c) => c.shift))];
    const routes = shifts.map(routeFor).join(" y ");
    priorities.push({
      id: "seguridad-cruces",
      tag: "Seguridad",
      tone: "danger",
      title: `${center} comparte turno con perros marcados “no juntar”`,
      detail: `Según BASE RUTAS, ${center} sale en el turno ${shifts.map((s) => s.toLowerCase()).join(" y ")} (ruta ${routes}) los mismos días que ${listJoin(others)}. Hay ${plural(conflicts.length, "cruce", "cruces")} en la semana.`,
      action: `Confirmá con Sebastián cómo se separa a ${center} de ${listJoin(others)} en la ruta ${routes}.`,
      target: "adm-seguridad",
      targetLabel: "Ver los cruces",
    });
  }

  if (live.pedidosNuevos.length) {
    const count = live.pedidosNuevos.length;
    const titleOf = (pedido) => pedido.titulo || pedido.tipo || "Pedido sin título";
    const titles = live.pedidosNuevos.slice(0, 3).map(titleOf);
    const oldest = titleOf(live.pedidosNuevos[count - 1]);
    priorities.push({
      id: `pedidos-${live.pedidosNuevos[0].id}-${count}`,
      tag: "Pedidos",
      tone: "info",
      title: `${plural(count, "pedido nuevo", "pedidos nuevos")} sin responder`,
      detail: `${listJoin(titles)}${count > 3 ? ` y ${plural(count - 3, "más", "más")}` : ""}. Llegan del formulario de la web o los carga el equipo.`,
      action: count === 1
        ? `Respondé el pedido “${oldest}”.`
        : `Respondé los ${count} pedidos nuevos, empezando por el más viejo: “${oldest}”.`,
      target: "adm-vivo",
      targetLabel: count === 1 ? "Ver el pedido" : "Ver los pedidos",
    });
  }

  if (reviews.length) {
    const names = statusIssues.map((dog) => dog.name);
    priorities.push({
      id: "datos-a-revisar",
      tag: "Datos",
      tone: "warning",
      title: `${plural(reviews.length, "perro tiene", "perros tienen")} datos a revisar`,
      detail: statusIssues.length
        ? `Primero el estado de ${listJoin(names)}: ${statusIssues.length === 1 ? "no está" : "no están"} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`
        : "Planes que no coinciden con los días, nombres distintos o duración a revisar.",
      action: statusIssues.length
        ? `Decidí el estado de ${listJoin(names)} y corregilo en la planilla.`
        : "Revisá la lista de datos a confirmar y corregí la planilla.",
      target: "adm-datos",
      targetLabel: "Ver la lista",
    });
  }

  if (unevaluated.length) {
    const first = toEvaluate.length ? toEvaluate : unevaluated.slice(0, 5);
    priorities.push({
      id: "evaluaciones",
      tag: "Evaluación",
      tone: "info",
      title: `${unevaluated.length} de ${active.length} perros en ruta siguen SIN EVALUAR`,
      detail: `Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${listJoin(first.map((dog) => dog.name))}.`,
      action: `Agendá la evaluación de ${listJoin(first.map((dog) => dog.name))}.`,
      target: "adm-seguridad",
      targetLabel: "Ver indicaciones de seguridad",
    });
  }

  return priorities.slice(0, 3);
}

function theoreticalBilling() {
  const dogs = activeDogs();
  const included = [];
  const excluded = [];
  dogs.forEach((dog) => {
    const plan = REAL_PLANS.find((item) => item.name === dog.plan);
    const price = plan?.prices[dog.size];
    if (price) included.push({ dog, plan, price });
    else excluded.push(dog);
  });
  const byPlan = REAL_PLANS.map((plan) => {
    const rows = included.filter((item) => item.plan.id === plan.id);
    return { plan, count: rows.length, subtotal: rows.reduce((sum, item) => sum + item.price, 0) };
  });
  const total = included.reduce((sum, item) => sum + item.price, 0);
  const excludedPlans = [...new Set(excluded.map((dog) => dog.plan))];
  return { included, excluded, excludedPlans, byPlan, total };
}

/* ---------- Componentes ---------- */

export function adminShell(content) {
  return `
    <div class="adm-shell">
      ${AdminHeader()}
      ${content}
    </div>
  `;
}

function AdminHeader() {
  return `
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${icon("lock", "adm-icon-sm")} ${esc(currentUser().nombre)} · ${esc(ROLE_LABELS[currentUser().rol] || currentUser().rol)}</span>
        <button class="adm-button adm-button--ghost" type="button" data-adm-a11y>
          ${icon("eye", "adm-icon-sm")}
          <span>Accesibilidad</span>
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-admin-logout>
          ${icon("logOut", "adm-icon-sm")}
          <span>Salir</span>
        </button>
      </div>
    </header>
  `;
}

export function adminDashboard() {
  startLive();
  if (ui.users === null && !ui.usersLoading && !ui.usersError) loadUsers();
  const live = liveData();
  const priorities = buildPriorities(live);
  const done = readDone();
  const open = openSections();
  // Los mensajes nuevos se escriben un instante después, para que el lector de pantalla los lea.
  setTimeout(flushMsgs, 60);

  return `
    <main class="adm-page" id="adm-main">
      ${TodayHero(priorities, done, live)}
      ${LivePanel(live)}
      ${SafetyPanel()}
      ${UsersPanel()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${icon("chevronDown", "adm-icon-sm")} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${icon("copy", "adm-icon-sm")} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${ReviewSection(open)}
        ${LoadSection(open)}
        ${FactsSection(open)}
        ${TeamSection(open)}
        ${PricesSection(open)}
        ${FinanceSection(open)}
      </div>
      ${SourcesFooter()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `;
}

function TodayHero(priorities, done, live) {
  const { dayName, date } = todayInfo();
  const dogs = activeDogs();
  const morning = dogs.filter((dog) => goesOn(dog, dayName, SHIFT_MORNING)).length;
  const afternoon = dogs.filter((dog) => goesOn(dog, dayName, SHIFT_AFTERNOON)).length;
  const next = priorities.find((priority) => !done.includes(priority.id));
  const todayLine = morning + afternoon
    ? `Según BASE RUTAS, hoy salen ${plural(morning, "perro", "perros")} a la mañana y ${plural(afternoon, "perro", "perros")} a la tarde.`
    : "Hoy no hay paseos cargados en BASE RUTAS.";
  const name = firstName(currentUser().nombre);

  return `
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${esc(dayName)} ${esc(date)}</p>
        <h1 id="adm-hero-title">Hola${name ? `, ${esc(name)}` : ""}</h1>
        <p class="adm-hero-sub">${todayLine}</p>
        ${live.incidentes.length ? `
          <p class="adm-hero-alert">${icon("alertTriangle", "adm-icon-sm")} ${plural(live.incidentes.length, "incidente cargado hoy", "incidentes cargados hoy")}. Está primero en tus prioridades.</p>
        ` : ""}
      </div>

      ${next ? `
        <div class="adm-next" aria-labelledby="adm-next-title">
          <p class="adm-next-label" id="adm-next-title">${icon("arrowRight", "adm-icon-sm")} Próximo paso</p>
          <p class="adm-next-text">${esc(next.action)}</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-done="${next.id}">
              ${icon("checkCircle", "adm-icon-sm")} Listo, ya lo hice
            </button>
            <button class="adm-button adm-button--ghost" type="button" data-adm-goto="${next.target}">
              ${esc(next.targetLabel)}
            </button>
          </div>
        </div>
      ` : `
        <div class="adm-next adm-next--done">
          <p class="adm-next-label">${icon("checkCircle", "adm-icon-sm")} Próximo paso</p>
          <p class="adm-next-text">Marcaste las prioridades como hechas. Abrí “Carga semanal” y revisá el día con más perros.</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-goto="adm-carga">Ver la carga semanal</button>
          </div>
        </div>
      `}

      <h2 class="adm-priorities-title">Tus ${priorities.length} prioridades</h2>
      <ol class="adm-priorities">
        ${priorities.map((priority, index) => {
          const isDone = done.includes(priority.id);
          return `
            <li class="adm-priority adm-priority--${priority.tone} ${isDone ? "is-done" : ""}">
              <span class="adm-priority-number" aria-hidden="true">${index + 1}</span>
              <div class="adm-priority-body">
                <p class="adm-tag adm-tag--${priority.tone}">${priority.tag}${isDone ? " · Hecho" : ""}</p>
                <h3>${esc(priority.title)}</h3>
                <p>${esc(priority.detail)}</p>
                <button class="adm-link-button" type="button" data-adm-done="${priority.id}" aria-pressed="${isDone}">
                  ${isDone ? "Desmarcar" : "Marcar como hecho"}
                </button>
              </div>
            </li>
          `;
        }).join("")}
      </ol>
      <p class="adm-note">Las marcas de “hecho” se guardan solo en este dispositivo.</p>
    </section>
  `;
}

/* ---------- El día en vivo ---------- */

const ESTADOS = {
  pendiente: { label: "Por retirar", tone: "neutral" },
  retirado: { label: "Retirado", tone: "info" },
  paseando: { label: "Paseando", tone: "info" },
  entregado: { label: "Entregado", tone: "ok" },
  "no-sale": { label: "No sale", tone: "warning" },
};

function plannedToday(shift) {
  const { dayName } = todayInfo();
  return activeDogs().filter((dog) => goesOn(dog, dayName, shift)).length;
}

// Nombre de un usuario a partir de la lista de usuarios (si ya llegó).
function nameOf(usuario) {
  return ui.users?.find((user) => user.usuario === usuario)?.nombre || usuario || "";
}

// "Cargado por Sebastián a las 10:15" (o "Actualizado por …" si lo tocó otra persona).
function byLine(record, onlyCreated = false) {
  if (!onlyCreated && record.actualizadoPor && record.actualizadoPor !== record.creadoPor) {
    const time = timeAR(record.actualizadoEn);
    return `Actualizado por ${nameOf(record.actualizadoPor)}${time ? ` a las ${time}` : ""}`;
  }
  const who = record.creadoPorNombre || nameOf(record.creadoPor);
  const time = timeAR(onlyCreated ? record.creadoEn : record.actualizadoEn || record.creadoEn);
  if (who) return `Cargado por ${who}${time ? ` a las ${time}` : ""}`;
  return time ? `Cargado a las ${time}` : "";
}

function ShiftCard(shift) {
  const info = {
    manana: { title: "Turno mañana", hours: `${SHIFTS.manana.from} a ${SHIFTS.manana.to}`, planned: plannedToday(SHIFT_MORNING) },
    tarde: { title: "Turno tarde", hours: `${SHIFTS.tarde.from} a ${SHIFTS.tarde.to}`, planned: plannedToday(SHIFT_AFTERNOON) },
    otro: { title: "Sin turno indicado", hours: "", planned: null },
  }[shift.key];
  if (shift.key === "otro" && !shift.total) return "";
  const ratio = shift.salen ? shift.entregados / shift.salen : 0;
  const openKey = `perros-${shift.key}`;

  return `
    <article class="adm-shift" aria-labelledby="adm-shift-${shift.key}">
      <h3 id="adm-shift-${shift.key}">${info.title}${info.hours ? ` <span class="adm-th-sub">${info.hours}</span>` : ""}</h3>
      ${shift.total ? `
        <p class="adm-shift-big"><strong>${shift.entregados}</strong> de ${plural(shift.salen, "perro entregado", "perros entregados")}</p>
        <span class="adm-progress" aria-hidden="true"><span style="--v:${ratio.toFixed(3)}"></span></span>
        <ul class="adm-shift-stats">
          <li><strong>${shift.retirados}</strong> retirados</li>
          <li><strong>${shift.paseando}</strong> paseando</li>
          <li><strong>${shift.pendientes}</strong> por retirar</li>
          ${shift.noSale ? `<li><strong>${shift.noSale}</strong> no ${shift.noSale === 1 ? "sale" : "salen"}</li>` : ""}
        </ul>
        <details class="adm-inner adm-dogs" data-adm-dogs="${openKey}" ${ui.openDogs.has(openKey) ? "open" : ""}>
          <summary>Ver los ${shift.total} perros</summary>
          <ul class="adm-dog-list">
            ${shift.rows.slice().sort((a, b) => String(a.perroNombre || "").localeCompare(String(b.perroNombre || ""))).map((record) => {
              const estado = ESTADOS[record.estado || "pendiente"] || { label: record.estado, tone: "neutral" };
              return `
                <li>
                  <span class="adm-dog-name">${esc(record.perroNombre || record.perroId || "Perro sin nombre")}</span>
                  <span class="adm-pill adm-pill--${estado.tone}">${esc(estado.label)}${record.pendiente ? " · sin enviar" : ""}</span>
                  <span class="adm-dog-meta">${esc(byLine(record))}${record.nota ? ` · Nota: ${esc(record.nota)}` : ""}</span>
                </li>
              `;
            }).join("")}
          </ul>
        </details>
      ` : `<p class="adm-empty">Todavía nadie cargó paseos de este turno.</p>`}
      ${info.planned !== null ? `<p class="adm-note">Previstos según BASE RUTAS: ${info.planned}.${shift.total ? " “Retirados” incluye a los que ya están paseando o entregados." : ""}</p>` : ""}
    </article>
  `;
}

function IncidentList(incidentes) {
  const fields = [
    ["perroNombre", "Perro"],
    ["lugar", "Lugar"],
    ["antes", "Antes"],
    ["conducta", "Qué pasó"],
    ["accion", "Qué se hizo"],
    ["despues", "Después"],
    ["lesiones", "Lesiones"],
    ["protocolo", "Protocolo"],
  ];
  return `
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${icon("alertTriangle", "adm-icon-sm")} ${plural(incidentes.length, "incidente hoy", "incidentes hoy")}</h3>
      <ul class="adm-incident-list">
        ${incidentes.map((item) => `
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${esc(item.titulo || item.perroNombre || "Incidente")}</strong>
              ${recordTime(item) ? `<span class="adm-muted">${esc(recordTime(item))} h</span>` : ""}
              ${item.riesgo ? `<span class="adm-pill adm-pill--danger">Riesgo: ${esc(item.riesgo)}</span>` : ""}
            </div>
            <dl class="adm-incident-facts">
              ${fields.filter(([key]) => item[key] && !(key === "perroNombre" && !item.titulo)).map(([key, label]) => `
                <div><dt>${label}</dt><dd>${esc(Array.isArray(item[key]) ? item[key].join(", ") : item[key])}</dd></div>
              `).join("")}
            </dl>
            ${byLine(item, true) ? `<p class="adm-note">${esc(byLine(item, true))}.</p>` : ""}
          </li>
        `).join("")}
      </ul>
    </div>
  `;
}

function checklistLine(record) {
  const items = record.items && typeof record.items === "object" ? Object.values(record.items) : [];
  const ok = items.filter(Boolean).length;
  const complete = record.completo === true || (items.length > 0 && ok === items.length);
  return { complete, text: items.length ? `${ok} de ${items.length} ítems` : "" };
}

function LivePanel(live) {
  const offline = navigator.onLine === false;
  const { checklists, pedidosNuevos } = live;

  return `
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${icon("radio", "adm-icon")}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${esc(ymdToAR(live.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${offline ? `<p class="adm-msg is-error">Sin conexión: ves lo último que llegó.</p>` : ""}
      ${MsgRegion("live")}

      ${live.incidentes.length ? IncidentList(live.incidentes) : `
        <p class="adm-live-ok">${icon("checkCircle", "adm-icon-sm")} Sin incidentes cargados hoy.</p>
      `}

      <div class="adm-live-grid">
        ${live.shifts.map(ShiftCard).join("")}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${checklists.length ? `
            <ul class="adm-mini-list">
              ${checklists.map((record) => {
                const line = checklistLine(record);
                return `
                  <li>
                    <span><strong>${esc(record.creadoPorNombre || record.creadoPor || "Sin nombre")}</strong> · ${esc(record.turno || "Turno sin indicar")}</span>
                    <span class="adm-pill ${line.complete ? "adm-pill--ok" : "adm-pill--warning"}">${line.complete ? "Completo" : "Incompleto"}${line.text ? ` · ${line.text}` : ""}</span>
                  </li>
                `;
              }).join("")}
            </ul>
          ` : `<p class="adm-empty">Nadie cargó el checklist hoy.</p>`}
        </article>

        <article class="adm-shift" aria-labelledby="adm-live-pedidos">
          <h3 id="adm-live-pedidos">Pedidos nuevos <span class="adm-count">${pedidosNuevos.length}</span></h3>
          ${pedidosNuevos.length ? `
            <ul class="adm-mini-list">
              ${pedidosNuevos.slice(0, 6).map((pedido) => `
                <li>
                  <span><strong>${esc(pedido.titulo || pedido.tipo || "Pedido sin título")}</strong></span>
                  <span class="adm-dog-meta">${esc(ymdToAR(pedido.fecha) || dateAR(pedido.creadoEn))} · ${pedido.origen === "web" ? "Formulario web" : esc(pedido.creadoPorNombre || "Cargado en la app")}</span>
                </li>
              `).join("")}
            </ul>
            ${pedidosNuevos.length > 6 ? `<p class="adm-note">Y ${plural(pedidosNuevos.length - 6, "pedido más", "pedidos más")}.</p>` : ""}
          ` : `<p class="adm-empty">No hay pedidos nuevos.</p>`}
        </article>
      </div>
    </section>
  `;
}

/* ---------- Usuarios y accesos ---------- */

function roleOptions(selected) {
  return Object.entries(ROLE_LABELS).map(([value, label]) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`).join("");
}

function CredentialBox() {
  const cred = ui.credential;
  if (!cred) return "";
  const text = credentialText(cred);
  return `
    <div class="adm-cred" id="adm-cred" tabindex="-1" role="region" aria-labelledby="adm-cred-title">
      <p class="adm-tag adm-tag--warning">Solo se muestra ahora</p>
      <h3 id="adm-cred-title">${cred.tipo === "alta" ? `Usuario creado: ${esc(cred.nombre)}` : `PIN nuevo de ${esc(cred.nombre)}`}</h3>
      <p>Copiá este mensaje y mandáselo por WhatsApp:</p>
      <p class="adm-cred-text">${esc(text)}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="button" data-adm-cred-copy>${icon("copy", "adm-icon-sm")} Copiar mensaje</button>
        <a class="adm-button adm-button--ghost" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener noreferrer">${icon("message", "adm-icon-sm")} Abrir WhatsApp</a>
        <button class="adm-button adm-button--ghost" type="button" data-adm-cred-hide>Listo, ya lo mandé</button>
      </div>
      <p class="adm-note">Este PIN no queda guardado en la página: cuando tocás “Listo” desaparece. Si se pierde, resetealo.</p>
    </div>
  `;
}

function CreateForm() {
  const d = drafts.crear;
  const team = listJoin(TEAM.map((person) => person.name));
  return `
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${esc(team)}. Si vas a sumar a otra persona, confirmalo antes.</p>
      <div class="adm-form-grid">
        <label class="adm-field" for="adm-crear-nombre">
          <span>Nombre</span>
          <input class="adm-input" id="adm-crear-nombre" name="nombre" autocomplete="off" maxlength="60" required placeholder="Ej. Sebastián" value="${esc(d.nombre)}" data-adm-draft="crear" data-adm-key="nombre" />
        </label>
        <label class="adm-field" for="adm-crear-usuario">
          <span>Usuario <small>para entrar, sin espacios</small></span>
          <input class="adm-input" id="adm-crear-usuario" name="usuario" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="31" required placeholder="Ej. sebastian" value="${esc(d.usuario)}" data-adm-draft="crear" data-adm-key="usuario" />
        </label>
        <label class="adm-field" for="adm-crear-rol">
          <span>Rol</span>
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${roleOptions(d.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${esc(d.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${esc(ROLE_LABELS[d.rol] || d.rol)}:</strong> ${esc(roleLine(d.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${icon("userPlus", "adm-icon-sm")} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `;
}

function ResetForm(user) {
  const reactivar = !user.activo;
  return `
    <form class="adm-form adm-form--inline" data-adm-form="reset" data-adm-usuario="${esc(user.usuario)}" novalidate aria-labelledby="adm-reset-title">
      <p id="adm-reset-title"><strong>${reactivar ? "Reactivar" : "Resetear el PIN de"} ${esc(user.nombre)}.</strong> ${reactivar ? "Va a poder entrar de nuevo con este PIN." : "Se cierra su sesión en todos lados y entra con el PIN nuevo."}</p>
      <label for="adm-reset-pin"><span>PIN nuevo <small>6 a 8 números</small></span></label>
      <div class="adm-pin-row">
        <input class="adm-input" id="adm-reset-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${esc(drafts.reset.pin)}" data-adm-draft="reset" data-adm-key="pin" />
        <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="reset">Generar</button>
      </div>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${reactivar ? "Reactivar" : "Guardar PIN nuevo"}</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-reset-cancel>Cancelar</button>
      </div>
    </form>
  `;
}

function ConfirmOff(user) {
  return `
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${esc(user.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${esc(user.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `;
}

function UserRow(user, me) {
  const isMe = user.usuario === me;
  const roleDraft = drafts.roles[user.usuario] || user.rol;
  const lastLogin = user.ultimoIngreso ? `Último ingreso: ${dateAR(user.ultimoIngreso)} ${timeAR(user.ultimoIngreso)}` : "Todavía no ingresó";
  const created = user.creadoEn ? ` · Creado el ${dateAR(user.creadoEn)}` : "";
  const safeId = String(user.usuario).replace(/[^a-z0-9_-]/gi, "_");

  return `
    <li class="adm-user-row ${user.activo ? "" : "is-off"}">
      <div class="adm-user-head">
        <strong>${esc(user.nombre)}</strong>
        <span class="adm-muted">usuario: ${esc(user.usuario)}</span>
        <span class="adm-pill adm-pill--neutral">${esc(ROLE_LABELS[user.rol] || user.rol)}</span>
        ${user.activo ? "" : `<span class="adm-pill adm-pill--warning">Desactivado</span>`}
        ${isMe ? `<span class="adm-pill adm-pill--ok">Sos vos</span>` : ""}
      </div>
      <p class="adm-user-meta">${esc(lastLogin)}${esc(created)}</p>
      ${isMe ? `
        <p class="adm-note">Tu PIN lo cambiás en <a class="adm-inline-link" href="/login" data-link>Cambiar mi PIN</a>. No podés cambiar tu propio rol ni desactivarte.</p>
      ` : user.activo ? `
        <div class="adm-user-actions">
          <div class="adm-role-change">
            <label for="adm-rol-${safeId}">Rol</label>
            <select class="adm-input adm-input--sm" id="adm-rol-${safeId}" data-adm-draft="roles" data-adm-key="${esc(user.usuario)}">${roleOptions(roleDraft)}</select>
            <button class="adm-button adm-button--ghost" type="button" data-adm-role-save="${esc(user.usuario)}">Cambiar rol</button>
          </div>
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${esc(user.usuario)}" aria-expanded="${ui.resetFor === user.usuario}">Resetear PIN</button>
          <button class="adm-button adm-button--ghost adm-button--danger-ghost" type="button" data-adm-off="${esc(user.usuario)}">Desactivar</button>
        </div>
      ` : `
        <div class="adm-user-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${esc(user.usuario)}" aria-expanded="${ui.resetFor === user.usuario}">Reactivar con PIN nuevo</button>
        </div>
      `}
      ${!isMe && ui.resetFor === user.usuario ? ResetForm(user) : ""}
      ${!isMe && ui.confirmOff === user.usuario ? ConfirmOff(user) : ""}
    </li>
  `;
}

function UsersPanel() {
  const me = currentUser().usuario;
  const list = (ui.users || []).slice().sort((a, b) => (b.activo === true) - (a.activo === true) || String(a.nombre).localeCompare(String(b.nombre)));
  const activeCount = list.filter((user) => user.activo).length;

  let body;
  if (ui.users === null && ui.usersLoading) body = `<p class="adm-empty">Cargando usuarios…</p>`;
  else if (ui.users === null) body = `<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`;
  else if (!list.length) body = `<p class="adm-empty">Todavía no hay usuarios.</p>`;
  else body = `<ul class="adm-user-list">${list.map((user) => UserRow(user, me)).join("")}</ul>`;

  return `
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${icon("users", "adm-icon")}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${ui.users ? `${plural(activeCount, "usuario activo", "usuarios activos")}. ` : ""}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${CredentialBox()}

      <div class="adm-form-actions">
        <button class="adm-button ${ui.showCreate ? "adm-button--ghost" : "adm-button--primary"}" type="button" data-adm-create-toggle aria-expanded="${ui.showCreate}" aria-controls="adm-create">
          ${icon(ui.showCreate ? "x" : "userPlus", "adm-icon-sm")} ${ui.showCreate ? "Cerrar el formulario" : "Crear usuario"}
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${ui.showCreate ? CreateForm() : ""}
      ${MsgRegion("users")}
      ${body}

      <h3 class="adm-subtitle">Qué puede ver cada rol</h3>
      <ul class="adm-role-help">
        ${Object.keys(ROLE_LABELS).map((rol) => `<li><strong>${ROLE_LABELS[rol]}:</strong> ${esc(roleLine(rol))}</li>`).join("")}
      </ul>
    </section>
  `;
}

function SafetyPanel() {
  const { conflicts, missing, notRouted } = safetyConflicts();
  const dogs = safetyDogs();

  return `
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${icon("alertTriangle", "adm-icon")}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${DATA_UPDATED}).</p>
        </div>
      </header>

      ${conflicts.length ? `
        <div class="adm-table-wrap">
          <table class="adm-table adm-table--safety">
            <caption>Perros marcados “no juntar” que comparten turno</caption>
            <thead>
              <tr><th scope="col">Perros</th><th scope="col">Turno y ruta</th><th scope="col">Días</th></tr>
            </thead>
            <tbody>
              ${conflicts.map((c) => `
                <tr>
                  <th scope="row">
                    ${esc(c.a)} y ${esc(c.b)}
                    ${[c.a, c.b].filter((name) => /día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(REAL_DOGS.find((dog) => dog.name === name)?.review || "")).map((name) => `<span class="adm-row-note">Días de ${esc(name)}: dato a revisar</span>`).join("")}
                  </th>
                  <td>${esc(c.shift)} · ${esc(routeFor(c.shift))}</td>
                  <td>${esc(daysText(c.days))}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      ` : `<p class="adm-empty">No hay perros “no juntar” que compartan turno en BASE RUTAS.</p>`}

      <ul class="adm-safety-list" aria-label="Indicaciones de seguridad por perro">
        ${dogs.map((dog) => `
          <li>
            <strong>${esc(dog.name)}</strong>
            <span class="adm-safety-meta">${esc(dog.shifts.join(" y "))} · ${esc(daysText(dog.days))}</span>
            <span class="adm-safety-notes">${dog.safety.map((note) => `<span class="adm-pill adm-pill--danger">${esc(note)}</span>`).join("")}</span>
          </li>
        `).join("")}
      </ul>

      ${missing.length || notRouted.length ? `
        <ul class="adm-footnotes">
          ${missing.map((m) => `<li>${esc(m.dog)} figura “no juntar con ${esc(m.other)}”, pero ${esc(m.other)} no está en el registro: ${PENDIENTE}.</li>`).join("")}
          ${notRouted.map((n) => `<li>${esc(n.dog)} y ${esc(n.other)} figuran “no juntar”. Hoy ${esc(n.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join("")}
        </ul>
      ` : ""}
    </section>
  `;
}

function Section(id, open, { title, summary, iconName }, body) {
  return `
    <details class="adm-section" id="${id}" data-adm-section="${id}" ${open.has(id) ? "open" : ""}>
      <summary>
        <span class="adm-section-icon">${icon(iconName, "adm-icon")}</span>
        <span class="adm-section-title">
          <span class="adm-section-name">${title}</span>
          <span class="adm-section-summary">${summary}</span>
        </span>
        <span class="adm-chevron">${icon("chevronDown", "adm-icon-sm")}</span>
      </summary>
      <div class="adm-section-body">
        ${body}
      </div>
    </details>
  `;
}

function ReviewSection(open) {
  const dogs = reviewDogs().sort((a, b) => (a.status === "Activo") - (b.status === "Activo"));
  const statusCount = dogs.filter((dog) => dog.status !== "Activo").length;

  return Section("adm-datos", open, {
    title: "Datos a revisar",
    summary: `${plural(dogs.length, "perro", "perros")} · ${plural(statusCount, "con estado a definir", "con estado a definir")}`,
    iconName: "clipboardCheck",
  }, `
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${esc(BUSINESS_INFO.officialSources.dogs)}).</p>
    <ul class="adm-review-list">
      ${dogs.map((dog) => `
        <li class="${dog.status !== "Activo" ? "is-status" : ""}">
          <div class="adm-review-head">
            <strong>${esc(dog.name)}</strong>
            <span class="adm-muted">${esc(dog.id)} · ${esc(dog.plan)}</span>
            <span class="adm-pill ${dog.status === "Activo" ? "adm-pill--neutral" : "adm-pill--warning"}">${esc(dog.status)}</span>
          </div>
          <p>${esc(dog.review || PENDIENTE)}</p>
        </li>
      `).join("")}
    </ul>
  `);
}

function LoadSection(open) {
  const load = weeklyLoad();
  const busiestText = load.busiest.length ? listJoin(load.busiest) : "Sin datos";

  return Section("adm-carga", open, {
    title: "Carga semanal",
    summary: `Más carga: ${esc(busiestText)} (${plural(load.maxTotal, "salida", "salidas")})`,
    iconName: "chart",
  }, `
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${DATA_UPDATED}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-load">
        <caption class="adm-sr-only">Perros por día y turno</caption>
        <thead>
          <tr>
            <th scope="col">Día</th>
            <th scope="col">Mañana <span class="adm-th-sub">${SHIFTS.manana.from} a ${SHIFTS.manana.to}</span></th>
            <th scope="col">Tarde <span class="adm-th-sub">${SHIFTS.tarde.from} a ${SHIFTS.tarde.to}</span></th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          ${load.rows.map((row) => {
            const isBusiest = load.busiest.includes(row.day);
            return `
              <tr class="${isBusiest ? "is-busiest" : ""}">
                <th scope="row">
                  <span class="adm-day-full">${row.day}</span><span class="adm-day-short" aria-hidden="true">${SHORT_DAYS[row.day]}</span>
                  ${isBusiest ? `<span class="adm-busiest">Más carga</span>` : ""}
                </th>
                ${[row.morning, row.afternoon].map((value, i) => `
                  <td>
                    <span class="adm-bar-cell">
                      <span class="adm-bar ${i ? "adm-bar--tarde" : ""}" style="--v:${(value / load.maxShift).toFixed(3)}" aria-hidden="true"></span>
                      <span class="adm-bar-value">${value}</span>
                    </span>
                  </td>
                `).join("")}
                <td class="adm-total">${row.total ? row.total : "—"}</td>
              </tr>
            `;
          }).join("")}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Semana</th>
            <td>${load.rows.reduce((s, r) => s + r.morning, 0)}</td>
            <td>${load.rows.reduce((s, r) => s + r.afternoon, 0)}</td>
            <td class="adm-total">${load.weekTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <ul class="adm-footnotes">
      <li>“Total” suma las salidas del día. ${listJoin(load.twoShifts.map((dog) => dog.name))} ${load.twoShifts.length === 1 ? "sale" : "salen"} en los dos turnos, por eso cuentan dos veces.</li>
      <li>Mañana: ruta ${SHIFTS.manana.route}, supervisa ${SHIFTS.manana.supervisor}. Tarde: rutas ${SHIFTS.tarde.routes.join(" y ")}, supervisa ${SHIFTS.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${esc(BUSINESS_FACTS.find((f) => /máximo/i.test(f.label))?.value || PENDIENTE)} perros (dato histórico).</li>
    </ul>
  `);
}

function kindClass(kind) {
  if (/meta/i.test(kind)) return "meta";
  if (/hist/i.test(kind)) return "historico";
  if (/calc/i.test(kind)) return "calculado";
  return "dato";
}

function FactsSection(open) {
  const active = activeDogs();
  const load = weeklyLoad();
  const unevaluated = active.filter((dog) => dog.category === "SIN EVALUAR").length;
  const computed = [
    { label: "Perros con ruta activa", value: String(active.length), source: `Calculado de BASE RUTAS, ${DATA_UPDATED}`, kind: "Calculado" },
    { label: "Salidas por semana", value: String(load.weekTotal), source: `Calculado de BASE RUTAS, ${DATA_UPDATED}`, kind: "Calculado" },
    { label: "Perros evaluados", value: `${active.length - unevaluated} de ${active.length}`, source: "Registro maestro, 14/08/2026", kind: "Dato" },
  ];
  const facts = [...BUSINESS_FACTS, ...computed];

  return Section("adm-indicadores", open, {
    title: "Indicadores del negocio",
    summary: `${facts.length} indicadores, cada uno con su fuente`,
    iconName: "activity",
  }, `
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${facts.map((fact) => `
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${kindClass(fact.kind)}">${esc(fact.kind)}</span>
          <strong class="adm-fact-value">${esc(fact.value)}</strong>
          <span class="adm-fact-label">${esc(fact.label)}</span>
          <span class="adm-fact-source">Fuente: ${esc(fact.source)}</span>
        </li>
      `).join("")}
    </ul>
    <details class="adm-inner">
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(CATEGORIES).map(([name, text]) => `
          <div><dt><span class="adm-cat adm-cat--${name.toLowerCase().replace(/\s+/g, "-")}">${name}</span></dt><dd>${esc(text)}</dd></div>
        `).join("")}
      </dl>
    </details>
  `);
}

const ROLE_PANELS = {
  admin: { panel: "Admin", path: "/admin" },
  paseador: { panel: "Paseador", path: "/paseador" },
  supervisor: { panel: "Supervisor", path: "/supervisor" },
};

// Permisos configurados en la app (ver canDo en src/store/paseosJuanStore.js), en palabras simples.
const ROLE_PERMISSIONS = [
  { role: "Admin", who: ROLE_OWNERS.admin, can: ["Ve y decide sobre todo el sistema", "Equipo, permisos, precios y reportes"] },
  { role: "Coordinador", who: `${ROLE_OWNERS.coordinador} (${PENDIENTE.toLowerCase()})`, can: ["Alta de perros", "Editar datos del cliente", "Responder el chat de clientes", "Registrar pagos de apoyo", "Revisar documentación", "Derivar al supervisor"] },
  { role: "Supervisor", who: ROLE_OWNERS.supervisor, can: ["Armar rutas y asignar perros", "Responder el chat de clientes", "Gestionar ausencias", "Controlar a los paseadores", "Revisar alertas"] },
  { role: "Paseador", who: ROLE_OWNERS.paseador, can: ["Ver su ruta", "Marcar retiro, paseo y entrega", "Reportar incidentes", "Subir fotos", "Leer el chat interno"] },
  { role: "Cliente", who: "Cada tutor, solo su perro", can: ["Ver la ficha de su perro", "Escribir al chat", "Subir carnet de vacunas", "Subir comprobante", "Ver sus pagos", "Ver el estado del paseo"] },
];

function TeamSection(open) {
  return Section("adm-equipo", open, {
    title: "Equipo y permisos",
    summary: `${plural(TEAM.length, "persona", "personas")} · ${ROLE_PERMISSIONS.length} roles`,
    iconName: "users",
  }, `
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${TEAM.map((person) => {
        const panel = ROLE_PANELS[person.role];
        return `
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${esc(person.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${esc(person.label)}</span>
            </div>
            <p>${esc(person.tasks)}</p>
            <p class="adm-person-panel">Panel: ${panel ? `<a href="${panel.path}" data-link>${panel.panel}</a>` : `<span class="adm-pending">${PENDIENTE}</span>`}</p>
          </li>
        `;
      }).join("")}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${ROLE_PERMISSIONS.map((item) => `
        <article class="adm-role">
          <h4>${item.role}</h4>
          <p class="adm-role-who">${esc(item.who)}</p>
          <ul>${item.can.map((permission) => `<li>${esc(permission)}</li>`).join("")}</ul>
        </article>
      `).join("")}
    </div>
  `);
}

function PricesSection(open) {
  return Section("adm-precios", open, {
    title: "Planes y precios oficiales",
    summary: `${REAL_PLANS.length} planes semanales · paseo suelto · descuentos`,
    iconName: "creditCard",
  }, `
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${SIZES.map((size) => `<th scope="col">${size}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${REAL_PLANS.map((plan) => `
            <tr>
              <th scope="row">${plan.name}<span class="adm-th-sub">${plan.walks} paseos por semana</span></th>
              ${SIZES.map((size) => `<td>${formatPeso(plan.prices[size])}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Paseo suelto</h3>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Paseo suelto por tamaño</caption>
        <thead>
          <tr><th scope="col">Tipo</th>${SIZES.map((size) => `<th scope="col">${size}</th>`).join("")}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${SIZES.map((size) => `<td>${formatPeso(REAL_SINGLE_WALK[size].individual)}</td>`).join("")}</tr>
          <tr><th scope="row">En grupo</th>${SIZES.map((size) => `<td>${formatPeso(REAL_SINGLE_WALK[size].grupo)}</td>`).join("")}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${MULTI_DOG_DISCOUNTS.map((item) => `<li><strong>${item.discount}</strong><span>${item.dogs} perros</span></li>`).join("")}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${PENDIENTE.toLowerCase()}.</p>
  `);
}

function FinanceSection(open) {
  const billing = theoreticalBilling();

  return Section("adm-finanzas", open, {
    title: "Finanzas",
    summary: `Fuente oficial: Libro contable`,
    iconName: "wallet",
  }, `
    <div class="adm-official">
      ${icon("fileCheck", "adm-icon")}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${esc(BUSINESS_INFO.officialSources.money)}. Esta página no muestra montos reales.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${formatPeso(billing.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${plural(billing.included.length, "perro activo", "perros activos")} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${billing.byPlan.map((row) => `
              <tr><th scope="row">${row.plan.name}</th><td>${row.count}</td><td>${formatPeso(row.subtotal)}</td></tr>
            `).join("")}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${billing.included.length}</td><td>${formatPeso(billing.total)}</td></tr></tfoot>
        </table>
      </div>
      ${billing.excluded.length ? `
        <p class="adm-note">No incluye ${plural(billing.excluded.length, "perro", "perros")} con planes fuera de la tabla (precio ${PENDIENTE.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${billing.excludedPlans.map((plan) => `<li>${esc(plan)}: ${listJoin(billing.excluded.filter((dog) => dog.plan === plan).map((dog) => esc(dog.name)))}.</li>`).join("")}
        </ul>
      ` : ""}
    </div>
  `);
}

function SourcesFooter() {
  const sources = BUSINESS_INFO.officialSources;
  return `
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${DATA_UPDATED}.</strong> Perros: ${esc(sources.dogs)}. Rutas: ${esc(sources.routes)}. Plata: ${esc(sources.money)}.</p>
      <p>Esta página no guarda datos de tutores, teléfonos, domicilios ni pagos.</p>
    </footer>
  `;
}

/* ---------- Resumen para copiar ---------- */

function summaryText() {
  const { dayName, date } = todayInfo();
  const live = liveData();
  const priorities = buildPriorities(live);
  const done = readDone();
  const next = priorities.find((priority) => !done.includes(priority.id));
  const load = weeklyLoad();
  const shiftText = (key, label) => {
    const shift = live.shifts.find((item) => item.key === key);
    return shift.total ? `${label}: ${shift.entregados} de ${shift.salen} entregados, ${shift.retirados} retirados.` : `${label}: sin paseos cargados.`;
  };
  const lines = [
    `Paseos Juan · Resumen del admin · ${dayName} ${date}`,
    "",
    "Prioridades:",
    ...priorities.map((p, i) => `${i + 1}. ${p.title}${done.includes(p.id) ? " (hecho)" : ""}`),
    "",
    "Hoy en la app:",
    shiftText("manana", "Mañana"),
    shiftText("tarde", "Tarde"),
    `Incidentes de hoy: ${live.incidentes.length}. Pedidos nuevos: ${live.pedidosNuevos.length}.`,
    "",
    `Carga semanal: ${load.weekTotal} salidas. Más carga: ${listJoin(load.busiest)} (${load.maxTotal}).`,
    "",
    `PRÓXIMO PASO: ${next ? next.action : "Revisar la carga semanal."}`,
    "",
    `Datos de BASE RUTAS al ${DATA_UPDATED}.`,
  ];
  return lines.join("\n");
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Sigue con el método alternativo.
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

/* ---------- Eventos ---------- */

function announce(message) {
  pendingStatus = message;
  // Se escribe un instante después para que el lector de pantalla note el cambio.
  setTimeout(() => {
    const region = document.querySelector("[data-adm-status]");
    if (region) region.textContent = pendingStatus;
  }, 60);
}

function rememberSections() {
  const ids = [...document.querySelectorAll("[data-adm-section]")]
    .filter((section) => section.open)
    .map((section) => section.dataset.admSection);
  writeStored(OPEN_KEY, ids);
}

function goTo(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  if (target.tagName === "DETAILS") {
    target.open = true;
    rememberSections();
  }
  const calm = document.documentElement.dataset.motion === "calm";
  target.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  const focusable = target.tagName === "DETAILS" ? target.querySelector("summary") : target;
  focusable?.focus({ preventScroll: true });
}

// Clicks que tienen que cortar la cadena (por ejemplo, antes de la navegación por data-link).
function handleAdminClick(event) {
  if (event.target.closest("[data-admin-logout]")) {
    ui.credential = null;
    ui.users = null;
    ui.usersError = "";
    navigate("/salir");
    return true;
  }
  return false;
}

function focusLater(selector) {
  requestAnimationFrame(() => document.querySelector(selector)?.focus());
}

function setBusy(form, busy) {
  ui.busy = busy;
  form?.querySelectorAll("button").forEach((button) => {
    button.disabled = busy;
  });
}

async function handleUsersSubmit(event) {
  const form = event.target.closest?.("[data-adm-form]");
  if (!form || !form.closest(".adm-shell")) return;
  event.preventDefault();
  if (ui.busy) return;
  const tipo = form.dataset.admForm;

  if (tipo === "crear") {
    const d = drafts.crear;
    const nombre = d.nombre.trim();
    const usuario = normalizeUsuario(d.usuario);
    const pin = d.pin.trim();
    let problem = "";
    if (nombre.length < 2) problem = "Escribí el nombre.";
    else if (!/^[a-z][a-z0-9._-]{2,30}$/.test(usuario)) problem = "El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.";
    else if (ui.users?.some((user) => user.usuario === usuario)) problem = `Ya existe el usuario “${usuario}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`;
    else if (!ROLE_LABELS[d.rol]) problem = "Elegí un rol.";
    else problem = pinProblem(pin);
    if (problem) {
      setMsg("users", problem, true);
      rerender();
      return;
    }
    setBusy(form, true);
    try {
      const saved = await usuarios.save({ nombre, usuario, rol: d.rol, pin });
      ui.credential = { tipo: "alta", usuario: saved.usuario, nombre: saved.nombre, pin };
      drafts.crear = { nombre: "", usuario: "", rol: "paseador", pin: "" };
      ui.showCreate = false;
      setMsg("users", `Listo: se creó el usuario ${saved.usuario}. Mandale el mensaje.`);
      ui.busy = false;
      await loadUsers();
      focusLater("#adm-cred");
    } catch (error) {
      setMsg("users", error.message || "No se pudo crear el usuario.", true);
      ui.busy = false;
      rerender();
    }
    return;
  }

  if (tipo === "reset") {
    const usuario = form.dataset.admUsuario;
    const user = ui.users?.find((item) => item.usuario === usuario);
    const pin = drafts.reset.pin.trim();
    const problem = user ? pinProblem(pin) : "No encontré ese usuario. Actualizá la lista.";
    if (problem) {
      setMsg("users", problem, true);
      rerender();
      return;
    }
    setBusy(form, true);
    try {
      const reactivar = !user.activo;
      await usuarios.save({ usuario, pin, ...(reactivar ? { activo: true } : {}) });
      ui.credential = { tipo: "reset", usuario, nombre: user.nombre, pin };
      ui.resetFor = null;
      drafts.reset.pin = "";
      setMsg("users", reactivar ? `Listo: ${user.nombre} quedó activo con un PIN nuevo.` : `Listo: ${user.nombre} tiene PIN nuevo y se cerró su sesión.`);
      ui.busy = false;
      await loadUsers();
      focusLater("#adm-cred");
    } catch (error) {
      setMsg("users", error.message || "No se pudo cambiar el PIN.", true);
      ui.busy = false;
      rerender();
    }
  }
}

async function runUserAction(work, okMessage, errorMessage) {
  if (ui.busy) return;
  ui.busy = true;
  try {
    await work();
    setMsg("users", okMessage);
    ui.busy = false;
    await loadUsers();
  } catch (error) {
    setMsg("users", error.message || errorMessage, true);
    ui.busy = false;
    rerender();
  }
}

function handleUsersClick(event) {
  if (event.target.closest("[data-adm-create-toggle]")) {
    ui.showCreate = !ui.showCreate;
    ui.resetFor = null;
    ui.confirmOff = null;
    render();
    focusLater(ui.showCreate ? "#adm-crear-nombre" : "[data-adm-create-toggle]");
    return true;
  }

  if (event.target.closest("[data-adm-users-refresh]")) {
    ui.usersError = "";
    loadUsers().then(() => {
      if (!ui.usersError) {
        setMsg("users", "Lista de usuarios actualizada.");
        rerender();
      }
    });
    return true;
  }

  const gen = event.target.closest("[data-adm-gen-pin]");
  if (gen) {
    const form = gen.dataset.admGenPin;
    drafts[form].pin = randomPin();
    const input = document.getElementById(form === "crear" ? "adm-crear-pin" : "adm-reset-pin");
    if (input) input.value = drafts[form].pin;
    announce(`PIN generado: ${drafts[form].pin.split("").join(" ")}.`);
    return true;
  }

  const roleSave = event.target.closest("[data-adm-role-save]");
  if (roleSave) {
    const usuario = roleSave.dataset.admRoleSave;
    const user = ui.users?.find((item) => item.usuario === usuario);
    if (!user) return true;
    const rol = drafts.roles[usuario] || user.rol;
    if (rol === user.rol) {
      setMsg("users", `${user.nombre} ya tiene el rol ${ROLE_LABELS[rol]}. Elegí otro en la lista y tocá “Cambiar rol”.`, true);
      rerender();
      return true;
    }
    runUserAction(async () => {
      await usuarios.save({ usuario, rol });
      delete drafts.roles[usuario];
    }, `Listo: ${user.nombre} ahora tiene el rol ${ROLE_LABELS[rol]}.`, "No se pudo cambiar el rol.");
    return true;
  }

  const reset = event.target.closest("[data-adm-reset]");
  if (reset) {
    const usuario = reset.dataset.admReset;
    ui.resetFor = ui.resetFor === usuario ? null : usuario;
    ui.confirmOff = null;
    drafts.reset.pin = "";
    render();
    if (ui.resetFor) focusLater("#adm-reset-pin");
    return true;
  }

  if (event.target.closest("[data-adm-reset-cancel]")) {
    const usuario = ui.resetFor || "";
    ui.resetFor = null;
    drafts.reset.pin = "";
    render();
    focusLater(`[data-adm-reset="${CSS.escape(usuario)}"]`);
    return true;
  }

  const off = event.target.closest("[data-adm-off]");
  if (off) {
    ui.confirmOff = off.dataset.admOff;
    ui.resetFor = null;
    render();
    focusLater("#adm-confirm");
    return true;
  }

  if (event.target.closest("[data-adm-off-cancel]")) {
    const usuario = ui.confirmOff || "";
    ui.confirmOff = null;
    render();
    focusLater(`[data-adm-off="${CSS.escape(usuario)}"]`);
    announce("Cancelado: no se desactivó a nadie.");
    return true;
  }

  const offConfirm = event.target.closest("[data-adm-off-confirm]");
  if (offConfirm) {
    const usuario = offConfirm.dataset.admOffConfirm;
    const user = ui.users?.find((item) => item.usuario === usuario);
    ui.confirmOff = null;
    runUserAction(() => usuarios.deactivate(usuario), `Listo: ${user?.nombre || usuario} quedó desactivado y ya no puede entrar.`, "No se pudo desactivar.");
    return true;
  }

  if (event.target.closest("[data-adm-cred-copy]")) {
    if (ui.credential) {
      copyText(credentialText(ui.credential)).then((ok) => {
        announce(ok ? "Mensaje copiado. Pegalo en WhatsApp." : "No se pudo copiar. Seleccioná el texto y copialo a mano.");
      });
    }
    return true;
  }

  if (event.target.closest("[data-adm-cred-hide]")) {
    ui.credential = null;
    render();
    focusLater("#adm-usuarios");
    announce("Listo. El PIN ya no se muestra.");
    return true;
  }

  if (event.target.closest("[data-adm-live-refresh]")) {
    refreshLive(true);
    return true;
  }

  return false;
}

function handleDraftInput(event) {
  const field = event.target.closest?.("[data-adm-draft]");
  if (!field) return;
  const form = field.dataset.admDraft;
  const key = field.dataset.admKey;
  if (form === "roles") drafts.roles[key] = field.value;
  else drafts[form][key] = field.value;
  if (form === "crear" && key === "rol") {
    const hint = document.querySelector("[data-adm-role-hint]");
    if (hint) hint.innerHTML = `<strong>${esc(ROLE_LABELS[field.value] || field.value)}:</strong> ${esc(roleLine(field.value))}`;
  }
}

// Acciones de la página. Corre después del control de accesibilidad.
function handleAdminActionClick(event) {
  if (!event.target.closest(".adm-shell")) return false;

  const a11y = event.target.closest("[data-adm-a11y]");
  if (a11y) {
    document.querySelector(".a11y-toggle")?.click();
    return true;
  }

  const doneButton = event.target.closest("[data-adm-done]");
  if (doneButton) {
    const id = doneButton.dataset.admDone;
    const done = readDone();
    const isDone = done.includes(id);
    writeStored(DONE_KEY, isDone ? done.filter((item) => item !== id) : [...done, id]);
    render();
    const nextFocus = document.querySelector(`.adm-priority [data-adm-done="${id}"]`);
    nextFocus?.focus({ preventScroll: true });
    announce(isDone ? "Prioridad desmarcada." : "Prioridad marcada como hecha. Se actualizó el próximo paso.");
    return true;
  }

  const goButton = event.target.closest("[data-adm-goto]");
  if (goButton) {
    event.preventDefault();
    goTo(goButton.dataset.admGoto);
    return true;
  }

  if (handleUsersClick(event)) return true;

  const expand = event.target.closest("[data-adm-expand]");
  if (expand) {
    const shouldOpen = expand.dataset.admExpand === "open";
    document.querySelectorAll("[data-adm-section]").forEach((section) => {
      section.open = shouldOpen;
    });
    rememberSections();
    announce(shouldOpen ? "Secciones abiertas." : "Secciones cerradas.");
    return true;
  }

  if (event.target.closest("[data-adm-copy]")) {
    copyText(summaryText()).then((ok) => {
      announce(ok ? "Resumen copiado. Pegalo en WhatsApp o en tus notas." : "No se pudo copiar. Probá de nuevo.");
    });
    return true;
  }

  return false;
}

function handleSectionToggle(event) {
  if (event.target.matches?.("[data-adm-section]")) rememberSections();
  if (event.target.matches?.("[data-adm-dogs]")) {
    const key = event.target.dataset.admDogs;
    if (event.target.open) ui.openDogs.add(key);
    else ui.openDogs.delete(key);
  }
}

export function registerAdminEvents() {
  clickHandlers.push(handleAdminClick);
  actionClickHandlers.push(handleAdminActionClick);
  // El evento toggle no burbujea: se escucha en captura.
  document.addEventListener("toggle", handleSectionToggle, true);
  document.addEventListener("submit", handleUsersSubmit);
  document.addEventListener("input", handleDraftInput);
  document.addEventListener("change", handleDraftInput);
  // Una sola vez: cuando llegan datos nuevos del día, se vuelve a dibujar el panel.
  onDataChange((col) => {
    if (LIVE_COLS.includes(col)) rerender();
  });
  window.addEventListener("online", () => rerender());
  window.addEventListener("offline", () => rerender());
}
