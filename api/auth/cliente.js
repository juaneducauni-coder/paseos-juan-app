// POST /api/auth/cliente { token } → { token: sesión, user } con rol "cliente".
// El token es el del enlace /c/<token> que genera el coordinador o el admin (/api/clientes/acceso).
// La sesión dura 90 días y deja de valer si el enlace se revoca o se genera uno nuevo.
import { timingSafeEqual } from "node:crypto";
import { handler, send, readJson, HttpError } from "../_lib/http.js";
import { issueClientToken, hashTokenCliente, publicUser, usuarioCliente, TOKEN_CLIENTE } from "../_lib/auth.js";
import { store } from "../_lib/store.js";

const invalido = () => new HttpError(401, "Este enlace no es válido o ya no está activo. Pedile uno nuevo a Paseos Juan.");

function mismoHash(a, b) {
  const x = Buffer.from(String(a || ""), "hex");
  const y = Buffer.from(String(b || ""), "hex");
  return x.length === 32 && x.length === y.length && timingSafeEqual(x, y);
}

export default handler({ POST: 1 }, async (req, res) => {
  const { token } = await readJson(req);
  if (!TOKEN_CLIENTE.test(String(token || ""))) throw invalido();
  const hash = hashTokenCliente(token);
  const clientes = await store.list("clientes");
  const cliente = clientes.find((c) => c.acceso?.activo && mismoHash(c.acceso.hash, hash));
  if (!cliente) throw invalido();
  const user = usuarioCliente(cliente);
  send(res, 200, { ok: true, token: issueClientToken(cliente.id, cliente.acceso), user: publicUser(user) });
});
