import { get, post, patch } from '../api.js';
import { esc, showToast, estadoTag, statusTag, todayStr, openModal, closeModal, formToObject } from '../ui.js';
import { renderChat } from './chat.js';

export async function renderCoordinador(path, container) {
  if (path.startsWith('/coordinador/reportes')) return renderReportes(container);
  if (path.startsWith('/coordinador/inventario')) return renderInventario(container);
  if (path.startsWith('/coordinador/chat')) return renderChat(container);
  return renderPerros(container);
}

async function renderPerros(container) {
  container.innerHTML = '<p>Cargando…</p>';
  const { dogs } = await get('/dogs');
  container.innerHTML = `
    <h1>Fichas de perros</h1>
    <p class="page-subtitle">Vos creás la ficha inicial. El supervisor la evalúa antes de que el perro entre a un grupo.</p>
    <div class="card">
      <button class="btn btn-primary" id="btn-new-dog">+ Nueva ficha</button>
    </div>
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Nombre</th><th>Tutor</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            ${dogs
              .map(
                (d) => `<tr>
              <td>${esc(d.id)}</td><td>${esc(d.name)}</td><td>${esc(d.tutor_name)}</td><td>${estadoTag(d.estado)}</td>
              <td><button class="btn btn-ghost btn-sm" data-view="${d.id}">Ver / editar</button></td>
            </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div id="dog-detail"></div>
  `;

  container.querySelector('#btn-new-dog').addEventListener('click', () => openNewDogForm(container));
  container.querySelectorAll('[data-view]').forEach((btn) =>
    btn.addEventListener('click', () => showDogDetail(container, btn.getAttribute('data-view')))
  );
}

function fieldsMarkup(vals = {}) {
  const v = (k) => esc(vals[k] || '');
  return `
    <h3>Identificación</h3>
    <div class="grid-2">
      <div class="field"><label>Nombre *</label><input name="name" value="${v('name')}" required /></div>
      <div class="field"><label>Descripción física / foto</label><input name="photo_desc" value="${v('photo_desc')}" /></div>
      <div class="field"><label>Edad o fecha de nacimiento</label><input name="birth_or_age" value="${v('birth_or_age')}" /></div>
      <div class="field"><label>Raza o tipo</label><input name="breed" value="${v('breed')}" /></div>
      <div class="field"><label>Sexo</label><input name="sex" value="${v('sex')}" /></div>
      <div class="field"><label>Castración</label><input name="castrado" value="${v('castrado')}" /></div>
      <div class="field"><label>Peso</label><input name="peso" value="${v('peso')}" /></div>
      <div class="field"><label>Tamaño</label><input name="tamano" value="${v('tamano')}" /></div>
    </div>
    <h3>Tutor y contacto</h3>
    <div class="grid-2">
      <div class="field"><label>Nombre del tutor *</label><input name="tutor_name" value="${v('tutor_name')}" required /></div>
      <div class="field"><label>Teléfono principal *</label><input name="tutor_phone" value="${v('tutor_phone')}" required /></div>
      <div class="field"><label>Contacto alternativo</label><input name="tutor_phone_alt" value="${v('tutor_phone_alt')}" /></div>
      <div class="field"><label>Dirección / zona</label><input name="address_zone" value="${v('address_zone')}" /></div>
      <div class="field"><label>Persona autorizada a entregar/recibir</label><input name="authorized_pickup" value="${v('authorized_pickup')}" /></div>
      <div class="field"><label>Contacto de emergencia</label><input name="emergency_contact" value="${v('emergency_contact')}" /></div>
    </div>
    <h3>Salud</h3>
    <div class="grid-2">
      <div class="field"><label>Estado general de salud</label><input name="salud_estado" value="${v('salud_estado')}" /></div>
      <div class="field"><label>Condiciones médicas relevantes</label><input name="condiciones_medicas" value="${v('condiciones_medicas')}" /></div>
      <div class="field"><label>Medicación</label><input name="medicacion" value="${v('medicacion')}" /></div>
      <div class="field"><label>Alergias</label><input name="alergias" value="${v('alergias')}" /></div>
      <div class="field"><label>Limitaciones físicas</label><input name="limitaciones" value="${v('limitaciones')}" /></div>
      <div class="field"><label>Veterinaria habitual</label><input name="veterinaria" value="${v('veterinaria')}" /></div>
      <div class="field"><label>Teléfono de la veterinaria</label><input name="veterinaria_telefono" value="${v('veterinaria_telefono')}" /></div>
      <div class="field"><label>Vacunas / controles informados</label><input name="vacunas" value="${v('vacunas')}" /></div>
    </div>
    <div class="field"><label>Indicaciones especiales del tutor</label><textarea name="indicaciones_tutor">${v('indicaciones_tutor')}</textarea></div>
    <h3>Equipo y paseo</h3>
    <div class="grid-2">
      <div class="field"><label>Tipo de collar</label><input name="collar_tipo" value="${v('collar_tipo')}" /></div>
      <div class="field"><label>Tipo de arnés</label><input name="arnes_tipo" value="${v('arnes_tipo')}" /></div>
      <div class="field"><label>Tipo de correa</label><input name="correa_tipo" value="${v('correa_tipo')}" /></div>
      <div class="field"><label>Estado del equipo</label><input name="equipo_estado" value="${v('equipo_estado')}" /></div>
      <div class="field"><label>Duración del paseo</label><input name="duracion_paseo" value="${v('duracion_paseo')}" /></div>
      <div class="field"><label>Frecuencia semanal</label><input name="frecuencia_semanal" value="${v('frecuencia_semanal')}" /></div>
      <div class="field"><label>Horarios habituales</label><input name="horarios" value="${v('horarios')}" /></div>
      <div class="field"><label>Rutina de salida y regreso</label><input name="rutina" value="${v('rutina')}" /></div>
      <div class="field"><label>Acceso al domicilio</label><input name="acceso_domicilio" value="${v('acceso_domicilio')}" /></div>
      <div class="field"><label>Alimentación / agua</label><input name="alimentacion_agua" value="${v('alimentacion_agua')}" /></div>
    </div>
  `;
}

function openNewDogForm(container) {
  openModal(
    `<h2>Nueva ficha de perro</h2>
    <form id="dog-form">${fieldsMarkup()}
      <div class="modal-actions">
        <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
        <button type="submit" class="btn btn-primary">Crear ficha</button>
      </div>
    </form>`,
    (box) => {
      box.querySelector('[data-cancel]').addEventListener('click', closeModal);
      box.querySelector('#dog-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const b = formToObject(e.target);
        try {
          const { dog } = await post('/dogs', b);
          closeModal();
          showToast(`Ficha creada: ${dog.id}. Queda SIN EVALUAR hasta que el supervisor conozca al perro.`);
          renderPerros(container);
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    }
  );
}

async function showDogDetail(container, id) {
  const { dog, evaluations, observations } = await get(`/dogs/${id}`);
  const box = container.querySelector('#dog-detail');
  box.innerHTML = `
    <div class="card">
      <h2>${esc(dog.name)} (${esc(dog.id)}) ${estadoTag(dog.estado)}</h2>
      <p><strong>Motivo del estado:</strong> ${esc(dog.estado_motivo || 'Pendiente de confirmar')} — <em>${esc(dog.estado_fuente || '')}, ${esc(dog.estado_fecha || '')}</em></p>
      <button class="btn btn-secondary btn-sm" id="btn-edit-dog">Editar ficha</button>
      <h3 style="margin-top:16px;">Historial de evaluaciones</h3>
      ${evaluations.length ? evaluations.map((e) => `<p>${estadoTag(e.estado)} — ${esc(e.motivo)} <em>(${esc(e.supervisor_name)}, ${esc(e.fecha)})</em></p>`).join('') : '<p class="help-msg">Sin evaluaciones registradas.</p>'}
      <h3>Observaciones e incidencias</h3>
      ${observations.length ? observations.map((o) => `<p><span class="tag tag-${o.tipo === 'incidencia' ? 'rojo' : 'sin_evaluar'}">${o.tipo}</span> ${esc(o.reaccion)} <em>(${esc(o.author_role)})</em></p>`).join('') : '<p class="help-msg">Sin observaciones registradas.</p>'}
    </div>
  `;
  box.querySelector('#btn-edit-dog').addEventListener('click', () => {
    openModal(
      `<h2>Editar ficha — ${esc(dog.name)}</h2>
      <form id="edit-form">${fieldsMarkup(dog)}
        <div class="modal-actions">
          <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
          <button type="submit" class="btn btn-primary">Guardar cambios</button>
        </div>
      </form>`,
      (m) => {
        m.querySelector('[data-cancel]').addEventListener('click', closeModal);
        m.querySelector('#edit-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const b = formToObject(e.target);
          delete b.name;
          try {
            await patch(`/dogs/${id}`, b);
            closeModal();
            showToast('Ficha actualizada.');
            showDogDetail(container, id);
          } catch (err) {
            showToast(err.message, 'error');
          }
        });
      }
    );
  });
}

async function renderReportes(container, fecha = todayStr()) {
  container.innerHTML = '<p>Cargando…</p>';
  const { summary } = await get(`/walks/summary?fecha=${fecha}`);
  const pendientes = summary.filter((s) => s.validation_status !== 'validado' || s.incidencia);
  container.innerHTML = `
    <h1>Rutas y reportes</h1>
    <p class="page-subtitle">Estado real de la jornada: lo que el supervisor validó y las excepciones pendientes.</p>
    <div class="card">
      <form id="filter-form" style="display:flex;gap:12px;align-items:flex-end;">
        <div class="field"><label>Fecha</label><input type="date" name="fecha" value="${fecha}" /></div>
        <button class="btn btn-secondary" type="submit">Ver</button>
      </form>
    </div>
    ${pendientes.length ? `<div class="alert-banner">${pendientes.length} ruta(s) con incidencia o sin validar todavía.</div>` : '<div class="ok-banner">Todas las rutas del día están validadas.</div>'}
    <div class="card">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Ruta</th><th>Turno</th><th>Paseador</th><th>Programados/Realizados</th><th>No realizados</th><th>Incidencia</th><th>Validación</th><th>Validador</th></tr></thead>
          <tbody>
            ${summary
              .map(
                (s) => `<tr>
              <td>${esc(s.nombre)}</td><td>${s.turno}</td><td>${esc(s.paseador || s.supervisor_a_cargo || '—')}</td>
              <td>${s.perros_programados}/${s.perros_realizados}</td><td>${s.perros_no_realizados}</td>
              <td>${s.incidencia ? '<span class="tag tag-rojo">Sí</span>' : 'No'}</td>
              <td>${statusTag(s.validation_status, s.validation_status)}</td>
              <td>${esc(s.validador || '—')}${s.motivo_rechazo ? `<br><em>${esc(s.motivo_rechazo)}</em>` : ''}</td>
            </tr>`
              )
              .join('') || '<tr><td colspan="8">No hay rutas registradas para esta fecha.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;
  container.querySelector('#filter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    renderReportes(container, formToObject(e.target).fecha);
  });
}

