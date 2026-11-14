RETORNO E044 — GEMINI
Rama: sin verificar (sin acceso a terminal) · Commit: sin commitear (sin acceso a terminal)

1. Qué cambió (resumen en 6 puntos).
- Se ampliaron los tokens compartidos en `src/styles/base.css` con una escala de espacios más generosa, margen lateral móvil de `20px` (`--gutter-mobile`), ancho máximo de lectura (`--measure: 64ch`), interlineado base cómodo (`--line-body: 1.58`), mínimo tocable de `48px` con separación mínima de `8px`, radios orgánicos en forma de manchas/olas (`--radius-blob-*`, `--radius-btn`, `--radius-sheet`, `--radius-pill`) y bordes/sombras más blandos.
- Se aumentó el aire en todas las páginas públicas y del equipo: márgenes laterales `>= 20px` en celular (`360px`), mayor separación entre secciones, más relleno interno en tarjetas/hojas/formularios e interlineado `>= 1.5` en textos y listados.
- Se reemplazaron esquinas rectangulares y contornos duros por figuras orgánicas suaves y sombras blandas en tarjetas, cajas de aviso, advertencias, chips, botones, avatares, formularios, barras inferiores y hojas deslizables (`sheets`) en los 10 CSS editados (mantiene franjas e indicadores de seguridad visibles).
- Se elevaron a `>= 48px` botones, enlaces principales, controles de cantidad y acciones de cabecera/pie que estaban por debajo, y se aseguró `gap >= 8px` entre botones, chips, pasos, días de semana y pestañas vecinas.
- Se recalibraron márgenes negativos en barras/pies pegajosos (`.cd-picker-tools`, `.adm-sheet-foot`, `.sv-sheet-foot`) y el desplazamiento lateral de `#a11y-root` en supervisor para acompañar el nuevo margen móvil de `20px` sin desbordes ni superposiciones.
- Se preservaron las reglas existentes de modo oscuro (`html[data-theme="dark"]`), modo calmo (`html[data-motion="calm"]` con animación apagada donde corresponde) y el primer pantallazo en paseador/ayudante y supervisor sin agrandar innecesariamente sus cabeceras.

2. Cómo lo probaste.
- Revisión manual por lectura y edición directa de los 10 archivos CSS permitidos de `src/styles/` (verificando cierre limpio de bloques y sintaxis al final de los archivos editados).
- **Sin compilación, tests ni navegador ejecutados**: por instrucción explícita de no usar la terminal ni editar fuera de `src/styles/`, no se ejecutaron `npm run test:api`, `npx vite build`, comandos de `git` ni pruebas visuales en navegador.

3. Pendiente de confirmar (datos de Juan).
- Validación visual de Juan sobre el nivel de aire, redondez orgánica y contraste final en celular real (`360px` / `390px`) y escritorio, tanto en tema claro como oscuro y en modo calmo.
- No se modificaron textos ni datos de negocio (cualquier dato marcado previamente como "Pendiente de confirmar" permanece igual).

4. Qué hace falta fuera de tus archivos.
- Correr `npm run test:api` y `npx vite build` para verificar compilación CSS/Vite y suite de pruebas antes de integrar o publicar.
- Coordinar consistencia visual con `src/styles/contaduria.css` (archivo exclusivo de Claude, no leído ni tocado en esta entrega) y revisar las vistas con capturas reales según el detalle de abajo.

---

## Qué cambió por archivo

- **`src/styles/base.css`**:
  - Nuevas variables y ajuste de `:root` (`--space-2xs: 8px` hasta `--space-2xl: 72px`, `--gutter-mobile: 20px`, `--measure: 64ch`, `--line-body: 1.58`, `--touch-min: 48px`, `--touch-gap: 8px`, `--radius-blob-a`, `--radius-blob-b`, `--radius-blob-soft`, `--radius-blob-sm`, `--radius-btn`, `--radius-sheet`, `--radius-pill`), suavizado de `--line`/`--line-strong`/sombras y `body { line-height: var(--line-body); }`.
  - `.topbar` ajustada a `min(calc(100% - (var(--gutter-mobile) * 2)), 1180px)` en celular y márgenes laterales de `20px` en `@media (max-width: 760px)` / `(max-width: 680px)`.
  - Botones/enlaces de cabecera, menú, WhatsApp y accesibilidad (`.header-cta`, `.menu-button`, `.menu-close`, `.menu-nav a`, `.menu-whatsapp`, `.footer-whatsapp`, `.a11y-toggle`) a `>= 48px` con `gap: 8px` en `.menu-nav`.
  - Formas orgánicas alternadas (`--radius-blob-a` / `--radius-blob-b`) en `.panel`, `.dog-card`, `.auth-card`, `.price-card`, y actualización de `.evaluation-board`, `.compact-plan-card`, `.notice`, `.toast`, controles de formulario (`>= 48px`) y clases compartidas `.walker-*`, `.coordinator-*`, `.payments-*`, `.chat-*` (`>= 48px` y `gap >= 8px`).

