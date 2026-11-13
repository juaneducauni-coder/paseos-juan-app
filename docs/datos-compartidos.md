# Datos compartidos de la app — contrato para todas las páginas

Todas las páginas del equipo usan `src/api/client.js`. No guarden datos del trabajo en `localStorage` directo: lo que se guarda con `registros.save` lo ven los demás usuarios (según permisos) y llega a la planilla.

## Cómo se usa

```js
import { session, registros, onDataChange, hoyAR } from "../api/client.js";

const user = session.user();            // { usuario, nombre, rol }
const hoy = hoyAR();                    // "2026-11-13" (hora de Argentina)

// Al dibujar: usar lo que está en caché (instantáneo) y pedir lo nuevo en segundo plano.
const lista = registros.cached("paseos", { desde: hoy });
registros.watch("paseos", { desde: hoy }); // refresca cada minuto con la pestaña visible

// Cuando llegan datos nuevos, volver a dibujar la página:
onDataChange((col) => { if (col === "paseos") render(); });

// Guardar (crea o actualiza si el id ya existe). Sin señal, queda en cola y se envía solo.
await registros.save("paseos", { id, fecha: hoy, ...datos });
```

- Si `save` devuelve `pendiente: true`, mostrá "Se enviará cuando haya señal".
- `registros.pendingCount()` da cuántos cambios esperan señal.
- Errores: `save`/`list` lanzan `ApiError` con `message` en castellano. Mostralo en un `aria-live`.
- `onDataChange` se dispara una vez por colección con datos nuevos. Registralo una sola vez (al importar el módulo o con una bandera), no en cada render.
- Para salir de la sesión, el botón "Salir" lleva a `/salir`.

## Roles (definidos por Juan el 13/11/2026)

| Rol | Qué hace | Página | Ve plata |
|---|---|---|---|
| admin | Juan. Todo: usuarios, pagos, indicadores. | `/admin` (y todas) | Sí |
| coordinador | Arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes de los paseos, atiende pedidos y avisa lo que pasa en cada barrio. | `/coordinador` | **No** |
| supervisor | Se asegura de que se cumplan los paseos del momento: quién falta retirar, atrasos contra el horario, entregas, incidentes, equipo. Mira las rutas y, si habló con alguien o pasó algo, **le pide el cambio al coordinador** (no edita la ruta él). | `/supervisor` (y `/paseador`) | No |
| paseador | Hace su ruta del turno, en orden y con horario. | `/paseador` | No |
| ayudante | Ayudante de paseador: acompaña al paseador en su ruta, marca pasos y reporta incidentes. Sin datos de clientes. | `/paseador` (modo ayudante) | No |
| marketing | Mateo Pérez: pedidos y comunicación. | (en preparación) | No |

## Rutas y horarios

- **Plantilla semanal** (`plantillas`, id `PJ_1M_lunes`): lo que se repite cada semana. La arma el coordinador. Punto de partida: `plantillasDesdePlanilla()` en `src/data/realData.js` (horarios reales de BASE RUTAS).
- **Cambios del día** (`rutas`, id `AAAA-MM-DD_PJ_1M`): si un día puntual cambia algo (un perro que no sale, uno extra, otra hora, otro paseador), se guarda la ruta completa de ese día. Si existe, manda sobre la plantilla.
- **Ruta efectiva de un día** = el registro de `rutas` de esa fecha y ruta si existe; si no, la plantilla de ese día de la semana.
- Cada ruta tiene: `dia`, `turno`, `ruta`, `paseador` (usuario), `ayudante` (usuario o vacío), `supervisor` (nombre), `paradas` (en orden: `perroId`, `perroNombre`, `hora` de retiro "HH:MM", `minutos`, `nota`), `notas`.

## Colecciones e identificadores

