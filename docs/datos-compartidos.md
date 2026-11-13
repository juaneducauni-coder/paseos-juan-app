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

## Colecciones e identificadores

| Colección | Quién lee | Quién escribe | id | Campos |
|---|---|---|---|---|
| `paseos` | admin, coordinador, supervisor, paseador | admin, supervisor, paseador | `AAAA-MM-DD_PJ-001_manana` (o `_tarde`) | `fecha`, `perroId`, `perroNombre`, `turno` ("Mañana"/"Tarde"), `estado` ("pendiente", "retirado", "paseando", "entregado", "no-sale"), `horaRetiro`, `horaPaseo`, `horaEntrega`, `nota` |
| `checklists` | admin, supervisor, paseador | admin, supervisor, paseador | `AAAA-MM-DD_usuario_manana` | `fecha`, `turno`, `items` (objeto item → true/false), `completo` |
| `incidentes` | admin, coordinador, supervisor, paseador | admin, supervisor, paseador | automático | `fecha`, `hora`, `perros` (array de ids), `perroNombre`, `lugar`, `antes`, `conducta`, `accion`, `despues`, `riesgo`, `lesiones`, `protocolo`, `titulo` |
| `observaciones` | admin, coordinador, supervisor, paseador | todos esos | automático | `fecha`, `hora`, `perroId`, `perroNombre`, `lugar`, `estimulo`, `reaccion`, `accion`, `resultado`, `titulo` |
| `rutas` | admin, coordinador, supervisor, paseador | admin, supervisor | automático | `fecha`, `turno`, `ruta`, `paseador`, `perros` (array de ids en orden), `conflictos`, `medida`, `titulo` |
| `cierres` | admin, coordinador, supervisor | admin, supervisor | `AAAA-MM-DD_manana` | `fecha`, `turno`, `notas`, `resumen`, `cerrado` |
| `pedidos` | admin, coordinador, marketing | admin, coordinador, marketing | automático | `fecha`, `tipo`, `estado` ("nuevo", "en-curso", "resuelto"), `titulo`, `detalle`, `datos` (los del formulario web), `origen` ("web" o "app") |
| `fichas` | admin, coordinador, supervisor | admin, coordinador | automático | `fecha`, `perroNombre`, `datos` (ficha completa), `categoria` ("SIN EVALUAR"), `estado` ("borrador", "lista") |
| `resueltos` | admin, coordinador | admin, coordinador | id del perro (`PJ-003`) | `perroId`, `perroNombre`, `resuelto` (true/false), `nota` |
| `pagos` | admin, coordinador | admin, coordinador | automático | `fecha`, `concepto`, `monto`, `medio`, `pasadoAlLibro` (true/false) |

Todos los registros llevan, puestos por el servidor: `creadoPor`, `creadoPorNombre`, `creadoEn`, `actualizadoPor`, `actualizadoEn`. Usalos para mostrar "Cargado por Sebastián a las 10:15".

Reglas:
- El `paseos` de un perro es UNO por día y turno: paseador y supervisor actualizan el mismo registro (mismo id). Así el supervisor ve en vivo lo que marca el paseador.
- Nada de datos de tutores (teléfono, dirección) salvo en `pedidos` (los deja el propio tutor) y `fichas` (los carga el coordinador).
- Borrar: solo admin, o quien lo cargó en las últimas 24 horas.
