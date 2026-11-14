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
| ayudante | Ayudante de paseador: acompaña al paseador en su ruta (ver "Tareas del ayudante"). Sin datos de clientes. | `/paseador` (modo ayudante) | No |
| marketing | Mateo Pérez: pedidos y comunicación. | (en preparación) | No |
| cliente | Tutor aprobado por Juan. Entra por su enlace (sin PIN) y ve solo lo de sus perros. Ver "Chats y portal del cliente (E-045)". | `/cliente` | Solo el alias para transferir |

## Tareas del ayudante de paseador (definidas por Juan, 13/11/2026)

1. **Recibir perros e integrarlos a la manada**: dejar que se olfateen y caminar con el perro nuevo la primera cuadra.
2. **Devolver perros**: de la forma que más agilice la ruta, para que el paseador siga buscando al resto. **Máximo 2 perros a la vez.**
3. **Botiquín**: llevarlo y asistir al perro si se lastima un poco (agua oxigenada y gasa). Si es más que algo leve, se avisa y va al veterinario.
4. **Hidratar** a los perros con la botella bebedero.
5. **Levantar caca** (no todas: el paseador también levanta).
6. **Prevenir accidentes**: si se cruza otra manada o un perro externo, dividir los perros con el paseador y pasar de a grupos; calmar a los perros alterados de la manada.

Checklist del ayudante antes de salir (corto): **muslera** · botiquín (agua oxigenada y gasa) · botella bebedero · bolsas · celular cargado.
El **paseador** lleva la **pechera** (la muslera la lleva el ayudante).

## Rutas y horarios

- **Plantilla semanal** (`plantillas`, id `PJ_1M_lunes`): lo que se repite cada semana. La arma el coordinador. Punto de partida: `plantillasDesdePlanilla()` en `src/data/realData.js` (horarios reales de BASE RUTAS).
- **Cambios del día** (`rutas`, id `AAAA-MM-DD_PJ_1M`): si un día puntual cambia algo (un perro que no sale, uno extra, otra hora, otro paseador), se guarda la ruta completa de ese día. Si existe, manda sobre la plantilla.
- **Ruta efectiva de un día** = el registro de `rutas` de esa fecha y ruta si existe; si no, la plantilla de ese día de la semana.
- Cada ruta tiene: `dia`, `turno`, `ruta`, `paseador` (usuario), `ayudante` (usuario o vacío), `supervisor` (nombre), `paradas` (en orden: `perroId`, `perroNombre`, `hora` de retiro "HH:MM", `minutos`, `nota`), `notas`.

## Colecciones e identificadores

