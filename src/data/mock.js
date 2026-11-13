// Datos de ejemplo (mock) de toda la app: roles, negocio, perros, paseos, pagos, planes y menú.

export const ROLES = {
  admin: {
    label: "Admin",
    route: "/admin",
    legacyRoute: "/dashboard/admin",
    intent: "Control total del negocio, permisos, usuarios, finanzas y configuracion.",
  },
  coordinador: {
    label: "Coordinador",
    route: "/coordinador",
    legacyRoute: "/dashboard/coordinador",
    intent: "Gestion operativa diaria, asignaciones, rutas, agenda y comunicacion.",
  },
  supervisor: {
    label: "Supervisor",
    route: "/supervisor",
    legacyRoute: "/dashboard/supervisor",
    intent: "Control grupal, seguridad, calidad de paseos e incidentes.",
  },
  paseador: {
    label: "Paseador",
    route: "/paseador",
    legacyRoute: "/dashboard/paseador",
    intent: "Ejecucion de paseos, retiros, entregas, reportes y metricas personales.",
  },
  cliente: {
    label: "Cliente",
    route: "/cliente",
    legacyRoute: "/dashboard/cliente",
    intent: "Seguimiento del perro, confianza, pagos, planes y contacto.",
  },
  visitante: {
    label: "Visitante",
    route: "/visitante",
    intent: "Visualizacion publica, informacion comercial y reserva de evaluacion.",
  },
};

// Datos públicos del negocio. Cambiar acá y se actualiza toda la página.
export const BUSINESS = {
  // Provisorio: es el número de Juan (confirmado 12/11/2026) hasta que la página tenga uno propio.
  whatsapp: "5491151460864", // 11 5146-0864
  whatsappLabel: "11 5146-0864",
  zone: "Pilar y La Lonja",
};

// Promo vigente. Se oculta sola al pasar la fecha "until" (formato AAAA-MM-DD).
export const PROMO = {
  title: "Muestra gratis de DogPro o CatPro + un paseo de regalo",
  detail: "Abierta a cualquier persona: no hace falta ser cliente ni hacer una visita previa.",
  until: "2026-12-01",
  untilLabel: "01/12/2026",
};

export const DOGS = [
  {
    id: "luna",
    name: "Luna",
    breed: "Mestiza",
    age: "4 anos",
    energy: "Alta",
    behavior: "Sociable, tira al inicio",
    risk: "Medio",
    compatibility: "Mejor con perros adultos tranquilos",
    observations: "Evitar motos y cruces muy ruidosos.",
    vet: "Vet Palermo",
    vaccines: "Completo",
  },
  {
    id: "tango",
    name: "Tango",
    breed: "Caniche",
    age: "7 anos",
    energy: "Media",
    behavior: "Ansioso en retiros",
    risk: "Bajo",
    compatibility: "Compatible con grupos pequenos",
    observations: "Premiar al salir del ascensor.",
    vet: "San Roque",
    vaccines: "Refuerzo pendiente en 30 dias",
  },
  {
    id: "nala",
    name: "Nala",
    breed: "Border Collie",
    age: "2 anos",
    energy: "Muy alta",
    behavior: "Necesita estructura",
    risk: "Medio",
    compatibility: "No juntar con perros reactivos",
    observations: "Usar correa larga solo en zona segura.",
    vet: "Animal Care",
    vaccines: "Completo",
  },
];

export const WALKS = [
  {
    id: "walk-103",
    time: "Hoy 10:00",
    zone: "Palermo Chico",
    status: "Esperando retiro",
    dogs: ["Luna", "Tango", "Nala"],
    walker: "Mica",
    route: ["Ugarteche 2980", "Cabello 3600", "Parque Las Heras", "Republica Arabe Siria 2900"],
    earnings: "$18.500",
  },
  {
    id: "walk-102",
    time: "Ayer 16:30",
    zone: "Botanico",
    status: "Entregado",
    dogs: ["Luna", "Roco"],
    walker: "Mica",
    route: ["Guemes 4200", "Jardin Botanico", "Santa Fe 3900"],
    earnings: "$12.000",
  },
];

