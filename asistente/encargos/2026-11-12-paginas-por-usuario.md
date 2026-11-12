# Encargos E-005 a E-009 — Mejorar cada página de usuario

Pedido de Juan (12/11/2026): mejorar la app punta a punta, una página por usuario, con datos más reales, y con la opción de modo oscuro y modo calmo (sin animaciones) para personas con epilepsia fotosensible.

Coordina: JUAN 3.0. Cada encargo lo hace una IA distinta, en paralelo, cada una en su propia copia del repositorio. JUAN 3.0 junta todo, prueba y guarda.

| N° | Página | Usuario real | Archivos |
|---|---|---|---|
| E-005 | Cliente (`/cliente`) | Tutor (ejemplo) | `src/views/cliente.js`, `src/styles/cliente.css` |
| E-006 | Paseador (`/paseador`) | Sebastián | `src/views/paseador.js`, `src/styles/paseador.css` |
| E-007 | Supervisor (`/supervisor`) | Juan (mañana) y Nicolás (tarde) | `src/views/supervisor.js`, `src/styles/supervisor.css` |
| E-008 | Coordinador (`/coordinador`) | Juan (pendiente de confirmar) | `src/views/coordinador.js`, `src/styles/coordinador.css` |
| E-009 | Admin (`/admin`) | Juan Buitrago | `src/views/admin.js`, `src/styles/admin.css` |

---

## Instrucciones comunes (van en todos los encargos)

Trabajás en la app web de **Paseos Juan**, un servicio de paseos y bienestar canino en Pilar y La Lonja (Argentina). Es una SPA en JavaScript puro con Vite. Cada rol tiene su página. Vos te encargás de UNA sola página.

### Qué podés tocar
- Solo tus dos archivos: `src/views/<rol>.js` y `src/styles/<rol>.css`.
- Podés leer todo lo demás. Datos reales en `src/data/realData.js` (importalos desde ahí). Componentes compartidos en `src/ui/shared.js`. Datos de ejemplo viejos en `src/data/mock.js`: podés dejar de usarlos, pero no los borres de ese archivo.
- Si necesitás un dato real que no está en `realData.js`, NO lo inventes: mostrá "Pendiente de confirmar" o un estado vacío claro, y anotalo en tu informe.

### Reglas de Paseos Juan (obligatorias)
1. Todo el texto en español argentino, con "vos", claro y profesional. Nada en inglés.
2. **No inventar datos**: ni precios, ni montos cobrados, ni clientes, ni teléfonos, ni horarios. Si una pantalla necesita un número que no existe, mostrás de dónde sale (por ejemplo "Fuente oficial: Libro contable") o "Pendiente de confirmar".
3. **Privacidad**: nada de nombres de tutores, teléfonos, domicilios, datos médicos, alias o datos de pago en el código. Lo que el usuario carga en pantalla se guarda solo en su dispositivo (localStorage).
4. **Equipo**: nombrá solo a Juan Buitrago, Sebastián, Mateo Pérez y Nicolás (supervisor). Para otros paseadores usá "Paseador asignado".
5. **Seguridad primero**: alertas de seguridad (bozal, "no juntar con…") siempre visibles y destacadas, nunca escondidas.
6. **Conducta**: describí conductas observables. Prohibido "agresivo", "malo", "dominante". Categorías operativas: VERDE, AMARILLO, ROJO, SIN EVALUAR, siempre con motivo, fecha y fuente. Hoy todos los perros están SIN EVALUAR (registro maestro del 14/08/2026).
7. **TDAH**: cada pantalla arranca por lo más importante del día. Máximo 3 prioridades visibles arriba. Botones grandes y claros.

### Calidad
- Mobile first: tiene que verse perfecto a 390 px de ancho y a 1440 px, sin scroll horizontal.
- **Modo oscuro**: la página tiene que verse bien con `html[data-theme="dark"]` (contraste mínimo 4.5:1 en texto). Usá los tokens (`--ink`, `--text`, `--bone`, `--green`, `--line`, `--card`, `--field`, `--white`) y agregá en tu CSS las reglas `html[data-theme="dark"] ...` que tu página necesite (hay muchos colores fijos heredados: revisalos).
- **Modo calmo**: con `html[data-motion="calm"]` no se mueve nada (ya está resuelto globalmente). Vos no agregues nada que parpadee ni destelle.
- Accesibilidad: cada campo con su `<label>`, foco visible, botones con texto claro, `aria-live` en mensajes de estado.
- Cero errores en la consola.

### Cómo probar
- `node_modules` vino de macOS. Para levantar Vite: `V=$(node -p "require('./node_modules/rolldown/package.json').version"); npm i --no-save "@rolldown/binding-linux-x64-gnu@$V"`. Nunca commitees nada de `node_modules`.
- Levantá Vite en tu puerto asignado, sacá capturas con Playwright (preinstalado) en claro y oscuro (`localStorage.setItem("paseosJuan_accesibilidad", JSON.stringify({theme:"oscuro"}))` y recargar), a 390x844 y 1440x900. Miralas y corregí lo que se vea mal.
- Probá cada botón de tu página. `npx vite build` tiene que compilar.

### Entrega
- Commit solo de tus dos archivos (`git add src/views/<rol>.js src/styles/<rol>.css`), mensaje en español, sin push.
- Informe corto: qué cambió (máximo 6 puntos), qué datos quedaron "Pendiente de confirmar", y cualquier problema que viste fuera de tus archivos.