async function renderInventario(container) {
  container.innerHTML = '<p>Cargando…</p>';
  const [{ items }, { requests }] = await Promise.all([get('/inventory/items'), get('/inventory/requests')]);
  container.innerHTML = `
    <h1>Inventario</h1>
    <p class="page-subtitle">Fuente temporal: cargá acá el stock que hoy vive en la planilla de Sheets, hasta migrar todo a esta única fuente.</p>
    <div class="card">
      <h2>Stock</h2>
      <form id="item-form" style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">
        <div class="field"><label>Artículo</label><input name="nombre" required /></div>
        <div class="field"><label>Stock</label><input type="number" name="stock" value="0" /></div>
        <div class="field"><label>Mínimo</label><input type="number" name="minimo" value="0" /></div>
        <button class="btn btn-secondary" type="submit">Agregar / actualizar</button>
      </form>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Artículo</th><th>Stock</th><th>Mínimo</th><th>Estado</th><th>Actualizado</th><th></th></tr></thead>
          <tbody>
            ${items
              .map(
                (i) => `<tr>
              <td>${esc(i.nombre)}</td><td>${i.stock}</td><td>${i.minimo}</td><td>${statusTag(i.estado === 'OK' ? 'ok' : i.estado === 'Stock bajo' ? 'amarillo' : i.estado === 'Sin stock' ? 'rojo' : 'sin_evaluar', i.estado)}</td>
              <td>${esc(i.updated_at)}</td>
              <td><button class="btn btn-ghost btn-sm" data-edit-item="${i.id}" data-stock="${i.stock}" data-minimo="${i.minimo}">Ajustar</button></td>
            </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="card">
      <h2>Solicitudes de los supervisores</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Artículo</th><th>Cant.</th><th>Prioridad</th><th>Solicitante</th><th>Motivo</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            ${requests
              .map(
                (r) => `<tr>
              <td>${esc(r.item_nombre)}</td><td>${r.cantidad}</td><td>${r.prioridad}</td><td>${esc(r.solicitante_name)}</td><td>${esc(r.motivo)}</td>
              <td>${statusTag(r.estado, r.estado)}</td>
              <td>${
                r.estado === 'pendiente' || r.estado === 'en_preparacion'
                  ? `<button class="btn btn-sm btn-secondary" data-req-status="${r.id}" data-next="${r.estado === 'pendiente' ? 'en_preparacion' : 'entregada'}">${r.estado === 'pendiente' ? 'Preparar' : 'Marcar entregada'}</button>
                     <button class="btn btn-sm btn-ghost" data-req-discard="${r.id}">Descartar</button>`
                  : ''
              }</td>
            </tr>`
              )
              .join('') || '<tr><td colspan="7">Sin solicitudes.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;

  container.querySelector('#item-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const b = formToObject(e.target);
    try {
      await post('/inventory/items', b);
      showToast('Artículo guardado.');
      renderInventario(container);
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  container.querySelectorAll('[data-edit-item]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-edit-item');
      openModal(
        `<h2>Ajustar stock</h2>
        <form id="adjust-form">
          <div class="field"><label>Stock</label><input type="number" name="stock" value="${btn.getAttribute('data-stock')}" /></div>
          <div class="field"><label>Mínimo</label><input type="number" name="minimo" value="${btn.getAttribute('data-minimo')}" /></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>`,
        (box) => {
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#adjust-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const b = formToObject(e.target);
            try {
              await patch(`/inventory/items/${id}`, b);
              closeModal();
              renderInventario(container);
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );

  container.querySelectorAll('[data-req-status]').forEach((btn) =>
    btn.addEventListener('click', async () => {
      try {
        await patch(`/inventory/requests/${btn.getAttribute('data-req-status')}`, { estado: btn.getAttribute('data-next') });
        showToast('Actualizado.');
        renderInventario(container);
      } catch (err) {
        showToast(err.message, 'error');
      }
    })
  );

  container.querySelectorAll('[data-req-discard]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-req-discard');
      openModal(
        `<h2>Descartar solicitud</h2>
        <form id="discard-form">
          <div class="field"><label>Motivo *</label><textarea name="motivo_descarte" required></textarea></div>
          <div class="modal-actions">
            <button type="button" class="btn btn-ghost" data-cancel>Cancelar</button>
            <button type="submit" class="btn btn-danger">Descartar</button>
          </div>
        </form>`,
        (box) => {
          box.querySelector('[data-cancel]').addEventListener('click', closeModal);
          box.querySelector('#discard-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const b = formToObject(e.target);
            try {
              await patch(`/inventory/requests/${id}`, { estado: 'descartada', motivo_descarte: b.motivo_descarte });
              closeModal();
              renderInventario(container);
            } catch (err) {
              showToast(err.message, 'error');
            }
          });
        }
      );
    })
  );
}
