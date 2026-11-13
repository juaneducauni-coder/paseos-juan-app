// Ingreso real con usuario y PIN, primer usuario administrador, cambio de PIN y avisos de acceso.
import { shell } from "../ui/shared.js";
import { navigate, render } from "../app.js";
import { session, homeFor, ROLE_PAGES, ApiError } from "../api/client.js";

const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let estado = { necesitaConfiguracion: null, cargando: false, mensaje: "", error: false };

function volverA() {
  const destino = new URLSearchParams(window.location.search).get("volver");
  return destino && /^\/[a-z]+$/.test(destino) ? destino : null;
}

export function loginPage() {
  const user = session.user();
  if (user) return yaIngresado(user);

  if (estado.necesitaConfiguracion === null && !estado.cargando) {
    estado.cargando = true;
    session.status()
      .then((data) => { estado.necesitaConfiguracion = Boolean(data.necesitaConfiguracion); })
      .catch((error) => { estado = { ...estado, necesitaConfiguracion: false, mensaje: error.message, error: true }; })
      .finally(() => { estado.cargando = false; render(); });
  }

  const setup = estado.necesitaConfiguracion === true;
  return shell(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${setup ? "Primera vez" : "Equipo de Paseos Juan"}</p>
        <h1 id="acc-titulo">${setup ? "Creá el usuario administrador" : "Ingresar"}</h1>
        <p class="acc-lead">${setup
          ? "Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo."
          : "Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan."}</p>
        ${estado.necesitaConfiguracion === null ? `<p class="acc-status" role="status">Conectando…</p>` : `
        <form class="acc-form" data-acc-form="${setup ? "setup" : "login"}" novalidate>
          ${setup ? `<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>` : ""}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${setup ? 'value="juan"' : ""} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${setup ? "new-password" : "current-password"}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${setup ? `<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>` : ""}
          <button class="acc-button" type="submit">${setup ? "Crear y entrar" : "Entrar"}</button>
        </form>`}
        <p class="acc-status ${estado.error ? "is-error" : ""}" data-acc-status role="status" aria-live="polite">${esc(estado.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `);
}

function yaIngresado(user) {
  return shell(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${esc(user.nombre.split(" ")[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${esc(user.usuario)}</strong> (${esc(user.rol)}).</p>
        <div class="acc-actions">
          ${homeFor(user.rol) !== "/" ? `<a class="acc-button" href="${homeFor(user.rol)}" data-link>Ir a mi panel</a>` : ""}
          <a class="acc-button is-secondary" href="/salir" data-link>Cerrar sesión</a>
        </div>
        ${user.debeCambiarPin ? `<p class="acc-alert" role="alert"><strong>Cambiá tu PIN inicial.</strong> Te lo pasó Juan por WhatsApp: elegí uno propio que solo sepas vos.</p>` : ""}
        <details class="acc-pin" ${user.debeCambiarPin ? "open" : ""}>
          <summary>Cambiar mi PIN</summary>
          <form class="acc-form" data-acc-form="pin" novalidate>
            <label>PIN actual <input name="actual" type="password" inputmode="numeric" autocomplete="current-password" required /></label>
            <label>PIN nuevo <input name="nuevo" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
            <label>Repetí el PIN nuevo <input name="nuevo2" type="password" inputmode="numeric" autocomplete="new-password" required /></label>
            <button class="acc-button" type="submit">Guardar PIN nuevo</button>
          </form>
        </details>
        <p class="acc-status" data-acc-status role="status" aria-live="polite"></p>
      </section>
    </main>
  `);
}

export function registroPage() {
  return shell(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Cuentas</p>
        <h1>¿Querés sumarte?</h1>
        <p class="acc-lead">Las cuentas del equipo las crea Juan desde el panel del admin. Si sos tutor y querés que paseemos a tu perro, pedí una evaluación: te contestamos por WhatsApp.</p>
        <div class="acc-actions">
          <a class="acc-button" href="/#evaluacion" data-link>Pedir una evaluación</a>
          <a class="acc-button is-secondary" href="/login" data-link>Ya tengo usuario</a>
        </div>
      </section>
    </main>
  `);
}

export function sinPermisoPage(roleKey) {
  const user = session.user();
  const propias = ROLE_PAGES[user?.rol] || [];
  return shell(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${esc(user?.nombre)}</strong> (${esc(user?.rol)}) y la página de ${esc(roleKey)} es de otro rol.${user?.rol === "marketing" ? " Tu panel todavía está en preparación." : ""}</p>
        <div class="acc-actions">
          ${propias[0] ? `<a class="acc-button" href="/${propias[0]}" data-link>Ir a mi panel</a>` : `<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `);
}

function setStatus(form, mensaje, error = false) {
  const status = form.closest(".acc-card")?.querySelector("[data-acc-status]");
  if (status) {
    status.textContent = mensaje;
    status.classList.toggle("is-error", error);
  }
}

async function onSubmit(event) {
  const form = event.target.closest("[data-acc-form]");
  if (!form) return;
  event.preventDefault();
  const tipo = form.dataset.accForm;
  const data = Object.fromEntries(new FormData(form));
  const button = form.querySelector("button[type=submit]");

  if (tipo === "setup" && data.pin !== data.pin2) return setStatus(form, "Los dos PIN no coinciden.", true);
  if (tipo === "pin" && data.nuevo !== data.nuevo2) return setStatus(form, "Los dos PIN nuevos no coinciden.", true);
  if (tipo !== "pin" && (!data.usuario || !data.pin)) return setStatus(form, "Completá usuario y PIN.", true);

  button.disabled = true;
  setStatus(form, tipo === "pin" ? "Guardando…" : "Entrando…");
  try {
    if (tipo === "pin") {
      const user = await session.changePin(data.actual, data.nuevo);
      form.reset();
      setStatus(form, "Listo: tu PIN quedó cambiado.");
      if (homeFor(user.rol) !== "/") setTimeout(() => navigate(homeFor(user.rol)), 900);
      return;
    }
    const user = tipo === "setup"
      ? await session.setup({ nombre: data.nombre, usuario: data.usuario, pin: data.pin })
      : await session.login(data.usuario, data.pin);
    estado = { necesitaConfiguracion: false, cargando: false, mensaje: "", error: false };
    if (user.debeCambiarPin) {
      navigate("/login");
      return;
    }
    const destino = volverA();
    navigate(destino && (ROLE_PAGES[user.rol] || []).includes(destino.slice(1)) ? destino : homeFor(user.rol));
  } catch (error) {
    setStatus(form, error instanceof ApiError ? error.message : "No se pudo ingresar. Probá de nuevo.", true);
  } finally {
    button.disabled = false;
  }
}

export function registerAccesoEvents() {
  document.addEventListener("submit", onSubmit);
}