- **`src/styles/landing.css`**:
  - Márgenes/rellenos laterales móviles a `var(--gutter-mobile, 20px)` en `.services-section`, `.how-section`, `.contact-section`, `.prices-strip`, `.season-banner`, `.organic-duo-section`, `.summer-section`, `.alliances-section` y `.terms-section`.
  - Bordes suavizados y radios/sombras/espaciado/interlineado actualizados en `.evaluation-submit`, `.service-card`, `.service-icon`, `.voice-button`, `.quick-more`, `.quick-submit-bar`, `.quick-optional-toggle`, `.season-banner-inner`, `.organic-splash-card`, `.summer-card`, `.alliance-blob-card`, `.terms-blob-box`, `.terms-item` y `.quick-terms-check` (`48px`).
  - Tocables a `>= 48px` (`.header-link`, `.header-link--precios` en celular, `.footer-links a` con `gap: 10px 18px`, `.mic-mini`, `.google-button`, `.link-button`, `.season-banner-link`), `.choice-group--days .choice-row` con `gap: 8px` y `repeat(4, minmax(0, 1fr))` debajo de `420px`, más desactivación explícita de animación en `html[data-motion="calm"]`.

- **`src/styles/precios.css`**:
  - Padding lateral en celular con `var(--gutter-mobile, 20px)` (`136px 28px 72px` en escritorio), `line-height >= 1.55`, `--measure` en textos, tarjetas en blob orgánico alternado, ola en `.precios-cta`, bordes y sombras suaves, separación de `12px` en la grilla de descuentos y `.precios-consultar .secondary-button` de `>= 48px`.

- **`src/styles/tienda.css`**:
  - Padding lateral en celular a `var(--gutter-mobile, 20px)` en `.tienda-bar` (incluido `<= 420px`), `.tienda-main` y `.tienda-footer`.
  - Radios orgánicos, sombras/bordes suaves, `line-height >= 1.55` y `--measure` en `.tienda-product`, `.tienda-photo`, `.tienda-health`, `.tienda-cart`, `.tienda-aviso`, `.tienda-add`, `.tienda-order`, `.tienda-qty`, `.tienda-remove` y `.tienda-logo`; altura tocable `48px` en `.tienda-home`, `.tienda-footer a`, `.tienda-qty--small button` y `.tienda-remove`.

- **`src/styles/acceso.css`**:
  - `.acc-layout` con padding lateral `var(--gutter-mobile, 20px)` en celular, `.acc-card` con forma orgánica, `--shadow` y `padding: 30px 26px`, interlineado `1.56`–`1.58`, botones/enlaces tocables (`.acc-button`, `.acc-ver`, `.acc-foot .acc-back`, `.acc-pin summary`) a `>= 48px` con `--radius-btn`, y `.acc-alert` suavizada a `--radius-blob-soft` con sombra blanda.

- **`src/styles/cliente.css`**:
  - `.dashboard.dashboard-client` en celular subido de `14px` a `var(--gutter-mobile, 20px)`, `.cl-page` con `gap: 24px` y `line-height: 1.58`, `.cl-btn.is-small` subido de `44px` a `48px`, `.cl-day-chips` y `.cl-steps` en celular con `gap: 8px`, `.cl-today-line` con `line-height: 1.56`, y radios orgánicos con bordes/sombras suaves en tarjetas, alertas, avisos, acordeones (`.cl-more`, `.cl-details`, `.cl-group`), filas, tarjetas de plan, carga de archivos, circuito de pagos, tarjetas de cupón y chat comunitario.

