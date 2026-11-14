// /api/registros — datos compartidos entre usuarios.
// GET    ?col=paseos&desde=2026-11-13      lista (opcional: desde=fecha, prefijo=texto)
// POST   { col, id?, fecha?, ...datos }    crea o actualiza si llega id
// DELETE ?col=pedidos&id=...               borra
import { randomBytes } from "node:crypto";
import { handler, send, readJson, query, HttpError } from "./_lib/http.js";
import { requireUser, perrosDeCliente } from "./_lib/auth.js";
import { store } from "./_lib/store.js";
import { coleccion, puedeLeer, puedeEscribir, puedeVerArchivo, CLIENTE_LEE, CAMPOS_CLIENTE, AJUSTES_CLIENTE } from "./_lib/permisos.js";
import { avisosDePaseo, publicar, limpiarTextoMensaje } from "./_lib/mensajes.js";
import { sinHash, validarPerros } from "./_lib/clientes.js";

const ID = /^[a-z0-9][a-z0-9_.-]{0,100}$/i;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;
const PERRO_ID = /^[A-Za-z0-9_.-]{0,40}$/;
// avisosCliente: avisos automáticos ya enviados al cliente por ese paseo (lo maneja el servidor).
const RESERVADOS = ["col", "creadoPor", "creadoEn", "actualizadoPor", "actualizadoEn", "creadoPorNombre", "actualizadoPorNombre", "avisosCliente"];
const MAX_RECORD = 20 * 1024;
// Campos de autoría de `paseos` (quién marcó cada paso): los fija el servidor.
const AUTORIA_PASEO = ["horaRetiroPor", "horaPaseoPor", "horaEntregaPor", "horaIntegradoPor", "devuelvePor"];
// Colecciones donde un no-admin solo edita lo que cargó él (el coordinador administra los avisos).
const SOLO_PROPIOS = ["incidentes", "observaciones", "avisos"];
const escRegex = (texto) => String(texto).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Contaduría (`movimientos`): categorías fijas por tipo y largo máximo de cada texto.
// La misma lista está en src/views/admin.js (CONTA_CATEGORIAS): si cambia una, cambiá la otra.
export const CATEGORIAS_MOVIMIENTO = {
  ingreso: ["Planes", "Tienda", "Otros"],
  egreso: ["Pagos al equipo", "Insumos", "Transporte", "Alimento/tienda", "Impuestos y servicios", "Otros"],
};
const MOVIMIENTO_TEXTOS = { concepto: 120, medio: 40, nota: 300 };
const MONTO_MAX = 1e12;

