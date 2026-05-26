// src/store/paseosJuanStore.js

export function getStore() {
  return {
    users: getStoredItem('paseosJuan_users', []),
    clients: getStoredItem('paseosJuan_clients', []),
    dogs: getStoredItem('paseosJuan_dogs', []),
    routes: getStoredItem('paseosJuan_routes', []),
    payments: getStoredItem('paseosJuan_payments', []),
    alerts: getStoredItem('paseosJuan_alerts', []),
    reports: getStoredItem('paseosJuan_reports', []),
    chats: getStoredItem('paseosJuan_chats', []),
    settings: getStoredItem('paseosJuan_settings', {}),
  };
}

export function saveStore(partialStore) {
  if (partialStore.users) localStorage.setItem('paseosJuan_users', JSON.stringify(partialStore.users));
  if (partialStore.clients) localStorage.setItem('paseosJuan_clients', JSON.stringify(partialStore.clients));
  if (partialStore.dogs) localStorage.setItem('paseosJuan_dogs', JSON.stringify(partialStore.dogs));
  if (partialStore.routes) localStorage.setItem('paseosJuan_routes', JSON.stringify(partialStore.routes));
  if (partialStore.payments) localStorage.setItem('paseosJuan_payments', JSON.stringify(partialStore.payments));
  if (partialStore.alerts) localStorage.setItem('paseosJuan_alerts', JSON.stringify(partialStore.alerts));
  if (partialStore.reports) localStorage.setItem('paseosJuan_reports', JSON.stringify(partialStore.reports));
  if (partialStore.chats) localStorage.setItem('paseosJuan_chats', JSON.stringify(partialStore.chats));
  if (partialStore.settings) localStorage.setItem('paseosJuan_settings', JSON.stringify(partialStore.settings));
  window.dispatchEvent(new Event('paseosJuanStoreUpdate'));
}

export function resetStore() {
  localStorage.removeItem('paseosJuan_users');
  localStorage.removeItem('paseosJuan_clients');
  localStorage.removeItem('paseosJuan_dogs');
  localStorage.removeItem('paseosJuan_routes');
  localStorage.removeItem('paseosJuan_payments');
  localStorage.removeItem('paseosJuan_alerts');
  localStorage.removeItem('paseosJuan_reports');
  localStorage.removeItem('paseosJuan_chats');
  localStorage.removeItem('paseosJuan_settings');
  window.dispatchEvent(new Event('paseosJuanStoreUpdate'));
}

function getStoredItem(key, defaultValue) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export function updateUsers(users) { saveStore({ users }); }
export function updateClients(clients) { saveStore({ clients }); }
export function updateDogs(dogs) { saveStore({ dogs }); }
export function updateRoutes(routes) { saveStore({ routes }); }
export function updatePayments(payments) { saveStore({ payments }); }
export function updateAlerts(alerts) { saveStore({ alerts }); }
export function updateReports(reports) { saveStore({ reports }); }
export function updateChats(chats) { saveStore({ chats }); }
export function updateSettings(settings) { saveStore({ settings }); }

export function canDo(role, action) {
  if (role === 'admin') return true;

  const permissions = {
    coordinador: [
      'create_dog', 'edit_client', 'reply_client_chat',
      'register_payment', 'review_doc', 'send_to_supervisor'
    ],
    supervisor: [
      'create_route', 'assign_dogs', 'reply_client_chat',
      'manage_absence', 'control_walkers', 'review_alerts'
    ],
    paseador: [
      'view_route', 'mark_states', 'report_incident',
      'upload_media', 'view_internal_chat'
    ],
    cliente: [
      'view_profile', 'write_chat', 'upload_vaccines',
      'upload_receipt', 'view_payments', 'view_walk_state'
    ]
  };

  return permissions[role]?.includes(action) || false;
}

export function openModal(type, data = null) {
  localStorage.setItem('paseosJuanActiveModal', JSON.stringify({ type, data }));
  window.dispatchEvent(new Event('paseosJuanStoreUpdate')); // Trigger render
}

export function closeModal() {
  localStorage.removeItem('paseosJuanActiveModal');
  window.dispatchEvent(new Event('paseosJuanStoreUpdate')); // Trigger render
}

export function showToast(message, type = 'success') {
  localStorage.setItem('paseosJuanToast', JSON.stringify({ message, type, id: Date.now() }));
  window.dispatchEvent(new Event('paseosJuanStoreUpdate'));
}
