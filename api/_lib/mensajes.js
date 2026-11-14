// Mensajes entre el equipo y con los clientes (lo usan api/mensajes.js y api/registros.js).
// Colecciones:
// - mensajes: id = <canal>_<ISO compacto>_<random> (se listan por prefijo de canal).
// - lecturas: id = usuario (cliente: "cliente_<clienteId>"); { "<canal>": ISO de la última lectura }.
// - canales:  id = canal; último mensaje de cada canal, para el resumen sin leer todos los mensajes.
// - moderacion: id = "clientes"; { silenciados: { "<usuario>": ISO hasta } } (lo maneja el admin).
import { randomBytes, createHash } from "node:crypto";
import { HttpError } from "./http.js";
import { store } from "./store.js";
import { perrosDeCliente } from "./auth.js";
import { REAL_DOGS } from "../../src/data/realData.js";

export const TIPOS_MENSAJE = ["texto", "aviso", "foto"];
export const MAX_TEXTO = 1000;
export const MAX_LISTA = 200;

// Reglas de la comunidad de clientes (P-08). Las pantallas las muestran arriba del chat.
export const REGLAS_COMUNIDAD = [
  "Es un espacio de clientes de Paseos Juan: respeto y buena onda.",
  "No compartas teléfonos, direcciones ni datos de pago: por seguridad, el chat no los acepta.",
  "Para algo de tu perro o tu plan, escribile a Paseos Juan por tu chat privado.",
  "El admin puede borrar mensajes y silenciar a quien no respete las reglas.",
];

// Teléfonos (8 o más números seguidos, con espacios o guiones) y correos: no van en la comunidad.
const PARECE_TELEFONO = /(?:\+?\d[\s().-]*){8,}/;
const PARECE_CORREO = /[^\s@]+@[^\s@]+\.[^\s@]+/;
export function tieneDatosPrivados(texto) {
  return PARECE_TELEFONO.test(texto) || PARECE_CORREO.test(texto);
}

// En la comunidad, de cada cliente se muestra solo el nombre y la inicial del apellido.
export function nombreCorto(nombre) {
  const partes = String(nombre || "").trim().split(/\s+/).filter(Boolean);
  if (!partes.length) return "Cliente";
  return partes.length > 1 ? `${partes[0]} ${partes[1][0].toUpperCase()}.` : partes[0];
}

const ZONA = "America/Argentina/Buenos_Aires";

