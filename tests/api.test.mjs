// Pruebas del servidor con almacenamiento en archivos temporales.
// Correr: npm run test:api
import { test } from "node:test";
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
  setup: (await import("../api/auth/setup.js")).default,
  login: (await import("../api/auth/login.js")).default,
  me: (await import("../api/auth/me.js")).default,
  pin: (await import("../api/auth/pin.js")).default,
  usuarios: (await import("../api/usuarios.js")).default,
  registros: (await import("../api/registros.js")).default,
  evaluacion: (await import("../api/publico/evaluacion.js")).default,
  archivos: (await import("../api/archivos.js")).default,
  google: (await import("../api/auth/google.js")).default,
  mensajes: (await import("../api/mensajes.js")).default,
  authCliente: (await import("../api/auth/cliente.js")).default,
  acceso: (await import("../api/clientes/acceso.js")).default,
};

async function call(route, { method = "GET", url = "/", body, token } = {}) {
  const req = Readable.from(body ? [JSON.stringify(body)] : []);
  req.method = method;
  req.url = url;
  req.headers = token ? { authorization: `Bearer ${token}` } : {};
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
let coordinador;
let supervisor;
let marketing;

test("mensajes: canales de grupo según el rol", async () => {
  coordinador = await tokenDe("coordina", "736195");
  await call("usuarios", { method: "POST", token: admin, body: { usuario: "sole", nombre: "Sole", rol: "supervisor", pin: "620481", crear: true } });
  await call("usuarios", { method: "POST", token: admin, body: { usuario: "mateo", nombre: "Mateo", rol: "marketing", pin: "620482", crear: true } });
  supervisor = await tokenDe("sole", "620481");
  marketing = await tokenDe("mateo", "620482");

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
  assert.equal((await call("mensajes", { url: "/?canal=equipo", token: marketing })).status, 403);
  assert.equal((await call("mensajes", { method: "POST", token: supervisor, body: { canal: "coordinacion", texto: "Falta retirar a Kiara" } })).status, 201);
  assert.equal((await call("mensajes", { url: "/?canal=coordinacion", token: coordinador })).body.mensajes.length, 1);

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
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: coordinador })).body.mensajes.length, 1);
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: admin })).status, 403);
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: supervisor })).status, 403);
  assert.equal((await call("mensajes", { method: "POST", token: admin, body: { canal, texto: "hola" } })).status, 403);
  // Al revés o con uno mismo no vale.
  assert.equal((await call("mensajes", { url: "/?canal=dm_sebastian__coordina", token: paseador })).status, 403);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "dm_sebastian__sebastian", texto: "yo" } })).status, 403);
  // Con alguien que no existe, no se crea el chat.
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "dm_nadie__sebastian", texto: "hola" } })).status, 404);

  const resumen = await call("mensajes", { url: "/?resumen=1", token: coordinador });
  const canales = resumen.body.canales.map((c) => c.canal);
  assert.ok(canales.includes(canal) && canales.includes("coordinacion") && canales.includes("equipo"));
  const directo = resumen.body.canales.find((c) => c.canal === canal);
  assert.equal(directo.sinLeer, 1);
  assert.equal(directo.con.usuario, "sebastian");
  const delAdmin = (await call("mensajes", { url: "/?resumen=1", token: admin })).body.canales.map((c) => c.canal);
  assert.equal(delAdmin.includes(canal), false);
  const delPaseador = (await call("mensajes", { url: "/?resumen=1", token: paseador })).body.canales.map((c) => c.canal);
  assert.equal(delPaseador.includes("coordinacion"), false);

  assert.equal((await call("mensajes", { method: "POST", token: coordinador, body: { canal, leido: true } })).status, 200);
  const despues = (await call("mensajes", { url: "/?resumen=1", token: coordinador })).body.canales.find((c) => c.canal === canal);
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
  const alta = await call("registros", { method: "POST", token: coordinador, body: { col: "clientes", id: "cli-ana", nombre: "Ana López", telefono: "1155550000", barrio: "Palermo", perros: ["PJ-001"], estado: "activo" } });
  assert.equal(alta.status, 201);
  await call("registros", { method: "POST", token: coordinador, body: { col: "clientes", id: "cli-otro", nombre: "Otro", perros: ["PJ-002"], estado: "activo" } });

  // Solo admin y coordinador generan enlaces.
  assert.equal((await call("acceso", { method: "POST", token: paseador, body: { clienteId: "cli-ana" } })).status, 403);
  assert.equal((await call("acceso", { method: "POST", token: coordinador, body: { clienteId: "no-existe" } })).status, 404);
  const crea = await call("acceso", { method: "POST", token: coordinador, body: { clienteId: "cli-ana" } });
  assert.equal(crea.status, 201);
  assert.match(crea.body.enlace, /^\/c\/[A-Za-z0-9_-]{43}$/);
  enlace = crea.body.enlace.slice(3);
  // El token nunca queda guardado en claro, y el hash no se devuelve.
  const { readFileSync } = await import("node:fs");
  const guardado = readFileSync(path.join(dir, "clientes", "cli-ana.json"), "utf8");
  assert.equal(guardado.includes(enlace), false);
  assert.match(JSON.parse(guardado).acceso.hash, /^[0-9a-f]{64}$/);
  const vistos = await call("registros", { url: "/?col=clientes", token: coordinador });
  assert.ok(vistos.body.registros.every((c) => !c.acceso || c.acceso.hash === undefined));
  // Nadie puede pisar el acceso por /api/registros.
  await call("registros", { method: "POST", token: coordinador, body: { col: "clientes", id: "cli-ana", acceso: { hash: "0".repeat(64), activo: true } } });
  assert.equal(JSON.parse(readFileSync(path.join(dir, "clientes", "cli-ana.json"), "utf8")).acceso.hash, JSON.parse(guardado).acceso.hash);

  // Tokens inválidos.
  assert.equal((await call("authCliente", { method: "POST", body: { token: "x".repeat(43) } })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: { token: "corto" } })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: {} })).status, 401);
  const entra = await call("authCliente", { method: "POST", body: { token: enlace } });
  assert.equal(entra.status, 200);
  clienteToken = entra.body.token;
  assert.deepEqual(entra.body.user, { usuario: "cliente:cli-ana", nombre: "Ana López", rol: "cliente", clienteId: "cli-ana", perros: ["PJ-001"] });
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
  assert.deepEqual(resumen.body.canales.map((c) => c.canal), [canal]);

  // Coordinador y admin leen y responden.
  assert.equal((await call("mensajes", { url: `/?canal=${canal}`, token: coordinador })).body.mensajes.length, 1);
  assert.equal((await call("mensajes", { method: "POST", token: admin, body: { canal, texto: "Perfecto, lo sacamos de la ruta" } })).status, 201);
  const resCoord = (await call("mensajes", { url: "/?resumen=1", token: coordinador })).body.canales.find((c) => c.canal === canal);
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
  assert.equal(porPerro.body.mensaje.canal, canal);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal: "cliente", perroId: "PJ-099", texto: "x", tipo: "aviso" } })).status, 404);
  // Al cliente solo le llegan fotos de sus perros.
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal, texto: "Foto", tipo: "aviso", adjuntoId: fotoKiara } })).status, 400);
  assert.equal((await call("mensajes", { method: "POST", token: paseador, body: { canal, texto: "Foto", tipo: "aviso", adjuntoId: fotoPistacho } })).status, 201);
  const resPaseador = (await call("mensajes", { url: "/?resumen=1", token: paseador })).body.canales.map((c) => c.canal);
  assert.equal(resPaseador.includes(canal), false);
  // Canal de un cliente que no existe.
  assert.equal((await call("mensajes", { method: "POST", token: coordinador, body: { canal: "cliente_no-existe", texto: "hola" } })).status, 404);
});

