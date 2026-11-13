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

