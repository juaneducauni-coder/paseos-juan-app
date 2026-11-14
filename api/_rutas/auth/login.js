// POST /api/auth/login { usuario, pin } → { token, user }
import { handler, send, readJson, clientIp, ipClave, limitador } from "../../_lib/http.js";
import { login } from "../../_lib/auth.js";

// Hasta 10 intentos fallidos cada 15 minutos por conexión (los ingresos correctos no cuentan).
// Así el bloqueo de la cuenta no es la única defensa, y desde una sola IP no se pueden probar
// PIN en masa ni dejar bloqueado a otro usuario una y otra vez.
// Es en memoria (por instancia): para un límite global, sumar una regla de Vercel Firewall.
const porIp = limitador(10, 15 * 60 * 1000, "Demasiados intentos desde esta conexión. Esperá 15 minutos y probá de nuevo.");

export default handler({ POST: 1 }, async (req, res) => {
  const ip = ipClave(clientIp(req));
  const marca = porIp.usar(ip);
  const { usuario, pin } = await readJson(req);
  const result = await login(usuario, pin);
  porIp.devolver(ip, marca);
  send(res, 200, { ok: true, ...result });
});
