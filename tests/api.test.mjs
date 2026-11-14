// Pruebas del servidor con almacenamiento en archivos temporales.
// Correr: npm run test:api
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { Readable } from "node:stream";

const dir = mkdtempSync(path.join(tmpdir(), "pj-api-"));
process.env.DATA_DIR = dir;
delete process.env.VERCEL;
delete process.env.BLOB_READ_WRITE_TOKEN;
delete process.env.SHEETS_API_URL;

const routes = {
  setup: (await import("../api/_rutas/auth/setup.js")).default,
  login: (await import("../api/_rutas/auth/login.js")).default,
  me: (await import("../api/_rutas/auth/me.js")).default,
  pin: (await import("../api/_rutas/auth/pin.js")).default,
  usuarios: (await import("../api/usuarios.js")).default,
  registros: (await import("../api/registros.js")).default,
  evaluacion: (await import("../api/publico/evaluacion.js")).default,
  archivos: (await import("../api/archivos.js")).default,
  google: (await import("../api/_rutas/auth/google.js")).default,
  mensajes: (await import("../api/mensajes.js")).default,
  authCliente: (await import("../api/_rutas/auth/cliente.js")).default,
  acceso: (await import("../api/_rutas/clientes/acceso.js")).default,
  aprobar: (await import("../api/_rutas/clientes/aprobar.js")).default,
};
const { store } = await import("../api/_lib/store.js");

after(() => rmSync(dir, { recursive: true, force: true }));

// Cada pedido usa su propia IP (salvo que se pase una) para no chocar con los límites por conexión.
let ipN = 0;
const nuevaIp = () => { ipN += 1; return `10.0.${Math.floor(ipN / 250)}.${ipN % 250}`; };

async function call(route, { method = "GET", url = "/", body, token, ip } = {}) {
  const req = Readable.from(body ? [JSON.stringify(body)] : []);
  req.method = method;
  req.url = url;
  req.headers = token ? { authorization: `Bearer ${token}` } : {};
  req.headers["x-forwarded-for"] = ip || nuevaIp();
  req.socket = { remoteAddress: "127.0.0.1" };
  return new Promise((resolve) => {
    const res = {
      statusCode: 200,
      headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      end(text) { resolve({ status: this.statusCode, body: JSON.parse(text) }); },
    };
    routes[route](req, res);
  });
}

async function callRaw(route, { url = "/", token } = {}) {
  const req = Readable.from([]);
  req.method = "GET";
  req.url = url;
  req.headers = token ? { authorization: `Bearer ${token}` } : {};
  return new Promise((resolve) => {
    const res = { statusCode: 200, headers: {}, setHeader(k, v) { this.headers[k] = v; }, end(body) { resolve({ status: this.statusCode, headers: this.headers, body }); } };
    routes[route](req, res);
  });
}

// PNG de 1x1 válido.
const PNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

let admin;
let paseador;

test("primer ingreso: pide configuración y crea admin", async () => {
  const me = await call("me");
  assert.equal(me.body.necesitaConfiguracion, true);
  const weak = await call("setup", { method: "POST", body: { nombre: "Juan", usuario: "juan", pin: "111111" } });
  assert.equal(weak.status, 400);
  const ok = await call("setup", { method: "POST", body: { nombre: "Juan Buitrago", usuario: "Juan", pin: "482915" } });
  assert.equal(ok.status, 201);
  assert.equal(ok.body.user.rol, "admin");
  admin = ok.body.token;
  const again = await call("setup", { method: "POST", body: { nombre: "Otro", usuario: "otro", pin: "482916" } });
  assert.equal(again.status, 409);
});

test("admin crea paseador y el paseador ingresa", async () => {
  const create = await call("usuarios", { method: "POST", token: admin, body: { usuario: "sebastian", nombre: "Sebastián", rol: "paseador", pin: "730264" } });
  assert.equal(create.status, 201);
  const bad = await call("login", { method: "POST", body: { usuario: "sebastian", pin: "000000" } });
  assert.equal(bad.status, 401);
  const good = await call("login", { method: "POST", body: { usuario: "Sebastián", pin: "730264" } });
  assert.equal(good.status, 200);
  paseador = good.body.token;
  const me = await call("me", { token: paseador });
  assert.equal(me.body.user.rol, "paseador");
});

test("permisos: el paseador no administra usuarios ni ve pagos", async () => {
  assert.equal((await call("usuarios", { token: paseador })).status, 403);
  assert.equal((await call("registros", { url: "/?col=pagos", token: paseador })).status, 403);
  assert.equal((await call("registros", { url: "/?col=paseos" })).status, 401);
});

test("registros compartidos: el paseador carga y el admin lo ve", async () => {
  const id = "2026-11-13_PJ-001_manana";
  const post = await call("registros", { method: "POST", token: paseador, body: { col: "paseos", id, fecha: "2026-11-13", perroId: "PJ-001", estado: "retirado", creadoPor: "trampa" } });
  assert.equal(post.status, 201);
  assert.equal(post.body.registro.creadoPor, "sebastian");
  const upd = await call("registros", { method: "POST", token: paseador, body: { col: "paseos", id, fecha: "2026-11-13", estado: "entregado" } });
  assert.equal(upd.status, 200);
  assert.equal(upd.body.registro.perroId, "PJ-001");
  const list = await call("registros", { url: "/?col=paseos&desde=2026-11-13", token: admin });
  assert.equal(list.body.registros.length, 1);
  assert.equal(list.body.registros[0].estado, "entregado");
  const sinFecha = await call("registros", { method: "POST", token: paseador, body: { col: "paseos", estado: "x" } });
  assert.equal(sinFecha.status, 400);
});

test("formulario público crea un pedido que ve el admin", async () => {
  const falta = await call("evaluacion", { method: "POST", body: { perro: "Luna" } });
  assert.equal(falta.status, 400);
  const ok = await call("evaluacion", { method: "POST", body: { perro: "Luna", responsable: "Ana", telefono: "1100000000" } });
  assert.equal(ok.status, 201);
  const pedidos = await call("registros", { url: "/?col=pedidos", token: admin });
  assert.equal(pedidos.body.registros.length, 1);
  assert.equal(pedidos.body.registros[0].estado, "nuevo");
});

test("archivos: subir carnet, abrirlo y bloquear lo que no corresponde", async () => {
  const sube = await call("archivos", { method: "POST", token: admin, body: { tipo: "carnet de vacunas", perroNombre: "Kiara", perroId: "PJ-002", archivo: { nombre: "carnet.png", mime: "image/png", base64: PNG } } });
  assert.equal(sube.status, 201);
  assert.equal(sube.body.registro.tipo, "carnet de vacunas");
  const baja = await callRaw("archivos", { url: `/?id=${sube.body.registro.id}`, token: admin });
  assert.equal(baja.status, 200);
  assert.equal(baja.headers["Content-Type"], "image/png");
  const falso = await call("archivos", { method: "POST", token: admin, body: { tipo: "foto", archivo: { nombre: "x.png", mime: "image/png", base64: Buffer.from("no soy png").toString("base64") } } });
  assert.equal(falso.status, 400);
  const forjado = await call("registros", { method: "POST", token: admin, body: { col: "archivos", id: "x", driveId: "otro" } });
  assert.equal(forjado.status, 400);
  await call("archivos", { method: "POST", token: admin, body: { tipo: "comprobante de pago", archivo: { nombre: "c.png", mime: "image/png", base64: PNG } } });
  await call("usuarios", { method: "POST", token: admin, body: { usuario: "coordina", nombre: "Coordinación", rol: "coordinador", pin: "736195", crear: true } });
  const coord = (await call("login", { method: "POST", body: { usuario: "coordina", pin: "736195" } })).body.token;
  const listaCoord = await call("registros", { url: "/?col=archivos", token: coord });
  assert.equal(listaCoord.body.registros.some((r) => r.tipo === "comprobante de pago"), false);
  assert.equal(listaCoord.body.registros.some((r) => r.tipo === "carnet de vacunas"), true);
  const paseadorVe = await callRaw("archivos", { url: `/?id=${sube.body.registro.id}`, token: paseador });
  assert.equal(paseadorVe.status, 403);
  // El tutor puede mandar el carnet desde la web aunque no use Google (lo pidió Juan).
  const web = await call("evaluacion", { method: "POST", body: { perro: "Toby", responsable: "Ana", telefono: "1100000001", carnet: { nombre: "c.png", mime: "image/png", base64: PNG } } });
  assert.equal(web.status, 201);
  assert.equal(web.body.carnet, true);
});

test("fotos de perros: todo el equipo las ve, carnets no", async () => {
  const foto = await call("archivos", { method: "POST", token: admin, body: { tipo: "foto", perroId: "PJ-001", perroNombre: "Pistacho", archivo: { nombre: "p.png", mime: "image/png", base64: PNG } } });
  assert.equal(foto.status, 201);
  const mini = await call("registros", { method: "POST", token: paseador, body: { col: "fotos", id: "PJ-001", perroId: "PJ-001", miniatura: `data:image/png;base64,${PNG}`, archivoId: foto.body.registro.id } });
  assert.equal(mini.status, 201);
  const mala = await call("registros", { method: "POST", token: paseador, body: { col: "fotos", id: "PJ-002", miniatura: "javascript:alert(1)" } });
  assert.equal(mala.status, 400);
  const lista = await call("registros", { url: "/?col=archivos", token: paseador });
  assert.ok(lista.body.registros.length >= 1);
  assert.ok(lista.body.registros.every((r) => r.tipo === "foto"));
  const abre = await callRaw("archivos", { url: `/?id=${foto.body.registro.id}`, token: paseador });
  assert.equal(abre.status, 200);
});

