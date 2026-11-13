# Avances — Paseos Juan

Un solo lugar para ver qué está hecho, qué se está haciendo y qué falta. Cada IA lo actualiza al tomar y al entregar una tarea.

Última actualización: 13/11/2026 (tarde) — Claude (JUAN 3.0)

## Necesita a Juan

| Qué | Para qué |
|---|---|
| Escribir "publicá en main" | Publicar todo lo hecho desde la última publicación (página oficial sigue en la versión anterior) |
| Conectar la planilla (guía GUIA-conectar-planilla) | Que los datos y archivos queden en su Google Sheets y Drive |
| Crear el ID de cliente de Google (guía GUIA-activar-google) | Botones "Continuar con Google" |
| Elegir servicio de correo y dar el OK al costo | Aviso por correo cuando alguien pide su alta |
| Datos: WhatsApp del negocio, kilos por tamaño, descuentos, baños, teléfonos del equipo, tienda (nombre, precios, fotos), alianzas reales, cupones | Completar textos que hoy dicen "Pendiente de confirmar" |
| Liberar espacio en la Mac: disco al 99 % | La app no arma en la compu y git falla al guardar |
| Decir si "organizadores" incluye al coordinador para ver la contaduría | Hoy la ve solo el admin (antes decidiste que el coordinador no ve plata) |
| Naranja X: generar un link de pago de prueba y pasar comisión y si se reutiliza | Armar el botón "Pagar" de cada plan |
| Ficha de Google del negocio: ¿existe y quién tiene el acceso? | Plan de marketing |

## Hecho (en la rama `claude/quirky-shannon-ih7yx1`, commit 7931aeb; sin publicar)

- **13/11 tarde:** diseño aireado y figuras orgánicas en toda la app (Gemini, E-044; falta revisarlo con capturas en celular, modo oscuro y calmo).
- **13/11 tarde:** portada de verano con olas, ilustraciones y "primer paseo gratis" (Gemini, E-041, corregido por Claude).
- **13/11 tarde:** contaduría en la pestaña Plata del admin: ingresos, egresos, resultado del mes y CSV (solo admin; 32 pruebas del servidor).
- **13/11 tarde:** avisos azul/rojo con "Visto", dictado por voz y "No hubo incidente" en paseador y ayudante.
- **13/11 tarde:** investigaciones en `asistente/investigacion/`: comercio, marketing y cobros con Naranja X.
- En `/cliente`, pagos, cupones y chat grupal son de EJEMPLO (se guardan solo en el celular).

- Inicio sin precios, `/precios`, `/tienda`, formulario rápido con voz y carnet.
- Ingreso con usuario y PIN; roles admin, coordinador, supervisor, paseador y ayudante, rediseñados para celular.
- Rutas y horarios, pedidos de cambio, clientes, avisos por barrio, fotos de perros, foto del paseo.
- Archivos (carnets, comprobantes) con permisos por rol.
- Dos rondas de auditoría de seguridad (Claude y Gemini) corregidas; 28 pruebas del servidor.
- App instalable en el celular.
- Página del cliente de ejemplo (hecha por ChatGPT/Codex).

## En curso

| Tarea | IA | Estado |
|---|---|---|
| E-040 Arreglos chicos de paseador, ayudante y admin | Claude | A MEDIAS: se cortó la sesión; revisar qué quedó |
| (Gemini: anotá acá lo que estás haciendo) | Gemini | — |

## Por hacer (del Plan maestro)

| N° | Tarea | IA sugerida | Estado |
|---|---|---|---|
| P-01 | Cuentas de clientes: pedir alta → aprobar → horario → acceso | Claude | PENDIENTE |
| P-02 | Aviso por correo a Juan al pedir alta | Claude | BLOQUEADO: falta elegir servicio de correo (Juan) |
| P-03 | Cobro online con Naranja X (link o QR por plan) + comprobante | Claude | ESPERA A JUAN: datos del link de pago |
| P-04 | "Primer paseo gratis" en inicio y precios | Claude | HECHO en inicio; falta en precios |
| P-05 | Términos y Privacidad (borrador) | ChatGPT | PENDIENTE |
| P-06 | Página de Alianzas y contacto | ChatGPT (texto) + Gemini (diseño) | PENDIENTE: faltan las alianzas reales |
| P-07 | Cupones | Claude | PENDIENTE |
| P-08 | Chat grupal de clientes con moderación | Claude | PENDIENTE (depende de P-01) |
| P-09 | Formas de manchas y olas en vez de rectángulos | Gemini | HECHO (falta revisar con capturas) |
| P-10 | Ilustraciones por estación (verano primero) | Gemini | HECHO verano; faltan otoño, invierno y primavera y el cambio automático |
| P-11 | Música opcional, apagada por defecto | Gemini o Claude | PENDIENTE: falta la música (con derechos de uso) |

## Límites de las cuentas

- ChatGPT (plan de 20): llegó a su límite el 13/11 a la tarde. Darle tareas chicas.
