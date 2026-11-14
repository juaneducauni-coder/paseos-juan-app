// POST /api/clientes/aprobar — SOLO admin (Juan). Paso de aprobación del alta de un cliente (P-01).
// { pedidoId, perros: ["PJ-0xx"], dias: ["lunes", ...], turno: "Mañana"|"Tarde", hora?, plan?, nombre?, barrio? }
//   → crea el cliente a partir del pedido del formulario (tutor, teléfono, zona), marca el pedido "aprobado"
// { clienteId, perros?, dias, turno, hora?, plan? }
//   → aprueba un cliente que ya estaba cargado (por ejemplo, de la planilla)
// Sin horario asignado (días y turno) no se aprueba. Respuesta: { cliente, enlace: "/c/<token>", acceso }.
// El enlace se muestra UNA vez: en el servidor queda solo su hash.
import { handler, send, readJson, HttpError } from "../_lib/http.js";
import { requireUser, perrosDeCliente } from "../_lib/auth.js";
import { store } from "../_lib/store.js";
import { nuevoId } from "../registros.js";
import { validarHorario, validarPerros, activarAcceso, sinHash } from "../_lib/clientes.js";

const ID = /^[a-z0-9][a-z0-9_.-]{0,79}$/i;
const texto = (v, max) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);

export default handler({ POST: 1 }, async (req, res) => {
  const user = await requireUser(req, ["admin"]);
  const body = await readJson(req);
  const horario = validarHorario(body);
  const ahora = new Date().toISOString();
  const aprobado = { por: user.usuario, porNombre: user.nombre, en: ahora };
  let cliente;
  let pedidoAprobado = null; // el pedido se marca aprobado solo si el alta sale bien

  if (body.pedidoId) {
    const pedidoId = String(body.pedidoId);
    if (!ID.test(pedidoId)) throw new HttpError(400, "Pedido no válido.");
    const pedido = await store.get("pedidos", pedidoId);
    if (!pedido) throw new HttpError(404, "Ese pedido no existe.");
    if (pedido.clienteId) throw new HttpError(409, "Ese pedido ya se aprobó. Si perdió el enlace, generá uno nuevo.");
    const d = pedido.datos || {};
    const nombre = texto(body.nombre || d.responsable, 60);
    if (nombre.length < 2) throw new HttpError(400, "Falta el nombre del tutor.");
    cliente = {
      id: nuevoId(ahora.slice(0, 10)),
      col: "clientes",
      nombre,
      telefono: texto(d.telefono, 40),
      email: texto(d.email, 120),
      barrio: texto(body.barrio || d.zona, 60),
      perros: validarPerros(body.perros),
      perroNombre: texto(d.perro, 60),
      plan: texto(body.plan, 60),
      ...horario,
      estado: "activo",
      pedidoId,
      aprobado,
      creadoPor: user.usuario,
      creadoPorNombre: user.nombre,
      creadoEn: ahora,
    };
    pedidoAprobado = { ...pedido, estado: "aprobado", clienteId: cliente.id, actualizadoPor: user.usuario, actualizadoPorNombre: user.nombre, actualizadoEn: ahora };
  } else {
    const clienteId = String(body.clienteId || "");
    if (!ID.test(clienteId)) throw new HttpError(400, "Falta el pedido o el cliente a aprobar.");
    const previo = await store.get("clientes", clienteId);
    if (!previo) throw new HttpError(404, "Ese cliente no existe.");
    cliente = {
      ...previo,
      perros: body.perros !== undefined ? validarPerros(body.perros) : validarPerros(previo.perros),
      ...(body.plan !== undefined ? { plan: texto(body.plan, 60) } : {}),
      ...horario,
      estado: "activo",
      aprobado,
    };
  }

  // Cada perro es de un solo cliente (si no, una familia vería los paseos de otra).
  const otros = (await store.list("clientes")).filter((c) => c.id !== cliente.id && c.estado !== "baja");
  const repetido = perrosDeCliente(cliente).find((perro) => otros.some((c) => perrosDeCliente(c).includes(perro)));
  if (repetido) throw new HttpError(409, `El perro ${repetido} ya es de otro cliente. Revisá el código.`);

  const resultado = await activarAcceso(cliente, user);
  if (pedidoAprobado) await store.put("pedidos", pedidoAprobado);
  return send(res, 201, { ok: true, cliente: sinHash(resultado.cliente), enlace: resultado.enlace, acceso: resultado.acceso });
});