export const WALKER_DOGS = [
  {
    id: "bruno",
    name: "Bruno",
    size: "Mediano",
    energy: "Alta",
    risk: "Bajo",
    behavior: "Sociable, tira al inicio",
    location: "Casa 12",
    note: "Usar correa corta los primeros cinco minutos.",
  },
  {
    id: "luna",
    name: "Luna",
    size: "Mediano",
    energy: "Alta",
    risk: "Medio",
    behavior: "Sociable, evitar motos",
    location: "Casa 18",
    note: "Bajar ritmo cerca de avenidas o ruidos fuertes.",
  },
  {
    id: "tango",
    name: "Tango",
    size: "Pequeño",
    energy: "Media",
    risk: "Bajo",
    behavior: "Ansioso en retiros",
    location: "Torre Norte",
    note: "Premiar calma al salir del edificio.",
  },
  {
    id: "kiara",
    name: "Kiara",
    size: "Mediano",
    energy: "Media",
    risk: "Bajo",
    behavior: "Buena, camina estable",
    location: "Casa 25",
    note: "Mantener posición central del grupo.",
  },
  {
    id: "cashi",
    name: "Cashi",
    size: "Pequeño",
    energy: "Media",
    risk: "Bajo",
    behavior: "Tranquila",
    location: "Casa 25",
    note: "Puede ir cerca de Tango.",
  },
  {
    id: "caipi",
    name: "Caipi",
    size: "Mediano",
    energy: "Alta",
    risk: "Medio",
    behavior: "Activa, requiere control inicial",
    location: "Casa 31",
    note: "Separar de estímulos al iniciar el paseo.",
  },
];

export const WALKER_CHECKLIST = [
  "Correas revisadas",
  "Agua cargada",
  "Bolsitas disponibles",
  "Bozales necesarios",
  "Botiquín básico",
  "Teléfono con batería",
];

export const WALK_STEPS = ["Preparación", "Retiro", "Paseo en curso", "Regreso", "Entregado"];

export const WALKER_COMMANDS = [
  "Avisar demora",
  "Perro retirado",
  "Paseo iniciado",
  "Paseo finalizado",
  "Contactar supervisor",
];

export const SUPERVISOR_WALKERS = [
  {
    id: "sebastian",
    name: "Sebastián",
    role: "Paseador",
    group: "Grupo A",
    schedule: "15:00 - 16:30",
    status: "En retiro",
    dogs: 6,
  },
  {
    id: "bauti",
    name: "Bauti",
    role: "Paseador",
    group: "Grupo B",
    schedule: "15:00 - 16:30",
    status: "Pendiente de inicio",
    dogs: 6,
  },
];

export const SUPERVISOR_GROUPS = [
  {
    id: "grupo-a",
    name: "Grupo A",
    walker: "Sebastián",
    averageRisk: "Medio",
    status: "En retiro",
    dogs: [
      ["Bruno", "Bajo"],
      ["Luna", "Medio"],
      ["Tango", "Bajo"],
      ["Kiara", "Bajo"],
      ["Cashi", "Bajo"],
      ["Caipi", "Medio"],
    ],
  },
  {
    id: "grupo-b",
    name: "Grupo B",
    walker: "Bauti",
    averageRisk: "Medio",
    status: "Pendiente",
    dogs: [
      ["Manolo", "Bajo"],
      ["Nole", "Bajo"],
      ["Ron", "Medio"],
      ["Coqui", "Bajo"],
      ["Forest", "Medio"],
      ["Pistacho", "Bajo"],
    ],
  },
];

