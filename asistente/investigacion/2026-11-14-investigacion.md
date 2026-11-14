# Investigación E-029: auditorías, tienda, datos reales, alias y diseño (14/11/2026)

Hecha por la IA investigadora de JUAN 3.0. No cambia la app: es material para decidir.

**Conclusión en 3 líneas**

1. Las auditorías de Gemini y ChatGPT **no están en Drive ni en Gmail**: quedaron aplicadas en el repositorio, en la rama `origin/claude/quirky-shannon-ih7yx1`, que va **24 commits por delante** de 79bfea9 (base de este informe).
2. "Productos de exportación, demora en llegar" es **Karis**, la marca propia de importación desde China (1688). Todavía es **idea en investigación**: no hay proveedor, compra ni precios propios. Lo único real en la tienda hoy es DogPro y CatPro (VitalCrops), sin presentación ni precio cargados.
3. El alias `dejandohuellas.plan` **no aparece en ningún lado** fuera del código viejo. Los cobros entran por Naranja X. El alias real queda **Pendiente de confirmar**.

Cómo leer: **DATO** = lo vi en la fuente que se nombra. **TERCEROS** = lo dice otra persona o IA. **SUPOSICIÓN** = razonamiento mío. **RECOMENDACIÓN** = lo que yo haría.

---

## 1. Auditorías encontradas y sus hallazgos principales

### Dónde busqué

- **Drive** (últimos 60 días, títulos y texto): "RETORNO", "auditoría", "Gemini", "ChatGPT", "GPT", "app", "página", "web", "manual", "encargo". No hay ningún documento de RETORNO ni de auditoría de otra IA. Lo único de coordinación es el "Centro de mando — Paseos Juan (JUAN 3.0)" (12/11/2026).
- **Gmail**: sin hilos de negocio con esas palabras. Solo publicidad de ChatGPT y Gemini, y un pedido de acceso de una tercera persona a "Karis - Tabla productos evaluados" (30/09/2026).
- **Sesiones de Claude Code**: 4 sesiones. La que tiene información es la de coordinación ("Gestión de trabajos entre IAs y chats"). Las otras son de septiembre y octubre (plataforma interna en pausa esperando Render, ayudantes y modos, código QR) y no suman datos nuevos.
- **Repositorio**: acá estaban las auditorías.

### Hallazgos (fuente: commits del 13/11/2026 en `origin/claude/quirky-shannon-ih7yx1`)