export function hoyAR(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: ZONA, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

export function horaAR(date = new Date()) {
  return new Intl.DateTimeFormat("es-AR", { timeZone: ZONA, hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}

// Texto plano: sin etiquetas HTML ni caracteres de control (se conservan los saltos de línea).
export function limpiarTextoMensaje(valor) {
  return String(valor ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function idMensaje(canal, date = new Date(), sufijo = "") {
  const compacto = date.toISOString().replace(/[-:.]/g, "");
  return `${canal}_${compacto}_${sufijo || randomBytes(3).toString("hex")}`;
}

// Mensaje escrito sin señal (E-058): el celular manda su identificador (cid) y la hora en que se
// escribió. El servidor guarda en "reintentos" qué mensaje salió de cada cid (sufijo = usuario + cid),
// así un reintento no lo duplica aunque el reloj del celular esté corrido. La hora escrita se
// muestra si es de las últimas 6 horas (y no del futuro).
const CID = /^c[a-z0-9]{6,24}$/;
export function datosDeReintento(body, autor, ahora = new Date()) {
  const cid = typeof body.cid === "string" && CID.test(body.cid) ? body.cid : "";
  const escrito = Date.parse(String(body.escritoEn || ""));
  const valida = Number.isFinite(escrito) && escrito <= ahora.getTime() + 2 * 60 * 1000 && escrito >= ahora.getTime() - 6 * 3600 * 1000;
  const escritoEn = valida ? new Date(Math.min(escrito, ahora.getTime())) : null;
  if (!cid) return { cid: "", escritoEn };
  // El sufijo junta usuario y cid: dos personas con el mismo cid no chocan.
  const sufijo = createHash("sha256").update(`${autor}:${cid}`).digest("hex").slice(0, 12);
  return { cid, escritoEn, sufijo };
}

// Id del registro de lecturas: el usuario del equipo, o cliente_<id> para el cliente.
export function idLectura(user) {
  return user.rol === "cliente" ? `cliente_${user.clienteId}` : user.usuario;
}

function resumenUltimo(m) {
  return {
    id: m.id,
    tipo: m.tipo,
    texto: String(m.texto || "").slice(0, 140),
    autor: m.autor,
    autorNombre: m.autorNombre,
    creadoEn: m.creadoEn,
  };
}

// Guarda un mensaje y actualiza el último mensaje del canal.
export async function publicar({ canal, texto, tipo = "texto", adjuntoId = "", perroId = "", perroNombre = "", autor, automatico = false, clave = "", reintento = null }) {
  const ahora = new Date();
  // Con clave (avisos automáticos): el id sale de la clave, así dos guardados casi juntos del mismo
  // paseo escriben el MISMO mensaje y el cliente no recibe el aviso dos veces.
  const idFijo = clave ? idMensaje(canal, new Date(`${hoyAR(ahora)}T00:00:00.000Z`), createHash("sha256").update(clave).digest("hex").slice(0, 16)) : "";
  if (idFijo) {
    const yaEsta = await store.get("mensajes", idFijo);
    if (yaEsta) return yaEsta;
  }
  const mensaje = {
    id: idFijo || idMensaje(canal, ahora),
    col: "mensajes",
    canal,
    fecha: hoyAR(ahora),
    tipo,
    texto,
    adjuntoId: adjuntoId || "",
    perroId: perroId || "",
    perroNombre: perroNombre || "",
    autor: autor.usuario,
    autorNombre: canal === "clientes" && autor.rol === "cliente" ? nombreCorto(autor.nombre) : autor.nombre,
    autorRol: autor.rol,
    automatico: Boolean(automatico),
    ...(clave ? { clave } : {}),
    // Hora en que se escribió (si se mandó más tarde por falta de señal). creadoEn es cuando llegó.
    ...(reintento?.escritoEn ? { escritoEn: reintento.escritoEn.toISOString() } : {}),
    creadoEn: ahora.toISOString(),
  };
  await store.put("mensajes", mensaje);
  try {
    const previo = await store.get("canales", canal);
    if (!previo?.ultimo?.creadoEn || previo.ultimo.creadoEn <= mensaje.creadoEn) {
      await store.put("canales", { id: canal, col: "canales", canal, ultimo: resumenUltimo(mensaje), actualizadoEn: mensaje.creadoEn });
    }
  } catch (error) {
    console.error("[mensajes] no se pudo actualizar el canal", error);
  }
  return mensaje;
}

const cambio = (m) => String(m.actualizadoEn || m.creadoEn || "");

// Mensajes de un canal en orden cronológico (los últimos MAX_LISTA), opcionalmente desde un ISO
// (trae los creados o cambiados después: así llegan también los mensajes que borró el admin).
const TOPE_LISTADO = 2000;
const DIAS_HACIA_ATRAS = 90;

// El id de cada mensaje lleva la fecha (canal_AAAAMMDDT…): se puede leer un día por vez.
async function recientesPorDia(canal) {
  const juntos = [];
  const hoy = Date.now();
  for (let i = 0; i < DIAS_HACIA_ATRAS && juntos.length < MAX_LISTA; i += 1) {
    const dia = new Date(hoy - i * 24 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, "");
    juntos.push(...(await store.list("mensajes", `${canal}_${dia}`)));
  }
  return juntos;
}

export async function mensajesDe(canal, desde = "") {
  if (desde) {
    // Si el canal no tiene nada nuevo, no hace falta leer todos sus mensajes.
    const indice = await store.get("canales", canal);
    const ultimoCambio = [indice?.ultimo?.creadoEn, indice?.actualizadoEn].filter(Boolean).sort().pop() || "";
    if (!ultimoCambio || ultimoCambio <= desde) return [];
  }
  let todos = await store.list("mensajes", `${canal}_`);
  // Algunos almacenamientos devuelven como mucho 2000 archivos, en orden alfabético (los más viejos
  // primero). Si el canal llegó a ese tope, se leen los días más recientes de a uno, hacia atrás.
  if (todos.length >= TOPE_LISTADO) todos = await recientesPorDia(canal);
  const lista = todos
    .filter((m) => m.canal === canal && (!desde || cambio(m) > desde))
    .sort((a, b) => String(a.creadoEn).localeCompare(String(b.creadoEn)) || String(a.id).localeCompare(String(b.id)));
  return lista.slice(-MAX_LISTA);
}

// Borrado por el admin: el mensaje queda (para el orden y el historial) pero sin contenido.
export async function borrarMensaje(id, admin) {
  const mensaje = await store.get("mensajes", id);
  if (!mensaje) throw new HttpError(404, "Ese mensaje no existe.");
  const ahora = new Date().toISOString();
  const borrado = { ...mensaje, texto: "", adjuntoId: "", borrado: true, borradoPor: admin.usuario, actualizadoEn: ahora };
  await store.put("mensajes", borrado);
  const indice = await store.get("canales", mensaje.canal);
  if (indice) {
    const ultimo = indice.ultimo?.id === id ? { ...indice.ultimo, texto: "", borrado: true } : indice.ultimo;
    await store.put("canales", { ...indice, ultimo, actualizadoEn: ahora });
  }
  return borrado;
}

// Silenciados de la comunidad: { usuario: ISO hasta }. Solo cuenta lo vigente.
export async function silenciados() {
  const registro = (await store.get("moderacion", "clientes")) || {};
  const ahora = new Date().toISOString();
  return Object.fromEntries(Object.entries(registro.silenciados || {}).filter(([, hasta]) => hasta > ahora));
}

export async function silenciar(usuario, horas, admin) {
  const lista = await silenciados();
  if (horas > 0) lista[usuario] = new Date(Date.now() + horas * 3600 * 1000).toISOString();
  else delete lista[usuario];
  const ahora = new Date().toISOString();
  await store.put("moderacion", { id: "clientes", col: "moderacion", silenciados: lista, actualizadoPor: admin.usuario, actualizadoEn: ahora });
  return lista;
}

// Cliente al que pertenece un perro (colección "clientes", campo "perros"). Los de baja no cuentan.
export async function clienteDelPerro(perroId) {
  if (!perroId) return null;
  const clientes = await store.list("clientes");
  return clientes.find((c) => c.estado !== "baja" && perrosDeCliente(c).includes(perroId)) || null;
}

const SISTEMA = { usuario: "sistema", nombre: "Paseos Juan", rol: "sistema" };
const HORA = /^\d{1,2}:\d{2}$/;

// Avisos automáticos al cliente cuando cambia un paseo (retiro, paseo con foto, entrega).
// Devuelve las claves de aviso ya enviadas para guardarlas en el paseo (así no se repiten).
// Solo avisa paseos de hoy (hora de Argentina): las correcciones de días pasados no molestan al cliente.
// Solo paseos con el identificador de siempre (AAAA-MM-DD_<perro>_<turno>): así hay como máximo
// un registro por perro y turno, y nadie puede mandar avisos sin fin inventando identificadores.
const ID_PASEO = /^(\d{4}-\d{2}-\d{2})_([A-Za-z0-9.-]{1,40})_(manana|tarde)$/;
const NOMBRES_PERROS = new Map(REAL_DOGS.map((perro) => [perro.id, perro.name]));

// Nombre del perro desde los datos del servidor (nunca el que manda quien guarda el paseo).
async function nombreDelPerro(perroId, cliente) {
  if (NOMBRES_PERROS.has(perroId)) return NOMBRES_PERROS.get(perroId);
  if (perrosDeCliente(cliente).length === 1 && cliente.perroNombre) return limpiarTextoMensaje(cliente.perroNombre).slice(0, 60);
  return "tu perro";
}

// La foto del aviso tiene que ser una foto de ESE perro (no cualquier archivo).
async function fotoValida(archivoId, perroId) {
  if (!archivoId) return "";
  try {
    const archivo = await store.get("archivos", String(archivoId));
    return archivo && archivo.tipo === "foto" && archivo.perroId === perroId ? archivo.id : "";
  } catch {
    return "";
  }
}

export async function avisosDePaseo(previo, registro) {
  const enviados = new Set(Array.isArray(previo?.avisosCliente) ? previo.avisosCliente : []);
  if (registro.fecha !== hoyAR() || !registro.perroId) return [...enviados];
  const partes = ID_PASEO.exec(String(registro.id || ""));
  if (!partes || partes[1] !== registro.fecha || partes[2] !== registro.perroId) return [...enviados];
  const cliente = await clienteDelPerro(registro.perroId);
  if (!cliente) return [...enviados];
  const nombre = await nombreDelPerro(registro.perroId, cliente);
  const pendientes = [];
  const estado = registro.estado;
  const cambio = estado !== previo?.estado;
  const hora = (valor) => (HORA.test(String(valor || "")) ? String(valor) : horaAR());

  if (estado === "retirado" && cambio && !enviados.has("retirado")) {
    pendientes.push({ clave: "retirado", texto: `Retiramos a ${nombre} · ${hora(registro.horaRetiro)}` });
  }
  const fotoNueva = registro.fotoPaseoId && registro.fotoPaseoId !== previo?.fotoPaseoId;
  const foto = fotoNueva || estado === "paseando" ? await fotoValida(registro.fotoPaseoId, registro.perroId) : "";
  if (estado === "paseando" && !enviados.has("paseando")) {
    pendientes.push({ clave: "paseando", texto: `${nombre} está paseando`, adjuntoId: foto });
    if (foto) enviados.add("foto");
  } else if (fotoNueva && foto && !enviados.has("foto")) {
    pendientes.push({ clave: "foto", texto: `Foto del paseo de ${nombre}`, adjuntoId: foto });
  }
  if (estado === "entregado" && cambio && !enviados.has("entregado")) {
    pendientes.push({ clave: "entregado", texto: `Entregamos a ${nombre} · ${hora(registro.horaEntrega)}` });
  }
  if (!pendientes.length) return [...enviados];

  const canal = `cliente_${cliente.id}`;
  for (const aviso of pendientes) {
    await publicar({
      canal,
      texto: aviso.texto,
      tipo: "aviso",
      adjuntoId: aviso.adjuntoId || "",
      perroId: registro.perroId,
      perroNombre: nombre,
      autor: SISTEMA,
      automatico: true,
      clave: `${registro.id}:${aviso.clave}`,
    });
    enviados.add(aviso.clave);
    if (aviso.adjuntoId) enviados.add("foto");
  }
  return [...enviados];
}

export function errorTexto(texto) {
  if (!texto) throw new HttpError(400, "Escribí el mensaje.");
  if (texto.length > MAX_TEXTO) throw new HttpError(400, `El mensaje es muy largo (máximo ${MAX_TEXTO} caracteres).`);
}
