// Datos reales de Paseos Juan para las páginas internas.
//
// Fuentes (Google Drive de Paseos Juan):
// - "RPJ" hoja BASE RUTAS (rutas vigentes por día y turno), leída el 12/11/2026.
// - "entra y sale x paseos juan" hoja Tabla de precios (tamaño y plan), modificada el 10/11/2026.
// - "Reporte semanal perros paseados" hojas Planes actualizados e Inventario de equipamento.
// - "Perros paseados" pestaña Noviembre (bajas informadas).
// - Registro maestro de perros (14/08/2026): todos los perros figuran SIN EVALUAR.
//
// Reglas de privacidad: acá NO van datos de tutores (nombres, teléfonos, domicilios),
// ni información médica, ni datos de pago, ni descuentos personales. Solo datos operativos
// del perro. Lo que no está confirmado se marca con PENDIENTE.

export const PENDIENTE = "Pendiente de confirmar";

export const DATA_UPDATED = "12/11/2026";

export const BUSINESS_INFO = {
  name: "Paseos Juan",
  zone: "Pilar y La Lonja",
  claim: "Cuidado y confianza como en casa",
  // Número provisorio (de Juan) hasta que la página tenga uno propio.
  whatsapp: "5491151460864",
  whatsappLabel: "11 5146-0864",
  officialSources: {
    money: "Libro contable del Sistema de Gestión (Google Sheets)",
    dogs: "Registro maestro de perros",
    routes: "Planilla RPJ, hoja BASE RUTAS",
  },
};

// Equipo autorizado. Juan decide la distribución final de funciones.
export const TEAM = [
  { id: "juan", name: "Juan Buitrago", role: "admin", label: "Fundador", tasks: "Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana." },
  { id: "sebastian", name: "Sebastián", role: "paseador", label: "Paseador", tasks: "Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes." },
  { id: "mateo", name: "Mateo Pérez", role: "marketing", label: "Marketing (propuesto)", tasks: "Comunicación, redes, captación y reactivación de clientes." },
  { id: "nicolas", name: "Nicolás", role: "supervisor", label: "Supervisor", tasks: "Supervisa el turno tarde." },
];

// Quién usa cada panel (para saludos y encabezados). El coordinador está pendiente de definir.
export const ROLE_OWNERS = {
  admin: "Juan Buitrago",
  coordinador: "Juan Buitrago",
  supervisor: "Juan (mañana) y Nicolás (tarde)",
  paseador: "Sebastián",
  cliente: "Tutor de ejemplo",
};

export const SHIFTS = {
  manana: { label: "Mañana", from: "09:00", to: "12:15", route: "PJ_1M", supervisor: "Juan" },
  tarde: { label: "Tarde", from: "14:45", to: "17:05", routes: ["PJ_1T", "PJ_2T"], supervisor: "Nicolás" },
};

export const WEEK_DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// Planes oficiales (hoja Planes actualizados). Precio semanal por perro.
export const REAL_PLANS = [
  { id: "plan1", name: "Plan 1", walks: 3, prices: { Pequeño: 24000, Mediano: 27000, Grande: 30000 } },
  { id: "plan2", name: "Plan 2", walks: 5, prices: { Pequeño: 35000, Mediano: 37500, Grande: 40000 } },
  { id: "plan3", name: "Plan 3", walks: 6, prices: { Pequeño: 39000, Mediano: 42000, Grande: 45000 } },
];

export const REAL_SINGLE_WALK = {
  Pequeño: { individual: 10000, grupo: 8000 },
  Mediano: { individual: 12000, grupo: 10000 },
  Grande: { individual: 14000, grupo: 12000 },
};

export const MULTI_DOG_DISCOUNTS = [
  { dogs: 2, discount: "10%" },
  { dogs: 3, discount: "20%" },
  { dogs: 4, discount: "30%" },
];

// Categorías operativas. No son diagnósticos ni etiquetas permanentes.
export const CATEGORIES = {
  VERDE: "Puede participar en un paseo grupal habitual.",
  AMARILLO: "Necesita atención especial, adaptación o selección cuidadosa del grupo.",
  ROJO: "Paseo individual, medidas especiales o evaluación profesional antes de un grupo.",
  "SIN EVALUAR": "Todavía no hay información suficiente para asignar una categoría.",
};

