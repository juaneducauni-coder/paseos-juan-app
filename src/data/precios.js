// Precios públicos de Paseos Juan (página /precios).
//
// Es el ÚNICO archivo que lee la página de precios. Los números vienen de los valores
// oficiales de realData.js (hoja "Planes actualizados"), que son los mismos que usan el admin
// y la página del cliente: así un cambio de precio no queda distinto en cada lado.
// Para cambiar un precio: cambialo en REAL_PLANS / REAL_SINGLE_WALK / MULTI_DOG_DISCOUNTS
// de realData.js y actualizá acá PRECIOS_VIGENTES_AL.
//
// Paseos Juan ofrece SOLO paseos grupales: el paseo suelto se publica solo con precio grupal.
// Baños y estadía no tienen precio confirmado: se consultan por WhatsApp (no inventar).
import { REAL_PLANS, REAL_SINGLE_WALK, MULTI_DOG_DISCOUNTS } from "./realData.js";

// Fecha en que se confirmaron los precios (DD/MM/AAAA).
export const PRECIOS_VIGENTES_AL = "12/11/2026";

export const TAMANOS = ["Pequeño", "Mediano", "Grande"];

// Planes semanales: precio por semana y por perro.
export const PLANES_SEMANALES = REAL_PLANS.map((plan) => ({
  id: plan.id,
  nombre: plan.name,
  paseosPorSemana: plan.walks,
  precios: plan.prices,
}));

// Paseo suelto (un solo paseo), solo grupal.
export const PASEO_SUELTO_GRUPAL = Object.fromEntries(
  TAMANOS.map((tamano) => [tamano, REAL_SINGLE_WALK[tamano].grupo]),
);

// Descuento si en la casa hay varios perros.
export const DESCUENTOS_VARIOS_PERROS = MULTI_DOG_DISCOUNTS.map((item) => ({
  perros: item.dogs,
  descuento: item.discount,
}));

// Servicios sin precio publicado.
export const SERVICIOS_A_CONSULTAR = [
  { id: "banos", nombre: "Baños", mensaje: "Hola, quiero consultar el precio del baño para mi perro." },
  { id: "estadia", nombre: "Estadía / guardería", mensaje: "Hola, quiero consultar disponibilidad y precio de estadía / guardería." },
];

export function formatoPesos(valor) {
  return `$${Number(valor).toLocaleString("es-AR")}`;
}
