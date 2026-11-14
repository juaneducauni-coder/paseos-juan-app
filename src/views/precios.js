// Página de precios (/precios): todo resumido. Los valores salen de data/precios.js.
import { BUSINESS } from "../data/mock.js";
import {
  PRECIOS_VIGENTES_AL,
  TAMANOS,
  PLANES_SEMANALES,
  PASEO_SUELTO_GRUPAL,
  DESCUENTOS_VARIOS_PERROS,
  SERVICIOS_A_CONSULTAR,
  formatoPesos,
} from "../data/precios.js";
import { whatsappLink, icon } from "../ui/shared.js";
import { publicShell, publicFooter } from "./landing.js";

const MENSAJE_CONSULTAR = "Hola, vi los precios en la página y quiero consultar por los paseos grupales para mi perro.";

// En el celular cada opción es una tarjeta con un renglón por tamaño (precios enteros, sin
// cortes); en pantallas anchas se ve la tabla. Solo una de las dos está visible.
function tarjetasPorTamano({ caption, filas }) {
  return `
    <ul class="precios-planes" aria-label="${caption}">
      ${filas.map((fila) => `
        <li class="precios-plan">
          <p class="precios-plan-titulo"><strong>${fila.titulo}</strong>${fila.detalle ? `<span>${fila.detalle}</span>` : ""}</p>
          <dl>
            ${TAMANOS.map((tamano) => `
              <div><dt>${tamano}</dt><dd>${formatoPesos(fila.precios[tamano])}</dd></div>
            `).join("")}
          </dl>
        </li>
      `).join("")}
    </ul>
  `;
}

function tablaPorTamano({ caption, filas }) {
  return `
    ${tarjetasPorTamano({ caption, filas })}
    <div class="precios-table-wrap">
      <table class="precios-table">
        <caption class="visually-hidden">${caption}</caption>
        <thead>
          <tr>
            <th scope="col"><span class="visually-hidden">Opción</span></th>
            ${TAMANOS.map((tamano) => `<th scope="col">${tamano}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${filas.map((fila) => `
            <tr>
              <th scope="row">${fila.titulo}${fila.detalle ? `<small>${fila.detalle}</small>` : ""}</th>
              ${TAMANOS.map((tamano) => `<td>${formatoPesos(fila.precios[tamano])}</td>`).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

export function preciosPage() {
  return publicShell(`
    <main class="precios-main">
      <header class="precios-head">
        <p class="eyebrow">Precios</p>
        <h1>Precios de Paseos Juan</h1>
        <p class="precios-fecha">Precios actualizados al <strong>${PRECIOS_VIGENTES_AL}</strong></p>
      </header>

      <section class="precios-card" aria-labelledby="planes-titulo">
        <h2 id="planes-titulo">Planes semanales</h2>
        <p class="precios-sub">Paseos grupales. Precio por semana y por perro, según su tamaño.</p>
        ${tablaPorTamano({
          caption: "Planes semanales: precio por semana y por perro según tamaño",
          filas: PLANES_SEMANALES.map((plan) => ({
            titulo: plan.nombre,
            detalle: `${plan.paseosPorSemana} paseos por semana`,
            precios: plan.precios,
          })),
        })}
      </section>

      <section class="precios-card" aria-labelledby="suelto-titulo">
        <h2 id="suelto-titulo">Paseo suelto</h2>
        <p class="precios-sub">Un paseo grupal, sin plan.</p>
        ${tablaPorTamano({
          caption: "Paseo suelto grupal: precio por paseo según tamaño",
          filas: [{ titulo: "Grupal", detalle: "1 paseo", precios: PASEO_SUELTO_GRUPAL }],
        })}
      </section>

      <section class="precios-card" aria-labelledby="descuentos-titulo">
        <h2 id="descuentos-titulo">Varios perros en casa</h2>
        <p class="precios-sub">Descuento según cuántos perros pasean con nosotros.</p>
        <ul class="precios-descuentos">
          ${DESCUENTOS_VARIOS_PERROS.map((item) => `
            <li><strong>${item.descuento} menos</strong><span>Con ${item.perros} perros</span></li>
          `).join("")}
        </ul>
      </section>

      <section class="precios-card" aria-labelledby="consultar-titulo">
        <h2 id="consultar-titulo">Otros servicios</h2>
        <ul class="precios-consultar">
          ${SERVICIOS_A_CONSULTAR.map((servicio) => `
            <li>
              <div><strong>${servicio.nombre}</strong><span>Consultá por WhatsApp</span></div>
              <a class="secondary-button" href="${whatsappLink(servicio.mensaje)}" target="_blank" rel="noreferrer" aria-label="Consultar ${servicio.nombre} por WhatsApp">Consultar</a>
            </li>
          `).join("")}
          <li>
            <div><strong>Alimento DogPro y CatPro</strong><span>En la tienda</span></div>
            <a class="secondary-button" href="/tienda" data-link>Ver tienda</a>
          </li>
        </ul>
      </section>

      <section class="precios-cta" aria-labelledby="contratar-titulo">
        <h2 id="contratar-titulo">¿Arrancamos?</h2>
        <p>Antes de sumarlo al grupo hacemos una evaluación inicial.</p>
        <div class="precios-cta-actions">
          <a class="primary-button" href="/#evaluacion" data-link>Pedí tu evaluación</a>
          <a class="secondary-button" href="${whatsappLink(MENSAJE_CONSULTAR)}" target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
        </div>
        <small>WhatsApp ${BUSINESS.whatsappLabel}</small>
      </section>
    </main>
    ${publicFooter()}
  `, "/precios");
}
