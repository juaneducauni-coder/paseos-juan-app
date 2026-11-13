// Crea usuarios de prueba en el almacenamiento LOCAL (.data/). Nunca toca Vercel ni la planilla.
// Uso: node scripts/seed-dev.mjs
// Usuarios (PIN 482915 para todos): juan (admin), sebastian (paseador),
// nicolas (supervisor), coordina (coordinador), mateo (marketing).
import { hashPin } from "../api/_lib/auth.js";

delete process.env.VERCEL;
delete process.env.BLOB_READ_WRITE_TOKEN;
delete process.env.SHEETS_API_URL;
const { store } = await import("../api/_lib/store.js");

const PIN = "482915";
const users = [
  ["juan", "Juan Buitrago", "admin"],
  ["sebastian", "Sebastián", "paseador"],
  ["nicolas", "Nicolás", "supervisor"],
  ["coordina", "Coordinación (prueba)", "coordinador"],
  ["mateo", "Mateo Pérez", "marketing"],
];

for (const [usuario, nombre, rol] of users) {
  const { salt, hash } = hashPin(PIN);
  await store.putUser({ usuario, nombre, rol, activo: true, salt, hash, version: 1, creadoEn: new Date().toISOString(), creadoPor: "seed-dev" });
}
console.log(`Listo: ${users.length} usuarios de prueba en ${store.mode} (PIN ${PIN}).`);
