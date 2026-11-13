// Vista del rol Paseador y del Ayudante de paseador (página /paseador).
// Pensada para usar en la calle: celular en una mano, correas en la otra, al sol.
// Lo urgente primero, botones grandes, textos cortos.
//
// Ruta del día (docs/datos-compartidos.md, "Rutas y horarios"): la arma el coordinador.
// Ruta efectiva = registro de `rutas` de la fecha si existe; si no, la `plantillas` del día de la
// semana; si el servidor todavía no tiene plantillas, la planilla RPJ (plantillasDesdePlanilla())
// con el aviso de que falta que el coordinador la confirme.
// Lo que se marca se guarda en los datos compartidos (src/api/client.js): avance de cada perro en
// `paseos` (el mismo registro que ve y toca el supervisor), equipo en `checklists` (uno por usuario)
// e incidentes en `incidentes`. Los avisos por barrio vienen de `avisos`.
// En este celular solo quedan el borrador del incidente y la ruta elegida cuando el usuario no
// figura en ninguna.
// No hay datos de tutores en esta página (tampoco para el ayudante).
import {
  REAL_DOGS,
  TEAM,
  todayName,
  EQUIPMENT,
  INCIDENT_PROTOCOL,
  SHIFTS,
  WEEK_DAYS,
  CATEGORIES,
  BUSINESS_INFO,
  PENDIENTE,
  plantillasDesdePlanilla,
  sumarMinutos,
} from "../data/realData.js";
import { icon, changeHandlers, clickHandlers } from "../ui/shared.js";
import { navigate, render } from "../app.js";
import { session, registros, onDataChange } from "../api/client.js";

const TZ = "America/Argentina/Buenos_Aires";
// Claves de la versión anterior (todo en el celular). Solo se leen una vez para migrar.
const LEGACY_PROGRESS_KEY = "paseosJuan_paseador_progreso";
const LEGACY_EQUIP_KEY = "paseosJuan_paseador_equipo";
// Borrador del incidente mientras se escribe (no es un dato compartido).
const INCIDENT_KEY = "paseosJuan_paseador_incidente";
// Ruta elegida en este dispositivo cuando el usuario no figura en ninguna ("¿En qué ruta estás hoy?").
const ROUTE_PICK_KEY = "paseosJuan_paseador_ruta";

// Cada paso guarda su hora, quién lo marcó y deja el estado del contrato de `paseos`.
const STEPS = [
  { label: "Retiro", action: "Marcar retirado", done: "Retirado", field: "horaRetiro", estado: "retirado" },
  { label: "Paseo", action: "Marcar en paseo", done: "En paseo", field: "horaPaseo", estado: "paseando" },
  { label: "Entrega", action: "Marcar entregado", done: "Entregado", field: "horaEntrega", estado: "entregado" },
];
const ESTADO_STEP = { pendiente: 0, retirado: 1, paseando: 2, entregado: 3 };
const NO_SALE = "no-sale";
const TURNO_ID = { Mañana: "manana", Tarde: "tarde" };
const SAFE_ID = /^[a-z0-9][a-z0-9_.-]{0,60}$/i;

const SHIFT_BY_LABEL = { Mañana: SHIFTS.manana, Tarde: SHIFTS.tarde };

const RISK_LEVELS = ["Bajo", "Medio", "Alto"];
const INJURY_OPTIONS = ["No se ven", "Sí", "No sé"];
const EXTERNAL_DOG = "Perro externo";
const FORBIDDEN_WORDS = /\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i;

// Punto de partida si el servidor todavía no tiene plantillas (horarios reales de BASE RUTAS).
const PLANILLA = plantillasDesdePlanilla();

// Estado de la pantalla (no se guarda: al recargar vuelve a hoy y al turno actual).
const view = {
  day: null,
  shift: null,
  pickerOpen: false,
  confirmClear: false,
  previewOpen: false,
  incidentStatus: "",
  incidentSavedText: "",
  equipStatus: "",
  syncError: "",
  routeChange: null,
};

// ---------- utilidades ----------

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Sin almacenamiento (modo privado): vale solo mientras la página esté abierta.
  }
}

