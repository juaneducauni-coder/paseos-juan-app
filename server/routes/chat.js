import { Router } from 'express';
import { db, logAudit } from '../db.js';
import { requireAuth, requireRole } from '../auth.js';

export const chatRouter = Router();
chatRouter.use(requireAuth);

// Pares de roles habilitados para chat interno (no hay chat libre).
const ALLOWED_PAIRS = [
  ['paseador', 'supervisor'],
  ['supervisor', 'coordinador'],
  ['coordinador', 'administrador'],
];

// Roles que pueden escribirle a un cliente. Los paseadores nunca escriben a clientes.
const CAN_MESSAGE_CLIENTS = ['coordinador', 'supervisor', 'administrador'];

function rolesAllowed(roleA, roleB) {
  return ALLOWED_PAIRS.some(([a, b]) => (a === roleA && b === roleB) || (a === roleB && b === roleA));
}

function threadKeyFor(idA, idB) {
  const [x, y] = [Number(idA), Number(idB)].sort((a, b) => a - b);
  return `u:${x}-${y}`;
}

function clientThreadKey(name) {
  return `c:${String(name).trim().toLowerCase().replace(/\s+/g, '-')}`;
}

// Contactos habilitados para el usuario logueado, según la matriz de roles.
chatRouter.get('/contacts', (req, res) => {
  const { role, id } = req.user;
  const partnerRoles = new Set();
  for (const [a, b] of ALLOWED_PAIRS) {
    if (a === role) partnerRoles.add(b);
    if (b === role) partnerRoles.add(a);
  }
  const contacts = partnerRoles.size
    ? db
        .prepare(
          `SELECT id, name, role, turno FROM users WHERE active = 1 AND id != ? AND role IN (${[...partnerRoles].map(() => '?').join(',')}) ORDER BY role, name`
        )
        .all(id, ...partnerRoles)
    : [];
  res.json({ contacts, canMessageClients: CAN_MESSAGE_CLIENTS.includes(role) });
});

chatRouter.get('/threads', (req, res) => {
  const rows = db
    .prepare(
      `SELECT thread_key, MAX(created_at) AS last_at,
        (SELECT body FROM messages m2 WHERE m2.thread_key = m.thread_key ORDER BY m2.created_at DESC LIMIT 1) AS last_body,
        (SELECT client_name FROM messages m3 WHERE m3.thread_key = m.thread_key AND m3.is_client_message = 1 LIMIT 1) AS client_name,
        (SELECT sender_id FROM messages m4 WHERE m4.thread_key = m.thread_key ORDER BY m4.created_at DESC LIMIT 1) AS last_sender_id,
        (SELECT recipient_id FROM messages m5 WHERE m5.thread_key = m.thread_key ORDER BY m5.created_at DESC LIMIT 1) AS last_recipient_id
       FROM messages m
       WHERE sender_id = ? OR recipient_id = ?
       GROUP BY thread_key ORDER BY last_at DESC`
    )
    .all(req.user.id, req.user.id);

  const enriched = rows.map((r) => {
    let title = r.client_name ? `Cliente: ${r.client_name}` : null;
    let otherUserId = null;
    if (!title) {
      otherUserId = r.last_sender_id === req.user.id ? r.last_recipient_id : r.last_sender_id;
      const other = otherUserId ? db.prepare(`SELECT name, role FROM users WHERE id = ?`).get(otherUserId) : null;
      title = other ? `${other.name} (${other.role})` : r.thread_key;
    }
    return {
      thread_key: r.thread_key,
      title,
      last_body: r.last_body,
      last_at: r.last_at,
      is_client: !!r.client_name,
      client_name: r.client_name || null,
      other_user_id: otherUserId,
    };
  });
  res.json({ threads: enriched });
});

chatRouter.get('/threads/:key/messages', (req, res) => {
  const key = req.params.key;
  const own = db.prepare(`SELECT 1 FROM messages WHERE thread_key = ? AND (sender_id = ? OR recipient_id = ?) LIMIT 1`).get(key, req.user.id, req.user.id);
  if (!own && req.user.role !== 'administrador') {
    return res.status(403).json({ error: 'No tenés acceso a esta conversación.' });
  }
  const rows = db.prepare(`SELECT * FROM messages WHERE thread_key = ? ORDER BY created_at`).all(key);
  res.json({ messages: rows });
});

chatRouter.post('/messages', (req, res) => {
  const b = req.body || {};
  if (!b.body || !String(b.body).trim()) {
    return res.status(400).json({ error: 'Escribí un mensaje antes de enviarlo.' });
  }

  if (b.client_name) {
    if (!CAN_MESSAGE_CLIENTS.includes(req.user.role)) {
      return res.status(403).json({ error: 'Tu rol no puede enviar mensajes a clientes.' });
    }
    const key = clientThreadKey(b.client_name);
    const info = db
      .prepare(
        `INSERT INTO messages (sender_id, sender_role, recipient_id, recipient_role, is_client_message, client_name, thread_key, body)
         VALUES (?,?,?,?,1,?,?,?)`
      )
      .run(req.user.id, req.user.role, null, 'cliente', String(b.client_name).trim(), key, String(b.body).trim());
    logAudit(req.user.id, 'mensaje_cliente', 'chat', key, { cliente: b.client_name });
    return res.status(201).json({ message: db.prepare(`SELECT * FROM messages WHERE id = ?`).get(info.lastInsertRowid) });
  }

  if (!b.recipient_id) return res.status(400).json({ error: 'Elegí un destinatario.' });
  const recipient = db.prepare(`SELECT * FROM users WHERE id = ? AND active = 1`).get(b.recipient_id);
  if (!recipient) return res.status(400).json({ error: 'El destinatario no existe o no está activo.' });
  if (!rolesAllowed(req.user.role, recipient.role)) {
    return res.status(403).json({ error: `No está permitido el chat entre ${req.user.role} y ${recipient.role}.` });
  }
  const key = threadKeyFor(req.user.id, recipient.id);
  const info = db
    .prepare(
      `INSERT INTO messages (sender_id, sender_role, recipient_id, recipient_role, is_client_message, thread_key, body)
       VALUES (?,?,?,?,0,?,?)`
    )
    .run(req.user.id, req.user.role, recipient.id, recipient.role, key, String(b.body).trim());
  res.status(201).json({ message: db.prepare(`SELECT * FROM messages WHERE id = ?`).get(info.lastInsertRowid) });
});

// Auditoría de comunicación con clientes — solo administrador.
chatRouter.get('/audit/clients', requireRole('administrador'), (req, res) => {
  const rows = db
    .prepare(
      `SELECT m.*, u.name AS sender_name FROM messages m JOIN users u ON u.id = m.sender_id
       WHERE m.is_client_message = 1 ORDER BY m.created_at DESC LIMIT 200`
    )
    .all();
  res.json({ messages: rows });
});
