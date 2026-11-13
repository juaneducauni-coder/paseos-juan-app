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
      listUsers: function () { return listarUsuarios(); },
      deleteUser: function () { return borrarFila(HOJA_USUARIOS, body.usuario); },
      get: function () { return obtener(body.col, body.id); },
      put: function () { return guardar(body.col, body.record); },
      list: function () { return listar(body.col, body.prefix || ""); },
      remove: function () { return borrarFila(nombreHoja(body.col), body.id); }
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

function resumen(r) {
  var partes = [r.titulo, r.perroNombre || r.perro, r.estado, r.tipo, r.detalle, r.descripcion].filter(function (x) { return x; });
  return String(partes.join(" · ")).slice(0, 200);
}

function guardar(col, registro) {
  return conBloqueo(function () {
    var h = hoja(nombreHoja(col), COLUMNAS);
    var valores = [[registro.id, registro.fecha || "", resumen(registro), registro.creadoPorNombre || registro.creadoPor || "", registro.actualizadoEn || "", JSON.stringify(registro)]];
    var fila = filaDe(h, registro.id);
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

function guardarUsuario(u) {
  return conBloqueo(function () {
    var h = hoja(HOJA_USUARIOS, COLUMNAS_USUARIOS);
    var valores = [[u.usuario, u.nombre, u.rol, u.activo ? "Sí" : "No", u.ultimoIngreso || "", JSON.stringify(u)]];
    var fila = filaDe(h, u.usuario);
    if (fila) h.getRange(fila, 1, 1, COLUMNAS_USUARIOS.length).setValues(valores);
    else h.appendRow(valores[0]);
    return true;
  });
}

function listarUsuarios() {
  var h = hoja(HOJA_USUARIOS, COLUMNAS_USUARIOS);
  if (h.getLastRow() < 2) return [];
  return h.getRange(2, COLUMNAS_USUARIOS.length, h.getLastRow() - 1, 1).getValues()
    .map(function (f) { try { return JSON.parse(f[0]); } catch (e) { return null; } })
    .filter(function (x) { return x; });
}
