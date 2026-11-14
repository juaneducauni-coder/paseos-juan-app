# Encargos de Trabajo en Paralelo — Diseño Verano, Pagos, Cupones y Comunidad (13/11/2026)

Este archivo organiza el trabajo en paralelo entre **Gemini**, **Claude (JUAN 3.0)** y **ChatGPT**, con la regla de respaldo (si uno no puede tras 2 intentos, deja `PASE DE POSTA` para que tome la otra IA).

---

## E-041 — Gemini (COMPLETADO): Diseño Orgánico (Olas/Manchas), Modo Verano, Cupones y Chat Grupal UI
- **Archivos tocados:** `src/views/landing.js`, `src/styles/landing.css`, `src/views/cliente.js`, `src/styles/cliente.css`, `public/verano-manada.png`, `public/verano-hidratacion.png`.
- **Qué incluye:**
  - Divisores de sección tipo olas de mar (SVG) y tarjetas con bordes orgánicos tipo manchas fluidas (`border-radius` asimétricos).
  - Banner y galería **"☀️ Ahora Verano"** con ilustraciones/fotos generadas de manada en verano e hidratación bajo la sombra.
  - Bloques destacados: **"El primer paseo es gratis"** + **Acceso directo al Portal de Clientes**.
  - Sección de **Alianzas** con llamado a contacto comercial y bloque de **Términos y Privacidad**.
  - En `/cliente`: flujo visual de **Pago con Alias → Aviso por correo al Admin → Aprobación → Elección de horario**, sección de **Cupones** canjeables y **Chat Grupal de Clientes ("La Manada")**.

---

## E-042 — Claude (JUAN 3.0): Backend de Aprobación de Pagos por Correo y Sincronización de Horarios/Cupones
- **Archivos a tocar:** `api/registros.js`, `src/api/client.js`, `src/views/admin.js`, `apps-script/Code.gs`.
- **Objetivo:**
  1. Conectar la subida del comprobante en `/cliente` con `archivos.subir("comprobante de pago", ...)` para disparar un aviso por correo electrónico a Juan (`apps-script/Code.gs` / Vercel).
  2. En `/admin`, agregar el botón **"Aprobar pago y habilitar horario"** que cambie el estado del cliente y destrabe la selección de horario real en la colección `clientes` / `solicitudes`.
  3. Sincronizar el chat grupal de clientes y los cupones con una colección compartida si Juan desea que persistan entre distintos celulares.

---

## E-043 — ChatGPT: Textos de Alianzas, Reglas de Convivencia del Chat Grupal y Términos Legales
- **Archivos a tocar:** Entrega en texto (`RETORNO E-043`) para integrar en `src/views/landing.js` y `src/views/cliente.js`.
- **Objetivo:**
  1. Redactar los textos definitivos de **Términos y Condiciones + Privacidad** en español argentino claro ("vos"), cubriendo paseos grupales, carnet de vacunas, 1.er paseo gratis de adaptación y privacidad de domicilios.
  2. Redactar 4 mensajes de bienvenida y reglas cortas para el **Chat Grupal de Clientes**.
  3. Redactar plantillas de propuestas para nuevas **Alianzas** (veterinarias, pet shops y entrenadores en Pilar y La Lonja).
