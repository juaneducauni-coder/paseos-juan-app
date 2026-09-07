import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { db } from './db.js';

const SESSION_COOKIE = 'pj_session';
const SESSION_TTL_HOURS = 12;

export function hashPassword(plain) {
  return bcrypt.hashSync(plain, 10);
}

export function verifyPassword(plain, hash) {
  return bcrypt.compareSync(plain, hash);
}

export function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 3600 * 1000).toISOString();
  db.prepare(`INSERT INTO sessions (token, user_id, expires_at) VALUES (?,?,?)`).run(token, userId, expiresAt);
  return { token, expiresAt };
}

export function destroySession(token) {
  db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
}

export function getUserBySession(token) {
  if (!token) return null;
  const row = db
    .prepare(
      `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = ? AND s.expires_at > datetime('now') AND u.active = 1`
    )
    .get(token);
  return row || null;
}

export function attachUser(req, res, next) {
  const token = req.cookies?.[SESSION_COOKIE];
  const user = getUserBySession(token);
  req.user = user;
  req.sessionToken = token;
  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'No hay una sesión activa. Iniciá sesión para continuar.' });
  }
  next();
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No hay una sesión activa. Iniciá sesión para continuar.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'No tenés permiso para realizar esta acción.' });
    }
    next();
  };
}

export function setSessionCookie(res, token) {
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: SESSION_TTL_HOURS * 3600 * 1000,
  });
}

export function clearSessionCookie(res) {
  res.clearCookie(SESSION_COOKIE);
}

export const COOKIE_NAME = SESSION_COOKIE;
