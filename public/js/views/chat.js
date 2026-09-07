import { get, post } from '../api.js';
import { esc, fmtDateTime, showToast } from '../ui.js';
import { state } from '../app.js';

export async function renderChat(container) {
  const [{ contacts, canMessageClients }, { threads }] = await Promise.all([get('/chat/contacts'), get('/chat/threads')]);

  container.innerHTML = `
    <h1>Chat</h1>
    <p class="page-subtitle">Solo podés escribirle a los roles habilitados. No hay chat libre.</p>
    <div class="card" style="padding:0;">
      <div class="chat-shell">
        <div class="chat-list" id="chat-list">
          <div style="padding:10px;font-size:0.78rem;color:var(--muted);font-weight:600;">CONTACTOS</div>
          ${contacts
            .map((c) => `<button data-recipient="${c.id}" data-title="${esc(c.name)} (${c.role})">${esc(c.name)}<br><small style="color:var(--muted)">${c.role}${c.turno ? ' · ' + c.turno : ''}</small></button>`)
            .join('') || '<div style="padding:12px;color:var(--muted);font-size:0.85rem;">No tenés contactos habilitados.</div>'}
          ${canMessageClients ? `<button id="btn-new-client" style="font-weight:600;">✉ Escribirle a un cliente</button>` : ''}
          <div style="padding:10px;font-size:0.78rem;color:var(--muted);font-weight:600;border-top:1px solid var(--border);">CONVERSACIONES</div>
          ${threads
            .map(
              (t) =>
                `<button data-thread="${t.thread_key}" ${t.other_user_id ? `data-recipient="${t.other_user_id}"` : ''} ${t.client_name ? `data-client="${esc(t.client_name)}"` : ''} data-title="${esc(t.title)}">${esc(t.title)}<br><small style="color:var(--muted)">${esc((t.last_body || '').slice(0, 40))}</small></button>`
            )
            .join('')}
        </div>
        <div class="chat-window" id="chat-window">
          <div class="readonly-banner">Elegí un contacto o una conversación para empezar.</div>
        </div>
      </div>
    </div>
  `;

  const windowEl = container.querySelector('#chat-window');

  function threadKeyForRecipient(recipientId) {
    return `u:${[state.user.id, recipientId].sort((a, b) => a - b).join('-')}`;
  }

  async function openConversation({ recipientId, clientName, title, threadKey }) {
    const key = threadKey || (clientName ? `c:${clientName.toLowerCase().replace(/\s+/g, '-')}` : threadKeyForRecipient(recipientId));
    let messages = [];
    try {
      const data = await get(`/chat/threads/${encodeURIComponent(key)}/messages`);
      messages = data.messages;
    } catch (e) {
      messages = [];
    }
    draw(key, title, messages, recipientId, clientName);
  }

  function draw(key, title, messages, recipientId, clientName) {
    windowEl.innerHTML = `
      <div style="padding:10px 14px;border-bottom:1px solid var(--border);font-weight:700;">${esc(title)}</div>
      <div class="chat-messages" id="chat-messages">
        ${
          messages
            .map(
              (m) => `
          <div class="chat-bubble ${m.sender_id === state.user.id ? 'mine' : ''}">
            ${esc(m.body)}
            <span class="meta">${esc(m.sender_role)} · ${fmtDateTime(m.created_at)}</span>
          </div>`
            )
            .join('') || '<p style="color:var(--muted);font-size:0.85rem;">Todavía no hay mensajes.</p>'
        }
      </div>
      <form class="chat-compose" id="chat-compose">
        <textarea name="body" placeholder="Escribí un mensaje..." required></textarea>
        <button class="btn btn-primary" type="submit">Enviar</button>
      </form>
    `;
    const box = windowEl.querySelector('#chat-messages');
    box.scrollTop = box.scrollHeight;
    windowEl.querySelector('#chat-compose').addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = e.target.body.value.trim();
      if (!body) return;
      try {
        await post('/chat/messages', clientName ? { client_name: clientName, body } : { recipient_id: recipientId, body });
        openConversation({ recipientId, clientName, title, threadKey: key });
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  }

  container.querySelectorAll('[data-recipient], [data-thread]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const recipientId = btn.getAttribute('data-recipient') ? Number(btn.getAttribute('data-recipient')) : null;
      const clientName = btn.getAttribute('data-client') || null;
      const title = btn.getAttribute('data-title');
      const threadKey = btn.getAttribute('data-thread') || null;
      openConversation({ recipientId, clientName, title, threadKey });
    });
  });

  container.querySelector('#btn-new-client')?.addEventListener('click', () => {
    windowEl.innerHTML = `
      <form style="padding:14px;display:flex;flex-direction:column;gap:10px;" id="new-client-form">
        <div class="field"><label>Nombre del cliente</label><input name="client_name" required /></div>
        <div class="field"><label>Mensaje</label><textarea name="body" required></textarea></div>
        <button class="btn btn-primary" type="submit">Enviar y quedar registrado</button>
      </form>
    `;
    container.querySelector('#new-client-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const clientName = e.target.client_name.value.trim();
      const body = e.target.body.value.trim();
      try {
        await post('/chat/messages', { client_name: clientName, body });
        showToast('Mensaje enviado y registrado con fecha y autor.');
        openConversation({ clientName, title: `Cliente: ${clientName}` });
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });
}
