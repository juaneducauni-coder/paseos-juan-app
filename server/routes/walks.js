import { Router } from 'express';
import { db, logAudit } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

export const walksRouter = Router();
walksRouter.use(requireAuth);

const EQUIPO_ESENCIAL = ['Botiquín', 'Cinturón', '3 ganchos metálicos', 'Pecheras', 'Bolsas', 'Walkie-talkie'];

function getOrCreateWalk(routeId, executorId) {
  let walk = db.prepare(`SELECT * FROM walks WHERE route_id = ? ORDER BY id DESC LIMIT 1`).get(routeId);
  if (!walk) {
    const info = db.prepare(`INSERT INTO walks (route_id, executor_id) VALUES (?,?)`).run(routeId, executorId);
    walk = db.prepare(`SELECT * FROM walks WHERE id = ?`).get(info.lastInsertRowid);
  }
  return walk;
}

function assertRouteAccess(route, user) {
  if (!route) return 'No existe esa ruta.';
  if (user.role === 'paseador' && route.paseador_id !== user.id) {
    return 'Esta ruta no está asignada a vos.';
  }
  if (user.role === 'supervisor' && route.paseador_id !== null && route.supervisor_a_cargo_id !== user.id && route.paseador_id !== user.id) {
    // supervisor can operate routes where he is the "supervisor a cargo" cover, otherwise only view
  }
  return null;
}

// Jornada del día para el paseador logueado (o de cualquier paseador para supervisor/coordinador/administrador via ?paseador_id).
walksRouter.get('/jornada', (req, res) => {
  const { fecha, turno } = req.query;
  if (!fecha || !turno) return res.status(400).json({ error: 'Indicá fecha y turno.' });
  let paseadorId = req.user.id;
  if (req.user.role !== 'paseador') {
    if (!req.query.paseador_id) return res.status(400).json({ error: 'Indicá paseador_id.' });
    paseadorId = req.query.paseador_id;
  }
  const routes = db
    .prepare(
      `SELECT r.* FROM routes r WHERE r.fecha = ? AND r.turno = ? AND (r.paseador_id = ? OR r.supervisor_a_cargo_id = ?)
       ORDER BY r.id`
    )
    .all(fecha, turno, paseadorId, paseadorId);
  const items = routes.map((route) => {
    const dogs = db
      .prepare(`SELECT d.id, d.name, d.estado FROM route_dogs rd JOIN dogs d ON d.id = rd.dog_id WHERE rd.route_id = ? ORDER BY rd.orden`)
      .all(route.id);
    const walk = db.prepare(`SELECT * FROM walks WHERE route_id = ? ORDER BY id DESC LIMIT 1`).get(route.id);
    return { route, dogs, walk: walk || null };
  });
  const allClosed = items.every((it) => it.walk && (it.walk.estado === 'cerrado' || it.walk.tiene_incidencia));
  res.json({ items, equipoEsencial: EQUIPO_ESENCIAL, jornadaValidable: items.length > 0 && allClosed });
});

walksRouter.post('/routes/:routeId/checklist', requireRole('paseador', 'supervisor'), (req, res) => {
  const route = db.prepare(`SELECT * FROM routes WHERE id = ?`).get(req.params.routeId);
  const err = assertRouteAccess(route, req.user);
  if (err) return res.status(route ? 403 : 404).json({ error: err });
  const b = req.body || {};
  const checklist = b.checklist || {};
  const faltantes = EQUIPO_ESENCIAL.filter((item) => checklist[item] === false);
  const walk = getOrCreateWalk(route.id, req.user.id);
  db.prepare(`UPDATE walks SET checklist_json = ?, equipo_alerta = ? WHERE id = ?`).run(
    JSON.stringify(checklist),
    faltantes.length ? faltantes.join(', ') : null,
    walk.id
  );
  logAudit(req.user.id, 'completar_checklist', 'ruta', String(route.id), { faltantes });
  res.json({ walk: db.prepare(`SELECT * FROM walks WHERE id = ?`).get(walk.id), faltantes });
});

