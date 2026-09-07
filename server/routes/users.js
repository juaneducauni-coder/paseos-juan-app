import { Router } from 'express';
import { db, logAudit } from '../db.js';
import { requireAuth, requireRole, hashPassword } from '../auth.js';

export const usersRouter = Router();
usersRouter.use(requireAuth, requireRole('administrador'));

usersRouter.get('/', (req, res) => {
  const rows = db.prepare(`SELECT id, name, email, role, turno, active, created_at FROM users ORDER BY role, name`).all();
  res.json({ users: rows });
});

usersRouter.post('/', (req, res) => {
  const b = req.body || {};
  const roles = ['paseador', 'supervisor', 'coordinador', 'administrador'];
  if (!b.name || !String(b.name).trim()) return res.status(400).json({ error: 'Indicá el nombre.' });
  if (!b.email || !String(b.email).trim()) return res.status(400).json({ error: 'Indicá el email.' });
  if (!roles.includes(b.role)) return res.status(400).json({ error: 'Rol inválido.' });
  if (!b.password || String(b.password).length < 6) return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
  const turno = ['mañana', 'tarde'].includes(b.turno) ? b.turno : null;
  try {
    const info = db
      .prepare(`INSERT INTO users (name, email, password_hash, role, turno) VALUES (?,?,?,?,?)`)
      .run(String(b.name).trim(), String(b.email).trim().toLowerCase(), hashPassword(String(b.password)), b.role, turno);
    logAudit(req.user.id, 'crear_usuario', 'usuario', String(info.lastInsertRowid), { role: b.role });
    res.status(201).json({ user: db.prepare(`SELECT id, name, email, role, turno, active FROM users WHERE id = ?`).get(info.lastInsertRowid) });
  } catch (e) {
    res.status(400).json({ error: 'Ya existe un usuario con ese email.' });
  }
});

usersRouter.patch('/:id', (req, res) => {
  const user = db.prepare(`SELECT * FROM users WHERE id = ?`).get(req.params.id);
  if (!user) return res.status(404).json({ error: 'No existe ese usuario.' });
  const b = req.body || {};
  const roles = ['paseador', 'supervisor', 'coordinador', 'administrador'];
  const sets = [];
  const values = [];
  if (b.role !== undefined) {
    if (!roles.includes(b.role)) return res.status(400).json({ error: 'Rol inválido.' });
    sets.push('role = ?');
    values.push(b.role);
  }
  if (b.turno !== undefined) {
    sets.push('turno = ?');
    values.push(['mañana', 'tarde'].includes(b.turno) ? b.turno : null);
  }
  if (b.active !== undefined) {
    sets.push('active = ?');
    values.push(b.active ? 1 : 0);
  }
  if (b.password) {
    if (String(b.password).length < 6) return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres.' });
    sets.push('password_hash = ?');
    values.push(hashPassword(String(b.password)));
  }
  if (!sets.length) return res.status(400).json({ error: 'No se envió ningún cambio.' });
  values.push(req.params.id);
  db.prepare(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`).run(...values);
  logAudit(req.user.id, 'editar_usuario', 'usuario', req.params.id, { campos: Object.keys(b) });
  res.json({ user: db.prepare(`SELECT id, name, email, role, turno, active FROM users WHERE id = ?`).get(req.params.id) });
});

usersRouter.get('/audit', (req, res) => {
  const rows = db
    .prepare(
      `SELECT a.*, u.name AS actor_name FROM audit_log a LEFT JOIN users u ON u.id = a.actor_id
       ORDER BY a.created_at DESC LIMIT 300`
    )
    .all();
  res.json({ log: rows });
});