test("entrar con Google: solo cuentas vinculadas y del ID de cliente correcto", async () => {
  process.env.GOOGLE_CLIENT_ID = "cliente-prueba.apps.googleusercontent.com";
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const token = new URL(url).searchParams.get("id_token");
    const base = { iss: "https://accounts.google.com", exp: String(Math.floor(Date.now() / 1000) + 600), email_verified: "true", name: "Prueba" };
    const datos = {
      "tok-juan": { ...base, aud: process.env.GOOGLE_CLIENT_ID, email: "Juan@Gmail.com" },
      "tok-otro": { ...base, aud: process.env.GOOGLE_CLIENT_ID, email: "nadie@gmail.com" },
      "tok-aud": { ...base, aud: "otra-app", email: "juan@gmail.com" },
    }[token];
    return { ok: Boolean(datos), json: async () => datos || { error_description: "invalid" } };
  };
  try {
    const vinc = await call("usuarios", { method: "POST", token: admin, body: { usuario: "juan", google: "juan@gmail.com" } });
    assert.equal(vinc.status, 200);
    const ok = await call("google", { method: "POST", body: { credential: "tok-juan" } });
    assert.equal(ok.status, 200);
    assert.equal(ok.body.user.usuario, "juan");
    assert.equal((await call("google", { method: "POST", body: { credential: "tok-otro" } })).status, 403);
    assert.equal((await call("google", { method: "POST", body: { credential: "tok-aud" } })).status, 401);
    assert.equal((await call("google", { method: "POST", body: { credential: "falso" } })).status, 401);
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.GOOGLE_CLIENT_ID;
  }
});

// ---------- Mensajes y portal del cliente ----------
const hoyAR = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Argentina/Buenos_Aires", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const tokenDe = async (usuario, pin) => (await call("login", { method: "POST", body: { usuario, pin } })).body.token;
let coordMsj;
let supMsj;
let mktMsj;

test("mensajes: canales de grupo según el rol", async () => {
  coordMsj = await tokenDe("coordina", "736195");
  await call("usuarios", { method: "POST", token: admin, body: { usuario: "sole", nombre: "Sole", rol: "supervisor", pin: "620481", crear: true } });
  await call("usuarios", { method: "POST", token: admin, body: { usuario: "mateo", nombre: "Mateo", rol: "marketing", pin: "620482", crear: true } });
  supMsj = await tokenDe("sole", "620481");
  mktMsj = await tokenDe("mateo", "620482");

  const hola = await call("mensajes", { method: "POST", token: paseador, body: { canal: "equipo", texto: "<b>Hola</b> equipo<script>x</script>" } });
  assert.equal(hola.status, 201);
  assert.equal(hola.body.mensaje.texto, "Hola equipox");
  assert.ok(hola.body.mensaje.id.startsWith("equipo_"));
  assert.equal(hola.body.mensaje.autor, "sebastian");
  const calle = await call("mensajes", { method: "POST", token: paseador, body: { canal: "calle", texto: "Llegando a Palermo", tipo: "aviso" } });
  assert.equal(calle.status, 201);
  const lista = await call("mensajes", { url: "/?canal=equipo", token: admin });
  assert.equal(lista.status, 200);
  assert.equal(lista.body.mensajes.at(-1).texto, "Hola equipox");
  const desde = await call("mensajes", { url: `/?canal=equipo&desde=${encodeURIComponent(hola.body.mensaje.creadoEn)}`, token: admin });
  assert.equal(desde.body.mensajes.length, 0);

  // El paseador no lee ni escribe en coordinación; marketing no está en los grupos.
  assert.equal((await call("mensajes", { url: "/?canal=coordinacion", token: paseador })).status, 403);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "coordinacion", texto: "hola" } })).status, 403);
  assert.equal((await call("mensajes", { url: "/?canal=equipo", token: mktMsj })).status, 403);
  assert.equal((await call("mensajes", { method: "POST", token: supMsj, body: { canal: "coordinacion", texto: "Falta retirar a Kiara" } })).status, 201);
  assert.equal((await call("mensajes", { url: "/?canal=coordinacion", token: coordMsj })).body.mensajes.length, 1);

  // Validaciones.
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "equipo", texto: "x".repeat(1001) } })).status, 400);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "equipo", texto: "   " } })).status, 400);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "equipo", texto: "hola", tipo: "html" } })).status, 400);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "../usuarios", texto: "hola" } })).status, 400);
  assert.equal((await call("mensajes", { url: "/?canal=equipo" })).status, 401);
});

test("mensajes: los directos son solo de los dos (ni el admin los lee)", async () => {
  const canal = "dm_coordina__sebastian";
  const dm = await call("mensajes", { method: "POST", token: paseador, body: { canal, texto: "¿Mañana salgo 8:30?" } });
  assert.equal(dm.status, 201);
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: coordMsj })).body.mensajes.length, 1);
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: admin })).status, 403);
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: supMsj })).status, 403);
  assert.equal((await call("mensajes", { method: "POST", token: admin, body: { canal, texto: "hola" } })).status, 403);
  // Al revés o con uno mismo no vale.
  assert.equal((await call("mensajes", { url: "/?canal=dm_sebastian__coordina", token: paseador })).status, 403);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "dm_sebastian__sebastian", texto: "yo" } })).status, 403);
  // Con alguien que no existe, no se crea el chat.
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "dm_nadie__sebastian", texto: "hola" } })).status, 404);

  const resumen = await call("mensajes", { url: "/?resumen=1", token: coordMsj });
  const canales = resumen.body.canales.map((c) => c.canal);
  assert.ok(canales.includes(canal) && canales.includes("coordinacion") && canales.includes("equipo"));
  const directo = resumen.body.canales.find((c) => c.canal === canal);
  assert.equal(directo.sinLeer, 1);
  assert.equal(directo.con.usuario, "sebastian");
  const delAdmin = (await call("mensajes", { url: "/?resumen=1", token: admin })).body.canales.map((c) => c.canal);
  assert.equal(delAdmin.includes(canal), false);
  const delPaseador = (await call("mensajes", { url: "/?resumen=1", token: paseador })).body.canales.map((c) => c.canal);
  assert.equal(delPaseador.includes("coordinacion"), false);

  assert.equal((await call("mensajes", { method: "POST", token: coordMsj, body: { canal, leido: true } })).status, 200);
  const despues = (await call("mensajes", { url: "/?resumen=1", token: coordMsj })).body.canales.find((c) => c.canal === canal);
  assert.equal(despues.sinLeer, 0);
  const contactos = await call("mensajes", { url: "/?contactos=1", token: paseador });
  assert.ok(contactos.body.contactos.some((c) => c.usuario === "coordina"));
  assert.ok(contactos.body.contactos.every((c) => !("hash" in c) && !("salt" in c)));
});

let enlace;
let clienteToken;
let fotoPistacho;
let fotoKiara;

