# Bitácora de la noche — 13 al 14/11/2026 (JUAN 3.0)

Objetivo de Juan: todo fácil y rápido en el celular para cada rol, comunicación entre roles (chats y avisos), alias visible para clientes, tienda con productos importados y demora de llegada, manual corto con historias. Revisión cada hora hasta las 07:00.

## 14/11/2026 — 00:30 aprox.

- Se unió el trabajo de la sesión de VS Code (Gemini, ChatGPT/Codex y Claude: seguridad, app instalable, contaduría, portada de verano, diseño aireado, plan maestro) con el de esta sesión. Commit 7bf270b.
- Conflicto resuelto en `src/views/paseador.js`: se mantuvo la versión nueva del equipo por usuario y se sumó la regla de Juan: **el ayudante lleva la muslera y el paseador la pechera** (la muslera no aparece en el equipo del paseador).
- Pruebas: 32 del servidor OK, armado OK, recorrido en navegador sin fallas.
- En curso:
  - E-029 Investigación (chats de las IAs, Drive, tienda con productos importados, diseño profesional).
  - E-045 Servidor: chats entre roles, avisos al cliente, acceso de clientes (P-01) y chat de clientes con moderación (P-08). El alias de pago se guarda como ajuste del admin, no en el código.

## 14/11/2026 — 00:00 aprox.

- E-029 investigación terminada: `asistente/investigacion/2026-11-14-investigacion.md` (16 preguntas para Juan al final).
- Palabras completas en todas las pantallas: minutos, horas y días sin abreviar; sin "hs", "Más info" ni "1.er".
- Tienda: nueva sección **Importados — próximamente** con 9 productos del proyecto de importación, demora estimada (50 días de fabricación + 3 meses en barco) y botón "Avisame cuando llegue" por WhatsApp. Sin precios ni stock (no hay proveedor ni compra). El nombre de la marca no se muestra hasta que Juan lo confirme.
- Arreglo: en el celular el nombre "Tienda" tapaba el botón "Pedido".
- La carpeta `dist` (archivos que arma Vercel) se había subido por error: salió del repositorio.

## 14/11/2026 — 00:15 aprox.

- **E-045 servidor de chats y acceso de clientes:** integrado.
- **Auditoría de seguridad de E-045 (agente independiente):** 11 hallazgos. Arreglados:
  - Un paseador podía mandarle a un cliente un aviso falso firmado por "Paseos Juan". Ahora el nombre del perro sale del servidor, el identificador del paseo tiene que ser fecha_perro_turno y la foto tiene que ser de ese perro.
  - El coordinador podía generar el enlace del cliente y entrar como él. Ahora solo el admin genera enlaces; el coordinador puede cortarlos.
  - Un cliente de baja que volvía recuperaba el enlace viejo. Ahora la baja corta el enlace.
  - Un perro podía quedar en dos clientes. Ahora cada perro es de un solo cliente (también al aprobar el alta).
  - Al cliente ya no se le muestran usuarios internos; en la comunidad no se adjuntan perros.
  - Quedan anotados (sin urgencia): con el almacenamiento provisorio de Vercel, más de 2000 mensajes en un canal no se leen bien (usar la planilla); correos escritos con palabras pasan el filtro de la comunidad.
- **E-046 Manual con historias** (`/manual`): 6 historias por rol con dibujos vectoriales y accesos directos.
- **E-047 Chats del equipo** (`/mensajes`): grupos, directos, clientes; respuestas rápidas ("Llegué", "Perro suelto"…), dictado por voz, pestaña Mensajes con número sin leer en paseador, supervisor, coordinador y admin.
- **E-048 Admin:** aprobar altas con días y turno y mandar el enlace por WhatsApp; renovar o cortar enlaces; alias de pago (lo carga Juan); moderación de la comunidad.
- **E-049 Cliente con datos reales:** estado del paseo de hoy con foto, avisos, alias completo con "Copiar alias", comunidad, avisar ausencia; próximo paseo según sus días y turno.
- **Supervisor:** ve la foto del paseo en la tarjeta del perro.
- Pruebas: 41 del servidor OK, armado OK, recorrido en navegador sin fallas (incluye /manual y /mensajes).

## 14/11/2026 — 00:37 (revisión de cada hora)

