// Qué rol puede leer y escribir cada colección de datos compartidos.
// Borrar: admin siempre; el resto solo lo que creó en las últimas 24 horas.

// Roles:
// - admin: Juan. Ve y cambia todo, incluida la plata.
// - coordinador: arma rutas y horarios, gestiona clientes y avisa lo que pasa en cada barrio. NO ve plata.
// - supervisor: controla que se cumplan los paseos del momento (retiros, entregas, incidentes).
// - paseador: hace su ruta del turno.
// - ayudante: acompaña al paseador; marca pasos y reporta, sin datos de clientes.
// - marketing: pedidos y comunicación.
const EQUIPO = ["admin", "coordinador", "supervisor", "paseador", "ayudante"];
const CALLE = ["admin", "supervisor", "paseador", "ayudante"];

export const COLECCIONES = {
  // Estado del paseo por perro, día y turno. id = AAAA-MM-DD_PJ-001_manana
  paseos: { leer: EQUIPO, escribir: CALLE, porFecha: true },
  // Checklist del equipo antes de salir. id = AAAA-MM-DD_usuario_turno
  checklists: { leer: ["admin", "supervisor", "paseador", "ayudante"], escribir: CALLE, porFecha: true },
  // Incidentes durante el paseo.
  incidentes: { leer: EQUIPO, escribir: CALLE, porFecha: true },
  // Observaciones de conducta en formato observable.
  observaciones: { leer: EQUIPO, escribir: EQUIPO, porFecha: true },
  // Plantilla semanal de rutas (la arma el coordinador). id = PJ_1M_lunes
  plantillas: { leer: EQUIPO, escribir: ["admin", "coordinador"] },
  // Cambios de un día puntual sobre la plantilla. id = AAAA-MM-DD_PJ_1M
  rutas: { leer: EQUIPO, escribir: ["admin", "coordinador"], porFecha: true },
  // Cierres de turno del supervisor. id = AAAA-MM-DD_manana
  cierres: { leer: ["admin", "coordinador", "supervisor"], escribir: ["admin", "supervisor"], porFecha: true },
  // Clientes (tutores) y sus perros. Datos de contacto: solo admin y coordinador.
  clientes: { leer: ["admin", "coordinador"], escribir: ["admin", "coordinador"] },
  // Avisos por barrio (obra, corte, perro suelto, clima, seguridad). Los ve todo el equipo.
  avisos: { leer: [...EQUIPO, "marketing"], escribir: ["admin", "coordinador", "supervisor"] },
  // Pedidos de clientes y evaluaciones (incluye los del formulario de la web).
  pedidos: { leer: ["admin", "coordinador", "marketing"], escribir: ["admin", "coordinador", "marketing"] },
  // Fichas de perros nuevos (altas) antes de pasar al registro maestro.
  fichas: { leer: ["admin", "coordinador", "supervisor"], escribir: ["admin", "coordinador"] },
  // Datos a confirmar marcados como resueltos. id = PJ-003
  resueltos: { leer: ["admin", "coordinador"], escribir: ["admin", "coordinador"] },
  // Registro de apoyo de pagos: SOLO admin (la fuente oficial es el Libro contable).
  pagos: { leer: ["admin"], escribir: ["admin"] },
};

export function coleccion(nombre) {
  return Object.prototype.hasOwnProperty.call(COLECCIONES, nombre) ? COLECCIONES[nombre] : null;
}

export function puedeLeer(rol, nombre) {
  return Boolean(coleccion(nombre)?.leer.includes(rol));
}

export function puedeEscribir(rol, nombre) {
  return Boolean(coleccion(nombre)?.escribir.includes(rol));
}