test("portal del cliente: enlace, sesión y solo lo de sus perros", async () => {
  const alta = await call("registros", { method: "POST", token: coordMsj, body: { col: "clientes", id: "cli-ana", nombre: "Ana López", telefono: "1155550000", barrio: "Palermo", perros: ["PJ-001"], estado: "activo" } });
  assert.equal(alta.status, 201);
  await call("registros", { method: "POST", token: coordMsj, body: { col: "clientes", id: "cli-otro", nombre: "Otro", perros: ["PJ-002"], estado: "activo" } });

  // P-01: el acceso lo crea la aprobación de Juan (admin), con el horario asignado.
  assert.equal((await call("acceso", { method: "POST", token: paseador, body: { clienteId: "cli-ana" } })).status, 403);
  assert.equal((await call("acceso", { method: "POST", token: coordMsj, body: { clienteId: "no-existe" } })).status, 404);
  // Enlace nuevo: solo el admin (quien tiene el enlace entra como el cliente).
  assert.equal((await call("acceso", { method: "POST", token: coordMsj, body: { clienteId: "cli-ana" } })).status, 403);
  assert.equal((await call("acceso", { method: "POST", token: admin, body: { clienteId: "cli-ana" } })).status, 409);
  assert.equal((await call("aprobar", { method: "POST", token: coordMsj, body: { clienteId: "cli-ana", dias: ["lunes"], turno: "Mañana" } })).status, 403);
  assert.equal((await call("aprobar", { method: "POST", token: admin, body: { clienteId: "cli-ana" } })).status, 400);
  // Ni el coordinador puede marcarlo aprobado a mano por /api/registros.
  await call("registros", { method: "POST", token: coordMsj, body: { col: "clientes", id: "cli-ana", aprobado: { en: "2026-01-01" } } });
  assert.equal((await call("acceso", { method: "POST", token: admin, body: { clienteId: "cli-ana" } })).status, 409);
  const crea = await call("aprobar", { method: "POST", token: admin, body: { clienteId: "cli-ana", dias: ["lunes", "Miércoles"], turno: "Mañana", hora: "09:30" } });
  assert.equal(crea.status, 201);
  assert.deepEqual(crea.body.cliente.dias, ["lunes", "miércoles"]);
  assert.equal(crea.body.cliente.aprobado.por, "juan");
  assert.equal(crea.body.cliente.acceso.hash, undefined);
  assert.match(crea.body.enlace, /^\/c\/[A-Za-z0-9_-]{43}$/);
  enlace = crea.body.enlace.slice(3);
  // El token nunca queda guardado en claro, y el hash no se devuelve.
  const { readFileSync } = await import("node:fs");
  const guardado = readFileSync(path.join(dir, "clientes", "cli-ana.json"), "utf8");
  assert.equal(guardado.includes(enlace), false);
  assert.match(JSON.parse(guardado).acceso.hash, /^[0-9a-f]{64}$/);
  const vistos = await call("registros", { url: "/?col=clientes", token: coordMsj });
  assert.ok(vistos.body.registros.every((c) => !c.acceso || c.acceso.hash === undefined));
  // Nadie puede pisar el acceso por /api/registros.
  await call("registros", { method: "POST", token: coordMsj, body: { col: "clientes", id: "cli-ana", acceso: { hash: "0".repeat(64), activo: true } } });
  assert.equal(JSON.parse(readFileSync(path.join(dir, "clientes", "cli-ana.json"), "utf8")).acceso.hash, JSON.parse(guardado).acceso.hash);

  // Tokens inválidos.
  assert.equal((await call("authCliente", { method: "POST", body: { token: "x".repeat(43) } })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: { token: "corto" } })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: {} })).status, 401);
  const entra = await call("authCliente", { method: "POST", body: { token: enlace } });
  assert.equal(entra.status, 200);
  clienteToken = entra.body.token;
  assert.deepEqual(entra.body.user, { usuario: "cliente:cli-ana", nombre: "Ana López", rol: "cliente", clienteId: "cli-ana", perros: ["PJ-001"], dias: ["lunes", "miércoles"], turno: "Mañana", hora: "09:30" });
  const me = await call("me", { token: clienteToken });
  assert.equal(me.body.user.rol, "cliente");
  assert.equal(JSON.stringify(me.body).includes("1155550000"), false);

  // Datos: solo paseos y fotos de sus perros.
  await call("registros", { method: "POST", token: paseador, body: { col: "paseos", id: "2026-11-12_PJ-001_manana", fecha: "2026-11-12", perroId: "PJ-001", estado: "entregado", ruta: "PJ_1M", nota: "interna" } });
  await call("registros", { method: "POST", token: paseador, body: { col: "paseos", id: "2026-11-12_PJ-002_manana", fecha: "2026-11-12", perroId: "PJ-002", estado: "entregado" } });
  const paseos = await call("registros", { url: "/?col=paseos", token: clienteToken });
  assert.equal(paseos.status, 200);
  assert.ok(paseos.body.registros.length >= 1);
  assert.ok(paseos.body.registros.every((p) => p.perroId === "PJ-001" && p.ruta === undefined && p.nota === undefined && p.creadoPor === undefined));
  const fotos = await call("registros", { url: "/?col=fotos", token: clienteToken });
  assert.ok(fotos.body.registros.every((f) => f.perroId === "PJ-001"));
  for (const col of ["pagos", "clientes", "rutas", "plantillas", "archivos", "incidentes", "avisos"]) {
    assert.equal((await call("registros", { url: `/?col=${col}`, token: clienteToken })).status, 403, col);
  }
  assert.equal((await call("registros", { method: "POST", token: clienteToken, body: { col: "paseos", id: "2026-11-12_PJ-001_manana", fecha: "2026-11-12", estado: "pendiente" } })).status, 403);
  assert.equal((await call("registros", { method: "DELETE", url: "/?col=paseos&id=2026-11-12_PJ-001_manana", token: clienteToken })).status, 403);
  assert.equal((await call("usuarios", { token: clienteToken })).status, 403);
  assert.equal((await call("pin", { method: "POST", token: clienteToken, body: { actual: "1", nuevo: "804519" } })).status, 403);
  assert.equal((await call("acceso", { method: "POST", token: clienteToken, body: { clienteId: "cli-ana" } })).status, 403);

  // Archivos: solo fotos de sus perros.
  fotoPistacho = (await call("archivos", { method: "POST", token: paseador, body: { tipo: "foto", perroId: "PJ-001", perroNombre: "Pistacho", archivo: { nombre: "p.png", mime: "image/png", base64: PNG } } })).body.registro.id;
  fotoKiara = (await call("archivos", { method: "POST", token: paseador, body: { tipo: "foto", perroId: "PJ-002", perroNombre: "Kiara", archivo: { nombre: "k.png", mime: "image/png", base64: PNG } } })).body.registro.id;
  const carnet = (await call("archivos", { method: "POST", token: admin, body: { tipo: "carnet de vacunas", perroId: "PJ-001", archivo: { nombre: "c.png", mime: "image/png", base64: PNG } } })).body.registro.id;
  assert.equal((await callRaw("archivos", { url: `/?id=${fotoPistacho}`, token: clienteToken })).status, 200);
  assert.equal((await callRaw("archivos", { url: `/?id=${fotoKiara}`, token: clienteToken })).status, 403);
  assert.equal((await callRaw("archivos", { url: `/?id=${carnet}`, token: clienteToken })).status, 403);
  assert.equal((await callRaw("archivos", { url: "/?id=no-existe", token: clienteToken })).status, 403);
  assert.equal((await call("archivos", { method: "POST", token: clienteToken, body: { tipo: "foto", archivo: { nombre: "p.png", mime: "image/png", base64: PNG } } })).status, 403);
});

test("mensajes del cliente: su canal y nada más; el equipo de calle solo publica avisos", async () => {
  const canal = "cliente_cli-ana";
  const escribe = await call("mensajes", { method: "POST", token: clienteToken, body: { canal, texto: "Hola, mañana Pistacho no sale" } });
  assert.equal(escribe.status, 201);
  assert.equal(escribe.body.mensaje.autor, "cliente:cli-ana");
  assert.equal((await call("mensajes", { method: "POST", token: clienteToken, body: { canal, texto: "x", tipo: "aviso" } })).status, 400);
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: clienteToken })).body.mensajes.length, 1);
  for (const otro of ["equipo", "calle", "coordinacion", "cliente_cli-otro", "dm_coordina__sebastian"]) {
    assert.equal((await call("mensajes", { url: `/?canal=${otro}`, token: clienteToken })).status, 403, otro);
  }
  assert.equal((await call("mensajes", { method: "POST", token: clienteToken, body: { canal: "cliente_cli-otro", texto: "hola" } })).status, 403);
  assert.equal((await call("mensajes", { url: "/?contactos=1", token: clienteToken })).status, 403);
  const resumen = await call("mensajes", { url: "/?resumen=1", token: clienteToken });
  assert.deepEqual(resumen.body.canales.map((c) => c.canal).sort(), ["cliente_cli-ana", "clientes"]);

  // Coordinador y admin leen y responden.
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: coordMsj })).body.mensajes.length, 1);
  assert.equal((await call("mensajes", { method: "POST", token: admin, body: { canal, texto: "Perfecto, lo sacamos de la ruta" } })).status, 201);
  const resCoord = (await call("mensajes", { url: "/?resumen=1", token: coordMsj })).body.canales.find((c) => c.canal === canal);
  assert.equal(resCoord.titulo, "Ana López");
  assert.equal(resCoord.sinLeer, 2);

  // Paseador: publica avisos, no lee la conversación ni manda texto.
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: paseador })).status, 403);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal, texto: "hola" } })).status, 403);
  const aviso = await call("mensajes", { method: "POST", token: paseador, body: { canal, texto: "Llegamos en 5 minutos", tipo: "aviso" } });
  assert.equal(aviso.status, 201);
  // Sin saber el cliente: por el perro.
  const porPerro = await call("mensajes", { method: "POST", token: paseador, body: { canal: "cliente", perroId: "PJ-001", texto: "Pistacho tomó agua", tipo: "aviso" } });
  assert.equal(porPerro.status, 201);
  // Quien no ve clientes no se entera de qué cliente es (no recibe el canal).
  assert.equal(porPerro.body.mensaje.canal, undefined);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "cliente", perroId: "PJ-099", texto: "x", tipo: "aviso" } })).status, 404);
  // Al cliente solo le llegan fotos de sus perros.
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal, texto: "Foto", tipo: "aviso", adjuntoId: fotoKiara } })).status, 400);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal, texto: "Foto", tipo: "aviso", adjuntoId: fotoPistacho } })).status, 201);
  const resPaseador = (await call("mensajes", { url: "/?resumen=1", token: paseador })).body.canales.map((c) => c.canal);
  assert.equal(resPaseador.includes(canal), false);
  // Canal de un cliente que no existe.
  assert.equal((await call("mensajes", { method: "POST", token: coordMsj, body: { canal: "cliente_no-existe", texto: "hola" } })).status, 404);
});

test("aviso automático al cliente cuando se marca el paseo (sin duplicar)", async () => {
  const hoy = hoyAR();
  const id = `${hoy}_PJ-001_manana`;
  // El nombre que manda quien guarda se ignora: el aviso usa el nombre del servidor.
  const base = { col: "paseos", id, fecha: hoy, perroId: "PJ-001", perroNombre: "URGENTE: transferí a otro alias", turno: "Mañana" };
  const avisos = async () => (await call("mensajes", { url: "/?canal=cliente_cli-ana", token: clienteToken })).body.mensajes.filter((m) => m.automatico);

  assert.equal((await call("registros", { method: "POST", token: paseador, body: { ...base, estado: "retirado", horaRetiro: "09:45" } })).status, 201);
  assert.equal((await call("registros", { method: "POST", token: paseador, body: { ...base, estado: "retirado", horaRetiro: "09:45" } })).status, 200);
  let lista = await avisos();
  assert.deepEqual(lista.map((m) => m.texto), ["Retiramos a Pistacho · 09:45"]);
  assert.equal(lista[0].tipo, "aviso");

  // Foto del paseo: aviso con la foto adjunta, que el cliente puede abrir.
  const foto = await call("archivos", { method: "POST", token: paseador, body: { tipo: "foto", perroId: "PJ-001", perroNombre: "Pistacho", archivo: { nombre: "p.png", mime: "image/png", base64: PNG } } });
  await call("registros", { method: "POST", token: paseador, body: { ...base, estado: "paseando", horaPaseo: "10:00", fotoPaseoId: foto.body.registro.id, avisosCliente: ["entregado"] } });
  await call("registros", { method: "POST", token: paseador, body: { ...base, estado: "paseando" } });
  lista = await avisos();
  assert.equal(lista.length, 2);
  assert.equal(lista[1].texto, "Pistacho está paseando");
  assert.equal(lista[1].adjuntoId, foto.body.registro.id);
  assert.equal((await callRaw("archivos", { url: `/?id=${lista[1].adjuntoId}`, token: clienteToken })).status, 200);

  await call("registros", { method: "POST", token: paseador, body: { ...base, estado: "entregado", horaEntrega: "10:40" } });
  await call("registros", { method: "POST", token: nicolasOSupervisor(), body: { ...base, estado: "entregado", horaEntrega: "10:40" } });
  lista = await avisos();
  assert.deepEqual(lista.map((m) => m.texto), ["Retiramos a Pistacho · 09:45", "Pistacho está paseando", "Entregamos a Pistacho · 10:40"]);

  // Foto que llega después (se sacó sin señal): un aviso más con la foto, una sola vez.
  const id2 = `${hoy}_PJ-001_tarde`;
  const base2 = { ...base, id: id2, turno: "Tarde" };
  await call("registros", { method: "POST", token: paseador, body: { ...base2, estado: "paseando", fotoPendiente: true } });
  await call("registros", { method: "POST", token: paseador, body: { ...base2, fotoPaseoId: foto.body.registro.id, fotoPendiente: false } });
  await call("registros", { method: "POST", token: paseador, body: { ...base2, fotoPaseoId: foto.body.registro.id } });
  lista = await avisos();
  assert.deepEqual(lista.slice(3).map((m) => m.texto), ["Pistacho está paseando", "Foto del paseo de Pistacho"]);

  // Perro sin cliente vinculado o día pasado: se guarda y no avisa a nadie.
  assert.equal((await call("registros", { method: "POST", token: paseador, body: { ...base, id: `${hoy}_PJ-077_manana`, perroId: "PJ-077", estado: "retirado" } })).status, 201);
  assert.equal((await call("registros", { method: "POST", token: paseador, body: { ...base, id: "2026-01-02_PJ-001_manana", fecha: "2026-01-02", estado: "retirado" } })).status, 201);
  assert.equal((await avisos()).length, 5);
  // Identificador inventado (para mandar avisos sin fin): se guarda, pero no avisa.
  assert.equal((await call("registros", { method: "POST", token: paseador, body: { ...base, id: `${hoy}_PJ-001_x1`, estado: "retirado" } })).status, 201);
  assert.equal((await avisos()).length, 5);
  // El equipo de calle no ve el canal del cliente, pero el paseo dice qué avisos salieron.
  const paseo = (await call("registros", { url: `/?col=paseos&desde=${hoy}`, token: admin })).body.registros.find((p) => p.id === id);
  assert.deepEqual([...paseo.avisosCliente].sort(), ["entregado", "foto", "paseando", "retirado"]);
});

