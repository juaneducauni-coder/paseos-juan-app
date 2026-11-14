// Tienda de alimento y productos (página /tienda).
//
// Es un negocio separado de Paseos Juan, con identidad negro y verde (guía de marketing).
// DogPro y CatPro son marcas de VitalCrops, aliado que autorizó el uso de sus marcas.
// No inventar: lo que no está confirmado queda como PENDIENTE hasta que Juan lo pase.
// Sin cobro online: no hay pasarela de pago confirmada. El pedido se manda por WhatsApp.
import { PENDIENTE } from "./realData.js";

export const TIENDA = {
  // Pendiente de confirmar: el nombre de la tienda. Por ahora se muestra "Tienda".
  nombre: "Tienda",
  nombreConfirmado: false,
  aliado: "Aliado de Paseos Juan",
  fabricante: "VitalCrops",
};

// precio: número en pesos cuando Juan lo confirme; mientras tanto null.
// foto: ruta en /public cuando haya foto autorizada; mientras tanto null.
export const PRODUCTOS = [
  {
    id: "dogpro",
    nombre: "DogPro",
    para: "Para perros",
    marca: "DogPro",
    fabricante: "VitalCrops",
    presentacion: PENDIENTE,
    precio: null,
    foto: null,
  },
  {
    id: "catpro",
    nombre: "CatPro",
    para: "Para gatos",
    marca: "CatPro",
    fabricante: "VitalCrops",
    presentacion: PENDIENTE,
    precio: null,
    foto: null,
  },
];

export { PENDIENTE };

// ---- Importados (próximamente) ----
// Fuente: carpeta del proyecto de importación en el Drive de Paseos Juan (documentos del 09 y 10/11/2026),
// resumida en asistente/investigacion/2026-11-14-investigacion.md (E-029).
// Todo es IDEA en investigación: sin proveedor, sin compra y sin precio propio. Por eso:
// - no se venden ni se cobran: solo "Avisame cuando llegue" por WhatsApp (lista de espera);
// - el tiempo de llegada es el ESTIMADO del documento (50 días de fabricación + 3 meses en barco);
// - el nombre de la marca no se muestra hasta que Juan lo confirme.
export const IMPORTADOS = {
  confirmado: false,
  llegadaEstimada: "Unos 5 meses desde el pedido al fabricante: 50 días de fabricación y 3 meses de viaje en barco.",
  avion: "Por avión llegaría antes: Pendiente de confirmar.",
  productos: [
    { id: "peluche-latido", nombre: "Peluche con latido", para: "Calma el llanto de las primeras noches y la ansiedad.", icono: "heartPulse" },
    { id: "removedor-pelo", nombre: "Removedor de pelo reutilizable", para: "Saca el pelo de sillones y ropa, sin repuestos.", icono: "sliders" },
    { id: "alfombra-lamer", nombre: "Alfombra para lamer con ventosas", para: "Calma en el baño, al cortar uñas o con pirotecnia.", icono: "droplets" },
    { id: "alfombra-olfato", nombre: "Alfombra olfativa plegable", para: "Juego mental y comer más despacio.", icono: "pawPrint" },
    { id: "comedero-rompecabezas", nombre: "Comedero rompecabezas giratorio", para: "Estimulación mental a la hora de comer.", icono: "compass" },
    { id: "limpia-patas", nombre: "Limpiador de patas", para: "Patas limpias al volver del paseo.", icono: "pawPrint" },
    { id: "correa-manos-libres", nombre: "Correa manos libres con funda para el celular", para: "Pasear o correr con las manos libres.", icono: "route" },
    { id: "comedero-lento", nombre: "Comedero lento de silicona", para: "Para el perro que come muy rápido.", icono: "bone" },
    { id: "saca-garrapatas", nombre: "Saca garrapatas en kit", para: "Saca la garrapata entera, sin químicos.", icono: "shieldCheck" },
  ],
};