export const SUPERVISOR_PICKUPS = [
  { id: "bruno", dog: "Bruno", location: "Casa 12", walker: "Sebastián", status: "Retirado", eta: "15:10" },
  { id: "luna", dog: "Luna", location: "Casa 18", walker: "Sebastián", status: "Retirado", eta: "15:15" },
  { id: "tango", dog: "Tango", location: "Torre Norte", walker: "Sebastián", status: "Pendiente", eta: "15:20" },
  { id: "manolo", dog: "Manolo", location: "Casa 30", walker: "Bauti", status: "Pendiente", eta: "15:10" },
  { id: "forest", dog: "Forest", location: "Casa 41", walker: "Bauti", status: "Pendiente", eta: "15:25" },
];

export const SUPERVISOR_ALERTS = [
  {
    id: "luna",
    dog: "Luna",
    type: "Riesgo medio",
    level: "Medio",
    description: "Evitar cruces con motos y perros externos.",
  },
  {
    id: "forest",
    dog: "Forest",
    type: "Uso de bozal",
    level: "Medio",
    description: "Confirmar bozal antes de integrar al grupo.",
  },
  {
    id: "ron",
    dog: "Ron",
    type: "Energía alta",
    level: "Medio",
    description: "Requiere control inicial en los primeros minutos.",
  },
];

export const SUPERVISOR_CHECKLIST = [
  "Paseadores presentes",
  "Equipamiento revisado",
  "Bozales confirmados cuando corresponde",
  "Botiquín disponible",
  "Rutas verificadas",
  "Clientes críticos revisados",
  "Comunicación con equipo activa",
];

export const SUPERVISOR_REPORTS = [
  {
    id: "report-luna",
    walker: "Sebastián",
    dog: "Luna",
    type: "Cruce con perro externo",
    level: "Medio",
    status: "Pendiente de revisión",
    description: "Se evitó cruce directo y se mantuvo distancia operativa.",
  },
  {
    id: "report-forest",
    walker: "Bauti",
    dog: "Forest",
    type: "Bozal confirmado",
    level: "Bajo",
    status: "Revisado",
    description: "Bozal colocado antes de integrarlo al grupo.",
  },
];

export const SUPERVISOR_SHARED_DOGS = [
  {
    id: "bruno",
    name: "Bruno",
    risk: "Bajo",
    energy: "Alta",
    recommended: "Paseador",
  },
  {
    id: "luna",
    name: "Luna",
    risk: "Medio",
    energy: "Alta",
    recommended: "Supervisor",
    reason: "Evitar motos y perros externos",
  },
  {
    id: "tango",
    name: "Tango",
    risk: "Bajo",
    energy: "Media",
    recommended: "Paseador",
  },
  {
    id: "kiara",
    name: "Kiara",
    risk: "Bajo",
    energy: "Media",
    recommended: "Paseador",
  },
  {
    id: "cashi",
    name: "Cashi",
    risk: "Bajo",
    energy: "Media",
    recommended: "Paseador",
  },
  {
    id: "caipi",
    name: "Caipi",
    risk: "Medio",
    energy: "Alta",
    recommended: "Supervisor",
    reason: "Requiere control inicial",
  },
  {
    id: "forest",
    name: "Forest",
    risk: "Medio",
    energy: "Media",
    recommended: "Supervisor",
    reason: "Requiere bozal confirmado",
  },
  {
    id: "ron",
    name: "Ron",
    risk: "Medio",
    energy: "Alta",
    recommended: "Supervisor",
    reason: "Energía alta y carácter fuerte",
  },
  {
    id: "manolo",
    name: "Manolo",
    risk: "Bajo",
    energy: "Media",
    recommended: "Paseador",
  },
  {
    id: "pistacho",
    name: "Pistacho",
    risk: "Bajo",
    energy: "Media",
    recommended: "Paseador",
  },
];