---

## E-005 — Página del cliente

Usuario: el tutor de un perro. Es la cara del servicio: tiene que transmitir confianza, calma y cuidado ("Cuidado y confianza como en casa").

1. Arriba: el estado de hoy de su perro (si sale hoy, en qué turno, estado del paseo) y su próximo paseo, calculado con los días y turnos del plan.
2. Su plan con los precios oficiales (`REAL_PLANS`) y los días contratados. Para la demo usá un perro de ejemplo llamado "Tu perro" con un plan real; no uses perros reales en esta página.
3. Ficha de su perro con los campos oficiales (identificación, salud, equipo, comportamiento, contacto de emergencia), en "Pendiente de confirmar" y editable por el tutor, guardado solo en su dispositivo.
4. Acciones rápidas: avisar una ausencia, subir carnet de vacunas, hablar por WhatsApp (`BUSINESS_INFO.whatsapp`), ver la promo si está vigente.
5. Pagos: sin alias ni montos inventados. "El alias y el detalle de pago te los enviamos por WhatsApp." Puede subir su comprobante.
6. Un bloque visible que explique la opción de accesibilidad (modo oscuro y modo calmo) con un botón que abra el panel (`document.querySelector(".a11y-toggle").click()`).

## E-006 — Página del paseador (Sebastián)

Usuario: Sebastián, en la calle, con el celular en una mano y las correas en la otra. Todo grande y rápido.

1. Arriba: "Hoy", día y turno actual, y la lista REAL de perros de ese día y turno (`dogsForShift(todayName(), "Mañana"|"Tarde")`), ordenada por hora si hay, con selector para cambiar de día y turno.
2. Alertas de seguridad de cada perro en grande (bozal, "no juntar con…"), y aviso automático si en la lista del turno hay dos perros incompatibles (`incompatibleWith`).
3. Checklist antes de salir con el equipo real que tiene Sebastián (`EQUIPMENT`, columna `sebastian`).
4. Progreso del paseo por perro (retiro, paseo, entrega) guardado en el dispositivo.
5. Reporte de incidente con el protocolo real (`INCIDENT_PROTOCOL`) y campos de conducta observable: antes, conducta, qué hizo, después, nivel de riesgo. Genera el texto listo para mandar por WhatsApp a Juan.
6. Nada de datos personales de tutores.

## E-007 — Página del supervisor (Juan mañana, Nicolás tarde)

Usuario: quien controla el turno y la seguridad del grupo.

1. Panel del turno: rutas reales del día (mañana PJ_1M; tarde PJ_1T y PJ_2T), cantidad de perros por turno, paseador asignado ("Paseador asignado" salvo Sebastián) y supervisor real (`SHIFTS`).
2. Detector de riesgos: perros incompatibles en el mismo turno, perros con bozal, perros con datos a revisar (`review`), perros SIN EVALUAR que salen en grupo.
3. Armado de ruta con perros reales: al elegir perros avisa incompatibilidades y tamaños mezclados, y no deja guardar una ruta con un conflicto sin una confirmación explícita.
4. Control de retiro y entrega, y cierre del turno con resumen copiable.
5. Registro de observaciones de conducta (formato observable, con fecha, lugar, estímulo, reacción, acción y resultado).

## E-008 — Página del coordinador

Usuario: quien da de alta perros, ordena datos y atiende pedidos. Hoy lo hace Juan (pendiente de confirmar).

1. Arriba: "Datos a confirmar": la lista real de perros con `review` o con estado distinto de Activo, con qué hay que confirmar y botón para marcarlo como resuelto (guardado local).
2. Alta de perro nuevo con la ficha oficial completa. Todo perro nuevo arranca SIN EVALUAR y con primer paseo individual (mostralo como regla).
3. Pedidos de clientes y evaluaciones: tablero simple (nuevo, en curso, resuelto). Sin pedidos inventados con nombres: estado vacío claro y posibilidad de cargar.
4. Pagos: quitá el alias y los clientes inventados. Explicá que la fuente oficial es el Libro contable del Sistema de Gestión y la hoja Cobranza semanal; dejá la carga de un pago como registro local de apoyo.
5. Resumen de carga por día y turno calculado con los datos reales.

## E-009 — Página del admin (Juan Buitrago)

Usuario: Juan, fundador. Ve el negocio completo y decide.

1. Arriba: máximo 3 prioridades calculadas de los datos reales (por ejemplo: datos inconsistentes a revisar, perros sin evaluar, días con más carga).
2. Indicadores con `BUSINESS_FACTS`, cada uno marcado como dato, dato histórico o meta, con su fuente.
3. Carga semanal real: perros por día y turno (tabla o gráfico simple accesible, calculado de `REAL_DOGS`).
4. Equipo real (`TEAM`) con sus funciones, y permisos por rol.
5. Planes y precios oficiales (`REAL_PLANS`, `REAL_SINGLE_WALK`, `MULTI_DOG_DISCOUNTS`).
6. Finanzas: sin montos inventados. "Fuente oficial: Libro contable". Podés mostrar la facturación teórica semanal de la tabla de planes SOLO si la calculás y la rotulás claramente como teórica, sin descuentos.
