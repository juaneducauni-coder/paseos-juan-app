// GET /api/auth/me → usuario de la sesión. También dice si falta crear el primer admin.
import { handler, send } from "../../_lib/http.js";
import { requireUser, publicUser } from "../../_lib/auth.js";
import { store } from "../../_lib/store.js";

export default handler({ GET: 1 }, async (req, res) => {
  if (!req.headers?.authorization) {
    const users = await store.listUsers();
    return send(res, 200, { ok: true, user: null, necesitaConfiguracion: users.length === 0 });
  }
  const user = await requireUser(req);
  send(res, 200, { ok: true, user: publicUser(user) });
});