| Colección | Quién lee | Quién escribe | id | Campos |
|---|---|---|---|---|
| `paseos` | equipo* | admin, supervisor, paseador, ayudante | `AAAA-MM-DD_PJ-001_manana` (o `_tarde`) | `fecha`, `perroId`, `perroNombre`, `turno` ("Mañana"/"Tarde"), `ruta`, `estado` ("pendiente", "retirado", "paseando", "entregado", "no-sale"), `horaRetiro`, `horaPaseo`, `horaEntrega` (y quién marcó cada paso: `horaRetiroPor`/`horaRetiroPorNombre`, `horaPaseoPor`/`horaPaseoPorNombre`, `horaEntregaPor`/`horaEntregaPorNombre`), `fotoPaseoId` (foto que marca el paseo), `fotoPendiente` (true si se sacó sin señal y todavía no se subió), `sinFotoPaseo` (true si se entregó sin foto), `horaIntegrado`/`horaIntegradoPor`/`horaIntegradoPorNombre` (el ayudante lo integró a la manada), `devuelvePor`/`devuelvePorNombre` (quién lo está llevando a entregar), `nota` |
| `checklists` | admin, supervisor, paseador, ayudante | admin, supervisor, paseador, ayudante | `AAAA-MM-DD_usuario_manana` | `fecha`, `turno`, `items`, `completo`, `aguas` (horas en que el ayudante dio agua), `calor` (true si marcó "Hace calor") |
| `incidentes` | equipo* | admin, supervisor, paseador, ayudante | automático | `fecha`, `hora`, `perros`, `perroNombre`, `lugar`, `barrio`, `antes`, `conducta`, `accion`, `despues`, `riesgo`, `lesiones`, `protocolo`, `tipos` (chips elegidos), `tipo` ("curación leve" para el botiquín del ayudante), `titulo` |
| `observaciones` | equipo* | equipo* | automático | `fecha`, `hora`, `perroId`, `perroNombre`, `lugar`, `estimulo`, `reaccion`, `accion`, `resultado`, `titulo` |
| `plantillas` | equipo* | admin, coordinador | `PJ_1M_lunes` | ver "Rutas y horarios" |
| `rutas` | equipo* | admin, coordinador | `AAAA-MM-DD_PJ_1M` | igual que plantilla + `fecha` |
| `solicitudes` | admin, coordinador, supervisor | admin, coordinador, supervisor | automático | Pedido de cambio de ruta del supervisor al coordinador: `fecha` (día del cambio), `turno`, `ruta`, `tipo` ("no sale", "agregar perro", "cambiar hora", "cambiar paseador o ayudante", "otro"), `perroId`, `perroNombre`, `detalle` (qué cambiar), `motivo` (qué pasó o con quién habló), `urgente` (true/false), `estado` ("pendiente", "aplicado", "rechazado"), `respuesta` (la escribe el coordinador), `titulo` |
| `cierres` | admin, coordinador, supervisor | admin, supervisor | `AAAA-MM-DD_manana` | `fecha`, `turno`, `notas`, `resumen`, `cerrado` |
| `clientes` | admin, coordinador | admin, coordinador | automático | `nombre` (tutor), `telefono`, `barrio`, `perros` (ids), `plan`, `dias` (["lunes", ...]), `turno`, `hora`, `estado` ("activo", "pausa", "baja"), `notas`. Los pone el servidor (no se cambian por `registros.save`): `aprobado` (`{ por, porNombre, en }`, al aprobar Juan), `acceso` (`{ activo, creadoEn }`; el hash del enlace nunca se devuelve), `pedidoId` |
| `avisos` | equipo* y marketing | admin, coordinador, supervisor | automático | `fecha`, `barrio`, `tipo` ("obra o corte", "perro suelto", "clima", "seguridad", "cambio de horario", "otro"), `mensaje`, `vigenteHasta` (AAAA-MM-DD), `titulo` |
| `pedidos` | admin, coordinador, marketing | admin, coordinador, marketing | automático | `fecha`, `tipo`, `estado` ("nuevo", "en-curso", "resuelto"), `titulo`, `detalle`, `datos`, `origen` |
| `fichas` | admin, coordinador (tienen datos de tutores y de salud) | admin, coordinador | automático | `fecha`, `perroNombre`, `datos`, `categoria`, `estado` |
| `resueltos` | admin, coordinador | admin, coordinador | id del perro | `perroId`, `perroNombre`, `resuelto`, `nota` |
| `archivos` | admin, coordinador (comprobantes: solo admin) | se crean solo con `archivos.subir()` / `POST /api/archivos` (equipo) o desde el formulario web | automático | `fecha`, `tipo` ("carnet de vacunas", "comprobante de pago", "documento", "foto"), `titulo`, `nombreArchivo`, `mime`, `tamano`, `perroId`, `perroNombre`, `clienteId`, `pedidoId`, `nota`, `ubicacion` ("drive", "vercel" o "local"), `driveUrl` (si está en Drive) |
| `fotos` | equipo* | equipo* | id del perro (`PJ-001`) | `perroId`, `perroNombre`, `miniatura` (data URL JPG ~15 KB, cuadrada 240 px), `archivoId` (foto grande en `archivos`, tipo "foto") |
| `pagos` | **solo admin** | **solo admin** | automático | `fecha`, `concepto`, `monto`, `medio`, `pasadoAlLibro` |
| `ajustes` | admin (y el cliente con sesión: solo `pagos`) | **solo admin** | `pagos` (único válido) | `alias` (6 a 20 letras, números, puntos o guiones; "" = sin cargar), `instrucciones` (hasta 400). El alias NO va en el código: lo carga Juan desde su panel. |
| `movimientos` | **`ROLES_CONTADURIA`** (hoy: solo admin) | **`ROLES_CONTADURIA`** (hoy: solo admin) | automático | Contaduría (ingresos y egresos): `fecha` (AAAA-MM-DD), `tipo` ("ingreso" o "egreso"), `categoria` (ver abajo), `concepto` (2 a 120 letras), `monto` (número mayor que 0), `medio` (hasta 40 letras; los mismos de `pagos`: "Efectivo", "Transferencia", "Naranja X" u otro), `nota` (opcional, hasta 300), `pasadoAlLibro` (true/false) |

\* equipo = admin, coordinador, supervisor, paseador y ayudante.

