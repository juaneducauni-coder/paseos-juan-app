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