| Fuente | IA | Qué encontró o cambió |
|---|---|---|
| 40a5699 (13/11, ya en la base) | GPT | Cambiar "Control total" por "Seguimiento del paseo" en el inicio. |
| 1d64e05 E-032 | Gemini | Páginas públicas. Ingreso sin datos precargados. PIN con botón "Ver". Botones flotantes que no tapan texto. Formulario visible al llegar, con los opcionales plegados. |
| 84e999d E-035 | Gemini | Paseador y ayudante. El ayudante sin ruta elige primero "¿Con qué ruta vas?". "Otra manada" pasa a "Cruce o perro suelto". "Salir" visible. Devolver (máximo 2) sin tocar "Integrado". |
| 7755313 E-036 | Gemini | Supervisor. Pedir cambio en 2 toques. Atrasos escritos como "2 h 24 min". |
| d7d0632 | Gemini | Coordinador. Cargar las rutas en 2 toques desde Inicio. Textos sin jerga. |
| 3ea437e E-038 | Gemini | Admin. "Hoy en números" debajo de "Próximo paso". "BASE RUTAS" pasa a "Planilla de rutas". Atrasos resumidos por ruta. |
| 15108ac E-039 | Gemini | Seguridad. El supervisor ya no lee fichas (datos de tutores y salud). Reglas por registro en el servidor. Subida de archivos según el rol. Los PDF se descargan aislados. 28 pruebas. |
| de2996e y b045305 | Varias IA (auditoría multiagente) | Ingreso atómico, límite de intentos por IP, 401 genérico, fórmulas neutralizadas en Sheets, XSS del supervisor. |
| fc306cf y 4da4b14 E-030/E-030b | ChatGPT/Codex | Página del cliente: tarjeta "Hoy", grilla 2x2 (Ausencia, Carnet, WhatsApp, Mi plan) y el resto en "Más". |
| 3fcc49b E-041 | Gemini (corregido por Claude) | Verano, olas, cupones y chat de ejemplo. Claude quitó los mensajes de clientes y las alianzas inventadas, y rotuló las imágenes como ilustración. |
| `asistente/encargos/2026-11-13-E044-retorno-gemini-aireado.md` | Gemini | Diseño aireado: margen de 20 px en celular, texto de 64 caracteres de ancho, interlineado de 1,58, toque mínimo de 48 px con 8 px entre botones, bordes "mancha u ola". **Gemini no compiló ni probó en navegador.** Falta revisarlo con capturas en 360 px, en modo oscuro y en modo calmo. |
| `asistente/AVANCES.md` y `asistente/PLAN-MAESTRO.md` (13/11 a la tarde) | Claude | Tablero común para las 3 IAs. E-040 quedó **a medias** porque se cortó la sesión. ChatGPT llegó a su límite el 13/11. |
| `asistente/investigacion/2026-11-13-comercio.md`, `-marketing.md` y `-cobros-naranja-x.md` | Claude | Tienda: falta presentación, precio y foto. Botón de arrepentimiento (Disposición 954/2025). Naranja X no tiene API pública, así que la aprobación del pago es manual. Prioridad de marketing: la ficha de Google. |

### Pedido de Juan que todavía no figura en ningún archivo (sesión de coordinación, 13/11/2026, 23:28)

- El **alias** tiene que quedar visible para los clientes, **escrito completo**. **Solo el administrador** maneja el pago.
- **El ayudante lleva muslera y el paseador lleva pechera.**
- Gemini se ocupa del diseño de la página: vectorizado, con historias, textos chicos y accesos directos. Además quiere un manual.
- Comunicación en grupo: chats entre paseadores, de cliente a coordinador, de paseador a cliente y supervisor, y chat de decisiones entre paseadores, supervisores, ayudantes y coordinadores.
- Aprender de páginas profesionales con "espacio y oxígeno visual".

### Ojo con la base

- **DATO:** esta copia arrancó en c8a2675 (12/11) y la llevé a 79bfea9, como pedía el encargo. Lo hecho el 13/11 entre las 11:16 y las 18:24 (auditorías, plan maestro, diseño aireado, contaduría) está **solo** en `origin/claude/quirky-shannon-ih7yx1` (último commit a9639c2).
- **RECOMENDACIÓN:** el próximo trabajo de código tiene que partir de a9639c2, no de 79bfea9.

---

## 2. Tienda: productos e importación

Hay **dos cosas distintas** que conviene no mezclar.

### A. Tienda de hoy en la app (`/tienda`): DogPro y CatPro

| Qué | Estado | Fuente |
|---|---|---|
| Marcas DogPro (perros) y CatPro (gatos), de VitalCrops, que es aliado y autorizó el uso de sus marcas | **Confirmado** | Centro de mando (12/11); guía de marketing; `src/data/tienda.js` |
| Promo: muestra gratis de DogPro o CatPro más un paseo gratis, abierta a cualquiera. Vence el **01/12/2026** | **Confirmado** | Guía de marketing; encargo E-003 |
| Nombre de la tienda | **Pendiente de confirmar** (hoy dice "Tienda") | `src/data/tienda.js` |
| Presentación (kilos), precio y foto | **Pendiente de confirmar** | `src/data/tienda.js`; investigación de comercio del 13/11 |
| Que sean importados o "de exportación" | **No hay ningún dato.** Nada indica que DogPro o CatPro sean importados. | — |
| Forma de venta: pedido por WhatsApp, sin cobro online | Confirmado en el código | `src/views/tienda.js` |

