# Visual Studio Code con Claude, ChatGPT y Gemini trabajando juntos

Objetivo: abrir el proyecto en tu compu y que las tres IAs trabajen en el mismo código, con las mismas reglas, sin pisarse. Las reglas ya están en el proyecto (`AGENTS.md`, `GEMINI.md`, `CLAUDE.md`): cada IA las lee sola.

## Una sola vez (unos 20 minutos)

1. **Instalar**
   - Visual Studio Code: https://code.visualstudio.com/
   - Git: https://git-scm.com/downloads
   - Node.js (versión LTS): https://nodejs.org/
2. **Bajar el proyecto**: en VS Code, "Clonar repositorio Git" → `juaneducauni-coder/paseos-juan-app` (entrá con tu cuenta de GitHub). Abrí la carpeta.
3. **Extensiones**: VS Code te va a sugerir 3 (están en `.vscode/extensions.json`). Instalalas y entrá con tu cuenta en cada una:
   - **Claude Code** (Anthropic) — tu cuenta de Claude.
   - **Codex** (OpenAI) — tu cuenta de ChatGPT.
   - **Gemini Code Assist** (Google) — tu cuenta de Google.
   Cada una tiene sus propios planes y límites: revisá en cada una si tu cuenta la incluye antes de usarla mucho.
4. **Preparar**: abrí la terminal de VS Code y corré `npm install`.

## Cada vez que quieras ponerlas a trabajar

1. Elegí un encargo de `asistente/encargos/` (o pedile a JUAN 3.0 que te arme uno).
2. Pegale a cada IA, en su panel:
   > Leé AGENTS.md. Tomá el encargo E-0XX de asistente/encargos/. Creá tu rama (gpt/... o gemini/...) desde claude/quirky-shannon-ih7yx1, hacé el trabajo, probalo y respondé con el RETORNO.
3. **Una IA por encargo** (o por archivo): dos IAs en el mismo archivo se pisan.
4. Cuando terminen, pegame en el chat el **RETORNO** de cada una. Yo reviso su rama, la pruebo y la uno al resto. Publicar en la página oficial sigue siendo decisión tuya.

## Para probar la app en tu compu
```bash
node scripts/seed-dev.mjs
npx vite
```
Abrí la dirección que muestra (http://localhost:5173). Usuarios de prueba con PIN 482915: juan, coordina, nicolas, sebastian. Son datos solo de tu compu.

## Qué conviene darle a cada una (sugerencia)
- **Gemini**: revisar pantallas con capturas (encargo E-026) y textos.
- **ChatGPT/Codex**: tareas chicas y bien acotadas (un archivo), por ejemplo cargar los datos de la tienda cuando los tengas.
- **Claude (JUAN 3.0)**: coordinar, servidor y datos, unir todo y publicar.
