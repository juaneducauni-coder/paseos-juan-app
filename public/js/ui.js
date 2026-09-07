export function showToast(message, type = 'success') {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.className = `toast ${type}`;
  el.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => {
    el.hidden = true;
  }, 3800);
}

export function esc(str) {
  if (str == null) return '';
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso.includes('T') || iso.includes(' ') ? iso + (iso.endsWith('Z') ? '' : '') : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function estadoTag(estado) {
  const map = { VERDE: 'VERDE', AMARILLO: 'AMARILLO', ROJO: 'ROJO', SIN_EVALUAR: 'SIN EVALUAR' };
  return `<span class="tag tag-${String(estado).toLowerCase()}">${map[estado] || estado}</span>`;
}

export function statusTag(estado, label) {
  return `<span class="tag tag-${String(estado).toLowerCase()}">${label || estado}</span>`;
}

let modalRoot = null;
export function openModal(html, onMount) {
  closeModal();
  modalRoot = document.createElement('div');
  modalRoot.className = 'modal-backdrop';
  modalRoot.innerHTML = `<div class="modal-box">${html}</div>`;
  modalRoot.addEventListener('click', (e) => {
    if (e.target === modalRoot) closeModal();
  });
  document.body.appendChild(modalRoot);
  if (onMount) onMount(modalRoot.querySelector('.modal-box'));
}

export function closeModal() {
  if (modalRoot) {
    modalRoot.remove();
    modalRoot = null;
  }
}

export function formToObject(form) {
  const data = {};
  new FormData(form).forEach((v, k) => {
    data[k] = v;
  });
  return data;
}
