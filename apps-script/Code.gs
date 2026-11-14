/**
 * Paseos Juan — puente entre la app web y la planilla "Paseos Juan — Datos de la app".
 *
 * Cómo se instala (una sola vez, lo hace Juan):
 * 1. Abrir la planilla → Extensiones → Apps Script.
 * 2. Pegar este archivo completo (reemplazando lo que haya) y guardar.
 * 3. En "Configuración del proyecto" → "Propiedades del script", agregar:
 *      API_KEY = (la clave que figura en la guía de instalación)
 * 4. Implementar → Nueva implementación → Tipo: Aplicación web.
 *      Ejecutar como: Yo. Quién tiene acceso: Cualquier usuario.
 * 5. Autorizar y copiar la URL de la aplicación web.
 *
 * Seguridad: el script solo responde si el pedido trae la API_KEY correcta. La clave vive
 * en las propiedades del script y en Vercel, nunca en el código ni en la planilla.
 * Cada colección es una pestaña. Las columnas fijas sirven para leer la planilla a mano;
 * la columna "datos" guarda el registro completo.
 */

var COLUMNAS = ["id", "fecha", "resumen", "creadoPor", "actualizadoEn", "datos"];
var COLUMNAS_USUARIOS = ["usuario", "nombre", "rol", "activo", "ultimoIngreso", "datos"];
var HOJA_USUARIOS = "Usuarios";

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || "{}");
    var clave = PropertiesService.getScriptProperties().getProperty("API_KEY");
    if (!clave || body.key !== clave) return responder({ ok: false, error: "Clave incorrecta." });
    var acciones = {
      getUser: function () { return buscarUsuario(body.usuario); },
      putUser: function () { return guardarUsuario(body.user); },
      patchUser: function () { return parcharUsuario(body.usuario, body.campos || {}); },
      registrarFallo: function () { return registrarFallo(body.usuario, body.max, body.minutos); },
      listUsers: function () { return listarUsuarios(); },
      deleteUser: function () { return borrarFila(HOJA_USUARIOS, body.usuario); },
      get: function () { return obtener(body.col, body.id); },
      put: function () { return guardar(body.col, body.record); },
      list: function () { return listar(body.col, body.prefix || ""); },
      remove: function () { return borrarFila(nombreHoja(body.col), body.id); },
      uploadFile: function () { return subirArchivo(body); },
      getFile: function () { return leerArchivo(body.fileId); }
    };
    if (!acciones[body.action]) return responder({ ok: false, error: "Acción desconocida." });
    return responder({ ok: true, result: acciones[body.action]() });
  } catch (error) {
    return responder({ ok: false, error: String(error && error.message || error) });
  }
}

function doGet() {
  return responder({ ok: true, result: "Paseos Juan: el puente con la planilla está funcionando." });
}

function responder(objeto) {
  return ContentService.createTextOutput(JSON.stringify(objeto)).setMimeType(ContentService.MimeType.JSON);
}

function nombreHoja(col) {
  if (!/^[a-z][a-z0-9_]{1,30}$/.test(String(col))) throw new Error("Colección no válida.");
  return col.charAt(0).toUpperCase() + col.slice(1);
}

function hoja(nombre, columnas) {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var h = libro.getSheetByName(nombre);
  if (!h) {
    h = libro.insertSheet(nombre);
    h.getRange(1, 1, 1, columnas.length).setValues([columnas]).setFontWeight("bold");
    h.setFrozenRows(1);
    h.hideColumns(columnas.length);
  }
  return h;
}

function filaDe(h, id) {
  if (h.getLastRow() < 2) return 0;
  var celda = h.getRange(2, 1, h.getLastRow() - 1, 1).createTextFinder(String(id)).matchEntireCell(true).findNext();
  return celda ? celda.getRow() : 0;
}

function conBloqueo(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    return fn();
  } finally {
    lock.releaseLock();
  }
}

