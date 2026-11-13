// POST /api/auth/login { usuario, pin } → { token, user }
import { handler, send, readJson } from "../_lib/http.js";
import { login } from "../_lib/auth.js";

export default handler({ POST: 1 }, async (req, res) => {
  const { usuario, pin } = await readJson(req);
  const result = await login(usuario, pin);
  send(res, 200, { ok: true, ...result });
});
