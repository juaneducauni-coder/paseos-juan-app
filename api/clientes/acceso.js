// POST /api/clientes/acceso { clienteId }            → crea (o renueva) el enlace del portal del cliente.
//   Respuesta: { enlace: "/c/<token>", acceso: { activo, creadoEn } }. El token se muestra UNA vez:
//   en el cliente queda solo su hash. Generar uno nuevo invalida el enlace y las sesiones anteriores.
// POST /api/clientes/acceso { clienteId, revocar: true } → desactiva el enlace y cierra sus sesiones.
// Solo admin y coordinador.
import { handler, send, readJson, HttpError } from "../_lib/http.js";
import { requireUser, nuevoTokenCliente, hashTokenCliente } from "../_lib/auth.js";
import { store } from "../_lib/store.js";

const ID = /^[a-z0-9][a-z0-9_.-]{0,79}$/i;

export default handler({ POST: 1 }, async (req, res) => {
  const user = await requireUser(req, ["admin", "coordinador"]);
  const body = await readJson(req);
  const clienteId = String(body.clienteId || "");
  if (!ID.test(clienteId)) throw new HttpError(400, "Falta el cliente.");
  const cliente = await store.get("clientes", clienteId);
  if (!cliente) throw new HttpError(404, "Ese cliente no existe.");
  const ahora = new Date().toISOString();
  const quien = { actualizadoPor: user.usuario, actualizadoPorNombre: user.nombre, actualizadoEn: ahora };

  if (body.revocar) {
    const acceso = { hash: "", creadoEn: cliente.acceso?.creadoEn || "", activo: false, revocadoEn: ahora, revocadoPor: user.usuario };
    await store.put("clientes", { ...cliente, acceso, ...quien });
    return send(res, 200, { ok: true, acceso: { activo: false, creadoEn: acceso.creadoEn, revocadoEn: ahora } });
  }

  const token = nuevoTokenCliente();
  const acceso = { hash: hashTokenCliente(token), creadoEn: ahora, activo: true, creadoPor: user.usuario };
  await store.put("clientes", { ...cliente, acceso, ...quien });
  return send(res, 201, { ok: true, enlace: `/c/${token}`, acceso: { activo: true, creadoEn: ahora } });
});