export const SUPERVISOR_ROUTE_DOGS = [
  {
    id: "bruno",
    name: "Bruno",
    zone: "Mapuche Norte",
    location: "Casa 12",
    energy: "Alta",
    risk: "Bajo",
    compatibility: "Buena",
  },
  {
    id: "luna",
    name: "Luna",
    zone: "Mapuche Norte",
    location: "Casa 18",
    energy: "Alta",
    risk: "Medio",
    compatibility: "Evitar motos y perros externos",
  },
  {
    id: "tango",
    name: "Tango",
    zone: "Mapuche Norte",
    location: "Torre Norte",
    energy: "Media",
    risk: "Bajo",
    compatibility: "Compatible con grupos pequeños",
  },
  {
    id: "kiara",
    name: "Kiara",
    zone: "Mapuche Norte",
    location: "Casa 25",
    energy: "Media",
    risk: "Bajo",
    compatibility: "Buena",
  },
  {
    id: "cashi",
    name: "Cashi",
    zone: "Mapuche Norte",
    location: "Casa 25",
    energy: "Media",
    risk: "Bajo",
    compatibility: "Tranquila",
  },
  {
    id: "caipi",
    name: "Caipi",
    zone: "Mapuche Norte",
    location: "Casa 31",
    energy: "Alta",
    risk: "Medio",
    compatibility: "Requiere control inicial",
  },
  {
    id: "manolo",
    name: "Manolo",
    zone: "Mapuche Sur",
    location: "Casa 30",
    energy: "Media",
    risk: "Bajo",
    compatibility: "Buena",
  },
  {
    id: "nole",
    name: "Nole",
    zone: "Mapuche Sur",
    location: "Casa 34",
    energy: "Media",
    risk: "Bajo",
    compatibility: "Buena",
  },
  {
    id: "ron",
    name: "Ron",
    zone: "Mapuche Sur",
    location: "Casa 37",
    energy: "Alta",
    risk: "Medio",
    compatibility: "Controlar inicio",
  },
  {
    id: "coqui",
    name: "Coqui",
    zone: "Mapuche Sur",
    location: "Casa 39",
    energy: "Media",
    risk: "Bajo",
    compatibility: "Buena",
  },
  {
    id: "forest",
    name: "Forest",
    zone: "Mapuche Sur",
    location: "Casa 41",
    energy: "Media",
    risk: "Medio",
    compatibility: "Requiere bozal confirmado",
  },
  {
    id: "pistacho",
    name: "Pistacho",
    zone: "Mapuche Sur",
    location: "Casa 45",
    energy: "Media",
    risk: "Bajo",
    compatibility: "Buena",
  },
];

export const PAYMENT_CLIENTS = [
  {
    id: "laura",
    client: "Laura",
    dogs: "Kiara y Cashi",
    plan: "Plan 2",
    amount: "$72.500",
    status: "Al día",
    due: "15 del mes",
    lastPayment: "Confirmado",
  },
  {
    id: "martin",
    client: "Martín",
    dogs: "Bruno",
    plan: "Plan 2",
    amount: "$37.500",
    status: "Pendiente",
    due: "15 del mes",
    lastPayment: "Sin confirmar",
  },
  {
    id: "sol",
    client: "Sol",
    dogs: "Pistacho",
    plan: "Plan 2",
    amount: "$37.500",
    status: "Pago por confirmar",
    due: "15 del mes",
    lastPayment: "Pendiente",
  },
  {
    id: "vilma",
    client: "Vilma",
    dogs: "Frida y Natividad",
    plan: "Plan 1",
    amount: "$45.900",
    status: "Deuda",
    due: "10 del mes",
    lastPayment: "Vencido",
  },
];

export const PAYMENT_HISTORY = [
  {
    id: "hist-laura",
    client: "Laura",
    dogs: "Kiara y Cashi",
    amount: "$72.500",
    method: "Transferencia",
    date: "15/05",
    status: "Confirmado",
    notes: "Pago mensual acreditado.",
    receipt: "comprobante-laura.pdf",
  },
  {
    id: "hist-martin",
    client: "Martín",
    dogs: "Bruno",
    amount: "$37.500",
    method: "Transferencia",
    date: "Pendiente",
    status: "Sin pagar",
    notes: "Pago pendiente de recepción.",
    receipt: "",
  },
  {
    id: "hist-sol",
    client: "Sol",
    dogs: "Pistacho",
    amount: "$37.500",
    method: "Mercado Pago",
    date: "14/05",
    status: "Por confirmar",
    notes: "Comprobante recibido, pendiente de validación.",
    receipt: "mp-sol.jpg",
  },
];

