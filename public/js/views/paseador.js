import { get, post } from '../api.js';
import { esc, showToast, estadoTag, statusTag, fmtDateTime, todayStr, openModal, closeModal, formToObject } from '../ui.js';
import { renderChat } from './chat.js';

function defaultTurno() {
  const h = new Date().getHours();
  return h < 13 ? 'mañana' : 'tarde';
}

export async function renderPaseador(path, container) {
  if (path.startsWith('/paseador/perros')) return renderPerros(container);
  if (path.startsWith('/paseador/chat')) return renderChat(container);
  return renderJornada(container);
}

async function renderJornada(container, fecha = todayStr(), turno = defaultTurno()) {
  container.innerHTML = '<p>Cargando jornada…</p>';
  const data = await get(`/walks/jornada?fecha=${fecha}&turno=${turno}`);

  container.innerHTML = `
    <h1>Mi jornada</h1>
    <p class="page-subtitle">Rutas asignadas, checklist de equipo y control de cada paseo.</p>
    <div class="card">
      <form id="filter-form" style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;">
        <div class="field"><label>Fecha</label><input type="date" name="fecha" value="${fecha}" /></div>
        <div class="field"><label>Turno</label>
          <select name="turno">
            <option value="mañana" ${turno === 'mañana' ? 'selected' : ''}>Mañana</option>
            <option value="tarde" ${turno === 'tarde' ? 'selected' : ''}>Tarde</option>
          </select>
        </div>
        <button class="btn btn-secondary" type="submit">Ver</button>
      </form>
    </div>
    ${data.jornadaValidable ? '<div class="ok-banner">Jornada lista para validar: todos los paseos están cerrados o tienen una incidencia registrada.</div>' : data.items.length ? '<div class="alert-banner">La jornada todavía no se puede validar: hay paseos sin cerrar.</div>' : ''}
    <div id="routes-list"></div>
  `;

  container.querySelector('#filter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const b = formToObject(e.target);
    renderJornada(container, b.fecha, b.turno);
  });

  const list = container.querySelector('#routes-list');
  if (!data.items.length) {
    list.innerHTML = '<div class="card">No tenés rutas asignadas para esta fecha y turno.</div>';
    return;
  }

  list.innerHTML = data.items
    .map(({ route, dogs, walk }) => {
      const checklist = walk?.checklist_json ? JSON.parse(walk.checklist_json) : {};
      const estado = walk?.estado || 'pendiente';
      return `
      <div class="route-card" data-route-id="${route.id}">
        <div class="route-head">
          <strong>${esc(route.nombre)}</strong>
          ${statusTag(estado, estado === 'pendiente' ? 'Pendiente' : estado === 'en_curso' ? 'En curso' : walk?.tiene_incidencia ? 'Cerrado (con incidencia)' : 'Cerrado')}
        </div>
        <div style="font-size:0.85rem;color:var(--muted);margin-bottom:8px;">
          ${route.horario ? `Horario: ${esc(route.horario)} · ` : ''}
          ${route.punto_encuentro ? `Punto de encuentro: ${esc(route.punto_encuentro)}` : ''}
        </div>
        ${route.instrucciones ? `<div class="alert-banner">Instrucciones: ${esc(route.instrucciones)}</div>` : ''}
        <div>${dogs.map((d) => `<span class="dog-chip">${esc(d.name)} ${estadoTag(d.estado)}</span>`).join('')}</div>
        <h3 style="margin-top:14px;">Checklist de equipo</h3>
        <div class="grid-2" data-checklist>
          ${data.equipoEsencial
            .map(
              (item) => `
            <label class="checklist-item"><input type="checkbox" data-item="${esc(item)}" ${checklist[item] ? 'checked' : ''} /> ${esc(item)}</label>`
            )
            .join('')}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
          <button class="btn btn-secondary btn-sm" data-save-checklist>Guardar checklist</button>
          <button class="btn btn-primary btn-sm" data-start ${estado !== 'pendiente' ? 'disabled' : ''}>Iniciar paseo</button>
          <button class="btn btn-secondary btn-sm" data-end ${estado === 'cerrado' ? 'disabled' : ''}>Terminar paseo</button>
          <button class="btn btn-ghost btn-sm" data-help>Pedir ayuda al supervisor</button>
        </div>
        <div style="margin-top:10px;">
          <button class="btn btn-ghost btn-sm" data-observation>Registrar observación / incidencia</button>
        </div>
      </div>
    `;
    })
    .join('');

  list.querySelectorAll('[data-save-checklist]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const card = btn.closest('[data-route-id]');
      const routeId = card.getAttribute('data-route-id');
      const checklist = {};
      card.querySelectorAll('[data-item]').forEach((cb) => {
        checklist[cb.getAttribute('data-item')] = cb.checked;
      });
      try {
        const { faltantes } = await post(`/walks/routes/${routeId}/checklist`, { checklist });
        showToast(faltantes.length ? `Guardado. Falta: ${faltantes.join(', ')} — se avisó al supervisor.` : 'Checklist completo y guardado.');
      } catch (err) {
        showToast(err.message, 'error');
      }
    })
  );

  list.querySelectorAll('[data-start]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const routeId = btn.closest('[data-route-id]').getAttribute('data-route-id');
      try {
        await post(`/walks/routes/${routeId}/start`);
        showToast('Paseo iniciado.');
        renderJornada(container, fecha, turno);
      } catch (err) {
        showToast(err.message, 'error');
      }
    })
  );

  list.querySelectorAll('[data-end]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const routeId = btn.closest('[data-route-id]').getAttribute('data-route-id');
      openModal(
        `<h2>Terminar paseo</h2>
        <form id="end-form">
          <div class="field"><label><input type="checkbox" name="entrega_confirmada" /> Confirmo que entregué al perro</label></div>
          <div class="field"><label><input type="checkbox" name="tiene_incidencia" /> Hubo una incidencia en este paseo</label></div>
          <div class="field"><label>Observación de cierre</label><textarea name="observacion_cierre"></textarea></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-primary">Cerrar paseo</button>
          </div>
        </form>`,
        (box) => {
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#end-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const fd = new FormData(e.target);
            try {
              await post(`/walks/routes/${routeId}/end`, {
                entrega_confirmada: fd.get('entrega_confirmada') === 'on',
                tiene_incidencia: fd.get('tiene_incidencia') === 'on',
                observacion_cierre: fd.get('observacion_cierre') || null,
              });
              closeModal();
              showToast('Paseo cerrado.');
              renderJornada(container, fecha, turno);
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );

  list.querySelectorAll('[data-help]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const routeId = btn.closest('[data-route-id]').getAttribute('data-route-id');
      openModal(
        `<h2>Pedir ayuda al supervisor</h2>
        <form id="help-form">
          <div class="field"><label>Contanos qué necesitás</label><textarea name="motivo" required></textarea></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-primary">Enviar aviso</button>
          </div>
        </form>`,
        (box) => {
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#help-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const motivo = e.target.motivo.value.trim();
            try {
              await post(`/walks/routes/${routeId}/ayuda`, { motivo });
              closeModal();
              showToast('Se avisó al supervisor.');
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );

  list.querySelectorAll('[data-observation]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const routeId = btn.closest('[data-route-id]').getAttribute('data-route-id');
      const dogs = data.items.find((it) => String(it.route.id) === routeId).dogs;
      openModal(
        `<h2>Registrar observación o incidencia</h2>
        <form id="obs-form">
          <div class="field"><label>Perro</label>
            <select name="dog_id" required>${dogs.map((d) => `<option value="${d.id}">${esc(d.name)}</option>`).join('')}</select>
          </div>
          <div class="field"><label>Tipo</label>
            <select name="tipo"><option value="observacion">Observación</option><option value="incidencia">Incidencia</option></select>
          </div>
          <div class="field"><label>Lugar</label><input name="lugar" /></div>
          <div class="field"><label>Qué ocurrió antes (contexto)</label><textarea name="contexto"></textarea></div>
          <div class="field"><label>Estímulo</label><input name="estimulo" placeholder="ej: bicicleta, otro perro, ruido" /></div>
          <div class="field"><label>Conducta observable *</label><textarea name="reaccion" required placeholder="Describí lo que hizo el perro, sin etiquetas generales"></textarea></div>
          <div class="field"><label>Qué se hizo</label><textarea name="accion"></textarea></div>
          <div class="field"><label>Qué ocurrió después</label><textarea name="resultado"></textarea></div>
          <div class="field"><label>Nivel de riesgo</label>
            <select name="nivel_riesgo"><option value="">Sin evaluar</option><option value="Bajo">Bajo</option><option value="Medio">Medio</option><option value="Alto">Alto</option></select>
          </div>
          <div class="field"><label>Seguimiento recomendado</label><textarea name="seguimiento"></textarea></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>`,
        (box) => {
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#obs-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const b = formToObject(e.target);
            const dogId = b.dog_id;
            delete b.dog_id;
            try {
              await post(`/dogs/${dogId}/observations`, b);
              closeModal();
              showToast('Observación registrada con fecha, lugar y autor.');
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );
}

async function renderPerros(container) {
  container.innerHTML = '<p>Cargando…</p>';
  const { dogs } = await get('/dogs');
  container.innerHTML = `
    <h1>Mis perros</h1>
    <p class="page-subtitle">Perros de tus rutas asignadas.</p>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Nombre</th><th>Raza</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            ${dogs
              .map(
                (d) => `<tr>
              <td>${esc(d.id)}</td><td>${esc(d.name)}</td><td>${esc(d.breed || 'Pendiente de confirmar')}</td>
              <td>${estadoTag(d.estado)}</td>
              <td><button class="btn btn-ghost btn-sm" data-view="${d.id}">Ver ficha</button></td>
            </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div id="dog-detail"></div>
  `;
  container.querySelectorAll('[data-view]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-view');
      const { dog, evaluations, observations } = await get(`/dogs/${id}`);
      const box = container.querySelector('#dog-detail');
      box.innerHTML = `
        <div class="card">
          <h2>${esc(dog.name)} (${esc(dog.id)}) ${estadoTag(dog.estado)}</h2>
          <p><strong>Motivo del estado:</strong> ${esc(dog.estado_motivo || 'Pendiente de confirmar')} — <em>${esc(dog.estado_fuente || '')}, ${esc(dog.estado_fecha || '')}</em></p>
          <div class="grid-2">
            <p><strong>Tutor:</strong> ${esc(dog.tutor_name)} — ${esc(dog.tutor_phone)}</p>
            <p><strong>Contacto de emergencia:</strong> ${esc(dog.emergency_contact || 'Pendiente de confirmar')}</p>
            <p><strong>Condiciones médicas:</strong> ${esc(dog.condiciones_medicas || 'Pendiente de confirmar')}</p>
            <p><strong>Alergias:</strong> ${esc(dog.alergias || 'Pendiente de confirmar')}</p>
            <p><strong>Indicaciones del tutor:</strong> ${esc(dog.indicaciones_tutor || 'Pendiente de confirmar')}</p>
            <p><strong>Equipo:</strong> collar ${esc(dog.collar_tipo || '—')}, arnés ${esc(dog.arnes_tipo || '—')}, correa ${esc(dog.correa_tipo || '—')}</p>
          </div>
          <h3>Historial de evaluaciones del supervisor</h3>
          ${evaluations.length ? evaluations.map((e) => `<p>${estadoTag(e.estado)} — ${esc(e.motivo)} <em>(${esc(e.supervisor_name)}, ${esc(e.fecha)})</em></p>`).join('') : '<p class="help-msg">Sin evaluaciones registradas.</p>'}
          <h3>Observaciones e incidencias recientes</h3>
          ${observations.length ? observations.map((o) => `<p><span class="tag tag-${o.tipo === 'incidencia' ? 'rojo' : 'sin_evaluar'}">${o.tipo}</span> ${esc(o.reaccion)} <em>(${esc(o.author_role)}, ${fmtDateTime(o.fecha)})</em></p>`).join('') : '<p class="help-msg">Sin observaciones registradas.</p>'}
        </div>
      `;
    })
  );
}
