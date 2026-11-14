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
// Quién ve y carga la CONTADURÍA (colección `movimientos`: ingresos y egresos).
// Es el ÚNICO lugar para cambiarlo. Hoy solo admin: Juan todavía tiene que confirmar si
// "organizadores" incluye al coordinador (antes decidió que el coordinador NO ve plata).
export const ROLES_CONTADURIA = ["admin"];

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
  // Pedidos de cambio de ruta: el supervisor ve algo en la calle (habló con un tutor, pasó algo)
  // y le pide el cambio al coordinador, que lo aplica en la ruta y responde.
  solicitudes: { leer: ["admin", "coordinador", "supervisor"], escribir: ["admin", "coordinador", "supervisor"], porFecha: true },
  // Cierres de turno del supervisor. id = AAAA-MM-DD_manana
  cierres: { leer: ["admin", "coordinador", "supervisor"], escribir: ["admin", "supervisor"], porFecha: true },
  // Clientes (tutores) y sus perros. Datos de contacto: solo admin y coordinador.
  clientes: { leer: ["admin", "coordinador"], escribir: ["admin", "coordinador"] },
  // Avisos por barrio (obra, corte, perro suelto, clima, seguridad). Los ve todo el equipo.
  avisos: { leer: [...EQUIPO, "marketing"], escribir: ["admin", "coordinador", "supervisor"] },
  // Pedidos de clientes y evaluaciones (incluye los del formulario de la web).
  pedidos: { leer: ["admin", "coordinador", "marketing"], escribir: ["admin", "coordinador", "marketing"] },
  // Fichas de perros nuevos (altas) antes de pasar al registro maestro. Tienen datos de tutores
  // y de salud: solo admin y coordinador (el supervisor no las necesita).
  fichas: { leer: ["admin", "coordinador"], escribir: ["admin", "coordinador"] },
  // Datos a confirmar marcados como resueltos. id = PJ-003
  resueltos: { leer: ["admin", "coordinador"], escribir: ["admin", "coordinador"] },
  // Archivos que manda la gente (carnet de vacunas, documentos, fotos, comprobantes) con a qué perro,
  // cliente o pedido corresponden. Los comprobantes de pago solo los abre el admin.
  // Todo el equipo puede ver las FOTOS de los perros; carnets y documentos solo admin y coordinador.
  archivos: { leer: EQUIPO, escribir: EQUIPO },
  // Foto de perfil de cada perro: miniatura liviana para mostrar en todas las listas. id = PJ-001
  fotos: { leer: EQUIPO, escribir: EQUIPO, maxBytes: 48 * 1024 },
  // Registro de apoyo de pagos: SOLO admin (la fuente oficial es el Libro contable).
  pagos: { leer: ["admin"], escribir: ["admin"] },
  // Contaduría: ingresos y egresos (registro de apoyo; la fuente oficial es el Libro contable).
  // Los campos y sus valores válidos los controla api/registros.js.
  movimientos: { leer: ROLES_CONTADURIA, escribir: ROLES_CONTADURIA, porFecha: true },
  // Ajustes que configura Juan desde el panel. Hoy solo id "pagos": { alias, instrucciones }.
  // El alias NO va en el código. Lo lee el admin y, por el portal, los clientes con sesión.
  ajustes: { leer: ["admin"], escribir: ["admin"] },
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

// Qué archivos ve cada rol: admin todo; coordinador todo menos comprobantes de pago;
// supervisor, paseador y ayudante solo las fotos de los perros.
export function puedeVerArchivo(rol, archivo) {
  if (rol === "admin") return true;
  if (archivo?.tipo === "comprobante de pago") return false;
  if (rol === "coordinador") return true;
  return archivo?.tipo === "foto";
}

// Qué tipo de archivo puede SUBIR cada rol: admin todos; coordinador carnets, documentos y fotos;
// supervisor, paseador y ayudante solo fotos (de perfil y del paseo).
const SUBIDA = {
  admin: ["carnet de vacunas", "comprobante de pago", "documento", "foto"],
  coordinador: ["carnet de vacunas", "documento", "foto"],
  supervisor: ["foto"],
  paseador: ["foto"],
  ayudante: ["foto"],
};

export function puedeSubirArchivo(rol, tipo) {
  return Boolean(Object.prototype.hasOwnProperty.call(SUBIDA, rol) && SUBIDA[rol].includes(tipo));
}

// ---------- Portal del cliente ----------
// El cliente (tutor) entra por un enlace y ve SOLO lo de sus perros: el estado de sus paseos
// y sus fotos. Nada de rutas, otros perros, pagos ni datos del equipo.
export const CLIENTE_LEE = ["paseos", "fotos", "ajustes"];
// Campos que ve el cliente (sin ruta, notas internas ni usuarios del equipo).
export const CAMPOS_CLIENTE = {
  paseos: ["id", "fecha", "perroId", "perroNombre", "turno", "estado", "horaRetiro", "horaPaseo", "horaEntrega", "fotoPaseoId", "sinFotoPaseo", "actualizadoEn"],
  fotos: ["id", "perroId", "perroNombre", "miniatura", "archivoId", "actualizadoEn"],
  ajustes: ["id", "alias", "instrucciones", "actualizadoEn"],
};
// De "ajustes", el cliente solo ve estos registros (datos de pago para transferir).
export const AJUSTES_CLIENTE = ["pagos"];

