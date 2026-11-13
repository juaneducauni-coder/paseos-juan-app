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
  `}function ze(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){Oe=!Oe,Re(),Oe?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);De={...De,[e]:n},Ae(),Ie(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else Oe&&!e.target.closest(`#a11y-root`)&&(Oe=!1,Re())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Oe&&(Oe=!1,Re(),document.querySelector(`.a11y-toggle`)?.focus())}),je.addEventListener?.(`change`,Ie),Me.addEventListener?.(`change`,Ie),Ie()}var Be={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function Ve(){Be.frame&&cancelAnimationFrame(Be.frame),Be.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Pe(),r=Ne()?[22,52,39]:[184,218,198],i=Ne()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Be.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Be.lastDraw>33&&(Be.lastDraw=e,s(e/1e3)),Be.frame=requestAnimationFrame(l)}Be.frame=requestAnimationFrame(l)}function He(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ue=`pj_sesion`,We=`pj_pendientes`,Ge=`pj_cache_`,Ke=6e4;fetch(`/api/salud`).then(e=>e.json()).then(e=>{/provisorio/i.test(e.almacenamiento||``)&&(Ke=3e5)}).catch(()=>{});var qe=new Set,Je=new Map,Ye=new Set;document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Ye.forEach(e=>e())});function Xe(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ze(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Qe(e){qe.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function $e(e){return qe.add(e),()=>qe.delete(e)}var et=class extends Error{constructor(e,t){super(t),this.status=e}};async function tt(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=_.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new et(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(_.clear(),Qe(`sesion`)),!o.ok||s.ok===!1)throw new et(o.status,s.error||`Error del servidor.`);return s}var _={token:()=>Xe(Ue,null)?.token||null,user:()=>Xe(Ue,null)?.user||null,set(e,t){Ze(Ue,{token:e,user:t}),Qe(`sesion`)},clear(){try{localStorage.removeItem(Ue),Object.keys(localStorage).filter(e=>e.startsWith(Ge)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return tt(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await tt(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return _.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await tt(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return _.set(i.token,i.user),i.user},async refresh(){let e=_.token();if(!e)return null;let t=await tt(`/api/auth/me`);return t.user&&_.token()===e&&_.set(e,t.user),t.user},async changePin(e,t){let n=await tt(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return _.set(n.token,n.user),n.user},logout(){_.clear(),Qe(`sesion`)}},nt={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],ayudante:[`paseador`],marketing:[]},rt={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,ayudante:`Ayudante de paseador`,marketing:`Marketing`};function it(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`,ayudante:`/paseador`}[e]||`/`}var at={list:async()=>(await tt(`/api/usuarios`)).usuarios,save:async e=>(await tt(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>tt(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function ot(e,t={}){return`${Ge}${e}_${t.desde||``}_${t.prefijo||``}`}function st(e,t){let n=Xe(We,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var v={cached(e,t={}){return st(e,Xe(ot(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await tt(`/api/registros?${n}`),i=localStorage.getItem(ot(e,t));return Ze(ot(e,t),r.registros),i!==JSON.stringify(r.registros)&&Qe(e),st(e,r.registros)}catch(n){if(n.status===0)return v.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=ct(n.fecha);try{let t=await tt(`/api/registros`,{method:`POST`,body:{col:e,...n}});return lt(e,t.registro),Qe(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Xe(We,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:_.user()?.usuario,at:Date.now()}),Ze(We,a),Qe(e),{...n,pendiente:!0}}},async remove(e,t){await tt(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{Ze(e,Xe(e,[]).filter(e=>e.id!==t))}),Qe(e)},pendingCount(){return Xe(We,[]).length},watch(e,t={}){let n=ot(e,t);if(Je.has(n))return Je.get(n);let r=()=>{document.visibilityState===`visible`&&_.token()&&v.list(e,t).catch(()=>{})};r(),Ye.add(r);let i=setInterval(r,Ke);setTimeout(()=>{clearInterval(i),i=setInterval(r,Ke)},3e3);let a=()=>{Ye.delete(r),clearInterval(i),Je.delete(n)};return Je.set(n,a),a}};function ct(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function lt(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{let n=Xe(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Ze(e,n)})}var ut=!1;async function dt(){if(ut||!_.token())return 0;let e=_.user()?.usuario,t=Xe(We,[]);if(!t.length)return 0;ut=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await tt(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});lt(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Ze(We,Xe(We,[]).filter(e=>!n.has(e.at))),ut=!1,r.forEach(e=>Qe(e))}return n.size}window.addEventListener(`online`,()=>dt()),setInterval(()=>dt(),3e4);async function ft(e){return tt(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function y(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}var pt=1600;async function mt(e){if(!/^image\/(jpeg|png|webp)$/.test(e.type))return e;try{let t=await createImageBitmap(e),n=Math.min(1,pt/Math.max(t.width,t.height));if(n===1&&e.size<921600)return e;let r=document.createElement(`canvas`);r.width=Math.round(t.width*n),r.height=Math.round(t.height*n),r.getContext(`2d`).drawImage(t,0,0,r.width,r.height);let i=await new Promise(e=>r.toBlob(e,`image/jpeg`,.82));return i?new File([i],e.name.replace(/\.\w+$/,``)+`.jpg`,{type:`image/jpeg`}):e}catch{return e}}function ht(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result).split(`,`)[1]||``),r.onerror=()=>n(new et(400,`No se pudo leer el archivo.`)),r.readAsDataURL(e)})}async function gt(e){if(!e)throw new et(400,`Elegí un archivo.`);if(!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(e.type))throw new et(400,`Solo se aceptan fotos (JPG, PNG, WEBP) o PDF.`);let t=await mt(e);if(t.size>3670016)throw new et(413,`El archivo es muy pesado (máximo 3,5 MB).`);return{nombre:t.name,mime:t.type,base64:await ht(t)}}var _t={async subir(e,t,n={}){let r=await tt(`/api/archivos`,{method:`POST`,body:{tipo:e,archivo:await gt(t),...n}});return lt(`archivos`,r.registro),Qe(`archivos`),r.registro},async abrir(e){let t=window.open(``,`_blank`);try{let n=await fetch(`/api/archivos?id=${encodeURIComponent(e)}`,{headers:{Authorization:`Bearer ${_.token()}`}});if(!n.ok){let e=await n.json().catch(()=>({}));throw new et(n.status,e.error||`No se pudo abrir el archivo.`)}let r=URL.createObjectURL(await n.blob());t?t.location.href=r:window.location.href=r,setTimeout(()=>URL.revokeObjectURL(r),6e4)}catch(e){throw t?.close(),e}}};function vt(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function yt(){return oe(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${bt()}
      ${xt()}
      ${St()}
      ${Et()}
      <a class="whatsapp" href="${re(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function bt(){return`
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
  `}function xt(){return`
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

    ${Ct()}

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
  `}function St(){return`
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
  `}function Ct(){return`
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

        ${wt()}
      </div>
    </section>
  `}function wt(){return vt()?`
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
  `}function Tt(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`),e.get(`carnet`)?.size?`Carnet de vacunas: lo adjunté en el formulario de la página.`:null].filter(e=>e!==null).join(`
`)}function Et(){return`
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
  `}function Dt(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(re(Tt(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`;let a=i.get(`carnet`),o=Object.fromEntries([...i.entries()].filter(([e])=>e!==`carnet`));(async()=>{if(a&&a.size)try{o.carnet=await gt(a)}catch(e){n.textContent=`${e.message} Tu pedido igual se envía; el carnet mandalo por WhatsApp.`}await ft(o)})().then(()=>{n.textContent=o.carnet?`Listo: recibimos tu pedido y el carnet. Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`:`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function Ot(){document.addEventListener(`submit`,Dt)}var kt=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),At={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function jt(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function Mt(){let e=_.user();if(e)return Nt(e);At.necesitaConfiguracion===null&&!At.cargando&&(At.cargando=!0,_.status().then(e=>{At.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{At={...At,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{At.cargando=!1,$()}));let t=At.necesitaConfiguracion===!0;return oe(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${At.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Código de configuración <input name="codigo" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Te lo pasó JUAN 3.0" /></label>`:``}
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>`}
        <p class="acc-status ${At.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${kt(At.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function Nt(e){return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${kt(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${kt(e.usuario)}</strong> (${kt(e.rol)}).</p>
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
  `)}function Pt(){return oe(`
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
  `)}function Ft(e){let t=_.user(),n=nt[t?.rol]||[];return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${kt(t?.nombre)}</strong> (${kt(t?.rol)}) y la página de ${kt(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function It(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function Lt(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return It(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return It(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return It(t,`Completá usuario y PIN.`,!0);i.disabled=!0,It(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await _.changePin(r.actual,r.nuevo);t.reset(),It(t,`Listo: tu PIN quedó cambiado.`),it(e.rol)!==`/`&&setTimeout(()=>lh(it(e.rol)),900);return}let e=n===`setup`?await _.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin,codigo:r.codigo}):await _.login(r.usuario,r.pin);if(At={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){lh(`/login`);return}let i=jt();lh(i&&(nt[e.rol]||[]).includes(i.slice(1))?i:it(e.rol))}catch(e){It(t,e instanceof et?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function Rt(){document.addEventListener(`submit`,Lt)}var b=`Pendiente de confirmar`,zt=`12/11/2026`,Bt={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},Vt=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Ht={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},x={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},S=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],Ut=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],Wt={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Gt=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Kt={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},C=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),qt=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Jt=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],Yt=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function Xt(e,t,n){return!!e.schedule?.[t]?.includes(n)}function Zt(e=new Date){return S[(e.getDay()+6)%7]}function Qt(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var $t=[[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Flora`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,20,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Lunes`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Coqui`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Manolo`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Lunes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Martes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:15`,`Forest`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:30`,`Sam`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:45`,`Coqui`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:00`,`Manolo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Séptima`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Rambo`,20,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam ni Cashi`],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Morris`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:45`,`Lokaku`,45,`Bozal`],[`Miércoles`,`Mañana`,`PJ_1M`,`11:00`,`Paco`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Tayler`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Duque`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:30`,`Rambo`,20,``],[`Miércoles`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:30`,`Annie`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:45`,`Séptima`,45,`Sin días contratados cargados`],[`Miércoles`,`Tarde`,`PJ_2T`,`16:00`,`Milo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:15`,`Flora`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Jueves`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`11:00`,`Rambo`,20,``],[`Jueves`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`14:45`,`Forest`,45,`Bozal`],[`Jueves`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Jueves`,`Tarde`,`PJ_1T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Jueves`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`16:15`,`Rambo`,20,`Revisar duración`],[`Viernes`,`Mañana`,`PJ_1M`,`09:45`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Runa`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:50`,`Kiara`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Flora`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Viernes`,`Tarde`,`PJ_2T`,`14:45`,`Coqui`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`16:00`,`Séptima`,45,`Sin días contratados cargados`],[`Viernes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Viernes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,5,`Revisar duración`],[`Sábado`,`Mañana`,`PJ_1M`,`09:15`,`Sam`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`14:45`,`Forest`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Roma`,55,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Milo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`16:00`,`Tayler`,45,``]],en={"Lunes|Mañana":`Juan`,"Lunes|Tarde":`Nicolás`,"Martes|Mañana":`Juan`,"Martes|Tarde":`Nicolás`,"Miércoles|Mañana":`Juan`,"Miércoles|Tarde":`Nicolás`,"Jueves|Mañana":`Juan`,"Jueves|Tarde":`Nicolás`,"Viernes|Mañana":`Nicolás`,"Viernes|Tarde":`Nicolás`,"Sábado|Mañana":`Juan`,"Sábado|Tarde":`Juan`},tn=new Map(C.map(e=>[e.name,e]));function nn(e,t){let[n,r]=e.split(`:`).map(Number),i=n*60+r+Number(t||0);return`${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}var rn=$t.map(([e,t,n,r,i,a,o])=>({dia:e,turno:t,ruta:n,hora:r,perroId:tn.get(i)?.id||null,perroNombre:i,minutos:a,salida:nn(r,a),nota:o}));function an(){let e=new Map;return rn.forEach(t=>{let n=`${t.ruta}_${t.dia.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}`;e.has(n)||e.set(n,{id:n,dia:t.dia,turno:t.turno,ruta:t.ruta,paseador:``,ayudante:``,supervisor:en[`${t.dia}|${t.turno}`]||``,paradas:[],origen:`Planilla RPJ, BASE RUTAS (12/11/2026)`}),e.get(n).paradas.push({perroId:t.perroId,perroNombre:t.perroNombre,hora:t.hora,minutos:t.minutos,nota:t.nota})}),[...e.values()].map(e=>({...e,paradas:e.paradas.sort((e,t)=>e.hora.localeCompare(t.hora))}))}var on=[`Mapuche Country Club`,`La Lonja`,`Pilar (otros barrios)`],sn={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},cn=`Tu perro`,ln={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},un=[`Pequeño`,`Mediano`,`Grande`],dn=S.filter(e=>e!==`Domingo`),fn={Mañana:x.manana,Tarde:x.tarde};function pn(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function mn(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function hn(){let e=pn(sn.plan,null);if(!e||typeof e!=`object`)return{...ln};let t=Ut.find(t=>t.id===e.planId)?e.planId:ln.planId,n=un.includes(e.size)?e.size:ln.size,r=fn[e.shift]?e.shift:ln.shift,i=Array.isArray(e.days)?dn.filter(t=>e.days.includes(t)):ln.days;return{planId:t,size:n,shift:r,days:i.length?i:ln.days}}function gn(){let e=pn(sn.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function _n(){let e=pn(sn.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function vn(e){let t=pn(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function yn(){let e=pn(sn.carnet,null);return e&&typeof e.name==`string`?e:null}function w(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function bn(e){return`https://wa.me/${Bt.whatsapp}?text=${encodeURIComponent(e)}`}function xn(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function Sn(e,t){return new Date(e.getTime()+t*864e5)}function Cn(e){return S[(e.getUTCDay()+6)%7]}function wn(e){return e.toISOString().slice(0,10)}function Tn(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function En(e){let[t,n,r]=e.split(`-`).map(Number);return Tn(new Date(Date.UTC(t,n-1,r)))}function Dn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function On(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function kn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function An(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function jn(e,t,n){return`${e} ${e===1?t:n}`}function Mn(){let e=hn(),t=Ut.find(t=>t.id===e.planId),n=fn[e.shift],r=gn(),i=xn(),a=wn(i.date),o=_n().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||cn}}function Nn(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=Cn(r.date),s=On(n.from),c=On(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function Pn(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=Sn(a.date,e);r.days.includes(Cn(t))&&(e===0&&a.minutes>On(i.to)||n&&o.has(wn(t))||s.push(t))}return s}var Fn=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],In=Fn.flatMap(e=>e.fields);function Ln(e,t){return!!String(e[t]??``).trim()}function Rn(e,t){return t.fields.filter(t=>Ln(e,t.key)).length}function zn(e){return In.filter(t=>Ln(e,t.key)).length}function Bn(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function Vn(e){let{ficha:t}=e,n=[],r=Fn.find(e=>e.id===`emergencia`);Rn(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),yn()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=zn(t);return i<In.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${In.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function Hn(e){return e.todayIso<=r.until}var Un={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function Wn(e,t,n=``){Un.status[e]={message:t,html:n}}function Gn(e){let t=Un.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${w(t.message)} ${t.html}`.trim():``}</p>`}function Kn(){return`
    <div class="cl-page" data-cl-root>
      ${qn(Mn())}
    </div>
  `}function qn(e){return`
    <p class="cl-demo-note">
      ${g(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${Jn(e)}
    ${Qn(e)}
    ${er()}
    ${tr(e)}
    ${nr(e)}
    ${rr(e)}
    <div class="cl-two-col">
      ${cr()}
      ${lr(e)}
    </div>
    ${Hn(e)?ur():``}
    ${dr()}
  `}function Jn(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=Nn(e),c=Bn(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=Pn(e,1)[0],d=u&&wn(u)===e.todayIso,f=Vn(e),p={libre:`Los días de paseo de tu plan son ${An(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${g(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${w(a)}</strong>
            <small>${w(i.name)} · ${w(r.size)} · Turno ${w(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${w(Cn(t.date))} ${Tn(t.date)}</p>
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
        <div data-cl-region="alertas-hoy">${Xn(c,!0)}</div>
        ${Zn(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${g(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:w(Cn(u))}</p>
            <p class="cl-next-date">${d?`${w(Cn(u))} ${Tn(u)}`:Tn(u)}</p>
            <p class="cl-next-shift">Turno ${w(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${b}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${Yn(e,f)}</div>
        </article>
      </div>
    </section>
  `}function Yn(e,t=Vn(e)){return t.length?`
    <ol class="cl-pending-list">
      ${t.map((e,t)=>`
        <li>
          <button type="button" class="cl-pending-item" data-cl-go="${e.go}">
            <span class="cl-pending-num" aria-hidden="true">${t+1}</span>
            <span>
              <strong>${w(e.text)}</strong>
              <small>${w(e.detail)}</small>
            </span>
            ${g(`arrowRight`,`cl-icon-sm`)}
          </button>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="cl-all-done">${g(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function Xn(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${g(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${w(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function Zn(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=Sn(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${S.map((e,t)=>Sn(a,t)).map(e=>{let t=wn(e),a=Cn(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${Tn(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${kn(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function Qn(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${g(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${bn(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${w(Bt.whatsappLabel)}</small></span>
      </a>
      ${Hn(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${g(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${w(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function $n(){return`Ahora: tema ${Ne()?`oscuro`:`claro`} · movimiento ${Pe()?`calmo (sin movimiento)`:`normal`}.`}function er(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${g(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${$n()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function tr(e){let t=Pn(e,10);return`
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
                ${t.map(t=>`<option value="${wn(t)}">${w(Cn(t))} ${Tn(t)} · turno ${w(e.settings.shift.toLowerCase())}</option>`).join(``)}
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
          ${Gn(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${w(Cn(Dn(e.date)))} ${En(e.date)}</strong>
                    ${e.reason?`<small>${w(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${w(e.date)}" aria-label="Quitar la ausencia del ${En(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function nr(e){let{plan:t,settings:n,shift:r}=e,i=Wt[n.size],a=n.days.length===t.walks;return`
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
          <p class="cl-plan-name">${w(t.name)}</p>
          <p class="cl-plan-walks">${jn(t.walks,`paseo`,`paseos`)} por semana · ${w(n.size)}</p>
          <p class="cl-plan-price"><b>${Qt(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${dn.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${kn(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${w(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${b}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${g(`alertCircle`,`cl-icon-sm`)} El ${w(t.name)} incluye ${jn(t.walks,`paseo`,`paseos`)} por semana y hay ${jn(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${w(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${Ut.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${w(e.name)}</strong>
            <span>${jn(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${Qt(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${w(n.size.toLowerCase())}):</strong> individual ${Qt(i.individual)} · en grupo ${Qt(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Gt.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${Un.openGroups.has(`plan`)?`open`:``}>
        <summary>${g(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${Ut.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${w(e.name)} · ${jn(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${un.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(fn).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${dn.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${Gn(`plan`)}
        </div>
      </details>
    </section>
  `}function rr(e){let{ficha:t}=e,n=zn(t),r=In.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${w(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${b}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${ir(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${w(Kt[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${b}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${Xn(Bn(t))}</div>

      <div class="cl-ficha-groups">
        ${Fn.map(e=>or(e,t)).join(``)}
      </div>
      ${Gn(`ficha`)}
    </section>
  `}function ir(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function ar(e,t){let n=Rn(e,t);return n===t.fields.length?`<span class="cl-count is-done">${g(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${b.toLowerCase()}</span>`}function or(e,t){let n=Un.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${g(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${ar(t,e)}</span>
        ${g(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>sr(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function sr(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${b}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${w(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${w(e.placeholder||`Pendiente de confirmar`)}">${w(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${w(r)}" placeholder="${w(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${Ln(t,e.key)?``:b}</small>`:``}
    </label>
  `}function cr(){let e=yn();return`
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
        <div><dt>Archivo</dt><dd>${e?w(e.name):`Sin archivo`}</dd></div>
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${w(e.date)}`:b}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${bn(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${Gn(`carnet`)}
    </section>
  `}function lr(e){let t=vn(sn.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${Qt(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${bn(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
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
              <span><strong>${w(e.name)}</strong><small>Cargado el ${w(e.date)} · Pendiente de confirmación</small></span>
            </li>
          `).join(``)}
        </ul>
        <a class="cl-btn is-secondary" href="${bn(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${g(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${Gn(`comprobante`)}
    </section>
  `}function ur(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${g(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${w(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${w(r.title)}</h2>
        <p>${w(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${bn(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function dr(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${g(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${Un.resetArmed?`is-danger`:``}" data-cl-reset>
        ${Un.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${Gn(`privacidad`)}
    </section>
  `}function fr(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=qn(Mn()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function pr(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=Mn();Object.entries({pendientes:()=>Yn(t),"alertas-hoy":()=>Xn(Bn(t.ficha),!0),"alertas-ficha":()=>Xn(Bn(t.ficha)),"ficha-progreso":()=>ir(zn(t.ficha),In.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),Fn.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=ar(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=Ln(t.ficha,e.dataset.clFieldState)?``:b})}function mr(e,t,n=``){Wn(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${w(t)} ${n}`.trim())}function hr(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,Un.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Pe()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function gr(){return Tn(xn().date)}function _r(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return hr(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=Mn(),r=_n().filter(t=>t.date!==e);r.push({date:e,reason:t}),mn(sn.ausencias,r);let i=bn([`Hola, aviso que ${n.dogName===cn?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${Cn(Dn(e)).toLowerCase()} ${En(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),Wn(`ausencia`,`Listo: anotamos la ausencia del ${En(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),fr(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return mn(sn.ausencias,_n().filter(t=>t.date!==e)),Wn(`ausencia`,`Quitamos la ausencia del ${En(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),fr(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=Ut.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(mr(`plan`,`El ${r.name} incluye ${jn(r.walks,`paseo`,`paseos`)} por semana: elegí ${jn(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(mn(sn.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),Wn(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),fr(`[data-cl-plan-save]`),!0):(mr(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return Un.resetArmed?(Object.values(sn).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),Un.resetArmed=!1,Un.status={},Wn(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),fr(`[data-cl-reset]`),!0):(Un.resetArmed=!0,fr(`[data-cl-reset]`),!0);if(Un.resetArmed&&!e.target.closest(`[data-cl-reset]`)){Un.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function vr(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:gr()};if(t.dataset.clFile===`carnet`)mn(sn.carnet,n),Wn(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),fr(`[data-cl-status='carnet']`);else{let t=[n,...vn(sn.comprobantes)].slice(0,10);mn(sn.comprobantes,t),Wn(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),fr(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=gn();mr(`ficha`,mn(sn.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function yr(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=gn();mn(sn.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),pr()}function br(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?Un.openGroups.add(t.dataset.clDetails):Un.openGroups.delete(t.dataset.clDetails))}function xr(){_e.push(_r),ve.push(vr),document.addEventListener(`input`,yr),document.addEventListener(`toggle`,br,!0),Fe(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${$n()} Se guarda solo en este dispositivo.`)})}var Sr=`America/Argentina/Buenos_Aires`,Cr=`paseosJuan_paseador_progreso`,wr=`paseosJuan_paseador_equipo`,Tr=`paseosJuan_paseador_incidente`,Er=`paseosJuan_paseador_ruta`,T=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],Dr={pendiente:0,retirado:1,paseando:2,entregado:3},Or=`no-sale`,kr={Mañana:`manana`,Tarde:`tarde`},Ar=/^[a-z0-9][a-z0-9_.-]{0,60}$/i,jr={Mañana:x.manana,Tarde:x.tarde},Mr=[`Bajo`,`Medio`,`Alto`],Nr=[`No se ven`,`Sí`,`No sé`],Pr=`Perro externo`,Fr=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,Ir=an(),E={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``,routeChange:null};function D(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Lr(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Rr(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function zr(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim().toLowerCase()}function Br(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Sr,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:Zt(t)}}function Vr(e){let[t,n,r]=String(e).split(`-`);return r?`${r}/${n}/${t}`:e}function Hr(e,t){let n=(S.indexOf(e)-S.indexOf(t.day)+7)%7,[r,i,a]=t.iso.split(`-`).map(Number);return new Date(Date.UTC(r,i-1,a+n)).toISOString().slice(0,10)}function Ur(e){return e.minutes<810?`Mañana`:`Tarde`}function Wr(){let e=Br(),t=E.day||e.day,n=E.shift||Ur(e),r=t===e.day;return{now:e,day:t,shift:n,isToday:r,iso:r?e.iso:Hr(t,e)}}function Gr(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Kr(e){let t=jr[e];return`${t.from} a ${t.to}`}function qr(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}function Jr(e){if(e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t} h ${n} min`:`${t} h`}function Yr(e,t,n=`retiro`){let r=qr(e);if(r===null)return{text:`Hora: ${b.toLowerCase()}`,kind:`info`};let i=r-t;return i>0?{text:`${n===`entrega`?`Entrega `:``}${n===`entrega`?`en`:`En`} ${Jr(i)}`,kind:i<=10?`soon`:`ok`}:i===0?{text:n===`entrega`?`Entrega ahora`:`Ahora`,kind:`soon`}:{text:n===`entrega`?`Entrega con ${Jr(-i)} de atraso`:`${Jr(-i)} de atraso`,kind:`late`}}function Xr(e,t,n=`retiro`){let r=Yr(e,t,n);return`<span class="pw-cd pw-cd--${r.kind}" data-pw-countdown="${D(e)}" data-pw-mode="${n}">${D(r.text)}</span>`}function Zr(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function Qr(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function $r(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${Gr(i)}`),t=t.filter(e=>!e.includes(r))}return n}function ei(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function ti(e){return e.safety.some(e=>/bozal/i.test(e))}var ni=qt.filter(e=>e.sebastian>0),ri=qt.filter(e=>e.sebastian===0&&e.juan>0),ii=qt.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function ai(){return _.user()||{}}function oi(){return ai().nombre||`equipo`}function si(){return ai().rol===`ayudante`}function ci(e){let t=ai();if(!e||!t.usuario)return!1;let n=zr(e);return n===zr(t.usuario)||t.nombre&&n===zr(t.nombre)}function li(e,t=new Map){if(!e)return``;if(ci(e))return ai().nombre||String(e);let n=String(e);return t.get(n)||t.get(zr(n))||Vt.find(e=>e.id===zr(n))?.name||n}function ui(e,t){return zr(e)===zr(t)}function di(e){return zr(e).startsWith(`tarde`)?`Tarde`:`Mañana`}function fi(e){return C.find(t=>t.id===e.perroId)||C.find(t=>zr(t.name)===zr(e.perroNombre))||{id:Ar.test(String(e.perroId||``))?String(e.perroId):``,name:String(e.perroNombre||`Perro sin nombre`),size:b,minutes:null,safety:[],status:`Activo`,unknown:!0}}function pi(e,t){let n=(Array.isArray(e.paradas)?e.paradas:[]).filter(e=>e&&(e.perroId||e.perroNombre)).map((e,t)=>{let n=fi(e),r=Number(e.minutos)||n.minutes||null,i=qr(e.hora)===null?``:String(e.hora).trim().padStart(5,`0`);return{index:t,dog:n,hora:i,minutos:r,salida:i&&r?nn(i,r):``,nota:String(e.nota||``).trim(),canSave:!!n.id}}).sort((e,t)=>(qr(e.hora)??9999)-(qr(t.hora)??9999)||e.index-t.index);return{ruta:String(e.ruta||`Pendiente de confirmar`),turno:di(e.turno),dia:e.dia||``,paseador:String(e.paseador||``),ayudante:String(e.ayudante||``),supervisor:String(e.supervisor||``),notas:String(e.notas||``),fuente:t,record:e,stops:n}}function mi(e,t,n){let r=new Map;v.cached(`rutas`,{desde:n}).filter(t=>t.fecha===e&&t.ruta&&Array.isArray(t.paradas)).sort((e,t)=>String(e.actualizadoEn||``).localeCompare(String(t.actualizadoEn||``))).forEach(e=>r.set(e.ruta,e));let i=v.cached(`plantillas`).filter(e=>e.ruta&&Array.isArray(e.paradas)),a=i.length===0,o=new Map;return(a?Ir:i).filter(e=>ui(e.dia,t)).forEach(e=>o.set(e.ruta,pi(e,a?`planilla`:`plantilla`))),r.forEach((e,t)=>o.set(t,pi(e,`dia`))),[...o.values()].sort((e,t)=>e.turno===t.turno?e.ruta.localeCompare(t.ruta):e.turno===`Mañana`?-1:1)}function hi(e){let t=Lr(Er,{})?.[ai().usuario||``];return t&&t.iso===e.iso&&t.turno===e.shift?t.ruta:``}function gi(e,t){let n=Lr(Er,{}),r=n&&typeof n==`object`?n:{};r[ai().usuario||``]=t?{iso:e.iso,turno:e.shift,ruta:t}:null,Rr(Er,r)}function _i(e){let t=mi(e.iso,e.day,e.now.iso),n=t.filter(t=>t.turno===e.shift),r=n.filter(e=>ci(e.paseador)||ci(e.ayudante)),i=t.filter(t=>t.turno!==e.shift&&(ci(t.paseador)||ci(t.ayudante))),a=r.length?``:n.some(t=>t.ruta===hi(e))?hi(e):``,o=r.length?r:a?n.filter(e=>e.ruta===a):n;return{all:t,ofShift:n,mine:r,elsewhere:i,picked:a,shown:o,assigned:r.length>0,helping:r.find(e=>ci(e.ayudante)&&!ci(e.paseador))||null,fromPlanilla:o.some(e=>e.fuente===`planilla`)}}function vi(e){return e.flatMap(e=>e.stops.map(t=>({...t,route:e})))}function yi(e,t){return vi(_i(e).shown).find(e=>e.dog.id===t)||null}var bi=new Map;function xi(e,t){if(!e.isToday||!O.ready)return;let n=[];t.forEach(r=>{let i=`${e.iso}|${r.turno}|${r.ruta}`,a=new Map(r.stops.map(e=>[e.dog.id||zr(e.dog.name),e])),o=bi.get(i);if(bi.set(i,a),!o)return;let s=[...a.entries()].filter(([e])=>!o.has(e)).map(([,e])=>`${e.dog.name}${e.hora?` (${e.hora})`:``}`),c=[...o.entries()].filter(([e])=>!a.has(e)).map(([,e])=>e.dog.name),l=[...a.entries()].filter(([e,t])=>o.has(e)&&o.get(e).hora!==t.hora).map(([e,t])=>`${t.dog.name} pasa de ${o.get(e).hora||`sin hora`} a ${t.hora||`sin hora`}`),u=[];s.length&&u.push(`se ${s.length===1?`sumó`:`sumaron`} ${Gr(s)}`),c.length&&u.push(`se ${c.length===1?`quitó`:`quitaron`} ${Gr(c)}`),l.length&&u.push(`cambió el horario: ${Gr(l)}`),u.length&&n.push(`${t.length>1?`${r.ruta}: `:``}${u.join(` / `)}`)}),n.length&&(E.routeChange={text:`La ruta cambió: ${n.join(`. `)}.`,time:e.now.time},k(E.routeChange.text))}function Si(e){return v.cached(`avisos`).filter(t=>{let n=String(t.fecha||``),r=String(t.vigenteHasta||``);return n&&n>e?!1:r?r>=e:n===e}).sort((e,t)=>String(t.actualizadoEn||t.fecha||``).localeCompare(String(e.actualizadoEn||e.fecha||``)))}function Ci(e){let t=Si(e.now.iso);return t.length?`
    <section class="pw-notices" aria-labelledby="pw-avisos-title">
      <h2 class="pw-section-label" id="pw-avisos-title">${g(`bell`,`pw-icon pw-icon--sm`)} Avisos por barrio (${t.length})</h2>
      <ul class="pw-notice-list" role="list">
        ${t.map(e=>{let t=/seguridad|perro suelto/i.test(e.tipo||``);return`
            <li class="pw-notice ${t?`pw-notice--danger`:``}">
              ${g(t?`alertTriangle`:`mapPin`,`pw-icon`)}
              <div>
                <p class="pw-notice-head"><strong>${D(e.barrio||`Barrio sin cargar`)}</strong>${e.tipo?` · ${D(e.tipo)}`:``}</p>
                <p>${D(e.mensaje||e.titulo||``)}</p>
                <p class="pw-notice-meta">${e.vigenteHasta?`Vigente hasta el ${D(Vr(e.vigenteHasta))}`:`Vigente hoy`}${e.creadoPorNombre?` · Avisó ${D(e.creadoPorNombre)}`:``}</p>
              </div>
            </li>
          `}).join(``)}
      </ul>
    </section>
  `:``}function wi(e,t,n){return`${e}_${t}_${kr[n]}`}function Ti(e,t,n=ai().usuario){return`${e}_${n||`sin-usuario`}_${kr[t]}`}var Ei=new Map;function Di(e,t){let n=new Map(v.cached(e,{desde:t}).map(e=>[e.id,e]));return Ei.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function Oi(e){let t=T.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===Or;return{step:r?0:Math.max(Dr[e.estado]??0,n),noSale:r,times:t,record:e}}function ki(e,t,n){let r=Di(`paseos`,e);return Object.fromEntries(n.filter(e=>e.id).map(n=>[n.id,Oi(r.get(wi(e,n.id,t)))]))}function Ai(e,t){return t.dog.id&&e[t.dog.id]||Oi(null)}function ji(e,t){let n=e.filter(e=>Ai(t,e).noSale).length,r=e.filter(e=>!Ai(t,e).noSale&&Ai(t,e).step>=T.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function Mi(e,t){let n=Di(`checklists`,e).get(Ti(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:ni.filter(e=>r[e.item]===!0).map(e=>e.item)}}function Ni(e){let t=new Map,n=(e,n)=>{e&&n&&t.set(String(e),String(n))};return[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]].forEach(([e,t])=>{v.cached(e,t).forEach(e=>{n(e.creadoPor,e.creadoPorNombre),n(e.actualizadoPor,e.actualizadoPorNombre),T.forEach(t=>n(e[`${t.field}Por`],e[`${t.field}PorNombre`]))})}),t}function Pi(e,t){return e?ci(e)?`vos`:li(e,t):b}function Fi(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Sr,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Ii(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Fi(e.actualizadoEn);return`Último cambio: ${Pi(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}function Li(e,t,n){let r=T[t].field,i=e?.[`${r}Por`];return!i||ci(i)?``:e[`${r}PorNombre`]||li(i,n)}var Ri=Promise.resolve();function zi(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&Ei.set(r,n);let i=Ri.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await v.save(e,i);return E.syncError&&=``,t}catch(e){return E.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,xa(E.syncError),null}finally{r&&Ei.get(r)===n&&Ei.delete(r),Ea()}});return Ri=i.catch(()=>null),i}function Bi(e,t,n,r){let i=t.now.iso,a={id:wi(i,e.dog.id,t.shift),fecha:i,perroId:e.dog.id,perroNombre:e.dog.name,turno:t.shift,ruta:e.route.ruta,...n};return k(r),zi(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&k(`${r} Sin señal: se enviará cuando haya señal.`)})}function Vi(e,t){let n=e.now.iso,r=Object.fromEntries(ni.map(e=>[e.item,t.includes(e.item)])),i={id:Ti(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=ni.length};return zi(`checklists`,i,{optimisticRecord:i})}var O={key:``,stops:[],ready:!1};function Hi(e){let t=`${e}|${ai().usuario||``}`;if(O.key===t)return;O.stops.forEach(e=>e()),O.key=t,O.stops=[],O.ready=!1;let n=[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]];Promise.allSettled(n.map(([e,t])=>v.list(e,t))).then(t=>{let n=t.find(e=>e.status===`rejected`);return n&&(E.syncError=`No se pudieron traer los datos del equipo: ${n.reason?.message||`error del servidor`}`,xa(E.syncError)),Wi(e)}).catch(()=>null).finally(()=>{O.key===t&&(O.ready=!0,Ea(),O.stops=n.map(([e,t])=>v.watch(e,t)))})}var Ui=!1;async function Wi(e){if(Ui)return;Ui=!0;let t=Lr(Cr,null),n=Lr(wr,null);if(!t&&!n)return;let r=[],i=Di(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&kr[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=C.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=wi(e,t,o),c=Oi(i.get(s)),l=Math.min(n.length,T.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:T[l-1].estado};T.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(zi(`paseos`,u,{optimisticRecord:u}))})});let a=Di(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!kr[o]||!Array.isArray(n))return;let s=n.filter(e=>ni.some(t=>t.item===e));s.length&&!a.has(Ti(e,o))&&r.push(Vi({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(Cr),localStorage.removeItem(wr)}catch{}r.length&&k(`Se subió al equipo lo que tenías marcado en este celular.`)}}function Gi(){let e=Lr(Tr,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function Ki(e){return`
    <div class="pw-shell">
      ${Ji()}
      ${e}
    </div>
  `}function qi(){let e=Wr();Hi(e.now.iso);let t=_i(e);xi(e,t.shown),Pa.iso=e.now.iso,Pa.shift=Ur(e.now),Pa.minute=e.now.minutes;let n=vi(t.shown),r=e.isToday?ki(e.iso,e.shift,n.map(e=>e.dog)):{},i=Ni(e.now.iso);return`
    <main class="pw-main" id="pw-inicio">
      ${Yi()}
      ${Xi()}
      ${Ci(e)}
      ${Qi(e,t,n,r,i)}
      <div class="pw-routes" id="pw-perros" tabindex="-1" aria-label="Perros de la ruta">
        ${t.shown.length?t.shown.map(n=>ia(n,e,t,r,i)).join(``):`
            <div class="pw-empty">
              <p><strong>No hay rutas cargadas para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
              <p>Si te pidieron un paseo, confirmalo con el coordinador o con Juan.</p>
            </div>
          `}
      </div>
      <div class="pw-columns">
        ${sa(e,t,i)}
        ${ca(e,n.map(e=>e.dog))}
      </div>
      <footer class="pw-footer">
        <p>Rutas y horarios: los arma el coordinador. Punto de partida: ${D(Bt.officialSources.routes)} (12/11/2026).</p>
        <p>Lo que marcás acá lo ven ${si()?`el paseador, `:`tu ayudante, `}Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `}function Ji(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel ${si()?`del ayudante de paseador`:`del paseador`}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>${si()?`Ayudante`:`Paseador`} · ${D(oi())}</small>
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
  `}function Yi(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${g(`uploadCloud`,`pw-icon`)}<span>${D(n)}</span></p>`),E.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${g(`alertTriangle`,`pw-icon`)}
        <span>${D(E.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function Xi(){return E.routeChange?`
    <div class="pw-change" data-pw-change>
      ${g(`route`,`pw-icon pw-icon--lg`)}
      <div>
        <strong>${D(E.routeChange.text)}</strong>
        <p>Lo cambió el coordinador. Aviso recibido a las ${D(E.routeChange.time)}.</p>
      </div>
      <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-change-ok>Entendido</button>
    </div>
  `:``}function Zi(e){let t=e.flatMap(e=>e.stops.map(e=>e.hora)).filter(Boolean).sort(),n=e.flatMap(e=>e.stops.map(e=>e.salida)).filter(Boolean).sort();return t.length?`${t[0]} a ${n[n.length-1]||t[t.length-1]}`:``}function Qi(e,t,n,r,i){let a=t.helping,o=t.mine[0]||null,s=e.isToday?`hoy, ${e.day.toLowerCase()}`:`${e.day.toLowerCase()} ${Vr(e.iso)}`,c;c=a?`Acompañás a ${D(li(a.paseador,i)||`un paseador sin asignar`)} en ${D(a.ruta)}`:o?t.mine.length>1?`Tus rutas de ${s}: ${D(Gr(t.mine.map(e=>e.ruta)))}`:`Tu ruta de ${s}: ${D(o.ruta)}`:`Rutas de ${s} · turno ${e.shift.toLowerCase()}`;let l=`Hola, ${D(oi())}`,u=e.isToday?`${l} · ${e.now.date} · turno ${e.shift.toLowerCase()}`:`${l} · Planificación: no es hoy`,d=[...new Set(t.shown.map(e=>e.supervisor).filter(Boolean))],f=d.length?Gr(d):jr[e.shift].supervisor,p=Zi(t.shown)||Kr(e.shift),m=n.filter(e=>e.dog.status!==`Activo`),h=Qr(n.map(e=>e.dog)),ee=[];if(t.assigned&&t.shown.length===1){let e=t.shown[0];a?ee.push(`<li>Paseador: <b>${D(li(e.paseador,i)||`Pendiente de confirmar`)}</b></li>`):ee.push(`<li>Ayudante: ${e.ayudante?`<b>${D(li(e.ayudante,i))}</b>`:`sin ayudante`}</li>`)}return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${u}</p>
          <h1 id="pw-today-title" tabindex="-1">${c}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${n.length}</b> ${n.length===1?`perro`:`perros`}</li>
            <li>${D(p)}</li>
            <li>Supervisa: ${D(f)}</li>
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
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${E.pickerOpen}" aria-controls="pw-picker">
            ${g(`sliders`,`pw-icon`)}
            ${E.pickerOpen?`Cerrar selector`:`Cambiar día o turno`}
          </button>
        </div>
      </div>
      ${E.pickerOpen?ea(e):``}
      ${t.fromPlanilla?`
        <p class="pw-source pw-source--warn">${g(`alertCircle`,`pw-icon`)}<span><b>Ruta tomada de la planilla, falta que el coordinador la confirme.</b> Horarios de BASE RUTAS (12/11/2026).</span></p>
      `:``}
      ${$i(e,t)}
      ${ta(e,n,m,h,r)}
    </section>
  `}function $i(e,t){let n=[];if(!t.assigned&&t.elsewhere.length){let r=t.elsewhere[0];n.push(`
      <p class="pw-source">
        ${g(`route`,`pw-icon`)}
        <span>${e.isToday?`Hoy`:`Ese día`} figurás en la ruta <b>${D(r.ruta)}</b> (turno ${r.turno.toLowerCase()}).</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-shift="${r.turno}">Ver turno ${r.turno.toLowerCase()}</button>
      </p>
    `)}return!t.assigned&&t.ofShift.length&&n.push(`
      <div class="pw-route-pick" role="group" aria-labelledby="pw-route-pick-label">
        <p id="pw-route-pick-label"><strong>¿En qué ruta estás ${e.isToday?`hoy`:`ese día`}?</strong>
          <span>No figurás como paseador ni ayudante en este turno. Si es un error, avisale al coordinador.</span></p>
        ${t.ofShift.length>1?`
          <div class="pw-route-chips">
            ${t.ofShift.map(e=>`
              <button type="button" class="pw-chip pw-chip--wide ${t.picked===e.ruta?`is-active`:``}" data-pw-route="${D(e.ruta)}" aria-pressed="${t.picked===e.ruta}">
                ${D(e.ruta)}<small>${e.stops.length} ${e.stops.length===1?`perro`:`perros`}${e.paseador?` · ${D(li(e.paseador))}`:``}</small>
              </button>
            `).join(``)}
            <button type="button" class="pw-chip pw-chip--wide ${t.picked?``:`is-active`}" data-pw-route="" aria-pressed="${!t.picked}">
              Todas<small>${t.ofShift.length} rutas</small>
            </button>
          </div>
          <p class="pw-muted pw-small">Lo que elijas queda recordado en este celular.</p>
        `:``}
      </div>
    `),n.join(``)}function ea(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
    <div class="pw-picker" id="pw-picker">
      <div class="pw-picker-group" role="group" aria-label="Día">
        <span class="pw-picker-label">Día</span>
        <div class="pw-days">
          ${S.map(n=>`
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
              ${t}<small>${Kr(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function ta(e,t,n,r,i){let a=[],o=t.map(e=>e.dog);r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${$r(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let s=o.filter(ti);if(s.length){let e=!si()&&s.length>ii;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${Gr(s.map(e=>e.name))}`,text:e?`Según el inventario tenés ${ii} ${ii===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${Gr(n.map(e=>e.dog.name))}`,text:n.length===1?`Figura en la ruta con estado "${D(n[0].dog.status)}". No lo retires sin confirmarlo con el coordinador o con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con el coordinador o con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=Mi(e.now.iso,e.shift).checked.length,r=ji(t,i);n<ni.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${ni.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return a.length?`
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
  `:``}function na(e,t){if(e.fuente===`dia`){let n=e.record.actualizadoPor?Pi(e.record.actualizadoPor,t):``,r=e.record.actualizadoEn?Fi(e.record.actualizadoEn):``;return`Cambio del día${n?` cargado por ${n}`:``}${r?` a las ${r}`:``}.`}return e.fuente===`plantilla`?`Plantilla semanal del coordinador.`:`Planilla RPJ (sin confirmar).`}function ra(e,t,n){let r=e.stops.filter(e=>e.canSave);if(!e.stops.length)return``;if(!t.isToday){let t=e.stops[0];return`
      <div class="pw-next" data-pw-next="${D(e.ruta)}">
        <p class="pw-next-label">Primer retiro</p>
        <p class="pw-next-main">${D(t.dog.name)}${t.hora?` · ${D(t.hora)}`:``}</p>
      </div>
    `}let i=r.filter(e=>!Ai(n,e).noSale&&Ai(n,e).step===0),a=r.filter(e=>{let t=Ai(n,e);return!t.noSale&&t.step>0&&t.step<T.length}),o,s,c,l;if(i.length)c=i[0].hora,o=i.filter(e=>e.hora===c),s=`Próximo`,l=`retiro`;else if(a.length){let e=[...a].sort((e,t)=>String(e.salida||`99:99`).localeCompare(String(t.salida||`99:99`)));c=e[0].salida,o=e.filter(e=>e.salida===c),s=`Próxima entrega`,l=`entrega`}else return`
      <div class="pw-next pw-next--done" data-pw-next="${D(e.ruta)}">
        <p class="pw-next-label">${D(e.ruta)}</p>
        <p class="pw-next-main">${g(`checkCircle`,`pw-icon pw-icon--lg`)} Ruta completa</p>
      </div>
    `;return`
    <div class="pw-next ${Yr(c,t.now.minutes,l).kind===`late`?`is-late`:``}" data-pw-next="${D(e.ruta)}">
      <p class="pw-next-label">${l===`entrega`?`Todos retirados · próxima entrega prevista`:`Retiro que sigue`}</p>
      <p class="pw-next-main">${s===`Próximo`?`Próximo: `:``}${D(Gr(o.map(e=>e.dog.name)))}${c?` · ${D(c)}`:``}</p>
      <p class="pw-next-time">${Xr(c,t.now.minutes,l)}</p>
      <div class="pw-next-actions">
        ${o.map(t=>{let r=Ai(n,t);return`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-from-next="${D(e.ruta)}" data-pw-step="${D(t.dog.id)}" ${O.ready?``:`aria-disabled="true"`}>
              ${O.ready?`${T[r.step].action}${o.length>1?`: ${D(t.dog.name)}`:``}`:`Cargando lo marcado…`}
            </button>
          `}).join(``)}
      </div>
    </div>
  `}function ia(e,t,n,r,i){let a=Qr(e.stops.map(e=>e.dog)),o=ji(e.stops,r),s=o.toWalk?Math.round(o.delivered/o.toWalk*100):100,c=`pw-ruta-${e.ruta.replace(/[^a-z0-9]+/gi,`-`)}`,l=[];return!n.helping&&e.paseador&&!ci(e.paseador)&&l.push(`Paseador: ${li(e.paseador,i)}`),n.helping&&e.ayudante&&!ci(e.ayudante)&&l.push(`Ayudante: ${li(e.ayudante,i)}`),!n.assigned&&e.ayudante&&l.push(`Ayudante: ${li(e.ayudante,i)}`),`
    <section class="pw-section pw-route" aria-labelledby="${c}">
      <div class="pw-section-head">
        <div>
          <h2 id="${c}">Ruta ${D(e.ruta)} <span class="pw-count">${e.stops.length}</span></h2>
          <p class="pw-muted">${D(na(e,i))} En orden, con la hora de retiro.${l.length?` ${D(l.join(` · `))}.`:``}</p>
          ${e.notas?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${D(e.notas)}</p>`:``}
        </div>
        ${t.isToday&&e.stops.length?`
          <div class="pw-progress" aria-label="Avance de la ruta ${D(e.ruta)}">
            <strong>${o.delivered} de ${o.toWalk} entregados${o.noSale?` · ${o.noSale} no ${o.noSale===1?`sale`:`salen`}`:``}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${s}%"></span></span>
          </div>
        `:``}
      </div>

      ${ra(e,t,r)}

      ${a.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${g(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en esta ruta</strong>
            <ul>${$r(a).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${D(e.supervisor||jr[t.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      `:``}

      ${!t.isToday&&e.stops.length?`
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      `:``}

      ${e.stops.length?`
        <ol class="pw-dogs" role="list">
          ${e.stops.map((n,o)=>oa({...n,route:e},o,t,Ai(r,n),ei(n.dog,a),i)).join(``)}
        </ol>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros en ${D(e.ruta)} para este turno.</strong></p>
          <p>Si te pidieron un paseo, confirmalo con el coordinador.</p>
        </div>
      `}
      <p class="pw-muted pw-legend">
        Categoría operativa: <b>SIN EVALUAR</b> salvo que se indique otra. ${D(Kt[`SIN EVALUAR`])}
        Fuente: Registro maestro, 14/08/2026.
      </p>
    </section>
  `}function aa(e){return!e.nota||/^bozal$/i.test(e.nota)&&ti(e.dog)||/^no juntar/i.test(e.nota)&&e.dog.safety.some(e=>Zr(e)===`danger`)?``:e.nota}function oa(e,t,n,r,i,a){let{dog:o}=e,{times:s,noSale:c,record:l}=r,u=Math.min(r.step,T.length),d=!c&&u>=T.length,f=Ii(l,a),p=o.safety.filter(e=>Zr(e)===`danger`).join(` `),m=i.filter(e=>!p.includes(e)),h=o.safety.filter(e=>Zr(e)!==`info`),ee=o.safety.filter(e=>Zr(e)===`info`),te=o.status!==`Activo`,ne=h.length||i.length||te,re=aa(e),ie=e.minutos||o.minutes,ae=n.isToday&&e.canSave,oe=``;return n.isToday&&!c&&!d&&e.canSave&&(oe=u===0?Xr(e.hora,n.now.minutes,`retiro`):e.salida?Xr(e.salida,n.now.minutes,`entrega`):``),`
    <li class="pw-dog ${ne?`has-alert`:``} ${d?`is-done`:``} ${c?`is-nosale`:``}" data-pw-dog="${D(o.id)}">
      <div class="pw-dog-time">
        <span class="pw-dog-order" aria-label="Orden ${t+1}">${t+1}</span>
        <span class="pw-dog-hora">${e.hora?`${g(`clock`,`pw-icon pw-icon--sm`)} Retiro ${D(e.hora)}`:`Hora de retiro: ${b.toLowerCase()}`}</span>
        ${oe}
      </div>
      <div class="pw-dog-head">
        <h3>${D(o.name)}</h3>
        <span class="pw-dog-facts">${D(o.size)} · ${ie?`${ie} min`:`Duración: ${b.toLowerCase()}`}${e.salida?` · vuelve ~${D(e.salida)}`:``}</span>
      </div>

      ${ne?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${D(o.name)}">
          ${te?`
            <li class="pw-alert pw-alert--warn">
              ${g(`alertCircle`,`pw-icon`)}
              <span>${D(o.status)}: ${D(o.review||`su estado no es Activo.`)} Confirmalo con el coordinador o con Juan antes de retirarlo.</span>
            </li>
          `:``}
          ${h.map(e=>`
            <li class="pw-alert pw-alert--${Zr(e)}">
              ${g(Zr(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${D(e)}${Zr(e)===`danger`&&i.length?`<b class="pw-today-tag">En esta ruta: ${Gr(i)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${m.length?`
            <li class="pw-alert pw-alert--danger">
              ${g(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${Gr(m)}<b class="pw-today-tag">En esta ruta</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${ee.map(e=>`<p class="pw-dog-note">${g(`users`,`pw-icon pw-icon--sm`)} ${D(e)}</p>`).join(``)}
      ${re?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${D(re)}</p>`:``}
      ${o.review&&!te?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${D(o.review)}</p>`:``}
      ${o.unknown?`<p class="pw-dog-review"><b>Perro nuevo en la ruta:</b> sin ficha en esta página (tamaño y alertas: ${b.toLowerCase()}). Preguntale al coordinador.</p>`:``}
      <p class="pw-dog-category"><span>${D(o.category||`SIN EVALUAR`)}</span> ${o.unknown?b:`Registro maestro 14/08/2026`}</p>

      ${n.isToday&&!e.canSave?`
        <p class="pw-note">Este perro no tiene identificador en la ruta: no se puede marcar. Avisale al coordinador.</p>
      `:``}

      ${ae?`
        ${c?`
          <p class="pw-nosale-label">${g(`x`,`pw-icon`)} No sale en este turno</p>
        `:`
          <ol class="pw-steps" aria-label="Avance de ${D(o.name)}">
            ${T.map((e,t)=>{let n=t<u?Li(l,t,a):``;return`
                <li class="${t<u?`is-done`:``} ${t===u?`is-next`:``}">
                  <span class="pw-step-dot" aria-hidden="true">${t<u?g(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
                  <span>${e.label}${t<u?`<small>${s[t]?D(s[t]):`Sin hora`}</small>`:``}${n?`<small class="pw-marker">Marcó ${D(n)}</small>`:``}</span>
                  <span class="pw-sr">${t<u?`hecho`:`pendiente`}</span>
                </li>
              `}).join(``)}
          </ol>
        `}
        ${l?.nota?`<p class="pw-dog-nota"><b>Nota:</b> ${D(l.nota)}</p>`:``}
        ${f?`<p class="pw-dog-change ${l.pendiente?`is-pending`:``}">${D(f)}</p>`:``}
        <div class="pw-dog-actions">
          ${c?``:d?`
            <p class="pw-done-label">${g(`checkCircle`,`pw-icon`)} Entregado ${D(s[T.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${D(o.id)}" ${O.ready?``:`aria-disabled="true"`}>
              ${O.ready?T[u].action:`Cargando lo marcado…`}
            </button>
          `}
          ${!c&&u===0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${D(o.id)}" ${O.ready?``:`aria-disabled="true"`} aria-label="${D(o.name)} no sale en este turno">No sale</button>
          `:``}
          ${c||u>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${D(o.id)}" aria-label="Deshacer el último paso de ${D(o.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function sa(e,t,n){let{checked:r,record:i}=Mi(e.now.iso,e.shift),a=r.length>=ni.length,o=Ii(i,n),s=t.helping?li(t.helping.paseador,n):``;return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">${si()?`Tu checklist, hoy turno ${e.shift.toLowerCase()}. El inventario no asigna equipo al ayudante (${b.toLowerCase()}): revisá${s?` con ${D(s)}`:``} que esté todo lo del paseador.`:`Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.`}</p>
        </div>
        <span class="pw-count ${a?`is-ok`:``}">${r.length}/${ni.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${ni.map(e=>{let t=r.includes(e.item),n=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
            <li>
              <input class="pw-check-input" type="checkbox" id="${n}" data-pw-equip="${D(e.item)}" ${t?`checked`:``} />
              <label class="pw-check" for="${n}">
                <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                <span class="pw-check-text">${D(e.item)}</span>
                <span class="pw-check-qty">${e.sebastian}</span>
              </label>
            </li>
          `}).join(``)}
      </ul>
      <div class="pw-row">
        ${a?`<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`:`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      ${o?`<p class="pw-dog-change ${i?.pendiente?`is-pending`:``}">${D(o)}</p>`:``}
      <p class="pw-status" role="status">${D(E.equipStatus)}</p>
      ${ri.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${ri.map(e=>`${D(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function ca(e,t){let n=Gi(),r=[...t.map(e=>e.name),Pr];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=E.previewOpen?fa(n,e):null;return`
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
          ${Yt.map((e,t)=>{let r=`pw-proto-${t}`;return`
              <li>
                <input class="pw-check-input" type="checkbox" id="${r}" data-pw-field="protocolo" value="${t}" ${n.protocolo.includes(t)?`checked`:``} />
                <label class="pw-check pw-check--step" for="${r}">
                  <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                  <span class="pw-check-text"><b>${t+1}.</b> ${D(e)}</span>
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
              <input type="checkbox" id="pw-inc-dog-${t}" data-pw-field="dogs" value="${D(e)}" ${n.dogs.includes(e)?`checked`:``} />
              <label for="pw-inc-dog-${t}">${D(e)}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <div class="pw-grid-2">
        <label class="pw-field">Hora
          <input type="time" data-pw-field="hora" value="${D(n.hora||e.now.time)}" />
        </label>
        <label class="pw-field">Lugar
          <input type="text" data-pw-field="lugar" value="${D(n.lugar)}" placeholder="Ej.: plaza, esquina (sin domicilios)" autocomplete="off" />
        </label>
      </div>

      <p class="pw-hint">Escribí lo que viste y oíste. Ej.: “tiró de la correa y gruñó”, no “se puso agresivo”.</p>

      <label class="pw-field">Antes: ¿qué estaba pasando?
        <textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto a 3 metros">${D(n.antes)}</textarea>
      </label>
      <label class="pw-field">Conducta: ¿qué hizo el perro? <span class="pw-req">(obligatorio)</span>
        <textarea data-pw-field="conducta" rows="2" placeholder="Ej.: se paró en dos patas, ladró y tiró hacia el otro perro">${D(n.conducta)}</textarea>
      </label>
      <label class="pw-field">¿Qué hiciste vos?
        <textarea data-pw-field="accion" rows="2" placeholder="Ej.: corté distancia, crucé la calle y lo senté">${D(n.accion)}</textarea>
      </label>
      <label class="pw-field">Después: ¿cómo quedó?
        <textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto y siguió el paseo">${D(n.despues)}</textarea>
      </label>

      <fieldset class="pw-fieldset">
        <legend>Nivel de riesgo <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-seg pw-seg--risk">
          ${Mr.map(e=>`
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
          ${Nr.map((e,t)=>`
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
        <button class="pw-btn pw-btn--ghost ${E.confirmClear?`is-confirm`:``}" type="button" data-pw-clear>
          ${E.confirmClear?`¿Seguro? Tocá de nuevo`:n.registroId?`Empezar otro reporte`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${E.incidentStatus.startsWith(`Falta`)||E.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${D(E.incidentStatus)}</p>

      ${i&&i.ok?la(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function la(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${D(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${ua(e)}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${g(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function ua(e){return`https://wa.me/${Bt.whatsapp}?text=${encodeURIComponent(e)}`}function da(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(Fr)?.[0]}}function fa(e,t){let{missing:n,word:r}=da(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=Ur(t.now),a=ma(),o=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,s=pa(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,si()?`Ayudante de paseador: ${oi()}${a.paseador?` (con ${a.paseador})`:``}`:`Paseador: ${oi()}`,`Ruta: ${a.rutas||`Pendiente de confirmar`}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,o(`Lesiones`,e.lesiones),o(`Lugar`,e.lugar),``,o(`Antes`,e.antes),o(`Conducta observada`,e.conducta),o(`Qué hice`,e.accion),o(`Después`,e.despues),``,`Protocolo:`,...s].join(`
`)}}function pa(e){return Yt.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function ma(){let e=Wr(),t=_i({...e,day:e.now.day,iso:e.now.iso,isToday:!0,shift:Ur(e.now)}),n=Ni(e.now.iso);return{rutas:t.shown.map(e=>e.ruta).join(`, `),paseador:t.helping?li(t.helping.paseador,n):``}}function ha(e,t){let n=e.dogs.map(e=>C.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:pa(e),ruta:ma().rutas,titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function ga(e,t=!1){E.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),k(e)}function _a(e,t){if(E.incidentSavedText===t)return Promise.resolve(null);E.incidentSavedText=t;let n=Wr();return zi(`incidentes`,()=>ha({...e,registroId:Gi().registroId||e.registroId},n)).then(e=>{if(!e)return E.incidentSavedText=``,null;let t=Lr(Tr,null);return t&&Rr(Tr,{...t,registroId:e.id}),ga(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function va(){let e=Gi(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function ya(){let e=va();return Rr(Tr,e),e}function ba(e){if(!E.previewOpen)return;let t=fa(e,Wr()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),E.previewOpen=!1,E.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=E.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=ua(t.text))}function k(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function xa(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var Sa=[`data-pw-from-next`,`data-pw-route`,`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function Ca(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=Sa.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]${t===`data-pw-step`?`:not([data-pw-from-next])`:``}`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function wa(){let e=document.activeElement,t=Ca(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var Ta=0;function Ea(){clearTimeout(Ta),Ta=setTimeout(()=>{document.querySelector(`.pw-shell`)&&wa()},80)}function A(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function Da(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function Oa(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:Da(),block:`start`}),t.focus({preventScroll:!0}))}async function ka(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function Aa(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return lh(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return E.syncError=``,A(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return Oa(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return E.pickerOpen=!E.pickerOpen,A(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=Br(),t=n.dataset.pwDay;return E.day=t===e.day?null:t,A(`[data-pw-day="${t}"]`),k(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return E.shift=r.dataset.pwShift,A(`[data-pw-shift="${E.shift}"]`),k(`Mostrando el turno ${E.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return E.day=null,E.shift=null,E.pickerOpen=!1,A(`#pw-today-title`),k(`Mostrando hoy.`),!0;if(e.target.closest(`[data-pw-change-ok]`))return E.routeChange=null,A(`#pw-today-title`),!0;let i=e.target.closest(`[data-pw-route]`);if(i){let e=Wr(),t=i.dataset.pwRoute;return gi(e,t),A(`[data-pw-route="${CSS.escape(t)}"]`),k(t?`Mostrando la ruta ${t}. Queda recordada en este celular.`:`Mostrando todas las rutas del turno.`),!0}let a=e.target.closest(`[data-pw-step]`);if(a){let e=a.dataset.pwStep,t=a.dataset.pwFromNext,n=Wr(),r=yi(n,e);if(!n.isToday||!r?.canSave||!O.ready)return!0;let i=r.dog,o=ki(n.now.iso,n.shift,[i])[e];if(o.noSale||o.step>=T.length)return!0;let s=T[o.step],c=ai(),l={estado:s.estado};if(T.forEach((e,t)=>{t>=o.step||(l[e.field]=o.times[t],o.record?.[`${e.field}Por`]&&(l[`${e.field}Por`]=o.record[`${e.field}Por`],l[`${e.field}PorNombre`]=o.record[`${e.field}PorNombre`]||``))}),l[s.field]=n.now.time,l[`${s.field}Por`]=c.usuario||``,l[`${s.field}PorNombre`]=c.nombre||``,Bi(r,n,l,`${i.name}: ${s.done.toLowerCase()} a las ${n.now.time}.`),t){$();let e=document.querySelector(`[data-pw-from-next="${CSS.escape(t)}"]`)||document.querySelector(`[data-pw-next="${CSS.escape(t)}"]`)?.closest(`section`)?.querySelector(`h2`);e&&!e.hasAttribute(`tabindex`)&&e.tagName===`H2`&&e.setAttribute(`tabindex`,`-1`),e?.focus({preventScroll:!0})}else A(o.step+1>=T.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`);return!0}let o=e.target.closest(`[data-pw-nosale]`);if(o){let e=o.dataset.pwNosale,t=Wr(),n=yi(t,e);return t.isToday&&n?.canSave&&O.ready&&(Bi(n,t,{estado:Or},`${n.dog.name}: no sale en este turno.`),A(`[data-pw-undo="${CSS.escape(e)}"]`)),!0}let s=e.target.closest(`[data-pw-undo]`);if(s){let e=s.dataset.pwUndo,t=Wr(),n=yi(t,e);if(!t.isToday||!n?.canSave||!O.ready)return!0;let r=n.dog,i=ki(t.now.iso,t.shift,[r])[e];if(i.noSale){let a=i.times.reduce((e,t,n)=>t?n+1:e,0);return Bi(n,t,{estado:a?T[a-1].estado:`pendiente`},`${r.name}: se deshizo "no sale".`),A(a>=T.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(!i.step)return!0;let a=i.step-1,o={estado:a?T[a-1].estado:`pendiente`};return T.forEach((e,t)=>{o[e.field]=t<a?i.times[t]:``,t>=a&&(o[`${e.field}Por`]=``,o[`${e.field}PorNombre`]=``)}),Bi(n,t,o,`${r.name}: se deshizo "${T[a].done.toLowerCase()}".`),A(`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(e.target.closest(`[data-pw-equip-all]`))return Vi(Wr(),ni.map(e=>e.item)),E.equipStatus=`Equipo completo. ¡A salir!`,A(`[data-pw-equip-reset]`),k(E.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return Vi(Wr(),[]),E.equipStatus=`Lista de equipo desmarcada.`,A(`[data-pw-equip-all]`),k(E.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=ya(),t=fa(e,Wr());return E.confirmClear=!1,t.ok?(E.previewOpen=!0,E.incidentStatus=E.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,A(`[data-pw-message]`),k(E.incidentStatus),_a(e,t.text),!0):(E.previewOpen=!1,E.incidentStatus=t.missing.length?`Falta completar: ${Gr(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,A(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),k(E.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=Gi(),t=fa(e,Wr());return t.ok&&_a(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=Gi(),n=fa(t,Wr());return n.ok&&_a(t,n.text),ka(e).then(e=>{E.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=E.incidentStatus,t.classList.toggle(`is-warn`,!e)),k(E.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!E.confirmClear)return E.confirmClear=!0,A(`[data-pw-clear]`),!0;let e=!!Gi().registroId;try{localStorage.removeItem(Tr)}catch{}return E.confirmClear=!1,E.previewOpen=!1,E.incidentSavedText=``,E.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,A(`#pw-incidente`),k(E.incidentStatus),!0}if(E.confirmClear&&!e.target.closest(`[data-pw-clear]`)){E.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=Gi().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function ja(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=Wr(),{checked:n}=Mi(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return Vi(e,i),E.equipStatus=i.length>=ni.length?`Equipo completo. ¡A salir!`:``,A(`[data-pw-equip="${CSS.escape(r)}"]`),E.equipStatus&&k(E.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(ba(ya()),!0):!1}function Ma(e){e.target.closest?.(`[data-pw-field]`)&&ba(ya())}function Na(){_e.push(Aa),ve.push(ja),document.addEventListener(`input`,Ma),$e(e=>{[`paseos`,`checklists`,`incidentes`,`rutas`,`plantillas`,`avisos`].includes(e)&&Ea()}),window.addEventListener(`online`,Ea),window.addEventListener(`offline`,Ea),setInterval(Fa,15e3)}var Pa={iso:``,shift:``,minute:-1};function Fa(){if(!document.querySelector(`.pw-shell`))return;let e=Br();e.iso!==Pa.iso||Ur(e)!==Pa.shift?Ea():e.minutes!==Pa.minute&&(Pa.minute=e.minutes,document.querySelectorAll(`[data-pw-countdown]`).forEach(t=>{let n=Yr(t.dataset.pwCountdown,e.minutes,t.dataset.pwMode);t.textContent=n.text,t.className=`pw-cd pw-cd--${n.kind}`,t.closest(`.pw-next`)?.classList.toggle(`is-late`,n.kind===`late`)}))}var Ia=`America/Argentina/Buenos_Aires`,La=[`manana`,`tarde`],Ra=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,za=/(\d[\s.-]?){8,}/,Ba=10,Va=15,Ha=[`paseos`,`checklists`,`incidentes`,`plantillas`,`rutas`,`avisos`,`solicitudes`,`observaciones`,`cierres`],Ua=7,Wa={admin:`Admin`,supervisor:`Supervisor`,coordinador:`Coordinación`,paseador:`Paseador`,ayudante:`Ayudante de paseador`},Ga=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],Ka=[`no sale`,`agregar perro`,`cambiar hora`,`cambiar paseador o ayudante`,`otro`],qa={pendiente:{label:`Pendiente`,tone:`warn`},aplicado:{label:`Aplicado`,tone:`ok`},rechazado:{label:`Rechazado`,tone:`danger`}},Ja=an(),j={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,observationDraft:`paseosJuanSupervisor_observacionBorrador`,avisoDraft:`paseosJuanSupervisor_avisoBorrador`,requestDraft:`paseosJuanSupervisor_pedidoBorrador`},Ya={observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},Xa=null,Za=null,Qa=null,$a=new Map,eo=new Set,to=new Set,no=new Map,ro=new Map,io=new Set,ao=new Map,oo=new Set,so=new Map,co=!1,lo=!1,uo=null,fo=``,po=`idle`;function M(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function mo(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function N(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function ho(e){try{localStorage.removeItem(e)}catch{}}var go=8e3;function P(e,t,n=`ok`){Xa={area:e,text:t,tone:n,at:Date.now()}}function _o(e){return Xa&&Date.now()-Xa.at>go&&(Xa=null),Xa&&Xa.area===e?Xa:null}function vo(e){let t=_o(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?M(t.text):``}</p>
  `}function yo(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function bo(e,t,n){return`${e} ${e===1?t:n}`}function xo(e){let t=String(e||``).match(/^(\d{1,2}):(\d{2})/);return t?Number(t[1])*60+Number(t[2]):null}function So(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function Co(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function wo(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Ia,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:S[(n+6)%7]}}function To(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function Eo(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:b}function Do(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function Oo(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Ia,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function ko(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:y(t)}function Ao(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function jo(e){return e.minutes<810?`manana`:`tarde`}function Mo(e){let t=Co(e);return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function No(e,t){let n=x[e];return t.minutes<xo(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=xo(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function Po(){return _.user()||{}}function Fo(e){let t=Po();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function Io(e,t){if(!e)return``;if(t?.actualizadoPor===e&&t.actualizadoPorNombre)return t.actualizadoPorNombre;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=Po();if(n.usuario===e&&n.nombre)return n.nombre;let r=Vt.find(t=>t.id===e);if(r)return r.name;for(let t of[`checklists`,`paseos`,`incidentes`])for(let n of Bo(t)){if(n.creadoPor===e&&n.creadoPorNombre)return n.creadoPorNombre;if(n.actualizadoPor===e&&n.actualizadoPorNombre)return n.actualizadoPorNombre}return e}function Lo(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=Io(e.actualizadoPor||e.creadoPor,e),r=Oo(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function Ro(e){let t=y();return e===`plantillas`||e===`avisos`?{}:e===`observaciones`?{desde:To(t,-6)}:e===`solicitudes`?{desde:To(t,-2)}:{desde:t}}function zo(){_.token()&&Ha.forEach(e=>{let t=Ro(e),n=`${e}|${t.desde||``}`;oo.has(n)||(oo.add(n),e===`solicitudes`&&Zo(),v.watch(e,t),v.list(e,t).then(()=>{io.add(e),ao.delete(e)}).catch(t=>{io.add(e),ao.set(e,t?.message||`No se pudieron traer los datos.`)}).finally(Yo))})}function Bo(e){let t=new Map(v.cached(e,Ro(e)).map(e=>[e.id,e]));return no.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function Vo(e,t,n,r,i=`ok`){if(!t.id)return Ho(e,t,n,r,i);let a=`${e}:${t.id}`,o=(ro.get(a)||Promise.resolve()).then(()=>Ho(e,t,n,r,i));return ro.set(a,o),o.then(()=>{ro.get(a)===o&&ro.delete(a)}),o}async function Ho(e,t,n,r,i){try{let a=await v.save(e,t);if(a.pendiente)P(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=no.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&no.set(t,a),P(n,r,i)}return a}catch(e){return P(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function Uo(e,t,n,r){try{return await v.remove(e,t),no.delete(`${e}:${t}`),P(n,r,`info`),!0}catch(e){return P(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function Wo(e=!0){if(!_.token())return;let t=await Promise.allSettled(Ha.map(e=>v.list(e,Ro(e))));if(t.forEach((e,t)=>{io.add(Ha[t]),e.status===`rejected`?ao.set(Ha[t],e.reason?.message||`No se pudieron traer los datos.`):ao.delete(Ha[t])}),!e)return;let n=t.find(e=>e.status===`rejected`);n?P(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?P(`sync`,`Datos actualizados a las ${wo().time} hs.`):P(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),F(`sv-refresh`)}function Go(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function Ko(){uo=null,Go()&&document.querySelector(`.sv-shell`)&&Jo()}function qo(){let e=mo(j.folds,{}),t=!1;document.querySelectorAll(`.sv-shell [data-sv-fold]`).forEach(n=>{e[n.dataset.svFold]!==n.open&&(e[n.dataset.svFold]=n.open,t=!0)}),t&&N(j.folds,e),document.querySelectorAll(`.sv-shell [data-sv-stop-more]`).forEach(e=>{e.open?eo.add(e.dataset.svStopMore):eo.delete(e.dataset.svStopMore)})}function Jo(){qo();let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>2&&window.scrollTo(0,r),!t)return;let i=document.getElementById(t);if(i&&(i.focus({preventScroll:!0}),n&&typeof i.setSelectionRange==`function`))try{i.setSelectionRange(n[0],n[1])}catch{}}function Yo(){uo||=setTimeout(Ko,40)}function Xo(){Go()&&document.querySelector(`.sv-shell`)&&wo().time!==fo&&document.activeElement?.tagName!==`SELECT`&&Jo()}function Zo(){co||=(Bo(`solicitudes`).forEach(e=>so.set(e.id,e.estado||`pendiente`)),!0)}function Qo(){let e=Po().usuario,t=[];if(Bo(`solicitudes`).forEach(n=>{let r=n.estado||`pendiente`,i=so.get(n.id);co&&i&&i!==r&&r!==`pendiente`&&n.creadoPor===e&&t.push(n),so.set(n.id,r)}),!t.length)return;let n=t.filter(e=>e.estado===`aplicado`);P(`requests`,`El coordinador ${t.map(e=>`${e.estado===`aplicado`?`aplicó`:`rechazó`} «${ks(e)}»${e.respuesta?`: ${e.respuesta}`:``}`).join(` · `)}.${n.length?` La ruta ya muestra el cambio.`:``}`,n.length?`ok`:`info`),n.length&&(v.list(`rutas`,Ro(`rutas`)).catch(()=>{}),v.list(`plantillas`,Ro(`plantillas`)).catch(()=>{}))}function $o(){lo||(lo=!0,$e(e=>{Ha.includes(e)&&(io.add(e),e===`solicitudes`&&Qo(),Yo())}),window.addEventListener(`online`,Yo),window.addEventListener(`offline`,Yo),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Go()&&Wo(!1)}),setInterval(Xo,1e4))}function es(){try{return Object.values(Ya).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function ts(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=ss(e.dogId),n=Do(e.fecha)||ko(Ao(e.id))||y();return{id:So(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:x[e.shift]?.label||``,titulo:`Observación: ${t?t.name:b}`,autorAnterior:e.autor||``,migrado:!0}}async function ns(e,t){try{return await v.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function rs(){if(po!==`idle`||!_.token()||!es()||!navigator.onLine)return;po=`running`;let e=0,t=0,n=``,r=mo(Ya.observations,[]),i=[];for(let a of r){let r=ts(a);if(!r)continue;let o=await ns(`observaciones`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?N(Ya.observations,i):ho(Ya.observations);let a=mo(Ya.closure,{}),o=Object.entries(a).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&La.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(o.length){let r=o.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await v.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,s]of o){let[o,c]=a.split(`|`),l=`${o}_${c}`;if(i.has(l))continue;let u=await ns(`cierres`,{id:l,fecha:o,turno:x[c].label,notas:String(s.notas||``),resumen:``,cerrado:!!s.cerrado,horaCierre:s.cerrado?String(s.cerrado):``,migrado:!0});u?(r[a]=s,t+=1,n=u):e+=1}Object.keys(r).length?N(Ya.closure,r):ho(Ya.closure)}else t+=o.length}else ho(Ya.closure);po=`done`,(e||t)&&P(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),Yo()}function is(){let e=wo(),t=mo(j.view,{}),n=jo(e),r=t.date===e.iso&&La.includes(t.shift)?t.shift:n;return{day:e.dayName,shift:r,now:e,isToday:!0,isCurrent:r===n,fecha:e.iso,fechaLabel:e.label}}function as(e){N(j.view,{date:wo().iso,shift:e})}function os(e,t=!1){let n=mo(j.folds,{});return typeof n[e]==`boolean`?n[e]:t}function ss(e){return C.find(t=>t.id===e)}function cs(e){let t=Co(e);return C.find(e=>Co(e.name)===t)}function ls(e){return(e?.safety||[]).some(e=>/bozal/i.test(e))}function us(e){return(e?.safety||[]).find(e=>/bozal/i.test(e))||``}function ds(e,t){return Co(e)===Co(t)}function fs(e){let t=e.perroId&&ss(e.perroId)||e.perroNombre&&cs(e.perroNombre)||null,n=Number(e.minutos)||t?.minutes||null;return{perroId:t?.id||e.perroId||``,perroNombre:e.perroNombre||t?.name||`Pendiente de confirmar`,hora:xo(e.hora)===null?``:String(e.hora).slice(0,5),minutos:n,nota:e.nota||``,dog:t}}function ps(e,t){let n=Array.isArray(e.paradas)?e.paradas:Array.isArray(e.perros)?e.perros.map(e=>({perroId:e,perroNombre:ss(e)?.name||e,hora:``})):[];return{code:e.ruta||e.id||`Pendiente de confirmar`,source:t,record:e,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,stops:n.map(fs)}}function ms(e){let t=new Map;Bo(`plantillas`).filter(t=>ds(t.dia,e.day)&&Mo(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,ps(e,`plantilla`))),Bo(`rutas`).filter(t=>t.fecha===e.fecha&&Mo(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,ps(e,`dia`)));let n=!(io.has(`plantillas`)&&io.has(`rutas`)),r=!1;return t.size||(Ja.filter(t=>ds(t.dia,e.day)&&Mo(t.turno)===e.shift).forEach(e=>t.set(e.ruta,ps(e,`planilla`))),r=t.size>0),{routes:[...t.values()].sort((e,t)=>e.code.localeCompare(t.code)),fallback:r,loading:n}}function hs(e){return e.source===`dia`?`Cambio del día (coordinador)`:e.source===`plantilla`?`Plantilla semanal (coordinador)`:`Planilla RPJ (respaldo)`}function gs(e){let t=new Map;return e.forEach(e=>e.stops.forEach(e=>{e.dog&&!t.has(e.dog.id)&&t.set(e.dog.id,e.dog)})),[...t.values()]}function _s(e,t,n){return`${e}_${t}_${n}`}function vs(){return new Map(Bo(`paseos`).map(e=>[e.id,e]))}function ys(e,t,n){let r=t?.estado||`pendiente`,i=xo(e.hora),a=Number(e.minutos)||null,o=xo(t?.horaRetiro),s=[`retirado`,`paseando`,`entregado`].includes(r),c=o??i,l=s&&o!==null&&i!==null?o-i:0,u=l>Ba,d={estado:r,retirado:s,record:t,pickupDelay:l,pickupLate:u,planned:i,minutos:a};if(r===`no-sale`)return{...d,kind:`nosale`,label:`No sale`,tone:`neutral`,live:`nosale`};if(r===`entregado`){let e=xo(t?.horaEntrega),n=e!==null&&c!==null?e-c:null,r=n!==null&&a?n>a+Va:!1;return{...d,kind:`entregado`,label:`Entregado${t?.horaEntrega?` ${t.horaEntrega}`:``}`,tone:`ok`,live:`entregado`,duration:n,deliveryLate:r,late:u||r}}if(s){let e=c===null?null:n-c;if(e!==null&&a&&e>a+Va)return{...d,kind:`demorada`,label:`Entrega demorada ${e-a} min`,tone:`danger`,live:`atrasado`,walked:e,late:!0};let i=r===`paseando`?`Paseando`:`Retirado${t?.horaRetiro?` ${t.horaRetiro}`:``}`;return{...d,kind:`curso`,label:i,tone:`info`,live:`atiempo`,walked:e,late:u}}if(i===null)return{...d,kind:`sinhora`,label:`Hora sin confirmar`,tone:`neutral`,live:`atiempo`};let f=n-i;return f>Ba?{...d,kind:`atrasado`,label:`Atrasado ${f} min`,tone:`danger`,live:`atrasado`,delay:f,late:!0}:f>=0?{...d,kind:`ahora`,label:`Retirar ahora`,tone:`warn`,live:`atiempo`,delay:f}:{...d,kind:`espera`,label:`Retira ${e.hora}`,tone:`neutral`,live:`atiempo`}}function bs(e,t,n=vs()){return t.stops.map(t=>{let r=t.perroId?_s(e.fecha,t.perroId,e.shift):``;return{stop:t,id:r,status:ys(t,r?n.get(r):null,e.now.minutes)}})}function xs(e){let t={atiempo:0,atrasado:0,entregado:0,nosale:0};return e.forEach(({status:e})=>{t[e.live]+=1}),t}function Ss(e,t){return Bo(`checklists`).filter(n=>n.fecha===e&&(Mo(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function Cs(e,t,n){return n&&Ss(e,t).find(r=>r.id===`${e}_${n}_${t}`||r.creadoPor===n)||null}function ws(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>Ts(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:Io(e.creadoPor||e.actualizadoPor,e),at:Oo(e.actualizadoEn||e.creadoEn)}}function Ts(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):b}function Es(e){return Bo(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function Ds(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>ss(e)?.name||e);return t.length?yo(t):b}function Os(e){return Bo(`avisos`).filter(t=>(t.vigenteHasta?t.vigenteHasta>=e:t.fecha===e)&&(!t.fecha||t.fecha<=e)).sort((e,t)=>Number(t.tipo===`seguridad`)-Number(e.tipo===`seguridad`)||String(t.fecha||``).localeCompare(String(e.fecha||``)))}function ks(e){return`${e.tipo||`Cambio`}${e.perroNombre?` · ${e.perroNombre}`:``}${e.ruta?` · ${e.ruta}`:``}`}function As(e,t){return Bo(`solicitudes`).filter(n=>n.fecha===e&&Mo(n.turno)===t)}function js(e){let t=Po().usuario;return Bo(`solicitudes`).filter(n=>(n.creadoPor?n.creadoPor===t:n.pendiente)&&(n.fecha>=e||(n.estado||`pendiente`)===`pendiente`)).sort((e,t)=>String(t.creadoEn||`9`).localeCompare(String(e.creadoEn||`9`)))}function Ms(e,t=``,n=``,r=!1){let i=n?ss(n):null;return{fecha:e.fecha,shift:e.shift,ruta:t,perroId:i?.id||``,perroNombre:i?.name||``,tipo:i?`no sale`:`otro`,detalle:``,motivo:``,urgente:!1,open:r}}function Ns(e){let t=mo(j.requestDraft,{});return t.fecha!==e.fecha||t.shift!==e.shift?Ms(e):{...Ms(e),...t}}function Ps(e){let t=new Set,n=[];return e.forEach(r=>{let i=new Set(r.stops.map(e=>e.dog?.name).filter(Boolean));r.stops.forEach(({dog:a})=>{(a?.incompatibleWith||[]).forEach(o=>{let s=[a.name,o].sort().join(`|`);if(t.has(s))return;let c=i.has(o)?r:e.find(e=>e.stops.some(e=>e.dog?.name===o));c&&(t.add(s),n.push({a:a.name,b:o,sameRoute:c===r,route:r.code,otherRoute:c.code}))})})}),n.sort((e,t)=>Number(t.sameRoute)-Number(e.sameRoute))}function Fs(e){let t=gs(e),n=Ps(e),r=t.filter(ls),i=t.filter(e=>e.status!==`Activo`),a=t.filter(e=>e.review&&e.status===`Activo`),o=t.filter(e=>e.category===`SIN EVALUAR`),s=e.flatMap(e=>e.stops.filter(e=>!e.dog).map(t=>`${t.perroNombre} (${e.code})`)),c=[];return n.length&&c.push({tone:`danger`,icon:`alertTriangle`,title:n.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${n.length} parejas que no pueden ir juntas`,lines:n.map(e=>`No juntar: ${e.a} con ${e.b}${e.sameRoute?` (los dos en ${e.route})`:` (${e.route} y ${e.otherRoute}: que no se crucen)`}.`),action:n.some(e=>e.sameRoute)?`Que no caminen juntos. Si la ruta los junta, pedile el cambio al coordinador.`:`Que los paseadores no se crucen con esos perros.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),r.length&&c.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${bo(r.length,`perro`,`perros`)}`,lines:r.map(e=>`${e.name}: ${us(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),i.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${i.length===1?`sale ${i[0].name}`:`salen ${i.length} perros`}`,lines:i.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),s.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`${bo(s.length,`perro de la ruta no tiene`,`perros de la ruta no tienen`)} ficha`,lines:s.map(e=>`${e}: ${b}.`),action:`No se puede marcar el retiro desde acá. Pedile al coordinador que lo revise.`,source:`Fuente: rutas del coordinador y registro de perros.`}),a.length&&c.push({tone:`info`,icon:`fileText`,title:`${bo(a.length,`perro tiene`,`perros tienen`)} datos a revisar`,lines:a.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${zt}.`}),o.length>1&&c.push({tone:`info`,icon:`eye`,title:`${o.length} perros salen en grupo SIN EVALUAR`,lines:[`${Kt[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),c}var Is=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function Ls(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function Rs(e){return{...Ls(e),...mo(j.observationDraft,{})}}function zs(){let e=Ro(`observaciones`).desde;return Bo(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function Bs(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${Po().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function Vs(e){return[`Observación de conducta — ${Bt.name}`,`Perro: ${e.perroNombre||ss(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${Eo(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${Bs(e)}`].join(`
`)}function Hs(e){return`${e.fecha}_${e.shift}`}function Us(e){return Bo(`cierres`).find(t=>t.id===Hs(e))||null}function Ws(e){return Qa&&Qa.id===Hs(e)?Qa.notas:Us(e)?.notas||``}function Gs(e,t){return e?Io(e,t):``}function Ks(e,t){let n=vs(),r=t.flatMap(t=>bs(e,t,n).map(e=>({...e,route:t}))),i=r.filter(e=>e.status.kind!==`nosale`);return{items:r,going:i,late:i.filter(e=>e.status.late),onTime:i.filter(e=>!e.status.late),noSale:r.filter(e=>e.status.kind===`nosale`),delivered:i.filter(e=>e.status.kind===`entregado`),notPicked:i.filter(e=>!e.status.retirado),notDelivered:i.filter(e=>e.status.retirado&&e.status.kind!==`entregado`)}}function qs(e){let{stop:t,status:n}=e,r=[];return n.kind===`atrasado`&&r.push(`sin retiro, previsto ${t.hora} (${n.delay} min)`),n.pickupLate&&r.push(`retiro previsto ${t.hora}, retirado ${n.record?.horaRetiro} (+${n.pickupDelay} min)`),n.kind===`demorada`&&r.push(`entrega demorada: ${n.walked} min de ${n.minutos} previstos`),n.deliveryLate&&r.push(`entrega demorada: ${n.duration} min de ${n.minutos} previstos`),`${t.perroNombre} (${r.join(`; `)||`con atraso`})`}function Js(e,t){let n=x[e.shift],{routes:r,fallback:i}=ms(e),a=Ks(e,r),o=t||Us(e),s=Ps(r),c=gs(r).filter(ls),l=zs().filter(t=>t.fecha===e.fecha&&Mo(t.turno)===e.shift),u=Es(e.fecha),d=As(e.fecha,e.shift),f=Ws(e),p=Po(),m=Ys(e,r),h=e=>e.length?e.map(e=>e.stop.perroNombre).join(`, `):`ninguno`,ee=[`Cierre de turno — ${Bt.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisó: ${p.nombre||`Pendiente de confirmar`}`,`Rutas${i?` (tomadas de la planilla RPJ)`:``}:`,...r.map(e=>`- ${e.code}: paseador ${Gs(e.paseador)||`Pendiente de confirmar`}${e.ayudante?`, ayudante ${Gs(e.ayudante)}`:``} · ${bo(e.stops.length,`perro`,`perros`)}`),`Cumplimiento: ${a.onTime.length} a tiempo · ${a.late.length} con atraso · ${a.noSale.length} no salieron (de ${a.items.length} previstos)`,`- Con atraso: ${a.late.length?a.late.map(qs).join(`; `):`ninguno`}`,`- No salieron: ${h(a.noSale)}`,`- Sin retiro marcado: ${h(a.notPicked)}`,`- Sin entrega marcada: ${h(a.notDelivered)}`,`Entregados: ${a.delivered.length} de ${a.going.length}`,`Checklist del equipo: ${m.length?m.map(e=>`${e.name}: ${e.checklist?ws(e.checklist).complete?`equipo completo`:`incompleto${ws(e.checklist).missing.length?` (falta ${ws(e.checklist).missing.join(`, `)})`:``}`:`sin cargar`}`).join(`; `):`sin equipo asignado`}`,`Incidentes del día: ${u.length?u.map(e=>`${e.hora||`sin hora`} ${e.titulo||Ds(e)}`).join(`; `):`ninguno cargado`}`,`Pedidos de cambio al coordinador: ${d.length?d.map(e=>`${ks(e)} (${qa[e.estado]?.label||`Pendiente`})`).join(`; `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${s.length?s.map(e=>`${e.a} con ${e.b}`).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${c.length?c.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${l.length}`,`Notas del supervisor: ${f.trim()||`sin notas`}`];return o?.cerrado&&ee.push(`Turno cerrado a las ${o.horaCierre||Oo(o.actualizadoEn)||`Pendiente de confirmar`} hs por ${Io(o.actualizadoPor,o)||`Pendiente de confirmar`}.`),ee.join(`
`)}function Ys(e,t){let n=new Map,r=(e,t,r)=>{if(!e)return;let i=n.get(e)||{usuario:e,name:Io(e),roles:[]};i.roles.push(`${t} ${r}`),n.set(e,i)};return t.forEach(e=>{r(e.paseador,`Paseador`,e.code),r(e.ayudante,`Ayudante`,e.code)}),Ss(e.fecha,e.shift).forEach(e=>{let t=e.creadoPor||String(e.id).split(`_`)[1];t&&!n.has(t)&&n.set(t,{usuario:t,name:Io(t,e),roles:[`Sin ruta asignada`]})}),[...n.values()].map(t=>({...t,checklist:Cs(e.fecha,e.shift,t.usuario)}))}function Xs(e){return`
    <div class="sv-shell">
      ${Zs()}
      ${e}
    </div>
  `}function Zs(){let e=Po();return`
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
          <small>${M(Wa[e.rol]||e.rol||``)}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${g(`logOut`,`sv-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function Qs(){zo();let e=is();fo=e.now.time;let t=ms(e),n=`
    <main class="sv-main" id="sv-main">
      ${$s()}
      ${ec(e)}
      ${nc(e,t)}
      ${ic(e)}
      ${ac(e,t.routes)}
      ${lc(e,t)}
      ${hc(e)}
      ${gc(e,gs(t.routes))}
      ${vc(e)}
      ${yc()}
    </main>
  `;return po===`idle`&&es()&&setTimeout(rs,0),n}function $s(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=[...new Set(ao.values())],r=t||e||n.length?`warn`:`ok`,i=`${e} cambio${e===1?` espera`:`s esperan`} señal para enviarse.`,a=t?`Sin señal: ves lo último guardado en este teléfono.${e?` ${i}`:``}`:e?i:n.length?`No se pudieron traer algunos datos: ${n.join(` `)}`:`Datos compartidos con el equipo. Se actualizan solos.`;return`
    <section class="sv-sync is-${r}" aria-label="Estado de los datos">
      <p class="sv-sync-text" aria-live="polite">${g(r===`ok`?`radio`:`uploadCloud`,`sv-icon`)} <span>${M(a)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${vo(`sync`)}
    </section>
  `}function ec(e){let t=Es(e.fecha);return t.length?`
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
              <span>${e.hora?`${M(e.hora)} hs · `:``}${M(Ds(e))}${e.lugar?` · ${M(e.lugar)}`:``}${e.barrio?` · ${M(e.barrio)}`:``}</span>
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
            <p class="sv-source">${M(Lo(e,`Cargó`))}</p>
          </li>
        `).join(``)}
      </ul>
    </section>
  `:``}function tc(e,t){let n=Ys(e,t),r=e.now.minutes>=xo(x[e.shift].from);return n.length?`
    <div class="sv-team">
      <h2 class="sv-subtitle">Equipo del turno: checklist de salida</h2>
      <ul class="sv-team-list">
        ${n.map(e=>{let t=e.checklist?ws(e.checklist):null,n=t?e.checklist.pendiente?`info`:t.complete?`ok`:`danger`:r?`warn`:`info`,i=t?t.complete?`Salió con el equipo completo.`:`Equipo incompleto${t.missing.length?`. Falta: ${t.missing.join(`, `)}`:``}.`:`Todavía no cargó el checklist.`;return`
            <li class="sv-note is-${n}">
              ${g(t?.complete?`checkCircle`:`alertTriangle`,`sv-icon`)}
              <strong>${M(e.name)}</strong> <small>(${M(e.roles.join(`, `))})</small>:
              ${M(i)} ${t?.at?`<small>${M(t.at)} hs</small>`:``}
            </li>
          `}).join(``)}
      </ul>
    </div>
  `:`<p class="sv-note is-info"><strong>Equipo del turno:</strong> ${b}. La ruta no tiene paseador asignado y nadie cargó el checklist.</p>`}function nc(e,t){let n=x[e.shift],r=No(e.shift,e.now),i=Po(),a=t.routes.flatMap(t=>bs(e,t)),o=xs(a),s=t.routes.map(e=>e.supervisor).filter(Boolean),c=[...new Set(s)].join(` y `)||n.supervisor;return`
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
            ${La.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${x[t].label}
                <small>${t===jo(e.now)?`Turno actual`:`${x[t].from} a ${x[t].to}`}</small>
              </button>
            `).join(``)}
          </div>
        </div>
      </div>

      ${e.isCurrent?``:`<p class="sv-note is-info">Estás mirando el turno ${n.label.toLowerCase()} de hoy. El turno actual es el de la ${x[jo(e.now)].label.toLowerCase()}.</p>`}

      <div class="sv-counter" role="status" aria-live="polite" aria-label="Cumplimiento del turno">
        <p class="sv-counter-line">
          <span class="sv-count is-ok"><b>${o.atiempo}</b> a tiempo</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count ${o.atrasado?`is-danger`:``}"><b>${o.atrasado}</b> ${o.atrasado===1?`atrasado`:`atrasados`}</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count"><b>${o.entregado}</b> ${o.entregado===1?`entregado`:`entregados`}</span>
        </p>
        <p class="sv-source">${bo(a.length,`perro previsto`,`perros previstos`)}${o.nosale?` · ${o.nosale} no ${o.nosale===1?`sale`:`salen`}`:``} · Atrasado: pasó la hora de retiro + ${Ba} min. Entrega demorada: el paseo superó lo previsto + ${Va} min. Se recalcula cada minuto.</p>
      </div>

      ${t.fallback?`
        <p class="sv-note is-warn">${g(`alertCircle`,`sv-icon`)} <strong>Rutas tomadas de la planilla.</strong> ${t.loading?`Cargando las rutas del coordinador…`:`El coordinador todavía no cargó en la app la ruta de ${M(e.day.toLowerCase())} a la ${n.label.toLowerCase()}.`} Paseador y ayudante: ${b}.</p>
      `:``}

      ${tc(e,t.routes)}
    </section>
  `}function rc(e){return{barrio:``,tipo:Ga[0],mensaje:``,vigenteHasta:e.fecha,...mo(j.avisoDraft,{})}}function ic(e){let t=Os(e.fecha),n=rc(e),r=os(`aviso-form`);return`
    <section class="sv-card sv-avisos" aria-labelledby="sv-avisos-title">
      <div class="sv-section-head">
        <h2 id="sv-avisos-title" class="sv-title">${g(`mapPin`,`sv-icon`)} Avisos por barrio vigentes</h2>
        <p>${t.length?`Lo que el equipo tiene que saber hoy en cada barrio.`:io.has(`avisos`)?`No hay avisos vigentes.`:`Cargando avisos…`}</p>
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
              <p class="sv-source">${e.vigenteHasta?`Vigente hasta ${M(Eo(e.vigenteHasta))}`:`Vigente hoy`} · ${M(Lo(e,`Cargó`))}</p>
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
              <datalist id="sv-barrios">${on.map(e=>`<option value="${M(e)}"></option>`).join(``)}</datalist>
            </label>
            <label class="sv-field" for="sv-aviso-tipo">Tipo
              <select id="sv-aviso-tipo" data-sv-aviso="tipo">
                ${Ga.map(e=>`<option value="${e}" ${e===n.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
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
      ${vo(`aviso`)}
    </section>
  `}function ac(e,t){if(!t.some(e=>e.stops.length))return``;let n=Fs(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${g(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Bozales e incompatibles primero. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>oc(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos-detector" ${os(`avisos-detector`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>oc(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function oc(e,t){return`
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
  `}function sc(e){let t=e.dog,n=(t?.safety||[]).map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?M(e):`<b>${M(e)}</b>`}</li>`});if(e.nota&&!(t?.safety||[]).some(t=>Co(t).includes(Co(e.nota)))){let t=/no juntar/i.test(e.nota)?`danger`:/bozal/i.test(e.nota)?`warn`:`info`;n.push(`<li class="sv-chip is-${t}"><b>Ruta:</b> ${M(e.nota)}</li>`)}return t&&t.status!==`Activo`&&n.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${M(t.status)}</li>`),t||n.unshift(`<li class="sv-chip is-danger"><b>Sin ficha:</b> ${b}</li>`),n.length?`<ul class="sv-chips" aria-label="Avisos de ${M(e.perroNombre)}">${n.join(``)}</ul>`:``}function cc(e,t,n){let r=Po(),i=x[e.shift],a=Gs(t.paseador),o=n.filter(e=>e.status.live===`atrasado`),s=xs(n),c=[`Hola${a?` ${a}`:``}, te escribe ${r.nombre||`el supervisor`} (supervisión ${Bt.name}).`,`Ruta ${t.code}, turno ${i.label.toLowerCase()} ${e.fechaLabel}: ${s.entregado} entregados de ${n.length-s.nosale}.`];return o.length?(c.push(`Veo atrasados: ${o.map(e=>`${e.stop.perroNombre} (${e.status.kind===`demorada`?`entrega demorada`:`retiro ${e.stop.hora}`}, ${e.status.label.replace(/^\D+/,``)})`).join(`; `)}.`),c.push(`¿Cómo vienen? Avisame si necesitás ayuda.`)):c.push(`¿Cómo vienen? Avisame cualquier cosa.`),c.join(`
`)}function lc(e,t){let{routes:n}=t;if(!n.length)return`
      <section class="sv-card" aria-labelledby="sv-routes-title">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno</h2>
        <p class="sv-empty">${t.loading?`Cargando rutas…`:`No hay rutas cargadas para ${M(e.day.toLowerCase())} a la ${x[e.shift].label.toLowerCase()} (ni en la app ni en la planilla).`}</p>
        ${fc(e,``,``,`Pedir una ruta al coordinador`)}
        ${mc(e,``,``)}
      </section>
    `;let r=vs(),i=new Set(n.flatMap(e=>e.stops.map(e=>e.perroId)).filter(Boolean)),a=Bo(`paseos`).filter(t=>t.fecha===e.fecha&&String(t.id).endsWith(`_${e.shift}`)&&t.perroId&&!i.has(t.perroId));return`
    <section class="sv-routes" aria-labelledby="sv-routes-title">
      <div class="sv-section-head sv-routes-head">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno: retiro y entrega</h2>
        <p>Las arma el coordinador. Vos controlás que se cumplan. Si hay que cambiar algo, pedíselo con «Pedir cambio al coordinador».</p>
      </div>
      ${n.map(t=>uc(e,t,r)).join(``)}
      ${a.length?`
        <div class="sv-card">
          <h3 class="sv-subtitle">Marcados fuera de la ruta</h3>
          <ul class="sv-extra-list">
            ${a.map(e=>`<li class="sv-note is-info"><strong>${M(e.perroNombre||e.perroId)}</strong>: ${M(e.estado||`pendiente`)}. ${M(Lo(e))}</li>`).join(``)}
          </ul>
        </div>
      `:``}
    </section>
  `}function uc(e,t,n){let r=bs(e,t,n),i=xs(r),a=Gs(t.paseador),o=Gs(t.ayudante),s=As(e.fecha,e.shift).filter(e=>e.ruta===t.code&&!e.perroId),c=`control-${t.code}`;return`
    <article class="sv-card sv-route-card" aria-labelledby="sv-route-${So(t.code)}">
      <div class="sv-route-head">
        <div>
          <h3 id="sv-route-${So(t.code)}" class="sv-route-title"><span class="sv-route-code">${M(t.code)}</span> ${bo(t.stops.length,`perro`,`perros`)}</h3>
          <p class="sv-route-people">
            <span>${g(`userCheck`,`sv-icon`)} Paseador: <strong>${M(a||`Pendiente de confirmar`)}</strong></span>
            <span>${g(`users`,`sv-icon`)} Ayudante: <strong>${M(o||(t.source===`planilla`?`Pendiente de confirmar`:`sin ayudante`))}</strong></span>
          </p>
          <p class="sv-source">${M(hs(t))}${t.record.actualizadoEn&&t.source!==`planilla`?` · ${M(Lo(t.record,`Último cambio de`))}`:``}</p>
          ${t.notas?`<p class="sv-hint">Notas de la ruta: ${M(t.notas)}</p>`:``}
        </div>
        <p class="sv-route-counts">
          <span class="sv-tag is-ok">${i.atiempo} a tiempo</span>
          <span class="sv-tag ${i.atrasado?`is-danger`:`is-neutral`}">${bo(i.atrasado,`atrasado`,`atrasados`)}</span>
          <span class="sv-tag is-neutral">${bo(i.entregado,`entregado`,`entregados`)}</span>
        </p>
      </div>
      <div class="sv-actions">
        <a class="sv-button" id="sv-wa-${So(t.code)}" href="https://wa.me/?text=${encodeURIComponent(cc(e,t,r))}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`sv-icon`)} ${a?`Escribirle a ${M(a)} por WhatsApp`:`Escribir al paseador por WhatsApp`}
        </a>
        ${fc(e,t.code,``,`Pedir cambio al coordinador`)}
      </div>
      ${pc(s)}
      ${mc(e,t.code,``)}
      ${vo(c)}
      <ol class="sv-stop-list">
        ${r.map(n=>dc(e,t,n)).join(``)}
      </ol>
    </article>
  `}function dc(e,t,n){let{stop:r,id:i,status:a}=n,o=i&&to.has(i),s=a.record,c=So(`${t.code}-${r.perroId||r.perroNombre}`),l=[s?.horaRetiro&&a.retirado?`Retiro ${s.horaRetiro}`:``,s?.horaPaseo&&a.retirado?`Paseo ${s.horaPaseo}`:``,s?.horaEntrega&&a.kind===`entregado`?`Entrega ${s.horaEntrega}`:``].filter(Boolean),u=As(e.fecha,e.shift).filter(e=>e.perroId&&e.perroId===r.perroId),d=$a.has(i)?$a.get(i):s?.nota||``,f=eo.has(i)||$a.has(i)&&$a.get(i)!==(s?.nota||``),p=a.kind===`entregado`&&a.late?`<span class="sv-tag is-warn">Con atraso</span>`:a.kind===`curso`&&a.pickupLate?`<span class="sv-tag is-warn">Retiro +${a.pickupDelay} min</span>`:``;return`
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
        ${sc(r)}
        ${l.length||s?`
          <p class="sv-source">${M(l.join(` · `))}${l.length?` · `:``}${M(Lo(s))}</p>
        `:``}
        ${s?.nota?`<p class="sv-stop-note"><b>Nota para el paseador:</b> ${M(s.nota)}</p>`:``}
        ${pc(u)}
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
                ${fc(e,t.code,r.perroId,`Pedir cambio al coordinador`)}
              </div>
            </div>
          </details>
          ${mc(e,t.code,r.perroId)}
        `:`<p class="sv-hint">Sin ficha en el registro de perros: no se puede marcar desde acá.</p>`}
      </div>
    </li>
  `}function fc(e,t,n,r){return`<button type="button" class="sv-button sv-button-quiet" id="${So(`sv-req-open-${t||`turno`}-${n||`ruta`}`)}" data-sv-request-open data-ruta="${M(t)}" data-dog="${M(n)}">${g(`send`,`sv-icon`)} ${M(r)}</button>`}function pc(e){return e.length?`
    <ul class="sv-request-badges">
      ${e.map(e=>{let t=qa[e.estado]||qa.pendiente;return`<li class="sv-tag is-${t.tone}">Pedido «${M(e.tipo||`cambio`)}»: ${t.label}${e.pendiente?` (sin enviar)`:``}</li>`}).join(``)}
    </ul>
  `:``}function mc(e,t,n){let r=Ns(e);return!r.open||r.ruta!==t||(r.perroId||``)!==(n||``)?``:`
    <form class="sv-form sv-request-form" data-sv-request-form novalidate aria-labelledby="sv-req-title">
      <h4 id="sv-req-title">Pedir cambio al coordinador · ${M(`${t?`Ruta ${t}`:`Turno ${x[e.shift].label.toLowerCase()}`}${r.perroNombre?` · ${r.perroNombre}`:``}`)}</h4>
      <p class="sv-hint">El coordinador lo aplica en la ruta y te responde. Hoy, ${M(e.fechaLabel)}.</p>
      <label class="sv-field" for="sv-req-tipo">Qué hay que cambiar
        <select id="sv-req-tipo" data-sv-req="tipo">
          ${Ka.map(e=>`<option value="${e}" ${e===r.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
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
      ${vo(`request-form`)}
    </form>
  `}function hc(e){let t=js(e.fecha),n=t.filter(e=>(e.estado||`pendiente`)===`pendiente`).length;return`
    <details class="sv-fold" data-sv-fold="pedidos" ${os(`pedidos`,!0)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`send`,`sv-icon`)} Mis pedidos de cambio</span>
        <span class="sv-fold-meta">${t.length?`${n} pendiente${n===1?``:`s`} de ${t.length}`:io.has(`solicitudes`)?`Sin pedidos`:`Cargando…`}</span>
      </summary>
      <div class="sv-fold-body">
        ${vo(`requests`)}
        ${t.length?`
          <ul class="sv-request-list">
            ${t.map(e=>{let t=qa[e.estado]||qa.pendiente,n=e.actualizadoPor&&e.actualizadoPor!==e.creadoPor?Lo(e,`Respondió`):``;return`
                <li class="sv-request is-${t.tone}">
                  <div class="sv-saved-head">
                    <strong>${e.urgente?`<span class="sv-tag is-danger">Urgente</span> `:``}${M(ks(e))}</strong>
                    <span class="sv-state is-${t.tone}">${t.label}</span>
                  </div>
                  <p class="sv-source">${M(Eo(e.fecha))} · Turno ${M(String(e.turno||``).toLowerCase()||`Pendiente de confirmar`)} · ${e.pendiente?`Se enviará cuando haya señal.`:`Pedido a las ${M(Oo(e.creadoEn))} hs`}</p>
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
  `}function gc(e,t){let n=os(`observaciones`),r=Rs(e),i=zs(),a=new Set(t.map(e=>e.id)),o=C.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} en ${Ua} días`:`Sin registros`}</span>
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
          ${Is.map(e=>`
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
          ${vo(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${Ua} días</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>_c(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function _c(e){let t=Za===e.id,n=e.perroNombre||ss(e.perroId)?.name||`Pendiente de confirmar`;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${M(n)}</strong>
        <span>${M(Eo(e.fecha))}${e.hora?` · ${M(e.hora)} hs`:``}${e.lugar?` · ${M(e.lugar)}`:``}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${M(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Reacción</dt><dd>${M(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${M(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Resultado</dt><dd>${M(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${M(Bs(e))}</p>
      <div class="sv-actions">
        ${t?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${g(`copy`,`sv-icon`)} Copiar texto</button>
          ${Fo(e)?`<button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function vc(e){let t=os(`cierre`),n=Us(e),r=Js(e),i=n?.cerrado?n.horaCierre||Oo(n.actualizadoEn):``;return`
    <details class="sv-fold" data-sv-fold="cierre" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`flag`,`sv-icon`)} Cerrar el turno ${x[e.shift].label.toLowerCase()}</span>
        <span class="sv-fold-meta">${n?.cerrado?`Cerrado ${M(i)} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        ${n?`<p class="sv-source">${M(n.cerrado?Lo(n,`Lo cerró`):Lo(n,`Última nota de`))}</p>`:``}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${M(Ws(e))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar (incluye el cumplimiento del horario)
          <textarea id="sv-close-summary" class="sv-summary" rows="16" readonly>${M(r)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${g(`copy`,`sv-icon`)} Copiar resumen</button>
          ${n?.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${g(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${vo(`closure`)}
      </div>
    </details>
  `}function yc(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${os(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(Kt).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas y horarios: los arma el coordinador (plantilla semanal y cambios del día). Respaldo: ${Bt.officialSources.routes}, leída el ${zt}.</li>
          <li>Perros: ${Bt.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador. Incidentes y checklist los carga el equipo en la calle.</li>
          <li>Avisos por barrio, pedidos de cambio, observaciones y cierres se comparten con el equipo según permisos.</li>
        </ul>
      </div>
    </details>
  `}function F(e){if(!e)return Jo();qo(),$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function bc(){return wo().time}async function xc(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function Sc(e,t,n){let r=ms(e).routes.find(e=>e.code===t),i=r?.stops.find(e=>e.perroId===n);return r&&i?{route:r,stop:i}:null}function Cc(e,t,n,r){let i=_s(e.fecha,n.perroId,e.shift),a=vs().get(i),o={id:i,fecha:e.fecha,...r};return a||Object.assign(o,{perroId:n.perroId,perroNombre:n.perroNombre,turno:x[e.shift].label}),a?.ruta!==t.code&&(o.ruta=t.code),o}async function wc(e,t,n,r){let i=is(),a=Sc(i,e,t);if(!a)return;let{route:o,stop:s}=a,c=_s(i.fecha,t,i.shift);if(to.has(c))return;let l=vs().get(c),u=ys(s,l,i.now.minutes),d=bc(),f={horaRetiro:``,horaPaseo:``,horaEntrega:``},p=s.perroNombre,m=null,h=``,ee=`ok`;if(n===`retiro`){if(u.retirado)m={estado:`pendiente`,...f},h=`${p}: retiro desmarcado.`,ee=`info`;else{m={estado:`retirado`,horaRetiro:d};let e=u.planned===null?0:i.now.minutes-u.planned;h=`${p}: retirado a las ${d} hs${e>Ba?` (${e} min después de lo previsto)`:``}.`}}else if(n===`entrega`){if(!u.retirado)return;u.kind===`entregado`?(m={estado:l?.horaPaseo?`paseando`:`retirado`,horaEntrega:``},h=`${p}: entrega desmarcada.`,ee=`info`):(m={estado:`entregado`,horaEntrega:d},h=`${p}: entregado a las ${d} hs.`)}else if(n===`no-sale`){if(u.kind===`nosale`)m={estado:`pendiente`},h=`${p}: vuelve a la lista.`;else{if(u.retirado)return;m={estado:`no-sale`,...f},h=`${p}: no sale hoy. Si cambia la ruta, pedíselo al coordinador.`}}m&&(to.add(c),await Vo(`paseos`,Cc(i,o,s,m),`control-${o.code}`,h,ee),to.delete(c),F(r))}async function Tc(e,t,n){let r=is(),i=Sc(r,e,t);if(!i)return;let{route:a,stop:o}=i,s=_s(r.fecha,t,r.shift),c=String($a.has(s)?$a.get(s):document.querySelector(`[data-sv-note="${s}"]`)?.value||``).trim();if(za.test(c))return P(`control-${a.code}`,`La nota parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),F(n);await Vo(`paseos`,Cc(r,a,o,{nota:c}),`control-${a.code}`,c?`Nota para el paseador guardada en ${o.perroNombre}.`:`Nota de ${o.perroNombre} borrada.`)&&$a.delete(s),F(n)}async function Ec(e){let t=is(),n=rc(t);e.querySelectorAll(`[data-sv-aviso]`).forEach(e=>{n[e.dataset.svAviso]=e.value}),N(j.avisoDraft,n);let r=n.barrio.trim(),i=n.mensaje.trim();if(!r||!i)return P(`aviso`,`Falta completar: ${yo([!r&&`barrio`,!i&&`qué pasa`].filter(Boolean))}.`,`error`),F(r?`sv-aviso-mensaje`:`sv-aviso-barrio`);if(!/^\d{4}-\d{2}-\d{2}$/.test(n.vigenteHasta)||n.vigenteHasta<t.fecha)return P(`aviso`,`Elegí hasta cuándo vale el aviso (hoy, ${t.fechaLabel}, o después).`,`error`),F(`sv-aviso-hasta`);if(za.test(i)||za.test(r))return P(`aviso`,`El aviso parece tener un teléfono. Sacalo: los avisos no llevan datos de contacto.`,`error`),F(`sv-aviso-mensaje`);let a=Ga.includes(n.tipo)?n.tipo:`otro`;return await Vo(`avisos`,{fecha:t.fecha,barrio:r,tipo:a,mensaje:i,vigenteHasta:n.vigenteHasta,titulo:`${a[0].toUpperCase()}${a.slice(1)} · ${r}`},`aviso`,`Aviso de ${r} publicado. Lo ve el equipo.`)&&N(j.avisoDraft,{barrio:``,tipo:Ga[0],mensaje:``,vigenteHasta:t.fecha}),F(`sv-aviso-save`)}async function Dc(e){let t=is(),n=Ns(t);e.querySelectorAll(`[data-sv-req]`).forEach(e=>{n[e.dataset.svReq]=e.type===`checkbox`?e.checked:e.value}),N(j.requestDraft,n);let r=String(n.detalle||``).trim(),i=String(n.motivo||``).trim(),a=[];if(!r&&n.tipo!==`no sale`&&a.push(`detalle`),i||a.push(`qué pasó o con quién hablaste`),a.length)return P(`request-form`,`Falta completar: ${yo(a)}.`,`error`),F(!r&&n.tipo!==`no sale`?`sv-req-detalle`:`sv-req-motivo`);if(za.test(r)||za.test(i))return P(`request-form`,`El pedido parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),F(`sv-req-motivo`);let o=Ka.includes(n.tipo)?n.tipo:`otro`,s=x[t.shift].label,c={fecha:t.fecha,turno:s,ruta:n.ruta||``,tipo:o,perroId:n.perroId||``,perroNombre:n.perroNombre||``,detalle:r||(o===`no sale`?`${n.perroNombre||`El perro`} no sale hoy.`:``),motivo:i,urgente:!!n.urgente,estado:`pendiente`,respuesta:``,titulo:`${n.urgente?`URGENTE · `:``}${o[0].toUpperCase()}${o.slice(1)}${n.perroNombre?` · ${n.perroNombre}`:``}${n.ruta?` · ${n.ruta}`:``} · ${s} ${t.fechaLabel}`},l=await Vo(`solicitudes`,c,n.ruta?`control-${n.ruta}`:`requests`,`Pedido enviado al coordinador: ${ks(c)}. Lo vas a ver en «Mis pedidos de cambio».`);return l?(l.pendiente||so.set(l.id,`pendiente`),N(j.requestDraft,Ms(t)),F(So(`sv-req-open-${n.ruta||`turno`}-${n.perroId||`ruta`}`))):(Xa&&(Xa.area=`request-form`),F(`sv-req-save`))}async function Oc(e){let t=is(),n=Rs(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),N(j.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),Is.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())});let i=Do(n.fecha);if(!r.length&&!i)return P(`observation`,`Escribí una fecha real como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),F(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return P(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),F(`sv-obs-fecha`);if(r.length)return P(`observation`,`Falta completar: ${yo(r)}.`,`error`),F(n.dogId?n.fecha?`sv-obs-${Is.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=Is.find(e=>Ra.test(n[e.key]));if(a){let e=n[a.key].match(Ra)[2];return P(`observation`,`En «${a.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),F(`sv-obs-${a.key}`)}let o=ss(n.dogId);return await Vo(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:x[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada. La ve el equipo.`)&&N(j.observationDraft,Ls(t)),F(`sv-obs-save`)}async function kc(e,t,n,r){let i=Hs(e),a=Ws(e),o=Po(),s=Js(e,{...Us(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoPorNombre:o.nombre,actualizadoEn:new Date().toISOString(),pendiente:!1});await Vo(`cierres`,{id:i,fecha:e.fecha,turno:x[e.shift].label,notas:a,resumen:s,...t},`closure`,n,t.cerrado===!1?`info`:`ok`)&&Qa?.id===i&&Qa.notas===a&&(Qa=null),F(r)}function Ac(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return lh(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return Wo(!0),!0;let n=t.closest(`[data-sv-shift]`);if(n)return as(n.dataset.svShift),F(n.id),!0;let r=t.closest(`[data-sv-pickup]`);if(r)return wc(r.dataset.ruta,r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return wc(i.dataset.ruta,i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=So(`${a.dataset.ruta}-${a.dataset.svAbsent}`),t=is(),n=vs().get(_s(t.fecha,a.dataset.svAbsent,t.shift))?.estado===`no-sale`;return wc(a.dataset.ruta,a.dataset.svAbsent,`no-sale`,n?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-note-save]`);if(o)return Tc(o.dataset.ruta,o.dataset.svNoteSave,o.id),!0;let s=t.closest(`[data-sv-request-open]`);if(s){let e=is(),t=Ns(e),n=s.dataset.ruta||``,r=s.dataset.dog||``,i=t.open&&t.ruta===n&&(t.perroId||``)===r;return N(j.requestDraft,i?t:Ms(e,n,r,!0)),F(`sv-req-tipo`),!0}if(t.closest(`[data-sv-request-cancel]`)){let e=is(),t=Ns(e);return N(j.requestDraft,Ms(e)),F(So(`sv-req-open-${t.ruta||`turno`}-${t.perroId||`ruta`}`)),!0}let c=t.closest(`[data-sv-obs-copy]`);if(c){let e=zs().find(e=>e.id===c.dataset.svObsCopy);return e&&xc(Vs(e)).then(e=>{P(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),F(c.id)}),!0}let l=t.closest(`[data-sv-obs-delete]`);if(l)return Za=l.dataset.svObsDelete,F(`sv-obs-del-no-${Za}`),!0;let u=t.closest(`[data-sv-obs-delete-ok]`);if(u)return Za=null,Uo(`observaciones`,u.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>F(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=Za;return Za=null,F(`sv-obs-del-${e}`),!0}return t.closest(`[data-sv-close-copy]`)?(xc(Js(is()),`sv-close-summary`).then(e=>{P(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),F(`sv-close-copy`)}),!0):t.closest(`[data-sv-close-done]`)?(kc(is(),{cerrado:!0,horaCierre:bc()},`Turno marcado como cerrado. No te olvides de copiar el resumen.`,`sv-close-copy`),!0):t.closest(`[data-sv-close-reopen]`)?(kc(is(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0):!1}function jc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;let n=is();if(t.matches(`[data-sv-obs]`)){let e=Rs(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,N(j.observationDraft,e),!0}if(t.matches(`[data-sv-aviso]`)){let e=rc(n);return e[t.dataset.svAviso]=t.value,N(j.avisoDraft,e),!0}if(t.matches(`[data-sv-req]`)){let e=Ns(n);return e[t.dataset.svReq]=t.type===`checkbox`?t.checked:t.value,N(j.requestDraft,e),t.tagName===`SELECT`&&F(t.id),!0}return t.matches(`[data-sv-close-notes]`)?(Qa={id:Hs(n),notas:t.value},t.value===(Us(n)?.notas||``)?(Qa=null,!0):(kc(n,{},`Notas del cierre guardadas.`),!0)):!1}function Mc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=is();if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=Rs(n);e[t.dataset.svObs]=t.value,N(j.observationDraft,e)}else if(t.matches(`[data-sv-aviso]`)){let e=rc(n);e[t.dataset.svAviso]=t.value,N(j.avisoDraft,e)}else if(t.matches(`[data-sv-req]`)&&t.type!==`checkbox`){let e=Ns(n);e[t.dataset.svReq]=t.value,N(j.requestDraft,e)}else if(t.matches(`[data-sv-note]`))$a.set(t.dataset.svNote,t.value),eo.add(t.dataset.svNote);else if(t.matches(`[data-sv-close-notes]`)){Qa={id:Hs(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=Js(n))}}function Nc(e){let t=e.target;t.closest?.(`.sv-shell`)&&(t.matches?.(`[data-sv-obs-form]`)?(e.preventDefault(),Oc(t)):t.matches?.(`[data-sv-aviso-form]`)?(e.preventDefault(),Ec(t)):t.matches?.(`[data-sv-request-form]`)&&(e.preventDefault(),Dc(t)))}function Pc(e){let t=e.target;if(e.key!==`Enter`||!t.matches?.(`.sv-shell [data-sv-note]`))return;e.preventDefault();let n=t.closest(`.sv-stop-more-body`)?.querySelector(`[data-sv-note-save]`);n&&Tc(n.dataset.ruta,n.dataset.svNoteSave,t.id)}function Fc(e){let t=e.target;if(t.matches?.(`[data-sv-stop-more]`)){t.open?eo.add(t.dataset.svStopMore):eo.delete(t.dataset.svStopMore);return}if(!t.matches?.(`[data-sv-fold]`))return;let n=mo(j.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,N(j.folds,n))}function Ic(){_e.push(Ac),ve.push(jc),document.addEventListener(`input`,Mc),document.addEventListener(`submit`,Nc),document.addEventListener(`keydown`,Pc),document.addEventListener(`toggle`,Fc,!0),$o()}var Lc={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,borradores:`paseosJuan_coord_borradores`},Rc=`paseosJuan_coord_secciones`;function zc(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function Bc(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Vc(e){try{localStorage.removeItem(e)}catch{}}var Hc=null,Uc=null;function I(e,t,n=`ok`){Hc={section:e,text:t,tone:n},n===`error`?qc(t):Kc(t)}function Wc(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function Gc(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function Kc(e){Gc(Wc(`coord-live`,`status`,`polite`),e)}function qc(e){Gc(Wc(`coord-alerta`,`alert`,`assertive`),e)}var Jc=`America/Argentina/Buenos_Aires`;function L(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function Yc(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function Xc(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:Jc,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function Zc(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||``));if(!t)return!1;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCFullYear()===n&&a.getUTCMonth()===r-1&&a.getUTCDate()===i}function Qc(e,t){let[n,r,i]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1,i+t)).toISOString().slice(0,10)}function $c(e){let[t,n,r]=e.split(`-`).map(Number);return S[(new Date(Date.UTC(t,n-1,r)).getUTCDay()+6)%7]}function el(e){return`${$c(e)} ${Yc(e)}`}function tl(e){return Qc(y(),-e)}function nl(e,t=6){let n=[],r=y();for(let i=0;i<70&&n.length<t;i+=1){let t=Qc(r,i);$c(t)===e&&n.push(t)}return n}function R(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function rl(e){return R(e)}function il(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}var al={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function ol(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>al[e]||e).join(`, `):`Sin días`}function sl(e){let t=_l.map(t=>{let n=S.filter(n=>Xt(e,n,t));return n.length?`${t.toLowerCase()}: ${ol(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function cl(e,t=!1){let n=zc(Rc,{});return e in n?!!n[e]:t}function ll(e,t){Bc(Rc,{...zc(Rc,{}),[e]:t})}var ul=new Set;function dl(){return document.documentElement.dataset.motion===`calm`}function fl(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:dl()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}function z(e){requestAnimationFrame(()=>document.getElementById(e)?.focus({preventScroll:!1}))}function pl(){return _.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}function ml(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``));if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n>23||r>59?null:n*60+r}function hl(e){return ml(e)!==null}function B(e){let t=ml(e);return t===null?``:`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}var gl=S.filter(e=>e!==`Domingo`),_l=[`Mañana`,`Tarde`],vl={Mañana:`09:00`,Tarde:`14:45`},yl=new Map(C.map(e=>[e.id,e])),bl=new Map(C.map(e=>[R(e.name),e])),xl=C.filter(e=>e.review||e.status!==`Activo`);function Sl(e){return e.perroId&&yl.get(e.perroId)||bl.get(R(e.perroNombre))||null}function Cl(e){return!!e?.safety?.some(e=>/bozal/i.test(e))}function wl(e){if(!e)return``;let t=R(e),n=Vt.find(e=>e.id===t||R(e.name)===t||R(e.name.split(` `)[0])===t);return n?n.name:e}var Tl={solicitudes:()=>({desde:tl(14)}),plantillas:()=>({}),rutas:()=>({desde:y()}),clientes:()=>({}),avisos:()=>({}),pedidos:()=>({}),fichas:()=>({}),resueltos:()=>({}),observaciones:()=>({desde:tl(6)}),incidentes:()=>({desde:tl(6)})},El=Object.keys(Tl),Dl=[`pedidos`,`fichas`,`resueltos`];function Ol(e){return v.cached(e,Tl[e]())}var kl=new Set,Al=new Map,jl=new Map,Ml=!1,Nl=!1;function Pl(){Ml||(Ml=!0,$e(e=>{El.includes(e)&&(kl.add(e),Al.delete(e),Ll())}),window.addEventListener(`online`,Ll),window.addEventListener(`offline`,Ll))}function Fl(){let e=_.user();e&&El.forEach(t=>{let n=Tl[t](),r=`${e.usuario}|${n.desde||``}`,i=jl.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};jl.set(t,a),v.list(t,n).then(()=>{kl.add(t),Al.delete(t)}).catch(e=>{e.status!==401&&(Al.set(t,e.message),qc(e.message))}).finally(()=>{jl.get(t)===a&&(a.stop=v.watch(t,n)),Ll(),eu()})})}function Il(){[...jl.values()].forEach(e=>e.stop?.()),jl.clear(),Al.clear(),Fl()}function Ll(){Nl||(Nl=!0,requestAnimationFrame(()=>{Nl=!1,document.querySelector(`.coord-shell`)&&Rl()}))}function Rl(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;yd.has(t)||(vd[t]=Cd(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function zl(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}function Bl(e){let t=_.user();return!t||!e||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function Vl(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${Xc(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${L(e.creadoPorNombre)}${e.creadoEn?` el ${Xc(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre;n.push(`Último cambio${t?` de ${L(t)}`:``}: ${Xc(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var Hl=new Set;async function Ul(e,t,{section:n,ok:r}){try{let i=await v.save(e,t);return I(n,i.pendiente?`${r} Sin señal: se enviará cuando vuelva.`:r),i}catch(e){return I(n,`No se pudo guardar: ${e.message}`,`error`),null}finally{Ll()}}async function Wl(e,t,{section:n,ok:r,undo:i=!0}){try{return await v.remove(e,t.id),Uc=i?{col:e,record:t,section:n}:null,I(n,r),Hc.undo=i,!0}catch(e){return I(n,`No se pudo borrar: ${e.message}`,`error`),!1}finally{Ll()}}function Gl(e,t){Hl.has(e)||(Hl.add(e),Promise.resolve().then(t).finally(()=>Hl.delete(e)))}var Kl=!1,ql=!1,Jl=``,Yl=/^[a-z0-9][a-z0-9_.-]{0,90}$/i,Xl=[`nuevo`,`en-curso`,`resuelto`];function Zl(e){return Yl.test(String(e||``))?`ant_${String(e)}`:void 0}function Ql(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let n=`${t[3]}-${t[2].padStart(2,`0`)}-${t[1].padStart(2,`0`)}`;return Zc(n)?n:null}function $l(){let e=y(),t=[];zc(Lc.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:Lc.pedidos,oldId:n.id,col:`pedidos`,data:{id:Zl(n.id),fecha:Ql(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:Xl.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),zc(Lc.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:Lc.altas,oldId:r,col:`fichas`,data:{id:Zl(r),fecha:Ql(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})});let n=new Set(Ol(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(zc(Lc.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:Lc.resueltos,oldId:e,skip:!0});return}let i=yl.get(e);t.push({key:Lc.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function eu(){if(!(Kl||ql)&&Dl.every(e=>kl.has(e))){ql=!0;try{let e=zc(Lc.borradores,{});Object.entries(e).forEach(([e,t])=>{e!==`pago`&&!vd[e]&&(vd[e]=t)}),Vc(Lc.borradores);let t=$l();if(!t.length){Kl=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await v.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[Lc.pedidos,Lc.altas].forEach(e=>{let t=zc(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?Bc(e,t):Vc(e)});let a=Object.fromEntries(Object.entries(zc(Lc.resueltos,{})).filter(([e])=>n.has(`${Lc.resueltos}|${e}`)));Object.keys(a).length?Bc(Lc.resueltos,a):Vc(Lc.resueltos),r&&(Jl=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo.`,Kc(Jl)),n.size?(Al.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),qc(Al.get(`migracion`))):Kl=!0}finally{ql=!1,Ll()}}}var tu={Mañana:0,Tarde:1},nu=/^[A-Z0-9][A-Z0-9_]{1,19}$/;function ru(e){return e&&Array.isArray(e.paradas)&&e.ruta&&e.dia}function iu(e,t){return(tu[e.turno]??9)-(tu[t.turno]??9)||String(e.ruta).localeCompare(String(t.ruta))}function au(e,t){return`${e}_${rl(t)}`}function ou(e,t){return`${e}_${t}`}function su(){return Ol(`plantillas`).filter(ru)}function cu(){return Ol(`rutas`).filter(e=>ru(e)&&e.fecha)}function lu(e){return su().filter(t=>t.dia===e).sort(iu)}function uu(e){let t=$c(e),n=new Map(cu().filter(t=>t.fecha===e).map(e=>[e.ruta,e])),r=lu(t).map(e=>{let t=n.get(e.ruta);return n.delete(e.ruta),t?{...t,origen:`dia`,plantillaId:e.id}:{...e,origen:`plantilla`,plantillaId:e.id}});return n.forEach(e=>r.push({...e,origen:`dia`,plantillaId:``})),r.sort(iu)}function du(e){return(e.paradas||[]).filter(e=>hl(e.hora)).map(e=>e.hora).sort((e,t)=>ml(e)-ml(t))}function fu(e){let t=du(e);return t.length?t.length===1?B(t[0]):`${B(t[0])} a ${B(t[t.length-1])}`:`Sin horarios`}function pu(e){let t=du(e);return t.length?nn(B(t[t.length-1]),15):vl[e.turno]||`09:00`}function mu(e){let t=ml(e.hora);return t===null?null:[t,t+(Number(e.minutos)||45)]}function hu(e,t){return e&&t&&e[0]<t[1]&&t[0]<e[1]}function gu(e,t=[]){let n=[],r=new Map,i=(e,t)=>{n.push(t),e.forEach(e=>r.set(e,[...r.get(e)||[],t]))},a=(e.paradas||[]).map((e,t)=>({stop:e,index:t,dog:Sl(e),win:mu(e)}));a.forEach(({stop:e,index:t,dog:n,win:r})=>{let a=e.perroNombre||n?.name||`Pendiente de confirmar`;r||i([t],`${a}: falta la hora de retiro.`),n?n.status!==`Activo`&&i([t],`${a}: estado «${n.status}».`):i([t],`${a}: no está en el registro de perros (perro sin ficha).`)});let o=new Map;for(let e=0;e<a.length;e+=1)for(let t=e+1;t<a.length;t+=1){let n=a[e],r=a[t];if(!n.dog||!r.dog)continue;if(n.dog.id===r.dog.id){i([n.index,r.index],`${n.dog.name} está dos veces en esta ruta.`);continue}if(!hu(n.win,r.win))continue;((n.dog.incompatibleWith||[]).includes(r.dog.name)||(r.dog.incompatibleWith||[]).includes(n.dog.name))&&i([n.index,r.index],`No juntar: ${n.dog.name} y ${r.dog.name} van en la misma franja (${B(n.stop.hora)} y ${B(r.stop.hora)}).`);let s=n.dog.size===`Pequeño`&&r.dog.size===`Grande`?n:r.dog.size===`Pequeño`&&n.dog.size===`Grande`?r:null;if(s){let e=s===n?r:n;o.has(s.index)||o.set(s.index,{small:s,bigs:[]}),o.get(s.index).bigs.push(e)}}return o.forEach(({small:e,bigs:t})=>{let n=[...new Set(t.map(e=>e.dog.name))];i([e.index,...t.map(e=>e.index)],`Tamaños mezclados: ${e.dog.name} (pequeño) comparte franja con ${il(n)} (${n.length===1?`grande`:`grandes`}).`)}),t.filter(t=>t.ruta!==e.ruta).forEach(e=>{(e.paradas||[]).forEach(t=>{let n=Sl(t);a.forEach(({index:r,dog:a,win:o})=>{a&&n&&a.id===n.id&&hu(o,mu(t))&&i([r],`${a.name} también está en ${e.ruta} a las ${B(t.hora)}.`)})})}),{list:[...new Set(n)],byStop:r}}function _u(e){return gu(e,lu(e.dia))}function vu(e,t){return gu(e,uu(t))}function yu(e,{fecha:t}={}){let n=[`*Ruta ${t?`${e.ruta} · ${el(t)} · ${e.turno}`:`${e.ruta} · ${e.dia} · ${e.turno} (plantilla semanal)`}*`,`Paseador: ${wl(e.paseador)||`Pendiente de confirmar`} | Ayudante: ${wl(e.ayudante)||`sin ayudante`} | Supervisa: ${wl(e.supervisor)||`Pendiente de confirmar`}`],r=(e.paradas||[]).slice().sort((e,t)=>(ml(e.hora)??9999)-(ml(t.hora)??9999));return r.forEach((e,t)=>{let r=Sl(e),i=[];e.nota&&i.push(e.nota),Cl(r)&&!/bozal/i.test(e.nota||``)&&i.push(`Usa bozal`),n.push(`${t+1}) ${B(e.hora)||`sin hora`} ${e.perroNombre||r?.name||`Pendiente de confirmar`} · ${Number(e.minutos)||45} min${i.length?` · ${i.join(` · `)}`:``}`)}),r.length||n.push(`Sin perros cargados.`),e.notas&&n.push(`Notas: ${e.notas}`),n.join(`
`)}var V=null,bu=``,xu=``,Su=``,Cu=!1,wu=``,Tu=``;function Eu(){return zc(Rc,{}).rutasVista===`dia`?`dia`:`semana`}function Du(e){Bc(Rc,{...zc(Rc,{}),rutasVista:e})}function Ou(){let e=y();return(!Zc(Tu)||Tu<e)&&(Tu=e),Tu}function ku(e){return(e||[]).map(e=>({perroId:e.perroId||``,perroNombre:e.perroNombre||Sl(e)?.name||``,hora:B(e.hora)||e.hora||``,minutos:Number(e.minutos)||45,nota:e.nota||``}))}function Au(e,{modo:t,fecha:n=``,nuevo:r=!1,solicitud:i=null}={}){V={modo:t,fecha:n,nuevo:r,id:t===`plantilla`?au(e.ruta,e.dia):ou(n,e.ruta),dia:t===`dia`?$c(n):e.dia,turno:e.turno,ruta:e.ruta,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,paradas:ku(e.paradas),plantillaId:e.plantillaId||(t===`plantilla`?e.id:``),existeDia:t===`dia`&&e.origen===`dia`?e:null,soloDia:t===`plantilla`&&nl(e.dia)[0]||``,solicitudId:i?.id||``,precarga:``,respuesta:``,sucio:!1},bu=``,xu=``,Su=``}function ju(){V=null,bu=``,xu=``,Su=``}function Mu(e,t){let n=t===`Mañana`?`M`:`T`;for(let t=1;t<10;t+=1){let r=`PJ_${t}${n}`;if(!e.some(e=>e.ruta===r))return r}return`PJ_X${n}`}function Nu(){if(!V)return{list:[],byStop:new Map};let e=V.modo===`plantilla`?lu(V.dia):uu(V.fecha);return gu(V,e)}function Pu(e,t){let n=hl(xu)?B(xu):pu(V);V.paradas.push({perroId:e?.id||``,perroNombre:e?.name||t,hora:n,minutos:e?.minutes||45,nota:e?.incompatibleWith?.length?`No juntar con ${il(e.incompatibleWith)}`:Cl(e)?`Bozal`:``}),V.sucio=!0,bu=``,xu=``}function Fu(){V.paradas.sort((e,t)=>(ml(e.hora)??9999)-(ml(t.hora)??9999)),V.sucio=!0}function Iu(){return{dia:V.dia,turno:V.turno,ruta:V.ruta,paseador:V.paseador.trim(),ayudante:V.ayudante.trim(),supervisor:V.supervisor.trim(),notas:V.notas.trim(),paradas:ku(V.paradas)}}function Lu(){let e=String(V.ruta||``).trim().toUpperCase().replace(/\s+/g,`_`);if(!nu.test(e))return[`El código de la ruta tiene que ser como PJ_1M (letras, números y guion bajo).`,`coord-ed-ruta`];if(V.ruta=e,V.nuevo&&(V.modo===`plantilla`?su().some(t=>t.id===au(e,V.dia)):uu(V.fecha).some(t=>t.ruta===e)))return[`Ya hay una ruta ${e} ese día. Elegí otro código o editá la que existe.`,`coord-ed-ruta`];let t=V.paradas.findIndex(e=>!hl(e.hora));return t>=0?[`Falta la hora de retiro de ${V.paradas[t].perroNombre||`un perro`}.`,`coord-ed-hora-${t}`]:null}var Ru={},zu=``;function Bu(){return Ol(`solicitudes`).slice().sort(zl)}function Vu(){return Bu().filter(e=>(e.estado||`pendiente`)===`pendiente`).sort((e,t)=>Number(!!t.urgente)-Number(!!e.urgente)||String(e.fecha||``).localeCompare(String(t.fecha||``))||zl(t,e))}function Hu(e){return e.perroId&&yl.get(e.perroId)?yl.get(e.perroId):bl.get(R(e.perroNombre))||null}function Uu(e){let t=/(\d{1,2})\s*[:.h]\s*(\d{2})/.exec(String(e||``));return t?B(`${t[1]}:${t[2]}`):``}function Wu(e){let t=Zc(e.fecha)?e.fecha:y(),n=Hu(e),r=uu(t),i=e.ruta?r.find(t=>t.ruta===e.ruta):null;!i&&n&&(i=r.find(t=>(!e.turno||t.turno===e.turno)&&(t.paradas||[]).some(e=>Sl(e)?.id===n.id))),!i&&e.turno&&(i=r.find(t=>t.turno===e.turno));let a=!i;if(!i){let n=e.turno||`Mañana`;i={ruta:e.ruta||Mu(r,n),dia:$c(t),turno:n,paradas:[],origen:`plantilla`}}Au(i,{modo:`dia`,fecha:t,nuevo:a,solicitud:e});let o=R(e.tipo),s=n?V.paradas.findIndex(e=>Sl(e)?.id===n.id):V.paradas.findIndex(t=>R(t.perroNombre)===R(e.perroNombre)),c=Uu(e.detalle),l=n?.name||e.perroNombre||`el perro`;o===`no sale`?s>=0?(V.paradas.splice(s,1),V.precarga=`Ya saqué a ${l} de la ruta. Revisá y guardá.`):V.precarga=`${l} no está en esta ruta: revisá a mano.`:o===`cambiar hora`?s>=0&&c?(V.paradas[s].hora=c,V.precarga=`Ya cambié la hora de ${l} a las ${c}. Revisá y guardá.`):V.precarga=`No pude precargar la hora nueva: cambiala a mano.`:o===`agregar perro`?s>=0?V.precarga=`${l} ya estaba en la ruta: revisá la hora.`:n||e.perroNombre?(c&&(xu=c),Pu(n,e.perroNombre),V.precarga=`Ya agregué a ${l} a las ${V.paradas[V.paradas.length-1].hora}. Revisá y guardá.`):V.precarga=`No dice qué perro agregar: buscalo abajo.`:V.precarga=`Este cambio se hace a mano: revisá el pedido y ajustá la ruta.`,V.sucio=!0,V.respuesta=``}var Gu=[[`activo`,`Activo`],[`pausa`,`En pausa`],[`baja`,`De baja`]],Ku=[b,...Ut.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`,`Otro (anotalo en notas)`],qu=[b,`Mañana`,`Tarde`,`Mañana y tarde`],Ju=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],Yu=``;function Xu(){return Ol(`clientes`).slice().sort((e,t)=>String(e.nombre||``).localeCompare(String(t.nombre||``),`es`))}function Zu(){return Ol(`avisos`).slice().sort(zl)}function Qu(e,t=y()){return Zc(e.vigenteHasta)?e.vigenteHasta>=t:(e.fecha||``)===t}function $u(){return Zu().filter(e=>Qu(e))}function ed(e){let t=new Map;return e.forEach(e=>{let n=e.barrio||`Sin barrio`;t.has(n)||t.set(n,[]),t.get(n).push(e)}),[...t.entries()].sort((e,t)=>e[0].localeCompare(t[0],`es`))}function td(){let e=new Map;return[...on,...Xu().map(e=>e.barrio),...Zu().map(e=>e.barrio)].forEach(t=>{let n=String(t||``).trim();n&&!e.has(R(n))&&e.set(R(n),n)}),[...e.values()].sort((e,t)=>e.localeCompare(t,`es`))}function nd(e){return[`*Aviso Paseos Juan · ${e.barrio||`Sin barrio`}*`,`Tipo: ${e.tipo||`otro`}`,e.mensaje||``,`Vigente hasta: ${Zc(e.vigenteHasta)?Yc(e.vigenteHasta):Yc(e.fecha)}`].filter(Boolean).join(`
`)}var rd=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],id=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],ad=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],od={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function sd(e){return e.estado===`curso`?`en-curso`:Xl.includes(e.estado)?e.estado:`nuevo`}function cd(){return Ol(`pedidos`).slice().sort(zl)}function ld(){return Ol(`fichas`).slice().sort(zl)}function ud(){let e={};return Ol(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function dd(e){return e.datos?.perro||e.perro||``}function fd(e){return e.filter(e=>e.origen===`web`&&sd(e)===`nuevo`)}function pd(){let e=ud();return xl.filter(t=>!e[t.id])}function md(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function hd(e,t,n=`secondary`,r=`Escribirle por WhatsApp`){if(!e)return``;let i=md(e);return i?`<a class="coord-btn is-${n}" href="https://wa.me/${i}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${g(`message`,`coord-icon`)}<span>${r}</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`:`<p class="coord-inline-alert">${g(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina.</span></p>`}var gd=gl;function _d(e){let t=R(e),n=gd.map(R),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return gd.slice(e,t+1)}return gd.filter((e,r)=>t.includes(n[r]))}var vd={},yd=new Set;function bd(e){return vd[e]||{}}function xd(e,t){vd[e]=t,yd.delete(e)}function Sd(e){delete vd[e],yd.add(e)}function Cd(e){let t={...bd(e.dataset.coordForm)},n=new Set;return e.querySelectorAll(`[name]`).forEach(r=>{if(r.type!==`file`){if(r.type===`checkbox`){if(n.has(r.name))return;n.add(r.name);let i=e.querySelectorAll(`[name="${r.name}"]`);t[r.name]=[...i].filter(e=>e.checked).map(e=>e.value)}else t[r.name]=r.value}}),t}function wd(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${L(r)}" ${i?`placeholder="${L(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function H(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`,l=r.map(e=>Array.isArray(e)?e:[e,e]);return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``}>
        ${l.map(([e,t])=>`<option value="${L(e)}" ${e===i?`selected`:``}>${L(t)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function Td(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``,required:c=!1}={}){let l=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${l}">${n}${c?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <textarea id="${l}" name="${t}" rows="3" ${i?`placeholder="${L(i)}"`:``} ${a?`aria-describedby="${l}-hint"`:``} ${s}>${L(r)}</textarea>
      ${a?`<small id="${l}-hint">${a}</small>`:``}
    </div>
  `}function Ed(e,t){return`
    <div class="coord-field is-wide">
      <span class="coord-label" id="coord-${e}-dias-label">Días</span>
      <div class="coord-days" role="group" aria-labelledby="coord-${e}-dias-label">
        ${gl.map(n=>`
          <label class="coord-day"><input type="checkbox" id="coord-${e}-dia-${rl(n)}" name="dias" value="${n}" ${t.includes(n)?`checked`:``} /><span>${n}</span></label>
        `).join(``)}
      </div>
    </div>
  `}function Dd(e){if(!Hc||Hc.section!==e)return``;let t=Hc.undo?`<button class="coord-link" type="button" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${Hc.tone}">${g(Hc.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${L(Hc.text)}</span>${t}</p>`}function U(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?g(r,`coord-icon`):``}<span>${e}</span></button>`}function Od({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${cl(e,s)?`open`:``}>
      <summary data-coord-toggle="${e}">
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
  `}function W(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function kd(e){return e?.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${L(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${g(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${L(e)}</li>`).join(``)}
    </ul>
  `:``}function Ad(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${L(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function jd(e,t){return e.length?`
    <div class="coord-warn-box" role="note" ${t?`id="${t}"`:``}>
      <h3>${g(`alertTriangle`,`coord-icon`)}<span>${e.length===1?`1 aviso para revisar`:`${e.length} avisos para revisar`}</span></h3>
      <ul>${e.map(e=>`<li>${L(e)}</li>`).join(``)}</ul>
      <p>No bloquea el guardado: revisalo antes de mandar la ruta.</p>
    </div>
  `:``}var Md=`
  <datalist id="coord-team-users">${Vt.map(e=>`<option value="${L(e.id)}">${L(e.name)} · ${L(e.label)}</option>`).join(``)}</datalist>
  <datalist id="coord-team-names">${Vt.map(e=>`<option value="${L(e.name.split(` `)[0])}">${L(e.name)}</option>`).join(``)}</datalist>
`;function Nd(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Pd()}
      ${e}
    </div>
  `}function Pd(){return`
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
  `}function Fd(){Pl(),Fl();let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${Id()}
      ${Rd()}
      ${Bd()}
      ${Vd()}
      ${Yd()}
      ${ef()}
      ${tf()}
      ${af()}
      ${cf()}
      ${uf()}
      ${gf()}
      <p class="coord-footnote">
        Rutas de partida: ${L(Bt.officialSources.routes)} (${zt}). Datos de perros: ${L(Bt.officialSources.dogs)}.
        Rutas, clientes, avisos y pedidos se guardan en los datos compartidos del equipo. Los pagos los ve solo Juan.
      </p>
      ${Md}
    </main>
  `;return Hc=null,yd.clear(),e}function Id(){let e=v.pendingCount(),t=navigator.onLine===!1,n=[...new Set(Al.values())],r=[];return e?r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>${e} ${e===1?`cambio pendiente`:`cambios pendientes`} sin señal.</b> Se ${e===1?`envía solo`:`envían solos`} cuando vuelva.</span></p>`):t&&r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva.</span></p>`),n.length&&r.push(`<div class="coord-sync is-error">${g(`alertCircle`,`coord-icon`)}<span>${n.map(L).join(` `)}</span>${U(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),Jl&&r.push(`<p class="coord-sync is-ok">${g(`uploadCloud`,`coord-icon`)}<span>${L(Jl)}</span></p>`),r.length?`<div class="coord-sync-list">${r.join(``)}</div>`:``}function Ld(e,{compact:t=!1}={}){let n=L(e.id),r=e.estado||`pendiente`,i=e.perroNombre||Hu(e)?.name||``,a=e.creadoPorNombre?`${e.creadoPorNombre}${e.creadoEn?`, ${Xc(e.creadoEn)}`:``}`:b,o=e.titulo||[e.tipo,i].filter(Boolean).join(`: `),s=zu===e.id;return`
    <li class="coord-sol ${e.urgente?`is-urgent`:``} is-${L(r)}" id="coord-sol-${n}" tabindex="-1">
      <div class="coord-sol-head">
        <strong>${L(o||`Pedido de cambio`)}</strong>
        <span class="coord-badges">${e.urgente?W(`Urgente`,`alert`):``}${r===`aplicado`?W(`Aplicado`,`ok`):W(r===`rechazado`?`Rechazado`:`Pendiente`,`warn`)}</span>
      </div>
      <p class="coord-sol-where">${g(`route`,`coord-icon`)}<span>${L([e.fecha?el(e.fecha):``,e.turno,e.ruta].filter(Boolean).join(` · `)||`Pendiente de confirmar`)}</span></p>
      ${Ad([[`Qué cambiar`,e.detalle],[`Por qué`,e.motivo],[`Pidió`,a],[`Respuesta`,e.respuesta]],t?`is-compact`:``)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      ${r===`pendiente`?`
        ${s?`
          <div class="coord-reject">
            <label for="coord-rechazo-${n}">Respuesta para el supervisor <span class="coord-required">(obligatorio)</span></label>
            <textarea id="coord-rechazo-${n}" rows="2" data-coord-rechazo="${n}" placeholder="Ej.: Ese día no hay lugar en la ruta; lo pasamos al lunes.">${L(Ru[e.id]||``)}</textarea>
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
  `}function Rd(){let e=y(),t=pl(),n=fd(cd()),r=Vu(),i=r.filter(e=>e.urgente),a=su().length>0,o=uu(e),s=o.reduce((t,n)=>t+vu(n,e).list.length,0),c=o.reduce((e,t)=>e+(t.paradas||[]).length,0),l=$u(),u=ed(l).map(([e])=>e),d=pd(),f;if(i.length)f={text:`Resolvé el pedido urgente de <b>${L(i[0].creadoPorNombre||`supervisión`)}</b>: ${L(i[0].titulo||i[0].tipo||`cambio de ruta`)}.`,action:U(`Aplicar`,`data-coord-sol-aplicar="${L(i[0].id)}"`,`primary`,`arrowRight`)};else if(n.length){let e=n[n.length-1],t=e.datos||{};f={text:`Escribile a <b>${L(t.responsable||`quien hizo el pedido`)}</b> por la evaluación de <b>${L(t.perro||`su perro`)}</b>.`,action:U(`Ver pedido`,`data-coord-goto-pedido="${L(e.id)}"`,`primary`,`arrowRight`)}}else f=!a&&kl.has(`plantillas`)?{text:`Cargá las rutas de la planilla RPJ para tener la semana armada.`,action:U(`Ir a rutas`,`data-coord-goto="coord-rutas"`,`primary`,`arrowRight`)}:r.length?{text:`Respondé el pedido de cambio de <b>${L(r[0].creadoPorNombre||`supervisión`)}</b>.`,action:U(`Aplicar`,`data-coord-sol-aplicar="${L(r[0].id)}"`,`primary`,`arrowRight`)}:s?{text:`Revisá ${s===1?`el aviso`:`los ${s} avisos`} de las rutas de hoy.`,action:U(`Ver rutas de hoy`,`data-coord-ver-dia="${e}"`,`primary`,`arrowRight`)}:d.length?{text:`Confirmá el dato de <b>${L(d[0].name)}</b>: ${L(d[0].review||`estado "${d[0].status}"`)}`,action:U(`Ver datos`,`data-coord-open="datos"`,`primary`,`arrowRight`)}:{text:`Todo en orden. Mirá las rutas del día siguiente.`,action:U(`Ver el día siguiente`,`data-coord-ver-dia="${Qc(e,1)}"`,`primary`,`arrowRight`)};let p=r.slice(0,3);return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${el(e)}</p>
        <p class="coord-greeting">Hola, ${L(t.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
      </div>

      ${r.length?`
        <div class="coord-sol-alert" id="coord-sol-urgente" tabindex="-1">
          <h2>${g(`bell`,`coord-icon`)}<span>${r.length===1?`1 pedido de cambio del supervisor`:`${r.length} pedidos de cambio del supervisor`}</span></h2>
          ${Dd(`solicitudes`)}
          <ul class="coord-sol-list">${p.map(e=>Ld(e,{compact:!0})).join(``)}</ul>
          ${r.length>p.length?`<p>Y ${r.length-p.length} más. ${U(`Ver todos`,`data-coord-open="solicitudes"`,`ghost`)}</p>`:``}
        </div>`:Dd(`solicitudes`)}

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-alert`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Pedidos nuevos de la web</h2>
            <p class="coord-big"><b>${n.length}</b> <span>${n.length,`sin responder`}</span></p>
            <p>${n.length?L(il(n.slice(0,3).map(e=>e.datos?.perro||`Pendiente de confirmar`))):kl.has(`pedidos`)?`No hay pedidos nuevos.`:`Cargando pedidos…`}</p>
          </div>
          ${U(`Ver pedidos`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${a?s?`is-alert`:`is-ok`:`is-warn`}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Rutas de hoy</h2>
            ${!a&&!o.length?`<p class="coord-big"><b>0</b> <span>rutas</span></p><p>${kl.has(`plantillas`)?`Todavía no hay rutas cargadas.`:`Cargando rutas…`}</p>`:`<p class="coord-big"><b>${o.length}</b> <span>${o.length===1?`ruta`:`rutas`}</span> <b>${c}</b> <span>paseos</span></p>
                 ${s?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${s} ${s===1?`aviso`:`avisos`} para revisar</span></p>`:`<p>Sin avisos.</p>`}`}
          </div>
          ${U(a?`Ver rutas de hoy`:`Cargar rutas`,a?`data-coord-ver-dia="${e}"`:`data-coord-goto="coord-rutas"`,`secondary`)}
        </li>
        <li class="coord-priority ${l.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Avisos de barrio vigentes</h2>
            <p class="coord-big"><b>${l.length}</b> <span>${u.length===1?`en 1 barrio`:`en ${u.length} barrios`}</span></p>
            <p>${l.length?L(il(u.slice(0,3))):`Sin avisos vigentes.`}</p>
          </div>
          ${U(l.length?`Ver avisos`:`Cargar un aviso`,l.length?`data-coord-goto="coord-avisos-vigentes"`:`data-coord-open="avisos"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function zd(e,{history:t=!1}={}){let n=L(e.id);return`
    <li class="coord-aviso ${t?`is-old`:``}">
      <div class="coord-aviso-head">
        ${t?`<strong>${L(e.barrio||`Sin barrio`)}</strong>`:``}
        ${W(L(e.tipo||`otro`),e.tipo===`seguridad`||e.tipo===`perro suelto`?`alert`:`warn`)}
        <small>${t?`Venció`:`Hasta`} el ${L(Yc(Zc(e.vigenteHasta)?e.vigenteHasta:e.fecha))}</small>
      </div>
      <p>${L(e.mensaje||e.titulo||``)}</p>
      ${Vl(e)}
      <div class="coord-actions">
        ${U(`Copiar para WhatsApp`,`data-coord-aviso-copy="${n}"`,`ghost`,`copy`)}
        ${t?``:U(`Ya no está vigente`,`data-coord-aviso-fin="${n}"`,`ghost`)}
      </div>
    </li>
  `}function Bd(){let e=$u();return e.length?`
    <section class="coord-block coord-avisos-strip" id="coord-avisos-vigentes" tabindex="-1" aria-labelledby="coord-avisos-vig-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-avisos-vig-title">Avisos vigentes por barrio</h2>
          <p>Lo que el equipo tiene que saber hoy en cada barrio.</p>
        </div>
        ${U(`Cargar un aviso`,`data-coord-open="avisos"`,`secondary`,`plus`)}
      </div>
      ${Dd(`avisosTop`)}
      <div class="coord-barrios">
        ${ed(e).map(([e,t])=>`
          <section class="coord-barrio" aria-label="Avisos en ${L(e)}">
            <h3>${g(`mapPin`,`coord-icon`)}<span>${L(e)}</span> <small>${t.length}</small></h3>
            <ul class="coord-aviso-list">${t.map(e=>zd(e)).join(``)}</ul>
          </section>
        `).join(``)}
      </div>
    </section>
  `:``}function Vd(){let e=su(),t=!kl.has(`plantillas`)&&!e.length,n;if(V)n=Jd();else if(t)n=`<p class="coord-empty">${g(`clock`,`coord-icon`)}Cargando rutas…</p>`;else if(!e.length||wu)n=Hd();else{let e=Eu();n=`
      <div class="coord-seg" role="group" aria-label="Qué querés ver">
        <button type="button" class="coord-seg-btn" id="coord-vista-semana" data-coord-vista="semana" aria-pressed="${e===`semana`}">${g(`calendarCheck`,`coord-icon`)}<span>Semana (se repite)</span></button>
        <button type="button" class="coord-seg-btn" id="coord-vista-dia" data-coord-vista="dia" aria-pressed="${e===`dia`}">${g(`route`,`coord-icon`)}<span>Un día puntual</span></button>
      </div>
      ${e===`semana`?Wd():Gd()}
    `}return`
    <section class="coord-block coord-routes" id="coord-rutas" tabindex="-1" aria-labelledby="coord-rutas-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-rutas-title">Rutas y horarios</h2>
          <p>La <b>semana</b> se repite todas las semanas. Si un día puntual cambia algo, guardalo <b>solo para ese día</b>: la semana no se toca.</p>
        </div>
      </div>
      ${Dd(`rutas`)}
      ${n}
    </section>
  `}function Hd(){let e=an(),t=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <div class="coord-carga">
      <p>Todavía no hay rutas armadas en la app. Podés arrancar con las rutas reales de la planilla RPJ (hoja BASE RUTAS, leída el 12/11/2026): <b>${e.length} rutas</b> y <b>${t} paseos</b> con su hora de retiro. Después las cambiás acá.</p>
      ${wu?`<p class="coord-note" role="status">${g(`clock`,`coord-icon`)}<span>${L(wu)}</span></p>`:``}
      ${Cu?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-carga-q">
          <p id="coord-carga-q"><b>¿Confirmás?</b> Se guardan ${e.length} rutas como semana base. Las ve todo el equipo.</p>
          <div class="coord-actions">
            ${U(`Sí, cargar las rutas`,`id="coord-carga-ok" data-coord-carga-ok`,`primary`,`checkCircle`)}
            ${U(`Cancelar`,`id="coord-carga-cancel" data-coord-carga-cancel`,`ghost`)}
          </div>
        </div>`:`<button class="coord-btn is-primary coord-btn-big" type="button" id="coord-carga" data-coord-carga>${g(`uploadCloud`,`coord-icon`)}<span>Cargar las rutas de la planilla RPJ</span></button>`}
      <p class="coord-meta">No incluye a «Llak» (jueves tarde): el nombre no coincide con ningún perro. Paseador y ayudante quedan para completar.</p>
    </div>
  `}function Ud(e,{warnings:t,attrs:n}){let r=(e.paradas||[]).length;return`
    <button type="button" class="coord-wroute ${t?`is-alert`:``}" ${n}>
      <span class="coord-wroute-top"><strong>${L(e.ruta)}</strong>${t?`<span class="coord-wroute-warn">${g(`alertTriangle`,`coord-icon`)}${t}<span class="coord-sr-only"> ${t===1?`aviso`:`avisos`}</span></span>`:``}</span>
      <span>${r} ${r===1?`perro`:`perros`} · ${L(fu(e))}</span>
      <small>${e.paseador?L(wl(e.paseador)):`Sin paseador`}</small>
    </button>
  `}function Wd(){let e=su(),t=$c(y()),n=e.some(e=>e.dia===`Domingo`)?S:gl,r=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <p class="coord-meta">${e.length} rutas · ${r} paseos por semana. Tocá una ruta para editar sus horarios.</p>
    <div class="coord-week">
      ${n.map(e=>`
        <section class="coord-wday ${e===t?`is-today`:``}" aria-labelledby="coord-wday-${rl(e)}">
          <h3 id="coord-wday-${rl(e)}">${e}${e===t?` <span class="coord-tag">Hoy</span>`:``}</h3>
          ${_l.map(t=>`
              <div class="coord-wturno">
                <p class="coord-wturno-label">${t}</p>
                ${lu(e).filter(e=>e.turno===t).map(n=>Ud(n,{warnings:_u(n).list.length,attrs:`id="coord-wr-${L(n.id)}" data-coord-edit-plantilla="${L(n.id)}" aria-label="Editar ${L(n.ruta)} del ${e.toLowerCase()} a la ${t.toLowerCase()}"`})).join(``)}
                <button type="button" class="coord-wadd" id="coord-wadd-${rl(e)}-${rl(t)}" data-coord-new-route data-dia="${e}" data-turno="${t}">${g(`plus`,`coord-icon`)}<span>Ruta</span><span class="coord-sr-only"> nueva el ${e.toLowerCase()} a la ${t.toLowerCase()}</span></button>
              </div>
            `).join(``)}
        </section>
      `).join(``)}
    </div>
  `}function Gd(){let e=y(),t=Ou(),n=uu(t),r=n.reduce((e,t)=>e+(t.paradas||[]).length,0);return`
    <div class="coord-dayview">
      <div class="coord-day-pick">
        <div class="coord-field">
          <label for="coord-rutas-fecha">Día</label>
          <input id="coord-rutas-fecha" type="date" value="${t}" min="${e}" max="${Qc(e,90)}" data-coord-rutas-fecha />
        </div>
        <div class="coord-day-quick">
          ${U(`Hoy`,`id="coord-dia-hoy" data-coord-ver-dia="${e}"`,t===e?`secondary`:`ghost`)}
          ${U(`Día siguiente`,`id="coord-dia-manana" data-coord-ver-dia="${Qc(e,1)}"`,t===Qc(e,1)?`secondary`:`ghost`)}
        </div>
      </div>
      <h3 class="coord-day-title">${L(el(t))} · ${n.length} ${n.length===1?`ruta`:`rutas`} · ${r} paseos</h3>
      ${n.length?`<div class="coord-actions">${U(`Copiar todas las rutas del día`,`id="coord-copy-dia" data-coord-copy-dia="${t}"`,`ghost`,`copy`)}</div>`:`<p class="coord-empty is-small">No hay rutas para este día.</p>`}
      <ul class="coord-dayroutes">
        ${n.map(e=>{let n=vu(e,t),r=(e.paradas||[]).slice().sort((e,t)=>(ml(e.hora)??9999)-(ml(t.hora)??9999));return`
            <li class="coord-dayroute ${n.list.length?`is-alert`:``}">
              <div class="coord-card-head">
                <strong>${L(e.ruta)} · ${L(e.turno)}</strong>
                ${e.origen===`dia`?W(`Cambio solo para este día`,`warn`):W(`Igual que la semana`,`neutral`)}
              </div>
              <p>${r.length} ${r.length===1?`perro`:`perros`} · ${L(fu(e))} · Paseador: ${L(wl(e.paseador)||`Pendiente de confirmar`)}${e.ayudante?` · Ayudante: ${L(wl(e.ayudante))}`:``}</p>
              ${n.list.length?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${L(n.list.slice(0,2).join(` `))}${n.list.length>2?` Y ${n.list.length-2} más.`:``}</span></p>`:``}
              <details class="coord-card-more">
                <summary>Ver paradas ${g(`chevronDown`,`coord-icon`)}</summary>
                <ol class="coord-stops-mini">${r.map((t,r)=>`<li class="${n.byStop.has((e.paradas||[]).indexOf(t))?`is-alert`:``}"><b>${L(B(t.hora)||`--:--`)}</b> ${L(t.perroNombre)} <small>${Number(t.minutos)||45} min${t.nota?` · ${L(t.nota)}`:``}</small><span class="coord-sr-only"> (parada ${r+1})</span></li>`).join(``)}</ol>
              </details>
              <div class="coord-actions">
                ${U(`Cambiar solo este día`,`id="coord-ed-dia-${L(e.ruta)}" data-coord-edit-dia="${L(e.ruta)}" data-fecha="${t}"`,`primary`,`sliders`)}
                ${U(`Copiar para WhatsApp`,`data-coord-copy-ruta="${L(e.ruta)}" data-fecha="${t}"`,`ghost`,`copy`)}
              </div>
            </li>
          `}).join(``)}
      </ul>
      <div class="coord-actions">
        ${_l.map(e=>U(`Ruta extra solo este día (${e.toLowerCase()})`,`id="coord-extra-${rl(e)}" data-coord-new-dia data-turno="${e}" data-fecha="${t}"`,`ghost`,`plus`)).join(``)}
      </div>
    </div>
  `}function Kd(e,t,n){let r=Sl(e),i=n.byStop.get(t)||[],a=hl(e.hora)?nn(B(e.hora),e.minutos||45):``,o=V.paradas.length-1,s=e.perroNombre||r?.name||`Pendiente de confirmar`;return`
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
          <input id="coord-ed-hora-${t}" type="time" step="300" value="${L(B(e.hora))}" data-coord-stop="${t}" data-k="hora" ${hl(e.hora)?``:`aria-invalid="true"`} />
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
  `}function qd(){if(!V)return``;let e=R(bu);if(!e)return`<p class="coord-meta">Escribí el nombre del perro. Se agrega a la hora de arriba.</p>`;let t=new Set(V.paradas.map(e=>Sl(e)?.id).filter(Boolean)),n=C.filter(t=>R(t.name).includes(e)).slice(0,6),r=C.some(t=>R(t.name)===e),i=hl(xu)?B(xu):pu(V);return`
    <ul class="coord-results">
      ${n.map(e=>`
        <li>
          <button type="button" class="coord-result" id="coord-add-${e.id}" data-coord-add-dog="${e.id}">
            ${g(`plus`,`coord-icon`)}
            <span><b>${L(e.name)}</b> <small>${L(e.size)} · ${L(sl(e))}</small></span>
            ${e.status===`Activo`?``:W(L(e.status),`alert`)}
            ${t.has(e.id)?W(`Ya está en la ruta`,`warn`):``}
            <span class="coord-result-hora">${i}</span>
          </button>
        </li>`).join(``)}
      ${!r&&bu.trim().length>=2?`
        <li>
          <button type="button" class="coord-result is-free" id="coord-add-libre" data-coord-add-libre>
            ${g(`plus`,`coord-icon`)}<span>Agregar «${L(bu.trim())}» (perro sin ficha)</span><span class="coord-result-hora">${i}</span>
          </button>
        </li>`:``}
    </ul>
    ${n.length?``:`<p class="coord-meta">No hay perros con ese nombre en el registro.</p>`}
  `}function Jd(){let e=V,t=Nu(),n=e.solicitudId?Bu().find(t=>t.id===e.solicitudId):null,r=e.modo===`plantilla`,i=r?nl(e.dia):[],a=hl(xu)?B(xu):pu(e);return`
    <div class="coord-editor ${r?`is-plantilla`:`is-dia`}" id="coord-editor" tabindex="-1" aria-labelledby="coord-editor-title">
      <div class="coord-editor-mode" role="note">
        ${g(r?`calendarCheck`:`alertTriangle`,`coord-icon`)}
        <div>
          <p class="coord-editor-kicker">${r?`Estás editando la SEMANA`:`Estás editando SOLO UN DÍA`}</p>
          <h3 id="coord-editor-title">${L(e.ruta)} · ${r?`${L(e.dia)} · ${L(e.turno)}`:`${L(el(e.fecha))} · ${L(e.turno)}`}</h3>
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

      ${Dd(`editor`)}

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
            <input id="coord-ed-buscar" type="search" value="${L(bu)}" data-coord-ed-search autocomplete="off" placeholder="Nombre del perro" aria-controls="coord-ed-results" />
          </div>
          <div class="coord-field coord-add-hora">
            <label for="coord-ed-nueva-hora">Hora de retiro</label>
            <input id="coord-ed-nueva-hora" type="time" step="300" value="${L(a)}" data-coord-ed-hora aria-describedby="coord-ed-nueva-hora-hint" />
            <small id="coord-ed-nueva-hora-hint">Sugerida: la última + 15 min.</small>
          </div>
        </div>
        <div id="coord-ed-results" aria-live="polite">${qd()}</div>
      </div>

      <div class="coord-stops-head">
        <h4>Paradas en orden <span>${e.paradas.length}</span></h4>
        ${e.paradas.length>1?U(`Ordenar por hora`,`id="coord-ed-sort" data-coord-ed-sort`,`ghost`,`clock`):``}
      </div>
      ${e.paradas.length?`<ol class="coord-stops">${e.paradas.map((e,n)=>Kd(e,n,t)).join(``)}</ol>`:`<p class="coord-empty is-small">La ruta no tiene perros todavía. Buscalos arriba.</p>`}

      ${jd(t.list,`coord-ed-warnings`)}

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
                ${i.map(t=>`<option value="${t}" ${t===e.soloDia?`selected`:``}>${L(el(t))}${t===y()?` (hoy)`:``}${cu().some(n=>n.id===ou(t,e.ruta))?` · ya tiene un cambio: se reemplaza`:``}</option>`).join(``)}
              </select>
            </div>
            ${U(`Guardar solo para ese día`,`id="coord-ed-save-dia" data-coord-ed-save="dia"`,`secondary`)}
          </div>`:`
          <div class="coord-save-box is-main">
            <p><b>Guardar solo para el ${L(el(e.fecha).toLowerCase())}.</b>${n?` El pedido del supervisor queda como aplicado.`:``}</p>
            ${U(`Guardar solo para el ${L(Yc(e.fecha))}`,`id="coord-ed-save" data-coord-ed-save="dia"`,`primary`,`checkCircle`)}
          </div>
          ${e.existeDia&&Bl(e.existeDia)?`
            <div class="coord-save-box">
              <p>¿Ese día tiene que quedar igual que la semana?</p>
              ${U(`Volver a la ruta de la semana`,`id="coord-ed-revert" data-coord-ed-revert`,`ghost`)}
            </div>`:``}`}
      </div>

      ${Su===`salir`?`
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
  `}function Yd(){let e=Bu(),t=Vu(),n=e.filter(e=>(e.estado||`pendiente`)!==`pendiente`),r=`
    <p class="coord-note">${g(`users`,`coord-icon`)}<span>El supervisor mira las rutas y, si habló con alguien o pasó algo, te pide el cambio. Vos lo aplicás o lo rechazás con una respuesta: la ve el supervisor.</span></p>
    ${Dd(`solicitudesTodas`)}
    <h3 class="coord-subtitle">Pendientes <span>${t.length}</span></h3>
    ${t.length?`<ul class="coord-sol-list">${t.map(e=>Ld(e)).join(``)}</ul>`:`<p class="coord-empty is-small">${kl.has(`solicitudes`)?`No hay pedidos pendientes.`:`Cargando…`}</p>`}
    ${n.length?`
      <details class="coord-more" ${cl(`solHist`)?`open`:``}>
        <summary data-coord-toggle="solHist">Respondidos en las últimas 2 semanas (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-sol-list">${n.map(e=>Ld(e,{compact:!0})).join(``)}</ul>
      </details>`:``}
  `;return Od({key:`solicitudes`,id:`coord-solicitudes`,iconName:`bell`,title:`Pedidos de cambio del supervisor`,intro:`Aplicalos en la ruta del día o respondé por qué no.`,badges:t.length?W(`${t.length} ${t.length===1?`pendiente`:`pendientes`}`,`alert`):W(`Al día`,`neutral`),body:r})}function Xd(e){return(Array.isArray(e)?e:[]).map(e=>yl.get(e)?.name||e)}function Zd(e){let t=L(e.id),n=Gu.find(([t])=>t===e.estado)||Gu[0],r=Xd(e.perros);return`
    <li class="coord-card coord-cliente is-${L(n[0])}">
      <div class="coord-card-head">
        <strong>${L(e.nombre||`Pendiente de confirmar`)}</strong>
        ${W(n[1],n[0]===`activo`?`ok`:n[0]===`pausa`?`warn`:`neutral`)}
      </div>
      ${Ad([[`Perros`,r.length?il(r):b],[`Barrio`,e.barrio],[`Plan`,e.plan&&e.plan!==`Pendiente de confirmar`?e.plan:``],[`Días`,Array.isArray(e.dias)&&e.dias.length?ol(e.dias):``],[`Turno`,e.turno&&e.turno!==`Pendiente de confirmar`?e.turno:``],[`Teléfono`,e.telefono],[`Notas`,e.notas]],`is-compact`)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      <div class="coord-actions">
        ${hd(e.telefono,`Hola ${e.nombre||``}, te escribo de Paseos Juan.`.replace(` ,`,`,`),`secondary`,`WhatsApp`)}
        ${U(`Editar`,`id="coord-cli-edit-${t}" data-coord-cliente-edit="${t}"`,`ghost`,`sliders`)}
      </div>
    </li>
  `}function Qd(){let e=R(Yu),t=Xu();return e?t.filter(t=>R([t.nombre,t.barrio,t.telefono,t.notas,...Xd(t.perros)].join(` `)).includes(e)):t}function $d(){let e=Qd();return e.length?`<ul class="coord-card-list is-grid">${e.map(Zd).join(``)}</ul>`:`<p class="coord-empty is-small">${kl.has(`clientes`)?Yu?`Ningún cliente coincide con la búsqueda.`:`Todavía no hay clientes cargados.`:`Cargando clientes…`}</p>`}function ef(){let e=Xu(),t=bd(`cliente`),n=!!t.id,r=Array.isArray(t.perros)?t.perros:[],i=Array.isArray(t.dias)?t.dias:[],a=e.filter(e=>(e.estado||`activo`)===`activo`).length,o=C.slice().sort((e,t)=>e.name.localeCompare(t.name,`es`)),s=`
    ${Dd(`clientes`)}
    <div class="coord-field coord-search">
      <label for="coord-clientes-buscar">Buscar cliente</label>
      <input id="coord-clientes-buscar" type="search" value="${L(Yu)}" data-coord-clientes-buscar placeholder="Tutor, perro o barrio" autocomplete="off" aria-controls="coord-clientes-lista" />
    </div>
    <div id="coord-clientes-lista" aria-live="polite">${$d()}</div>

    <form class="coord-form" id="coord-cliente-form" data-coord-form="cliente" novalidate tabindex="-1">
      <h3>${n?`Editando a ${L(t.nombre||`un cliente`)}`:`Cargar un cliente`}</h3>
      ${t.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Completado con los datos de un pedido. Revisalo antes de guardar.</span></p>`:``}
      <input type="hidden" name="id" value="${L(t.id||``)}" />
      <input type="hidden" name="pedidoId" value="${L(t.pedidoId||``)}" />
      <div class="coord-grid">
        ${wd(`cliente`,`nombre`,`Nombre del tutor`,{value:t.nombre,required:!0,attrs:`autocomplete="off"`})}
        ${wd(`cliente`,`telefono`,`Teléfono`,{value:t.telefono,type:`tel`,attrs:`autocomplete="off" inputmode="tel"`,hint:`Celular con código de área (ej.: 11 1234-5678).`})}
        ${wd(`cliente`,`barrio`,`Barrio`,{value:t.barrio,attrs:`list="coord-barrios" autocomplete="off"`,hint:`Elegí uno o escribí otro.`})}
        ${H(`cliente`,`plan`,`Plan`,Ku,{value:t.plan||`Pendiente de confirmar`})}
        ${H(`cliente`,`turno`,`Turno`,qu,{value:t.turno||`Pendiente de confirmar`})}
        ${H(`cliente`,`estado`,`Estado`,Gu,{value:t.estado||`activo`})}
        <div class="coord-field is-wide">
          <span class="coord-label" id="coord-cliente-perros-label">Perros${r.length?` (${r.length})`:``}</span>
          <input id="coord-cliente-perros-buscar" type="search" data-coord-filter-perros placeholder="Filtrar perros" autocomplete="off" aria-label="Filtrar la lista de perros" />
          <div class="coord-checks" role="group" aria-labelledby="coord-cliente-perros-label">
            ${o.map(e=>`<label class="coord-check" data-name="${L(R(e.name))}"><input type="checkbox" id="coord-cliente-perro-${e.id}" name="perros" value="${e.id}" ${r.includes(e.id)?`checked`:``} /><span>${L(e.name)} <small>${L(e.size)}</small></span></label>`).join(``)}
          </div>
          <small>Si el perro todavía no está en el registro, anotalo en notas y cargá su ficha en «Alta de perro nuevo».</small>
        </div>
        ${Ed(`cliente`,i)}
        ${Td(`cliente`,`notas`,`Notas`,{value:t.notas,hint:`Lo operativo: llaves, portería, horarios. Sin datos de salud ni de pago.`})}
      </div>
      <datalist id="coord-barrios">${td().map(e=>`<option value="${L(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">
        ${U(n?`Guardar cambios`:`Guardar cliente`,`id="coord-cliente-save" data-coord-cliente-save`,`primary`,`plus`)}
        ${n||t.pedidoId?U(`Cancelar`,`data-coord-cliente-cancel`,`ghost`):``}
      </div>
    </form>
  `;return Od({key:`clientes`,id:`coord-clientes`,iconName:`users`,title:`Clientes`,intro:`Tutores, sus perros, plan, días y turno. Solo lo ven Juan y coordinación.`,badges:e.length?W(`${a} ${a===1?`activo`:`activos`}`,`neutral`):``,body:s})}function tf(){let e=bd(`aviso`),t=y(),n=Zu(),r=n.filter(e=>Qu(e,t)),i=n.filter(e=>!Qu(e,t)).slice(0,20),a=`
    ${Dd(`avisos`)}
    <form class="coord-form" data-coord-form="aviso" novalidate>
      <h3>Cargar un aviso</h3>
      <div class="coord-grid">
        ${wd(`aviso`,`barrio`,`Barrio`,{value:e.barrio,required:!0,attrs:`list="coord-barrios-aviso" autocomplete="off"`})}
        ${H(`aviso`,`tipo`,`Tipo`,Ju,{value:e.tipo||Ju[0]})}
        ${wd(`aviso`,`vigenteHasta`,`Vigente hasta`,{value:e.vigenteHasta||t,type:`date`,attrs:`min="${t}"`})}
        ${Td(`aviso`,`mensaje`,`Qué pasa`,{value:e.mensaje,required:!0,placeholder:`Ej.: Corte de calle en la entrada principal. Entrar por la puerta 2.`})}
      </div>
      <datalist id="coord-barrios-aviso">${td().map(e=>`<option value="${L(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${U(`Guardar aviso`,`id="coord-aviso-save" data-coord-aviso-save`,`primary`,`plus`)}</div>
    </form>
    <div class="coord-subblock">
      <h3>Vigentes <span>${r.length}</span></h3>
      ${r.length?`<p class="coord-meta">Están arriba, agrupados por barrio.</p>`:`<p class="coord-empty is-small">${kl.has(`avisos`)?`No hay avisos vigentes.`:`Cargando…`}</p>`}
    </div>
    ${i.length?`
      <details class="coord-more" ${cl(`avisosViejos`)?`open`:``}>
        <summary data-coord-toggle="avisosViejos">Avisos vencidos (${i.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-aviso-list">${i.map(e=>zd(e,{history:!0})).join(``)}</ul>
      </details>`:``}
  `;return Od({key:`avisos`,id:`coord-avisos`,iconName:`mapPin`,title:`Avisos por barrio`,intro:`Obras, cortes, perros sueltos, clima o seguridad. Los ve todo el equipo.`,badges:r.length?W(`${r.length} ${r.length===1?`vigente`:`vigentes`}`,`warn`):``,body:a})}function nf(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return Ad([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function rf(e,t,n){let r=sd(e),i=e.origen===`web`,a=e.datos||{},o=L(e.id),s=t.get(e.id),c=n.get(e.id),l={nuevo:U(`Empezar`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)+U(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`ghost`),"en-curso":U(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`secondary`)+U(`Volver a nuevo`,`data-coord-pedido-move="${o}" data-estado="nuevo"`,`ghost`),resuelto:U(`Reabrir`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)}[r],u=`pedido-${e.id}`,d=r!==`resuelto`||ul.has(u),f=(i||/evaluaci/i.test(e.tipo||``))&&!s&&r!==`resuelto`,p=i?r===`resuelto`?`<details class="coord-card-more" ${d?`open`:``}><summary data-coord-mem-toggle="${L(u)}">Ver datos del formulario ${g(`chevronDown`,`coord-icon`)}</summary>${nf(e)}</details>`:nf(e):`<p class="coord-card-dog">${g(`pawPrint`,`coord-icon`)}${L(dd(e)||`Pendiente de confirmar`)}</p>${e.detalle?`<p>${L(e.detalle)}</p>`:``}`,m=a.responsable?`Hola ${a.responsable}`:`Hola`;return`
    <li class="coord-card ${i?`is-web`:``}" id="coord-pedido-${o}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${L(i?a.perro||`Pendiente de confirmar`:e.tipo||`Pedido`)}</strong>
        <small>${i?L(e.tipo||`Formulario web`):`${L(Yc(e.fecha))}${a.canal?` · ${L(a.canal)}`:``}`}</small>
      </div>
      ${i?`<p class="coord-badges">${W(`Formulario web`,`warn`)}</p>`:``}
      ${p}
      ${Vl(e,{web:i})}
      ${s?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Ficha creada para ${L(s.perroNombre)}</span></p>`:``}
      ${c?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Cliente cargado: ${L(c.nombre)}</span></p>`:``}
      <div class="coord-actions">
        ${r!==`resuelto`&&i?hd(a.telefono,`${m}, te escribo de Paseos Juan por el pedido de evaluación de ${a.perro||`tu perro`}.`,`primary`):``}
        ${l}
        ${!c&&(i||a.responsable)?U(`Convertir en cliente`,`data-coord-pedido-cliente="${o}"`,`ghost`,`userPlus`):``}
        ${f?U(`Armar ficha con estos datos`,`data-coord-pedido-ficha="${o}"`,`ghost`,`fileText`):``}
        ${r===`resuelto`&&Bl(e)?U(`Borrar`,`data-coord-pedido-delete="${o}"`,`ghost`):``}
      </div>
    </li>
  `}function af(){let e=cd(),t=bd(`pedido`),n=e.filter(e=>sd(e)!==`resuelto`).length,r=fd(e).length,i=new Map(ld().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),a=new Map(Xu().filter(e=>e.pedidoId).map(e=>[e.pedidoId,e])),o=!kl.has(`pedidos`)&&!e.length,s=`
    ${Dd(`pedidos`)}
    <div class="coord-board">
      ${ad.map(([t,n])=>{let r=e.filter(e=>sd(e)===t);return t===`nuevo`&&r.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`)),`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(e=>rf(e,i,a)).join(``)}</ul>`:`<p class="coord-empty is-small">${o?`Cargando…`:t===`nuevo`?`Sin pedidos nuevos.`:t===`en-curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${H(`pedido`,`tipo`,`Tipo de pedido`,rd,{value:t.tipo})}
        ${wd(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre del perro o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${H(`pedido`,`canal`,`Llegó por`,id,{value:t.canal})}
        ${Td(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${C.map(e=>`<option value="${L(e.name)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${U(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>
  `;return Od({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Los del formulario de la web y los que cargás vos.`,badges:`${r?W(`${r} ${r===1?`nuevo`:`nuevos`} de la web`,`alert`):``}${n?W(`${n} abiertos`,`warn`):W(`Sin pedidos abiertos`,`neutral`)}`,body:s,open:r>0})}function of(e){let t=e.datos||{},n=bl.get(R(t.perro));return{pedidoId:e.id,nombre:t.responsable||``,telefono:t.telefono||``,barrio:[t.zona,t.referencia].filter(Boolean).join(` · `),perros:n?[n.id]:[],plan:b,dias:_d(t.dias),turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,estado:`activo`,notas:[`Desde el pedido del ${Yc(e.fecha)}.`,!n&&t.perro?`Perro: ${t.perro} (todavía sin ficha en el registro).`:``].filter(Boolean).join(` `)}}function sf(e,t){let n=t?t.actualizadoPorNombre||t.creadoPorNombre:``;return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${L(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?W(`Activo`,`neutral`):W(L(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${L(e.plan)} · ${L(e.size)} · ${L(sl(e))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${L(e.review||`Estado "${e.status}".`)}</p>
      ${kd(e)}
      ${t?.nota?`<p class="coord-meta">${L(t.nota)}</p>`:``}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Resuelto${n?` por ${L(n)}`:``}${t.actualizadoEn?` el ${Xc(t.actualizadoEn)}`:``}${t.pendiente?` (sin señal: se enviará cuando vuelva)`:``}</span></p>${U(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:U(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function cf(){let e=ud(),t=xl.filter(t=>!e[t.id]),n=xl.filter(t=>e[t.id]),r=`
    <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
    ${Dd(`datos`)}
    ${t.length?`<ul class="coord-review-list">${t.map(e=>sf(e)).join(``)}</ul>`:`<p class="coord-empty">${g(`checkCircle`,`coord-icon`)}No quedan datos por confirmar.</p>`}
    ${n.length?`
      <details class="coord-more" ${cl(`datosResueltos`)?`open`:``}>
        <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-review-list">${n.map(t=>sf(t,e[t.id])).join(``)}</ul>
      </details>`:``}
    <p class="coord-note">${g(`fileText`,`coord-icon`)}<span>El cambio todavía debe incorporarse al ${L(Bt.officialSources.dogs.toLowerCase())}.</span></p>
  `;return Od({key:`datos`,id:`coord-datos`,iconName:`help`,title:`Datos a confirmar`,intro:`${n.length} de ${xl.length} resueltos.`,badges:t.length?W(`${t.length} pendientes`,`warn`):W(`Todo confirmado`,`ok`),body:r})}var lf=[b,`Sí`,`No`];function uf(){let e=bd(`alta`),t=ld(),n=Array.isArray(e.dias)?e.dias:[],r=[b,...Ut.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${g(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${Dd(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${e.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>`:``}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${wd(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${H(`alta`,`tamano`,`Tamaño`,[b,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${wd(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${wd(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${H(`alta`,`sexo`,`Sexo`,[b,`Macho`,`Hembra`],{value:e.sexo})}
          ${H(`alta`,`castrado`,`Castrado o castrada`,lf,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${wd(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${wd(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${wd(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${H(`alta`,`zona`,`Zona`,[b,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${wd(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${H(`alta`,`vacunas`,`Vacunas al día`,lf,{value:e.vacunas})}
          ${wd(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${Td(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${H(`alta`,`sujecion`,`Collar o pechera`,[b,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${H(`alta`,`bozal`,`Usa bozal`,lf,{value:e.bozal})}
          ${H(`alta`,`correa`,`Tiene correa propia`,lf,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${e.relatoTutor?Td(`alta`,`relatoTutor`,`Lo que contó el tutor en el formulario (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${Td(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,span:!1})}
          ${Td(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${Td(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${wd(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${H(`alta`,`plan`,`Plan pedido`,r,{value:e.plan})}
          ${H(`alta`,`turno`,`Turno`,[b,`Mañana`,`Tarde`],{value:e.turno})}
          ${Ed(`alta`,n)}
        </div>
      </fieldset>
      <div class="coord-actions">
        ${U(`Guardar ficha`,`data-coord-alta-save`,`primary`,`plus`)}
        ${U(`Vaciar formulario`,`data-coord-alta-clear`,`ghost`)}
      </div>
    </form>
    <div class="coord-subblock">
      <h3>Fichas cargadas <span>${t.length}</span></h3>
      ${t.length?`
        <ul class="coord-card-list is-grid">
          ${t.map(e=>{let t=e.datos||{},n=Array.isArray(t.dias)?t.dias:[];return`
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${L(e.perroNombre||t.nombre||`Pendiente de confirmar`)}</strong>
                <small>Alta ${L(Yc(e.fecha))}</small>
              </div>
              <p class="coord-badges">${W(L(e.categoria||`SIN EVALUAR`),`neutral`)} ${W(`Primer paseo individual`,`warn`)}</p>
              <p>${L(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:t.tamano)} · Días: ${n.length?L(ol(n).toLowerCase()):`pendientes`} · Turno: ${L(!t.turno||t.turno===`Pendiente de confirmar`?`pendiente`:t.turno.toLowerCase())}</p>
              ${Vl(e)}
              <div class="coord-actions">
                ${U(`Copiar ficha`,`data-coord-alta-copy="${L(e.id)}"`,`ghost`,`copy`)}
                ${Bl(e)?U(`Borrar`,`data-coord-alta-delete="${L(e.id)}"`,`ghost`):``}
              </div>
            </li>`}).join(``)}
        </ul>`:`<p class="coord-empty is-small">${kl.has(`fichas`)?`Todavía no hay perros nuevos cargados.`:`Cargando fichas…`}</p>`}
    </div>
  `;return Od({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?W(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function df(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${Yc(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):b}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function ff(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>R(t.zona)===R(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:b,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,dias:_d(t.dias)}}function pf(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>yl.get(e)?.name||e);return t.length?il(t):``}function mf(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||zl(e,t)}function hf(e,t){let n=pf(e),r=e.titulo||(t===`incidente`?`Incidente`:`Observación`),i=e.riesgo?String(e.riesgo):``,a=t===`incidente`?[[`Perro`,n],[`Lugar`,e.lugar],[`Barrio`,e.barrio],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Perro`,n],[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]];return`
    <li class="coord-card coord-feed-item ${t===`incidente`?`is-incident`:``}">
      <div class="coord-card-head">
        <strong>${L(r)}</strong>
        <small>${L(Yc(e.fecha))}${e.hora?` · ${L(e.hora)}`:``}</small>
      </div>
      ${i?`<p class="coord-badges">${W(`Riesgo: ${L(i)}`,/alto|grave/i.test(i)?`alert`:`warn`)}</p>`:``}
      ${Ad(a)}
      ${Vl(e)}
    </li>
  `}function gf(){let e=tl(6),t=Ol(`incidentes`).filter(t=>!t.fecha||t.fecha>=e).sort(mf),n=Ol(`observaciones`).filter(t=>!t.fecha||t.fecha>=e).sort(mf),r=`
    <p class="coord-note">${g(`eye`,`coord-icon`)}<span>Solo lectura. Las cargan los paseadores y supervisión. Últimos 7 días (desde el ${L(Yc(e))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${t.length}</span></h3>
        ${t.length?`<ul class="coord-card-list">${t.map(e=>hf(e,`incidente`)).join(``)}</ul>`:`<p class="coord-empty is-small">${kl.has(`incidentes`)?`Sin incidentes en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${n.length}</span></h3>
        ${n.length?`<ul class="coord-card-list">${n.map(e=>hf(e,`observacion`)).join(``)}</ul>`:`<p class="coord-empty is-small">${kl.has(`observaciones`)?`Sin observaciones en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
    </div>
  `;return Od({key:`actividad`,id:`coord-actividad`,iconName:`activity`,title:`Observaciones e incidentes`,intro:`Lo que registró el equipo en la calle en los últimos 7 días.`,badges:`${t.length?W(`${t.length} ${t.length===1?`incidente`:`incidentes`}`,`alert`):``}${n.length?W(`${n.length} ${n.length===1?`observación`:`observaciones`}`,`neutral`):``}`,body:r})}function _f(e,t,n){ll(e,!0),$(),fl(t,n)}async function vf(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function yf(e,t,n){vf(e).then(e=>{I(t,e?n:`No se pudo copiar. Probá de nuevo o copialo a mano.`,e?`ok`:`error`),Ll()})}function bf(e,t){return e.find(e=>e.id===t)}function xf(e){Tu=e,Du(`dia`),$(),fl(`coord-rutas`)}async function Sf(e){let t=Lu();if(t){I(`editor`,t[0],`error`),$(),z(t[1]);return}let n=Iu(),r=V,i;if(e===`plantilla`)i=await Ul(`plantillas`,{id:au(n.ruta,n.dia),...n},{section:`rutas`,ok:`${n.ruta} del ${n.dia.toLowerCase()} guardada en la semana. Se repite todas las semanas.`});else{let e=r.modo===`plantilla`?r.soloDia:r.fecha;if(!Zc(e)){I(`editor`,`Elegí el día.`,`error`),$();return}if(i=await Ul(`rutas`,{id:ou(e,n.ruta),fecha:e,...n,dia:$c(e),basadaEn:r.plantillaId||``},{section:`rutas`,ok:`${n.ruta}: cambio guardado solo para el ${el(e).toLowerCase()}. La semana no cambió.`}),i&&r.solicitudId){let t=Bu().find(e=>e.id===r.solicitudId);await Ul(`solicitudes`,{id:r.solicitudId,fecha:Zc(t?.fecha)?t.fecha:e,estado:`aplicado`,respuesta:r.respuesta.trim()||`Aplicado en la ruta ${n.ruta} del ${Yc(e)}.`},{section:`rutas`,ok:`Cambio aplicado y pedido del supervisor marcado como aplicado.`})}i&&(Tu=e,Du(`dia`))}i&&V===r&&(ju(),$(),fl(`coord-rutas`))}function Cf(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target,n=t.closest(`[data-coord-toggle]`);if(n){let e=n.parentElement;return ll(n.dataset.coordToggle,!e.open),!0}let r=t.closest(`[data-coord-mem-toggle]`);if(r){let e=r.dataset.coordMemToggle;return r.parentElement.open?ul.delete(e):ul.add(e),!0}if(t.closest(`[data-coord-retry]`))return Il(),Kl=!1,Kc(`Volviendo a pedir los datos.`),!0;let i=t.closest(`[data-coord-goto]`);if(i)return fl(i.dataset.coordGoto),!0;let a=t.closest(`[data-coord-goto-pedido]`);if(a)return _f(`pedidos`,`coord-pedido-${a.dataset.coordGotoPedido}`),!0;let o=t.closest(`[data-coord-open]`);if(o){let e=o.dataset.coordOpen,t={avisos:`#coord-aviso-barrio`,clientes:`#coord-clientes-buscar`}[e]||null;return _f(e,`coord-${e}`,t),!0}if(t.closest(`[data-coord-undo]`)){let e=Uc;if(Uc=null,e){let{pendiente:t,...n}=e.record;Gl(`undo`,()=>Ul(e.col,n,{section:e.section,ok:`Listo, se recuperó.`}))}return!0}let s=t.closest(`[data-coord-vista]`);if(s)return Du(s.dataset.coordVista),$(),z(`coord-vista-${s.dataset.coordVista}`),!0;let c=t.closest(`[data-coord-ver-dia]`);if(c)return V?(fl(`coord-rutas`),!0):(xf(c.dataset.coordVerDia),!0);if(t.closest(`[data-coord-carga]`))return Cu=!0,$(),z(`coord-carga-ok`),!0;if(t.closest(`[data-coord-carga-cancel]`))return Cu=!1,$(),z(`coord-carga`),!0;if(t.closest(`[data-coord-carga-ok]`))return Gl(`carga`,async()=>{let e=an(),t=0,n=0,r=``;for(let i of e){wu=`Guardando ${t+1} de ${e.length}…`,Ll();try{let e=await v.save(`plantillas`,i);t+=1,e.pendiente&&(n+=1)}catch(e){r=e.message}}Cu=!1,wu=``,r?I(`rutas`,`Se guardaron ${t} de ${e.length} rutas. Error: ${r}`,`error`):I(`rutas`,`Listo: ${t} rutas cargadas en la semana.${n?` Sin señal: se envían cuando vuelva.`:``}`),Du(`semana`),Ll()}),!0;let l=t.closest(`[data-coord-edit-plantilla]`);if(l){let e=bf(su(),l.dataset.coordEditPlantilla);return e&&(Au(e,{modo:`plantilla`}),$(),fl(`coord-editor`)),!0}let u=t.closest(`[data-coord-new-route]`);if(u){let{dia:e,turno:t}=u.dataset;return Au({ruta:Mu(lu(e),t),dia:e,turno:t,paradas:[],supervisor:``},{modo:`plantilla`,nuevo:!0}),$(),fl(`coord-editor`,`#coord-ed-ruta`),!0}let d=t.closest(`[data-coord-edit-dia]`);if(d){let e=d.dataset.fecha,t=uu(e).find(e=>e.ruta===d.dataset.coordEditDia);return t&&(Au(t,{modo:`dia`,fecha:e}),$(),fl(`coord-editor`)),!0}let f=t.closest(`[data-coord-new-dia]`);if(f){let{fecha:e,turno:t}=f.dataset;return Au({ruta:Mu(uu(e),t),dia:$c(e),turno:t,paradas:[]},{modo:`dia`,fecha:e,nuevo:!0}),$(),fl(`coord-editor`,`#coord-ed-ruta`),!0}let p=t.closest(`[data-coord-copy-ruta]`);if(p){let e=p.dataset.fecha,t=uu(e).find(e=>e.ruta===p.dataset.coordCopyRuta);return t&&yf(yu(t,{fecha:e}),`rutas`,`${t.ruta} copiada. Pegala en el grupo de WhatsApp del equipo.`),!0}let m=t.closest(`[data-coord-copy-dia]`);if(m){let e=m.dataset.coordCopyDia;return yf(uu(e).map(t=>yu(t,{fecha:e})).join(`

`),`rutas`,`Rutas del ${el(e).toLowerCase()} copiadas.`),!0}if(V){let e=t.closest(`[data-coord-add-dog]`);if(e){let t=yl.get(e.dataset.coordAddDog);return t&&(Pu(t),Kc(`${t.name} agregado a las ${V.paradas[V.paradas.length-1].hora}.`),$(),z(`coord-ed-buscar`)),!0}if(t.closest(`[data-coord-add-libre]`)){let e=bu.trim();return e&&(Pu(null,e),Kc(`${e} agregado como perro sin ficha.`),$(),z(`coord-ed-buscar`)),!0}let n=t.closest(`[data-coord-stop-up]`),r=t.closest(`[data-coord-stop-down]`);if(n||r){let e=Number((n||r).dataset[n?`coordStopUp`:`coordStopDown`]),t=n?e-1:e+1;if(t>=0&&t<V.paradas.length){[V.paradas[e],V.paradas[t]]=[V.paradas[t],V.paradas[e]],V.sucio=!0,$();let r=document.getElementById(`coord-ed-${n?`up`:`down`}-${t}`);z(r&&!r.disabled?r.id:`coord-ed-hora-${t}`),Kc(`${V.paradas[t].perroNombre} ahora es la parada ${t+1}.`)}return!0}let i=t.closest(`[data-coord-stop-del]`);if(i){let e=Number(i.dataset.coordStopDel),[t]=V.paradas.splice(e,1);return V.sucio=!0,Kc(`${t?.perroNombre||`Perro`} quitado de la ruta.`),$(),z(V.paradas.length?`coord-ed-hora-${Math.min(e,V.paradas.length-1)}`:`coord-ed-buscar`),!0}if(t.closest(`[data-coord-ed-sort]`))return Fu(),Kc(`Paradas ordenadas por hora.`),$(),z(`coord-ed-sort`),!0;let a=t.closest(`[data-coord-ed-save]`);if(a)return Gl(`editor-save`,()=>Sf(a.dataset.coordEdSave)),!0;if(t.closest(`[data-coord-ed-revert]`)){let e=V.existeDia;return Gl(`editor-revert`,async()=>{await Wl(`rutas`,e,{section:`rutas`,ok:`${e.ruta} del ${Yc(e.fecha)} vuelve a ser igual que la semana.`,undo:!1})&&(ju(),Ll())}),!0}if(t.closest(`[data-coord-ed-copy]`))return yf(yu(Iu(),V.modo===`dia`?{fecha:V.fecha}:{}),`editor`,`Ruta copiada. Pegala en el grupo de WhatsApp del equipo.`),!0;if(t.closest(`[data-coord-ed-close]`))return V.sucio?(Su=`salir`,$(),z(`coord-ed-close-cancel`)):(ju(),$(),fl(`coord-rutas`)),!0;if(t.closest(`[data-coord-ed-close-ok]`))return ju(),$(),fl(`coord-rutas`),!0;if(t.closest(`[data-coord-ed-close-cancel]`))return Su=``,$(),z(`coord-ed-close`),!0}let h=t.closest(`[data-coord-sol-aplicar]`);if(h){let e=bf(Bu(),h.dataset.coordSolAplicar);return e?V?.sucio&&V.solicitudId!==e.id?(I(`editor`,`Primero guardá o cerrá la ruta que estás editando.`,`error`),$(),fl(`coord-editor`),!0):(Wu(e),$(),fl(`coord-editor`),!0):!0}let ee=t.closest(`[data-coord-sol-rechazar]`);if(ee)return zu=ee.dataset.coordSolRechazar,$(),z(`coord-rechazo-${zu}`),!0;if(t.closest(`[data-coord-sol-rechazar-cancel]`)){let e=zu;return zu=``,$(),z(`coord-rechazar-${e}`),!0}let te=t.closest(`[data-coord-sol-rechazar-ok]`);if(te){let e=te.dataset.coordSolRechazarOk,n=(document.getElementById(`coord-rechazo-${e}`)?.value||Ru[e]||``).trim(),r=t.closest(`#coord-solicitudes`)?`solicitudesTodas`:`solicitudes`;if(n.length<3)return I(r,`Escribí una respuesta corta para el supervisor.`,`error`),Ru[e]=n,$(),z(`coord-rechazo-${e}`),!0;let i=bf(Bu(),e);return Gl(`sol-${e}`,async()=>{await Ul(`solicitudes`,{id:e,fecha:Zc(i?.fecha)?i.fecha:y(),estado:`rechazado`,respuesta:n},{section:r,ok:`Pedido rechazado. El supervisor ve tu respuesta.`})&&(delete Ru[e],zu=``)}),!0}if(t.closest(`[data-coord-cliente-save]`)){let e=Cd(t.closest(`[data-coord-form]`));if(xd(`cliente`,e),!e.nombre?.trim())return I(`clientes`,`Falta el nombre del tutor.`,`error`),$(),z(`coord-cliente-nombre`),!0;let n={nombre:e.nombre.trim(),telefono:e.telefono?.trim()||``,barrio:e.barrio?.trim()||``,perros:Array.isArray(e.perros)?e.perros:[],plan:e.plan||`Pendiente de confirmar`,dias:Array.isArray(e.dias)?e.dias:[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas?.trim()||``};return e.id&&(n.id=e.id),e.pedidoId&&(n.pedidoId=e.pedidoId),Gl(`cliente-save`,async()=>{if(await Ul(`clientes`,n,{section:`clientes`,ok:e.id?`Cambios de ${n.nombre} guardados.`:`${n.nombre} quedó cargado como cliente.`})&&(Sd(`cliente`),e.pedidoId&&!e.id)){let t=bf(cd(),e.pedidoId);t&&sd(t)===`nuevo`&&await v.save(`pedidos`,{id:t.id,estado:`en-curso`}).catch(()=>{})}}),!0}if(t.closest(`[data-coord-cliente-cancel]`))return Sd(`cliente`),I(`clientes`,`Formulario vacío.`),$(),!0;let ne=t.closest(`[data-coord-cliente-edit]`);if(ne){let e=bf(Xu(),ne.dataset.coordClienteEdit);return e&&(vd.cliente={id:e.id,pedidoId:e.pedidoId||``,nombre:e.nombre||``,telefono:e.telefono||``,barrio:e.barrio||``,perros:e.perros||[],plan:e.plan||`Pendiente de confirmar`,dias:e.dias||[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas||``},yd.delete(`cliente`),$(),fl(`coord-cliente-form`,`#coord-cliente-nombre`)),!0}if(t.closest(`[data-coord-aviso-save]`)){let e=Cd(t.closest(`[data-coord-form]`));xd(`aviso`,e);let n=y(),r=e.barrio?.trim()?e.mensaje?.trim()?e.vigenteHasta&&(!Zc(e.vigenteHasta)||e.vigenteHasta<n)?[`La fecha de «vigente hasta» tiene que ser hoy o después.`,`coord-aviso-vigenteHasta`]:null:[`Escribí qué pasa.`,`coord-aviso-mensaje`]:[`Falta el barrio.`,`coord-aviso-barrio`];if(r)return I(`avisos`,r[0],`error`),$(),z(r[1]),!0;let i=e.barrio.trim(),a=Ju.includes(e.tipo)?e.tipo:`otro`;return Gl(`aviso-save`,async()=>{await Ul(`avisos`,{fecha:n,barrio:i,tipo:a,mensaje:e.mensaje.trim(),vigenteHasta:e.vigenteHasta||n,titulo:`${a[0].toUpperCase()}${a.slice(1)} en ${i}`},{section:`avisos`,ok:`Aviso de ${i} guardado. Ya lo ve el equipo.`})&&Sd(`aviso`)}),!0}let re=t.closest(`[data-coord-aviso-copy]`);if(re){let e=bf(Zu(),re.dataset.coordAvisoCopy),n=t.closest(`#coord-avisos`)?`avisos`:`avisosTop`;return e&&yf(nd(e),n,`Aviso copiado. Pegalo en el grupo de WhatsApp del equipo.`),!0}let g=t.closest(`[data-coord-aviso-fin]`);if(g){let e=bf(Zu(),g.dataset.coordAvisoFin);return e&&Gl(`aviso-${e.id}`,()=>Ul(`avisos`,{id:e.id,vigenteHasta:Qc(y(),-1)},{section:`avisos`,ok:`Aviso de ${e.barrio||`barrio`} marcado como terminado.`})),!0}let ie=t.closest(`[data-coord-resolve]`);if(ie){let e=ie.dataset.coordResolve,t=yl.get(e);return Gl(`resuelto-${e}`,()=>Ul(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{section:`datos`,ok:`${t?.name||e}: marcado como resuelto.`})),!0}let ae=t.closest(`[data-coord-unresolve]`);if(ae){let e=ae.dataset.coordUnresolve,t=yl.get(e);return Gl(`resuelto-${e}`,()=>Ul(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{section:`datos`,ok:`${t?.name||e}: volvió a pendientes.`})),!0}if(t.closest(`[data-coord-pedido-save]`)){let e=Cd(t.closest(`[data-coord-form]`));if(xd(`pedido`,e),!e.perro?.trim()&&!e.detalle?.trim())return I(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),z(`coord-pedido-perro`),!0;let n=e.tipo||rd[0],r=e.perro?.trim()||``;return Gl(`pedido-save`,async()=>{await Ul(`pedidos`,{fecha:y(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:e.detalle?.trim()||``,datos:{perro:r,canal:e.canal||id[0]}},{section:`pedidos`,ok:`Pedido guardado en "Nuevo".`})&&Sd(`pedido`)}),!0}let oe=t.closest(`[data-coord-pedido-move]`);if(oe){let e=oe.dataset.coordPedidoMove,t=oe.dataset.estado;return Gl(`pedido-${e}`,()=>Ul(`pedidos`,{id:e,estado:t},{section:`pedidos`,ok:`Pedido movido a "${od[t]}".`})),!0}let se=t.closest(`[data-coord-pedido-delete]`);if(se){let e=bf(cd(),se.dataset.coordPedidoDelete);return e&&Gl(`pedido-${e.id}`,()=>Wl(`pedidos`,e,{section:`pedidos`,ok:`Pedido borrado.`})),!0}let ce=t.closest(`[data-coord-pedido-cliente]`);if(ce){let e=bf(cd(),ce.dataset.coordPedidoCliente);return e&&(vd.cliente=of(e),yd.delete(`cliente`),I(`clientes`,`Formulario completado con el pedido de ${e.datos?.responsable||`la web`}. Revisalo y guardalo.`),_f(`clientes`,`coord-cliente-form`,`#coord-cliente-nombre`)),!0}let le=t.closest(`[data-coord-pedido-ficha]`);if(le){let e=bf(cd(),le.dataset.coordPedidoFicha);return e&&(vd.alta=ff(e),yd.delete(`alta`),I(`alta`,`Formulario completado con el pedido de ${dd(e)||`la web`}. Revisalo y guardalo.`),_f(`alta`,`coord-alta`,`#coord-alta-nombre`)),!0}if(t.closest(`[data-coord-alta-save]`)){let e=Cd(t.closest(`[data-coord-form]`));if(xd(`alta`,e),!e.nombre?.trim())return I(`alta`,`Falta el nombre del perro.`,`error`),$(),z(`coord-alta-nombre`),!0;let n=e.nombre.trim(),r={...e,nombre:n,dias:Array.isArray(e.dias)?e.dias:[],primerPaseo:`Individual`};return Gl(`alta-save`,async()=>{await Ul(`fichas`,{fecha:y(),perroNombre:n,datos:r,categoria:`SIN EVALUAR`,estado:`lista`},{section:`alta`,ok:`Ficha de ${n} guardada. Arranca SIN EVALUAR y con primer paseo individual.`})&&Sd(`alta`)}),!0}if(t.closest(`[data-coord-alta-clear]`))return Sd(`alta`),I(`alta`,`Formulario vacío.`),$(),!0;let ue=t.closest(`[data-coord-alta-copy]`);if(ue){let e=bf(ld(),ue.dataset.coordAltaCopy);return e&&yf(df(e),`alta`,`Ficha copiada. Pegala en el registro maestro.`),!0}let de=t.closest(`[data-coord-alta-delete]`);if(de){let e=bf(ld(),de.dataset.coordAltaDelete);return e&&Gl(`ficha-${e.id}`,()=>Wl(`fichas`,e,{section:`alta`,ok:`Ficha borrada.`})),!0}return!1}function wf(e){let t=e.target;if(t.closest?.(`.coord-shell`)){if(V){if(t.matches(`[data-coord-ed-search]`)){bu=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=qd());return}if(t.matches(`[data-coord-ed-hora]`)){xu=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=qd());return}if(t.matches(`[data-coord-ed-field]`)){V[t.dataset.coordEdField]=t.value,V.sucio=!0;return}if(t.matches(`[data-coord-stop]`)){let e=V.paradas[Number(t.dataset.coordStop)];e&&(e[t.dataset.k]=(t.dataset.k,t.value),V.sucio=!0);return}}if(t.matches(`[data-coord-rechazo]`))Ru[t.dataset.coordRechazo]=t.value;else if(t.matches(`[data-coord-clientes-buscar]`)){Yu=t.value;let e=document.getElementById(`coord-clientes-lista`);e&&(e.innerHTML=$d())}else if(t.matches(`[data-coord-filter-perros]`)){let e=R(t.value);t.parentElement.querySelectorAll(`.coord-check`).forEach(t=>{t.hidden=!!e&&!t.dataset.name.includes(e)&&!t.querySelector(`input`).checked})}}}function Tf(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;if(t.matches(`[data-coord-rutas-fecha]`))return Zc(t.value)&&(Tu=t.value,Ll()),!0;if(V&&t.matches(`[data-coord-stop]`)){let e=V.paradas[Number(t.dataset.coordStop)];return e&&(e[t.dataset.k]=t.dataset.k===`minutos`?Number(t.value)||45:t.value,V.sucio=!0,t.dataset.k!==`nota`&&Ll()),!0}if(V&&t.matches(`[data-coord-ed-field]`))return V[t.dataset.coordEdField]=t.value,V.sucio=!0,!0;if(t.matches(`[data-coord-ed-hora], [data-coord-ed-search], [data-coord-rechazo], [data-coord-clientes-buscar], [data-coord-filter-perros]`))return!0;let n=t.closest(`[data-coord-form]`);if(n){if(xd(n.dataset.coordForm,Cd(n)),n.dataset.coordForm===`cliente`&&t.name===`perros`){let e=document.getElementById(`coord-cliente-perros-label`),t=(vd.cliente.perros||[]).length;e&&(e.textContent=`Perros${t?` (${t})`:``}`)}return!0}return!1}function Ef(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`.coord-btn.is-primary`)?.click())}function Df(e){e.key===`Enter`&&e.target.matches?.(`.coord-shell [data-coord-ed-search]`)&&(e.preventDefault(),document.querySelector(`#coord-ed-results .coord-result`)?.click())}function Of(){_e.push(Cf),ve.push(Tf),document.addEventListener(`input`,wf),document.addEventListener(`submit`,Ef),document.addEventListener(`keydown`,Df)}var kf=`paseosJuanAdmin_prioridadesHechas`,Af=`paseosJuanAdmin_seccionesAbiertas`,jf=`America/Argentina/Buenos_Aires`,Mf=[`Pequeño`,`Mediano`,`Grande`],Nf=x.manana.label,Pf=x.tarde.label,Ff=[`paseos`,`incidentes`,`checklists`,`pedidos`,`rutas`,`plantillas`,`avisos`],If=[`pagos`,`clientes`,`archivos`],Lf=10,Rf=[`Efectivo`,`Transferencia`,`Naranja X`],zf=`Libro contable del Sistema de Gestión`,Bf={"carnet de vacunas":{label:`Carnet de vacunas`,tone:`ok`},"comprobante de pago":{label:`Comprobante de pago`,tone:`info`},documento:{label:`Documento`,tone:`neutral`},foto:{label:`Foto`,tone:`neutral`}},Vf=`image/jpeg,image/png,image/webp,application/pdf`,Hf=/^(image\/(jpeg|png|webp)|application\/pdf)$/,Uf=864e5,Wf=20,Gf=``,G={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,adminLoaded:!1,adminError:``,pagosMes:null,archivosTipo:`todos`,savingPago:!1,lateSignature:``,msgs:{users:null,live:null,pagos:null,archivos:null}},Kf=()=>({fecha:y(),concepto:``,monto:``,medio:``,pasadoAlLibro:!1}),K={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{},pago:Kf(),pagoArchivo:null,pagoSubido:null};function q(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function J(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Y(e,t,n){return`${e} ${e===1?t:n}`}var qf={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Jf(e){let t=S.filter(t=>e.includes(t)),n=t.map(e=>S.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${qf[t[0]]} a ${qf[t[t.length-1]]}`:t.map(e=>qf[e]).join(`, `)}function Yf(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:jf,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:S.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function Xf(){return ae(kf)}function Zf(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Qf(){return new Set(ae(Af))}function $f(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:jf,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function ep(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:jf,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function tp(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function np(e){let t=Number(e);return!Number.isFinite(t)||t<=0?``:t<1048576?`${Math.max(1,Math.round(t/1024))} KB`:`${(t/1048576).toFixed(1).replace(`.`,`,`)} MB`}function rp(e,t){return String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))}function ip(){return navigator.onLine===!1}function ap(){return _.user()||{usuario:``,nombre:``,rol:`admin`}}function op(e){return String(e||``).trim().split(/\s+/)[0]||``}function sp(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function X(e,t){return[`pedidos`,`plantillas`,`avisos`,...If].includes(e)?{}:{desde:t}}function cp(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function lp(e){return e.hora||$f(e.creadoEn)}function up(e=new Date){let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:jf,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),n=e=>Number(t.find(t=>t.type===e)?.value||0);return n(`hour`)%24*60+n(`minute`)}function dp(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}var fp=810;function pp(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``)}function mp(e,t){let n=v.cached(`rutas`,X(`rutas`,e)).filter(t=>t.fecha===e),r=v.cached(`plantillas`,X(`plantillas`,e)).filter(e=>pp(e.dia)===pp(t)),i=!r.length,a=i?an().filter(e=>pp(e.dia)===pp(t)):r,o=new Map;a.forEach(e=>o.set(e.ruta||e.id,{...e,fuente:i?`planilla`:`plantilla`})),n.forEach(e=>o.set(e.ruta||String(e.id).slice(11),{...e,fuente:`dia`}));let s=e=>(e.paradas||[]).map(e=>e.hora||`99:99`).sort()[0]||`99:99`,c=[...o.values()].sort((e,t)=>s(e).localeCompare(s(t))||String(e.ruta).localeCompare(String(t.ruta)));return{list:c,fromSheet:c.some(e=>e.fuente===`planilla`)}}function hp(e,t,n){let r=(e,t)=>e.perroId&&t.perroId?e.perroId===t.perroId:pp(e.perroNombre)&&pp(e.perroNombre)===pp(t.perroNombre),i=t=>e.reduce((e,n)=>e+(n.paradas||[]).filter(e=>r(t,e)).length,0);return e.map(e=>{let a=cp({turno:e.turno}),o=(e.paradas||[]).map(e=>{let o=t.filter(t=>r(e,t)),s=o.find(e=>cp(e)===a)||(o.length===1&&i(e)===1?o[0]:null),c=s?.estado||`pendiente`,l=dp(e.hora),u=`a-tiempo`;return c===`entregado`?u=`entregado`:c===`no-sale`?u=`no-sale`:c===`pendiente`&&l!==null&&n>l+Lf&&(u=`atrasado`),{...e,paseo:s,estado:c,status:u,prevista:l,atraso:u===`atrasado`?n-l:0}}),s=e=>o.filter(t=>t.status===e).length;return{route:e,shift:a,stops:o,aTiempo:s(`a-tiempo`),atrasados:s(`atrasado`),entregados:s(`entregado`),noSale:s(`no-sale`)}})}function gp(e){return v.cached(`avisos`,X(`avisos`,e)).filter(t=>{let n=t.fecha||String(t.creadoEn||``).slice(0,10),r=t.vigenteHasta||n;return n&&n<=e&&r>=e}).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``)))}function _p(){let e=y(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=v.cached(`paseos`,X(`paseos`,e)).filter(t),i=v.cached(`incidentes`,X(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),a=v.cached(`checklists`,X(`checklists`,e)).filter(t).sort(n),o=v.cached(`pedidos`,X(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),s=[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>cp(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}}),c=up(),l=mp(e,Yf().dayName),u=hp(l.list,r,c),d=u.flatMap(e=>e.stops.filter(e=>e.status===`atrasado`).map(t=>({...t,route:e.route})));return{hoy:e,paseos:r,incidentes:i,checklists:a,pedidosNuevos:o,shifts:s,nowMin:c,effective:l,compliance:u,late:d,lateNow:d.filter(e=>e.prevista<fp==c<fp),avisos:gp(e),carnetsWeb:v.cached(`archivos`,X(`archivos`,e)).filter(e=>e.tipo===`carnet de vacunas`&&e.creadoPor===`web`&&Date.now()-Date.parse(e.creadoEn||``)<Uf).sort(rp)}}function vp(e){return e.late.map(e=>`${e.route.ruta}:${e.perroId||e.perroNombre}`).join(`|`)}function yp(){let e=y();G.adminLoaded||(G.adminLoaded=!0,bp().finally(()=>{If.forEach(t=>v.watch(t,X(t,e)))})),G.liveDay!==e&&(G.liveDay=e,xp(!1).finally(()=>{Ff.forEach(t=>v.watch(t,X(t,e)))}))}async function bp(){let e=y(),t=await Promise.allSettled(If.map(t=>v.list(t,X(t,e)))),n=e=>[...new Set(t.filter((t,n)=>t.status===`rejected`&&e.includes(If[n])).map(e=>e.reason?.message||`No se pudieron traer los datos.`))].join(` `),r=G.adminError,i=n([`pagos`,`clientes`]),a=n([`archivos`]);G.adminError=[i,a].filter(Boolean).join(` `),i&&Z(`pagos`,`No se pudieron traer pagos o clientes: ${i}`,!0),a&&Z(`archivos`,`No se pudo traer la lista de archivos: ${a}`,!0),r!==G.adminError&&Q()}async function xp(e){let t=y(),n=await Promise.allSettled(Ff.map(e=>v.list(e,X(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=G.liveError;G.liveError=r.join(` `),G.liveError?Z(`live`,`No se pudieron actualizar los datos del día: ${G.liveError}`,!0):e?Z(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Z(`live`,`Datos del día actualizados.`),(e||i!==G.liveError)&&Q()}var Sp={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},Cp={admin:`todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.`,coordinador:`arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.`,supervisor:`controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.`,paseador:`hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.`,ayudante:`acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.`,marketing:`pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.`};function wp(e){let t=(nt[e]||[]).filter(e=>Sp[e]).map(t=>e===`ayudante`&&t===`paseador`?`Paseador (modo ayudante)`:Sp[t]);return`${t.length?`Paneles: ${J(t)}.`:`Todavía no tiene panel.`} Qué hace: ${Cp[e]||`Pendiente de confirmar`}`}function Tp(){return G.usersLoading=!0,at.list().then(e=>{G.users=e,G.usersError=``}).catch(e=>{G.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,G.usersError,!0)}).finally(()=>{G.usersLoading=!1,Q()})}function Ep(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function Dp(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function Op(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!Dp(e))return e}}function kp(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){G.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function Ap(e){let t=G.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?q(t.text):``}</p>`}function jp(){Object.entries(G.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function Mp(e){if(!e||e===document.body||!e.closest?.(`.adm-shell`))return null;if(e.id)return{selector:`#${CSS.escape(e.id)}`,index:0};let t=``;if(e.tagName===`SUMMARY`&&e.parentElement){let n=[...e.parentElement.attributes].find(e=>e.name.startsWith(`data-adm-`));n&&(t=`[${n.name}="${CSS.escape(n.value)}"] > summary`)}else{let n=[...e.attributes].find(e=>e.name.startsWith(`data-adm-`)&&e.name!==`data-adm-area`);n&&(t=`${e.tagName.toLowerCase()}[${n.name}="${CSS.escape(n.value)}"]`)}return t?{selector:t,index:Math.max(0,[...document.querySelectorAll(t)].indexOf(e))}:null}function Q(){if(!sp()||_.user()?.rol!==`admin`)return;let e=document.activeElement,t=Mp(e),n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.querySelectorAll(t.selector),i=r[t.index]||r[0];if(i&&(i.focus({preventScroll:!0}),n))try{i.setSelectionRange(...n)}catch{}}function Np(){return C.filter(e=>e.status===`Activo`&&e.days.length>0)}function Pp(){let e=Np(),t=S.map(t=>{let n=e.filter(e=>Xt(e,t,Nf)).length,r=e.filter(e=>Xt(e,t,Pf)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function Fp(){let e=Np(),t=new Map(C.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return C.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[Nf,Pf].forEach(e=>{let t=S.filter(t=>Xt(o,t,e)&&Xt(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Ip(){return Np().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function Lp(){return C.filter(e=>e.review||e.status!==`Activo`)}function Rp(e){return e===Nf?x.manana.route:x.tarde.routes.join(` o `)}function zp(e,t){return!!e.carnet?.id||t.carnetsWeb.some(t=>t.pedidoId===e.id)}function Bp(e=_p()){let{conflicts:t}=Fp(),n=C.filter(e=>e.status!==`Activo`),r=Lp(),i=Ip().filter(e=>e.category===`SIN EVALUAR`),a=Np(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${J(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${lp(n)?` a las ${lp(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${J(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(e.lateNow.length){let t=e.lateNow.length,n=e.nowMin<fp?`mañana`:`tarde`,r=e.lateNow.slice().sort((e,t)=>t.atraso-e.atraso),i=r[0],a=r.slice(0,3).map(e=>`${e.perroNombre} (${e.hora}, ${e.route.ruta})`),o=[...new Set(r.map(e=>e.route.ruta))],c=i.route.supervisor||Jp(i.route.paseador)||`el supervisor del turno`;e.paseos.length?s.push({id:`atrasos-${e.hoy}-${n}-${t}`,tag:`Atrasos`,tone:`warning`,title:`${Y(t,`perro atrasado`,`perros atrasados`)} en el turno ${n}`,detail:`${J(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Pasaron más de ${Lf} minutos de la hora prevista y nadie marcó el retiro.`,action:`Preguntale a ${c} qué pasa con ${i.perroNombre} (retiro previsto ${i.hora}, ruta ${o.join(` y `)}).`,target:`adm-cumplimiento`,targetLabel:t===1?`Ver el atraso`:`Ver los atrasos`}):s.push({id:`atrasos-sin-marcas-${e.hoy}-${n}`,tag:`Atrasos`,tone:`warning`,title:`Nadie marcó retiros hoy: ${Y(t,`perro figura`,`perros figuran`)} pasados de hora en el turno ${n}`,detail:`Según la ruta de hoy, ${J(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,action:`Preguntale a ${c} si el equipo está marcando los retiros en la página del paseador.`,target:`adm-cumplimiento`,targetLabel:`Ver el cumplimiento`})}let c=new Set(e.pedidosNuevos.map(e=>e.id)),l=e.carnetsWeb.filter(e=>!c.has(e.pedidoId));if(e.pedidosNuevos.length||l.length){let t=e.pedidosNuevos.length,n=e.pedidosNuevos.filter(t=>zp(t,e)),r=e=>e.titulo||e.tipo||`Pedido sin título`,i=[...new Set(l.map(e=>e.perroNombre||`perro sin nombre`))],a=l.length?`${t?`Además, l`:`L`}${l.length===1?`legó 1 carnet de vacunas`:`legaron ${l.length} carnets de vacunas`} por la web en las últimas 24 h (${J(i)}) de ${l.length===1?`un pedido que`:`pedidos que`} ya no ${l.length===1?`está`:`están`} como nuevo${l.length===1?``:`s`}.`:``;if(t){let i=e.pedidosNuevos.slice(0,3).map(t=>`${r(t)}${zp(t,e)?` (con carnet)`:``}`),o=e.pedidosNuevos[t-1],c=r(o),u=n.length+l.length;s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}-${u}`,tag:`Pedidos`,tone:`info`,title:`${Y(t,`pedido nuevo`,`pedidos nuevos`)} sin responder${n.length?` · ${n.length===t&&t===1?`trae carnet de vacunas`:`${n.length} con carnet`}`:``}`,detail:`${J(i)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.${a?` ${a}`:``}`,action:t===1?`Respondé el pedido “${c}”${zp(o,e)?` y mirá el carnet que mandó`:``}.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${c}”${zp(o,e)?` (trae carnet)`:``}.`,target:`adm-pedidos`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}else{let e=l[0];s.push({id:`carnets-web-${e.id}-${l.length}`,tag:`Pedidos`,tone:`info`,title:l.length===1?`Pedido nuevo con carnet: llegó el carnet de ${e.perroNombre||`un perro`} por la web`:`Pedidos nuevos con carnet: llegaron ${l.length} carnets por la web`,detail:a,action:`Abrí el carnet de ${e.perroNombre||`ese perro`} en “Archivos recibidos” y sumalo a su ficha.`,target:`adm-archivos`,targetLabel:l.length===1?`Ver el carnet`:`Ver los carnets`})}}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(Rp).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${J(r)}. Hay ${Y(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${J(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${Y(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${J(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${J(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${J(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${J(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function Vp(){let e=Np(),t=[],n=[];e.forEach(e=>{let r=Ut.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=Ut.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function Hp(e){return`
    <div class="adm-shell">
      ${Up()}
      ${e}
    </div>
  `}function Up(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${g(`lock`,`adm-icon-sm`)} ${q(ap().nombre)} · ${q(rt[ap().rol]||ap().rol)}</span>
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
  `}function Wp(){yp(),G.users===null&&!G.usersLoading&&!G.usersError&&Tp();let e=_p();G.lateSignature=vp(e);let t=Bp(e),n=Xf(),r=Qf();return setTimeout(jp,60),`
    <main class="adm-page" id="adm-main">
      ${Gp(t,n,e)}
      ${om(e)}
      ${mm()}
      ${pm()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${g(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${g(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${gm(r)}
        ${Fm(r)}
        ${_m(r)}
        ${Rm(r)}
        ${km(r)}
        ${ym(r)}
        ${Sm(r)}
        ${Cm(r)}
        ${zm(r)}
      </div>
      ${Bm()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function Gp(e,t,n){let{dayName:r,date:i}=Yf(),a=Np(),o=a.filter(e=>Xt(e,r,Nf)).length,s=a.filter(e=>Xt(e,r,Pf)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${Y(o,`perro`,`perros`)} a la mañana y ${Y(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=op(ap().nombre);return`
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
  `}var Kp={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function qp(e){let{dayName:t}=Yf();return Np().filter(n=>Xt(n,t,e)).length}function Jp(e){return G.users?.find(t=>t.usuario===e)?.nombre||e||``}function Yp(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=$f(e.actualizadoEn);return`Actualizado por ${Jp(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||Jp(e.creadoPor),r=$f(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function Xp(e){let t={manana:{title:`Turno mañana`,hours:`${x.manana.from} a ${x.manana.to}`,planned:qp(Nf)},tarde:{title:`Turno tarde`,hours:`${x.tarde.from} a ${x.tarde.to}`,planned:qp(Pf)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
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
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=Kp[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${q(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${q(Yp(e))}${e.nota?` · Nota: ${q(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno. Los marca el paseador en su página al retirar a cada perro.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function Zp(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${g(`alertTriangle`,`adm-icon-sm`)} ${Y(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${q(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${lp(e)?`<span class="adm-muted">${q(lp(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${q(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${q(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${Yp(e,!0)?`<p class="adm-note">${q(Yp(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function Qp(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}var $p={"a-tiempo":{label:`A tiempo`,tone:`ok`},atrasado:{label:`Atrasado`,tone:`danger`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}},em={dia:`Cambio del día`,plantilla:`Plantilla semanal`,planilla:`Planilla BASE RUTAS`};function tm(e){let t=Kp[e.estado]||{label:e.estado},n=[`Retiro previsto ${e.hora||`pendiente de confirmar`}`];return e.status===`atrasado`?n.push(`${e.atraso} min de atraso`):e.paseo&&n.push(t.label),e.paseo?.horaRetiro&&n.push(`retirado ${e.paseo.horaRetiro}`),e.paseo?.horaEntrega&&n.push(`entregado ${e.paseo.horaEntrega}`),n.join(` · `)}function nm(e){let{route:t,stops:n}=e,r=n.length-e.noSale,i=`ruta-${t.ruta}`,a=[t.paseador?`Paseador: ${Jp(t.paseador)}`:`Paseador: sin asignar`,t.ayudante?`Ayudante: ${Jp(t.ayudante)}`:``,t.supervisor?`Supervisa: ${t.supervisor}`:``].filter(Boolean).join(` · `),o=n.filter(e=>e.status===`atrasado`).sort((e,t)=>t.atraso-e.atraso);return`
    <article class="adm-shift adm-route ${o.length?`has-late`:``}" aria-labelledby="adm-route-${q(t.ruta)}">
      <h4 id="adm-route-${q(t.ruta)}">${q(t.ruta||`Ruta sin código`)} <span class="adm-th-sub">${q(t.turno||`Turno sin indicar`)} · ${q(em[t.fuente]||``)}</span></h4>
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
            ${n.map(e=>{let t=$p[e.status];return e.status===`a-tiempo`&&(t=e.estado===`pendiente`?{label:`Por retirar · a tiempo`,tone:`neutral`}:{label:`${(Kp[e.estado]||{label:e.estado}).label} · a tiempo`,tone:`info`}),`
                <li>
                  <span class="adm-dog-name">${q(e.hora||`--:--`)} · ${q(e.perroNombre||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}${e.paseo?.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${q(tm(e))}${e.nota?` · Nota: ${q(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ol>
        </details>
      `:`<p class="adm-empty">Esta ruta no tiene paradas cargadas.</p>`}
    </article>
  `}function rm(e){let{compliance:t,effective:n,late:r}=e;return`
    <div class="adm-compliance" id="adm-cumplimiento" tabindex="-1" role="region" aria-labelledby="adm-compliance-title">
      <h3 id="adm-compliance-title">${g(`route`,`adm-icon-sm`)} Cumplimiento por ruta ${r.length?`<span class="adm-count adm-count--danger">${Y(r.length,`atrasado`,`atrasados`)}</span>`:``}</h3>
      <p class="adm-note">Atrasado = pasaron más de ${Lf} minutos de la hora prevista y nadie marcó el retiro. Hora de Argentina.</p>
      ${n.fromSheet?`
        <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${b.toLowerCase()}.</span></p>
      `:``}
      ${t.length?`
        <div class="adm-live-grid">${t.map(nm).join(``)}</div>
      `:`<p class="adm-empty">Hoy no hay rutas: ni cambios del día, ni plantilla, ni paseos en la planilla.</p>`}
    </div>
  `}var im={"perro suelto":`danger`,seguridad:`danger`,"obra o corte":`warning`,clima:`info`,"cambio de horario":`info`};function am(e){let{avisos:t}=e;return`
    <div class="adm-avisos" id="adm-avisos" role="region" aria-labelledby="adm-avisos-title">
      <h3 id="adm-avisos-title">${g(`mapPin`,`adm-icon-sm`)} Avisos por barrio vigentes <span class="adm-count">${t.length}</span></h3>
      ${t.length?`
        <ul class="adm-aviso-list">
          ${t.map(e=>`
            <li class="adm-aviso">
              <div class="adm-aviso-head">
                <strong>${q(e.barrio||`Barrio sin indicar`)}</strong>
                <span class="adm-pill adm-pill--${im[e.tipo]||`neutral`}">${q(e.tipo||`otro`)}</span>
                <span class="adm-muted">${e.vigenteHasta?`Hasta el ${q(tp(e.vigenteHasta))}`:`Solo hoy`}</span>
              </div>
              <p>${q(e.mensaje||e.titulo||``)}</p>
              ${Yp(e,!0)?`<p class="adm-note">${q(Yp(e,!0))}.</p>`:``}
            </li>
          `).join(``)}
        </ul>
      `:`<p class="adm-empty">No hay avisos vigentes por barrio. Los cargan el coordinador o el supervisor cuando pasa algo en una zona.</p>`}
    </div>
  `}function om(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${q(tp(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" id="adm-live-refresh" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó. Se actualiza solo cuando vuelve la señal.</p>`:``}
      ${Ap(`live`)}

      ${e.incidentes.length?Zp(e.incidentes):`
        <p class="adm-live-ok">${g(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      ${rm(e)}
      ${am(e)}

      <div class="adm-live-grid">
        ${e.shifts.map(Xp).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=Qp(e);return`
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
                    <span class="adm-dog-meta">${q(tp(t.fecha)||ep(t.creadoEn))} · ${t.origen===`web`?`Formulario web`:q(t.creadoPorNombre||`Cargado en la app`)}</span>
                    ${n?`<button class="adm-link-button" type="button" data-adm-archivo-abrir="${q(n)}" data-adm-area="live">Ver el carnet${t.datos?.perro?` de ${q(t.datos.perro)}`:``}</button>`:``}
                  </li>
                `}).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${Y(r.length-6,`pedido más`,`pedidos más`)}. Los responde el coordinador desde su página.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos. Llegan del formulario de la web o los carga el equipo.</p>`}
        </article>
      </div>
    </section>
  `}function sm(e){return Object.entries(rt).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function cm(){let e=G.credential;if(!e)return``;let t=kp(e);return`
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
  `}function lm(){let e=K.crear;return`
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${q(J(Vt.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>
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
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${sm(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${q(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${q(rt[e.rol]||e.rol)}:</strong> ${q(wp(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${g(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function um(e){let t=!e.activo;return`
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
  `}function dm(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${q(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${q(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function fm(e,t){let n=e.usuario===t,r=K.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${ep(e.ultimoIngreso)} ${$f(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${ep(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
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
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${q(e.usuario)}">${sm(r)}</select>
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
      ${!n&&G.resetFor===e.usuario?um(e):``}
      ${!n&&G.confirmOff===e.usuario?dm(e):``}
    </li>
  `}function pm(){let e=ap().usuario,t=(G.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=G.users===null&&G.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:G.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>fm(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${G.users?`${Y(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${cm()}

      <div class="adm-form-actions">
        <button class="adm-button ${G.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${G.showCreate}" aria-controls="adm-create">
          ${g(G.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${G.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" id="adm-users-refresh" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${G.showCreate?lm():``}
      ${Ap(`users`)}
      ${r}

      <details class="adm-inner" data-adm-inner="roles-ayuda" ${G.openDogs.has(`roles-ayuda`)?`open`:``}>
        <summary>Qué puede ver cada rol</summary>
        <ul class="adm-role-help">
          ${Object.keys(rt).map(e=>`<li><strong>${rt[e]}:</strong> ${q(wp(e))}</li>`).join(``)}
        </ul>
      </details>
    </section>
  `}function mm(){let{conflicts:e,missing:t,notRouted:n}=Fp(),r=Ip();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${g(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${zt}).</p>
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
                    ${[e.a,e.b].filter(e=>/día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(C.find(t=>t.name===e)?.review||``)).map(e=>`<span class="adm-row-note">Días de ${q(e)}: dato a revisar</span>`).join(``)}
                  </th>
                  <td>${q(e.shift)} · ${q(Rp(e.shift))}</td>
                  <td>${q(Jf(e.days))}</td>
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
            <span class="adm-safety-meta">${q(e.shifts.join(` y `))} · ${q(Jf(e.days))}</span>
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
  `}function hm(e,t,{title:n,summary:r,iconName:i},a){return`
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
  `}function gm(e){let t=Lp().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return hm(`adm-datos`,e,{title:`Datos a revisar`,summary:`${Y(t.length,`perro`,`perros`)} · ${Y(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${q(Bt.officialSources.dogs)}).</p>
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
  `)}function _m(e){let t=Pp();return hm(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${q(t.busiest.length?J(t.busiest):`Sin datos`)} (${Y(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${zt}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
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
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${qf[e.day]}</span>
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
      <li>Referencia: el máximo diario histórico fue de ${q(Jt.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function vm(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function ym(e){let t=Np(),n=Pp(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${zt}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${zt}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...Jt,...i];return hm(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${vm(e.kind)}">${q(e.kind)}</span>
          <strong class="adm-fact-value">${q(e.value)}</strong>
          <span class="adm-fact-label">${q(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${q(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner" data-adm-inner="categorias" ${G.openDogs.has(`categorias`)?`open`:``}>
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(Kt).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${q(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var bm={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},xm=[{role:`Admin`,who:Ht.admin,can:[`Ve y decide sobre todo el sistema`,`Usuarios, pagos e indicadores`,`Único rol que ve y carga pagos`]},{role:`Coordinador`,who:`${Ht.coordinador} (${b.toLowerCase()})`,can:[`Armar rutas y horarios (plantilla semanal y cambios del día)`,`Gestionar los clientes de los paseos`,`Atender pedidos y cargar fichas`,`Avisar lo que pasa en cada barrio`,`No ve plata`]},{role:`Supervisor`,who:Ht.supervisor,can:[`Controlar los paseos del momento`,`Quién falta retirar y atrasos contra el horario`,`Entregas, incidentes y equipo`,`Ve las rutas, no las arma`]},{role:`Paseador`,who:Ht.paseador,can:[`Hacer su ruta del turno, en orden y con horario`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`]},{role:`Ayudante de paseador`,who:b,can:[`Acompañar al paseador en su ruta`,`Marcar pasos`,`Reportar incidentes`,`Sin datos de clientes`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function Sm(e){return hm(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${Y(Vt.length,`persona`,`personas`)} · ${xm.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${Vt.map(e=>{let t=bm[e.role];return`
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
      ${xm.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${q(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${q(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function Cm(e){return hm(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${Ut.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${Mf.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${Ut.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${Mf.map(t=>`<td>${Qt(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${Mf.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${Mf.map(e=>`<td>${Qt(Wt[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${Mf.map(e=>`<td>${Qt(Wt[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Gt.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${b.toLowerCase()}.</p>
  `)}function wm(e){let[t,n]=String(e).split(`-`).map(Number);if(!t||!n)return e;let r=new Intl.DateTimeFormat(`es-AR`,{month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(Date.UTC(t,n-1,15)));return r.charAt(0).toUpperCase()+r.slice(1)}function Tm(e){let t=String(e||``).replace(/[$\s]/g,``);return t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):/^\d{1,3}(\.\d{3})+$/.test(t)&&(t=t.replace(/\./g,``)),/^\d+(\.\d+)?$/.test(t)?Number(t):NaN}function Em(){let e=v.cached(`pagos`,X(`pagos`)).slice().sort((e,t)=>String(t.fecha||``).localeCompare(String(e.fecha||``))||String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),t=y().slice(0,7),n=[...new Set([t,...e.map(e=>String(e.fecha||``).slice(0,7)).filter(e=>/^\d{4}-\d{2}$/.test(e))])].sort().reverse(),r=G.pagosMes&&(G.pagosMes===`todos`||n.includes(G.pagosMes))?G.pagosMes:t,i=r===`todos`?e:e.filter(e=>String(e.fecha||``).startsWith(r)),a=e.filter(e=>!e.pasadoAlLibro),o=i.reduce((e,t)=>e+(Number(t.monto)||0),0),s=e.filter(e=>{let t=G.users?.find(t=>t.usuario===e.creadoPor)?.rol;return t&&t!==`admin`}),c=i.filter(e=>!e.comprobanteId);return{all:e,months:n,mes:r,filtered:i,faltan:a,faltanMes:i.filter(e=>!e.pasadoAlLibro),total:o,deOtros:s,sinComprobanteMes:c}}function Dm(e){let t=G.users?.find(t=>t.usuario===e.creadoPor),n=t&&t.rol!==`admin`,r=Number(e.monto),i=e.monto!==``&&e.monto!==null&&e.monto!==void 0&&Number.isFinite(r);return`
    <li class="adm-pago ${e.pasadoAlLibro?``:`is-missing`}">
      <div class="adm-pago-main">
        <span class="adm-pago-date">${q(tp(e.fecha)||ep(e.creadoEn)||`Pendiente de confirmar`)}</span>
        <strong class="adm-pago-concept">${q(e.concepto||`Sin concepto`)}</strong>
        <span class="adm-pago-amount">${i?q(Qt(r)):b}</span>
      </div>
      <div class="adm-pago-meta">
        <span class="adm-pill adm-pill--neutral">${q(e.medio||`Medio sin indicar`)}</span>
        <span class="adm-pill ${e.pasadoAlLibro?`adm-pill--ok`:`adm-pill--warning`}">${e.pasadoAlLibro?`Pasado al Libro`:`Falta pasar al Libro`}</span>
        ${e.comprobanteId?`<span class="adm-pill adm-pill--ok">${g(`fileCheck`,`adm-icon-xs`)} Con comprobante</span>`:`<span class="adm-pill adm-pill--neutral adm-pill--dashed">Sin comprobante</span>`}
        ${e.pendiente?`<span class="adm-pill adm-pill--info">Se enviará cuando haya señal</span>`:``}
        ${n?`<span class="adm-pill adm-pill--info">Lo cargó ${q(rt[t.rol]||t.rol)} antes del cambio</span>`:``}
      </div>
      ${Yp(e,!0)?`<p class="adm-note">${q(Yp(e,!0))}.</p>`:``}
      <div class="adm-pago-actions">
        ${e.comprobanteId?`
          <button class="adm-button adm-button--ghost adm-button--sm" type="button" data-adm-archivo-abrir="${q(e.comprobanteId)}" data-adm-area="pagos">
            ${g(`eye`,`adm-icon-sm`)} Ver comprobante
          </button>
        `:e.pendiente?``:`
          <label class="adm-button adm-button--ghost adm-button--sm adm-file-button">
            ${g(`fileUp`,`adm-icon-sm`)} Adjuntar comprobante
            <input class="adm-file-input" type="file" accept="${Vf}" data-adm-pago-adjuntar="${q(e.id)}" aria-label="Adjuntar comprobante a ${q(e.concepto||`este pago`)}" />
          </label>
        `}
        <button class="adm-link-button" type="button" data-adm-pago-libro="${q(e.id)}" aria-pressed="${e.pasadoAlLibro?`true`:`false`}">
          ${e.pasadoAlLibro?`Desmarcar “pasado al Libro”`:`Marcar como pasado al Libro`}
        </button>
      </div>
    </li>
  `}function Om(){let e=K.pagoArchivo,t=ip();return`
    <fieldset class="adm-file-field" aria-describedby="adm-pago-archivo-ayuda">
      <legend>Comprobante <small>opcional · foto o PDF, hasta 3,5 MB</small></legend>
      ${e?`
        <p class="adm-file-chosen" id="adm-pago-archivo-elegido">
          ${g(e.type===`application/pdf`?`fileText`:`camera`,`adm-icon-sm`)}
          <span><strong>${q(e.name||`Comprobante`)}</strong>${np(e.size)?` · ${q(np(e.size))}`:``}${K.pagoSubido?` · ya subido`:``}</span>
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
            <input class="adm-file-input" id="adm-pago-archivo" type="file" accept="${Vf}" data-adm-pago-archivo />
          </label>
        </div>
      `}
      <p class="adm-note" id="adm-pago-archivo-ayuda">${t?`Sin señal no se pueden subir archivos (no quedan en espera). Guardá el pago sin comprobante y adjuntalo desde la lista cuando vuelva la señal.`:`Sirve una captura de la transferencia de Naranja X o una foto del recibo. Lo ves solo vos.`}</p>
    </fieldset>
  `}function km(e){let t=Em(),n=K.pago,r=t.filtered.slice(0,20),i=t.mes===`todos`?`todos los meses`:wm(t.mes).toLowerCase();return hm(`adm-pagos`,e,{title:`Pagos · registro de apoyo`,summary:t.faltan.length?`${Y(t.faltan.length,`pago falta`,`pagos faltan`)} pasar al Libro contable`:`Nada pendiente de pasar al Libro contable`,iconName:`receipt`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: ${zf}</strong>
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
          <datalist id="adm-pago-medios">${Rf.map(e=>`<option value="${q(e)}"></option>`).join(``)}</datalist>
        </label>
      </div>
      ${Om()}
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
    ${Ap(`pagos`)}

    <div class="adm-pagos-head">
      <label class="adm-field adm-field--inline" for="adm-pagos-mes">
        <span>Mes</span>
        <select class="adm-input adm-input--sm" id="adm-pagos-mes" data-adm-pagos-mes>
          ${t.months.map(e=>`<option value="${e}" ${e===t.mes?`selected`:``}>${q(wm(e))}</option>`).join(``)}
          <option value="todos" ${t.mes===`todos`?`selected`:``}>Todos los meses</option>
        </select>
      </label>
      ${t.filtered.length?`
        <p class="adm-pagos-summary">
          <strong>${Y(t.filtered.length,`pago`,`pagos`)}</strong> en ${q(i)} · suma ${q(Qt(t.total))} ·
          <strong class="${t.faltanMes.length?`adm-text-warning`:``}" data-adm-pagos-faltan>${t.faltanMes.length} sin pasar al Libro</strong>${t.mes!==`todos`&&t.faltan.length!==t.faltanMes.length?` (${t.faltan.length} contando todos los meses)`:``}${t.sinComprobanteMes.length?` · ${t.sinComprobanteMes.length} sin comprobante`:``}
        </p>
      `:t.faltan.length?`
        <p class="adm-pagos-summary"><strong class="adm-text-warning" data-adm-pagos-faltan>${Y(t.faltan.length,`pago`,`pagos`)} de otros meses sin pasar al Libro.</strong> Elegí “Todos los meses” para verlos.</p>
      `:``}
    </div>
    ${t.deOtros.length?`<p class="adm-note">${t.deOtros.length===1?`1 pago lo cargó`:`${t.deOtros.length} pagos los cargó`} otro rol antes del cambio de roles (el coordinador ya no ve plata). Se ven acá con la marca “antes del cambio”.</p>`:``}
    ${r.length?`
      <ul class="adm-pago-list" aria-label="Pagos de ${q(i)}">${r.map(Dm).join(``)}</ul>
      ${t.filtered.length>r.length?`<p class="adm-note">Se muestran los últimos ${r.length}. Hay ${Y(t.filtered.length-r.length,`pago más`,`pagos más`)} en ${q(i)}.</p>`:``}
    `:`<p class="adm-empty">No hay pagos cargados en ${q(i)}. Cargalos con el formulario de arriba cuando te paguen.</p>`}
    ${t.filtered.length?`<p class="adm-note">La suma es solo de este registro de apoyo: no reemplaza al Libro contable.</p>`:``}
  `)}var Am={drive:`En tu Google Drive`,vercel:`Guardado en Vercel (provisorio)`,local:`Guardado en el servidor de prueba`};function jm(){let e=v.cached(`archivos`,X(`archivos`)).slice().sort(rp),t=G.archivosTipo!==`todos`&&Bf[G.archivosTipo]?G.archivosTipo:`todos`;return{all:e,tipo:t,filtered:t===`todos`?e:e.filter(e=>e.tipo===t),counts:Object.fromEntries(Object.keys(Bf).map(t=>[t,e.filter(e=>e.tipo===t).length])),enVercel:e.filter(e=>e.ubicacion===`vercel`).length,enPrueba:e.filter(e=>e.ubicacion===`local`).length,nuevos:e.filter(e=>Date.now()-Date.parse(e.creadoEn||``)<Uf)}}function Mm(e){let t=[];if((e.perroNombre||e.perroId)&&t.push(`Perro: ${e.perroNombre||e.perroId}${e.perroNombre&&e.perroId?` (${e.perroId})`:``}`),e.clienteId){let n=v.cached(`clientes`,X(`clientes`)).find(t=>t.id===e.clienteId);t.push(`Cliente: ${n?.nombre||e.clienteId}`)}if(e.pedidoId){let n=v.cached(`pedidos`,X(`pedidos`)).find(t=>t.id===e.pedidoId),r=n?{nuevo:`nuevo`,"en-curso":`en curso`,resuelto:`resuelto`}[n.estado||`nuevo`]||n.estado:``;t.push(n?`Pedido: ${n.titulo||n.tipo||`sin título`}${r?` (${r})`:``}`:`Pedido del formulario web`)}let n=Nm(e);return n&&t.push(`Pago: ${n.concepto||`sin concepto`}${n.fecha?` del ${tp(n.fecha)}`:``}`),t}function Nm(e){return e.tipo===`comprobante de pago`&&v.cached(`pagos`,X(`pagos`)).find(t=>t.comprobanteId===e.id)||null}function Pm(e){let t=Bf[e.tipo]||{label:e.tipo||`Archivo`,tone:`neutral`},n=Mm(e),r=e.creadoPorNombre||Jp(e.creadoPor)||``,i=e.creadoEn?`${ep(e.creadoEn)} a las ${$f(e.creadoEn)}`:tp(e.fecha),a=Date.now()-Date.parse(e.creadoEn||``)<Uf,o=Am[e.ubicacion]||`Lugar de guardado sin indicar`,s=e.mime===`application/pdf`?`PDF`:/^image\//.test(e.mime||``)?`Foto`:``,c=`${t.label}${e.perroNombre?` de ${e.perroNombre}`:``}`,l=/^https:\/\//i.test(e.driveUrl||``)?e.driveUrl:``;return`
    <li class="adm-archivo adm-archivo--${t.tone}">
      <div class="adm-archivo-head">
        <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}</span>
        ${a?`<span class="adm-pill adm-pill--info">Nuevo</span>`:``}
        <strong class="adm-archivo-title">${q(e.perroNombre||Nm(e)?.concepto||e.nombreOriginal||e.nombreArchivo||t.label)}</strong>
      </div>
      <p class="adm-archivo-links">${n.length?q(n.join(` · `)):`Sin vincular a un perro, cliente o pedido.`}</p>
      <p class="adm-note">${e.creadoPor===`web`?`Llegó por el formulario de la web`:`Subido por ${q(r||`alguien sin nombre`)}`}${i?` el ${q(i)}`:``}${s?` · ${s}`:``}${np(e.tamano)?` · ${q(np(e.tamano))}`:``}</p>
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
  `}function Fm(e){let t=jm(),n=t.filtered.slice(0,Wf),r=t.tipo===`todos`?``:` de tipo “${Bf[t.tipo].label.toLowerCase()}”`;return hm(`adm-archivos`,e,{title:`Archivos recibidos`,summary:t.all.length?`${Y(t.all.length,`archivo`,`archivos`)}${t.nuevos.length?` · ${Y(t.nuevos.length,`nuevo`,`nuevos`)} en las últimas 24 h`:``}`:`Todavía no llegó ningún archivo`,iconName:`fileUp`},`
    <p class="adm-lead">Carnets de vacunas, comprobantes y documentos que manda la gente desde el formulario de la web o que sube el equipo. Cada uno dice a qué perro, cliente o pedido corresponde. Los comprobantes de pago los abrís solo vos.</p>
    ${ip()?`<p class="adm-msg is-error">Sin señal: ves la lista que ya tenías. Para abrir o subir archivos hace falta señal.</p>`:``}
    ${t.enVercel||t.enPrueba?`
      <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>${J([t.enVercel?`${t.enVercel===1?`1 archivo está guardado`:`${t.enVercel} archivos están guardados`} en Vercel (provisorio)`:``,t.enPrueba?`${t.enPrueba===1?`1 archivo está`:`${t.enPrueba} archivos están`} en el servidor de prueba`:``].filter(Boolean))}. Cuando se conecte la planilla, los archivos nuevos van a ir a tu Google Drive; los que ya llegaron quedan donde están.</span></p>
    `:``}
    ${t.all.length?`
      <div class="adm-pagos-head">
        <label class="adm-field adm-field--inline" for="adm-archivos-tipo">
          <span>Tipo</span>
          <select class="adm-input adm-input--sm" id="adm-archivos-tipo" data-adm-archivos-tipo>
            <option value="todos" ${t.tipo===`todos`?`selected`:``}>Todos (${t.all.length})</option>
            ${Object.entries(Bf).map(([e,n])=>`<option value="${q(e)}" ${t.tipo===e?`selected`:``}>${q(n.label)} (${t.counts[e]})</option>`).join(``)}
          </select>
        </label>
      </div>
    `:``}
    ${Ap(`archivos`)}
    ${n.length?`
      <ul class="adm-archivo-list" aria-label="Archivos recibidos${q(r)}">${n.map(Pm).join(``)}</ul>
      ${t.filtered.length>n.length?`<p class="adm-note">Se muestran los últimos ${n.length}. Hay ${Y(t.filtered.length-n.length,`archivo más`,`archivos más`)}${q(r)}.</p>`:``}
    `:t.all.length?`
      <p class="adm-empty">No hay archivos${q(r)}. Elegí “Todos” para ver el resto.</p>
    `:`
      <p class="adm-empty">Todavía no llegó ningún archivo. Aparecen acá cuando un tutor manda el carnet desde el formulario de la web, cuando el equipo sube uno o cuando adjuntás un comprobante a un pago.</p>
    `}
  `)}var Im=[[`activo`,`Activos`],[`pausa`,`En pausa`],[`baja`,`Baja`]];function Lm(){let e=v.cached(`clientes`,X(`clientes`)),t=new Map;e.forEach(e=>{let n=String(e.barrio||``).trim()||`Sin barrio`;t.has(n)||t.set(n,{barrio:n,activo:0,pausa:0,baja:0,otro:0});let r=t.get(n),i=String(e.estado||``).toLowerCase();Im.some(([e])=>e===i)?r[i]+=1:r.otro+=1});let n=[...t.values()].sort((e,t)=>t.activo-e.activo||e.barrio.localeCompare(t.barrio)),r={activo:0,pausa:0,baja:0,otro:0};return n.forEach(e=>Object.keys(r).forEach(t=>{r[t]+=e[t]})),{total:e.length,rows:n,totals:r}}function Rm(e){let t=Lm(),n=t.totals.otro>0;return hm(`adm-clientes`,e,{title:`Clientes por barrio`,summary:t.total?`${Y(t.totals.activo,`activo`,`activos`)} · ${t.totals.pausa} en pausa · ${t.totals.baja} de baja`:`Todavía no hay clientes cargados en la app`,iconName:`mapPin`},`
    <p class="adm-lead">Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>
    ${t.total?`
      <div class="adm-table-wrap">
        <table class="adm-table adm-clients">
          <caption class="adm-sr-only">Clientes por barrio y estado</caption>
          <thead>
            <tr><th scope="col">Barrio</th>${Im.map(([,e])=>`<th scope="col">${e}</th>`).join(``)}${n?`<th scope="col">Sin estado</th>`:``}</tr>
          </thead>
          <tbody>
            ${t.rows.map(e=>`
              <tr><th scope="row">${q(e.barrio)}</th>${Im.map(([t])=>`<td>${e[t]}</td>`).join(``)}${n?`<td>${e.otro}</td>`:``}</tr>
            `).join(``)}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total</th>${Im.map(([e])=>`<td>${t.totals[e]}</td>`).join(``)}${n?`<td>${t.totals.otro}</td>`:``}</tr>
          </tfoot>
        </table>
      </div>
    `:`<p class="adm-empty">El coordinador todavía no cargó clientes en la app.</p>`}
  `)}function zm(e){let t=Vp();return hm(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${q(Bt.officialSources.money)}. Esta sección no muestra montos cobrados: los pagos que anotes de apoyo están en <a class="adm-inline-link" href="#adm-pagos" data-adm-goto="adm-pagos">Pagos</a>.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${Qt(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${Y(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${Qt(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${Qt(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${Y(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${b.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${q(e)}: ${J(t.excluded.filter(t=>t.plan===e).map(e=>q(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function Bm(){let e=Bt.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${zt}.</strong> Perros: ${q(e.dogs)}. Rutas: ${q(e.routes)}. Plata: ${q(e.money)}.</p>
      <p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${zf}.</p>
    </footer>
  `}function Vm(){let{dayName:e,date:t}=Yf(),n=_p(),r=Bp(n),i=Xf(),a=r.find(e=>!i.includes(e.id)),o=Pp(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,`Perros atrasados (más de ${Lf} min sin retiro): ${n.late.length}. Avisos por barrio vigentes: ${n.avisos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${J(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${zt}.`].join(`
`)}async function Hm(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function Um(e){Gf=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=Gf)},60)}function Wm(){Zf(Af,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function Gm(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,Wm());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function Km(e){return e.target.closest(`[data-admin-logout]`)?(G.credential=null,G.users=null,G.usersError=``,G.liveDay=null,G.adminLoaded=!1,G.pagosMes=null,G.archivosTipo=`todos`,K.pago=Kf(),K.pagoArchivo=null,K.pagoSubido=null,lh(`/salir`),!0):!1}function qm(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function Jm(e,t){G.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function Ym(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),G.busy))return;let n=t.dataset.admForm;if(n===`pago`)await Xm();else if(n===`crear`){let e=K.crear,n=e.nombre.trim(),r=Ep(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?G.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:rt[e.rol]?Dp(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Z(`users`,a,!0),Q();return}Jm(t,!0);try{let t=await at.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});G.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},K.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},G.showCreate=!1,Z(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),G.busy=!1,await Tp(),qm(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),G.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=G.users?.find(t=>t.usuario===e),r=K.reset.pin.trim(),i=n?Dp(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}Jm(t,!0);try{let t=!n.activo;await at.save({usuario:e,pin:r,...t?{activo:!0}:{}}),G.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},G.resetFor=null,K.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),G.busy=!1,await Tp(),qm(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),G.busy=!1,Q()}}}async function Xm(){let e=K.pago,t=e.concepto.trim(),n=e.medio.trim(),r=Tm(e.monto),i=K.pagoArchivo,a=``;if(/^\d{4}-\d{2}-\d{2}$/.test(e.fecha)?t.length<2?a=`Escribí el concepto (por ejemplo, el plan y la semana).`:!Number.isFinite(r)||r<=0?a=`Escribí el monto en pesos, solo números (por ejemplo 35000).`:i&&!K.pagoSubido&&ip()&&(a=`Sin señal no se puede subir el comprobante (los archivos no quedan en espera). Tocá “Quitar” para guardar el pago sin comprobante y adjuntarlo después, o esperá a tener señal.`):a=`Elegí la fecha del pago.`,a){Z(`pagos`,a,!0),Q();return}G.busy=!0,G.savingPago=!0;let o=K.pagoSubido?.id||``;if(i&&!o){Z(`pagos`,`Subiendo el comprobante…`),Q();try{let e=await _t.subir(`comprobante de pago`,i);o=e.id,K.pagoSubido={id:e.id}}catch(e){Z(`pagos`,`No se pudo subir el comprobante: ${e.message||`error del servidor.`} El pago todavía no se guardó: probá de nuevo o tocá “Quitar” para guardarlo sin comprobante.`,!0),G.busy=!1,G.savingPago=!1,Q();return}}try{let i=await v.save(`pagos`,{fecha:e.fecha,concepto:t,monto:r,medio:n,pasadoAlLibro:e.pasadoAlLibro===!0,...o?{comprobanteId:o}:{}});K.pago=Kf(),K.pagoArchivo=null,K.pagoSubido=null,G.pagosMes=e.fecha.slice(0,7);let a=o?` con su comprobante`:``;Z(`pagos`,i.pendiente?`Se enviará cuando haya señal. Queda anotado en este dispositivo${a?` (el comprobante ya se subió)`:``}.`:`Listo: pago de ${Qt(r)} guardado${a}${e.pasadoAlLibro?``:`. Acordate de pasarlo al Libro contable`}.`)}catch(e){Z(`pagos`,`${e.message||`No se pudo guardar el pago.`}${o?` El comprobante ya se subió: al tocar “Guardar pago” de nuevo no se sube otra vez.`:``}`,!0)}finally{G.busy=!1,G.savingPago=!1,Q()}}function Zm(e){let t=e.files?.[0];e.value=``,t&&(Hf.test(t.type)?t.type===`application/pdf`&&t.size>3670016?(Z(`pagos`,`El PDF es muy pesado (máximo 3,5 MB). Probá con una captura de pantalla.`,!0),Q()):(K.pagoArchivo=t,K.pagoSubido=null,Z(`pagos`,`Comprobante elegido: ${t.name||`archivo`}. Se sube al tocar “Guardar pago”.`),Q(),qm(`#adm-pago-archivo-quitar`)):(Z(`pagos`,`Ese archivo no sirve: solo fotos (JPG, PNG, WEBP) o PDF.`,!0),Q()))}async function Qm(e){let t=e.dataset.admPagoAdjuntar,n=e.files?.[0];e.value=``;let r=v.cached(`pagos`,X(`pagos`)).find(e=>e.id===t);if(!n||!r)return;let i=`${r.concepto||`el pago`}${r.fecha?` del ${tp(r.fecha)}`:``}`,a=``;if(G.busy?a=`Esperá a que termine lo que se está guardando y probá de nuevo.`:Hf.test(n.type)?ip()&&(a=`Sin señal no se puede subir el comprobante (los archivos no quedan en espera). Probá cuando vuelva la señal.`):a=`Ese archivo no sirve: solo fotos (JPG, PNG, WEBP) o PDF.`,a){Z(`pagos`,a,!0),Q();return}G.busy=!0,Z(`pagos`,`Subiendo el comprobante de ${i}…`),Q();let o=null;try{o=await _t.subir(`comprobante de pago`,n),Z(`pagos`,(await v.save(`pagos`,{id:t,fecha:r.fecha,comprobanteId:o.id})).pendiente?`El comprobante se subió. El cambio del pago se enviará cuando haya señal.`:`Listo: ${i} ya tiene su comprobante.`)}catch(e){Z(`pagos`,`${o?`El comprobante se subió pero no se pudo vincular al pago`:`No se pudo subir el comprobante`}: ${e.message||`error del servidor.`}`,!0)}finally{G.busy=!1,Q(),qm(o?`.adm-pago [data-adm-archivo-abrir="${CSS.escape(o.id)}"]`:`[data-adm-pago-adjuntar="${CSS.escape(t)}"]`)}}function $m(e){let t=e.dataset.admArchivoAbrir,n=G.msgs[e.dataset.admArea]===void 0?`archivos`:e.dataset.admArea;ip()?(Z(n,`Sin señal no se puede abrir el archivo. Probá cuando vuelva la señal.`,!0),Q()):_t.abrir(t).catch(e=>{let t=e.status===403?`Tu usuario no puede abrir este archivo. Los comprobantes de pago los abre solo el admin.`:e.status===404?`No se encontró el archivo guardado. Puede que lo hayan borrado de Drive.`:`No se pudo abrir el archivo: ${e.message||`error del servidor.`}`;Z(n,t,!0),Q()})}async function eh(e){let t=v.cached(`pagos`,X(`pagos`)).find(t=>t.id===e);if(!t||G.busy)return;G.busy=!0;let n=!t.pasadoAlLibro;try{let r=await v.save(`pagos`,{id:e,fecha:t.fecha,pasadoAlLibro:n}),i=`${t.concepto||`El pago`}${t.fecha?` del ${tp(t.fecha)}`:``}`;Z(`pagos`,r.pendiente?`Se enviará cuando haya señal.`:n?`Listo: ${i} quedó como pasado al Libro.`:`Listo: ${i} quedó como pendiente de pasar al Libro.`)}catch(e){Z(`pagos`,e.message||`No se pudo cambiar la marca.`,!0)}finally{G.busy=!1,Q(),qm(`[data-adm-pago-libro="${CSS.escape(e)}"]`)}}async function th(e,t,n){if(!G.busy){G.busy=!0;try{await e(),Z(`users`,t),G.busy=!1,await Tp()}catch(e){Z(`users`,e.message||n,!0),G.busy=!1,Q()}}}function nh(e){if(e.target.closest(`[data-adm-create-toggle]`))return G.showCreate=!G.showCreate,G.resetFor=null,G.confirmOff=null,$(),qm(G.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return G.usersError=``,Tp().then(()=>{G.usersError||(Z(`users`,`Lista de usuarios actualizada.`),Q())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;K[e].pin=Op();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=K[e].pin),Um(`PIN generado: ${K[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=G.users?.find(t=>t.usuario===e);if(!t)return!0;let r=K.roles[e]||t.rol;return r===t.rol?(Z(`users`,`${t.nombre} ya tiene el rol ${rt[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Q(),!0):(th(async()=>{await at.save({usuario:e,rol:r}),delete K.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${rt[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return G.resetFor=G.resetFor===e?null:e,G.confirmOff=null,K.reset.pin=``,$(),G.resetFor&&qm(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=G.resetFor||``;return G.resetFor=null,K.reset.pin=``,$(),qm(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return G.confirmOff=i.dataset.admOff,G.resetFor=null,$(),qm(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=G.confirmOff||``;return G.confirmOff=null,$(),qm(`[data-adm-off="${CSS.escape(e)}"]`),Um(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=G.users?.find(t=>t.usuario===e);return G.confirmOff=null,th(()=>at.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}if(e.target.closest(`[data-adm-cred-copy]`))return G.credential&&Hm(kp(G.credential)).then(e=>{Um(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0;if(e.target.closest(`[data-adm-cred-hide]`))return G.credential=null,$(),qm(`#adm-usuarios`),Um(`Listo. El PIN ya no se muestra.`),!0;if(e.target.closest(`[data-adm-live-refresh]`))return xp(!0),!0;let o=e.target.closest(`[data-adm-pago-libro]`);if(o)return eh(o.dataset.admPagoLibro),!0;let s=e.target.closest(`[data-adm-archivo-abrir]`);return s?($m(s),!0):e.target.closest(`[data-adm-pago-quitar]`)?(K.pagoArchivo=null,K.pagoSubido=null,Z(`pagos`,`Comprobante quitado. El pago se guarda sin comprobante.`),Q(),qm(`#adm-pago-archivo`),!0):!1}function rh(e){if(e.target.matches?.(`[data-adm-pago-archivo], [data-adm-pago-adjuntar]`)){if(e.type!==`change`)return;e.target.dataset.admPagoAdjuntar===void 0?Zm(e.target):Qm(e.target);return}let t=e.target.closest?.(`[data-adm-archivos-tipo]`);if(t){e.type===`change`&&G.archivosTipo!==t.value&&(G.archivosTipo=t.value,Q(),Um(t.value===`todos`?`Se muestran todos los archivos.`:`Se muestran los archivos de tipo ${(Bf[t.value]?.label||t.value).toLowerCase()}.`));return}let n=e.target.closest?.(`[data-adm-pagos-mes]`);if(n){e.type===`change`&&G.pagosMes!==n.value&&(G.pagosMes=n.value,Q(),Um(`Pagos de ${n.value===`todos`?`todos los meses`:wm(n.value).toLowerCase()}.`));return}let r=e.target.closest?.(`[data-adm-draft]`);if(!r)return;let i=r.dataset.admDraft,a=r.dataset.admKey,o=r.type===`checkbox`?r.checked:r.value;if(i===`roles`?K.roles[a]=o:K[i][a]=o,i===`crear`&&a===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${q(rt[r.value]||r.value)}:</strong> ${q(wp(r.value))}`)}}function ih(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=Xf(),r=n.includes(e);return Zf(kf,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),Um(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),Gm(n.dataset.admGoto),!0;if(nh(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),Wm(),Um(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(Hm(Vm()).then(e=>{Um(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function ah(e){if(e.target.matches?.(`[data-adm-section]`)&&Wm(),e.target.matches?.(`[data-adm-dogs], [data-adm-inner]`)){let t=e.target.dataset.admDogs||e.target.dataset.admInner;e.target.open?G.openDogs.add(t):G.openDogs.delete(t)}}function oh(){_e.push(Km),ye.push(ih),document.addEventListener(`toggle`,ah,!0),document.addEventListener(`submit`,Ym),document.addEventListener(`input`,rh),document.addEventListener(`change`,rh),$e(e=>{(Ff.includes(e)||If.includes(e))&&Q()}),setInterval(()=>{if(!sp()||_.user()?.rol!==`admin`||document.visibilityState!==`visible`)return;let e=vp(_p());e!==G.lateSignature&&(G.lateSignature=e,Q())},3e4),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var sh=document.querySelector(`#app`);function ch(e){return e.replace(/\/+$/,``)||`/`}function lh(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ce(),Ot(),Rt(),xr(),Na(),Ic(),Of(),oh(),document.addEventListener(`click`,e=>{if(be(_e,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),lh(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{be(ve,e)});function $(){let e=ch(window.location.pathname);if(e===`/`){sh.innerHTML=yt(),dh();return}if(e===`/login`){sh.innerHTML=Mt(),dh();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),_.clear(),sh.innerHTML=Mt(),dh();return}if(e===`/registro`||e===`/register`){sh.innerHTML=Pt(),dh();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(sh.innerHTML=uh(r),dh()):(sh.innerHTML=pe(),dh())}function uh(e){if(e===`cliente`)return fh(e);let t=_.user();return t?(nt[t.rol]||[]).includes(e)?fh(e):Ft(e):(window.history.replaceState({},``,`/login?volver=/${e}`),Mt())}function dh(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=me()+ge(),document.body.classList.toggle(`menu-locked`,e.menuOpen),He(),Ve()}function fh(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:Wp,coordinador:Fd,supervisor:Qs,paseador:qi,cliente:Kn}[e]();return i?Ki(o):a?Xs(o):e===`coordinador`?Nd(o):e===`admin`?Hp(o):oe(`
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