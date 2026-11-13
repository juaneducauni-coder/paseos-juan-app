// Qué rol puede leer y escribir cada colección de datos compartidos.
// Borrar: admin siempre; el resto solo lo que creó en las últimas 24 horas.

const TODOS_OPERATIVOS = ["admin", "coordinador", "supervisor", "paseador"];

export const COLECCIONES = {
  // Estado del paseo por perro, día y turno. id = AAAA-MM-DD_PJ-001_manana
  paseos: { leer: TODOS_OPERATIVOS, escribir: ["admin", "supervisor", "paseador"], porFecha: true },
  // Checklist del equipo antes de salir. id = AAAA-MM-DD_usuario_turno
  checklists: { leer: ["admin", "supervisor", "paseador"], escribir: ["admin", "supervisor", "paseador"], porFecha: true },
  // Incidentes durante el paseo.
  incidentes: { leer: TODOS_OPERATIVOS, escribir: ["admin", "supervisor", "paseador"], porFecha: true },
  // Observaciones de conducta en formato observable.
  observaciones: { leer: TODOS_OPERATIVOS, escribir: TODOS_OPERATIVOS, porFecha: true },
  // Rutas armadas por el supervisor.
  rutas: { leer: TODOS_OPERATIVOS, escribir: ["admin", "supervisor"], porFecha: true },
  // Cierres de turno.
  cierres: { leer: ["admin", "coordinador", "supervisor"], escribir: ["admin", "supervisor"], porFecha: true },
  // Pedidos de clientes y evaluaciones (incluye los que llegan del formulario de la web).
  pedidos: { leer: ["admin", "coordinador", "marketing"], escribir: ["admin", "coordinador", "marketing"] },
  // Fichas de perros nuevos (altas) antes de pasar al registro maestro.
  fichas: { leer: ["admin", "coordinador", "supervisor"], escribir: ["admin", "coordinador"] },
  // Datos a confirmar que alguien marcó como resueltos. id = PJ-003
  resueltos: { leer: ["admin", "coordinador"], escribir: ["admin", "coordinador"] },
  // Registro de apoyo de pagos (la fuente oficial es el Libro contable).
  pagos: { leer: ["admin", "coordinador"], escribir: ["admin", "coordinador"] },
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
