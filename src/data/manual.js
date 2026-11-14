// Contenido del manual con historias (/manual). Una historia por rol.
// Reglas: frases cortas (máximo unas 12 palabras), palabras completas, nada inventado.
// "arte" es el nombre del dibujo en views/manual.js.

export const MANUAL_ROLES = [
  {
    id: "cliente",
    nombre: "Cliente",
    resumen: "Tu perro pasea con nosotros",
    icono: "pawPrint",
    pasos: [
      { arte: "evaluacion", texto: "Pedí una evaluación: conocemos a tu perro antes de sumarlo." },
      { arte: "regalo", texto: "El primer paseo es gratis." },
      { arte: "pagina", texto: "En tu página ves los paseos de tu perro." },
      { arte: "ausencia", texto: "¿No sale un día? Avisá la ausencia desde tu página." },
      { arte: "carnet", texto: "Mandá el carnet de vacunas al día." },
      { arte: "whatsapp", texto: "¿Dudas? Escribinos por WhatsApp." },
    ],
    destino: { texto: "Ir a mi página", href: "/cliente" },
    extra: { texto: "Pedir evaluación", href: "/#evaluacion" },
  },
  {
    id: "paseador",
    nombre: "Paseador",
    resumen: "Hacés la ruta del turno",
    icono: "route",
    pasos: [
      { arte: "ingreso", texto: "Entrá con tu usuario y tu PIN, o con Google." },
      { arte: "pechera", texto: "Antes de salir, ponete la pechera. Siempre." },
      { arte: "ruta", texto: "Mirá la ruta del turno, perro por perro." },
      { arte: "secuencia", texto: "Con cada perro: Retiré, foto del paseo y Entregué." },
      { arte: "avisos", texto: "Aviso rojo: pasó algo. Azul: prevención. Tocá Visto." },
      { arte: "incidente", texto: "¿Pasó algo? Contá solo lo que viste: qué, dónde y cuándo." },
    ],
    destino: { texto: "Ir a mi ruta", href: "/paseador" },
  },
  {
    id: "ayudante",
    nombre: "Ayudante",
    resumen: "Acompañás al paseador",
    icono: "briefcaseMedical",
    pasos: [
      { arte: "checklist", texto: "Antes de salir: muslera, botiquín, agua, bolsas y celular cargado." },
      { arte: "botiquin", texto: "En el botiquín: agua oxigenada y gasa." },
      { arte: "integracion", texto: "Perro nuevo: lo recibís y caminás con él la primera cuadra." },
      { arte: "devolver", texto: "Devolvés como máximo 2 perros a la vez." },
      { arte: "hidratar", texto: "Dales agua y ayudá a levantar la caca con bolsas." },
      { arte: "dividir", texto: "¿Otra manada o un perro suelto? Dividan el grupo y calmá a los alterados." },
    ],
    destino: { texto: "Ir al checklist", href: "/paseador" },
  },
  {
    id: "supervisor",
    nombre: "Supervisor",
    resumen: "Controlás el turno en vivo",
    icono: "radar",
    pasos: [
      { arte: "tablero", texto: "Mirá el turno en vivo: quién retiró y quién entregó." },
      { arte: "atrasados", texto: "Los atrasados aparecen marcados. Revisalos primero." },
      { arte: "pedido", texto: "¿Hay que cambiar una ruta? Pedíselo al coordinador en 2 toques." },
      { arte: "control", texto: "Vos controlás. El cambio lo hace el coordinador." },
    ],
    destino: { texto: "Abrir el tablero", href: "/supervisor" },
  },
  {
    id: "coordinador",
    nombre: "Coordinador",
    resumen: "Armás rutas y horarios",
    icono: "calendarCheck",
    pasos: [
      { arte: "rutas", texto: "Armás las rutas y los horarios de cada turno." },
      { arte: "clientes", texto: "Llevás al día los clientes y sus perros." },
      { arte: "barrio", texto: "Mandás avisos por barrio." },
      { arte: "pedido", texto: "Recibís los pedidos de cambio del supervisor." },
      { arte: "sinPlata", texto: "La plata no la ves: la maneja el administrador." },
    ],
    destino: { texto: "Abrir coordinación", href: "/coordinador" },
  },
  {
    id: "admin",
    nombre: "Administrador",
    resumen: "Ves todo, también la plata",
    icono: "shieldCheck",
    pasos: [
      { arte: "todo", texto: "Ves todo: equipo, clientes, rutas y avisos." },
      { arte: "plata", texto: "La plata y los pagos los manejás solo vos." },
      { arte: "comprobante", texto: "Confirmás los comprobantes que suben los clientes." },
      { arte: "usuarios", texto: "Creás los usuarios del equipo y sus PIN." },
    ],
    destino: { texto: "Abrir administración", href: "/admin" },
  },
];

export const MANUAL_ACCESOS = [
  { texto: "Ingresar", href: "/login", icono: "logIn" },
  { texto: "Mi página de cliente", href: "/cliente", icono: "home" },
  { texto: "Precios", href: "/precios", icono: "dollarSign" },
  { texto: "Tienda", href: "/tienda", icono: "shoppingBag" },
  { texto: "Pedir evaluación", href: "/#evaluacion", icono: "clipboardCheck" },
];
