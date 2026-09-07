import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'paseosjuan.db');
export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('paseador','supervisor','coordinador','administrador')),
  turno TEXT CHECK (turno IN ('mañana','tarde') OR turno IS NULL),
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS dogs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  photo_desc TEXT,
  birth_or_age TEXT,
  breed TEXT,
  sex TEXT,
  castrado TEXT,
  peso TEXT,
  tamano TEXT,
  tutor_name TEXT,
  tutor_phone TEXT,
  tutor_phone_alt TEXT,
  address_zone TEXT,
  authorized_pickup TEXT,
  emergency_contact TEXT,
  salud_estado TEXT,
  condiciones_medicas TEXT,
  medicacion TEXT,
  alergias TEXT,
  limitaciones TEXT,
  veterinaria TEXT,
  veterinaria_telefono TEXT,
  vacunas TEXT,
  indicaciones_tutor TEXT,
  collar_tipo TEXT,
  arnes_tipo TEXT,
  correa_tipo TEXT,
  equipo_estado TEXT,
  duracion_paseo TEXT,
  frecuencia_semanal TEXT,
  horarios TEXT,
  rutina TEXT,
  acceso_domicilio TEXT,
  alimentacion_agua TEXT,
  estado TEXT NOT NULL DEFAULT 'SIN_EVALUAR' CHECK (estado IN ('VERDE','AMARILLO','ROJO','SIN_EVALUAR')),
  estado_motivo TEXT,
  estado_fecha TEXT,
  estado_fuente TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  archived INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS dog_evaluations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  supervisor_id INTEGER NOT NULL REFERENCES users(id),
  fecha TEXT NOT NULL,
  energia TEXT,
  conducta_perros TEXT,
  conducta_personas TEXT,
  conducta_ninos TEXT,
  reaccion_bicicletas TEXT,
  reaccion_motos TEXT,
  reaccion_autos TEXT,
  reaccion_ruidos TEXT,
  reaccion_comida TEXT,
  miedos TEXT,
  desencadenantes TEXT,
  senales_estres TEXT,
  tendencia_escape TEXT,
  tendencia_tirar TEXT,
  capacidad_grupo TEXT,
  perros_compatibles TEXT,
  perros_incompatibles TEXT,
  indicaciones TEXT,
  estado TEXT NOT NULL CHECK (estado IN ('VERDE','AMARILLO','ROJO','SIN_EVALUAR')),
  motivo TEXT NOT NULL,
  fuente TEXT NOT NULL DEFAULT 'Observación directa del supervisor',
  observaciones TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS dog_observations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
  walk_id INTEGER REFERENCES walks(id),
  author_id INTEGER NOT NULL REFERENCES users(id),
  author_role TEXT NOT NULL,
  fecha TEXT NOT NULL,
  lugar TEXT,
  contexto TEXT,
  estimulo TEXT,
  distancia TEXT,
  reaccion TEXT NOT NULL,
  accion TEXT,
  resultado TEXT,
  nivel_riesgo TEXT,
  seguimiento TEXT,
  tipo TEXT NOT NULL DEFAULT 'observacion' CHECK (tipo IN ('observacion','incidencia')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS routes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT NOT NULL,
  turno TEXT NOT NULL CHECK (turno IN ('mañana','tarde')),
  nombre TEXT NOT NULL,
  punto_encuentro TEXT,
  horario TEXT,
  instrucciones TEXT,
  paseador_id INTEGER REFERENCES users(id),
  ausente INTEGER NOT NULL DEFAULT 0,
  motivo_ausencia TEXT,
  supervisor_a_cargo_id INTEGER REFERENCES users(id),
  estado TEXT NOT NULL DEFAULT 'asignada' CHECK (estado IN ('asignada','en_curso','cerrada','cancelada')),
  created_by INTEGER NOT NULL REFERENCES users(id),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS route_dogs (
  route_id INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  dog_id TEXT NOT NULL REFERENCES dogs(id),
  orden INTEGER NOT NULL DEFAULT 0,
  excepcion_motivo TEXT,
  PRIMARY KEY (route_id, dog_id)
);

CREATE TABLE IF NOT EXISTS walks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  route_id INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  executor_id INTEGER NOT NULL REFERENCES users(id),
  checklist_json TEXT,
  equipo_alerta TEXT,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','en_curso','cerrado')),
  started_at TEXT,
  ended_at TEXT,
  entrega_confirmada INTEGER NOT NULL DEFAULT 0,
  observacion_cierre TEXT,
  tiene_incidencia INTEGER NOT NULL DEFAULT 0,
  ayuda_solicitada INTEGER NOT NULL DEFAULT 0,
  ayuda_motivo TEXT,
  validation_status TEXT NOT NULL DEFAULT 'pendiente' CHECK (validation_status IN ('pendiente','validado','rechazado')),
  validated_by INTEGER REFERENCES users(id),
  validated_at TEXT,
  motivo_rechazo TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS work_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id),
  role TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('inicio','fin')),
  timestamp TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL REFERENCES users(id),
  sender_role TEXT NOT NULL,
  recipient_id INTEGER REFERENCES users(id),
  recipient_role TEXT,
  is_client_message INTEGER NOT NULL DEFAULT 0,
  client_name TEXT,
  thread_key TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS inventory_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  stock INTEGER NOT NULL DEFAULT 0,
  minimo INTEGER NOT NULL DEFAULT 0,
  estado TEXT NOT NULL DEFAULT 'Pendiente de confirmar',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS inventory_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id INTEGER REFERENCES inventory_items(id),
  item_nombre TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  prioridad TEXT NOT NULL CHECK (prioridad IN ('baja','media','alta','urgente')),
  motivo TEXT NOT NULL,
  route_id INTEGER REFERENCES routes(id),
  solicitado_por INTEGER NOT NULL REFERENCES users(id),
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','en_preparacion','entregada','descartada')),
  motivo_descarte TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS finance_movements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('ingreso','gasto')),
  categoria TEXT NOT NULL,
  importe REAL NOT NULL,
  responsable_id INTEGER NOT NULL REFERENCES users(id),
  nota TEXT,
  respaldo TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS finance_movement_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  movement_id INTEGER NOT NULL REFERENCES finance_movements(id) ON DELETE CASCADE,
  changed_by INTEGER NOT NULL REFERENCES users(id),
  changed_at TEXT NOT NULL DEFAULT (datetime('now')),
  campo TEXT NOT NULL,
  valor_anterior TEXT,
  valor_nuevo TEXT
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_id INTEGER REFERENCES users(id),
  accion TEXT NOT NULL,
  entidad TEXT NOT NULL,
  entidad_id TEXT,
  detalle TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

export function logAudit(actorId, accion, entidad, entidadId, detalle) {
  db.prepare(
    `INSERT INTO audit_log (actor_id, accion, entidad, entidad_id, detalle) VALUES (?,?,?,?,?)`
  ).run(actorId ?? null, accion, entidad, entidadId ?? null, detalle ? JSON.stringify(detalle) : null);
}