// Texto que empieza con = + - @ (o tab/enter) Sheets lo toma como fórmula. Con un apóstrofo
// adelante queda como texto común (el apóstrofo no se ve en la celda).
function celda(v) {
  v = String(v == null ? "" : v);
  return /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function resumen(r) {
  var partes = [r.titulo, r.perroNombre || r.perro, r.estado, r.tipo, r.detalle, r.descripcion].filter(function (x) { return x; });
  return String(partes.join(" · ")).slice(0, 200);
}

function guardar(col, registro) {
  return conBloqueo(function () {
    var h = hoja(nombreHoja(col), COLUMNAS);
    var fila = filaDe(h, registro.id);
    // Si dos personas guardan el mismo registro a la vez, se combinan los campos (gana lo último)
    // en lugar de que uno borre lo que cargó el otro.
    if (fila) {
      try {
        var previo = JSON.parse(h.getRange(fila, COLUMNAS.length).getValue());
        var combinado = {};
        Object.keys(previo).forEach(function (k) { combinado[k] = previo[k]; });
        Object.keys(registro).forEach(function (k) { combinado[k] = registro[k]; });
        registro = combinado;
      } catch (e) {}
    }
    var valores = [[celda(registro.id), celda(registro.fecha || ""), celda(resumen(registro)), celda(registro.creadoPorNombre || registro.creadoPor || ""), celda(registro.actualizadoEn || ""), JSON.stringify(registro)]];
    if (fila) h.getRange(fila, 1, 1, COLUMNAS.length).setValues(valores);
    else h.appendRow(valores[0]);
    return true;
  });
}

function obtener(col, id) {
  var h = hoja(nombreHoja(col), COLUMNAS);
  var fila = filaDe(h, id);
  return fila ? JSON.parse(h.getRange(fila, COLUMNAS.length).getValue()) : null;
}

function listar(col, prefijo) {
  var h = hoja(nombreHoja(col), COLUMNAS);
  if (h.getLastRow() < 2) return [];
  var filas = h.getRange(2, 1, h.getLastRow() - 1, COLUMNAS.length).getValues();
  var out = [];
  for (var i = 0; i < filas.length; i++) {
    if (!filas[i][0] || String(filas[i][0]).indexOf(prefijo) !== 0) continue;
    try { out.push(JSON.parse(filas[i][COLUMNAS.length - 1])); } catch (e) {}
  }
  return out;
}

function borrarFila(nombre, id) {
  return conBloqueo(function () {
    var h = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombre);
    if (!h) return false;
    var fila = filaDe(h, id);
    if (fila) h.deleteRow(fila);
    return Boolean(fila);
  });
}

function buscarUsuario(usuario) {
  var h = hoja(HOJA_USUARIOS, COLUMNAS_USUARIOS);
  var fila = filaDe(h, usuario);
  return fila ? JSON.parse(h.getRange(fila, COLUMNAS_USUARIOS.length).getValue()) : null;
}

function filaUsuario(u) {
  return [celda(u.usuario), celda(u.nombre), celda(u.rol), u.activo ? "Sí" : "No", celda(u.ultimoIngreso || ""), JSON.stringify(u)];
}

function guardarUsuario(u) {
  return conBloqueo(function () {
    var h = hoja(HOJA_USUARIOS, COLUMNAS_USUARIOS);
    var valores = [filaUsuario(u)];
    var fila = filaDe(h, u.usuario);
    if (fila) h.getRange(fila, 1, 1, COLUMNAS_USUARIOS.length).setValues(valores);
    else h.appendRow(valores[0]);
    return true;
  });
}

// Cambia solo algunos campos del usuario, leyendo y escribiendo adentro del bloqueo.
// Así un ingreso en curso no deshace una desactivación o un cambio de PIN del admin.
function parcharUsuario(usuario, campos) {
  return conBloqueo(function () {
    var h = hoja(HOJA_USUARIOS, COLUMNAS_USUARIOS);
    var fila = filaDe(h, usuario);
    if (!fila) return null;
    var u = JSON.parse(h.getRange(fila, COLUMNAS_USUARIOS.length).getValue());
    Object.keys(campos).forEach(function (k) { if (k !== "usuario") u[k] = campos[k]; });
    h.getRange(fila, 1, 1, COLUMNAS_USUARIOS.length).setValues([filaUsuario(u)]);
    return u;
  });
}