function plain(text) {
  return String(text || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toLowerCase();
}

// Fecha y hora de Argentina, sin importar la zona horaria del dispositivo.
function nowAR() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TZ,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((part) => [part.type, part.value]),
  );
  const localDate = new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  return {
    iso: `${parts.year}-${parts.month}-${parts.day}`,
    date: `${parts.day}/${parts.month}/${parts.year}`,
    time: `${parts.hour}:${parts.minute}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    day: todayName(localDate),
  };
}

function isoToLabel(iso) {
  const [y, m, d] = String(iso).split("-");
  return d ? `${d}/${m}/${y}` : iso;
}

// Próxima fecha (desde hoy) de un día de la semana: para planificar otro día.
function isoForDay(day, now) {
  const offset = (WEEK_DAYS.indexOf(day) - WEEK_DAYS.indexOf(now.day) + 7) % 7;
  const [y, m, d] = now.iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + offset)).toISOString().slice(0, 10);
}

// Turno según la hora: mañana hasta las 13:30, después tarde.
function shiftByClock(now) {
  return now.minutes < 13 * 60 + 30 ? "Mañana" : "Tarde";
}

function selection() {
  const now = nowAR();
  const day = view.day || now.day;
  const shift = view.shift || shiftByClock(now);
  const isToday = day === now.day;
  const iso = isToday ? now.iso : isoForDay(day, now);
  return { now, day, shift, isToday, iso };
}

function listNames(names) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

function shiftHours(shift) {
  const data = SHIFT_BY_LABEL[shift];
  return `${data.from} a ${data.to}`;
}

function minutesOf(hora) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(String(hora || "").trim());
  return match ? Number(match[1]) * 60 + Number(match[2]) : null;
}

function durationText(total) {
  if (total < 60) return `${total} min`;
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  return rest ? `${hours} h ${rest} min` : `${hours} h`;
}

// Cuenta regresiva o atraso contra la hora prevista. mode: "retiro" o "entrega".
function countdown(hora, nowMinutes, mode = "retiro") {
  const target = minutesOf(hora);
  if (target === null) return { text: `Hora: ${PENDIENTE.toLowerCase()}`, kind: "info" };
  const diff = target - nowMinutes;
  const prefix = mode === "entrega" ? "Entrega " : "";
  if (diff > 0) return { text: `${prefix}${mode === "entrega" ? "en" : "En"} ${durationText(diff)}`, kind: diff <= 10 ? "soon" : "ok" };
  if (diff === 0) return { text: mode === "entrega" ? "Entrega ahora" : "Ahora", kind: "soon" };
  return { text: mode === "entrega" ? `Entrega con ${durationText(-diff)} de atraso` : `${durationText(-diff)} de atraso`, kind: "late" };
}

function Countdown(hora, nowMinutes, mode = "retiro") {
  const cd = countdown(hora, nowMinutes, mode);
  return `<span class="pw-cd pw-cd--${cd.kind}" data-pw-countdown="${esc(hora)}" data-pw-mode="${mode}">${esc(cd.text)}</span>`;
}

function safetyKind(text) {
  if (/^no juntar/i.test(text)) return "danger";
  if (/bozal/i.test(text)) return "warn";
  return "info";
}

// Pares de perros que no se pueden juntar y que figuran en la misma lista.
function conflictsFor(dogs) {
  const names = new Set(dogs.map((dog) => dog.name));
  const pairs = new Map();
  dogs.forEach((dog) => {
    (dog.incompatibleWith || []).forEach((other) => {
      if (!names.has(other)) return;
      const key = [dog.name, other].sort().join("|");
      pairs.set(key, [dog.name, other].sort());
    });
  });
  return [...pairs.values()];
}

// Agrupa los pares por el perro con más conflictos: "Pistacho con Cashi, Lokaku y Sam".
function groupConflicts(conflicts) {
  let remaining = conflicts.map((pair) => [...pair]);
  const groups = [];
  while (remaining.length) {
    const degree = {};
    remaining.flat().forEach((name) => {
      degree[name] = (degree[name] || 0) + 1;
    });
    const hub = Object.keys(degree).sort((a, b) => degree[b] - degree[a] || a.localeCompare(b))[0];
    const partners = remaining.filter((pair) => pair.includes(hub)).map((pair) => pair.find((name) => name !== hub)).sort();
    groups.push(`${hub} con ${listNames(partners)}`);
    remaining = remaining.filter((pair) => !pair.includes(hub));
  }
  return groups;
}

function partnersInList(dog, conflicts) {
  return conflicts.filter((pair) => pair.includes(dog.name)).map((pair) => pair.find((name) => name !== dog.name));
}

function usesMuzzle(dog) {
  return dog.safety.some((text) => /bozal/i.test(text));
}

const MY_EQUIPMENT = EQUIPMENT.filter((row) => row.sebastian > 0);
const OTHER_EQUIPMENT = EQUIPMENT.filter((row) => row.sebastian === 0 && row.juan > 0);
const MY_MUZZLES = EQUIPMENT.filter((row) => /^bozal/i.test(row.item)).reduce((sum, row) => sum + row.sebastian, 0);

// ---------- usuario ----------

function currentUser() {
  return session.user() || {};
}

function walkerName() {
  return currentUser().nombre || "equipo";
}

function isHelper() {
  return currentUser().rol === "ayudante";
}

function isMe(usuario) {
  const user = currentUser();
  if (!usuario || !user.usuario) return false;
  const value = plain(usuario);
  return value === plain(user.usuario) || (user.nombre && value === plain(user.nombre));
}

// Nombre para mostrar de un usuario (las rutas guardan el usuario, no el nombre).
function personName(usuario, names = new Map()) {
  if (!usuario) return "";
  if (isMe(usuario)) return currentUser().nombre || String(usuario);
  const key = String(usuario);
  return names.get(key) || names.get(plain(key)) || TEAM.find((member) => member.id === plain(key))?.name || key;
}

// ---------- rutas y horarios ----------

function sameDay(a, b) {
  return plain(a) === plain(b);
}

function turnoLabel(value) {
  return plain(value).startsWith("tarde") ? "Tarde" : "Mañana";
}

function dogForStop(parada) {
  const known = REAL_DOGS.find((dog) => dog.id === parada.perroId) || REAL_DOGS.find((dog) => plain(dog.name) === plain(parada.perroNombre));
  if (known) return known;
  // Perro que sumó el coordinador y todavía no está en el registro maestro de esta página.
  return {
    id: SAFE_ID.test(String(parada.perroId || "")) ? String(parada.perroId) : "",
    name: String(parada.perroNombre || "Perro sin nombre"),
    size: PENDIENTE,
    minutes: null,
    safety: [],
    status: "Activo",
    unknown: true,
  };
}

function normalizeRoute(raw, fuente) {
  const paradas = (Array.isArray(raw.paradas) ? raw.paradas : []).filter((p) => p && (p.perroId || p.perroNombre));
  const stops = paradas
    .map((parada, index) => {
      const dog = dogForStop(parada);
      const minutos = Number(parada.minutos) || dog.minutes || null;
      const hora = minutesOf(parada.hora) === null ? "" : String(parada.hora).trim().padStart(5, "0");
      return {
        index,
        dog,
        hora,
        minutos,
        salida: hora && minutos ? sumarMinutos(hora, minutos) : "",
        nota: String(parada.nota || "").trim(),
        canSave: Boolean(dog.id),
      };
    })
    // En orden de retiro. Sin hora van al final; a igual hora se respeta el orden del coordinador.
    .sort((a, b) => (minutesOf(a.hora) ?? 9999) - (minutesOf(b.hora) ?? 9999) || a.index - b.index);
  return {
    ruta: String(raw.ruta || PENDIENTE),
    turno: turnoLabel(raw.turno),
    dia: raw.dia || "",
    paseador: String(raw.paseador || ""),
    ayudante: String(raw.ayudante || ""),
    supervisor: String(raw.supervisor || ""),
    notas: String(raw.notas || ""),
    fuente,
    record: raw,
    stops,
  };
}

// Ruta efectiva de una fecha: cambio del día > plantilla semanal > planilla (si no hay nada en el servidor).
function effectiveRoutes(iso, day, todayIso) {
  const daily = new Map();
  registros
    .cached("rutas", { desde: todayIso })
    .filter((record) => record.fecha === iso && record.ruta && Array.isArray(record.paradas))
    .sort((a, b) => String(a.actualizadoEn || "").localeCompare(String(b.actualizadoEn || "")))
    .forEach((record) => daily.set(record.ruta, record));

  const plantillas = registros.cached("plantillas").filter((record) => record.ruta && Array.isArray(record.paradas));
  const fromPlanilla = plantillas.length === 0;
  const byRuta = new Map();
  (fromPlanilla ? PLANILLA : plantillas)
    .filter((record) => sameDay(record.dia, day))
    .forEach((record) => byRuta.set(record.ruta, normalizeRoute(record, fromPlanilla ? "planilla" : "plantilla")));
  daily.forEach((record, ruta) => byRuta.set(ruta, normalizeRoute(record, "dia")));

  return [...byRuta.values()].sort((a, b) => (a.turno === b.turno ? a.ruta.localeCompare(b.ruta) : a.turno === "Mañana" ? -1 : 1));
}

function pickedRoute(sel) {
  const saved = readJSON(ROUTE_PICK_KEY, {});
  const mine = saved?.[currentUser().usuario || ""];
  return mine && mine.iso === sel.iso && mine.turno === sel.shift ? mine.ruta : "";
}

function savePickedRoute(sel, ruta) {
  const saved = readJSON(ROUTE_PICK_KEY, {});
  const all = saved && typeof saved === "object" ? saved : {};
  all[currentUser().usuario || ""] = ruta ? { iso: sel.iso, turno: sel.shift, ruta } : null;
  writeJSON(ROUTE_PICK_KEY, all);
}

// Qué rutas se muestran: donde figura el usuario (paseador o ayudante); si no figura, todas las
// del turno o la que eligió en este dispositivo.
function routePlan(sel) {
  const all = effectiveRoutes(sel.iso, sel.day, sel.now.iso);
  const ofShift = all.filter((route) => route.turno === sel.shift);
  const mine = ofShift.filter((route) => isMe(route.paseador) || isMe(route.ayudante));
  const elsewhere = all.filter((route) => route.turno !== sel.shift && (isMe(route.paseador) || isMe(route.ayudante)));
  const picked = mine.length ? "" : ofShift.some((route) => route.ruta === pickedRoute(sel)) ? pickedRoute(sel) : "";
  const shown = mine.length ? mine : picked ? ofShift.filter((route) => route.ruta === picked) : ofShift;
  return {
    all,
    ofShift,
    mine,
    elsewhere,
    picked,
    shown,
    assigned: mine.length > 0,
    helping: mine.find((route) => isMe(route.ayudante) && !isMe(route.paseador)) || null,
    fromPlanilla: shown.some((route) => route.fuente === "planilla"),
  };
}

function stopsOf(routes) {
  return routes.flatMap((route) => route.stops.map((stop) => ({ ...stop, route })));
}

function findStop(sel, dogId) {
  return stopsOf(routePlan(sel).shown).find((stop) => stop.dog.id === dogId) || null;
}

// "La ruta cambió": se compara lo que se ve con lo que se vio antes (mismo día, turno y ruta).
const routeMemory = new Map();

function detectRouteChanges(sel, routes) {
  if (!sel.isToday || !loaded.ready) return;
  const changes = [];
  routes.forEach((route) => {
    const key = `${sel.iso}|${route.turno}|${route.ruta}`;
    const current = new Map(route.stops.map((stop) => [stop.dog.id || plain(stop.dog.name), stop]));
    const before = routeMemory.get(key);
    routeMemory.set(key, current);
    if (!before) return;
    const added = [...current.entries()].filter(([id]) => !before.has(id)).map(([, stop]) => `${stop.dog.name}${stop.hora ? ` (${stop.hora})` : ""}`);
    const removed = [...before.entries()].filter(([id]) => !current.has(id)).map(([, stop]) => stop.dog.name);
    const moved = [...current.entries()]
      .filter(([id, stop]) => before.has(id) && before.get(id).hora !== stop.hora)
      .map(([id, stop]) => `${stop.dog.name} pasa de ${before.get(id).hora || "sin hora"} a ${stop.hora || "sin hora"}`);
    const parts = [];
    if (added.length) parts.push(`se ${added.length === 1 ? "sumó" : "sumaron"} ${listNames(added)}`);
    if (removed.length) parts.push(`se ${removed.length === 1 ? "quitó" : "quitaron"} ${listNames(removed)}`);
    if (moved.length) parts.push(`cambió el horario: ${listNames(moved)}`);
    if (parts.length) changes.push(`${routes.length > 1 ? `${route.ruta}: ` : ""}${parts.join(" / ")}`);
  });
  if (!changes.length) return;
  view.routeChange = { text: `La ruta cambió: ${changes.join(". ")}.`, time: sel.now.time };
  announce(view.routeChange.text);
}

// ---------- avisos por barrio ----------

function activeNotices(iso) {
  return registros
    .cached("avisos")
    .filter((aviso) => {
      const desde = String(aviso.fecha || "");
      const hasta = String(aviso.vigenteHasta || "");
      if (desde && desde > iso) return false;
      return hasta ? hasta >= iso : desde === iso;
    })
    .sort((a, b) => String(b.actualizadoEn || b.fecha || "").localeCompare(String(a.actualizadoEn || a.fecha || "")));
}

function NoticesSection(sel) {
  const notices = activeNotices(sel.now.iso);
  if (!notices.length) return "";
  return `
    <section class="pw-notices" aria-labelledby="pw-avisos-title">
      <h2 class="pw-section-label" id="pw-avisos-title">${icon("bell", "pw-icon pw-icon--sm")} Avisos por barrio (${notices.length})</h2>
      <ul class="pw-notice-list" role="list">
        ${notices.map((aviso) => {
          const urgent = /seguridad|perro suelto/i.test(aviso.tipo || "");
          return `
            <li class="pw-notice ${urgent ? "pw-notice--danger" : ""}">
              ${icon(urgent ? "alertTriangle" : "mapPin", "pw-icon")}
              <div>
                <p class="pw-notice-head"><strong>${esc(aviso.barrio || "Barrio sin cargar")}</strong>${aviso.tipo ? ` · ${esc(aviso.tipo)}` : ""}</p>
                <p>${esc(aviso.mensaje || aviso.titulo || "")}</p>
                <p class="pw-notice-meta">${aviso.vigenteHasta ? `Vigente hasta el ${esc(isoToLabel(aviso.vigenteHasta))}` : "Vigente hoy"}${aviso.creadoPorNombre ? ` · Avisó ${esc(aviso.creadoPorNombre)}` : ""}</p>
              </div>
            </li>
          `;
        }).join("")}
      </ul>
    </section>
  `;
}

// ---------- datos compartidos (src/api/client.js) ----------

// Ids del contrato (docs/datos-compartidos.md): un registro por perro, día y turno.
function paseoId(iso, dogId, shift) {
  return `${iso}_${dogId}_${TURNO_ID[shift]}`;
}

function checklistId(iso, shift, usuario = currentUser().usuario) {
  return `${iso}_${usuario || "sin-usuario"}_${TURNO_ID[shift]}`;
}

// Lo recién tocado se muestra al instante, mientras viaja al servidor.
const optimistic = new Map();

function recordsFor(col, iso) {
  const byId = new Map(registros.cached(col, { desde: iso }).map((record) => [record.id, record]));
  optimistic.forEach((record, key) => {
    if (!key.startsWith(`${col}:`)) return;
    byId.set(record.id, { ...(byId.get(record.id) || {}), ...record, enviando: true });
  });
  return byId;
}

// Paso alcanzado según el estado y las horas guardadas (lo marque el paseador, el ayudante o el supervisor).
function paseoState(record) {
  const times = STEPS.map((step) => (record?.[step.field] ? String(record[step.field]) : ""));
  if (!record) return { step: 0, noSale: false, times, record: null };
  const byTimes = times.reduce((last, time, index) => (time ? index + 1 : last), 0);
  const noSale = record.estado === NO_SALE;
  const step = noSale ? 0 : Math.max(ESTADO_STEP[record.estado] ?? 0, byTimes);
  return { step, noSale, times, record };
}

function progressFor(iso, shift, dogs) {
  const records = recordsFor("paseos", iso);
  return Object.fromEntries(dogs.filter((dog) => dog.id).map((dog) => [dog.id, paseoState(records.get(paseoId(iso, dog.id, shift)))]));
}

function stateOf(progress, stop) {
  return (stop.dog.id && progress[stop.dog.id]) || paseoState(null);
}

function routeTotals(stops, progress) {
  const noSale = stops.filter((stop) => stateOf(progress, stop).noSale).length;
  const delivered = stops.filter((stop) => !stateOf(progress, stop).noSale && stateOf(progress, stop).step >= STEPS.length).length;
  return { noSale, delivered, toWalk: stops.length - noSale, closed: delivered + noSale === stops.length };
}

function checklistFor(iso, shift) {
  const record = recordsFor("checklists", iso).get(checklistId(iso, shift));
  const items = record?.items && typeof record.items === "object" ? record.items : {};
  return { record, checked: MY_EQUIPMENT.filter((row) => items[row.item] === true).map((row) => row.item) };
}

// Nombres para "Marcó …" y "Último cambio": el servidor guarda usuario y nombre de quien carga.
function teamNames(iso) {
  const names = new Map();
  const add = (usuario, nombre) => {
    if (usuario && nombre) names.set(String(usuario), String(nombre));
  };
  [["paseos", { desde: iso }], ["checklists", { desde: iso }], ["rutas", { desde: iso }], ["plantillas", {}], ["avisos", {}]].forEach(([col, opts]) => {
    registros.cached(col, opts).forEach((record) => {
      add(record.creadoPor, record.creadoPorNombre);
      add(record.actualizadoPor, record.actualizadoPorNombre);
      STEPS.forEach((step) => add(record[`${step.field}Por`], record[`${step.field}PorNombre`]));
    });
  });
  return names;
}

function whoName(usuario, names) {
  if (!usuario) return PENDIENTE;
  if (isMe(usuario)) return "vos";
  return personName(usuario, names);
}

function timeAR(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", { timeZone: TZ, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
}

function lastChange(record, names) {
  if (!record) return "";
  if (record.enviando) return "Guardando…";
  if (record.pendiente) return "Sin señal: se enviará solo.";
  if (!record.actualizadoEn) return "";
  const time = timeAR(record.actualizadoEn);
  return `Último cambio: ${whoName(record.actualizadoPor, names)}${time ? `, ${time} hs` : ""}.`;
}

// Quién marcó un paso (solo si fue otra persona: el ayudante, el paseador o el supervisor).
function markerOf(record, index, names) {
  const field = STEPS[index].field;
  const usuario = record?.[`${field}Por`];
  if (!usuario || isMe(usuario)) return "";
  return record[`${field}PorNombre`] || personName(usuario, names);
}

// Guarda de a uno, en orden, para que dos toques seguidos no se pisen.
let saveChain = Promise.resolve();

function saveShared(col, build, { optimisticRecord } = {}) {
  const key = optimisticRecord ? `${col}:${optimisticRecord.id}` : "";
  if (key) optimistic.set(key, optimisticRecord);
  const job = saveChain.then(async () => {
    const record = typeof build === "function" ? build() : build;
    try {
      const saved = await registros.save(col, record);
      if (view.syncError) view.syncError = "";
      return saved;
    } catch (error) {
      view.syncError = `No se guardó: ${error?.message || "error del servidor"} Probá de nuevo.`;
      announceError(view.syncError);
      return null;
    } finally {
      if (key && optimistic.get(key) === optimisticRecord) optimistic.delete(key);
      scheduleRender();
    }
  });
  saveChain = job.catch(() => null);
  return job;
}

function savePaseo(stop, sel, changes, message) {
  const iso = sel.now.iso;
  const record = {
    id: paseoId(iso, stop.dog.id, sel.shift),
    fecha: iso,
    perroId: stop.dog.id,
    perroNombre: stop.dog.name,
    turno: sel.shift,
    ruta: stop.route.ruta,
    ...changes,
  };
  announce(message);
  return saveShared("paseos", record, { optimisticRecord: record }).then((saved) => {
    if (saved?.pendiente) announce(`${message} Sin señal: se enviará cuando haya señal.`);
  });
}

function saveChecklist(sel, checked) {
  const iso = sel.now.iso;
  const items = Object.fromEntries(MY_EQUIPMENT.map((row) => [row.item, checked.includes(row.item)]));
  const record = { id: checklistId(iso, sel.shift), fecha: iso, turno: sel.shift, items, completo: checked.length >= MY_EQUIPMENT.length };
  return saveShared("checklists", record, { optimisticRecord: record });
}

// Trae los datos de hoy una vez por usuario y día, y después los refresca cada minuto.
// Hasta que llega la primera respuesta (o se confirma que no hay señal), los botones de avance
// quedan en espera: así un toque apurado no pisa lo que ya marcó el supervisor o el ayudante.
const loaded = { key: "", stops: [], ready: false };

function ensureShared(iso) {
  const key = `${iso}|${currentUser().usuario || ""}`;
  if (loaded.key === key) return;
  loaded.stops.forEach((stop) => stop());
  loaded.key = key;
  loaded.stops = [];
  loaded.ready = false;
  const sources = [
    ["paseos", { desde: iso }],
    ["checklists", { desde: iso }],
    ["rutas", { desde: iso }],
    ["plantillas", {}],
    ["avisos", {}],
  ];
  Promise.allSettled(sources.map(([col, opts]) => registros.list(col, opts)))
    .then((results) => {
      const failed = results.find((result) => result.status === "rejected");
      if (failed) {
        view.syncError = `No se pudieron traer los datos del equipo: ${failed.reason?.message || "error del servidor"}`;
        announceError(view.syncError);
      }
      return migrateLegacy(iso);
    })
    .catch(() => null)
    .finally(() => {
      if (loaded.key !== key) return;
      loaded.ready = true;
      scheduleRender();
      loaded.stops = sources.map(([col, opts]) => registros.watch(col, opts));
    });
}

// Migración: la versión anterior guardaba el avance solo en el celular. Lo de hoy se sube una vez.
let legacyChecked = false;

async function migrateLegacy(iso) {
  if (legacyChecked) return;
  legacyChecked = true;
  const progress = readJSON(LEGACY_PROGRESS_KEY, null);
  const equip = readJSON(LEGACY_EQUIP_KEY, null);
  if (!progress && !equip) return;

  const jobs = [];
  const paseos = recordsFor("paseos", iso);
  Object.entries(progress && typeof progress === "object" ? progress : {}).forEach(([slot, dogs]) => {
    const [day, shift] = slot.split("|");
    if (day !== iso || !TURNO_ID[shift] || !dogs || typeof dogs !== "object") return;
    Object.entries(dogs).forEach(([dogId, times]) => {
      const dog = REAL_DOGS.find((item) => item.id === dogId);
      if (!dog || !Array.isArray(times) || !times.length) return;
      const id = paseoId(iso, dogId, shift);
      const shared = paseoState(paseos.get(id));
      const steps = Math.min(times.length, STEPS.length);
      // Si lo compartido ya está igual o más adelante (o el supervisor marcó "no sale"), no se pisa.
      if (shared.noSale || shared.step >= steps) return;
      const record = { id, fecha: iso, perroId: dog.id, perroNombre: dog.name, turno: shift, estado: STEPS[steps - 1].estado };
      STEPS.forEach((step, index) => {
        record[step.field] = index < steps ? shared.times[index] || String(times[index] || "") : "";
      });
      jobs.push(saveShared("paseos", record, { optimisticRecord: record }));
    });
  });

  const checklists = recordsFor("checklists", iso);
  Object.entries(equip && typeof equip === "object" ? equip : {}).forEach(([slot, list]) => {
    const [day, shift] = slot.split("|");
    if (day !== iso || !TURNO_ID[shift] || !Array.isArray(list)) return;
    const known = list.filter((item) => MY_EQUIPMENT.some((row) => row.item === item));
    if (!known.length || checklists.has(checklistId(iso, shift))) return;
    jobs.push(saveChecklist({ now: { iso }, shift }, known));
  });

  const results = await Promise.all(jobs);
  if (results.every(Boolean)) {
    try {
      localStorage.removeItem(LEGACY_PROGRESS_KEY);
      localStorage.removeItem(LEGACY_EQUIP_KEY);
    } catch {
      // Sin almacenamiento: no hay nada que limpiar.
    }
    if (jobs.length) announce("Se subió al equipo lo que tenías marcado en este celular.");
  }
}

function getDraft() {
  const draft = readJSON(INCIDENT_KEY, {});
  return {
    dogs: Array.isArray(draft.dogs) ? draft.dogs : [],
    hora: draft.hora || "",
    lugar: draft.lugar || "",
    antes: draft.antes || "",
    conducta: draft.conducta || "",
    accion: draft.accion || "",
    despues: draft.despues || "",
    riesgo: draft.riesgo || "",
    lesiones: draft.lesiones || "",
    protocolo: Array.isArray(draft.protocolo) ? draft.protocolo : [],
    // Id del registro en `incidentes` una vez guardado: si se corrige, se actualiza el mismo.
    registroId: typeof draft.registroId === "string" ? draft.registroId : "",
  };
}

// ---------- vista ----------

export function walkerShell(content) {
  return `
    <div class="pw-shell">
      ${WalkerHeader()}
      ${content}
    </div>
  `;
}

export function walkerDashboard() {
  const sel = selection();
  ensureShared(sel.now.iso);
  const plan = routePlan(sel);
  detectRouteChanges(sel, plan.shown);
  clockState.iso = sel.now.iso;
  clockState.shift = shiftByClock(sel.now);
  clockState.minute = sel.now.minutes;
  const stops = stopsOf(plan.shown);
  const progress = sel.isToday ? progressFor(sel.iso, sel.shift, stops.map((stop) => stop.dog)) : {};
  const names = teamNames(sel.now.iso);

  return `
    <main class="pw-main" id="pw-inicio">
      ${SyncBar()}
      ${RouteChangeBanner()}
      ${NoticesSection(sel)}
      ${TodayCard(sel, plan, stops, progress, names)}
      <div class="pw-routes" id="pw-perros" tabindex="-1" aria-label="Perros de la ruta">
        ${plan.shown.length
          ? plan.shown.map((route) => RouteSection(route, sel, plan, progress, names)).join("")
          : `
            <div class="pw-empty">
              <p><strong>No hay rutas cargadas para ${sel.day.toLowerCase()} a la ${sel.shift.toLowerCase()}.</strong></p>
              <p>Si te pidieron un paseo, confirmalo con el coordinador o con Juan.</p>
            </div>
          `}
      </div>
      <div class="pw-columns">
        ${EquipmentSection(sel, plan, names)}
        ${IncidentSection(sel, stops.map((stop) => stop.dog))}
      </div>
      <footer class="pw-footer">
        <p>Rutas y horarios: los arma el coordinador. Punto de partida: ${esc(BUSINESS_INFO.officialSources.routes)} (12/11/2026).</p>
        <p>Lo que marcás acá lo ven ${isHelper() ? "el paseador, " : "tu ayudante, "}Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `;
}

function WalkerHeader() {
  return `
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel ${isHelper() ? "del ayudante de paseador" : "del paseador"}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>${isHelper() ? "Ayudante" : "Paseador"} · ${esc(walkerName())}</small>
        </span>
      </a>
      <div class="pw-header-actions">
        <button class="pw-btn pw-btn--danger pw-btn--compact" type="button" data-pw-goto="pw-incidente">
          ${icon("alertTriangle", "pw-icon")}
          Incidente
        </button>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-logout>
          ${icon("logOut", "pw-icon")}
          Salir
        </button>
      </div>
    </header>
  `;
}

// Señal y errores: visible arriba de todo. Los anuncios para lector de pantalla van por pw-live.
function SyncBar() {
  const pending = registros.pendingCount();
  const offline = typeof navigator !== "undefined" && navigator.onLine === false;
  let signal = "";
  if (pending) {
    signal = `Sin señal: ${pending} ${pending === 1 ? "cambio se enviará solo" : "cambios se enviarán solos"}.`;
  } else if (offline) {
    signal = "Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.";
  }
  const parts = [];
  if (signal) {
    parts.push(`<p class="pw-sync-msg pw-sync-msg--offline">${icon("uploadCloud", "pw-icon")}<span>${esc(signal)}</span></p>`);
  }
  if (view.syncError) {
    parts.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${icon("alertTriangle", "pw-icon")}
        <span>${esc(view.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `);
  }
  // Sin nada que avisar queda vacío (y oculto), pero la región sigue en su lugar.
  return `<div class="pw-sync" aria-live="polite" data-pw-sync>${parts.join("")}</div>`;
}

