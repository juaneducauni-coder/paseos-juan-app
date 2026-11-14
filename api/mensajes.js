// /api/mensajes — chats del equipo y con los clientes.
// GET  ?canal=X&desde=ISO   → { canal, mensajes } en orden cronológico (los últimos 200; con desde, solo los posteriores).
// GET  ?resumen=1           → { canales: [{ canal, tipo, titulo, ultimo, sinLeer, soloAvisos? }] } que el usuario puede ver.
// GET  ?contactos=1         → { contactos: [{ usuario, nombre, rol }] } del equipo para abrir un directo (no clientes).
// POST { canal, texto, tipo: "texto"|"aviso"|"foto", adjuntoId?, perroId?, perroNombre? } → { mensaje }
//      canal "cliente" + perroId: el servidor busca el cliente de ese perro (para que el equipo avise sin ver clientes).
// POST { canal, leido: true } → marca el canal como leído (colección "lecturas").
// Moderación (SOLO admin):
// POST { borrar: "<id de mensaje>" }                 → lo deja sin texto ni adjunto, con borrado: true.
// POST { silenciar: "<usuario>", horas: 24 }          → no puede escribir en la comunidad "clientes" (horas: 0 lo quita).
// GET  ?moderacion=1                                  → { silenciados: { usuario: ISO hasta } }
// Comunidad de clientes ("clientes"): no acepta teléfonos ni correos; GET devuelve también { reglas, silenciadoHasta }.
// Límite: 30 mensajes por minuto por usuario.
// Permisos por canal: api/_lib/permisos.js (accesoCanal).
import { handler, send, readJson, query, HttpError, limitador } from "./_lib/http.js";
import { requireUser, perrosDeCliente } from "./_lib/auth.js";
import { store } from "./_lib/store.js";
import { accesoCanal, CANALES_GRUPO, CANAL_COMUNIDAD, COMUNIDAD_ROLES, otroDelDirecto, puedeVerArchivoUsuario } from "./_lib/permisos.js";
import {
  publicar, mensajesDe, clienteDelPerro, limpiarTextoMensaje, errorTexto, idLectura, TIPOS_MENSAJE,
  REGLAS_COMUNIDAD, tieneDatosPrivados, borrarMensaje, silenciados, silenciar,
} from "./_lib/mensajes.js";

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;
const PERRO = /^[A-Za-z0-9_-]{1,20}$/;
const ARCHIVO = /^[a-z0-9][a-z0-9_.-]{0,120}$/i;
const USUARIO = /^(cliente:[a-z0-9][a-z0-9_.-]{0,79}|[a-z][a-z0-9._-]{2,30})$/i;
const MENSAJE_ID = /^[a-z0-9][a-z0-9_.-]{0,160}$/i;
const porUsuario = limitador(30, 60 * 1000, "Mandaste muchos mensajes seguidos. Esperá un minuto.");

function acceso(user, canal) {
  const a = accesoCanal(user, canal);
  if (!a.valido) throw new HttpError(400, "Canal no válido.");
  return a;
}

async function lecturasDe(user) {
  return (await store.get("lecturas", idLectura(user))) || {};
}

function contarSinLeer(lista, user, leidoHasta) {
  // Los avisos automáticos son para el cliente: al equipo no le suman "sin leer".
  return lista.filter((m) => !m.borrado && m.autor !== user.usuario && !(m.automatico && user.rol !== "cliente")
    && (!leidoHasta || String(m.creadoEn) > leidoHasta)).length;
}

async function resumen(user) {
  const [indices, lecturas] = await Promise.all([store.list("canales"), lecturasDe(user)]);
  const porCanal = new Map(indices.map((c) => [c.canal || c.id, c]));
  const visibles = new Map();

  if (user.rol === "cliente") {
    visibles.set(`cliente_${user.clienteId}`, { tipo: "cliente", titulo: "Paseos Juan" });
    visibles.set(CANAL_COMUNIDAD, { tipo: "comunidad", titulo: "Comunidad de clientes" });
  } else {
    if (COMUNIDAD_ROLES.includes(user.rol)) visibles.set(CANAL_COMUNIDAD, { tipo: "comunidad", titulo: "Comunidad de clientes" });
    for (const [canal, def] of Object.entries(CANALES_GRUPO)) {
      if (def.roles.includes(user.rol)) visibles.set(canal, { tipo: "grupo", titulo: def.titulo });
    }
    const directos = [...porCanal.keys()].filter((c) => otroDelDirecto(c, user.usuario));
    const clientesConMensajes = [...porCanal.keys()].filter((c) => c.startsWith("cliente_") && accesoCanal(user, c).leer);
    if (directos.length) {
      const usuarios = new Map((await store.listUsers()).map((u) => [u.usuario, u]));
      for (const canal of directos) {
        const otro = otroDelDirecto(canal, user.usuario);
        const u = usuarios.get(otro);
        visibles.set(canal, { tipo: "directo", titulo: u?.nombre || otro, con: { usuario: otro, nombre: u?.nombre || otro, rol: u?.rol || "" } });
      }
    }
    if (clientesConMensajes.length) {
      const clientes = new Map((await store.list("clientes")).map((c) => [c.id, c]));
      for (const canal of clientesConMensajes) {
        const c = clientes.get(canal.slice("cliente_".length));
        visibles.set(canal, { tipo: "cliente", titulo: c?.nombre || "Cliente", clienteId: canal.slice("cliente_".length), perros: c ? perrosDeCliente(c) : [] });
      }
    }
  }

  const canales = [];
  for (const [canal, info] of visibles) {
    const indice = porCanal.get(canal);
    const ultimo = indice?.ultimo || null;
    const leidoHasta = lecturas[canal] || "";
    let sinLeer = 0;
    if (ultimo && ultimo.autor !== user.usuario && (!leidoHasta || ultimo.creadoEn > leidoHasta)) {
      sinLeer = contarSinLeer(await mensajesDe(canal, leidoHasta), user, leidoHasta);
    }
    canales.push({ canal, ...info, ultimo, sinLeer, leidoHasta: leidoHasta || null });
  }
  canales.sort((a, b) => String(b.ultimo?.creadoEn || "").localeCompare(String(a.ultimo?.creadoEn || "")));
  return canales;
}