- **`src/styles/paseador.css`** (vistas de paseador y ayudante):
  - En `.pw-shell`: `--pw-shadow` suavizada en tema claro y oscuro, y `line-height` subido de `1.4` a `1.5`.
  - En `.pw-header`, `.pw-main` y `.pw-toast-slot`: margen lateral de `var(--gutter-mobile, 20px)` cuidando el alto compacto de la barra superior y el primer pantallazo; `.pw-screen` con `gap: 16px`.
  - `.pw-head-chip` y `.pw-head-out` subidos de `44px` a `var(--touch-min, 48px)`, eliminado el margen negativo `-9px` en `.pw-link` (`padding: 6px 0`), y `gap >= 8px` en `.pw-chips`, `.pw-steps`, `.pw-stepper`, `.pw-days` (incluido `@media (max-width: 479px)`), `.pw-help li:first-child` y `.pw-tabbar`.
  - Radios orgánicos, bordes/sombras suaves e interlineado `1.5`–`1.55` en botones, chips, tiras de alerta (`.pw-strip` manteniendo la franja lateral de seguridad), avisos, avatares con foto, héroe, filas/desplegables, hoja inferior (`.pw-sheet`), toast, tabs, campos, tarjetas del ayudante/manada, rutas y bloque `@media (min-width: 760px)`.

- **`src/styles/supervisor.css`**:
  - En `.sv-shell`: suavizado de `--sv-line`, `--sv-line-strong` y `--sv-shadow` (claro y oscuro), y `line-height` subido de `1.4` a `1.5`.
  - Margen lateral de `var(--gutter-mobile, 20px)` en `.sv-main`, `.sv-empty-box`, `.sv-toast-zone`, `.sv-sheet`, `.sv-sheet-foot` y `body:has(.sv-shell) #a11y-root` (antes `16px`).
  - `gap >= 8px` en `.sv-segment`, `.sv-chips` y `.sv-nav`; mayor aire entre `.sv-row`, `.sv-alerts`, `.sv-tiles`, `.sv-dogs`, `.sv-requests`, `.sv-warnings`, `.sv-categories`, `.sv-menu` y `.sv-form`; `max-width: var(--measure, 64ch)` en `.sv-plain-list`; radios orgánicos y `line-height >= 1.5` en tarjetas, advertencias/alertas (preservando `.is-danger` y franjas), paradas, solicitudes, formularios, navegación inferior y `.sv-sheet` en móvil y desktop.

- **`src/styles/coordinador.css`**:
  - En `.coord-shell`: `--c-line`, `--c-line-strong` y `--c-shadow` suavizados (claro y oscuro), `--radius` pasado de `18px` a `var(--radius-blob-a, 28px 22px 32px 24px)`, y `line-height` subido de `1.4` a `1.5`.
  - Margen lateral `var(--gutter-mobile, 20px)` en `.coord-header`, `.coord-main`, `.cd-savebar`, `.cd-toast` y `.cd-picker-tools` (`margin: 0 calc(var(--gutter-mobile, 20px) * -1); padding: 8px var(--gutter-mobile, 20px) 10px;`).
  - `.cd-toast-x` subida de `44px` a `48px`; `gap >= 8px` en `.coord-header-actions`, `.cd-chips`, `.cd-thumbs`, `.cd-tabbar`, `.cd-switch`, `.cd-seg`, `.cd-minis`, `.cd-pick-grid`, `.cd-dog-grid` y `.cd-warns`.
  - Radios orgánicos, bordes suaves, `max-width: var(--measure, 64ch)` en `.cd-form` e interlineado `>= 1.5` en botones, avatares, tarjetas, notas, advertencias, acordeones, barras fijas, toasts, rutas semanales, paradas, selector de perros, formularios, alertas en línea, cargas de archivo y vista `@media (min-width: 720px)`.

- **`src/styles/admin.css`**:
  - En `.adm-shell`: `--adm-line`, `--adm-line-strong` y `--adm-shadow` suavizados (claro y oscuro), `--adm-radius` pasado de `18px` a `var(--radius-blob-a, 28px 22px 32px 24px)`, y `line-height` subido de `1.4` a `1.5`.
  - Margen lateral `var(--gutter-mobile, 20px)` en `.adm-header`, `.adm-offline`, `.adm-page`, `.adm-undo`, `.adm-sheet-head`, `.adm-sheet-body` y `.adm-sheet-foot` (`margin: 0 calc(var(--gutter-mobile, 20px) * -1); padding: 14px var(--gutter-mobile, 20px) calc(14px + var(--adm-safe-bottom));`).
  - `.adm-btn--undo` subida de `44px` a `var(--touch-min, 48px)`, quitado margen negativo `-6px` en `.adm-prio-head .adm-help`, y `gap >= 8px` en `.adm-header-actions`, `.adm-foot`, `.adm-chips`, `.adm-list--tight` y `.adm-nav`.
  - Radios orgánicos, sombras/bordes suaves, `max-width: var(--measure, 64ch)` en `.adm-help-body` e interlineado `>= 1.5` en tarjetas, avisos, botones, prioridades, resúmenes, cruces, avatares, desplegables, filas, rutas, barra inferior, deshacer, hoja modal y su pie (`border-radius: 0 0 32px 24px` desde `720px`), inputs, opciones, formularios en línea, usuarios, roles, pagos, mosaicos, fotos, tablas y facturas.

