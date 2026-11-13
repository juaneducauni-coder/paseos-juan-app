// Tienda (/tienda): alimento y productos. Negocio separado, identidad negro y verde.
// Carrito simple guardado en el dispositivo; el pedido se manda por WhatsApp (sin cobro online).
import { TIENDA, PRODUCTOS, PENDIENTE } from "../data/tienda.js";
import { whatsappLink, icon } from "../ui/shared.js";

const CART_KEY = "paseosJuan_tiendaCarrito";
const MAX_QTY = 99;
let cartMemory = {};

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function readCart() {
  let saved = cartMemory;
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    if (parsed && typeof parsed === "object") saved = parsed;
  } catch {
    // Sin almacenamiento: queda en memoria mientras dure la visita.
  }
  const cart = {};
  for (const product of PRODUCTOS) {
    const qty = Math.min(MAX_QTY, Math.max(0, Math.floor(Number(saved[product.id]) || 0)));
    if (qty) cart[product.id] = qty;
  }
  return cart;
}

function writeCart(cart) {
  cartMemory = cart;
  try {
    if (Object.keys(cart).length) localStorage.setItem(CART_KEY, JSON.stringify(cart));
    else localStorage.removeItem(CART_KEY);
  } catch {
    // Sin almacenamiento: queda en memoria.
  }
}

function cartCount(cart) {
  return Object.values(cart).reduce((total, qty) => total + qty, 0);
}

function priceLabel(product) {
  return typeof product.precio === "number" ? `$${product.precio.toLocaleString("es-AR")}` : PENDIENTE;
}

export function buildOrderMessage(cart) {
  const lines = PRODUCTOS.filter((product) => cart[product.id]).map(
    (product) => `- ${product.nombre} (${product.para.toLowerCase()}): ${cart[product.id]}`,
  );
  return [
    `Hola, quiero hacer un pedido en la ${TIENDA.nombre} (aliada de Paseos Juan):`,
    ...lines,
    "",
    "¿Me confirmás presentación, precio y disponibilidad?",
  ].join("\n");
}

function productCard(product, cart) {
  const qty = cart[product.id] || 0;
  return `
    <article class="tienda-product" aria-labelledby="producto-${product.id}">
      ${product.foto
        ? `<img class="tienda-photo" src="${esc(product.foto)}" alt="${esc(product.nombre)}, ${esc(product.para.toLowerCase())}" />`
        : `<div class="tienda-photo tienda-photo--pending" role="img" aria-label="Foto de ${esc(product.nombre)}: pendiente de confirmar">
            ${icon("packageCheck")}<span>Foto pendiente</span>
          </div>`}
      <div class="tienda-product-body">
        <p class="tienda-tag">${esc(product.para)}</p>
        <h2 id="producto-${product.id}">${esc(product.nombre)}</h2>
        <p class="tienda-maker">Marca de ${esc(product.fabricante)}</p>
        <dl class="tienda-specs">
          <div><dt>Presentación</dt><dd>${esc(product.presentacion)}</dd></div>
          <div><dt>Precio</dt><dd>${esc(priceLabel(product))}</dd></div>
        </dl>
        ${qty
          ? `<div class="tienda-qty" role="group" aria-label="Cantidad de ${esc(product.nombre)}">
              <button type="button" data-tienda="restar" data-id="${product.id}" aria-label="Restar un ${esc(product.nombre)}">−</button>
              <output aria-live="off">${qty}</output>
              <button type="button" data-tienda="sumar" data-id="${product.id}" aria-label="Sumar un ${esc(product.nombre)}" ${qty >= MAX_QTY ? "disabled" : ""}>+</button>
            </div>`
          : `<button class="tienda-add" type="button" data-tienda="sumar" data-id="${product.id}">Sumar al pedido</button>`}
      </div>
    </article>
  `;
}

function cartPanel(cart) {
  const items = PRODUCTOS.filter((product) => cart[product.id]);
  return `
    <h2 id="carrito-titulo">Tu pedido ${items.length ? `<span class="tienda-count">${cartCount(cart)}</span>` : ""}</h2>
    ${items.length
      ? `<ul class="tienda-cart-list">
          ${items.map((product) => `
            <li>
              <div class="tienda-cart-name"><strong>${esc(product.nombre)}</strong><span>${esc(product.para)}</span></div>
              <div class="tienda-qty tienda-qty--small" role="group" aria-label="Cantidad de ${esc(product.nombre)}">
                <button type="button" data-tienda="restar" data-id="${product.id}" data-donde="carrito" aria-label="Restar un ${esc(product.nombre)}">−</button>
                <output>${cart[product.id]}</output>
                <button type="button" data-tienda="sumar" data-id="${product.id}" data-donde="carrito" aria-label="Sumar un ${esc(product.nombre)}" ${cart[product.id] >= MAX_QTY ? "disabled" : ""}>+</button>
              </div>
              <button class="tienda-remove" type="button" data-tienda="quitar" data-id="${product.id}" data-donde="carrito">Quitar<span class="visually-hidden"> ${esc(product.nombre)}</span></button>
            </li>
          `).join("")}
        </ul>
        <p class="tienda-cart-note">Sin pago online: te confirmamos presentación, precio y disponibilidad por WhatsApp.</p>
        <button class="tienda-order" type="button" data-tienda="pedir">${icon("message")}<span>Pedir por WhatsApp</span></button>`
      : `<p class="tienda-empty">Todavía no sumaste productos.</p>`}
  `;
}