// Archivos según el usuario completo: el cliente solo abre fotos de sus perros.
export function puedeVerArchivoUsuario(user, archivo) {
  if (user?.rol === "cliente") {
    return archivo?.tipo === "foto" && Boolean(archivo.perroId) && (user.perros || []).includes(archivo.perroId);
  }
  return puedeLeer(user?.rol, "archivos") && puedeVerArchivo(user?.rol, archivo);
}

// ---------- Mensajes (api/mensajes.js) ----------
// Las colecciones "mensajes", "lecturas" y "canales" NO se leen por /api/registros:
// solo por /api/mensajes, que aplica estos permisos por canal.
//
// Canales de grupo: todos los participantes leen y escriben.
export const CANALES_GRUPO = {
  equipo: { titulo: "Equipo", roles: EQUIPO },
  calle: { titulo: "Calle", roles: ["admin", "coordinador", "supervisor", "paseador", "ayudante"] },
  coordinacion: { titulo: "Coordinación", roles: ["admin", "coordinador", "supervisor"] },
};
// Directo: dm_<usuarioA>__<usuarioB> (ordenados alfabéticamente). Solo esos dos; el admin tampoco.
// Cliente: cliente_<clienteId>. Leen y escriben el cliente dueño, coordinador y admin.
// Supervisor, paseador y ayudante solo PUBLICAN avisos (tipo "aviso"); no leen la conversación.
const CLIENTE_CONVERSA = ["admin", "coordinador"];
const CLIENTE_SOLO_AVISOS = ["supervisor", "paseador", "ayudante"];
// Comunidad de clientes (P-08): "clientes". Leen y escriben los clientes con sesión, coordinador y admin.
// Modera SOLO el admin (borrar mensajes y silenciar). El resto del equipo no participa.
export const CANAL_COMUNIDAD = "clientes";
export const COMUNIDAD_ROLES = ["cliente", "admin", "coordinador"];
const CANAL = /^(equipo|calle|coordinacion|clientes|dm_[a-z0-9._-]{3,31}__[a-z0-9._-]{3,31}|cliente_[a-z0-9][a-z0-9_.-]{0,79})$/i;

export function canalDirecto(a, b) {
  const [x, y] = [String(a), String(b)].sort();
  return `dm_${x}__${y}`;
}

// Devuelve el otro usuario de un directo si `usuario` participa, o null.
// Los nombres con "__" no usan directos (así el canal no se puede leer de dos maneras).
export function otroDelDirecto(canal, usuario) {
  const yo = String(usuario || "");
  if (!String(canal).startsWith("dm_") || !yo || yo.includes("__") || yo.includes(":")) return null;
  const resto = canal.slice(3);
  let otro = null;
  if (resto.startsWith(`${yo}__`)) otro = resto.slice(yo.length + 2);
  else if (resto.endsWith(`__${yo}`)) otro = resto.slice(0, -(yo.length + 2));
  if (!otro || otro === yo || otro.includes("__")) return null;
  return canalDirecto(yo, otro) === canal ? otro : null;
}

// Qué puede hacer `user` en `canal`: { valido, tipo, leer, escribir, soloAvisos, moderar?, clienteId?, otro? }.
// tipo: "grupo" | "comunidad" | "directo" | "cliente".
export function accesoCanal(user, canal) {
  const nada = { valido: false, leer: false, escribir: false, soloAvisos: false };
  if (!CANAL.test(String(canal || ""))) return nada;
  const rol = user?.rol;
  if (CANALES_GRUPO[canal]) {
    const ok = rol !== "cliente" && CANALES_GRUPO[canal].roles.includes(rol);
    return { valido: true, tipo: "grupo", leer: ok, escribir: ok, soloAvisos: false, moderar: ok && rol === "admin" };
  }
  if (canal === CANAL_COMUNIDAD) {
    const ok = COMUNIDAD_ROLES.includes(rol);
    return { valido: true, tipo: "comunidad", leer: ok, escribir: ok, soloAvisos: false, moderar: rol === "admin" };
  }
  if (canal.startsWith("dm_")) {
    const otro = rol === "cliente" ? null : otroDelDirecto(canal, user?.usuario);
    return { valido: true, tipo: "directo", leer: Boolean(otro), escribir: Boolean(otro), soloAvisos: false, otro };
  }
  const clienteId = canal.slice("cliente_".length);
  if (rol === "cliente") {
    const ok = user.clienteId === clienteId;
    return { valido: true, tipo: "cliente", leer: ok, escribir: ok, soloAvisos: false, clienteId };
  }
  if (CLIENTE_CONVERSA.includes(rol)) return { valido: true, tipo: "cliente", leer: true, escribir: true, soloAvisos: false, moderar: rol === "admin", clienteId };
  if (CLIENTE_SOLO_AVISOS.includes(rol)) return { valido: true, tipo: "cliente", leer: false, escribir: true, soloAvisos: true, clienteId };
  return { valido: true, tipo: "cliente", leer: false, escribir: false, soloAvisos: false, clienteId };
}
