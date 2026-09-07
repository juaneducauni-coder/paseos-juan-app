import { Router } from 'express';
import { db, logAudit } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

export const inventoryRouter = Router();
inventoryRouter.use(requireAuth);

inventoryRouter.get('/items', requireRole('coordinador', 'administrador', 'supervisor'), (req, res) => {
  const items = db.prepare(`SELECT * FROM inventory_items ORDER BY nombre`).all();
  res.json({ items });
});

inventoryRouter.post('/items', requireRole('coordinador', 'administrador'), (req, res) => {
  const b = req.body || {};
  if (!b.nombre || !String(b.nombre).trim()) return res.status(400).json({ error: 'Indicá el nombre del artículo.' });
  const stock = Number.isFinite(Number(b.stock)) ? Number(b.stock) : 0;
  const minimo = Number.isFinite(Number(b.minimo)) ? Number(b.minimo) : 0;
  const estado = stock <= 0 ? 'Sin stock' : stock <= minimo ? 'Stock bajo' : 'OK';
  try {
    const info = db
      .prepare(`INSERT INTO inventory_items (nombre, stock, minimo, estado) VALUES (?,?,?,?)`)
      .run(String(b.nombre).trim(), stock, minimo, estado);
    logAudit(req.user.id, 'crear_item_inventario', 'inventario', String(info.lastInsertRowid), { nombre: b.nombre });
    res.status(201).json({ item: db.prepare(`SELECT * FROM inventory_items WHERE id = ?`).get(info.lastInsertRowid) });
  } catch (e) {
    res.status(400).json({ error: 'Ya existe un artículo con ese nombre.' });
  }
});

inventoryRouter.patch('/items/:id', requireRole('coordinador', 'administrador'), (req, res) => {
  const item = db.prepare(`SELECT * FROM inventory_items WHERE id = ?`).get(req.params.id);
  if (!item) return res.status(404).json({ error: 'No existe ese artículo.' });
  const b = req.body || {};
  const stock = b.stock !== undefined ? Number(b.stock) : item.stock;
  const minimo = b.minimo !== undefined ? Number(b.minimo) : item.minimo;
  const estado = stock <= 0 ? 'Sin stock' : stock <= minimo ? 'Stock bajo' : 'OK';
  db.prepare(`UPDATE inventory_items SET stock = ?, minimo = ?, estado = ?, updated_at = datetime('now') WHERE id = ?`).run(stock, minimo, estado, req.params.id);
  logAudit(req.user.id, 'actualizar_item_inventario', 'inventario', req.params.id, { stock, minimo });
  res.json({ item: db.prepare(`SELECT * FROM inventory_items WHERE id = ?`).get(req.params.id) });
});

inventoryRouter.get('/requests', requireRole('coordinador', 'administrador', 'supervisor'), (req, res) => {
  const clauses = [];
  const params = [];
  if (req.user.role === 'supervisor') {
    clauses.push('solicitado_por = ?');
    params.push(req.user.id);
  }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const rows = db
    .prepare(
      `SELECT ir.*, u.name AS solicitante_name, r.nombre AS ruta_nombre
       FROM inventory_requests ir JOIN users u ON u.id = ir.solicitado_por
       LEFT JOIN routes r ON r.id = ir.route_id
       ${where} ORDER BY ir.created_at DESC`
    )
    .all(...params);
  res.json({ requests: rows });
});

inventoryRouter.post('/requests', requireRole('supervisor'), (req, res) => {
  const b = req.body || {};
  if (!b.item_nombre || !String(b.item_nombre).trim()) return res.status(400).json({ error: 'Indicá el artículo que necesitás.' });
  const cantidad = Number(b.cantidad);
  if (!cantidad || cantidad <= 0) return res.status(400).json({ error: 'Indicá una cantidad válida.' });
  if (!['baja', 'media', 'alta', 'urgente'].includes(b.prioridad)) return res.status(400).json({ error: 'Indicá una prioridad válida.' });
  if (!b.motivo || !String(b.motivo).trim()) return res.status(400).json({ error: 'Indicá el motivo del pedido.' });

  const existingItem = db.prepare(`SELECT id FROM inventory_items WHERE nombre = ?`).get(String(b.item_nombre).trim());
  const info = db
    .prepare(
      `INSERT INTO inventory_requests (item_id, item_nombre, cantidad, prioridad, motivo, route_id, solicitado_por)
       VALUES (?,?,?,?,?,?,?)`
    )
    .run(existingItem?.id || null, String(b.item_nombre).trim(), cantidad, b.prioridad, String(b.motivo).trim(), b.route_id || null, req.user.id);
  logAudit(req.user.id, 'solicitar_material', 'inventario', String(info.lastInsertRowid), { item: b.item_nombre, cantidad });
  res.status(201).json({ request: db.prepare(`SELECT * FROM inventory_requests WHERE id = ?`).get(info.lastInsertRowid) });
});

inventoryRouter.patch('/requests/:id', requireRole('coordinador', 'administrador'), (req, res) => {
  const request = db.prepare(`SELECT * FROM inventory_requests WHERE id = ?`).get(req.params.id);
  if (!request) return res.status(404).json({ error: 'No existe ese pedido.' });
  const b = req.body || {};
  if (!['pendiente', 'en_preparacion', 'entregada', 'descartada'].includes(b.estado)) {
    return res.status(400).json({ error: 'Estado inválido.' });
  }
  if (b.estado === 'descartada' && (!b.motivo_descarte || !String(b.motivo_descarte).trim())) {
    return res.status(400).json({ error: 'Indicá el motivo del descarte.' });
  }
  db.prepare(`UPDATE inventory_requests SET estado = ?, motivo_descarte = ?, updated_at = datetime('now') WHERE id = ?`).run(
    b.estado,
    b.estado === 'descartada' ? String(b.motivo_descarte).trim() : null,
    req.params.id
  );
  if (b.estado === 'entregada' && request.item_id) {
    db.prepare(`UPDATE inventory_items SET stock = stock - ?, updated_at = datetime('now') WHERE id = ?`).run(request.cantidad, request.item_id);
  }
  logAudit(req.user.id, 'actualizar_pedido_inventario', 'inventario', req.params.id, { estado: b.estado });
  res.json({ request: db.prepare(`SELECT * FROM inventory_requests WHERE id = ?`).get(req.params.id) });
});