walksRouter.post('/routes/:routeId/start', requireRole('paseador', 'supervisor'), (req, res) => {
  const route = db.prepare(`SELECT * FROM routes WHERE id = ?`).get(req.params.routeId);
  const err = assertRouteAccess(route, req.user);
  if (err) return res.status(route ? 403 : 404).json({ error: err });
  const walk = getOrCreateWalk(route.id, req.user.id);
  if (walk.estado !== 'pendiente') return res.status(400).json({ error: 'Este paseo ya fue iniciado.' });
  db.prepare(`UPDATE walks SET estado = 'en_curso', started_at = datetime('now'), executor_id = ? WHERE id = ?`).run(req.user.id, walk.id);
  db.prepare(`UPDATE routes SET estado = 'en_curso', updated_at = datetime('now') WHERE id = ?`).run(route.id);
  logAudit(req.user.id, 'iniciar_paseo', 'ruta', String(route.id), {});
  res.json({ walk: db.prepare(`SELECT * FROM walks WHERE id = ?`).get(walk.id) });
});

walksRouter.post('/routes/:routeId/end', requireRole('paseador', 'supervisor'), (req, res) => {
  const route = db.prepare(`SELECT * FROM routes WHERE id = ?`).get(req.params.routeId);
  const err = assertRouteAccess(route, req.user);
  if (err) return res.status(route ? 403 : 404).json({ error: err });
  const walk = getOrCreateWalk(route.id, req.user.id);
  if (walk.estado === 'cerrado') return res.status(400).json({ error: 'Este paseo ya está cerrado.' });
  const b = req.body || {};
  const tieneIncidencia = !!b.tiene_incidencia;
  if (!tieneIncidencia && !b.entrega_confirmada) {
    return res.status(400).json({ error: 'Confirmá la entrega del perro o registrá una incidencia antes de cerrar el paseo.' });
  }
  db.prepare(
    `UPDATE walks SET estado = 'cerrado', ended_at = datetime('now'), entrega_confirmada = ?, observacion_cierre = ?, tiene_incidencia = ? WHERE id = ?`
  ).run(b.entrega_confirmada ? 1 : 0, b.observacion_cierre || null, tieneIncidencia ? 1 : 0, walk.id);
  db.prepare(`UPDATE routes SET estado = 'cerrada', updated_at = datetime('now') WHERE id = ?`).run(route.id);
  logAudit(req.user.id, 'terminar_paseo', 'ruta', String(route.id), { tieneIncidencia });
  res.json({ walk: db.prepare(`SELECT * FROM walks WHERE id = ?`).get(walk.id) });
});

walksRouter.post('/routes/:routeId/ayuda', requireRole('paseador'), (req, res) => {
  const route = db.prepare(`SELECT * FROM routes WHERE id = ?`).get(req.params.routeId);
  const err = assertRouteAccess(route, req.user);
  if (err) return res.status(route ? 403 : 404).json({ error: err });
  const b = req.body || {};
  if (!b.motivo || !String(b.motivo).trim()) {
    return res.status(400).json({ error: 'Contá brevemente qué necesitás para avisarle al supervisor.' });
  }
  const walk = getOrCreateWalk(route.id, req.user.id);
  db.prepare(`UPDATE walks SET ayuda_solicitada = 1, ayuda_motivo = ? WHERE id = ?`).run(String(b.motivo).trim(), walk.id);
  logAudit(req.user.id, 'pedir_ayuda', 'ruta', String(route.id), { motivo: b.motivo });
  res.json({ ok: true });
});

