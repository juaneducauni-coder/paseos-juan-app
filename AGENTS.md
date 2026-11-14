# Instrucciones para IAs que trabajan en este repositorio

Este archivo lo leen ChatGPT/Codex, Gemini y cualquier otra IA de código. Claude lee `CLAUDE.md`, que tiene las mismas reglas. Si hay diferencias, mandan las de este archivo para el código y las de `CLAUDE.md` para la comunicación con Juan.

## Qué es
App web de **Paseos Juan** (paseos **grupales** de perros en Pilar y La Lonja, Argentina). Dueño: **Juan Buitrago** (decide todo). La coordinación entre IAs la hace **JUAN 3.0** (Claude), que revisa, une y publica.

- Página pública: inicio (servicios, sin precios), `/precios`, `/tienda`, formulario de evaluación.
- Páginas del equipo (usuario y PIN, o Google): `/admin`, `/coordinador`, `/supervisor`, `/paseador` (también para el ayudante).
- Servidor: funciones de Vercel en `api/`. Datos en Google Sheets (vía `apps-script/Code.gs`) o, provisorio, Vercel Blob.
- **Límite de Vercel (plan gratis): como máximo 12 funciones en `api/`.** No sumes archivos nuevos en `api/`: agregá la acción dentro de una función que ya existe (ver `api/auth.js` y `api/_rutas/`). Una prueba (`npm run test:api`) falla si se pasa el límite.
- Contrato de datos, roles y permisos: **`docs/datos-compartidos.md`** (leelo antes de tocar nada).
- Datos reales de perros, rutas y horarios: `src/data/realData.js`.

## Roles (definidos por Juan)
- **Admin** (Juan): todo, incluida la plata.
- **Coordinador**: arma rutas y horarios, clientes y avisos por barrio. **No ve plata.**
- **Supervisor**: controla que se cumplan los paseos del momento; si hay que cambiar algo, le **pide** el cambio al coordinador.
- **Paseador**: hace su ruta; el paseo se marca con una **foto**.
- **Ayudante de paseador**: integra perros nuevos a la manada, devuelve perros (máximo 2 a la vez), botiquín, agua, caca, prevenir accidentes. Checklist corto.

## Reglas que no se rompen
1. Todo texto visible en **español argentino**, con "vos". Pocas letras, botones grandes, pensado para celular (390 px, una mano).
2. **No inventar datos** (precios, horarios, productos, instalaciones, servicios). Lo que falta: "Pendiente de confirmar".
3. **Privacidad**: nunca guardar en el código teléfonos, direcciones, datos de pago, información médica ni claves. Nunca subir `.env`, `.data/` ni secretos.
4. **Seguridad de los perros primero**: alertas de bozal y "no juntar" siempre visibles. Nada de etiquetas como "agresivo", "malo" o "dominante": se describe la conducta.
5. Solo hay paseos **grupales**.
6. Modo oscuro (`html[data-theme="dark"]`) y modo calmo (`html[data-motion="calm"]`) tienen que seguir funcionando. Contraste 4.5:1.

## Cómo trabajar sin pisarse (importante)
- **Nunca trabajes directo en `main`** ni hagas push a `main`. Publicar es decisión de Juan.
- Cada IA usa **su propia rama** a partir de la rama de trabajo actual (`claude/quirky-shannon-ih7yx1`, o la que indique JUAN 3.0):
  - ChatGPT/Codex: `gpt/<tema-corto>`
  - Gemini: `gemini/<tema-corto>`
- Tocá **solo los archivos de tu encargo**. Si necesitás cambiar algo compartido (`src/api/client.js`, `api/`, `src/ui/shared.js`, `docs/`), describilo en tu RETORNO en vez de cambiarlo.
- Antes de terminar, corré:
  ```bash
  npm install
  npm run test:api
  npx vite build
  ```
  y probá en el navegador con `node scripts/seed-dev.mjs` (crea usuarios locales con PIN 482915: juan, coordina, nicolas, sebastian, mateo) y `npx vite` (app + servidor juntos, datos en `.data/`).
- Si el build cambia `dist/`, no lo subas (lo regenera JUAN 3.0): `git checkout -- dist`.
- Commits en español, chicos y claros.

## Encargos
Los encargos están en `asistente/encargos/`. Cada uno dice qué hacer, qué archivos tocar y cómo probar. Si no te asignaron uno, preguntale a Juan cuál tomar.

## Formato de entrega (RETORNO)
Al terminar, respondé así (Juan se lo pasa a JUAN 3.0):

```
RETORNO <E-número> — <GPT o GEMINI>
Rama: <nombre> · Commit: <hash>
1. Qué cambió (máximo 6 puntos).
2. Cómo lo probaste.
3. Pendiente de confirmar (datos que tiene que dar Juan).
4. Cambios que hacen falta fuera de tus archivos (con el arreglo exacto).
```