### B. Karis: marca propia de productos importados (esto es lo que "demora en llegar")

Fuentes: carpeta "Karis" del Drive compartido de Paseos Juan (cuyo dueño es Mateo Pérez): "PROYECTO IMPORTACIÓN - (Nombre)" (modificado el 09/11/2026), "Karis - Identidad de marca / Estrategia de marketing" (10/11), "Karis - Productos / Investigación de mercado" (10/11) y "Karis - Tabla productos evaluados" (10/11). También el PDF "Karis · Identidad de marca (modelo de referencia)", guardado en el Drive de Paseos Juan el 11/11.

**Qué es (DATO, del documento):** "Crear una marca de productos para mascotas innovadores de buena calidad. Los productos se compran en China por 1688 y se venden online en el mercado argentino." Su posicionamiento es: productos funcionales que resuelven problemas reales de la convivencia con el perro, con calidad y a buen precio. El público es de dueños de perros de 25 a 55 años, de clase media a media-alta. El primer empujón sería zona norte del GBA, por los clientes de Paseos Juan.

**Tiempos de llegada (DATO, sin verificar):** "Tarda 50 días de fabricación + 3 meses en barco". Pendiente: "Importar primero por avión - Averiguar". También: "Traer mercadería chica conviene".

**Costos anotados (DATO, sin verificar):** IVA 21 %, Ingresos Brutos 3 a 5 %, Ganancias 5 a 35 % anual, y "12-14 usd por kilo que traés" (courier).

**Canales que se pensaron (IDEA):** tienda propia (Shopify, Tiendanube o Mercado Shops), Mercado Libre, Amazon, los clientes actuales y **la app de Paseos Juan**. Publicidad en Meta y TikTok, Meli+ y Google.

**Pasos del plan (IDEA, todos sin hacer según los documentos):** elegir productos, elegir proveedores, hablar por WeChat, hacerse monotributista y comprar. Mientras llega la mercadería: crear la marca, el contenido y la página, y vender.

**Productos elegidos para el primer lote.** Todos son **IDEA**: recomendación de la investigación, sin proveedor, costo ni precio propio.

| # | Producto | Para qué sirve | Nota de la investigación |
|---|---|---|---|
| 1 | Peluche con latido, tipo Snuggle Puppy, mejorado | Calma el llanto de las primeras noches y la ansiedad | Mejor señal: muy vendido afuera y casi sin oferta en Argentina. Mejoras: latido recargable USB-C y calor reutilizable |
| 2 | Removedor de pelo reutilizable, tipo ChomChom | Saca pelo de sillones sin repuestos | Ganarles a los clones con mejor resorte y terciopelo |
| 3 | Lick mat (alfombra para lamer) con ventosas | Calma en el baño, al cortar uñas o con pirotecnia | Kit "Calma Karis" junto con el 4 |
| 4 | Snuffle mat plegable (alfombra olfativa) | Estimulación mental, comer despacio | Liviano, ideal para courier |
| 5 | Comedero rompecabezas giratorio | Estimulación, comer despacio | Piezas que el perro no pueda sacar |
| 6 | Limpiador de patas manual y eléctrico | Patas embarradas al volver del paseo | Del manual ya hay un "más vendido" en Mercado Libre; el eléctrico casi no está en el país |
| 7 | Correa manos libres con porta-celular impermeable | Pasear o correr con las manos libres | La funda táctil es el diferencial |
| 8 | Comedero lento o inserto de silicona | Para el perro que come rápido | El inserto para bowl de acero sería novedoso |
| 9 | Saca-garrapatas en kit | Sacar la garrapata entera, sin químicos | Ticket bajo: para sumar al carrito |
| 10 | Bebedero fuente de acero con bomba inalámbrica | Agua fresca filtrada | Mercado saturado: solo con mejoras claras |