// El alias real no se guarda en el código: se envía por WhatsApp.
export const PAYMENT_ALIAS = "Te lo enviamos por WhatsApp";

export const ADMIN_SUMMARY = [
  ["Perros activos", "24", "pawPrint"],
  ["Clientes activos", "18", "users"],
  ["Paseadores activos", "3", "userCheck"],
  ["Supervisores", "1", "shieldCheck"],
  ["Coordinadores", "1", "briefcase"],
  ["Ingresos del mes", "$1.240.000", "wallet"],
  ["Cobros pendientes", "$185.000", "creditCard"],
  ["Alertas críticas", "4", "alertTriangle"],
];

export const ADMIN_HIERARCHY = [
  ["Admin / Dirección", "Control total del sistema, permisos, precios y reportes generales.", "shieldCheck"],
  ["Coordinador", "Clientes, perros nuevos, documentación, cobros, evaluaciones y comunicación.", "briefcase"],
  ["Supervisor", "Campo, rutas, paseadores, reemplazos, asignación de perros y control operativo.", "radar"],
  ["Paseador", "Ejecución del paseo, checklist, perros asignados, ruta y reportes.", "route"],
  ["Cliente", "Seguimiento de su perro, pagos, documentación, beneficios y chat.", "pawPrint"],
];

export const ADMIN_USERS = [
  ["Juan", "Admin", "Activo"],
  ["Coordinador demo", "Coordinador", "Activo"],
  ["Nico", "Supervisor", "Activo"],
  ["Sebastián", "Paseador", "Activo"],
  ["Martín", "Cliente", "Activo"],
];

export const ADMIN_REPORTS = [
  ["Coordinador", "3 evaluaciones derivadas", "fileText"],
  ["Supervisor", "2 grupos controlados", "radar"],
  ["Paseadores", "1 reporte operativo", "activity"],
  ["Clientes", "5 solicitudes abiertas", "message"],
  ["Cobros", "$85.000 pendiente", "wallet"],
  ["Incidentes", "1 alerta crítica", "alertTriangle"],
];

export const ADMIN_CLIENTS = [
  ["Laura", "Kiara y Cashi", "Mapuche Norte", "Plan 2", "Aprobada", "Al día"],
  ["Martín", "Bruno", "Mapuche Norte", "Plan 2", "Pendiente", "Pago pendiente"],
  ["Sol", "Pistacho", "Mapuche Sur", "Plan 2", "Aprobada", "Por confirmar"],
  ["Vilma", "Frida y Natividad", "Mapuche Centro", "Plan 1", "Revisión", "Deuda"],
];

export const ADMIN_SETTINGS = [
  "Configurar roles",
  "Configurar permisos",
  "Configurar zonas",
  "Configurar planes",
  "Configurar límites de perros",
  "Configurar alias de pago",
  "Configurar mensajes automáticos",
  "Configurar documentación requerida",
];

export const ADMIN_CRITICAL_ALERTS = [
  ["Forest", "Bozal obligatorio", "Confirmar antes de integrarlo al grupo."],
  ["Martín", "Pago pendiente", "Enviar recordatorio y pedir comprobante."],
  ["Bruno", "Documentación pendiente", "Solicitar carnet actualizado."],
  ["Paseador ausente", "Cobertura de ruta", "Asignar reemplazo o supervisor."],
];

