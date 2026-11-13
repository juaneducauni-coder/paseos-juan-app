// Conversaciones de ejemplo para la demo del chat. Sin datos reales de clientes.
export const initialConversations = [
  {
    id: "conv-laura-kiara",
    clientName: "Tutor de ejemplo 1",
    dogs: ["Perro de ejemplo 1"],
    status: "Abierto",
    lastUpdated: Date.now() - 100000,
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-laura-kiara",
        senderRole: "cliente",
        senderName: "Tutor de ejemplo 1",
        text: "¿Mañana hay paseo?",
        timestamp: "10:30",
        read: false,
        type: "normal"
      }
    ]
  },
  {
    id: "conv-martin-bruno",
    clientName: "Tutor de ejemplo 2",
    dogs: ["Perro de ejemplo 2"],
    status: "Documentación pendiente",
    lastUpdated: Date.now() - 200000,
    messages: [
      {
        id: "msg-2",
        conversationId: "conv-martin-bruno",
        senderRole: "cliente",
        senderName: "Tutor de ejemplo 2",
        text: "Ya subí el carnet de vacunas.",
        timestamp: "10:15",
        read: true,
        type: "normal"
      },
      {
        id: "msg-3",
        conversationId: "conv-martin-bruno",
        senderRole: "coordinador",
        senderName: "Coordinador",
        text: "Perfecto, lo revisamos y te avisamos si falta algo.",
        timestamp: "10:18",
        read: true,
        type: "normal"
      }
    ]
  },
  {
    id: "conv-sol-pistacho",
    clientName: "Tutor de ejemplo 3",
    dogs: ["Perro de ejemplo 3"],
    status: "Consulta comercial",
    lastUpdated: Date.now() - 300000,
    messages: [
      {
        id: "msg-4",
        conversationId: "conv-sol-pistacho",
        senderRole: "cliente",
        senderName: "Tutor de ejemplo 3",
        text: "Quiero consultar el Plan 2.",
        timestamp: "09:00",
        read: false,
        type: "normal"
      }
    ]
  }
];

export function getChatConversations() {
  const stored = localStorage.getItem("paseosJuanChatMessages");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialConversations;
    }
  }
  localStorage.setItem("paseosJuanChatMessages", JSON.stringify(initialConversations));
  return initialConversations;
}

export function canReplyToClient(role) {
  return ["cliente", "coordinador", "supervisor", "admin"].includes(role);
}

export function sendChatMessage(conversationId, role, senderName, text, type = "normal") {
  if (!canReplyToClient(role)) {
    localStorage.setItem('paseosJuanToast', JSON.stringify({ message: "Solo coordinación o supervisión pueden responder al cliente.", type: 'error', id: Date.now() }));
    window.dispatchEvent(new Event('paseosJuanStoreUpdate'));
    return false;
  }
  
  const conversations = getChatConversations();
  const index = conversations.findIndex(c => c.id === conversationId);
  if (index === -1) return false;
  
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  const message = {
    id: `msg-${Date.now()}`,
    conversationId,
    senderRole: role,
    senderName,
    text,
    timestamp: `${hours}:${minutes}`,
    read: false,
    type
  };
  
  conversations[index].messages.push(message);
  conversations[index].lastUpdated = Date.now();
  
  // TODO: reemplazar localStorage por API real / WebSocket cuando se conecte backend.
  localStorage.setItem("paseosJuanChatMessages", JSON.stringify(conversations));
  return true;
}
