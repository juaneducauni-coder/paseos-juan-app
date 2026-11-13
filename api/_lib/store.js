// Almacenamiento de datos de la app. Se elige solo, según la configuración:
// 1. Google Sheets (vía Apps Script) si hay SHEETS_API_URL y SHEETS_API_KEY. Es el destino final:
//    los datos quedan en la planilla "Paseos Juan — Datos de la app" de Juan.
// 2. Vercel Blob privado si hay BLOB_READ_WRITE_TOKEN (provisorio, para pruebas).
// 3. Archivos locales en .data/ (desarrollo y pruebas automáticas).
import { promises as fs } from "node:fs";
import path from "node:path";
import { HttpError } from "./http.js";

const SAFE = /^[a-z0-9][a-z0-9_.-]{0,120}$/i;

function check(part, what) {
  if (!SAFE.test(String(part))) throw new HttpError(400, `${what} no válido.`);
  return String(part);
}

// ---------- Archivos locales ----------
function fileStore() {
  const root = path.resolve(process.env.DATA_DIR || ".data");
  const file = (...parts) => path.join(root, ...parts);

  async function readJson(target) {
    try {
      return JSON.parse(await fs.readFile(target, "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return null;
      throw error;
    }
  }
  async function writeJson(target, data) {
    await fs.mkdir(path.dirname(target), { recursive: true });
    const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(data, null, 2));
    await fs.rename(tmp, target);
  }
  async function listDir(dir) {
    try {
      return await fs.readdir(dir);
    } catch (error) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  }

  return {
    mode: "archivos locales",
    getUser: (u) => readJson(file("_usuarios", `${check(u, "Usuario")}.json`)),
    putUser: (user) => writeJson(file("_usuarios", `${check(user.usuario, "Usuario")}.json`), user),
    async listUsers() {
      const names = await listDir(file("_usuarios"));
      const users = await Promise.all(names.filter((n) => n.endsWith(".json")).map((n) => readJson(file("_usuarios", n))));
      return users.filter(Boolean);
    },
    deleteUser: (u) => fs.rm(file("_usuarios", `${check(u, "Usuario")}.json`), { force: true }),
    get: (col, id) => readJson(file(check(col, "Colección"), `${check(id, "Identificador")}.json`)),
    put: (col, record) => writeJson(file(check(col, "Colección"), `${check(record.id, "Identificador")}.json`), record),
    async list(col, prefix = "") {
      const names = (await listDir(file(check(col, "Colección")))).filter((n) => n.endsWith(".json") && n.startsWith(prefix));
      const records = await Promise.all(names.map((n) => readJson(file(col, n))));
      return records.filter(Boolean);
    },
    remove: (col, id) => fs.rm(file(check(col, "Colección"), `${check(id, "Identificador")}.json`), { force: true }),
  };
}

// ---------- Vercel Blob (privado) ----------
function blobStore() {
  let sdk;
  const load = async () => (sdk ||= await import("@vercel/blob"));
  const key = (...parts) => `app/${parts.join("/")}.json`;

  async function readJson(pathname) {
    const { get } = await load();
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text);
  }
  async function writeJson(pathname, data) {
    const { put } = await load();
    await put(pathname, JSON.stringify(data), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
  }
  async function listPrefix(prefix) {
    const { list } = await load();
    const found = [];
    let cursor;
    do {
      const page = await list({ prefix, cursor, limit: 1000 });
      found.push(...page.blobs);
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor && found.length < 2000);
    return found;
  }
  async function remove(pathname) {
    const { del } = await load();
    await del(pathname);
  }

  return {
    mode: "Vercel Blob (provisorio)",
    getUser: (u) => readJson(key("_usuarios", check(u, "Usuario"))),
    putUser: (user) => writeJson(key("_usuarios", check(user.usuario, "Usuario")), user),
    async listUsers() {
      const blobs = await listPrefix("app/_usuarios/");
      return (await Promise.all(blobs.map((b) => readJson(b.pathname)))).filter(Boolean);
    },
    deleteUser: (u) => remove(key("_usuarios", check(u, "Usuario"))),
    get: (col, id) => readJson(key(check(col, "Colección"), check(id, "Identificador"))),
    put: (col, record) => writeJson(key(check(col, "Colección"), check(record.id, "Identificador")), record),
    async list(col, prefix = "") {
      const blobs = await listPrefix(`app/${check(col, "Colección")}/${prefix}`);
      return (await Promise.all(blobs.map((b) => readJson(b.pathname)))).filter(Boolean);
    },
    remove: (col, id) => remove(key(check(col, "Colección"), check(id, "Identificador"))),
  };
}

// ---------- Google Sheets vía Apps Script ----------
function sheetsStore() {
  const url = process.env.SHEETS_API_URL;
  const apiKey = process.env.SHEETS_API_KEY;

  async function call(action, payload = {}) {
    const response = await fetch(url, {
      method: "POST",
      // text/plain evita el preflight y Apps Script lo acepta igual.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ key: apiKey, action, ...payload }),
      redirect: "follow",
    });
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new HttpError(502, "La planilla de datos no respondió bien. Revisá la publicación del script.");
    }
    if (!data.ok) throw new HttpError(502, `La planilla de datos respondió: ${data.error || "error"}`);
    return data.result;
  }

  return {
    mode: "Google Sheets",
    getUser: (u) => call("getUser", { usuario: check(u, "Usuario") }),
    putUser: (user) => call("putUser", { user }),
    listUsers: () => call("listUsers"),
    deleteUser: (u) => call("deleteUser", { usuario: check(u, "Usuario") }),
    get: (col, id) => call("get", { col: check(col, "Colección"), id: check(id, "Identificador") }),
    put: (col, record) => call("put", { col: check(col, "Colección"), record }),
    list: (col, prefix = "") => call("list", { col: check(col, "Colección"), prefix }),
    remove: (col, id) => call("remove", { col: check(col, "Colección"), id: check(id, "Identificador") }),
  };
}

function choose() {
  if (process.env.SHEETS_API_URL && process.env.SHEETS_API_KEY) return sheetsStore();
  if (process.env.BLOB_READ_WRITE_TOKEN) return blobStore();
  if (process.env.VERCEL) {
    const unavailable = () => {
      throw new HttpError(503, "Falta conectar la base de datos de la app.");
    };
    return new Proxy({ mode: "sin conectar" }, { get: (t, p) => (p === "mode" ? t.mode : unavailable) });
  }
  return fileStore();
}

export const store = choose();