function RouteChangeBanner() {
  if (!view.routeChange) return "";
  return `
    <div class="pw-change" data-pw-change>
      ${icon("route", "pw-icon pw-icon--lg")}
      <div>
        <strong>${esc(view.routeChange.text)}</strong>
        <p>Lo cambió el coordinador. Aviso recibido a las ${esc(view.routeChange.time)}.</p>
      </div>
      <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-change-ok>Entendido</button>
    </div>
  `;
}

function routeHours(routes) {
  const horas = routes.flatMap((route) => route.stops.map((stop) => stop.hora)).filter(Boolean).sort();
  const salidas = routes.flatMap((route) => route.stops.map((stop) => stop.salida)).filter(Boolean).sort();
  if (!horas.length) return "";
  return `${horas[0]} a ${salidas[salidas.length - 1] || horas[horas.length - 1]}`;
}

function TodayCard(sel, plan, stops, progress, names) {
  const helping = plan.helping;
  const mainRoute = plan.mine[0] || null;
  const when = sel.isToday ? `hoy, ${sel.day.toLowerCase()}` : `${sel.day.toLowerCase()} ${isoToLabel(sel.iso)}`;
  let title;
  if (helping) {
    title = `Acompañás a ${esc(personName(helping.paseador, names) || "un paseador sin asignar")} en ${esc(helping.ruta)}`;
  } else if (mainRoute) {
    title = plan.mine.length > 1 ? `Tus rutas de ${when}: ${esc(listNames(plan.mine.map((route) => route.ruta)))}` : `Tu ruta de ${when}: ${esc(mainRoute.ruta)}`;
  } else {
    title = `Rutas de ${when} · turno ${sel.shift.toLowerCase()}`;
  }
  const hello = `Hola, ${esc(walkerName())}`;
  const kicker = sel.isToday ? `${hello} · ${sel.now.date} · turno ${sel.shift.toLowerCase()}` : `${hello} · Planificación: no es hoy`;
  const supervisors = [...new Set(plan.shown.map((route) => route.supervisor).filter(Boolean))];
  const supervisor = supervisors.length ? listNames(supervisors) : SHIFT_BY_LABEL[sel.shift].supervisor;
  const hours = routeHours(plan.shown) || shiftHours(sel.shift);
  const flagged = stops.filter((stop) => stop.dog.status !== "Activo");
  const conflicts = conflictsFor(stops.map((stop) => stop.dog));

  const people = [];
  if (plan.assigned && plan.shown.length === 1) {
    const route = plan.shown[0];
    if (helping) people.push(`<li>Paseador: <b>${esc(personName(route.paseador, names) || PENDIENTE)}</b></li>`);
    else people.push(`<li>Ayudante: ${route.ayudante ? `<b>${esc(personName(route.ayudante, names))}</b>` : "sin ayudante"}</li>`);
  }

  return `
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${kicker}</p>
          <h1 id="pw-today-title" tabindex="-1">${title}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${stops.length}</b> ${stops.length === 1 ? "perro" : "perros"}</li>
            <li>${esc(hours)}</li>
            <li>Supervisa: ${esc(supervisor)}</li>
            ${people.join("")}
          </ul>
        </div>
        <div class="pw-today-actions">
          ${sel.isToday ? "" : `
            <button class="pw-btn pw-btn--primary" type="button" data-pw-today>
              ${icon("calendarCheck", "pw-icon")}
              Volver a hoy
            </button>
          `}
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${view.pickerOpen}" aria-controls="pw-picker">
            ${icon("sliders", "pw-icon")}
            ${view.pickerOpen ? "Cerrar selector" : "Cambiar día o turno"}
          </button>
        </div>
      </div>
      ${view.pickerOpen ? Picker(sel) : ""}
      ${plan.fromPlanilla ? `
        <p class="pw-source pw-source--warn">${icon("alertCircle", "pw-icon")}<span><b>Ruta tomada de la planilla, falta que el coordinador la confirme.</b> Horarios de BASE RUTAS (12/11/2026).</span></p>
      ` : ""}
      ${RoutePicker(sel, plan)}
      ${Priorities(sel, stops, flagged, conflicts, progress)}
    </section>
  `;
}

