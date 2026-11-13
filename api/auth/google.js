// POST /api/auth/google { credential } → entra con la cuenta de Google vinculada al usuario.
// El admin vincula el Gmail de cada persona desde "Usuarios y accesos".
import { handler, send, readJson, HttpError } from "../_lib/http.js";
import { issueToken, publicUser } from "../_lib/auth.js";
import { store } from "../_lib/store.js";
import { verificarGoogle } from "../_lib/google.js";

export default handler({ POST: 1 }, async (req, res) => {
  const { credential } = await readJson(req);
  const { email } = await verificarGoogle(credential);
  const users = await store.listUsers();
  const user = users.find((u) => u.activo && u.google && u.google === email);
  if (!user) {
    throw new HttpError(403, `La cuenta ${email} no está vinculada a ningún usuario. Pedile a Juan que la vincule, o entrá con tu usuario y PIN.`);
  }
  const updated = { ...user, fallos: 0, bloqueadoHasta: null, ultimoIngreso: new Date().toISOString() };
  await store.putUser(updated);
  send(res, 200, { ok: true, token: issueToken(updated), user: publicUser(updated) });
});
