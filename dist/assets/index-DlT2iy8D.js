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
  `}function ze(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){Oe=!Oe,Re(),Oe?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);De={...De,[e]:n},Ae(),Ie(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else Oe&&!e.target.closest(`#a11y-root`)&&(Oe=!1,Re())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Oe&&(Oe=!1,Re(),document.querySelector(`.a11y-toggle`)?.focus())}),je.addEventListener?.(`change`,Ie),Me.addEventListener?.(`change`,Ie),Ie()}var Be={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function Ve(){Be.frame&&cancelAnimationFrame(Be.frame),Be.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Pe(),r=Ne()?[22,52,39]:[184,218,198],i=Ne()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Be.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Be.lastDraw>33&&(Be.lastDraw=e,s(e/1e3)),Be.frame=requestAnimationFrame(l)}Be.frame=requestAnimationFrame(l)}function He(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ue=`pj_sesion`,We=`pj_pendientes`,Ge=`pj_cache_`,Ke=6e4;fetch(`/api/salud`).then(e=>e.json()).then(e=>{/provisorio/i.test(e.almacenamiento||``)&&(Ke=3e5)}).catch(()=>{});var qe=new Set,Je=new Map,Ye=new Set;document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Ye.forEach(e=>e())});function Xe(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ze(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Qe(e){qe.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function $e(e){return qe.add(e),()=>qe.delete(e)}var et=class extends Error{constructor(e,t){super(t),this.status=e}};async function tt(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=_.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new et(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(_.clear(),Qe(`sesion`)),!o.ok||s.ok===!1)throw new et(o.status,s.error||`Error del servidor.`);return s}var _={token:()=>Xe(Ue,null)?.token||null,user:()=>Xe(Ue,null)?.user||null,set(e,t){Ze(Ue,{token:e,user:t}),Qe(`sesion`)},clear(){try{localStorage.removeItem(Ue),Object.keys(localStorage).filter(e=>e.startsWith(Ge)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return tt(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await tt(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return _.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await tt(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return _.set(i.token,i.user),i.user},async refresh(){let e=_.token();if(!e)return null;let t=await tt(`/api/auth/me`);return t.user&&_.token()===e&&_.set(e,t.user),t.user},async changePin(e,t){let n=await tt(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return _.set(n.token,n.user),n.user},logout(){_.clear(),Qe(`sesion`)}},nt={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],ayudante:[`paseador`],marketing:[]},rt={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,ayudante:`Ayudante de paseador`,marketing:`Marketing`};function it(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`,ayudante:`/paseador`}[e]||`/`}var at={list:async()=>(await tt(`/api/usuarios`)).usuarios,save:async e=>(await tt(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>tt(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function ot(e,t={}){return`${Ge}${e}_${t.desde||``}_${t.prefijo||``}`}function st(e,t){let n=Xe(We,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var v={cached(e,t={}){return st(e,Xe(ot(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await tt(`/api/registros?${n}`),i=localStorage.getItem(ot(e,t));return Ze(ot(e,t),r.registros),i!==JSON.stringify(r.registros)&&Qe(e),st(e,r.registros)}catch(n){if(n.status===0)return v.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=ct(n.fecha);try{let t=await tt(`/api/registros`,{method:`POST`,body:{col:e,...n}});return lt(e,t.registro),Qe(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Xe(We,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:_.user()?.usuario,at:Date.now()}),Ze(We,a),Qe(e),{...n,pendiente:!0}}},async remove(e,t){await tt(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{Ze(e,Xe(e,[]).filter(e=>e.id!==t))}),Qe(e)},pendingCount(){return Xe(We,[]).length},watch(e,t={}){let n=ot(e,t);if(Je.has(n))return Je.get(n);let r=()=>{document.visibilityState===`visible`&&_.token()&&v.list(e,t).catch(()=>{})};r(),Ye.add(r);let i=setInterval(r,Ke);setTimeout(()=>{clearInterval(i),i=setInterval(r,Ke)},3e3);let a=()=>{Ye.delete(r),clearInterval(i),Je.delete(n)};return Je.set(n,a),a}};function ct(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function lt(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{let n=Xe(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Ze(e,n)})}var ut=!1;async function dt(){if(ut||!_.token())return 0;let e=_.user()?.usuario,t=Xe(We,[]);if(!t.length)return 0;ut=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await tt(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});lt(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Ze(We,Xe(We,[]).filter(e=>!n.has(e.at))),ut=!1,r.forEach(e=>Qe(e))}return n.size}window.addEventListener(`online`,()=>dt()),setInterval(()=>dt(),3e4);async function ft(e){return tt(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function y(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}function pt(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function mt(){return oe(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${ht()}
      ${gt()}
      ${_t()}
      ${xt()}
      <a class="whatsapp" href="${re(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function ht(){return`
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
  `}function gt(){return`
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

    ${vt()}

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
  `}function _t(){return`
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
  `}function vt(){return`
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

        ${yt()}
      </div>
    </section>
  `}function yt(){return pt()?`
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
  `}function bt(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`)].filter(e=>e!==null).join(`
`)}function xt(){return`
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
  `}function St(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(re(bt(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,ft(Object.fromEntries(i)).then(()=>{n.textContent=`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function Ct(){document.addEventListener(`submit`,St)}var wt=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),Tt={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function Et(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function Dt(){let e=_.user();if(e)return Ot(e);Tt.necesitaConfiguracion===null&&!Tt.cargando&&(Tt.cargando=!0,_.status().then(e=>{Tt.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{Tt={...Tt,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{Tt.cargando=!1,$()}));let t=Tt.necesitaConfiguracion===!0;return oe(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${Tt.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Código de configuración <input name="codigo" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Te lo pasó JUAN 3.0" /></label>`:``}
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>`}
        <p class="acc-status ${Tt.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${wt(Tt.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function Ot(e){return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${wt(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${wt(e.usuario)}</strong> (${wt(e.rol)}).</p>
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
  `)}function kt(){return oe(`
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
  `)}function At(e){let t=_.user(),n=nt[t?.rol]||[];return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${wt(t?.nombre)}</strong> (${wt(t?.rol)}) y la página de ${wt(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function jt(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function Mt(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return jt(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return jt(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return jt(t,`Completá usuario y PIN.`,!0);i.disabled=!0,jt(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await _.changePin(r.actual,r.nuevo);t.reset(),jt(t,`Listo: tu PIN quedó cambiado.`),it(e.rol)!==`/`&&setTimeout(()=>Rm(it(e.rol)),900);return}let e=n===`setup`?await _.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin,codigo:r.codigo}):await _.login(r.usuario,r.pin);if(Tt={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){Rm(`/login`);return}let i=Et();Rm(i&&(nt[e.rol]||[]).includes(i.slice(1))?i:it(e.rol))}catch(e){jt(t,e instanceof et?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function Nt(){document.addEventListener(`submit`,Mt)}var b=`Pendiente de confirmar`,Pt=`12/11/2026`,Ft={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},It=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Lt={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},x={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},S=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],Rt=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],zt={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Bt=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Vt={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},C=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),Ht=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Ut=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],Wt=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function Gt(e,t,n){return!!e.schedule?.[t]?.includes(n)}function Kt(e=new Date){return S[(e.getDay()+6)%7]}function qt(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var Jt=[[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Flora`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,20,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Lunes`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Coqui`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Manolo`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Lunes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Martes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:15`,`Forest`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:30`,`Sam`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:45`,`Coqui`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:00`,`Manolo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Séptima`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Rambo`,20,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam ni Cashi`],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Morris`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:45`,`Lokaku`,45,`Bozal`],[`Miércoles`,`Mañana`,`PJ_1M`,`11:00`,`Paco`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Tayler`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Duque`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:30`,`Rambo`,20,``],[`Miércoles`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:30`,`Annie`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:45`,`Séptima`,45,`Sin días contratados cargados`],[`Miércoles`,`Tarde`,`PJ_2T`,`16:00`,`Milo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:15`,`Flora`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Jueves`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`11:00`,`Rambo`,20,``],[`Jueves`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`14:45`,`Forest`,45,`Bozal`],[`Jueves`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Jueves`,`Tarde`,`PJ_1T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Jueves`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`16:15`,`Rambo`,20,`Revisar duración`],[`Viernes`,`Mañana`,`PJ_1M`,`09:45`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Runa`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:50`,`Kiara`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Flora`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Viernes`,`Tarde`,`PJ_2T`,`14:45`,`Coqui`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`16:00`,`Séptima`,45,`Sin días contratados cargados`],[`Viernes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Viernes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,5,`Revisar duración`],[`Sábado`,`Mañana`,`PJ_1M`,`09:15`,`Sam`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`14:45`,`Forest`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Roma`,55,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Milo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`16:00`,`Tayler`,45,``]],Yt={"Lunes|Mañana":`Juan`,"Lunes|Tarde":`Nicolás`,"Martes|Mañana":`Juan`,"Martes|Tarde":`Nicolás`,"Miércoles|Mañana":`Juan`,"Miércoles|Tarde":`Nicolás`,"Jueves|Mañana":`Juan`,"Jueves|Tarde":`Nicolás`,"Viernes|Mañana":`Nicolás`,"Viernes|Tarde":`Nicolás`,"Sábado|Mañana":`Juan`,"Sábado|Tarde":`Juan`},Xt=new Map(C.map(e=>[e.name,e]));function Zt(e,t){let[n,r]=e.split(`:`).map(Number),i=n*60+r+Number(t||0);return`${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}var Qt=Jt.map(([e,t,n,r,i,a,o])=>({dia:e,turno:t,ruta:n,hora:r,perroId:Xt.get(i)?.id||null,perroNombre:i,minutos:a,salida:Zt(r,a),nota:o}));function $t(){let e=new Map;return Qt.forEach(t=>{let n=`${t.ruta}_${t.dia.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}`;e.has(n)||e.set(n,{id:n,dia:t.dia,turno:t.turno,ruta:t.ruta,paseador:``,ayudante:``,supervisor:Yt[`${t.dia}|${t.turno}`]||``,paradas:[],origen:`Planilla RPJ, BASE RUTAS (12/11/2026)`}),e.get(n).paradas.push({perroId:t.perroId,perroNombre:t.perroNombre,hora:t.hora,minutos:t.minutos,nota:t.nota})}),[...e.values()].map(e=>({...e,paradas:e.paradas.sort((e,t)=>e.hora.localeCompare(t.hora))}))}var en=[`Mapuche Country Club`,`La Lonja`,`Pilar (otros barrios)`],tn={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},nn=`Tu perro`,rn={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},an=[`Pequeño`,`Mediano`,`Grande`],on=S.filter(e=>e!==`Domingo`),sn={Mañana:x.manana,Tarde:x.tarde};function cn(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function ln(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function un(){let e=cn(tn.plan,null);if(!e||typeof e!=`object`)return{...rn};let t=Rt.find(t=>t.id===e.planId)?e.planId:rn.planId,n=an.includes(e.size)?e.size:rn.size,r=sn[e.shift]?e.shift:rn.shift,i=Array.isArray(e.days)?on.filter(t=>e.days.includes(t)):rn.days;return{planId:t,size:n,shift:r,days:i.length?i:rn.days}}function dn(){let e=cn(tn.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function fn(){let e=cn(tn.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function pn(e){let t=cn(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function mn(){let e=cn(tn.carnet,null);return e&&typeof e.name==`string`?e:null}function w(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function hn(e){return`https://wa.me/${Ft.whatsapp}?text=${encodeURIComponent(e)}`}function gn(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function _n(e,t){return new Date(e.getTime()+t*864e5)}function vn(e){return S[(e.getUTCDay()+6)%7]}function yn(e){return e.toISOString().slice(0,10)}function bn(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function xn(e){let[t,n,r]=e.split(`-`).map(Number);return bn(new Date(Date.UTC(t,n-1,r)))}function Sn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function Cn(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function wn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function Tn(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function En(e,t,n){return`${e} ${e===1?t:n}`}function Dn(){let e=un(),t=Rt.find(t=>t.id===e.planId),n=sn[e.shift],r=dn(),i=gn(),a=yn(i.date),o=fn().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||nn}}function On(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=vn(r.date),s=Cn(n.from),c=Cn(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function kn(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=_n(a.date,e);r.days.includes(vn(t))&&(e===0&&a.minutes>Cn(i.to)||n&&o.has(yn(t))||s.push(t))}return s}var An=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],jn=An.flatMap(e=>e.fields);function Mn(e,t){return!!String(e[t]??``).trim()}function Nn(e,t){return t.fields.filter(t=>Mn(e,t.key)).length}function Pn(e){return jn.filter(t=>Mn(e,t.key)).length}function Fn(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function In(e){let{ficha:t}=e,n=[],r=An.find(e=>e.id===`emergencia`);Nn(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),mn()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=Pn(t);return i<jn.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${jn.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function Ln(e){return e.todayIso<=r.until}var Rn={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function zn(e,t,n=``){Rn.status[e]={message:t,html:n}}function Bn(e){let t=Rn.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${w(t.message)} ${t.html}`.trim():``}</p>`}function Vn(){return`
    <div class="cl-page" data-cl-root>
      ${Hn(Dn())}
    </div>
  `}function Hn(e){return`
    <p class="cl-demo-note">
      ${g(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${Un(e)}
    ${qn(e)}
    ${Yn()}
    ${Xn(e)}
    ${Zn(e)}
    ${Qn(e)}
    <div class="cl-two-col">
      ${rr()}
      ${ir(e)}
    </div>
    ${Ln(e)?ar():``}
    ${or()}
  `}function Un(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=On(e),c=Fn(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=kn(e,1)[0],d=u&&yn(u)===e.todayIso,f=In(e),p={libre:`Los días de paseo de tu plan son ${Tn(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${g(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${w(a)}</strong>
            <small>${w(i.name)} · ${w(r.size)} · Turno ${w(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${w(vn(t.date))} ${bn(t.date)}</p>
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
        <div data-cl-region="alertas-hoy">${Gn(c,!0)}</div>
        ${Kn(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${g(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:w(vn(u))}</p>
            <p class="cl-next-date">${d?`${w(vn(u))} ${bn(u)}`:bn(u)}</p>
            <p class="cl-next-shift">Turno ${w(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${b}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${Wn(e,f)}</div>
        </article>
      </div>
    </section>
  `}function Wn(e,t=In(e)){return t.length?`
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
  `:`<p class="cl-all-done">${g(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function Gn(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${g(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${w(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function Kn(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=_n(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${S.map((e,t)=>_n(a,t)).map(e=>{let t=yn(e),a=vn(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${bn(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${wn(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function qn(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${g(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${hn(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${w(Ft.whatsappLabel)}</small></span>
      </a>
      ${Ln(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${g(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${w(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function Jn(){return`Ahora: tema ${Ne()?`oscuro`:`claro`} · movimiento ${Pe()?`calmo (sin movimiento)`:`normal`}.`}function Yn(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${g(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${Jn()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function Xn(e){let t=kn(e,10);return`
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
                ${t.map(t=>`<option value="${yn(t)}">${w(vn(t))} ${bn(t)} · turno ${w(e.settings.shift.toLowerCase())}</option>`).join(``)}
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
          ${Bn(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${w(vn(Sn(e.date)))} ${xn(e.date)}</strong>
                    ${e.reason?`<small>${w(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${w(e.date)}" aria-label="Quitar la ausencia del ${xn(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function Zn(e){let{plan:t,settings:n,shift:r}=e,i=zt[n.size],a=n.days.length===t.walks;return`
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
          <p class="cl-plan-walks">${En(t.walks,`paseo`,`paseos`)} por semana · ${w(n.size)}</p>
          <p class="cl-plan-price"><b>${qt(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${on.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${wn(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${w(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${b}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${g(`alertCircle`,`cl-icon-sm`)} El ${w(t.name)} incluye ${En(t.walks,`paseo`,`paseos`)} por semana y hay ${En(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${w(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${Rt.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${w(e.name)}</strong>
            <span>${En(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${qt(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${w(n.size.toLowerCase())}):</strong> individual ${qt(i.individual)} · en grupo ${qt(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Bt.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${Rn.openGroups.has(`plan`)?`open`:``}>
        <summary>${g(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${Rt.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${w(e.name)} · ${En(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${an.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(sn).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${on.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${Bn(`plan`)}
        </div>
      </details>
    </section>
  `}function Qn(e){let{ficha:t}=e,n=Pn(t),r=jn.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${w(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${b}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${$n(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${w(Vt[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${b}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${Gn(Fn(t))}</div>

      <div class="cl-ficha-groups">
        ${An.map(e=>tr(e,t)).join(``)}
      </div>
      ${Bn(`ficha`)}
    </section>
  `}function $n(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function er(e,t){let n=Nn(e,t);return n===t.fields.length?`<span class="cl-count is-done">${g(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${b.toLowerCase()}</span>`}function tr(e,t){let n=Rn.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${g(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${er(t,e)}</span>
        ${g(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>nr(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function nr(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${b}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${w(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${w(e.placeholder||`Pendiente de confirmar`)}">${w(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${w(r)}" placeholder="${w(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${Mn(t,e.key)?``:b}</small>`:``}
    </label>
  `}function rr(){let e=mn();return`
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
      <a class="cl-btn is-secondary" href="${hn(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${Bn(`carnet`)}
    </section>
  `}function ir(e){let t=pn(tn.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${qt(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${hn(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
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
        <a class="cl-btn is-secondary" href="${hn(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${g(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${Bn(`comprobante`)}
    </section>
  `}function ar(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${g(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${w(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${w(r.title)}</h2>
        <p>${w(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${hn(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function or(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${g(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${Rn.resetArmed?`is-danger`:``}" data-cl-reset>
        ${Rn.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${Bn(`privacidad`)}
    </section>
  `}function sr(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=Hn(Dn()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function cr(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=Dn();Object.entries({pendientes:()=>Wn(t),"alertas-hoy":()=>Gn(Fn(t.ficha),!0),"alertas-ficha":()=>Gn(Fn(t.ficha)),"ficha-progreso":()=>$n(Pn(t.ficha),jn.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),An.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=er(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=Mn(t.ficha,e.dataset.clFieldState)?``:b})}function lr(e,t,n=``){zn(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${w(t)} ${n}`.trim())}function ur(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,Rn.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Pe()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function dr(){return bn(gn().date)}function fr(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return ur(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=Dn(),r=fn().filter(t=>t.date!==e);r.push({date:e,reason:t}),ln(tn.ausencias,r);let i=hn([`Hola, aviso que ${n.dogName===nn?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${vn(Sn(e)).toLowerCase()} ${xn(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),zn(`ausencia`,`Listo: anotamos la ausencia del ${xn(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),sr(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return ln(tn.ausencias,fn().filter(t=>t.date!==e)),zn(`ausencia`,`Quitamos la ausencia del ${xn(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),sr(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=Rt.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(lr(`plan`,`El ${r.name} incluye ${En(r.walks,`paseo`,`paseos`)} por semana: elegí ${En(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(ln(tn.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),zn(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),sr(`[data-cl-plan-save]`),!0):(lr(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return Rn.resetArmed?(Object.values(tn).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),Rn.resetArmed=!1,Rn.status={},zn(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),sr(`[data-cl-reset]`),!0):(Rn.resetArmed=!0,sr(`[data-cl-reset]`),!0);if(Rn.resetArmed&&!e.target.closest(`[data-cl-reset]`)){Rn.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function pr(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:dr()};if(t.dataset.clFile===`carnet`)ln(tn.carnet,n),zn(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),sr(`[data-cl-status='carnet']`);else{let t=[n,...pn(tn.comprobantes)].slice(0,10);ln(tn.comprobantes,t),zn(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),sr(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=dn();lr(`ficha`,ln(tn.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function mr(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=dn();ln(tn.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),cr()}function hr(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?Rn.openGroups.add(t.dataset.clDetails):Rn.openGroups.delete(t.dataset.clDetails))}function gr(){_e.push(fr),ve.push(pr),document.addEventListener(`input`,mr),document.addEventListener(`toggle`,hr,!0),Fe(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${Jn()} Se guarda solo en este dispositivo.`)})}var _r=`America/Argentina/Buenos_Aires`,vr=`paseosJuan_paseador_progreso`,yr=`paseosJuan_paseador_equipo`,br=`paseosJuan_paseador_incidente`,xr=`paseosJuan_paseador_ruta`,T=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],Sr={pendiente:0,retirado:1,paseando:2,entregado:3},Cr=`no-sale`,wr={Mañana:`manana`,Tarde:`tarde`},Tr=/^[a-z0-9][a-z0-9_.-]{0,60}$/i,Er={Mañana:x.manana,Tarde:x.tarde},Dr=[`Bajo`,`Medio`,`Alto`],Or=[`No se ven`,`Sí`,`No sé`],kr=`Perro externo`,Ar=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,jr=$t(),E={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``,routeChange:null};function D(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Mr(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Nr(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Pr(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim().toLowerCase()}function Fr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:_r,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:Kt(t)}}function Ir(e){let[t,n,r]=String(e).split(`-`);return r?`${r}/${n}/${t}`:e}function Lr(e,t){let n=(S.indexOf(e)-S.indexOf(t.day)+7)%7,[r,i,a]=t.iso.split(`-`).map(Number);return new Date(Date.UTC(r,i-1,a+n)).toISOString().slice(0,10)}function Rr(e){return e.minutes<810?`Mañana`:`Tarde`}function zr(){let e=Fr(),t=E.day||e.day,n=E.shift||Rr(e),r=t===e.day;return{now:e,day:t,shift:n,isToday:r,iso:r?e.iso:Lr(t,e)}}function Br(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Vr(e){let t=Er[e];return`${t.from} a ${t.to}`}function Hr(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}function Ur(e){if(e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t} h ${n} min`:`${t} h`}function Wr(e,t,n=`retiro`){let r=Hr(e);if(r===null)return{text:`Hora: ${b.toLowerCase()}`,kind:`info`};let i=r-t;return i>0?{text:`${n===`entrega`?`Entrega `:``}${n===`entrega`?`en`:`En`} ${Ur(i)}`,kind:i<=10?`soon`:`ok`}:i===0?{text:n===`entrega`?`Entrega ahora`:`Ahora`,kind:`soon`}:{text:n===`entrega`?`Entrega con ${Ur(-i)} de atraso`:`${Ur(-i)} de atraso`,kind:`late`}}function Gr(e,t,n=`retiro`){let r=Wr(e,t,n);return`<span class="pw-cd pw-cd--${r.kind}" data-pw-countdown="${D(e)}" data-pw-mode="${n}">${D(r.text)}</span>`}function Kr(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function qr(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function Jr(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${Br(i)}`),t=t.filter(e=>!e.includes(r))}return n}function Yr(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function Xr(e){return e.safety.some(e=>/bozal/i.test(e))}var Zr=Ht.filter(e=>e.sebastian>0),Qr=Ht.filter(e=>e.sebastian===0&&e.juan>0),$r=Ht.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function ei(){return _.user()||{}}function ti(){return ei().nombre||`equipo`}function ni(){return ei().rol===`ayudante`}function ri(e){let t=ei();if(!e||!t.usuario)return!1;let n=Pr(e);return n===Pr(t.usuario)||t.nombre&&n===Pr(t.nombre)}function ii(e,t=new Map){if(!e)return``;if(ri(e))return ei().nombre||String(e);let n=String(e);return t.get(n)||t.get(Pr(n))||It.find(e=>e.id===Pr(n))?.name||n}function ai(e,t){return Pr(e)===Pr(t)}function oi(e){return Pr(e).startsWith(`tarde`)?`Tarde`:`Mañana`}function si(e){return C.find(t=>t.id===e.perroId)||C.find(t=>Pr(t.name)===Pr(e.perroNombre))||{id:Tr.test(String(e.perroId||``))?String(e.perroId):``,name:String(e.perroNombre||`Perro sin nombre`),size:b,minutes:null,safety:[],status:`Activo`,unknown:!0}}function ci(e,t){let n=(Array.isArray(e.paradas)?e.paradas:[]).filter(e=>e&&(e.perroId||e.perroNombre)).map((e,t)=>{let n=si(e),r=Number(e.minutos)||n.minutes||null,i=Hr(e.hora)===null?``:String(e.hora).trim().padStart(5,`0`);return{index:t,dog:n,hora:i,minutos:r,salida:i&&r?Zt(i,r):``,nota:String(e.nota||``).trim(),canSave:!!n.id}}).sort((e,t)=>(Hr(e.hora)??9999)-(Hr(t.hora)??9999)||e.index-t.index);return{ruta:String(e.ruta||`Pendiente de confirmar`),turno:oi(e.turno),dia:e.dia||``,paseador:String(e.paseador||``),ayudante:String(e.ayudante||``),supervisor:String(e.supervisor||``),notas:String(e.notas||``),fuente:t,record:e,stops:n}}function li(e,t,n){let r=new Map;v.cached(`rutas`,{desde:n}).filter(t=>t.fecha===e&&t.ruta&&Array.isArray(t.paradas)).sort((e,t)=>String(e.actualizadoEn||``).localeCompare(String(t.actualizadoEn||``))).forEach(e=>r.set(e.ruta,e));let i=v.cached(`plantillas`).filter(e=>e.ruta&&Array.isArray(e.paradas)),a=i.length===0,o=new Map;return(a?jr:i).filter(e=>ai(e.dia,t)).forEach(e=>o.set(e.ruta,ci(e,a?`planilla`:`plantilla`))),r.forEach((e,t)=>o.set(t,ci(e,`dia`))),[...o.values()].sort((e,t)=>e.turno===t.turno?e.ruta.localeCompare(t.ruta):e.turno===`Mañana`?-1:1)}function ui(e){let t=Mr(xr,{})?.[ei().usuario||``];return t&&t.iso===e.iso&&t.turno===e.shift?t.ruta:``}function di(e,t){let n=Mr(xr,{}),r=n&&typeof n==`object`?n:{};r[ei().usuario||``]=t?{iso:e.iso,turno:e.shift,ruta:t}:null,Nr(xr,r)}function fi(e){let t=li(e.iso,e.day,e.now.iso),n=t.filter(t=>t.turno===e.shift),r=n.filter(e=>ri(e.paseador)||ri(e.ayudante)),i=t.filter(t=>t.turno!==e.shift&&(ri(t.paseador)||ri(t.ayudante))),a=r.length?``:n.some(t=>t.ruta===ui(e))?ui(e):``,o=r.length?r:a?n.filter(e=>e.ruta===a):n;return{all:t,ofShift:n,mine:r,elsewhere:i,picked:a,shown:o,assigned:r.length>0,helping:r.find(e=>ri(e.ayudante)&&!ri(e.paseador))||null,fromPlanilla:o.some(e=>e.fuente===`planilla`)}}function pi(e){return e.flatMap(e=>e.stops.map(t=>({...t,route:e})))}function mi(e,t){return pi(fi(e).shown).find(e=>e.dog.id===t)||null}var hi=new Map;function gi(e,t){if(!e.isToday||!O.ready)return;let n=[];t.forEach(r=>{let i=`${e.iso}|${r.turno}|${r.ruta}`,a=new Map(r.stops.map(e=>[e.dog.id||Pr(e.dog.name),e])),o=hi.get(i);if(hi.set(i,a),!o)return;let s=[...a.entries()].filter(([e])=>!o.has(e)).map(([,e])=>`${e.dog.name}${e.hora?` (${e.hora})`:``}`),c=[...o.entries()].filter(([e])=>!a.has(e)).map(([,e])=>e.dog.name),l=[...a.entries()].filter(([e,t])=>o.has(e)&&o.get(e).hora!==t.hora).map(([e,t])=>`${t.dog.name} pasa de ${o.get(e).hora||`sin hora`} a ${t.hora||`sin hora`}`),u=[];s.length&&u.push(`se ${s.length===1?`sumó`:`sumaron`} ${Br(s)}`),c.length&&u.push(`se ${c.length===1?`quitó`:`quitaron`} ${Br(c)}`),l.length&&u.push(`cambió el horario: ${Br(l)}`),u.length&&n.push(`${t.length>1?`${r.ruta}: `:``}${u.join(` / `)}`)}),n.length&&(E.routeChange={text:`La ruta cambió: ${n.join(`. `)}.`,time:e.now.time},k(E.routeChange.text))}function _i(e){return v.cached(`avisos`).filter(t=>{let n=String(t.fecha||``),r=String(t.vigenteHasta||``);return n&&n>e?!1:r?r>=e:n===e}).sort((e,t)=>String(t.actualizadoEn||t.fecha||``).localeCompare(String(e.actualizadoEn||e.fecha||``)))}function vi(e){let t=_i(e.now.iso);return t.length?`
    <section class="pw-notices" aria-labelledby="pw-avisos-title">
      <h2 class="pw-section-label" id="pw-avisos-title">${g(`bell`,`pw-icon pw-icon--sm`)} Avisos por barrio (${t.length})</h2>
      <ul class="pw-notice-list" role="list">
        ${t.map(e=>{let t=/seguridad|perro suelto/i.test(e.tipo||``);return`
            <li class="pw-notice ${t?`pw-notice--danger`:``}">
              ${g(t?`alertTriangle`:`mapPin`,`pw-icon`)}
              <div>
                <p class="pw-notice-head"><strong>${D(e.barrio||`Barrio sin cargar`)}</strong>${e.tipo?` · ${D(e.tipo)}`:``}</p>
                <p>${D(e.mensaje||e.titulo||``)}</p>
                <p class="pw-notice-meta">${e.vigenteHasta?`Vigente hasta el ${D(Ir(e.vigenteHasta))}`:`Vigente hoy`}${e.creadoPorNombre?` · Avisó ${D(e.creadoPorNombre)}`:``}</p>
              </div>
            </li>
          `}).join(``)}
      </ul>
    </section>
  `:``}function yi(e,t,n){return`${e}_${t}_${wr[n]}`}function bi(e,t,n=ei().usuario){return`${e}_${n||`sin-usuario`}_${wr[t]}`}var xi=new Map;function Si(e,t){let n=new Map(v.cached(e,{desde:t}).map(e=>[e.id,e]));return xi.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function Ci(e){let t=T.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===Cr;return{step:r?0:Math.max(Sr[e.estado]??0,n),noSale:r,times:t,record:e}}function wi(e,t,n){let r=Si(`paseos`,e);return Object.fromEntries(n.filter(e=>e.id).map(n=>[n.id,Ci(r.get(yi(e,n.id,t)))]))}function Ti(e,t){return t.dog.id&&e[t.dog.id]||Ci(null)}function Ei(e,t){let n=e.filter(e=>Ti(t,e).noSale).length,r=e.filter(e=>!Ti(t,e).noSale&&Ti(t,e).step>=T.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function Di(e,t){let n=Si(`checklists`,e).get(bi(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:Zr.filter(e=>r[e.item]===!0).map(e=>e.item)}}function Oi(e){let t=new Map,n=(e,n)=>{e&&n&&t.set(String(e),String(n))};return[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]].forEach(([e,t])=>{v.cached(e,t).forEach(e=>{n(e.creadoPor,e.creadoPorNombre),n(e.actualizadoPor,e.actualizadoPorNombre),T.forEach(t=>n(e[`${t.field}Por`],e[`${t.field}PorNombre`]))})}),t}function ki(e,t){return e?ri(e)?`vos`:ii(e,t):b}function Ai(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:_r,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function ji(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Ai(e.actualizadoEn);return`Último cambio: ${ki(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}function Mi(e,t,n){let r=T[t].field,i=e?.[`${r}Por`];return!i||ri(i)?``:e[`${r}PorNombre`]||ii(i,n)}var Ni=Promise.resolve();function Pi(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&xi.set(r,n);let i=Ni.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await v.save(e,i);return E.syncError&&=``,t}catch(e){return E.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,ga(E.syncError),null}finally{r&&xi.get(r)===n&&xi.delete(r),xa()}});return Ni=i.catch(()=>null),i}function Fi(e,t,n,r){let i=t.now.iso,a={id:yi(i,e.dog.id,t.shift),fecha:i,perroId:e.dog.id,perroNombre:e.dog.name,turno:t.shift,ruta:e.route.ruta,...n};return k(r),Pi(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&k(`${r} Sin señal: se enviará cuando haya señal.`)})}function Ii(e,t){let n=e.now.iso,r=Object.fromEntries(Zr.map(e=>[e.item,t.includes(e.item)])),i={id:bi(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=Zr.length};return Pi(`checklists`,i,{optimisticRecord:i})}var O={key:``,stops:[],ready:!1};function Li(e){let t=`${e}|${ei().usuario||``}`;if(O.key===t)return;O.stops.forEach(e=>e()),O.key=t,O.stops=[],O.ready=!1;let n=[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]];Promise.allSettled(n.map(([e,t])=>v.list(e,t))).then(t=>{let n=t.find(e=>e.status===`rejected`);return n&&(E.syncError=`No se pudieron traer los datos del equipo: ${n.reason?.message||`error del servidor`}`,ga(E.syncError)),zi(e)}).catch(()=>null).finally(()=>{O.key===t&&(O.ready=!0,xa(),O.stops=n.map(([e,t])=>v.watch(e,t)))})}var Ri=!1;async function zi(e){if(Ri)return;Ri=!0;let t=Mr(vr,null),n=Mr(yr,null);if(!t&&!n)return;let r=[],i=Si(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&wr[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=C.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=yi(e,t,o),c=Ci(i.get(s)),l=Math.min(n.length,T.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:T[l-1].estado};T.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(Pi(`paseos`,u,{optimisticRecord:u}))})});let a=Si(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!wr[o]||!Array.isArray(n))return;let s=n.filter(e=>Zr.some(t=>t.item===e));s.length&&!a.has(bi(e,o))&&r.push(Ii({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(vr),localStorage.removeItem(yr)}catch{}r.length&&k(`Se subió al equipo lo que tenías marcado en este celular.`)}}function Bi(){let e=Mr(br,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function Vi(e){return`
    <div class="pw-shell">
      ${Ui()}
      ${e}
    </div>
  `}function Hi(){let e=zr();Li(e.now.iso);let t=fi(e);gi(e,t.shown),ka.iso=e.now.iso,ka.shift=Rr(e.now),ka.minute=e.now.minutes;let n=pi(t.shown),r=e.isToday?wi(e.iso,e.shift,n.map(e=>e.dog)):{},i=Oi(e.now.iso);return`
    <main class="pw-main" id="pw-inicio">
      ${Wi()}
      ${Gi()}
      ${vi(e)}
      ${qi(e,t,n,r,i)}
      <div class="pw-routes" id="pw-perros" tabindex="-1" aria-label="Perros de la ruta">
        ${t.shown.length?t.shown.map(n=>$i(n,e,t,r,i)).join(``):`
            <div class="pw-empty">
              <p><strong>No hay rutas cargadas para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
              <p>Si te pidieron un paseo, confirmalo con el coordinador o con Juan.</p>
            </div>
          `}
      </div>
      <div class="pw-columns">
        ${na(e,t,i)}
        ${ra(e,n.map(e=>e.dog))}
      </div>
      <footer class="pw-footer">
        <p>Rutas y horarios: los arma el coordinador. Punto de partida: ${D(Ft.officialSources.routes)} (12/11/2026).</p>
        <p>Lo que marcás acá lo ven ${ni()?`el paseador, `:`tu ayudante, `}Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `}function Ui(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel ${ni()?`del ayudante de paseador`:`del paseador`}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>${ni()?`Ayudante`:`Paseador`} · ${D(ti())}</small>
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
  `}function Wi(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${g(`uploadCloud`,`pw-icon`)}<span>${D(n)}</span></p>`),E.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${g(`alertTriangle`,`pw-icon`)}
        <span>${D(E.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function Gi(){return E.routeChange?`
    <div class="pw-change" data-pw-change>
      ${g(`route`,`pw-icon pw-icon--lg`)}
      <div>
        <strong>${D(E.routeChange.text)}</strong>
        <p>Lo cambió el coordinador. Aviso recibido a las ${D(E.routeChange.time)}.</p>
      </div>
      <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-change-ok>Entendido</button>
    </div>
  `:``}function Ki(e){let t=e.flatMap(e=>e.stops.map(e=>e.hora)).filter(Boolean).sort(),n=e.flatMap(e=>e.stops.map(e=>e.salida)).filter(Boolean).sort();return t.length?`${t[0]} a ${n[n.length-1]||t[t.length-1]}`:``}function qi(e,t,n,r,i){let a=t.helping,o=t.mine[0]||null,s=e.isToday?`hoy, ${e.day.toLowerCase()}`:`${e.day.toLowerCase()} ${Ir(e.iso)}`,c;c=a?`Acompañás a ${D(ii(a.paseador,i)||`un paseador sin asignar`)} en ${D(a.ruta)}`:o?t.mine.length>1?`Tus rutas de ${s}: ${D(Br(t.mine.map(e=>e.ruta)))}`:`Tu ruta de ${s}: ${D(o.ruta)}`:`Rutas de ${s} · turno ${e.shift.toLowerCase()}`;let l=`Hola, ${D(ti())}`,u=e.isToday?`${l} · ${e.now.date} · turno ${e.shift.toLowerCase()}`:`${l} · Planificación: no es hoy`,d=[...new Set(t.shown.map(e=>e.supervisor).filter(Boolean))],f=d.length?Br(d):Er[e.shift].supervisor,p=Ki(t.shown)||Vr(e.shift),m=n.filter(e=>e.dog.status!==`Activo`),h=qr(n.map(e=>e.dog)),ee=[];if(t.assigned&&t.shown.length===1){let e=t.shown[0];a?ee.push(`<li>Paseador: <b>${D(ii(e.paseador,i)||`Pendiente de confirmar`)}</b></li>`):ee.push(`<li>Ayudante: ${e.ayudante?`<b>${D(ii(e.ayudante,i))}</b>`:`sin ayudante`}</li>`)}return`
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
      ${E.pickerOpen?Yi(e):``}
      ${t.fromPlanilla?`
        <p class="pw-source pw-source--warn">${g(`alertCircle`,`pw-icon`)}<span><b>Ruta tomada de la planilla, falta que el coordinador la confirme.</b> Horarios de BASE RUTAS (12/11/2026).</span></p>
      `:``}
      ${Ji(e,t)}
      ${Xi(e,n,m,h,r)}
    </section>
  `}function Ji(e,t){let n=[];if(!t.assigned&&t.elsewhere.length){let r=t.elsewhere[0];n.push(`
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
                ${D(e.ruta)}<small>${e.stops.length} ${e.stops.length===1?`perro`:`perros`}${e.paseador?` · ${D(ii(e.paseador))}`:``}</small>
              </button>
            `).join(``)}
            <button type="button" class="pw-chip pw-chip--wide ${t.picked?``:`is-active`}" data-pw-route="" aria-pressed="${!t.picked}">
              Todas<small>${t.ofShift.length} rutas</small>
            </button>
          </div>
          <p class="pw-muted pw-small">Lo que elijas queda recordado en este celular.</p>
        `:``}
      </div>
    `),n.join(``)}function Yi(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
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
              ${t}<small>${Vr(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function Xi(e,t,n,r,i){let a=[],o=t.map(e=>e.dog);r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${Jr(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let s=o.filter(Xr);if(s.length){let e=!ni()&&s.length>$r;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${Br(s.map(e=>e.name))}`,text:e?`Según el inventario tenés ${$r} ${$r===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${Br(n.map(e=>e.dog.name))}`,text:n.length===1?`Figura en la ruta con estado "${D(n[0].dog.status)}". No lo retires sin confirmarlo con el coordinador o con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con el coordinador o con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=Di(e.now.iso,e.shift).checked.length,r=Ei(t,i);n<Zr.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${Zr.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return a.length?`
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
  `:``}function Zi(e,t){if(e.fuente===`dia`){let n=e.record.actualizadoPor?ki(e.record.actualizadoPor,t):``,r=e.record.actualizadoEn?Ai(e.record.actualizadoEn):``;return`Cambio del día${n?` cargado por ${n}`:``}${r?` a las ${r}`:``}.`}return e.fuente===`plantilla`?`Plantilla semanal del coordinador.`:`Planilla RPJ (sin confirmar).`}function Qi(e,t,n){let r=e.stops.filter(e=>e.canSave);if(!e.stops.length)return``;if(!t.isToday){let t=e.stops[0];return`
      <div class="pw-next" data-pw-next="${D(e.ruta)}">
        <p class="pw-next-label">Primer retiro</p>
        <p class="pw-next-main">${D(t.dog.name)}${t.hora?` · ${D(t.hora)}`:``}</p>
      </div>
    `}let i=r.filter(e=>!Ti(n,e).noSale&&Ti(n,e).step===0),a=r.filter(e=>{let t=Ti(n,e);return!t.noSale&&t.step>0&&t.step<T.length}),o,s,c,l;if(i.length)c=i[0].hora,o=i.filter(e=>e.hora===c),s=`Próximo`,l=`retiro`;else if(a.length){let e=[...a].sort((e,t)=>String(e.salida||`99:99`).localeCompare(String(t.salida||`99:99`)));c=e[0].salida,o=e.filter(e=>e.salida===c),s=`Próxima entrega`,l=`entrega`}else return`
      <div class="pw-next pw-next--done" data-pw-next="${D(e.ruta)}">
        <p class="pw-next-label">${D(e.ruta)}</p>
        <p class="pw-next-main">${g(`checkCircle`,`pw-icon pw-icon--lg`)} Ruta completa</p>
      </div>
    `;return`
    <div class="pw-next ${Wr(c,t.now.minutes,l).kind===`late`?`is-late`:``}" data-pw-next="${D(e.ruta)}">
      <p class="pw-next-label">${l===`entrega`?`Todos retirados · próxima entrega prevista`:`Retiro que sigue`}</p>
      <p class="pw-next-main">${s===`Próximo`?`Próximo: `:``}${D(Br(o.map(e=>e.dog.name)))}${c?` · ${D(c)}`:``}</p>
      <p class="pw-next-time">${Gr(c,t.now.minutes,l)}</p>
      <div class="pw-next-actions">
        ${o.map(t=>{let r=Ti(n,t);return`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-from-next="${D(e.ruta)}" data-pw-step="${D(t.dog.id)}" ${O.ready?``:`aria-disabled="true"`}>
              ${O.ready?`${T[r.step].action}${o.length>1?`: ${D(t.dog.name)}`:``}`:`Cargando lo marcado…`}
            </button>
          `}).join(``)}
      </div>
    </div>
  `}function $i(e,t,n,r,i){let a=qr(e.stops.map(e=>e.dog)),o=Ei(e.stops,r),s=o.toWalk?Math.round(o.delivered/o.toWalk*100):100,c=`pw-ruta-${e.ruta.replace(/[^a-z0-9]+/gi,`-`)}`,l=[];return!n.helping&&e.paseador&&!ri(e.paseador)&&l.push(`Paseador: ${ii(e.paseador,i)}`),n.helping&&e.ayudante&&!ri(e.ayudante)&&l.push(`Ayudante: ${ii(e.ayudante,i)}`),!n.assigned&&e.ayudante&&l.push(`Ayudante: ${ii(e.ayudante,i)}`),`
    <section class="pw-section pw-route" aria-labelledby="${c}">
      <div class="pw-section-head">
        <div>
          <h2 id="${c}">Ruta ${D(e.ruta)} <span class="pw-count">${e.stops.length}</span></h2>
          <p class="pw-muted">${D(Zi(e,i))} En orden, con la hora de retiro.${l.length?` ${D(l.join(` · `))}.`:``}</p>
          ${e.notas?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${D(e.notas)}</p>`:``}
        </div>
        ${t.isToday&&e.stops.length?`
          <div class="pw-progress" aria-label="Avance de la ruta ${D(e.ruta)}">
            <strong>${o.delivered} de ${o.toWalk} entregados${o.noSale?` · ${o.noSale} no ${o.noSale===1?`sale`:`salen`}`:``}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${s}%"></span></span>
          </div>
        `:``}
      </div>

      ${Qi(e,t,r)}

      ${a.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${g(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en esta ruta</strong>
            <ul>${Jr(a).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${D(e.supervisor||Er[t.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      `:``}

      ${!t.isToday&&e.stops.length?`
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      `:``}

      ${e.stops.length?`
        <ol class="pw-dogs" role="list">
          ${e.stops.map((n,o)=>ta({...n,route:e},o,t,Ti(r,n),Yr(n.dog,a),i)).join(``)}
        </ol>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros en ${D(e.ruta)} para este turno.</strong></p>
          <p>Si te pidieron un paseo, confirmalo con el coordinador.</p>
        </div>
      `}
      <p class="pw-muted pw-legend">
        Categoría operativa: <b>SIN EVALUAR</b> salvo que se indique otra. ${D(Vt[`SIN EVALUAR`])}
        Fuente: Registro maestro, 14/08/2026.
      </p>
    </section>
  `}function ea(e){return!e.nota||/^bozal$/i.test(e.nota)&&Xr(e.dog)||/^no juntar/i.test(e.nota)&&e.dog.safety.some(e=>Kr(e)===`danger`)?``:e.nota}function ta(e,t,n,r,i,a){let{dog:o}=e,{times:s,noSale:c,record:l}=r,u=Math.min(r.step,T.length),d=!c&&u>=T.length,f=ji(l,a),p=o.safety.filter(e=>Kr(e)===`danger`).join(` `),m=i.filter(e=>!p.includes(e)),h=o.safety.filter(e=>Kr(e)!==`info`),ee=o.safety.filter(e=>Kr(e)===`info`),te=o.status!==`Activo`,ne=h.length||i.length||te,re=ea(e),ie=e.minutos||o.minutes,ae=n.isToday&&e.canSave,oe=``;return n.isToday&&!c&&!d&&e.canSave&&(oe=u===0?Gr(e.hora,n.now.minutes,`retiro`):e.salida?Gr(e.salida,n.now.minutes,`entrega`):``),`
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
            <li class="pw-alert pw-alert--${Kr(e)}">
              ${g(Kr(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${D(e)}${Kr(e)===`danger`&&i.length?`<b class="pw-today-tag">En esta ruta: ${Br(i)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${m.length?`
            <li class="pw-alert pw-alert--danger">
              ${g(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${Br(m)}<b class="pw-today-tag">En esta ruta</b></span>
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
            ${T.map((e,t)=>{let n=t<u?Mi(l,t,a):``;return`
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
  `}function na(e,t,n){let{checked:r,record:i}=Di(e.now.iso,e.shift),a=r.length>=Zr.length,o=ji(i,n),s=t.helping?ii(t.helping.paseador,n):``;return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">${ni()?`Tu checklist, hoy turno ${e.shift.toLowerCase()}. El inventario no asigna equipo al ayudante (${b.toLowerCase()}): revisá${s?` con ${D(s)}`:``} que esté todo lo del paseador.`:`Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.`}</p>
        </div>
        <span class="pw-count ${a?`is-ok`:``}">${r.length}/${Zr.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${Zr.map(e=>{let t=r.includes(e.item),n=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
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
      ${Qr.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${Qr.map(e=>`${D(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function ra(e,t){let n=Bi(),r=[...t.map(e=>e.name),kr];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=E.previewOpen?sa(n,e):null;return`
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
          ${Wt.map((e,t)=>{let r=`pw-proto-${t}`;return`
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
          ${Dr.map(e=>`
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
          ${Or.map((e,t)=>`
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

      ${i&&i.ok?ia(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function ia(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${D(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${aa(e)}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${g(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function aa(e){return`https://wa.me/${Ft.whatsapp}?text=${encodeURIComponent(e)}`}function oa(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(Ar)?.[0]}}function sa(e,t){let{missing:n,word:r}=oa(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=Rr(t.now),a=la(),o=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,s=ca(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,ni()?`Ayudante de paseador: ${ti()}${a.paseador?` (con ${a.paseador})`:``}`:`Paseador: ${ti()}`,`Ruta: ${a.rutas||`Pendiente de confirmar`}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,o(`Lesiones`,e.lesiones),o(`Lugar`,e.lugar),``,o(`Antes`,e.antes),o(`Conducta observada`,e.conducta),o(`Qué hice`,e.accion),o(`Después`,e.despues),``,`Protocolo:`,...s].join(`
`)}}function ca(e){return Wt.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function la(){let e=zr(),t=fi({...e,day:e.now.day,iso:e.now.iso,isToday:!0,shift:Rr(e.now)}),n=Oi(e.now.iso);return{rutas:t.shown.map(e=>e.ruta).join(`, `),paseador:t.helping?ii(t.helping.paseador,n):``}}function ua(e,t){let n=e.dogs.map(e=>C.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:ca(e),ruta:la().rutas,titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function da(e,t=!1){E.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),k(e)}function fa(e,t){if(E.incidentSavedText===t)return Promise.resolve(null);E.incidentSavedText=t;let n=zr();return Pi(`incidentes`,()=>ua({...e,registroId:Bi().registroId||e.registroId},n)).then(e=>{if(!e)return E.incidentSavedText=``,null;let t=Mr(br,null);return t&&Nr(br,{...t,registroId:e.id}),da(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function pa(){let e=Bi(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function ma(){let e=pa();return Nr(br,e),e}function ha(e){if(!E.previewOpen)return;let t=sa(e,zr()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),E.previewOpen=!1,E.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=E.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=aa(t.text))}function k(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function ga(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var _a=[`data-pw-from-next`,`data-pw-route`,`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function va(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=_a.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]${t===`data-pw-step`?`:not([data-pw-from-next])`:``}`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function ya(){let e=document.activeElement,t=va(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var ba=0;function xa(){clearTimeout(ba),ba=setTimeout(()=>{document.querySelector(`.pw-shell`)&&ya()},80)}function A(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function Sa(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function Ca(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:Sa(),block:`start`}),t.focus({preventScroll:!0}))}async function wa(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function Ta(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return Rm(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return E.syncError=``,A(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return Ca(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return E.pickerOpen=!E.pickerOpen,A(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=Fr(),t=n.dataset.pwDay;return E.day=t===e.day?null:t,A(`[data-pw-day="${t}"]`),k(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return E.shift=r.dataset.pwShift,A(`[data-pw-shift="${E.shift}"]`),k(`Mostrando el turno ${E.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return E.day=null,E.shift=null,E.pickerOpen=!1,A(`#pw-today-title`),k(`Mostrando hoy.`),!0;if(e.target.closest(`[data-pw-change-ok]`))return E.routeChange=null,A(`#pw-today-title`),!0;let i=e.target.closest(`[data-pw-route]`);if(i){let e=zr(),t=i.dataset.pwRoute;return di(e,t),A(`[data-pw-route="${CSS.escape(t)}"]`),k(t?`Mostrando la ruta ${t}. Queda recordada en este celular.`:`Mostrando todas las rutas del turno.`),!0}let a=e.target.closest(`[data-pw-step]`);if(a){let e=a.dataset.pwStep,t=a.dataset.pwFromNext,n=zr(),r=mi(n,e);if(!n.isToday||!r?.canSave||!O.ready)return!0;let i=r.dog,o=wi(n.now.iso,n.shift,[i])[e];if(o.noSale||o.step>=T.length)return!0;let s=T[o.step],c=ei(),l={estado:s.estado};if(T.forEach((e,t)=>{t>=o.step||(l[e.field]=o.times[t],o.record?.[`${e.field}Por`]&&(l[`${e.field}Por`]=o.record[`${e.field}Por`],l[`${e.field}PorNombre`]=o.record[`${e.field}PorNombre`]||``))}),l[s.field]=n.now.time,l[`${s.field}Por`]=c.usuario||``,l[`${s.field}PorNombre`]=c.nombre||``,Fi(r,n,l,`${i.name}: ${s.done.toLowerCase()} a las ${n.now.time}.`),t){$();let e=document.querySelector(`[data-pw-from-next="${CSS.escape(t)}"]`)||document.querySelector(`[data-pw-next="${CSS.escape(t)}"]`)?.closest(`section`)?.querySelector(`h2`);e&&!e.hasAttribute(`tabindex`)&&e.tagName===`H2`&&e.setAttribute(`tabindex`,`-1`),e?.focus({preventScroll:!0})}else A(o.step+1>=T.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`);return!0}let o=e.target.closest(`[data-pw-nosale]`);if(o){let e=o.dataset.pwNosale,t=zr(),n=mi(t,e);return t.isToday&&n?.canSave&&O.ready&&(Fi(n,t,{estado:Cr},`${n.dog.name}: no sale en este turno.`),A(`[data-pw-undo="${CSS.escape(e)}"]`)),!0}let s=e.target.closest(`[data-pw-undo]`);if(s){let e=s.dataset.pwUndo,t=zr(),n=mi(t,e);if(!t.isToday||!n?.canSave||!O.ready)return!0;let r=n.dog,i=wi(t.now.iso,t.shift,[r])[e];if(i.noSale){let a=i.times.reduce((e,t,n)=>t?n+1:e,0);return Fi(n,t,{estado:a?T[a-1].estado:`pendiente`},`${r.name}: se deshizo "no sale".`),A(a>=T.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(!i.step)return!0;let a=i.step-1,o={estado:a?T[a-1].estado:`pendiente`};return T.forEach((e,t)=>{o[e.field]=t<a?i.times[t]:``,t>=a&&(o[`${e.field}Por`]=``,o[`${e.field}PorNombre`]=``)}),Fi(n,t,o,`${r.name}: se deshizo "${T[a].done.toLowerCase()}".`),A(`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(e.target.closest(`[data-pw-equip-all]`))return Ii(zr(),Zr.map(e=>e.item)),E.equipStatus=`Equipo completo. ¡A salir!`,A(`[data-pw-equip-reset]`),k(E.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return Ii(zr(),[]),E.equipStatus=`Lista de equipo desmarcada.`,A(`[data-pw-equip-all]`),k(E.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=ma(),t=sa(e,zr());return E.confirmClear=!1,t.ok?(E.previewOpen=!0,E.incidentStatus=E.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,A(`[data-pw-message]`),k(E.incidentStatus),fa(e,t.text),!0):(E.previewOpen=!1,E.incidentStatus=t.missing.length?`Falta completar: ${Br(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,A(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),k(E.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=Bi(),t=sa(e,zr());return t.ok&&fa(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=Bi(),n=sa(t,zr());return n.ok&&fa(t,n.text),wa(e).then(e=>{E.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=E.incidentStatus,t.classList.toggle(`is-warn`,!e)),k(E.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!E.confirmClear)return E.confirmClear=!0,A(`[data-pw-clear]`),!0;let e=!!Bi().registroId;try{localStorage.removeItem(br)}catch{}return E.confirmClear=!1,E.previewOpen=!1,E.incidentSavedText=``,E.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,A(`#pw-incidente`),k(E.incidentStatus),!0}if(E.confirmClear&&!e.target.closest(`[data-pw-clear]`)){E.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=Bi().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function Ea(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=zr(),{checked:n}=Di(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return Ii(e,i),E.equipStatus=i.length>=Zr.length?`Equipo completo. ¡A salir!`:``,A(`[data-pw-equip="${CSS.escape(r)}"]`),E.equipStatus&&k(E.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(ha(ma()),!0):!1}function Da(e){e.target.closest?.(`[data-pw-field]`)&&ha(ma())}function Oa(){_e.push(Ta),ve.push(Ea),document.addEventListener(`input`,Da),$e(e=>{[`paseos`,`checklists`,`incidentes`,`rutas`,`plantillas`,`avisos`].includes(e)&&xa()}),window.addEventListener(`online`,xa),window.addEventListener(`offline`,xa),setInterval(Aa,15e3)}var ka={iso:``,shift:``,minute:-1};function Aa(){if(!document.querySelector(`.pw-shell`))return;let e=Fr();e.iso!==ka.iso||Rr(e)!==ka.shift?xa():e.minutes!==ka.minute&&(ka.minute=e.minutes,document.querySelectorAll(`[data-pw-countdown]`).forEach(t=>{let n=Wr(t.dataset.pwCountdown,e.minutes,t.dataset.pwMode);t.textContent=n.text,t.className=`pw-cd pw-cd--${n.kind}`,t.closest(`.pw-next`)?.classList.toggle(`is-late`,n.kind===`late`)}))}var ja=`America/Argentina/Buenos_Aires`,Ma=[`manana`,`tarde`],Na=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,Pa=/(\d[\s.-]?){8,}/,Fa=10,Ia=15,La=[`paseos`,`checklists`,`incidentes`,`plantillas`,`rutas`,`avisos`,`solicitudes`,`observaciones`,`cierres`],Ra=7,za={admin:`Admin`,supervisor:`Supervisor`,coordinador:`Coordinación`,paseador:`Paseador`,ayudante:`Ayudante de paseador`},Ba=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],Va=[`no sale`,`agregar perro`,`cambiar hora`,`cambiar paseador o ayudante`,`otro`],Ha={pendiente:{label:`Pendiente`,tone:`warn`},aplicado:{label:`Aplicado`,tone:`ok`},rechazado:{label:`Rechazado`,tone:`danger`}},Ua=$t(),j={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,observationDraft:`paseosJuanSupervisor_observacionBorrador`,avisoDraft:`paseosJuanSupervisor_avisoBorrador`,requestDraft:`paseosJuanSupervisor_pedidoBorrador`},Wa={observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},Ga=null,Ka=null,qa=null,Ja=new Map,Ya=new Set,Xa=new Set,Za=new Map,Qa=new Map,$a=new Set,eo=new Map,to=new Set,no=new Map,ro=!1,io=!1,ao=null,oo=``,so=`idle`;function M(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function co(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function N(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function lo(e){try{localStorage.removeItem(e)}catch{}}var uo=8e3;function P(e,t,n=`ok`){Ga={area:e,text:t,tone:n,at:Date.now()}}function fo(e){return Ga&&Date.now()-Ga.at>uo&&(Ga=null),Ga&&Ga.area===e?Ga:null}function po(e){let t=fo(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?M(t.text):``}</p>
  `}function mo(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function ho(e,t,n){return`${e} ${e===1?t:n}`}function go(e){let t=String(e||``).match(/^(\d{1,2}):(\d{2})/);return t?Number(t[1])*60+Number(t[2]):null}function _o(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function vo(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function yo(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:ja,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:S[(n+6)%7]}}function bo(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function xo(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:b}function So(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function Co(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:ja,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function wo(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:y(t)}function To(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function Eo(e){return e.minutes<810?`manana`:`tarde`}function Do(e){let t=vo(e);return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function Oo(e,t){let n=x[e];return t.minutes<go(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=go(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function ko(){return _.user()||{}}function Ao(e){let t=ko();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function jo(e,t){if(!e)return``;if(t?.actualizadoPor===e&&t.actualizadoPorNombre)return t.actualizadoPorNombre;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=ko();if(n.usuario===e&&n.nombre)return n.nombre;let r=It.find(t=>t.id===e);if(r)return r.name;for(let t of[`checklists`,`paseos`,`incidentes`])for(let n of Fo(t)){if(n.creadoPor===e&&n.creadoPorNombre)return n.creadoPorNombre;if(n.actualizadoPor===e&&n.actualizadoPorNombre)return n.actualizadoPorNombre}return e}function Mo(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=jo(e.actualizadoPor||e.creadoPor,e),r=Co(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function No(e){let t=y();return e===`plantillas`||e===`avisos`?{}:e===`observaciones`?{desde:bo(t,-6)}:e===`solicitudes`?{desde:bo(t,-2)}:{desde:t}}function Po(){_.token()&&La.forEach(e=>{let t=No(e),n=`${e}|${t.desde||``}`;to.has(n)||(to.add(n),e===`solicitudes`&&Ko(),v.watch(e,t),v.list(e,t).then(()=>{$a.add(e),eo.delete(e)}).catch(t=>{$a.add(e),eo.set(e,t?.message||`No se pudieron traer los datos.`)}).finally(Wo))})}function Fo(e){let t=new Map(v.cached(e,No(e)).map(e=>[e.id,e]));return Za.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function Io(e,t,n,r,i=`ok`){if(!t.id)return Lo(e,t,n,r,i);let a=`${e}:${t.id}`,o=(Qa.get(a)||Promise.resolve()).then(()=>Lo(e,t,n,r,i));return Qa.set(a,o),o.then(()=>{Qa.get(a)===o&&Qa.delete(a)}),o}async function Lo(e,t,n,r,i){try{let a=await v.save(e,t);if(a.pendiente)P(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=Za.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&Za.set(t,a),P(n,r,i)}return a}catch(e){return P(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function Ro(e,t,n,r){try{return await v.remove(e,t),Za.delete(`${e}:${t}`),P(n,r,`info`),!0}catch(e){return P(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function zo(e=!0){if(!_.token())return;let t=await Promise.allSettled(La.map(e=>v.list(e,No(e))));if(t.forEach((e,t)=>{$a.add(La[t]),e.status===`rejected`?eo.set(La[t],e.reason?.message||`No se pudieron traer los datos.`):eo.delete(La[t])}),!e)return;let n=t.find(e=>e.status===`rejected`);n?P(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?P(`sync`,`Datos actualizados a las ${yo().time} hs.`):P(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),F(`sv-refresh`)}function Bo(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function Vo(){ao=null,Bo()&&document.querySelector(`.sv-shell`)&&Uo()}function Ho(){let e=co(j.folds,{}),t=!1;document.querySelectorAll(`.sv-shell [data-sv-fold]`).forEach(n=>{e[n.dataset.svFold]!==n.open&&(e[n.dataset.svFold]=n.open,t=!0)}),t&&N(j.folds,e),document.querySelectorAll(`.sv-shell [data-sv-stop-more]`).forEach(e=>{e.open?Ya.add(e.dataset.svStopMore):Ya.delete(e.dataset.svStopMore)})}function Uo(){Ho();let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>2&&window.scrollTo(0,r),!t)return;let i=document.getElementById(t);if(i&&(i.focus({preventScroll:!0}),n&&typeof i.setSelectionRange==`function`))try{i.setSelectionRange(n[0],n[1])}catch{}}function Wo(){ao||=setTimeout(Vo,40)}function Go(){Bo()&&document.querySelector(`.sv-shell`)&&yo().time!==oo&&document.activeElement?.tagName!==`SELECT`&&Uo()}function Ko(){ro||=(Fo(`solicitudes`).forEach(e=>no.set(e.id,e.estado||`pendiente`)),!0)}function qo(){let e=ko().usuario,t=[];if(Fo(`solicitudes`).forEach(n=>{let r=n.estado||`pendiente`,i=no.get(n.id);ro&&i&&i!==r&&r!==`pendiente`&&n.creadoPor===e&&t.push(n),no.set(n.id,r)}),!t.length)return;let n=t.filter(e=>e.estado===`aplicado`);P(`requests`,`El coordinador ${t.map(e=>`${e.estado===`aplicado`?`aplicó`:`rechazó`} «${ws(e)}»${e.respuesta?`: ${e.respuesta}`:``}`).join(` · `)}.${n.length?` La ruta ya muestra el cambio.`:``}`,n.length?`ok`:`info`),n.length&&(v.list(`rutas`,No(`rutas`)).catch(()=>{}),v.list(`plantillas`,No(`plantillas`)).catch(()=>{}))}function Jo(){io||(io=!0,$e(e=>{La.includes(e)&&($a.add(e),e===`solicitudes`&&qo(),Wo())}),window.addEventListener(`online`,Wo),window.addEventListener(`offline`,Wo),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Bo()&&zo(!1)}),setInterval(Go,1e4))}function Yo(){try{return Object.values(Wa).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function Xo(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=ns(e.dogId),n=So(e.fecha)||wo(To(e.id))||y();return{id:_o(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:x[e.shift]?.label||``,titulo:`Observación: ${t?t.name:b}`,autorAnterior:e.autor||``,migrado:!0}}async function Zo(e,t){try{return await v.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function Qo(){if(so!==`idle`||!_.token()||!Yo()||!navigator.onLine)return;so=`running`;let e=0,t=0,n=``,r=co(Wa.observations,[]),i=[];for(let a of r){let r=Xo(a);if(!r)continue;let o=await Zo(`observaciones`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?N(Wa.observations,i):lo(Wa.observations);let a=co(Wa.closure,{}),o=Object.entries(a).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&Ma.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(o.length){let r=o.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await v.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,s]of o){let[o,c]=a.split(`|`),l=`${o}_${c}`;if(i.has(l))continue;let u=await Zo(`cierres`,{id:l,fecha:o,turno:x[c].label,notas:String(s.notas||``),resumen:``,cerrado:!!s.cerrado,horaCierre:s.cerrado?String(s.cerrado):``,migrado:!0});u?(r[a]=s,t+=1,n=u):e+=1}Object.keys(r).length?N(Wa.closure,r):lo(Wa.closure)}else t+=o.length}else lo(Wa.closure);so=`done`,(e||t)&&P(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),Wo()}function $o(){let e=yo(),t=co(j.view,{}),n=Eo(e),r=t.date===e.iso&&Ma.includes(t.shift)?t.shift:n;return{day:e.dayName,shift:r,now:e,isToday:!0,isCurrent:r===n,fecha:e.iso,fechaLabel:e.label}}function es(e){N(j.view,{date:yo().iso,shift:e})}function ts(e,t=!1){let n=co(j.folds,{});return typeof n[e]==`boolean`?n[e]:t}function ns(e){return C.find(t=>t.id===e)}function rs(e){let t=vo(e);return C.find(e=>vo(e.name)===t)}function is(e){return(e?.safety||[]).some(e=>/bozal/i.test(e))}function as(e){return(e?.safety||[]).find(e=>/bozal/i.test(e))||``}function os(e,t){return vo(e)===vo(t)}function ss(e){let t=e.perroId&&ns(e.perroId)||e.perroNombre&&rs(e.perroNombre)||null,n=Number(e.minutos)||t?.minutes||null;return{perroId:t?.id||e.perroId||``,perroNombre:e.perroNombre||t?.name||`Pendiente de confirmar`,hora:go(e.hora)===null?``:String(e.hora).slice(0,5),minutos:n,nota:e.nota||``,dog:t}}function cs(e,t){let n=Array.isArray(e.paradas)?e.paradas:Array.isArray(e.perros)?e.perros.map(e=>({perroId:e,perroNombre:ns(e)?.name||e,hora:``})):[];return{code:e.ruta||e.id||`Pendiente de confirmar`,source:t,record:e,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,stops:n.map(ss)}}function ls(e){let t=new Map;Fo(`plantillas`).filter(t=>os(t.dia,e.day)&&Do(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,cs(e,`plantilla`))),Fo(`rutas`).filter(t=>t.fecha===e.fecha&&Do(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,cs(e,`dia`)));let n=!($a.has(`plantillas`)&&$a.has(`rutas`)),r=!1;return t.size||(Ua.filter(t=>os(t.dia,e.day)&&Do(t.turno)===e.shift).forEach(e=>t.set(e.ruta,cs(e,`planilla`))),r=t.size>0),{routes:[...t.values()].sort((e,t)=>e.code.localeCompare(t.code)),fallback:r,loading:n}}function us(e){return e.source===`dia`?`Cambio del día (coordinador)`:e.source===`plantilla`?`Plantilla semanal (coordinador)`:`Planilla RPJ (respaldo)`}function ds(e){let t=new Map;return e.forEach(e=>e.stops.forEach(e=>{e.dog&&!t.has(e.dog.id)&&t.set(e.dog.id,e.dog)})),[...t.values()]}function fs(e,t,n){return`${e}_${t}_${n}`}function ps(){return new Map(Fo(`paseos`).map(e=>[e.id,e]))}function ms(e,t,n){let r=t?.estado||`pendiente`,i=go(e.hora),a=Number(e.minutos)||null,o=go(t?.horaRetiro),s=[`retirado`,`paseando`,`entregado`].includes(r),c=o??i,l=s&&o!==null&&i!==null?o-i:0,u=l>Fa,d={estado:r,retirado:s,record:t,pickupDelay:l,pickupLate:u,planned:i,minutos:a};if(r===`no-sale`)return{...d,kind:`nosale`,label:`No sale`,tone:`neutral`,live:`nosale`};if(r===`entregado`){let e=go(t?.horaEntrega),n=e!==null&&c!==null?e-c:null,r=n!==null&&a?n>a+Ia:!1;return{...d,kind:`entregado`,label:`Entregado${t?.horaEntrega?` ${t.horaEntrega}`:``}`,tone:`ok`,live:`entregado`,duration:n,deliveryLate:r,late:u||r}}if(s){let e=c===null?null:n-c;if(e!==null&&a&&e>a+Ia)return{...d,kind:`demorada`,label:`Entrega demorada ${e-a} min`,tone:`danger`,live:`atrasado`,walked:e,late:!0};let i=r===`paseando`?`Paseando`:`Retirado${t?.horaRetiro?` ${t.horaRetiro}`:``}`;return{...d,kind:`curso`,label:i,tone:`info`,live:`atiempo`,walked:e,late:u}}if(i===null)return{...d,kind:`sinhora`,label:`Hora sin confirmar`,tone:`neutral`,live:`atiempo`};let f=n-i;return f>Fa?{...d,kind:`atrasado`,label:`Atrasado ${f} min`,tone:`danger`,live:`atrasado`,delay:f,late:!0}:f>=0?{...d,kind:`ahora`,label:`Retirar ahora`,tone:`warn`,live:`atiempo`,delay:f}:{...d,kind:`espera`,label:`Retira ${e.hora}`,tone:`neutral`,live:`atiempo`}}function hs(e,t,n=ps()){return t.stops.map(t=>{let r=t.perroId?fs(e.fecha,t.perroId,e.shift):``;return{stop:t,id:r,status:ms(t,r?n.get(r):null,e.now.minutes)}})}function gs(e){let t={atiempo:0,atrasado:0,entregado:0,nosale:0};return e.forEach(({status:e})=>{t[e.live]+=1}),t}function _s(e,t){return Fo(`checklists`).filter(n=>n.fecha===e&&(Do(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function vs(e,t,n){return n&&_s(e,t).find(r=>r.id===`${e}_${n}_${t}`||r.creadoPor===n)||null}function ys(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>bs(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:jo(e.creadoPor||e.actualizadoPor,e),at:Co(e.actualizadoEn||e.creadoEn)}}function bs(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):b}function xs(e){return Fo(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function Ss(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>ns(e)?.name||e);return t.length?mo(t):b}function Cs(e){return Fo(`avisos`).filter(t=>(t.vigenteHasta?t.vigenteHasta>=e:t.fecha===e)&&(!t.fecha||t.fecha<=e)).sort((e,t)=>Number(t.tipo===`seguridad`)-Number(e.tipo===`seguridad`)||String(t.fecha||``).localeCompare(String(e.fecha||``)))}function ws(e){return`${e.tipo||`Cambio`}${e.perroNombre?` · ${e.perroNombre}`:``}${e.ruta?` · ${e.ruta}`:``}`}function Ts(e,t){return Fo(`solicitudes`).filter(n=>n.fecha===e&&Do(n.turno)===t)}function Es(e){let t=ko().usuario;return Fo(`solicitudes`).filter(n=>(n.creadoPor?n.creadoPor===t:n.pendiente)&&(n.fecha>=e||(n.estado||`pendiente`)===`pendiente`)).sort((e,t)=>String(t.creadoEn||`9`).localeCompare(String(e.creadoEn||`9`)))}function Ds(e,t=``,n=``,r=!1){let i=n?ns(n):null;return{fecha:e.fecha,shift:e.shift,ruta:t,perroId:i?.id||``,perroNombre:i?.name||``,tipo:i?`no sale`:`otro`,detalle:``,motivo:``,urgente:!1,open:r}}function Os(e){let t=co(j.requestDraft,{});return t.fecha!==e.fecha||t.shift!==e.shift?Ds(e):{...Ds(e),...t}}function ks(e){let t=new Set,n=[];return e.forEach(r=>{let i=new Set(r.stops.map(e=>e.dog?.name).filter(Boolean));r.stops.forEach(({dog:a})=>{(a?.incompatibleWith||[]).forEach(o=>{let s=[a.name,o].sort().join(`|`);if(t.has(s))return;let c=i.has(o)?r:e.find(e=>e.stops.some(e=>e.dog?.name===o));c&&(t.add(s),n.push({a:a.name,b:o,sameRoute:c===r,route:r.code,otherRoute:c.code}))})})}),n.sort((e,t)=>Number(t.sameRoute)-Number(e.sameRoute))}function As(e){let t=ds(e),n=ks(e),r=t.filter(is),i=t.filter(e=>e.status!==`Activo`),a=t.filter(e=>e.review&&e.status===`Activo`),o=t.filter(e=>e.category===`SIN EVALUAR`),s=e.flatMap(e=>e.stops.filter(e=>!e.dog).map(t=>`${t.perroNombre} (${e.code})`)),c=[];return n.length&&c.push({tone:`danger`,icon:`alertTriangle`,title:n.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${n.length} parejas que no pueden ir juntas`,lines:n.map(e=>`No juntar: ${e.a} con ${e.b}${e.sameRoute?` (los dos en ${e.route})`:` (${e.route} y ${e.otherRoute}: que no se crucen)`}.`),action:n.some(e=>e.sameRoute)?`Que no caminen juntos. Si la ruta los junta, pedile el cambio al coordinador.`:`Que los paseadores no se crucen con esos perros.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),r.length&&c.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${ho(r.length,`perro`,`perros`)}`,lines:r.map(e=>`${e.name}: ${as(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),i.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${i.length===1?`sale ${i[0].name}`:`salen ${i.length} perros`}`,lines:i.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),s.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`${ho(s.length,`perro de la ruta no tiene`,`perros de la ruta no tienen`)} ficha`,lines:s.map(e=>`${e}: ${b}.`),action:`No se puede marcar el retiro desde acá. Pedile al coordinador que lo revise.`,source:`Fuente: rutas del coordinador y registro de perros.`}),a.length&&c.push({tone:`info`,icon:`fileText`,title:`${ho(a.length,`perro tiene`,`perros tienen`)} datos a revisar`,lines:a.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${Pt}.`}),o.length>1&&c.push({tone:`info`,icon:`eye`,title:`${o.length} perros salen en grupo SIN EVALUAR`,lines:[`${Vt[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),c}var js=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function Ms(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function Ns(e){return{...Ms(e),...co(j.observationDraft,{})}}function Ps(){let e=No(`observaciones`).desde;return Fo(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function Fs(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${ko().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function Is(e){return[`Observación de conducta — ${Ft.name}`,`Perro: ${e.perroNombre||ns(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${xo(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${Fs(e)}`].join(`
`)}function Ls(e){return`${e.fecha}_${e.shift}`}function Rs(e){return Fo(`cierres`).find(t=>t.id===Ls(e))||null}function zs(e){return qa&&qa.id===Ls(e)?qa.notas:Rs(e)?.notas||``}function Bs(e,t){return e?jo(e,t):``}function Vs(e,t){let n=ps(),r=t.flatMap(t=>hs(e,t,n).map(e=>({...e,route:t}))),i=r.filter(e=>e.status.kind!==`nosale`);return{items:r,going:i,late:i.filter(e=>e.status.late),onTime:i.filter(e=>!e.status.late),noSale:r.filter(e=>e.status.kind===`nosale`),delivered:i.filter(e=>e.status.kind===`entregado`),notPicked:i.filter(e=>!e.status.retirado),notDelivered:i.filter(e=>e.status.retirado&&e.status.kind!==`entregado`)}}function Hs(e){let{stop:t,status:n}=e,r=[];return n.kind===`atrasado`&&r.push(`sin retiro, previsto ${t.hora} (${n.delay} min)`),n.pickupLate&&r.push(`retiro previsto ${t.hora}, retirado ${n.record?.horaRetiro} (+${n.pickupDelay} min)`),n.kind===`demorada`&&r.push(`entrega demorada: ${n.walked} min de ${n.minutos} previstos`),n.deliveryLate&&r.push(`entrega demorada: ${n.duration} min de ${n.minutos} previstos`),`${t.perroNombre} (${r.join(`; `)||`con atraso`})`}function Us(e,t){let n=x[e.shift],{routes:r,fallback:i}=ls(e),a=Vs(e,r),o=t||Rs(e),s=ks(r),c=ds(r).filter(is),l=Ps().filter(t=>t.fecha===e.fecha&&Do(t.turno)===e.shift),u=xs(e.fecha),d=Ts(e.fecha,e.shift),f=zs(e),p=ko(),m=Ws(e,r),h=e=>e.length?e.map(e=>e.stop.perroNombre).join(`, `):`ninguno`,ee=[`Cierre de turno — ${Ft.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisó: ${p.nombre||`Pendiente de confirmar`}`,`Rutas${i?` (tomadas de la planilla RPJ)`:``}:`,...r.map(e=>`- ${e.code}: paseador ${Bs(e.paseador)||`Pendiente de confirmar`}${e.ayudante?`, ayudante ${Bs(e.ayudante)}`:``} · ${ho(e.stops.length,`perro`,`perros`)}`),`Cumplimiento: ${a.onTime.length} a tiempo · ${a.late.length} con atraso · ${a.noSale.length} no salieron (de ${a.items.length} previstos)`,`- Con atraso: ${a.late.length?a.late.map(Hs).join(`; `):`ninguno`}`,`- No salieron: ${h(a.noSale)}`,`- Sin retiro marcado: ${h(a.notPicked)}`,`- Sin entrega marcada: ${h(a.notDelivered)}`,`Entregados: ${a.delivered.length} de ${a.going.length}`,`Checklist del equipo: ${m.length?m.map(e=>`${e.name}: ${e.checklist?ys(e.checklist).complete?`equipo completo`:`incompleto${ys(e.checklist).missing.length?` (falta ${ys(e.checklist).missing.join(`, `)})`:``}`:`sin cargar`}`).join(`; `):`sin equipo asignado`}`,`Incidentes del día: ${u.length?u.map(e=>`${e.hora||`sin hora`} ${e.titulo||Ss(e)}`).join(`; `):`ninguno cargado`}`,`Pedidos de cambio al coordinador: ${d.length?d.map(e=>`${ws(e)} (${Ha[e.estado]?.label||`Pendiente`})`).join(`; `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${s.length?s.map(e=>`${e.a} con ${e.b}`).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${c.length?c.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${l.length}`,`Notas del supervisor: ${f.trim()||`sin notas`}`];return o?.cerrado&&ee.push(`Turno cerrado a las ${o.horaCierre||Co(o.actualizadoEn)||`Pendiente de confirmar`} hs por ${jo(o.actualizadoPor,o)||`Pendiente de confirmar`}.`),ee.join(`
`)}function Ws(e,t){let n=new Map,r=(e,t,r)=>{if(!e)return;let i=n.get(e)||{usuario:e,name:jo(e),roles:[]};i.roles.push(`${t} ${r}`),n.set(e,i)};return t.forEach(e=>{r(e.paseador,`Paseador`,e.code),r(e.ayudante,`Ayudante`,e.code)}),_s(e.fecha,e.shift).forEach(e=>{let t=e.creadoPor||String(e.id).split(`_`)[1];t&&!n.has(t)&&n.set(t,{usuario:t,name:jo(t,e),roles:[`Sin ruta asignada`]})}),[...n.values()].map(t=>({...t,checklist:vs(e.fecha,e.shift,t.usuario)}))}function Gs(e){return`
    <div class="sv-shell">
      ${Ks()}
      ${e}
    </div>
  `}function Ks(){let e=ko();return`
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
          <small>${M(za[e.rol]||e.rol||``)}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${g(`logOut`,`sv-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function qs(){Po();let e=$o();oo=e.now.time;let t=ls(e),n=`
    <main class="sv-main" id="sv-main">
      ${Js()}
      ${Ys(e)}
      ${Zs(e,t)}
      ${$s(e)}
      ${ec(e,t.routes)}
      ${ic(e,t)}
      ${uc(e)}
      ${dc(e,ds(t.routes))}
      ${pc(e)}
      ${mc()}
    </main>
  `;return so===`idle`&&Yo()&&setTimeout(Qo,0),n}function Js(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=[...new Set(eo.values())],r=t||e||n.length?`warn`:`ok`,i=`${e} cambio${e===1?` espera`:`s esperan`} señal para enviarse.`,a=t?`Sin señal: ves lo último guardado en este teléfono.${e?` ${i}`:``}`:e?i:n.length?`No se pudieron traer algunos datos: ${n.join(` `)}`:`Datos compartidos con el equipo. Se actualizan solos.`;return`
    <section class="sv-sync is-${r}" aria-label="Estado de los datos">
      <p class="sv-sync-text" aria-live="polite">${g(r===`ok`?`radio`:`uploadCloud`,`sv-icon`)} <span>${M(a)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${po(`sync`)}
    </section>
  `}function Ys(e){let t=xs(e.fecha);return t.length?`
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
              <span>${e.hora?`${M(e.hora)} hs · `:``}${M(Ss(e))}${e.lugar?` · ${M(e.lugar)}`:``}${e.barrio?` · ${M(e.barrio)}`:``}</span>
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
            <p class="sv-source">${M(Mo(e,`Cargó`))}</p>
          </li>
        `).join(``)}
      </ul>
    </section>
  `:``}function Xs(e,t){let n=Ws(e,t),r=e.now.minutes>=go(x[e.shift].from);return n.length?`
    <div class="sv-team">
      <h2 class="sv-subtitle">Equipo del turno: checklist de salida</h2>
      <ul class="sv-team-list">
        ${n.map(e=>{let t=e.checklist?ys(e.checklist):null,n=t?e.checklist.pendiente?`info`:t.complete?`ok`:`danger`:r?`warn`:`info`,i=t?t.complete?`Salió con el equipo completo.`:`Equipo incompleto${t.missing.length?`. Falta: ${t.missing.join(`, `)}`:``}.`:`Todavía no cargó el checklist.`;return`
            <li class="sv-note is-${n}">
              ${g(t?.complete?`checkCircle`:`alertTriangle`,`sv-icon`)}
              <strong>${M(e.name)}</strong> <small>(${M(e.roles.join(`, `))})</small>:
              ${M(i)} ${t?.at?`<small>${M(t.at)} hs</small>`:``}
            </li>
          `}).join(``)}
      </ul>
    </div>
  `:`<p class="sv-note is-info"><strong>Equipo del turno:</strong> ${b}. La ruta no tiene paseador asignado y nadie cargó el checklist.</p>`}function Zs(e,t){let n=x[e.shift],r=Oo(e.shift,e.now),i=ko(),a=t.routes.flatMap(t=>hs(e,t)),o=gs(a),s=t.routes.map(e=>e.supervisor).filter(Boolean),c=[...new Set(s)].join(` y `)||n.supervisor;return`
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
            ${Ma.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${x[t].label}
                <small>${t===Eo(e.now)?`Turno actual`:`${x[t].from} a ${x[t].to}`}</small>
              </button>
            `).join(``)}
          </div>
        </div>
      </div>

      ${e.isCurrent?``:`<p class="sv-note is-info">Estás mirando el turno ${n.label.toLowerCase()} de hoy. El turno actual es el de la ${x[Eo(e.now)].label.toLowerCase()}.</p>`}

      <div class="sv-counter" role="status" aria-live="polite" aria-label="Cumplimiento del turno">
        <p class="sv-counter-line">
          <span class="sv-count is-ok"><b>${o.atiempo}</b> a tiempo</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count ${o.atrasado?`is-danger`:``}"><b>${o.atrasado}</b> ${o.atrasado===1?`atrasado`:`atrasados`}</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count"><b>${o.entregado}</b> ${o.entregado===1?`entregado`:`entregados`}</span>
        </p>
        <p class="sv-source">${ho(a.length,`perro previsto`,`perros previstos`)}${o.nosale?` · ${o.nosale} no ${o.nosale===1?`sale`:`salen`}`:``} · Atrasado: pasó la hora de retiro + ${Fa} min. Entrega demorada: el paseo superó lo previsto + ${Ia} min. Se recalcula cada minuto.</p>
      </div>

      ${t.fallback?`
        <p class="sv-note is-warn">${g(`alertCircle`,`sv-icon`)} <strong>Rutas tomadas de la planilla.</strong> ${t.loading?`Cargando las rutas del coordinador…`:`El coordinador todavía no cargó en la app la ruta de ${M(e.day.toLowerCase())} a la ${n.label.toLowerCase()}.`} Paseador y ayudante: ${b}.</p>
      `:``}

      ${Xs(e,t.routes)}
    </section>
  `}function Qs(e){return{barrio:``,tipo:Ba[0],mensaje:``,vigenteHasta:e.fecha,...co(j.avisoDraft,{})}}function $s(e){let t=Cs(e.fecha),n=Qs(e),r=ts(`aviso-form`);return`
    <section class="sv-card sv-avisos" aria-labelledby="sv-avisos-title">
      <div class="sv-section-head">
        <h2 id="sv-avisos-title" class="sv-title">${g(`mapPin`,`sv-icon`)} Avisos por barrio vigentes</h2>
        <p>${t.length?`Lo que el equipo tiene que saber hoy en cada barrio.`:$a.has(`avisos`)?`No hay avisos vigentes.`:`Cargando avisos…`}</p>
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
              <p class="sv-source">${e.vigenteHasta?`Vigente hasta ${M(xo(e.vigenteHasta))}`:`Vigente hoy`} · ${M(Mo(e,`Cargó`))}</p>
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
              <datalist id="sv-barrios">${en.map(e=>`<option value="${M(e)}"></option>`).join(``)}</datalist>
            </label>
            <label class="sv-field" for="sv-aviso-tipo">Tipo
              <select id="sv-aviso-tipo" data-sv-aviso="tipo">
                ${Ba.map(e=>`<option value="${e}" ${e===n.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
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
      ${po(`aviso`)}
    </section>
  `}function ec(e,t){if(!t.some(e=>e.stops.length))return``;let n=As(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${g(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Bozales e incompatibles primero. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>tc(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos-detector" ${ts(`avisos-detector`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>tc(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function tc(e,t){return`
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
  `}function nc(e){let t=e.dog,n=(t?.safety||[]).map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?M(e):`<b>${M(e)}</b>`}</li>`});if(e.nota&&!(t?.safety||[]).some(t=>vo(t).includes(vo(e.nota)))){let t=/no juntar/i.test(e.nota)?`danger`:/bozal/i.test(e.nota)?`warn`:`info`;n.push(`<li class="sv-chip is-${t}"><b>Ruta:</b> ${M(e.nota)}</li>`)}return t&&t.status!==`Activo`&&n.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${M(t.status)}</li>`),t||n.unshift(`<li class="sv-chip is-danger"><b>Sin ficha:</b> ${b}</li>`),n.length?`<ul class="sv-chips" aria-label="Avisos de ${M(e.perroNombre)}">${n.join(``)}</ul>`:``}function rc(e,t,n){let r=ko(),i=x[e.shift],a=Bs(t.paseador),o=n.filter(e=>e.status.live===`atrasado`),s=gs(n),c=[`Hola${a?` ${a}`:``}, te escribe ${r.nombre||`el supervisor`} (supervisión ${Ft.name}).`,`Ruta ${t.code}, turno ${i.label.toLowerCase()} ${e.fechaLabel}: ${s.entregado} entregados de ${n.length-s.nosale}.`];return o.length?(c.push(`Veo atrasados: ${o.map(e=>`${e.stop.perroNombre} (${e.status.kind===`demorada`?`entrega demorada`:`retiro ${e.stop.hora}`}, ${e.status.label.replace(/^\D+/,``)})`).join(`; `)}.`),c.push(`¿Cómo vienen? Avisame si necesitás ayuda.`)):c.push(`¿Cómo vienen? Avisame cualquier cosa.`),c.join(`
`)}function ic(e,t){let{routes:n}=t;if(!n.length)return`
      <section class="sv-card" aria-labelledby="sv-routes-title">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno</h2>
        <p class="sv-empty">${t.loading?`Cargando rutas…`:`No hay rutas cargadas para ${M(e.day.toLowerCase())} a la ${x[e.shift].label.toLowerCase()} (ni en la app ni en la planilla).`}</p>
        ${sc(e,``,``,`Pedir una ruta al coordinador`)}
        ${lc(e,``,``)}
      </section>
    `;let r=ps(),i=new Set(n.flatMap(e=>e.stops.map(e=>e.perroId)).filter(Boolean)),a=Fo(`paseos`).filter(t=>t.fecha===e.fecha&&String(t.id).endsWith(`_${e.shift}`)&&t.perroId&&!i.has(t.perroId));return`
    <section class="sv-routes" aria-labelledby="sv-routes-title">
      <div class="sv-section-head sv-routes-head">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno: retiro y entrega</h2>
        <p>Las arma el coordinador. Vos controlás que se cumplan. Si hay que cambiar algo, pedíselo con «Pedir cambio al coordinador».</p>
      </div>
      ${n.map(t=>ac(e,t,r)).join(``)}
      ${a.length?`
        <div class="sv-card">
          <h3 class="sv-subtitle">Marcados fuera de la ruta</h3>
          <ul class="sv-extra-list">
            ${a.map(e=>`<li class="sv-note is-info"><strong>${M(e.perroNombre||e.perroId)}</strong>: ${M(e.estado||`pendiente`)}. ${M(Mo(e))}</li>`).join(``)}
          </ul>
        </div>
      `:``}
    </section>
  `}function ac(e,t,n){let r=hs(e,t,n),i=gs(r),a=Bs(t.paseador),o=Bs(t.ayudante),s=Ts(e.fecha,e.shift).filter(e=>e.ruta===t.code&&!e.perroId),c=`control-${t.code}`;return`
    <article class="sv-card sv-route-card" aria-labelledby="sv-route-${_o(t.code)}">
      <div class="sv-route-head">
        <div>
          <h3 id="sv-route-${_o(t.code)}" class="sv-route-title"><span class="sv-route-code">${M(t.code)}</span> ${ho(t.stops.length,`perro`,`perros`)}</h3>
          <p class="sv-route-people">
            <span>${g(`userCheck`,`sv-icon`)} Paseador: <strong>${M(a||`Pendiente de confirmar`)}</strong></span>
            <span>${g(`users`,`sv-icon`)} Ayudante: <strong>${M(o||(t.source===`planilla`?`Pendiente de confirmar`:`sin ayudante`))}</strong></span>
          </p>
          <p class="sv-source">${M(us(t))}${t.record.actualizadoEn&&t.source!==`planilla`?` · ${M(Mo(t.record,`Último cambio de`))}`:``}</p>
          ${t.notas?`<p class="sv-hint">Notas de la ruta: ${M(t.notas)}</p>`:``}
        </div>
        <p class="sv-route-counts">
          <span class="sv-tag is-ok">${i.atiempo} a tiempo</span>
          <span class="sv-tag ${i.atrasado?`is-danger`:`is-neutral`}">${ho(i.atrasado,`atrasado`,`atrasados`)}</span>
          <span class="sv-tag is-neutral">${ho(i.entregado,`entregado`,`entregados`)}</span>
        </p>
      </div>
      <div class="sv-actions">
        <a class="sv-button" id="sv-wa-${_o(t.code)}" href="https://wa.me/?text=${encodeURIComponent(rc(e,t,r))}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`sv-icon`)} ${a?`Escribirle a ${M(a)} por WhatsApp`:`Escribir al paseador por WhatsApp`}
        </a>
        ${sc(e,t.code,``,`Pedir cambio al coordinador`)}
      </div>
      ${cc(s)}
      ${lc(e,t.code,``)}
      ${po(c)}
      <ol class="sv-stop-list">
        ${r.map(n=>oc(e,t,n)).join(``)}
      </ol>
    </article>
  `}function oc(e,t,n){let{stop:r,id:i,status:a}=n,o=i&&Xa.has(i),s=a.record,c=_o(`${t.code}-${r.perroId||r.perroNombre}`),l=[s?.horaRetiro&&a.retirado?`Retiro ${s.horaRetiro}`:``,s?.horaPaseo&&a.retirado?`Paseo ${s.horaPaseo}`:``,s?.horaEntrega&&a.kind===`entregado`?`Entrega ${s.horaEntrega}`:``].filter(Boolean),u=Ts(e.fecha,e.shift).filter(e=>e.perroId&&e.perroId===r.perroId),d=Ja.has(i)?Ja.get(i):s?.nota||``,f=Ya.has(i)||Ja.has(i)&&Ja.get(i)!==(s?.nota||``),p=a.kind===`entregado`&&a.late?`<span class="sv-tag is-warn">Con atraso</span>`:a.kind===`curso`&&a.pickupLate?`<span class="sv-tag is-warn">Retiro +${a.pickupDelay} min</span>`:``;return`
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
        ${nc(r)}
        ${l.length||s?`
          <p class="sv-source">${M(l.join(` · `))}${l.length?` · `:``}${M(Mo(s))}</p>
        `:``}
        ${s?.nota?`<p class="sv-stop-note"><b>Nota para el paseador:</b> ${M(s.nota)}</p>`:``}
        ${cc(u)}
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
                ${sc(e,t.code,r.perroId,`Pedir cambio al coordinador`)}
              </div>
            </div>
          </details>
          ${lc(e,t.code,r.perroId)}
        `:`<p class="sv-hint">Sin ficha en el registro de perros: no se puede marcar desde acá.</p>`}
      </div>
    </li>
  `}function sc(e,t,n,r){return`<button type="button" class="sv-button sv-button-quiet" id="${_o(`sv-req-open-${t||`turno`}-${n||`ruta`}`)}" data-sv-request-open data-ruta="${M(t)}" data-dog="${M(n)}">${g(`send`,`sv-icon`)} ${M(r)}</button>`}function cc(e){return e.length?`
    <ul class="sv-request-badges">
      ${e.map(e=>{let t=Ha[e.estado]||Ha.pendiente;return`<li class="sv-tag is-${t.tone}">Pedido «${M(e.tipo||`cambio`)}»: ${t.label}${e.pendiente?` (sin enviar)`:``}</li>`}).join(``)}
    </ul>
  `:``}function lc(e,t,n){let r=Os(e);return!r.open||r.ruta!==t||(r.perroId||``)!==(n||``)?``:`
    <form class="sv-form sv-request-form" data-sv-request-form novalidate aria-labelledby="sv-req-title">
      <h4 id="sv-req-title">Pedir cambio al coordinador · ${M(`${t?`Ruta ${t}`:`Turno ${x[e.shift].label.toLowerCase()}`}${r.perroNombre?` · ${r.perroNombre}`:``}`)}</h4>
      <p class="sv-hint">El coordinador lo aplica en la ruta y te responde. Hoy, ${M(e.fechaLabel)}.</p>
      <label class="sv-field" for="sv-req-tipo">Qué hay que cambiar
        <select id="sv-req-tipo" data-sv-req="tipo">
          ${Va.map(e=>`<option value="${e}" ${e===r.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
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
      ${po(`request-form`)}
    </form>
  `}function uc(e){let t=Es(e.fecha),n=t.filter(e=>(e.estado||`pendiente`)===`pendiente`).length;return`
    <details class="sv-fold" data-sv-fold="pedidos" ${ts(`pedidos`,!0)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`send`,`sv-icon`)} Mis pedidos de cambio</span>
        <span class="sv-fold-meta">${t.length?`${n} pendiente${n===1?``:`s`} de ${t.length}`:$a.has(`solicitudes`)?`Sin pedidos`:`Cargando…`}</span>
      </summary>
      <div class="sv-fold-body">
        ${po(`requests`)}
        ${t.length?`
          <ul class="sv-request-list">
            ${t.map(e=>{let t=Ha[e.estado]||Ha.pendiente,n=e.actualizadoPor&&e.actualizadoPor!==e.creadoPor?Mo(e,`Respondió`):``;return`
                <li class="sv-request is-${t.tone}">
                  <div class="sv-saved-head">
                    <strong>${e.urgente?`<span class="sv-tag is-danger">Urgente</span> `:``}${M(ws(e))}</strong>
                    <span class="sv-state is-${t.tone}">${t.label}</span>
                  </div>
                  <p class="sv-source">${M(xo(e.fecha))} · Turno ${M(String(e.turno||``).toLowerCase()||`Pendiente de confirmar`)} · ${e.pendiente?`Se enviará cuando haya señal.`:`Pedido a las ${M(Co(e.creadoEn))} hs`}</p>
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
  `}function dc(e,t){let n=ts(`observaciones`),r=Ns(e),i=Ps(),a=new Set(t.map(e=>e.id)),o=C.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} en ${Ra} días`:`Sin registros`}</span>
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
          ${js.map(e=>`
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
          ${po(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${Ra} días</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>fc(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function fc(e){let t=Ka===e.id,n=e.perroNombre||ns(e.perroId)?.name||`Pendiente de confirmar`;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${M(n)}</strong>
        <span>${M(xo(e.fecha))}${e.hora?` · ${M(e.hora)} hs`:``}${e.lugar?` · ${M(e.lugar)}`:``}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${M(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Reacción</dt><dd>${M(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${M(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Resultado</dt><dd>${M(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${M(Fs(e))}</p>
      <div class="sv-actions">
        ${t?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${g(`copy`,`sv-icon`)} Copiar texto</button>
          ${Ao(e)?`<button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function pc(e){let t=ts(`cierre`),n=Rs(e),r=Us(e),i=n?.cerrado?n.horaCierre||Co(n.actualizadoEn):``;return`
    <details class="sv-fold" data-sv-fold="cierre" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`flag`,`sv-icon`)} Cerrar el turno ${x[e.shift].label.toLowerCase()}</span>
        <span class="sv-fold-meta">${n?.cerrado?`Cerrado ${M(i)} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        ${n?`<p class="sv-source">${M(n.cerrado?Mo(n,`Lo cerró`):Mo(n,`Última nota de`))}</p>`:``}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${M(zs(e))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar (incluye el cumplimiento del horario)
          <textarea id="sv-close-summary" class="sv-summary" rows="16" readonly>${M(r)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${g(`copy`,`sv-icon`)} Copiar resumen</button>
          ${n?.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${g(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${po(`closure`)}
      </div>
    </details>
  `}function mc(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${ts(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(Vt).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas y horarios: los arma el coordinador (plantilla semanal y cambios del día). Respaldo: ${Ft.officialSources.routes}, leída el ${Pt}.</li>
          <li>Perros: ${Ft.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador. Incidentes y checklist los carga el equipo en la calle.</li>
          <li>Avisos por barrio, pedidos de cambio, observaciones y cierres se comparten con el equipo según permisos.</li>
        </ul>
      </div>
    </details>
  `}function F(e){if(!e)return Uo();Ho(),$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function hc(){return yo().time}async function gc(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function _c(e,t,n){let r=ls(e).routes.find(e=>e.code===t),i=r?.stops.find(e=>e.perroId===n);return r&&i?{route:r,stop:i}:null}function vc(e,t,n,r){let i=fs(e.fecha,n.perroId,e.shift),a=ps().get(i),o={id:i,fecha:e.fecha,...r};return a||Object.assign(o,{perroId:n.perroId,perroNombre:n.perroNombre,turno:x[e.shift].label}),a?.ruta!==t.code&&(o.ruta=t.code),o}async function yc(e,t,n,r){let i=$o(),a=_c(i,e,t);if(!a)return;let{route:o,stop:s}=a,c=fs(i.fecha,t,i.shift);if(Xa.has(c))return;let l=ps().get(c),u=ms(s,l,i.now.minutes),d=hc(),f={horaRetiro:``,horaPaseo:``,horaEntrega:``},p=s.perroNombre,m=null,h=``,ee=`ok`;if(n===`retiro`){if(u.retirado)m={estado:`pendiente`,...f},h=`${p}: retiro desmarcado.`,ee=`info`;else{m={estado:`retirado`,horaRetiro:d};let e=u.planned===null?0:i.now.minutes-u.planned;h=`${p}: retirado a las ${d} hs${e>Fa?` (${e} min después de lo previsto)`:``}.`}}else if(n===`entrega`){if(!u.retirado)return;u.kind===`entregado`?(m={estado:l?.horaPaseo?`paseando`:`retirado`,horaEntrega:``},h=`${p}: entrega desmarcada.`,ee=`info`):(m={estado:`entregado`,horaEntrega:d},h=`${p}: entregado a las ${d} hs.`)}else if(n===`no-sale`){if(u.kind===`nosale`)m={estado:`pendiente`},h=`${p}: vuelve a la lista.`;else{if(u.retirado)return;m={estado:`no-sale`,...f},h=`${p}: no sale hoy. Si cambia la ruta, pedíselo al coordinador.`}}m&&(Xa.add(c),await Io(`paseos`,vc(i,o,s,m),`control-${o.code}`,h,ee),Xa.delete(c),F(r))}async function bc(e,t,n){let r=$o(),i=_c(r,e,t);if(!i)return;let{route:a,stop:o}=i,s=fs(r.fecha,t,r.shift),c=String(Ja.has(s)?Ja.get(s):document.querySelector(`[data-sv-note="${s}"]`)?.value||``).trim();if(Pa.test(c))return P(`control-${a.code}`,`La nota parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),F(n);await Io(`paseos`,vc(r,a,o,{nota:c}),`control-${a.code}`,c?`Nota para el paseador guardada en ${o.perroNombre}.`:`Nota de ${o.perroNombre} borrada.`)&&Ja.delete(s),F(n)}async function xc(e){let t=$o(),n=Qs(t);e.querySelectorAll(`[data-sv-aviso]`).forEach(e=>{n[e.dataset.svAviso]=e.value}),N(j.avisoDraft,n);let r=n.barrio.trim(),i=n.mensaje.trim();if(!r||!i)return P(`aviso`,`Falta completar: ${mo([!r&&`barrio`,!i&&`qué pasa`].filter(Boolean))}.`,`error`),F(r?`sv-aviso-mensaje`:`sv-aviso-barrio`);if(!/^\d{4}-\d{2}-\d{2}$/.test(n.vigenteHasta)||n.vigenteHasta<t.fecha)return P(`aviso`,`Elegí hasta cuándo vale el aviso (hoy, ${t.fechaLabel}, o después).`,`error`),F(`sv-aviso-hasta`);if(Pa.test(i)||Pa.test(r))return P(`aviso`,`El aviso parece tener un teléfono. Sacalo: los avisos no llevan datos de contacto.`,`error`),F(`sv-aviso-mensaje`);let a=Ba.includes(n.tipo)?n.tipo:`otro`;return await Io(`avisos`,{fecha:t.fecha,barrio:r,tipo:a,mensaje:i,vigenteHasta:n.vigenteHasta,titulo:`${a[0].toUpperCase()}${a.slice(1)} · ${r}`},`aviso`,`Aviso de ${r} publicado. Lo ve el equipo.`)&&N(j.avisoDraft,{barrio:``,tipo:Ba[0],mensaje:``,vigenteHasta:t.fecha}),F(`sv-aviso-save`)}async function Sc(e){let t=$o(),n=Os(t);e.querySelectorAll(`[data-sv-req]`).forEach(e=>{n[e.dataset.svReq]=e.type===`checkbox`?e.checked:e.value}),N(j.requestDraft,n);let r=String(n.detalle||``).trim(),i=String(n.motivo||``).trim(),a=[];if(!r&&n.tipo!==`no sale`&&a.push(`detalle`),i||a.push(`qué pasó o con quién hablaste`),a.length)return P(`request-form`,`Falta completar: ${mo(a)}.`,`error`),F(!r&&n.tipo!==`no sale`?`sv-req-detalle`:`sv-req-motivo`);if(Pa.test(r)||Pa.test(i))return P(`request-form`,`El pedido parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),F(`sv-req-motivo`);let o=Va.includes(n.tipo)?n.tipo:`otro`,s=x[t.shift].label,c={fecha:t.fecha,turno:s,ruta:n.ruta||``,tipo:o,perroId:n.perroId||``,perroNombre:n.perroNombre||``,detalle:r||(o===`no sale`?`${n.perroNombre||`El perro`} no sale hoy.`:``),motivo:i,urgente:!!n.urgente,estado:`pendiente`,respuesta:``,titulo:`${n.urgente?`URGENTE · `:``}${o[0].toUpperCase()}${o.slice(1)}${n.perroNombre?` · ${n.perroNombre}`:``}${n.ruta?` · ${n.ruta}`:``} · ${s} ${t.fechaLabel}`},l=await Io(`solicitudes`,c,n.ruta?`control-${n.ruta}`:`requests`,`Pedido enviado al coordinador: ${ws(c)}. Lo vas a ver en «Mis pedidos de cambio».`);return l?(l.pendiente||no.set(l.id,`pendiente`),N(j.requestDraft,Ds(t)),F(_o(`sv-req-open-${n.ruta||`turno`}-${n.perroId||`ruta`}`))):(Ga&&(Ga.area=`request-form`),F(`sv-req-save`))}async function Cc(e){let t=$o(),n=Ns(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),N(j.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),js.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())});let i=So(n.fecha);if(!r.length&&!i)return P(`observation`,`Escribí una fecha real como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),F(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return P(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),F(`sv-obs-fecha`);if(r.length)return P(`observation`,`Falta completar: ${mo(r)}.`,`error`),F(n.dogId?n.fecha?`sv-obs-${js.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=js.find(e=>Na.test(n[e.key]));if(a){let e=n[a.key].match(Na)[2];return P(`observation`,`En «${a.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),F(`sv-obs-${a.key}`)}let o=ns(n.dogId);return await Io(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:x[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada. La ve el equipo.`)&&N(j.observationDraft,Ms(t)),F(`sv-obs-save`)}async function wc(e,t,n,r){let i=Ls(e),a=zs(e),o=ko(),s=Us(e,{...Rs(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoPorNombre:o.nombre,actualizadoEn:new Date().toISOString(),pendiente:!1});await Io(`cierres`,{id:i,fecha:e.fecha,turno:x[e.shift].label,notas:a,resumen:s,...t},`closure`,n,t.cerrado===!1?`info`:`ok`)&&qa?.id===i&&qa.notas===a&&(qa=null),F(r)}function Tc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return Rm(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return zo(!0),!0;let n=t.closest(`[data-sv-shift]`);if(n)return es(n.dataset.svShift),F(n.id),!0;let r=t.closest(`[data-sv-pickup]`);if(r)return yc(r.dataset.ruta,r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return yc(i.dataset.ruta,i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=_o(`${a.dataset.ruta}-${a.dataset.svAbsent}`),t=$o(),n=ps().get(fs(t.fecha,a.dataset.svAbsent,t.shift))?.estado===`no-sale`;return yc(a.dataset.ruta,a.dataset.svAbsent,`no-sale`,n?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-note-save]`);if(o)return bc(o.dataset.ruta,o.dataset.svNoteSave,o.id),!0;let s=t.closest(`[data-sv-request-open]`);if(s){let e=$o(),t=Os(e),n=s.dataset.ruta||``,r=s.dataset.dog||``,i=t.open&&t.ruta===n&&(t.perroId||``)===r;return N(j.requestDraft,i?t:Ds(e,n,r,!0)),F(`sv-req-tipo`),!0}if(t.closest(`[data-sv-request-cancel]`)){let e=$o(),t=Os(e);return N(j.requestDraft,Ds(e)),F(_o(`sv-req-open-${t.ruta||`turno`}-${t.perroId||`ruta`}`)),!0}let c=t.closest(`[data-sv-obs-copy]`);if(c){let e=Ps().find(e=>e.id===c.dataset.svObsCopy);return e&&gc(Is(e)).then(e=>{P(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),F(c.id)}),!0}let l=t.closest(`[data-sv-obs-delete]`);if(l)return Ka=l.dataset.svObsDelete,F(`sv-obs-del-no-${Ka}`),!0;let u=t.closest(`[data-sv-obs-delete-ok]`);if(u)return Ka=null,Ro(`observaciones`,u.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>F(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=Ka;return Ka=null,F(`sv-obs-del-${e}`),!0}return t.closest(`[data-sv-close-copy]`)?(gc(Us($o()),`sv-close-summary`).then(e=>{P(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),F(`sv-close-copy`)}),!0):t.closest(`[data-sv-close-done]`)?(wc($o(),{cerrado:!0,horaCierre:hc()},`Turno marcado como cerrado. No te olvides de copiar el resumen.`,`sv-close-copy`),!0):t.closest(`[data-sv-close-reopen]`)?(wc($o(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0):!1}function Ec(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;let n=$o();if(t.matches(`[data-sv-obs]`)){let e=Ns(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,N(j.observationDraft,e),!0}if(t.matches(`[data-sv-aviso]`)){let e=Qs(n);return e[t.dataset.svAviso]=t.value,N(j.avisoDraft,e),!0}if(t.matches(`[data-sv-req]`)){let e=Os(n);return e[t.dataset.svReq]=t.type===`checkbox`?t.checked:t.value,N(j.requestDraft,e),t.tagName===`SELECT`&&F(t.id),!0}return t.matches(`[data-sv-close-notes]`)?(qa={id:Ls(n),notas:t.value},t.value===(Rs(n)?.notas||``)?(qa=null,!0):(wc(n,{},`Notas del cierre guardadas.`),!0)):!1}function Dc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=$o();if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=Ns(n);e[t.dataset.svObs]=t.value,N(j.observationDraft,e)}else if(t.matches(`[data-sv-aviso]`)){let e=Qs(n);e[t.dataset.svAviso]=t.value,N(j.avisoDraft,e)}else if(t.matches(`[data-sv-req]`)&&t.type!==`checkbox`){let e=Os(n);e[t.dataset.svReq]=t.value,N(j.requestDraft,e)}else if(t.matches(`[data-sv-note]`))Ja.set(t.dataset.svNote,t.value),Ya.add(t.dataset.svNote);else if(t.matches(`[data-sv-close-notes]`)){qa={id:Ls(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=Us(n))}}function Oc(e){let t=e.target;t.closest?.(`.sv-shell`)&&(t.matches?.(`[data-sv-obs-form]`)?(e.preventDefault(),Cc(t)):t.matches?.(`[data-sv-aviso-form]`)?(e.preventDefault(),xc(t)):t.matches?.(`[data-sv-request-form]`)&&(e.preventDefault(),Sc(t)))}function kc(e){let t=e.target;if(e.key!==`Enter`||!t.matches?.(`.sv-shell [data-sv-note]`))return;e.preventDefault();let n=t.closest(`.sv-stop-more-body`)?.querySelector(`[data-sv-note-save]`);n&&bc(n.dataset.ruta,n.dataset.svNoteSave,t.id)}function Ac(e){let t=e.target;if(t.matches?.(`[data-sv-stop-more]`)){t.open?Ya.add(t.dataset.svStopMore):Ya.delete(t.dataset.svStopMore);return}if(!t.matches?.(`[data-sv-fold]`))return;let n=co(j.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,N(j.folds,n))}function jc(){_e.push(Tc),ve.push(Ec),document.addEventListener(`input`,Dc),document.addEventListener(`submit`,Oc),document.addEventListener(`keydown`,kc),document.addEventListener(`toggle`,Ac,!0),Jo()}var I={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,borradores:`paseosJuan_coord_borradores`},Mc=`paseosJuan_coord_secciones`;function Nc(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function Pc(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Fc(e){try{localStorage.removeItem(e)}catch{}}var Ic=null,Lc=null;function L(e,t,n=`ok`){Ic={section:e,text:t,tone:n},n===`error`?Vc(t):Bc(t)}function Rc(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function zc(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function Bc(e){zc(Rc(`coord-live`,`status`,`polite`),e)}function Vc(e){zc(Rc(`coord-alerta`,`alert`,`assertive`),e)}var Hc=`America/Argentina/Buenos_Aires`;function R(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function Uc(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function Wc(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:Hc,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function Gc(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||``));if(!t)return!1;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCFullYear()===n&&a.getUTCMonth()===r-1&&a.getUTCDate()===i}function Kc(e,t){let[n,r,i]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1,i+t)).toISOString().slice(0,10)}function qc(e){let[t,n,r]=e.split(`-`).map(Number);return S[(new Date(Date.UTC(t,n-1,r)).getUTCDay()+6)%7]}function Jc(e){return`${qc(e)} ${Uc(e)}`}function Yc(e){return Kc(y(),-e)}function Xc(e,t=6){let n=[],r=y();for(let i=0;i<70&&n.length<t;i+=1){let t=Kc(r,i);qc(t)===e&&n.push(t)}return n}function z(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function Zc(e){return z(e)}function Qc(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}var $c={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function el(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>$c[e]||e).join(`, `):`Sin días`}function tl(e){let t=dl.map(t=>{let n=S.filter(n=>Gt(e,n,t));return n.length?`${t.toLowerCase()}: ${el(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function nl(e,t=!1){let n=Nc(Mc,{});return e in n?!!n[e]:t}function rl(e,t){Pc(Mc,{...Nc(Mc,{}),[e]:t})}var il=new Set;function al(){return document.documentElement.dataset.motion===`calm`}function ol(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:al()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}function B(e){requestAnimationFrame(()=>document.getElementById(e)?.focus({preventScroll:!1}))}function sl(){return _.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}function cl(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``));if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n>23||r>59?null:n*60+r}function ll(e){return cl(e)!==null}function V(e){let t=cl(e);return t===null?``:`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}var ul=S.filter(e=>e!==`Domingo`),dl=[`Mañana`,`Tarde`],fl={Mañana:`09:00`,Tarde:`14:45`},pl=new Map(C.map(e=>[e.id,e])),ml=new Map(C.map(e=>[z(e.name),e])),hl=C.filter(e=>e.review||e.status!==`Activo`);function gl(e){return e.perroId&&pl.get(e.perroId)||ml.get(z(e.perroNombre))||null}function _l(e){return!!e?.safety?.some(e=>/bozal/i.test(e))}function vl(e){if(!e)return``;let t=z(e),n=It.find(e=>e.id===t||z(e.name)===t||z(e.name.split(` `)[0])===t);return n?n.name:e}var yl={solicitudes:()=>({desde:Yc(14)}),plantillas:()=>({}),rutas:()=>({desde:y()}),clientes:()=>({}),avisos:()=>({}),pedidos:()=>({}),fichas:()=>({}),resueltos:()=>({}),observaciones:()=>({desde:Yc(6)}),incidentes:()=>({desde:Yc(6)})},bl=Object.keys(yl),xl=[`pedidos`,`fichas`,`resueltos`];function Sl(e){return v.cached(e,yl[e]())}var Cl=new Set,wl=new Map,Tl=new Map,El=!1,Dl=!1;function Ol(){El||(El=!0,$e(e=>{bl.includes(e)&&(Cl.add(e),wl.delete(e),jl())}),window.addEventListener(`online`,jl),window.addEventListener(`offline`,jl))}function kl(){let e=_.user();e&&bl.forEach(t=>{let n=yl[t](),r=`${e.usuario}|${n.desde||``}`,i=Tl.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};Tl.set(t,a),v.list(t,n).then(()=>{Cl.add(t),wl.delete(t)}).catch(e=>{e.status!==401&&(wl.set(t,e.message),Vc(e.message))}).finally(()=>{Tl.get(t)===a&&(a.stop=v.watch(t,n)),jl(),Jl()})})}function Al(){[...Tl.values()].forEach(e=>e.stop?.()),Tl.clear(),wl.clear(),kl()}function jl(){Dl||(Dl=!0,requestAnimationFrame(()=>{Dl=!1,document.querySelector(`.coord-shell`)&&Ml()}))}function Ml(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;pd.has(t)||(fd[t]=_d(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function Nl(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}function Pl(e){let t=_.user();return!t||!e||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function Fl(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${Wc(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${R(e.creadoPorNombre)}${e.creadoEn?` el ${Wc(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre;n.push(`Último cambio${t?` de ${R(t)}`:``}: ${Wc(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var Il=new Set;async function Ll(e,t,{section:n,ok:r}){try{let i=await v.save(e,t);return L(n,i.pendiente?`${r} Sin señal: se enviará cuando vuelva.`:r),i}catch(e){return L(n,`No se pudo guardar: ${e.message}`,`error`),null}finally{jl()}}async function Rl(e,t,{section:n,ok:r,undo:i=!0}){try{return await v.remove(e,t.id),Lc=i?{col:e,record:t,section:n}:null,L(n,r),Ic.undo=i,!0}catch(e){return L(n,`No se pudo borrar: ${e.message}`,`error`),!1}finally{jl()}}function zl(e,t){Il.has(e)||(Il.add(e),Promise.resolve().then(t).finally(()=>Il.delete(e)))}var Bl=!1,Vl=!1,Hl=``,Ul=/^[a-z0-9][a-z0-9_.-]{0,90}$/i,Wl=[`nuevo`,`en-curso`,`resuelto`];function Gl(e){return Ul.test(String(e||``))?`ant_${String(e)}`:void 0}function Kl(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let n=`${t[3]}-${t[2].padStart(2,`0`)}-${t[1].padStart(2,`0`)}`;return Gc(n)?n:null}function ql(){let e=y(),t=[];Nc(I.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:I.pedidos,oldId:n.id,col:`pedidos`,data:{id:Gl(n.id),fecha:Kl(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:Wl.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),Nc(I.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:I.altas,oldId:r,col:`fichas`,data:{id:Gl(r),fecha:Kl(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})});let n=new Set(Sl(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(Nc(I.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:I.resueltos,oldId:e,skip:!0});return}let i=pl.get(e);t.push({key:I.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function Jl(){if(!(Bl||Vl)&&xl.every(e=>Cl.has(e))){Vl=!0;try{let e=Nc(I.borradores,{});Object.entries(e).forEach(([e,t])=>{e!==`pago`&&!fd[e]&&(fd[e]=t)}),Fc(I.borradores);let t=ql();if(!t.length){Bl=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await v.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[I.pedidos,I.altas].forEach(e=>{let t=Nc(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?Pc(e,t):Fc(e)});let a=Object.fromEntries(Object.entries(Nc(I.resueltos,{})).filter(([e])=>n.has(`${I.resueltos}|${e}`)));Object.keys(a).length?Pc(I.resueltos,a):Fc(I.resueltos),r&&(Hl=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo.`,Bc(Hl)),n.size?(wl.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),Vc(wl.get(`migracion`))):Bl=!0}finally{Vl=!1,jl()}}}var Yl={Mañana:0,Tarde:1},Xl=/^[A-Z0-9][A-Z0-9_]{1,19}$/;function Zl(e){return e&&Array.isArray(e.paradas)&&e.ruta&&e.dia}function Ql(e,t){return(Yl[e.turno]??9)-(Yl[t.turno]??9)||String(e.ruta).localeCompare(String(t.ruta))}function $l(e,t){return`${e}_${Zc(t)}`}function eu(e,t){return`${e}_${t}`}function tu(){return Sl(`plantillas`).filter(Zl)}function nu(){return Sl(`rutas`).filter(e=>Zl(e)&&e.fecha)}function ru(e){return tu().filter(t=>t.dia===e).sort(Ql)}function iu(e){let t=qc(e),n=new Map(nu().filter(t=>t.fecha===e).map(e=>[e.ruta,e])),r=ru(t).map(e=>{let t=n.get(e.ruta);return n.delete(e.ruta),t?{...t,origen:`dia`,plantillaId:e.id}:{...e,origen:`plantilla`,plantillaId:e.id}});return n.forEach(e=>r.push({...e,origen:`dia`,plantillaId:``})),r.sort(Ql)}function au(e){return(e.paradas||[]).filter(e=>ll(e.hora)).map(e=>e.hora).sort((e,t)=>cl(e)-cl(t))}function ou(e){let t=au(e);return t.length?t.length===1?V(t[0]):`${V(t[0])} a ${V(t[t.length-1])}`:`Sin horarios`}function su(e){let t=au(e);return t.length?Zt(V(t[t.length-1]),15):fl[e.turno]||`09:00`}function cu(e){let t=cl(e.hora);return t===null?null:[t,t+(Number(e.minutos)||45)]}function lu(e,t){return e&&t&&e[0]<t[1]&&t[0]<e[1]}function uu(e,t=[]){let n=[],r=new Map,i=(e,t)=>{n.push(t),e.forEach(e=>r.set(e,[...r.get(e)||[],t]))},a=(e.paradas||[]).map((e,t)=>({stop:e,index:t,dog:gl(e),win:cu(e)}));a.forEach(({stop:e,index:t,dog:n,win:r})=>{let a=e.perroNombre||n?.name||`Pendiente de confirmar`;r||i([t],`${a}: falta la hora de retiro.`),n?n.status!==`Activo`&&i([t],`${a}: estado «${n.status}».`):i([t],`${a}: no está en el registro de perros (perro sin ficha).`)});let o=new Map;for(let e=0;e<a.length;e+=1)for(let t=e+1;t<a.length;t+=1){let n=a[e],r=a[t];if(!n.dog||!r.dog)continue;if(n.dog.id===r.dog.id){i([n.index,r.index],`${n.dog.name} está dos veces en esta ruta.`);continue}if(!lu(n.win,r.win))continue;((n.dog.incompatibleWith||[]).includes(r.dog.name)||(r.dog.incompatibleWith||[]).includes(n.dog.name))&&i([n.index,r.index],`No juntar: ${n.dog.name} y ${r.dog.name} van en la misma franja (${V(n.stop.hora)} y ${V(r.stop.hora)}).`);let s=n.dog.size===`Pequeño`&&r.dog.size===`Grande`?n:r.dog.size===`Pequeño`&&n.dog.size===`Grande`?r:null;if(s){let e=s===n?r:n;o.has(s.index)||o.set(s.index,{small:s,bigs:[]}),o.get(s.index).bigs.push(e)}}return o.forEach(({small:e,bigs:t})=>{let n=[...new Set(t.map(e=>e.dog.name))];i([e.index,...t.map(e=>e.index)],`Tamaños mezclados: ${e.dog.name} (pequeño) comparte franja con ${Qc(n)} (${n.length===1?`grande`:`grandes`}).`)}),t.filter(t=>t.ruta!==e.ruta).forEach(e=>{(e.paradas||[]).forEach(t=>{let n=gl(t);a.forEach(({index:r,dog:a,win:o})=>{a&&n&&a.id===n.id&&lu(o,cu(t))&&i([r],`${a.name} también está en ${e.ruta} a las ${V(t.hora)}.`)})})}),{list:[...new Set(n)],byStop:r}}function du(e){return uu(e,ru(e.dia))}function fu(e,t){return uu(e,iu(t))}function pu(e,{fecha:t}={}){let n=[`*Ruta ${t?`${e.ruta} · ${Jc(t)} · ${e.turno}`:`${e.ruta} · ${e.dia} · ${e.turno} (plantilla semanal)`}*`,`Paseador: ${vl(e.paseador)||`Pendiente de confirmar`} | Ayudante: ${vl(e.ayudante)||`sin ayudante`} | Supervisa: ${vl(e.supervisor)||`Pendiente de confirmar`}`],r=(e.paradas||[]).slice().sort((e,t)=>(cl(e.hora)??9999)-(cl(t.hora)??9999));return r.forEach((e,t)=>{let r=gl(e),i=[];e.nota&&i.push(e.nota),_l(r)&&!/bozal/i.test(e.nota||``)&&i.push(`Usa bozal`),n.push(`${t+1}) ${V(e.hora)||`sin hora`} ${e.perroNombre||r?.name||`Pendiente de confirmar`} · ${Number(e.minutos)||45} min${i.length?` · ${i.join(` · `)}`:``}`)}),r.length||n.push(`Sin perros cargados.`),e.notas&&n.push(`Notas: ${e.notas}`),n.join(`
`)}var H=null,mu=``,hu=``,gu=``,_u=!1,vu=``,yu=``;function bu(){return Nc(Mc,{}).rutasVista===`dia`?`dia`:`semana`}function xu(e){Pc(Mc,{...Nc(Mc,{}),rutasVista:e})}function Su(){let e=y();return(!Gc(yu)||yu<e)&&(yu=e),yu}function Cu(e){return(e||[]).map(e=>({perroId:e.perroId||``,perroNombre:e.perroNombre||gl(e)?.name||``,hora:V(e.hora)||e.hora||``,minutos:Number(e.minutos)||45,nota:e.nota||``}))}function wu(e,{modo:t,fecha:n=``,nuevo:r=!1,solicitud:i=null}={}){H={modo:t,fecha:n,nuevo:r,id:t===`plantilla`?$l(e.ruta,e.dia):eu(n,e.ruta),dia:t===`dia`?qc(n):e.dia,turno:e.turno,ruta:e.ruta,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,paradas:Cu(e.paradas),plantillaId:e.plantillaId||(t===`plantilla`?e.id:``),existeDia:t===`dia`&&e.origen===`dia`?e:null,soloDia:t===`plantilla`&&Xc(e.dia)[0]||``,solicitudId:i?.id||``,precarga:``,respuesta:``,sucio:!1},mu=``,hu=``,gu=``}function Tu(){H=null,mu=``,hu=``,gu=``}function Eu(e,t){let n=t===`Mañana`?`M`:`T`;for(let t=1;t<10;t+=1){let r=`PJ_${t}${n}`;if(!e.some(e=>e.ruta===r))return r}return`PJ_X${n}`}function Du(){if(!H)return{list:[],byStop:new Map};let e=H.modo===`plantilla`?ru(H.dia):iu(H.fecha);return uu(H,e)}function Ou(e,t){let n=ll(hu)?V(hu):su(H);H.paradas.push({perroId:e?.id||``,perroNombre:e?.name||t,hora:n,minutos:e?.minutes||45,nota:e?.incompatibleWith?.length?`No juntar con ${Qc(e.incompatibleWith)}`:_l(e)?`Bozal`:``}),H.sucio=!0,mu=``,hu=``}function ku(){H.paradas.sort((e,t)=>(cl(e.hora)??9999)-(cl(t.hora)??9999)),H.sucio=!0}function Au(){return{dia:H.dia,turno:H.turno,ruta:H.ruta,paseador:H.paseador.trim(),ayudante:H.ayudante.trim(),supervisor:H.supervisor.trim(),notas:H.notas.trim(),paradas:Cu(H.paradas)}}function ju(){let e=String(H.ruta||``).trim().toUpperCase().replace(/\s+/g,`_`);if(!Xl.test(e))return[`El código de la ruta tiene que ser como PJ_1M (letras, números y guion bajo).`,`coord-ed-ruta`];if(H.ruta=e,H.nuevo&&(H.modo===`plantilla`?tu().some(t=>t.id===$l(e,H.dia)):iu(H.fecha).some(t=>t.ruta===e)))return[`Ya hay una ruta ${e} ese día. Elegí otro código o editá la que existe.`,`coord-ed-ruta`];let t=H.paradas.findIndex(e=>!ll(e.hora));return t>=0?[`Falta la hora de retiro de ${H.paradas[t].perroNombre||`un perro`}.`,`coord-ed-hora-${t}`]:null}var Mu={},Nu=``;function Pu(){return Sl(`solicitudes`).slice().sort(Nl)}function Fu(){return Pu().filter(e=>(e.estado||`pendiente`)===`pendiente`).sort((e,t)=>Number(!!t.urgente)-Number(!!e.urgente)||String(e.fecha||``).localeCompare(String(t.fecha||``))||Nl(t,e))}function Iu(e){return e.perroId&&pl.get(e.perroId)?pl.get(e.perroId):ml.get(z(e.perroNombre))||null}function Lu(e){let t=/(\d{1,2})\s*[:.h]\s*(\d{2})/.exec(String(e||``));return t?V(`${t[1]}:${t[2]}`):``}function Ru(e){let t=Gc(e.fecha)?e.fecha:y(),n=Iu(e),r=iu(t),i=e.ruta?r.find(t=>t.ruta===e.ruta):null;!i&&n&&(i=r.find(t=>(!e.turno||t.turno===e.turno)&&(t.paradas||[]).some(e=>gl(e)?.id===n.id))),!i&&e.turno&&(i=r.find(t=>t.turno===e.turno));let a=!i;if(!i){let n=e.turno||`Mañana`;i={ruta:e.ruta||Eu(r,n),dia:qc(t),turno:n,paradas:[],origen:`plantilla`}}wu(i,{modo:`dia`,fecha:t,nuevo:a,solicitud:e});let o=z(e.tipo),s=n?H.paradas.findIndex(e=>gl(e)?.id===n.id):H.paradas.findIndex(t=>z(t.perroNombre)===z(e.perroNombre)),c=Lu(e.detalle),l=n?.name||e.perroNombre||`el perro`;o===`no sale`?s>=0?(H.paradas.splice(s,1),H.precarga=`Ya saqué a ${l} de la ruta. Revisá y guardá.`):H.precarga=`${l} no está en esta ruta: revisá a mano.`:o===`cambiar hora`?s>=0&&c?(H.paradas[s].hora=c,H.precarga=`Ya cambié la hora de ${l} a las ${c}. Revisá y guardá.`):H.precarga=`No pude precargar la hora nueva: cambiala a mano.`:o===`agregar perro`?s>=0?H.precarga=`${l} ya estaba en la ruta: revisá la hora.`:n||e.perroNombre?(c&&(hu=c),Ou(n,e.perroNombre),H.precarga=`Ya agregué a ${l} a las ${H.paradas[H.paradas.length-1].hora}. Revisá y guardá.`):H.precarga=`No dice qué perro agregar: buscalo abajo.`:H.precarga=`Este cambio se hace a mano: revisá el pedido y ajustá la ruta.`,H.sucio=!0,H.respuesta=``}var zu=[[`activo`,`Activo`],[`pausa`,`En pausa`],[`baja`,`De baja`]],Bu=[b,...Rt.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`,`Otro (anotalo en notas)`],Vu=[b,`Mañana`,`Tarde`,`Mañana y tarde`],Hu=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],Uu=``;function Wu(){return Sl(`clientes`).slice().sort((e,t)=>String(e.nombre||``).localeCompare(String(t.nombre||``),`es`))}function Gu(){return Sl(`avisos`).slice().sort(Nl)}function Ku(e,t=y()){return Gc(e.vigenteHasta)?e.vigenteHasta>=t:(e.fecha||``)===t}function qu(){return Gu().filter(e=>Ku(e))}function Ju(e){let t=new Map;return e.forEach(e=>{let n=e.barrio||`Sin barrio`;t.has(n)||t.set(n,[]),t.get(n).push(e)}),[...t.entries()].sort((e,t)=>e[0].localeCompare(t[0],`es`))}function Yu(){let e=new Map;return[...en,...Wu().map(e=>e.barrio),...Gu().map(e=>e.barrio)].forEach(t=>{let n=String(t||``).trim();n&&!e.has(z(n))&&e.set(z(n),n)}),[...e.values()].sort((e,t)=>e.localeCompare(t,`es`))}function Xu(e){return[`*Aviso Paseos Juan · ${e.barrio||`Sin barrio`}*`,`Tipo: ${e.tipo||`otro`}`,e.mensaje||``,`Vigente hasta: ${Gc(e.vigenteHasta)?Uc(e.vigenteHasta):Uc(e.fecha)}`].filter(Boolean).join(`
`)}var Zu=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],Qu=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],$u=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],ed={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function td(e){return e.estado===`curso`?`en-curso`:Wl.includes(e.estado)?e.estado:`nuevo`}function nd(){return Sl(`pedidos`).slice().sort(Nl)}function rd(){return Sl(`fichas`).slice().sort(Nl)}function id(){let e={};return Sl(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function ad(e){return e.datos?.perro||e.perro||``}function od(e){return e.filter(e=>e.origen===`web`&&td(e)===`nuevo`)}function sd(){let e=id();return hl.filter(t=>!e[t.id])}function cd(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function ld(e,t,n=`secondary`,r=`Escribirle por WhatsApp`){if(!e)return``;let i=cd(e);return i?`<a class="coord-btn is-${n}" href="https://wa.me/${i}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${g(`message`,`coord-icon`)}<span>${r}</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`:`<p class="coord-inline-alert">${g(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina.</span></p>`}var ud=ul;function dd(e){let t=z(e),n=ud.map(z),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return ud.slice(e,t+1)}return ud.filter((e,r)=>t.includes(n[r]))}var fd={},pd=new Set;function md(e){return fd[e]||{}}function hd(e,t){fd[e]=t,pd.delete(e)}function gd(e){delete fd[e],pd.add(e)}function _d(e){let t={...md(e.dataset.coordForm)},n=new Set;return e.querySelectorAll(`[name]`).forEach(r=>{if(r.type!==`file`){if(r.type===`checkbox`){if(n.has(r.name))return;n.add(r.name);let i=e.querySelectorAll(`[name="${r.name}"]`);t[r.name]=[...i].filter(e=>e.checked).map(e=>e.value)}else t[r.name]=r.value}}),t}function vd(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${R(r)}" ${i?`placeholder="${R(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function U(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`,l=r.map(e=>Array.isArray(e)?e:[e,e]);return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``}>
        ${l.map(([e,t])=>`<option value="${R(e)}" ${e===i?`selected`:``}>${R(t)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function yd(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``,required:c=!1}={}){let l=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${l}">${n}${c?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <textarea id="${l}" name="${t}" rows="3" ${i?`placeholder="${R(i)}"`:``} ${a?`aria-describedby="${l}-hint"`:``} ${s}>${R(r)}</textarea>
      ${a?`<small id="${l}-hint">${a}</small>`:``}
    </div>
  `}function bd(e,t){return`
    <div class="coord-field is-wide">
      <span class="coord-label" id="coord-${e}-dias-label">Días</span>
      <div class="coord-days" role="group" aria-labelledby="coord-${e}-dias-label">
        ${ul.map(n=>`
          <label class="coord-day"><input type="checkbox" id="coord-${e}-dia-${Zc(n)}" name="dias" value="${n}" ${t.includes(n)?`checked`:``} /><span>${n}</span></label>
        `).join(``)}
      </div>
    </div>
  `}function xd(e){if(!Ic||Ic.section!==e)return``;let t=Ic.undo?`<button class="coord-link" type="button" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${Ic.tone}">${g(Ic.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${R(Ic.text)}</span>${t}</p>`}function W(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?g(r,`coord-icon`):``}<span>${e}</span></button>`}function Sd({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${nl(e,s)?`open`:``}>
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
  `}function G(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function Cd(e){return e?.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${R(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${g(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${R(e)}</li>`).join(``)}
    </ul>
  `:``}function wd(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${R(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function Td(e,t){return e.length?`
    <div class="coord-warn-box" role="note" ${t?`id="${t}"`:``}>
      <h3>${g(`alertTriangle`,`coord-icon`)}<span>${e.length===1?`1 aviso para revisar`:`${e.length} avisos para revisar`}</span></h3>
      <ul>${e.map(e=>`<li>${R(e)}</li>`).join(``)}</ul>
      <p>No bloquea el guardado: revisalo antes de mandar la ruta.</p>
    </div>
  `:``}var Ed=`
  <datalist id="coord-team-users">${It.map(e=>`<option value="${R(e.id)}">${R(e.name)} · ${R(e.label)}</option>`).join(``)}</datalist>
  <datalist id="coord-team-names">${It.map(e=>`<option value="${R(e.name.split(` `)[0])}">${R(e.name)}</option>`).join(``)}</datalist>
`;function Dd(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Od()}
      ${e}
    </div>
  `}function Od(){return`
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
  `}function kd(){Ol(),kl();let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${Ad()}
      ${Md()}
      ${Pd()}
      ${Fd()}
      ${Ud()}
      ${Jd()}
      ${Yd()}
      ${Qd()}
      ${tf()}
      ${rf()}
      ${uf()}
      <p class="coord-footnote">
        Rutas de partida: ${R(Ft.officialSources.routes)} (${Pt}). Datos de perros: ${R(Ft.officialSources.dogs)}.
        Rutas, clientes, avisos y pedidos se guardan en los datos compartidos del equipo. Los pagos los ve solo Juan.
      </p>
      ${Ed}
    </main>
  `;return Ic=null,pd.clear(),e}function Ad(){let e=v.pendingCount(),t=navigator.onLine===!1,n=[...new Set(wl.values())],r=[];return e?r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>${e} ${e===1?`cambio pendiente`:`cambios pendientes`} sin señal.</b> Se ${e===1?`envía solo`:`envían solos`} cuando vuelva.</span></p>`):t&&r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva.</span></p>`),n.length&&r.push(`<div class="coord-sync is-error">${g(`alertCircle`,`coord-icon`)}<span>${n.map(R).join(` `)}</span>${W(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),Hl&&r.push(`<p class="coord-sync is-ok">${g(`uploadCloud`,`coord-icon`)}<span>${R(Hl)}</span></p>`),r.length?`<div class="coord-sync-list">${r.join(``)}</div>`:``}function jd(e,{compact:t=!1}={}){let n=R(e.id),r=e.estado||`pendiente`,i=e.perroNombre||Iu(e)?.name||``,a=e.creadoPorNombre?`${e.creadoPorNombre}${e.creadoEn?`, ${Wc(e.creadoEn)}`:``}`:b,o=e.titulo||[e.tipo,i].filter(Boolean).join(`: `),s=Nu===e.id;return`
    <li class="coord-sol ${e.urgente?`is-urgent`:``} is-${R(r)}" id="coord-sol-${n}" tabindex="-1">
      <div class="coord-sol-head">
        <strong>${R(o||`Pedido de cambio`)}</strong>
        <span class="coord-badges">${e.urgente?G(`Urgente`,`alert`):``}${r===`aplicado`?G(`Aplicado`,`ok`):G(r===`rechazado`?`Rechazado`:`Pendiente`,`warn`)}</span>
      </div>
      <p class="coord-sol-where">${g(`route`,`coord-icon`)}<span>${R([e.fecha?Jc(e.fecha):``,e.turno,e.ruta].filter(Boolean).join(` · `)||`Pendiente de confirmar`)}</span></p>
      ${wd([[`Qué cambiar`,e.detalle],[`Por qué`,e.motivo],[`Pidió`,a],[`Respuesta`,e.respuesta]],t?`is-compact`:``)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      ${r===`pendiente`?`
        ${s?`
          <div class="coord-reject">
            <label for="coord-rechazo-${n}">Respuesta para el supervisor <span class="coord-required">(obligatorio)</span></label>
            <textarea id="coord-rechazo-${n}" rows="2" data-coord-rechazo="${n}" placeholder="Ej.: Ese día no hay lugar en la ruta; lo pasamos al lunes.">${R(Mu[e.id]||``)}</textarea>
            <div class="coord-actions">
              ${W(`Enviar rechazo`,`id="coord-rechazar-ok-${n}" data-coord-sol-rechazar-ok="${n}"`,`primary`)}
              ${W(`Cancelar`,`data-coord-sol-rechazar-cancel="${n}"`,`ghost`)}
            </div>
          </div>`:`
          <div class="coord-actions">
            ${W(`Aplicar`,`id="coord-aplicar-${n}" data-coord-sol-aplicar="${n}"`,`primary`,`checkCircle`)}
            ${W(`Rechazar`,`id="coord-rechazar-${n}" data-coord-sol-rechazar="${n}"`,`ghost`,`x`)}
          </div>`}`:``}
    </li>
  `}function Md(){let e=y(),t=sl(),n=od(nd()),r=Fu(),i=r.filter(e=>e.urgente),a=tu().length>0,o=iu(e),s=o.reduce((t,n)=>t+fu(n,e).list.length,0),c=o.reduce((e,t)=>e+(t.paradas||[]).length,0),l=qu(),u=Ju(l).map(([e])=>e),d=sd(),f;if(i.length)f={text:`Resolvé el pedido urgente de <b>${R(i[0].creadoPorNombre||`supervisión`)}</b>: ${R(i[0].titulo||i[0].tipo||`cambio de ruta`)}.`,action:W(`Aplicar`,`data-coord-sol-aplicar="${R(i[0].id)}"`,`primary`,`arrowRight`)};else if(n.length){let e=n[n.length-1],t=e.datos||{};f={text:`Escribile a <b>${R(t.responsable||`quien hizo el pedido`)}</b> por la evaluación de <b>${R(t.perro||`su perro`)}</b>.`,action:W(`Ver pedido`,`data-coord-goto-pedido="${R(e.id)}"`,`primary`,`arrowRight`)}}else f=!a&&Cl.has(`plantillas`)?{text:`Cargá las rutas de la planilla RPJ para tener la semana armada.`,action:W(`Ir a rutas`,`data-coord-goto="coord-rutas"`,`primary`,`arrowRight`)}:r.length?{text:`Respondé el pedido de cambio de <b>${R(r[0].creadoPorNombre||`supervisión`)}</b>.`,action:W(`Aplicar`,`data-coord-sol-aplicar="${R(r[0].id)}"`,`primary`,`arrowRight`)}:s?{text:`Revisá ${s===1?`el aviso`:`los ${s} avisos`} de las rutas de hoy.`,action:W(`Ver rutas de hoy`,`data-coord-ver-dia="${e}"`,`primary`,`arrowRight`)}:d.length?{text:`Confirmá el dato de <b>${R(d[0].name)}</b>: ${R(d[0].review||`estado "${d[0].status}"`)}`,action:W(`Ver datos`,`data-coord-open="datos"`,`primary`,`arrowRight`)}:{text:`Todo en orden. Mirá las rutas del día siguiente.`,action:W(`Ver el día siguiente`,`data-coord-ver-dia="${Kc(e,1)}"`,`primary`,`arrowRight`)};let p=r.slice(0,3);return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${Jc(e)}</p>
        <p class="coord-greeting">Hola, ${R(t.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
      </div>

      ${r.length?`
        <div class="coord-sol-alert" id="coord-sol-urgente" tabindex="-1">
          <h2>${g(`bell`,`coord-icon`)}<span>${r.length===1?`1 pedido de cambio del supervisor`:`${r.length} pedidos de cambio del supervisor`}</span></h2>
          ${xd(`solicitudes`)}
          <ul class="coord-sol-list">${p.map(e=>jd(e,{compact:!0})).join(``)}</ul>
          ${r.length>p.length?`<p>Y ${r.length-p.length} más. ${W(`Ver todos`,`data-coord-open="solicitudes"`,`ghost`)}</p>`:``}
        </div>`:xd(`solicitudes`)}

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-alert`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Pedidos nuevos de la web</h2>
            <p class="coord-big"><b>${n.length}</b> <span>${n.length,`sin responder`}</span></p>
            <p>${n.length?R(Qc(n.slice(0,3).map(e=>e.datos?.perro||`Pendiente de confirmar`))):Cl.has(`pedidos`)?`No hay pedidos nuevos.`:`Cargando pedidos…`}</p>
          </div>
          ${W(`Ver pedidos`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${a?s?`is-alert`:`is-ok`:`is-warn`}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Rutas de hoy</h2>
            ${!a&&!o.length?`<p class="coord-big"><b>0</b> <span>rutas</span></p><p>${Cl.has(`plantillas`)?`Todavía no hay rutas cargadas.`:`Cargando rutas…`}</p>`:`<p class="coord-big"><b>${o.length}</b> <span>${o.length===1?`ruta`:`rutas`}</span> <b>${c}</b> <span>paseos</span></p>
                 ${s?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${s} ${s===1?`aviso`:`avisos`} para revisar</span></p>`:`<p>Sin avisos.</p>`}`}
          </div>
          ${W(a?`Ver rutas de hoy`:`Cargar rutas`,a?`data-coord-ver-dia="${e}"`:`data-coord-goto="coord-rutas"`,`secondary`)}
        </li>
        <li class="coord-priority ${l.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Avisos de barrio vigentes</h2>
            <p class="coord-big"><b>${l.length}</b> <span>${u.length===1?`en 1 barrio`:`en ${u.length} barrios`}</span></p>
            <p>${l.length?R(Qc(u.slice(0,3))):`Sin avisos vigentes.`}</p>
          </div>
          ${W(l.length?`Ver avisos`:`Cargar un aviso`,l.length?`data-coord-goto="coord-avisos-vigentes"`:`data-coord-open="avisos"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function Nd(e,{history:t=!1}={}){let n=R(e.id);return`
    <li class="coord-aviso ${t?`is-old`:``}">
      <div class="coord-aviso-head">
        ${t?`<strong>${R(e.barrio||`Sin barrio`)}</strong>`:``}
        ${G(R(e.tipo||`otro`),e.tipo===`seguridad`||e.tipo===`perro suelto`?`alert`:`warn`)}
        <small>${t?`Venció`:`Hasta`} el ${R(Uc(Gc(e.vigenteHasta)?e.vigenteHasta:e.fecha))}</small>
      </div>
      <p>${R(e.mensaje||e.titulo||``)}</p>
      ${Fl(e)}
      <div class="coord-actions">
        ${W(`Copiar para WhatsApp`,`data-coord-aviso-copy="${n}"`,`ghost`,`copy`)}
        ${t?``:W(`Ya no está vigente`,`data-coord-aviso-fin="${n}"`,`ghost`)}
      </div>
    </li>
  `}function Pd(){let e=qu();return e.length?`
    <section class="coord-block coord-avisos-strip" id="coord-avisos-vigentes" tabindex="-1" aria-labelledby="coord-avisos-vig-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-avisos-vig-title">Avisos vigentes por barrio</h2>
          <p>Lo que el equipo tiene que saber hoy en cada barrio.</p>
        </div>
        ${W(`Cargar un aviso`,`data-coord-open="avisos"`,`secondary`,`plus`)}
      </div>
      ${xd(`avisosTop`)}
      <div class="coord-barrios">
        ${Ju(e).map(([e,t])=>`
          <section class="coord-barrio" aria-label="Avisos en ${R(e)}">
            <h3>${g(`mapPin`,`coord-icon`)}<span>${R(e)}</span> <small>${t.length}</small></h3>
            <ul class="coord-aviso-list">${t.map(e=>Nd(e)).join(``)}</ul>
          </section>
        `).join(``)}
      </div>
    </section>
  `:``}function Fd(){let e=tu(),t=!Cl.has(`plantillas`)&&!e.length,n;if(H)n=Hd();else if(t)n=`<p class="coord-empty">${g(`clock`,`coord-icon`)}Cargando rutas…</p>`;else if(!e.length||vu)n=Id();else{let e=bu();n=`
      <div class="coord-seg" role="group" aria-label="Qué querés ver">
        <button type="button" class="coord-seg-btn" id="coord-vista-semana" data-coord-vista="semana" aria-pressed="${e===`semana`}">${g(`calendarCheck`,`coord-icon`)}<span>Semana (se repite)</span></button>
        <button type="button" class="coord-seg-btn" id="coord-vista-dia" data-coord-vista="dia" aria-pressed="${e===`dia`}">${g(`route`,`coord-icon`)}<span>Un día puntual</span></button>
      </div>
      ${e===`semana`?Rd():zd()}
    `}return`
    <section class="coord-block coord-routes" id="coord-rutas" tabindex="-1" aria-labelledby="coord-rutas-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-rutas-title">Rutas y horarios</h2>
          <p>La <b>semana</b> se repite todas las semanas. Si un día puntual cambia algo, guardalo <b>solo para ese día</b>: la semana no se toca.</p>
        </div>
      </div>
      ${xd(`rutas`)}
      ${n}
    </section>
  `}function Id(){let e=$t(),t=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <div class="coord-carga">
      <p>Todavía no hay rutas armadas en la app. Podés arrancar con las rutas reales de la planilla RPJ (hoja BASE RUTAS, leída el 12/11/2026): <b>${e.length} rutas</b> y <b>${t} paseos</b> con su hora de retiro. Después las cambiás acá.</p>
      ${vu?`<p class="coord-note" role="status">${g(`clock`,`coord-icon`)}<span>${R(vu)}</span></p>`:``}
      ${_u?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-carga-q">
          <p id="coord-carga-q"><b>¿Confirmás?</b> Se guardan ${e.length} rutas como semana base. Las ve todo el equipo.</p>
          <div class="coord-actions">
            ${W(`Sí, cargar las rutas`,`id="coord-carga-ok" data-coord-carga-ok`,`primary`,`checkCircle`)}
            ${W(`Cancelar`,`id="coord-carga-cancel" data-coord-carga-cancel`,`ghost`)}
          </div>
        </div>`:`<button class="coord-btn is-primary coord-btn-big" type="button" id="coord-carga" data-coord-carga>${g(`uploadCloud`,`coord-icon`)}<span>Cargar las rutas de la planilla RPJ</span></button>`}
      <p class="coord-meta">No incluye a «Llak» (jueves tarde): el nombre no coincide con ningún perro. Paseador y ayudante quedan para completar.</p>
    </div>
  `}function Ld(e,{warnings:t,attrs:n}){let r=(e.paradas||[]).length;return`
    <button type="button" class="coord-wroute ${t?`is-alert`:``}" ${n}>
      <span class="coord-wroute-top"><strong>${R(e.ruta)}</strong>${t?`<span class="coord-wroute-warn">${g(`alertTriangle`,`coord-icon`)}${t}<span class="coord-sr-only"> ${t===1?`aviso`:`avisos`}</span></span>`:``}</span>
      <span>${r} ${r===1?`perro`:`perros`} · ${R(ou(e))}</span>
      <small>${e.paseador?R(vl(e.paseador)):`Sin paseador`}</small>
    </button>
  `}function Rd(){let e=tu(),t=qc(y()),n=e.some(e=>e.dia===`Domingo`)?S:ul,r=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <p class="coord-meta">${e.length} rutas · ${r} paseos por semana. Tocá una ruta para editar sus horarios.</p>
    <div class="coord-week">
      ${n.map(e=>`
        <section class="coord-wday ${e===t?`is-today`:``}" aria-labelledby="coord-wday-${Zc(e)}">
          <h3 id="coord-wday-${Zc(e)}">${e}${e===t?` <span class="coord-tag">Hoy</span>`:``}</h3>
          ${dl.map(t=>`
              <div class="coord-wturno">
                <p class="coord-wturno-label">${t}</p>
                ${ru(e).filter(e=>e.turno===t).map(n=>Ld(n,{warnings:du(n).list.length,attrs:`id="coord-wr-${R(n.id)}" data-coord-edit-plantilla="${R(n.id)}" aria-label="Editar ${R(n.ruta)} del ${e.toLowerCase()} a la ${t.toLowerCase()}"`})).join(``)}
                <button type="button" class="coord-wadd" id="coord-wadd-${Zc(e)}-${Zc(t)}" data-coord-new-route data-dia="${e}" data-turno="${t}">${g(`plus`,`coord-icon`)}<span>Ruta</span><span class="coord-sr-only"> nueva el ${e.toLowerCase()} a la ${t.toLowerCase()}</span></button>
              </div>
            `).join(``)}
        </section>
      `).join(``)}
    </div>
  `}function zd(){let e=y(),t=Su(),n=iu(t),r=n.reduce((e,t)=>e+(t.paradas||[]).length,0);return`
    <div class="coord-dayview">
      <div class="coord-day-pick">
        <div class="coord-field">
          <label for="coord-rutas-fecha">Día</label>
          <input id="coord-rutas-fecha" type="date" value="${t}" min="${e}" max="${Kc(e,90)}" data-coord-rutas-fecha />
        </div>
        <div class="coord-day-quick">
          ${W(`Hoy`,`id="coord-dia-hoy" data-coord-ver-dia="${e}"`,t===e?`secondary`:`ghost`)}
          ${W(`Día siguiente`,`id="coord-dia-manana" data-coord-ver-dia="${Kc(e,1)}"`,t===Kc(e,1)?`secondary`:`ghost`)}
        </div>
      </div>
      <h3 class="coord-day-title">${R(Jc(t))} · ${n.length} ${n.length===1?`ruta`:`rutas`} · ${r} paseos</h3>
      ${n.length?`<div class="coord-actions">${W(`Copiar todas las rutas del día`,`id="coord-copy-dia" data-coord-copy-dia="${t}"`,`ghost`,`copy`)}</div>`:`<p class="coord-empty is-small">No hay rutas para este día.</p>`}
      <ul class="coord-dayroutes">
        ${n.map(e=>{let n=fu(e,t),r=(e.paradas||[]).slice().sort((e,t)=>(cl(e.hora)??9999)-(cl(t.hora)??9999));return`
            <li class="coord-dayroute ${n.list.length?`is-alert`:``}">
              <div class="coord-card-head">
                <strong>${R(e.ruta)} · ${R(e.turno)}</strong>
                ${e.origen===`dia`?G(`Cambio solo para este día`,`warn`):G(`Igual que la semana`,`neutral`)}
              </div>
              <p>${r.length} ${r.length===1?`perro`:`perros`} · ${R(ou(e))} · Paseador: ${R(vl(e.paseador)||`Pendiente de confirmar`)}${e.ayudante?` · Ayudante: ${R(vl(e.ayudante))}`:``}</p>
              ${n.list.length?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${R(n.list.slice(0,2).join(` `))}${n.list.length>2?` Y ${n.list.length-2} más.`:``}</span></p>`:``}
              <details class="coord-card-more">
                <summary>Ver paradas ${g(`chevronDown`,`coord-icon`)}</summary>
                <ol class="coord-stops-mini">${r.map((t,r)=>`<li class="${n.byStop.has((e.paradas||[]).indexOf(t))?`is-alert`:``}"><b>${R(V(t.hora)||`--:--`)}</b> ${R(t.perroNombre)} <small>${Number(t.minutos)||45} min${t.nota?` · ${R(t.nota)}`:``}</small><span class="coord-sr-only"> (parada ${r+1})</span></li>`).join(``)}</ol>
              </details>
              <div class="coord-actions">
                ${W(`Cambiar solo este día`,`id="coord-ed-dia-${R(e.ruta)}" data-coord-edit-dia="${R(e.ruta)}" data-fecha="${t}"`,`primary`,`sliders`)}
                ${W(`Copiar para WhatsApp`,`data-coord-copy-ruta="${R(e.ruta)}" data-fecha="${t}"`,`ghost`,`copy`)}
              </div>
            </li>
          `}).join(``)}
      </ul>
      <div class="coord-actions">
        ${dl.map(e=>W(`Ruta extra solo este día (${e.toLowerCase()})`,`id="coord-extra-${Zc(e)}" data-coord-new-dia data-turno="${e}" data-fecha="${t}"`,`ghost`,`plus`)).join(``)}
      </div>
    </div>
  `}function Bd(e,t,n){let r=gl(e),i=n.byStop.get(t)||[],a=ll(e.hora)?Zt(V(e.hora),e.minutos||45):``,o=H.paradas.length-1,s=e.perroNombre||r?.name||`Pendiente de confirmar`;return`
    <li class="coord-stop ${i.length?`is-alert`:``}">
      <div class="coord-stop-head">
        <span class="coord-stop-num" aria-hidden="true">${t+1}</span>
        <div class="coord-stop-name">
          <strong>${R(s)}</strong>
          <small>${r?`${R(r.size)}${r.status===`Activo`?``:` · ${R(r.status)}`}`:`Sin ficha en el registro`}</small>
        </div>
        <div class="coord-stop-tools">
          <button type="button" class="coord-icon-btn" id="coord-ed-up-${t}" data-coord-stop-up="${t}" ${t===0?`disabled`:``} aria-label="Subir a ${R(s)}">${g(`chevronDown`,`coord-icon is-up`)}</button>
          <button type="button" class="coord-icon-btn" id="coord-ed-down-${t}" data-coord-stop-down="${t}" ${t===o?`disabled`:``} aria-label="Bajar a ${R(s)}">${g(`chevronDown`,`coord-icon`)}</button>
          <button type="button" class="coord-icon-btn is-danger" id="coord-ed-del-${t}" data-coord-stop-del="${t}" aria-label="Quitar a ${R(s)} de la ruta">${g(`x`,`coord-icon`)}</button>
        </div>
      </div>
      <div class="coord-stop-fields">
        <div class="coord-field">
          <label for="coord-ed-hora-${t}">Retiro</label>
          <input id="coord-ed-hora-${t}" type="time" step="300" value="${R(V(e.hora))}" data-coord-stop="${t}" data-k="hora" ${ll(e.hora)?``:`aria-invalid="true"`} />
        </div>
        <div class="coord-field">
          <label for="coord-ed-min-${t}">Minutos</label>
          <input id="coord-ed-min-${t}" type="number" min="5" max="240" step="5" inputmode="numeric" value="${R(e.minutos)}" data-coord-stop="${t}" data-k="minutos" />
        </div>
        <p class="coord-stop-end">${a?`Vuelve ~${a}`:``}</p>
        <div class="coord-field is-wide">
          <label for="coord-ed-nota-${t}">Nota</label>
          <input id="coord-ed-nota-${t}" type="text" value="${R(e.nota)}" data-coord-stop="${t}" data-k="nota" placeholder="Ej.: bozal, sale con…" autocomplete="off" />
        </div>
      </div>
      ${i.length?`<ul class="coord-stop-warn">${i.map(e=>`<li>${g(`alertTriangle`,`coord-icon`)}<span>${R(e)}</span></li>`).join(``)}</ul>`:``}
    </li>
  `}function Vd(){if(!H)return``;let e=z(mu);if(!e)return`<p class="coord-meta">Escribí el nombre del perro. Se agrega a la hora de arriba.</p>`;let t=new Set(H.paradas.map(e=>gl(e)?.id).filter(Boolean)),n=C.filter(t=>z(t.name).includes(e)).slice(0,6),r=C.some(t=>z(t.name)===e),i=ll(hu)?V(hu):su(H);return`
    <ul class="coord-results">
      ${n.map(e=>`
        <li>
          <button type="button" class="coord-result" id="coord-add-${e.id}" data-coord-add-dog="${e.id}">
            ${g(`plus`,`coord-icon`)}
            <span><b>${R(e.name)}</b> <small>${R(e.size)} · ${R(tl(e))}</small></span>
            ${e.status===`Activo`?``:G(R(e.status),`alert`)}
            ${t.has(e.id)?G(`Ya está en la ruta`,`warn`):``}
            <span class="coord-result-hora">${i}</span>
          </button>
        </li>`).join(``)}
      ${!r&&mu.trim().length>=2?`
        <li>
          <button type="button" class="coord-result is-free" id="coord-add-libre" data-coord-add-libre>
            ${g(`plus`,`coord-icon`)}<span>Agregar «${R(mu.trim())}» (perro sin ficha)</span><span class="coord-result-hora">${i}</span>
          </button>
        </li>`:``}
    </ul>
    ${n.length?``:`<p class="coord-meta">No hay perros con ese nombre en el registro.</p>`}
  `}function Hd(){let e=H,t=Du(),n=e.solicitudId?Pu().find(t=>t.id===e.solicitudId):null,r=e.modo===`plantilla`,i=r?Xc(e.dia):[],a=ll(hu)?V(hu):su(e);return`
    <div class="coord-editor ${r?`is-plantilla`:`is-dia`}" id="coord-editor" tabindex="-1" aria-labelledby="coord-editor-title">
      <div class="coord-editor-mode" role="note">
        ${g(r?`calendarCheck`:`alertTriangle`,`coord-icon`)}
        <div>
          <p class="coord-editor-kicker">${r?`Estás editando la SEMANA`:`Estás editando SOLO UN DÍA`}</p>
          <h3 id="coord-editor-title">${R(e.ruta)} · ${r?`${R(e.dia)} · ${R(e.turno)}`:`${R(Jc(e.fecha))} · ${R(e.turno)}`}</h3>
          <p>${r?`Se repite todos los ${R(e.dia.toLowerCase())}. Si es algo de un solo día, usá «Guardar solo para un día».`:`La semana no cambia. Este cambio manda sobre la semana solo ese día.`}${e.nuevo?` Ruta nueva.`:``}</p>
        </div>
      </div>

      ${n?`
        <div class="coord-editor-sol" role="note">
          <p><b>Pedido de ${R(n.creadoPorNombre||`supervisión`)}:</b> ${R(n.titulo||n.tipo||``)}${n.detalle?` · ${R(n.detalle)}`:``}${n.motivo?` · Motivo: ${R(n.motivo)}`:``}</p>
          ${e.precarga?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>${R(e.precarga)}</span></p>`:``}
          <div class="coord-field is-wide">
            <label for="coord-ed-respuesta">Respuesta para el supervisor (opcional)</label>
            <input id="coord-ed-respuesta" type="text" value="${R(e.respuesta)}" data-coord-ed-field="respuesta" placeholder="Ej.: Listo, ya lo saqué de la ruta." autocomplete="off" />
          </div>
        </div>`:``}

      ${xd(`editor`)}

      <div class="coord-grid coord-editor-team">
        ${e.nuevo?`
          <div class="coord-field">
            <label for="coord-ed-ruta">Código de la ruta</label>
            <input id="coord-ed-ruta" type="text" value="${R(e.ruta)}" data-coord-ed-field="ruta" autocomplete="off" aria-describedby="coord-ed-ruta-hint" />
            <small id="coord-ed-ruta-hint">Ej.: PJ_2M (mañana) o PJ_3T (tarde).</small>
          </div>`:``}
        <div class="coord-field">
          <label for="coord-ed-paseador">Paseador</label>
          <input id="coord-ed-paseador" type="text" list="coord-team-users" value="${R(e.paseador)}" data-coord-ed-field="paseador" autocomplete="off" aria-describedby="coord-ed-paseador-hint" />
          <small id="coord-ed-paseador-hint">Usuario de la app (ej.: sebastian).</small>
        </div>
        <div class="coord-field">
          <label for="coord-ed-ayudante">Ayudante</label>
          <input id="coord-ed-ayudante" type="text" list="coord-team-users" value="${R(e.ayudante)}" data-coord-ed-field="ayudante" autocomplete="off" placeholder="Sin ayudante" />
        </div>
        <div class="coord-field">
          <label for="coord-ed-supervisor">Supervisa</label>
          <input id="coord-ed-supervisor" type="text" list="coord-team-names" value="${R(e.supervisor)}" data-coord-ed-field="supervisor" autocomplete="off" />
        </div>
      </div>

      <div class="coord-add" role="group" aria-labelledby="coord-add-title">
        <h4 id="coord-add-title">${g(`plus`,`coord-icon`)}<span>Agregar un perro</span></h4>
        <div class="coord-add-row">
          <div class="coord-field coord-add-search">
            <label for="coord-ed-buscar">Buscar perro</label>
            <input id="coord-ed-buscar" type="search" value="${R(mu)}" data-coord-ed-search autocomplete="off" placeholder="Nombre del perro" aria-controls="coord-ed-results" />
          </div>
          <div class="coord-field coord-add-hora">
            <label for="coord-ed-nueva-hora">Hora de retiro</label>
            <input id="coord-ed-nueva-hora" type="time" step="300" value="${R(a)}" data-coord-ed-hora aria-describedby="coord-ed-nueva-hora-hint" />
            <small id="coord-ed-nueva-hora-hint">Sugerida: la última + 15 min.</small>
          </div>
        </div>
        <div id="coord-ed-results" aria-live="polite">${Vd()}</div>
      </div>

      <div class="coord-stops-head">
        <h4>Paradas en orden <span>${e.paradas.length}</span></h4>
        ${e.paradas.length>1?W(`Ordenar por hora`,`id="coord-ed-sort" data-coord-ed-sort`,`ghost`,`clock`):``}
      </div>
      ${e.paradas.length?`<ol class="coord-stops">${e.paradas.map((e,n)=>Bd(e,n,t)).join(``)}</ol>`:`<p class="coord-empty is-small">La ruta no tiene perros todavía. Buscalos arriba.</p>`}

      ${Td(t.list,`coord-ed-warnings`)}

      <div class="coord-field is-wide">
        <label for="coord-ed-notas">Notas de la ruta</label>
        <textarea id="coord-ed-notas" rows="2" data-coord-ed-field="notas" placeholder="Ej.: arrancar por Mapuche">${R(e.notas)}</textarea>
      </div>

      <div class="coord-editor-save">
        ${r?`
          <div class="coord-save-box is-main">
            <p><b>Guardar en la semana:</b> cambia todos los ${R(e.dia.toLowerCase())}.</p>
            ${W(`Guardar en la semana`,`id="coord-ed-save" data-coord-ed-save="plantilla"`,`primary`,`checkCircle`)}
          </div>
          <div class="coord-save-box">
            <div class="coord-field">
              <label for="coord-ed-solodia">¿Es solo por un día? Elegí cuál</label>
              <select id="coord-ed-solodia" data-coord-ed-field="soloDia">
                ${i.map(t=>`<option value="${t}" ${t===e.soloDia?`selected`:``}>${R(Jc(t))}${t===y()?` (hoy)`:``}${nu().some(n=>n.id===eu(t,e.ruta))?` · ya tiene un cambio: se reemplaza`:``}</option>`).join(``)}
              </select>
            </div>
            ${W(`Guardar solo para ese día`,`id="coord-ed-save-dia" data-coord-ed-save="dia"`,`secondary`)}
          </div>`:`
          <div class="coord-save-box is-main">
            <p><b>Guardar solo para el ${R(Jc(e.fecha).toLowerCase())}.</b>${n?` El pedido del supervisor queda como aplicado.`:``}</p>
            ${W(`Guardar solo para el ${R(Uc(e.fecha))}`,`id="coord-ed-save" data-coord-ed-save="dia"`,`primary`,`checkCircle`)}
          </div>
          ${e.existeDia&&Pl(e.existeDia)?`
            <div class="coord-save-box">
              <p>¿Ese día tiene que quedar igual que la semana?</p>
              ${W(`Volver a la ruta de la semana`,`id="coord-ed-revert" data-coord-ed-revert`,`ghost`)}
            </div>`:``}`}
      </div>

      ${gu===`salir`?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-salir-q">
          <p id="coord-salir-q"><b>Tenés cambios sin guardar.</b> ¿Salir igual y descartarlos?</p>
          <div class="coord-actions">
            ${W(`Sí, descartar`,`id="coord-ed-close-ok" data-coord-ed-close-ok`,`primary`)}
            ${W(`Seguir editando`,`id="coord-ed-close-cancel" data-coord-ed-close-cancel`,`ghost`)}
          </div>
        </div>`:``}

      <div class="coord-actions coord-editor-foot">
        ${W(`Copiar para WhatsApp`,`id="coord-ed-copy" data-coord-ed-copy`,`ghost`,`copy`)}
        ${W(e.sucio?`Cerrar sin guardar`:`Volver`,`id="coord-ed-close" data-coord-ed-close`,`ghost`,`x`)}
      </div>
    </div>
  `}function Ud(){let e=Pu(),t=Fu(),n=e.filter(e=>(e.estado||`pendiente`)!==`pendiente`),r=`
    <p class="coord-note">${g(`users`,`coord-icon`)}<span>El supervisor mira las rutas y, si habló con alguien o pasó algo, te pide el cambio. Vos lo aplicás o lo rechazás con una respuesta: la ve el supervisor.</span></p>
    ${xd(`solicitudesTodas`)}
    <h3 class="coord-subtitle">Pendientes <span>${t.length}</span></h3>
    ${t.length?`<ul class="coord-sol-list">${t.map(e=>jd(e)).join(``)}</ul>`:`<p class="coord-empty is-small">${Cl.has(`solicitudes`)?`No hay pedidos pendientes.`:`Cargando…`}</p>`}
    ${n.length?`
      <details class="coord-more" ${nl(`solHist`)?`open`:``}>
        <summary data-coord-toggle="solHist">Respondidos en las últimas 2 semanas (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-sol-list">${n.map(e=>jd(e,{compact:!0})).join(``)}</ul>
      </details>`:``}
  `;return Sd({key:`solicitudes`,id:`coord-solicitudes`,iconName:`bell`,title:`Pedidos de cambio del supervisor`,intro:`Aplicalos en la ruta del día o respondé por qué no.`,badges:t.length?G(`${t.length} ${t.length===1?`pendiente`:`pendientes`}`,`alert`):G(`Al día`,`neutral`),body:r})}function Wd(e){return(Array.isArray(e)?e:[]).map(e=>pl.get(e)?.name||e)}function Gd(e){let t=R(e.id),n=zu.find(([t])=>t===e.estado)||zu[0],r=Wd(e.perros);return`
    <li class="coord-card coord-cliente is-${R(n[0])}">
      <div class="coord-card-head">
        <strong>${R(e.nombre||`Pendiente de confirmar`)}</strong>
        ${G(n[1],n[0]===`activo`?`ok`:n[0]===`pausa`?`warn`:`neutral`)}
      </div>
      ${wd([[`Perros`,r.length?Qc(r):b],[`Barrio`,e.barrio],[`Plan`,e.plan&&e.plan!==`Pendiente de confirmar`?e.plan:``],[`Días`,Array.isArray(e.dias)&&e.dias.length?el(e.dias):``],[`Turno`,e.turno&&e.turno!==`Pendiente de confirmar`?e.turno:``],[`Teléfono`,e.telefono],[`Notas`,e.notas]],`is-compact`)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      <div class="coord-actions">
        ${ld(e.telefono,`Hola ${e.nombre||``}, te escribo de Paseos Juan.`.replace(` ,`,`,`),`secondary`,`WhatsApp`)}
        ${W(`Editar`,`id="coord-cli-edit-${t}" data-coord-cliente-edit="${t}"`,`ghost`,`sliders`)}
      </div>
    </li>
  `}function Kd(){let e=z(Uu),t=Wu();return e?t.filter(t=>z([t.nombre,t.barrio,t.telefono,t.notas,...Wd(t.perros)].join(` `)).includes(e)):t}function qd(){let e=Kd();return e.length?`<ul class="coord-card-list is-grid">${e.map(Gd).join(``)}</ul>`:`<p class="coord-empty is-small">${Cl.has(`clientes`)?Uu?`Ningún cliente coincide con la búsqueda.`:`Todavía no hay clientes cargados.`:`Cargando clientes…`}</p>`}function Jd(){let e=Wu(),t=md(`cliente`),n=!!t.id,r=Array.isArray(t.perros)?t.perros:[],i=Array.isArray(t.dias)?t.dias:[],a=e.filter(e=>(e.estado||`activo`)===`activo`).length,o=C.slice().sort((e,t)=>e.name.localeCompare(t.name,`es`)),s=`
    ${xd(`clientes`)}
    <div class="coord-field coord-search">
      <label for="coord-clientes-buscar">Buscar cliente</label>
      <input id="coord-clientes-buscar" type="search" value="${R(Uu)}" data-coord-clientes-buscar placeholder="Tutor, perro o barrio" autocomplete="off" aria-controls="coord-clientes-lista" />
    </div>
    <div id="coord-clientes-lista" aria-live="polite">${qd()}</div>

    <form class="coord-form" id="coord-cliente-form" data-coord-form="cliente" novalidate tabindex="-1">
      <h3>${n?`Editando a ${R(t.nombre||`un cliente`)}`:`Cargar un cliente`}</h3>
      ${t.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Completado con los datos de un pedido. Revisalo antes de guardar.</span></p>`:``}
      <input type="hidden" name="id" value="${R(t.id||``)}" />
      <input type="hidden" name="pedidoId" value="${R(t.pedidoId||``)}" />
      <div class="coord-grid">
        ${vd(`cliente`,`nombre`,`Nombre del tutor`,{value:t.nombre,required:!0,attrs:`autocomplete="off"`})}
        ${vd(`cliente`,`telefono`,`Teléfono`,{value:t.telefono,type:`tel`,attrs:`autocomplete="off" inputmode="tel"`,hint:`Celular con código de área (ej.: 11 1234-5678).`})}
        ${vd(`cliente`,`barrio`,`Barrio`,{value:t.barrio,attrs:`list="coord-barrios" autocomplete="off"`,hint:`Elegí uno o escribí otro.`})}
        ${U(`cliente`,`plan`,`Plan`,Bu,{value:t.plan||`Pendiente de confirmar`})}
        ${U(`cliente`,`turno`,`Turno`,Vu,{value:t.turno||`Pendiente de confirmar`})}
        ${U(`cliente`,`estado`,`Estado`,zu,{value:t.estado||`activo`})}
        <div class="coord-field is-wide">
          <span class="coord-label" id="coord-cliente-perros-label">Perros${r.length?` (${r.length})`:``}</span>
          <input id="coord-cliente-perros-buscar" type="search" data-coord-filter-perros placeholder="Filtrar perros" autocomplete="off" aria-label="Filtrar la lista de perros" />
          <div class="coord-checks" role="group" aria-labelledby="coord-cliente-perros-label">
            ${o.map(e=>`<label class="coord-check" data-name="${R(z(e.name))}"><input type="checkbox" id="coord-cliente-perro-${e.id}" name="perros" value="${e.id}" ${r.includes(e.id)?`checked`:``} /><span>${R(e.name)} <small>${R(e.size)}</small></span></label>`).join(``)}
          </div>
          <small>Si el perro todavía no está en el registro, anotalo en notas y cargá su ficha en «Alta de perro nuevo».</small>
        </div>
        ${bd(`cliente`,i)}
        ${yd(`cliente`,`notas`,`Notas`,{value:t.notas,hint:`Lo operativo: llaves, portería, horarios. Sin datos de salud ni de pago.`})}
      </div>
      <datalist id="coord-barrios">${Yu().map(e=>`<option value="${R(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">
        ${W(n?`Guardar cambios`:`Guardar cliente`,`id="coord-cliente-save" data-coord-cliente-save`,`primary`,`plus`)}
        ${n||t.pedidoId?W(`Cancelar`,`data-coord-cliente-cancel`,`ghost`):``}
      </div>
    </form>
  `;return Sd({key:`clientes`,id:`coord-clientes`,iconName:`users`,title:`Clientes`,intro:`Tutores, sus perros, plan, días y turno. Solo lo ven Juan y coordinación.`,badges:e.length?G(`${a} ${a===1?`activo`:`activos`}`,`neutral`):``,body:s})}function Yd(){let e=md(`aviso`),t=y(),n=Gu(),r=n.filter(e=>Ku(e,t)),i=n.filter(e=>!Ku(e,t)).slice(0,20),a=`
    ${xd(`avisos`)}
    <form class="coord-form" data-coord-form="aviso" novalidate>
      <h3>Cargar un aviso</h3>
      <div class="coord-grid">
        ${vd(`aviso`,`barrio`,`Barrio`,{value:e.barrio,required:!0,attrs:`list="coord-barrios-aviso" autocomplete="off"`})}
        ${U(`aviso`,`tipo`,`Tipo`,Hu,{value:e.tipo||Hu[0]})}
        ${vd(`aviso`,`vigenteHasta`,`Vigente hasta`,{value:e.vigenteHasta||t,type:`date`,attrs:`min="${t}"`})}
        ${yd(`aviso`,`mensaje`,`Qué pasa`,{value:e.mensaje,required:!0,placeholder:`Ej.: Corte de calle en la entrada principal. Entrar por la puerta 2.`})}
      </div>
      <datalist id="coord-barrios-aviso">${Yu().map(e=>`<option value="${R(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${W(`Guardar aviso`,`id="coord-aviso-save" data-coord-aviso-save`,`primary`,`plus`)}</div>
    </form>
    <div class="coord-subblock">
      <h3>Vigentes <span>${r.length}</span></h3>
      ${r.length?`<p class="coord-meta">Están arriba, agrupados por barrio.</p>`:`<p class="coord-empty is-small">${Cl.has(`avisos`)?`No hay avisos vigentes.`:`Cargando…`}</p>`}
    </div>
    ${i.length?`
      <details class="coord-more" ${nl(`avisosViejos`)?`open`:``}>
        <summary data-coord-toggle="avisosViejos">Avisos vencidos (${i.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-aviso-list">${i.map(e=>Nd(e,{history:!0})).join(``)}</ul>
      </details>`:``}
  `;return Sd({key:`avisos`,id:`coord-avisos`,iconName:`mapPin`,title:`Avisos por barrio`,intro:`Obras, cortes, perros sueltos, clima o seguridad. Los ve todo el equipo.`,badges:r.length?G(`${r.length} ${r.length===1?`vigente`:`vigentes`}`,`warn`):``,body:a})}function Xd(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return wd([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function Zd(e,t,n){let r=td(e),i=e.origen===`web`,a=e.datos||{},o=R(e.id),s=t.get(e.id),c=n.get(e.id),l={nuevo:W(`Empezar`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)+W(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`ghost`),"en-curso":W(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`secondary`)+W(`Volver a nuevo`,`data-coord-pedido-move="${o}" data-estado="nuevo"`,`ghost`),resuelto:W(`Reabrir`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)}[r],u=`pedido-${e.id}`,d=r!==`resuelto`||il.has(u),f=(i||/evaluaci/i.test(e.tipo||``))&&!s&&r!==`resuelto`,p=i?r===`resuelto`?`<details class="coord-card-more" ${d?`open`:``}><summary data-coord-mem-toggle="${R(u)}">Ver datos del formulario ${g(`chevronDown`,`coord-icon`)}</summary>${Xd(e)}</details>`:Xd(e):`<p class="coord-card-dog">${g(`pawPrint`,`coord-icon`)}${R(ad(e)||`Pendiente de confirmar`)}</p>${e.detalle?`<p>${R(e.detalle)}</p>`:``}`,m=a.responsable?`Hola ${a.responsable}`:`Hola`;return`
    <li class="coord-card ${i?`is-web`:``}" id="coord-pedido-${o}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${R(i?a.perro||`Pendiente de confirmar`:e.tipo||`Pedido`)}</strong>
        <small>${i?R(e.tipo||`Formulario web`):`${R(Uc(e.fecha))}${a.canal?` · ${R(a.canal)}`:``}`}</small>
      </div>
      ${i?`<p class="coord-badges">${G(`Formulario web`,`warn`)}</p>`:``}
      ${p}
      ${Fl(e,{web:i})}
      ${s?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Ficha creada para ${R(s.perroNombre)}</span></p>`:``}
      ${c?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Cliente cargado: ${R(c.nombre)}</span></p>`:``}
      <div class="coord-actions">
        ${r!==`resuelto`&&i?ld(a.telefono,`${m}, te escribo de Paseos Juan por el pedido de evaluación de ${a.perro||`tu perro`}.`,`primary`):``}
        ${l}
        ${!c&&(i||a.responsable)?W(`Convertir en cliente`,`data-coord-pedido-cliente="${o}"`,`ghost`,`userPlus`):``}
        ${f?W(`Armar ficha con estos datos`,`data-coord-pedido-ficha="${o}"`,`ghost`,`fileText`):``}
        ${r===`resuelto`&&Pl(e)?W(`Borrar`,`data-coord-pedido-delete="${o}"`,`ghost`):``}
      </div>
    </li>
  `}function Qd(){let e=nd(),t=md(`pedido`),n=e.filter(e=>td(e)!==`resuelto`).length,r=od(e).length,i=new Map(rd().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),a=new Map(Wu().filter(e=>e.pedidoId).map(e=>[e.pedidoId,e])),o=!Cl.has(`pedidos`)&&!e.length,s=`
    ${xd(`pedidos`)}
    <div class="coord-board">
      ${$u.map(([t,n])=>{let r=e.filter(e=>td(e)===t);return t===`nuevo`&&r.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`)),`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(e=>Zd(e,i,a)).join(``)}</ul>`:`<p class="coord-empty is-small">${o?`Cargando…`:t===`nuevo`?`Sin pedidos nuevos.`:t===`en-curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${U(`pedido`,`tipo`,`Tipo de pedido`,Zu,{value:t.tipo})}
        ${vd(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre del perro o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${U(`pedido`,`canal`,`Llegó por`,Qu,{value:t.canal})}
        ${yd(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${C.map(e=>`<option value="${R(e.name)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${W(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>
  `;return Sd({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Los del formulario de la web y los que cargás vos.`,badges:`${r?G(`${r} ${r===1?`nuevo`:`nuevos`} de la web`,`alert`):``}${n?G(`${n} abiertos`,`warn`):G(`Sin pedidos abiertos`,`neutral`)}`,body:s,open:r>0})}function $d(e){let t=e.datos||{},n=ml.get(z(t.perro));return{pedidoId:e.id,nombre:t.responsable||``,telefono:t.telefono||``,barrio:[t.zona,t.referencia].filter(Boolean).join(` · `),perros:n?[n.id]:[],plan:b,dias:dd(t.dias),turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,estado:`activo`,notas:[`Desde el pedido del ${Uc(e.fecha)}.`,!n&&t.perro?`Perro: ${t.perro} (todavía sin ficha en el registro).`:``].filter(Boolean).join(` `)}}function ef(e,t){let n=t?t.actualizadoPorNombre||t.creadoPorNombre:``;return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${R(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?G(`Activo`,`neutral`):G(R(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${R(e.plan)} · ${R(e.size)} · ${R(tl(e))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${R(e.review||`Estado "${e.status}".`)}</p>
      ${Cd(e)}
      ${t?.nota?`<p class="coord-meta">${R(t.nota)}</p>`:``}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Resuelto${n?` por ${R(n)}`:``}${t.actualizadoEn?` el ${Wc(t.actualizadoEn)}`:``}${t.pendiente?` (sin señal: se enviará cuando vuelva)`:``}</span></p>${W(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:W(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function tf(){let e=id(),t=hl.filter(t=>!e[t.id]),n=hl.filter(t=>e[t.id]),r=`
    <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
    ${xd(`datos`)}
    ${t.length?`<ul class="coord-review-list">${t.map(e=>ef(e)).join(``)}</ul>`:`<p class="coord-empty">${g(`checkCircle`,`coord-icon`)}No quedan datos por confirmar.</p>`}
    ${n.length?`
      <details class="coord-more" ${nl(`datosResueltos`)?`open`:``}>
        <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-review-list">${n.map(t=>ef(t,e[t.id])).join(``)}</ul>
      </details>`:``}
    <p class="coord-note">${g(`fileText`,`coord-icon`)}<span>El cambio todavía debe incorporarse al ${R(Ft.officialSources.dogs.toLowerCase())}.</span></p>
  `;return Sd({key:`datos`,id:`coord-datos`,iconName:`help`,title:`Datos a confirmar`,intro:`${n.length} de ${hl.length} resueltos.`,badges:t.length?G(`${t.length} pendientes`,`warn`):G(`Todo confirmado`,`ok`),body:r})}var nf=[b,`Sí`,`No`];function rf(){let e=md(`alta`),t=rd(),n=Array.isArray(e.dias)?e.dias:[],r=[b,...Rt.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${g(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${xd(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${e.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>`:``}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${vd(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${U(`alta`,`tamano`,`Tamaño`,[b,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${vd(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${vd(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${U(`alta`,`sexo`,`Sexo`,[b,`Macho`,`Hembra`],{value:e.sexo})}
          ${U(`alta`,`castrado`,`Castrado o castrada`,nf,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${vd(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${vd(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${vd(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${U(`alta`,`zona`,`Zona`,[b,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${vd(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${U(`alta`,`vacunas`,`Vacunas al día`,nf,{value:e.vacunas})}
          ${vd(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${yd(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${U(`alta`,`sujecion`,`Collar o pechera`,[b,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${U(`alta`,`bozal`,`Usa bozal`,nf,{value:e.bozal})}
          ${U(`alta`,`correa`,`Tiene correa propia`,nf,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${e.relatoTutor?yd(`alta`,`relatoTutor`,`Lo que contó el tutor en el formulario (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${yd(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,span:!1})}
          ${yd(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${yd(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${vd(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${U(`alta`,`plan`,`Plan pedido`,r,{value:e.plan})}
          ${U(`alta`,`turno`,`Turno`,[b,`Mañana`,`Tarde`],{value:e.turno})}
          ${bd(`alta`,n)}
        </div>
      </fieldset>
      <div class="coord-actions">
        ${W(`Guardar ficha`,`data-coord-alta-save`,`primary`,`plus`)}
        ${W(`Vaciar formulario`,`data-coord-alta-clear`,`ghost`)}
      </div>
    </form>
    <div class="coord-subblock">
      <h3>Fichas cargadas <span>${t.length}</span></h3>
      ${t.length?`
        <ul class="coord-card-list is-grid">
          ${t.map(e=>{let t=e.datos||{},n=Array.isArray(t.dias)?t.dias:[];return`
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${R(e.perroNombre||t.nombre||`Pendiente de confirmar`)}</strong>
                <small>Alta ${R(Uc(e.fecha))}</small>
              </div>
              <p class="coord-badges">${G(R(e.categoria||`SIN EVALUAR`),`neutral`)} ${G(`Primer paseo individual`,`warn`)}</p>
              <p>${R(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:t.tamano)} · Días: ${n.length?R(el(n).toLowerCase()):`pendientes`} · Turno: ${R(!t.turno||t.turno===`Pendiente de confirmar`?`pendiente`:t.turno.toLowerCase())}</p>
              ${Fl(e)}
              <div class="coord-actions">
                ${W(`Copiar ficha`,`data-coord-alta-copy="${R(e.id)}"`,`ghost`,`copy`)}
                ${Pl(e)?W(`Borrar`,`data-coord-alta-delete="${R(e.id)}"`,`ghost`):``}
              </div>
            </li>`}).join(``)}
        </ul>`:`<p class="coord-empty is-small">${Cl.has(`fichas`)?`Todavía no hay perros nuevos cargados.`:`Cargando fichas…`}</p>`}
    </div>
  `;return Sd({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?G(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function af(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${Uc(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):b}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function of(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>z(t.zona)===z(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:b,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,dias:dd(t.dias)}}function sf(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>pl.get(e)?.name||e);return t.length?Qc(t):``}function cf(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||Nl(e,t)}function lf(e,t){let n=sf(e),r=e.titulo||(t===`incidente`?`Incidente`:`Observación`),i=e.riesgo?String(e.riesgo):``,a=t===`incidente`?[[`Perro`,n],[`Lugar`,e.lugar],[`Barrio`,e.barrio],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Perro`,n],[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]];return`
    <li class="coord-card coord-feed-item ${t===`incidente`?`is-incident`:``}">
      <div class="coord-card-head">
        <strong>${R(r)}</strong>
        <small>${R(Uc(e.fecha))}${e.hora?` · ${R(e.hora)}`:``}</small>
      </div>
      ${i?`<p class="coord-badges">${G(`Riesgo: ${R(i)}`,/alto|grave/i.test(i)?`alert`:`warn`)}</p>`:``}
      ${wd(a)}
      ${Fl(e)}
    </li>
  `}function uf(){let e=Yc(6),t=Sl(`incidentes`).filter(t=>!t.fecha||t.fecha>=e).sort(cf),n=Sl(`observaciones`).filter(t=>!t.fecha||t.fecha>=e).sort(cf),r=`
    <p class="coord-note">${g(`eye`,`coord-icon`)}<span>Solo lectura. Las cargan los paseadores y supervisión. Últimos 7 días (desde el ${R(Uc(e))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${t.length}</span></h3>
        ${t.length?`<ul class="coord-card-list">${t.map(e=>lf(e,`incidente`)).join(``)}</ul>`:`<p class="coord-empty is-small">${Cl.has(`incidentes`)?`Sin incidentes en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${n.length}</span></h3>
        ${n.length?`<ul class="coord-card-list">${n.map(e=>lf(e,`observacion`)).join(``)}</ul>`:`<p class="coord-empty is-small">${Cl.has(`observaciones`)?`Sin observaciones en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
    </div>
  `;return Sd({key:`actividad`,id:`coord-actividad`,iconName:`activity`,title:`Observaciones e incidentes`,intro:`Lo que registró el equipo en la calle en los últimos 7 días.`,badges:`${t.length?G(`${t.length} ${t.length===1?`incidente`:`incidentes`}`,`alert`):``}${n.length?G(`${n.length} ${n.length===1?`observación`:`observaciones`}`,`neutral`):``}`,body:r})}function df(e,t,n){rl(e,!0),$(),ol(t,n)}async function ff(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function pf(e,t,n){ff(e).then(e=>{L(t,e?n:`No se pudo copiar. Probá de nuevo o copialo a mano.`,e?`ok`:`error`),jl()})}function mf(e,t){return e.find(e=>e.id===t)}function hf(e){yu=e,xu(`dia`),$(),ol(`coord-rutas`)}async function gf(e){let t=ju();if(t){L(`editor`,t[0],`error`),$(),B(t[1]);return}let n=Au(),r=H,i;if(e===`plantilla`)i=await Ll(`plantillas`,{id:$l(n.ruta,n.dia),...n},{section:`rutas`,ok:`${n.ruta} del ${n.dia.toLowerCase()} guardada en la semana. Se repite todas las semanas.`});else{let e=r.modo===`plantilla`?r.soloDia:r.fecha;if(!Gc(e)){L(`editor`,`Elegí el día.`,`error`),$();return}if(i=await Ll(`rutas`,{id:eu(e,n.ruta),fecha:e,...n,dia:qc(e),basadaEn:r.plantillaId||``},{section:`rutas`,ok:`${n.ruta}: cambio guardado solo para el ${Jc(e).toLowerCase()}. La semana no cambió.`}),i&&r.solicitudId){let t=Pu().find(e=>e.id===r.solicitudId);await Ll(`solicitudes`,{id:r.solicitudId,fecha:Gc(t?.fecha)?t.fecha:e,estado:`aplicado`,respuesta:r.respuesta.trim()||`Aplicado en la ruta ${n.ruta} del ${Uc(e)}.`},{section:`rutas`,ok:`Cambio aplicado y pedido del supervisor marcado como aplicado.`})}i&&(yu=e,xu(`dia`))}i&&H===r&&(Tu(),$(),ol(`coord-rutas`))}function _f(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target,n=t.closest(`[data-coord-toggle]`);if(n){let e=n.parentElement;return rl(n.dataset.coordToggle,!e.open),!0}let r=t.closest(`[data-coord-mem-toggle]`);if(r){let e=r.dataset.coordMemToggle;return r.parentElement.open?il.delete(e):il.add(e),!0}if(t.closest(`[data-coord-retry]`))return Al(),Bl=!1,Bc(`Volviendo a pedir los datos.`),!0;let i=t.closest(`[data-coord-goto]`);if(i)return ol(i.dataset.coordGoto),!0;let a=t.closest(`[data-coord-goto-pedido]`);if(a)return df(`pedidos`,`coord-pedido-${a.dataset.coordGotoPedido}`),!0;let o=t.closest(`[data-coord-open]`);if(o){let e=o.dataset.coordOpen,t={avisos:`#coord-aviso-barrio`,clientes:`#coord-clientes-buscar`}[e]||null;return df(e,`coord-${e}`,t),!0}if(t.closest(`[data-coord-undo]`)){let e=Lc;if(Lc=null,e){let{pendiente:t,...n}=e.record;zl(`undo`,()=>Ll(e.col,n,{section:e.section,ok:`Listo, se recuperó.`}))}return!0}let s=t.closest(`[data-coord-vista]`);if(s)return xu(s.dataset.coordVista),$(),B(`coord-vista-${s.dataset.coordVista}`),!0;let c=t.closest(`[data-coord-ver-dia]`);if(c)return H?(ol(`coord-rutas`),!0):(hf(c.dataset.coordVerDia),!0);if(t.closest(`[data-coord-carga]`))return _u=!0,$(),B(`coord-carga-ok`),!0;if(t.closest(`[data-coord-carga-cancel]`))return _u=!1,$(),B(`coord-carga`),!0;if(t.closest(`[data-coord-carga-ok]`))return zl(`carga`,async()=>{let e=$t(),t=0,n=0,r=``;for(let i of e){vu=`Guardando ${t+1} de ${e.length}…`,jl();try{let e=await v.save(`plantillas`,i);t+=1,e.pendiente&&(n+=1)}catch(e){r=e.message}}_u=!1,vu=``,r?L(`rutas`,`Se guardaron ${t} de ${e.length} rutas. Error: ${r}`,`error`):L(`rutas`,`Listo: ${t} rutas cargadas en la semana.${n?` Sin señal: se envían cuando vuelva.`:``}`),xu(`semana`),jl()}),!0;let l=t.closest(`[data-coord-edit-plantilla]`);if(l){let e=mf(tu(),l.dataset.coordEditPlantilla);return e&&(wu(e,{modo:`plantilla`}),$(),ol(`coord-editor`)),!0}let u=t.closest(`[data-coord-new-route]`);if(u){let{dia:e,turno:t}=u.dataset;return wu({ruta:Eu(ru(e),t),dia:e,turno:t,paradas:[],supervisor:``},{modo:`plantilla`,nuevo:!0}),$(),ol(`coord-editor`,`#coord-ed-ruta`),!0}let d=t.closest(`[data-coord-edit-dia]`);if(d){let e=d.dataset.fecha,t=iu(e).find(e=>e.ruta===d.dataset.coordEditDia);return t&&(wu(t,{modo:`dia`,fecha:e}),$(),ol(`coord-editor`)),!0}let f=t.closest(`[data-coord-new-dia]`);if(f){let{fecha:e,turno:t}=f.dataset;return wu({ruta:Eu(iu(e),t),dia:qc(e),turno:t,paradas:[]},{modo:`dia`,fecha:e,nuevo:!0}),$(),ol(`coord-editor`,`#coord-ed-ruta`),!0}let p=t.closest(`[data-coord-copy-ruta]`);if(p){let e=p.dataset.fecha,t=iu(e).find(e=>e.ruta===p.dataset.coordCopyRuta);return t&&pf(pu(t,{fecha:e}),`rutas`,`${t.ruta} copiada. Pegala en el grupo de WhatsApp del equipo.`),!0}let m=t.closest(`[data-coord-copy-dia]`);if(m){let e=m.dataset.coordCopyDia;return pf(iu(e).map(t=>pu(t,{fecha:e})).join(`

`),`rutas`,`Rutas del ${Jc(e).toLowerCase()} copiadas.`),!0}if(H){let e=t.closest(`[data-coord-add-dog]`);if(e){let t=pl.get(e.dataset.coordAddDog);return t&&(Ou(t),Bc(`${t.name} agregado a las ${H.paradas[H.paradas.length-1].hora}.`),$(),B(`coord-ed-buscar`)),!0}if(t.closest(`[data-coord-add-libre]`)){let e=mu.trim();return e&&(Ou(null,e),Bc(`${e} agregado como perro sin ficha.`),$(),B(`coord-ed-buscar`)),!0}let n=t.closest(`[data-coord-stop-up]`),r=t.closest(`[data-coord-stop-down]`);if(n||r){let e=Number((n||r).dataset[n?`coordStopUp`:`coordStopDown`]),t=n?e-1:e+1;if(t>=0&&t<H.paradas.length){[H.paradas[e],H.paradas[t]]=[H.paradas[t],H.paradas[e]],H.sucio=!0,$();let r=document.getElementById(`coord-ed-${n?`up`:`down`}-${t}`);B(r&&!r.disabled?r.id:`coord-ed-hora-${t}`),Bc(`${H.paradas[t].perroNombre} ahora es la parada ${t+1}.`)}return!0}let i=t.closest(`[data-coord-stop-del]`);if(i){let e=Number(i.dataset.coordStopDel),[t]=H.paradas.splice(e,1);return H.sucio=!0,Bc(`${t?.perroNombre||`Perro`} quitado de la ruta.`),$(),B(H.paradas.length?`coord-ed-hora-${Math.min(e,H.paradas.length-1)}`:`coord-ed-buscar`),!0}if(t.closest(`[data-coord-ed-sort]`))return ku(),Bc(`Paradas ordenadas por hora.`),$(),B(`coord-ed-sort`),!0;let a=t.closest(`[data-coord-ed-save]`);if(a)return zl(`editor-save`,()=>gf(a.dataset.coordEdSave)),!0;if(t.closest(`[data-coord-ed-revert]`)){let e=H.existeDia;return zl(`editor-revert`,async()=>{await Rl(`rutas`,e,{section:`rutas`,ok:`${e.ruta} del ${Uc(e.fecha)} vuelve a ser igual que la semana.`,undo:!1})&&(Tu(),jl())}),!0}if(t.closest(`[data-coord-ed-copy]`))return pf(pu(Au(),H.modo===`dia`?{fecha:H.fecha}:{}),`editor`,`Ruta copiada. Pegala en el grupo de WhatsApp del equipo.`),!0;if(t.closest(`[data-coord-ed-close]`))return H.sucio?(gu=`salir`,$(),B(`coord-ed-close-cancel`)):(Tu(),$(),ol(`coord-rutas`)),!0;if(t.closest(`[data-coord-ed-close-ok]`))return Tu(),$(),ol(`coord-rutas`),!0;if(t.closest(`[data-coord-ed-close-cancel]`))return gu=``,$(),B(`coord-ed-close`),!0}let h=t.closest(`[data-coord-sol-aplicar]`);if(h){let e=mf(Pu(),h.dataset.coordSolAplicar);return e?H?.sucio&&H.solicitudId!==e.id?(L(`editor`,`Primero guardá o cerrá la ruta que estás editando.`,`error`),$(),ol(`coord-editor`),!0):(Ru(e),$(),ol(`coord-editor`),!0):!0}let ee=t.closest(`[data-coord-sol-rechazar]`);if(ee)return Nu=ee.dataset.coordSolRechazar,$(),B(`coord-rechazo-${Nu}`),!0;if(t.closest(`[data-coord-sol-rechazar-cancel]`)){let e=Nu;return Nu=``,$(),B(`coord-rechazar-${e}`),!0}let te=t.closest(`[data-coord-sol-rechazar-ok]`);if(te){let e=te.dataset.coordSolRechazarOk,n=(document.getElementById(`coord-rechazo-${e}`)?.value||Mu[e]||``).trim(),r=t.closest(`#coord-solicitudes`)?`solicitudesTodas`:`solicitudes`;if(n.length<3)return L(r,`Escribí una respuesta corta para el supervisor.`,`error`),Mu[e]=n,$(),B(`coord-rechazo-${e}`),!0;let i=mf(Pu(),e);return zl(`sol-${e}`,async()=>{await Ll(`solicitudes`,{id:e,fecha:Gc(i?.fecha)?i.fecha:y(),estado:`rechazado`,respuesta:n},{section:r,ok:`Pedido rechazado. El supervisor ve tu respuesta.`})&&(delete Mu[e],Nu=``)}),!0}if(t.closest(`[data-coord-cliente-save]`)){let e=_d(t.closest(`[data-coord-form]`));if(hd(`cliente`,e),!e.nombre?.trim())return L(`clientes`,`Falta el nombre del tutor.`,`error`),$(),B(`coord-cliente-nombre`),!0;let n={nombre:e.nombre.trim(),telefono:e.telefono?.trim()||``,barrio:e.barrio?.trim()||``,perros:Array.isArray(e.perros)?e.perros:[],plan:e.plan||`Pendiente de confirmar`,dias:Array.isArray(e.dias)?e.dias:[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas?.trim()||``};return e.id&&(n.id=e.id),e.pedidoId&&(n.pedidoId=e.pedidoId),zl(`cliente-save`,async()=>{if(await Ll(`clientes`,n,{section:`clientes`,ok:e.id?`Cambios de ${n.nombre} guardados.`:`${n.nombre} quedó cargado como cliente.`})&&(gd(`cliente`),e.pedidoId&&!e.id)){let t=mf(nd(),e.pedidoId);t&&td(t)===`nuevo`&&await v.save(`pedidos`,{id:t.id,estado:`en-curso`}).catch(()=>{})}}),!0}if(t.closest(`[data-coord-cliente-cancel]`))return gd(`cliente`),L(`clientes`,`Formulario vacío.`),$(),!0;let ne=t.closest(`[data-coord-cliente-edit]`);if(ne){let e=mf(Wu(),ne.dataset.coordClienteEdit);return e&&(fd.cliente={id:e.id,pedidoId:e.pedidoId||``,nombre:e.nombre||``,telefono:e.telefono||``,barrio:e.barrio||``,perros:e.perros||[],plan:e.plan||`Pendiente de confirmar`,dias:e.dias||[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas||``},pd.delete(`cliente`),$(),ol(`coord-cliente-form`,`#coord-cliente-nombre`)),!0}if(t.closest(`[data-coord-aviso-save]`)){let e=_d(t.closest(`[data-coord-form]`));hd(`aviso`,e);let n=y(),r=e.barrio?.trim()?e.mensaje?.trim()?e.vigenteHasta&&(!Gc(e.vigenteHasta)||e.vigenteHasta<n)?[`La fecha de «vigente hasta» tiene que ser hoy o después.`,`coord-aviso-vigenteHasta`]:null:[`Escribí qué pasa.`,`coord-aviso-mensaje`]:[`Falta el barrio.`,`coord-aviso-barrio`];if(r)return L(`avisos`,r[0],`error`),$(),B(r[1]),!0;let i=e.barrio.trim(),a=Hu.includes(e.tipo)?e.tipo:`otro`;return zl(`aviso-save`,async()=>{await Ll(`avisos`,{fecha:n,barrio:i,tipo:a,mensaje:e.mensaje.trim(),vigenteHasta:e.vigenteHasta||n,titulo:`${a[0].toUpperCase()}${a.slice(1)} en ${i}`},{section:`avisos`,ok:`Aviso de ${i} guardado. Ya lo ve el equipo.`})&&gd(`aviso`)}),!0}let re=t.closest(`[data-coord-aviso-copy]`);if(re){let e=mf(Gu(),re.dataset.coordAvisoCopy),n=t.closest(`#coord-avisos`)?`avisos`:`avisosTop`;return e&&pf(Xu(e),n,`Aviso copiado. Pegalo en el grupo de WhatsApp del equipo.`),!0}let g=t.closest(`[data-coord-aviso-fin]`);if(g){let e=mf(Gu(),g.dataset.coordAvisoFin);return e&&zl(`aviso-${e.id}`,()=>Ll(`avisos`,{id:e.id,vigenteHasta:Kc(y(),-1)},{section:`avisos`,ok:`Aviso de ${e.barrio||`barrio`} marcado como terminado.`})),!0}let ie=t.closest(`[data-coord-resolve]`);if(ie){let e=ie.dataset.coordResolve,t=pl.get(e);return zl(`resuelto-${e}`,()=>Ll(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{section:`datos`,ok:`${t?.name||e}: marcado como resuelto.`})),!0}let ae=t.closest(`[data-coord-unresolve]`);if(ae){let e=ae.dataset.coordUnresolve,t=pl.get(e);return zl(`resuelto-${e}`,()=>Ll(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{section:`datos`,ok:`${t?.name||e}: volvió a pendientes.`})),!0}if(t.closest(`[data-coord-pedido-save]`)){let e=_d(t.closest(`[data-coord-form]`));if(hd(`pedido`,e),!e.perro?.trim()&&!e.detalle?.trim())return L(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),B(`coord-pedido-perro`),!0;let n=e.tipo||Zu[0],r=e.perro?.trim()||``;return zl(`pedido-save`,async()=>{await Ll(`pedidos`,{fecha:y(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:e.detalle?.trim()||``,datos:{perro:r,canal:e.canal||Qu[0]}},{section:`pedidos`,ok:`Pedido guardado en "Nuevo".`})&&gd(`pedido`)}),!0}let oe=t.closest(`[data-coord-pedido-move]`);if(oe){let e=oe.dataset.coordPedidoMove,t=oe.dataset.estado;return zl(`pedido-${e}`,()=>Ll(`pedidos`,{id:e,estado:t},{section:`pedidos`,ok:`Pedido movido a "${ed[t]}".`})),!0}let se=t.closest(`[data-coord-pedido-delete]`);if(se){let e=mf(nd(),se.dataset.coordPedidoDelete);return e&&zl(`pedido-${e.id}`,()=>Rl(`pedidos`,e,{section:`pedidos`,ok:`Pedido borrado.`})),!0}let ce=t.closest(`[data-coord-pedido-cliente]`);if(ce){let e=mf(nd(),ce.dataset.coordPedidoCliente);return e&&(fd.cliente=$d(e),pd.delete(`cliente`),L(`clientes`,`Formulario completado con el pedido de ${e.datos?.responsable||`la web`}. Revisalo y guardalo.`),df(`clientes`,`coord-cliente-form`,`#coord-cliente-nombre`)),!0}let le=t.closest(`[data-coord-pedido-ficha]`);if(le){let e=mf(nd(),le.dataset.coordPedidoFicha);return e&&(fd.alta=of(e),pd.delete(`alta`),L(`alta`,`Formulario completado con el pedido de ${ad(e)||`la web`}. Revisalo y guardalo.`),df(`alta`,`coord-alta`,`#coord-alta-nombre`)),!0}if(t.closest(`[data-coord-alta-save]`)){let e=_d(t.closest(`[data-coord-form]`));if(hd(`alta`,e),!e.nombre?.trim())return L(`alta`,`Falta el nombre del perro.`,`error`),$(),B(`coord-alta-nombre`),!0;let n=e.nombre.trim(),r={...e,nombre:n,dias:Array.isArray(e.dias)?e.dias:[],primerPaseo:`Individual`};return zl(`alta-save`,async()=>{await Ll(`fichas`,{fecha:y(),perroNombre:n,datos:r,categoria:`SIN EVALUAR`,estado:`lista`},{section:`alta`,ok:`Ficha de ${n} guardada. Arranca SIN EVALUAR y con primer paseo individual.`})&&gd(`alta`)}),!0}if(t.closest(`[data-coord-alta-clear]`))return gd(`alta`),L(`alta`,`Formulario vacío.`),$(),!0;let ue=t.closest(`[data-coord-alta-copy]`);if(ue){let e=mf(rd(),ue.dataset.coordAltaCopy);return e&&pf(af(e),`alta`,`Ficha copiada. Pegala en el registro maestro.`),!0}let de=t.closest(`[data-coord-alta-delete]`);if(de){let e=mf(rd(),de.dataset.coordAltaDelete);return e&&zl(`ficha-${e.id}`,()=>Rl(`fichas`,e,{section:`alta`,ok:`Ficha borrada.`})),!0}return!1}function vf(e){let t=e.target;if(t.closest?.(`.coord-shell`)){if(H){if(t.matches(`[data-coord-ed-search]`)){mu=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=Vd());return}if(t.matches(`[data-coord-ed-hora]`)){hu=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=Vd());return}if(t.matches(`[data-coord-ed-field]`)){H[t.dataset.coordEdField]=t.value,H.sucio=!0;return}if(t.matches(`[data-coord-stop]`)){let e=H.paradas[Number(t.dataset.coordStop)];e&&(e[t.dataset.k]=(t.dataset.k,t.value),H.sucio=!0);return}}if(t.matches(`[data-coord-rechazo]`))Mu[t.dataset.coordRechazo]=t.value;else if(t.matches(`[data-coord-clientes-buscar]`)){Uu=t.value;let e=document.getElementById(`coord-clientes-lista`);e&&(e.innerHTML=qd())}else if(t.matches(`[data-coord-filter-perros]`)){let e=z(t.value);t.parentElement.querySelectorAll(`.coord-check`).forEach(t=>{t.hidden=!!e&&!t.dataset.name.includes(e)&&!t.querySelector(`input`).checked})}}}function yf(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;if(t.matches(`[data-coord-rutas-fecha]`))return Gc(t.value)&&(yu=t.value,jl()),!0;if(H&&t.matches(`[data-coord-stop]`)){let e=H.paradas[Number(t.dataset.coordStop)];return e&&(e[t.dataset.k]=t.dataset.k===`minutos`?Number(t.value)||45:t.value,H.sucio=!0,t.dataset.k!==`nota`&&jl()),!0}if(H&&t.matches(`[data-coord-ed-field]`))return H[t.dataset.coordEdField]=t.value,H.sucio=!0,!0;if(t.matches(`[data-coord-ed-hora], [data-coord-ed-search], [data-coord-rechazo], [data-coord-clientes-buscar], [data-coord-filter-perros]`))return!0;let n=t.closest(`[data-coord-form]`);if(n){if(hd(n.dataset.coordForm,_d(n)),n.dataset.coordForm===`cliente`&&t.name===`perros`){let e=document.getElementById(`coord-cliente-perros-label`),t=(fd.cliente.perros||[]).length;e&&(e.textContent=`Perros${t?` (${t})`:``}`)}return!0}return!1}function bf(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`.coord-btn.is-primary`)?.click())}function xf(e){e.key===`Enter`&&e.target.matches?.(`.coord-shell [data-coord-ed-search]`)&&(e.preventDefault(),document.querySelector(`#coord-ed-results .coord-result`)?.click())}function Sf(){_e.push(_f),ve.push(yf),document.addEventListener(`input`,vf),document.addEventListener(`submit`,bf),document.addEventListener(`keydown`,xf)}var Cf=`paseosJuanAdmin_prioridadesHechas`,wf=`paseosJuanAdmin_seccionesAbiertas`,Tf=`America/Argentina/Buenos_Aires`,Ef=[`Pequeño`,`Mediano`,`Grande`],Df=x.manana.label,Of=x.tarde.label,kf=[`paseos`,`incidentes`,`checklists`,`pedidos`,`rutas`,`plantillas`,`avisos`],Af=[`pagos`,`clientes`],jf=10,Mf=[`Efectivo`,`Transferencia`,`Naranja X`],Nf=`Libro contable del Sistema de Gestión`,Pf=``,K={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,adminLoaded:!1,adminError:``,pagosMes:null,lateSignature:``,msgs:{users:null,live:null,pagos:null}},Ff=()=>({fecha:y(),concepto:``,monto:``,medio:``,pasadoAlLibro:!1}),q={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{},pago:Ff()};function J(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Y(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function X(e,t,n){return`${e} ${e===1?t:n}`}var If={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Lf(e){let t=S.filter(t=>e.includes(t)),n=t.map(e=>S.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${If[t[0]]} a ${If[t[t.length-1]]}`:t.map(e=>If[e]).join(`, `)}function Rf(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:Tf,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:S.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function zf(){return ae(Cf)}function Bf(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Vf(){return new Set(ae(wf))}function Hf(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Tf,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function Uf(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Tf,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function Wf(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function Gf(){return _.user()||{usuario:``,nombre:``,rol:`admin`}}function Kf(e){return String(e||``).trim().split(/\s+/)[0]||``}function qf(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function Jf(e,t){return[`pedidos`,`plantillas`,`avisos`,...Af].includes(e)?{}:{desde:t}}function Yf(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function Xf(e){return e.hora||Hf(e.creadoEn)}function Zf(e=new Date){let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:Tf,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),n=e=>Number(t.find(t=>t.type===e)?.value||0);return n(`hour`)%24*60+n(`minute`)}function Qf(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}var $f=810;function ep(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``)}function tp(e,t){let n=v.cached(`rutas`,Jf(`rutas`,e)).filter(t=>t.fecha===e),r=v.cached(`plantillas`,Jf(`plantillas`,e)).filter(e=>ep(e.dia)===ep(t)),i=!r.length,a=i?$t().filter(e=>ep(e.dia)===ep(t)):r,o=new Map;a.forEach(e=>o.set(e.ruta||e.id,{...e,fuente:i?`planilla`:`plantilla`})),n.forEach(e=>o.set(e.ruta||String(e.id).slice(11),{...e,fuente:`dia`}));let s=e=>(e.paradas||[]).map(e=>e.hora||`99:99`).sort()[0]||`99:99`,c=[...o.values()].sort((e,t)=>s(e).localeCompare(s(t))||String(e.ruta).localeCompare(String(t.ruta)));return{list:c,fromSheet:c.some(e=>e.fuente===`planilla`)}}function np(e,t,n){let r=(e,t)=>e.perroId&&t.perroId?e.perroId===t.perroId:ep(e.perroNombre)&&ep(e.perroNombre)===ep(t.perroNombre),i=t=>e.reduce((e,n)=>e+(n.paradas||[]).filter(e=>r(t,e)).length,0);return e.map(e=>{let a=Yf({turno:e.turno}),o=(e.paradas||[]).map(e=>{let o=t.filter(t=>r(e,t)),s=o.find(e=>Yf(e)===a)||(o.length===1&&i(e)===1?o[0]:null),c=s?.estado||`pendiente`,l=Qf(e.hora),u=`a-tiempo`;return c===`entregado`?u=`entregado`:c===`no-sale`?u=`no-sale`:c===`pendiente`&&l!==null&&n>l+jf&&(u=`atrasado`),{...e,paseo:s,estado:c,status:u,prevista:l,atraso:u===`atrasado`?n-l:0}}),s=e=>o.filter(t=>t.status===e).length;return{route:e,shift:a,stops:o,aTiempo:s(`a-tiempo`),atrasados:s(`atrasado`),entregados:s(`entregado`),noSale:s(`no-sale`)}})}function rp(e){return v.cached(`avisos`,Jf(`avisos`,e)).filter(t=>{let n=t.fecha||String(t.creadoEn||``).slice(0,10),r=t.vigenteHasta||n;return n&&n<=e&&r>=e}).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``)))}function ip(){let e=y(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=v.cached(`paseos`,Jf(`paseos`,e)).filter(t),i=v.cached(`incidentes`,Jf(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),a=v.cached(`checklists`,Jf(`checklists`,e)).filter(t).sort(n),o=v.cached(`pedidos`,Jf(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),s=[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>Yf(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}}),c=Zf(),l=tp(e,Rf().dayName),u=np(l.list,r,c),d=u.flatMap(e=>e.stops.filter(e=>e.status===`atrasado`).map(t=>({...t,route:e.route})));return{hoy:e,paseos:r,incidentes:i,checklists:a,pedidosNuevos:o,shifts:s,nowMin:c,effective:l,compliance:u,late:d,lateNow:d.filter(e=>e.prevista<$f==c<$f),avisos:rp(e)}}function ap(e){return e.late.map(e=>`${e.route.ruta}:${e.perroId||e.perroNombre}`).join(`|`)}function op(){let e=y();K.adminLoaded||(K.adminLoaded=!0,sp().finally(()=>{Af.forEach(t=>v.watch(t,Jf(t,e)))})),K.liveDay!==e&&(K.liveDay=e,cp(!1).finally(()=>{kf.forEach(t=>v.watch(t,Jf(t,e)))}))}async function sp(){let e=y(),t=await Promise.allSettled(Af.map(t=>v.list(t,Jf(t,e)))),n=[...new Set(t.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],r=K.adminError;K.adminError=n.join(` `),K.adminError&&Z(`pagos`,`No se pudieron traer pagos o clientes: ${K.adminError}`,!0),r!==K.adminError&&Q()}async function cp(e){let t=y(),n=await Promise.allSettled(kf.map(e=>v.list(e,Jf(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=K.liveError;K.liveError=r.join(` `),K.liveError?Z(`live`,`No se pudieron actualizar los datos del día: ${K.liveError}`,!0):e?Z(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Z(`live`,`Datos del día actualizados.`),(e||i!==K.liveError)&&Q()}var lp={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},up={admin:`todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.`,coordinador:`arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.`,supervisor:`controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.`,paseador:`hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.`,ayudante:`acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.`,marketing:`pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.`};function dp(e){let t=(nt[e]||[]).filter(e=>lp[e]).map(t=>e===`ayudante`&&t===`paseador`?`Paseador (modo ayudante)`:lp[t]);return`${t.length?`Paneles: ${Y(t)}.`:`Todavía no tiene panel.`} Qué hace: ${up[e]||`Pendiente de confirmar`}`}function fp(){return K.usersLoading=!0,at.list().then(e=>{K.users=e,K.usersError=``}).catch(e=>{K.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,K.usersError,!0)}).finally(()=>{K.usersLoading=!1,Q()})}function pp(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function mp(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function hp(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!mp(e))return e}}function gp(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){K.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function _p(e){let t=K.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?J(t.text):``}</p>`}function vp(){Object.entries(K.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function Q(){if(!qf()||_.user()?.rol!==`admin`)return;let e=document.activeElement,t=e?.id,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.getElementById(t);if(r&&(r.focus({preventScroll:!0}),n))try{r.setSelectionRange(...n)}catch{}}function yp(){return C.filter(e=>e.status===`Activo`&&e.days.length>0)}function bp(){let e=yp(),t=S.map(t=>{let n=e.filter(e=>Gt(e,t,Df)).length,r=e.filter(e=>Gt(e,t,Of)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function xp(){let e=yp(),t=new Map(C.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return C.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[Df,Of].forEach(e=>{let t=S.filter(t=>Gt(o,t,e)&&Gt(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Sp(){return yp().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function Cp(){return C.filter(e=>e.review||e.status!==`Activo`)}function wp(e){return e===Df?x.manana.route:x.tarde.routes.join(` o `)}function Tp(e=ip()){let{conflicts:t}=xp(),n=C.filter(e=>e.status!==`Activo`),r=Cp(),i=Sp().filter(e=>e.category===`SIN EVALUAR`),a=yp(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${Y(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${Xf(n)?` a las ${Xf(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${Y(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(e.lateNow.length){let t=e.lateNow.length,n=e.nowMin<$f?`mañana`:`tarde`,r=e.lateNow.slice().sort((e,t)=>t.atraso-e.atraso),i=r[0],a=r.slice(0,3).map(e=>`${e.perroNombre} (${e.hora}, ${e.route.ruta})`),o=[...new Set(r.map(e=>e.route.ruta))],c=i.route.supervisor||Np(i.route.paseador)||`el supervisor del turno`;e.paseos.length?s.push({id:`atrasos-${e.hoy}-${n}-${t}`,tag:`Atrasos`,tone:`warning`,title:`${X(t,`perro atrasado`,`perros atrasados`)} en el turno ${n}`,detail:`${Y(a)}${t>3?` y ${X(t-3,`más`,`más`)}`:``}. Pasaron más de ${jf} minutos de la hora prevista y nadie marcó el retiro.`,action:`Preguntale a ${c} qué pasa con ${i.perroNombre} (retiro previsto ${i.hora}, ruta ${o.join(` y `)}).`,target:`adm-cumplimiento`,targetLabel:t===1?`Ver el atraso`:`Ver los atrasos`}):s.push({id:`atrasos-sin-marcas-${e.hoy}-${n}`,tag:`Atrasos`,tone:`warning`,title:`Nadie marcó retiros hoy: ${X(t,`perro figura`,`perros figuran`)} pasados de hora en el turno ${n}`,detail:`Según la ruta de hoy, ${Y(a)}${t>3?` y ${X(t-3,`más`,`más`)}`:``} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,action:`Preguntale a ${c} si el equipo está marcando los retiros en la página del paseador.`,target:`adm-cumplimiento`,targetLabel:`Ver el cumplimiento`})}if(e.pedidosNuevos.length){let t=e.pedidosNuevos.length,n=e=>e.titulo||e.tipo||`Pedido sin título`,r=e.pedidosNuevos.slice(0,3).map(n),i=n(e.pedidosNuevos[t-1]);s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}`,tag:`Pedidos`,tone:`info`,title:`${X(t,`pedido nuevo`,`pedidos nuevos`)} sin responder`,detail:`${Y(r)}${t>3?` y ${X(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.`,action:t===1?`Respondé el pedido “${i}”.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${i}”.`,target:`adm-vivo`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(wp).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${Y(r)}. Hay ${X(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${Y(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${X(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${Y(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${Y(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${Y(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${Y(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function Ep(){let e=yp(),t=[],n=[];e.forEach(e=>{let r=Rt.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=Rt.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function Dp(e){return`
    <div class="adm-shell">
      ${Op()}
      ${e}
    </div>
  `}function Op(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${g(`lock`,`adm-icon-sm`)} ${J(Gf().nombre)} · ${J(rt[Gf().rol]||Gf().rol)}</span>
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
  `}function kp(){op(),K.users===null&&!K.usersLoading&&!K.usersError&&fp();let e=ip();K.lateSignature=ap(e);let t=Tp(e),n=zf(),r=Vf();return setTimeout(vp,60),`
    <main class="adm-page" id="adm-main">
      ${Ap(t,n,e)}
      ${Gp(e)}
      ${$p()}
      ${Qp()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${g(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${g(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${tm(r)}
        ${nm(r)}
        ${gm(r)}
        ${pm(r)}
        ${im(r)}
        ${sm(r)}
        ${cm(r)}
        ${_m(r)}
      </div>
      ${vm()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function Ap(e,t,n){let{dayName:r,date:i}=Rf(),a=yp(),o=a.filter(e=>Gt(e,r,Df)).length,s=a.filter(e=>Gt(e,r,Of)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${X(o,`perro`,`perros`)} a la mañana y ${X(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=Kf(Gf().nombre);return`
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${J(r)} ${J(i)}</p>
        <h1 id="adm-hero-title">Hola${u?`, ${J(u)}`:``}</h1>
        <p class="adm-hero-sub">${l}</p>
        ${n.incidentes.length?`
          <p class="adm-hero-alert">${g(`alertTriangle`,`adm-icon-sm`)} ${X(n.incidentes.length,`incidente cargado hoy`,`incidentes cargados hoy`)}. Está primero en tus prioridades.</p>
        `:``}
      </div>

      ${c?`
        <div class="adm-next" aria-labelledby="adm-next-title">
          <p class="adm-next-label" id="adm-next-title">${g(`arrowRight`,`adm-icon-sm`)} Próximo paso</p>
          <p class="adm-next-text">${J(c.action)}</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-done="${c.id}">
              ${g(`checkCircle`,`adm-icon-sm`)} Listo, ya lo hice
            </button>
            <button class="adm-button adm-button--ghost" type="button" data-adm-goto="${c.target}">
              ${J(c.targetLabel)}
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
                <h3>${J(e.title)}</h3>
                <p>${J(e.detail)}</p>
                <button class="adm-link-button" type="button" data-adm-done="${e.id}" aria-pressed="${r}">
                  ${r?`Desmarcar`:`Marcar como hecho`}
                </button>
              </div>
            </li>
          `}).join(``)}
      </ol>
      <p class="adm-note">Las marcas de “hecho” se guardan solo en este dispositivo.</p>
    </section>
  `}var jp={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function Mp(e){let{dayName:t}=Rf();return yp().filter(n=>Gt(n,t,e)).length}function Np(e){return K.users?.find(t=>t.usuario===e)?.nombre||e||``}function Pp(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=Hf(e.actualizadoEn);return`Actualizado por ${Np(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||Np(e.creadoPor),r=Hf(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function Fp(e){let t={manana:{title:`Turno mañana`,hours:`${x.manana.from} a ${x.manana.to}`,planned:Mp(Df)},tarde:{title:`Turno tarde`,hours:`${x.tarde.from} a ${x.tarde.to}`,planned:Mp(Of)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
    <article class="adm-shift" aria-labelledby="adm-shift-${e.key}">
      <h3 id="adm-shift-${e.key}">${t.title}${t.hours?` <span class="adm-th-sub">${t.hours}</span>`:``}</h3>
      ${e.total?`
        <p class="adm-shift-big"><strong>${e.entregados}</strong> de ${X(e.salen,`perro entregado`,`perros entregados`)}</p>
        <span class="adm-progress" aria-hidden="true"><span style="--v:${n.toFixed(3)}"></span></span>
        <ul class="adm-shift-stats">
          <li><strong>${e.retirados}</strong> retirados</li>
          <li><strong>${e.paseando}</strong> paseando</li>
          <li><strong>${e.pendientes}</strong> por retirar</li>
          ${e.noSale?`<li><strong>${e.noSale}</strong> no ${e.noSale===1?`sale`:`salen`}</li>`:``}
        </ul>
        <details class="adm-inner adm-dogs" data-adm-dogs="${r}" ${K.openDogs.has(r)?`open`:``}>
          <summary>Ver los ${e.total} perros</summary>
          <ul class="adm-dog-list">
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=jp[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${J(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${J(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${J(Pp(e))}${e.nota?` · Nota: ${J(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function Ip(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${g(`alertTriangle`,`adm-icon-sm`)} ${X(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${J(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${Xf(e)?`<span class="adm-muted">${J(Xf(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${J(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${J(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${Pp(e,!0)?`<p class="adm-note">${J(Pp(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function Lp(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}var Rp={"a-tiempo":{label:`A tiempo`,tone:`ok`},atrasado:{label:`Atrasado`,tone:`danger`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}},zp={dia:`Cambio del día`,plantilla:`Plantilla semanal`,planilla:`Planilla BASE RUTAS`};function Bp(e){let t=jp[e.estado]||{label:e.estado},n=[`Retiro previsto ${e.hora||`pendiente de confirmar`}`];return e.status===`atrasado`?n.push(`${e.atraso} min de atraso`):e.paseo&&n.push(t.label),e.paseo?.horaRetiro&&n.push(`retirado ${e.paseo.horaRetiro}`),e.paseo?.horaEntrega&&n.push(`entregado ${e.paseo.horaEntrega}`),n.join(` · `)}function Vp(e){let{route:t,stops:n}=e,r=n.length-e.noSale,i=`ruta-${t.ruta}`,a=[t.paseador?`Paseador: ${Np(t.paseador)}`:`Paseador: sin asignar`,t.ayudante?`Ayudante: ${Np(t.ayudante)}`:``,t.supervisor?`Supervisa: ${t.supervisor}`:``].filter(Boolean).join(` · `),o=n.filter(e=>e.status===`atrasado`).sort((e,t)=>t.atraso-e.atraso);return`
    <article class="adm-shift adm-route ${o.length?`has-late`:``}" aria-labelledby="adm-route-${J(t.ruta)}">
      <h4 id="adm-route-${J(t.ruta)}">${J(t.ruta||`Ruta sin código`)} <span class="adm-th-sub">${J(t.turno||`Turno sin indicar`)} · ${J(zp[t.fuente]||``)}</span></h4>
      <p class="adm-dog-meta">${J(a)}</p>
      ${n.length?`
        <ul class="adm-route-stats" aria-label="Cumplimiento de ${J(t.ruta)}">
          <li class="is-ok"><strong>${e.aTiempo}</strong> a tiempo</li>
          <li class="${e.atrasados?`is-late`:``}"><strong>${e.atrasados}</strong> ${e.atrasados===1?`atrasado`:`atrasados`}</li>
          <li><strong>${e.entregados}</strong> de ${r} ${e.entregados===1?`entregado`:`entregados`}</li>
          ${e.noSale?`<li><strong>${e.noSale}</strong> no ${e.noSale===1?`sale`:`salen`}</li>`:``}
        </ul>
        ${o.length?`
          <ul class="adm-late-list" aria-label="Atrasados de ${J(t.ruta)}">
            ${o.map(e=>`<li><strong>${J(e.perroNombre||`Perro sin nombre`)}</strong> <span>retiro ${J(e.hora)} · ${e.atraso} min sin retiro</span></li>`).join(``)}
          </ul>
        `:``}
        <details class="adm-inner adm-dogs" data-adm-dogs="${J(i)}" ${K.openDogs.has(i)?`open`:``}>
          <summary>Ver las ${n.length} paradas en orden</summary>
          <ol class="adm-dog-list adm-stop-list">
            ${n.map(e=>{let t=Rp[e.status];return e.status===`a-tiempo`&&(t=e.estado===`pendiente`?{label:`Por retirar · a tiempo`,tone:`neutral`}:{label:`${(jp[e.estado]||{label:e.estado}).label} · a tiempo`,tone:`info`}),`
                <li>
                  <span class="adm-dog-name">${J(e.hora||`--:--`)} · ${J(e.perroNombre||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${J(t.label)}${e.paseo?.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${J(Bp(e))}${e.nota?` · Nota: ${J(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ol>
        </details>
      `:`<p class="adm-empty">Esta ruta no tiene paradas cargadas.</p>`}
    </article>
  `}function Hp(e){let{compliance:t,effective:n,late:r}=e;return`
    <div class="adm-compliance" id="adm-cumplimiento" tabindex="-1" role="region" aria-labelledby="adm-compliance-title">
      <h3 id="adm-compliance-title">${g(`route`,`adm-icon-sm`)} Cumplimiento por ruta ${r.length?`<span class="adm-count adm-count--danger">${X(r.length,`atrasado`,`atrasados`)}</span>`:``}</h3>
      <p class="adm-note">Atrasado = pasaron más de ${jf} minutos de la hora prevista y nadie marcó el retiro. Hora de Argentina.</p>
      ${n.fromSheet?`
        <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${b.toLowerCase()}.</span></p>
      `:``}
      ${t.length?`
        <div class="adm-live-grid">${t.map(Vp).join(``)}</div>
      `:`<p class="adm-empty">Hoy no hay rutas: ni cambios del día, ni plantilla, ni paseos en la planilla.</p>`}
    </div>
  `}var Up={"perro suelto":`danger`,seguridad:`danger`,"obra o corte":`warning`,clima:`info`,"cambio de horario":`info`};function Wp(e){let{avisos:t}=e;return`
    <div class="adm-avisos" id="adm-avisos" role="region" aria-labelledby="adm-avisos-title">
      <h3 id="adm-avisos-title">${g(`mapPin`,`adm-icon-sm`)} Avisos por barrio vigentes <span class="adm-count">${t.length}</span></h3>
      ${t.length?`
        <ul class="adm-aviso-list">
          ${t.map(e=>`
            <li class="adm-aviso">
              <div class="adm-aviso-head">
                <strong>${J(e.barrio||`Barrio sin indicar`)}</strong>
                <span class="adm-pill adm-pill--${Up[e.tipo]||`neutral`}">${J(e.tipo||`otro`)}</span>
                <span class="adm-muted">${e.vigenteHasta?`Hasta el ${J(Wf(e.vigenteHasta))}`:`Solo hoy`}</span>
              </div>
              <p>${J(e.mensaje||e.titulo||``)}</p>
              ${Pp(e,!0)?`<p class="adm-note">${J(Pp(e,!0))}.</p>`:``}
            </li>
          `).join(``)}
        </ul>
      `:`<p class="adm-empty">No hay avisos vigentes por barrio.</p>`}
    </div>
  `}function Gp(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${J(Wf(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó.</p>`:``}
      ${_p(`live`)}

      ${e.incidentes.length?Ip(e.incidentes):`
        <p class="adm-live-ok">${g(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      ${Hp(e)}
      ${Wp(e)}

      <div class="adm-live-grid">
        ${e.shifts.map(Fp).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=Lp(e);return`
                  <li>
                    <span><strong>${J(e.creadoPorNombre||e.creadoPor||`Sin nombre`)}</strong> · ${J(e.turno||`Turno sin indicar`)}</span>
                    <span class="adm-pill ${t.complete?`adm-pill--ok`:`adm-pill--warning`}">${t.complete?`Completo`:`Incompleto`}${t.text?` · ${t.text}`:``}</span>
                  </li>
                `}).join(``)}
            </ul>
          `:`<p class="adm-empty">Nadie cargó el checklist hoy.</p>`}
        </article>

        <article class="adm-shift" aria-labelledby="adm-live-pedidos">
          <h3 id="adm-live-pedidos">Pedidos nuevos <span class="adm-count">${r.length}</span></h3>
          ${r.length?`
            <ul class="adm-mini-list">
              ${r.slice(0,6).map(e=>`
                <li>
                  <span><strong>${J(e.titulo||e.tipo||`Pedido sin título`)}</strong></span>
                  <span class="adm-dog-meta">${J(Wf(e.fecha)||Uf(e.creadoEn))} · ${e.origen===`web`?`Formulario web`:J(e.creadoPorNombre||`Cargado en la app`)}</span>
                </li>
              `).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${X(r.length-6,`pedido más`,`pedidos más`)}.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos.</p>`}
        </article>
      </div>
    </section>
  `}function Kp(e){return Object.entries(rt).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function qp(){let e=K.credential;if(!e)return``;let t=gp(e);return`
    <div class="adm-cred" id="adm-cred" tabindex="-1" role="region" aria-labelledby="adm-cred-title">
      <p class="adm-tag adm-tag--warning">Solo se muestra ahora</p>
      <h3 id="adm-cred-title">${e.tipo===`alta`?`Usuario creado: ${J(e.nombre)}`:`PIN nuevo de ${J(e.nombre)}`}</h3>
      <p>Copiá este mensaje y mandáselo por WhatsApp:</p>
      <p class="adm-cred-text">${J(t)}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="button" data-adm-cred-copy>${g(`copy`,`adm-icon-sm`)} Copiar mensaje</button>
        <a class="adm-button adm-button--ghost" href="https://wa.me/?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${g(`message`,`adm-icon-sm`)} Abrir WhatsApp</a>
        <button class="adm-button adm-button--ghost" type="button" data-adm-cred-hide>Listo, ya lo mandé</button>
      </div>
      <p class="adm-note">Este PIN no queda guardado en la página: cuando tocás “Listo” desaparece. Si se pierde, resetealo.</p>
    </div>
  `}function Jp(){let e=q.crear;return`
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${J(Y(It.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>
      <div class="adm-form-grid">
        <label class="adm-field" for="adm-crear-nombre">
          <span>Nombre</span>
          <input class="adm-input" id="adm-crear-nombre" name="nombre" autocomplete="off" maxlength="60" required placeholder="Ej. Sebastián" value="${J(e.nombre)}" data-adm-draft="crear" data-adm-key="nombre" />
        </label>
        <label class="adm-field" for="adm-crear-usuario">
          <span>Usuario <small>para entrar, sin espacios</small></span>
          <input class="adm-input" id="adm-crear-usuario" name="usuario" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="31" required placeholder="Ej. sebastian" value="${J(e.usuario)}" data-adm-draft="crear" data-adm-key="usuario" />
        </label>
        <label class="adm-field" for="adm-crear-rol">
          <span>Rol</span>
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${Kp(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${J(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${J(rt[e.rol]||e.rol)}:</strong> ${J(dp(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${g(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function Yp(e){let t=!e.activo;return`
    <form class="adm-form adm-form--inline" data-adm-form="reset" data-adm-usuario="${J(e.usuario)}" novalidate aria-labelledby="adm-reset-title">
      <p id="adm-reset-title"><strong>${t?`Reactivar`:`Resetear el PIN de`} ${J(e.nombre)}.</strong> ${t?`Va a poder entrar de nuevo con este PIN.`:`Se cierra su sesión en todos lados y entra con el PIN nuevo.`}</p>
      <label for="adm-reset-pin"><span>PIN nuevo <small>6 a 8 números</small></span></label>
      <div class="adm-pin-row">
        <input class="adm-input" id="adm-reset-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${J(q.reset.pin)}" data-adm-draft="reset" data-adm-key="pin" />
        <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="reset">Generar</button>
      </div>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${t?`Reactivar`:`Guardar PIN nuevo`}</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-reset-cancel>Cancelar</button>
      </div>
    </form>
  `}function Xp(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${J(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${J(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function Zp(e,t){let n=e.usuario===t,r=q.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${Uf(e.ultimoIngreso)} ${Hf(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${Uf(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
    <li class="adm-user-row ${e.activo?``:`is-off`}">
      <div class="adm-user-head">
        <strong>${J(e.nombre)}</strong>
        <span class="adm-muted">usuario: ${J(e.usuario)}</span>
        <span class="adm-pill adm-pill--neutral">${J(rt[e.rol]||e.rol)}</span>
        ${e.activo?``:`<span class="adm-pill adm-pill--warning">Desactivado</span>`}
        ${n?`<span class="adm-pill adm-pill--ok">Sos vos</span>`:``}
      </div>
      <p class="adm-user-meta">${J(i)}${J(a)}</p>
      ${n?`
        <p class="adm-note">Tu PIN lo cambiás en <a class="adm-inline-link" href="/login" data-link>Cambiar mi PIN</a>. No podés cambiar tu propio rol ni desactivarte.</p>
      `:e.activo?`
        <div class="adm-user-actions">
          <div class="adm-role-change">
            <label for="adm-rol-${o}">Rol</label>
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${J(e.usuario)}">${Kp(r)}</select>
            <button class="adm-button adm-button--ghost" type="button" data-adm-role-save="${J(e.usuario)}">Cambiar rol</button>
          </div>
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${J(e.usuario)}" aria-expanded="${K.resetFor===e.usuario}">Resetear PIN</button>
          <button class="adm-button adm-button--ghost adm-button--danger-ghost" type="button" data-adm-off="${J(e.usuario)}">Desactivar</button>
        </div>
      `:`
        <div class="adm-user-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${J(e.usuario)}" aria-expanded="${K.resetFor===e.usuario}">Reactivar con PIN nuevo</button>
        </div>
      `}
      ${!n&&K.resetFor===e.usuario?Yp(e):``}
      ${!n&&K.confirmOff===e.usuario?Xp(e):``}
    </li>
  `}function Qp(){let e=Gf().usuario,t=(K.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=K.users===null&&K.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:K.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>Zp(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${K.users?`${X(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${qp()}

      <div class="adm-form-actions">
        <button class="adm-button ${K.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${K.showCreate}" aria-controls="adm-create">
          ${g(K.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${K.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${K.showCreate?Jp():``}
      ${_p(`users`)}
      ${r}

      <h3 class="adm-subtitle">Qué puede ver cada rol</h3>
      <ul class="adm-role-help">
        ${Object.keys(rt).map(e=>`<li><strong>${rt[e]}:</strong> ${J(dp(e))}</li>`).join(``)}
      </ul>
    </section>
  `}function $p(){let{conflicts:e,missing:t,notRouted:n}=xp(),r=Sp();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${g(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${Pt}).</p>
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
                    ${J(e.a)} y ${J(e.b)}
                    ${[e.a,e.b].filter(e=>/día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(C.find(t=>t.name===e)?.review||``)).map(e=>`<span class="adm-row-note">Días de ${J(e)}: dato a revisar</span>`).join(``)}
                  </th>
                  <td>${J(e.shift)} · ${J(wp(e.shift))}</td>
                  <td>${J(Lf(e.days))}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      `:`<p class="adm-empty">No hay perros “no juntar” que compartan turno en BASE RUTAS.</p>`}

      <ul class="adm-safety-list" aria-label="Indicaciones de seguridad por perro">
        ${r.map(e=>`
          <li>
            <strong>${J(e.name)}</strong>
            <span class="adm-safety-meta">${J(e.shifts.join(` y `))} · ${J(Lf(e.days))}</span>
            <span class="adm-safety-notes">${e.safety.map(e=>`<span class="adm-pill adm-pill--danger">${J(e)}</span>`).join(``)}</span>
          </li>
        `).join(``)}
      </ul>

      ${t.length||n.length?`
        <ul class="adm-footnotes">
          ${t.map(e=>`<li>${J(e.dog)} figura “no juntar con ${J(e.other)}”, pero ${J(e.other)} no está en el registro: ${b}.</li>`).join(``)}
          ${n.map(e=>`<li>${J(e.dog)} y ${J(e.other)} figuran “no juntar”. Hoy ${J(e.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join(``)}
        </ul>
      `:``}
    </section>
  `}function em(e,t,{title:n,summary:r,iconName:i},a){return`
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
  `}function tm(e){let t=Cp().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return em(`adm-datos`,e,{title:`Datos a revisar`,summary:`${X(t.length,`perro`,`perros`)} · ${X(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${J(Ft.officialSources.dogs)}).</p>
    <ul class="adm-review-list">
      ${t.map(e=>`
        <li class="${e.status===`Activo`?``:`is-status`}">
          <div class="adm-review-head">
            <strong>${J(e.name)}</strong>
            <span class="adm-muted">${J(e.id)} · ${J(e.plan)}</span>
            <span class="adm-pill ${e.status===`Activo`?`adm-pill--neutral`:`adm-pill--warning`}">${J(e.status)}</span>
          </div>
          <p>${J(e.review||`Pendiente de confirmar`)}</p>
        </li>
      `).join(``)}
    </ul>
  `)}function nm(e){let t=bp();return em(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${J(t.busiest.length?Y(t.busiest):`Sin datos`)} (${X(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${Pt}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
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
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${If[e.day]}</span>
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
      <li>“Total” suma las salidas del día. ${Y(t.twoShifts.map(e=>e.name))} ${t.twoShifts.length===1?`sale`:`salen`} en los dos turnos, por eso cuentan dos veces.</li>
      <li>Mañana: ruta ${x.manana.route}, supervisa ${x.manana.supervisor}. Tarde: rutas ${x.tarde.routes.join(` y `)}, supervisa ${x.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${J(Ut.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function rm(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function im(e){let t=yp(),n=bp(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${Pt}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${Pt}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...Ut,...i];return em(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${rm(e.kind)}">${J(e.kind)}</span>
          <strong class="adm-fact-value">${J(e.value)}</strong>
          <span class="adm-fact-label">${J(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${J(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner">
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(Vt).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${J(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var am={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},om=[{role:`Admin`,who:Lt.admin,can:[`Ve y decide sobre todo el sistema`,`Usuarios, pagos e indicadores`,`Único rol que ve y carga pagos`]},{role:`Coordinador`,who:`${Lt.coordinador} (${b.toLowerCase()})`,can:[`Armar rutas y horarios (plantilla semanal y cambios del día)`,`Gestionar los clientes de los paseos`,`Atender pedidos y cargar fichas`,`Avisar lo que pasa en cada barrio`,`No ve plata`]},{role:`Supervisor`,who:Lt.supervisor,can:[`Controlar los paseos del momento`,`Quién falta retirar y atrasos contra el horario`,`Entregas, incidentes y equipo`,`Ve las rutas, no las arma`]},{role:`Paseador`,who:Lt.paseador,can:[`Hacer su ruta del turno, en orden y con horario`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`]},{role:`Ayudante de paseador`,who:b,can:[`Acompañar al paseador en su ruta`,`Marcar pasos`,`Reportar incidentes`,`Sin datos de clientes`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function sm(e){return em(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${X(It.length,`persona`,`personas`)} · ${om.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${It.map(e=>{let t=am[e.role];return`
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${J(e.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${J(e.label)}</span>
            </div>
            <p>${J(e.tasks)}</p>
            <p class="adm-person-panel">Panel: ${t?`<a href="${t.path}" data-link>${t.panel}</a>`:`<span class="adm-pending">${b}</span>`}</p>
          </li>
        `}).join(``)}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${om.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${J(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${J(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function cm(e){return em(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${Rt.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${Ef.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${Rt.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${Ef.map(t=>`<td>${qt(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${Ef.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${Ef.map(e=>`<td>${qt(zt[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${Ef.map(e=>`<td>${qt(zt[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Bt.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${b.toLowerCase()}.</p>
  `)}function lm(e){let[t,n]=String(e).split(`-`).map(Number);if(!t||!n)return e;let r=new Intl.DateTimeFormat(`es-AR`,{month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(Date.UTC(t,n-1,15)));return r.charAt(0).toUpperCase()+r.slice(1)}function um(e){let t=String(e||``).replace(/[$\s]/g,``);return t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):/^\d{1,3}(\.\d{3})+$/.test(t)&&(t=t.replace(/\./g,``)),/^\d+(\.\d+)?$/.test(t)?Number(t):NaN}function dm(){let e=v.cached(`pagos`,Jf(`pagos`)).slice().sort((e,t)=>String(t.fecha||``).localeCompare(String(e.fecha||``))||String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),t=y().slice(0,7),n=[...new Set([t,...e.map(e=>String(e.fecha||``).slice(0,7)).filter(e=>/^\d{4}-\d{2}$/.test(e))])].sort().reverse(),r=K.pagosMes&&(K.pagosMes===`todos`||n.includes(K.pagosMes))?K.pagosMes:t,i=r===`todos`?e:e.filter(e=>String(e.fecha||``).startsWith(r)),a=e.filter(e=>!e.pasadoAlLibro),o=i.reduce((e,t)=>e+(Number(t.monto)||0),0),s=e.filter(e=>{let t=K.users?.find(t=>t.usuario===e.creadoPor)?.rol;return t&&t!==`admin`});return{all:e,months:n,mes:r,filtered:i,faltan:a,faltanMes:i.filter(e=>!e.pasadoAlLibro),total:o,deOtros:s}}function fm(e){let t=K.users?.find(t=>t.usuario===e.creadoPor),n=t&&t.rol!==`admin`,r=Number(e.monto),i=e.monto!==``&&e.monto!==null&&e.monto!==void 0&&Number.isFinite(r);return`
    <li class="adm-pago ${e.pasadoAlLibro?``:`is-missing`}">
      <div class="adm-pago-main">
        <span class="adm-pago-date">${J(Wf(e.fecha)||Uf(e.creadoEn)||`Pendiente de confirmar`)}</span>
        <strong class="adm-pago-concept">${J(e.concepto||`Sin concepto`)}</strong>
        <span class="adm-pago-amount">${i?J(qt(r)):b}</span>
      </div>
      <div class="adm-pago-meta">
        <span class="adm-pill adm-pill--neutral">${J(e.medio||`Medio sin indicar`)}</span>
        <span class="adm-pill ${e.pasadoAlLibro?`adm-pill--ok`:`adm-pill--warning`}">${e.pasadoAlLibro?`Pasado al Libro`:`Falta pasar al Libro`}</span>
        ${e.pendiente?`<span class="adm-pill adm-pill--info">Se enviará cuando haya señal</span>`:``}
        ${n?`<span class="adm-pill adm-pill--info">Lo cargó ${J(rt[t.rol]||t.rol)} antes del cambio</span>`:``}
      </div>
      ${Pp(e,!0)?`<p class="adm-note">${J(Pp(e,!0))}.</p>`:``}
      <button class="adm-link-button" type="button" data-adm-pago-libro="${J(e.id)}" aria-pressed="${e.pasadoAlLibro?`true`:`false`}">
        ${e.pasadoAlLibro?`Desmarcar “pasado al Libro”`:`Marcar como pasado al Libro`}
      </button>
    </li>
  `}function pm(e){let t=dm(),n=q.pago,r=t.filtered.slice(0,20),i=t.mes===`todos`?`todos los meses`:lm(t.mes).toLowerCase();return em(`adm-pagos`,e,{title:`Pagos · registro de apoyo`,summary:t.faltan.length?`${X(t.faltan.length,`pago falta`,`pagos faltan`)} pasar al Libro contable`:`Nada pendiente de pasar al Libro contable`,iconName:`receipt`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: ${Nf}</strong>
        <p>Esto es un registro de apoyo para no olvidarte de nada: cada pago se tiene que pasar al Libro contable. Solo el admin lo ve y lo carga.</p>
      </div>
    </div>

    <form class="adm-form" id="adm-pago-form" data-adm-form="pago" novalidate aria-labelledby="adm-pago-title">
      <h3 id="adm-pago-title">Cargar un pago</h3>
      <div class="adm-form-grid">
        <label class="adm-field" for="adm-pago-fecha">
          <span>Fecha</span>
          <input class="adm-input" id="adm-pago-fecha" type="date" required value="${J(n.fecha)}" data-adm-draft="pago" data-adm-key="fecha" />
        </label>
        <label class="adm-field" for="adm-pago-monto">
          <span>Monto <small>en pesos</small></span>
          <input class="adm-input" id="adm-pago-monto" inputmode="decimal" autocomplete="off" maxlength="15" required placeholder="Ej. 35000" value="${J(n.monto)}" data-adm-draft="pago" data-adm-key="monto" />
        </label>
        <label class="adm-field" for="adm-pago-concepto">
          <span>Concepto</span>
          <input class="adm-input" id="adm-pago-concepto" autocomplete="off" maxlength="120" required placeholder="Ej. Plan 2, semana del 09/11" value="${J(n.concepto)}" data-adm-draft="pago" data-adm-key="concepto" />
        </label>
        <label class="adm-field" for="adm-pago-medio">
          <span>Medio <small>elegí o escribí</small></span>
          <input class="adm-input" id="adm-pago-medio" list="adm-pago-medios" autocomplete="off" maxlength="40" placeholder="Ej. Efectivo" value="${J(n.medio)}" data-adm-draft="pago" data-adm-key="medio" />
          <datalist id="adm-pago-medios">${Mf.map(e=>`<option value="${J(e)}"></option>`).join(``)}</datalist>
        </label>
      </div>
      <label class="adm-check" for="adm-pago-libro">
        <input id="adm-pago-libro" type="checkbox" ${n.pasadoAlLibro?`checked`:``} data-adm-draft="pago" data-adm-key="pasadoAlLibro" />
        <span>Ya lo pasé al Libro contable</span>
      </label>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" id="adm-pago-guardar" type="submit">${g(`plus`,`adm-icon-sm`)} Guardar pago</button>
      </div>
    </form>
    ${_p(`pagos`)}

    <div class="adm-pagos-head">
      <label class="adm-field adm-field--inline" for="adm-pagos-mes">
        <span>Mes</span>
        <select class="adm-input adm-input--sm" id="adm-pagos-mes" data-adm-pagos-mes>
          ${t.months.map(e=>`<option value="${e}" ${e===t.mes?`selected`:``}>${J(lm(e))}</option>`).join(``)}
          <option value="todos" ${t.mes===`todos`?`selected`:``}>Todos los meses</option>
        </select>
      </label>
      <p class="adm-pagos-summary">
        <strong>${X(t.filtered.length,`pago`,`pagos`)}</strong> en ${J(i)} · suma ${J(qt(t.total))} ·
        <strong class="${t.faltanMes.length?`adm-text-warning`:``}" data-adm-pagos-faltan>${t.faltanMes.length} sin pasar al Libro</strong>${t.mes!==`todos`&&t.faltan.length!==t.faltanMes.length?` (${t.faltan.length} contando todos los meses)`:``}
      </p>
    </div>
    ${t.deOtros.length?`<p class="adm-note">${t.deOtros.length===1?`1 pago lo cargó`:`${t.deOtros.length} pagos los cargó`} otro rol antes del cambio de roles (el coordinador ya no ve plata). Se ven acá con la marca “antes del cambio”.</p>`:``}
    ${r.length?`
      <ul class="adm-pago-list" aria-label="Pagos de ${J(i)}">${r.map(fm).join(``)}</ul>
      ${t.filtered.length>r.length?`<p class="adm-note">Se muestran los últimos ${r.length}. Hay ${X(t.filtered.length-r.length,`pago más`,`pagos más`)} en ${J(i)}.</p>`:``}
    `:`<p class="adm-empty">No hay pagos cargados en ${J(i)}.</p>`}
    <p class="adm-note">La suma es solo de este registro de apoyo: no reemplaza al Libro contable.</p>
  `)}var mm=[[`activo`,`Activos`],[`pausa`,`En pausa`],[`baja`,`Baja`]];function hm(){let e=v.cached(`clientes`,Jf(`clientes`)),t=new Map;e.forEach(e=>{let n=String(e.barrio||``).trim()||`Sin barrio`;t.has(n)||t.set(n,{barrio:n,activo:0,pausa:0,baja:0,otro:0});let r=t.get(n),i=String(e.estado||``).toLowerCase();mm.some(([e])=>e===i)?r[i]+=1:r.otro+=1});let n=[...t.values()].sort((e,t)=>t.activo-e.activo||e.barrio.localeCompare(t.barrio)),r={activo:0,pausa:0,baja:0,otro:0};return n.forEach(e=>Object.keys(r).forEach(t=>{r[t]+=e[t]})),{total:e.length,rows:n,totals:r}}function gm(e){let t=hm(),n=t.totals.otro>0;return em(`adm-clientes`,e,{title:`Clientes por barrio`,summary:t.total?`${X(t.totals.activo,`activo`,`activos`)} · ${t.totals.pausa} en pausa · ${t.totals.baja} de baja`:`Todavía no hay clientes cargados en la app`,iconName:`mapPin`},`
    <p class="adm-lead">Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>
    ${t.total?`
      <div class="adm-table-wrap">
        <table class="adm-table adm-clients">
          <caption class="adm-sr-only">Clientes por barrio y estado</caption>
          <thead>
            <tr><th scope="col">Barrio</th>${mm.map(([,e])=>`<th scope="col">${e}</th>`).join(``)}${n?`<th scope="col">Sin estado</th>`:``}</tr>
          </thead>
          <tbody>
            ${t.rows.map(e=>`
              <tr><th scope="row">${J(e.barrio)}</th>${mm.map(([t])=>`<td>${e[t]}</td>`).join(``)}${n?`<td>${e.otro}</td>`:``}</tr>
            `).join(``)}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total</th>${mm.map(([e])=>`<td>${t.totals[e]}</td>`).join(``)}${n?`<td>${t.totals.otro}</td>`:``}</tr>
          </tfoot>
        </table>
      </div>
    `:`<p class="adm-empty">El coordinador todavía no cargó clientes en la app.</p>`}
  `)}function _m(e){let t=Ep();return em(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${J(Ft.officialSources.money)}. Esta sección no muestra montos cobrados: los pagos que anotes de apoyo están en <a class="adm-inline-link" href="#adm-pagos" data-adm-goto="adm-pagos">Pagos</a>.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${qt(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${X(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${qt(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${qt(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${X(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${b.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${J(e)}: ${Y(t.excluded.filter(t=>t.plan===e).map(e=>J(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function vm(){let e=Ft.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${Pt}.</strong> Perros: ${J(e.dogs)}. Rutas: ${J(e.routes)}. Plata: ${J(e.money)}.</p>
      <p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${Nf}.</p>
    </footer>
  `}function ym(){let{dayName:e,date:t}=Rf(),n=ip(),r=Tp(n),i=zf(),a=r.find(e=>!i.includes(e.id)),o=bp(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,`Perros atrasados (más de ${jf} min sin retiro): ${n.late.length}. Avisos por barrio vigentes: ${n.avisos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${Y(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${Pt}.`].join(`
`)}async function bm(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function xm(e){Pf=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=Pf)},60)}function Sm(){Bf(wf,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function Cm(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,Sm());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function wm(e){return e.target.closest(`[data-admin-logout]`)?(K.credential=null,K.users=null,K.usersError=``,K.liveDay=null,K.adminLoaded=!1,K.pagosMes=null,q.pago=Ff(),Rm(`/salir`),!0):!1}function Tm(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function Em(e,t){K.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function Dm(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),K.busy))return;let n=t.dataset.admForm;if(n===`pago`)await Om(t);else if(n===`crear`){let e=q.crear,n=e.nombre.trim(),r=pp(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?K.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:rt[e.rol]?mp(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Z(`users`,a,!0),Q();return}Em(t,!0);try{let t=await at.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});K.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},q.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},K.showCreate=!1,Z(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),K.busy=!1,await fp(),Tm(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),K.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=K.users?.find(t=>t.usuario===e),r=q.reset.pin.trim(),i=n?mp(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}Em(t,!0);try{let t=!n.activo;await at.save({usuario:e,pin:r,...t?{activo:!0}:{}}),K.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},K.resetFor=null,q.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),K.busy=!1,await fp(),Tm(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),K.busy=!1,Q()}}}async function Om(e){let t=q.pago,n=t.concepto.trim(),r=t.medio.trim(),i=um(t.monto),a=``;if(/^\d{4}-\d{2}-\d{2}$/.test(t.fecha)?n.length<2?a=`Escribí el concepto (por ejemplo, el plan y la semana).`:(!Number.isFinite(i)||i<=0)&&(a=`Escribí el monto en pesos, solo números (por ejemplo 35000).`):a=`Elegí la fecha del pago.`,a)Z(`pagos`,a,!0),Q();else{Em(e,!0);try{let e=await v.save(`pagos`,{fecha:t.fecha,concepto:n,monto:i,medio:r,pasadoAlLibro:t.pasadoAlLibro===!0});q.pago=Ff(),K.pagosMes=t.fecha.slice(0,7),Z(`pagos`,e.pendiente?`Se enviará cuando haya señal. Queda anotado en este dispositivo.`:`Listo: pago de ${qt(i)} guardado${t.pasadoAlLibro?``:`. Acordate de pasarlo al Libro contable`}.`)}catch(e){Z(`pagos`,e.message||`No se pudo guardar el pago.`,!0)}finally{K.busy=!1,Q()}}}async function km(e){let t=v.cached(`pagos`,Jf(`pagos`)).find(t=>t.id===e);if(!t||K.busy)return;K.busy=!0;let n=!t.pasadoAlLibro;try{let r=await v.save(`pagos`,{id:e,fecha:t.fecha,pasadoAlLibro:n}),i=`${t.concepto||`El pago`}${t.fecha?` del ${Wf(t.fecha)}`:``}`;Z(`pagos`,r.pendiente?`Se enviará cuando haya señal.`:n?`Listo: ${i} quedó como pasado al Libro.`:`Listo: ${i} quedó como pendiente de pasar al Libro.`)}catch(e){Z(`pagos`,e.message||`No se pudo cambiar la marca.`,!0)}finally{K.busy=!1,Q(),Tm(`[data-adm-pago-libro="${CSS.escape(e)}"]`)}}async function Am(e,t,n){if(!K.busy){K.busy=!0;try{await e(),Z(`users`,t),K.busy=!1,await fp()}catch(e){Z(`users`,e.message||n,!0),K.busy=!1,Q()}}}function jm(e){if(e.target.closest(`[data-adm-create-toggle]`))return K.showCreate=!K.showCreate,K.resetFor=null,K.confirmOff=null,$(),Tm(K.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return K.usersError=``,fp().then(()=>{K.usersError||(Z(`users`,`Lista de usuarios actualizada.`),Q())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;q[e].pin=hp();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=q[e].pin),xm(`PIN generado: ${q[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=K.users?.find(t=>t.usuario===e);if(!t)return!0;let r=q.roles[e]||t.rol;return r===t.rol?(Z(`users`,`${t.nombre} ya tiene el rol ${rt[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Q(),!0):(Am(async()=>{await at.save({usuario:e,rol:r}),delete q.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${rt[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return K.resetFor=K.resetFor===e?null:e,K.confirmOff=null,q.reset.pin=``,$(),K.resetFor&&Tm(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=K.resetFor||``;return K.resetFor=null,q.reset.pin=``,$(),Tm(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return K.confirmOff=i.dataset.admOff,K.resetFor=null,$(),Tm(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=K.confirmOff||``;return K.confirmOff=null,$(),Tm(`[data-adm-off="${CSS.escape(e)}"]`),xm(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=K.users?.find(t=>t.usuario===e);return K.confirmOff=null,Am(()=>at.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}if(e.target.closest(`[data-adm-cred-copy]`))return K.credential&&bm(gp(K.credential)).then(e=>{xm(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0;if(e.target.closest(`[data-adm-cred-hide]`))return K.credential=null,$(),Tm(`#adm-usuarios`),xm(`Listo. El PIN ya no se muestra.`),!0;if(e.target.closest(`[data-adm-live-refresh]`))return cp(!0),!0;let o=e.target.closest(`[data-adm-pago-libro]`);return o?(km(o.dataset.admPagoLibro),!0):!1}function Mm(e){let t=e.target.closest?.(`[data-adm-pagos-mes]`);if(t){e.type===`change`&&K.pagosMes!==t.value&&(K.pagosMes=t.value,Q(),xm(`Pagos de ${t.value===`todos`?`todos los meses`:lm(t.value).toLowerCase()}.`));return}let n=e.target.closest?.(`[data-adm-draft]`);if(!n)return;let r=n.dataset.admDraft,i=n.dataset.admKey,a=n.type===`checkbox`?n.checked:n.value;if(r===`roles`?q.roles[i]=a:q[r][i]=a,r===`crear`&&i===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${J(rt[n.value]||n.value)}:</strong> ${J(dp(n.value))}`)}}function Nm(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=zf(),r=n.includes(e);return Bf(Cf,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),xm(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),Cm(n.dataset.admGoto),!0;if(jm(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),Sm(),xm(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(bm(ym()).then(e=>{xm(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function Pm(e){if(e.target.matches?.(`[data-adm-section]`)&&Sm(),e.target.matches?.(`[data-adm-dogs]`)){let t=e.target.dataset.admDogs;e.target.open?K.openDogs.add(t):K.openDogs.delete(t)}}function Fm(){_e.push(wm),ye.push(Nm),document.addEventListener(`toggle`,Pm,!0),document.addEventListener(`submit`,Dm),document.addEventListener(`input`,Mm),document.addEventListener(`change`,Mm),$e(e=>{(kf.includes(e)||Af.includes(e))&&Q()}),setInterval(()=>{if(!qf()||_.user()?.rol!==`admin`||document.visibilityState!==`visible`)return;let e=ap(ip());e!==K.lateSignature&&(K.lateSignature=e,Q())},3e4),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var Im=document.querySelector(`#app`);function Lm(e){return e.replace(/\/+$/,``)||`/`}function Rm(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ce(),Ct(),Nt(),gr(),Oa(),jc(),Sf(),Fm(),document.addEventListener(`click`,e=>{if(be(_e,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),Rm(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{be(ve,e)});function $(){let e=Lm(window.location.pathname);if(e===`/`){Im.innerHTML=mt(),Bm();return}if(e===`/login`){Im.innerHTML=Dt(),Bm();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),_.clear(),Im.innerHTML=Dt(),Bm();return}if(e===`/registro`||e===`/register`){Im.innerHTML=kt(),Bm();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(Im.innerHTML=zm(r),Bm()):(Im.innerHTML=pe(),Bm())}function zm(e){if(e===`cliente`)return Vm(e);let t=_.user();return t?(nt[t.rol]||[]).includes(e)?Vm(e):At(e):(window.history.replaceState({},``,`/login?volver=/${e}`),Dt())}function Bm(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=me()+ge(),document.body.classList.toggle(`menu-locked`,e.menuOpen),He(),Ve()}function Vm(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:kp,coordinador:kd,supervisor:qs,paseador:Hi,cliente:Vn}[e]();return i?Vi(o):a?Gs(o):e===`coordinador`?Dd(o):e===`admin`?Dp(o):oe(`
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