// "¿En qué ruta estás hoy?": solo si el usuario no figura en ninguna ruta del turno.
function RoutePicker(sel, plan) {
  const parts = [];
  if (!plan.assigned && plan.elsewhere.length) {
    const other = plan.elsewhere[0];
    parts.push(`
      <p class="pw-source">
        ${icon("route", "pw-icon")}
        <span>${sel.isToday ? "Hoy" : "Ese día"} figurás en la ruta <b>${esc(other.ruta)}</b> (turno ${other.turno.toLowerCase()}).</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-shift="${other.turno}">Ver turno ${other.turno.toLowerCase()}</button>
      </p>
    `);
  }
  if (!plan.assigned && plan.ofShift.length) {
    parts.push(`
      <div class="pw-route-pick" role="group" aria-labelledby="pw-route-pick-label">
        <p id="pw-route-pick-label"><strong>¿En qué ruta estás ${sel.isToday ? "hoy" : "ese día"}?</strong>
          <span>No figurás como paseador ni ayudante en este turno. Si es un error, avisale al coordinador.</span></p>
        ${plan.ofShift.length > 1 ? `
          <div class="pw-route-chips">
            ${plan.ofShift.map((route) => `
              <button type="button" class="pw-chip pw-chip--wide ${plan.picked === route.ruta ? "is-active" : ""}" data-pw-route="${esc(route.ruta)}" aria-pressed="${plan.picked === route.ruta}">
                ${esc(route.ruta)}<small>${route.stops.length} ${route.stops.length === 1 ? "perro" : "perros"}${route.paseador ? ` · ${esc(personName(route.paseador))}` : ""}</small>
              </button>
            `).join("")}
            <button type="button" class="pw-chip pw-chip--wide ${plan.picked ? "" : "is-active"}" data-pw-route="" aria-pressed="${!plan.picked}">
              Todas<small>${plan.ofShift.length} rutas</small>
            </button>
          </div>
          <p class="pw-muted pw-small">Lo que elijas queda recordado en este celular.</p>
        ` : ""}
      </div>
    `);
  }
  return parts.join("");
}

function Picker(sel) {
  const short = { Lunes: "Lun", Martes: "Mar", Miércoles: "Mié", Jueves: "Jue", Viernes: "Vie", Sábado: "Sáb", Domingo: "Dom" };
  return `
    <div class="pw-picker" id="pw-picker">
      <div class="pw-picker-group" role="group" aria-label="Día">
        <span class="pw-picker-label">Día</span>
        <div class="pw-days">
          ${WEEK_DAYS.map((day) => `
            <button type="button" class="pw-chip ${day === sel.day ? "is-active" : ""}" data-pw-day="${day}" aria-pressed="${day === sel.day}" aria-label="${day}${day === sel.now.day ? " (hoy)" : ""}">
              ${short[day]}${day === sel.now.day ? "<small>hoy</small>" : ""}
            </button>
          `).join("")}
        </div>
      </div>
      <div class="pw-picker-group" role="group" aria-label="Turno">
        <span class="pw-picker-label">Turno</span>
        <div class="pw-shifts">
          ${["Mañana", "Tarde"].map((shift) => `
            <button type="button" class="pw-chip pw-chip--wide ${shift === sel.shift ? "is-active" : ""}" data-pw-shift="${shift}" aria-pressed="${shift === sel.shift}">
              ${shift}<small>${shiftHours(shift)}</small>
            </button>
          `).join("")}
        </div>
      </div>
    </div>
  `;
}

// Máximo 3 prioridades, de la más urgente a la menos urgente.
function Priorities(sel, stops, flagged, conflicts, progress) {
  const items = [];
  const dogs = stops.map((stop) => stop.dog);

  if (conflicts.length) {
    items.push({
      kind: "danger",
      icon: "alertTriangle",
      title: "No juntar en el mismo grupo",
      text: `${groupConflicts(conflicts).join(". ")}.`,
      goto: "pw-perros",
      button: "Ver perros",
    });
  }

  const muzzled = dogs.filter(usesMuzzle);
  if (muzzled.length) {
    const short = !isHelper() && muzzled.length > MY_MUZZLES;
    items.push({
      kind: "warn",
      icon: "shieldCheck",
      title: `Bozal: ${listNames(muzzled.map((dog) => dog.name))}`,
      text: short
        ? `Según el inventario tenés ${MY_MUZZLES} ${MY_MUZZLES === 1 ? "bozal" : "bozales"}. Confirmá con Juan antes de salir.`
        : "Llevá el bozal puesto en cada uno durante todo el paseo.",
      goto: "pw-equipo",
      button: "Ver equipo",
    });
  }

  if (flagged.length) {
    items.push({
      kind: "warn",
      icon: "alertCircle",
      title: `Confirmar antes de retirar: ${listNames(flagged.map((stop) => stop.dog.name))}`,
      text: flagged.length === 1
        ? `Figura en la ruta con estado "${esc(flagged[0].dog.status)}". No lo retires sin confirmarlo con el coordinador o con Juan.`
        : "Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con el coordinador o con Juan.",
      goto: "pw-perros",
      button: "Ver perros",
    });
  }

  if (sel.isToday && stops.length) {
    const checked = checklistFor(sel.now.iso, sel.shift).checked.length;
    const totals = routeTotals(stops, progress);
    if (checked < MY_EQUIPMENT.length) {
      items.push({
        kind: "info",
        icon: "clipboardCheck",
        title: `Equipo: ${checked} de ${MY_EQUIPMENT.length} listo`,
        text: "Revisá el equipo antes de retirar al primer perro.",
        goto: "pw-equipo",
        button: "Ir al equipo",
      });
    } else {
      items.push({
        kind: totals.closed ? "ok" : "info",
        icon: totals.closed ? "checkCircle" : "pawPrint",
        title: `Entregados: ${totals.delivered} de ${totals.toWalk}${totals.noSale ? ` · ${totals.noSale} no ${totals.noSale === 1 ? "sale" : "salen"}` : ""}`,
        text: totals.closed ? "Turno completo. ¡Buen trabajo!" : "Equipo listo. Marcá cada retiro, paseo y entrega.",
        goto: "pw-perros",
        button: "Ver perros",
      });
    }
  }

  if (!items.length) return "";

  return `
    <div class="pw-priorities">
      <h2 class="pw-section-label">Lo primero</h2>
      <ol class="pw-prio-list">
        ${items.slice(0, 3).map((item) => `
          <li>
            <button class="pw-prio pw-prio--${item.kind}" type="button" data-pw-goto="${item.goto}">
              <span class="pw-prio-icon" aria-hidden="true">${icon(item.icon, "pw-icon")}</span>
              <span class="pw-prio-text">
                <strong>${item.title}</strong>
                <span>${item.text}</span>
                <span class="pw-prio-go">${item.button} ${icon("arrowRight", "pw-icon pw-icon--sm")}</span>
              </span>
            </button>
          </li>
        `).join("")}
      </ol>
    </div>
  `;
}