Para evitar o postergar (según la investigación): pelota auto-rodante (se rompe), monitor de actividad (depende de una app y pide homologación ENACOM), collar de citronela (choca con la imagen de "bienestar") y productos voluminosos para courier (camas, rampas, empapadores).

**Precios:** en los documentos hay **precios de la competencia en Mercado Libre** (por ejemplo, el vaso limpiapatas a unos $12.000 y el lick mat de otro emprendedor a $11.799). **No son precios de Karis.** No hay precio de venta propio ni costo de compra de ningún producto.

**Otros:**
- "Karis - Creativos publicitarios por producto" está vacío.
- En "Compartidos conmigo" hay una carpeta "LISTA DE PRECIOS Y CATALOGO" de un mayorista de accesorios (orden de pedido mayorista, compartida el 03/02/2026). No encontré ningún acuerdo. Pendiente de confirmar si es proveedor de la tienda.

**SUPOSICIÓN:** Juan quiere que la tienda de la app muestre productos Karis con un aviso de "demora en llegar". Hoy no hay ni un producto Karis con stock, proveedor o precio.

**RECOMENDACIÓN:** no publicar productos Karis en `/tienda` hasta tener proveedor, costo y precio. Si Juan quiere mostrarlos antes, que sea como "Próximamente", con lista de espera por WhatsApp y el tiempo de llegada marcado como estimado.

---

## 3. Diferencias de datos reales de perros y equipo (contra `src/data/realData.js`)

### Fuentes y fechas

- RPJ: modificada el 11/11 a las 20:33. **No cambió después de la lectura del 12/11**, así que no la volví a leer completa. Solo leí la hoja DIAS CONTRATADOS.
- "Perros paseados": pestaña "Noviembre Paseos" y "perros que volveran" (11/11, 21:07).
- "entra y sale x paseos juan": hoja Tabla de precios (10/11).
- Sistema_Gestion: hojas Base de datos y Parámetros, y el formulario de fin de turno (modificado el 12/11 a las 23:42, **después** de realData). No copié dueños, teléfonos ni direcciones.
- "Reporte semanal perros paseados": Inventario de equipamento (24/09) y Planes actualizados.
- "registroperros.md" (registro maestro del 14/08).

### Altas, bajas y estados

| Perro | realData dice | Las planillas dicen | Qué hacer |
|---|---|---|---|
| **Bocha** | "Sin ruta cargada" | Base de datos: **Activo**, de lunes a viernes. Perros paseados: 4/4 y 3/6. Formulario de fin de turno del 12/11: paseado | Está activo: falta en BASE RUTAS. Confirmar días y horario |
| **Coqui** | "Baja informada" | Perros paseados: "no pasea más". Pero en la Base de datos sigue **Activo** y la Tabla de precios lo cobra | Confirmar la baja y sacarlo de la Base de datos y de la tabla |
| **Forest** y **Milo** | Activos con ruta | Perros paseados: están en "perros que volverán". **No están** en la Base de datos. Milo figura con precio final $0 | Probable pausa. Confirmar si siguen en rutas |
| **Candombe** y **Momo** | "Sin ruta cargada" | No están en la Base de datos ni en Perros paseados. Precio final $0. DIAS CONTRATADOS: 3 paseos sin días | Probable inactivos |
| **Llak** | No está (el nombre de BASE RUTAS del jueves no se cargó) | DIAS CONTRATADOS: 2 paseos por semana. Registro maestro: Pequeño, individual | **Es un perro real**: falta cargarlo |
| **Mily** e **Isis** | No están | "Perros que volverán" (paseaban 5 días) | Sumar como "pausados" si Juan confirma |
| **Hematita** y **Sheriff** | No están | DIAS CONTRATADOS, con 0 paseos | Confirmar si son clientes |

### Planes, días y frecuencia