### Contaduría (`movimientos`)

- Es un **registro de apoyo**: la fuente oficial sigue siendo el Libro contable. Se ve en `/admin`, pestaña Plata.
- **Quién la ve y la carga** se define en UN solo lugar: `ROLES_CONTADURIA` en `api/_lib/permisos.js` (hoy `["admin"]`). Pendiente de confirmar con Juan si "organizadores" incluye al coordinador (antes decidió que el coordinador no ve plata). El resto recibe 403 al leer, cargar, cambiar o borrar. Ojo: la pantalla hoy está solo en `/admin`; si se suma otro rol a la constante, además hay que darle una pantalla.
- Categorías fijas (`CATEGORIAS_MOVIMIENTO` en `api/registros.js`, y la misma lista en `CONTA_CATEGORIAS` de `src/views/admin.js`): ingresos → "Planes", "Tienda", "Otros"; egresos → "Pagos al equipo", "Insumos", "Transporte", "Alimento/tienda", "Impuestos y servicios", "Otros".
- El servidor valida el registro completo en cada guardado (también en cambios parciales como marcar `pasadoAlLibro`), descarta cualquier campo que no sea de la lista y responde 400 si el tipo, la categoría, el monto, la fecha o el largo de un texto no son válidos.
- Los `pagos` **no se migran ni se copian**: el resumen del mes los suma como ingresos (rótulo "Pagos de clientes") leyéndolos de su colección. No cargues el mismo cobro en `pagos` y en `movimientos`, porque se contaría dos veces.
- El CSV del mes se arma en el navegador (no hay endpoint): incluye movimientos y pagos del mes, separado por punto y coma.
- Con la planilla conectada (Apps Script) los movimientos van a una hoja nueva "Movimientos" que se crea sola: no hace falta volver a pegar `Code.gs`.

Todos los registros llevan, puestos por el servidor: `creadoPor`, `creadoPorNombre`, `creadoEn`, `actualizadoPor`, `actualizadoEn`. Usalos para mostrar "Cargado por Sebastián a las 10:15".

Reglas:
- El `paseos` de un perro es UNO por día y turno: paseador y supervisor actualizan el mismo registro (mismo id). Así el supervisor ve en vivo lo que marca el paseador.
- Nada de datos de tutores (teléfono, dirección) salvo en `pedidos` (los deja el propio tutor) y `fichas` (los carga el coordinador).
- Borrar: solo admin, o quien lo cargó en las últimas 24 horas. `archivos`: solo el admin. `solicitudes` ya aplicadas o rechazadas: solo el admin.
- Reglas por registro (las aplica el servidor, además del permiso por colección):
  - `solicitudes`: el supervisor solo crea pedidos (quedan "pendiente", sin `respuesta`) y solo cambia los suyos mientras estén "pendiente". `estado` y `respuesta` los cambian admin y coordinador.
  - `checklists`: cada uno (salvo el admin) escribe solo su id `AAAA-MM-DD_<su usuario>_manana|tarde`.
  - `incidentes`, `observaciones`, `avisos`: un no-admin solo cambia lo que cargó él (el coordinador puede cambiar cualquier aviso). Si no, 403.
  - `paseos`: `horaRetiroPor`, `horaPaseoPor`, `horaEntregaPor`, `horaIntegradoPor` y `devuelvePor` (y sus `*Nombre`) los pone el servidor: si llegan con valor, queda el usuario que guarda (salvo que sea el mismo valor que ya estaba: se conserva el autor original); vacío = desmarcar. Un `*Nombre` sin su `*Por` se ignora.

## Archivos (carnet de vacunas, comprobantes, documentos, fotos)

```js
import { archivos } from "../api/client.js";
const registro = await archivos.subir("carnet de vacunas", input.files[0], { perroId, perroNombre, clienteId });
await archivos.abrir(registro.id); // foto: la abre en una pestaña nueva; PDF: lo descarga (con la sesión, no queda público)
const lista = registros.cached("archivos"); // y registros.watch("archivos")
```

- Las fotos se achican en el celular antes de subir. Máximo 3,5 MB. Solo JPG, PNG, WEBP o PDF.
- Quién sube qué tipo: admin, todos; coordinador, "carnet de vacunas", "documento" y "foto"; supervisor, paseador y ayudante, solo "foto". Un tipo que no existe da 400.
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

## Iniciar sesión con Google

