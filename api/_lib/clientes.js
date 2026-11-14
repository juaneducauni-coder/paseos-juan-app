// Acceso de clientes (P-01): pedir alta → Juan aprueba → se asigna horario → el cliente recibe su enlace.
// La aprobación del admin es el paso que crea y activa el acceso. Después, admin o coordinador
// pueden renovar el enlace (si el cliente lo perdió) o revocarlo.
import { HttpError } from "./http.js";
import { store } from "./store.js";
import { nuevoTokenCliente, hashTokenCliente } from "./auth.js";

export const DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
export const TURNOS = ["Mañana", "Tarde"];
const PERRO = /^[A-Za-z0-9_.-]{1,40}$/;

// Horario asignado: { dias: ["lunes", ...], turno: "Mañana"|"Tarde", hora?: "HH:MM" }.
export function validarHorario({ dias, turno, hora } = {}) {
  const lista = Array.isArray(dias) ? [...new Set(dias.map((d) => String(d).trim().toLowerCase()))] : [];
  if (!lista.length || !lista.every((d) => DIAS.includes(d))) throw new HttpError(400, "Falta asignar el horario: elegí los días.");
  if (!TURNOS.includes(turno)) throw new HttpError(400, "Falta asignar el horario: elegí el turno (Mañana o Tarde).");
  if (hora && !/^\d{1,2}:\d{2}$/.test(String(hora))) throw new HttpError(400, "La hora no es válida (HH:MM).");
  return { dias: lista, turno, hora: hora ? String(hora) : "" };
}

export function validarPerros(perros) {
  const lista = Array.isArray(perros) ? [...new Set(perros.map((p) => String(p).trim()))] : [];
  if (!lista.length || lista.length > 10 || !lista.every((p) => PERRO.test(p))) {
    throw new HttpError(400, "Asigná el código de cada perro (por ejemplo PJ-001).");
  }
  return lista;
}

// Genera un enlace nuevo (invalida el anterior y sus sesiones). Devuelve { enlace, acceso, cliente }.
export async function activarAcceso(cliente, user) {
  const ahora = new Date().toISOString();
  const token = nuevoTokenCliente();
  const acceso = { hash: hashTokenCliente(token), creadoEn: ahora, activo: true, creadoPor: user.usuario };
  const actualizado = { ...cliente, acceso, actualizadoPor: user.usuario, actualizadoPorNombre: user.nombre, actualizadoEn: ahora };
  await store.put("clientes", actualizado);
  return { enlace: `/c/${token}`, acceso: { activo: true, creadoEn: ahora }, cliente: actualizado };
}

export function sinHash(cliente) {
  if (!cliente?.acceso) return cliente;
  const { hash, ...acceso } = cliente.acceso;
  return { ...cliente, acceso };
}