| Perro | realData | Base de datos (12/11) | Otras fuentes |
|---|---|---|---|
| Manolo | Plan 6 + 1, de lunes a sábado | Plan 6 + 1, **7 días (lunes a domingo)** | Perros paseados: 7 días |
| Tayler y Duque | "Plan 3 + individual"; Tayler de lunes a sábado, Duque de lunes a viernes | **Plan 6 + 1, 7 días** (figuran como "Taylor" y "Duke") | Parámetros: "Plan 6 + 1 = 6 paseos + 1 individual (antes figuraba como 'Plan 3 + individual')". **El nombre del plan en realData quedó viejo** |
| Rambo | Plan 3, de lunes a viernes, 2 veces por día | Plan 3, **7 días**, con una excepción de cobro (hay una observación de salud en la planilla, no la copio) | DIAS CONTRATADOS: "Rambo" y "Rambo T2", 7 días |
| Jack | Sin plan (2 paseos): lunes y viernes | Sin plan (2 paseos), pero **4 días: lunes, martes, jueves y viernes**, con excepción de cobro (observación de salud en la planilla) | Perros paseados: 4 días |
| Sonia y Wendy | De lunes a viernes | **De lunes a sábado** (6 paseos, Plan 3) | Perros paseados: 6 días. Resuelve el aviso "Plan 3 son 6 paseos y figura 5 días" |
| Sam | Tardes de lunes a viernes y sábado a la mañana | De lunes a viernes. La planilla misma pregunta: "5 días para 6 paseos: ¿hay doble paseo algún día?" | DIAS CONTRATADOS: todos los días en "SI", pero 2 paseos por semana (se contradice) |
| Ron y Otto | Lunes, miércoles y viernes | **Lunes, martes y miércoles** | DIAS CONTRATADOS y BASE RUTAS: lunes, miércoles y viernes. El formulario del 12/11 (jueves) los anota como paseados |
| Roma | Sábado | **Sábado y domingo** | Registro maestro: "individual (SAB-DOM)" |
| Runa | Viernes | Viernes | DIAS CONTRATADOS: **jueves** |
| Séptima | Martes, miércoles y viernes | **Lunes, miércoles y viernes** | — |
| Pistacho | De lunes a viernes | De lunes a viernes | DIAS CONTRATADOS: lunes, martes, miércoles, viernes y **sábado** (sin jueves) |
| Bocha | Sin días | De lunes a viernes, 5 paseos (se cobra Plan 1). Observación de salud en la planilla | — |

### Nombres y tamaños

- **Nombres que no coinciden entre fuentes:** Duque/Duke, Tayler/Taylor, Annie/Ani/Any, Cashi/Cachi, Lokaku/Lukaku, Séptima/Septima/Septimo/Sep, Runa/Runna. **RECOMENDACIÓN:** que Juan elija una forma para cada uno y se use en todas las planillas.
- **Tamaños:** el registro maestro (14/08) dice Frida Mediano, Milo Mediano y Roma Mediano. La Tabla de precios y la Base de datos dicen Frida Grande, Milo Grande y Roma Chico (realData sigue a estas últimas).
- **Dato nuevo útil:** la Base de datos tiene el **sexo** de cada perro (macho o hembra). realData no lo tiene. Es un dato operativo, no privado.

### Precios

- **Los planes 1, 2 y 3 coinciden** con `REAL_PLANS`.
- **No están en realData:** Plan 6 + 1 Grande, $57.000 (Manolo y Taylor), y la variante Mediano de Duque, $53.000.
- **Los paseos sueltos no cierran con `REAL_SINGLE_WALK`:** en la Tabla de precios salen $9.000 por paseo (Runa y Jack, Chico), $10.000 (Roma, Chico) y $11.000 (Candombe, Mediano). La hoja "Planes actualizados" dice Pequeño $8.000 en grupo y $10.000 individual, y Mediano $10.000 en grupo y $12.000 individual. **Pendiente de confirmar** cuál vale.
- La Tabla de precios dice "Total perros: 27", pero tiene 31 filas.
- Los descuentos personales existen, pero no los copio.

### Equipo de paseo