test("aviso automático al cliente cuando se marca el paseo (sin duplicar)", async () => {
  const hoy = hoyAR();
  const id = `${hoy}_PJ-001_prueba1`;
  const base = { col: "paseos", id, fecha: hoy, perroId: "PJ-001", perroNombre: "Pistacho", turno: "Mañana" };
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
  const id2 = `${hoy}_PJ-001_prueba2`;
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
  // El equipo de calle no ve el canal del cliente, pero el paseo dice qué avisos salieron.
  const paseo = (await call("registros", { url: `/?col=paseos&desde=${hoy}`, token: admin })).body.registros.find((p) => p.id === id);
  assert.deepEqual([...paseo.avisosCliente].sort(), ["entregado", "foto", "paseando", "retirado"]);
});

function nicolasOSupervisor() {
  return supervisor;
}

test("enlace del cliente: renovar y revocar cortan las sesiones", async () => {
  const nuevo = await call("acceso", { method: "POST", token: admin, body: { clienteId: "cli-ana" } });
  assert.equal(nuevo.status, 201);
  assert.equal((await call("me", { token: clienteToken })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: { token: enlace } })).status, 401);
  const otraSesion = (await call("authCliente", { method: "POST", body: { token: nuevo.body.enlace.slice(3) } })).body.token;
  assert.equal((await call("mensajes", { url: "/?canal=cliente_cli-ana", token: otraSesion })).status, 200);
  const revoca = await call("acceso", { method: "POST", token: coordinador, body: { clienteId: "cli-ana", revocar: true } });
  assert.equal(revoca.status, 200);
  assert.equal(revoca.body.acceso.activo, false);
  assert.equal((await call("mensajes", { url: "/?canal=cliente_cli-ana", token: otraSesion })).status, 401);
  assert.equal((await call("authCliente", { method: "POST", body: { token: nuevo.body.enlace.slice(3) } })).status, 401);
  // Nombres reservados para usuarios del equipo.
  assert.equal((await call("usuarios", { method: "POST", token: admin, body: { usuario: "cliente_x", nombre: "X", rol: "paseador", pin: "620483", crear: true } })).status, 400);
  assert.equal((await call("usuarios", { method: "POST", token: admin, body: { usuario: "a__b", nombre: "X", rol: "paseador", pin: "620483", crear: true } })).status, 400);
});

test("bloqueo después de 5 intentos fallidos", async () => {
  for (let i = 0; i < 5; i += 1) await call("login", { method: "POST", body: { usuario: "sebastian", pin: "999990" } });
  const locked = await call("login", { method: "POST", body: { usuario: "sebastian", pin: "730264" } });
  assert.equal(locked.status, 429);
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
  rmSync(dir, { recursive: true, force: true });
});