function nicolasOSupervisor() {
  return supMsj;
}

test("enlace del cliente: renovar y revocar cortan las sesiones", async () => {
  const nuevo = await call("acceso", { method: "POST", token: admin, body: { clienteId: "cli-ana" } });
  assert.equal(nuevo.status, 201);
  assert.equal((await call("me", { token: clienteToken })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: { token: enlace } })).status, 401);
  const otraSesion = (await call("authCliente", { method: "POST", body: { token: nuevo.body.enlace.slice(3) } })).body.token;
  assert.equal((await call("mensajes", { url: "/?canal=cliente_cli-ana", token: otraSesion })).status, 200);
  const revoca = await call("acceso", { method: "POST", token: coordMsj, body: { clienteId: "cli-ana", revocar: true } });
  assert.equal(revoca.status, 200);
  assert.equal(revoca.body.acceso.activo, false);
  assert.equal((await call("mensajes", { url: "/?canal=cliente_cli-ana", token: otraSesion })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: { token: nuevo.body.enlace.slice(3) } })).status, 401);
  // Nombres reservados para usuarios del equipo.
  assert.equal((await call("usuarios", { method: "POST", token: admin, body: { usuario: "cliente_x", nombre: "X", rol: "paseador", pin: "620483", crear: true } })).status, 400);
  assert.equal((await call("usuarios", { method: "POST", token: admin, body: { usuario: "a__b", nombre: "X", rol: "paseador", pin: "620483", crear: true } })).status, 400);
});

let clienteRocco;

test("P-01: el alta pedida en la web se aprueba con horario y da el acceso", async () => {
  const pide = await call("evaluacion", { method: "POST", body: { perro: "Rocco", responsable: "Carla Gómez", telefono: "1144440000", zona: "Pilar" } });
  assert.equal(pide.status, 201);
  const pedido = (await call("registros", { url: "/?col=pedidos", token: admin })).body.registros.find((p) => p.titulo === "Evaluación: Rocco");
  assert.equal((await call("aprobar", { method: "POST", token: admin, body: { pedidoId: pedido.id, dias: ["martes"], turno: "Tarde" } })).status, 400);
  // Un perro que ya es de otro cliente: no se aprueba y el pedido sigue pendiente.
  assert.equal((await call("aprobar", { method: "POST", token: admin, body: { pedidoId: pedido.id, perros: ["PJ-001"], dias: ["martes"], turno: "Tarde" } })).status, 409);
  const ok = await call("aprobar", { method: "POST", token: admin, body: { pedidoId: pedido.id, perros: ["PJ-010"], dias: ["martes", "jueves"], turno: "Tarde", plan: "2 veces por semana" } });
  assert.equal(ok.status, 201);
  assert.equal(ok.body.cliente.nombre, "Carla Gómez");
  assert.equal(ok.body.cliente.barrio, "Pilar");
  assert.equal(ok.body.cliente.pedidoId, pedido.id);
  const marcado = (await call("registros", { url: "/?col=pedidos", token: admin })).body.registros.find((p) => p.id === pedido.id);
  assert.equal(marcado.estado, "aprobado");
  assert.equal(marcado.clienteId, ok.body.cliente.id);
  assert.equal((await call("aprobar", { method: "POST", token: admin, body: { pedidoId: pedido.id, perros: ["PJ-010"], dias: ["martes"], turno: "Tarde" } })).status, 409);
  const entra = await call("authCliente", { method: "POST", body: { token: ok.body.enlace.slice(3) } });
  assert.equal(entra.status, 200);
  assert.deepEqual(entra.body.user.perros, ["PJ-010"]);
  assert.equal(entra.body.user.nombre, "Carla Gómez");
  clienteRocco = entra.body.token;
  // De baja: la sesión deja de valer.
  const id = ok.body.cliente.id;
  await call("registros", { method: "POST", token: admin, body: { col: "clientes", id, estado: "baja" } });
  assert.equal((await call("me", { token: clienteRocco })).status, 401);
  await call("registros", { method: "POST", token: admin, body: { col: "clientes", id, estado: "activo" } });
  // La baja corta el enlace en el servidor: al volver, la sesión y el enlace viejos siguen sin valer.
  assert.equal((await call("me", { token: clienteRocco })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: { token: ok.body.enlace.slice(3) } })).status, 401);
  // Juan le genera un enlace nuevo.
  const otro = await call("acceso", { method: "POST", token: admin, body: { clienteId: id } });
  assert.equal(otro.status, 201);
  clienteRocco = (await call("authCliente", { method: "POST", body: { token: otro.body.enlace.slice(3) } })).body.token;
  assert.equal((await call("me", { token: clienteRocco })).status, 200);
  // Un perro es de un solo cliente.
  assert.equal((await call("registros", { method: "POST", token: coordMsj, body: { col: "clientes", id: "cli-otro", perros: ["PJ-010"] } })).status, 409);
});

test("alias de pago: lo configura el admin y lo ven los clientes con sesión", async () => {
  assert.deepEqual((await call("registros", { url: "/?col=ajustes", token: clienteRocco })).body.registros, []);
  assert.equal((await call("registros", { method: "POST", token: admin, body: { col: "ajustes", id: "pagos", alias: "con espacios" } })).status, 400);
  assert.equal((await call("registros", { method: "POST", token: admin, body: { col: "ajustes", id: "otro", alias: "algo.valido" } })).status, 400);
  assert.equal((await call("registros", { method: "POST", token: coordMsj, body: { col: "ajustes", id: "pagos", alias: "algo.valido" } })).status, 403);
  const guarda = await call("registros", { method: "POST", token: admin, body: { col: "ajustes", id: "pagos", alias: "Prueba.Alias", instrucciones: "<b>Transferí</b> y avisá", extra: "x" } });
  assert.equal(guarda.status, 201);
  assert.equal(guarda.body.registro.alias, "prueba.alias");
  assert.equal(guarda.body.registro.extra, undefined);
  const visto = (await call("registros", { url: "/?col=ajustes", token: clienteRocco })).body.registros;
  assert.deepEqual(Object.keys(visto[0]).sort(), ["actualizadoEn", "alias", "id", "instrucciones"]);
  assert.equal(visto[0].instrucciones, "Transferí y avisá");
  for (const token of [coordMsj, paseador, supMsj]) {
    assert.equal((await call("registros", { url: "/?col=ajustes", token })).status, 403);
  }
});