- **El inventario coincide con realData** (hoja del 24/09/2026, que puede estar vieja): correas 8 (todas de Sebastián), bebederos 3, ganchos 9, musleras 3 (2 de Juan y 1 de Sebastián), pecheras 3 (2 de Juan y 1 de Sebastián), cinturones 3, bozales 2 grandes, 1 mediano y 1 chico, cepillos 6 y tijeras 2. Bozal de Lokaku: Juan. Bozal de Forest: Sebastián.
- **Regla nueva de Juan (13/11, en la sesión):** el ayudante lleva **muslera** y el paseador lleva **pechera**. El inventario está repartido entre Juan y Sebastián, no por rol. Con 3 musleras y 3 pecheras alcanza para 3 parejas de paseador y ayudante. **Pendiente de confirmar** quién tiene cada una hoy.

### Equipo humano

- La hoja Parámetros (Sistema de Gestión) tiene **4 paseadores activos con tarifa por hora** ("Tarifa pendiente de confirmar por Juan") que no figuran en el equipo autorizado de la app. Ya está marcado en el Centro de mando. No los nombro acá.

---

## 4. Alias de pago

| Qué | Dónde | Estado |
|---|---|---|
| `dejandohuellas.plan` | **Solo** en el primer commit del repositorio, 17b7bf7 (`src/app.js`: `const PAYMENT_ALIAS = "dejandohuellas.plan";` y un cartel "Pago online (Demo)"). Se sacó en c8584a5 ("sin alias de pago") | **No confirmado.** No aparece en Drive ni en Gmail |
| "PASEOS JUAN · DEJANDO HUELLA" | Encabezado del documento "Catalogo_de_Oficios_Paseos_Juan" (27/08/2026) | Es un lema de marca, no un alias. **SUPOSICIÓN:** el alias viejo salió de ese lema |
| Dónde entran los cobros | Guía del Libro contable: "Capturas de Naranja X (pantalla Movimientos): cada 'Transferencia recibida' es un ingreso". Medios en Parámetros: Efectivo, Transferencia, Mercado Pago, Naranja X y Otro | **DATO:** los pagos de clientes entran por Naranja X |
| Alias de la Cuenta negocio de Naranja X | Investigación de cobros del 13/11: la Cuenta negocio tiene "alias propio del negocio" | **Pendiente de confirmar** si Juan tiene esa cuenta y cuál es el alias |

Busqué en Drive "alias", "dejandohuellas", "huellas", "CVU" y "Naranja X", y en Gmail "alias", "CVU", "naranja x" y "transferencia" (último año). No hay ningún alias escrito.

**Lo que pidió Juan (13/11, 23:28):** que el alias quede visible para los clientes, escrito completo, y que el pago lo maneje solo el administrador. Encaja con el Plan maestro: el alias se carga desde el panel del admin, lo ven solo los clientes con sesión y no se escribe en el código.

**RECOMENDACIÓN:** que Juan copie el alias desde la app de Naranja X (no de memoria) y lo cargue él en el panel del admin. No usar `dejandohuellas.plan` hasta que Juan diga que es ese.

---

## 5. Patrones de diseño profesional

Fuentes: Rover (página de inicio, seguridad, ayuda sobre el mapa del paseo y los Rover Cards), Wag (ficha de la app y reseñas), Time To Pet (páginas del producto y reseñas en Capterra y GetApp), PetBacker (centro de ayuda y reseñas), Gudog (Trustpilot y perfiles) y DogHero (Forbes Argentina).

**Límite:** la red de esta sesión no me dejó abrir esas páginas para medir tamaños ni contar palabras. Los números de tamaño y cantidad de palabras de abajo son **RECOMENDACIÓN** y se basan en el retorno E-044 de Gemini, no en mediciones de esos sitios.

