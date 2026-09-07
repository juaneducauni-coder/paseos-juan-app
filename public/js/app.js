import { get, post } from './api.js';
import { showToast, esc, todayStr } from './ui.js';
import { renderPaseador } from './views/paseador.js';
import { renderSupervisor } from './views/supervisor.js';
import { renderCoordinador } from './views/coordinador.js';
import { renderAdministrador } from './views/administrador.js';

const appEl = document.getElementById('app');

export const state = {
  user: null,
};

const NAV = {
  paseador: [
    { path: '/paseador/jornada', label: 'Mi jornada' },
    { path: '/paseador/perros', label: 'Mis perros' },
    { path: '/paseador/chat', label: 'Chat con supervisor' },
  ],
  supervisor: [
    { path: '/supervisor/rutas', label: 'Rutas y asignación' },
    { path: '/supervisor/evaluar', label: 'Evaluar perros' },
    { path: '/supervisor/validar', label: 'Validar reportes' },
    { path: '/supervisor/inventario', label: 'Inventario' },
    { path: '/supervisor/chat', label: 'Chat' },
  ],
  coordinador: [
    { path: '/coordinador/perros', label: 'Fichas de perros' },
    { path: '/coordinador/reportes', label: 'Rutas y reportes' },
    { path: '/coordinador/inventario', label: 'Inventario' },
    { path: '/coordinador/chat', label: 'Chat' },
  ],
  administrador: [
    { path: '/administrador/usuarios', label: 'Usuarios y roles' },
    { path: '/administrador/finanzas', label: 'Finanzas' },
    { path: '/administrador/auditoria', label: 'Auditoría' },
    { path: '/administrador/chat', label: 'Chat' },
  ],
};

const HOME = {
  paseador: '/paseador/jornada',
  supervisor: '/supervisor/rutas',
  coordinador: '/coordinador/perros',
  administrador: '/administrador/usuarios',
};

export function navigate(path) {
  window.history.pushState({}, '', path);
  render();
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-nav]');
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute('data-nav'));
  }
});

window.addEventListener('popstate', render);

function loginView(errorMsg) {
  appEl.innerHTML = `
    <div class="login-shell">
      <div class="login-card">
        <img src="/paseos-juan-logo-green.svg" alt="Paseos Juan" />
        <h1>Paseos Juan — Plataforma interna</h1>
        <p class="subtitle">Acceso exclusivo para el equipo operativo</p>
        ${errorMsg ? `<div class="error-msg">${esc(errorMsg)}</div>` : ''}
        <form id="login-form">
          <div class="field">
            <label>Email</label>
            <input type="email" name="email" required autocomplete="username" />
          </div>
          <div class="field">
            <label>Contraseña</label>
            <input type="password" name="password" required autocomplete="current-password" />
          </div>
          <button class="btn btn-primary" type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  `;
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;
    const btn = form.querySelector('button');
    btn.disabled = true;
    try {
      const { user } = await post('/auth/login', { email, password });
      state.user = user;
      navigate(HOME[user.role] || '/');
    } catch (err) {
      loginView(err.message);
    } finally {
      btn.disabled = false;
    }
  });
}

function shellHtml(activePath, contentHtml) {
  const { user } = state;
  const items = NAV[user.role] || [];
  const nav = items
    .map((it) => `<a href="${it.path}" data-nav="${it.path}" class="${activePath.startsWith(it.path) ? 'active' : ''}">${it.label}</a>`)
    .join('');
  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand"><img src="/paseos-juan-logo-white.svg" alt="" /><span>Paseos Juan</span></div>
        <nav>${nav}</nav>
        <div class="shift-btns">
          <button class="btn btn-secondary" id="btn-shift-start" style="background:rgba(255,255,255,0.1);color:white;border-color:rgba(255,255,255,0.4)">Iniciar jornada</button>
          <button class="btn btn-secondary" id="btn-shift-end" style="background:rgba(255,255,255,0.1);color:white;border-color:rgba(255,255,255,0.4)">Finalizar jornada</button>
        </div>
        <div class="user-box">
          <span class="name">${esc(user.name)}</span>
          <span class="role">${user.role}${user.turno ? ` · turno ${user.turno}` : ''}</span>
          <button class="btn btn-ghost btn-sm" id="btn-logout" style="margin-top:8px;width:100%;background:transparent;color:white;border-color:rgba(255,255,255,0.4)">Cerrar sesión</button>
        </div>
      </aside>
      <main class="main" id="main-content">${contentHtml}</main>
    </div>
  `;
}

function wireShell() {
  document.getElementById('btn-logout')?.addEventListener('click', async () => {
    await post('/auth/logout');
    state.user = null;
    navigate('/login');
  });
  document.getElementById('btn-shift-start')?.addEventListener('click', async () => {
    try {
      await post('/walks/work-session', { tipo: 'inicio' });
      showToast('Jornada iniciada. Quedó registrada la hora.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
  document.getElementById('btn-shift-end')?.addEventListener('click', async () => {
    try {
      await post('/walks/work-session', { tipo: 'fin' });
      showToast('Jornada finalizada. Quedó registrada la hora.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}

export async function render() {
  const path = window.location.pathname === '/' ? (state.user ? HOME[state.user.role] : '/login') : window.location.pathname;

  if (!state.user) {
    try {
      const { user } = await get('/auth/me');
      state.user = user;
    } catch (e) {
      // no session
    }
  }

  if (!state.user) {
    if (path !== '/login') {
      window.history.replaceState({}, '', '/login');
    }
    loginView();
    return;
  }

  if (path === '/login') {
    navigate(HOME[state.user.role] || '/');
    return;
  }

  const allowedPrefix = `/${state.user.role}`;
  if (!path.startsWith(allowedPrefix)) {
    navigate(HOME[state.user.role]);
    return;
  }

  appEl.innerHTML = shellHtml(path, '<p>Cargando…</p>');
  wireShell();
  const main = document.getElementById('main-content');

  try {
    if (state.user.role === 'paseador') await renderPaseador(path, main);
    else if (state.user.role === 'supervisor') await renderSupervisor(path, main);
    else if (state.user.role === 'coordinador') await renderCoordinador(path, main);
    else if (state.user.role === 'administrador') await renderAdministrador(path, main);
    else main.innerHTML = '<p>Rol no reconocido.</p>';
  } catch (err) {
    if (err.status === 401) {
      state.user = null;
      navigate('/login');
      return;
    }
    main.innerHTML = `<div class="error-msg">${esc(err.message)}</div>`;
  }
}

export { todayStr };

render();