- Se activa con la variable `GOOGLE_CLIENT_ID` en Vercel (ID de cliente OAuth de tipo "Aplicación web"). Sin eso, los botones no aparecen.
- Equipo: el admin vincula el Gmail de cada usuario (`POST /api/usuarios` con `{ usuario, google: "correo@gmail.com" }`); después esa persona entra con "Iniciar sesión con Google" (`POST /api/auth/google`). El PIN sigue funcionando.
- Formulario web: `botonGoogle(contenedor, (credential) => ...)` de `src/api/client.js` dibuja "Continuar con Google"; mandá `googleCredential` junto con el pedido y el servidor guarda el correo verificado (y el nombre si faltaba).

## Foto del paseo (en vez del botón "En paseo")

```js
import { fotosPaseo } from "../api/client.js";
// input type="file" accept="image/*" capture="environment"
await fotosPaseo.sacar({ id, fecha, perroId, perroNombre, turno, ruta }, input.files[0]);
fotosPaseo.pendientes(); // fotos sacadas sin señal que todavía no se subieron
```

Sacar la foto marca el paseo (`estado: "paseando"`, `horaPaseo`, `fotoPaseoId`). Sin señal, el paseo se marca igual y la foto se sube sola después. La foto la abren admin y coordinador (y el resto del equipo, porque es tipo "foto").

## Chats y portal del cliente (E-045)

Lo pidió Juan: comunicación entre paseadores, supervisores, ayudantes y coordinadores, con el cliente, y que el paseador avise al cliente y al supervisor. Y que el cliente entre a ver lo de su perro.

### Canales y quién los usa

| Canal | Leen y escriben | Notas |
|---|---|---|
| `equipo` | admin, coordinador, supervisor, paseador, ayudante | Todo el equipo. |
| `calle` | admin, coordinador, supervisor, paseador, ayudante | Lo que pasa en el turno ("llegando", "falta retirar a…"). |
| `coordinacion` | admin, coordinador, supervisor | Decisiones entre supervisión y coordinación. El paseador no lo ve. |
| `dm_<a>__<b>` | **solo esos dos usuarios** | Directo. `canalDirecto(a, b)` ordena los nombres. El admin tampoco lo lee ni lo borra. Clientes no tienen directos. |
| `cliente_<clienteId>` | el cliente dueño, coordinador y admin | Chat privado del cliente con Paseos Juan. Supervisor, paseador y ayudante **solo publican avisos** (`tipo: "aviso"`), no leen la conversación. |
| `clientes` | clientes con sesión, coordinador y admin | Comunidad de clientes (P-08). Sin teléfonos ni correos (el servidor los rechaza), sin adjuntos; del cliente se muestra nombre e inicial ("Carla G."). Modera **solo el admin**: borrar mensajes y silenciar. |

Marketing no está en los grupos (solo directos).

### Colecciones (no se leen por `/api/registros`, solo por `/api/mensajes`)

| Colección | id | Campos |
|---|---|---|
| `mensajes` | `<canal>_<AAAAMMDDTHHMMSSmmmZ>_<6 hex>` (se lista por prefijo de canal) | `canal`, `fecha`, `tipo` ("texto", "aviso", "foto"), `texto` (máx. 1000, sin HTML), `adjuntoId` (archivo), `perroId`, `perroNombre`, `autor` (usuario; cliente = `cliente:<id>`; avisos automáticos = `sistema`), `autorNombre`, `autorRol`, `automatico`, `clave` (aviso automático: `<idPaseo>:<paso>`), `creadoEn`; si lo borró el admin: `borrado: true`, `borradoPor`, `actualizadoEn` (texto y adjunto vacíos) |
| `lecturas` | usuario (cliente: `cliente_<clienteId>`) | `{ "<canal>": ISO de la última lectura }` |
| `canales` | canal | `ultimo` (id, tipo, texto corto, autor, autorNombre, creadoEn), `actualizadoEn`. Sirve para el resumen sin leer todos los mensajes. |
| `moderacion` | `clientes` | `silenciados: { "<usuario>": ISO hasta }` |

### Avisos automáticos al cliente

Al guardar un `paseos` de **hoy** de un perro que figura en `clientes.perros` (cliente que no esté de baja), el servidor publica en `cliente_<id>` un mensaje `tipo: "aviso"`, `autor: "sistema"`, `autorNombre: "Paseos Juan"`:
- `estado` pasa a "retirado" → "Retiramos a Pistacho · 09:45" (`horaRetiro`, o la hora actual).
- `estado` "paseando" → "Pistacho está paseando" con `adjuntoId` = `fotoPaseoId` si ya está. Si la foto llega después (se sacó sin señal) → "Foto del paseo de Pistacho" con la foto.
- `estado` pasa a "entregado" → "Entregamos a Pistacho · 10:40" (`horaEntrega`).
- No se repite: el paseo guarda `avisosCliente` (lo maneja el servidor). Días pasados y perros sin cliente: no avisa.

