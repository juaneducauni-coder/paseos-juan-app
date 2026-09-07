# Paseos Juan — Plataforma interna

Primera versión operativa interna de Paseos Juan. Centraliza en un solo lugar lo que hoy vive repartido en Word y Sheets: fichas de perros, rutas y jornadas, chat interno restringido, inventario y finanzas.

**Alcance de esta versión: solo roles internos.** No hay portal de clientes.

## Roles

- **Paseador**: ve solo sus rutas y perros asignados, inicia/termina paseos, completa el checklist de equipo, registra observaciones e incidencias. Chatea únicamente con su supervisor. No crea perros ni rutas, no ve precios.
- **Supervisor**: crea y asigna rutas, evalúa perros nuevos antes de meterlos en un grupo, valida o rechaza los reportes del paseador, gestiona ausencias y cobertura, pide materiales al coordinador. Chatea con paseadores y coordinador.
- **Coordinador**: da de alta y actualiza fichas de perros, consulta rutas/cobertura/reportes, gestiona el inventario. Chatea con paseadores, supervisores, administrador y clientes. No ve finanzas.
- **Administrador**: control global de usuarios y roles, auditoría, y la única cuenta que ve/gestiona precios, pagos, ingresos, gastos y ganancias. Chatea con coordinador y clientes.

## Arquitectura

- **Backend**: Node.js + Express + SQLite (`better-sqlite3`). Autenticación real por email/contraseña con `bcrypt` y sesión por cookie httpOnly (no hay login simulado ni permisos solo de interfaz: todo se valida en el servidor).
- **Frontend**: SPA en JavaScript vanilla (sin build step) servida como estático por el mismo Express, con router propio y llamadas a la API real.
- **Datos**: una única base SQLite (`data/paseosjuan.db`, no versionada) es la fuente de verdad. No hay `localStorage` como almacenamiento de datos de negocio.

## Cómo correrlo

```bash
npm install
npm start
```

Por defecto escucha en el puerto `4173` (`http://localhost:4173`). Se puede cambiar con la variable de entorno `PORT`.

Al arrancar por primera vez se crean automáticamente (`server/seed.js`):

- Usuarios de prueba, uno por rol, con contraseña provisoria `Cambiar123!` (**cambiarla antes de usar en producción**, desde Administrador → Usuarios y roles).
- Los artículos base de inventario (botiquín, bozal, cinturón, ganchos, pecheras, bolsas, walkie-talkie) con stock en 0, a la espera de que el coordinador cargue el stock real.

No se inventan datos de perros, rutas ni movimientos financieros: esos los carga el equipo real desde la aplicación.

## Estructura

- `server/`: API Express (auth, perros, rutas, jornadas/paseos, chat, inventario, finanzas, usuarios), esquema y semilla de la base SQLite.
- `public/`: frontend estático (`index.html`, `css/styles.css`, `js/app.js` + `js/views/*.js` por rol).
- `data/`: base SQLite en tiempo de ejecución (no versionada).
