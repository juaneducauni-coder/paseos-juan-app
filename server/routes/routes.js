import { Router } from 'express';
import { db, logAudit } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

export const routesRouter = Router();
routesRouter.use(requireAuth);

const MAX_DOGS_PER_ROUTE = 7;

function routeWithDogs(routeId) {
  const route = db
    .prepare(
      `SELECT r.*, p.name AS paseador_name, s.name AS supervisor_a_cargo_name, c.name AS created_by_name
       FROM routes r
       LEFT JOIN users p ON p.id = r.paseador_id
       LEFT JOIN users s ON s.id = r.supervisor_a_cargo_id
       LEFT JOIN users c ON c.id = r.created_by
       WHERE r.id = ?`
    )
    .get(routeId);
  if (!route) return null;
  const dogs = db
    .prepare(
      `SELECT d.id, d.name, d.estado, d.tamano, rd.orden, rd.excepcion_motivo
       FROM route_dogs rd JOIN dogs d ON d.id = rd.dog_id
       WHERE rd.route_id = ? ORDER BY rd.orden`
    )
    .all(routeId);
  const walk = db.prepare(`SELECT * FROM walks WHERE route_id = ? ORDER BY id DESC LIMIT 1`).get(routeId);
  return { ...route, dogs, walk: walk || null };
}

