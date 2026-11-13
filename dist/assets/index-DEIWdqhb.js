(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={menuOpen:!1,chatOpen:!1,revealObserver:void 0},t={admin:{label:`Admin`,route:`/admin`,legacyRoute:`/dashboard/admin`,intent:`Control total del negocio, permisos, usuarios, finanzas y configuracion.`},coordinador:{label:`Coordinador`,route:`/coordinador`,legacyRoute:`/dashboard/coordinador`,intent:`Gestion operativa diaria, asignaciones, rutas, agenda y comunicacion.`},supervisor:{label:`Supervisor`,route:`/supervisor`,legacyRoute:`/dashboard/supervisor`,intent:`Control grupal, seguridad, calidad de paseos e incidentes.`},paseador:{label:`Paseador`,route:`/paseador`,legacyRoute:`/dashboard/paseador`,intent:`Ejecucion de paseos, retiros, entregas, reportes y metricas personales.`},cliente:{label:`Cliente`,route:`/cliente`,legacyRoute:`/dashboard/cliente`,intent:`Seguimiento del perro, confianza, pagos, planes y contacto.`},visitante:{label:`Visitante`,route:`/visitante`,intent:`Visualizacion publica, informacion comercial y reserva de evaluacion.`}},n={whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,zone:`Pilar y La Lonja`},r={title:`Muestra gratis de DogPro o CatPro + un paseo de regalo`,detail:`Abierta a cualquier persona: no hace falta ser cliente ni hacer una visita previa.`,until:`2026-12-01`,untilLabel:`01/12/2026`},i=[[`Admin`,`Control total`],[`Coordinador`,`Gestion operativa`],[`Supervisor`,`Control grupal`],[`Paseador`,`Ejecucion de paseos`],[`Cliente`,`Seguimiento de su perro`],[`Visitante`,`Solo visualizacion publica`]],a=[[`Inicio`,`/`,`home`],[`Sobre nosotros`,`/#sobre-nosotros`,`shieldCheck`],[`Precios`,`/precios`,`calendarCheck`],[`Tienda`,`/tienda`,`shoppingBag`],[`Compromiso`,`/#testimonios`,`message`],[`Preguntas frecuentes`,`/#faq`,`help`],[`Contacto`,`/#contacto`,`mail`],[`Ingresar`,`/login`,`logIn`],[`Registro`,`/registro`,`userPlus`]];function o(){return{users:c(`paseosJuan_users`,[]),clients:c(`paseosJuan_clients`,[]),dogs:c(`paseosJuan_dogs`,[]),routes:c(`paseosJuan_routes`,[]),payments:c(`paseosJuan_payments`,[]),alerts:c(`paseosJuan_alerts`,[]),reports:c(`paseosJuan_reports`,[]),chats:c(`paseosJuan_chats`,[]),settings:c(`paseosJuan_settings`,{})}}function s(e){e.users&&localStorage.setItem(`paseosJuan_users`,JSON.stringify(e.users)),e.clients&&localStorage.setItem(`paseosJuan_clients`,JSON.stringify(e.clients)),e.dogs&&localStorage.setItem(`paseosJuan_dogs`,JSON.stringify(e.dogs)),e.routes&&localStorage.setItem(`paseosJuan_routes`,JSON.stringify(e.routes)),e.payments&&localStorage.setItem(`paseosJuan_payments`,JSON.stringify(e.payments)),e.alerts&&localStorage.setItem(`paseosJuan_alerts`,JSON.stringify(e.alerts)),e.reports&&localStorage.setItem(`paseosJuan_reports`,JSON.stringify(e.reports)),e.chats&&localStorage.setItem(`paseosJuan_chats`,JSON.stringify(e.chats)),e.settings&&localStorage.setItem(`paseosJuan_settings`,JSON.stringify(e.settings)),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function c(e,t){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function l(){localStorage.removeItem(`paseosJuanActiveModal`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function u(e,t=`success`){localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:e,type:t,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}var d=[{id:`conv-laura-kiara`,clientName:`Tutor de ejemplo 1`,dogs:[`Perro de ejemplo 1`],status:`Abierto`,lastUpdated:Date.now()-1e5,messages:[{id:`msg-1`,conversationId:`conv-laura-kiara`,senderRole:`cliente`,senderName:`Tutor de ejemplo 1`,text:`¿Mañana hay paseo?`,timestamp:`10:30`,read:!1,type:`normal`}]},{id:`conv-martin-bruno`,clientName:`Tutor de ejemplo 2`,dogs:[`Perro de ejemplo 2`],status:`Documentación pendiente`,lastUpdated:Date.now()-2e5,messages:[{id:`msg-2`,conversationId:`conv-martin-bruno`,senderRole:`cliente`,senderName:`Tutor de ejemplo 2`,text:`Ya subí el carnet de vacunas.`,timestamp:`10:15`,read:!0,type:`normal`},{id:`msg-3`,conversationId:`conv-martin-bruno`,senderRole:`coordinador`,senderName:`Coordinador`,text:`Perfecto, lo revisamos y te avisamos si falta algo.`,timestamp:`10:18`,read:!0,type:`normal`}]},{id:`conv-sol-pistacho`,clientName:`Tutor de ejemplo 3`,dogs:[`Perro de ejemplo 3`],status:`Consulta comercial`,lastUpdated:Date.now()-3e5,messages:[{id:`msg-4`,conversationId:`conv-sol-pistacho`,senderRole:`cliente`,senderName:`Tutor de ejemplo 3`,text:`Quiero consultar el Plan 2.`,timestamp:`09:00`,read:!1,type:`normal`}]}];function f(){let e=localStorage.getItem(`paseosJuanChatMessages`);if(e)try{return JSON.parse(e)}catch{return d}return localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(d)),d}function p(e){return[`cliente`,`coordinador`,`supervisor`,`admin`].includes(e)}function m(e,t,n,r,i=`normal`){if(!p(t))return localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:`Solo coordinación o supervisión pueden responder al cliente.`,type:`error`,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)),!1;let a=f(),o=a.findIndex(t=>t.id===e);if(o===-1)return!1;let s=new Date,c=s.getHours().toString().padStart(2,`0`),l=s.getMinutes().toString().padStart(2,`0`),u={id:`msg-${Date.now()}`,conversationId:e,senderRole:t,senderName:n,text:r,timestamp:`${c}:${l}`,read:!1,type:i};return a[o].messages.push(u),a[o].lastUpdated=Date.now(),localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(a)),!0}function h(e){return`https://wa.me/${n.whatsapp}?text=${encodeURIComponent(e)}`}function g(e,t=`line-icon`){let n=`class="${t}" viewBox="0 0 24 24" aria-hidden="true"`,r={activity:`<path d="M4 12h4l2-6 4 12 2-6h4" />`,arrowRight:`<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,briefcase:`<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><path d="M4 7h16v12H4z" /><path d="M9 12h6" />`,briefcaseMedical:`<path d="M10 6V5a2 2 0 0 1 4 0v1" /><path d="M4 7h16v12H4z" /><path d="M12 11v5" /><path d="M9.5 13.5h5" />`,calendarCheck:`<path d="M7 3v4" /><path d="M17 3v4" /><path d="M4 8h16" /><path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="m9 15 2 2 4-5" />`,camera:`<path d="M14 6 13 4h-2L10 6H6a2 2 0 0 0-2 2v10h16V8a2 2 0 0 0-2-2Z" /><circle cx="12" cy="13" r="3" />`,checkCircle:`<circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.4 2.4 4.9-5" />`,chart:`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15V9" /><path d="M12 15V6" /><path d="M16 15v-4" />`,clipboardCheck:`<path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 4h6" /><path d="m8.5 14 2 2 4.8-5" />`,clock:`<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`,alertCircle:`<circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" />`,alertTriangle:`<path d="M12 3 22 20H2L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" />`,archive:`<rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v12h14V8" /><path d="M10 12h4" />`,bell:`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" />`,bone:`<path d="M7.5 8.5a3 3 0 1 1 2-5.2 3 3 0 0 1 5 0 3 3 0 1 1 2 5.2l-8 7a3 3 0 1 1-2-5.2 3 3 0 0 1 0-3.6 3 3 0 0 1 1 1.8Z" />`,chevronDown:`<path d="m6 9 6 6 6-6" />`,compass:`<circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />`,creditCard:`<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" />`,database:`<ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />`,copy:`<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,dollarSign:`<path d="M12 2v20" /><path d="M17 6.5c-1.2-1-2.8-1.5-5-1.5-3 0-5 1.4-5 3.5 0 5 10 2.5 10 7.5 0 2.1-2 3.5-5 3.5-2.2 0-4-.6-5.5-1.8" />`,droplets:`<path d="M7 3C5 6 4 8.2 4 10a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" /><path d="M17 3c-2 3-3 5.2-3 7a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" />`,eye:`<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />`,fileCheck:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="m8.5 15 2 2 4.5-5" />`,fileText:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M8 13h8" /><path d="M8 17h5" />`,fileUp:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M12 17v-6" /><path d="m9 14 3-3 3 3" />`,heartPulse:`<path d="M20.5 8.8c0 5.2-8.5 10.2-8.5 10.2S3.5 14 3.5 8.8A4.3 4.3 0 0 1 11 6a4.3 4.3 0 0 1 9.5 2.8Z" /><path d="M7 12h3l1-2 2 5 1.5-3H17" />`,help:`<circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.2-1.7 2.6" /><path d="M12 17h.01" />`,home:`<path d="m4 11 8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-6h4v6" />`,logIn:`<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M4 12h10" /><path d="m10 8 4 4-4 4" />`,logOut:`<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M14 12H4" /><path d="m18 8 4 4-4 4" />`,lock:`<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" />`,mail:`<path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />`,mapPin:`<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />`,medal:`<path d="M8 3h8l-2 5h-4L8 3Z" /><circle cx="12" cy="14" r="5" /><path d="m10.5 14 1 1.2 2.2-2.4" />`,message:`<path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8 8 0 1 1 21 12Z" />`,navigation:`<path d="m12 2 7 19-7-4-7 4 7-19Z" />`,packageCheck:`<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4.5 8 12 12.2 19.5 8" /><path d="M12 21v-8.8" /><path d="m9.2 16 1.8 1.8 3.8-4.1" />`,pawPrint:`<circle cx="8" cy="9" r="1.6" /><circle cx="12" cy="7" r="1.7" /><circle cx="16" cy="9" r="1.6" /><circle cx="18" cy="13" r="1.5" /><path d="M7.5 16.4c.8-2.1 2.4-3.3 4.5-3.3s3.7 1.2 4.5 3.3c.5 1.4-.5 2.6-1.9 2.3l-1.5-.4a4.5 4.5 0 0 0-2.2 0l-1.5.4c-1.4.3-2.4-.9-1.9-2.3Z" />`,play:`<circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" />`,flag:`<path d="M5 21V4" /><path d="M5 4h12l-1.5 4L17 12H5" />`,radar:`<circle cx="12" cy="12" r="8" /><path d="M12 12 17 7" /><path d="M12 4v2" /><path d="M12 18v2" /><path d="M4 12h2" /><path d="M18 12h2" />`,radio:`<path d="M4 9h16v11H4z" /><path d="m8 9 8-6" /><circle cx="8" cy="14" r="2" /><path d="M14 14h3" /><path d="M14 17h2" />`,plus:`<path d="M12 5v14" /><path d="M5 12h14" />`,receipt:`<path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1V3Z" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" />`,route:`<circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />`,shieldCheck:`<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" />`,send:`<path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" />`,settings:`<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 3.6-.2-.1a1.7 1.7 0 0 0-2 .3l-.3.2a1.7 1.7 0 0 0-1 1.5V23H9.8v-.5a1.7 1.7 0 0 0-1-1.5l-.3-.2a1.7 1.7 0 0 0-2-.3l-.2.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-3.6.2.1a1.7 1.7 0 0 0 2-.3l.3-.2a1.7 1.7 0 0 0 1-1.5V1h4.4v.5a1.7 1.7 0 0 0 1 1.5l.3.2a1.7 1.7 0 0 0 2 .3l.2-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z" />`,sliders:`<path d="M4 6h8" /><path d="M16 6h4" /><path d="M14 4v4" /><path d="M4 12h4" /><path d="M12 12h8" /><path d="M10 10v4" /><path d="M4 18h10" /><path d="M18 18h2" /><path d="M16 16v4" />`,shoppingBag:`<path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /><path d="M9.5 14h5" />`,uploadCloud:`<path d="M16 16 12 12l-4 4" /><path d="M12 12v9" /><path d="M20 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 0 0 3 10.4" /><path d="M5 18a4 4 0 0 1 0-8" />`,userCheck:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="m16 13 2 2 4-5" />`,userPlus:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 8v6" /><path d="M15 11h6" />`,users:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 11a3 3 0 0 0 0-6" /><path d="M17 20a5 5 0 0 0-2-4" />`,wallet:`<path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V6" /><path d="M16 13h.01" />`,x:`<path d="M6 6 18 18" /><path d="M18 6 6 18" />`};return`<svg ${n} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${r[e]||r.shieldCheck}</svg>`}function ee(){try{return JSON.parse(localStorage.getItem(`paseosJuanDemoClient`))}catch{return null}}function te(e){try{let t=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?t:[]}catch{return[]}}function ne(e,t=`visitante`){return`
    ${re(t)}
    ${ie()}
    ${ae(e)}
  `}function re(t){return`
    <header class="topbar ${e.menuOpen?`menu-is-open`:``}">
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
        <a class="header-cta" href="/#evaluacion" data-link>Pedí tu evaluación</a>
        <button class="menu-button ${e.menuOpen?`is-open`:``}" type="button" data-menu-toggle aria-expanded="${e.menuOpen}" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `}function ie(){return`
    <div class="menu-backdrop ${e.menuOpen?`is-open`:``}" data-menu-close></div>
    <aside class="mobile-menu ${e.menuOpen?`is-open`:``}" aria-hidden="${!e.menuOpen}">
      <div class="mobile-menu-head">
        <a class="menu-brand" href="/" data-link>
          <img src="/paseos-juan-logo.png" alt="" />
          <span>
            <strong>Paseos Juan</strong>
            <small>Más que un simple paseo</small>
          </span>
        </a>
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menu">${g(`x`)}</button>
      </div>
      <nav class="menu-nav" aria-label="Menu principal">
        ${a.map(([e,t,n])=>`
          <a href="${t}" data-link>
            <span>${g(n,`menu-icon`)}</span>
            ${e}
          </a>
        `).join(``)}
      </nav>
      <a class="menu-evaluation" href="/#evaluacion" data-link>Pedí tu evaluación</a>
      <a class="menu-whatsapp" href="${h(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">
        WhatsApp ${n.whatsappLabel}
      </a>
    </aside>
  `}function ae(e){return`<div class="smooth-wrapper">${e}</div>`}function oe(){let t=f(),n=ee()?.name?.split(` `)[0]||`Tutor de ejemplo`,r=t.find(e=>e.id===`conv-martin-bruno`)||t[1];return localStorage.getItem(`paseosJuanChatDraft`),`
    <aside class="floating-chat ${e.chatOpen?`is-open`:``}" aria-live="polite">
      <div class="chat-window">
        <div class="chat-head">
          <span class="chat-head-icon">${g(`message`)}</span>
          <span>
            <strong>Paseos Juan</strong>
            <small>Consultas sobre paseos, pagos o cambios de conducta.</small>
          </span>
          <button type="button" data-chat-close aria-label="Cerrar chat">${g(`x`)}</button>
        </div>
        <div class="chat-messages-area floating-chat-messages">
          <div class="chat-message-bubble is-other">
            <div class="chat-message-meta"><b>Soporte</b></div>
            <div class="chat-message-text">Hola, ¿en qué podemos ayudarte hoy?</div>
          </div>
          ${r.messages.map(e=>`
            <div class="chat-message-bubble ${e.senderRole===`cliente`?`is-mine`:`is-other`}">
              <div class="chat-message-meta">
                <b>${e.senderName}</b>
                <time>${e.timestamp}</time>
              </div>
              <div class="chat-message-text">${e.text}</div>
            </div>
          `).join(``)}
        </div>
        <div class="chat-quick-actions">
          ${[`Avisar cambio de conducta`,`Consultar pago`,`Consultar próximo paseo`,`Subir comprobante`,`Subir carnet de vacunas`].map(e=>`
            <button type="button" data-chat-quick-shared="${e}" data-chat-role="cliente" data-chat-sender="${n}" data-chat-conversation="${r.id}">
              ${g(`alertCircle`)} ${e}
            </button>
          `).join(``)}
        </div>
        <div class="chat-compose">
          <textarea data-chat-input-shared="${r.id}" placeholder="Escribí tu consulta..."></textarea>
          <button class="primary-button" type="button" data-chat-send-shared="${r.id}" data-chat-role="cliente" data-chat-sender="${n}">
            ${g(`send`)} Enviar
          </button>
        </div>
      </div>
      <button class="chat-bubble" type="button" data-chat-toggle>
        ${g(`message`)}
        <span>Ayuda</span>
      </button>
    </aside>
  `}function se(e,t){return`
    <details>
      <summary>${e}</summary>
      <p>${t}</p>
    </details>
  `}function ce(){return ne(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">404</p>
        <h1>Ruta no encontrada</h1>
        <p>Volver a la landing pública o entrar a un dashboard por rol.</p>
        <a class="primary-button" href="/" data-link>Ir al inicio</a>
      </section>
    </main>
  `)}function le(){let e=localStorage.getItem(`paseosJuanActiveModal`);if(!e)return``;let{type:t,data:n}=JSON.parse(e),r=``;switch(t){case`admin-reports`:r=`<h3>Reportes operativos</h3><p>Reportes filtrables. (Demo)</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-users`:r=`<h3>Usuarios y permisos</h3><p>Gestionar usuarios demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-prices`:r=`<h3>Precios y planes</h3><p>Editar precios y descuentos.</p><button class='primary-button' data-modal-action='save-prices'>Guardar cambios</button> <button data-modal-action='close'>Cerrar</button>`;break;case`admin-alerts`:r=`<h3>Alertas críticas</h3><p>Resolver alertas operativas.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-client`:r=`<h3>Ficha del cliente</h3><p>Detalle demo del cliente.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-audit`:r=`<h3>Auditoría</h3><p>Auditoría de cambios y chats.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-settings`:r=`<h3>Configuración del sistema</h3><p>Opciones generales demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`client-pay`:r=`<h3>Enviar comprobante</h3><p>El alias y el detalle de pago te los enviamos por WhatsApp. Cuando pagues, subí acá el comprobante.</p><label>Subir comprobante <input type='file' accept='image/*,.pdf' /></label><button class='primary-button' data-modal-action='confirm-pay'>Enviar comprobante</button> <button data-modal-action='close'>Cerrar</button>`;break;default:r=`<h3>Modal</h3><button data-modal-action='close'>Cerrar</button>`}return`
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal-content panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width: 90%; max-width: 500px;">
        ${r}
      </div>
    </div>
  `}var ue=null;function de(){let e=null;try{e=JSON.parse(localStorage.getItem(`paseosJuanToast`))}catch{e=null}return e?(ue||=setTimeout(()=>{ue=null,localStorage.getItem(`paseosJuanToast`)&&(localStorage.removeItem(`paseosJuanToast`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)))},3500),`
    <div class="toast is-${e.type===`error`?`error`:`success`}" role="status" aria-live="polite">
      ${e.message}
    </div>
  `):``}var fe=[],pe=[],me=[];function he(e,t){for(let n of e)if(n(t))return!0;return!1}function ge(t){let n=t.target.closest(`[data-chat-select]`);if(n)return localStorage.setItem(`paseosJuanActiveChat`,n.dataset.chatSelect),$(),!0;let r=t.target.closest(`[data-chat-send-shared]`);if(r){let e=r.dataset.chatSendShared,t=document.querySelector(`[data-chat-input-shared="${e}"]`),n=t?.value?.trim();if(!n)return!0;let i=r.dataset.chatRole,a=r.dataset.chatSender;return m(e,i,a,n)&&(t&&(t.value=``),localStorage.removeItem(`paseosJuanChatDraft`),$()),!0}let i=t.target.closest(`[data-chat-quick-shared]`);if(i){let e=i.dataset.chatQuickShared,t=i.dataset.chatRole,n=i.dataset.chatSender,r=i.dataset.chatConversation;return m(r,t,n,e)&&$(),!0}return t.target.closest(`[data-menu-toggle]`)?(e.menuOpen=!e.menuOpen,$(),!0):t.target.closest(`[data-menu-close]`)?(e.menuOpen=!1,$(),!0):t.target.closest(`[data-chat-toggle]`)?(e.chatOpen=!e.chatOpen,$(),!0):t.target.closest(`[data-chat-close]`)?(e.chatOpen=!1,$(),!0):!1}function _e(e){let t=e.target.closest(`[data-modal-action]`);if(t){if(t.dataset.modalAction===`close`&&l(),t.dataset.modalAction===`confirm-pay`){let e=o();e.alerts=[{id:`alert-`+Date.now(),dog:`Pago cliente`,type:`Pago por confirmar`,level:`Medio`,description:`Cliente subió comprobante.`},...e.alerts||[]],s(e),u(`Comprobante enviado. Estado: Pago por confirmar.`),l()}return t.dataset.modalAction===`save-prices`&&(u(`Precios actualizados correctamente.`),l()),!0}return e.target.closest(`[data-modal-backdrop]`)&&e.target===e.target.closest(`[data-modal-backdrop]`)?(l(),!0):!1}function ve(){fe.push(ge),me.push(_e)}var ye=`paseosJuan_accesibilidad`,be={theme:`auto`,motion:`auto`},xe=new Set,Se=we(),Ce=!1;function we(){try{let e=JSON.parse(localStorage.getItem(ye));return{...be,...e||{}}}catch{return{...be}}}function Te(){try{localStorage.setItem(ye,JSON.stringify(Se))}catch{}}var Ee=window.matchMedia(`(prefers-color-scheme: dark)`),De=window.matchMedia(`(prefers-reduced-motion: reduce)`);function Oe(){return Se.theme===`oscuro`||Se.theme!==`claro`&&Ee.matches}function ke(){return Se.motion===`calmo`||Se.motion!==`normal`&&De.matches}function Ae(e){return xe.add(e),()=>xe.delete(e)}function je(){let e=document.documentElement;e.dataset.theme=Oe()?`dark`:`light`,e.dataset.motion=ke()?`calm`:`normal`,e.style.colorScheme=Oe()?`dark`:`light`;let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,Oe()?`#0f1512`:`#f7f5ef`),Ne(),xe.forEach(e=>e({dark:Oe(),calm:ke()}))}function Me(e,t,n,r){let i=r===t;return`<button type="button" class="a11y-option ${i?`is-active`:``}" data-a11y-set="${e}:${t}" aria-pressed="${i}">${n}</button>`}function Ne(){let e=document.getElementById(`a11y-root`);e||(e=document.createElement(`div`),e.id=`a11y-root`,document.body.appendChild(e)),e.innerHTML=`
    <button type="button" class="a11y-toggle" data-a11y-toggle aria-expanded="${Ce}" aria-controls="a11y-panel" aria-label="Opciones de accesibilidad: tema y movimiento">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"></path>
      </svg>
    </button>
    <section class="a11y-panel ${Ce?`is-open`:``}" id="a11y-panel" role="dialog" aria-label="Accesibilidad" ${Ce?``:`hidden`}>
      <header>
        <strong>Accesibilidad</strong>
        <button type="button" class="a11y-close" data-a11y-toggle aria-label="Cerrar">×</button>
      </header>
      <div class="a11y-group" role="group" aria-label="Tema">
        <span>Tema</span>
        <div class="a11y-options">
          ${Me(`theme`,`claro`,`Claro`,Se.theme)}
          ${Me(`theme`,`oscuro`,`Oscuro`,Se.theme)}
          ${Me(`theme`,`auto`,`Automático`,Se.theme)}
        </div>
      </div>
      <div class="a11y-group" role="group" aria-label="Movimiento">
        <span>Movimiento</span>
        <div class="a11y-options">
          ${Me(`motion`,`normal`,`Normal`,Se.motion)}
          ${Me(`motion`,`calmo`,`Calmo`,Se.motion)}
          ${Me(`motion`,`auto`,`Automático`,Se.motion)}
        </div>
        <small>El modo calmo apaga animaciones y el fondo en movimiento. Recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</small>
      </div>
    </section>
  `}function Pe(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){Ce=!Ce,Ne(),Ce?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);Se={...Se,[e]:n},Te(),je(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else Ce&&!e.target.closest(`#a11y-root`)&&(Ce=!1,Ne())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Ce&&(Ce=!1,Ne(),document.querySelector(`.a11y-toggle`)?.focus())}),Ee.addEventListener?.(`change`,je),De.addEventListener?.(`change`,je),je()}var Fe={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function Ie(){Fe.frame&&cancelAnimationFrame(Fe.frame),Fe.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=ke(),r=Oe()?[22,52,39]:[184,218,198],i=Oe()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Fe.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Fe.lastDraw>33&&(Fe.lastDraw=e,s(e/1e3)),Fe.frame=requestAnimationFrame(l)}Fe.frame=requestAnimationFrame(l)}function Le(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Re=`pj_sesion`,ze=`pj_pendientes`,Be=`pj_cache_`,Ve=6e4;fetch(`/api/salud`).then(e=>e.json()).then(e=>{/provisorio/i.test(e.almacenamiento||``)&&(Ve=3e5)}).catch(()=>{});var He=new Set,Ue=new Map,We=new Set;document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&We.forEach(e=>e())});function Ge(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ke(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function qe(e){He.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function Je(e){return He.add(e),()=>He.delete(e)}var Ye=class extends Error{constructor(e,t){super(t),this.status=e}};async function _(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=v.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new Ye(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(v.clear(),qe(`sesion`)),!o.ok||s.ok===!1)throw new Ye(o.status,s.error||`Error del servidor.`);return s}var v={token:()=>Ge(Re,null)?.token||null,user:()=>Ge(Re,null)?.user||null,set(e,t){Ke(Re,{token:e,user:t}),qe(`sesion`)},clear(){try{localStorage.removeItem(Re),Object.keys(localStorage).filter(e=>e.startsWith(Be)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return _(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await _(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return v.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await _(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return v.set(i.token,i.user),i.user},async refresh(){let e=v.token();if(!e)return null;let t=await _(`/api/auth/me`);return t.user&&v.token()===e&&v.set(e,t.user),t.user},async changePin(e,t){let n=await _(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return v.set(n.token,n.user),n.user},logout(){v.clear(),qe(`sesion`)}},Xe={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],ayudante:[`paseador`],marketing:[]},Ze={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,ayudante:`Ayudante de paseador`,marketing:`Marketing`};function Qe(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`,ayudante:`/paseador`}[e]||`/`}var $e={list:async()=>(await _(`/api/usuarios`)).usuarios,save:async e=>(await _(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>_(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function et(e,t={}){return`${Be}${e}_${t.desde||``}_${t.prefijo||``}`}function tt(e,t){let n=Ge(ze,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var y={cached(e,t={}){return tt(e,Ge(et(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await _(`/api/registros?${n}`),i=localStorage.getItem(et(e,t));return Ke(et(e,t),r.registros),i!==JSON.stringify(r.registros)&&qe(e),tt(e,r.registros)}catch(n){if(n.status===0)return y.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=nt(n.fecha);try{let t=await _(`/api/registros`,{method:`POST`,body:{col:e,...n}});return rt(e,t.registro),qe(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Ge(ze,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:v.user()?.usuario,at:Date.now()}),Ke(ze,a),qe(e),{...n,pendiente:!0}}},async remove(e,t){await _(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${Be}${e}_`)).forEach(e=>{Ke(e,Ge(e,[]).filter(e=>e.id!==t))}),qe(e)},pendingCount(){return Ge(ze,[]).length},watch(e,t={}){let n=et(e,t);if(Ue.has(n))return Ue.get(n);let r=()=>{document.visibilityState===`visible`&&v.token()&&y.list(e,t).catch(()=>{})};r(),We.add(r);let i=setInterval(r,Ve);setTimeout(()=>{clearInterval(i),i=setInterval(r,Ve)},3e3);let a=()=>{We.delete(r),clearInterval(i),Ue.delete(n)};return Ue.set(n,a),a}};function nt(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function rt(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Be}${e}_`)).forEach(e=>{let n=Ge(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Ke(e,n)})}var it=!1;async function at(){if(it||!v.token())return 0;let e=v.user()?.usuario,t=Ge(ze,[]);if(!t.length)return 0;it=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await _(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});rt(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Ke(ze,Ge(ze,[]).filter(e=>!n.has(e.at))),it=!1,r.forEach(e=>qe(e))}return n.size}window.addEventListener(`online`,()=>at()),setInterval(()=>at(),3e4);async function ot(e){return _(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function b(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}var st=1600;async function ct(e){if(!/^image\/(jpeg|png|webp)$/.test(e.type))return e;try{let t=await createImageBitmap(e),n=Math.min(1,st/Math.max(t.width,t.height));if(n===1&&e.size<921600)return e;let r=document.createElement(`canvas`);r.width=Math.round(t.width*n),r.height=Math.round(t.height*n),r.getContext(`2d`).drawImage(t,0,0,r.width,r.height);let i=await new Promise(e=>r.toBlob(e,`image/jpeg`,.82));return i?new File([i],e.name.replace(/\.\w+$/,``)+`.jpg`,{type:`image/jpeg`}):e}catch{return e}}function lt(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result).split(`,`)[1]||``),r.onerror=()=>n(new Ye(400,`No se pudo leer el archivo.`)),r.readAsDataURL(e)})}async function ut(e){if(!e)throw new Ye(400,`Elegí un archivo.`);if(!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(e.type))throw new Ye(400,`Solo se aceptan fotos (JPG, PNG, WEBP) o PDF.`);let t=await ct(e);if(t.size>3670016)throw new Ye(413,`El archivo es muy pesado (máximo 3,5 MB).`);return{nombre:t.name,mime:t.type,base64:await lt(t)}}var dt={async subir(e,t,n={}){let r=await _(`/api/archivos`,{method:`POST`,body:{tipo:e,archivo:await ut(t),...n}});return rt(`archivos`,r.registro),qe(`archivos`),r.registro},async abrir(e){let t=window.open(``,`_blank`);if(!t)throw new Ye(0,`El navegador bloqueó la ventana nueva: permití las ventanas emergentes de esta página para ver el archivo.`);try{let n=await fetch(`/api/archivos?id=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${v.token()}`}});if(!n.ok){let e=await n.json().catch(()=>({}));throw new Ye(n.status,e.error||`No se pudo abrir el archivo.`)}let r=URL.createObjectURL(await n.blob());t.location.href=r,setTimeout(()=>URL.revokeObjectURL(r),6e4)}catch(e){throw t?.close(),e}}},ft=null;async function pt(){return ft||(ft=fetch(`/api/salud`).then(e=>e.json()).then(e=>e.googleClientId||null).catch(()=>null),ft)}function mt(){return window.google?.accounts?.id?Promise.resolve():new Promise((e,t)=>{let n=document.querySelector(`script[data-gsi]`);if(n){n.addEventListener(`load`,()=>e());return}let r=document.createElement(`script`);r.src=`https://accounts.google.com/gsi/client`,r.async=!0,r.dataset.gsi=`1`,r.onload=()=>e(),r.onerror=()=>t(new Ye(0,`No se pudo cargar Google.`)),document.head.appendChild(r)})}async function ht(e,t,{texto:n=`continue_with`}={}){let r=await pt();if(!r||!e)return!1;await mt(),window.google.accounts.id.initialize({client_id:r,callback:e=>t(e.credential),ux_mode:`popup`});let i=document.documentElement.dataset.theme===`dark`;return window.google.accounts.id.renderButton(e,{type:`standard`,theme:i?`filled_black`:`outline`,size:`large`,text:n,shape:`pill`,locale:`es`,width:Math.min(e.clientWidth||320,400)}),!0}v.loginGoogle=async function(e){let t=await _(`/api/auth/google`,{method:`POST`,body:{credential:e},auth:!1});return v.set(t.token,t.user),t.user};var gt=`pj_fotos_paseo_pendientes`;function _t(e=new Date){return new Intl.DateTimeFormat(`es-AR`,{timeZone:`America/Argentina/Buenos_Aires`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e)}var vt={async sacar(e,t){if(!t||!/^image\//.test(t.type))throw new Ye(400,`Sacá una foto del perro.`);let n=await ut(t),r=_t(),i={...e,estado:`paseando`,horaPaseo:r};try{let t=await _(`/api/archivos`,{method:`POST`,body:{tipo:`foto`,archivo:n,perroId:e.perroId,perroNombre:e.perroNombre,nota:`Foto del paseo ${e.fecha} ${r}`}});return rt(`archivos`,t.registro),qe(`archivos`),y.save(`paseos`,{...i,fotoPaseoId:t.registro.id})}catch(t){if(t.status!==0)throw t;let r=Ge(gt,[]).filter(t=>t.paseo.id!==e.id);return r.push({paseo:i,archivo:n,usuario:v.user()?.usuario,at:Date.now()}),Ke(gt,r),y.save(`paseos`,{...i,fotoPendiente:!0})}},pendientes(){return Ge(gt,[]).length},async subirPendientes(){let e=Ge(gt,[]);if(!e.length||!v.token())return 0;let t=v.user()?.usuario,n=new Set;for(let r of e)if(!(r.usuario&&r.usuario!==t))try{let e=await _(`/api/archivos`,{method:`POST`,body:{tipo:`foto`,archivo:r.archivo,perroId:r.paseo.perroId,perroNombre:r.paseo.perroNombre,nota:`Foto del paseo ${r.paseo.fecha} ${r.paseo.horaPaseo}`}});await y.save(`paseos`,{id:r.paseo.id,fecha:r.paseo.fecha,fotoPaseoId:e.registro.id,fotoPendiente:!1}),n.add(r.at)}catch(e){e.status!==0&&n.add(r.at)}return Ke(gt,Ge(gt,[]).filter(e=>!n.has(e.at))),n.size&&qe(`paseos`),n.size}};window.addEventListener(`online`,()=>vt.subirPendientes()),setInterval(()=>vt.subirPendientes(),3e4);var yt=`Hola, quiero información sobre Paseos Juan.`;function bt(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function xt(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}var St=[[`Inicio`,`/`,`home`],[`Servicios`,`/#servicios`,`pawPrint`],[`Precios`,`/precios`,`dollarSign`],[`Tienda`,`/tienda`,`shoppingBag`],[`Cómo trabajamos`,`/#como-trabajamos`,`shieldCheck`],[`Preguntas frecuentes`,`/#faq`,`help`],[`Pedí tu evaluación`,`/#evaluacion`,`clipboardCheck`],[`Ingresar (equipo)`,`/login`,`logIn`]];function Ct(t,r=`/`){return`
    <header class="topbar ${e.menuOpen?`menu-is-open`:``}">
      <a class="brand" href="/" data-link aria-label="Paseos Juan, ir al inicio">
        <span class="brand-mark"><img src="/paseos-juan-logo.png" alt="" /></span>
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <div class="header-actions">
        <a class="header-link ${r===`/precios`?`is-current`:``}" href="/precios" data-link ${r===`/precios`?`aria-current="page"`:``}>Precios</a>
        <a class="header-link" href="/tienda" data-link>Tienda</a>
        <a class="header-cta" href="/#evaluacion" data-link>Pedí tu evaluación</a>
        <button class="menu-button ${e.menuOpen?`is-open`:``}" type="button" data-menu-toggle aria-expanded="${e.menuOpen}" aria-label="Abrir menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
    <div class="menu-backdrop ${e.menuOpen?`is-open`:``}" data-menu-close></div>
    <aside class="mobile-menu ${e.menuOpen?`is-open`:``}" aria-hidden="${!e.menuOpen}">
      <div class="mobile-menu-head">
        <a class="menu-brand" href="/" data-link>
          <img src="/paseos-juan-logo.png" alt="" />
          <span><strong>Paseos Juan</strong><small>Más que un simple paseo</small></span>
        </a>
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menú">${g(`x`)}</button>
      </div>
      <nav class="menu-nav" aria-label="Menú principal">
        ${St.map(([e,t,n])=>`
          <a href="${t}" data-link ${t===r?`aria-current="page"`:``}>
            <span>${g(n,`menu-icon`)}</span>
            ${e}
          </a>
        `).join(``)}
      </nav>
      <a class="menu-evaluation" href="/precios" data-link>Ver precios</a>
      <a class="menu-whatsapp" href="${h(yt)}" target="_blank" rel="noreferrer">WhatsApp ${n.whatsappLabel}</a>
    </aside>
    <div class="smooth-wrapper">${t}</div>
  `}function wt(){return`
    <footer class="footer reveal">
      <a class="menu-brand" href="/" data-link>
        <img src="/paseos-juan-logo.png" alt="" />
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <nav class="footer-links" aria-label="Páginas">
        <a href="/#servicios" data-link>Servicios</a>
        <a href="/precios" data-link>Precios</a>
        <a href="/tienda" data-link>Tienda</a>
      </nav>
      <p>Paseos grupales, baños y más. ${n.zone}.</p>
      <a class="footer-whatsapp" href="${h(yt)}" target="_blank" rel="noreferrer">WhatsApp ${n.whatsappLabel}</a>
    </footer>
  `}function Tt(){return Ct(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${Et()}
      ${kt()}
      ${At()}
      ${jt()}
      ${Mt()}
      ${Qt()}
      ${wt()}
      <a class="whatsapp" href="${h(yt)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function Et(){return`
    <section class="hero" id="inicio">
      <div class="hero-pattern" aria-hidden="true"></div>
      <div class="hero-copy reveal">
        <p class="eyebrow">Paseos · Baños · Estadía · Tienda</p>
        <h1>
          <span>Disciplina.</span>
          <span>Libertad.</span>
          <span>Bienestar.</span>
        </h1>
        <p>
          Paseos grupales organizados por conducta, energía y compatibilidad. Cuidado y confianza
          como en casa, en ${n.zone}.
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="#evaluacion" data-link>Pedí tu evaluación</a>
          <a class="secondary-button" href="#servicios" data-link>Ver servicios</a>
        </div>
      </div>
      <div class="hero-media reveal">
        <div class="dog-frame">
          <img src="/hero-dog-premium.png" alt="Perro atento con arnés, imagen de Paseos Juan" />
        </div>
        <div class="dog-glass-card">
          <span class="glass-icon">${g(`radar`)}</span>
          <strong>Seguimiento del paseo</strong>
          <span>Registramos el retiro, la foto del paseo y la entrega.</span>
        </div>
      </div>
      <a class="scroll-indicator" href="#servicios" data-link aria-label="Bajar a servicios">
        <span>Scroll</span>
        <b>${g(`chevronDown`)}</b>
      </a>
    </section>
  `}function Dt({iconName:e,title:t,text:n,action:r,extraClass:i=``}){return`
    <article class="service-card ${i}">
      <span class="service-icon">${g(e)}</span>
      <h3>${t}</h3>
      <p>${n}</p>
      ${r}
    </article>
  `}function Ot(e,t=`Consultar`){return`<a class="primary-button service-button" href="${h(e)}" target="_blank" rel="noreferrer">${t}</a>`}function kt(){let e=bt()?Dt({iconName:`bone`,title:r.title,text:`${r.detail} Hasta el ${r.untilLabel}.`,action:Ot(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`,`Quiero la promo`),extraClass:`service-card--promo`}):``;return`
    <section class="services-section reveal" id="servicios" aria-labelledby="servicios-titulo">
      <span class="anchor-alias" id="sobre-nosotros" aria-hidden="true"></span>
      <div class="services-heading">
        <p class="eyebrow">Servicios</p>
        <h2 id="servicios-titulo">Todo para tu perro, en un solo lugar.</h2>
      </div>
      <div class="services-grid">
        ${Dt({iconName:`pawPrint`,title:`Paseos grupales`,text:`Grupos armados por conducta, energía y compatibilidad. Antes de sumarlo al grupo, hacemos una evaluación inicial.`,action:Ot(`Hola, quiero consultar por los paseos grupales de Paseos Juan.`)})}
        ${Dt({iconName:`droplets`,title:`Baños`,text:`Baño completo con paseo de ida y vuelta caminando, corte de uñas, lavado de dientes, emprolijamiento y golosina de regalo.`,action:Ot(`Hola, quiero consultar por el baño para mi perro.`)})}
        ${Dt({iconName:`home`,title:`Estadía / guardería`,text:`Consultá disponibilidad por WhatsApp.`,action:Ot(`Hola, quiero consultar disponibilidad de estadía / guardería.`,`Consultar disponibilidad`)})}
        ${Dt({iconName:`shoppingBag`,title:`Tienda de alimento`,text:`Alimento y productos DogPro y CatPro para perros y gatos.`,action:`<a class="primary-button service-button" href="/tienda" data-link>Ver la tienda</a>`,extraClass:`service-card--shop`})}
        ${e}
      </div>
    </section>
  `}function At(){return`
    <section class="prices-strip reveal" id="planes" aria-labelledby="precios-franja-titulo">
      <div>
        <h2 id="precios-franja-titulo">¿Querés ver los precios?</h2>
        <p>Planes semanales, paseo suelto y descuentos por varios perros, todo resumido.</p>
      </div>
      <a class="primary-button" href="/precios" data-link>Ver precios</a>
    </section>
  `}function jt(){return`
    <section class="how-section reveal" id="como-trabajamos" aria-labelledby="como-titulo">
      <div>
        <p class="eyebrow">Cómo trabajamos</p>
        <h2 id="como-titulo">Orden, criterio y presencia.</h2>
      </div>
      <ul class="how-list">
        ${[[`shieldCheck`,`Seguridad`,`Evaluación inicial, checklist en cada salida y seguimiento durante todo el paseo.`],[`users`,`Grupos compatibles`,`Cada grupo se arma según conducta, energía y compatibilidad.`],[`message`,`Comunicación clara`,`Hablamos directo por WhatsApp, sin vueltas.`],[`mapPin`,`Zona`,`${n.zone}. ¿Estás cerca? Escribinos y te confirmamos.`]].map(([e,t,n])=>`
          <li>
            <span class="service-icon">${g(e)}</span>
            <div><strong>${t}</strong><p>${n}</p></div>
          </li>
        `).join(``)}
      </ul>
    </section>
  `}function Mt(){return`
    <section class="trust-section reveal" id="testimonios">
      <div>
        <p class="eyebrow">Nuestro compromiso</p>
        <blockquote>
          "Que tu perro esté tan bien cuidado como cuando lo cuidás vos."
        </blockquote>
        <cite>Paseos Juan · ${n.zone}</cite>
      </div>
      <div class="faq" id="faq">
        <h3>Preguntas frecuentes</h3>
        ${se(`¿Cómo empieza el servicio?`,`Con una evaluación inicial para conocer conducta, energía, vacunas y compatibilidades, antes de sumarlo al grupo.`)}
        ${se(`¿En qué zona trabajan?`,`En ${n.zone}. Si estás cerca y no sabés si llegamos, escribinos y te confirmamos.`)}
        ${se(`¿Qué pasa si mi perro no se lleva bien con otros perros?`,`Lo evaluamos antes de sumarlo a un grupo y te contamos si puede sumarse o qué adaptación necesita.`)}
        ${se(`¿Dónde veo los precios?`,`En la página de precios, con todos los planes resumidos.`)}
        ${se(`¿Cómo consulto disponibilidad?`,`Escribinos por WhatsApp al ${n.whatsappLabel} o completá el formulario de evaluación.`)}
      </div>
    </section>
  `}var Nt=`paseosJuan_evaluacionBorrador`,Pt=[`perro`,`responsable`,`telefono`,`tamano`,`energia`,`perros`,`mordida`,`horario`,`dias`,`conducta`,`edad`,`raza`,`zona`,`referencia`,`email`,`comentario`],Ft=[`edad`,`raza`,`zona`,`referencia`,`email`,`comentario`],It=[[`perro`,`nombre del perro`],[`responsable`,`tu nombre`],[`telefono`,`WhatsApp`]],Lt=null,Rt=!1;function zt(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e.at(-1)}`:e[0]||``}function Bt(e){return It.filter(([t])=>!String(e[t]||``).trim()).map(([,e])=>e)}function Vt(e){return e.length?`Falta: ${zt(e)}`:`Listo para enviar`}function Ht(e){try{let t=e.split(`.`)[1].replace(/-/g,`+`).replace(/_/g,`/`),n=atob(t.padEnd(t.length+(4-t.length%4)%4,`=`)),r=Uint8Array.from(n,e=>e.charCodeAt(0)),i=JSON.parse(new TextDecoder().decode(r));return{email:String(i.email||``),nombre:String(i.name||``)}}catch{return{email:``,nombre:``}}}var Ut=[[`L`,`Lunes`],[`M`,`Martes`],[`X`,`Miércoles`],[`J`,`Jueves`],[`V`,`Viernes`],[`S`,`Sábado`],[`D`,`Domingo`]];function Wt(){try{let e=JSON.parse(localStorage.getItem(Nt));return e&&typeof e==`object`?e:{}}catch{return{}}}function Gt(e){try{Object.values(e).some(e=>Array.isArray(e)?e.length:String(e).trim())?localStorage.setItem(Nt,JSON.stringify(e)):localStorage.removeItem(Nt)}catch{}}function Kt(){try{localStorage.removeItem(Nt)}catch{}}function qt(){return typeof window<`u`&&!!(window.SpeechRecognition||window.webkitSpeechRecognition)}var Jt=`<svg class="mic-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>`;function Yt(e,t,n){return n?`<button class="mic-mini" type="button" data-dictar="${e}" aria-pressed="false" aria-label="Dictar ${t}" title="Dictar ${t}">${Jt}</button>`:``}function Xt({name:e,label:t,draft:n,voice:r,required:i=!1,placeholder:a=``,autocomplete:o=`off`,type:s=`text`,inputmode:c=``,what:l=``}){return`
    <label class="quick-field"><span>${t}${i?` <span class="req" aria-hidden="true">*</span>`:``}</span>
      <span class="field-with-mic">
        <input name="${e}" type="${s}" ${i?`required`:``} autocomplete="${o}" ${c?`inputmode="${c}"`:``} placeholder="${a}" value="${xt(n[e]||``)}" />
        ${l?Yt(e,l,r):``}
      </span>
    </label>
  `}function Zt({name:e,legend:t,options:n,draft:r,multiple:i=!1}){let a=r[e],o=e=>i?Array.isArray(a)&&a.includes(e):a===e;return`
    <fieldset class="choice-group ${i?`choice-group--days`:``}">
      <legend>${t}</legend>
      <div class="choice-row">
        ${n.map(([t,n,r])=>`
          <label class="choice">
            <input type="${i?`checkbox`:`radio`}" name="${e}" value="${n}" ${o(n)?`checked`:``} />
            <span>${r?`<span aria-hidden="true">${t}</span><span class="visually-hidden">${r}</span>`:t}</span>
          </label>
        `).join(``)}
      </div>
    </fieldset>
  `}function Qt(){let e=Wt(),t=qt(),n=Ft.some(t=>String(e[t]||``).trim()),r=Bt(e);return`
    <section class="contact-section reveal" id="contacto">
      <div class="evaluation-heading">
        <p class="eyebrow">Evaluación inicial</p>
        <h2>Pedí tu evaluación en 1 minuto</h2>
        <p>Con 3 datos alcanza. Lo demás, si querés, lo dictás o nos lo contás por WhatsApp.</p>
      </div>
      <form class="evaluation-form quick-form" id="evaluacion" data-evaluation-form novalidate>
        <label class="visually-hidden" aria-hidden="true">No completar <input name="sitio" tabindex="-1" autocomplete="off" /></label>
        <input type="hidden" name="tipo" value="Grupal" />

        <fieldset class="evaluation-board quick-required">
          <legend>Lo único obligatorio</legend>
          <div class="google-box" data-google-box ${Rt||Lt?``:`hidden`}>
            <div class="google-button" data-google-boton ${Lt?`hidden`:``}></div>
            <p class="google-connected" data-google-connected ${Lt?``:`hidden`}>
              Conectado como <strong data-google-email>${xt(Lt?.email||``)}</strong> ·
              <button class="link-button" type="button" data-google-cambiar>Cambiar</button>
            </p>
            <p class="google-or" aria-hidden="true" ${Lt?`hidden`:``}>o completá a mano</p>
          </div>
          ${Xt({name:`perro`,label:`Nombre del perro`,draft:e,voice:t,required:!0,placeholder:`Ej. Luna`,what:`el nombre del perro`})}
          ${Xt({name:`responsable`,label:`Tu nombre`,draft:e,voice:t,required:!0,placeholder:`Tu nombre`,autocomplete:`name`,what:`tu nombre`})}
          ${Xt({name:`telefono`,label:`Tu WhatsApp`,draft:e,voice:t,required:!0,placeholder:`11 0000 0000`,autocomplete:`tel`,type:`tel`,inputmode:`tel`})}
        </fieldset>

        <fieldset class="evaluation-board quick-optional">
          <legend>Si querés, sumá más (opcional)</legend>
          ${Zt({name:`tamano`,legend:`Tamaño`,draft:e,options:[[`Chico`,`Pequeño`],[`Mediano`,`Mediano`],[`Grande`,`Grande`]]})}
          ${Zt({name:`energia`,legend:`Energía`,draft:e,options:[[`Baja`,`Baja`],[`Media`,`Media`],[`Alta`,`Alta`]]})}
          ${Zt({name:`perros`,legend:`¿Se lleva bien con otros perros?`,draft:e,options:[[`Sí`,`Sí`],[`No`,`No`],[`Depende`,`Depende`]]})}
          ${Zt({name:`mordida`,legend:`¿Alguna vez mordió o intentó morder?`,draft:e,options:[[`No`,`No`],[`Sí`,`Sí`],[`No sé`,`No estoy seguro`]]})}
          ${Zt({name:`horario`,legend:`Turno`,draft:e,options:[[`Mañana`,`Mañana`],[`Tarde`,`Tarde`],[`Indistinto`,`Indistinto`]]})}
          ${Zt({name:`dias`,legend:`Días (tocá todos los que quieras)`,draft:e,multiple:!0,options:Ut.map(([e,t])=>[e,t,t])})}

          <div class="voice-field">
            <label for="campo-conducta">Contanos de tu perro</label>
            <textarea id="campo-conducta" name="conducta" placeholder="Miedos, si tira de la correa, cómo se porta con otros perros…">${xt(e.conducta||``)}</textarea>
            ${t?`<button class="voice-button" type="button" data-dictar="conducta" aria-pressed="false">${Jt}<span data-voice-label>Hablar</span></button>`:`<p class="voice-hint">Tocá el micrófono de tu teclado para dictar.</p>`}
          </div>
          <p class="visually-hidden" data-voice-status role="status" aria-live="polite"></p>

          <details class="quick-more" ${n?`open`:``}>
            <summary>Contanos más (opcional)</summary>
            <div class="form-grid">
              ${Xt({name:`edad`,label:`Edad`,draft:e,voice:t,placeholder:`Ej. 4 años`,what:`la edad`})}
              ${Xt({name:`raza`,label:`Raza o cruza`,draft:e,voice:t,placeholder:`Ej. Mestizo`,what:`la raza`})}
              ${Xt({name:`zona`,label:`Barrio o zona`,draft:e,voice:t,placeholder:`Ej. Pilar`,what:`el barrio`})}
              ${Xt({name:`referencia`,label:`Barrio privado o referencia`,draft:e,voice:t,placeholder:`Ej. nombre del barrio`,what:`la referencia`})}
              ${Xt({name:`email`,label:`Correo`,draft:e,voice:t,placeholder:`Se completa solo con Google`,autocomplete:`email`,type:`email`,inputmode:`email`})}
              <label class="span-2">Carnet de vacunas
                <input name="carnet" type="file" accept="image/*,application/pdf" capture="environment" />
                <small class="field-help">Sacale una foto o subí el PDF. Lo guardamos privado y solo lo ve el equipo.</small>
              </label>
              <label class="span-2">Comentario
                <span class="field-with-mic">
                  <textarea name="comentario" placeholder="Algo más que quieras contarnos">${xt(e.comentario||``)}</textarea>
                  ${Yt(`comentario`,`un comentario`,t)}
                </span>
              </label>
            </div>
          </details>

        </fieldset>
        <p class="quick-note">Se abre WhatsApp con tus respuestas listas: solo tocás Enviar. Te contestamos para coordinar la evaluación.</p>

        <div class="quick-submit-bar" data-submit-bar>
          <div class="quick-submit-text">
            <p class="quick-missing" data-missing aria-live="polite">${Vt(r)}</p>
            <p class="evaluation-status" data-evaluation-status role="status" aria-live="polite"></p>
          </div>
          <button class="primary-button quick-submit" type="submit" data-quick-submit aria-disabled="${r.length>0}">Enviar</button>
        </div>
      </form>
    </section>
  `}function $t(e,t){return t===`dias`?e.getAll(`dias`).map(String).join(`, `):(e.get(t)||``).toString().trim()}function en(e){let t=(t,n)=>$t(e,n)?`${t}: ${$t(e,n)}`:null,n=(e,t)=>{let n=t.filter(Boolean);return n.length?[``,e,...n]:[]};return[`Hola, quiero pedir una evaluación para mi perro.`,...n(`*Perro*`,[t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`)]),...n(`*Conducta y energía*`,[t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Sobre el perro`,`conducta`)]),...n(`*Responsable*`,[t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Correo`,`email`),t(`Zona`,`zona`),t(`Referencia`,`referencia`)]),...n(`*Preferencias*`,[t(`Turno`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`)]),e.get(`carnet`)?.size?`
Carnet de vacunas: lo adjunté en el formulario de la página.`:null].filter(e=>e!==null).join(`
`)}function tn(e){let t=new FormData(e);return Object.fromEntries(Pt.map(e=>[e,e===`dias`?t.getAll(`dias`).map(String):$t(t,e)]))}function nn(e){for(let t of e.elements)t.type!==`hidden`&&t.name!==`sitio`&&t.name&&(t.type===`radio`||t.type===`checkbox`?t.checked=!1:t.value=``)}function rn(e){let t=Bt(Object.fromEntries(It.map(([t])=>[t,e.elements[t]?.value||``]))),n=Vt(t),r=e.querySelector(`[data-missing]`);r&&r.textContent!==n&&(r.textContent=n),e.querySelector(`[data-quick-submit]`)?.setAttribute(`aria-disabled`,String(t.length>0))}function an(e){let t=e.target.closest?.(`[data-evaluation-form]`);t&&e.target.name!==`carnet`&&e.target.name!==`sitio`&&(e.target.hasAttribute(`aria-invalid`)&&e.target.value.trim()&&e.target.removeAttribute(`aria-invalid`),Gt(tn(t)),rn(t))}function on(e){let t=e.querySelector(`[data-google-box]`);t&&(t.hidden=!(Rt||Lt),e.querySelector(`[data-google-boton]`).hidden=!!Lt,e.querySelector(`[data-google-connected]`).hidden=!Lt,e.querySelector(`[data-google-email]`).textContent=Lt?.email||``,e.querySelector(`.google-or`).hidden=!!Lt)}function sn(e){let t=document.querySelector(`[data-evaluation-form]`),{email:n,nombre:r}=Ht(e);if(Lt={credential:e,email:n,nombre:r},!t)return;r&&!t.elements.responsable.value.trim()&&(t.elements.responsable.value=r),n&&(t.elements.email.value=n),Gt(tn(t)),rn(t),on(t);let i=t.querySelector(`[data-evaluation-status]`);i.classList.remove(`is-error`),i.textContent=`Listo, conectado con Google.`}async function cn(){let e=document.querySelector(`[data-evaluation-form]`),t=e?.querySelector(`[data-google-boton]`);t&&!t.dataset.mounted&&(t.dataset.mounted=`1`,Rt=!!await ht(t,sn).catch(()=>!1),e.isConnected&&on(e))}function ln(e){let t=e.target.closest?.(`[data-google-cambiar]`);if(!t)return;let n=t.closest(`[data-evaluation-form]`);Lt&&n.elements.email.value===Lt.email&&(n.elements.email.value=``),Lt=null;try{window.google?.accounts?.id?.disableAutoSelect?.()}catch{}Gt(tn(n)),on(n),n.querySelector(`[data-evaluation-status]`).textContent=`Elegí otra cuenta de Google o completá a mano.`}function un(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault(),mn();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu WhatsApp para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(h(en(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,Kt();let a=i.get(`carnet`),o={};for(let e of new Set(i.keys()))e!==`carnet`&&(o[e]=e===`dias`?$t(i,`dias`):i.get(e));Lt&&(o.googleCredential=Lt.credential),(async()=>{if(a&&a.size)try{o.carnet=await ut(a)}catch(e){n.textContent=`${e.message} Tu pedido igual se envía; el carnet mandalo por WhatsApp.`}await ot(o)})().then(()=>{nn(t),Lt=null,on(t),rn(t),n.textContent=o.carnet?`Listo: recibimos tu pedido y el carnet. Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`:`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}var dn=null;function fn(e){let t=document.querySelector(`[data-voice-status]`);t&&(t.textContent=e)}function pn(e,t){e.setAttribute(`aria-pressed`,String(t)),e.classList.toggle(`is-listening`,t);let n=e.querySelector(`[data-voice-label]`);n&&(n.textContent=t?`Frenar`:`Hablar`),n||e.setAttribute(`aria-label`,t?`Frenar el dictado`:e.title)}function mn(){dn&&dn.recognition.stop()}function hn(e){let t=window.SpeechRecognition||window.webkitSpeechRecognition,n=e.closest(`[data-evaluation-form]`)?.elements[e.dataset.dictar];if(!t||!n)return;if(dn){let t=dn.button===e;if(dn.recognition.stop(),t)return}let r=new t,i=n.tagName===`TEXTAREA`;r.lang=`es-AR`,r.interimResults=!0,r.continuous=i,r.maxAlternatives=1;let a=i?n.value.trim():``,o={recognition:r,button:e,field:n};dn=o,r.onstart=()=>{pn(e,!0),n.classList.add(`is-dictating`),fn(`Te escucho. Hablá ahora.`)},r.onresult=e=>{let t=``;for(let n=0;n<e.results.length;n+=1)t+=e.results[n][0].transcript;t=t.trim(),n.value=a&&t?`${a} ${t}`:a||t,n.dispatchEvent(new Event(`input`,{bubbles:!0}))},r.onerror=e=>{fn({"not-allowed":`No hay permiso para usar el micrófono. Podés escribir o usar el micrófono del teclado.`,"service-not-allowed":`No hay permiso para usar el micrófono. Podés escribir o usar el micrófono del teclado.`,"no-speech":`No escuché nada. Tocá de nuevo para probar.`,"audio-capture":`No encontramos un micrófono. Podés escribir.`}[e.error]||`No se pudo dictar. Podés escribir.`),o.failed=!0},r.onend=()=>{pn(e,!1),n.classList.remove(`is-dictating`),o.failed||fn(`Listo, terminé de escuchar. Revisá el texto.`),dn===o&&(dn=null)};try{r.start()}catch{dn=null,fn(`No se pudo usar el micrófono. Podés escribir.`)}}function gn(e){let t=e.target.closest?.(`[data-dictar]`);t&&(e.preventDefault(),hn(t))}function _n(){document.addEventListener(`submit`,un),document.addEventListener(`input`,an),document.addEventListener(`change`,an),document.addEventListener(`click`,gn),document.addEventListener(`click`,ln);let e=document.getElementById(`app`);e&&new MutationObserver(()=>cn()).observe(e,{childList:!0})}var x=`Pendiente de confirmar`,vn=`12/11/2026`,yn={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},bn=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],xn={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},S={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},C=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],Sn=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],Cn={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},wn=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Tn={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},w=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),En=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Dn=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],On=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function kn(e,t,n){return!!e.schedule?.[t]?.includes(n)}function An(e=new Date){return C[(e.getDay()+6)%7]}function jn(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var Mn=[[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Flora`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,20,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Lunes`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Coqui`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Manolo`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Lunes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Martes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:15`,`Forest`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:30`,`Sam`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:45`,`Coqui`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:00`,`Manolo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Séptima`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Rambo`,20,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam ni Cashi`],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Morris`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:45`,`Lokaku`,45,`Bozal`],[`Miércoles`,`Mañana`,`PJ_1M`,`11:00`,`Paco`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Tayler`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Duque`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:30`,`Rambo`,20,``],[`Miércoles`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:30`,`Annie`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:45`,`Séptima`,45,`Sin días contratados cargados`],[`Miércoles`,`Tarde`,`PJ_2T`,`16:00`,`Milo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:15`,`Flora`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Jueves`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`11:00`,`Rambo`,20,``],[`Jueves`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`14:45`,`Forest`,45,`Bozal`],[`Jueves`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Jueves`,`Tarde`,`PJ_1T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Jueves`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`16:15`,`Rambo`,20,`Revisar duración`],[`Viernes`,`Mañana`,`PJ_1M`,`09:45`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Runa`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:50`,`Kiara`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Flora`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Viernes`,`Tarde`,`PJ_2T`,`14:45`,`Coqui`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`16:00`,`Séptima`,45,`Sin días contratados cargados`],[`Viernes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Viernes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,5,`Revisar duración`],[`Sábado`,`Mañana`,`PJ_1M`,`09:15`,`Sam`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`14:45`,`Forest`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Roma`,55,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Milo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`16:00`,`Tayler`,45,``]],Nn={"Lunes|Mañana":`Juan`,"Lunes|Tarde":`Nicolás`,"Martes|Mañana":`Juan`,"Martes|Tarde":`Nicolás`,"Miércoles|Mañana":`Juan`,"Miércoles|Tarde":`Nicolás`,"Jueves|Mañana":`Juan`,"Jueves|Tarde":`Nicolás`,"Viernes|Mañana":`Nicolás`,"Viernes|Tarde":`Nicolás`,"Sábado|Mañana":`Juan`,"Sábado|Tarde":`Juan`},Pn=new Map(w.map(e=>[e.name,e]));function Fn(e,t){let[n,r]=e.split(`:`).map(Number),i=n*60+r+Number(t||0);return`${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}var In=Mn.map(([e,t,n,r,i,a,o])=>({dia:e,turno:t,ruta:n,hora:r,perroId:Pn.get(i)?.id||null,perroNombre:i,minutos:a,salida:Fn(r,a),nota:o}));function Ln(){let e=new Map;return In.forEach(t=>{let n=`${t.ruta}_${t.dia.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}`;e.has(n)||e.set(n,{id:n,dia:t.dia,turno:t.turno,ruta:t.ruta,paseador:``,ayudante:``,supervisor:Nn[`${t.dia}|${t.turno}`]||``,paradas:[],origen:`Planilla RPJ, BASE RUTAS (12/11/2026)`}),e.get(n).paradas.push({perroId:t.perroId,perroNombre:t.perroNombre,hora:t.hora,minutos:t.minutos,nota:t.nota})}),[...e.values()].map(e=>({...e,paradas:e.paradas.sort((e,t)=>e.hora.localeCompare(t.hora))}))}var Rn=[`Mapuche Country Club`,`La Lonja`,`Pilar (otros barrios)`],zn=`12/11/2026`,Bn=[`Pequeño`,`Mediano`,`Grande`],Vn=Sn.map(e=>({id:e.id,nombre:e.name,paseosPorSemana:e.walks,precios:e.prices})),Hn=Object.fromEntries(Bn.map(e=>[e,Cn[e].grupo])),Un=wn.map(e=>({perros:e.dogs,descuento:e.discount})),Wn=[{id:`banos`,nombre:`Baños`,mensaje:`Hola, quiero consultar el precio del baño para mi perro.`},{id:`estadia`,nombre:`Estadía / guardería`,mensaje:`Hola, quiero consultar disponibilidad y precio de estadía / guardería.`}];function Gn(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var Kn=`Hola, vi los precios en la página y quiero contratar paseos grupales para mi perro.`;function qn({caption:e,filas:t}){return`
    <div class="precios-table-wrap">
      <table class="precios-table">
        <caption class="visually-hidden">${e}</caption>
        <thead>
          <tr>
            <th scope="col"><span class="visually-hidden">Opción</span></th>
            ${Bn.map(e=>`<th scope="col">${e}</th>`).join(``)}
          </tr>
        </thead>
        <tbody>
          ${t.map(e=>`
            <tr>
              <th scope="row">${e.titulo}${e.detalle?`<small>${e.detalle}</small>`:``}</th>
              ${Bn.map(t=>`<td>${Gn(e.precios[t])}</td>`).join(``)}
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `}function Jn(){return Ct(`
    <main class="precios-main">
      <header class="precios-head">
        <p class="eyebrow">Precios</p>
        <h1>Precios de Paseos Juan</h1>
        <p class="precios-fecha">Precios vigentes al <strong>${zn}</strong></p>
      </header>

      <section class="precios-card" aria-labelledby="planes-titulo">
        <h2 id="planes-titulo">Planes semanales</h2>
        <p class="precios-sub">Paseos grupales. Precio por semana y por perro, según su tamaño.</p>
        ${qn({caption:`Planes semanales: precio por semana y por perro según tamaño`,filas:Vn.map(e=>({titulo:e.nombre,detalle:`${e.paseosPorSemana} paseos por semana`,precios:e.precios}))})}
      </section>

      <section class="precios-card" aria-labelledby="suelto-titulo">
        <h2 id="suelto-titulo">Paseo suelto</h2>
        <p class="precios-sub">Un paseo grupal, sin plan.</p>
        ${qn({caption:`Paseo suelto grupal: precio por paseo según tamaño`,filas:[{titulo:`Grupal`,detalle:`1 paseo`,precios:Hn}]})}
      </section>

      <section class="precios-card" aria-labelledby="descuentos-titulo">
        <h2 id="descuentos-titulo">Varios perros en casa</h2>
        <p class="precios-sub">Descuento según cuántos perros pasean con nosotros.</p>
        <ul class="precios-descuentos">
          ${Un.map(e=>`
            <li><strong>${e.descuento}</strong><span>${e.perros} perros</span></li>
          `).join(``)}
        </ul>
      </section>

      <section class="precios-card" aria-labelledby="consultar-titulo">
        <h2 id="consultar-titulo">Otros servicios</h2>
        <ul class="precios-consultar">
          ${Wn.map(e=>`
            <li>
              <div><strong>${e.nombre}</strong><span>Consultá por WhatsApp</span></div>
              <a class="secondary-button" href="${h(e.mensaje)}" target="_blank" rel="noreferrer" aria-label="Consultar ${e.nombre} por WhatsApp">Consultar</a>
            </li>
          `).join(``)}
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
          <a class="primary-button" href="${h(Kn)}" target="_blank" rel="noreferrer">Contratar por WhatsApp</a>
          <a class="secondary-button" href="/#evaluacion" data-link>Pedí tu evaluación</a>
        </div>
        <small>WhatsApp ${n.whatsappLabel}</small>
      </section>
    </main>
    ${wt()}
  `,`/precios`)}var Yn={nombre:`Tienda`,nombreConfirmado:!1,aliado:`Aliado de Paseos Juan`,fabricante:`VitalCrops`},Xn=[{id:`dogpro`,nombre:`DogPro`,para:`Para perros`,marca:`DogPro`,fabricante:`VitalCrops`,presentacion:x,precio:null,foto:null},{id:`catpro`,nombre:`CatPro`,para:`Para gatos`,marca:`CatPro`,fabricante:`VitalCrops`,presentacion:x,precio:null,foto:null}],Zn=`paseosJuan_tiendaCarrito`,Qn=99,$n={};function T(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function er(){let e=$n;try{let t=JSON.parse(localStorage.getItem(Zn));t&&typeof t==`object`&&(e=t)}catch{}let t={};for(let n of Xn){let r=Math.min(Qn,Math.max(0,Math.floor(Number(e[n.id])||0)));r&&(t[n.id]=r)}return t}function tr(e){$n=e;try{Object.keys(e).length?localStorage.setItem(Zn,JSON.stringify(e)):localStorage.removeItem(Zn)}catch{}}function nr(e){return Object.values(e).reduce((e,t)=>e+t,0)}function rr(e){return typeof e.precio==`number`?`$${e.precio.toLocaleString(`es-AR`)}`:x}function ir(e){let t=Xn.filter(t=>e[t.id]).map(t=>`- ${t.nombre} (${t.para.toLowerCase()}): ${e[t.id]}`);return[`Hola, quiero hacer un pedido en la ${Yn.nombre} (aliada de Paseos Juan):`,...t,``,`¿Me confirmás presentación, precio y disponibilidad?`].join(`
`)}function ar(e,t){let n=t[e.id]||0;return`
    <article class="tienda-product" aria-labelledby="producto-${e.id}">
      ${e.foto?`<img class="tienda-photo" src="${T(e.foto)}" alt="${T(e.nombre)}, ${T(e.para.toLowerCase())}" />`:`<div class="tienda-photo tienda-photo--pending" role="img" aria-label="Foto de ${T(e.nombre)}: pendiente de confirmar">
            ${g(`packageCheck`)}<span>Foto pendiente</span>
          </div>`}
      <div class="tienda-product-body">
        <p class="tienda-tag">${T(e.para)}</p>
        <h2 id="producto-${e.id}">${T(e.nombre)}</h2>
        <p class="tienda-maker">Marca de ${T(e.fabricante)}</p>
        <dl class="tienda-specs">
          <div><dt>Presentación</dt><dd>${T(e.presentacion)}</dd></div>
          <div><dt>Precio</dt><dd>${T(rr(e))}</dd></div>
        </dl>
        ${n?`<div class="tienda-qty" role="group" aria-label="Cantidad de ${T(e.nombre)}">
              <button type="button" data-tienda="restar" data-id="${e.id}" aria-label="Restar un ${T(e.nombre)}">−</button>
              <output aria-live="off">${n}</output>
              <button type="button" data-tienda="sumar" data-id="${e.id}" aria-label="Sumar un ${T(e.nombre)}" ${n>=Qn?`disabled`:``}>+</button>
            </div>`:`<button class="tienda-add" type="button" data-tienda="sumar" data-id="${e.id}">Sumar al pedido</button>`}
      </div>
    </article>
  `}function or(e){let t=Xn.filter(t=>e[t.id]);return`
    <h2 id="carrito-titulo">Tu pedido ${t.length?`<span class="tienda-count">${nr(e)}</span>`:``}</h2>
    ${t.length?`<ul class="tienda-cart-list">
          ${t.map(t=>`
            <li>
              <div class="tienda-cart-name"><strong>${T(t.nombre)}</strong><span>${T(t.para)}</span></div>
              <div class="tienda-qty tienda-qty--small" role="group" aria-label="Cantidad de ${T(t.nombre)}">
                <button type="button" data-tienda="restar" data-id="${t.id}" data-donde="carrito" aria-label="Restar un ${T(t.nombre)}">−</button>
                <output>${e[t.id]}</output>
                <button type="button" data-tienda="sumar" data-id="${t.id}" data-donde="carrito" aria-label="Sumar un ${T(t.nombre)}" ${e[t.id]>=Qn?`disabled`:``}>+</button>
              </div>
              <button class="tienda-remove" type="button" data-tienda="quitar" data-id="${t.id}" data-donde="carrito">Quitar<span class="visually-hidden"> ${T(t.nombre)}</span></button>
            </li>
          `).join(``)}
        </ul>
        <p class="tienda-cart-note">Sin pago online: te confirmamos presentación, precio y disponibilidad por WhatsApp.</p>
        <button class="tienda-order" type="button" data-tienda="pedir">${g(`message`)}<span>Pedir por WhatsApp</span></button>`:`<p class="tienda-empty">Todavía no sumaste productos.</p>`}
  `}function sr(){let e=er();return`
    <div class="tienda-page">
      <header class="tienda-bar">
        <a class="tienda-brand" href="/tienda" data-link aria-label="${T(Yn.nombre)}, ${T(Yn.aliado)}">
          <span class="tienda-logo" aria-hidden="true">${g(`shoppingBag`)}</span>
          <span><strong>${T(Yn.nombre)}</strong><small>${T(Yn.aliado)}</small></span>
        </a>
        <a class="tienda-cart-link" href="/tienda#carrito" data-link>
          ${g(`shoppingBag`)}<span>Pedido</span><b data-tienda-badge>${nr(e)}</b>
        </a>
      </header>

      <main class="tienda-main">
        <a class="tienda-back" href="/" data-link>← Volver a Paseos Juan</a>
        <section class="tienda-hero" aria-labelledby="tienda-titulo">
          <p class="tienda-eyebrow">Alimento y productos</p>
          <h1 id="tienda-titulo">Para perros y gatos.</h1>
          <p>DogPro y CatPro, de ${T(Yn.fabricante)}. Armá tu pedido y mandalo por WhatsApp.</p>
        </section>

        <section class="tienda-grid" aria-label="Productos" data-tienda-productos>
          ${Xn.map(t=>ar(t,e)).join(``)}
        </section>

        <p class="tienda-health">${g(`heartPulse`)}<span>Si tu mascota tiene alguna condición de salud, consultá antes con su veterinario.</span></p>

        <section class="tienda-cart" id="carrito" aria-labelledby="carrito-titulo" tabindex="-1" data-tienda-carrito>
          ${or(e)}
        </section>
        <p class="visually-hidden" data-tienda-status role="status" aria-live="polite"></p>
      </main>

      <footer class="tienda-footer">
        <p><strong>${T(Yn.nombre)}</strong> · ${T(Yn.aliado)}</p>
        <p>DogPro y CatPro son marcas de ${T(Yn.fabricante)}, usadas con su autorización.</p>
        <a href="/" data-link>Volver a Paseos Juan</a>
      </footer>
    </div>
  `}function cr(e,t){let n=document.querySelector(`[data-tienda-productos]`),r=document.querySelector(`[data-tienda-carrito]`);if(!n||!r)return;n.innerHTML=Xn.map(t=>ar(t,e)).join(``),r.innerHTML=or(e);let i=document.querySelector(`[data-tienda-badge]`);i&&(i.textContent=nr(e));let a=t.donde===`carrito`?r:n;(a.querySelector(`[data-tienda="${t.action}"][data-id="${t.id}"]:not([disabled])`)||a.querySelector(`[data-id="${t.id}"]:not([disabled])`)||(t.donde===`carrito`?r:n.querySelector(`[data-id="${t.id}"]`)))?.focus()}function lr(e){let t=document.querySelector(`[data-tienda-status]`);t&&(t.textContent=e)}function ur(e){let t=e.target.closest?.(`[data-tienda]`);if(!t)return;let n=t.dataset.tienda,r=er();if(n===`pedir`){if(!nr(r))return;window.open(h(ir(r)),`_blank`,`noopener`),lr(`Se abrió WhatsApp con tu pedido: solo falta tocar Enviar.`);return}let i=t.dataset.id,a=Xn.find(e=>e.id===i);if(!a)return;let o=r[i]||0;n===`sumar`&&(r[i]=Math.min(Qn,o+1)),n===`restar`&&(r[i]=Math.max(0,o-1)),n===`quitar`&&(r[i]=0),r[i]||delete r[i],tr(r),cr(r,{action:n,id:i,donde:t.dataset.donde||`productos`}),lr(r[i]?`${a.nombre}: ${r[i]} en tu pedido.`:`Sacaste ${a.nombre} del pedido.`)}function dr(){document.addEventListener(`click`,ur)}var fr=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),pr={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function mr(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function hr(){let e=v.user();if(e)return gr(e);pr.necesitaConfiguracion===null&&!pr.cargando&&(pr.cargando=!0,v.status().then(e=>{pr.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{pr={...pr,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{pr.cargando=!1,$()}));let t=pr.necesitaConfiguracion===!0;return ne(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${pr.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Código de configuración <input name="codigo" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Te lo pasó JUAN 3.0" /></label>`:``}
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>
        ${t?``:`<div class="acc-google" data-acc-google hidden><span class="acc-o">o</span><div data-acc-google-boton></div></div>`}`}
        <p class="acc-status ${pr.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${fr(pr.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function gr(e){return ne(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${fr(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${fr(e.usuario)}</strong> (${fr(e.rol)}).</p>
        <div class="acc-actions">
          ${Qe(e.rol)===`/`?``:`<a class="acc-button" href="${Qe(e.rol)}" data-link>Ir a mi panel</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cerrar sesión</a>
        </div>
        ${e.debeCambiarPin?`<p class="acc-alert" role="alert"><strong>Cambiá tu PIN inicial.</strong> Te lo pasó Juan por WhatsApp: elegí uno propio que solo sepas vos.</p>`:``}
        <details class="acc-pin" ${e.debeCambiarPin?`open`:``}>
          <summary>Cambiar mi PIN</summary>
          <form class="acc-form" data-acc-form="pin" novalidate>
            <label>PIN actual <input name="actual" type="password" inputmode="numeric" autocomplete="current-password" required /></label>
            <label>PIN nuevo <input name="nuevo" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
            <label>Repetí el PIN nuevo <input name="nuevo2" type="password" inputmode="numeric" autocomplete="new-password" required /></label>
            <button class="acc-button" type="submit">Guardar PIN nuevo</button>
          </form>
        </details>
        <p class="acc-status" data-acc-status role="status" aria-live="polite"></p>
      </section>
    </main>
  `)}function _r(){return ne(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Cuentas</p>
        <h1>¿Querés sumarte?</h1>
        <p class="acc-lead">Las cuentas del equipo las crea Juan desde el panel del admin. Si sos tutor y querés que paseemos a tu perro, pedí una evaluación: te contestamos por WhatsApp.</p>
        <div class="acc-actions">
          <a class="acc-button" href="/#evaluacion" data-link>Pedir una evaluación</a>
          <a class="acc-button is-secondary" href="/login" data-link>Ya tengo usuario</a>
        </div>
      </section>
    </main>
  `)}function vr(e){let t=v.user(),n=Xe[t?.rol]||[];return ne(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${fr(t?.nombre)}</strong> (${fr(t?.rol)}) y la página de ${fr(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function yr(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function br(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return yr(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return yr(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return yr(t,`Completá usuario y PIN.`,!0);i.disabled=!0,yr(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await v.changePin(r.actual,r.nuevo);t.reset(),yr(t,`Listo: tu PIN quedó cambiado.`),Qe(e.rol)!==`/`&&setTimeout(()=>l_(Qe(e.rol)),900);return}let e=n===`setup`?await v.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin,codigo:r.codigo}):await v.login(r.usuario,r.pin);if(pr={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){l_(`/login`);return}let i=mr();l_(i&&(Xe[e.rol]||[]).includes(i.slice(1))?i:Qe(e.rol))}catch(e){yr(t,e instanceof Ye?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function xr(){document.addEventListener(`submit`,br)}async function Sr(){let e=document.querySelector(`[data-acc-google]`),t=e?.querySelector(`[data-acc-google-boton]`);e&&t&&!t.dataset.montado&&(t.dataset.montado=`1`,e.hidden=!await ht(t,async e=>{let t=document.querySelector(`[data-acc-status]`);try{t&&(t.textContent=`Entrando con Google…`);let n=await v.loginGoogle(e);l_(n.debeCambiarPin?`/login`:Qe(n.rol))}catch(e){t&&(t.textContent=e.message,t.classList.add(`is-error`))}},{texto:`signin_with`}).catch(()=>!1))}new MutationObserver(()=>Sr()).observe(document.getElementById(`app`)||document.body,{childList:!0,subtree:!0});var Cr={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},wr=`Tu perro`,Tr={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},Er=[`Pequeño`,`Mediano`,`Grande`],Dr=C.filter(e=>e!==`Domingo`),Or={Mañana:S.manana,Tarde:S.tarde};function kr(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ar(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function jr(){let e=kr(Cr.plan,null);if(!e||typeof e!=`object`)return{...Tr};let t=Sn.find(t=>t.id===e.planId)?e.planId:Tr.planId,n=Er.includes(e.size)?e.size:Tr.size,r=Or[e.shift]?e.shift:Tr.shift,i=Array.isArray(e.days)?Dr.filter(t=>e.days.includes(t)):Tr.days;return{planId:t,size:n,shift:r,days:i.length?i:Tr.days}}function Mr(){let e=kr(Cr.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function Nr(){let e=kr(Cr.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function Pr(e){let t=kr(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function Fr(){let e=kr(Cr.carnet,null);return e&&typeof e.name==`string`?e:null}function E(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Ir(e){return`https://wa.me/${yn.whatsapp}?text=${encodeURIComponent(e)}`}function Lr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function Rr(e,t){return new Date(e.getTime()+t*864e5)}function zr(e){return C[(e.getUTCDay()+6)%7]}function Br(e){return e.toISOString().slice(0,10)}function Vr(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function Hr(e){let[t,n,r]=e.split(`-`).map(Number);return Vr(new Date(Date.UTC(t,n-1,r)))}function Ur(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function Wr(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function Gr(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function Kr(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function qr(e,t,n){return`${e} ${e===1?t:n}`}function Jr(){let e=jr(),t=Sn.find(t=>t.id===e.planId),n=Or[e.shift],r=Mr(),i=Lr(),a=Br(i.date),o=Nr().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||wr}}function Yr(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=zr(r.date),s=Wr(n.from),c=Wr(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function Xr(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=Rr(a.date,e);r.days.includes(zr(t))&&(e===0&&a.minutes>Wr(i.to)||n&&o.has(Br(t))||s.push(t))}return s}var Zr=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],Qr=Zr.flatMap(e=>e.fields);function $r(e,t){return!!String(e[t]??``).trim()}function ei(e,t){return t.fields.filter(t=>$r(e,t.key)).length}function ti(e){return Qr.filter(t=>$r(e,t.key)).length}function ni(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function ri(e){let{ficha:t}=e,n=[],r=Zr.find(e=>e.id===`emergencia`);ei(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),Fr()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=ti(t);return i<Qr.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${Qr.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function ii(e){return e.todayIso<=r.until}var ai={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function oi(e,t,n=``){ai.status[e]={message:t,html:n}}function si(e){let t=ai.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${E(t.message)} ${t.html}`.trim():``}</p>`}function ci(){return`
    <div class="cl-page" data-cl-root>
      ${li(Jr())}
    </div>
  `}function li(e){return`
    <p class="cl-demo-note">
      ${g(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${ui(e)}
    ${mi(e)}
    ${gi()}
    ${_i(e)}
    ${vi(e)}
    ${yi(e)}
    <div class="cl-two-col">
      ${wi()}
      ${Ti(e)}
    </div>
    ${ii(e)?Ei():``}
    ${Di()}
  `}function ui(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=Yr(e),c=ni(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=Xr(e,1)[0],d=u&&Br(u)===e.todayIso,f=ri(e),p={libre:`Los días de paseo de tu plan son ${Kr(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${g(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${E(a)}</strong>
            <small>${E(i.name)} · ${E(r.size)} · Turno ${E(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${E(zr(t.date))} ${Vr(t.date)}</p>
        <h1 id="cl-today-title" class="cl-today-title">${s.title}</h1>
        <p class="cl-lead">${p}</p>
        ${s.step>=0?`
          <ol class="cl-steps" aria-label="Estado del paseo según el horario del turno">
            ${l.map((e,t)=>`
              <li class="${t<s.step?`is-done`:``} ${t===s.step?`is-current`:``}" ${t===s.step?`aria-current="step"`:``}>
                <span class="cl-step-dot" aria-hidden="true"></span>
                <span>${e}</span>
              </li>
            `).join(``)}
          </ol>
          <p class="cl-fine">El estado sigue el horario del turno. El seguimiento en vivo todavía no está disponible. Horario exacto de retiro: <strong>${x}</strong> (te lo confirmamos por WhatsApp).</p>
        `:``}
        <div data-cl-region="alertas-hoy">${fi(c,!0)}</div>
        ${pi(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${g(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:E(zr(u))}</p>
            <p class="cl-next-date">${d?`${E(zr(u))} ${Vr(u)}`:Vr(u)}</p>
            <p class="cl-next-shift">Turno ${E(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${x}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${di(e,f)}</div>
        </article>
      </div>
    </section>
  `}function di(e,t=ri(e)){return t.length?`
    <ol class="cl-pending-list">
      ${t.map((e,t)=>`
        <li>
          <button type="button" class="cl-pending-item" data-cl-go="${e.go}">
            <span class="cl-pending-num" aria-hidden="true">${t+1}</span>
            <span>
              <strong>${E(e.text)}</strong>
              <small>${E(e.detail)}</small>
            </span>
            ${g(`arrowRight`,`cl-icon-sm`)}
          </button>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="cl-all-done">${g(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function fi(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${g(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${E(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function pi(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=Rr(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${C.map((e,t)=>Rr(a,t)).map(e=>{let t=Br(e),a=zr(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${Vr(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${Gr(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function mi(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${g(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${Ir(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${E(yn.whatsappLabel)}</small></span>
      </a>
      ${ii(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${g(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${E(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function hi(){return`Ahora: tema ${Oe()?`oscuro`:`claro`} · movimiento ${ke()?`calmo (sin movimiento)`:`normal`}.`}function gi(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${g(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${hi()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function _i(e){let t=Xr(e,10);return`
    <section class="cl-card cl-section" id="cl-ausencia" aria-labelledby="cl-ausencia-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`bell`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ausencia-title" class="cl-h2" tabindex="-1">Avisar una ausencia</h2>
          <p>Si tu perro no puede salir algún día, avisanos con tiempo así reorganizamos el grupo.</p>
        </div>
      </header>
      <div class="cl-absence-grid">
        <div class="cl-form">
          ${t.length?`
            <label for="cl-absence-date">Día que no sale
              <select id="cl-absence-date" data-cl-absence-date>
                ${t.map(t=>`<option value="${Br(t)}">${E(zr(t))} ${Vr(t)} · turno ${E(e.settings.shift.toLowerCase())}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-absence-reason"><span>Motivo <span class="cl-optional">(opcional)</span></span>
              <input id="cl-absence-reason" type="text" maxlength="140" placeholder="Por ejemplo: viaje" data-cl-absence-reason />
            </label>
            <button type="button" class="cl-btn" data-cl-absence-save>
              ${g(`message`,`cl-icon-sm`)} Avisar por WhatsApp
            </button>
            <p class="cl-fine">Se abre WhatsApp con el mensaje listo: solo tenés que tocar Enviar. El aviso también queda anotado en este dispositivo.</p>
          `:`<p>${x}: no hay próximos paseos con los días de tu plan.</p>`}
          ${si(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${E(zr(Ur(e.date)))} ${Hr(e.date)}</strong>
                    ${e.reason?`<small>${E(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${E(e.date)}" aria-label="Quitar la ausencia del ${Hr(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function vi(e){let{plan:t,settings:n,shift:r}=e,i=Cn[n.size],a=n.days.length===t.walks;return`
    <section class="cl-card cl-section" id="cl-plan" aria-labelledby="cl-plan-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`calendarCheck`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-plan-title" class="cl-h2" tabindex="-1">Tu plan</h2>
          <p>Precios oficiales por semana y por perro, según el tamaño.</p>
        </div>
      </header>

      <div class="cl-plan-summary">
        <div class="cl-plan-main">
          <p class="cl-eyebrow">Plan contratado (ejemplo)</p>
          <p class="cl-plan-name">${E(t.name)}</p>
          <p class="cl-plan-walks">${qr(t.walks,`paseo`,`paseos`)} por semana · ${E(n.size)}</p>
          <p class="cl-plan-price"><b>${jn(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${Dr.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${Gr(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${E(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${x}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${g(`alertCircle`,`cl-icon-sm`)} El ${E(t.name)} incluye ${qr(t.walks,`paseo`,`paseos`)} por semana y hay ${qr(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${E(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${Sn.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${E(e.name)}</strong>
            <span>${qr(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${jn(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${E(n.size.toLowerCase())}):</strong> individual ${jn(i.individual)} · en grupo ${jn(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${wn.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${ai.openGroups.has(`plan`)?`open`:``}>
        <summary>${g(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${Sn.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${E(e.name)} · ${qr(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${Er.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(Or).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${Dr.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${si(`plan`)}
        </div>
      </details>
    </section>
  `}function yi(e){let{ficha:t}=e,n=ti(t),r=Qr.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${E(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${x}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${bi(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${E(Tn[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${x}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${fi(ni(t))}</div>

      <div class="cl-ficha-groups">
        ${Zr.map(e=>Si(e,t)).join(``)}
      </div>
      ${si(`ficha`)}
    </section>
  `}function bi(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function xi(e,t){let n=ei(e,t);return n===t.fields.length?`<span class="cl-count is-done">${g(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${x.toLowerCase()}</span>`}function Si(e,t){let n=ai.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${g(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${xi(t,e)}</span>
        ${g(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>Ci(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function Ci(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${x}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${E(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${E(e.placeholder||`Pendiente de confirmar`)}">${E(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${E(r)}" placeholder="${E(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${$r(t,e.key)?``:x}</small>`:``}
    </label>
  `}function wi(){let e=Fr();return`
    <section class="cl-card cl-section" id="cl-vacunas" aria-labelledby="cl-vacunas-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(e?`fileCheck`:`uploadCloud`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-vacunas-title" class="cl-h2" tabindex="-1">Carnet de vacunas</h2>
          <p>Subí una foto o PDF del carnet. Lo revisamos antes de los paseos en grupo.</p>
        </div>
      </header>
      <div class="cl-upload">
        <input id="cl-vaccine-file" class="cl-file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" data-cl-file="carnet" />
        <label for="cl-vaccine-file" class="cl-upload-box">
          ${g(`fileUp`,`cl-icon`)}
          <strong>${e?`Cambiar archivo`:`Elegir foto o PDF`}</strong>
          <small>JPG, PNG o PDF</small>
        </label>
      </div>
      <dl class="cl-file-status">
        <div><dt>Archivo</dt><dd>${e?E(e.name):`Sin archivo`}</dd></div>
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${E(e.date)}`:x}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${Ir(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${si(`carnet`)}
    </section>
  `}function Ti(e){let t=Pr(Cr.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${jn(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${Ir(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon-sm`)} Pedir alias y detalle por WhatsApp
      </a>
      <div class="cl-upload">
        <input id="cl-receipt-file" class="cl-file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" data-cl-file="comprobante" />
        <label for="cl-receipt-file" class="cl-upload-box is-small">
          ${g(`receipt`,`cl-icon`)}
          <strong>Subir comprobante</strong>
          <small>JPG, PNG o PDF</small>
        </label>
      </div>
      ${t.length?`
        <ul class="cl-list" aria-label="Comprobantes cargados">
          ${t.slice(0,5).map(e=>`
            <li>
              <span><strong>${E(e.name)}</strong><small>Cargado el ${E(e.date)} · Pendiente de confirmación</small></span>
            </li>
          `).join(``)}
        </ul>
        <a class="cl-btn is-secondary" href="${Ir(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${g(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${si(`comprobante`)}
    </section>
  `}function Ei(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${g(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${E(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${E(r.title)}</h2>
        <p>${E(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${Ir(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function Di(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${g(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${ai.resetArmed?`is-danger`:``}" data-cl-reset>
        ${ai.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${si(`privacidad`)}
    </section>
  `}function Oi(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=li(Jr()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function ki(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=Jr();Object.entries({pendientes:()=>di(t),"alertas-hoy":()=>fi(ni(t.ficha),!0),"alertas-ficha":()=>fi(ni(t.ficha)),"ficha-progreso":()=>bi(ti(t.ficha),Qr.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),Zr.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=xi(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=$r(t.ficha,e.dataset.clFieldState)?``:x})}function Ai(e,t,n=``){oi(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${E(t)} ${n}`.trim())}function ji(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,ai.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:ke()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function Mi(){return Vr(Lr().date)}function Ni(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return ji(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=Jr(),r=Nr().filter(t=>t.date!==e);r.push({date:e,reason:t}),Ar(Cr.ausencias,r);let i=Ir([`Hola, aviso que ${n.dogName===wr?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${zr(Ur(e)).toLowerCase()} ${Hr(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),oi(`ausencia`,`Listo: anotamos la ausencia del ${Hr(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),Oi(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return Ar(Cr.ausencias,Nr().filter(t=>t.date!==e)),oi(`ausencia`,`Quitamos la ausencia del ${Hr(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),Oi(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=Sn.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(Ai(`plan`,`El ${r.name} incluye ${qr(r.walks,`paseo`,`paseos`)} por semana: elegí ${qr(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(Ar(Cr.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),oi(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),Oi(`[data-cl-plan-save]`),!0):(Ai(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return ai.resetArmed?(Object.values(Cr).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),ai.resetArmed=!1,ai.status={},oi(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),Oi(`[data-cl-reset]`),!0):(ai.resetArmed=!0,Oi(`[data-cl-reset]`),!0);if(ai.resetArmed&&!e.target.closest(`[data-cl-reset]`)){ai.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function Pi(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:Mi()};if(t.dataset.clFile===`carnet`)Ar(Cr.carnet,n),oi(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),Oi(`[data-cl-status='carnet']`);else{let t=[n,...Pr(Cr.comprobantes)].slice(0,10);Ar(Cr.comprobantes,t),oi(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),Oi(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=Mr();Ai(`ficha`,Ar(Cr.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function Fi(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=Mr();Ar(Cr.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),ki()}function Ii(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?ai.openGroups.add(t.dataset.clDetails):ai.openGroups.delete(t.dataset.clDetails))}function Li(){fe.push(Ni),pe.push(Pi),document.addEventListener(`input`,Fi),document.addEventListener(`toggle`,Ii,!0),Ae(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${hi()} Se guarda solo en este dispositivo.`)})}var Ri=`America/Argentina/Buenos_Aires`,zi=`paseosJuan_paseador_progreso`,Bi=`paseosJuan_paseador_equipo`,Vi=`paseosJuan_paseador_incidente`,Hi=`paseosJuan_paseador_ruta`,D=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],Ui={pendiente:0,retirado:1,paseando:2,entregado:3},Wi=`no-sale`,Gi={Mañana:`manana`,Tarde:`tarde`},Ki=/^[a-z0-9][a-z0-9_.-]{0,60}$/i,qi={Mañana:S.manana,Tarde:S.tarde},Ji=[`Bajo`,`Medio`,`Alto`],Yi=[`No se ven`,`Sí`,`No sé`],Xi=`Perro externo`,Zi=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,Qi=Ln(),O={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``,routeChange:null};function k(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function $i(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function ea(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function ta(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim().toLowerCase()}function na(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Ri,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:An(t)}}function ra(e){let[t,n,r]=String(e).split(`-`);return r?`${r}/${n}/${t}`:e}function ia(e,t){let n=(C.indexOf(e)-C.indexOf(t.day)+7)%7,[r,i,a]=t.iso.split(`-`).map(Number);return new Date(Date.UTC(r,i-1,a+n)).toISOString().slice(0,10)}function aa(e){return e.minutes<810?`Mañana`:`Tarde`}function oa(){let e=na(),t=O.day||e.day,n=O.shift||aa(e),r=t===e.day;return{now:e,day:t,shift:n,isToday:r,iso:r?e.iso:ia(t,e)}}function sa(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function ca(e){let t=qi[e];return`${t.from} a ${t.to}`}function la(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}function ua(e){if(e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t} h ${n} min`:`${t} h`}function da(e,t,n=`retiro`){let r=la(e);if(r===null)return{text:`Hora: ${x.toLowerCase()}`,kind:`info`};let i=r-t;return i>0?{text:`${n===`entrega`?`Entrega `:``}${n===`entrega`?`en`:`En`} ${ua(i)}`,kind:i<=10?`soon`:`ok`}:i===0?{text:n===`entrega`?`Entrega ahora`:`Ahora`,kind:`soon`}:{text:n===`entrega`?`Entrega con ${ua(-i)} de atraso`:`${ua(-i)} de atraso`,kind:`late`}}function fa(e,t,n=`retiro`){let r=da(e,t,n);return`<span class="pw-cd pw-cd--${r.kind}" data-pw-countdown="${k(e)}" data-pw-mode="${n}">${k(r.text)}</span>`}function pa(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function ma(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function ha(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${sa(i)}`),t=t.filter(e=>!e.includes(r))}return n}function ga(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function _a(e){return e.safety.some(e=>/bozal/i.test(e))}var va=En.filter(e=>e.sebastian>0),ya=En.filter(e=>e.sebastian===0&&e.juan>0),ba=En.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function xa(){return v.user()||{}}function Sa(){return xa().nombre||`equipo`}function Ca(){return xa().rol===`ayudante`}function wa(e){let t=xa();if(!e||!t.usuario)return!1;let n=ta(e);return n===ta(t.usuario)||t.nombre&&n===ta(t.nombre)}function Ta(e,t=new Map){if(!e)return``;if(wa(e))return xa().nombre||String(e);let n=String(e);return t.get(n)||t.get(ta(n))||bn.find(e=>e.id===ta(n))?.name||n}function Ea(e,t){return ta(e)===ta(t)}function Da(e){return ta(e).startsWith(`tarde`)?`Tarde`:`Mañana`}function Oa(e){return w.find(t=>t.id===e.perroId)||w.find(t=>ta(t.name)===ta(e.perroNombre))||{id:Ki.test(String(e.perroId||``))?String(e.perroId):``,name:String(e.perroNombre||`Perro sin nombre`),size:x,minutes:null,safety:[],status:`Activo`,unknown:!0}}function ka(e,t){let n=(Array.isArray(e.paradas)?e.paradas:[]).filter(e=>e&&(e.perroId||e.perroNombre)).map((e,t)=>{let n=Oa(e),r=Number(e.minutos)||n.minutes||null,i=la(e.hora)===null?``:String(e.hora).trim().padStart(5,`0`);return{index:t,dog:n,hora:i,minutos:r,salida:i&&r?Fn(i,r):``,nota:String(e.nota||``).trim(),canSave:!!n.id}}).sort((e,t)=>(la(e.hora)??9999)-(la(t.hora)??9999)||e.index-t.index);return{ruta:String(e.ruta||`Pendiente de confirmar`),turno:Da(e.turno),dia:e.dia||``,paseador:String(e.paseador||``),ayudante:String(e.ayudante||``),supervisor:String(e.supervisor||``),notas:String(e.notas||``),fuente:t,record:e,stops:n}}function Aa(e,t,n){let r=new Map;y.cached(`rutas`,{desde:n}).filter(t=>t.fecha===e&&t.ruta&&Array.isArray(t.paradas)).sort((e,t)=>String(e.actualizadoEn||``).localeCompare(String(t.actualizadoEn||``))).forEach(e=>r.set(e.ruta,e));let i=y.cached(`plantillas`).filter(e=>e.ruta&&Array.isArray(e.paradas)),a=i.length===0,o=new Map;return(a?Qi:i).filter(e=>Ea(e.dia,t)).forEach(e=>o.set(e.ruta,ka(e,a?`planilla`:`plantilla`))),r.forEach((e,t)=>o.set(t,ka(e,`dia`))),[...o.values()].sort((e,t)=>e.turno===t.turno?e.ruta.localeCompare(t.ruta):e.turno===`Mañana`?-1:1)}function ja(e){let t=$i(Hi,{})?.[xa().usuario||``];return t&&t.iso===e.iso&&t.turno===e.shift?t.ruta:``}function Ma(e,t){let n=$i(Hi,{}),r=n&&typeof n==`object`?n:{};r[xa().usuario||``]=t?{iso:e.iso,turno:e.shift,ruta:t}:null,ea(Hi,r)}function Na(e){let t=Aa(e.iso,e.day,e.now.iso),n=t.filter(t=>t.turno===e.shift),r=n.filter(e=>wa(e.paseador)||wa(e.ayudante)),i=t.filter(t=>t.turno!==e.shift&&(wa(t.paseador)||wa(t.ayudante))),a=r.length?``:n.some(t=>t.ruta===ja(e))?ja(e):``,o=r.length?r:a?n.filter(e=>e.ruta===a):n;return{all:t,ofShift:n,mine:r,elsewhere:i,picked:a,shown:o,assigned:r.length>0,helping:r.find(e=>wa(e.ayudante)&&!wa(e.paseador))||null,fromPlanilla:o.some(e=>e.fuente===`planilla`)}}function Pa(e){return e.flatMap(e=>e.stops.map(t=>({...t,route:e})))}function Fa(e,t){return Pa(Na(e).shown).find(e=>e.dog.id===t)||null}var Ia=new Map;function La(e,t){if(!e.isToday||!io.ready)return;let n=[];t.forEach(r=>{let i=`${e.iso}|${r.turno}|${r.ruta}`,a=new Map(r.stops.map(e=>[e.dog.id||ta(e.dog.name),e])),o=Ia.get(i);if(Ia.set(i,a),!o)return;let s=[...a.entries()].filter(([e])=>!o.has(e)).map(([,e])=>`${e.dog.name}${e.hora?` (${e.hora})`:``}`),c=[...o.entries()].filter(([e])=>!a.has(e)).map(([,e])=>e.dog.name),l=[...a.entries()].filter(([e,t])=>o.has(e)&&o.get(e).hora!==t.hora).map(([e,t])=>`${t.dog.name} pasa de ${o.get(e).hora||`sin hora`} a ${t.hora||`sin hora`}`),u=[];s.length&&u.push(`se ${s.length===1?`sumó`:`sumaron`} ${sa(s)}`),c.length&&u.push(`se ${c.length===1?`quitó`:`quitaron`} ${sa(c)}`),l.length&&u.push(`cambió el horario: ${sa(l)}`),u.length&&n.push(`${t.length>1?`${r.ruta}: `:``}${u.join(` / `)}`)}),n.length&&(O.routeChange={text:`La ruta cambió: ${n.join(`. `)}.`,time:e.now.time},zo(O.routeChange.text))}function Ra(e){return y.cached(`avisos`).filter(t=>{let n=String(t.fecha||``),r=String(t.vigenteHasta||``);return n&&n>e?!1:r?r>=e:n===e}).sort((e,t)=>String(t.actualizadoEn||t.fecha||``).localeCompare(String(e.actualizadoEn||e.fecha||``)))}function za(e){let t=Ra(e.now.iso);return t.length?`
    <section class="pw-notices" aria-labelledby="pw-avisos-title">
      <h2 class="pw-section-label" id="pw-avisos-title">${g(`bell`,`pw-icon pw-icon--sm`)} Avisos por barrio (${t.length})</h2>
      <ul class="pw-notice-list" role="list">
        ${t.map(e=>{let t=/seguridad|perro suelto/i.test(e.tipo||``);return`
            <li class="pw-notice ${t?`pw-notice--danger`:``}">
              ${g(t?`alertTriangle`:`mapPin`,`pw-icon`)}
              <div>
                <p class="pw-notice-head"><strong>${k(e.barrio||`Barrio sin cargar`)}</strong>${e.tipo?` · ${k(e.tipo)}`:``}</p>
                <p>${k(e.mensaje||e.titulo||``)}</p>
                <p class="pw-notice-meta">${e.vigenteHasta?`Vigente hasta el ${k(ra(e.vigenteHasta))}`:`Vigente hoy`}${e.creadoPorNombre?` · Avisó ${k(e.creadoPorNombre)}`:``}</p>
              </div>
            </li>
          `}).join(``)}
      </ul>
    </section>
  `:``}function Ba(e,t,n){return`${e}_${t}_${Gi[n]}`}function Va(e,t,n=xa().usuario){return`${e}_${n||`sin-usuario`}_${Gi[t]}`}var Ha=new Map;function Ua(e,t){let n=new Map(y.cached(e,{desde:t}).map(e=>[e.id,e]));return Ha.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function Wa(e){let t=D.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===Wi;return{step:r?0:Math.max(Ui[e.estado]??0,n),noSale:r,times:t,record:e}}function Ga(e,t,n){let r=Ua(`paseos`,e);return Object.fromEntries(n.filter(e=>e.id).map(n=>[n.id,Wa(r.get(Ba(e,n.id,t)))]))}function Ka(e,t){return t.dog.id&&e[t.dog.id]||Wa(null)}function qa(e,t){let n=e.filter(e=>Ka(t,e).noSale).length,r=e.filter(e=>!Ka(t,e).noSale&&Ka(t,e).step>=D.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function Ja(e,t){let n=Ua(`checklists`,e).get(Va(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:va.filter(e=>r[e.item]===!0).map(e=>e.item)}}function Ya(e){let t=new Map,n=(e,n)=>{e&&n&&t.set(String(e),String(n))};return[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]].forEach(([e,t])=>{y.cached(e,t).forEach(e=>{n(e.creadoPor,e.creadoPorNombre),n(e.actualizadoPor,e.actualizadoPorNombre),D.forEach(t=>n(e[`${t.field}Por`],e[`${t.field}PorNombre`]))})}),t}function Xa(e,t){return e?wa(e)?`vos`:Ta(e,t):x}function Za(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Ri,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Qa(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Za(e.actualizadoEn);return`Último cambio: ${Xa(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}function $a(e,t,n){let r=D[t].field,i=e?.[`${r}Por`];return!i||wa(i)?``:e[`${r}PorNombre`]||Ta(i,n)}var eo=Promise.resolve();function to(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&Ha.set(r,n);let i=eo.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await y.save(e,i);return O.syncError&&=``,t}catch(e){return O.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,Bo(O.syncError),null}finally{r&&Ha.get(r)===n&&Ha.delete(r),Go()}});return eo=i.catch(()=>null),i}function no(e,t,n,r){let i=t.now.iso,a={id:Ba(i,e.dog.id,t.shift),fecha:i,perroId:e.dog.id,perroNombre:e.dog.name,turno:t.shift,ruta:e.route.ruta,...n};return zo(r),to(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&zo(`${r} Sin señal: se enviará cuando haya señal.`)})}function ro(e,t){let n=e.now.iso,r=Object.fromEntries(va.map(e=>[e.item,t.includes(e.item)])),i={id:Va(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=va.length};return to(`checklists`,i,{optimisticRecord:i})}var io={key:``,stops:[],ready:!1};function ao(e){let t=`${e}|${xa().usuario||``}`;if(io.key===t)return;io.stops.forEach(e=>e()),io.key=t,io.stops=[],io.ready=!1;let n=[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]];Promise.allSettled(n.map(([e,t])=>y.list(e,t))).then(t=>{let n=t.find(e=>e.status===`rejected`);return n&&(O.syncError=`No se pudieron traer los datos del equipo: ${n.reason?.message||`error del servidor`}`,Bo(O.syncError)),so(e)}).catch(()=>null).finally(()=>{io.key===t&&(io.ready=!0,Go(),io.stops=n.map(([e,t])=>y.watch(e,t)))})}var oo=!1;async function so(e){if(oo)return;oo=!0;let t=$i(zi,null),n=$i(Bi,null);if(!t&&!n)return;let r=[],i=Ua(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&Gi[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=w.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=Ba(e,t,o),c=Wa(i.get(s)),l=Math.min(n.length,D.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:D[l-1].estado};D.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(to(`paseos`,u,{optimisticRecord:u}))})});let a=Ua(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!Gi[o]||!Array.isArray(n))return;let s=n.filter(e=>va.some(t=>t.item===e));s.length&&!a.has(Va(e,o))&&r.push(ro({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(zi),localStorage.removeItem(Bi)}catch{}r.length&&zo(`Se subió al equipo lo que tenías marcado en este celular.`)}}function co(){let e=$i(Vi,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function lo(e){return`
    <div class="pw-shell">
      ${fo()}
      ${e}
    </div>
  `}function uo(){let e=oa();ao(e.now.iso);let t=Na(e);La(e,t.shown),$o.iso=e.now.iso,$o.shift=aa(e.now),$o.minute=e.now.minutes;let n=Pa(t.shown),r=e.isToday?Ga(e.iso,e.shift,n.map(e=>e.dog)):{},i=Ya(e.now.iso);return`
    <main class="pw-main" id="pw-inicio">
      ${po()}
      ${mo()}
      ${za(e)}
      ${go(e,t,n,r,i)}
      <div class="pw-routes" id="pw-perros" tabindex="-1" aria-label="Perros de la ruta">
        ${t.shown.length?t.shown.map(n=>So(n,e,t,r,i)).join(``):`
            <div class="pw-empty">
              <p><strong>No hay rutas cargadas para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
              <p>Si te pidieron un paseo, confirmalo con el coordinador o con Juan.</p>
            </div>
          `}
      </div>
      <div class="pw-columns">
        ${To(e,t,i)}
        ${Eo(e,n.map(e=>e.dog))}
      </div>
      <footer class="pw-footer">
        <p>Rutas y horarios: los arma el coordinador. Punto de partida: ${k(yn.officialSources.routes)} (12/11/2026).</p>
        <p>Lo que marcás acá lo ven ${Ca()?`el paseador, `:`tu ayudante, `}Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `}function fo(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel ${Ca()?`del ayudante de paseador`:`del paseador`}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>${Ca()?`Ayudante`:`Paseador`} · ${k(Sa())}</small>
        </span>
      </a>
      <div class="pw-header-actions">
        <button class="pw-btn pw-btn--danger pw-btn--compact" type="button" data-pw-goto="pw-incidente">
          ${g(`alertTriangle`,`pw-icon`)}
          Incidente
        </button>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-logout>
          ${g(`logOut`,`pw-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function po(){let e=y.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${g(`uploadCloud`,`pw-icon`)}<span>${k(n)}</span></p>`),O.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${g(`alertTriangle`,`pw-icon`)}
        <span>${k(O.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function mo(){return O.routeChange?`
    <div class="pw-change" data-pw-change>
      ${g(`route`,`pw-icon pw-icon--lg`)}
      <div>
        <strong>${k(O.routeChange.text)}</strong>
        <p>Lo cambió el coordinador. Aviso recibido a las ${k(O.routeChange.time)}.</p>
      </div>
      <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-change-ok>Entendido</button>
    </div>
  `:``}function ho(e){let t=e.flatMap(e=>e.stops.map(e=>e.hora)).filter(Boolean).sort(),n=e.flatMap(e=>e.stops.map(e=>e.salida)).filter(Boolean).sort();return t.length?`${t[0]} a ${n[n.length-1]||t[t.length-1]}`:``}function go(e,t,n,r,i){let a=t.helping,o=t.mine[0]||null,s=e.isToday?`hoy, ${e.day.toLowerCase()}`:`${e.day.toLowerCase()} ${ra(e.iso)}`,c;c=a?`Acompañás a ${k(Ta(a.paseador,i)||`un paseador sin asignar`)} en ${k(a.ruta)}`:o?t.mine.length>1?`Tus rutas de ${s}: ${k(sa(t.mine.map(e=>e.ruta)))}`:`Tu ruta de ${s}: ${k(o.ruta)}`:`Rutas de ${s} · turno ${e.shift.toLowerCase()}`;let l=`Hola, ${k(Sa())}`,u=e.isToday?`${l} · ${e.now.date} · turno ${e.shift.toLowerCase()}`:`${l} · Planificación: no es hoy`,d=[...new Set(t.shown.map(e=>e.supervisor).filter(Boolean))],f=d.length?sa(d):qi[e.shift].supervisor,p=ho(t.shown)||ca(e.shift),m=n.filter(e=>e.dog.status!==`Activo`),h=ma(n.map(e=>e.dog)),ee=[];if(t.assigned&&t.shown.length===1){let e=t.shown[0];a?ee.push(`<li>Paseador: <b>${k(Ta(e.paseador,i)||`Pendiente de confirmar`)}</b></li>`):ee.push(`<li>Ayudante: ${e.ayudante?`<b>${k(Ta(e.ayudante,i))}</b>`:`sin ayudante`}</li>`)}return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${u}</p>
          <h1 id="pw-today-title" tabindex="-1">${c}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${n.length}</b> ${n.length===1?`perro`:`perros`}</li>
            <li>${k(p)}</li>
            <li>Supervisa: ${k(f)}</li>
            ${ee.join(``)}
          </ul>
        </div>
        <div class="pw-today-actions">
          ${e.isToday?``:`
            <button class="pw-btn pw-btn--primary" type="button" data-pw-today>
              ${g(`calendarCheck`,`pw-icon`)}
              Volver a hoy
            </button>
          `}
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${O.pickerOpen}" aria-controls="pw-picker">
            ${g(`sliders`,`pw-icon`)}
            ${O.pickerOpen?`Cerrar selector`:`Cambiar día o turno`}
          </button>
        </div>
      </div>
      ${O.pickerOpen?vo(e):``}
      ${t.fromPlanilla?`
        <p class="pw-source pw-source--warn">${g(`alertCircle`,`pw-icon`)}<span><b>Ruta tomada de la planilla, falta que el coordinador la confirme.</b> Horarios de BASE RUTAS (12/11/2026).</span></p>
      `:``}
      ${_o(e,t)}
      ${yo(e,n,m,h,r)}
    </section>
  `}function _o(e,t){let n=[];if(!t.assigned&&t.elsewhere.length){let r=t.elsewhere[0];n.push(`
      <p class="pw-source">
        ${g(`route`,`pw-icon`)}
        <span>${e.isToday?`Hoy`:`Ese día`} figurás en la ruta <b>${k(r.ruta)}</b> (turno ${r.turno.toLowerCase()}).</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-shift="${r.turno}">Ver turno ${r.turno.toLowerCase()}</button>
      </p>
    `)}return!t.assigned&&t.ofShift.length&&n.push(`
      <div class="pw-route-pick" role="group" aria-labelledby="pw-route-pick-label">
        <p id="pw-route-pick-label"><strong>¿En qué ruta estás ${e.isToday?`hoy`:`ese día`}?</strong>
          <span>No figurás como paseador ni ayudante en este turno. Si es un error, avisale al coordinador.</span></p>
        ${t.ofShift.length>1?`
          <div class="pw-route-chips">
            ${t.ofShift.map(e=>`
              <button type="button" class="pw-chip pw-chip--wide ${t.picked===e.ruta?`is-active`:``}" data-pw-route="${k(e.ruta)}" aria-pressed="${t.picked===e.ruta}">
                ${k(e.ruta)}<small>${e.stops.length} ${e.stops.length===1?`perro`:`perros`}${e.paseador?` · ${k(Ta(e.paseador))}`:``}</small>
              </button>
            `).join(``)}
            <button type="button" class="pw-chip pw-chip--wide ${t.picked?``:`is-active`}" data-pw-route="" aria-pressed="${!t.picked}">
              Todas<small>${t.ofShift.length} rutas</small>
            </button>
          </div>
          <p class="pw-muted pw-small">Lo que elijas queda recordado en este celular.</p>
        `:``}
      </div>
    `),n.join(``)}function vo(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
    <div class="pw-picker" id="pw-picker">
      <div class="pw-picker-group" role="group" aria-label="Día">
        <span class="pw-picker-label">Día</span>
        <div class="pw-days">
          ${C.map(n=>`
            <button type="button" class="pw-chip ${n===e.day?`is-active`:``}" data-pw-day="${n}" aria-pressed="${n===e.day}" aria-label="${n}${n===e.now.day?` (hoy)`:``}">
              ${t[n]}${n===e.now.day?`<small>hoy</small>`:``}
            </button>
          `).join(``)}
        </div>
      </div>
      <div class="pw-picker-group" role="group" aria-label="Turno">
        <span class="pw-picker-label">Turno</span>
        <div class="pw-shifts">
          ${[`Mañana`,`Tarde`].map(t=>`
            <button type="button" class="pw-chip pw-chip--wide ${t===e.shift?`is-active`:``}" data-pw-shift="${t}" aria-pressed="${t===e.shift}">
              ${t}<small>${ca(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function yo(e,t,n,r,i){let a=[],o=t.map(e=>e.dog);r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${ha(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let s=o.filter(_a);if(s.length){let e=!Ca()&&s.length>ba;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${sa(s.map(e=>e.name))}`,text:e?`Según el inventario tenés ${ba} ${ba===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${sa(n.map(e=>e.dog.name))}`,text:n.length===1?`Figura en la ruta con estado "${k(n[0].dog.status)}". No lo retires sin confirmarlo con el coordinador o con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con el coordinador o con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=Ja(e.now.iso,e.shift).checked.length,r=qa(t,i);n<va.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${va.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return a.length?`
    <div class="pw-priorities">
      <h2 class="pw-section-label">Lo primero</h2>
      <ol class="pw-prio-list">
        ${a.slice(0,3).map(e=>`
          <li>
            <button class="pw-prio pw-prio--${e.kind}" type="button" data-pw-goto="${e.goto}">
              <span class="pw-prio-icon" aria-hidden="true">${g(e.icon,`pw-icon`)}</span>
              <span class="pw-prio-text">
                <strong>${e.title}</strong>
                <span>${e.text}</span>
                <span class="pw-prio-go">${e.button} ${g(`arrowRight`,`pw-icon pw-icon--sm`)}</span>
              </span>
            </button>
          </li>
        `).join(``)}
      </ol>
    </div>
  `:``}function bo(e,t){if(e.fuente===`dia`){let n=e.record.actualizadoPor?Xa(e.record.actualizadoPor,t):``,r=e.record.actualizadoEn?Za(e.record.actualizadoEn):``;return`Cambio del día${n?` cargado por ${n}`:``}${r?` a las ${r}`:``}.`}return e.fuente===`plantilla`?`Plantilla semanal del coordinador.`:`Planilla RPJ (sin confirmar).`}function xo(e,t,n){let r=e.stops.filter(e=>e.canSave);if(!e.stops.length)return``;if(!t.isToday){let t=e.stops[0];return`
      <div class="pw-next" data-pw-next="${k(e.ruta)}">
        <p class="pw-next-label">Primer retiro</p>
        <p class="pw-next-main">${k(t.dog.name)}${t.hora?` · ${k(t.hora)}`:``}</p>
      </div>
    `}let i=r.filter(e=>!Ka(n,e).noSale&&Ka(n,e).step===0),a=r.filter(e=>{let t=Ka(n,e);return!t.noSale&&t.step>0&&t.step<D.length}),o,s,c,l;if(i.length)c=i[0].hora,o=i.filter(e=>e.hora===c),s=`Próximo`,l=`retiro`;else if(a.length){let e=[...a].sort((e,t)=>String(e.salida||`99:99`).localeCompare(String(t.salida||`99:99`)));c=e[0].salida,o=e.filter(e=>e.salida===c),s=`Próxima entrega`,l=`entrega`}else return`
      <div class="pw-next pw-next--done" data-pw-next="${k(e.ruta)}">
        <p class="pw-next-label">${k(e.ruta)}</p>
        <p class="pw-next-main">${g(`checkCircle`,`pw-icon pw-icon--lg`)} Ruta completa</p>
      </div>
    `;return`
    <div class="pw-next ${da(c,t.now.minutes,l).kind===`late`?`is-late`:``}" data-pw-next="${k(e.ruta)}">
      <p class="pw-next-label">${l===`entrega`?`Todos retirados · próxima entrega prevista`:`Retiro que sigue`}</p>
      <p class="pw-next-main">${s===`Próximo`?`Próximo: `:``}${k(sa(o.map(e=>e.dog.name)))}${c?` · ${k(c)}`:``}</p>
      <p class="pw-next-time">${fa(c,t.now.minutes,l)}</p>
      <div class="pw-next-actions">
        ${o.map(t=>{let r=Ka(n,t);return`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-from-next="${k(e.ruta)}" data-pw-step="${k(t.dog.id)}" ${io.ready?``:`aria-disabled="true"`}>
              ${io.ready?`${D[r.step].action}${o.length>1?`: ${k(t.dog.name)}`:``}`:`Cargando lo marcado…`}
            </button>
          `}).join(``)}
      </div>
    </div>
  `}function So(e,t,n,r,i){let a=ma(e.stops.map(e=>e.dog)),o=qa(e.stops,r),s=o.toWalk?Math.round(o.delivered/o.toWalk*100):100,c=`pw-ruta-${e.ruta.replace(/[^a-z0-9]+/gi,`-`)}`,l=[];return!n.helping&&e.paseador&&!wa(e.paseador)&&l.push(`Paseador: ${Ta(e.paseador,i)}`),n.helping&&e.ayudante&&!wa(e.ayudante)&&l.push(`Ayudante: ${Ta(e.ayudante,i)}`),!n.assigned&&e.ayudante&&l.push(`Ayudante: ${Ta(e.ayudante,i)}`),`
    <section class="pw-section pw-route" aria-labelledby="${c}">
      <div class="pw-section-head">
        <div>
          <h2 id="${c}">Ruta ${k(e.ruta)} <span class="pw-count">${e.stops.length}</span></h2>
          <p class="pw-muted">${k(bo(e,i))} En orden, con la hora de retiro.${l.length?` ${k(l.join(` · `))}.`:``}</p>
          ${e.notas?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${k(e.notas)}</p>`:``}
        </div>
        ${t.isToday&&e.stops.length?`
          <div class="pw-progress" aria-label="Avance de la ruta ${k(e.ruta)}">
            <strong>${o.delivered} de ${o.toWalk} entregados${o.noSale?` · ${o.noSale} no ${o.noSale===1?`sale`:`salen`}`:``}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${s}%"></span></span>
          </div>
        `:``}
      </div>

      ${xo(e,t,r)}

      ${a.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${g(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en esta ruta</strong>
            <ul>${ha(a).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${k(e.supervisor||qi[t.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      `:``}

      ${!t.isToday&&e.stops.length?`
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      `:``}

      ${e.stops.length?`
        <ol class="pw-dogs" role="list">
          ${e.stops.map((n,o)=>wo({...n,route:e},o,t,Ka(r,n),ga(n.dog,a),i)).join(``)}
        </ol>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros en ${k(e.ruta)} para este turno.</strong></p>
          <p>Si te pidieron un paseo, confirmalo con el coordinador.</p>
        </div>
      `}
      <p class="pw-muted pw-legend">
        Categoría operativa: <b>SIN EVALUAR</b> salvo que se indique otra. ${k(Tn[`SIN EVALUAR`])}
        Fuente: Registro maestro, 14/08/2026.
      </p>
    </section>
  `}function Co(e){return!e.nota||/^bozal$/i.test(e.nota)&&_a(e.dog)||/^no juntar/i.test(e.nota)&&e.dog.safety.some(e=>pa(e)===`danger`)?``:e.nota}function wo(e,t,n,r,i,a){let{dog:o}=e,{times:s,noSale:c,record:l}=r,u=Math.min(r.step,D.length),d=!c&&u>=D.length,f=Qa(l,a),p=o.safety.filter(e=>pa(e)===`danger`).join(` `),m=i.filter(e=>!p.includes(e)),h=o.safety.filter(e=>pa(e)!==`info`),ee=o.safety.filter(e=>pa(e)===`info`),te=o.status!==`Activo`,ne=h.length||i.length||te,re=Co(e),ie=e.minutos||o.minutes,ae=n.isToday&&e.canSave,oe=``;return n.isToday&&!c&&!d&&e.canSave&&(oe=u===0?fa(e.hora,n.now.minutes,`retiro`):e.salida?fa(e.salida,n.now.minutes,`entrega`):``),`
    <li class="pw-dog ${ne?`has-alert`:``} ${d?`is-done`:``} ${c?`is-nosale`:``}" data-pw-dog="${k(o.id)}">
      <div class="pw-dog-time">
        <span class="pw-dog-order" aria-label="Orden ${t+1}">${t+1}</span>
        <span class="pw-dog-hora">${e.hora?`${g(`clock`,`pw-icon pw-icon--sm`)} Retiro ${k(e.hora)}`:`Hora de retiro: ${x.toLowerCase()}`}</span>
        ${oe}
      </div>
      <div class="pw-dog-head">
        <h3>${k(o.name)}</h3>
        <span class="pw-dog-facts">${k(o.size)} · ${ie?`${ie} min`:`Duración: ${x.toLowerCase()}`}${e.salida?` · vuelve ~${k(e.salida)}`:``}</span>
      </div>

      ${ne?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${k(o.name)}">
          ${te?`
            <li class="pw-alert pw-alert--warn">
              ${g(`alertCircle`,`pw-icon`)}
              <span>${k(o.status)}: ${k(o.review||`su estado no es Activo.`)} Confirmalo con el coordinador o con Juan antes de retirarlo.</span>
            </li>
          `:``}
          ${h.map(e=>`
            <li class="pw-alert pw-alert--${pa(e)}">
              ${g(pa(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${k(e)}${pa(e)===`danger`&&i.length?`<b class="pw-today-tag">En esta ruta: ${sa(i)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${m.length?`
            <li class="pw-alert pw-alert--danger">
              ${g(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${sa(m)}<b class="pw-today-tag">En esta ruta</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${ee.map(e=>`<p class="pw-dog-note">${g(`users`,`pw-icon pw-icon--sm`)} ${k(e)}</p>`).join(``)}
      ${re?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${k(re)}</p>`:``}
      ${o.review&&!te?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${k(o.review)}</p>`:``}
      ${o.unknown?`<p class="pw-dog-review"><b>Perro nuevo en la ruta:</b> sin ficha en esta página (tamaño y alertas: ${x.toLowerCase()}). Preguntale al coordinador.</p>`:``}
      <p class="pw-dog-category"><span>${k(o.category||`SIN EVALUAR`)}</span> ${o.unknown?x:`Registro maestro 14/08/2026`}</p>

      ${n.isToday&&!e.canSave?`
        <p class="pw-note">Este perro no tiene identificador en la ruta: no se puede marcar. Avisale al coordinador.</p>
      `:``}

      ${ae?`
        ${c?`
          <p class="pw-nosale-label">${g(`x`,`pw-icon`)} No sale en este turno</p>
        `:`
          <ol class="pw-steps" aria-label="Avance de ${k(o.name)}">
            ${D.map((e,t)=>{let n=t<u?$a(l,t,a):``;return`
                <li class="${t<u?`is-done`:``} ${t===u?`is-next`:``}">
                  <span class="pw-step-dot" aria-hidden="true">${t<u?g(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
                  <span>${e.label}${t<u?`<small>${s[t]?k(s[t]):`Sin hora`}</small>`:``}${n?`<small class="pw-marker">Marcó ${k(n)}</small>`:``}</span>
                  <span class="pw-sr">${t<u?`hecho`:`pendiente`}</span>
                </li>
              `}).join(``)}
          </ol>
        `}
        ${l?.nota?`<p class="pw-dog-nota"><b>Nota:</b> ${k(l.nota)}</p>`:``}
        ${f?`<p class="pw-dog-change ${l.pendiente?`is-pending`:``}">${k(f)}</p>`:``}
        <div class="pw-dog-actions">
          ${c?``:d?`
            <p class="pw-done-label">${g(`checkCircle`,`pw-icon`)} Entregado ${k(s[D.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${k(o.id)}" ${io.ready?``:`aria-disabled="true"`}>
              ${io.ready?D[u].action:`Cargando lo marcado…`}
            </button>
          `}
          ${!c&&u===0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${k(o.id)}" ${io.ready?``:`aria-disabled="true"`} aria-label="${k(o.name)} no sale en este turno">No sale</button>
          `:``}
          ${c||u>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${k(o.id)}" aria-label="Deshacer el último paso de ${k(o.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function To(e,t,n){let{checked:r,record:i}=Ja(e.now.iso,e.shift),a=r.length>=va.length,o=Qa(i,n),s=t.helping?Ta(t.helping.paseador,n):``;return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">${Ca()?`Tu checklist, hoy turno ${e.shift.toLowerCase()}. El inventario no asigna equipo al ayudante (${x.toLowerCase()}): revisá${s?` con ${k(s)}`:``} que esté todo lo del paseador.`:`Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.`}</p>
        </div>
        <span class="pw-count ${a?`is-ok`:``}">${r.length}/${va.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${va.map(e=>{let t=r.includes(e.item),n=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
            <li>
              <input class="pw-check-input" type="checkbox" id="${n}" data-pw-equip="${k(e.item)}" ${t?`checked`:``} />
              <label class="pw-check" for="${n}">
                <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                <span class="pw-check-text">${k(e.item)}</span>
                <span class="pw-check-qty">${e.sebastian}</span>
              </label>
            </li>
          `}).join(``)}
      </ul>
      <div class="pw-row">
        ${a?`<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`:`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      ${o?`<p class="pw-dog-change ${i?.pendiente?`is-pending`:``}">${k(o)}</p>`:``}
      <p class="pw-status" role="status">${k(O.equipStatus)}</p>
      ${ya.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${ya.map(e=>`${k(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function Eo(e,t){let n=co(),r=[...t.map(e=>e.name),Xi];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=O.previewOpen?Ao(n,e):null;return`
    <section class="pw-section pw-card pw-incident" id="pw-incidente" aria-labelledby="pw-incidente-title" tabindex="-1">
      <div class="pw-section-head">
        <div>
          <h2 id="pw-incidente-title">${g(`alertTriangle`,`pw-icon`)} Reporte de incidente</h2>
          <p class="pw-muted">Primero la seguridad. El reporte se escribe después.</p>
        </div>
      </div>

      <fieldset class="pw-fieldset pw-protocol">
        <legend>Protocolo, en este orden</legend>
        <ol class="pw-protocol-list">
          ${On.map((e,t)=>{let r=`pw-proto-${t}`;return`
              <li>
                <input class="pw-check-input" type="checkbox" id="${r}" data-pw-field="protocolo" value="${t}" ${n.protocolo.includes(t)?`checked`:``} />
                <label class="pw-check pw-check--step" for="${r}">
                  <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                  <span class="pw-check-text"><b>${t+1}.</b> ${k(e)}</span>
                </label>
              </li>
            `}).join(``)}
        </ol>
        <p class="pw-muted pw-small">Tildá cada paso cuando lo hayas hecho. Queda en el mensaje para Juan.</p>
      </fieldset>

      <fieldset class="pw-fieldset">
        <legend>Perros involucrados <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-toggle-grid">
          ${r.map((e,t)=>`
            <span class="pw-toggle">
              <input type="checkbox" id="pw-inc-dog-${t}" data-pw-field="dogs" value="${k(e)}" ${n.dogs.includes(e)?`checked`:``} />
              <label for="pw-inc-dog-${t}">${k(e)}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <div class="pw-grid-2">
        <label class="pw-field">Hora
          <input type="time" data-pw-field="hora" value="${k(n.hora||e.now.time)}" />
        </label>
        <label class="pw-field">Lugar
          <input type="text" data-pw-field="lugar" value="${k(n.lugar)}" placeholder="Ej.: plaza, esquina (sin domicilios)" autocomplete="off" />
        </label>
      </div>

      <p class="pw-hint">Escribí lo que viste y oíste. Ej.: “tiró de la correa y gruñó”, no “se puso agresivo”.</p>

      <label class="pw-field">Antes: ¿qué estaba pasando?
        <textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto a 3 metros">${k(n.antes)}</textarea>
      </label>
      <label class="pw-field">Conducta: ¿qué hizo el perro? <span class="pw-req">(obligatorio)</span>
        <textarea data-pw-field="conducta" rows="2" placeholder="Ej.: se paró en dos patas, ladró y tiró hacia el otro perro">${k(n.conducta)}</textarea>
      </label>
      <label class="pw-field">¿Qué hiciste vos?
        <textarea data-pw-field="accion" rows="2" placeholder="Ej.: corté distancia, crucé la calle y lo senté">${k(n.accion)}</textarea>
      </label>
      <label class="pw-field">Después: ¿cómo quedó?
        <textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto y siguió el paseo">${k(n.despues)}</textarea>
      </label>

      <fieldset class="pw-fieldset">
        <legend>Nivel de riesgo <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-seg pw-seg--risk">
          ${Ji.map(e=>`
            <span class="pw-toggle pw-toggle--${e.toLowerCase()}">
              <input type="radio" name="pw-riesgo" id="pw-riesgo-${e}" data-pw-field="riesgo" value="${e}" ${n.riesgo===e?`checked`:``} />
              <label for="pw-riesgo-${e}">${e}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <fieldset class="pw-fieldset">
        <legend>¿Hay lesiones?</legend>
        <div class="pw-seg">
          ${Yi.map((e,t)=>`
            <span class="pw-toggle">
              <input type="radio" name="pw-lesiones" id="pw-lesiones-${t}" data-pw-field="lesiones" value="${e}" ${n.lesiones===e?`checked`:``} />
              <label for="pw-lesiones-${t}">${e}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <div class="pw-row">
        <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-generate>
          ${g(`fileText`,`pw-icon`)}
          Armar mensaje para Juan
        </button>
        <button class="pw-btn pw-btn--ghost ${O.confirmClear?`is-confirm`:``}" type="button" data-pw-clear>
          ${O.confirmClear?`¿Seguro? Tocá de nuevo`:n.registroId?`Empezar otro reporte`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${O.incidentStatus.startsWith(`Falta`)||O.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${k(O.incidentStatus)}</p>

      ${i&&i.ok?Do(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function Do(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${k(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${Oo(e)}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${g(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function Oo(e){return`https://wa.me/${yn.whatsapp}?text=${encodeURIComponent(e)}`}function ko(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(Zi)?.[0]}}function Ao(e,t){let{missing:n,word:r}=ko(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=aa(t.now),a=Mo(),o=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,s=jo(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,Ca()?`Ayudante de paseador: ${Sa()}${a.paseador?` (con ${a.paseador})`:``}`:`Paseador: ${Sa()}`,`Ruta: ${a.rutas||`Pendiente de confirmar`}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,o(`Lesiones`,e.lesiones),o(`Lugar`,e.lugar),``,o(`Antes`,e.antes),o(`Conducta observada`,e.conducta),o(`Qué hice`,e.accion),o(`Después`,e.despues),``,`Protocolo:`,...s].join(`
`)}}function jo(e){return On.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function Mo(){let e=oa(),t=Na({...e,day:e.now.day,iso:e.now.iso,isToday:!0,shift:aa(e.now)}),n=Ya(e.now.iso);return{rutas:t.shown.map(e=>e.ruta).join(`, `),paseador:t.helping?Ta(t.helping.paseador,n):``}}function No(e,t){let n=e.dogs.map(e=>w.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:jo(e),ruta:Mo().rutas,titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function Po(e,t=!1){O.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),zo(e)}function Fo(e,t){if(O.incidentSavedText===t)return Promise.resolve(null);O.incidentSavedText=t;let n=oa();return to(`incidentes`,()=>No({...e,registroId:co().registroId||e.registroId},n)).then(e=>{if(!e)return O.incidentSavedText=``,null;let t=$i(Vi,null);return t&&ea(Vi,{...t,registroId:e.id}),Po(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function Io(){let e=co(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function Lo(){let e=Io();return ea(Vi,e),e}function Ro(e){if(!O.previewOpen)return;let t=Ao(e,oa()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),O.previewOpen=!1,O.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=O.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=Oo(t.text))}function zo(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function Bo(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var Vo=[`data-pw-from-next`,`data-pw-route`,`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function Ho(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=Vo.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]${t===`data-pw-step`?`:not([data-pw-from-next])`:``}`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function Uo(){let e=document.activeElement,t=Ho(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var Wo=0;function Go(){clearTimeout(Wo),Wo=setTimeout(()=>{document.querySelector(`.pw-shell`)&&Uo()},80)}function A(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function Ko(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function qo(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:Ko(),block:`start`}),t.focus({preventScroll:!0}))}async function Jo(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function Yo(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return l_(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return O.syncError=``,A(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return qo(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return O.pickerOpen=!O.pickerOpen,A(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=na(),t=n.dataset.pwDay;return O.day=t===e.day?null:t,A(`[data-pw-day="${t}"]`),zo(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return O.shift=r.dataset.pwShift,A(`[data-pw-shift="${O.shift}"]`),zo(`Mostrando el turno ${O.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return O.day=null,O.shift=null,O.pickerOpen=!1,A(`#pw-today-title`),zo(`Mostrando hoy.`),!0;if(e.target.closest(`[data-pw-change-ok]`))return O.routeChange=null,A(`#pw-today-title`),!0;let i=e.target.closest(`[data-pw-route]`);if(i){let e=oa(),t=i.dataset.pwRoute;return Ma(e,t),A(`[data-pw-route="${CSS.escape(t)}"]`),zo(t?`Mostrando la ruta ${t}. Queda recordada en este celular.`:`Mostrando todas las rutas del turno.`),!0}let a=e.target.closest(`[data-pw-step]`);if(a){let e=a.dataset.pwStep,t=a.dataset.pwFromNext,n=oa(),r=Fa(n,e);if(!n.isToday||!r?.canSave||!io.ready)return!0;let i=r.dog,o=Ga(n.now.iso,n.shift,[i])[e];if(o.noSale||o.step>=D.length)return!0;let s=D[o.step],c=xa(),l={estado:s.estado};if(D.forEach((e,t)=>{t>=o.step||(l[e.field]=o.times[t],o.record?.[`${e.field}Por`]&&(l[`${e.field}Por`]=o.record[`${e.field}Por`],l[`${e.field}PorNombre`]=o.record[`${e.field}PorNombre`]||``))}),l[s.field]=n.now.time,l[`${s.field}Por`]=c.usuario||``,l[`${s.field}PorNombre`]=c.nombre||``,no(r,n,l,`${i.name}: ${s.done.toLowerCase()} a las ${n.now.time}.`),t){$();let e=document.querySelector(`[data-pw-from-next="${CSS.escape(t)}"]`)||document.querySelector(`[data-pw-next="${CSS.escape(t)}"]`)?.closest(`section`)?.querySelector(`h2`);e&&!e.hasAttribute(`tabindex`)&&e.tagName===`H2`&&e.setAttribute(`tabindex`,`-1`),e?.focus({preventScroll:!0})}else A(o.step+1>=D.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`);return!0}let o=e.target.closest(`[data-pw-nosale]`);if(o){let e=o.dataset.pwNosale,t=oa(),n=Fa(t,e);return t.isToday&&n?.canSave&&io.ready&&(no(n,t,{estado:Wi},`${n.dog.name}: no sale en este turno.`),A(`[data-pw-undo="${CSS.escape(e)}"]`)),!0}let s=e.target.closest(`[data-pw-undo]`);if(s){let e=s.dataset.pwUndo,t=oa(),n=Fa(t,e);if(!t.isToday||!n?.canSave||!io.ready)return!0;let r=n.dog,i=Ga(t.now.iso,t.shift,[r])[e];if(i.noSale){let a=i.times.reduce((e,t,n)=>t?n+1:e,0);return no(n,t,{estado:a?D[a-1].estado:`pendiente`},`${r.name}: se deshizo "no sale".`),A(a>=D.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(!i.step)return!0;let a=i.step-1,o={estado:a?D[a-1].estado:`pendiente`};return D.forEach((e,t)=>{o[e.field]=t<a?i.times[t]:``,t>=a&&(o[`${e.field}Por`]=``,o[`${e.field}PorNombre`]=``)}),no(n,t,o,`${r.name}: se deshizo "${D[a].done.toLowerCase()}".`),A(`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(e.target.closest(`[data-pw-equip-all]`))return ro(oa(),va.map(e=>e.item)),O.equipStatus=`Equipo completo. ¡A salir!`,A(`[data-pw-equip-reset]`),zo(O.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return ro(oa(),[]),O.equipStatus=`Lista de equipo desmarcada.`,A(`[data-pw-equip-all]`),zo(O.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=Lo(),t=Ao(e,oa());return O.confirmClear=!1,t.ok?(O.previewOpen=!0,O.incidentStatus=O.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,A(`[data-pw-message]`),zo(O.incidentStatus),Fo(e,t.text),!0):(O.previewOpen=!1,O.incidentStatus=t.missing.length?`Falta completar: ${sa(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,A(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),zo(O.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=co(),t=Ao(e,oa());return t.ok&&Fo(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=co(),n=Ao(t,oa());return n.ok&&Fo(t,n.text),Jo(e).then(e=>{O.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=O.incidentStatus,t.classList.toggle(`is-warn`,!e)),zo(O.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!O.confirmClear)return O.confirmClear=!0,A(`[data-pw-clear]`),!0;let e=!!co().registroId;try{localStorage.removeItem(Vi)}catch{}return O.confirmClear=!1,O.previewOpen=!1,O.incidentSavedText=``,O.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,A(`#pw-incidente`),zo(O.incidentStatus),!0}if(O.confirmClear&&!e.target.closest(`[data-pw-clear]`)){O.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=co().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function Xo(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=oa(),{checked:n}=Ja(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return ro(e,i),O.equipStatus=i.length>=va.length?`Equipo completo. ¡A salir!`:``,A(`[data-pw-equip="${CSS.escape(r)}"]`),O.equipStatus&&zo(O.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(Ro(Lo()),!0):!1}function Zo(e){e.target.closest?.(`[data-pw-field]`)&&Ro(Lo())}function Qo(){fe.push(Yo),pe.push(Xo),document.addEventListener(`input`,Zo),Je(e=>{[`paseos`,`checklists`,`incidentes`,`rutas`,`plantillas`,`avisos`].includes(e)&&Go()}),window.addEventListener(`online`,Go),window.addEventListener(`offline`,Go),setInterval(es,15e3)}var $o={iso:``,shift:``,minute:-1};function es(){if(!document.querySelector(`.pw-shell`))return;let e=na();e.iso!==$o.iso||aa(e)!==$o.shift?Go():e.minutes!==$o.minute&&($o.minute=e.minutes,document.querySelectorAll(`[data-pw-countdown]`).forEach(t=>{let n=da(t.dataset.pwCountdown,e.minutes,t.dataset.pwMode);t.textContent=n.text,t.className=`pw-cd pw-cd--${n.kind}`,t.closest(`.pw-next`)?.classList.toggle(`is-late`,n.kind===`late`)}))}var ts=`America/Argentina/Buenos_Aires`,ns=[`manana`,`tarde`],rs=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,is=/(\d[\s.-]?){8,}/,as=10,os=15,ss=[`paseos`,`checklists`,`incidentes`,`plantillas`,`rutas`,`avisos`,`solicitudes`,`observaciones`,`cierres`],cs=7,ls={admin:`Admin`,supervisor:`Supervisor`,coordinador:`Coordinación`,paseador:`Paseador`,ayudante:`Ayudante de paseador`},us=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],ds=[`no sale`,`agregar perro`,`cambiar hora`,`cambiar paseador o ayudante`,`otro`],fs={pendiente:{label:`Pendiente`,tone:`warn`},aplicado:{label:`Aplicado`,tone:`ok`},rechazado:{label:`Rechazado`,tone:`danger`}},ps=Ln(),j={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,observationDraft:`paseosJuanSupervisor_observacionBorrador`,avisoDraft:`paseosJuanSupervisor_avisoBorrador`,requestDraft:`paseosJuanSupervisor_pedidoBorrador`},ms={observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},hs=null,gs=null,_s=null,vs=new Map,ys=new Set,bs=new Set,xs=new Map,Ss=new Map,Cs=new Set,ws=new Map,Ts=new Set,Es=new Map,Ds=!1,Os=!1,ks=null,As=``,js=`idle`;function M(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Ms(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function N(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ns(e){try{localStorage.removeItem(e)}catch{}}var Ps=8e3;function P(e,t,n=`ok`){hs={area:e,text:t,tone:n,at:Date.now()}}function Fs(e){return hs&&Date.now()-hs.at>Ps&&(hs=null),hs&&hs.area===e?hs:null}function Is(e){let t=Fs(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?M(t.text):``}</p>
  `}function Ls(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function Rs(e,t,n){return`${e} ${e===1?t:n}`}function zs(e){let t=String(e||``).match(/^(\d{1,2}):(\d{2})/);return t?Number(t[1])*60+Number(t[2]):null}function Bs(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function Vs(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function Hs(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:ts,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:C[(n+6)%7]}}function Us(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function Ws(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:x}function Gs(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function Ks(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:ts,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function qs(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:b(t)}function Js(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function Ys(e){return e.minutes<810?`manana`:`tarde`}function Xs(e){let t=Vs(e);return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function Zs(e,t){let n=S[e];return t.minutes<zs(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=zs(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function Qs(){return v.user()||{}}function $s(e){let t=Qs();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function ec(e,t){if(!e)return``;if(t?.actualizadoPor===e&&t.actualizadoPorNombre)return t.actualizadoPorNombre;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=Qs();if(n.usuario===e&&n.nombre)return n.nombre;let r=bn.find(t=>t.id===e);if(r)return r.name;for(let t of[`checklists`,`paseos`,`incidentes`])for(let n of ic(t)){if(n.creadoPor===e&&n.creadoPorNombre)return n.creadoPorNombre;if(n.actualizadoPor===e&&n.actualizadoPorNombre)return n.actualizadoPorNombre}return e}function tc(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=ec(e.actualizadoPor||e.creadoPor,e),r=Ks(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function nc(e){let t=b();return e===`plantillas`||e===`avisos`?{}:e===`observaciones`?{desde:Us(t,-6)}:e===`solicitudes`?{desde:Us(t,-2)}:{desde:t}}function rc(){v.token()&&ss.forEach(e=>{let t=nc(e),n=`${e}|${t.desde||``}`;Ts.has(n)||(Ts.add(n),e===`solicitudes`&&hc(),y.watch(e,t),y.list(e,t).then(()=>{Cs.add(e),ws.delete(e)}).catch(t=>{Cs.add(e),ws.set(e,t?.message||`No se pudieron traer los datos.`)}).finally(pc))})}function ic(e){let t=new Map(y.cached(e,nc(e)).map(e=>[e.id,e]));return xs.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function ac(e,t,n,r,i=`ok`){if(!t.id)return oc(e,t,n,r,i);let a=`${e}:${t.id}`,o=(Ss.get(a)||Promise.resolve()).then(()=>oc(e,t,n,r,i));return Ss.set(a,o),o.then(()=>{Ss.get(a)===o&&Ss.delete(a)}),o}async function oc(e,t,n,r,i){try{let a=await y.save(e,t);if(a.pendiente)P(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=xs.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&xs.set(t,a),P(n,r,i)}return a}catch(e){return P(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function sc(e,t,n,r){try{return await y.remove(e,t),xs.delete(`${e}:${t}`),P(n,r,`info`),!0}catch(e){return P(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function cc(e=!0){if(!v.token())return;let t=await Promise.allSettled(ss.map(e=>y.list(e,nc(e))));if(t.forEach((e,t)=>{Cs.add(ss[t]),e.status===`rejected`?ws.set(ss[t],e.reason?.message||`No se pudieron traer los datos.`):ws.delete(ss[t])}),!e)return;let n=t.find(e=>e.status===`rejected`);n?P(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?P(`sync`,`Datos actualizados a las ${Hs().time} hs.`):P(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),F(`sv-refresh`)}function lc(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function uc(){ks=null,lc()&&document.querySelector(`.sv-shell`)&&fc()}function dc(){let e=Ms(j.folds,{}),t=!1;document.querySelectorAll(`.sv-shell [data-sv-fold]`).forEach(n=>{e[n.dataset.svFold]!==n.open&&(e[n.dataset.svFold]=n.open,t=!0)}),t&&N(j.folds,e),document.querySelectorAll(`.sv-shell [data-sv-stop-more]`).forEach(e=>{e.open?ys.add(e.dataset.svStopMore):ys.delete(e.dataset.svStopMore)})}function fc(){dc();let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>2&&window.scrollTo(0,r),!t)return;let i=document.getElementById(t);if(i&&(i.focus({preventScroll:!0}),n&&typeof i.setSelectionRange==`function`))try{i.setSelectionRange(n[0],n[1])}catch{}}function pc(){ks||=setTimeout(uc,40)}function mc(){lc()&&document.querySelector(`.sv-shell`)&&Hs().time!==As&&document.activeElement?.tagName!==`SELECT`&&fc()}function hc(){Ds||=(ic(`solicitudes`).forEach(e=>Es.set(e.id,e.estado||`pendiente`)),!0)}function gc(){let e=Qs().usuario,t=[];if(ic(`solicitudes`).forEach(n=>{let r=n.estado||`pendiente`,i=Es.get(n.id);Ds&&i&&i!==r&&r!==`pendiente`&&n.creadoPor===e&&t.push(n),Es.set(n.id,r)}),!t.length)return;let n=t.filter(e=>e.estado===`aplicado`);P(`requests`,`El coordinador ${t.map(e=>`${e.estado===`aplicado`?`aplicó`:`rechazó`} «${qc(e)}»${e.respuesta?`: ${e.respuesta}`:``}`).join(` · `)}.${n.length?` La ruta ya muestra el cambio.`:``}`,n.length?`ok`:`info`),n.length&&(y.list(`rutas`,nc(`rutas`)).catch(()=>{}),y.list(`plantillas`,nc(`plantillas`)).catch(()=>{}))}function _c(){Os||(Os=!0,Je(e=>{ss.includes(e)&&(Cs.add(e),e===`solicitudes`&&gc(),pc())}),window.addEventListener(`online`,pc),window.addEventListener(`offline`,pc),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&lc()&&cc(!1)}),setInterval(mc,1e4))}function vc(){try{return Object.values(ms).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function yc(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=Tc(e.dogId),n=Gs(e.fecha)||qs(Js(e.id))||b();return{id:Bs(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:S[e.shift]?.label||``,titulo:`Observación: ${t?t.name:x}`,autorAnterior:e.autor||``,migrado:!0}}async function bc(e,t){try{return await y.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function xc(){if(js!==`idle`||!v.token()||!vc()||!navigator.onLine)return;js=`running`;let e=0,t=0,n=``,r=Ms(ms.observations,[]),i=[];for(let a of r){let r=yc(a);if(!r)continue;let o=await bc(`observaciones`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?N(ms.observations,i):Ns(ms.observations);let a=Ms(ms.closure,{}),o=Object.entries(a).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&ns.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(o.length){let r=o.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await y.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,s]of o){let[o,c]=a.split(`|`),l=`${o}_${c}`;if(i.has(l))continue;let u=await bc(`cierres`,{id:l,fecha:o,turno:S[c].label,notas:String(s.notas||``),resumen:``,cerrado:!!s.cerrado,horaCierre:s.cerrado?String(s.cerrado):``,migrado:!0});u?(r[a]=s,t+=1,n=u):e+=1}Object.keys(r).length?N(ms.closure,r):Ns(ms.closure)}else t+=o.length}else Ns(ms.closure);js=`done`,(e||t)&&P(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),pc()}function Sc(){let e=Hs(),t=Ms(j.view,{}),n=Ys(e),r=t.date===e.iso&&ns.includes(t.shift)?t.shift:n;return{day:e.dayName,shift:r,now:e,isToday:!0,isCurrent:r===n,fecha:e.iso,fechaLabel:e.label}}function Cc(e){N(j.view,{date:Hs().iso,shift:e})}function wc(e,t=!1){let n=Ms(j.folds,{});return typeof n[e]==`boolean`?n[e]:t}function Tc(e){return w.find(t=>t.id===e)}function Ec(e){let t=Vs(e);return w.find(e=>Vs(e.name)===t)}function Dc(e){return(e?.safety||[]).some(e=>/bozal/i.test(e))}function Oc(e){return(e?.safety||[]).find(e=>/bozal/i.test(e))||``}function kc(e,t){return Vs(e)===Vs(t)}function Ac(e){let t=e.perroId&&Tc(e.perroId)||e.perroNombre&&Ec(e.perroNombre)||null,n=Number(e.minutos)||t?.minutes||null;return{perroId:t?.id||e.perroId||``,perroNombre:e.perroNombre||t?.name||`Pendiente de confirmar`,hora:zs(e.hora)===null?``:String(e.hora).slice(0,5),minutos:n,nota:e.nota||``,dog:t}}function jc(e,t){let n=Array.isArray(e.paradas)?e.paradas:Array.isArray(e.perros)?e.perros.map(e=>({perroId:e,perroNombre:Tc(e)?.name||e,hora:``})):[];return{code:e.ruta||e.id||`Pendiente de confirmar`,source:t,record:e,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,stops:n.map(Ac)}}function Mc(e){let t=new Map;ic(`plantillas`).filter(t=>kc(t.dia,e.day)&&Xs(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,jc(e,`plantilla`))),ic(`rutas`).filter(t=>t.fecha===e.fecha&&Xs(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,jc(e,`dia`)));let n=!(Cs.has(`plantillas`)&&Cs.has(`rutas`)),r=!1;return t.size||(ps.filter(t=>kc(t.dia,e.day)&&Xs(t.turno)===e.shift).forEach(e=>t.set(e.ruta,jc(e,`planilla`))),r=t.size>0),{routes:[...t.values()].sort((e,t)=>e.code.localeCompare(t.code)),fallback:r,loading:n}}function Nc(e){return e.source===`dia`?`Cambio del día (coordinador)`:e.source===`plantilla`?`Plantilla semanal (coordinador)`:`Planilla RPJ (respaldo)`}function Pc(e){let t=new Map;return e.forEach(e=>e.stops.forEach(e=>{e.dog&&!t.has(e.dog.id)&&t.set(e.dog.id,e.dog)})),[...t.values()]}function Fc(e,t,n){return`${e}_${t}_${n}`}function Ic(){return new Map(ic(`paseos`).map(e=>[e.id,e]))}function Lc(e,t,n){let r=t?.estado||`pendiente`,i=zs(e.hora),a=Number(e.minutos)||null,o=zs(t?.horaRetiro),s=[`retirado`,`paseando`,`entregado`].includes(r),c=o??i,l=s&&o!==null&&i!==null?o-i:0,u=l>as,d={estado:r,retirado:s,record:t,pickupDelay:l,pickupLate:u,planned:i,minutos:a};if(r===`no-sale`)return{...d,kind:`nosale`,label:`No sale`,tone:`neutral`,live:`nosale`};if(r===`entregado`){let e=zs(t?.horaEntrega),n=e!==null&&c!==null?e-c:null,r=n!==null&&a?n>a+os:!1;return{...d,kind:`entregado`,label:`Entregado${t?.horaEntrega?` ${t.horaEntrega}`:``}`,tone:`ok`,live:`entregado`,duration:n,deliveryLate:r,late:u||r}}if(s){let e=c===null?null:n-c;if(e!==null&&a&&e>a+os)return{...d,kind:`demorada`,label:`Entrega demorada ${e-a} min`,tone:`danger`,live:`atrasado`,walked:e,late:!0};let i=r===`paseando`?`Paseando`:`Retirado${t?.horaRetiro?` ${t.horaRetiro}`:``}`;return{...d,kind:`curso`,label:i,tone:`info`,live:`atiempo`,walked:e,late:u}}if(i===null)return{...d,kind:`sinhora`,label:`Hora sin confirmar`,tone:`neutral`,live:`atiempo`};let f=n-i;return f>as?{...d,kind:`atrasado`,label:`Atrasado ${f} min`,tone:`danger`,live:`atrasado`,delay:f,late:!0}:f>=0?{...d,kind:`ahora`,label:`Retirar ahora`,tone:`warn`,live:`atiempo`,delay:f}:{...d,kind:`espera`,label:`Retira ${e.hora}`,tone:`neutral`,live:`atiempo`}}function Rc(e,t,n=Ic()){return t.stops.map(t=>{let r=t.perroId?Fc(e.fecha,t.perroId,e.shift):``;return{stop:t,id:r,status:Lc(t,r?n.get(r):null,e.now.minutes)}})}function zc(e){let t={atiempo:0,atrasado:0,entregado:0,nosale:0};return e.forEach(({status:e})=>{t[e.live]+=1}),t}function Bc(e,t){return ic(`checklists`).filter(n=>n.fecha===e&&(Xs(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function Vc(e,t,n){return n&&Bc(e,t).find(r=>r.id===`${e}_${n}_${t}`||r.creadoPor===n)||null}function Hc(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>Uc(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:ec(e.creadoPor||e.actualizadoPor,e),at:Ks(e.actualizadoEn||e.creadoEn)}}function Uc(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):x}function Wc(e){return ic(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function Gc(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>Tc(e)?.name||e);return t.length?Ls(t):x}function Kc(e){return ic(`avisos`).filter(t=>(t.vigenteHasta?t.vigenteHasta>=e:t.fecha===e)&&(!t.fecha||t.fecha<=e)).sort((e,t)=>Number(t.tipo===`seguridad`)-Number(e.tipo===`seguridad`)||String(t.fecha||``).localeCompare(String(e.fecha||``)))}function qc(e){return`${e.tipo||`Cambio`}${e.perroNombre?` · ${e.perroNombre}`:``}${e.ruta?` · ${e.ruta}`:``}`}function Jc(e,t){return ic(`solicitudes`).filter(n=>n.fecha===e&&Xs(n.turno)===t)}function Yc(e){let t=Qs().usuario;return ic(`solicitudes`).filter(n=>(n.creadoPor?n.creadoPor===t:n.pendiente)&&(n.fecha>=e||(n.estado||`pendiente`)===`pendiente`)).sort((e,t)=>String(t.creadoEn||`9`).localeCompare(String(e.creadoEn||`9`)))}function Xc(e,t=``,n=``,r=!1){let i=n?Tc(n):null;return{fecha:e.fecha,shift:e.shift,ruta:t,perroId:i?.id||``,perroNombre:i?.name||``,tipo:i?`no sale`:`otro`,detalle:``,motivo:``,urgente:!1,open:r}}function Zc(e){let t=Ms(j.requestDraft,{});return t.fecha!==e.fecha||t.shift!==e.shift?Xc(e):{...Xc(e),...t}}function Qc(e){let t=new Set,n=[];return e.forEach(r=>{let i=new Set(r.stops.map(e=>e.dog?.name).filter(Boolean));r.stops.forEach(({dog:a})=>{(a?.incompatibleWith||[]).forEach(o=>{let s=[a.name,o].sort().join(`|`);if(t.has(s))return;let c=i.has(o)?r:e.find(e=>e.stops.some(e=>e.dog?.name===o));c&&(t.add(s),n.push({a:a.name,b:o,sameRoute:c===r,route:r.code,otherRoute:c.code}))})})}),n.sort((e,t)=>Number(t.sameRoute)-Number(e.sameRoute))}function $c(e){let t=Pc(e),n=Qc(e),r=t.filter(Dc),i=t.filter(e=>e.status!==`Activo`),a=t.filter(e=>e.review&&e.status===`Activo`),o=t.filter(e=>e.category===`SIN EVALUAR`),s=e.flatMap(e=>e.stops.filter(e=>!e.dog).map(t=>`${t.perroNombre} (${e.code})`)),c=[];return n.length&&c.push({tone:`danger`,icon:`alertTriangle`,title:n.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${n.length} parejas que no pueden ir juntas`,lines:n.map(e=>`No juntar: ${e.a} con ${e.b}${e.sameRoute?` (los dos en ${e.route})`:` (${e.route} y ${e.otherRoute}: que no se crucen)`}.`),action:n.some(e=>e.sameRoute)?`Que no caminen juntos. Si la ruta los junta, pedile el cambio al coordinador.`:`Que los paseadores no se crucen con esos perros.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),r.length&&c.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${Rs(r.length,`perro`,`perros`)}`,lines:r.map(e=>`${e.name}: ${Oc(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),i.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${i.length===1?`sale ${i[0].name}`:`salen ${i.length} perros`}`,lines:i.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),s.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`${Rs(s.length,`perro de la ruta no tiene`,`perros de la ruta no tienen`)} ficha`,lines:s.map(e=>`${e}: ${x}.`),action:`No se puede marcar el retiro desde acá. Pedile al coordinador que lo revise.`,source:`Fuente: rutas del coordinador y registro de perros.`}),a.length&&c.push({tone:`info`,icon:`fileText`,title:`${Rs(a.length,`perro tiene`,`perros tienen`)} datos a revisar`,lines:a.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${vn}.`}),o.length>1&&c.push({tone:`info`,icon:`eye`,title:`${o.length} perros salen en grupo SIN EVALUAR`,lines:[`${Tn[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),c}var el=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function tl(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function nl(e){return{...tl(e),...Ms(j.observationDraft,{})}}function rl(){let e=nc(`observaciones`).desde;return ic(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function il(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${Qs().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function al(e){return[`Observación de conducta — ${yn.name}`,`Perro: ${e.perroNombre||Tc(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${Ws(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${il(e)}`].join(`
`)}function ol(e){return`${e.fecha}_${e.shift}`}function sl(e){return ic(`cierres`).find(t=>t.id===ol(e))||null}function cl(e){return _s&&_s.id===ol(e)?_s.notas:sl(e)?.notas||``}function ll(e,t){return e?ec(e,t):``}function ul(e,t){let n=Ic(),r=t.flatMap(t=>Rc(e,t,n).map(e=>({...e,route:t}))),i=r.filter(e=>e.status.kind!==`nosale`);return{items:r,going:i,late:i.filter(e=>e.status.late),onTime:i.filter(e=>!e.status.late),noSale:r.filter(e=>e.status.kind===`nosale`),delivered:i.filter(e=>e.status.kind===`entregado`),notPicked:i.filter(e=>!e.status.retirado),notDelivered:i.filter(e=>e.status.retirado&&e.status.kind!==`entregado`)}}function dl(e){let{stop:t,status:n}=e,r=[];return n.kind===`atrasado`&&r.push(`sin retiro, previsto ${t.hora} (${n.delay} min)`),n.pickupLate&&r.push(`retiro previsto ${t.hora}, retirado ${n.record?.horaRetiro} (+${n.pickupDelay} min)`),n.kind===`demorada`&&r.push(`entrega demorada: ${n.walked} min de ${n.minutos} previstos`),n.deliveryLate&&r.push(`entrega demorada: ${n.duration} min de ${n.minutos} previstos`),`${t.perroNombre} (${r.join(`; `)||`con atraso`})`}function fl(e,t){let n=S[e.shift],{routes:r,fallback:i}=Mc(e),a=ul(e,r),o=t||sl(e),s=Qc(r),c=Pc(r).filter(Dc),l=rl().filter(t=>t.fecha===e.fecha&&Xs(t.turno)===e.shift),u=Wc(e.fecha),d=Jc(e.fecha,e.shift),f=cl(e),p=Qs(),m=pl(e,r),h=e=>e.length?e.map(e=>e.stop.perroNombre).join(`, `):`ninguno`,g=[`Cierre de turno — ${yn.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisó: ${p.nombre||`Pendiente de confirmar`}`,`Rutas${i?` (tomadas de la planilla RPJ)`:``}:`,...r.map(e=>`- ${e.code}: paseador ${ll(e.paseador)||`Pendiente de confirmar`}${e.ayudante?`, ayudante ${ll(e.ayudante)}`:``} · ${Rs(e.stops.length,`perro`,`perros`)}`),`Cumplimiento: ${a.onTime.length} a tiempo · ${a.late.length} con atraso · ${a.noSale.length} no salieron (de ${a.items.length} previstos)`,`- Con atraso: ${a.late.length?a.late.map(dl).join(`; `):`ninguno`}`,`- No salieron: ${h(a.noSale)}`,`- Sin retiro marcado: ${h(a.notPicked)}`,`- Sin entrega marcada: ${h(a.notDelivered)}`,`Entregados: ${a.delivered.length} de ${a.going.length}`,`Checklist del equipo: ${m.length?m.map(e=>`${e.name}: ${e.checklist?Hc(e.checklist).complete?`equipo completo`:`incompleto${Hc(e.checklist).missing.length?` (falta ${Hc(e.checklist).missing.join(`, `)})`:``}`:`sin cargar`}`).join(`; `):`sin equipo asignado`}`,`Incidentes del día: ${u.length?u.map(e=>`${e.hora||`sin hora`} ${e.titulo||Gc(e)}`).join(`; `):`ninguno cargado`}`,`Pedidos de cambio al coordinador: ${d.length?d.map(e=>`${qc(e)} (${fs[e.estado]?.label||`Pendiente`})`).join(`; `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${s.length?s.map(e=>`${e.a} con ${e.b}`).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${c.length?c.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${l.length}`,`Notas del supervisor: ${f.trim()||`sin notas`}`];return o?.cerrado&&g.push(`Turno cerrado a las ${o.horaCierre||Ks(o.actualizadoEn)||`Pendiente de confirmar`} hs por ${ec(o.actualizadoPor,o)||`Pendiente de confirmar`}.`),g.join(`
`)}function pl(e,t){let n=new Map,r=(e,t,r)=>{if(!e)return;let i=n.get(e)||{usuario:e,name:ec(e),roles:[]};i.roles.push(`${t} ${r}`),n.set(e,i)};return t.forEach(e=>{r(e.paseador,`Paseador`,e.code),r(e.ayudante,`Ayudante`,e.code)}),Bc(e.fecha,e.shift).forEach(e=>{let t=e.creadoPor||String(e.id).split(`_`)[1];t&&!n.has(t)&&n.set(t,{usuario:t,name:ec(t,e),roles:[`Sin ruta asignada`]})}),[...n.values()].map(t=>({...t,checklist:Vc(e.fecha,e.shift,t.usuario)}))}function ml(e){return`
    <div class="sv-shell">
      ${hl()}
      ${e}
    </div>
  `}function hl(){let e=Qs();return`
    <header class="sv-header">
      <a class="sv-brand" href="/supervisor" data-link aria-label="Paseos Juan, panel de supervisión">
        <span class="sv-logo" aria-hidden="true">
          <img class="sv-logo-light" src="/paseos-juan-logo.png" alt="" />
          <img class="sv-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan</strong>
          <small>Supervisión del turno</small>
        </span>
      </a>
      <div class="sv-header-end">
        <p class="sv-user">
          <strong>${M(e.nombre||`Pendiente de confirmar`)}</strong>
          <small>${M(ls[e.rol]||e.rol||``)}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${g(`logOut`,`sv-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function gl(){rc();let e=Sc();As=e.now.time;let t=Mc(e),n=`
    <main class="sv-main" id="sv-main">
      ${_l()}
      ${vl(e)}
      ${bl(e,t)}
      ${Sl(e)}
      ${Cl(e,t.routes)}
      ${Dl(e,t)}
      ${Nl(e)}
      ${Pl(e,Pc(t.routes))}
      ${Il(e)}
      ${Ll()}
    </main>
  `;return js===`idle`&&vc()&&setTimeout(xc,0),n}function _l(){let e=y.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=[...new Set(ws.values())],r=t||e||n.length?`warn`:`ok`,i=`${e} cambio${e===1?` espera`:`s esperan`} señal para enviarse.`,a=t?`Sin señal: ves lo último guardado en este teléfono.${e?` ${i}`:``}`:e?i:n.length?`No se pudieron traer algunos datos: ${n.join(` `)}`:`Datos compartidos con el equipo. Se actualizan solos.`;return`
    <section class="sv-sync is-${r}" aria-label="Estado de los datos">
      <p class="sv-sync-text" aria-live="polite">${g(r===`ok`?`radio`:`uploadCloud`,`sv-icon`)} <span>${M(a)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${Is(`sync`)}
    </section>
  `}function vl(e){let t=Wc(e.fecha);return t.length?`
    <section class="sv-card sv-incidents" aria-labelledby="sv-incidents-title">
      <div class="sv-section-head">
        <h2 id="sv-incidents-title" class="sv-title">${g(`alertTriangle`,`sv-icon`)} ${t.length===1?`Hay 1 incidente cargado hoy`:`Hay ${t.length} incidentes cargados hoy`}</h2>
        <p>${t.length===1?`Revisalo`:`Revisalos`} antes de seguir con el turno.</p>
      </div>
      <ul class="sv-incident-list">
        ${t.map(e=>`
          <li class="sv-incident">
            <div class="sv-saved-head">
              <strong>${M(e.titulo||`Incidente`)}</strong>
              <span>${e.hora?`${M(e.hora)} hs · `:``}${M(Gc(e))}${e.lugar?` · ${M(e.lugar)}`:``}${e.barrio?` · ${M(e.barrio)}`:``}</span>
            </div>
            ${e.riesgo||e.lesiones?`
              <p class="sv-chips">
                ${e.riesgo?`<span class="sv-tag is-danger">Riesgo: ${M(e.riesgo)}</span>`:``}
                ${e.lesiones?`<span class="sv-tag is-warn">Lesiones: ${M(e.lesiones)}</span>`:``}
              </p>
            `:``}
            <dl class="sv-obs-detail">
              ${[[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Protocolo`,e.protocolo]].filter(([,e])=>e).map(([e,t])=>`<div><dt>${e}</dt><dd>${M(t)}</dd></div>`).join(``)}
            </dl>
            <p class="sv-source">${M(tc(e,`Cargó`))}</p>
          </li>
        `).join(``)}
      </ul>
    </section>
  `:``}function yl(e,t){let n=pl(e,t),r=e.now.minutes>=zs(S[e.shift].from);return n.length?`
    <div class="sv-team">
      <h2 class="sv-subtitle">Equipo del turno: checklist de salida</h2>
      <ul class="sv-team-list">
        ${n.map(e=>{let t=e.checklist?Hc(e.checklist):null,n=t?e.checklist.pendiente?`info`:t.complete?`ok`:`danger`:r?`warn`:`info`,i=t?t.complete?`Salió con el equipo completo.`:`Equipo incompleto${t.missing.length?`. Falta: ${t.missing.join(`, `)}`:``}.`:`Todavía no cargó el checklist.`;return`
            <li class="sv-note is-${n}">
              ${g(t?.complete?`checkCircle`:`alertTriangle`,`sv-icon`)}
              <strong>${M(e.name)}</strong> <small>(${M(e.roles.join(`, `))})</small>:
              ${M(i)} ${t?.at?`<small>${M(t.at)} hs</small>`:``}
            </li>
          `}).join(``)}
      </ul>
    </div>
  `:`<p class="sv-note is-info"><strong>Equipo del turno:</strong> ${x}. La ruta no tiene paseador asignado y nadie cargó el checklist.</p>`}function bl(e,t){let n=S[e.shift],r=Zs(e.shift,e.now),i=Qs(),a=t.routes.flatMap(t=>Rc(e,t)),o=zc(a),s=t.routes.map(e=>e.supervisor).filter(Boolean),c=[...new Set(s)].join(` y `)||n.supervisor;return`
    <section class="sv-hero sv-now" aria-labelledby="sv-now-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">Ahora · ${M(e.day)} ${e.now.label} · ${e.now.time} hs</p>
          <h1 id="sv-now-title">Turno ${n.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${n.from} a ${n.to} hs
            <span class="sv-moment is-${r.tone}">${r.label}</span>
          </p>
          <p class="sv-source">Supervisa ${M(i.nombre||`Pendiente de confirmar`)}${c&&c!==i.nombre?` · Según la ruta: ${M(c)}`:``}.</p>
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno de hoy">
            ${ns.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${S[t].label}
                <small>${t===Ys(e.now)?`Turno actual`:`${S[t].from} a ${S[t].to}`}</small>
              </button>
            `).join(``)}
          </div>
        </div>
      </div>

      ${e.isCurrent?``:`<p class="sv-note is-info">Estás mirando el turno ${n.label.toLowerCase()} de hoy. El turno actual es el de la ${S[Ys(e.now)].label.toLowerCase()}.</p>`}

      <div class="sv-counter" role="status" aria-live="polite" aria-label="Cumplimiento del turno">
        <p class="sv-counter-line">
          <span class="sv-count is-ok"><b>${o.atiempo}</b> a tiempo</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count ${o.atrasado?`is-danger`:``}"><b>${o.atrasado}</b> ${o.atrasado===1?`atrasado`:`atrasados`}</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count"><b>${o.entregado}</b> ${o.entregado===1?`entregado`:`entregados`}</span>
        </p>
        <p class="sv-source">${Rs(a.length,`perro previsto`,`perros previstos`)}${o.nosale?` · ${o.nosale} no ${o.nosale===1?`sale`:`salen`}`:``} · Atrasado: pasó la hora de retiro + ${as} min. Entrega demorada: el paseo superó lo previsto + ${os} min. Se recalcula cada minuto.</p>
      </div>

      ${t.fallback?`
        <p class="sv-note is-warn">${g(`alertCircle`,`sv-icon`)} <strong>Rutas tomadas de la planilla.</strong> ${t.loading?`Cargando las rutas del coordinador…`:`El coordinador todavía no cargó en la app la ruta de ${M(e.day.toLowerCase())} a la ${n.label.toLowerCase()}.`} Paseador y ayudante: ${x}.</p>
      `:``}

      ${yl(e,t.routes)}
    </section>
  `}function xl(e){return{barrio:``,tipo:us[0],mensaje:``,vigenteHasta:e.fecha,...Ms(j.avisoDraft,{})}}function Sl(e){let t=Kc(e.fecha),n=xl(e),r=wc(`aviso-form`);return`
    <section class="sv-card sv-avisos" aria-labelledby="sv-avisos-title">
      <div class="sv-section-head">
        <h2 id="sv-avisos-title" class="sv-title">${g(`mapPin`,`sv-icon`)} Avisos por barrio vigentes</h2>
        <p>${t.length?`Lo que el equipo tiene que saber hoy en cada barrio.`:Cs.has(`avisos`)?`No hay avisos vigentes.`:`Cargando avisos…`}</p>
      </div>
      ${t.length?`
        <ul class="sv-aviso-list">
          ${t.map(e=>`
            <li class="sv-aviso ${e.tipo===`seguridad`||e.tipo===`perro suelto`?`is-danger`:``}">
              <div class="sv-saved-head">
                <strong>${M(e.barrio||`Pendiente de confirmar`)}</strong>
                <span class="sv-tag ${e.tipo===`seguridad`||e.tipo===`perro suelto`?`is-danger`:`is-warn`}">${M(e.tipo||`otro`)}</span>
              </div>
              <p>${M(e.mensaje||``)}</p>
              <p class="sv-source">${e.vigenteHasta?`Vigente hasta ${M(Ws(e.vigenteHasta))}`:`Vigente hoy`} · ${M(tc(e,`Cargó`))}</p>
            </li>
          `).join(``)}
        </ul>
      `:``}
      <details class="sv-more" data-sv-fold="aviso-form" ${r?`open`:``}>
        <summary>${g(`plus`,`sv-icon`)} Cargar un aviso nuevo</summary>
        <form class="sv-form" data-sv-aviso-form novalidate>
          <p class="sv-hint">Lo ve todo el equipo y marketing. Sin domicilios, teléfonos ni datos de tutores.</p>
          <div class="sv-form-grid">
            <label class="sv-field" for="sv-aviso-barrio">Barrio
              <input type="text" id="sv-aviso-barrio" data-sv-aviso="barrio" list="sv-barrios" value="${M(n.barrio)}" autocomplete="off" required />
              <datalist id="sv-barrios">${Rn.map(e=>`<option value="${M(e)}"></option>`).join(``)}</datalist>
            </label>
            <label class="sv-field" for="sv-aviso-tipo">Tipo
              <select id="sv-aviso-tipo" data-sv-aviso="tipo">
                ${us.map(e=>`<option value="${e}" ${e===n.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
              </select>
            </label>
          </div>
          <label class="sv-field" for="sv-aviso-mensaje">Qué pasa
            <span class="sv-field-hint" id="sv-aviso-mensaje-hint">Ej.: corte de calle en la entrada sur hasta las 12. Entrar por la otra puerta.</span>
            <textarea id="sv-aviso-mensaje" rows="2" data-sv-aviso="mensaje" aria-describedby="sv-aviso-mensaje-hint" required>${M(n.mensaje)}</textarea>
          </label>
          <label class="sv-field sv-field-short" for="sv-aviso-hasta">Vigente hasta
            <input type="date" id="sv-aviso-hasta" data-sv-aviso="vigenteHasta" value="${M(n.vigenteHasta)}" min="${e.fecha}" required />
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-aviso-save">${g(`send`,`sv-icon`)} Publicar aviso</button>
          </div>
        </form>
      </details>
      ${Is(`aviso`)}
    </section>
  `}function Cl(e,t){if(!t.some(e=>e.stops.length))return``;let n=$c(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${g(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Bozales e incompatibles primero. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>wl(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos-detector" ${wc(`avisos-detector`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>wl(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function wl(e,t){return`
    <li class="sv-warning is-${e.tone}">
      <div class="sv-warning-head">
        ${t?`<span class="sv-rank" aria-label="Prioridad ${t}">${t}</span>`:`<span class="sv-warning-icon">${g(e.icon,`sv-icon`)}</span>`}
        <h3>${M(e.title)}</h3>
      </div>
      <ul class="sv-warning-lines">
        ${e.lines.map(e=>`<li>${M(e)}</li>`).join(``)}
      </ul>
      <p class="sv-warning-action"><strong>Qué hacer:</strong> ${M(e.action)}</p>
      <p class="sv-source">${M(e.source)}</p>
    </li>
  `}function Tl(e){let t=e.dog,n=(t?.safety||[]).map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?M(e):`<b>${M(e)}</b>`}</li>`});if(e.nota&&!(t?.safety||[]).some(t=>Vs(t).includes(Vs(e.nota)))){let t=/no juntar/i.test(e.nota)?`danger`:/bozal/i.test(e.nota)?`warn`:`info`;n.push(`<li class="sv-chip is-${t}"><b>Ruta:</b> ${M(e.nota)}</li>`)}return t&&t.status!==`Activo`&&n.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${M(t.status)}</li>`),t||n.unshift(`<li class="sv-chip is-danger"><b>Sin ficha:</b> ${x}</li>`),n.length?`<ul class="sv-chips" aria-label="Avisos de ${M(e.perroNombre)}">${n.join(``)}</ul>`:``}function El(e,t,n){let r=Qs(),i=S[e.shift],a=ll(t.paseador),o=n.filter(e=>e.status.live===`atrasado`),s=zc(n),c=[`Hola${a?` ${a}`:``}, te escribe ${r.nombre||`el supervisor`} (supervisión ${yn.name}).`,`Ruta ${t.code}, turno ${i.label.toLowerCase()} ${e.fechaLabel}: ${s.entregado} entregados de ${n.length-s.nosale}.`];return o.length?(c.push(`Veo atrasados: ${o.map(e=>`${e.stop.perroNombre} (${e.status.kind===`demorada`?`entrega demorada`:`retiro ${e.stop.hora}`}, ${e.status.label.replace(/^\D+/,``)})`).join(`; `)}.`),c.push(`¿Cómo vienen? Avisame si necesitás ayuda.`)):c.push(`¿Cómo vienen? Avisame cualquier cosa.`),c.join(`
`)}function Dl(e,t){let{routes:n}=t;if(!n.length)return`
      <section class="sv-card" aria-labelledby="sv-routes-title">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno</h2>
        <p class="sv-empty">${t.loading?`Cargando rutas…`:`No hay rutas cargadas para ${M(e.day.toLowerCase())} a la ${S[e.shift].label.toLowerCase()} (ni en la app ni en la planilla).`}</p>
        ${Al(e,``,``,`Pedir una ruta al coordinador`)}
        ${Ml(e,``,``)}
      </section>
    `;let r=Ic(),i=new Set(n.flatMap(e=>e.stops.map(e=>e.perroId)).filter(Boolean)),a=ic(`paseos`).filter(t=>t.fecha===e.fecha&&String(t.id).endsWith(`_${e.shift}`)&&t.perroId&&!i.has(t.perroId));return`
    <section class="sv-routes" aria-labelledby="sv-routes-title">
      <div class="sv-section-head sv-routes-head">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno: retiro y entrega</h2>
        <p>Las arma el coordinador. Vos controlás que se cumplan. Si hay que cambiar algo, pedíselo con «Pedir cambio al coordinador».</p>
      </div>
      ${n.map(t=>Ol(e,t,r)).join(``)}
      ${a.length?`
        <div class="sv-card">
          <h3 class="sv-subtitle">Marcados fuera de la ruta</h3>
          <ul class="sv-extra-list">
            ${a.map(e=>`<li class="sv-note is-info"><strong>${M(e.perroNombre||e.perroId)}</strong>: ${M(e.estado||`pendiente`)}. ${M(tc(e))}</li>`).join(``)}
          </ul>
        </div>
      `:``}
    </section>
  `}function Ol(e,t,n){let r=Rc(e,t,n),i=zc(r),a=ll(t.paseador),o=ll(t.ayudante),s=Jc(e.fecha,e.shift).filter(e=>e.ruta===t.code&&!e.perroId),c=`control-${t.code}`;return`
    <article class="sv-card sv-route-card" aria-labelledby="sv-route-${Bs(t.code)}">
      <div class="sv-route-head">
        <div>
          <h3 id="sv-route-${Bs(t.code)}" class="sv-route-title"><span class="sv-route-code">${M(t.code)}</span> ${Rs(t.stops.length,`perro`,`perros`)}</h3>
          <p class="sv-route-people">
            <span>${g(`userCheck`,`sv-icon`)} Paseador: <strong>${M(a||`Pendiente de confirmar`)}</strong></span>
            <span>${g(`users`,`sv-icon`)} Ayudante: <strong>${M(o||(t.source===`planilla`?`Pendiente de confirmar`:`sin ayudante`))}</strong></span>
          </p>
          <p class="sv-source">${M(Nc(t))}${t.record.actualizadoEn&&t.source!==`planilla`?` · ${M(tc(t.record,`Último cambio de`))}`:``}</p>
          ${t.notas?`<p class="sv-hint">Notas de la ruta: ${M(t.notas)}</p>`:``}
        </div>
        <p class="sv-route-counts">
          <span class="sv-tag is-ok">${i.atiempo} a tiempo</span>
          <span class="sv-tag ${i.atrasado?`is-danger`:`is-neutral`}">${Rs(i.atrasado,`atrasado`,`atrasados`)}</span>
          <span class="sv-tag is-neutral">${Rs(i.entregado,`entregado`,`entregados`)}</span>
        </p>
      </div>
      <div class="sv-actions">
        <a class="sv-button" id="sv-wa-${Bs(t.code)}" href="https://wa.me/?text=${encodeURIComponent(El(e,t,r))}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`sv-icon`)} ${a?`Escribirle a ${M(a)} por WhatsApp`:`Escribir al paseador por WhatsApp`}
        </a>
        ${Al(e,t.code,``,`Pedir cambio al coordinador`)}
      </div>
      ${jl(s)}
      ${Ml(e,t.code,``)}
      ${Is(c)}
      <ol class="sv-stop-list">
        ${r.map(n=>kl(e,t,n)).join(``)}
      </ol>
    </article>
  `}function kl(e,t,n){let{stop:r,id:i,status:a}=n,o=i&&bs.has(i),s=a.record,c=Bs(`${t.code}-${r.perroId||r.perroNombre}`),l=[s?.horaRetiro&&a.retirado?`Retiro ${s.horaRetiro}`:``,s?.horaPaseo&&a.retirado?`Paseo ${s.horaPaseo}`:``,s?.horaEntrega&&a.kind===`entregado`?`Entrega ${s.horaEntrega}`:``].filter(Boolean),u=Jc(e.fecha,e.shift).filter(e=>e.perroId&&e.perroId===r.perroId),d=vs.has(i)?vs.get(i):s?.nota||``,f=ys.has(i)||vs.has(i)&&vs.get(i)!==(s?.nota||``),p=a.kind===`entregado`&&a.late?`<span class="sv-tag is-warn">Con atraso</span>`:a.kind===`curso`&&a.pickupLate?`<span class="sv-tag is-warn">Retiro +${a.pickupDelay} min</span>`:``;return`
    <li class="sv-stop is-${a.kind}">
      <div class="sv-stop-time">
        <strong>${M(r.hora||`--:--`)}</strong>
        <small>${r.minutos?`${r.minutos} min`:`min sin confirmar`}</small>
      </div>
      <div class="sv-stop-body">
        <div class="sv-stop-head">
          <h4>${M(r.perroNombre)}</h4>
          <span class="sv-state is-${a.tone}">${M(a.label)}</span>
          ${p}
        </div>
        ${Tl(r)}
        ${l.length||s?`
          <p class="sv-source">${M(l.join(` · `))}${l.length?` · `:``}${M(tc(s))}</p>
        `:``}
        ${s?.nota?`<p class="sv-stop-note"><b>Nota para el paseador:</b> ${M(s.nota)}</p>`:``}
        ${jl(u)}
        ${r.perroId?`
          <div class="sv-stop-actions" ${o?`aria-busy="true"`:``}>
            ${a.kind===`nosale`?`
              <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${c}" data-sv-absent="${r.perroId}" data-ruta="${M(t.code)}" aria-label="Deshacer: ${M(r.perroNombre)} sí sale">Deshacer «no sale»</button>
            `:`
              <button type="button" class="sv-button ${a.retirado?`is-checked`:`sv-button-primary`}" id="sv-pickup-${c}" data-sv-pickup="${r.perroId}" data-ruta="${M(t.code)}" aria-pressed="${a.retirado}" aria-label="${a.retirado?`Desmarcar retiro de ${M(r.perroNombre)}`:`Marcar a ${M(r.perroNombre)} como retirado`}">
                ${a.retirado?`${g(`checkCircle`,`sv-icon`)} Retirado`:`Retirado`}
              </button>
              <button type="button" class="sv-button ${a.kind===`entregado`?`is-checked`:``}" id="sv-deliver-${c}" data-sv-deliver="${r.perroId}" data-ruta="${M(t.code)}" aria-pressed="${a.kind===`entregado`}" ${a.retirado?``:`disabled`} aria-label="${a.kind===`entregado`?`Desmarcar entrega de ${M(r.perroNombre)}`:`Marcar a ${M(r.perroNombre)} como entregado`}">
                ${a.kind===`entregado`?`${g(`checkCircle`,`sv-icon`)} Entregado`:`Entregado`}
              </button>
              ${a.retirado?``:`<button type="button" class="sv-button sv-button-quiet" id="sv-absent-${c}" data-sv-absent="${r.perroId}" data-ruta="${M(t.code)}" aria-label="${M(r.perroNombre)} no sale">No sale</button>`}
            `}
          </div>
          <details class="sv-stop-more" data-sv-stop-more="${i}" ${f?`open`:``}>
            <summary>Nota para el paseador y pedido de cambio</summary>
            <div class="sv-stop-more-body">
              <label class="sv-field" for="sv-note-${c}">Nota para el paseador
                <span class="sv-field-hint" id="sv-note-${c}-hint">La ve en su ruta. Sin datos de tutores.</span>
                <input type="text" id="sv-note-${c}" data-sv-note="${i}" value="${M(d)}" maxlength="200" aria-describedby="sv-note-${c}-hint" autocomplete="off" />
              </label>
              <div class="sv-actions">
                <button type="button" class="sv-button" id="sv-note-save-${c}" data-sv-note-save="${r.perroId}" data-ruta="${M(t.code)}">Guardar nota</button>
                ${Al(e,t.code,r.perroId,`Pedir cambio al coordinador`)}
              </div>
            </div>
          </details>
          ${Ml(e,t.code,r.perroId)}
        `:`<p class="sv-hint">Sin ficha en el registro de perros: no se puede marcar desde acá.</p>`}
      </div>
    </li>
  `}function Al(e,t,n,r){return`<button type="button" class="sv-button sv-button-quiet" id="${Bs(`sv-req-open-${t||`turno`}-${n||`ruta`}`)}" data-sv-request-open data-ruta="${M(t)}" data-dog="${M(n)}">${g(`send`,`sv-icon`)} ${M(r)}</button>`}function jl(e){return e.length?`
    <ul class="sv-request-badges">
      ${e.map(e=>{let t=fs[e.estado]||fs.pendiente;return`<li class="sv-tag is-${t.tone}">Pedido «${M(e.tipo||`cambio`)}»: ${t.label}${e.pendiente?` (sin enviar)`:``}</li>`}).join(``)}
    </ul>
  `:``}function Ml(e,t,n){let r=Zc(e);return!r.open||r.ruta!==t||(r.perroId||``)!==(n||``)?``:`
    <form class="sv-form sv-request-form" data-sv-request-form novalidate aria-labelledby="sv-req-title">
      <h4 id="sv-req-title">Pedir cambio al coordinador · ${M(`${t?`Ruta ${t}`:`Turno ${S[e.shift].label.toLowerCase()}`}${r.perroNombre?` · ${r.perroNombre}`:``}`)}</h4>
      <p class="sv-hint">El coordinador lo aplica en la ruta y te responde. Hoy, ${M(e.fechaLabel)}.</p>
      <label class="sv-field" for="sv-req-tipo">Qué hay que cambiar
        <select id="sv-req-tipo" data-sv-req="tipo">
          ${ds.map(e=>`<option value="${e}" ${e===r.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
        </select>
      </label>
      <label class="sv-field" for="sv-req-detalle">Detalle${r.tipo===`no sale`?` (opcional)`:``}
        <span class="sv-field-hint" id="sv-req-detalle-hint">Ej.: retirarlo 10:30 en vez de 10:00. O: sumar a Paco a la ruta.</span>
        <textarea id="sv-req-detalle" rows="2" data-sv-req="detalle" aria-describedby="sv-req-detalle-hint">${M(r.detalle)}</textarea>
      </label>
      <label class="sv-field" for="sv-req-motivo">Qué pasó o con quién hablaste
        <span class="sv-field-hint" id="sv-req-motivo-hint">Ej.: hablé con la familia, hoy no está. Sin teléfonos ni domicilios.</span>
        <textarea id="sv-req-motivo" rows="2" data-sv-req="motivo" aria-describedby="sv-req-motivo-hint" required>${M(r.motivo)}</textarea>
      </label>
      <label class="sv-check" for="sv-req-urgente">
        <input type="checkbox" id="sv-req-urgente" data-sv-req="urgente" ${r.urgente?`checked`:``} />
        <span>Urgente: afecta al turno de ahora</span>
      </label>
      <div class="sv-actions">
        <button type="submit" class="sv-button sv-button-primary" id="sv-req-save">${g(`send`,`sv-icon`)} Enviar pedido</button>
        <button type="button" class="sv-button" id="sv-req-cancel" data-sv-request-cancel>Cancelar</button>
      </div>
      ${Is(`request-form`)}
    </form>
  `}function Nl(e){let t=Yc(e.fecha),n=t.filter(e=>(e.estado||`pendiente`)===`pendiente`).length;return`
    <details class="sv-fold" data-sv-fold="pedidos" ${wc(`pedidos`,!0)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`send`,`sv-icon`)} Mis pedidos de cambio</span>
        <span class="sv-fold-meta">${t.length?`${n} pendiente${n===1?``:`s`} de ${t.length}`:Cs.has(`solicitudes`)?`Sin pedidos`:`Cargando…`}</span>
      </summary>
      <div class="sv-fold-body">
        ${Is(`requests`)}
        ${t.length?`
          <ul class="sv-request-list">
            ${t.map(e=>{let t=fs[e.estado]||fs.pendiente,n=e.actualizadoPor&&e.actualizadoPor!==e.creadoPor?tc(e,`Respondió`):``;return`
                <li class="sv-request is-${t.tone}">
                  <div class="sv-saved-head">
                    <strong>${e.urgente?`<span class="sv-tag is-danger">Urgente</span> `:``}${M(qc(e))}</strong>
                    <span class="sv-state is-${t.tone}">${t.label}</span>
                  </div>
                  <p class="sv-source">${M(Ws(e.fecha))} · Turno ${M(String(e.turno||``).toLowerCase()||`Pendiente de confirmar`)} · ${e.pendiente?`Se enviará cuando haya señal.`:`Pedido a las ${M(Ks(e.creadoEn))} hs`}</p>
                  <dl class="sv-obs-detail">
                    ${e.detalle?`<div><dt>Detalle</dt><dd>${M(e.detalle)}</dd></div>`:``}
                    <div><dt>Motivo</dt><dd>${M(e.motivo||`Pendiente de confirmar`)}</dd></div>
                    <div><dt>Respuesta del coordinador</dt><dd>${M(e.respuesta||((e.estado||`pendiente`)===`pendiente`?`Todavía no respondió.`:`Sin comentario.`))}</dd></div>
                  </dl>
                  ${n?`<p class="sv-source">${M(n)}</p>`:``}
                </li>
              `}).join(``)}
          </ul>
        `:`<p class="sv-empty">Todavía no pediste cambios. Usá «Pedir cambio al coordinador» en una ruta o en un perro.</p>`}
      </div>
    </details>
  `}function Pl(e,t){let n=wc(`observaciones`),r=nl(e),i=rl(),a=new Set(t.map(e=>e.id)),o=w.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} en ${cs} días`:`Sin registros`}</span>
      </summary>
      <div class="sv-fold-body">
        <p class="sv-note is-info">Describí lo que se vio y se oyó, no lo que creés que siente el perro. No uses etiquetas como «agresivo», «malo» o «dominante». Sin datos de tutores.</p>
        <form class="sv-obs-form" data-sv-obs-form novalidate>
          <div class="sv-form-grid sv-form-grid-3">
            <label class="sv-field" for="sv-obs-dog">Perro
              <select id="sv-obs-dog" data-sv-obs="dogId" required>
                <option value="">Elegí un perro</option>
                ${t.length?`<optgroup label="De este turno">${t.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${M(e.name)}</option>`).join(``)}</optgroup>`:``}
                <optgroup label="Otros perros">${o.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${M(e.name)}</option>`).join(``)}</optgroup>
              </select>
            </label>
            <label class="sv-field" for="sv-obs-fecha">Fecha (DD/MM/AAAA)
              <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${M(r.fecha)}" inputmode="numeric" placeholder="${e.now.label}" maxlength="10" autocomplete="off" required />
            </label>
            <label class="sv-field" for="sv-obs-hora">Hora (opcional)
              <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${M(r.hora)}" />
            </label>
          </div>
          ${el.map(e=>`
            <label class="sv-field" for="sv-obs-${e.key}">${e.label}
              <span class="sv-field-hint" id="sv-obs-${e.key}-hint">${e.hint}</span>
              ${e.type===`input`?`<input type="text" id="sv-obs-${e.key}" data-sv-obs="${e.key}" value="${M(r[e.key])}" aria-describedby="sv-obs-${e.key}-hint" required />`:`<textarea id="sv-obs-${e.key}" rows="2" data-sv-obs="${e.key}" aria-describedby="sv-obs-${e.key}-hint" required>${M(r[e.key])}</textarea>`}
            </label>
          `).join(``)}
          <label class="sv-check" for="sv-obs-seguimiento">
            <input type="checkbox" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${r.seguimiento?`checked`:``} />
            <span>Requiere seguimiento (avisar a Juan)</span>
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-obs-save">${g(`checkCircle`,`sv-icon`)} Guardar observación</button>
          </div>
          ${Is(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${cs} días</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>Fl(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function Fl(e){let t=gs===e.id,n=e.perroNombre||Tc(e.perroId)?.name||`Pendiente de confirmar`;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${M(n)}</strong>
        <span>${M(Ws(e.fecha))}${e.hora?` · ${M(e.hora)} hs`:``}${e.lugar?` · ${M(e.lugar)}`:``}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${M(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Reacción</dt><dd>${M(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${M(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Resultado</dt><dd>${M(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${M(il(e))}</p>
      <div class="sv-actions">
        ${t?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${g(`copy`,`sv-icon`)} Copiar texto</button>
          ${$s(e)?`<button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function Il(e){let t=wc(`cierre`),n=sl(e),r=fl(e),i=n?.cerrado?n.horaCierre||Ks(n.actualizadoEn):``;return`
    <details class="sv-fold" data-sv-fold="cierre" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`flag`,`sv-icon`)} Cerrar el turno ${S[e.shift].label.toLowerCase()}</span>
        <span class="sv-fold-meta">${n?.cerrado?`Cerrado ${M(i)} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        ${n?`<p class="sv-source">${M(n.cerrado?tc(n,`Lo cerró`):tc(n,`Última nota de`))}</p>`:``}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${M(cl(e))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar (incluye el cumplimiento del horario)
          <textarea id="sv-close-summary" class="sv-summary" rows="16" readonly>${M(r)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${g(`copy`,`sv-icon`)} Copiar resumen</button>
          ${n?.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${g(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${Is(`closure`)}
      </div>
    </details>
  `}function Ll(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${wc(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(Tn).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas y horarios: los arma el coordinador (plantilla semanal y cambios del día). Respaldo: ${yn.officialSources.routes}, leída el ${vn}.</li>
          <li>Perros: ${yn.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador. Incidentes y checklist los carga el equipo en la calle.</li>
          <li>Avisos por barrio, pedidos de cambio, observaciones y cierres se comparten con el equipo según permisos.</li>
        </ul>
      </div>
    </details>
  `}function F(e){if(!e)return fc();dc(),$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function Rl(){return Hs().time}async function zl(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function Bl(e,t,n){let r=Mc(e).routes.find(e=>e.code===t),i=r?.stops.find(e=>e.perroId===n);return r&&i?{route:r,stop:i}:null}function Vl(e,t,n,r){let i=Fc(e.fecha,n.perroId,e.shift),a=Ic().get(i),o={id:i,fecha:e.fecha,...r};return a||Object.assign(o,{perroId:n.perroId,perroNombre:n.perroNombre,turno:S[e.shift].label}),a?.ruta!==t.code&&(o.ruta=t.code),o}async function Hl(e,t,n,r){let i=Sc(),a=Bl(i,e,t);if(!a)return;let{route:o,stop:s}=a,c=Fc(i.fecha,t,i.shift);if(bs.has(c))return;let l=Ic().get(c),u=Lc(s,l,i.now.minutes),d=Rl(),f={horaRetiro:``,horaPaseo:``,horaEntrega:``},p=s.perroNombre,m=null,h=``,g=`ok`;if(n===`retiro`){if(u.retirado)m={estado:`pendiente`,...f},h=`${p}: retiro desmarcado.`,g=`info`;else{m={estado:`retirado`,horaRetiro:d};let e=u.planned===null?0:i.now.minutes-u.planned;h=`${p}: retirado a las ${d} hs${e>as?` (${e} min después de lo previsto)`:``}.`}}else if(n===`entrega`){if(!u.retirado)return;u.kind===`entregado`?(m={estado:l?.horaPaseo?`paseando`:`retirado`,horaEntrega:``},h=`${p}: entrega desmarcada.`,g=`info`):(m={estado:`entregado`,horaEntrega:d},h=`${p}: entregado a las ${d} hs.`)}else if(n===`no-sale`){if(u.kind===`nosale`)m={estado:`pendiente`},h=`${p}: vuelve a la lista.`;else{if(u.retirado)return;m={estado:`no-sale`,...f},h=`${p}: no sale hoy. Si cambia la ruta, pedíselo al coordinador.`}}m&&(bs.add(c),await ac(`paseos`,Vl(i,o,s,m),`control-${o.code}`,h,g),bs.delete(c),F(r))}async function Ul(e,t,n){let r=Sc(),i=Bl(r,e,t);if(!i)return;let{route:a,stop:o}=i,s=Fc(r.fecha,t,r.shift),c=String(vs.has(s)?vs.get(s):document.querySelector(`[data-sv-note="${s}"]`)?.value||``).trim();if(is.test(c))return P(`control-${a.code}`,`La nota parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),F(n);await ac(`paseos`,Vl(r,a,o,{nota:c}),`control-${a.code}`,c?`Nota para el paseador guardada en ${o.perroNombre}.`:`Nota de ${o.perroNombre} borrada.`)&&vs.delete(s),F(n)}async function Wl(e){let t=Sc(),n=xl(t);e.querySelectorAll(`[data-sv-aviso]`).forEach(e=>{n[e.dataset.svAviso]=e.value}),N(j.avisoDraft,n);let r=n.barrio.trim(),i=n.mensaje.trim();if(!r||!i)return P(`aviso`,`Falta completar: ${Ls([!r&&`barrio`,!i&&`qué pasa`].filter(Boolean))}.`,`error`),F(r?`sv-aviso-mensaje`:`sv-aviso-barrio`);if(!/^\d{4}-\d{2}-\d{2}$/.test(n.vigenteHasta)||n.vigenteHasta<t.fecha)return P(`aviso`,`Elegí hasta cuándo vale el aviso (hoy, ${t.fechaLabel}, o después).`,`error`),F(`sv-aviso-hasta`);if(is.test(i)||is.test(r))return P(`aviso`,`El aviso parece tener un teléfono. Sacalo: los avisos no llevan datos de contacto.`,`error`),F(`sv-aviso-mensaje`);let a=us.includes(n.tipo)?n.tipo:`otro`;return await ac(`avisos`,{fecha:t.fecha,barrio:r,tipo:a,mensaje:i,vigenteHasta:n.vigenteHasta,titulo:`${a[0].toUpperCase()}${a.slice(1)} · ${r}`},`aviso`,`Aviso de ${r} publicado. Lo ve el equipo.`)&&N(j.avisoDraft,{barrio:``,tipo:us[0],mensaje:``,vigenteHasta:t.fecha}),F(`sv-aviso-save`)}async function Gl(e){let t=Sc(),n=Zc(t);e.querySelectorAll(`[data-sv-req]`).forEach(e=>{n[e.dataset.svReq]=e.type===`checkbox`?e.checked:e.value}),N(j.requestDraft,n);let r=String(n.detalle||``).trim(),i=String(n.motivo||``).trim(),a=[];if(!r&&n.tipo!==`no sale`&&a.push(`detalle`),i||a.push(`qué pasó o con quién hablaste`),a.length)return P(`request-form`,`Falta completar: ${Ls(a)}.`,`error`),F(!r&&n.tipo!==`no sale`?`sv-req-detalle`:`sv-req-motivo`);if(is.test(r)||is.test(i))return P(`request-form`,`El pedido parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),F(`sv-req-motivo`);let o=ds.includes(n.tipo)?n.tipo:`otro`,s=S[t.shift].label,c={fecha:t.fecha,turno:s,ruta:n.ruta||``,tipo:o,perroId:n.perroId||``,perroNombre:n.perroNombre||``,detalle:r||(o===`no sale`?`${n.perroNombre||`El perro`} no sale hoy.`:``),motivo:i,urgente:!!n.urgente,estado:`pendiente`,respuesta:``,titulo:`${n.urgente?`URGENTE · `:``}${o[0].toUpperCase()}${o.slice(1)}${n.perroNombre?` · ${n.perroNombre}`:``}${n.ruta?` · ${n.ruta}`:``} · ${s} ${t.fechaLabel}`},l=await ac(`solicitudes`,c,n.ruta?`control-${n.ruta}`:`requests`,`Pedido enviado al coordinador: ${qc(c)}. Lo vas a ver en «Mis pedidos de cambio».`);return l?(l.pendiente||Es.set(l.id,`pendiente`),N(j.requestDraft,Xc(t)),F(Bs(`sv-req-open-${n.ruta||`turno`}-${n.perroId||`ruta`}`))):(hs&&(hs.area=`request-form`),F(`sv-req-save`))}async function Kl(e){let t=Sc(),n=nl(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),N(j.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),el.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())});let i=Gs(n.fecha);if(!r.length&&!i)return P(`observation`,`Escribí una fecha real como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),F(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return P(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),F(`sv-obs-fecha`);if(r.length)return P(`observation`,`Falta completar: ${Ls(r)}.`,`error`),F(n.dogId?n.fecha?`sv-obs-${el.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=el.find(e=>rs.test(n[e.key]));if(a){let e=n[a.key].match(rs)[2];return P(`observation`,`En «${a.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),F(`sv-obs-${a.key}`)}let o=Tc(n.dogId);return await ac(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:S[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada. La ve el equipo.`)&&N(j.observationDraft,tl(t)),F(`sv-obs-save`)}async function ql(e,t,n,r){let i=ol(e),a=cl(e),o=Qs(),s=fl(e,{...sl(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoPorNombre:o.nombre,actualizadoEn:new Date().toISOString(),pendiente:!1});await ac(`cierres`,{id:i,fecha:e.fecha,turno:S[e.shift].label,notas:a,resumen:s,...t},`closure`,n,t.cerrado===!1?`info`:`ok`)&&_s?.id===i&&_s.notas===a&&(_s=null),F(r)}function Jl(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return l_(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return cc(!0),!0;let n=t.closest(`[data-sv-shift]`);if(n)return Cc(n.dataset.svShift),F(n.id),!0;let r=t.closest(`[data-sv-pickup]`);if(r)return Hl(r.dataset.ruta,r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return Hl(i.dataset.ruta,i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=Bs(`${a.dataset.ruta}-${a.dataset.svAbsent}`),t=Sc(),n=Ic().get(Fc(t.fecha,a.dataset.svAbsent,t.shift))?.estado===`no-sale`;return Hl(a.dataset.ruta,a.dataset.svAbsent,`no-sale`,n?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-note-save]`);if(o)return Ul(o.dataset.ruta,o.dataset.svNoteSave,o.id),!0;let s=t.closest(`[data-sv-request-open]`);if(s){let e=Sc(),t=Zc(e),n=s.dataset.ruta||``,r=s.dataset.dog||``,i=t.open&&t.ruta===n&&(t.perroId||``)===r;return N(j.requestDraft,i?t:Xc(e,n,r,!0)),F(`sv-req-tipo`),!0}if(t.closest(`[data-sv-request-cancel]`)){let e=Sc(),t=Zc(e);return N(j.requestDraft,Xc(e)),F(Bs(`sv-req-open-${t.ruta||`turno`}-${t.perroId||`ruta`}`)),!0}let c=t.closest(`[data-sv-obs-copy]`);if(c){let e=rl().find(e=>e.id===c.dataset.svObsCopy);return e&&zl(al(e)).then(e=>{P(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),F(c.id)}),!0}let l=t.closest(`[data-sv-obs-delete]`);if(l)return gs=l.dataset.svObsDelete,F(`sv-obs-del-no-${gs}`),!0;let u=t.closest(`[data-sv-obs-delete-ok]`);if(u)return gs=null,sc(`observaciones`,u.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>F(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=gs;return gs=null,F(`sv-obs-del-${e}`),!0}return t.closest(`[data-sv-close-copy]`)?(zl(fl(Sc()),`sv-close-summary`).then(e=>{P(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),F(`sv-close-copy`)}),!0):t.closest(`[data-sv-close-done]`)?(ql(Sc(),{cerrado:!0,horaCierre:Rl()},`Turno marcado como cerrado. No te olvides de copiar el resumen.`,`sv-close-copy`),!0):t.closest(`[data-sv-close-reopen]`)?(ql(Sc(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0):!1}function Yl(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;let n=Sc();if(t.matches(`[data-sv-obs]`)){let e=nl(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,N(j.observationDraft,e),!0}if(t.matches(`[data-sv-aviso]`)){let e=xl(n);return e[t.dataset.svAviso]=t.value,N(j.avisoDraft,e),!0}if(t.matches(`[data-sv-req]`)){let e=Zc(n);return e[t.dataset.svReq]=t.type===`checkbox`?t.checked:t.value,N(j.requestDraft,e),t.tagName===`SELECT`&&F(t.id),!0}return t.matches(`[data-sv-close-notes]`)?(_s={id:ol(n),notas:t.value},t.value===(sl(n)?.notas||``)?(_s=null,!0):(ql(n,{},`Notas del cierre guardadas.`),!0)):!1}function Xl(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=Sc();if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=nl(n);e[t.dataset.svObs]=t.value,N(j.observationDraft,e)}else if(t.matches(`[data-sv-aviso]`)){let e=xl(n);e[t.dataset.svAviso]=t.value,N(j.avisoDraft,e)}else if(t.matches(`[data-sv-req]`)&&t.type!==`checkbox`){let e=Zc(n);e[t.dataset.svReq]=t.value,N(j.requestDraft,e)}else if(t.matches(`[data-sv-note]`))vs.set(t.dataset.svNote,t.value),ys.add(t.dataset.svNote);else if(t.matches(`[data-sv-close-notes]`)){_s={id:ol(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=fl(n))}}function Zl(e){let t=e.target;t.closest?.(`.sv-shell`)&&(t.matches?.(`[data-sv-obs-form]`)?(e.preventDefault(),Kl(t)):t.matches?.(`[data-sv-aviso-form]`)?(e.preventDefault(),Wl(t)):t.matches?.(`[data-sv-request-form]`)&&(e.preventDefault(),Gl(t)))}function Ql(e){let t=e.target;if(e.key!==`Enter`||!t.matches?.(`.sv-shell [data-sv-note]`))return;e.preventDefault();let n=t.closest(`.sv-stop-more-body`)?.querySelector(`[data-sv-note-save]`);n&&Ul(n.dataset.ruta,n.dataset.svNoteSave,t.id)}function $l(e){let t=e.target;if(t.matches?.(`[data-sv-stop-more]`)){t.open?ys.add(t.dataset.svStopMore):ys.delete(t.dataset.svStopMore);return}if(!t.matches?.(`[data-sv-fold]`))return;let n=Ms(j.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,N(j.folds,n))}function eu(){fe.push(Jl),pe.push(Yl),document.addEventListener(`input`,Xl),document.addEventListener(`submit`,Zl),document.addEventListener(`keydown`,Ql),document.addEventListener(`toggle`,$l,!0),_c()}var tu={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,borradores:`paseosJuan_coord_borradores`},nu=`paseosJuan_coord_secciones`;function ru(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function iu(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function au(e){try{localStorage.removeItem(e)}catch{}}var ou=null,su=null;function I(e,t,n=`ok`){ou={section:e,text:t,tone:n},n===`error`?du(t):uu(t)}function cu(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function lu(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function uu(e){lu(cu(`coord-live`,`status`,`polite`),e)}function du(e){lu(cu(`coord-alerta`,`alert`,`assertive`),e)}var fu=`America/Argentina/Buenos_Aires`;function L(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function pu(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function mu(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:fu,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function hu(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||``));if(!t)return!1;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCFullYear()===n&&a.getUTCMonth()===r-1&&a.getUTCDate()===i}function gu(e,t){let[n,r,i]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1,i+t)).toISOString().slice(0,10)}function _u(e){let[t,n,r]=e.split(`-`).map(Number);return C[(new Date(Date.UTC(t,n-1,r)).getUTCDay()+6)%7]}function vu(e){return`${_u(e)} ${pu(e)}`}function yu(e){return gu(b(),-e)}function bu(e,t=6){let n=[],r=b();for(let i=0;i<70&&n.length<t;i+=1){let t=gu(r,i);_u(t)===e&&n.push(t)}return n}function R(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function xu(e){return R(e)}function Su(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}var Cu={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function wu(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>Cu[e]||e).join(`, `):`Sin días`}function Tu(e){let t=Iu.map(t=>{let n=C.filter(n=>kn(e,n,t));return n.length?`${t.toLowerCase()}: ${wu(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function Eu(e,t=!1){let n=ru(nu,{});return e in n?!!n[e]:t}function Du(e,t){iu(nu,{...ru(nu,{}),[e]:t})}var Ou=new Set;function ku(){return document.documentElement.dataset.motion===`calm`}function Au(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:ku()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}function z(e){requestAnimationFrame(()=>document.getElementById(e)?.focus({preventScroll:!1}))}function ju(){return v.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}function Mu(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``));if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n>23||r>59?null:n*60+r}function Nu(e){return Mu(e)!==null}function Pu(e){let t=Mu(e);return t===null?``:`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}var Fu=C.filter(e=>e!==`Domingo`),Iu=[`Mañana`,`Tarde`],Lu={Mañana:`09:00`,Tarde:`14:45`},Ru=new Map(w.map(e=>[e.id,e])),zu=new Map(w.map(e=>[R(e.name),e])),Bu=w.filter(e=>e.review||e.status!==`Activo`);function Vu(e){return e.perroId&&Ru.get(e.perroId)||zu.get(R(e.perroNombre))||null}function Hu(e){return!!e?.safety?.some(e=>/bozal/i.test(e))}function Uu(e){if(!e)return``;let t=R(e),n=bn.find(e=>e.id===t||R(e.name)===t||R(e.name.split(` `)[0])===t);return n?n.name:e}var Wu={solicitudes:()=>({desde:yu(14)}),plantillas:()=>({}),rutas:()=>({desde:b()}),clientes:()=>({}),avisos:()=>({}),pedidos:()=>({}),fichas:()=>({}),resueltos:()=>({}),observaciones:()=>({desde:yu(6)}),incidentes:()=>({desde:yu(6)}),archivos:()=>({})},Gu=Object.keys(Wu),Ku=[`pedidos`,`fichas`,`resueltos`];function qu(e){return y.cached(e,Wu[e]())}var Ju=new Set,Yu=new Map,Xu=new Map,Zu=!1,Qu=!1;function $u(){Zu||(Zu=!0,Je(e=>{Gu.includes(e)&&(Ju.add(e),Yu.delete(e),B())}),window.addEventListener(`online`,()=>{H?.errorSenal&&(H.error=``,H.errorSenal=!1),B()}),window.addEventListener(`offline`,B))}function ed(){let e=v.user();e&&Gu.forEach(t=>{let n=Wu[t](),r=`${e.usuario}|${n.desde||``}`,i=Xu.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};Xu.set(t,a),y.list(t,n).then(()=>{Ju.add(t),Yu.delete(t)}).catch(e=>{e.status!==401&&(Yu.set(t,e.message),du(e.message))}).finally(()=>{Xu.get(t)===a&&(a.stop=y.watch(t,n)),B(),vd()})})}function td(){[...Xu.values()].forEach(e=>e.stop?.()),Xu.clear(),Yu.clear(),ed()}function B(){Qu||(Qu=!0,requestAnimationFrame(()=>{Qu=!1,document.querySelector(`.coord-shell`)&&nd()}))}function nd(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;op.has(t)||(ap[t]=up(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function rd(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}function id(e){let t=v.user();return!t||!e||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function ad(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${mu(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${L(e.creadoPorNombre)}${e.creadoEn?` el ${mu(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre;n.push(`Último cambio${t?` de ${L(t)}`:``}: ${mu(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var od=new Set;async function sd(e,t,{section:n,ok:r}){try{let i=await y.save(e,t);return I(n,i.pendiente?`${r} Sin señal: se enviará cuando vuelva.`:r),i}catch(e){return I(n,`No se pudo guardar: ${e.message}`,`error`),null}finally{B()}}async function cd(e,t,{section:n,ok:r,undo:i=!0}){try{return await y.remove(e,t.id),su=i?{col:e,record:t,section:n}:null,I(n,r),ou.undo=i,!0}catch(e){return I(n,`No se pudo borrar: ${e.message}`,`error`),!1}finally{B()}}function ld(e,t){od.has(e)||(od.add(e),Promise.resolve().then(t).finally(()=>od.delete(e)))}var ud=!1,dd=!1,fd=``,pd=/^[a-z0-9][a-z0-9_.-]{0,90}$/i,md=[`nuevo`,`en-curso`,`resuelto`];function hd(e){return pd.test(String(e||``))?`ant_${String(e)}`:void 0}function gd(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let n=`${t[3]}-${t[2].padStart(2,`0`)}-${t[1].padStart(2,`0`)}`;return hu(n)?n:null}function _d(){let e=b(),t=[];ru(tu.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:tu.pedidos,oldId:n.id,col:`pedidos`,data:{id:hd(n.id),fecha:gd(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:md.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),ru(tu.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:tu.altas,oldId:r,col:`fichas`,data:{id:hd(r),fecha:gd(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})});let n=new Set(qu(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(ru(tu.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:tu.resueltos,oldId:e,skip:!0});return}let i=Ru.get(e);t.push({key:tu.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function vd(){if(!(ud||dd)&&Ku.every(e=>Ju.has(e))){dd=!0;try{let e=ru(tu.borradores,{});Object.entries(e).forEach(([e,t])=>{e!==`pago`&&!ap[e]&&(ap[e]=t)}),au(tu.borradores);let t=_d();if(!t.length){ud=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await y.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[tu.pedidos,tu.altas].forEach(e=>{let t=ru(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?iu(e,t):au(e)});let a=Object.fromEntries(Object.entries(ru(tu.resueltos,{})).filter(([e])=>n.has(`${tu.resueltos}|${e}`)));Object.keys(a).length?iu(tu.resueltos,a):au(tu.resueltos),r&&(fd=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo.`,uu(fd)),n.size?(Yu.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),du(Yu.get(`migracion`))):ud=!0}finally{dd=!1,B()}}}var yd={Mañana:0,Tarde:1},bd=/^[A-Z0-9][A-Z0-9_]{1,19}$/;function xd(e){return e&&Array.isArray(e.paradas)&&e.ruta&&e.dia}function Sd(e,t){return(yd[e.turno]??9)-(yd[t.turno]??9)||String(e.ruta).localeCompare(String(t.ruta))}function Cd(e,t){return`${e}_${xu(t)}`}function wd(e,t){return`${e}_${t}`}function Td(){return qu(`plantillas`).filter(xd)}function Ed(){return qu(`rutas`).filter(e=>xd(e)&&e.fecha)}function Dd(e){return Td().filter(t=>t.dia===e).sort(Sd)}function Od(e){let t=_u(e),n=new Map(Ed().filter(t=>t.fecha===e).map(e=>[e.ruta,e])),r=Dd(t).map(e=>{let t=n.get(e.ruta);return n.delete(e.ruta),t?{...t,origen:`dia`,plantillaId:e.id}:{...e,origen:`plantilla`,plantillaId:e.id}});return n.forEach(e=>r.push({...e,origen:`dia`,plantillaId:``})),r.sort(Sd)}function kd(e){return(e.paradas||[]).filter(e=>Nu(e.hora)).map(e=>e.hora).sort((e,t)=>Mu(e)-Mu(t))}function Ad(e){let t=kd(e);return t.length?t.length===1?Pu(t[0]):`${Pu(t[0])} a ${Pu(t[t.length-1])}`:`Sin horarios`}function jd(e){let t=kd(e);return t.length?Fn(Pu(t[t.length-1]),15):Lu[e.turno]||`09:00`}function Md(e){let t=Mu(e.hora);return t===null?null:[t,t+(Number(e.minutos)||45)]}function Nd(e,t){return e&&t&&e[0]<t[1]&&t[0]<e[1]}function Pd(e,t=[]){let n=[],r=new Map,i=(e,t)=>{n.push(t),e.forEach(e=>r.set(e,[...r.get(e)||[],t]))},a=(e.paradas||[]).map((e,t)=>({stop:e,index:t,dog:Vu(e),win:Md(e)}));a.forEach(({stop:e,index:t,dog:n,win:r})=>{let a=e.perroNombre||n?.name||`Pendiente de confirmar`;r||i([t],`${a}: falta la hora de retiro.`),n?n.status!==`Activo`&&i([t],`${a}: estado «${n.status}».`):i([t],`${a}: no está en el registro de perros (perro sin ficha).`)});let o=new Map;for(let e=0;e<a.length;e+=1)for(let t=e+1;t<a.length;t+=1){let n=a[e],r=a[t];if(!n.dog||!r.dog)continue;if(n.dog.id===r.dog.id){i([n.index,r.index],`${n.dog.name} está dos veces en esta ruta.`);continue}if(!Nd(n.win,r.win))continue;((n.dog.incompatibleWith||[]).includes(r.dog.name)||(r.dog.incompatibleWith||[]).includes(n.dog.name))&&i([n.index,r.index],`No juntar: ${n.dog.name} y ${r.dog.name} van en la misma franja (${Pu(n.stop.hora)} y ${Pu(r.stop.hora)}).`);let s=n.dog.size===`Pequeño`&&r.dog.size===`Grande`?n:r.dog.size===`Pequeño`&&n.dog.size===`Grande`?r:null;if(s){let e=s===n?r:n;o.has(s.index)||o.set(s.index,{small:s,bigs:[]}),o.get(s.index).bigs.push(e)}}return o.forEach(({small:e,bigs:t})=>{let n=[...new Set(t.map(e=>e.dog.name))];i([e.index,...t.map(e=>e.index)],`Tamaños mezclados: ${e.dog.name} (pequeño) comparte franja con ${Su(n)} (${n.length===1?`grande`:`grandes`}).`)}),t.filter(t=>t.ruta!==e.ruta).forEach(e=>{(e.paradas||[]).forEach(t=>{let n=Vu(t);a.forEach(({index:r,dog:a,win:o})=>{a&&n&&a.id===n.id&&Nd(o,Md(t))&&i([r],`${a.name} también está en ${e.ruta} a las ${Pu(t.hora)}.`)})})}),{list:[...new Set(n)],byStop:r}}function Fd(e){return Pd(e,Dd(e.dia))}function Id(e,t){return Pd(e,Od(t))}function Ld(e,{fecha:t}={}){let n=[`*Ruta ${t?`${e.ruta} · ${vu(t)} · ${e.turno}`:`${e.ruta} · ${e.dia} · ${e.turno} (plantilla semanal)`}*`,`Paseador: ${Uu(e.paseador)||`Pendiente de confirmar`} | Ayudante: ${Uu(e.ayudante)||`sin ayudante`} | Supervisa: ${Uu(e.supervisor)||`Pendiente de confirmar`}`],r=(e.paradas||[]).slice().sort((e,t)=>(Mu(e.hora)??9999)-(Mu(t.hora)??9999));return r.forEach((e,t)=>{let r=Vu(e),i=[];e.nota&&i.push(e.nota),Hu(r)&&!/bozal/i.test(e.nota||``)&&i.push(`Usa bozal`),n.push(`${t+1}) ${Pu(e.hora)||`sin hora`} ${e.perroNombre||r?.name||`Pendiente de confirmar`} · ${Number(e.minutos)||45} min${i.length?` · ${i.join(` · `)}`:``}`)}),r.length||n.push(`Sin perros cargados.`),e.notas&&n.push(`Notas: ${e.notas}`),n.join(`
`)}var V=null,Rd=``,zd=``,Bd=``,Vd=!1,Hd=``,Ud=``,Wd=!1;function Gd(){return ru(nu,{}).rutasVista===`dia`?`dia`:`semana`}function Kd(e){iu(nu,{...ru(nu,{}),rutasVista:e})}function qd(){let e=b();return(!hu(Ud)||Ud<e)&&(Ud=e),Ud}function Jd(e){return(e||[]).map(e=>({perroId:e.perroId||``,perroNombre:e.perroNombre||Vu(e)?.name||``,hora:Pu(e.hora)||e.hora||``,minutos:Number(e.minutos)||45,nota:e.nota||``}))}function Yd(e,{modo:t,fecha:n=``,nuevo:r=!1,solicitud:i=null}={}){V={modo:t,fecha:n,nuevo:r,id:t===`plantilla`?Cd(e.ruta,e.dia):wd(n,e.ruta),dia:t===`dia`?_u(n):e.dia,turno:e.turno,ruta:e.ruta,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,paradas:Jd(e.paradas),plantillaId:e.plantillaId||(t===`plantilla`?e.id:``),existeDia:t===`dia`&&e.origen===`dia`?e:null,soloDia:t===`plantilla`&&bu(e.dia)[0]||``,solicitudId:i?.id||``,precarga:``,respuesta:``,sucio:!1},Rd=``,zd=``,Bd=``}function Xd(){V=null,Rd=``,zd=``,Bd=``}function Zd(e,t){let n=t===`Mañana`?`M`:`T`;for(let t=1;t<10;t+=1){let r=`PJ_${t}${n}`;if(!e.some(e=>e.ruta===r))return r}return`PJ_X${n}`}function Qd(){if(!V)return{list:[],byStop:new Map};let e=V.modo===`plantilla`?Dd(V.dia):Od(V.fecha);return Pd(V,e)}function $d(e,t){let n=Nu(zd)?Pu(zd):jd(V);V.paradas.push({perroId:e?.id||``,perroNombre:e?.name||t,hora:n,minutos:e?.minutes||45,nota:e?.incompatibleWith?.length?`No juntar con ${Su(e.incompatibleWith)}`:Hu(e)?`Bozal`:``}),V.sucio=!0,Rd=``,zd=``}function ef(){V.paradas.sort((e,t)=>(Mu(e.hora)??9999)-(Mu(t.hora)??9999)),V.sucio=!0}function tf(){return{dia:V.dia,turno:V.turno,ruta:V.ruta,paseador:V.paseador.trim(),ayudante:V.ayudante.trim(),supervisor:V.supervisor.trim(),notas:V.notas.trim(),paradas:Jd(V.paradas)}}function nf(){let e=String(V.ruta||``).trim().toUpperCase().replace(/\s+/g,`_`);if(!bd.test(e))return[`El código de la ruta tiene que ser como PJ_1M (letras, números y guion bajo).`,`coord-ed-ruta`];if(V.ruta=e,V.nuevo&&(V.modo===`plantilla`?Td().some(t=>t.id===Cd(e,V.dia)):Od(V.fecha).some(t=>t.ruta===e)))return[`Ya hay una ruta ${e} ese día. Elegí otro código o editá la que existe.`,`coord-ed-ruta`];let t=V.paradas.findIndex(e=>!Nu(e.hora));return t>=0?[`Falta la hora de retiro de ${V.paradas[t].perroNombre||`un perro`}.`,`coord-ed-hora-${t}`]:null}var rf={},af=``;function of(){return qu(`solicitudes`).slice().sort(rd)}function sf(){return of().filter(e=>(e.estado||`pendiente`)===`pendiente`).sort((e,t)=>Number(!!t.urgente)-Number(!!e.urgente)||String(e.fecha||``).localeCompare(String(t.fecha||``))||rd(t,e))}function cf(e){return e.perroId&&Ru.get(e.perroId)?Ru.get(e.perroId):zu.get(R(e.perroNombre))||null}function lf(e){let t=/(\d{1,2})\s*[:.h]\s*(\d{2})/.exec(String(e||``));return t?Pu(`${t[1]}:${t[2]}`):``}function uf(e){let t=hu(e.fecha)?e.fecha:b(),n=cf(e),r=Od(t),i=e.ruta?r.find(t=>t.ruta===e.ruta):null;!i&&n&&(i=r.find(t=>(!e.turno||t.turno===e.turno)&&(t.paradas||[]).some(e=>Vu(e)?.id===n.id))),!i&&e.turno&&(i=r.find(t=>t.turno===e.turno));let a=!i;if(!i){let n=e.turno||`Mañana`;i={ruta:e.ruta||Zd(r,n),dia:_u(t),turno:n,paradas:[],origen:`plantilla`}}Yd(i,{modo:`dia`,fecha:t,nuevo:a,solicitud:e});let o=R(e.tipo),s=n?V.paradas.findIndex(e=>Vu(e)?.id===n.id):V.paradas.findIndex(t=>R(t.perroNombre)===R(e.perroNombre)),c=lf(e.detalle),l=n?.name||e.perroNombre||`el perro`;o===`no sale`?s>=0?(V.paradas.splice(s,1),V.precarga=`Ya saqué a ${l} de la ruta. Revisá y guardá.`):V.precarga=`${l} no está en esta ruta: revisá a mano.`:o===`cambiar hora`?s>=0&&c?(V.paradas[s].hora=c,V.precarga=`Ya cambié la hora de ${l} a las ${c}. Revisá y guardá.`):V.precarga=`No pude precargar la hora nueva: cambiala a mano.`:o===`agregar perro`?s>=0?V.precarga=`${l} ya estaba en la ruta: revisá la hora.`:n||e.perroNombre?(c&&(zd=c),$d(n,e.perroNombre),V.precarga=`Ya agregué a ${l} a las ${V.paradas[V.paradas.length-1].hora}. Revisá y guardá.`):V.precarga=`No dice qué perro agregar: buscalo abajo.`:V.precarga=`Este cambio se hace a mano: revisá el pedido y ajustá la ruta.`,V.sucio=!0,V.respuesta=``}var df=[[`activo`,`Activo`],[`pausa`,`En pausa`],[`baja`,`De baja`]],ff=[x,...Sn.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`,`Otro (anotalo en notas)`],pf=[x,`Mañana`,`Tarde`,`Mañana y tarde`],mf=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],hf=``;function gf(){return qu(`clientes`).slice().sort((e,t)=>String(e.nombre||``).localeCompare(String(t.nombre||``),`es`))}function _f(){return qu(`avisos`).slice().sort(rd)}function vf(e,t=b()){return hu(e.vigenteHasta)?e.vigenteHasta>=t:(e.fecha||``)===t}function yf(){return _f().filter(e=>vf(e))}function bf(e){let t=new Map;return e.forEach(e=>{let n=e.barrio||`Sin barrio`;t.has(n)||t.set(n,[]),t.get(n).push(e)}),[...t.entries()].sort((e,t)=>e[0].localeCompare(t[0],`es`))}function xf(){let e=new Map;return[...Rn,...gf().map(e=>e.barrio),..._f().map(e=>e.barrio)].forEach(t=>{let n=String(t||``).trim();n&&!e.has(R(n))&&e.set(R(n),n)}),[...e.values()].sort((e,t)=>e.localeCompare(t,`es`))}function Sf(e){return[`*Aviso Paseos Juan · ${e.barrio||`Sin barrio`}*`,`Tipo: ${e.tipo||`otro`}`,e.mensaje||``,`Vigente hasta: ${hu(e.vigenteHasta)?pu(e.vigenteHasta):pu(e.fecha)}`].filter(Boolean).join(`
`)}var Cf=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],wf=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],Tf=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],Ef={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function Df(e){return e.estado===`curso`?`en-curso`:md.includes(e.estado)?e.estado:`nuevo`}function Of(){return qu(`pedidos`).slice().sort(rd)}function kf(){return qu(`fichas`).slice().sort(rd)}function Af(){let e={};return qu(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function jf(e){return e.datos?.perro||e.perro||``}function Mf(e){return e.filter(e=>e.origen===`web`&&Df(e)===`nuevo`)}function Nf(){let e=Af();return Bu.filter(t=>!e[t.id])}function Pf(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function Ff(e,t,n=`secondary`,r=`Escribirle por WhatsApp`){if(!e)return``;let i=Pf(e);return i?`<a class="coord-btn is-${n}" href="https://wa.me/${i}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${g(`message`,`coord-icon`)}<span>${r}</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`:`<p class="coord-inline-alert">${g(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina.</span></p>`}var If=Fu;function Lf(e){let t=R(e),n=If.map(R),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return If.slice(e,t+1)}return If.filter((e,r)=>t.includes(n[r]))}var Rf=`carnet de vacunas`,zf=[[Rf,`Carnet de vacunas`],[`documento`,`Otro documento`]],Bf={[Rf]:`Carnet de vacunas`,documento:`Documento`,foto:`Foto`};function Vf(e){return e?.tipo===`comprobante de pago`}function Hf(){return qu(`archivos`).filter(e=>e?.id&&!Vf(e)).sort(rd)}function Uf(e){return Hf().find(t=>t.id===e)||null}function Wf(e){return e?.tipo===Rf}function Gf(e){return Bf[e]||`Documento`}function Kf(e){let t=Number(e)||0;return t?t<1048576?`${Math.max(1,Math.round(t/1024))} KB`:`${(t/1048576).toFixed(1).replace(`.`,`,`)} MB`:``}function qf(){return navigator.onLine===!1}function Jf(e,t){return qf()||e?.status===0||e?.name===`TypeError`?`Sin señal: para ${t} archivos hace falta conexión. Probá de nuevo cuando vuelva.`:e?.message||`No se pudo ${t} el archivo.`}function Yf(e){let t=new Set([e.carnet?.id,...Array.isArray(e.archivos)?e.archivos:[]].filter(Boolean));Hf().filter(t=>t.pedidoId===e.id).forEach(e=>t.add(e.id));let n=new Map(qu(`archivos`).map(e=>[e.id,e]));return[...t].filter(e=>!Vf(n.get(e))).map(t=>n.get(t)||(t===e.carnet?.id?{id:t,tipo:Rf,nombreArchivo:e.carnet.nombre||``,perroNombre:e.datos?.perro||``}:{id:t,tipo:`documento`}))}function Xf(e){let t=new Set(Array.isArray(e.archivos)?e.archivos:[]),n=new Set(Array.isArray(e.perros)?e.perros:[]);return Hf().filter(r=>t.has(r.id)||r.clienteId&&r.clienteId===e.id||r.perroId&&n.has(r.perroId)||e.pedidoId&&r.pedidoId===e.pedidoId)}var Zf=new Map;function Qf(){let e=new Map,t=(t,n)=>{Ru.has(t)&&(e.has(t)||e.set(t,[]),e.get(t).some(e=>e.id===n.id)||e.get(t).push(n))},n=gf();return Hf().filter(Wf).forEach(e=>{e.perroId?t(e.perroId,e):n.forEach(n=>{let r=n.archivosPerro?.[e.id];if(r){t(r,e);return}let i=Array.isArray(n.perros)?n.perros:[];i.length===1&&(Array.isArray(n.archivos)&&n.archivos.includes(e.id)||e.clienteId&&e.clienteId===n.id||n.pedidoId&&e.pedidoId===n.pedidoId)&&t(i[0],e)})}),e}function $f(e){return!!(e&&Zf.get(e.id)?.length)}var ep=null;function tp(e,t,n=`ok`){ep={key:e,text:t,tone:n,until:Date.now()+15e3},n===`error`?du(t):uu(t)}function np(e){return!ep||ep.key!==e||Date.now()>ep.until?``:`<p class="coord-flash is-${ep.tone} is-small">${g(ep.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${L(ep.text)}</span></p>`}function rp(e,t){qf()?(tp(t,`Sin señal: para abrir archivos hace falta conexión. Probá de nuevo cuando vuelva.`,`error`),B()):(uu(`Abriendo el archivo en otra pestaña.`),dt.abrir(e).catch(e=>{tp(t,Jf(e,`abrir`),`error`),B()}))}var H=null;function ip(e){let t=Array.isArray(e.perros)?e.perros.filter(e=>Ru.has(e)):[];H={clienteId:e.id,tipo:Rf,perroId:t.length===1?t[0]:``,nota:``,file:null,estado:``,error:``}}var ap={},op=new Set;function sp(e){return ap[e]||{}}function cp(e,t){ap[e]=t,op.delete(e)}function lp(e){delete ap[e],op.add(e)}function up(e){let t={...sp(e.dataset.coordForm)},n=new Set;return e.querySelectorAll(`[name]`).forEach(r=>{if(r.type!==`file`){if(r.type===`checkbox`){if(n.has(r.name))return;n.add(r.name);let i=e.querySelectorAll(`[name="${r.name}"]`);t[r.name]=[...i].filter(e=>e.checked).map(e=>e.value)}else t[r.name]=r.value}}),t}function dp(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${L(r)}" ${i?`placeholder="${L(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function fp(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`,l=r.map(e=>Array.isArray(e)?e:[e,e]);return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``}>
        ${l.map(([e,t])=>`<option value="${L(e)}" ${e===i?`selected`:``}>${L(t)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function pp(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``,required:c=!1}={}){let l=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${l}">${n}${c?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <textarea id="${l}" name="${t}" rows="3" ${i?`placeholder="${L(i)}"`:``} ${a?`aria-describedby="${l}-hint"`:``} ${s}>${L(r)}</textarea>
      ${a?`<small id="${l}-hint">${a}</small>`:``}
    </div>
  `}function mp(e,t){return`
    <div class="coord-field is-wide">
      <span class="coord-label" id="coord-${e}-dias-label">Días</span>
      <div class="coord-days" role="group" aria-labelledby="coord-${e}-dias-label">
        ${Fu.map(n=>`
          <label class="coord-day"><input type="checkbox" id="coord-${e}-dia-${xu(n)}" name="dias" value="${n}" ${t.includes(n)?`checked`:``} /><span>${n}</span></label>
        `).join(``)}
      </div>
    </div>
  `}function hp(e){if(!ou||ou.section!==e)return``;let t=ou.undo?`<button class="coord-link" type="button" id="coord-undo-${e}" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${ou.tone}">${g(ou.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${L(ou.text)}</span>${t}</p>`}function U(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?g(r,`coord-icon`):``}<span>${e}</span></button>`}function gp({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${Eu(e,s)?`open`:``}>
      <summary id="${t}-summary" data-coord-toggle="${e}">
        <span class="coord-section-icon">${g(n,`coord-icon`)}</span>
        <span class="coord-section-title">
          <h2>${r}</h2>
          <small>${i}</small>
        </span>
        <span class="coord-section-badges">${a}</span>
        <span class="coord-chevron">${g(`chevronDown`,`coord-icon`)}</span>
      </summary>
      <div class="coord-section-body">${o}</div>
    </details>
  `}function W(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function _p(e){return e?.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${L(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${g(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${L(e)}</li>`).join(``)}
    </ul>
  `:``}function vp(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${L(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function yp(e,t){return e.length?`
    <div class="coord-warn-box" role="note" ${t?`id="${t}"`:``}>
      <h3>${g(`alertTriangle`,`coord-icon`)}<span>${e.length===1?`1 aviso para revisar`:`${e.length} avisos para revisar`}</span></h3>
      <ul>${e.map(e=>`<li>${L(e)}</li>`).join(``)}</ul>
      <p>No bloquea el guardado: revisalo antes de mandar la ruta.</p>
    </div>
  `:``}function bp(e){let t=$f(e);return`<span class="coord-carnet ${t?`is-ok`:`is-missing`}">${g(t?`fileCheck`:`alertCircle`,`coord-icon`)}<span>Carnet: ${t?`cargado`:`falta`}</span></span>`}function xp(e,t){let n=`${Gf(e.tipo)}${e.perroNombre?` de ${e.perroNombre}`:``}`,r=e.mime===`application/pdf`?`PDF`:e.mime?`Foto`:``,i=[e.creadoPor===`web`?`Llegó por la página web`:e.creadoPorNombre?`Subido por ${e.creadoPorNombre}`:``,e.creadoEn?mu(e.creadoEn):pu(e.fecha),[r,Kf(e.tamano)].filter(Boolean).join(`, `),e.ubicacion===`drive`?`Guardado en Drive`:``].filter(Boolean).join(` · `);return`
    <li class="coord-file">
      <span class="coord-file-icon">${g(Wf(e)?`fileCheck`:`fileText`,`coord-icon`)}</span>
      <span class="coord-file-text">
        <b>${L(n)}</b>
        ${i?`<small>${L(i)}</small>`:``}
        ${e.nota?`<small>${L(e.nota)}</small>`:``}
      </span>
      ${U(`Ver<span class="coord-sr-only"> ${L(n.toLowerCase())} (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${L(e.id)}" data-scope="${L(t)}"`,`ghost`,`eye`)}
    </li>
  `}function Sp(e){let t=Yf(e),n=`pedido-${e.id}`;return t.length?`
    <div class="coord-attach">
      ${t.map(e=>{let t=Wf(e),r=e.creadoEn?`Llegó el ${mu(e.creadoEn)}`:``;return`
          <p class="coord-attach-row">
            ${g(t?`fileCheck`:`fileText`,`coord-icon`)}
            <span><b>${t?`Carnet de vacunas adjunto`:`${L(Gf(e.tipo))} adjunto`}</b>${r?`<small>${L(r)}</small>`:``}</span>
            ${U(`${t?`Ver carnet`:`Ver`}<span class="coord-sr-only"> (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${L(e.id)}" data-scope="${L(n)}"`,`secondary`,`eye`)}
          </p>`}).join(``)}
    </div>
    ${np(n)}
  `:e.origen===`web`&&Df(e)!==`resuelto`?`<p class="coord-meta">${g(`alertCircle`,`coord-icon`)}<span>No mandó el carnet de vacunas: pedíselo al tutor.</span></p>${np(n)}`:np(n)}function Cp(e,t,n,r){return`
    <label class="coord-btn is-secondary coord-file-pick" for="${e}">
      ${g(`camera`,`coord-icon`)}<span>${t}</span>
      <input id="${e}" type="file" accept="image/*,application/pdf" capture="environment" ${n} aria-describedby="${r}" />
    </label>
  `}function wp(e,t){let n=L(e.id),r=H,i=r.estado===`subiendo`,a=`coord-subida-hint-${n}`;return`
    <div class="coord-upload" id="coord-subida-${n}" role="group" aria-labelledby="coord-subida-title-${n}">
      <p class="coord-upload-title" id="coord-subida-title-${n}">Subir carnet o documento de ${L(e.nombre||`este cliente`)}</p>
      ${qf()?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>Sin señal: los archivos no quedan en espera. Elegilo igual y tocá «Subir» cuando vuelva la señal.</span></p>`:``}
      <div class="coord-grid">
        <div class="coord-field">
          <label for="coord-subida-tipo-${n}">Qué es</label>
          <select id="coord-subida-tipo-${n}" data-coord-subida-campo="tipo">
            ${zf.map(([e,t])=>`<option value="${e}" ${e===r.tipo?`selected`:``}>${t}</option>`).join(``)}
          </select>
        </div>
        <div class="coord-field">
          <label for="coord-subida-perro-${n}">De qué perro${r.tipo===Rf&&t.length>1?` <span class="coord-required">(obligatorio)</span>`:``}</label>
          <select id="coord-subida-perro-${n}" data-coord-subida-campo="perroId">
            <option value="">${t.length?r.tipo===Rf?`Elegí el perro`:`De ninguno en especial`:`El cliente no tiene perros cargados`}</option>
            ${t.map(e=>`<option value="${e.id}" ${e.id===r.perroId?`selected`:``}>${L(e.name)}</option>`).join(``)}
          </select>
        </div>
        <div class="coord-field is-wide">
          <span class="coord-label">Foto o PDF <span class="coord-required">(obligatorio)</span></span>
          ${Cp(`coord-subida-archivo-${n}`,r.file?`Cambiar el archivo`:`Sacar foto o elegir archivo`,`data-coord-subida-archivo`,a)}
          <small id="${a}">${r.file?`Elegiste <b>${L(r.file.name)}</b> (${Kf(r.file.size)}).`:`Foto clara o PDF, hasta 3,5 MB. Las fotos se achican solas.`}</small>
        </div>
        <div class="coord-field is-wide">
          <label for="coord-subida-nota-${n}">Nota (opcional)</label>
          <input id="coord-subida-nota-${n}" type="text" value="${L(r.nota)}" data-coord-subida-campo="nota" autocomplete="off" placeholder="Ej.: antirrábica hasta 03/2027" />
        </div>
      </div>
      <p class="coord-upload-status" role="status">${i?`${g(`clock`,`coord-icon`)}<span>Subiendo… No cierres la página.</span>`:``}</p>
      ${r.error?`<p class="coord-flash is-error is-small">${g(`alertCircle`,`coord-icon`)}<span>${L(r.error)}</span></p>`:``}
      <div class="coord-actions">
        ${U(i?`Subiendo…`:`Subir`,`id="coord-subida-ok-${n}" data-coord-subida-ok="${n}" ${i?`aria-disabled="true"`:``}`,`primary`,`uploadCloud`)}
        ${U(`Cancelar`,`id="coord-subida-cancel-${n}" data-coord-subida-cancel="${n}"`,`ghost`)}
      </div>
    </div>
  `}function Tp(e){let t=L(e.id),n=Xf(e),r=(Array.isArray(e.perros)?e.perros:[]).map(e=>Ru.get(e)).filter(Boolean),i=`cliente-${e.id}`;return`
    <div class="coord-docs" role="group" aria-labelledby="coord-docs-${t}">
      <h4 id="coord-docs-${t}">${g(`fileText`,`coord-icon`)}<span>Documentos</span> <span class="coord-count">${n.length}</span></h4>
      ${r.length?`<ul class="coord-carnets" aria-label="Carnet de vacunas por perro">${r.map(e=>`<li><b>${L(e.name)}</b> ${bp(e)}</li>`).join(``)}</ul>`:``}
      ${n.length?`<ul class="coord-files">${n.map(e=>xp(e,i)).join(``)}</ul>`:`<p class="coord-empty is-small">${Ju.has(`archivos`)?`Todavía no hay documentos. Subí el carnet de vacunas de cada perro.`:`Cargando documentos…`}</p>`}
      ${np(i)}
      ${H?.clienteId===e.id?wp(e,r):U(`Subir carnet o documento`,`id="coord-subir-${t}" data-coord-subir="${t}"`,`secondary`,`fileUp`)}
    </div>
  `}var Ep=`
  <datalist id="coord-team-users">${bn.map(e=>`<option value="${L(e.id)}">${L(e.name)} · ${L(e.label)}</option>`).join(``)}</datalist>
  <datalist id="coord-team-names">${bn.map(e=>`<option value="${L(e.name.split(` `)[0])}">${L(e.name)}</option>`).join(``)}</datalist>
`;function Dp(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Op()}
      ${e}
    </div>
  `}function Op(){return`
    <header class="coord-header">
      <a class="coord-brand" href="/coordinador" data-link aria-label="Paseos Juan, panel de coordinación">
        <span class="coord-logo">
          <img class="coord-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="coord-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="coord-brand-text">
          <strong>Coordinación</strong>
          <small>Paseos Juan</small>
        </span>
      </a>
      <div class="coord-header-actions">
        <button class="coord-btn is-ghost is-compact" type="button" data-a11y-toggle aria-controls="a11y-panel">
          ${g(`eye`,`coord-icon`)}<span>Accesibilidad</span>
        </button>
        <a class="coord-btn is-ghost is-compact" href="/salir" data-link>
          ${g(`logOut`,`coord-icon`)}<span>Salir</span>
        </a>
      </div>
    </header>
  `}function kp(){$u(),ed(),Zf=Qf();let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${Ap()}
      ${Mp()}
      ${Pp()}
      ${Fp()}
      ${Up()}
      ${Jp()}
      ${Yp()}
      ${Qp()}
      ${tm()}
      ${lm()}
      ${hm()}
      <p class="coord-footnote">
        Rutas de partida: ${L(yn.officialSources.routes)} (${vn}). Datos de perros: ${L(yn.officialSources.dogs)}.
        Rutas, clientes, avisos y pedidos se guardan en los datos compartidos del equipo. Los carnets y documentos quedan privados: se abren solo con tu usuario. Los pagos los ve solo Juan.
      </p>
      ${Ep}
    </main>
  `;return ou=null,op.clear(),e}function Ap(){let e=y.pendingCount(),t=navigator.onLine===!1,n=[...new Set(Yu.values())],r=[];return e?r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>${e} ${e===1?`cambio pendiente`:`cambios pendientes`} sin señal.</b> Se ${e===1?`envía solo`:`envían solos`} cuando vuelva.${t?` Los archivos (carnet y documentos) no quedan en espera: para subirlos hace falta señal.`:``}</span></p>`):t&&r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva. Los archivos (carnet y documentos) no: para subirlos o abrirlos hace falta señal.</span></p>`),n.length&&r.push(`<div class="coord-sync is-error">${g(`alertCircle`,`coord-icon`)}<span>${n.map(L).join(` `)}</span>${U(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),fd&&r.push(`<p class="coord-sync is-ok">${g(`uploadCloud`,`coord-icon`)}<span>${L(fd)}</span></p>`),r.length?`<div class="coord-sync-list">${r.join(``)}</div>`:``}function jp(e,{compact:t=!1}={}){let n=L(e.id),r=e.estado||`pendiente`,i=e.perroNombre||cf(e)?.name||``,a=e.creadoPorNombre?`${e.creadoPorNombre}${e.creadoEn?`, ${mu(e.creadoEn)}`:``}`:x,o=e.titulo||[e.tipo,i].filter(Boolean).join(`: `),s=af===e.id;return`
    <li class="coord-sol ${e.urgente?`is-urgent`:``} is-${L(r)}" id="coord-sol-${n}" tabindex="-1">
      <div class="coord-sol-head">
        <strong>${L(o||`Pedido de cambio`)}</strong>
        <span class="coord-badges">${e.urgente?W(`Urgente`,`alert`):``}${r===`aplicado`?W(`Aplicado`,`ok`):W(r===`rechazado`?`Rechazado`:`Pendiente`,`warn`)}</span>
      </div>
      <p class="coord-sol-where">${g(`route`,`coord-icon`)}<span>${L([e.fecha?vu(e.fecha):``,e.turno,e.ruta].filter(Boolean).join(` · `)||`Pendiente de confirmar`)}</span></p>
      ${vp([[`Qué cambiar`,e.detalle],[`Por qué`,e.motivo],[`Pidió`,a],[`Respuesta`,e.respuesta]],t?`is-compact`:``)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      ${r===`pendiente`?`
        ${s?`
          <div class="coord-reject">
            <label for="coord-rechazo-${n}">Respuesta para el supervisor <span class="coord-required">(obligatorio)</span></label>
            <textarea id="coord-rechazo-${n}" rows="2" data-coord-rechazo="${n}" placeholder="Ej.: Ese día no hay lugar en la ruta; lo pasamos al lunes.">${L(rf[e.id]||``)}</textarea>
            <div class="coord-actions">
              ${U(`Enviar rechazo`,`id="coord-rechazar-ok-${n}" data-coord-sol-rechazar-ok="${n}"`,`primary`)}
              ${U(`Cancelar`,`data-coord-sol-rechazar-cancel="${n}"`,`ghost`)}
            </div>
          </div>`:`
          <div class="coord-actions">
            ${U(`Aplicar`,`id="coord-aplicar-${n}" data-coord-sol-aplicar="${n}"`,`primary`,`checkCircle`)}
            ${U(`Rechazar`,`id="coord-rechazar-${n}" data-coord-sol-rechazar="${n}"`,`ghost`,`x`)}
          </div>`}`:``}
    </li>
  `}function Mp(){let e=b(),t=ju(),n=Mf(Of()),r=sf(),i=r.filter(e=>e.urgente),a=Td().length>0,o=Od(e),s=o.reduce((t,n)=>t+Id(n,e).list.length,0),c=o.reduce((e,t)=>e+(t.paradas||[]).length,0),l=yf(),u=bf(l).map(([e])=>e),d=Nf(),f;if(i.length)f={text:`Resolvé el pedido urgente de <b>${L(i[0].creadoPorNombre||`supervisión`)}</b>: ${L(i[0].titulo||i[0].tipo||`cambio de ruta`)}.`,action:U(`Aplicar`,`data-coord-sol-aplicar="${L(i[0].id)}"`,`primary`,`arrowRight`)};else if(n.length){let e=n[n.length-1],t=e.datos||{};f={text:`Escribile a <b>${L(t.responsable||`quien hizo el pedido`)}</b> por la evaluación de <b>${L(t.perro||`su perro`)}</b>.`,action:U(`Ver pedido`,`data-coord-goto-pedido="${L(e.id)}"`,`primary`,`arrowRight`)}}else f=!a&&Ju.has(`plantillas`)?{text:`Cargá las rutas de la planilla RPJ para tener la semana armada.`,action:U(`Ir a rutas`,`data-coord-goto="coord-rutas"`,`primary`,`arrowRight`)}:r.length?{text:`Respondé el pedido de cambio de <b>${L(r[0].creadoPorNombre||`supervisión`)}</b>.`,action:U(`Aplicar`,`data-coord-sol-aplicar="${L(r[0].id)}"`,`primary`,`arrowRight`)}:s?{text:`Revisá ${s===1?`el aviso`:`los ${s} avisos`} de las rutas de hoy.`,action:U(`Ver rutas de hoy`,`data-coord-ver-dia="${e}"`,`primary`,`arrowRight`)}:d.length?{text:`Confirmá el dato de <b>${L(d[0].name)}</b>: ${L(d[0].review||`estado "${d[0].status}"`)}`,action:U(`Ver datos`,`data-coord-open="datos"`,`primary`,`arrowRight`)}:{text:`Todo en orden. Mirá las rutas del día siguiente.`,action:U(`Ver el día siguiente`,`data-coord-ver-dia="${gu(e,1)}"`,`primary`,`arrowRight`)};let p=r.slice(0,3);return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${vu(e)}</p>
        <p class="coord-greeting">Hola, ${L(t.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
      </div>

      ${r.length?`
        <div class="coord-sol-alert" id="coord-sol-urgente" tabindex="-1">
          <h2>${g(`bell`,`coord-icon`)}<span>${r.length===1?`1 pedido de cambio del supervisor`:`${r.length} pedidos de cambio del supervisor`}</span></h2>
          ${hp(`solicitudes`)}
          <ul class="coord-sol-list">${p.map(e=>jp(e,{compact:!0})).join(``)}</ul>
          ${r.length>p.length?`<p>Y ${r.length-p.length} más. ${U(`Ver todos`,`data-coord-open="solicitudes"`,`ghost`)}</p>`:``}
        </div>`:hp(`solicitudes`)}

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-alert`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Pedidos nuevos de la web</h2>
            <p class="coord-big"><b>${n.length}</b> <span>sin responder</span></p>
            <p>${n.length?L(Su(n.slice(0,3).map(e=>e.datos?.perro||`Pendiente de confirmar`))):Ju.has(`pedidos`)?`No hay pedidos nuevos.`:`Cargando pedidos…`}</p>
          </div>
          ${U(`Ver pedidos`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${a?s?`is-alert`:`is-ok`:`is-warn`}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Rutas de hoy</h2>
            ${!a&&!o.length?`<p class="coord-big"><b>0</b> <span>rutas</span></p><p>${Ju.has(`plantillas`)?`Todavía no hay rutas cargadas.`:`Cargando rutas…`}</p>`:`<p class="coord-big"><b>${o.length}</b> <span>${o.length===1?`ruta`:`rutas`}</span> <b>${c}</b> <span>paseos</span></p>
                 ${s?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${s} ${s===1?`aviso`:`avisos`} para revisar</span></p>`:`<p>Sin avisos.</p>`}`}
          </div>
          ${U(a?`Ver rutas de hoy`:`Cargar rutas`,a?`data-coord-ver-dia="${e}"`:`data-coord-goto="coord-rutas"`,`secondary`)}
        </li>
        <li class="coord-priority ${l.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Avisos de barrio vigentes</h2>
            <p class="coord-big"><b>${l.length}</b> <span>${l.length?u.length===1?`en 1 barrio`:`en ${u.length} barrios`:`avisos`}</span></p>
            <p>${l.length?L(Su(u.slice(0,3))):`Sin avisos vigentes.`}</p>
          </div>
          ${U(l.length?`Ver avisos`:`Cargar un aviso`,l.length?`data-coord-goto="coord-avisos-vigentes"`:`data-coord-open="avisos"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function Np(e,{history:t=!1}={}){let n=L(e.id);return`
    <li class="coord-aviso ${t?`is-old`:``}">
      <div class="coord-aviso-head">
        ${t?`<strong>${L(e.barrio||`Sin barrio`)}</strong>`:``}
        ${W(L(e.tipo||`otro`),e.tipo===`seguridad`||e.tipo===`perro suelto`?`alert`:`warn`)}
        <small>${t?`Venció`:`Hasta`} el ${L(pu(hu(e.vigenteHasta)?e.vigenteHasta:e.fecha))}</small>
      </div>
      <p>${L(e.mensaje||e.titulo||``)}</p>
      ${ad(e)}
      <div class="coord-actions">
        ${U(`Copiar para WhatsApp`,`data-coord-aviso-copy="${n}"`,`ghost`,`copy`)}
        ${t?``:U(`Ya no está vigente`,`data-coord-aviso-fin="${n}"`,`ghost`)}
      </div>
    </li>
  `}function Pp(){let e=yf();return e.length?`
    <section class="coord-block coord-avisos-strip" id="coord-avisos-vigentes" tabindex="-1" aria-labelledby="coord-avisos-vig-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-avisos-vig-title">Avisos vigentes por barrio</h2>
          <p>Lo que el equipo tiene que saber hoy en cada barrio.</p>
        </div>
        ${U(`Cargar un aviso`,`data-coord-open="avisos"`,`secondary`,`plus`)}
      </div>
      ${hp(`avisosTop`)}
      <div class="coord-barrios">
        ${bf(e).map(([e,t])=>`
          <section class="coord-barrio" aria-label="Avisos en ${L(e)}">
            <h3>${g(`mapPin`,`coord-icon`)}<span>${L(e)}</span> <small>${t.length}</small></h3>
            <ul class="coord-aviso-list">${t.map(e=>Np(e)).join(``)}</ul>
          </section>
        `).join(``)}
      </div>
    </section>
  `:``}function Fp(){let e=Td(),t=!Ju.has(`plantillas`)&&!e.length,n;if(V)n=Hp();else if(t)n=`<p class="coord-empty">${g(`clock`,`coord-icon`)}Cargando rutas…</p>`;else if(!e.length||Hd)n=Ip();else{let e=Gd();n=`
      <div class="coord-seg" role="group" aria-label="Qué querés ver">
        <button type="button" class="coord-seg-btn" id="coord-vista-semana" data-coord-vista="semana" aria-pressed="${e===`semana`}">${g(`calendarCheck`,`coord-icon`)}<span>Semana (se repite)</span></button>
        <button type="button" class="coord-seg-btn" id="coord-vista-dia" data-coord-vista="dia" aria-pressed="${e===`dia`}">${g(`route`,`coord-icon`)}<span>Un día puntual</span></button>
      </div>
      ${e===`semana`?Rp():zp()}
    `}return`
    <section class="coord-block coord-routes" id="coord-rutas" tabindex="-1" aria-labelledby="coord-rutas-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-rutas-title">Rutas y horarios</h2>
          <p>La <b>semana</b> se repite todas las semanas. Si un día puntual cambia algo, guardalo <b>solo para ese día</b>: la semana no se toca.</p>
        </div>
      </div>
      ${hp(`rutas`)}
      ${n}
    </section>
  `}function Ip(){let e=Ln(),t=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <div class="coord-carga">
      <p>Todavía no hay rutas armadas en la app. Podés arrancar con las rutas reales de la planilla RPJ (hoja BASE RUTAS, leída el 12/11/2026): <b>${e.length} rutas</b> y <b>${t} paseos</b> con su hora de retiro. Después las cambiás acá.</p>
      ${Hd?`<p class="coord-note" role="status">${g(`clock`,`coord-icon`)}<span>${L(Hd)}</span></p>`:``}
      ${Vd?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-carga-q">
          <p id="coord-carga-q"><b>¿Confirmás?</b> Se guardan ${e.length} rutas como semana base. Las ve todo el equipo.</p>
          <div class="coord-actions">
            ${U(`Sí, cargar las rutas`,`id="coord-carga-ok" data-coord-carga-ok`,`primary`,`checkCircle`)}
            ${U(`Cancelar`,`id="coord-carga-cancel" data-coord-carga-cancel`,`ghost`)}
          </div>
        </div>`:`<button class="coord-btn is-primary coord-btn-big" type="button" id="coord-carga" data-coord-carga>${g(`uploadCloud`,`coord-icon`)}<span>Cargar las rutas de la planilla RPJ</span></button>`}
      <p class="coord-meta">No incluye a «Llak» (jueves tarde): el nombre no coincide con ningún perro. Paseador y ayudante quedan para completar.</p>
    </div>
  `}function Lp(e,{warnings:t,attrs:n}){let r=(e.paradas||[]).length;return`
    <button type="button" class="coord-wroute ${t?`is-alert`:``}" ${n}>
      <span class="coord-wroute-top"><strong>${L(e.ruta)}</strong>${t?`<span class="coord-wroute-warn">${g(`alertTriangle`,`coord-icon`)}${t}<span class="coord-sr-only"> ${t===1?`aviso`:`avisos`}</span></span>`:``}</span>
      <span>${r} ${r===1?`perro`:`perros`} · ${L(Ad(e))}</span>
      <small>${e.paseador?L(Uu(e.paseador)):`Sin paseador`}</small>
    </button>
  `}function Rp(){let e=Td(),t=_u(b()),n=e.some(e=>e.dia===`Domingo`)?C:Fu,r=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <p class="coord-meta">${e.length} rutas · ${r} paseos por semana. Tocá una ruta para editar sus horarios.</p>
    <div class="coord-week">
      ${n.map(e=>`
        <section class="coord-wday ${e===t?`is-today`:``}" aria-labelledby="coord-wday-${xu(e)}">
          <h3 id="coord-wday-${xu(e)}">${e}${e===t?` <span class="coord-tag">Hoy</span>`:``}</h3>
          ${Iu.map(t=>`
              <div class="coord-wturno">
                <p class="coord-wturno-label">${t}</p>
                ${Dd(e).filter(e=>e.turno===t).map(n=>Lp(n,{warnings:Fd(n).list.length,attrs:`id="coord-wr-${L(n.id)}" data-coord-edit-plantilla="${L(n.id)}" aria-label="Editar ${L(n.ruta)} del ${e.toLowerCase()} a la ${t.toLowerCase()}"`})).join(``)}
                <button type="button" class="coord-wadd" id="coord-wadd-${xu(e)}-${xu(t)}" data-coord-new-route data-dia="${e}" data-turno="${t}">${g(`plus`,`coord-icon`)}<span>Ruta</span><span class="coord-sr-only"> nueva el ${e.toLowerCase()} a la ${t.toLowerCase()}</span></button>
              </div>
            `).join(``)}
        </section>
      `).join(``)}
    </div>
  `}function zp(){let e=b(),t=qd(),n=Od(t),r=n.reduce((e,t)=>e+(t.paradas||[]).length,0),i=new Set;n.forEach(e=>(e.paradas||[]).forEach(e=>{let t=Vu(e);$f(t)||i.add(t?.id||R(e.perroNombre))}));let a=Wd&&n.length>0;return`
    <div class="coord-dayview">
      <div class="coord-day-pick">
        <div class="coord-field">
          <label for="coord-rutas-fecha">Día</label>
          <input id="coord-rutas-fecha" type="date" value="${t}" min="${e}" max="${gu(e,90)}" data-coord-rutas-fecha />
        </div>
        <div class="coord-day-quick">
          ${U(`Hoy`,`id="coord-dia-hoy" data-coord-ver-dia="${e}"`,t===e?`secondary`:`ghost`)}
          ${U(`Día siguiente`,`id="coord-dia-manana" data-coord-ver-dia="${gu(e,1)}"`,t===gu(e,1)?`secondary`:`ghost`)}
        </div>
      </div>
      <h3 class="coord-day-title">${L(vu(t))} · ${n.length} ${n.length===1?`ruta`:`rutas`} · ${r} paseos</h3>
      ${n.length?`
        <div class="coord-actions">
          ${U(`Perros sin carnet <span class="coord-count">${i.size}</span>`,`id="coord-filtro-carnet" data-coord-filtro-carnet aria-pressed="${a}"`,a?`secondary`:`ghost`,`fileText`)}
          ${U(`Copiar todas las rutas del día`,`id="coord-copy-dia" data-coord-copy-dia="${t}"`,`ghost`,`copy`)}
        </div>
        ${a?`<p class="coord-note" role="status">${g(`fileText`,`coord-icon`)}<span>${i.size?`Mostrando solo los perros sin carnet de vacunas cargado: ${i.size} de este día. El carnet se sube desde la ficha del cliente.`:`Todos los perros de este día tienen el carnet cargado.`}</span></p>`:``}`:`<p class="coord-empty is-small">No hay rutas para este día. Si es un día de servicio, armá la semana en «Semana (se repite)» o sumá una ruta extra acá abajo.</p>`}
      <ul class="coord-dayroutes">
        ${n.map(e=>{let n=Id(e,t),r=(e.paradas||[]).slice().sort((e,t)=>(Mu(e.hora)??9999)-(Mu(t.hora)??9999)),i=a?r.filter(e=>!$f(Vu(e))):r,o=`ruta-${t}-${e.ruta}`;return`
            <li class="coord-dayroute ${n.list.length?`is-alert`:``}">
              <div class="coord-card-head">
                <strong>${L(e.ruta)} · ${L(e.turno)}</strong>
                ${e.origen===`dia`?W(`Cambio solo para este día`,`warn`):W(`Igual que la semana`,`neutral`)}
              </div>
              <p>${i.length} ${i.length===1?`perro`:`perros`} · ${L(Ad(e))} · Paseador: ${L(Uu(e.paseador)||`Pendiente de confirmar`)}${e.ayudante?` · Ayudante: ${L(Uu(e.ayudante))}`:``}</p>
              ${n.list.length?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${L(n.list.slice(0,2).join(` `))}${n.list.length>2?` Y ${n.list.length-2} más.`:``}</span></p>`:``}
              <details class="coord-card-more" ${a||Ou.has(o)?`open`:``}>
                <summary data-coord-mem-toggle="${L(o)}">${a?`Sin carnet (${i.length})`:`Ver paradas`} ${g(`chevronDown`,`coord-icon`)}</summary>
                ${i.length?`<ol class="coord-stops-mini">${i.map(t=>`<li value="${r.indexOf(t)+1}" class="${n.byStop.has((e.paradas||[]).indexOf(t))?`is-alert`:``}"><span class="coord-stop-line"><b>${L(Pu(t.hora)||`--:--`)}</b> ${L(t.perroNombre)} <small>${Number(t.minutos)||45} min${t.nota?` · ${L(t.nota)}`:``}</small></span>${bp(Vu(t))}<span class="coord-sr-only"> (parada ${r.indexOf(t)+1})</span></li>`).join(``)}</ol>`:`<p class="coord-meta">${a?`Todos los perros de esta ruta tienen el carnet cargado.`:`Esta ruta no tiene perros.`}</p>`}
              </details>
              <div class="coord-actions">
                ${U(`Cambiar solo este día`,`id="coord-ed-dia-${L(e.ruta)}" data-coord-edit-dia="${L(e.ruta)}" data-fecha="${t}"`,`primary`,`sliders`)}
                ${U(`Copiar para WhatsApp`,`data-coord-copy-ruta="${L(e.ruta)}" data-fecha="${t}"`,`ghost`,`copy`)}
              </div>
            </li>
          `}).join(``)}
      </ul>
      <div class="coord-actions">
        ${Iu.map(e=>U(`Ruta extra solo este día (${e.toLowerCase()})`,`id="coord-extra-${xu(e)}" data-coord-new-dia data-turno="${e}" data-fecha="${t}"`,`ghost`,`plus`)).join(``)}
      </div>
    </div>
  `}function Bp(e,t,n){let r=Vu(e),i=n.byStop.get(t)||[],a=Nu(e.hora)?Fn(Pu(e.hora),e.minutos||45):``,o=V.paradas.length-1,s=e.perroNombre||r?.name||`Pendiente de confirmar`;return`
    <li class="coord-stop ${i.length?`is-alert`:``}">
      <div class="coord-stop-head">
        <span class="coord-stop-num" aria-hidden="true">${t+1}</span>
        <div class="coord-stop-name">
          <strong>${L(s)}</strong>
          <small>${r?`${L(r.size)}${r.status===`Activo`?``:` · ${L(r.status)}`}`:`Sin ficha en el registro`}</small>
        </div>
        <div class="coord-stop-tools">
          <button type="button" class="coord-icon-btn" id="coord-ed-up-${t}" data-coord-stop-up="${t}" ${t===0?`disabled`:``} aria-label="Subir a ${L(s)}">${g(`chevronDown`,`coord-icon is-up`)}</button>
          <button type="button" class="coord-icon-btn" id="coord-ed-down-${t}" data-coord-stop-down="${t}" ${t===o?`disabled`:``} aria-label="Bajar a ${L(s)}">${g(`chevronDown`,`coord-icon`)}</button>
          <button type="button" class="coord-icon-btn is-danger" id="coord-ed-del-${t}" data-coord-stop-del="${t}" aria-label="Quitar a ${L(s)} de la ruta">${g(`x`,`coord-icon`)}</button>
        </div>
      </div>
      <div class="coord-stop-fields">
        <div class="coord-field">
          <label for="coord-ed-hora-${t}">Retiro</label>
          <input id="coord-ed-hora-${t}" type="time" step="300" value="${L(Pu(e.hora))}" data-coord-stop="${t}" data-k="hora" ${Nu(e.hora)?``:`aria-invalid="true"`} />
        </div>
        <div class="coord-field">
          <label for="coord-ed-min-${t}">Minutos</label>
          <input id="coord-ed-min-${t}" type="number" min="5" max="240" step="5" inputmode="numeric" value="${L(e.minutos)}" data-coord-stop="${t}" data-k="minutos" />
        </div>
        <p class="coord-stop-end">${a?`Vuelve ~${a}`:``}</p>
        <div class="coord-field is-wide">
          <label for="coord-ed-nota-${t}">Nota</label>
          <input id="coord-ed-nota-${t}" type="text" value="${L(e.nota)}" data-coord-stop="${t}" data-k="nota" placeholder="Ej.: bozal, sale con…" autocomplete="off" />
        </div>
      </div>
      ${i.length?`<ul class="coord-stop-warn">${i.map(e=>`<li>${g(`alertTriangle`,`coord-icon`)}<span>${L(e)}</span></li>`).join(``)}</ul>`:``}
    </li>
  `}function Vp(){if(!V)return``;let e=R(Rd);if(!e)return`<p class="coord-meta">Escribí el nombre del perro. Se agrega a la hora de arriba.</p>`;let t=new Set(V.paradas.map(e=>Vu(e)?.id).filter(Boolean)),n=w.filter(t=>R(t.name).includes(e)).slice(0,6),r=w.some(t=>R(t.name)===e),i=Nu(zd)?Pu(zd):jd(V);return`
    <ul class="coord-results">
      ${n.map(e=>`
        <li>
          <button type="button" class="coord-result" id="coord-add-${e.id}" data-coord-add-dog="${e.id}">
            ${g(`plus`,`coord-icon`)}
            <span><b>${L(e.name)}</b> <small>${L(e.size)} · ${L(Tu(e))}</small></span>
            ${e.status===`Activo`?``:W(L(e.status),`alert`)}
            ${t.has(e.id)?W(`Ya está en la ruta`,`warn`):``}
            <span class="coord-result-hora">${i}</span>
          </button>
        </li>`).join(``)}
      ${!r&&Rd.trim().length>=2?`
        <li>
          <button type="button" class="coord-result is-free" id="coord-add-libre" data-coord-add-libre>
            ${g(`plus`,`coord-icon`)}<span>Agregar «${L(Rd.trim())}» (perro sin ficha)</span><span class="coord-result-hora">${i}</span>
          </button>
        </li>`:``}
    </ul>
    ${n.length?``:`<p class="coord-meta">No hay perros con ese nombre en el registro.</p>`}
  `}function Hp(){let e=V,t=Qd(),n=e.solicitudId?of().find(t=>t.id===e.solicitudId):null,r=e.modo===`plantilla`,i=r?bu(e.dia):[],a=Nu(zd)?Pu(zd):jd(e);return`
    <div class="coord-editor ${r?`is-plantilla`:`is-dia`}" id="coord-editor" tabindex="-1" aria-labelledby="coord-editor-title">
      <div class="coord-editor-mode" role="note">
        ${g(r?`calendarCheck`:`alertTriangle`,`coord-icon`)}
        <div>
          <p class="coord-editor-kicker">${r?`Estás editando la SEMANA`:`Estás editando SOLO UN DÍA`}</p>
          <h3 id="coord-editor-title">${L(e.ruta)} · ${r?`${L(e.dia)} · ${L(e.turno)}`:`${L(vu(e.fecha))} · ${L(e.turno)}`}</h3>
          <p>${r?`Se repite todos los ${L(e.dia.toLowerCase())}. Si es algo de un solo día, usá «Guardar solo para un día».`:`La semana no cambia. Este cambio manda sobre la semana solo ese día.`}${e.nuevo?` Ruta nueva.`:``}</p>
        </div>
      </div>

      ${n?`
        <div class="coord-editor-sol" role="note">
          <p><b>Pedido de ${L(n.creadoPorNombre||`supervisión`)}:</b> ${L(n.titulo||n.tipo||``)}${n.detalle?` · ${L(n.detalle)}`:``}${n.motivo?` · Motivo: ${L(n.motivo)}`:``}</p>
          ${e.precarga?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>${L(e.precarga)}</span></p>`:``}
          <div class="coord-field is-wide">
            <label for="coord-ed-respuesta">Respuesta para el supervisor (opcional)</label>
            <input id="coord-ed-respuesta" type="text" value="${L(e.respuesta)}" data-coord-ed-field="respuesta" placeholder="Ej.: Listo, ya lo saqué de la ruta." autocomplete="off" />
          </div>
        </div>`:``}

      ${hp(`editor`)}

      <div class="coord-grid coord-editor-team">
        ${e.nuevo?`
          <div class="coord-field">
            <label for="coord-ed-ruta">Código de la ruta</label>
            <input id="coord-ed-ruta" type="text" value="${L(e.ruta)}" data-coord-ed-field="ruta" autocomplete="off" aria-describedby="coord-ed-ruta-hint" />
            <small id="coord-ed-ruta-hint">Ej.: PJ_2M (mañana) o PJ_3T (tarde).</small>
          </div>`:``}
        <div class="coord-field">
          <label for="coord-ed-paseador">Paseador</label>
          <input id="coord-ed-paseador" type="text" list="coord-team-users" value="${L(e.paseador)}" data-coord-ed-field="paseador" autocomplete="off" aria-describedby="coord-ed-paseador-hint" />
          <small id="coord-ed-paseador-hint">Usuario de la app (ej.: sebastian).</small>
        </div>
        <div class="coord-field">
          <label for="coord-ed-ayudante">Ayudante</label>
          <input id="coord-ed-ayudante" type="text" list="coord-team-users" value="${L(e.ayudante)}" data-coord-ed-field="ayudante" autocomplete="off" placeholder="Sin ayudante" />
        </div>
        <div class="coord-field">
          <label for="coord-ed-supervisor">Supervisa</label>
          <input id="coord-ed-supervisor" type="text" list="coord-team-names" value="${L(e.supervisor)}" data-coord-ed-field="supervisor" autocomplete="off" />
        </div>
      </div>

      <div class="coord-add" role="group" aria-labelledby="coord-add-title">
        <h4 id="coord-add-title">${g(`plus`,`coord-icon`)}<span>Agregar un perro</span></h4>
        <div class="coord-add-row">
          <div class="coord-field coord-add-search">
            <label for="coord-ed-buscar">Buscar perro</label>
            <input id="coord-ed-buscar" type="search" value="${L(Rd)}" data-coord-ed-search autocomplete="off" placeholder="Nombre del perro" aria-controls="coord-ed-results" />
          </div>
          <div class="coord-field coord-add-hora">
            <label for="coord-ed-nueva-hora">Hora de retiro</label>
            <input id="coord-ed-nueva-hora" type="time" step="300" value="${L(a)}" data-coord-ed-hora aria-describedby="coord-ed-nueva-hora-hint" />
            <small id="coord-ed-nueva-hora-hint">Sugerida: la última + 15 min.</small>
          </div>
        </div>
        <div id="coord-ed-results" aria-live="polite">${Vp()}</div>
      </div>

      <div class="coord-stops-head">
        <h4>Paradas en orden <span>${e.paradas.length}</span></h4>
        ${e.paradas.length>1?U(`Ordenar por hora`,`id="coord-ed-sort" data-coord-ed-sort`,`ghost`,`clock`):``}
      </div>
      ${e.paradas.length?`<ol class="coord-stops">${e.paradas.map((e,n)=>Bp(e,n,t)).join(``)}</ol>`:`<p class="coord-empty is-small">La ruta no tiene perros todavía. Buscalos arriba.</p>`}

      ${yp(t.list,`coord-ed-warnings`)}

      <div class="coord-field is-wide">
        <label for="coord-ed-notas">Notas de la ruta</label>
        <textarea id="coord-ed-notas" rows="2" data-coord-ed-field="notas" placeholder="Ej.: arrancar por Mapuche">${L(e.notas)}</textarea>
      </div>

      <div class="coord-editor-save">
        ${r?`
          <div class="coord-save-box is-main">
            <p><b>Guardar en la semana:</b> cambia todos los ${L(e.dia.toLowerCase())}.</p>
            ${U(`Guardar en la semana`,`id="coord-ed-save" data-coord-ed-save="plantilla"`,`primary`,`checkCircle`)}
          </div>
          <div class="coord-save-box">
            <div class="coord-field">
              <label for="coord-ed-solodia">¿Es solo por un día? Elegí cuál</label>
              <select id="coord-ed-solodia" data-coord-ed-field="soloDia">
                ${i.map(t=>`<option value="${t}" ${t===e.soloDia?`selected`:``}>${L(vu(t))}${t===b()?` (hoy)`:``}${Ed().some(n=>n.id===wd(t,e.ruta))?` · ya tiene un cambio: se reemplaza`:``}</option>`).join(``)}
              </select>
            </div>
            ${U(`Guardar solo para ese día`,`id="coord-ed-save-dia" data-coord-ed-save="dia"`,`secondary`)}
          </div>`:`
          <div class="coord-save-box is-main">
            <p><b>Guardar solo para el ${L(vu(e.fecha).toLowerCase())}.</b>${n?` El pedido del supervisor queda como aplicado.`:``}</p>
            ${U(`Guardar solo para el ${L(pu(e.fecha))}`,`id="coord-ed-save" data-coord-ed-save="dia"`,`primary`,`checkCircle`)}
          </div>
          ${e.existeDia&&id(e.existeDia)?`
            <div class="coord-save-box">
              <p>¿Ese día tiene que quedar igual que la semana?</p>
              ${U(`Volver a la ruta de la semana`,`id="coord-ed-revert" data-coord-ed-revert`,`ghost`)}
            </div>`:``}`}
      </div>

      ${Bd===`salir`?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-salir-q">
          <p id="coord-salir-q"><b>Tenés cambios sin guardar.</b> ¿Salir igual y descartarlos?</p>
          <div class="coord-actions">
            ${U(`Sí, descartar`,`id="coord-ed-close-ok" data-coord-ed-close-ok`,`primary`)}
            ${U(`Seguir editando`,`id="coord-ed-close-cancel" data-coord-ed-close-cancel`,`ghost`)}
          </div>
        </div>`:``}

      <div class="coord-actions coord-editor-foot">
        ${U(`Copiar para WhatsApp`,`id="coord-ed-copy" data-coord-ed-copy`,`ghost`,`copy`)}
        ${U(e.sucio?`Cerrar sin guardar`:`Volver`,`id="coord-ed-close" data-coord-ed-close`,`ghost`,`x`)}
      </div>
    </div>
  `}function Up(){let e=of(),t=sf(),n=e.filter(e=>(e.estado||`pendiente`)!==`pendiente`),r=`
    <p class="coord-note">${g(`users`,`coord-icon`)}<span>El supervisor mira las rutas y, si habló con alguien o pasó algo, te pide el cambio. Vos lo aplicás o lo rechazás con una respuesta: la ve el supervisor.</span></p>
    ${hp(`solicitudesTodas`)}
    <h3 class="coord-subtitle">Pendientes <span>${t.length}</span></h3>
    ${t.length?`<ul class="coord-sol-list">${t.map(e=>jp(e)).join(``)}</ul>`:`<p class="coord-empty is-small">${Ju.has(`solicitudes`)?`No hay pedidos pendientes.`:`Cargando…`}</p>`}
    ${n.length?`
      <details class="coord-more" ${Eu(`solHist`)?`open`:``}>
        <summary data-coord-toggle="solHist">Respondidos en las últimas 2 semanas (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-sol-list">${n.map(e=>jp(e,{compact:!0})).join(``)}</ul>
      </details>`:``}
  `;return gp({key:`solicitudes`,id:`coord-solicitudes`,iconName:`bell`,title:`Pedidos de cambio del supervisor`,intro:`Aplicalos en la ruta del día o respondé por qué no.`,badges:t.length?W(`${t.length} ${t.length===1?`pendiente`:`pendientes`}`,`alert`):W(`Al día`,`neutral`),body:r})}function Wp(e){return(Array.isArray(e)?e:[]).map(e=>Ru.get(e)?.name||e)}function Gp(e){let t=L(e.id),n=df.find(([t])=>t===e.estado)||df[0],r=Wp(e.perros);return`
    <li class="coord-card coord-cliente is-${L(n[0])}">
      <div class="coord-card-head">
        <strong>${L(e.nombre||`Pendiente de confirmar`)}</strong>
        ${W(n[1],n[0]===`activo`?`ok`:n[0]===`pausa`?`warn`:`neutral`)}
      </div>
      ${vp([[`Perros`,r.length?Su(r):x],[`Barrio`,e.barrio],[`Plan`,e.plan&&e.plan!==`Pendiente de confirmar`?e.plan:``],[`Días`,Array.isArray(e.dias)&&e.dias.length?wu(e.dias):``],[`Turno`,e.turno&&e.turno!==`Pendiente de confirmar`?e.turno:``],[`Teléfono`,e.telefono],[`Notas`,e.notas]],`is-compact`)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      <div class="coord-actions">
        ${Ff(e.telefono,`Hola ${e.nombre||``}, te escribo de Paseos Juan.`.replace(` ,`,`,`),`secondary`,`WhatsApp`)}
        ${U(`Editar`,`id="coord-cli-edit-${t}" data-coord-cliente-edit="${t}"`,`ghost`,`sliders`)}
      </div>
      ${Tp(e)}
    </li>
  `}function Kp(){let e=R(hf),t=gf();return e?t.filter(t=>R([t.nombre,t.barrio,t.telefono,t.notas,...Wp(t.perros)].join(` `)).includes(e)):t}function qp(){let e=Kp();return e.length?`<ul class="coord-card-list is-grid">${e.map(Gp).join(``)}</ul>`:`<p class="coord-empty is-small">${Ju.has(`clientes`)?hf?`Ningún cliente coincide con la búsqueda.`:`Todavía no hay clientes cargados.`:`Cargando clientes…`}</p>`}function Jp(){let e=gf(),t=sp(`cliente`),n=!!t.id,r=Array.isArray(t.perros)?t.perros:[],i=Array.isArray(t.dias)?t.dias:[],a=(Array.isArray(t.archivos)?t.archivos:[]).map(e=>Uf(e)||{id:e,tipo:Rf}),o=e.filter(e=>(e.estado||`activo`)===`activo`).length,s=w.slice().sort((e,t)=>e.name.localeCompare(t.name,`es`)),c=`
    ${hp(`clientes`)}
    <div class="coord-field coord-search">
      <label for="coord-clientes-buscar">Buscar cliente</label>
      <input id="coord-clientes-buscar" type="search" value="${L(hf)}" data-coord-clientes-buscar placeholder="Tutor, perro o barrio" autocomplete="off" aria-controls="coord-clientes-lista" />
    </div>
    <div id="coord-clientes-lista" aria-live="polite">${qp()}</div>

    <form class="coord-form" id="coord-cliente-form" data-coord-form="cliente" novalidate tabindex="-1">
      <h3>${n?`Editando a ${L(t.nombre||`un cliente`)}`:`Cargar un cliente`}</h3>
      ${t.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Completado con los datos de un pedido. Revisalo antes de guardar.</span></p>`:``}
      ${!n&&a.length?`<p class="coord-done">${g(`fileCheck`,`coord-icon`)}<span>${a.some(Wf)?`El carnet de vacunas del pedido queda vinculado a este cliente.`:`Los archivos del pedido quedan vinculados a este cliente.`}</span></p>`:``}
      <input type="hidden" name="id" value="${L(t.id||``)}" />
      <input type="hidden" name="pedidoId" value="${L(t.pedidoId||``)}" />
      <div class="coord-grid">
        ${dp(`cliente`,`nombre`,`Nombre del tutor`,{value:t.nombre,required:!0,attrs:`autocomplete="off"`})}
        ${dp(`cliente`,`telefono`,`Teléfono`,{value:t.telefono,type:`tel`,attrs:`autocomplete="off" inputmode="tel"`,hint:`Celular con código de área (ej.: 11\xA01234‑5678).`})}
        ${dp(`cliente`,`barrio`,`Barrio`,{value:t.barrio,attrs:`list="coord-barrios" autocomplete="off"`,hint:`Elegí uno o escribí otro.`})}
        ${fp(`cliente`,`plan`,`Plan`,ff,{value:t.plan||`Pendiente de confirmar`})}
        ${fp(`cliente`,`turno`,`Turno`,pf,{value:t.turno||`Pendiente de confirmar`})}
        ${fp(`cliente`,`estado`,`Estado`,df,{value:t.estado||`activo`})}
        <div class="coord-field is-wide">
          <span class="coord-label" id="coord-cliente-perros-label">Perros${r.length?` (${r.length})`:``}</span>
          <input id="coord-cliente-perros-buscar" type="search" data-coord-filter-perros placeholder="Filtrar perros" autocomplete="off" aria-label="Filtrar la lista de perros" />
          <div class="coord-checks" role="group" aria-labelledby="coord-cliente-perros-label">
            ${s.map(e=>`<label class="coord-check" data-name="${L(R(e.name))}"><input type="checkbox" id="coord-cliente-perro-${e.id}" name="perros" value="${e.id}" ${r.includes(e.id)?`checked`:``} /><span>${L(e.name)} <small>${L(e.size)}</small></span></label>`).join(``)}
          </div>
          <small>Si el perro todavía no está en el registro, anotalo en notas y cargá su ficha en «Alta de perro nuevo».</small>
        </div>
        ${mp(`cliente`,i)}
        ${pp(`cliente`,`notas`,`Notas`,{value:t.notas,hint:`Lo operativo: llaves, portería, horarios. Sin datos de salud ni de pago.`})}
      </div>
      <datalist id="coord-barrios">${xf().map(e=>`<option value="${L(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">
        ${U(n?`Guardar cambios`:`Guardar cliente`,`id="coord-cliente-save" data-coord-cliente-save`,`primary`,`plus`)}
        ${n||t.pedidoId?U(`Cancelar`,`data-coord-cliente-cancel`,`ghost`):``}
      </div>
    </form>
  `;return gp({key:`clientes`,id:`coord-clientes`,iconName:`users`,title:`Clientes`,intro:`Tutores, sus perros, plan, días y turno. Solo lo ven Juan y coordinación.`,badges:e.length?W(`${o} ${o===1?`activo`:`activos`}`,`neutral`):``,body:c})}function Yp(){let e=sp(`aviso`),t=b(),n=_f(),r=n.filter(e=>vf(e,t)),i=n.filter(e=>!vf(e,t)).slice(0,20),a=`
    ${hp(`avisos`)}
    <form class="coord-form" data-coord-form="aviso" novalidate>
      <h3>Cargar un aviso</h3>
      <div class="coord-grid">
        ${dp(`aviso`,`barrio`,`Barrio`,{value:e.barrio,required:!0,attrs:`list="coord-barrios-aviso" autocomplete="off"`})}
        ${fp(`aviso`,`tipo`,`Tipo`,mf,{value:e.tipo||mf[0]})}
        ${dp(`aviso`,`vigenteHasta`,`Vigente hasta`,{value:e.vigenteHasta||t,type:`date`,attrs:`min="${t}"`})}
        ${pp(`aviso`,`mensaje`,`Qué pasa`,{value:e.mensaje,required:!0,placeholder:`Ej.: Corte de calle en la entrada principal. Entrar por la puerta 2.`})}
      </div>
      <datalist id="coord-barrios-aviso">${xf().map(e=>`<option value="${L(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${U(`Guardar aviso`,`id="coord-aviso-save" data-coord-aviso-save`,`primary`,`plus`)}</div>
    </form>
    <div class="coord-subblock">
      <h3>Vigentes <span>${r.length}</span></h3>
      ${r.length?`<p class="coord-meta">Están arriba, agrupados por barrio.</p>`:`<p class="coord-empty is-small">${Ju.has(`avisos`)?`No hay avisos vigentes.`:`Cargando…`}</p>`}
    </div>
    ${i.length?`
      <details class="coord-more" ${Eu(`avisosViejos`)?`open`:``}>
        <summary data-coord-toggle="avisosViejos">Avisos vencidos (${i.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-aviso-list">${i.map(e=>Np(e,{history:!0})).join(``)}</ul>
      </details>`:``}
  `;return gp({key:`avisos`,id:`coord-avisos`,iconName:`mapPin`,title:`Avisos por barrio`,intro:`Obras, cortes, perros sueltos, clima o seguridad. Los ve todo el equipo.`,badges:r.length?W(`${r.length} ${r.length===1?`vigente`:`vigentes`}`,`warn`):``,body:a})}function Xp(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return vp([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function Zp(e,t,n){let r=Df(e),i=e.origen===`web`,a=e.datos||{},o=L(e.id),s=t.get(e.id),c=n.get(e.id),l={nuevo:U(`Empezar`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)+U(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`ghost`),"en-curso":U(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`secondary`)+U(`Volver a nuevo`,`data-coord-pedido-move="${o}" data-estado="nuevo"`,`ghost`),resuelto:U(`Reabrir`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)}[r],u=`pedido-${e.id}`,d=r!==`resuelto`||Ou.has(u),f=(i||/evaluaci/i.test(e.tipo||``))&&!s&&r!==`resuelto`,p=i?r===`resuelto`?`<details class="coord-card-more" ${d?`open`:``}><summary data-coord-mem-toggle="${L(u)}">Ver datos del formulario ${g(`chevronDown`,`coord-icon`)}</summary>${Xp(e)}</details>`:Xp(e):`<p class="coord-card-dog">${g(`pawPrint`,`coord-icon`)}${L(jf(e)||`Pendiente de confirmar`)}</p>${e.detalle?`<p>${L(e.detalle)}</p>`:``}`,m=a.responsable?`Hola ${a.responsable}`:`Hola`,h=Yf(e).some(Wf)?``:` Cuando puedas, mandanos una foto del carnet de vacunas.`;return`
    <li class="coord-card ${i?`is-web`:``}" id="coord-pedido-${o}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${L(i?a.perro||`Pendiente de confirmar`:e.tipo||`Pedido`)}</strong>
        <small>${i?L(e.tipo||`Formulario web`):`${L(pu(e.fecha))}${a.canal?` · ${L(a.canal)}`:``}`}</small>
      </div>
      ${i?`<p class="coord-badges">${W(`Formulario web`,`warn`)}</p>`:``}
      ${p}
      ${Sp(e)}
      ${ad(e,{web:i})}
      ${s?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Ficha creada para ${L(s.perroNombre)}</span></p>`:``}
      ${c?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Cliente cargado: ${L(c.nombre)}</span></p>`:``}
      <div class="coord-actions">
        ${r!==`resuelto`&&i?Ff(a.telefono,`${m}, te escribo de Paseos Juan por el pedido de evaluación de ${a.perro||`tu perro`}.${h}`,`primary`):``}
        ${l}
        ${!c&&(i||a.responsable)?U(`Convertir en cliente`,`data-coord-pedido-cliente="${o}"`,`ghost`,`userPlus`):``}
        ${f?U(`Armar ficha con estos datos`,`data-coord-pedido-ficha="${o}"`,`ghost`,`fileText`):``}
        ${r===`resuelto`&&id(e)?U(`Borrar`,`data-coord-pedido-delete="${o}"`,`ghost`):``}
      </div>
    </li>
  `}function Qp(){let e=Of(),t=sp(`pedido`),n=e.filter(e=>Df(e)!==`resuelto`).length,r=Mf(e).length,i=new Map(kf().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),a=new Map(gf().filter(e=>e.pedidoId).map(e=>[e.pedidoId,e])),o=!Ju.has(`pedidos`)&&!e.length,s=`
    ${hp(`pedidos`)}
    <div class="coord-board">
      ${Tf.map(([t,n])=>{let r=e.filter(e=>Df(e)===t);return t===`nuevo`&&r.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`)),`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(e=>Zp(e,i,a)).join(``)}</ul>`:`<p class="coord-empty is-small">${o?`Cargando…`:t===`nuevo`?`Sin pedidos nuevos.`:t===`en-curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${fp(`pedido`,`tipo`,`Tipo de pedido`,Cf,{value:t.tipo})}
        ${dp(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${fp(`pedido`,`canal`,`Llegó por`,wf,{value:t.canal})}
        ${pp(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${w.map(e=>`<option value="${L(e.name)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${U(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>
  `;return gp({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Los del formulario de la web y los que cargás vos.`,badges:`${r?W(`${r} ${r===1?`nuevo`:`nuevos`} de la web`,`alert`):``}${n?W(`${n} ${n===1?`abierto`:`abiertos`}`,`warn`):W(`Sin pedidos abiertos`,`neutral`)}`,body:s,open:r>0})}function $p(e){let t=e.datos||{},n=zu.get(R(t.perro));return{pedidoId:e.id,nombre:t.responsable||``,telefono:t.telefono||``,barrio:[t.zona,t.referencia].filter(Boolean).join(` · `),perros:n?[n.id]:[],plan:x,dias:Lf(t.dias),turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:x,estado:`activo`,archivos:Yf(e).map(e=>e.id),notas:[`Desde el pedido del ${pu(e.fecha)}.`,!n&&t.perro?`Perro: ${t.perro} (todavía sin ficha en el registro).`:``].filter(Boolean).join(` `)}}function em(e,t){let n=t?t.actualizadoPorNombre||t.creadoPorNombre:``;return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${L(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?W(`Activo`,`neutral`):W(L(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${L(e.plan)} · ${L(e.size)} · ${L(Tu(e))}</p>
      <p class="coord-badges">${bp(e)}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${L(e.review||`Estado "${e.status}".`)}</p>
      ${_p(e)}
      ${t?.nota?`<p class="coord-meta">${L(t.nota)}</p>`:``}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Resuelto${n?` por ${L(n)}`:``}${t.actualizadoEn?` el ${mu(t.actualizadoEn)}`:``}${t.pendiente?` (sin señal: se enviará cuando vuelva)`:``}</span></p>${U(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:U(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function tm(){let e=Af(),t=Bu.filter(t=>!e[t.id]),n=Bu.filter(t=>e[t.id]),r=`
    <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
    ${hp(`datos`)}
    ${t.length?`<ul class="coord-review-list">${t.map(e=>em(e)).join(``)}</ul>`:`<p class="coord-empty">${g(`checkCircle`,`coord-icon`)}No quedan datos por confirmar.</p>`}
    ${n.length?`
      <details class="coord-more" ${Eu(`datosResueltos`)?`open`:``}>
        <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-review-list">${n.map(t=>em(t,e[t.id])).join(``)}</ul>
      </details>`:``}
    <p class="coord-note">${g(`fileText`,`coord-icon`)}<span>El cambio todavía debe incorporarse al ${L(yn.officialSources.dogs.toLowerCase())}.</span></p>
    ${nm()}
  `;return gp({key:`datos`,id:`coord-datos`,iconName:`help`,title:`Datos a confirmar`,intro:`${n.length} de ${Bu.length} resueltos.`,badges:t.length?W(`${t.length} ${t.length===1?`pendiente`:`pendientes`}`,`warn`):W(`Todo confirmado`,`ok`),body:r})}function nm(){let e=w.filter(e=>e.status===`Activo`),t=e.filter(e=>!$f(e)).sort((e,t)=>e.name.localeCompare(t.name,`es`)),n=Ju.has(`archivos`)&&Ju.has(`clientes`);return`
    <div class="coord-subblock" id="coord-sin-carnet">
      <h3>Carnet de vacunas <span>${e.length-t.length} de ${e.length}</span></h3>
      <p class="coord-meta">${n?t.length?`${t.length} ${t.length===1?`perro activo no tiene`:`perros activos no tienen`} el carnet cargado. Se sube desde la ficha del cliente (sección Clientes).`:`Todos los perros activos tienen el carnet cargado.`:`Cargando carnets…`}</p>
      ${t.length&&n?`
        <details class="coord-more" ${Eu(`sinCarnet`)?`open`:``}>
          <summary data-coord-toggle="sinCarnet">Perros sin carnet (${t.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-nocarnet">${t.map(e=>`<li><b>${L(e.name)}</b> <small>${L(Tu(e))}</small></li>`).join(``)}</ul>
        </details>`:``}
    </div>
  `}var rm=[x,`Sí`,`No`],im=null,am=null,om=!1,sm=!1;function cm(e){let t=e.pedidoId?ym(Of(),e.pedidoId):null,n=t?Yf(t).filter(Wf):[],r=`coord-alta-carnet-hint`,i=`Opcional. Se sube al guardar la ficha (hace falta señal). Foto clara o PDF, hasta 3,5 MB.`;return am?i=`Carnet ya subido (${L(am.nombreArchivo||`archivo`)}): queda vinculado al guardar la ficha.`:im&&(i=`Elegiste <b>${L(im.name)}</b> (${Kf(im.size)}). Se sube al guardar la ficha.`),`
    <div class="coord-field is-wide">
      <span class="coord-label">Carnet de vacunas</span>
      ${n.map(e=>`
        <p class="coord-attach-row">
          ${g(`fileCheck`,`coord-icon`)}
          <span><b>El pedido web ya trae el carnet</b><small>Queda vinculado a esta ficha.</small></span>
          ${U(`Ver carnet<span class="coord-sr-only"> (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${L(e.id)}" data-scope="alta"`,`secondary`,`eye`)}
        </p>`).join(``)}
      ${am?``:Cp(`coord-alta-carnet`,im?`Cambiar el archivo`:n.length?`Adjuntar otro carnet`:`Adjuntar foto o PDF del carnet`,`data-coord-alta-carnet`,r)}
      <small id="${r}">${i}</small>
      ${im&&qf()?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>Sin señal: el carnet no se puede subir ahora. Esperá a tener señal o quitalo para guardar la ficha sin él.</span></p>`:``}
      ${im||am?`<div class="coord-actions">${U(`Quitar el carnet`,`id="coord-alta-carnet-quitar" data-coord-alta-carnet-quitar`,`ghost`,`x`)}</div>`:``}
      ${np(`alta`)}
    </div>
  `}function lm(){let e=sp(`alta`),t=kf(),n=Array.isArray(e.dias)?e.dias:[],r=[x,...Sn.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${g(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${hp(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${e.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>`:``}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${dp(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${fp(`alta`,`tamano`,`Tamaño`,[x,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${dp(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${dp(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${fp(`alta`,`sexo`,`Sexo`,[x,`Macho`,`Hembra`],{value:e.sexo})}
          ${fp(`alta`,`castrado`,`Castrado o castrada`,rm,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${dp(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${dp(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${dp(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${fp(`alta`,`zona`,`Zona`,[x,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${dp(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${fp(`alta`,`vacunas`,`Vacunas al día`,rm,{value:e.vacunas})}
          ${dp(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${cm(e)}
          ${pp(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${fp(`alta`,`sujecion`,`Collar o pechera`,[x,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${fp(`alta`,`bozal`,`Usa bozal`,rm,{value:e.bozal})}
          ${fp(`alta`,`correa`,`Tiene correa propia`,rm,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${e.relatoTutor?pp(`alta`,`relatoTutor`,`Lo que contó el tutor en el formulario (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${pp(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,span:!1})}
          ${pp(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${pp(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${dp(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${fp(`alta`,`plan`,`Plan pedido`,r,{value:e.plan})}
          ${fp(`alta`,`turno`,`Turno`,[x,`Mañana`,`Tarde`],{value:e.turno})}
          ${mp(`alta`,n)}
        </div>
      </fieldset>
      ${om?`<p class="coord-upload-status" role="status">${g(`clock`,`coord-icon`)}<span>Subiendo el carnet… No cierres la página.</span></p>`:``}
      ${sm?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-alta-vaciar-q">
          <p id="coord-alta-vaciar-q"><b>¿Vaciar el formulario?</b> Se borra todo lo que escribiste en esta ficha.</p>
          <div class="coord-actions">
            ${U(`Sí, vaciar`,`id="coord-alta-vaciar-ok" data-coord-alta-clear-ok`,`primary`)}
            ${U(`No, seguir`,`id="coord-alta-vaciar-cancel" data-coord-alta-clear-cancel`,`ghost`)}
          </div>
        </div>`:`
        <div class="coord-actions">
          ${U(om?`Guardando…`:`Guardar ficha`,`id="coord-alta-save" data-coord-alta-save ${om?`aria-disabled="true"`:``}`,`primary`,`plus`)}
          ${U(`Vaciar formulario`,`id="coord-alta-clear" data-coord-alta-clear`,`ghost`)}
        </div>`}
    </form>
    <div class="coord-subblock">
      <h3>Fichas cargadas <span>${t.length}</span></h3>
      ${t.length?`
        <ul class="coord-card-list is-grid">
          ${t.map(e=>{let t=e.datos||{},n=Array.isArray(t.dias)?t.dias:[],r=[...new Set([e.carnet?.id,...Array.isArray(e.archivos)?e.archivos:[]].filter(Boolean))].map(e=>Uf(e)).find(Wf)||(e.carnet?.id?{id:e.carnet.id}:null),i=`ficha-${e.id}`;return`
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${L(e.perroNombre||t.nombre||`Pendiente de confirmar`)}</strong>
                <small>Alta ${L(pu(e.fecha))}</small>
              </div>
              <p class="coord-badges">${W(L(e.categoria||`SIN EVALUAR`),`neutral`)} ${W(`Primer paseo individual`,`warn`)}</p>
              <p>${L(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:t.tamano)} · Días: ${n.length?L(wu(n).toLowerCase()):`pendientes`} · Turno: ${L(!t.turno||t.turno===`Pendiente de confirmar`?`pendiente`:t.turno.toLowerCase())}</p>
              ${r?`<p class="coord-attach-row">${g(`fileCheck`,`coord-icon`)}<span><b>Carnet de vacunas adjunto</b></span>${U(`Ver carnet<span class="coord-sr-only"> (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${L(r.id)}" data-scope="${L(i)}"`,`secondary`,`eye`)}</p>`:`<p class="coord-badges"><span class="coord-carnet is-missing">${g(`alertCircle`,`coord-icon`)}<span>Carnet: falta</span></span></p>`}
              ${np(i)}
              ${ad(e)}
              <div class="coord-actions">
                ${U(`Copiar ficha`,`data-coord-alta-copy="${L(e.id)}"`,`ghost`,`copy`)}
                ${id(e)?U(`Borrar`,`data-coord-alta-delete="${L(e.id)}"`,`ghost`):``}
              </div>
            </li>`}).join(``)}
        </ul>`:`<p class="coord-empty is-small">${Ju.has(`fichas`)?`Todavía no hay perros nuevos cargados.`:`Cargando fichas…`}</p>`}
    </div>
  `;return gp({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?W(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function um(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${pu(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):x}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function dm(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>R(t.zona)===R(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:x,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:x,dias:Lf(t.dias)}}function fm(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>Ru.get(e)?.name||e);return t.length?Su(t):``}function pm(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||rd(e,t)}function mm(e,t){let n=fm(e),r=e.titulo||(t===`incidente`?`Incidente`:`Observación`),i=e.riesgo?String(e.riesgo):``,a=t===`incidente`?[[`Perro`,n],[`Lugar`,e.lugar],[`Barrio`,e.barrio],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Perro`,n],[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]];return`
    <li class="coord-card coord-feed-item ${t===`incidente`?`is-incident`:``}">
      <div class="coord-card-head">
        <strong>${L(r)}</strong>
        <small>${L(pu(e.fecha))}${e.hora?` · ${L(e.hora)}`:``}</small>
      </div>
      ${i?`<p class="coord-badges">${W(`Riesgo: ${L(i)}`,/alto|grave/i.test(i)?`alert`:`warn`)}</p>`:``}
      ${vp(a)}
      ${ad(e)}
    </li>
  `}function hm(){let e=yu(6),t=qu(`incidentes`).filter(t=>!t.fecha||t.fecha>=e).sort(pm),n=qu(`observaciones`).filter(t=>!t.fecha||t.fecha>=e).sort(pm),r=`
    <p class="coord-note">${g(`eye`,`coord-icon`)}<span>Solo lectura. Las cargan los paseadores y supervisión. Últimos 7 días (desde el ${L(pu(e))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${t.length}</span></h3>
        ${t.length?`<ul class="coord-card-list">${t.map(e=>mm(e,`incidente`)).join(``)}</ul>`:`<p class="coord-empty is-small">${Ju.has(`incidentes`)?`Sin incidentes en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${n.length}</span></h3>
        ${n.length?`<ul class="coord-card-list">${n.map(e=>mm(e,`observacion`)).join(``)}</ul>`:`<p class="coord-empty is-small">${Ju.has(`observaciones`)?`Sin observaciones en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
    </div>
  `;return gp({key:`actividad`,id:`coord-actividad`,iconName:`activity`,title:`Observaciones e incidentes`,intro:`Lo que registró el equipo en la calle en los últimos 7 días.`,badges:`${t.length?W(`${t.length} ${t.length===1?`incidente`:`incidentes`}`,`alert`):``}${n.length?W(`${n.length} ${n.length===1?`observación`:`observaciones`}`,`neutral`):``}`,body:r})}function gm(e,t,n){Du(e,!0),$(),Au(t,n)}async function _m(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function vm(e,t,n){_m(e).then(e=>{I(t,e?n:`No se pudo copiar. Probá de nuevo o copialo a mano.`,e?`ok`:`error`),B()})}function ym(e,t){return e.find(e=>e.id===t)}function bm(e){Ud=e,Kd(`dia`),$(),Au(`coord-rutas`)}async function xm(e){let t=nf();if(t){I(`editor`,t[0],`error`),$(),z(t[1]);return}let n=tf(),r=V,i;if(e===`plantilla`)i=await sd(`plantillas`,{id:Cd(n.ruta,n.dia),...n},{section:`rutas`,ok:`${n.ruta} del ${n.dia.toLowerCase()} guardada en la semana. Se repite todas las semanas.`});else{let e=r.modo===`plantilla`?r.soloDia:r.fecha;if(!hu(e)){I(`editor`,`Elegí el día.`,`error`),$();return}if(i=await sd(`rutas`,{id:wd(e,n.ruta),fecha:e,...n,dia:_u(e),basadaEn:r.plantillaId||``},{section:`rutas`,ok:`${n.ruta}: cambio guardado solo para el ${vu(e).toLowerCase()}. La semana no cambió.`}),i&&r.solicitudId){let t=of().find(e=>e.id===r.solicitudId);await sd(`solicitudes`,{id:r.solicitudId,fecha:hu(t?.fecha)?t.fecha:e,estado:`aplicado`,respuesta:r.respuesta.trim()||`Aplicado en la ruta ${n.ruta} del ${pu(e)}.`},{section:`rutas`,ok:`Cambio aplicado y pedido del supervisor marcado como aplicado.`})}i&&(Ud=e,Kd(`dia`))}i&&V===r&&(Xd(),$(),Au(`coord-rutas`))}async function Sm(e){let t=H,n=e.id,r=(Array.isArray(e.perros)?e.perros:[]).filter(e=>Ru.has(e)),i=(e,n,r=!1)=>{t.error=e,t.errorSenal=r,du(e),$(),z(n)};if(!t.file)return i(`Elegí la foto o el PDF.`,`coord-subida-archivo-${n}`);if(t.tipo===Rf&&r.length>1&&!t.perroId)return i(`Elegí de qué perro es el carnet.`,`coord-subida-perro-${n}`);if(qf())return i(`No se subió porque no hay señal. Tocá «Subir» de nuevo cuando vuelva.`,`coord-subida-ok-${n}`,!0);t.estado=`subiendo`,t.error=``,uu(`Subiendo el archivo.`),B();let a=Ru.get(t.perroId)||null;try{let r=await dt.subir(t.tipo,t.file,{perroId:a?.id||``,perroNombre:a?.name||``,clienteId:n,nota:t.nota.trim()}),i=ym(gf(),n)||e,o=[...new Set([...Array.isArray(i.archivos)?i.archivos:[],r.id])];await y.save(`clientes`,{id:n,archivos:o}).catch(()=>{}),H===t&&(H=null);let s=r.tipo===Rf?`El carnet de vacunas`:`El documento`;tp(`cliente-${n}`,`Listo: ${s.toLowerCase()}${a?` de ${a.name}`:``} quedó guardado${r.ubicacion===`drive`?` en Drive`:``} y vinculado a ${e.nombre||`este cliente`}.`)}catch(e){t.estado=``,t.error=Jf(e,`subir`),t.errorSenal=/^Sin señal/.test(t.error),du(t.error)}finally{B(),z(H===t?`coord-subida-ok-${n}`:`coord-subir-${n}`)}}function Cm(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target,n=t.closest(`[data-coord-toggle]`);if(n){let e=n.parentElement;return Du(n.dataset.coordToggle,!e.open),!0}let r=t.closest(`[data-coord-mem-toggle]`);if(r){let e=r.dataset.coordMemToggle;return r.parentElement.open?Ou.delete(e):Ou.add(e),!0}if(t.closest(`[data-coord-retry]`))return td(),ud=!1,uu(`Volviendo a pedir los datos.`),!0;let i=t.closest(`[data-coord-goto]`);if(i)return Au(i.dataset.coordGoto),!0;let a=t.closest(`[data-coord-goto-pedido]`);if(a)return gm(`pedidos`,`coord-pedido-${a.dataset.coordGotoPedido}`),!0;let o=t.closest(`[data-coord-open]`);if(o){let e=o.dataset.coordOpen,t={avisos:`#coord-aviso-barrio`,clientes:`#coord-clientes-buscar`}[e]||null;return gm(e,`coord-${e}`,t),!0}if(t.closest(`[data-coord-undo]`)){let e=su;if(su=null,e){let{pendiente:t,...n}=e.record;ld(`undo`,()=>sd(e.col,n,{section:e.section,ok:`Listo, se recuperó.`}))}return!0}let s=t.closest(`[data-coord-archivo-abrir]`);if(s)return rp(s.dataset.coordArchivoAbrir,s.dataset.scope||``),!0;let c=t.closest(`[data-coord-subir]`);if(c){let e=ym(gf(),c.dataset.coordSubir);if(e){if(H?.estado===`subiendo`)return du(`Esperá a que termine la subida que está en curso.`),!0;ip(e),$(),z(`coord-subida-tipo-${e.id}`)}return!0}let l=t.closest(`[data-coord-subida-cancel]`);if(l){if(H?.estado===`subiendo`)return du(`La subida está en curso: esperá a que termine.`),!0;let e=l.dataset.coordSubidaCancel;return H=null,$(),z(`coord-subir-${e}`),!0}let u=t.closest(`[data-coord-subida-ok]`);if(u){let e=ym(gf(),u.dataset.coordSubidaOk);return e&&H?.clienteId===e.id&&ld(`subida-${e.id}`,()=>Sm(e)),!0}if(t.closest(`[data-coord-filtro-carnet]`))return Wd=!Wd,uu(Wd?`Mostrando solo los perros sin carnet de vacunas.`:`Mostrando todos los perros.`),$(),z(`coord-filtro-carnet`),!0;let d=t.closest(`[data-coord-vista]`);if(d)return Kd(d.dataset.coordVista),$(),z(`coord-vista-${d.dataset.coordVista}`),!0;let f=t.closest(`[data-coord-ver-dia]`);if(f)return V?(Au(`coord-rutas`),!0):(bm(f.dataset.coordVerDia),!0);if(t.closest(`[data-coord-carga]`))return Vd=!0,$(),z(`coord-carga-ok`),!0;if(t.closest(`[data-coord-carga-cancel]`))return Vd=!1,$(),z(`coord-carga`),!0;if(t.closest(`[data-coord-carga-ok]`))return ld(`carga`,async()=>{let e=Ln(),t=0,n=0,r=``;for(let i of e){Hd=`Guardando ${t+1} de ${e.length}…`,B();try{let e=await y.save(`plantillas`,i);t+=1,e.pendiente&&(n+=1)}catch(e){r=e.message}}Vd=!1,Hd=``,r?I(`rutas`,`Se guardaron ${t} de ${e.length} rutas. Error: ${r}`,`error`):I(`rutas`,`Listo: ${t} rutas cargadas en la semana.${n?` Sin señal: se envían cuando vuelva.`:``}`),Kd(`semana`),B()}),!0;let p=t.closest(`[data-coord-edit-plantilla]`);if(p){let e=ym(Td(),p.dataset.coordEditPlantilla);return e&&(Yd(e,{modo:`plantilla`}),$(),Au(`coord-editor`)),!0}let m=t.closest(`[data-coord-new-route]`);if(m){let{dia:e,turno:t}=m.dataset;return Yd({ruta:Zd(Dd(e),t),dia:e,turno:t,paradas:[],supervisor:``},{modo:`plantilla`,nuevo:!0}),$(),Au(`coord-editor`,`#coord-ed-ruta`),!0}let h=t.closest(`[data-coord-edit-dia]`);if(h){let e=h.dataset.fecha,t=Od(e).find(e=>e.ruta===h.dataset.coordEditDia);return t&&(Yd(t,{modo:`dia`,fecha:e}),$(),Au(`coord-editor`)),!0}let g=t.closest(`[data-coord-new-dia]`);if(g){let{fecha:e,turno:t}=g.dataset;return Yd({ruta:Zd(Od(e),t),dia:_u(e),turno:t,paradas:[]},{modo:`dia`,fecha:e,nuevo:!0}),$(),Au(`coord-editor`,`#coord-ed-ruta`),!0}let ee=t.closest(`[data-coord-copy-ruta]`);if(ee){let e=ee.dataset.fecha,t=Od(e).find(e=>e.ruta===ee.dataset.coordCopyRuta);return t&&vm(Ld(t,{fecha:e}),`rutas`,`${t.ruta} copiada. Pegala en el grupo de WhatsApp del equipo.`),!0}let te=t.closest(`[data-coord-copy-dia]`);if(te){let e=te.dataset.coordCopyDia;return vm(Od(e).map(t=>Ld(t,{fecha:e})).join(`

`),`rutas`,`Rutas del ${vu(e).toLowerCase()} copiadas.`),!0}if(V){let e=t.closest(`[data-coord-add-dog]`);if(e){let t=Ru.get(e.dataset.coordAddDog);return t&&($d(t),uu(`${t.name} agregado a las ${V.paradas[V.paradas.length-1].hora}.`),$(),z(`coord-ed-buscar`)),!0}if(t.closest(`[data-coord-add-libre]`)){let e=Rd.trim();return e&&($d(null,e),uu(`${e} agregado como perro sin ficha.`),$(),z(`coord-ed-buscar`)),!0}let n=t.closest(`[data-coord-stop-up]`),r=t.closest(`[data-coord-stop-down]`);if(n||r){let e=Number((n||r).dataset[n?`coordStopUp`:`coordStopDown`]),t=n?e-1:e+1;if(t>=0&&t<V.paradas.length){[V.paradas[e],V.paradas[t]]=[V.paradas[t],V.paradas[e]],V.sucio=!0,$();let r=document.getElementById(`coord-ed-${n?`up`:`down`}-${t}`);z(r&&!r.disabled?r.id:`coord-ed-hora-${t}`),uu(`${V.paradas[t].perroNombre} ahora es la parada ${t+1}.`)}return!0}let i=t.closest(`[data-coord-stop-del]`);if(i){let e=Number(i.dataset.coordStopDel),[t]=V.paradas.splice(e,1);return V.sucio=!0,uu(`${t?.perroNombre||`Perro`} quitado de la ruta.`),$(),z(V.paradas.length?`coord-ed-hora-${Math.min(e,V.paradas.length-1)}`:`coord-ed-buscar`),!0}if(t.closest(`[data-coord-ed-sort]`))return ef(),uu(`Paradas ordenadas por hora.`),$(),z(`coord-ed-sort`),!0;let a=t.closest(`[data-coord-ed-save]`);if(a)return ld(`editor-save`,()=>xm(a.dataset.coordEdSave)),!0;if(t.closest(`[data-coord-ed-revert]`)){let e=V.existeDia;return ld(`editor-revert`,async()=>{await cd(`rutas`,e,{section:`rutas`,ok:`${e.ruta} del ${pu(e.fecha)} vuelve a ser igual que la semana.`,undo:!1})&&(Xd(),B())}),!0}if(t.closest(`[data-coord-ed-copy]`))return vm(Ld(tf(),V.modo===`dia`?{fecha:V.fecha}:{}),`editor`,`Ruta copiada. Pegala en el grupo de WhatsApp del equipo.`),!0;if(t.closest(`[data-coord-ed-close]`))return V.sucio?(Bd=`salir`,$(),z(`coord-ed-close-cancel`)):(Xd(),$(),Au(`coord-rutas`)),!0;if(t.closest(`[data-coord-ed-close-ok]`))return Xd(),$(),Au(`coord-rutas`),!0;if(t.closest(`[data-coord-ed-close-cancel]`))return Bd=``,$(),z(`coord-ed-close`),!0}let ne=t.closest(`[data-coord-sol-aplicar]`);if(ne){let e=ym(of(),ne.dataset.coordSolAplicar);return e?V?.sucio&&V.solicitudId!==e.id?(I(`editor`,`Primero guardá o cerrá la ruta que estás editando.`,`error`),$(),Au(`coord-editor`),!0):(uf(e),$(),Au(`coord-editor`),!0):!0}let re=t.closest(`[data-coord-sol-rechazar]`);if(re)return af=re.dataset.coordSolRechazar,$(),z(`coord-rechazo-${af}`),!0;if(t.closest(`[data-coord-sol-rechazar-cancel]`)){let e=af;return af=``,$(),z(`coord-rechazar-${e}`),!0}let ie=t.closest(`[data-coord-sol-rechazar-ok]`);if(ie){let e=ie.dataset.coordSolRechazarOk,n=(document.getElementById(`coord-rechazo-${e}`)?.value||rf[e]||``).trim(),r=t.closest(`#coord-solicitudes`)?`solicitudesTodas`:`solicitudes`;if(n.length<3)return I(r,`Escribí una respuesta corta para el supervisor.`,`error`),rf[e]=n,$(),z(`coord-rechazo-${e}`),!0;let i=ym(of(),e);return ld(`sol-${e}`,async()=>{await sd(`solicitudes`,{id:e,fecha:hu(i?.fecha)?i.fecha:b(),estado:`rechazado`,respuesta:n},{section:r,ok:`Pedido rechazado. El supervisor ve tu respuesta.`})&&(delete rf[e],af=``)}),!0}if(t.closest(`[data-coord-cliente-save]`)){let e=up(t.closest(`[data-coord-form]`));if(cp(`cliente`,e),!e.nombre?.trim())return I(`clientes`,`Falta el nombre del tutor.`,`error`),$(),z(`coord-cliente-nombre`),!0;let n={nombre:e.nombre.trim(),telefono:e.telefono?.trim()||``,barrio:e.barrio?.trim()||``,perros:Array.isArray(e.perros)?e.perros:[],plan:e.plan||`Pendiente de confirmar`,dias:Array.isArray(e.dias)?e.dias:[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas?.trim()||``};e.id&&(n.id=e.id),e.pedidoId&&(n.pedidoId=e.pedidoId);let r=e.id?ym(gf(),e.id):null,i=[...new Set([...Array.isArray(r?.archivos)?r.archivos:[],...Array.isArray(e.archivos)?e.archivos:[]])];i.length&&(n.archivos=i);let a={...r?.archivosPerro||{}};return n.perros.length===1&&i.forEach(e=>{let t=Uf(e);t&&Wf(t)&&!t.perroId&&!a[e]&&(a[e]=n.perros[0])}),Object.keys(a).length&&(n.archivosPerro=a),ld(`cliente-save`,async()=>{if(await sd(`clientes`,n,{section:`clientes`,ok:e.id?`Cambios de ${n.nombre} guardados.`:`${n.nombre} quedó cargado como cliente.`})&&(lp(`cliente`),e.pedidoId&&!e.id)){let t=ym(Of(),e.pedidoId);t&&Df(t)===`nuevo`&&await y.save(`pedidos`,{id:t.id,estado:`en-curso`}).catch(()=>{})}}),!0}if(t.closest(`[data-coord-cliente-cancel]`))return lp(`cliente`),I(`clientes`,`Formulario vacío.`),$(),z(`coord-cliente-nombre`),!0;let ae=t.closest(`[data-coord-cliente-edit]`);if(ae){let e=ym(gf(),ae.dataset.coordClienteEdit);return e&&(ap.cliente={id:e.id,pedidoId:e.pedidoId||``,nombre:e.nombre||``,telefono:e.telefono||``,barrio:e.barrio||``,perros:e.perros||[],plan:e.plan||`Pendiente de confirmar`,dias:e.dias||[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas||``,archivos:e.archivos||[]},op.delete(`cliente`),$(),Au(`coord-cliente-form`,`#coord-cliente-nombre`)),!0}if(t.closest(`[data-coord-aviso-save]`)){let e=up(t.closest(`[data-coord-form]`));cp(`aviso`,e);let n=b(),r=e.barrio?.trim()?e.mensaje?.trim()?e.vigenteHasta&&(!hu(e.vigenteHasta)||e.vigenteHasta<n)?[`La fecha de «vigente hasta» tiene que ser hoy o después.`,`coord-aviso-vigenteHasta`]:null:[`Escribí qué pasa.`,`coord-aviso-mensaje`]:[`Falta el barrio.`,`coord-aviso-barrio`];if(r)return I(`avisos`,r[0],`error`),$(),z(r[1]),!0;let i=e.barrio.trim(),a=mf.includes(e.tipo)?e.tipo:`otro`;return ld(`aviso-save`,async()=>{await sd(`avisos`,{fecha:n,barrio:i,tipo:a,mensaje:e.mensaje.trim(),vigenteHasta:e.vigenteHasta||n,titulo:`${a[0].toUpperCase()}${a.slice(1)} en ${i}`},{section:`avisos`,ok:`Aviso de ${i} guardado. Ya lo ve el equipo.`})&&lp(`aviso`)}),!0}let oe=t.closest(`[data-coord-aviso-copy]`);if(oe){let e=ym(_f(),oe.dataset.coordAvisoCopy),n=t.closest(`#coord-avisos`)?`avisos`:`avisosTop`;return e&&vm(Sf(e),n,`Aviso copiado. Pegalo en el grupo de WhatsApp del equipo.`),!0}let se=t.closest(`[data-coord-aviso-fin]`);if(se){let e=ym(_f(),se.dataset.coordAvisoFin);return e&&ld(`aviso-${e.id}`,async()=>{let t=yf().length>1;await sd(`avisos`,{id:e.id,vigenteHasta:gu(b(),-1)},{section:t?`avisosTop`:`avisos`,ok:`Aviso de ${e.barrio||`barrio`} marcado como terminado.`})&&z(t?`coord-avisos-vigentes`:`coord-avisos-summary`)}),!0}let ce=t.closest(`[data-coord-resolve]`);if(ce){let e=ce.dataset.coordResolve,t=Ru.get(e);return ld(`resuelto-${e}`,async()=>{await sd(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{section:`datos`,ok:`${t?.name||e}: marcado como resuelto.`})&&z(`coord-dato-${e}`)}),!0}let le=t.closest(`[data-coord-unresolve]`);if(le){let e=le.dataset.coordUnresolve,t=Ru.get(e);return ld(`resuelto-${e}`,async()=>{await sd(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{section:`datos`,ok:`${t?.name||e}: volvió a pendientes.`})&&z(`coord-dato-${e}`)}),!0}if(t.closest(`[data-coord-pedido-save]`)){let e=up(t.closest(`[data-coord-form]`));if(cp(`pedido`,e),!e.perro?.trim()&&!e.detalle?.trim())return I(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),z(`coord-pedido-perro`),!0;let n=e.tipo||Cf[0],r=e.perro?.trim()||``;return ld(`pedido-save`,async()=>{await sd(`pedidos`,{fecha:b(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:e.detalle?.trim()||``,datos:{perro:r,canal:e.canal||wf[0]}},{section:`pedidos`,ok:`Pedido guardado en "Nuevo".`})&&lp(`pedido`)}),!0}let ue=t.closest(`[data-coord-pedido-move]`);if(ue){let e=ue.dataset.coordPedidoMove,t=ue.dataset.estado;return ld(`pedido-${e}`,async()=>{await sd(`pedidos`,{id:e,estado:t},{section:`pedidos`,ok:`Pedido movido a "${Ef[t]}".`})&&z(`coord-pedido-${e}`)}),!0}let de=t.closest(`[data-coord-pedido-delete]`);if(de){let e=ym(Of(),de.dataset.coordPedidoDelete);return e&&ld(`pedido-${e.id}`,async()=>{await cd(`pedidos`,e,{section:`pedidos`,ok:`Pedido borrado.`})&&z(`coord-undo-pedidos`)}),!0}let fe=t.closest(`[data-coord-pedido-cliente]`);if(fe){let e=ym(Of(),fe.dataset.coordPedidoCliente);return e&&(ap.cliente=$p(e),op.delete(`cliente`),I(`clientes`,`Formulario completado con el pedido de ${e.datos?.responsable||`la web`}. Revisalo y guardalo.`),gm(`clientes`,`coord-cliente-form`,`#coord-cliente-nombre`)),!0}let pe=t.closest(`[data-coord-pedido-ficha]`);if(pe){let e=ym(Of(),pe.dataset.coordPedidoFicha);return e&&(ap.alta=dm(e),op.delete(`alta`),I(`alta`,`Formulario completado con el pedido de ${jf(e)||`la web`}. Revisalo y guardalo.`),gm(`alta`,`coord-alta`,`#coord-alta-nombre`)),!0}if(t.closest(`[data-coord-alta-save]`)){let e=up(t.closest(`[data-coord-form]`));if(cp(`alta`,e),!e.nombre?.trim())return I(`alta`,`Falta el nombre del perro.`,`error`),$(),z(`coord-alta-nombre`),!0;let n=e.nombre.trim(),{archivos:r,...i}=e,a={...i,nombre:n,dias:Array.isArray(e.dias)?e.dias:[],primerPaseo:`Individual`};return im&&!am&&qf()?(I(`alta`,`Sin señal: el carnet no se puede subir sin conexión. Esperá a tener señal o quitá el carnet para guardar la ficha ahora (después lo subís desde Clientes).`,`error`),$(),z(`coord-alta-carnet-quitar`),!0):(ld(`alta-save`,async()=>{if(im&&!am){om=!0,uu(`Subiendo el carnet de vacunas.`),B();try{am=await dt.subir(Rf,im,{perroNombre:n,pedidoId:e.pedidoId||``,nota:`Alta de perro nuevo`}),im=null}catch(e){I(`alta`,`No se pudo subir el carnet: ${Jf(e,`subir`)} La ficha todavía no se guardó: probá de nuevo o quitá el carnet.`,`error`);return}finally{om=!1,B()}}let t=[...new Set([...Array.isArray(r)?r:[],am?.id].filter(Boolean))],i=am?.id||t.find(e=>Wf(Uf(e))),o=i?Uf(i)||am:null,s={fecha:b(),perroNombre:n,datos:a,categoria:`SIN EVALUAR`,estado:`lista`};t.length&&(s.archivos=t),i&&(s.carnet={id:i,nombre:o?.nombreArchivo||``}),await sd(`fichas`,s,{section:`alta`,ok:`Ficha de ${n} guardada${i?` con el carnet de vacunas`:``}. Arranca SIN EVALUAR y con primer paseo individual.`})&&(lp(`alta`),im=null,am=null)}),!0)}if(t.closest(`[data-coord-alta-clear]`))return sm=!0,$(),z(`coord-alta-vaciar-cancel`),!0;if(t.closest(`[data-coord-alta-clear-cancel]`))return sm=!1,$(),z(`coord-alta-clear`),!0;if(t.closest(`[data-coord-alta-clear-ok]`))return sm=!1,im=null,am=null,lp(`alta`),I(`alta`,`Formulario vacío.`),$(),z(`coord-alta-nombre`),!0;if(t.closest(`[data-coord-alta-carnet-quitar]`))return im=null,am=null,uu(`Carnet quitado de la ficha.`),$(),z(`coord-alta-carnet`),!0;let me=t.closest(`[data-coord-alta-copy]`);if(me){let e=ym(kf(),me.dataset.coordAltaCopy);return e&&vm(um(e),`alta`,`Ficha copiada. Pegala en el registro maestro.`),!0}let he=t.closest(`[data-coord-alta-delete]`);if(he){let e=ym(kf(),he.dataset.coordAltaDelete);return e&&ld(`ficha-${e.id}`,async()=>{await cd(`fichas`,e,{section:`alta`,ok:`Ficha borrada.`})&&z(`coord-undo-alta`)}),!0}return!1}function wm(e){let t=e.target;if(t.closest?.(`.coord-shell`)){if(V){if(t.matches(`[data-coord-ed-search]`)){Rd=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=Vp());return}if(t.matches(`[data-coord-ed-hora]`)){zd=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=Vp());return}if(t.matches(`[data-coord-ed-field]`)){V[t.dataset.coordEdField]=t.value,V.sucio=!0;return}if(t.matches(`[data-coord-stop]`)){let e=V.paradas[Number(t.dataset.coordStop)];e&&(e[t.dataset.k]=(t.dataset.k,t.value),V.sucio=!0);return}}if(t.matches(`[data-coord-rechazo]`))rf[t.dataset.coordRechazo]=t.value;else if(H&&t.matches(`[data-coord-subida-campo]`))H[t.dataset.coordSubidaCampo]=t.value;else if(t.matches(`[data-coord-clientes-buscar]`)){hf=t.value;let e=document.getElementById(`coord-clientes-lista`);e&&(e.innerHTML=qp())}else if(t.matches(`[data-coord-filter-perros]`)){let e=R(t.value);t.parentElement.querySelectorAll(`.coord-check`).forEach(t=>{t.hidden=!!e&&!t.dataset.name.includes(e)&&!t.querySelector(`input`).checked})}}}function Tm(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;if(t.matches(`[data-coord-rutas-fecha]`))return hu(t.value)&&(Ud=t.value,B()),!0;if(V&&t.matches(`[data-coord-stop]`)){let e=V.paradas[Number(t.dataset.coordStop)];return e&&(e[t.dataset.k]=t.dataset.k===`minutos`?Number(t.value)||45:t.value,V.sucio=!0,t.dataset.k!==`nota`&&B()),!0}if(V&&t.matches(`[data-coord-ed-field]`))return V[t.dataset.coordEdField]=t.value,V.sucio=!0,!0;if(t.matches(`[data-coord-ed-hora], [data-coord-ed-search], [data-coord-rechazo], [data-coord-clientes-buscar], [data-coord-filter-perros]`))return!0;if(t.matches(`[data-coord-subida-archivo]`))return H&&t.files?.[0]&&(H.file=t.files[0],H.error=``,uu(`Elegiste ${H.file.name}. Tocá «Subir» para guardarlo.`),B()),!0;if(H&&t.matches(`[data-coord-subida-campo]`))return H[t.dataset.coordSubidaCampo]=t.value,t.dataset.coordSubidaCampo!==`nota`&&(H.error=``,B()),!0;if(t.matches(`[data-coord-alta-carnet]`))return t.files?.[0]&&(im=t.files[0],am=null,uu(`Elegiste ${im.name}. Se sube al guardar la ficha.`),B()),!0;let n=t.closest(`[data-coord-form]`);if(n){if(cp(n.dataset.coordForm,up(n)),n.dataset.coordForm===`cliente`&&t.name===`perros`){let e=document.getElementById(`coord-cliente-perros-label`),t=(ap.cliente.perros||[]).length;e&&(e.textContent=`Perros${t?` (${t})`:``}`)}return!0}return!1}function Em(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`[data-coord-cliente-save], [data-coord-aviso-save], [data-coord-pedido-save], [data-coord-alta-save]`)?.click())}function Dm(e){e.key===`Enter`&&e.target.matches?.(`.coord-shell [data-coord-ed-search]`)&&(e.preventDefault(),document.querySelector(`#coord-ed-results .coord-result`)?.click())}function Om(){fe.push(Cm),pe.push(Tm),document.addEventListener(`input`,wm),document.addEventListener(`submit`,Em),document.addEventListener(`keydown`,Dm)}var km=`paseosJuanAdmin_prioridadesHechas`,Am=`paseosJuanAdmin_seccionesAbiertas`,jm=`America/Argentina/Buenos_Aires`,Mm=[`Pequeño`,`Mediano`,`Grande`],Nm=S.manana.label,Pm=S.tarde.label,Fm=[`paseos`,`incidentes`,`checklists`,`pedidos`,`rutas`,`plantillas`,`avisos`],Im=[`pagos`,`clientes`,`archivos`],Lm=10,Rm=[`Efectivo`,`Transferencia`,`Naranja X`],zm=`Libro contable del Sistema de Gestión`,Bm={"carnet de vacunas":{label:`Carnet de vacunas`,tone:`ok`},"comprobante de pago":{label:`Comprobante de pago`,tone:`info`},documento:{label:`Documento`,tone:`neutral`},foto:{label:`Foto`,tone:`neutral`}},Vm=`image/jpeg,image/png,image/webp,application/pdf`,Hm=/^(image\/(jpeg|png|webp)|application\/pdf)$/,Um=864e5,Wm=20,Gm=``,G={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,adminLoaded:!1,adminError:``,pagosMes:null,archivosTipo:`todos`,savingPago:!1,lateSignature:``,msgs:{users:null,live:null,pagos:null,archivos:null}},Km=()=>({fecha:b(),concepto:``,monto:``,medio:``,pasadoAlLibro:!1}),K={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{},pago:Km(),pagoArchivo:null,pagoSubido:null};function q(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function J(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Y(e,t,n){return`${e} ${e===1?t:n}`}var qm={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Jm(e){let t=C.filter(t=>e.includes(t)),n=t.map(e=>C.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${qm[t[0]]} a ${qm[t[t.length-1]]}`:t.map(e=>qm[e]).join(`, `)}function Ym(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:jm,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:C.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function Xm(){return te(km)}function Zm(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Qm(){return new Set(te(Am))}function $m(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:jm,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function eh(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:jm,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function th(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function nh(e){let t=Number(e);return!Number.isFinite(t)||t<=0?``:t<1048576?`${Math.max(1,Math.round(t/1024))} KB`:`${(t/1048576).toFixed(1).replace(`.`,`,`)} MB`}function rh(e,t){return String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))}function ih(){return navigator.onLine===!1}function ah(){return v.user()||{usuario:``,nombre:``,rol:`admin`}}function oh(e){return String(e||``).trim().split(/\s+/)[0]||``}function sh(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function X(e,t){return[`pedidos`,`plantillas`,`avisos`,...Im].includes(e)?{}:{desde:t}}function ch(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function lh(e){return e.hora||$m(e.creadoEn)}function uh(e=new Date){let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:jm,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),n=e=>Number(t.find(t=>t.type===e)?.value||0);return n(`hour`)%24*60+n(`minute`)}function dh(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}var fh=810;function ph(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``)}function mh(e,t){let n=y.cached(`rutas`,X(`rutas`,e)).filter(t=>t.fecha===e),r=y.cached(`plantillas`,X(`plantillas`,e)).filter(e=>ph(e.dia)===ph(t)),i=!r.length,a=i?Ln().filter(e=>ph(e.dia)===ph(t)):r,o=new Map;a.forEach(e=>o.set(e.ruta||e.id,{...e,fuente:i?`planilla`:`plantilla`})),n.forEach(e=>o.set(e.ruta||String(e.id).slice(11),{...e,fuente:`dia`}));let s=e=>(e.paradas||[]).map(e=>e.hora||`99:99`).sort()[0]||`99:99`,c=[...o.values()].sort((e,t)=>s(e).localeCompare(s(t))||String(e.ruta).localeCompare(String(t.ruta)));return{list:c,fromSheet:c.some(e=>e.fuente===`planilla`)}}function hh(e,t,n){let r=(e,t)=>e.perroId&&t.perroId?e.perroId===t.perroId:ph(e.perroNombre)&&ph(e.perroNombre)===ph(t.perroNombre),i=t=>e.reduce((e,n)=>e+(n.paradas||[]).filter(e=>r(t,e)).length,0);return e.map(e=>{let a=ch({turno:e.turno}),o=(e.paradas||[]).map(e=>{let o=t.filter(t=>r(e,t)),s=o.find(e=>ch(e)===a)||(o.length===1&&i(e)===1?o[0]:null),c=s?.estado||`pendiente`,l=dh(e.hora),u=`a-tiempo`;return c===`entregado`?u=`entregado`:c===`no-sale`?u=`no-sale`:c===`pendiente`&&l!==null&&n>l+Lm&&(u=`atrasado`),{...e,paseo:s,estado:c,status:u,prevista:l,atraso:u===`atrasado`?n-l:0}}),s=e=>o.filter(t=>t.status===e).length;return{route:e,shift:a,stops:o,aTiempo:s(`a-tiempo`),atrasados:s(`atrasado`),entregados:s(`entregado`),noSale:s(`no-sale`)}})}function gh(e){return y.cached(`avisos`,X(`avisos`,e)).filter(t=>{let n=t.fecha||String(t.creadoEn||``).slice(0,10),r=t.vigenteHasta||n;return n&&n<=e&&r>=e}).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``)))}function _h(){let e=b(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=y.cached(`paseos`,X(`paseos`,e)).filter(t),i=y.cached(`incidentes`,X(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),a=y.cached(`checklists`,X(`checklists`,e)).filter(t).sort(n),o=y.cached(`pedidos`,X(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),s=[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>ch(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}}),c=uh(),l=mh(e,Ym().dayName),u=hh(l.list,r,c),d=u.flatMap(e=>e.stops.filter(e=>e.status===`atrasado`).map(t=>({...t,route:e.route})));return{hoy:e,paseos:r,incidentes:i,checklists:a,pedidosNuevos:o,shifts:s,nowMin:c,effective:l,compliance:u,late:d,lateNow:d.filter(e=>e.prevista<fh==c<fh),avisos:gh(e),carnetsWeb:y.cached(`archivos`,X(`archivos`,e)).filter(e=>e.tipo===`carnet de vacunas`&&e.creadoPor===`web`&&Date.now()-Date.parse(e.creadoEn||``)<Um).sort(rh)}}function vh(e){return e.late.map(e=>`${e.route.ruta}:${e.perroId||e.perroNombre}`).join(`|`)}function yh(){let e=b();G.adminLoaded||(G.adminLoaded=!0,bh().finally(()=>{Im.forEach(t=>y.watch(t,X(t,e)))})),G.liveDay!==e&&(G.liveDay=e,xh(!1).finally(()=>{Fm.forEach(t=>y.watch(t,X(t,e)))}))}async function bh(){let e=b(),t=await Promise.allSettled(Im.map(t=>y.list(t,X(t,e)))),n=e=>[...new Set(t.filter((t,n)=>t.status===`rejected`&&e.includes(Im[n])).map(e=>e.reason?.message||`No se pudieron traer los datos.`))].join(` `),r=G.adminError,i=n([`pagos`,`clientes`]),a=n([`archivos`]);G.adminError=[i,a].filter(Boolean).join(` `),i&&Z(`pagos`,`No se pudieron traer pagos o clientes: ${i}`,!0),a&&Z(`archivos`,`No se pudo traer la lista de archivos: ${a}`,!0),r!==G.adminError&&Q()}async function xh(e){let t=b(),n=await Promise.allSettled(Fm.map(e=>y.list(e,X(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=G.liveError;G.liveError=r.join(` `),G.liveError?Z(`live`,`No se pudieron actualizar los datos del día: ${G.liveError}`,!0):e?Z(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Z(`live`,`Datos del día actualizados.`),(e||i!==G.liveError)&&Q()}var Sh={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},Ch={admin:`todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.`,coordinador:`arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.`,supervisor:`controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.`,paseador:`hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.`,ayudante:`acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.`,marketing:`pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.`};function wh(e){let t=(Xe[e]||[]).filter(e=>Sh[e]).map(t=>e===`ayudante`&&t===`paseador`?`Paseador (modo ayudante)`:Sh[t]);return`${t.length?`Paneles: ${J(t)}.`:`Todavía no tiene panel.`} Qué hace: ${Ch[e]||`Pendiente de confirmar`}`}function Th(){return G.usersLoading=!0,$e.list().then(e=>{G.users=e,G.usersError=``}).catch(e=>{G.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,G.usersError,!0)}).finally(()=>{G.usersLoading=!1,Q()})}function Eh(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function Dh(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function Oh(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!Dh(e))return e}}function kh(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){G.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function Ah(e){let t=G.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?q(t.text):``}</p>`}function jh(){Object.entries(G.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function Mh(e){if(!e||e===document.body||!e.closest?.(`.adm-shell`))return null;if(e.id)return{selector:`#${CSS.escape(e.id)}`,index:0};let t=``;if(e.tagName===`SUMMARY`&&e.parentElement){let n=[...e.parentElement.attributes].find(e=>e.name.startsWith(`data-adm-`));n&&(t=`[${n.name}="${CSS.escape(n.value)}"] > summary`)}else{let n=[...e.attributes].find(e=>e.name.startsWith(`data-adm-`)&&e.name!==`data-adm-area`);n&&(t=`${e.tagName.toLowerCase()}[${n.name}="${CSS.escape(n.value)}"]`)}return t?{selector:t,index:Math.max(0,[...document.querySelectorAll(t)].indexOf(e))}:null}function Q(){if(!sh()||v.user()?.rol!==`admin`)return;let e=document.activeElement,t=Mh(e),n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.querySelectorAll(t.selector),i=r[t.index]||r[0];if(i&&(i.focus({preventScroll:!0}),n))try{i.setSelectionRange(...n)}catch{}}function Nh(){return w.filter(e=>e.status===`Activo`&&e.days.length>0)}function Ph(){let e=Nh(),t=C.map(t=>{let n=e.filter(e=>kn(e,t,Nm)).length,r=e.filter(e=>kn(e,t,Pm)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function Fh(){let e=Nh(),t=new Map(w.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return w.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[Nm,Pm].forEach(e=>{let t=C.filter(t=>kn(o,t,e)&&kn(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Ih(){return Nh().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function Lh(){return w.filter(e=>e.review||e.status!==`Activo`)}function Rh(e){return e===Nm?S.manana.route:S.tarde.routes.join(` o `)}function zh(e,t){return!!e.carnet?.id||t.carnetsWeb.some(t=>t.pedidoId===e.id)}function Bh(e=_h()){let{conflicts:t}=Fh(),n=w.filter(e=>e.status!==`Activo`),r=Lh(),i=Ih().filter(e=>e.category===`SIN EVALUAR`),a=Nh(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${J(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${lh(n)?` a las ${lh(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${J(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(e.lateNow.length){let t=e.lateNow.length,n=e.nowMin<fh?`mañana`:`tarde`,r=e.lateNow.slice().sort((e,t)=>t.atraso-e.atraso),i=r[0],a=r.slice(0,3).map(e=>`${e.perroNombre} (${e.hora}, ${e.route.ruta})`),o=[...new Set(r.map(e=>e.route.ruta))],c=i.route.supervisor||Jh(i.route.paseador)||`el supervisor del turno`;e.paseos.length?s.push({id:`atrasos-${e.hoy}-${n}-${t}`,tag:`Atrasos`,tone:`warning`,title:`${Y(t,`perro atrasado`,`perros atrasados`)} en el turno ${n}`,detail:`${J(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Pasaron más de ${Lm} minutos de la hora prevista y nadie marcó el retiro.`,action:`Preguntale a ${c} qué pasa con ${i.perroNombre} (retiro previsto ${i.hora}, ruta ${o.join(` y `)}).`,target:`adm-cumplimiento`,targetLabel:t===1?`Ver el atraso`:`Ver los atrasos`}):s.push({id:`atrasos-sin-marcas-${e.hoy}-${n}`,tag:`Atrasos`,tone:`warning`,title:`Nadie marcó retiros hoy: ${Y(t,`perro figura`,`perros figuran`)} pasados de hora en el turno ${n}`,detail:`Según la ruta de hoy, ${J(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,action:`Preguntale a ${c} si el equipo está marcando los retiros en la página del paseador.`,target:`adm-cumplimiento`,targetLabel:`Ver el cumplimiento`})}let c=new Set(e.pedidosNuevos.map(e=>e.id)),l=e.carnetsWeb.filter(e=>!c.has(e.pedidoId));if(e.pedidosNuevos.length||l.length){let t=e.pedidosNuevos.length,n=e.pedidosNuevos.filter(t=>zh(t,e)),r=e=>e.titulo||e.tipo||`Pedido sin título`,i=[...new Set(l.map(e=>e.perroNombre||`perro sin nombre`))],a=l.length?`${t?`Además, l`:`L`}${l.length===1?`legó 1 carnet de vacunas`:`legaron ${l.length} carnets de vacunas`} por la web en las últimas 24 h (${J(i)}) de ${l.length===1?`un pedido que`:`pedidos que`} ya no ${l.length===1?`está`:`están`} como nuevo${l.length===1?``:`s`}.`:``;if(t){let i=e.pedidosNuevos.slice(0,3).map(t=>`${r(t)}${zh(t,e)?` (con carnet)`:``}`),o=e.pedidosNuevos[t-1],c=r(o),u=n.length+l.length;s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}-${u}`,tag:`Pedidos`,tone:`info`,title:`${Y(t,`pedido nuevo`,`pedidos nuevos`)} sin responder${n.length?` · ${n.length===t&&t===1?`trae carnet de vacunas`:`${n.length} con carnet`}`:``}`,detail:`${J(i)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.${a?` ${a}`:``}`,action:t===1?`Respondé el pedido “${c}”${zh(o,e)?` y mirá el carnet que mandó`:``}.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${c}”${zh(o,e)?` (trae carnet)`:``}.`,target:`adm-pedidos`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}else{let e=l[0];s.push({id:`carnets-web-${e.id}-${l.length}`,tag:`Pedidos`,tone:`info`,title:l.length===1?`Pedido nuevo con carnet: llegó el carnet de ${e.perroNombre||`un perro`} por la web`:`Pedidos nuevos con carnet: llegaron ${l.length} carnets por la web`,detail:a,action:`Abrí el carnet de ${e.perroNombre||`ese perro`} en “Archivos recibidos” y sumalo a su ficha.`,target:`adm-archivos`,targetLabel:l.length===1?`Ver el carnet`:`Ver los carnets`})}}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(Rh).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${J(r)}. Hay ${Y(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${J(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${Y(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${J(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${J(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${J(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${J(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function Vh(){let e=Nh(),t=[],n=[];e.forEach(e=>{let r=Sn.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=Sn.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function Hh(e){return`
    <div class="adm-shell">
      ${Uh()}
      ${e}
    </div>
  `}function Uh(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${g(`lock`,`adm-icon-sm`)} ${q(ah().nombre)} · ${q(Ze[ah().rol]||ah().rol)}</span>
        <button class="adm-button adm-button--ghost" type="button" data-adm-a11y>
          ${g(`eye`,`adm-icon-sm`)}
          <span>Accesibilidad</span>
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-admin-logout>
          ${g(`logOut`,`adm-icon-sm`)}
          <span>Salir</span>
        </button>
      </div>
    </header>
  `}function Wh(){yh(),G.users===null&&!G.usersLoading&&!G.usersError&&Th();let e=_h();G.lateSignature=vh(e);let t=Bh(e),n=Xm(),r=Qm();return setTimeout(jh,60),`
    <main class="adm-page" id="adm-main">
      ${Gh(t,n,e)}
      ${og(e)}
      ${mg()}
      ${pg()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${g(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${g(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${gg(r)}
        ${Fg(r)}
        ${_g(r)}
        ${Rg(r)}
        ${kg(r)}
        ${yg(r)}
        ${Sg(r)}
        ${Cg(r)}
        ${zg(r)}
      </div>
      ${Bg()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function Gh(e,t,n){let{dayName:r,date:i}=Ym(),a=Nh(),o=a.filter(e=>kn(e,r,Nm)).length,s=a.filter(e=>kn(e,r,Pm)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${Y(o,`perro`,`perros`)} a la mañana y ${Y(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=oh(ah().nombre);return`
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${q(r)} ${q(i)}</p>
        <h1 id="adm-hero-title">Hola${u?`, ${q(u)}`:``}</h1>
        <p class="adm-hero-sub">${l}</p>
        ${n.incidentes.length?`
          <p class="adm-hero-alert">${g(`alertTriangle`,`adm-icon-sm`)} ${Y(n.incidentes.length,`incidente cargado hoy`,`incidentes cargados hoy`)}. Está primero en tus prioridades.</p>
        `:``}
      </div>

      ${c?`
        <div class="adm-next" aria-labelledby="adm-next-title">
          <p class="adm-next-label" id="adm-next-title">${g(`arrowRight`,`adm-icon-sm`)} Próximo paso</p>
          <p class="adm-next-text">${q(c.action)}</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-done="${c.id}">
              ${g(`checkCircle`,`adm-icon-sm`)} Listo, ya lo hice
            </button>
            <button class="adm-button adm-button--ghost" type="button" data-adm-goto="${c.target}">
              ${q(c.targetLabel)}
            </button>
          </div>
        </div>
      `:`
        <div class="adm-next adm-next--done">
          <p class="adm-next-label">${g(`checkCircle`,`adm-icon-sm`)} Próximo paso</p>
          <p class="adm-next-text">Marcaste las prioridades como hechas. Abrí “Carga semanal” y revisá el día con más perros.</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-goto="adm-carga">Ver la carga semanal</button>
          </div>
        </div>
      `}

      <h2 class="adm-priorities-title">Tus ${e.length} prioridades</h2>
      <ol class="adm-priorities">
        ${e.map((e,n)=>{let r=t.includes(e.id);return`
            <li class="adm-priority adm-priority--${e.tone} ${r?`is-done`:``}">
              <span class="adm-priority-number" aria-hidden="true">${n+1}</span>
              <div class="adm-priority-body">
                <p class="adm-tag adm-tag--${e.tone}">${e.tag}${r?` · Hecho`:``}</p>
                <h3>${q(e.title)}</h3>
                <p>${q(e.detail)}</p>
                <button class="adm-link-button" type="button" data-adm-done="${e.id}" aria-pressed="${r}">
                  ${r?`Desmarcar`:`Marcar como hecho`}
                </button>
              </div>
            </li>
          `}).join(``)}
      </ol>
      <p class="adm-note">Las marcas de “hecho” se guardan solo en este dispositivo.</p>
    </section>
  `}var Kh={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function qh(e){let{dayName:t}=Ym();return Nh().filter(n=>kn(n,t,e)).length}function Jh(e){return G.users?.find(t=>t.usuario===e)?.nombre||e||``}function Yh(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=$m(e.actualizadoEn);return`Actualizado por ${Jh(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||Jh(e.creadoPor),r=$m(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function Xh(e){let t={manana:{title:`Turno mañana`,hours:`${S.manana.from} a ${S.manana.to}`,planned:qh(Nm)},tarde:{title:`Turno tarde`,hours:`${S.tarde.from} a ${S.tarde.to}`,planned:qh(Pm)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
    <article class="adm-shift" aria-labelledby="adm-shift-${e.key}">
      <h3 id="adm-shift-${e.key}">${t.title}${t.hours?` <span class="adm-th-sub">${t.hours}</span>`:``}</h3>
      ${e.total?`
        <p class="adm-shift-big"><strong>${e.entregados}</strong> de ${Y(e.salen,`perro entregado`,`perros entregados`)}</p>
        <span class="adm-progress" aria-hidden="true"><span style="--v:${n.toFixed(3)}"></span></span>
        <ul class="adm-shift-stats">
          <li><strong>${e.retirados}</strong> retirados</li>
          <li><strong>${e.paseando}</strong> paseando</li>
          <li><strong>${e.pendientes}</strong> por retirar</li>
          ${e.noSale?`<li><strong>${e.noSale}</strong> no ${e.noSale===1?`sale`:`salen`}</li>`:``}
        </ul>
        <details class="adm-inner adm-dogs" data-adm-dogs="${r}" ${G.openDogs.has(r)?`open`:``}>
          <summary>Ver los ${e.total} perros</summary>
          <ul class="adm-dog-list">
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=Kh[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${q(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${q(Yh(e))}${e.nota?` · Nota: ${q(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno. Los marca el paseador en su página al retirar a cada perro.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function Zh(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${g(`alertTriangle`,`adm-icon-sm`)} ${Y(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${q(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${lh(e)?`<span class="adm-muted">${q(lh(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${q(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${q(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${Yh(e,!0)?`<p class="adm-note">${q(Yh(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function Qh(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}var $h={"a-tiempo":{label:`A tiempo`,tone:`ok`},atrasado:{label:`Atrasado`,tone:`danger`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}},eg={dia:`Cambio del día`,plantilla:`Plantilla semanal`,planilla:`Planilla BASE RUTAS`};function tg(e){let t=Kh[e.estado]||{label:e.estado},n=[`Retiro previsto ${e.hora||`pendiente de confirmar`}`];return e.status===`atrasado`?n.push(`${e.atraso} min de atraso`):e.paseo&&n.push(t.label),e.paseo?.horaRetiro&&n.push(`retirado ${e.paseo.horaRetiro}`),e.paseo?.horaEntrega&&n.push(`entregado ${e.paseo.horaEntrega}`),n.join(` · `)}function ng(e){let{route:t,stops:n}=e,r=n.length-e.noSale,i=`ruta-${t.ruta}`,a=[t.paseador?`Paseador: ${Jh(t.paseador)}`:`Paseador: sin asignar`,t.ayudante?`Ayudante: ${Jh(t.ayudante)}`:``,t.supervisor?`Supervisa: ${t.supervisor}`:``].filter(Boolean).join(` · `),o=n.filter(e=>e.status===`atrasado`).sort((e,t)=>t.atraso-e.atraso);return`
    <article class="adm-shift adm-route ${o.length?`has-late`:``}" aria-labelledby="adm-route-${q(t.ruta)}">
      <h4 id="adm-route-${q(t.ruta)}">${q(t.ruta||`Ruta sin código`)} <span class="adm-th-sub">${q(t.turno||`Turno sin indicar`)} · ${q(eg[t.fuente]||``)}</span></h4>
      <p class="adm-dog-meta">${q(a)}</p>
      ${n.length?`
        <ul class="adm-route-stats" aria-label="Cumplimiento de ${q(t.ruta)}">
          <li class="is-ok"><strong>${e.aTiempo}</strong> a tiempo</li>
          <li class="${e.atrasados?`is-late`:``}"><strong>${e.atrasados}</strong> ${e.atrasados===1?`atrasado`:`atrasados`}</li>
          <li><strong>${e.entregados}</strong> de ${r} ${e.entregados===1?`entregado`:`entregados`}</li>
          ${e.noSale?`<li><strong>${e.noSale}</strong> no ${e.noSale===1?`sale`:`salen`}</li>`:``}
        </ul>
        ${o.length?`
          <ul class="adm-late-list" aria-label="Atrasados de ${q(t.ruta)}">
            ${o.map(e=>`<li><strong>${q(e.perroNombre||`Perro sin nombre`)}</strong> <span>retiro ${q(e.hora)} · ${e.atraso} min sin retiro</span></li>`).join(``)}
          </ul>
        `:``}
        <details class="adm-inner adm-dogs" data-adm-dogs="${q(i)}" ${G.openDogs.has(i)?`open`:``}>
          <summary>Ver las ${n.length} paradas en orden</summary>
          <ol class="adm-dog-list adm-stop-list">
            ${n.map(e=>{let t=$h[e.status];return e.status===`a-tiempo`&&(t=e.estado===`pendiente`?{label:`Por retirar · a tiempo`,tone:`neutral`}:{label:`${(Kh[e.estado]||{label:e.estado}).label} · a tiempo`,tone:`info`}),`
                <li>
                  <span class="adm-dog-name">${q(e.hora||`--:--`)} · ${q(e.perroNombre||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}${e.paseo?.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${q(tg(e))}${e.nota?` · Nota: ${q(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ol>
        </details>
      `:`<p class="adm-empty">Esta ruta no tiene paradas cargadas.</p>`}
    </article>
  `}function rg(e){let{compliance:t,effective:n,late:r}=e;return`
    <div class="adm-compliance" id="adm-cumplimiento" tabindex="-1" role="region" aria-labelledby="adm-compliance-title">
      <h3 id="adm-compliance-title">${g(`route`,`adm-icon-sm`)} Cumplimiento por ruta ${r.length?`<span class="adm-count adm-count--danger">${Y(r.length,`atrasado`,`atrasados`)}</span>`:``}</h3>
      <p class="adm-note">Atrasado = pasaron más de ${Lm} minutos de la hora prevista y nadie marcó el retiro. Hora de Argentina.</p>
      ${n.fromSheet?`
        <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${x.toLowerCase()}.</span></p>
      `:``}
      ${t.length?`
        <div class="adm-live-grid">${t.map(ng).join(``)}</div>
      `:`<p class="adm-empty">Hoy no hay rutas: ni cambios del día, ni plantilla, ni paseos en la planilla.</p>`}
    </div>
  `}var ig={"perro suelto":`danger`,seguridad:`danger`,"obra o corte":`warning`,clima:`info`,"cambio de horario":`info`};function ag(e){let{avisos:t}=e;return`
    <div class="adm-avisos" id="adm-avisos" role="region" aria-labelledby="adm-avisos-title">
      <h3 id="adm-avisos-title">${g(`mapPin`,`adm-icon-sm`)} Avisos por barrio vigentes <span class="adm-count">${t.length}</span></h3>
      ${t.length?`
        <ul class="adm-aviso-list">
          ${t.map(e=>`
            <li class="adm-aviso">
              <div class="adm-aviso-head">
                <strong>${q(e.barrio||`Barrio sin indicar`)}</strong>
                <span class="adm-pill adm-pill--${ig[e.tipo]||`neutral`}">${q(e.tipo||`otro`)}</span>
                <span class="adm-muted">${e.vigenteHasta?`Hasta el ${q(th(e.vigenteHasta))}`:`Solo hoy`}</span>
              </div>
              <p>${q(e.mensaje||e.titulo||``)}</p>
              ${Yh(e,!0)?`<p class="adm-note">${q(Yh(e,!0))}.</p>`:``}
            </li>
          `).join(``)}
        </ul>
      `:`<p class="adm-empty">No hay avisos vigentes por barrio. Los cargan el coordinador o el supervisor cuando pasa algo en una zona.</p>`}
    </div>
  `}function og(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${q(th(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" id="adm-live-refresh" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó. Se actualiza solo cuando vuelve la señal.</p>`:``}
      ${Ah(`live`)}

      ${e.incidentes.length?Zh(e.incidentes):`
        <p class="adm-live-ok">${g(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      ${rg(e)}
      ${ag(e)}

      <div class="adm-live-grid">
        ${e.shifts.map(Xh).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=Qh(e);return`
                  <li>
                    <span><strong>${q(e.creadoPorNombre||e.creadoPor||`Sin nombre`)}</strong> · ${q(e.turno||`Turno sin indicar`)}</span>
                    <span class="adm-pill ${t.complete?`adm-pill--ok`:`adm-pill--warning`}">${t.complete?`Completo`:`Incompleto`}${t.text?` · ${t.text}`:``}</span>
                  </li>
                `}).join(``)}
            </ul>
          `:`<p class="adm-empty">Nadie cargó el checklist hoy. Lo completa cada paseador en su página antes de salir.</p>`}
        </article>

        <article class="adm-shift" id="adm-pedidos" tabindex="-1" aria-labelledby="adm-live-pedidos">
          <h3 id="adm-live-pedidos">Pedidos nuevos <span class="adm-count">${r.length}</span></h3>
          ${r.length?`
            <ul class="adm-mini-list adm-pedido-list">
              ${r.slice(0,6).map(t=>{let n=t.carnet?.id||e.carnetsWeb.find(e=>e.pedidoId===t.id)?.id||``;return`
                  <li>
                    <span><strong>${q(t.titulo||t.tipo||`Pedido sin título`)}</strong></span>
                    ${n?`<span class="adm-pill adm-pill--ok">${g(`fileCheck`,`adm-icon-xs`)} Trae carnet</span>`:``}
                    <span class="adm-dog-meta">${q(th(t.fecha)||eh(t.creadoEn))} · ${t.origen===`web`?`Formulario web`:q(t.creadoPorNombre||`Cargado en la app`)}</span>
                    ${n?`<button class="adm-link-button" type="button" data-adm-archivo-abrir="${q(n)}" data-adm-area="live">Ver el carnet${t.datos?.perro?` de ${q(t.datos.perro)}`:``}</button>`:``}
                  </li>
                `}).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${Y(r.length-6,`pedido más`,`pedidos más`)}. Los responde el coordinador desde su página.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos. Llegan del formulario de la web o los carga el equipo.</p>`}
        </article>
      </div>
    </section>
  `}function sg(e){return Object.entries(Ze).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function cg(){let e=G.credential;if(!e)return``;let t=kh(e);return`
    <div class="adm-cred" id="adm-cred" tabindex="-1" role="region" aria-labelledby="adm-cred-title">
      <p class="adm-tag adm-tag--warning">Solo se muestra ahora</p>
      <h3 id="adm-cred-title">${e.tipo===`alta`?`Usuario creado: ${q(e.nombre)}`:`PIN nuevo de ${q(e.nombre)}`}</h3>
      <p>Copiá este mensaje y mandáselo por WhatsApp:</p>
      <p class="adm-cred-text">${q(t)}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="button" data-adm-cred-copy>${g(`copy`,`adm-icon-sm`)} Copiar mensaje</button>
        <a class="adm-button adm-button--ghost" href="https://wa.me/?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${g(`message`,`adm-icon-sm`)} Abrir WhatsApp</a>
        <button class="adm-button adm-button--ghost" type="button" data-adm-cred-hide>Listo, ya lo mandé</button>
      </div>
      <p class="adm-note">Este PIN no queda guardado en la página: cuando tocás “Listo” desaparece. Si se pierde, resetealo.</p>
    </div>
  `}function lg(){let e=K.crear;return`
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${q(J(bn.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>
      <div class="adm-form-grid">
        <label class="adm-field" for="adm-crear-nombre">
          <span>Nombre</span>
          <input class="adm-input" id="adm-crear-nombre" name="nombre" autocomplete="off" maxlength="60" required placeholder="Ej. Sebastián" value="${q(e.nombre)}" data-adm-draft="crear" data-adm-key="nombre" />
        </label>
        <label class="adm-field" for="adm-crear-usuario">
          <span>Usuario <small>para entrar, sin espacios</small></span>
          <input class="adm-input" id="adm-crear-usuario" name="usuario" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="31" required placeholder="Ej. sebastian" value="${q(e.usuario)}" data-adm-draft="crear" data-adm-key="usuario" />
        </label>
        <label class="adm-field" for="adm-crear-rol">
          <span>Rol</span>
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${sg(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${q(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${q(Ze[e.rol]||e.rol)}:</strong> ${q(wh(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${g(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function ug(e){let t=!e.activo;return`
    <form class="adm-form adm-form--inline" data-adm-form="reset" data-adm-usuario="${q(e.usuario)}" novalidate aria-labelledby="adm-reset-title">
      <p id="adm-reset-title"><strong>${t?`Reactivar`:`Resetear el PIN de`} ${q(e.nombre)}.</strong> ${t?`Va a poder entrar de nuevo con este PIN.`:`Se cierra su sesión en todos lados y entra con el PIN nuevo.`}</p>
      <label for="adm-reset-pin"><span>PIN nuevo <small>6 a 8 números</small></span></label>
      <div class="adm-pin-row">
        <input class="adm-input" id="adm-reset-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${q(K.reset.pin)}" data-adm-draft="reset" data-adm-key="pin" />
        <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="reset">Generar</button>
      </div>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${t?`Reactivar`:`Guardar PIN nuevo`}</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-reset-cancel>Cancelar</button>
      </div>
    </form>
  `}function dg(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${q(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${q(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function fg(e,t){let n=e.usuario===t,r=K.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${eh(e.ultimoIngreso)} ${$m(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${eh(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
    <li class="adm-user-row ${e.activo?``:`is-off`}">
      <div class="adm-user-head">
        <strong>${q(e.nombre)}</strong>
        <span class="adm-muted">usuario: ${q(e.usuario)}</span>
        <span class="adm-pill adm-pill--neutral">${q(Ze[e.rol]||e.rol)}</span>
        ${e.activo?``:`<span class="adm-pill adm-pill--warning">Desactivado</span>`}
        ${n?`<span class="adm-pill adm-pill--ok">Sos vos</span>`:``}
      </div>
      <p class="adm-user-meta">${q(i)}${q(a)}</p>
      ${n?`
        <p class="adm-note">Tu PIN lo cambiás en <a class="adm-inline-link" href="/login" data-link>Cambiar mi PIN</a>. No podés cambiar tu propio rol ni desactivarte.</p>
      `:e.activo?`
        <div class="adm-user-actions">
          <div class="adm-role-change">
            <label for="adm-rol-${o}">Rol</label>
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${q(e.usuario)}">${sg(r)}</select>
            <button class="adm-button adm-button--ghost" type="button" data-adm-role-save="${q(e.usuario)}">Cambiar rol</button>
          </div>
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${q(e.usuario)}" aria-expanded="${G.resetFor===e.usuario}">Resetear PIN</button>
          <button class="adm-button adm-button--ghost adm-button--danger-ghost" type="button" data-adm-off="${q(e.usuario)}">Desactivar</button>
        </div>
      `:`
        <div class="adm-user-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${q(e.usuario)}" aria-expanded="${G.resetFor===e.usuario}">Reactivar con PIN nuevo</button>
        </div>
      `}
      ${!n&&G.resetFor===e.usuario?ug(e):``}
      ${!n&&G.confirmOff===e.usuario?dg(e):``}
    </li>
  `}function pg(){let e=ah().usuario,t=(G.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=G.users===null&&G.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:G.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>fg(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${G.users?`${Y(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${cg()}

      <div class="adm-form-actions">
        <button class="adm-button ${G.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${G.showCreate}" aria-controls="adm-create">
          ${g(G.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${G.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" id="adm-users-refresh" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${G.showCreate?lg():``}
      ${Ah(`users`)}
      ${r}

      <details class="adm-inner" data-adm-inner="roles-ayuda" ${G.openDogs.has(`roles-ayuda`)?`open`:``}>
        <summary>Qué puede ver cada rol</summary>
        <ul class="adm-role-help">
          ${Object.keys(Ze).map(e=>`<li><strong>${Ze[e]}:</strong> ${q(wh(e))}</li>`).join(``)}
        </ul>
      </details>
    </section>
  `}function mg(){let{conflicts:e,missing:t,notRouted:n}=Fh(),r=Ih();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${g(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${vn}).</p>
        </div>
      </header>

      ${e.length?`
        <div class="adm-table-wrap">
          <table class="adm-table adm-table--safety">
            <caption>Perros marcados “no juntar” que comparten turno</caption>
            <thead>
              <tr><th scope="col">Perros</th><th scope="col">Turno y ruta</th><th scope="col">Días</th></tr>
            </thead>
            <tbody>
              ${e.map(e=>`
                <tr>
                  <th scope="row">
                    ${q(e.a)} y ${q(e.b)}
                    ${[e.a,e.b].filter(e=>/día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(w.find(t=>t.name===e)?.review||``)).map(e=>`<span class="adm-row-note">Días de ${q(e)}: dato a revisar</span>`).join(``)}
                  </th>
                  <td>${q(e.shift)} · ${q(Rh(e.shift))}</td>
                  <td>${q(Jm(e.days))}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      `:`<p class="adm-empty">No hay perros “no juntar” que compartan turno en BASE RUTAS.</p>`}

      <ul class="adm-safety-list" aria-label="Indicaciones de seguridad por perro">
        ${r.map(e=>`
          <li>
            <strong>${q(e.name)}</strong>
            <span class="adm-safety-meta">${q(e.shifts.join(` y `))} · ${q(Jm(e.days))}</span>
            <span class="adm-safety-notes">${e.safety.map(e=>`<span class="adm-pill adm-pill--danger">${q(e)}</span>`).join(``)}</span>
          </li>
        `).join(``)}
      </ul>

      ${t.length||n.length?`
        <ul class="adm-footnotes">
          ${t.map(e=>`<li>${q(e.dog)} figura “no juntar con ${q(e.other)}”, pero ${q(e.other)} no está en el registro: ${x}.</li>`).join(``)}
          ${n.map(e=>`<li>${q(e.dog)} y ${q(e.other)} figuran “no juntar”. Hoy ${q(e.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join(``)}
        </ul>
      `:``}
    </section>
  `}function hg(e,t,{title:n,summary:r,iconName:i},a){return`
    <details class="adm-section" id="${e}" data-adm-section="${e}" ${t.has(e)?`open`:``}>
      <summary>
        <span class="adm-section-icon">${g(i,`adm-icon`)}</span>
        <span class="adm-section-title">
          <span class="adm-section-name">${n}</span>
          <span class="adm-section-summary">${r}</span>
        </span>
        <span class="adm-chevron">${g(`chevronDown`,`adm-icon-sm`)}</span>
      </summary>
      <div class="adm-section-body">
        ${a}
      </div>
    </details>
  `}function gg(e){let t=Lh().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return hg(`adm-datos`,e,{title:`Datos a revisar`,summary:`${Y(t.length,`perro`,`perros`)} · ${Y(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${q(yn.officialSources.dogs)}).</p>
    <ul class="adm-review-list">
      ${t.map(e=>`
        <li class="${e.status===`Activo`?``:`is-status`}">
          <div class="adm-review-head">
            <strong>${q(e.name)}</strong>
            <span class="adm-muted">${q(e.id)} · ${q(e.plan)}</span>
            <span class="adm-pill ${e.status===`Activo`?`adm-pill--neutral`:`adm-pill--warning`}">${q(e.status)}</span>
          </div>
          <p>${q(e.review||`Pendiente de confirmar`)}</p>
        </li>
      `).join(``)}
    </ul>
  `)}function _g(e){let t=Ph();return hg(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${q(t.busiest.length?J(t.busiest):`Sin datos`)} (${Y(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${vn}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-load">
        <caption class="adm-sr-only">Perros por día y turno</caption>
        <thead>
          <tr>
            <th scope="col">Día</th>
            <th scope="col">Mañana <span class="adm-th-sub">${S.manana.from} a ${S.manana.to}</span></th>
            <th scope="col">Tarde <span class="adm-th-sub">${S.tarde.from} a ${S.tarde.to}</span></th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          ${t.rows.map(e=>{let n=t.busiest.includes(e.day);return`
              <tr class="${n?`is-busiest`:``}">
                <th scope="row">
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${qm[e.day]}</span>
                  ${n?`<span class="adm-busiest">Más carga</span>`:``}
                </th>
                ${[e.morning,e.afternoon].map((e,n)=>`
                  <td>
                    <span class="adm-bar-cell">
                      <span class="adm-bar ${n?`adm-bar--tarde`:``}" style="--v:${(e/t.maxShift).toFixed(3)}" aria-hidden="true"></span>
                      <span class="adm-bar-value">${e}</span>
                    </span>
                  </td>
                `).join(``)}
                <td class="adm-total">${e.total?e.total:`—`}</td>
              </tr>
            `}).join(``)}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Semana</th>
            <td>${t.rows.reduce((e,t)=>e+t.morning,0)}</td>
            <td>${t.rows.reduce((e,t)=>e+t.afternoon,0)}</td>
            <td class="adm-total">${t.weekTotal}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <ul class="adm-footnotes">
      <li>“Total” suma las salidas del día. ${J(t.twoShifts.map(e=>e.name))} ${t.twoShifts.length===1?`sale`:`salen`} en los dos turnos, por eso cuentan dos veces.</li>
      <li>Mañana: ruta ${S.manana.route}, supervisa ${S.manana.supervisor}. Tarde: rutas ${S.tarde.routes.join(` y `)}, supervisa ${S.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${q(Dn.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function vg(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function yg(e){let t=Nh(),n=Ph(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${vn}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${vn}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...Dn,...i];return hg(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${vg(e.kind)}">${q(e.kind)}</span>
          <strong class="adm-fact-value">${q(e.value)}</strong>
          <span class="adm-fact-label">${q(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${q(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner" data-adm-inner="categorias" ${G.openDogs.has(`categorias`)?`open`:``}>
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(Tn).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${q(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var bg={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},xg=[{role:`Admin`,who:xn.admin,can:[`Ve y decide sobre todo el sistema`,`Usuarios, pagos e indicadores`,`Único rol que ve y carga pagos`]},{role:`Coordinador`,who:`${xn.coordinador} (${x.toLowerCase()})`,can:[`Armar rutas y horarios (plantilla semanal y cambios del día)`,`Gestionar los clientes de los paseos`,`Atender pedidos y cargar fichas`,`Avisar lo que pasa en cada barrio`,`No ve plata`]},{role:`Supervisor`,who:xn.supervisor,can:[`Controlar los paseos del momento`,`Quién falta retirar y atrasos contra el horario`,`Entregas, incidentes y equipo`,`Ve las rutas, no las arma`]},{role:`Paseador`,who:xn.paseador,can:[`Hacer su ruta del turno, en orden y con horario`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`]},{role:`Ayudante de paseador`,who:x,can:[`Acompañar al paseador en su ruta`,`Marcar pasos`,`Reportar incidentes`,`Sin datos de clientes`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function Sg(e){return hg(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${Y(bn.length,`persona`,`personas`)} · ${xg.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${bn.map(e=>{let t=bg[e.role];return`
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${q(e.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${q(e.label)}</span>
            </div>
            <p>${q(e.tasks)}</p>
            <p class="adm-person-panel">Panel: ${t?`<a href="${t.path}" data-link>${t.panel}</a>`:`<span class="adm-pending">${x}</span>`}</p>
          </li>
        `}).join(``)}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${xg.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${q(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${q(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function Cg(e){return hg(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${Sn.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${Mm.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${Sn.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${Mm.map(t=>`<td>${jn(e.prices[t])}</td>`).join(``)}
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Paseo suelto</h3>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Paseo suelto por tamaño</caption>
        <thead>
          <tr><th scope="col">Tipo</th>${Mm.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${Mm.map(e=>`<td>${jn(Cn[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${Mm.map(e=>`<td>${jn(Cn[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${wn.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${x.toLowerCase()}.</p>
  `)}function wg(e){let[t,n]=String(e).split(`-`).map(Number);if(!t||!n)return e;let r=new Intl.DateTimeFormat(`es-AR`,{month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(Date.UTC(t,n-1,15)));return r.charAt(0).toUpperCase()+r.slice(1)}function Tg(e){let t=String(e||``).replace(/[$\s]/g,``);return t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):/^\d{1,3}(\.\d{3})+$/.test(t)&&(t=t.replace(/\./g,``)),/^\d+(\.\d+)?$/.test(t)?Number(t):NaN}function Eg(){let e=y.cached(`pagos`,X(`pagos`)).slice().sort((e,t)=>String(t.fecha||``).localeCompare(String(e.fecha||``))||String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),t=b().slice(0,7),n=[...new Set([t,...e.map(e=>String(e.fecha||``).slice(0,7)).filter(e=>/^\d{4}-\d{2}$/.test(e))])].sort().reverse(),r=G.pagosMes&&(G.pagosMes===`todos`||n.includes(G.pagosMes))?G.pagosMes:t,i=r===`todos`?e:e.filter(e=>String(e.fecha||``).startsWith(r)),a=e.filter(e=>!e.pasadoAlLibro),o=i.reduce((e,t)=>e+(Number(t.monto)||0),0),s=e.filter(e=>{let t=G.users?.find(t=>t.usuario===e.creadoPor)?.rol;return t&&t!==`admin`}),c=i.filter(e=>!e.comprobanteId);return{all:e,months:n,mes:r,filtered:i,faltan:a,faltanMes:i.filter(e=>!e.pasadoAlLibro),total:o,deOtros:s,sinComprobanteMes:c}}function Dg(e){let t=G.users?.find(t=>t.usuario===e.creadoPor),n=t&&t.rol!==`admin`,r=Number(e.monto),i=e.monto!==``&&e.monto!==null&&e.monto!==void 0&&Number.isFinite(r);return`
    <li class="adm-pago ${e.pasadoAlLibro?``:`is-missing`}">
      <div class="adm-pago-main">
        <span class="adm-pago-date">${q(th(e.fecha)||eh(e.creadoEn)||`Pendiente de confirmar`)}</span>
        <strong class="adm-pago-concept">${q(e.concepto||`Sin concepto`)}</strong>
        <span class="adm-pago-amount">${i?q(jn(r)):x}</span>
      </div>
      <div class="adm-pago-meta">
        <span class="adm-pill adm-pill--neutral">${q(e.medio||`Medio sin indicar`)}</span>
        <span class="adm-pill ${e.pasadoAlLibro?`adm-pill--ok`:`adm-pill--warning`}">${e.pasadoAlLibro?`Pasado al Libro`:`Falta pasar al Libro`}</span>
        ${e.comprobanteId?`<span class="adm-pill adm-pill--ok">${g(`fileCheck`,`adm-icon-xs`)} Con comprobante</span>`:`<span class="adm-pill adm-pill--neutral adm-pill--dashed">Sin comprobante</span>`}
        ${e.pendiente?`<span class="adm-pill adm-pill--info">Se enviará cuando haya señal</span>`:``}
        ${n?`<span class="adm-pill adm-pill--info">Lo cargó ${q(Ze[t.rol]||t.rol)} antes del cambio</span>`:``}
      </div>
      ${Yh(e,!0)?`<p class="adm-note">${q(Yh(e,!0))}.</p>`:``}
      <div class="adm-pago-actions">
        ${e.comprobanteId?`
          <button class="adm-button adm-button--ghost adm-button--sm" type="button" data-adm-archivo-abrir="${q(e.comprobanteId)}" data-adm-area="pagos">
            ${g(`eye`,`adm-icon-sm`)} Ver comprobante
          </button>
        `:e.pendiente?``:`
          <label class="adm-button adm-button--ghost adm-button--sm adm-file-button">
            ${g(`fileUp`,`adm-icon-sm`)} Adjuntar comprobante
            <input class="adm-file-input" type="file" accept="${Vm}" data-adm-pago-adjuntar="${q(e.id)}" aria-label="Adjuntar comprobante a ${q(e.concepto||`este pago`)}" />
          </label>
        `}
        <button class="adm-link-button" type="button" data-adm-pago-libro="${q(e.id)}" aria-pressed="${e.pasadoAlLibro?`true`:`false`}">
          ${e.pasadoAlLibro?`Desmarcar “pasado al Libro”`:`Marcar como pasado al Libro`}
        </button>
      </div>
    </li>
  `}function Og(){let e=K.pagoArchivo,t=ih();return`
    <fieldset class="adm-file-field" aria-describedby="adm-pago-archivo-ayuda">
      <legend>Comprobante <small>opcional · foto o PDF, hasta 3,5 MB</small></legend>
      ${e?`
        <p class="adm-file-chosen" id="adm-pago-archivo-elegido">
          ${g(e.type===`application/pdf`?`fileText`:`camera`,`adm-icon-sm`)}
          <span><strong>${q(e.name||`Comprobante`)}</strong>${nh(e.size)?` · ${q(nh(e.size))}`:``}${K.pagoSubido?` · ya subido`:``}</span>
          <button class="adm-link-button" id="adm-pago-archivo-quitar" type="button" data-adm-pago-quitar>Quitar</button>
        </p>
      `:`
        <div class="adm-file-choices">
          <label class="adm-button adm-button--ghost adm-file-button">
            ${g(`camera`,`adm-icon-sm`)} Sacar foto
            <input class="adm-file-input" id="adm-pago-foto" type="file" accept="image/*" capture="environment" data-adm-pago-archivo />
          </label>
          <label class="adm-button adm-button--ghost adm-file-button">
            ${g(`fileUp`,`adm-icon-sm`)} Elegir foto o PDF
            <input class="adm-file-input" id="adm-pago-archivo" type="file" accept="${Vm}" data-adm-pago-archivo />
          </label>
        </div>
      `}
      <p class="adm-note" id="adm-pago-archivo-ayuda">${t?`Sin señal no se pueden subir archivos (no quedan en espera). Guardá el pago sin comprobante y adjuntalo desde la lista cuando vuelva la señal.`:`Sirve una captura de la transferencia de Naranja X o una foto del recibo. Lo ves solo vos.`}</p>
    </fieldset>
  `}function kg(e){let t=Eg(),n=K.pago,r=t.filtered.slice(0,20),i=t.mes===`todos`?`todos los meses`:wg(t.mes).toLowerCase();return hg(`adm-pagos`,e,{title:`Pagos · registro de apoyo`,summary:t.faltan.length?`${Y(t.faltan.length,`pago falta`,`pagos faltan`)} pasar al Libro contable`:`Nada pendiente de pasar al Libro contable`,iconName:`receipt`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: ${zm}</strong>
        <p>Esto es un registro de apoyo para no olvidarte de nada: cada pago se tiene que pasar al Libro contable. Solo el admin lo ve y lo carga.</p>
      </div>
    </div>

    <form class="adm-form" id="adm-pago-form" data-adm-form="pago" novalidate aria-labelledby="adm-pago-title">
      <h3 id="adm-pago-title">Cargar un pago</h3>
      <div class="adm-form-grid">
        <label class="adm-field" for="adm-pago-fecha">
          <span>Fecha</span>
          <input class="adm-input" id="adm-pago-fecha" type="date" required value="${q(n.fecha)}" data-adm-draft="pago" data-adm-key="fecha" />
        </label>
        <label class="adm-field" for="adm-pago-monto">
          <span>Monto <small>en pesos</small></span>
          <input class="adm-input" id="adm-pago-monto" inputmode="decimal" autocomplete="off" maxlength="15" required placeholder="Ej. 35000" value="${q(n.monto)}" data-adm-draft="pago" data-adm-key="monto" />
        </label>
        <label class="adm-field" for="adm-pago-concepto">
          <span>Concepto</span>
          <input class="adm-input" id="adm-pago-concepto" autocomplete="off" maxlength="120" required placeholder="Ej. Plan 2, semana del 09/11" value="${q(n.concepto)}" data-adm-draft="pago" data-adm-key="concepto" />
        </label>
        <label class="adm-field" for="adm-pago-medio">
          <span>Medio <small>elegí o escribí</small></span>
          <input class="adm-input" id="adm-pago-medio" list="adm-pago-medios" autocomplete="off" maxlength="40" placeholder="Ej. Efectivo" value="${q(n.medio)}" data-adm-draft="pago" data-adm-key="medio" />
          <datalist id="adm-pago-medios">${Rm.map(e=>`<option value="${q(e)}"></option>`).join(``)}</datalist>
        </label>
      </div>
      ${Og()}
      <label class="adm-check" for="adm-pago-libro">
        <input id="adm-pago-libro" type="checkbox" ${n.pasadoAlLibro?`checked`:``} data-adm-draft="pago" data-adm-key="pasadoAlLibro" />
        <span>Ya lo pasé al Libro contable</span>
      </label>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" id="adm-pago-guardar" type="submit" aria-disabled="${G.savingPago}">
          ${g(`plus`,`adm-icon-sm`)} ${G.savingPago?K.pagoArchivo&&!K.pagoSubido?`Subiendo el comprobante…`:`Guardando…`:`Guardar pago`}
        </button>
      </div>
    </form>
    ${Ah(`pagos`)}

    <div class="adm-pagos-head">
      <label class="adm-field adm-field--inline" for="adm-pagos-mes">
        <span>Mes</span>
        <select class="adm-input adm-input--sm" id="adm-pagos-mes" data-adm-pagos-mes>
          ${t.months.map(e=>`<option value="${e}" ${e===t.mes?`selected`:``}>${q(wg(e))}</option>`).join(``)}
          <option value="todos" ${t.mes===`todos`?`selected`:``}>Todos los meses</option>
        </select>
      </label>
      ${t.filtered.length?`
        <p class="adm-pagos-summary">
          <strong>${Y(t.filtered.length,`pago`,`pagos`)}</strong> en ${q(i)} · suma ${q(jn(t.total))} ·
          <strong class="${t.faltanMes.length?`adm-text-warning`:``}" data-adm-pagos-faltan>${t.faltanMes.length} sin pasar al Libro</strong>${t.mes!==`todos`&&t.faltan.length!==t.faltanMes.length?` (${t.faltan.length} contando todos los meses)`:``}${t.sinComprobanteMes.length?` · ${t.sinComprobanteMes.length} sin comprobante`:``}
        </p>
      `:t.faltan.length?`
        <p class="adm-pagos-summary"><strong class="adm-text-warning" data-adm-pagos-faltan>${Y(t.faltan.length,`pago`,`pagos`)} de otros meses sin pasar al Libro.</strong> Elegí “Todos los meses” para verlos.</p>
      `:``}
    </div>
    ${t.deOtros.length?`<p class="adm-note">${t.deOtros.length===1?`1 pago lo cargó`:`${t.deOtros.length} pagos los cargó`} otro rol antes del cambio de roles (el coordinador ya no ve plata). Se ven acá con la marca “antes del cambio”.</p>`:``}
    ${r.length?`
      <ul class="adm-pago-list" aria-label="Pagos de ${q(i)}">${r.map(Dg).join(``)}</ul>
      ${t.filtered.length>r.length?`<p class="adm-note">Se muestran los últimos ${r.length}. Hay ${Y(t.filtered.length-r.length,`pago más`,`pagos más`)} en ${q(i)}.</p>`:``}
    `:`<p class="adm-empty">No hay pagos cargados en ${q(i)}. Cargalos con el formulario de arriba cuando te paguen.</p>`}
    ${t.filtered.length?`<p class="adm-note">La suma es solo de este registro de apoyo: no reemplaza al Libro contable.</p>`:``}
  `)}var Ag={drive:`En tu Google Drive`,vercel:`Guardado en Vercel (provisorio)`,local:`Guardado en el servidor de prueba`};function jg(){let e=y.cached(`archivos`,X(`archivos`)).slice().sort(rh),t=G.archivosTipo!==`todos`&&Bm[G.archivosTipo]?G.archivosTipo:`todos`;return{all:e,tipo:t,filtered:t===`todos`?e:e.filter(e=>e.tipo===t),counts:Object.fromEntries(Object.keys(Bm).map(t=>[t,e.filter(e=>e.tipo===t).length])),enVercel:e.filter(e=>e.ubicacion===`vercel`).length,enPrueba:e.filter(e=>e.ubicacion===`local`).length,nuevos:e.filter(e=>Date.now()-Date.parse(e.creadoEn||``)<Um)}}function Mg(e){let t=[];if((e.perroNombre||e.perroId)&&t.push(`Perro: ${e.perroNombre||e.perroId}${e.perroNombre&&e.perroId?` (${e.perroId})`:``}`),e.clienteId){let n=y.cached(`clientes`,X(`clientes`)).find(t=>t.id===e.clienteId);t.push(`Cliente: ${n?.nombre||e.clienteId}`)}if(e.pedidoId){let n=y.cached(`pedidos`,X(`pedidos`)).find(t=>t.id===e.pedidoId),r=n?{nuevo:`nuevo`,"en-curso":`en curso`,resuelto:`resuelto`}[n.estado||`nuevo`]||n.estado:``;t.push(n?`Pedido: ${n.titulo||n.tipo||`sin título`}${r?` (${r})`:``}`:`Pedido del formulario web`)}let n=Ng(e);return n&&t.push(`Pago: ${n.concepto||`sin concepto`}${n.fecha?` del ${th(n.fecha)}`:``}`),t}function Ng(e){return e.tipo===`comprobante de pago`&&y.cached(`pagos`,X(`pagos`)).find(t=>t.comprobanteId===e.id)||null}function Pg(e){let t=Bm[e.tipo]||{label:e.tipo||`Archivo`,tone:`neutral`},n=Mg(e),r=e.creadoPorNombre||Jh(e.creadoPor)||``,i=e.creadoEn?`${eh(e.creadoEn)} a las ${$m(e.creadoEn)}`:th(e.fecha),a=Date.now()-Date.parse(e.creadoEn||``)<Um,o=Ag[e.ubicacion]||`Lugar de guardado sin indicar`,s=e.mime===`application/pdf`?`PDF`:/^image\//.test(e.mime||``)?`Foto`:``,c=`${t.label}${e.perroNombre?` de ${e.perroNombre}`:``}`,l=/^https:\/\//i.test(e.driveUrl||``)?e.driveUrl:``;return`
    <li class="adm-archivo adm-archivo--${t.tone}">
      <div class="adm-archivo-head">
        <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}</span>
        ${a?`<span class="adm-pill adm-pill--info">Nuevo</span>`:``}
        <strong class="adm-archivo-title">${q(e.perroNombre||Ng(e)?.concepto||e.nombreOriginal||e.nombreArchivo||t.label)}</strong>
      </div>
      <p class="adm-archivo-links">${n.length?q(n.join(` · `)):`Sin vincular a un perro, cliente o pedido.`}</p>
      <p class="adm-note">${e.creadoPor===`web`?`Llegó por el formulario de la web`:`Subido por ${q(r||`alguien sin nombre`)}`}${i?` el ${q(i)}`:``}${s?` · ${s}`:``}${nh(e.tamano)?` · ${q(nh(e.tamano))}`:``}</p>
      <div class="adm-archivo-foot">
        <span class="adm-archivo-where ${e.ubicacion===`drive`?`is-drive`:`is-temp`}">
          ${g(e.ubicacion===`drive`?`checkCircle`:`database`,`adm-icon-sm`)}
          ${e.ubicacion===`drive`&&l?`<a class="adm-inline-link" href="${q(l)}" target="_blank" rel="noopener noreferrer">${o}<span class="adm-sr-only"> (se abre en otra pestaña)</span></a>`:q(o)}
        </span>
        <button class="adm-button adm-button--ghost adm-button--sm" type="button" data-adm-archivo-abrir="${q(e.id)}" data-adm-area="archivos" aria-label="Abrir ${q(c)}">
          ${g(`eye`,`adm-icon-sm`)} Abrir
        </button>
      </div>
    </li>
  `}function Fg(e){let t=jg(),n=t.filtered.slice(0,Wm),r=t.tipo===`todos`?``:` de tipo “${Bm[t.tipo].label.toLowerCase()}”`;return hg(`adm-archivos`,e,{title:`Archivos recibidos`,summary:t.all.length?`${Y(t.all.length,`archivo`,`archivos`)}${t.nuevos.length?` · ${Y(t.nuevos.length,`nuevo`,`nuevos`)} en las últimas 24 h`:``}`:`Todavía no llegó ningún archivo`,iconName:`fileUp`},`
    <p class="adm-lead">Carnets de vacunas, comprobantes y documentos que manda la gente desde el formulario de la web o que sube el equipo. Cada uno dice a qué perro, cliente o pedido corresponde. Los comprobantes de pago los abrís solo vos.</p>
    ${ih()?`<p class="adm-msg is-error">Sin señal: ves la lista que ya tenías. Para abrir o subir archivos hace falta señal.</p>`:``}
    ${t.enVercel||t.enPrueba?`
      <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>${J([t.enVercel?`${t.enVercel===1?`1 archivo está guardado`:`${t.enVercel} archivos están guardados`} en Vercel (provisorio)`:``,t.enPrueba?`${t.enPrueba===1?`1 archivo está`:`${t.enPrueba} archivos están`} en el servidor de prueba`:``].filter(Boolean))}. Cuando se conecte la planilla, los archivos nuevos van a ir a tu Google Drive; los que ya llegaron quedan donde están.</span></p>
    `:``}
    ${t.all.length?`
      <div class="adm-pagos-head">
        <label class="adm-field adm-field--inline" for="adm-archivos-tipo">
          <span>Tipo</span>
          <select class="adm-input adm-input--sm" id="adm-archivos-tipo" data-adm-archivos-tipo>
            <option value="todos" ${t.tipo===`todos`?`selected`:``}>Todos (${t.all.length})</option>
            ${Object.entries(Bm).map(([e,n])=>`<option value="${q(e)}" ${t.tipo===e?`selected`:``}>${q(n.label)} (${t.counts[e]})</option>`).join(``)}
          </select>
        </label>
      </div>
    `:``}
    ${Ah(`archivos`)}
    ${n.length?`
      <ul class="adm-archivo-list" aria-label="Archivos recibidos${q(r)}">${n.map(Pg).join(``)}</ul>
      ${t.filtered.length>n.length?`<p class="adm-note">Se muestran los últimos ${n.length}. Hay ${Y(t.filtered.length-n.length,`archivo más`,`archivos más`)}${q(r)}.</p>`:``}
    `:t.all.length?`
      <p class="adm-empty">No hay archivos${q(r)}. Elegí “Todos” para ver el resto.</p>
    `:`
      <p class="adm-empty">Todavía no llegó ningún archivo. Aparecen acá cuando un tutor manda el carnet desde el formulario de la web, cuando el equipo sube uno o cuando adjuntás un comprobante a un pago.</p>
    `}
  `)}var Ig=[[`activo`,`Activos`],[`pausa`,`En pausa`],[`baja`,`Baja`]];function Lg(){let e=y.cached(`clientes`,X(`clientes`)),t=new Map;e.forEach(e=>{let n=String(e.barrio||``).trim()||`Sin barrio`;t.has(n)||t.set(n,{barrio:n,activo:0,pausa:0,baja:0,otro:0});let r=t.get(n),i=String(e.estado||``).toLowerCase();Ig.some(([e])=>e===i)?r[i]+=1:r.otro+=1});let n=[...t.values()].sort((e,t)=>t.activo-e.activo||e.barrio.localeCompare(t.barrio)),r={activo:0,pausa:0,baja:0,otro:0};return n.forEach(e=>Object.keys(r).forEach(t=>{r[t]+=e[t]})),{total:e.length,rows:n,totals:r}}function Rg(e){let t=Lg(),n=t.totals.otro>0;return hg(`adm-clientes`,e,{title:`Clientes por barrio`,summary:t.total?`${Y(t.totals.activo,`activo`,`activos`)} · ${t.totals.pausa} en pausa · ${t.totals.baja} de baja`:`Todavía no hay clientes cargados en la app`,iconName:`mapPin`},`
    <p class="adm-lead">Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>
    ${t.total?`
      <div class="adm-table-wrap">
        <table class="adm-table adm-clients">
          <caption class="adm-sr-only">Clientes por barrio y estado</caption>
          <thead>
            <tr><th scope="col">Barrio</th>${Ig.map(([,e])=>`<th scope="col">${e}</th>`).join(``)}${n?`<th scope="col">Sin estado</th>`:``}</tr>
          </thead>
          <tbody>
            ${t.rows.map(e=>`
              <tr><th scope="row">${q(e.barrio)}</th>${Ig.map(([t])=>`<td>${e[t]}</td>`).join(``)}${n?`<td>${e.otro}</td>`:``}</tr>
            `).join(``)}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total</th>${Ig.map(([e])=>`<td>${t.totals[e]}</td>`).join(``)}${n?`<td>${t.totals.otro}</td>`:``}</tr>
          </tfoot>
        </table>
      </div>
    `:`<p class="adm-empty">El coordinador todavía no cargó clientes en la app.</p>`}
  `)}function zg(e){let t=Vh();return hg(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${q(yn.officialSources.money)}. Esta sección no muestra montos cobrados: los pagos que anotes de apoyo están en <a class="adm-inline-link" href="#adm-pagos" data-adm-goto="adm-pagos">Pagos</a>.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${jn(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${Y(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${jn(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${jn(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${Y(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${x.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${q(e)}: ${J(t.excluded.filter(t=>t.plan===e).map(e=>q(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function Bg(){let e=yn.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${vn}.</strong> Perros: ${q(e.dogs)}. Rutas: ${q(e.routes)}. Plata: ${q(e.money)}.</p>
      <p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${zm}.</p>
    </footer>
  `}function Vg(){let{dayName:e,date:t}=Ym(),n=_h(),r=Bh(n),i=Xm(),a=r.find(e=>!i.includes(e.id)),o=Ph(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,`Perros atrasados (más de ${Lm} min sin retiro): ${n.late.length}. Avisos por barrio vigentes: ${n.avisos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${J(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${vn}.`].join(`
`)}async function Hg(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function Ug(e){Gm=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=Gm)},60)}function Wg(){Zm(Am,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function Gg(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,Wg());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function Kg(e){return e.target.closest(`[data-admin-logout]`)?(G.credential=null,G.users=null,G.usersError=``,G.liveDay=null,G.adminLoaded=!1,G.pagosMes=null,G.archivosTipo=`todos`,K.pago=Km(),K.pagoArchivo=null,K.pagoSubido=null,l_(`/salir`),!0):!1}function qg(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function Jg(e,t){G.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function Yg(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),G.busy))return;let n=t.dataset.admForm;if(n===`pago`)await Xg();else if(n===`crear`){let e=K.crear,n=e.nombre.trim(),r=Eh(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?G.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:Ze[e.rol]?Dh(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Z(`users`,a,!0),Q();return}Jg(t,!0);try{let t=await $e.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});G.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},K.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},G.showCreate=!1,Z(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),G.busy=!1,await Th(),qg(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),G.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=G.users?.find(t=>t.usuario===e),r=K.reset.pin.trim(),i=n?Dh(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}Jg(t,!0);try{let t=!n.activo;await $e.save({usuario:e,pin:r,...t?{activo:!0}:{}}),G.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},G.resetFor=null,K.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),G.busy=!1,await Th(),qg(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),G.busy=!1,Q()}}}async function Xg(){let e=K.pago,t=e.concepto.trim(),n=e.medio.trim(),r=Tg(e.monto),i=K.pagoArchivo,a=``;if(/^\d{4}-\d{2}-\d{2}$/.test(e.fecha)?t.length<2?a=`Escribí el concepto (por ejemplo, el plan y la semana).`:!Number.isFinite(r)||r<=0?a=`Escribí el monto en pesos, solo números (por ejemplo 35000).`:i&&!K.pagoSubido&&ih()&&(a=`Sin señal no se puede subir el comprobante (los archivos no quedan en espera). Tocá “Quitar” para guardar el pago sin comprobante y adjuntarlo después, o esperá a tener señal.`):a=`Elegí la fecha del pago.`,a){Z(`pagos`,a,!0),Q();return}G.busy=!0,G.savingPago=!0;let o=K.pagoSubido?.id||``;if(i&&!o){Z(`pagos`,`Subiendo el comprobante…`),Q();try{let e=await dt.subir(`comprobante de pago`,i);o=e.id,K.pagoSubido={id:e.id}}catch(e){Z(`pagos`,`No se pudo subir el comprobante: ${e.message||`error del servidor.`} El pago todavía no se guardó: probá de nuevo o tocá “Quitar” para guardarlo sin comprobante.`,!0),G.busy=!1,G.savingPago=!1,Q();return}}try{let i=await y.save(`pagos`,{fecha:e.fecha,concepto:t,monto:r,medio:n,pasadoAlLibro:e.pasadoAlLibro===!0,...o?{comprobanteId:o}:{}});K.pago=Km(),K.pagoArchivo=null,K.pagoSubido=null,G.pagosMes=e.fecha.slice(0,7);let a=o?` con su comprobante`:``;Z(`pagos`,i.pendiente?`Se enviará cuando haya señal. Queda anotado en este dispositivo${a?` (el comprobante ya se subió)`:``}.`:`Listo: pago de ${jn(r)} guardado${a}${e.pasadoAlLibro?``:`. Acordate de pasarlo al Libro contable`}.`)}catch(e){Z(`pagos`,`${e.message||`No se pudo guardar el pago.`}${o?` El comprobante ya se subió: al tocar “Guardar pago” de nuevo no se sube otra vez.`:``}`,!0)}finally{G.busy=!1,G.savingPago=!1,Q()}}function Zg(e){let t=e.files?.[0];e.value=``,t&&(Hm.test(t.type)?t.type===`application/pdf`&&t.size>3670016?(Z(`pagos`,`El PDF es muy pesado (máximo 3,5 MB). Probá con una captura de pantalla.`,!0),Q()):(K.pagoArchivo=t,K.pagoSubido=null,Z(`pagos`,`Comprobante elegido: ${t.name||`archivo`}. Se sube al tocar “Guardar pago”.`),Q(),qg(`#adm-pago-archivo-quitar`)):(Z(`pagos`,`Ese archivo no sirve: solo fotos (JPG, PNG, WEBP) o PDF.`,!0),Q()))}async function Qg(e){let t=e.dataset.admPagoAdjuntar,n=e.files?.[0];e.value=``;let r=y.cached(`pagos`,X(`pagos`)).find(e=>e.id===t);if(!n||!r)return;let i=`${r.concepto||`el pago`}${r.fecha?` del ${th(r.fecha)}`:``}`,a=``;if(G.busy?a=`Esperá a que termine lo que se está guardando y probá de nuevo.`:Hm.test(n.type)?ih()&&(a=`Sin señal no se puede subir el comprobante (los archivos no quedan en espera). Probá cuando vuelva la señal.`):a=`Ese archivo no sirve: solo fotos (JPG, PNG, WEBP) o PDF.`,a){Z(`pagos`,a,!0),Q();return}G.busy=!0,Z(`pagos`,`Subiendo el comprobante de ${i}…`),Q();let o=null;try{o=await dt.subir(`comprobante de pago`,n),Z(`pagos`,(await y.save(`pagos`,{id:t,fecha:r.fecha,comprobanteId:o.id})).pendiente?`El comprobante se subió. El cambio del pago se enviará cuando haya señal.`:`Listo: ${i} ya tiene su comprobante.`)}catch(e){Z(`pagos`,`${o?`El comprobante se subió pero no se pudo vincular al pago`:`No se pudo subir el comprobante`}: ${e.message||`error del servidor.`}`,!0)}finally{G.busy=!1,Q(),qg(o?`.adm-pago [data-adm-archivo-abrir="${CSS.escape(o.id)}"]`:`[data-adm-pago-adjuntar="${CSS.escape(t)}"]`)}}function $g(e){let t=e.dataset.admArchivoAbrir,n=G.msgs[e.dataset.admArea]===void 0?`archivos`:e.dataset.admArea;ih()?(Z(n,`Sin señal no se puede abrir el archivo. Probá cuando vuelva la señal.`,!0),Q()):dt.abrir(t).catch(e=>{let t=e.status===403?`Tu usuario no puede abrir este archivo. Los comprobantes de pago los abre solo el admin.`:e.status===404?`No se encontró el archivo guardado. Puede que lo hayan borrado de Drive.`:`No se pudo abrir el archivo: ${e.message||`error del servidor.`}`;Z(n,t,!0),Q()})}async function e_(e){let t=y.cached(`pagos`,X(`pagos`)).find(t=>t.id===e);if(!t||G.busy)return;G.busy=!0;let n=!t.pasadoAlLibro;try{let r=await y.save(`pagos`,{id:e,fecha:t.fecha,pasadoAlLibro:n}),i=`${t.concepto||`El pago`}${t.fecha?` del ${th(t.fecha)}`:``}`;Z(`pagos`,r.pendiente?`Se enviará cuando haya señal.`:n?`Listo: ${i} quedó como pasado al Libro.`:`Listo: ${i} quedó como pendiente de pasar al Libro.`)}catch(e){Z(`pagos`,e.message||`No se pudo cambiar la marca.`,!0)}finally{G.busy=!1,Q(),qg(`[data-adm-pago-libro="${CSS.escape(e)}"]`)}}async function t_(e,t,n){if(!G.busy){G.busy=!0;try{await e(),Z(`users`,t),G.busy=!1,await Th()}catch(e){Z(`users`,e.message||n,!0),G.busy=!1,Q()}}}function n_(e){if(e.target.closest(`[data-adm-create-toggle]`))return G.showCreate=!G.showCreate,G.resetFor=null,G.confirmOff=null,$(),qg(G.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return G.usersError=``,Th().then(()=>{G.usersError||(Z(`users`,`Lista de usuarios actualizada.`),Q())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;K[e].pin=Oh();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=K[e].pin),Ug(`PIN generado: ${K[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=G.users?.find(t=>t.usuario===e);if(!t)return!0;let r=K.roles[e]||t.rol;return r===t.rol?(Z(`users`,`${t.nombre} ya tiene el rol ${Ze[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Q(),!0):(t_(async()=>{await $e.save({usuario:e,rol:r}),delete K.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${Ze[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return G.resetFor=G.resetFor===e?null:e,G.confirmOff=null,K.reset.pin=``,$(),G.resetFor&&qg(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=G.resetFor||``;return G.resetFor=null,K.reset.pin=``,$(),qg(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return G.confirmOff=i.dataset.admOff,G.resetFor=null,$(),qg(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=G.confirmOff||``;return G.confirmOff=null,$(),qg(`[data-adm-off="${CSS.escape(e)}"]`),Ug(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=G.users?.find(t=>t.usuario===e);return G.confirmOff=null,t_(()=>$e.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}if(e.target.closest(`[data-adm-cred-copy]`))return G.credential&&Hg(kh(G.credential)).then(e=>{Ug(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0;if(e.target.closest(`[data-adm-cred-hide]`))return G.credential=null,$(),qg(`#adm-usuarios`),Ug(`Listo. El PIN ya no se muestra.`),!0;if(e.target.closest(`[data-adm-live-refresh]`))return xh(!0),!0;let o=e.target.closest(`[data-adm-pago-libro]`);if(o)return e_(o.dataset.admPagoLibro),!0;let s=e.target.closest(`[data-adm-archivo-abrir]`);return s?($g(s),!0):e.target.closest(`[data-adm-pago-quitar]`)?(K.pagoArchivo=null,K.pagoSubido=null,Z(`pagos`,`Comprobante quitado. El pago se guarda sin comprobante.`),Q(),qg(`#adm-pago-archivo`),!0):!1}function r_(e){if(e.target.matches?.(`[data-adm-pago-archivo], [data-adm-pago-adjuntar]`)){if(e.type!==`change`)return;e.target.dataset.admPagoAdjuntar===void 0?Zg(e.target):Qg(e.target);return}let t=e.target.closest?.(`[data-adm-archivos-tipo]`);if(t){e.type===`change`&&G.archivosTipo!==t.value&&(G.archivosTipo=t.value,Q(),Ug(t.value===`todos`?`Se muestran todos los archivos.`:`Se muestran los archivos de tipo ${(Bm[t.value]?.label||t.value).toLowerCase()}.`));return}let n=e.target.closest?.(`[data-adm-pagos-mes]`);if(n){e.type===`change`&&G.pagosMes!==n.value&&(G.pagosMes=n.value,Q(),Ug(`Pagos de ${n.value===`todos`?`todos los meses`:wg(n.value).toLowerCase()}.`));return}let r=e.target.closest?.(`[data-adm-draft]`);if(!r)return;let i=r.dataset.admDraft,a=r.dataset.admKey,o=r.type===`checkbox`?r.checked:r.value;if(i===`roles`?K.roles[a]=o:K[i][a]=o,i===`crear`&&a===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${q(Ze[r.value]||r.value)}:</strong> ${q(wh(r.value))}`)}}function i_(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=Xm(),r=n.includes(e);return Zm(km,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),Ug(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),Gg(n.dataset.admGoto),!0;if(n_(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),Wg(),Ug(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(Hg(Vg()).then(e=>{Ug(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function a_(e){if(e.target.matches?.(`[data-adm-section]`)&&Wg(),e.target.matches?.(`[data-adm-dogs], [data-adm-inner]`)){let t=e.target.dataset.admDogs||e.target.dataset.admInner;e.target.open?G.openDogs.add(t):G.openDogs.delete(t)}}function o_(){fe.push(Kg),me.push(i_),document.addEventListener(`toggle`,a_,!0),document.addEventListener(`submit`,Yg),document.addEventListener(`input`,r_),document.addEventListener(`change`,r_),Je(e=>{(Fm.includes(e)||Im.includes(e))&&Q()}),setInterval(()=>{if(!sh()||v.user()?.rol!==`admin`||document.visibilityState!==`visible`)return;let e=vh(_h());e!==G.lateSignature&&(G.lateSignature=e,Q())},3e4),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var s_=document.querySelector(`#app`);function c_(e){return e.replace(/\/+$/,``)||`/`}function l_(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}));return}let n=c_(t.split(`?`)[0])!==c_(window.location.pathname);window.history.pushState({},``,t),e.menuOpen=!1,$(),n&&window.scrollTo({top:0,behavior:`instant`})}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),ve(),_n(),dr(),xr(),Li(),Qo(),eu(),Om(),o_(),document.addEventListener(`click`,e=>{if(he(fe,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),l_(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{he(pe,e)});function $(){let e=c_(window.location.pathname);if(e===`/`){s_.innerHTML=Tt(),d_();return}if(e===`/precios`){s_.innerHTML=Jn(),d_();return}if(e===`/tienda`){s_.innerHTML=sr(),d_();return}if(e===`/login`){s_.innerHTML=hr(),d_();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),v.clear(),s_.innerHTML=hr(),d_();return}if(e===`/registro`||e===`/register`){s_.innerHTML=_r(),d_();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(s_.innerHTML=u_(r),d_()):(s_.innerHTML=ce(),d_())}function u_(e){if(e===`cliente`)return f_(e);let t=v.user();return t?(Xe[t.rol]||[]).includes(e)?f_(e):vr(e):(window.history.replaceState({},``,`/login?volver=/${e}`),hr())}function d_(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=le()+de(),document.body.classList.toggle(`menu-locked`,e.menuOpen),Le(),Ie()}function f_(e){let n=t[e],r=e===`cliente`,a=e===`paseador`,o=e===`supervisor`,s={admin:Wh,coordinador:kp,supervisor:gl,paseador:uo,cliente:ci}[e]();return a?lo(s):o?ml(s):e===`coordinador`?Dp(s):e===`admin`?Hh(s):ne(`
    <main class="dashboard ${r?`dashboard-client`:``}">
      ${r?``:`
        <aside class="sidebar reveal">
          <p class="eyebrow">Perfil activo</p>
          <h1>${n.label}</h1>
          <p>${n.intent}</p>
          <div class="permission-list">
            ${i.map(([t,n])=>`
              <div class="${t.toLowerCase()===e?`selected`:``}">
                <strong>${t}</strong>
                <small>${n}</small>
              </div>
            `).join(``)}
          </div>
        </aside>
      `}
      <section class="dashboard-content reveal">
        ${s}
      </section>
    </main>
    ${r?oe():``}
  `,e)}Pe(),Je(e=>{e===`sesion`&&$()}),v.user()&&(v.refresh().catch(()=>{}),at()),Ae(()=>Ie()),$(),document.addEventListener(`click`,e=>{he(me,e)});