- Auditoría de uso en el celular, rol por rol (agente independiente): un error real y varios detalles. Se repartieron en 4 arreglos en paralelo:
  - **E-054 Admin:** arreglado el error del alta (se perdía el primer toque en un día y el cliente quedaba sin ese día); alias de pago arriba en Plata; meses completos; barra de abajo sólida; Inicio más corto (las prioridades urgentes quedan abiertas).
  - **E-055 Coordinador:** las rutas de la planilla se ven y se editan de a una sin cargar todas; días y minutos completos; buscador más claro; equipo real en el editor; barra de guardar en un renglón.
  - **E-057 Públicas y cliente:** precios en tarjetas en el celular (antes se cortaban); preguntas frecuentes más altas; portal del cliente con encabezado propio, "Tema y movimiento" y un solo "Cerrar sesión"; reglas de la comunidad plegadas; botón "Consultar" de la tienda en un renglón.
  - **E-056 Paseador y supervisor:** en curso.
- Pruebas: 41 del servidor OK, armado OK, recorrido sin fallas, portal del cliente revisado con captura.
- Sigue: unir E-056 y una segunda auditoría corta.

## 14/11/2026 — 01:30 aprox.

- **E-056 Paseador y supervisor:** avisos que ya no tapan botones, "Ruta 1" en vez de "PJ_1M", riesgo y lesión obligatorios a la vista (sin marcar de antemano), "Hasta 2", supervisor con encabezado completo, "Tema y movimiento" en Más, pedido "Cambiar de ruta", "Foto del perro" distinta de "Foto del paseo".
- **Segunda auditoría en el celular:** confirmó arreglados el alta del admin, los avisos que tapaban, el encabezado del supervisor, los precios, las preguntas frecuentes, el portal del cliente y la edición de rutas sin cargar. Sin abreviaturas en pantalla.
- Arreglado después de esa auditoría: "PJ_1M" en coordinador y admin (nombre de ruta compartido en `src/ui/rutas.js`, también en pedidos viejos), "Planilla RPJ", "Ej." en ejemplos, "hs.", "5 m", "30 s", aviso de riesgo repetido, ayuda del alta que aplastaba "Sumar otro perro", "3 rutas · 23 perros" y "4 alertas" en la semana del coordinador.
- Pendiente para revisar en un celular real: los campos de fecha y hora deberían verse en formato argentino si el celular está en español.

## 14/11/2026 — 01:25 aprox.

- **E-058 Mensajes sin señal:** el chat guarda en el celular lo que no salió y lo manda solo al volver la señal; si un aviso urgente ("Perro suelto", "Necesito ayuda") no salió, aparece un aviso rojo con "Mandar por WhatsApp".
- Servidor: un reintento del mismo mensaje no se duplica y se guarda la hora en que se escribió (la pantalla muestra "llegó HH:MM" si llegó tarde). Prueba nueva: 42 pruebas del servidor OK.
- Mensajes: con más de 2000 en un canal (almacenamiento provisorio) se leen los días más recientes.
- Probado en el navegador sin señal y con señal: llegó una vez, con la hora correcta.
- Para que Juan confirme: un mensaje que pasa más de 3 horas sin salir ya no se manda solo (para que un "Perro suelto" viejo no confunda).

## 14/11/2026 — 01:36 (revisión de cada hora)

- Todo integrado; 43 pruebas del servidor OK, armado OK, recorrido sin fallas.
- **Coordinación inmediata (pedido de Juan):** un incidente nuevo avisa solo en el chat "Calle" (paseadores, ayudantes, supervisores, coordinador y admin), con "URGENTE" si el riesgo es alto; un pedido de cambio nuevo del supervisor avisa solo en "Coordinación". Cuentan como "sin leer". Editar el registro no repite el aviso.
- Sigue: revisión con capturas de los chats con estos avisos y repaso de textos del manual.

## 14/11/2026 — 02:36 (revisión de cada hora)

- Avisos automáticos urgentes en rojo en el chat. 43 pruebas del servidor OK, armado OK, recorrido sin fallas.
- En curso: revisión de código independiente de todo lo hecho esta noche (40 cambios), buscando errores antes de publicar.
- Sigue: arreglar lo que encuentre y preparar el resumen para Juan.