// Al cliente no se le muestran usuarios internos (de otros clientes ni del equipo): solo nombre y rol.
// Su propio usuario sí, para que la pantalla sepa cuáles mensajes son suyos.
function paraCliente(m, user) {
  const { autor, clave, ...resto } = m;
  return autor === user.usuario ? { ...resto, autor } : resto;
}

export default handler({ GET: 1, POST: 1 }, async (req, res) => {
  const user = await requireUser(req);

  if (req.method === "GET") {
    const params = query(req);
    if (params.get("resumen")) {
      const canales = await resumen(user);
      return send(res, 200, { ok: true, canales: user.rol === "cliente" ? canales.map((c) => (c.ultimo ? { ...c, ultimo: paraCliente(c.ultimo, user) } : c)) : canales });
    }
    if (params.get("contactos")) {
      if (user.rol === "cliente") throw new HttpError(403, "Tu usuario no puede ver el equipo.");
      const contactos = (await store.listUsers())
        .filter((u) => u.activo && u.usuario !== user.usuario && !u.usuario.includes("__"))
        .map((u) => ({ usuario: u.usuario, nombre: u.nombre, rol: u.rol }))
        .sort((a, b) => a.nombre.localeCompare(b.nombre));
      return send(res, 200, { ok: true, contactos });
    }
    if (params.get("moderacion")) {
      if (user.rol !== "admin") throw new HttpError(403, "La moderación es solo del admin.");
      return send(res, 200, { ok: true, silenciados: await silenciados() });
    }
    const canal = params.get("canal") || "";
    const permiso = acceso(user, canal);
    if (!permiso.leer) throw new HttpError(403, permiso.soloAvisos ? "Podés mandar avisos a este cliente, pero no leer su conversación." : "No podés ver este chat.");
    const desde = params.get("desde") || "";
    if (desde && !ISO.test(desde)) throw new HttpError(400, "Fecha no válida (ISO).");
    const lista = await mensajesDe(canal, desde);
    const respuesta = { ok: true, canal, mensajes: user.rol === "cliente" ? lista.map((m) => paraCliente(m, user)) : lista };
    if (canal === CANAL_COMUNIDAD) {
      respuesta.reglas = REGLAS_COMUNIDAD;
      respuesta.silenciadoHasta = (await silenciados())[user.usuario] || null;
    }
    return send(res, 200, respuesta);
  }

  // POST
  const body = await readJson(req, 16 * 1024);

  // Moderación del admin.
  if (body.borrar !== undefined) {
    if (user.rol !== "admin") throw new HttpError(403, "Solo el admin puede borrar mensajes.");
    const id = String(body.borrar || "");
    if (!MENSAJE_ID.test(id)) throw new HttpError(400, "Mensaje no válido.");
    const previo = await store.get("mensajes", id);
    // Los directos son privados: el admin tampoco los toca.
    if (!previo || !accesoCanal(user, previo.canal).moderar) throw new HttpError(404, "Ese mensaje no existe.");
    return send(res, 200, { ok: true, mensaje: await borrarMensaje(id, user) });
  }
  if (body.silenciar !== undefined) {
    if (user.rol !== "admin") throw new HttpError(403, "Solo el admin puede silenciar.");
    const usuario = String(body.silenciar || "");
    if (!USUARIO.test(usuario) || usuario === user.usuario) throw new HttpError(400, "Usuario no válido.");
    const horas = body.horas === undefined ? 24 : Number(body.horas);
    if (!Number.isFinite(horas) || horas < 0 || horas > 24 * 90) throw new HttpError(400, "Las horas no son válidas (0 a 2160).");
    return send(res, 200, { ok: true, silenciados: await silenciar(usuario, horas, user) });
  }

  let canal = String(body.canal || "");
  const perroId = body.perroId ? String(body.perroId) : "";
  if (perroId && !PERRO.test(perroId)) throw new HttpError(400, "Perro no válido.");

  // Aviso al cliente de un perro sin conocer el cliente (paseador, ayudante, supervisor).
  const porPerro = canal === "cliente";
  if (canal === "cliente") {
    if (!perroId) throw new HttpError(400, "Falta el perro para avisarle al cliente.");
    const cliente = await clienteDelPerro(perroId);
    if (!cliente) throw new HttpError(404, "Ese perro no tiene un cliente vinculado todavía.");
    canal = `cliente_${cliente.id}`;
  }
  const permiso = acceso(user, canal);

  if (body.leido === true) {
    if (!permiso.leer) throw new HttpError(403, "No podés ver este chat.");
    const id = idLectura(user);
    const previo = (await store.get("lecturas", id)) || { id, col: "lecturas" };
    const ahora = new Date().toISOString();
    await store.put("lecturas", { ...previo, id, col: "lecturas", [canal]: ahora, actualizadoEn: ahora });
    return send(res, 200, { ok: true, canal, leidoHasta: ahora });
  }

  if (!permiso.escribir) throw new HttpError(403, "No podés escribir en este chat.");
  porUsuario.usar(user.usuario);
  const tipo = body.tipo || "texto";
  if (!TIPOS_MENSAJE.includes(tipo)) throw new HttpError(400, "Tipo de mensaje no válido.");
  if (permiso.soloAvisos && tipo !== "aviso") throw new HttpError(403, "Al cliente solo le podés mandar avisos.");
  if (user.rol === "cliente" && tipo !== "texto") throw new HttpError(400, "Podés mandar mensajes de texto.");
  const texto = limpiarTextoMensaje(body.texto);
  errorTexto(texto);

  // Comunidad de clientes: sin datos privados, sin adjuntos, y respetando el silencio del admin.
  if (permiso.tipo === "comunidad") {
    if (user.rol !== "admin") {
      const hasta = (await silenciados())[user.usuario];
      if (hasta) throw new HttpError(403, "El admin te silenció en la comunidad por un tiempo.");
    }
    if (tieneDatosPrivados(texto)) throw new HttpError(400, "Por seguridad, en la comunidad no se comparten teléfonos, correos ni direcciones.");
    if (body.adjuntoId || tipo === "foto") throw new HttpError(400, "En la comunidad solo se mandan mensajes de texto.");
  }

  // Cliente: el canal tiene que existir (cliente cargado).
  let cliente = null;
  if (permiso.tipo === "cliente") {
    cliente = await store.get("clientes", permiso.clienteId);
    if (!cliente) throw new HttpError(404, "Ese cliente no existe.");
  }
  // Directo: el otro usuario tiene que existir y estar activo.
  if (permiso.tipo === "directo") {
    const otro = await store.getUser(permiso.otro);
    if (!otro || !otro.activo) throw new HttpError(404, "Ese usuario no existe o no está activo.");
  }

  const adjuntoId = body.adjuntoId ? String(body.adjuntoId) : "";
  if (tipo === "foto" && !adjuntoId) throw new HttpError(400, "Falta la foto.");
  if (adjuntoId) {
    if (!ARCHIVO.test(adjuntoId)) throw new HttpError(400, "Adjunto no válido.");
    const archivo = await store.get("archivos", adjuntoId);
    if (!archivo || !puedeVerArchivoUsuario(user, archivo)) throw new HttpError(400, "No se encontró ese adjunto.");
    // Al cliente solo le llegan fotos de sus perros (es lo único que puede abrir).
    if (cliente && !(archivo.tipo === "foto" && perrosDeCliente(cliente).includes(archivo.perroId))) {
      throw new HttpError(400, "Al cliente solo se le pueden mandar fotos de sus perros.");
    }
  }
  if (cliente && perroId && !perrosDeCliente(cliente).includes(perroId)) {
    throw new HttpError(400, "Ese perro no es de este cliente.");
  }

  // En la comunidad no se nombran perros (ni propios ni ajenos): es un chat general.
  const enComunidad = permiso.tipo === "comunidad";
  const mensaje = await publicar({
    canal,
    texto,
    tipo,
    adjuntoId,
    perroId: enComunidad ? "" : perroId,
    perroNombre: enComunidad ? "" : limpiarTextoMensaje(body.perroNombre).slice(0, 60),
    autor: user,
  });
  // Quien avisa por perro y no ve clientes no recibe el canal (no se entera de qué cliente es).
  if (porPerro && permiso.soloAvisos) {
    return send(res, 201, { ok: true, mensaje: { id: mensaje.id, texto: mensaje.texto, tipo: mensaje.tipo, perroId: mensaje.perroId, creadoEn: mensaje.creadoEn } });
  }
  return send(res, 201, { ok: true, mensaje: user.rol === "cliente" ? paraCliente(mensaje, user) : mensaje });
});