test("P-08: comunidad de clientes con reglas y moderación del admin", async () => {
  const habla = await call("mensajes", { method: "POST", token: clienteRocco, body: { canal: "clientes", texto: "¡Hola a todos! Rocco ama el parque" } });
  assert.equal(habla.status, 201);
  assert.equal(habla.body.mensaje.autorNombre, "Carla G.");
  assert.equal((await call("mensajes", { method: "POST", token: clienteRocco, body: { canal: "clientes", texto: "Escribime al 11 4444-0000" } })).status, 400);
  assert.equal((await call("mensajes", { method: "POST", token: clienteRocco, body: { canal: "clientes", texto: "mi mail es carla@correo.com" } })).status, 400);
  assert.equal((await call("mensajes", { url: "/?canal=clientes", token: paseador })).status, 403);
  assert.equal((await call("mensajes", { url: "/?canal=clientes", token: supMsj })).status, 403);
  const lee = await call("mensajes", { url: "/?canal=clientes", token: coordMsj });
  assert.equal(lee.body.mensajes.length, 1);
  assert.ok(lee.body.reglas.length >= 3);
  const resumen = (await call("mensajes", { url: "/?resumen=1", token: clienteRocco })).body.canales.map((c) => c.canal).sort();
  assert.equal(resumen.length, 2);
  assert.ok(resumen.includes("clientes"));

  // Borrar: solo el admin; el cambio llega también a quien pide "lo nuevo".
  const id = habla.body.mensaje.id;
  assert.equal((await call("mensajes", { method: "POST", token: coordMsj, body: { borrar: id } })).status, 403);
  const borra = await call("mensajes", { method: "POST", token: admin, body: { borrar: id } });
  assert.equal(borra.status, 200);
  assert.equal(borra.body.mensaje.borrado, true);
  assert.equal(borra.body.mensaje.texto, "");
  const nuevos = await call("mensajes", { url: `/?canal=clientes&desde=${encodeURIComponent(habla.body.mensaje.creadoEn)}`, token: clienteRocco });
  assert.equal(nuevos.body.mensajes[0].borrado, true);
  // Los directos ajenos no se moderan (ni se revela si existen).
  const dm = (await call("mensajes", { url: "/?canal=dm_coordina__sebastian", token: coordMsj })).body.mensajes[0].id;
  assert.equal((await call("mensajes", { method: "POST", token: admin, body: { borrar: dm } })).status, 404);

  // Silenciar.
  assert.equal((await call("mensajes", { method: "POST", token: coordMsj, body: { silenciar: "cliente:x" } })).status, 403);
  const usuario = (await call("me", { token: clienteRocco })).body.user.usuario;
  assert.equal((await call("mensajes", { method: "POST", token: admin, body: { silenciar: usuario, horas: 2 } })).status, 200);
  assert.equal((await call("mensajes", { method: "POST", token: clienteRocco, body: { canal: "clientes", texto: "hola" } })).status, 403);
  assert.ok((await call("mensajes", { url: "/?canal=clientes", token: clienteRocco })).body.silenciadoHasta);
  assert.ok((await call("mensajes", { url: "/?moderacion=1", token: admin })).body.silenciados[usuario]);
  assert.equal((await call("mensajes", { url: "/?moderacion=1", token: coordMsj })).status, 403);
  // En su chat privado con Paseos Juan puede seguir escribiendo.
  assert.equal((await call("mensajes", { method: "POST", token: clienteRocco, body: { canal: `cliente_${usuario.slice(8)}`, texto: "¿Por qué me silenciaron?" } })).status, 201);
  await call("mensajes", { method: "POST", token: admin, body: { silenciar: usuario, horas: 0 } });
  assert.equal((await call("mensajes", { method: "POST", token: clienteRocco, body: { canal: "clientes", texto: "Perdón, ya entendí" } })).status, 201);
});

test("bloqueo después de 5 intentos fallidos (mismo 401 genérico, no revela la cuenta)", async () => {
  for (let i = 0; i < 5; i += 1) await call("login", { method: "POST", body: { usuario: "sebastian", pin: "999990" } });
  const locked = await call("login", { method: "POST", body: { usuario: "sebastian", pin: "730264" } });
  assert.equal(locked.status, 401);
  const inexistente = await call("login", { method: "POST", body: { usuario: "noexiste", pin: "730264" } });
  assert.equal(inexistente.status, 401);
  assert.equal(locked.body.error, inexistente.body.error);
  // Desbloqueo para las pruebas que siguen.
  await store.patchUser("sebastian", { bloqueadoHasta: null, fallos: 0 });
});

test("alta con usuario existente devuelve 409 y el PIN inicial pide cambio", async () => {
  const dup = await call("usuarios", { method: "POST", token: admin, body: { usuario: "sebastian", nombre: "Otro", rol: "admin", pin: "730265", crear: true } });
  assert.equal(dup.status, 409);
  const nuevo = await call("usuarios", { method: "POST", token: admin, body: { usuario: "nicolas", nombre: "Nicolás", rol: "supervisor", pin: "561839", crear: true } });
  assert.equal(nuevo.status, 201);
  const login = await call("login", { method: "POST", body: { usuario: "nicolas", pin: "561839" } });
  assert.equal(login.body.user.debeCambiarPin, true);
  const cambio = await call("pin", { method: "POST", token: login.body.token, body: { actual: "561839", nuevo: "804512" } });
  assert.equal(cambio.body.user.debeCambiarPin, false);
});

test("desactivar usuario invalida su sesión", async () => {
  await call("usuarios", { method: "DELETE", url: "/?usuario=sebastian", token: admin });
  const me = await call("me", { token: paseador });
  assert.equal(me.status, 401);
});

// ---------- Seguridad ----------

async function crearUsuario(usuario, pin, extra = {}) {
  const r = await call("usuarios", { method: "POST", token: admin, body: { usuario, nombre: usuario, rol: "paseador", pin, crear: true, ...extra } });
  assert.equal(r.status, 201);
}

// Hace que la próxima lectura del usuario dispare `accion` (un cambio del admin) antes de volver.
function interceptarLectura(usuario, accion) {
  const realGet = store.getUser;
  let paso = false;
  store.getUser = async (u) => {
    const leido = await realGet(u);
    if (u === usuario && !paso) {
      paso = true;
      await accion();
    }
    return leido;
  };
  return () => { store.getUser = realGet; };
}

test("un ingreso en curso no deshace la desactivación ni el cambio de PIN del admin", async () => {
  await crearUsuario("despedido", "730281");
  let restaurar = interceptarLectura("despedido", async () => {
    const d = await call("usuarios", { method: "DELETE", url: "/?usuario=despedido", token: admin });
    assert.equal(d.status, 200);
  });
  try {
    const login = await call("login", { method: "POST", body: { usuario: "despedido", pin: "730281" } });
    assert.equal(login.status, 401);
  } finally {
    restaurar();
  }
  assert.equal((await store.getUser("despedido")).activo, false);

  // Lo mismo con un cambio de PIN del admin: el PIN viejo no vuelve a servir.
  await crearUsuario("cambiado", "730282");
  restaurar = interceptarLectura("cambiado", async () => {
    await call("usuarios", { method: "POST", token: admin, body: { usuario: "cambiado", pin: "591736" } });
  });
  try {
    const login = await call("login", { method: "POST", body: { usuario: "cambiado", pin: "730282" } });
    assert.equal(login.status, 401);
  } finally {
    restaurar();
  }
  assert.equal((await call("login", { method: "POST", body: { usuario: "cambiado", pin: "730282" } })).status, 401);
  assert.equal((await call("login", { method: "POST", body: { usuario: "cambiado", pin: "591736" } })).status, 200);
});

test("entrar con Google en curso no deshace la desactivación", async () => {
  await crearUsuario("gdespedido", "730287", { google: "gdespedido@gmail.com" });
  process.env.GOOGLE_CLIENT_ID = "cliente-prueba.apps.googleusercontent.com";
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ iss: "accounts.google.com", aud: process.env.GOOGLE_CLIENT_ID, exp: String(Math.floor(Date.now() / 1000) + 600), email_verified: "true", email: "gdespedido@gmail.com" }) });
  const realList = store.listUsers;
  store.listUsers = async () => {
    const lista = await realList();
    await call("usuarios", { method: "DELETE", url: "/?usuario=gdespedido", token: admin });
    return lista;
  };
  try {
    const r = await call("google", { method: "POST", body: { credential: "tok" } });
    assert.equal(r.status, 403);
  } finally {
    store.listUsers = realList;
    globalThis.fetch = realFetch;
    delete process.env.GOOGLE_CLIENT_ID;
  }
  assert.equal((await store.getUser("gdespedido")).activo, false);
});

test("pedidos de ingreso en paralelo no saltean el bloqueo", async () => {
  await crearUsuario("paralelo", "730283");
  const pins = Array.from({ length: 30 }, (_, i) => String(400000 + i * 7));
  const r = await Promise.all(pins.map((pin) => call("login", { method: "POST", body: { usuario: "paralelo", pin } })));
  assert.ok(r.every((x) => x.status === 401));
  const u = await store.getUser("paralelo");
  assert.ok(Date.parse(u.bloqueadoHasta) > Date.now(), "la cuenta quedó bloqueada");
  // Bloqueada: ni el PIN correcto entra.
  assert.equal((await call("login", { method: "POST", body: { usuario: "paralelo", pin: "730283" } })).status, 401);
});

test("límite por IP en el ingreso (los ingresos correctos no cuentan)", async () => {
  await crearUsuario("porip", "730284");
  const ip = "203.0.113.7";
  for (let i = 0; i < 3; i += 1) {
    assert.equal((await call("login", { method: "POST", ip, body: { usuario: "porip", pin: "730284" } })).status, 200);
  }
  const codigos = [];
  for (let i = 0; i < 11; i += 1) {
    codigos.push((await call("login", { method: "POST", ip, body: { usuario: `nadie${i}`, pin: "123987" } })).status);
  }
  assert.deepEqual(codigos.slice(0, 10), Array(10).fill(401));
  assert.equal(codigos[10], 429);
  // IPv6: todo el /64 cuenta como una sola conexión.
  for (let i = 0; i < 10; i += 1) await call("login", { method: "POST", ip: `2001:db8:1:2::${i + 1}`, body: { usuario: "nadie", pin: "123987" } });
  assert.equal((await call("login", { method: "POST", ip: "2001:db8:1:2:ffff::9", body: { usuario: "porip", pin: "730284" } })).status, 429);
  assert.equal((await call("login", { method: "POST", ip: "2001:db8:1:3::1", body: { usuario: "porip", pin: "730284" } })).status, 200);
});

test("cambio de PIN: el PIN actual tiene límite de intentos", async () => {
  await crearUsuario("robado", "730285");
  const token = (await call("login", { method: "POST", body: { usuario: "robado", pin: "730285" } })).body.token;
  for (let i = 0; i < 5; i += 1) {
    const r = await call("pin", { method: "POST", token, body: { actual: String(100000 + i * 13), nuevo: "804519" } });
    assert.equal(r.status, 400);
  }
  const bloqueado = await call("pin", { method: "POST", token, body: { actual: "730285", nuevo: "804519" } });
  assert.equal(bloqueado.status, 429);
  // Desbloqueado, el PIN correcto funciona y vuelve el contador a 0.
  await store.patchUser("robado", { bloqueadoHasta: null });
  const ok = await call("pin", { method: "POST", token, body: { actual: "730285", nuevo: "804519" } });
  assert.equal(ok.status, 200);
  assert.equal((await store.getUser("robado")).fallos, 0);
});

