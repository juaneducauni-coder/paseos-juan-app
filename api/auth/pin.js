// POST /api/auth/pin { actual, nuevo } → cambia el PIN propio y cierra las otras sesiones.
import { handler, send, readJson, HttpError } from "../_lib/http.js";
import { requireUser, checkPin, hashPin, validatePin, issueToken, publicUser } from "../_lib/auth.js";
import { store } from "../_lib/store.js";

export default handler({ POST: 1 }, async (req, res) => {
  const user = await requireUser(req);
  const { actual, nuevo } = await readJson(req);
  if (!checkPin(actual, user.salt, user.hash)) throw new HttpError(400, "El PIN actual no es correcto.");
  validatePin(nuevo);
  const { salt, hash } = hashPin(nuevo);
  const updated = { ...user, salt, hash, version: (user.version || 1) + 1, debeCambiarPin: false };
  await store.putUser(updated);
  send(res, 200, { ok: true, token: issueToken(updated), user: publicUser(updated) });
});