### Portal del cliente (P-01: pedir alta → Juan aprueba → horario → acceso)

1. El tutor pide el alta con el formulario de la web (queda en `pedidos`).
2. Juan aprueba con `clientesAcceso.aprobar({ pedidoId, perros, dias, turno, hora?, plan? })` (solo admin). Sin días y turno no se aprueba. Crea el cliente con los datos del pedido, marca el pedido "aprobado" y devuelve el enlace `/c/<token>`, que se ve **una sola vez** (en el servidor queda solo su hash SHA-256). Para un cliente ya cargado: `{ clienteId, dias, turno, ... }`.
3. Juan (o el coordinador) le manda el enlace al cliente. Al abrirlo, `src/app.js` hace `session.loginCliente(token)` y lleva a `/cliente`. La sesión dura 90 días.
   Pantalla (E-048): `/admin` → Más → **Altas de clientes** (aprobar, enlace con "Copiar" y "Mandar por WhatsApp", "Renovar enlace" y "Cortar acceso"); el alias se carga en Plata → **Alias de pago**; los silenciados de la comunidad, en Más → **Moderación**.
4. Si lo pierde: `clientesAcceso.crear(clienteId)` (admin o coordinador, solo clientes aprobados) da un enlace nuevo y corta el anterior. `clientesAcceso.revocar(clienteId)` corta todo. Si el cliente pasa a "baja", su sesión deja de valer.

El cliente ve **solo**: `paseos` y `fotos` de sus perros (sin ruta, notas ni usuarios del equipo), las fotos de sus perros en `/api/archivos?id=`, su chat `cliente_<id>`, la comunidad `clientes` y el alias de pago (`ajustes/pagos`). Nada de rutas, otros perros, pagos, contaduría ni equipo.

`session.user()` del cliente: `{ usuario: "cliente:<id>", nombre, rol: "cliente", clienteId, perros: ["PJ-001"] }`.

### Funciones de `src/api/client.js`

```js
import { mensajes, canalDirecto, clientesAcceso, datosPago, session, onDataChange } from "../api/client.js";

mensajes.watch();                        // resumen cada 60 s (5 min con el almacenamiento provisorio)
const lista = mensajes.cachedResumen();  // [{ canal, tipo, titulo, ultimo, sinLeer, leidoHasta, con?, clienteId? }]
mensajes.sinLeer();                      // total para el globito del menú
onDataChange((col) => { if (col === "mensajes") dibujarLista(); if (col === `mensajes:${abierto}`) dibujarChat(); });

const parar = mensajes.watch(canal);     // al ABRIR un chat: cada 10 s mientras está visible. parar() al cerrarlo.
mensajes.cached(canal);                  // mensajes guardados (orden cronológico)
await mensajes.enviar(canal, texto);     // opts: { tipo: "aviso"|"foto", adjuntoId, perroId, perroNombre }
await mensajes.enviar("cliente", "Llegamos en 5 minutos", { tipo: "aviso", perroId: "PJ-001" }); // paseador → cliente del perro
await mensajes.marcarLeido(canal);
await mensajes.contactos();              // equipo para abrir un directo: canalDirecto(yo, otro)
mensajes.infoComunidad();                // { reglas, silenciadoHasta } de "clientes" (mostrar las reglas arriba)
await mensajes.borrar(id); await mensajes.silenciar("cliente:<id>", 24); await mensajes.silenciados(); // solo admin

await datosPago.leer();                  // { alias, instrucciones, pendiente } (alias "Pendiente de confirmar" si falta)
await datosPago.guardar({ alias, instrucciones }); // solo admin
```

- Mostrá el texto como texto (`textContent`), nunca como HTML. Si `borrado` es true: "Mensaje borrado por el admin".
- Sin señal, `enviar` lanza `ApiError` con `status 0`: mostrá "No se envió. Revisá la señal" y dejá el texto en la caja.
- Límite: 30 mensajes por minuto por persona.
- La página `/cliente` actual tiene datos de ejemplo (pagos, cupones, chat en `localStorage`, de Codex): estas funciones son las que los reemplazan cuando se haga la pantalla.
