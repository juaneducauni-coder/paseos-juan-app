import { Router } from 'express';
import { db, logAudit } from '../db.js';
import {
  verifyPassword,
  createSession,
  destroySession,
  setSessionCookie,
  clearSessionCookie,
} from '../auth.js';

export const authRouter = Router();

function publicUser(u) {
  return { id: u.id, name: u.name, email: u.email, role: u.role, turno: u.turno };
}

authRouter.post('/login', (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');

  if (!email || !password) {
    return res.status(400).json({ error: 'Ingresá tu email y tu contraseña.' });
  }

  const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
  if (!user || !user.active) {
    return res.status(401).json({ error: 'No encontramos una cuenta activa con ese email.' });
  }
  if (!verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'La contraseña es incorrecta.' });
  }

  const { token } = createSession(user.id);
  setSessionCookie(res, token);
  logAudit(user.id, 'login', 'usuario', String(user.id), { email });
  res.json({ user: publicUser(user) });
});

authRouter.post('/logout', (req, res) => {
  if (req.sessionToken) destroySession(req.sessionToken);
  clearSessionCookie(res);
  res.json({ ok: true });
});

authRouter.get('/me', (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'No hay una sesión activa.' });
  res.json({ user: publicUser(req.user) });
});
