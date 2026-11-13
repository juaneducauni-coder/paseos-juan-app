// Verificación de "Iniciar sesión con Google" (Google Identity Services).
// El navegador recibe un ID token de Google; acá se valida con Google antes de confiar en él.
import { HttpError } from "./http.js";

export function googleClientId() {
  return process.env.GOOGLE_CLIENT_ID || "";
}

export async function verificarGoogle(credential) {
  const clientId = googleClientId();
  if (!clientId) throw new HttpError(503, "El ingreso con Google todavía no está activado.");
  if (!credential || typeof credential !== "string" || credential.length > 4096) {
    throw new HttpError(400, "Falta la respuesta de Google.");
  }
  let data;
  try {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
    data = await response.json();
    if (!response.ok) throw new Error(data.error_description || "token inválido");
  } catch {
    throw new HttpError(401, "Google no confirmó el ingreso. Probá de nuevo.");
  }
  const issOk = data.iss === "accounts.google.com" || data.iss === "https://accounts.google.com";
  const vigente = Number(data.exp) * 1000 > Date.now();
  const verificado = data.email_verified === true || data.email_verified === "true";
  if (data.aud !== clientId || !issOk || !vigente || !verificado || !data.email) {
    throw new HttpError(401, "Google no confirmó el ingreso. Probá de nuevo.");
  }
  return { email: String(data.email).toLowerCase(), nombre: data.name || "", foto: data.picture || "" };
}
