// Vista del rol Admin (Juan Buitrago, fundador).
// Todo lo que se muestra sale de src/data/realData.js. Lo que no está confirmado se rotula
// como "Pendiente de confirmar". Lo que Juan marca en pantalla se guarda solo en su dispositivo.
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

const DONE_KEY = "paseosJuanAdmin_prioridadesHechas";
const OPEN_KEY = "paseosJuanAdmin_seccionesAbiertas";
const TIME_ZONE = "America/Argentina/Buenos_Aires";
const SIZES = ["Pequeño", "Mediano", "Grande"];
const SHIFT_MORNING = SHIFTS.manana.label;
const SHIFT_AFTERNOON = SHIFTS.tarde.label;

// Último mensaje de estado (se escribe en la región aria-live después de cada render).
let pendingStatus = "";

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

// Hasta 3 prioridades calculadas, en orden: seguridad, datos, evaluación.
function buildPriorities() {
  const { conflicts } = safetyConflicts();
  const statusIssues = REAL_DOGS.filter((dog) => dog.status !== "Activo");
  const reviews = reviewDogs();
  const toEvaluate = safetyDogs().filter((dog) => dog.category === "SIN EVALUAR");
  const active = activeDogs();
  const unevaluated = active.filter((dog) => dog.category === "SIN EVALUAR");
  const priorities = [];

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
        <span class="adm-user">${icon("lock", "adm-icon-sm")} Juan Buitrago · Fundador</span>
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
  const priorities = buildPriorities();
  const done = readDone();
  const open = openSections();

  return `
    <main class="adm-page" id="adm-main">
      ${TodayHero(priorities, done)}
      ${SafetyPanel()}
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

function TodayHero(priorities, done) {
  const { dayName, date } = todayInfo();
  const dogs = activeDogs();
  const morning = dogs.filter((dog) => goesOn(dog, dayName, SHIFT_MORNING)).length;
  const afternoon = dogs.filter((dog) => goesOn(dog, dayName, SHIFT_AFTERNOON)).length;
  const next = priorities.find((priority) => !done.includes(priority.id));
  const todayLine = morning + afternoon
    ? `Hoy salen ${plural(morning, "perro", "perros")} a la mañana y ${plural(afternoon, "perro", "perros")} a la tarde.`
    : "Hoy no hay paseos cargados en BASE RUTAS.";

  return `
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${esc(dayName)} ${esc(date)}</p>
        <h1 id="adm-hero-title">Hola, Juan</h1>
        <p class="adm-hero-sub">${todayLine}</p>
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
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones.</p>
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
  const priorities = buildPriorities();
  const done = readDone();
  const next = priorities.find((priority) => !done.includes(priority.id));
  const load = weeklyLoad();
  const lines = [
    `Paseos Juan · Resumen del admin · ${dayName} ${date}`,
    "",
    "Prioridades:",
    ...priorities.map((p, i) => `${i + 1}. ${p.title}${done.includes(p.id) ? " (hecho)" : ""}`),
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
    navigate("/login");
    return true;
  }
  return false;
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
    goTo(goButton.dataset.admGoto);
    return true;
  }

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
}

export function registerAdminEvents() {
  clickHandlers.push(handleAdminClick);
  actionClickHandlers.push(handleAdminActionClick);
  // El evento toggle no burbujea: se escucha en captura.
  document.addEventListener("toggle", handleSectionToggle, true);
}