export function tiendaPage() {
  const cart = readCart();
  return `
    <div class="tienda-page">
      <header class="tienda-bar">
        <a class="tienda-brand" href="/tienda" data-link aria-label="${esc(TIENDA.nombre)}, ${esc(TIENDA.aliado)}">
          <span class="tienda-logo" aria-hidden="true">${icon("shoppingBag")}</span>
          <span><strong>${esc(TIENDA.nombre)}</strong><small>${esc(TIENDA.aliado)}</small></span>
        </a>
        <a class="tienda-cart-link" href="/tienda#carrito" data-link>
          ${icon("shoppingBag")}<span>Pedido</span><b data-tienda-badge>${cartCount(cart)}</b>
        </a>
      </header>

      <main class="tienda-main">
        <a class="tienda-back" href="/" data-link>← Volver a Paseos Juan</a>
        <section class="tienda-hero" aria-labelledby="tienda-titulo">
          <p class="tienda-eyebrow">Alimento y productos</p>
          <h1 id="tienda-titulo">Para perros y gatos.</h1>
          <p>DogPro y CatPro, de ${esc(TIENDA.fabricante)}. Armá tu pedido y mandalo por WhatsApp.</p>
        </section>

        <section class="tienda-grid" aria-label="Productos" data-tienda-productos>
          ${PRODUCTOS.map((product) => productCard(product, cart)).join("")}
        </section>

        <p class="tienda-health">${icon("heartPulse")}<span>Si tu mascota tiene alguna condición de salud, consultá antes con su veterinario.</span></p>

        <section class="tienda-cart" id="carrito" aria-labelledby="carrito-titulo" tabindex="-1" data-tienda-carrito>
          ${cartPanel(cart)}
        </section>
        <p class="visually-hidden" data-tienda-status role="status" aria-live="polite"></p>
      </main>

      <footer class="tienda-footer">
        <p><strong>${esc(TIENDA.nombre)}</strong> · ${esc(TIENDA.aliado)}</p>
        <p>DogPro y CatPro son marcas de ${esc(TIENDA.fabricante)}, usadas con su autorización.</p>
        <a href="/" data-link>Volver a Paseos Juan</a>
      </footer>
    </div>
  `;
}

// Redibuja solo productos y carrito, y devuelve el foco al mismo botón (o al carrito).
function refresh(cart, focus) {
  const products = document.querySelector("[data-tienda-productos]");
  const panel = document.querySelector("[data-tienda-carrito]");
  if (!products || !panel) return;
  products.innerHTML = PRODUCTOS.map((product) => productCard(product, cart)).join("");
  panel.innerHTML = cartPanel(cart);
  const badge = document.querySelector("[data-tienda-badge]");
  if (badge) badge.textContent = cartCount(cart);
  const scope = focus.donde === "carrito" ? panel : products;
  const target =
    scope.querySelector(`[data-tienda="${focus.action}"][data-id="${focus.id}"]:not([disabled])`) ||
    scope.querySelector(`[data-id="${focus.id}"]:not([disabled])`) ||
    (focus.donde === "carrito" ? panel : products.querySelector(`[data-id="${focus.id}"]`));
  target?.focus();
}

function announce(text) {
  const status = document.querySelector("[data-tienda-status]");
  if (status) status.textContent = text;
}

function handleTiendaClick(event) {
  const button = event.target.closest?.("[data-tienda]");
  if (!button) return;
  const action = button.dataset.tienda;
  const cart = readCart();

  if (action === "pedir") {
    if (!cartCount(cart)) return;
    window.open(whatsappLink(buildOrderMessage(cart)), "_blank", "noopener");
    announce("Se abrió WhatsApp con tu pedido: solo falta tocar Enviar.");
    return;
  }

  const id = button.dataset.id;
  const product = PRODUCTOS.find((item) => item.id === id);
  if (!product) return;
  const qty = cart[id] || 0;
  if (action === "sumar") cart[id] = Math.min(MAX_QTY, qty + 1);
  if (action === "restar") cart[id] = Math.max(0, qty - 1);
  if (action === "quitar") cart[id] = 0;
  if (!cart[id]) delete cart[id];
  writeCart(cart);
  refresh(cart, { action, id, donde: button.dataset.donde || "productos" });
  announce(cart[id] ? `${product.nombre}: ${cart[id]} en tu pedido.` : `Sacaste ${product.nombre} del pedido.`);
}

export function registerTiendaEvents() {
  document.addEventListener("click", handleTiendaClick);
}