routesRouter.get('/', (req, res) => {
  const { role, id } = req.user;
  const { fecha, turno } = req.query;
  const clauses = [];
  const params = [];
  if (fecha) {
    clauses.push('r.fecha = ?');
    params.push(fecha);
  }
  if (turno) {
    clauses.push('r.turno = ?');
    params.push(turno);
  }
  if (role === 'paseador') {
    clauses.push('r.paseador_id = ?');
    params.push(id);
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = db
    .prepare(
      `SELECT r.*, p.name AS paseador_name, s.name AS supervisor_a_cargo_name
       FROM routes r LEFT JOIN users p ON p.id = r.paseador_id LEFT JOIN users s ON s.id = r.supervisor_a_cargo_id
       ${where} ORDER BY r.fecha DESC, r.turno, r.id DESC`
    )
    .all(...params);
  res.json({ routes: rows.map((r) => ({ ...routeWithDogs(r.id) })) });
});

routesRouter.get('/:id', (req, res) => {
  const route = routeWithDogs(req.params.id);
  if (!route) return res.status(404).json({ error: 'No existe esa ruta.' });
  if (req.user.role === 'paseador' && route.paseador_id !== req.user.id) {
    return res.status(403).json({ error: 'Esta ruta no está asignada a vos.' });
  }
  res.json({ route });
});

function validateDogsForRoute(dogIds, exceptions) {
  if (!Array.isArray(dogIds) || dogIds.length === 0) {
    return 'La ruta necesita al menos un perro.';
  }
  if (dogIds.length > MAX_DOGS_PER_ROUTE) {
    return `No se puede superar el máximo de ${MAX_DOGS_PER_ROUTE} perros por grupo/paseador.`;
  }
  const dogs = dogIds.map((id) => db.prepare(`SELECT * FROM dogs WHERE id = ?`).get(id));
  const missing = dogIds.filter((id, i) => !dogs[i]);
  if (missing.length) return `No existen fichas para: ${missing.join(', ')}.`;

  const grupal = dogIds.length > 1;
  if (grupal) {
    for (const dog of dogs) {
      const hasException = exceptions?.[dog.id]?.trim();
      if ((dog.estado === 'SIN_EVALUAR' || dog.estado === 'ROJO') && !hasException) {
        return `${dog.name} (${dog.id}) está en estado ${dog.estado === 'SIN_EVALUAR' ? 'SIN EVALUAR' : 'ROJO'} y no puede entrar a un paseo grupal sin una excepción del supervisor con motivo.`;
      }
    }
    // Incompatibilidades según la última evaluación de cada perro.
    for (const dog of dogs) {
      const evalRow = db
        .prepare(`SELECT perros_incompatibles FROM dog_evaluations WHERE dog_id = ? ORDER BY created_at DESC LIMIT 1`)
        .get(dog.id);
      const incompat = (evalRow?.perros_incompatibles || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      for (const other of dogs) {
        if (other.id === dog.id) continue;
        if (incompat.includes(other.id) || incompat.includes(other.name)) {
          const hasException = exceptions?.[dog.id]?.trim() || exceptions?.[other.id]?.trim();
          if (!hasException) {
            return `${dog.name} y ${other.name} están marcados como incompatibles. Se necesita una excepción del supervisor con motivo para juntarlos.`;
          }
        }
      }
    }
  }
  return null;
}

routesRouter.post('/', requireRole('supervisor'), (req, res) => {
  const b = req.body || {};
  if (!b.fecha || !/^\d{4}-\d{2}-\d{2}$/.test(b.fecha)) {
    return res.status(400).json({ error: 'Indicá la fecha de la ruta (AAAA-MM-DD).' });
  }
  if (!b.turno || !['mañana', 'tarde'].includes(b.turno)) {
    return res.status(400).json({ error: 'Indicá el turno: mañana o tarde.' });
  }
  if (!b.nombre || !String(b.nombre).trim()) {
    return res.status(400).json({ error: 'Ponele un nombre a la ruta.' });
  }
  const dogIds = Array.isArray(b.dog_ids) ? b.dog_ids : [];
  const exceptions = b.exceptions || {};
  const err = validateDogsForRoute(dogIds, exceptions);
  if (err) return res.status(400).json({ error: err });

  if (b.paseador_id) {
    const walker = db.prepare(`SELECT * FROM users WHERE id = ? AND role = 'paseador' AND active = 1`).get(b.paseador_id);
    if (!walker) return res.status(400).json({ error: 'El paseador seleccionado no existe o no está activo.' });
  }

  const tx = db.transaction(() => {
    const info = db
      .prepare(
        `INSERT INTO routes (fecha, turno, nombre, punto_encuentro, horario, instrucciones, paseador_id, created_by)
         VALUES (?,?,?,?,?,?,?,?)`
      )
      .run(b.fecha, b.turno, String(b.nombre).trim(), b.punto_encuentro || null, b.horario || null, b.instrucciones || null, b.paseador_id || null, req.user.id);
    const routeId = info.lastInsertRowid;
    dogIds.forEach((dogId, i) => {
      db.prepare(`INSERT INTO route_dogs (route_id, dog_id, orden, excepcion_motivo) VALUES (?,?,?,?)`).run(
        routeId,
        dogId,
        i,
        exceptions?.[dogId]?.trim() || null
      );
    });
    return routeId;
  });
  const routeId = tx();
  logAudit(req.user.id, 'crear_ruta', 'ruta', String(routeId), { fecha: b.fecha, turno: b.turno, perros: dogIds.length });
  res.status(201).json({ route: routeWithDogs(routeId) });
});

routesRouter.patch('/:id', requireRole('supervisor'), (req, res) => {
  const route = db.prepare(`SELECT * FROM routes WHERE id = ?`).get(req.params.id);
  if (!route) return res.status(404).json({ error: 'No existe esa ruta.' });
  const b = req.body || {};
  const sets = [];
  const values = [];
  if (b.paseador_id !== undefined) {
    if (b.paseador_id) {
      const walker = db.prepare(`SELECT * FROM users WHERE id = ? AND role = 'paseador' AND active = 1`).get(b.paseador_id);
      if (!walker) return res.status(400).json({ error: 'El paseador seleccionado no existe o no está activo.' });
    }
    sets.push('paseador_id = ?');
    values.push(b.paseador_id || null);
  }
  if (b.instrucciones !== undefined) {
    sets.push('instrucciones = ?');
    values.push(b.instrucciones || null);
  }
  if (b.punto_encuentro !== undefined) {
    sets.push('punto_encuentro = ?');
    values.push(b.punto_encuentro || null);
  }
  if (b.horario !== undefined) {
    sets.push('horario = ?');
    values.push(b.horario || null);
  }
  if (!sets.length) return res.status(400).json({ error: 'No se envió ningún cambio.' });
  sets.push(`updated_at = datetime('now')`);
  values.push(req.params.id);
  db.prepare(`UPDATE routes SET ${sets.join(', ')} WHERE id = ?`).run(...values);
  logAudit(req.user.id, 'editar_ruta', 'ruta', req.params.id, {});
  res.json({ route: routeWithDogs(req.params.id) });
});

// Marcar ausencia y resolver cobertura: reasignar paseador o supervisor a cargo.
routesRouter.post('/:id/ausencia', requireRole('supervisor'), (req, res) => {
  const route = db.prepare(`SELECT * FROM routes WHERE id = ?`).get(req.params.id);
  if (!route) return res.status(404).json({ error: 'No existe esa ruta.' });
  const b = req.body || {};
  if (!b.motivo || !String(b.motivo).trim()) {
    return res.status(400).json({ error: 'Indicá el motivo de la ausencia.' });
  }
  if (!b.reassign_paseador_id && !b.supervisor_a_cargo) {
    return res.status(400).json({ error: 'Elegí una cobertura: reasignar a otro paseador o marcar supervisor a cargo.' });
  }
  let newPaseadorId = route.paseador_id;
  let supervisorACargo = null;
  if (b.reassign_paseador_id) {
    const walker = db.prepare(`SELECT * FROM users WHERE id = ? AND role = 'paseador' AND active = 1`).get(b.reassign_paseador_id);
    if (!walker) return res.status(400).json({ error: 'El paseador de reemplazo no existe o no está activo.' });
    newPaseadorId = b.reassign_paseador_id;
  } else if (b.supervisor_a_cargo) {
    supervisorACargo = req.user.id;
    newPaseadorId = null;
  }
  db.prepare(
    `UPDATE routes SET ausente = 1, motivo_ausencia = ?, paseador_id = ?, supervisor_a_cargo_id = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(String(b.motivo).trim(), newPaseadorId, supervisorACargo, req.params.id);
  logAudit(req.user.id, 'registrar_ausencia', 'ruta', req.params.id, { motivo: b.motivo, supervisorACargo: !!supervisorACargo });
  res.json({ route: routeWithDogs(req.params.id) });
});

routesRouter.get('/meta/walkers', requireRole('supervisor', 'coordinador', 'administrador'), (req, res) => {
  const rows = db.prepare(`SELECT id, name, turno FROM users WHERE role = 'paseador' AND active = 1 ORDER BY name`).all();
  res.json({ walkers: rows });
});

export const MAX_DOGS = MAX_DOGS_PER_ROUTE;