// Suma un intento de PIN de forma atómica (se llama antes de comparar; el ingreso correcto lo
// vuelve a 0). Al llegar a `max` bloquea `minutos`. Devuelve { bloqueado: true } si ya estaba
// bloqueado (y entonces no cuenta nada).
function registrarFallo(usuario, max, minutos) {
  max = Math.max(1, Math.min(20, Number(max) || 5));
  minutos = Math.max(1, Math.min(1440, Number(minutos) || 15));
  return conBloqueo(function () {
    var h = hoja(HOJA_USUARIOS, COLUMNAS_USUARIOS);
    var fila = filaDe(h, usuario);
    if (!fila) return { bloqueado: false };
    var u = JSON.parse(h.getRange(fila, COLUMNAS_USUARIOS.length).getValue());
    var ahora = Date.now();
    if (u.bloqueadoHasta && Date.parse(u.bloqueadoHasta) > ahora) return { bloqueado: true };
    u.fallos = (Number(u.fallos) || 0) + 1;
    if (u.fallos >= max) {
      u.fallos = 0;
      u.bloqueadoHasta = new Date(ahora + minutos * 60000).toISOString();
    }
    h.getRange(fila, 1, 1, COLUMNAS_USUARIOS.length).setValues([filaUsuario(u)]);
    return { bloqueado: false };
  });
}

function listarUsuarios() {
  var h = hoja(HOJA_USUARIOS, COLUMNAS_USUARIOS);
  if (h.getLastRow() < 2) return [];
  return h.getRange(2, COLUMNAS_USUARIOS.length, h.getLastRow() - 1, 1).getValues()
    .map(function (f) { try { return JSON.parse(f[0]); } catch (e) { return null; } })
    .filter(function (x) { return x; });
}

// ---------- Archivos en Google Drive ----------
// Todo queda dentro de la carpeta "Paseos Juan — Archivos de la app", junto a esta planilla.
// Los archivos son privados (solo Juan). La app los muestra a quien tiene permiso, a través de este script.
var CARPETA_RAIZ = "Paseos Juan — Archivos de la app";
var CARPETAS_PERMITIDAS = ["Carnets de vacunas", "Comprobantes de pago", "Documentos", "Fotos"];

function carpetaRaiz() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("CARPETA_RAIZ_ID");
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) {}
  }
  var archivoPlanilla = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId());
  var padres = archivoPlanilla.getParents();
  var donde = padres.hasNext() ? padres.next() : DriveApp.getRootFolder();
  var existentes = donde.getFoldersByName(CARPETA_RAIZ);
  var raiz = existentes.hasNext() ? existentes.next() : donde.createFolder(CARPETA_RAIZ);
  props.setProperty("CARPETA_RAIZ_ID", raiz.getId());
  return raiz;
}

function subcarpeta(nombre) {
  if (CARPETAS_PERMITIDAS.indexOf(nombre) === -1) nombre = "Documentos";
  var raiz = carpetaRaiz();
  var it = raiz.getFoldersByName(nombre);
  return it.hasNext() ? it.next() : raiz.createFolder(nombre);
}

function subirArchivo(b) {
  var tipos = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  if (tipos.indexOf(b.mime) === -1) throw new Error("Tipo de archivo no permitido.");
  var blob = Utilities.newBlob(Utilities.base64Decode(b.base64), b.mime, String(b.nombre || b.id).slice(0, 150));
  var archivo = subcarpeta(b.carpeta).createFile(blob);
  archivo.setDescription("Subido desde la app de Paseos Juan. Id: " + b.id);
  return { fileId: archivo.getId(), url: archivo.getUrl() };
}

// Solo devuelve archivos que estén dentro de la carpeta de la app (nunca otro archivo del Drive).
function leerArchivo(fileId) {
  var archivo = DriveApp.getFileById(String(fileId));
  var raizId = carpetaRaiz().getId();
  var padres = archivo.getParents();
  var dentro = false;
  while (padres.hasNext() && !dentro) {
    var padre = padres.next();
    if (padre.getId() === raizId) dentro = true;
    var abuelos = padre.getParents();
    while (abuelos.hasNext() && !dentro) {
      if (abuelos.next().getId() === raizId) dentro = true;
    }
  }
  if (!dentro) throw new Error("Ese archivo no es de la app.");
  return { base64: Utilities.base64Encode(archivo.getBlob().getBytes()) };
}
