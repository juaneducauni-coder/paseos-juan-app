# Marketing de Paseos Juan — investigación y plan (13/11/2026)

**Conclusión en 3 líneas**

1. La página se entiende rápido ("paseos grupales seguros" + primer paseo gratis), pero Google casi no la puede encontrar: título genérico, descripción que habla del equipo interno, sin zona y sin datos estructurados.
2. Lo que más mueve a un negocio local hoy es la ficha de Google con reseñas recientes y la recomendación entre vecinos; Instagram y WhatsApp acompañan. Hoy la página no muestra ninguna prueba social real.
3. Recomendación: en 4 semanas, primero ficha de Google + SEO básico, después reseñas reales y fotos reales, después referidos y alianzas. La promo DogPro/CatPro vence el 01/12/2026: hay que empujarla ya.

Cómo leer este archivo: **[DATO]** tiene fuente con link · **[SUPOSICIÓN]** es lectura mía, sin medir · **[RECOMENDACIÓN]** es lo que haría. Casi todos los datos con cifra son de Estados Unidos: sirven de orientación, no son medición de Pilar.

---

## 1. Qué funciona hoy para servicios locales de mascotas

### Google Business Profile (ficha de Google)
- **[DATO]** Google dice que el orden local depende de relevancia, distancia y popularidad; que "más reseñas y calificaciones positivas pueden ayudar" y que los perfiles con información completa y exacta aparecen más. No se puede pagar por mejor posición. [Ayuda de Google](https://support.google.com/business/answer/7091)
- **[DATO]** Si no atendés clientes en tu dirección, Google pide ocultar la dirección y cargar zonas de servicio (hasta 20, por ciudad o código postal, no por radio). [Ayuda de Google](https://support.google.com/business/answer/9157481)
- **[DATO]** Encuestas a especialistas (no son pesos oficiales de Google) ponen la categoría principal de la ficha como el factor número uno del mapa, seguida de reseñas y cercanía. [Whitespark 2026](https://whitespark.ca/local-search-ranking-factors/) · [BrightLocal](https://www.brightlocal.com/learn/google-local-algorithm-and-ranking-factors/)
- **[RECOMENDACIÓN]** Es la prioridad 1. Ficha como negocio de servicio a domicilio, zonas Pilar y La Lonja, fotos reales.

### Reseñas
- **[DATO]** Encuesta BrightLocal 2026 (1.002 adultos de EE. UU.): 97 % lee reseñas de negocios locales; 74 % solo mira las de los últimos 3 meses; 47 % no usaría un negocio con menos de 20 reseñas; 89 % espera que el dueño responda. Google es la plataforma más usada (71 %). 45 % ya usa herramientas de IA para pedir recomendaciones locales. [BrightLocal](https://www.brightlocal.com/research/local-consumer-review-survey/)
- **[SUPOSICIÓN]** En barrios cerrados el efecto es parecido o mayor, porque la decisión es de confianza (le dan el perro y el acceso a la casa).
- **[RECOMENDACIÓN]** Pedir reseñas de a poco y siempre, no todas juntas. Responder todas.

### Instagram / Reels
- **[DATO]** Las guías de 2026 coinciden en que las señales principales de Reels son tiempo de visualización, "me gusta" y envíos por mensaje; no hubo cambios confirmados en el segundo semestre. Son blogs de terceros que citan a Adam Mosseri, no un documento oficial. [SocialPilot](https://www.socialpilot.co/blog/instagram-reels-algorithm)
- **[DATO]** La cifra "los envíos pesan 3 a 5 veces más" circula sin fuente: no usarla.
- **[SUPOSICIÓN]** Para un negocio de dos zonas, Instagram sirve más como vidriera de confianza (el vecino te busca antes de escribir) que como fuente de clientes nuevos.
- **[RECOMENDACIÓN]** Pocos Reels cortos, con fotos y videos reales y autorizados. Nada de imágenes de IA en anuncios pagos (regla de marca).

### WhatsApp
- **[DATO]** Infobip ubica a WhatsApp como la app de mensajería número uno en Argentina (80 % en su tabla regional 2026). [Infobip](https://www.infobip.com/es/tendencias-de-mensajeria/analisis-regional)
- **[DATO]** No encontré estadísticas actuales de uso de catálogo ni de estados de WhatsApp Business en Argentina.
- **[RECOMENDACIÓN]** Seguir cerrando todo por WhatsApp (la página ya lo hace). Sumar respuestas rápidas y estados con la foto del paseo.

### Referidos, barrios cerrados y veterinarias
- **[DATO]** Las guías del rubro ponen a los referidos como el canal principal y recomiendan alianzas con veterinarias y peluquerías caninas. Son artículos de opinión de proveedores, sin tasas medidas. [Pet Sitters International](https://www.petsit.com/get-your-first-pet-sitting-clients) · [Protectivity](https://www.protectivity.com/knowledge-centre/how-to-market-a-dog-walking-business)
- **[DATO]** No encontré ningún estudio medido sobre grupos de WhatsApp de barrios cerrados.
- **[SUPOSICIÓN]** Es el canal más fuerte para Paseos Juan: el público confía más en un vecino que en un anuncio. Muchos barrios prohíben publicidad en sus grupos, así que tiene que recomendar un vecino, no el negocio.
- **[RECOMENDACIÓN]** Programa de referidos simple y un mensaje corto que el cliente pueda reenviar.

---

## 2. Auditoría de la página de inicio (`src/views/landing.js` + `index.html`)

### Qué se entiende en 5 segundos
- **Bien:** el título grande dice "Paseos grupales seguros para tu perro" y el botón dice "Pedí tu 1.er paseo gratis". Qué es, para quién y qué hacer está claro.
- **Ruido:** arriba del título hay 4 cosas compitiendo (cinta de verano, etiqueta "Edición Verano", etiqueta de paseo gratis y "Disciplina. Libertad. Bienestar."). En un celular de 390 px, el título y el botón pueden quedar abajo.
- **Falta en el primer pantallazo:** la zona aparece recién en el párrafo chico. Debería estar en el título o pegada a él.

### Qué falta
1. **Prueba social real: no hay ninguna.** La sección con id `testimonios` muestra una frase del propio negocio en formato de cita. No hay reseñas, ni cantidad de perros, ni fotos reales. No inventar: dejar el lugar listo para reseñas reales de Google.
2. **Fotos reales.** Las 3 imágenes son ilustrativas. Las tarjetas de verano lo dicen a la vista; **la foto principal no** (solo en el texto alternativo, que no se ve). Además, la tercera tarjeta repite la imagen de siempre.
3. **Un solo llamado a la acción.** Hoy el mismo paso tiene 5 nombres: "Pedí tu 1.er paseo gratis", "Anotar a mi perro gratis", "Pedir evaluación", "Pedí tu evaluación" y "Pedí tu evaluación en 1 minuto". Conviene uno solo.
4. **El segundo bloque le habla al que ya es cliente.** "¿Ya sos cliente?" ocupa media pantalla en el lugar más valioso para convencer al nuevo. En el encabezado ya existe "Soy cliente".
5. **La promo que vence el 01/12/2026 está escondida** como quinta tarjeta de Servicios.
6. **Dos regalos que se confunden:** "primer paseo gratis" y "muestra + un paseo de regalo". No queda claro si es el mismo paseo o se suman.
7. **Alianzas promete de más.** El texto dice "Sumamos marcas, veterinarias y profesionales", pero la única alianza confirmada es DogPro y CatPro. Y hay una tarjeta pública que dice "Pendiente de confirmar".
8. **Frase de marca.** La guía de marca dice "Cuidado y confianza como en casa"; la página abre con "Disciplina. Libertad. Bienestar.".
9. **"Ahora Verano" el 13/11.** En Argentina es primavera hasta el 21/12. Confirmar si es a propósito.

### SEO local (hoy)
| Elemento | Estado |
|---|---|
| Título | "Paseos Juan": sin servicio ni zona |
| Descripción | Habla de "paseadores y equipo operativo": no le sirve al que busca |
| Idioma | `lang="es"` (mejor `es-AR`) |
| Datos estructurados LocalBusiness | No hay |
| Vista previa al compartir por WhatsApp (Open Graph) | No hay: el link se comparte sin imagen ni texto |
| Dirección canónica | No hay |
| Contenido en el HTML | Todo se dibuja con JavaScript: el HTML inicial está vacío |
| Título por página (`/precios`, `/tienda`) | No cambia: todas se llaman igual |

- **[DATO]** Para que Google muestre el resultado enriquecido de negocio local, exige `name` y `address`; teléfono, horario, `url` y `geo` son recomendados. La guía oficial no habla de negocios sin local. [Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- **[SUPOSICIÓN]** Sin dirección de calle, el dato estructurado igual ayuda a que Google y las herramientas de IA entiendan qué es y dónde trabaja, pero puede no dar el resultado enriquecido.
- **[RECOMENDACIÓN]** Cargar localidad y provincia, sin calle. Los textos exactos van al final (sección 6).

---

## 3. Plan de 4 semanas

### Semana 1 — 16/11 al 22/11: que te encuentren
1. **Ficha de Google.** Crear o reclamar el perfil como negocio de servicio a domicilio, con Pilar y La Lonja como zonas.
2. **SEO básico de la página.** Aplicar los cambios de título, descripción y datos estructurados de la sección 6.
3. **Promo que vence.** Subir la promo DogPro/CatPro arriba en la página y publicar una historia con la fecha 01/12/2026.

### Semana 2 — 23/11 al 29/11: prueba real
1. **Fotos reales.** Juntar 10 fotos de paseos con autorización del tutor anotada en la ficha.
2. **Primeras reseñas.** Pedirle la reseña en Google a 5 clientes actuales, uno por uno, por WhatsApp.
3. **Último aviso de la promo.** Un estado de WhatsApp y una publicación: "hasta el 01/12/2026".

### Semana 3 — 30/11 al 06/12: que te recomienden
1. **Referidos.** Definir el beneficio (lo decide Juan) y mandar a los clientes un mensaje corto para reenviar.
2. **Reseñas en la página.** Reemplazar la frase propia por 2 o 3 reseñas reales de Google, con permiso.
3. **Instagram.** Publicar 2 Reels con material real de la lista de la sección 4.

### Semana 4 — 07/12 al 13/12: alianzas y medir
1. **Veterinarias.** Visitar 3 veterinarias o pet shops de la zona con una propuesta de una hoja.
2. **Medir.** Contar cuántos pedidos de evaluación llegaron y de dónde (preguntar "¿cómo nos conociste?").
3. **Decidir.** Con ese número, elegir un solo canal para reforzar en enero.

---

## 4. 10 ideas de contenido (solo hechos confirmados)

Todas con fotos o videos reales y autorización del tutor. Sin precios en redes: se pasan por WhatsApp.

1. **"El primer paseo es gratis."** Qué pasa ese día: evaluación inicial y paseo de adaptación.
2. **"Así te enterás de que paseó."** El paseo se marca con una foto.
3. **"Agua en ruta."** La botella bebedero en uso durante el paseo.
4. **"¿Qué hace el ayudante de paseador?"** Integra al perro nuevo, lleva agua y botiquín, junta la caca.
5. **"¿Por qué solo grupales?"** Grupos armados por conducta, energía y compatibilidad.
6. **"Antes de sumarlo, lo conocemos."** La evaluación inicial, paso a paso.
7. **"Pedilo en 1 minuto."** Grabación de pantalla del formulario con dictado por voz que termina en WhatsApp.
8. **"Tu perro nuevo en la manada."** Cómo el ayudante lo integra al grupo el primer día.
9. **"Muestra gratis de DogPro o CatPro + un paseo de regalo."** Hasta el 01/12/2026, pieza compartida con la marca.
10. **"¿Tenés más de un perro?"** Hay descuento por varios perros; el detalle, por WhatsApp.

---

## 5. Pendiente de confirmar con Juan

1. ¿Existe ya la ficha de Google de Paseos Juan? ¿Quién tiene el acceso?
2. ¿Existe la cuenta de Instagram @paseosjuan?
3. ¿Cuál es el dominio definitivo de la página? (hace falta para la dirección canónica y la vista previa).
4. ¿Qué localidad y provincia van en los datos del negocio? (sin calle).
5. Días y horarios de atención para publicar.
6. ¿El paseo de regalo de la promo es el mismo que el primer paseo gratis, o se suman?
7. ¿Qué pasa con la promo después del 01/12/2026: se extiende o se baja?
8. ¿Hay beneficio por referido? ¿Cuál?
9. ¿Qué clientes autorizan usar la foto de su perro y su reseña?
10. ¿Hay fotos reales de paseos, del equipo y de la botella bebedero?
11. ¿"Ahora Verano" en noviembre es a propósito?
12. ¿Qué veterinarias o pet shops ya conocés para proponer alianza? (hoy solo está confirmada DogPro y CatPro).
13. ¿Desde cuándo funciona Paseos Juan y cuántos perros pasea? Solo si Juan quiere publicarlo.
14. ¿Qué número de WhatsApp va a ser el definitivo del negocio? (en el código figura como provisorio).

---

## 6. Cambios de texto y SEO recomendados (no aplicados)

### `index.html`
| Actual | Propuesto |
|---|---|
| `<html lang="es">` | `<html lang="es-AR">` |
| `<title>Paseos Juan</title>` | `<title>Paseos grupales de perros en Pilar y La Lonja · Paseos Juan</title>` |
| Descripción: "Paseos Juan: paseos grupales para perros con seguimiento, seguridad y perfiles personalizados para clientes, paseadores y equipo operativo." | "Paseos grupales de perros en Pilar y La Lonja. Grupos armados por conducta y energía, foto de cada paseo y agua en ruta. El primer paseo es gratis: pedí tu evaluación por WhatsApp." |
| (no hay) | Etiquetas de vista previa: `og:title` y `og:description` con los mismos textos, `og:type` "website", `og:locale` "es_AR", `og:image` con una **foto real** (pendiente) y `og:url` + `<link rel="canonical">` con el dominio (pendiente) |
| (no hay) | Bloque JSON-LD `LocalBusiness`: `name` "Paseos Juan"; `description` igual a la de arriba; `areaServed` "Pilar" y "La Lonja"; `address` solo con localidad, provincia "Buenos Aires" y país "AR" (pendiente); `url` (pendiente); `telephone` tomado del WhatsApp público del negocio; `openingHoursSpecification` (pendiente). **Sin** `aggregateRating` ni `review`: Google los reserva para sitios que juntan reseñas de otros negocios |
| `<div id="app"></div>` vacío | Sumar un `<noscript>` con una línea: "Paseos Juan: paseos grupales de perros en Pilar y La Lonja. El primer paseo es gratis." |

### `src/views/landing.js`
| Dónde | Actual | Propuesto |
|---|---|---|
| Hero, texto chico arriba del título | "Disciplina. Libertad. Bienestar." | "Pilar y La Lonja · Cuidado y confianza como en casa" |
| Hero, etiquetas | "🌊 Edición Verano · Aire libre y frescura" + "🎁 1.er paseo de adaptación sin cargo" | Dejar solo una: "El primer paseo es gratis" |
| Hero, párrafo | "Paseos grupales organizados por conducta, energía y compatibilidad. Cuidado y confianza como en casa, en Pilar y La Lonja." | "Grupos armados por conducta, energía y compatibilidad. Te mandamos la foto de cada paseo." (confirmar que la foto le llega al tutor) |
| Hero, botón secundario | "Ya soy cliente · Entrar" | "Ver cómo trabajamos" (enlace a `#como-trabajamos`); el acceso de clientes queda en el encabezado |
| Hero, imagen | Sin rótulo visible | Sumar a la vista "Imagen ilustrativa", como en las tarjetas de verano |
| Botones del mismo paso | "Anotar a mi perro gratis", "Pedir evaluación", "Pedí tu evaluación" | Uno solo en toda la página: "Pedí tu 1.er paseo gratis" |
| Título del formulario | "Pedí tu evaluación en 1 minuto" | "Pedí tu 1.er paseo gratis en 1 minuto" |
| Segundo bloque | Tarjeta "¿Ya sos cliente de Paseos Juan?" | Moverla abajo de todo (antes del pie) y poner en su lugar la promo DogPro/CatPro mientras esté vigente |
| Alianzas, texto | "Sumamos marcas, veterinarias y profesionales de Pilar y La Lonja para darle más beneficios a tu perro." | "Trabajamos con DogPro y CatPro. Si tenés una veterinaria, pet shop o marca en Pilar y La Lonja, sumate." |
| Alianzas, tarjeta | "Más alianzas · Veterinarias, pet shops y profesionales · Pendiente de confirmar. · Próximamente" | Sacarla hasta tener una alianza confirmada |
| Sección `testimonios`, texto chico | "Nuestro compromiso" + frase propia en formato de cita | Mantener la frase como texto común (no como cita) y cambiar el id a `compromiso`; cuando haya reseñas reales, sumarlas con nombre de pila y permiso |
| Tarjeta de verano 3 | Imagen `hero-dog-premium.png` repetida | Reemplazar por una foto real o sacar la tarjeta |
| Pie | "Paseos grupales, baños y más. Pilar y La Lonja." | "Paseos grupales de perros en Pilar y La Lonja." |
| Título de la pestaña | Igual en todas las páginas | Que cada página ponga el suyo: "Precios · Paseos Juan", "Tienda · Paseos Juan" (el cambio va en el enrutador, no en `landing.js`) |

---

**PRÓXIMO PASO:** Juan, decime si ya existe la ficha de Google de Paseos Juan y quién tiene el acceso.
