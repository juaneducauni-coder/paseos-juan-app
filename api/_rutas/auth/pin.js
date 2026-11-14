// POST /api/auth/pin { actual, nuevo } → cambia el PIN propio y cierra las otras sesiones.
// El PIN actual tiene el mismo límite que el ingreso (5 fallos → 15 minutos de bloqueo), así
// alguien con una sesión robada no puede adivinarlo probando todos.
import { handler, send, readJson, HttpError } from "../../_lib/http.js";
import { requireUser, checkPin, hashPin, validatePin, issueToken, publicUser, estaBloqueado, contarIntento } from "../../_lib/auth.js";
import { store } from "../../_lib/store.js";

const BLOQUEADO = "Demasiados intentos con el PIN actual. Esperá 15 minutos y probá de nuevo.";

export default handler({ POST: 1 }, async (req, res) => {
  const user = await requireUser(req);
  if (user.rol === "cliente") throw new HttpError(403, "El acceso del cliente es por enlace, sin PIN.");
  const { actual, nuevo } = await readJson(req);
  validatePin(nuevo);
  if (estaBloqueado(user)) throw new HttpError(429, BLOQUEADO);
  // El intento se cuenta antes de comparar (atómico en el store); si acierta, vuelve a 0.
  if (await contarIntento(user.usuario)) throw new HttpError(429, BLOQUEADO);
  if (!checkPin(actual, user.salt, user.hash)) throw new HttpError(400, "El PIN actual no es correcto.");
  const { salt, hash } = hashPin(nuevo);
  const updated = await store.patchUser(user.usuario, {
    salt,
    hash,
    version: (user.version || 1) + 1,
    debeCambiarPin: false,
    fallos: 0,
    bloqueadoHasta: null,
  });
  if (!updated || !updated.activo) throw new HttpError(401, "Tu sesión ya no es válida. Volvé a ingresar.");
  send(res, 200, { ok: true, token: issueToken(updated), user: publicUser(updated) });
});
