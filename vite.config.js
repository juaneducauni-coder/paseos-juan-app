// Vite + las funciones de /api en el mismo servidor de desarrollo.
// En Vercel, cada archivo de /api es una función; acá se montan como middleware.
import { defineConfig } from "vite";
import path from "node:path";
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

function apiDevPlugin() {
  return {
    name: "paseos-juan-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next();
        const route = new URL(req.url, "http://localhost").pathname.replace(/^\/api\//, "").replace(/\/$/, "");
        const file = path.resolve("api", `${route}.js`);
        if (route.includes("..") || route.startsWith("_") || !existsSync(file)) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ ok: false, error: "No existe." }));
        }
        const mod = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
        return mod.default(req, res);
      });
    },
  };
}

export default defineConfig({
  plugins: [apiDevPlugin()],
});
