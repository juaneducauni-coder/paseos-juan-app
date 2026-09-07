import { Router } from 'express';
import { db, logAudit } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

export const dogsRouter = Router();
dogsRouter.use(requireAuth);

const ESTADOS = ['VERDE', 'AMARILLO', 'ROJO', 'SIN_EVALUAR'];

function nextDogId() {
  const row = db.prepare(`SELECT id FROM dogs ORDER BY rowid DESC LIMIT 1`).get();
  let n = 1;
  if (row) {
    const m = /PJ-(\d+)/.exec(row.id);
    if (m) n = parseInt(m[1], 10) + 1;
  }
  return `PJ-${String(n).padStart(4, '0')}`;
}

function dogSummary(d) {
  return {
    id: d.id,
    name: d.name,
    breed: d.breed,
    tamano: d.tamano,
    tutor_name: d.tutor_name,
    estado: d.estado,
    estado_motivo: d.estado_motivo,
    estado_fecha: d.estado_fecha,
    estado_fuente: d.estado_fuente,
    archived: !!d.archived,
  };
}

// Listado. Paseador: solo perros de sus rutas asignadas (hoy en adelante).
dogsRouter.get('/', (req, res) => {
  const { role, id } = req.user;
  if (role === 'paseador') {
    const rows = db
      .prepare(
        `SELECT DISTINCT d.* FROM dogs d
         JOIN route_dogs rd ON rd.dog_id = d.id
         JOIN routes r ON r.id = rd.route_id
         WHERE r.paseador_id = ? AND d.archived = 0
         ORDER BY d.name`
      )
      .all(id);
    return res.json({ dogs: rows.map(dogSummary) });
  }
  const rows = db.prepare(`SELECT * FROM dogs WHERE archived = 0 ORDER BY name`).all();
  res.json({ dogs: rows.map(dogSummary) });
});

function loadDogFull(dogId, user) {
  const dog = db.prepare(`SELECT * FROM dogs WHERE id = ?`).get(dogId);
  if (!dog) return null;
  if (user.role === 'paseador') {
    const allowed = db
      .prepare(
        `SELECT 1 FROM route_dogs rd JOIN routes r ON r.id = rd.route_id
         WHERE rd.dog_id = ? AND r.paseador_id = ?`
      )
      .get(dogId, user.id);
    if (!allowed) return 'forbidden';
  }
  const evaluations = db
    .prepare(`SELECT e.*, u.name AS supervisor_name FROM dog_evaluations e JOIN users u ON u.id = e.supervisor_id WHERE dog_id = ? ORDER BY e.created_at DESC`)
    .all(dogId);
  const observations = db
    .prepare(`SELECT o.*, u.name AS author_name FROM dog_observations o JOIN users u ON u.id = o.author_id WHERE dog_id = ? ORDER BY o.created_at DESC`)
    .all(dogId);
  return { dog, evaluations, observations };
}

dogsRouter.get('/:id', (req, res) => {
  const result = loadDogFull(req.params.id, req.user);
  if (!result) return res.status(404).json({ error: 'No existe una ficha con ese ID.' });
  if (result === 'forbidden') return res.status(403).json({ error: 'Este perro no está en tus rutas asignadas.' });
  res.json(result);
});

// Alta de ficha inicial — solo coordinador.
dogsRouter.post('/', requireRole('coordinador'), (req, res) => {
  const b = req.body || {};
  if (!b.name || !String(b.name).trim()) {
    return res.status(400).json({ error: 'El nombre del perro es obligatorio.' });
  }
  if (!b.tutor_name || !b.tutor_phone) {
    return res.status(400).json({ error: 'El nombre y el teléfono del tutor son obligatorios para crear la ficha.' });
  }
  const id = nextDogId();
  const fields = [
    'name', 'photo_desc', 'birth_or_age', 'breed', 'sex', 'castrado', 'peso', 'tamano',
    'tutor_name', 'tutor_phone', 'tutor_phone_alt', 'address_zone', 'authorized_pickup', 'emergency_contact',
    'salud_estado', 'condiciones_medicas', 'medicacion', 'alergias', 'limitaciones', 'veterinaria', 'veterinaria_telefono', 'vacunas', 'indicaciones_tutor',
    'collar_tipo', 'arnes_tipo', 'correa_tipo', 'equipo_estado', 'duracion_paseo', 'frecuencia_semanal', 'horarios', 'rutina', 'acceso_domicilio', 'alimentacion_agua',
  ];
  const values = fields.map((f) => (b[f] != null && String(b[f]).trim() !== '' ? String(b[f]).trim() : null));
  db.prepare(
    `INSERT INTO dogs (id, ${fields.join(',')}, estado, estado_motivo, estado_fecha, estado_fuente, created_by)
     VALUES (?, ${fields.map(() => '?').join(',')}, 'SIN_EVALUAR', 'Ficha recién creada por coordinación, pendiente de evaluación del supervisor.', date('now'), 'Dato aportado por el coordinador', ?)`
  ).run(id, ...values, req.user.id);
  logAudit(req.user.id, 'crear_ficha', 'perro', id, { name: b.name });
  const dog = db.prepare(`SELECT * FROM dogs WHERE id = ?`).get(id);
  res.status(201).json({ dog });
});

