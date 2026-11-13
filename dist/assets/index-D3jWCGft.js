(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={menuOpen:!1,chatOpen:!1,revealObserver:void 0},t={admin:{label:`Admin`,route:`/admin`,legacyRoute:`/dashboard/admin`,intent:`Control total del negocio, permisos, usuarios, finanzas y configuracion.`},coordinador:{label:`Coordinador`,route:`/coordinador`,legacyRoute:`/dashboard/coordinador`,intent:`Gestion operativa diaria, asignaciones, rutas, agenda y comunicacion.`},supervisor:{label:`Supervisor`,route:`/supervisor`,legacyRoute:`/dashboard/supervisor`,intent:`Control grupal, seguridad, calidad de paseos e incidentes.`},paseador:{label:`Paseador`,route:`/paseador`,legacyRoute:`/dashboard/paseador`,intent:`Ejecucion de paseos, retiros, entregas, reportes y metricas personales.`},cliente:{label:`Cliente`,route:`/cliente`,legacyRoute:`/dashboard/cliente`,intent:`Seguimiento del perro, confianza, pagos, planes y contacto.`},visitante:{label:`Visitante`,route:`/visitante`,intent:`Visualizacion publica, informacion comercial y reserva de evaluacion.`}},n={whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,zone:`Pilar y La Lonja`},r={title:`Muestra gratis de DogPro o CatPro + un paseo de regalo`,detail:`Abierta a cualquier persona: no hace falta ser cliente ni hacer una visita previa.`,until:`2026-12-01`,untilLabel:`01/12/2026`},i=[`Pequeño`,`Mediano`,`Grande`],a=[{name:`Plan 1`,walks:`3 paseos semanales`,prices:[`$24.000`,`$27.000`,`$30.000`],benefits:[`Descuento con entrenador canino`]},{name:`Plan 2`,walks:`5 paseos semanales`,prices:[`$35.000`,`$37.500`,`$40.000`],benefits:[`Descuento con entrenador canino`,`Descuento con veterinaria`]},{name:`Plan 3`,walks:`6 paseos semanales`,prices:[`$39.000`,`$42.000`,`$45.000`],benefits:[`Descuento con entrenador canino`,`Descuento con veterinaria`,`Descuento en baño en seco`]}],o=[[`2 perros`,`10%`],[`3 perros`,`20%`],[`4 perros`,`30%`]],s=[{size:`Pequeño`,individual:`$10.000`,group:`$8.000`},{size:`Mediano`,individual:`$12.000`,group:`$10.000`},{size:`Grande`,individual:`$14.000`,group:`$12.000`}],c=[[`Admin`,`Control total`],[`Coordinador`,`Gestion operativa`],[`Supervisor`,`Control grupal`],[`Paseador`,`Ejecucion de paseos`],[`Cliente`,`Seguimiento de su perro`],[`Visitante`,`Solo visualizacion publica`]],l=[[`Inicio`,`/`,`home`],[`Sobre nosotros`,`/#sobre-nosotros`,`shieldCheck`],[`Planes`,`/#planes`,`calendarCheck`],[`Compromiso`,`/#testimonios`,`message`],[`Preguntas frecuentes`,`/#faq`,`help`],[`Contacto`,`/#contacto`,`mail`],[`Login`,`/login`,`logIn`],[`Registro`,`/registro`,`userPlus`]];function u(){return{users:f(`paseosJuan_users`,[]),clients:f(`paseosJuan_clients`,[]),dogs:f(`paseosJuan_dogs`,[]),routes:f(`paseosJuan_routes`,[]),payments:f(`paseosJuan_payments`,[]),alerts:f(`paseosJuan_alerts`,[]),reports:f(`paseosJuan_reports`,[]),chats:f(`paseosJuan_chats`,[]),settings:f(`paseosJuan_settings`,{})}}function d(e){e.users&&localStorage.setItem(`paseosJuan_users`,JSON.stringify(e.users)),e.clients&&localStorage.setItem(`paseosJuan_clients`,JSON.stringify(e.clients)),e.dogs&&localStorage.setItem(`paseosJuan_dogs`,JSON.stringify(e.dogs)),e.routes&&localStorage.setItem(`paseosJuan_routes`,JSON.stringify(e.routes)),e.payments&&localStorage.setItem(`paseosJuan_payments`,JSON.stringify(e.payments)),e.alerts&&localStorage.setItem(`paseosJuan_alerts`,JSON.stringify(e.alerts)),e.reports&&localStorage.setItem(`paseosJuan_reports`,JSON.stringify(e.reports)),e.chats&&localStorage.setItem(`paseosJuan_chats`,JSON.stringify(e.chats)),e.settings&&localStorage.setItem(`paseosJuan_settings`,JSON.stringify(e.settings)),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function f(e,t){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function p(){localStorage.removeItem(`paseosJuanActiveModal`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function m(e,t=`success`){localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:e,type:t,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}var h=[{id:`conv-laura-kiara`,clientName:`Tutor de ejemplo 1`,dogs:[`Perro de ejemplo 1`],status:`Abierto`,lastUpdated:Date.now()-1e5,messages:[{id:`msg-1`,conversationId:`conv-laura-kiara`,senderRole:`cliente`,senderName:`Tutor de ejemplo 1`,text:`¿Mañana hay paseo?`,timestamp:`10:30`,read:!1,type:`normal`}]},{id:`conv-martin-bruno`,clientName:`Tutor de ejemplo 2`,dogs:[`Perro de ejemplo 2`],status:`Documentación pendiente`,lastUpdated:Date.now()-2e5,messages:[{id:`msg-2`,conversationId:`conv-martin-bruno`,senderRole:`cliente`,senderName:`Tutor de ejemplo 2`,text:`Ya subí el carnet de vacunas.`,timestamp:`10:15`,read:!0,type:`normal`},{id:`msg-3`,conversationId:`conv-martin-bruno`,senderRole:`coordinador`,senderName:`Coordinador`,text:`Perfecto, lo revisamos y te avisamos si falta algo.`,timestamp:`10:18`,read:!0,type:`normal`}]},{id:`conv-sol-pistacho`,clientName:`Tutor de ejemplo 3`,dogs:[`Perro de ejemplo 3`],status:`Consulta comercial`,lastUpdated:Date.now()-3e5,messages:[{id:`msg-4`,conversationId:`conv-sol-pistacho`,senderRole:`cliente`,senderName:`Tutor de ejemplo 3`,text:`Quiero consultar el Plan 2.`,timestamp:`09:00`,read:!1,type:`normal`}]}];function ee(){let e=localStorage.getItem(`paseosJuanChatMessages`);if(e)try{return JSON.parse(e)}catch{return h}return localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(h)),h}function te(e){return[`cliente`,`coordinador`,`supervisor`,`admin`].includes(e)}function ne(e,t,n,r,i=`normal`){if(!te(t))return localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:`Solo coordinación o supervisión pueden responder al cliente.`,type:`error`,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)),!1;let a=ee(),o=a.findIndex(t=>t.id===e);if(o===-1)return!1;let s=new Date,c=s.getHours().toString().padStart(2,`0`),l=s.getMinutes().toString().padStart(2,`0`),u={id:`msg-${Date.now()}`,conversationId:e,senderRole:t,senderName:n,text:r,timestamp:`${c}:${l}`,read:!1,type:i};return a[o].messages.push(u),a[o].lastUpdated=Date.now(),localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(a)),!0}function re(e){return`https://wa.me/${n.whatsapp}?text=${encodeURIComponent(e)}`}function g(e,t=`line-icon`){let n=`class="${t}" viewBox="0 0 24 24" aria-hidden="true"`,r={activity:`<path d="M4 12h4l2-6 4 12 2-6h4" />`,arrowRight:`<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,briefcase:`<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><path d="M4 7h16v12H4z" /><path d="M9 12h6" />`,briefcaseMedical:`<path d="M10 6V5a2 2 0 0 1 4 0v1" /><path d="M4 7h16v12H4z" /><path d="M12 11v5" /><path d="M9.5 13.5h5" />`,calendarCheck:`<path d="M7 3v4" /><path d="M17 3v4" /><path d="M4 8h16" /><path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="m9 15 2 2 4-5" />`,camera:`<path d="M14 6 13 4h-2L10 6H6a2 2 0 0 0-2 2v10h16V8a2 2 0 0 0-2-2Z" /><circle cx="12" cy="13" r="3" />`,checkCircle:`<circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.4 2.4 4.9-5" />`,chart:`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15V9" /><path d="M12 15V6" /><path d="M16 15v-4" />`,clipboardCheck:`<path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 4h6" /><path d="m8.5 14 2 2 4.8-5" />`,clock:`<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`,alertCircle:`<circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" />`,alertTriangle:`<path d="M12 3 22 20H2L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" />`,archive:`<rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v12h14V8" /><path d="M10 12h4" />`,bell:`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" />`,bone:`<path d="M7.5 8.5a3 3 0 1 1 2-5.2 3 3 0 0 1 5 0 3 3 0 1 1 2 5.2l-8 7a3 3 0 1 1-2-5.2 3 3 0 0 1 0-3.6 3 3 0 0 1 1 1.8Z" />`,chevronDown:`<path d="m6 9 6 6 6-6" />`,compass:`<circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />`,creditCard:`<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" />`,database:`<ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />`,copy:`<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,dollarSign:`<path d="M12 2v20" /><path d="M17 6.5c-1.2-1-2.8-1.5-5-1.5-3 0-5 1.4-5 3.5 0 5 10 2.5 10 7.5 0 2.1-2 3.5-5 3.5-2.2 0-4-.6-5.5-1.8" />`,droplets:`<path d="M7 3C5 6 4 8.2 4 10a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" /><path d="M17 3c-2 3-3 5.2-3 7a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" />`,eye:`<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />`,fileCheck:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="m8.5 15 2 2 4.5-5" />`,fileText:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M8 13h8" /><path d="M8 17h5" />`,fileUp:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M12 17v-6" /><path d="m9 14 3-3 3 3" />`,heartPulse:`<path d="M20.5 8.8c0 5.2-8.5 10.2-8.5 10.2S3.5 14 3.5 8.8A4.3 4.3 0 0 1 11 6a4.3 4.3 0 0 1 9.5 2.8Z" /><path d="M7 12h3l1-2 2 5 1.5-3H17" />`,help:`<circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.2-1.7 2.6" /><path d="M12 17h.01" />`,home:`<path d="m4 11 8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-6h4v6" />`,logIn:`<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M4 12h10" /><path d="m10 8 4 4-4 4" />`,logOut:`<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M14 12H4" /><path d="m18 8 4 4-4 4" />`,lock:`<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" />`,mail:`<path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />`,mapPin:`<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />`,medal:`<path d="M8 3h8l-2 5h-4L8 3Z" /><circle cx="12" cy="14" r="5" /><path d="m10.5 14 1 1.2 2.2-2.4" />`,message:`<path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8 8 0 1 1 21 12Z" />`,navigation:`<path d="m12 2 7 19-7-4-7 4 7-19Z" />`,packageCheck:`<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4.5 8 12 12.2 19.5 8" /><path d="M12 21v-8.8" /><path d="m9.2 16 1.8 1.8 3.8-4.1" />`,pawPrint:`<circle cx="8" cy="9" r="1.6" /><circle cx="12" cy="7" r="1.7" /><circle cx="16" cy="9" r="1.6" /><circle cx="18" cy="13" r="1.5" /><path d="M7.5 16.4c.8-2.1 2.4-3.3 4.5-3.3s3.7 1.2 4.5 3.3c.5 1.4-.5 2.6-1.9 2.3l-1.5-.4a4.5 4.5 0 0 0-2.2 0l-1.5.4c-1.4.3-2.4-.9-1.9-2.3Z" />`,play:`<circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" />`,flag:`<path d="M5 21V4" /><path d="M5 4h12l-1.5 4L17 12H5" />`,radar:`<circle cx="12" cy="12" r="8" /><path d="M12 12 17 7" /><path d="M12 4v2" /><path d="M12 18v2" /><path d="M4 12h2" /><path d="M18 12h2" />`,radio:`<path d="M4 9h16v11H4z" /><path d="m8 9 8-6" /><circle cx="8" cy="14" r="2" /><path d="M14 14h3" /><path d="M14 17h2" />`,plus:`<path d="M12 5v14" /><path d="M5 12h14" />`,receipt:`<path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1V3Z" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" />`,route:`<circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />`,shieldCheck:`<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" />`,send:`<path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" />`,settings:`<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 3.6-.2-.1a1.7 1.7 0 0 0-2 .3l-.3.2a1.7 1.7 0 0 0-1 1.5V23H9.8v-.5a1.7 1.7 0 0 0-1-1.5l-.3-.2a1.7 1.7 0 0 0-2-.3l-.2.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-3.6.2.1a1.7 1.7 0 0 0 2-.3l.3-.2a1.7 1.7 0 0 0 1-1.5V1h4.4v.5a1.7 1.7 0 0 0 1 1.5l.3.2a1.7 1.7 0 0 0 2 .3l.2-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z" />`,sliders:`<path d="M4 6h8" /><path d="M16 6h4" /><path d="M14 4v4" /><path d="M4 12h4" /><path d="M12 12h8" /><path d="M10 10v4" /><path d="M4 18h10" /><path d="M18 18h2" /><path d="M16 16v4" />`,shoppingBag:`<path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /><path d="M9.5 14h5" />`,uploadCloud:`<path d="M16 16 12 12l-4 4" /><path d="M12 12v9" /><path d="M20 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 0 0 3 10.4" /><path d="M5 18a4 4 0 0 1 0-8" />`,userCheck:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="m16 13 2 2 4-5" />`,userPlus:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 8v6" /><path d="M15 11h6" />`,users:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 11a3 3 0 0 0 0-6" /><path d="M17 20a5 5 0 0 0-2-4" />`,wallet:`<path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V6" /><path d="M16 13h.01" />`,x:`<path d="M6 6 18 18" /><path d="M18 6 6 18" />`};return`<svg ${n} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${r[e]||r.shieldCheck}</svg>`}function ie(){try{return JSON.parse(localStorage.getItem(`paseosJuanDemoClient`))}catch{return null}}function ae(e){try{let t=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?t:[]}catch{return[]}}function oe(e,t=`visitante`){return`
    ${se(t)}
    ${ce()}
    ${le(e)}
  `}function se(t){return`
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
  `}function ce(){return`
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
        ${l.map(([e,t,n])=>`
          <a href="${t}" data-link>
            <span>${g(n,`menu-icon`)}</span>
            ${e}
          </a>
        `).join(``)}
      </nav>
      <a class="menu-evaluation" href="/#evaluacion" data-link>Pedí tu evaluación</a>
      <a class="menu-whatsapp" href="${re(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">
        WhatsApp ${n.whatsappLabel}
      </a>
    </aside>
  `}function le(e){return`<div class="smooth-wrapper">${e}</div>`}function ue(){let t=ee(),n=ie()?.name?.split(` `)[0]||`Tutor de ejemplo`,r=t.find(e=>e.id===`conv-martin-bruno`)||t[1];return localStorage.getItem(`paseosJuanChatDraft`),`
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
  `}function de(e){return`
    <article class="price-card">
      <strong>${e.name}</strong>
      <small>${e.walks}</small>
      <div class="plan-price-list">
        ${i.map((t,n)=>`
          <div>
            <span>${t}</span>
            <b>${e.prices[n]}</b>
          </div>
        `).join(``)}
      </div>
      <a class="ghost-button" href="${re(`Hola, quiero consultar por el ${e.name} (${e.walks}) para mi perro.`)}" target="_blank" rel="noreferrer">Consultar</a>
    </article>
  `}function fe(e,t){return`
    <details>
      <summary>${e}</summary>
      <p>${t}</p>
    </details>
  `}function pe(){return oe(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">404</p>
        <h1>Ruta no encontrada</h1>
        <p>Volver a la landing pública o entrar a un dashboard por rol.</p>
        <a class="primary-button" href="/" data-link>Ir al inicio</a>
      </section>
    </main>
  `)}function me(){let e=localStorage.getItem(`paseosJuanActiveModal`);if(!e)return``;let{type:t,data:n}=JSON.parse(e),r=``;switch(t){case`admin-reports`:r=`<h3>Reportes operativos</h3><p>Reportes filtrables. (Demo)</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-users`:r=`<h3>Usuarios y permisos</h3><p>Gestionar usuarios demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-prices`:r=`<h3>Precios y planes</h3><p>Editar precios y descuentos.</p><button class='primary-button' data-modal-action='save-prices'>Guardar cambios</button> <button data-modal-action='close'>Cerrar</button>`;break;case`admin-alerts`:r=`<h3>Alertas críticas</h3><p>Resolver alertas operativas.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-client`:r=`<h3>Ficha del cliente</h3><p>Detalle demo del cliente.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-audit`:r=`<h3>Auditoría</h3><p>Auditoría de cambios y chats.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-settings`:r=`<h3>Configuración del sistema</h3><p>Opciones generales demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`client-pay`:r=`<h3>Enviar comprobante</h3><p>El alias y el detalle de pago te los enviamos por WhatsApp. Cuando pagues, subí acá el comprobante.</p><label>Subir comprobante <input type='file' accept='image/*,.pdf' /></label><button class='primary-button' data-modal-action='confirm-pay'>Enviar comprobante</button> <button data-modal-action='close'>Cerrar</button>`;break;default:r=`<h3>Modal</h3><button data-modal-action='close'>Cerrar</button>`}return`
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal-content panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width: 90%; max-width: 500px;">
        ${r}
      </div>
    </div>
  `}var he=null;function ge(){let e=null;try{e=JSON.parse(localStorage.getItem(`paseosJuanToast`))}catch{e=null}return e?(he||=setTimeout(()=>{he=null,localStorage.getItem(`paseosJuanToast`)&&(localStorage.removeItem(`paseosJuanToast`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)))},3500),`
    <div class="toast is-${e.type===`error`?`error`:`success`}" role="status" aria-live="polite">
      ${e.message}
    </div>
  `):``}var _e=[],ve=[],ye=[];function be(e,t){for(let n of e)if(n(t))return!0;return!1}function xe(t){let n=t.target.closest(`[data-chat-select]`);if(n)return localStorage.setItem(`paseosJuanActiveChat`,n.dataset.chatSelect),$(),!0;let r=t.target.closest(`[data-chat-send-shared]`);if(r){let e=r.dataset.chatSendShared,t=document.querySelector(`[data-chat-input-shared="${e}"]`),n=t?.value?.trim();if(!n)return!0;let i=r.dataset.chatRole,a=r.dataset.chatSender;return ne(e,i,a,n)&&(t&&(t.value=``),localStorage.removeItem(`paseosJuanChatDraft`),$()),!0}let i=t.target.closest(`[data-chat-quick-shared]`);if(i){let e=i.dataset.chatQuickShared,t=i.dataset.chatRole,n=i.dataset.chatSender,r=i.dataset.chatConversation;return ne(r,t,n,e)&&$(),!0}return t.target.closest(`[data-menu-toggle]`)?(e.menuOpen=!e.menuOpen,$(),!0):t.target.closest(`[data-menu-close]`)?(e.menuOpen=!1,$(),!0):t.target.closest(`[data-chat-toggle]`)?(e.chatOpen=!e.chatOpen,$(),!0):t.target.closest(`[data-chat-close]`)?(e.chatOpen=!1,$(),!0):!1}function Se(e){let t=e.target.closest(`[data-modal-action]`);if(t){if(t.dataset.modalAction===`close`&&p(),t.dataset.modalAction===`confirm-pay`){let e=u();e.alerts=[{id:`alert-`+Date.now(),dog:`Pago cliente`,type:`Pago por confirmar`,level:`Medio`,description:`Cliente subió comprobante.`},...e.alerts||[]],d(e),m(`Comprobante enviado. Estado: Pago por confirmar.`),p()}return t.dataset.modalAction===`save-prices`&&(m(`Precios actualizados correctamente.`),p()),!0}return e.target.closest(`[data-modal-backdrop]`)&&e.target===e.target.closest(`[data-modal-backdrop]`)?(p(),!0):!1}function Ce(){_e.push(xe),ye.push(Se)}var we=`paseosJuan_accesibilidad`,Te={theme:`auto`,motion:`auto`},Ee=new Set,De=ke(),Oe=!1;function ke(){try{let e=JSON.parse(localStorage.getItem(we));return{...Te,...e||{}}}catch{return{...Te}}}function Ae(){try{localStorage.setItem(we,JSON.stringify(De))}catch{}}var je=window.matchMedia(`(prefers-color-scheme: dark)`),Me=window.matchMedia(`(prefers-reduced-motion: reduce)`);function Ne(){return De.theme===`oscuro`||De.theme!==`claro`&&je.matches}function Pe(){return De.motion===`calmo`||De.motion!==`normal`&&Me.matches}function Fe(e){return Ee.add(e),()=>Ee.delete(e)}function Ie(){let e=document.documentElement;e.dataset.theme=Ne()?`dark`:`light`,e.dataset.motion=Pe()?`calm`:`normal`,e.style.colorScheme=Ne()?`dark`:`light`;let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,Ne()?`#0f1512`:`#f7f5ef`),Re(),Ee.forEach(e=>e({dark:Ne(),calm:Pe()}))}function Le(e,t,n,r){let i=r===t;return`<button type="button" class="a11y-option ${i?`is-active`:``}" data-a11y-set="${e}:${t}" aria-pressed="${i}">${n}</button>`}function Re(){let e=document.getElementById(`a11y-root`);e||(e=document.createElement(`div`),e.id=`a11y-root`,document.body.appendChild(e)),e.innerHTML=`
    <button type="button" class="a11y-toggle" data-a11y-toggle aria-expanded="${Oe}" aria-controls="a11y-panel" aria-label="Opciones de accesibilidad: tema y movimiento">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"></path>
      </svg>
    </button>
    <section class="a11y-panel ${Oe?`is-open`:``}" id="a11y-panel" role="dialog" aria-label="Accesibilidad" ${Oe?``:`hidden`}>
      <header>
        <strong>Accesibilidad</strong>
        <button type="button" class="a11y-close" data-a11y-toggle aria-label="Cerrar">×</button>
      </header>
      <div class="a11y-group" role="group" aria-label="Tema">
        <span>Tema</span>
        <div class="a11y-options">
          ${Le(`theme`,`claro`,`Claro`,De.theme)}
          ${Le(`theme`,`oscuro`,`Oscuro`,De.theme)}
          ${Le(`theme`,`auto`,`Automático`,De.theme)}
        </div>
      </div>
      <div class="a11y-group" role="group" aria-label="Movimiento">
        <span>Movimiento</span>
        <div class="a11y-options">
          ${Le(`motion`,`normal`,`Normal`,De.motion)}
          ${Le(`motion`,`calmo`,`Calmo`,De.motion)}
          ${Le(`motion`,`auto`,`Automático`,De.motion)}
        </div>
        <small>El modo calmo apaga animaciones y el fondo en movimiento. Recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</small>
      </div>
    </section>
  `}function ze(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){Oe=!Oe,Re(),Oe?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);De={...De,[e]:n},Ae(),Ie(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else Oe&&!e.target.closest(`#a11y-root`)&&(Oe=!1,Re())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Oe&&(Oe=!1,Re(),document.querySelector(`.a11y-toggle`)?.focus())}),je.addEventListener?.(`change`,Ie),Me.addEventListener?.(`change`,Ie),Ie()}var Be={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function Ve(){Be.frame&&cancelAnimationFrame(Be.frame),Be.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Pe(),r=Ne()?[22,52,39]:[184,218,198],i=Ne()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Be.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Be.lastDraw>33&&(Be.lastDraw=e,s(e/1e3)),Be.frame=requestAnimationFrame(l)}Be.frame=requestAnimationFrame(l)}function He(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ue=`pj_sesion`,We=`pj_pendientes`,Ge=`pj_cache_`,Ke=6e4;fetch(`/api/salud`).then(e=>e.json()).then(e=>{/provisorio/i.test(e.almacenamiento||``)&&(Ke=3e5)}).catch(()=>{});var qe=new Set,Je=new Map,Ye=new Set;document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Ye.forEach(e=>e())});function Xe(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ze(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Qe(e){qe.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function $e(e){return qe.add(e),()=>qe.delete(e)}var et=class extends Error{constructor(e,t){super(t),this.status=e}};async function tt(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=_.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new et(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(_.clear(),Qe(`sesion`)),!o.ok||s.ok===!1)throw new et(o.status,s.error||`Error del servidor.`);return s}var _={token:()=>Xe(Ue,null)?.token||null,user:()=>Xe(Ue,null)?.user||null,set(e,t){Ze(Ue,{token:e,user:t}),Qe(`sesion`)},clear(){try{localStorage.removeItem(Ue),Object.keys(localStorage).filter(e=>e.startsWith(Ge)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return tt(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await tt(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return _.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await tt(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return _.set(i.token,i.user),i.user},async refresh(){let e=_.token();if(!e)return null;let t=await tt(`/api/auth/me`);return t.user&&_.token()===e&&_.set(e,t.user),t.user},async changePin(e,t){let n=await tt(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return _.set(n.token,n.user),n.user},logout(){_.clear(),Qe(`sesion`)}},nt={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],ayudante:[`paseador`],marketing:[]},rt={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,ayudante:`Ayudante de paseador`,marketing:`Marketing`};function it(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`,ayudante:`/paseador`}[e]||`/`}var at={list:async()=>(await tt(`/api/usuarios`)).usuarios,save:async e=>(await tt(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>tt(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function ot(e,t={}){return`${Ge}${e}_${t.desde||``}_${t.prefijo||``}`}function st(e,t){let n=Xe(We,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var v={cached(e,t={}){return st(e,Xe(ot(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await tt(`/api/registros?${n}`),i=localStorage.getItem(ot(e,t));return Ze(ot(e,t),r.registros),i!==JSON.stringify(r.registros)&&Qe(e),st(e,r.registros)}catch(n){if(n.status===0)return v.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=ct(n.fecha);try{let t=await tt(`/api/registros`,{method:`POST`,body:{col:e,...n}});return lt(e,t.registro),Qe(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Xe(We,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:_.user()?.usuario,at:Date.now()}),Ze(We,a),Qe(e),{...n,pendiente:!0}}},async remove(e,t){await tt(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{Ze(e,Xe(e,[]).filter(e=>e.id!==t))}),Qe(e)},pendingCount(){return Xe(We,[]).length},watch(e,t={}){let n=ot(e,t);if(Je.has(n))return Je.get(n);let r=()=>{document.visibilityState===`visible`&&_.token()&&v.list(e,t).catch(()=>{})};r(),Ye.add(r);let i=setInterval(r,Ke);setTimeout(()=>{clearInterval(i),i=setInterval(r,Ke)},3e3);let a=()=>{Ye.delete(r),clearInterval(i),Je.delete(n)};return Je.set(n,a),a}};function ct(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function lt(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{let n=Xe(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Ze(e,n)})}var ut=!1;async function dt(){if(ut||!_.token())return 0;let e=_.user()?.usuario,t=Xe(We,[]);if(!t.length)return 0;ut=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await tt(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});lt(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Ze(We,Xe(We,[]).filter(e=>!n.has(e.at))),ut=!1,r.forEach(e=>Qe(e))}return n.size}window.addEventListener(`online`,()=>dt()),setInterval(()=>dt(),3e4);async function ft(e){return tt(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function y(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}var pt=1600;async function mt(e){if(!/^image\/(jpeg|png|webp)$/.test(e.type))return e;try{let t=await createImageBitmap(e),n=Math.min(1,pt/Math.max(t.width,t.height));if(n===1&&e.size<921600)return e;let r=document.createElement(`canvas`);r.width=Math.round(t.width*n),r.height=Math.round(t.height*n),r.getContext(`2d`).drawImage(t,0,0,r.width,r.height);let i=await new Promise(e=>r.toBlob(e,`image/jpeg`,.82));return i?new File([i],e.name.replace(/\.\w+$/,``)+`.jpg`,{type:`image/jpeg`}):e}catch{return e}}function ht(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result).split(`,`)[1]||``),r.onerror=()=>n(new et(400,`No se pudo leer el archivo.`)),r.readAsDataURL(e)})}async function gt(e){if(!e)throw new et(400,`Elegí un archivo.`);if(!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(e.type))throw new et(400,`Solo se aceptan fotos (JPG, PNG, WEBP) o PDF.`);let t=await mt(e);if(t.size>3670016)throw new et(413,`El archivo es muy pesado (máximo 3,5 MB).`);return{nombre:t.name,mime:t.type,base64:await ht(t)}}var _t={async subir(e,t,n={}){let r=await tt(`/api/archivos`,{method:`POST`,body:{tipo:e,archivo:await gt(t),...n}});return lt(`archivos`,r.registro),Qe(`archivos`),r.registro},async abrir(e){let t=window.open(``,`_blank`);if(!t)throw new et(0,`El navegador bloqueó la ventana nueva: permití las ventanas emergentes de esta página para ver el archivo.`);try{let n=await fetch(`/api/archivos?id=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${_.token()}`}});if(!n.ok){let e=await n.json().catch(()=>({}));throw new et(n.status,e.error||`No se pudo abrir el archivo.`)}let r=URL.createObjectURL(await n.blob());t.location.href=r,setTimeout(()=>URL.revokeObjectURL(r),6e4)}catch(e){throw t?.close(),e}}},vt=null;async function yt(){return vt||(vt=fetch(`/api/salud`).then(e=>e.json()).then(e=>e.googleClientId||null).catch(()=>null),vt)}function bt(){return window.google?.accounts?.id?Promise.resolve():new Promise((e,t)=>{let n=document.querySelector(`script[data-gsi]`);if(n){n.addEventListener(`load`,()=>e());return}let r=document.createElement(`script`);r.src=`https://accounts.google.com/gsi/client`,r.async=!0,r.dataset.gsi=`1`,r.onload=()=>e(),r.onerror=()=>t(new et(0,`No se pudo cargar Google.`)),document.head.appendChild(r)})}async function xt(e,t,{texto:n=`continue_with`}={}){let r=await yt();if(!r||!e)return!1;await bt(),window.google.accounts.id.initialize({client_id:r,callback:e=>t(e.credential),ux_mode:`popup`});let i=document.documentElement.dataset.theme===`dark`;return window.google.accounts.id.renderButton(e,{type:`standard`,theme:i?`filled_black`:`outline`,size:`large`,text:n,shape:`pill`,locale:`es`,width:Math.min(e.clientWidth||320,400)}),!0}_.loginGoogle=async function(e){let t=await tt(`/api/auth/google`,{method:`POST`,body:{credential:e},auth:!1});return _.set(t.token,t.user),t.user};function St(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function Ct(){return oe(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${wt()}
      ${Tt()}
      ${Et()}
      ${At()}
      <a class="whatsapp" href="${re(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function wt(){return`
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
          experiencia segura, activa y equilibrada. Cuidado y confianza como en casa, en ${n.zone}.
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="#evaluacion" data-link>Pedí tu evaluación</a>
          <a class="secondary-button" href="#sobre-nosotros" data-link>Conocé más</a>
        </div>
      </div>
      <div class="hero-media reveal">
        <div class="dog-frame">
          <img src="/hero-dog-premium.png" alt="Perro entrenado con estética premium de Paseos Juan" />
        </div>
        <div class="dog-glass-card">
          <span class="glass-icon">${g(`radar`)}</span>
          <strong>Control total</strong>
          <span>Seguimiento operativo durante todo el paseo.</span>
        </div>
      </div>
      <a class="scroll-indicator" href="#sobre-nosotros" data-link>
        <span>Scroll</span>
        <b>${g(`chevronDown`)}</b>
      </a>
    </section>
  `}function Tt(){return`
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

    ${Dt()}

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
        ${fe(`¿Cómo empieza el servicio?`,`Con una evaluación inicial para conocer conducta, energía, vacunas y compatibilidades.`)}
        ${fe(`¿En qué zona trabajan?`,`En ${n.zone}. Si estás cerca y no sabés si llegamos, escribinos y te confirmamos.`)}
        ${fe(`¿Qué pasa si mi perro no se lleva bien con otros perros?`,`Lo evaluamos antes de sumarlo a un grupo. Si necesita paseo individual o una adaptación, te lo contamos antes de empezar.`)}
        ${fe(`¿Cómo consulto disponibilidad?`,`Escribinos por WhatsApp al ${n.whatsappLabel} o completá el formulario de evaluación.`)}
      </div>
    </section>
  `}function Et(){return`
    <section class="contact-section reveal" id="contacto">
      <div class="evaluation-heading">
        <p class="eyebrow">Reserva de evaluación</p>
        <h2>Reservá una evaluación inicial</h2>
        <p>
          Antes de sumar un perro al grupo, evaluamos su conducta, energía y necesidades
          para armar una experiencia segura.
        </p>
      </div>
      <form class="evaluation-form" id="evaluacion" data-evaluation-form novalidate>
        <label class="visually-hidden" aria-hidden="true">No completar <input name="sitio" tabindex="-1" autocomplete="off" /></label>
        <fieldset class="evaluation-board">
          <legend>Datos del perro</legend>
          <p>Información básica para entender tamaño, edad y contexto general.</p>
          <div class="form-grid">
            <label>Nombre del perro * <input name="perro" required autocomplete="off" placeholder="Ej. Luna" /></label>
            <label>Edad del perro <input name="edad" placeholder="Ej. 4 años" /></label>
            <label>Tamaño
              <select name="tamano">
                <option>Pequeño</option>
                <option>Mediano</option>
                <option>Grande</option>
              </select>
            </label>
            <label>Raza o cruza <input name="raza" placeholder="Ej. Mestizo" /></label>
            <label class="span-2">Carnet de vacunas (opcional)
              <input name="carnet" type="file" accept="image/*,application/pdf" capture="environment" />
              <small class="field-help">Sacale una foto o subí el PDF. Lo guardamos privado y solo lo ve el equipo.</small>
            </label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Conducta y energía</legend>
          <p>Datos clave para definir compatibilidad, ritmo y nivel de supervisión.</p>
          <div class="form-grid">
            <label>Nivel de energía
              <select name="energia">
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
              </select>
            </label>
            <label>¿Se lleva bien con otros perros?
              <select name="perros">
                <option>Sí</option>
                <option>No</option>
                <option>Depende</option>
              </select>
            </label>
            <label>¿Alguna vez mordió o intentó morder a una persona o a otro perro?
              <select name="mordida">
                <option>No</option>
                <option>Sí</option>
                <option>No estoy seguro</option>
              </select>
            </label>
            <label class="span-2">Observaciones de conducta
              <textarea name="conducta" placeholder="Miedos, cosas que lo ponen nervioso (motos, bicis, ruidos), si tira de la correa"></textarea>
            </label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Datos del responsable</legend>
          <p>Canales y zona para coordinar la primera evaluación.</p>
          <div class="form-grid">
            <label>Tu nombre * <input name="responsable" required autocomplete="name" placeholder="Tu nombre" /></label>
            <label>Teléfono / WhatsApp * <input name="telefono" required type="tel" autocomplete="tel" placeholder="11 0000 0000" /></label>
            <label>Zona o barrio <input name="zona" placeholder="Ej. Pilar" /></label>
            <label>Barrio privado o referencia <input name="referencia" placeholder="Ej. nombre del barrio" /></label>
          </div>
        </fieldset>

        <fieldset class="evaluation-board">
          <legend>Preferencia del servicio</legend>
          <p>Preferencias iniciales para orientar la propuesta.</p>
          <div class="form-grid">
            <label>Tipo de paseo
              <select name="tipo">
                <option>Grupal</option>
                <option>Evaluación inicial</option>
                <option>Consulta</option>
              </select>
            </label>
            <label>Horario preferido
              <select name="horario">
                <option>Mañana</option>
                <option>Tarde</option>
                <option>Indistinto</option>
              </select>
            </label>
            <label>Días posibles <input name="dias" placeholder="Ej. lunes, miércoles y viernes" /></label>
            <label class="span-2">Comentario adicional
              <textarea name="comentario" placeholder="Contanos cualquier detalle que ayude a evaluar mejor"></textarea>
            </label>
          </div>
        </fieldset>

        <div class="evaluation-submit">
          <button class="primary-button" type="submit">Enviar por WhatsApp</button>
          <small>
            Se abre WhatsApp con tus respuestas listas para enviar. Te contestamos para coordinar
            la evaluación y confirmar si tu perro puede sumarse a un grupo. Los campos con * son obligatorios.
          </small>
          <p class="evaluation-status" data-evaluation-status role="status" aria-live="polite"></p>
        </div>
      </form>
    </section>
  `}function Dt(){return`
    <section class="pricing-section reveal" id="planes">
      <div class="pricing-heading">
        <div>
          <p class="eyebrow">Tarifario</p>
          <h2>Planes por semana y por perro.</h2>
        </div>
        <aside class="discount-card">
          <h3>Descuentos</h3>
          ${o.map(([e,t])=>`
            <div>
              <span>${e}</span>
              <strong>${t}</strong>
            </div>
          `).join(``)}
        </aside>
      </div>

      <div class="tariff-table">
        <div class="tariff-sizes">
          <span>Tamaño</span>
          ${i.map(e=>`<strong>${e}</strong>`).join(``)}
        </div>
        ${a.map(e=>de(e)).join(``)}
      </div>

      <div class="pricing-details-grid">
        <article class="panel benefits-panel">
          <h3>Beneficios del plan</h3>
          ${a.map(e=>`
            <div class="benefit-group">
              <strong>${e.name}</strong>
              <ul>
                ${e.benefits.map(e=>`<li>${e}</li>`).join(``)}
              </ul>
            </div>
          `).join(``)}
        </article>

        <article class="panel single-prices-panel">
          <h3>Precios por paseo</h3>
          ${s.map(e=>`
            <div class="single-price-row">
              <strong>${e.size}</strong>
              <span>Individual <b>${e.individual}</b></span>
              <span>Grupo <b>${e.group}</b></span>
            </div>
          `).join(``)}
        </article>

        ${Ot()}
      </div>
    </section>
  `}function Ot(){return St()?`
      <aside class="panel products-panel promo-panel">
        <p class="eyebrow">Promo hasta el ${r.untilLabel}</p>
        <h3>${r.title}</h3>
        <p>${r.detail}</p>
        <a class="primary-button" href="${re(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
      </aside>
    `:`
    <aside class="panel products-panel promo-panel">
      <h3>¿Tenés dudas?</h3>
      <p>Escribinos y te contamos qué plan le conviene a tu perro.</p>
      <a class="primary-button" href="${re(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">Escribinos</a>
    </aside>
  `}function kt(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`),e.get(`carnet`)?.size?`Carnet de vacunas: lo adjunté en el formulario de la página.`:null].filter(e=>e!==null).join(`
`)}function At(){return`
    <footer class="footer reveal">
      <a class="menu-brand" href="/" data-link>
        <img src="/paseos-juan-logo.png" alt="" />
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <p>Paseos grupales profesionales con orden, seguridad y bienestar. ${n.zone}.</p>
      <a class="footer-whatsapp" href="${re(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">WhatsApp ${n.whatsappLabel}</a>
    </footer>
  `}function jt(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(re(kt(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`;let a=i.get(`carnet`),o=Object.fromEntries([...i.entries()].filter(([e])=>e!==`carnet`));(async()=>{if(a&&a.size)try{o.carnet=await gt(a)}catch(e){n.textContent=`${e.message} Tu pedido igual se envía; el carnet mandalo por WhatsApp.`}await ft(o)})().then(()=>{n.textContent=o.carnet?`Listo: recibimos tu pedido y el carnet. Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`:`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function Mt(){document.addEventListener(`submit`,jt)}var Nt=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),Pt={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function Ft(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function It(){let e=_.user();if(e)return Lt(e);Pt.necesitaConfiguracion===null&&!Pt.cargando&&(Pt.cargando=!0,_.status().then(e=>{Pt.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{Pt={...Pt,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{Pt.cargando=!1,$()}));let t=Pt.necesitaConfiguracion===!0;return oe(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${Pt.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
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
        <p class="acc-status ${Pt.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${Nt(Pt.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function Lt(e){return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${Nt(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${Nt(e.usuario)}</strong> (${Nt(e.rol)}).</p>
        <div class="acc-actions">
          ${it(e.rol)===`/`?``:`<a class="acc-button" href="${it(e.rol)}" data-link>Ir a mi panel</a>`}
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
  `)}function Rt(){return oe(`
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
  `)}function zt(e){let t=_.user(),n=nt[t?.rol]||[];return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${Nt(t?.nombre)}</strong> (${Nt(t?.rol)}) y la página de ${Nt(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function Bt(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function Vt(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return Bt(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return Bt(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return Bt(t,`Completá usuario y PIN.`,!0);i.disabled=!0,Bt(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await _.changePin(r.actual,r.nuevo);t.reset(),Bt(t,`Listo: tu PIN quedó cambiado.`),it(e.rol)!==`/`&&setTimeout(()=>Xh(it(e.rol)),900);return}let e=n===`setup`?await _.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin,codigo:r.codigo}):await _.login(r.usuario,r.pin);if(Pt={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){Xh(`/login`);return}let i=Ft();Xh(i&&(nt[e.rol]||[]).includes(i.slice(1))?i:it(e.rol))}catch(e){Bt(t,e instanceof et?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function Ht(){document.addEventListener(`submit`,Vt)}async function Ut(){let e=document.querySelector(`[data-acc-google]`),t=e?.querySelector(`[data-acc-google-boton]`);e&&t&&!t.dataset.montado&&(t.dataset.montado=`1`,e.hidden=!await xt(t,async e=>{let t=document.querySelector(`[data-acc-status]`);try{t&&(t.textContent=`Entrando con Google…`);let n=await _.loginGoogle(e);Xh(n.debeCambiarPin?`/login`:it(n.rol))}catch(e){t&&(t.textContent=e.message,t.classList.add(`is-error`))}},{texto:`signin_with`}).catch(()=>!1))}new MutationObserver(()=>Ut()).observe(document.getElementById(`app`)||document.body,{childList:!0,subtree:!0});var b=`Pendiente de confirmar`,Wt=`12/11/2026`,Gt={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},Kt=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],qt={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},x={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},Jt=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],Yt=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],Xt={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Zt=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Qt={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},S=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),$t=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],en=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],tn=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function nn(e,t,n){return!!e.schedule?.[t]?.includes(n)}function rn(e=new Date){return Jt[(e.getDay()+6)%7]}function an(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var on=[[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Flora`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,20,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Lunes`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Coqui`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Manolo`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Lunes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Martes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:15`,`Forest`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:30`,`Sam`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:45`,`Coqui`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:00`,`Manolo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Séptima`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Rambo`,20,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam ni Cashi`],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Morris`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:45`,`Lokaku`,45,`Bozal`],[`Miércoles`,`Mañana`,`PJ_1M`,`11:00`,`Paco`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Tayler`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Duque`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:30`,`Rambo`,20,``],[`Miércoles`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:30`,`Annie`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:45`,`Séptima`,45,`Sin días contratados cargados`],[`Miércoles`,`Tarde`,`PJ_2T`,`16:00`,`Milo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:15`,`Flora`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Jueves`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`11:00`,`Rambo`,20,``],[`Jueves`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`14:45`,`Forest`,45,`Bozal`],[`Jueves`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Jueves`,`Tarde`,`PJ_1T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Jueves`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`16:15`,`Rambo`,20,`Revisar duración`],[`Viernes`,`Mañana`,`PJ_1M`,`09:45`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Runa`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:50`,`Kiara`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Flora`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Viernes`,`Tarde`,`PJ_2T`,`14:45`,`Coqui`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`16:00`,`Séptima`,45,`Sin días contratados cargados`],[`Viernes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Viernes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,5,`Revisar duración`],[`Sábado`,`Mañana`,`PJ_1M`,`09:15`,`Sam`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`14:45`,`Forest`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Roma`,55,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Milo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`16:00`,`Tayler`,45,``]],sn={"Lunes|Mañana":`Juan`,"Lunes|Tarde":`Nicolás`,"Martes|Mañana":`Juan`,"Martes|Tarde":`Nicolás`,"Miércoles|Mañana":`Juan`,"Miércoles|Tarde":`Nicolás`,"Jueves|Mañana":`Juan`,"Jueves|Tarde":`Nicolás`,"Viernes|Mañana":`Nicolás`,"Viernes|Tarde":`Nicolás`,"Sábado|Mañana":`Juan`,"Sábado|Tarde":`Juan`},cn=new Map(S.map(e=>[e.name,e]));function ln(e,t){let[n,r]=e.split(`:`).map(Number),i=n*60+r+Number(t||0);return`${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}var un=on.map(([e,t,n,r,i,a,o])=>({dia:e,turno:t,ruta:n,hora:r,perroId:cn.get(i)?.id||null,perroNombre:i,minutos:a,salida:ln(r,a),nota:o}));function dn(){let e=new Map;return un.forEach(t=>{let n=`${t.ruta}_${t.dia.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}`;e.has(n)||e.set(n,{id:n,dia:t.dia,turno:t.turno,ruta:t.ruta,paseador:``,ayudante:``,supervisor:sn[`${t.dia}|${t.turno}`]||``,paradas:[],origen:`Planilla RPJ, BASE RUTAS (12/11/2026)`}),e.get(n).paradas.push({perroId:t.perroId,perroNombre:t.perroNombre,hora:t.hora,minutos:t.minutos,nota:t.nota})}),[...e.values()].map(e=>({...e,paradas:e.paradas.sort((e,t)=>e.hora.localeCompare(t.hora))}))}var fn=[`Mapuche Country Club`,`La Lonja`,`Pilar (otros barrios)`],pn={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},mn=`Tu perro`,hn={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},gn=[`Pequeño`,`Mediano`,`Grande`],_n=Jt.filter(e=>e!==`Domingo`),vn={Mañana:x.manana,Tarde:x.tarde};function yn(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function bn(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function xn(){let e=yn(pn.plan,null);if(!e||typeof e!=`object`)return{...hn};let t=Yt.find(t=>t.id===e.planId)?e.planId:hn.planId,n=gn.includes(e.size)?e.size:hn.size,r=vn[e.shift]?e.shift:hn.shift,i=Array.isArray(e.days)?_n.filter(t=>e.days.includes(t)):hn.days;return{planId:t,size:n,shift:r,days:i.length?i:hn.days}}function Sn(){let e=yn(pn.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function Cn(){let e=yn(pn.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function wn(e){let t=yn(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function Tn(){let e=yn(pn.carnet,null);return e&&typeof e.name==`string`?e:null}function C(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function En(e){return`https://wa.me/${Gt.whatsapp}?text=${encodeURIComponent(e)}`}function Dn(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function On(e,t){return new Date(e.getTime()+t*864e5)}function kn(e){return Jt[(e.getUTCDay()+6)%7]}function An(e){return e.toISOString().slice(0,10)}function jn(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function Mn(e){let[t,n,r]=e.split(`-`).map(Number);return jn(new Date(Date.UTC(t,n-1,r)))}function Nn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function Pn(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function Fn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function In(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function Ln(e,t,n){return`${e} ${e===1?t:n}`}function Rn(){let e=xn(),t=Yt.find(t=>t.id===e.planId),n=vn[e.shift],r=Sn(),i=Dn(),a=An(i.date),o=Cn().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||mn}}function zn(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=kn(r.date),s=Pn(n.from),c=Pn(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function Bn(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=On(a.date,e);r.days.includes(kn(t))&&(e===0&&a.minutes>Pn(i.to)||n&&o.has(An(t))||s.push(t))}return s}var Vn=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],Hn=Vn.flatMap(e=>e.fields);function Un(e,t){return!!String(e[t]??``).trim()}function Wn(e,t){return t.fields.filter(t=>Un(e,t.key)).length}function Gn(e){return Hn.filter(t=>Un(e,t.key)).length}function Kn(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function qn(e){let{ficha:t}=e,n=[],r=Vn.find(e=>e.id===`emergencia`);Wn(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),Tn()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=Gn(t);return i<Hn.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${Hn.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function Jn(e){return e.todayIso<=r.until}var Yn={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function Xn(e,t,n=``){Yn.status[e]={message:t,html:n}}function Zn(e){let t=Yn.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${C(t.message)} ${t.html}`.trim():``}</p>`}function Qn(){return`
    <div class="cl-page" data-cl-root>
      ${$n(Rn())}
    </div>
  `}function $n(e){return`
    <p class="cl-demo-note">
      ${g(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${er(e)}
    ${ir(e)}
    ${or()}
    ${sr(e)}
    ${cr(e)}
    ${lr(e)}
    <div class="cl-two-col">
      ${mr()}
      ${hr(e)}
    </div>
    ${Jn(e)?gr():``}
    ${_r()}
  `}function er(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=zn(e),c=Kn(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=Bn(e,1)[0],d=u&&An(u)===e.todayIso,f=qn(e),p={libre:`Los días de paseo de tu plan son ${In(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${g(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${C(a)}</strong>
            <small>${C(i.name)} · ${C(r.size)} · Turno ${C(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${C(kn(t.date))} ${jn(t.date)}</p>
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
          <p class="cl-fine">El estado sigue el horario del turno. El seguimiento en vivo todavía no está disponible. Horario exacto de retiro: <strong>${b}</strong> (te lo confirmamos por WhatsApp).</p>
        `:``}
        <div data-cl-region="alertas-hoy">${nr(c,!0)}</div>
        ${rr(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${g(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:C(kn(u))}</p>
            <p class="cl-next-date">${d?`${C(kn(u))} ${jn(u)}`:jn(u)}</p>
            <p class="cl-next-shift">Turno ${C(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${b}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${tr(e,f)}</div>
        </article>
      </div>
    </section>
  `}function tr(e,t=qn(e)){return t.length?`
    <ol class="cl-pending-list">
      ${t.map((e,t)=>`
        <li>
          <button type="button" class="cl-pending-item" data-cl-go="${e.go}">
            <span class="cl-pending-num" aria-hidden="true">${t+1}</span>
            <span>
              <strong>${C(e.text)}</strong>
              <small>${C(e.detail)}</small>
            </span>
            ${g(`arrowRight`,`cl-icon-sm`)}
          </button>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="cl-all-done">${g(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function nr(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${g(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${C(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function rr(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=On(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${Jt.map((e,t)=>On(a,t)).map(e=>{let t=An(e),a=kn(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${jn(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${Fn(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function ir(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${g(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${En(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${C(Gt.whatsappLabel)}</small></span>
      </a>
      ${Jn(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${g(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${C(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function ar(){return`Ahora: tema ${Ne()?`oscuro`:`claro`} · movimiento ${Pe()?`calmo (sin movimiento)`:`normal`}.`}function or(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${g(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${ar()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function sr(e){let t=Bn(e,10);return`
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
                ${t.map(t=>`<option value="${An(t)}">${C(kn(t))} ${jn(t)} · turno ${C(e.settings.shift.toLowerCase())}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-absence-reason"><span>Motivo <span class="cl-optional">(opcional)</span></span>
              <input id="cl-absence-reason" type="text" maxlength="140" placeholder="Por ejemplo: viaje" data-cl-absence-reason />
            </label>
            <button type="button" class="cl-btn" data-cl-absence-save>
              ${g(`message`,`cl-icon-sm`)} Avisar por WhatsApp
            </button>
            <p class="cl-fine">Se abre WhatsApp con el mensaje listo: solo tenés que tocar Enviar. El aviso también queda anotado en este dispositivo.</p>
          `:`<p>${b}: no hay próximos paseos con los días de tu plan.</p>`}
          ${Zn(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${C(kn(Nn(e.date)))} ${Mn(e.date)}</strong>
                    ${e.reason?`<small>${C(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${C(e.date)}" aria-label="Quitar la ausencia del ${Mn(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function cr(e){let{plan:t,settings:n,shift:r}=e,i=Xt[n.size],a=n.days.length===t.walks;return`
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
          <p class="cl-plan-name">${C(t.name)}</p>
          <p class="cl-plan-walks">${Ln(t.walks,`paseo`,`paseos`)} por semana · ${C(n.size)}</p>
          <p class="cl-plan-price"><b>${an(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${_n.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${Fn(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${C(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${b}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${g(`alertCircle`,`cl-icon-sm`)} El ${C(t.name)} incluye ${Ln(t.walks,`paseo`,`paseos`)} por semana y hay ${Ln(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${C(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${Yt.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${C(e.name)}</strong>
            <span>${Ln(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${an(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${C(n.size.toLowerCase())}):</strong> individual ${an(i.individual)} · en grupo ${an(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Zt.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${Yn.openGroups.has(`plan`)?`open`:``}>
        <summary>${g(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${Yt.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${C(e.name)} · ${Ln(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${gn.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(vn).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${_n.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${Zn(`plan`)}
        </div>
      </details>
    </section>
  `}function lr(e){let{ficha:t}=e,n=Gn(t),r=Hn.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${C(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${b}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${ur(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${C(Qt[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${b}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${nr(Kn(t))}</div>

      <div class="cl-ficha-groups">
        ${Vn.map(e=>fr(e,t)).join(``)}
      </div>
      ${Zn(`ficha`)}
    </section>
  `}function ur(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function dr(e,t){let n=Wn(e,t);return n===t.fields.length?`<span class="cl-count is-done">${g(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${b.toLowerCase()}</span>`}function fr(e,t){let n=Yn.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${g(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${dr(t,e)}</span>
        ${g(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>pr(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function pr(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${b}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${C(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${C(e.placeholder||`Pendiente de confirmar`)}">${C(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${C(r)}" placeholder="${C(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${Un(t,e.key)?``:b}</small>`:``}
    </label>
  `}function mr(){let e=Tn();return`
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
        <div><dt>Archivo</dt><dd>${e?C(e.name):`Sin archivo`}</dd></div>
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${C(e.date)}`:b}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${En(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${Zn(`carnet`)}
    </section>
  `}function hr(e){let t=wn(pn.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${an(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${En(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
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
              <span><strong>${C(e.name)}</strong><small>Cargado el ${C(e.date)} · Pendiente de confirmación</small></span>
            </li>
          `).join(``)}
        </ul>
        <a class="cl-btn is-secondary" href="${En(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${g(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${Zn(`comprobante`)}
    </section>
  `}function gr(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${g(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${C(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${C(r.title)}</h2>
        <p>${C(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${En(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function _r(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${g(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${Yn.resetArmed?`is-danger`:``}" data-cl-reset>
        ${Yn.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${Zn(`privacidad`)}
    </section>
  `}function vr(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=$n(Rn()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function yr(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=Rn();Object.entries({pendientes:()=>tr(t),"alertas-hoy":()=>nr(Kn(t.ficha),!0),"alertas-ficha":()=>nr(Kn(t.ficha)),"ficha-progreso":()=>ur(Gn(t.ficha),Hn.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),Vn.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=dr(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=Un(t.ficha,e.dataset.clFieldState)?``:b})}function br(e,t,n=``){Xn(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${C(t)} ${n}`.trim())}function xr(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,Yn.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Pe()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function Sr(){return jn(Dn().date)}function Cr(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return xr(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=Rn(),r=Cn().filter(t=>t.date!==e);r.push({date:e,reason:t}),bn(pn.ausencias,r);let i=En([`Hola, aviso que ${n.dogName===mn?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${kn(Nn(e)).toLowerCase()} ${Mn(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),Xn(`ausencia`,`Listo: anotamos la ausencia del ${Mn(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),vr(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return bn(pn.ausencias,Cn().filter(t=>t.date!==e)),Xn(`ausencia`,`Quitamos la ausencia del ${Mn(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),vr(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=Yt.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(br(`plan`,`El ${r.name} incluye ${Ln(r.walks,`paseo`,`paseos`)} por semana: elegí ${Ln(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(bn(pn.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),Xn(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),vr(`[data-cl-plan-save]`),!0):(br(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return Yn.resetArmed?(Object.values(pn).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),Yn.resetArmed=!1,Yn.status={},Xn(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),vr(`[data-cl-reset]`),!0):(Yn.resetArmed=!0,vr(`[data-cl-reset]`),!0);if(Yn.resetArmed&&!e.target.closest(`[data-cl-reset]`)){Yn.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function wr(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:Sr()};if(t.dataset.clFile===`carnet`)bn(pn.carnet,n),Xn(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),vr(`[data-cl-status='carnet']`);else{let t=[n,...wn(pn.comprobantes)].slice(0,10);bn(pn.comprobantes,t),Xn(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),vr(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=Sn();br(`ficha`,bn(pn.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function Tr(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=Sn();bn(pn.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),yr()}function Er(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?Yn.openGroups.add(t.dataset.clDetails):Yn.openGroups.delete(t.dataset.clDetails))}function Dr(){_e.push(Cr),ve.push(wr),document.addEventListener(`input`,Tr),document.addEventListener(`toggle`,Er,!0),Fe(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${ar()} Se guarda solo en este dispositivo.`)})}var Or=`America/Argentina/Buenos_Aires`,kr=`paseosJuan_paseador_progreso`,Ar=`paseosJuan_paseador_equipo`,jr=`paseosJuan_paseador_incidente`,Mr=`paseosJuan_paseador_ruta`,w=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],Nr={pendiente:0,retirado:1,paseando:2,entregado:3},Pr=`no-sale`,Fr={Mañana:`manana`,Tarde:`tarde`},Ir=/^[a-z0-9][a-z0-9_.-]{0,60}$/i,Lr={Mañana:x.manana,Tarde:x.tarde},Rr=[`Bajo`,`Medio`,`Alto`],zr=[`No se ven`,`Sí`,`No sé`],Br=`Perro externo`,Vr=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,Hr=dn(),T={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``,routeChange:null};function E(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Ur(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Wr(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Gr(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim().toLowerCase()}function Kr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Or,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:rn(t)}}function qr(e){let[t,n,r]=String(e).split(`-`);return r?`${r}/${n}/${t}`:e}function Jr(e,t){let n=(Jt.indexOf(e)-Jt.indexOf(t.day)+7)%7,[r,i,a]=t.iso.split(`-`).map(Number);return new Date(Date.UTC(r,i-1,a+n)).toISOString().slice(0,10)}function Yr(e){return e.minutes<810?`Mañana`:`Tarde`}function Xr(){let e=Kr(),t=T.day||e.day,n=T.shift||Yr(e),r=t===e.day;return{now:e,day:t,shift:n,isToday:r,iso:r?e.iso:Jr(t,e)}}function Zr(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Qr(e){let t=Lr[e];return`${t.from} a ${t.to}`}function $r(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}function ei(e){if(e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t} h ${n} min`:`${t} h`}function ti(e,t,n=`retiro`){let r=$r(e);if(r===null)return{text:`Hora: ${b.toLowerCase()}`,kind:`info`};let i=r-t;return i>0?{text:`${n===`entrega`?`Entrega `:``}${n===`entrega`?`en`:`En`} ${ei(i)}`,kind:i<=10?`soon`:`ok`}:i===0?{text:n===`entrega`?`Entrega ahora`:`Ahora`,kind:`soon`}:{text:n===`entrega`?`Entrega con ${ei(-i)} de atraso`:`${ei(-i)} de atraso`,kind:`late`}}function ni(e,t,n=`retiro`){let r=ti(e,t,n);return`<span class="pw-cd pw-cd--${r.kind}" data-pw-countdown="${E(e)}" data-pw-mode="${n}">${E(r.text)}</span>`}function ri(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function ii(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function ai(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${Zr(i)}`),t=t.filter(e=>!e.includes(r))}return n}function oi(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function si(e){return e.safety.some(e=>/bozal/i.test(e))}var ci=$t.filter(e=>e.sebastian>0),li=$t.filter(e=>e.sebastian===0&&e.juan>0),ui=$t.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function di(){return _.user()||{}}function fi(){return di().nombre||`equipo`}function pi(){return di().rol===`ayudante`}function mi(e){let t=di();if(!e||!t.usuario)return!1;let n=Gr(e);return n===Gr(t.usuario)||t.nombre&&n===Gr(t.nombre)}function hi(e,t=new Map){if(!e)return``;if(mi(e))return di().nombre||String(e);let n=String(e);return t.get(n)||t.get(Gr(n))||Kt.find(e=>e.id===Gr(n))?.name||n}function gi(e,t){return Gr(e)===Gr(t)}function _i(e){return Gr(e).startsWith(`tarde`)?`Tarde`:`Mañana`}function vi(e){return S.find(t=>t.id===e.perroId)||S.find(t=>Gr(t.name)===Gr(e.perroNombre))||{id:Ir.test(String(e.perroId||``))?String(e.perroId):``,name:String(e.perroNombre||`Perro sin nombre`),size:b,minutes:null,safety:[],status:`Activo`,unknown:!0}}function yi(e,t){let n=(Array.isArray(e.paradas)?e.paradas:[]).filter(e=>e&&(e.perroId||e.perroNombre)).map((e,t)=>{let n=vi(e),r=Number(e.minutos)||n.minutes||null,i=$r(e.hora)===null?``:String(e.hora).trim().padStart(5,`0`);return{index:t,dog:n,hora:i,minutos:r,salida:i&&r?ln(i,r):``,nota:String(e.nota||``).trim(),canSave:!!n.id}}).sort((e,t)=>($r(e.hora)??9999)-($r(t.hora)??9999)||e.index-t.index);return{ruta:String(e.ruta||`Pendiente de confirmar`),turno:_i(e.turno),dia:e.dia||``,paseador:String(e.paseador||``),ayudante:String(e.ayudante||``),supervisor:String(e.supervisor||``),notas:String(e.notas||``),fuente:t,record:e,stops:n}}function bi(e,t,n){let r=new Map;v.cached(`rutas`,{desde:n}).filter(t=>t.fecha===e&&t.ruta&&Array.isArray(t.paradas)).sort((e,t)=>String(e.actualizadoEn||``).localeCompare(String(t.actualizadoEn||``))).forEach(e=>r.set(e.ruta,e));let i=v.cached(`plantillas`).filter(e=>e.ruta&&Array.isArray(e.paradas)),a=i.length===0,o=new Map;return(a?Hr:i).filter(e=>gi(e.dia,t)).forEach(e=>o.set(e.ruta,yi(e,a?`planilla`:`plantilla`))),r.forEach((e,t)=>o.set(t,yi(e,`dia`))),[...o.values()].sort((e,t)=>e.turno===t.turno?e.ruta.localeCompare(t.ruta):e.turno===`Mañana`?-1:1)}function xi(e){let t=Ur(Mr,{})?.[di().usuario||``];return t&&t.iso===e.iso&&t.turno===e.shift?t.ruta:``}function Si(e,t){let n=Ur(Mr,{}),r=n&&typeof n==`object`?n:{};r[di().usuario||``]=t?{iso:e.iso,turno:e.shift,ruta:t}:null,Wr(Mr,r)}function Ci(e){let t=bi(e.iso,e.day,e.now.iso),n=t.filter(t=>t.turno===e.shift),r=n.filter(e=>mi(e.paseador)||mi(e.ayudante)),i=t.filter(t=>t.turno!==e.shift&&(mi(t.paseador)||mi(t.ayudante))),a=r.length?``:n.some(t=>t.ruta===xi(e))?xi(e):``,o=r.length?r:a?n.filter(e=>e.ruta===a):n;return{all:t,ofShift:n,mine:r,elsewhere:i,picked:a,shown:o,assigned:r.length>0,helping:r.find(e=>mi(e.ayudante)&&!mi(e.paseador))||null,fromPlanilla:o.some(e=>e.fuente===`planilla`)}}function wi(e){return e.flatMap(e=>e.stops.map(t=>({...t,route:e})))}function Ti(e,t){return wi(Ci(e).shown).find(e=>e.dog.id===t)||null}var Ei=new Map;function Di(e,t){if(!e.isToday||!D.ready)return;let n=[];t.forEach(r=>{let i=`${e.iso}|${r.turno}|${r.ruta}`,a=new Map(r.stops.map(e=>[e.dog.id||Gr(e.dog.name),e])),o=Ei.get(i);if(Ei.set(i,a),!o)return;let s=[...a.entries()].filter(([e])=>!o.has(e)).map(([,e])=>`${e.dog.name}${e.hora?` (${e.hora})`:``}`),c=[...o.entries()].filter(([e])=>!a.has(e)).map(([,e])=>e.dog.name),l=[...a.entries()].filter(([e,t])=>o.has(e)&&o.get(e).hora!==t.hora).map(([e,t])=>`${t.dog.name} pasa de ${o.get(e).hora||`sin hora`} a ${t.hora||`sin hora`}`),u=[];s.length&&u.push(`se ${s.length===1?`sumó`:`sumaron`} ${Zr(s)}`),c.length&&u.push(`se ${c.length===1?`quitó`:`quitaron`} ${Zr(c)}`),l.length&&u.push(`cambió el horario: ${Zr(l)}`),u.length&&n.push(`${t.length>1?`${r.ruta}: `:``}${u.join(` / `)}`)}),n.length&&(T.routeChange={text:`La ruta cambió: ${n.join(`. `)}.`,time:e.now.time},Da(T.routeChange.text))}function Oi(e){return v.cached(`avisos`).filter(t=>{let n=String(t.fecha||``),r=String(t.vigenteHasta||``);return n&&n>e?!1:r?r>=e:n===e}).sort((e,t)=>String(t.actualizadoEn||t.fecha||``).localeCompare(String(e.actualizadoEn||e.fecha||``)))}function ki(e){let t=Oi(e.now.iso);return t.length?`
    <section class="pw-notices" aria-labelledby="pw-avisos-title">
      <h2 class="pw-section-label" id="pw-avisos-title">${g(`bell`,`pw-icon pw-icon--sm`)} Avisos por barrio (${t.length})</h2>
      <ul class="pw-notice-list" role="list">
        ${t.map(e=>{let t=/seguridad|perro suelto/i.test(e.tipo||``);return`
            <li class="pw-notice ${t?`pw-notice--danger`:``}">
              ${g(t?`alertTriangle`:`mapPin`,`pw-icon`)}
              <div>
                <p class="pw-notice-head"><strong>${E(e.barrio||`Barrio sin cargar`)}</strong>${e.tipo?` · ${E(e.tipo)}`:``}</p>
                <p>${E(e.mensaje||e.titulo||``)}</p>
                <p class="pw-notice-meta">${e.vigenteHasta?`Vigente hasta el ${E(qr(e.vigenteHasta))}`:`Vigente hoy`}${e.creadoPorNombre?` · Avisó ${E(e.creadoPorNombre)}`:``}</p>
              </div>
            </li>
          `}).join(``)}
      </ul>
    </section>
  `:``}function Ai(e,t,n){return`${e}_${t}_${Fr[n]}`}function ji(e,t,n=di().usuario){return`${e}_${n||`sin-usuario`}_${Fr[t]}`}var Mi=new Map;function Ni(e,t){let n=new Map(v.cached(e,{desde:t}).map(e=>[e.id,e]));return Mi.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function Pi(e){let t=w.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===Pr;return{step:r?0:Math.max(Nr[e.estado]??0,n),noSale:r,times:t,record:e}}function Fi(e,t,n){let r=Ni(`paseos`,e);return Object.fromEntries(n.filter(e=>e.id).map(n=>[n.id,Pi(r.get(Ai(e,n.id,t)))]))}function Ii(e,t){return t.dog.id&&e[t.dog.id]||Pi(null)}function Li(e,t){let n=e.filter(e=>Ii(t,e).noSale).length,r=e.filter(e=>!Ii(t,e).noSale&&Ii(t,e).step>=w.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function Ri(e,t){let n=Ni(`checklists`,e).get(ji(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:ci.filter(e=>r[e.item]===!0).map(e=>e.item)}}function zi(e){let t=new Map,n=(e,n)=>{e&&n&&t.set(String(e),String(n))};return[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]].forEach(([e,t])=>{v.cached(e,t).forEach(e=>{n(e.creadoPor,e.creadoPorNombre),n(e.actualizadoPor,e.actualizadoPorNombre),w.forEach(t=>n(e[`${t.field}Por`],e[`${t.field}PorNombre`]))})}),t}function Bi(e,t){return e?mi(e)?`vos`:hi(e,t):b}function Vi(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Or,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Hi(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Vi(e.actualizadoEn);return`Último cambio: ${Bi(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}function Ui(e,t,n){let r=w[t].field,i=e?.[`${r}Por`];return!i||mi(i)?``:e[`${r}PorNombre`]||hi(i,n)}var Wi=Promise.resolve();function Gi(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&Mi.set(r,n);let i=Wi.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await v.save(e,i);return T.syncError&&=``,t}catch(e){return T.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,Oa(T.syncError),null}finally{r&&Mi.get(r)===n&&Mi.delete(r),Na()}});return Wi=i.catch(()=>null),i}function Ki(e,t,n,r){let i=t.now.iso,a={id:Ai(i,e.dog.id,t.shift),fecha:i,perroId:e.dog.id,perroNombre:e.dog.name,turno:t.shift,ruta:e.route.ruta,...n};return Da(r),Gi(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&Da(`${r} Sin señal: se enviará cuando haya señal.`)})}function qi(e,t){let n=e.now.iso,r=Object.fromEntries(ci.map(e=>[e.item,t.includes(e.item)])),i={id:ji(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=ci.length};return Gi(`checklists`,i,{optimisticRecord:i})}var D={key:``,stops:[],ready:!1};function Ji(e){let t=`${e}|${di().usuario||``}`;if(D.key===t)return;D.stops.forEach(e=>e()),D.key=t,D.stops=[],D.ready=!1;let n=[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]];Promise.allSettled(n.map(([e,t])=>v.list(e,t))).then(t=>{let n=t.find(e=>e.status===`rejected`);return n&&(T.syncError=`No se pudieron traer los datos del equipo: ${n.reason?.message||`error del servidor`}`,Oa(T.syncError)),Xi(e)}).catch(()=>null).finally(()=>{D.key===t&&(D.ready=!0,Na(),D.stops=n.map(([e,t])=>v.watch(e,t)))})}var Yi=!1;async function Xi(e){if(Yi)return;Yi=!0;let t=Ur(kr,null),n=Ur(Ar,null);if(!t&&!n)return;let r=[],i=Ni(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&Fr[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=S.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=Ai(e,t,o),c=Pi(i.get(s)),l=Math.min(n.length,w.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:w[l-1].estado};w.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(Gi(`paseos`,u,{optimisticRecord:u}))})});let a=Ni(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!Fr[o]||!Array.isArray(n))return;let s=n.filter(e=>ci.some(t=>t.item===e));s.length&&!a.has(ji(e,o))&&r.push(qi({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(kr),localStorage.removeItem(Ar)}catch{}r.length&&Da(`Se subió al equipo lo que tenías marcado en este celular.`)}}function Zi(){let e=Ur(jr,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function Qi(e){return`
    <div class="pw-shell">
      ${ea()}
      ${e}
    </div>
  `}function $i(){let e=Xr();Ji(e.now.iso);let t=Ci(e);Di(e,t.shown),Va.iso=e.now.iso,Va.shift=Yr(e.now),Va.minute=e.now.minutes;let n=wi(t.shown),r=e.isToday?Fi(e.iso,e.shift,n.map(e=>e.dog)):{},i=zi(e.now.iso);return`
    <main class="pw-main" id="pw-inicio">
      ${ta()}
      ${na()}
      ${ki(e)}
      ${ia(e,t,n,r,i)}
      <div class="pw-routes" id="pw-perros" tabindex="-1" aria-label="Perros de la ruta">
        ${t.shown.length?t.shown.map(n=>ua(n,e,t,r,i)).join(``):`
            <div class="pw-empty">
              <p><strong>No hay rutas cargadas para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
              <p>Si te pidieron un paseo, confirmalo con el coordinador o con Juan.</p>
            </div>
          `}
      </div>
      <div class="pw-columns">
        ${pa(e,t,i)}
        ${ma(e,n.map(e=>e.dog))}
      </div>
      <footer class="pw-footer">
        <p>Rutas y horarios: los arma el coordinador. Punto de partida: ${E(Gt.officialSources.routes)} (12/11/2026).</p>
        <p>Lo que marcás acá lo ven ${pi()?`el paseador, `:`tu ayudante, `}Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `}function ea(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel ${pi()?`del ayudante de paseador`:`del paseador`}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>${pi()?`Ayudante`:`Paseador`} · ${E(fi())}</small>
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
  `}function ta(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${g(`uploadCloud`,`pw-icon`)}<span>${E(n)}</span></p>`),T.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${g(`alertTriangle`,`pw-icon`)}
        <span>${E(T.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function na(){return T.routeChange?`
    <div class="pw-change" data-pw-change>
      ${g(`route`,`pw-icon pw-icon--lg`)}
      <div>
        <strong>${E(T.routeChange.text)}</strong>
        <p>Lo cambió el coordinador. Aviso recibido a las ${E(T.routeChange.time)}.</p>
      </div>
      <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-change-ok>Entendido</button>
    </div>
  `:``}function ra(e){let t=e.flatMap(e=>e.stops.map(e=>e.hora)).filter(Boolean).sort(),n=e.flatMap(e=>e.stops.map(e=>e.salida)).filter(Boolean).sort();return t.length?`${t[0]} a ${n[n.length-1]||t[t.length-1]}`:``}function ia(e,t,n,r,i){let a=t.helping,o=t.mine[0]||null,s=e.isToday?`hoy, ${e.day.toLowerCase()}`:`${e.day.toLowerCase()} ${qr(e.iso)}`,c;c=a?`Acompañás a ${E(hi(a.paseador,i)||`un paseador sin asignar`)} en ${E(a.ruta)}`:o?t.mine.length>1?`Tus rutas de ${s}: ${E(Zr(t.mine.map(e=>e.ruta)))}`:`Tu ruta de ${s}: ${E(o.ruta)}`:`Rutas de ${s} · turno ${e.shift.toLowerCase()}`;let l=`Hola, ${E(fi())}`,u=e.isToday?`${l} · ${e.now.date} · turno ${e.shift.toLowerCase()}`:`${l} · Planificación: no es hoy`,d=[...new Set(t.shown.map(e=>e.supervisor).filter(Boolean))],f=d.length?Zr(d):Lr[e.shift].supervisor,p=ra(t.shown)||Qr(e.shift),m=n.filter(e=>e.dog.status!==`Activo`),h=ii(n.map(e=>e.dog)),ee=[];if(t.assigned&&t.shown.length===1){let e=t.shown[0];a?ee.push(`<li>Paseador: <b>${E(hi(e.paseador,i)||`Pendiente de confirmar`)}</b></li>`):ee.push(`<li>Ayudante: ${e.ayudante?`<b>${E(hi(e.ayudante,i))}</b>`:`sin ayudante`}</li>`)}return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${u}</p>
          <h1 id="pw-today-title" tabindex="-1">${c}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${n.length}</b> ${n.length===1?`perro`:`perros`}</li>
            <li>${E(p)}</li>
            <li>Supervisa: ${E(f)}</li>
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
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${T.pickerOpen}" aria-controls="pw-picker">
            ${g(`sliders`,`pw-icon`)}
            ${T.pickerOpen?`Cerrar selector`:`Cambiar día o turno`}
          </button>
        </div>
      </div>
      ${T.pickerOpen?oa(e):``}
      ${t.fromPlanilla?`
        <p class="pw-source pw-source--warn">${g(`alertCircle`,`pw-icon`)}<span><b>Ruta tomada de la planilla, falta que el coordinador la confirme.</b> Horarios de BASE RUTAS (12/11/2026).</span></p>
      `:``}
      ${aa(e,t)}
      ${sa(e,n,m,h,r)}
    </section>
  `}function aa(e,t){let n=[];if(!t.assigned&&t.elsewhere.length){let r=t.elsewhere[0];n.push(`
      <p class="pw-source">
        ${g(`route`,`pw-icon`)}
        <span>${e.isToday?`Hoy`:`Ese día`} figurás en la ruta <b>${E(r.ruta)}</b> (turno ${r.turno.toLowerCase()}).</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-shift="${r.turno}">Ver turno ${r.turno.toLowerCase()}</button>
      </p>
    `)}return!t.assigned&&t.ofShift.length&&n.push(`
      <div class="pw-route-pick" role="group" aria-labelledby="pw-route-pick-label">
        <p id="pw-route-pick-label"><strong>¿En qué ruta estás ${e.isToday?`hoy`:`ese día`}?</strong>
          <span>No figurás como paseador ni ayudante en este turno. Si es un error, avisale al coordinador.</span></p>
        ${t.ofShift.length>1?`
          <div class="pw-route-chips">
            ${t.ofShift.map(e=>`
              <button type="button" class="pw-chip pw-chip--wide ${t.picked===e.ruta?`is-active`:``}" data-pw-route="${E(e.ruta)}" aria-pressed="${t.picked===e.ruta}">
                ${E(e.ruta)}<small>${e.stops.length} ${e.stops.length===1?`perro`:`perros`}${e.paseador?` · ${E(hi(e.paseador))}`:``}</small>
              </button>
            `).join(``)}
            <button type="button" class="pw-chip pw-chip--wide ${t.picked?``:`is-active`}" data-pw-route="" aria-pressed="${!t.picked}">
              Todas<small>${t.ofShift.length} rutas</small>
            </button>
          </div>
          <p class="pw-muted pw-small">Lo que elijas queda recordado en este celular.</p>
        `:``}
      </div>
    `),n.join(``)}function oa(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
    <div class="pw-picker" id="pw-picker">
      <div class="pw-picker-group" role="group" aria-label="Día">
        <span class="pw-picker-label">Día</span>
        <div class="pw-days">
          ${Jt.map(n=>`
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
              ${t}<small>${Qr(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function sa(e,t,n,r,i){let a=[],o=t.map(e=>e.dog);r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${ai(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let s=o.filter(si);if(s.length){let e=!pi()&&s.length>ui;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${Zr(s.map(e=>e.name))}`,text:e?`Según el inventario tenés ${ui} ${ui===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${Zr(n.map(e=>e.dog.name))}`,text:n.length===1?`Figura en la ruta con estado "${E(n[0].dog.status)}". No lo retires sin confirmarlo con el coordinador o con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con el coordinador o con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=Ri(e.now.iso,e.shift).checked.length,r=Li(t,i);n<ci.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${ci.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return a.length?`
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
  `:``}function ca(e,t){if(e.fuente===`dia`){let n=e.record.actualizadoPor?Bi(e.record.actualizadoPor,t):``,r=e.record.actualizadoEn?Vi(e.record.actualizadoEn):``;return`Cambio del día${n?` cargado por ${n}`:``}${r?` a las ${r}`:``}.`}return e.fuente===`plantilla`?`Plantilla semanal del coordinador.`:`Planilla RPJ (sin confirmar).`}function la(e,t,n){let r=e.stops.filter(e=>e.canSave);if(!e.stops.length)return``;if(!t.isToday){let t=e.stops[0];return`
      <div class="pw-next" data-pw-next="${E(e.ruta)}">
        <p class="pw-next-label">Primer retiro</p>
        <p class="pw-next-main">${E(t.dog.name)}${t.hora?` · ${E(t.hora)}`:``}</p>
      </div>
    `}let i=r.filter(e=>!Ii(n,e).noSale&&Ii(n,e).step===0),a=r.filter(e=>{let t=Ii(n,e);return!t.noSale&&t.step>0&&t.step<w.length}),o,s,c,l;if(i.length)c=i[0].hora,o=i.filter(e=>e.hora===c),s=`Próximo`,l=`retiro`;else if(a.length){let e=[...a].sort((e,t)=>String(e.salida||`99:99`).localeCompare(String(t.salida||`99:99`)));c=e[0].salida,o=e.filter(e=>e.salida===c),s=`Próxima entrega`,l=`entrega`}else return`
      <div class="pw-next pw-next--done" data-pw-next="${E(e.ruta)}">
        <p class="pw-next-label">${E(e.ruta)}</p>
        <p class="pw-next-main">${g(`checkCircle`,`pw-icon pw-icon--lg`)} Ruta completa</p>
      </div>
    `;return`
    <div class="pw-next ${ti(c,t.now.minutes,l).kind===`late`?`is-late`:``}" data-pw-next="${E(e.ruta)}">
      <p class="pw-next-label">${l===`entrega`?`Todos retirados · próxima entrega prevista`:`Retiro que sigue`}</p>
      <p class="pw-next-main">${s===`Próximo`?`Próximo: `:``}${E(Zr(o.map(e=>e.dog.name)))}${c?` · ${E(c)}`:``}</p>
      <p class="pw-next-time">${ni(c,t.now.minutes,l)}</p>
      <div class="pw-next-actions">
        ${o.map(t=>{let r=Ii(n,t);return`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-from-next="${E(e.ruta)}" data-pw-step="${E(t.dog.id)}" ${D.ready?``:`aria-disabled="true"`}>
              ${D.ready?`${w[r.step].action}${o.length>1?`: ${E(t.dog.name)}`:``}`:`Cargando lo marcado…`}
            </button>
          `}).join(``)}
      </div>
    </div>
  `}function ua(e,t,n,r,i){let a=ii(e.stops.map(e=>e.dog)),o=Li(e.stops,r),s=o.toWalk?Math.round(o.delivered/o.toWalk*100):100,c=`pw-ruta-${e.ruta.replace(/[^a-z0-9]+/gi,`-`)}`,l=[];return!n.helping&&e.paseador&&!mi(e.paseador)&&l.push(`Paseador: ${hi(e.paseador,i)}`),n.helping&&e.ayudante&&!mi(e.ayudante)&&l.push(`Ayudante: ${hi(e.ayudante,i)}`),!n.assigned&&e.ayudante&&l.push(`Ayudante: ${hi(e.ayudante,i)}`),`
    <section class="pw-section pw-route" aria-labelledby="${c}">
      <div class="pw-section-head">
        <div>
          <h2 id="${c}">Ruta ${E(e.ruta)} <span class="pw-count">${e.stops.length}</span></h2>
          <p class="pw-muted">${E(ca(e,i))} En orden, con la hora de retiro.${l.length?` ${E(l.join(` · `))}.`:``}</p>
          ${e.notas?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${E(e.notas)}</p>`:``}
        </div>
        ${t.isToday&&e.stops.length?`
          <div class="pw-progress" aria-label="Avance de la ruta ${E(e.ruta)}">
            <strong>${o.delivered} de ${o.toWalk} entregados${o.noSale?` · ${o.noSale} no ${o.noSale===1?`sale`:`salen`}`:``}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${s}%"></span></span>
          </div>
        `:``}
      </div>

      ${la(e,t,r)}

      ${a.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${g(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en esta ruta</strong>
            <ul>${ai(a).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${E(e.supervisor||Lr[t.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      `:``}

      ${!t.isToday&&e.stops.length?`
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      `:``}

      ${e.stops.length?`
        <ol class="pw-dogs" role="list">
          ${e.stops.map((n,o)=>fa({...n,route:e},o,t,Ii(r,n),oi(n.dog,a),i)).join(``)}
        </ol>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros en ${E(e.ruta)} para este turno.</strong></p>
          <p>Si te pidieron un paseo, confirmalo con el coordinador.</p>
        </div>
      `}
      <p class="pw-muted pw-legend">
        Categoría operativa: <b>SIN EVALUAR</b> salvo que se indique otra. ${E(Qt[`SIN EVALUAR`])}
        Fuente: Registro maestro, 14/08/2026.
      </p>
    </section>
  `}function da(e){return!e.nota||/^bozal$/i.test(e.nota)&&si(e.dog)||/^no juntar/i.test(e.nota)&&e.dog.safety.some(e=>ri(e)===`danger`)?``:e.nota}function fa(e,t,n,r,i,a){let{dog:o}=e,{times:s,noSale:c,record:l}=r,u=Math.min(r.step,w.length),d=!c&&u>=w.length,f=Hi(l,a),p=o.safety.filter(e=>ri(e)===`danger`).join(` `),m=i.filter(e=>!p.includes(e)),h=o.safety.filter(e=>ri(e)!==`info`),ee=o.safety.filter(e=>ri(e)===`info`),te=o.status!==`Activo`,ne=h.length||i.length||te,re=da(e),ie=e.minutos||o.minutes,ae=n.isToday&&e.canSave,oe=``;return n.isToday&&!c&&!d&&e.canSave&&(oe=u===0?ni(e.hora,n.now.minutes,`retiro`):e.salida?ni(e.salida,n.now.minutes,`entrega`):``),`
    <li class="pw-dog ${ne?`has-alert`:``} ${d?`is-done`:``} ${c?`is-nosale`:``}" data-pw-dog="${E(o.id)}">
      <div class="pw-dog-time">
        <span class="pw-dog-order" aria-label="Orden ${t+1}">${t+1}</span>
        <span class="pw-dog-hora">${e.hora?`${g(`clock`,`pw-icon pw-icon--sm`)} Retiro ${E(e.hora)}`:`Hora de retiro: ${b.toLowerCase()}`}</span>
        ${oe}
      </div>
      <div class="pw-dog-head">
        <h3>${E(o.name)}</h3>
        <span class="pw-dog-facts">${E(o.size)} · ${ie?`${ie} min`:`Duración: ${b.toLowerCase()}`}${e.salida?` · vuelve ~${E(e.salida)}`:``}</span>
      </div>

      ${ne?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${E(o.name)}">
          ${te?`
            <li class="pw-alert pw-alert--warn">
              ${g(`alertCircle`,`pw-icon`)}
              <span>${E(o.status)}: ${E(o.review||`su estado no es Activo.`)} Confirmalo con el coordinador o con Juan antes de retirarlo.</span>
            </li>
          `:``}
          ${h.map(e=>`
            <li class="pw-alert pw-alert--${ri(e)}">
              ${g(ri(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${E(e)}${ri(e)===`danger`&&i.length?`<b class="pw-today-tag">En esta ruta: ${Zr(i)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${m.length?`
            <li class="pw-alert pw-alert--danger">
              ${g(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${Zr(m)}<b class="pw-today-tag">En esta ruta</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${ee.map(e=>`<p class="pw-dog-note">${g(`users`,`pw-icon pw-icon--sm`)} ${E(e)}</p>`).join(``)}
      ${re?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${E(re)}</p>`:``}
      ${o.review&&!te?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${E(o.review)}</p>`:``}
      ${o.unknown?`<p class="pw-dog-review"><b>Perro nuevo en la ruta:</b> sin ficha en esta página (tamaño y alertas: ${b.toLowerCase()}). Preguntale al coordinador.</p>`:``}
      <p class="pw-dog-category"><span>${E(o.category||`SIN EVALUAR`)}</span> ${o.unknown?b:`Registro maestro 14/08/2026`}</p>

      ${n.isToday&&!e.canSave?`
        <p class="pw-note">Este perro no tiene identificador en la ruta: no se puede marcar. Avisale al coordinador.</p>
      `:``}

      ${ae?`
        ${c?`
          <p class="pw-nosale-label">${g(`x`,`pw-icon`)} No sale en este turno</p>
        `:`
          <ol class="pw-steps" aria-label="Avance de ${E(o.name)}">
            ${w.map((e,t)=>{let n=t<u?Ui(l,t,a):``;return`
                <li class="${t<u?`is-done`:``} ${t===u?`is-next`:``}">
                  <span class="pw-step-dot" aria-hidden="true">${t<u?g(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
                  <span>${e.label}${t<u?`<small>${s[t]?E(s[t]):`Sin hora`}</small>`:``}${n?`<small class="pw-marker">Marcó ${E(n)}</small>`:``}</span>
                  <span class="pw-sr">${t<u?`hecho`:`pendiente`}</span>
                </li>
              `}).join(``)}
          </ol>
        `}
        ${l?.nota?`<p class="pw-dog-nota"><b>Nota:</b> ${E(l.nota)}</p>`:``}
        ${f?`<p class="pw-dog-change ${l.pendiente?`is-pending`:``}">${E(f)}</p>`:``}
        <div class="pw-dog-actions">
          ${c?``:d?`
            <p class="pw-done-label">${g(`checkCircle`,`pw-icon`)} Entregado ${E(s[w.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${E(o.id)}" ${D.ready?``:`aria-disabled="true"`}>
              ${D.ready?w[u].action:`Cargando lo marcado…`}
            </button>
          `}
          ${!c&&u===0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${E(o.id)}" ${D.ready?``:`aria-disabled="true"`} aria-label="${E(o.name)} no sale en este turno">No sale</button>
          `:``}
          ${c||u>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${E(o.id)}" aria-label="Deshacer el último paso de ${E(o.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function pa(e,t,n){let{checked:r,record:i}=Ri(e.now.iso,e.shift),a=r.length>=ci.length,o=Hi(i,n),s=t.helping?hi(t.helping.paseador,n):``;return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">${pi()?`Tu checklist, hoy turno ${e.shift.toLowerCase()}. El inventario no asigna equipo al ayudante (${b.toLowerCase()}): revisá${s?` con ${E(s)}`:``} que esté todo lo del paseador.`:`Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.`}</p>
        </div>
        <span class="pw-count ${a?`is-ok`:``}">${r.length}/${ci.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${ci.map(e=>{let t=r.includes(e.item),n=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
            <li>
              <input class="pw-check-input" type="checkbox" id="${n}" data-pw-equip="${E(e.item)}" ${t?`checked`:``} />
              <label class="pw-check" for="${n}">
                <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                <span class="pw-check-text">${E(e.item)}</span>
                <span class="pw-check-qty">${e.sebastian}</span>
              </label>
            </li>
          `}).join(``)}
      </ul>
      <div class="pw-row">
        ${a?`<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`:`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      ${o?`<p class="pw-dog-change ${i?.pendiente?`is-pending`:``}">${E(o)}</p>`:``}
      <p class="pw-status" role="status">${E(T.equipStatus)}</p>
      ${li.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${li.map(e=>`${E(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function ma(e,t){let n=Zi(),r=[...t.map(e=>e.name),Br];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=T.previewOpen?va(n,e):null;return`
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
          ${tn.map((e,t)=>{let r=`pw-proto-${t}`;return`
              <li>
                <input class="pw-check-input" type="checkbox" id="${r}" data-pw-field="protocolo" value="${t}" ${n.protocolo.includes(t)?`checked`:``} />
                <label class="pw-check pw-check--step" for="${r}">
                  <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                  <span class="pw-check-text"><b>${t+1}.</b> ${E(e)}</span>
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
              <input type="checkbox" id="pw-inc-dog-${t}" data-pw-field="dogs" value="${E(e)}" ${n.dogs.includes(e)?`checked`:``} />
              <label for="pw-inc-dog-${t}">${E(e)}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <div class="pw-grid-2">
        <label class="pw-field">Hora
          <input type="time" data-pw-field="hora" value="${E(n.hora||e.now.time)}" />
        </label>
        <label class="pw-field">Lugar
          <input type="text" data-pw-field="lugar" value="${E(n.lugar)}" placeholder="Ej.: plaza, esquina (sin domicilios)" autocomplete="off" />
        </label>
      </div>

      <p class="pw-hint">Escribí lo que viste y oíste. Ej.: “tiró de la correa y gruñó”, no “se puso agresivo”.</p>

      <label class="pw-field">Antes: ¿qué estaba pasando?
        <textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto a 3 metros">${E(n.antes)}</textarea>
      </label>
      <label class="pw-field">Conducta: ¿qué hizo el perro? <span class="pw-req">(obligatorio)</span>
        <textarea data-pw-field="conducta" rows="2" placeholder="Ej.: se paró en dos patas, ladró y tiró hacia el otro perro">${E(n.conducta)}</textarea>
      </label>
      <label class="pw-field">¿Qué hiciste vos?
        <textarea data-pw-field="accion" rows="2" placeholder="Ej.: corté distancia, crucé la calle y lo senté">${E(n.accion)}</textarea>
      </label>
      <label class="pw-field">Después: ¿cómo quedó?
        <textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto y siguió el paseo">${E(n.despues)}</textarea>
      </label>

      <fieldset class="pw-fieldset">
        <legend>Nivel de riesgo <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-seg pw-seg--risk">
          ${Rr.map(e=>`
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
          ${zr.map((e,t)=>`
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
        <button class="pw-btn pw-btn--ghost ${T.confirmClear?`is-confirm`:``}" type="button" data-pw-clear>
          ${T.confirmClear?`¿Seguro? Tocá de nuevo`:n.registroId?`Empezar otro reporte`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${T.incidentStatus.startsWith(`Falta`)||T.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${E(T.incidentStatus)}</p>

      ${i&&i.ok?ha(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function ha(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${E(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${ga(e)}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${g(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function ga(e){return`https://wa.me/${Gt.whatsapp}?text=${encodeURIComponent(e)}`}function _a(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(Vr)?.[0]}}function va(e,t){let{missing:n,word:r}=_a(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=Yr(t.now),a=ba(),o=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,s=ya(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,pi()?`Ayudante de paseador: ${fi()}${a.paseador?` (con ${a.paseador})`:``}`:`Paseador: ${fi()}`,`Ruta: ${a.rutas||`Pendiente de confirmar`}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,o(`Lesiones`,e.lesiones),o(`Lugar`,e.lugar),``,o(`Antes`,e.antes),o(`Conducta observada`,e.conducta),o(`Qué hice`,e.accion),o(`Después`,e.despues),``,`Protocolo:`,...s].join(`
`)}}function ya(e){return tn.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function ba(){let e=Xr(),t=Ci({...e,day:e.now.day,iso:e.now.iso,isToday:!0,shift:Yr(e.now)}),n=zi(e.now.iso);return{rutas:t.shown.map(e=>e.ruta).join(`, `),paseador:t.helping?hi(t.helping.paseador,n):``}}function xa(e,t){let n=e.dogs.map(e=>S.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:ya(e),ruta:ba().rutas,titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function Sa(e,t=!1){T.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),Da(e)}function Ca(e,t){if(T.incidentSavedText===t)return Promise.resolve(null);T.incidentSavedText=t;let n=Xr();return Gi(`incidentes`,()=>xa({...e,registroId:Zi().registroId||e.registroId},n)).then(e=>{if(!e)return T.incidentSavedText=``,null;let t=Ur(jr,null);return t&&Wr(jr,{...t,registroId:e.id}),Sa(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function wa(){let e=Zi(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function Ta(){let e=wa();return Wr(jr,e),e}function Ea(e){if(!T.previewOpen)return;let t=va(e,Xr()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),T.previewOpen=!1,T.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=T.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=ga(t.text))}function Da(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function Oa(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var ka=[`data-pw-from-next`,`data-pw-route`,`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function Aa(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=ka.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]${t===`data-pw-step`?`:not([data-pw-from-next])`:``}`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function ja(){let e=document.activeElement,t=Aa(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var Ma=0;function Na(){clearTimeout(Ma),Ma=setTimeout(()=>{document.querySelector(`.pw-shell`)&&ja()},80)}function O(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function Pa(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function Fa(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:Pa(),block:`start`}),t.focus({preventScroll:!0}))}async function Ia(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function La(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return Xh(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return T.syncError=``,O(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return Fa(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return T.pickerOpen=!T.pickerOpen,O(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=Kr(),t=n.dataset.pwDay;return T.day=t===e.day?null:t,O(`[data-pw-day="${t}"]`),Da(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return T.shift=r.dataset.pwShift,O(`[data-pw-shift="${T.shift}"]`),Da(`Mostrando el turno ${T.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return T.day=null,T.shift=null,T.pickerOpen=!1,O(`#pw-today-title`),Da(`Mostrando hoy.`),!0;if(e.target.closest(`[data-pw-change-ok]`))return T.routeChange=null,O(`#pw-today-title`),!0;let i=e.target.closest(`[data-pw-route]`);if(i){let e=Xr(),t=i.dataset.pwRoute;return Si(e,t),O(`[data-pw-route="${CSS.escape(t)}"]`),Da(t?`Mostrando la ruta ${t}. Queda recordada en este celular.`:`Mostrando todas las rutas del turno.`),!0}let a=e.target.closest(`[data-pw-step]`);if(a){let e=a.dataset.pwStep,t=a.dataset.pwFromNext,n=Xr(),r=Ti(n,e);if(!n.isToday||!r?.canSave||!D.ready)return!0;let i=r.dog,o=Fi(n.now.iso,n.shift,[i])[e];if(o.noSale||o.step>=w.length)return!0;let s=w[o.step],c=di(),l={estado:s.estado};if(w.forEach((e,t)=>{t>=o.step||(l[e.field]=o.times[t],o.record?.[`${e.field}Por`]&&(l[`${e.field}Por`]=o.record[`${e.field}Por`],l[`${e.field}PorNombre`]=o.record[`${e.field}PorNombre`]||``))}),l[s.field]=n.now.time,l[`${s.field}Por`]=c.usuario||``,l[`${s.field}PorNombre`]=c.nombre||``,Ki(r,n,l,`${i.name}: ${s.done.toLowerCase()} a las ${n.now.time}.`),t){$();let e=document.querySelector(`[data-pw-from-next="${CSS.escape(t)}"]`)||document.querySelector(`[data-pw-next="${CSS.escape(t)}"]`)?.closest(`section`)?.querySelector(`h2`);e&&!e.hasAttribute(`tabindex`)&&e.tagName===`H2`&&e.setAttribute(`tabindex`,`-1`),e?.focus({preventScroll:!0})}else O(o.step+1>=w.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`);return!0}let o=e.target.closest(`[data-pw-nosale]`);if(o){let e=o.dataset.pwNosale,t=Xr(),n=Ti(t,e);return t.isToday&&n?.canSave&&D.ready&&(Ki(n,t,{estado:Pr},`${n.dog.name}: no sale en este turno.`),O(`[data-pw-undo="${CSS.escape(e)}"]`)),!0}let s=e.target.closest(`[data-pw-undo]`);if(s){let e=s.dataset.pwUndo,t=Xr(),n=Ti(t,e);if(!t.isToday||!n?.canSave||!D.ready)return!0;let r=n.dog,i=Fi(t.now.iso,t.shift,[r])[e];if(i.noSale){let a=i.times.reduce((e,t,n)=>t?n+1:e,0);return Ki(n,t,{estado:a?w[a-1].estado:`pendiente`},`${r.name}: se deshizo "no sale".`),O(a>=w.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(!i.step)return!0;let a=i.step-1,o={estado:a?w[a-1].estado:`pendiente`};return w.forEach((e,t)=>{o[e.field]=t<a?i.times[t]:``,t>=a&&(o[`${e.field}Por`]=``,o[`${e.field}PorNombre`]=``)}),Ki(n,t,o,`${r.name}: se deshizo "${w[a].done.toLowerCase()}".`),O(`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(e.target.closest(`[data-pw-equip-all]`))return qi(Xr(),ci.map(e=>e.item)),T.equipStatus=`Equipo completo. ¡A salir!`,O(`[data-pw-equip-reset]`),Da(T.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return qi(Xr(),[]),T.equipStatus=`Lista de equipo desmarcada.`,O(`[data-pw-equip-all]`),Da(T.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=Ta(),t=va(e,Xr());return T.confirmClear=!1,t.ok?(T.previewOpen=!0,T.incidentStatus=T.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,O(`[data-pw-message]`),Da(T.incidentStatus),Ca(e,t.text),!0):(T.previewOpen=!1,T.incidentStatus=t.missing.length?`Falta completar: ${Zr(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,O(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),Da(T.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=Zi(),t=va(e,Xr());return t.ok&&Ca(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=Zi(),n=va(t,Xr());return n.ok&&Ca(t,n.text),Ia(e).then(e=>{T.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=T.incidentStatus,t.classList.toggle(`is-warn`,!e)),Da(T.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!T.confirmClear)return T.confirmClear=!0,O(`[data-pw-clear]`),!0;let e=!!Zi().registroId;try{localStorage.removeItem(jr)}catch{}return T.confirmClear=!1,T.previewOpen=!1,T.incidentSavedText=``,T.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,O(`#pw-incidente`),Da(T.incidentStatus),!0}if(T.confirmClear&&!e.target.closest(`[data-pw-clear]`)){T.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=Zi().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function Ra(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=Xr(),{checked:n}=Ri(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return qi(e,i),T.equipStatus=i.length>=ci.length?`Equipo completo. ¡A salir!`:``,O(`[data-pw-equip="${CSS.escape(r)}"]`),T.equipStatus&&Da(T.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(Ea(Ta()),!0):!1}function za(e){e.target.closest?.(`[data-pw-field]`)&&Ea(Ta())}function Ba(){_e.push(La),ve.push(Ra),document.addEventListener(`input`,za),$e(e=>{[`paseos`,`checklists`,`incidentes`,`rutas`,`plantillas`,`avisos`].includes(e)&&Na()}),window.addEventListener(`online`,Na),window.addEventListener(`offline`,Na),setInterval(Ha,15e3)}var Va={iso:``,shift:``,minute:-1};function Ha(){if(!document.querySelector(`.pw-shell`))return;let e=Kr();e.iso!==Va.iso||Yr(e)!==Va.shift?Na():e.minutes!==Va.minute&&(Va.minute=e.minutes,document.querySelectorAll(`[data-pw-countdown]`).forEach(t=>{let n=ti(t.dataset.pwCountdown,e.minutes,t.dataset.pwMode);t.textContent=n.text,t.className=`pw-cd pw-cd--${n.kind}`,t.closest(`.pw-next`)?.classList.toggle(`is-late`,n.kind===`late`)}))}var Ua=`America/Argentina/Buenos_Aires`,Wa=[`manana`,`tarde`],Ga=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,Ka=/(\d[\s.-]?){8,}/,qa=10,Ja=15,Ya=[`paseos`,`checklists`,`incidentes`,`plantillas`,`rutas`,`avisos`,`solicitudes`,`observaciones`,`cierres`],Xa=7,Za={admin:`Admin`,supervisor:`Supervisor`,coordinador:`Coordinación`,paseador:`Paseador`,ayudante:`Ayudante de paseador`},Qa=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],$a=[`no sale`,`agregar perro`,`cambiar hora`,`cambiar paseador o ayudante`,`otro`],eo={pendiente:{label:`Pendiente`,tone:`warn`},aplicado:{label:`Aplicado`,tone:`ok`},rechazado:{label:`Rechazado`,tone:`danger`}},to=dn(),k={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,observationDraft:`paseosJuanSupervisor_observacionBorrador`,avisoDraft:`paseosJuanSupervisor_avisoBorrador`,requestDraft:`paseosJuanSupervisor_pedidoBorrador`},no={observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},ro=null,io=null,ao=null,oo=new Map,so=new Set,co=new Set,lo=new Map,uo=new Map,fo=new Set,po=new Map,mo=new Set,ho=new Map,go=!1,_o=!1,vo=null,yo=``,bo=`idle`;function A(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function xo(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function j(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function So(e){try{localStorage.removeItem(e)}catch{}}var Co=8e3;function M(e,t,n=`ok`){ro={area:e,text:t,tone:n,at:Date.now()}}function wo(e){return ro&&Date.now()-ro.at>Co&&(ro=null),ro&&ro.area===e?ro:null}function To(e){let t=wo(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?A(t.text):``}</p>
  `}function Eo(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function Do(e,t,n){return`${e} ${e===1?t:n}`}function Oo(e){let t=String(e||``).match(/^(\d{1,2}):(\d{2})/);return t?Number(t[1])*60+Number(t[2]):null}function ko(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function Ao(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function jo(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Ua,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:Jt[(n+6)%7]}}function Mo(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function No(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:b}function Po(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function Fo(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Ua,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Io(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:y(t)}function Lo(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function Ro(e){return e.minutes<810?`manana`:`tarde`}function zo(e){let t=Ao(e);return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function Bo(e,t){let n=x[e];return t.minutes<Oo(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=Oo(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function Vo(){return _.user()||{}}function Ho(e){let t=Vo();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function Uo(e,t){if(!e)return``;if(t?.actualizadoPor===e&&t.actualizadoPorNombre)return t.actualizadoPorNombre;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=Vo();if(n.usuario===e&&n.nombre)return n.nombre;let r=Kt.find(t=>t.id===e);if(r)return r.name;for(let t of[`checklists`,`paseos`,`incidentes`])for(let n of qo(t)){if(n.creadoPor===e&&n.creadoPorNombre)return n.creadoPorNombre;if(n.actualizadoPor===e&&n.actualizadoPorNombre)return n.actualizadoPorNombre}return e}function Wo(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=Uo(e.actualizadoPor||e.creadoPor,e),r=Fo(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function Go(e){let t=y();return e===`plantillas`||e===`avisos`?{}:e===`observaciones`?{desde:Mo(t,-6)}:e===`solicitudes`?{desde:Mo(t,-2)}:{desde:t}}function Ko(){_.token()&&Ya.forEach(e=>{let t=Go(e),n=`${e}|${t.desde||``}`;mo.has(n)||(mo.add(n),e===`solicitudes`&&is(),v.watch(e,t),v.list(e,t).then(()=>{fo.add(e),po.delete(e)}).catch(t=>{fo.add(e),po.set(e,t?.message||`No se pudieron traer los datos.`)}).finally(ns))})}function qo(e){let t=new Map(v.cached(e,Go(e)).map(e=>[e.id,e]));return lo.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function Jo(e,t,n,r,i=`ok`){if(!t.id)return Yo(e,t,n,r,i);let a=`${e}:${t.id}`,o=(uo.get(a)||Promise.resolve()).then(()=>Yo(e,t,n,r,i));return uo.set(a,o),o.then(()=>{uo.get(a)===o&&uo.delete(a)}),o}async function Yo(e,t,n,r,i){try{let a=await v.save(e,t);if(a.pendiente)M(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=lo.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&lo.set(t,a),M(n,r,i)}return a}catch(e){return M(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function Xo(e,t,n,r){try{return await v.remove(e,t),lo.delete(`${e}:${t}`),M(n,r,`info`),!0}catch(e){return M(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function Zo(e=!0){if(!_.token())return;let t=await Promise.allSettled(Ya.map(e=>v.list(e,Go(e))));if(t.forEach((e,t)=>{fo.add(Ya[t]),e.status===`rejected`?po.set(Ya[t],e.reason?.message||`No se pudieron traer los datos.`):po.delete(Ya[t])}),!e)return;let n=t.find(e=>e.status===`rejected`);n?M(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?M(`sync`,`Datos actualizados a las ${jo().time} hs.`):M(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),N(`sv-refresh`)}function Qo(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function $o(){vo=null,Qo()&&document.querySelector(`.sv-shell`)&&ts()}function es(){let e=xo(k.folds,{}),t=!1;document.querySelectorAll(`.sv-shell [data-sv-fold]`).forEach(n=>{e[n.dataset.svFold]!==n.open&&(e[n.dataset.svFold]=n.open,t=!0)}),t&&j(k.folds,e),document.querySelectorAll(`.sv-shell [data-sv-stop-more]`).forEach(e=>{e.open?so.add(e.dataset.svStopMore):so.delete(e.dataset.svStopMore)})}function ts(){es();let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>2&&window.scrollTo(0,r),!t)return;let i=document.getElementById(t);if(i&&(i.focus({preventScroll:!0}),n&&typeof i.setSelectionRange==`function`))try{i.setSelectionRange(n[0],n[1])}catch{}}function ns(){vo||=setTimeout($o,40)}function rs(){Qo()&&document.querySelector(`.sv-shell`)&&jo().time!==yo&&document.activeElement?.tagName!==`SELECT`&&ts()}function is(){go||=(qo(`solicitudes`).forEach(e=>ho.set(e.id,e.estado||`pendiente`)),!0)}function as(){let e=Vo().usuario,t=[];if(qo(`solicitudes`).forEach(n=>{let r=n.estado||`pendiente`,i=ho.get(n.id);go&&i&&i!==r&&r!==`pendiente`&&n.creadoPor===e&&t.push(n),ho.set(n.id,r)}),!t.length)return;let n=t.filter(e=>e.estado===`aplicado`);M(`requests`,`El coordinador ${t.map(e=>`${e.estado===`aplicado`?`aplicó`:`rechazó`} «${Is(e)}»${e.respuesta?`: ${e.respuesta}`:``}`).join(` · `)}.${n.length?` La ruta ya muestra el cambio.`:``}`,n.length?`ok`:`info`),n.length&&(v.list(`rutas`,Go(`rutas`)).catch(()=>{}),v.list(`plantillas`,Go(`plantillas`)).catch(()=>{}))}function os(){_o||(_o=!0,$e(e=>{Ya.includes(e)&&(fo.add(e),e===`solicitudes`&&as(),ns())}),window.addEventListener(`online`,ns),window.addEventListener(`offline`,ns),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Qo()&&Zo(!1)}),setInterval(rs,1e4))}function ss(){try{return Object.values(no).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function cs(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=ms(e.dogId),n=Po(e.fecha)||Io(Lo(e.id))||y();return{id:ko(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:x[e.shift]?.label||``,titulo:`Observación: ${t?t.name:b}`,autorAnterior:e.autor||``,migrado:!0}}async function ls(e,t){try{return await v.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function us(){if(bo!==`idle`||!_.token()||!ss()||!navigator.onLine)return;bo=`running`;let e=0,t=0,n=``,r=xo(no.observations,[]),i=[];for(let a of r){let r=cs(a);if(!r)continue;let o=await ls(`observaciones`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?j(no.observations,i):So(no.observations);let a=xo(no.closure,{}),o=Object.entries(a).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&Wa.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(o.length){let r=o.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await v.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,s]of o){let[o,c]=a.split(`|`),l=`${o}_${c}`;if(i.has(l))continue;let u=await ls(`cierres`,{id:l,fecha:o,turno:x[c].label,notas:String(s.notas||``),resumen:``,cerrado:!!s.cerrado,horaCierre:s.cerrado?String(s.cerrado):``,migrado:!0});u?(r[a]=s,t+=1,n=u):e+=1}Object.keys(r).length?j(no.closure,r):So(no.closure)}else t+=o.length}else So(no.closure);bo=`done`,(e||t)&&M(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),ns()}function ds(){let e=jo(),t=xo(k.view,{}),n=Ro(e),r=t.date===e.iso&&Wa.includes(t.shift)?t.shift:n;return{day:e.dayName,shift:r,now:e,isToday:!0,isCurrent:r===n,fecha:e.iso,fechaLabel:e.label}}function fs(e){j(k.view,{date:jo().iso,shift:e})}function ps(e,t=!1){let n=xo(k.folds,{});return typeof n[e]==`boolean`?n[e]:t}function ms(e){return S.find(t=>t.id===e)}function hs(e){let t=Ao(e);return S.find(e=>Ao(e.name)===t)}function gs(e){return(e?.safety||[]).some(e=>/bozal/i.test(e))}function _s(e){return(e?.safety||[]).find(e=>/bozal/i.test(e))||``}function vs(e,t){return Ao(e)===Ao(t)}function ys(e){let t=e.perroId&&ms(e.perroId)||e.perroNombre&&hs(e.perroNombre)||null,n=Number(e.minutos)||t?.minutes||null;return{perroId:t?.id||e.perroId||``,perroNombre:e.perroNombre||t?.name||`Pendiente de confirmar`,hora:Oo(e.hora)===null?``:String(e.hora).slice(0,5),minutos:n,nota:e.nota||``,dog:t}}function bs(e,t){let n=Array.isArray(e.paradas)?e.paradas:Array.isArray(e.perros)?e.perros.map(e=>({perroId:e,perroNombre:ms(e)?.name||e,hora:``})):[];return{code:e.ruta||e.id||`Pendiente de confirmar`,source:t,record:e,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,stops:n.map(ys)}}function xs(e){let t=new Map;qo(`plantillas`).filter(t=>vs(t.dia,e.day)&&zo(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,bs(e,`plantilla`))),qo(`rutas`).filter(t=>t.fecha===e.fecha&&zo(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,bs(e,`dia`)));let n=!(fo.has(`plantillas`)&&fo.has(`rutas`)),r=!1;return t.size||(to.filter(t=>vs(t.dia,e.day)&&zo(t.turno)===e.shift).forEach(e=>t.set(e.ruta,bs(e,`planilla`))),r=t.size>0),{routes:[...t.values()].sort((e,t)=>e.code.localeCompare(t.code)),fallback:r,loading:n}}function Ss(e){return e.source===`dia`?`Cambio del día (coordinador)`:e.source===`plantilla`?`Plantilla semanal (coordinador)`:`Planilla RPJ (respaldo)`}function Cs(e){let t=new Map;return e.forEach(e=>e.stops.forEach(e=>{e.dog&&!t.has(e.dog.id)&&t.set(e.dog.id,e.dog)})),[...t.values()]}function ws(e,t,n){return`${e}_${t}_${n}`}function Ts(){return new Map(qo(`paseos`).map(e=>[e.id,e]))}function Es(e,t,n){let r=t?.estado||`pendiente`,i=Oo(e.hora),a=Number(e.minutos)||null,o=Oo(t?.horaRetiro),s=[`retirado`,`paseando`,`entregado`].includes(r),c=o??i,l=s&&o!==null&&i!==null?o-i:0,u=l>qa,d={estado:r,retirado:s,record:t,pickupDelay:l,pickupLate:u,planned:i,minutos:a};if(r===`no-sale`)return{...d,kind:`nosale`,label:`No sale`,tone:`neutral`,live:`nosale`};if(r===`entregado`){let e=Oo(t?.horaEntrega),n=e!==null&&c!==null?e-c:null,r=n!==null&&a?n>a+Ja:!1;return{...d,kind:`entregado`,label:`Entregado${t?.horaEntrega?` ${t.horaEntrega}`:``}`,tone:`ok`,live:`entregado`,duration:n,deliveryLate:r,late:u||r}}if(s){let e=c===null?null:n-c;if(e!==null&&a&&e>a+Ja)return{...d,kind:`demorada`,label:`Entrega demorada ${e-a} min`,tone:`danger`,live:`atrasado`,walked:e,late:!0};let i=r===`paseando`?`Paseando`:`Retirado${t?.horaRetiro?` ${t.horaRetiro}`:``}`;return{...d,kind:`curso`,label:i,tone:`info`,live:`atiempo`,walked:e,late:u}}if(i===null)return{...d,kind:`sinhora`,label:`Hora sin confirmar`,tone:`neutral`,live:`atiempo`};let f=n-i;return f>qa?{...d,kind:`atrasado`,label:`Atrasado ${f} min`,tone:`danger`,live:`atrasado`,delay:f,late:!0}:f>=0?{...d,kind:`ahora`,label:`Retirar ahora`,tone:`warn`,live:`atiempo`,delay:f}:{...d,kind:`espera`,label:`Retira ${e.hora}`,tone:`neutral`,live:`atiempo`}}function Ds(e,t,n=Ts()){return t.stops.map(t=>{let r=t.perroId?ws(e.fecha,t.perroId,e.shift):``;return{stop:t,id:r,status:Es(t,r?n.get(r):null,e.now.minutes)}})}function Os(e){let t={atiempo:0,atrasado:0,entregado:0,nosale:0};return e.forEach(({status:e})=>{t[e.live]+=1}),t}function ks(e,t){return qo(`checklists`).filter(n=>n.fecha===e&&(zo(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function As(e,t,n){return n&&ks(e,t).find(r=>r.id===`${e}_${n}_${t}`||r.creadoPor===n)||null}function js(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>Ms(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:Uo(e.creadoPor||e.actualizadoPor,e),at:Fo(e.actualizadoEn||e.creadoEn)}}function Ms(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):b}function Ns(e){return qo(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function Ps(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>ms(e)?.name||e);return t.length?Eo(t):b}function Fs(e){return qo(`avisos`).filter(t=>(t.vigenteHasta?t.vigenteHasta>=e:t.fecha===e)&&(!t.fecha||t.fecha<=e)).sort((e,t)=>Number(t.tipo===`seguridad`)-Number(e.tipo===`seguridad`)||String(t.fecha||``).localeCompare(String(e.fecha||``)))}function Is(e){return`${e.tipo||`Cambio`}${e.perroNombre?` · ${e.perroNombre}`:``}${e.ruta?` · ${e.ruta}`:``}`}function Ls(e,t){return qo(`solicitudes`).filter(n=>n.fecha===e&&zo(n.turno)===t)}function Rs(e){let t=Vo().usuario;return qo(`solicitudes`).filter(n=>(n.creadoPor?n.creadoPor===t:n.pendiente)&&(n.fecha>=e||(n.estado||`pendiente`)===`pendiente`)).sort((e,t)=>String(t.creadoEn||`9`).localeCompare(String(e.creadoEn||`9`)))}function zs(e,t=``,n=``,r=!1){let i=n?ms(n):null;return{fecha:e.fecha,shift:e.shift,ruta:t,perroId:i?.id||``,perroNombre:i?.name||``,tipo:i?`no sale`:`otro`,detalle:``,motivo:``,urgente:!1,open:r}}function Bs(e){let t=xo(k.requestDraft,{});return t.fecha!==e.fecha||t.shift!==e.shift?zs(e):{...zs(e),...t}}function Vs(e){let t=new Set,n=[];return e.forEach(r=>{let i=new Set(r.stops.map(e=>e.dog?.name).filter(Boolean));r.stops.forEach(({dog:a})=>{(a?.incompatibleWith||[]).forEach(o=>{let s=[a.name,o].sort().join(`|`);if(t.has(s))return;let c=i.has(o)?r:e.find(e=>e.stops.some(e=>e.dog?.name===o));c&&(t.add(s),n.push({a:a.name,b:o,sameRoute:c===r,route:r.code,otherRoute:c.code}))})})}),n.sort((e,t)=>Number(t.sameRoute)-Number(e.sameRoute))}function Hs(e){let t=Cs(e),n=Vs(e),r=t.filter(gs),i=t.filter(e=>e.status!==`Activo`),a=t.filter(e=>e.review&&e.status===`Activo`),o=t.filter(e=>e.category===`SIN EVALUAR`),s=e.flatMap(e=>e.stops.filter(e=>!e.dog).map(t=>`${t.perroNombre} (${e.code})`)),c=[];return n.length&&c.push({tone:`danger`,icon:`alertTriangle`,title:n.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${n.length} parejas que no pueden ir juntas`,lines:n.map(e=>`No juntar: ${e.a} con ${e.b}${e.sameRoute?` (los dos en ${e.route})`:` (${e.route} y ${e.otherRoute}: que no se crucen)`}.`),action:n.some(e=>e.sameRoute)?`Que no caminen juntos. Si la ruta los junta, pedile el cambio al coordinador.`:`Que los paseadores no se crucen con esos perros.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),r.length&&c.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${Do(r.length,`perro`,`perros`)}`,lines:r.map(e=>`${e.name}: ${_s(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),i.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${i.length===1?`sale ${i[0].name}`:`salen ${i.length} perros`}`,lines:i.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),s.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`${Do(s.length,`perro de la ruta no tiene`,`perros de la ruta no tienen`)} ficha`,lines:s.map(e=>`${e}: ${b}.`),action:`No se puede marcar el retiro desde acá. Pedile al coordinador que lo revise.`,source:`Fuente: rutas del coordinador y registro de perros.`}),a.length&&c.push({tone:`info`,icon:`fileText`,title:`${Do(a.length,`perro tiene`,`perros tienen`)} datos a revisar`,lines:a.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${Wt}.`}),o.length>1&&c.push({tone:`info`,icon:`eye`,title:`${o.length} perros salen en grupo SIN EVALUAR`,lines:[`${Qt[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),c}var Us=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function Ws(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function Gs(e){return{...Ws(e),...xo(k.observationDraft,{})}}function Ks(){let e=Go(`observaciones`).desde;return qo(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function qs(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${Vo().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function Js(e){return[`Observación de conducta — ${Gt.name}`,`Perro: ${e.perroNombre||ms(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${No(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${qs(e)}`].join(`
`)}function Ys(e){return`${e.fecha}_${e.shift}`}function Xs(e){return qo(`cierres`).find(t=>t.id===Ys(e))||null}function Zs(e){return ao&&ao.id===Ys(e)?ao.notas:Xs(e)?.notas||``}function Qs(e,t){return e?Uo(e,t):``}function $s(e,t){let n=Ts(),r=t.flatMap(t=>Ds(e,t,n).map(e=>({...e,route:t}))),i=r.filter(e=>e.status.kind!==`nosale`);return{items:r,going:i,late:i.filter(e=>e.status.late),onTime:i.filter(e=>!e.status.late),noSale:r.filter(e=>e.status.kind===`nosale`),delivered:i.filter(e=>e.status.kind===`entregado`),notPicked:i.filter(e=>!e.status.retirado),notDelivered:i.filter(e=>e.status.retirado&&e.status.kind!==`entregado`)}}function ec(e){let{stop:t,status:n}=e,r=[];return n.kind===`atrasado`&&r.push(`sin retiro, previsto ${t.hora} (${n.delay} min)`),n.pickupLate&&r.push(`retiro previsto ${t.hora}, retirado ${n.record?.horaRetiro} (+${n.pickupDelay} min)`),n.kind===`demorada`&&r.push(`entrega demorada: ${n.walked} min de ${n.minutos} previstos`),n.deliveryLate&&r.push(`entrega demorada: ${n.duration} min de ${n.minutos} previstos`),`${t.perroNombre} (${r.join(`; `)||`con atraso`})`}function tc(e,t){let n=x[e.shift],{routes:r,fallback:i}=xs(e),a=$s(e,r),o=t||Xs(e),s=Vs(r),c=Cs(r).filter(gs),l=Ks().filter(t=>t.fecha===e.fecha&&zo(t.turno)===e.shift),u=Ns(e.fecha),d=Ls(e.fecha,e.shift),f=Zs(e),p=Vo(),m=nc(e,r),h=e=>e.length?e.map(e=>e.stop.perroNombre).join(`, `):`ninguno`,ee=[`Cierre de turno — ${Gt.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisó: ${p.nombre||`Pendiente de confirmar`}`,`Rutas${i?` (tomadas de la planilla RPJ)`:``}:`,...r.map(e=>`- ${e.code}: paseador ${Qs(e.paseador)||`Pendiente de confirmar`}${e.ayudante?`, ayudante ${Qs(e.ayudante)}`:``} · ${Do(e.stops.length,`perro`,`perros`)}`),`Cumplimiento: ${a.onTime.length} a tiempo · ${a.late.length} con atraso · ${a.noSale.length} no salieron (de ${a.items.length} previstos)`,`- Con atraso: ${a.late.length?a.late.map(ec).join(`; `):`ninguno`}`,`- No salieron: ${h(a.noSale)}`,`- Sin retiro marcado: ${h(a.notPicked)}`,`- Sin entrega marcada: ${h(a.notDelivered)}`,`Entregados: ${a.delivered.length} de ${a.going.length}`,`Checklist del equipo: ${m.length?m.map(e=>`${e.name}: ${e.checklist?js(e.checklist).complete?`equipo completo`:`incompleto${js(e.checklist).missing.length?` (falta ${js(e.checklist).missing.join(`, `)})`:``}`:`sin cargar`}`).join(`; `):`sin equipo asignado`}`,`Incidentes del día: ${u.length?u.map(e=>`${e.hora||`sin hora`} ${e.titulo||Ps(e)}`).join(`; `):`ninguno cargado`}`,`Pedidos de cambio al coordinador: ${d.length?d.map(e=>`${Is(e)} (${eo[e.estado]?.label||`Pendiente`})`).join(`; `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${s.length?s.map(e=>`${e.a} con ${e.b}`).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${c.length?c.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${l.length}`,`Notas del supervisor: ${f.trim()||`sin notas`}`];return o?.cerrado&&ee.push(`Turno cerrado a las ${o.horaCierre||Fo(o.actualizadoEn)||`Pendiente de confirmar`} hs por ${Uo(o.actualizadoPor,o)||`Pendiente de confirmar`}.`),ee.join(`
`)}function nc(e,t){let n=new Map,r=(e,t,r)=>{if(!e)return;let i=n.get(e)||{usuario:e,name:Uo(e),roles:[]};i.roles.push(`${t} ${r}`),n.set(e,i)};return t.forEach(e=>{r(e.paseador,`Paseador`,e.code),r(e.ayudante,`Ayudante`,e.code)}),ks(e.fecha,e.shift).forEach(e=>{let t=e.creadoPor||String(e.id).split(`_`)[1];t&&!n.has(t)&&n.set(t,{usuario:t,name:Uo(t,e),roles:[`Sin ruta asignada`]})}),[...n.values()].map(t=>({...t,checklist:As(e.fecha,e.shift,t.usuario)}))}function rc(e){return`
    <div class="sv-shell">
      ${ic()}
      ${e}
    </div>
  `}function ic(){let e=Vo();return`
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
          <strong>${A(e.nombre||`Pendiente de confirmar`)}</strong>
          <small>${A(Za[e.rol]||e.rol||``)}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${g(`logOut`,`sv-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function ac(){Ko();let e=ds();yo=e.now.time;let t=xs(e),n=`
    <main class="sv-main" id="sv-main">
      ${oc()}
      ${sc(e)}
      ${lc(e,t)}
      ${dc(e)}
      ${fc(e,t.routes)}
      ${gc(e,t)}
      ${Sc(e)}
      ${Cc(e,Cs(t.routes))}
      ${Tc(e)}
      ${Ec()}
    </main>
  `;return bo===`idle`&&ss()&&setTimeout(us,0),n}function oc(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=[...new Set(po.values())],r=t||e||n.length?`warn`:`ok`,i=`${e} cambio${e===1?` espera`:`s esperan`} señal para enviarse.`,a=t?`Sin señal: ves lo último guardado en este teléfono.${e?` ${i}`:``}`:e?i:n.length?`No se pudieron traer algunos datos: ${n.join(` `)}`:`Datos compartidos con el equipo. Se actualizan solos.`;return`
    <section class="sv-sync is-${r}" aria-label="Estado de los datos">
      <p class="sv-sync-text" aria-live="polite">${g(r===`ok`?`radio`:`uploadCloud`,`sv-icon`)} <span>${A(a)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${To(`sync`)}
    </section>
  `}function sc(e){let t=Ns(e.fecha);return t.length?`
    <section class="sv-card sv-incidents" aria-labelledby="sv-incidents-title">
      <div class="sv-section-head">
        <h2 id="sv-incidents-title" class="sv-title">${g(`alertTriangle`,`sv-icon`)} ${t.length===1?`Hay 1 incidente cargado hoy`:`Hay ${t.length} incidentes cargados hoy`}</h2>
        <p>${t.length===1?`Revisalo`:`Revisalos`} antes de seguir con el turno.</p>
      </div>
      <ul class="sv-incident-list">
        ${t.map(e=>`
          <li class="sv-incident">
            <div class="sv-saved-head">
              <strong>${A(e.titulo||`Incidente`)}</strong>
              <span>${e.hora?`${A(e.hora)} hs · `:``}${A(Ps(e))}${e.lugar?` · ${A(e.lugar)}`:``}${e.barrio?` · ${A(e.barrio)}`:``}</span>
            </div>
            ${e.riesgo||e.lesiones?`
              <p class="sv-chips">
                ${e.riesgo?`<span class="sv-tag is-danger">Riesgo: ${A(e.riesgo)}</span>`:``}
                ${e.lesiones?`<span class="sv-tag is-warn">Lesiones: ${A(e.lesiones)}</span>`:``}
              </p>
            `:``}
            <dl class="sv-obs-detail">
              ${[[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Protocolo`,e.protocolo]].filter(([,e])=>e).map(([e,t])=>`<div><dt>${e}</dt><dd>${A(t)}</dd></div>`).join(``)}
            </dl>
            <p class="sv-source">${A(Wo(e,`Cargó`))}</p>
          </li>
        `).join(``)}
      </ul>
    </section>
  `:``}function cc(e,t){let n=nc(e,t),r=e.now.minutes>=Oo(x[e.shift].from);return n.length?`
    <div class="sv-team">
      <h2 class="sv-subtitle">Equipo del turno: checklist de salida</h2>
      <ul class="sv-team-list">
        ${n.map(e=>{let t=e.checklist?js(e.checklist):null,n=t?e.checklist.pendiente?`info`:t.complete?`ok`:`danger`:r?`warn`:`info`,i=t?t.complete?`Salió con el equipo completo.`:`Equipo incompleto${t.missing.length?`. Falta: ${t.missing.join(`, `)}`:``}.`:`Todavía no cargó el checklist.`;return`
            <li class="sv-note is-${n}">
              ${g(t?.complete?`checkCircle`:`alertTriangle`,`sv-icon`)}
              <strong>${A(e.name)}</strong> <small>(${A(e.roles.join(`, `))})</small>:
              ${A(i)} ${t?.at?`<small>${A(t.at)} hs</small>`:``}
            </li>
          `}).join(``)}
      </ul>
    </div>
  `:`<p class="sv-note is-info"><strong>Equipo del turno:</strong> ${b}. La ruta no tiene paseador asignado y nadie cargó el checklist.</p>`}function lc(e,t){let n=x[e.shift],r=Bo(e.shift,e.now),i=Vo(),a=t.routes.flatMap(t=>Ds(e,t)),o=Os(a),s=t.routes.map(e=>e.supervisor).filter(Boolean),c=[...new Set(s)].join(` y `)||n.supervisor;return`
    <section class="sv-hero sv-now" aria-labelledby="sv-now-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">Ahora · ${A(e.day)} ${e.now.label} · ${e.now.time} hs</p>
          <h1 id="sv-now-title">Turno ${n.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${n.from} a ${n.to} hs
            <span class="sv-moment is-${r.tone}">${r.label}</span>
          </p>
          <p class="sv-source">Supervisa ${A(i.nombre||`Pendiente de confirmar`)}${c&&c!==i.nombre?` · Según la ruta: ${A(c)}`:``}.</p>
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno de hoy">
            ${Wa.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${x[t].label}
                <small>${t===Ro(e.now)?`Turno actual`:`${x[t].from} a ${x[t].to}`}</small>
              </button>
            `).join(``)}
          </div>
        </div>
      </div>

      ${e.isCurrent?``:`<p class="sv-note is-info">Estás mirando el turno ${n.label.toLowerCase()} de hoy. El turno actual es el de la ${x[Ro(e.now)].label.toLowerCase()}.</p>`}

      <div class="sv-counter" role="status" aria-live="polite" aria-label="Cumplimiento del turno">
        <p class="sv-counter-line">
          <span class="sv-count is-ok"><b>${o.atiempo}</b> a tiempo</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count ${o.atrasado?`is-danger`:``}"><b>${o.atrasado}</b> ${o.atrasado===1?`atrasado`:`atrasados`}</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count"><b>${o.entregado}</b> ${o.entregado===1?`entregado`:`entregados`}</span>
        </p>
        <p class="sv-source">${Do(a.length,`perro previsto`,`perros previstos`)}${o.nosale?` · ${o.nosale} no ${o.nosale===1?`sale`:`salen`}`:``} · Atrasado: pasó la hora de retiro + ${qa} min. Entrega demorada: el paseo superó lo previsto + ${Ja} min. Se recalcula cada minuto.</p>
      </div>

      ${t.fallback?`
        <p class="sv-note is-warn">${g(`alertCircle`,`sv-icon`)} <strong>Rutas tomadas de la planilla.</strong> ${t.loading?`Cargando las rutas del coordinador…`:`El coordinador todavía no cargó en la app la ruta de ${A(e.day.toLowerCase())} a la ${n.label.toLowerCase()}.`} Paseador y ayudante: ${b}.</p>
      `:``}

      ${cc(e,t.routes)}
    </section>
  `}function uc(e){return{barrio:``,tipo:Qa[0],mensaje:``,vigenteHasta:e.fecha,...xo(k.avisoDraft,{})}}function dc(e){let t=Fs(e.fecha),n=uc(e),r=ps(`aviso-form`);return`
    <section class="sv-card sv-avisos" aria-labelledby="sv-avisos-title">
      <div class="sv-section-head">
        <h2 id="sv-avisos-title" class="sv-title">${g(`mapPin`,`sv-icon`)} Avisos por barrio vigentes</h2>
        <p>${t.length?`Lo que el equipo tiene que saber hoy en cada barrio.`:fo.has(`avisos`)?`No hay avisos vigentes.`:`Cargando avisos…`}</p>
      </div>
      ${t.length?`
        <ul class="sv-aviso-list">
          ${t.map(e=>`
            <li class="sv-aviso ${e.tipo===`seguridad`||e.tipo===`perro suelto`?`is-danger`:``}">
              <div class="sv-saved-head">
                <strong>${A(e.barrio||`Pendiente de confirmar`)}</strong>
                <span class="sv-tag ${e.tipo===`seguridad`||e.tipo===`perro suelto`?`is-danger`:`is-warn`}">${A(e.tipo||`otro`)}</span>
              </div>
              <p>${A(e.mensaje||``)}</p>
              <p class="sv-source">${e.vigenteHasta?`Vigente hasta ${A(No(e.vigenteHasta))}`:`Vigente hoy`} · ${A(Wo(e,`Cargó`))}</p>
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
              <input type="text" id="sv-aviso-barrio" data-sv-aviso="barrio" list="sv-barrios" value="${A(n.barrio)}" autocomplete="off" required />
              <datalist id="sv-barrios">${fn.map(e=>`<option value="${A(e)}"></option>`).join(``)}</datalist>
            </label>
            <label class="sv-field" for="sv-aviso-tipo">Tipo
              <select id="sv-aviso-tipo" data-sv-aviso="tipo">
                ${Qa.map(e=>`<option value="${e}" ${e===n.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
              </select>
            </label>
          </div>
          <label class="sv-field" for="sv-aviso-mensaje">Qué pasa
            <span class="sv-field-hint" id="sv-aviso-mensaje-hint">Ej.: corte de calle en la entrada sur hasta las 12. Entrar por la otra puerta.</span>
            <textarea id="sv-aviso-mensaje" rows="2" data-sv-aviso="mensaje" aria-describedby="sv-aviso-mensaje-hint" required>${A(n.mensaje)}</textarea>
          </label>
          <label class="sv-field sv-field-short" for="sv-aviso-hasta">Vigente hasta
            <input type="date" id="sv-aviso-hasta" data-sv-aviso="vigenteHasta" value="${A(n.vigenteHasta)}" min="${e.fecha}" required />
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-aviso-save">${g(`send`,`sv-icon`)} Publicar aviso</button>
          </div>
        </form>
      </details>
      ${To(`aviso`)}
    </section>
  `}function fc(e,t){if(!t.some(e=>e.stops.length))return``;let n=Hs(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${g(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Bozales e incompatibles primero. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>pc(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos-detector" ${ps(`avisos-detector`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>pc(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function pc(e,t){return`
    <li class="sv-warning is-${e.tone}">
      <div class="sv-warning-head">
        ${t?`<span class="sv-rank" aria-label="Prioridad ${t}">${t}</span>`:`<span class="sv-warning-icon">${g(e.icon,`sv-icon`)}</span>`}
        <h3>${A(e.title)}</h3>
      </div>
      <ul class="sv-warning-lines">
        ${e.lines.map(e=>`<li>${A(e)}</li>`).join(``)}
      </ul>
      <p class="sv-warning-action"><strong>Qué hacer:</strong> ${A(e.action)}</p>
      <p class="sv-source">${A(e.source)}</p>
    </li>
  `}function mc(e){let t=e.dog,n=(t?.safety||[]).map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?A(e):`<b>${A(e)}</b>`}</li>`});if(e.nota&&!(t?.safety||[]).some(t=>Ao(t).includes(Ao(e.nota)))){let t=/no juntar/i.test(e.nota)?`danger`:/bozal/i.test(e.nota)?`warn`:`info`;n.push(`<li class="sv-chip is-${t}"><b>Ruta:</b> ${A(e.nota)}</li>`)}return t&&t.status!==`Activo`&&n.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${A(t.status)}</li>`),t||n.unshift(`<li class="sv-chip is-danger"><b>Sin ficha:</b> ${b}</li>`),n.length?`<ul class="sv-chips" aria-label="Avisos de ${A(e.perroNombre)}">${n.join(``)}</ul>`:``}function hc(e,t,n){let r=Vo(),i=x[e.shift],a=Qs(t.paseador),o=n.filter(e=>e.status.live===`atrasado`),s=Os(n),c=[`Hola${a?` ${a}`:``}, te escribe ${r.nombre||`el supervisor`} (supervisión ${Gt.name}).`,`Ruta ${t.code}, turno ${i.label.toLowerCase()} ${e.fechaLabel}: ${s.entregado} entregados de ${n.length-s.nosale}.`];return o.length?(c.push(`Veo atrasados: ${o.map(e=>`${e.stop.perroNombre} (${e.status.kind===`demorada`?`entrega demorada`:`retiro ${e.stop.hora}`}, ${e.status.label.replace(/^\D+/,``)})`).join(`; `)}.`),c.push(`¿Cómo vienen? Avisame si necesitás ayuda.`)):c.push(`¿Cómo vienen? Avisame cualquier cosa.`),c.join(`
`)}function gc(e,t){let{routes:n}=t;if(!n.length)return`
      <section class="sv-card" aria-labelledby="sv-routes-title">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno</h2>
        <p class="sv-empty">${t.loading?`Cargando rutas…`:`No hay rutas cargadas para ${A(e.day.toLowerCase())} a la ${x[e.shift].label.toLowerCase()} (ni en la app ni en la planilla).`}</p>
        ${yc(e,``,``,`Pedir una ruta al coordinador`)}
        ${xc(e,``,``)}
      </section>
    `;let r=Ts(),i=new Set(n.flatMap(e=>e.stops.map(e=>e.perroId)).filter(Boolean)),a=qo(`paseos`).filter(t=>t.fecha===e.fecha&&String(t.id).endsWith(`_${e.shift}`)&&t.perroId&&!i.has(t.perroId));return`
    <section class="sv-routes" aria-labelledby="sv-routes-title">
      <div class="sv-section-head sv-routes-head">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno: retiro y entrega</h2>
        <p>Las arma el coordinador. Vos controlás que se cumplan. Si hay que cambiar algo, pedíselo con «Pedir cambio al coordinador».</p>
      </div>
      ${n.map(t=>_c(e,t,r)).join(``)}
      ${a.length?`
        <div class="sv-card">
          <h3 class="sv-subtitle">Marcados fuera de la ruta</h3>
          <ul class="sv-extra-list">
            ${a.map(e=>`<li class="sv-note is-info"><strong>${A(e.perroNombre||e.perroId)}</strong>: ${A(e.estado||`pendiente`)}. ${A(Wo(e))}</li>`).join(``)}
          </ul>
        </div>
      `:``}
    </section>
  `}function _c(e,t,n){let r=Ds(e,t,n),i=Os(r),a=Qs(t.paseador),o=Qs(t.ayudante),s=Ls(e.fecha,e.shift).filter(e=>e.ruta===t.code&&!e.perroId),c=`control-${t.code}`;return`
    <article class="sv-card sv-route-card" aria-labelledby="sv-route-${ko(t.code)}">
      <div class="sv-route-head">
        <div>
          <h3 id="sv-route-${ko(t.code)}" class="sv-route-title"><span class="sv-route-code">${A(t.code)}</span> ${Do(t.stops.length,`perro`,`perros`)}</h3>
          <p class="sv-route-people">
            <span>${g(`userCheck`,`sv-icon`)} Paseador: <strong>${A(a||`Pendiente de confirmar`)}</strong></span>
            <span>${g(`users`,`sv-icon`)} Ayudante: <strong>${A(o||(t.source===`planilla`?`Pendiente de confirmar`:`sin ayudante`))}</strong></span>
          </p>
          <p class="sv-source">${A(Ss(t))}${t.record.actualizadoEn&&t.source!==`planilla`?` · ${A(Wo(t.record,`Último cambio de`))}`:``}</p>
          ${t.notas?`<p class="sv-hint">Notas de la ruta: ${A(t.notas)}</p>`:``}
        </div>
        <p class="sv-route-counts">
          <span class="sv-tag is-ok">${i.atiempo} a tiempo</span>
          <span class="sv-tag ${i.atrasado?`is-danger`:`is-neutral`}">${Do(i.atrasado,`atrasado`,`atrasados`)}</span>
          <span class="sv-tag is-neutral">${Do(i.entregado,`entregado`,`entregados`)}</span>
        </p>
      </div>
      <div class="sv-actions">
        <a class="sv-button" id="sv-wa-${ko(t.code)}" href="https://wa.me/?text=${encodeURIComponent(hc(e,t,r))}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`sv-icon`)} ${a?`Escribirle a ${A(a)} por WhatsApp`:`Escribir al paseador por WhatsApp`}
        </a>
        ${yc(e,t.code,``,`Pedir cambio al coordinador`)}
      </div>
      ${bc(s)}
      ${xc(e,t.code,``)}
      ${To(c)}
      <ol class="sv-stop-list">
        ${r.map(n=>vc(e,t,n)).join(``)}
      </ol>
    </article>
  `}function vc(e,t,n){let{stop:r,id:i,status:a}=n,o=i&&co.has(i),s=a.record,c=ko(`${t.code}-${r.perroId||r.perroNombre}`),l=[s?.horaRetiro&&a.retirado?`Retiro ${s.horaRetiro}`:``,s?.horaPaseo&&a.retirado?`Paseo ${s.horaPaseo}`:``,s?.horaEntrega&&a.kind===`entregado`?`Entrega ${s.horaEntrega}`:``].filter(Boolean),u=Ls(e.fecha,e.shift).filter(e=>e.perroId&&e.perroId===r.perroId),d=oo.has(i)?oo.get(i):s?.nota||``,f=so.has(i)||oo.has(i)&&oo.get(i)!==(s?.nota||``),p=a.kind===`entregado`&&a.late?`<span class="sv-tag is-warn">Con atraso</span>`:a.kind===`curso`&&a.pickupLate?`<span class="sv-tag is-warn">Retiro +${a.pickupDelay} min</span>`:``;return`
    <li class="sv-stop is-${a.kind}">
      <div class="sv-stop-time">
        <strong>${A(r.hora||`--:--`)}</strong>
        <small>${r.minutos?`${r.minutos} min`:`min sin confirmar`}</small>
      </div>
      <div class="sv-stop-body">
        <div class="sv-stop-head">
          <h4>${A(r.perroNombre)}</h4>
          <span class="sv-state is-${a.tone}">${A(a.label)}</span>
          ${p}
        </div>
        ${mc(r)}
        ${l.length||s?`
          <p class="sv-source">${A(l.join(` · `))}${l.length?` · `:``}${A(Wo(s))}</p>
        `:``}
        ${s?.nota?`<p class="sv-stop-note"><b>Nota para el paseador:</b> ${A(s.nota)}</p>`:``}
        ${bc(u)}
        ${r.perroId?`
          <div class="sv-stop-actions" ${o?`aria-busy="true"`:``}>
            ${a.kind===`nosale`?`
              <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${c}" data-sv-absent="${r.perroId}" data-ruta="${A(t.code)}" aria-label="Deshacer: ${A(r.perroNombre)} sí sale">Deshacer «no sale»</button>
            `:`
              <button type="button" class="sv-button ${a.retirado?`is-checked`:`sv-button-primary`}" id="sv-pickup-${c}" data-sv-pickup="${r.perroId}" data-ruta="${A(t.code)}" aria-pressed="${a.retirado}" aria-label="${a.retirado?`Desmarcar retiro de ${A(r.perroNombre)}`:`Marcar a ${A(r.perroNombre)} como retirado`}">
                ${a.retirado?`${g(`checkCircle`,`sv-icon`)} Retirado`:`Retirado`}
              </button>
              <button type="button" class="sv-button ${a.kind===`entregado`?`is-checked`:``}" id="sv-deliver-${c}" data-sv-deliver="${r.perroId}" data-ruta="${A(t.code)}" aria-pressed="${a.kind===`entregado`}" ${a.retirado?``:`disabled`} aria-label="${a.kind===`entregado`?`Desmarcar entrega de ${A(r.perroNombre)}`:`Marcar a ${A(r.perroNombre)} como entregado`}">
                ${a.kind===`entregado`?`${g(`checkCircle`,`sv-icon`)} Entregado`:`Entregado`}
              </button>
              ${a.retirado?``:`<button type="button" class="sv-button sv-button-quiet" id="sv-absent-${c}" data-sv-absent="${r.perroId}" data-ruta="${A(t.code)}" aria-label="${A(r.perroNombre)} no sale">No sale</button>`}
            `}
          </div>
          <details class="sv-stop-more" data-sv-stop-more="${i}" ${f?`open`:``}>
            <summary>Nota para el paseador y pedido de cambio</summary>
            <div class="sv-stop-more-body">
              <label class="sv-field" for="sv-note-${c}">Nota para el paseador
                <span class="sv-field-hint" id="sv-note-${c}-hint">La ve en su ruta. Sin datos de tutores.</span>
                <input type="text" id="sv-note-${c}" data-sv-note="${i}" value="${A(d)}" maxlength="200" aria-describedby="sv-note-${c}-hint" autocomplete="off" />
              </label>
              <div class="sv-actions">
                <button type="button" class="sv-button" id="sv-note-save-${c}" data-sv-note-save="${r.perroId}" data-ruta="${A(t.code)}">Guardar nota</button>
                ${yc(e,t.code,r.perroId,`Pedir cambio al coordinador`)}
              </div>
            </div>
          </details>
          ${xc(e,t.code,r.perroId)}
        `:`<p class="sv-hint">Sin ficha en el registro de perros: no se puede marcar desde acá.</p>`}
      </div>
    </li>
  `}function yc(e,t,n,r){return`<button type="button" class="sv-button sv-button-quiet" id="${ko(`sv-req-open-${t||`turno`}-${n||`ruta`}`)}" data-sv-request-open data-ruta="${A(t)}" data-dog="${A(n)}">${g(`send`,`sv-icon`)} ${A(r)}</button>`}function bc(e){return e.length?`
    <ul class="sv-request-badges">
      ${e.map(e=>{let t=eo[e.estado]||eo.pendiente;return`<li class="sv-tag is-${t.tone}">Pedido «${A(e.tipo||`cambio`)}»: ${t.label}${e.pendiente?` (sin enviar)`:``}</li>`}).join(``)}
    </ul>
  `:``}function xc(e,t,n){let r=Bs(e);return!r.open||r.ruta!==t||(r.perroId||``)!==(n||``)?``:`
    <form class="sv-form sv-request-form" data-sv-request-form novalidate aria-labelledby="sv-req-title">
      <h4 id="sv-req-title">Pedir cambio al coordinador · ${A(`${t?`Ruta ${t}`:`Turno ${x[e.shift].label.toLowerCase()}`}${r.perroNombre?` · ${r.perroNombre}`:``}`)}</h4>
      <p class="sv-hint">El coordinador lo aplica en la ruta y te responde. Hoy, ${A(e.fechaLabel)}.</p>
      <label class="sv-field" for="sv-req-tipo">Qué hay que cambiar
        <select id="sv-req-tipo" data-sv-req="tipo">
          ${$a.map(e=>`<option value="${e}" ${e===r.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
        </select>
      </label>
      <label class="sv-field" for="sv-req-detalle">Detalle${r.tipo===`no sale`?` (opcional)`:``}
        <span class="sv-field-hint" id="sv-req-detalle-hint">Ej.: retirarlo 10:30 en vez de 10:00. O: sumar a Paco a la ruta.</span>
        <textarea id="sv-req-detalle" rows="2" data-sv-req="detalle" aria-describedby="sv-req-detalle-hint">${A(r.detalle)}</textarea>
      </label>
      <label class="sv-field" for="sv-req-motivo">Qué pasó o con quién hablaste
        <span class="sv-field-hint" id="sv-req-motivo-hint">Ej.: hablé con la familia, hoy no está. Sin teléfonos ni domicilios.</span>
        <textarea id="sv-req-motivo" rows="2" data-sv-req="motivo" aria-describedby="sv-req-motivo-hint" required>${A(r.motivo)}</textarea>
      </label>
      <label class="sv-check" for="sv-req-urgente">
        <input type="checkbox" id="sv-req-urgente" data-sv-req="urgente" ${r.urgente?`checked`:``} />
        <span>Urgente: afecta al turno de ahora</span>
      </label>
      <div class="sv-actions">
        <button type="submit" class="sv-button sv-button-primary" id="sv-req-save">${g(`send`,`sv-icon`)} Enviar pedido</button>
        <button type="button" class="sv-button" id="sv-req-cancel" data-sv-request-cancel>Cancelar</button>
      </div>
      ${To(`request-form`)}
    </form>
  `}function Sc(e){let t=Rs(e.fecha),n=t.filter(e=>(e.estado||`pendiente`)===`pendiente`).length;return`
    <details class="sv-fold" data-sv-fold="pedidos" ${ps(`pedidos`,!0)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`send`,`sv-icon`)} Mis pedidos de cambio</span>
        <span class="sv-fold-meta">${t.length?`${n} pendiente${n===1?``:`s`} de ${t.length}`:fo.has(`solicitudes`)?`Sin pedidos`:`Cargando…`}</span>
      </summary>
      <div class="sv-fold-body">
        ${To(`requests`)}
        ${t.length?`
          <ul class="sv-request-list">
            ${t.map(e=>{let t=eo[e.estado]||eo.pendiente,n=e.actualizadoPor&&e.actualizadoPor!==e.creadoPor?Wo(e,`Respondió`):``;return`
                <li class="sv-request is-${t.tone}">
                  <div class="sv-saved-head">
                    <strong>${e.urgente?`<span class="sv-tag is-danger">Urgente</span> `:``}${A(Is(e))}</strong>
                    <span class="sv-state is-${t.tone}">${t.label}</span>
                  </div>
                  <p class="sv-source">${A(No(e.fecha))} · Turno ${A(String(e.turno||``).toLowerCase()||`Pendiente de confirmar`)} · ${e.pendiente?`Se enviará cuando haya señal.`:`Pedido a las ${A(Fo(e.creadoEn))} hs`}</p>
                  <dl class="sv-obs-detail">
                    ${e.detalle?`<div><dt>Detalle</dt><dd>${A(e.detalle)}</dd></div>`:``}
                    <div><dt>Motivo</dt><dd>${A(e.motivo||`Pendiente de confirmar`)}</dd></div>
                    <div><dt>Respuesta del coordinador</dt><dd>${A(e.respuesta||((e.estado||`pendiente`)===`pendiente`?`Todavía no respondió.`:`Sin comentario.`))}</dd></div>
                  </dl>
                  ${n?`<p class="sv-source">${A(n)}</p>`:``}
                </li>
              `}).join(``)}
          </ul>
        `:`<p class="sv-empty">Todavía no pediste cambios. Usá «Pedir cambio al coordinador» en una ruta o en un perro.</p>`}
      </div>
    </details>
  `}function Cc(e,t){let n=ps(`observaciones`),r=Gs(e),i=Ks(),a=new Set(t.map(e=>e.id)),o=S.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} en ${Xa} días`:`Sin registros`}</span>
      </summary>
      <div class="sv-fold-body">
        <p class="sv-note is-info">Describí lo que se vio y se oyó, no lo que creés que siente el perro. No uses etiquetas como «agresivo», «malo» o «dominante». Sin datos de tutores.</p>
        <form class="sv-obs-form" data-sv-obs-form novalidate>
          <div class="sv-form-grid sv-form-grid-3">
            <label class="sv-field" for="sv-obs-dog">Perro
              <select id="sv-obs-dog" data-sv-obs="dogId" required>
                <option value="">Elegí un perro</option>
                ${t.length?`<optgroup label="De este turno">${t.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${A(e.name)}</option>`).join(``)}</optgroup>`:``}
                <optgroup label="Otros perros">${o.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${A(e.name)}</option>`).join(``)}</optgroup>
              </select>
            </label>
            <label class="sv-field" for="sv-obs-fecha">Fecha (DD/MM/AAAA)
              <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${A(r.fecha)}" inputmode="numeric" placeholder="${e.now.label}" maxlength="10" autocomplete="off" required />
            </label>
            <label class="sv-field" for="sv-obs-hora">Hora (opcional)
              <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${A(r.hora)}" />
            </label>
          </div>
          ${Us.map(e=>`
            <label class="sv-field" for="sv-obs-${e.key}">${e.label}
              <span class="sv-field-hint" id="sv-obs-${e.key}-hint">${e.hint}</span>
              ${e.type===`input`?`<input type="text" id="sv-obs-${e.key}" data-sv-obs="${e.key}" value="${A(r[e.key])}" aria-describedby="sv-obs-${e.key}-hint" required />`:`<textarea id="sv-obs-${e.key}" rows="2" data-sv-obs="${e.key}" aria-describedby="sv-obs-${e.key}-hint" required>${A(r[e.key])}</textarea>`}
            </label>
          `).join(``)}
          <label class="sv-check" for="sv-obs-seguimiento">
            <input type="checkbox" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${r.seguimiento?`checked`:``} />
            <span>Requiere seguimiento (avisar a Juan)</span>
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-obs-save">${g(`checkCircle`,`sv-icon`)} Guardar observación</button>
          </div>
          ${To(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${Xa} días</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>wc(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function wc(e){let t=io===e.id,n=e.perroNombre||ms(e.perroId)?.name||`Pendiente de confirmar`;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${A(n)}</strong>
        <span>${A(No(e.fecha))}${e.hora?` · ${A(e.hora)} hs`:``}${e.lugar?` · ${A(e.lugar)}`:``}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${A(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Reacción</dt><dd>${A(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${A(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Resultado</dt><dd>${A(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${A(qs(e))}</p>
      <div class="sv-actions">
        ${t?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${g(`copy`,`sv-icon`)} Copiar texto</button>
          ${Ho(e)?`<button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function Tc(e){let t=ps(`cierre`),n=Xs(e),r=tc(e),i=n?.cerrado?n.horaCierre||Fo(n.actualizadoEn):``;return`
    <details class="sv-fold" data-sv-fold="cierre" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`flag`,`sv-icon`)} Cerrar el turno ${x[e.shift].label.toLowerCase()}</span>
        <span class="sv-fold-meta">${n?.cerrado?`Cerrado ${A(i)} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        ${n?`<p class="sv-source">${A(n.cerrado?Wo(n,`Lo cerró`):Wo(n,`Última nota de`))}</p>`:``}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${A(Zs(e))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar (incluye el cumplimiento del horario)
          <textarea id="sv-close-summary" class="sv-summary" rows="16" readonly>${A(r)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${g(`copy`,`sv-icon`)} Copiar resumen</button>
          ${n?.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${g(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${To(`closure`)}
      </div>
    </details>
  `}function Ec(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${ps(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(Qt).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas y horarios: los arma el coordinador (plantilla semanal y cambios del día). Respaldo: ${Gt.officialSources.routes}, leída el ${Wt}.</li>
          <li>Perros: ${Gt.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador. Incidentes y checklist los carga el equipo en la calle.</li>
          <li>Avisos por barrio, pedidos de cambio, observaciones y cierres se comparten con el equipo según permisos.</li>
        </ul>
      </div>
    </details>
  `}function N(e){if(!e)return ts();es(),$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function Dc(){return jo().time}async function Oc(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function kc(e,t,n){let r=xs(e).routes.find(e=>e.code===t),i=r?.stops.find(e=>e.perroId===n);return r&&i?{route:r,stop:i}:null}function Ac(e,t,n,r){let i=ws(e.fecha,n.perroId,e.shift),a=Ts().get(i),o={id:i,fecha:e.fecha,...r};return a||Object.assign(o,{perroId:n.perroId,perroNombre:n.perroNombre,turno:x[e.shift].label}),a?.ruta!==t.code&&(o.ruta=t.code),o}async function jc(e,t,n,r){let i=ds(),a=kc(i,e,t);if(!a)return;let{route:o,stop:s}=a,c=ws(i.fecha,t,i.shift);if(co.has(c))return;let l=Ts().get(c),u=Es(s,l,i.now.minutes),d=Dc(),f={horaRetiro:``,horaPaseo:``,horaEntrega:``},p=s.perroNombre,m=null,h=``,ee=`ok`;if(n===`retiro`){if(u.retirado)m={estado:`pendiente`,...f},h=`${p}: retiro desmarcado.`,ee=`info`;else{m={estado:`retirado`,horaRetiro:d};let e=u.planned===null?0:i.now.minutes-u.planned;h=`${p}: retirado a las ${d} hs${e>qa?` (${e} min después de lo previsto)`:``}.`}}else if(n===`entrega`){if(!u.retirado)return;u.kind===`entregado`?(m={estado:l?.horaPaseo?`paseando`:`retirado`,horaEntrega:``},h=`${p}: entrega desmarcada.`,ee=`info`):(m={estado:`entregado`,horaEntrega:d},h=`${p}: entregado a las ${d} hs.`)}else if(n===`no-sale`){if(u.kind===`nosale`)m={estado:`pendiente`},h=`${p}: vuelve a la lista.`;else{if(u.retirado)return;m={estado:`no-sale`,...f},h=`${p}: no sale hoy. Si cambia la ruta, pedíselo al coordinador.`}}m&&(co.add(c),await Jo(`paseos`,Ac(i,o,s,m),`control-${o.code}`,h,ee),co.delete(c),N(r))}async function Mc(e,t,n){let r=ds(),i=kc(r,e,t);if(!i)return;let{route:a,stop:o}=i,s=ws(r.fecha,t,r.shift),c=String(oo.has(s)?oo.get(s):document.querySelector(`[data-sv-note="${s}"]`)?.value||``).trim();if(Ka.test(c))return M(`control-${a.code}`,`La nota parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),N(n);await Jo(`paseos`,Ac(r,a,o,{nota:c}),`control-${a.code}`,c?`Nota para el paseador guardada en ${o.perroNombre}.`:`Nota de ${o.perroNombre} borrada.`)&&oo.delete(s),N(n)}async function Nc(e){let t=ds(),n=uc(t);e.querySelectorAll(`[data-sv-aviso]`).forEach(e=>{n[e.dataset.svAviso]=e.value}),j(k.avisoDraft,n);let r=n.barrio.trim(),i=n.mensaje.trim();if(!r||!i)return M(`aviso`,`Falta completar: ${Eo([!r&&`barrio`,!i&&`qué pasa`].filter(Boolean))}.`,`error`),N(r?`sv-aviso-mensaje`:`sv-aviso-barrio`);if(!/^\d{4}-\d{2}-\d{2}$/.test(n.vigenteHasta)||n.vigenteHasta<t.fecha)return M(`aviso`,`Elegí hasta cuándo vale el aviso (hoy, ${t.fechaLabel}, o después).`,`error`),N(`sv-aviso-hasta`);if(Ka.test(i)||Ka.test(r))return M(`aviso`,`El aviso parece tener un teléfono. Sacalo: los avisos no llevan datos de contacto.`,`error`),N(`sv-aviso-mensaje`);let a=Qa.includes(n.tipo)?n.tipo:`otro`;return await Jo(`avisos`,{fecha:t.fecha,barrio:r,tipo:a,mensaje:i,vigenteHasta:n.vigenteHasta,titulo:`${a[0].toUpperCase()}${a.slice(1)} · ${r}`},`aviso`,`Aviso de ${r} publicado. Lo ve el equipo.`)&&j(k.avisoDraft,{barrio:``,tipo:Qa[0],mensaje:``,vigenteHasta:t.fecha}),N(`sv-aviso-save`)}async function Pc(e){let t=ds(),n=Bs(t);e.querySelectorAll(`[data-sv-req]`).forEach(e=>{n[e.dataset.svReq]=e.type===`checkbox`?e.checked:e.value}),j(k.requestDraft,n);let r=String(n.detalle||``).trim(),i=String(n.motivo||``).trim(),a=[];if(!r&&n.tipo!==`no sale`&&a.push(`detalle`),i||a.push(`qué pasó o con quién hablaste`),a.length)return M(`request-form`,`Falta completar: ${Eo(a)}.`,`error`),N(!r&&n.tipo!==`no sale`?`sv-req-detalle`:`sv-req-motivo`);if(Ka.test(r)||Ka.test(i))return M(`request-form`,`El pedido parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),N(`sv-req-motivo`);let o=$a.includes(n.tipo)?n.tipo:`otro`,s=x[t.shift].label,c={fecha:t.fecha,turno:s,ruta:n.ruta||``,tipo:o,perroId:n.perroId||``,perroNombre:n.perroNombre||``,detalle:r||(o===`no sale`?`${n.perroNombre||`El perro`} no sale hoy.`:``),motivo:i,urgente:!!n.urgente,estado:`pendiente`,respuesta:``,titulo:`${n.urgente?`URGENTE · `:``}${o[0].toUpperCase()}${o.slice(1)}${n.perroNombre?` · ${n.perroNombre}`:``}${n.ruta?` · ${n.ruta}`:``} · ${s} ${t.fechaLabel}`},l=await Jo(`solicitudes`,c,n.ruta?`control-${n.ruta}`:`requests`,`Pedido enviado al coordinador: ${Is(c)}. Lo vas a ver en «Mis pedidos de cambio».`);return l?(l.pendiente||ho.set(l.id,`pendiente`),j(k.requestDraft,zs(t)),N(ko(`sv-req-open-${n.ruta||`turno`}-${n.perroId||`ruta`}`))):(ro&&(ro.area=`request-form`),N(`sv-req-save`))}async function Fc(e){let t=ds(),n=Gs(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),j(k.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),Us.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())});let i=Po(n.fecha);if(!r.length&&!i)return M(`observation`,`Escribí una fecha real como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),N(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return M(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),N(`sv-obs-fecha`);if(r.length)return M(`observation`,`Falta completar: ${Eo(r)}.`,`error`),N(n.dogId?n.fecha?`sv-obs-${Us.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=Us.find(e=>Ga.test(n[e.key]));if(a){let e=n[a.key].match(Ga)[2];return M(`observation`,`En «${a.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),N(`sv-obs-${a.key}`)}let o=ms(n.dogId);return await Jo(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:x[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada. La ve el equipo.`)&&j(k.observationDraft,Ws(t)),N(`sv-obs-save`)}async function Ic(e,t,n,r){let i=Ys(e),a=Zs(e),o=Vo(),s=tc(e,{...Xs(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoPorNombre:o.nombre,actualizadoEn:new Date().toISOString(),pendiente:!1});await Jo(`cierres`,{id:i,fecha:e.fecha,turno:x[e.shift].label,notas:a,resumen:s,...t},`closure`,n,t.cerrado===!1?`info`:`ok`)&&ao?.id===i&&ao.notas===a&&(ao=null),N(r)}function Lc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return Xh(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return Zo(!0),!0;let n=t.closest(`[data-sv-shift]`);if(n)return fs(n.dataset.svShift),N(n.id),!0;let r=t.closest(`[data-sv-pickup]`);if(r)return jc(r.dataset.ruta,r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return jc(i.dataset.ruta,i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=ko(`${a.dataset.ruta}-${a.dataset.svAbsent}`),t=ds(),n=Ts().get(ws(t.fecha,a.dataset.svAbsent,t.shift))?.estado===`no-sale`;return jc(a.dataset.ruta,a.dataset.svAbsent,`no-sale`,n?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-note-save]`);if(o)return Mc(o.dataset.ruta,o.dataset.svNoteSave,o.id),!0;let s=t.closest(`[data-sv-request-open]`);if(s){let e=ds(),t=Bs(e),n=s.dataset.ruta||``,r=s.dataset.dog||``,i=t.open&&t.ruta===n&&(t.perroId||``)===r;return j(k.requestDraft,i?t:zs(e,n,r,!0)),N(`sv-req-tipo`),!0}if(t.closest(`[data-sv-request-cancel]`)){let e=ds(),t=Bs(e);return j(k.requestDraft,zs(e)),N(ko(`sv-req-open-${t.ruta||`turno`}-${t.perroId||`ruta`}`)),!0}let c=t.closest(`[data-sv-obs-copy]`);if(c){let e=Ks().find(e=>e.id===c.dataset.svObsCopy);return e&&Oc(Js(e)).then(e=>{M(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),N(c.id)}),!0}let l=t.closest(`[data-sv-obs-delete]`);if(l)return io=l.dataset.svObsDelete,N(`sv-obs-del-no-${io}`),!0;let u=t.closest(`[data-sv-obs-delete-ok]`);if(u)return io=null,Xo(`observaciones`,u.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>N(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=io;return io=null,N(`sv-obs-del-${e}`),!0}return t.closest(`[data-sv-close-copy]`)?(Oc(tc(ds()),`sv-close-summary`).then(e=>{M(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),N(`sv-close-copy`)}),!0):t.closest(`[data-sv-close-done]`)?(Ic(ds(),{cerrado:!0,horaCierre:Dc()},`Turno marcado como cerrado. No te olvides de copiar el resumen.`,`sv-close-copy`),!0):t.closest(`[data-sv-close-reopen]`)?(Ic(ds(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0):!1}function Rc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;let n=ds();if(t.matches(`[data-sv-obs]`)){let e=Gs(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,j(k.observationDraft,e),!0}if(t.matches(`[data-sv-aviso]`)){let e=uc(n);return e[t.dataset.svAviso]=t.value,j(k.avisoDraft,e),!0}if(t.matches(`[data-sv-req]`)){let e=Bs(n);return e[t.dataset.svReq]=t.type===`checkbox`?t.checked:t.value,j(k.requestDraft,e),t.tagName===`SELECT`&&N(t.id),!0}return t.matches(`[data-sv-close-notes]`)?(ao={id:Ys(n),notas:t.value},t.value===(Xs(n)?.notas||``)?(ao=null,!0):(Ic(n,{},`Notas del cierre guardadas.`),!0)):!1}function zc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=ds();if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=Gs(n);e[t.dataset.svObs]=t.value,j(k.observationDraft,e)}else if(t.matches(`[data-sv-aviso]`)){let e=uc(n);e[t.dataset.svAviso]=t.value,j(k.avisoDraft,e)}else if(t.matches(`[data-sv-req]`)&&t.type!==`checkbox`){let e=Bs(n);e[t.dataset.svReq]=t.value,j(k.requestDraft,e)}else if(t.matches(`[data-sv-note]`))oo.set(t.dataset.svNote,t.value),so.add(t.dataset.svNote);else if(t.matches(`[data-sv-close-notes]`)){ao={id:Ys(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=tc(n))}}function Bc(e){let t=e.target;t.closest?.(`.sv-shell`)&&(t.matches?.(`[data-sv-obs-form]`)?(e.preventDefault(),Fc(t)):t.matches?.(`[data-sv-aviso-form]`)?(e.preventDefault(),Nc(t)):t.matches?.(`[data-sv-request-form]`)&&(e.preventDefault(),Pc(t)))}function Vc(e){let t=e.target;if(e.key!==`Enter`||!t.matches?.(`.sv-shell [data-sv-note]`))return;e.preventDefault();let n=t.closest(`.sv-stop-more-body`)?.querySelector(`[data-sv-note-save]`);n&&Mc(n.dataset.ruta,n.dataset.svNoteSave,t.id)}function Hc(e){let t=e.target;if(t.matches?.(`[data-sv-stop-more]`)){t.open?so.add(t.dataset.svStopMore):so.delete(t.dataset.svStopMore);return}if(!t.matches?.(`[data-sv-fold]`))return;let n=xo(k.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,j(k.folds,n))}function Uc(){_e.push(Lc),ve.push(Rc),document.addEventListener(`input`,zc),document.addEventListener(`submit`,Bc),document.addEventListener(`keydown`,Vc),document.addEventListener(`toggle`,Hc,!0),os()}var Wc={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,borradores:`paseosJuan_coord_borradores`},Gc=`paseosJuan_coord_secciones`;function Kc(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function qc(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Jc(e){try{localStorage.removeItem(e)}catch{}}var Yc=null,Xc=null;function P(e,t,n=`ok`){Yc={section:e,text:t,tone:n},n===`error`?el(t):$c(t)}function Zc(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function Qc(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function $c(e){Qc(Zc(`coord-live`,`status`,`polite`),e)}function el(e){Qc(Zc(`coord-alerta`,`alert`,`assertive`),e)}var tl=`America/Argentina/Buenos_Aires`;function F(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function nl(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function rl(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:tl,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function il(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||``));if(!t)return!1;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCFullYear()===n&&a.getUTCMonth()===r-1&&a.getUTCDate()===i}function al(e,t){let[n,r,i]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1,i+t)).toISOString().slice(0,10)}function ol(e){let[t,n,r]=e.split(`-`).map(Number);return Jt[(new Date(Date.UTC(t,n-1,r)).getUTCDay()+6)%7]}function sl(e){return`${ol(e)} ${nl(e)}`}function cl(e){return al(y(),-e)}function ll(e,t=6){let n=[],r=y();for(let i=0;i<70&&n.length<t;i+=1){let t=al(r,i);ol(t)===e&&n.push(t)}return n}function I(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function ul(e){return I(e)}function dl(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}var fl={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function pl(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>fl[e]||e).join(`, `):`Sin días`}function ml(e){let t=Tl.map(t=>{let n=Jt.filter(n=>nn(e,n,t));return n.length?`${t.toLowerCase()}: ${pl(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function hl(e,t=!1){let n=Kc(Gc,{});return e in n?!!n[e]:t}function gl(e,t){qc(Gc,{...Kc(Gc,{}),[e]:t})}var _l=new Set;function vl(){return document.documentElement.dataset.motion===`calm`}function yl(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:vl()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}function L(e){requestAnimationFrame(()=>document.getElementById(e)?.focus({preventScroll:!1}))}function bl(){return _.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}function xl(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``));if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n>23||r>59?null:n*60+r}function Sl(e){return xl(e)!==null}function Cl(e){let t=xl(e);return t===null?``:`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}var wl=Jt.filter(e=>e!==`Domingo`),Tl=[`Mañana`,`Tarde`],El={Mañana:`09:00`,Tarde:`14:45`},Dl=new Map(S.map(e=>[e.id,e])),Ol=new Map(S.map(e=>[I(e.name),e])),kl=S.filter(e=>e.review||e.status!==`Activo`);function Al(e){return e.perroId&&Dl.get(e.perroId)||Ol.get(I(e.perroNombre))||null}function jl(e){return!!e?.safety?.some(e=>/bozal/i.test(e))}function Ml(e){if(!e)return``;let t=I(e),n=Kt.find(e=>e.id===t||I(e.name)===t||I(e.name.split(` `)[0])===t);return n?n.name:e}var Nl={solicitudes:()=>({desde:cl(14)}),plantillas:()=>({}),rutas:()=>({desde:y()}),clientes:()=>({}),avisos:()=>({}),pedidos:()=>({}),fichas:()=>({}),resueltos:()=>({}),observaciones:()=>({desde:cl(6)}),incidentes:()=>({desde:cl(6)}),archivos:()=>({})},Pl=Object.keys(Nl),Fl=[`pedidos`,`fichas`,`resueltos`];function Il(e){return v.cached(e,Nl[e]())}var R=new Set,Ll=new Map,Rl=new Map,zl=!1,Bl=!1;function Vl(){zl||(zl=!0,$e(e=>{Pl.includes(e)&&(R.add(e),Ll.delete(e),z())}),window.addEventListener(`online`,()=>{V?.errorSenal&&(V.error=``,V.errorSenal=!1),z()}),window.addEventListener(`offline`,z))}function Hl(){let e=_.user();e&&Pl.forEach(t=>{let n=Nl[t](),r=`${e.usuario}|${n.desde||``}`,i=Rl.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};Rl.set(t,a),v.list(t,n).then(()=>{R.add(t),Ll.delete(t)}).catch(e=>{e.status!==401&&(Ll.set(t,e.message),el(e.message))}).finally(()=>{Rl.get(t)===a&&(a.stop=v.watch(t,n)),z(),ou()})})}function Ul(){[...Rl.values()].forEach(e=>e.stop?.()),Rl.clear(),Ll.clear(),Hl()}function z(){Bl||(Bl=!0,requestAnimationFrame(()=>{Bl=!1,document.querySelector(`.coord-shell`)&&Wl()}))}function Wl(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;qd.has(t)||(Kd[t]=Zd(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function Gl(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}function Kl(e){let t=_.user();return!t||!e||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function ql(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${rl(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${F(e.creadoPorNombre)}${e.creadoEn?` el ${rl(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre;n.push(`Último cambio${t?` de ${F(t)}`:``}: ${rl(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var Jl=new Set;async function Yl(e,t,{section:n,ok:r}){try{let i=await v.save(e,t);return P(n,i.pendiente?`${r} Sin señal: se enviará cuando vuelva.`:r),i}catch(e){return P(n,`No se pudo guardar: ${e.message}`,`error`),null}finally{z()}}async function Xl(e,t,{section:n,ok:r,undo:i=!0}){try{return await v.remove(e,t.id),Xc=i?{col:e,record:t,section:n}:null,P(n,r),Yc.undo=i,!0}catch(e){return P(n,`No se pudo borrar: ${e.message}`,`error`),!1}finally{z()}}function Zl(e,t){Jl.has(e)||(Jl.add(e),Promise.resolve().then(t).finally(()=>Jl.delete(e)))}var Ql=!1,$l=!1,eu=``,tu=/^[a-z0-9][a-z0-9_.-]{0,90}$/i,nu=[`nuevo`,`en-curso`,`resuelto`];function ru(e){return tu.test(String(e||``))?`ant_${String(e)}`:void 0}function iu(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let n=`${t[3]}-${t[2].padStart(2,`0`)}-${t[1].padStart(2,`0`)}`;return il(n)?n:null}function au(){let e=y(),t=[];Kc(Wc.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:Wc.pedidos,oldId:n.id,col:`pedidos`,data:{id:ru(n.id),fecha:iu(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:nu.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),Kc(Wc.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:Wc.altas,oldId:r,col:`fichas`,data:{id:ru(r),fecha:iu(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})});let n=new Set(Il(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(Kc(Wc.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:Wc.resueltos,oldId:e,skip:!0});return}let i=Dl.get(e);t.push({key:Wc.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function ou(){if(!(Ql||$l)&&Fl.every(e=>R.has(e))){$l=!0;try{let e=Kc(Wc.borradores,{});Object.entries(e).forEach(([e,t])=>{e!==`pago`&&!Kd[e]&&(Kd[e]=t)}),Jc(Wc.borradores);let t=au();if(!t.length){Ql=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await v.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[Wc.pedidos,Wc.altas].forEach(e=>{let t=Kc(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?qc(e,t):Jc(e)});let a=Object.fromEntries(Object.entries(Kc(Wc.resueltos,{})).filter(([e])=>n.has(`${Wc.resueltos}|${e}`)));Object.keys(a).length?qc(Wc.resueltos,a):Jc(Wc.resueltos),r&&(eu=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo.`,$c(eu)),n.size?(Ll.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),el(Ll.get(`migracion`))):Ql=!0}finally{$l=!1,z()}}}var su={Mañana:0,Tarde:1},cu=/^[A-Z0-9][A-Z0-9_]{1,19}$/;function lu(e){return e&&Array.isArray(e.paradas)&&e.ruta&&e.dia}function uu(e,t){return(su[e.turno]??9)-(su[t.turno]??9)||String(e.ruta).localeCompare(String(t.ruta))}function du(e,t){return`${e}_${ul(t)}`}function fu(e,t){return`${e}_${t}`}function pu(){return Il(`plantillas`).filter(lu)}function mu(){return Il(`rutas`).filter(e=>lu(e)&&e.fecha)}function hu(e){return pu().filter(t=>t.dia===e).sort(uu)}function gu(e){let t=ol(e),n=new Map(mu().filter(t=>t.fecha===e).map(e=>[e.ruta,e])),r=hu(t).map(e=>{let t=n.get(e.ruta);return n.delete(e.ruta),t?{...t,origen:`dia`,plantillaId:e.id}:{...e,origen:`plantilla`,plantillaId:e.id}});return n.forEach(e=>r.push({...e,origen:`dia`,plantillaId:``})),r.sort(uu)}function _u(e){return(e.paradas||[]).filter(e=>Sl(e.hora)).map(e=>e.hora).sort((e,t)=>xl(e)-xl(t))}function vu(e){let t=_u(e);return t.length?t.length===1?Cl(t[0]):`${Cl(t[0])} a ${Cl(t[t.length-1])}`:`Sin horarios`}function yu(e){let t=_u(e);return t.length?ln(Cl(t[t.length-1]),15):El[e.turno]||`09:00`}function bu(e){let t=xl(e.hora);return t===null?null:[t,t+(Number(e.minutos)||45)]}function xu(e,t){return e&&t&&e[0]<t[1]&&t[0]<e[1]}function Su(e,t=[]){let n=[],r=new Map,i=(e,t)=>{n.push(t),e.forEach(e=>r.set(e,[...r.get(e)||[],t]))},a=(e.paradas||[]).map((e,t)=>({stop:e,index:t,dog:Al(e),win:bu(e)}));a.forEach(({stop:e,index:t,dog:n,win:r})=>{let a=e.perroNombre||n?.name||`Pendiente de confirmar`;r||i([t],`${a}: falta la hora de retiro.`),n?n.status!==`Activo`&&i([t],`${a}: estado «${n.status}».`):i([t],`${a}: no está en el registro de perros (perro sin ficha).`)});let o=new Map;for(let e=0;e<a.length;e+=1)for(let t=e+1;t<a.length;t+=1){let n=a[e],r=a[t];if(!n.dog||!r.dog)continue;if(n.dog.id===r.dog.id){i([n.index,r.index],`${n.dog.name} está dos veces en esta ruta.`);continue}if(!xu(n.win,r.win))continue;((n.dog.incompatibleWith||[]).includes(r.dog.name)||(r.dog.incompatibleWith||[]).includes(n.dog.name))&&i([n.index,r.index],`No juntar: ${n.dog.name} y ${r.dog.name} van en la misma franja (${Cl(n.stop.hora)} y ${Cl(r.stop.hora)}).`);let s=n.dog.size===`Pequeño`&&r.dog.size===`Grande`?n:r.dog.size===`Pequeño`&&n.dog.size===`Grande`?r:null;if(s){let e=s===n?r:n;o.has(s.index)||o.set(s.index,{small:s,bigs:[]}),o.get(s.index).bigs.push(e)}}return o.forEach(({small:e,bigs:t})=>{let n=[...new Set(t.map(e=>e.dog.name))];i([e.index,...t.map(e=>e.index)],`Tamaños mezclados: ${e.dog.name} (pequeño) comparte franja con ${dl(n)} (${n.length===1?`grande`:`grandes`}).`)}),t.filter(t=>t.ruta!==e.ruta).forEach(e=>{(e.paradas||[]).forEach(t=>{let n=Al(t);a.forEach(({index:r,dog:a,win:o})=>{a&&n&&a.id===n.id&&xu(o,bu(t))&&i([r],`${a.name} también está en ${e.ruta} a las ${Cl(t.hora)}.`)})})}),{list:[...new Set(n)],byStop:r}}function Cu(e){return Su(e,hu(e.dia))}function wu(e,t){return Su(e,gu(t))}function Tu(e,{fecha:t}={}){let n=[`*Ruta ${t?`${e.ruta} · ${sl(t)} · ${e.turno}`:`${e.ruta} · ${e.dia} · ${e.turno} (plantilla semanal)`}*`,`Paseador: ${Ml(e.paseador)||`Pendiente de confirmar`} | Ayudante: ${Ml(e.ayudante)||`sin ayudante`} | Supervisa: ${Ml(e.supervisor)||`Pendiente de confirmar`}`],r=(e.paradas||[]).slice().sort((e,t)=>(xl(e.hora)??9999)-(xl(t.hora)??9999));return r.forEach((e,t)=>{let r=Al(e),i=[];e.nota&&i.push(e.nota),jl(r)&&!/bozal/i.test(e.nota||``)&&i.push(`Usa bozal`),n.push(`${t+1}) ${Cl(e.hora)||`sin hora`} ${e.perroNombre||r?.name||`Pendiente de confirmar`} · ${Number(e.minutos)||45} min${i.length?` · ${i.join(` · `)}`:``}`)}),r.length||n.push(`Sin perros cargados.`),e.notas&&n.push(`Notas: ${e.notas}`),n.join(`
`)}var B=null,Eu=``,Du=``,Ou=``,ku=!1,Au=``,ju=``,Mu=!1;function Nu(){return Kc(Gc,{}).rutasVista===`dia`?`dia`:`semana`}function Pu(e){qc(Gc,{...Kc(Gc,{}),rutasVista:e})}function Fu(){let e=y();return(!il(ju)||ju<e)&&(ju=e),ju}function Iu(e){return(e||[]).map(e=>({perroId:e.perroId||``,perroNombre:e.perroNombre||Al(e)?.name||``,hora:Cl(e.hora)||e.hora||``,minutos:Number(e.minutos)||45,nota:e.nota||``}))}function Lu(e,{modo:t,fecha:n=``,nuevo:r=!1,solicitud:i=null}={}){B={modo:t,fecha:n,nuevo:r,id:t===`plantilla`?du(e.ruta,e.dia):fu(n,e.ruta),dia:t===`dia`?ol(n):e.dia,turno:e.turno,ruta:e.ruta,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,paradas:Iu(e.paradas),plantillaId:e.plantillaId||(t===`plantilla`?e.id:``),existeDia:t===`dia`&&e.origen===`dia`?e:null,soloDia:t===`plantilla`&&ll(e.dia)[0]||``,solicitudId:i?.id||``,precarga:``,respuesta:``,sucio:!1},Eu=``,Du=``,Ou=``}function Ru(){B=null,Eu=``,Du=``,Ou=``}function zu(e,t){let n=t===`Mañana`?`M`:`T`;for(let t=1;t<10;t+=1){let r=`PJ_${t}${n}`;if(!e.some(e=>e.ruta===r))return r}return`PJ_X${n}`}function Bu(){if(!B)return{list:[],byStop:new Map};let e=B.modo===`plantilla`?hu(B.dia):gu(B.fecha);return Su(B,e)}function Vu(e,t){let n=Sl(Du)?Cl(Du):yu(B);B.paradas.push({perroId:e?.id||``,perroNombre:e?.name||t,hora:n,minutos:e?.minutes||45,nota:e?.incompatibleWith?.length?`No juntar con ${dl(e.incompatibleWith)}`:jl(e)?`Bozal`:``}),B.sucio=!0,Eu=``,Du=``}function Hu(){B.paradas.sort((e,t)=>(xl(e.hora)??9999)-(xl(t.hora)??9999)),B.sucio=!0}function Uu(){return{dia:B.dia,turno:B.turno,ruta:B.ruta,paseador:B.paseador.trim(),ayudante:B.ayudante.trim(),supervisor:B.supervisor.trim(),notas:B.notas.trim(),paradas:Iu(B.paradas)}}function Wu(){let e=String(B.ruta||``).trim().toUpperCase().replace(/\s+/g,`_`);if(!cu.test(e))return[`El código de la ruta tiene que ser como PJ_1M (letras, números y guion bajo).`,`coord-ed-ruta`];if(B.ruta=e,B.nuevo&&(B.modo===`plantilla`?pu().some(t=>t.id===du(e,B.dia)):gu(B.fecha).some(t=>t.ruta===e)))return[`Ya hay una ruta ${e} ese día. Elegí otro código o editá la que existe.`,`coord-ed-ruta`];let t=B.paradas.findIndex(e=>!Sl(e.hora));return t>=0?[`Falta la hora de retiro de ${B.paradas[t].perroNombre||`un perro`}.`,`coord-ed-hora-${t}`]:null}var Gu={},Ku=``;function qu(){return Il(`solicitudes`).slice().sort(Gl)}function Ju(){return qu().filter(e=>(e.estado||`pendiente`)===`pendiente`).sort((e,t)=>Number(!!t.urgente)-Number(!!e.urgente)||String(e.fecha||``).localeCompare(String(t.fecha||``))||Gl(t,e))}function Yu(e){return e.perroId&&Dl.get(e.perroId)?Dl.get(e.perroId):Ol.get(I(e.perroNombre))||null}function Xu(e){let t=/(\d{1,2})\s*[:.h]\s*(\d{2})/.exec(String(e||``));return t?Cl(`${t[1]}:${t[2]}`):``}function Zu(e){let t=il(e.fecha)?e.fecha:y(),n=Yu(e),r=gu(t),i=e.ruta?r.find(t=>t.ruta===e.ruta):null;!i&&n&&(i=r.find(t=>(!e.turno||t.turno===e.turno)&&(t.paradas||[]).some(e=>Al(e)?.id===n.id))),!i&&e.turno&&(i=r.find(t=>t.turno===e.turno));let a=!i;if(!i){let n=e.turno||`Mañana`;i={ruta:e.ruta||zu(r,n),dia:ol(t),turno:n,paradas:[],origen:`plantilla`}}Lu(i,{modo:`dia`,fecha:t,nuevo:a,solicitud:e});let o=I(e.tipo),s=n?B.paradas.findIndex(e=>Al(e)?.id===n.id):B.paradas.findIndex(t=>I(t.perroNombre)===I(e.perroNombre)),c=Xu(e.detalle),l=n?.name||e.perroNombre||`el perro`;o===`no sale`?s>=0?(B.paradas.splice(s,1),B.precarga=`Ya saqué a ${l} de la ruta. Revisá y guardá.`):B.precarga=`${l} no está en esta ruta: revisá a mano.`:o===`cambiar hora`?s>=0&&c?(B.paradas[s].hora=c,B.precarga=`Ya cambié la hora de ${l} a las ${c}. Revisá y guardá.`):B.precarga=`No pude precargar la hora nueva: cambiala a mano.`:o===`agregar perro`?s>=0?B.precarga=`${l} ya estaba en la ruta: revisá la hora.`:n||e.perroNombre?(c&&(Du=c),Vu(n,e.perroNombre),B.precarga=`Ya agregué a ${l} a las ${B.paradas[B.paradas.length-1].hora}. Revisá y guardá.`):B.precarga=`No dice qué perro agregar: buscalo abajo.`:B.precarga=`Este cambio se hace a mano: revisá el pedido y ajustá la ruta.`,B.sucio=!0,B.respuesta=``}var Qu=[[`activo`,`Activo`],[`pausa`,`En pausa`],[`baja`,`De baja`]],$u=[b,...Yt.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`,`Otro (anotalo en notas)`],ed=[b,`Mañana`,`Tarde`,`Mañana y tarde`],td=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],nd=``;function rd(){return Il(`clientes`).slice().sort((e,t)=>String(e.nombre||``).localeCompare(String(t.nombre||``),`es`))}function id(){return Il(`avisos`).slice().sort(Gl)}function ad(e,t=y()){return il(e.vigenteHasta)?e.vigenteHasta>=t:(e.fecha||``)===t}function od(){return id().filter(e=>ad(e))}function sd(e){let t=new Map;return e.forEach(e=>{let n=e.barrio||`Sin barrio`;t.has(n)||t.set(n,[]),t.get(n).push(e)}),[...t.entries()].sort((e,t)=>e[0].localeCompare(t[0],`es`))}function cd(){let e=new Map;return[...fn,...rd().map(e=>e.barrio),...id().map(e=>e.barrio)].forEach(t=>{let n=String(t||``).trim();n&&!e.has(I(n))&&e.set(I(n),n)}),[...e.values()].sort((e,t)=>e.localeCompare(t,`es`))}function ld(e){return[`*Aviso Paseos Juan · ${e.barrio||`Sin barrio`}*`,`Tipo: ${e.tipo||`otro`}`,e.mensaje||``,`Vigente hasta: ${il(e.vigenteHasta)?nl(e.vigenteHasta):nl(e.fecha)}`].filter(Boolean).join(`
`)}var ud=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],dd=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],fd=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],pd={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function md(e){return e.estado===`curso`?`en-curso`:nu.includes(e.estado)?e.estado:`nuevo`}function hd(){return Il(`pedidos`).slice().sort(Gl)}function gd(){return Il(`fichas`).slice().sort(Gl)}function _d(){let e={};return Il(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function vd(e){return e.datos?.perro||e.perro||``}function yd(e){return e.filter(e=>e.origen===`web`&&md(e)===`nuevo`)}function bd(){let e=_d();return kl.filter(t=>!e[t.id])}function xd(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function Sd(e,t,n=`secondary`,r=`Escribirle por WhatsApp`){if(!e)return``;let i=xd(e);return i?`<a class="coord-btn is-${n}" href="https://wa.me/${i}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${g(`message`,`coord-icon`)}<span>${r}</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`:`<p class="coord-inline-alert">${g(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina.</span></p>`}var Cd=wl;function wd(e){let t=I(e),n=Cd.map(I),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return Cd.slice(e,t+1)}return Cd.filter((e,r)=>t.includes(n[r]))}var Td=`carnet de vacunas`,Ed=[[Td,`Carnet de vacunas`],[`documento`,`Otro documento`]],Dd={[Td]:`Carnet de vacunas`,documento:`Documento`,foto:`Foto`};function Od(e){return e?.tipo===`comprobante de pago`}function kd(){return Il(`archivos`).filter(e=>e?.id&&!Od(e)).sort(Gl)}function Ad(e){return kd().find(t=>t.id===e)||null}function jd(e){return e?.tipo===Td}function Md(e){return Dd[e]||`Documento`}function Nd(e){let t=Number(e)||0;return t?t<1048576?`${Math.max(1,Math.round(t/1024))} KB`:`${(t/1048576).toFixed(1).replace(`.`,`,`)} MB`:``}function Pd(){return navigator.onLine===!1}function Fd(e,t){return Pd()||e?.status===0||e?.name===`TypeError`?`Sin señal: para ${t} archivos hace falta conexión. Probá de nuevo cuando vuelva.`:e?.message||`No se pudo ${t} el archivo.`}function Id(e){let t=new Set([e.carnet?.id,...Array.isArray(e.archivos)?e.archivos:[]].filter(Boolean));kd().filter(t=>t.pedidoId===e.id).forEach(e=>t.add(e.id));let n=new Map(Il(`archivos`).map(e=>[e.id,e]));return[...t].filter(e=>!Od(n.get(e))).map(t=>n.get(t)||(t===e.carnet?.id?{id:t,tipo:Td,nombreArchivo:e.carnet.nombre||``,perroNombre:e.datos?.perro||``}:{id:t,tipo:`documento`}))}function Ld(e){let t=new Set(Array.isArray(e.archivos)?e.archivos:[]),n=new Set(Array.isArray(e.perros)?e.perros:[]);return kd().filter(r=>t.has(r.id)||r.clienteId&&r.clienteId===e.id||r.perroId&&n.has(r.perroId)||e.pedidoId&&r.pedidoId===e.pedidoId)}var Rd=new Map;function zd(){let e=new Map,t=(t,n)=>{Dl.has(t)&&(e.has(t)||e.set(t,[]),e.get(t).some(e=>e.id===n.id)||e.get(t).push(n))},n=rd();return kd().filter(jd).forEach(e=>{e.perroId?t(e.perroId,e):n.forEach(n=>{let r=n.archivosPerro?.[e.id];if(r){t(r,e);return}let i=Array.isArray(n.perros)?n.perros:[];i.length===1&&(Array.isArray(n.archivos)&&n.archivos.includes(e.id)||e.clienteId&&e.clienteId===n.id||n.pedidoId&&e.pedidoId===n.pedidoId)&&t(i[0],e)})}),e}function Bd(e){return!!(e&&Rd.get(e.id)?.length)}var Vd=null;function Hd(e,t,n=`ok`){Vd={key:e,text:t,tone:n,until:Date.now()+15e3},n===`error`?el(t):$c(t)}function Ud(e){return!Vd||Vd.key!==e||Date.now()>Vd.until?``:`<p class="coord-flash is-${Vd.tone} is-small">${g(Vd.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${F(Vd.text)}</span></p>`}function Wd(e,t){Pd()?(Hd(t,`Sin señal: para abrir archivos hace falta conexión. Probá de nuevo cuando vuelva.`,`error`),z()):($c(`Abriendo el archivo en otra pestaña.`),_t.abrir(e).catch(e=>{Hd(t,Fd(e,`abrir`),`error`),z()}))}var V=null;function Gd(e){let t=Array.isArray(e.perros)?e.perros.filter(e=>Dl.has(e)):[];V={clienteId:e.id,tipo:Td,perroId:t.length===1?t[0]:``,nota:``,file:null,estado:``,error:``}}var Kd={},qd=new Set;function Jd(e){return Kd[e]||{}}function Yd(e,t){Kd[e]=t,qd.delete(e)}function Xd(e){delete Kd[e],qd.add(e)}function Zd(e){let t={...Jd(e.dataset.coordForm)},n=new Set;return e.querySelectorAll(`[name]`).forEach(r=>{if(r.type!==`file`){if(r.type===`checkbox`){if(n.has(r.name))return;n.add(r.name);let i=e.querySelectorAll(`[name="${r.name}"]`);t[r.name]=[...i].filter(e=>e.checked).map(e=>e.value)}else t[r.name]=r.value}}),t}function Qd(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${F(r)}" ${i?`placeholder="${F(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function $d(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`,l=r.map(e=>Array.isArray(e)?e:[e,e]);return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``}>
        ${l.map(([e,t])=>`<option value="${F(e)}" ${e===i?`selected`:``}>${F(t)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function ef(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``,required:c=!1}={}){let l=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${l}">${n}${c?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <textarea id="${l}" name="${t}" rows="3" ${i?`placeholder="${F(i)}"`:``} ${a?`aria-describedby="${l}-hint"`:``} ${s}>${F(r)}</textarea>
      ${a?`<small id="${l}-hint">${a}</small>`:``}
    </div>
  `}function tf(e,t){return`
    <div class="coord-field is-wide">
      <span class="coord-label" id="coord-${e}-dias-label">Días</span>
      <div class="coord-days" role="group" aria-labelledby="coord-${e}-dias-label">
        ${wl.map(n=>`
          <label class="coord-day"><input type="checkbox" id="coord-${e}-dia-${ul(n)}" name="dias" value="${n}" ${t.includes(n)?`checked`:``} /><span>${n}</span></label>
        `).join(``)}
      </div>
    </div>
  `}function nf(e){if(!Yc||Yc.section!==e)return``;let t=Yc.undo?`<button class="coord-link" type="button" id="coord-undo-${e}" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${Yc.tone}">${g(Yc.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${F(Yc.text)}</span>${t}</p>`}function H(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?g(r,`coord-icon`):``}<span>${e}</span></button>`}function rf({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${hl(e,s)?`open`:``}>
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
  `}function U(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function af(e){return e?.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${F(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${g(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${F(e)}</li>`).join(``)}
    </ul>
  `:``}function of(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${F(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function sf(e,t){return e.length?`
    <div class="coord-warn-box" role="note" ${t?`id="${t}"`:``}>
      <h3>${g(`alertTriangle`,`coord-icon`)}<span>${e.length===1?`1 aviso para revisar`:`${e.length} avisos para revisar`}</span></h3>
      <ul>${e.map(e=>`<li>${F(e)}</li>`).join(``)}</ul>
      <p>No bloquea el guardado: revisalo antes de mandar la ruta.</p>
    </div>
  `:``}function cf(e){let t=Bd(e);return`<span class="coord-carnet ${t?`is-ok`:`is-missing`}">${g(t?`fileCheck`:`alertCircle`,`coord-icon`)}<span>Carnet: ${t?`cargado`:`falta`}</span></span>`}function lf(e,t){let n=`${Md(e.tipo)}${e.perroNombre?` de ${e.perroNombre}`:``}`,r=e.mime===`application/pdf`?`PDF`:e.mime?`Foto`:``,i=[e.creadoPor===`web`?`Llegó por la página web`:e.creadoPorNombre?`Subido por ${e.creadoPorNombre}`:``,e.creadoEn?rl(e.creadoEn):nl(e.fecha),[r,Nd(e.tamano)].filter(Boolean).join(`, `),e.ubicacion===`drive`?`Guardado en Drive`:``].filter(Boolean).join(` · `);return`
    <li class="coord-file">
      <span class="coord-file-icon">${g(jd(e)?`fileCheck`:`fileText`,`coord-icon`)}</span>
      <span class="coord-file-text">
        <b>${F(n)}</b>
        ${i?`<small>${F(i)}</small>`:``}
        ${e.nota?`<small>${F(e.nota)}</small>`:``}
      </span>
      ${H(`Ver<span class="coord-sr-only"> ${F(n.toLowerCase())} (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${F(e.id)}" data-scope="${F(t)}"`,`ghost`,`eye`)}
    </li>
  `}function uf(e){let t=Id(e),n=`pedido-${e.id}`;return t.length?`
    <div class="coord-attach">
      ${t.map(e=>{let t=jd(e),r=e.creadoEn?`Llegó el ${rl(e.creadoEn)}`:``;return`
          <p class="coord-attach-row">
            ${g(t?`fileCheck`:`fileText`,`coord-icon`)}
            <span><b>${t?`Carnet de vacunas adjunto`:`${F(Md(e.tipo))} adjunto`}</b>${r?`<small>${F(r)}</small>`:``}</span>
            ${H(`${t?`Ver carnet`:`Ver`}<span class="coord-sr-only"> (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${F(e.id)}" data-scope="${F(n)}"`,`secondary`,`eye`)}
          </p>`}).join(``)}
    </div>
    ${Ud(n)}
  `:e.origen===`web`&&md(e)!==`resuelto`?`<p class="coord-meta">${g(`alertCircle`,`coord-icon`)}<span>No mandó el carnet de vacunas: pedíselo al tutor.</span></p>${Ud(n)}`:Ud(n)}function df(e,t,n,r){return`
    <label class="coord-btn is-secondary coord-file-pick" for="${e}">
      ${g(`camera`,`coord-icon`)}<span>${t}</span>
      <input id="${e}" type="file" accept="image/*,application/pdf" capture="environment" ${n} aria-describedby="${r}" />
    </label>
  `}function ff(e,t){let n=F(e.id),r=V,i=r.estado===`subiendo`,a=`coord-subida-hint-${n}`;return`
    <div class="coord-upload" id="coord-subida-${n}" role="group" aria-labelledby="coord-subida-title-${n}">
      <p class="coord-upload-title" id="coord-subida-title-${n}">Subir carnet o documento de ${F(e.nombre||`este cliente`)}</p>
      ${Pd()?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>Sin señal: los archivos no quedan en espera. Elegilo igual y tocá «Subir» cuando vuelva la señal.</span></p>`:``}
      <div class="coord-grid">
        <div class="coord-field">
          <label for="coord-subida-tipo-${n}">Qué es</label>
          <select id="coord-subida-tipo-${n}" data-coord-subida-campo="tipo">
            ${Ed.map(([e,t])=>`<option value="${e}" ${e===r.tipo?`selected`:``}>${t}</option>`).join(``)}
          </select>
        </div>
        <div class="coord-field">
          <label for="coord-subida-perro-${n}">De qué perro${r.tipo===Td&&t.length>1?` <span class="coord-required">(obligatorio)</span>`:``}</label>
          <select id="coord-subida-perro-${n}" data-coord-subida-campo="perroId">
            <option value="">${t.length?r.tipo===Td?`Elegí el perro`:`De ninguno en especial`:`El cliente no tiene perros cargados`}</option>
            ${t.map(e=>`<option value="${e.id}" ${e.id===r.perroId?`selected`:``}>${F(e.name)}</option>`).join(``)}
          </select>
        </div>
        <div class="coord-field is-wide">
          <span class="coord-label">Foto o PDF <span class="coord-required">(obligatorio)</span></span>
          ${df(`coord-subida-archivo-${n}`,r.file?`Cambiar el archivo`:`Sacar foto o elegir archivo`,`data-coord-subida-archivo`,a)}
          <small id="${a}">${r.file?`Elegiste <b>${F(r.file.name)}</b> (${Nd(r.file.size)}).`:`Foto clara o PDF, hasta 3,5 MB. Las fotos se achican solas.`}</small>
        </div>
        <div class="coord-field is-wide">
          <label for="coord-subida-nota-${n}">Nota (opcional)</label>
          <input id="coord-subida-nota-${n}" type="text" value="${F(r.nota)}" data-coord-subida-campo="nota" autocomplete="off" placeholder="Ej.: antirrábica hasta 03/2027" />
        </div>
      </div>
      <p class="coord-upload-status" role="status">${i?`${g(`clock`,`coord-icon`)}<span>Subiendo… No cierres la página.</span>`:``}</p>
      ${r.error?`<p class="coord-flash is-error is-small">${g(`alertCircle`,`coord-icon`)}<span>${F(r.error)}</span></p>`:``}
      <div class="coord-actions">
        ${H(i?`Subiendo…`:`Subir`,`id="coord-subida-ok-${n}" data-coord-subida-ok="${n}" ${i?`aria-disabled="true"`:``}`,`primary`,`uploadCloud`)}
        ${H(`Cancelar`,`id="coord-subida-cancel-${n}" data-coord-subida-cancel="${n}"`,`ghost`)}
      </div>
    </div>
  `}function pf(e){let t=F(e.id),n=Ld(e),r=(Array.isArray(e.perros)?e.perros:[]).map(e=>Dl.get(e)).filter(Boolean),i=`cliente-${e.id}`;return`
    <div class="coord-docs" role="group" aria-labelledby="coord-docs-${t}">
      <h4 id="coord-docs-${t}">${g(`fileText`,`coord-icon`)}<span>Documentos</span> <span class="coord-count">${n.length}</span></h4>
      ${r.length?`<ul class="coord-carnets" aria-label="Carnet de vacunas por perro">${r.map(e=>`<li><b>${F(e.name)}</b> ${cf(e)}</li>`).join(``)}</ul>`:``}
      ${n.length?`<ul class="coord-files">${n.map(e=>lf(e,i)).join(``)}</ul>`:`<p class="coord-empty is-small">${R.has(`archivos`)?`Todavía no hay documentos. Subí el carnet de vacunas de cada perro.`:`Cargando documentos…`}</p>`}
      ${Ud(i)}
      ${V?.clienteId===e.id?ff(e,r):H(`Subir carnet o documento`,`id="coord-subir-${t}" data-coord-subir="${t}"`,`secondary`,`fileUp`)}
    </div>
  `}var mf=`
  <datalist id="coord-team-users">${Kt.map(e=>`<option value="${F(e.id)}">${F(e.name)} · ${F(e.label)}</option>`).join(``)}</datalist>
  <datalist id="coord-team-names">${Kt.map(e=>`<option value="${F(e.name.split(` `)[0])}">${F(e.name)}</option>`).join(``)}</datalist>
`;function hf(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${gf()}
      ${e}
    </div>
  `}function gf(){return`
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
  `}function _f(){Vl(),Hl(),Rd=zd();let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${vf()}
      ${bf()}
      ${Sf()}
      ${Cf()}
      ${jf()}
      ${If()}
      ${Lf()}
      ${Bf()}
      ${Uf()}
      ${Zf()}
      ${rp()}
      <p class="coord-footnote">
        Rutas de partida: ${F(Gt.officialSources.routes)} (${Wt}). Datos de perros: ${F(Gt.officialSources.dogs)}.
        Rutas, clientes, avisos y pedidos se guardan en los datos compartidos del equipo. Los carnets y documentos quedan privados: se abren solo con tu usuario. Los pagos los ve solo Juan.
      </p>
      ${mf}
    </main>
  `;return Yc=null,qd.clear(),e}function vf(){let e=v.pendingCount(),t=navigator.onLine===!1,n=[...new Set(Ll.values())],r=[];return e?r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>${e} ${e===1?`cambio pendiente`:`cambios pendientes`} sin señal.</b> Se ${e===1?`envía solo`:`envían solos`} cuando vuelva.${t?` Los archivos (carnet y documentos) no quedan en espera: para subirlos hace falta señal.`:``}</span></p>`):t&&r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva. Los archivos (carnet y documentos) no: para subirlos o abrirlos hace falta señal.</span></p>`),n.length&&r.push(`<div class="coord-sync is-error">${g(`alertCircle`,`coord-icon`)}<span>${n.map(F).join(` `)}</span>${H(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),eu&&r.push(`<p class="coord-sync is-ok">${g(`uploadCloud`,`coord-icon`)}<span>${F(eu)}</span></p>`),r.length?`<div class="coord-sync-list">${r.join(``)}</div>`:``}function yf(e,{compact:t=!1}={}){let n=F(e.id),r=e.estado||`pendiente`,i=e.perroNombre||Yu(e)?.name||``,a=e.creadoPorNombre?`${e.creadoPorNombre}${e.creadoEn?`, ${rl(e.creadoEn)}`:``}`:b,o=e.titulo||[e.tipo,i].filter(Boolean).join(`: `),s=Ku===e.id;return`
    <li class="coord-sol ${e.urgente?`is-urgent`:``} is-${F(r)}" id="coord-sol-${n}" tabindex="-1">
      <div class="coord-sol-head">
        <strong>${F(o||`Pedido de cambio`)}</strong>
        <span class="coord-badges">${e.urgente?U(`Urgente`,`alert`):``}${r===`aplicado`?U(`Aplicado`,`ok`):U(r===`rechazado`?`Rechazado`:`Pendiente`,`warn`)}</span>
      </div>
      <p class="coord-sol-where">${g(`route`,`coord-icon`)}<span>${F([e.fecha?sl(e.fecha):``,e.turno,e.ruta].filter(Boolean).join(` · `)||`Pendiente de confirmar`)}</span></p>
      ${of([[`Qué cambiar`,e.detalle],[`Por qué`,e.motivo],[`Pidió`,a],[`Respuesta`,e.respuesta]],t?`is-compact`:``)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      ${r===`pendiente`?`
        ${s?`
          <div class="coord-reject">
            <label for="coord-rechazo-${n}">Respuesta para el supervisor <span class="coord-required">(obligatorio)</span></label>
            <textarea id="coord-rechazo-${n}" rows="2" data-coord-rechazo="${n}" placeholder="Ej.: Ese día no hay lugar en la ruta; lo pasamos al lunes.">${F(Gu[e.id]||``)}</textarea>
            <div class="coord-actions">
              ${H(`Enviar rechazo`,`id="coord-rechazar-ok-${n}" data-coord-sol-rechazar-ok="${n}"`,`primary`)}
              ${H(`Cancelar`,`data-coord-sol-rechazar-cancel="${n}"`,`ghost`)}
            </div>
          </div>`:`
          <div class="coord-actions">
            ${H(`Aplicar`,`id="coord-aplicar-${n}" data-coord-sol-aplicar="${n}"`,`primary`,`checkCircle`)}
            ${H(`Rechazar`,`id="coord-rechazar-${n}" data-coord-sol-rechazar="${n}"`,`ghost`,`x`)}
          </div>`}`:``}
    </li>
  `}function bf(){let e=y(),t=bl(),n=yd(hd()),r=Ju(),i=r.filter(e=>e.urgente),a=pu().length>0,o=gu(e),s=o.reduce((t,n)=>t+wu(n,e).list.length,0),c=o.reduce((e,t)=>e+(t.paradas||[]).length,0),l=od(),u=sd(l).map(([e])=>e),d=bd(),f;if(i.length)f={text:`Resolvé el pedido urgente de <b>${F(i[0].creadoPorNombre||`supervisión`)}</b>: ${F(i[0].titulo||i[0].tipo||`cambio de ruta`)}.`,action:H(`Aplicar`,`data-coord-sol-aplicar="${F(i[0].id)}"`,`primary`,`arrowRight`)};else if(n.length){let e=n[n.length-1],t=e.datos||{};f={text:`Escribile a <b>${F(t.responsable||`quien hizo el pedido`)}</b> por la evaluación de <b>${F(t.perro||`su perro`)}</b>.`,action:H(`Ver pedido`,`data-coord-goto-pedido="${F(e.id)}"`,`primary`,`arrowRight`)}}else f=!a&&R.has(`plantillas`)?{text:`Cargá las rutas de la planilla RPJ para tener la semana armada.`,action:H(`Ir a rutas`,`data-coord-goto="coord-rutas"`,`primary`,`arrowRight`)}:r.length?{text:`Respondé el pedido de cambio de <b>${F(r[0].creadoPorNombre||`supervisión`)}</b>.`,action:H(`Aplicar`,`data-coord-sol-aplicar="${F(r[0].id)}"`,`primary`,`arrowRight`)}:s?{text:`Revisá ${s===1?`el aviso`:`los ${s} avisos`} de las rutas de hoy.`,action:H(`Ver rutas de hoy`,`data-coord-ver-dia="${e}"`,`primary`,`arrowRight`)}:d.length?{text:`Confirmá el dato de <b>${F(d[0].name)}</b>: ${F(d[0].review||`estado "${d[0].status}"`)}`,action:H(`Ver datos`,`data-coord-open="datos"`,`primary`,`arrowRight`)}:{text:`Todo en orden. Mirá las rutas del día siguiente.`,action:H(`Ver el día siguiente`,`data-coord-ver-dia="${al(e,1)}"`,`primary`,`arrowRight`)};let p=r.slice(0,3);return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${sl(e)}</p>
        <p class="coord-greeting">Hola, ${F(t.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
      </div>

      ${r.length?`
        <div class="coord-sol-alert" id="coord-sol-urgente" tabindex="-1">
          <h2>${g(`bell`,`coord-icon`)}<span>${r.length===1?`1 pedido de cambio del supervisor`:`${r.length} pedidos de cambio del supervisor`}</span></h2>
          ${nf(`solicitudes`)}
          <ul class="coord-sol-list">${p.map(e=>yf(e,{compact:!0})).join(``)}</ul>
          ${r.length>p.length?`<p>Y ${r.length-p.length} más. ${H(`Ver todos`,`data-coord-open="solicitudes"`,`ghost`)}</p>`:``}
        </div>`:nf(`solicitudes`)}

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-alert`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Pedidos nuevos de la web</h2>
            <p class="coord-big"><b>${n.length}</b> <span>sin responder</span></p>
            <p>${n.length?F(dl(n.slice(0,3).map(e=>e.datos?.perro||`Pendiente de confirmar`))):R.has(`pedidos`)?`No hay pedidos nuevos.`:`Cargando pedidos…`}</p>
          </div>
          ${H(`Ver pedidos`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${a?s?`is-alert`:`is-ok`:`is-warn`}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Rutas de hoy</h2>
            ${!a&&!o.length?`<p class="coord-big"><b>0</b> <span>rutas</span></p><p>${R.has(`plantillas`)?`Todavía no hay rutas cargadas.`:`Cargando rutas…`}</p>`:`<p class="coord-big"><b>${o.length}</b> <span>${o.length===1?`ruta`:`rutas`}</span> <b>${c}</b> <span>paseos</span></p>
                 ${s?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${s} ${s===1?`aviso`:`avisos`} para revisar</span></p>`:`<p>Sin avisos.</p>`}`}
          </div>
          ${H(a?`Ver rutas de hoy`:`Cargar rutas`,a?`data-coord-ver-dia="${e}"`:`data-coord-goto="coord-rutas"`,`secondary`)}
        </li>
        <li class="coord-priority ${l.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Avisos de barrio vigentes</h2>
            <p class="coord-big"><b>${l.length}</b> <span>${l.length?u.length===1?`en 1 barrio`:`en ${u.length} barrios`:`avisos`}</span></p>
            <p>${l.length?F(dl(u.slice(0,3))):`Sin avisos vigentes.`}</p>
          </div>
          ${H(l.length?`Ver avisos`:`Cargar un aviso`,l.length?`data-coord-goto="coord-avisos-vigentes"`:`data-coord-open="avisos"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function xf(e,{history:t=!1}={}){let n=F(e.id);return`
    <li class="coord-aviso ${t?`is-old`:``}">
      <div class="coord-aviso-head">
        ${t?`<strong>${F(e.barrio||`Sin barrio`)}</strong>`:``}
        ${U(F(e.tipo||`otro`),e.tipo===`seguridad`||e.tipo===`perro suelto`?`alert`:`warn`)}
        <small>${t?`Venció`:`Hasta`} el ${F(nl(il(e.vigenteHasta)?e.vigenteHasta:e.fecha))}</small>
      </div>
      <p>${F(e.mensaje||e.titulo||``)}</p>
      ${ql(e)}
      <div class="coord-actions">
        ${H(`Copiar para WhatsApp`,`data-coord-aviso-copy="${n}"`,`ghost`,`copy`)}
        ${t?``:H(`Ya no está vigente`,`data-coord-aviso-fin="${n}"`,`ghost`)}
      </div>
    </li>
  `}function Sf(){let e=od();return e.length?`
    <section class="coord-block coord-avisos-strip" id="coord-avisos-vigentes" tabindex="-1" aria-labelledby="coord-avisos-vig-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-avisos-vig-title">Avisos vigentes por barrio</h2>
          <p>Lo que el equipo tiene que saber hoy en cada barrio.</p>
        </div>
        ${H(`Cargar un aviso`,`data-coord-open="avisos"`,`secondary`,`plus`)}
      </div>
      ${nf(`avisosTop`)}
      <div class="coord-barrios">
        ${sd(e).map(([e,t])=>`
          <section class="coord-barrio" aria-label="Avisos en ${F(e)}">
            <h3>${g(`mapPin`,`coord-icon`)}<span>${F(e)}</span> <small>${t.length}</small></h3>
            <ul class="coord-aviso-list">${t.map(e=>xf(e)).join(``)}</ul>
          </section>
        `).join(``)}
      </div>
    </section>
  `:``}function Cf(){let e=pu(),t=!R.has(`plantillas`)&&!e.length,n;if(B)n=Af();else if(t)n=`<p class="coord-empty">${g(`clock`,`coord-icon`)}Cargando rutas…</p>`;else if(!e.length||Au)n=wf();else{let e=Nu();n=`
      <div class="coord-seg" role="group" aria-label="Qué querés ver">
        <button type="button" class="coord-seg-btn" id="coord-vista-semana" data-coord-vista="semana" aria-pressed="${e===`semana`}">${g(`calendarCheck`,`coord-icon`)}<span>Semana (se repite)</span></button>
        <button type="button" class="coord-seg-btn" id="coord-vista-dia" data-coord-vista="dia" aria-pressed="${e===`dia`}">${g(`route`,`coord-icon`)}<span>Un día puntual</span></button>
      </div>
      ${e===`semana`?Ef():Df()}
    `}return`
    <section class="coord-block coord-routes" id="coord-rutas" tabindex="-1" aria-labelledby="coord-rutas-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-rutas-title">Rutas y horarios</h2>
          <p>La <b>semana</b> se repite todas las semanas. Si un día puntual cambia algo, guardalo <b>solo para ese día</b>: la semana no se toca.</p>
        </div>
      </div>
      ${nf(`rutas`)}
      ${n}
    </section>
  `}function wf(){let e=dn(),t=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <div class="coord-carga">
      <p>Todavía no hay rutas armadas en la app. Podés arrancar con las rutas reales de la planilla RPJ (hoja BASE RUTAS, leída el 12/11/2026): <b>${e.length} rutas</b> y <b>${t} paseos</b> con su hora de retiro. Después las cambiás acá.</p>
      ${Au?`<p class="coord-note" role="status">${g(`clock`,`coord-icon`)}<span>${F(Au)}</span></p>`:``}
      ${ku?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-carga-q">
          <p id="coord-carga-q"><b>¿Confirmás?</b> Se guardan ${e.length} rutas como semana base. Las ve todo el equipo.</p>
          <div class="coord-actions">
            ${H(`Sí, cargar las rutas`,`id="coord-carga-ok" data-coord-carga-ok`,`primary`,`checkCircle`)}
            ${H(`Cancelar`,`id="coord-carga-cancel" data-coord-carga-cancel`,`ghost`)}
          </div>
        </div>`:`<button class="coord-btn is-primary coord-btn-big" type="button" id="coord-carga" data-coord-carga>${g(`uploadCloud`,`coord-icon`)}<span>Cargar las rutas de la planilla RPJ</span></button>`}
      <p class="coord-meta">No incluye a «Llak» (jueves tarde): el nombre no coincide con ningún perro. Paseador y ayudante quedan para completar.</p>
    </div>
  `}function Tf(e,{warnings:t,attrs:n}){let r=(e.paradas||[]).length;return`
    <button type="button" class="coord-wroute ${t?`is-alert`:``}" ${n}>
      <span class="coord-wroute-top"><strong>${F(e.ruta)}</strong>${t?`<span class="coord-wroute-warn">${g(`alertTriangle`,`coord-icon`)}${t}<span class="coord-sr-only"> ${t===1?`aviso`:`avisos`}</span></span>`:``}</span>
      <span>${r} ${r===1?`perro`:`perros`} · ${F(vu(e))}</span>
      <small>${e.paseador?F(Ml(e.paseador)):`Sin paseador`}</small>
    </button>
  `}function Ef(){let e=pu(),t=ol(y()),n=e.some(e=>e.dia===`Domingo`)?Jt:wl,r=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <p class="coord-meta">${e.length} rutas · ${r} paseos por semana. Tocá una ruta para editar sus horarios.</p>
    <div class="coord-week">
      ${n.map(e=>`
        <section class="coord-wday ${e===t?`is-today`:``}" aria-labelledby="coord-wday-${ul(e)}">
          <h3 id="coord-wday-${ul(e)}">${e}${e===t?` <span class="coord-tag">Hoy</span>`:``}</h3>
          ${Tl.map(t=>`
              <div class="coord-wturno">
                <p class="coord-wturno-label">${t}</p>
                ${hu(e).filter(e=>e.turno===t).map(n=>Tf(n,{warnings:Cu(n).list.length,attrs:`id="coord-wr-${F(n.id)}" data-coord-edit-plantilla="${F(n.id)}" aria-label="Editar ${F(n.ruta)} del ${e.toLowerCase()} a la ${t.toLowerCase()}"`})).join(``)}
                <button type="button" class="coord-wadd" id="coord-wadd-${ul(e)}-${ul(t)}" data-coord-new-route data-dia="${e}" data-turno="${t}">${g(`plus`,`coord-icon`)}<span>Ruta</span><span class="coord-sr-only"> nueva el ${e.toLowerCase()} a la ${t.toLowerCase()}</span></button>
              </div>
            `).join(``)}
        </section>
      `).join(``)}
    </div>
  `}function Df(){let e=y(),t=Fu(),n=gu(t),r=n.reduce((e,t)=>e+(t.paradas||[]).length,0),i=new Set;n.forEach(e=>(e.paradas||[]).forEach(e=>{let t=Al(e);Bd(t)||i.add(t?.id||I(e.perroNombre))}));let a=Mu&&n.length>0;return`
    <div class="coord-dayview">
      <div class="coord-day-pick">
        <div class="coord-field">
          <label for="coord-rutas-fecha">Día</label>
          <input id="coord-rutas-fecha" type="date" value="${t}" min="${e}" max="${al(e,90)}" data-coord-rutas-fecha />
        </div>
        <div class="coord-day-quick">
          ${H(`Hoy`,`id="coord-dia-hoy" data-coord-ver-dia="${e}"`,t===e?`secondary`:`ghost`)}
          ${H(`Día siguiente`,`id="coord-dia-manana" data-coord-ver-dia="${al(e,1)}"`,t===al(e,1)?`secondary`:`ghost`)}
        </div>
      </div>
      <h3 class="coord-day-title">${F(sl(t))} · ${n.length} ${n.length===1?`ruta`:`rutas`} · ${r} paseos</h3>
      ${n.length?`
        <div class="coord-actions">
          ${H(`Perros sin carnet <span class="coord-count">${i.size}</span>`,`id="coord-filtro-carnet" data-coord-filtro-carnet aria-pressed="${a}"`,a?`secondary`:`ghost`,`fileText`)}
          ${H(`Copiar todas las rutas del día`,`id="coord-copy-dia" data-coord-copy-dia="${t}"`,`ghost`,`copy`)}
        </div>
        ${a?`<p class="coord-note" role="status">${g(`fileText`,`coord-icon`)}<span>${i.size?`Mostrando solo los perros sin carnet de vacunas cargado: ${i.size} de este día. El carnet se sube desde la ficha del cliente.`:`Todos los perros de este día tienen el carnet cargado.`}</span></p>`:``}`:`<p class="coord-empty is-small">No hay rutas para este día. Si es un día de servicio, armá la semana en «Semana (se repite)» o sumá una ruta extra acá abajo.</p>`}
      <ul class="coord-dayroutes">
        ${n.map(e=>{let n=wu(e,t),r=(e.paradas||[]).slice().sort((e,t)=>(xl(e.hora)??9999)-(xl(t.hora)??9999)),i=a?r.filter(e=>!Bd(Al(e))):r,o=`ruta-${t}-${e.ruta}`;return`
            <li class="coord-dayroute ${n.list.length?`is-alert`:``}">
              <div class="coord-card-head">
                <strong>${F(e.ruta)} · ${F(e.turno)}</strong>
                ${e.origen===`dia`?U(`Cambio solo para este día`,`warn`):U(`Igual que la semana`,`neutral`)}
              </div>
              <p>${i.length} ${i.length===1?`perro`:`perros`} · ${F(vu(e))} · Paseador: ${F(Ml(e.paseador)||`Pendiente de confirmar`)}${e.ayudante?` · Ayudante: ${F(Ml(e.ayudante))}`:``}</p>
              ${n.list.length?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${F(n.list.slice(0,2).join(` `))}${n.list.length>2?` Y ${n.list.length-2} más.`:``}</span></p>`:``}
              <details class="coord-card-more" ${a||_l.has(o)?`open`:``}>
                <summary data-coord-mem-toggle="${F(o)}">${a?`Sin carnet (${i.length})`:`Ver paradas`} ${g(`chevronDown`,`coord-icon`)}</summary>
                ${i.length?`<ol class="coord-stops-mini">${i.map(t=>`<li value="${r.indexOf(t)+1}" class="${n.byStop.has((e.paradas||[]).indexOf(t))?`is-alert`:``}"><span class="coord-stop-line"><b>${F(Cl(t.hora)||`--:--`)}</b> ${F(t.perroNombre)} <small>${Number(t.minutos)||45} min${t.nota?` · ${F(t.nota)}`:``}</small></span>${cf(Al(t))}<span class="coord-sr-only"> (parada ${r.indexOf(t)+1})</span></li>`).join(``)}</ol>`:`<p class="coord-meta">${a?`Todos los perros de esta ruta tienen el carnet cargado.`:`Esta ruta no tiene perros.`}</p>`}
              </details>
              <div class="coord-actions">
                ${H(`Cambiar solo este día`,`id="coord-ed-dia-${F(e.ruta)}" data-coord-edit-dia="${F(e.ruta)}" data-fecha="${t}"`,`primary`,`sliders`)}
                ${H(`Copiar para WhatsApp`,`data-coord-copy-ruta="${F(e.ruta)}" data-fecha="${t}"`,`ghost`,`copy`)}
              </div>
            </li>
          `}).join(``)}
      </ul>
      <div class="coord-actions">
        ${Tl.map(e=>H(`Ruta extra solo este día (${e.toLowerCase()})`,`id="coord-extra-${ul(e)}" data-coord-new-dia data-turno="${e}" data-fecha="${t}"`,`ghost`,`plus`)).join(``)}
      </div>
    </div>
  `}function Of(e,t,n){let r=Al(e),i=n.byStop.get(t)||[],a=Sl(e.hora)?ln(Cl(e.hora),e.minutos||45):``,o=B.paradas.length-1,s=e.perroNombre||r?.name||`Pendiente de confirmar`;return`
    <li class="coord-stop ${i.length?`is-alert`:``}">
      <div class="coord-stop-head">
        <span class="coord-stop-num" aria-hidden="true">${t+1}</span>
        <div class="coord-stop-name">
          <strong>${F(s)}</strong>
          <small>${r?`${F(r.size)}${r.status===`Activo`?``:` · ${F(r.status)}`}`:`Sin ficha en el registro`}</small>
        </div>
        <div class="coord-stop-tools">
          <button type="button" class="coord-icon-btn" id="coord-ed-up-${t}" data-coord-stop-up="${t}" ${t===0?`disabled`:``} aria-label="Subir a ${F(s)}">${g(`chevronDown`,`coord-icon is-up`)}</button>
          <button type="button" class="coord-icon-btn" id="coord-ed-down-${t}" data-coord-stop-down="${t}" ${t===o?`disabled`:``} aria-label="Bajar a ${F(s)}">${g(`chevronDown`,`coord-icon`)}</button>
          <button type="button" class="coord-icon-btn is-danger" id="coord-ed-del-${t}" data-coord-stop-del="${t}" aria-label="Quitar a ${F(s)} de la ruta">${g(`x`,`coord-icon`)}</button>
        </div>
      </div>
      <div class="coord-stop-fields">
        <div class="coord-field">
          <label for="coord-ed-hora-${t}">Retiro</label>
          <input id="coord-ed-hora-${t}" type="time" step="300" value="${F(Cl(e.hora))}" data-coord-stop="${t}" data-k="hora" ${Sl(e.hora)?``:`aria-invalid="true"`} />
        </div>
        <div class="coord-field">
          <label for="coord-ed-min-${t}">Minutos</label>
          <input id="coord-ed-min-${t}" type="number" min="5" max="240" step="5" inputmode="numeric" value="${F(e.minutos)}" data-coord-stop="${t}" data-k="minutos" />
        </div>
        <p class="coord-stop-end">${a?`Vuelve ~${a}`:``}</p>
        <div class="coord-field is-wide">
          <label for="coord-ed-nota-${t}">Nota</label>
          <input id="coord-ed-nota-${t}" type="text" value="${F(e.nota)}" data-coord-stop="${t}" data-k="nota" placeholder="Ej.: bozal, sale con…" autocomplete="off" />
        </div>
      </div>
      ${i.length?`<ul class="coord-stop-warn">${i.map(e=>`<li>${g(`alertTriangle`,`coord-icon`)}<span>${F(e)}</span></li>`).join(``)}</ul>`:``}
    </li>
  `}function kf(){if(!B)return``;let e=I(Eu);if(!e)return`<p class="coord-meta">Escribí el nombre del perro. Se agrega a la hora de arriba.</p>`;let t=new Set(B.paradas.map(e=>Al(e)?.id).filter(Boolean)),n=S.filter(t=>I(t.name).includes(e)).slice(0,6),r=S.some(t=>I(t.name)===e),i=Sl(Du)?Cl(Du):yu(B);return`
    <ul class="coord-results">
      ${n.map(e=>`
        <li>
          <button type="button" class="coord-result" id="coord-add-${e.id}" data-coord-add-dog="${e.id}">
            ${g(`plus`,`coord-icon`)}
            <span><b>${F(e.name)}</b> <small>${F(e.size)} · ${F(ml(e))}</small></span>
            ${e.status===`Activo`?``:U(F(e.status),`alert`)}
            ${t.has(e.id)?U(`Ya está en la ruta`,`warn`):``}
            <span class="coord-result-hora">${i}</span>
          </button>
        </li>`).join(``)}
      ${!r&&Eu.trim().length>=2?`
        <li>
          <button type="button" class="coord-result is-free" id="coord-add-libre" data-coord-add-libre>
            ${g(`plus`,`coord-icon`)}<span>Agregar «${F(Eu.trim())}» (perro sin ficha)</span><span class="coord-result-hora">${i}</span>
          </button>
        </li>`:``}
    </ul>
    ${n.length?``:`<p class="coord-meta">No hay perros con ese nombre en el registro.</p>`}
  `}function Af(){let e=B,t=Bu(),n=e.solicitudId?qu().find(t=>t.id===e.solicitudId):null,r=e.modo===`plantilla`,i=r?ll(e.dia):[],a=Sl(Du)?Cl(Du):yu(e);return`
    <div class="coord-editor ${r?`is-plantilla`:`is-dia`}" id="coord-editor" tabindex="-1" aria-labelledby="coord-editor-title">
      <div class="coord-editor-mode" role="note">
        ${g(r?`calendarCheck`:`alertTriangle`,`coord-icon`)}
        <div>
          <p class="coord-editor-kicker">${r?`Estás editando la SEMANA`:`Estás editando SOLO UN DÍA`}</p>
          <h3 id="coord-editor-title">${F(e.ruta)} · ${r?`${F(e.dia)} · ${F(e.turno)}`:`${F(sl(e.fecha))} · ${F(e.turno)}`}</h3>
          <p>${r?`Se repite todos los ${F(e.dia.toLowerCase())}. Si es algo de un solo día, usá «Guardar solo para un día».`:`La semana no cambia. Este cambio manda sobre la semana solo ese día.`}${e.nuevo?` Ruta nueva.`:``}</p>
        </div>
      </div>

      ${n?`
        <div class="coord-editor-sol" role="note">
          <p><b>Pedido de ${F(n.creadoPorNombre||`supervisión`)}:</b> ${F(n.titulo||n.tipo||``)}${n.detalle?` · ${F(n.detalle)}`:``}${n.motivo?` · Motivo: ${F(n.motivo)}`:``}</p>
          ${e.precarga?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>${F(e.precarga)}</span></p>`:``}
          <div class="coord-field is-wide">
            <label for="coord-ed-respuesta">Respuesta para el supervisor (opcional)</label>
            <input id="coord-ed-respuesta" type="text" value="${F(e.respuesta)}" data-coord-ed-field="respuesta" placeholder="Ej.: Listo, ya lo saqué de la ruta." autocomplete="off" />
          </div>
        </div>`:``}

      ${nf(`editor`)}

      <div class="coord-grid coord-editor-team">
        ${e.nuevo?`
          <div class="coord-field">
            <label for="coord-ed-ruta">Código de la ruta</label>
            <input id="coord-ed-ruta" type="text" value="${F(e.ruta)}" data-coord-ed-field="ruta" autocomplete="off" aria-describedby="coord-ed-ruta-hint" />
            <small id="coord-ed-ruta-hint">Ej.: PJ_2M (mañana) o PJ_3T (tarde).</small>
          </div>`:``}
        <div class="coord-field">
          <label for="coord-ed-paseador">Paseador</label>
          <input id="coord-ed-paseador" type="text" list="coord-team-users" value="${F(e.paseador)}" data-coord-ed-field="paseador" autocomplete="off" aria-describedby="coord-ed-paseador-hint" />
          <small id="coord-ed-paseador-hint">Usuario de la app (ej.: sebastian).</small>
        </div>
        <div class="coord-field">
          <label for="coord-ed-ayudante">Ayudante</label>
          <input id="coord-ed-ayudante" type="text" list="coord-team-users" value="${F(e.ayudante)}" data-coord-ed-field="ayudante" autocomplete="off" placeholder="Sin ayudante" />
        </div>
        <div class="coord-field">
          <label for="coord-ed-supervisor">Supervisa</label>
          <input id="coord-ed-supervisor" type="text" list="coord-team-names" value="${F(e.supervisor)}" data-coord-ed-field="supervisor" autocomplete="off" />
        </div>
      </div>

      <div class="coord-add" role="group" aria-labelledby="coord-add-title">
        <h4 id="coord-add-title">${g(`plus`,`coord-icon`)}<span>Agregar un perro</span></h4>
        <div class="coord-add-row">
          <div class="coord-field coord-add-search">
            <label for="coord-ed-buscar">Buscar perro</label>
            <input id="coord-ed-buscar" type="search" value="${F(Eu)}" data-coord-ed-search autocomplete="off" placeholder="Nombre del perro" aria-controls="coord-ed-results" />
          </div>
          <div class="coord-field coord-add-hora">
            <label for="coord-ed-nueva-hora">Hora de retiro</label>
            <input id="coord-ed-nueva-hora" type="time" step="300" value="${F(a)}" data-coord-ed-hora aria-describedby="coord-ed-nueva-hora-hint" />
            <small id="coord-ed-nueva-hora-hint">Sugerida: la última + 15 min.</small>
          </div>
        </div>
        <div id="coord-ed-results" aria-live="polite">${kf()}</div>
      </div>

      <div class="coord-stops-head">
        <h4>Paradas en orden <span>${e.paradas.length}</span></h4>
        ${e.paradas.length>1?H(`Ordenar por hora`,`id="coord-ed-sort" data-coord-ed-sort`,`ghost`,`clock`):``}
      </div>
      ${e.paradas.length?`<ol class="coord-stops">${e.paradas.map((e,n)=>Of(e,n,t)).join(``)}</ol>`:`<p class="coord-empty is-small">La ruta no tiene perros todavía. Buscalos arriba.</p>`}

      ${sf(t.list,`coord-ed-warnings`)}

      <div class="coord-field is-wide">
        <label for="coord-ed-notas">Notas de la ruta</label>
        <textarea id="coord-ed-notas" rows="2" data-coord-ed-field="notas" placeholder="Ej.: arrancar por Mapuche">${F(e.notas)}</textarea>
      </div>

      <div class="coord-editor-save">
        ${r?`
          <div class="coord-save-box is-main">
            <p><b>Guardar en la semana:</b> cambia todos los ${F(e.dia.toLowerCase())}.</p>
            ${H(`Guardar en la semana`,`id="coord-ed-save" data-coord-ed-save="plantilla"`,`primary`,`checkCircle`)}
          </div>
          <div class="coord-save-box">
            <div class="coord-field">
              <label for="coord-ed-solodia">¿Es solo por un día? Elegí cuál</label>
              <select id="coord-ed-solodia" data-coord-ed-field="soloDia">
                ${i.map(t=>`<option value="${t}" ${t===e.soloDia?`selected`:``}>${F(sl(t))}${t===y()?` (hoy)`:``}${mu().some(n=>n.id===fu(t,e.ruta))?` · ya tiene un cambio: se reemplaza`:``}</option>`).join(``)}
              </select>
            </div>
            ${H(`Guardar solo para ese día`,`id="coord-ed-save-dia" data-coord-ed-save="dia"`,`secondary`)}
          </div>`:`
          <div class="coord-save-box is-main">
            <p><b>Guardar solo para el ${F(sl(e.fecha).toLowerCase())}.</b>${n?` El pedido del supervisor queda como aplicado.`:``}</p>
            ${H(`Guardar solo para el ${F(nl(e.fecha))}`,`id="coord-ed-save" data-coord-ed-save="dia"`,`primary`,`checkCircle`)}
          </div>
          ${e.existeDia&&Kl(e.existeDia)?`
            <div class="coord-save-box">
              <p>¿Ese día tiene que quedar igual que la semana?</p>
              ${H(`Volver a la ruta de la semana`,`id="coord-ed-revert" data-coord-ed-revert`,`ghost`)}
            </div>`:``}`}
      </div>

      ${Ou===`salir`?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-salir-q">
          <p id="coord-salir-q"><b>Tenés cambios sin guardar.</b> ¿Salir igual y descartarlos?</p>
          <div class="coord-actions">
            ${H(`Sí, descartar`,`id="coord-ed-close-ok" data-coord-ed-close-ok`,`primary`)}
            ${H(`Seguir editando`,`id="coord-ed-close-cancel" data-coord-ed-close-cancel`,`ghost`)}
          </div>
        </div>`:``}

      <div class="coord-actions coord-editor-foot">
        ${H(`Copiar para WhatsApp`,`id="coord-ed-copy" data-coord-ed-copy`,`ghost`,`copy`)}
        ${H(e.sucio?`Cerrar sin guardar`:`Volver`,`id="coord-ed-close" data-coord-ed-close`,`ghost`,`x`)}
      </div>
    </div>
  `}function jf(){let e=qu(),t=Ju(),n=e.filter(e=>(e.estado||`pendiente`)!==`pendiente`),r=`
    <p class="coord-note">${g(`users`,`coord-icon`)}<span>El supervisor mira las rutas y, si habló con alguien o pasó algo, te pide el cambio. Vos lo aplicás o lo rechazás con una respuesta: la ve el supervisor.</span></p>
    ${nf(`solicitudesTodas`)}
    <h3 class="coord-subtitle">Pendientes <span>${t.length}</span></h3>
    ${t.length?`<ul class="coord-sol-list">${t.map(e=>yf(e)).join(``)}</ul>`:`<p class="coord-empty is-small">${R.has(`solicitudes`)?`No hay pedidos pendientes.`:`Cargando…`}</p>`}
    ${n.length?`
      <details class="coord-more" ${hl(`solHist`)?`open`:``}>
        <summary data-coord-toggle="solHist">Respondidos en las últimas 2 semanas (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-sol-list">${n.map(e=>yf(e,{compact:!0})).join(``)}</ul>
      </details>`:``}
  `;return rf({key:`solicitudes`,id:`coord-solicitudes`,iconName:`bell`,title:`Pedidos de cambio del supervisor`,intro:`Aplicalos en la ruta del día o respondé por qué no.`,badges:t.length?U(`${t.length} ${t.length===1?`pendiente`:`pendientes`}`,`alert`):U(`Al día`,`neutral`),body:r})}function Mf(e){return(Array.isArray(e)?e:[]).map(e=>Dl.get(e)?.name||e)}function Nf(e){let t=F(e.id),n=Qu.find(([t])=>t===e.estado)||Qu[0],r=Mf(e.perros);return`
    <li class="coord-card coord-cliente is-${F(n[0])}">
      <div class="coord-card-head">
        <strong>${F(e.nombre||`Pendiente de confirmar`)}</strong>
        ${U(n[1],n[0]===`activo`?`ok`:n[0]===`pausa`?`warn`:`neutral`)}
      </div>
      ${of([[`Perros`,r.length?dl(r):b],[`Barrio`,e.barrio],[`Plan`,e.plan&&e.plan!==`Pendiente de confirmar`?e.plan:``],[`Días`,Array.isArray(e.dias)&&e.dias.length?pl(e.dias):``],[`Turno`,e.turno&&e.turno!==`Pendiente de confirmar`?e.turno:``],[`Teléfono`,e.telefono],[`Notas`,e.notas]],`is-compact`)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      <div class="coord-actions">
        ${Sd(e.telefono,`Hola ${e.nombre||``}, te escribo de Paseos Juan.`.replace(` ,`,`,`),`secondary`,`WhatsApp`)}
        ${H(`Editar`,`id="coord-cli-edit-${t}" data-coord-cliente-edit="${t}"`,`ghost`,`sliders`)}
      </div>
      ${pf(e)}
    </li>
  `}function Pf(){let e=I(nd),t=rd();return e?t.filter(t=>I([t.nombre,t.barrio,t.telefono,t.notas,...Mf(t.perros)].join(` `)).includes(e)):t}function Ff(){let e=Pf();return e.length?`<ul class="coord-card-list is-grid">${e.map(Nf).join(``)}</ul>`:`<p class="coord-empty is-small">${R.has(`clientes`)?nd?`Ningún cliente coincide con la búsqueda.`:`Todavía no hay clientes cargados.`:`Cargando clientes…`}</p>`}function If(){let e=rd(),t=Jd(`cliente`),n=!!t.id,r=Array.isArray(t.perros)?t.perros:[],i=Array.isArray(t.dias)?t.dias:[],a=(Array.isArray(t.archivos)?t.archivos:[]).map(e=>Ad(e)||{id:e,tipo:Td}),o=e.filter(e=>(e.estado||`activo`)===`activo`).length,s=S.slice().sort((e,t)=>e.name.localeCompare(t.name,`es`)),c=`
    ${nf(`clientes`)}
    <div class="coord-field coord-search">
      <label for="coord-clientes-buscar">Buscar cliente</label>
      <input id="coord-clientes-buscar" type="search" value="${F(nd)}" data-coord-clientes-buscar placeholder="Tutor, perro o barrio" autocomplete="off" aria-controls="coord-clientes-lista" />
    </div>
    <div id="coord-clientes-lista" aria-live="polite">${Ff()}</div>

    <form class="coord-form" id="coord-cliente-form" data-coord-form="cliente" novalidate tabindex="-1">
      <h3>${n?`Editando a ${F(t.nombre||`un cliente`)}`:`Cargar un cliente`}</h3>
      ${t.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Completado con los datos de un pedido. Revisalo antes de guardar.</span></p>`:``}
      ${!n&&a.length?`<p class="coord-done">${g(`fileCheck`,`coord-icon`)}<span>${a.some(jd)?`El carnet de vacunas del pedido queda vinculado a este cliente.`:`Los archivos del pedido quedan vinculados a este cliente.`}</span></p>`:``}
      <input type="hidden" name="id" value="${F(t.id||``)}" />
      <input type="hidden" name="pedidoId" value="${F(t.pedidoId||``)}" />
      <div class="coord-grid">
        ${Qd(`cliente`,`nombre`,`Nombre del tutor`,{value:t.nombre,required:!0,attrs:`autocomplete="off"`})}
        ${Qd(`cliente`,`telefono`,`Teléfono`,{value:t.telefono,type:`tel`,attrs:`autocomplete="off" inputmode="tel"`,hint:`Celular con código de área (ej.: 11\xA01234‑5678).`})}
        ${Qd(`cliente`,`barrio`,`Barrio`,{value:t.barrio,attrs:`list="coord-barrios" autocomplete="off"`,hint:`Elegí uno o escribí otro.`})}
        ${$d(`cliente`,`plan`,`Plan`,$u,{value:t.plan||`Pendiente de confirmar`})}
        ${$d(`cliente`,`turno`,`Turno`,ed,{value:t.turno||`Pendiente de confirmar`})}
        ${$d(`cliente`,`estado`,`Estado`,Qu,{value:t.estado||`activo`})}
        <div class="coord-field is-wide">
          <span class="coord-label" id="coord-cliente-perros-label">Perros${r.length?` (${r.length})`:``}</span>
          <input id="coord-cliente-perros-buscar" type="search" data-coord-filter-perros placeholder="Filtrar perros" autocomplete="off" aria-label="Filtrar la lista de perros" />
          <div class="coord-checks" role="group" aria-labelledby="coord-cliente-perros-label">
            ${s.map(e=>`<label class="coord-check" data-name="${F(I(e.name))}"><input type="checkbox" id="coord-cliente-perro-${e.id}" name="perros" value="${e.id}" ${r.includes(e.id)?`checked`:``} /><span>${F(e.name)} <small>${F(e.size)}</small></span></label>`).join(``)}
          </div>
          <small>Si el perro todavía no está en el registro, anotalo en notas y cargá su ficha en «Alta de perro nuevo».</small>
        </div>
        ${tf(`cliente`,i)}
        ${ef(`cliente`,`notas`,`Notas`,{value:t.notas,hint:`Lo operativo: llaves, portería, horarios. Sin datos de salud ni de pago.`})}
      </div>
      <datalist id="coord-barrios">${cd().map(e=>`<option value="${F(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">
        ${H(n?`Guardar cambios`:`Guardar cliente`,`id="coord-cliente-save" data-coord-cliente-save`,`primary`,`plus`)}
        ${n||t.pedidoId?H(`Cancelar`,`data-coord-cliente-cancel`,`ghost`):``}
      </div>
    </form>
  `;return rf({key:`clientes`,id:`coord-clientes`,iconName:`users`,title:`Clientes`,intro:`Tutores, sus perros, plan, días y turno. Solo lo ven Juan y coordinación.`,badges:e.length?U(`${o} ${o===1?`activo`:`activos`}`,`neutral`):``,body:c})}function Lf(){let e=Jd(`aviso`),t=y(),n=id(),r=n.filter(e=>ad(e,t)),i=n.filter(e=>!ad(e,t)).slice(0,20),a=`
    ${nf(`avisos`)}
    <form class="coord-form" data-coord-form="aviso" novalidate>
      <h3>Cargar un aviso</h3>
      <div class="coord-grid">
        ${Qd(`aviso`,`barrio`,`Barrio`,{value:e.barrio,required:!0,attrs:`list="coord-barrios-aviso" autocomplete="off"`})}
        ${$d(`aviso`,`tipo`,`Tipo`,td,{value:e.tipo||td[0]})}
        ${Qd(`aviso`,`vigenteHasta`,`Vigente hasta`,{value:e.vigenteHasta||t,type:`date`,attrs:`min="${t}"`})}
        ${ef(`aviso`,`mensaje`,`Qué pasa`,{value:e.mensaje,required:!0,placeholder:`Ej.: Corte de calle en la entrada principal. Entrar por la puerta 2.`})}
      </div>
      <datalist id="coord-barrios-aviso">${cd().map(e=>`<option value="${F(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${H(`Guardar aviso`,`id="coord-aviso-save" data-coord-aviso-save`,`primary`,`plus`)}</div>
    </form>
    <div class="coord-subblock">
      <h3>Vigentes <span>${r.length}</span></h3>
      ${r.length?`<p class="coord-meta">Están arriba, agrupados por barrio.</p>`:`<p class="coord-empty is-small">${R.has(`avisos`)?`No hay avisos vigentes.`:`Cargando…`}</p>`}
    </div>
    ${i.length?`
      <details class="coord-more" ${hl(`avisosViejos`)?`open`:``}>
        <summary data-coord-toggle="avisosViejos">Avisos vencidos (${i.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-aviso-list">${i.map(e=>xf(e,{history:!0})).join(``)}</ul>
      </details>`:``}
  `;return rf({key:`avisos`,id:`coord-avisos`,iconName:`mapPin`,title:`Avisos por barrio`,intro:`Obras, cortes, perros sueltos, clima o seguridad. Los ve todo el equipo.`,badges:r.length?U(`${r.length} ${r.length===1?`vigente`:`vigentes`}`,`warn`):``,body:a})}function Rf(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return of([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function zf(e,t,n){let r=md(e),i=e.origen===`web`,a=e.datos||{},o=F(e.id),s=t.get(e.id),c=n.get(e.id),l={nuevo:H(`Empezar`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)+H(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`ghost`),"en-curso":H(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`secondary`)+H(`Volver a nuevo`,`data-coord-pedido-move="${o}" data-estado="nuevo"`,`ghost`),resuelto:H(`Reabrir`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)}[r],u=`pedido-${e.id}`,d=r!==`resuelto`||_l.has(u),f=(i||/evaluaci/i.test(e.tipo||``))&&!s&&r!==`resuelto`,p=i?r===`resuelto`?`<details class="coord-card-more" ${d?`open`:``}><summary data-coord-mem-toggle="${F(u)}">Ver datos del formulario ${g(`chevronDown`,`coord-icon`)}</summary>${Rf(e)}</details>`:Rf(e):`<p class="coord-card-dog">${g(`pawPrint`,`coord-icon`)}${F(vd(e)||`Pendiente de confirmar`)}</p>${e.detalle?`<p>${F(e.detalle)}</p>`:``}`,m=a.responsable?`Hola ${a.responsable}`:`Hola`,h=Id(e).some(jd)?``:` Cuando puedas, mandanos una foto del carnet de vacunas.`;return`
    <li class="coord-card ${i?`is-web`:``}" id="coord-pedido-${o}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${F(i?a.perro||`Pendiente de confirmar`:e.tipo||`Pedido`)}</strong>
        <small>${i?F(e.tipo||`Formulario web`):`${F(nl(e.fecha))}${a.canal?` · ${F(a.canal)}`:``}`}</small>
      </div>
      ${i?`<p class="coord-badges">${U(`Formulario web`,`warn`)}</p>`:``}
      ${p}
      ${uf(e)}
      ${ql(e,{web:i})}
      ${s?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Ficha creada para ${F(s.perroNombre)}</span></p>`:``}
      ${c?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Cliente cargado: ${F(c.nombre)}</span></p>`:``}
      <div class="coord-actions">
        ${r!==`resuelto`&&i?Sd(a.telefono,`${m}, te escribo de Paseos Juan por el pedido de evaluación de ${a.perro||`tu perro`}.${h}`,`primary`):``}
        ${l}
        ${!c&&(i||a.responsable)?H(`Convertir en cliente`,`data-coord-pedido-cliente="${o}"`,`ghost`,`userPlus`):``}
        ${f?H(`Armar ficha con estos datos`,`data-coord-pedido-ficha="${o}"`,`ghost`,`fileText`):``}
        ${r===`resuelto`&&Kl(e)?H(`Borrar`,`data-coord-pedido-delete="${o}"`,`ghost`):``}
      </div>
    </li>
  `}function Bf(){let e=hd(),t=Jd(`pedido`),n=e.filter(e=>md(e)!==`resuelto`).length,r=yd(e).length,i=new Map(gd().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),a=new Map(rd().filter(e=>e.pedidoId).map(e=>[e.pedidoId,e])),o=!R.has(`pedidos`)&&!e.length,s=`
    ${nf(`pedidos`)}
    <div class="coord-board">
      ${fd.map(([t,n])=>{let r=e.filter(e=>md(e)===t);return t===`nuevo`&&r.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`)),`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(e=>zf(e,i,a)).join(``)}</ul>`:`<p class="coord-empty is-small">${o?`Cargando…`:t===`nuevo`?`Sin pedidos nuevos.`:t===`en-curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${$d(`pedido`,`tipo`,`Tipo de pedido`,ud,{value:t.tipo})}
        ${Qd(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${$d(`pedido`,`canal`,`Llegó por`,dd,{value:t.canal})}
        ${ef(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${S.map(e=>`<option value="${F(e.name)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${H(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>
  `;return rf({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Los del formulario de la web y los que cargás vos.`,badges:`${r?U(`${r} ${r===1?`nuevo`:`nuevos`} de la web`,`alert`):``}${n?U(`${n} ${n===1?`abierto`:`abiertos`}`,`warn`):U(`Sin pedidos abiertos`,`neutral`)}`,body:s,open:r>0})}function Vf(e){let t=e.datos||{},n=Ol.get(I(t.perro));return{pedidoId:e.id,nombre:t.responsable||``,telefono:t.telefono||``,barrio:[t.zona,t.referencia].filter(Boolean).join(` · `),perros:n?[n.id]:[],plan:b,dias:wd(t.dias),turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,estado:`activo`,archivos:Id(e).map(e=>e.id),notas:[`Desde el pedido del ${nl(e.fecha)}.`,!n&&t.perro?`Perro: ${t.perro} (todavía sin ficha en el registro).`:``].filter(Boolean).join(` `)}}function Hf(e,t){let n=t?t.actualizadoPorNombre||t.creadoPorNombre:``;return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${F(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?U(`Activo`,`neutral`):U(F(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${F(e.plan)} · ${F(e.size)} · ${F(ml(e))}</p>
      <p class="coord-badges">${cf(e)}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${F(e.review||`Estado "${e.status}".`)}</p>
      ${af(e)}
      ${t?.nota?`<p class="coord-meta">${F(t.nota)}</p>`:``}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Resuelto${n?` por ${F(n)}`:``}${t.actualizadoEn?` el ${rl(t.actualizadoEn)}`:``}${t.pendiente?` (sin señal: se enviará cuando vuelva)`:``}</span></p>${H(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:H(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function Uf(){let e=_d(),t=kl.filter(t=>!e[t.id]),n=kl.filter(t=>e[t.id]),r=`
    <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
    ${nf(`datos`)}
    ${t.length?`<ul class="coord-review-list">${t.map(e=>Hf(e)).join(``)}</ul>`:`<p class="coord-empty">${g(`checkCircle`,`coord-icon`)}No quedan datos por confirmar.</p>`}
    ${n.length?`
      <details class="coord-more" ${hl(`datosResueltos`)?`open`:``}>
        <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-review-list">${n.map(t=>Hf(t,e[t.id])).join(``)}</ul>
      </details>`:``}
    <p class="coord-note">${g(`fileText`,`coord-icon`)}<span>El cambio todavía debe incorporarse al ${F(Gt.officialSources.dogs.toLowerCase())}.</span></p>
    ${Wf()}
  `;return rf({key:`datos`,id:`coord-datos`,iconName:`help`,title:`Datos a confirmar`,intro:`${n.length} de ${kl.length} resueltos.`,badges:t.length?U(`${t.length} ${t.length===1?`pendiente`:`pendientes`}`,`warn`):U(`Todo confirmado`,`ok`),body:r})}function Wf(){let e=S.filter(e=>e.status===`Activo`),t=e.filter(e=>!Bd(e)).sort((e,t)=>e.name.localeCompare(t.name,`es`)),n=R.has(`archivos`)&&R.has(`clientes`);return`
    <div class="coord-subblock" id="coord-sin-carnet">
      <h3>Carnet de vacunas <span>${e.length-t.length} de ${e.length}</span></h3>
      <p class="coord-meta">${n?t.length?`${t.length} ${t.length===1?`perro activo no tiene`:`perros activos no tienen`} el carnet cargado. Se sube desde la ficha del cliente (sección Clientes).`:`Todos los perros activos tienen el carnet cargado.`:`Cargando carnets…`}</p>
      ${t.length&&n?`
        <details class="coord-more" ${hl(`sinCarnet`)?`open`:``}>
          <summary data-coord-toggle="sinCarnet">Perros sin carnet (${t.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-nocarnet">${t.map(e=>`<li><b>${F(e.name)}</b> <small>${F(ml(e))}</small></li>`).join(``)}</ul>
        </details>`:``}
    </div>
  `}var Gf=[b,`Sí`,`No`],Kf=null,qf=null,Jf=!1,Yf=!1;function Xf(e){let t=e.pedidoId?W(hd(),e.pedidoId):null,n=t?Id(t).filter(jd):[],r=`coord-alta-carnet-hint`,i=`Opcional. Se sube al guardar la ficha (hace falta señal). Foto clara o PDF, hasta 3,5 MB.`;return qf?i=`Carnet ya subido (${F(qf.nombreArchivo||`archivo`)}): queda vinculado al guardar la ficha.`:Kf&&(i=`Elegiste <b>${F(Kf.name)}</b> (${Nd(Kf.size)}). Se sube al guardar la ficha.`),`
    <div class="coord-field is-wide">
      <span class="coord-label">Carnet de vacunas</span>
      ${n.map(e=>`
        <p class="coord-attach-row">
          ${g(`fileCheck`,`coord-icon`)}
          <span><b>El pedido web ya trae el carnet</b><small>Queda vinculado a esta ficha.</small></span>
          ${H(`Ver carnet<span class="coord-sr-only"> (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${F(e.id)}" data-scope="alta"`,`secondary`,`eye`)}
        </p>`).join(``)}
      ${qf?``:df(`coord-alta-carnet`,Kf?`Cambiar el archivo`:n.length?`Adjuntar otro carnet`:`Adjuntar foto o PDF del carnet`,`data-coord-alta-carnet`,r)}
      <small id="${r}">${i}</small>
      ${Kf&&Pd()?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>Sin señal: el carnet no se puede subir ahora. Esperá a tener señal o quitalo para guardar la ficha sin él.</span></p>`:``}
      ${Kf||qf?`<div class="coord-actions">${H(`Quitar el carnet`,`id="coord-alta-carnet-quitar" data-coord-alta-carnet-quitar`,`ghost`,`x`)}</div>`:``}
      ${Ud(`alta`)}
    </div>
  `}function Zf(){let e=Jd(`alta`),t=gd(),n=Array.isArray(e.dias)?e.dias:[],r=[b,...Yt.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${g(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${nf(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${e.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>`:``}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${Qd(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${$d(`alta`,`tamano`,`Tamaño`,[b,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${Qd(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${Qd(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${$d(`alta`,`sexo`,`Sexo`,[b,`Macho`,`Hembra`],{value:e.sexo})}
          ${$d(`alta`,`castrado`,`Castrado o castrada`,Gf,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${Qd(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${Qd(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${Qd(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${$d(`alta`,`zona`,`Zona`,[b,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${Qd(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${$d(`alta`,`vacunas`,`Vacunas al día`,Gf,{value:e.vacunas})}
          ${Qd(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${Xf(e)}
          ${ef(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${$d(`alta`,`sujecion`,`Collar o pechera`,[b,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${$d(`alta`,`bozal`,`Usa bozal`,Gf,{value:e.bozal})}
          ${$d(`alta`,`correa`,`Tiene correa propia`,Gf,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${e.relatoTutor?ef(`alta`,`relatoTutor`,`Lo que contó el tutor en el formulario (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${ef(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,span:!1})}
          ${ef(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${ef(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${Qd(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${$d(`alta`,`plan`,`Plan pedido`,r,{value:e.plan})}
          ${$d(`alta`,`turno`,`Turno`,[b,`Mañana`,`Tarde`],{value:e.turno})}
          ${tf(`alta`,n)}
        </div>
      </fieldset>
      ${Jf?`<p class="coord-upload-status" role="status">${g(`clock`,`coord-icon`)}<span>Subiendo el carnet… No cierres la página.</span></p>`:``}
      ${Yf?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-alta-vaciar-q">
          <p id="coord-alta-vaciar-q"><b>¿Vaciar el formulario?</b> Se borra todo lo que escribiste en esta ficha.</p>
          <div class="coord-actions">
            ${H(`Sí, vaciar`,`id="coord-alta-vaciar-ok" data-coord-alta-clear-ok`,`primary`)}
            ${H(`No, seguir`,`id="coord-alta-vaciar-cancel" data-coord-alta-clear-cancel`,`ghost`)}
          </div>
        </div>`:`
        <div class="coord-actions">
          ${H(Jf?`Guardando…`:`Guardar ficha`,`id="coord-alta-save" data-coord-alta-save ${Jf?`aria-disabled="true"`:``}`,`primary`,`plus`)}
          ${H(`Vaciar formulario`,`id="coord-alta-clear" data-coord-alta-clear`,`ghost`)}
        </div>`}
    </form>
    <div class="coord-subblock">
      <h3>Fichas cargadas <span>${t.length}</span></h3>
      ${t.length?`
        <ul class="coord-card-list is-grid">
          ${t.map(e=>{let t=e.datos||{},n=Array.isArray(t.dias)?t.dias:[],r=[...new Set([e.carnet?.id,...Array.isArray(e.archivos)?e.archivos:[]].filter(Boolean))].map(e=>Ad(e)).find(jd)||(e.carnet?.id?{id:e.carnet.id}:null),i=`ficha-${e.id}`;return`
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${F(e.perroNombre||t.nombre||`Pendiente de confirmar`)}</strong>
                <small>Alta ${F(nl(e.fecha))}</small>
              </div>
              <p class="coord-badges">${U(F(e.categoria||`SIN EVALUAR`),`neutral`)} ${U(`Primer paseo individual`,`warn`)}</p>
              <p>${F(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:t.tamano)} · Días: ${n.length?F(pl(n).toLowerCase()):`pendientes`} · Turno: ${F(!t.turno||t.turno===`Pendiente de confirmar`?`pendiente`:t.turno.toLowerCase())}</p>
              ${r?`<p class="coord-attach-row">${g(`fileCheck`,`coord-icon`)}<span><b>Carnet de vacunas adjunto</b></span>${H(`Ver carnet<span class="coord-sr-only"> (se abre en otra pestaña)</span>`,`data-coord-archivo-abrir="${F(r.id)}" data-scope="${F(i)}"`,`secondary`,`eye`)}</p>`:`<p class="coord-badges"><span class="coord-carnet is-missing">${g(`alertCircle`,`coord-icon`)}<span>Carnet: falta</span></span></p>`}
              ${Ud(i)}
              ${ql(e)}
              <div class="coord-actions">
                ${H(`Copiar ficha`,`data-coord-alta-copy="${F(e.id)}"`,`ghost`,`copy`)}
                ${Kl(e)?H(`Borrar`,`data-coord-alta-delete="${F(e.id)}"`,`ghost`):``}
              </div>
            </li>`}).join(``)}
        </ul>`:`<p class="coord-empty is-small">${R.has(`fichas`)?`Todavía no hay perros nuevos cargados.`:`Cargando fichas…`}</p>`}
    </div>
  `;return rf({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?U(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function Qf(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${nl(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):b}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function $f(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>I(t.zona)===I(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:b,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,dias:wd(t.dias)}}function ep(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>Dl.get(e)?.name||e);return t.length?dl(t):``}function tp(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||Gl(e,t)}function np(e,t){let n=ep(e),r=e.titulo||(t===`incidente`?`Incidente`:`Observación`),i=e.riesgo?String(e.riesgo):``,a=t===`incidente`?[[`Perro`,n],[`Lugar`,e.lugar],[`Barrio`,e.barrio],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Perro`,n],[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]];return`
    <li class="coord-card coord-feed-item ${t===`incidente`?`is-incident`:``}">
      <div class="coord-card-head">
        <strong>${F(r)}</strong>
        <small>${F(nl(e.fecha))}${e.hora?` · ${F(e.hora)}`:``}</small>
      </div>
      ${i?`<p class="coord-badges">${U(`Riesgo: ${F(i)}`,/alto|grave/i.test(i)?`alert`:`warn`)}</p>`:``}
      ${of(a)}
      ${ql(e)}
    </li>
  `}function rp(){let e=cl(6),t=Il(`incidentes`).filter(t=>!t.fecha||t.fecha>=e).sort(tp),n=Il(`observaciones`).filter(t=>!t.fecha||t.fecha>=e).sort(tp),r=`
    <p class="coord-note">${g(`eye`,`coord-icon`)}<span>Solo lectura. Las cargan los paseadores y supervisión. Últimos 7 días (desde el ${F(nl(e))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${t.length}</span></h3>
        ${t.length?`<ul class="coord-card-list">${t.map(e=>np(e,`incidente`)).join(``)}</ul>`:`<p class="coord-empty is-small">${R.has(`incidentes`)?`Sin incidentes en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${n.length}</span></h3>
        ${n.length?`<ul class="coord-card-list">${n.map(e=>np(e,`observacion`)).join(``)}</ul>`:`<p class="coord-empty is-small">${R.has(`observaciones`)?`Sin observaciones en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
    </div>
  `;return rf({key:`actividad`,id:`coord-actividad`,iconName:`activity`,title:`Observaciones e incidentes`,intro:`Lo que registró el equipo en la calle en los últimos 7 días.`,badges:`${t.length?U(`${t.length} ${t.length===1?`incidente`:`incidentes`}`,`alert`):``}${n.length?U(`${n.length} ${n.length===1?`observación`:`observaciones`}`,`neutral`):``}`,body:r})}function ip(e,t,n){gl(e,!0),$(),yl(t,n)}async function ap(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function op(e,t,n){ap(e).then(e=>{P(t,e?n:`No se pudo copiar. Probá de nuevo o copialo a mano.`,e?`ok`:`error`),z()})}function W(e,t){return e.find(e=>e.id===t)}function sp(e){ju=e,Pu(`dia`),$(),yl(`coord-rutas`)}async function cp(e){let t=Wu();if(t){P(`editor`,t[0],`error`),$(),L(t[1]);return}let n=Uu(),r=B,i;if(e===`plantilla`)i=await Yl(`plantillas`,{id:du(n.ruta,n.dia),...n},{section:`rutas`,ok:`${n.ruta} del ${n.dia.toLowerCase()} guardada en la semana. Se repite todas las semanas.`});else{let e=r.modo===`plantilla`?r.soloDia:r.fecha;if(!il(e)){P(`editor`,`Elegí el día.`,`error`),$();return}if(i=await Yl(`rutas`,{id:fu(e,n.ruta),fecha:e,...n,dia:ol(e),basadaEn:r.plantillaId||``},{section:`rutas`,ok:`${n.ruta}: cambio guardado solo para el ${sl(e).toLowerCase()}. La semana no cambió.`}),i&&r.solicitudId){let t=qu().find(e=>e.id===r.solicitudId);await Yl(`solicitudes`,{id:r.solicitudId,fecha:il(t?.fecha)?t.fecha:e,estado:`aplicado`,respuesta:r.respuesta.trim()||`Aplicado en la ruta ${n.ruta} del ${nl(e)}.`},{section:`rutas`,ok:`Cambio aplicado y pedido del supervisor marcado como aplicado.`})}i&&(ju=e,Pu(`dia`))}i&&B===r&&(Ru(),$(),yl(`coord-rutas`))}async function lp(e){let t=V,n=e.id,r=(Array.isArray(e.perros)?e.perros:[]).filter(e=>Dl.has(e)),i=(e,n,r=!1)=>{t.error=e,t.errorSenal=r,el(e),$(),L(n)};if(!t.file)return i(`Elegí la foto o el PDF.`,`coord-subida-archivo-${n}`);if(t.tipo===Td&&r.length>1&&!t.perroId)return i(`Elegí de qué perro es el carnet.`,`coord-subida-perro-${n}`);if(Pd())return i(`No se subió porque no hay señal. Tocá «Subir» de nuevo cuando vuelva.`,`coord-subida-ok-${n}`,!0);t.estado=`subiendo`,t.error=``,$c(`Subiendo el archivo.`),z();let a=Dl.get(t.perroId)||null;try{let r=await _t.subir(t.tipo,t.file,{perroId:a?.id||``,perroNombre:a?.name||``,clienteId:n,nota:t.nota.trim()}),i=W(rd(),n)||e,o=[...new Set([...Array.isArray(i.archivos)?i.archivos:[],r.id])];await v.save(`clientes`,{id:n,archivos:o}).catch(()=>{}),V===t&&(V=null);let s=r.tipo===Td?`El carnet de vacunas`:`El documento`;Hd(`cliente-${n}`,`Listo: ${s.toLowerCase()}${a?` de ${a.name}`:``} quedó guardado${r.ubicacion===`drive`?` en Drive`:``} y vinculado a ${e.nombre||`este cliente`}.`)}catch(e){t.estado=``,t.error=Fd(e,`subir`),t.errorSenal=/^Sin señal/.test(t.error),el(t.error)}finally{z(),L(V===t?`coord-subida-ok-${n}`:`coord-subir-${n}`)}}function up(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target,n=t.closest(`[data-coord-toggle]`);if(n){let e=n.parentElement;return gl(n.dataset.coordToggle,!e.open),!0}let r=t.closest(`[data-coord-mem-toggle]`);if(r){let e=r.dataset.coordMemToggle;return r.parentElement.open?_l.delete(e):_l.add(e),!0}if(t.closest(`[data-coord-retry]`))return Ul(),Ql=!1,$c(`Volviendo a pedir los datos.`),!0;let i=t.closest(`[data-coord-goto]`);if(i)return yl(i.dataset.coordGoto),!0;let a=t.closest(`[data-coord-goto-pedido]`);if(a)return ip(`pedidos`,`coord-pedido-${a.dataset.coordGotoPedido}`),!0;let o=t.closest(`[data-coord-open]`);if(o){let e=o.dataset.coordOpen,t={avisos:`#coord-aviso-barrio`,clientes:`#coord-clientes-buscar`}[e]||null;return ip(e,`coord-${e}`,t),!0}if(t.closest(`[data-coord-undo]`)){let e=Xc;if(Xc=null,e){let{pendiente:t,...n}=e.record;Zl(`undo`,()=>Yl(e.col,n,{section:e.section,ok:`Listo, se recuperó.`}))}return!0}let s=t.closest(`[data-coord-archivo-abrir]`);if(s)return Wd(s.dataset.coordArchivoAbrir,s.dataset.scope||``),!0;let c=t.closest(`[data-coord-subir]`);if(c){let e=W(rd(),c.dataset.coordSubir);if(e){if(V?.estado===`subiendo`)return el(`Esperá a que termine la subida que está en curso.`),!0;Gd(e),$(),L(`coord-subida-tipo-${e.id}`)}return!0}let l=t.closest(`[data-coord-subida-cancel]`);if(l){if(V?.estado===`subiendo`)return el(`La subida está en curso: esperá a que termine.`),!0;let e=l.dataset.coordSubidaCancel;return V=null,$(),L(`coord-subir-${e}`),!0}let u=t.closest(`[data-coord-subida-ok]`);if(u){let e=W(rd(),u.dataset.coordSubidaOk);return e&&V?.clienteId===e.id&&Zl(`subida-${e.id}`,()=>lp(e)),!0}if(t.closest(`[data-coord-filtro-carnet]`))return Mu=!Mu,$c(Mu?`Mostrando solo los perros sin carnet de vacunas.`:`Mostrando todos los perros.`),$(),L(`coord-filtro-carnet`),!0;let d=t.closest(`[data-coord-vista]`);if(d)return Pu(d.dataset.coordVista),$(),L(`coord-vista-${d.dataset.coordVista}`),!0;let f=t.closest(`[data-coord-ver-dia]`);if(f)return B?(yl(`coord-rutas`),!0):(sp(f.dataset.coordVerDia),!0);if(t.closest(`[data-coord-carga]`))return ku=!0,$(),L(`coord-carga-ok`),!0;if(t.closest(`[data-coord-carga-cancel]`))return ku=!1,$(),L(`coord-carga`),!0;if(t.closest(`[data-coord-carga-ok]`))return Zl(`carga`,async()=>{let e=dn(),t=0,n=0,r=``;for(let i of e){Au=`Guardando ${t+1} de ${e.length}…`,z();try{let e=await v.save(`plantillas`,i);t+=1,e.pendiente&&(n+=1)}catch(e){r=e.message}}ku=!1,Au=``,r?P(`rutas`,`Se guardaron ${t} de ${e.length} rutas. Error: ${r}`,`error`):P(`rutas`,`Listo: ${t} rutas cargadas en la semana.${n?` Sin señal: se envían cuando vuelva.`:``}`),Pu(`semana`),z()}),!0;let p=t.closest(`[data-coord-edit-plantilla]`);if(p){let e=W(pu(),p.dataset.coordEditPlantilla);return e&&(Lu(e,{modo:`plantilla`}),$(),yl(`coord-editor`)),!0}let m=t.closest(`[data-coord-new-route]`);if(m){let{dia:e,turno:t}=m.dataset;return Lu({ruta:zu(hu(e),t),dia:e,turno:t,paradas:[],supervisor:``},{modo:`plantilla`,nuevo:!0}),$(),yl(`coord-editor`,`#coord-ed-ruta`),!0}let h=t.closest(`[data-coord-edit-dia]`);if(h){let e=h.dataset.fecha,t=gu(e).find(e=>e.ruta===h.dataset.coordEditDia);return t&&(Lu(t,{modo:`dia`,fecha:e}),$(),yl(`coord-editor`)),!0}let ee=t.closest(`[data-coord-new-dia]`);if(ee){let{fecha:e,turno:t}=ee.dataset;return Lu({ruta:zu(gu(e),t),dia:ol(e),turno:t,paradas:[]},{modo:`dia`,fecha:e,nuevo:!0}),$(),yl(`coord-editor`,`#coord-ed-ruta`),!0}let te=t.closest(`[data-coord-copy-ruta]`);if(te){let e=te.dataset.fecha,t=gu(e).find(e=>e.ruta===te.dataset.coordCopyRuta);return t&&op(Tu(t,{fecha:e}),`rutas`,`${t.ruta} copiada. Pegala en el grupo de WhatsApp del equipo.`),!0}let ne=t.closest(`[data-coord-copy-dia]`);if(ne){let e=ne.dataset.coordCopyDia;return op(gu(e).map(t=>Tu(t,{fecha:e})).join(`

`),`rutas`,`Rutas del ${sl(e).toLowerCase()} copiadas.`),!0}if(B){let e=t.closest(`[data-coord-add-dog]`);if(e){let t=Dl.get(e.dataset.coordAddDog);return t&&(Vu(t),$c(`${t.name} agregado a las ${B.paradas[B.paradas.length-1].hora}.`),$(),L(`coord-ed-buscar`)),!0}if(t.closest(`[data-coord-add-libre]`)){let e=Eu.trim();return e&&(Vu(null,e),$c(`${e} agregado como perro sin ficha.`),$(),L(`coord-ed-buscar`)),!0}let n=t.closest(`[data-coord-stop-up]`),r=t.closest(`[data-coord-stop-down]`);if(n||r){let e=Number((n||r).dataset[n?`coordStopUp`:`coordStopDown`]),t=n?e-1:e+1;if(t>=0&&t<B.paradas.length){[B.paradas[e],B.paradas[t]]=[B.paradas[t],B.paradas[e]],B.sucio=!0,$();let r=document.getElementById(`coord-ed-${n?`up`:`down`}-${t}`);L(r&&!r.disabled?r.id:`coord-ed-hora-${t}`),$c(`${B.paradas[t].perroNombre} ahora es la parada ${t+1}.`)}return!0}let i=t.closest(`[data-coord-stop-del]`);if(i){let e=Number(i.dataset.coordStopDel),[t]=B.paradas.splice(e,1);return B.sucio=!0,$c(`${t?.perroNombre||`Perro`} quitado de la ruta.`),$(),L(B.paradas.length?`coord-ed-hora-${Math.min(e,B.paradas.length-1)}`:`coord-ed-buscar`),!0}if(t.closest(`[data-coord-ed-sort]`))return Hu(),$c(`Paradas ordenadas por hora.`),$(),L(`coord-ed-sort`),!0;let a=t.closest(`[data-coord-ed-save]`);if(a)return Zl(`editor-save`,()=>cp(a.dataset.coordEdSave)),!0;if(t.closest(`[data-coord-ed-revert]`)){let e=B.existeDia;return Zl(`editor-revert`,async()=>{await Xl(`rutas`,e,{section:`rutas`,ok:`${e.ruta} del ${nl(e.fecha)} vuelve a ser igual que la semana.`,undo:!1})&&(Ru(),z())}),!0}if(t.closest(`[data-coord-ed-copy]`))return op(Tu(Uu(),B.modo===`dia`?{fecha:B.fecha}:{}),`editor`,`Ruta copiada. Pegala en el grupo de WhatsApp del equipo.`),!0;if(t.closest(`[data-coord-ed-close]`))return B.sucio?(Ou=`salir`,$(),L(`coord-ed-close-cancel`)):(Ru(),$(),yl(`coord-rutas`)),!0;if(t.closest(`[data-coord-ed-close-ok]`))return Ru(),$(),yl(`coord-rutas`),!0;if(t.closest(`[data-coord-ed-close-cancel]`))return Ou=``,$(),L(`coord-ed-close`),!0}let re=t.closest(`[data-coord-sol-aplicar]`);if(re){let e=W(qu(),re.dataset.coordSolAplicar);return e?B?.sucio&&B.solicitudId!==e.id?(P(`editor`,`Primero guardá o cerrá la ruta que estás editando.`,`error`),$(),yl(`coord-editor`),!0):(Zu(e),$(),yl(`coord-editor`),!0):!0}let g=t.closest(`[data-coord-sol-rechazar]`);if(g)return Ku=g.dataset.coordSolRechazar,$(),L(`coord-rechazo-${Ku}`),!0;if(t.closest(`[data-coord-sol-rechazar-cancel]`)){let e=Ku;return Ku=``,$(),L(`coord-rechazar-${e}`),!0}let ie=t.closest(`[data-coord-sol-rechazar-ok]`);if(ie){let e=ie.dataset.coordSolRechazarOk,n=(document.getElementById(`coord-rechazo-${e}`)?.value||Gu[e]||``).trim(),r=t.closest(`#coord-solicitudes`)?`solicitudesTodas`:`solicitudes`;if(n.length<3)return P(r,`Escribí una respuesta corta para el supervisor.`,`error`),Gu[e]=n,$(),L(`coord-rechazo-${e}`),!0;let i=W(qu(),e);return Zl(`sol-${e}`,async()=>{await Yl(`solicitudes`,{id:e,fecha:il(i?.fecha)?i.fecha:y(),estado:`rechazado`,respuesta:n},{section:r,ok:`Pedido rechazado. El supervisor ve tu respuesta.`})&&(delete Gu[e],Ku=``)}),!0}if(t.closest(`[data-coord-cliente-save]`)){let e=Zd(t.closest(`[data-coord-form]`));if(Yd(`cliente`,e),!e.nombre?.trim())return P(`clientes`,`Falta el nombre del tutor.`,`error`),$(),L(`coord-cliente-nombre`),!0;let n={nombre:e.nombre.trim(),telefono:e.telefono?.trim()||``,barrio:e.barrio?.trim()||``,perros:Array.isArray(e.perros)?e.perros:[],plan:e.plan||`Pendiente de confirmar`,dias:Array.isArray(e.dias)?e.dias:[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas?.trim()||``};e.id&&(n.id=e.id),e.pedidoId&&(n.pedidoId=e.pedidoId);let r=e.id?W(rd(),e.id):null,i=[...new Set([...Array.isArray(r?.archivos)?r.archivos:[],...Array.isArray(e.archivos)?e.archivos:[]])];i.length&&(n.archivos=i);let a={...r?.archivosPerro||{}};return n.perros.length===1&&i.forEach(e=>{let t=Ad(e);t&&jd(t)&&!t.perroId&&!a[e]&&(a[e]=n.perros[0])}),Object.keys(a).length&&(n.archivosPerro=a),Zl(`cliente-save`,async()=>{if(await Yl(`clientes`,n,{section:`clientes`,ok:e.id?`Cambios de ${n.nombre} guardados.`:`${n.nombre} quedó cargado como cliente.`})&&(Xd(`cliente`),e.pedidoId&&!e.id)){let t=W(hd(),e.pedidoId);t&&md(t)===`nuevo`&&await v.save(`pedidos`,{id:t.id,estado:`en-curso`}).catch(()=>{})}}),!0}if(t.closest(`[data-coord-cliente-cancel]`))return Xd(`cliente`),P(`clientes`,`Formulario vacío.`),$(),L(`coord-cliente-nombre`),!0;let ae=t.closest(`[data-coord-cliente-edit]`);if(ae){let e=W(rd(),ae.dataset.coordClienteEdit);return e&&(Kd.cliente={id:e.id,pedidoId:e.pedidoId||``,nombre:e.nombre||``,telefono:e.telefono||``,barrio:e.barrio||``,perros:e.perros||[],plan:e.plan||`Pendiente de confirmar`,dias:e.dias||[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas||``,archivos:e.archivos||[]},qd.delete(`cliente`),$(),yl(`coord-cliente-form`,`#coord-cliente-nombre`)),!0}if(t.closest(`[data-coord-aviso-save]`)){let e=Zd(t.closest(`[data-coord-form]`));Yd(`aviso`,e);let n=y(),r=e.barrio?.trim()?e.mensaje?.trim()?e.vigenteHasta&&(!il(e.vigenteHasta)||e.vigenteHasta<n)?[`La fecha de «vigente hasta» tiene que ser hoy o después.`,`coord-aviso-vigenteHasta`]:null:[`Escribí qué pasa.`,`coord-aviso-mensaje`]:[`Falta el barrio.`,`coord-aviso-barrio`];if(r)return P(`avisos`,r[0],`error`),$(),L(r[1]),!0;let i=e.barrio.trim(),a=td.includes(e.tipo)?e.tipo:`otro`;return Zl(`aviso-save`,async()=>{await Yl(`avisos`,{fecha:n,barrio:i,tipo:a,mensaje:e.mensaje.trim(),vigenteHasta:e.vigenteHasta||n,titulo:`${a[0].toUpperCase()}${a.slice(1)} en ${i}`},{section:`avisos`,ok:`Aviso de ${i} guardado. Ya lo ve el equipo.`})&&Xd(`aviso`)}),!0}let oe=t.closest(`[data-coord-aviso-copy]`);if(oe){let e=W(id(),oe.dataset.coordAvisoCopy),n=t.closest(`#coord-avisos`)?`avisos`:`avisosTop`;return e&&op(ld(e),n,`Aviso copiado. Pegalo en el grupo de WhatsApp del equipo.`),!0}let se=t.closest(`[data-coord-aviso-fin]`);if(se){let e=W(id(),se.dataset.coordAvisoFin);return e&&Zl(`aviso-${e.id}`,async()=>{let t=od().length>1;await Yl(`avisos`,{id:e.id,vigenteHasta:al(y(),-1)},{section:t?`avisosTop`:`avisos`,ok:`Aviso de ${e.barrio||`barrio`} marcado como terminado.`})&&L(t?`coord-avisos-vigentes`:`coord-avisos-summary`)}),!0}let ce=t.closest(`[data-coord-resolve]`);if(ce){let e=ce.dataset.coordResolve,t=Dl.get(e);return Zl(`resuelto-${e}`,async()=>{await Yl(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{section:`datos`,ok:`${t?.name||e}: marcado como resuelto.`})&&L(`coord-dato-${e}`)}),!0}let le=t.closest(`[data-coord-unresolve]`);if(le){let e=le.dataset.coordUnresolve,t=Dl.get(e);return Zl(`resuelto-${e}`,async()=>{await Yl(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{section:`datos`,ok:`${t?.name||e}: volvió a pendientes.`})&&L(`coord-dato-${e}`)}),!0}if(t.closest(`[data-coord-pedido-save]`)){let e=Zd(t.closest(`[data-coord-form]`));if(Yd(`pedido`,e),!e.perro?.trim()&&!e.detalle?.trim())return P(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),L(`coord-pedido-perro`),!0;let n=e.tipo||ud[0],r=e.perro?.trim()||``;return Zl(`pedido-save`,async()=>{await Yl(`pedidos`,{fecha:y(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:e.detalle?.trim()||``,datos:{perro:r,canal:e.canal||dd[0]}},{section:`pedidos`,ok:`Pedido guardado en "Nuevo".`})&&Xd(`pedido`)}),!0}let ue=t.closest(`[data-coord-pedido-move]`);if(ue){let e=ue.dataset.coordPedidoMove,t=ue.dataset.estado;return Zl(`pedido-${e}`,async()=>{await Yl(`pedidos`,{id:e,estado:t},{section:`pedidos`,ok:`Pedido movido a "${pd[t]}".`})&&L(`coord-pedido-${e}`)}),!0}let de=t.closest(`[data-coord-pedido-delete]`);if(de){let e=W(hd(),de.dataset.coordPedidoDelete);return e&&Zl(`pedido-${e.id}`,async()=>{await Xl(`pedidos`,e,{section:`pedidos`,ok:`Pedido borrado.`})&&L(`coord-undo-pedidos`)}),!0}let fe=t.closest(`[data-coord-pedido-cliente]`);if(fe){let e=W(hd(),fe.dataset.coordPedidoCliente);return e&&(Kd.cliente=Vf(e),qd.delete(`cliente`),P(`clientes`,`Formulario completado con el pedido de ${e.datos?.responsable||`la web`}. Revisalo y guardalo.`),ip(`clientes`,`coord-cliente-form`,`#coord-cliente-nombre`)),!0}let pe=t.closest(`[data-coord-pedido-ficha]`);if(pe){let e=W(hd(),pe.dataset.coordPedidoFicha);return e&&(Kd.alta=$f(e),qd.delete(`alta`),P(`alta`,`Formulario completado con el pedido de ${vd(e)||`la web`}. Revisalo y guardalo.`),ip(`alta`,`coord-alta`,`#coord-alta-nombre`)),!0}if(t.closest(`[data-coord-alta-save]`)){let e=Zd(t.closest(`[data-coord-form]`));if(Yd(`alta`,e),!e.nombre?.trim())return P(`alta`,`Falta el nombre del perro.`,`error`),$(),L(`coord-alta-nombre`),!0;let n=e.nombre.trim(),{archivos:r,...i}=e,a={...i,nombre:n,dias:Array.isArray(e.dias)?e.dias:[],primerPaseo:`Individual`};return Kf&&!qf&&Pd()?(P(`alta`,`Sin señal: el carnet no se puede subir sin conexión. Esperá a tener señal o quitá el carnet para guardar la ficha ahora (después lo subís desde Clientes).`,`error`),$(),L(`coord-alta-carnet-quitar`),!0):(Zl(`alta-save`,async()=>{if(Kf&&!qf){Jf=!0,$c(`Subiendo el carnet de vacunas.`),z();try{qf=await _t.subir(Td,Kf,{perroNombre:n,pedidoId:e.pedidoId||``,nota:`Alta de perro nuevo`}),Kf=null}catch(e){P(`alta`,`No se pudo subir el carnet: ${Fd(e,`subir`)} La ficha todavía no se guardó: probá de nuevo o quitá el carnet.`,`error`);return}finally{Jf=!1,z()}}let t=[...new Set([...Array.isArray(r)?r:[],qf?.id].filter(Boolean))],i=qf?.id||t.find(e=>jd(Ad(e))),o=i?Ad(i)||qf:null,s={fecha:y(),perroNombre:n,datos:a,categoria:`SIN EVALUAR`,estado:`lista`};t.length&&(s.archivos=t),i&&(s.carnet={id:i,nombre:o?.nombreArchivo||``}),await Yl(`fichas`,s,{section:`alta`,ok:`Ficha de ${n} guardada${i?` con el carnet de vacunas`:``}. Arranca SIN EVALUAR y con primer paseo individual.`})&&(Xd(`alta`),Kf=null,qf=null)}),!0)}if(t.closest(`[data-coord-alta-clear]`))return Yf=!0,$(),L(`coord-alta-vaciar-cancel`),!0;if(t.closest(`[data-coord-alta-clear-cancel]`))return Yf=!1,$(),L(`coord-alta-clear`),!0;if(t.closest(`[data-coord-alta-clear-ok]`))return Yf=!1,Kf=null,qf=null,Xd(`alta`),P(`alta`,`Formulario vacío.`),$(),L(`coord-alta-nombre`),!0;if(t.closest(`[data-coord-alta-carnet-quitar]`))return Kf=null,qf=null,$c(`Carnet quitado de la ficha.`),$(),L(`coord-alta-carnet`),!0;let me=t.closest(`[data-coord-alta-copy]`);if(me){let e=W(gd(),me.dataset.coordAltaCopy);return e&&op(Qf(e),`alta`,`Ficha copiada. Pegala en el registro maestro.`),!0}let he=t.closest(`[data-coord-alta-delete]`);if(he){let e=W(gd(),he.dataset.coordAltaDelete);return e&&Zl(`ficha-${e.id}`,async()=>{await Xl(`fichas`,e,{section:`alta`,ok:`Ficha borrada.`})&&L(`coord-undo-alta`)}),!0}return!1}function dp(e){let t=e.target;if(t.closest?.(`.coord-shell`)){if(B){if(t.matches(`[data-coord-ed-search]`)){Eu=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=kf());return}if(t.matches(`[data-coord-ed-hora]`)){Du=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=kf());return}if(t.matches(`[data-coord-ed-field]`)){B[t.dataset.coordEdField]=t.value,B.sucio=!0;return}if(t.matches(`[data-coord-stop]`)){let e=B.paradas[Number(t.dataset.coordStop)];e&&(e[t.dataset.k]=(t.dataset.k,t.value),B.sucio=!0);return}}if(t.matches(`[data-coord-rechazo]`))Gu[t.dataset.coordRechazo]=t.value;else if(V&&t.matches(`[data-coord-subida-campo]`))V[t.dataset.coordSubidaCampo]=t.value;else if(t.matches(`[data-coord-clientes-buscar]`)){nd=t.value;let e=document.getElementById(`coord-clientes-lista`);e&&(e.innerHTML=Ff())}else if(t.matches(`[data-coord-filter-perros]`)){let e=I(t.value);t.parentElement.querySelectorAll(`.coord-check`).forEach(t=>{t.hidden=!!e&&!t.dataset.name.includes(e)&&!t.querySelector(`input`).checked})}}}function fp(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;if(t.matches(`[data-coord-rutas-fecha]`))return il(t.value)&&(ju=t.value,z()),!0;if(B&&t.matches(`[data-coord-stop]`)){let e=B.paradas[Number(t.dataset.coordStop)];return e&&(e[t.dataset.k]=t.dataset.k===`minutos`?Number(t.value)||45:t.value,B.sucio=!0,t.dataset.k!==`nota`&&z()),!0}if(B&&t.matches(`[data-coord-ed-field]`))return B[t.dataset.coordEdField]=t.value,B.sucio=!0,!0;if(t.matches(`[data-coord-ed-hora], [data-coord-ed-search], [data-coord-rechazo], [data-coord-clientes-buscar], [data-coord-filter-perros]`))return!0;if(t.matches(`[data-coord-subida-archivo]`))return V&&t.files?.[0]&&(V.file=t.files[0],V.error=``,$c(`Elegiste ${V.file.name}. Tocá «Subir» para guardarlo.`),z()),!0;if(V&&t.matches(`[data-coord-subida-campo]`))return V[t.dataset.coordSubidaCampo]=t.value,t.dataset.coordSubidaCampo!==`nota`&&(V.error=``,z()),!0;if(t.matches(`[data-coord-alta-carnet]`))return t.files?.[0]&&(Kf=t.files[0],qf=null,$c(`Elegiste ${Kf.name}. Se sube al guardar la ficha.`),z()),!0;let n=t.closest(`[data-coord-form]`);if(n){if(Yd(n.dataset.coordForm,Zd(n)),n.dataset.coordForm===`cliente`&&t.name===`perros`){let e=document.getElementById(`coord-cliente-perros-label`),t=(Kd.cliente.perros||[]).length;e&&(e.textContent=`Perros${t?` (${t})`:``}`)}return!0}return!1}function pp(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`[data-coord-cliente-save], [data-coord-aviso-save], [data-coord-pedido-save], [data-coord-alta-save]`)?.click())}function mp(e){e.key===`Enter`&&e.target.matches?.(`.coord-shell [data-coord-ed-search]`)&&(e.preventDefault(),document.querySelector(`#coord-ed-results .coord-result`)?.click())}function hp(){_e.push(up),ve.push(fp),document.addEventListener(`input`,dp),document.addEventListener(`submit`,pp),document.addEventListener(`keydown`,mp)}var gp=`paseosJuanAdmin_prioridadesHechas`,_p=`paseosJuanAdmin_seccionesAbiertas`,vp=`America/Argentina/Buenos_Aires`,yp=[`Pequeño`,`Mediano`,`Grande`],bp=x.manana.label,xp=x.tarde.label,Sp=[`paseos`,`incidentes`,`checklists`,`pedidos`,`rutas`,`plantillas`,`avisos`],Cp=[`pagos`,`clientes`,`archivos`],wp=10,Tp=[`Efectivo`,`Transferencia`,`Naranja X`],Ep=`Libro contable del Sistema de Gestión`,Dp={"carnet de vacunas":{label:`Carnet de vacunas`,tone:`ok`},"comprobante de pago":{label:`Comprobante de pago`,tone:`info`},documento:{label:`Documento`,tone:`neutral`},foto:{label:`Foto`,tone:`neutral`}},Op=`image/jpeg,image/png,image/webp,application/pdf`,kp=/^(image\/(jpeg|png|webp)|application\/pdf)$/,Ap=864e5,jp=20,Mp=``,G={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,adminLoaded:!1,adminError:``,pagosMes:null,archivosTipo:`todos`,savingPago:!1,lateSignature:``,msgs:{users:null,live:null,pagos:null,archivos:null}},Np=()=>({fecha:y(),concepto:``,monto:``,medio:``,pasadoAlLibro:!1}),K={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{},pago:Np(),pagoArchivo:null,pagoSubido:null};function q(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function J(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Y(e,t,n){return`${e} ${e===1?t:n}`}var Pp={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Fp(e){let t=Jt.filter(t=>e.includes(t)),n=t.map(e=>Jt.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${Pp[t[0]]} a ${Pp[t[t.length-1]]}`:t.map(e=>Pp[e]).join(`, `)}function Ip(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:vp,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:Jt.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function Lp(){return ae(gp)}function Rp(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function zp(){return new Set(ae(_p))}function Bp(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:vp,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function Vp(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:vp,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function Hp(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function Up(e){let t=Number(e);return!Number.isFinite(t)||t<=0?``:t<1048576?`${Math.max(1,Math.round(t/1024))} KB`:`${(t/1048576).toFixed(1).replace(`.`,`,`)} MB`}function Wp(e,t){return String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))}function Gp(){return navigator.onLine===!1}function Kp(){return _.user()||{usuario:``,nombre:``,rol:`admin`}}function qp(e){return String(e||``).trim().split(/\s+/)[0]||``}function Jp(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function X(e,t){return[`pedidos`,`plantillas`,`avisos`,...Cp].includes(e)?{}:{desde:t}}function Yp(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function Xp(e){return e.hora||Bp(e.creadoEn)}function Zp(e=new Date){let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:vp,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),n=e=>Number(t.find(t=>t.type===e)?.value||0);return n(`hour`)%24*60+n(`minute`)}function Qp(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}var $p=810;function em(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``)}function tm(e,t){let n=v.cached(`rutas`,X(`rutas`,e)).filter(t=>t.fecha===e),r=v.cached(`plantillas`,X(`plantillas`,e)).filter(e=>em(e.dia)===em(t)),i=!r.length,a=i?dn().filter(e=>em(e.dia)===em(t)):r,o=new Map;a.forEach(e=>o.set(e.ruta||e.id,{...e,fuente:i?`planilla`:`plantilla`})),n.forEach(e=>o.set(e.ruta||String(e.id).slice(11),{...e,fuente:`dia`}));let s=e=>(e.paradas||[]).map(e=>e.hora||`99:99`).sort()[0]||`99:99`,c=[...o.values()].sort((e,t)=>s(e).localeCompare(s(t))||String(e.ruta).localeCompare(String(t.ruta)));return{list:c,fromSheet:c.some(e=>e.fuente===`planilla`)}}function nm(e,t,n){let r=(e,t)=>e.perroId&&t.perroId?e.perroId===t.perroId:em(e.perroNombre)&&em(e.perroNombre)===em(t.perroNombre),i=t=>e.reduce((e,n)=>e+(n.paradas||[]).filter(e=>r(t,e)).length,0);return e.map(e=>{let a=Yp({turno:e.turno}),o=(e.paradas||[]).map(e=>{let o=t.filter(t=>r(e,t)),s=o.find(e=>Yp(e)===a)||(o.length===1&&i(e)===1?o[0]:null),c=s?.estado||`pendiente`,l=Qp(e.hora),u=`a-tiempo`;return c===`entregado`?u=`entregado`:c===`no-sale`?u=`no-sale`:c===`pendiente`&&l!==null&&n>l+wp&&(u=`atrasado`),{...e,paseo:s,estado:c,status:u,prevista:l,atraso:u===`atrasado`?n-l:0}}),s=e=>o.filter(t=>t.status===e).length;return{route:e,shift:a,stops:o,aTiempo:s(`a-tiempo`),atrasados:s(`atrasado`),entregados:s(`entregado`),noSale:s(`no-sale`)}})}function rm(e){return v.cached(`avisos`,X(`avisos`,e)).filter(t=>{let n=t.fecha||String(t.creadoEn||``).slice(0,10),r=t.vigenteHasta||n;return n&&n<=e&&r>=e}).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``)))}function im(){let e=y(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=v.cached(`paseos`,X(`paseos`,e)).filter(t),i=v.cached(`incidentes`,X(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),a=v.cached(`checklists`,X(`checklists`,e)).filter(t).sort(n),o=v.cached(`pedidos`,X(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),s=[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>Yp(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}}),c=Zp(),l=tm(e,Ip().dayName),u=nm(l.list,r,c),d=u.flatMap(e=>e.stops.filter(e=>e.status===`atrasado`).map(t=>({...t,route:e.route})));return{hoy:e,paseos:r,incidentes:i,checklists:a,pedidosNuevos:o,shifts:s,nowMin:c,effective:l,compliance:u,late:d,lateNow:d.filter(e=>e.prevista<$p==c<$p),avisos:rm(e),carnetsWeb:v.cached(`archivos`,X(`archivos`,e)).filter(e=>e.tipo===`carnet de vacunas`&&e.creadoPor===`web`&&Date.now()-Date.parse(e.creadoEn||``)<Ap).sort(Wp)}}function am(e){return e.late.map(e=>`${e.route.ruta}:${e.perroId||e.perroNombre}`).join(`|`)}function om(){let e=y();G.adminLoaded||(G.adminLoaded=!0,sm().finally(()=>{Cp.forEach(t=>v.watch(t,X(t,e)))})),G.liveDay!==e&&(G.liveDay=e,cm(!1).finally(()=>{Sp.forEach(t=>v.watch(t,X(t,e)))}))}async function sm(){let e=y(),t=await Promise.allSettled(Cp.map(t=>v.list(t,X(t,e)))),n=e=>[...new Set(t.filter((t,n)=>t.status===`rejected`&&e.includes(Cp[n])).map(e=>e.reason?.message||`No se pudieron traer los datos.`))].join(` `),r=G.adminError,i=n([`pagos`,`clientes`]),a=n([`archivos`]);G.adminError=[i,a].filter(Boolean).join(` `),i&&Z(`pagos`,`No se pudieron traer pagos o clientes: ${i}`,!0),a&&Z(`archivos`,`No se pudo traer la lista de archivos: ${a}`,!0),r!==G.adminError&&Q()}async function cm(e){let t=y(),n=await Promise.allSettled(Sp.map(e=>v.list(e,X(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=G.liveError;G.liveError=r.join(` `),G.liveError?Z(`live`,`No se pudieron actualizar los datos del día: ${G.liveError}`,!0):e?Z(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Z(`live`,`Datos del día actualizados.`),(e||i!==G.liveError)&&Q()}var lm={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},um={admin:`todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.`,coordinador:`arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.`,supervisor:`controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.`,paseador:`hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.`,ayudante:`acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.`,marketing:`pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.`};function dm(e){let t=(nt[e]||[]).filter(e=>lm[e]).map(t=>e===`ayudante`&&t===`paseador`?`Paseador (modo ayudante)`:lm[t]);return`${t.length?`Paneles: ${J(t)}.`:`Todavía no tiene panel.`} Qué hace: ${um[e]||`Pendiente de confirmar`}`}function fm(){return G.usersLoading=!0,at.list().then(e=>{G.users=e,G.usersError=``}).catch(e=>{G.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,G.usersError,!0)}).finally(()=>{G.usersLoading=!1,Q()})}function pm(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function mm(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function hm(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!mm(e))return e}}function gm(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){G.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function _m(e){let t=G.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?q(t.text):``}</p>`}function vm(){Object.entries(G.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function ym(e){if(!e||e===document.body||!e.closest?.(`.adm-shell`))return null;if(e.id)return{selector:`#${CSS.escape(e.id)}`,index:0};let t=``;if(e.tagName===`SUMMARY`&&e.parentElement){let n=[...e.parentElement.attributes].find(e=>e.name.startsWith(`data-adm-`));n&&(t=`[${n.name}="${CSS.escape(n.value)}"] > summary`)}else{let n=[...e.attributes].find(e=>e.name.startsWith(`data-adm-`)&&e.name!==`data-adm-area`);n&&(t=`${e.tagName.toLowerCase()}[${n.name}="${CSS.escape(n.value)}"]`)}return t?{selector:t,index:Math.max(0,[...document.querySelectorAll(t)].indexOf(e))}:null}function Q(){if(!Jp()||_.user()?.rol!==`admin`)return;let e=document.activeElement,t=ym(e),n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.querySelectorAll(t.selector),i=r[t.index]||r[0];if(i&&(i.focus({preventScroll:!0}),n))try{i.setSelectionRange(...n)}catch{}}function bm(){return S.filter(e=>e.status===`Activo`&&e.days.length>0)}function xm(){let e=bm(),t=Jt.map(t=>{let n=e.filter(e=>nn(e,t,bp)).length,r=e.filter(e=>nn(e,t,xp)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function Sm(){let e=bm(),t=new Map(S.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return S.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[bp,xp].forEach(e=>{let t=Jt.filter(t=>nn(o,t,e)&&nn(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Cm(){return bm().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function wm(){return S.filter(e=>e.review||e.status!==`Activo`)}function Tm(e){return e===bp?x.manana.route:x.tarde.routes.join(` o `)}function Em(e,t){return!!e.carnet?.id||t.carnetsWeb.some(t=>t.pedidoId===e.id)}function Dm(e=im()){let{conflicts:t}=Sm(),n=S.filter(e=>e.status!==`Activo`),r=wm(),i=Cm().filter(e=>e.category===`SIN EVALUAR`),a=bm(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${J(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${Xp(n)?` a las ${Xp(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${J(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(e.lateNow.length){let t=e.lateNow.length,n=e.nowMin<$p?`mañana`:`tarde`,r=e.lateNow.slice().sort((e,t)=>t.atraso-e.atraso),i=r[0],a=r.slice(0,3).map(e=>`${e.perroNombre} (${e.hora}, ${e.route.ruta})`),o=[...new Set(r.map(e=>e.route.ruta))],c=i.route.supervisor||Fm(i.route.paseador)||`el supervisor del turno`;e.paseos.length?s.push({id:`atrasos-${e.hoy}-${n}-${t}`,tag:`Atrasos`,tone:`warning`,title:`${Y(t,`perro atrasado`,`perros atrasados`)} en el turno ${n}`,detail:`${J(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Pasaron más de ${wp} minutos de la hora prevista y nadie marcó el retiro.`,action:`Preguntale a ${c} qué pasa con ${i.perroNombre} (retiro previsto ${i.hora}, ruta ${o.join(` y `)}).`,target:`adm-cumplimiento`,targetLabel:t===1?`Ver el atraso`:`Ver los atrasos`}):s.push({id:`atrasos-sin-marcas-${e.hoy}-${n}`,tag:`Atrasos`,tone:`warning`,title:`Nadie marcó retiros hoy: ${Y(t,`perro figura`,`perros figuran`)} pasados de hora en el turno ${n}`,detail:`Según la ruta de hoy, ${J(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,action:`Preguntale a ${c} si el equipo está marcando los retiros en la página del paseador.`,target:`adm-cumplimiento`,targetLabel:`Ver el cumplimiento`})}let c=new Set(e.pedidosNuevos.map(e=>e.id)),l=e.carnetsWeb.filter(e=>!c.has(e.pedidoId));if(e.pedidosNuevos.length||l.length){let t=e.pedidosNuevos.length,n=e.pedidosNuevos.filter(t=>Em(t,e)),r=e=>e.titulo||e.tipo||`Pedido sin título`,i=[...new Set(l.map(e=>e.perroNombre||`perro sin nombre`))],a=l.length?`${t?`Además, l`:`L`}${l.length===1?`legó 1 carnet de vacunas`:`legaron ${l.length} carnets de vacunas`} por la web en las últimas 24 h (${J(i)}) de ${l.length===1?`un pedido que`:`pedidos que`} ya no ${l.length===1?`está`:`están`} como nuevo${l.length===1?``:`s`}.`:``;if(t){let i=e.pedidosNuevos.slice(0,3).map(t=>`${r(t)}${Em(t,e)?` (con carnet)`:``}`),o=e.pedidosNuevos[t-1],c=r(o),u=n.length+l.length;s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}-${u}`,tag:`Pedidos`,tone:`info`,title:`${Y(t,`pedido nuevo`,`pedidos nuevos`)} sin responder${n.length?` · ${n.length===t&&t===1?`trae carnet de vacunas`:`${n.length} con carnet`}`:``}`,detail:`${J(i)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.${a?` ${a}`:``}`,action:t===1?`Respondé el pedido “${c}”${Em(o,e)?` y mirá el carnet que mandó`:``}.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${c}”${Em(o,e)?` (trae carnet)`:``}.`,target:`adm-pedidos`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}else{let e=l[0];s.push({id:`carnets-web-${e.id}-${l.length}`,tag:`Pedidos`,tone:`info`,title:l.length===1?`Pedido nuevo con carnet: llegó el carnet de ${e.perroNombre||`un perro`} por la web`:`Pedidos nuevos con carnet: llegaron ${l.length} carnets por la web`,detail:a,action:`Abrí el carnet de ${e.perroNombre||`ese perro`} en “Archivos recibidos” y sumalo a su ficha.`,target:`adm-archivos`,targetLabel:l.length===1?`Ver el carnet`:`Ver los carnets`})}}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(Tm).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${J(r)}. Hay ${Y(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${J(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${Y(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${J(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${J(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${J(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${J(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function Om(){let e=bm(),t=[],n=[];e.forEach(e=>{let r=Yt.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=Yt.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function km(e){return`
    <div class="adm-shell">
      ${Am()}
      ${e}
    </div>
  `}function Am(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${g(`lock`,`adm-icon-sm`)} ${q(Kp().nombre)} · ${q(rt[Kp().rol]||Kp().rol)}</span>
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
  `}function jm(){om(),G.users===null&&!G.usersLoading&&!G.usersError&&fm();let e=im();G.lateSignature=am(e);let t=Dm(e),n=Lp(),r=zp();return setTimeout(vm,60),`
    <main class="adm-page" id="adm-main">
      ${Mm(t,n,e)}
      ${qm(e)}
      ${th()}
      ${eh()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${g(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${g(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${rh(r)}
        ${Sh(r)}
        ${ih(r)}
        ${Th(r)}
        ${gh(r)}
        ${oh(r)}
        ${lh(r)}
        ${uh(r)}
        ${Eh(r)}
      </div>
      ${Dh()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function Mm(e,t,n){let{dayName:r,date:i}=Ip(),a=bm(),o=a.filter(e=>nn(e,r,bp)).length,s=a.filter(e=>nn(e,r,xp)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${Y(o,`perro`,`perros`)} a la mañana y ${Y(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=qp(Kp().nombre);return`
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
  `}var Nm={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function Pm(e){let{dayName:t}=Ip();return bm().filter(n=>nn(n,t,e)).length}function Fm(e){return G.users?.find(t=>t.usuario===e)?.nombre||e||``}function Im(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=Bp(e.actualizadoEn);return`Actualizado por ${Fm(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||Fm(e.creadoPor),r=Bp(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function Lm(e){let t={manana:{title:`Turno mañana`,hours:`${x.manana.from} a ${x.manana.to}`,planned:Pm(bp)},tarde:{title:`Turno tarde`,hours:`${x.tarde.from} a ${x.tarde.to}`,planned:Pm(xp)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
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
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=Nm[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${q(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${q(Im(e))}${e.nota?` · Nota: ${q(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno. Los marca el paseador en su página al retirar a cada perro.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function Rm(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${g(`alertTriangle`,`adm-icon-sm`)} ${Y(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${q(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${Xp(e)?`<span class="adm-muted">${q(Xp(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${q(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${q(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${Im(e,!0)?`<p class="adm-note">${q(Im(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function zm(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}var Bm={"a-tiempo":{label:`A tiempo`,tone:`ok`},atrasado:{label:`Atrasado`,tone:`danger`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}},Vm={dia:`Cambio del día`,plantilla:`Plantilla semanal`,planilla:`Planilla BASE RUTAS`};function Hm(e){let t=Nm[e.estado]||{label:e.estado},n=[`Retiro previsto ${e.hora||`pendiente de confirmar`}`];return e.status===`atrasado`?n.push(`${e.atraso} min de atraso`):e.paseo&&n.push(t.label),e.paseo?.horaRetiro&&n.push(`retirado ${e.paseo.horaRetiro}`),e.paseo?.horaEntrega&&n.push(`entregado ${e.paseo.horaEntrega}`),n.join(` · `)}function Um(e){let{route:t,stops:n}=e,r=n.length-e.noSale,i=`ruta-${t.ruta}`,a=[t.paseador?`Paseador: ${Fm(t.paseador)}`:`Paseador: sin asignar`,t.ayudante?`Ayudante: ${Fm(t.ayudante)}`:``,t.supervisor?`Supervisa: ${t.supervisor}`:``].filter(Boolean).join(` · `),o=n.filter(e=>e.status===`atrasado`).sort((e,t)=>t.atraso-e.atraso);return`
    <article class="adm-shift adm-route ${o.length?`has-late`:``}" aria-labelledby="adm-route-${q(t.ruta)}">
      <h4 id="adm-route-${q(t.ruta)}">${q(t.ruta||`Ruta sin código`)} <span class="adm-th-sub">${q(t.turno||`Turno sin indicar`)} · ${q(Vm[t.fuente]||``)}</span></h4>
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
            ${n.map(e=>{let t=Bm[e.status];return e.status===`a-tiempo`&&(t=e.estado===`pendiente`?{label:`Por retirar · a tiempo`,tone:`neutral`}:{label:`${(Nm[e.estado]||{label:e.estado}).label} · a tiempo`,tone:`info`}),`
                <li>
                  <span class="adm-dog-name">${q(e.hora||`--:--`)} · ${q(e.perroNombre||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}${e.paseo?.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${q(Hm(e))}${e.nota?` · Nota: ${q(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ol>
        </details>
      `:`<p class="adm-empty">Esta ruta no tiene paradas cargadas.</p>`}
    </article>
  `}function Wm(e){let{compliance:t,effective:n,late:r}=e;return`
    <div class="adm-compliance" id="adm-cumplimiento" tabindex="-1" role="region" aria-labelledby="adm-compliance-title">
      <h3 id="adm-compliance-title">${g(`route`,`adm-icon-sm`)} Cumplimiento por ruta ${r.length?`<span class="adm-count adm-count--danger">${Y(r.length,`atrasado`,`atrasados`)}</span>`:``}</h3>
      <p class="adm-note">Atrasado = pasaron más de ${wp} minutos de la hora prevista y nadie marcó el retiro. Hora de Argentina.</p>
      ${n.fromSheet?`
        <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${b.toLowerCase()}.</span></p>
      `:``}
      ${t.length?`
        <div class="adm-live-grid">${t.map(Um).join(``)}</div>
      `:`<p class="adm-empty">Hoy no hay rutas: ni cambios del día, ni plantilla, ni paseos en la planilla.</p>`}
    </div>
  `}var Gm={"perro suelto":`danger`,seguridad:`danger`,"obra o corte":`warning`,clima:`info`,"cambio de horario":`info`};function Km(e){let{avisos:t}=e;return`
    <div class="adm-avisos" id="adm-avisos" role="region" aria-labelledby="adm-avisos-title">
      <h3 id="adm-avisos-title">${g(`mapPin`,`adm-icon-sm`)} Avisos por barrio vigentes <span class="adm-count">${t.length}</span></h3>
      ${t.length?`
        <ul class="adm-aviso-list">
          ${t.map(e=>`
            <li class="adm-aviso">
              <div class="adm-aviso-head">
                <strong>${q(e.barrio||`Barrio sin indicar`)}</strong>
                <span class="adm-pill adm-pill--${Gm[e.tipo]||`neutral`}">${q(e.tipo||`otro`)}</span>
                <span class="adm-muted">${e.vigenteHasta?`Hasta el ${q(Hp(e.vigenteHasta))}`:`Solo hoy`}</span>
              </div>
              <p>${q(e.mensaje||e.titulo||``)}</p>
              ${Im(e,!0)?`<p class="adm-note">${q(Im(e,!0))}.</p>`:``}
            </li>
          `).join(``)}
        </ul>
      `:`<p class="adm-empty">No hay avisos vigentes por barrio. Los cargan el coordinador o el supervisor cuando pasa algo en una zona.</p>`}
    </div>
  `}function qm(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${q(Hp(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" id="adm-live-refresh" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó. Se actualiza solo cuando vuelve la señal.</p>`:``}
      ${_m(`live`)}

      ${e.incidentes.length?Rm(e.incidentes):`
        <p class="adm-live-ok">${g(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      ${Wm(e)}
      ${Km(e)}

      <div class="adm-live-grid">
        ${e.shifts.map(Lm).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=zm(e);return`
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
                    <span class="adm-dog-meta">${q(Hp(t.fecha)||Vp(t.creadoEn))} · ${t.origen===`web`?`Formulario web`:q(t.creadoPorNombre||`Cargado en la app`)}</span>
                    ${n?`<button class="adm-link-button" type="button" data-adm-archivo-abrir="${q(n)}" data-adm-area="live">Ver el carnet${t.datos?.perro?` de ${q(t.datos.perro)}`:``}</button>`:``}
                  </li>
                `}).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${Y(r.length-6,`pedido más`,`pedidos más`)}. Los responde el coordinador desde su página.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos. Llegan del formulario de la web o los carga el equipo.</p>`}
        </article>
      </div>
    </section>
  `}function Jm(e){return Object.entries(rt).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function Ym(){let e=G.credential;if(!e)return``;let t=gm(e);return`
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
  `}function Xm(){let e=K.crear;return`
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${q(J(Kt.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>
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
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${Jm(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${q(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${q(rt[e.rol]||e.rol)}:</strong> ${q(dm(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${g(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function Zm(e){let t=!e.activo;return`
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
  `}function Qm(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${q(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${q(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function $m(e,t){let n=e.usuario===t,r=K.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${Vp(e.ultimoIngreso)} ${Bp(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${Vp(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
    <li class="adm-user-row ${e.activo?``:`is-off`}">
      <div class="adm-user-head">
        <strong>${q(e.nombre)}</strong>
        <span class="adm-muted">usuario: ${q(e.usuario)}</span>
        <span class="adm-pill adm-pill--neutral">${q(rt[e.rol]||e.rol)}</span>
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
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${q(e.usuario)}">${Jm(r)}</select>
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
      ${!n&&G.resetFor===e.usuario?Zm(e):``}
      ${!n&&G.confirmOff===e.usuario?Qm(e):``}
    </li>
  `}function eh(){let e=Kp().usuario,t=(G.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=G.users===null&&G.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:G.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>$m(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${G.users?`${Y(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${Ym()}

      <div class="adm-form-actions">
        <button class="adm-button ${G.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${G.showCreate}" aria-controls="adm-create">
          ${g(G.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${G.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" id="adm-users-refresh" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${G.showCreate?Xm():``}
      ${_m(`users`)}
      ${r}

      <details class="adm-inner" data-adm-inner="roles-ayuda" ${G.openDogs.has(`roles-ayuda`)?`open`:``}>
        <summary>Qué puede ver cada rol</summary>
        <ul class="adm-role-help">
          ${Object.keys(rt).map(e=>`<li><strong>${rt[e]}:</strong> ${q(dm(e))}</li>`).join(``)}
        </ul>
      </details>
    </section>
  `}function th(){let{conflicts:e,missing:t,notRouted:n}=Sm(),r=Cm();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${g(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${Wt}).</p>
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
                    ${[e.a,e.b].filter(e=>/día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(S.find(t=>t.name===e)?.review||``)).map(e=>`<span class="adm-row-note">Días de ${q(e)}: dato a revisar</span>`).join(``)}
                  </th>
                  <td>${q(e.shift)} · ${q(Tm(e.shift))}</td>
                  <td>${q(Fp(e.days))}</td>
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
            <span class="adm-safety-meta">${q(e.shifts.join(` y `))} · ${q(Fp(e.days))}</span>
            <span class="adm-safety-notes">${e.safety.map(e=>`<span class="adm-pill adm-pill--danger">${q(e)}</span>`).join(``)}</span>
          </li>
        `).join(``)}
      </ul>

      ${t.length||n.length?`
        <ul class="adm-footnotes">
          ${t.map(e=>`<li>${q(e.dog)} figura “no juntar con ${q(e.other)}”, pero ${q(e.other)} no está en el registro: ${b}.</li>`).join(``)}
          ${n.map(e=>`<li>${q(e.dog)} y ${q(e.other)} figuran “no juntar”. Hoy ${q(e.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join(``)}
        </ul>
      `:``}
    </section>
  `}function nh(e,t,{title:n,summary:r,iconName:i},a){return`
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
  `}function rh(e){let t=wm().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return nh(`adm-datos`,e,{title:`Datos a revisar`,summary:`${Y(t.length,`perro`,`perros`)} · ${Y(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${q(Gt.officialSources.dogs)}).</p>
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
  `)}function ih(e){let t=xm();return nh(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${q(t.busiest.length?J(t.busiest):`Sin datos`)} (${Y(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${Wt}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-load">
        <caption class="adm-sr-only">Perros por día y turno</caption>
        <thead>
          <tr>
            <th scope="col">Día</th>
            <th scope="col">Mañana <span class="adm-th-sub">${x.manana.from} a ${x.manana.to}</span></th>
            <th scope="col">Tarde <span class="adm-th-sub">${x.tarde.from} a ${x.tarde.to}</span></th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          ${t.rows.map(e=>{let n=t.busiest.includes(e.day);return`
              <tr class="${n?`is-busiest`:``}">
                <th scope="row">
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${Pp[e.day]}</span>
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
      <li>Mañana: ruta ${x.manana.route}, supervisa ${x.manana.supervisor}. Tarde: rutas ${x.tarde.routes.join(` y `)}, supervisa ${x.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${q(en.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function ah(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function oh(e){let t=bm(),n=xm(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${Wt}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${Wt}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...en,...i];return nh(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${ah(e.kind)}">${q(e.kind)}</span>
          <strong class="adm-fact-value">${q(e.value)}</strong>
          <span class="adm-fact-label">${q(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${q(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner" data-adm-inner="categorias" ${G.openDogs.has(`categorias`)?`open`:``}>
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(Qt).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${q(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var sh={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},ch=[{role:`Admin`,who:qt.admin,can:[`Ve y decide sobre todo el sistema`,`Usuarios, pagos e indicadores`,`Único rol que ve y carga pagos`]},{role:`Coordinador`,who:`${qt.coordinador} (${b.toLowerCase()})`,can:[`Armar rutas y horarios (plantilla semanal y cambios del día)`,`Gestionar los clientes de los paseos`,`Atender pedidos y cargar fichas`,`Avisar lo que pasa en cada barrio`,`No ve plata`]},{role:`Supervisor`,who:qt.supervisor,can:[`Controlar los paseos del momento`,`Quién falta retirar y atrasos contra el horario`,`Entregas, incidentes y equipo`,`Ve las rutas, no las arma`]},{role:`Paseador`,who:qt.paseador,can:[`Hacer su ruta del turno, en orden y con horario`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`]},{role:`Ayudante de paseador`,who:b,can:[`Acompañar al paseador en su ruta`,`Marcar pasos`,`Reportar incidentes`,`Sin datos de clientes`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function lh(e){return nh(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${Y(Kt.length,`persona`,`personas`)} · ${ch.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${Kt.map(e=>{let t=sh[e.role];return`
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${q(e.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${q(e.label)}</span>
            </div>
            <p>${q(e.tasks)}</p>
            <p class="adm-person-panel">Panel: ${t?`<a href="${t.path}" data-link>${t.panel}</a>`:`<span class="adm-pending">${b}</span>`}</p>
          </li>
        `}).join(``)}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${ch.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${q(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${q(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function uh(e){return nh(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${Yt.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${yp.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${Yt.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${yp.map(t=>`<td>${an(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${yp.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${yp.map(e=>`<td>${an(Xt[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${yp.map(e=>`<td>${an(Xt[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Zt.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${b.toLowerCase()}.</p>
  `)}function dh(e){let[t,n]=String(e).split(`-`).map(Number);if(!t||!n)return e;let r=new Intl.DateTimeFormat(`es-AR`,{month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(Date.UTC(t,n-1,15)));return r.charAt(0).toUpperCase()+r.slice(1)}function fh(e){let t=String(e||``).replace(/[$\s]/g,``);return t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):/^\d{1,3}(\.\d{3})+$/.test(t)&&(t=t.replace(/\./g,``)),/^\d+(\.\d+)?$/.test(t)?Number(t):NaN}function ph(){let e=v.cached(`pagos`,X(`pagos`)).slice().sort((e,t)=>String(t.fecha||``).localeCompare(String(e.fecha||``))||String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),t=y().slice(0,7),n=[...new Set([t,...e.map(e=>String(e.fecha||``).slice(0,7)).filter(e=>/^\d{4}-\d{2}$/.test(e))])].sort().reverse(),r=G.pagosMes&&(G.pagosMes===`todos`||n.includes(G.pagosMes))?G.pagosMes:t,i=r===`todos`?e:e.filter(e=>String(e.fecha||``).startsWith(r)),a=e.filter(e=>!e.pasadoAlLibro),o=i.reduce((e,t)=>e+(Number(t.monto)||0),0),s=e.filter(e=>{let t=G.users?.find(t=>t.usuario===e.creadoPor)?.rol;return t&&t!==`admin`}),c=i.filter(e=>!e.comprobanteId);return{all:e,months:n,mes:r,filtered:i,faltan:a,faltanMes:i.filter(e=>!e.pasadoAlLibro),total:o,deOtros:s,sinComprobanteMes:c}}function mh(e){let t=G.users?.find(t=>t.usuario===e.creadoPor),n=t&&t.rol!==`admin`,r=Number(e.monto),i=e.monto!==``&&e.monto!==null&&e.monto!==void 0&&Number.isFinite(r);return`
    <li class="adm-pago ${e.pasadoAlLibro?``:`is-missing`}">
      <div class="adm-pago-main">
        <span class="adm-pago-date">${q(Hp(e.fecha)||Vp(e.creadoEn)||`Pendiente de confirmar`)}</span>
        <strong class="adm-pago-concept">${q(e.concepto||`Sin concepto`)}</strong>
        <span class="adm-pago-amount">${i?q(an(r)):b}</span>
      </div>
      <div class="adm-pago-meta">
        <span class="adm-pill adm-pill--neutral">${q(e.medio||`Medio sin indicar`)}</span>
        <span class="adm-pill ${e.pasadoAlLibro?`adm-pill--ok`:`adm-pill--warning`}">${e.pasadoAlLibro?`Pasado al Libro`:`Falta pasar al Libro`}</span>
        ${e.comprobanteId?`<span class="adm-pill adm-pill--ok">${g(`fileCheck`,`adm-icon-xs`)} Con comprobante</span>`:`<span class="adm-pill adm-pill--neutral adm-pill--dashed">Sin comprobante</span>`}
        ${e.pendiente?`<span class="adm-pill adm-pill--info">Se enviará cuando haya señal</span>`:``}
        ${n?`<span class="adm-pill adm-pill--info">Lo cargó ${q(rt[t.rol]||t.rol)} antes del cambio</span>`:``}
      </div>
      ${Im(e,!0)?`<p class="adm-note">${q(Im(e,!0))}.</p>`:``}
      <div class="adm-pago-actions">
        ${e.comprobanteId?`
          <button class="adm-button adm-button--ghost adm-button--sm" type="button" data-adm-archivo-abrir="${q(e.comprobanteId)}" data-adm-area="pagos">
            ${g(`eye`,`adm-icon-sm`)} Ver comprobante
          </button>
        `:e.pendiente?``:`
          <label class="adm-button adm-button--ghost adm-button--sm adm-file-button">
            ${g(`fileUp`,`adm-icon-sm`)} Adjuntar comprobante
            <input class="adm-file-input" type="file" accept="${Op}" data-adm-pago-adjuntar="${q(e.id)}" aria-label="Adjuntar comprobante a ${q(e.concepto||`este pago`)}" />
          </label>
        `}
        <button class="adm-link-button" type="button" data-adm-pago-libro="${q(e.id)}" aria-pressed="${e.pasadoAlLibro?`true`:`false`}">
          ${e.pasadoAlLibro?`Desmarcar “pasado al Libro”`:`Marcar como pasado al Libro`}
        </button>
      </div>
    </li>
  `}function hh(){let e=K.pagoArchivo,t=Gp();return`
    <fieldset class="adm-file-field" aria-describedby="adm-pago-archivo-ayuda">
      <legend>Comprobante <small>opcional · foto o PDF, hasta 3,5 MB</small></legend>
      ${e?`
        <p class="adm-file-chosen" id="adm-pago-archivo-elegido">
          ${g(e.type===`application/pdf`?`fileText`:`camera`,`adm-icon-sm`)}
          <span><strong>${q(e.name||`Comprobante`)}</strong>${Up(e.size)?` · ${q(Up(e.size))}`:``}${K.pagoSubido?` · ya subido`:``}</span>
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
            <input class="adm-file-input" id="adm-pago-archivo" type="file" accept="${Op}" data-adm-pago-archivo />
          </label>
        </div>
      `}
      <p class="adm-note" id="adm-pago-archivo-ayuda">${t?`Sin señal no se pueden subir archivos (no quedan en espera). Guardá el pago sin comprobante y adjuntalo desde la lista cuando vuelva la señal.`:`Sirve una captura de la transferencia de Naranja X o una foto del recibo. Lo ves solo vos.`}</p>
    </fieldset>
  `}function gh(e){let t=ph(),n=K.pago,r=t.filtered.slice(0,20),i=t.mes===`todos`?`todos los meses`:dh(t.mes).toLowerCase();return nh(`adm-pagos`,e,{title:`Pagos · registro de apoyo`,summary:t.faltan.length?`${Y(t.faltan.length,`pago falta`,`pagos faltan`)} pasar al Libro contable`:`Nada pendiente de pasar al Libro contable`,iconName:`receipt`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: ${Ep}</strong>
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
          <datalist id="adm-pago-medios">${Tp.map(e=>`<option value="${q(e)}"></option>`).join(``)}</datalist>
        </label>
      </div>
      ${hh()}
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
    ${_m(`pagos`)}

    <div class="adm-pagos-head">
      <label class="adm-field adm-field--inline" for="adm-pagos-mes">
        <span>Mes</span>
        <select class="adm-input adm-input--sm" id="adm-pagos-mes" data-adm-pagos-mes>
          ${t.months.map(e=>`<option value="${e}" ${e===t.mes?`selected`:``}>${q(dh(e))}</option>`).join(``)}
          <option value="todos" ${t.mes===`todos`?`selected`:``}>Todos los meses</option>
        </select>
      </label>
      ${t.filtered.length?`
        <p class="adm-pagos-summary">
          <strong>${Y(t.filtered.length,`pago`,`pagos`)}</strong> en ${q(i)} · suma ${q(an(t.total))} ·
          <strong class="${t.faltanMes.length?`adm-text-warning`:``}" data-adm-pagos-faltan>${t.faltanMes.length} sin pasar al Libro</strong>${t.mes!==`todos`&&t.faltan.length!==t.faltanMes.length?` (${t.faltan.length} contando todos los meses)`:``}${t.sinComprobanteMes.length?` · ${t.sinComprobanteMes.length} sin comprobante`:``}
        </p>
      `:t.faltan.length?`
        <p class="adm-pagos-summary"><strong class="adm-text-warning" data-adm-pagos-faltan>${Y(t.faltan.length,`pago`,`pagos`)} de otros meses sin pasar al Libro.</strong> Elegí “Todos los meses” para verlos.</p>
      `:``}
    </div>
    ${t.deOtros.length?`<p class="adm-note">${t.deOtros.length===1?`1 pago lo cargó`:`${t.deOtros.length} pagos los cargó`} otro rol antes del cambio de roles (el coordinador ya no ve plata). Se ven acá con la marca “antes del cambio”.</p>`:``}
    ${r.length?`
      <ul class="adm-pago-list" aria-label="Pagos de ${q(i)}">${r.map(mh).join(``)}</ul>
      ${t.filtered.length>r.length?`<p class="adm-note">Se muestran los últimos ${r.length}. Hay ${Y(t.filtered.length-r.length,`pago más`,`pagos más`)} en ${q(i)}.</p>`:``}
    `:`<p class="adm-empty">No hay pagos cargados en ${q(i)}. Cargalos con el formulario de arriba cuando te paguen.</p>`}
    ${t.filtered.length?`<p class="adm-note">La suma es solo de este registro de apoyo: no reemplaza al Libro contable.</p>`:``}
  `)}var _h={drive:`En tu Google Drive`,vercel:`Guardado en Vercel (provisorio)`,local:`Guardado en el servidor de prueba`};function vh(){let e=v.cached(`archivos`,X(`archivos`)).slice().sort(Wp),t=G.archivosTipo!==`todos`&&Dp[G.archivosTipo]?G.archivosTipo:`todos`;return{all:e,tipo:t,filtered:t===`todos`?e:e.filter(e=>e.tipo===t),counts:Object.fromEntries(Object.keys(Dp).map(t=>[t,e.filter(e=>e.tipo===t).length])),enVercel:e.filter(e=>e.ubicacion===`vercel`).length,enPrueba:e.filter(e=>e.ubicacion===`local`).length,nuevos:e.filter(e=>Date.now()-Date.parse(e.creadoEn||``)<Ap)}}function yh(e){let t=[];if((e.perroNombre||e.perroId)&&t.push(`Perro: ${e.perroNombre||e.perroId}${e.perroNombre&&e.perroId?` (${e.perroId})`:``}`),e.clienteId){let n=v.cached(`clientes`,X(`clientes`)).find(t=>t.id===e.clienteId);t.push(`Cliente: ${n?.nombre||e.clienteId}`)}if(e.pedidoId){let n=v.cached(`pedidos`,X(`pedidos`)).find(t=>t.id===e.pedidoId),r=n?{nuevo:`nuevo`,"en-curso":`en curso`,resuelto:`resuelto`}[n.estado||`nuevo`]||n.estado:``;t.push(n?`Pedido: ${n.titulo||n.tipo||`sin título`}${r?` (${r})`:``}`:`Pedido del formulario web`)}let n=bh(e);return n&&t.push(`Pago: ${n.concepto||`sin concepto`}${n.fecha?` del ${Hp(n.fecha)}`:``}`),t}function bh(e){return e.tipo===`comprobante de pago`&&v.cached(`pagos`,X(`pagos`)).find(t=>t.comprobanteId===e.id)||null}function xh(e){let t=Dp[e.tipo]||{label:e.tipo||`Archivo`,tone:`neutral`},n=yh(e),r=e.creadoPorNombre||Fm(e.creadoPor)||``,i=e.creadoEn?`${Vp(e.creadoEn)} a las ${Bp(e.creadoEn)}`:Hp(e.fecha),a=Date.now()-Date.parse(e.creadoEn||``)<Ap,o=_h[e.ubicacion]||`Lugar de guardado sin indicar`,s=e.mime===`application/pdf`?`PDF`:/^image\//.test(e.mime||``)?`Foto`:``,c=`${t.label}${e.perroNombre?` de ${e.perroNombre}`:``}`,l=/^https:\/\//i.test(e.driveUrl||``)?e.driveUrl:``;return`
    <li class="adm-archivo adm-archivo--${t.tone}">
      <div class="adm-archivo-head">
        <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}</span>
        ${a?`<span class="adm-pill adm-pill--info">Nuevo</span>`:``}
        <strong class="adm-archivo-title">${q(e.perroNombre||bh(e)?.concepto||e.nombreOriginal||e.nombreArchivo||t.label)}</strong>
      </div>
      <p class="adm-archivo-links">${n.length?q(n.join(` · `)):`Sin vincular a un perro, cliente o pedido.`}</p>
      <p class="adm-note">${e.creadoPor===`web`?`Llegó por el formulario de la web`:`Subido por ${q(r||`alguien sin nombre`)}`}${i?` el ${q(i)}`:``}${s?` · ${s}`:``}${Up(e.tamano)?` · ${q(Up(e.tamano))}`:``}</p>
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
  `}function Sh(e){let t=vh(),n=t.filtered.slice(0,jp),r=t.tipo===`todos`?``:` de tipo “${Dp[t.tipo].label.toLowerCase()}”`;return nh(`adm-archivos`,e,{title:`Archivos recibidos`,summary:t.all.length?`${Y(t.all.length,`archivo`,`archivos`)}${t.nuevos.length?` · ${Y(t.nuevos.length,`nuevo`,`nuevos`)} en las últimas 24 h`:``}`:`Todavía no llegó ningún archivo`,iconName:`fileUp`},`
    <p class="adm-lead">Carnets de vacunas, comprobantes y documentos que manda la gente desde el formulario de la web o que sube el equipo. Cada uno dice a qué perro, cliente o pedido corresponde. Los comprobantes de pago los abrís solo vos.</p>
    ${Gp()?`<p class="adm-msg is-error">Sin señal: ves la lista que ya tenías. Para abrir o subir archivos hace falta señal.</p>`:``}
    ${t.enVercel||t.enPrueba?`
      <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>${J([t.enVercel?`${t.enVercel===1?`1 archivo está guardado`:`${t.enVercel} archivos están guardados`} en Vercel (provisorio)`:``,t.enPrueba?`${t.enPrueba===1?`1 archivo está`:`${t.enPrueba} archivos están`} en el servidor de prueba`:``].filter(Boolean))}. Cuando se conecte la planilla, los archivos nuevos van a ir a tu Google Drive; los que ya llegaron quedan donde están.</span></p>
    `:``}
    ${t.all.length?`
      <div class="adm-pagos-head">
        <label class="adm-field adm-field--inline" for="adm-archivos-tipo">
          <span>Tipo</span>
          <select class="adm-input adm-input--sm" id="adm-archivos-tipo" data-adm-archivos-tipo>
            <option value="todos" ${t.tipo===`todos`?`selected`:``}>Todos (${t.all.length})</option>
            ${Object.entries(Dp).map(([e,n])=>`<option value="${q(e)}" ${t.tipo===e?`selected`:``}>${q(n.label)} (${t.counts[e]})</option>`).join(``)}
          </select>
        </label>
      </div>
    `:``}
    ${_m(`archivos`)}
    ${n.length?`
      <ul class="adm-archivo-list" aria-label="Archivos recibidos${q(r)}">${n.map(xh).join(``)}</ul>
      ${t.filtered.length>n.length?`<p class="adm-note">Se muestran los últimos ${n.length}. Hay ${Y(t.filtered.length-n.length,`archivo más`,`archivos más`)}${q(r)}.</p>`:``}
    `:t.all.length?`
      <p class="adm-empty">No hay archivos${q(r)}. Elegí “Todos” para ver el resto.</p>
    `:`
      <p class="adm-empty">Todavía no llegó ningún archivo. Aparecen acá cuando un tutor manda el carnet desde el formulario de la web, cuando el equipo sube uno o cuando adjuntás un comprobante a un pago.</p>
    `}
  `)}var Ch=[[`activo`,`Activos`],[`pausa`,`En pausa`],[`baja`,`Baja`]];function wh(){let e=v.cached(`clientes`,X(`clientes`)),t=new Map;e.forEach(e=>{let n=String(e.barrio||``).trim()||`Sin barrio`;t.has(n)||t.set(n,{barrio:n,activo:0,pausa:0,baja:0,otro:0});let r=t.get(n),i=String(e.estado||``).toLowerCase();Ch.some(([e])=>e===i)?r[i]+=1:r.otro+=1});let n=[...t.values()].sort((e,t)=>t.activo-e.activo||e.barrio.localeCompare(t.barrio)),r={activo:0,pausa:0,baja:0,otro:0};return n.forEach(e=>Object.keys(r).forEach(t=>{r[t]+=e[t]})),{total:e.length,rows:n,totals:r}}function Th(e){let t=wh(),n=t.totals.otro>0;return nh(`adm-clientes`,e,{title:`Clientes por barrio`,summary:t.total?`${Y(t.totals.activo,`activo`,`activos`)} · ${t.totals.pausa} en pausa · ${t.totals.baja} de baja`:`Todavía no hay clientes cargados en la app`,iconName:`mapPin`},`
    <p class="adm-lead">Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>
    ${t.total?`
      <div class="adm-table-wrap">
        <table class="adm-table adm-clients">
          <caption class="adm-sr-only">Clientes por barrio y estado</caption>
          <thead>
            <tr><th scope="col">Barrio</th>${Ch.map(([,e])=>`<th scope="col">${e}</th>`).join(``)}${n?`<th scope="col">Sin estado</th>`:``}</tr>
          </thead>
          <tbody>
            ${t.rows.map(e=>`
              <tr><th scope="row">${q(e.barrio)}</th>${Ch.map(([t])=>`<td>${e[t]}</td>`).join(``)}${n?`<td>${e.otro}</td>`:``}</tr>
            `).join(``)}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total</th>${Ch.map(([e])=>`<td>${t.totals[e]}</td>`).join(``)}${n?`<td>${t.totals.otro}</td>`:``}</tr>
          </tfoot>
        </table>
      </div>
    `:`<p class="adm-empty">El coordinador todavía no cargó clientes en la app.</p>`}
  `)}function Eh(e){let t=Om();return nh(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${q(Gt.officialSources.money)}. Esta sección no muestra montos cobrados: los pagos que anotes de apoyo están en <a class="adm-inline-link" href="#adm-pagos" data-adm-goto="adm-pagos">Pagos</a>.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${an(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${Y(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${an(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${an(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${Y(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${b.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${q(e)}: ${J(t.excluded.filter(t=>t.plan===e).map(e=>q(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function Dh(){let e=Gt.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${Wt}.</strong> Perros: ${q(e.dogs)}. Rutas: ${q(e.routes)}. Plata: ${q(e.money)}.</p>
      <p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${Ep}.</p>
    </footer>
  `}function Oh(){let{dayName:e,date:t}=Ip(),n=im(),r=Dm(n),i=Lp(),a=r.find(e=>!i.includes(e.id)),o=xm(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,`Perros atrasados (más de ${wp} min sin retiro): ${n.late.length}. Avisos por barrio vigentes: ${n.avisos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${J(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${Wt}.`].join(`
`)}async function kh(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function Ah(e){Mp=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=Mp)},60)}function jh(){Rp(_p,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function Mh(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,jh());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function Nh(e){return e.target.closest(`[data-admin-logout]`)?(G.credential=null,G.users=null,G.usersError=``,G.liveDay=null,G.adminLoaded=!1,G.pagosMes=null,G.archivosTipo=`todos`,K.pago=Np(),K.pagoArchivo=null,K.pagoSubido=null,Xh(`/salir`),!0):!1}function Ph(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function Fh(e,t){G.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function Ih(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),G.busy))return;let n=t.dataset.admForm;if(n===`pago`)await Lh();else if(n===`crear`){let e=K.crear,n=e.nombre.trim(),r=pm(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?G.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:rt[e.rol]?mm(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Z(`users`,a,!0),Q();return}Fh(t,!0);try{let t=await at.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});G.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},K.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},G.showCreate=!1,Z(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),G.busy=!1,await fm(),Ph(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),G.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=G.users?.find(t=>t.usuario===e),r=K.reset.pin.trim(),i=n?mm(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}Fh(t,!0);try{let t=!n.activo;await at.save({usuario:e,pin:r,...t?{activo:!0}:{}}),G.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},G.resetFor=null,K.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),G.busy=!1,await fm(),Ph(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),G.busy=!1,Q()}}}async function Lh(){let e=K.pago,t=e.concepto.trim(),n=e.medio.trim(),r=fh(e.monto),i=K.pagoArchivo,a=``;if(/^\d{4}-\d{2}-\d{2}$/.test(e.fecha)?t.length<2?a=`Escribí el concepto (por ejemplo, el plan y la semana).`:!Number.isFinite(r)||r<=0?a=`Escribí el monto en pesos, solo números (por ejemplo 35000).`:i&&!K.pagoSubido&&Gp()&&(a=`Sin señal no se puede subir el comprobante (los archivos no quedan en espera). Tocá “Quitar” para guardar el pago sin comprobante y adjuntarlo después, o esperá a tener señal.`):a=`Elegí la fecha del pago.`,a){Z(`pagos`,a,!0),Q();return}G.busy=!0,G.savingPago=!0;let o=K.pagoSubido?.id||``;if(i&&!o){Z(`pagos`,`Subiendo el comprobante…`),Q();try{let e=await _t.subir(`comprobante de pago`,i);o=e.id,K.pagoSubido={id:e.id}}catch(e){Z(`pagos`,`No se pudo subir el comprobante: ${e.message||`error del servidor.`} El pago todavía no se guardó: probá de nuevo o tocá “Quitar” para guardarlo sin comprobante.`,!0),G.busy=!1,G.savingPago=!1,Q();return}}try{let i=await v.save(`pagos`,{fecha:e.fecha,concepto:t,monto:r,medio:n,pasadoAlLibro:e.pasadoAlLibro===!0,...o?{comprobanteId:o}:{}});K.pago=Np(),K.pagoArchivo=null,K.pagoSubido=null,G.pagosMes=e.fecha.slice(0,7);let a=o?` con su comprobante`:``;Z(`pagos`,i.pendiente?`Se enviará cuando haya señal. Queda anotado en este dispositivo${a?` (el comprobante ya se subió)`:``}.`:`Listo: pago de ${an(r)} guardado${a}${e.pasadoAlLibro?``:`. Acordate de pasarlo al Libro contable`}.`)}catch(e){Z(`pagos`,`${e.message||`No se pudo guardar el pago.`}${o?` El comprobante ya se subió: al tocar “Guardar pago” de nuevo no se sube otra vez.`:``}`,!0)}finally{G.busy=!1,G.savingPago=!1,Q()}}function Rh(e){let t=e.files?.[0];e.value=``,t&&(kp.test(t.type)?t.type===`application/pdf`&&t.size>3670016?(Z(`pagos`,`El PDF es muy pesado (máximo 3,5 MB). Probá con una captura de pantalla.`,!0),Q()):(K.pagoArchivo=t,K.pagoSubido=null,Z(`pagos`,`Comprobante elegido: ${t.name||`archivo`}. Se sube al tocar “Guardar pago”.`),Q(),Ph(`#adm-pago-archivo-quitar`)):(Z(`pagos`,`Ese archivo no sirve: solo fotos (JPG, PNG, WEBP) o PDF.`,!0),Q()))}async function zh(e){let t=e.dataset.admPagoAdjuntar,n=e.files?.[0];e.value=``;let r=v.cached(`pagos`,X(`pagos`)).find(e=>e.id===t);if(!n||!r)return;let i=`${r.concepto||`el pago`}${r.fecha?` del ${Hp(r.fecha)}`:``}`,a=``;if(G.busy?a=`Esperá a que termine lo que se está guardando y probá de nuevo.`:kp.test(n.type)?Gp()&&(a=`Sin señal no se puede subir el comprobante (los archivos no quedan en espera). Probá cuando vuelva la señal.`):a=`Ese archivo no sirve: solo fotos (JPG, PNG, WEBP) o PDF.`,a){Z(`pagos`,a,!0),Q();return}G.busy=!0,Z(`pagos`,`Subiendo el comprobante de ${i}…`),Q();let o=null;try{o=await _t.subir(`comprobante de pago`,n),Z(`pagos`,(await v.save(`pagos`,{id:t,fecha:r.fecha,comprobanteId:o.id})).pendiente?`El comprobante se subió. El cambio del pago se enviará cuando haya señal.`:`Listo: ${i} ya tiene su comprobante.`)}catch(e){Z(`pagos`,`${o?`El comprobante se subió pero no se pudo vincular al pago`:`No se pudo subir el comprobante`}: ${e.message||`error del servidor.`}`,!0)}finally{G.busy=!1,Q(),Ph(o?`.adm-pago [data-adm-archivo-abrir="${CSS.escape(o.id)}"]`:`[data-adm-pago-adjuntar="${CSS.escape(t)}"]`)}}function Bh(e){let t=e.dataset.admArchivoAbrir,n=G.msgs[e.dataset.admArea]===void 0?`archivos`:e.dataset.admArea;Gp()?(Z(n,`Sin señal no se puede abrir el archivo. Probá cuando vuelva la señal.`,!0),Q()):_t.abrir(t).catch(e=>{let t=e.status===403?`Tu usuario no puede abrir este archivo. Los comprobantes de pago los abre solo el admin.`:e.status===404?`No se encontró el archivo guardado. Puede que lo hayan borrado de Drive.`:`No se pudo abrir el archivo: ${e.message||`error del servidor.`}`;Z(n,t,!0),Q()})}async function Vh(e){let t=v.cached(`pagos`,X(`pagos`)).find(t=>t.id===e);if(!t||G.busy)return;G.busy=!0;let n=!t.pasadoAlLibro;try{let r=await v.save(`pagos`,{id:e,fecha:t.fecha,pasadoAlLibro:n}),i=`${t.concepto||`El pago`}${t.fecha?` del ${Hp(t.fecha)}`:``}`;Z(`pagos`,r.pendiente?`Se enviará cuando haya señal.`:n?`Listo: ${i} quedó como pasado al Libro.`:`Listo: ${i} quedó como pendiente de pasar al Libro.`)}catch(e){Z(`pagos`,e.message||`No se pudo cambiar la marca.`,!0)}finally{G.busy=!1,Q(),Ph(`[data-adm-pago-libro="${CSS.escape(e)}"]`)}}async function Hh(e,t,n){if(!G.busy){G.busy=!0;try{await e(),Z(`users`,t),G.busy=!1,await fm()}catch(e){Z(`users`,e.message||n,!0),G.busy=!1,Q()}}}function Uh(e){if(e.target.closest(`[data-adm-create-toggle]`))return G.showCreate=!G.showCreate,G.resetFor=null,G.confirmOff=null,$(),Ph(G.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return G.usersError=``,fm().then(()=>{G.usersError||(Z(`users`,`Lista de usuarios actualizada.`),Q())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;K[e].pin=hm();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=K[e].pin),Ah(`PIN generado: ${K[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=G.users?.find(t=>t.usuario===e);if(!t)return!0;let r=K.roles[e]||t.rol;return r===t.rol?(Z(`users`,`${t.nombre} ya tiene el rol ${rt[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Q(),!0):(Hh(async()=>{await at.save({usuario:e,rol:r}),delete K.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${rt[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return G.resetFor=G.resetFor===e?null:e,G.confirmOff=null,K.reset.pin=``,$(),G.resetFor&&Ph(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=G.resetFor||``;return G.resetFor=null,K.reset.pin=``,$(),Ph(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return G.confirmOff=i.dataset.admOff,G.resetFor=null,$(),Ph(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=G.confirmOff||``;return G.confirmOff=null,$(),Ph(`[data-adm-off="${CSS.escape(e)}"]`),Ah(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=G.users?.find(t=>t.usuario===e);return G.confirmOff=null,Hh(()=>at.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}if(e.target.closest(`[data-adm-cred-copy]`))return G.credential&&kh(gm(G.credential)).then(e=>{Ah(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0;if(e.target.closest(`[data-adm-cred-hide]`))return G.credential=null,$(),Ph(`#adm-usuarios`),Ah(`Listo. El PIN ya no se muestra.`),!0;if(e.target.closest(`[data-adm-live-refresh]`))return cm(!0),!0;let o=e.target.closest(`[data-adm-pago-libro]`);if(o)return Vh(o.dataset.admPagoLibro),!0;let s=e.target.closest(`[data-adm-archivo-abrir]`);return s?(Bh(s),!0):e.target.closest(`[data-adm-pago-quitar]`)?(K.pagoArchivo=null,K.pagoSubido=null,Z(`pagos`,`Comprobante quitado. El pago se guarda sin comprobante.`),Q(),Ph(`#adm-pago-archivo`),!0):!1}function Wh(e){if(e.target.matches?.(`[data-adm-pago-archivo], [data-adm-pago-adjuntar]`)){if(e.type!==`change`)return;e.target.dataset.admPagoAdjuntar===void 0?Rh(e.target):zh(e.target);return}let t=e.target.closest?.(`[data-adm-archivos-tipo]`);if(t){e.type===`change`&&G.archivosTipo!==t.value&&(G.archivosTipo=t.value,Q(),Ah(t.value===`todos`?`Se muestran todos los archivos.`:`Se muestran los archivos de tipo ${(Dp[t.value]?.label||t.value).toLowerCase()}.`));return}let n=e.target.closest?.(`[data-adm-pagos-mes]`);if(n){e.type===`change`&&G.pagosMes!==n.value&&(G.pagosMes=n.value,Q(),Ah(`Pagos de ${n.value===`todos`?`todos los meses`:dh(n.value).toLowerCase()}.`));return}let r=e.target.closest?.(`[data-adm-draft]`);if(!r)return;let i=r.dataset.admDraft,a=r.dataset.admKey,o=r.type===`checkbox`?r.checked:r.value;if(i===`roles`?K.roles[a]=o:K[i][a]=o,i===`crear`&&a===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${q(rt[r.value]||r.value)}:</strong> ${q(dm(r.value))}`)}}function Gh(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=Lp(),r=n.includes(e);return Rp(gp,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),Ah(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),Mh(n.dataset.admGoto),!0;if(Uh(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),jh(),Ah(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(kh(Oh()).then(e=>{Ah(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function Kh(e){if(e.target.matches?.(`[data-adm-section]`)&&jh(),e.target.matches?.(`[data-adm-dogs], [data-adm-inner]`)){let t=e.target.dataset.admDogs||e.target.dataset.admInner;e.target.open?G.openDogs.add(t):G.openDogs.delete(t)}}function qh(){_e.push(Nh),ye.push(Gh),document.addEventListener(`toggle`,Kh,!0),document.addEventListener(`submit`,Ih),document.addEventListener(`input`,Wh),document.addEventListener(`change`,Wh),$e(e=>{(Sp.includes(e)||Cp.includes(e))&&Q()}),setInterval(()=>{if(!Jp()||_.user()?.rol!==`admin`||document.visibilityState!==`visible`)return;let e=am(im());e!==G.lateSignature&&(G.lateSignature=e,Q())},3e4),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var Jh=document.querySelector(`#app`);function Yh(e){return e.replace(/\/+$/,``)||`/`}function Xh(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ce(),Mt(),Ht(),Dr(),Ba(),Uc(),hp(),qh(),document.addEventListener(`click`,e=>{if(be(_e,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),Xh(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{be(ve,e)});function $(){let e=Yh(window.location.pathname);if(e===`/`){Jh.innerHTML=Ct(),Qh();return}if(e===`/login`){Jh.innerHTML=It(),Qh();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),_.clear(),Jh.innerHTML=It(),Qh();return}if(e===`/registro`||e===`/register`){Jh.innerHTML=Rt(),Qh();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(Jh.innerHTML=Zh(r),Qh()):(Jh.innerHTML=pe(),Qh())}function Zh(e){if(e===`cliente`)return $h(e);let t=_.user();return t?(nt[t.rol]||[]).includes(e)?$h(e):zt(e):(window.history.replaceState({},``,`/login?volver=/${e}`),It())}function Qh(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=me()+ge(),document.body.classList.toggle(`menu-locked`,e.menuOpen),He(),Ve()}function $h(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:jm,coordinador:_f,supervisor:ac,paseador:$i,cliente:Qn}[e]();return i?Qi(o):a?rc(o):e===`coordinador`?hf(o):e===`admin`?km(o):oe(`
    <main class="dashboard ${r?`dashboard-client`:``}">
      ${r?``:`
        <aside class="sidebar reveal">
          <p class="eyebrow">Perfil activo</p>
          <h1>${n.label}</h1>
          <p>${n.intent}</p>
          <div class="permission-list">
            ${c.map(([t,n])=>`
              <div class="${t.toLowerCase()===e?`selected`:``}">
                <strong>${t}</strong>
                <small>${n}</small>
              </div>
            `).join(``)}
          </div>
        </aside>
      `}
      <section class="dashboard-content reveal">
        ${o}
      </section>
    </main>
    ${r?ue():``}
  `,e)}ze(),$e(e=>{e===`sesion`&&$()}),_.user()&&(_.refresh().catch(()=>{}),dt()),Fe(()=>Ve()),$(),document.addEventListener(`click`,e=>{be(ye,e)});