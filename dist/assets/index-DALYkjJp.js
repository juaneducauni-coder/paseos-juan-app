(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={menuOpen:!1,chatOpen:!1,revealObserver:void 0},t={admin:{label:`Admin`,route:`/admin`,legacyRoute:`/dashboard/admin`,intent:`Control total del negocio, permisos, usuarios, finanzas y configuracion.`},coordinador:{label:`Coordinador`,route:`/coordinador`,legacyRoute:`/dashboard/coordinador`,intent:`Gestion operativa diaria, asignaciones, rutas, agenda y comunicacion.`},supervisor:{label:`Supervisor`,route:`/supervisor`,legacyRoute:`/dashboard/supervisor`,intent:`Control grupal, seguridad, calidad de paseos e incidentes.`},paseador:{label:`Paseador`,route:`/paseador`,legacyRoute:`/dashboard/paseador`,intent:`Ejecucion de paseos, retiros, entregas, reportes y metricas personales.`},cliente:{label:`Cliente`,route:`/cliente`,legacyRoute:`/dashboard/cliente`,intent:`Seguimiento del perro, confianza, pagos, planes y contacto.`},visitante:{label:`Visitante`,route:`/visitante`,intent:`Visualizacion publica, informacion comercial y reserva de evaluacion.`}},n={whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,zone:`Pilar y La Lonja`},r={title:`Muestra gratis de DogPro o CatPro + un paseo de regalo`,detail:`Abierta a cualquier persona: no hace falta ser cliente ni hacer una visita previa.`,until:`2026-12-01`,untilLabel:`01/12/2026`},i=[[`Admin`,`Control total`],[`Coordinador`,`Gestion operativa`],[`Supervisor`,`Control grupal`],[`Paseador`,`Ejecucion de paseos`],[`Cliente`,`Seguimiento de su perro`],[`Visitante`,`Solo visualizacion publica`]],a=[[`Inicio`,`/`,`home`],[`Sobre nosotros`,`/#sobre-nosotros`,`shieldCheck`],[`Precios`,`/precios`,`calendarCheck`],[`Tienda`,`/tienda`,`shoppingBag`],[`Compromiso`,`/#testimonios`,`message`],[`Preguntas frecuentes`,`/#faq`,`help`],[`Contacto`,`/#contacto`,`mail`],[`Ingresar`,`/login`,`logIn`],[`Registro`,`/registro`,`userPlus`]];function o(){return{users:c(`paseosJuan_users`,[]),clients:c(`paseosJuan_clients`,[]),dogs:c(`paseosJuan_dogs`,[]),routes:c(`paseosJuan_routes`,[]),payments:c(`paseosJuan_payments`,[]),alerts:c(`paseosJuan_alerts`,[]),reports:c(`paseosJuan_reports`,[]),chats:c(`paseosJuan_chats`,[]),settings:c(`paseosJuan_settings`,{})}}function s(e){e.users&&localStorage.setItem(`paseosJuan_users`,JSON.stringify(e.users)),e.clients&&localStorage.setItem(`paseosJuan_clients`,JSON.stringify(e.clients)),e.dogs&&localStorage.setItem(`paseosJuan_dogs`,JSON.stringify(e.dogs)),e.routes&&localStorage.setItem(`paseosJuan_routes`,JSON.stringify(e.routes)),e.payments&&localStorage.setItem(`paseosJuan_payments`,JSON.stringify(e.payments)),e.alerts&&localStorage.setItem(`paseosJuan_alerts`,JSON.stringify(e.alerts)),e.reports&&localStorage.setItem(`paseosJuan_reports`,JSON.stringify(e.reports)),e.chats&&localStorage.setItem(`paseosJuan_chats`,JSON.stringify(e.chats)),e.settings&&localStorage.setItem(`paseosJuan_settings`,JSON.stringify(e.settings)),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function c(e,t){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function l(){localStorage.removeItem(`paseosJuanActiveModal`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function u(e,t=`success`){localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:e,type:t,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}var d=[{id:`conv-laura-kiara`,clientName:`Tutor de ejemplo 1`,dogs:[`Perro de ejemplo 1`],status:`Abierto`,lastUpdated:Date.now()-1e5,messages:[{id:`msg-1`,conversationId:`conv-laura-kiara`,senderRole:`cliente`,senderName:`Tutor de ejemplo 1`,text:`¿Mañana hay paseo?`,timestamp:`10:30`,read:!1,type:`normal`}]},{id:`conv-martin-bruno`,clientName:`Tutor de ejemplo 2`,dogs:[`Perro de ejemplo 2`],status:`Documentación pendiente`,lastUpdated:Date.now()-2e5,messages:[{id:`msg-2`,conversationId:`conv-martin-bruno`,senderRole:`cliente`,senderName:`Tutor de ejemplo 2`,text:`Ya subí el carnet de vacunas.`,timestamp:`10:15`,read:!0,type:`normal`},{id:`msg-3`,conversationId:`conv-martin-bruno`,senderRole:`coordinador`,senderName:`Coordinador`,text:`Perfecto, lo revisamos y te avisamos si falta algo.`,timestamp:`10:18`,read:!0,type:`normal`}]},{id:`conv-sol-pistacho`,clientName:`Tutor de ejemplo 3`,dogs:[`Perro de ejemplo 3`],status:`Consulta comercial`,lastUpdated:Date.now()-3e5,messages:[{id:`msg-4`,conversationId:`conv-sol-pistacho`,senderRole:`cliente`,senderName:`Tutor de ejemplo 3`,text:`Quiero consultar el Plan 2.`,timestamp:`09:00`,read:!1,type:`normal`}]}];function f(){let e=localStorage.getItem(`paseosJuanChatMessages`);if(e)try{return JSON.parse(e)}catch{return d}return localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(d)),d}function p(e){return[`cliente`,`coordinador`,`supervisor`,`admin`].includes(e)}function ee(e,t,n,r,i=`normal`){if(!p(t))return localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:`Solo coordinación o supervisión pueden responder al cliente.`,type:`error`,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)),!1;let a=f(),o=a.findIndex(t=>t.id===e);if(o===-1)return!1;let s=new Date,c=s.getHours().toString().padStart(2,`0`),l=s.getMinutes().toString().padStart(2,`0`),u={id:`msg-${Date.now()}`,conversationId:e,senderRole:t,senderName:n,text:r,timestamp:`${c}:${l}`,read:!1,type:i};return a[o].messages.push(u),a[o].lastUpdated=Date.now(),localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(a)),!0}function m(e){return`https://wa.me/${n.whatsapp}?text=${encodeURIComponent(e)}`}function h(e,t=`line-icon`){let n=`class="${t}" viewBox="0 0 24 24" aria-hidden="true"`,r={activity:`<path d="M4 12h4l2-6 4 12 2-6h4" />`,arrowRight:`<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,briefcase:`<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><path d="M4 7h16v12H4z" /><path d="M9 12h6" />`,briefcaseMedical:`<path d="M10 6V5a2 2 0 0 1 4 0v1" /><path d="M4 7h16v12H4z" /><path d="M12 11v5" /><path d="M9.5 13.5h5" />`,calendarCheck:`<path d="M7 3v4" /><path d="M17 3v4" /><path d="M4 8h16" /><path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="m9 15 2 2 4-5" />`,camera:`<path d="M14 6 13 4h-2L10 6H6a2 2 0 0 0-2 2v10h16V8a2 2 0 0 0-2-2Z" /><circle cx="12" cy="13" r="3" />`,checkCircle:`<circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.4 2.4 4.9-5" />`,chart:`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15V9" /><path d="M12 15V6" /><path d="M16 15v-4" />`,clipboardCheck:`<path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 4h6" /><path d="m8.5 14 2 2 4.8-5" />`,clock:`<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`,alertCircle:`<circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" />`,alertTriangle:`<path d="M12 3 22 20H2L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" />`,archive:`<rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v12h14V8" /><path d="M10 12h4" />`,bell:`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" />`,bone:`<path d="M7.5 8.5a3 3 0 1 1 2-5.2 3 3 0 0 1 5 0 3 3 0 1 1 2 5.2l-8 7a3 3 0 1 1-2-5.2 3 3 0 0 1 0-3.6 3 3 0 0 1 1 1.8Z" />`,chevronDown:`<path d="m6 9 6 6 6-6" />`,compass:`<circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />`,creditCard:`<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" />`,database:`<ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />`,copy:`<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,dollarSign:`<path d="M12 2v20" /><path d="M17 6.5c-1.2-1-2.8-1.5-5-1.5-3 0-5 1.4-5 3.5 0 5 10 2.5 10 7.5 0 2.1-2 3.5-5 3.5-2.2 0-4-.6-5.5-1.8" />`,droplets:`<path d="M7 3C5 6 4 8.2 4 10a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" /><path d="M17 3c-2 3-3 5.2-3 7a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" />`,eye:`<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />`,fileCheck:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="m8.5 15 2 2 4.5-5" />`,fileText:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M8 13h8" /><path d="M8 17h5" />`,fileUp:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M12 17v-6" /><path d="m9 14 3-3 3 3" />`,heartPulse:`<path d="M20.5 8.8c0 5.2-8.5 10.2-8.5 10.2S3.5 14 3.5 8.8A4.3 4.3 0 0 1 11 6a4.3 4.3 0 0 1 9.5 2.8Z" /><path d="M7 12h3l1-2 2 5 1.5-3H17" />`,help:`<circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.2-1.7 2.6" /><path d="M12 17h.01" />`,home:`<path d="m4 11 8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-6h4v6" />`,logIn:`<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M4 12h10" /><path d="m10 8 4 4-4 4" />`,logOut:`<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M14 12H4" /><path d="m18 8 4 4-4 4" />`,lock:`<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" />`,mail:`<path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />`,mapPin:`<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />`,medal:`<path d="M8 3h8l-2 5h-4L8 3Z" /><circle cx="12" cy="14" r="5" /><path d="m10.5 14 1 1.2 2.2-2.4" />`,message:`<path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8 8 0 1 1 21 12Z" />`,navigation:`<path d="m12 2 7 19-7-4-7 4 7-19Z" />`,packageCheck:`<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4.5 8 12 12.2 19.5 8" /><path d="M12 21v-8.8" /><path d="m9.2 16 1.8 1.8 3.8-4.1" />`,pawPrint:`<circle cx="8" cy="9" r="1.6" /><circle cx="12" cy="7" r="1.7" /><circle cx="16" cy="9" r="1.6" /><circle cx="18" cy="13" r="1.5" /><path d="M7.5 16.4c.8-2.1 2.4-3.3 4.5-3.3s3.7 1.2 4.5 3.3c.5 1.4-.5 2.6-1.9 2.3l-1.5-.4a4.5 4.5 0 0 0-2.2 0l-1.5.4c-1.4.3-2.4-.9-1.9-2.3Z" />`,play:`<circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" />`,flag:`<path d="M5 21V4" /><path d="M5 4h12l-1.5 4L17 12H5" />`,radar:`<circle cx="12" cy="12" r="8" /><path d="M12 12 17 7" /><path d="M12 4v2" /><path d="M12 18v2" /><path d="M4 12h2" /><path d="M18 12h2" />`,radio:`<path d="M4 9h16v11H4z" /><path d="m8 9 8-6" /><circle cx="8" cy="14" r="2" /><path d="M14 14h3" /><path d="M14 17h2" />`,plus:`<path d="M12 5v14" /><path d="M5 12h14" />`,receipt:`<path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1V3Z" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" />`,route:`<circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />`,shieldCheck:`<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" />`,send:`<path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" />`,settings:`<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 3.6-.2-.1a1.7 1.7 0 0 0-2 .3l-.3.2a1.7 1.7 0 0 0-1 1.5V23H9.8v-.5a1.7 1.7 0 0 0-1-1.5l-.3-.2a1.7 1.7 0 0 0-2-.3l-.2.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-3.6.2.1a1.7 1.7 0 0 0 2-.3l.3-.2a1.7 1.7 0 0 0 1-1.5V1h4.4v.5a1.7 1.7 0 0 0 1 1.5l.3.2a1.7 1.7 0 0 0 2 .3l.2-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z" />`,sliders:`<path d="M4 6h8" /><path d="M16 6h4" /><path d="M14 4v4" /><path d="M4 12h4" /><path d="M12 12h8" /><path d="M10 10v4" /><path d="M4 18h10" /><path d="M18 18h2" /><path d="M16 16v4" />`,shoppingBag:`<path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /><path d="M9.5 14h5" />`,uploadCloud:`<path d="M16 16 12 12l-4 4" /><path d="M12 12v9" /><path d="M20 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 0 0 3 10.4" /><path d="M5 18a4 4 0 0 1 0-8" />`,userCheck:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="m16 13 2 2 4-5" />`,userPlus:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 8v6" /><path d="M15 11h6" />`,users:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 11a3 3 0 0 0 0-6" /><path d="M17 20a5 5 0 0 0-2-4" />`,wallet:`<path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V6" /><path d="M16 13h.01" />`,x:`<path d="M6 6 18 18" /><path d="M18 6 6 18" />`};return`<svg ${n} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${r[e]||r.shieldCheck}</svg>`}function te(){try{return JSON.parse(localStorage.getItem(`paseosJuanDemoClient`))}catch{return null}}function ne(e){try{let t=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?t:[]}catch{return[]}}function re(e,t=`visitante`){return`
    ${ie(t)}
    ${ae()}
    ${oe(e)}
  `}function ie(t){return`
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
  `}function ae(){return`
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
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menu">${h(`x`)}</button>
      </div>
      <nav class="menu-nav" aria-label="Menu principal">
        ${a.map(([e,t,n])=>`
          <a href="${t}" data-link>
            <span>${h(n,`menu-icon`)}</span>
            ${e}
          </a>
        `).join(``)}
      </nav>
      <a class="menu-evaluation" href="/#evaluacion" data-link>Pedí tu evaluación</a>
      <a class="menu-whatsapp" href="${m(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">
        WhatsApp ${n.whatsappLabel}
      </a>
    </aside>
  `}function oe(e){return`<div class="smooth-wrapper">${e}</div>`}function se(){let t=f(),n=te()?.name?.split(` `)[0]||`Tutor de ejemplo`,r=t.find(e=>e.id===`conv-martin-bruno`)||t[1];return localStorage.getItem(`paseosJuanChatDraft`),`
    <aside class="floating-chat ${e.chatOpen?`is-open`:``}" aria-live="polite">
      <div class="chat-window">
        <div class="chat-head">
          <span class="chat-head-icon">${h(`message`)}</span>
          <span>
            <strong>Paseos Juan</strong>
            <small>Consultas sobre paseos, pagos o cambios de conducta.</small>
          </span>
          <button type="button" data-chat-close aria-label="Cerrar chat">${h(`x`)}</button>
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
              ${h(`alertCircle`)} ${e}
            </button>
          `).join(``)}
        </div>
        <div class="chat-compose">
          <textarea data-chat-input-shared="${r.id}" placeholder="Escribí tu consulta..."></textarea>
          <button class="primary-button" type="button" data-chat-send-shared="${r.id}" data-chat-role="cliente" data-chat-sender="${n}">
            ${h(`send`)} Enviar
          </button>
        </div>
      </div>
      <button class="chat-bubble" type="button" data-chat-toggle>
        ${h(`message`)}
        <span>Ayuda</span>
      </button>
    </aside>
  `}function ce(e,t){return`
    <details>
      <summary>${e}</summary>
      <p>${t}</p>
    </details>
  `}function le(){return re(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">404</p>
        <h1>Ruta no encontrada</h1>
        <p>Volver a la landing pública o entrar a un dashboard por rol.</p>
        <a class="primary-button" href="/" data-link>Ir al inicio</a>
      </section>
    </main>
  `)}function ue(){let e=localStorage.getItem(`paseosJuanActiveModal`);if(!e)return``;let{type:t,data:n}=JSON.parse(e),r=``;switch(t){case`admin-reports`:r=`<h3>Reportes operativos</h3><p>Reportes filtrables. (Demo)</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-users`:r=`<h3>Usuarios y permisos</h3><p>Gestionar usuarios demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-prices`:r=`<h3>Precios y planes</h3><p>Editar precios y descuentos.</p><button class='primary-button' data-modal-action='save-prices'>Guardar cambios</button> <button data-modal-action='close'>Cerrar</button>`;break;case`admin-alerts`:r=`<h3>Alertas críticas</h3><p>Resolver alertas operativas.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-client`:r=`<h3>Ficha del cliente</h3><p>Detalle demo del cliente.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-audit`:r=`<h3>Auditoría</h3><p>Auditoría de cambios y chats.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-settings`:r=`<h3>Configuración del sistema</h3><p>Opciones generales demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`client-pay`:r=`<h3>Enviar comprobante</h3><p>El alias y el detalle de pago te los enviamos por WhatsApp. Cuando pagues, subí acá el comprobante.</p><label>Subir comprobante <input type='file' accept='image/*,.pdf' /></label><button class='primary-button' data-modal-action='confirm-pay'>Enviar comprobante</button> <button data-modal-action='close'>Cerrar</button>`;break;default:r=`<h3>Modal</h3><button data-modal-action='close'>Cerrar</button>`}return`
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal-content panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width: 90%; max-width: 500px;">
        ${r}
      </div>
    </div>
  `}var de=null;function fe(){let e=null;try{e=JSON.parse(localStorage.getItem(`paseosJuanToast`))}catch{e=null}return e?(de||=setTimeout(()=>{de=null,localStorage.getItem(`paseosJuanToast`)&&(localStorage.removeItem(`paseosJuanToast`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)))},3500),`
    <div class="toast is-${e.type===`error`?`error`:`success`}" role="status" aria-live="polite">
      ${e.message}
    </div>
  `):``}var pe=[],me=[],he=[];function ge(e,t){for(let n of e)if(n(t))return!0;return!1}function _e(t){let n=t.target.closest(`[data-chat-select]`);if(n)return localStorage.setItem(`paseosJuanActiveChat`,n.dataset.chatSelect),$(),!0;let r=t.target.closest(`[data-chat-send-shared]`);if(r){let e=r.dataset.chatSendShared,t=document.querySelector(`[data-chat-input-shared="${e}"]`),n=t?.value?.trim();if(!n)return!0;let i=r.dataset.chatRole,a=r.dataset.chatSender;return ee(e,i,a,n)&&(t&&(t.value=``),localStorage.removeItem(`paseosJuanChatDraft`),$()),!0}let i=t.target.closest(`[data-chat-quick-shared]`);if(i){let e=i.dataset.chatQuickShared,t=i.dataset.chatRole,n=i.dataset.chatSender,r=i.dataset.chatConversation;return ee(r,t,n,e)&&$(),!0}return t.target.closest(`[data-menu-toggle]`)?(e.menuOpen=!e.menuOpen,$(),!0):t.target.closest(`[data-menu-close]`)?(e.menuOpen=!1,$(),!0):t.target.closest(`[data-chat-toggle]`)?(e.chatOpen=!e.chatOpen,$(),!0):t.target.closest(`[data-chat-close]`)?(e.chatOpen=!1,$(),!0):!1}function ve(e){let t=e.target.closest(`[data-modal-action]`);if(t){if(t.dataset.modalAction===`close`&&l(),t.dataset.modalAction===`confirm-pay`){let e=o();e.alerts=[{id:`alert-`+Date.now(),dog:`Pago cliente`,type:`Pago por confirmar`,level:`Medio`,description:`Cliente subió comprobante.`},...e.alerts||[]],s(e),u(`Comprobante enviado. Estado: Pago por confirmar.`),l()}return t.dataset.modalAction===`save-prices`&&(u(`Precios actualizados correctamente.`),l()),!0}return e.target.closest(`[data-modal-backdrop]`)&&e.target===e.target.closest(`[data-modal-backdrop]`)?(l(),!0):!1}function ye(){pe.push(_e),he.push(ve)}var be=`paseosJuan_accesibilidad`,xe={theme:`auto`,motion:`auto`},Se=new Set,Ce=Ee(),we=!1,Te=null;function Ee(){try{let e=JSON.parse(localStorage.getItem(be));return{...xe,...e||{}}}catch{return{...xe}}}function De(){try{localStorage.setItem(be,JSON.stringify(Ce))}catch{}}var Oe=window.matchMedia(`(prefers-color-scheme: dark)`),ke=window.matchMedia(`(prefers-reduced-motion: reduce)`);function Ae(){return Ce.theme===`oscuro`||Ce.theme!==`claro`&&Oe.matches}function je(){return Ce.motion===`calmo`||Ce.motion!==`normal`&&ke.matches}function Me(e){return Se.add(e),()=>Se.delete(e)}function Ne(){let e=document.documentElement;e.dataset.theme=Ae()?`dark`:`light`,e.dataset.motion=je()?`calm`:`normal`,e.style.colorScheme=Ae()?`dark`:`light`;let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,Ae()?`#0f1512`:`#f7f5ef`),Fe(),Se.forEach(e=>e({dark:Ae(),calm:je()}))}function Pe(e,t,n,r){let i=r===t;return`<button type="button" class="a11y-option ${i?`is-active`:``}" data-a11y-set="${e}:${t}" aria-pressed="${i}">${n}</button>`}function Fe(){let e=document.getElementById(`a11y-root`);e||(e=document.createElement(`div`),e.id=`a11y-root`,document.body.appendChild(e)),e.innerHTML=`
    <button type="button" class="a11y-toggle" data-a11y-toggle aria-expanded="${we}" aria-controls="a11y-panel" aria-label="Opciones de accesibilidad: tema y movimiento">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"></path>
      </svg>
    </button>
    <section class="a11y-panel ${we?`is-open`:``}" id="a11y-panel" role="dialog" aria-label="Accesibilidad" ${we?``:`hidden`}>
      <header>
        <strong>Accesibilidad</strong>
        <button type="button" class="a11y-close" data-a11y-toggle aria-label="Cerrar">×</button>
      </header>
      <div class="a11y-group" role="group" aria-label="Tema">
        <span>Tema</span>
        <div class="a11y-options">
          ${Pe(`theme`,`claro`,`Claro`,Ce.theme)}
          ${Pe(`theme`,`oscuro`,`Oscuro`,Ce.theme)}
          ${Pe(`theme`,`auto`,`Automático`,Ce.theme)}
        </div>
      </div>
      <div class="a11y-group" role="group" aria-label="Movimiento">
        <span>Movimiento</span>
        <div class="a11y-options">
          ${Pe(`motion`,`normal`,`Normal`,Ce.motion)}
          ${Pe(`motion`,`calmo`,`Calmo`,Ce.motion)}
          ${Pe(`motion`,`auto`,`Automático`,Ce.motion)}
        </div>
        <small>El modo calmo apaga animaciones y el fondo en movimiento. Recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</small>
      </div>
    </section>
  `}function Ie(){(Te&&document.contains(Te)&&Te.offsetParent!==null?Te:document.querySelector(`.a11y-toggle`))?.focus(),Te=null}function Le(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){we||(Te=document.activeElement),we=!we,Fe(),we?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():Ie();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);Ce={...Ce,[e]:n},De(),Ne(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else we&&!e.target.closest(`#a11y-root`)&&(we=!1,Fe())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&we&&(we=!1,Fe(),Ie())}),Oe.addEventListener?.(`change`,Ne),ke.addEventListener?.(`change`,Ne),Ne()}var Re={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function ze(){Re.frame&&cancelAnimationFrame(Re.frame),Re.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=je(),r=Ae()?[22,52,39]:[184,218,198],i=Ae()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Re.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Re.lastDraw>33&&(Re.lastDraw=e,s(e/1e3)),Re.frame=requestAnimationFrame(l)}Re.frame=requestAnimationFrame(l)}function Be(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ve=`pj_sesion`,He=`pj_pendientes`,Ue=`pj_cache_`,We=6e4;fetch(`/api/salud`).then(e=>e.json()).then(e=>{/provisorio/i.test(e.almacenamiento||``)&&(We=3e5)}).catch(()=>{});var Ge=new Set,Ke=new Map,qe=new Set;document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&qe.forEach(e=>e())});function Je(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ye(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Xe(e){Ge.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function Ze(e){return Ge.add(e),()=>Ge.delete(e)}var Qe=class extends Error{constructor(e,t){super(t),this.status=e}};async function $e(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=g.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new Qe(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(g.clear(),Xe(`sesion`)),!o.ok||s.ok===!1)throw new Qe(o.status,s.error||`Error del servidor.`);return s}var g={token:()=>Je(Ve,null)?.token||null,user:()=>Je(Ve,null)?.user||null,set(e,t){Ye(Ve,{token:e,user:t}),Xe(`sesion`)},clear(){try{localStorage.removeItem(Ve),Object.keys(localStorage).filter(e=>e.startsWith(Ue)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return $e(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await $e(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return g.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await $e(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return g.set(i.token,i.user),i.user},async refresh(){let e=g.token();if(!e)return null;let t=await $e(`/api/auth/me`);return t.user&&g.token()===e&&g.set(e,t.user),t.user},async changePin(e,t){let n=await $e(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return g.set(n.token,n.user),n.user},logout(){g.clear(),Xe(`sesion`)}},et={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],ayudante:[`paseador`],marketing:[]},tt={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,ayudante:`Ayudante de paseador`,marketing:`Marketing`};function nt(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`,ayudante:`/paseador`}[e]||`/`}var rt={list:async()=>(await $e(`/api/usuarios`)).usuarios,save:async e=>(await $e(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>$e(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function it(e,t={}){return`${Ue}${e}_${t.desde||``}_${t.prefijo||``}`}function at(e,t){let n=Je(He,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var _={cached(e,t={}){return at(e,Je(it(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await $e(`/api/registros?${n}`),i=localStorage.getItem(it(e,t));return Ye(it(e,t),r.registros),i!==JSON.stringify(r.registros)&&Xe(e),at(e,r.registros)}catch(n){if(n.status===0)return _.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=ot(n.fecha);try{let t=await $e(`/api/registros`,{method:`POST`,body:{col:e,...n}});return st(e,t.registro),Xe(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Je(He,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:g.user()?.usuario,at:Date.now()}),Ye(He,a),Xe(e),{...n,pendiente:!0}}},async remove(e,t){await $e(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${Ue}${e}_`)).forEach(e=>{Ye(e,Je(e,[]).filter(e=>e.id!==t))}),Xe(e)},pendingCount(){return Je(He,[]).length},watch(e,t={}){let n=it(e,t);if(Ke.has(n))return Ke.get(n);let r=()=>{document.visibilityState===`visible`&&g.token()&&_.list(e,t).catch(()=>{})};r(),qe.add(r);let i=setInterval(r,We);setTimeout(()=>{clearInterval(i),i=setInterval(r,We)},3e3);let a=()=>{qe.delete(r),clearInterval(i),Ke.delete(n)};return Ke.set(n,a),a}};function ot(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function st(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Ue}${e}_`)).forEach(e=>{let n=Je(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Ye(e,n)})}var ct=!1;async function lt(){if(ct||!g.token())return 0;let e=g.user()?.usuario,t=Je(He,[]);if(!t.length)return 0;ct=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await $e(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});st(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Ye(He,Je(He,[]).filter(e=>!n.has(e.at))),ct=!1,r.forEach(e=>Xe(e))}return n.size}window.addEventListener(`online`,()=>lt()),setInterval(()=>lt(),3e4);async function ut(e){return $e(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function v(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}var dt=1600;async function ft(e){if(!/^image\/(jpeg|png|webp)$/.test(e.type))return e;try{let t=await createImageBitmap(e),n=Math.min(1,dt/Math.max(t.width,t.height));if(n===1&&e.size<921600)return e;let r=document.createElement(`canvas`);r.width=Math.round(t.width*n),r.height=Math.round(t.height*n),r.getContext(`2d`).drawImage(t,0,0,r.width,r.height);let i=await new Promise(e=>r.toBlob(e,`image/jpeg`,.82));return i?new File([i],e.name.replace(/\.\w+$/,``)+`.jpg`,{type:`image/jpeg`}):e}catch{return e}}function pt(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result).split(`,`)[1]||``),r.onerror=()=>n(new Qe(400,`No se pudo leer el archivo.`)),r.readAsDataURL(e)})}async function mt(e){if(!e)throw new Qe(400,`Elegí un archivo.`);if(!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(e.type))throw new Qe(400,`Solo se aceptan fotos (JPG, PNG, WEBP) o PDF.`);let t=await ft(e);if(t.size>3670016)throw new Qe(413,`El archivo es muy pesado (máximo 3,5 MB).`);return{nombre:t.name,mime:t.type,base64:await pt(t)}}var ht={async subir(e,t,n={}){let r=await $e(`/api/archivos`,{method:`POST`,body:{tipo:e,archivo:await mt(t),...n}});return st(`archivos`,r.registro),Xe(`archivos`),r.registro},async abrir(e){let t=window.open(``,`_blank`);if(!t)throw new Qe(0,`El navegador bloqueó la ventana nueva: permití las ventanas emergentes de esta página para ver el archivo.`);try{let n=await fetch(`/api/archivos?id=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${g.token()}`}});if(!n.ok){let e=await n.json().catch(()=>({}));throw new Qe(n.status,e.error||`No se pudo abrir el archivo.`)}let r=URL.createObjectURL(await n.blob());t.location.href=r,setTimeout(()=>URL.revokeObjectURL(r),6e4)}catch(e){throw t?.close(),e}}};async function gt(e,t=240){let n=await createImageBitmap(e),r=Math.min(n.width,n.height),i=document.createElement(`canvas`);return i.width=t,i.height=t,i.getContext(`2d`).drawImage(n,(n.width-r)/2,(n.height-r)/2,r,r,0,0,t,t),i.toDataURL(`image/jpeg`,.72)}var _t={de(e){return e&&_.cached(`fotos`).find(t=>t.id===e||t.perroId===e)?.miniatura||null},async subir(e,t,n){if(!e)throw new Qe(400,`Falta el perro.`);if(!n||!/^image\//.test(n.type))throw new Qe(400,`Elegí una foto.`);let r=await gt(n),i=await ht.subir(`foto`,n,{perroId:e,perroNombre:t,nota:`Foto de perfil`});return _.save(`fotos`,{id:e,perroId:e,perroNombre:t,miniatura:r,archivoId:i.id})}},vt=null;async function yt(){return vt||(vt=fetch(`/api/salud`).then(e=>e.json()).then(e=>e.googleClientId||null).catch(()=>null),vt)}function bt(){return window.google?.accounts?.id?Promise.resolve():new Promise((e,t)=>{let n=document.querySelector(`script[data-gsi]`);if(n){n.addEventListener(`load`,()=>e());return}let r=document.createElement(`script`);r.src=`https://accounts.google.com/gsi/client`,r.async=!0,r.dataset.gsi=`1`,r.onload=()=>e(),r.onerror=()=>t(new Qe(0,`No se pudo cargar Google.`)),document.head.appendChild(r)})}async function xt(e,t,{texto:n=`continue_with`}={}){let r=await yt();if(!r||!e)return!1;await bt(),window.google.accounts.id.initialize({client_id:r,callback:e=>t(e.credential),ux_mode:`popup`});let i=document.documentElement.dataset.theme===`dark`;return window.google.accounts.id.renderButton(e,{type:`standard`,theme:i?`filled_black`:`outline`,size:`large`,text:n,shape:`pill`,locale:`es`,width:Math.min(e.clientWidth||320,400)}),!0}g.loginGoogle=async function(e){let t=await $e(`/api/auth/google`,{method:`POST`,body:{credential:e},auth:!1});return g.set(t.token,t.user),t.user};var St=`pj_fotos_paseo_pendientes`;function Ct(e=new Date){return new Intl.DateTimeFormat(`es-AR`,{timeZone:`America/Argentina/Buenos_Aires`,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(e)}var wt={async sacar(e,t){if(!t||!/^image\//.test(t.type))throw new Qe(400,`Sacá una foto del perro.`);let n=await mt(t),r=Ct(),i={...e,estado:`paseando`,horaPaseo:r};try{let t=await $e(`/api/archivos`,{method:`POST`,body:{tipo:`foto`,archivo:n,perroId:e.perroId,perroNombre:e.perroNombre,nota:`Foto del paseo ${e.fecha} ${r}`}});return st(`archivos`,t.registro),Xe(`archivos`),_.save(`paseos`,{...i,fotoPaseoId:t.registro.id})}catch(t){if(t.status!==0)throw t;let r=Je(St,[]).filter(t=>t.paseo.id!==e.id);return r.push({paseo:i,archivo:n,usuario:g.user()?.usuario,at:Date.now()}),Ye(St,r),_.save(`paseos`,{...i,fotoPendiente:!0})}},pendientes(){return Je(St,[]).length},async subirPendientes(){let e=Je(St,[]);if(!e.length||!g.token())return 0;let t=g.user()?.usuario,n=new Set;for(let r of e)if(!(r.usuario&&r.usuario!==t))try{let e=await $e(`/api/archivos`,{method:`POST`,body:{tipo:`foto`,archivo:r.archivo,perroId:r.paseo.perroId,perroNombre:r.paseo.perroNombre,nota:`Foto del paseo ${r.paseo.fecha} ${r.paseo.horaPaseo}`}});await _.save(`paseos`,{id:r.paseo.id,fecha:r.paseo.fecha,fotoPaseoId:e.registro.id,fotoPendiente:!1}),n.add(r.at)}catch(e){e.status!==0&&n.add(r.at)}return Ye(St,Je(St,[]).filter(e=>!n.has(e.at))),n.size&&Xe(`paseos`),n.size}};window.addEventListener(`online`,()=>wt.subirPendientes()),setInterval(()=>wt.subirPendientes(),3e4);var Tt=`Hola, quiero información sobre Paseos Juan.`;function Et(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function Dt(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}var Ot=[[`Inicio`,`/`,`home`],[`Servicios`,`/#servicios`,`pawPrint`],[`Precios`,`/precios`,`dollarSign`],[`Tienda`,`/tienda`,`shoppingBag`],[`Cómo trabajamos`,`/#como-trabajamos`,`shieldCheck`],[`Preguntas frecuentes`,`/#faq`,`help`],[`Pedí tu evaluación`,`/#evaluacion`,`clipboardCheck`],[`Ingresar (equipo)`,`/login`,`logIn`]];function kt(t,r=`/`){return`
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
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menú">${h(`x`)}</button>
      </div>
      <nav class="menu-nav" aria-label="Menú principal">
        ${Ot.map(([e,t,n])=>`
          <a href="${t}" data-link ${t===r?`aria-current="page"`:``}>
            <span>${h(n,`menu-icon`)}</span>
            ${e}
          </a>
        `).join(``)}
      </nav>
      <a class="menu-evaluation" href="/precios" data-link>Ver precios</a>
      <a class="menu-whatsapp" href="${m(Tt)}" target="_blank" rel="noreferrer">WhatsApp ${n.whatsappLabel}</a>
    </aside>
    <div class="smooth-wrapper">${t}</div>
  `}function At(){return`
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
      <a class="footer-whatsapp" href="${m(Tt)}" target="_blank" rel="noreferrer">WhatsApp ${n.whatsappLabel}</a>
    </footer>
  `}function jt(){return kt(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${Mt()}
      ${Ft()}
      ${It()}
      ${Lt()}
      ${Rt()}
      ${an()}
      ${At()}
      <a class="whatsapp" href="${m(Tt)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function Mt(){return`
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
          <span class="glass-icon">${h(`radar`)}</span>
          <strong>Seguimiento del paseo</strong>
          <span>Registramos el retiro, la foto del paseo y la entrega.</span>
        </div>
      </div>
      <a class="scroll-indicator" href="#servicios" data-link aria-label="Bajar a servicios">
        <span>Scroll</span>
        <b>${h(`chevronDown`)}</b>
      </a>
    </section>
  `}function Nt({iconName:e,title:t,text:n,action:r,extraClass:i=``}){return`
    <article class="service-card ${i}">
      <span class="service-icon">${h(e)}</span>
      <h3>${t}</h3>
      <p>${n}</p>
      ${r}
    </article>
  `}function Pt(e,t=`Consultar`){return`<a class="primary-button service-button" href="${m(e)}" target="_blank" rel="noreferrer">${t}</a>`}function Ft(){let e=Et()?Nt({iconName:`bone`,title:r.title,text:`${r.detail} Hasta el ${r.untilLabel}.`,action:Pt(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`,`Quiero la promo`),extraClass:`service-card--promo`}):``;return`
    <section class="services-section reveal" id="servicios" aria-labelledby="servicios-titulo">
      <span class="anchor-alias" id="sobre-nosotros" aria-hidden="true"></span>
      <div class="services-heading">
        <p class="eyebrow">Servicios</p>
        <h2 id="servicios-titulo">Todo para tu perro, en un solo lugar.</h2>
      </div>
      <div class="services-grid">
        ${Nt({iconName:`pawPrint`,title:`Paseos grupales`,text:`Grupos armados por conducta, energía y compatibilidad. Antes de sumarlo al grupo, hacemos una evaluación inicial.`,action:Pt(`Hola, quiero consultar por los paseos grupales de Paseos Juan.`)})}
        ${Nt({iconName:`droplets`,title:`Baños`,text:`Baño completo con paseo de ida y vuelta caminando, corte de uñas, lavado de dientes, emprolijamiento y golosina de regalo.`,action:Pt(`Hola, quiero consultar por el baño para mi perro.`)})}
        ${Nt({iconName:`home`,title:`Estadía / guardería`,text:`Consultá disponibilidad por WhatsApp.`,action:Pt(`Hola, quiero consultar disponibilidad de estadía / guardería.`,`Consultar disponibilidad`)})}
        ${Nt({iconName:`shoppingBag`,title:`Tienda de alimento`,text:`Alimento y productos DogPro y CatPro para perros y gatos.`,action:`<a class="primary-button service-button" href="/tienda" data-link>Ver la tienda</a>`,extraClass:`service-card--shop`})}
        ${e}
      </div>
    </section>
  `}function It(){return`
    <section class="prices-strip reveal" id="planes" aria-labelledby="precios-franja-titulo">
      <div>
        <h2 id="precios-franja-titulo">¿Querés ver los precios?</h2>
        <p>Planes semanales, paseo suelto y descuentos por varios perros, todo resumido.</p>
      </div>
      <a class="primary-button" href="/precios" data-link>Ver precios</a>
    </section>
  `}function Lt(){return`
    <section class="how-section reveal" id="como-trabajamos" aria-labelledby="como-titulo">
      <div>
        <p class="eyebrow">Cómo trabajamos</p>
        <h2 id="como-titulo">Orden, criterio y presencia.</h2>
      </div>
      <ul class="how-list">
        ${[[`shieldCheck`,`Seguridad`,`Evaluación inicial, checklist en cada salida y seguimiento durante todo el paseo.`],[`users`,`Grupos compatibles`,`Cada grupo se arma según conducta, energía y compatibilidad.`],[`message`,`Comunicación clara`,`Hablamos directo por WhatsApp, sin vueltas.`],[`mapPin`,`Zona`,`${n.zone}. ¿Estás cerca? Escribinos y te confirmamos.`]].map(([e,t,n])=>`
          <li>
            <span class="service-icon">${h(e)}</span>
            <div><strong>${t}</strong><p>${n}</p></div>
          </li>
        `).join(``)}
      </ul>
    </section>
  `}function Rt(){return`
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
        ${ce(`¿Cómo empieza el servicio?`,`Con una evaluación inicial para conocer conducta, energía, vacunas y compatibilidades, antes de sumarlo al grupo.`)}
        ${ce(`¿En qué zona trabajan?`,`En ${n.zone}. Si estás cerca y no sabés si llegamos, escribinos y te confirmamos.`)}
        ${ce(`¿Qué pasa si mi perro no se lleva bien con otros perros?`,`Lo evaluamos antes de sumarlo a un grupo y te contamos si puede sumarse o qué adaptación necesita.`)}
        ${ce(`¿Dónde veo los precios?`,`En la página de precios, con todos los planes resumidos.`)}
        ${ce(`¿Cómo consulto disponibilidad?`,`Escribinos por WhatsApp al ${n.whatsappLabel} o completá el formulario de evaluación.`)}
      </div>
    </section>
  `}var zt=`paseosJuan_evaluacionBorrador`,Bt=[`perro`,`responsable`,`telefono`,`tamano`,`energia`,`perros`,`mordida`,`horario`,`dias`,`conducta`,`edad`,`raza`,`zona`,`referencia`,`email`,`comentario`],Vt=[`edad`,`raza`,`zona`,`referencia`,`email`,`comentario`],Ht=[[`perro`,`nombre del perro`],[`responsable`,`tu nombre`],[`telefono`,`WhatsApp`]],Ut=null,Wt=!1;function Gt(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e.at(-1)}`:e[0]||``}function Kt(e){return Ht.filter(([t])=>!String(e[t]||``).trim()).map(([,e])=>e)}function qt(e){return e.length?`Falta: ${Gt(e)}`:`Listo para enviar`}function Jt(e){try{let t=e.split(`.`)[1].replace(/-/g,`+`).replace(/_/g,`/`),n=atob(t.padEnd(t.length+(4-t.length%4)%4,`=`)),r=Uint8Array.from(n,e=>e.charCodeAt(0)),i=JSON.parse(new TextDecoder().decode(r));return{email:String(i.email||``),nombre:String(i.name||``)}}catch{return{email:``,nombre:``}}}var Yt=[[`L`,`Lunes`],[`M`,`Martes`],[`X`,`Miércoles`],[`J`,`Jueves`],[`V`,`Viernes`],[`S`,`Sábado`],[`D`,`Domingo`]];function Xt(){try{let e=JSON.parse(localStorage.getItem(zt));return e&&typeof e==`object`?e:{}}catch{return{}}}function Zt(e){try{Object.values(e).some(e=>Array.isArray(e)?e.length:String(e).trim())?localStorage.setItem(zt,JSON.stringify(e)):localStorage.removeItem(zt)}catch{}}function Qt(){try{localStorage.removeItem(zt)}catch{}}function $t(){return typeof window<`u`&&!!(window.SpeechRecognition||window.webkitSpeechRecognition)}var en=`<svg class="mic-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></svg>`;function tn(e,t,n){return n?`<button class="mic-mini" type="button" data-dictar="${e}" aria-pressed="false" aria-label="Dictar ${t}" title="Dictar ${t}">${en}</button>`:``}function nn({name:e,label:t,draft:n,voice:r,required:i=!1,placeholder:a=``,autocomplete:o=`off`,type:s=`text`,inputmode:c=``,what:l=``}){return`
    <label class="quick-field"><span>${t}${i?` <span class="req" aria-hidden="true">*</span>`:``}</span>
      <span class="field-with-mic">
        <input name="${e}" type="${s}" ${i?`required`:``} autocomplete="${o}" ${c?`inputmode="${c}"`:``} placeholder="${a}" value="${Dt(n[e]||``)}" />
        ${l?tn(e,l,r):``}
      </span>
    </label>
  `}function rn({name:e,legend:t,options:n,draft:r,multiple:i=!1}){let a=r[e],o=e=>i?Array.isArray(a)&&a.includes(e):a===e;return`
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
  `}function an(){let e=Xt(),t=$t(),n=Vt.some(t=>String(e[t]||``).trim()),r=Kt(e);return`
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
          <div class="google-box" data-google-box ${Wt||Ut?``:`hidden`}>
            <div class="google-button" data-google-boton ${Ut?`hidden`:``}></div>
            <p class="google-connected" data-google-connected ${Ut?``:`hidden`}>
              Conectado como <strong data-google-email>${Dt(Ut?.email||``)}</strong> ·
              <button class="link-button" type="button" data-google-cambiar>Cambiar</button>
            </p>
            <p class="google-or" aria-hidden="true" ${Ut?`hidden`:``}>o completá a mano</p>
          </div>
          ${nn({name:`perro`,label:`Nombre del perro`,draft:e,voice:t,required:!0,placeholder:`Ej. Luna`,what:`el nombre del perro`})}
          ${nn({name:`responsable`,label:`Tu nombre`,draft:e,voice:t,required:!0,placeholder:`Tu nombre`,autocomplete:`name`,what:`tu nombre`})}
          ${nn({name:`telefono`,label:`Tu WhatsApp`,draft:e,voice:t,required:!0,placeholder:`11 0000 0000`,autocomplete:`tel`,type:`tel`,inputmode:`tel`})}
        </fieldset>

        <fieldset class="evaluation-board quick-optional">
          <legend>Si querés, sumá más (opcional)</legend>
          ${rn({name:`tamano`,legend:`Tamaño`,draft:e,options:[[`Chico`,`Pequeño`],[`Mediano`,`Mediano`],[`Grande`,`Grande`]]})}
          ${rn({name:`energia`,legend:`Energía`,draft:e,options:[[`Baja`,`Baja`],[`Media`,`Media`],[`Alta`,`Alta`]]})}
          ${rn({name:`perros`,legend:`¿Se lleva bien con otros perros?`,draft:e,options:[[`Sí`,`Sí`],[`No`,`No`],[`Depende`,`Depende`]]})}
          ${rn({name:`mordida`,legend:`¿Alguna vez mordió o intentó morder?`,draft:e,options:[[`No`,`No`],[`Sí`,`Sí`],[`No sé`,`No estoy seguro`]]})}
          ${rn({name:`horario`,legend:`Turno`,draft:e,options:[[`Mañana`,`Mañana`],[`Tarde`,`Tarde`],[`Indistinto`,`Indistinto`]]})}
          ${rn({name:`dias`,legend:`Días (tocá todos los que quieras)`,draft:e,multiple:!0,options:Yt.map(([e,t])=>[e,t,t])})}

          <div class="voice-field">
            <label for="campo-conducta">Contanos de tu perro</label>
            <textarea id="campo-conducta" name="conducta" placeholder="Miedos, si tira de la correa, cómo se porta con otros perros…">${Dt(e.conducta||``)}</textarea>
            ${t?`<button class="voice-button" type="button" data-dictar="conducta" aria-pressed="false">${en}<span data-voice-label>Hablar</span></button>`:`<p class="voice-hint">Tocá el micrófono de tu teclado para dictar.</p>`}
          </div>
          <p class="visually-hidden" data-voice-status role="status" aria-live="polite"></p>

          <details class="quick-more" ${n?`open`:``}>
            <summary>Contanos más (opcional)</summary>
            <div class="form-grid">
              ${nn({name:`edad`,label:`Edad`,draft:e,voice:t,placeholder:`Ej. 4 años`,what:`la edad`})}
              ${nn({name:`raza`,label:`Raza o cruza`,draft:e,voice:t,placeholder:`Ej. Mestizo`,what:`la raza`})}
              ${nn({name:`zona`,label:`Barrio o zona`,draft:e,voice:t,placeholder:`Ej. Pilar`,what:`el barrio`})}
              ${nn({name:`referencia`,label:`Barrio privado o referencia`,draft:e,voice:t,placeholder:`Ej. nombre del barrio`,what:`la referencia`})}
              ${nn({name:`email`,label:`Correo`,draft:e,voice:t,placeholder:`Se completa solo con Google`,autocomplete:`email`,type:`email`,inputmode:`email`})}
              <label class="span-2">Carnet de vacunas
                <input name="carnet" type="file" accept="image/*,application/pdf" capture="environment" />
                <small class="field-help">Sacale una foto o subí el PDF. Lo guardamos privado y solo lo ve el equipo.</small>
              </label>
              <label class="span-2">Comentario
                <span class="field-with-mic">
                  <textarea name="comentario" placeholder="Algo más que quieras contarnos">${Dt(e.comentario||``)}</textarea>
                  ${tn(`comentario`,`un comentario`,t)}
                </span>
              </label>
            </div>
          </details>

        </fieldset>
        <p class="quick-note">Se abre WhatsApp con tus respuestas listas: solo tocás Enviar. Te contestamos para coordinar la evaluación.</p>

        <div class="quick-submit-bar" data-submit-bar>
          <div class="quick-submit-text">
            <p class="quick-missing" data-missing aria-live="polite">${qt(r)}</p>
            <p class="evaluation-status" data-evaluation-status role="status" aria-live="polite"></p>
          </div>
          <button class="primary-button quick-submit" type="submit" data-quick-submit aria-disabled="${r.length>0}">Enviar</button>
        </div>
      </form>
    </section>
  `}function on(e,t){return t===`dias`?e.getAll(`dias`).map(String).join(`, `):(e.get(t)||``).toString().trim()}function sn(e){let t=(t,n)=>on(e,n)?`${t}: ${on(e,n)}`:null,n=(e,t)=>{let n=t.filter(Boolean);return n.length?[``,e,...n]:[]};return[`Hola, quiero pedir una evaluación para mi perro.`,...n(`*Perro*`,[t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`)]),...n(`*Conducta y energía*`,[t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Sobre el perro`,`conducta`)]),...n(`*Responsable*`,[t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Correo`,`email`),t(`Zona`,`zona`),t(`Referencia`,`referencia`)]),...n(`*Preferencias*`,[t(`Turno`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`)]),e.get(`carnet`)?.size?`
Carnet de vacunas: lo adjunté en el formulario de la página.`:null].filter(e=>e!==null).join(`
`)}function cn(e){let t=new FormData(e);return Object.fromEntries(Bt.map(e=>[e,e===`dias`?t.getAll(`dias`).map(String):on(t,e)]))}function ln(e){for(let t of e.elements)t.type!==`hidden`&&t.name!==`sitio`&&t.name&&(t.type===`radio`||t.type===`checkbox`?t.checked=!1:t.value=``)}function un(e){let t=Kt(Object.fromEntries(Ht.map(([t])=>[t,e.elements[t]?.value||``]))),n=qt(t),r=e.querySelector(`[data-missing]`);r&&r.textContent!==n&&(r.textContent=n),e.querySelector(`[data-quick-submit]`)?.setAttribute(`aria-disabled`,String(t.length>0))}function dn(e){let t=e.target.closest?.(`[data-evaluation-form]`);t&&e.target.name!==`carnet`&&e.target.name!==`sitio`&&(e.target.hasAttribute(`aria-invalid`)&&e.target.value.trim()&&e.target.removeAttribute(`aria-invalid`),Zt(cn(t)),un(t))}function fn(e){let t=e.querySelector(`[data-google-box]`);t&&(t.hidden=!(Wt||Ut),e.querySelector(`[data-google-boton]`).hidden=!!Ut,e.querySelector(`[data-google-connected]`).hidden=!Ut,e.querySelector(`[data-google-email]`).textContent=Ut?.email||``,e.querySelector(`.google-or`).hidden=!!Ut)}function pn(e){let t=document.querySelector(`[data-evaluation-form]`),{email:n,nombre:r}=Jt(e);if(Ut={credential:e,email:n,nombre:r},!t)return;r&&!t.elements.responsable.value.trim()&&(t.elements.responsable.value=r),n&&(t.elements.email.value=n),Zt(cn(t)),un(t),fn(t);let i=t.querySelector(`[data-evaluation-status]`);i.classList.remove(`is-error`),i.textContent=`Listo, conectado con Google.`}async function mn(){let e=document.querySelector(`[data-evaluation-form]`),t=e?.querySelector(`[data-google-boton]`);t&&!t.dataset.mounted&&(t.dataset.mounted=`1`,Wt=!!await xt(t,pn).catch(()=>!1),e.isConnected&&fn(e))}function hn(e){let t=e.target.closest?.(`[data-google-cambiar]`);if(!t)return;let n=t.closest(`[data-evaluation-form]`);Ut&&n.elements.email.value===Ut.email&&(n.elements.email.value=``),Ut=null;try{window.google?.accounts?.id?.disableAutoSelect?.()}catch{}Zt(cn(n)),fn(n),n.querySelector(`[data-evaluation-status]`).textContent=`Elegí otra cuenta de Google o completá a mano.`}function gn(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault(),bn();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu WhatsApp para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(m(sn(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,Qt();let a=i.get(`carnet`),o={};for(let e of new Set(i.keys()))e!==`carnet`&&(o[e]=e===`dias`?on(i,`dias`):i.get(e));Ut&&(o.googleCredential=Ut.credential),(async()=>{if(a&&a.size)try{o.carnet=await mt(a)}catch(e){n.textContent=`${e.message} Tu pedido igual se envía; el carnet mandalo por WhatsApp.`}await ut(o)})().then(()=>{ln(t),Ut=null,fn(t),un(t),n.textContent=o.carnet?`Listo: recibimos tu pedido y el carnet. Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`:`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}var _n=null;function vn(e){let t=document.querySelector(`[data-voice-status]`);t&&(t.textContent=e)}function yn(e,t){e.setAttribute(`aria-pressed`,String(t)),e.classList.toggle(`is-listening`,t);let n=e.querySelector(`[data-voice-label]`);n&&(n.textContent=t?`Frenar`:`Hablar`),n||e.setAttribute(`aria-label`,t?`Frenar el dictado`:e.title)}function bn(){_n&&_n.recognition.stop()}function xn(e){let t=window.SpeechRecognition||window.webkitSpeechRecognition,n=e.closest(`[data-evaluation-form]`)?.elements[e.dataset.dictar];if(!t||!n)return;if(_n){let t=_n.button===e;if(_n.recognition.stop(),t)return}let r=new t,i=n.tagName===`TEXTAREA`;r.lang=`es-AR`,r.interimResults=!0,r.continuous=i,r.maxAlternatives=1;let a=i?n.value.trim():``,o={recognition:r,button:e,field:n};_n=o,r.onstart=()=>{yn(e,!0),n.classList.add(`is-dictating`),vn(`Te escucho. Hablá ahora.`)},r.onresult=e=>{let t=``;for(let n=0;n<e.results.length;n+=1)t+=e.results[n][0].transcript;t=t.trim(),n.value=a&&t?`${a} ${t}`:a||t,n.dispatchEvent(new Event(`input`,{bubbles:!0}))},r.onerror=e=>{vn({"not-allowed":`No hay permiso para usar el micrófono. Podés escribir o usar el micrófono del teclado.`,"service-not-allowed":`No hay permiso para usar el micrófono. Podés escribir o usar el micrófono del teclado.`,"no-speech":`No escuché nada. Tocá de nuevo para probar.`,"audio-capture":`No encontramos un micrófono. Podés escribir.`}[e.error]||`No se pudo dictar. Podés escribir.`),o.failed=!0},r.onend=()=>{yn(e,!1),n.classList.remove(`is-dictating`),o.failed||vn(`Listo, terminé de escuchar. Revisá el texto.`),_n===o&&(_n=null)};try{r.start()}catch{_n=null,vn(`No se pudo usar el micrófono. Podés escribir.`)}}function Sn(e){let t=e.target.closest?.(`[data-dictar]`);t&&(e.preventDefault(),xn(t))}function Cn(){document.addEventListener(`submit`,gn),document.addEventListener(`input`,dn),document.addEventListener(`change`,dn),document.addEventListener(`click`,Sn),document.addEventListener(`click`,hn);let e=document.getElementById(`app`);e&&new MutationObserver(()=>mn()).observe(e,{childList:!0})}var y=`Pendiente de confirmar`,wn=`12/11/2026`,Tn={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},En=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Dn={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},b={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},On=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],kn=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],An={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},jn=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Mn={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},x=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),Nn=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Pn=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],Fn=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function In(e,t,n){return!!e.schedule?.[t]?.includes(n)}function Ln(e=new Date){return On[(e.getDay()+6)%7]}function Rn(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var zn=[[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Flora`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,20,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Lunes`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Coqui`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Manolo`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Lunes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Martes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:15`,`Forest`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:30`,`Sam`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:45`,`Coqui`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:00`,`Manolo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Séptima`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Rambo`,20,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam ni Cashi`],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Morris`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:45`,`Lokaku`,45,`Bozal`],[`Miércoles`,`Mañana`,`PJ_1M`,`11:00`,`Paco`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Tayler`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Duque`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:30`,`Rambo`,20,``],[`Miércoles`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:30`,`Annie`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:45`,`Séptima`,45,`Sin días contratados cargados`],[`Miércoles`,`Tarde`,`PJ_2T`,`16:00`,`Milo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:15`,`Flora`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Jueves`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`11:00`,`Rambo`,20,``],[`Jueves`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`14:45`,`Forest`,45,`Bozal`],[`Jueves`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Jueves`,`Tarde`,`PJ_1T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Jueves`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`16:15`,`Rambo`,20,`Revisar duración`],[`Viernes`,`Mañana`,`PJ_1M`,`09:45`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Runa`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:50`,`Kiara`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Flora`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Viernes`,`Tarde`,`PJ_2T`,`14:45`,`Coqui`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`16:00`,`Séptima`,45,`Sin días contratados cargados`],[`Viernes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Viernes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,5,`Revisar duración`],[`Sábado`,`Mañana`,`PJ_1M`,`09:15`,`Sam`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`14:45`,`Forest`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Roma`,55,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Milo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`16:00`,`Tayler`,45,``]],Bn={"Lunes|Mañana":`Juan`,"Lunes|Tarde":`Nicolás`,"Martes|Mañana":`Juan`,"Martes|Tarde":`Nicolás`,"Miércoles|Mañana":`Juan`,"Miércoles|Tarde":`Nicolás`,"Jueves|Mañana":`Juan`,"Jueves|Tarde":`Nicolás`,"Viernes|Mañana":`Nicolás`,"Viernes|Tarde":`Nicolás`,"Sábado|Mañana":`Juan`,"Sábado|Tarde":`Juan`},Vn=new Map(x.map(e=>[e.name,e]));function Hn(e,t){let[n,r]=e.split(`:`).map(Number),i=n*60+r+Number(t||0);return`${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}var Un=zn.map(([e,t,n,r,i,a,o])=>({dia:e,turno:t,ruta:n,hora:r,perroId:Vn.get(i)?.id||null,perroNombre:i,minutos:a,salida:Hn(r,a),nota:o}));function Wn(){let e=new Map;return Un.forEach(t=>{let n=`${t.ruta}_${t.dia.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}`;e.has(n)||e.set(n,{id:n,dia:t.dia,turno:t.turno,ruta:t.ruta,paseador:``,ayudante:``,supervisor:Bn[`${t.dia}|${t.turno}`]||``,paradas:[],origen:`Planilla RPJ, BASE RUTAS (12/11/2026)`}),e.get(n).paradas.push({perroId:t.perroId,perroNombre:t.perroNombre,hora:t.hora,minutos:t.minutos,nota:t.nota})}),[...e.values()].map(e=>({...e,paradas:e.paradas.sort((e,t)=>e.hora.localeCompare(t.hora))}))}var Gn=[`Mapuche Country Club`,`La Lonja`,`Pilar (otros barrios)`],Kn=`12/11/2026`,qn=[`Pequeño`,`Mediano`,`Grande`],Jn=kn.map(e=>({id:e.id,nombre:e.name,paseosPorSemana:e.walks,precios:e.prices})),Yn=Object.fromEntries(qn.map(e=>[e,An[e].grupo])),Xn=jn.map(e=>({perros:e.dogs,descuento:e.discount})),Zn=[{id:`banos`,nombre:`Baños`,mensaje:`Hola, quiero consultar el precio del baño para mi perro.`},{id:`estadia`,nombre:`Estadía / guardería`,mensaje:`Hola, quiero consultar disponibilidad y precio de estadía / guardería.`}];function Qn(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var $n=`Hola, vi los precios en la página y quiero contratar paseos grupales para mi perro.`;function er({caption:e,filas:t}){return`
    <div class="precios-table-wrap">
      <table class="precios-table">
        <caption class="visually-hidden">${e}</caption>
        <thead>
          <tr>
            <th scope="col"><span class="visually-hidden">Opción</span></th>
            ${qn.map(e=>`<th scope="col">${e}</th>`).join(``)}
          </tr>
        </thead>
        <tbody>
          ${t.map(e=>`
            <tr>
              <th scope="row">${e.titulo}${e.detalle?`<small>${e.detalle}</small>`:``}</th>
              ${qn.map(t=>`<td>${Qn(e.precios[t])}</td>`).join(``)}
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
  `}function tr(){return kt(`
    <main class="precios-main">
      <header class="precios-head">
        <p class="eyebrow">Precios</p>
        <h1>Precios de Paseos Juan</h1>
        <p class="precios-fecha">Precios vigentes al <strong>${Kn}</strong></p>
      </header>

      <section class="precios-card" aria-labelledby="planes-titulo">
        <h2 id="planes-titulo">Planes semanales</h2>
        <p class="precios-sub">Paseos grupales. Precio por semana y por perro, según su tamaño.</p>
        ${er({caption:`Planes semanales: precio por semana y por perro según tamaño`,filas:Jn.map(e=>({titulo:e.nombre,detalle:`${e.paseosPorSemana} paseos por semana`,precios:e.precios}))})}
      </section>

      <section class="precios-card" aria-labelledby="suelto-titulo">
        <h2 id="suelto-titulo">Paseo suelto</h2>
        <p class="precios-sub">Un paseo grupal, sin plan.</p>
        ${er({caption:`Paseo suelto grupal: precio por paseo según tamaño`,filas:[{titulo:`Grupal`,detalle:`1 paseo`,precios:Yn}]})}
      </section>

      <section class="precios-card" aria-labelledby="descuentos-titulo">
        <h2 id="descuentos-titulo">Varios perros en casa</h2>
        <p class="precios-sub">Descuento según cuántos perros pasean con nosotros.</p>
        <ul class="precios-descuentos">
          ${Xn.map(e=>`
            <li><strong>${e.descuento}</strong><span>${e.perros} perros</span></li>
          `).join(``)}
        </ul>
      </section>

      <section class="precios-card" aria-labelledby="consultar-titulo">
        <h2 id="consultar-titulo">Otros servicios</h2>
        <ul class="precios-consultar">
          ${Zn.map(e=>`
            <li>
              <div><strong>${e.nombre}</strong><span>Consultá por WhatsApp</span></div>
              <a class="secondary-button" href="${m(e.mensaje)}" target="_blank" rel="noreferrer" aria-label="Consultar ${e.nombre} por WhatsApp">Consultar</a>
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
          <a class="primary-button" href="${m($n)}" target="_blank" rel="noreferrer">Contratar por WhatsApp</a>
          <a class="secondary-button" href="/#evaluacion" data-link>Pedí tu evaluación</a>
        </div>
        <small>WhatsApp ${n.whatsappLabel}</small>
      </section>
    </main>
    ${At()}
  `,`/precios`)}var nr={nombre:`Tienda`,nombreConfirmado:!1,aliado:`Aliado de Paseos Juan`,fabricante:`VitalCrops`},rr=[{id:`dogpro`,nombre:`DogPro`,para:`Para perros`,marca:`DogPro`,fabricante:`VitalCrops`,presentacion:y,precio:null,foto:null},{id:`catpro`,nombre:`CatPro`,para:`Para gatos`,marca:`CatPro`,fabricante:`VitalCrops`,presentacion:y,precio:null,foto:null}],ir=`paseosJuan_tiendaCarrito`,ar=99,or={};function S(e){return String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function sr(){let e=or;try{let t=JSON.parse(localStorage.getItem(ir));t&&typeof t==`object`&&(e=t)}catch{}let t={};for(let n of rr){let r=Math.min(ar,Math.max(0,Math.floor(Number(e[n.id])||0)));r&&(t[n.id]=r)}return t}function cr(e){or=e;try{Object.keys(e).length?localStorage.setItem(ir,JSON.stringify(e)):localStorage.removeItem(ir)}catch{}}function lr(e){return Object.values(e).reduce((e,t)=>e+t,0)}function ur(e){return typeof e.precio==`number`?`$${e.precio.toLocaleString(`es-AR`)}`:y}function dr(e){let t=rr.filter(t=>e[t.id]).map(t=>`- ${t.nombre} (${t.para.toLowerCase()}): ${e[t.id]}`);return[`Hola, quiero hacer un pedido en la ${nr.nombre} (aliada de Paseos Juan):`,...t,``,`¿Me confirmás presentación, precio y disponibilidad?`].join(`
`)}function fr(e,t){let n=t[e.id]||0;return`
    <article class="tienda-product" aria-labelledby="producto-${e.id}">
      ${e.foto?`<img class="tienda-photo" src="${S(e.foto)}" alt="${S(e.nombre)}, ${S(e.para.toLowerCase())}" />`:`<div class="tienda-photo tienda-photo--pending" role="img" aria-label="Foto de ${S(e.nombre)}: pendiente de confirmar">
            ${h(`packageCheck`)}<span>Foto pendiente</span>
          </div>`}
      <div class="tienda-product-body">
        <p class="tienda-tag">${S(e.para)}</p>
        <h2 id="producto-${e.id}">${S(e.nombre)}</h2>
        <p class="tienda-maker">Marca de ${S(e.fabricante)}</p>
        <dl class="tienda-specs">
          <div><dt>Presentación</dt><dd>${S(e.presentacion)}</dd></div>
          <div><dt>Precio</dt><dd>${S(ur(e))}</dd></div>
        </dl>
        ${n?`<div class="tienda-qty" role="group" aria-label="Cantidad de ${S(e.nombre)}">
              <button type="button" data-tienda="restar" data-id="${e.id}" aria-label="Restar un ${S(e.nombre)}">−</button>
              <output aria-live="off">${n}</output>
              <button type="button" data-tienda="sumar" data-id="${e.id}" aria-label="Sumar un ${S(e.nombre)}" ${n>=ar?`disabled`:``}>+</button>
            </div>`:`<button class="tienda-add" type="button" data-tienda="sumar" data-id="${e.id}">Sumar al pedido</button>`}
      </div>
    </article>
  `}function pr(e){let t=rr.filter(t=>e[t.id]);return`
    <h2 id="carrito-titulo">Tu pedido ${t.length?`<span class="tienda-count">${lr(e)}</span>`:``}</h2>
    ${t.length?`<ul class="tienda-cart-list">
          ${t.map(t=>`
            <li>
              <div class="tienda-cart-name"><strong>${S(t.nombre)}</strong><span>${S(t.para)}</span></div>
              <div class="tienda-qty tienda-qty--small" role="group" aria-label="Cantidad de ${S(t.nombre)}">
                <button type="button" data-tienda="restar" data-id="${t.id}" data-donde="carrito" aria-label="Restar un ${S(t.nombre)}">−</button>
                <output>${e[t.id]}</output>
                <button type="button" data-tienda="sumar" data-id="${t.id}" data-donde="carrito" aria-label="Sumar un ${S(t.nombre)}" ${e[t.id]>=ar?`disabled`:``}>+</button>
              </div>
              <button class="tienda-remove" type="button" data-tienda="quitar" data-id="${t.id}" data-donde="carrito">Quitar<span class="visually-hidden"> ${S(t.nombre)}</span></button>
            </li>
          `).join(``)}
        </ul>
        <p class="tienda-cart-note">Sin pago online: te confirmamos presentación, precio y disponibilidad por WhatsApp.</p>
        <button class="tienda-order" type="button" data-tienda="pedir">${h(`message`)}<span>Pedir por WhatsApp</span></button>`:`<p class="tienda-empty">Todavía no sumaste productos.</p>`}
  `}function mr(){let e=sr();return`
    <div class="tienda-page">
      <header class="tienda-bar">
        <a class="tienda-brand" href="/tienda" data-link aria-label="${S(nr.nombre)}, ${S(nr.aliado)}">
          <span class="tienda-logo" aria-hidden="true">${h(`shoppingBag`)}</span>
          <span><strong>${S(nr.nombre)}</strong><small>${S(nr.aliado)}</small></span>
        </a>
        <a class="tienda-cart-link" href="/tienda#carrito" data-link>
          ${h(`shoppingBag`)}<span>Pedido</span><b data-tienda-badge>${lr(e)}</b>
        </a>
      </header>

      <main class="tienda-main">
        <a class="tienda-back" href="/" data-link>← Volver a Paseos Juan</a>
        <section class="tienda-hero" aria-labelledby="tienda-titulo">
          <p class="tienda-eyebrow">Alimento y productos</p>
          <h1 id="tienda-titulo">Para perros y gatos.</h1>
          <p>DogPro y CatPro, de ${S(nr.fabricante)}. Armá tu pedido y mandalo por WhatsApp.</p>
        </section>

        <section class="tienda-grid" aria-label="Productos" data-tienda-productos>
          ${rr.map(t=>fr(t,e)).join(``)}
        </section>

        <p class="tienda-health">${h(`heartPulse`)}<span>Si tu mascota tiene alguna condición de salud, consultá antes con su veterinario.</span></p>

        <section class="tienda-cart" id="carrito" aria-labelledby="carrito-titulo" tabindex="-1" data-tienda-carrito>
          ${pr(e)}
        </section>
        <p class="visually-hidden" data-tienda-status role="status" aria-live="polite"></p>
      </main>

      <footer class="tienda-footer">
        <p><strong>${S(nr.nombre)}</strong> · ${S(nr.aliado)}</p>
        <p>DogPro y CatPro son marcas de ${S(nr.fabricante)}, usadas con su autorización.</p>
        <a href="/" data-link>Volver a Paseos Juan</a>
      </footer>
    </div>
  `}function hr(e,t){let n=document.querySelector(`[data-tienda-productos]`),r=document.querySelector(`[data-tienda-carrito]`);if(!n||!r)return;n.innerHTML=rr.map(t=>fr(t,e)).join(``),r.innerHTML=pr(e);let i=document.querySelector(`[data-tienda-badge]`);i&&(i.textContent=lr(e));let a=t.donde===`carrito`?r:n;(a.querySelector(`[data-tienda="${t.action}"][data-id="${t.id}"]:not([disabled])`)||a.querySelector(`[data-id="${t.id}"]:not([disabled])`)||(t.donde===`carrito`?r:n.querySelector(`[data-id="${t.id}"]`)))?.focus()}function gr(e){let t=document.querySelector(`[data-tienda-status]`);t&&(t.textContent=e)}function _r(e){let t=e.target.closest?.(`[data-tienda]`);if(!t)return;let n=t.dataset.tienda,r=sr();if(n===`pedir`){if(!lr(r))return;window.open(m(dr(r)),`_blank`,`noopener`),gr(`Se abrió WhatsApp con tu pedido: solo falta tocar Enviar.`);return}let i=t.dataset.id,a=rr.find(e=>e.id===i);if(!a)return;let o=r[i]||0;n===`sumar`&&(r[i]=Math.min(ar,o+1)),n===`restar`&&(r[i]=Math.max(0,o-1)),n===`quitar`&&(r[i]=0),r[i]||delete r[i],cr(r),hr(r,{action:n,id:i,donde:t.dataset.donde||`productos`}),gr(r[i]?`${a.nombre}: ${r[i]} en tu pedido.`:`Sacaste ${a.nombre} del pedido.`)}function vr(){document.addEventListener(`click`,_r)}var yr=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),br={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function xr(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function Sr(){let e=g.user();if(e)return Cr(e);br.necesitaConfiguracion===null&&!br.cargando&&(br.cargando=!0,g.status().then(e=>{br.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{br={...br,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{br.cargando=!1,$()}));let t=br.necesitaConfiguracion===!0;return re(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${br.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
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
        <p class="acc-status ${br.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${yr(br.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function Cr(e){return re(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${yr(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${yr(e.usuario)}</strong> (${yr(e.rol)}).</p>
        <div class="acc-actions">
          ${nt(e.rol)===`/`?``:`<a class="acc-button" href="${nt(e.rol)}" data-link>Ir a mi panel</a>`}
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
  `)}function wr(){return re(`
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
  `)}function Tr(e){let t=g.user(),n=et[t?.rol]||[];return re(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${yr(t?.nombre)}</strong> (${yr(t?.rol)}) y la página de ${yr(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function Er(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function Dr(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return Er(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return Er(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return Er(t,`Completá usuario y PIN.`,!0);i.disabled=!0,Er(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await g.changePin(r.actual,r.nuevo);t.reset(),Er(t,`Listo: tu PIN quedó cambiado.`),nt(e.rol)!==`/`&&setTimeout(()=>kx(nt(e.rol)),900);return}let e=n===`setup`?await g.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin,codigo:r.codigo}):await g.login(r.usuario,r.pin);if(br={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){kx(`/login`);return}let i=xr();kx(i&&(et[e.rol]||[]).includes(i.slice(1))?i:nt(e.rol))}catch(e){Er(t,e instanceof Qe?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function Or(){document.addEventListener(`submit`,Dr)}async function kr(){let e=document.querySelector(`[data-acc-google]`),t=e?.querySelector(`[data-acc-google-boton]`);e&&t&&!t.dataset.montado&&(t.dataset.montado=`1`,e.hidden=!await xt(t,async e=>{let t=document.querySelector(`[data-acc-status]`);try{t&&(t.textContent=`Entrando con Google…`);let n=await g.loginGoogle(e);kx(n.debeCambiarPin?`/login`:nt(n.rol))}catch(e){t&&(t.textContent=e.message,t.classList.add(`is-error`))}},{texto:`signin_with`}).catch(()=>!1))}new MutationObserver(()=>kr()).observe(document.getElementById(`app`)||document.body,{childList:!0,subtree:!0});var Ar={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},jr=`Tu perro`,Mr={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},Nr=[`Pequeño`,`Mediano`,`Grande`],Pr=On.filter(e=>e!==`Domingo`),Fr={Mañana:b.manana,Tarde:b.tarde};function Ir(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Lr(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function Rr(){let e=Ir(Ar.plan,null);if(!e||typeof e!=`object`)return{...Mr};let t=kn.find(t=>t.id===e.planId)?e.planId:Mr.planId,n=Nr.includes(e.size)?e.size:Mr.size,r=Fr[e.shift]?e.shift:Mr.shift,i=Array.isArray(e.days)?Pr.filter(t=>e.days.includes(t)):Mr.days;return{planId:t,size:n,shift:r,days:i.length?i:Mr.days}}function zr(){let e=Ir(Ar.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function Br(){let e=Ir(Ar.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function Vr(e){let t=Ir(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function Hr(){let e=Ir(Ar.carnet,null);return e&&typeof e.name==`string`?e:null}function C(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Ur(e){return`https://wa.me/${Tn.whatsapp}?text=${encodeURIComponent(e)}`}function Wr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function Gr(e,t){return new Date(e.getTime()+t*864e5)}function Kr(e){return On[(e.getUTCDay()+6)%7]}function qr(e){return e.toISOString().slice(0,10)}function Jr(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function Yr(e){let[t,n,r]=e.split(`-`).map(Number);return Jr(new Date(Date.UTC(t,n-1,r)))}function Xr(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function Zr(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function Qr(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function $r(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function ei(e,t,n){return`${e} ${e===1?t:n}`}function ti(){let e=Rr(),t=kn.find(t=>t.id===e.planId),n=Fr[e.shift],r=zr(),i=Wr(),a=qr(i.date),o=Br().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||jr}}function ni(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=Kr(r.date),s=Zr(n.from),c=Zr(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function ri(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=Gr(a.date,e);r.days.includes(Kr(t))&&(e===0&&a.minutes>Zr(i.to)||n&&o.has(qr(t))||s.push(t))}return s}var ii=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],ai=ii.flatMap(e=>e.fields);function oi(e,t){return!!String(e[t]??``).trim()}function si(e,t){return t.fields.filter(t=>oi(e,t.key)).length}function ci(e){return ai.filter(t=>oi(e,t.key)).length}function li(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function ui(e){let{ficha:t}=e,n=[],r=ii.find(e=>e.id===`emergencia`);si(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),Hr()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=ci(t);return i<ai.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${ai.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function di(e){return e.todayIso<=r.until}var fi={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function pi(e,t,n=``){fi.status[e]={message:t,html:n}}function mi(e){let t=fi.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${C(t.message)} ${t.html}`.trim():``}</p>`}function hi(){return`
    <div class="cl-page" data-cl-root>
      ${gi(ti())}
    </div>
  `}function gi(e){return`
    <p class="cl-demo-note">
      ${h(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${_i(e)}
    ${xi(e)}
    ${Ci()}
    ${wi(e)}
    ${Ti(e)}
    ${Ei(e)}
    <div class="cl-two-col">
      ${ji()}
      ${Mi(e)}
    </div>
    ${di(e)?Ni():``}
    ${Pi()}
  `}function _i(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=ni(e),c=li(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=ri(e,1)[0],d=u&&qr(u)===e.todayIso,f=ui(e),p={libre:`Los días de paseo de tu plan son ${$r(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${h(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${C(a)}</strong>
            <small>${C(i.name)} · ${C(r.size)} · Turno ${C(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${C(Kr(t.date))} ${Jr(t.date)}</p>
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
          <p class="cl-fine">El estado sigue el horario del turno. El seguimiento en vivo todavía no está disponible. Horario exacto de retiro: <strong>${y}</strong> (te lo confirmamos por WhatsApp).</p>
        `:``}
        <div data-cl-region="alertas-hoy">${yi(c,!0)}</div>
        ${bi(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${h(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:C(Kr(u))}</p>
            <p class="cl-next-date">${d?`${C(Kr(u))} ${Jr(u)}`:Jr(u)}</p>
            <p class="cl-next-shift">Turno ${C(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${y}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${vi(e,f)}</div>
        </article>
      </div>
    </section>
  `}function vi(e,t=ui(e)){return t.length?`
    <ol class="cl-pending-list">
      ${t.map((e,t)=>`
        <li>
          <button type="button" class="cl-pending-item" data-cl-go="${e.go}">
            <span class="cl-pending-num" aria-hidden="true">${t+1}</span>
            <span>
              <strong>${C(e.text)}</strong>
              <small>${C(e.detail)}</small>
            </span>
            ${h(`arrowRight`,`cl-icon-sm`)}
          </button>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="cl-all-done">${h(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function yi(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${h(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${C(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function bi(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=Gr(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${On.map((e,t)=>Gr(a,t)).map(e=>{let t=qr(e),a=Kr(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${Jr(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${Qr(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function xi(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${h(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${Ur(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${h(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${C(Tn.whatsappLabel)}</small></span>
      </a>
      ${di(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${h(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${C(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function Si(){return`Ahora: tema ${Ae()?`oscuro`:`claro`} · movimiento ${je()?`calmo (sin movimiento)`:`normal`}.`}function Ci(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${h(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${Si()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function wi(e){let t=ri(e,10);return`
    <section class="cl-card cl-section" id="cl-ausencia" aria-labelledby="cl-ausencia-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${h(`bell`,`cl-icon`)}</span>
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
                ${t.map(t=>`<option value="${qr(t)}">${C(Kr(t))} ${Jr(t)} · turno ${C(e.settings.shift.toLowerCase())}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-absence-reason"><span>Motivo <span class="cl-optional">(opcional)</span></span>
              <input id="cl-absence-reason" type="text" maxlength="140" placeholder="Por ejemplo: viaje" data-cl-absence-reason />
            </label>
            <button type="button" class="cl-btn" data-cl-absence-save>
              ${h(`message`,`cl-icon-sm`)} Avisar por WhatsApp
            </button>
            <p class="cl-fine">Se abre WhatsApp con el mensaje listo: solo tenés que tocar Enviar. El aviso también queda anotado en este dispositivo.</p>
          `:`<p>${y}: no hay próximos paseos con los días de tu plan.</p>`}
          ${mi(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${C(Kr(Xr(e.date)))} ${Yr(e.date)}</strong>
                    ${e.reason?`<small>${C(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${C(e.date)}" aria-label="Quitar la ausencia del ${Yr(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function Ti(e){let{plan:t,settings:n,shift:r}=e,i=An[n.size],a=n.days.length===t.walks;return`
    <section class="cl-card cl-section" id="cl-plan" aria-labelledby="cl-plan-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${h(`calendarCheck`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-plan-title" class="cl-h2" tabindex="-1">Tu plan</h2>
          <p>Precios oficiales por semana y por perro, según el tamaño.</p>
        </div>
      </header>

      <div class="cl-plan-summary">
        <div class="cl-plan-main">
          <p class="cl-eyebrow">Plan contratado (ejemplo)</p>
          <p class="cl-plan-name">${C(t.name)}</p>
          <p class="cl-plan-walks">${ei(t.walks,`paseo`,`paseos`)} por semana · ${C(n.size)}</p>
          <p class="cl-plan-price"><b>${Rn(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${Pr.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${Qr(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${C(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${y}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${h(`alertCircle`,`cl-icon-sm`)} El ${C(t.name)} incluye ${ei(t.walks,`paseo`,`paseos`)} por semana y hay ${ei(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${C(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${kn.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${C(e.name)}</strong>
            <span>${ei(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${Rn(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${C(n.size.toLowerCase())}):</strong> individual ${Rn(i.individual)} · en grupo ${Rn(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${jn.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${fi.openGroups.has(`plan`)?`open`:``}>
        <summary>${h(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${kn.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${C(e.name)} · ${ei(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${Nr.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(Fr).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${Pr.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${mi(`plan`)}
        </div>
      </details>
    </section>
  `}function Ei(e){let{ficha:t}=e,n=ci(t),r=ai.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${h(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${C(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${y}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${Di(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${C(Mn[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${y}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${yi(li(t))}</div>

      <div class="cl-ficha-groups">
        ${ii.map(e=>ki(e,t)).join(``)}
      </div>
      ${mi(`ficha`)}
    </section>
  `}function Di(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function Oi(e,t){let n=si(e,t);return n===t.fields.length?`<span class="cl-count is-done">${h(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${y.toLowerCase()}</span>`}function ki(e,t){let n=fi.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${h(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${Oi(t,e)}</span>
        ${h(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>Ai(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function Ai(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${y}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${C(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${C(e.placeholder||`Pendiente de confirmar`)}">${C(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${C(r)}" placeholder="${C(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${oi(t,e.key)?``:y}</small>`:``}
    </label>
  `}function ji(){let e=Hr();return`
    <section class="cl-card cl-section" id="cl-vacunas" aria-labelledby="cl-vacunas-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${h(e?`fileCheck`:`uploadCloud`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-vacunas-title" class="cl-h2" tabindex="-1">Carnet de vacunas</h2>
          <p>Subí una foto o PDF del carnet. Lo revisamos antes de los paseos en grupo.</p>
        </div>
      </header>
      <div class="cl-upload">
        <input id="cl-vaccine-file" class="cl-file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" data-cl-file="carnet" />
        <label for="cl-vaccine-file" class="cl-upload-box">
          ${h(`fileUp`,`cl-icon`)}
          <strong>${e?`Cambiar archivo`:`Elegir foto o PDF`}</strong>
          <small>JPG, PNG o PDF</small>
        </label>
      </div>
      <dl class="cl-file-status">
        <div><dt>Archivo</dt><dd>${e?C(e.name):`Sin archivo`}</dd></div>
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${C(e.date)}`:y}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${Ur(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${h(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${mi(`carnet`)}
    </section>
  `}function Mi(e){let t=Vr(Ar.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${h(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${Rn(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${Ur(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
        ${h(`message`,`cl-icon-sm`)} Pedir alias y detalle por WhatsApp
      </a>
      <div class="cl-upload">
        <input id="cl-receipt-file" class="cl-file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" data-cl-file="comprobante" />
        <label for="cl-receipt-file" class="cl-upload-box is-small">
          ${h(`receipt`,`cl-icon`)}
          <strong>Subir comprobante</strong>
          <small>JPG, PNG o PDF</small>
        </label>
      </div>
      ${t.length?`
        <ul class="cl-list" aria-label="Comprobantes cargados">
          ${t.slice(0,5).map(e=>`
            <li>
              <span><strong>${C(e.name)}</strong><small>Cargado el ${C(e.date)} · Pendiente de confirmación</small></span>
            </li>
          `).join(``)}
        </ul>
        <a class="cl-btn is-secondary" href="${Ur(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${h(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${mi(`comprobante`)}
    </section>
  `}function Ni(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${h(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${C(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${C(r.title)}</h2>
        <p>${C(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${Ur(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function Pi(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${h(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${fi.resetArmed?`is-danger`:``}" data-cl-reset>
        ${fi.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${mi(`privacidad`)}
    </section>
  `}function Fi(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=gi(ti()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function Ii(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=ti();Object.entries({pendientes:()=>vi(t),"alertas-hoy":()=>yi(li(t.ficha),!0),"alertas-ficha":()=>yi(li(t.ficha)),"ficha-progreso":()=>Di(ci(t.ficha),ai.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),ii.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=Oi(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=oi(t.ficha,e.dataset.clFieldState)?``:y})}function Li(e,t,n=``){pi(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${C(t)} ${n}`.trim())}function Ri(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,fi.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:je()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function zi(){return Jr(Wr().date)}function Bi(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return Ri(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=ti(),r=Br().filter(t=>t.date!==e);r.push({date:e,reason:t}),Lr(Ar.ausencias,r);let i=Ur([`Hola, aviso que ${n.dogName===jr?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${Kr(Xr(e)).toLowerCase()} ${Yr(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),pi(`ausencia`,`Listo: anotamos la ausencia del ${Yr(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),Fi(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return Lr(Ar.ausencias,Br().filter(t=>t.date!==e)),pi(`ausencia`,`Quitamos la ausencia del ${Yr(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),Fi(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=kn.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(Li(`plan`,`El ${r.name} incluye ${ei(r.walks,`paseo`,`paseos`)} por semana: elegí ${ei(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(Lr(Ar.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),pi(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),Fi(`[data-cl-plan-save]`),!0):(Li(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return fi.resetArmed?(Object.values(Ar).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),fi.resetArmed=!1,fi.status={},pi(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),Fi(`[data-cl-reset]`),!0):(fi.resetArmed=!0,Fi(`[data-cl-reset]`),!0);if(fi.resetArmed&&!e.target.closest(`[data-cl-reset]`)){fi.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function Vi(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:zi()};if(t.dataset.clFile===`carnet`)Lr(Ar.carnet,n),pi(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),Fi(`[data-cl-status='carnet']`);else{let t=[n,...Vr(Ar.comprobantes)].slice(0,10);Lr(Ar.comprobantes,t),pi(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),Fi(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=zr();Li(`ficha`,Lr(Ar.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function Hi(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=zr();Lr(Ar.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),Ii()}function Ui(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?fi.openGroups.add(t.dataset.clDetails):fi.openGroups.delete(t.dataset.clDetails))}function Wi(){pe.push(Bi),me.push(Vi),document.addEventListener(`input`,Hi),document.addEventListener(`toggle`,Ui,!0),Me(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${Si()} Se guarda solo en este dispositivo.`)})}var Gi=`America/Argentina/Buenos_Aires`,Ki=`paseosJuan_paseador_progreso`,qi=`paseosJuan_paseador_equipo`,Ji=`paseosJuan_paseador_incidente`,Yi=`paseosJuan_paseador_ruta`,w=[{label:`Retiro`,button:`Retiré`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Foto`,button:`Foto del paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,button:`Entregué`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],Xi=[`fotoPaseoId`,`fotoPendiente`,`sinFotoPaseo`,`horaIntegrado`,`horaIntegradoPor`,`horaIntegradoPorNombre`,`devuelvePor`,`devuelvePorNombre`],Zi={pendiente:0,retirado:1,paseando:2,entregado:3},Qi=`no-sale`,$i={Mañana:`manana`,Tarde:`tarde`},ea=/^[a-z0-9][a-z0-9_.-]{0,60}$/i,ta=/^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+$/i,na={Mañana:b.manana,Tarde:b.tarde},ra=[`Se soltó`,`Se escapó`,`Pelea entre perros`,`Mordió`,`Lo mordieron`,`Gruñó o ladró`,`Se lastimó`,`Comió algo`,`Otro`],ia=[`Bajo`,`Medio`,`Alto`],aa=[`Sí`,`No`],oa=`Perro externo`,sa=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,ca=[`Qué pasó`,`Perros`,`Lesión`],la=[{item:`Botiquín`,label:`Botiquín`,sub:`agua oxigenada y gasa`,icon:`briefcaseMedical`},{item:`Botella bebedero`,label:`Botella bebedero`,icon:`droplets`},{item:`Bolsas`,label:`Bolsas`,icon:`shoppingBag`},{item:`Celular cargado`,label:`Celular cargado`,icon:`phone`}],ua=2,da=40,fa=[`Raspón`,`Corte chico`,`Pata`,`Otro`],pa=[`Dividan los perros y pasen de a grupos`,`Calmá a los que se alteran`],ma=Nn.filter(e=>e.sebastian>0),ha=Nn.filter(e=>e.sebastian===0&&e.juan>0),ga=Nn.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0),_a=[{title:`Para pasear`,test:/correa|pechera|cintur|muslera|gancho/i,icon:`pawPrint`},{title:`Seguridad`,test:/bozal/i,icon:`shieldCheck`},{title:`Agua y cuidado`,test:/bebedero|cepillo|tijera/i,icon:`droplets`}],va=Wn(),T={tab:`ruta`,day:null,shift:null,detailId:``,open:{done:!1,more:!1,message:!1,help:!1},confirmClear:!1,incidentStatus:``,incidentWarn:!1,incidentSavedText:``,equipStatus:``,syncError:``,routeChange:null,toast:null,photoBusy:{},walkBusy:{},helper:{picks:[],cure:null,herd:!1,status:``}},ya={title:`Paseos Juan`,shift:``};function E(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function ba(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function xa(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Sa(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim().toLowerCase()}var Ca={phone:`<rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" />`,more:`<circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" />`,check:`<path d="m5 12.5 4.5 4.5L19 7.5" />`,arrowLeft:`<path d="M19 12H5" /><path d="m11 6-6 6 6 6" />`,undo:`<path d="M9 14 4 9l5-5" /><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />`};function D(e,t=`pw-icon`){return Ca[e]?`<svg class="${t}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${Ca[e]}</svg>`:h(e,t)}function wa(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Gi,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:Ln(t)}}function Ta(e){let[t,n,r]=String(e).split(`-`);return r?`${r}/${n}/${t}`:e}function Ea(e,t){let n=(On.indexOf(e)-On.indexOf(t.day)+7)%7,[r,i,a]=t.iso.split(`-`).map(Number);return new Date(Date.UTC(r,i-1,a+n)).toISOString().slice(0,10)}function Da(e){return e.minutes<810?`Mañana`:`Tarde`}function O(){let e=wa(),t=T.day||e.day,n=T.shift||Da(e),r=t===e.day;return{now:e,day:t,shift:n,isToday:r,iso:r?e.iso:Ea(t,e)}}function Oa(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function ka(e){let t=na[e];return`${t.from} a ${t.to}`}function Aa(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}function ja(e){if(e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t} h ${n} min`:`${t} h`}function Ma(e,t){let n=Aa(e);if(n===null)return{text:`Sin hora`,kind:`idle`};let r=n-t;return r>0?{text:`En ${ja(r)}`,kind:r<=10?`soon`:`ok`}:r===0?{text:`Ahora`,kind:`soon`}:{text:`${ja(-r)} tarde`,kind:`late`}}function Na(e,t){let n=Ma(e,t);return`<span class="pw-cd pw-cd--${n.kind}" data-pw-countdown="${E(e)}">${E(n.text)}</span>`}function Pa(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function Fa(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function Ia(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${Oa(i)}`),t=t.filter(e=>!e.includes(r))}return n}function La(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function Ra(e){return e.safety.some(e=>/bozal/i.test(e))}function za(e){return(String(e||`?`).trim()[0]||`?`).toUpperCase()}function Ba(){return g.user()||{}}function Va(){return Ba().nombre||`equipo`}function Ha(){return Ba().rol===`ayudante`}function Ua(e){let t=Ba();if(!e||!t.usuario)return!1;let n=Sa(e);return n===Sa(t.usuario)||t.nombre&&n===Sa(t.nombre)}function Wa(e,t=new Map){if(!e)return``;if(Ua(e))return Ba().nombre||String(e);let n=String(e);return t.get(n)||t.get(Sa(n))||En.find(e=>e.id===Sa(n))?.name||n}function Ga(e,t){return Sa(e)===Sa(t)}function Ka(e){return Sa(e).startsWith(`tarde`)?`Tarde`:`Mañana`}function qa(e){return x.find(t=>t.id===e.perroId)||x.find(t=>Sa(t.name)===Sa(e.perroNombre))||{id:ea.test(String(e.perroId||``))?String(e.perroId):``,name:String(e.perroNombre||`Perro sin nombre`),size:y,minutes:null,safety:[],status:`Activo`,unknown:!0}}function Ja(e,t){let n=(Array.isArray(e.paradas)?e.paradas:[]).filter(e=>e&&(e.perroId||e.perroNombre)).map((e,t)=>{let n=qa(e),r=Number(e.minutos)||n.minutes||null,i=Aa(e.hora)===null?``:String(e.hora).trim().padStart(5,`0`);return{index:t,dog:n,hora:i,minutos:r,salida:i&&r?Hn(i,r):``,nota:String(e.nota||``).trim(),canSave:!!n.id}}).sort((e,t)=>(Aa(e.hora)??9999)-(Aa(t.hora)??9999)||e.index-t.index);return{ruta:String(e.ruta||`Pendiente de confirmar`),turno:Ka(e.turno),dia:e.dia||``,paseador:String(e.paseador||``),ayudante:String(e.ayudante||``),supervisor:String(e.supervisor||``),notas:String(e.notas||``),fuente:t,record:e,stops:n}}function Ya(e,t,n){let r=new Map;_.cached(`rutas`,{desde:n}).filter(t=>t.fecha===e&&t.ruta&&Array.isArray(t.paradas)).sort((e,t)=>String(e.actualizadoEn||``).localeCompare(String(t.actualizadoEn||``))).forEach(e=>r.set(e.ruta,e));let i=_.cached(`plantillas`).filter(e=>e.ruta&&Array.isArray(e.paradas)),a=i.length===0,o=new Map;return(a?va:i).filter(e=>Ga(e.dia,t)).forEach(e=>o.set(e.ruta,Ja(e,a?`planilla`:`plantilla`))),r.forEach((e,t)=>o.set(t,Ja(e,`dia`))),[...o.values()].sort((e,t)=>e.turno===t.turno?e.ruta.localeCompare(t.ruta):e.turno===`Mañana`?-1:1)}function Xa(e){let t=ba(Yi,{})?.[Ba().usuario||``];return t&&t.iso===e.iso&&t.turno===e.shift?t.ruta:``}function Za(e,t){let n=ba(Yi,{}),r=n&&typeof n==`object`?n:{};r[Ba().usuario||``]=t?{iso:e.iso,turno:e.shift,ruta:t}:null,xa(Yi,r)}function Qa(e){let t=Ya(e.iso,e.day,e.now.iso),n=t.filter(t=>t.turno===e.shift),r=n.filter(e=>Ua(e.paseador)||Ua(e.ayudante)),i=t.filter(t=>t.turno!==e.shift&&(Ua(t.paseador)||Ua(t.ayudante))),a=r.length?``:n.some(t=>t.ruta===Xa(e))?Xa(e):``,o=r.length?r:a?n.filter(e=>e.ruta===a):n;return{all:t,ofShift:n,mine:r,elsewhere:i,picked:a,shown:o,assigned:r.length>0,helping:r.find(e=>Ua(e.ayudante)&&!Ua(e.paseador))||null,fromPlanilla:o.some(e=>e.fuente===`planilla`)}}function $a(e){return e.flatMap(e=>e.stops.map(t=>({...t,route:e})))}function eo(e,t){return $a(Qa(e).shown).find(e=>e.dog.id===t)||null}var to=new Map;function no(e,t){if(!e.isToday||!Eo.ready)return;let n=[];t.forEach(r=>{let i=`${e.iso}|${r.turno}|${r.ruta}`,a=new Map(r.stops.map(e=>[e.dog.id||Sa(e.dog.name),e])),o=to.get(i);if(to.set(i,a),!o)return;let s=[...a.entries()].filter(([e])=>!o.has(e)).map(([,e])=>`${e.dog.name}${e.hora?` (${e.hora})`:``}`),c=[...o.entries()].filter(([e])=>!a.has(e)).map(([,e])=>e.dog.name),l=[...a.entries()].filter(([e,t])=>o.has(e)&&o.get(e).hora!==t.hora).map(([e,t])=>`${t.dog.name} ${o.get(e).hora||`sin hora`} → ${t.hora||`sin hora`}`),u=[];s.length&&u.push(`+ ${Oa(s)}`),c.length&&u.push(`− ${Oa(c)}`),l.length&&u.push(`hora: ${Oa(l)}`),u.length&&n.push(`${t.length>1?`${r.ruta}: `:``}${u.join(` · `)}`)}),n.length&&(T.routeChange={text:n.join(`. `),time:e.now.time},Qs(`La ruta cambió: ${T.routeChange.text}`))}function ro(e){return _.cached(`avisos`).filter(t=>{let n=String(t.fecha||``),r=String(t.vigenteHasta||``);return n&&n>e?!1:r?r>=e:n===e}).sort((e,t)=>String(t.actualizadoEn||t.fecha||``).localeCompare(String(e.actualizadoEn||e.fecha||``)))}function io(e,{full:t=!1}={}){return`
    <ul class="pw-notices" role="list">
      ${e.map(e=>{let n=/seguridad|perro suelto/i.test(e.tipo||``);return`
          <li class="pw-notice ${n?`pw-notice--danger`:``}">
            ${D(n?`alertTriangle`:`mapPin`,`pw-icon`)}
            <div>
              <p class="pw-notice-head"><strong>${E(e.barrio||`Barrio sin cargar`)}</strong>${e.tipo?` · ${E(e.tipo)}`:``}</p>
              <p>${E(e.mensaje||e.titulo||``)}</p>
              ${t?`<p class="pw-notice-meta">${e.vigenteHasta?`Hasta el ${E(Ta(e.vigenteHasta))}`:`Solo hoy`}${e.creadoPorNombre?` · ${E(e.creadoPorNombre)}`:``}</p>`:``}
            </div>
          </li>
        `}).join(``)}
    </ul>
  `}function ao(e,t,n){return`${e}_${t}_${$i[n]}`}function oo(e,t,n=Ba().usuario){return`${e}_${n||`sin-usuario`}_${$i[t]}`}var so=new Map;function co(e,t){let n=new Map(_.cached(e,{desde:t}).map(e=>[e.id,e]));return so.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function lo(e){let t=w.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===Qi;return{step:r?0:Math.max(Zi[e.estado]??0,n),noSale:r,times:t,record:e}}function uo(e,t,n){let r=co(`paseos`,e);return Object.fromEntries(n.filter(e=>e.id).map(n=>[n.id,lo(r.get(ao(e,n.id,t)))]))}function fo(e,t){return t.dog.id&&e[t.dog.id]||lo(null)}function po(e,t){let n=e.filter(e=>fo(t,e).noSale).length,r=e.filter(e=>!fo(t,e).noSale&&fo(t,e).step>=w.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function mo(){return Ha()?la.map(e=>e.item):ma.map(e=>e.item)}function ho(e,t){let n=co(`checklists`,e).get(oo(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:mo().filter(e=>r[e]===!0)}}function go(e){let t=new Map,n=(e,n)=>{e&&n&&t.set(String(e),String(n))};return[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]].forEach(([e,t])=>{_.cached(e,t).forEach(e=>{n(e.creadoPor,e.creadoPorNombre),n(e.actualizadoPor,e.actualizadoPorNombre),w.forEach(t=>n(e[`${t.field}Por`],e[`${t.field}PorNombre`])),n(e.horaIntegradoPor,e.horaIntegradoPorNombre),n(e.devuelvePor,e.devuelvePorNombre),n(e.paseador,e.paseadorNombre),n(e.ayudante,e.ayudanteNombre)})}),t}function _o(e,t){return e?Ua(e)?`vos`:Wa(e,t):y}function vo(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Gi,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function yo(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se envía solo.`;if(!e.actualizadoEn)return``;let n=vo(e.actualizadoEn);return`Último cambio: ${_o(e.actualizadoPor,t)}${n?`, ${n}`:``}`}function bo(e,t,n){let r=w[t].field,i=e?.[`${r}Por`];return!i||Ua(i)?``:e[`${r}PorNombre`]||Wa(i,n)}var xo=Promise.resolve();function So(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``,i=r?{...so.get(r)||{},...n}:null;r&&so.set(r,i);let a=xo.then(async()=>{let n=typeof t==`function`?t():t;try{let t=await _.save(e,n);return T.syncError&&=``,t}catch(e){return T.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,$s(T.syncError),null}finally{r&&so.get(r)===i&&so.delete(r),rc()}});return xo=a.catch(()=>null),a}function Co(e,t,n){let r=t.now.iso,i={id:ao(r,e.dog.id,t.shift),fecha:r,perroId:e.dog.id,perroNombre:e.dog.name,turno:t.shift,ruta:e.route.ruta,...n};return So(`paseos`,i,{optimisticRecord:i})}function wo(e){let t=e.record||{},n={estado:t.estado||`pendiente`};return w.forEach(e=>{n[e.field]=t[e.field]||``,n[`${e.field}Por`]=t[`${e.field}Por`]||``,n[`${e.field}PorNombre`]=t[`${e.field}PorNombre`]||``}),Xi.forEach(e=>{n[e]=[`fotoPendiente`,`sinFotoPaseo`].includes(e)?t[e]===!0:t[e]||``}),n}function To(e,t){let n=e.now.iso,r=mo(),i=Object.fromEntries(r.map(e=>[e,t.includes(e)])),a={id:oo(n,e.shift),fecha:n,turno:e.shift,items:i,completo:r.every(e=>t.includes(e))};return So(`checklists`,a,{optimisticRecord:a})}var Eo={key:``,stops:[],ready:!1};function Do(e){let t=`${e}|${Ba().usuario||``}`;if(Eo.key===t)return;Eo.stops.forEach(e=>e()),Eo.key=t,Eo.stops=[],Eo.ready=!1;let n=[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]];Promise.allSettled(n.map(([e,t])=>_.list(e,t))).then(t=>{let n=t.find(e=>e.status===`rejected`);return n&&(T.syncError=`No se pudieron traer los datos del equipo: ${n.reason?.message||`error del servidor`}`,$s(T.syncError)),jo(e)}).catch(()=>null).finally(()=>{Eo.key===t&&(Eo.ready=!0,rc(),Eo.stops=n.map(([e,t])=>_.watch(e,t)))})}var Oo=!1;function ko(){!Oo&&g.token()&&(Oo=!0,_.watch(`fotos`))}var Ao=!1;async function jo(e){if(Ao)return;Ao=!0;let t=ba(Ki,null),n=ba(qi,null);if(!t&&!n)return;let r=[],i=co(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&$i[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=x.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=ao(e,t,o),c=lo(i.get(s)),l=Math.min(n.length,w.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:w[l-1].estado};w.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(So(`paseos`,u,{optimisticRecord:u}))})});let a=co(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!$i[o]||!Array.isArray(n))return;let s=n.filter(e=>mo().includes(e));s.length&&!a.has(oo(e,o))&&r.push(To({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(Ki),localStorage.removeItem(qi)}catch{}r.length&&Qs(`Se subió al equipo lo que tenías marcado en este celular.`)}}function Mo(){let e=ba(Ji,{})||{},t={"No se ven":`No`,"No sé":``},n=e.lesiones in t?t[e.lesiones]:e.lesiones;return{step:[1,2,3].includes(e.step)?e.step:1,tipos:Array.isArray(e.tipos)?e.tipos.filter(e=>ra.includes(e)):[],detalle:typeof e.detalle==`string`?e.detalle:String(e.conducta||``),dogs:Array.isArray(e.dogs)?e.dogs.filter(e=>typeof e==`string`):[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,accion:e.accion||``,despues:e.despues||``,riesgo:ia.includes(e.riesgo)?e.riesgo:``,lesiones:aa.includes(n)?n:``,protocolo:Array.isArray(e.protocolo)?e.protocolo.filter(e=>Number.isInteger(e)):[],registroId:typeof e.registroId==`string`?e.registroId:``,enviado:e.enviado===!0,urgente:e.urgente===!0}}function No(e){let t={...Mo(),...e};return xa(Ji,t),t}function Po(e){return!!(e.tipos.length||e.detalle.trim()||e.dogs.length||e.lesiones||e.riesgo||e.antes||e.accion||e.despues||e.lugar)}function Fo(e){return[e.tipos.join(`, `),e.detalle.trim()].filter(Boolean).join(`. `)}function Io(e){if(!e?.id)return``;let t=_t.de(e.id);return t&&ta.test(t)?t:``}function Lo(e){return _.cached(`fotos`).find(t=>t.id===e||t.perroId===e)||null}function Ro(e,t){let n=Io(e);return`
    <span class="pw-ava pw-ava--${t} ${n?`has-photo`:``}" aria-hidden="true">
      ${n?`<img src="${E(n)}" alt="" />`:`<span class="pw-ava-initial">${E(za(e.name))}</span>`}
    </span>
  `}function zo(e,t,n=``){let r=!!T.photoBusy[e.id];return`
    <label class="pw-photo-btn ${n} ${r?`is-busy`:``}">
      <input class="pw-file" type="file" accept="image/*" capture="environment" data-pw-photo="${E(e.id)}" ${r?`disabled`:``} aria-label="${E(`${t}: ${e.name}`)}" />
      ${D(`camera`,`pw-icon pw-icon--sm`)}<span>${r?`Subiendo…`:E(t)}</span>
    </label>
  `}function Bo(e,t,n){if(e.id&&!Io(e)){let r=!!T.photoBusy[e.id];return`
      <label class="pw-ava-btn pw-ava-btn--${t} ${r?`is-busy`:``}">
        <input class="pw-file" type="file" accept="image/*" capture="environment" data-pw-photo="${E(e.id)}" data-pw-where="${n}" ${r?`disabled`:``} aria-label="${E(`Sacar foto: ${e.name}`)}" />
        ${Ro(e,t)}
        <span class="pw-ava-cam">${D(`camera`,`pw-icon pw-icon--xs`)}<span>${r?`…`:`Foto`}</span></span>
      </label>
    `}return e.id?`
    <button class="pw-ava-btn pw-ava-btn--${t}" type="button" data-pw-open="${E(e.id)}" data-pw-where="${n}-foto" aria-label="${E(`Ver ${e.name}`)}">
      ${Ro(e,t)}
    </button>
  `:`<span class="pw-ava-btn pw-ava-btn--${t}">${Ro(e,t)}</span>`}async function Vo(e,t){if(!t||!e)return;let n=(x.find(t=>t.id===e)||$a(Qa(O()).shown).find(t=>t.dog.id===e)?.dog)?.name||e;if(typeof navigator<`u`&&navigator.onLine===!1)Qo(`Sin señal: la foto necesita señal.`);else{T.photoBusy[e]=!0,rc(),Qs(`Subiendo la foto de ${n}…`);try{Qo((await _t.subir(e,n,t))?.pendiente?`Foto de ${n}: se envía con señal.`:`Foto de ${n} guardada.`)}catch(e){T.syncError=`La foto no se subió: ${e?.message||`error del servidor`}`,$s(T.syncError)}finally{delete T.photoBusy[e],rc()}}}function Ho(e){return`
    <div class="pw-shell ${T.detailId?`has-sheet`:``}" data-pw-screen="${T.tab}">
      ${Ko()}
      ${e}
    </div>
  `}function Uo(){let e=O();Do(e.now.iso),ko();let t=Qa(e);no(e,t.shown),Bc.iso=e.now.iso,Bc.shift=Da(e.now),Bc.minute=e.now.minutes;let n=Wo(e,t),{stops:r}=n;ya=Go(n);let i=({ruta:es,equipo:Fs,incidente:Ls,mas:Vs}[T.tab]||es)(n);return T.detailId&&!r.some(e=>e.dog.id===T.detailId)&&(T.detailId=``),`
    <main class="pw-main" id="pw-main">
      ${Yo()}
      ${i}
    </main>
    ${T.detailId?Ps(n):``}
    <div class="pw-toast-slot" data-pw-toast-slot>${Xo()}</div>
    ${Jo(n)}
  `}function Wo(e=O(),t=Qa(e)){let n=$a(t.shown);return{sel:e,plan:t,stops:n,progress:e.isToday?uo(e.iso,e.shift,n.map(e=>e.dog)):{},names:go(e.now.iso)}}function Go({sel:e,plan:t,names:n}){let r=t.mine[0]||(t.shown.length===1?t.shown[0]:null),i=Va();return t.helping?i=`Con ${Wa(t.helping.paseador,n)||`paseador sin asignar`} · ${t.helping.ruta}`:r&&t.assigned?i=`${Va()} · ${t.mine.map(e=>e.ruta).join(` + `)}`:r&&(i=`${Va()} · ${r.ruta}`),{title:i,shift:e.isToday?e.shift:`${e.day.slice(0,3)} · ${e.shift}`}}function Ko(){let e=_.pendingCount()+wt.pendientes();return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, ${Ha()?`ayudante de paseador`:`paseador`}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
      </a>
      <p class="pw-head-title"><strong>${E(ya.title)}</strong></p>
      ${e?`<span class="pw-head-sync" role="img" aria-label="${e} ${e===1?`cambio espera`:`cambios esperan`} señal">${D(`uploadCloud`,`pw-icon pw-icon--sm`)}${e}</span>`:``}
      <span class="pw-head-chip">${E(ya.shift)}</span>
    </header>
  `}var qo=[{id:`ruta`,label:`Ruta`,icon:`route`},{id:`equipo`,label:`Equipo`,icon:`clipboardCheck`},{id:`incidente`,label:`Incidente`,icon:`alertTriangle`},{id:`mas`,label:`Más`,icon:`more`}];function Jo({sel:e,stops:t}){let n=e.isToday&&t.length&&ho(e.now.iso,e.shift).checked.length<mo().length,r=ro(e.now.iso).length,i=Mo(),a={equipo:n?`!`:``,mas:r?String(r):``,incidente:Po(i)&&!i.enviado?`•`:``};return`
    <nav class="pw-tabbar" aria-label="Secciones">
      ${qo.map(e=>`
        <button class="pw-tab pw-tab--${e.id} ${T.tab===e.id?`is-active`:``}" type="button" data-pw-tab="${e.id}" ${T.tab===e.id?`aria-current="page"`:``}>
          <span class="pw-tab-icon">${D(e.icon,`pw-icon`)}${a[e.id]?`<b class="pw-tab-badge" aria-hidden="true">${E(a[e.id])}</b>`:``}</span>
          <span class="pw-tab-label">${e.label}</span>
        </button>
      `).join(``)}
    </nav>
  `}function Yo(){let e=_.pendingCount(),t=wt.pendientes(),n=typeof navigator<`u`&&navigator.onLine===!1,r=[];if(e||t||n){let i=t?` ${D(`camera`,`pw-icon pw-icon--sm pw-inline-icon`)}<b data-pw-photos-pending>${t} ${t===1?`foto por subir`:`fotos por subir`}</b>.`:``;r.push(`
      <p class="pw-sync-msg pw-sync-msg--offline">${D(`uploadCloud`,`pw-icon`)}
        <span>${e?`Sin señal: ${e} ${e===1?`cambio se envía solo`:`cambios se envían solos`}.`:n?`Sin señal: seguí marcando, se envía solo.`:`Subiendo lo pendiente.`}${i}</span>
      </p>
    `)}return T.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${D(`alertTriangle`,`pw-icon`)}
        <span>${E(T.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-dismiss-error aria-label="Cerrar aviso">${D(`x`,`pw-icon pw-icon--sm`)}</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function Xo(){return T.toast?`
    <div class="pw-toast">
      ${D(`checkCircle`,`pw-icon`)}
      <span>${E(T.toast.text)}</span>
      ${T.toast.undo?`<button class="pw-toast-undo" type="button" data-pw-toast-undo>${D(`undo`,`pw-icon pw-icon--sm`)}Deshacer</button>`:``}
    </div>
  `:``}var Zo=0;function Qo(e,t=null){clearTimeout(Zo),T.toast={text:e,undo:t},Qs(e),$o(),Zo=setTimeout(()=>{T.toast=null,$o()},t?5e3:3500)}function $o(){let e=document.querySelector(`[data-pw-toast-slot]`);e&&(e.innerHTML=Xo())}function es(e){let{sel:t,plan:n,stops:r,progress:i}=e;if(Ha()&&t.isToday&&n.shown.length)return Ts(e);let a=os(r,i,t),o=po(r,i),s=o.toWalk?Math.round(o.delivered/o.toWalk*100):100,c=ro(t.now.iso);return`
    <section class="pw-screen" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${t.isToday?`Hoy`:E(t.day)}${T.shift||!t.isToday?` · ${E(t.shift)}`:``}</h1>
        ${t.isToday&&r.length?`<span class="pw-title-count" aria-label="${o.delivered} de ${o.toWalk} entregados">${D(`checkCircle`,`pw-icon pw-icon--sm`)}${o.delivered}/${o.toWalk}</span>`:``}
      </div>
      ${t.isToday&&r.length?`<span class="pw-progress-bar" aria-hidden="true"><span style="width:${s}%"></span></span>`:``}
      ${ns()}
      ${rs(t)}
      ${is(t,n)}
      ${n.shown.length?`
        ${vs(a,e)}
        ${as(e)}
        ${c.length?io(c):``}
        ${xs(a,e)}
        ${Ss(a,e)}
      `:`${ts(t,n)}${c.length?io(c):``}`}
      ${n.fromPlanilla?`<p class="pw-source">${D(`alertCircle`,`pw-icon pw-icon--sm`)}Ruta de la planilla: falta que la confirme el coordinador.</p>`:``}
    </section>
  `}function ts(e,t){let n=e.shift===`Mañana`?`Tarde`:`Mañana`;return`
    <div class="pw-empty">
      ${D(`route`,`pw-icon pw-icon--lg`)}
      <p><strong>Sin ruta ${e.isToday?`hoy`:`el ${e.day.toLowerCase()}`} a la ${e.shift.toLowerCase()}.</strong></p>
      <p>Si te pidieron un paseo, avisale al coordinador.</p>
      <div class="pw-row">
        ${t.elsewhere.length?``:`<button class="pw-btn pw-btn--ghost" type="button" data-pw-shift="${n}">Ver ${n.toLowerCase()}</button>`}
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-tab="mas">${D(`calendarCheck`,`pw-icon`)}Otro día</button>
      </div>
    </div>
  `}function ns(){return T.routeChange?`
    <div class="pw-change" data-pw-change>
      ${D(`route`,`pw-icon`)}
      <p><strong>Cambió la ruta (${E(T.routeChange.time)})</strong> ${E(T.routeChange.text)}</p>
      <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-change-ok>OK</button>
    </div>
  `:``}function rs(e){return!T.day&&!T.shift?``:`
    <div class="pw-planning">
      ${D(`calendarCheck`,`pw-icon`)}
      <p>${e.isToday?`Otro turno`:`No es hoy: solo para mirar`}</p>
      <button class="pw-btn pw-btn--primary pw-btn--sm" type="button" data-pw-today>Volver a hoy</button>
    </div>
  `}function is(e,t){let n=[];if(!t.assigned&&t.elsewhere.length){let e=t.elsewhere[0];n.push(`
      <button class="pw-strip pw-strip--info" type="button" data-pw-shift="${e.turno}">
        ${D(`route`,`pw-icon`)}<span>Tu ruta: <b>${E(e.ruta)}</b> (${e.turno.toLowerCase()})</span>${D(`arrowRight`,`pw-icon pw-icon--sm`)}
      </button>
    `)}return!t.assigned&&t.ofShift.length>1&&n.push(`
      <div class="pw-route-pick" role="group" aria-labelledby="pw-route-pick-label">
        <p id="pw-route-pick-label"><strong>¿Qué ruta hacés?</strong></p>
        <div class="pw-chip-row">
          ${t.ofShift.map(e=>`
            <button type="button" class="pw-chip ${t.picked===e.ruta?`is-active`:``}" data-pw-route="${E(e.ruta)}" aria-pressed="${t.picked===e.ruta}">
              ${E(e.ruta)}<small>${e.stops.length} ${e.stops.length===1?`perro`:`perros`}</small>
            </button>
          `).join(``)}
          <button type="button" class="pw-chip ${t.picked?``:`is-active`}" data-pw-route="" aria-pressed="${!t.picked}">Todas<small>${t.ofShift.length}</small></button>
        </div>
      </div>
    `),n.join(``)}function as({sel:e,plan:t,stops:n}){let r=[],i=n.map(e=>e.dog),a=Fa(i);a.length&&r.push(`<p class="pw-strip pw-strip--danger">${D(`alertTriangle`,`pw-icon`)}<span><b>No juntar:</b> ${E(Ia(a).join(` · `))}</span></p>`);let o=i.filter(Ra);if(o.length){let e=!Ha()&&o.length>ga;r.push(`<p class="pw-strip pw-strip--warn">${D(`shieldCheck`,`pw-icon`)}<span><b>Bozal:</b> ${E(Oa(o.map(e=>e.name)))}${e?` · tenés ${ga}, avisá a Juan`:``}</span></p>`)}let s=n.filter(e=>e.dog.status!==`Activo`);if(s.length&&r.push(`<p class="pw-strip pw-strip--warn">${D(`alertCircle`,`pw-icon`)}<span><b>Confirmar antes de retirar:</b> ${E(Oa(s.map(e=>e.dog.name)))}</span></p>`),e.isToday&&n.length){let t=ho(e.now.iso,e.shift).checked.length,n=mo().length;t<n&&r.push(`
        <button class="pw-strip pw-strip--idle" type="button" data-pw-tab="equipo">
          ${D(`clipboardCheck`,`pw-icon`)}<span><b>Equipo ${t}/${n}</b></span>${D(`arrowRight`,`pw-icon pw-icon--sm`)}
        </button>
      `)}let c=t.shown.filter(e=>e.notas).map(e=>`${t.shown.length>1?`${e.ruta}: `:``}${e.notas}`),l=r.slice(0,3),u=e.isToday&&!Ha()?ws(e,t):``;return u&&l.push(u),c.length&&l.push(`<p class="pw-strip pw-strip--info">${D(`fileText`,`pw-icon`)}<span><b>Nota:</b> ${E(c.join(` · `))}</span></p>`),l.length?`<div class="pw-strips">${l.join(``)}</div>`:``}function os(e,t,n){let r=[],i=[];if(e.forEach(e=>{let a=fo(t,e),o={stop:e,state:a};if(!n.isToday)return r.push({...o,kind:`plan`,time:e.hora});if(!e.canSave)return r.push({...o,kind:`blocked`,time:e.hora});if(a.noSale)return i.push({...o,kind:`nosale`,time:e.hora});if(a.step>=w.length)return i.push({...o,kind:`done`,time:a.times[w.length-1]});if(a.step===0)return r.push({...o,kind:`pickup`,time:e.hora});let s=a.record?.devuelvePor&&!Ua(a.record.devuelvePor);return a.step===1?r.push({...o,kind:`photo`,handoff:s,time:a.times[0]||e.hora}):r.push({...o,kind:`deliver`,handoff:s,time:cs(e,a)})}),n.isToday){let e=e=>({photo:0,deliver:1,pickup:2})[e.kind]??3,t=e=>e.kind===`blocked`?2:+!!e.handoff;r.sort((n,r)=>t(n)-t(r)||(Aa(n.time)??9999)-(Aa(r.time)??9999)||e(n)-e(r))}return{active:r,done:i}}function ss(e,t){return t.isToday?e.active.find(e=>e.kind!==`blocked`&&!e.handoff)||e.active.find(e=>e.kind!==`blocked`)||null:e.active[0]||null}function cs(e,t){let n=t.times[0]||t.times[1];return!n||!e.minutos||Aa(n)===null?e.salida:Hn(n,e.minutos)}function ls(e,t){return!t.isToday||![`pickup`,`deliver`].includes(e.kind)?!1:Ma(e.time,t.now.minutes).kind===`late`}function us(e,t){return!t.isToday||![`pickup`,`deliver`].includes(e.kind)||Aa(e.time)===null?``:`data-pw-due="${E(e.time)}" data-pw-late="${+!!ls(e,t)}"`}function ds(e,t){let{kind:n,state:r}=e,i;return i=n===`plan`?{tone:`idle`,text:`Planificado`}:n===`blocked`?{tone:`warn`,text:`Sin id`}:n===`nosale`?{tone:`idle`,text:`No sale`}:n===`done`?{tone:`ok`,text:`Entregado${e.time?` ${e.time}`:``}`}:n===`photo`?{tone:`run`,text:`Retirado${r.times[0]?` ${r.times[0]}`:``}`}:ls(e,t)?{tone:`late`,text:n===`deliver`?`Entrega tarde`:`Atrasado`}:n===`deliver`?{tone:`run`,text:`En paseo`}:{tone:`idle`,text:`Pendiente`},`<span class="pw-chip-st pw-chip-st--${i.tone}">${E(i.text)}</span>`}function fs(e,t,{thumb:n=!0,compact:r=!1}={}){let i=e.state?.record;if(!i||e.state.noSale)return``;let a=e.state.step,o=[],s=(e,n)=>{if(Ua(e))return``;let i=String(n||Wa(e,t)||``);return r?i.split(/\s+/)[0]:i},c=n&&a>=2?_c(i):``;if(c&&o.push(`<span class="pw-walkthumb"><img src="${E(c)}" alt="Foto del paseo" /></span>`),i.fotoPendiente===!0&&a>=2&&o.push(`<span class="pw-chip-st pw-chip-st--warn">${D(`uploadCloud`,`pw-icon pw-icon--xs`)}Foto por subir</span>`),a>=w.length&&!pc(i)&&(i.sinFotoPaseo===!0||!i.horaPaseo)&&o.push(`<span class="pw-chip-st pw-chip-st--warn">${D(`camera`,`pw-icon pw-icon--xs`)}Sin foto del paseo</span>`),i.horaIntegrado&&a<w.length){let e=s(i.horaIntegradoPor,i.horaIntegradoPorNombre);o.push(`<span class="pw-chip-st pw-chip-st--ok">${D(`users`,`pw-icon pw-icon--xs`)}${E(e?`Integrado por ${e}`:`Integrado`)}</span>`)}if(i.devuelvePor&&a<w.length){let e=s(i.devuelvePor,i.devuelvePorNombre);o.push(`<span class="pw-chip-st pw-chip-st--run">${D(`arrowRight`,`pw-icon pw-icon--xs`)}${E(e?`Lo entrega ${e}`:`Lo entregás vos`)}</span>`)}return a>=w.length&&i.horaEntregaPor&&!Ua(i.horaEntregaPor)&&o.push(`<span class="pw-chip-st pw-chip-st--soft">${E(`Lo entregó ${s(i.horaEntregaPor,i.horaEntregaPorNombre)}`)}</span>`),o.join(``)}function ps(e,t,{long:n=!1,compact:r=!1}={}){let i=[];return e.status!==`Activo`&&i.push(`<span class="pw-chip-st pw-chip-st--warn">Confirmar</span>`),((e.safety||[]).some(e=>Pa(e)===`danger`)||t.length)&&i.push(`<span class="pw-chip-st pw-chip-st--late">${D(`alertTriangle`,`pw-icon pw-icon--xs`)}No juntar${t.length&&!r?`: ${E(Oa(t))}`:``}</span>`),Ra(e)&&i.push(`<span class="pw-chip-st pw-chip-st--warn">${D(`shieldCheck`,`pw-icon pw-icon--xs`)}Bozal</span>`),e.unknown&&i.push(`<span class="pw-chip-st pw-chip-st--warn">Nuevo</span>`),n&&(e.safety||[]).filter(e=>Pa(e)===`info`).forEach(e=>i.push(`<span class="pw-chip-st pw-chip-st--soft">${E(e)}</span>`)),i.join(``)}function ms(e,t){return La(e.dog,Fa(t.map(e=>e.dog)))}function hs(e,t){let{state:n}=e;for(let e=Math.min(n.step,w.length)-1;e>=0;--e){let r=bo(n.record,e,t);if(r)return`${w[e].done}: ${r}`;if(n.times[e])return``}return``}function gs(e,t,{size:n=`xl`,ghost:r=!1}={}){let{stop:i,kind:a}=e;if(![`pickup`,`deliver`,`photo`].includes(a))return``;if(a===`photo`&&!r)return _s(i,t,n);let o=a===`pickup`,s=Eo.ready?o?`Retiré`:`Entregué`:`Cargando…`;return`
    <button class="pw-btn ${r?`pw-btn--ghost`:`pw-btn--go`} pw-btn--${n} ${o?``:`pw-btn--deliver`}" type="button" data-pw-step="${E(i.dog.id)}" data-pw-where="${t}" ${Eo.ready?``:`aria-disabled="true"`} aria-label="${E(`${o?`Retiré`:`Entregué`}: ${i.dog.name}`)}">
      ${D(o?`pawPrint`:`check`,`pw-icon`)}${s}
    </button>
  `}function _s(e,t,n=`xl`,{ghost:r=!1,label:i=``}={}){let a=e.dog.id,o=!!T.walkBusy[a],s=o||!Eo.ready,c=o?`Guardando…`:i||(n===`row`?`Foto`:`Foto del paseo`);return`
    <label class="pw-btn ${r?`pw-btn--ghost`:`pw-btn--go`} pw-btn--${n} pw-walk-btn ${o?`is-busy`:``}" ${s?`aria-disabled="true"`:``}>
      <input class="pw-file" type="file" accept="image/*" capture="environment" data-pw-walkphoto="${E(a)}" data-pw-where="${t}" ${s?`disabled`:``} aria-label="${E(`Foto del paseo: ${e.dog.name}`)}" />
      ${D(`camera`,`pw-icon`)}<span>${E(c)}</span>
    </label>
  `}function vs(e,t){let{sel:n,stops:r,names:i}=t,a=ss(e,n);if(!a)return e.done.length?`
      <article class="pw-hero pw-hero--done">
        ${D(`checkCircle`,`pw-icon pw-icon--xl`)}
        <h2>Ruta completa</h2>
        <p>¡Buen trabajo!</p>
      </article>
    `:``;let{stop:o,kind:s}=a,{dog:c}=o,l=ls(a,n),u={pickup:`Retirar`,deliver:`Entregar`,photo:`Foto del paseo`,plan:`Primer retiro`}[s],d=hs(a,i),f=Cs(o),p=s===`pickup`?e.active.filter(e=>e!==a&&e.kind===`pickup`&&e.time&&e.time===a.time):[];return`
    <article class="pw-hero pw-hero--${s} ${l?`is-late`:``}" aria-labelledby="pw-hero-name" ${us(a,n)}>
      <div class="pw-hero-top">
        ${Bo(c,`xl`,`hero`)}
        <div class="pw-hero-info">
          <p class="pw-hero-kicker">${u}${r.length&&ys(t)?` · ${E(o.route.ruta)}`:``}</p>
          <h2 class="pw-hero-name" id="pw-hero-name">
            <button class="pw-link" type="button" data-pw-open="${E(c.id)}" data-pw-where="hero-name" ${c.id?``:`disabled`}>${E(c.name)}</button>
          </h2>
          <p class="pw-hero-time">${E(a.time||`Sin hora`)}</p>
          ${n.isToday&&s!==`photo`?Na(a.time,n.now.minutes):``}
        </div>
      </div>
      <div class="pw-chips">${s===`pickup`?``:ds(a,n)}${fs(a,i)}${ps(c,ms(o,r))}</div>
      ${d?`<p class="pw-hero-note">${D(`users`,`pw-icon pw-icon--sm`)}${E(d)}</p>`:``}
      ${f?`<p class="pw-hero-note">${D(`fileText`,`pw-icon pw-icon--sm`)}${E(f)}</p>`:``}
      ${p.length?`<p class="pw-hero-note">${D(`clock`,`pw-icon pw-icon--sm`)}A la misma hora: ${E(Oa(p.map(e=>e.stop.dog.name)))}</p>`:``}
      ${n.isToday?`
        <div class="pw-hero-actions">
          ${gs(a,`hero`)}
        </div>
        <div class="pw-hero-more">
          ${s===`pickup`?`<button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-nosale="${E(c.id)}" ${Eo.ready?``:`aria-disabled="true"`}>${D(`x`,`pw-icon pw-icon--sm`)}No sale</button>`:``}
          ${s===`photo`?gs(a,`hero-more`,{size:`sm`,ghost:!0}):``}
          <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-open="${E(c.id)}" data-pw-where="hero-detail">${D(`eye`,`pw-icon pw-icon--sm`)}Detalle</button>
        </div>
      `:``}
    </article>
  `}function ys({plan:e}){return e.shown.length>1}function bs(e,t,{actions:n=!0}={}){let{sel:r,stops:i,names:a}=t,{stop:o,kind:s}=e,{dog:c}=o,l=ls(e,r),u=ys(t),d=n&&r.isToday&&!e.handoff;return`
    <li class="pw-row-card pw-row-card--${s} ${l?`is-late`:``}" ${us(e,r)}>
      ${Bo(c,`md`,`row`)}
      ${c.id?`<button class="pw-row-body" type="button" data-pw-open="${E(c.id)}" data-pw-where="row">`:`<div class="pw-row-body">`}
        <span class="pw-row-name">${E(c.name)}</span>
        <span class="pw-row-meta"><b class="pw-row-time">${E(e.time||`--:--`)}</b>${u?`<small>${E(o.route.ruta)}</small>`:``}${ds(e,r)}</span>
        <span class="pw-row-chips">${fs(e,a,{compact:!0})}${ps(c,ms(o,i),{compact:!0})}</span>
      ${c.id?`</button>`:`</div>`}
      ${d?`<div class="pw-row-act">${gs(e,`row`,{size:`row`})}</div>`:``}
    </li>
  `}function xs(e,t){let{sel:n}=t,r=ss(e,n),i=e.active.filter(e=>e!==r);return i.length?`
    <section class="pw-list" aria-labelledby="pw-next-title">
      <h2 class="pw-list-title" id="pw-next-title">Siguientes <span class="pw-count">${i.length}</span></h2>
      <ol class="pw-rows" role="list">
        ${i.map(e=>bs(e,t)).join(``)}
      </ol>
      ${i.some(e=>e.kind===`blocked`)?`<p class="pw-source">${D(`alertCircle`,`pw-icon pw-icon--sm`)}"Sin id": no se puede marcar. Avisá al coordinador.</p>`:``}
    </section>
  `:``}function Ss(e,t){if(!e.done.length)return``;let n=T.open.done;return`
    <section class="pw-list pw-list--done">
      <button class="pw-fold" type="button" data-pw-fold="done" aria-expanded="${n}" aria-controls="pw-done-list">
        ${D(`checkCircle`,`pw-icon`)}<span>Listos <span class="pw-count is-ok">${e.done.length}</span></span>${D(`chevronDown`,`pw-icon pw-fold-icon`)}
      </button>
      <ol class="pw-rows" role="list" id="pw-done-list" ${n?``:`hidden`}>
        ${e.done.map(e=>bs(e,t,{actions:!1})).join(``)}
      </ol>
    </section>
  `}function Cs(e){return!e.nota||/^bozal$/i.test(e.nota)&&Ra(e.dog)||/^no juntar/i.test(e.nota)&&e.dog.safety.some(e=>Pa(e)===`danger`)?``:e.nota}function ws(e,t){let n=t.shown.filter(e=>e.ayudante&&!Ua(e.ayudante));if(!n.length)return``;let r=go(e.now.iso),i=n.map(t=>({hora:Dc(Ec(e.now.iso,e.shift,t.ayudante)).pop()||``,who:Wa(t.ayudante,r)})).sort((e,t)=>(Aa(t.hora)??-1)-(Aa(e.hora)??-1))[0];return i.hora?`<p class="pw-strip pw-strip--info">${D(`droplets`,`pw-icon`)}<span><b>Última agua ${E(i.hora)}</b> · ${E(i.who)}</span></p>`:`<p class="pw-strip pw-strip--idle">${D(`droplets`,`pw-icon`)}<span><b>Agua:</b> todavía no</span></p>`}function Ts(e){if(T.helper.herd)return Ns(e);if(T.helper.cure)return Ms(e);let{sel:t}=e,n=Sc(e);return`
    <section class="pw-screen pw-helper" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">Manada</h1>
        <span class="pw-title-count" aria-label="${n.active.length} ${n.active.length===1?`perro`:`perros`} en la manada">${D(`pawPrint`,`pw-icon pw-icon--sm`)}${n.active.length}</span>
      </div>
      ${ns()}
      ${rs(t)}
      ${Es(n,e)}
      ${Ds(n,e)}
      ${Os(n,t)}
      ${ks(n)}
      ${As(n)}
      ${as(e)}
      ${js(n)}
    </section>
  `}function Es(e,t){return e.toIntegrate.length?`
    <section class="pw-hsec" aria-labelledby="pw-int-title">
      <h2 class="pw-list-title" id="pw-int-title">Integrar <span class="pw-count">${e.toIntegrate.length}</span></h2>
      <p class="pw-hint">${D(`users`,`pw-icon pw-icon--sm`)}Que se olfateen y caminá la primera cuadra con él</p>
      ${e.toIntegrate.map(({stop:e,state:n})=>{let{dog:r}=e,i=bo(n.record,0,t.names);return`
          <article class="pw-hcard">
            <div class="pw-hcard-top">
              ${Bo(r,`xl`,`int`)}
              <div class="pw-hcard-info">
                <h3 class="pw-hcard-name">${E(r.name)}</h3>
                <p class="pw-hcard-meta">Retirado ${E(n.times[0]||``)}${i?` · ${E(i)}`:``}</p>
                <div class="pw-chips">${ps(r,ms(e,t.stops),{compact:!0})}</div>
              </div>
            </div>
            <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-integrate="${E(r.id)}" ${Eo.ready?``:`aria-disabled="true"`} aria-label="${E(`Integrado: ${r.name}`)}">${D(`check`,`pw-icon`)}Integrado</button>
          </article>
        `}).join(``)}
    </section>
  `:``}function Ds(e){return e.delivering.length?`
    <section class="pw-hsec" aria-labelledby="pw-dev-title">
      <h2 class="pw-list-title" id="pw-dev-title">Entregando <span class="pw-count">${e.delivering.length}</span></h2>
      <ol class="pw-rows" role="list">
        ${e.delivering.map(({stop:e,state:t})=>{let{dog:n}=e,r=cs(e,t);return`
            <li class="pw-row-card pw-row-card--deliver">
              ${Ro(n,`md`)}
              <div class="pw-row-body pw-row-body--static">
                <span class="pw-row-name">${E(n.name)}</span>
                ${r?`<span class="pw-row-meta"><b class="pw-row-time">${E(r)}</b></span>`:``}
              </div>
              <div class="pw-row-act">
                <button class="pw-btn pw-btn--go pw-btn--row" type="button" data-pw-step="${E(n.id)}" data-pw-where="ret" ${Eo.ready?``:`aria-disabled="true"`} aria-label="${E(`Entregado: ${n.name}`)}">${D(`check`,`pw-icon`)}Entregado</button>
              </div>
            </li>
          `}).join(``)}
      </ol>
      <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-return-cancel>${D(`undo`,`pw-icon pw-icon--sm`)}No los llevo</button>
    </section>
  `:``}function Os(e,t){let n=Ec(t.now.iso,t.shift),r=Dc(n),i=r[r.length-1]||``,a=jc(t,n),o=e.active.map(e=>e.state.times[0]).filter(e=>Aa(e)!==null).sort((e,t)=>Aa(e)-Aa(t))[0],s=i||o||``,c=s?t.now.minutes-Aa(s):null,l=a&&c!==null&&c>da&&e.active.length>0;return`
    <div class="pw-hact" role="group" aria-label="Tareas">
      <button class="pw-hact-btn pw-hact-btn--water ${l?`is-due`:``}" type="button" data-pw-water>
        ${D(`droplets`,`pw-icon`)}<span>Di agua</span>
      </button>
      <button class="pw-hact-btn pw-hact-btn--cure" type="button" data-pw-cure-open>
        ${D(`briefcaseMedical`,`pw-icon`)}<span>Curación</span>
      </button>
      <button class="pw-hact-btn pw-hact-btn--herd" type="button" data-pw-herd-open>
        ${D(`alertTriangle`,`pw-icon`)}<span>Otra manada</span>
      </button>
    </div>
    <div class="pw-water-row">
      <p class="pw-water-last" data-pw-water-last>${D(`droplets`,`pw-icon pw-icon--sm`)}${i?`Última agua: <b>${E(i)}</b>`:`Sin agua todavía`}</p>
      <button class="pw-pick pw-heat ${n?.calor===!0?`is-on`:``}" type="button" data-pw-heat aria-pressed="${n?.calor===!0}">Hace calor</button>
    </div>
    ${l?`<p class="pw-strip pw-strip--warn">${D(`droplets`,`pw-icon`)}<span>Hace calor: ${ja(c)} sin agua. Ofreceles.</span></p>`:``}
  `}function ks(e){if(!e.returnable.length)return``;let t=e.picks.length,n=e.room===0;return`
    <section class="pw-hsec" aria-labelledby="pw-ret-title">
      <h2 class="pw-list-title" id="pw-ret-title">Devolver <span class="pw-max">máx. ${ua}</span></h2>
      <div class="pw-dog-grid" role="group" aria-labelledby="pw-ret-title">
        ${e.returnable.map(({stop:r})=>{let{dog:i}=r,a=e.picks.includes(i.id);return`
            <button type="button" class="pw-dog-pick pw-ret-pick ${a?`is-on`:``}" data-pw-return-pick="${E(i.id)}" aria-pressed="${a}" ${n||!a&&t>=e.room?`aria-disabled="true"`:``}>
              ${Ro(i,`lg`)}
              <span>${E(i.name)}</span>
              <span class="pw-dog-pick-mark" aria-hidden="true">${a?D(`check`,`pw-icon pw-icon--sm`):``}</span>
            </button>
          `}).join(``)}
      </div>
      <p class="pw-status ${T.helper.status?`is-warn`:``}" role="status" data-pw-helper-status>${E(T.helper.status)}</p>
      <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-return-go ${t&&Eo.ready?``:`aria-disabled="true"`}>${D(`arrowRight`,`pw-icon`)}Voy a entregar${t?` (${t})`:``}</button>
    </section>
  `}function As(e){return e.noPhoto.length?`
    <section class="pw-hsec" aria-labelledby="pw-nophoto-title">
      <h2 class="pw-list-title" id="pw-nophoto-title">${D(`camera`,`pw-icon pw-icon--sm`)}Foto del paseo</h2>
      <div class="pw-row">
        ${e.noPhoto.map(({stop:e})=>_s(e,`nophoto`,`lg`,{ghost:!0,label:e.dog.name})).join(``)}
      </div>
    </section>
  `:``}function js(e){let t=e.next[0];if(!t)return``;let n=e.next.length-1;return`<p class="pw-source">${D(`clock`,`pw-icon pw-icon--sm`)}<span>Próximo retiro: <b>${E(t.stop.dog.name)}</b>${t.stop.hora?` ${E(t.stop.hora)}`:``}${n>0?` · ${n} más`:``}</span></p>`}function Ms(e){let t=T.helper.cure,n=Sc(e),r=n.active.length?n.active.map(e=>e.stop):e.stops.filter(e=>e.canSave),i=t.dogId?e.stops.find(e=>e.dog.id===t.dogId):null,a=`<button class="pw-btn pw-btn--danger pw-btn--xl" type="button" data-pw-cure-grave>${D(`alertTriangle`,`pw-icon`)}Es más grave</button>`,o;return o=i?`
      <div class="pw-cure-dog">
        ${Ro(i.dog,`md`)}
        <p class="pw-hcard-name">${E(i.dog.name)}</p>
      </div>
      <fieldset class="pw-q">
        <legend>¿Qué tiene?</legend>
        <div class="pw-chip-grid">
          ${fa.map(e=>`<button type="button" class="pw-pick ${t.tipos.includes(e)?`is-on`:``}" data-pw-cure-tipo="${E(e)}" aria-pressed="${t.tipos.includes(e)}">${E(e)}</button>`).join(``)}
        </div>
      </fieldset>
      <div class="pw-switch-list">
        <button class="pw-switch ${t.gasa?`is-on`:``}" type="button" data-pw-cure-gasa aria-pressed="${t.gasa}">
          <span class="pw-switch-icon">${D(`briefcaseMedical`,`pw-icon`)}</span>
          <span class="pw-switch-label">Agua oxigenada y gasa</span>
          <span class="pw-switch-mark" aria-hidden="true">${t.gasa?D(`check`,`pw-icon`):``}</span>
        </button>
      </div>
      <p class="pw-status ${T.helper.status?`is-warn`:``}" role="status" data-pw-helper-status>${E(T.helper.status)}</p>
      <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-cure-ok>${D(`check`,`pw-icon`)}Listo</button>
      ${a}
    `:`
      <fieldset class="pw-q">
        <legend>¿Qué perro?</legend>
        <div class="pw-dog-grid">
          ${r.map(e=>`
            <button type="button" class="pw-dog-pick pw-ret-pick" data-pw-cure-dog="${E(e.dog.id)}">
              ${Ro(e.dog,`lg`)}
              <span>${E(e.dog.name)}</span>
            </button>
          `).join(``)}
        </div>
      </fieldset>
      ${a}
    `,`
    <section class="pw-screen pw-cure" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${D(`briefcaseMedical`,`pw-icon`)}Curación</h1>
        <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-cure-back>${D(`arrowLeft`,`pw-icon pw-icon--sm`)}Volver</button>
      </div>
      ${o}
    </section>
  `}function Ns(e){let t=e.plan.helping||e.plan.shown[0],n=`Paseos Juan: se cruza otra manada${t?` (ruta ${t.ruta})`:``}. Dividamos los perros y pasemos de a grupos.`;return`
    <section class="pw-screen pw-herd" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${D(`alertTriangle`,`pw-icon`)}Otra manada</h1>
      </div>
      <ol class="pw-herd-lines">
        ${pa.map(e=>`<li>${E(e)}</li>`).join(``)}
      </ol>
      <a class="pw-btn pw-btn--ghost pw-btn--lg" href="https://wa.me/?text=${encodeURIComponent(n)}" target="_blank" rel="noopener noreferrer">${D(`message`,`pw-icon`)}Avisar al paseador</a>
      <button class="pw-btn pw-btn--primary pw-btn--xl" type="button" data-pw-herd-close>${D(`check`,`pw-icon`)}Listo</button>
    </section>
  `}function Ps(e){let{sel:t,stops:n,progress:r,names:i}=e,a=n.find(e=>e.dog.id===T.detailId);if(!a)return``;let{dog:o}=a,s=t.isToday?fo(r,a):lo(null),c=os([a],r,t),l=c.active[0]||c.done[0],u=Math.min(s.step,w.length),d=Lo(o.id),f=!!Io(o),p=o.safety.filter(e=>Pa(e)!==`info`),ee=ms(a,n),m=p.filter(e=>Pa(e)===`danger`).join(` `),h=ee.filter(e=>!m.includes(e)),te=Cs(a),ne=a.minutos||o.minutes,re=yo(s.record,i),ie=t.isToday&&a.canSave,ae=t.isToday&&ea.test(String(s.record?.fotoPaseoId||``))?String(s.record.fotoPaseoId):``,oe=t.isToday?_c(s.record):``;return`
    <div class="pw-sheet-backdrop" data-pw-close-sheet></div>
    <section class="pw-sheet" role="dialog" aria-modal="true" aria-labelledby="pw-sheet-title">
      <div class="pw-sheet-head">
        <span class="pw-sheet-photo">${Ro(o,`xl`)}</span>
        <div class="pw-sheet-id">
          <h2 id="pw-sheet-title" tabindex="-1">${E(o.name)}</h2>
          <p>${E(o.unknown?`Sin ficha`:o.size)} · ${ne?`${ne} min`:`Duración sin dato`}</p>
          <p class="pw-sheet-times">${D(`clock`,`pw-icon pw-icon--sm`)}${a.hora?`Retiro ${E(a.hora)}`:`Sin hora`}${l?.kind===`deliver`&&l.time?` · vuelve ${E(l.time)}`:l?.kind===`photo`&&cs(a,s)?` · vuelve ${E(cs(a,s))}`:a.salida?` · vuelve ${E(a.salida)}`:``}</p>
        </div>
        <button class="pw-sheet-close" type="button" data-pw-close-sheet aria-label="Cerrar">${D(`x`,`pw-icon`)}</button>
      </div>

      <div class="pw-sheet-photo-actions">
        ${o.id?zo(o,f?`Cambiar foto`:`Sacar foto`,`pw-btn pw-btn--ghost`):``}
        ${d?.archivoId?`<button class="pw-btn pw-btn--ghost" type="button" data-pw-photo-big="${E(d.archivoId)}">${D(`eye`,`pw-icon`)}Ver grande</button>`:``}
        ${ae?`<button class="pw-btn pw-btn--ghost pw-walk-view" type="button" data-pw-photo-big="${E(ae)}">${oe?`<span class="pw-walkthumb"><img src="${E(oe)}" alt="" /></span>`:D(`camera`,`pw-icon`)}Foto del paseo</button>`:``}
      </div>

      ${l?`<div class="pw-chips">${ds(l,t)}${fs(l,i,{thumb:!1})}${ps(o,ee,{long:!0})}</div>`:``}

      ${p.length||h.length||o.status!==`Activo`?`
        <ul class="pw-alerts" aria-label="Seguridad">
          ${o.status===`Activo`?``:`<li class="pw-alert pw-alert--warn">${D(`alertCircle`,`pw-icon`)}<span>${E(o.status)}: ${E(o.review||`su estado no es Activo.`)} Confirmalo antes de retirarlo.</span></li>`}
          ${p.map(e=>`<li class="pw-alert pw-alert--${Pa(e)}">${D(Pa(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}<span>${E(e)}</span></li>`).join(``)}
          ${h.length?`<li class="pw-alert pw-alert--danger">${D(`alertTriangle`,`pw-icon`)}<span>No juntar con ${E(Oa(h))}</span></li>`:``}
        </ul>
      `:``}
      ${te?`<p class="pw-sheet-line">${D(`fileText`,`pw-icon pw-icon--sm`)}<span><b>Nota de la ruta:</b> ${E(te)}</span></p>`:``}
      ${s.record?.nota?`<p class="pw-sheet-line">${D(`message`,`pw-icon pw-icon--sm`)}<span><b>Nota:</b> ${E(s.record.nota)}</span></p>`:``}
      ${o.review&&o.status===`Activo`?`<p class="pw-sheet-line pw-sheet-line--muted">${D(`help`,`pw-icon pw-icon--sm`)}<span>A confirmar: ${E(o.review)}</span></p>`:``}
      ${o.unknown?`<p class="pw-sheet-line pw-sheet-line--muted">${D(`help`,`pw-icon pw-icon--sm`)}<span>Perro nuevo: tamaño y alertas sin dato. Preguntale al coordinador.</span></p>`:``}
      ${!a.canSave&&t.isToday?`<p class="pw-sheet-line pw-sheet-line--muted">${D(`alertCircle`,`pw-icon pw-icon--sm`)}<span>Sin identificador en la ruta: no se puede marcar. Avisale al coordinador.</span></p>`:``}

      ${ie?`
        ${s.noSale?`<p class="pw-nosale">${D(`x`,`pw-icon`)}No sale este turno</p>`:`
          <ol class="pw-steps" aria-label="Avance">
            ${w.map((e,t)=>{let n=t<u?bo(s.record,t,i):``;return`
                <li class="${t<u?`is-done`:``} ${t===u?`is-next`:``}">
                  <span class="pw-step-dot" aria-hidden="true">${t<u?D(`check`,`pw-icon pw-icon--sm`):t+1}</span>
                  <span>${e.label}<small>${t<u?E(s.times[t]||(t===1?`sin foto`:`sin hora`)):`—`}</small>${n?`<small class="pw-step-who">${E(n)}</small>`:``}</span>
                  <span class="pw-sr">${t<u?`hecho`:`pendiente`}</span>
                </li>
              `}).join(``)}
          </ol>
        `}
        ${re?`<p class="pw-change-line ${s.record?.pendiente?`is-pending`:``}">${E(re)}</p>`:``}
        <div class="pw-sheet-actions">
          ${l&&!s.noSale?gs(l,`sheet`,{size:`lg`}):``}
          ${l?.kind===`photo`&&!s.noSale?gs(l,`sheet-deliver`,{size:`lg`,ghost:!0}):``}
          ${!s.noSale&&u===0?`<button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${E(o.id)}" ${Eo.ready?``:`aria-disabled="true"`}>${D(`x`,`pw-icon`)}No sale</button>`:``}
          ${s.noSale||u>0?`<button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${E(o.id)}" ${Eo.ready?``:`aria-disabled="true"`}>${D(`undo`,`pw-icon`)}Deshacer paso</button>`:``}
        </div>
      `:``}
      <p class="pw-sheet-foot">Categoría: <b>${E(o.category||`SIN EVALUAR`)}</b> · ${o.unknown?`sin ficha`:`Registro maestro 14/08/2026`}</p>
    </section>
  `}function Fs({sel:e,plan:t,stops:n,names:r}){let i=mo(),{checked:a,record:o}=ho(e.now.iso,e.shift),s=a.length>=i.length,c=yo(o,r),l=t.helping?Wa(t.helping.paseador,r):``,u=n.map(e=>e.dog).filter(Ra),d=!Ha()&&u.length>ga,f=({item:e,label:t,icon:n,qty:r,sub:i})=>{let o=a.includes(e);return`
      <button class="pw-switch ${o?`is-on`:``}" type="button" data-pw-equip="${E(e)}" aria-pressed="${o}">
        <span class="pw-switch-icon">${D(n,`pw-icon`)}</span>
        <span class="pw-switch-label">${E(t)}${r?` <small>×${r}</small>`:``}${i?`<small class="pw-switch-sub">${E(i)}</small>`:``}</span>
        <span class="pw-switch-mark" aria-hidden="true">${o?D(`check`,`pw-icon`):``}</span>
      </button>
    `},p;if(Ha())p=`<div class="pw-switch-grid">${la.map(e=>f(e)).join(``)}</div>`;else{let e=[..._a,{title:`Otros`,test:/.*/,icon:`packageCheck`}].map(e=>({...e,rows:[]}));ma.forEach(t=>e.find(e=>e.test.test(t.item)).rows.push(t)),p=e.filter(e=>e.rows.length).map(e=>`
      <fieldset class="pw-equip-group">
        <legend>${E(e.title)}</legend>
        <div class="pw-switch-list">
          ${e.rows.map(t=>f({item:t.item,label:t.item,icon:e.icon,qty:t.sebastian})).join(``)}
        </div>
      </fieldset>
    `).join(``)}return`
    <section class="pw-screen" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">Equipo</h1>
        <span class="pw-title-count ${s?`is-ok`:``}" aria-label="${a.length} de ${i.length} listo">${a.length}/${i.length}</span>
      </div>
      <p class="pw-sub">${Ha()?`Antes de salir${l?` con ${E(l)}`:``}`:`Antes de salir`} · ${E(e.shift.toLowerCase())}${e.isToday?``:` de hoy`}</p>
      ${d?`<p class="pw-strip pw-strip--warn">${D(`shieldCheck`,`pw-icon`)}<span>${u.length} con bozal y tenés ${ga}: avisá a Juan.</span></p>`:``}
      ${p}
      <div class="pw-equip-foot">
        ${s?`
          <p class="pw-ready">${D(`checkCircle`,`pw-icon pw-icon--lg`)}Listo para salir</p>
          <button class="pw-btn pw-btn--ghost pw-btn--sm" type="button" data-pw-equip-reset>Desmarcar</button>
        `:`
          <button class="pw-btn pw-btn--go pw-btn--xl" type="button" data-pw-equip-all>${D(`check`,`pw-icon`)}Listo</button>
        `}
      </div>
      ${c?`<p class="pw-change-line ${o?.pendiente?`is-pending`:``}">${E(c)}</p>`:``}
      ${!Ha()&&ha.length?`<p class="pw-source">${D(`users`,`pw-icon pw-icon--sm`)}Lo tiene Juan: ${ha.map(e=>`${E(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>`:``}
    </section>
  `}function Is(e,t){let n=e.map(e=>e.dog);return t.dogs.forEach(e=>{e!==oa&&!n.some(t=>t.name===e)&&n.push(x.find(t=>t.name===e)||{id:``,name:e,safety:[]})}),n}function Ls({sel:e}){let{stops:t}=Js(),n=Mo();if(n.enviado)return Rs(n,e);let r=n.step,i=T.incidentWarn,a=``;return a=r===1?`
      <p class="pw-strip pw-strip--danger">${D(`shieldCheck`,`pw-icon`)}<span><b>Primero la seguridad:</b> separá y revisá lesiones.</span></p>
      <fieldset class="pw-q">
        <legend>¿Qué pasó?</legend>
        <div class="pw-chip-grid">
          ${ra.map(e=>`
            <button type="button" class="pw-pick ${n.tipos.includes(e)?`is-on`:``}" data-pw-inc-tipo="${E(e)}" aria-pressed="${n.tipos.includes(e)}">${E(e)}</button>
          `).join(``)}
        </div>
      </fieldset>
      <label class="pw-field">Detalle <small>(opcional)</small>
        <input type="text" maxlength="160" data-pw-field="detalle" value="${E(n.detalle)}" placeholder="Ej.: tiró de la correa y gruñó" autocomplete="off" />
      </label>
    `:r===2?`
      <fieldset class="pw-q">
        <legend>¿Qué perros?</legend>
        <div class="pw-dog-grid">
          ${Is(t,n).map(e=>{let t=n.dogs.includes(e.name);return`
              <button type="button" class="pw-dog-pick ${t?`is-on`:``}" data-pw-inc-dog="${E(e.name)}" aria-pressed="${t}">
                ${Ro(e,`md`)}
                <span>${E(e.name)}</span>
                <span class="pw-dog-pick-mark" aria-hidden="true">${t?D(`check`,`pw-icon pw-icon--sm`):``}</span>
              </button>
            `}).join(``)}
          <button type="button" class="pw-dog-pick ${n.dogs.includes(oa)?`is-on`:``}" data-pw-inc-dog="${oa}" aria-pressed="${n.dogs.includes(oa)}">
            <span class="pw-ava pw-ava--md pw-ava--ext" aria-hidden="true">${D(`help`,`pw-icon`)}</span>
            <span>Otro perro</span>
            <span class="pw-dog-pick-mark" aria-hidden="true">${n.dogs.includes(oa)?D(`check`,`pw-icon pw-icon--sm`):``}</span>
          </button>
        </div>
      </fieldset>
    `:`
      <fieldset class="pw-q">
        <legend>¿Hubo lesión?</legend>
        <div class="pw-seg">
          ${aa.map(e=>`
            <button type="button" class="pw-pick pw-pick--big ${e===`Sí`?`pw-pick--danger`:``} ${n.lesiones===e?`is-on`:``}" data-pw-inc-lesion="${e}" aria-pressed="${n.lesiones===e}">${e}</button>
          `).join(``)}
        </div>
      </fieldset>
      ${n.lesiones===`Sí`?`<p class="pw-strip pw-strip--danger">${D(`heartPulse`,`pw-icon`)}<span>La veterinaria va antes que el reporte. Avisá a Juan.</span></p>`:``}
      <fieldset class="pw-q">
        <legend>Riesgo</legend>
        <div class="pw-seg">
          ${ia.map(e=>`
            <button type="button" class="pw-pick pw-pick--risk-${Sa(e)} ${n.riesgo===e?`is-on`:``}" data-pw-inc-riesgo="${e}" aria-pressed="${n.riesgo===e}">${e}</button>
          `).join(``)}
        </div>
      </fieldset>
      <button class="pw-fold" type="button" data-pw-fold="more" aria-expanded="${T.open.more}" aria-controls="pw-inc-more">
        ${D(`plus`,`pw-icon`)}<span>Más detalle <small>(opcional)</small></span>${D(`chevronDown`,`pw-icon pw-fold-icon`)}
      </button>
      <div class="pw-inc-more" id="pw-inc-more" ${T.open.more?``:`hidden`}>
        <div class="pw-grid-2">
          <label class="pw-field">Hora<input type="time" data-pw-field="hora" value="${E(n.hora||e.now.time)}" /></label>
          <label class="pw-field">Lugar<input type="text" data-pw-field="lugar" value="${E(n.lugar)}" placeholder="Plaza, esquina" autocomplete="off" /></label>
        </div>
        <label class="pw-field">Antes<textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto">${E(n.antes)}</textarea></label>
        <label class="pw-field">Qué hiciste<textarea data-pw-field="accion" rows="2" placeholder="Ej.: crucé la calle y lo senté">${E(n.accion)}</textarea></label>
        <label class="pw-field">Después<textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto">${E(n.despues)}</textarea></label>
        <fieldset class="pw-q">
          <legend>Protocolo hecho</legend>
          <div class="pw-chip-grid">
            ${Fn.map((e,t)=>`
              <button type="button" class="pw-pick ${n.protocolo.includes(t)?`is-on`:``}" data-pw-inc-proto="${t}" aria-pressed="${n.protocolo.includes(t)}">${t+1}. ${E(e.split(/[:.]/)[0])}</button>
            `).join(``)}
          </div>
        </fieldset>
      </div>
    `,`
    <section class="pw-screen pw-incident" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${D(`alertTriangle`,`pw-icon`)}Incidente</h1>
        <span class="pw-title-count">${r}/3</span>
      </div>
      ${n.urgente?zs(n,e):``}
      <ol class="pw-stepper" aria-label="Pasos">
        ${ca.map((e,t)=>`<li class="${t+1<r?`is-done`:``} ${t+1===r?`is-on`:``}" ${t+1===r?`aria-current="step"`:``}><span>${t+1}</span>${e}</li>`).join(``)}
      </ol>
      ${a}
      <p class="pw-status ${i?`is-warn`:``}" role="status" data-pw-incident-status>${E(T.incidentStatus)}</p>
      <div class="pw-wizard-nav">
        ${r>1?`<button class="pw-btn pw-btn--ghost" type="button" data-pw-inc-back>${D(`arrowLeft`,`pw-icon`)}Atrás</button>`:`
          <button class="pw-btn pw-btn--ghost ${T.confirmClear?`is-confirm`:``}" type="button" data-pw-clear ${Po(n)?``:`hidden`}>${T.confirmClear?`¿Borrar? Tocá de nuevo`:`Borrar`}</button>
        `}
        ${r<3?`
          <button class="pw-btn pw-btn--primary pw-btn--lg" type="button" data-pw-inc-next>Siguiente${D(`arrowRight`,`pw-icon`)}</button>
        `:`
          <button class="pw-btn pw-btn--danger pw-btn--lg" type="button" data-pw-inc-send>${D(`send`,`pw-icon`)}Enviar</button>
        `}
      </div>
    </section>
  `}function Rs(e,t){let n=Ks(e,t),r=n.ok?n.text:``;return`
    <section class="pw-screen pw-incident" aria-labelledby="pw-tab-title">
      <div class="pw-title-row">
        <h1 id="pw-tab-title" tabindex="-1">${D(`checkCircle`,`pw-icon`)}Reporte listo</h1>
      </div>
      <p class="pw-sub">${E(e.dogs.join(`, `))} · ${E(e.tipos.join(`, `)||`incidente`)}</p>
      <p class="pw-status ${T.incidentWarn?`is-warn`:``}" role="status" data-pw-incident-status>${E(T.incidentStatus)}</p>
      ${r?`
        <a class="pw-btn pw-btn--whatsapp pw-btn--xl" data-pw-whatsapp href="${Bs(r)}" target="_blank" rel="noopener noreferrer">${D(`message`,`pw-icon`)}WhatsApp a Juan</a>
        <div class="pw-row">
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>${D(`copy`,`pw-icon`)}Copiar</button>
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-fold="message" aria-expanded="${T.open.message}" aria-controls="pw-message-box">${D(`eye`,`pw-icon`)}Ver texto</button>
        </div>
        <div id="pw-message-box" ${T.open.message?``:`hidden`}>
          <label class="pw-sr" for="pw-message">Mensaje</label>
          <textarea id="pw-message" class="pw-message" readonly rows="14" data-pw-message>${E(r)}</textarea>
        </div>
      `:``}
      <div class="pw-wizard-nav">
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-inc-edit>${D(`arrowLeft`,`pw-icon`)}Corregir</button>
        <button class="pw-btn pw-btn--primary" type="button" data-pw-inc-new>${D(`plus`,`pw-icon`)}Nuevo</button>
      </div>
    </section>
  `}function zs(e,t){let n=Js(),r=[`URGENTE - Paseos Juan`,`${e.dogs.join(`, `)||`Un perro`} se lastimó y es más que una curación leve.${e.detalle?` ${e.detalle}.`:``}`,`Hora: ${e.hora||t.now.time} · Ruta: ${n.rutas||`Pendiente de confirmar`}`,`${Ha()?`Ayudante`:`Paseador`}: ${Va()}${n.paseador?` (con ${n.paseador})`:``}`,`¿Vamos a la veterinaria?`].join(`
`);return`
    <p class="pw-strip pw-strip--danger">${D(`heartPulse`,`pw-icon`)}<span><b>Más que leve:</b> avisá a Juan y va a la veterinaria.</span></p>
    <a class="pw-btn pw-btn--whatsapp pw-btn--xl" href="${Bs(r)}" target="_blank" rel="noopener noreferrer">${D(`message`,`pw-icon`)}WhatsApp a Juan</a>
  `}function Bs(e){return`https://wa.me/${Tn.whatsapp}?text=${encodeURIComponent(e)}`}function Vs({sel:e,plan:t,stops:n,names:r}){let i=ro(e.now.iso),a=_.pendingCount(),o=[...new Set(t.shown.map(e=>e.supervisor).filter(Boolean))],s=o.length?Oa(o):na[e.shift].supervisor,c=Hs(t.shown)||ka(e.shift),l={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`},u=[];t.shown.forEach(e=>{e.paseador&&!Ua(e.paseador)&&u.push([`Paseador`,Wa(e.paseador,r)]),e.ayudante&&!Ua(e.ayudante)&&u.push([`Ayudante`,Wa(e.ayudante,r)])});let d=[[`Ruta`,t.shown.map(e=>e.ruta).join(`, `)||`Sin ruta`],[`Perros`,String(n.length)],[`Horario`,c],[`Supervisa`,s],...u,[`Fuente`,t.shown.map(e=>Us(e,r)).join(` · `)||`—`]];return`
    <section class="pw-screen" aria-labelledby="pw-tab-title">
      <div class="pw-title-row"><h1 id="pw-tab-title" tabindex="-1">Más</h1></div>

      <div class="pw-box" role="group" aria-labelledby="pw-day-label">
        <h2 class="pw-box-title" id="pw-day-label">${D(`calendarCheck`,`pw-icon`)}Día y turno</h2>
        <div class="pw-days">
          ${On.map(t=>`
            <button type="button" class="pw-chip pw-chip--day ${t===e.day?`is-active`:``}" data-pw-day="${t}" aria-pressed="${t===e.day}" aria-label="${t}${t===e.now.day?` (hoy)`:``}">
              ${l[t]}${t===e.now.day?`<small>hoy</small>`:``}
            </button>
          `).join(``)}
        </div>
        <div class="pw-chip-row">
          ${[`Mañana`,`Tarde`].map(t=>`
            <button type="button" class="pw-chip pw-chip--wide ${t===e.shift?`is-active`:``}" data-pw-shift="${t}" aria-pressed="${t===e.shift}">${t}<small>${ka(t)}</small></button>
          `).join(``)}
        </div>
        ${T.day||T.shift?`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-today>Volver a hoy</button>`:``}
      </div>

      ${!t.assigned&&t.ofShift.length>1?`<div class="pw-box">${is(e,t)}</div>`:``}

      <div class="pw-box">
        <h2 class="pw-box-title">${D(`route`,`pw-icon`)}Turno</h2>
        <dl class="pw-facts">
          ${d.map(([e,t])=>`<div><dt>${E(e)}</dt><dd>${E(t)}</dd></div>`).join(``)}
        </dl>
      </div>

      <div class="pw-box">
        <h2 class="pw-box-title">${D(`bell`,`pw-icon`)}Avisos por barrio <span class="pw-count">${i.length}</span></h2>
        ${i.length?io(i,{full:!0}):`<p class="pw-sub">Sin avisos.</p>`}
      </div>

      <div class="pw-box">
        <p class="pw-sync-line">${D(a?`uploadCloud`:`checkCircle`,`pw-icon`)}${a?`${a} ${a===1?`cambio espera`:`cambios esperan`} señal`:`Todo enviado`}</p>
        <button class="pw-fold" type="button" data-pw-fold="help" aria-expanded="${T.open.help}" aria-controls="pw-help">
          ${D(`help`,`pw-icon`)}<span>Cómo funciona</span>${D(`chevronDown`,`pw-icon pw-fold-icon`)}
        </button>
        <ul class="pw-help" id="pw-help" ${T.open.help?``:`hidden`}>
          <li><span class="pw-chip-st pw-chip-st--idle">Pendiente</span><span class="pw-chip-st pw-chip-st--run">En paseo</span><span class="pw-chip-st pw-chip-st--ok">Entregado</span><span class="pw-chip-st pw-chip-st--late">Atrasado</span></li>
          <li>"Retiré" → "Foto del paseo" (lo pasa a "En paseo") → "Entregué". Sin foto se entrega igual y queda "sin foto del paseo".</li>
          ${Ha()?`<li>Ayudante: "Integrado" cuando ya caminó la primera cuadra con la manada. Devolvé de a 2 como máximo.</li>`:``}
          <li>Lo que marcás lo ven ${Ha()?`el paseador`:`tu ayudante`}, Juan y quien supervisa.</li>
          <li>Sin señal: seguí marcando, se envía solo. La foto del paseo se sube sola al volver la señal; la foto de la ficha necesita señal.</li>
          <li>Categoría: <b>SIN EVALUAR</b> salvo otra. ${E(Mn[`SIN EVALUAR`])}</li>
          <li>Rutas: las arma el coordinador. Base: ${E(Tn.officialSources.routes)} (12/11/2026).</li>
        </ul>
      </div>

      <div class="pw-more-actions">
        <button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-a11y>${D(`eye`,`pw-icon`)}Tema y movimiento</button>
        <button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-logout>${D(`logOut`,`pw-icon`)}Salir</button>
      </div>
    </section>
  `}function Hs(e){let t=e.flatMap(e=>e.stops.map(e=>e.hora)).filter(Boolean).sort(),n=e.flatMap(e=>e.stops.map(e=>e.salida)).filter(Boolean).sort();return t.length?`${t[0]} a ${n[n.length-1]||t[t.length-1]}`:``}function Us(e,t){if(e.fuente===`dia`){let n=e.record.actualizadoPor?_o(e.record.actualizadoPor,t):``,r=e.record.actualizadoEn?vo(e.record.actualizadoEn):``;return`${e.ruta}: cambio del día${[n,r].filter(Boolean).length?` · ${[n,r].filter(Boolean).join(` `)}`:``}`}return e.fuente===`plantilla`?`${e.ruta}: plantilla semanal`:`${e.ruta}: planilla RPJ, sin confirmar`}function Ws(e,t){if(t===1){if(!e.tipos.length&&!e.detalle.trim())return{text:`Elegí qué pasó.`,focus:`[data-pw-inc-tipo]`};if(e.tipos.length===1&&e.tipos[0]===`Otro`&&!e.detalle.trim())return{text:`Contá en pocas palabras qué pasó.`,focus:`[data-pw-field="detalle"]`}}if(t===2&&!e.dogs.length)return{text:`Tocá los perros que estaban.`,focus:`[data-pw-inc-dog]`};if(t===3){if(!e.lesiones)return{text:`Marcá si hubo lesión.`,focus:`[data-pw-inc-lesion]`};if(!e.riesgo)return{text:`Marcá el riesgo.`,focus:`[data-pw-inc-riesgo]`}}let n=(t===1?e.detalle:[e.detalle,e.antes,e.accion,e.despues,e.lugar].join(` `)).match(sa)?.[0];if(n){let t=[`detalle`,`antes`,`accion`,`despues`,`lugar`].find(t=>sa.test(e[t]||``))||`detalle`;return{text:`Cambiá “${n}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,focus:`[data-pw-field="${t}"]`,word:n}}return null}function Gs(e){for(let t of[1,2,3]){let n=Ws(e,t);if(n)return{...n,step:t}}return null}function Ks(e,t){if(Gs(e))return{ok:!1};let n=Da(t.now),r=Js(),i=(e,t)=>`${e}: ${String(t||``).trim()?String(t).trim():`Sin dato`}`,a=qs(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${n.toLowerCase()}`,Ha()?`Ayudante de paseador: ${Va()}${r.paseador?` (con ${r.paseador})`:``}`:`Paseador: ${Va()}`,`Ruta: ${r.rutas||`Pendiente de confirmar`}`,`Perros: ${e.dogs.join(`, `)}`,i(`Qué pasó`,Fo(e)),`Lesiones: ${e.lesiones}`,`Nivel de riesgo: ${e.riesgo}`,i(`Lugar`,e.lugar),``,i(`Antes`,e.antes),i(`Qué hice`,e.accion),i(`Después`,e.despues),``,`Protocolo:`,...a].join(`
`)}}function qs(e){return Fn.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function Js(){let e=O(),t=Qa({...e,day:e.now.day,iso:e.now.iso,isToday:!0,shift:Da(e.now)}),n=go(e.now.iso);return{rutas:t.shown.map(e=>e.ruta).join(`, `),paseador:t.helping?Wa(t.helping.paseador,n):``,stops:$a(t.shown)}}function Ys(e,t){let n=Js(),r=e.dogs.map(e=>n.stops.find(t=>t.dog.name===e)?.dog.id||x.find(t=>t.name===e)?.id).filter(Boolean),i=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:r,perroNombre:i,tipos:e.tipos,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:Fo(e),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:qs(e),ruta:n.rutas,titulo:`Incidente: ${i} · ${e.tipos.join(`, `)||`ver detalle`} · riesgo ${e.riesgo.toLowerCase()}`}}function Xs(e,t=!1){T.incidentStatus=e,T.incidentWarn=t;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),Qs(e)}function Zs(e,t){if(T.incidentSavedText===t)return Promise.resolve(null);T.incidentSavedText=t;let n=O();return So(`incidentes`,()=>Ys({...e,registroId:Mo().registroId||e.registroId},n)).then(e=>e?(ba(Ji,null)&&No({registroId:e.id}),Xs(e.pendiente?`Sin señal: se guarda en la app cuando vuelva. Mandalo por WhatsApp.`:`Guardado en la app. Ahora mandalo por WhatsApp.`),e):(T.incidentSavedText=``,Xs(`No se guardó en la app. Mandalo igual por WhatsApp.`,!0),null))}function Qs(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function $s(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function ec(e){return!e||e===document.body||!e.closest?.(`.pw-shell`)?``:e.id?`#${CSS.escape(e.id)}`:[...e.attributes].filter(e=>e.name.startsWith(`data-pw-`)&&e.name!==`data-pw-listening`).map(e=>`[${e.name}="${CSS.escape(e.value)}"]`).join(``)}function tc(){let e=document.activeElement,t=ec(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null,r=window.scrollY;if($(),Math.abs(window.scrollY-r)>2&&window.scrollTo(0,r),!t)return;let i=document.querySelector(t);if(i&&(i.focus({preventScroll:!0}),n&&typeof i.setSelectionRange==`function`))try{i.setSelectionRange(n[0],n[1])}catch{}}var nc=0;function rc(){clearTimeout(nc),nc=setTimeout(()=>{document.querySelector(`.pw-shell`)&&tc()},80)}function k(e){$(),e&&(document.querySelector(e)||document.getElementById(`pw-tab-title`))?.focus({preventScroll:!0})}function ic(e){T.helper.cure=null,T.helper.herd=!1,T.tab=e,T.detailId=``,T.confirmClear=!1,$(),window.scrollTo({top:0,behavior:`auto`}),document.getElementById(`pw-tab-title`)?.focus({preventScroll:!0})}function ac({cure:e=null,herd:t=!1}){T.tab=`ruta`,T.detailId=``,T.helper.cure=e,T.helper.herd=t,T.helper.status=``,$(),window.scrollTo({top:0,behavior:`auto`}),document.getElementById(`pw-tab-title`)?.focus({preventScroll:!0})}function oc(e){T.detailId=e,$(),document.getElementById(`pw-sheet-title`)?.focus({preventScroll:!0})}function sc(){let e=T.detailId;T.detailId=``,$(),(document.querySelector(`[data-pw-open="${CSS.escape(e)}"]`)||document.getElementById(`pw-tab-title`))?.focus({preventScroll:!0})}async function cc(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.closest(`[hidden]`)?.removeAttribute(`hidden`),e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function lc(e,t){return e.isToday&&t?.canSave&&Eo.ready}function uc(e,t){let n=O();lc(n,e)&&(Co(e,n,t),Qs(`${e.dog.name}: deshecho.`),rc())}function dc(e){let t={};return w.forEach((n,r)=>{r>=e.step||!e.times[r]||(t[n.field]=e.times[r],e.record?.[`${n.field}Por`]&&(t[`${n.field}Por`]=e.record[`${n.field}Por`],t[`${n.field}PorNombre`]=e.record[`${n.field}PorNombre`]||``))}),t}function fc(e,t,n){let r=Ba(),i=w[t].field;e[i]=n,e[`${i}Por`]=r.usuario||``,e[`${i}PorNombre`]=r.nombre||``}function pc(e){return!!(e?.fotoPaseoId||e?.fotoPendiente===!0)}function mc(e){let t=O(),n=eo(t,e);if(!lc(t,n))return!1;let r=uo(t.now.iso,t.shift,[n.dog])[e];if(r.noSale||r.step>=w.length)return!1;let i=wo(r),a=dc(r),o;if(r.step===0)fc(a,0,t.now.time),a.estado=`retirado`,o=`${n.dog.name}: retirado ${t.now.time}`;else{fc(a,2,t.now.time),a.estado=`entregado`;let e=!pc(r.record);a.sinFotoPaseo=e,o=`${n.dog.name}: entregado ${t.now.time}${e?` · sin foto del paseo`:``}`}return Co(n,t,a),Qo(o,()=>uc(n,i)),!0}var hc=new Map,gc=new Map;function _c(e){if(!e)return``;let t=hc.get(e.id);if(t&&(e.fotoPaseoId||e.fotoPendiente||e.enviando))return t;let n=String(e.fotoPaseoId||``);if(!n||!ea.test(n)||typeof fetch!=`function`||!g.token())return``;let r=gc.get(n);if(r?.url)return r.url;if(r&&(r.loading||Date.now()-r.at<6e4)||typeof navigator<`u`&&navigator.onLine===!1)return``;let i={url:``,loading:!0,at:Date.now()};return gc.set(n,i),fetch(`/api/archivos?id=${encodeURIComponent(n)}`,{headers:{Authorization:`Bearer ${g.token()}`}}).then(e=>e.ok?e.blob():null).then(e=>{e&&/^image\//.test(e.type)&&(i.url=URL.createObjectURL(e),rc())}).catch(()=>null).finally(()=>{i.loading=!1,i.at=Date.now()}),``}function vc(e,t){if(!t||!e)return;let n=O(),r=eo(n,e);if(!lc(n,r))return;let i=uo(n.now.iso,n.shift,[r.dog])[e];if(i.noSale||i.step>=w.length)return;if(!/^image\//.test(t.type||``)){T.syncError=`Eso no es una foto. Probá de nuevo.`,$s(T.syncError),rc();return}let a=n.now.iso,o=dc(i);i.step===0&&fc(o,0,n.now.time);let s=Ba(),c={id:ao(a,r.dog.id,n.shift),fecha:a,perroId:r.dog.id,perroNombre:r.dog.name,turno:n.shift,ruta:r.route.ruta,...o,horaPaseoPor:s.usuario||``,horaPaseoPorNombre:s.nombre||``,sinFotoPaseo:!1},l=wo(i),u=typeof navigator<`u`&&navigator.onLine===!1,d=`paseos:${c.id}`,f={...so.get(d)||{},...c,estado:`paseando`,horaPaseo:n.now.time,...u?{fotoPendiente:!0}:{}};so.set(d,f);try{let e=hc.get(c.id);e&&URL.revokeObjectURL(e),hc.set(c.id,URL.createObjectURL(t))}catch{}T.walkBusy[e]=!0,rc(),Qs(`${r.dog.name}: guardando la foto del paseo…`),xo=xo.then(async()=>{try{let e=await wt.sacar(c,t);T.syncError&&=``,Qo(e?.pendiente||e?.fotoPendiente?`${r.dog.name}: en paseo · foto por subir`:`${r.dog.name}: en paseo ${n.now.time}`,()=>uc(r,l))}catch(e){hc.delete(c.id),T.syncError=`La foto no se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,$s(T.syncError)}finally{so.get(d)===f&&so.delete(d),delete T.walkBusy[e],rc()}}).catch(()=>null)}function yc(e){let t=O(),n=eo(t,e);if(!lc(t,n))return!1;let r=uo(t.now.iso,t.shift,[n.dog])[e],i=wo(r);return Co(n,t,{estado:Qi}),Qo(`${n.dog.name}: no sale`,()=>uc(n,i)),!0}function bc(e){let t=O(),n=eo(t,e);if(!lc(t,n))return!1;let r=uo(t.now.iso,t.shift,[n.dog])[e],i=wo(r);if(r.noSale){let e=r.times.reduce((e,t,n)=>t?n+1:e,0);return Co(n,t,{estado:e?w[e-1].estado:`pendiente`}),Qo(`${n.dog.name}: vuelve a la ruta`,()=>uc(n,i)),!0}if(!r.step)return!1;let a=r.step-1;a===2&&!r.times[1]&&(a=1);let o={estado:a?w[a-1].estado:`pendiente`};return w.forEach((e,t)=>{o[e.field]=t<a?r.times[t]:``,t>=a&&(o[`${e.field}Por`]=``,o[`${e.field}PorNombre`]=``)}),a<2&&Object.assign(o,{fotoPaseoId:``,fotoPendiente:!1}),a<3&&Object.assign(o,{sinFotoPaseo:!1,devuelvePor:``,devuelvePorNombre:``}),a<1&&Object.assign(o,{horaIntegrado:``,horaIntegradoPor:``,horaIntegradoPorNombre:``}),Co(n,t,o),Qo(`${n.dog.name}: ${a?w[a-1].done.toLowerCase():`pendiente`}`,()=>uc(n,i)),!0}function xc(e){let t=O(),n=eo(t,e);if(!lc(t,n))return!1;let r=uo(t.now.iso,t.shift,[n.dog])[e];if(r.noSale||r.step<1||r.step>=w.length)return!1;let i=Ba(),a=wo(r);return Co(n,t,{horaIntegrado:t.now.time,horaIntegradoPor:i.usuario||``,horaIntegradoPorNombre:i.nombre||``}),Qo(`${n.dog.name}: integrado`,()=>uc(n,a)),!0}function Sc({sel:e,stops:t,progress:n}){let r=t.filter(e=>e.canSave).map(e=>({stop:e,state:fo(n,e)})),i=r.filter(e=>!e.state.noSale&&e.state.step>=1&&e.state.step<w.length),a=e=>Ua(e.state.record?.devuelvePor),o=e=>!!e.state.record?.devuelvePor&&!a(e),s=i.filter(a),c=i.filter(e=>e.state.record?.horaIntegrado&&!a(e)&&!o(e)),l=T.helper.picks.filter(e=>c.some(t=>t.stop.dog.id===e));return T.helper.picks=l,{items:r,active:i,toIntegrate:i.filter(e=>!e.state.record?.horaIntegrado),noPhoto:i.filter(e=>e.state.step===1&&e.state.record?.horaIntegrado&&!pc(e.state.record)),delivering:s,returnable:c,picks:l,room:Math.max(0,ua-s.length),next:e.isToday?r.filter(e=>e.state.step===0&&!e.state.noSale):[]}}function Cc(e,t){let n=Sc(t);n.returnable.some(t=>t.stop.dog.id===e)&&(n.picks.includes(e)?(T.helper.picks=n.picks.filter(t=>t!==e),T.helper.status=``):n.picks.length>=n.room?T.helper.status=n.room<ua?`Máximo ${ua} a la vez: entregá los que llevás.`:`Máximo ${ua} a la vez`:(T.helper.picks=[...n.picks,e],T.helper.status=``))}function wc(e){let t=Sc(e),n=t.returnable.filter(e=>t.picks.includes(e.stop.dog.id)).slice(0,t.room);if(!n.length)return T.helper.status=`Tocá la foto de 1 o 2 perros.`,!1;let r=O(),i=Ba(),a=n.map(e=>[e.stop,wo(e.state)]);return n.forEach(e=>Co(e.stop,r,{devuelvePor:i.usuario||``,devuelvePorNombre:i.nombre||``})),T.helper.picks=[],T.helper.status=``,Qo(`Llevás a ${Oa(n.map(e=>e.stop.dog.name))}`,()=>{a.forEach(([e,t])=>uc(e,t))}),!0}function Tc(e){let t=O(),n=eo(t,e);if(!lc(t,n))return!1;let r=uo(t.now.iso,t.shift,[n.dog])[e],i=wo(r);return Co(n,t,{devuelvePor:``,devuelvePorNombre:``}),Qo(`${n.dog.name}: vuelve a la manada`,()=>uc(n,i)),!0}function Ec(e,t,n=Ba().usuario){return co(`checklists`,e).get(oo(e,t,n))||null}function Dc(e){return(Array.isArray(e?.aguas)?e.aguas:[]).map(e=>String(e)).filter(e=>Aa(e)!==null).sort((e,t)=>Aa(e)-Aa(t))}function Oc(e,t,n){let r={id:oo(e,t),fecha:e,turno:t,aguas:n};return So(`checklists`,r,{optimisticRecord:r})}function kc(){let e=O();if(!e.isToday)return!1;let t=e.now.iso,n=e.now.time;return Oc(t,e.shift,[...Dc(Ec(t,e.shift)),n]),Qo(`Agua ${n}`,()=>{let r=Dc(Ec(t,e.shift)),i=r.lastIndexOf(n);i>=0&&r.splice(i,1),Oc(t,e.shift,r),rc()}),!0}function Ac(){let e=O(),t=e.now.iso,n=Ec(t,e.shift)?.calor===!0,r={id:oo(t,e.shift),fecha:t,turno:e.shift,calor:!n};So(`checklists`,r,{optimisticRecord:r}),Qs(n?`Sin calor.`:`Hace calor: aviso de agua cada ${da} minutos.`)}function jc(e,t){return t?.calor===!0||ro(e.now.iso).some(e=>/clima/i.test(e.tipo||``)&&/calor/i.test(`${e.mensaje||``} ${e.titulo||``}`))}function Mc(e){let t=T.helper.cure,n=e.stops.find(e=>e.dog.id===t?.dogId);if(!t||!n)return!1;if(!t.tipos.length)return T.helper.status=`Tocá qué tiene.`,!1;let r=O(),i=t.tipos.join(`, `);return So(`incidentes`,{fecha:r.now.iso,hora:r.now.time,perros:[n.dog.id],perroNombre:n.dog.name,tipos:t.tipos,tipo:`curación leve`,riesgo:`bajo`,lesiones:`Leve`,conducta:`Curación leve: ${i}`,accion:t.gasa?`Agua oxigenada y gasa`:``,ruta:n.route.ruta,titulo:`Curación leve: ${n.dog.name} · ${i}`}),T.helper.cure=null,T.helper.status=``,Qo(`Curación de ${n.dog.name} guardada`),!0}function Nc(e){let t=T.helper.cure,n=e.stops.find(e=>e.dog.id===t?.dogId),r=t?.tipos||[];xa(Ji,{step:3,tipos:[`Se lastimó`],detalle:r.length?`Lastimadura: ${r.join(`, `)}`:``,dogs:n?[n.dog.name]:[],lesiones:`Sí`,hora:O().now.time,urgente:!0}),T.incidentSavedText=``,T.incidentStatus=``,T.helper.cure=null,T.helper.status=``}function Pc(e){if(!e.target.closest(`.pw-shell`))return!1;let t=e.target,n=()=>O();if(t.closest(`[data-pw-logout]`))return kx(`/salir`),!0;if(t.closest(`[data-pw-a11y]`))return setTimeout(()=>document.querySelector(`[data-a11y-toggle]`)?.click(),0),!0;let r=t.closest(`[data-pw-photo]`);if(r)return r.dataset.pwListening||(r.dataset.pwListening=`1`,r.addEventListener(`change`,()=>{let e=r.files?.[0];r.value=``,Vo(r.dataset.pwPhoto,e)})),!1;let i=t.closest(`[data-pw-walkphoto]`);if(i)return i.dataset.pwListening||(i.dataset.pwListening=`1`,i.addEventListener(`change`,()=>{let e=i.files?.[0];i.value=``,vc(i.dataset.pwWalkphoto,e)})),!1;if(t.closest(`[data-pw-photo-big]`)){let e=t.closest(`[data-pw-photo-big]`).dataset.pwPhotoBig;return ht.abrir(e).catch(e=>{T.syncError=e?.message||`No se pudo abrir la foto.`,$s(T.syncError),rc()}),!0}if(t.closest(`[data-pw-toast-undo]`)){let e=T.toast?.undo;return clearTimeout(Zo),T.toast=null,$o(),e?.(),!0}if(t.closest(`[data-pw-dismiss-error]`))return T.syncError=``,k(`#pw-tab-title`),!0;let a=t.closest(`[data-pw-tab]`);if(a)return ic(a.dataset.pwTab),!0;if(t.closest(`[data-pw-close-sheet]`))return sc(),!0;let o=t.closest(`[data-pw-open]`);if(o)return oc(o.dataset.pwOpen),!0;let s=t.closest(`[data-pw-fold]`);if(s){let e=s.dataset.pwFold;return T.open[e]=!T.open[e],k(`[data-pw-fold="${e}"]`),!0}let c=t.closest(`[data-pw-day]`);if(c){let e=wa(),t=c.dataset.pwDay;return T.day=t===e.day?null:t,k(`[data-pw-day="${t}"]`),Qs(`Mostrando ${t.toLowerCase()}.`),!0}let l=t.closest(`[data-pw-shift]`);if(l){let e=l.dataset.pwShift;return T.shift=e===Da(wa())&&!T.day?null:e,T.tab===`mas`?k(`[data-pw-shift="${e}"]`):(T.tab=`ruta`,k(`#pw-tab-title`)),Qs(`Mostrando el turno ${e.toLowerCase()}.`),!0}if(t.closest(`[data-pw-today]`))return T.day=null,T.shift=null,k(T.tab===`mas`?`[data-pw-day]`:`#pw-tab-title`),Qs(`Mostrando hoy.`),!0;if(t.closest(`[data-pw-change-ok]`))return T.routeChange=null,k(`#pw-tab-title`),!0;let u=t.closest(`[data-pw-route]`);if(u){let e=u.dataset.pwRoute;return Za(n(),e),k(`[data-pw-route="${CSS.escape(e)}"]`),Qs(e?`Ruta ${e}. Queda recordada en este celular.`:`Todas las rutas del turno.`),!0}let d=t.closest(`[data-pw-step]`);if(d){let e=d.dataset.pwStep,t=d.dataset.pwWhere;return mc(e)&&k(t===`sheet`||t===`sheet-deliver`?`#pw-sheet-title`:t===`hero`||t===`hero-more`?`[data-pw-where="hero"]`:t===`ret`?`[data-pw-step][data-pw-where="ret"], [data-pw-return-pick], #pw-tab-title`:`[data-pw-step="${CSS.escape(e)}"][data-pw-where="row"], [data-pw-walkphoto="${CSS.escape(e)}"][data-pw-where="row"]`),!0}let f=t.closest(`[data-pw-integrate]`);if(f)return xc(f.dataset.pwIntegrate)&&k(`[data-pw-integrate], [data-pw-water]`),!0;let p=t.closest(`[data-pw-return-pick]`);if(p){let e=p.dataset.pwReturnPick;return Cc(e,Wo()),k(`[data-pw-return-pick="${CSS.escape(e)}"]`),T.helper.status&&Qs(T.helper.status),!0}if(t.closest(`[data-pw-return-go]`)){let e=wc(Wo());return k(e?`[data-pw-step][data-pw-where="ret"]`:`[data-pw-return-go]`),e||Qs(T.helper.status),!0}if(t.closest(`[data-pw-return-cancel]`))return Sc(Wo()).delivering.forEach(e=>Tc(e.stop.dog.id)),k(`[data-pw-return-pick], #pw-tab-title`),!0;if(t.closest(`[data-pw-water]`))return kc()&&k(`[data-pw-water]`),!0;if(t.closest(`[data-pw-heat]`))return Ac(),k(`[data-pw-heat]`),!0;if(t.closest(`[data-pw-cure-open]`))return ac({cure:{dogId:``,tipos:[],gasa:!1}}),!0;let ee=t.closest(`[data-pw-cure-dog]`);if(ee&&T.helper.cure)return T.helper.cure.dogId=ee.dataset.pwCureDog,T.helper.status=``,k(`#pw-tab-title`),!0;let m=t.closest(`[data-pw-cure-tipo]`);if(m&&T.helper.cure){let e=m.dataset.pwCureTipo,t=T.helper.cure.tipos;return T.helper.cure.tipos=t.includes(e)?t.filter(t=>t!==e):[...t,e],T.helper.status=``,k(`[data-pw-cure-tipo="${CSS.escape(e)}"]`),!0}if(t.closest(`[data-pw-cure-gasa]`)&&T.helper.cure)return T.helper.cure.gasa=!T.helper.cure.gasa,k(`[data-pw-cure-gasa]`),!0;if(t.closest(`[data-pw-cure-ok]`))return Mc(Wo())?k(`[data-pw-cure-open]`):(k(`[data-pw-cure-tipo]`),Qs(T.helper.status)),!0;if(t.closest(`[data-pw-cure-grave]`))return Nc(Wo()),ic(`incidente`),!0;if(t.closest(`[data-pw-cure-back]`))return T.helper.cure?.dogId?T.helper.cure.dogId=``:T.helper.cure=null,T.helper.status=``,k(T.helper.cure?`#pw-tab-title`:`[data-pw-cure-open]`),!0;if(t.closest(`[data-pw-herd-open]`))return ac({herd:!0}),Qs(`${pa.join(`. `)}.`),!0;if(t.closest(`[data-pw-herd-close]`))return T.helper.herd=!1,k(`[data-pw-herd-open]`),!0;let h=t.closest(`[data-pw-nosale]`);if(h)return yc(h.dataset.pwNosale)&&k(T.detailId?`#pw-sheet-title`:`[data-pw-step][data-pw-where="hero"]`),!0;let te=t.closest(`[data-pw-undo]`);if(te)return bc(te.dataset.pwUndo)&&k(`#pw-sheet-title`),!0;let ne=t.closest(`[data-pw-equip]`);if(ne){let e=n(),{checked:t}=ho(e.now.iso,e.shift),r=ne.dataset.pwEquip,i=t.includes(r)?t.filter(e=>e!==r):[...t,r];return To(e,i),k(`[data-pw-equip="${CSS.escape(r)}"]`),i.length>=mo().length&&Qo(`Equipo listo. ¡A salir!`),!0}if(t.closest(`[data-pw-equip-all]`)){let e=n(),t=ho(e.now.iso,e.shift).checked;return To(e,mo()),k(`[data-pw-equip-reset]`),Qo(`Equipo listo. ¡A salir!`,()=>{To(O(),t),rc()}),!0}if(t.closest(`[data-pw-equip-reset]`)){let e=n(),t=ho(e.now.iso,e.shift).checked;return To(e,[]),k(`[data-pw-equip-all]`),Qo(`Equipo desmarcado`,()=>{To(O(),t),rc()}),!0}let re=(e,n,r)=>{let i=t.closest(`[${e}]`);if(!i)return!1;let a=i.getAttribute(e),o=Mo(),s=n===`protocolo`?Number(a):a;if(r){let e=o[n];No({[n]:e.includes(s)?e.filter(e=>e!==s):[...e,s]})}else No({[n]:o[n]===s?``:s});return T.incidentStatus=``,T.confirmClear=!1,k(`[${e}="${CSS.escape(a)}"]`),!0};if(re(`data-pw-inc-tipo`,`tipos`,!0)||re(`data-pw-inc-dog`,`dogs`,!0)||re(`data-pw-inc-lesion`,`lesiones`,!1)||re(`data-pw-inc-riesgo`,`riesgo`,!1)||re(`data-pw-inc-proto`,`protocolo`,!0))return!0;if(t.closest(`[data-pw-inc-next]`)){let e=Mo(),t=Ws(e,e.step);return T.confirmClear=!1,t?(T.incidentStatus=t.text,T.incidentWarn=!0,k(t.focus),Qs(t.text),!0):(No({step:Math.min(3,e.step+1)}),T.incidentStatus=``,T.incidentWarn=!1,k(`#pw-tab-title`),!0)}if(t.closest(`[data-pw-inc-back]`)){let e=Mo();return No({step:Math.max(1,e.step-1)}),T.incidentStatus=``,k(`#pw-tab-title`),!0}if(t.closest(`[data-pw-inc-send]`)){let e=Mo(),t=Gs(e);if(t)return t.step!==e.step&&No({step:t.step}),t.word&&(T.open.more=!0),T.incidentStatus=t.text,T.incidentWarn=!0,k(t.focus),Qs(t.text),!0;let n=Ks(e,O());return No({enviado:!0,hora:e.hora||O().now.time}),T.incidentWarn=!1,T.incidentStatus=T.incidentSavedText===n.text?`Ya estaba guardado. Mandalo por WhatsApp.`:`Guardando…`,k(`#pw-tab-title`),Zs(Mo(),Ks(Mo(),O()).text),!0}if(t.closest(`[data-pw-inc-edit]`))return No({enviado:!1,step:3}),T.incidentStatus=``,k(`#pw-tab-title`),!0;if(t.closest(`[data-pw-whatsapp]`)){let e=Mo(),t=Ks(e,O());return t.ok&&Zs(e,t.text),!1}if(t.closest(`[data-pw-copy]`)){let e=Mo(),t=Ks(e,O());return t.ok&&(Zs(e,t.text),cc(t.text).then(e=>{Xs(e?`Copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: tocá “Ver texto” y copialo a mano.`,!e)})),!0}if(t.closest(`[data-pw-inc-new]`)){try{localStorage.removeItem(Ji)}catch{}return T.incidentSavedText=``,T.open.more=!1,T.open.message=!1,T.incidentStatus=``,k(`#pw-tab-title`),Qs(`Reporte nuevo.`),!0}if(t.closest(`[data-pw-clear]`)){if(!T.confirmClear)return T.confirmClear=!0,k(`[data-pw-clear]`),!0;try{localStorage.removeItem(Ji)}catch{}return T.confirmClear=!1,T.incidentSavedText=``,T.incidentStatus=`Borrado.`,T.incidentWarn=!1,k(`#pw-tab-title`),Qs(T.incidentStatus),!0}if(T.confirmClear){T.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=`Borrar`,e.classList.remove(`is-confirm`))}return!1}function Fc(e){let t=e.target.closest?.(`[data-pw-photo]`);if(t){if(!t.dataset.pwListening){let e=t.files?.[0];t.value=``,Vo(t.dataset.pwPhoto,e)}return!0}let n=e.target.closest?.(`[data-pw-walkphoto]`);if(n){if(!n.dataset.pwListening){let e=n.files?.[0];n.value=``,vc(n.dataset.pwWalkphoto,e)}return!0}return e.target.closest?.(`.pw-shell [data-pw-field]`)?(Ic(e.target),!0):!1}function Ic(e){let t=e.dataset.pwField;if([`detalle`,`hora`,`lugar`,`antes`,`accion`,`despues`].includes(t)&&(No({[t]:e.value}),T.incidentWarn&&T.incidentStatus)){T.incidentStatus=``,T.incidentWarn=!1;let e=document.querySelector(`[data-pw-incident-status]`);e&&(e.textContent=``,e.classList.remove(`is-warn`))}}function Lc(e){let t=e.target.closest?.(`.pw-shell [data-pw-field]`);t&&Ic(t)}function Rc(e){if(e.key===`Escape`&&T.detailId&&document.querySelector(`.pw-shell`))e.preventDefault(),sc();else if(e.key===`Tab`&&T.detailId){let t=document.querySelector(`.pw-sheet`);if(!t)return;let n=[...t.querySelectorAll(`button:not([disabled]), input:not([disabled]), a[href], [tabindex='-1']`)].filter(e=>!e.closest(`[hidden]`));if(!n.length)return;let r=n[0],i=n[n.length-1];t.contains(document.activeElement)?e.shiftKey&&document.activeElement===r?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),r.focus()):(e.preventDefault(),r.focus())}}function zc(){pe.push(Pc),me.push(Fc),document.addEventListener(`input`,Lc),document.addEventListener(`keydown`,Rc),Ze(e=>{[`paseos`,`checklists`,`incidentes`,`rutas`,`plantillas`,`avisos`,`fotos`].includes(e)&&rc()}),window.addEventListener(`online`,rc),window.addEventListener(`offline`,rc),setInterval(Vc,15e3)}var Bc={iso:``,shift:``,minute:-1};function Vc(){if(!document.querySelector(`.pw-shell`))return;let e=wa();e.iso!==Bc.iso||Da(e)!==Bc.shift?rc():e.minutes!==Bc.minute&&(Bc.minute=e.minutes,document.querySelectorAll(`[data-pw-countdown]`).forEach(t=>{let n=Ma(t.dataset.pwCountdown,e.minutes);t.textContent=n.text,t.className=`pw-cd pw-cd--${n.kind}`}),[...document.querySelectorAll(`[data-pw-due]`)].some(t=>{let n=Ma(t.dataset.pwDue,e.minutes).kind===`late`;return String(+!!n)!==t.dataset.pwLate})&&rc())}var Hc=`America/Argentina/Buenos_Aires`,Uc=[`manana`,`tarde`],Wc=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,Gc=/(\d[\s.-]?){8,}/,Kc=10,qc=15,Jc=[`paseos`,`checklists`,`incidentes`,`plantillas`,`rutas`,`avisos`,`solicitudes`,`observaciones`,`cierres`,`fotos`],Yc=7,Xc=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],Zc=[`no sale`,`agregar perro`,`cambiar hora`,`cambiar paseador o ayudante`,`otro`],Qc={pendiente:{label:`Pendiente`,tone:`warn`},aplicado:{label:`Aplicado`,tone:`ok`},rechazado:{label:`Rechazado`,tone:`danger`}},$c=Wn(),A={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,observationDraft:`paseosJuanSupervisor_observacionBorrador`,avisoDraft:`paseosJuanSupervisor_avisoBorrador`,requestDraft:`paseosJuanSupervisor_pedidoBorrador`,nav:`paseosJuanSupervisor_pestana`,seen:`paseosJuanSupervisor_respuestasVistas`},el={observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},tl=null,nl=null,rl=null,il=new Map,al=new Set,ol=new Set,sl=new Map,cl=new Map,ll=new Set,ul=new Map,dl=new Set,fl=new Map,pl=!1,ml=!1,hl=null,gl=``,_l=`idle`,vl=0,yl=900;function j(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function bl(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function M(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function xl(e){try{localStorage.removeItem(e)}catch{}}var Sl=8e3;function N(e,t,n=`ok`){tl={area:e,text:t,tone:n,at:Date.now()},setTimeout(nu,8060)}function Cl(e){return tl&&Date.now()-tl.at>Sl&&(tl=null),tl&&tl.area===e?tl:null}var wl=new Set;function Tl(e){wl.add(e);let t=Cl(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?j(t.text):``}</p>
  `}function El(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function Dl(e,t,n){return`${e} ${e===1?t:n}`}function Ol(e){let t=String(e||``).match(/^(\d{1,2}):(\d{2})/);return t?Number(t[1])*60+Number(t[2]):null}function kl(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function Al(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function jl(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Hc,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:On[(n+6)%7]}}function Ml(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function Nl(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:y}function Pl(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function Fl(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Hc,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Il(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:v(t)}function Ll(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function Rl(e){return e.minutes<810?`manana`:`tarde`}function zl(e){let t=Al(e);return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function Bl(e,t){let n=b[e];return t.minutes<Ol(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=Ol(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function Vl(){return g.user()||{}}function Hl(e){let t=Vl();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function Ul(e,t){if(!e)return``;if(t?.actualizadoPor===e&&t.actualizadoPorNombre)return t.actualizadoPorNombre;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=Vl();if(n.usuario===e&&n.nombre)return n.nombre;let r=En.find(t=>t.id===e);if(r)return r.name;if(xu.has(e))return xu.get(e);for(let t of[`checklists`,`paseos`,`incidentes`])for(let n of ql(t)){if(n.creadoPor===e&&n.creadoPorNombre)return n.creadoPorNombre;if(n.actualizadoPor===e&&n.actualizadoPorNombre)return n.actualizadoPorNombre}return e}function Wl(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=Ul(e.actualizadoPor||e.creadoPor,e),r=Fl(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function Gl(e){let t=v();return e===`plantillas`||e===`avisos`||e===`fotos`?{}:e===`observaciones`?{desde:Ml(t,-6)}:e===`solicitudes`?{desde:Ml(t,-2)}:{desde:t}}function Kl(){g.token()&&Jc.forEach(e=>{let t=Gl(e),n=`${e}|${t.desde||``}`;dl.has(n)||(dl.add(n),e===`solicitudes`&&iu(),_.watch(e,t),_.list(e,t).then(()=>{ll.add(e),ul.delete(e)}).catch(t=>{ll.add(e),ul.set(e,t?.message||`No se pudieron traer los datos.`)}).finally(nu))})}function ql(e){let t=new Map(_.cached(e,Gl(e)).map(e=>[e.id,e]));return sl.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function Jl(e,t,n,r,i=`ok`){if(!t.id)return Yl(e,t,n,r,i);let a=`${e}:${t.id}`,o=(cl.get(a)||Promise.resolve()).then(()=>Yl(e,t,n,r,i));return cl.set(a,o),o.then(()=>{cl.get(a)===o&&cl.delete(a)}),o}async function Yl(e,t,n,r,i){try{let a=await _.save(e,t);if(a.pendiente)N(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=sl.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&sl.set(t,a),N(n,r,i)}return a}catch(e){return N(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function Xl(e,t,n,r){try{return await _.remove(e,t),sl.delete(`${e}:${t}`),N(n,r,`info`),!0}catch(e){return N(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function Zl(e=!0){if(!g.token())return;let t=await Promise.allSettled(Jc.map(e=>_.list(e,Gl(e))));if(t.forEach((e,t)=>{ll.add(Jc[t]),e.status===`rejected`?ul.set(Jc[t],e.reason?.message||`No se pudieron traer los datos.`):ul.delete(Jc[t])}),!e)return;let n=t.find(e=>e.status===`rejected`);n?N(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?N(`sync`,`Datos actualizados a las ${jl().time} hs.`):N(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),P(`sv-refresh`)}function Ql(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function $l(){if(hl=null,!Ql()||!document.querySelector(`.sv-shell`))return;let e=yl-(Date.now()-vl);e>0?hl=setTimeout($l,e):tu()}function eu(){let e=bl(A.folds,{}),t=!1;document.querySelectorAll(`.sv-shell [data-sv-fold]`).forEach(n=>{e[n.dataset.svFold]!==n.open&&(e[n.dataset.svFold]=n.open,t=!0)}),t&&M(A.folds,e),document.querySelectorAll(`.sv-shell [data-sv-stop-more]`).forEach(e=>{e.open?al.add(e.dataset.svStopMore):al.delete(e.dataset.svStopMore)})}function tu(){eu();let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>2&&window.scrollTo(0,r),!t)return;let i=document.getElementById(t);if(i&&(i.focus({preventScroll:!0}),n&&typeof i.setSelectionRange==`function`))try{i.setSelectionRange(n[0],n[1])}catch{}}function nu(){hl||=setTimeout($l,40)}function ru(){Ql()&&document.querySelector(`.sv-shell`)&&jl().time!==gl&&document.activeElement?.tagName!==`SELECT`&&nu()}function iu(){pl||=(ql(`solicitudes`).forEach(e=>fl.set(e.id,e.estado||`pendiente`)),!0)}function au(){let e=Vl().usuario,t=[];if(ql(`solicitudes`).forEach(n=>{let r=n.estado||`pendiente`,i=fl.get(n.id);pl&&i&&i!==r&&r!==`pendiente`&&n.creadoPor===e&&t.push(n),fl.set(n.id,r)}),!t.length)return;let n=t.filter(e=>e.estado===`aplicado`);N(`requests`,`El coordinador ${t.map(e=>`${e.estado===`aplicado`?`aplicó`:`rechazó`} «${Ru(e)}»${e.respuesta?`: ${e.respuesta}`:``}`).join(` · `)}.${n.length?` La ruta ya muestra el cambio.`:``}`,n.length?`ok`:`info`),n.length&&(_.list(`rutas`,Gl(`rutas`)).catch(()=>{}),_.list(`plantillas`,Gl(`plantillas`)).catch(()=>{}))}function ou(){ml||(ml=!0,Ze(e=>{Jc.includes(e)&&(ll.add(e),e===`solicitudes`&&au(),nu())}),document.addEventListener(`pointerdown`,()=>{vl=Date.now()},!0),window.addEventListener(`online`,nu),window.addEventListener(`offline`,nu),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Ql()&&Zl(!1)}),setInterval(ru,1e4))}function su(){try{return Object.values(el).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function cu(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=mu(e.dogId),n=Pl(e.fecha)||Il(Ll(e.id))||v();return{id:kl(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:b[e.shift]?.label||``,titulo:`Observación: ${t?t.name:y}`,autorAnterior:e.autor||``,migrado:!0}}async function lu(e,t){try{return await _.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function uu(){if(_l!==`idle`||!g.token()||!su()||!navigator.onLine)return;_l=`running`;let e=0,t=0,n=``,r=bl(el.observations,[]),i=[];for(let a of r){let r=cu(a);if(!r)continue;let o=await lu(`observaciones`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?M(el.observations,i):xl(el.observations);let a=bl(el.closure,{}),o=Object.entries(a).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&Uc.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(o.length){let r=o.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await _.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,s]of o){let[o,c]=a.split(`|`),l=`${o}_${c}`;if(i.has(l))continue;let u=await lu(`cierres`,{id:l,fecha:o,turno:b[c].label,notas:String(s.notas||``),resumen:``,cerrado:!!s.cerrado,horaCierre:s.cerrado?String(s.cerrado):``,migrado:!0});u?(r[a]=s,t+=1,n=u):e+=1}Object.keys(r).length?M(el.closure,r):xl(el.closure)}else t+=o.length}else xl(el.closure);_l=`done`,(e||t)&&N(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),nu()}function du(){let e=jl(),t=bl(A.view,{}),n=Rl(e),r=t.date===e.iso&&Uc.includes(t.shift)?t.shift:n;return{day:e.dayName,shift:r,now:e,isToday:!0,isCurrent:r===n,fecha:e.iso,fechaLabel:e.label}}function fu(e){M(A.view,{date:jl().iso,shift:e})}function pu(e,t=!1){let n=bl(A.folds,{});return typeof n[e]==`boolean`?n[e]:t}function mu(e){return x.find(t=>t.id===e)}function hu(e){let t=Al(e);return x.find(e=>Al(e.name)===t)}function gu(e){return(e?.safety||[]).some(e=>/bozal/i.test(e))}function _u(e){return(e?.safety||[]).find(e=>/bozal/i.test(e))||``}function vu(e){if(!e)return[];let t=new Set(e.incompatibleWith||[]);return x.forEach(n=>{n.id!==e.id&&(n.incompatibleWith||[]).includes(e.name)&&t.add(n.name)}),[...t]}function yu(e,t){return Al(e)===Al(t)}function bu(e){let t=e.perroId&&mu(e.perroId)||e.perroNombre&&hu(e.perroNombre)||null,n=Number(e.minutos)||t?.minutes||null;return{perroId:t?.id||e.perroId||``,perroNombre:e.perroNombre||t?.name||`Pendiente de confirmar`,hora:Ol(e.hora)===null?``:String(e.hora).slice(0,5),minutos:n,nota:e.nota||``,dog:t}}var xu=new Map;function Su(e,t){e.paseador&&e.paseadorNombre&&xu.set(e.paseador,String(e.paseadorNombre)),e.ayudante&&e.ayudanteNombre&&xu.set(e.ayudante,String(e.ayudanteNombre));let n=Array.isArray(e.paradas)?e.paradas:Array.isArray(e.perros)?e.perros.map(e=>({perroId:e,perroNombre:mu(e)?.name||e,hora:``})):[];return{code:e.ruta||e.id||`Pendiente de confirmar`,source:t,record:e,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,stops:n.map(bu)}}function Cu(e){let t=new Map;ql(`plantillas`).filter(t=>yu(t.dia,e.day)&&zl(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,Su(e,`plantilla`))),ql(`rutas`).filter(t=>t.fecha===e.fecha&&zl(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,Su(e,`dia`)));let n=!(ll.has(`plantillas`)&&ll.has(`rutas`)),r=!1;return t.size||($c.filter(t=>yu(t.dia,e.day)&&zl(t.turno)===e.shift).forEach(e=>t.set(e.ruta,Su(e,`planilla`))),r=t.size>0),{routes:[...t.values()].sort((e,t)=>e.code.localeCompare(t.code)),fallback:r,loading:n}}function wu(e){return e.source===`dia`?`Cambio del día (coordinador)`:e.source===`plantilla`?`Plantilla semanal (coordinador)`:`Planilla RPJ (respaldo)`}function Tu(e){let t=new Map;return e.forEach(e=>e.stops.forEach(e=>{e.dog&&!t.has(e.dog.id)&&t.set(e.dog.id,e.dog)})),[...t.values()]}function Eu(e,t,n){return`${e}_${t}_${n}`}function Du(){return new Map(ql(`paseos`).map(e=>[e.id,e]))}function Ou(e,t,n){let r=t?.estado||`pendiente`,i=Ol(e.hora),a=Number(e.minutos)||null,o=Ol(t?.horaRetiro),s=[`retirado`,`paseando`,`entregado`].includes(r),c=o??i,l=s&&o!==null&&i!==null?o-i:0,u=l>Kc,d={estado:r,retirado:s,record:t,pickupDelay:l,pickupLate:u,planned:i,minutos:a};if(r===`no-sale`)return{...d,kind:`nosale`,label:`No sale`,tone:`neutral`,live:`nosale`};if(r===`entregado`){let e=Ol(t?.horaEntrega),n=e!==null&&c!==null?e-c:null,r=n!==null&&a?n>a+qc:!1;return{...d,kind:`entregado`,label:`Entregado${t?.horaEntrega?` ${t.horaEntrega}`:``}`,tone:`ok`,live:`entregado`,duration:n,deliveryLate:r,late:u||r}}if(s){let e=c===null?null:n-c;if(e!==null&&a&&e>a+qc)return{...d,kind:`demorada`,label:`Demora ${e-a} min`,tone:`danger`,live:`atrasado`,walked:e,late:!0};let i=r===`paseando`?`Paseando`:`Retirado${t?.horaRetiro?` ${t.horaRetiro}`:``}`;return{...d,kind:`curso`,label:i,tone:`info`,live:`atiempo`,walked:e,late:u}}if(i===null)return{...d,kind:`sinhora`,label:`Sin hora`,tone:`neutral`,live:`atiempo`};let f=n-i;return f>Kc?{...d,kind:`atrasado`,label:`Atrasado ${f} min`,tone:`danger`,live:`atrasado`,delay:f,late:!0}:f>=0?{...d,kind:`ahora`,label:`Retirar ya`,tone:`warn`,live:`atiempo`,delay:f}:{...d,kind:`espera`,label:`Pendiente`,tone:`neutral`,live:`atiempo`}}function ku(e,t,n=Du()){return t.stops.map(t=>{let r=t.perroId?Eu(e.fecha,t.perroId,e.shift):``;return{stop:t,id:r,status:Ou(t,r?n.get(r):null,e.now.minutes)}})}function Au(e){let t={atiempo:0,atrasado:0,entregado:0,nosale:0};return e.forEach(({status:e})=>{t[e.live]+=1}),t}function ju(e,t){return ql(`checklists`).filter(n=>n.fecha===e&&(zl(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function Mu(e,t,n){return n&&ju(e,t).find(r=>r.id===`${e}_${n}_${t}`||r.creadoPor===n)||null}function Nu(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>Pu(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:Ul(e.creadoPor||e.actualizadoPor,e),at:Fl(e.actualizadoEn||e.creadoEn)}}function Pu(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):y}function Fu(e){return ql(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function Iu(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>mu(e)?.name||e);return t.length?El(t):y}function Lu(e){return ql(`avisos`).filter(t=>(t.vigenteHasta?t.vigenteHasta>=e:t.fecha===e)&&(!t.fecha||t.fecha<=e)).sort((e,t)=>Number(t.tipo===`seguridad`)-Number(e.tipo===`seguridad`)||String(t.fecha||``).localeCompare(String(e.fecha||``)))}function Ru(e){return`${e.tipo?`${e.tipo[0].toUpperCase()}${e.tipo.slice(1)}`:`Cambio`}${e.perroNombre?` · ${e.perroNombre}`:``}${e.ruta?` · ${e.ruta}`:``}`}function zu(e,t){return ql(`solicitudes`).filter(n=>n.fecha===e&&zl(n.turno)===t)}function Bu(e){let t=Vl().usuario;return ql(`solicitudes`).filter(n=>(n.creadoPor?n.creadoPor===t:n.pendiente)&&(n.fecha>=e||(n.estado||`pendiente`)===`pendiente`)).sort((e,t)=>String(t.creadoEn||`9`).localeCompare(String(e.creadoEn||`9`)))}function Vu(e,t=``,n=``,r=!1,i=`turno`,a=``){let o=n?mu(n):null;return{fecha:e.fecha,shift:e.shift,ruta:t,perroId:o?.id||``,perroNombre:o?.name||``,from:i,tipo:a||(o?`no sale`:`otro`),motivo:``,texto:``,hora:``,extraDog:``,urgente:!1,open:r}}function Hu(e){let t=bl(A.requestDraft,{});return t.fecha!==e.fecha||t.shift!==e.shift?Vu(e):{...Vu(e),...t}}function Uu(e){let t=new Set,n=[];return e.forEach(r=>{let i=new Set(r.stops.map(e=>e.dog?.name).filter(Boolean));r.stops.forEach(({dog:a})=>{(a?.incompatibleWith||[]).forEach(o=>{let s=[a.name,o].sort().join(`|`);if(t.has(s))return;let c=i.has(o)?r:e.find(e=>e.stops.some(e=>e.dog?.name===o));c&&(t.add(s),n.push({a:a.name,b:o,sameRoute:c===r,route:r.code,otherRoute:c.code}))})})}),n.sort((e,t)=>Number(t.sameRoute)-Number(e.sameRoute))}function Wu(e){let t=Tu(e),n=Uu(e),r=t.filter(gu),i=t.filter(e=>e.status!==`Activo`),a=t.filter(e=>e.review&&e.status===`Activo`),o=t.filter(e=>e.category===`SIN EVALUAR`),s=e.flatMap(e=>e.stops.filter(e=>!e.dog).map(t=>`${t.perroNombre} (${e.code})`)),c=[];return n.length&&c.push({tone:`danger`,icon:`alertTriangle`,title:n.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${n.length} parejas que no pueden ir juntas`,short:`No juntar: ${Dl(n.length,`pareja`,`parejas`)}`,chip:`No juntar`,count:n.length,lines:n.map(e=>`No juntar: ${e.a} con ${e.b}${e.sameRoute?` (los dos en ${e.route})`:` (${e.route} y ${e.otherRoute}: que no se crucen)`}.`),action:n.some(e=>e.sameRoute)?`Que no caminen juntos. Si la ruta los junta, pedile el cambio al coordinador.`:`Que los paseadores no se crucen con esos perros.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),r.length&&c.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${Dl(r.length,`perro`,`perros`)}`,short:`Bozal: ${r.map(e=>e.name).join(`, `)}`,chip:`Bozal`,count:r.length,lines:r.map(e=>`${e.name}: ${_u(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),i.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${i.length===1?`sale ${i[0].name}`:`salen ${i.length} perros`}`,short:`¿Sale? ${i.map(e=>e.name).join(`, `)}`,chip:`¿Sale?`,count:i.length,lines:i.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),s.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`${Dl(s.length,`perro de la ruta no tiene`,`perros de la ruta no tienen`)} ficha`,short:`Sin ficha: ${Dl(s.length,`perro`,`perros`)}`,chip:`Sin ficha`,count:s.length,lines:s.map(e=>`${e}: ${y}.`),action:`No se puede marcar el retiro desde acá. Pedile al coordinador que lo revise.`,source:`Fuente: rutas del coordinador y registro de perros.`}),a.length&&c.push({tone:`info`,icon:`fileText`,title:`${Dl(a.length,`perro tiene`,`perros tienen`)} datos a revisar`,lines:a.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${wn}.`}),o.length>1&&c.push({tone:`info`,icon:`eye`,title:`${o.length} perros salen en grupo SIN EVALUAR`,lines:[`${Mn[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Observación» en Más.`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),c}var Gu=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function Ku(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function qu(e){return{...Ku(e),...bl(A.observationDraft,{})}}function Ju(){let e=Gl(`observaciones`).desde;return ql(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function Yu(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${Vl().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function Xu(e){return[`Observación de conducta — ${Tn.name}`,`Perro: ${e.perroNombre||mu(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${Nl(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${Yu(e)}`].join(`
`)}function Zu(e){return`${e.fecha}_${e.shift}`}function Qu(e){return ql(`cierres`).find(t=>t.id===Zu(e))||null}function $u(e){return rl&&rl.id===Zu(e)?rl.notas:Qu(e)?.notas||``}function ed(e,t){return e?Ul(e,t):``}function td(e,t){let n=Du(),r=t.flatMap(t=>ku(e,t,n).map(e=>({...e,route:t}))),i=r.filter(e=>e.status.kind!==`nosale`);return{items:r,going:i,late:i.filter(e=>e.status.late),onTime:i.filter(e=>!e.status.late),noSale:r.filter(e=>e.status.kind===`nosale`),delivered:i.filter(e=>e.status.kind===`entregado`),notPicked:i.filter(e=>!e.status.retirado),notDelivered:i.filter(e=>e.status.retirado&&e.status.kind!==`entregado`)}}function nd(e){let{stop:t,status:n}=e,r=[];return n.kind===`atrasado`&&r.push(`sin retiro, previsto ${t.hora} (${n.delay} min)`),n.pickupLate&&r.push(`retiro previsto ${t.hora}, retirado ${n.record?.horaRetiro} (+${n.pickupDelay} min)`),n.kind===`demorada`&&r.push(`entrega demorada: ${n.walked} min de ${n.minutos} previstos`),n.deliveryLate&&r.push(`entrega demorada: ${n.duration} min de ${n.minutos} previstos`),`${t.perroNombre} (${r.join(`; `)||`con atraso`})`}function rd(e,t){let n=b[e.shift],{routes:r,fallback:i}=Cu(e),a=td(e,r),o=t||Qu(e),s=Uu(r),c=Tu(r).filter(gu),l=Ju().filter(t=>t.fecha===e.fecha&&zl(t.turno)===e.shift),u=Fu(e.fecha),d=zu(e.fecha,e.shift),f=$u(e),p=Vl(),ee=id(e,r),m=e=>e.length?e.map(e=>e.stop.perroNombre).join(`, `):`ninguno`,h=[`Cierre de turno — ${Tn.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisó: ${p.nombre||`Pendiente de confirmar`}`,`Rutas${i?` (tomadas de la planilla RPJ)`:``}:`,...r.map(e=>`- ${e.code}: paseador ${ed(e.paseador)||`Pendiente de confirmar`}${e.ayudante?`, ayudante ${ed(e.ayudante)}`:``} · ${Dl(e.stops.length,`perro`,`perros`)}`),`Cumplimiento: ${a.onTime.length} a tiempo · ${a.late.length} con atraso · ${a.noSale.length} no salieron (de ${a.items.length} previstos)`,`- Con atraso: ${a.late.length?a.late.map(nd).join(`; `):`ninguno`}`,`- No salieron: ${m(a.noSale)}`,`- Sin retiro marcado: ${m(a.notPicked)}`,`- Sin entrega marcada: ${m(a.notDelivered)}`,`Entregados: ${a.delivered.length} de ${a.going.length}`,`Checklist del equipo: ${ee.length?ee.map(e=>`${e.name}: ${e.checklist?Nu(e.checklist).complete?`equipo completo`:`incompleto${Nu(e.checklist).missing.length?` (falta ${Nu(e.checklist).missing.join(`, `)})`:``}`:`sin cargar`}`).join(`; `):`sin equipo asignado`}`,`Incidentes del día: ${u.length?u.map(e=>`${e.hora||`sin hora`} ${e.titulo||Iu(e)}`).join(`; `):`ninguno cargado`}`,`Pedidos de cambio al coordinador: ${d.length?d.map(e=>`${Ru(e)} (${Qc[e.estado]?.label||`Pendiente`})`).join(`; `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${s.length?s.map(e=>`${e.a} con ${e.b}`).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${c.length?c.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${l.length}`,`Notas del supervisor: ${f.trim()||`sin notas`}`];return o?.cerrado&&h.push(`Turno cerrado a las ${o.horaCierre||Fl(o.actualizadoEn)||`Pendiente de confirmar`} hs por ${Ul(o.actualizadoPor,o)||`Pendiente de confirmar`}.`),h.join(`
`)}function id(e,t){let n=new Map,r=(e,t,r)=>{if(!e)return;let i=n.get(e)||{usuario:e,name:Ul(e),roles:[]};i.roles.push(`${t} ${r}`),n.set(e,i)};return t.forEach(e=>{r(e.paseador,`Paseador`,e.code),r(e.ayudante,`Ayudante`,e.code)}),ju(e.fecha,e.shift).forEach(e=>{let t=e.creadoPor||String(e.id).split(`_`)[1];t&&!n.has(t)&&n.set(t,{usuario:t,name:Ul(t,e),roles:[`Sin ruta asignada`]})}),[...n.values()].map(t=>({...t,checklist:Mu(e.fecha,e.shift,t.usuario)}))}var ad=[{key:`ahora`,label:`Ahora`,icon:`clock`},{key:`rutas`,label:`Rutas`,icon:`route`},{key:`pedidos`,label:`Pedidos`,icon:`send`},{key:`mas`,label:`Más`,icon:`sliders`}],od={observacion:{label:`Observación`,icon:`eye`},avisos:{label:`Avisos`,icon:`mapPin`},seguridad:{label:`Seguridad`,icon:`shieldCheck`},incidentes:{label:`Incidentes`,icon:`alertTriangle`},ayuda:{label:`Ayuda`,icon:`help`}},sd=[{value:`no sale`,label:`No sale`},{value:`cambiar hora`,label:`Cambiar hora`},{value:`agregar perro`,label:`Agregar perro`},{value:`cambiar paseador o ayudante`,label:`Cambiar paseador`},{value:`otro`,label:`Otro`}],cd=[`Habló el tutor`,`Perro enfermo`,`Clima`,`Problema en la calle`,`Otro`],ld=5e3,ud=null,dd=!1,fd=``,pd=new Set;function md(){let e=bl(A.nav,{}),t=ad.some(t=>t.key===e.tab)?e.tab:`ahora`;return{tab:t,sub:t===`mas`&&od[e.sub]?e.sub:``}}function hd(e,t=``){M(A.nav,{tab:e,sub:t})}function gd(e,t,n=``){let r={text:e,run:t,focusId:n,at:Date.now()};ud=r,setTimeout(()=>{ud===r&&(ud=null,nu())},5060)}function _d(){return ud&&Date.now()-ud.at>=ld&&(ud=null),ud}var vd=null;function yd(){let e=du(),t=[...document.querySelectorAll(`.sv-shell #sv-dogs-now > .sv-dog`)].map(e=>e.id.replace(/^sv-dog-/,``));vd=t.length?{ids:t,fecha:e.fecha,shift:e.shift,until:Date.now()+ld}:null}function bd(e){return!vd||Date.now()>=vd.until||vd.fecha!==e.fecha||vd.shift!==e.shift?(vd=null,null):new Map(vd.ids.map((e,t)=>[e,t]))}function xd(){return new Set(bl(A.seen,[]))}function Sd(e){let t=bl(A.seen,[]).filter(t=>t!==e);t.push(e),M(A.seen,t.slice(-200))}function Cd(e){return(e.estado||`pendiente`)!==`pendiente`}function wd(e,t=xd()){return Cd(e)&&e.creadoPor===Vl().usuario&&!t.has(e.id)}var Td=null;function Ed(e){return e?(Td||(Td=new Map,_.cached(`fotos`).forEach(e=>{e?.miniatura&&Td.set(e.perroId||e.id,e)})),Td.get(e)||null):null}function Dd(e,t){return kl(`${e.code}-${t.perroId||t.perroNombre}`)}function Od(e,t,n=``){return kl(`sv-req-open-${e||`turno`}-${t||`ruta`}${n?`-${n}`:``}`)}function kd(e){if(!e)return``;let t=[];return vu(e).length&&t.push(`<span class="sv-mini is-danger">No juntar</span>`),gu(e)&&t.push(`<span class="sv-mini is-warn">Bozal</span>`),t.join(``)}function Ad(e){return`
    <div class="sv-shell">
      ${jd()}
      ${e}
    </div>
  `}function jd(){return`
    <header class="sv-header">
      <a class="sv-brand" href="/supervisor" data-link aria-label="Paseos Juan, supervisión. Ir a Ahora">
        <span class="sv-logo" aria-hidden="true">
          <img class="sv-logo-light" src="/paseos-juan-logo.png" alt="" />
          <img class="sv-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="sv-brand-text">
          <strong>Supervisión</strong>
          <small>${j(Vl().nombre||`Pendiente de confirmar`)}</small>
        </span>
      </a>
      <div class="sv-header-end">
        ${Md()}
        <span class="sv-a11y-slot" aria-hidden="true"></span>
        <button class="sv-icon-btn" type="button" id="sv-logout" data-sv-logout aria-label="Salir">
          ${h(`logOut`,`sv-icon`)}
        </button>
      </div>
    </header>
  `}function Md(){let e=_.pendingCount(),[t,n]=typeof navigator<`u`&&navigator.onLine===!1?[`warn`,`Sin señal`]:e?[`warn`,`${e} sin enviar`]:ul.size?[`danger`,`Error`]:[`ok`,`Al día`];return`
    <button type="button" class="sv-sync is-${t}" id="sv-refresh" data-sv-refresh aria-label="${j(n)}. Tocá para actualizar">
      <span class="sv-dot" aria-hidden="true"></span><span>${j(n)}</span>
    </button>
  `}function Nd(){Kl(),wl.clear(),Td=null;let e=du();gl=e.now.time;let t=md(),n=Cu(e),r=Du(),i=n.routes.flatMap(t=>ku(e,t,r).map(e=>({...e,route:t}))),a=t.tab===`rutas`?Qd(e,n,r):t.tab===`pedidos`?nf(e):t.tab===`mas`?af(e,n,t.sub):Gd(e,n,i),o=`${_f(e,n)}${dd?vf(e):``}`,s=`
    <main class="sv-main" id="sv-main" data-tab="${t.tab}">
      ${Pd()}
      ${a}
    </main>
    ${Fd(e,t.tab,i)}
    ${o}
    ${Id()}
  `;return _l===`idle`&&su()&&setTimeout(uu,0),s}function Pd(){return typeof navigator<`u`&&navigator.onLine===!1?`<p class="sv-line is-warn">${h(`uploadCloud`,`sv-icon`)} <span>Sin señal: seguí marcando, se envía solo.</span></p>`:ul.size?`
    <p class="sv-line is-danger">
      ${h(`alertCircle`,`sv-icon`)}
      <span>No se pudieron traer datos.</span>
      <button type="button" class="sv-btn sv-btn-small" id="sv-retry" data-sv-refresh>Reintentar</button>
    </p>
  `:``}function Fd(e,t,n){let r={ahora:n.filter(e=>e.status.live===`atrasado`).length,pedidos:Bu(e.fecha).filter(e=>wd(e)).length};return`
    <nav class="sv-nav" aria-label="Secciones">
      ${ad.map(e=>{let n=r[e.key]||0,i=e.key===`ahora`?`${n} ${n===1?`atrasado`:`atrasados`}`:`${n} ${n===1?`respuesta nueva`:`respuestas nuevas`}`;return`
          <button type="button" class="sv-nav-item ${t===e.key?`is-active`:``}" id="sv-tab-${e.key}" data-sv-tab="${e.key}" ${t===e.key?`aria-current="page"`:``}>
            <span class="sv-nav-icon">${h(e.icon,`sv-icon`)}${n?`<span class="sv-badge" aria-hidden="true">${n}</span>`:``}</span>
            <span>${e.label}</span>
            ${n?`<span class="visually-hidden">, ${i}</span>`:``}
          </button>
        `}).join(``)}
    </nav>
  `}function Id(){let e=_d(),t=tl?Cl(tl.area):null;return t&&wl.has(t.area)&&(t=null),`
    <div class="sv-toast-zone" role="status" aria-live="polite">
      ${t?`<p class="sv-toast is-${t.tone}">${j(t.text)}</p>`:``}
      ${e?`
        <p class="sv-toast is-undo">
          <span>${j(e.text)}</span>
          <button type="button" class="sv-toast-btn" id="sv-undo" data-sv-undo>Deshacer</button>
        </p>
      `:``}
    </div>
  `}function Ld(e){let t=b[e.shift],n=Bl(e.shift,e.now),r=b[Rl(e.now)];return`
    <section class="sv-shiftbar" aria-label="Turno">
      <div class="sv-segment" role="group" aria-label="Turno de hoy, ${j(e.day)} ${e.now.label}">
        ${Uc.map(t=>`
          <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">${b[t].label}</button>
        `).join(``)}
      </div>
      <p class="sv-shift-hours"><span>${t.from}–${t.to}</span>${n.tone===`live`?`<span class="visually-hidden">, en curso</span>`:` <span class="sv-moment is-${n.tone}">${j(n.label)}</span>`}</p>
    </section>
    ${e.isCurrent?``:`<p class="sv-line is-info">${h(`clock`,`sv-icon`)} <span>Mirás la ${t.label.toLowerCase()}. Ahora es la ${r.label.toLowerCase()}.</span></p>`}
  `}function Rd(e,t){return t.fallback?`
    <p class="sv-line is-warn">
      ${h(`alertCircle`,`sv-icon`)}
      <span>${t.loading?`Cargando rutas…`:`Ruta de la planilla: el coordinador no la cargó.`}</span>
    </p>
  `:``}function zd(e,t,n=!1){let r=e.perroNombre||``,i=j((String(r).trim()[0]||`?`).toUpperCase()),a=Ed(e.perroId),o=a?.miniatura||null,s=`sv-avatar${n?` is-small`:``}`;if(o)return n||!a?.archivoId?`<span class="${s}"><img src="${j(o)}" alt="" /></span>`:`
      <button type="button" class="${s} is-button" id="sv-photo-open-${t}" data-sv-photo-open="${j(e.perroId)}">
        <img src="${j(o)}" alt="" /><span class="visually-hidden">Ver foto grande de ${j(r)}</span>
      </button>
    `;if(n||!e.perroId)return`<span class="${s} is-empty" aria-hidden="true"><span class="sv-initial">${i}</span></span>`;let c=pd.has(e.perroId);return`
    <span class="${s} is-empty ${c?`is-busy`:``}">
      <input type="file" class="sv-file" id="sv-photo-${t}" accept="image/*" capture="environment" data-sv-photo="${j(e.perroId)}" data-name="${j(r)}" ${c?`disabled`:``} />
      <label for="sv-photo-${t}" class="sv-avatar-label">
        <span class="sv-initial" aria-hidden="true">${i}</span>
        <span class="sv-avatar-cam" aria-hidden="true">${h(`camera`,`sv-icon`)}${c?`…`:`Foto`}</span>
        <span class="visually-hidden">${c?`Subiendo foto de ${j(r)}`:`Sacar foto de ${j(r)}`}</span>
      </label>
    </span>
  `}function Bd(e){let t=e.dog,n=[],r=(e,t)=>n.push({tone:e,html:`<li class="sv-chip is-${e}">${t}</li>`});t||r(`danger`,`<b>Sin ficha</b>`),t&&t.status!==`Activo`&&r(`danger`,`<b>${j(t.status)}</b>`),(t?.safety||[]).forEach(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`,n=e.replace(/^(Sale con .+?)\s*\(misma familia\)\s*$/i,`$1`);r(t,t===`neutral`?j(n):`<b>${j(n)}</b>`)});let i=Al((t?.safety||[]).filter(e=>/no juntar/i.test(e)).join(` `)),a=vu(t).filter(e=>!i.includes(Al(e)));a.length&&r(`danger`,`<b>No juntar con ${j(El(a,`ni`))}</b>`),e.nota&&!(t?.safety||[]).some(t=>Al(t).includes(Al(e.nota)))&&r(/no juntar/i.test(e.nota)?`danger`:/bozal/i.test(e.nota)?`warn`:`info`,`<b>Ruta:</b> ${j(e.nota)}`);let o={danger:0,warn:1,info:2,neutral:3};return n.sort((e,t)=>o[e.tone]-o[t.tone]),n.length?`<ul class="sv-chips" aria-label="Avisos de ${j(e.perroNombre)}">${n.map(e=>e.html).join(``)}</ul>`:``}function Vd(e,t,n){let r=Vl(),i=b[e.shift],a=ed(t.paseador),o=n.filter(e=>e.status.live===`atrasado`),s=Au(n),c=[`Hola${a?` ${a}`:``}, te escribe ${r.nombre||`el supervisor`} (supervisión ${Tn.name}).`,`Ruta ${t.code}, turno ${i.label.toLowerCase()} ${e.fechaLabel}: ${s.entregado} entregados de ${n.length-s.nosale}.`];return o.length?(c.push(`Veo atrasados: ${o.map(e=>`${e.stop.perroNombre} (${e.status.kind===`demorada`?`entrega demorada`:`retiro ${e.stop.hora}`}, ${e.status.label.replace(/^\D+/,``)})`).join(`; `)}.`),c.push(`¿Cómo vienen? Avisame si necesitás ayuda.`)):c.push(`¿Cómo vienen? Avisame cualquier cosa.`),c.join(`
`)}function Hd(e,t,n=`Cambio`,r=``,i=``,a=`send`){let o=i?`${n}: pedir al coordinador`:r?`Cambio: pedir para ${r}`:e?`Cambio: pedir en la ruta ${e}`:`${n}: pedir cambio al coordinador`;return`
    <button type="button" class="sv-btn" id="${Od(e,t,i)}" data-sv-request-open data-ruta="${j(e)}" data-dog="${j(t)}" ${i?`data-tipo="${j(i)}"`:``} aria-label="${j(o)}">
      ${h(a,`sv-icon`)} <span>${j(n)}</span>
    </button>
  `}function Ud(e){if(!e.length)return``;let t=e[0],n=Qc[t.estado]||Qc.pendiente;if(!Cd(t))return`<p class="sv-notice is-warn">${h(`send`,`sv-icon`)} <span>Pedido «${j(t.tipo||`cambio`)}»: ${t.pendiente?`sin señal, se envía solo`:`esperando`}</span></p>`;let r=wd(t);return`
    <div class="sv-notice is-${n.tone} ${r?`is-new`:``}">
      ${h(t.estado===`aplicado`?`checkCircle`:`alertCircle`,`sv-icon`)}
      <p><b>Coordinador: ${j(n.label.toLowerCase())}</b>${t.respuesta?` · ${j(t.respuesta)}`:``}</p>
      ${r?`<button type="button" class="sv-btn sv-btn-small" id="sv-seen-${kl(t.id)}" data-sv-seen="${j(t.id)}" aria-label="Entendido">OK</button>`:``}
    </div>
  `}function Wd(e){return[...e].sort((e,t)=>String(t.creadoEn||`9`).localeCompare(String(e.creadoEn||`9`)))}function Gd(e,t,n){let r=Au(n),i=bd(e),a=e=>Dd(e.route,e.stop),o=i?n.filter(e=>i.has(a(e))).sort((e,t)=>i.get(a(e))-i.get(a(t))):[],s=n.filter(e=>!o.includes(e)),c=s.filter(e=>e.status.live===`atrasado`),l=s.filter(e=>e.status.kind===`entregado`||e.status.kind===`nosale`),u=s.filter(e=>!c.includes(e)&&!l.includes(e)),d=(e,t)=>(e.status.planned??9999)-(t.status.planned??9999)||String(e.stop.perroNombre).localeCompare(String(t.stop.perroNombre)),f=zu(e.fecha,e.shift),p=t.routes.length>1,ee=t=>Yd(e,t,Wd(f.filter(e=>e.perroId&&e.perroId===t.stop.perroId)),p),m=Qu(e),te=Bl(e.shift,e.now),ne=``;return ne=t.routes.length?`
      ${o.length||c.length||u.length?`
        <ol class="sv-dogs" id="sv-dogs-now" aria-label="Perros por atender">
          ${[...o,...c.sort(d),...u.sort(d)].map(ee).join(``)}
        </ol>
      `:`<p class="sv-line is-ok">${h(`checkCircle`,`sv-icon`)} <span>Todo listo en este turno.</span></p>`}
      ${l.length?`
        <details class="sv-fold" data-sv-fold="listos" ${pu(`listos`)?`open`:``}>
          <summary><span class="sv-fold-title">${h(`checkCircle`,`sv-icon`)} Listos</span><span class="sv-pill">${l.length}</span></summary>
          <ol class="sv-dogs">${l.sort(d).map(ee).join(``)}</ol>
        </details>
      `:``}
    `:`
      <div class="sv-empty-box">
        <p>${t.loading?`Cargando rutas…`:`Sin rutas para este turno.`}</p>
        ${t.loading?``:Hd(``,``,`Pedir ruta`)}
      </div>
    `,`
    ${Ld(e)}
    ${Kd(r,n.length)}
    ${Rd(e,t)}
    ${qd(e,t.routes)}
    ${te.tone===`done`&&!m?.cerrado&&t.routes.length?`
      <button type="button" class="sv-btn sv-btn-primary sv-btn-main sv-wide" id="sv-close-open-now" data-sv-close-open>${h(`flag`,`sv-icon`)} Cerrar turno</button>
    `:``}
    <h1 class="visually-hidden">Ahora: turno ${j(b[e.shift].label.toLowerCase())}</h1>
    ${ne}
  `}function Kd(e,t){return`
    <section class="sv-counter" aria-label="Cumplimiento del turno">
      <div class="sv-tiles" role="status" aria-live="polite">
        <p class="sv-tile is-info"><b>${e.atiempo}</b><span>A tiempo</span></p>
        <p class="sv-tile ${e.atrasado?`is-danger`:`is-neutral`}"><b>${e.atrasado}</b><span>${e.atrasado===1?`Atrasado`:`Atrasados`}</span></p>
        <p class="sv-tile is-ok"><b>${e.entregado}</b><span>${e.entregado===1?`Entregado`:`Entregados`}</span></p>
      </div>
      <details class="sv-help" data-sv-fold="ayuda-contador" ${pu(`ayuda-contador`)?`open`:``}>
        <summary>
          ${e.nosale?`<span>${e.nosale} no ${e.nosale===1?`sale`:`salen`}</span>`:``}
          <span class="sv-help-q" aria-hidden="true">?</span><span class="visually-hidden">${Dl(t,`perro`,`perros`)} en el turno. Cómo se cuenta</span>
        </summary>
        <p>Atrasado: pasó la hora de retiro + ${Kc} min, o el paseo pasó lo previsto + ${qc} min. Se recalcula cada minuto.</p>
      </details>
    </section>
  `}function qd(e,t){let n=[],r=Fu(e.fecha);if(r.length){let e=r[r.length-1];n.push({id:`sv-goto-incidentes`,goto:`mas:incidentes`,tone:`danger`,icon:`alertTriangle`,label:r.length===1?`Incidente`:`Incidentes`,count:r.length,aria:`${Dl(r.length,`incidente`,`incidentes`)} hoy. Último: ${e.titulo||Iu(e)}. Ver`})}t.some(e=>e.stops.length)&&Wu(t).filter(e=>e.tone!==`info`&&e.chip).forEach((e,t)=>{n.push({id:`sv-goto-seguridad${t?`-${t}`:``}`,goto:`mas:seguridad`,tone:e.tone,icon:e.icon,label:e.chip,count:e.count,aria:`${e.short||e.title}. Ver seguridad`})});let i=Lu(e.fecha);if(i.length){let e=i.some(e=>e.tipo===`seguridad`||e.tipo===`perro suelto`),t=i[0];n.push({id:`sv-goto-avisos`,goto:`mas:avisos`,tone:e?`danger`:`warn`,icon:`mapPin`,label:i.length===1?t.barrio||`Aviso`:`Avisos`,count:i.length>1?i.length:0,aria:i.length===1?`Aviso en ${t.barrio||`Pendiente de confirmar`}: ${t.mensaje||t.tipo||``}. Ver avisos`:`${i.length} avisos por barrio. Ver avisos`})}return n.length?`
    <ul class="sv-alerts" aria-label="Alertas del turno">
      ${n.map(e=>`
        <li>
          <button type="button" class="sv-alert-chip is-${e.tone}" id="${e.id}" data-sv-goto="${e.goto}" aria-label="${j(`${e.label}${e.count?` ${e.count}`:``}. ${e.aria}`)}">
            ${h(e.icon,`sv-icon`)}
            <b>${j(e.label)}</b>
            ${e.count?`<span class="sv-alert-n">${e.count}</span>`:``}
          </button>
        </li>
      `).join(``)}
    </ul>
  `:``}function Jd(e,t){if(t.retirado&&t.kind!==`entregado`){let e=Ol(t.record?.horaRetiro)??t.planned;if(e!==null&&t.minutos){let n=e+t.minutos;return{time:`${String(Math.floor(n/60)%24).padStart(2,`0`)}:${String(n%60).padStart(2,`0`)}`,label:`entrega`}}}return{time:e.hora||`--:--`,label:``}}function Yd(e,t,n,r=!0){let{stop:i,id:a,status:o,route:s}=t,c=Jd(i,o),l=Dd(s,i),u=o.record,d=ed(s.paseador),f=!!a&&(al.has(a)||il.has(a)&&il.get(a)!==(u?.nota||``)),p=o.kind===`entregado`&&o.late?`<span class="sv-state is-warn">Con atraso</span>`:o.kind===`curso`&&o.pickupLate?`<span class="sv-state is-warn">Retiro +${o.pickupDelay} min</span>`:``;return`
    <li class="sv-dog is-${o.tone}" id="sv-dog-${l}" tabindex="-1" aria-labelledby="sv-dog-name-${l}">
      <div class="sv-dog-top">
        ${zd(i,l)}
        <div class="sv-dog-main">
          <h3 class="sv-dog-name" id="sv-dog-name-${l}">${j(i.perroNombre)}</h3>
          ${r?`<p class="sv-dog-sub">${j(s.code)}${d?` · ${j(d)}`:``}</p>`:``}
          <p class="sv-dog-state"><span class="sv-state is-${o.tone}">${j(o.label)}</span>${p}</p>
        </div>
        <p class="sv-dog-time">
          <strong>${j(c.time)}</strong>
          ${c.label?`<small>${c.label}<span class="visually-hidden"> prevista</span></small>`:`<span class="visually-hidden">Retiro previsto</span>`}
        </p>
      </div>
      ${Bd(i)}
      ${Ud(n)}
      ${u?.nota?`<p class="sv-dog-note">${h(`message`,`sv-icon`)} <span>${j(u.nota)}</span></p>`:``}
      ${i.perroId?Xd(t,l,f):`
        <p class="sv-line is-warn">${h(`alertCircle`,`sv-icon`)} <span>Sin ficha: no se marca desde acá.</span></p>
        <div class="sv-row">${Hd(s.code,``,`Cambio`)}</div>
      `}
      ${f?Zd(t,l):``}
    </li>
  `}function Xd(e,t,n){let{stop:r,status:i,route:a,id:o}=e,s=ol.has(o),c=j(a.code),l=j(r.perroId),u=j(r.perroNombre),d=s?`disabled`:``,f=``;f=i.kind===`nosale`?`<button type="button" class="sv-btn sv-btn-main" id="sv-main-${t}" data-sv-absent="${l}" data-ruta="${c}" aria-label="${u} sí sale" ${d}>${h(`play`,`sv-icon`)} Sí sale</button>`:i.kind===`entregado`?``:i.retirado?`<button type="button" class="sv-btn sv-btn-primary sv-btn-main" id="sv-main-${t}" data-sv-deliver="${l}" data-ruta="${c}" aria-label="Marcar a ${u} como entregado" ${d}>${h(`packageCheck`,`sv-icon`)} Marcar entregado</button>`:`<button type="button" class="sv-btn sv-btn-primary sv-btn-main" id="sv-main-${t}" data-sv-pickup="${l}" data-ruta="${c}" aria-label="Marcar a ${u} como retirado" ${d}>${h(`checkCircle`,`sv-icon`)} Marcar retirado</button>`;let p=[!i.retirado&&i.kind!==`nosale`?`<button type="button" class="sv-btn" id="sv-absent-${t}" data-sv-absent="${l}" data-ruta="${c}" aria-label="${u} no sale" ${d}>${h(`x`,`sv-icon`)} <span>No sale</span></button>`:``,Hd(a.code,r.perroId,`Cambio`,r.perroNombre),`<button type="button" class="sv-btn" id="sv-opt-${t}" data-sv-options="${j(o)}" aria-expanded="${n}" aria-controls="sv-optbox-${t}" aria-label="Opciones de ${u}">${h(`sliders`,`sv-icon`)} <span>Opciones</span></button>`].filter(Boolean);return`
    <div class="sv-dog-actions" ${s?`aria-busy="true"`:``}>
      ${f}
      <div class="sv-row cols-${p.length}">${p.join(``)}</div>
    </div>
  `}function Zd(e,t){let{stop:n,status:r,route:i,id:a}=e,o=r.record,s=il.has(a)?il.get(a):o?.nota||``,c=r.kind===`entregado`?[`entrega`,`Desmarcar entrega`]:r.retirado?[`retiro`,`Desmarcar retiro`]:null,l=!!Ed(n.perroId),u=[o?.horaRetiro&&r.retirado?`Retiro ${o.horaRetiro}`:``,o?.horaPaseo&&r.retirado?`Paseo ${o.horaPaseo}`:``,o?.horaEntrega&&r.kind===`entregado`?`Entrega ${o.horaEntrega}`:``].filter(Boolean),d=pd.has(n.perroId);return`
    <div class="sv-optbox" id="sv-optbox-${t}">
      <div class="sv-note-row">
        <label class="sv-field" for="sv-note-${t}">Nota al paseador
          <input type="text" id="sv-note-${t}" data-sv-note="${j(a)}" value="${j(s)}" maxlength="200" placeholder="Sin datos de tutores" autocomplete="off" enterkeyhint="send" />
        </label>
        <button type="button" class="sv-btn sv-btn-primary" id="sv-note-save-${t}" data-sv-note-save="${j(n.perroId)}" data-ruta="${j(i.code)}">Guardar</button>
      </div>
      <div class="sv-row cols-${c?2:1}">
        ${c?`<button type="button" class="sv-btn" id="sv-unmark-${t}" data-sv-unmark="${j(n.perroId)}" data-step="${c[0]}" data-ruta="${j(i.code)}">${h(`x`,`sv-icon`)} <span>${c[1]}</span></button>`:``}
        ${l?`
          <span class="sv-file-btn">
            <input type="file" class="sv-file" id="sv-photo-new-${t}" accept="image/*" capture="environment" data-sv-photo="${j(n.perroId)}" data-name="${j(n.perroNombre)}" ${d?`disabled`:``} />
            <label for="sv-photo-new-${t}" class="sv-btn">${h(`camera`,`sv-icon`)} <span>${d?`Subiendo…`:`Foto nueva`}</span></label>
          </span>
        `:``}
      </div>
      ${u.length||o?`<p class="sv-source">${j([u.join(` · `),Wl(o)].filter(Boolean).join(` · `))}</p>`:``}
    </div>
  `}function Qd(e,t,n){let{routes:r}=t,i=new Set(r.flatMap(e=>e.stops.map(e=>e.perroId)).filter(Boolean)),a=ql(`paseos`).filter(t=>t.fecha===e.fecha&&String(t.id).endsWith(`_${e.shift}`)&&t.perroId&&!i.has(t.perroId)),o=id(e,r).filter(e=>e.roles.includes(`Sin ruta asignada`));return`
    ${Ld(e)}
    ${Rd(e,t)}
    <h1 class="sv-h1">Rutas</h1>
    ${r.length?r.map(t=>ef(e,t,n)).join(``):`
      <div class="sv-empty-box">
        <p>${t.loading?`Cargando rutas…`:`Sin rutas para este turno.`}</p>
        ${t.loading?``:Hd(``,``,`Pedir ruta`)}
      </div>
    `}
    ${o.length?`
      <section class="sv-card" aria-labelledby="sv-loose-title">
        <h2 class="sv-h2" id="sv-loose-title">Sin ruta</h2>
        <ul class="sv-people">${o.map(t=>`<li>${$d(`Equipo`,t.usuario,e)}</li>`).join(``)}</ul>
      </section>
    `:``}
    ${a.length?`
      <section class="sv-card" aria-labelledby="sv-extras-title">
        <h2 class="sv-h2" id="sv-extras-title">Fuera de ruta</h2>
        <ul class="sv-plain-list">
          ${a.map(e=>`<li><b>${j(e.perroNombre||e.perroId)}</b> · ${j(e.estado||`pendiente`)} <small>${j(Wl(e))}</small></li>`).join(``)}
        </ul>
      </section>
    `:``}
  `}function $d(e,t,n){if(!t)return`<span class="sv-person"><small>${j(e)}</small><b>${e===`Ayudante`?`Sin ayudante`:y}</b></span>`;let r=n.now.minutes>=Ol(b[n.shift].from),i=Mu(n.fecha,n.shift,t),a=i?Nu(i):null,[o,s]=a?i.pendiente?[`info`,`Checklist sin enviar`]:a.complete?[`ok`,`Checklist ✓`]:[`danger`,`Checklist incompleto`]:[r?`warn`:`neutral`,`Sin checklist`];return`
    <span class="sv-person">
      <small>${j(e)}</small>
      <b>${j(Ul(t)||`Pendiente de confirmar`)}</b>
      <span class="sv-state is-${o}">${j(s)}</span>
      ${a&&!a.complete&&a.missing.length?`<small class="sv-person-miss">Falta: ${j(a.missing.join(`, `))}</small>`:``}
    </span>
  `}function ef(e,t,n){let r=ku(e,t,n),i=Au(r),a=ed(t.paseador),o=Wd(zu(e.fecha,e.shift).filter(e=>e.ruta===t.code&&!e.perroId)),s=`sv-route-${kl(t.code)}`;return`
    <article class="sv-card sv-route" aria-labelledby="${s}">
      <header class="sv-route-head">
        <h2 class="sv-h2" id="${s}">${j(t.code)}</h2>
        <p class="sv-route-counts">
          <span class="sv-state is-neutral">${Dl(t.stops.length,`perro`,`perros`)}</span>
          ${i.atrasado?`<span class="sv-state is-danger">${Dl(i.atrasado,`atrasado`,`atrasados`)}</span>`:``}
          <span class="sv-state is-ok">${Dl(i.entregado,`listo`,`listos`)}</span>
        </p>
      </header>
      <ul class="sv-people">
        <li>${$d(`Paseador`,t.paseador,e)}</li>
        <li>${$d(`Ayudante`,t.ayudante,e)}</li>
      </ul>
      ${t.notas?`<p class="sv-dog-note">${h(`message`,`sv-icon`)} <span>${j(t.notas)}</span></p>`:``}
      ${Ud(o)}
      <div class="sv-row cols-2">
        <a class="sv-btn" id="sv-wa-${kl(t.code)}" href="https://wa.me/?text=${encodeURIComponent(Vd(e,t,r))}" target="_blank" rel="noopener noreferrer" aria-label="${a?`Escribirle a ${j(a)} por WhatsApp`:`Escribir al paseador por WhatsApp`}">
          ${h(`message`,`sv-icon`)} <span>WhatsApp</span>
        </a>
        ${Hd(t.code,``,`Cambio`)}
      </div>
      <ol class="sv-stops" aria-label="Perros de ${j(t.code)} en orden">
        ${r.map(e=>tf(t,e)).join(``)}
      </ol>
      <p class="sv-source">${j(wu(t))}${t.record.actualizadoEn&&t.source!==`planilla`?` · ${j(Wl(t.record,`Último cambio de`))}`:``}</p>
    </article>
  `}function tf(e,t){let{stop:n,status:r}=t,i=Dd(e,n),a=r.kind===`entregado`||r.kind===`nosale`;return`
    <li>
      <button type="button" class="sv-stop is-${r.tone}" id="sv-stop-${i}" data-sv-goto-dog="${i}" data-done="${a?`1`:``}">
        <span class="sv-stop-time">${j(n.hora||`--:--`)}</span>
        ${zd(n,i,!0)}
        <span class="sv-stop-name"><b>${j(n.perroNombre)}</b>${kd(n.dog)}</span>
        <span class="sv-state is-${r.tone}">${j(r.label)}</span>
      </button>
    </li>
  `}function nf(e){let t=Bu(e.fecha),n=xd(),r=t.filter(e=>!Cd(e)).length;return`
    <h1 class="sv-h1">Pedidos</h1>
    <p class="sv-lead">El coordinador cambia la ruta y te responde.</p>
    <div class="sv-row cols-3 sv-quick" role="group" aria-label="Nuevo pedido">
      ${Hd(``,``,`Sumar perro`,``,`agregar perro`,`plus`)}
      ${Hd(``,``,`Paseador`,``,`cambiar paseador o ayudante`,`users`)}
      ${Hd(``,``,`Otro`,``,`otro`,`message`)}
    </div>
    ${t.length?`
      <p class="sv-route-counts"><span class="sv-state is-warn">${r} esperando</span><span class="sv-state is-neutral">${t.length} en total</span></p>
      <ul class="sv-requests">${t.map(e=>rf(e,n)).join(``)}</ul>
    `:`<div class="sv-empty-box"><p>${ll.has(`solicitudes`)?`Sin pedidos.`:`Cargando…`}</p></div>`}
  `}function rf(e,t){let n=Qc[e.estado]||Qc.pendiente,r=wd(e,t),i=e.pendiente?`Sin señal: se envía solo`:`${Nl(e.fecha)} · ${String(e.turno||``).toLowerCase()} · ${Fl(e.creadoEn)} hs`;return`
    <li class="sv-request is-${n.tone} ${r?`is-new`:``}">
      <p class="sv-request-head">
        <span class="sv-state is-${n.tone}">${j(n.label)}</span>
        ${e.urgente?`<span class="sv-state is-danger">Urgente</span>`:``}
        ${r?`<span class="sv-state is-info">Nuevo</span>`:``}
      </p>
      <h2 class="sv-h3">${j(Ru(e))}</h2>
      ${e.detalle?`<p>${j(e.detalle)}</p>`:``}
      <p class="sv-muted">Motivo: ${j(e.motivo||`Pendiente de confirmar`)}</p>
      <p class="sv-answer">${h(`message`,`sv-icon`)} <span>${j(e.respuesta||(Cd(e)?`Sin comentario.`:`Todavía no respondió.`))}</span></p>
      <p class="sv-source">${j(i)}</p>
      ${r?`<button type="button" class="sv-btn sv-btn-small" id="sv-seen-${kl(e.id)}" data-sv-seen="${j(e.id)}">OK, visto</button>`:``}
    </li>
  `}function af(e,t,n){if(n){let r={observacion:()=>ff(e,Tu(t.routes)),avisos:()=>df(e),seguridad:()=>of(t.routes),incidentes:()=>cf(e),ayuda:()=>lf()}[n]();return`
      <div class="sv-subhead">
        <button type="button" class="sv-btn sv-btn-back" id="sv-back" data-sv-sub="" aria-label="Volver a Más">${h(`arrowRight`,`sv-icon sv-flip`)} Más</button>
        <h1 class="sv-h1">${j(od[n].label)}</h1>
      </div>
      ${r}
    `}let r=Qu(e),i=r?.cerrado?r.horaCierre||Fl(r.actualizadoEn):``,a=Lu(e.fecha).length,o=t.routes.some(e=>e.stops.length)?Wu(t.routes).length:0,s=Fu(e.fecha).length,c=Ju().length,l=(e,t,n,r,i=``)=>`
    <li>
      <button type="button" class="sv-menu-tile ${i}" ${e}>
        ${h(t,`sv-icon`)}
        <b>${n}</b>
        ${r?`<small>${r}</small>`:``}
      </button>
    </li>
  `;return`
    <h1 class="sv-h1">Más</h1>
    <ul class="sv-menu">
      ${l(`id="sv-close-open" data-sv-close-open`,`flag`,`Cerrar turno`,r?.cerrado?`Cerrado ${j(i)}`:`${j(b[e.shift].label)} abierto`,r?.cerrado?`is-ok`:`is-primary`)}
      ${l(`id="sv-sub-observacion" data-sv-sub="observacion"`,`eye`,`Observación`,c?`${c} en ${Yc} días`:`Conducta`)}
      ${l(`id="sv-sub-avisos" data-sv-sub="avisos"`,`mapPin`,`Avisos`,a?Dl(a,`vigente`,`vigentes`):`Por barrio`,a?`is-warn`:``)}
      ${l(`id="sv-sub-seguridad" data-sv-sub="seguridad"`,`shieldCheck`,`Seguridad`,o?Dl(o,`aviso`,`avisos`):`Sin avisos`)}
      ${l(`id="sv-sub-incidentes" data-sv-sub="incidentes"`,`alertTriangle`,`Incidentes`,s?`${s} hoy`:`Ninguno hoy`,s?`is-danger`:``)}
      <li>
        <a class="sv-menu-tile" id="sv-go-paseador" href="/paseador" data-link>
          ${h(`pawPrint`,`sv-icon`)}<b>Modo paseador</b><small>Ver su ruta</small>
        </a>
      </li>
      ${l(`id="sv-sub-ayuda" data-sv-sub="ayuda"`,`help`,`Ayuda`,`Colores y fuentes`)}
      ${l(`id="sv-refresh-more" data-sv-refresh`,`radio`,`Actualizar`,`Traer lo nuevo`)}
      ${l(`id="sv-logout-more" data-sv-logout`,`logOut`,`Salir`,``)}
    </ul>
  `}function of(e){if(!e.some(e=>e.stops.length))return`<div class="sv-empty-box"><p>Sin perros en este turno.</p></div>`;let t=Wu(e);if(!t.length)return`<p class="sv-line is-ok">${h(`checkCircle`,`sv-icon`)} <span>Sin incompatibles, bozales ni datos a revisar.</span></p>`;let n=t.filter(e=>e.tone!==`info`),r=t.filter(e=>e.tone===`info`);return`
    ${n.length?`<ol class="sv-warnings">${n.map(e=>sf(e)).join(``)}</ol>`:`<p class="sv-line is-ok">${h(`checkCircle`,`sv-icon`)} <span>Sin incompatibles ni bozales.</span></p>`}
    ${r.length?`
      <details class="sv-fold" data-sv-fold="seguridad-info" ${pu(`seguridad-info`)?`open`:``}>
        <summary><span class="sv-fold-title">${h(`fileText`,`sv-icon`)} A revisar</span><span class="sv-pill">${r.reduce((e,t)=>e+t.lines.length,0)}</span></summary>
        <ol class="sv-warnings sv-fold-body">${r.map(e=>sf(e)).join(``)}</ol>
      </details>
    `:``}
  `}function sf(e){return`
    <li class="sv-warning is-${e.tone}">
      <h2 class="sv-h3">${h(e.icon,`sv-icon`)} ${j(e.title)}</h2>
      <ul class="sv-plain-list">
        ${e.lines.map(e=>`<li>${j(e)}</li>`).join(``)}
      </ul>
      <p class="sv-warning-action"><b>Qué hacer:</b> ${j(e.action)}</p>
      <p class="sv-source">${j(e.source)}</p>
    </li>
  `}function cf(e){let t=Fu(e.fecha);return t.length?`
    <ul class="sv-requests">
      ${t.map(e=>`
        <li class="sv-request is-danger">
          <p class="sv-request-head">
            ${e.riesgo?`<span class="sv-state is-danger">Riesgo: ${j(e.riesgo)}</span>`:``}
            ${e.lesiones?`<span class="sv-state is-warn">Lesiones: ${j(e.lesiones)}</span>`:``}
          </p>
          <h2 class="sv-h3">${j(e.titulo||`Incidente`)}</h2>
          <p class="sv-muted">${e.hora?`${j(e.hora)} hs · `:``}${j(Iu(e))}${e.lugar?` · ${j(e.lugar)}`:``}${e.barrio?` · ${j(e.barrio)}`:``}</p>
          <dl class="sv-detail">
            ${[[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Protocolo`,e.protocolo]].filter(([,e])=>e).map(([e,t])=>`<div><dt>${e}</dt><dd>${j(t)}</dd></div>`).join(``)}
          </dl>
          <p class="sv-source">${j(Wl(e,`Cargó`))}</p>
        </li>
      `).join(``)}
    </ul>
  `:`<div class="sv-empty-box"><p>${ll.has(`incidentes`)?`Sin incidentes hoy.`:`Cargando…`}</p></div>`}function lf(){return`
    <section class="sv-card" aria-labelledby="sv-legend-title">
      <h2 class="sv-h2" id="sv-legend-title">Colores</h2>
      <ul class="sv-legend">
        ${[[`neutral`,`Pendiente`,`Todavía no es la hora.`],[`warn`,`Retirar ya`,`Es la hora de retiro.`],[`info`,`Retirado`,`En la calle.`],[`ok`,`Entregado`,`Volvió a casa.`],[`danger`,`Atrasado`,`Retiro + ${Kc} min o paseo + ${qc} min.`]].map(([e,t,n])=>`<li><span class="sv-state is-${e}">${t}</span> ${n}</li>`).join(``)}
        <li><span class="sv-chip is-danger"><b>No juntar</b></span> Esos perros no caminan juntos.</li>
        <li><span class="sv-chip is-warn"><b>Bozal</b></span> Sale con bozal puesto y revisado.</li>
      </ul>
    </section>
    <section class="sv-card" aria-labelledby="sv-how-title">
      <h2 class="sv-h2" id="sv-how-title">Cómo se usa</h2>
      <ul class="sv-plain-list">
        <li><b>Marcar retirado / entregado:</b> un toque. Si te equivocás, «Deshacer» abajo.</li>
        <li><b>Cambio:</b> se lo pedís al coordinador. Vos no cambiás la ruta.</li>
        <li><b>Sin señal:</b> seguí marcando, se envía solo. Las fotos necesitan señal.</li>
      </ul>
    </section>
    <details class="sv-fold" data-sv-fold="referencias" ${pu(`referencias`)?`open`:``}>
      <summary><span class="sv-fold-title">${h(`fileText`,`sv-icon`)} Categorías y fuentes</span></summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(Mn).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-source">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-plain-list sv-source">
          <li>Rutas y horarios: los arma el coordinador. Respaldo: ${Tn.officialSources.routes}, leída el ${wn}.</li>
          <li>Perros: ${Tn.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador.</li>
        </ul>
      </div>
    </details>
  `}function uf(e){return{barrio:``,tipo:Xc[0],mensaje:``,vigenteHasta:e.fecha,...bl(A.avisoDraft,{})}}function df(e){let t=Lu(e.fecha),n=uf(e),r=pu(`aviso-form`,!t.length);return`
    ${t.length?`
      <ul class="sv-requests">
        ${t.map(e=>{let t=e.tipo===`seguridad`||e.tipo===`perro suelto`;return`
            <li class="sv-request is-${t?`danger`:`warn`}">
              <p class="sv-request-head"><span class="sv-state is-${t?`danger`:`warn`}">${j(e.tipo||`otro`)}</span></p>
              <h2 class="sv-h3">${j(e.barrio||`Pendiente de confirmar`)}</h2>
              <p>${j(e.mensaje||``)}</p>
              <p class="sv-source">${e.vigenteHasta?`Hasta ${j(Nl(e.vigenteHasta))}`:`Hoy`} · ${j(Wl(e,`Cargó`))}</p>
            </li>
          `}).join(``)}
      </ul>
    `:`<div class="sv-empty-box"><p>${ll.has(`avisos`)?`Sin avisos vigentes.`:`Cargando…`}</p></div>`}
    <details class="sv-fold" data-sv-fold="aviso-form" ${r?`open`:``}>
      <summary><span class="sv-fold-title">${h(`plus`,`sv-icon`)} Nuevo aviso</span></summary>
      <form class="sv-form sv-fold-body" data-sv-aviso-form novalidate>
        <label class="sv-field" for="sv-aviso-barrio">Barrio
          <input type="text" id="sv-aviso-barrio" data-sv-aviso="barrio" list="sv-barrios" value="${j(n.barrio)}" autocomplete="off" required />
          <datalist id="sv-barrios">${Gn.map(e=>`<option value="${j(e)}"></option>`).join(``)}</datalist>
        </label>
        <fieldset class="sv-chipset">
          <legend>Tipo</legend>
          ${Xc.map((e,t)=>`
            <label class="sv-chip-opt" for="sv-aviso-tipo-${t}">
              <input type="radio" name="sv-aviso-tipo" id="sv-aviso-tipo-${t}" value="${e}" data-sv-aviso="tipo" ${e===n.tipo?`checked`:``} />
              <span>${e[0].toUpperCase()}${e.slice(1)}</span>
            </label>
          `).join(``)}
        </fieldset>
        <label class="sv-field" for="sv-aviso-mensaje">Qué pasa
          <textarea id="sv-aviso-mensaje" rows="2" data-sv-aviso="mensaje" placeholder="Ej.: corte en la entrada sur hasta las 12" required>${j(n.mensaje)}</textarea>
        </label>
        <label class="sv-field sv-field-short" for="sv-aviso-hasta">Vale hasta
          <input type="date" id="sv-aviso-hasta" data-sv-aviso="vigenteHasta" value="${j(n.vigenteHasta)}" min="${e.fecha}" required />
        </label>
        <p class="sv-source">Lo ve el equipo y marketing. Sin domicilios ni teléfonos.</p>
        ${Tl(`aviso`)}
        <button type="submit" class="sv-btn sv-btn-primary sv-btn-main" id="sv-aviso-save">${h(`send`,`sv-icon`)} Publicar</button>
      </form>
    </details>
  `}function ff(e,t){let n=qu(e),r=Ju(),i=new Set(t.map(e=>e.id)),a=x.filter(e=>!i.has(e.id));return`
    <p class="sv-lead">Contá lo que se vio y se oyó, sin etiquetas.</p>
    <form class="sv-form sv-card" data-sv-obs-form novalidate>
      <label class="sv-field" for="sv-obs-dog">Perro
        <select id="sv-obs-dog" data-sv-obs="dogId" required>
          <option value="">Elegí</option>
          ${t.length?`<optgroup label="De este turno">${t.map(e=>`<option value="${e.id}" ${n.dogId===e.id?`selected`:``}>${j(e.name)}</option>`).join(``)}</optgroup>`:``}
          <optgroup label="Otros">${a.map(e=>`<option value="${e.id}" ${n.dogId===e.id?`selected`:``}>${j(e.name)}</option>`).join(``)}</optgroup>
        </select>
      </label>
      <div class="sv-grid-2">
        <label class="sv-field" for="sv-obs-fecha">Fecha
          <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${j(n.fecha)}" inputmode="numeric" placeholder="${e.now.label}" maxlength="10" autocomplete="off" required />
        </label>
        <label class="sv-field" for="sv-obs-hora">Hora
          <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${j(n.hora)}" />
        </label>
      </div>
      ${Gu.map(e=>`
        <label class="sv-field" for="sv-obs-${e.key}">${pf[e.key]}
          ${e.type===`input`?`<input type="text" id="sv-obs-${e.key}" data-sv-obs="${e.key}" value="${j(n[e.key])}" placeholder="${j(mf[e.key])}" required />`:`<textarea id="sv-obs-${e.key}" rows="2" data-sv-obs="${e.key}" placeholder="${j(mf[e.key])}" required>${j(n[e.key])}</textarea>`}
        </label>
      `).join(``)}
      <label class="sv-switch" for="sv-obs-seguimiento">
        <input type="checkbox" role="switch" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${n.seguimiento?`checked`:``} />
        <span class="sv-switch-track" aria-hidden="true"></span>
        <span>Avisar a Juan (seguimiento)</span>
      </label>
      ${Tl(`observation`)}
      <button type="submit" class="sv-btn sv-btn-primary sv-btn-main" id="sv-obs-save">${h(`checkCircle`,`sv-icon`)} Guardar</button>
    </form>
    ${r.length?`
      <details class="sv-fold" data-sv-fold="obs-lista" ${pu(`obs-lista`)?`open`:``}>
        <summary><span class="sv-fold-title">${h(`eye`,`sv-icon`)} Registradas</span><span class="sv-pill">${r.length}</span></summary>
        <ul class="sv-requests sv-fold-body">${r.map(e=>hf(e)).join(``)}</ul>
      </details>
    `:``}
  `}var pf={lugar:`Lugar`,estimulo:`Qué pasó antes`,reaccion:`Qué hizo el perro`,accion:`Qué hiciste vos`,resultado:`Cómo terminó`},mf={lugar:`Calle o plaza. Sin domicilios.`,estimulo:`Ej.: pasó un perro suelto a 5 m`,reaccion:`Ej.: ladró y tiró de la correa`,accion:`Ej.: crucé de vereda`,resultado:`Ej.: a los 30 s se calmó`};function hf(e){let t=nl===e.id,n=e.perroNombre||mu(e.perroId)?.name||`Pendiente de confirmar`,r=kl(e.id);return`
    <li class="sv-request ${e.seguimiento?`is-warn`:`is-neutral`}">
      <p class="sv-request-head">${e.seguimiento?`<span class="sv-state is-warn">Seguimiento</span>`:``}<span class="sv-muted">${j(Nl(e.fecha))}${e.hora?` · ${j(e.hora)} hs`:``}</span></p>
      <h2 class="sv-h3">${j(n)}${e.lugar?` · ${j(e.lugar)}`:``}</h2>
      <dl class="sv-detail">
        <div><dt>Antes</dt><dd>${j(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Perro</dt><dd>${j(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${j(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Final</dt><dd>${j(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${j(Yu(e))}</p>
      <div class="sv-row cols-2">
        ${t?`
          <button type="button" class="sv-btn sv-btn-danger" id="sv-obs-del-ok-${r}" data-sv-obs-delete-ok="${j(e.id)}">Sí, borrar</button>
          <button type="button" class="sv-btn" id="sv-obs-del-no-${r}" data-sv-obs-delete-cancel>No</button>
        `:`
          <button type="button" class="sv-btn" id="sv-obs-copy-${r}" data-sv-obs-copy="${j(e.id)}">${h(`copy`,`sv-icon`)} <span>Copiar</span></button>
          ${Hl(e)?`<button type="button" class="sv-btn" id="sv-obs-del-${r}" data-sv-obs-delete="${j(e.id)}">${h(`x`,`sv-icon`)} <span>Borrar</span></button>`:``}
        `}
      </div>
    </li>
  `}function gf(e,t,n,r,i){return`
    <div class="sv-sheet-wrap">
      <div class="sv-backdrop" data-sv-sheet-close aria-hidden="true"></div>
      <section class="sv-sheet" role="dialog" aria-modal="true" aria-labelledby="${e}">
        <header class="sv-sheet-head">
          <div>
            <h2 class="sv-h2" id="${e}">${t}</h2>
            ${n?`<p class="sv-muted">${n}</p>`:``}
          </div>
          <button type="button" class="sv-icon-btn" id="sv-sheet-x" data-sv-sheet-close aria-label="${j(i)}">${h(`x`,`sv-icon`)}</button>
        </header>
        ${r}
      </section>
    </div>
  `}function _f(e,t){let n=Hu(e);if(!n.open)return``;let r=t.routes,i=[n.perroNombre,n.ruta?n.ruta:`Turno ${b[e.shift].label.toLowerCase()}`].filter(Boolean).join(` · `),a=n.from===`turno`&&r.length>1,o=new Set(r.flatMap(e=>e.stops.map(e=>e.perroId)).filter(Boolean)),s=x.filter(e=>!o.has(e.id)&&e.status===`Activo`).sort((e,t)=>e.name.localeCompare(t.name)),c=n.perroId?r.find(e=>e.code===n.ruta)?.stops.find(e=>e.perroId===n.perroId):null,l=(e,t,n,r)=>t.map(({value:t,label:i},a)=>`
        <label class="sv-chip-opt" for="${r}-${a}">
          <input type="radio" name="${e}" id="${r}-${a}" value="${j(t)}" data-sv-req="${e.replace(`sv-req-`,``)}" ${t===n?`checked`:``} />
          <span>${j(i)}</span>
        </label>
      `).join(``),u=`
    <form class="sv-form" data-sv-request-form novalidate>
      <fieldset class="sv-chipset">
        <legend>Qué</legend>
        ${l(`sv-req-tipo`,sd,n.tipo,`sv-req-tipo`)}
      </fieldset>
      ${a?`
        <fieldset class="sv-chipset">
          <legend>Ruta</legend>
          ${l(`sv-req-ruta`,[...r.map(e=>({value:e.code,label:e.code})),{value:``,label:`Todas`}],n.ruta,`sv-req-ruta`)}
        </fieldset>
      `:``}
      ${n.tipo===`cambiar hora`?`
        <label class="sv-field sv-field-short" for="sv-req-hora">Hora nueva${c?.hora?` (era ${j(c.hora)})`:``}
          <input type="time" id="sv-req-hora" data-sv-req="hora" value="${j(n.hora)}" step="300" />
        </label>
      `:``}
      ${n.tipo===`agregar perro`?`
        <label class="sv-field" for="sv-req-extra">Perro a sumar
          <select id="sv-req-extra" data-sv-req="extraDog">
            <option value="">Elegí</option>
            ${s.map(e=>`<option value="${e.id}" ${n.extraDog===e.id?`selected`:``}>${j(e.name)}</option>`).join(``)}
          </select>
        </label>
      `:``}
      <fieldset class="sv-chipset">
        <legend>Por qué</legend>
        ${l(`sv-req-motivo`,cd.map(e=>({value:e,label:e})),n.motivo,`sv-req-motivo`)}
      </fieldset>
      <label class="sv-field" for="sv-req-texto">Detalle
        <input type="text" id="sv-req-texto" data-sv-req="texto" value="${j(n.texto)}" maxlength="140" placeholder="Opcional. Sin teléfonos." autocomplete="off" />
      </label>
      <label class="sv-switch" for="sv-req-urgente">
        <input type="checkbox" role="switch" id="sv-req-urgente" data-sv-req="urgente" ${n.urgente?`checked`:``} />
        <span class="sv-switch-track" aria-hidden="true"></span>
        <span>Urgente</span>
      </label>
      ${Tl(`request-form`)}
      <button type="submit" class="sv-btn sv-btn-primary sv-btn-main" id="sv-req-save">${h(`send`,`sv-icon`)} Enviar</button>
    </form>
  `;return gf(`sv-req-title`,`Pedir cambio`,j(i),u,`Volver sin enviar`)}function vf(e){let t=Qu(e),n=$u(e),r=t?.cerrado?t.horaCierre||Fl(t.actualizadoEn):``,i=`
    <p class="sv-line ${t?.cerrado?`is-ok`:`is-info`}">
      ${h(t?.cerrado?`checkCircle`:`fileText`,`sv-icon`)}
      <span>${t?.cerrado?j(`Cerrado ${r} hs. ${Wl(t,`Lo cerró`)}`):`Resumen listo. Copialo y cerrá.`}</span>
    </p>
    <label class="sv-field" for="sv-close-summary"><span class="visually-hidden">Resumen del turno</span>
      <textarea id="sv-close-summary" class="sv-summary" rows="9" readonly>${j(rd(e))}</textarea>
    </label>
    <details class="sv-fold sv-fold-flat" data-sv-fold="cierre-nota" ${pu(`cierre-nota`)||n?`open`:``}>
      <summary><span class="sv-fold-title">${h(`plus`,`sv-icon`)} Nota</span></summary>
      <label class="sv-field sv-fold-body" for="sv-close-notes">Nota del turno (opcional)
        <textarea id="sv-close-notes" rows="2" data-sv-close-notes placeholder="Novedades. Sin datos de tutores.">${j(n)}</textarea>
      </label>
    </details>
    ${Tl(`closure`)}
    <div class="sv-row cols-2">
      <button type="button" class="sv-btn sv-btn-main" id="sv-close-copy" data-sv-close-copy>${h(`copy`,`sv-icon`)} Copiar</button>
      ${t?.cerrado?`<button type="button" class="sv-btn sv-btn-main" id="sv-close-reopen" data-sv-close-reopen>Reabrir</button>`:`<button type="button" class="sv-btn sv-btn-primary sv-btn-main" id="sv-close-done" data-sv-close-done>${h(`flag`,`sv-icon`)} Cerrar</button>`}
    </div>
  `;return gf(`sv-close-title`,`Cerrar turno ${j(b[e.shift].label.toLowerCase())}`,j(`${e.day} ${e.fechaLabel}`),i,`Volver`)}function P(e){if(!e)return tu();eu(),$(),yf(e)}function yf(e){let t=e&&document.getElementById(e);if(!t||!t.getClientRects().length)return!1;t.focus({preventScroll:!0});let n=t.getBoundingClientRect(),r=window.innerHeight-150;return(n.top<70||n.bottom>r)&&t.scrollIntoView({block:`center`}),!0}function bf(){return jl().time}async function xf(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function Sf(e,t,n){let r=Cu(e).routes.find(e=>e.code===t),i=r?.stops.find(e=>e.perroId===n);return r&&i?{route:r,stop:i}:null}function Cf(e,t,n,r){let i=Eu(e.fecha,n.perroId,e.shift),a=Du().get(i),o={id:i,fecha:e.fecha,...r};return a||Object.assign(o,{perroId:n.perroId,perroNombre:n.perroNombre,turno:b[e.shift].label}),a?.ruta!==t.code&&(o.ruta=t.code),o}async function wf(e,t,n,r){let i=du(),a=Sf(i,e,t);if(!a)return;let{route:o,stop:s}=a,c=Eu(i.fecha,t,i.shift);if(ol.has(c))return;let l=Du().get(c),u=Ou(s,l,i.now.minutes),d=bf(),f={horaRetiro:``,horaPaseo:``,horaEntrega:``},p=s.perroNombre,ee={estado:l?.estado||`pendiente`,horaRetiro:l?.horaRetiro||``,horaPaseo:l?.horaPaseo||``,horaEntrega:l?.horaEntrega||``},m=null,h=``;if(n===`retiro`){if(u.retirado)m={estado:`pendiente`,...f},h=`${p}: retiro desmarcado.`;else{m={estado:`retirado`,horaRetiro:d};let e=u.planned===null?0:i.now.minutes-u.planned;h=`${p} retirado ${d}${e>Kc?` (+${e} min)`:``}.`}}else if(n===`entrega`){if(!u.retirado)return;u.kind===`entregado`?(m={estado:l?.horaPaseo?`paseando`:`retirado`,horaEntrega:``},h=`${p}: entrega desmarcada.`):(m={estado:`entregado`,horaEntrega:d},h=`${p} entregado ${d}.`)}else if(n===`no-sale`){if(u.kind===`nosale`)m={estado:`pendiente`},h=`${p} vuelve a la lista.`;else{if(u.retirado)return;m={estado:`no-sale`,...f},h=`${p} no sale hoy.`}}if(!m)return;ol.add(c),yd();let te=await Jl(`paseos`,Cf(i,o,s,m),`toast`,h);ol.delete(c);let ne=`sv-main-${Dd(o,s)}`;te||(vd=null),te&&(tl=null,gd(`${h}${te.pendiente?` Sin señal: se envía solo.`:``}`,()=>Tf(e,t,ee,p),ne)),eu(),$(),!yf(r)&&!yf(ne)&&yf(`sv-undo`)}async function Tf(e,t,n,r){let i=du(),a=Sf(i,e,t);if(!a)return;let o=Eu(i.fecha,t,i.shift);ol.add(o),await Jl(`paseos`,Cf(i,a.route,a.stop,n),`toast`,`${r}: deshecho.`,`info`),ol.delete(o)}async function Ef(e,t,n){let r=du(),i=Sf(r,e,t);if(!i)return;let{route:a,stop:o}=i,s=Eu(r.fecha,t,r.shift),c=String(il.has(s)?il.get(s):document.querySelector(`[data-sv-note="${s}"]`)?.value||``).trim();if(Gc.test(c))return N(`toast`,`La nota parece tener un teléfono. Sacalo.`,`error`),P(n);let l=await Jl(`paseos`,Cf(r,a,o,{nota:c}),`toast`,c?`Nota guardada: ${o.perroNombre}.`:`Nota borrada: ${o.perroNombre}.`);l&&(il.delete(s),al.delete(s)),P(l?`sv-opt-${Dd(a,o)}`:n)}function Df(e,t,n){return e.querySelectorAll(`[${t}]`).forEach(e=>{let r=e.getAttribute(t);e.type===`radio`?e.checked&&(n[r]=e.value):n[r]=e.type===`checkbox`?e.checked:e.value}),n}async function Of(e){let t=du(),n=Df(e,`data-sv-aviso`,uf(t));M(A.avisoDraft,n);let r=String(n.barrio||``).trim(),i=String(n.mensaje||``).trim();if(!r||!i)return N(`aviso`,`Falta: ${El([!r&&`barrio`,!i&&`qué pasa`].filter(Boolean))}.`,`error`),P(r?`sv-aviso-mensaje`:`sv-aviso-barrio`);if(!/^\d{4}-\d{2}-\d{2}$/.test(n.vigenteHasta)||n.vigenteHasta<t.fecha)return N(`aviso`,`Elegí hasta cuándo vale (desde hoy, ${t.fechaLabel}).`,`error`),P(`sv-aviso-hasta`);if(Gc.test(i)||Gc.test(r))return N(`aviso`,`Parece tener un teléfono. Sacalo: los avisos no llevan contactos.`,`error`),P(`sv-aviso-mensaje`);let a=Xc.includes(n.tipo)?n.tipo:`otro`;return await Jl(`avisos`,{fecha:t.fecha,barrio:r,tipo:a,mensaje:i,vigenteHasta:n.vigenteHasta,titulo:`${a[0].toUpperCase()}${a.slice(1)} · ${r}`},`aviso`,`Aviso de ${r} publicado.`)&&M(A.avisoDraft,{barrio:``,tipo:Xc[0],mensaje:``,vigenteHasta:t.fecha}),P(`sv-aviso-save`)}async function kf(e){let t=du(),n=Df(e,`data-sv-req`,Hu(t));M(A.requestDraft,n);let r=String(n.texto||``).trim(),i=Zc.includes(n.tipo)?n.tipo:`otro`,a=i===`agregar perro`?mu(n.extraDog):null,o=(e,t)=>(N(`request-form`,e,`error`),P(t));if(!cd.includes(n.motivo))return o(`Elegí por qué.`,`sv-req-motivo-0`);if(n.motivo===`Otro`&&!r)return o(`Escribí el motivo en Detalle.`,`sv-req-texto`);if(i===`cambiar hora`&&!n.hora&&!r)return o(`Poné la hora nueva.`,`sv-req-hora`);if(i===`agregar perro`&&!a&&!r)return o(`Elegí el perro a sumar.`,`sv-req-extra`);if(i===`otro`&&!r)return o(`Contá qué cambiar en Detalle.`,`sv-req-texto`);if(Gc.test(r))return o(`Parece tener un teléfono. Sacalo.`,`sv-req-texto`);let s=n.ruta||``,c=n.perroId?Sf(t,s,n.perroId)?.stop:null,l=n.perroNombre||``,u={"no sale":`${l||`El perro`} no sale hoy.`,"cambiar hora":n.hora?`Retirar${l?` a ${l}`:``} a las ${n.hora}${c?.hora?` (en vez de ${c.hora})`:``}.`:``,"agregar perro":a?`Sumar a ${a.name}${s?` a ${s}`:``}.`:``,"cambiar paseador o ayudante":`Cambiar paseador o ayudante.`,otro:``}[i],d=n.motivo===`Otro`?r:n.motivo,f=[u,n.motivo===`Otro`?``:r].filter(Boolean).join(` `),p=a?a.id:n.perroId||``,ee=a?a.name:l,m=b[t.shift].label,h=await Jl(`solicitudes`,{fecha:t.fecha,turno:m,ruta:s,tipo:i,perroId:p,perroNombre:ee,detalle:f,motivo:d,urgente:!!n.urgente,estado:`pendiente`,respuesta:``,titulo:`${n.urgente?`URGENTE · `:``}${i[0].toUpperCase()}${i.slice(1)}${ee?` · ${ee}`:``}${s?` · ${s}`:``} · ${m} ${t.fechaLabel}`},`request-form`,`Pedido enviado al coordinador.`);if(!h)return P(`sv-req-save`);h.pendiente||fl.set(h.id,`pendiente`),tl&&(tl.area=`toast`),M(A.requestDraft,Vu(t));let te=fd;fd=``,eu(),$(),yf(te)||yf(`sv-main`)}async function Af(e){let t=du(),n=Df(e,`data-sv-obs`,qu(t));M(A.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),Gu.forEach(e=>{String(n[e.key]).trim()||r.push(pf[e.key].toLowerCase())});let i=Pl(n.fecha);if(!r.length&&!i)return N(`observation`,`Fecha como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),P(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return N(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),P(`sv-obs-fecha`);if(r.length)return N(`observation`,`Falta: ${El(r)}.`,`error`),P(n.dogId?n.fecha?`sv-obs-${Gu.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=Gu.find(e=>Wc.test(n[e.key]));if(a){let e=n[a.key].match(Wc)[2];return N(`observation`,`En «${pf[a.key]}» dice «${e}». Contá lo que se vio: «ladró y tiró de la correa».`,`error`),P(`sv-obs-${a.key}`)}let o=mu(n.dogId);return await Jl(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:b[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada.`)&&M(A.observationDraft,Ku(t)),P(`sv-obs-save`)}async function jf(e,t,n,r){let i=Zu(e),a=$u(e),o=Vl(),s=rd(e,{...Qu(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoPorNombre:o.nombre,actualizadoEn:new Date().toISOString(),pendiente:!1}),c=await Jl(`cierres`,{id:i,fecha:e.fecha,turno:b[e.shift].label,notas:a,resumen:s,...t},dd?`closure`:`toast`,n,t.cerrado===!1?`info`:`ok`);return c&&rl?.id===i&&rl.notas===a&&(rl=null),r!==!1&&P(r),c}function Mf(){let e=du();Hu(e).open&&M(A.requestDraft,Vu(e)),dd=!1;let t=fd;fd=``,eu(),$(),yf(t)||yf(`sv-main`)}function Nf(){return!!document.querySelector(`.sv-shell .sv-sheet`)}async function Pf(e){let t=e.files?.[0],n=e.dataset.svPhoto,r=e.dataset.name||``;if(!t||!n)return;let i=e.id;if(navigator.onLine===!1)return e.value=``,N(`toast`,`Sin señal: la foto necesita conexión.`,`error`),P(i);pd.add(n),N(`toast`,`Subiendo foto de ${r}…`,`info`),P(i);try{await _t.subir(n,r,t),N(`toast`,`Foto de ${r} lista. La ve el equipo.`)}catch(e){N(`toast`,typeof e?.status==`number`&&e.message?e.message:`No se pudo leer la foto. Probá sacarla de nuevo.`,`error`)}pd.delete(n),P()}function Ff(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return kx(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return Zl(!0),!0;if(t.closest(`[data-sv-sheet-close]`))return Mf(),!0;if(t.closest(`[data-sv-undo]`)){let e=_d();return ud=null,e?Promise.resolve(e.run()).then(()=>P(e.focusId||`sv-main`)):P(),!0}let n=t.closest(`[data-sv-tab]`);if(n){let e=n.dataset.svTab,t=md();return hd(e,``),eu(),$(),(t.tab!==e||t.sub)&&window.scrollTo(0,0),document.getElementById(n.id)?.focus({preventScroll:!0}),!0}let r=t.closest(`[data-sv-sub]`);if(r){let e=r.dataset.svSub,t=md().sub;return hd(`mas`,e),eu(),$(),window.scrollTo(0,0),yf(e?`sv-back`:`sv-sub-${t}`),!0}let i=t.closest(`[data-sv-goto]`);if(i){let[e,t]=i.dataset.svGoto.split(`:`);return hd(e,t||``),eu(),$(),window.scrollTo(0,0),yf(t?`sv-back`:`sv-tab-${e}`),!0}let a=t.closest(`[data-sv-goto-dog]`);if(a){if(a.dataset.done){let e=bl(A.folds,{});e.listos=!0,M(A.folds,e)}hd(`ahora`,``),$();let e=document.getElementById(`sv-dog-${a.dataset.svGotoDog}`);return e&&(e.scrollIntoView({block:`center`}),e.focus({preventScroll:!0})),!0}let o=t.closest(`[data-sv-shift]`);if(o)return fu(o.dataset.svShift),P(o.id),!0;let s=t.closest(`[data-sv-pickup]`);if(s)return wf(s.dataset.ruta,s.dataset.svPickup,`retiro`,s.id),!0;let c=t.closest(`[data-sv-deliver]`);if(c)return wf(c.dataset.ruta,c.dataset.svDeliver,`entrega`,c.id),!0;let l=t.closest(`[data-sv-absent]`);if(l)return wf(l.dataset.ruta,l.dataset.svAbsent,`no-sale`,l.id),!0;let u=t.closest(`[data-sv-unmark]`);if(u)return wf(u.dataset.ruta,u.dataset.svUnmark,u.dataset.step===`entrega`?`entrega`:`retiro`,u.id),!0;let d=t.closest(`[data-sv-options]`);if(d){let e=d.dataset.svOptions;return al.has(e)?(al.delete(e),il.delete(e)):al.add(e),P(d.id),!0}let f=t.closest(`[data-sv-note-save]`);if(f)return Ef(f.dataset.ruta,f.dataset.svNoteSave,f.id),!0;let p=t.closest(`[data-sv-photo-open]`);if(p){let e=Ed(p.dataset.svPhotoOpen);return e?.archivoId&&(navigator.onLine===!1?(N(`toast`,`Sin señal: la foto grande necesita conexión.`,`error`),P(p.id)):ht.abrir(e.archivoId).catch(e=>{N(`toast`,e?.message||`No se pudo abrir la foto.`,`error`),P(p.id)})),!0}let ee=t.closest(`[data-sv-seen]`);if(ee)return Sd(ee.dataset.svSeen),P(),!0;let m=t.closest(`[data-sv-request-open]`);if(m){let e=du(),t=m.dataset.ruta||``,n=m.dataset.dog||``,r=n?`perro`:t?`ruta`:`turno`,i=Cu(e).routes;r===`turno`&&i.length===1&&(t=i[0].code);let a=n?Du().get(Eu(e.fecha,n,e.shift)):null,o=[`retirado`,`paseando`,`entregado`].includes(a?.estado),s=Zc.includes(m.dataset.tipo)?m.dataset.tipo:n?o?`otro`:`no sale`:`otro`;dd=!1,fd=m.id,M(A.requestDraft,Vu(e,t,n,!0,r,s));let c=sd.findIndex(e=>e.value===s);return P(`sv-req-tipo-${Math.max(c,0)}`),!0}if(t.closest(`[data-sv-close-open]`)){let e=t.closest(`[data-sv-close-open]`),n=du();return Hu(n).open&&M(A.requestDraft,Vu(n)),dd=!0,fd=e.id,P(Qu(n)?.cerrado?`sv-close-copy`:`sv-close-done`),!0}if(t.closest(`[data-sv-close-copy]`))return xf(rd(du()),`sv-close-summary`).then(e=>{N(`closure`,e?`Copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto y copialo a mano.`,e?`ok`:`error`),P(`sv-close-copy`)}),!0;if(t.closest(`[data-sv-close-done]`)){let e=du(),t=bf();return jf(e,{cerrado:!0,horaCierre:t},`Turno cerrado.`,!1).then(e=>{if(!e)return P(`sv-close-done`);dd=!1,tl=null,gd(`Turno cerrado ${t}.${e.pendiente?` Sin señal: se envía solo.`:``}`,()=>jf(du(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,!1),fd);let n=fd;fd=``,eu(),$(),yf(n)||yf(`sv-undo`)}),!0}if(t.closest(`[data-sv-close-reopen]`))return jf(du(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0;let h=t.closest(`[data-sv-obs-copy]`);if(h){let e=Ju().find(e=>e.id===h.dataset.svObsCopy);return e&&xf(Xu(e)).then(e=>{N(`observation`,e?`Copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar en este navegador.`,e?`ok`:`error`),P(h.id)}),!0}let te=t.closest(`[data-sv-obs-delete]`);if(te)return nl=te.dataset.svObsDelete,P(`sv-obs-del-no-${kl(nl)}`),!0;let ne=t.closest(`[data-sv-obs-delete-ok]`);if(ne)return nl=null,Xl(`observaciones`,ne.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>P(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=nl;return nl=null,P(`sv-obs-del-${kl(e)}`),!0}return!1}function If(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;let n=du();if(t.matches(`[data-sv-photo]`))return Pf(t),!0;if(t.matches(`[data-sv-obs]`)){let e=qu(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,M(A.observationDraft,e),!0}if(t.matches(`[data-sv-aviso]`)){if(t.type===`radio`&&!t.checked)return!0;let e=uf(n);return e[t.dataset.svAviso]=t.value,M(A.avisoDraft,e),!0}if(t.matches(`[data-sv-req]`)){if(t.type===`radio`&&!t.checked)return!0;let e=Hu(n);return e[t.dataset.svReq]=t.type===`checkbox`?t.checked:t.value,M(A.requestDraft,e),t.dataset.svReq===`tipo`&&P(t.id),!0}return t.matches(`[data-sv-close-notes]`)?(rl={id:Zu(n),notas:t.value},t.value===(Qu(n)?.notas||``)?(rl=null,!0):(jf(n,{},`Nota guardada.`,document.activeElement?.id||`sv-close-notes`),!0)):!1}function Lf(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=du();if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=qu(n);e[t.dataset.svObs]=t.value,M(A.observationDraft,e)}else if(t.matches(`[data-sv-aviso]`)&&t.type!==`radio`){let e=uf(n);e[t.dataset.svAviso]=t.value,M(A.avisoDraft,e)}else if(t.matches(`[data-sv-req]`)&&t.type!==`checkbox`&&t.type!==`radio`){let e=Hu(n);e[t.dataset.svReq]=t.value,M(A.requestDraft,e)}else if(t.matches(`[data-sv-note]`))il.set(t.dataset.svNote,t.value),al.add(t.dataset.svNote);else if(t.matches(`[data-sv-close-notes]`)){rl={id:Zu(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=rd(n))}}function Rf(e){let t=e.target;t.closest?.(`.sv-shell`)&&(t.matches?.(`[data-sv-obs-form]`)?(e.preventDefault(),Af(t)):t.matches?.(`[data-sv-aviso-form]`)?(e.preventDefault(),Of(t)):t.matches?.(`[data-sv-request-form]`)&&(e.preventDefault(),kf(t)))}function zf(e){let t=e.target;if(e.key===`Escape`&&Nf()){e.preventDefault(),Mf();return}if(e.key===`Tab`&&Nf()){let t=document.querySelector(`.sv-shell .sv-sheet`),n=[...t.querySelectorAll(`button, input, select, textarea, summary, a[href]`)].filter(e=>!e.disabled&&e.getClientRects().length&&!(e.type===`radio`&&!e.checked&&t.querySelector(`input[name="${e.name}"]:checked`)));if(!n.length)return;let r=n[0],i=n[n.length-1];t.contains(document.activeElement)?e.shiftKey&&document.activeElement===r?(e.preventDefault(),i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),r.focus()):(e.preventDefault(),r.focus());return}if(e.key!==`Enter`||!t.matches?.(`.sv-shell [data-sv-note]`))return;e.preventDefault();let n=t.closest(`.sv-note-row`)?.querySelector(`[data-sv-note-save]`);n&&Ef(n.dataset.ruta,n.dataset.svNoteSave,t.id)}function Bf(e){let t=e.target;if(!t.matches?.(`[data-sv-fold]`))return;let n=bl(A.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,M(A.folds,n))}function Vf(){pe.push(Ff),me.push(If),document.addEventListener(`input`,Lf),document.addEventListener(`submit`,Rf),document.addEventListener(`keydown`,zf),document.addEventListener(`toggle`,Bf,!0),ou()}var Hf={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,borradores:`paseosJuan_coord_borradores`},Uf=`paseosJuan_coord_secciones`;function Wf(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function Gf(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Kf(e){try{localStorage.removeItem(e)}catch{}}var qf=null,Jf=0;function F(e,{tone:t=`ok`,undo:n=null,local:r=!1}={}){qf={text:e,tone:t,undo:n,local:r},t===`error`?Qf(e):Zf(e),window.clearTimeout(Jf);let i=n?5e3:t===`error`?9e3:3500;Jf=window.setTimeout(()=>{qf=null,z()},i)}function Yf(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function Xf(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function Zf(e){Xf(Yf(`coord-live`,`status`,`polite`),e)}function Qf(e){Xf(Yf(`coord-alerta`,`alert`,`assertive`),e)}var $f=`America/Argentina/Buenos_Aires`;function I(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function ep(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function tp(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:$f,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function np(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||``));if(!t)return!1;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCFullYear()===n&&a.getUTCMonth()===r-1&&a.getUTCDate()===i}function rp(e,t){let[n,r,i]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1,i+t)).toISOString().slice(0,10)}function ip(e){let[t,n,r]=e.split(`-`).map(Number);return On[(new Date(Date.UTC(t,n-1,r)).getUTCDay()+6)%7]}function ap(e){return`${ip(e)} ${ep(e)}`}function op(e){return rp(v(),-e)}function sp(e,t=6){let n=[],r=v();for(let i=0;i<70&&n.length<t;i+=1){let t=rp(r,i);ip(t)===e&&n.push(t)}return n}function L(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function cp(e){return L(e)}function lp(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}var up={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function dp(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>up[e]||e).join(`, `):`Sin días`}function fp(e){let t=xp.map(t=>{let n=On.filter(n=>In(e,n,t));return n.length?`${t.toLowerCase()}: ${dp(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function pp(e,t=!1){let n=Wf(Uf,{});return e in n?!!n[e]:t}function mp(e,t){Gf(Uf,{...Wf(Uf,{}),[e]:t})}var hp=new Set;function R(e){requestAnimationFrame(()=>document.getElementById(e)?.focus({preventScroll:!1}))}function gp(){return g.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}function _p(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``));if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n>23||r>59?null:n*60+r}function vp(e){return _p(e)!==null}function yp(e){let t=_p(e);return t===null?``:`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}var bp=On.filter(e=>e!==`Domingo`),xp=[`Mañana`,`Tarde`],Sp={Mañana:`09:00`,Tarde:`14:45`},Cp=new Map(x.map(e=>[e.id,e])),wp=new Map(x.map(e=>[L(e.name),e])),Tp=x.filter(e=>e.review||e.status!==`Activo`);function Ep(e){return e.perroId&&Cp.get(e.perroId)||wp.get(L(e.perroNombre))||null}function Dp(e){return!!e?.safety?.some(e=>/bozal/i.test(e))}function Op(e){if(!e)return``;let t=L(e),n=En.find(e=>e.id===t||L(e.name)===t||L(e.name.split(` `)[0])===t);return n?n.name:e}var kp=null;function Ap(){kp||g.user()?.rol!==`admin`||(kp=new Map,rt.list().then(e=>e.forEach(e=>e.usuario&&e.nombre&&kp.set(L(e.usuario),String(e.nombre)))).catch(()=>{}))}function jp(e,t={}){let n=L(e);if(!n)return``;let r=En.find(e=>e.id===n||L(e.name)===n);if(r)return r.name;if(kp?.get(n))return kp.get(n);if(t[n])return t[n];for(let e of Np)for(let t of Fp(e))for(let[e,r]of[[`creadoPor`,`creadoPorNombre`],[`actualizadoPor`,`actualizadoPorNombre`],[`paseador`,`paseadorNombre`],[`ayudante`,`ayudanteNombre`]])if(t[r]&&L(t[e])===n)return String(t[r]);return``}var Mp={solicitudes:()=>({desde:op(14)}),plantillas:()=>({}),rutas:()=>({desde:v()}),clientes:()=>({}),avisos:()=>({}),pedidos:()=>({}),fichas:()=>({}),resueltos:()=>({}),observaciones:()=>({desde:op(6)}),incidentes:()=>({desde:op(6)}),archivos:()=>({}),fotos:()=>({})},Np=Object.keys(Mp),Pp=[`pedidos`,`fichas`,`resueltos`];function Fp(e){return _.cached(e,Mp[e]())}var Ip=new Set,Lp=new Map,Rp=new Map,zp=!1,Bp=!1;function Vp(){zp||(zp=!0,Ze(e=>{Np.includes(e)&&(Ip.add(e),Lp.delete(e),z())}),window.addEventListener(`online`,()=>{V?.errorSenal&&(V.error=``,V.errorSenal=!1),z()}),window.addEventListener(`offline`,z))}function Hp(){let e=g.user();e&&Np.forEach(t=>{let n=Mp[t](),r=`${e.usuario}|${n.desde||``}`,i=Rp.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};Rp.set(t,a),_.list(t,n).then(()=>{Ip.add(t),Lp.delete(t)}).catch(e=>{e.status!==401&&(Lp.set(t,e.message),Qf(e.message))}).finally(()=>{Rp.get(t)===a&&(a.stop=_.watch(t,n)),z(),om()})})}function Up(){[...Rp.values()].forEach(e=>e.stop?.()),Rp.clear(),Lp.clear(),Hp()}function z(){Bp||(Bp=!0,requestAnimationFrame(()=>{Bp=!1,document.querySelector(`.coord-shell`)&&Wp()}))}function Wp(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;Jh.has(t)||(qh[t]=Qh(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function Gp(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}function Kp(e){let t=g.user();return!t||!e||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function qp(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${tp(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${I(e.creadoPorNombre)}${e.creadoEn?` el ${tp(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre;n.push(`Último cambio${t?` de ${I(t)}`:``}: ${tp(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${h(`clock`,`coord-icon`)}<span>Se envía con señal.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var Jp=new Set;async function Yp(e,t,{ok:n,undo:r=null}){try{let i=await _.save(e,t);return F(i.pendiente?`Guardado en el celular. Se envía solo con señal.`:n,{undo:r}),i}catch(e){return F(`No se pudo guardar: ${e.message}`,{tone:`error`}),null}finally{z()}}async function Xp(e,t,{ok:n,undo:r=!0}){try{await _.remove(e,t.id);let{pendiente:i,...a}=t;return F(n,{undo:r?()=>Yp(e,a,{ok:`Listo, se recuperó.`}):null}),!0}catch(e){return F(`No se pudo borrar: ${e.message}`,{tone:`error`}),!1}finally{z()}}function Zp(e,t){Jp.has(e)||(Jp.add(e),Promise.resolve().then(t).finally(()=>Jp.delete(e)))}var Qp=!1,$p=!1,em=``,tm=/^[a-z0-9][a-z0-9_.-]{0,90}$/i,nm=[`nuevo`,`en-curso`,`resuelto`];function rm(e){return tm.test(String(e||``))?`ant_${String(e)}`:void 0}function im(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let n=`${t[3]}-${t[2].padStart(2,`0`)}-${t[1].padStart(2,`0`)}`;return np(n)?n:null}function am(){let e=v(),t=[];Wf(Hf.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:Hf.pedidos,oldId:n.id,col:`pedidos`,data:{id:rm(n.id),fecha:im(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:nm.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),Wf(Hf.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:Hf.altas,oldId:r,col:`fichas`,data:{id:rm(r),fecha:im(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})});let n=new Set(Fp(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(Wf(Hf.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:Hf.resueltos,oldId:e,skip:!0});return}let i=Cp.get(e);t.push({key:Hf.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function om(){if(!(Qp||$p)&&Pp.every(e=>Ip.has(e))){$p=!0;try{let e=Wf(Hf.borradores,{});Object.entries(e).forEach(([e,t])=>{e!==`pago`&&!qh[e]&&(qh[e]=t)}),Kf(Hf.borradores);let t=am();if(!t.length){Qp=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await _.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[Hf.pedidos,Hf.altas].forEach(e=>{let t=Wf(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?Gf(e,t):Kf(e)});let a=Object.fromEntries(Object.entries(Wf(Hf.resueltos,{})).filter(([e])=>n.has(`${Hf.resueltos}|${e}`)));Object.keys(a).length?Gf(Hf.resueltos,a):Kf(Hf.resueltos),r&&(em=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo.`,Zf(em)),n.size?(Lp.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),Qf(Lp.get(`migracion`))):Qp=!0}finally{$p=!1,z()}}}var sm={Mañana:0,Tarde:1},cm=/^[A-Z0-9][A-Z0-9_]{1,19}$/;function lm(e){return e&&Array.isArray(e.paradas)&&e.ruta&&e.dia}function um(e,t){return(sm[e.turno]??9)-(sm[t.turno]??9)||String(e.ruta).localeCompare(String(t.ruta))}function dm(e,t){return`${e}_${cp(t)}`}function fm(e,t){return`${e}_${t}`}function pm(){return Fp(`plantillas`).filter(lm)}function mm(){return Fp(`rutas`).filter(e=>lm(e)&&e.fecha)}function hm(e){return pm().filter(t=>t.dia===e).sort(um)}function gm(e){let t=ip(e),n=new Map(mm().filter(t=>t.fecha===e).map(e=>[e.ruta,e])),r=hm(t).map(e=>{let t=n.get(e.ruta);return n.delete(e.ruta),t?{...t,origen:`dia`,plantillaId:e.id}:{...e,origen:`plantilla`,plantillaId:e.id}});return n.forEach(e=>r.push({...e,origen:`dia`,plantillaId:``})),r.sort(um)}function _m(e){return(e.paradas||[]).filter(e=>vp(e.hora)).map(e=>e.hora).sort((e,t)=>_p(e)-_p(t))}function vm(e){let t=_m(e);return t.length?t.length===1?yp(t[0]):`${yp(t[0])} a ${yp(t[t.length-1])}`:`Sin horarios`}function ym(e){let t=_m(e);return t.length?Hn(yp(t[t.length-1]),15):Sp[e.turno]||`09:00`}function bm(e){let t=_p(e.hora);return t===null?null:[t,t+(Number(e.minutos)||45)]}function xm(e,t){return e&&t&&e[0]<t[1]&&t[0]<e[1]}function Sm(e,t=[]){let n=[],r=new Map,i=(e,t)=>{n.push(t),e.forEach(e=>r.set(e,[...r.get(e)||[],t]))},a=(e.paradas||[]).map((e,t)=>({stop:e,index:t,dog:Ep(e),win:bm(e)}));a.forEach(({stop:e,index:t,dog:n,win:r})=>{let a=e.perroNombre||n?.name||`Pendiente de confirmar`;r||i([t],`${a}: falta la hora de retiro.`),n?n.status!==`Activo`&&i([t],`${a}: estado «${n.status}».`):i([t],`${a}: no está en el registro de perros (perro sin ficha).`)});let o=new Map;for(let e=0;e<a.length;e+=1)for(let t=e+1;t<a.length;t+=1){let n=a[e],r=a[t];if(!n.dog||!r.dog)continue;if(n.dog.id===r.dog.id){i([n.index,r.index],`${n.dog.name} está dos veces en esta ruta.`);continue}if(!xm(n.win,r.win))continue;((n.dog.incompatibleWith||[]).includes(r.dog.name)||(r.dog.incompatibleWith||[]).includes(n.dog.name))&&i([n.index,r.index],`No juntar: ${n.dog.name} y ${r.dog.name} van en la misma franja (${yp(n.stop.hora)} y ${yp(r.stop.hora)}).`);let s=n.dog.size===`Pequeño`&&r.dog.size===`Grande`?n:r.dog.size===`Pequeño`&&n.dog.size===`Grande`?r:null;if(s){let e=s===n?r:n;o.has(s.index)||o.set(s.index,{small:s,bigs:[]}),o.get(s.index).bigs.push(e)}}return o.forEach(({small:e,bigs:t})=>{let n=[...new Set(t.map(e=>e.dog.name))];i([e.index,...t.map(e=>e.index)],`Tamaños mezclados: ${e.dog.name} (pequeño) comparte franja con ${lp(n)} (${n.length===1?`grande`:`grandes`}).`)}),t.filter(t=>t.ruta!==e.ruta).forEach(e=>{(e.paradas||[]).forEach(t=>{let n=Ep(t);a.forEach(({index:r,dog:a,win:o})=>{a&&n&&a.id===n.id&&xm(o,bm(t))&&i([r],`${a.name} también está en ${e.ruta} a las ${yp(t.hora)}.`)})})}),{list:[...new Set(n)],byStop:r}}function Cm(e){return Sm(e,hm(e.dia))}function wm(e,t){return Sm(e,gm(t))}function Tm(e,{fecha:t}={}){let n=[`*Ruta ${t?`${e.ruta} · ${ap(t)} · ${e.turno}`:`${e.ruta} · ${e.dia} · ${e.turno} (plantilla semanal)`}*`,`Paseador: ${Op(e.paseador)||`Pendiente de confirmar`} | Ayudante: ${Op(e.ayudante)||`sin ayudante`} | Supervisa: ${Op(e.supervisor)||`Pendiente de confirmar`}`],r=(e.paradas||[]).slice().sort((e,t)=>(_p(e.hora)??9999)-(_p(t.hora)??9999));return r.forEach((e,t)=>{let r=Ep(e),i=[];e.nota&&i.push(e.nota),Dp(r)&&!/bozal/i.test(e.nota||``)&&i.push(`Usa bozal`),n.push(`${t+1}) ${yp(e.hora)||`sin hora`} ${e.perroNombre||r?.name||`Pendiente de confirmar`} · ${Number(e.minutos)||45} min${i.length?` · ${i.join(` · `)}`:``}`)}),r.length||n.push(`Sin perros cargados.`),e.notas&&n.push(`Notas: ${e.notas}`),n.join(`
`)}var B=null,Em=``,Dm=``,Om=``,km=!1,Am=``,jm=``,Mm=!1;function Nm(){return Wf(Uf,{}).rutasVista===`semana`?`semana`:`dia`}function Pm(e){Gf(Uf,{...Wf(Uf,{}),rutasVista:e})}function Fm(){let e=v();return(!np(jm)||jm<e)&&(jm=e),jm}function Im(e){return(e||[]).map(e=>({perroId:e.perroId||``,perroNombre:e.perroNombre||Ep(e)?.name||``,hora:yp(e.hora)||e.hora||``,minutos:Number(e.minutos)||45,nota:e.nota||``}))}function Lm(e,{modo:t,fecha:n=``,nuevo:r=!1,solicitud:i=null}={}){Ap();let a={};e.paseador&&e.paseadorNombre&&(a[L(e.paseador)]=String(e.paseadorNombre)),e.ayudante&&e.ayudanteNombre&&(a[L(e.ayudante)]=String(e.ayudanteNombre)),B={nombresPrevios:a,modo:t,fecha:n,nuevo:r,id:t===`plantilla`?dm(e.ruta,e.dia):fm(n,e.ruta),dia:t===`dia`?ip(n):e.dia,turno:e.turno,ruta:e.ruta,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,paradas:Im(e.paradas),plantillaId:e.plantillaId||(t===`plantilla`?e.id:``),existeDia:t===`dia`&&e.origen===`dia`?e:null,soloDia:t===`plantilla`&&sp(e.dia)[0]||``,destino:t===`plantilla`?`semana`:`dia`,picker:!1,agregados:0,solicitudId:i?.id||``,precarga:``,respuesta:``,sucio:!1},Em=``,Dm=``,Om=``}function Rm(){qf?.local&&(qf=null),B=null,Em=``,Dm=``,Om=``}function zm(e,t){let n=t===`Mañana`?`M`:`T`;for(let t=1;t<10;t+=1){let r=`PJ_${t}${n}`;if(!e.some(e=>e.ruta===r))return r}return`PJ_X${n}`}function Bm(){if(!B)return{list:[],byStop:new Map};let e=B.modo===`plantilla`?hm(B.dia):gm(B.fecha);return Sm(B,e)}function Vm(e,t,{keepQuery:n=!1}={}){let r=Em,i=vp(Dm)?yp(Dm):ym(B);B.paradas.push({perroId:e?.id||``,perroNombre:e?.name||t,hora:i,minutos:e?.minutes||45,nota:e?.incompatibleWith?.length?`No juntar con ${lp(e.incompatibleWith)}`:Dp(e)?`Bozal`:``}),B.sucio=!0,Em=n?r:``,Dm=``}function Hm(){return B.modo===`plantilla`?B.soloDia:B.fecha}function Um(){B.paradas.sort((e,t)=>(_p(e.hora)??9999)-(_p(t.hora)??9999)),B.sucio=!0}function Wm(){return{dia:B.dia,turno:B.turno,ruta:B.ruta,paseador:B.paseador.trim(),paseadorNombre:jp(B.paseador,B.nombresPrevios),ayudante:B.ayudante.trim(),ayudanteNombre:jp(B.ayudante,B.nombresPrevios),supervisor:B.supervisor.trim(),notas:B.notas.trim(),paradas:Im(B.paradas)}}function Gm(){let e=String(B.ruta||``).trim().toUpperCase().replace(/\s+/g,`_`);if(!cm.test(e))return[`El código de la ruta tiene que ser como PJ_1M (letras, números y guion bajo).`,`coord-ed-ruta`];if(B.ruta=e,B.nuevo&&(B.destino===`semana`?pm().some(t=>t.id===dm(e,B.dia)):gm(Hm()).some(t=>t.ruta===e)))return[`Ya hay una ruta ${e} ese día. Cambiá el código.`,`coord-ed-ruta`];let t=B.paradas.findIndex(e=>!vp(e.hora));return t>=0?[`Falta la hora de retiro de ${B.paradas[t].perroNombre||`un perro`}.`,`coord-ed-hora-${t}`]:null}var Km={},qm=``;function Jm(){return Fp(`solicitudes`).slice().sort(Gp)}function Ym(){return Jm().filter(e=>(e.estado||`pendiente`)===`pendiente`).sort((e,t)=>Number(!!t.urgente)-Number(!!e.urgente)||String(e.fecha||``).localeCompare(String(t.fecha||``))||Gp(t,e))}function Xm(e){return e.perroId&&Cp.get(e.perroId)?Cp.get(e.perroId):wp.get(L(e.perroNombre))||null}function Zm(e){let t=/(\d{1,2})\s*[:.h]\s*(\d{2})/.exec(String(e||``));return t?yp(`${t[1]}:${t[2]}`):``}function Qm(e){let t=np(e.fecha)?e.fecha:v(),n=Xm(e),r=gm(t),i=e.ruta?r.find(t=>t.ruta===e.ruta):null;!i&&n&&(i=r.find(t=>(!e.turno||t.turno===e.turno)&&(t.paradas||[]).some(e=>Ep(e)?.id===n.id))),!i&&e.turno&&(i=r.find(t=>t.turno===e.turno));let a=!i;if(!i){let n=e.turno||`Mañana`;i={ruta:e.ruta||zm(r,n),dia:ip(t),turno:n,paradas:[],origen:`plantilla`}}Lm(i,{modo:`dia`,fecha:t,nuevo:a,solicitud:e});let o=L(e.tipo),s=n?B.paradas.findIndex(e=>Ep(e)?.id===n.id):B.paradas.findIndex(t=>L(t.perroNombre)===L(e.perroNombre)),c=Zm(e.detalle),l=n?.name||e.perroNombre||`el perro`;o===`no sale`?s>=0?(B.paradas.splice(s,1),B.precarga=`Ya saqué a ${l} de la ruta. Revisá y guardá.`):B.precarga=`${l} no está en esta ruta: revisá a mano.`:o===`cambiar hora`?s>=0&&c?(B.paradas[s].hora=c,B.precarga=`Ya cambié la hora de ${l} a las ${c}. Revisá y guardá.`):B.precarga=`No pude precargar la hora nueva: cambiala a mano.`:o===`agregar perro`?s>=0?B.precarga=`${l} ya estaba en la ruta: revisá la hora.`:n||e.perroNombre?(c&&(Dm=c),Vm(n,e.perroNombre),B.precarga=`Ya agregué a ${l} a las ${B.paradas[B.paradas.length-1].hora}. Revisá y guardá.`):B.precarga=`No dice qué perro: tocá «Agregar perro».`:B.precarga=`Este cambio se hace a mano: revisá el pedido y ajustá la ruta.`,B.sucio=!0,B.respuesta=``}var $m=[[`activo`,`Activo`],[`pausa`,`En pausa`],[`baja`,`De baja`]],eh=[y,...kn.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`,`Otro (anotalo en notas)`],th=[y,`Mañana`,`Tarde`,`Mañana y tarde`],nh=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],rh=``;function ih(){return Fp(`clientes`).slice().sort((e,t)=>String(e.nombre||``).localeCompare(String(t.nombre||``),`es`))}function ah(){return Fp(`avisos`).slice().sort(Gp)}function oh(e,t=v()){return np(e.vigenteHasta)?e.vigenteHasta>=t:(e.fecha||``)===t}function sh(){return ah().filter(e=>oh(e))}function ch(e){let t=new Map;return e.forEach(e=>{let n=e.barrio||`Sin barrio`;t.has(n)||t.set(n,[]),t.get(n).push(e)}),[...t.entries()].sort((e,t)=>e[0].localeCompare(t[0],`es`))}function lh(){let e=new Map;return[...Gn,...ih().map(e=>e.barrio),...ah().map(e=>e.barrio)].forEach(t=>{let n=String(t||``).trim();n&&!e.has(L(n))&&e.set(L(n),n)}),[...e.values()].sort((e,t)=>e.localeCompare(t,`es`))}function uh(e){return[`*Aviso Paseos Juan · ${e.barrio||`Sin barrio`}*`,`Tipo: ${e.tipo||`otro`}`,e.mensaje||``,`Vigente hasta: ${np(e.vigenteHasta)?ep(e.vigenteHasta):ep(e.fecha)}`].filter(Boolean).join(`
`)}var dh=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],fh=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],ph=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],mh={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function hh(e){return e.estado===`curso`?`en-curso`:nm.includes(e.estado)?e.estado:`nuevo`}function gh(){return Fp(`pedidos`).slice().sort(Gp)}function _h(){return Fp(`fichas`).slice().sort(Gp)}function vh(){let e={};return Fp(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function yh(e){return e.datos?.perro||e.perro||``}function bh(e){return e.filter(e=>e.origen===`web`&&hh(e)===`nuevo`)}function xh(){let e=vh();return Tp.filter(t=>!e[t.id])}function Sh(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function Ch(e,t,n=`secondary`,r=`Escribirle por WhatsApp`){if(!e)return``;let i=Sh(e);return i?`<a class="coord-btn is-${n}" href="https://wa.me/${i}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${h(`message`,`coord-icon`)}<span>${r}</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`:`<p class="coord-inline-alert">${h(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina.</span></p>`}var wh=bp;function Th(e){let t=L(e),n=wh.map(L),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return wh.slice(e,t+1)}return wh.filter((e,r)=>t.includes(n[r]))}var Eh=`carnet de vacunas`,Dh=[[Eh,`Carnet de vacunas`],[`documento`,`Otro documento`]],Oh={[Eh]:`Carnet de vacunas`,documento:`Documento`,foto:`Foto`};function kh(e){return e?.tipo===`comprobante de pago`}function Ah(){return Fp(`archivos`).filter(e=>e?.id&&!kh(e)).sort(Gp)}function jh(e){return Ah().find(t=>t.id===e)||null}function Mh(e){return e?.tipo===Eh}function Nh(e){return Oh[e]||`Documento`}function Ph(e){let t=Number(e)||0;return t?t<1048576?`${Math.max(1,Math.round(t/1024))} KB`:`${(t/1048576).toFixed(1).replace(`.`,`,`)} MB`:``}function Fh(){return navigator.onLine===!1}function Ih(e,t){return Fh()||e?.status===0||e?.name===`TypeError`?`Sin señal: para ${t} archivos hace falta conexión. Probá de nuevo cuando vuelva.`:e?.message||`No se pudo ${t} el archivo.`}function Lh(e){let t=new Set([e.carnet?.id,...Array.isArray(e.archivos)?e.archivos:[]].filter(Boolean));Ah().filter(t=>t.pedidoId===e.id).forEach(e=>t.add(e.id));let n=new Map(Fp(`archivos`).map(e=>[e.id,e]));return[...t].filter(e=>!kh(n.get(e))).map(t=>n.get(t)||(t===e.carnet?.id?{id:t,tipo:Eh,nombreArchivo:e.carnet.nombre||``,perroNombre:e.datos?.perro||``}:{id:t,tipo:`documento`}))}function Rh(e){let t=new Set(Array.isArray(e.archivos)?e.archivos:[]),n=new Set(Array.isArray(e.perros)?e.perros:[]);return Ah().filter(r=>t.has(r.id)||r.clienteId&&r.clienteId===e.id||r.perroId&&n.has(r.perroId)||e.pedidoId&&r.pedidoId===e.pedidoId)}var zh=new Map;function Bh(){let e=new Map,t=(t,n)=>{Cp.has(t)&&(e.has(t)||e.set(t,[]),e.get(t).some(e=>e.id===n.id)||e.get(t).push(n))},n=ih();return Ah().filter(Mh).forEach(e=>{e.perroId?t(e.perroId,e):n.forEach(n=>{let r=n.archivosPerro?.[e.id];if(r){t(r,e);return}let i=Array.isArray(n.perros)?n.perros:[];i.length===1&&(Array.isArray(n.archivos)&&n.archivos.includes(e.id)||e.clienteId&&e.clienteId===n.id||n.pedidoId&&e.pedidoId===n.pedidoId)&&t(i[0],e)})}),e}function Vh(e){return!!(e&&zh.get(e.id)?.length)}var Hh=null;function Uh(e,t,n=`ok`){Hh={key:e,text:t,tone:n,until:Date.now()+15e3},n===`error`?Qf(t):Zf(t)}function Wh(e){return!Hh||Hh.key!==e||Date.now()>Hh.until?``:`<p class="coord-flash is-${Hh.tone} is-small">${h(Hh.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${I(Hh.text)}</span></p>`}function Gh(e,t){Fh()?(Uh(t,`Sin señal: para abrir archivos hace falta conexión. Probá de nuevo cuando vuelva.`,`error`),z()):(Zf(`Abriendo el archivo en otra pestaña.`),ht.abrir(e).catch(e=>{Uh(t,Ih(e,`abrir`),`error`),z()}))}var V=null;function Kh(e){let t=Array.isArray(e.perros)?e.perros.filter(e=>Cp.has(e)):[];V={clienteId:e.id,tipo:Eh,perroId:t.length===1?t[0]:``,nota:``,file:null,estado:``,error:``}}var qh={},Jh=new Set;function Yh(e){return qh[e]||{}}function Xh(e,t){qh[e]=t,Jh.delete(e)}function Zh(e){delete qh[e],Jh.add(e)}function Qh(e){let t={...Yh(e.dataset.coordForm)},n=new Set;return e.querySelectorAll(`[name]`).forEach(r=>{if(r.type!==`file`){if(r.type===`radio`){if(n.has(r.name))return;n.add(r.name);let i=e.querySelector(`[name="${r.name}"]:checked`);t[r.name]=i?i.value:``}else if(r.type===`checkbox`){if(n.has(r.name))return;n.add(r.name);let i=e.querySelectorAll(`[name="${r.name}"]`);t[r.name]=[...i].filter(e=>e.checked).map(e=>e.value)}else t[r.name]=r.value}}),t}var $h=[`inicio`,`rutas`,`clientes`,`mas`],eg=[`cambios`,`pedidos`,`avisos`,`fichas`,`datos`,`docs`,`incidentes`],tg=null;function ng(){if(!tg){let e=Wf(Uf,{}),t=$h.includes(e.tab)?e.tab:`inicio`;tg={tab:t,sub:t===`mas`&&eg.includes(e.sub)?e.sub:``}}return tg}function rg(e){let[t,n=``]=String(e||`inicio`).split(`:`);tg={tab:$h.includes(t)?t:`inicio`,sub:eg.includes(n)?n:``},tg.sub&&(tg.tab=`mas`),Gf(Uf,{...Wf(Uf,{}),tab:tg.tab,sub:tg.sub})}function ig(e=`coord-view-title`){requestAnimationFrame(()=>{window.scrollTo({top:0,behavior:`auto`}),document.getElementById(e)?.focus({preventScroll:!0})})}var ag=!1,og=!1,sg=!1,cg=!1,lg=`nuevo`,ug=new Set,dg={menu:`<circle cx="5" cy="12" r="1.7" /><circle cx="12" cy="12" r="1.7" /><circle cx="19" cy="12" r="1.7" />`,arrowUp:`<path d="M12 19V5" /><path d="m6 11 6-6 6 6" />`,arrowDown:`<path d="M12 5v14" /><path d="m6 13 6 6 6-6" />`,arrowLeft:`<path d="M19 12H5" /><path d="m11 6-6 6 6 6" />`,search:`<circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" />`,check:`<path d="m5 12 5 5 9-10" />`,trash:`<path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" />`};function H(e,t=`coord-icon`){return dg[e]?`<svg class="${t}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${dg[e]}</svg>`:h(e,t)}function U(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?H(r):``}<span>${e}</span></button>`}function W(e,t=`neutral`,n=``){return`<span class="cd-chip is-${t}">${n?H(n,`coord-icon is-xs`):``}<span>${e}</span></span>`}function fg(e,t=2){return e.length<=t?lp(e):`${e.slice(0,t).join(`, `)} +${e.length-t}`}function pg(e){return String(Op(e)||``).split(` `)[0]}function mg(e,t=``,n=`md`){let r=e?.id?_t.de(e.id):null,i=String(t||e?.name||`?`).trim();return r?`<img class="cd-ava is-${n}" src="${I(r)}" alt="" loading="lazy" decoding="async" />`:`<span class="cd-ava is-${n} is-initial" aria-hidden="true">${I((i[0]||`?`).toUpperCase())}</span>`}function hg(e,{compact:t=!1}={}){if(!e?.id||_t.de(e.id))return``;let n=ug.has(e.id);return`
    <label class="cd-foto-btn ${t?`is-compact`:``} ${n?`is-busy`:``}">
      ${H(`camera`)}<span>${n?`Subiendo`:`Foto`}</span><span class="coord-sr-only"> de ${I(e.name)}</span>
      <input type="file" accept="image/*" capture="environment" data-coord-foto="${I(e.id)}" ${n?`disabled`:``} />
    </label>
  `}function gg(e,{choca:t=!1}={}){if(!e)return``;let n=[];return Dp(e)&&n.push(W(`Bozal`,`alert`,`alertTriangle`)),e.incompatibleWith?.length&&n.push(W(`No juntar: ${I(fg(e.incompatibleWith))}`,t?`alert`:`warn`,t?`alertTriangle`:``)),n.join(``)}function _g(e){return Vh(e)?W(`Carnet`,`ok`,`check`):W(`Sin carnet`,`warn`)}function vg(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${I(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function yg(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">*<span class="coord-sr-only"> obligatorio</span></span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${I(r)}" ${i?`placeholder="${I(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function bg(e,t,n,r,{value:i=``,hint:a=``,span:o=!1}={}){let s=`coord-${e}-${t}`,c=r.map(e=>Array.isArray(e)?e:[e,e]);return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${s}">${n}</label>
      <select id="${s}" name="${t}" ${a?`aria-describedby="${s}-hint"`:``}>
        ${c.map(([e,t])=>`<option value="${I(e)}" ${e===i?`selected`:``}>${I(t)}</option>`).join(``)}
      </select>
      ${a?`<small id="${s}-hint">${a}</small>`:``}
    </div>
  `}function xg(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``,required:c=!1}={}){let l=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${l}">${n}${c?` <span class="coord-required">*<span class="coord-sr-only"> obligatorio</span></span>`:``}</label>
      <textarea id="${l}" name="${t}" rows="3" ${i?`placeholder="${I(i)}"`:``} ${a?`aria-describedby="${l}-hint"`:``} ${s}>${I(r)}</textarea>
      ${a?`<small id="${l}-hint">${a}</small>`:``}
    </div>
  `}function Sg(e,t,n=``){return`
    <div class="cd-chiprow" role="group" aria-label="Opciones rápidas">
      ${t.map(([t,r])=>`<button type="button" class="cd-pill" data-coord-set-field="${e}" data-value="${I(t)}" aria-pressed="${L(t)===L(n)}">${I(r)}</button>`).join(``)}
    </div>
  `}function Cg(e,t){return`
    <div class="coord-field is-wide">
      <span class="coord-label" id="coord-${e}-dias-label">Días</span>
      <div class="cd-chiprow" role="group" aria-labelledby="coord-${e}-dias-label">
        ${bp.map(n=>`
          <label class="cd-pill is-check"><input type="checkbox" id="coord-${e}-dia-${cp(n)}" name="dias" value="${n}" ${t.includes(n)?`checked`:``} /><span>${up[n]}</span><span class="coord-sr-only"> ${n}</span></label>
        `).join(``)}
      </div>
    </div>
  `}function wg(e,t,n,{open:r=!1,id:i=``}={}){return`
    <details class="cd-fold" ${i?`id="${i}"`:``} ${pp(e,r)?`open`:``}>
      <summary data-coord-toggle="${e}"><span>${t}</span>${H(`chevronDown`,`coord-icon cd-chev`)}</summary>
      <div class="cd-fold-body">${n}</div>
    </details>
  `}function Tg(e,t,n,r=!1){return`
    <details class="cd-fold is-card" ${r||hp.has(e)?`open`:``}>
      <summary data-coord-mem-toggle="${I(e)}"><span>${t}</span>${H(`chevronDown`,`coord-icon cd-chev`)}</summary>
      <div class="cd-fold-body">${n}</div>
    </details>
  `}function Eg(e){return e.length?`<ul class="cd-warns">${e.map(e=>`<li>${H(`alertTriangle`)}<span>${I(e)}</span></li>`).join(``)}</ul>`:``}function Dg(e,t=`checkCircle`){return`<p class="cd-empty">${H(t)}<span>${e}</span></p>`}function Og(e,t){let n=`${Nh(e.tipo)}${e.perroNombre?` de ${e.perroNombre}`:``}`,r=[e.creadoPor===`web`?`Web`:e.creadoPorNombre||``,e.creadoEn?tp(e.creadoEn):ep(e.fecha),Ph(e.tamano),e.ubicacion===`drive`?`Drive`:``].filter(Boolean).join(` · `);return`
    <li class="coord-file">
      <span class="coord-file-icon">${H(Mh(e)?`fileCheck`:`fileText`)}</span>
      <span class="coord-file-text">
        <b>${I(n)}</b>
        ${r?`<small>${I(r)}</small>`:``}
        ${e.nota?`<small>${I(e.nota)}</small>`:``}
      </span>
      ${U(`Ver<span class="coord-sr-only"> ${I(n.toLowerCase())} (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${I(e.id)}" data-scope="${I(t)}"`,`ghost`,`eye`)}
    </li>
  `}function kg(e){let t=Lh(e),n=`pedido-${e.id}`;return t.length?`
    <div class="coord-attach">
      ${t.map(e=>{let t=Mh(e);return`
          <p class="coord-attach-row">
            ${H(t?`fileCheck`:`fileText`)}
            <span><b>${t?`Carnet adjunto`:`${I(Nh(e.tipo))} adjunto`}</b>${e.creadoEn?`<small>${I(tp(e.creadoEn))}</small>`:``}</span>
            ${U(`Ver<span class="coord-sr-only"> ${t?`carnet`:`archivo`} (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${I(e.id)}" data-scope="${I(n)}"`,`secondary`,`eye`)}
          </p>`}).join(``)}
    </div>
    ${Wh(n)}
  `:Wh(n)}function Ag(e,t,n,r){return`
    <label class="coord-btn is-secondary coord-file-pick" for="${e}">
      ${H(`camera`)}<span>${t}</span>
      <input id="${e}" type="file" accept="image/*,application/pdf" capture="environment" ${n} aria-describedby="${r}" />
    </label>
  `}function jg(e,t){let n=I(e.id),r=V,i=r.estado===`subiendo`,a=`coord-subida-hint-${n}`;return`
    <div class="coord-upload" id="coord-subida-${n}" role="group" aria-labelledby="coord-subida-title-${n}">
      <p class="coord-upload-title" id="coord-subida-title-${n}">Subir documento</p>
      ${Fh()?`<p class="coord-inline-alert">${H(`alertTriangle`)}<span>Sin señal: los archivos necesitan señal.</span></p>`:``}
      <div class="cd-chiprow" role="group" aria-label="Qué es">
        ${Dh.map(([e,t])=>`<button type="button" class="cd-pill" id="coord-subida-tipo-${n}-${e===Eh?`carnet`:`doc`}" data-coord-subida-set="tipo" data-value="${e}" aria-pressed="${e===r.tipo}">${t===`Carnet de vacunas`?`Carnet`:`Otro`}</button>`).join(``)}
      </div>
      ${t.length?`
        <div class="coord-field">
          <label for="coord-subida-perro-${n}">Perro${r.tipo===Eh&&t.length>1?` <span class="coord-required">*</span>`:``}</label>
          <select id="coord-subida-perro-${n}" data-coord-subida-campo="perroId">
            <option value="">${r.tipo===Eh?`Elegí`:`Ninguno`}</option>
            ${t.map(e=>`<option value="${e.id}" ${e.id===r.perroId?`selected`:``}>${I(e.name)}</option>`).join(``)}
          </select>
        </div>`:``}
      ${Ag(`coord-subida-archivo-${n}`,r.file?`Cambiar`:`Foto o PDF`,`data-coord-subida-archivo`,a)}
      <small id="${a}" class="cd-muted">${r.file?`${I(r.file.name)} (${Ph(r.file.size)})`:`Hasta 3,5 MB.`}</small>
      <div class="coord-field">
        <label for="coord-subida-nota-${n}">Nota</label>
        <input id="coord-subida-nota-${n}" type="text" value="${I(r.nota)}" data-coord-subida-campo="nota" autocomplete="off" placeholder="Opcional" />
      </div>
      <p class="coord-upload-status" role="status">${i?`${H(`clock`)}<span>Subiendo…</span>`:``}</p>
      ${r.error?`<p class="coord-inline-alert">${H(`alertCircle`)}<span>${I(r.error)}</span></p>`:``}
      <div class="cd-actions">
        ${U(i?`Subiendo…`:`Subir`,`id="coord-subida-ok-${n}" data-coord-subida-ok="${n}" ${i?`aria-disabled="true"`:``}`,`primary`,`uploadCloud`)}
        ${U(`Cancelar`,`id="coord-subida-cancel-${n}" data-coord-subida-cancel="${n}"`,`ghost`)}
      </div>
    </div>
  `}function Mg(e){let t=I(e.id),n=Rh(e),r=(Array.isArray(e.perros)?e.perros:[]).map(e=>Cp.get(e)).filter(Boolean),i=`cliente-${e.id}`;return`
    <div class="coord-docs" role="group" aria-labelledby="coord-docs-${t}">
      <h4 id="coord-docs-${t}">${H(`fileText`)}<span>Documentos</span> <span class="cd-count">${n.length}</span></h4>
      ${n.length?`<ul class="coord-files">${n.map(e=>Og(e,i)).join(``)}</ul>`:`<p class="cd-muted">${Ip.has(`archivos`)?`Sin documentos.`:`Cargando…`}</p>`}
      ${Wh(i)}
      ${V?.clienteId===e.id?jg(e,r):U(`Subir`,`id="coord-subir-${t}" data-coord-subir="${t}"`,`secondary`,`fileUp`)}
    </div>
  `}var Ng=`
  <datalist id="coord-team-users">${En.map(e=>`<option value="${I(e.id)}">${I(e.name)}</option>`).join(``)}</datalist>
`;function Pg(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Fg()}
      ${e}
    </div>
  `}function Fg(){return`
    <header class="coord-header">
      <a class="coord-brand" href="/coordinador" data-link aria-label="Paseos Juan, coordinación">
        <span class="coord-logo">
          <img class="coord-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="coord-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="coord-brand-text"><strong>Coordinación</strong></span>
      </a>
      <div class="coord-header-actions">
        <button class="coord-btn is-ghost is-compact" type="button" data-a11y-toggle aria-controls="a11y-panel">
          ${H(`eye`)}<span class="cd-hide-xs">Accesibilidad</span><span class="coord-sr-only cd-show-xs">Accesibilidad</span>
        </button>
        <a class="coord-btn is-ghost is-compact" href="/salir" data-link>${H(`logOut`)}<span>Salir</span></a>
      </div>
    </header>
  `}function Ig(){Yf(`coord-live`,`status`,`polite`),Yf(`coord-alerta`,`alert`,`assertive`),Vp(),Hp(),zh=Bh();let e=ng(),t,n=!1;return B?(t=B.picker?a_():r_(),n=!0):e.tab===`clientes`&&ag?(t=m_(),n=!0):e.tab===`mas`&&e.sub===`fichas`&&cg?(t=I_(),n=!0):t={inicio:Vg,rutas:qg,clientes:p_,mas:g_}[e.tab](),Jh.clear(),`
    <main class="coord-main ${n?`has-savebar`:`has-tabbar`}" id="coord-main" tabindex="-1">
      ${zg()}
      ${t}
      ${Ng}
    </main>
    ${n?``:Lg()}
    ${Rg()}
  `}function Lg(){let e=ng();return`
    <nav class="cd-tabbar" aria-label="Secciones">
      ${[[`inicio`,`home`,`Inicio`,Ym().length+bh(gh()).length],[`rutas`,`route`,`Rutas`,0],[`clientes`,`users`,`Clientes`,0],[`mas`,`menu`,`Más`,0]].map(([t,n,r,i])=>`
        <button type="button" class="cd-tab ${e.tab===t?`is-on`:``}" data-coord-go="${t}" ${e.tab===t?`aria-current="page"`:``}>
          ${H(n)}<span>${r}</span>${i?`<b class="cd-tab-n" aria-label="${i} para resolver">${i}</b>`:``}
        </button>`).join(``)}
    </nav>
  `}function Rg(){return qf?`
    <div class="cd-toast is-${qf.tone}">
      ${H(qf.tone===`error`?`alertCircle`:`checkCircle`)}
      <span>${I(qf.text)}</span>
      ${qf.undo?`<button type="button" class="cd-toast-undo" id="coord-toast-undo" data-coord-toast-undo>Deshacer</button>`:``}
      <button type="button" class="cd-toast-x" data-coord-toast-x aria-label="Cerrar aviso">${H(`x`)}</button>
    </div>
  `:``}function zg(){let e=_.pendingCount(),t=navigator.onLine===!1,n=[...new Set(Lp.values())],r=[];return(t||e)&&r.push(`<p class="cd-sync is-warn">${H(`clock`)}<span>${t?`Sin señal: seguí marcando, se envía solo.`:``}${e?` ${e} ${e===1?`cambio espera`:`cambios esperan`} señal.`:``}${t?` Fotos y archivos: con señal.`:``}</span></p>`),n.length&&r.push(`<div class="cd-sync is-error">${H(`alertCircle`)}<span>${n.map(I).join(` `)}</span>${U(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),em&&r.push(`<p class="cd-sync is-ok">${H(`uploadCloud`)}<span>${I(em)}</span></p>`),r.join(``)}function Bg({go:e,iconName:t,n,label:r,sub:i,tone:a}){return`
    <button type="button" class="cd-tile is-${a}" data-coord-go="${e}" id="coord-tile-${e.replace(`:`,`-`)}">
      <span class="cd-tile-top">${H(t)}<b class="cd-tile-n">${n}</b></span>
      <span class="cd-tile-label">${r}</span>
      <small>${i}</small>
    </button>
  `}function Vg(){let e=v(),t=gp(),n=Ym(),r=n.filter(e=>e.urgente).length,i=bh(gh()),a=sh(),o=ch(a).map(([e])=>e),s=e=>!Ip.has(e);return`
    <header class="cd-hello">
      <p class="cd-date">${I(ap(e))}</p>
      <h1 id="coord-view-title" tabindex="-1">Hola, ${I(pg(t.nombre)||t.nombre)}</h1>
    </header>
    <div class="cd-tiles">
      ${Bg({go:`mas:cambios`,iconName:`bell`,n:n.length,label:`Pedidos de cambio`,tone:r?`alert`:n.length?`warn`:`ok`,sub:s(`solicitudes`)&&!n.length?`…`:r?`${r} ${r===1?`urgente`:`urgentes`}`:n.length?`Pendientes`:`Al día`})}
      ${Bg({go:`mas:pedidos`,iconName:`clipboardCheck`,n:i.length,label:`Pedidos nuevos`,tone:i.length?`warn`:`ok`,sub:s(`pedidos`)&&!i.length?`…`:i.length?`De la web`:`Al día`})}
      ${Bg({go:`mas:avisos`,iconName:`mapPin`,n:a.length,label:`Avisos`,tone:a.length?`warn`:`ok`,sub:a.length?I(fg(o,1)):`Sin avisos`})}
    </div>
    ${n.length?`
      <section class="cd-sec" aria-labelledby="coord-inicio-sol">
        <h2 class="cd-h2" id="coord-inicio-sol">Para resolver</h2>
        <ul class="cd-list">${n.slice(0,2).map(e=>s_(e)).join(``)}</ul>
        ${n.length>2?U(`Ver todos (${n.length})`,`data-coord-go="mas:cambios"`,`ghost`,`arrowRight`):``}
      </section>`:``}
    <section class="cd-sec" aria-labelledby="coord-inicio-rutas">
      <div class="cd-h2-row">
        <h2 class="cd-h2" id="coord-inicio-rutas">Rutas de hoy</h2>
        ${U(`Semana`,`data-coord-go-rutas="semana"`,`ghost`,`calendarCheck`)}
      </div>
      ${Kg(e)}
    </section>
  `}function Hg(e){return(e.paradas||[]).slice().sort((e,t)=>(_p(e.hora)??9999)-(_p(t.hora)??9999))}function Ug(e,t=7){if(!e.length)return`<p class="cd-muted">Sin perros</p>`;let n=e.length-t;return`
    <div class="cd-thumbs" aria-hidden="true">
      ${e.slice(0,n>0?t-1:t).map(e=>mg(Ep(e),e.perroNombre,`sm`)).join(``)}
      ${n>0?`<span class="cd-ava is-sm is-more">+${n+1}</span>`:``}
    </div>
  `}function Wg(e,t){let n=Ep(e);return`
    <li class="cd-mini ${t?`is-alert`:``}">
      <b class="cd-mini-hora">${I(yp(e.hora)||`--:--`)}</b>
      ${mg(n,e.perroNombre,`sm`)}
      <span class="cd-mini-name">${I(e.perroNombre||n?.name||`Pendiente de confirmar`)}</span>
      <span class="cd-chips">${gg(n)}${n?_g(n):W(`Sin ficha`,`warn`)}</span>
    </li>
  `}function Gg(e,t,{detalle:n=!1,filtro:r=!1}={}){let i=wm(e,t),a=Hg(e),o=r?a.filter(e=>!Vh(Ep(e))):a,s=a.length,c=`ruta-${t}-${e.ruta}`,l=t=>(e.paradas||[]).indexOf(t);return`
    <li class="cd-card cd-route ${i.list.length?`is-alert`:``}">
      <div class="cd-route-top">
        <strong class="cd-route-code">${I(e.ruta)}</strong>
        ${W(I(e.turno),`info`)}
        ${e.origen===`dia`?W(`Cambio del día`,`warn`):``}
        ${i.list.length?W(`${i.list.length} ${i.list.length===1?`alerta`:`alertas`}`,`alert`,`alertTriangle`):``}
      </div>
      <p class="cd-route-time">${I(vm(e))}</p>
      <p class="cd-route-meta">${H(`users`)}<span>${I(pg(e.paseador)||`Sin paseador`)}${e.ayudante?` + ${I(pg(e.ayudante))}`:``} · ${s} ${s===1?`perro`:`perros`}</span></p>
      ${Ug(a)}
      ${n?Tg(c,r?`Sin carnet (${o.length})`:`Paradas`,`
        ${Eg(i.list)}
        ${o.length?`<ol class="cd-minis">${o.map(e=>Wg(e,i.byStop.has(l(e)))).join(``)}</ol>`:`<p class="cd-muted">${r?`Todos tienen carnet.`:`Sin perros.`}</p>`}
      `,r):``}
      <div class="cd-actions">
        ${U(`Editar`,`id="coord-ed-dia-${I(e.ruta)}" data-coord-edit-dia="${I(e.ruta)}" data-fecha="${t}" aria-label="Editar ${I(e.ruta)} ${I(e.turno.toLowerCase())}"`,`primary`,`sliders`)}
        ${U(`Copiar`,`data-coord-copy-ruta="${I(e.ruta)}" data-fecha="${t}" aria-label="Copiar ${I(e.ruta)} para WhatsApp"`,`ghost`,`copy`)}
      </div>
    </li>
  `}function Kg(e,{detalle:t=!1,filtro:n=!1}={}){let r=pm();if(!Ip.has(`plantillas`)&&!r.length)return Dg(`Cargando rutas…`,`clock`);if(!r.length&&!mm().length)return`${Dg(`Todavía no hay rutas.`,`route`)}${U(`Cargar rutas`,`data-coord-go-rutas="dia"`,`primary`,`uploadCloud`)}`;let i=gm(e);return i.length?`<ul class="cd-list">${i.map(r=>Gg(r,e,{detalle:t,filtro:n})).join(``)}</ul>`:Dg(`No hay rutas este día.`,`route`)}function qg(){let e=pm(),t=`<div class="cd-viewhead"><h1 id="coord-view-title" tabindex="-1">Rutas</h1></div>`;if(!Ip.has(`plantillas`)&&!e.length)return`${t}${Dg(`Cargando rutas…`,`clock`)}`;if(!e.length||Am)return`${t}${Jg()}`;let n=Nm();return`
    ${t}
    <div class="cd-seg" role="group" aria-label="Qué ver">
      <button type="button" class="cd-seg-btn" id="coord-vista-dia" data-coord-vista="dia" aria-pressed="${n===`dia`}">${H(`route`)}<span>Día</span></button>
      <button type="button" class="cd-seg-btn" id="coord-vista-semana" data-coord-vista="semana" aria-pressed="${n===`semana`}">${H(`calendarCheck`)}<span>Semana</span></button>
    </div>
    ${n===`semana`?Qg():Xg()}
  `}function Jg(){let e=Wn(),t=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <div class="cd-card cd-carga">
      <p class="cd-big">${H(`uploadCloud`)}<span><b>${e.length} rutas</b> · ${t} paseos</span></p>
      <p class="cd-muted">De la planilla RPJ (BASE RUTAS, 12/11/2026). Sin «Llak»: no coincide con ningún perro.</p>
      ${Am?`<p class="cd-note" role="status">${H(`clock`)}<span>${I(Am)}</span></p>`:``}
      ${km?`
        <div class="cd-confirm" role="group" aria-labelledby="coord-carga-q">
          <p id="coord-carga-q"><b>¿Cargar las ${e.length} rutas?</b> Las ve todo el equipo.</p>
          <div class="cd-actions">
            ${U(`Sí, cargar`,`id="coord-carga-ok" data-coord-carga-ok`,`primary`,`checkCircle`)}
            ${U(`Cancelar`,`id="coord-carga-cancel" data-coord-carga-cancel`,`ghost`)}
          </div>
        </div>`:U(`Cargar rutas`,`id="coord-carga" data-coord-carga`,`primary`,`uploadCloud`)}
    </div>
  `}function Yg(e){return`${up[ip(e)]||``} ${ep(e).slice(0,5)}`}function Xg(){let e=v(),t=Fm(),n=gm(t),r=n.reduce((e,t)=>e+(t.paradas||[]).length,0),i=new Set;n.forEach(e=>(e.paradas||[]).forEach(e=>{let t=Ep(e);Vh(t)||i.add(t?.id||L(e.perroNombre))}));let a=Mm&&n.length>0;return`
    <div class="cd-chiprow cd-daypick" role="group" aria-label="Día">
      ${[0,1,2].map(t=>rp(e,t)).map((e,n)=>`<button type="button" class="cd-pill" id="coord-dia-${n}" data-coord-ver-dia="${e}" aria-pressed="${e===t}">${n===0?`Hoy`:I(Yg(e))}</button>`).join(``)}
      <label class="cd-pill is-date"><span class="coord-sr-only">Otro día</span>${H(`calendarCheck`)}<input id="coord-rutas-fecha" type="date" value="${t}" min="${e}" max="${rp(e,90)}" data-coord-rutas-fecha /></label>
    </div>
    <p class="cd-dayline"><b>${I(ap(t))}</b> · ${n.length} ${n.length===1?`ruta`:`rutas`} · ${r} perros</p>
    ${n.length?`
      <div class="cd-chiprow">
        <button type="button" class="cd-pill" id="coord-filtro-carnet" data-coord-filtro-carnet aria-pressed="${a}">${H(`fileText`,`coord-icon is-xs`)}Sin carnet (${i.size})</button>
        <button type="button" class="cd-pill" id="coord-copy-dia" data-coord-copy-dia="${t}">${H(`copy`,`coord-icon is-xs`)}Copiar todo</button>
      </div>`:``}
    ${Kg(t,{detalle:!0,filtro:a})}
    <div class="cd-actions is-split">
      ${xp.map(e=>U(`Ruta ${e.toLowerCase()}<span class="coord-sr-only"> extra, solo el ${I(ap(t).toLowerCase())}</span>`,`id="coord-extra-${cp(e)}" data-coord-new-dia data-turno="${e}" data-fecha="${t}"`,`ghost`,`plus`)).join(``)}
    </div>
  `}function Zg(e,t,n){let r=Cm(e).list.length,i=(e.paradas||[]).length;return`
    <li>
      <button type="button" class="cd-wroute ${r?`is-alert`:``}" id="coord-wr-${I(e.id)}" data-coord-edit-plantilla="${I(e.id)}" aria-label="Editar ${I(e.ruta)}, ${t.toLowerCase()} ${n.toLowerCase()}, ${i} perros">
        <span class="cd-wroute-top"><strong>${I(e.ruta)}</strong>${r?W(String(r),`alert`,`alertTriangle`):``}<span class="cd-wroute-n">${i} ${i===1?`perro`:`perros`}</span></span>
        <span class="cd-wroute-meta">${I(vm(e))} · ${I(pg(e.paseador)||`Sin paseador`)}</span>
        ${Ug(Hg(e),6)}
      </button>
    </li>
  `}function Qg(){let e=pm(),t=ip(v());return`
    <p class="cd-muted">Se repite cada semana.</p>
    <div class="cd-week">
      ${(e.some(e=>e.dia===`Domingo`)?On:bp).map(e=>{let n=hm(e),r=n.reduce((e,t)=>e+t.paradas.length,0),i=n.reduce((e,t)=>e+Cm(t).list.length,0);return`
          <details class="cd-fold cd-wday ${e===t?`is-today`:``}" ${pp(`wd-${cp(e)}`,e===t)?`open`:``}>
            <summary data-coord-toggle="wd-${cp(e)}">
              <span class="cd-wday-title"><b>${e}</b>${e===t?W(`Hoy`,`info`):``}${i?W(String(i),`alert`,`alertTriangle`):``}</span>
              <span class="cd-muted">${n.length} ${n.length===1?`ruta`:`rutas`} · ${r}</span>
              ${H(`chevronDown`,`coord-icon cd-chev`)}
            </summary>
            <div class="cd-fold-body">
              ${xp.map(t=>{let r=n.filter(e=>e.turno===t);return`
                  <div class="cd-wturno">
                    <p class="cd-wturno-label">${t}</p>
                    ${r.length?`<ul class="cd-wroutes">${r.map(n=>Zg(n,e,t)).join(``)}</ul>`:``}
                    <button type="button" class="cd-add-mini" id="coord-wadd-${cp(e)}-${cp(t)}" data-coord-new-route data-dia="${e}" data-turno="${t}">${H(`plus`)}<span>Ruta</span><span class="coord-sr-only"> nueva el ${e.toLowerCase()} a la ${t.toLowerCase()}</span></button>
                  </div>
                `}).join(``)}
            </div>
          </details>
        `}).join(``)}
    </div>
  `}function $g(e){return/^No juntar/.test(e)?`No juntar`:/^Tamaños/.test(e)?`Tamaños`:/falta la hora/.test(e)?`Sin hora`:/dos veces/.test(e)?`Repetido`:/también está en/.test(e)?`En 2 rutas`:/sin ficha/.test(e)||/estado/.test(e)?``:`Revisar`}function e_(e,t,n){let r=Ep(e),i=n.byStop.get(t)||[],a=B.paradas.length-1,o=e.perroNombre||r?.name||`Pendiente de confirmar`,s=`stop-${B.id}-${t}`,c=vp(e.hora)?Hn(yp(e.hora),e.minutos||45):``,l=[...new Set(i.map($g).filter(Boolean))],u=l.includes(`No juntar`)&&r?.incompatibleWith?.length,d=`${l.filter(e=>!(u&&e===`No juntar`)).map(e=>W(e,`alert`,`alertTriangle`)).join(``)}${gg(r,{choca:u})}${r?r.status===`Activo`?``:W(I(r.status),`alert`):W(`Sin ficha`,`warn`)}`;return`
    <li class="cd-stop ${i.length?`is-alert`:``}" id="coord-stop-${t}">
      <div class="cd-stop-row">
        <span class="cd-stop-ava">${mg(r,o,`md`)}<b class="cd-stop-num" aria-hidden="true">${t+1}</b></span>
        <div class="cd-stop-main">
          <strong>${I(o)}</strong>
        </div>
        <label class="cd-hora-wrap" for="coord-ed-hora-${t}">
          <span class="coord-sr-only">Hora de retiro de ${I(o)}</span>
          <input class="cd-hora" id="coord-ed-hora-${t}" type="time" step="300" value="${I(yp(e.hora))}" data-coord-stop="${t}" data-k="hora" ${vp(e.hora)?``:`aria-invalid="true"`} />
        </label>
      </div>
      ${d?`<p class="cd-chips cd-stop-chips">${d}</p>`:``}
      ${i.length?`<p class="coord-sr-only">${I(i.join(` `))}</p>`:``}
      <div class="cd-stop-tools">
        <button type="button" class="cd-icon-btn" id="coord-ed-up-${t}" data-coord-stop-up="${t}" ${t===0?`disabled`:``} aria-label="Subir a ${I(o)}">${H(`arrowUp`)}</button>
        <button type="button" class="cd-icon-btn" id="coord-ed-down-${t}" data-coord-stop-down="${t}" ${t===a?`disabled`:``} aria-label="Bajar a ${I(o)}">${H(`arrowDown`)}</button>
        <button type="button" class="cd-icon-btn is-danger" id="coord-ed-del-${t}" data-coord-stop-del="${t}" aria-label="Quitar a ${I(o)}">${H(`x`)}</button>
        ${Tg(s,`${Number(e.minutos)||45} min${e.nota?` · nota`:``}`,`
          ${Eg(i)}
          <div class="cd-chiprow" role="group" aria-label="Minutos de ${I(o)}">
            ${[20,30,45,60].map(n=>`<button type="button" class="cd-pill" id="coord-ed-min-${t}-${n}" data-coord-stop-min="${t}" data-value="${n}" aria-pressed="${(Number(e.minutos)||45)===n}">${n} min</button>`).join(``)}
          </div>
          ${c?`<p class="cd-muted">Vuelve ~${c}</p>`:``}
          <div class="coord-field">
            <label for="coord-ed-nota-${t}">Nota</label>
            <input id="coord-ed-nota-${t}" type="text" value="${I(e.nota)}" data-coord-stop="${t}" data-k="nota" placeholder="Ej.: bozal" autocomplete="off" />
          </div>
        `)}
      </div>
    </li>
  `}function t_(e,t,n,{conNinguno:r=!1,porNombre:i=!1}={}){let a=En.map(e=>[i?e.name.split(` `)[0]:e.id,e.name.split(` `)[0]]);r&&a.unshift([``,`Ninguno`]);let o=a.some(([e])=>L(e)===L(n));return`
    <div class="cd-team-row">
      <span class="coord-label" id="coord-ed-${e}-label">${t}</span>
      <div class="cd-chiprow" role="group" aria-labelledby="coord-ed-${e}-label">
        ${a.map(([t,r])=>`<button type="button" class="cd-pill" id="coord-ed-set-${e}-${cp(t)||`ninguno`}" data-coord-ed-set="${e}" data-value="${I(t)}" aria-pressed="${L(t)===L(n)}">${I(r)}</button>`).join(``)}
      </div>
      <input id="coord-ed-${e}" class="cd-team-other" type="text" ${i?``:`list="coord-team-users"`} value="${o?``:I(n)}" data-coord-ed-field="${e}" autocomplete="off" placeholder="Otro${i?``:` usuario`}" aria-label="${t}: otro" />
    </div>
  `}function n_(e){return e.modo===`dia`?e.fecha===v()?`Solo hoy`:`Solo ${Yg(e.fecha)}`:`Solo un día`}function r_(){let e=B,t=Bm(),n=e.solicitudId?Jm().find(t=>t.id===e.solicitudId):null,r=e.modo===`plantilla`,i=r?sp(e.dia):[],a=e.destino===`semana`,o=[pg(e.paseador)||`Sin paseador`,e.ayudante?`+ ${pg(e.ayudante)}`:``,e.supervisor?`· sup. ${pg(e.supervisor)}`:``].filter(Boolean).join(` `);return`
    <section class="cd-editor" id="coord-editor" aria-labelledby="coord-view-title">
      <div class="cd-subhead">
        <button type="button" class="cd-back" id="coord-ed-close" data-coord-ed-close>${H(`arrowLeft`)}<span>Volver</span></button>
        <div>
          <h1 id="coord-view-title" tabindex="-1">${I(e.ruta)} · ${I(e.turno)}</h1>
          <p class="cd-muted">${r?`Todos los ${I(e.dia.toLowerCase())}`:I(ap(e.fecha))}${e.nuevo?` · nueva`:``}</p>
        </div>
      </div>

      ${Om===`salir`?`
        <div class="cd-confirm" role="group" aria-labelledby="coord-salir-q">
          <p id="coord-salir-q"><b>¿Salir sin guardar?</b> Se pierden los cambios.</p>
          <div class="cd-actions">
            ${U(`Salir`,`id="coord-ed-close-ok" data-coord-ed-close-ok`,`danger`,`x`)}
            ${U(`Seguir`,`id="coord-ed-close-cancel" data-coord-ed-close-cancel`,`secondary`)}
          </div>
        </div>`:``}

      ${n?`
        <div class="cd-sol-box" role="note">
          <p>${H(`bell`)}<span><b>${I(pg(n.creadoPorNombre)||`Supervisor`)}:</b> ${I(n.titulo||n.tipo||``)}${n.detalle?` · ${I(n.detalle)}`:``}</span></p>
          ${e.precarga?`<p class="cd-done">${H(`checkCircle`)}<span>${I(e.precarga)}</span></p>`:``}
          <div class="coord-field">
            <label for="coord-ed-respuesta">Respuesta</label>
            <input id="coord-ed-respuesta" type="text" value="${I(e.respuesta)}" data-coord-ed-field="respuesta" placeholder="Opcional" autocomplete="off" />
          </div>
        </div>`:``}

      ${e.nuevo?`
        <div class="coord-field">
          <label for="coord-ed-ruta">Código</label>
          <input id="coord-ed-ruta" type="text" value="${I(e.ruta)}" data-coord-ed-field="ruta" autocomplete="off" placeholder="PJ_2M" />
        </div>`:``}

      ${wg(`ed-equipo`,`${H(`users`)}<b>Equipo</b> <span class="cd-muted">${I(o)}</span>`,`
        ${t_(`paseador`,`Paseador`,e.paseador)}
        ${t_(`ayudante`,`Ayudante`,e.ayudante,{conNinguno:!0})}
        ${t_(`supervisor`,`Supervisa`,e.supervisor,{porNombre:!0})}
      `,{open:e.nuevo||!e.paseador})}

      ${t.list.length?Tg(`ed-warn-${e.id}`,`${H(`alertTriangle`)}<b>${t.list.length} ${t.list.length===1?`alerta`:`alertas`}</b> <span class="cd-muted">No frena el guardado</span>`,Eg(t.list)):``}

      <div class="cd-h2-row">
        <h2 class="cd-h2">Perros <span class="cd-count">${e.paradas.length}</span></h2>
        ${e.paradas.length>1?U(`Por hora`,`id="coord-ed-sort" data-coord-ed-sort`,`ghost`,`clock`):``}
      </div>
      ${e.paradas.length?`<ol class="cd-stops">${e.paradas.map((e,n)=>e_(e,n,t)).join(``)}</ol>`:Dg(`Sin perros todavía.`,`pawPrint`)}

      <button type="button" class="coord-btn is-secondary is-block" id="coord-ed-picker" data-coord-ed-picker>${H(`plus`)}<span>Agregar perro</span></button>

      ${wg(`ed-mas`,`${H(`menu`)}<b>Más</b>`,`
        <div class="coord-field">
          <label for="coord-ed-notas">Notas de la ruta</label>
          <textarea id="coord-ed-notas" rows="2" data-coord-ed-field="notas" placeholder="Ej.: arrancar por Mapuche">${I(e.notas)}</textarea>
        </div>
        <div class="cd-actions">
          ${U(`Copiar`,`id="coord-ed-copy" data-coord-ed-copy`,`ghost`,`copy`)}
          ${e.existeDia&&Kp(e.existeDia)?U(`Igual que la semana`,`id="coord-ed-revert" data-coord-ed-revert`,`ghost`,`calendarCheck`):``}
        </div>
      `)}

      <div class="cd-savebar">
        <div class="cd-switch" role="radiogroup" aria-label="Guardar para">
          <button type="button" role="radio" class="cd-switch-btn" id="coord-ed-destino-dia" data-coord-ed-destino="dia" aria-checked="${!a}">${I(n_(e))}</button>
          <button type="button" role="radio" class="cd-switch-btn" id="coord-ed-destino-semana" data-coord-ed-destino="semana" aria-checked="${a}">Toda la semana</button>
        </div>
        ${r&&!a?`
          <label class="coord-sr-only" for="coord-ed-solodia">Qué día</label>
          <select id="coord-ed-solodia" class="cd-savebar-select" data-coord-ed-field="soloDia">
            ${i.map(t=>`<option value="${t}" ${t===e.soloDia?`selected`:``}>${I(ap(t))}${t===v()?` (hoy)`:``}${mm().some(n=>n.id===fm(t,e.ruta))?` · se reemplaza`:``}</option>`).join(``)}
          </select>`:`<p class="cd-savebar-hint">${a?`Cambia todos los ${I(e.dia.toLowerCase())}.`:`La semana no cambia.`}</p>`}
        <button type="button" class="coord-btn is-primary is-block is-big" id="coord-ed-save" data-coord-ed-save>${H(`checkCircle`)}<span>Guardar</span></button>
      </div>
    </section>
  `}function i_(){if(!B)return``;let e=L(Em),t=new Set(B.paradas.map(e=>Ep(e)?.id).filter(Boolean)),n=e=>In(e,B.dia,B.turno),r=x.filter(t=>!e||L(t.name).includes(e)).sort((e,t)=>Number(n(t))-Number(n(e))||e.name.localeCompare(t.name,`es`)),i=x.some(t=>L(t.name)===e),a=vp(Dm)?yp(Dm):ym(B);return`
    ${r.length?`
      <ul class="cd-dog-grid">
        ${r.map(e=>{let r=t.has(e.id);return`
            <li class="cd-dog-tile ${r?`is-in`:``}">
              <button type="button" class="cd-dog-add" id="coord-add-${e.id}" data-coord-add-dog="${e.id}" aria-label="${r?`${I(e.name)} ya está. Agregar otra vez a las ${a}`:`Agregar a ${I(e.name)} a las ${a}`}">
                ${mg(e,e.name,`lg`)}
                ${r?`<span class="cd-dog-in">${H(`check`)}</span>`:``}
                <b>${I(e.name)}</b>
                <span class="cd-chips">${Dp(e)?W(`Bozal`,`alert`):``}${e.incompatibleWith?.length?W(`No juntar`,`warn`):``}${e.status===`Activo`?n(e)?W(`Suele salir`,`info`):``:W(I(e.status),`alert`)}</span>
              </button>
              ${hg(e,{compact:!0})}
            </li>`}).join(``)}
      </ul>`:Dg(`Ningún perro con ese nombre.`,`search`)}
    ${!i&&Em.trim().length>=2?`
      <button type="button" class="coord-btn is-ghost is-block" id="coord-add-libre" data-coord-add-libre>${H(`plus`)}<span>«${I(Em.trim())}» sin ficha · ${a}</span></button>`:``}
  `}function a_(){let e=B,t=vp(Dm)?yp(Dm):ym(e);return`
    <section class="cd-picker" aria-labelledby="coord-view-title">
      <div class="cd-subhead">
        <button type="button" class="cd-back" id="coord-picker-back" data-coord-ed-picker-close>${H(`arrowLeft`)}<span>Ruta</span></button>
        <div>
          <h1 id="coord-view-title" tabindex="-1">Agregar perro</h1>
          <p class="cd-muted">${I(e.ruta)} · ${I(e.turno)} · ${e.paradas.length} perros</p>
        </div>
      </div>
      <div class="cd-picker-tools">
        <label class="cd-search" for="coord-ed-buscar">
          ${H(`search`)}<span class="coord-sr-only">Buscar perro</span>
          <input id="coord-ed-buscar" type="search" value="${I(Em)}" data-coord-ed-search autocomplete="off" placeholder="Buscar" aria-controls="coord-picker-grid" />
        </label>
        <label class="cd-hora-wrap is-small" for="coord-ed-nueva-hora">
          <span class="cd-muted">Hora</span>
          <input class="cd-hora" id="coord-ed-nueva-hora" type="time" step="300" value="${I(t)}" data-coord-ed-hora />
        </label>
      </div>
      <div id="coord-picker-grid">${i_()}</div>
      <div class="cd-savebar">
        ${e.agregados?`
          <p class="cd-savebar-hint">${e.destino===`semana`?`Todos los ${I(e.dia.toLowerCase())}`:I(n_(e))}</p>
          <div class="cd-savebar-row">
            <button type="button" class="coord-btn is-ghost" id="coord-picker-done" data-coord-ed-picker-close>${H(`arrowLeft`)}<span>Ruta</span></button>
            <button type="button" class="coord-btn is-primary is-big" id="coord-picker-save" data-coord-ed-save>${H(`checkCircle`)}<span>Guardar (${e.agregados})</span></button>
          </div>`:`
          <button type="button" class="coord-btn is-primary is-block is-big" id="coord-picker-done" data-coord-ed-picker-close>${H(`check`)}<span>Listo</span></button>`}
      </div>
    </section>
  `}var o_=[[`Sin lugar`,`No hay lugar en la ruta ese día.`],[`Ya estaba`,`Ya estaba así en la ruta.`],[`Falta info`,`Falta info: decime qué perro, qué día y a qué hora.`],[`Lo hablo`,`Lo hablo con Juan y te aviso.`]];function s_(e){let t=I(e.id),n=e.estado||`pendiente`,r=Xm(e),i=e.perroNombre||r?.name||``,a=e.titulo||[e.tipo,i].filter(Boolean).join(`: `)||`Pedido de cambio`,o=qm===e.id,s=n===`aplicado`?W(`Aplicado`,`ok`):n===`rechazado`?W(`Rechazado`,`neutral`):``;return`
    <li class="cd-card cd-sol ${e.urgente&&n===`pendiente`?`is-urgent`:``}" id="coord-sol-${t}" tabindex="-1">
      <div class="cd-row">
        ${mg(r,i||e.tipo,`md`)}
        <div class="cd-row-main">
          <strong>${I(a)}</strong>
          <small>${I([e.fecha?e.fecha===v()?`Hoy`:Yg(e.fecha):``,e.turno,e.ruta].filter(Boolean).join(` · `)||`Pendiente de confirmar`)}</small>
        </div>
      </div>
      <p class="cd-chips">${e.urgente?W(`Urgente`,`alert`,`alertTriangle`):``}${s}${gg(r)}</p>
      ${e.detalle?`<p class="cd-line">${I(e.detalle)}</p>`:``}
      ${Tg(`sol-${e.id}`,`Más`,vg([[`Por qué`,e.motivo],[`Pidió`,e.creadoPorNombre?`${e.creadoPorNombre}${e.creadoEn?`, ${tp(e.creadoEn)}`:``}`:``],[`Respuesta`,e.respuesta]])||`<p class="cd-muted">Sin más datos.</p>`)}
      ${e.pendiente?`<p class="coord-meta is-pending">${H(`clock`)}<span>Se envía con señal.</span></p>`:``}
      ${n===`pendiente`?o?`
        <div class="cd-reject" role="group" aria-labelledby="coord-rechazo-t-${t}">
          <p class="cd-reject-title" id="coord-rechazo-t-${t}">Respuesta rápida</p>
          <div class="cd-chiprow">
            ${o_.map(([e,n],r)=>`<button type="button" class="cd-pill" id="coord-rapido-${t}-${r}" data-coord-sol-rapido="${t}" data-texto="${I(n)}">${I(e)}</button>`).join(``)}
          </div>
          <div class="coord-field">
            <label for="coord-rechazo-${t}">O escribí</label>
            <textarea id="coord-rechazo-${t}" rows="2" data-coord-rechazo="${t}" placeholder="Ej.: lo pasamos al lunes">${I(Km[e.id]||``)}</textarea>
          </div>
          <div class="cd-actions">
            ${U(`Enviar`,`id="coord-rechazar-ok-${t}" data-coord-sol-rechazar-ok="${t}"`,`primary`,`send`)}
            ${U(`Cancelar`,`data-coord-sol-rechazar-cancel="${t}"`,`ghost`)}
          </div>
        </div>`:`
        <div class="cd-actions is-split">
          ${U(`Aplicar`,`id="coord-aplicar-${t}" data-coord-sol-aplicar="${t}"`,`primary`,`checkCircle`)}
          ${U(`Rechazar`,`id="coord-rechazar-${t}" data-coord-sol-rechazar="${t}"`,`ghost`,`x`)}
        </div>`:``}
    </li>
  `}function c_(){let e=Ym(),t=Jm().filter(e=>(e.estado||`pendiente`)!==`pendiente`);return`
    ${h_(`Pedidos de cambio`,e.length)}
    <p class="cd-muted">Del supervisor.</p>
    ${e.length?`<ul class="cd-list">${e.map(e=>s_(e)).join(``)}</ul>`:Dg(Ip.has(`solicitudes`)?`No hay pedidos pendientes.`:`Cargando…`,Ip.has(`solicitudes`)?`checkCircle`:`clock`)}
    ${t.length?wg(`solHist`,`Respondidos (${t.length})`,`<ul class="cd-list">${t.map(e=>s_(e)).join(``)}</ul>`):``}
  `}function l_(e){return(Array.isArray(e)?e:[]).map(e=>Cp.get(e)?.name||e)}function u_(e){let t=I(e.id),n=$m.find(([t])=>t===e.estado)||$m[0],r=(Array.isArray(e.perros)?e.perros:[]).map(e=>Cp.get(e)||{id:``,name:e}),i=Rh(e).length,a=V?.clienteId===e.id||Hh?.key===`cliente-${e.id}`&&Date.now()<Hh.until;return`
    <li class="cd-card cd-cli is-${I(n[0])}" id="coord-cli-${t}">
      <div class="cd-row">
        ${mg(r[0]?.id?r[0]:null,r[0]?.name||e.nombre,`md`)}
        <div class="cd-row-main">
          <strong>${I(e.nombre||`Pendiente de confirmar`)}</strong>
          <small>${I(e.barrio||`Sin barrio`)}</small>
        </div>
        ${W(n[1],n[0]===`activo`?`ok`:n[0]===`pausa`?`warn`:`neutral`)}
      </div>
      ${r.length?`
        <ul class="cd-cli-dogs">
          ${r.map(e=>`
            <li>
              ${mg(e.id?e:null,e.name,`sm`)}
              <span class="cd-cli-dog">${I(e.name)}</span>
              <span class="cd-chips">${e.id?`${gg(e)}${_g(e)}`:W(`Sin ficha`,`warn`)}</span>
              ${hg(e.id?e:null,{compact:!0})}
            </li>`).join(``)}
        </ul>`:`<p class="cd-muted">Sin perros cargados.</p>`}
      ${e.pendiente?`<p class="coord-meta is-pending">${H(`clock`)}<span>Se envía con señal.</span></p>`:``}
      <div class="cd-actions is-split">
        ${e.telefono?Ch(e.telefono,`Hola ${e.nombre||``}, te escribo de Paseos Juan.`.replace(` ,`,`,`),`whatsapp`,`WhatsApp`):``}
        ${U(`Editar`,`id="coord-cli-edit-${t}" data-coord-cliente-edit="${t}"`,`ghost`,`sliders`)}
      </div>
      ${Tg(`cli-${e.id}`,`Más datos · Docs (${i})`,`
        ${vg([[`Teléfono`,e.telefono],[`Plan`,e.plan&&e.plan!==`Pendiente de confirmar`?e.plan:``],[`Días`,Array.isArray(e.dias)&&e.dias.length?dp(e.dias):``],[`Turno`,e.turno&&e.turno!==`Pendiente de confirmar`?e.turno:``],[`Notas`,e.notas]],`is-compact`)}
        ${Mg(e)}
      `,a)}
    </li>
  `}function d_(){let e=L(rh),t=ih();return e?t.filter(t=>L([t.nombre,t.barrio,t.telefono,t.notas,...l_(t.perros)].join(` `)).includes(e)):t}function f_(){let e=d_();return e.length?`<ul class="cd-list is-grid">${e.map(u_).join(``)}</ul>`:Dg(Ip.has(`clientes`)?rh?`Ningún cliente coincide.`:`Todavía no hay clientes.`:`Cargando clientes…`,Ip.has(`clientes`)?`users`:`clock`)}function p_(){let e=ih(),t=e.filter(e=>(e.estado||`activo`)===`activo`).length;return`
    <div class="cd-viewhead">
      <h1 id="coord-view-title" tabindex="-1">Clientes</h1>
      ${e.length?W(`${t} ${t===1?`activo`:`activos`}`,`ok`):``}
    </div>
    <div class="cd-toolbar">
      <label class="cd-search" for="coord-clientes-buscar">
        ${H(`search`)}<span class="coord-sr-only">Buscar cliente</span>
        <input id="coord-clientes-buscar" type="search" value="${I(rh)}" data-coord-clientes-buscar placeholder="Tutor, perro o barrio" autocomplete="off" aria-controls="coord-clientes-lista" />
      </label>
      ${U(`Nuevo`,`id="coord-cliente-new" data-coord-cliente-new`,`primary`,`plus`)}
    </div>
    <div id="coord-clientes-lista" aria-live="polite">${f_()}</div>
  `}function m_(){let e=Yh(`cliente`),t=!!e.id,n=Array.isArray(e.perros)?e.perros:[],r=Array.isArray(e.dias)?e.dias:[],i=(Array.isArray(e.archivos)?e.archivos:[]).map(e=>jh(e)||{id:e,tipo:Eh}),a=x.slice().sort((e,t)=>Number(n.includes(t.id))-Number(n.includes(e.id))||e.name.localeCompare(t.name,`es`)),o=lh();return`
    <form class="cd-form" id="coord-cliente-form" data-coord-form="cliente" novalidate>
      <div class="cd-subhead">
        <button type="button" class="cd-back" data-coord-cliente-cancel>${H(`arrowLeft`)}<span>Clientes</span></button>
        <h1 id="coord-view-title" tabindex="-1">${t?I(e.nombre||`Editar`):`Cliente nuevo`}</h1>
      </div>
      ${e.pedidoId?`<p class="cd-note">${H(`clipboardCheck`)}<span>Con datos del pedido. Revisalo.</span></p>`:``}
      ${!t&&i.length?`<p class="cd-done">${H(`fileCheck`)}<span>${i.some(Mh)?`El carnet del pedido queda vinculado.`:`Los archivos del pedido quedan vinculados.`}</span></p>`:``}
      <input type="hidden" name="id" value="${I(e.id||``)}" />
      <input type="hidden" name="pedidoId" value="${I(e.pedidoId||``)}" />
      ${yg(`cliente`,`nombre`,`Tutor`,{value:e.nombre,required:!0,attrs:`autocomplete="off"`})}
      ${yg(`cliente`,`telefono`,`Celular`,{value:e.telefono,type:`tel`,attrs:`autocomplete="off" inputmode="tel" placeholder="11 1234-5678"`})}
      <div class="coord-field">
        <label for="coord-cliente-barrio">Barrio</label>
        <input id="coord-cliente-barrio" name="barrio" type="text" value="${I(e.barrio||``)}" list="coord-barrios" autocomplete="off" />
        ${Sg(`coord-cliente-barrio`,o.slice(0,6).map(e=>[e,e]),e.barrio)}
      </div>
      <div class="coord-field">
        <span class="coord-label" id="coord-cliente-perros-label">Perros${n.length?` (${n.length})`:``}</span>
        <label class="cd-search is-small" for="coord-cliente-perros-buscar">
          ${H(`search`)}<span class="coord-sr-only">Filtrar perros</span>
          <input id="coord-cliente-perros-buscar" type="search" data-coord-filter-perros placeholder="Buscar perro" autocomplete="off" />
        </label>
        <div class="cd-pick-grid" role="group" aria-labelledby="coord-cliente-perros-label">
          ${a.map(e=>`
            <label class="cd-pick-dog" data-name="${I(L(e.name))}">
              <input type="checkbox" id="coord-cliente-perro-${e.id}" name="perros" value="${e.id}" ${n.includes(e.id)?`checked`:``} />
              ${mg(e,e.name,`md`)}
              <span>${I(e.name)}</span>
              <span class="cd-pick-check" aria-hidden="true">${H(`check`)}</span>
            </label>`).join(``)}
        </div>
      </div>
      ${wg(`cli-mas`,`${H(`menu`)}<b>Más datos</b>`,`
        ${bg(`cliente`,`plan`,`Plan`,eh,{value:e.plan||`Pendiente de confirmar`})}
        ${bg(`cliente`,`turno`,`Turno`,th,{value:e.turno||`Pendiente de confirmar`})}
        ${bg(`cliente`,`estado`,`Estado`,$m,{value:e.estado||`activo`})}
        ${Cg(`cliente`,r)}
        ${xg(`cliente`,`notas`,`Notas`,{value:e.notas,placeholder:`Llaves, portería, horarios`,hint:`Sin salud ni pagos.`})}
      `)}
      <datalist id="coord-barrios">${o.map(e=>`<option value="${I(e)}"></option>`).join(``)}</datalist>
      <div class="cd-savebar is-row">
        ${U(`Cancelar`,`data-coord-cliente-cancel`,`ghost`)}
        <button type="button" class="coord-btn is-primary is-big" id="coord-cliente-save" data-coord-cliente-save>${H(`checkCircle`)}<span>Guardar</span></button>
      </div>
    </form>
  `}function h_(e,t){return`
    <div class="cd-subhead">
      <button type="button" class="cd-back" data-coord-go="mas">${H(`arrowLeft`)}<span>Más</span></button>
      <h1 id="coord-view-title" tabindex="-1">${e}${t?` <span class="cd-count">${t}</span>`:``}</h1>
    </div>
  `}function g_(){let e=ng().sub;if(e)return{cambios:c_,pedidos:w_,avisos:b_,fichas:L_,datos:D_,docs:k_,incidentes:U_}[e]();let t=gh().filter(e=>hh(e)!==`resuelto`).length,n=x.filter(e=>e.status===`Activo`).filter(e=>!Vh(e)).length,r=op(6),i=Fp(`incidentes`).filter(e=>!e.fecha||e.fecha>=r).length;return`
    <div class="cd-viewhead"><h1 id="coord-view-title" tabindex="-1">Más</h1></div>
    <div class="cd-menu">
      ${[[`cambios`,`bell`,`Cambios`,Ym().length,`alert`],[`pedidos`,`clipboardCheck`,`Pedidos`,t,`warn`],[`avisos`,`mapPin`,`Avisos`,sh().length,`warn`],[`fichas`,`userPlus`,`Fichas`,0,`neutral`],[`datos`,`help`,`Datos a confirmar`,xh().length,`warn`],[`docs`,`fileText`,`Documentos`,n,`warn`],[`incidentes`,`activity`,`Incidentes`,i,`alert`]].map(([e,t,n,r,i])=>`
        <button type="button" class="cd-menu-btn" id="coord-mas-${e}" data-coord-go="mas:${e}">
          ${H(t)}<span>${n}</span>${r?`<b class="cd-menu-n is-${i}">${r}</b>`:``}
        </button>`).join(``)}
    </div>
    ${wg(`mas-fuentes`,`${H(`help`)}<b>Fuentes</b>`,`<p class="cd-foot">Rutas: ${I(Tn.officialSources.routes)} (${wn}). Perros: ${I(Tn.officialSources.dogs)}. Carnets y documentos: privados.</p>`)}
  `}function __(e){return e===`seguridad`||e===`perro suelto`?`alert`:e===`clima`||e===`cambio de horario`?`info`:`warn`}function v_(e,{history:t=!1}={}){let n=I(e.id);return`
    <li class="cd-card cd-aviso ${t?`is-old`:``}">
      <p class="cd-chips">${W(I(e.tipo||`otro`),__(e.tipo),`alertTriangle`)}${W(I(e.barrio||`Sin barrio`),`neutral`,`mapPin`)}${W(`${t?`Venció`:`Hasta`} ${I(ep(np(e.vigenteHasta)?e.vigenteHasta:e.fecha).slice(0,5))}`,t?`neutral`:`info`)}</p>
      <p class="cd-aviso-msg">${I(e.mensaje||e.titulo||``)}</p>
      ${qp(e)}
      <div class="cd-actions">
        ${U(`Copiar`,`data-coord-aviso-copy="${n}" aria-label="Copiar aviso de ${I(e.barrio||`barrio`)} para WhatsApp"`,`ghost`,`copy`)}
        ${t?``:U(`Terminó`,`id="coord-aviso-fin-${n}" data-coord-aviso-fin="${n}"`,`ghost`,`checkCircle`)}
      </div>
    </li>
  `}function y_(){let e=Yh(`aviso`),t=v(),n=nh.includes(e.tipo)?e.tipo:nh[0],r=e.vigenteHasta||t;return`
    <form class="cd-card cd-form is-inline" id="coord-aviso-form" data-coord-form="aviso" novalidate>
      <div class="coord-field">
        <span class="coord-label" id="coord-aviso-tipo-label">Tipo</span>
        <div class="cd-chiprow" role="radiogroup" aria-labelledby="coord-aviso-tipo-label">
          ${nh.map(e=>`<label class="cd-pill is-check"><input type="radio" name="tipo" value="${I(e)}" ${e===n?`checked`:``} /><span>${I(e[0].toUpperCase()+e.slice(1))}</span></label>`).join(``)}
        </div>
      </div>
      <div class="coord-field">
        <label for="coord-aviso-barrio">Barrio <span class="coord-required">*<span class="coord-sr-only"> obligatorio</span></span></label>
        <input id="coord-aviso-barrio" name="barrio" type="text" value="${I(e.barrio||``)}" list="coord-barrios-aviso" autocomplete="off" />
        ${Sg(`coord-aviso-barrio`,lh().slice(0,6).map(e=>[e,e]),e.barrio)}
      </div>
      ${xg(`aviso`,`mensaje`,`Qué pasa`,{value:e.mensaje,required:!0,placeholder:`Ej.: corte en la entrada, usar la puerta 2`})}
      <div class="coord-field">
        <label for="coord-aviso-vigenteHasta">Hasta</label>
        <input id="coord-aviso-vigenteHasta" name="vigenteHasta" type="date" value="${I(r)}" min="${t}" />
        ${Sg(`coord-aviso-vigenteHasta`,[[t,`Hoy`],[rp(t,1),`Mañana`],[rp(t,7),`7 días`]],r)}
      </div>
      <datalist id="coord-barrios-aviso">${lh().map(e=>`<option value="${I(e)}"></option>`).join(``)}</datalist>
      <div class="cd-actions is-split">
        <button type="button" class="coord-btn is-primary" id="coord-aviso-save" data-coord-aviso-save>${H(`send`)}<span>Avisar</span></button>
        ${U(`Cancelar`,`data-coord-aviso-cancel`,`ghost`)}
      </div>
    </form>
  `}function b_(){let e=v(),t=ah(),n=t.filter(t=>oh(t,e)),r=t.filter(t=>!oh(t,e)).slice(0,20);return`
    ${h_(`Avisos`,n.length)}
    ${og?y_():U(`Nuevo aviso`,`id="coord-aviso-new" data-coord-aviso-new`,`primary`,`plus`)}
    ${n.length?ch(n).map(([e,t])=>`
        <section class="cd-sec" aria-label="Avisos en ${I(e)}">
          <h2 class="cd-h2">${H(`mapPin`)}<span>${I(e)}</span> <span class="cd-count">${t.length}</span></h2>
          <ul class="cd-list">${t.map(e=>v_(e)).join(``)}</ul>
        </section>`).join(``):Dg(Ip.has(`avisos`)?`Sin avisos vigentes.`:`Cargando…`,Ip.has(`avisos`)?`checkCircle`:`clock`)}
    ${r.length?wg(`avisosViejos`,`Vencidos (${r.length})`,`<ul class="cd-list">${r.map(e=>v_(e,{history:!0})).join(``)}</ul>`):``}
  `}function x_(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return vg([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function S_(e,t,n){let r=hh(e),i=e.origen===`web`,a=e.datos||{},o=I(e.id),s=t.get(e.id),c=n.get(e.id),l=i?a.perro:yh(e),u=wp.get(L(l))||null,d=a.mordida&&a.mordida!==`No`,f=Lh(e).some(Mh),p={nuevo:U(`Empezar`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`,`play`),"en-curso":U(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`secondary`,`checkCircle`),resuelto:U(`Reabrir`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`ghost`)}[r],ee=(i||/evaluaci/i.test(e.tipo||``))&&!s&&r!==`resuelto`,m=a.responsable?`Hola ${a.responsable}`:`Hola`,h=f?``:` Cuando puedas, mandanos una foto del carnet de vacunas.`;return`
    <li class="cd-card cd-pedido ${i?`is-web`:``}" id="coord-pedido-${o}" tabindex="-1">
      <div class="cd-row">
        ${mg(u,l||e.tipo,`md`)}
        <div class="cd-row-main">
          <strong>${I(l||e.tipo||`Pedido`)}</strong>
          <small>${I([e.tipo||(i?`Formulario web`:``),ep(e.fecha).slice(0,5),a.canal].filter(Boolean).join(` · `))}</small>
        </div>
        ${i?W(`Web`,`info`):``}
      </div>
      <p class="cd-chips">
        ${W(mh[r],r===`nuevo`?`neutral`:r===`en-curso`?`info`:`ok`)}
        ${d?W(`Mordió`,`alert`,`alertTriangle`):``}
        ${a.perros===`No`?W(`No con perros`,`warn`):``}
        ${i&&r!==`resuelto`?f?W(`Carnet`,`ok`,`check`):W(`Sin carnet`,`warn`):``}
        ${s?W(`Ficha`,`ok`,`check`):``}
        ${c?W(`Cliente`,`ok`,`check`):``}
      </p>
      ${i?`<p class="cd-line">${I([a.responsable,[a.zona,a.referencia].filter(Boolean).join(` · `)].filter(Boolean).join(` · `)||`Pendiente de confirmar`)}</p>`:e.detalle?`<p class="cd-line">${I(e.detalle)}</p>`:``}
      <div class="cd-actions is-split">
        ${r!==`resuelto`&&i?Ch(a.telefono,`${m}, te escribo de Paseos Juan por el pedido de evaluación de ${a.perro||`tu perro`}.${h}`,`whatsapp`,`WhatsApp`):``}
        ${p}
      </div>
      ${Tg(`pedido-${e.id}`,`Más`,`
        ${i?x_(e):``}
        ${kg(e)}
        ${qp(e,{web:i})}
        <div class="cd-actions">
          ${!c&&(i||a.responsable)?U(`Hacer cliente`,`data-coord-pedido-cliente="${o}"`,`ghost`,`userPlus`):``}
          ${ee?U(`Hacer ficha`,`data-coord-pedido-ficha="${o}"`,`ghost`,`fileText`):``}
          ${r===`en-curso`?U(`A nuevo`,`data-coord-pedido-move="${o}" data-estado="nuevo"`,`ghost`):``}
          ${r===`nuevo`?U(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`ghost`,`checkCircle`):``}
          ${r===`resuelto`&&Kp(e)?U(`Borrar`,`data-coord-pedido-delete="${o}"`,`danger`,`trash`):``}
        </div>
      `)}
    </li>
  `}function C_(){let e=Yh(`pedido`);return`
    <form class="cd-card cd-form is-inline" data-coord-form="pedido" novalidate>
      ${bg(`pedido`,`tipo`,`Tipo`,dh,{value:e.tipo})}
      ${yg(`pedido`,`perro`,`Perro`,{value:e.perro,placeholder:`Nombre o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
      <div class="coord-field">
        <span class="coord-label" id="coord-pedido-canal-label">Llegó por</span>
        <div class="cd-chiprow" role="radiogroup" aria-labelledby="coord-pedido-canal-label">
          ${fh.map(t=>`<label class="cd-pill is-check"><input type="radio" name="canal" value="${I(t)}" ${t===(e.canal||fh[0])?`checked`:``} /><span>${I(t)}</span></label>`).join(``)}
        </div>
      </div>
      ${xg(`pedido`,`detalle`,`Qué resolver`,{value:e.detalle,hint:`Sin teléfonos ni domicilios.`})}
      <datalist id="coord-dog-names">${x.map(e=>`<option value="${I(e.name)}"></option>`).join(``)}</datalist>
      <div class="cd-actions is-split">
        ${U(`Guardar`,`data-coord-pedido-save`,`primary`,`checkCircle`)}
        ${U(`Cancelar`,`data-coord-pedido-cancel`,`ghost`)}
      </div>
    </form>
  `}function w_(){let e=gh(),t=new Map(_h().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),n=new Map(ih().filter(e=>e.pedidoId).map(e=>[e.pedidoId,e])),r=ph.some(([e])=>e===lg)?lg:`nuevo`,i=e.filter(e=>hh(e)===r);r===`nuevo`&&i.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`));let a=!Ip.has(`pedidos`)&&!e.length;return`
    ${h_(`Pedidos`,e.filter(e=>hh(e)!==`resuelto`).length)}
    <div class="cd-seg is-3" role="group" aria-label="Estado">
      ${ph.map(([t,n])=>{let i=e.filter(e=>hh(e)===t).length;return`<button type="button" class="cd-seg-btn" id="coord-pedidos-${t}" data-coord-pedidos-filtro="${t}" aria-pressed="${t===r}"><span>${n}</span><b>${i}</b></button>`}).join(``)}
    </div>
    ${i.length?`<ul class="cd-list is-grid">${i.map(e=>S_(e,t,n)).join(``)}</ul>`:Dg(a?`Cargando…`:r===`nuevo`?`Sin pedidos nuevos.`:r===`en-curso`?`Nada en curso.`:`Sin resueltos.`,a?`clock`:`checkCircle`)}
    ${sg?C_():U(`Cargar pedido`,`id="coord-pedido-new" data-coord-pedido-new`,`ghost`,`plus`)}
  `}function T_(e){let t=e.datos||{},n=wp.get(L(t.perro));return{pedidoId:e.id,nombre:t.responsable||``,telefono:t.telefono||``,barrio:[t.zona,t.referencia].filter(Boolean).join(` · `),perros:n?[n.id]:[],plan:y,dias:Th(t.dias),turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:y,estado:`activo`,archivos:Lh(e).map(e=>e.id),notas:[`Desde el pedido del ${ep(e.fecha)}.`,!n&&t.perro?`Perro: ${t.perro} (todavía sin ficha en el registro).`:``].filter(Boolean).join(` `)}}function E_(e,t){let n=t?t.actualizadoPorNombre||t.creadoPorNombre:``;return`
    <li class="cd-card cd-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="cd-row">
        ${mg(e,e.name,`md`)}
        <div class="cd-row-main">
          <strong>${I(e.name)}</strong>
          <small>${I(e.plan)} · ${I(e.size)}</small>
        </div>
        ${e.status===`Activo`?``:W(I(e.status),`alert`)}
      </div>
      <p class="cd-line">${H(`help`)}<span>${I(e.review||`Estado "${e.status}".`)}</span></p>
      <p class="cd-chips">${gg(e)}${_g(e)}</p>
      ${t?.nota?`<p class="cd-muted">${I(t.nota)}</p>`:``}
      <div class="cd-actions">
        ${t?`<p class="cd-done">${H(`checkCircle`)}<span>Resuelto${n?` · ${I(pg(n))}`:``}${t.pendiente?` · se envía con señal`:``}</span></p>${U(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:U(`Resuelto`,`id="coord-resolve-${e.id}" data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
        ${hg(e)}
      </div>
    </li>
  `}function D_(){let e=vh(),t=Tp.filter(t=>!e[t.id]),n=Tp.filter(t=>e[t.id]);return`
    ${h_(`Datos a confirmar`,t.length)}
    <p class="cd-muted">Confirmalo en la planilla.</p>
    ${t.length?`<ul class="cd-list is-grid">${t.map(e=>E_(e)).join(``)}</ul>`:Dg(`No quedan datos por confirmar.`)}
    ${n.length?wg(`datosResueltos`,`Resueltos (${n.length})`,`<ul class="cd-list is-grid">${n.map(t=>E_(t,e[t.id])).join(``)}</ul>`):``}
  `}function O_(e){return ih().find(t=>Array.isArray(t.perros)&&t.perros.includes(e))||null}function k_(){let e=x.filter(e=>e.status===`Activo`),t=e.filter(e=>!Vh(e)).sort((e,t)=>e.name.localeCompare(t.name,`es`)),n=Ip.has(`archivos`)&&Ip.has(`clientes`),r=Ah().slice(0,20);return`
    ${h_(`Documentos`)}
    <div class="cd-card cd-stat">
      <p class="cd-big">${H(`fileCheck`)}<span><b>${e.length-t.length} de ${e.length}</b> con carnet</span></p>
      <p class="cd-muted">Se sube en Clientes.</p>
    </div>
    ${n?t.length?`
      <h2 class="cd-h2">Sin carnet <span class="cd-count">${t.length}</span></h2>
      <ul class="cd-list cd-nocarnet">
        ${t.map(e=>{let t=O_(e.id);return`
            <li class="cd-card cd-row">
              ${mg(e,e.name,`md`)}
              <div class="cd-row-main"><strong>${I(e.name)}</strong><small>${I(fp(e))}</small></div>
              ${hg(e,{compact:!0})}
              ${t?U(`Cliente`,`data-coord-ver-cliente="${I(t.id)}" aria-label="Ver cliente de ${I(e.name)}"`,`ghost`,`users`):``}
            </li>`}).join(``)}
      </ul>`:Dg(`Todos los activos tienen carnet.`):Dg(`Cargando…`,`clock`)}
    ${r.length?wg(`docsRecientes`,`Últimos archivos (${r.length})`,`<ul class="coord-files">${r.map(e=>Og(e,`docs`)).join(``)}</ul>${Wh(`docs`)}`):``}
  `}var A_=[y,`Sí`,`No`],j_=null,M_=null,N_=!1,P_=!1;function F_(e){let t=e.pedidoId?K_(gh(),e.pedidoId):null,n=t?Lh(t).filter(Mh):[],r=`coord-alta-carnet-hint`,i=`Opcional. Se sube al guardar (con señal).`;return M_?i=`Ya subido (${I(M_.nombreArchivo||`archivo`)}).`:j_&&(i=`${I(j_.name)} (${Ph(j_.size)}). Se sube al guardar.`),`
    <div class="coord-field">
      <span class="coord-label">Carnet de vacunas</span>
      ${n.map(e=>`
        <p class="coord-attach-row">
          ${H(`fileCheck`)}
          <span><b>Carnet del pedido</b><small>Queda vinculado.</small></span>
          ${U(`Ver<span class="coord-sr-only"> carnet (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${I(e.id)}" data-scope="alta"`,`secondary`,`eye`)}
        </p>`).join(``)}
      ${M_?``:Ag(`coord-alta-carnet`,j_?`Cambiar`:n.length?`Otro carnet`:`Foto o PDF`,`data-coord-alta-carnet`,r)}
      <small id="${r}" class="cd-muted">${i}</small>
      ${j_&&Fh()?`<p class="coord-inline-alert">${H(`alertTriangle`)}<span>Sin señal: el carnet necesita señal.</span></p>`:``}
      ${j_||M_?U(`Quitar carnet`,`id="coord-alta-carnet-quitar" data-coord-alta-carnet-quitar`,`ghost`,`x`):``}
      ${Wh(`alta`)}
    </div>
  `}function I_(){let e=Yh(`alta`),t=Array.isArray(e.dias)?e.dias:[],n=[y,...kn.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`];return`
    <form class="cd-form" id="coord-alta-form" data-coord-form="alta" novalidate>
      <div class="cd-subhead">
        <button type="button" class="cd-back" data-coord-alta-close>${H(`arrowLeft`)}<span>Fichas</span></button>
        <h1 id="coord-view-title" tabindex="-1">Perro nuevo</h1>
      </div>
      <p class="cd-chips">${W(`SIN EVALUAR`,`neutral`)}${W(`1.er paseo individual`,`warn`,`shieldCheck`)}</p>
      ${e.pedidoId?`<p class="cd-note">${H(`clipboardCheck`)}<span>Con datos del pedido web. Revisalos.</span></p>`:``}
      ${yg(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
      <div class="coord-field">
        <span class="coord-label" id="coord-alta-tamano-label">Tamaño</span>
        <div class="cd-chiprow" role="radiogroup" aria-labelledby="coord-alta-tamano-label">
          ${[`Pequeño`,`Mediano`,`Grande`].map(t=>`<label class="cd-pill is-check"><input type="radio" name="tamano" value="${t}" ${e.tamano===t?`checked`:``} /><span>${t}</span></label>`).join(``)}
        </div>
      </div>
      ${yg(`alta`,`tutor`,`Tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
      ${yg(`alta`,`contacto`,`Celular del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off" inputmode="tel"`})}
      ${F_(e)}
      ${wg(`alta-mas`,`${H(`menu`)}<b>Más datos</b>`,`
        <fieldset>
          <legend>Perro</legend>
          ${yg(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${yg(`alta`,`edad`,`Edad`,{value:e.edad})}
          ${bg(`alta`,`sexo`,`Sexo`,[y,`Macho`,`Hembra`],{value:e.sexo})}
          ${bg(`alta`,`castrado`,`Castrado/a`,A_,{value:e.castrado})}
        </fieldset>
        <fieldset>
          <legend>Contacto</legend>
          ${yg(`alta`,`emergencia`,`Emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${bg(`alta`,`zona`,`Zona`,[y,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${yg(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </fieldset>
        <fieldset>
          <legend>Salud</legend>
          ${bg(`alta`,`vacunas`,`Vacunas al día`,A_,{value:e.vacunas})}
          ${yg(`alta`,`veterinario`,`Veterinaria`,{value:e.veterinario})}
          ${xg(`alta`,`salud`,`Alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor.`})}
        </fieldset>
        <fieldset>
          <legend>Equipo</legend>
          ${bg(`alta`,`sujecion`,`Collar o pechera`,[y,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${bg(`alta`,`bozal`,`Bozal`,A_,{value:e.bozal})}
          ${bg(`alta`,`correa`,`Correa propia`,A_,{value:e.correa})}
        </fieldset>
        <fieldset>
          <legend>Conducta observada</legend>
          ${e.relatoTutor?xg(`alta`,`relatoTutor`,`Lo que contó el tutor (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${xg(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros})}
          ${xg(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas})}
          ${xg(`alta`,`estimulos`,`Lo altera`,{value:e.estimulos,placeholder:`Ej.: motos, ruidos`})}
          ${yg(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </fieldset>
        <fieldset>
          <legend>Servicio</legend>
          ${bg(`alta`,`plan`,`Plan`,n,{value:e.plan})}
          ${bg(`alta`,`turno`,`Turno`,[y,`Mañana`,`Tarde`],{value:e.turno})}
          ${Cg(`alta`,t)}
        </fieldset>
      `,{open:!!e.pedidoId})}
      <datalist id="coord-dog-names">${x.map(e=>`<option value="${I(e.name)}"></option>`).join(``)}</datalist>
      ${N_?`<p class="coord-upload-status" role="status">${H(`clock`)}<span>Subiendo el carnet…</span></p>`:``}
      ${P_?`
        <div class="cd-confirm" role="group" aria-labelledby="coord-alta-vaciar-q">
          <p id="coord-alta-vaciar-q"><b>¿Vaciar la ficha?</b> Se borra lo escrito.</p>
          <div class="cd-actions is-split">
            ${U(`Vaciar`,`id="coord-alta-vaciar-ok" data-coord-alta-clear-ok`,`danger`,`trash`)}
            ${U(`No`,`id="coord-alta-vaciar-cancel" data-coord-alta-clear-cancel`,`secondary`)}
          </div>
        </div>`:``}
      <div class="cd-savebar is-row">
        ${U(`Vaciar`,`id="coord-alta-clear" data-coord-alta-clear`,`ghost`,`trash`)}
        <button type="button" class="coord-btn is-primary is-big" id="coord-alta-save" data-coord-alta-save ${N_?`aria-disabled="true"`:``}>${H(`checkCircle`)}<span>${N_?`Guardando…`:`Guardar`}</span></button>
      </div>
    </form>
  `}function L_(){let e=_h();return`
    ${h_(`Fichas`,e.length)}
    ${U(`Perro nuevo`,`id="coord-alta-new" data-coord-alta-new`,`primary`,`plus`)}
    ${e.length?`
      <ul class="cd-list is-grid">
        ${e.map(e=>{let t=e.datos||{},n=Array.isArray(t.dias)?t.dias:[],r=[...new Set([e.carnet?.id,...Array.isArray(e.archivos)?e.archivos:[]].filter(Boolean))].map(e=>jh(e)).find(Mh)||(e.carnet?.id?{id:e.carnet.id}:null),i=`ficha-${e.id}`,a=e.perroNombre||t.nombre||`Pendiente de confirmar`;return`
            <li class="cd-card">
              <div class="cd-row">
                ${mg(wp.get(L(a)),a,`md`)}
                <div class="cd-row-main"><strong>${I(a)}</strong><small>Alta ${I(ep(e.fecha))}</small></div>
              </div>
              <p class="cd-chips">${W(I(e.categoria||`SIN EVALUAR`),`neutral`)}${W(`1.er paseo individual`,`warn`)}${r?W(`Carnet`,`ok`,`check`):W(`Sin carnet`,`warn`)}</p>
              <p class="cd-line">${I(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño ?`:t.tamano)} · ${n.length?I(dp(n)):`Días ?`} · ${I(!t.turno||t.turno===`Pendiente de confirmar`?`Turno ?`:t.turno)}</p>
              ${Wh(i)}
              ${qp(e)}
              <div class="cd-actions">
                ${r?U(`Carnet<span class="coord-sr-only"> (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${I(r.id)}" data-scope="${I(i)}"`,`secondary`,`eye`):``}
                ${U(`Copiar`,`data-coord-alta-copy="${I(e.id)}"`,`ghost`,`copy`)}
                ${Kp(e)?U(`Borrar`,`data-coord-alta-delete="${I(e.id)}"`,`danger`,`trash`):``}
              </div>
            </li>`}).join(``)}
      </ul>`:Dg(Ip.has(`fichas`)?`Todavía no hay fichas.`:`Cargando…`,Ip.has(`fichas`)?`userPlus`:`clock`)}
  `}function R_(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${ep(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):y}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function z_(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>L(t.zona)===L(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:``,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:y,dias:Th(t.dias)}}function B_(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>Cp.get(e)?.name||e);return t.length?lp(t):``}function V_(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||Gp(e,t)}function H_(e,t){let n=B_(e),r=e.perroId||(Array.isArray(e.perros)?e.perros[0]:``),i=r&&Cp.get(r)||wp.get(L(n))||null,a=e.titulo||(t===`incidente`?`Incidente`:`Observación`),o=e.riesgo?String(e.riesgo):``,s=t===`incidente`?[[`Lugar`,[e.lugar,e.barrio].filter(Boolean).join(` · `)],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]],c=`act-${e.id||a}`;return`
    <li class="cd-card ${t===`incidente`?`is-incident`:``}">
      <div class="cd-row">
        ${mg(i,n||a,`md`)}
        <div class="cd-row-main"><strong>${I(n||a)}</strong><small>${I(ep(e.fecha).slice(0,5))}${e.hora?` · ${I(e.hora)}`:``}</small></div>
      </div>
      <p class="cd-chips">${W(t===`incidente`?`Incidente`:`Observación`,t===`incidente`?`alert`:`info`)}${o?W(`Riesgo ${I(o)}`,/alto|grave/i.test(o)?`alert`:`warn`):``}</p>
      ${n&&e.titulo?`<p class="cd-line">${I(e.titulo)}</p>`:``}
      ${Tg(c,`Detalle`,`${vg(s)}${qp(e)}`)}
    </li>
  `}function U_(){let e=op(6),t=Fp(`incidentes`).filter(t=>!t.fecha||t.fecha>=e).sort(V_),n=Fp(`observaciones`).filter(t=>!t.fecha||t.fecha>=e).sort(V_);return`
    ${h_(`Incidentes`,t.length)}
    <p class="cd-muted">Últimos 7 días.</p>
    ${t.length?`<ul class="cd-list is-grid">${t.map(e=>H_(e,`incidente`)).join(``)}</ul>`:Dg(Ip.has(`incidentes`)?`Sin incidentes.`:`Cargando…`,Ip.has(`incidentes`)?`checkCircle`:`clock`)}
    ${wg(`observaciones`,`Observaciones (${n.length})`,n.length?`<ul class="cd-list is-grid">${n.map(e=>H_(e,`observacion`)).join(``)}</ul>`:`<p class="cd-muted">${Ip.has(`observaciones`)?`Sin observaciones.`:`Cargando…`}</p>`)}
  `}async function W_(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function G_(e,t,n){W_(e).then(e=>{F(e?n:`No se pudo copiar. Probá de nuevo.`,{tone:e?`ok`:`error`}),z()})}function K_(e,t){return e.find(e=>e.id===t)}function q_(e=`coord-view-title`){$(),ig(e)}async function J_(){let e=Gm();if(e){F(e[0],{tone:`error`}),$(),R(e[1]);return}let t=Wm(),n=B,r,i=``;if(n.destino===`semana`)r=await Yp(`plantillas`,{id:dm(t.ruta,t.dia),...t},{ok:`${t.ruta}: guardada para todos los ${t.dia.toLowerCase()}.`}),r&&n.modo===`dia`&&n.existeDia&&await _.save(`rutas`,{id:fm(n.fecha,t.ruta),fecha:n.fecha,...t,dia:ip(n.fecha),basadaEn:n.plantillaId||``}).catch(()=>{}),i=n.modo===`dia`?n.fecha:``;else{if(i=Hm(),!np(i)){F(`Elegí el día.`,{tone:`error`}),$(),R(`coord-ed-solodia`);return}r=await Yp(`rutas`,{id:fm(i,t.ruta),fecha:i,...t,dia:ip(i),basadaEn:n.plantillaId||``},{ok:`${t.ruta}: guardada solo para el ${Yg(i)}. La semana no cambió.`})}if(r&&n.solicitudId){let e=Jm().find(e=>e.id===n.solicitudId);await Yp(`solicitudes`,{id:n.solicitudId,fecha:np(e?.fecha)?e.fecha:i||v(),estado:`aplicado`,respuesta:n.respuesta.trim()||`Aplicado en ${t.ruta}${i?` del ${ep(i)}`:` (toda la semana)`}.`},{ok:`Cambio aplicado. El supervisor ya lo ve.`})}r&&B===n&&(i&&(jm=i),ng().tab===`rutas`&&Pm(n.destino===`semana`&&n.modo===`plantilla`?`semana`:`dia`),Rm(),$(),ig())}async function Y_(e){let t=V,n=e.id,r=(Array.isArray(e.perros)?e.perros:[]).filter(e=>Cp.has(e)),i=(e,n,r=!1)=>{t.error=e,t.errorSenal=r,Qf(e),$(),R(n)};if(!t.file)return i(`Elegí la foto o el PDF.`,`coord-subida-archivo-${n}`);if(t.tipo===Eh&&r.length>1&&!t.perroId)return i(`Elegí de qué perro es el carnet.`,`coord-subida-perro-${n}`);if(Fh())return i(`Sin señal: tocá «Subir» cuando vuelva.`,`coord-subida-ok-${n}`,!0);t.estado=`subiendo`,t.error=``,Zf(`Subiendo el archivo.`),z();let a=Cp.get(t.perroId)||null;try{let r=await ht.subir(t.tipo,t.file,{perroId:a?.id||``,perroNombre:a?.name||``,clienteId:n,nota:t.nota.trim()}),i=K_(ih(),n)||e,o=[...new Set([...Array.isArray(i.archivos)?i.archivos:[],r.id])];await _.save(`clientes`,{id:n,archivos:o}).catch(()=>{}),V===t&&(V=null);let s=r.tipo===Eh?`Carnet`:`Documento`;Uh(`cliente-${n}`,`${s}${a?` de ${a.name}`:``} guardado${r.ubicacion===`drive`?` en Drive`:``}.`)}catch(e){t.estado=``,t.error=Ih(e,`subir`),t.errorSenal=/^Sin señal/.test(t.error),Qf(t.error)}finally{z(),R(V===t?`coord-subida-ok-${n}`:`coord-subir-${n}`)}}async function X_(e,t){let n=Cp.get(e);if(n&&t){if(Fh())F(`Sin señal: la foto necesita señal.`,{tone:`error`}),z();else{ug.add(e),Zf(`Subiendo la foto de ${n.name}.`),z();try{await _t.subir(e,n.name,t),F(`Foto de ${n.name} guardada.`)}catch(e){F(`La foto no se subió: ${Ih(e,`subir`)}`,{tone:`error`})}finally{ug.delete(e),z()}}}}function Z_(e,t,n,r,i=`Listo, quedó como estaba.`){return Yp(e,t,{ok:r,undo:()=>Zp(`undo-${e}-${t.id}`,()=>Yp(e,n,{ok:i}))})}function Q_(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target,n=t.closest(`[data-coord-toggle]`);if(n){let e=n.parentElement;return mp(n.dataset.coordToggle,!e.open),!0}let r=t.closest(`[data-coord-mem-toggle]`);if(r){let e=r.dataset.coordMemToggle;return r.parentElement.open?hp.delete(e):hp.add(e),!0}if(t.closest(`[data-coord-toast-undo]`)){let e=qf?.undo;return qf=null,window.clearTimeout(Jf),e&&e(),z(),!0}if(t.closest(`[data-coord-toast-x]`))return qf=null,window.clearTimeout(Jf),z(),!0;if(t.closest(`[data-coord-retry]`))return Up(),Qp=!1,Zf(`Volviendo a pedir los datos.`),!0;let i=t.closest(`[data-coord-go]`);if(i){let e=i.dataset.coordGo;return rg(e),ag=!1,og=!1,sg=!1,cg=!1,P_=!1,qm=``,$(),ig(),!0}let a=t.closest(`[data-coord-go-rutas]`);if(a)return rg(`rutas`),Pm(a.dataset.coordGoRutas),$(),ig(),!0;let o=t.closest(`[data-coord-set-field]`);if(o){let e=document.getElementById(o.dataset.coordSetField);if(e){e.value=o.dataset.value;let t=e.closest(`[data-coord-form]`);t&&Xh(t.dataset.coordForm,Qh(t)),(o.closest(`.cd-chiprow`)?.querySelectorAll(`.cd-pill`)||[]).forEach(e=>e.setAttribute(`aria-pressed`,String(e===o))),Zf(`${o.textContent.trim()} elegido.`)}return!0}if(t.matches?.(`input.cd-hora`)){try{t.showPicker?.()}catch{}return!0}let s=t.closest(`[data-coord-archivo-abrir]`);if(s)return Gh(s.dataset.coordArchivoAbrir,s.dataset.scope||``),!0;let c=t.closest(`[data-coord-subir]`);if(c){let e=K_(ih(),c.dataset.coordSubir);if(e){if(V?.estado===`subiendo`)return Qf(`Esperá a que termine la subida en curso.`),!0;Kh(e),hp.add(`cli-${e.id}`),$(),R(`coord-subida-tipo-${e.id}-carnet`)}return!0}let l=t.closest(`[data-coord-subida-set]`);if(l&&V)return V[l.dataset.coordSubidaSet]=l.dataset.value,V.error=``,$(),R(l.id),!0;let u=t.closest(`[data-coord-subida-cancel]`);if(u){if(V?.estado===`subiendo`)return Qf(`La subida está en curso: esperá a que termine.`),!0;let e=u.dataset.coordSubidaCancel;return V=null,$(),R(`coord-subir-${e}`),!0}let d=t.closest(`[data-coord-subida-ok]`);if(d){let e=K_(ih(),d.dataset.coordSubidaOk);return e&&V?.clienteId===e.id&&Zp(`subida-${e.id}`,()=>Y_(e)),!0}if(t.closest(`[data-coord-filtro-carnet]`))return Mm=!Mm,Zf(Mm?`Solo perros sin carnet.`:`Todos los perros.`),$(),R(`coord-filtro-carnet`),!0;let f=t.closest(`[data-coord-vista]`);if(f)return Pm(f.dataset.coordVista),$(),R(`coord-vista-${f.dataset.coordVista}`),!0;let p=t.closest(`[data-coord-ver-dia]`);if(p)return jm=p.dataset.coordVerDia,Pm(`dia`),ng().tab!==`rutas`&&rg(`rutas`),$(),R(p.id||`coord-view-title`),!0;if(t.closest(`[data-coord-carga]`))return km=!0,$(),R(`coord-carga-ok`),!0;if(t.closest(`[data-coord-carga-cancel]`))return km=!1,$(),R(`coord-carga`),!0;if(t.closest(`[data-coord-carga-ok]`))return Zp(`carga`,async()=>{let e=Wn(),t=0,n=0,r=``;for(let i of e){Am=`Guardando ${t+1} de ${e.length}…`,z();try{let e=await _.save(`plantillas`,i);t+=1,e.pendiente&&(n+=1)}catch(e){r=e.message}}km=!1,Am=``,r?F(`Se guardaron ${t} de ${e.length} rutas. Error: ${r}`,{tone:`error`}):F(`Listo: ${t} rutas cargadas.${n?` Se envían con señal.`:``}`),Pm(`dia`),z()}),!0;let ee=t.closest(`[data-coord-edit-plantilla]`);if(ee){let e=K_(pm(),ee.dataset.coordEditPlantilla);return e&&(Lm(e,{modo:`plantilla`}),q_()),!0}let m=t.closest(`[data-coord-new-route]`);if(m){let{dia:e,turno:t}=m.dataset;return Lm({ruta:zm(hm(e),t),dia:e,turno:t,paradas:[],supervisor:``},{modo:`plantilla`,nuevo:!0}),q_(`coord-ed-ruta`),!0}let h=t.closest(`[data-coord-edit-dia]`);if(h){let e=h.dataset.fecha,t=gm(e).find(e=>e.ruta===h.dataset.coordEditDia);return t&&(Lm(t,{modo:`dia`,fecha:e}),q_()),!0}let te=t.closest(`[data-coord-new-dia]`);if(te){let{fecha:e,turno:t}=te.dataset;return Lm({ruta:zm(gm(e),t),dia:ip(e),turno:t,paradas:[]},{modo:`dia`,fecha:e,nuevo:!0}),q_(`coord-ed-ruta`),!0}let ne=t.closest(`[data-coord-copy-ruta]`);if(ne){let e=ne.dataset.fecha,t=gm(e).find(e=>e.ruta===ne.dataset.coordCopyRuta);return t&&G_(Tm(t,{fecha:e}),`rutas`,`${t.ruta} copiada. Pegala en WhatsApp.`),!0}let re=t.closest(`[data-coord-copy-dia]`);if(re){let e=re.dataset.coordCopyDia;return G_(gm(e).map(t=>Tm(t,{fecha:e})).join(`

`),`rutas`,`Rutas del ${Yg(e)} copiadas.`),!0}if(B){if(t.closest(`[data-coord-ed-picker]`))return B.picker=!0,B.agregados=0,Em=``,Dm=``,q_(`coord-view-title`),!0;if(t.closest(`[data-coord-ed-picker-close]`))return B.picker=!1,Em=``,Dm=``,$(),R(`coord-ed-picker`),!0;let e=t.closest(`[data-coord-add-dog]`);if(e){let t=Cp.get(e.dataset.coordAddDog);if(t){Vm(t,``,{keepQuery:!0}),B.agregados+=1;let e=B.paradas[B.paradas.length-1].hora,n=B,r=B.paradas.length-1;F(`${t.name} agregado a las ${e}.`,{local:!0,undo:()=>{B===n&&n.paradas[r]?.perroId===t.id&&(n.paradas.splice(r,1),n.agregados=Math.max(0,n.agregados-1),Zf(`${t.name} quitado.`))}}),$(),R(`coord-add-${t.id}`)}return!0}if(t.closest(`[data-coord-add-libre]`)){let e=Em.trim();return e&&(Vm(null,e),B.agregados+=1,F(`${e} agregado (sin ficha).`),$(),R(`coord-ed-buscar`)),!0}let n=t.closest(`[data-coord-ed-set]`);if(n)return B[n.dataset.coordEdSet]=n.dataset.value,B.sucio=!0,$(),R(n.id),!0;let r=t.closest(`[data-coord-ed-destino]`);if(r)return B.destino=r.dataset.coordEdDestino===`semana`?`semana`:`dia`,Zf(B.destino===`semana`?`Se guarda para toda la semana.`:`Se guarda solo para un día.`),$(),R(r.id),!0;let i=t.closest(`[data-coord-stop-min]`);if(i){let e=B.paradas[Number(i.dataset.coordStopMin)];return e&&(e.minutos=Number(i.dataset.value)||45,B.sucio=!0,$(),R(i.id)),!0}let a=t.closest(`[data-coord-stop-up]`),o=t.closest(`[data-coord-stop-down]`);if(a||o){let e=Number((a||o).dataset[a?`coordStopUp`:`coordStopDown`]),t=a?e-1:e+1;if(t>=0&&t<B.paradas.length){[B.paradas[e],B.paradas[t]]=[B.paradas[t],B.paradas[e]],B.sucio=!0,$();let n=document.getElementById(`coord-ed-${a?`up`:`down`}-${t}`);R(n&&!n.disabled?n.id:`coord-ed-hora-${t}`),Zf(`${B.paradas[t].perroNombre} ahora es el ${t+1}.`)}return!0}let s=t.closest(`[data-coord-stop-del]`);if(s){let e=Number(s.dataset.coordStopDel),[t]=B.paradas.splice(e,1);B.sucio=!0;let n=B;return F(`${t?.perroNombre||`Perro`} quitado.`,{local:!0,undo:()=>{B===n&&t&&(n.paradas.splice(Math.min(e,n.paradas.length),0,t),Zf(`${t.perroNombre} volvió a la ruta.`))}}),$(),R(B.paradas.length?`coord-ed-del-${Math.min(e,B.paradas.length-1)}`:`coord-ed-picker`),!0}if(t.closest(`[data-coord-ed-sort]`))return Um(),Zf(`Ordenados por hora.`),$(),R(`coord-ed-sort`),!0;if(t.closest(`[data-coord-ed-save]`))return B.picker&&(B.picker=!1,Em=``,Dm=``),Zp(`editor-save`,()=>J_()),!0;if(t.closest(`[data-coord-ed-revert]`)){let e=B.existeDia;return Zp(`editor-revert`,async()=>{await Xp(`rutas`,e,{ok:`${e.ruta} del ${Yg(e.fecha)}: igual que la semana.`})&&(Rm(),z(),ig())}),!0}if(t.closest(`[data-coord-ed-copy]`))return G_(Tm(Wm(),B.modo===`dia`?{fecha:B.fecha}:{}),`editor`,`Ruta copiada. Pegala en WhatsApp.`),!0;if(t.closest(`[data-coord-ed-close]`))return B.sucio?(Om=`salir`,$(),ig(`coord-ed-close-cancel`)):(Rm(),$(),ig()),!0;if(t.closest(`[data-coord-ed-close-ok]`))return Rm(),$(),ig(),!0;if(t.closest(`[data-coord-ed-close-cancel]`))return Om=``,$(),R(`coord-ed-close`),!0}let ie=t.closest(`[data-coord-sol-aplicar]`);if(ie){let e=K_(Jm(),ie.dataset.coordSolAplicar);return e&&(Qm(e),q_()),!0}let ae=t.closest(`[data-coord-sol-rechazar]`);if(ae)return qm=ae.dataset.coordSolRechazar,$(),R(`coord-rapido-${qm}-0`),!0;if(t.closest(`[data-coord-sol-rechazar-cancel]`)){let e=qm;return qm=``,$(),R(`coord-rechazar-${e}`),!0}let oe=t.closest(`[data-coord-sol-rapido]`),se=t.closest(`[data-coord-sol-rechazar-ok]`);if(oe||se){let e=oe?oe.dataset.coordSolRapido:se.dataset.coordSolRechazarOk,t=document.getElementById(`coord-rechazo-${e}`),n=(oe?oe.dataset.texto:t?.value||Km[e]||``).trim();if(n.length<3)return Km[e]=n,F(`Elegí una respuesta o escribila.`,{tone:`error`}),$(),R(`coord-rechazo-${e}`),!0;let r=K_(Jm(),e),i=np(r?.fecha)?r.fecha:v();return Zp(`sol-${e}`,async()=>{await Z_(`solicitudes`,{id:e,fecha:i,estado:`rechazado`,respuesta:n},{id:e,fecha:i,estado:`pendiente`,respuesta:r?.respuesta||``},`Rechazado. El supervisor ve tu respuesta.`,`Volvió a pendiente.`)&&(delete Km[e],qm=``)}),!0}if(t.closest(`[data-coord-cliente-new]`))return Zh(`cliente`),ag=!0,$(),ig(`coord-cliente-nombre`),!0;let ce=t.closest(`[data-coord-ver-cliente]`);if(ce){let e=K_(ih(),ce.dataset.coordVerCliente);return e&&(rh=e.nombre||``,hp.add(`cli-${e.id}`),rg(`clientes`),$(),ig(`coord-cli-edit-${e.id}`)),!0}if(t.closest(`[data-coord-cliente-save]`)){let e=document.getElementById(`coord-cliente-form`);if(!e)return!0;let t=Qh(e);if(Xh(`cliente`,t),!t.nombre?.trim())return F(`Falta el nombre del tutor.`,{tone:`error`}),$(),R(`coord-cliente-nombre`),!0;let n={nombre:t.nombre.trim(),telefono:t.telefono?.trim()||``,barrio:t.barrio?.trim()||``,perros:Array.isArray(t.perros)?t.perros:[],plan:t.plan||`Pendiente de confirmar`,dias:Array.isArray(t.dias)?t.dias:[],turno:t.turno||`Pendiente de confirmar`,estado:t.estado||`activo`,notas:t.notas?.trim()||``};t.id&&(n.id=t.id),t.pedidoId&&(n.pedidoId=t.pedidoId);let r=t.id?K_(ih(),t.id):null,i=[...new Set([...Array.isArray(r?.archivos)?r.archivos:[],...Array.isArray(t.archivos)?t.archivos:[]])];i.length&&(n.archivos=i);let a={...r?.archivosPerro||{}};return n.perros.length===1&&i.forEach(e=>{let t=jh(e);t&&Mh(t)&&!t.perroId&&!a[e]&&(a[e]=n.perros[0])}),Object.keys(a).length&&(n.archivosPerro=a),Zp(`cliente-save`,async()=>{if(await Yp(`clientes`,n,{ok:t.id?`${n.nombre}: cambios guardados.`:`${n.nombre}: cliente cargado.`})&&(Zh(`cliente`),ag=!1,z(),ig(),t.pedidoId&&!t.id)){let e=K_(gh(),t.pedidoId);e&&hh(e)===`nuevo`&&await _.save(`pedidos`,{id:e.id,estado:`en-curso`}).catch(()=>{})}}),!0}if(t.closest(`[data-coord-cliente-cancel]`))return Zh(`cliente`),ag=!1,$(),ig(),!0;let le=t.closest(`[data-coord-cliente-edit]`);if(le){let e=K_(ih(),le.dataset.coordClienteEdit);return e&&(qh.cliente={id:e.id,pedidoId:e.pedidoId||``,nombre:e.nombre||``,telefono:e.telefono||``,barrio:e.barrio||``,perros:e.perros||[],plan:e.plan||`Pendiente de confirmar`,dias:e.dias||[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas||``,archivos:e.archivos||[]},Jh.delete(`cliente`),ag=!0,$(),ig(`coord-cliente-nombre`)),!0}if(t.closest(`[data-coord-aviso-new]`))return og=!0,$(),R(`coord-aviso-barrio`),!0;if(t.closest(`[data-coord-aviso-cancel]`))return og=!1,Zh(`aviso`),$(),R(`coord-aviso-new`),!0;if(t.closest(`[data-coord-aviso-save]`)){let e=Qh(t.closest(`[data-coord-form]`));Xh(`aviso`,e);let n=v(),r=e.barrio?.trim()?e.mensaje?.trim()?e.vigenteHasta&&(!np(e.vigenteHasta)||e.vigenteHasta<n)?[`«Hasta» tiene que ser hoy o después.`,`coord-aviso-vigenteHasta`]:null:[`Escribí qué pasa.`,`coord-aviso-mensaje`]:[`Falta el barrio.`,`coord-aviso-barrio`];if(r)return F(r[0],{tone:`error`}),$(),R(r[1]),!0;let i=e.barrio.trim(),a=nh.includes(e.tipo)?e.tipo:`otro`;return Zp(`aviso-save`,async()=>{await Yp(`avisos`,{fecha:n,barrio:i,tipo:a,mensaje:e.mensaje.trim(),vigenteHasta:e.vigenteHasta||n,titulo:`${a[0].toUpperCase()}${a.slice(1)} en ${i}`},{ok:`Aviso de ${i} enviado al equipo.`})&&(Zh(`aviso`),og=!1,z())}),!0}let ue=t.closest(`[data-coord-aviso-copy]`);if(ue){let e=K_(ah(),ue.dataset.coordAvisoCopy);return e&&G_(uh(e),`avisos`,`Aviso copiado. Pegalo en WhatsApp.`),!0}let de=t.closest(`[data-coord-aviso-fin]`);if(de){let e=K_(ah(),de.dataset.coordAvisoFin);return e&&Zp(`aviso-${e.id}`,async()=>{await Z_(`avisos`,{id:e.id,vigenteHasta:rp(v(),-1)},{id:e.id,vigenteHasta:e.vigenteHasta||e.fecha||v()},`Aviso de ${e.barrio||`barrio`} terminado.`,`El aviso volvió.`),R(`coord-view-title`)}),!0}let fe=t.closest(`[data-coord-resolve]`);if(fe){let e=fe.dataset.coordResolve,t=Cp.get(e);return Zp(`resuelto-${e}`,async()=>{await Z_(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},`${t?.name||e}: resuelto.`,`${t?.name||e}: volvió a pendientes.`),R(`coord-view-title`)}),!0}let pe=t.closest(`[data-coord-unresolve]`);if(pe){let e=pe.dataset.coordUnresolve,t=Cp.get(e);return Zp(`resuelto-${e}`,async()=>{await Yp(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{ok:`${t?.name||e}: volvió a pendientes.`})&&R(`coord-dato-${e}`)}),!0}let me=t.closest(`[data-coord-pedidos-filtro]`);if(me)return lg=me.dataset.coordPedidosFiltro,$(),R(me.id),!0;if(t.closest(`[data-coord-pedido-new]`))return sg=!0,$(),R(`coord-pedido-tipo`),!0;if(t.closest(`[data-coord-pedido-cancel]`))return sg=!1,Zh(`pedido`),$(),R(`coord-pedido-new`),!0;if(t.closest(`[data-coord-pedido-save]`)){let e=Qh(t.closest(`[data-coord-form]`));if(Xh(`pedido`,e),!e.perro?.trim()&&!e.detalle?.trim())return F(`Escribí el perro o qué hay que resolver.`,{tone:`error`}),$(),R(`coord-pedido-perro`),!0;let n=e.tipo||dh[0],r=e.perro?.trim()||``;return Zp(`pedido-save`,async()=>{await Yp(`pedidos`,{fecha:v(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:e.detalle?.trim()||``,datos:{perro:r,canal:e.canal||fh[0]}},{ok:`Pedido guardado en «Nuevo».`})&&(Zh(`pedido`),sg=!1,lg=`nuevo`,z())}),!0}let he=t.closest(`[data-coord-pedido-move]`);if(he){let e=he.dataset.coordPedidoMove,t=he.dataset.estado,n=K_(gh(),e),r=n?hh(n):`nuevo`;return Zp(`pedido-${e}`,async()=>{await Z_(`pedidos`,{id:e,estado:t},{id:e,estado:r},`Pedido en «${mh[t]}».`,`Pedido de vuelta en «${mh[r]}».`),R(`coord-pedidos-${lg}`)}),!0}let ge=t.closest(`[data-coord-pedido-delete]`);if(ge){let e=K_(gh(),ge.dataset.coordPedidoDelete);return e&&Zp(`pedido-${e.id}`,async()=>{await Xp(`pedidos`,e,{ok:`Pedido borrado.`})&&R(`coord-toast-undo`)}),!0}let _e=t.closest(`[data-coord-pedido-cliente]`);if(_e){let e=K_(gh(),_e.dataset.coordPedidoCliente);return e&&(qh.cliente=T_(e),Jh.delete(`cliente`),rg(`clientes`),ag=!0,$(),ig(`coord-cliente-nombre`)),!0}let ve=t.closest(`[data-coord-pedido-ficha]`);if(ve){let e=K_(gh(),ve.dataset.coordPedidoFicha);return e&&(qh.alta=z_(e),Jh.delete(`alta`),rg(`mas:fichas`),cg=!0,$(),ig(`coord-alta-nombre`)),!0}if(t.closest(`[data-coord-alta-new]`))return cg=!0,$(),ig(`coord-alta-nombre`),!0;if(t.closest(`[data-coord-alta-close]`))return cg=!1,P_=!1,$(),ig(),!0;if(t.closest(`[data-coord-alta-save]`)){let e=document.getElementById(`coord-alta-form`);if(!e)return!0;let t=Qh(e);if(Xh(`alta`,t),!t.nombre?.trim())return F(`Falta el nombre del perro.`,{tone:`error`}),$(),R(`coord-alta-nombre`),!0;let n=t.nombre.trim(),{archivos:r,...i}=t,a={...i,tamano:t.tamano||`Pendiente de confirmar`,nombre:n,dias:Array.isArray(t.dias)?t.dias:[],primerPaseo:`Individual`};return j_&&!M_&&Fh()?(F(`Sin señal: el carnet necesita señal. Esperá o quitalo para guardar la ficha.`,{tone:`error`}),$(),R(`coord-alta-carnet-quitar`),!0):(Zp(`alta-save`,async()=>{if(j_&&!M_){N_=!0,Zf(`Subiendo el carnet de vacunas.`),z();try{M_=await ht.subir(Eh,j_,{perroNombre:n,pedidoId:t.pedidoId||``,nota:`Alta de perro nuevo`}),j_=null}catch(e){F(`No se pudo subir el carnet: ${Ih(e,`subir`)} La ficha no se guardó.`,{tone:`error`});return}finally{N_=!1,z()}}let e=[...new Set([...Array.isArray(r)?r:[],M_?.id].filter(Boolean))],i=M_?.id||e.find(e=>Mh(jh(e))),o=i?jh(i)||M_:null,s={fecha:v(),perroNombre:n,datos:a,categoria:`SIN EVALUAR`,estado:`lista`};e.length&&(s.archivos=e),i&&(s.carnet={id:i,nombre:o?.nombreArchivo||``}),await Yp(`fichas`,s,{ok:`Ficha de ${n} guardada${i?` con carnet`:``}.`})&&(Zh(`alta`),j_=null,M_=null,cg=!1,z(),ig())}),!0)}if(t.closest(`[data-coord-alta-clear]`))return P_=!0,$(),R(`coord-alta-vaciar-cancel`),!0;if(t.closest(`[data-coord-alta-clear-cancel]`))return P_=!1,$(),R(`coord-alta-clear`),!0;if(t.closest(`[data-coord-alta-clear-ok]`))return P_=!1,j_=null,M_=null,Zh(`alta`),F(`Ficha vacía.`),$(),R(`coord-alta-nombre`),!0;if(t.closest(`[data-coord-alta-carnet-quitar]`))return j_=null,M_=null,Zf(`Carnet quitado.`),$(),R(`coord-alta-carnet`),!0;let ye=t.closest(`[data-coord-alta-copy]`);if(ye){let e=K_(_h(),ye.dataset.coordAltaCopy);return e&&G_(R_(e),`alta`,`Ficha copiada. Pegala en el registro maestro.`),!0}let be=t.closest(`[data-coord-alta-delete]`);if(be){let e=K_(_h(),be.dataset.coordAltaDelete);return e&&Zp(`ficha-${e.id}`,async()=>{await Xp(`fichas`,e,{ok:`Ficha borrada.`})&&R(`coord-toast-undo`)}),!0}return!1}function $_(e){let t=e.target;if(t.closest?.(`.coord-shell`)){if(B){if(t.matches(`[data-coord-ed-search]`)){Em=t.value;let e=document.getElementById(`coord-picker-grid`);e&&(e.innerHTML=i_());return}if(t.matches(`[data-coord-ed-hora]`)){Dm=t.value;let e=document.getElementById(`coord-picker-grid`);e&&(e.innerHTML=i_());return}if(t.matches(`[data-coord-ed-field]`)){B[t.dataset.coordEdField]=t.value,B.sucio=!0;return}if(t.matches(`[data-coord-stop]`)){let e=B.paradas[Number(t.dataset.coordStop)];e&&(e[t.dataset.k]=t.value,B.sucio=!0);return}}if(t.matches(`[data-coord-rechazo]`))Km[t.dataset.coordRechazo]=t.value;else if(V&&t.matches(`[data-coord-subida-campo]`))V[t.dataset.coordSubidaCampo]=t.value;else if(t.matches(`[data-coord-clientes-buscar]`)){rh=t.value;let e=document.getElementById(`coord-clientes-lista`);e&&(e.innerHTML=f_())}else if(t.matches(`[data-coord-filter-perros]`)){let e=L(t.value);t.closest(`.coord-field`)?.querySelectorAll(`.cd-pick-dog`).forEach(t=>{t.hidden=!!e&&!t.dataset.name.includes(e)&&!t.querySelector(`input`).checked})}}}function ev(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;if(t.matches(`[data-coord-foto]`)){let e=t.files?.[0];return e&&Zp(`foto-${t.dataset.coordFoto}`,()=>X_(t.dataset.coordFoto,e)),!0}if(t.matches(`[data-coord-rutas-fecha]`))return np(t.value)&&(jm=t.value,z()),!0;if(B&&t.matches(`[data-coord-stop]`)){let e=B.paradas[Number(t.dataset.coordStop)];return e&&(e[t.dataset.k]=t.dataset.k===`minutos`?Number(t.value)||45:t.value,B.sucio=!0,t.dataset.k!==`nota`&&z()),!0}if(B&&t.matches(`[data-coord-ed-field]`))return B[t.dataset.coordEdField]=t.value,B.sucio=!0,[`soloDia`,`paseador`,`ayudante`,`supervisor`].includes(t.dataset.coordEdField)&&z(),!0;if(t.matches(`[data-coord-ed-hora], [data-coord-ed-search], [data-coord-rechazo], [data-coord-clientes-buscar], [data-coord-filter-perros]`))return!0;if(t.matches(`[data-coord-subida-archivo]`))return V&&t.files?.[0]&&(V.file=t.files[0],V.error=``,Zf(`Elegiste ${V.file.name}. Tocá «Subir».`),z()),!0;if(V&&t.matches(`[data-coord-subida-campo]`))return V[t.dataset.coordSubidaCampo]=t.value,t.dataset.coordSubidaCampo!==`nota`&&(V.error=``,z()),!0;if(t.matches(`[data-coord-alta-carnet]`))return t.files?.[0]&&(j_=t.files[0],M_=null,Zf(`Elegiste ${j_.name}. Se sube al guardar.`),z()),!0;let n=t.closest(`[data-coord-form]`);if(n){if(Xh(n.dataset.coordForm,Qh(n)),n.dataset.coordForm===`cliente`&&t.name===`perros`){let e=document.getElementById(`coord-cliente-perros-label`),t=(qh.cliente.perros||[]).length;e&&(e.textContent=`Perros${t?` (${t})`:``}`)}return!0}return!1}function tv(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`[data-coord-cliente-save], [data-coord-aviso-save], [data-coord-pedido-save], [data-coord-alta-save]`)?.click())}function nv(e){e.key===`Enter`&&e.target.matches?.(`.coord-shell [data-coord-ed-search]`)&&(e.preventDefault(),document.querySelector(`#coord-picker-grid .cd-dog-add`)?.click())}function rv(){pe.push(Q_),me.push(ev),document.addEventListener(`input`,$_),document.addEventListener(`submit`,tv),document.addEventListener(`keydown`,nv)}var iv=`paseosJuanAdmin_prioridadesHechas`,av=`paseosJuanAdmin_plegables`,ov=`paseosJuanAdmin_pestana`,sv=`America/Argentina/Buenos_Aires`,cv=[`Pequeño`,`Mediano`,`Grande`],lv=b.manana.label,uv=b.tarde.label,dv=[`paseos`,`incidentes`,`checklists`,`pedidos`,`rutas`,`plantillas`,`avisos`,`fotos`],fv=[`pagos`,`clientes`,`archivos`],pv=10,mv=[`Efectivo`,`Transferencia`,`Naranja X`],hv=[`Plan 1`,`Plan 2`,`Plan 3`,`Paseo suelto`],gv=`Libro contable del Sistema de Gestión`,_v={"carnet de vacunas":{label:`Carnet`,tone:`green`},"comprobante de pago":{label:`Comprobante`,tone:`blue`},documento:{label:`Documento`,tone:`gray`},foto:{label:`Foto`,tone:`gray`}},vv=`image/jpeg,image/png,image/webp,application/pdf`,yv=/^(image\/(jpeg|png|webp)|application\/pdf)$/,bv=864e5,xv=20,Sv=8,Cv=5e3,wv=[{id:`inicio`,label:`Inicio`,icon:`home`},{id:`equipo`,label:`Equipo`,icon:`users`},{id:`plata`,label:`Plata`,icon:`wallet`},{id:`mas`,label:`Más`,icon:`grid`}],Tv={fotos:{title:`Fotos de perros`,icon:`camera`},carga:{title:`Carga semanal`,icon:`chart`},planes:{title:`Planes y precios`,icon:`creditCard`},archivos:{title:`Archivos`,icon:`fileUp`},datos:{title:`Datos a revisar`,icon:`clipboardCheck`},clientes:{title:`Clientes por barrio`,icon:`mapPin`},indicadores:{title:`Indicadores`,icon:`activity`}},Ev={"adm-usuarios":[`equipo`],"adm-pagos":[`plata`],"adm-finanzas":[`plata`],"adm-fotos":[`mas`,`fotos`],"adm-carga":[`mas`,`carga`],"adm-precios":[`mas`,`planes`],"adm-archivos":[`mas`,`archivos`],"adm-datos":[`mas`,`datos`],"adm-clientes":[`mas`,`clientes`],"adm-indicadores":[`mas`,`indicadores`]},Dv=``,Ov=null,G={tab:zv().tab,mas:zv().mas,sheet:null,sheetReturn:``,sheetEnter:!1,users:null,usersLoading:!1,usersError:``,roleFor:null,resetFor:null,confirmOff:null,credential:null,busy:!1,liveDay:null,liveError:``,adminLoaded:!1,adminError:``,pagosMes:null,pagosTodos:!1,archivosTipo:`todos`,fotosFiltro:`faltan`,fotosSubiendo:new Set,savingPago:!1,lateSignature:``,navBadges:{},undo:null,msgs:{users:null,live:null,pagos:null,archivos:null,fotos:null}},kv=()=>({fecha:v(),concepto:``,monto:``,medioSel:``,medioOtro:``,pasadoAlLibro:!1}),Av=()=>({nombre:``,usuario:``,usuarioTocado:!1,rol:`paseador`,pin:``}),K={crear:Av(),reset:{pin:``},pago:kv(),pagoArchivo:null,pagoSubido:null},jv={grid:`<rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" />`,refresh:`<path d="M20 11a8 8 0 0 0-14.7-4.3L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.7 4.3L20 16" /><path d="M20 20v-4h-4" />`,check:`<path d="m5 12.5 4.5 4.5L19 7.5" />`,arrowLeft:`<path d="M19 12H5" /><path d="m11 6-6 6 6 6" />`,key:`<circle cx="8" cy="15" r="4" /><path d="m11 12 9-9" /><path d="m16 7 3 3" />`,undo:`<path d="M9 14 4 9l5-5" /><path d="M4 9h10a6 6 0 0 1 0 12h-3" />`,off:`<circle cx="12" cy="12" r="9" /><path d="m6 6 12 12" />`,wifiOff:`<path d="M3 3l18 18" /><path d="M8.5 16.5a5 5 0 0 1 7 0" /><path d="M5 12.5a10 10 0 0 1 4.2-2.4" /><path d="M14.8 10.1A10 10 0 0 1 19 12.5" /><path d="M2 8.8a15 15 0 0 1 4.3-2.6" /><path d="M10.7 5.1A15 15 0 0 1 22 8.8" /><path d="M12 20h.01" />`};function q(e,t=`adm-icon-sm`){return jv[e]?`<svg class="${t}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${jv[e]}</svg>`:h(e,t)}function J(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Mv(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Y(e,t,n){return`${e} ${e===1?t:n}`}var Nv={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Pv(e){let t=On.filter(t=>e.includes(t)),n=t.map(e=>On.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${Nv[t[0]]} a ${Nv[t[t.length-1]]}`:t.map(e=>Nv[e]).join(`, `)}function Fv(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:sv,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:On.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function Iv(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Lv(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Rv(){return ne(iv)}function zv(){let e=Iv(ov,{}),t=wv.some(t=>t.id===e?.tab)?e.tab:`inicio`;return{tab:t,mas:t===`mas`&&Tv[e?.mas]?e.mas:null}}function Bv(){Lv(ov,{tab:G.tab,mas:G.mas})}function Vv(e,t=!1){let n=Iv(av,{});return typeof n?.[e]==`boolean`?n[e]:t}function Hv(e,t){let n=Iv(av,{});Lv(av,{...n&&typeof n==`object`?n:{},[e]:t})}function Uv(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:sv,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function Wv(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:sv,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function Gv(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function Kv(e){let t=Number(e);return!Number.isFinite(t)||t<=0?``:t<1048576?`${Math.max(1,Math.round(t/1024))} KB`:`${(t/1048576).toFixed(1).replace(`.`,`,`)} MB`}function qv(e,t){return String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))}function Jv(){return navigator.onLine===!1}function Yv(){return g.user()||{usuario:``,nombre:``,rol:`admin`}}function Xv(e){return String(e||``).trim().split(/\s+/)[0]||``}function Zv(e){return(String(e||``).trim().charAt(0)||`?`).toUpperCase()}function Qv(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function $v(e,t=`Más info`){return`
    <details class="adm-help">
      <summary aria-label="${J(t)}"><span aria-hidden="true">?</span></summary>
      <div class="adm-help-body">${e}</div>
    </details>
  `}function ey(e,t){return x.find(t=>t.id===e)||(t?x.find(e=>uy(e.name)===uy(t)):null)||null}function ty(e){if(!e)return``;let t=e.safety.some(e=>/bozal/i.test(e)),n=(e.incompatibleWith||[]).length>0||e.safety.some(e=>/no juntar/i.test(e));if(!t&&!n)return``;let r=(e.incompatibleWith||[]).length?`No juntar con ${Mv(e.incompatibleWith)}`:`No juntar`;return`
    <span class="adm-chips">
      ${t?`<span class="adm-chip adm-chip--red">${q(`alertTriangle`,`adm-icon-xs`)} Bozal</span>`:``}
      ${n?`<span class="adm-chip adm-chip--yellow" title="${J(r)}">${q(`x`,`adm-icon-xs`)} No juntar<span class="adm-sr-only">: ${J(r)}</span></span>`:``}
    </span>
  `}function ny(e,t,n=`md`){let r=_t.de(e);return r?`<img class="adm-avatar adm-avatar--${n}" src="${J(r)}" alt="" loading="lazy" />`:`<span class="adm-avatar adm-avatar--${n} adm-avatar--empty" aria-hidden="true">${J(Zv(t))}</span>`}function ry(e){return e&&_.cached(`fotos`).find(t=>t.id===e||t.perroId===e)||null}function iy(e,t,{compact:n=!1,change:r=!1}={}){if(!e)return``;let i=G.fotosSubiendo.has(e),a=Jv(),o=i?`Subiendo…`:a?`Sin señal`:r?`Cambiar`:`Foto`;return`
    <label class="adm-btn ${r?`adm-btn--ghost`:`adm-btn--soft`} ${n?`adm-btn--icon`:`adm-btn--sm`} adm-file-button ${i?`is-busy`:``} ${a&&!i?`is-off`:``}" data-adm-foto-label="${J(e)}">
      ${q(a&&!i?`wifiOff`:`camera`)}<span class="${n?`adm-sr-only`:``}">${o}${n?` de ${J(t)}`:``}</span>
      <input class="adm-file-input" type="file" accept="image/*" capture="environment" data-adm-foto="${J(e)}" data-adm-foto-nombre="${J(t)}" ${i||a?`disabled`:``} aria-label="${a&&!i?`Sin señal, no se puede subir la foto`:r?`Cambiar la foto`:`Sacar foto`} de ${J(t)}" />
    </label>
  `}function X(e,t){return[`pedidos`,`plantillas`,`avisos`,`fotos`,...fv].includes(e)?{}:{desde:t}}function ay(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function oy(e){return e.hora||Uv(e.creadoEn)}function sy(e=new Date){let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:sv,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),n=e=>Number(t.find(t=>t.type===e)?.value||0);return n(`hour`)%24*60+n(`minute`)}function cy(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}var ly=810;function uy(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function dy(e,t){let n=_.cached(`rutas`,X(`rutas`,e)).filter(t=>t.fecha===e),r=_.cached(`plantillas`,X(`plantillas`,e)).filter(e=>uy(e.dia)===uy(t)),i=!r.length,a=i?Wn().filter(e=>uy(e.dia)===uy(t)):r,o=new Map;a.forEach(e=>o.set(e.ruta||e.id,{...e,fuente:i?`planilla`:`plantilla`})),n.forEach(e=>o.set(e.ruta||String(e.id).slice(11),{...e,fuente:`dia`}));let s=e=>(e.paradas||[]).map(e=>e.hora||`99:99`).sort()[0]||`99:99`,c=[...o.values()].sort((e,t)=>s(e).localeCompare(s(t))||String(e.ruta).localeCompare(String(t.ruta)));return{list:c,fromSheet:c.some(e=>e.fuente===`planilla`)}}function fy(e,t,n){let r=(e,t)=>e.perroId&&t.perroId?e.perroId===t.perroId:uy(e.perroNombre)&&uy(e.perroNombre)===uy(t.perroNombre),i=t=>e.reduce((e,n)=>e+(n.paradas||[]).filter(e=>r(t,e)).length,0);return e.map(e=>{let a=ay({turno:e.turno}),o=(e.paradas||[]).map(e=>{let o=t.filter(t=>r(e,t)),s=o.find(e=>ay(e)===a)||(o.length===1&&i(e)===1?o[0]:null),c=s?.estado||`pendiente`,l=cy(e.hora),u=`a-tiempo`;return c===`entregado`?u=`entregado`:c===`no-sale`?u=`no-sale`:c===`pendiente`&&l!==null&&n>l+pv&&(u=`atrasado`),{...e,paseo:s,estado:c,status:u,prevista:l,atraso:u===`atrasado`?n-l:0}}),s=e=>o.filter(t=>t.status===e).length;return{route:e,shift:a,stops:o,aTiempo:s(`a-tiempo`),atrasados:s(`atrasado`),entregados:s(`entregado`),noSale:s(`no-sale`)}})}function py(e){return _.cached(`avisos`,X(`avisos`,e)).filter(t=>{let n=t.fecha||String(t.creadoEn||``).slice(0,10),r=t.vigenteHasta||n;return n&&n<=e&&r>=e}).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``)))}function my(){let e=v(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=_.cached(`paseos`,X(`paseos`,e)).filter(t),i=_.cached(`incidentes`,X(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),a=_.cached(`checklists`,X(`checklists`,e)).filter(t).sort(n),o=_.cached(`pedidos`,X(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),s=[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>ay(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}}),c=sy(),l=dy(e,Fv().dayName),u=fy(l.list,r,c),d=u.flatMap(e=>e.stops.filter(e=>e.status===`atrasado`).map(t=>({...t,route:e.route})));return{hoy:e,paseos:r,incidentes:i,checklists:a,pedidosNuevos:o,shifts:s,nowMin:c,effective:l,compliance:u,late:d,lateNow:d.filter(e=>e.prevista<ly==c<ly),avisos:py(e),carnetsWeb:_.cached(`archivos`,X(`archivos`,e)).filter(e=>e.tipo===`carnet de vacunas`&&e.creadoPor===`web`&&Date.now()-Date.parse(e.creadoEn||``)<bv).sort(qv),perrosHoy:u.reduce((e,t)=>e+t.stops.length-t.noSale,0),entregados:r.filter(e=>e.estado===`entregado`).length}}function hy(e){return e.late.map(e=>`${e.route.ruta}:${e.perroId||e.perroNombre}`).join(`|`)}function gy(){let e=v();G.adminLoaded||(G.adminLoaded=!0,_y().finally(()=>{fv.forEach(t=>_.watch(t,X(t,e)))})),G.liveDay!==e&&(G.liveDay=e,vy(!1).finally(()=>{dv.forEach(t=>_.watch(t,X(t,e)))}))}async function _y(){let e=v(),t=await Promise.allSettled(fv.map(t=>_.list(t,X(t,e)))),n=e=>[...new Set(t.filter((t,n)=>t.status===`rejected`&&e.includes(fv[n])).map(e=>e.reason?.message||`No se pudieron traer los datos.`))].join(` `),r=G.adminError,i=n([`pagos`,`clientes`]),a=n([`archivos`]);G.adminError=[i,a].filter(Boolean).join(` `),i&&Z(`pagos`,`No se pudieron traer pagos o clientes: ${i}`,!0),a&&Z(`archivos`,`No se pudo traer la lista: ${a}`,!0),r!==G.adminError&&Q()}async function vy(e){let t=v(),n=await Promise.allSettled(dv.map(e=>_.list(e,X(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=G.liveError;G.liveError=r.join(` `),G.liveError?Z(`live`,`No se pudo actualizar: ${G.liveError}`,!0):e?Z(`live`,Jv()?`Sin señal: ves lo último que llegó.`:`Actualizado.`):i&&Z(`live`,`Actualizado.`),(e||i!==G.liveError)&&Q()}var yy={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},by={admin:`todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.`,coordinador:`arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.`,supervisor:`controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.`,paseador:`hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.`,ayudante:`acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.`,marketing:`pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.`},xy=[{rol:`paseador`,short:`Paseador`,icon:`pawPrint`,line:`Hace su ruta y marca cada paso.`},{rol:`ayudante`,short:`Ayudante`,icon:`userCheck`,line:`Acompaña al paseador. Sin datos de clientes.`},{rol:`supervisor`,short:`Supervisor`,icon:`radar`,line:`Controla los paseos del momento. No ve plata.`},{rol:`coordinador`,short:`Coordinador`,icon:`route`,line:`Rutas, horarios, clientes y avisos. No ve plata.`},{rol:`marketing`,short:`Marketing`,icon:`message`,line:`Pedidos y avisos. Nada de plata.`},{rol:`admin`,short:`Admin`,icon:`shieldCheck`,line:`Todo, incluida la plata.`}].filter(e=>tt[e.rol]);function Sy(e){return xy.find(t=>t.rol===e)?.short||tt[e]||e}function Cy(e){let t=(et[e]||[]).filter(e=>yy[e]).map(t=>e===`ayudante`&&t===`paseador`?`Paseador (modo ayudante)`:yy[t]);return`${t.length?`Paneles: ${Mv(t)}.`:`Todavía no tiene panel.`} Qué hace: ${by[e]||`Pendiente de confirmar`}`}function wy(){return G.usersLoading=!0,rt.list().then(e=>{G.users=e,G.usersError=``}).catch(e=>{G.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,G.usersError,!0)}).finally(()=>{G.usersLoading=!1,Q()})}function Ty(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function Ey(e){let t=Ty(e).split(/\s+/).map(e=>e.replace(/[^a-z0-9]/g,``)).filter(Boolean);if(!t.length)return``;let n=new Set((G.users||[]).map(e=>e.usuario)),r=t[0];if(/^[a-z]/.test(r)||(r=`u${r}`),r=r.slice(0,24),r.length<3&&(r=(r+(t[1]||``)+`pj`).slice(0,24)),!n.has(r))return r;if(t[1]){let e=`${r}.${t[1]}`.slice(0,31);if(!n.has(e))return e}for(let e=2;e<100;e+=1)if(!n.has(`${r}${e}`))return`${r}${e}`;return r}function Dy(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function Oy(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!Dy(e))return e}}function ky(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){G.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function Ay(e){let t=G.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?J(t.text):``}</p>`}function jy(){Object.entries(G.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function My(e){if(!e||e===document.body||!e.closest?.(`.adm-shell`))return null;if(e.id)return{selector:`#${CSS.escape(e.id)}`,index:0};let t=``;if(e.tagName===`SUMMARY`&&e.parentElement){let n=[...e.parentElement.attributes].find(e=>e.name.startsWith(`data-adm-`));n&&(t=`[${n.name}="${CSS.escape(n.value)}"] > summary`)}else{let n=[...e.attributes].find(e=>e.name.startsWith(`data-adm-`)&&e.name!==`data-adm-area`);n&&(t=`${e.tagName.toLowerCase()}[${n.name}="${CSS.escape(n.value)}"]`)}return t?{selector:t,index:Math.max(0,[...document.querySelectorAll(t)].indexOf(e))}:null}function Q(){if(!Qv()||g.user()?.rol!==`admin`)return;let e=document.activeElement,t=My(e),n=document.querySelector(`.adm-sheet-body`)?.scrollTop||0,r=null;try{e&&typeof e.selectionStart==`number`&&(r=[e.selectionStart,e.selectionEnd])}catch{r=null}$();let i=document.querySelector(`.adm-sheet-body`);if(i&&n&&(i.scrollTop=n),!t)return;let a=document.querySelectorAll(t.selector),o=a[t.index]||a[0];if(o&&(o.focus({preventScroll:!0}),r))try{o.setSelectionRange(...r)}catch{}}function Ny(){return x.filter(e=>e.status===`Activo`&&e.days.length>0)}function Py(){let e=Ny(),t=On.map(t=>{let n=e.filter(e=>In(e,t,lv)).length,r=e.filter(e=>In(e,t,uv)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function Fy(){let e=Ny(),t=new Map(x.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return x.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[lv,uv].forEach(e=>{let t=On.filter(t=>In(o,t,e)&&In(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Iy(){return Ny().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function Ly(){return x.filter(e=>e.review||e.status!==`Activo`)}function Ry(e){return e===lv?b.manana.route:b.tarde.routes.join(` o `)}function zy(e,t){return!!e.carnet?.id||t.carnetsWeb.some(t=>t.pedidoId===e.id)}function By(e){return G.users?.find(t=>t.usuario===e)?.nombre||e||``}function Vy(e=my()){let{conflicts:t}=Fy(),n=x.filter(e=>e.status!==`Activo`),r=Ly(),i=Iy().filter(e=>e.category===`SIN EVALUAR`),a=Ny(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=!!n.creadoPor&&n.creadoPor===Yv().usuario,a=n.creadoPorNombre||By(n.creadoPor)||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente`,tone:`red`,short:t===1?`Incidente${r.length?`: ${r[0]}`:` hoy`}`:`${t} incidentes hoy`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${Mv(r)})`:``}`,detail:`${t>1?i?`El último lo cargaste vos`:`El último lo cargó`:i?`Lo cargaste vos`:`Lo cargó`}${i?``:` ${a}`}${oy(n)?` a las ${oy(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:i?`Revisá el incidente${r.length?` de ${Mv(r)}`:``} que cargaste.`:`Leé el incidente${r.length?` de ${Mv(r)}`:``} y hablá con ${a} hoy.`,target:`adm-incidentes`,targetLabel:t===1?`Ver incidente`:`Ver incidentes`})}if(e.lateNow.length){let t=e.lateNow.length,n=e.nowMin<ly?`mañana`:`tarde`,r=e.lateNow.slice().sort((e,t)=>t.atraso-e.atraso),i=r[0],a=r.slice(0,3).map(e=>`${e.perroNombre} (${e.hora}, ${e.route.ruta})`),o=[...new Set(r.map(e=>e.route.ruta))],c=i.route.supervisor||By(i.route.paseador)||`el supervisor del turno`;e.paseos.length?s.push({id:`atrasos-${e.hoy}-${n}-${t}`,tag:`Atrasos`,tone:`red`,short:`${Y(t,`atrasado`,`atrasados`)} (${n})`,title:`${Y(t,`perro atrasado`,`perros atrasados`)} en el turno ${n}`,detail:`${Mv(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Pasaron más de ${pv} minutos de la hora prevista y nadie marcó el retiro.`,action:`Preguntale a ${c} qué pasa con ${i.perroNombre} (retiro ${i.hora}, ruta ${o.join(` y `)}).`,target:`adm-cumplimiento`,targetLabel:t===1?`Ver atraso`:`Ver atrasos`}):s.push({id:`atrasos-sin-marcas-${e.hoy}-${n}`,tag:`Atrasos`,tone:`yellow`,short:`Nadie marca retiros`,title:`Nadie marcó retiros hoy: ${Y(t,`perro figura`,`perros figuran`)} pasados de hora en el turno ${n}`,detail:`Según la ruta de hoy, ${Mv(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,action:`Preguntale a ${c} si el equipo está marcando los retiros en la app.`,target:`adm-cumplimiento`,targetLabel:`Ver rutas`})}let c=new Set(e.pedidosNuevos.map(e=>e.id)),l=e.carnetsWeb.filter(e=>!c.has(e.pedidoId));if(e.pedidosNuevos.length||l.length){let t=e.pedidosNuevos.length,n=e.pedidosNuevos.filter(t=>zy(t,e)),r=e=>e.titulo||e.tipo||`Pedido sin título`,i=[...new Set(l.map(e=>e.perroNombre||`perro sin nombre`))],a=l.length?`${t?`Además, l`:`L`}${l.length===1?`legó 1 carnet de vacunas`:`legaron ${l.length} carnets de vacunas`} por la web en las últimas 24 h (${Mv(i)}) de ${l.length===1?`un pedido que`:`pedidos que`} ya no ${l.length===1?`está`:`están`} como nuevo${l.length===1?``:`s`}.`:``;if(t){let i=e.pedidosNuevos.slice(0,3).map(t=>`${r(t)}${zy(t,e)?` (con carnet)`:``}`),o=e.pedidosNuevos[t-1],c=r(o),u=n.length+l.length;s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}-${u}`,tag:`Pedidos`,tone:`blue`,short:`${Y(t,`pedido nuevo`,`pedidos nuevos`)}${n.length?` · con carnet`:``}`,title:`${Y(t,`pedido nuevo`,`pedidos nuevos`)} sin responder${n.length?` · ${n.length===t&&t===1?`trae carnet de vacunas`:`${n.length} con carnet`}`:``}`,detail:`${Mv(i)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.${a?` ${a}`:``}`,action:t===1?`Respondé el pedido “${c}”${zy(o,e)?` y mirá el carnet que mandó`:``}.`:`Respondé los ${t} pedidos nuevos, empezando por “${c}”${zy(o,e)?` (trae carnet)`:``}.`,target:`adm-pedidos`,targetLabel:t===1?`Ver pedido`:`Ver pedidos`})}else{let e=l[0];s.push({id:`carnets-web-${e.id}-${l.length}`,tag:`Pedidos`,tone:`blue`,short:l.length===1?`Carnet de ${e.perroNombre||`un perro`}`:`${l.length} carnets nuevos`,title:l.length===1?`Pedido nuevo con carnet: llegó el carnet de ${e.perroNombre||`un perro`} por la web`:`Pedidos nuevos con carnet: llegaron ${l.length} carnets por la web`,detail:a,action:`Abrí el carnet de ${e.perroNombre||`ese perro`} en “Archivos” y sumalo a su ficha.`,target:`adm-archivos`,targetLabel:l.length===1?`Ver carnet`:`Ver carnets`})}}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(Ry).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`red`,short:`${n}: no juntar`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${Mv(r)}. Hay ${Y(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${Mv(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver cruces`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`yellow`,short:`${Y(r.length,`perro`,`perros`)} a revisar`,title:`${Y(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${Mv(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${Mv(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`blue`,short:`${o.length} sin evaluar`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${Mv(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${Mv(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver perros`})}return s.slice(0,3)}function Hy(){let e=Ny(),t=[],n=[];e.forEach(e=>{let r=kn.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=kn.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function Uy(e){return`
    <div class="adm-shell ${G.sheet?`has-sheet`:``}">
      ${Wy()}
      ${e}
      ${Gy()}
      ${Ky()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </div>
  `}function Wy(){let e=_.pendingCount(),t=Jv();return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Admin · ${J(Xv(Yv().nombre)||`Juan`)}</small>
        </span>
      </a>
      <div class="adm-header-actions">
        ${e?`<span class="adm-chip adm-chip--yellow" title="Se envían solos cuando hay señal">${q(`clock`,`adm-icon-xs`)} ${e} sin enviar</span>`:``}
        <button class="adm-btn adm-btn--ghost adm-btn--icon" id="adm-refresh" type="button" data-adm-refresh aria-label="Actualizar datos">${q(`refresh`)}</button>
        <button class="adm-btn adm-btn--ghost adm-btn--head" type="button" data-admin-logout>${q(`logOut`)}<span>Salir</span></button>
      </div>
    </header>
    ${t?`<p class="adm-offline">${q(`alertCircle`)} <span>Sin señal: lo que marques se envía solo. Fotos y archivos necesitan señal.</span></p>`:``}
  `}function Gy(){let e=G.navBadges||{};return`
    <nav class="adm-nav" aria-label="Secciones del admin">
      ${wv.map(t=>{let n=G.tab===t.id,r=e[t.id];return`
          <button class="adm-nav-item ${n?`is-current`:``}" type="button" data-adm-tab="${t.id}" ${n?`aria-current="page"`:``}>
            <span class="adm-nav-icon">${q(t.icon,`adm-icon`)}${r?`<span class="adm-nav-badge adm-nav-badge--${r.tone}">${r.count}</span>`:``}</span>
            <span class="adm-nav-label">${t.label}</span>
            ${r?`<span class="adm-sr-only">: ${J(r.label)}</span>`:``}
          </button>
        `}).join(``)}
    </nav>
  `}function Ky(){return G.undo?`
    <div class="adm-undo" role="status">
      <span>${J(G.undo.text)}</span>
      ${G.undo.run?`<button class="adm-btn adm-btn--undo" type="button" data-adm-undo>${q(`undo`)} Deshacer</button>`:``}
    </div>
  `:``}function qy(e,t){clearTimeout(Ov),G.undo={text:e,run:t},Ov=setTimeout(()=>{G.undo=null,Q()},Cv)}function Jy(){gy(),G.users===null&&!G.usersLoading&&!G.usersError&&wy();let e=my();G.lateSignature=hy(e);let t=Db();G.navBadges={inicio:e.incidentes.length+e.lateNow.length?{count:e.incidentes.length+e.lateNow.length,tone:`red`,label:`${Y(e.incidentes.length,`incidente`,`incidentes`)} y ${Y(e.lateNow.length,`atrasado`,`atrasados`)}`}:null,plata:t.faltan.length?{count:t.faltan.length,tone:`yellow`,label:`${Y(t.faltan.length,`pago sin pasar`,`pagos sin pasar`)} al Libro`}:null},setTimeout(jy,60);let n;return n=G.tab===`equipo`?Sb():G.tab===`plata`?kb(t):G.tab===`mas`?Fb():Yy(e),`
    <main class="adm-page adm-page--${G.tab}" id="adm-main" tabindex="-1">
      ${n}
    </main>
    ${G.sheet===`pago`?Nb():``}
    ${G.sheet===`crear`?Cb():``}
  `}function Yy(e){let t=Vy(e),n=Rv(),{dayName:r,date:i}=Fv(),a=Xv(Yv().nombre);return`
    <div class="adm-hello">
      <h1 id="adm-title" tabindex="-1">Hola${a?`, ${J(a)}`:``}</h1>
      <p>${J(r)} ${J(i)}</p>
    </div>
    ${Ay(`live`)}
    <div class="adm-home">
      <div class="adm-home-main">
        ${Xy(t,n)}
        ${Zy(t,n)}
        ${Qy(e)}
      </div>
      <div class="adm-home-side">
        ${$y()}
        ${rb(e)}
        ${lb(e)}
        ${ub(e)}
        ${fb(e)}
        ${mb(e)}
      </div>
    </div>
  `}function Xy(e,t){let n=e.find(e=>!t.includes(e.id));return n?`
    <section class="adm-next adm-next--${n.tone}" aria-labelledby="adm-next-title">
      <p class="adm-next-label" id="adm-next-title">${q(`arrowRight`)} Próximo paso</p>
      <p class="adm-next-text">${J(n.action)}</p>
      <div class="adm-next-actions">
        <button class="adm-btn adm-btn--primary" type="button" data-adm-goto="${n.target}">${J(n.targetLabel)} ${q(`arrowRight`)}</button>
        <button class="adm-btn adm-btn--soft" type="button" data-adm-done="${J(n.id)}" data-adm-done-label="${J(n.short)}" aria-pressed="false" aria-label="Listo: ${J(n.short)}">${q(`check`)} Listo</button>
      </div>
    </section>
  `:`
      <section class="adm-next adm-next--done" aria-labelledby="adm-next-title">
        <p class="adm-next-label" id="adm-next-title">${q(`checkCircle`)} Próximo paso</p>
        <p class="adm-next-text">Todo hecho. Mirá la carga de la semana.</p>
        <button class="adm-btn adm-btn--primary adm-btn--block" type="button" data-adm-goto="adm-carga">${q(`chart`)} Carga semanal</button>
      </section>
    `}function Zy(e,t){let n=e.find(e=>!t.includes(e.id)),r=e.map((e,t)=>({priority:e,index:t})).filter(e=>e.priority!==n);return r.length?`
    <section class="adm-block" aria-labelledby="adm-prio-title">
      <h2 class="adm-h2" id="adm-prio-title">${n?`Después`:`Prioridades`}</h2>
      <ol class="adm-prios">
        ${r.map(({priority:e,index:n})=>{let r=t.includes(e.id);return`
            <li value="${n+1}" class="adm-prio adm-prio--${e.tone} ${r?`is-done`:``}">
              <div class="adm-prio-head">
                <span class="adm-prio-num" aria-hidden="true">${n+1}</span>
                <div class="adm-prio-text">
                  <span class="adm-chip adm-chip--${r?`green`:e.tone}">${J(e.tag)}${r?` · Hecho`:``}</span>
                  <h3>${J(e.short)}</h3>
                </div>
                ${$v(`<p><strong>${J(e.title)}.</strong> ${J(e.detail)}</p>`,`Más info: ${e.short}`)}
              </div>
              <div class="adm-prio-actions">
                <button class="adm-btn adm-btn--ghost" type="button" data-adm-goto="${e.target}">${J(e.targetLabel)}</button>
                <button class="adm-btn ${r?`adm-btn--done`:`adm-btn--soft`}" type="button" data-adm-done="${J(e.id)}" data-adm-done-label="${J(e.short)}" aria-pressed="${r}">
                  ${q(`check`)} ${r?`Hecho`:`Listo`}
                </button>
              </div>
            </li>
          `}).join(``)}
      </ol>
    </section>
  `:``}function Qy(e){let t=[{label:`Perros hoy`,value:e.perrosHoy,tone:`gray`,target:`adm-cumplimiento`},{label:`Entregados`,value:e.entregados,tone:e.entregados?`green`:`gray`,target:`adm-cumplimiento`},{label:`Atrasados`,value:e.late.length,tone:e.late.length?`red`:`gray`,target:`adm-cumplimiento`},{label:`Incidentes`,value:e.incidentes.length,tone:e.incidentes.length?`red`:`gray`,target:`adm-incidentes`}];return`
    <section class="adm-block" aria-labelledby="adm-num-title">
      <div class="adm-h2-row">
        <h2 class="adm-h2" id="adm-num-title">Hoy en números</h2>
        ${$v(`<p>Perros hoy: los que salen según la ruta de hoy (sin contar los “no sale”). Entregados: marcados en la app. Atrasado: pasaron más de ${pv} minutos de la hora prevista y nadie marcó el retiro. Se actualiza solo cada minuto.</p>`,`Qué cuenta cada número`)}
      </div>
      <div class="adm-nums">
        ${t.map(e=>`
          <button class="adm-num adm-num--${e.tone}" type="button" data-adm-goto="${e.target}" data-adm-num="${J(e.label)}">
            <strong>${e.value}</strong>
            <span>${e.label}</span>
          </button>
        `).join(``)}
      </div>
    </section>
  `}function $y(){let{conflicts:e,missing:t,notRouted:n}=Fy(),r=Iy();return`
    <section class="adm-card adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <div class="adm-h2-row">
        <h2 class="adm-h2" id="adm-safety-title">${q(`alertTriangle`)} Seguridad</h2>
        ${$v(`<p>Fuente: BASE RUTAS (${wn}). Siempre visible.</p>
          ${t.length||n.length?`<ul>
            ${t.map(e=>`<li>${J(e.dog)} figura “no juntar con ${J(e.other)}”, pero ${J(e.other)} no está en el registro: ${y}.</li>`).join(``)}
            ${n.map(e=>`<li>${J(e.dog)} y ${J(e.other)}: hoy ${J(e.idle)} no tiene ruta. Si vuelve, revisá el turno.</li>`).join(``)}
          </ul>`:``}`,`Más info de seguridad`)}
      </div>
      ${e.length?`
        <ul class="adm-cross-list" aria-label="Perros marcados no juntar que comparten turno">
          ${e.map(e=>{let t=[e.a,e.b].filter(e=>/día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(x.find(t=>t.name===e)?.review||``));return`
              <li class="adm-cross">
                <span class="adm-cross-dogs">
                  ${ny(ey(null,e.a)?.id,e.a,`sm`)}<strong>${J(e.a)}</strong>
                  <span class="adm-cross-x" aria-label="no juntar con">✕</span>
                  ${ny(ey(null,e.b)?.id,e.b,`sm`)}<strong>${J(e.b)}</strong>
                </span>
                <span class="adm-chip adm-chip--yellow">${J(e.shift)} · ${J(Pv(e.days))}</span>
                ${t.length?`<span class="adm-chip adm-chip--gray">Días a revisar</span>`:``}
              </li>
            `}).join(``)}
        </ul>
      `:`<p class="adm-empty">Sin cruces “no juntar” en BASE RUTAS.</p>`}
      <ul class="adm-dog-chips" aria-label="Perros con indicaciones de seguridad">
        ${r.map(e=>`
          <li>
            ${ny(e.id,e.name,`sm`)}
            <span class="adm-dog-chip-name">${J(e.name)}</span>
            ${ty(e)}
          </li>
        `).join(``)}
      </ul>
    </section>
  `}var eb={pendiente:{label:`Por retirar`,tone:`gray`},retirado:{label:`Retirado`,tone:`blue`},paseando:{label:`Paseando`,tone:`blue`},entregado:{label:`Entregado`,tone:`green`},"no-sale":{label:`No sale`,tone:`yellow`}};function tb(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=Uv(e.actualizadoEn);return`Actualizado por ${By(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||By(e.creadoPor),r=Uv(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function nb(e,{title:t,iconName:n,count:r=null,tone:i=`gray`,open:a=!1,id:o=``},s){return`
    <details class="adm-fold" ${o?`id="${o}" tabindex="-1"`:``} data-adm-fold="${J(e)}" ${Vv(e,a)?`open`:``}>
      <summary>
        <span class="adm-fold-icon">${q(n)}</span>
        <span class="adm-fold-title">${t}</span>
        ${r===null?``:`<span class="adm-count adm-count--${i}">${r}</span>`}
        <span class="adm-chevron">${q(`chevronDown`)}</span>
      </summary>
      <div class="adm-fold-body">${s}</div>
    </details>
  `}function rb(e){let{incidentes:t}=e;if(!t.length)return`<p class="adm-ok-line" id="adm-incidentes" tabindex="-1">${q(`checkCircle`)} Sin incidentes hoy</p>`;let n=[[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <section class="adm-card adm-card--red" id="adm-incidentes" tabindex="-1" aria-labelledby="adm-inc-title">
      <h2 class="adm-h2" id="adm-inc-title">${q(`alertTriangle`)} ${Y(t.length,`incidente hoy`,`incidentes hoy`)}</h2>
      <ul class="adm-list">
        ${t.map(e=>{let t=ey(Array.isArray(e.perros)?e.perros[0]:null,e.perroNombre),r=n.filter(([t])=>e[t]);return`
            <li class="adm-row">
              ${ny(t?.id,e.perroNombre||e.titulo||`!`,`md`)}
              <div class="adm-row-main">
                <strong class="adm-row-title">${J(e.titulo||e.perroNombre||`Incidente`)}</strong>
                <span class="adm-row-meta">${oy(e)?`${J(oy(e))} h · `:``}${J(e.creadoPorNombre||By(e.creadoPor)||``)}</span>
                <span class="adm-chips">
                  ${e.riesgo?`<span class="adm-chip adm-chip--red">Riesgo: ${J(e.riesgo)}</span>`:``}
                  ${e.lesiones?`<span class="adm-chip adm-chip--yellow">Lesiones: ${J(e.lesiones)}</span>`:``}
                </span>
                ${r.length?`
                  <details class="adm-more" data-adm-fold-inner="inc-${J(e.id)}" ${Vv(`inc-${e.id}`)?`open`:``}>
                    <summary>Ver detalle</summary>
                    <dl class="adm-facts-dl">
                      ${r.map(([t,n])=>`<div><dt>${n}</dt><dd>${J(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>`).join(``)}
                    </dl>
                  </details>
                `:``}
              </div>
            </li>
          `}).join(``)}
      </ul>
    </section>
  `}var ib={atrasado:{label:`Atrasado`,tone:`red`},entregado:{label:`Entregado`,tone:`green`},"no-sale":{label:`No sale`,tone:`yellow`}},ab={dia:`Cambio del día`,plantilla:`Plantilla`,planilla:`BASE RUTAS`};function ob(e){return ib[e.status]?ib[e.status]:eb[e.estado]||{label:e.estado,tone:`gray`}}function sb(e){let t=ob(e),n=ey(e.perroId,e.perroNombre),r=e.perroId||n?.id||``,i=[e.status===`atrasado`?`${e.atraso} min tarde`:``,e.paseo?.horaRetiro?`retiro ${e.paseo.horaRetiro}`:``,e.paseo?.horaEntrega?`entrega ${e.paseo.horaEntrega}`:``,e.nota?e.nota:``].filter(Boolean).join(` · `);return`
    <li class="adm-row adm-stop ${e.status===`atrasado`?`is-late`:``}">
      ${ny(r,e.perroNombre,`md`)}
      <div class="adm-row-main">
        <span class="adm-stop-top"><strong class="adm-stop-time">${J(e.hora||`--:--`)}</strong> <strong class="adm-row-title">${J(e.perroNombre||`Perro sin nombre`)}</strong></span>
        <span class="adm-chips">
          <span class="adm-chip adm-chip--${t.tone}">${J(t.label)}${e.paseo?.pendiente?` · sin enviar`:``}</span>
          ${ty(n)}
        </span>
        ${i?`<span class="adm-row-meta">${J(i)}</span>`:``}
      </div>
      ${r&&!_t.de(r)?iy(r,e.perroNombre,{compact:!0}):``}
    </li>
  `}function cb(e){let{route:t,stops:n}=e,r=n.length-e.noSale,i=`ruta-${t.ruta}`,a=[t.paseador?By(t.paseador):`Paseador sin asignar`,t.ayudante?`+ ${By(t.ayudante)}`:``,t.supervisor?`· supervisa ${t.supervisor}`:``].filter(Boolean).join(` `),o=n.filter(e=>e.status===`atrasado`),s=r?e.entregados/r:0;return`
    <article class="adm-route ${o.length?`has-late`:``}" aria-labelledby="adm-route-${J(t.ruta)}">
      <div class="adm-route-head">
        <h3 id="adm-route-${J(t.ruta)}">${J(t.ruta||`Ruta`)} <span>${J(t.turno||``)}</span></h3>
        <span class="adm-chip adm-chip--gray">${J(ab[t.fuente]||``)}</span>
      </div>
      <p class="adm-row-meta">${J(a)}</p>
      ${n.length?`
        <p class="adm-route-progress"><strong>${e.entregados}</strong> de ${r} entregados</p>
        <span class="adm-progress" aria-hidden="true"><span style="--v:${s.toFixed(3)}"></span></span>
        <span class="adm-chips">
          ${e.atrasados?`<span class="adm-chip adm-chip--red">${Y(e.atrasados,`atrasado`,`atrasados`)}</span>`:`<span class="adm-chip adm-chip--green">Sin atrasos</span>`}
          ${e.noSale?`<span class="adm-chip adm-chip--yellow">${e.noSale} no ${e.noSale===1?`sale`:`salen`}</span>`:``}
        </span>
        ${o.length?`<ul class="adm-list adm-list--tight">${o.map(sb).join(``)}</ul>`:``}
        <details class="adm-more" data-adm-fold-inner="${J(i)}" ${Vv(i)?`open`:``}>
          <summary>Ver las ${n.length} paradas</summary>
          <ol class="adm-list adm-list--tight">${n.map(sb).join(``)}</ol>
        </details>
      `:`<p class="adm-empty">Sin paradas cargadas.</p>`}
    </article>
  `}function lb(e){let{compliance:t,effective:n,late:r}=e,i=(t,n)=>{let r=e.shifts.find(e=>e.key===t);return r?.total?`<span class="adm-chip adm-chip--blue">${n}: ${r.retirados} retirados · ${r.paseando} paseando · ${r.pendientes} por retirar</span>`:``},a=[i(`manana`,`Mañana`),i(`tarde`,`Tarde`),i(`otro`,`Sin turno`)].filter(Boolean).join(``);return nb(`rutas`,{title:`Rutas de hoy`,iconName:`route`,count:r.length?`${r.length} tarde`:t.length,tone:r.length?`red`:`gray`,open:r.length>0,id:`adm-cumplimiento`},`
    ${n.fromSheet?`<div class="adm-warn-line">${q(`alertCircle`)} <span>Sin plantilla en la app: horarios de BASE RUTAS.</span> ${$v(`<p>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${y.toLowerCase()}. La plantilla la arma el coordinador.</p>`,`Por qué BASE RUTAS`)}</div>`:``}
    ${a?`<div class="adm-chips adm-chips--wrap">${a}</div>`:``}
    ${!Jv()&&_.cached(`fotos`).length<x.length?`<p class="adm-row-meta">${q(`camera`,`adm-icon-xs`)} “Foto” abre la cámara (necesita señal).</p>`:``}
    ${t.length?`<div class="adm-routes">${t.map(cb).join(``)}</div>`:`<p class="adm-empty">Hoy no hay rutas.</p>`}
  `)}function ub(e){let{pedidosNuevos:t}=e;return nb(`pedidos`,{title:`Pedidos nuevos`,iconName:`message`,count:t.length,tone:t.length?`blue`:`gray`,open:t.length>0,id:`adm-pedidos`},t.length?`
    <ul class="adm-list">
      ${t.slice(0,6).map(t=>{let n=t.carnet?.id||e.carnetsWeb.find(e=>e.pedidoId===t.id)?.id||``;return`
          <li class="adm-row">
            <div class="adm-row-main">
              <strong class="adm-row-title">${J(t.titulo||t.tipo||`Pedido sin título`)}</strong>
              <span class="adm-row-meta">${J(Gv(t.fecha)||Wv(t.creadoEn))} · ${t.origen===`web`?`Web`:J(t.creadoPorNombre||`App`)}</span>
              ${n?`<span class="adm-chips"><span class="adm-chip adm-chip--green">${q(`fileCheck`,`adm-icon-xs`)} Trae carnet</span></span>`:``}
            </div>
            ${n?`<button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-archivo-abrir="${J(n)}" data-adm-area="live" aria-label="Ver el carnet${t.datos?.perro?` de ${J(t.datos.perro)}`:``}">${q(`eye`)} Carnet</button>`:``}
          </li>
        `}).join(``)}
    </ul>
    ${t.length>6?`<p class="adm-row-meta">Y ${Y(t.length-6,`más`,`más`)}. Los responde el coordinador.</p>`:``}
  `:`<p class="adm-empty">Sin pedidos nuevos.</p>`)}var db={"perro suelto":`red`,seguridad:`red`,"obra o corte":`yellow`,clima:`blue`,"cambio de horario":`blue`};function fb(e){let{avisos:t}=e;return nb(`avisos`,{title:`Avisos por barrio`,iconName:`mapPin`,count:t.length,tone:t.length?`yellow`:`gray`,open:t.some(e=>db[e.tipo]===`red`),id:`adm-avisos`},t.length?`
    <ul class="adm-list">
      ${t.map(e=>`
        <li class="adm-row">
          <div class="adm-row-main">
            <span class="adm-chips">
              <strong class="adm-row-title">${J(e.barrio||`Barrio sin indicar`)}</strong>
              <span class="adm-chip adm-chip--${db[e.tipo]||`gray`}">${J(e.tipo||`otro`)}</span>
            </span>
            <span>${J(e.mensaje||e.titulo||``)}</span>
            <span class="adm-row-meta">${e.vigenteHasta?`Hasta ${J(Gv(e.vigenteHasta))}`:`Solo hoy`}${tb(e,!0)?` · ${J(tb(e,!0))}`:``}</span>
          </div>
        </li>
      `).join(``)}
    </ul>
  `:`<p class="adm-empty">Sin avisos vigentes.</p>`)}function pb(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n}/${t.length}`:``}}function mb(e){let{checklists:t}=e,n=t.filter(e=>!pb(e).complete).length;return nb(`checklists`,{title:`Checklists`,iconName:`clipboardCheck`,count:t.length,tone:n?`yellow`:t.length?`green`:`gray`},t.length?`
    <ul class="adm-list">
      ${t.map(e=>{let t=pb(e);return`
          <li class="adm-row">
            <span class="adm-avatar adm-avatar--sm adm-avatar--empty" aria-hidden="true">${J(Zv(e.creadoPorNombre||e.creadoPor))}</span>
            <div class="adm-row-main">
              <strong class="adm-row-title">${J(e.creadoPorNombre||e.creadoPor||`Sin nombre`)}</strong>
              <span class="adm-row-meta">${J(e.turno||`Turno sin indicar`)}</span>
            </div>
            <span class="adm-chip ${t.complete?`adm-chip--green`:`adm-chip--yellow`}">${t.complete?`Completo`:`Incompleto`}${t.text?` ${t.text}`:``}</span>
          </li>
        `}).join(``)}
    </ul>
  `:`<p class="adm-empty">Nadie cargó el checklist hoy.</p>`)}function hb(){let e=G.credential;if(!e)return``;let t=ky(e);return`
    <section class="adm-card adm-cred" id="adm-cred" tabindex="-1" aria-labelledby="adm-cred-title">
      <span class="adm-chip adm-chip--yellow">Solo se ve ahora</span>
      <h2 class="adm-h2" id="adm-cred-title">${e.tipo===`alta`?`Listo: ${J(e.nombre)}`:`PIN nuevo de ${J(e.nombre)}`}</h2>
      <dl class="adm-cred-data">
        <div><dt>Usuario</dt><dd>${J(e.usuario)}</dd></div>
        <div><dt>PIN</dt><dd class="adm-pin-big">${J(e.pin)}</dd></div>
      </dl>
      <a class="adm-btn adm-btn--whatsapp adm-btn--block" href="https://wa.me/?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${q(`message`)} Mandar por WhatsApp</a>
      <div class="adm-btn-row">
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-cred-copy>${q(`copy`)} Copiar</button>
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-cred-hide>${q(`check`)} Listo</button>
      </div>
      ${$v(`<p>Mensaje: “${J(t)}”</p><p>El PIN no queda guardado en la página: al tocar “Listo” desaparece. Si se pierde, generá uno nuevo con “PIN”.</p>`,`Ver el mensaje`)}
    </section>
  `}function gb(e){return`
    <div class="adm-role-picker" role="group" aria-label="Rol de ${J(e.nombre)}">
      ${xy.map(t=>`
        <button class="adm-choice ${t.rol===e.rol?`is-on`:``}" type="button" data-adm-role-set="${J(e.usuario)}" data-adm-rol="${t.rol}" aria-pressed="${t.rol===e.rol}">
          ${q(t.icon)} <span>${J(t.short)}</span>
        </button>
      `).join(``)}
    </div>
  `}function _b(e){let t=!e.activo;return`
    <form class="adm-inline-form" data-adm-form="reset" data-adm-usuario="${J(e.usuario)}" novalidate aria-labelledby="adm-reset-title">
      <p id="adm-reset-title"><strong>${t?`Reactivar`:`PIN nuevo para`} ${J(e.nombre)}</strong></p>
      <div class="adm-pin-row">
        <label class="adm-sr-only" for="adm-reset-pin">PIN nuevo, de 6 a 8 números</label>
        <input class="adm-input adm-input--pin" id="adm-reset-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required placeholder="6 a 8 números" value="${J(K.reset.pin)}" data-adm-draft="reset" data-adm-key="pin" />
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-gen-pin="reset">${q(`key`)} Generar</button>
      </div>
      <div class="adm-btn-row">
        <button class="adm-btn adm-btn--primary" type="submit">${q(`check`)} ${t?`Reactivar`:`Guardar`}</button>
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-reset-cancel>Cancelar</button>
      </div>
      ${t?``:`<p class="adm-row-meta">Se cierra su sesión en todos lados.</p>`}
    </form>
  `}function vb(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${J(e.nombre)}?</strong> No va a poder entrar. Lo que cargó queda.</p>
      <div class="adm-btn-row">
        <button class="adm-btn adm-btn--danger" type="button" data-adm-off-confirm="${J(e.usuario)}">${q(`off`)} Desactivar</button>
        <button class="adm-btn adm-btn--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function yb(e,t){let n=e.usuario===t,r=e.ultimoIngreso?`Entró ${Wv(e.ultimoIngreso)}`:`Nunca entró`;return`
    <li class="adm-user ${e.activo?``:`is-off`}">
      <div class="adm-user-head">
        <span class="adm-avatar adm-avatar--md adm-avatar--empty adm-avatar--person" aria-hidden="true">${J(Zv(e.nombre))}</span>
        <div class="adm-row-main">
          <strong class="adm-row-title">${J(e.nombre)}</strong>
          <span class="adm-row-meta">${J(e.usuario)} · ${J(r)}</span>
        </div>
        <span class="adm-chips adm-chips--end">
          <span class="adm-chip adm-chip--blue">${J(Sy(e.rol))}</span>
          ${e.activo?``:`<span class="adm-chip adm-chip--gray">Desactivado</span>`}
          ${n?`<span class="adm-chip adm-chip--green">Vos</span>`:``}
        </span>
      </div>
      ${n?`
        <div class="adm-btn-row">
          <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/login" data-link>${q(`key`)} Cambiar mi PIN</a>
        </div>
      `:e.activo?`
        <div class="adm-btn-row adm-btn-row--3">
          <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-rolefor="${J(e.usuario)}" aria-expanded="${G.roleFor===e.usuario}">${q(`userCheck`)} Rol</button>
          <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-reset="${J(e.usuario)}" aria-expanded="${G.resetFor===e.usuario}">${q(`key`)} PIN</button>
          <button class="adm-btn adm-btn--ghost adm-btn--sm adm-btn--danger-ghost" type="button" data-adm-off="${J(e.usuario)}">${q(`off`)} Baja</button>
        </div>
      `:`
        <div class="adm-btn-row">
          <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-reset="${J(e.usuario)}" aria-expanded="${G.resetFor===e.usuario}">${q(`refresh`)} Reactivar</button>
        </div>
      `}
      ${!n&&e.activo&&G.roleFor===e.usuario?gb(e):``}
      ${!n&&G.resetFor===e.usuario?_b(e):``}
      ${!n&&G.confirmOff===e.usuario?vb(e):``}
    </li>
  `}var bb={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},xb=[{role:`Admin`,who:Dn.admin,can:[`Ve y decide sobre todo el sistema`,`Usuarios, pagos e indicadores`,`Único rol que ve y carga pagos`]},{role:`Coordinador`,who:`${Dn.coordinador} (${y.toLowerCase()})`,can:[`Armar rutas y horarios (plantilla semanal y cambios del día)`,`Gestionar los clientes de los paseos`,`Atender pedidos y cargar fichas`,`Avisar lo que pasa en cada barrio`,`No ve plata`]},{role:`Supervisor`,who:Dn.supervisor,can:[`Controlar los paseos del momento`,`Quién falta retirar y atrasos contra el horario`,`Entregas, incidentes y equipo`,`Ve las rutas, no las arma`]},{role:`Paseador`,who:Dn.paseador,can:[`Hacer su ruta del turno, en orden y con horario`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`]},{role:`Ayudante de paseador`,who:y,can:[`Acompañar al paseador en su ruta`,`Marcar pasos`,`Reportar incidentes`,`Sin datos de clientes`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function Sb(){let e=Yv().usuario,t=(G.users||[]).slice().sort((e,t)=>String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo),r=t.filter(e=>!e.activo),i;return i=G.users===null&&G.usersLoading?`<p class="adm-empty">Cargando…</p>`:G.users===null?`<p class="adm-empty">No se pudo traer la lista.</p><button class="adm-btn adm-btn--ghost" id="adm-users-refresh" type="button" data-adm-users-refresh>${q(`refresh`)} Reintentar</button>`:t.length?`
      <ul class="adm-users">${n.map(t=>yb(t,e)).join(``)}</ul>
      ${r.length?nb(`inactivos`,{title:`Desactivados`,iconName:`off`,count:r.length},`<ul class="adm-users">${r.map(t=>yb(t,e)).join(``)}</ul>`):``}
    `:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <div class="adm-title-row" id="adm-usuarios" tabindex="-1">
      <h1 id="adm-title" tabindex="-1">Equipo</h1>
      ${G.users?`<span class="adm-count adm-count--gray">${n.length} activos</span>`:``}
      ${$v(`<p>Quién entra a la app y qué ve. Los PIN guardados nunca se muestran.</p><p>Equipo autorizado: ${J(Mv(En.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>`,`Qué es Equipo`)}
    </div>
    ${hb()}
    <button class="adm-btn adm-btn--primary adm-btn--block adm-btn--big" id="adm-crear-abrir" type="button" data-adm-sheet="crear">${q(`userPlus`,`adm-icon`)} Nuevo usuario</button>
    ${G.sheet===`crear`?``:Ay(`users`)}
    ${i}
    ${nb(`roles`,{title:`Qué ve cada rol`,iconName:`eye`},`
      <ul class="adm-role-help">
        ${xy.map(e=>`<li>${q(e.icon)}<div><strong>${J(tt[e.rol])}</strong><span>${J(Cy(e.rol))}</span></div></li>`).join(``)}
      </ul>
    `)}
    ${nb(`equipo`,{title:`Equipo y permisos`,iconName:`users`,count:En.length,id:`adm-equipo`},`
      <ul class="adm-list">
        ${En.map(e=>{let t=bb[e.role];return`
            <li class="adm-row">
              <span class="adm-avatar adm-avatar--sm adm-avatar--empty adm-avatar--person" aria-hidden="true">${J(Zv(e.name))}</span>
              <div class="adm-row-main">
                <strong class="adm-row-title">${J(e.name)}</strong>
                <span class="adm-row-meta">${J(e.label)} · ${t?`<a class="adm-link" href="${t.path}" data-link>Panel ${t.panel}</a>`:`Panel: ${y}`}</span>
                <span class="adm-row-meta">${J(e.tasks)}</span>
              </div>
            </li>
          `}).join(``)}
      </ul>
      <div class="adm-roles">
        ${xb.map(e=>`
          <article class="adm-role">
            <h3>${e.role}</h3>
            <p class="adm-row-meta">${J(e.who)}</p>
            <ul>${e.can.map(e=>`<li>${J(e)}</li>`).join(``)}</ul>
          </article>
        `).join(``)}
      </div>
      <p class="adm-row-meta">Vos decidís la distribución final. Otros paseadores figuran como “Paseador asignado”.</p>
    `)}
  `}function Cb(){let e=K.crear,t=xy.find(t=>t.rol===e.rol);return wb(`crear`,`Nuevo usuario`,`
    <form class="adm-sheet-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-sheet-title">
      <label class="adm-field" for="adm-crear-nombre">
        <span>Nombre</span>
        <input class="adm-input adm-input--big" id="adm-crear-nombre" name="nombre" autocomplete="off" maxlength="60" required placeholder="Ej. Sebastián" value="${J(e.nombre)}" data-adm-draft="crear" data-adm-key="nombre" />
      </label>
      <fieldset class="adm-field">
        <legend>Rol</legend>
        <div class="adm-role-grid">
          ${xy.map(t=>`
            <label class="adm-choice ${t.rol===e.rol?`is-on`:``}">
              <input type="radio" name="rol" value="${t.rol}" ${t.rol===e.rol?`checked`:``} data-adm-draft="crear" data-adm-key="rol" />
              ${q(t.icon)} <span>${J(t.short)}</span>
            </label>
          `).join(``)}
        </div>
        <p class="adm-row-meta" data-adm-role-hint aria-live="polite">${J(t?.line||``)}</p>
      </fieldset>
      <label class="adm-field" for="adm-crear-usuario">
        <span>Usuario <small>para entrar</small></span>
        <input class="adm-input" id="adm-crear-usuario" name="usuario" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="31" required placeholder="Ej. sebastian" value="${J(e.usuario)}" data-adm-draft="crear" data-adm-key="usuario" />
      </label>
      <div class="adm-field">
        <label for="adm-crear-pin"><span>PIN <small>6 a 8 números</small></span></label>
        <div class="adm-pin-row">
          <input class="adm-input adm-input--pin" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${J(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
          <button class="adm-btn adm-btn--ghost" type="button" data-adm-gen-pin="crear">${q(`key`)} Generar PIN</button>
        </div>
      </div>
      ${Ay(`users`)}
      <div class="adm-sheet-foot">
        <button class="adm-btn adm-btn--primary adm-btn--block adm-btn--big" type="submit">${q(`userPlus`)} Crear</button>
      </div>
    </form>
  `)}function wb(e,t,n){return`
    <div class="adm-sheet ${G.sheetEnter?`is-entering`:``}" data-adm-sheet-backdrop>
      <div class="adm-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="adm-sheet-title">
        <div class="adm-sheet-head">
          <h2 id="adm-sheet-title">${J(t)}</h2>
          <button class="adm-btn adm-btn--ghost adm-btn--icon" id="adm-sheet-close" type="button" data-adm-sheet-close aria-label="Cerrar">${q(`x`)}</button>
        </div>
        <div class="adm-sheet-body" data-adm-sheet-kind="${e}">${n}</div>
      </div>
    </div>
  `}function Tb(e,t=!1){let[n,r]=String(e).split(`-`).map(Number);if(!n||!r)return e;let i=new Intl.DateTimeFormat(`es-AR`,{month:t?`short`:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(Date.UTC(n,r-1,15)));return i.charAt(0).toUpperCase()+i.slice(1)}function Eb(e){let t=String(e||``).replace(/[$\s]/g,``);return t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):/^\d{1,3}(\.\d{3})+$/.test(t)&&(t=t.replace(/\./g,``)),/^\d+(\.\d+)?$/.test(t)?Number(t):NaN}function Db(){let e=_.cached(`pagos`,X(`pagos`)).slice().sort((e,t)=>String(t.fecha||``).localeCompare(String(e.fecha||``))||String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),t=v().slice(0,7),n=[...new Set([t,...e.map(e=>String(e.fecha||``).slice(0,7)).filter(e=>/^\d{4}-\d{2}$/.test(e))])].sort().reverse(),r=G.pagosMes&&(G.pagosMes===`todos`||n.includes(G.pagosMes))?G.pagosMes:t,i=r===`todos`?e:e.filter(e=>String(e.fecha||``).startsWith(r)),a=e.filter(e=>!e.pasadoAlLibro),o=i.reduce((e,t)=>e+(Number(t.monto)||0),0),s=e.filter(e=>{let t=G.users?.find(t=>t.usuario===e.creadoPor)?.rol;return t&&t!==`admin`}),c=i.filter(e=>!e.comprobanteId);return{all:e,months:n,mes:r,filtered:i,faltan:a,faltanMes:i.filter(e=>!e.pasadoAlLibro),total:o,deOtros:s,sinComprobanteMes:c}}function Ob(e){let t=G.users?.find(t=>t.usuario===e.creadoPor),n=t&&t.rol!==`admin`,r=Number(e.monto),i=e.monto!==``&&e.monto!==null&&e.monto!==void 0&&Number.isFinite(r);return`
    <li class="adm-pago ${e.pasadoAlLibro?``:`is-missing`}">
      <div class="adm-pago-top">
        <div class="adm-row-main">
          <strong class="adm-row-title">${J(e.concepto||`Sin concepto`)}</strong>
          <span class="adm-row-meta">${J(Gv(e.fecha)||Wv(e.creadoEn)||`Pendiente de confirmar`)}${e.medio?` · ${J(e.medio)}`:``}</span>
        </div>
        <strong class="adm-pago-amount">${i?J(Rn(r)):y}</strong>
      </div>
      ${e.pendiente||n?`
        <span class="adm-chips">
          ${e.pendiente?`<span class="adm-chip adm-chip--blue">Sin enviar</span>`:``}
          ${n?`<span class="adm-chip adm-chip--blue" title="Lo cargó ${J(tt[t.rol]||t.rol)} antes del cambio de roles">Antes del cambio</span>`:``}
        </span>
      `:``}
      <div class="adm-btn-row">
        <button class="adm-btn ${e.pasadoAlLibro?`adm-btn--done`:`adm-btn--soft`} adm-btn--sm" type="button" data-adm-pago-libro="${J(e.id)}" aria-pressed="${e.pasadoAlLibro?`true`:`false`}">
          ${q(`check`)} ${e.pasadoAlLibro?`En el Libro`:`Pasé al Libro`}
        </button>
        ${e.comprobanteId?`
          <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-archivo-abrir="${J(e.comprobanteId)}" data-adm-area="pagos" aria-label="Ver comprobante de ${J(e.concepto||`este pago`)}">${q(`fileCheck`)} Ver comprobante</button>
        `:e.pendiente?``:`
          <label class="adm-btn adm-btn--ghost adm-btn--sm adm-file-button">
            ${q(`camera`)} <span>Comprobante</span>
            <input class="adm-file-input" type="file" accept="${vv}" data-adm-pago-adjuntar="${J(e.id)}" aria-label="Adjuntar comprobante a ${J(e.concepto||`este pago`)}" />
          </label>
        `}
      </div>
    </li>
  `}function kb(e){let t=e.mes===`todos`?`Todos los meses`:Tb(e.mes),n=G.pagosTodos?e.filtered.slice(0,60):e.filtered.slice(0,Sv),r=[...e.months.slice(0,3),`todos`];return e.mes!==`todos`&&!r.includes(e.mes)&&r.splice(3,0,e.mes),`
    <div class="adm-title-row" id="adm-pagos" tabindex="-1">
      <h1 id="adm-title" tabindex="-1">Plata</h1>
      ${$v(`<p>Registro de apoyo para no olvidarte de nada. Fuente oficial: ${gv}. Cada pago se pasa al Libro. Solo vos lo ves.</p>`,`Qué es Plata`)}
    </div>
    <section class="adm-card adm-money" aria-label="Resumen de ${J(t)}">
      <p class="adm-money-label">${J(t)}</p>
      <p class="adm-money-total">${J(Rn(e.total))}</p>
      <span class="adm-chips">
        <span class="adm-chip adm-chip--gray">${Y(e.filtered.length,`pago`,`pagos`)}</span>
        ${e.faltanMes.length?`<span class="adm-chip adm-chip--yellow" data-adm-pagos-faltan>${e.faltanMes.length} sin pasar al Libro</span>`:e.filtered.length?`<span class="adm-chip adm-chip--green" data-adm-pagos-faltan>Todo en el Libro</span>`:``}
        ${e.sinComprobanteMes.length?`<span class="adm-chip adm-chip--gray">${e.sinComprobanteMes.length} sin comprobante</span>`:``}
        ${e.mes!==`todos`&&e.faltan.length>e.faltanMes.length?`<span class="adm-chip adm-chip--yellow">${e.faltan.length-e.faltanMes.length} de otros meses</span>`:``}
      </span>
    </section>
    <button class="adm-btn adm-btn--primary adm-btn--block adm-btn--big" id="adm-pago-abrir" type="button" data-adm-sheet="pago">${q(`plus`,`adm-icon`)} Cargar pago</button>
    ${G.sheet===`pago`?``:Ay(`pagos`)}
    <div class="adm-seg" role="group" aria-label="Mes">
      ${r.map(t=>`<button class="adm-seg-item ${t===e.mes?`is-on`:``}" type="button" data-adm-pagos-mes="${t}" aria-pressed="${t===e.mes}">${t===`todos`?`Todos`:J(Tb(t,!0))}</button>`).join(``)}
    </div>
    ${n.length?`
      <ul class="adm-pagos" aria-label="Pagos de ${J(t)}">${n.map(Ob).join(``)}</ul>
      ${e.filtered.length>n.length?`<button class="adm-btn adm-btn--ghost adm-btn--block" type="button" data-adm-pagos-todos>Ver los ${e.filtered.length}</button>`:``}
    `:`<p class="adm-empty">Sin pagos en ${J(t.toLowerCase())}.</p>`}
    ${e.deOtros.length?`<p class="adm-row-meta">${Y(e.deOtros.length,`pago lo cargó`,`pagos los cargó`)} otro rol antes del cambio de roles (el coordinador ya no ve plata).</p>`:``}
    ${Ab()}
  `}function Ab(){let e=Hy();return nb(`finanzas`,{title:`Facturación teórica`,iconName:`chart`,id:`adm-finanzas`},`
    <p class="adm-money-total adm-money-total--sm">${Rn(e.total)} <small>por semana</small></p>
    <span class="adm-chips"><span class="adm-chip adm-chip--yellow">Teórica · no es lo cobrado</span></span>
    <ul class="adm-list adm-list--tight">
      ${e.byPlan.map(e=>`<li class="adm-row"><div class="adm-row-main"><strong class="adm-row-title">${e.plan.name}</strong><span class="adm-row-meta">${Y(e.count,`perro`,`perros`)}</span></div><strong>${Rn(e.subtotal)}</strong></li>`).join(``)}
    </ul>
    ${$v(`<p>Suma del precio de tabla de ${Y(e.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. Sin descuentos ni acuerdos personales. Lo cobrado está en el ${J(Tn.officialSources.money)}.</p>
      ${e.excluded.length?`<p>No incluye ${Y(e.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${y.toLowerCase()}):</p><ul>${e.excludedPlans.map(t=>`<li>${J(t)}: ${Mv(e.excluded.filter(e=>e.plan===t).map(e=>J(e.name)))}.</li>`).join(``)}</ul>`:``}`,`Cómo se calcula`)}
  `)}function jb(){return v(new Date(Date.now()-bv))}function Mb(){let e=K.pagoArchivo,t=Jv();return e?`
      <p class="adm-file-chosen">
        ${q(e.type===`application/pdf`?`fileText`:`fileCheck`)}
        <span><strong>${J(e.name||`Comprobante`)}</strong>${Kv(e.size)?` · ${J(Kv(e.size))}`:``}${K.pagoSubido?` · ya subido`:``}</span>
        <button class="adm-btn adm-btn--ghost adm-btn--sm" id="adm-pago-archivo-quitar" type="button" data-adm-pago-quitar>${q(`x`)} Quitar</button>
      </p>
    `:`
    <label class="adm-btn adm-btn--soft adm-btn--block adm-file-button">
      ${q(`camera`)} <span>Sacar foto del comprobante</span>
      <input class="adm-file-input" id="adm-pago-foto" type="file" accept="image/*" capture="environment" data-adm-pago-archivo />
    </label>
    <label class="adm-btn adm-btn--link adm-file-button">
      ${q(`fileUp`)} <span>Elegir archivo</span>
      <input class="adm-file-input" id="adm-pago-archivo" type="file" accept="${vv}" data-adm-pago-archivo />
    </label>
    <p class="adm-row-meta">${t?`Sin señal no se sube: guardalo sin comprobante y adjuntalo después.`:`Opcional. Foto o PDF, hasta 3,5 MB.`}</p>
  `}function Nb(){let e=K.pago,t=v(),n=jb(),r=Eb(e.monto),i=e.medioSel===`Otro`;return wb(`pago`,`Cargar pago`,`
    <form class="adm-sheet-form" id="adm-pago-form" data-adm-form="pago" novalidate aria-labelledby="adm-sheet-title">
      <label class="adm-field" for="adm-pago-monto">
        <span>Monto</span>
        <span class="adm-money-input">
          <span aria-hidden="true">$</span>
          <input class="adm-input adm-input--money" id="adm-pago-monto" inputmode="numeric" autocomplete="off" maxlength="15" required placeholder="0" value="${J(e.monto)}" data-adm-draft="pago" data-adm-key="monto" aria-describedby="adm-monto-preview" />
        </span>
        <span class="adm-row-meta" id="adm-monto-preview" data-adm-monto-preview>${Number.isFinite(r)&&r>0?J(Rn(r)):`Solo números`}</span>
      </label>
      <fieldset class="adm-field">
        <legend>Medio</legend>
        <div class="adm-seg adm-seg--wrap">
          ${[...mv,`Otro`].map(t=>`
            <label class="adm-seg-item ${e.medioSel===t?`is-on`:``}">
              <input type="radio" name="medio" value="${J(t)}" ${e.medioSel===t?`checked`:``} data-adm-draft="pago" data-adm-key="medioSel" />
              ${J(t)}
            </label>
          `).join(``)}
        </div>
        ${i?`<label class="adm-sr-only" for="adm-pago-medio-otro">Otro medio</label><input class="adm-input" id="adm-pago-medio-otro" autocomplete="off" maxlength="40" placeholder="¿Cuál?" value="${J(e.medioOtro)}" data-adm-draft="pago" data-adm-key="medioOtro" />`:``}
      </fieldset>
      <div class="adm-field">
        <label for="adm-pago-concepto"><span>Concepto</span></label>
        <div class="adm-seg adm-seg--wrap" role="group" aria-label="Conceptos rápidos">
          ${hv.map(t=>`<button class="adm-seg-item ${e.concepto===t?`is-on`:``}" type="button" data-adm-concepto="${J(t)}" aria-pressed="${e.concepto===t}">${J(t)}</button>`).join(``)}
        </div>
        <input class="adm-input" id="adm-pago-concepto" autocomplete="off" maxlength="120" required placeholder="Ej. Plan 2, semana del 09/11" value="${J(e.concepto)}" data-adm-draft="pago" data-adm-key="concepto" />
      </div>
      <fieldset class="adm-field">
        <legend>Fecha</legend>
        <div class="adm-seg adm-seg--wrap">
          <button class="adm-seg-item ${e.fecha===t?`is-on`:``}" type="button" data-adm-fecha="${t}" aria-pressed="${e.fecha===t}">Hoy</button>
          <button class="adm-seg-item ${e.fecha===n?`is-on`:``}" type="button" data-adm-fecha="${n}" aria-pressed="${e.fecha===n}">Ayer</button>
          <label class="adm-seg-item adm-date-pick ${e.fecha!==t&&e.fecha!==n?`is-on`:``}" for="adm-pago-fecha">
            ${q(`calendarCheck`)} <span>${e.fecha!==t&&e.fecha!==n&&e.fecha?J(Gv(e.fecha)):`Otra`}</span>
            <input class="adm-date-native" id="adm-pago-fecha" type="date" required value="${J(e.fecha)}" data-adm-draft="pago" data-adm-key="fecha" aria-label="Otra fecha. Elegida: ${J(Gv(e.fecha)||`ninguna`)}" />
          </label>
        </div>
      </fieldset>
      <div class="adm-field">
        <span class="adm-field-label">Comprobante</span>
        ${Mb()}
      </div>
      <label class="adm-switch" for="adm-pago-libro">
        <input id="adm-pago-libro" type="checkbox" ${e.pasadoAlLibro?`checked`:``} data-adm-draft="pago" data-adm-key="pasadoAlLibro" />
        <span class="adm-switch-ui" aria-hidden="true"></span>
        <span>Ya está en el Libro</span>
      </label>
      ${Ay(`pagos`)}
      <div class="adm-sheet-foot">
        <button class="adm-btn adm-btn--primary adm-btn--block adm-btn--big" id="adm-pago-guardar" type="submit" aria-disabled="${G.savingPago}">
          ${q(`check`)} ${G.savingPago?K.pagoArchivo&&!K.pagoSubido?`Subiendo…`:`Guardando…`:`Guardar pago`}
        </button>
      </div>
    </form>
  `)}function Pb(){return{conFoto:x.filter(e=>_t.de(e.id)).length,total:x.length}}function Fb(){if(G.mas&&Tv[G.mas])return Ib(G.mas);let e=Pb(),t=Vb().nuevos.length,n=Ly().length;return`
    <div class="adm-title-row">
      <h1 id="adm-title" tabindex="-1">Más</h1>
    </div>
    <div class="adm-tiles">
      ${[{id:`fotos`,sub:`${e.conFoto} de ${e.total}`,tone:e.conFoto<e.total?`yellow`:`green`},{id:`carga`,sub:`${Py().weekTotal} salidas`},{id:`planes`,sub:`${kn.length} planes`},{id:`archivos`,sub:t?`${t} nuevos`:`${Vb().all.length}`,tone:t?`blue`:``},{id:`datos`,sub:`${n} perros`,tone:n?`yellow`:``},{id:`clientes`,sub:`${Jb().totals.activo} activos`},{id:`indicadores`,sub:`Con fuente`}].map(e=>`
        <button class="adm-tile" type="button" data-adm-mas="${e.id}">
          <span class="adm-tile-icon">${q(Tv[e.id].icon,`adm-icon`)}</span>
          <strong>${J(Tv[e.id].title)}</strong>
          <span class="${e.tone?`adm-chip adm-chip--${e.tone}`:`adm-row-meta`}">${J(e.sub)}</span>
        </button>
      `).join(``)}
      <button class="adm-tile" type="button" data-a11y-toggle aria-controls="a11y-panel">
        <span class="adm-tile-icon">${q(`eye`,`adm-icon`)}</span>
        <strong>Tema y movimiento</strong>
        <span class="adm-row-meta">Oscuro, calmo</span>
      </button>
      <button class="adm-tile" type="button" data-adm-copy>
        <span class="adm-tile-icon">${q(`copy`,`adm-icon`)}</span>
        <strong>Copiar resumen</strong>
        <span class="adm-row-meta">Para WhatsApp</span>
      </button>
    </div>
    <h2 class="adm-h2">Ver como</h2>
    <div class="adm-btn-row adm-btn-row--3">
      <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/coordinador" data-link>${q(`route`)} Coordina</a>
      <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/supervisor" data-link>${q(`radar`)} Supervisa</a>
      <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/paseador" data-link>${q(`pawPrint`)} Pasea</a>
    </div>
    <div class="adm-btn-row">
      <a class="adm-btn adm-btn--ghost adm-btn--sm" href="/login" data-link>${q(`key`)} Cambiar mi PIN</a>
    </div>
    <div class="adm-foot">Datos al ${wn}. ${$v(`<p>Perros: ${J(Tn.officialSources.dogs)}. Rutas: ${J(Tn.officialSources.routes)}. Plata: ${J(Tn.officialSources.money)}.</p><p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${gv}.</p>`,`Fuentes`)}</div>
  `}function Ib(e){let t=Tv[e],n={fotos:Lb,carga:Rb,planes:zb,archivos:Gb,datos:Kb,clientes:Yb,indicadores:Zb}[e]();return`
    <button class="adm-btn adm-btn--link adm-back" type="button" data-adm-mas-back>${q(`arrowLeft`)} Más</button>
    <section class="adm-view" id="adm-${e===`planes`?`precios`:e}" tabindex="-1" aria-labelledby="adm-title">
      <h1 id="adm-title" tabindex="-1">${J(t.title)}</h1>
      ${n}
    </section>
  `}function Lb(){let{conFoto:e,total:t}=Pb(),n=x.filter(e=>!_t.de(e.id)),r=G.fotosFiltro===`todos`||!n.length?`todos`:`faltan`,i=(r===`faltan`?n:x).slice().sort((e,t)=>(e.status===`Activo`?0:1)-(t.status===`Activo`?0:1)||e.name.localeCompare(t.name));return`
    <div class="adm-photo-progress">
      <p><strong>${e} de ${t}</strong> con foto</p>
      <span class="adm-progress" aria-hidden="true"><span style="--v:${(t?e/t:0).toFixed(3)}"></span></span>
    </div>
    <p class="adm-row-meta">${q(`camera`,`adm-icon-xs`)} ${Jv()?`Sin señal: las fotos no se pueden subir ahora.`:`Las fotos necesitan señal.`}</p>
    <div class="adm-seg" role="group" aria-label="Qué perros mostrar">
      <button class="adm-seg-item ${r===`faltan`?`is-on`:``}" type="button" data-adm-fotos-filtro="faltan" aria-pressed="${r===`faltan`}" ${n.length?``:`disabled`}>Faltan (${n.length})</button>
      <button class="adm-seg-item ${r===`todos`?`is-on`:``}" type="button" data-adm-fotos-filtro="todos" aria-pressed="${r===`todos`}">Todos (${t})</button>
    </div>
    ${Ay(`fotos`)}
    <ul class="adm-photo-grid">
      ${i.map(e=>{let t=ry(e.id),n=t?.miniatura||null;return`
          <li class="adm-photo ${e.status===`Activo`?``:`is-inactive`}" data-adm-foto-card="${J(e.id)}">
            ${n&&t?.archivoId?`<button class="adm-photo-img" type="button" data-adm-foto-ver="${J(t.archivoId)}" aria-label="Ver la foto grande de ${J(e.name)}"><img src="${J(n)}" alt="" loading="lazy" /></button>`:n?`<span class="adm-photo-img"><img src="${J(n)}" alt="Foto de ${J(e.name)}" loading="lazy" /></span>`:`<span class="adm-photo-img adm-photo-img--empty" aria-hidden="true">${J(Zv(e.name))}</span>`}
            <strong class="adm-photo-name">${J(e.name)}</strong>
            ${e.status===`Activo`?ty(e):`<span class="adm-chip adm-chip--gray">${J(e.status)}</span>`}
            ${iy(e.id,e.name,{change:!!n})}
          </li>
        `}).join(``)}
    </ul>
    ${i.length?``:`<p class="adm-empty">Todos tienen foto.</p>`}
  `}function Rb(){let e=Py();return`
    <span class="adm-chips"><span class="adm-chip adm-chip--blue">Más carga: ${J(e.busiest.length?Mv(e.busiest):`Sin datos`)} (${e.maxTotal})</span><span class="adm-chip adm-chip--gray">${e.weekTotal} salidas</span></span>
    <div class="adm-load-legend" aria-hidden="true"><span class="adm-dot"></span> Mañana <span class="adm-dot adm-dot--tarde"></span> Tarde</div>
    <ul class="adm-load" aria-label="Perros por día y turno">
      ${e.rows.map(t=>`
          <li class="adm-load-row ${e.busiest.includes(t.day)?`is-busiest`:``}">
            <strong class="adm-load-day">${Nv[t.day]}<span class="adm-sr-only"> (${t.day})</span></strong>
            <span class="adm-load-bars">
              <span class="adm-bar-cell"><span class="adm-bar" style="--v:${(t.morning/e.maxShift).toFixed(3)}" aria-hidden="true"></span><span class="adm-bar-value"><span class="adm-sr-only">Mañana: </span>${t.morning}</span></span>
              <span class="adm-bar-cell"><span class="adm-bar adm-bar--tarde" style="--v:${(t.afternoon/e.maxShift).toFixed(3)}" aria-hidden="true"></span><span class="adm-bar-value"><span class="adm-sr-only">Tarde: </span>${t.afternoon}</span></span>
            </span>
            <strong class="adm-load-total"><span class="adm-sr-only">Total: </span>${t.total||`—`}</strong>
          </li>
        `).join(``)}
    </ul>
    ${$v(`<p>Perros por día y turno, de BASE RUTAS (${wn}). Solo perros activos.</p>
      <p>${Mv(e.twoShifts.map(e=>J(e.name)))} ${e.twoShifts.length===1?`sale`:`salen`} en los dos turnos: cuentan dos veces en el total.</p>
      <p>Mañana: ruta ${b.manana.route} (${b.manana.from} a ${b.manana.to}), supervisa ${b.manana.supervisor}. Tarde: rutas ${b.tarde.routes.join(` y `)} (${b.tarde.from} a ${b.tarde.to}), supervisa ${b.tarde.supervisor}.</p>
      <p>Máximo diario histórico: ${J(Pn.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros.</p>`,`Cómo se cuenta`)}
  `}function zb(){return`
    <ul class="adm-plans">
      ${kn.map(e=>`
        <li class="adm-card adm-plan">
          <div class="adm-plan-head"><strong>${e.name}</strong><span class="adm-chip adm-chip--gray">${e.walks} paseos/sem</span></div>
          <dl class="adm-plan-prices">
            ${cv.map(t=>`<div><dt>${t}</dt><dd>${Rn(e.prices[t])}</dd></div>`).join(``)}
          </dl>
        </li>
      `).join(``)}
      <li class="adm-card adm-plan">
        <div class="adm-plan-head"><strong>Paseo suelto</strong><span class="adm-chip adm-chip--gray">Individual / grupo</span></div>
        <dl class="adm-plan-prices">
          ${cv.map(e=>`<div><dt>${e}</dt><dd>${Rn(An[e].individual)}<small>${Rn(An[e].grupo)}</small></dd></div>`).join(``)}
        </dl>
      </li>
    </ul>
    <h2 class="adm-h2">Varios perros</h2>
    <div class="adm-chips adm-chips--wrap">
      ${jn.map(e=>`<span class="adm-chip adm-chip--green">${e.dogs} perros: −${e.discount}</span>`).join(``)}
    </div>
    ${$v(`<p>Precio semanal por perro según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p><p>En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${y.toLowerCase()}.</p>`,`Fuente de los precios`)}
  `}var Bb={drive:`Drive`,vercel:`Vercel (provisorio)`,local:`Servidor de prueba`};function Vb(){let e=_.cached(`archivos`,X(`archivos`)).slice().sort(qv),t=G.archivosTipo!==`todos`&&_v[G.archivosTipo]?G.archivosTipo:`todos`;return{all:e,tipo:t,filtered:t===`todos`?e:e.filter(e=>e.tipo===t),counts:Object.fromEntries(Object.keys(_v).map(t=>[t,e.filter(e=>e.tipo===t).length])),enVercel:e.filter(e=>e.ubicacion===`vercel`).length,enPrueba:e.filter(e=>e.ubicacion===`local`).length,nuevos:e.filter(e=>Date.now()-Date.parse(e.creadoEn||``)<bv)}}function Hb(e){let t=[];if(e.clienteId){let n=_.cached(`clientes`,X(`clientes`)).find(t=>t.id===e.clienteId);t.push(`Cliente: ${n?.nombre||e.clienteId}`)}if(e.pedidoId){let n=_.cached(`pedidos`,X(`pedidos`)).find(t=>t.id===e.pedidoId),r=n?{nuevo:`nuevo`,"en-curso":`en curso`,resuelto:`resuelto`}[n.estado||`nuevo`]||n.estado:``;t.push(n?`Pedido: ${n.titulo||n.tipo||`sin título`}${r?` (${r})`:``}`:`Pedido de la web`)}let n=Ub(e);return n&&t.push(`Pago: ${n.concepto||`sin concepto`}${n.fecha?` del ${Gv(n.fecha)}`:``}`),t}function Ub(e){return e.tipo===`comprobante de pago`&&_.cached(`pagos`,X(`pagos`)).find(t=>t.comprobanteId===e.id)||null}function Wb(e){let t=_v[e.tipo]||{label:e.tipo||`Archivo`,tone:`gray`},n=Hb(e),r=e.creadoPor===`web`?`Web`:e.creadoPorNombre||By(e.creadoPor)||``,i=e.creadoEn?Wv(e.creadoEn):Gv(e.fecha),a=Date.now()-Date.parse(e.creadoEn||``)<bv,o=`${t.label}${e.perroNombre?` de ${e.perroNombre}`:``}`,s=/^https:\/\//i.test(e.driveUrl||``)?e.driveUrl:``,c=ey(e.perroId,e.perroNombre);return`
    <li class="adm-row adm-archivo">
      ${e.perroId||e.perroNombre?ny(c?.id||e.perroId,e.perroNombre||`?`,`md`):`<span class="adm-avatar adm-avatar--md adm-avatar--empty" aria-hidden="true">${q(e.mime===`application/pdf`?`fileText`:`fileUp`)}</span>`}
      <div class="adm-row-main">
        <strong class="adm-row-title">${J(e.perroNombre||Ub(e)?.concepto||e.nombreOriginal||e.nombreArchivo||t.label)}</strong>
        <span class="adm-chips">
          <span class="adm-chip adm-chip--${t.tone}">${J(t.label)}</span>
          ${a?`<span class="adm-chip adm-chip--blue">Nuevo</span>`:``}
          ${e.ubicacion&&e.ubicacion!==`drive`?`<span class="adm-chip adm-chip--gray">${J(Bb[e.ubicacion]||e.ubicacion)}</span>`:``}
        </span>
        <span class="adm-row-meta">${J([r,i,Kv(e.tamano),...n].filter(Boolean).join(` · `))}${s?` · <a class="adm-link" href="${J(s)}" target="_blank" rel="noopener noreferrer">Drive<span class="adm-sr-only"> (se abre en otra pestaña)</span></a>`:``}</span>
      </div>
      <button class="adm-btn adm-btn--ghost adm-btn--sm" type="button" data-adm-archivo-abrir="${J(e.id)}" data-adm-area="archivos" aria-label="Abrir ${J(o)}">${q(`eye`)} Abrir</button>
    </li>
  `}function Gb(){let e=Vb(),t=e.filtered.slice(0,xv),n=e.tipo===`todos`?``:` de tipo “${_v[e.tipo].label.toLowerCase()}”`;return`
    ${Jv()?`<p class="adm-warn-line">${q(`alertCircle`)} <span>Sin señal: para abrir archivos hace falta señal.</span></p>`:``}
    ${e.enVercel||e.enPrueba?`<div class="adm-warn-line">${q(`alertCircle`)} <span>${e.enVercel+e.enPrueba} fuera de Drive.</span> ${$v(`<p>${Mv([e.enVercel?`${e.enVercel===1?`1 archivo está guardado`:`${e.enVercel} archivos están guardados`} en Vercel (provisorio)`:``,e.enPrueba?`${e.enPrueba===1?`1 archivo está`:`${e.enPrueba} archivos están`} en el servidor de prueba`:``].filter(Boolean))}. Cuando se conecte la planilla, los nuevos van a tu Google Drive; los que ya llegaron quedan donde están.</p>`,`Dónde están los archivos`)}</div>`:``}
    ${e.all.length?`
      <div class="adm-seg adm-seg--wrap" role="group" aria-label="Tipo de archivo">
        <button class="adm-seg-item ${e.tipo===`todos`?`is-on`:``}" type="button" data-adm-archivos-tipo="todos" aria-pressed="${e.tipo===`todos`}">Todos (${e.all.length})</button>
        ${Object.entries(_v).filter(([t])=>e.counts[t]).map(([t,n])=>`<button class="adm-seg-item ${e.tipo===t?`is-on`:``}" type="button" data-adm-archivos-tipo="${J(t)}" aria-pressed="${e.tipo===t}">${J(n.label)} (${e.counts[t]})</button>`).join(``)}
      </div>
    `:``}
    ${Ay(`archivos`)}
    ${t.length?`
      <ul class="adm-list" aria-label="Archivos${J(n)}">${t.map(Wb).join(``)}</ul>
      ${e.filtered.length>t.length?`<p class="adm-row-meta">Últimos ${t.length} de ${e.filtered.length}.</p>`:``}
    `:`<p class="adm-empty">${e.all.length?`No hay archivos de este tipo.`:`Todavía no llegó ningún archivo.`}</p>`}
    ${$v(`<p>Carnets de vacunas, comprobantes y documentos que manda la gente desde el formulario de la web o que sube el equipo. Los comprobantes de pago los abrís solo vos.</p>`,`Qué hay acá`)}
  `}function Kb(){return`
    <ul class="adm-list">
      ${Ly().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)).map(e=>`
        <li class="adm-row">
          ${ny(e.id,e.name,`md`)}
          <div class="adm-row-main">
            <span class="adm-chips"><strong class="adm-row-title">${J(e.name)}</strong><span class="adm-chip ${e.status===`Activo`?`adm-chip--gray`:`adm-chip--yellow`}">${J(e.status)}</span></span>
            <span>${J(e.review||`Pendiente de confirmar`)}</span>
            <span class="adm-row-meta">${J(e.id)} · ${J(e.plan)}</span>
          </div>
        </li>
      `).join(``)}
    </ul>
    ${$v(`<p>Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${J(Tn.officialSources.dogs)}).</p>`,`De dónde salen`)}
  `}var qb=[[`activo`,`Activos`],[`pausa`,`Pausa`],[`baja`,`Baja`]];function Jb(){let e=_.cached(`clientes`,X(`clientes`)),t=new Map;e.forEach(e=>{let n=String(e.barrio||``).trim()||`Sin barrio`;t.has(n)||t.set(n,{barrio:n,activo:0,pausa:0,baja:0,otro:0});let r=t.get(n),i=String(e.estado||``).toLowerCase();qb.some(([e])=>e===i)?r[i]+=1:r.otro+=1});let n=[...t.values()].sort((e,t)=>t.activo-e.activo||e.barrio.localeCompare(t.barrio)),r={activo:0,pausa:0,baja:0,otro:0};return n.forEach(e=>Object.keys(r).forEach(t=>{r[t]+=e[t]})),{total:e.length,rows:n,totals:r}}function Yb(){let e=Jb(),t=e.totals.otro>0;return e.total?`
    <span class="adm-chips">
      <span class="adm-chip adm-chip--green">${e.totals.activo} activos</span>
      <span class="adm-chip adm-chip--yellow">${e.totals.pausa} en pausa</span>
      <span class="adm-chip adm-chip--gray">${e.totals.baja} de baja</span>
    </span>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <caption class="adm-sr-only">Clientes por barrio y estado</caption>
        <thead>
          <tr><th scope="col">Barrio</th>${qb.map(([,e])=>`<th scope="col">${e}</th>`).join(``)}${t?`<th scope="col">Otro</th>`:``}</tr>
        </thead>
        <tbody>
          ${e.rows.map(e=>`
            <tr><th scope="row">${J(e.barrio)}</th>${qb.map(([t])=>`<td>${e[t]}</td>`).join(``)}${t?`<td>${e.otro}</td>`:``}</tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
    ${$v(`<p>Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>`,`Qué es`)}
  `:`<p class="adm-empty">El coordinador todavía no cargó clientes.</p>`}function Xb(e){return/meta/i.test(e)?`blue`:/hist/i.test(e)?`gray`:/calc/i.test(e)?`yellow`:`green`}function Zb(){let e=Ny(),t=Py(),n=e.filter(e=>e.category===`SIN EVALUAR`).length,r=[{label:`Perros con ruta activa`,value:String(e.length),source:`Calculado de BASE RUTAS, ${wn}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(t.weekTotal),source:`Calculado de BASE RUTAS, ${wn}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${e.length-n} de ${e.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}];return`
    <ul class="adm-facts">
      ${[...Pn,...r].map(e=>`
        <li class="adm-fact">
          <strong class="adm-fact-value">${J(e.value)}</strong>
          <span class="adm-fact-label">${J(e.label)}</span>
          <span class="adm-chip adm-chip--${Xb(e.kind)}" title="Fuente: ${J(e.source)}">${J(e.kind)}</span>
          <span class="adm-row-meta">${J(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    ${nb(`categorias`,{title:`Categorías de conducta`,iconName:`help`},`
      <dl class="adm-categories">
        ${Object.entries(Mn).map(([e,t])=>`<div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${J(t)}</dd></div>`).join(``)}
      </dl>
    `)}
  `}function Qb(){let{dayName:e,date:t}=Fv(),n=my(),r=Vy(n),i=Rv(),a=r.find(e=>!i.includes(e.id)),o=Py(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,`Perros atrasados (más de ${pv} min sin retiro): ${n.late.length}. Avisos por barrio vigentes: ${n.avisos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${Mv(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${wn}.`].join(`
`)}async function $b(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function ex(e){Dv=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=Dv)},60)}function tx(){window.scrollTo({top:0,behavior:`auto`})}function nx(){requestAnimationFrame(()=>(document.getElementById(`adm-title`)||document.getElementById(`adm-main`))?.focus({preventScroll:!0}))}function rx(e,t=null){G.tab=e,G.mas=e===`mas`?t:null,G.sheet=null,Bv()}function ix(e){let[t,n=null]=Ev[e]||[`inicio`];(G.tab!==t||G.mas!==n)&&(rx(t,n),$());let r=document.getElementById(e)||document.getElementById(`adm-main`);if(!r)return;r.tagName===`DETAILS`&&!r.open&&(r.open=!0,r.dataset.admFold&&Hv(r.dataset.admFold,!0));let i=document.documentElement.dataset.motion===`calm`;r.scrollIntoView({behavior:i?`auto`:`smooth`,block:`start`}),(r.tagName===`DETAILS`?r.querySelector(`summary`):r)?.focus({preventScroll:!0})}function ax(){G.credential=null,G.users=null,G.usersError=``,G.sheet=null,G.undo=null,clearTimeout(Ov),G.liveDay=null,G.adminLoaded=!1,G.pagosMes=null,G.archivosTipo=`todos`,K.pago=kv(),K.pagoArchivo=null,K.pagoSubido=null,K.crear=Av()}function ox(e){return e.target.closest(`[data-admin-logout]`)?(ax(),kx(`/salir`),!0):(e.target.closest(`.adm-shell [data-link]`)&&(G.sheet=null),!1)}function sx(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function cx(e,t){G.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}function lx(e,t){G.sheet=e,G.sheetReturn=t?.id?`#${CSS.escape(t.id)}`:e===`pago`?`#adm-pago-abrir`:`#adm-crear-abrir`,e===`crear`&&(G.credential=null,K.crear.pin||(K.crear.pin=Oy()),Z(`users`,``)),e===`pago`&&Z(`pagos`,``),G.sheetEnter=!0,$(),G.sheetEnter=!1,sx(e===`pago`?`#adm-pago-monto`:`#adm-crear-nombre`)}function ux(){let e=G.sheetReturn;G.sheet=null,$(),e&&sx(e)}async function dx(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),G.busy))return;let n=t.dataset.admForm;if(n===`pago`)await fx();else if(n===`crear`){let e=K.crear,n=e.nombre.trim(),r=Ty(e.usuario),i=e.pin.trim(),a=``,o=``;if(n.length<2?[a,o]=[`Escribí el nombre.`,`#adm-crear-nombre`]:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?G.users?.some(e=>e.usuario===r)?[a,o]=[`Ya existe “${r}”. Elegí otro usuario.`,`#adm-crear-usuario`]:tt[e.rol]?[a,o]=[Dy(i),`#adm-crear-pin`]:a=`Elegí un rol.`:[a,o]=[`Usuario: 3 a 31 letras o números, sin espacios, empezando con letra.`,`#adm-crear-usuario`],a){Z(`users`,a,!0),Q(),o&&sx(o);return}cx(t,!0);try{let t=await rt.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});G.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},K.crear=Av(),G.sheet=null,Z(`users`,`Listo: se creó ${t.usuario}.`),G.busy=!1,await wy(),sx(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),G.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=G.users?.find(t=>t.usuario===e),r=K.reset.pin.trim(),i=n?Dy(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}cx(t,!0);try{let t=!n.activo;await rt.save({usuario:e,pin:r,...t?{activo:!0}:{}}),G.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},G.resetFor=null,K.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo.`:`Listo: ${n.nombre} tiene PIN nuevo.`),G.busy=!1,await wy(),tx(),sx(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),G.busy=!1,Q()}}}async function fx(){let e=K.pago,t=e.concepto.trim(),n=(e.medioSel===`Otro`?e.medioOtro:e.medioSel||``).trim(),r=Eb(e.monto),i=K.pagoArchivo,a=``,o=``;if(!Number.isFinite(r)||r<=0?[a,o]=[`Escribí el monto (solo números).`,`#adm-pago-monto`]:t.length<2?[a,o]=[`Elegí o escribí el concepto.`,`#adm-pago-concepto`]:/^\d{4}-\d{2}-\d{2}$/.test(e.fecha)?i&&!K.pagoSubido&&Jv()&&([a,o]=[`Sin señal no se sube el comprobante. Tocá “Quitar” y adjuntalo después.`,`#adm-pago-archivo-quitar`]):[a,o]=[`Elegí la fecha.`,`#adm-pago-fecha`],a){Z(`pagos`,a,!0),Q(),o&&sx(o);return}G.busy=!0,G.savingPago=!0;let s=K.pagoSubido?.id||``;if(i&&!s){Z(`pagos`,`Subiendo el comprobante…`),Q();try{let e=await ht.subir(`comprobante de pago`,i);s=e.id,K.pagoSubido={id:e.id}}catch(e){Z(`pagos`,`No se pudo subir el comprobante: ${e.message||`error del servidor.`} El pago no se guardó: probá de nuevo o tocá “Quitar”.`,!0),G.busy=!1,G.savingPago=!1,Q();return}}try{let i=await _.save(`pagos`,{fecha:e.fecha,concepto:t,monto:r,medio:n,pasadoAlLibro:e.pasadoAlLibro===!0,...s?{comprobanteId:s}:{}});K.pago=kv(),K.pagoArchivo=null,K.pagoSubido=null,G.pagosMes=e.fecha.slice(0,7),G.sheet=null,Z(`pagos`,i.pendiente?`Se enviará cuando haya señal.`:`Listo: ${Rn(r)} guardado${s?` con comprobante`:``}${e.pasadoAlLibro?``:`. Falta pasarlo al Libro`}.`),sx(`#adm-pago-abrir`)}catch(e){Z(`pagos`,`${e.message||`No se pudo guardar el pago.`}${s?` El comprobante ya se subió: no se sube otra vez.`:``}`,!0)}finally{G.busy=!1,G.savingPago=!1,Q()}}function px(e){let t=e.files?.[0];e.value=``,t&&(yv.test(t.type)?t.type===`application/pdf`&&t.size>3670016?(Z(`pagos`,`El PDF pesa mucho (máximo 3,5 MB). Probá con una captura.`,!0),Q()):(K.pagoArchivo=t,K.pagoSubido=null,Z(`pagos`,`Comprobante listo. Se sube al guardar.`),Q(),sx(`#adm-pago-archivo-quitar`)):(Z(`pagos`,`Solo fotos (JPG, PNG, WEBP) o PDF.`,!0),Q()))}async function mx(e){let t=e.dataset.admPagoAdjuntar,n=e.files?.[0];e.value=``;let r=_.cached(`pagos`,X(`pagos`)).find(e=>e.id===t);if(!n||!r)return;let i=`${r.concepto||`el pago`}${r.fecha?` del ${Gv(r.fecha)}`:``}`,a=``;if(G.busy?a=`Esperá a que termine lo que se está guardando.`:yv.test(n.type)?Jv()&&(a=`Sin señal no se sube el comprobante. Probá cuando vuelva.`):a=`Solo fotos (JPG, PNG, WEBP) o PDF.`,a){Z(`pagos`,a,!0),Q();return}G.busy=!0,Z(`pagos`,`Subiendo el comprobante de ${i}…`),Q();let o=null;try{o=await ht.subir(`comprobante de pago`,n),Z(`pagos`,(await _.save(`pagos`,{id:t,fecha:r.fecha,comprobanteId:o.id})).pendiente?`Comprobante subido. El cambio se enviará cuando haya señal.`:`Listo: ${i} tiene comprobante.`)}catch(e){Z(`pagos`,`${o?`El comprobante se subió pero no se pudo vincular al pago`:`No se pudo subir el comprobante`}: ${e.message||`error del servidor.`}`,!0)}finally{G.busy=!1,Q(),sx(o?`.adm-pago [data-adm-archivo-abrir="${CSS.escape(o.id)}"]`:`[data-adm-pago-adjuntar="${CSS.escape(t)}"]`)}}async function hx(e){let t=e.dataset.admFoto,n=e.dataset.admFotoNombre||t,r=e.files?.[0];if(e.value=``,!r||!t)return;let i=G.tab===`mas`&&G.mas===`fotos`?`fotos`:`live`,a=``;if(Jv()?a=`Sin señal: la foto no se pudo subir. Probá cuando vuelva.`:/^image\//.test(r.type)||(a=`Eso no es una foto.`),a)Z(i,a,!0),Q();else{G.fotosSubiendo.add(t),Z(i,`Subiendo la foto de ${n}…`),Q();try{Z(i,(await _t.subir(t,n,r))?.pendiente?`Foto de ${n} subida. Se termina de guardar cuando haya señal.`:`Listo: foto de ${n}.`)}catch(e){Z(i,`No se pudo subir la foto de ${n}: ${e.message||`error del servidor.`}`,!0)}finally{G.fotosSubiendo.delete(t),Q(),sx(`[data-adm-foto="${CSS.escape(t)}"]`)}}}function gx(e,t){let n=G.msgs[t]===void 0?`archivos`:t;Jv()?(Z(n,`Sin señal no se puede abrir. Probá cuando vuelva.`,!0),Q()):ht.abrir(e).catch(e=>{let t=e.status===403?`Tu usuario no puede abrir este archivo.`:e.status===404?`No se encontró el archivo. Puede que lo hayan borrado de Drive.`:`No se pudo abrir: ${e.message||`error del servidor.`}`;Z(n,t,!0),Q()})}async function _x(e,t,n=!0){let r=_.cached(`pagos`,X(`pagos`)).find(t=>t.id===e);if(r&&!G.busy){G.busy=!0;try{(await _.save(`pagos`,{id:e,fecha:r.fecha,pasadoAlLibro:t})).pendiente&&Z(`pagos`,`Se enviará cuando haya señal.`),n&&qy(t?`Marcado: en el Libro.`:`Desmarcado del Libro.`,()=>_x(e,!t,!1))}catch(e){Z(`pagos`,e.message||`No se pudo cambiar la marca.`,!0)}finally{G.busy=!1,Q(),sx(`[data-adm-pago-libro="${CSS.escape(e)}"]`)}}}async function vx(e,t,n){if(G.busy)return!1;G.busy=!0;try{return await e(),t&&Z(`users`,t),G.busy=!1,await wy(),!0}catch(e){return Z(`users`,e.message||n,!0),G.busy=!1,Q(),!1}}function yx(e,t,n=!0){let r=G.users?.find(t=>t.usuario===e);if(!r||t===r.rol){G.roleFor=null,$();return}let i=r.rol;G.roleFor=null,vx(()=>rt.save({usuario:e,rol:t}),``,`No se pudo cambiar el rol.`).then(a=>{a&&(n?qy(`${r.nombre}: ${Sy(t)}.`,()=>yx(e,i,!1)):Z(`users`,`${r.nombre} volvió a ${Sy(i)}.`),Q(),sx(`[data-adm-rolefor="${CSS.escape(e)}"]`))})}function bx(e){if(e.target.closest(`[data-adm-users-refresh]`))return G.usersError=``,wy(),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;K[e].pin=Oy();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=K[e].pin),ex(`PIN generado: ${K[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-rolefor]`);if(n){let e=n.dataset.admRolefor;return G.roleFor=G.roleFor===e?null:e,G.resetFor=null,G.confirmOff=null,$(),sx(G.roleFor?`[data-adm-role-set="${CSS.escape(e)}"].is-on`:`[data-adm-rolefor="${CSS.escape(e)}"]`),!0}let r=e.target.closest(`[data-adm-role-set]`);if(r)return yx(r.dataset.admRoleSet,r.dataset.admRol),!0;let i=e.target.closest(`[data-adm-reset]`);if(i){let e=i.dataset.admReset;return G.resetFor=G.resetFor===e?null:e,G.confirmOff=null,G.roleFor=null,K.reset.pin=G.resetFor?Oy():``,$(),G.resetFor&&sx(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=G.resetFor||``;return G.resetFor=null,K.reset.pin=``,$(),sx(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let a=e.target.closest(`[data-adm-off]`);if(a)return G.confirmOff=a.dataset.admOff,G.resetFor=null,G.roleFor=null,$(),sx(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=G.confirmOff||``;return G.confirmOff=null,$(),sx(`[data-adm-off="${CSS.escape(e)}"]`),ex(`Cancelado.`),!0}let o=e.target.closest(`[data-adm-off-confirm]`);if(o){let e=o.dataset.admOffConfirm,t=G.users?.find(t=>t.usuario===e);return G.confirmOff=null,vx(()=>rt.deactivate(e),`Listo: ${t?.nombre||e} ya no puede entrar.`,`No se pudo desactivar.`),!0}return e.target.closest(`[data-adm-cred-copy]`)?(G.credential&&$b(ky(G.credential)).then(e=>{ex(e?`Mensaje copiado.`:`No se pudo copiar. Abrí “Ver el mensaje” y copialo a mano.`)}),!0):e.target.closest(`[data-adm-cred-hide]`)?(G.credential=null,$(),sx(`#adm-crear-abrir`),ex(`Listo. El PIN ya no se muestra.`),!0):!1}function xx(e){if(!e.target.closest?.(`.adm-shell`))return;if(e.target.matches?.(`[data-adm-foto]`)){e.type===`change`&&hx(e.target);return}if(e.target.matches?.(`[data-adm-pago-archivo], [data-adm-pago-adjuntar]`)){if(e.type!==`change`)return;e.target.dataset.admPagoAdjuntar===void 0?px(e.target):mx(e.target);return}let t=e.target.closest?.(`[data-adm-draft]`);if(!t)return;let n=t.dataset.admDraft,r=t.dataset.admKey;if(t.type===`radio`&&!t.checked)return;let i=t.type===`checkbox`?t.checked:t.value;if(K[n][r]=i,n===`crear`&&r===`nombre`&&!K.crear.usuarioTocado){K.crear.usuario=Ey(i);let e=document.getElementById(`adm-crear-usuario`);e&&(e.value=K.crear.usuario)}if(n===`crear`&&r===`usuario`&&(K.crear.usuarioTocado=i.trim()!==``),n===`crear`&&r===`rol`){document.querySelectorAll(`.adm-role-grid .adm-choice`).forEach(e=>{e.classList.toggle(`is-on`,e.querySelector(`input`)?.checked===!0)});let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.textContent=xy.find(e=>e.rol===i)?.line||``)}if(n===`pago`&&r===`monto`){let e=document.querySelector(`[data-adm-monto-preview]`),t=Eb(i);e&&(e.textContent=Number.isFinite(t)&&t>0?Rn(t):`Solo números`)}n===`pago`&&(r===`medioSel`||r===`fecha`&&e.type===`change`||r===`concepto`&&e.type===`change`)&&(Q(),r===`medioSel`&&i===`Otro`&&sx(`#adm-pago-medio-otro`))}function Sx(e,t){let n=Rv(),r=n.includes(e);Lv(iv,r?n.filter(t=>t!==e):[...n,e]),r?G.undo=null:qy(`Listo: ${t}.`,()=>{Lv(iv,Rv().filter(t=>t!==e))}),$(),(document.querySelector(`.adm-prio [data-adm-done="${CSS.escape(e)}"]`)||document.querySelector(`[data-adm-done="${CSS.escape(e)}"]`)||document.querySelector(`#adm-title`))?.focus({preventScroll:!0}),ex(r?`Prioridad desmarcada.`:`Hecho. Cambió el próximo paso.`)}function Cx(e){if(!e.target.closest(`.adm-shell`))return!1;let t=e.target.closest(`.adm-date-native`);if(t){try{t.showPicker?.()}catch{}return!1}let n=e.target.closest(`[data-adm-sheet-backdrop]`);if(n&&e.target===n||e.target.closest(`[data-adm-sheet-close]`))return ux(),!0;let r=e.target.closest(`[data-adm-sheet]`);if(r)return lx(r.dataset.admSheet,r),!0;let i=e.target.closest(`[data-adm-tab]`);if(i){let e=G.tab===i.dataset.admTab;return rx(i.dataset.admTab),$(),tx(),e?document.querySelector(`[data-adm-tab="${i.dataset.admTab}"]`)?.focus({preventScroll:!0}):nx(),!0}let a=e.target.closest(`[data-adm-mas]`);if(a)return rx(`mas`,a.dataset.admMas),$(),tx(),nx(),!0;if(e.target.closest(`[data-adm-mas-back]`)){let e=G.mas;return rx(`mas`),$(),tx(),sx(`[data-adm-mas="${e}"]`),!0}if(e.target.closest(`[data-adm-undo]`)){let e=G.undo;return G.undo=null,clearTimeout(Ov),e?.run?.(),$(),ex(`Deshecho.`),!0}if(e.target.closest(`[data-adm-refresh]`))return vy(!0),_y(),G.tab===`equipo`&&wy(),ex(`Actualizando…`),!0;let o=e.target.closest(`[data-adm-done]`);if(o)return Sx(o.dataset.admDone,o.dataset.admDoneLabel||`prioridad`),!0;let s=e.target.closest(`[data-adm-goto]`);if(s)return e.preventDefault(),ix(s.dataset.admGoto),!0;let c=e.target.closest(`[data-adm-archivo-abrir]`);if(c)return gx(c.dataset.admArchivoAbrir,c.dataset.admArea),!0;let l=e.target.closest(`[data-adm-foto-ver]`);if(l)return gx(l.dataset.admFotoVer,`fotos`),!0;let u=e.target.closest(`[data-adm-fotos-filtro]`);if(u)return G.fotosFiltro=u.dataset.admFotosFiltro,Q(),!0;let d=e.target.closest(`[data-adm-pago-libro]`);if(d){let e=_.cached(`pagos`,X(`pagos`)).find(e=>e.id===d.dataset.admPagoLibro);return e&&_x(e.id,!e.pasadoAlLibro),!0}let f=e.target.closest(`[data-adm-pagos-mes]`);if(f)return G.pagosMes=f.dataset.admPagosMes,G.pagosTodos=!1,Q(),ex(`Pagos de ${G.pagosMes===`todos`?`todos los meses`:Tb(G.pagosMes).toLowerCase()}.`),!0;if(e.target.closest(`[data-adm-pagos-todos]`))return G.pagosTodos=!0,Q(),!0;let p=e.target.closest(`[data-adm-archivos-tipo]`);if(p)return G.archivosTipo=p.dataset.admArchivosTipo,Q(),!0;let ee=e.target.closest(`[data-adm-fecha]`);if(ee)return K.pago.fecha=ee.dataset.admFecha,Q(),!0;let m=e.target.closest(`[data-adm-concepto]`);return m?(K.pago.concepto=m.dataset.admConcepto,Q(),!0):e.target.closest(`[data-adm-pago-quitar]`)?(K.pagoArchivo=null,K.pagoSubido=null,Z(`pagos`,`Comprobante quitado.`),Q(),sx(`#adm-pago-foto`),!0):bx(e)?!0:e.target.closest(`[data-adm-copy]`)?($b(Qb()).then(e=>{ex(e?`Resumen copiado.`:`No se pudo copiar. Probá de nuevo.`),e&&qy(`Resumen copiado.`,null),Q()}),!0):!1}function wx(e){let t=e.target;if(!t.closest?.(`.adm-shell`))return;let n=t.dataset?.admFold||t.dataset?.admFoldInner;n&&Hv(n,t.open)}function Tx(e){e.key===`Escape`&&G.sheet&&Qv()&&(document.querySelector(`#a11y-panel:not([hidden])`)||(e.preventDefault(),ux()))}function Ex(){pe.push(ox),he.push(Cx),document.addEventListener(`toggle`,wx,!0),document.addEventListener(`submit`,dx),document.addEventListener(`input`,xx),document.addEventListener(`change`,xx),document.addEventListener(`keydown`,Tx),Ze(e=>{(dv.includes(e)||fv.includes(e))&&Q()}),setInterval(()=>{if(!Qv()||g.user()?.rol!==`admin`||document.visibilityState!==`visible`)return;let e=hy(my());e!==G.lateSignature&&(G.lateSignature=e,Q())},3e4),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var Dx=document.querySelector(`#app`);function Ox(e){return e.replace(/\/+$/,``)||`/`}function kx(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}));return}let n=Ox(t.split(`?`)[0])!==Ox(window.location.pathname);window.history.pushState({},``,t),e.menuOpen=!1,$(),n&&window.scrollTo({top:0,behavior:`instant`})}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),ye(),Cn(),vr(),Or(),Wi(),zc(),Vf(),rv(),Ex(),document.addEventListener(`click`,e=>{if(ge(pe,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),kx(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{ge(me,e)});function $(){let e=Ox(window.location.pathname);if(e===`/`){Dx.innerHTML=jt(),jx();return}if(e===`/precios`){Dx.innerHTML=tr(),jx();return}if(e===`/tienda`){Dx.innerHTML=mr(),jx();return}if(e===`/login`){Dx.innerHTML=Sr(),jx();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),g.clear(),Dx.innerHTML=Sr(),jx();return}if(e===`/registro`||e===`/register`){Dx.innerHTML=wr(),jx();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(Dx.innerHTML=Ax(r),jx()):(Dx.innerHTML=le(),jx())}function Ax(e){if(e===`cliente`)return Mx(e);let t=g.user();return t?(et[t.rol]||[]).includes(e)?Mx(e):Tr(e):(window.history.replaceState({},``,`/login?volver=/${e}`),Sr())}function jx(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=ue()+fe(),document.body.classList.toggle(`menu-locked`,e.menuOpen),Be(),ze()}function Mx(e){let n=t[e],r=e===`cliente`,a=e===`paseador`,o=e===`supervisor`,s={admin:Jy,coordinador:Ig,supervisor:Nd,paseador:Uo,cliente:hi}[e]();return a?Ho(s):o?Ad(s):e===`coordinador`?Pg(s):e===`admin`?Uy(s):re(`
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
    ${r?se():``}
  `,e)}Le(),Ze(e=>{e===`sesion`&&$()}),g.user()&&(g.refresh().catch(()=>{}),lt()),Me(()=>ze()),$(),document.addEventListener(`click`,e=>{ge(he,e)});