1. **Reporte del paseo como tarjeta única, al terminar.** DATO: Rover arma una tarjeta con el mapa, el tiempo total, la distancia, la hora de inicio y fin, pis, caca, agua y comida, fotos y una nota. Hoy pide al menos 1 foto. Para Paseos Juan: foto, hora de retiro, hora de entrega, agua y una nota de una línea.
2. **El reporte destraba el cierre.** DATO: en Rover, quien hace paseos recurrentes tiene que mandar la tarjeta antes de cobrar. Para Paseos Juan: el paseo queda "completo" recién con la foto o con "Sin foto del paseo" marcado (ya existe en E-027).
3. **Pis y caca en un toque.** DATO: Wag avisa en vivo y los marca en el recorrido. Para Paseos Juan: dos íconos que se tocan en la calle y aparecen en el reporte.
4. **Seguimiento en vivo, opcional.** DATO: el mapa de Rover **no** es en vivo, por privacidad, y solo lo ven el paseador, el dueño y Rover. Wag sí es en vivo. RECOMENDACIÓN: no mostrar el recorrido en vivo, porque expone casas y rutas. Alcanza con la foto y las horas.
5. **El cliente le escribe al negocio, no al paseador.** DATO: en Time To Pet el cliente le manda mensajes "al negocio" desde el portal. Para Paseos Juan: chat cliente–coordinador, sin teléfonos del equipo a la vista (coincide con E-027).
6. **Las fotos van dentro del chat y avisan solas.** DATO: en PetBacker los "momentos" se mandan desde el chat y al dueño le llega el aviso. Para Paseos Juan: la foto del paseo se publica sola en el hilo del cliente.
7. **Portal del cliente con 4 cosas.** DATO: Time To Pet muestra próximos paseos, pedidos de servicio, datos del cliente y pagos. Coincide con la grilla 2x2 de E-030 (Ausencia, Carnet, WhatsApp, Mi plan).
8. **La confianza se muestra con contexto.** DATO: Rover pone en el inicio el control de antecedentes, con insignias distintas según el nivel, reseñas verificadas y una garantía. RECOMENDACIÓN: mostrar lo que es real ("evaluación inicial", "grupos por compatibilidad", "primer paseo gratis") con una línea que explique cada cosa. Nada de reseñas hasta tener reseñas reales.
9. **"Cómo funciona" en 3 pasos numerados.** DATO: Rover lo muestra como buscar, conocerse en persona y reservar. Para Paseos Juan: Pedí tu evaluación → Primer paseo gratis → Elegí tu plan.
10. **Conocerse antes de reservar.** DATO: Gudog y Rover ofrecen un encuentro previo. Para Paseos Juan ya existe: es la evaluación inicial. Conviene nombrarla igual en todas las páginas.
11. **Un botón principal por pantalla.** TERCEROS: los íconos y botones dicen dónde buscar, comparar, reservar o mandar un mensaje. RECOMENDACIÓN: un solo botón verde por pantalla y lo secundario como link de texto.
12. **Precios.** RECOMENDACIÓN: tabla de tamaño por plan con la fecha "vigente al" (ya está en `/precios`). Sin precios en redes.
13. **Tienda curada, no catálogo gigante.** DATO (documentos de Karis): "La curaduría pesa más que el catálogo gigante" y se confía más en un video del producto en uso que en una foto de catálogo. Para `/tienda`: pocos productos, cada uno con para qué sirve, presentación, precio, foto o video real y "entrega con el paseo".
14. **Aire y lectura.** RECOMENDACIÓN, tomada de E-044: margen de 20 px en celular, texto de no más de 64 caracteres por línea, interlineado de 1,5 a 1,6, toque mínimo de 48 px con 8 px entre botones, títulos de 6 palabras o menos y secciones de 25 a 40 palabras.
15. **Que funcione sin señal.** DATO: las reseñas de Time To Pet se quejan de fotos y GPS que fallan, y las de Wag de soporte lento. Para Paseos Juan: mantener "Foto por subir" con cola sin señal (ya está en E-027) y una respuesta de WhatsApp clara.

Dato de contexto: DogHero, la plataforma brasileña de cuidado de mascotas, **dejó de operar en Argentina** tras su fusión con Petlove (Forbes Argentina). No encontré un referente local fuerte de paseos con app.

