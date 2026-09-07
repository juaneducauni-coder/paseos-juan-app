import { db } from './db.js';
import { hashPassword } from './auth.js';

const userCount = db.prepare(`SELECT COUNT(*) AS n FROM users`).get().n;

if (userCount === 0) {
  const insert = db.prepare(
    `INSERT INTO users (name, email, password_hash, role, turno) VALUES (?,?,?,?,?)`
  );
  const tx = db.transaction(() => {
    insert.run('Juan Buitrago', 'juan@paseosjuan.com', hashPassword('Cambiar123!'), 'administrador', null);
    insert.run('Coordinación Paseos Juan', 'coordinador@paseosjuan.com', hashPassword('Cambiar123!'), 'coordinador', null);
    insert.run('Supervisor Mañana', 'supervisor.manana@paseosjuan.com', hashPassword('Cambiar123!'), 'supervisor', 'mañana');
    insert.run('Supervisor Tarde', 'supervisor.tarde@paseosjuan.com', hashPassword('Cambiar123!'), 'supervisor', 'tarde');
    insert.run('Sebastián', 'sebastian@paseosjuan.com', hashPassword('Cambiar123!'), 'paseador', 'mañana');
  });
  tx();
  console.log('[seed] Usuarios iniciales creados. Contraseñas provisorias: Cambiar123! — cambiarlas antes de usar en producción.');
}

const itemCount = db.prepare(`SELECT COUNT(*) AS n FROM inventory_items`).get().n;
if (itemCount === 0) {
  const insert = db.prepare(
    `INSERT INTO inventory_items (nombre, stock, minimo, estado) VALUES (?,?,?,?)`
  );
  const tx = db.transaction(() => {
    for (const nombre of ['Botiquín', 'Bozal', 'Cinturón', '3 ganchos metálicos', 'Pecheras', 'Bolsas', 'Walkie-talkie']) {
      insert.run(nombre, 0, 1, 'Pendiente de confirmar');
    }
  });
  tx();
  console.log('[seed] Artículos base de inventario creados con stock en 0 — el coordinador debe cargar el stock real.');
}
