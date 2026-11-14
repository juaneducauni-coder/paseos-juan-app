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

export async function readJson(req, maxBytes = MAX_BODY) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return parse(req.body);
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > maxBytes) throw new HttpError(413, "El pedido es demasiado grande.");
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

// Clave para limitar por conexión: IPv4 tal cual; IPv6 recortada al bloque /64 (un mismo
// cliente suele tener millones de direcciones dentro de su /64).
export function ipClave(ip) {
  let valor = String(ip || "desconocida").trim().toLowerCase();
  if (valor.startsWith("::ffff:") && valor.includes(".")) return valor.slice(7);
  if (!valor.includes(":")) return valor;
  valor = valor.split("%")[0];
  const doble = valor.includes("::");
  const [izq, der = ""] = valor.split("::");
  const a = izq ? izq.split(":") : [];
  const b = doble && der ? der.split(":") : [];
  const faltan = doble ? Math.max(0, 8 - a.length - b.length) : 0;
  const partes = [...a, ...Array(faltan).fill("0"), ...b];
  return `${partes.slice(0, 4).map((p) => p.replace(/^0+(?=.)/, "")).join(":")}::/64`;
}

// Límite simple en memoria (por instancia de la función): hasta `max` marcas por `ventanaMs`.
// usar() suma una marca o corta con 429; devolver() la saca (por ejemplo, si el ingreso salió bien).
export function limitador(max, ventanaMs, mensaje) {
  const marcas = new Map();
  let contador = 0;
  function limpiar(ahora) {
    for (const [clave, lista] of marcas) {
      const vigentes = lista.filter((m) => ahora - m.t < ventanaMs);
      if (vigentes.length) marcas.set(clave, vigentes);
      else marcas.delete(clave);
    }
  }
  return {
    usar(clave) {
      const ahora = Date.now();
      if (marcas.size > 5000) limpiar(ahora);
      const lista = (marcas.get(clave) || []).filter((m) => ahora - m.t < ventanaMs);
      if (lista.length >= max) {
        marcas.set(clave, lista);
        throw new HttpError(429, mensaje);
      }
      const marca = { t: ahora, n: (contador += 1) };
      lista.push(marca);
      marcas.set(clave, lista);
      return marca;
    },
    devolver(clave, marca) {
      const resto = (marcas.get(clave) || []).filter((m) => m !== marca);
      if (resto.length) marcas.set(clave, resto);
      else marcas.delete(clave);
    },
  };
}
