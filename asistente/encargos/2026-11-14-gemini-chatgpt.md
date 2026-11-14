# Encargos para Gemini y ChatGPT — 14/11/2026

Juan: pegá cada bloque en la IA que corresponde (en VS Code o en su chat). Cada una trabaja en su propia rama y devuelve un RETORNO. Claude (JUAN 3.0) revisa y une.

Antes de empezar, las dos: leé `AGENTS.md`, `asistente/PLAN-MAESTRO.md` y `asistente/AVANCES.md`, y partí de la rama `claude/quirky-shannon-ih7yx1` actualizada (`git pull`).

---

## E-050 — GEMINI: auditoría visual con capturas de lo nuevo

```
Sos Gemini en el proyecto Paseos Juan. Tarea E-050: auditoría visual con capturas.
Rama: gemini/e050-auditoria. No toques api/ ni tests/.

1. Corré la app: npm install, npx vite --port 4173. Creá el admin local:
   curl -X POST localhost:4173/api/auth/setup -H 'content-type: application/json' -d '{"nombre":"Prueba","usuario":"juan","pin":"482915"}'
2. Sacá capturas en 360 x 780 (claro, oscuro y modo calmo) de:
   /tienda (sección "Importados — próximamente"), /cliente, /manual, /mensajes, /supervisor, /paseador, /admin.
3. Para cada pantalla anotá: qué tapa a qué, qué texto sobra, qué botón es chico (menos de 48 px),
   qué palabra está abreviada (Juan pidió todo escrito completo), qué contraste es bajo.
4. Proponé como máximo 5 arreglos por pantalla, de mayor a menor impacto.
   Si el arreglo es solo CSS de UN archivo, hacelo vos y probalo. Si toca lógica, solo anotalo.
5. No inventes datos (precios, servicios, personas). Lo que falta: "Pendiente de confirmar".

Entregá con este formato:
RETORNO E-050 — GEMINI
Rama: <nombre> · Commit: <hash>
1. Qué cambió (máximo 6 puntos).
2. Cómo lo probaste (rutas de las capturas).
3. Pendiente de confirmar (datos de Juan).
4. Qué hace falta fuera de tus archivos.
```

## E-051 — GEMINI: ilustraciones vectoriales para el manual y las estaciones

```
Sos Gemini en el proyecto Paseos Juan. Tarea E-051: ilustraciones vectoriales.
Rama: gemini/e051-ilustraciones. Solo archivos SVG en public/ilustraciones/ y, si hace falta, src/styles/manual.css.

1. Mirá /manual (historias por rol: cliente, paseador, ayudante, supervisor, coordinador, administrador).
2. Dibujá en SVG plano (2 o 3 colores: #015f3d, #5cc497, beige #f7f5ef, tinta #0f1f13),
   livianos (menos de 8 KB cada uno), con title en español:
   - el paseador con la PECHERA y la manada en grupo;
   - el ayudante con la MUSLERA, la botella bebedero y el botiquín;
   - el supervisor mirando el tablero en el celular;
   - el coordinador armando rutas en un mapa simple (sin calles reales);
   - el cliente recibiendo el aviso "Entregamos a tu perro" en el celular.
3. Otoño, invierno y primavera para la portada (ya existe verano): mismas reglas.
4. Rotulá todo como ilustración. No uses fotos reales ni caras reconocibles.

Entregá con el formato RETORNO (ver PLAN-MAESTRO punto 5).
```

---

## E-052 — CHATGPT: términos y privacidad (borrador, P-05)

```
Sos ChatGPT en el proyecto Paseos Juan. Tarea E-052: borrador de Términos y Política de privacidad.
Rama: gpt/e052-terminos. Solo un archivo nuevo: docs/borrador-terminos-privacidad.md

Contexto confirmado: paseos solo GRUPALES de perros en Pilar y La Lonja (Argentina);
primer paseo gratis; el pago lo confirma solo el administrador (transferencia con alias);
la app guarda fotos del paseo, horarios de retiro y entrega, y avisos al tutor;
el tutor entra con un enlace personal; hay chat entre el tutor y el coordinador y una comunidad de clientes con moderación.
Ley argentina de protección de datos personales 25.326. Botón de arrepentimiento si hay venta online.

Reglas: español argentino con "vos", frases cortas, títulos claros, nada inventado
(si falta un dato: "Pendiente de confirmar"). Marcá arriba: "BORRADOR: revisar con un profesional antes de publicar".

Entregá con el formato RETORNO (ver PLAN-MAESTRO punto 5).
```

## E-053 — CHATGPT: textos cortos para avisos y WhatsApp

```
Sos ChatGPT en el proyecto Paseos Juan. Tarea E-053: textos cortos.
Rama: gpt/e053-textos. Solo un archivo nuevo: docs/textos-avisos.md

Escribí 3 versiones (máximo 15 palabras cada una, cálidas y profesionales, sin emojis de más) para:
1. Aviso automático "Retiramos a <perro> · <hora>".
2. "<perro> está paseando" (con foto).
3. "Entregamos a <perro> · <hora>".
4. Mensaje de bienvenida con el enlace personal del cliente.
5. Recordatorio de pago (lo manda solo el administrador).
6. Aviso de lluvia o calor: el paseo cambia de horario.
7. Respuesta a "mi perro no sale hoy".
Reglas: español argentino con "vos", palabras completas (nada de "hs", "min"), sin prometer cosas no confirmadas.

Entregá con el formato RETORNO.
```