// Actualización de ficha — coordinador y administrador.
dogsRouter.patch('/:id', requireRole('coordinador', 'administrador'), (req, res) => {
  const dog = db.prepare(`SELECT * FROM dogs WHERE id = ?`).get(req.params.id);
  if (!dog) return res.status(404).json({ error: 'No existe una ficha con ese ID.' });
  const editable = [
    'photo_desc', 'birth_or_age', 'breed', 'sex', 'castrado', 'peso', 'tamano',
    'tutor_name', 'tutor_phone', 'tutor_phone_alt', 'address_zone', 'authorized_pickup', 'emergency_contact',
    'salud_estado', 'condiciones_medicas', 'medicacion', 'alergias', 'limitaciones', 'veterinaria', 'veterinaria_telefono', 'vacunas', 'indicaciones_tutor',
    'collar_tipo', 'arnes_tipo', 'correa_tipo', 'equipo_estado', 'duracion_paseo', 'frecuencia_semanal', 'horarios', 'rutina', 'acceso_domicilio', 'alimentacion_agua',
  ];
  const b = req.body || {};
  const sets = [];
  const values = [];
  for (const f of editable) {
    if (Object.prototype.hasOwnProperty.call(b, f)) {
      sets.push(`${f} = ?`);
      values.push(b[f] != null && String(b[f]).trim() !== '' ? String(b[f]).trim() : null);
    }
  }
  if (!sets.length) return res.status(400).json({ error: 'No se envió ningún dato para actualizar.' });
  sets.push(`updated_at = datetime('now')`);
  values.push(req.params.id);
  db.prepare(`UPDATE dogs SET ${sets.join(', ')} WHERE id = ?`).run(...values);
  logAudit(req.user.id, 'actualizar_ficha', 'perro', req.params.id, { campos: Object.keys(b) });
  res.json({ dog: db.prepare(`SELECT * FROM dogs WHERE id = ?`).get(req.params.id) });
});

// Evaluación del supervisor: fija el estado operativo VERDE/AMARILLO/ROJO/SIN_EVALUAR.
dogsRouter.post('/:id/evaluate', requireRole('supervisor'), (req, res) => {
  const dog = db.prepare(`SELECT * FROM dogs WHERE id = ?`).get(req.params.id);
  if (!dog) return res.status(404).json({ error: 'No existe una ficha con ese ID.' });
  const b = req.body || {};
  if (!b.estado || !ESTADOS.includes(b.estado)) {
    return res.status(400).json({ error: 'Indicá un estado válido: VERDE, AMARILLO, ROJO o SIN_EVALUAR.' });
  }
  if (!b.motivo || !String(b.motivo).trim()) {
    return res.status(400).json({ error: 'El motivo de la evaluación es obligatorio.' });
  }
  const fecha = b.fecha && /^\d{4}-\d{2}-\d{2}$/.test(b.fecha) ? b.fecha : new Date().toISOString().slice(0, 10);
  const fuente = 'Observación directa del supervisor';
  const cols = [
    'energia', 'conducta_perros', 'conducta_personas', 'conducta_ninos', 'reaccion_bicicletas',
    'reaccion_motos', 'reaccion_autos', 'reaccion_ruidos', 'reaccion_comida', 'miedos', 'desencadenantes',
    'senales_estres', 'tendencia_escape', 'tendencia_tirar', 'capacidad_grupo', 'perros_compatibles',
    'perros_incompatibles', 'indicaciones', 'observaciones',
  ];
  const colVals = cols.map((c) => (b[c] != null && String(b[c]).trim() !== '' ? String(b[c]).trim() : null));

  const tx = db.transaction(() => {
    db.prepare(
      `INSERT INTO dog_evaluations (dog_id, supervisor_id, fecha, ${cols.join(',')}, estado, motivo, fuente)
       VALUES (?,?,?, ${cols.map(() => '?').join(',')}, ?, ?, ?)`
    ).run(req.params.id, req.user.id, fecha, ...colVals, b.estado, String(b.motivo).trim(), fuente);
    db.prepare(
      `UPDATE dogs SET estado = ?, estado_motivo = ?, estado_fecha = ?, estado_fuente = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(b.estado, String(b.motivo).trim(), fecha, fuente, req.params.id);
  });
  tx();
  logAudit(req.user.id, 'evaluar_perro', 'perro', req.params.id, { estado: b.estado });
  res.status(201).json(loadDogFull(req.params.id, req.user));
});

// Observaciones / incidencias de conducta — paseador y supervisor.
dogsRouter.post('/:id/observations', requireRole('paseador', 'supervisor'), (req, res) => {
  const dog = db.prepare(`SELECT * FROM dogs WHERE id = ?`).get(req.params.id);
  if (!dog) return res.status(404).json({ error: 'No existe una ficha con ese ID.' });
  const b = req.body || {};
  if (!b.reaccion || !String(b.reaccion).trim()) {
    return res.status(400).json({ error: 'Describí la conducta observable antes de guardar.' });
  }
  const fecha = new Date().toISOString();
  const tipo = b.tipo === 'incidencia' ? 'incidencia' : 'observacion';
  const info = db
    .prepare(
      `INSERT INTO dog_observations
       (dog_id, walk_id, author_id, author_role, fecha, lugar, contexto, estimulo, distancia, reaccion, accion, resultado, nivel_riesgo, seguimiento, tipo)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    )
    .run(
      req.params.id,
      b.walk_id || null,
      req.user.id,
      req.user.role,
      fecha,
      b.lugar || null,
      b.contexto || null,
      b.estimulo || null,
      b.distancia || null,
      String(b.reaccion).trim(),
      b.accion || null,
      b.resultado || null,
      b.nivel_riesgo || null,
      b.seguimiento || null,
      tipo
    );
  if (tipo === 'incidencia') {
    db.prepare(`UPDATE dogs SET updated_at = datetime('now') WHERE id = ?`).run(req.params.id);
  }
  logAudit(req.user.id, tipo === 'incidencia' ? 'registrar_incidencia' : 'registrar_observacion', 'perro', req.params.id, {});
  res.status(201).json({ observation: db.prepare(`SELECT * FROM dog_observations WHERE id = ?`).get(info.lastInsertRowid) });
});