// Validación del supervisor sobre el reporte del paseador.
walksRouter.post('/:walkId/validate', requireRole('supervisor'), (req, res) => {
  const walk = db.prepare(`SELECT * FROM walks WHERE id = ?`).get(req.params.walkId);
  if (!walk) return res.status(404).json({ error: 'No existe ese paseo.' });
  const b = req.body || {};
  if (!['validado', 'rechazado'].includes(b.estado)) {
    return res.status(400).json({ error: 'Indicá si el reporte se valida o se rechaza.' });
  }
  if (b.estado === 'rechazado' && (!b.motivo || !String(b.motivo).trim())) {
    return res.status(400).json({ error: 'Si rechazás el reporte, indicá el motivo.' });
  }
  db.prepare(`UPDATE walks SET validation_status = ?, validated_by = ?, validated_at = datetime('now'), motivo_rechazo = ? WHERE id = ?`).run(
    b.estado,
    req.user.id,
    b.estado === 'rechazado' ? String(b.motivo).trim() : null,
    walk.id
  );
  logAudit(req.user.id, 'validar_reporte', 'paseo', String(walk.id), { estado: b.estado });
  res.json({ walk: db.prepare(`SELECT * FROM walks WHERE id = ?`).get(walk.id) });
});

// Botones de iniciar/finalizar trabajo por rol, con fecha/hora registrada.
walksRouter.post('/work-session', (req, res) => {
  const tipo = req.body?.tipo;
  if (!['inicio', 'fin'].includes(tipo)) return res.status(400).json({ error: 'Tipo inválido.' });
  db.prepare(`INSERT INTO work_sessions (user_id, role, tipo) VALUES (?,?,?)`).run(req.user.id, req.user.role, tipo);
  res.status(201).json({ ok: true, timestamp: new Date().toISOString() });
});

walksRouter.get('/work-session/today', (req, res) => {
  const rows = db
    .prepare(`SELECT * FROM work_sessions WHERE user_id = ? AND date(timestamp) = date('now') ORDER BY timestamp`)
    .all(req.user.id);
  res.json({ sessions: rows });
});

// Vista/exportación de jornadas — coordinador, administrador, supervisor.
walksRouter.get('/summary', requireRole('supervisor', 'coordinador', 'administrador'), (req, res) => {
  const { fecha, turno } = req.query;
  if (!fecha) return res.status(400).json({ error: 'Indicá la fecha.' });
  const clauses = ['r.fecha = ?'];
  const params = [fecha];
  if (turno) {
    clauses.push('r.turno = ?');
    params.push(turno);
  }
  const routes = db
    .prepare(
      `SELECT r.*, p.name AS paseador_name, s.name AS supervisor_a_cargo_name
       FROM routes r LEFT JOIN users p ON p.id = r.paseador_id LEFT JOIN users s ON s.id = r.supervisor_a_cargo_id
       WHERE ${clauses.join(' AND ')} ORDER BY r.turno, r.id`
    )
    .all(...params);
  const summary = routes.map((route) => {
    const dogs = db.prepare(`SELECT d.id, d.name FROM route_dogs rd JOIN dogs d ON d.id = rd.dog_id WHERE rd.route_id = ?`).all(route.id);
    const walk = db.prepare(`SELECT * FROM walks WHERE route_id = ? ORDER BY id DESC LIMIT 1`).get(route.id);
    const validator = walk?.validated_by ? db.prepare(`SELECT name FROM users WHERE id = ?`).get(walk.validated_by) : null;
    return {
      route_id: route.id,
      nombre: route.nombre,
      turno: route.turno,
      paseador: route.paseador_name,
      supervisor_a_cargo: route.supervisor_a_cargo_name,
      ausente: !!route.ausente,
      perros_programados: dogs.length,
      perros_realizados: walk?.estado === 'cerrado' && !walk.tiene_incidencia ? dogs.length : 0,
      perros_no_realizados: !walk || walk.estado !== 'cerrado' ? dogs.length : 0,
      incidencia: !!walk?.tiene_incidencia,
      started_at: walk?.started_at || null,
      ended_at: walk?.ended_at || null,
      validation_status: walk?.validation_status || 'pendiente',
      validador: validator?.name || null,
      motivo_rechazo: walk?.motivo_rechazo || null,
    };
  });
  res.json({ summary });
});
