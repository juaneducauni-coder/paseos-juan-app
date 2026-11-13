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
