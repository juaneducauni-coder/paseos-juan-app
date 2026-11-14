// Elige la acción de una función que agrupa varias (ver api/auth.js y api/clientes.js).
// La acción sale del parámetro "accion" (lo pone la regla de vercel.json) o del final de la
// dirección (/api/auth/login), así funciona igual en Vercel y en el servidor de desarrollo.
const ACCION = /^[a-z]{2,20}$/;

export function despachar(base, acciones) {
  return async function (req, res) {
    const url = new URL(req.url || "/", "http://localhost");
    let accion = url.searchParams.get("accion") || "";
    if (!accion) {
      const partes = url.pathname.replace(/\/$/, "").split("/");
      const i = partes.indexOf(base);
      accion = i >= 0 ? partes[i + 1] || "" : "";
    }
    const handler = ACCION.test(accion) && Object.prototype.hasOwnProperty.call(acciones, accion) ? acciones[accion] : null;
    if (!handler) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      return res.end(JSON.stringify({ ok: false, error: "No existe." }));
    }
    return handler(req, res);
  };
}
