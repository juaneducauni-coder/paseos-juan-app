// /api/auth/<acción> — una sola función de Vercel para todo el ingreso (el plan gratis permite
// 12 funciones por versión). vercel.json reescribe /api/auth/<acción> a /api/auth?accion=<acción>.
// Acciones: login, me, pin, setup, google, cliente. Cada una está en api/_rutas/auth/.
import login from "./_rutas/auth/login.js";
import me from "./_rutas/auth/me.js";
import pin from "./_rutas/auth/pin.js";
import setup from "./_rutas/auth/setup.js";
import google from "./_rutas/auth/google.js";
import cliente from "./_rutas/auth/cliente.js";
import { despachar } from "./_lib/despachar.js";

export default despachar("auth", { login, me, pin, setup, google, cliente });