| Colección | Quién lee | Quién escribe | id | Campos |
|---|---|---|---|---|
| `paseos` | equipo* | admin, supervisor, paseador, ayudante | `AAAA-MM-DD_PJ-001_manana` (o `_tarde`) | `fecha`, `perroId`, `perroNombre`, `turno` ("Mañana"/"Tarde"), `ruta`, `estado` ("pendiente", "retirado", "paseando", "entregado", "no-sale"), `horaRetiro`, `horaPaseo`, `horaEntrega` (y quién marcó cada paso: `horaRetiroPor`/`horaRetiroPorNombre`, `horaPaseoPor`/`horaPaseoPorNombre`, `horaEntregaPor`/`horaEntregaPorNombre`), `nota` |
| `checklists` | admin, supervisor, paseador, ayudante | admin, supervisor, paseador, ayudante | `AAAA-MM-DD_usuario_manana` | `fecha`, `turno`, `items`, `completo` |
| `incidentes` | equipo* | admin, supervisor, paseador, ayudante | automático | `fecha`, `hora`, `perros`, `perroNombre`, `lugar`, `barrio`, `antes`, `conducta`, `accion`, `despues`, `riesgo`, `lesiones`, `protocolo`, `titulo` |
| `observaciones` | equipo* | equipo* | automático | `fecha`, `hora`, `perroId`, `perroNombre`, `lugar`, `estimulo`, `reaccion`, `accion`, `resultado`, `titulo` |
| `plantillas` | equipo* | admin, coordinador | `PJ_1M_lunes` | ver "Rutas y horarios" |
| `rutas` | equipo* | admin, coordinador | `AAAA-MM-DD_PJ_1M` | igual que plantilla + `fecha` |
| `solicitudes` | admin, coordinador, supervisor | admin, coordinador, supervisor | automático | Pedido de cambio de ruta del supervisor al coordinador: `fecha` (día del cambio), `turno`, `ruta`, `tipo` ("no sale", "agregar perro", "cambiar hora", "cambiar paseador o ayudante", "otro"), `perroId`, `perroNombre`, `detalle` (qué cambiar), `motivo` (qué pasó o con quién habló), `urgente` (true/false), `estado` ("pendiente", "aplicado", "rechazado"), `respuesta` (la escribe el coordinador), `titulo` |
| `cierres` | admin, coordinador, supervisor | admin, supervisor | `AAAA-MM-DD_manana` | `fecha`, `turno`, `notas`, `resumen`, `cerrado` |
| `clientes` | admin, coordinador | admin, coordinador | automático | `nombre` (tutor), `telefono`, `barrio`, `perros` (ids), `plan`, `dias`, `turno`, `estado` ("activo", "pausa", "baja"), `notas` |
| `avisos` | equipo* y marketing | admin, coordinador, supervisor | automático | `fecha`, `barrio`, `tipo` ("obra o corte", "perro suelto", "clima", "seguridad", "cambio de horario", "otro"), `mensaje`, `vigenteHasta` (AAAA-MM-DD), `titulo` |
| `pedidos` | admin, coordinador, marketing | admin, coordinador, marketing | automático | `fecha`, `tipo`, `estado` ("nuevo", "en-curso", "resuelto"), `titulo`, `detalle`, `datos`, `origen` |
| `fichas` | admin, coordinador, supervisor | admin, coordinador | automático | `fecha`, `perroNombre`, `datos`, `categoria`, `estado` |
| `resueltos` | admin, coordinador | admin, coordinador | id del perro | `perroId`, `perroNombre`, `resuelto`, `nota` |
| `archivos` | admin, coordinador (comprobantes: solo admin) | se crean solo con `archivos.subir()` / `POST /api/archivos` (equipo) o desde el formulario web | automático | `fecha`, `tipo` ("carnet de vacunas", "comprobante de pago", "documento", "foto"), `titulo`, `nombreArchivo`, `mime`, `tamano`, `perroId`, `perroNombre`, `clienteId`, `pedidoId`, `nota`, `ubicacion` ("drive", "vercel" o "local"), `driveUrl` (si está en Drive) |
| `fotos` | equipo* | equipo* | id del perro (`PJ-001`) | `perroId`, `perroNombre`, `miniatura` (data URL JPG ~15 KB, cuadrada 240 px), `archivoId` (foto grande en `archivos`, tipo "foto") |
| `pagos` | **solo admin** | **solo admin** | automático | `fecha`, `concepto`, `monto`, `medio`, `pasadoAlLibro` |

\* equipo = admin, coordinador, supervisor, paseador y ayudante.

Todos los registros llevan, puestos por el servidor: `creadoPor`, `creadoPorNombre`, `creadoEn`, `actualizadoPor`, `actualizadoEn`. Usalos para mostrar "Cargado por Sebastián a las 10:15".

Reglas:
- El `paseos` de un perro es UNO por día y turno: paseador y supervisor actualizan el mismo registro (mismo id). Así el supervisor ve en vivo lo que marca el paseador.
- Nada de datos de tutores (teléfono, dirección) salvo en `pedidos` (los deja el propio tutor) y `fichas` (los carga el coordinador).
- Borrar: solo admin, o quien lo cargó en las últimas 24 horas.

## Archivos (carnet de vacunas, comprobantes, documentos, fotos)

```js
import { archivos } from "../api/client.js";
const registro = await archivos.subir("carnet de vacunas", input.files[0], { perroId, perroNombre, clienteId });
await archivos.abrir(registro.id); // abre en una pestaña nueva, con la sesión (no queda público)
const lista = registros.cached("archivos"); // y registros.watch("archivos")
```

- Las fotos se achican en el celular antes de subir. Máximo 3,5 MB. Solo JPG, PNG, WEBP o PDF.
- Con la planilla conectada se guardan en Google Drive, en "Paseos Juan — Archivos de la app/<tipo>". Si no, en Vercel privado.
- El formulario de la página pública puede mandar el carnet: queda en el pedido como `carnet: { id, nombre }` y en `archivos` con `pedidoId`.

## Fotos de los perros

```js
import { fotosPerros, registros } from "../api/client.js";
registros.watch("fotos");                      // una vez
const src = fotosPerros.de("PJ-001");          // miniatura o null (mostrar inicial del nombre si es null)
await fotosPerros.subir("PJ-001", "Pistacho", input.files[0]); // necesita señal
```

- Cualquiera del equipo puede sacar la foto (input `type="file" accept="image/*" capture="environment"`).
- La miniatura se ve en todas las listas; la grande se abre con `archivos.abrir(foto.archivoId)`.
- Supervisor, paseador y ayudante solo ven fotos; carnets y documentos siguen siendo de admin y coordinador.
