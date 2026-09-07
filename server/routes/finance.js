import { Router } from 'express';
import { db, logAudit } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

export const financeRouter = Router();
financeRouter.use(requireAuth, requireRole('administrador'));

financeRouter.get('/movements', (req, res) => {
  const { desde, hasta, categoria } = req.query;
  const clauses = [];
  const params = [];
  if (desde) {
    clauses.push('fecha >= ?');
    params.push(desde);
  }
  if (hasta) {
    clauses.push('fecha <= ?');
    params.push(hasta);
  }
  if (categoria) {
    clauses.push('categoria = ?');
    params.push(categoria);
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = db
    .prepare(
      `SELECT fm.*, u.name AS responsable_name FROM finance_movements fm JOIN users u ON u.id = fm.responsable_id
       ${where} ORDER BY fecha DESC, fm.id DESC`
    )
    .all(...params);
  const ingresos = rows.filter((r) => r.tipo === 'ingreso').reduce((s, r) => s + r.importe, 0);
  const gastos = rows.filter((r) => r.tipo === 'gasto').reduce((s, r) => s + r.importe, 0);
  const porCategoria = {};
  for (const r of rows.filter((r) => r.tipo === 'gasto')) {
    porCategoria[r.categoria] = (porCategoria[r.categoria] || 0) + r.importe;
  }
  res.json({
    movements: rows,
    resumen: { ingresos, gastos, gananciaNeta: ingresos - gastos, porCategoria },
  });
});

financeRouter.post('/movements', (req, res) => {
  const b = req.body || {};
  if (!b.fecha || !/^\d{4}-\d{2}-\d{2}$/.test(b.fecha)) return res.status(400).json({ error: 'Indicá la fecha (AAAA-MM-DD).' });
  if (!['ingreso', 'gasto'].includes(b.tipo)) return res.status(400).json({ error: 'Indicá si es ingreso o gasto.' });
  if (!b.categoria || !String(b.categoria).trim()) return res.status(400).json({ error: 'Indicá la categoría del movimiento.' });
  const importe = Number(b.importe);
  if (!importe || importe <= 0) return res.status(400).json({ error: 'Indicá un importe válido mayor a 0.' });
  const info = db
    .prepare(`INSERT INTO finance_movements (fecha, tipo, categoria, importe, responsable_id, nota, respaldo) VALUES (?,?,?,?,?,?,?)`)
    .run(b.fecha, b.tipo, String(b.categoria).trim(), importe, req.user.id, b.nota || null, b.respaldo || null);
  logAudit(req.user.id, 'crear_movimiento_financiero', 'finanzas', String(info.lastInsertRowid), { tipo: b.tipo, categoria: b.categoria, importe });
  res.status(201).json({ movement: db.prepare(`SELECT * FROM finance_movements WHERE id = ?`).get(info.lastInsertRowid) });
});

financeRouter.patch('/movements/:id', (req, res) => {
  const mov = db.prepare(`SELECT * FROM finance_movements WHERE id = ?`).get(req.params.id);
  if (!mov) return res.status(404).json({ error: 'No existe ese movimiento.' });
  const b = req.body || {};
  const editable = ['fecha', 'categoria', 'importe', 'nota', 'respaldo'];
  const tx = db.transaction(() => {
    for (const f of editable) {
      if (Object.prototype.hasOwnProperty.call(b, f) && String(b[f] ?? '') !== String(mov[f] ?? '')) {
        db.prepare(`INSERT INTO finance_movement_history (movement_id, changed_by, campo, valor_anterior, valor_nuevo) VALUES (?,?,?,?,?)`).run(
          mov.id,
          req.user.id,
          f,
          mov[f] != null ? String(mov[f]) : null,
          b[f] != null ? String(b[f]) : null
        );
        db.prepare(`UPDATE finance_movements SET ${f} = ? WHERE id = ?`).run(b[f], mov.id);
      }
    }
    db.prepare(`UPDATE finance_movements SET updated_at = datetime('now') WHERE id = ?`).run(mov.id);
  });
  tx();
  logAudit(req.user.id, 'editar_movimiento_financiero', 'finanzas', req.params.id, {});
  res.json({ movement: db.prepare(`SELECT * FROM finance_movements WHERE id = ?`).get(req.params.id) });
});

financeRouter.get('/movements/:id/history', (req, res) => {
  const rows = db
    .prepare(
      `SELECT h.*, u.name AS changed_by_name FROM finance_movement_history h JOIN users u ON u.id = h.changed_by
       WHERE movement_id = ? ORDER BY changed_at DESC`
    )
    .all(req.params.id);
  res.json({ history: rows });
});