export const COORDINATOR_REQUESTS = [
  {
    id: "nuevo-ingreso",
    type: "Nuevo ingreso",
    client: "Martín",
    dog: "Bruno",
    zone: "Mapuche Norte",
    status: "Perfil por completar",
    detail: "Cliente nuevo solicita integrar a Bruno al grupo de tarde.",
  },
  {
    id: "consulta-plan",
    type: "Consulta de plan",
    client: "Sol",
    dog: "Pistacho",
    zone: "Mapuche Sur",
    status: "Consulta abierta",
    detail: "Quiere conocer disponibilidad y precios del Plan 2.",
  },
  {
    id: "evaluacion-inicial",
    type: "Evaluación inicial",
    client: "Laura",
    dog: "Kiara",
    zone: "Mapuche Norte",
    status: "Lista para evaluación",
    detail: "Requiere coordinación con supervisor para primera salida controlada.",
  },
  {
    id: "cambio-conducta",
    type: "Cambio de conducta",
    client: "Vilma",
    dog: "Frida",
    zone: "Mapuche Centro",
    status: "Revisión de riesgo",
    detail: "Cliente informó mayor reactividad ante perros externos.",
  },
  {
    id: "documentacion-pendiente",
    type: "Documentación pendiente",
    client: "Martín",
    dog: "Bruno",
    zone: "Mapuche Norte",
    status: "Falta carnet",
    detail: "Solicitar carnet de vacunas actualizado antes de confirmar plan.",
  },
];

export const PRODUCTS = [
  {
    name: "Correa reforzada",
    price: "$19.900",
    tag: "Seguridad",
    icon: "packageCheck",
    description: "Ideal para paseos controlados y perros con fuerza media o alta.",
  },
  {
    name: "Kit paseo",
    price: "$34.500",
    tag: "Equipamiento",
    icon: "shoppingBag",
    description: "Incluye accesorios básicos para una rutina más ordenada y segura.",
  },
  {
    name: "Snacks naturales",
    price: "$8.900",
    tag: "Premios",
    icon: "bone",
    description: "Premios simples para reforzar buenas conductas antes o después del paseo.",
  },
];

export const PLAN_SIZES = ["Pequeño", "Mediano", "Grande"];

export const PLANS = [
  {
    name: "Plan 1",
    walks: "3 paseos semanales",
    prices: ["$24.000", "$27.000", "$30.000"],
    benefits: ["Descuento con entrenador canino"],
  },
  {
    name: "Plan 2",
    walks: "5 paseos semanales",
    prices: ["$35.000", "$37.500", "$40.000"],
    benefits: ["Descuento con entrenador canino", "Descuento con veterinaria"],
  },
  {
    name: "Plan 3",
    walks: "6 paseos semanales",
    prices: ["$39.000", "$42.000", "$45.000"],
    benefits: ["Descuento con entrenador canino", "Descuento con veterinaria", "Descuento en baño en seco"],
  },
];

export const DISCOUNTS = [
  ["2 perros", "10%"],
  ["3 perros", "20%"],
  ["4 perros", "30%"],
];

export const SINGLE_WALK_PRICES = [
  { size: "Pequeño", individual: "$10.000", group: "$8.000" },
  { size: "Mediano", individual: "$12.000", group: "$10.000" },
  { size: "Grande", individual: "$14.000", group: "$12.000" },
];

export const PERMISSIONS = [
  ["Admin", "Control total"],
  ["Coordinador", "Gestion operativa"],
  ["Supervisor", "Control grupal"],
  ["Paseador", "Ejecucion de paseos"],
  ["Cliente", "Seguimiento de su perro"],
  ["Visitante", "Solo visualizacion publica"],
];

export const MENU_ITEMS = [
  ["Inicio", "/", "home"],
  ["Sobre nosotros", "/#sobre-nosotros", "shieldCheck"],
  ["Precios", "/precios", "calendarCheck"],
  ["Tienda", "/tienda", "shoppingBag"],
  ["Compromiso", "/#testimonios", "message"],
  ["Preguntas frecuentes", "/#faq", "help"],
  ["Contacto", "/#contacto", "mail"],
  ["Ingresar", "/login", "logIn"],
  ["Registro", "/registro", "userPlus"],
];