function sourceText(route, names) {
  if (route.fuente === "dia") {
    const who = route.record.actualizadoPor ? whoName(route.record.actualizadoPor, names) : "";
    const time = route.record.actualizadoEn ? timeAR(route.record.actualizadoEn) : "";
    return `Cambio del día${who ? ` cargado por ${who}` : ""}${time ? ` a las ${time}` : ""}.`;
  }
  if (route.fuente === "plantilla") return "Plantilla semanal del coordinador.";
  return "Planilla RPJ (sin confirmar).";
}

// El próximo paso de la ruta, bien grande: primero los retiros pendientes, después las entregas.
function NextUp(route, sel, progress) {
  const ready = route.stops.filter((stop) => stop.canSave);
  if (!route.stops.length) return "";
  if (!sel.isToday) {
    const first = route.stops[0];
    return `
      <div class="pw-next" data-pw-next="${esc(route.ruta)}">
        <p class="pw-next-label">Primer retiro</p>
        <p class="pw-next-main">${esc(first.dog.name)}${first.hora ? ` · ${esc(first.hora)}` : ""}</p>
      </div>
    `;
  }
  const pending = ready.filter((stop) => !stateOf(progress, stop).noSale && stateOf(progress, stop).step === 0);
  const walking = ready.filter((stop) => {
    const state = stateOf(progress, stop);
    return !state.noSale && state.step > 0 && state.step < STEPS.length;
  });
  let group;
  let label;
  let hora;
  let mode;
  if (pending.length) {
    hora = pending[0].hora;
    group = pending.filter((stop) => stop.hora === hora);
    label = "Próximo";
    mode = "retiro";
  } else if (walking.length) {
    const sorted = [...walking].sort((a, b) => String(a.salida || "99:99").localeCompare(String(b.salida || "99:99")));
    hora = sorted[0].salida;
    group = sorted.filter((stop) => stop.salida === hora);
    label = "Próxima entrega";
    mode = "entrega";
  } else {
    return `
      <div class="pw-next pw-next--done" data-pw-next="${esc(route.ruta)}">
        <p class="pw-next-label">${esc(route.ruta)}</p>
        <p class="pw-next-main">${icon("checkCircle", "pw-icon pw-icon--lg")} Ruta completa</p>
      </div>
    `;
  }
  const late = countdown(hora, sel.now.minutes, mode).kind === "late";
  return `
    <div class="pw-next ${late ? "is-late" : ""}" data-pw-next="${esc(route.ruta)}">
      <p class="pw-next-label">${mode === "entrega" ? "Todos retirados · próxima entrega prevista" : "Retiro que sigue"}</p>
      <p class="pw-next-main">${label === "Próximo" ? "Próximo: " : ""}${esc(listNames(group.map((stop) => stop.dog.name)))}${hora ? ` · ${esc(hora)}` : ""}</p>
      <p class="pw-next-time">${Countdown(hora, sel.now.minutes, mode)}</p>
      <div class="pw-next-actions">
        ${group.map((stop) => {
          const state = stateOf(progress, stop);
          return `
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-from-next="${esc(route.ruta)}" data-pw-step="${esc(stop.dog.id)}" ${loaded.ready ? "" : 'aria-disabled="true"'}>
              ${loaded.ready ? `${STEPS[state.step].action}${group.length > 1 ? `: ${esc(stop.dog.name)}` : ""}` : "Cargando lo marcado…"}
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function RouteSection(route, sel, plan, progress, names) {
  const dogs = route.stops.map((stop) => stop.dog);
  const conflicts = conflictsFor(dogs);
  const totals = routeTotals(route.stops, progress);
  const percent = totals.toWalk ? Math.round((totals.delivered / totals.toWalk) * 100) : 100;
  const headingId = `pw-ruta-${route.ruta.replace(/[^a-z0-9]+/gi, "-")}`;
  const others = [];
  if (!plan.helping && route.paseador && !isMe(route.paseador)) others.push(`Paseador: ${personName(route.paseador, names)}`);
  if (plan.helping && route.ayudante && !isMe(route.ayudante)) others.push(`Ayudante: ${personName(route.ayudante, names)}`);
  if (!plan.assigned && route.ayudante) others.push(`Ayudante: ${personName(route.ayudante, names)}`);

  return `
    <section class="pw-section pw-route" aria-labelledby="${headingId}">
      <div class="pw-section-head">
        <div>
          <h2 id="${headingId}">Ruta ${esc(route.ruta)} <span class="pw-count">${route.stops.length}</span></h2>
          <p class="pw-muted">${esc(sourceText(route, names))} En orden, con la hora de retiro.${others.length ? ` ${esc(others.join(" · "))}.` : ""}</p>
          ${route.notas ? `<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${esc(route.notas)}</p>` : ""}
        </div>
        ${sel.isToday && route.stops.length ? `
          <div class="pw-progress" aria-label="Avance de la ruta ${esc(route.ruta)}">
            <strong>${totals.delivered} de ${totals.toWalk} entregados${totals.noSale ? ` · ${totals.noSale} no ${totals.noSale === 1 ? "sale" : "salen"}` : ""}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${percent}%"></span></span>
          </div>
        ` : ""}
      </div>

      ${NextUp(route, sel, progress)}

      ${conflicts.length ? `
        <div class="pw-banner pw-banner--danger" role="alert">
          ${icon("alertTriangle", "pw-icon pw-icon--lg")}
          <div>
            <strong>Hay perros que no se pueden juntar en esta ruta</strong>
            <ul>${groupConflicts(conflicts).map((group) => `<li>${group}</li>`).join("")}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${esc(route.supervisor || SHIFT_BY_LABEL[sel.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      ` : ""}

      ${!sel.isToday && route.stops.length ? `
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      ` : ""}

      ${route.stops.length ? `
        <ol class="pw-dogs" role="list">
          ${route.stops.map((stop, index) => DogCard({ ...stop, route }, index, sel, stateOf(progress, stop), partnersInList(stop.dog, conflicts), names)).join("")}
        </ol>
      ` : `
        <div class="pw-empty">
          <p><strong>Sin perros en ${esc(route.ruta)} para este turno.</strong></p>
          <p>Si te pidieron un paseo, confirmalo con el coordinador.</p>
        </div>
      `}
      <p class="pw-muted pw-legend">
        Categoría operativa: <b>SIN EVALUAR</b> salvo que se indique otra. ${esc(CATEGORIES["SIN EVALUAR"])}
        Fuente: Registro maestro, 14/08/2026.
      </p>
    </section>
  `;
}

// Nota de la ruta que no repite lo que ya dicen las alertas del perro.
function stopNote(stop) {
  if (!stop.nota) return "";
  if (/^bozal$/i.test(stop.nota) && usesMuzzle(stop.dog)) return "";
  if (/^no juntar/i.test(stop.nota) && stop.dog.safety.some((text) => safetyKind(text) === "danger")) return "";
  return stop.nota;
}

function DogCard(stop, index, sel, state, partners, names) {
  const { dog } = stop;
  const { times, noSale, record } = state;
  const step = Math.min(state.step, STEPS.length);
  const done = !noSale && step >= STEPS.length;
  const change = lastChange(record, names);
  const ownNoJuntar = dog.safety.filter((text) => safetyKind(text) === "danger").join(" ");
  const extraPartners = partners.filter((name) => !ownNoJuntar.includes(name));
  const alerts = dog.safety.filter((text) => safetyKind(text) !== "info");
  const notes = dog.safety.filter((text) => safetyKind(text) === "info");
  const flagged = dog.status !== "Activo";
  const hasAlert = alerts.length || partners.length || flagged;
  const note = stopNote(stop);
  const minutes = stop.minutos || dog.minutes;
  const canAct = sel.isToday && stop.canSave;

  let timing = "";
  if (sel.isToday && !noSale && !done && stop.canSave) {
    timing = step === 0 ? Countdown(stop.hora, sel.now.minutes, "retiro") : stop.salida ? Countdown(stop.salida, sel.now.minutes, "entrega") : "";
  }

  return `
    <li class="pw-dog ${hasAlert ? "has-alert" : ""} ${done ? "is-done" : ""} ${noSale ? "is-nosale" : ""}" data-pw-dog="${esc(dog.id)}">
      <div class="pw-dog-time">
        <span class="pw-dog-order" aria-label="Orden ${index + 1}">${index + 1}</span>
        <span class="pw-dog-hora">${stop.hora ? `${icon("clock", "pw-icon pw-icon--sm")} Retiro ${esc(stop.hora)}` : `Hora de retiro: ${PENDIENTE.toLowerCase()}`}</span>
        ${timing}
      </div>
      <div class="pw-dog-head">
        <h3>${esc(dog.name)}</h3>
        <span class="pw-dog-facts">${esc(dog.size)} · ${minutes ? `${minutes} min` : `Duración: ${PENDIENTE.toLowerCase()}`}${stop.salida ? ` · vuelve ~${esc(stop.salida)}` : ""}</span>
      </div>

      ${hasAlert ? `
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${esc(dog.name)}">
          ${flagged ? `
            <li class="pw-alert pw-alert--warn">
              ${icon("alertCircle", "pw-icon")}
              <span>${esc(dog.status)}: ${esc(dog.review || "su estado no es Activo.")} Confirmalo con el coordinador o con Juan antes de retirarlo.</span>
            </li>
          ` : ""}
          ${alerts.map((text) => `
            <li class="pw-alert pw-alert--${safetyKind(text)}">
              ${icon(safetyKind(text) === "danger" ? "alertTriangle" : "shieldCheck", "pw-icon")}
              <span>${esc(text)}${safetyKind(text) === "danger" && partners.length ? `<b class="pw-today-tag">En esta ruta: ${listNames(partners)}</b>` : ""}</span>
            </li>
          `).join("")}
          ${extraPartners.length ? `
            <li class="pw-alert pw-alert--danger">
              ${icon("alertTriangle", "pw-icon")}
              <span>No juntar con ${listNames(extraPartners)}<b class="pw-today-tag">En esta ruta</b></span>
            </li>
          ` : ""}
        </ul>
      ` : ""}

      ${notes.map((text) => `<p class="pw-dog-note">${icon("users", "pw-icon pw-icon--sm")} ${esc(text)}</p>`).join("")}
      ${note ? `<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${esc(note)}</p>` : ""}
      ${dog.review && !flagged ? `<p class="pw-dog-review"><b>Dato a confirmar:</b> ${esc(dog.review)}</p>` : ""}
      ${dog.unknown ? `<p class="pw-dog-review"><b>Perro nuevo en la ruta:</b> sin ficha en esta página (tamaño y alertas: ${PENDIENTE.toLowerCase()}). Preguntale al coordinador.</p>` : ""}
      <p class="pw-dog-category"><span>${esc(dog.category || "SIN EVALUAR")}</span> ${dog.unknown ? PENDIENTE : "Registro maestro 14/08/2026"}</p>

      ${sel.isToday && !stop.canSave ? `
        <p class="pw-note">Este perro no tiene identificador en la ruta: no se puede marcar. Avisale al coordinador.</p>
      ` : ""}

      ${canAct ? `
        ${noSale ? `
          <p class="pw-nosale-label">${icon("x", "pw-icon")} No sale en este turno</p>
        ` : `
          <ol class="pw-steps" aria-label="Avance de ${esc(dog.name)}">
            ${STEPS.map((item, stepIndex) => {
              const marker = stepIndex < step ? markerOf(record, stepIndex, names) : "";
              return `
                <li class="${stepIndex < step ? "is-done" : ""} ${stepIndex === step ? "is-next" : ""}">
                  <span class="pw-step-dot" aria-hidden="true">${stepIndex < step ? icon("checkCircle", "pw-icon pw-icon--sm") : stepIndex + 1}</span>
                  <span>${item.label}${stepIndex < step ? `<small>${times[stepIndex] ? esc(times[stepIndex]) : "Sin hora"}</small>` : ""}${marker ? `<small class="pw-marker">Marcó ${esc(marker)}</small>` : ""}</span>
                  <span class="pw-sr">${stepIndex < step ? "hecho" : "pendiente"}</span>
                </li>
              `;
            }).join("")}
          </ol>
        `}
        ${record?.nota ? `<p class="pw-dog-nota"><b>Nota:</b> ${esc(record.nota)}</p>` : ""}
        ${change ? `<p class="pw-dog-change ${record.pendiente ? "is-pending" : ""}">${esc(change)}</p>` : ""}
        <div class="pw-dog-actions">
          ${noSale ? "" : done ? `
            <p class="pw-done-label">${icon("checkCircle", "pw-icon")} Entregado ${esc(times[STEPS.length - 1])}</p>
          ` : `
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${esc(dog.id)}" ${loaded.ready ? "" : 'aria-disabled="true"'}>
              ${loaded.ready ? STEPS[step].action : "Cargando lo marcado…"}
            </button>
          `}
          ${!noSale && step === 0 ? `
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${esc(dog.id)}" ${loaded.ready ? "" : 'aria-disabled="true"'} aria-label="${esc(dog.name)} no sale en este turno">No sale</button>
          ` : ""}
          ${noSale || step > 0 ? `
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${esc(dog.id)}" aria-label="Deshacer el último paso de ${esc(dog.name)}">Deshacer</button>
          ` : ""}
        </div>
      ` : ""}
    </li>
  `;
}

function EquipmentSection(sel, plan, names) {
  const { checked, record } = checklistFor(sel.now.iso, sel.shift);
  const complete = checked.length >= MY_EQUIPMENT.length;
  const change = lastChange(record, names);
  const partner = plan.helping ? personName(plan.helping.paseador, names) : "";

  return `
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">${isHelper()
            ? `Tu checklist, hoy turno ${sel.shift.toLowerCase()}. El inventario no asigna equipo al ayudante (${PENDIENTE.toLowerCase()}): revisá${partner ? ` con ${esc(partner)}` : ""} que esté todo lo del paseador.`
            : `Tu equipo según el inventario. Hoy, turno ${sel.shift.toLowerCase()}.`}</p>
        </div>
        <span class="pw-count ${complete ? "is-ok" : ""}">${checked.length}/${MY_EQUIPMENT.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${MY_EQUIPMENT.map((row) => {
          const isChecked = checked.includes(row.item);
          const id = `pw-eq-${row.item.toLowerCase().replace(/[^a-z0-9]+/gi, "-")}`;
          return `
            <li>
              <input class="pw-check-input" type="checkbox" id="${id}" data-pw-equip="${esc(row.item)}" ${isChecked ? "checked" : ""} />
              <label class="pw-check" for="${id}">
                <span class="pw-check-box" aria-hidden="true">${icon("checkCircle", "pw-icon")}</span>
                <span class="pw-check-text">${esc(row.item)}</span>
                <span class="pw-check-qty">${row.sebastian}</span>
              </label>
            </li>
          `;
        }).join("")}
      </ul>
      <div class="pw-row">
        ${complete
          ? `<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`
          : `<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      ${change ? `<p class="pw-dog-change ${record?.pendiente ? "is-pending" : ""}">${esc(change)}</p>` : ""}
      <p class="pw-status" role="status">${esc(view.equipStatus)}</p>
      ${OTHER_EQUIPMENT.length ? `
        <p class="pw-muted pw-small">Lo tiene Juan: ${OTHER_EQUIPMENT.map((row) => `${esc(row.item.toLowerCase())} (${row.juan})`).join(", ")}.</p>
      ` : ""}
    </section>
  `;
}

function IncidentSection(sel, dogs) {
  const draft = getDraft();
  const dogNames = [...dogs.map((dog) => dog.name), EXTERNAL_DOG];
  // Si el borrador tiene perros de otro turno, se siguen mostrando para no perderlos.
  draft.dogs.forEach((name) => {
    if (!dogNames.includes(name)) dogNames.unshift(name);
  });
  const message = view.previewOpen ? buildMessage(draft, sel) : null;

  return `
    <section class="pw-section pw-card pw-incident" id="pw-incidente" aria-labelledby="pw-incidente-title" tabindex="-1">
      <div class="pw-section-head">
        <div>
          <h2 id="pw-incidente-title">${icon("alertTriangle", "pw-icon")} Reporte de incidente</h2>
          <p class="pw-muted">Primero la seguridad. El reporte se escribe después.</p>
        </div>
      </div>

      <fieldset class="pw-fieldset pw-protocol">
        <legend>Protocolo, en este orden</legend>
        <ol class="pw-protocol-list">
          ${INCIDENT_PROTOCOL.map((step, index) => {
            const id = `pw-proto-${index}`;
            return `
              <li>
                <input class="pw-check-input" type="checkbox" id="${id}" data-pw-field="protocolo" value="${index}" ${draft.protocolo.includes(index) ? "checked" : ""} />
                <label class="pw-check pw-check--step" for="${id}">
                  <span class="pw-check-box" aria-hidden="true">${icon("checkCircle", "pw-icon")}</span>
                  <span class="pw-check-text"><b>${index + 1}.</b> ${esc(step)}</span>
                </label>
              </li>
            `;
          }).join("")}
        </ol>
        <p class="pw-muted pw-small">Tildá cada paso cuando lo hayas hecho. Queda en el mensaje para Juan.</p>
      </fieldset>

      <fieldset class="pw-fieldset">
        <legend>Perros involucrados <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-toggle-grid">
          ${dogNames.map((name, index) => `
            <span class="pw-toggle">
              <input type="checkbox" id="pw-inc-dog-${index}" data-pw-field="dogs" value="${esc(name)}" ${draft.dogs.includes(name) ? "checked" : ""} />
              <label for="pw-inc-dog-${index}">${esc(name)}</label>
            </span>
          `).join("")}
        </div>
      </fieldset>

      <div class="pw-grid-2">
        <label class="pw-field">Hora
          <input type="time" data-pw-field="hora" value="${esc(draft.hora || sel.now.time)}" />
        </label>
        <label class="pw-field">Lugar
          <input type="text" data-pw-field="lugar" value="${esc(draft.lugar)}" placeholder="Ej.: plaza, esquina (sin domicilios)" autocomplete="off" />
        </label>
      </div>

      <p class="pw-hint">Escribí lo que viste y oíste. Ej.: “tiró de la correa y gruñó”, no “se puso agresivo”.</p>

      <label class="pw-field">Antes: ¿qué estaba pasando?
        <textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto a 3 metros">${esc(draft.antes)}</textarea>
      </label>
      <label class="pw-field">Conducta: ¿qué hizo el perro? <span class="pw-req">(obligatorio)</span>
        <textarea data-pw-field="conducta" rows="2" placeholder="Ej.: se paró en dos patas, ladró y tiró hacia el otro perro">${esc(draft.conducta)}</textarea>
      </label>
      <label class="pw-field">¿Qué hiciste vos?
        <textarea data-pw-field="accion" rows="2" placeholder="Ej.: corté distancia, crucé la calle y lo senté">${esc(draft.accion)}</textarea>
      </label>
      <label class="pw-field">Después: ¿cómo quedó?
        <textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto y siguió el paseo">${esc(draft.despues)}</textarea>
      </label>

      <fieldset class="pw-fieldset">
        <legend>Nivel de riesgo <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-seg pw-seg--risk">
          ${RISK_LEVELS.map((level) => `
            <span class="pw-toggle pw-toggle--${level.toLowerCase()}">
              <input type="radio" name="pw-riesgo" id="pw-riesgo-${level}" data-pw-field="riesgo" value="${level}" ${draft.riesgo === level ? "checked" : ""} />
              <label for="pw-riesgo-${level}">${level}</label>
            </span>
          `).join("")}
        </div>
      </fieldset>

      <fieldset class="pw-fieldset">
        <legend>¿Hay lesiones?</legend>
        <div class="pw-seg">
          ${INJURY_OPTIONS.map((option, index) => `
            <span class="pw-toggle">
              <input type="radio" name="pw-lesiones" id="pw-lesiones-${index}" data-pw-field="lesiones" value="${option}" ${draft.lesiones === option ? "checked" : ""} />
              <label for="pw-lesiones-${index}">${option}</label>
            </span>
          `).join("")}
        </div>
      </fieldset>

      <div class="pw-row">
        <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-generate>
          ${icon("fileText", "pw-icon")}
          Armar mensaje para Juan
        </button>
        <button class="pw-btn pw-btn--ghost ${view.confirmClear ? "is-confirm" : ""}" type="button" data-pw-clear>
          ${view.confirmClear ? "¿Seguro? Tocá de nuevo" : draft.registroId ? "Empezar otro reporte" : "Borrar reporte"}
        </button>
      </div>
      <p class="pw-status ${view.incidentStatus.startsWith("Falta") || view.incidentStatus.startsWith("Cambiá") ? "is-warn" : ""}" role="status" data-pw-incident-status>${esc(view.incidentStatus)}</p>

      ${message && message.ok ? MessagePreview(message.text) : ""}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `;
}

function MessagePreview(text) {
  return `
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${esc(text)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${whatsappHref(text)}" target="_blank" rel="noopener noreferrer">
          ${icon("message", "pw-icon")}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${icon("copy", "pw-icon")}
          Copiar
        </button>
      </div>
    </div>
  `;
}

function whatsappHref(text) {
  return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
}

// ---------- mensaje de incidente ----------

function validateDraft(draft) {
  const missing = [];
  if (!draft.dogs.length) missing.push({ label: "los perros involucrados", focus: '[data-pw-field="dogs"]' });
  if (!draft.conducta.trim()) missing.push({ label: "qué hizo el perro", focus: '[data-pw-field="conducta"]' });
  if (!draft.riesgo) missing.push({ label: "el nivel de riesgo", focus: '[data-pw-field="riesgo"]' });

  const texts = [draft.antes, draft.conducta, draft.accion, draft.despues, draft.lugar].join(" ");
  const word = texts.match(FORBIDDEN_WORDS)?.[0];
  return { missing, word };
}

function buildMessage(draft, sel) {
  const { missing, word } = validateDraft(draft);
  if (missing.length || word) return { ok: false, missing, word };

  const shift = shiftByClock(sel.now);
  const team = incidentTeam();
  const line = (label, value) => `${label}: ${value.trim() ? value.trim() : "Sin dato"}`;
  const protocol = protocolLines(draft).map((text) => `- ${text}`);

  const text = [
    "REPORTE DE INCIDENTE - Paseos Juan",
    `Fecha: ${sel.now.date} · Hora: ${draft.hora || sel.now.time} · Turno: ${shift.toLowerCase()}`,
    isHelper() ? `Ayudante de paseador: ${walkerName()}${team.paseador ? ` (con ${team.paseador})` : ""}` : `Paseador: ${walkerName()}`,
    `Ruta: ${team.rutas || PENDIENTE}`,
    `Perros: ${draft.dogs.join(", ")}`,
    `Nivel de riesgo: ${draft.riesgo}`,
    line("Lesiones", draft.lesiones),
    line("Lugar", draft.lugar),
    "",
    line("Antes", draft.antes),
    line("Conducta observada", draft.conducta),
    line("Qué hice", draft.accion),
    line("Después", draft.despues),
    "",
    "Protocolo:",
    ...protocol,
  ].join("\n");

  return { ok: true, text };
}

function protocolLines(draft) {
  return INCIDENT_PROTOCOL.map((step, index) => {
    const short = step.split(/[:.]/)[0];
    return `${draft.protocolo.includes(index) ? "Hecho" : "Pendiente"}: ${short}`;
  });
}

// Registro para la colección `incidentes` (mismos datos que el mensaje de WhatsApp).
// Ruta y paseador del turno actual, para el mensaje y el registro del incidente.
function incidentTeam() {
  const sel = selection();
  const plan = routePlan({ ...sel, day: sel.now.day, iso: sel.now.iso, isToday: true, shift: shiftByClock(sel.now) });
  const names = teamNames(sel.now.iso);
  return {
    rutas: plan.shown.map((route) => route.ruta).join(", "),
    paseador: plan.helping ? personName(plan.helping.paseador, names) : "",
  };
}

function incidentRecord(draft, sel) {
  const ids = draft.dogs.map((name) => REAL_DOGS.find((dog) => dog.name === name)?.id).filter(Boolean);
  const names = draft.dogs.join(", ");
  return {
    ...(draft.registroId ? { id: draft.registroId } : {}),
    fecha: sel.now.iso,
    hora: draft.hora || sel.now.time,
    perros: ids,
    perroNombre: names,
    lugar: draft.lugar.trim(),
    antes: draft.antes.trim(),
    conducta: draft.conducta.trim(),
    accion: draft.accion.trim(),
    despues: draft.despues.trim(),
    riesgo: draft.riesgo,
    lesiones: draft.lesiones,
    protocolo: protocolLines(draft),
    ruta: incidentTeam().rutas,
    titulo: `Incidente: ${names} · riesgo ${draft.riesgo.toLowerCase()}`,
  };
}

function setIncidentStatus(message, warn = false) {
  view.incidentStatus = message;
  const status = document.querySelector("[data-pw-incident-status]");
  if (status) {
    status.textContent = message;
    status.classList.toggle("is-warn", warn);
  }
  announce(message);
}

// Guarda el incidente en la app. Si ya se guardó ese mismo texto, no hace nada;
// si se corrigió, actualiza el mismo registro (no crea otro).
function saveIncident(draft, text) {
  if (view.incidentSavedText === text) return Promise.resolve(null);
  view.incidentSavedText = text;
  const sel = selection();
  return saveShared("incidentes", () => incidentRecord({ ...draft, registroId: getDraft().registroId || draft.registroId }, sel)).then((saved) => {
    if (!saved) {
      view.incidentSavedText = "";
      return null;
    }
    const stored = readJSON(INCIDENT_KEY, null);
    if (stored) writeJSON(INCIDENT_KEY, { ...stored, registroId: saved.id });
    setIncidentStatus(saved.pendiente
      ? "Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp."
      : "Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.");
    return saved;
  });
}

function readDraftFromForm() {
  const draft = getDraft();
  const root = document.getElementById("pw-incidente");
  if (!root) return draft;
  ["hora", "lugar", "antes", "conducta", "accion", "despues"].forEach((name) => {
    const field = root.querySelector(`[data-pw-field="${name}"]`);
    if (field) draft[name] = field.value;
  });
  draft.dogs = [...root.querySelectorAll('[data-pw-field="dogs"]:checked')].map((input) => input.value);
  draft.protocolo = [...root.querySelectorAll('[data-pw-field="protocolo"]:checked')].map((input) => Number(input.value));
  draft.riesgo = root.querySelector('[data-pw-field="riesgo"]:checked')?.value || "";
  draft.lesiones = root.querySelector('[data-pw-field="lesiones"]:checked')?.value || "";
  return draft;
}

function saveDraftFromForm() {
  const draft = readDraftFromForm();
  writeJSON(INCIDENT_KEY, draft);
  return draft;
}

// Si el mensaje ya está a la vista, se actualiza mientras Sebastián corrige el reporte.
function refreshPreview(draft) {
  if (!view.previewOpen) return;
  const result = buildMessage(draft, selection());
  const box = document.querySelector("[data-pw-preview]");
  const status = document.querySelector("[data-pw-incident-status]");
  if (!result.ok) {
    box?.remove();
    view.previewOpen = false;
    view.incidentStatus = "Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.";
    if (status) {
      status.textContent = view.incidentStatus;
      status.classList.add("is-warn");
    }
    return;
  }
  const textarea = document.querySelector("[data-pw-message]");
  const link = document.querySelector("[data-pw-whatsapp]");
  if (textarea) textarea.value = result.text;
  if (link) link.href = whatsappHref(result.text);
}

// ---------- foco y anuncios ----------

function announce(message) {
  let live = document.getElementById("pw-live");
  if (!live) {
    live = document.createElement("div");
    live.id = "pw-live";
    live.className = "pw-sr";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("role", "status");
    document.body.appendChild(live);
  }
  live.textContent = "";
  requestAnimationFrame(() => {
    live.textContent = message;
  });
}

// Errores: región aparte, fuera de la página, para que el lector de pantalla los lea siempre.
function announceError(message) {
  let live = document.getElementById("pw-live-error");
  if (!live) {
    live = document.createElement("div");
    live.id = "pw-live-error";
    live.className = "pw-sr";
    live.setAttribute("aria-live", "assertive");
    live.setAttribute("role", "alert");
    document.body.appendChild(live);
  }
  live.textContent = "";
  requestAnimationFrame(() => {
    live.textContent = message;
  });
}

// Selector para volver a encontrar el control con foco después de redibujar.
const FOCUS_ATTRS = ["data-pw-from-next", "data-pw-route", "data-pw-step", "data-pw-undo", "data-pw-nosale", "data-pw-equip", "data-pw-day", "data-pw-shift"];

function focusSelectorFor(element) {
  if (!element || element === document.body || !element.closest?.(".pw-shell")) return "";
  if (element.id) return `#${CSS.escape(element.id)}`;
  const attr = FOCUS_ATTRS.find((name) => element.hasAttribute(name));
  if (attr) return `[${attr}="${CSS.escape(element.getAttribute(attr))}"]${attr === "data-pw-step" ? ":not([data-pw-from-next])" : ""}`;
  const field = element.dataset.pwField;
  if (field) {
    return element.type === "checkbox" || element.type === "radio"
      ? `[data-pw-field="${field}"][value="${CSS.escape(element.value)}"]`
      : `[data-pw-field="${field}"]`;
  }
  const other = [...element.attributes].find((item) => item.name.startsWith("data-pw-"));
  return other ? `[${other.name}]` : "";
}

// Redibuja por datos nuevos (del servidor, de la cola o del supervisor) sin perder
// el foco ni lo que se estaba escribiendo.
function softRender() {
  const active = document.activeElement;
  const selector = focusSelectorFor(active);
  const caret = active && typeof active.selectionStart === "number" ? [active.selectionStart, active.selectionEnd] : null;
  render();
  if (!selector) return;
  const target = document.querySelector(selector);
  if (!target) return;
  target.focus({ preventScroll: true });
  if (caret && typeof target.setSelectionRange === "function") {
    try {
      target.setSelectionRange(caret[0], caret[1]);
    } catch {
      // Algunos campos (hora) no tienen cursor.
    }
  }
}

let renderTimer = 0;

function scheduleRender() {
  clearTimeout(renderTimer);
  // Un poco de espera junta varios avisos seguidos y deja que la cola actualice su cuenta.
  renderTimer = setTimeout(() => {
    if (document.querySelector(".pw-shell")) softRender();
  }, 80);
}

// Vuelve a dibujar la página y devuelve el foco al control que se tocó.
function rerender(focusSelector) {
  render();
  if (!focusSelector) return;
  const target = document.querySelector(focusSelector);
  target?.focus({ preventScroll: true });
}

function scrollBehavior() {
  return document.documentElement.dataset.motion === "calm" ? "auto" : "smooth";
}

function goTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  target.focus({ preventScroll: true });
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.querySelector("[data-pw-message]");
    if (!textarea) return false;
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    }
  }
}

// ---------- eventos ----------

function handlePaseadorClick(event) {
  if (!event.target.closest(".pw-shell")) return false;

  if (event.target.closest("[data-pw-logout]")) {
    navigate("/salir");
    return true;
  }

  if (event.target.closest("[data-pw-dismiss-error]")) {
    view.syncError = "";
    rerender("#pw-today-title");
    return true;
  }

  const goto = event.target.closest("[data-pw-goto]");
  if (goto) {
    goTo(goto.dataset.pwGoto);
    return true;
  }

  if (event.target.closest("[data-pw-picker]")) {
    view.pickerOpen = !view.pickerOpen;
    rerender("[data-pw-picker]");
    return true;
  }

  const dayButton = event.target.closest("[data-pw-day]");
  if (dayButton) {
    const now = nowAR();
    const day = dayButton.dataset.pwDay;
    view.day = day === now.day ? null : day;
    rerender(`[data-pw-day="${day}"]`);
    announce(`Mostrando ${day.toLowerCase()}.`);
    return true;
  }

  const shiftButton = event.target.closest("[data-pw-shift]");
  if (shiftButton) {
    view.shift = shiftButton.dataset.pwShift;
    rerender(`[data-pw-shift="${view.shift}"]`);
    announce(`Mostrando el turno ${view.shift.toLowerCase()}.`);
    return true;
  }

  if (event.target.closest("[data-pw-today]")) {
    view.day = null;
    view.shift = null;
    view.pickerOpen = false;
    rerender("#pw-today-title");
    announce("Mostrando hoy.");
    return true;
  }

  if (event.target.closest("[data-pw-change-ok]")) {
    view.routeChange = null;
    rerender("#pw-today-title");
    return true;
  }

  const routeButton = event.target.closest("[data-pw-route]");
  if (routeButton) {
    const sel = selection();
    const ruta = routeButton.dataset.pwRoute;
    savePickedRoute(sel, ruta);
    rerender(`[data-pw-route="${CSS.escape(ruta)}"]`);
    announce(ruta ? `Mostrando la ruta ${ruta}. Queda recordada en este celular.` : "Mostrando todas las rutas del turno.");
    return true;
  }

  const stepButton = event.target.closest("[data-pw-step]");
  if (stepButton) {
    const id = stepButton.dataset.pwStep;
    const fromNext = stepButton.dataset.pwFromNext;
    const sel = selection();
    const stop = findStop(sel, id);
    if (!sel.isToday || !stop?.canSave || !loaded.ready) return true;
    const dog = stop.dog;
    const state = progressFor(sel.now.iso, sel.shift, [dog])[id];
    if (state.noSale || state.step >= STEPS.length) return true;
    const next = STEPS[state.step];
    const user = currentUser();
    // Se mandan también las horas (y quién las marcó) anteriores: si no hay señal, la cola guarda el registro completo.
    const changes = { estado: next.estado };
    STEPS.forEach((item, index) => {
      if (index >= state.step) return;
      changes[item.field] = state.times[index];
      if (state.record?.[`${item.field}Por`]) {
        changes[`${item.field}Por`] = state.record[`${item.field}Por`];
        changes[`${item.field}PorNombre`] = state.record[`${item.field}PorNombre`] || "";
      }
    });
    changes[next.field] = sel.now.time;
    changes[`${next.field}Por`] = user.usuario || "";
    changes[`${next.field}PorNombre`] = user.nombre || "";
    savePaseo(stop, sel, changes, `${dog.name}: ${next.done.toLowerCase()} a las ${sel.now.time}.`);
    if (fromNext) {
      render();
      const target = document.querySelector(`[data-pw-from-next="${CSS.escape(fromNext)}"]`) || document.querySelector(`[data-pw-next="${CSS.escape(fromNext)}"]`)?.closest("section")?.querySelector("h2");
      if (target && !target.hasAttribute("tabindex") && target.tagName === "H2") target.setAttribute("tabindex", "-1");
      target?.focus({ preventScroll: true });
    } else {
      rerender(state.step + 1 >= STEPS.length ? `[data-pw-undo="${CSS.escape(id)}"]` : `[data-pw-step="${CSS.escape(id)}"]:not([data-pw-from-next])`);
    }
    return true;
  }

  const noSaleButton = event.target.closest("[data-pw-nosale]");
  if (noSaleButton) {
    const id = noSaleButton.dataset.pwNosale;
    const sel = selection();
    const stop = findStop(sel, id);
    if (!sel.isToday || !stop?.canSave || !loaded.ready) return true;
    savePaseo(stop, sel, { estado: NO_SALE }, `${stop.dog.name}: no sale en este turno.`);
    rerender(`[data-pw-undo="${CSS.escape(id)}"]`);
    return true;
  }

  const undoButton = event.target.closest("[data-pw-undo]");
  if (undoButton) {
    const id = undoButton.dataset.pwUndo;
    const sel = selection();
    const stop = findStop(sel, id);
    if (!sel.isToday || !stop?.canSave || !loaded.ready) return true;
    const dog = stop.dog;
    const state = progressFor(sel.now.iso, sel.shift, [dog])[id];
    if (state.noSale) {
      const back = state.times.reduce((last, time, index) => (time ? index + 1 : last), 0);
      savePaseo(stop, sel, { estado: back ? STEPS[back - 1].estado : "pendiente" }, `${dog.name}: se deshizo "no sale".`);
      rerender(back >= STEPS.length ? `[data-pw-undo="${CSS.escape(id)}"]` : `[data-pw-step="${CSS.escape(id)}"]:not([data-pw-from-next])`);
      return true;
    }
    if (!state.step) return true;
    const keep = state.step - 1;
    const changes = { estado: keep ? STEPS[keep - 1].estado : "pendiente" };
    STEPS.forEach((item, index) => {
      changes[item.field] = index < keep ? state.times[index] : "";
      if (index >= keep) {
        changes[`${item.field}Por`] = "";
        changes[`${item.field}PorNombre`] = "";
      }
    });
    savePaseo(stop, sel, changes, `${dog.name}: se deshizo "${STEPS[keep].done.toLowerCase()}".`);
    rerender(`[data-pw-step="${CSS.escape(id)}"]:not([data-pw-from-next])`);
    return true;
  }

  if (event.target.closest("[data-pw-equip-all]")) {
    const sel = selection();
    saveChecklist(sel, MY_EQUIPMENT.map((row) => row.item));
    view.equipStatus = "Equipo completo. ¡A salir!";
    rerender("[data-pw-equip-reset]");
    announce(view.equipStatus);
    return true;
  }

  if (event.target.closest("[data-pw-equip-reset]")) {
    const sel = selection();
    saveChecklist(sel, []);
    view.equipStatus = "Lista de equipo desmarcada.";
    rerender("[data-pw-equip-all]");
    announce(view.equipStatus);
    return true;
  }

  if (event.target.closest("[data-pw-generate]")) {
    const draft = saveDraftFromForm();
    const result = buildMessage(draft, selection());
    view.confirmClear = false;
    if (!result.ok) {
      view.previewOpen = false;
      view.incidentStatus = result.missing.length
        ? `Falta completar: ${listNames(result.missing.map((item) => item.label))}.`
        : `Cambiá “${result.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`;
      const focus = result.missing.length ? result.missing[0].focus : '[data-pw-field="conducta"]';
      rerender(focus);
      announce(view.incidentStatus);
      return true;
    }
    view.previewOpen = true;
    view.incidentStatus = view.incidentSavedText === result.text
      ? "Mensaje listo. El reporte ya está guardado en la app."
      : "Mensaje listo. Guardando el reporte en la app…";
    rerender("[data-pw-message]");
    announce(view.incidentStatus);
    saveIncident(draft, result.text);
    return true;
  }

  // Al mandar o copiar, si el reporte cambió desde que se guardó, se actualiza en la app.
  if (event.target.closest("[data-pw-whatsapp]")) {
    const draft = getDraft();
    const result = buildMessage(draft, selection());
    if (result.ok) saveIncident(draft, result.text);
    return false;
  }

  if (event.target.closest("[data-pw-copy]")) {
    const text = document.querySelector("[data-pw-message]")?.value || "";
    const draft = getDraft();
    const result = buildMessage(draft, selection());
    if (result.ok) saveIncident(draft, result.text);
    copyText(text).then((ok) => {
      view.incidentStatus = ok ? "Texto copiado. Pegalo en el chat con Juan." : "No se pudo copiar: mantené apretado el texto y copialo a mano.";
      const status = document.querySelector("[data-pw-incident-status]");
      if (status) {
        status.textContent = view.incidentStatus;
        status.classList.toggle("is-warn", !ok);
      }
      announce(view.incidentStatus);
    });
    return true;
  }

  if (event.target.closest("[data-pw-clear]")) {
    if (!view.confirmClear) {
      view.confirmClear = true;
      rerender("[data-pw-clear]");
      return true;
    }
    const wasSaved = Boolean(getDraft().registroId);
    try {
      localStorage.removeItem(INCIDENT_KEY);
    } catch {
      // Nada que borrar.
    }
    view.confirmClear = false;
    view.previewOpen = false;
    view.incidentSavedText = "";
    view.incidentStatus = wasSaved ? "Formulario limpio. El reporte anterior sigue guardado en la app." : "Reporte borrado.";
    rerender("#pw-incidente");
    announce(view.incidentStatus);
    return true;
  }

  if (view.confirmClear && !event.target.closest("[data-pw-clear]")) {
    view.confirmClear = false;
    const clear = document.querySelector("[data-pw-clear]");
    if (clear) {
      clear.textContent = getDraft().registroId ? "Empezar otro reporte" : "Borrar reporte";
      clear.classList.remove("is-confirm");
    }
  }

  return false;
}

function handlePaseadorChange(event) {
  const equip = event.target.closest("[data-pw-equip]");
  if (equip) {
    const sel = selection();
    const { checked } = checklistFor(sel.now.iso, sel.shift);
    const item = equip.dataset.pwEquip;
    const next = equip.checked ? [...new Set([...checked, item])] : checked.filter((value) => value !== item);
    saveChecklist(sel, next);
    view.equipStatus = next.length >= MY_EQUIPMENT.length ? "Equipo completo. ¡A salir!" : "";
    rerender(`[data-pw-equip="${CSS.escape(item)}"]`);
    if (view.equipStatus) announce(view.equipStatus);
    return true;
  }

  if (event.target.closest("[data-pw-field]")) {
    refreshPreview(saveDraftFromForm());
    return true;
  }

  return false;
}

function handlePaseadorInput(event) {
  if (!event.target.closest?.("[data-pw-field]")) return;
  refreshPreview(saveDraftFromForm());
}

export function registerPaseadorEvents() {
  clickHandlers.push(handlePaseadorClick);
  changeHandlers.push(handlePaseadorChange);
  document.addEventListener("input", handlePaseadorInput);
  // Una sola vez: cuando llegan datos nuevos (por ejemplo, lo que marcó el supervisor) se redibuja.
  onDataChange((col) => {
    if (["paseos", "checklists", "incidentes", "rutas", "plantillas", "avisos"].includes(col)) scheduleRender();
  });
  window.addEventListener("online", scheduleRender);
  window.addEventListener("offline", scheduleRender);
  // Cuenta regresiva: cada 15 segundos se actualizan los textos en su lugar (sin redibujar);
  // si cambia el día o el turno según la hora, se redibuja la página.
  setInterval(tickClock, 15 * 1000);
}

const clockState = { iso: "", shift: "", minute: -1 };

function tickClock() {
  if (!document.querySelector(".pw-shell")) return;
  const now = nowAR();
  if (now.iso !== clockState.iso || shiftByClock(now) !== clockState.shift) {
    scheduleRender();
    return;
  }
  if (now.minutes === clockState.minute) return;
  clockState.minute = now.minutes;
  document.querySelectorAll("[data-pw-countdown]").forEach((node) => {
    const cd = countdown(node.dataset.pwCountdown, now.minutes, node.dataset.pwMode);
    node.textContent = cd.text;
    node.className = `pw-cd pw-cd--${cd.kind}`;
    node.closest(".pw-next")?.classList.toggle("is-late", cd.kind === "late");
  });
}
