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

test("bloqueo después de 5 intentos fallidos", async () => {
  for (let i = 0; i < 5; i += 1) await call("login", { method: "POST", body: { usuario: "sebastian", pin: "999990" } });
  const locked = await call("login", { method: "POST", body: { usuario: "sebastian", pin: "730264" } });
  assert.equal(locked.status, 429);
});

test("desactivar usuario invalida su sesión", async () => {
  await call("usuarios", { method: "DELETE", url: "/?usuario=sebastian", token: admin });
  const me = await call("me", { token: paseador });
  assert.equal(me.status, 401);
  rmSync(dir, { recursive: true, force: true });
});
