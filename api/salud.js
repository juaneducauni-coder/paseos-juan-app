// GET /api/salud → estado del servidor y dónde se guardan los datos.
import { handler, send } from "./_lib/http.js";
import { store } from "./_lib/store.js";
import { googleClientId } from "./_lib/google.js";

export default handler({ GET: 1 }, async (req, res) => {
  send(res, 200, { ok: true, almacenamiento: store.mode, entorno: process.env.VERCEL_ENV || "local", googleClientId: googleClientId() || null });
});
