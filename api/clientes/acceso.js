// POST /api/clientes/acceso { clienteId }               → enlace NUEVO del portal (si lo perdió).
//   Solo para clientes ya aprobados por Juan (/api/clientes/aprobar es lo que crea el primer acceso).
//   Respuesta: { enlace: "/c/<token>", acceso: { activo, creadoEn } }. El token se muestra UNA vez:
//   en el cliente queda solo su hash. Generar uno nuevo invalida el enlace y las sesiones anteriores.
// POST /api/clientes/acceso { clienteId, revocar: true } → desactiva el enlace y cierra sus sesiones.
// Cortar el acceso: admin y coordinador. Generar un enlace nuevo: SOLO el admin, porque quien
// tiene el enlace entra como el cliente (ve el alias de pago y escribe en su nombre).
import { handler, send, readJson, HttpError } from "../_lib/http.js";
import { requireUser } from "../_lib/auth.js";
import { store } from "../_lib/store.js";
import { activarAcceso } from "../_lib/clientes.js";

const ID = /^[a-z0-9][a-z0-9_.-]{0,79}$/i;

export default handler({ POST: 1 }, async (req, res) => {
  const user = await requireUser(req, ["admin", "coordinador"]);
  const body = await readJson(req);
  const clienteId = String(body.clienteId || "");
  if (!ID.test(clienteId)) throw new HttpError(400, "Falta el cliente.");
  const cliente = await store.get("clientes", clienteId);
  if (!cliente) throw new HttpError(404, "Ese cliente no existe.");
  const ahora = new Date().toISOString();

  if (body.revocar) {
    const acceso = { hash: "", creadoEn: cliente.acceso?.creadoEn || "", activo: false, revocadoEn: ahora, revocadoPor: user.usuario };
    await store.put("clientes", { ...cliente, acceso, actualizadoPor: user.usuario, actualizadoPorNombre: user.nombre, actualizadoEn: ahora });
    return send(res, 200, { ok: true, acceso: { activo: false, creadoEn: acceso.creadoEn, revocadoEn: ahora } });
  }

  if (user.rol !== "admin") throw new HttpError(403, "El enlace nuevo lo genera solo Juan (admin).");
  if (!cliente.aprobado?.en) throw new HttpError(409, "Primero Juan tiene que aprobar el alta y asignar el horario.");
  if (cliente.estado === "baja") throw new HttpError(409, "Ese cliente está dado de baja.");
  const { enlace, acceso } = await activarAcceso(cliente, user);
  return send(res, 201, { ok: true, enlace, acceso });
});