// Perros. size: Pequeño/Mediano/Grande (la tabla dice "Chico" = Pequeño).
// days: días que figuran en BASE RUTAS. shifts: turnos. minutes: duración cargada.
// safety: indicaciones operativas que figuran en la planilla. status: "Activo" salvo aviso.
// category: todos SIN EVALUAR según el registro maestro del 14/08/2026.
export const REAL_DOGS = [
  { id: "PJ-001", name: "Pistacho", size: "Mediano", plan: "Plan 2", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: ["Usa bozal", "No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi"], incompatibleWith: ["Lokaku", "Sam", "Rocky", "Candombe", "Cashi"], status: "Activo" },
  { id: "PJ-002", name: "Kiara", size: "Mediano", plan: "Plan 2", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: ["Sale con Cashi (misma familia)"], status: "Activo" },
  { id: "PJ-003", name: "Cashi", size: "Pequeño", plan: "Plan 2", days: ["Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: ["Usa bozal"], status: "Activo", review: "Plan 2 son 5 paseos y en rutas figura 4 días." },
  { id: "PJ-004", name: "Zeus", size: "Grande", plan: "Plan 2", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-005", name: "Flora", size: "Pequeño", plan: "Plan 2", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana", "Tarde"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-006", name: "Wendy", size: "Pequeño", plan: "Plan 3", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: ["Sale con Sonia (misma familia)"], status: "Activo", review: "Plan 3 son 6 paseos y en rutas figura 5 días." },
  { id: "PJ-007", name: "Sonia", size: "Mediano", plan: "Plan 3", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: ["Sale con Wendy (misma familia)"], status: "Activo", review: "Plan 3 son 6 paseos y en rutas figura 5 días." },
  { id: "PJ-008", name: "Duque", size: "Mediano", plan: "Plan 3 + individual", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: ["Sale con Tayler (misma familia)"], status: "Activo" },
  { id: "PJ-009", name: "Tayler", size: "Grande", plan: "Plan 3 + individual", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], shifts: ["Mañana"], minutes: 45, safety: ["Sale con Duque (misma familia)"], status: "Activo", review: "En la tabla de precios figura como Taylor." },
  { id: "PJ-010", name: "Rambo", size: "Pequeño", plan: "Plan 3", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Mañana", "Tarde"], minutes: 20, safety: [], status: "Activo", review: "Sale dos veces por día y la planilla pide revisar la duración." },
  { id: "PJ-011", name: "Morris", size: "Grande", plan: "Plan 1", days: ["Lunes", "Miércoles", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-012", name: "Lokaku", size: "Grande", plan: "Plan 1", days: ["Lunes", "Miércoles", "Viernes"], shifts: ["Mañana"], minutes: 45, safety: ["Usa bozal (responsable del bozal: Juan)", "No juntar con Pistacho"], incompatibleWith: ["Pistacho"], status: "Activo", review: "En la tabla de precios figura como Lukaku." },
  { id: "PJ-013", name: "Runa", size: "Pequeño", plan: "Sin plan (1 paseo)", days: ["Viernes"], shifts: ["Mañana"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-014", name: "Manolo", size: "Grande", plan: "Plan 6 + 1", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], shifts: ["Tarde"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-015", name: "Caipi", size: "Mediano", plan: "Plan 2", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Tarde"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-016", name: "Frida", size: "Grande", plan: "Plan 1", days: ["Lunes", "Miércoles", "Viernes"], shifts: ["Tarde"], minutes: 45, safety: ["Sale con Natividad (misma familia)"], status: "Activo" },
  { id: "PJ-017", name: "Natividad", size: "Pequeño", plan: "Plan 1", days: ["Lunes", "Miércoles", "Viernes"], shifts: ["Tarde"], minutes: 45, safety: ["Sale con Frida (misma familia)"], status: "Activo" },
  { id: "PJ-018", name: "Annie", size: "Mediano", plan: "Plan 1", days: ["Lunes", "Miércoles", "Viernes"], shifts: ["Tarde"], minutes: 45, safety: [], status: "Activo", review: "En la tabla de precios figura como Any." },
  { id: "PJ-019", name: "Sam", size: "Mediano", plan: "Plan 3", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], shifts: ["Mañana", "Tarde"], minutes: 45, safety: ["No juntar con Pistacho"], incompatibleWith: ["Pistacho"], status: "Activo", review: "La planilla marca lunes, miércoles, jueves y viernes como no contratados." },
  { id: "PJ-020", name: "Otto", size: "Mediano", plan: "Plan 1", days: ["Lunes", "Miércoles", "Viernes"], shifts: ["Tarde"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-021", name: "Ron", size: "Grande", plan: "Plan 1", days: ["Lunes", "Miércoles", "Viernes"], shifts: ["Tarde"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-022", name: "Forest", size: "Grande", plan: "Plan 1", days: ["Martes", "Jueves", "Sábado"], shifts: ["Tarde"], minutes: 45, safety: ["Usa bozal (responsable del bozal: Sebastián)"], status: "Activo" },
  { id: "PJ-023", name: "Paco", size: "Pequeño", plan: "Plan 1", days: ["Lunes", "Miércoles", "Viernes"], shifts: ["Mañana", "Tarde"], minutes: 45, safety: [], status: "Activo" },
  { id: "PJ-024", name: "Milo", size: "Grande", plan: "Plan 1", days: ["Miércoles", "Sábado"], shifts: ["Tarde"], minutes: 45, safety: [], status: "Activo", review: "Plan 1 son 3 paseos y en rutas figura 2 días." },
  { id: "PJ-025", name: "Séptima", size: "Pequeño", plan: "Plan 1", days: ["Martes", "Miércoles", "Viernes"], shifts: ["Tarde"], minutes: 45, safety: [], status: "Activo", review: "Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados." },
  { id: "PJ-026", name: "Jack", size: "Pequeño", plan: "Sin plan (2 paseos)", days: ["Lunes", "Viernes"], shifts: ["Tarde"], minutes: 20, safety: [], status: "Activo", review: "La planilla pide revisar la duración." },
  { id: "PJ-027", name: "Roma", size: "Pequeño", plan: "Sin plan (2 paseos)", days: ["Sábado"], shifts: ["Tarde"], minutes: 55, safety: [], status: "Activo" },
  { id: "PJ-028", name: "Coqui", size: "Mediano", plan: "Plan 2", days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], shifts: ["Tarde"], minutes: 45, safety: [], status: "Baja informada", review: "En Perros paseados (noviembre) figura \"no pasea más\", pero sigue en BASE RUTAS." },
  { id: "PJ-029", name: "Bocha", size: "Grande", plan: "Plan 1", days: [], shifts: [], minutes: null, safety: [], status: "Sin ruta cargada", review: "Figura en la tabla de precios pero no en BASE RUTAS." },
  { id: "PJ-030", name: "Candombe", size: "Mediano", plan: "Sin plan (3 paseos)", days: [], shifts: [], minutes: null, safety: ["No juntar con Pistacho"], incompatibleWith: ["Pistacho"], status: "Sin ruta cargada", review: "Figura en la tabla de precios pero no en BASE RUTAS." },
  { id: "PJ-031", name: "Momo", size: "Mediano", plan: "Plan 1", days: [], shifts: [], minutes: null, safety: [], status: "Sin ruta cargada", review: "Figura en la tabla de precios pero no en BASE RUTAS." },
].map((dog) => ({ category: "SIN EVALUAR", categorySource: "Registro maestro 14/08/2026", ...dog }));

// Equipo de paseo (hoja Inventario de equipamento). Quién lo tiene.
export const EQUIPMENT = [
  { item: "Correas", total: 8, juan: 0, sebastian: 8 },
  { item: "Bebederos portátiles", total: 3, juan: 1, sebastian: 2 },
  { item: "Ganchos de hierro", total: 9, juan: 5, sebastian: 4 },
  { item: "Musleras", total: 3, juan: 2, sebastian: 1 },
  { item: "Pecheras", total: 3, juan: 2, sebastian: 1 },
  { item: "Cinturones", total: 3, juan: 2, sebastian: 1 },
  { item: "Bozales grandes", total: 2, juan: 1, sebastian: 1 },
  { item: "Bozales medianos", total: 1, juan: 1, sebastian: 0 },
  { item: "Bozales chicos", total: 1, juan: 1, sebastian: 0 },
  { item: "Cepillos", total: 6, juan: 0, sebastian: 6 },
  { item: "Tijeras", total: 2, juan: 0, sebastian: 2 },
];

// Referencias del negocio. Separar dato verificado de meta.
export const BUSINESS_FACTS = [
  { label: "Perros en la tabla de precios", value: "27", source: "Tabla de precios, 10/11/2026", kind: "Dato" },
  { label: "Perros activos", value: "18", source: "Referencia del 24/09/2026", kind: "Dato histórico" },
  { label: "Máximo diario histórico", value: "29", source: "04/08/2025", kind: "Dato histórico" },
  { label: "Brecha propuesta", value: "11 perros", source: "Reunión de socios", kind: "Meta de referencia" },
];

// Protocolo ante incidentes (secuencia aprendida en agosto de 2025).
export const INCIDENT_PROTOCOL = [
  "Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.",
  "Revisar lesiones. La atención veterinaria va antes que cualquier trámite.",
  "Avisar al tutor.",
  "Registrar hechos observables: hora, lugar, personas y perros involucrados.",
  "Prevención: contener, informar, corregir y medir la recuperación.",
];

export function dogsForDay(day) {
  return REAL_DOGS.filter((dog) => dog.days.includes(day));
}

export function dogsForShift(day, shiftLabel) {
  return dogsForDay(day).filter((dog) => dog.shifts.includes(shiftLabel));
}

export function todayName(date = new Date()) {
  const index = (date.getDay() + 6) % 7;
  return WEEK_DAYS[index];
}

export function formatPeso(value) {
  return `$${Number(value).toLocaleString("es-AR")}`;
}