test("cambiar o desvincular el Gmail cierra las sesiones abiertas", async () => {
  await crearUsuario("congmail", "730286", { google: "uno@gmail.com" });
  const token = (await call("login", { method: "POST", body: { usuario: "congmail", pin: "730286" } })).body.token;
  assert.equal((await call("me", { token })).status, 200);
  // Editar sin tocar el Gmail no cierra la sesión.
  await call("usuarios", { method: "POST", token: admin, body: { usuario: "congmail", nombre: "Con Gmail" } });
  assert.equal((await call("me", { token })).status, 200);
  await call("usuarios", { method: "POST", token: admin, body: { usuario: "congmail", google: "" } });
  assert.equal((await call("me", { token })).status, 401);
});

test("rutas y plantillas rechazan paradas con perroId no válido", async () => {
  const malo = { col: "rutas", fecha: "2026-11-13", ruta: "PJ_1M", turno: "Mañana", paradas: [{ perroId: "x\" autofocus onfocus=\"alert(1)", perroNombre: "Zzz", hora: "09:00" }] };
  assert.equal((await call("registros", { method: "POST", token: admin, body: malo })).status, 400);
  assert.equal((await call("registros", { method: "POST", token: admin, body: { ...malo, col: "plantillas", paradas: "no" } })).status, 400);
  const bueno = { ...malo, paradas: [{ perroId: "PJ-001", perroNombre: "Pistacho", hora: "09:00" }, { perroNombre: "Sin ficha" }] };
  assert.equal((await call("registros", { method: "POST", token: admin, body: bueno })).status, 201);
});

test("formulario público: carnet con Google, límite por /64 y tope global por hora", async () => {
  process.env.GOOGLE_CLIENT_ID = "cliente-prueba.apps.googleusercontent.com";
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ iss: "accounts.google.com", aud: process.env.GOOGLE_CLIENT_ID, exp: String(Math.floor(Date.now() / 1000) + 600), email_verified: "true", email: "tutora@gmail.com", name: "Tutora" }) });
  try {
    const conGoogle = await call("evaluacion", { method: "POST", body: { perro: "Moro", responsable: "Ana", telefono: "1100000002", googleCredential: "tok", carnet: { nombre: "c.png", mime: "image/png", base64: PNG } } });
    assert.equal(conGoogle.status, 201);
    assert.equal(conGoogle.body.carnet, true);
  } finally {
    globalThis.fetch = realFetch;
    delete process.env.GOOGLE_CLIENT_ID;
  }
  // Mismo /64 de IPv6: a partir del sexto pedido en la hora, 429.
  for (let i = 0; i < 5; i += 1) await call("evaluacion", { method: "POST", ip: `2001:db8:9:9::${i + 1}`, body: { perro: "P", responsable: "R", telefono: "1" } });
  assert.equal((await call("evaluacion", { method: "POST", ip: "2001:db8:9:9::aa", body: { perro: "P", responsable: "R", telefono: "1" } })).status, 429);
  // Tope global (compartido entre instancias): se completa con pedidos web de la última hora.
  const ahora = new Date().toISOString();
  const dia = ahora.slice(0, 10);
  const web = (await store.list("pedidos", dia)).filter((p) => p.origen === "web").length;
  const relleno = [];
  for (let i = web; i < 30; i += 1) {
    const id = `${dia}_relleno_${i}`;
    relleno.push(id);
    await store.put("pedidos", { id, col: "pedidos", fecha: dia, origen: "web", creadoEn: ahora });
  }
  const tope = await call("evaluacion", { method: "POST", body: { perro: "Luna", responsable: "Ana", telefono: "1100000003" } });
  assert.equal(tope.status, 429);
  for (const id of relleno) await store.remove("pedidos", id);
});



test("rutas: no acepta paradas con código de perro o hora inválidos", async () => {
  const mala = await call("registros", { method: "POST", token: admin, body: { col: "plantillas", id: "PJ_1M_lunes", paradas: [{ perroId: '"><img src=x onerror=alert(1)>', hora: "09:00" }] } });
  assert.equal(mala.status, 400);
  const hora = await call("registros", { method: "POST", token: admin, body: { col: "plantillas", id: "PJ_1M_lunes", paradas: [{ perroId: "PJ-001", hora: "nueve" }] } });
  assert.equal(hora.status, 400);
  const ok = await call("registros", { method: "POST", token: admin, body: { col: "plantillas", id: "PJ_1M_lunes", paradas: [{ perroId: "PJ-001", perroNombre: "Pistacho", hora: "09:00", minutos: 45 }] } });
  assert.ok(ok.status === 201 || ok.status === 200);
});

// ---------- E-039: control por registro, archivos por rol y setup en Vercel ----------
async function crearYEntrar(usuario, nombre, rol, pin) {
  await call("usuarios", { method: "POST", token: admin, body: { usuario, nombre, rol, pin, crear: true } });
  return (await call("login", { method: "POST", body: { usuario, pin } })).body.token;
}
let supervisor;
let supervisor2;
let ayudante;
let coordinador;
let pas;

test("E-039: el supervisor no lee fichas (datos de tutores y salud)", async () => {
  supervisor = await crearYEntrar("superuno", "Supervisor Uno", "supervisor", "604918");
  supervisor2 = await crearYEntrar("superdos", "Supervisor Dos", "supervisor", "604927");
  ayudante = await crearYEntrar("ayudauno", "Ayudante Uno", "ayudante", "604936");
  pas = await crearYEntrar("paseauno", "Paseador Uno", "paseador", "604945");
  coordinador = (await call("login", { method: "POST", body: { usuario: "coordina", pin: "736195" } })).body.token;
  await call("registros", { method: "POST", token: coordinador, body: { col: "fichas", perroNombre: "Luna", datos: { tutor: "Ana", salud: "alergia" } } });
  assert.equal((await call("registros", { url: "/?col=fichas", token: supervisor })).status, 403);
  assert.equal((await call("registros", { url: "/?col=fichas", token: coordinador })).status, 200);
});

test("E-039: el supervisor pide cambios pero no los marca aplicados", async () => {
  const pide = await call("registros", { method: "POST", token: supervisor, body: { col: "solicitudes", fecha: "2026-11-13", tipo: "no sale", estado: "aplicado", respuesta: "trampa" } });
  assert.equal(pide.status, 201);
  assert.equal(pide.body.registro.estado, "pendiente");
  assert.equal(pide.body.registro.respuesta, "");
  const id = pide.body.registro.id;
  const aprueba = await call("registros", { method: "POST", token: supervisor, body: { col: "solicitudes", id, fecha: "2026-11-13", estado: "aplicado", respuesta: "listo", detalle: "corrijo" } });
  assert.equal(aprueba.status, 200);
  assert.equal(aprueba.body.registro.estado, "pendiente");
  assert.equal(aprueba.body.registro.respuesta, "");
  assert.equal(aprueba.body.registro.detalle, "corrijo");
  const otro = await call("registros", { method: "POST", token: supervisor2, body: { col: "solicitudes", id, fecha: "2026-11-13", detalle: "ajeno" } });
  assert.equal(otro.status, 403);
  const coord = await call("registros", { method: "POST", token: coordinador, body: { col: "solicitudes", id, fecha: "2026-11-13", estado: "aplicado", respuesta: "Hecho" } });
  assert.equal(coord.body.registro.estado, "aplicado");
  const despues = await call("registros", { method: "POST", token: supervisor, body: { col: "solicitudes", id, fecha: "2026-11-13", detalle: "otra cosa" } });
  assert.equal(despues.status, 403);
  // Ya respondido: el supervisor no lo borra; el admin sí.
  assert.equal((await call("registros", { method: "DELETE", url: `/?col=solicitudes&id=${id}`, token: supervisor })).status, 403);
  assert.equal((await call("registros", { method: "DELETE", url: `/?col=solicitudes&id=${id}`, token: admin })).body.borrado, true);
});

test("E-039: cada uno escribe solo su checklist", async () => {
  const ajeno = await call("registros", { method: "POST", token: pas, body: { col: "checklists", id: "2026-11-13_ayudauno_manana", fecha: "2026-11-13", completo: true } });
  assert.equal(ajeno.status, 403);
  const raro = await call("registros", { method: "POST", token: pas, body: { col: "checklists", id: "2026-11-13_paseauno_noche", fecha: "2026-11-13" } });
  assert.equal(raro.status, 403);
  const propio = await call("registros", { method: "POST", token: pas, body: { col: "checklists", id: "2026-11-13_paseauno_manana", fecha: "2026-11-13", completo: true } });
  assert.equal(propio.status, 201);
  const delAdmin = await call("registros", { method: "POST", token: admin, body: { col: "checklists", id: "2026-11-13_ayudauno_tarde", fecha: "2026-11-13" } });
  assert.equal(delAdmin.status, 201);
});

test("E-039: incidentes, observaciones y avisos ajenos no se editan (el coordinador sí edita avisos)", async () => {
  const inc = await call("registros", { method: "POST", token: pas, body: { col: "incidentes", fecha: "2026-11-13", titulo: "Tirón" } });
  const pisa = await call("registros", { method: "POST", token: ayudante, body: { col: "incidentes", id: inc.body.registro.id, fecha: "2026-11-13", titulo: "Otra cosa" } });
  assert.equal(pisa.status, 403);
  const propio = await call("registros", { method: "POST", token: pas, body: { col: "incidentes", id: inc.body.registro.id, fecha: "2026-11-13", titulo: "Tirón leve" } });
  assert.equal(propio.status, 200);
  const aviso = await call("registros", { method: "POST", token: supervisor, body: { col: "avisos", fecha: "2026-11-13", barrio: "Pilar", mensaje: "Obra" } });
  const coordEdita = await call("registros", { method: "POST", token: coordinador, body: { col: "avisos", id: aviso.body.registro.id, fecha: "2026-11-13", mensaje: "Obra en la esquina" } });
  assert.equal(coordEdita.status, 200);
  const avisoCoord = await call("registros", { method: "POST", token: coordinador, body: { col: "avisos", fecha: "2026-11-13", barrio: "Pilar", mensaje: "Corte" } });
  const supEdita = await call("registros", { method: "POST", token: supervisor2, body: { col: "avisos", id: avisoCoord.body.registro.id, fecha: "2026-11-13", mensaje: "x" } });
  assert.equal(supEdita.status, 403);
  const obs = await call("registros", { method: "POST", token: supervisor, body: { col: "observaciones", fecha: "2026-11-13", titulo: "Ladra" } });
  assert.equal((await call("registros", { method: "POST", token: pas, body: { col: "observaciones", id: obs.body.registro.id, fecha: "2026-11-13", titulo: "y" } })).status, 403);
});

