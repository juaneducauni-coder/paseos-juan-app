import { get, post, patch } from '../api.js';
import { esc, showToast, fmtDateTime, todayStr, openModal, closeModal, formToObject } from '../ui.js';
import { renderChat } from './chat.js';

export async function renderAdministrador(path, container) {
  if (path.startsWith('/administrador/finanzas')) return renderFinanzas(container);
  if (path.startsWith('/administrador/auditoria')) return renderAuditoria(container);
  if (path.startsWith('/administrador/chat')) return renderChat(container);
  return renderUsuarios(container);
}

const ROLE_LABEL = { paseador: 'Paseador', supervisor: 'Supervisor', coordinador: 'Coordinador', administrador: 'Administrador' };

async function renderUsuarios(container) {
  container.innerHTML = '<p>Cargando…</p>';
  const { users } = await get('/users');
  container.innerHTML = `
    <h1>Usuarios y roles</h1>
    <p class="page-subtitle">Control global de cuentas y permisos por rol.</p>
    <div class="card">
      <button class="btn btn-primary" id="btn-new-user">+ Nuevo usuario</button>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Turno</th><th>Activo</th><th></th></tr></thead>
          <tbody>
            ${users
              .map(
                (u) => `<tr>
              <td>${esc(u.name)}</td><td>${esc(u.email)}</td><td>${ROLE_LABEL[u.role] || u.role}</td><td>${esc(u.turno || '—')}</td>
              <td>${u.active ? 'Sí' : 'No'}</td>
              <td><button class="btn btn-ghost btn-sm" data-edit="${u.id}">Editar</button></td>
            </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  container.querySelector('#btn-new-user').addEventListener('click', () => {
    openModal(
      `<h2>Nuevo usuario</h2>
      <form id="user-form">
        <div class="field"><label>Nombre *</label><input name="name" required /></div>
        <div class="field"><label>Email *</label><input type="email" name="email" required /></div>
        <div class="field"><label>Contraseña provisoria *</label><input type="text" name="password" required minlength="6" /></div>
        <div class="field"><label>Rol *</label>
          <select name="role"><option value="paseador">Paseador</option><option value="supervisor">Supervisor</option><option value="coordinador">Coordinador</option><option value="administrador">Administrador</option></select>
        </div>
        <div class="field"><label>Turno (si aplica)</label>
          <select name="turno"><option value="">—</option><option value="mañana">Mañana</option><option value="tarde">Tarde</option></select>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
          <button type="submit" class="btn btn-primary">Crear</button>
        </div>
      </form>`,
      (box) => {
        box.querySelector('[data-cancel]').addEventListener('click', closeModal);
        box.querySelector('#user-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const b = formToObject(e.target);
          try {
            await post('/users', b);
            closeModal();
            showToast('Usuario creado.');
            renderUsuarios(container);
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      }
    );
  });

  container.querySelectorAll('[data-edit]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const u = users.find((x) => String(x.id) === btn.getAttribute('data-edit'));
      openModal(
        `<h2>Editar ${esc(u.name)}</h2>
        <form id="edit-user-form">
          <div class="field"><label>Rol</label>
            <select name="role">
              ${['paseador', 'supervisor', 'coordinador', 'administrador'].map((r) => `<option value="${r}" ${u.role === r ? 'selected' : ''}>${ROLE_LABEL[r]}</option>`).join('')}
            </select>
          </div>
          <div class="field"><label>Turno</label>
            <select name="turno">
              <option value="" ${!u.turno ? 'selected' : ''}>—</option>
              <option value="mañana" ${u.turno === 'mañana' ? 'selected' : ''}>Mañana</option>
              <option value="tarde" ${u.turno === 'tarde' ? 'selected' : ''}>Tarde</option>
            </select>
          </div>
          <div class="field"><label><input type="checkbox" name="active" ${u.active ? 'checked' : ''} /> Cuenta activa</label></div>
          <div class="field"><label>Nueva contraseña (opcional)</label><input type="text" name="password" minlength="6" /></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>`,
        (box) => {
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#edit-user-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            const payload = { role: fd.get('role'), turno: fd.get('turno') || null, active: fd.get('active') === 'on' };
            if (fd.get('password')) payload.password = fd.get('password');
            try {
              await patch(`/users/${u.id}`, payload);
              closeModal();
              showToast('Usuario actualizado.');
              renderUsuarios(container);
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );
}

async function renderFinanzas(container, desde, hasta) {
  container.innerHTML = '<p>Cargando…</p>';
  const params = new URLSearchParams();
  if (desde) params.set('desde', desde);
  if (hasta) params.set('hasta', hasta);
  const { movements, resumen } = await get(`/finance/movements${params.toString() ? '?' + params.toString() : ''}`);
  container.innerHTML = `
    <h1>Finanzas</h1>
    <p class="page-subtitle">Visible solo para administrador.</p>
    <div class="card">
      <form id="filter-form" style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
        <div class="field"><label>Desde</label><input type="date" name="desde" value="${desde || ''}" /></div>
        <div class="field"><label>Hasta</label><input type="date" name="hasta" value="${hasta || ''}" /></div>
        <button class="btn btn-secondary" type="submit">Filtrar</button>
        <button class="btn btn-primary" type="button" id="btn-new-mov">+ Nuevo movimiento</button>
      </form>
    </div>
    <div class="grid-3">
      <div class="card"><h3>Ingresos</h3><p style="font-size:1.4rem;font-weight:700;">$ ${resumen.ingresos.toLocaleString('es-AR')}</p></div>
      <div class="card"><h3>Gastos</h3><p style="font-size:1.4rem;font-weight:700;">$ ${resumen.gastos.toLocaleString('es-AR')}</p></div>
      <div class="card"><h3>Ganancia neta</h3><p style="font-size:1.4rem;font-weight:700;color:${resumen.gananciaNeta >= 0 ? 'var(--green)' : 'var(--red)'}">$ ${resumen.gananciaNeta.toLocaleString('es-AR')}</p></div>
    </div>
    <div class="card">
      <h2>Gastos por categoría</h2>
      ${Object.keys(resumen.porCategoria).length ? Object.entries(resumen.porCategoria).map(([c, v]) => `<p>${esc(c)}: $ ${v.toLocaleString('es-AR')}</p>`).join('') : '<p class="help-msg">Sin gastos registrados en este período.</p>'}
    </div>
    <div class="card">
      <h2>Movimientos</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Fecha</th><th>Tipo</th><th>Categoría</th><th>Importe</th><th>Responsable</th><th>Nota</th><th></th></tr></thead>
          <tbody>
            ${movements
              .map(
                (m) => `<tr>
              <td>${esc(m.fecha)}</td><td>${m.tipo}</td><td>${esc(m.categoria)}</td>
              <td>$ ${m.importe.toLocaleString('es-AR')}</td><td>${esc(m.responsable_name)}</td><td>${esc(m.nota || '—')}</td>
              <td><button class="btn btn-ghost btn-sm" data-history="${m.id}">Historial</button></td>
            </tr>`
              )
              .join('') || '<tr><td colspan="7">Sin movimientos en este período.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;

  container.querySelector('#filter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const b = formToObject(e.target);
    renderFinanzas(container, b.desde, b.hasta);
  });

  container.querySelector('#btn-new-mov').addEventListener('click', () => {
    openModal(
      `<h2>Nuevo movimiento</h2>
      <form id="mov-form">
        <div class="grid-2">
          <div class="field"><label>Fecha *</label><input type="date" name="fecha" value="${todayStr()}" required /></div>
          <div class="field"><label>Tipo *</label><select name="tipo"><option value="ingreso">Ingreso</option><option value="gasto">Gasto</option></select></div>
        </div>
        <div class="field"><label>Categoría * (ej: paseadores, supervisores, coordinación, materiales, otros)</label><input name="categoria" required /></div>
        <div class="field"><label>Importe *</label><input type="number" step="0.01" min="0.01" name="importe" required /></div>
        <div class="field"><label>Responsable</label><p class="help-msg">Se registra automáticamente con tu usuario.</p></div>
        <div class="field"><label>Nota / respaldo</label><textarea name="nota"></textarea></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar</button>
        </div>
      </form>`,
      (box) => {
        box.querySelector('[data-cancel]').addEventListener('click', closeModal);
        box.querySelector('#mov-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const b = formToObject(e.target);
          try {
            await post('/finance/movements', b);
            closeModal();
            showToast('Movimiento registrado.');
            renderFinanzas(container, desde, hasta);
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      }
    );
  });

  container.querySelectorAll('[data-history]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const { history } = await get(`/finance/movements/${btn.getAttribute('data-history')}/history`);
      openModal(
        `<h2>Historial de cambios</h2>
        ${history.length ? history.map((h) => `<p>${esc(h.campo)}: "${esc(h.valor_anterior)}" → "${esc(h.valor_nuevo)}" — ${esc(h.changed_by_name)}, ${fmtDateTime(h.changed_at)}</p>`).join('') : '<p class="help-msg">Sin cambios registrados.</p>'}
        <div class="modal-actions"><button class="btn btn-ghost" data-cancel>Cerrar</button></div>`,
        (box) => box.querySelector('[data-cancel]').addEventListener('click', closeModal)
      );
    })
  );
}

async function renderAuditoria(container) {
  container.innerHTML = '<p>Cargando…</p>';
  const [{ log }, { messages }] = await Promise.all([get('/users/audit'), get('/chat/audit/clients')]);
  container.innerHTML = `
    <h1>Auditoría</h1>
    <p class="page-subtitle">Registro de acciones del sistema y de la comunicación con clientes.</p>
    <div class="card">
      <h2>Comunicación con clientes</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Fecha</th><th>Autor</th><th>Cliente</th><th>Mensaje</th></tr></thead>
          <tbody>
            ${messages.map((m) => `<tr><td>${fmtDateTime(m.created_at)}</td><td>${esc(m.sender_name)}</td><td>${esc(m.client_name)}</td><td>${esc(m.body)}</td></tr>`).join('') || '<tr><td colspan="4">Sin mensajes a clientes todavía.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <h2>Registro de acciones</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Fecha</th><th>Usuario</th><th>Acción</th><th>Entidad</th></tr></thead>
          <tbody>
            ${log.map((l) => `<tr><td>${fmtDateTime(l.created_at)}</td><td>${esc(l.actor_name || '—')}</td><td>${esc(l.accion)}</td><td>${esc(l.entidad)} ${esc(l.entidad_id || '')}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