Fuentes web:
- [Rover: cómo funciona el mapa del paseo](https://support.rover.com/hc/en-us/articles/211587446-How-does-the-dog-walking-map-feature-work)
- [Rover Cards (Business Wire, 2016)](https://www.businesswire.com/news/home/20160822005319/en/Rover.com-Releases-%25E2%2580%259CRover-Cards%25E2%2580%259D-New-Dog-Walking)
- [Rover: inicio](https://www.rover.com/)
- [Rover: seguridad](https://www.rover.com/safety/)
- [Wag en la App Store](https://apps.apple.com/us/app/-/id940734609)
- [Reseña de Wag (Hepper)](https://www.hepper.com/wag-dog-walker-sitter-app-review/)
- [Time To Pet: software de paseos](https://www.timetopet.com/dog-walking-software)
- [Time To Pet en Capterra](https://www.capterra.com/p/144329/Time-To-Pet/reviews/Capterra___162464/)
- [PetBacker: ayuda para cuidadores](https://www.petbacker.in/help-center-uk/pet-service-providers-uk)
- [Gudog en Trustpilot](https://nl-be.trustpilot.com/review/gudog.com)
- [DogHero se fue de Argentina (Forbes Argentina)](https://www.forbesargentina.com/negocios/se-fue-argentina-airbnb-mascotas-motivos-su-salida-n4866)

---

## 6. Pendiente de confirmar con Juan

1. **Alias de cobro:** ¿cuál es? Copiarlo desde la app de Naranja X. ¿`dejandohuellas.plan` es real o era de prueba?
2. **Karis:** ¿la tienda de la app va a mostrar productos Karis? ¿Hay proveedor elegido en 1688, se hizo alguna compra y hay precio de venta? ¿Primer envío por avión o por barco?
3. **DogPro y CatPro:** nombre de la tienda, presentaciones (kilos), precios, foto autorizada y si se entregan con el paseo.
4. **Bocha:** ¿qué días y horario sale? Está activo, pero no tiene ruta cargada.
5. **Coqui:** ¿la baja es definitiva? Sigue activo en la Base de datos y cobrado en la Tabla de precios.
6. **Forest, Milo, Mily e Isis:** ¿están en pausa? ¿Cuándo vuelven?
7. **Candombe, Momo, Hematita y Sheriff:** ¿siguen siendo clientes?
8. **Llak:** confirmar el nombre, los días y el horario para cargarlo.
9. **Días que no coinciden entre fuentes:** Ron y Otto (¿martes o viernes?), Sam (¿doble paseo algún día?), Runa (¿jueves o viernes?), Séptima (¿lunes o martes?), Pistacho (¿jueves o sábado?), Roma (¿también domingo?), Manolo, Taylor y Duke (¿también domingo?).
10. **Nombre del plan:** ¿se usa "Plan 6 + 1" en lugar de "Plan 3 + individual" en toda la app?
11. **Precio del paseo suelto:** ¿$9.000 a $11.000 (Tabla de precios) o $8.000 y $10.000 en grupo (Planes actualizados)?
12. **Tamaños** de Frida, Milo y Roma.
13. **Nombre único** de cada perro: Duque o Duke, Tayler o Taylor, Annie o Ani, Cashi o Cachi, Lokaku o Lukaku, Séptima o Septimo, Runa.
14. **Musleras y pecheras:** quién tiene cada una hoy, para cumplir "ayudante con muslera, paseador con pechera".
15. **Paseadores de la hoja Parámetros:** ¿se suman al equipo autorizado de la app?
16. **Proveedor mayorista de accesorios** (carpeta "LISTA DE PRECIOS Y CATALOGO"): ¿se usa para la tienda?

**PRÓXIMO PASO:** que Juan copie el alias de cobro desde la app de Naranja X y se lo pase a JUAN 3.0 para cargarlo en el panel del admin.
