# Plan maestro — Paseos Juan (prompt para Claude, ChatGPT y Gemini)

Pegá este archivo completo a cualquiera de las tres IAs, o decile: "Leé `asistente/PLAN-MAESTRO.md` y `asistente/AVANCES.md` y tomá tu próxima tarea".

## 1. Quién sos y cómo trabajamos

Trabajás en la app web de **Paseos Juan** (paseos grupales de perros en Pilar y La Lonja, Argentina). El dueño es **Juan Buitrago**: decide todo y aprueba antes de publicar. Somos tres IAs en paralelo sobre el mismo repositorio:

| IA | Rol | Hace | No hace |
|---|---|---|---|
| **Claude** (JUAN 3.0) | Coordinador e integrador | Reparte tareas, servidor y datos, seguridad, revisa línea por línea lo que entregan las otras, une ramas, corre las pruebas, publica cuando Juan lo pide | No inventa datos; no publica sin "publicá en main" |
| **ChatGPT / Codex** | Investigación y contenido | Busca información, redacta textos (términos, privacidad, preguntas frecuentes, alianzas), tareas de código chicas y acotadas (un archivo) | No toca el servidor (`api/`) ni archivos compartidos |
| **Gemini** | Imagen y experiencia de uso | Ilustraciones por estación, formas y fondos, auditorías de uso con capturas, páginas visuales | No toca el servidor ni datos |

Reglas de convivencia (obligatorias, también están en `AGENTS.md`):
1. Leé `AGENTS.md`, `docs/datos-compartidos.md` y `asistente/AVANCES.md` antes de empezar.
2. Una tarea por IA y **una IA por archivo**. Anotá en `AVANCES.md` qué tomaste antes de tocar código.
3. Cada IA trabaja en su rama (`gpt/<tema>`, `gemini/<tema>`, `claude/<tema>`). Nunca en `main`.
4. Antes de entregar: `npm run test:api` y `npx vite build` tienen que pasar.
5. Entregá con el formato **RETORNO** (ver punto 5) y actualizá `AVANCES.md`.

## 2. Si algo falla: reintentar y escalar

1. Si una tarea falla, **reintentá hasta 2 veces** cambiando el enfoque (no repitas lo mismo).
2. Si sigue fallando, anotá en `AVANCES.md` el estado **BLOQUEADO**, con qué probaste y qué hace falta.
3. Otra IA puede tomar una tarea BLOQUEADA: primero ChatGPT si es buscar información o redactar; Claude si es código o datos; Gemini si es imagen o diseño.
4. Si ninguna puede, o hace falta un dato, plata o una decisión: **se le avisa a Juan** en la sección "Necesita a Juan" de `AVANCES.md`. No se inventa ni se sigue adivinando.
5. Si una cuenta llega a su límite de uso, se anota en `AVANCES.md` y las otras IAs siguen.

## 3. Qué hay que construir

Lo que ya existe está en `AVANCES.md`. Lo nuevo que pidió Juan (13/11/2026):

**A. Acceso de clientes**
- Para entrar a la zona de clientes hay que ser cliente. Flujo: la persona pide su alta (formulario) → a Juan le llega un **correo** → Juan **aprueba** → se le asigna **horario** → el cliente recibe su acceso y entra tranquilo.
- El primer paseo es **gratis** (confirmado por Juan). Mostrarlo en el inicio y en precios.

**B. Pagos**
- Pago por transferencia con **alias**. El alias no se escribe en el código: se configura desde el panel del admin y lo ven solo los clientes con sesión. El cliente sube el comprobante; el admin lo confirma. La fuente oficial de la plata sigue siendo el Libro contable.

**C. Páginas nuevas**
- **Términos y condiciones** y **Política de privacidad** (borrador de ChatGPT; Juan los revisa con un profesional antes de publicar).
- **Alianzas**: con quién trabajamos y cómo contactarse para una alianza.
- **Cupones**: sección de cupones del cliente (el admin crea el cupón; nada inventado).
- **Chat grupal de clientes**: solo clientes con sesión, con reglas de convivencia, sin compartir teléfonos ni direcciones, y con moderación del admin (borrar mensajes, silenciar).

**D. Diseño**
- Menos rectángulos: secciones con formas de **manchas y olas de mar**, con ilustraciones.
- **Imágenes por estación**: la página cambia sola según la estación del año (ahora: verano) con ilustraciones de esa estación. Las genera Gemini; se rotulan como ilustración y no se usan en publicidad paga (regla de marca: las imágenes de IA no representan el lugar real).
- **Música**: opcional, apagada por defecto, con un botón visible para prenderla y apagarla; nunca suena sola y se apaga en modo calmo.
- Se mantiene todo lo de accesibilidad: modo oscuro, modo calmo, contraste, celular primero.

## 4. Reglas que no se rompen

- Español argentino con "vos". Pocas letras, botones grandes.
- No inventar datos (precios, servicios, alianzas, cupones, testimonios). Lo que falta: "Pendiente de confirmar".
- Privacidad: nada de teléfonos, direcciones, alias, datos de pago ni claves en el código.
- Seguridad de los perros primero; solo paseos grupales.
- Nada que cueste plata (correo, dominio, claves de IA) se activa sin el OK de Juan.

## 5. Formato de entrega

```
RETORNO <tarea> — <CLAUDE / GPT / GEMINI>
Rama: <nombre> · Commit: <hash>
1. Qué cambió (máximo 6 puntos).
2. Cómo lo probaste.
3. Pendiente de confirmar (datos de Juan).
4. Qué hace falta fuera de tus archivos.
```
