import { getStore, saveStore, openModal, closeModal, showToast, canDo } from "./store/paseosJuanStore.js";
import { getChatConversations, canReplyToClient, sendChatMessage } from "./data/chatDemo.js";

const ROLES = {
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

const DOGS = [
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

const WALKS = [
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

const WALKER_DOGS = [
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

const WALKER_CHECKLIST = [
  "Correas revisadas",
  "Agua cargada",
  "Bolsitas disponibles",
  "Bozales necesarios",
  "Botiquín básico",
  "Teléfono con batería",
];

const WALK_STEPS = ["Preparación", "Retiro", "Paseo en curso", "Regreso", "Entregado"];

const WALKER_COMMANDS = [
  "Avisar demora",
  "Perro retirado",
  "Paseo iniciado",
  "Paseo finalizado",
  "Contactar supervisor",
];

const SUPERVISOR_WALKERS = [
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

const SUPERVISOR_GROUPS = [
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

const SUPERVISOR_PICKUPS = [
  { id: "bruno", dog: "Bruno", location: "Casa 12", walker: "Sebastián", status: "Retirado", eta: "15:10" },
  { id: "luna", dog: "Luna", location: "Casa 18", walker: "Sebastián", status: "Retirado", eta: "15:15" },
  { id: "tango", dog: "Tango", location: "Torre Norte", walker: "Sebastián", status: "Pendiente", eta: "15:20" },
  { id: "manolo", dog: "Manolo", location: "Casa 30", walker: "Bauti", status: "Pendiente", eta: "15:10" },
  { id: "forest", dog: "Forest", location: "Casa 41", walker: "Bauti", status: "Pendiente", eta: "15:25" },
];

const SUPERVISOR_ALERTS = [
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

const SUPERVISOR_CHECKLIST = [
  "Paseadores presentes",
  "Equipamiento revisado",
  "Bozales confirmados cuando corresponde",
  "Botiquín disponible",
  "Rutas verificadas",
  "Clientes críticos revisados",
  "Comunicación con equipo activa",
];

const SUPERVISOR_REPORTS = [
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

const SUPERVISOR_SHARED_DOGS = [
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

const SUPERVISOR_ROUTE_DOGS = [
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

const PAYMENT_CLIENTS = [
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

const PAYMENT_HISTORY = [
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

const PAYMENT_ALIAS = "dejandohuellas.plan";

const ADMIN_SUMMARY = [
  ["Perros activos", "24", "pawPrint"],
  ["Clientes activos", "18", "users"],
  ["Paseadores activos", "3", "userCheck"],
  ["Supervisores", "1", "shieldCheck"],
  ["Coordinadores", "1", "briefcase"],
  ["Ingresos del mes", "$1.240.000", "wallet"],
  ["Cobros pendientes", "$185.000", "creditCard"],
  ["Alertas críticas", "4", "alertTriangle"],
];

const ADMIN_HIERARCHY = [
  ["Admin / Dirección", "Control total del sistema, permisos, precios y reportes generales.", "shieldCheck"],
  ["Coordinador", "Clientes, perros nuevos, documentación, cobros, evaluaciones y comunicación.", "briefcase"],
  ["Supervisor", "Campo, rutas, paseadores, reemplazos, asignación de perros y control operativo.", "radar"],
  ["Paseador", "Ejecución del paseo, checklist, perros asignados, ruta y reportes.", "route"],
  ["Cliente", "Seguimiento de su perro, pagos, documentación, beneficios y chat.", "pawPrint"],
];

const ADMIN_USERS = [
  ["Juan", "Admin", "Activo"],
  ["Coordinador demo", "Coordinador", "Activo"],
  ["Nico", "Supervisor", "Activo"],
  ["Sebastián", "Paseador", "Activo"],
  ["Martín", "Cliente", "Activo"],
];

const ADMIN_REPORTS = [
  ["Coordinador", "3 evaluaciones derivadas", "fileText"],
  ["Supervisor", "2 grupos controlados", "radar"],
  ["Paseadores", "1 reporte operativo", "activity"],
  ["Clientes", "5 solicitudes abiertas", "message"],
  ["Cobros", "$85.000 pendiente", "wallet"],
  ["Incidentes", "1 alerta crítica", "alertTriangle"],
];

const ADMIN_CLIENTS = [
  ["Laura", "Kiara y Cashi", "Mapuche Norte", "Plan 2", "Aprobada", "Al día"],
  ["Martín", "Bruno", "Mapuche Norte", "Plan 2", "Pendiente", "Pago pendiente"],
  ["Sol", "Pistacho", "Mapuche Sur", "Plan 2", "Aprobada", "Por confirmar"],
  ["Vilma", "Frida y Natividad", "Mapuche Centro", "Plan 1", "Revisión", "Deuda"],
];

const ADMIN_SETTINGS = [
  "Configurar roles",
  "Configurar permisos",
  "Configurar zonas",
  "Configurar planes",
  "Configurar límites de perros",
  "Configurar alias de pago",
  "Configurar mensajes automáticos",
  "Configurar documentación requerida",
];

const ADMIN_CRITICAL_ALERTS = [
  ["Forest", "Bozal obligatorio", "Confirmar antes de integrarlo al grupo."],
  ["Martín", "Pago pendiente", "Enviar recordatorio y pedir comprobante."],
  ["Bruno", "Documentación pendiente", "Solicitar carnet actualizado."],
  ["Paseador ausente", "Cobertura de ruta", "Asignar reemplazo o supervisor."],
];

const COORDINATOR_REQUESTS = [
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

const PRODUCTS = [
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

const PLAN_SIZES = ["Pequeño", "Mediano", "Grande"];

const PLANS = [
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

const DISCOUNTS = [
  ["2 perros", "10%"],
  ["3 perros", "20%"],
  ["4 perros", "30%"],
];

const SINGLE_WALK_PRICES = [
  { size: "Pequeño", individual: "$10.000", group: "$8.000" },
  { size: "Mediano", individual: "$12.000", group: "$10.000" },
  { size: "Grande", individual: "$14.000", group: "$12.000" },
];

const PERMISSIONS = [
  ["Admin", "Control total"],
  ["Coordinador", "Gestion operativa"],
  ["Supervisor", "Control grupal"],
  ["Paseador", "Ejecucion de paseos"],
  ["Cliente", "Seguimiento de su perro"],
  ["Visitante", "Solo visualizacion publica"],
];

const MENU_ITEMS = [
  ["Inicio", "/", "home"],
  ["Sobre nosotros", "/#sobre-nosotros", "shieldCheck"],
  ["Planes", "/#planes", "calendarCheck"],
  ["Testimonios", "/#testimonios", "message"],
  ["Preguntas frecuentes", "/#faq", "help"],
  ["Contacto", "/#contacto", "mail"],
  ["Login", "/login", "logIn"],
  ["Registro", "/registro", "userPlus"],
];

const app = document.querySelector("#app");
let menuOpen = false;
let chatOpen = false;
let revealObserver;

function icon(name, className = "line-icon") {
  const attrs = `class="${className}" viewBox="0 0 24 24" aria-hidden="true"`;
  const paths = {
    activity: `<path d="M4 12h4l2-6 4 12 2-6h4" />`,
    arrowRight: `<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,
    briefcase: `<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><path d="M4 7h16v12H4z" /><path d="M9 12h6" />`,
    briefcaseMedical: `<path d="M10 6V5a2 2 0 0 1 4 0v1" /><path d="M4 7h16v12H4z" /><path d="M12 11v5" /><path d="M9.5 13.5h5" />`,
    calendarCheck: `<path d="M7 3v4" /><path d="M17 3v4" /><path d="M4 8h16" /><path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="m9 15 2 2 4-5" />`,
    camera: `<path d="M14 6 13 4h-2L10 6H6a2 2 0 0 0-2 2v10h16V8a2 2 0 0 0-2-2Z" /><circle cx="12" cy="13" r="3" />`,
    checkCircle: `<circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.4 2.4 4.9-5" />`,
    chart: `<path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15V9" /><path d="M12 15V6" /><path d="M16 15v-4" />`,
    clipboardCheck: `<path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 4h6" /><path d="m8.5 14 2 2 4.8-5" />`,
    clock: `<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`,
    alertCircle: `<circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" />`,
    alertTriangle: `<path d="M12 3 22 20H2L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" />`,
    archive: `<rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v12h14V8" /><path d="M10 12h4" />`,
    bell: `<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" />`,
    bone: `<path d="M7.5 8.5a3 3 0 1 1 2-5.2 3 3 0 0 1 5 0 3 3 0 1 1 2 5.2l-8 7a3 3 0 1 1-2-5.2 3 3 0 0 1 0-3.6 3 3 0 0 1 1 1.8Z" />`,
    chevronDown: `<path d="m6 9 6 6 6-6" />`,
    compass: `<circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />`,
    creditCard: `<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" />`,
    database: `<ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />`,
    copy: `<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,
    dollarSign: `<path d="M12 2v20" /><path d="M17 6.5c-1.2-1-2.8-1.5-5-1.5-3 0-5 1.4-5 3.5 0 5 10 2.5 10 7.5 0 2.1-2 3.5-5 3.5-2.2 0-4-.6-5.5-1.8" />`,
    droplets: `<path d="M7 3C5 6 4 8.2 4 10a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" /><path d="M17 3c-2 3-3 5.2-3 7a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" />`,
    eye: `<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />`,
    fileCheck: `<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="m8.5 15 2 2 4.5-5" />`,
    fileText: `<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M8 13h8" /><path d="M8 17h5" />`,
    fileUp: `<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M12 17v-6" /><path d="m9 14 3-3 3 3" />`,
    heartPulse: `<path d="M20.5 8.8c0 5.2-8.5 10.2-8.5 10.2S3.5 14 3.5 8.8A4.3 4.3 0 0 1 11 6a4.3 4.3 0 0 1 9.5 2.8Z" /><path d="M7 12h3l1-2 2 5 1.5-3H17" />`,
    help: `<circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.2-1.7 2.6" /><path d="M12 17h.01" />`,
    home: `<path d="m4 11 8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-6h4v6" />`,
    logIn: `<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M4 12h10" /><path d="m10 8 4 4-4 4" />`,
    logOut: `<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M14 12H4" /><path d="m18 8 4 4-4 4" />`,
    lock: `<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" />`,
    mail: `<path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />`,
    mapPin: `<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />`,
    medal: `<path d="M8 3h8l-2 5h-4L8 3Z" /><circle cx="12" cy="14" r="5" /><path d="m10.5 14 1 1.2 2.2-2.4" />`,
    message: `<path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8 8 0 1 1 21 12Z" />`,
    navigation: `<path d="m12 2 7 19-7-4-7 4 7-19Z" />`,
    packageCheck: `<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4.5 8 12 12.2 19.5 8" /><path d="M12 21v-8.8" /><path d="m9.2 16 1.8 1.8 3.8-4.1" />`,
    pawPrint: `<circle cx="8" cy="9" r="1.6" /><circle cx="12" cy="7" r="1.7" /><circle cx="16" cy="9" r="1.6" /><circle cx="18" cy="13" r="1.5" /><path d="M7.5 16.4c.8-2.1 2.4-3.3 4.5-3.3s3.7 1.2 4.5 3.3c.5 1.4-.5 2.6-1.9 2.3l-1.5-.4a4.5 4.5 0 0 0-2.2 0l-1.5.4c-1.4.3-2.4-.9-1.9-2.3Z" />`,
    play: `<circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" />`,
    flag: `<path d="M5 21V4" /><path d="M5 4h12l-1.5 4L17 12H5" />`,
    radar: `<circle cx="12" cy="12" r="8" /><path d="M12 12 17 7" /><path d="M12 4v2" /><path d="M12 18v2" /><path d="M4 12h2" /><path d="M18 12h2" />`,
    radio: `<path d="M4 9h16v11H4z" /><path d="m8 9 8-6" /><circle cx="8" cy="14" r="2" /><path d="M14 14h3" /><path d="M14 17h2" />`,
    plus: `<path d="M12 5v14" /><path d="M5 12h14" />`,
    receipt: `<path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1V3Z" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" />`,
    route: `<circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />`,
    shieldCheck: `<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" />`,
    send: `<path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" />`,
    settings: `<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 3.6-.2-.1a1.7 1.7 0 0 0-2 .3l-.3.2a1.7 1.7 0 0 0-1 1.5V23H9.8v-.5a1.7 1.7 0 0 0-1-1.5l-.3-.2a1.7 1.7 0 0 0-2-.3l-.2.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-3.6.2.1a1.7 1.7 0 0 0 2-.3l.3-.2a1.7 1.7 0 0 0 1-1.5V1h4.4v.5a1.7 1.7 0 0 0 1 1.5l.3.2a1.7 1.7 0 0 0 2 .3l.2-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z" />`,
    sliders: `<path d="M4 6h8" /><path d="M16 6h4" /><path d="M14 4v4" /><path d="M4 12h4" /><path d="M12 12h8" /><path d="M10 10v4" /><path d="M4 18h10" /><path d="M18 18h2" /><path d="M16 16v4" />`,
    shoppingBag: `<path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /><path d="M9.5 14h5" />`,
    uploadCloud: `<path d="M16 16 12 12l-4 4" /><path d="M12 12v9" /><path d="M20 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 0 0 3 10.4" /><path d="M5 18a4 4 0 0 1 0-8" />`,
    userCheck: `<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="m16 13 2 2 4-5" />`,
    userPlus: `<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 8v6" /><path d="M15 11h6" />`,
    users: `<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 11a3 3 0 0 0 0-6" /><path d="M17 20a5 5 0 0 0-2-4" />`,
    wallet: `<path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V6" /><path d="M16 13h.01" />`,
    x: `<path d="M6 6 18 18" /><path d="M18 6 6 18" />`,
  };

  return `<svg ${attrs} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.shieldCheck}</svg>`;
}

function normalizePath(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

function navigate(path) {
  if (path.includes("#")) {
    const [pathname, hash] = path.split("#");
    window.history.pushState({}, "", `${pathname || window.location.pathname}#${hash}`);
    menuOpen = false;
    render();
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }));
    return;
  }

  window.history.pushState({}, "", path);
  menuOpen = false;
  render();
}

window.addEventListener("popstate", render);

window.addEventListener("paseosJuanStoreUpdate", render);

window.addEventListener("storage", (e) => {
  if (e.key === "paseosJuanChatMessages") {
    render();
  }
});

document.addEventListener("click", (event) => {
  const chatSelect = event.target.closest("[data-chat-select]");
  if (chatSelect) {
    localStorage.setItem("paseosJuanActiveChat", chatSelect.dataset.chatSelect);
    render();
    return;
  }

  const chatSendShared = event.target.closest("[data-chat-send-shared]");
  if (chatSendShared) {
    const conversationId = chatSendShared.dataset.chatSendShared;
    const input = document.querySelector(`[data-chat-input-shared="${conversationId}"]`);
    const text = input?.value?.trim();
    if (!text) return;

    const role = chatSendShared.dataset.chatRole;
    const senderName = chatSendShared.dataset.chatSender;

    if (sendChatMessage(conversationId, role, senderName, text)) {
      if (input) input.value = "";
      localStorage.removeItem("paseosJuanChatDraft");
      // Notify other tabs in same domain explicitly if needed, but local storage event only fires on OTHER tabs.
      // So we call render here for the CURRENT tab.
      render();
    }
    return;
  }

  const chatQuickShared = event.target.closest("[data-chat-quick-shared]");
  if (chatQuickShared) {
    const text = chatQuickShared.dataset.chatQuickShared;
    const role = chatQuickShared.dataset.chatRole;
    const senderName = chatQuickShared.dataset.chatSender;
    const conversationId = chatQuickShared.dataset.chatConversation;

    if (sendChatMessage(conversationId, role, senderName, text)) {
      render();
    }
    return;
  }

  const menuToggle = event.target.closest("[data-menu-toggle]");
  if (menuToggle) {
    menuOpen = !menuOpen;
    render();
    return;
  }

  const menuClose = event.target.closest("[data-menu-close]");
  if (menuClose) {
    menuOpen = false;
    render();
    return;
  }

  const demoRegister = event.target.closest("[data-demo-register]");
  if (demoRegister) {
    event.preventDefault();
    const form = demoRegister.closest("form");
    const demoClient = {
      name: form?.querySelector("[name='clientName']")?.value?.trim() || "Cliente demo",
      email: form?.querySelector("[name='email']")?.value?.trim() || "cliente@demo.com",
      dogName: form?.querySelector("[name='dogName']")?.value?.trim() || "Mi perro",
      dogSize: form?.querySelector("[name='dogSize']")?.value || "Mediano",
    };
    localStorage.setItem("paseosJuanDemoClient", JSON.stringify(demoClient));
    navigate("/cliente");
    return;
  }

  const loginButton = event.target.closest("[data-login]");
  if (loginButton) {
    event.preventDefault();
    const form = loginButton.closest("form");
    const email = form?.querySelector("[name='email']")?.value?.trim() || "";
    navigate(getLoginRouteByEmail(email));
    return;
  }

  const clearDemo = event.target.closest("[data-clear-demo]");
  if (clearDemo) {
    localStorage.removeItem("paseosJuanDemoClient");
    render();
    return;
  }

  const coordinatorLogout = event.target.closest("[data-coordinator-logout]");
  if (coordinatorLogout) {
    navigate("/login");
    return;
  }

  const adminLogout = event.target.closest("[data-admin-logout]");
  if (adminLogout) {
    navigate("/login");
    return;
  }

  const coordinatorSaveDog = event.target.closest("[data-coordinator-save-dog]");
  if (coordinatorSaveDog) {
    const mode = coordinatorSaveDog.dataset.coordinatorSaveDog;
    const form = coordinatorSaveDog.closest('.coordinator-intake');
    const inputs = form ? form.querySelectorAll('input, select, textarea') : [];
    let dogName = "Nuevo Perro";
    let clientName = "Cliente";
    let zone = "Mapuche Norte";
    let energy = "Media";
    let risk = "Medio";
    
    inputs.forEach(input => {
      if (input.placeholder?.includes('Bruno')) dogName = input.value || dogName;
      if (input.placeholder?.includes('Martín Rivas')) clientName = input.value || clientName;
    });
    
    const store = getStore();
    const newDog = { id: 'dog-'+Date.now(), name: dogName, client: clientName, zone, energy, risk, compatibility: 'A evaluar' };
    
    // Add to Dogs
    store.dogs = [newDog, ...(store.dogs || [])];
    
    // Add to Clients
    const newClient = { client: clientName, dogs: dogName, zone, plan: "Plan 1", documentation: "Pendiente", status: "Activo" };
    store.clients = [newClient, ...(store.clients || [])];
    
    // Add to Supervisor tasks if evaluation
    if (mode === "evaluation") {
      store.alerts = [{ id: 'alert-'+Date.now(), dog: dogName, type: 'Evaluación inicial', level: 'Medio', description: `Derivado por coordinador. Cliente: ${clientName}` }, ...(store.alerts || [])];
    }
    
    saveStore(store);
    showToast(mode === "evaluation" ? "Perro guardado y enviado a evaluación." : "Perro guardado correctamente.");
    return;
  }

  const coordinatorRequestAction = event.target.closest("[data-coordinator-request-action]");
  if (coordinatorRequestAction) {
    localStorage.setItem(
      "paseosJuanCoordinatorRequestFeedback",
      `${coordinatorRequestAction.dataset.coordinatorRequestAction} registrado para ${coordinatorRequestAction.dataset.requestDog}.`,
    );
    render();
    return;
  }

  const coordinatorSendSupervisor = event.target.closest("[data-send-supervisor]");
  if (coordinatorSendSupervisor) {
    const store = getStore();
    store.alerts = [{ id: 'alert-'+Date.now(), dog: "Perro derivado", type: 'Derivación', level: 'Medio', description: "Enviado por coordinador para revisión." }, ...(store.alerts || [])];
    saveStore(store);
    showToast("Solicitud enviada al supervisor.");
    return;
  }

  const chatToggle = event.target.closest("[data-chat-toggle]");
  if (chatToggle) {
    chatOpen = !chatOpen;
    render();
    return;
  }

  const chatClose = event.target.closest("[data-chat-close]");
  if (chatClose) {
    chatOpen = false;
    render();
    return;
  }

  const walkerLogout = event.target.closest("[data-walker-logout]");
  if (walkerLogout) {
    localStorage.removeItem("paseosJuanWalkerShift");
    navigate("/login");
    return;
  }

  const walkerStart = event.target.closest("[data-walker-start]");
  if (walkerStart) {
    localStorage.setItem("paseosJuanWalkerShift", "started");
    localStorage.setItem("paseosJuanWalkerFeedback", "Jornada iniciada");
    render();
    return;
  }

  const walkerIncidentShortcut = event.target.closest("[data-walker-incident]");
  if (walkerIncidentShortcut) {
    document.getElementById("reporte-operativo")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const checklistConfirm = event.target.closest("[data-checklist-confirm]");
  if (checklistConfirm) {
    const checked = getStoredArray("paseosJuanWalkerChecklist");
    const complete = WALKER_CHECKLIST.every((item) => checked.includes(item));
    localStorage.setItem(
      "paseosJuanChecklistFeedback",
      complete ? "Checklist confirmado." : "Completá el checklist antes de iniciar el paseo.",
    );
    localStorage.setItem("paseosJuanChecklistConfirmed", complete ? "true" : "false");
    render();
    return;
  }

  const walkAction = event.target.closest("[data-walk-step]");
  if (walkAction) {
    localStorage.setItem("paseosJuanWalkStep", walkAction.dataset.walkStep);
    render();
    return;
  }

  const dogRetired = event.target.closest("[data-dog-retired]");
  if (dogRetired) {
    const statuses = getStoredObject("paseosJuanDogStatuses");
    statuses[dogRetired.dataset.dogRetired] = "Retirado";
    localStorage.setItem("paseosJuanDogStatuses", JSON.stringify(statuses));
    render();
    return;
  }

  const dogDetail = event.target.closest("[data-dog-detail]");
  if (dogDetail) {
    const active = localStorage.getItem("paseosJuanDogDetail");
    const next = active === dogDetail.dataset.dogDetail ? "" : dogDetail.dataset.dogDetail;
    if (next) {
      localStorage.setItem("paseosJuanDogDetail", next);
    } else {
      localStorage.removeItem("paseosJuanDogDetail");
    }
    render();
    return;
  }

  const routeOpen = event.target.closest("[data-open-route]");
  if (routeOpen) {
    localStorage.setItem("paseosJuanWalkerFeedback", "Ruta operativa abierta en modo demo.");
    render();
    return;
  }

  const quickCommand = event.target.closest("[data-quick-command]");
  if (quickCommand) {
    localStorage.setItem("paseosJuanQuickCommand", `${quickCommand.dataset.quickCommand} enviado.`);
    render();
    return;
  }

  const materialSave = event.target.closest("[data-save-material]");
  if (materialSave) {
    const comment = document.querySelector("[data-material-comment]")?.value?.trim();
    if (comment) localStorage.setItem("paseosJuanMaterialComment", comment);
    localStorage.setItem("paseosJuanMaterialFeedback", "Material guardado correctamente.");
    render();
    return;
  }

  const reportSend = event.target.closest("[data-send-report]");
  if (reportSend) {
    localStorage.setItem("paseosJuanReportFeedback", "Reporte registrado correctamente.");
    render();
    return;
  }

  const supervisorLogout = event.target.closest("[data-supervisor-logout]");
  if (supervisorLogout) {
    localStorage.removeItem("paseosJuanSupervisorShift");
    navigate("/login");
    return;
  }

  const supervisorStart = event.target.closest("[data-supervisor-start]");
  if (supervisorStart) {
    localStorage.setItem("paseosJuanSupervisorShift", "active");
    localStorage.setItem("paseosJuanSupervisorFeedback", "Supervisión activa");
    render();
    return;
  }

  const openCreateRoute = event.target.closest("[data-open-create-route]");
  if (openCreateRoute) {
    localStorage.setItem("paseosJuanCreateRouteOpen", "true");
    localStorage.removeItem("paseosJuanCreateRouteFeedback");
    render();
    return;
  }

  const closeCreateRoute = event.target.closest("[data-close-create-route]");
  if (closeCreateRoute) {
    localStorage.setItem("paseosJuanCreateRouteOpen", "false");
    localStorage.removeItem("paseosJuanCreateRouteFeedback");
    render();
    return;
  }

  const createRoute = event.target.closest("[data-create-route]");
  if (createRoute) {
    const draft = getRouteDraft();
    const validation = validateRouteDraft(draft);

    if (validation.errors.length) {
      localStorage.setItem("paseosJuanCreateRouteFeedback", validation.errors[0]);
      render();
      return;
    }

    const routes = getCreatedRoutes();
    const route = {
      id: `route-${Date.now()}`,
      name: draft.name || `${draft.routeType === "Ruta cubierta por supervisor" ? "Ruta cubierta" : "Ruta"} - ${draft.zone}`,
      walker: draft.walker,
      routeType: draft.routeType,
      zone: draft.zone,
      start: draft.start || "15:00",
      dogIds: draft.order,
      notes: draft.notes,
      status: "Lista para confirmar",
    };

    const store = getStore();
    store.routes = [route, ...(store.routes || [])];
    saveStore(store);
    
    localStorage.setItem("paseosJuanCreatedRoutes", JSON.stringify([route, ...routes]));
    localStorage.setItem("paseosJuanCreateRouteOpen", "false");
    localStorage.removeItem("paseosJuanRouteDraft");
    showToast("Ruta creada correctamente.");
    return;
  }

  const routeOrder = event.target.closest("[data-route-order]");
  if (routeOrder) {
    const draft = getRouteDraft();
    const dogId = routeOrder.dataset.dogId;
    const index = draft.order.indexOf(dogId);
    if (index === -1) return;

    if (routeOrder.dataset.routeOrder === "up" && index > 0) {
      [draft.order[index - 1], draft.order[index]] = [draft.order[index], draft.order[index - 1]];
    }

    if (routeOrder.dataset.routeOrder === "down" && index < draft.order.length - 1) {
      [draft.order[index + 1], draft.order[index]] = [draft.order[index], draft.order[index + 1]];
    }

    if (routeOrder.dataset.routeOrder === "remove") {
      draft.selectedDogIds = draft.selectedDogIds.filter((id) => id !== dogId);
      draft.order = draft.order.filter((id) => id !== dogId);
    }

    saveRouteDraft(draft);
    render();
    return;
  }

  const routeConfirm = event.target.closest("[data-route-confirm]");
  if (routeConfirm) {
    const routes = getCreatedRoutes().map((route) => (
      route.id === routeConfirm.dataset.routeConfirm ? { ...route, status: "Ruta confirmada" } : route
    ));
    localStorage.setItem("paseosJuanCreatedRoutes", JSON.stringify(routes));
    render();
    return;
  }

  const routeEdit = event.target.closest("[data-route-edit]");
  if (routeEdit) {
    const route = getCreatedRoutes().find((item) => item.id === routeEdit.dataset.routeEdit);
    if (!route) return;
    saveRouteDraft({
      name: route.name,
      walker: route.walker,
      routeType: route.routeType,
      zone: route.zone,
      start: route.start,
      selectedDogIds: route.dogIds,
      order: route.dogIds,
      notes: route.notes || "",
    });
    localStorage.setItem("paseosJuanCreateRouteOpen", "true");
    render();
    return;
  }

  const routeDelete = event.target.closest("[data-route-delete]");
  if (routeDelete) {
    const routes = getCreatedRoutes().filter((route) => route.id !== routeDelete.dataset.routeDelete);
    localStorage.setItem("paseosJuanCreatedRoutes", JSON.stringify(routes));
    render();
    return;
  }

  const routeContact = event.target.closest("[data-route-contact]");
  if (routeContact) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", "Mensaje enviado al paseador de la ruta.");
    render();
    return;
  }

  const registerPayment = event.target.closest("[data-register-payment]");
  if (registerPayment) {
    localStorage.setItem("paseosJuanPaymentModal", "register");
    localStorage.setItem("paseosJuanSelectedPaymentClient", registerPayment.dataset.registerPayment);
    localStorage.removeItem("paseosJuanPaymentFeedback");
    render();
    return;
  }

  const reminderPayment = event.target.closest("[data-payment-reminder]");
  if (reminderPayment) {
    localStorage.setItem("paseosJuanPaymentModal", "reminder");
    localStorage.setItem("paseosJuanSelectedPaymentClient", reminderPayment.dataset.paymentReminder);
    localStorage.removeItem("paseosJuanPaymentFeedback");
    render();
    return;
  }

  const closePaymentModal = event.target.closest("[data-close-payment-modal]");
  if (closePaymentModal) {
    localStorage.removeItem("paseosJuanPaymentModal");
    localStorage.removeItem("paseosJuanSelectedPaymentClient");
    render();
    return;
  }

  const confirmPayment = event.target.closest("[data-confirm-payment]");
  if (confirmPayment) {
    const client = getPaymentClient(confirmPayment.dataset.confirmPayment);
    if (!client) return;
    const statuses = getStoredObject("paseosJuanPaymentStatuses");
    statuses[client.id] = "Al día";
    localStorage.setItem("paseosJuanPaymentStatuses", JSON.stringify(statuses));
    localStorage.setItem(`paseosJuanPaymentLast-${client.id}`, "Confirmado");
    addPaymentHistory({
      id: `payment-${Date.now()}`,
      client: client.client,
      dogs: client.dogs,
      amount: document.querySelector("[data-payment-amount]")?.value?.trim() || client.amount,
      method: document.querySelector("[data-payment-method]")?.value || "Transferencia",
      date: document.querySelector("[data-payment-date]")?.value?.trim() || "Hoy",
      status: "Confirmado",
      notes: document.querySelector("[data-payment-notes]")?.value?.trim() || "Pago registrado por coordinación.",
      receipt: localStorage.getItem(`paseosJuanPaymentReceipt-${client.id}`) || "",
    });
    localStorage.removeItem("paseosJuanPaymentModal");
    localStorage.setItem("paseosJuanPaymentFeedback", "Pago registrado correctamente.");
    render();
    return;
  }

  const markReminderSent = event.target.closest("[data-mark-reminder-sent]");
  if (markReminderSent) {
    const client = getPaymentClient(markReminderSent.dataset.markReminderSent);
    if (!client) return;
    addPaymentHistory({
      id: `reminder-${Date.now()}`,
      client: client.client,
      dogs: client.dogs,
      amount: client.amount,
      method: "Recordatorio",
      date: "Hoy",
      status: "Recordatorio enviado",
      notes: "Recordatorio enviado.",
      receipt: "",
    });
    localStorage.removeItem("paseosJuanPaymentModal");
    localStorage.setItem("paseosJuanPaymentFeedback", "Recordatorio enviado.");
    render();
    return;
  }

  const copyPaymentAlias = event.target.closest("[data-copy-payment-alias]");
  if (copyPaymentAlias) {
    navigator.clipboard?.writeText(PAYMENT_ALIAS).catch(() => {});
    localStorage.setItem("paseosJuanPaymentFeedback", `Alias copiado: ${PAYMENT_ALIAS}`);
    render();
    return;
  }

  const copyReminder = event.target.closest("[data-copy-reminder]");
  if (copyReminder) {
    const client = getPaymentClient(copyReminder.dataset.copyReminder);
    const message = document.querySelector("[data-reminder-message]")?.value?.trim() || (client ? getPaymentReminderText(client) : "");
    if (message) navigator.clipboard?.writeText(message).catch(() => {});
    localStorage.setItem("paseosJuanPaymentFeedback", "Mensaje de recordatorio copiado.");
    render();
    return;
  }

  const whatsappReminder = event.target.closest("[data-whatsapp-reminder]");
  if (whatsappReminder) {
    const client = getPaymentClient(whatsappReminder.dataset.whatsappReminder);
    const message = document.querySelector("[data-reminder-message]")?.value?.trim() || (client ? getPaymentReminderText(client) : "");
    if (message) window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    localStorage.setItem("paseosJuanPaymentFeedback", "Recordatorio listo para enviar por WhatsApp.");
    render();
    return;
  }

  const paymentHistory = event.target.closest("[data-payment-history]");
  if (paymentHistory) {
    document.getElementById("historial-cobros")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const paymentChat = event.target.closest("[data-payment-chat]");
  if (paymentChat) {
    localStorage.setItem("paseosJuanPaymentFeedback", "Chat con cliente preparado para cobros.");
    render();
    return;
  }

  const resolvePaymentAlert = event.target.closest("[data-resolve-payment-alert]");
  if (resolvePaymentAlert) {
    const resolved = getStoredArray("paseosJuanResolvedPaymentAlerts");
    localStorage.setItem(
      "paseosJuanResolvedPaymentAlerts",
      JSON.stringify([...new Set([...resolved, resolvePaymentAlert.dataset.resolvePaymentAlert])]),
    );
    render();
    return;
  }

  const manageAbsence = event.target.closest("[data-manage-absence]");
  if (manageAbsence) {
    localStorage.setItem("paseosJuanSupervisorMode", "cover");
    localStorage.setItem("paseosJuanSupervisorFeedback", "Modo cobertura por ausencia activado.");
    render();
    return;
  }

  const activateCompanionTop = event.target.closest("[data-activate-companion-top]");
  if (activateCompanionTop) {
    localStorage.setItem("paseosJuanSupervisorMode", "companion");
    localStorage.setItem("paseosJuanCompanionFeedback", "Acompañamiento activado.");
    render();
    return;
  }

  const contactWalkersTop = event.target.closest("[data-contact-walkers-top]");
  if (contactWalkersTop) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", "Mensaje preparado para todos los paseadores.");
    document.getElementById("comunicacion-equipo")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const supervisorCreateAlert = event.target.closest("[data-supervisor-create-alert]");
  if (supervisorCreateAlert) {
    localStorage.setItem("paseosJuanSupervisorExtraAlert", "true");
    localStorage.setItem("paseosJuanSupervisorFeedback", "Alerta demo creada.");
    render();
    return;
  }

  const companionActivate = event.target.closest("[data-companion-activate]");
  if (companionActivate) {
    localStorage.setItem("paseosJuanSupervisorMode", "companion");
    localStorage.setItem("paseosJuanCompanionFeedback", "Acompañamiento activado.");
    render();
    return;
  }

  const companionSuggest = event.target.closest("[data-companion-suggest]");
  if (companionSuggest) {
    localStorage.setItem("paseosJuanSharedAssignments", JSON.stringify(suggestSharedDistribution()));
    localStorage.setItem("paseosJuanCompanionFeedback", "Distribución sugerida aplicada.");
    render();
    return;
  }

  const companionSensitive = event.target.closest("[data-companion-sensitive]");
  if (companionSensitive) {
    localStorage.setItem("paseosJuanSharedAssignments", JSON.stringify(suggestSharedDistribution()));
    localStorage.setItem("paseosJuanCompanionFeedback", "Perros sensibles reasignados al supervisor.");
    render();
    return;
  }

  const companionConfirm = event.target.closest("[data-companion-confirm]");
  if (companionConfirm) {
    const validation = getSharedDistributionValidation(getSharedAssignments());
    localStorage.setItem(
      "paseosJuanCompanionFeedback",
      validation.errors.length ? "Revisá los límites antes de confirmar." : "Distribución compartida confirmada.",
    );
    render();
    return;
  }

  const companionContact = event.target.closest("[data-companion-contact]");
  if (companionContact) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", "Mensaje enviado al paseador acompañado.");
    render();
    return;
  }

  const sharedAssign = event.target.closest("[data-shared-assign]");
  if (sharedAssign) {
    const assignments = getSharedAssignments();
    assignments[sharedAssign.dataset.dogId] = sharedAssign.dataset.sharedAssign;
    localStorage.setItem("paseosJuanSharedAssignments", JSON.stringify(assignments));
    localStorage.removeItem("paseosJuanCompanionFeedback");
    render();
    return;
  }

  const supervisorCloseShift = event.target.closest("[data-supervisor-close-shift]");
  if (supervisorCloseShift) {
    localStorage.setItem("paseosJuanSupervisorClosureFeedback", "Jornada cerrada correctamente.");
    localStorage.setItem("paseosJuanSupervisorFeedback", "Jornada cerrada correctamente.");
    render();
    return;
  }

  const walkerMessage = event.target.closest("[data-walker-message]");
  if (walkerMessage) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", `Mensaje enviado a ${walkerMessage.dataset.walkerMessage}.`);
    render();
    return;
  }

  const walkerDelay = event.target.closest("[data-walker-delay]");
  if (walkerDelay) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", `Demora reportada para ${walkerDelay.dataset.walkerDelay}.`);
    render();
    return;
  }

  const pickupAction = event.target.closest("[data-pickup-action]");
  if (pickupAction) {
    const statuses = getStoredObject("paseosJuanPickupStatuses");
    statuses[pickupAction.dataset.pickupId] = pickupAction.dataset.pickupAction;
    localStorage.setItem("paseosJuanPickupStatuses", JSON.stringify(statuses));
    render();
    return;
  }

  const alertReviewed = event.target.closest("[data-alert-reviewed]");
  if (alertReviewed) {
    const reviewed = getStoredArray("paseosJuanReviewedAlerts");
    localStorage.setItem(
      "paseosJuanReviewedAlerts",
      JSON.stringify([...new Set([...reviewed, alertReviewed.dataset.alertReviewed])]),
    );
    render();
    return;
  }

  const alertNotify = event.target.closest("[data-alert-notify]");
  if (alertNotify) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", `Paseador notificado por alerta de ${alertNotify.dataset.alertNotify}.`);
    render();
    return;
  }

  const supervisorChecklistConfirm = event.target.closest("[data-supervisor-checklist-confirm]");
  if (supervisorChecklistConfirm) {
    const checked = getStoredArray("paseosJuanSupervisorChecklist");
    const complete = SUPERVISOR_CHECKLIST.every((item) => checked.includes(item));
    localStorage.setItem(
      "paseosJuanSupervisorChecklistFeedback",
      complete ? "Supervisión confirmada." : "Faltan puntos críticos por confirmar.",
    );
    localStorage.setItem("paseosJuanSupervisorChecklistConfirmed", complete ? "true" : "false");
    if (complete) {
      localStorage.setItem("paseosJuanSupervisorChecklistDetails", "false");
    }
    render();
    return;
  }

  const supervisorChecklistView = event.target.closest("[data-supervisor-checklist-view]");
  if (supervisorChecklistView) {
    localStorage.setItem("paseosJuanSupervisorChecklistDetails", "true");
    render();
    return;
  }

  const supervisorChecklistEdit = event.target.closest("[data-supervisor-checklist-edit]");
  if (supervisorChecklistEdit) {
    localStorage.setItem("paseosJuanSupervisorChecklistDetails", "true");
    localStorage.setItem("paseosJuanSupervisorChecklistConfirmed", "false");
    localStorage.removeItem("paseosJuanSupervisorChecklistFeedback");
    render();
    return;
  }

  const supervisorQuickMessage = event.target.closest("[data-supervisor-quick-message]");
  if (supervisorQuickMessage) {
    localStorage.setItem("paseosJuanSupervisorDraft", supervisorQuickMessage.dataset.supervisorQuickMessage);
    render();
    return;
  }

  const supervisorSendMessage = event.target.closest("[data-supervisor-send-message]");
  if (supervisorSendMessage) {
    localStorage.setItem("paseosJuanSupervisorMessageFeedback", "Mensaje enviado correctamente.");
    localStorage.removeItem("paseosJuanSupervisorDraft");
    render();
    return;
  }

  const reportAction = event.target.closest("[data-report-action]");
  if (reportAction) {
    const statuses = getStoredObject("paseosJuanSupervisorReportStatuses");
    statuses[reportAction.dataset.reportId] = reportAction.dataset.reportAction;
    localStorage.setItem("paseosJuanSupervisorReportStatuses", JSON.stringify(statuses));
    render();
    return;
  }

  const closureConfirm = event.target.closest("[data-closure-confirm]");
  if (closureConfirm) {
    localStorage.setItem("paseosJuanSupervisorClosureFeedback", "Jornada cerrada correctamente.");
    render();
    return;
  }

  const link = event.target.closest("[data-link]");
  if (!link) return;
  event.preventDefault();
  navigate(link.getAttribute("href"));
});

document.addEventListener("change", (event) => {
  const vaccineInput = event.target.closest("[data-vaccine-file]");
  if (!vaccineInput) return;

  const file = vaccineInput.files?.[0];
  if (!file) return;

  localStorage.setItem("paseosJuanVaccineFile", file.name);
  localStorage.setItem("paseosJuanVaccineStatus", "Pendiente de revisión");
  render();
});

document.addEventListener("change", (event) => {
  const checklistItem = event.target.closest("[data-checklist-item]");
  if (checklistItem) {
    const checked = getStoredArray("paseosJuanWalkerChecklist");
    const item = checklistItem.dataset.checklistItem;
    const next = checklistItem.checked
      ? [...new Set([...checked, item])]
      : checked.filter((value) => value !== item);
    localStorage.setItem("paseosJuanWalkerChecklist", JSON.stringify(next));
    localStorage.removeItem("paseosJuanChecklistFeedback");
    render();
    return;
  }

  const mediaInput = event.target.closest("[data-walker-media]");
  if (mediaInput) {
    const file = mediaInput.files?.[0];
    if (!file) return;
    localStorage.setItem(`paseosJuanWalkerMedia${mediaInput.dataset.walkerMedia}`, file.name);
    render();
    return;
  }

  const reportFile = event.target.closest("[data-report-file]");
  if (reportFile) {
    const file = reportFile.files?.[0];
    if (!file) return;
    localStorage.setItem("paseosJuanReportFile", file.name);
    render();
    return;
  }

  const supervisorChecklistItem = event.target.closest("[data-supervisor-checklist-item]");
  if (supervisorChecklistItem) {
    const checked = getStoredArray("paseosJuanSupervisorChecklist");
    const item = supervisorChecklistItem.dataset.supervisorChecklistItem;
    const next = supervisorChecklistItem.checked
      ? [...new Set([...checked, item])]
      : checked.filter((value) => value !== item);
    localStorage.setItem("paseosJuanSupervisorChecklist", JSON.stringify(next));
    localStorage.removeItem("paseosJuanSupervisorChecklistFeedback");
    render();
    return;
  }

  const supervisorMode = event.target.closest("[data-supervisor-mode]");
  if (supervisorMode) {
    localStorage.setItem("paseosJuanSupervisorMode", supervisorMode.value);
    render();
    return;
  }

  const companionWalker = event.target.closest("[data-companion-walker]");
  if (companionWalker) {
    localStorage.setItem("paseosJuanCompanionWalker", companionWalker.value);
    render();
    return;
  }

  const companionRoute = event.target.closest("[data-companion-route]");
  if (companionRoute) {
    localStorage.setItem("paseosJuanCompanionRoute", companionRoute.value);
    render();
    return;
  }

  const createRouteType = event.target.closest("[data-create-route-type]");
  if (createRouteType) {
    localStorage.setItem("paseosJuanCreateRouteType", createRouteType.value);
    render();
    return;
  }

  const coordinatorDocument = event.target.closest("[data-coordinator-document]");
  if (coordinatorDocument) {
    const file = coordinatorDocument.files?.[0];
    if (file) {
      localStorage.setItem("paseosJuanCoordinatorDocument", file.name);
      render();
    }
    return;
  }

  const paymentReceipt = event.target.closest("[data-payment-receipt]");
  if (paymentReceipt) {
    const file = paymentReceipt.files?.[0];
    const clientId = paymentReceipt.dataset.paymentReceipt;
    if (file && clientId) {
      localStorage.setItem(`paseosJuanPaymentReceipt-${clientId}`, file.name);
      render();
    }
    return;
  }

  const routeDraftField = event.target.closest("[data-route-draft]");
  if (routeDraftField) {
    const draft = getRouteDraft();
    draft[routeDraftField.dataset.routeDraft] = routeDraftField.value;
    saveRouteDraft(draft);
    render();
    return;
  }

  const routeDog = event.target.closest("[data-route-dog]");
  if (routeDog) {
    const draft = getRouteDraft();
    const dogId = routeDog.dataset.routeDog;
    if (routeDog.checked) {
      draft.selectedDogIds = [...new Set([...draft.selectedDogIds, dogId])];
      draft.order = [...draft.order.filter((id) => draft.selectedDogIds.includes(id)), dogId];
    } else {
      draft.selectedDogIds = draft.selectedDogIds.filter((id) => id !== dogId);
      draft.order = draft.order.filter((id) => id !== dogId);
    }
    saveRouteDraft(draft);
    render();
  }
});

function render() {
  const path = normalizePath(window.location.pathname);

  if (path === "/") {
    app.innerHTML = landingPage();
    hydrateAfterRender();
    return;
  }

  if (path === "/login") {
    app.innerHTML = authPage("login");
    hydrateAfterRender();
    return;
  }

  if (path === "/registro" || path === "/register") {
    app.innerHTML = authPage("register");
    hydrateAfterRender();
    return;
  }

  const directRole = path.slice(1);
  if (ROLES[directRole] && directRole !== "visitante") {
    app.innerHTML = dashboardPage(directRole);
    hydrateAfterRender();
    return;
  }

  const legacyMatch = path.match(/^\/dashboard\/([a-z]+)$/);
  if (legacyMatch && ROLES[legacyMatch[1]]) {
    app.innerHTML = dashboardPage(legacyMatch[1]);
    hydrateAfterRender();
    return;
  }

  app.innerHTML = notFoundPage();
  hydrateAfterRender();
}


function hydrateAfterRender() {
  let overlay = document.getElementById("global-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "global-overlay";
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = GlobalModal() + GlobalToast();

  document.body.classList.toggle("menu-locked", menuOpen);
  hydrateReveal();
}

function hydrateReveal() {
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

function getDemoClient() {
  try {
    return JSON.parse(localStorage.getItem("paseosJuanDemoClient"));
  } catch {
    return null;
  }
}

function getVaccineDocument() {
  return {
    fileName: localStorage.getItem("paseosJuanVaccineFile"),
    status: localStorage.getItem("paseosJuanVaccineStatus") || "Pendiente de revisión",
  };
}

function getStoredArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function getStoredObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function getLoginRouteByEmail(email) {
  const normalizedEmail = email.toLowerCase();

  if (normalizedEmail.includes("admin")) return "/admin";
  if (normalizedEmail.includes("coordinador")) return "/coordinador";
  if (normalizedEmail.includes("supervisor")) return "/supervisor";
  if (normalizedEmail.includes("paseador") || normalizedEmail.includes("sebastian")) return "/paseador";

  return "/cliente";
}

function getSharedAssignments() {
  const storedAssignments = getStoredObject("paseosJuanSharedAssignments");
  return SUPERVISOR_SHARED_DOGS.reduce((assignments, dog) => {
    assignments[dog.id] = storedAssignments[dog.id] || "unassigned";
    return assignments;
  }, {});
}

function getSharedDistributionCounts(assignments) {
  return Object.values(assignments).reduce(
    (counts, assignment) => {
      if (assignment === "walker") counts.walker += 1;
      if (assignment === "supervisor") counts.supervisor += 1;
      return counts;
    },
    { walker: 0, supervisor: 0 },
  );
}

function getSharedDistributionValidation(assignments) {
  const counts = getSharedDistributionCounts(assignments);
  const total = counts.walker + counts.supervisor;
  const errors = [];
  const warnings = [];

  if (counts.walker > 6) errors.push("El paseador no puede llevar más de 6 perros.");
  if (counts.supervisor > 4) errors.push("El supervisor no puede llevar más de 4 perros en acompañamiento.");
  if (total > 10) errors.push("El equipo paseador + supervisor no puede superar 10 perros.");

  SUPERVISOR_SHARED_DOGS.forEach((dog) => {
    if (dog.recommended === "Supervisor" && assignments[dog.id] === "walker") {
      warnings.push(`${dog.name}: Este perro requiere revisión. Se recomienda manejo del supervisor.`);
    }
  });

  return { counts, total, errors, warnings };
}

function suggestSharedDistribution() {
  const assignments = {};
  let walkerCount = 0;
  let supervisorCount = 0;

  SUPERVISOR_SHARED_DOGS.forEach((dog) => {
    if (dog.recommended === "Supervisor" && supervisorCount < 4) {
      assignments[dog.id] = "supervisor";
      supervisorCount += 1;
      return;
    }

    if (walkerCount < 6) {
      assignments[dog.id] = "walker";
      walkerCount += 1;
      return;
    }

    if (supervisorCount < 4) {
      assignments[dog.id] = "supervisor";
      supervisorCount += 1;
      return;
    }

    assignments[dog.id] = "unassigned";
  });

  return assignments;
}

function getRouteDog(dogId) {
  return SUPERVISOR_ROUTE_DOGS.find((dog) => dog.id === dogId);
}

function getRouteDraft() {
  const storedDraft = getStoredObject("paseosJuanRouteDraft");
  const selectedDogIds = Array.isArray(storedDraft.selectedDogIds) ? storedDraft.selectedDogIds : [];
  const storedOrder = Array.isArray(storedDraft.order) ? storedDraft.order : [];
  const order = [
    ...storedOrder.filter((dogId) => selectedDogIds.includes(dogId)),
    ...selectedDogIds.filter((dogId) => !storedOrder.includes(dogId)),
  ];

  return {
    name: storedDraft.name || "Ruta A - Mapuche Norte",
    walker: storedDraft.walker || "",
    routeType: storedDraft.routeType || "Ruta normal",
    zone: storedDraft.zone || "Mapuche Norte",
    start: storedDraft.start || "15:00",
    selectedDogIds,
    order,
    notes: storedDraft.notes || "",
  };
}

function saveRouteDraft(draft) {
  localStorage.setItem("paseosJuanRouteDraft", JSON.stringify(draft));
  localStorage.removeItem("paseosJuanCreateRouteFeedback");
}

function getCreatedRoutes() {
  return getStoredArray("paseosJuanCreatedRoutes");
}

function getRouteWarnings(dogIds) {
  const dogs = dogIds.map(getRouteDog).filter(Boolean);
  const mediumRiskCount = dogs.filter((dog) => dog.risk === "Medio" || dog.risk === "Alto").length;
  const highEnergyCount = dogs.filter((dog) => dog.energy === "Alta").length;
  const warnings = [];

  if (mediumRiskCount > 2) warnings.push("Grupo con riesgo medio elevado. Revisar antes de confirmar.");
  if (highEnergyCount > 3) warnings.push("Grupo con energía alta acumulada. Revisar distribución.");
  if (dogs.some((dog) => dog.id === "forest")) warnings.push("Forest requiere bozal confirmado antes de salir.");
  if (dogs.some((dog) => dog.id === "luna")) warnings.push("Luna: evitar motos y perros externos.");

  return warnings;
}

function validateRouteDraft(draft) {
  const errors = [];
  const warnings = getRouteWarnings(draft.order);
  const dogCount = draft.order.length;

  if (!draft.walker) errors.push("Seleccioná un paseador responsable.");
  if (!dogCount) errors.push("Seleccioná al menos un perro.");
  if (draft.routeType === "Ruta normal" && dogCount > 6) errors.push("Ruta normal: el paseador no puede llevar más de 6 perros.");
  if (draft.routeType === "Ruta cubierta por supervisor" && dogCount > 7) errors.push("Ruta cubierta por supervisor: Nico no puede llevar más de 7 perros.");
  if (draft.routeType === "Ruta acompañada por supervisor" && dogCount > 10) errors.push("Ruta acompañada por supervisor: el equipo no puede superar 10 perros.");

  return { errors, warnings };
}

function getRouteRiskAverage(dogIds) {
  const dogs = dogIds.map(getRouteDog).filter(Boolean);
  if (dogs.some((dog) => dog.risk === "Alto")) return "Alto";
  if (dogs.some((dog) => dog.risk === "Medio")) return "Medio";
  return "Bajo";
}

function getAssignedRouteForWalker(walkerName) {
  return getCreatedRoutes().find((route) => route.walker === walkerName);
}

function getPaymentClient(clientId) {
  const statuses = getStoredObject("paseosJuanPaymentStatuses");
  return PAYMENT_CLIENTS.map((client) => ({
    ...client,
    status: statuses[client.id] || client.status,
    lastPayment: localStorage.getItem(`paseosJuanPaymentLast-${client.id}`) || client.lastPayment,
  })).find((client) => client.id === clientId);
}

function getPaymentClients() {
  return PAYMENT_CLIENTS.map((client) => getPaymentClient(client.id));
}

function getPaymentHistory() {
  return [...getStoredArray("paseosJuanPaymentHistory"), ...PAYMENT_HISTORY];
}

function addPaymentHistory(entry) {
  localStorage.setItem("paseosJuanPaymentHistory", JSON.stringify([entry, ...getStoredArray("paseosJuanPaymentHistory")]));
}

function getPaymentReminderText(client) {
  return `Hola, ${client.client}. Te recordamos que está pendiente el pago del plan de ${client.dogs}.

Plan: ${client.plan}
Monto: ${client.amount}

Podés transferir al alias:
${PAYMENT_ALIAS}

Cuando lo hagas, por favor envianos el comprobante para registrarlo.

Gracias.`;
}

function shell(content, activeRole = "visitante") {
  return `
    ${HeaderMinimal(activeRole)}
    ${MobileMenu()}
    ${SmoothScrollWrapper(content)}
  `;
}

function walkerShell(content) {
  return `
    <div class="walker-shell">
      ${WalkerHeader()}
      ${content}
    </div>
  `;
}

function supervisorShell(content) {
  return `
    <div class="walker-shell supervisor-shell">
      ${SupervisorHeader()}
      ${content}
    </div>
  `;
}

function coordinatorShell(content) {
  return `
    <div class="coordinator-shell">
      ${CoordinatorHeader()}
      ${content}
    </div>
  `;
}

function adminShell(content) {
  return `
    <div class="admin-shell">
      ${AdminHeader()}
      ${content}
    </div>
  `;
}

function HeaderMinimal(activeRole) {
  return `
    <header class="topbar ${menuOpen ? "menu-is-open" : ""}">
      <a class="brand" href="/" data-link aria-label="Ir al inicio">
        <span class="brand-mark">
          <img src="/paseos-juan-logo.png" alt="" />
        </span>
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <div class="header-actions">
        <a class="header-cta" href="/#evaluacion" data-link>Evaluación gratuita</a>
        <button class="menu-button ${menuOpen ? "is-open" : ""}" type="button" data-menu-toggle aria-expanded="${menuOpen}" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `;
}

function MobileMenu() {
  return `
    <div class="menu-backdrop ${menuOpen ? "is-open" : ""}" data-menu-close></div>
    <aside class="mobile-menu ${menuOpen ? "is-open" : ""}" aria-hidden="${!menuOpen}">
      <div class="mobile-menu-head">
        <a class="menu-brand" href="/" data-link>
          <img src="/paseos-juan-logo.png" alt="" />
          <span>
            <strong>Paseos Juan</strong>
            <small>Más que un simple paseo</small>
          </span>
        </a>
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menu">${icon("x")}</button>
      </div>
      <nav class="menu-nav" aria-label="Menu principal">
        ${MENU_ITEMS.map(([label, href, iconName]) => `
          <a href="${href}" data-link>
            <span>${icon(iconName, "menu-icon")}</span>
            ${label}
          </a>
        `).join("")}
      </nav>
      <a class="menu-evaluation" href="/#evaluacion" data-link>Evaluación gratuita</a>
      <div class="menu-social">
        <span>IG</span>
        <span>WA</span>
        <span>FB</span>
      </div>
    </aside>
  `;
}

function SmoothScrollWrapper(content) {
  return `<div class="smooth-wrapper">${content}</div>`;
}

function landingPage() {
  return shell(`
    <main>
      ${HeroSection()}
      ${FeatureCards()}
      ${CTASection()}
      ${Footer()}
      <a class="whatsapp" href="https://wa.me/5491100000000" target="_blank" rel="noreferrer">WhatsApp</a>
    </main>
  `);
}

function HeroSection() {
  return `
    <section class="hero" id="inicio">
      <div class="hero-pattern" aria-hidden="true"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Paseos grupales profesionales</p>
        <h1>
          <span>Disciplina.</span>
          <span>Libertad.</span>
          <span>Bienestar.</span>
        </h1>
        <p>
          Paseos organizados por conducta, energía y compatibilidad para que tu perro viva una
          experiencia segura, activa y equilibrada.
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="#evaluacion" data-link>Evaluación gratuita</a>
          <a class="secondary-button" href="#sobre-nosotros" data-link>Conocé más</a>
        </div>
      </div>
      <div class="hero-media reveal">
        <div class="dog-frame">
          <img src="/hero-dog-premium.png" alt="Perro entrenado con estética premium de Paseos Juan" />
          <div class="dog-glass-card">
            <span class="glass-icon">${icon("radar")}</span>
            <strong>Control total</strong>
            <span>Seguimiento operativo durante todo el paseo.</span>
          </div>
        </div>
      </div>
      <a class="scroll-indicator" href="#sobre-nosotros" data-link>
        <span>Scroll</span>
        <b>${icon("chevronDown")}</b>
      </a>
    </section>
  `;
}

function FeatureCards() {
  return `
    <section class="section-grid reveal" id="sobre-nosotros">
      <div>
        <p class="eyebrow">Sobre nosotros</p>
        <h2>Paseos con orden, criterio y presencia.</h2>
      </div>
      <p>
        Paseos Juan combina evaluación inicial, grupos compatibles, checklist operativo y
        comunicación clara para cuidar la rutina de cada perro con disciplina y bienestar.
      </p>
    </section>

    ${PricingSection()}

    <section class="trust-section reveal" id="testimonios">
      <div>
        <p class="eyebrow">Testimonios</p>
        <blockquote>
          "Por primera vez puedo ver cómo vuelve mi perro, quién lo paseó y si hubo algo a observar."
        </blockquote>
        <cite>Cliente de Palermo</cite>
      </div>
      <div class="faq" id="faq">
        <h3>Preguntas frecuentes</h3>
        ${faqItem("¿Cómo empieza el servicio?", "Con una evaluación inicial para conocer conducta, energía, vacunas y compatibilidades.")}
        ${faqItem("¿Puedo ver fotos del paseo?", "Sí. El perfil cliente centraliza estado, historial y material del paseo.")}
        ${faqItem("¿Hay seguimiento en tiempo real?", "El sistema queda preparado para incorporarlo en una etapa futura.")}
      </div>
    </section>
  `;
}

function CTASection() {
  return `
    <section class="contact-section reveal" id="contacto">
      <div class="evaluation-heading">
        <p class="eyebrow">Reserva de evaluación</p>
        <h2>Reservá una evaluación inicial</h2>
        <p>
          Antes de sumar un perro al grupo, evaluamos su conducta, energía y necesidades
          para armar una experiencia segura.
        </p>
      </div>
      <form class="evaluation-form" id="evaluacion">
        <fieldset class="evaluation-board">
          <legend>Datos del perro</legend>
          <p>Información básica para entender tamaño, edad y contexto general.</p>
          <div class="form-grid">
            <label>Nombre del perro <input placeholder="Ej. Luna" /></label>
            <label>Edad del perro <input placeholder="Ej. 4 años" /></label>
            <label>Tamaño
              <select>
                <option>Pequeño</option>
                <option>Mediano</option>
                <option>Grande</option>
              </select>
            </label>
            <label>Raza o cruza <input placeholder="Ej. Mestizo" /></label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Conducta y energía</legend>
          <p>Datos clave para definir compatibilidad, ritmo y nivel de supervisión.</p>
          <div class="form-grid">
            <label>Nivel de energía
              <select>
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </label>
            <label>¿Se lleva bien con otros perros?
              <select>
                <option>Sí</option>
                <option>No</option>
                <option>Depende</option>
              </select>
            </label>
            <label>¿Tiene antecedentes de agresividad?
              <select>
                <option>No</option>
                <option>Sí</option>
              </select>
            </label>
            <label class="span-2">Observaciones de conducta
              <textarea placeholder="Miedos, reactividad, hábitos o detalles importantes"></textarea>
            </label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Datos del responsable</legend>
          <p>Canales y zona para coordinar la primera evaluación.</p>
          <div class="form-grid">
            <label>Nombre del dueño/responsable <input placeholder="Tu nombre" /></label>
            <label>Teléfono / WhatsApp <input placeholder="11 0000 0000" /></label>
            <label>Zona o barrio <input placeholder="Ej. Palermo" /></label>
            <label>Dirección aproximada <input placeholder="Entre calles o referencia" /></label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Preferencia del servicio</legend>
          <p>Preferencias iniciales para orientar la propuesta.</p>
          <div class="form-grid">
            <label>Tipo de paseo
              <select>
                <option>Grupal</option>
                <option>Evaluación inicial</option>
                <option>Consulta</option>
              </select>
            </label>
            <label>Horario preferido
              <select>
                <option>Mañana</option>
                <option>Tarde</option>
                <option>Indistinto</option>
              </select>
            </label>
            <label>Días posibles <input placeholder="Ej. lunes, miércoles y viernes" /></label>
            <label class="span-2">Comentario adicional
              <textarea placeholder="Contanos cualquier detalle que ayude a evaluar mejor"></textarea>
            </label>
          </div>
        </fieldset>

        <div class="evaluation-submit">
          <button class="primary-button" type="button">Solicitar evaluación</button>
          <small>
            Te vamos a contactar para coordinar una primera evaluación y confirmar si el perro
            puede integrarse al grupo.
          </small>
        </div>
      </form>
    </section>
  `;
}

function PricingSection() {
  return `
    <section class="pricing-section reveal" id="planes">
      <div class="pricing-heading">
        <div>
          <p class="eyebrow">Tarifario</p>
          <h2>Planes por semana y por perro.</h2>
        </div>
        <aside class="discount-card">
          <h3>Descuentos</h3>
          ${DISCOUNTS.map(([dogs, discount]) => `
            <div>
              <span>${dogs}</span>
              <strong>${discount}</strong>
            </div>
          `).join("")}
        </aside>
      </div>

      <div class="tariff-table">
        <div class="tariff-sizes">
          <span>Tamaño</span>
          ${PLAN_SIZES.map((size) => `<strong>${size}</strong>`).join("")}
        </div>
        ${PLANS.map((plan) => priceCard(plan)).join("")}
      </div>

      <div class="pricing-details-grid">
        <article class="panel benefits-panel">
          <h3>Beneficios del plan</h3>
          ${PLANS.map((plan) => `
            <div class="benefit-group">
              <strong>${plan.name}</strong>
              <ul>
                ${plan.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
              </ul>
            </div>
          `).join("")}
        </article>

        <article class="panel single-prices-panel">
          <h3>Precios por paseo</h3>
          ${SINGLE_WALK_PRICES.map((item) => `
            <div class="single-price-row">
              <strong>${item.size}</strong>
              <span>Individual <b>${item.individual}</b></span>
              <span>Grupo <b>${item.group}</b></span>
            </div>
          `).join("")}
        </article>

        <aside class="panel products-panel">
          <h3>Catálogo de productos</h3>
          ${PRODUCTS.map((product) => `
            <div class="list-row">
              <span>
                <strong>${product.name}</strong>
                <small>${product.tag}</small>
              </span>
              <b>${product.price}</b>
            </div>
          `).join("")}
        </aside>
      </div>
    </section>
  `;
}

function Footer() {
  return `
    <footer class="footer reveal">
      <a class="menu-brand" href="/" data-link>
        <img src="/paseos-juan-logo.png" alt="" />
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <p>Paseos grupales profesionales con orden, seguridad y bienestar.</p>
    </footer>
  `;
}

function authPage(mode) {
  const isLogin = mode === "login";
  return shell(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">${isLogin ? "Acceso" : "Nuevo perfil"}</p>
        <h1>${isLogin ? "Entrar a Paseos Juan" : "Crear cuenta"}</h1>
        <p>
          La misma base de perfiles soporta cliente, paseador y roles operativos.
          Luego puede conectarse a autenticación real sin cambiar el routing.
        </p>
      </section>
      <form class="auth-card reveal">
        ${isLogin ? "" : `<label>Nombre <input name="clientName" placeholder="Tu nombre" /></label>`}
        <label>Email <input name="email" type="email" placeholder="nombre@email.com" /></label>
        <label>Contraseña <input name="password" type="password" placeholder="********" /></label>
        ${isLogin ? "" : `
          <label>Nombre del perro <input name="dogName" placeholder="Ej. Luna" /></label>
          <label>Tamaño del perro
            <select name="dogSize">
              <option>Pequeño</option>
              <option selected>Mediano</option>
              <option>Grande</option>
            </select>
          </label>
          <label>Tipo de usuario
            <select name="userType">
              <option>Cliente</option>
              <option>Paseador</option>
              <option>Coordinador</option>
              <option>Supervisor</option>
            </select>
          </label>
        `}
        ${isLogin
          ? `<button class="primary-button" type="button" data-login>Ingresar</button>`
          : `<button class="primary-button" type="button" data-demo-register>Crear cuenta demo</button>`
        }
        <a href="${isLogin ? "/registro" : "/login"}" data-link>
          ${isLogin ? "Crear una cuenta" : "Ya tengo cuenta"}
        </a>
      </form>
    </main>
  `);
}

function dashboardPage(roleKey) {
  const role = ROLES[roleKey];
  const isClientDashboard = roleKey === "cliente";
  const isWalkerDashboard = roleKey === "paseador";
  const isSupervisorDashboard = roleKey === "supervisor";
  const content = {
    admin: adminDashboard,
    coordinador: coordinatorDashboard,
    supervisor: supervisorDashboard,
    paseador: walkerDashboard,
    cliente: clientDashboard,
  }[roleKey]();

  if (isWalkerDashboard) {
    return walkerShell(content);
  }

  if (isSupervisorDashboard) {
    return supervisorShell(content);
  }

  if (roleKey === "coordinador") {
    return coordinatorShell(content);
  }

  if (roleKey === "admin") {
    return adminShell(content);
  }

  return shell(`
    <main class="dashboard ${isClientDashboard ? "dashboard-client" : ""}">
      ${isClientDashboard ? "" : `
        <aside class="sidebar reveal">
          <p class="eyebrow">Perfil activo</p>
          <h1>${role.label}</h1>
          <p>${role.intent}</p>
          <div class="permission-list">
            ${PERMISSIONS.map(([name, permission]) => `
              <div class="${name.toLowerCase() === roleKey ? "selected" : ""}">
                <strong>${name}</strong>
                <small>${permission}</small>
              </div>
            `).join("")}
          </div>
        </aside>
      `}
      <section class="dashboard-content reveal">
        ${content}
      </section>
    </main>
    ${isClientDashboard ? FloatingClientChat() : ""}
  `, roleKey);
}

function walkerDashboard() {
  const currentStep = Number(localStorage.getItem("paseosJuanWalkStep") || 0);
  const shiftStarted = localStorage.getItem("paseosJuanWalkerShift") === "started";
  const statusText = currentStep === 4 ? "Finalizado" : shiftStarted ? "En curso" : "Pendiente de inicio";

  return `
    <main class="walker-dashboard">
      ${WalkerShiftStatus(shiftStarted)}
      ${WalkerSummaryCards(statusText)}
      <section class="walker-two-column">
        ${TacticalChecklist()}
        ${WalkStatusProgress(currentStep)}
      </section>
      ${AssignedDogsList()}
      <section class="walker-two-column">
        ${OperativeRouteCard()}
        ${WalkerQuickCommands()}
      </section>
      <section class="walker-two-column">
        ${WalkMediaUpload()}
        ${OperativeIncidentReport()}
      </section>
      ${SharedChatPanel("paseador", "Historial operativo", "Solo lectura. La comunicación con clientes la gestiona coordinación o supervisión.")}
    </main>
  `;
}

function WalkerHeader() {
  return `
    <header class="walker-header">
      <a class="walker-brand" href="/paseador" data-link aria-label="Paseos Juan Operativo">
        <span class="walker-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Operativo</strong>
          <small>Panel paseador</small>
        </span>
      </a>
      <div class="walker-header-actions">
        <span class="walker-online"><b></b> Online</span>
        <button class="walker-ghost-button" type="button" data-walker-logout>
          ${icon("logOut", "walker-button-icon")}
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
}

function SupervisorHeader() {
  return `
    <header class="walker-header supervisor-header">
      <a class="walker-brand" href="/supervisor" data-link aria-label="Paseos Juan Control">
        <span class="walker-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Control</strong>
          <small>Panel supervisor</small>
        </span>
      </a>
      <div class="walker-header-actions">
        <span class="walker-online"><b></b> Online</span>
        <button class="walker-ghost-button" type="button" data-supervisor-logout>
          ${icon("logOut", "walker-button-icon")}
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
}

function CoordinatorHeader() {
  return `
    <header class="coordinator-header">
      <a class="coordinator-brand" href="/coordinador" data-link aria-label="Paseos Juan Gestión">
        <span class="coordinator-logo">
          <img src="/paseos-juan-logo-green.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Gestión</strong>
          <small>Panel coordinador</small>
        </span>
      </a>
      <div class="coordinator-header-actions">
        <span class="coordinator-online"><b></b> Online</span>
        <button class="secondary-button" type="button" data-coordinator-logout>
          ${icon("logOut", "walker-button-icon")}
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
}

function AdminHeader() {
  return `
    <header class="admin-header">
      <a class="admin-brand" href="/admin" data-link aria-label="Paseos Juan Admin">
        <span class="admin-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Admin</strong>
          <small>Dirección general</small>
        </span>
      </a>
      <div class="admin-header-actions">
        <span class="admin-chip"><b></b> Online</span>
        <span class="admin-chip is-role">${icon("lock", "walker-button-icon")} Administrador</span>
        <button class="admin-secondary-button" type="button" data-admin-logout>
          ${icon("logOut", "walker-button-icon")}
          Cerrar sesión
        </button>
      </div>
    </header>
  `;
}

function WalkerShiftStatus(shiftStarted) {
  const feedback = localStorage.getItem("paseosJuanWalkerFeedback");
  return `
    <section class="walker-shift-card reveal">
      <div class="walker-shift-copy">
        <p class="walker-eyebrow">Modo operativo</p>
        <h1>Hola, Sebastián</h1>
        <p>Jornada asignada, perros, ruta y reportes organizados en un solo lugar.</p>
        <div class="walker-shift-meta">
          <span>Grupo tarde</span>
          <span>Inicio: 15:00 hs</span>
          <span>Zona: Mapuche Country Club</span>
          <span>Referente operativo: Nico</span>
        </div>
      </div>
      <div class="walker-shift-actions">
        <span class="walker-shift-state">${shiftStarted ? "Jornada iniciada" : "Jornada pendiente"}</span>
        <button class="walker-primary-button" type="button" data-walker-start>
          ${icon("play", "walker-button-icon")}
          ${shiftStarted ? "Jornada iniciada" : "Iniciar jornada"}
        </button>
        <button class="walker-secondary-button" type="button" data-walker-incident>
          ${icon("alertTriangle", "walker-button-icon")}
          Reportar incidente
        </button>
        ${feedback ? `<small class="walker-feedback">${feedback}</small>` : ""}
      </div>
    </section>
  `;
}

function WalkerSummaryCards(statusText) {
  const cards = [
    ["Grupo asignado", "Grupo tarde · 15:00 hs", "calendarCheck"],
    ["Perros asignados", `${WALKER_DOGS.length} perros`, "pawPrint"],
    ["Duración estimada", "60 minutos", "clock"],
    ["Estado actual", statusText, "shieldCheck"],
  ];

  return `
    <section class="walker-summary-grid reveal">
      ${cards.map(([title, text, iconName]) => `
        <article class="walker-summary-card">
          <span>${icon(iconName)}</span>
          <small>${title}</small>
          <strong>${text}</strong>
        </article>
      `).join("")}
    </section>
  `;
}

function TacticalChecklist() {
  const checked = getStoredArray("paseosJuanWalkerChecklist");
  const feedback = localStorage.getItem("paseosJuanChecklistFeedback");
  const confirmed = localStorage.getItem("paseosJuanChecklistConfirmed") === "true";

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Checklist táctico", "Confirmá el equipamiento antes de retirar perros.", "clipboardCheck")}
      <div class="tactical-checklist">
        ${WALKER_CHECKLIST.map((item) => `
          <label class="tactical-check ${checked.includes(item) ? "is-checked" : ""}">
            <input data-checklist-item="${item}" type="checkbox" ${checked.includes(item) ? "checked" : ""} />
            <span>${icon("checkCircle")}</span>
            ${item}
          </label>
        `).join("")}
      </div>
      <button class="walker-primary-button" type="button" data-checklist-confirm>Confirmar checklist</button>
      ${feedback ? `<p class="walker-form-feedback ${confirmed ? "is-success" : "is-warning"}">${feedback}</p>` : ""}
    </section>
  `;
}

function WalkStatusProgress(currentStep) {
  const actions = [
    ["Iniciar retiro", 1],
    ["Iniciar paseo", 2],
    ["Finalizar paseo", 3],
    ["Confirmar entregas", 4],
  ];

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Estado del paseo", "Avanzá la operación según el momento real del grupo.", "flag")}
      <div class="walk-progress">
        ${WALK_STEPS.map((step, index) => `
          <div class="walk-step ${index === currentStep ? "is-active" : ""} ${index < currentStep ? "is-done" : ""}">
            <b>${index + 1}</b>
            <span>${step}</span>
          </div>
        `).join("")}
      </div>
      <div class="walk-action-grid">
        ${actions.map(([label, step]) => `
          <button class="walker-secondary-button ${currentStep >= step ? "is-complete" : ""}" type="button" data-walk-step="${step}">
            ${label}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function AssignedDogsList() {
  return `
    <section class="walker-section reveal">
      <div class="walker-section-heading">
        <p class="walker-eyebrow">Unidad asignada</p>
        <h2>Perros del grupo</h2>
        <p>Perros del grupo y observaciones críticas para ejecutar el paseo con control.</p>
      </div>
      <div class="assigned-dog-grid">
        ${[...(getStore().dogs || []).map(d => ({id: d.id, name: d.name, size: "Mediano", energy: d.energy, risk: d.risk, behavior: d.compatibility, location: "Asignado nuevo", note: ""})), ...WALKER_DOGS].map((dog) => AssignedDogCard(dog)).join("")}
      </div>
    </section>
  `;
}

function AssignedDogCard(dog) {
  const statuses = getStoredObject("paseosJuanDogStatuses");
  const status = statuses[dog.id] || "Pendiente de retiro";
  const activeDetail = localStorage.getItem("paseosJuanDogDetail") === dog.id;

  return `
    <article class="assigned-dog-card ${status === "Retirado" ? "is-retired" : ""}">
      <div class="assigned-dog-head">
        <div>
          <small>${status}</small>
          <h3>${dog.name}</h3>
        </div>
        <span class="dog-status-icon">${icon(status === "Retirado" ? "checkCircle" : "pawPrint")}</span>
      </div>
      <div class="dog-chip-row">
        <span>${dog.size}</span>
        <span>Energía ${dog.energy}</span>
        <span class="risk-chip risk-${dog.risk.toLowerCase()}">Riesgo ${dog.risk}</span>
      </div>
      <p>${dog.behavior}</p>
      ${activeDetail ? `
        <div class="dog-detail-box">
          <span>${icon("mapPin", "walker-button-icon")} ${dog.location}</span>
          <span>${dog.note}</span>
        </div>
      ` : ""}
      <div class="dog-card-actions">
        <button class="walker-primary-button" type="button" data-dog-retired="${dog.id}">
          Marcar retirado
        </button>
        <button class="walker-secondary-button" type="button" data-dog-detail="${dog.id}">
          ${activeDetail ? "Ocultar detalle" : "Ver detalle"}
        </button>
      </div>
    </article>
  `;
}

function OperativeRouteCard() {
  return `
    <section class="walker-panel route-panel reveal">
      ${WalkerPanelHeader("Ruta operativa", "Orden sugerido de retiro y entrega según ubicación y organización del grupo.", "route")}
      <div class="route-stats">
        <span>Zona: <b>Mapuche Country Club</b></span>
        <span>Tiempo estimado: <b>60 minutos</b></span>
        <span>Distancia estimada: <b>3.2 km</b></span>
      </div>
      <ol class="operative-route-list">
        ${[...(getStore().dogs || []).map(d => ({id: d.id, name: d.name, location: "Asignado nuevo"})), ...WALKER_DOGS].map((dog, index) => `
          <li>
            <b>${index + 1}</b>
            <span><strong>${dog.name}</strong><small>${dog.location}</small></span>
          </li>
        `).join("")}
      </ol>
      <button class="walker-primary-button" type="button" data-open-route>
        ${icon("navigation", "walker-button-icon")}
        Abrir ruta
      </button>
    </section>
  `;
}

function WalkerQuickCommands() {
  const feedback = localStorage.getItem("paseosJuanQuickCommand");
  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Comandos rápidos", "Mensajes operativos para avisar novedades sin perder tiempo.", "message")}
      <div class="quick-command-grid">
        ${WALKER_COMMANDS.map((command) => `
          <button type="button" data-quick-command="${command}">
            ${icon("send", "walker-button-icon")}
            ${command}
          </button>
        `).join("")}
      </div>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function WalkMediaUpload() {
  const photo = localStorage.getItem("paseosJuanWalkerMediaPhoto");
  const video = localStorage.getItem("paseosJuanWalkerMediaVideo");
  const comment = localStorage.getItem("paseosJuanMaterialComment") || "";
  const feedback = localStorage.getItem("paseosJuanMaterialFeedback");

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Material del paseo", "Cargá fotos, videos o comentarios que luego puedan compartirse con el cliente.", "camera")}
      <div class="walker-upload-grid">
        ${WalkerUploadField("Subir foto", "Photo", ".jpg,.jpeg,.png", photo)}
        ${WalkerUploadField("Subir video corto", "Video", ".mp4", video)}
      </div>
      <label class="walker-field">Comentario del paseo
        <textarea data-material-comment placeholder="Ej. Grupo estable, buen ritmo, sin novedades.">${comment}</textarea>
      </label>
      <button class="walker-primary-button" type="button" data-save-material>Guardar material</button>
      <small class="walker-muted">Formatos permitidos: JPG, PNG o MP4.</small>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function OperativeIncidentReport() {
  const reportFile = localStorage.getItem("paseosJuanReportFile");
  const feedback = localStorage.getItem("paseosJuanReportFeedback");

  return `
    <section class="walker-panel reveal" id="reporte-operativo">
      ${WalkerPanelHeader("Reporte operativo", "Registrá cualquier situación relevante durante el paseo.", "alertTriangle")}
      <div class="walker-form-grid">
        <label class="walker-field">Perro involucrado
          <select>
            ${WALKER_DOGS.map((dog) => `<option>${dog.name}</option>`).join("")}
          </select>
        </label>
        <label class="walker-field">Tipo de incidente
          <select>
            <option>Tirón fuerte</option>
            <option>Cruce con perro externo</option>
            <option>Pelea</option>
            <option>Lesión</option>
            <option>Escape</option>
            <option>Otro</option>
          </select>
        </label>
        <label class="walker-field">Nivel de riesgo
          <select>
            <option>Bajo</option>
            <option>Medio</option>
            <option>Alto</option>
          </select>
        </label>
        <label class="walker-field">Subir foto/video opcional
          <input data-report-file type="file" accept=".jpg,.jpeg,.png,.mp4" />
          <small>${reportFile || "Sin archivo adjunto"}</small>
        </label>
      </div>
      <label class="walker-field">Descripción
        <textarea placeholder="Describir situación, perro involucrado y acción tomada."></textarea>
      </label>
      <button class="walker-primary-button" type="button" data-send-report>Enviar reporte</button>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function WalkerUploadField(label, type, accept, fileName) {
  const inputId = `walker-media-${type.toLowerCase()}`;
  return `
    <div class="walker-upload-field">
      <input id="${inputId}" data-walker-media="${type}" type="file" accept="${accept}" />
      <label for="${inputId}">
        ${icon("uploadCloud")}
        <strong>${label}</strong>
        <small>${fileName || "Sin archivo cargado"}</small>
      </label>
    </div>
  `;
}

function WalkerPanelHeader(title, text, iconName) {
  return `
    <header class="walker-panel-head">
      <span>${icon(iconName)}</span>
      <div>
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
    </header>
  `;
}

function clientDashboard() {
  const demoClient = getDemoClient();
  const clientName = demoClient?.name?.split(" ")[0] || "Martín";
  const clientHighlights = [
    {
      title: "Próximo paseo",
      text: "Revisá el estado y horario estimado del próximo paseo.",
      icon: "calendarCheck",
    },
    {
      title: "Mi perro",
      text: "Consultá datos, conducta, vacunas y observaciones importantes.",
      icon: "pawPrint",
    },
    {
      title: "Beneficios",
      text: "Accedé a beneficios del plan, productos recomendados y comunicación directa.",
      icon: "shieldCheck",
    },
  ];

  return `
    <section class="client-hero-card">
      <div class="client-hero-copy">
        <p class="eyebrow">Perfil cliente</p>
        <h2>Hola, ${clientName}</h2>
        <p>Todo lo que necesitás para seguir la experiencia de tu perro con Paseos Juan.</p>
        <small>Estado del paseo, documentación, beneficios, pagos y comunicación en un solo lugar.</small>
        <button class="primary-button">Solicitar evaluación inicial</button>
      </div>
      <div class="client-highlight-grid">
        ${clientHighlights.map((item) => `
          <article class="client-highlight-card">
            <span>${icon(item.icon)}</span>
            <strong>${item.title}</strong>
            <p>${item.text}</p>
          </article>
        `).join("")}
      </div>
    </section>
    ${demoClient ? `
      <article class="panel demo-client-card">
        <div>
          <p class="eyebrow">Cuenta demo activa</p>
          <h3>${demoClient.dogName}</h3>
          <small>${demoClient.email} · Tamaño ${demoClient.dogSize}</small>
        </div>
        <button class="ghost-button" type="button" data-clear-demo>Salir demo</button>
      </article>
    ` : ""}
    <div class="dashboard-grid">
      <article class="panel wide">
        <h3>Estado del próximo paseo</h3>
        <div class="status-track">
          ${["Esperando retiro", "Retirado", "Paseando", "Regresando", "Entregado"].map((step, index) => `
            <span class="${index === 0 ? "current" : ""}">${step}</span>
          `).join("")}
        </div>
      </article>
      <article class="panel">
        <h3>Notificaciones</h3>
        ${["Retiro programado 10:00", "Vacuna de Tango pendiente", "Nuevo album disponible"].map((notice) => `
          <div class="notice">${notice}</div>
        `).join("")}
      </article>
    </div>
    <section class="dog-grid">
      ${DOGS.slice(0, 2).map((dog) => dogCard(dog)).join("")}
    </section>
    ${VaccinationUploadCard()}
    <div class="dashboard-grid">
      <article class="panel">
        <h3>Crear perfil de perro</h3>
        <label>Edad <input placeholder="Ej. 3 anos" /></label>
        <label>Raza <input placeholder="Ej. Labrador" /></label>
        <label>Conducta <textarea placeholder="Sociable, reactivo, miedos, rutinas"></textarea></label>
        <label>Veterinario <input placeholder="Nombre y telefono" /></label>
        <label>Vacunas <input placeholder="Estado de vacunas" /></label>
      </article>
      <article class="panel">
        <h3>Pagos y planes</h3>
        <div class="client-plan-list">
          ${PLANS.map((plan) => compactPlanCard(plan)).join("")}
        </div>
        <button class="secondary-button" data-client-action="pay-online">Pagar online</button>
      </article>
      <article class="panel">
        <h3>Cambios de conducta</h3>
        <textarea placeholder="Contanos que cambio observaste"></textarea>
        <button class="secondary-button">Reportar cambio</button>
      </article>
      <article class="panel">
        <h3>Seguimiento en tiempo real</h3>
        <strong class="metric">Futuro</strong>
        <small>La vista queda reservada para mapa, ubicacion y ETA del paseo.</small>
      </article>
    </div>
    <article class="panel">
      <h3>Historial y material del paseo</h3>
      <div class="media-grid">
        <div>Foto paseo</div>
        <div>Video corto</div>
        <div>Reporte final</div>
      </div>
    </article>
    ${ProductBenefits()}
  `;
}

function adminDashboard() {
  return `
    <main class="admin-dashboard">
      ${AdminCommandCenter()}
      ${AdminSummaryCards()}
      <section class="admin-two-column">
        ${AdminHierarchy()}
        ${AdminCriticalAlerts()}
      </section>
      <section class="admin-two-column">
        ${AdminUsersPermissions()}
        ${AdminFinancePanel()}
      </section>
      <section class="admin-two-column">
        ${AdminPricingPanel()}
        ${AdminReportsPanel()}
      </section>
      ${AdminClientsDogs()}
      <section class="admin-two-column">
        ${AdminSystemSettings()}
        ${AdminCommunicationAudit()}
      </section>
    </main>
  `;
}

function AdminCommandCenter() {
  return `
    <section class="admin-hero">
      <div>
        <p class="admin-eyebrow">Centro directivo</p>
        <h1>Dirección general</h1>
        <p>Control total del sistema: operación, equipo, clientes, cobros, permisos, precios y reportes.</p>
      </div>
      <div class="admin-action-grid">
        ${[
          ["Ver reportes", "fileUp", "reports"],
          ["Gestionar usuarios", "radar", "users"],
          ["Configurar precios", "creditCard", "prices"],
          ["Revisar alertas", "alertTriangle", "alerts"],
        ].map(([label, iconName, actionType], index) => `
          <button class="${index === 0 ? "admin-primary-button" : "admin-secondary-button"}" type="button" data-admin-action="${actionType}">
            ${icon(iconName, "walker-button-icon")}
            ${label}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminSummaryCards() {
  return `
    <section class="admin-summary-section">
      <div class="admin-section-title">
        <p class="admin-eyebrow">Panorama</p>
        <h2>Resumen general</h2>
      </div>
      <div class="admin-summary-grid">
        ${ADMIN_SUMMARY.map(([title, value, iconName], index) => `
          <article class="admin-card admin-summary-card ${index === 5 ? "is-featured" : ""}">
            <span>${icon(iconName)}</span>
            <small>${title}</small>
            <strong>${value}</strong>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminPanelHeader(eyebrow, title, iconName) {
  return `
    <header class="admin-panel-head">
      <span>${icon(iconName)}</span>
      <div>
        <p class="admin-eyebrow">${eyebrow}</p>
        <h2>${title}</h2>
      </div>
    </header>
  `;
}

function AdminHierarchy() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Solo admin", "Jerarquía operativa", "shieldCheck")}
      <div class="admin-hierarchy-list">
        ${ADMIN_HIERARCHY.map(([role, text, iconName]) => `
          <article class="admin-hierarchy-item">
            <span>${icon(iconName)}</span>
            <div>
              <strong>${role}</strong>
              <p>${text}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminUsersPermissions() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Accesos", "Usuarios y permisos", "users")}
      <div class="admin-table-list">
        ${ADMIN_USERS.map(([name, role, status]) => `
          <article class="admin-table-row">
            <div>
              <strong>${name}</strong>
              <small>${role}</small>
            </div>
            <span class="admin-status">${status}</span>
            <div class="admin-row-actions">
              <button class="admin-secondary-button" type="button" data-admin-action="user-change-role">Cambiar rol</button>
              <button class="admin-secondary-button" type="button" data-admin-action="user-toggle">Activar/desactivar</button>
              <button class="admin-secondary-button" type="button" data-admin-action="user-permissions">Ver permisos</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminPricingPanel() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Configuración global", "Precios y planes", "sliders")}
      <div class="admin-price-grid">
        ${PLANS.map((plan, index) => `
          <article class="admin-price-card ${index === 1 ? "is-featured" : ""}">
            <small>${plan.walks}</small>
            <strong>${plan.name}</strong>
            ${PLAN_SIZES.map((size, sizeIndex) => `
              <div>
                <span>${size}</span>
                <b>${plan.prices[sizeIndex]}</b>
              </div>
            `).join("")}
            <button class="admin-secondary-button" type="button" data-admin-action="edit-plan">Editar plan</button>
          </article>
        `).join("")}
      </div>
      <div class="admin-discount-row">
        ${DISCOUNTS.map(([dogs, discount]) => `<span>${dogs}: <b>${discount}</b></span>`).join("")}
      </div>
    </section>
  `;
}

function AdminFinancePanel() {
  let totalCobrado = 6920000;
  const history = getStoredArray("paseosJuanPaymentHistory");
  history.forEach(p => {
    if (p.status === "Confirmado") {
      const amountStr = p.amount.replace(/[^0-9]/g, '');
      totalCobrado += parseInt(amountStr, 10) || 0;
    }
  });
  const items = [
    ["Ingresos estimados", "$8.400.000"],
    ["Cobrado", "$" + totalCobrado.toLocaleString('es-AR')],
    ["Pendiente", "$245.000"],
    ["Deuda", "$85.000"],
    ["Pagos por confirmar", history.length ? "Ver historial" : "2"],
    ["Costos operativos", "$3.100.000"],
    ["Resultado estimado", "$5.300.000"],
  ];

  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Dirección financiera", "Finanzas generales", "wallet")}
      <div class="admin-finance-grid">
        ${items.map(([label, value], index) => `
          <article class="${index === 6 ? "is-featured" : ""}">
            <small>${label}</small>
            <strong>${value}</strong>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminReportsPanel() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Inteligencia operativa", "Reportes operativos", "fileText")}
      <div class="admin-report-grid">
        ${ADMIN_REPORTS.map(([title, text, iconName]) => `
          <article>
            <span>${icon(iconName)}</span>
            <strong>${title}</strong>
            <p>${text}</p>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminClientsDogs() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Base general", "Clientes y perros", "database")}
      <div class="admin-client-grid">
        ${[...(getStore().clients || []).map(c => [c.client, c.dogs, c.zone, c.plan, c.documentation, c.status]), ...ADMIN_CLIENTS].map(([client, dogs, zone, plan, documentation, status]) => `
          <article class="admin-client-row">
            <div><small>Cliente</small><strong>${client}</strong><span>${dogs}</span></div>
            <div><small>Zona</small><strong>${zone}</strong><span>${plan}</span></div>
            <div><small>Documentación</small><strong>${documentation}</strong><span>${status}</span></div>
            <div class="admin-row-actions">
              <button class="admin-secondary-button" type="button" data-admin-action="view-client">Ver ficha</button>
              <button class="admin-secondary-button" type="button" data-admin-action="audit-client">Auditar</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminSystemSettings() {
  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Sistema", "Configuración del sistema", "settings")}
      <div class="admin-settings-grid">
        ${ADMIN_SETTINGS.map((setting) => `
          <button class="admin-setting-button" type="button" data-admin-action="settings">
            ${icon("settings", "walker-button-icon")}
            ${setting}
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminCriticalAlerts() {
  return `
    <section class="admin-panel admin-alert-panel">
      ${AdminPanelHeader("Riesgo", "Alertas críticas", "alertTriangle")}
      <div class="admin-alert-list">
        ${[...(getStore().alerts || []).map(a => [a.dog, a.type, a.description]), ...ADMIN_CRITICAL_ALERTS].map(([subject, title, text]) => `
          <article>
            <span>${subject}</span>
            <strong>${title}</strong>
            <p>${text}</p>
            <button class="admin-secondary-button" type="button" data-admin-action="review-alert">Revisar</button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function AdminCommunicationAudit() {
  const conversations = getChatConversations();

  return `
    <section class="admin-panel">
      ${AdminPanelHeader("Auditoría", "Auditoría de comunicación", "message")}
      <p class="admin-muted">Cliente escribe. Coordinador responde. Supervisor responde. Paseador solo lectura. Admin audita el historial.</p>
      <div class="admin-audit-list">
        ${conversations.map((conversation) => {
          const last = conversation.messages[conversation.messages.length - 1];
          return `
            <article>
              <div>
                <strong>${conversation.clientName}</strong>
                <small>${conversation.dogs.join(", ")} · ${conversation.status}</small>
              </div>
              <p>${last?.senderName || "Sistema"}: ${last?.text || "Sin mensajes"}</p>
              <span>${last?.timestamp || "--:--"}</span>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function coordinatorDashboard() {
  return `
    <main class="dashboard coordinator-dashboard">
      <section class="dashboard-content">
        ${CoordinatorHero()}
        ${NewDogIntake()}
        ${ClientRequestsBoard()}
        ${SendToSupervisorPanel()}
        ${CoordinatorOperationsGrid()}
        ${SharedChatPanel("coordinador", "Chat con clientes", "Coordinación y supervisor pueden responder. El cliente escribe desde su perfil y paseador queda solo lectura.")}
        ${PaymentsDashboard()}
      </section>
    </main>
  `;
}

function CoordinatorHero() {
  return `
    <section class="coordinator-hero">
      <div>
        <p class="eyebrow">Centro de gestión</p>
        <h1>Coordinación diaria</h1>
        <p>Clientes, perros nuevos, documentación, chat, cobros, evaluaciones y derivaciones al supervisor en un solo panel.</p>
      </div>
      <div class="coordinator-hero-stats">
        <span><b>5</b><small>Solicitudes abiertas</small></span>
        <span><b>3</b><small>Evaluaciones a coordinar</small></span>
        <span><b>4</b><small>Alertas de cobro</small></span>
      </div>
    </section>
  `;
}

function NewDogIntake() {
  const feedback = localStorage.getItem("paseosJuanCoordinatorDogFeedback");
  const documentName = localStorage.getItem("paseosJuanCoordinatorDocument");

  return `
    <section class="coordinator-module coordinator-intake" id="agregar-perro">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Nuevo ingreso</p>
          <h2>Agregar perro nuevo</h2>
          <p>Completá la ficha base para crear el perfil, revisar documentación y decidir si corresponde evaluación.</p>
        </div>
      </div>
      <div class="coordinator-form-grid">
        <label>Nombre del perro <input placeholder="Ej. Bruno" /></label>
        <label>Edad <input placeholder="Ej. 3 años" /></label>
        <label>Raza o cruza <input placeholder="Ej. mestizo, labrador, cruza" /></label>
        <label>Tamaño
          <select>
            <option>Pequeño</option>
            <option selected>Mediano</option>
            <option>Grande</option>
          </select>
        </label>
        <label>Energía
          <select>
            <option>Baja</option>
            <option selected>Media</option>
            <option>Alta</option>
          </select>
        </label>
        <label>Conducta <input placeholder="Ej. sociable, tira al inicio" /></label>
        <label>Sociabilidad
          <select>
            <option>Buena con perros</option>
            <option>Depende del grupo</option>
            <option>Requiere evaluación</option>
          </select>
        </label>
        <label>Antecedentes de agresividad
          <select>
            <option>No</option>
            <option>Depende del estímulo</option>
            <option>Sí</option>
          </select>
        </label>
        <label>Nombre del cliente <input placeholder="Ej. Martín Rivas" /></label>
        <label>WhatsApp <input placeholder="+54 9 11..." /></label>
        <label>Dirección <input placeholder="Casa, torre o referencia" /></label>
        <label>Zona
          <select>
            <option>Mapuche Norte</option>
            <option>Mapuche Sur</option>
            <option>Mapuche Centro</option>
            <option>Otra zona</option>
          </select>
        </label>
        <label>Vacunas/documentación
          <input data-coordinator-document type="file" accept=".jpg,.jpeg,.png,.pdf" />
          <small>${documentName || "JPG, PNG o PDF"}</small>
        </label>
        <label>Servicio solicitado
          <select>
            <option>Evaluación inicial</option>
            <option>Paseo grupal</option>
            <option>Consulta de plan</option>
            <option>Cambio de conducta</option>
          </select>
        </label>
        <label>Estado interno
          <select>
            <option>Nuevo ingreso</option>
            <option>Documentación pendiente</option>
            <option>Listo para evaluación</option>
            <option>En revisión de riesgo</option>
          </select>
        </label>
        <label class="span-2">Observaciones internas
          <textarea placeholder="Datos clave para coordinación y supervisor"></textarea>
        </label>
      </div>
      <div class="coordinator-action-row">
        <button class="secondary-button" type="button" data-coordinator-save-dog="save">Guardar perro</button>
        <button class="primary-button" type="button" data-coordinator-save-dog="evaluation">Guardar y enviar a evaluación</button>
      </div>
      ${feedback ? `<p class="coordinator-feedback">${feedback}</p>` : ""}
    </section>
  `;
}

function ClientRequestsBoard() {
  const feedback = localStorage.getItem("paseosJuanCoordinatorRequestFeedback");

  return `
    <section class="coordinator-module">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Entrada comercial y operativa</p>
          <h2>Solicitudes de clientes</h2>
          <p>Clasificá consultas, documentación pendiente, evaluaciones iniciales y cambios de conducta.</p>
        </div>
        ${feedback ? `<span class="coordinator-feedback is-compact">${feedback}</span>` : ""}
      </div>
      <div class="coordinator-request-grid">
        ${COORDINATOR_REQUESTS.map((request) => `
          <article class="coordinator-request-card">
            <div class="coordinator-request-head">
              <span>${request.type}</span>
              <b>${request.status}</b>
            </div>
            <h3>${request.client}</h3>
            <p>${request.dog} · ${request.zone}</p>
            <small>${request.detail}</small>
            <div class="coordinator-request-actions">
              ${["Ver solicitud", "Hablar con cliente", "Crear perfil", "Enviar a evaluación"].map((action) => `
                <button class="secondary-button" type="button" data-coordinator-request-action="${action}" data-request-dog="${request.dog}">
                  ${action}
                </button>
              `).join("")}
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function SendToSupervisorPanel() {
  const feedback = localStorage.getItem("paseosJuanCoordinatorSupervisorFeedback");

  return `
    <section class="coordinator-module">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Derivación operativa</p>
          <h2>Enviar al supervisor</h2>
          <p>Derivá perros que requieren evaluación, integración al grupo, revisión de riesgo o seguimiento de conducta.</p>
        </div>
      </div>
      <div class="coordinator-form-grid compact">
        <label>Perro
          <select>
            ${["Bruno", "Luna", "Pistacho", "Frida", "Kiara", "Forest"].map((dog) => `<option>${dog}</option>`).join("")}
          </select>
        </label>
        <label>Cliente <input placeholder="Nombre del cliente" /></label>
        <label>Zona
          <select>
            <option>Mapuche Norte</option>
            <option>Mapuche Sur</option>
            <option>Mapuche Centro</option>
          </select>
        </label>
        <label>Motivo
          <select>
            <option>Evaluación inicial</option>
            <option>Integración a grupo</option>
            <option>Cambio de conducta</option>
            <option>Revisión de riesgo</option>
          </select>
        </label>
        <label class="span-2">Observaciones
          <textarea placeholder="Conducta, energía, documentación o punto crítico a revisar"></textarea>
        </label>
      </div>
      <div class="coordinator-action-row">
        <button class="primary-button" type="button" data-send-supervisor>Enviar al supervisor</button>
      </div>
      ${feedback ? `<p class="coordinator-feedback">${feedback}</p>` : ""}
    </section>
  `;
}

function CoordinatorOperationsGrid() {
  return `
    <section class="coordinator-operations-grid">
      <article class="coordinator-module">
        <div class="coordinator-module-head">
          <div>
            <p class="eyebrow">Agenda</p>
            <h2>Paseos y evaluaciones</h2>
          </div>
        </div>
        ${WALKS.map((walk) => walkRow(walk)).join("")}
      </article>
      <article class="coordinator-module">
        <div class="coordinator-module-head">
          <div>
            <p class="eyebrow">Prioridades</p>
            <h2>Alertas de gestión</h2>
          </div>
        </div>
        ${["Documentación de Bruno pendiente", "Frida requiere revisión de conducta", "Sol consultó Plan 2", "Vilma registra deuda"].map((alert) => `
          <div class="notice">${alert}</div>
        `).join("")}
      </article>
    </section>
  `;
}

function PaymentsDashboard() {
  return `
    <section class="payments-dashboard reveal">
      ${RegisterPaymentModal()}
      ${PaymentReminderModal()}
      <div class="payments-heading">
        <div>
          <p class="eyebrow">Cobros y pagos</p>
          <h2>Cobros y pagos</h2>
          <p>Controlá planes activos, pagos pendientes, deudas y recordatorios a clientes.</p>
        </div>
        <span class="payments-permissions">Coordinador: cobros, recordatorios, comprobantes y comunicación.</span>
      </div>
      ${PaymentsSummaryCards()}
      <div class="payments-layout">
        ${PaymentAliasCard()}
        ${PaymentAlerts()}
      </div>
      ${ClientPaymentsList()}
      ${PaymentHistory()}
    </section>
  `;
}

function PaymentsSummaryCards() {
  const cards = [
    ["Total a cobrar", "$245.000", "wallet"],
    ["Cobrado", "$160.000", "creditCard"],
    ["Pendiente", "$85.000", "receipt"],
    ["Clientes con deuda", "4 clientes", "alertTriangle"],
    ["Pagos por confirmar", "2 pagos", "checkCircle"],
  ];

  return `
    <div class="payments-summary-grid">
      ${cards.map(([title, value, iconName]) => `
        <article class="payment-summary-card">
          <span>${icon(iconName)}</span>
          <small>${title}</small>
          <strong>${value}</strong>
        </article>
      `).join("")}
    </div>
  `;
}

function ClientPaymentsList() {
  return `
    <section class="payments-panel">
      <div class="payments-section-head">
        <div>
          <h3>Clientes y cobros</h3>
          <p>Planes activos, vencimientos, estado de pago y acciones rápidas.</p>
        </div>
      </div>
      <div class="client-payments-grid">
        ${getPaymentClients().map((client) => PaymentClientCard(client)).join("")}
      </div>
    </section>
  `;
}

function PaymentClientCard(client) {
  return `
    <article class="client-payment-card">
      <div class="client-payment-head">
        <div>
          <small>${client.plan}</small>
          <h4>${client.client}</h4>
          <p>${client.dogs}</p>
        </div>
        <span class="payment-status ${paymentStatusClass(client.status)}">${client.status}</span>
      </div>
      <div class="payment-detail-grid">
        <span><small>Monto</small><b>${client.amount}</b></span>
        <span><small>Vencimiento</small><b>${client.due}</b></span>
        <span><small>Último pago</small><b>${client.lastPayment}</b></span>
      </div>
      <div class="payment-actions">
        <button class="secondary-button" type="button" data-register-payment="${client.id}">Registrar pago</button>
        <button class="secondary-button" type="button" data-payment-reminder="${client.id}">Enviar recordatorio</button>
        <button class="secondary-button" type="button" data-payment-history="${client.id}">Ver historial</button>
        <button class="secondary-button" type="button" data-payment-chat="${client.id}">Hablar con cliente</button>
      </div>
    </article>
  `;
}

function RegisterPaymentModal() {
  const modal = localStorage.getItem("paseosJuanPaymentModal");
  if (modal !== "register") return "";
  const client = getPaymentClient(localStorage.getItem("paseosJuanSelectedPaymentClient"));
  if (!client) return "";
  const receipt = localStorage.getItem(`paseosJuanPaymentReceipt-${client.id}`);

  return `
    <section class="payment-modal-backdrop">
      <div class="payment-modal">
        <header class="payment-modal-head">
          <div>
            <p class="eyebrow">Registrar pago</p>
            <h3>Registrar pago</h3>
          </div>
          <button type="button" data-close-payment-modal aria-label="Cerrar">${icon("x", "walker-button-icon")}</button>
        </header>
        <div class="payment-form-grid">
          <label>Cliente <input value="${client.client}" readonly /></label>
          <label>Perro/perros <input value="${client.dogs}" readonly /></label>
          <label>Monto recibido <input data-payment-amount value="${client.amount}" /></label>
          <label>Método de pago
            <select data-payment-method>
              <option>Transferencia</option>
              <option>Efectivo</option>
              <option>Mercado Pago</option>
              <option>Otro</option>
            </select>
          </label>
          <label>Fecha de pago <input data-payment-date placeholder="Ej. 24/05" /></label>
          <label>Comprobante
            <input data-payment-receipt="${client.id}" type="file" accept=".jpg,.jpeg,.png,.pdf" />
            <small>${receipt || "Imagen o PDF"}</small>
          </label>
          <label class="span-2">Observaciones
            <textarea data-payment-notes placeholder="Detalle del pago, comprobante o aclaración"></textarea>
          </label>
        </div>
        <footer class="payment-modal-actions">
          <button class="secondary-button" type="button" data-close-payment-modal>Cancelar</button>
          <button class="primary-button" type="button" data-confirm-payment="${client.id}">Confirmar pago</button>
        </footer>
      </div>
    </section>
  `;
}

function PaymentReminderModal() {
  const modal = localStorage.getItem("paseosJuanPaymentModal");
  if (modal !== "reminder") return "";
  const client = getPaymentClient(localStorage.getItem("paseosJuanSelectedPaymentClient"));
  if (!client) return "";

  return `
    <section class="payment-modal-backdrop">
      <div class="payment-modal">
        <header class="payment-modal-head">
          <div>
            <p class="eyebrow">Recordatorio de pago</p>
            <h3>Recordatorio de pago</h3>
          </div>
          <button type="button" data-close-payment-modal aria-label="Cerrar">${icon("x", "walker-button-icon")}</button>
        </header>
        <label class="payment-reminder-message">Mensaje editable
          <textarea data-reminder-message>${getPaymentReminderText(client)}</textarea>
        </label>
        <footer class="payment-modal-actions">
          <button class="secondary-button" type="button" data-copy-reminder="${client.id}">${icon("copy", "walker-button-icon")} Copiar mensaje</button>
          <button class="secondary-button" type="button" data-whatsapp-reminder="${client.id}">${icon("message", "walker-button-icon")} Enviar por WhatsApp</button>
          <button class="primary-button" type="button" data-mark-reminder-sent="${client.id}">Marcar recordatorio enviado</button>
        </footer>
      </div>
    </section>
  `;
}

function PaymentHistory() {
  return `
    <section class="payments-panel" id="historial-cobros">
      <div class="payments-section-head">
        <div>
          <h3>Historial de cobros</h3>
          <p>Pagos, recordatorios, comprobantes y observaciones de coordinación.</p>
        </div>
      </div>
      <div class="payment-history-list">
        ${getPaymentHistory().map((item) => `
          <article class="payment-history-row">
            <div><small>Cliente</small><strong>${item.client}</strong><span>${item.dogs}</span></div>
            <div><small>Monto</small><strong>${item.amount}</strong><span>${item.method}</span></div>
            <div><small>Fecha</small><strong>${item.date}</strong><span>${item.status}</span></div>
            <div><small>Observaciones</small><span>${item.notes}</span><b>${item.receipt || "Sin comprobante"}</b></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function PaymentAliasCard() {
  const feedback = localStorage.getItem("paseosJuanPaymentFeedback");
  return `
    <article class="payments-panel payment-alias-card">
      <span>${icon("wallet")}</span>
      <div>
        <h3>Datos de transferencia</h3>
        <p>Usá este alias para enviar recordatorios de pago a clientes.</p>
        <strong>${PAYMENT_ALIAS}</strong>
      </div>
      <button class="primary-button" type="button" data-copy-payment-alias>${icon("copy", "walker-button-icon")} Copiar alias</button>
      ${feedback ? `<small class="payment-feedback">${feedback}</small>` : ""}
    </article>
  `;
}

function PaymentAlerts() {
  const resolved = getStoredArray("paseosJuanResolvedPaymentAlerts");
  const alerts = [
    ["martin", "Martín", "$37.500", "Pendiente", "Enviar recordatorio y pedir comprobante."],
    ["sol", "Sol", "$37.500", "Pago por confirmar", "Validar comprobante recibido."],
    ["vilma", "Vilma", "$45.900", "Deuda", "Contactar y coordinar regularización."],
    ["laura", "Laura", "$72.500", "Al día", "Pago confirmado."],
  ].filter(([id]) => !resolved.includes(id));

  return `
    <section class="payments-panel">
      <div class="payments-section-head">
        <div>
          <h3>Alertas de cobro</h3>
          <p>Casos que requieren seguimiento administrativo.</p>
        </div>
      </div>
      <div class="payment-alert-list">
        ${alerts.map(([id, client, amount, status, action]) => `
          <article class="payment-alert-card">
            <span class="payment-status ${paymentStatusClass(status)}">${status}</span>
            <strong>${client}</strong>
            <small>${amount}</small>
            <p>${action}</p>
            <div class="payment-actions">
              <button class="secondary-button" type="button" data-resolve-payment-alert="${id}">Resolver</button>
              <button class="secondary-button" type="button" data-payment-chat="${id}">Hablar con cliente</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function paymentStatusClass(status) {
  return status
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "-");
}

function supervisorDashboard() {
  return `
    <main class="walker-dashboard supervisor-dashboard">
      ${SupervisorShiftStatus()}
      ${CreateRouteModal()}
      ${CreatedRoutesBoard()}
      ${SupervisorSummaryCards()}
      ${SupervisorModeSelector()}
      ${ActiveWalkers()}
      ${SupervisorGroups()}
      ${PickupDeliveryControl()}
      <section class="walker-two-column">
        ${RiskAlerts()}
        ${SupervisorChecklist()}
      </section>
      <section class="walker-two-column">
        ${TeamCommunication()}
        ${ReceivedReports()}
      </section>
      ${SharedChatPanel("supervisor", "Chat operativo con clientes", "Comunicación directa para novedades de campo, seguridad y seguimiento.")}
      ${ShiftClosure()}
    </main>
  `;
}

function SupervisorShiftStatus() {
  const active = localStorage.getItem("paseosJuanSupervisorShift") === "active";
  const feedback = localStorage.getItem("paseosJuanSupervisorFeedback");

  return `
    <section class="walker-shift-card supervisor-command-card reveal">
      <div class="walker-shift-copy">
        <p class="walker-eyebrow">Modo supervisión</p>
        <h1>Hola, Nico</h1>
        <p>Controlá paseadores, perros, grupos, riesgos y reportes desde un solo panel.</p>
        <p class="supervisor-command-note">
          El supervisor puede acompañar rutas complejas y tomar el control de los perros con carácter más fuerte, sin superar los límites operativos del equipo.
        </p>
        <div class="walker-shift-meta">
          <span>Turno: Tarde</span>
          <span>Inicio operativo: 15:00 hs</span>
          <span>Zona: Mapuche Country Club</span>
          <span>Paseadores activos: 2</span>
          <span>Perros totales: 12</span>
        </div>
      </div>
      <div class="walker-shift-actions">
        <span class="walker-shift-state">${active ? "Supervisión activa" : "Supervisión pendiente"}</span>
        <button class="walker-primary-button create-route-main-button" type="button" data-open-create-route>
          ${icon("plus", "walker-button-icon")}
          Crear ruta
        </button>
        <button class="walker-secondary-button" type="button" data-manage-absence>
          ${icon("userCheck", "walker-button-icon")}
          Gestionar ausencia
        </button>
        <button class="walker-secondary-button" type="button" data-activate-companion-top>
          ${icon("users", "walker-button-icon")}
          Activar acompañamiento
        </button>
        <button class="walker-secondary-button" type="button" data-contact-walkers-top>
          ${icon("message", "walker-button-icon")}
          Contactar paseadores
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-create-alert>
          ${icon("bell", "walker-button-icon")}
          Crear alerta
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-close-shift>
          ${icon("flag", "walker-button-icon")}
          Cerrar jornada
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-start>
          ${icon("radio", "walker-button-icon")}
          Iniciar supervisión
        </button>
        ${feedback ? `<small class="walker-feedback">${feedback}</small>` : ""}
      </div>
    </section>
  `;
}

function SupervisorSummaryCards() {
  const reviewedAlerts = getStoredArray("paseosJuanReviewedAlerts");
  const openAlerts = Math.max(0, SupervisorAlertData().filter((alert) => !reviewedAlerts.includes(alert.id)).length);
  const cards = [
    ["Perros del día", "12 perros", "pawPrint"],
    ["Paseadores activos", "2 paseadores", "users"],
    ["Grupos activos", "2 grupos", "route"],
    ["Alertas abiertas", `${openAlerts} alerta${openAlerts === 1 ? "" : "s"}`, "alertTriangle"],
    ["Estado general", "Operación estable", "shieldCheck"],
  ];

  return `
    <section class="walker-summary-grid supervisor-summary-grid reveal">
      ${cards.map(([title, text, iconName]) => `
        <article class="walker-summary-card supervisor-summary-card">
          <span>${icon(iconName)}</span>
          <small>${title}</small>
          <strong>${text}</strong>
        </article>
      `).join("")}
    </section>
  `;
}

function CreateRouteModal() {
  const isOpen = localStorage.getItem("paseosJuanCreateRouteOpen") === "true";
  if (!isOpen) return "";

  const draft = getRouteDraft();
  const validation = validateRouteDraft(draft);
  const feedback = localStorage.getItem("paseosJuanCreateRouteFeedback");
  const selectedDogs = draft.order.map(getRouteDog).filter(Boolean);
  const isAccompanied = draft.routeType === "Ruta acompañada por supervisor";
  const sharedAssignments = getSharedAssignments();
  const sharedValidation = getSharedDistributionValidation(sharedAssignments);
  const walkerDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => sharedAssignments[dog.id] === "walker");
  const supervisorDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => sharedAssignments[dog.id] === "supervisor");

  return `
    <section class="route-modal-backdrop reveal">
      <div class="route-modal">
        <header class="route-modal-head">
          <div>
            <p class="walker-eyebrow">Nueva ruta de campo</p>
            <h2>Crear ruta</h2>
          </div>
          <button type="button" class="route-modal-close" data-close-create-route aria-label="Cerrar">${icon("x", "walker-button-icon")}</button>
        </header>

        <div class="route-form-grid">
          <label class="walker-field">Nombre de la ruta
            <input data-route-draft="name" value="${draft.name}" placeholder="Ruta A - Mapuche Norte" />
          </label>
          <label class="walker-field">Paseador responsable
            <select data-route-draft="walker">
              <option value="">Seleccionar paseador</option>
              <option ${draft.walker === "Sebastián" ? "selected" : ""}>Sebastián</option>
              <option ${draft.walker === "Bauti" ? "selected" : ""}>Bauti</option>
              <option ${draft.walker === "Nico supervisor / reemplazo de emergencia" ? "selected" : ""}>Nico supervisor / reemplazo de emergencia</option>
            </select>
          </label>
          <label class="walker-field">Tipo de ruta
            <select data-route-draft="routeType">
              <option ${draft.routeType === "Ruta normal" ? "selected" : ""}>Ruta normal</option>
              <option ${draft.routeType === "Ruta acompañada por supervisor" ? "selected" : ""}>Ruta acompañada por supervisor</option>
              <option ${draft.routeType === "Ruta cubierta por supervisor" ? "selected" : ""}>Ruta cubierta por supervisor</option>
            </select>
          </label>
          <label class="walker-field">Zona
            <select data-route-draft="zone">
              <option ${draft.zone === "Mapuche Norte" ? "selected" : ""}>Mapuche Norte</option>
              <option ${draft.zone === "Mapuche Sur" ? "selected" : ""}>Mapuche Sur</option>
              <option ${draft.zone === "Mapuche Centro" ? "selected" : ""}>Mapuche Centro</option>
              <option ${draft.zone === "Otra zona" ? "selected" : ""}>Otra zona</option>
            </select>
          </label>
          <label class="walker-field">Horario de inicio
            <input data-route-draft="start" value="${draft.start}" placeholder="15:00" />
          </label>
        </div>

        ${isAccompanied ? `
          <div class="route-accompanied-detail">
            <span><small>Paseador responsable</small><b>${draft.walker || "Sin seleccionar"}</b></span>
            <span><small>Supervisor acompañante</small><b>Nico</b></span>
            <span><small>Perros del paseador</small><b>${walkerDogs.map((dog) => dog.name).join(", ") || "Sin asignar"}</b></span>
            <span><small>Perros del supervisor</small><b>${supervisorDogs.map((dog) => dog.name).join(", ") || "Sin asignar"}</b></span>
            <span><small>Total máximo</small><b>${sharedValidation.total}/10 perros</b></span>
          </div>
        ` : ""}

        ${DogSelectionList(draft)}
        ${RouteOrderList(selectedDogs)}

        <label class="walker-field">Observaciones de ruta
          <textarea data-route-draft="notes" placeholder="Evitar motos cerca de Casa 18. Confirmar bozal de Forest.">${draft.notes}</textarea>
        </label>

        <div class="route-validation-list">
          ${validation.errors.map((message) => `<p class="walker-form-feedback is-warning">${message}</p>`).join("")}
          ${validation.warnings.map((message) => `<p class="walker-form-feedback is-warning">${message}</p>`).join("")}
          ${feedback ? `<p class="walker-form-feedback is-warning">${feedback}</p>` : ""}
        </div>

        <footer class="route-modal-actions">
          <button class="walker-secondary-button" type="button" data-close-create-route>Cancelar</button>
          <button class="walker-primary-button" type="button" data-create-route>Crear ruta</button>
        </footer>
      </div>
    </section>
  `;
}

function DogSelectionList(draft) {
  return `
    <section class="dog-selection-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Selección de perros</h3>
          <p>Elegí los perros de la ruta. Cada tarjeta muestra zona, ubicación, energía, riesgo y compatibilidad.</p>
        </div>
        <span>${draft.selectedDogIds.length} seleccionados</span>
      </div>
      <div class="route-dog-list">
        ${[...(getStore().dogs || []).map(d => ({id: d.id, name: d.name, zone: d.zone, location: "A asignar", energy: d.energy, risk: d.risk, compatibility: d.compatibility})), ...SUPERVISOR_ROUTE_DOGS].map((dog) => `
          <label class="route-dog-option ${draft.selectedDogIds.includes(dog.id) ? "is-selected" : ""}">
            <input data-route-dog="${dog.id}" type="checkbox" ${draft.selectedDogIds.includes(dog.id) ? "checked" : ""} />
            <span>${dog.name}</span>
            <small>${dog.zone} · ${dog.location} · Energía ${dog.energy} · Riesgo ${dog.risk}</small>
            <em>${dog.compatibility}</em>
          </label>
        `).join("")}
      </div>
    </section>
  `;
}

function RouteOrderList(selectedDogs) {
  return `
    <section class="route-order-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Orden de retiro</h3>
          <p>Orden sugerido según selección. Podés subir, bajar o quitar sin drag and drop.</p>
        </div>
      </div>
      <ol class="route-order-list">
        ${selectedDogs.length ? selectedDogs.map((dog, index) => `
          <li>
            <b>${index + 1}</b>
            <span><strong>${dog.name}</strong><small>${dog.location}</small></span>
            <div>
              <button type="button" data-dog-id="${dog.id}" data-route-order="up">Subir</button>
              <button type="button" data-dog-id="${dog.id}" data-route-order="down">Bajar</button>
              <button type="button" data-dog-id="${dog.id}" data-route-order="remove">Quitar</button>
            </div>
          </li>
        `).join("") : `<li class="empty-route-order">Seleccioná perros para ver el orden.</li>`}
      </ol>
    </section>
  `;
}

function CreatedRoutesBoard() {
  const routes = getCreatedRoutes();

  return `
    <section class="walker-section created-routes-board reveal">
      ${SupervisorSectionHeading("Rutas creadas", "Rutas armadas por supervisión y listas para confirmar o ajustar.")}
      ${routes.length ? `
        <div class="created-route-grid">
          ${routes.map((route) => CreatedRouteCard(route)).join("")}
        </div>
      ` : `
        <div class="empty-routes-state">
          <span>${icon("route")}</span>
          <div>
            <h3>Sin rutas creadas</h3>
            <p>Usá el botón principal + Crear ruta para asignar perros a un paseador.</p>
          </div>
          <button class="walker-primary-button" type="button" data-open-create-route>${icon("plus", "walker-button-icon")} Crear ruta</button>
        </div>
      `}
    </section>
  `;
}

function CreatedRouteCard(route) {
  const dogs = route.dogIds.map(getRouteDog).filter(Boolean);
  const riskAverage = getRouteRiskAverage(route.dogIds);

  return `
    <article class="created-route-card">
      <div class="created-route-head">
        <div>
          <small>${route.status}</small>
          <h3>${route.name}</h3>
        </div>
        <span class="risk-chip risk-${riskAverage.toLowerCase()}">${riskAverage}</span>
      </div>
      <div class="created-route-meta">
        <span><small>Responsable</small><b>${route.walker}</b></span>
        <span><small>Tipo</small><b>${route.routeType}</b></span>
        <span><small>Zona</small><b>${route.zone}</b></span>
        <span><small>Horario</small><b>${route.start}</b></span>
        <span><small>Perros</small><b>${dogs.length}/${route.routeType === "Ruta normal" ? "6" : route.routeType === "Ruta cubierta por supervisor" ? "7" : "10"}</b></span>
      </div>
      <ol class="created-route-dog-list">
        ${dogs.map((dog, index) => `<li><b>${index + 1}.</b> ${dog.name} — ${dog.location}</li>`).join("")}
      </ol>
      ${route.notes ? `<p class="created-route-notes">${route.notes}</p>` : ""}
      <div class="created-route-actions">
        <button class="walker-primary-button" type="button" data-route-confirm="${route.id}">Confirmar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-edit="${route.id}">Editar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-delete="${route.id}">Eliminar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-contact="${route.id}">Contactar paseador</button>
      </div>
    </article>
  `;
}

function SupervisorModeSelector() {
  const mode = localStorage.getItem("paseosJuanSupervisorMode") || "general";

  return `
    <section class="walker-panel companion-mode-panel reveal">
      ${WalkerPanelHeader("Acompañamiento de paseador", "Cuando un grupo requiere más control, el supervisor puede acompañar al paseador y encargarse de los perros más fuertes o conflictivos.", "users")}
      <div class="companion-mode-copy">
        <label class="walker-field">Modo del supervisor
          <select data-supervisor-mode>
            <option value="general" ${mode === "general" ? "selected" : ""}>Supervisión general de campo</option>
            <option value="companion" ${mode === "companion" ? "selected" : ""}>Acompañar a un paseador</option>
            <option value="cover" ${mode === "cover" ? "selected" : ""}>Cubrir ruta por ausencia</option>
          </select>
        </label>
        <div class="companion-rule-grid">
          <span><b>6</b><small>Paseador solo</small></span>
          <span><b>7</b><small>Supervisor cubriendo emergencia</small></span>
          <span><b>10</b><small>Equipo acompañado</small></span>
          <span><b>4</b><small>Perros bajo supervisor</small></span>
        </div>
      </div>
      ${mode === "companion" ? WalkerCompanionMode() : SupervisorModeEmptyState(mode)}
    </section>
  `;
}

function SupervisorModeEmptyState(mode) {
  const isCover = mode === "cover";

  return `
    <div class="companion-empty-state">
      <span>${icon(isCover ? "route" : "shieldCheck")}</span>
      <div>
        <h3>${isCover ? "Ruta cubierta por supervisor" : "Supervisión general activa"}</h3>
        <p>
          ${isCover
            ? "En ausencia de paseador, el supervisor puede cubrir una ruta de emergencia con máximo 7 perros."
            : "Usá este modo para monitorear paseadores, grupos, alertas, retiros y entregas desde el centro de control."
          }
        </p>
      </div>
      <button class="walker-primary-button" type="button" data-companion-activate>Activar acompañamiento</button>
    </div>
  `;
}

function WalkerCompanionMode() {
  const walker = localStorage.getItem("paseosJuanCompanionWalker") || "Sebastián";
  const route = localStorage.getItem("paseosJuanCompanionRoute") || "Ruta A";
  const assignments = getSharedAssignments();
  const validation = getSharedDistributionValidation(assignments);
  const feedback = localStorage.getItem("paseosJuanCompanionFeedback");

  return `
    <div class="companion-config-grid">
      <label class="walker-field">Seleccionar paseador acompañado
        <select data-companion-walker>
          <option ${walker === "Sebastián" ? "selected" : ""}>Sebastián</option>
          <option ${walker === "Bauti" ? "selected" : ""}>Bauti</option>
        </select>
      </label>
      <label class="walker-field">Seleccionar ruta
        <select data-companion-route>
          <option ${route === "Ruta A" ? "selected" : ""}>Ruta A</option>
          <option ${route === "Ruta B" ? "selected" : ""}>Ruta B</option>
        </select>
      </label>
    </div>
    ${SharedDogDistribution(walker, route, assignments, validation)}
    ${ConflictDogAssignment(assignments)}
    ${SharedRouteSummary(walker, assignments, validation)}
    ${CompanionRoutePreview(walker, assignments, validation)}
    <div class="companion-action-row">
      <button class="walker-primary-button" type="button" data-companion-suggest>${icon("navigation", "walker-button-icon")} Sugerir distribución</button>
      <button class="walker-secondary-button" type="button" data-companion-confirm>Confirmar distribución compartida</button>
      <button class="walker-secondary-button" type="button" data-companion-sensitive>Reasignar perros sensibles</button>
      <button class="walker-secondary-button" type="button" data-companion-sensitive>Pasar perros conflictivos al supervisor</button>
      <button class="walker-secondary-button" type="button" data-companion-contact>Contactar paseador</button>
    </div>
    ${feedback ? `<p class="walker-form-feedback ${validation.errors.length ? "is-warning" : "is-success"}">${feedback}</p>` : ""}
  `;
}

function SharedDogDistribution(walker, route, assignments, validation) {
  const walkerDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "walker");
  const supervisorDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "supervisor");

  return `
    <section class="shared-distribution">
      <div class="shared-distribution-head">
        <div>
          <h3>Distribución operativa · ${route}</h3>
          <p>El supervisor acompaña sin reemplazar al paseador y toma control de los perros más delicados.</p>
        </div>
        <span>Total del equipo: <b>${validation.total}/10 perros</b></span>
      </div>
      <div class="shared-columns">
        ${SharedHandlerColumn("Paseador", walker, "Perros bajo manejo del paseador", `${validation.counts.walker}/6 perros`, walkerDogs)}
        ${SharedHandlerColumn("Supervisor", "Nico", "Perros de mayor control", `${validation.counts.supervisor}/4 perros`, supervisorDogs)}
      </div>
      ${DistributionMessages(validation)}
    </section>
  `;
}

function SharedHandlerColumn(role, name, text, capacity, dogs) {
  return `
    <article class="shared-handler-card">
      <small>${role}</small>
      <h3>${name}</h3>
      <p>${text}</p>
      <span class="shared-capacity">${capacity}</span>
      <div class="shared-assigned-list">
        ${dogs.length ? dogs.map((dog) => SharedAssignedDog(dog)).join("") : `<em>Sin perros asignados</em>`}
      </div>
    </article>
  `;
}

function SharedAssignedDog(dog) {
  return `
    <div>
      <strong>${dog.name}</strong>
      <span class="risk-chip risk-${dog.risk.toLowerCase()}">${dog.risk}</span>
    </div>
  `;
}

function ConflictDogAssignment(assignments) {
  return `
    <section class="conflict-assignment">
      <div class="shared-distribution-head">
        <div>
          <h3>Asignación de perros</h3>
          <p>Los perros de riesgo medio, energía alta, bozal o carácter fuerte deben priorizar manejo del supervisor.</p>
        </div>
      </div>
      <div class="conflict-dog-grid">
        ${SUPERVISOR_SHARED_DOGS.map((dog) => {
          const assignment = assignments[dog.id];
          const needsReview = dog.recommended === "Supervisor" && assignment === "walker";
          return `
            <article class="conflict-dog-card ${needsReview ? "needs-review" : ""}">
              <div class="conflict-dog-head">
                <div>
                  <small>Manejo recomendado: ${dog.recommended}</small>
                  <h4>${dog.name}</h4>
                </div>
                <span class="risk-chip risk-${dog.risk.toLowerCase()}">${dog.risk}</span>
              </div>
              <div class="dog-chip-row">
                <span>Energía ${dog.energy}</span>
                <span>${assignment === "walker" ? "Asignado a paseador" : assignment === "supervisor" ? "Asignado a supervisor" : "Sin asignar"}</span>
              </div>
              ${dog.reason ? `<p>${dog.reason}</p>` : `<p>Perfil apto para manejo operativo estándar.</p>`}
              ${needsReview ? `<p class="assignment-warning">Este perro requiere revisión. Se recomienda manejo del supervisor.</p>` : ""}
              <div class="assignment-button-row">
                <button type="button" data-dog-id="${dog.id}" data-shared-assign="walker">Paseador</button>
                <button type="button" data-dog-id="${dog.id}" data-shared-assign="supervisor">Supervisor</button>
                <button type="button" data-dog-id="${dog.id}" data-shared-assign="unassigned">Sin asignar</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function SharedRouteSummary(walker, assignments, validation) {
  const supervisorDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "supervisor");

  return `
    <section class="shared-route-summary">
      <div>
        <p class="walker-eyebrow">Distribución compartida</p>
        <h3>Equipo acompañado</h3>
      </div>
      <div class="closure-metrics">
        <span><small>Paseador</small><strong>${walker} — ${validation.counts.walker}/6 perros</strong></span>
        <span><small>Supervisor</small><strong>Nico — ${validation.counts.supervisor}/4 perros</strong></span>
        <span><small>Total</small><strong>${validation.total}/10 perros</strong></span>
      </div>
      <div class="supervisor-controlled-dogs">
        <strong>Perros bajo control del supervisor</strong>
        <p>${supervisorDogs.length ? supervisorDogs.map((dog) => dog.name).join(", ") : "Sin perros asignados al supervisor."}</p>
        <small>Motivo: Perros con mayor energía, riesgo medio, bozal o carácter fuerte.</small>
      </div>
    </section>
  `;
}

function CompanionRoutePreview(walker, assignments, validation) {
  const routeType = localStorage.getItem("paseosJuanCreateRouteType") || "Ruta normal";
  const isAccompanied = routeType === "Ruta acompañada por supervisor";
  const walkerDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "walker");
  const supervisorDogs = SUPERVISOR_SHARED_DOGS.filter((dog) => assignments[dog.id] === "supervisor");

  return `
    <section class="create-route-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Crear ruta</h3>
          <p>Configuración demo para rutas normales, acompañadas o cubiertas por supervisor.</p>
        </div>
      </div>
      <label class="walker-field">Tipo de ruta
        <select data-create-route-type>
          <option ${routeType === "Ruta normal" ? "selected" : ""}>Ruta normal</option>
          <option ${routeType === "Ruta acompañada por supervisor" ? "selected" : ""}>Ruta acompañada por supervisor</option>
          <option ${routeType === "Ruta cubierta por supervisor" ? "selected" : ""}>Ruta cubierta por supervisor</option>
        </select>
      </label>
      ${isAccompanied ? `
        <div class="create-route-detail-grid">
          <span><small>Paseador responsable</small><b>${walker}</b></span>
          <span><small>Supervisor acompañante</small><b>Nico</b></span>
          <span><small>Perros del paseador</small><b>${walkerDogs.map((dog) => dog.name).join(", ") || "Sin asignar"}</b></span>
          <span><small>Perros del supervisor</small><b>${supervisorDogs.map((dog) => dog.name).join(", ") || "Sin asignar"}</b></span>
          <span><small>Total máximo</small><b>${validation.total}/10 perros</b></span>
        </div>
      ` : ""}
    </section>
  `;
}

function DistributionMessages(validation) {
  const messages = [...validation.errors, ...validation.warnings];
  if (!messages.length) {
    return `<p class="walker-form-feedback is-success">Distribución dentro de los límites operativos.</p>`;
  }

  return `
    <div class="distribution-messages">
      ${messages.map((message) => `<p class="walker-form-feedback is-warning">${message}</p>`).join("")}
    </div>
  `;
}

function ActiveWalkers() {
  return `
    <section class="walker-section reveal">
      ${SupervisorSectionHeading("Paseadores activos", "Seguimiento del equipo en operación.")}
      <div class="supervisor-walker-grid">
        ${SUPERVISOR_WALKERS.map((walker) => {
          const assignedRoute = getAssignedRouteForWalker(walker.name);
          return `
            <article class="supervisor-walker-card">
              <div class="assigned-dog-head">
                <div>
                  <small>${walker.role}</small>
                  <h3>${walker.name}</h3>
                </div>
                <span class="dog-status-icon">${icon("userCheck")}</span>
              </div>
              <div class="supervisor-detail-grid">
                <span><small>Ruta asignada</small><b>${assignedRoute?.name || walker.group}</b></span>
                <span><small>Horario</small><b>${assignedRoute?.start || walker.schedule}</b></span>
                <span><small>Estado</small><b>${assignedRoute?.status || walker.status}</b></span>
                <span><small>Perros asignados</small><b>${assignedRoute?.dogIds?.length || walker.dogs}</b></span>
              </div>
              <div class="dog-card-actions">
                <button class="walker-secondary-button" type="button">Ver grupo</button>
                <button class="walker-secondary-button" type="button" data-walker-message="${walker.name}">Enviar mensaje</button>
                <button class="walker-secondary-button" type="button" data-walker-delay="${walker.name}">Reportar demora</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function SupervisorGroups() {
  return `
    <section class="walker-section reveal">
      ${SupervisorSectionHeading("Grupos asignados", "Distribución de perros por paseador y nivel de riesgo.")}
      <div class="supervisor-group-grid">
        ${SUPERVISOR_GROUPS.map((group) => `
          <article class="supervisor-group-card">
            <div class="supervisor-group-head">
              <span>${icon("route")}</span>
              <div>
                <small>${group.name} — ${group.walker}</small>
                <h3>${group.dogs.length} perros asignados</h3>
              </div>
            </div>
            <div class="route-stats">
              <span>Riesgo promedio: <b>${group.averageRisk}</b></span>
              <span>Estado: <b>${group.status}</b></span>
            </div>
            <div class="compact-dog-list">
              ${group.dogs.map(([name, risk]) => `
                <div>
                  <strong>${name}</strong>
                  <span class="risk-chip risk-${risk.toLowerCase()}">${risk}</span>
                </div>
              `).join("")}
            </div>
            <button class="walker-primary-button" type="button">${icon("eye", "walker-button-icon")} Revisar grupo</button>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function PickupDeliveryControl() {
  const statuses = getStoredObject("paseosJuanPickupStatuses");
  return `
    <section class="walker-panel supervisor-control-panel reveal">
      ${WalkerPanelHeader("Control de retiros y entregas", "Validá que cada perro sea retirado y entregado correctamente.", "clipboardCheck")}
      <div class="pickup-list">
        ${SUPERVISOR_PICKUPS.map((item) => {
          const status = statuses[item.id] || item.status;
          return `
            <article class="pickup-row">
              <div><small>Perro</small><strong>${item.dog}</strong></div>
              <div><small>Ubicación</small><span>${item.location}</span></div>
              <div><small>Paseador</small><span>${item.walker}</span></div>
              <div><small>Estado</small><span class="status-chip">${status}</span></div>
              <div><small>Hora estimada</small><span>${item.eta}</span></div>
              <div class="pickup-actions">
                <button type="button" data-pickup-id="${item.id}" data-pickup-action="Retirado">Marcar retirado</button>
                <button type="button" data-pickup-id="${item.id}" data-pickup-action="Entregado">Marcar entregado</button>
                <button type="button">${icon("eye", "walker-button-icon")} Ver detalle</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function RiskAlerts() {
  const reviewed = getStoredArray("paseosJuanReviewedAlerts");
  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Alertas operativas", "Situaciones que requieren atención del supervisor.", "alertTriangle")}
      <div class="risk-alert-list">
        ${SupervisorAlertData().map((alert) => {
          const isReviewed = reviewed.includes(alert.id);
          return `
            <article class="risk-alert-card risk-${alert.level.toLowerCase()} ${isReviewed ? "is-reviewed" : ""}">
              <div>
                <small>${alert.type}</small>
                <h3>${alert.dog}</h3>
              </div>
              <span class="risk-chip risk-${alert.level.toLowerCase()}">${isReviewed ? "Revisada" : alert.level}</span>
              <p>${alert.description}</p>
              <div class="dog-card-actions">
                <button class="walker-secondary-button" type="button" data-alert-reviewed="${alert.id}">Marcar revisada</button>
                <button class="walker-secondary-button" type="button" data-alert-notify="${alert.dog}">Notificar paseador</button>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `;
}

function SupervisorChecklist() {
  const checked = getStoredArray("paseosJuanSupervisorChecklist");
  const feedback = localStorage.getItem("paseosJuanSupervisorChecklistFeedback");
  const confirmed = localStorage.getItem("paseosJuanSupervisorChecklistConfirmed") === "true";
  const showDetails = localStorage.getItem("paseosJuanSupervisorChecklistDetails") !== "false";

  if (confirmed && !showDetails) {
    return `
      <section class="walker-panel reveal" style="background: #13291c; border: 1px solid rgba(31, 143, 90, 0.45);">
        <header class="walker-panel-head">
          <span style="color: rgba(31, 143, 90, 1);">${icon("checkCircle")}</span>
          <div>
            <h2 style="color: #f4f1e8;">Supervisión confirmada</h2>
            <p style="color: #9ca39d;">Todos los puntos críticos fueron revisados antes de iniciar la operación.</p>
          </div>
        </header>
        <div style="color: #9ca39d; margin-top: -10px; margin-bottom: 20px; font-size: 0.9rem;">
          <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
            <li>Paseadores presentes</li>
            <li>Rutas verificadas</li>
            <li>Equipamiento confirmado</li>
            <li>Comunicación activa</li>
          </ul>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="walker-secondary-button" style="border-radius: 9999px; padding: 4px 16px; font-size: 0.85rem; min-height: 36px; border-color: rgba(31, 143, 90, 0.45); color: #f4f1e8;" type="button" data-supervisor-checklist-view>Ver checklist</button>
          <button class="walker-secondary-button" style="border-radius: 9999px; padding: 4px 16px; font-size: 0.85rem; min-height: 36px; border-color: rgba(31, 143, 90, 0.45); color: #f4f1e8;" type="button" data-supervisor-checklist-edit>Editar revisión</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Checklist de supervisión", "Confirmaciones mínimas antes y durante la operación.", "clipboardCheck")}
      <div class="tactical-checklist">
        ${SUPERVISOR_CHECKLIST.map((item) => `
          <label class="tactical-check ${checked.includes(item) ? "is-checked" : ""}">
            <input data-supervisor-checklist-item="${item}" type="checkbox" ${checked.includes(item) ? "checked" : ""} />
            <span>${icon("checkCircle")}</span>
            ${item}
          </label>
        `).join("")}
      </div>
      <button class="walker-primary-button" type="button" data-supervisor-checklist-confirm>Confirmar supervisión</button>
      ${feedback ? `<p class="walker-form-feedback ${confirmed ? "is-success" : "is-warning"}">${feedback}</p>` : ""}
    </section>
  `;
}

function TeamCommunication() {
  const feedback = localStorage.getItem("paseosJuanSupervisorMessageFeedback");
  const draft = localStorage.getItem("paseosJuanSupervisorDraft") || "";
  const quickMessages = ["Avisar cambio de ruta", "Reforzar control", "Confirmar retiro", "Solicitar foto", "Contactar coordinación"];

  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Comunicación con equipo", "Enviá mensajes rápidos a paseadores o coordinación.", "message")}
      <label class="walker-field">Destinatario
        <select>
          <option>Sebastián</option>
          <option>Bauti</option>
          <option>Todos los paseadores</option>
          <option>Coordinador</option>
        </select>
      </label>
      <div class="quick-command-grid">
        ${quickMessages.map((message) => `
          <button type="button" data-supervisor-quick-message="${message}">
            ${icon("send", "walker-button-icon")}
            ${message}
          </button>
        `).join("")}
      </div>
      <label class="walker-field">Mensaje
        <textarea placeholder="Escribí una instrucción operativa...">${draft}</textarea>
      </label>
      <button class="walker-primary-button" type="button" data-supervisor-send-message>Enviar mensaje</button>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function ReceivedReports() {
  const statuses = getStoredObject("paseosJuanSupervisorReportStatuses");
  return `
    <section class="walker-panel reveal">
      ${WalkerPanelHeader("Reportes recibidos", "Incidentes o novedades enviadas por paseadores.", "fileText")}
      <div class="received-report-list">
        ${SUPERVISOR_REPORTS.map((report) => `
          <article class="received-report-card">
            <div>
              <small>${report.walker} · ${report.dog}</small>
              <h3>${report.type}</h3>
            </div>
            <span class="risk-chip risk-${report.level.toLowerCase()}">${report.level}</span>
            <p>${report.description}</p>
            <small>Estado: ${statuses[report.id] || report.status}</small>
            <div class="dog-card-actions">
              <button class="walker-secondary-button" type="button" data-report-id="${report.id}" data-report-action="Revisado">${icon("eye", "walker-button-icon")} Revisar</button>
              <button class="walker-secondary-button" type="button" data-report-id="${report.id}" data-report-action="Archivado">${icon("archive", "walker-button-icon")} Archivar</button>
              <button class="walker-secondary-button" type="button" data-walker-message="${report.walker}">Contactar paseador</button>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function ShiftClosure() {
  const feedback = localStorage.getItem("paseosJuanSupervisorClosureFeedback");
  const closureItems = [
    "Todos los perros entregados",
    "Reportes revisados",
    "Material cargado",
    "Paseadores confirmados",
    "Clientes notificados si corresponde",
  ];

  return `
    <section class="walker-panel supervisor-closure-panel reveal">
      ${WalkerPanelHeader("Cierre de jornada", "Resumen operativo antes de finalizar el turno.", "flag")}
      <div class="closure-metrics">
        ${[
          ["Perros paseados", "12"],
          ["Grupos completados", "2"],
          ["Incidentes abiertos", "1"],
          ["Material pendiente", "2"],
          ["Estado general", "Estable"],
        ].map(([label, value]) => `<span><small>${label}</small><strong>${value}</strong></span>`).join("")}
      </div>
      <div class="closure-checklist">
        ${closureItems.map((item) => `<span>${icon("checkCircle", "walker-button-icon")} ${item}</span>`).join("")}
      </div>
      <button class="walker-primary-button" type="button" data-closure-confirm>Cerrar jornada</button>
      ${feedback ? `<p class="walker-form-feedback is-success">${feedback}</p>` : ""}
    </section>
  `;
}

function SupervisorAlertData() {
  const extraAlert = localStorage.getItem("paseosJuanSupervisorExtraAlert") === "true"
    ? [{
        id: "demo-extra",
        dog: "Caipi",
        type: "Control inicial",
        level: "Medio",
        description: "Nueva alerta demo creada para revisar al iniciar el grupo.",
      }]
    : [];

  return [...SUPERVISOR_ALERTS, ...extraAlert];
}

function SupervisorSectionHeading(title, text) {
  return `
    <div class="walker-section-heading">
      <p class="walker-eyebrow">Centro de control</p>
      <h2>${title}</h2>
      <p>${text}</p>
    </div>
  `;
}

function VaccinationUploadCard() {
  const vaccineDocument = getVaccineDocument();
  const hasFile = Boolean(vaccineDocument.fileName);

  return `
    <section class="panel vaccination-card">
      <div class="vaccination-copy">
        <span class="document-icon">${icon(hasFile ? "fileCheck" : "uploadCloud")}</span>
        <div>
          <p class="eyebrow">Documentación del perro</p>
          <h3>Vacunas y documentación</h3>
          <p>
            Subí una foto o PDF del carnet de vacunas para mantener la información del perro
            actualizada.
          </p>
        </div>
      </div>
      <div class="vaccination-upload-box">
        <input id="vaccine-file" data-vaccine-file type="file" accept=".jpg,.jpeg,.png,.pdf" />
        <label for="vaccine-file">
          ${icon("fileUp")}
          <strong>${hasFile ? "Cambiar archivo" : "Subir documentación"}</strong>
          <small>Formatos permitidos: JPG, PNG o PDF.</small>
        </label>
      </div>
      <div class="vaccination-status">
        <span>
          <small>Estado de revisión</small>
          <strong>${vaccineDocument.status}</strong>
        </span>
        <span>
          <small>Archivo cargado</small>
          <strong>${hasFile ? vaccineDocument.fileName : "Sin archivo cargado"}</strong>
        </span>
      </div>
    </section>
  `;
}

function ProductBenefits() {
  return `
    <section class="client-benefits">
      <div class="client-benefits-heading">
        <p class="eyebrow">Beneficios de ser parte de Paseos Juan</p>
        <h3>Productos recomendados para tu perro</h3>
        <p>
          Equipamiento y productos seleccionados para mejorar la seguridad, la rutina y la
          experiencia del paseo.
        </p>
      </div>
      <div class="product-benefit-grid">
        ${PRODUCTS.map((product) => `
          <article class="product-benefit-card">
            <span class="product-icon">${icon(product.icon)}</span>
            <small>${product.tag}</small>
            <h4>${product.name}</h4>
            <p>${product.description}</p>
            <strong>${product.price}</strong>
            <button class="secondary-button" type="button">Consultar producto</button>
          </article>
        `).join("")}
      </div>
      <p class="product-benefit-note">
        Los productos recomendados pueden variar según tamaño, conducta y necesidades de cada perro.
      </p>
    </section>
  `;
}

function SharedChatPanel(role, title, subtitle) {
  const conversations = getChatConversations();
  conversations.sort((a, b) => b.lastUpdated - a.lastUpdated);

  const activeChatId = localStorage.getItem("paseosJuanActiveChat") || conversations[0]?.id;
  const activeChat = conversations.find(c => c.id === activeChatId);
  const canReply = canReplyToClient(role);

  let quickActions = [];
  if (role === "coordinador") {
    quickActions = ["Pedir carnet de vacunas", "Enviar alias de pago", "Pedir comprobante", "Coordinar evaluación", "Enviar planes", "Derivar al supervisor"];
  } else if (role === "supervisor") {
    quickActions = ["Avisar demora", "Confirmar retiro", "Confirmar entrega", "Consultar cambio de conducta", "Avisar situación de campo"];
  }

  const senderName = role === "coordinador" ? "Coordinador" : role === "supervisor" ? "Nico (Supervisor)" : "Paseador";
  const bgClass = role === "supervisor" || role === "paseador" ? "dark-panel" : "";

  return `
    <section class="shared-chat-panel reveal ${bgClass}">
      <header class="chat-panel-header">
        <div>
          <h2>${title}</h2>
          <p>${subtitle}</p>
        </div>
      </header>
      <div class="chat-panel-layout">
        <aside class="chat-conversations-list">
          ${conversations.map(c => `
            <button class="chat-conversation-item ${c.id === activeChatId ? 'is-active' : ''}" data-chat-select="${c.id}">
              <strong>${c.clientName}</strong>
              <small>${c.dogs.join(", ")}</small>
              <em>${c.status}</em>
            </button>
          `).join("")}
        </aside>
        
        ${activeChat ? `
          <div class="chat-active-window">
            <div class="chat-active-header">
              <strong>${activeChat.clientName} · ${activeChat.dogs.join(", ")}</strong>
              <span class="status-pill">${activeChat.status}</span>
            </div>
            
            <div class="chat-messages-area">
              ${activeChat.messages.map(m => `
                <div class="chat-message-bubble ${m.senderRole === role ? 'is-mine' : 'is-other'}">
                  <div class="chat-message-meta">
                    <b>${m.senderName}</b>
                    <time>${m.timestamp}</time>
                  </div>
                  <div class="chat-message-text">${m.text}</div>
                </div>
              `).join("")}
            </div>

            ${canReply ? `
              <div class="chat-input-area">
                <div class="chat-quick-actions-row">
                  ${quickActions.map(action => `
                    <button class="chat-quick-pill" type="button" data-chat-quick-shared="${action}" data-chat-role="${role}" data-chat-sender="${senderName}" data-chat-conversation="${activeChat.id}">
                      ${action}
                    </button>
                  `).join("")}
                </div>
                <div class="chat-compose-row">
                  <input type="text" placeholder="Escribir mensaje..." data-chat-input-shared="${activeChat.id}" />
                  <button class="primary-button" type="button" data-chat-send-shared="${activeChat.id}" data-chat-role="${role}" data-chat-sender="${senderName}">
                    Enviar
                  </button>
                </div>
              </div>
            ` : `
              <div class="chat-readonly-banner">
                <p>Solo lectura. Los mensajes al cliente los responde coordinación o supervisión.</p>
              </div>
            `}
          </div>
        ` : `
          <div class="chat-empty-state">
            <p>Seleccioná una conversación para ver los mensajes.</p>
          </div>
        `}
      </div>
    </section>
  `;
}

function FloatingClientChat() {
  const conversations = getChatConversations();
  const demoClient = getDemoClient();
  const clientName = demoClient?.name?.split(" ")[0] || "Martín";
  // Default to Martín's conversation for demo purposes
  const myChat = conversations.find(c => c.id === "conv-martin-bruno") || conversations[1];
  
  const draft = localStorage.getItem("paseosJuanChatDraft") || "";
  
  const quickActions = [
    "Avisar cambio de conducta",
    "Consultar pago",
    "Consultar próximo paseo",
    "Subir comprobante",
    "Subir carnet de vacunas"
  ];

  return `
    <aside class="floating-chat ${chatOpen ? "is-open" : ""}" aria-live="polite">
      <div class="chat-window">
        <div class="chat-head">
          <span class="chat-head-icon">${icon("message")}</span>
          <span>
            <strong>Paseos Juan</strong>
            <small>Consultas sobre paseos, pagos o cambios de conducta.</small>
          </span>
          <button type="button" data-chat-close aria-label="Cerrar chat">${icon("x")}</button>
        </div>
        <div class="chat-messages-area floating-chat-messages">
          <div class="chat-message-bubble is-other">
            <div class="chat-message-meta"><b>Soporte</b></div>
            <div class="chat-message-text">Hola, ¿en qué podemos ayudarte hoy?</div>
          </div>
          ${myChat.messages.map(m => `
            <div class="chat-message-bubble ${m.senderRole === 'cliente' ? 'is-mine' : 'is-other'}">
              <div class="chat-message-meta">
                <b>${m.senderName}</b>
                <time>${m.timestamp}</time>
              </div>
              <div class="chat-message-text">${m.text}</div>
            </div>
          `).join("")}
        </div>
        <div class="chat-quick-actions">
          ${quickActions.map(action => `
            <button type="button" data-chat-quick-shared="${action}" data-chat-role="cliente" data-chat-sender="${clientName}" data-chat-conversation="${myChat.id}">
              ${icon("alertCircle")} ${action}
            </button>
          `).join("")}
        </div>
        <div class="chat-compose">
          <textarea data-chat-input-shared="${myChat.id}" placeholder="Escribí tu consulta..."></textarea>
          <button class="primary-button" type="button" data-chat-send-shared="${myChat.id}" data-chat-role="cliente" data-chat-sender="${clientName}">
            ${icon("send")} Enviar
          </button>
        </div>
      </div>
      <button class="chat-bubble" type="button" data-chat-toggle>
        ${icon("message")}
        <span>Ayuda</span>
      </button>
    </aside>
  `;
}

function priceCard(plan) {
  return `
    <article class="price-card">
      <strong>${plan.name}</strong>
      <small>${plan.walks}</small>
      <div class="plan-price-list">
        ${PLAN_SIZES.map((size, index) => `
          <div>
            <span>${size}</span>
            <b>${plan.prices[index]}</b>
          </div>
        `).join("")}
      </div>
      <button class="ghost-button" type="button">Contratar</button>
    </article>
  `;
}

function compactPlanCard(plan) {
  return `
    <article class="compact-plan-card">
      <span>
        <strong>${plan.name}</strong>
        <small>${plan.walks}</small>
      </span>
      <b>${plan.prices[0]} - ${plan.prices[2]}</b>
    </article>
  `;
}

function faqItem(question, answer) {
  return `
    <details>
      <summary>${question}</summary>
      <p>${answer}</p>
    </details>
  `;
}

function dogCard(dog, operational = false) {
  return `
    <article class="dog-card">
      <div class="dog-card-header">
        <span class="dog-avatar">${dog.name.slice(0, 1)}</span>
        <span>
          <strong>${dog.name}</strong>
          <small>${dog.breed} · ${dog.age}</small>
        </span>
      </div>
      <dl>
        <div><dt>Conducta</dt><dd>${dog.behavior}</dd></div>
        <div><dt>Energia</dt><dd>${dog.energy}</dd></div>
        <div><dt>Riesgo</dt><dd><span class="risk ${dog.risk.toLowerCase()}">${dog.risk}</span></dd></div>
        <div><dt>Compatibilidad</dt><dd>${dog.compatibility}</dd></div>
        <div><dt>Observaciones</dt><dd>${dog.observations}</dd></div>
        ${operational ? "" : `
          <div><dt>Veterinario</dt><dd>${dog.vet}</dd></div>
          <div><dt>Vacunas</dt><dd>${dog.vaccines}</dd></div>
        `}
      </dl>
    </article>
  `;
}

function metric(label, value) {
  return `
    <div class="metric-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function summaryPanel(title, value, helper) {
  return `
    <article class="panel">
      <h3>${title}</h3>
      <strong class="metric">${value}</strong>
      <small>${helper}</small>
    </article>
  `;
}

function walkRow(walk) {
  return `
    <div class="list-row">
      <span>
        <strong>${walk.time} · ${walk.zone}</strong>
        <small>${walk.dogs.join(", ")} · Paseador: ${walk.walker}</small>
      </span>
      <span class="status-pill">${walk.status}</span>
    </div>
  `;
}

function notFoundPage() {
  return shell(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">404</p>
        <h1>Ruta no encontrada</h1>
        <p>Volver a la landing pública o entrar a un dashboard por rol.</p>
        <a class="primary-button" href="/" data-link>Ir al inicio</a>
      </section>
    </main>
  `);
}

render();


function GlobalModal() {
  const modalStr = localStorage.getItem("paseosJuanActiveModal");
  if (!modalStr) return "";
  const { type, data } = JSON.parse(modalStr);

  let html = "";
  switch(type) {
    case 'admin-reports': html = "<h3>Reportes operativos</h3><p>Reportes filtrables. (Demo)</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-users': html = "<h3>Usuarios y permisos</h3><p>Gestionar usuarios demo.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-prices': html = "<h3>Precios y planes</h3><p>Editar precios y descuentos.</p><button class='primary-button' data-modal-action='save-prices'>Guardar cambios</button> <button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-alerts': html = "<h3>Alertas críticas</h3><p>Resolver alertas operativas.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-client': html = "<h3>Ficha del cliente</h3><p>Detalle demo del cliente.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-audit': html = "<h3>Auditoría</h3><p>Auditoría de cambios y chats.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'admin-settings': html = "<h3>Configuración del sistema</h3><p>Opciones generales demo.</p><button data-modal-action='close'>Cerrar</button>"; break;
    case 'client-pay': html = "<h3>Pago online (Demo)</h3><p>Alias: dejandohuellas.plan</p><label>Subir comprobante <input type='file' accept='image/*,.pdf' /></label><button class='primary-button' data-modal-action='confirm-pay'>Enviar comprobante</button> <button data-modal-action='close'>Cerrar</button>"; break;
    default: html = "<h3>Modal</h3><button data-modal-action='close'>Cerrar</button>";
  }

  return `
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal-content panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width: 90%; max-width: 500px;">
        ${html}
      </div>
    </div>
  `;
}

function GlobalToast() {
  const toastStr = localStorage.getItem("paseosJuanToast");
  if (!toastStr) return "";
  const toast = JSON.parse(toastStr);
  // Auto close toast is handled by a side effect or setTimeout, but for a render-driven app,
  // we can use a setTimeout here to clear it.
  setTimeout(() => {
    if (localStorage.getItem("paseosJuanToast")) {
      localStorage.removeItem("paseosJuanToast");
      window.dispatchEvent(new Event("paseosJuanStoreUpdate"));
    }
  }, 3000);
  
  return `
    <div class="toast is-${toast.type}" style="position:fixed; bottom: 20px; right: 20px; z-index: 10000; padding: 12px 24px; background: ${toast.type === 'error' ? '#ef4444' : '#10b981'}; color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      ${toast.message}
    </div>
  `;
}

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-modal-action]");
  if (action) {
    if (action.dataset.modalAction === 'close') {
      closeModal();
    }
    if (action.dataset.modalAction === 'confirm-pay') {
      const store = getStore();
      const clientId = 'sol'; // Demo forced to 'Sol' or just add to alerts
      store.alerts = [{ id: 'alert-'+Date.now(), dog: 'Pago cliente', type: 'Pago por confirmar', level: 'Medio', description: 'Cliente subió comprobante.' }, ...(store.alerts || [])];
      saveStore(store);
      showToast('Comprobante enviado. Estado: Pago por confirmar.');
      closeModal();
    }
    if (action.dataset.modalAction === 'save-prices') {
      showToast("Precios actualizados correctamente.");
      closeModal();
    }
    return;
  }

  if (event.target.closest("[data-modal-backdrop]") && event.target === event.target.closest("[data-modal-backdrop]")) {
    closeModal();
    return;
  }


  const clientAction = event.target.closest("[data-client-action]");
  if (clientAction) {
    if (clientAction.dataset.clientAction === "pay-online") {
      openModal('client-pay');
    }
  }

  const adminAction = event.target.closest("[data-admin-action]");
  if (adminAction) {
    const act = adminAction.dataset.adminAction;
    if (act === 'reports') openModal('admin-reports');
    if (act === 'users') openModal('admin-users');
    if (act === 'prices') openModal('admin-prices');
    if (act === 'alerts') openModal('admin-alerts');
    if (act === 'user-change-role') { showToast("Rol actualizado (Demo)"); }
    if (act === 'user-toggle') { showToast("Usuario activado/desactivado (Demo)", "warning"); }
    if (act === 'user-permissions') openModal('admin-users');
    if (act === 'edit-plan') openModal('admin-prices');
    if (act === 'view-client') openModal('admin-client');
    if (act === 'audit-client') openModal('admin-audit');
    if (act === 'settings') openModal('admin-settings');
    if (act === 'review-alert') { showToast("Alerta resuelta."); }
    return;
  }
});
