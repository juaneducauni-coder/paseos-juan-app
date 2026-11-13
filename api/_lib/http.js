// Utilidades HTTP que funcionan igual en Vercel Functions y en el servidor local de desarrollo.

export function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

export function fail(res, status, mensaje, extra = {}) {
  send(res, status, { ok: false, error: mensaje, ...extra });
}

export function query(req) {
  return new URL(req.url || "/", "http://localhost").searchParams;
}

const MAX_BODY = 64 * 1024;

export async function readJson(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return parse(req.body);
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > MAX_BODY) throw new HttpError(413, "El pedido es demasiado grande.");
  }
  return parse(raw);
}

function parse(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw new HttpError(400, "El pedido no tiene un formato válido.");
  }
}

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Envuelve un handler: métodos permitidos y errores en castellano.
export function handler(methods, fn) {
  return async (req, res) => {
    try {
      if (!methods[req.method]) {
        res.setHeader("Allow", Object.keys(methods).join(", "));
        return fail(res, 405, "Método no permitido.");
      }
      await fn(req, res, methods[req.method]);
    } catch (error) {
      if (error instanceof HttpError) return fail(res, error.status, error.message);
      console.error("[api]", error);
      return fail(res, 500, "Ocurrió un error en el servidor. Probá de nuevo en un rato.");
    }
  };
}

export function clientIp(req) {
  const forwarded = req.headers?.["x-forwarded-for"];
  if (forwarded) return String(forwarded).split(",")[0].trim();
  return req.socket?.remoteAddress || "desconocida";
}
