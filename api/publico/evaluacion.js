// POST /api/publico/evaluacion — formulario de la página pública. No requiere usuario.
// Guarda el pedido en la colección "pedidos" para que el coordinador lo vea en la app.
import { handler, send, readJson, clientIp, HttpError } from "../_lib/http.js";
import { store } from "../_lib/store.js";
import { nuevoId } from "../registros.js";
import { guardarArchivo } from "../_lib/archivos.js";
import { verificarGoogle } from "../_lib/google.js";

const CAMPOS = ["perro", "edad", "tamano", "raza", "energia", "perros", "mordida", "conducta",
  "responsable", "telefono", "zona", "referencia", "tipo", "horario", "dias", "comentario"];
const recientes = new Map();

function limitar(ip) {
  const ahora = Date.now();
  const lista = (recientes.get(ip) || []).filter((t) => ahora - t < 3600 * 1000);
  if (lista.length >= 5) throw new HttpError(429, "Recibimos varios pedidos seguidos. Escribinos por WhatsApp.");
  lista.push(ahora);
  recientes.set(ip, lista);
}

export default handler({ POST: 1 }, async (req, res) => {
  const body = await readJson(req, 5 * 1024 * 1024);
  // Campo trampa para robots: una persona no lo completa.
  if (body.sitio) return send(res, 201, { ok: true });
  limitar(clientIp(req));

  const datos = {};
  for (const campo of CAMPOS) {
    const valor = String(body[campo] ?? "").trim().slice(0, 600);
    if (valor) datos[campo] = valor;
  }
  // Si el tutor usó "Continuar con Google", su correo queda verificado por Google.
  if (body.googleCredential) {
    try {
      const g = await verificarGoogle(body.googleCredential);
      datos.email = g.email;
      datos.emailVerificado = "sí (Google)";
      if (!datos.responsable && g.nombre) datos.responsable = g.nombre.slice(0, 600);
    } catch {
      // Si Google no confirma, el pedido igual se guarda con lo que escribió.
    }
  } else if (body.email) {
    const email = String(body.email).trim().slice(0, 200);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) datos.email = email;
  }
  if (!datos.perro || !datos.responsable || !datos.telefono) {
    throw new HttpError(400, "Faltan el nombre del perro, tu nombre o tu teléfono.");
  }
  const ahora = new Date().toISOString();
  const fecha = ahora.slice(0, 10);
  const registro = {
    id: nuevoId(fecha),
    col: "pedidos",
    fecha,
    tipo: "Evaluación (formulario web)",
    estado: "nuevo",
    origen: "web",
    titulo: `Evaluación: ${datos.perro}`,
    datos,
    creadoPor: "web",
    creadoPorNombre: "Formulario de la página",
    creadoEn: ahora,
    actualizadoPor: "web",
    actualizadoEn: ahora,
  };
  // Carnet de vacunas opcional: queda en Drive (o Vercel privado) vinculado al pedido.
  if (body.carnet && body.carnet.base64) {
    const archivo = await guardarArchivo(
      { archivo: body.carnet, tipo: "carnet de vacunas", perroNombre: datos.perro, pedidoId: registro.id },
      { usuario: "web", nombre: "Formulario de la página" },
    );
    registro.archivos = [archivo.id];
    registro.carnet = { id: archivo.id, nombre: archivo.nombreArchivo };
  }
  await store.put("pedidos", registro);
  send(res, 201, { ok: true, carnet: Boolean(registro.carnet) });
});
