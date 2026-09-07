import { get, post, patch } from '../api.js';
import { esc, showToast, estadoTag, statusTag, todayStr, fmtDateTime, openModal, closeModal, formToObject } from '../ui.js';
import { renderChat } from './chat.js';

export async function renderSupervisor(path, container) {
  if (path.startsWith('/supervisor/evaluar')) return renderEvaluar(container);
  if (path.startsWith('/supervisor/validar')) return renderValidar(container);
  if (path.startsWith('/supervisor/inventario')) return renderInventario(container);
  if (path.startsWith('/supervisor/chat')) return renderChat(container);
  return renderRutas(container);
}

function defaultTurno() {
  return new Date().getHours() < 13 ? 'mañana' : 'tarde';
}

async function renderRutas(container, fecha = todayStr(), turno = defaultTurno()) {
  container.innerHTML = '<p>Cargando…</p>';
  const [{ routes }, { dogs }, { walkers }] = await Promise.all([
    get(`/routes?fecha=${fecha}&turno=${turno}`),
    get('/dogs'),
    get('/routes/meta/walkers'),
  ]);

  container.innerHTML = `
    <h1>Rutas y asignación</h1>
    <p class="page-subtitle">Máximo 7 perros por grupo/paseador. Los perros SIN EVALUAR o ROJO necesitan excepción con motivo para ir en grupo.</p>
    <div class="card">
      <form id="filter-form" style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
        <div class="field"><label>Fecha</label><input type="date" name="fecha" value="${fecha}" /></div>
        <div class="field"><label>Turno</label><select name="turno"><option value="mañana" ${turno === 'mañana' ? 'selected' : ''}>Mañana</option><option value="tarde" ${turno === 'tarde' ? 'selected' : ''}>Tarde</option></select></div>
        <button class="btn btn-secondary" type="submit">Ver</button>
        <button class="btn btn-primary" type="button" id="btn-new-route">+ Nueva ruta</button>
      </form>
    </div>
    <div id="routes-list"></div>
  `;

  container.querySelector('#filter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const b = formToObject(e.target);
    renderRutas(container, b.fecha, b.turno);
  });

  const list = container.querySelector('#routes-list');
  list.innerHTML = routes.length
    ? routes
        .map(
          (r) => `
    <div class="route-card">
      <div class="route-head">
        <strong>${esc(r.nombre)}</strong>
        ${statusTag(r.estado, r.estado)}
        ${r.ausente ? '<span class="tag tag-rojo">Ausencia</span>' : ''}
      </div>
      <p style="font-size:0.85rem;color:var(--muted);">Paseador: ${esc(r.paseador_name || '—')} ${r.supervisor_a_cargo_name ? `· Cubre: ${esc(r.supervisor_a_cargo_name)} (supervisor a cargo)` : ''}</p>
      <div>${r.dogs.map((d) => `<span class="dog-chip">${esc(d.name)} ${estadoTag(d.estado)}</span>`).join('')}</div>
      ${r.motivo_ausencia ? `<p class="help-msg">Motivo de ausencia: ${esc(r.motivo_ausencia)}</p>` : ''}
      ${!r.ausente ? `<button class="btn btn-ghost btn-sm" data-ausencia="${r.id}" style="margin-top:8px;">Marcar ausencia / reasignar</button>` : ''}
    </div>`
        )
        .join('')
    : '<div class="card">No hay rutas para esta fecha y turno todavía.</div>';

  list.querySelectorAll('[data-ausencia]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const routeId = btn.getAttribute('data-ausencia');
      openModal(
        `<h2>Marcar ausencia y cobertura</h2>
        <form id="ausencia-form">
          <div class="field"><label>Motivo *</label><textarea name="motivo" required></textarea></div>
          <div class="field"><label>Cobertura</label>
            <select name="cobertura">
              <option value="reassign">Reasignar a otro paseador</option>
              <option value="supervisor">Supervisor a cargo (cubro yo)</option>
            </select>
          </div>
          <div class="field" id="reassign-field"><label>Paseador de reemplazo</label>
            <select name="reassign_paseador_id">${walkers.map((w) => `<option value="${w.id}">${esc(w.name)}</option>`).join('')}</select>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-primary">Confirmar</button>
          </div>
        </form>`,
        (box) => {
          const sel = box.querySelector('[name=cobertura]');
          const reassignField = box.querySelector('#reassign-field');
          sel.addEventListener('change', () => {
            reassignField.style.display = sel.value === 'reassign' ? '' : 'none';
          });
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#ausencia-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const b = formToObject(e.target);
            try {
              await post(`/routes/${routeId}/ausencia`, {
                motivo: b.motivo,
                reassign_paseador_id: b.cobertura === 'reassign' ? b.reassign_paseador_id : null,
                supervisor_a_cargo: b.cobertura === 'supervisor',
              });
              closeModal();
              showToast('Ausencia registrada.');
              renderRutas(container, fecha, turno);
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );

  container.querySelector('#btn-new-route').addEventListener('click', () => openCreateRoute(container, fecha, turno, dogs, walkers));
}

function openCreateRoute(container, fecha, turno, dogs, walkers) {
  openModal(
    `<h2>Nueva ruta</h2>
    <form id="route-form">
      <div class="grid-2">
        <div class="field"><label>Fecha *</label><input type="date" name="fecha" value="${fecha}" required /></div>
        <div class="field"><label>Turno *</label><select name="turno"><option value="mañana" ${turno === 'mañana' ? 'selected' : ''}>Mañana</option><option value="tarde" ${turno === 'tarde' ? 'selected' : ''}>Tarde</option></select></div>
      </div>
      <div class="field"><label>Nombre de la ruta *</label><input name="nombre" required /></div>
      <div class="grid-2">
        <div class="field"><label>Punto de encuentro</label><input name="punto_encuentro" /></div>
        <div class="field"><label>Horario</label><input name="horario" placeholder="ej: 09:00 a 10:30" /></div>
      </div>
      <div class="field"><label>Instrucciones</label><textarea name="instrucciones"></textarea></div>
      <div class="field"><label>Paseador</label>
        <select name="paseador_id"><option value="">Sin asignar todavía</option>${walkers.map((w) => `<option value="${w.id}">${esc(w.name)}</option>`).join('')}</select>
      </div>
      <div class="field"><label>Perros (máx. 7) *</label>
        <div style="max-height:200px;overflow-y:auto;border:1px solid var(--border);border-radius:8px;padding:8px;">
          ${dogs
            .map(
              (d) => `<label class="checklist-item"><input type="checkbox" name="dog_ids" value="${d.id}" /> ${esc(d.name)} ${estadoTag(d.estado)}</label>`
            )
            .join('')}
        </div>
      </div>
      <div class="field"><label>Motivo de excepción (si algún perro está SIN EVALUAR, ROJO o marcado incompatible)</label>
        <textarea name="excepcion_motivo" placeholder="Este motivo se aplica a todos los perros marcados en excepción para esta ruta"></textarea>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
        <button type="submit" class="btn btn-primary">Crear ruta</button>
      </div>
    </form>`,
    (box) => {
      box.querySelector('[data-cancel]').addEventListener('click', closeModal);
      box.querySelector('#route-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const dogIds = fd.getAll('dog_ids');
        const exceptionMotivo = fd.get('excepcion_motivo');
        const exceptions = {};
        if (exceptionMotivo) dogIds.forEach((id) => (exceptions[id] = exceptionMotivo));
        try {
          await post('/routes', {
            fecha: fd.get('fecha'),
            turno: fd.get('turno'),
            nombre: fd.get('nombre'),
            punto_encuentro: fd.get('punto_encuentro') || null,
            horario: fd.get('horario') || null,
            instrucciones: fd.get('instrucciones') || null,
            paseador_id: fd.get('paseador_id') || null,
            dog_ids: dogIds,
            exceptions,
          });
          closeModal();
          showToast('Ruta creada.');
          renderRutas(container, fd.get('fecha'), fd.get('turno'));
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    }
  );
}

async function renderEvaluar(container) {
  container.innerHTML = '<p>Cargando…</p>';
  const { dogs } = await get('/dogs');
  container.innerHTML = `
    <h1>Evaluar perros</h1>
    <p class="page-subtitle">Un perro no entra a paseo grupal sin evaluación del supervisor.</p>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Nombre</th><th>Estado actual</th><th>Motivo</th><th></th></tr></thead>
          <tbody>
            ${dogs
              .map(
                (d) => `<tr>
              <td>${esc(d.id)}</td><td>${esc(d.name)}</td><td>${estadoTag(d.estado)}</td>
              <td style="max-width:260px;">${esc(d.estado_motivo || '—')}</td>
              <td><button class="btn btn-primary btn-sm" data-eval="${d.id}" data-name="${esc(d.name)}">Evaluar</button></td>
            </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  container.querySelectorAll('[data-eval]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const dogId = btn.getAttribute('data-eval');
      const name = btn.getAttribute('data-name');
      openModal(
        `<h2>Evaluación de ${esc(name)}</h2>
        <form id="eval-form">
          <div class="grid-2">
            <div class="field"><label>Estado resultante *</label>
              <select name="estado" required>
                <option value="VERDE">VERDE — apto para grupo</option>
                <option value="AMARILLO">AMARILLO — requiere adaptación</option>
                <option value="ROJO">ROJO — requiere paseo individual</option>
                <option value="SIN_EVALUAR">SIN EVALUAR</option>
              </select>
            </div>
            <div class="field"><label>Fecha de evaluación</label><input type="date" name="fecha" value="${todayStr()}" /></div>
          </div>
          <div class="field"><label>Motivo *</label><textarea name="motivo" required></textarea></div>
          <div class="grid-2">
            <div class="field"><label>Nivel de energía</label><input name="energia" /></div>
            <div class="field"><label>Capacidad para caminar en grupo</label><input name="capacidad_grupo" /></div>
            <div class="field"><label>Conducta con perros</label><input name="conducta_perros" /></div>
            <div class="field"><label>Conducta con personas</label><input name="conducta_personas" /></div>
            <div class="field"><label>Conducta con niños</label><input name="conducta_ninos" /></div>
            <div class="field"><label>Reacción ante bicicletas</label><input name="reaccion_bicicletas" /></div>
            <div class="field"><label>Reacción ante motos</label><input name="reaccion_motos" /></div>
            <div class="field"><label>Reacción ante autos</label><input name="reaccion_autos" /></div>
            <div class="field"><label>Reacción ante ruidos</label><input name="reaccion_ruidos" /></div>
            <div class="field"><label>Reacción ante comida en la calle</label><input name="reaccion_comida" /></div>
            <div class="field"><label>Tendencia a escaparse</label><input name="tendencia_escape" /></div>
            <div class="field"><label>Tendencia a tirar de la correa</label><input name="tendencia_tirar" /></div>
          </div>
          <div class="field"><label>Miedos conocidos</label><input name="miedos" /></div>
          <div class="field"><label>Desencadenantes conocidos</label><input name="desencadenantes" /></div>
          <div class="field"><label>Señales de estrés</label><input name="senales_estres" /></div>
          <div class="field"><label>Perros compatibles (IDs o nombres, separados por coma)</label><input name="perros_compatibles" /></div>
          <div class="field"><label>Perros incompatibles (IDs o nombres, separados por coma)</label><input name="perros_incompatibles" /></div>
          <div class="field"><label>Indicaciones para el paseador</label><textarea name="indicaciones"></textarea></div>
          <div class="field"><label>Observaciones</label><textarea name="observaciones"></textarea></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar evaluación</button>
          </div>
        </form>`,
        (box) => {
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#eval-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const b = formToObject(e.target);
            try {
              await post(`/dogs/${dogId}/evaluate`, b);
              closeModal();
              showToast('Evaluación registrada.');
              renderEvaluar(container);
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );
}

async function renderValidar(container, fecha = todayStr()) {
  container.innerHTML = '<p>Cargando…</p>';
  const { summary } = await get(`/walks/summary?fecha=${fecha}`);
  container.innerHTML = `
    <h1>Validar reportes</h1>
    <p class="page-subtitle">Compará lo reportado por el paseador y validá o rechazá con motivo.</p>
    <div class="card">
      <form id="filter-form" style="display:flex;gap:12px;align-items:flex-end;">
        <div class="field"><label>Fecha</label><input type="date" name="fecha" value="${fecha}" /></div>
        <button class="btn btn-secondary" type="submit">Ver</button>
      </form>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Ruta</th><th>Turno</th><th>Paseador</th><th>Perros</th><th>Incidencia</th><th>Validación</th><th></th></tr></thead>
          <tbody>
            ${summary
              .map(
                (s) => `<tr>
              <td>${esc(s.nombre)}</td><td>${s.turno}</td><td>${esc(s.paseador || s.supervisor_a_cargo || '—')}</td>
              <td>${s.perros_realizados}/${s.perros_programados}</td>
              <td>${s.incidencia ? '<span class="tag tag-rojo">Sí</span>' : 'No'}</td>
              <td>${statusTag(s.validation_status, s.validation_status)}</td>
              <td>${s.validation_status === 'pendiente' ? `<button class="btn btn-sm btn-primary" data-validate="${s.route_id}">Revisar</button>` : ''}</td>
            </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
  container.querySelector('#filter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    renderValidar(container, formToObject(e.target).fecha);
  });

  container.querySelectorAll('[data-validate]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const routeId = btn.getAttribute('data-validate');
      const { route } = await get(`/routes/${routeId}`);
      openModal(
        `<h2>Validar reporte — ${esc(route.nombre)}</h2>
        <p>Estado del paseo: ${statusTag(route.walk?.estado || 'pendiente')} ${route.walk?.tiene_incidencia ? '<span class="tag tag-rojo">Con incidencia</span>' : ''}</p>
        <p><strong>Observación de cierre:</strong> ${esc(route.walk?.observacion_cierre || 'Sin observaciones')}</p>
        <form id="validate-form">
          <div class="field"><label>Decisión</label>
            <select name="estado"><option value="validado">Validar</option><option value="rechazado">Rechazar</option></select>
          </div>
          <div class="field"><label>Motivo (obligatorio si rechazás)</label><textarea name="motivo"></textarea></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar decisión</button>
          </div>
        </form>`,
        (box) => {
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#validate-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const b = formToObject(e.target);
            try {
              await post(`/walks/${route.walk.id}/validate`, b);
              closeModal();
              showToast('Decisión registrada.');
              renderValidar(container);
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );
}

async function renderInventario(container) {
  container.innerHTML = '<p>Cargando…</p>';
  const { requests } = await get('/inventory/requests');
  container.innerHTML = `
    <h1>Inventario</h1>
    <p class="page-subtitle">Pedile materiales al coordinador cuando falte algo esencial.</p>
    <div class="card">
      <h2>Nueva solicitud</h2>
      <form id="req-form" class="grid-2">
        <div class="field"><label>Artículo *</label><input name="item_nombre" required /></div>
        <div class="field"><label>Cantidad *</label><input type="number" min="1" name="cantidad" required /></div>
        <div class="field"><label>Prioridad *</label>
          <select name="prioridad"><option value="baja">Baja</option><option value="media" selected>Media</option><option value="alta">Alta</option><option value="urgente">Urgente</option></select>
        </div>
        <div class="field"><label>Motivo *</label><textarea name="motivo" required></textarea></div>
        <div style="grid-column:1/-1;"><button class="btn btn-primary" type="submit">Enviar solicitud</button></div>
      </form>
    </div>
    <div class="card">
      <h2>Mis solicitudes</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Artículo</th><th>Cant.</th><th>Prioridad</th><th>Estado</th><th>Motivo</th></tr></thead>
          <tbody>
            ${requests
              .map(
                (r) => `<tr><td>${esc(r.item_nombre)}</td><td>${r.cantidad}</td><td>${r.prioridad}</td><td>${statusTag(r.estado, r.estado)}</td><td>${esc(r.motivo)}${r.motivo_descarte ? `<br><em>Descarte: ${esc(r.motivo_descarte)}</em>` : ''}</td></tr>`
              )
              .join('') || '<tr><td colspan="5">Todavía no hiciste pedidos.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
  container.querySelector('#req-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const b = formToObject(e.target);
    try {
      await post('/inventory/requests', b);
      showToast('Solicitud enviada.');
      renderInventario(container);
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}
