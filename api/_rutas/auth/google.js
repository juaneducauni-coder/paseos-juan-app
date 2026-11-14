// POST /api/auth/google { credential } → entra con la cuenta de Google vinculada al usuario.
// El admin vincula el Gmail de cada persona desde "Usuarios y accesos".
import { handler, send, readJson, HttpError } from "../../_lib/http.js";
import { issueToken, publicUser } from "../../_lib/auth.js";
import { store } from "../../_lib/store.js";
import { verificarGoogle } from "../../_lib/google.js";

export default handler({ POST: 1 }, async (req, res) => {
  const { credential } = await readJson(req);
  const { email } = await verificarGoogle(credential);
  const users = await store.listUsers();
  const user = users.find((u) => u.activo && u.google && u.google === email);
  const noVinculada = () => new HttpError(403, `La cuenta ${email} no está vinculada a ningún usuario. Pedile a Juan que la vincule, o entrá con tu usuario y PIN.`);
  if (!user) throw noVinculada();
  // Solo se anota el ingreso (no se reescribe el usuario leído arriba, que puede estar viejo).
  const updated = await store.patchUser(user.usuario, { ultimoIngreso: new Date().toISOString() });
  // Si mientras tanto el admin lo desactivó, cambió el Gmail o cerró sus sesiones, no entra.
  if (!updated || !updated.activo || updated.google !== email || (updated.version || 1) !== (user.version || 1)) {
    throw noVinculada();
  }
  send(res, 200, { ok: true, token: issueToken(updated), user: publicUser(updated) });
});
