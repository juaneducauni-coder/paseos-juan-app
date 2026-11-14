// /api/clientes/<acción> — una sola función de Vercel para el acceso de clientes.
// vercel.json reescribe /api/clientes/<acción> a /api/clientes?accion=<acción>.
// Acciones: aprobar, acceso. Cada una está en api/_rutas/clientes/.
import aprobar from "./_rutas/clientes/aprobar.js";
import acceso from "./_rutas/clientes/acceso.js";
import { despachar } from "./_lib/despachar.js";

export default despachar("clientes", { aprobar, acceso });
