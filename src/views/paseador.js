// Vista del rol Paseador (Sebastián).
// Pensada para usar en la calle: celular en una mano, correas en la otra, al sol.
// Lo urgente primero, botones grandes, textos cortos.
//
// Datos fijos: src/data/realData.js (planilla RPJ, BASE RUTAS e Inventario de equipamiento).
// Lo que se marca se guarda en los datos compartidos (src/api/client.js, ver
// docs/datos-compartidos.md): avance de cada perro en `paseos`, equipo en `checklists`
// e incidentes en `incidentes`. El supervisor lee y escribe los mismos registros de `paseos`.
// En este celular solo queda el borrador del incidente mientras se escribe.
// No hay datos de tutores en esta página.
import {
  REAL_DOGS,
  dogsForShift,
  todayName,
  EQUIPMENT,
  INCIDENT_PROTOCOL,
  SHIFTS,
  WEEK_DAYS,
  CATEGORIES,
  BUSINESS_INFO,
  DATA_UPDATED,
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

// Cada paso guarda su hora y deja el estado del contrato de `paseos`.
const STEPS = [
  { label: "Retiro", action: "Marcar retirado", done: "Retirado", field: "horaRetiro", estado: "retirado" },
  { label: "Paseo", action: "Marcar en paseo", done: "En paseo", field: "horaPaseo", estado: "paseando" },
  { label: "Entrega", action: "Marcar entregado", done: "Entregado", field: "horaEntrega", estado: "entregado" },
];
const ESTADO_STEP = { pendiente: 0, retirado: 1, paseando: 2, entregado: 3 };
const NO_SALE = "no-sale";
const TURNO_ID = { Mañana: "manana", Tarde: "tarde" };

const SHIFT_BY_LABEL = { Mañana: SHIFTS.manana, Tarde: SHIFTS.tarde };

const RISK_LEVELS = ["Bajo", "Medio", "Alto"];
const INJURY_OPTIONS = ["No se ven", "Sí", "No sé"];
const EXTERNAL_DOG = "Perro externo";
const FORBIDDEN_WORDS = /\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i;

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

// Turno según la hora: mañana hasta las 13:30, después tarde.
function shiftByClock(now) {
  return now.minutes < 13 * 60 + 30 ? "Mañana" : "Tarde";
}

function selection() {
  const now = nowAR();
  const day = view.day || now.day;
  const shift = view.shift || shiftByClock(now);
  return { now, day, shift, isToday: day === now.day };
}

function listNames(names) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

function shiftHours(shift) {
  const data = SHIFT_BY_LABEL[shift];
  return `${data.from} a ${data.to}`;
}

function shiftRoutes(shift) {
  const data = SHIFT_BY_LABEL[shift];
  const routes = data.routes || [data.route];
  return routes.length > 1 ? `Rutas ${listNames(routes)}` : `Ruta ${routes[0]}`;
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

// ---------- datos compartidos (src/api/client.js) ----------

function currentUser() {
  return session.user() || {};
}

function walkerName() {
  return currentUser().nombre || "equipo";
}

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

// Paso alcanzado según el estado y las horas guardadas (lo marque el paseador o el supervisor).
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
  return Object.fromEntries(dogs.map((dog) => [dog.id, paseoState(records.get(paseoId(iso, dog.id, shift)))]));
}

function shiftTotals(active, progress) {
  const noSale = active.filter((dog) => progress[dog.id]?.noSale).length;
  const delivered = active.filter((dog) => !progress[dog.id]?.noSale && progress[dog.id]?.step >= STEPS.length).length;
  return { noSale, delivered, toWalk: active.length - noSale, closed: delivered + noSale === active.length };
}

function checklistFor(iso, shift) {
  const record = recordsFor("checklists", iso).get(checklistId(iso, shift));
  const items = record?.items && typeof record.items === "object" ? record.items : {};
  return { record, checked: MY_EQUIPMENT.filter((row) => items[row.item] === true).map((row) => row.item) };
}

// Nombres para "Último cambio": el servidor guarda el usuario de quien cambió y el nombre de quien creó.
function teamNames(iso) {
  const names = new Map();
  ["paseos", "checklists"].forEach((col) => {
    registros.cached(col, { desde: iso }).forEach((record) => {
      if (record.creadoPor && record.creadoPorNombre) names.set(record.creadoPor, record.creadoPorNombre);
    });
  });
  return names;
}

function whoName(usuario, names) {
  if (!usuario) return "Pendiente de confirmar";
  if (usuario === currentUser().usuario) return "vos";
  return names.get(usuario) || usuario;
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

function savePaseo(dog, sel, changes, message) {
  const iso = sel.now.iso;
  const record = { id: paseoId(iso, dog.id, sel.shift), fecha: iso, perroId: dog.id, perroNombre: dog.name, turno: sel.shift, ...changes };
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
// quedan en espera: así un toque apurado no pisa lo que ya marcó el supervisor.
const loaded = { key: "", stops: [], ready: false };

function ensureShared(iso) {
  const key = `${iso}|${currentUser().usuario || ""}`;
  if (loaded.key === key) return;
  loaded.stops.forEach((stop) => stop());
  loaded.key = key;
  loaded.stops = [];
  loaded.ready = false;
  Promise.all([registros.list("paseos", { desde: iso }), registros.list("checklists", { desde: iso })])
    .then(() => migrateLegacy(iso))
    .catch((error) => {
      view.syncError = `No se pudieron traer los datos del equipo: ${error?.message || "error del servidor"}`;
      announceError(view.syncError);
      scheduleRender();
    })
    .finally(() => {
      if (loaded.key !== key) return;
      loaded.ready = true;
      scheduleRender();
      loaded.stops = [registros.watch("paseos", { desde: iso }), registros.watch("checklists", { desde: iso })];
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
  const all = dogsForShift(sel.day, sel.shift);
  const active = all.filter((dog) => dog.status === "Activo");
  const flagged = all.filter((dog) => dog.status !== "Activo");
  const conflicts = conflictsFor(all);
  ensureShared(sel.now.iso);
  const progress = sel.isToday ? progressFor(sel.now.iso, sel.shift, active) : {};

  return `
    <main class="pw-main" id="pw-inicio">
      ${SyncBar()}
      ${TodayCard(sel, active, flagged, conflicts, progress)}
      ${DogsSection(sel, active, flagged, conflicts, progress)}
      <div class="pw-columns">
        ${EquipmentSection(sel)}
        ${IncidentSection(sel, all)}
      </div>
      <footer class="pw-footer">
        <p>Datos: ${esc(BUSINESS_INFO.officialSources.routes)} e Inventario de equipamiento, actualizados el ${DATA_UPDATED}.</p>
        <p>Lo que marcás acá lo ven Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `;
}

function WalkerHeader() {
  return `
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel del paseador">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>Paseador · ${esc(walkerName())}</small>
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

function TodayCard(sel, active, flagged, conflicts, progress) {
  const shiftData = SHIFT_BY_LABEL[sel.shift];
  const title = sel.isToday
    ? `Hoy, ${sel.day.toLowerCase()} · turno ${sel.shift.toLowerCase()}`
    : `${sel.day} · turno ${sel.shift.toLowerCase()}`;
  const hello = `Hola, ${esc(walkerName())}`;
  const kicker = sel.isToday ? `${hello} · ${sel.now.date}` : `${hello} · Planificación: no es hoy`;

  return `
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${kicker}</p>
          <h1 id="pw-today-title">${title}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${active.length}</b> ${active.length === 1 ? "perro" : "perros"}</li>
            <li>${shiftHours(sel.shift)}</li>
            <li>Supervisa: ${esc(shiftData.supervisor)}</li>
            <li>${shiftRoutes(sel.shift)}</li>
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
      ${Priorities(sel, active, flagged, conflicts, progress)}
    </section>
  `;
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
function Priorities(sel, active, flagged, conflicts, progress) {
  const items = [];

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

  const muzzled = active.filter(usesMuzzle);
  if (muzzled.length) {
    const short = muzzled.length > MY_MUZZLES;
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
      title: `Confirmar antes de retirar: ${listNames(flagged.map((dog) => dog.name))}`,
      text: flagged.length === 1
        ? `Figura en la ruta con estado "${esc(flagged[0].status)}". No lo retires sin confirmarlo con Juan.`
        : "Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con Juan.",
      goto: "pw-perros",
      button: "Ver perros",
    });
  }

  if (sel.isToday && active.length) {
    const checked = checklistFor(sel.now.iso, sel.shift).checked.length;
    const totals = shiftTotals(active, progress);
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

  if (!active.length) {
    return `
      <div class="pw-empty">
        <p><strong>No hay perros cargados para este día y turno.</strong></p>
        <p>Si te pidieron un paseo, confirmalo con Juan.</p>
      </div>
    `;
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

function DogsSection(sel, active, flagged, conflicts, progress) {
  const totals = shiftTotals(active, progress);
  const percent = totals.toWalk ? Math.round((totals.delivered / totals.toWalk) * 100) : 100;
  const names = sel.isToday ? teamNames(sel.now.iso) : new Map();

  return `
    <section class="pw-section" id="pw-perros" aria-labelledby="pw-perros-title" tabindex="-1">
      <div class="pw-section-head">
        <div>
          <h2 id="pw-perros-title">Perros del turno <span class="pw-count">${active.length}</span></h2>
          <p class="pw-muted">Orden de la planilla RPJ. Horario de retiro por perro: Pendiente de confirmar.</p>
        </div>
        ${sel.isToday && active.length ? `
          <div class="pw-progress" aria-label="Avance del turno">
            <strong>${totals.delivered} de ${totals.toWalk} entregados${totals.noSale ? ` · ${totals.noSale} no ${totals.noSale === 1 ? "sale" : "salen"}` : ""}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${percent}%"></span></span>
          </div>
        ` : ""}
      </div>

      ${conflicts.length ? `
        <div class="pw-banner pw-banner--danger" role="alert">
          ${icon("alertTriangle", "pw-icon pw-icon--lg")}
          <div>
            <strong>Hay perros que no se pueden juntar en este turno</strong>
            <ul>${groupConflicts(conflicts).map((group) => `<li>${group}</li>`).join("")}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${esc(SHIFT_BY_LABEL[sel.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      ` : ""}

      ${flagged.map((dog) => `
        <div class="pw-banner pw-banner--warn">
          ${icon("alertCircle", "pw-icon pw-icon--lg")}
          <div>
            <strong>${esc(dog.name)}: ${esc(dog.status)}</strong>
            <p>${esc(dog.review || "Figura en la ruta, pero su estado no es Activo.")} No lo retires sin confirmarlo con Juan.</p>
          </div>
        </div>
      `).join("")}

      ${!sel.isToday && active.length ? `
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      ` : ""}

      ${active.length ? `
        <ul class="pw-dogs" role="list">
          ${active.map((dog) => DogCard(dog, sel, progress[dog.id] || paseoState(null), partnersInList(dog, conflicts), names)).join("")}
        </ul>
        <p class="pw-muted pw-legend">
          Categoría operativa de todos los perros: <b>SIN EVALUAR</b>. ${esc(CATEGORIES["SIN EVALUAR"])}
          Fuente: Registro maestro, 14/08/2026.
        </p>
      ` : `
        <div class="pw-empty">
          <p><strong>Sin perros para ${sel.day.toLowerCase()} a la ${sel.shift.toLowerCase()}.</strong></p>
          <p>Probá otro día o turno con “Cambiar día o turno”.</p>
        </div>
      `}
    </section>
  `;
}

function DogCard(dog, sel, state, partners, names) {
  const { times, noSale, record } = state;
  const step = Math.min(state.step, STEPS.length);
  const done = !noSale && step >= STEPS.length;
  const change = lastChange(record, names);
  const ownNoJuntar = dog.safety.filter((text) => safetyKind(text) === "danger").join(" ");
  const extraPartners = partners.filter((name) => !ownNoJuntar.includes(name));
  const alerts = dog.safety.filter((text) => safetyKind(text) !== "info");
  const notes = dog.safety.filter((text) => safetyKind(text) === "info");
  const hasAlert = alerts.length || partners.length;

  return `
    <li class="pw-dog ${hasAlert ? "has-alert" : ""} ${done ? "is-done" : ""} ${noSale ? "is-nosale" : ""}" data-pw-dog="${dog.id}">
      <div class="pw-dog-head">
        <h3>${esc(dog.name)}</h3>
        <span class="pw-dog-facts">${esc(dog.size)} · ${dog.minutes ? `${dog.minutes} min` : "Duración pendiente de confirmar"}</span>
      </div>

      ${hasAlert ? `
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${esc(dog.name)}">
          ${alerts.map((text) => `
            <li class="pw-alert pw-alert--${safetyKind(text)}">
              ${icon(safetyKind(text) === "danger" ? "alertTriangle" : "shieldCheck", "pw-icon")}
              <span>${esc(text)}${safetyKind(text) === "danger" && partners.length ? `<b class="pw-today-tag">En este turno: ${listNames(partners)}</b>` : ""}</span>
            </li>
          `).join("")}
          ${extraPartners.length ? `
            <li class="pw-alert pw-alert--danger">
              ${icon("alertTriangle", "pw-icon")}
              <span>No juntar con ${listNames(extraPartners)}<b class="pw-today-tag">En este turno</b></span>
            </li>
          ` : ""}
        </ul>
      ` : ""}

      ${notes.map((text) => `<p class="pw-dog-note">${icon("users", "pw-icon pw-icon--sm")} ${esc(text)}</p>`).join("")}
      ${dog.review ? `<p class="pw-dog-review"><b>Dato a confirmar:</b> ${esc(dog.review)}</p>` : ""}
      <p class="pw-dog-category"><span>SIN EVALUAR</span> Registro maestro 14/08/2026</p>

      ${sel.isToday ? `
        ${noSale ? `
          <p class="pw-nosale-label">${icon("x", "pw-icon")} No sale en este turno</p>
        ` : `
          <ol class="pw-steps" aria-label="Avance de ${esc(dog.name)}">
            ${STEPS.map((item, index) => `
              <li class="${index < step ? "is-done" : ""} ${index === step ? "is-next" : ""}">
                <span class="pw-step-dot" aria-hidden="true">${index < step ? icon("checkCircle", "pw-icon pw-icon--sm") : index + 1}</span>
                <span>${item.label}${index < step ? `<small>${times[index] ? esc(times[index]) : "Sin hora"}</small>` : ""}</span>
                <span class="pw-sr">${index < step ? "hecho" : "pendiente"}</span>
              </li>
            `).join("")}
          </ol>
        `}
        ${record?.nota ? `<p class="pw-dog-nota"><b>Nota:</b> ${esc(record.nota)}</p>` : ""}
        ${change ? `<p class="pw-dog-change ${record.pendiente ? "is-pending" : ""}">${esc(change)}</p>` : ""}
        <div class="pw-dog-actions">
          ${noSale ? "" : done ? `
            <p class="pw-done-label">${icon("checkCircle", "pw-icon")} Entregado ${esc(times[STEPS.length - 1])}</p>
          ` : `
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${dog.id}" ${loaded.ready ? "" : 'aria-disabled="true"'}>
              ${loaded.ready ? STEPS[step].action : "Cargando lo marcado…"}
            </button>
          `}
          ${!noSale && step === 0 ? `
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${dog.id}" ${loaded.ready ? "" : 'aria-disabled="true"'} aria-label="${esc(dog.name)} no sale en este turno">No sale</button>
          ` : ""}
          ${noSale || step > 0 ? `
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${dog.id}" aria-label="Deshacer el último paso de ${esc(dog.name)}">Deshacer</button>
          ` : ""}
        </div>
      ` : ""}
    </li>
  `;
}

function EquipmentSection(sel) {
  const { checked, record } = checklistFor(sel.now.iso, sel.shift);
  const complete = checked.length >= MY_EQUIPMENT.length;
  const change = lastChange(record, teamNames(sel.now.iso));

  return `
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">Tu equipo según el inventario. Hoy, turno ${sel.shift.toLowerCase()}.</p>
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
  const line = (label, value) => `${label}: ${value.trim() ? value.trim() : "Sin dato"}`;
  const protocol = protocolLines(draft).map((text) => `- ${text}`);

  const text = [
    "REPORTE DE INCIDENTE - Paseos Juan",
    `Fecha: ${sel.now.date} · Hora: ${draft.hora || sel.now.time} · Turno: ${shift.toLowerCase()}`,
    `Paseador: ${walkerName()}`,
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
const FOCUS_ATTRS = ["data-pw-step", "data-pw-undo", "data-pw-nosale", "data-pw-equip", "data-pw-day", "data-pw-shift"];

function focusSelectorFor(element) {
  if (!element || element === document.body || !element.closest?.(".pw-shell")) return "";
  if (element.id) return `#${CSS.escape(element.id)}`;
  const attr = FOCUS_ATTRS.find((name) => element.hasAttribute(name));
  if (attr) return `[${attr}="${CSS.escape(element.getAttribute(attr))}"]`;
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

  const stepButton = event.target.closest("[data-pw-step]");
  if (stepButton) {
    const id = stepButton.dataset.pwStep;
    const sel = selection();
    const dog = REAL_DOGS.find((item) => item.id === id);
    if (!sel.isToday || !dog || !loaded.ready) return true;
    const state = progressFor(sel.now.iso, sel.shift, [dog])[id];
    if (state.noSale || state.step >= STEPS.length) return true;
    const next = STEPS[state.step];
    // Se mandan también las horas anteriores: si no hay señal, la cola guarda el registro completo.
    const changes = { estado: next.estado };
    STEPS.forEach((item, index) => {
      if (index < state.step) changes[item.field] = state.times[index];
    });
    changes[next.field] = sel.now.time;
    savePaseo(dog, sel, changes, `${dog.name}: ${next.done.toLowerCase()} a las ${sel.now.time}.`);
    rerender(state.step + 1 >= STEPS.length ? `[data-pw-undo="${id}"]` : `[data-pw-step="${id}"]`);
    return true;
  }

  const noSaleButton = event.target.closest("[data-pw-nosale]");
  if (noSaleButton) {
    const id = noSaleButton.dataset.pwNosale;
    const sel = selection();
    const dog = REAL_DOGS.find((item) => item.id === id);
    if (!sel.isToday || !dog || !loaded.ready) return true;
    savePaseo(dog, sel, { estado: NO_SALE }, `${dog.name}: no sale en este turno.`);
    rerender(`[data-pw-undo="${id}"]`);
    return true;
  }

  const undoButton = event.target.closest("[data-pw-undo]");
  if (undoButton) {
    const id = undoButton.dataset.pwUndo;
    const sel = selection();
    const dog = REAL_DOGS.find((item) => item.id === id);
    if (!sel.isToday || !dog || !loaded.ready) return true;
    const state = progressFor(sel.now.iso, sel.shift, [dog])[id];
    if (state.noSale) {
      const back = state.times.reduce((last, time, index) => (time ? index + 1 : last), 0);
      savePaseo(dog, sel, { estado: back ? STEPS[back - 1].estado : "pendiente" }, `${dog.name}: se deshizo "no sale".`);
      rerender(back >= STEPS.length ? `[data-pw-undo="${id}"]` : `[data-pw-step="${id}"]`);
      return true;
    }
    if (!state.step) return true;
    const keep = state.step - 1;
    const changes = { estado: keep ? STEPS[keep - 1].estado : "pendiente" };
    STEPS.forEach((item, index) => {
      changes[item.field] = index < keep ? state.times[index] : "";
    });
    savePaseo(dog, sel, changes, `${dog.name}: se deshizo "${STEPS[keep].done.toLowerCase()}".`);
    rerender(`[data-pw-step="${id}"]`);
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
    if (col === "paseos" || col === "checklists" || col === "incidentes") scheduleRender();
  });
  window.addEventListener("online", scheduleRender);
  window.addEventListener("offline", scheduleRender);
}
