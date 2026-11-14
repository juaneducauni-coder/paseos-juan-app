// Mensajes entre el equipo y con los clientes (lo usan api/mensajes.js y api/registros.js).
// Colecciones:
// - mensajes: id = <canal>_<ISO compacto>_<random> (se listan por prefijo de canal).
// - lecturas: id = usuario (cliente: "cliente_<clienteId>"); { "<canal>": ISO de la última lectura }.
// - canales:  id = canal; último mensaje de cada canal, para el resumen sin leer todos los mensajes.
import { randomBytes } from "node:crypto";
import { HttpError } from "./http.js";
import { store } from "./store.js";
import { perrosDeCliente } from "./auth.js";

export const TIPOS_MENSAJE = ["texto", "aviso", "foto"];
export const MAX_TEXTO = 1000;
export const MAX_LISTA = 200;

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

export function idMensaje(canal, date = new Date()) {
  const compacto = date.toISOString().replace(/[-:.]/g, "");
  return `${canal}_${compacto}_${randomBytes(3).toString("hex")}`;
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
export async function publicar({ canal, texto, tipo = "texto", adjuntoId = "", perroId = "", perroNombre = "", autor, automatico = false, clave = "" }) {
  const ahora = new Date();
  const mensaje = {
    id: idMensaje(canal, ahora),
    col: "mensajes",
    canal,
    fecha: hoyAR(ahora),
    tipo,
    texto,
    adjuntoId: adjuntoId || "",
    perroId: perroId || "",
    perroNombre: perroNombre || "",
    autor: autor.usuario,
    autorNombre: autor.nombre,
    autorRol: autor.rol,
    automatico: Boolean(automatico),
    ...(clave ? { clave } : {}),
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

// Mensajes de un canal en orden cronológico (los últimos MAX_LISTA), opcionalmente desde un ISO.
export async function mensajesDe(canal, desde = "") {
  if (desde) {
    // Si el canal no tiene nada nuevo, no hace falta leer todos sus mensajes.
    const indice = await store.get("canales", canal);
    if (!indice?.ultimo?.creadoEn || indice.ultimo.creadoEn <= desde) return [];
  }
  const lista = (await store.list("mensajes", `${canal}_`))
    .filter((m) => m.canal === canal && (!desde || String(m.creadoEn) > desde))
    .sort((a, b) => String(a.creadoEn).localeCompare(String(b.creadoEn)) || String(a.id).localeCompare(String(b.id)));
  return lista.slice(-MAX_LISTA);
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
export async function avisosDePaseo(previo, registro) {
  const enviados = new Set(Array.isArray(previo?.avisosCliente) ? previo.avisosCliente : []);
  if (registro.fecha !== hoyAR() || !registro.perroId) return [...enviados];
  const nombre = String(registro.perroNombre || previo?.perroNombre || "tu perro").slice(0, 60);
  const pendientes = [];
  const estado = registro.estado;
  const cambio = estado !== previo?.estado;
  const hora = (valor) => (HORA.test(String(valor || "")) ? String(valor) : horaAR());

  if (estado === "retirado" && cambio && !enviados.has("retirado")) {
    pendientes.push({ clave: "retirado", texto: `Retiramos a ${nombre} · ${hora(registro.horaRetiro)}` });
  }
  const fotoNueva = registro.fotoPaseoId && registro.fotoPaseoId !== previo?.fotoPaseoId;
  if (estado === "paseando" && !enviados.has("paseando")) {
    pendientes.push({ clave: "paseando", texto: `${nombre} está paseando`, adjuntoId: registro.fotoPaseoId || "" });
    if (registro.fotoPaseoId) enviados.add("foto");
  } else if (fotoNueva && !enviados.has("foto")) {
    pendientes.push({ clave: "foto", texto: `Foto del paseo de ${nombre}`, adjuntoId: registro.fotoPaseoId });
  }
  if (estado === "entregado" && cambio && !enviados.has("entregado")) {
    pendientes.push({ clave: "entregado", texto: `Entregamos a ${nombre} · ${hora(registro.horaEntrega)}` });
  }
  if (!pendientes.length) return [...enviados];

  const cliente = await clienteDelPerro(registro.perroId);
  if (!cliente) return [...enviados];
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