---

## Qué NO pude hacer

- **Compilar, correr tests ni revisar estado de git**: por la restricción de no usar la terminal, no se corrieron `npx vite build`, `npm run test:api`, `node scripts/seed-dev.mjs` ni `git status`/`git diff`/`git commit`.
- **Inspección visual en navegador real**: no se levantó `npx vite` ni se probaron anchos reales (`360px`, escritorio), estados dinámicos (hojas abiertas, toasts, desplegables, validaciones), modo oscuro ni modo calmo en pantalla.
- **Tocar archivos fuera de los 10 CSS permitidos**: no se leyeron ni modificaron archivos `.js`, `api/`, `public/`, `src/styles.css` ni `src/styles/contaduria.css` (en desarrollo paralelo por Claude). Tampoco se pudo verificar si algún elemento interno sin clase CSS dedicada en los `.js` hereda o sobreescribe estilos desde JS.

---

## Qué habría que revisar con capturas

Probar con `npx vite` en **`360px` de ancho (celular)** y **escritorio (`>= 1200px`)**, recorriendo **tema claro**, **`html[data-theme="dark"]`** y **`html[data-motion="calm"]`**, verificando puntualmente:

1. **Inicio (`/`) y Evaluación rápida**: aire entre secciones y tarjetas en `360px`, que los 7 días de `.choice-row` en `repeat(4, minmax(0, 1fr))` debajo de `420px` no corten texto ni tengan scroll horizontal, contraste del formulario/aviso y que en `html[data-motion="calm"]` no queden animaciones activas.
2. **Precios (`/precios`), Tienda (`/tienda`) y Acceso (`/acceso`)**: margen lateral de `20px` consistente en `360px`, tarjetas orgánicas sin recorte de texto ni superposición de sombras en los bordes, carrito/controles de cantidad `48px` sin apretujarse y pantalla de acceso centrada en claro/oscuro.
3. **Cliente (`/cliente` / dashboard cliente)**: margen lateral de `20px` en `360px`, espaciado de chips de días, pasos del paseo, acordeones, tarjetas de cupón, subida de comprobantes y chat.
4. **Paseador y Ayudante (`/paseador`)**:
   - **Primer pantallazo en `360px`**: que la acción principal del turno y las alertas/bozal/"no juntar" sigan viéndose de entrada sin quedar tapadas por la cabecera ni empujadas por el nuevo padding.
   - **Barra inferior (`.pw-tabbar`), chips de día (`.pw-days` bajo `480px`), hoja deslizable (`.pw-sheet`) y toast**: verificar que con `gap >= 8px` y margen de `20px` ningún rótulo se parta feo ni genere desborde horizontal.
5. **Supervisor (`/supervisor`)**:
   - **Primer pantallazo y cabecera en `360px`**: verificar que `#a11y-toggle` (desplazado con `var(--gutter-mobile, 20px)`) no se encime con `.sv-logout-btn`, y que mosaicos superiores + alertas sigan visibles arriba.
   - **Hoja inferior (`.sv-sheet` y `.sv-sheet-foot`) y advertencias `.is-danger`**: verificar bordes limpios y buen contraste en claro y oscuro.
6. **Coordinador (`/coordinador`)**:
   - **`.cd-picker-tools` con margen negativo compensado en `360px`**: confirmar que no genere scroll horizontal ni corte de sombra/borde.
   - **Botones segmentados (`.cd-seg`, `.cd-switch`), grilla de perros (`.cd-dog-grid`), horarios (`input.cd-hora`) y barras fijas (`.cd-tabbar`, `.cd-savebar`)** en `360px` y desktop.
7. **Admin (`/admin`)**:
   - **`.adm-sheet-foot` dentro de `.adm-sheet-panel`** en móvil (`360px`, sin scroll horizontal por margen negativo) y en desktop (`>= 720px`, `border-radius: 0 0 32px 24px`).
   - **Tablas (`.adm-table-wrap`), filas de pagos/facturación, controles de monto y botón deshacer (`.adm-btn--undo`)**: confirmar contraste AA en tema oscuro y legibilidad sin amontonamiento.
8. **Consistencia global con Contaduría (`src/styles/contaduria.css`)**: verificar visualmente que las tarjetas, márgenes y radios orgánicos de Contaduría (a cargo de Claude) queden alineados con los tokens definidos en `base.css`.
