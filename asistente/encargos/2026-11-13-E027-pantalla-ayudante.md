# E-027 — Pantalla del ayudante de paseador según sus tareas reales

Se lanza cuando termine el rediseño para celular (E-022 a E-025). Archivos: `src/views/paseador.js` y `src/styles/paseador.css` (modo ayudante: `session.user().rol === "ayudante"`).

Tareas definidas por Juan (ver `docs/datos-compartidos.md`, "Tareas del ayudante de paseador"). La pantalla del ayudante tiene que ser botones grandes, con foto de cada perro y casi sin texto:

1. **Integrar**: perros que el paseador marcó "retirado" y todavía no están integrados aparecen arriba con foto y botón "Integrado" (guarda en `paseos` del mismo id: `horaIntegrado`, `horaIntegradoPor`, `horaIntegradoPorNombre`). Una línea de ayuda: "Que se olfateen y caminá la primera cuadra con él".
2. **Devolver (máx. 2)**: el ayudante elige hasta 2 perros tocando sus fotos (no deja elegir un tercero: "Máximo 2 a la vez") → "Voy a entregar" → en cada uno "Entregado" (mismos campos de entrega de `paseos`). El paseador ve "Lo entrega <ayudante>".
3. **Agua**: botón grande "Di agua" que guarda la hora en el checklist del ayudante del día (`checklists`, id `AAAA-MM-DD_usuario_turno`, campo `aguas: ["15:20", ...]`) y muestra "Última agua: 15:20". Con calor, recordatorio suave si pasó más de 40 minutos.
4. **Botiquín**: botón "Curación" → elegir el perro (fotos) → chips (Raspón · Corte chico · Pata · Otro) → "Agua oxigenada y gasa" ✓ → "Listo" (guarda en `incidentes` con `riesgo: "bajo"`, `tipo: "curación leve"`). Botón rojo "Es más grave" → abre el incidente completo + WhatsApp a Juan.
5. **Se cruza otra manada**: botón que muestra en grande, 2 líneas: "Dividan los perros y pasen de a grupos" / "Calmá a los que se alteran", con "Avisar al paseador" (WhatsApp sin datos de tutores) opcional.
6. **Checklist corto antes de salir**: 4 interruptores grandes: Botiquín (agua oxigenada y gasa) · Botella bebedero · Bolsas · Celular cargado → "Listo".
7. Levantar caca no se registra.

Del lado del paseador: ver en cada perro "Integrado por <ayudante>" y "Lo entrega <ayudante>", y la última hora de agua del grupo.

Probar con dos usuarios (sebastian paseador, ayudante1 ayudante): sebastian retira → ayudante integra → ayudante devuelve 2 (no deja 3) → sebastian ve los cambios. Claro/oscuro, 390 y 1440 px.

## Agregado (pedido de Juan): el paseo se marca con una FOTO

En la pantalla del paseador y del ayudante, el paso "En paseo" deja de ser un botón: es un botón de cámara **"Foto del paseo"** (input `type="file" accept="image/*" capture="environment"`) que llama a `fotosPaseo.sacar(paseo, file)` de `src/api/client.js` (ver docs/datos-compartidos.md, "Foto del paseo"). Al sacarla, el perro pasa a "En paseo" y su tarjeta muestra la foto chiquita. Sin señal: igual se marca, con un ícono "foto por subir" y la cantidad de `fotosPaseo.pendientes()` en la barra de "Sin señal". El supervisor y el admin ven en cada perro la foto del paseo (abrirla con `archivos.abrir(fotoPaseoId)`).