test("E-039: quién marcó cada paso del paseo lo fija el servidor", async () => {
  const id = "2026-11-13_PJ-009_manana";
  const base = { col: "paseos", id, fecha: "2026-11-13", perroId: "PJ-009" };
  const retiro = await call("registros", { method: "POST", token: pas, body: { ...base, horaRetiro: "09:00", horaRetiroPor: "ayudauno", horaRetiroPorNombre: "Ayudante Uno" } });
  assert.equal(retiro.body.registro.horaRetiroPor, "paseauno");
  assert.equal(retiro.body.registro.horaRetiroPorNombre, "Paseador Uno");
  // El ayudante reenvía el paso anterior tal cual (como hace la app) y marca integración y entrega.
  const ayu = await call("registros", { method: "POST", token: ayudante, body: { ...base, horaRetiroPor: "paseauno", horaRetiroPorNombre: "Otro nombre", horaIntegradoPor: "paseauno", devuelvePor: "x", horaEntregaPorNombre: "Suelto" } });
  assert.equal(ayu.body.registro.horaRetiroPor, "paseauno");
  assert.equal(ayu.body.registro.horaRetiroPorNombre, "Paseador Uno");
  assert.equal(ayu.body.registro.horaIntegradoPor, "ayudauno");
  assert.equal(ayu.body.registro.horaIntegradoPorNombre, "Ayudante Uno");
  assert.equal(ayu.body.registro.devuelvePor, "ayudauno");
  assert.equal(ayu.body.registro.horaEntregaPorNombre, undefined);
  // Vacío = desmarcar.
  const suelta = await call("registros", { method: "POST", token: supervisor, body: { ...base, devuelvePor: "", devuelvePorNombre: "Mateo" } });
  assert.equal(suelta.body.registro.devuelvePor, "");
  assert.equal(suelta.body.registro.devuelvePorNombre, "");
  assert.equal(suelta.body.registro.horaIntegradoPor, "ayudauno");
});

test("E-039: cada rol sube solo sus tipos de archivo y solo el admin los borra", async () => {
  const archivo = { nombre: "x.png", mime: "image/png", base64: PNG };
  assert.equal((await call("archivos", { method: "POST", token: pas, body: { tipo: "comprobante de pago", archivo } })).status, 403);
  assert.equal((await call("archivos", { method: "POST", token: ayudante, body: { tipo: "carnet de vacunas", archivo } })).status, 403);
  assert.equal((await call("archivos", { method: "POST", token: supervisor, body: { tipo: "documento", archivo } })).status, 403);
  assert.equal((await call("archivos", { method: "POST", token: coordinador, body: { tipo: "comprobante de pago", archivo } })).status, 403);
  assert.equal((await call("archivos", { method: "POST", token: admin, body: { tipo: "otra cosa", archivo } })).status, 400);
  assert.equal((await call("archivos", { method: "POST", token: coordinador, body: { tipo: "carnet de vacunas", archivo } })).status, 201);
  assert.equal((await call("archivos", { method: "POST", token: coordinador, body: { tipo: "documento", archivo } })).status, 201);
  const foto = await call("archivos", { method: "POST", token: pas, body: { tipo: "foto", archivo } });
  assert.equal(foto.status, 201);
  assert.equal((await call("registros", { method: "DELETE", url: `/?col=archivos&id=${foto.body.registro.id}`, token: pas })).status, 403);
  assert.equal((await call("registros", { method: "DELETE", url: `/?col=archivos&id=${foto.body.registro.id}`, token: admin })).body.borrado, true);
});

// ---------- Contaduría: colección `movimientos` (ingresos y egresos) ----------
const movimiento = (extra = {}) => ({
  col: "movimientos", fecha: "2026-11-13", tipo: "egreso", categoria: "Insumos", concepto: "Bolsas", monto: 4500, medio: "Efectivo", ...extra,
});

test("contaduría: el admin crea, lee, marca en el Libro y borra un movimiento", async () => {
  const { ROLES_CONTADURIA, COLECCIONES } = await import("../api/_lib/permisos.js");
  assert.deepEqual(ROLES_CONTADURIA, ["admin"]);
  assert.equal(COLECCIONES.movimientos.leer, ROLES_CONTADURIA);
  assert.equal(COLECCIONES.movimientos.escribir, ROLES_CONTADURIA);

  const creado = await call("registros", { method: "POST", token: admin, body: movimiento({ nota: "  para la ruta  ", inventado: "x" }) });
  assert.equal(creado.status, 201);
  const reg = creado.body.registro;
  assert.equal(reg.tipo, "egreso");
  assert.equal(reg.categoria, "Insumos");
  assert.equal(reg.monto, 4500);
  assert.equal(reg.nota, "para la ruta");
  assert.equal(reg.pasadoAlLibro, false);
  assert.equal(reg.creadoPor, "juan");
  assert.equal(reg.inventado, undefined, "no guarda campos que no son del movimiento");

  const ingreso = await call("registros", { method: "POST", token: admin, body: movimiento({ tipo: "ingreso", categoria: "Planes", concepto: "Plan 2", monto: 30000.555 }) });
  assert.equal(ingreso.status, 201);
  assert.equal(ingreso.body.registro.monto, 30000.56);

  const lista = await call("registros", { url: "/?col=movimientos", token: admin });
  assert.equal(lista.status, 200);
  assert.equal(lista.body.registros.length, 2);

  // Cambio parcial: marcar "En el Libro" conserva el resto.
  const libro = await call("registros", { method: "POST", token: admin, body: { col: "movimientos", id: reg.id, fecha: reg.fecha, pasadoAlLibro: true } });
  assert.equal(libro.status, 200);
  assert.equal(libro.body.registro.pasadoAlLibro, true);
  assert.equal(libro.body.registro.monto, 4500);
  assert.equal(libro.body.registro.concepto, "Bolsas");

  const borrado = await call("registros", { method: "DELETE", url: `/?col=movimientos&id=${reg.id}`, token: admin });
  assert.equal(borrado.status, 200);
  assert.equal(borrado.body.borrado, true);
  const despues = await call("registros", { url: "/?col=movimientos", token: admin });
  assert.deepEqual(despues.body.registros.map((r) => r.id), [ingreso.body.registro.id]);
});

test("contaduría: coordinador, supervisor, paseador y ayudante reciben 403", async () => {
  const existente = (await call("registros", { url: "/?col=movimientos", token: admin })).body.registros[0];
  for (const [rol, token] of [["coordinador", coordinador], ["supervisor", supervisor], ["paseador", pas], ["ayudante", ayudante]]) {
    assert.equal((await call("registros", { url: "/?col=movimientos", token })).status, 403, `${rol} no lee`);
    assert.equal((await call("registros", { method: "POST", token, body: movimiento() })).status, 403, `${rol} no carga`);
    assert.equal((await call("registros", { method: "POST", token, body: { col: "movimientos", id: existente.id, fecha: existente.fecha, pasadoAlLibro: true } })).status, 403, `${rol} no cambia`);
    assert.equal((await call("registros", { method: "DELETE", url: `/?col=movimientos&id=${existente.id}`, token })).status, 403, `${rol} no borra`);
    assert.equal((await call("registros", { method: "DELETE", url: "/?col=movimientos&id=no-existe", token })).status, 403, `${rol} no averigua si existe`);
  }
  assert.equal((await call("registros", { url: "/?col=movimientos" })).status, 401);
  const sigue = await call("registros", { url: "/?col=movimientos", token: admin });
  assert.equal(sigue.body.registros.length, 1);
  assert.equal(sigue.body.registros[0].pasadoAlLibro, false);
});

test("contaduría: el servidor valida tipo, monto, fecha, categoría y largo de los textos", async () => {
  const malos = [
    { monto: -100 },
    { monto: 0 },
    { monto: "4500" },
    { monto: null },
    { tipo: "regalo" },
    { tipo: undefined },
    { categoria: "Planes" }, // es de ingresos, no de egresos
    { categoria: "Cualquiera" },
    { fecha: "2026-02-31" },
    { fecha: "13/11/2026" },
    { fecha: undefined },
    { concepto: "" },
    { concepto: "x".repeat(121) },
    { nota: "x".repeat(301) },
    { medio: "x".repeat(41) },
    { medio: 5 },
    { pasadoAlLibro: "sí" },
  ];
  for (const extra of malos) {
    const r = await call("registros", { method: "POST", token: admin, body: movimiento(extra) });
    assert.equal(r.status, 400, `tenía que rechazar ${JSON.stringify(extra).slice(0, 60)}`);
  }
  // Un cambio parcial tampoco puede dejar el registro inválido.
  const existente = (await call("registros", { url: "/?col=movimientos", token: admin })).body.registros[0];
  const cambio = (extra) => call("registros", { method: "POST", token: admin, body: { col: "movimientos", id: existente.id, fecha: existente.fecha, ...extra } });
  assert.equal((await cambio({ monto: -1 })).status, 400);
  assert.equal((await cambio({ tipo: "egreso" })).status, 400, "la categoría Planes no vale para un egreso");
  assert.equal((await cambio({ tipo: "egreso", categoria: "Transporte" })).status, 200);
  const lista = await call("registros", { url: "/?col=movimientos", token: admin });
  assert.equal(lista.body.registros.length, 1, "nada de lo rechazado quedó guardado");
});

