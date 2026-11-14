// Archivos que manda la gente (carnet de vacunas, comprobantes, documentos, fotos).
// Se guardan en Google Drive (si la planilla está conectada) o, mientras tanto, en Vercel privado.
// En la colección "archivos" queda el registro con a qué perro, cliente o pedido corresponde.
import { randomBytes } from "node:crypto";
import { HttpError } from "./http.js";
import { store } from "./store.js";

export const TIPOS = {
  "carnet de vacunas": "Carnets de vacunas",
  "comprobante de pago": "Comprobantes de pago",
  "documento": "Documentos",
  "foto": "Fotos",
};

const MAX_BYTES = 3.5 * 1024 * 1024;
const FIRMAS = {
  "image/jpeg": (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  "image/png": (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  "image/webp": (b) => b.slice(0, 4).toString() === "RIFF" && b.slice(8, 12).toString() === "WEBP",
  "application/pdf": (b) => b.slice(0, 5).toString() === "%PDF-",
};
const EXT = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" };

const limpiarTexto = (v, max = 80) => String(v ?? "").replace(/[^\p{L}\p{N} ._-]/gu, "").trim().slice(0, max);

// Valida y guarda un archivo. Devuelve el registro de la colección "archivos".
export async function guardarArchivo({ archivo, tipo, perroId, perroNombre, clienteId, pedidoId, nota }, autor) {
  if (!archivo || typeof archivo.base64 !== "string") throw new HttpError(400, "Falta el archivo.");
  const mime = String(archivo.mime || "");
  if (!FIRMAS[mime]) throw new HttpError(400, "Solo se aceptan fotos (JPG, PNG, WEBP) o PDF.");
  const buffer = Buffer.from(archivo.base64, "base64");
  if (!buffer.length) throw new HttpError(400, "El archivo está vacío.");
  if (buffer.length > MAX_BYTES) throw new HttpError(413, "El archivo es muy pesado (máximo 3,5 MB). Probá con una foto más chica.");
  if (!FIRMAS[mime](buffer)) throw new HttpError(400, "El archivo no coincide con su tipo. Mandá una foto o un PDF.");

  // Tipo desconocido: se rechaza (no se convierte a "documento").
  if (!Object.prototype.hasOwnProperty.call(TIPOS, tipo)) throw new HttpError(400, "Tipo de archivo no válido.");
  const tipoOk = tipo;
  const fecha = new Date().toISOString().slice(0, 10);
  const id = `${fecha}_${Date.now().toString(36)}_${randomBytes(3).toString("hex")}`;
  const etiqueta = limpiarTexto(perroNombre || clienteId || pedidoId || "sin-nombre", 40).replace(/\s+/g, "-");
  const nombre = `${fecha}_${limpiarTexto(tipoOk, 30).replace(/\s+/g, "-")}_${etiqueta}.${EXT[mime]}`;

  const guardado = await store.saveFile(id, buffer, mime, { nombre, carpeta: TIPOS[tipoOk] });
  const ahora = new Date().toISOString();
  const registro = {
    id,
    col: "archivos",
    fecha,
    tipo: tipoOk,
    titulo: `${tipoOk[0].toUpperCase()}${tipoOk.slice(1)}${perroNombre ? `: ${limpiarTexto(perroNombre, 40)}` : ""}`,
    nombreArchivo: nombre,
    nombreOriginal: limpiarTexto(archivo.nombre, 120),
    mime,
    tamano: buffer.length,
    perroId: perroId ? limpiarTexto(perroId, 20) : "",
    perroNombre: perroNombre ? limpiarTexto(perroNombre, 60) : "",
    clienteId: clienteId ? limpiarTexto(clienteId, 80) : "",
    pedidoId: pedidoId ? limpiarTexto(pedidoId, 80) : "",
    nota: String(nota || "").slice(0, 300),
    ...guardado,
    creadoPor: autor.usuario,
    creadoPorNombre: autor.nombre,
    creadoEn: ahora,
    actualizadoPor: autor.usuario,
    actualizadoPorNombre: autor.nombre,
    actualizadoEn: ahora,
  };
  await store.put("archivos", registro);
  return registro;
}
