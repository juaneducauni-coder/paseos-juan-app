// Nombres de ruta para mostrar en pantalla. El código interno ("PJ_1M") no se muestra:
// "PJ_1M" → "Ruta 1" o "Ruta 1 · Mañana". Lo usan coordinador, supervisor, admin y paseador.
const CODIGO = /^PJ_(\d+)([MT])$/i;
const CODIGO_EN_TEXTO = /\bPJ_(\d+)([MT])\b/gi;

export function routeName(code, { withShift = false } = {}) {
  const text = String(code || "").trim();
  const match = CODIGO.exec(text);
  if (!match) return text;
  return `Ruta ${match[1]}${withShift ? ` · ${match[2].toUpperCase() === "M" ? "Mañana" : "Tarde"}` : ""}`;
}

// Reemplaza los códigos dentro de un texto guardado (por ejemplo, el título de un pedido viejo).
export function sinCodigosDeRuta(text) {
  return String(text ?? "").replace(CODIGO_EN_TEXTO, (_, n) => `Ruta ${n}`);
}