test("contaduría: creadoPor lo fija el servidor y no se puede falsificar", async () => {
  const falso = { creadoPor: "coordina", creadoPorNombre: "Otra persona", creadoEn: "2020-01-01T00:00:00.000Z", actualizadoPor: "coordina" };
  const creado = await call("registros", { method: "POST", token: admin, body: movimiento(falso) });
  assert.equal(creado.status, 201);
  assert.equal(creado.body.registro.creadoPor, "juan");
  assert.notEqual(creado.body.registro.creadoPorNombre, "Otra persona");
  assert.notEqual(creado.body.registro.creadoEn, "2020-01-01T00:00:00.000Z");
  assert.equal(creado.body.registro.actualizadoPor, "juan");
  const cambio = await call("registros", { method: "POST", token: admin, body: { col: "movimientos", id: creado.body.registro.id, fecha: "2026-11-13", nota: "ok", ...falso } });
  assert.equal(cambio.status, 200);
  assert.equal(cambio.body.registro.creadoPor, "juan");
  assert.equal(cambio.body.registro.creadoEn, creado.body.registro.creadoEn);
  await call("registros", { method: "DELETE", url: `/?col=movimientos&id=${creado.body.registro.id}`, token: admin });
});

test("E-039: los PDF se descargan aislados (attachment + CSP sandbox)", async () => {
  const pdf = Buffer.from("%PDF-1.4\n%prueba\n").toString("base64");
  const sube = await call("archivos", { method: "POST", token: admin, body: { tipo: "documento", archivo: { nombre: "d.pdf", mime: "application/pdf", base64: pdf } } });
  assert.equal(sube.status, 201);
  const baja = await callRaw("archivos", { url: `/?id=${sube.body.registro.id}`, token: admin });
  assert.equal(baja.status, 200);
  assert.match(baja.headers["Content-Disposition"], /^attachment;/);
  assert.equal(baja.headers["Content-Security-Policy"], "default-src 'none'; sandbox");
  const img = (await call("registros", { url: "/?col=archivos", token: admin })).body.registros.find((r) => r.mime === "image/png");
  const ve = await callRaw("archivos", { url: `/?id=${img.id}`, token: admin });
  assert.match(ve.headers["Content-Disposition"], /^inline;/);
  assert.equal(ve.headers["Content-Security-Policy"], undefined);
});

test("E-039: en Vercel con SETUP_CODE, el primer admin necesita el código", async () => {
  const original = store.listUsers;
  store.listUsers = async () => [];
  process.env.VERCEL = "1";
  process.env.SETUP_CODE = "codigo-secreto-de-prueba";
  try {
    const sin = await call("setup", { method: "POST", body: { nombre: "Intruso", usuario: "intruso", pin: "482951" } });
    assert.equal(sin.status, 403);
    const mal = await call("setup", { method: "POST", body: { nombre: "Intruso", usuario: "intruso", pin: "482951", codigo: "otro" } });
    assert.equal(mal.status, 403);
  } finally {
    store.listUsers = original;
    delete process.env.VERCEL;
    delete process.env.SETUP_CODE;
  }
});

test("mensaje escrito sin señal: el reintento no se duplica y guarda la hora en que se escribió", async () => {
  const escritoEn = new Date(Date.now() - 20 * 60 * 1000).toISOString();
  const body = { canal: "equipo", texto: "Llegué a la plaza", cid: "cprueba123abc", escritoEn };
  const uno = await call("mensajes", { method: "POST", token: supMsj, body });
  assert.equal(uno.status, 201);
  assert.equal(uno.body.mensaje.escritoEn, escritoEn);
  const dos = await call("mensajes", { method: "POST", token: supMsj, body });
  assert.equal(dos.status, 200);
  assert.equal(dos.body.repetido, true);
  assert.equal(dos.body.mensaje.id, uno.body.mensaje.id);
  const lista = (await call("mensajes", { url: "/?canal=equipo", token: admin })).body.mensajes.filter((m) => m.texto === "Llegué a la plaza");
  assert.equal(lista.length, 1);
  // Una hora vieja (más de 6 horas) o del futuro no se acepta: se usa la hora de llegada.
  const viejo = await call("mensajes", { method: "POST", token: supMsj, body: { canal: "equipo", texto: "Viejo", cid: "cprueba999zzz", escritoEn: "2020-01-01T00:00:00.000Z" } });
  assert.equal(viejo.status, 201);
  assert.equal(viejo.body.mensaje.escritoEn, undefined);
});

test("coordinación inmediata: incidente avisa en Calle y pedido de cambio en Coordinación", async () => {
  const hoy = hoyAR();
  const avisosCalle = async () => (await call("mensajes", { url: "/?canal=calle", token: admin })).body.mensajes.filter((m) => m.automatico && /Incidente/.test(m.texto));
  const avisosCoord = async () => (await call("mensajes", { url: "/?canal=coordinacion", token: admin })).body.mensajes.filter((m) => m.automatico);
  const antesCalle = (await avisosCalle()).length;
  const antesCoord = (await avisosCoord()).length;
  const inc = await call("registros", { method: "POST", token: supMsj, body: { col: "incidentes", fecha: hoy, perroNombre: "Pistacho<script>", tipos: ["Perro suelto"], riesgo: "Alto" } });
  assert.equal(inc.status, 201);
  const calle = await avisosCalle();
  assert.equal(calle.length, antesCalle + 1);
  assert.match(calle[calle.length - 1].texto, /^URGENTE · Incidente con Pistacho: Perro suelto · riesgo alto\./);
  assert.equal(calle[calle.length - 1].texto.includes("<"), false);
  // Suma "sin leer" para el resto del equipo.
  const res = (await call("mensajes", { url: "/?resumen=1", token: admin })).body.canales.find((c) => c.canal === "calle");
  assert.ok(res.sinLeer >= 1);
  // Editar el incidente no repite el aviso.
  await call("registros", { method: "POST", token: supMsj, body: { col: "incidentes", id: inc.body.registro.id, fecha: hoy, riesgo: "Alto", detalle: "más datos" } });
  assert.equal((await avisosCalle()).length, antesCalle + 1);

  const ped = await call("registros", { method: "POST", token: supMsj, body: { col: "solicitudes", fecha: hoy, titulo: "No sale · Sam · Ruta 1", tipo: "no sale", urgente: true } });
  assert.equal(ped.status, 201);
  const coord = await avisosCoord();
  assert.equal(coord.length, antesCoord + 1);
  assert.match(coord[coord.length - 1].texto, /^URGENTE · Pedido de cambio de .+: No sale · Sam · Ruta 1\./);
});

test("revisión de la noche: rutas sin pisar, avisos sin duplicar y reintentos con el reloj corrido", async () => {
  // soloCrear no pisa una ruta guardada.
  const ruta = { col: "plantillas", id: "PJ_9M_lunes", ruta: "PJ_9M", dia: "Lunes", turno: "Mañana", paseador: "sebastian", paradas: [{ perroId: "PJ-001" }] };
  assert.equal((await call("registros", { method: "POST", token: coordMsj, body: ruta })).status, 201);
  const pisar = await call("registros", { method: "POST", token: coordMsj, body: { ...ruta, paseador: "", paradas: [], soloCrear: true } });
  assert.equal(pisar.status, 409);
  const guardada = (await call("registros", { url: "/?col=plantillas", token: coordMsj })).body.registros.find((r) => r.id === "PJ_9M_lunes");
  assert.equal(guardada.paseador, "sebastian");
  assert.equal(guardada.soloCrear, undefined);

  // Dos guardados casi juntos del mismo paseo: un solo aviso al cliente.
  const hoy = hoyAR();
  const base = { col: "paseos", id: `${hoy}_PJ-010_manana`, fecha: hoy, perroId: "PJ-010", estado: "retirado", horaRetiro: "09:10" };
  const avisos = async () => (await call("mensajes", { url: "/?canal=coordinacion", token: admin })).body.mensajes.length;
  await Promise.all([call("registros", { method: "POST", token: supMsj, body: base }), call("registros", { method: "POST", token: supMsj, body: base })]);
  const clientes = (await call("registros", { url: "/?col=clientes", token: admin })).body.registros;
  const rocco = clientes.find((c) => (c.perros || []).includes("PJ-010"));
  if (rocco) {
    const canal = (await call("mensajes", { url: `/?canal=cliente_${rocco.id}`, token: admin })).body.mensajes.filter((m) => m.texto.startsWith("Retiramos"));
    assert.equal(canal.length, 1);
  }
  assert.ok((await avisos()) >= 0);

  // Reintento con el reloj del celular adelantado: no se duplica.
  const adelantado = new Date(Date.now() + 90 * 1000).toISOString();
  const body = { canal: "equipo", texto: "Reloj corrido", cid: "crelojcorrido1", escritoEn: adelantado };
  const a = await call("mensajes", { method: "POST", token: supMsj, body });
  const b = await call("mensajes", { method: "POST", token: supMsj, body });
  assert.equal(a.status, 201);
  assert.equal(b.status, 200);
  assert.equal(b.body.mensaje.id, a.body.mensaje.id);
});

test("Vercel: no más de 12 funciones del servidor (límite del plan gratis)", async () => {
  const { readdirSync, statSync } = await import("node:fs");
  const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "api");
  const contar = (dir) => readdirSync(dir).reduce((total, nombre) => {
    if (nombre.startsWith("_") || nombre.startsWith(".")) return total;
    const ruta = path.join(dir, nombre);
    return total + (statSync(ruta).isDirectory() ? contar(ruta) : /\.(js|mjs|ts)$/.test(nombre) ? 1 : 0);
  }, 0);
  const funciones = contar(raiz);
  assert.ok(funciones <= 12, `Hay ${funciones} funciones en api/: el plan gratis de Vercel permite 12. Agrupalas (ver api/auth.js).`);
});