function fechaReal(fecha) {
  if (typeof fecha !== "string" || !FECHA.test(fecha)) return false;
  const d = new Date(`${fecha}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === fecha;
}

// Deja solo los campos del movimiento y revisa el registro completo (lo que llega sobre lo que había).
// Así un cambio parcial (por ejemplo, marcar "En el Libro") tampoco puede dejar datos inválidos.
function validarMovimiento(datos, previo) {
  const out = {};
  for (const campo of ["fecha", "tipo", "categoria", "concepto", "monto", "medio", "nota", "pasadoAlLibro"]) {
    if (Object.prototype.hasOwnProperty.call(datos, campo)) out[campo] = datos[campo];
  }
  for (const [campo, max] of Object.entries(MOVIMIENTO_TEXTOS)) {
    if (out[campo] === undefined) continue;
    if (out[campo] === null) out[campo] = "";
    if (typeof out[campo] !== "string") throw new HttpError(400, `El campo ${campo} tiene que ser texto.`);
    out[campo] = out[campo].trim();
    if (out[campo].length > max) throw new HttpError(400, `El campo ${campo} es demasiado largo (máximo ${max} letras).`);
  }
  if (out.pasadoAlLibro !== undefined && typeof out.pasadoAlLibro !== "boolean") {
    throw new HttpError(400, "La marca del Libro tiene que ser sí o no.");
  }
  const final = { ...(previo || {}), ...out };
  if (!fechaReal(final.fecha)) throw new HttpError(400, "Fecha no válida (AAAA-MM-DD).");
  if (!Object.prototype.hasOwnProperty.call(CATEGORIAS_MOVIMIENTO, final.tipo)) {
    throw new HttpError(400, "El tipo tiene que ser ingreso o egreso.");
  }
  if (!CATEGORIAS_MOVIMIENTO[final.tipo].includes(final.categoria)) {
    throw new HttpError(400, "Elegí una categoría de la lista.");
  }
  if (typeof final.monto !== "number" || !Number.isFinite(final.monto) || final.monto <= 0 || final.monto > MONTO_MAX) {
    throw new HttpError(400, "El monto tiene que ser un número mayor que cero.");
  }
  if (out.monto !== undefined) out.monto = Math.round(out.monto * 100) / 100;
  if (typeof final.concepto !== "string" || final.concepto.trim().length < 2) {
    throw new HttpError(400, "Falta el concepto.");
  }
  if (!previo) {
    out.medio = out.medio || "";
    out.nota = out.nota || "";
    out.pasadoAlLibro = out.pasadoAlLibro === true;
  }
  return out;
}

// Reglas por registro (además del permiso por colección). Devuelve los datos ya ajustados.
function reglasPorRegistro(col, id, datos, previo, user) {
  const admin = user.rol === "admin";
  if (col === "movimientos") return validarMovimiento(datos, previo);
  if (col === "solicitudes" && !admin && user.rol !== "coordinador") {
    // El supervisor pide; el coordinador (o el admin) aplica o rechaza y responde.
    if (previo && (previo.creadoPor !== user.usuario || (previo.estado || "pendiente") !== "pendiente")) {
      throw new HttpError(403, "Solo podés cambiar tus pedidos mientras estén pendientes.");
    }
    datos.estado = "pendiente";
    if (previo) delete datos.respuesta;
    else datos.respuesta = "";
  }
  if (col === "checklists" && !admin) {
    const propio = new RegExp(`^\\d{4}-\\d{2}-\\d{2}_${escRegex(user.usuario)}_(manana|tarde)$`);
    if (!propio.test(id)) throw new HttpError(403, "Solo podés cargar tu propio checklist.");
  }
  if (SOLO_PROPIOS.includes(col) && !admin && previo && previo.creadoPor !== user.usuario) {
    if (!(col === "avisos" && user.rol === "coordinador")) {
      throw new HttpError(403, "Solo podés cambiar lo que cargaste vos.");
    }
  }
  if (col === "paseos") {
    for (const campo of AUTORIA_PASEO) {
      const nombre = `${campo}Nombre`;
      if (!Object.prototype.hasOwnProperty.call(datos, campo)) {
        // Sin el usuario no se acepta un nombre suelto.
        delete datos[nombre];
        continue;
      }
      const valor = String(datos[campo] ?? "").trim();
      if (!valor) {
        // Vacío = desmarcar.
        datos[campo] = "";
        datos[nombre] = "";
      } else if (previo && previo[campo] === valor) {
        // Reenvía lo que ya estaba (pasos anteriores, cola sin señal): queda el autor original.
        datos[campo] = previo[campo];
        datos[nombre] = previo[nombre] || "";
      } else {
        datos[campo] = user.usuario;
        datos[nombre] = user.nombre || "";
      }
    }
  }
  return datos;
}

export function nuevoId(fecha) {
  const now = new Date();
  const stamp = now.toISOString().slice(11, 19).replace(/:/g, "");
  return `${fecha || now.toISOString().slice(0, 10)}_${stamp}_${randomBytes(3).toString("hex")}`;
}

// El acceso del cliente (hash del enlace) no se devuelve ni se cambia por acá: solo por /api/clientes/*.
const sinHashDeAcceso = sinHash;

function soloCampos(registro, campos) {
  const out = {};
  for (const campo of campos) if (registro[campo] !== undefined) out[campo] = registro[campo];
  return out;
}

// Portal del cliente: solo paseos y fotos de SUS perros, con los campos que le corresponden.
async function listarParaCliente(user, col, desde) {
  if (!CLIENTE_LEE.includes(col)) throw new HttpError(403, "Tu usuario no puede ver estos datos.");
  const perros = new Set(user.perros || []);
  const esDelCliente = col === "ajustes"
    ? (r) => AJUSTES_CLIENTE.includes(r.id)
    : (r) => perros.has(r.perroId || (col === "fotos" ? r.id : ""));
  let registros = (await store.list(col)).filter(esDelCliente);
  if (desde) registros = registros.filter((r) => (r.fecha || r.creadoEn?.slice(0, 10) || "") >= desde);
  registros.sort((a, b) => String(b.actualizadoEn || b.creadoEn).localeCompare(String(a.actualizadoEn || a.creadoEn)));
  return registros.map((r) => soloCampos(r, CAMPOS_CLIENTE[col]));
}

// Ajustes del admin. "pagos": alias de transferencia (6 a 20 letras, números, punto o guion) e instrucciones.
const ALIAS = /^[a-z0-9.-]{6,20}$/;
function validarAjustes(id, datos) {
  if (id !== "pagos") throw new HttpError(400, "Ajuste desconocido.");
  const out = {};
  if (datos.alias !== undefined) {
    const alias = String(datos.alias ?? "").trim().toLowerCase();
    if (alias && !ALIAS.test(alias)) throw new HttpError(400, "El alias tiene que tener de 6 a 20 letras, números, puntos o guiones.");
    out.alias = alias;
  }
  if (datos.instrucciones !== undefined) {
    const texto = String(datos.instrucciones ?? "").replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
    if (texto.length > 400) throw new HttpError(400, "Las instrucciones son muy largas (máximo 400 letras).");
    out.instrucciones = texto;
  }
  return out;
}

function limpiar(datos, max) {
  const out = {};
  for (const [key, value] of Object.entries(datos || {})) {
    if (RESERVADOS.includes(key)) continue;
    if (!/^[a-zA-Z][a-zA-Z0-9_]{0,40}$/.test(key)) continue;
    out[key] = value;
  }
  if (JSON.stringify(out).length > (max || MAX_RECORD)) throw new HttpError(413, "El registro es demasiado grande.");
  return out;
}

export default handler({ GET: 1, POST: 1, DELETE: 1 }, async (req, res) => {
  const user = await requireUser(req);
  const params = query(req);

  if (user.rol === "cliente" && req.method !== "GET") throw new HttpError(403, "Tu usuario no puede cargar estos datos.");

  if (req.method === "GET") {
    const col = params.get("col");
    if (!coleccion(col)) throw new HttpError(400, "Colección desconocida.");
    if (params.get("desde") && !FECHA.test(params.get("desde"))) throw new HttpError(400, "Fecha no válida (AAAA-MM-DD).");
    if (user.rol === "cliente") return send(res, 200, { ok: true, registros: await listarParaCliente(user, col, params.get("desde")) });
    if (!puedeLeer(user.rol, col)) throw new HttpError(403, "Tu usuario no puede ver estos datos.");
    const desde = params.get("desde");
    const prefijo = params.get("prefijo") || "";
    if (desde && !FECHA.test(desde)) throw new HttpError(400, "Fecha no válida (AAAA-MM-DD).");
    if (prefijo && !ID.test(prefijo)) throw new HttpError(400, "Prefijo no válido.");
    let registros = await store.list(col, prefijo);
    // Los comprobantes de pago son solo del admin: los demás ni siquiera ven que existen.
    if (col === "archivos") registros = registros.filter((r) => puedeVerArchivo(user.rol, r));
    if (desde) registros = registros.filter((r) => (r.fecha || r.creadoEn?.slice(0, 10) || "") >= desde);
    if (col === "clientes") registros = registros.map(sinHashDeAcceso);
    registros.sort((a, b) => String(b.actualizadoEn || b.creadoEn).localeCompare(String(a.actualizadoEn || a.creadoEn)));
    return send(res, 200, { ok: true, registros });
  }

  if (req.method === "POST") {
    const body = await readJson(req);
    const col = body.col;
    if (!coleccion(col)) throw new HttpError(400, "Colección desconocida.");
    // Los archivos solo se crean subiéndolos por /api/archivos (así nadie inventa a qué archivo apunta).
    if (col === "archivos") throw new HttpError(400, "Los archivos se suben desde /api/archivos.");
    // Rutas y plantillas: cada parada con id de perro de formato seguro (o vacío) y textos acotados.
    if ((col === "rutas" || col === "plantillas") && body.paradas !== undefined) {
      if (!Array.isArray(body.paradas) || body.paradas.length > 60) throw new HttpError(400, "Las paradas de la ruta no son válidas.");
      for (const parada of body.paradas) {
        if (!parada || typeof parada !== "object") throw new HttpError(400, "Las paradas de la ruta no son válidas.");
        if (parada.perroId && !/^[A-Za-z0-9_.-]{1,40}$/.test(String(parada.perroId))) throw new HttpError(400, "Hay un perro con un código no válido en la ruta.");
        if (parada.hora && !/^\d{1,2}:\d{2}$/.test(String(parada.hora))) throw new HttpError(400, "Hay una hora no válida en la ruta.");
      }
    }
    // Miniatura de la foto del perro: solo una imagen embebida, nada más.
    if (col === "fotos" && body.miniatura && !/^data:image\/(jpeg|webp|png);base64,[A-Za-z0-9+/=]+$/.test(String(body.miniatura))) {
      throw new HttpError(400, "La miniatura no es una imagen válida.");
    }
    // Paradas de rutas y plantillas: el perroId se usa como identificador en las páginas.
    if ((col === "rutas" || col === "plantillas") && body.paradas !== undefined) {
      const paradas = body.paradas;
      const valida = (p) => p && typeof p === "object" && (p.perroId == null || PERRO_ID.test(String(p.perroId)));
      if (!Array.isArray(paradas) || !paradas.every(valida)) throw new HttpError(400, "Las paradas tienen un perro no válido.");
    }
    if (!puedeEscribir(user.rol, col)) throw new HttpError(403, "Tu usuario no puede cargar estos datos.");
    if (body.fecha && !FECHA.test(body.fecha)) throw new HttpError(400, "Fecha no válida (AAAA-MM-DD).");
    if (coleccion(col).porFecha && !body.fecha) throw new HttpError(400, "Falta la fecha.");
    const id = body.id ? String(body.id) : nuevoId(body.fecha);
    if (!ID.test(id)) throw new HttpError(400, "Identificador no válido.");

    const ahora = new Date().toISOString();
    const previo = body.id ? await store.get(col, id) : null;
    // soloCrear: cargar algo nuevo sin pisar lo que ya está guardado (por ejemplo, una ruta de la planilla).
    const soloCrear = body.soloCrear === true;
    delete body.soloCrear;
    if (soloCrear && previo) throw new HttpError(409, "Ya estaba cargada: no se pisó lo guardado.");
    let datos = reglasPorRegistro(col, id, limpiar(body, coleccion(col).maxBytes), previo, user);
    if (col === "ajustes") datos = validarAjustes(id, datos);
    // El acceso del cliente (enlace) y la aprobación de Juan solo se cambian por /api/clientes/*.
    if (col === "clientes") {
      delete datos.acceso;
      delete datos.aprobado;
      // Perros del cliente: códigos válidos y cada perro de UN solo cliente (si no, el cliente
      // vería paseos y fotos de perros ajenos y los avisos irían a otra familia).
      if (datos.perros !== undefined) {
        datos.perros = validarPerros(datos.perros);
        const otros = (await store.list("clientes")).filter((c) => c.id !== id && c.estado !== "baja");
        const repetido = datos.perros.find((perro) => otros.some((c) => perrosDeCliente(c).includes(perro)));
        if (repetido) throw new HttpError(409, `El perro ${repetido} ya es de otro cliente.`);
      }
    }
    const registro = {
      ...(previo || {}),
      ...datos,
      id,
      col,
      creadoPor: previo?.creadoPor || user.usuario,
      creadoPorNombre: previo?.creadoPorNombre || user.nombre,
      creadoEn: previo?.creadoEn || ahora,
      actualizadoPor: user.usuario,
      actualizadoPorNombre: user.nombre,
      actualizadoEn: ahora,
    };
    // Cliente dado de baja: su enlace se corta en el servidor (si vuelve, Juan genera uno nuevo).
    if (col === "clientes" && registro.estado === "baja" && registro.acceso?.activo) {
      registro.acceso = { ...registro.acceso, activo: false, revocadoEn: ahora, revocadoPor: user.usuario };
    }
    // Paseos: aviso automático al cliente (retiro, paseo con foto, entrega). Si falla, el paseo se guarda igual.
    if (col === "paseos") {
      try {
        const enviados = await avisosDePaseo(previo, registro);
        if (enviados.length) registro.avisosCliente = enviados;
      } catch (error) {
        console.error("[registros] no se pudo avisar al cliente", error);
      }
    }
    await store.put(col, registro);
    // Coordinación inmediata: un incidente nuevo avisa en el chat "Calle" (paseadores, ayudantes,
    // supervisores, coordinador y admin) y un pedido de cambio nuevo avisa en "Coordinación".
    // Si el aviso falla, el registro ya quedó guardado.
    if (!previo && (col === "incidentes" || col === "solicitudes")) {
      try {
        await avisoAlEquipo(col, registro, user);
      } catch (error) {
        console.error("[registros] no se pudo avisar al equipo", error);
      }
    }
    return send(res, previo ? 200 : 201, { ok: true, registro: col === "clientes" ? sinHashDeAcceso(registro) : registro });
  }

  // DELETE
  const col = params.get("col");
  const id = params.get("id");
  if (!coleccion(col)) throw new HttpError(400, "Colección desconocida.");
  if (!id || !ID.test(id)) throw new HttpError(400, "Identificador no válido.");
  // Contaduría: quien no la puede cargar ni siquiera se entera de si un movimiento existe.
  if (col === "movimientos" && !puedeEscribir(user.rol, col)) {
    throw new HttpError(403, "Tu usuario no puede borrar estos datos.");
  }
  const previo = await store.get(col, id);
  if (!previo) return send(res, 200, { ok: true, borrado: false });
  // Los archivos los borra solo el admin (lo guardado en Drive o Vercel no se borra desde acá).
  if (col === "archivos" && user.rol !== "admin") throw new HttpError(403, "Los archivos los borra solo el admin.");
  // Un pedido de cambio ya aplicado o rechazado queda como registro: solo el admin lo borra.
  if (col === "solicitudes" && user.rol !== "admin" && (previo.estado || "pendiente") !== "pendiente") {
    throw new HttpError(403, "Ese pedido ya se respondió: no se puede borrar.");
  }
  const esDueno = previo.creadoPor === user.usuario && Date.now() - Date.parse(previo.creadoEn) < 24 * 3600 * 1000;
  if (user.rol !== "admin" && !(esDueno && puedeEscribir(user.rol, col))) {
    throw new HttpError(403, "Solo el admin, o quien lo cargó en las últimas 24 horas, puede borrarlo.");
  }
  await store.remove(col, id);
  return send(res, 200, { ok: true, borrado: true });
});

// Texto corto y armado en el servidor (los campos se limpian: sin HTML y con largo máximo).
async function avisoAlEquipo(col, registro, user) {
  const corto = (valor, max) => limpiarTextoMensaje(Array.isArray(valor) ? valor.join(", ") : valor).slice(0, max);
  if (col === "incidentes") {
    const perro = corto(registro.perroNombre, 80);
    const tipos = corto(registro.tipos || registro.tipo, 120);
    const riesgo = corto(registro.riesgo, 20).toLowerCase();
    const urgente = /alto/.test(riesgo) ? "URGENTE · " : "";
    const texto = `${urgente}Incidente${perro ? ` con ${perro}` : ""}${tipos ? `: ${tipos}` : ""}${riesgo ? ` · riesgo ${riesgo}` : ""}. Lo reportó ${user.nombre}. El detalle está en Incidentes.`;
    await publicar({ canal: "calle", texto, tipo: "aviso", autor: user, automatico: true, clave: `incidente:${registro.id}` });
    return;
  }
  // Sin "URGENTE" repetido (ya va adelante) y sin códigos internos de ruta.
  const titulo = corto(registro.titulo || registro.tipo, 160)
    .replace(/^URGENTE\s*·\s*/i, "")
    .replace(/\bPJ_(\d+)[MT]\b/gi, "Ruta $1");
  const texto = `${registro.urgente ? "URGENTE · " : ""}Pedido de cambio de ${user.nombre}: ${titulo || "ver detalle"}. Respondelo en Pedidos.`;
  await publicar({ canal: "coordinacion", texto, tipo: "aviso", autor: user, automatico: true, clave: `solicitud:${registro.id}` });
}

