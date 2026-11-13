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
  `}function ze(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){Oe=!Oe,Re(),Oe?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);De={...De,[e]:n},Ae(),Ie(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else Oe&&!e.target.closest(`#a11y-root`)&&(Oe=!1,Re())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Oe&&(Oe=!1,Re(),document.querySelector(`.a11y-toggle`)?.focus())}),je.addEventListener?.(`change`,Ie),Me.addEventListener?.(`change`,Ie),Ie()}var Be={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function Ve(){Be.frame&&cancelAnimationFrame(Be.frame),Be.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Pe(),r=Ne()?[22,52,39]:[184,218,198],i=Ne()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Be.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Be.lastDraw>33&&(Be.lastDraw=e,s(e/1e3)),Be.frame=requestAnimationFrame(l)}Be.frame=requestAnimationFrame(l)}function He(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ue=`pj_sesion`,We=`pj_pendientes`,Ge=`pj_cache_`,Ke=6e4;fetch(`/api/salud`).then(e=>e.json()).then(e=>{/provisorio/i.test(e.almacenamiento||``)&&(Ke=3e5)}).catch(()=>{});var qe=new Set,Je=new Map,Ye=new Set;document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Ye.forEach(e=>e())});function Xe(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ze(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Qe(e){qe.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function $e(e){return qe.add(e),()=>qe.delete(e)}var et=class extends Error{constructor(e,t){super(t),this.status=e}};async function tt(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=_.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new et(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(_.clear(),Qe(`sesion`)),!o.ok||s.ok===!1)throw new et(o.status,s.error||`Error del servidor.`);return s}var _={token:()=>Xe(Ue,null)?.token||null,user:()=>Xe(Ue,null)?.user||null,set(e,t){Ze(Ue,{token:e,user:t}),Qe(`sesion`)},clear(){try{localStorage.removeItem(Ue),Object.keys(localStorage).filter(e=>e.startsWith(Ge)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return tt(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await tt(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return _.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await tt(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return _.set(i.token,i.user),i.user},async refresh(){let e=_.token();if(!e)return null;let t=await tt(`/api/auth/me`);return t.user&&_.token()===e&&_.set(e,t.user),t.user},async changePin(e,t){let n=await tt(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return _.set(n.token,n.user),n.user},logout(){_.clear(),Qe(`sesion`)}},nt={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],ayudante:[`paseador`],marketing:[]},rt={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,ayudante:`Ayudante de paseador`,marketing:`Marketing`};function it(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`,ayudante:`/paseador`}[e]||`/`}var at={list:async()=>(await tt(`/api/usuarios`)).usuarios,save:async e=>(await tt(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>tt(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function ot(e,t={}){return`${Ge}${e}_${t.desde||``}_${t.prefijo||``}`}function st(e,t){let n=Xe(We,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var v={cached(e,t={}){return st(e,Xe(ot(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await tt(`/api/registros?${n}`),i=localStorage.getItem(ot(e,t));return Ze(ot(e,t),r.registros),i!==JSON.stringify(r.registros)&&Qe(e),st(e,r.registros)}catch(n){if(n.status===0)return v.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=ct(n.fecha);try{let t=await tt(`/api/registros`,{method:`POST`,body:{col:e,...n}});return lt(e,t.registro),Qe(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Xe(We,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:_.user()?.usuario,at:Date.now()}),Ze(We,a),Qe(e),{...n,pendiente:!0}}},async remove(e,t){await tt(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{Ze(e,Xe(e,[]).filter(e=>e.id!==t))}),Qe(e)},pendingCount(){return Xe(We,[]).length},watch(e,t={}){let n=ot(e,t);if(Je.has(n))return Je.get(n);let r=()=>{document.visibilityState===`visible`&&_.token()&&v.list(e,t).catch(()=>{})};r(),Ye.add(r);let i=setInterval(r,Ke);setTimeout(()=>{clearInterval(i),i=setInterval(r,Ke)},3e3);let a=()=>{Ye.delete(r),clearInterval(i),Je.delete(n)};return Je.set(n,a),a}};function ct(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function lt(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{let n=Xe(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Ze(e,n)})}var ut=!1;async function dt(){if(ut||!_.token())return 0;let e=_.user()?.usuario,t=Xe(We,[]);if(!t.length)return 0;ut=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await tt(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});lt(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Ze(We,Xe(We,[]).filter(e=>!n.has(e.at))),ut=!1,r.forEach(e=>Qe(e))}return n.size}window.addEventListener(`online`,()=>dt()),setInterval(()=>dt(),3e4);async function ft(e){return tt(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function pt(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}function mt(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function ht(){return oe(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${gt()}
      ${_t()}
      ${vt()}
      ${St()}
      <a class="whatsapp" href="${re(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function gt(){return`
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
  `}function _t(){return`
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

    ${yt()}

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
  `}function vt(){return`
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
  `}function yt(){return`
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

        ${bt()}
      </div>
    </section>
  `}function bt(){return mt()?`
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
  `}function xt(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`)].filter(e=>e!==null).join(`
`)}function St(){return`
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
  `}function Ct(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(re(xt(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,ft(Object.fromEntries(i)).then(()=>{n.textContent=`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function wt(){document.addEventListener(`submit`,Ct)}var Tt=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),Et={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function Dt(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function Ot(){let e=_.user();if(e)return kt(e);Et.necesitaConfiguracion===null&&!Et.cargando&&(Et.cargando=!0,_.status().then(e=>{Et.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{Et={...Et,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{Et.cargando=!1,$()}));let t=Et.necesitaConfiguracion===!0;return oe(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${Et.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Código de configuración <input name="codigo" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Te lo pasó JUAN 3.0" /></label>`:``}
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>`}
        <p class="acc-status ${Et.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${Tt(Et.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function kt(e){return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${Tt(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${Tt(e.usuario)}</strong> (${Tt(e.rol)}).</p>
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
  `)}function At(){return oe(`
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
  `)}function jt(e){let t=_.user(),n=nt[t?.rol]||[];return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${Tt(t?.nombre)}</strong> (${Tt(t?.rol)}) y la página de ${Tt(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function Mt(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function Nt(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return Mt(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return Mt(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return Mt(t,`Completá usuario y PIN.`,!0);i.disabled=!0,Mt(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await _.changePin(r.actual,r.nuevo);t.reset(),Mt(t,`Listo: tu PIN quedó cambiado.`),it(e.rol)!==`/`&&setTimeout(()=>op(it(e.rol)),900);return}let e=n===`setup`?await _.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin,codigo:r.codigo}):await _.login(r.usuario,r.pin);if(Et={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){op(`/login`);return}let i=Dt();op(i&&(nt[e.rol]||[]).includes(i.slice(1))?i:it(e.rol))}catch(e){Mt(t,e instanceof et?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function Pt(){document.addEventListener(`submit`,Nt)}var y=`Pendiente de confirmar`,Ft=`12/11/2026`,b={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},It=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Lt={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},x={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},S=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],Rt=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],zt={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Bt=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Vt={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},C=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),Ht=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Ut=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],Wt=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function Gt(e,t,n){return!!e.schedule?.[t]?.includes(n)}function Kt(e,t){return C.filter(n=>Gt(n,e,t))}function qt(e=new Date){return S[(e.getDay()+6)%7]}function w(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var Jt=[[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Flora`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,20,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Lunes`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Coqui`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Manolo`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Lunes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Martes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:15`,`Forest`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:30`,`Sam`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:45`,`Coqui`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:00`,`Manolo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Séptima`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Rambo`,20,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam ni Cashi`],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Morris`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:45`,`Lokaku`,45,`Bozal`],[`Miércoles`,`Mañana`,`PJ_1M`,`11:00`,`Paco`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Tayler`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Duque`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:30`,`Rambo`,20,``],[`Miércoles`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:30`,`Annie`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:45`,`Séptima`,45,`Sin días contratados cargados`],[`Miércoles`,`Tarde`,`PJ_2T`,`16:00`,`Milo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:15`,`Flora`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Jueves`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`11:00`,`Rambo`,20,``],[`Jueves`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`14:45`,`Forest`,45,`Bozal`],[`Jueves`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Jueves`,`Tarde`,`PJ_1T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Jueves`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`16:15`,`Rambo`,20,`Revisar duración`],[`Viernes`,`Mañana`,`PJ_1M`,`09:45`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Runa`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:50`,`Kiara`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Flora`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Viernes`,`Tarde`,`PJ_2T`,`14:45`,`Coqui`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`16:00`,`Séptima`,45,`Sin días contratados cargados`],[`Viernes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Viernes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,5,`Revisar duración`],[`Sábado`,`Mañana`,`PJ_1M`,`09:15`,`Sam`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`14:45`,`Forest`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Roma`,55,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Milo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`16:00`,`Tayler`,45,``]],Yt={"Lunes|Mañana":`Juan`,"Lunes|Tarde":`Nicolás`,"Martes|Mañana":`Juan`,"Martes|Tarde":`Nicolás`,"Miércoles|Mañana":`Juan`,"Miércoles|Tarde":`Nicolás`,"Jueves|Mañana":`Juan`,"Jueves|Tarde":`Nicolás`,"Viernes|Mañana":`Nicolás`,"Viernes|Tarde":`Nicolás`,"Sábado|Mañana":`Juan`,"Sábado|Tarde":`Juan`},Xt=new Map(C.map(e=>[e.name,e]));function Zt(e,t){let[n,r]=e.split(`:`).map(Number),i=n*60+r+Number(t||0);return`${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}var Qt=Jt.map(([e,t,n,r,i,a,o])=>({dia:e,turno:t,ruta:n,hora:r,perroId:Xt.get(i)?.id||null,perroNombre:i,minutos:a,salida:Zt(r,a),nota:o}));function $t(){let e=new Map;return Qt.forEach(t=>{let n=`${t.ruta}_${t.dia.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}`;e.has(n)||e.set(n,{id:n,dia:t.dia,turno:t.turno,ruta:t.ruta,paseador:``,ayudante:``,supervisor:Yt[`${t.dia}|${t.turno}`]||``,paradas:[],origen:`Planilla RPJ, BASE RUTAS (12/11/2026)`}),e.get(n).paradas.push({perroId:t.perroId,perroNombre:t.perroNombre,hora:t.hora,minutos:t.minutos,nota:t.nota})}),[...e.values()].map(e=>({...e,paradas:e.paradas.sort((e,t)=>e.hora.localeCompare(t.hora))}))}var en=[`Mapuche Country Club`,`La Lonja`,`Pilar (otros barrios)`],T={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},tn=`Tu perro`,nn={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},rn=[`Pequeño`,`Mediano`,`Grande`],an=S.filter(e=>e!==`Domingo`),on={Mañana:x.manana,Tarde:x.tarde};function sn(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function cn(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function ln(){let e=sn(T.plan,null);if(!e||typeof e!=`object`)return{...nn};let t=Rt.find(t=>t.id===e.planId)?e.planId:nn.planId,n=rn.includes(e.size)?e.size:nn.size,r=on[e.shift]?e.shift:nn.shift,i=Array.isArray(e.days)?an.filter(t=>e.days.includes(t)):nn.days;return{planId:t,size:n,shift:r,days:i.length?i:nn.days}}function un(){let e=sn(T.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function dn(){let e=sn(T.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function fn(e){let t=sn(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function pn(){let e=sn(T.carnet,null);return e&&typeof e.name==`string`?e:null}function E(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function mn(e){return`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(e)}`}function hn(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function gn(e,t){return new Date(e.getTime()+t*864e5)}function _n(e){return S[(e.getUTCDay()+6)%7]}function vn(e){return e.toISOString().slice(0,10)}function yn(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function bn(e){let[t,n,r]=e.split(`-`).map(Number);return yn(new Date(Date.UTC(t,n-1,r)))}function xn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function Sn(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function Cn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function wn(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function Tn(e,t,n){return`${e} ${e===1?t:n}`}function En(){let e=ln(),t=Rt.find(t=>t.id===e.planId),n=on[e.shift],r=un(),i=hn(),a=vn(i.date),o=dn().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||tn}}function Dn(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=_n(r.date),s=Sn(n.from),c=Sn(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function On(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=gn(a.date,e);r.days.includes(_n(t))&&(e===0&&a.minutes>Sn(i.to)||n&&o.has(vn(t))||s.push(t))}return s}var kn=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],An=kn.flatMap(e=>e.fields);function jn(e,t){return!!String(e[t]??``).trim()}function Mn(e,t){return t.fields.filter(t=>jn(e,t.key)).length}function Nn(e){return An.filter(t=>jn(e,t.key)).length}function Pn(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function Fn(e){let{ficha:t}=e,n=[],r=kn.find(e=>e.id===`emergencia`);Mn(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),pn()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=Nn(t);return i<An.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${An.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function In(e){return e.todayIso<=r.until}var D={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function Ln(e,t,n=``){D.status[e]={message:t,html:n}}function Rn(e){let t=D.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${E(t.message)} ${t.html}`.trim():``}</p>`}function zn(){return`
    <div class="cl-page" data-cl-root>
      ${Bn(En())}
    </div>
  `}function Bn(e){return`
    <p class="cl-demo-note">
      ${g(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${Vn(e)}
    ${Gn(e)}
    ${qn()}
    ${Jn(e)}
    ${Yn(e)}
    ${Xn(e)}
    <div class="cl-two-col">
      ${tr()}
      ${nr(e)}
    </div>
    ${In(e)?rr():``}
    ${ir()}
  `}function Vn(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=Dn(e),c=Pn(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=On(e,1)[0],d=u&&vn(u)===e.todayIso,f=Fn(e),p={libre:`Los días de paseo de tu plan son ${wn(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${g(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${E(a)}</strong>
            <small>${E(i.name)} · ${E(r.size)} · Turno ${E(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${E(_n(t.date))} ${yn(t.date)}</p>
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
        <div data-cl-region="alertas-hoy">${Un(c,!0)}</div>
        ${Wn(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${g(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:E(_n(u))}</p>
            <p class="cl-next-date">${d?`${E(_n(u))} ${yn(u)}`:yn(u)}</p>
            <p class="cl-next-shift">Turno ${E(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${y}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${Hn(e,f)}</div>
        </article>
      </div>
    </section>
  `}function Hn(e,t=Fn(e)){return t.length?`
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
  `:`<p class="cl-all-done">${g(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function Un(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${g(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${E(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function Wn(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=gn(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${S.map((e,t)=>gn(a,t)).map(e=>{let t=vn(e),a=_n(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${yn(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${Cn(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function Gn(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${g(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${mn(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${E(b.whatsappLabel)}</small></span>
      </a>
      ${In(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${g(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${E(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function Kn(){return`Ahora: tema ${Ne()?`oscuro`:`claro`} · movimiento ${Pe()?`calmo (sin movimiento)`:`normal`}.`}function qn(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${g(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${Kn()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function Jn(e){let t=On(e,10);return`
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
                ${t.map(t=>`<option value="${vn(t)}">${E(_n(t))} ${yn(t)} · turno ${E(e.settings.shift.toLowerCase())}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-absence-reason"><span>Motivo <span class="cl-optional">(opcional)</span></span>
              <input id="cl-absence-reason" type="text" maxlength="140" placeholder="Por ejemplo: viaje" data-cl-absence-reason />
            </label>
            <button type="button" class="cl-btn" data-cl-absence-save>
              ${g(`message`,`cl-icon-sm`)} Avisar por WhatsApp
            </button>
            <p class="cl-fine">Se abre WhatsApp con el mensaje listo: solo tenés que tocar Enviar. El aviso también queda anotado en este dispositivo.</p>
          `:`<p>${y}: no hay próximos paseos con los días de tu plan.</p>`}
          ${Rn(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${E(_n(xn(e.date)))} ${bn(e.date)}</strong>
                    ${e.reason?`<small>${E(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${E(e.date)}" aria-label="Quitar la ausencia del ${bn(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function Yn(e){let{plan:t,settings:n,shift:r}=e,i=zt[n.size],a=n.days.length===t.walks;return`
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
          <p class="cl-plan-walks">${Tn(t.walks,`paseo`,`paseos`)} por semana · ${E(n.size)}</p>
          <p class="cl-plan-price"><b>${w(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${an.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${Cn(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${E(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${y}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${g(`alertCircle`,`cl-icon-sm`)} El ${E(t.name)} incluye ${Tn(t.walks,`paseo`,`paseos`)} por semana y hay ${Tn(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${E(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${Rt.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${E(e.name)}</strong>
            <span>${Tn(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${w(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${E(n.size.toLowerCase())}):</strong> individual ${w(i.individual)} · en grupo ${w(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Bt.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${D.openGroups.has(`plan`)?`open`:``}>
        <summary>${g(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${Rt.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${E(e.name)} · ${Tn(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${rn.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(on).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${an.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${Rn(`plan`)}
        </div>
      </details>
    </section>
  `}function Xn(e){let{ficha:t}=e,n=Nn(t),r=An.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${E(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${y}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${Zn(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${E(Vt[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${y}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${Un(Pn(t))}</div>

      <div class="cl-ficha-groups">
        ${kn.map(e=>$n(e,t)).join(``)}
      </div>
      ${Rn(`ficha`)}
    </section>
  `}function Zn(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function Qn(e,t){let n=Mn(e,t);return n===t.fields.length?`<span class="cl-count is-done">${g(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${y.toLowerCase()}</span>`}function $n(e,t){let n=D.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${g(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${Qn(t,e)}</span>
        ${g(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>er(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function er(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${y}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${E(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${E(e.placeholder||`Pendiente de confirmar`)}">${E(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${E(r)}" placeholder="${E(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${jn(t,e.key)?``:y}</small>`:``}
    </label>
  `}function tr(){let e=pn();return`
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
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${E(e.date)}`:y}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${mn(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${Rn(`carnet`)}
    </section>
  `}function nr(e){let t=fn(T.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${w(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${mn(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
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
        <a class="cl-btn is-secondary" href="${mn(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${g(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${Rn(`comprobante`)}
    </section>
  `}function rr(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${g(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${E(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${E(r.title)}</h2>
        <p>${E(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${mn(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function ir(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${g(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${D.resetArmed?`is-danger`:``}" data-cl-reset>
        ${D.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${Rn(`privacidad`)}
    </section>
  `}function ar(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=Bn(En()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function or(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=En();Object.entries({pendientes:()=>Hn(t),"alertas-hoy":()=>Un(Pn(t.ficha),!0),"alertas-ficha":()=>Un(Pn(t.ficha)),"ficha-progreso":()=>Zn(Nn(t.ficha),An.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),kn.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=Qn(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=jn(t.ficha,e.dataset.clFieldState)?``:y})}function sr(e,t,n=``){Ln(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${E(t)} ${n}`.trim())}function cr(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,D.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Pe()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function lr(){return yn(hn().date)}function ur(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return cr(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=En(),r=dn().filter(t=>t.date!==e);r.push({date:e,reason:t}),cn(T.ausencias,r);let i=mn([`Hola, aviso que ${n.dogName===tn?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${_n(xn(e)).toLowerCase()} ${bn(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),Ln(`ausencia`,`Listo: anotamos la ausencia del ${bn(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),ar(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return cn(T.ausencias,dn().filter(t=>t.date!==e)),Ln(`ausencia`,`Quitamos la ausencia del ${bn(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),ar(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=Rt.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(sr(`plan`,`El ${r.name} incluye ${Tn(r.walks,`paseo`,`paseos`)} por semana: elegí ${Tn(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(cn(T.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),Ln(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),ar(`[data-cl-plan-save]`),!0):(sr(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return D.resetArmed?(Object.values(T).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),D.resetArmed=!1,D.status={},Ln(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),ar(`[data-cl-reset]`),!0):(D.resetArmed=!0,ar(`[data-cl-reset]`),!0);if(D.resetArmed&&!e.target.closest(`[data-cl-reset]`)){D.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function dr(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:lr()};if(t.dataset.clFile===`carnet`)cn(T.carnet,n),Ln(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),ar(`[data-cl-status='carnet']`);else{let t=[n,...fn(T.comprobantes)].slice(0,10);cn(T.comprobantes,t),Ln(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),ar(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=un();sr(`ficha`,cn(T.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function fr(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=un();cn(T.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),or()}function pr(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?D.openGroups.add(t.dataset.clDetails):D.openGroups.delete(t.dataset.clDetails))}function mr(){_e.push(ur),ve.push(dr),document.addEventListener(`input`,fr),document.addEventListener(`toggle`,pr,!0),Fe(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${Kn()} Se guarda solo en este dispositivo.`)})}var hr=`America/Argentina/Buenos_Aires`,gr=`paseosJuan_paseador_progreso`,_r=`paseosJuan_paseador_equipo`,vr=`paseosJuan_paseador_incidente`,yr=`paseosJuan_paseador_ruta`,O=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],br={pendiente:0,retirado:1,paseando:2,entregado:3},xr=`no-sale`,Sr={Mañana:`manana`,Tarde:`tarde`},Cr=/^[a-z0-9][a-z0-9_.-]{0,60}$/i,wr={Mañana:x.manana,Tarde:x.tarde},Tr=[`Bajo`,`Medio`,`Alto`],Er=[`No se ven`,`Sí`,`No sé`],Dr=`Perro externo`,Or=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,kr=$t(),k={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``,routeChange:null};function A(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Ar(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function jr(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Mr(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim().toLowerCase()}function Nr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:hr,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:qt(t)}}function Pr(e){let[t,n,r]=String(e).split(`-`);return r?`${r}/${n}/${t}`:e}function Fr(e,t){let n=(S.indexOf(e)-S.indexOf(t.day)+7)%7,[r,i,a]=t.iso.split(`-`).map(Number);return new Date(Date.UTC(r,i-1,a+n)).toISOString().slice(0,10)}function Ir(e){return e.minutes<810?`Mañana`:`Tarde`}function j(){let e=Nr(),t=k.day||e.day,n=k.shift||Ir(e),r=t===e.day;return{now:e,day:t,shift:n,isToday:r,iso:r?e.iso:Fr(t,e)}}function Lr(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Rr(e){let t=wr[e];return`${t.from} a ${t.to}`}function zr(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}function Br(e){if(e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t} h ${n} min`:`${t} h`}function Vr(e,t,n=`retiro`){let r=zr(e);if(r===null)return{text:`Hora: ${y.toLowerCase()}`,kind:`info`};let i=r-t;return i>0?{text:`${n===`entrega`?`Entrega `:``}${n===`entrega`?`en`:`En`} ${Br(i)}`,kind:i<=10?`soon`:`ok`}:i===0?{text:n===`entrega`?`Entrega ahora`:`Ahora`,kind:`soon`}:{text:n===`entrega`?`Entrega con ${Br(-i)} de atraso`:`${Br(-i)} de atraso`,kind:`late`}}function Hr(e,t,n=`retiro`){let r=Vr(e,t,n);return`<span class="pw-cd pw-cd--${r.kind}" data-pw-countdown="${A(e)}" data-pw-mode="${n}">${A(r.text)}</span>`}function Ur(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function Wr(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function Gr(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${Lr(i)}`),t=t.filter(e=>!e.includes(r))}return n}function Kr(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function qr(e){return e.safety.some(e=>/bozal/i.test(e))}var Jr=Ht.filter(e=>e.sebastian>0),Yr=Ht.filter(e=>e.sebastian===0&&e.juan>0),Xr=Ht.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function Zr(){return _.user()||{}}function Qr(){return Zr().nombre||`equipo`}function $r(){return Zr().rol===`ayudante`}function ei(e){let t=Zr();if(!e||!t.usuario)return!1;let n=Mr(e);return n===Mr(t.usuario)||t.nombre&&n===Mr(t.nombre)}function ti(e,t=new Map){if(!e)return``;if(ei(e))return Zr().nombre||String(e);let n=String(e);return t.get(n)||t.get(Mr(n))||It.find(e=>e.id===Mr(n))?.name||n}function ni(e,t){return Mr(e)===Mr(t)}function ri(e){return Mr(e).startsWith(`tarde`)?`Tarde`:`Mañana`}function ii(e){return C.find(t=>t.id===e.perroId)||C.find(t=>Mr(t.name)===Mr(e.perroNombre))||{id:Cr.test(String(e.perroId||``))?String(e.perroId):``,name:String(e.perroNombre||`Perro sin nombre`),size:y,minutes:null,safety:[],status:`Activo`,unknown:!0}}function ai(e,t){let n=(Array.isArray(e.paradas)?e.paradas:[]).filter(e=>e&&(e.perroId||e.perroNombre)).map((e,t)=>{let n=ii(e),r=Number(e.minutos)||n.minutes||null,i=zr(e.hora)===null?``:String(e.hora).trim().padStart(5,`0`);return{index:t,dog:n,hora:i,minutos:r,salida:i&&r?Zt(i,r):``,nota:String(e.nota||``).trim(),canSave:!!n.id}}).sort((e,t)=>(zr(e.hora)??9999)-(zr(t.hora)??9999)||e.index-t.index);return{ruta:String(e.ruta||`Pendiente de confirmar`),turno:ri(e.turno),dia:e.dia||``,paseador:String(e.paseador||``),ayudante:String(e.ayudante||``),supervisor:String(e.supervisor||``),notas:String(e.notas||``),fuente:t,record:e,stops:n}}function oi(e,t,n){let r=new Map;v.cached(`rutas`,{desde:n}).filter(t=>t.fecha===e&&t.ruta&&Array.isArray(t.paradas)).sort((e,t)=>String(e.actualizadoEn||``).localeCompare(String(t.actualizadoEn||``))).forEach(e=>r.set(e.ruta,e));let i=v.cached(`plantillas`).filter(e=>e.ruta&&Array.isArray(e.paradas)),a=i.length===0,o=new Map;return(a?kr:i).filter(e=>ni(e.dia,t)).forEach(e=>o.set(e.ruta,ai(e,a?`planilla`:`plantilla`))),r.forEach((e,t)=>o.set(t,ai(e,`dia`))),[...o.values()].sort((e,t)=>e.turno===t.turno?e.ruta.localeCompare(t.ruta):e.turno===`Mañana`?-1:1)}function si(e){let t=Ar(yr,{})?.[Zr().usuario||``];return t&&t.iso===e.iso&&t.turno===e.shift?t.ruta:``}function ci(e,t){let n=Ar(yr,{}),r=n&&typeof n==`object`?n:{};r[Zr().usuario||``]=t?{iso:e.iso,turno:e.shift,ruta:t}:null,jr(yr,r)}function li(e){let t=oi(e.iso,e.day,e.now.iso),n=t.filter(t=>t.turno===e.shift),r=n.filter(e=>ei(e.paseador)||ei(e.ayudante)),i=t.filter(t=>t.turno!==e.shift&&(ei(t.paseador)||ei(t.ayudante))),a=r.length?``:n.some(t=>t.ruta===si(e))?si(e):``,o=r.length?r:a?n.filter(e=>e.ruta===a):n;return{all:t,ofShift:n,mine:r,elsewhere:i,picked:a,shown:o,assigned:r.length>0,helping:r.find(e=>ei(e.ayudante)&&!ei(e.paseador))||null,fromPlanilla:o.some(e=>e.fuente===`planilla`)}}function ui(e){return e.flatMap(e=>e.stops.map(t=>({...t,route:e})))}function di(e,t){return ui(li(e).shown).find(e=>e.dog.id===t)||null}var fi=new Map;function pi(e,t){if(!e.isToday||!M.ready)return;let n=[];t.forEach(r=>{let i=`${e.iso}|${r.turno}|${r.ruta}`,a=new Map(r.stops.map(e=>[e.dog.id||Mr(e.dog.name),e])),o=fi.get(i);if(fi.set(i,a),!o)return;let s=[...a.entries()].filter(([e])=>!o.has(e)).map(([,e])=>`${e.dog.name}${e.hora?` (${e.hora})`:``}`),c=[...o.entries()].filter(([e])=>!a.has(e)).map(([,e])=>e.dog.name),l=[...a.entries()].filter(([e,t])=>o.has(e)&&o.get(e).hora!==t.hora).map(([e,t])=>`${t.dog.name} pasa de ${o.get(e).hora||`sin hora`} a ${t.hora||`sin hora`}`),u=[];s.length&&u.push(`se ${s.length===1?`sumó`:`sumaron`} ${Lr(s)}`),c.length&&u.push(`se ${c.length===1?`quitó`:`quitaron`} ${Lr(c)}`),l.length&&u.push(`cambió el horario: ${Lr(l)}`),u.length&&n.push(`${t.length>1?`${r.ruta}: `:``}${u.join(` / `)}`)}),n.length&&(k.routeChange={text:`La ruta cambió: ${n.join(`. `)}.`,time:e.now.time},N(k.routeChange.text))}function mi(e){return v.cached(`avisos`).filter(t=>{let n=String(t.fecha||``),r=String(t.vigenteHasta||``);return n&&n>e?!1:r?r>=e:n===e}).sort((e,t)=>String(t.actualizadoEn||t.fecha||``).localeCompare(String(e.actualizadoEn||e.fecha||``)))}function hi(e){let t=mi(e.now.iso);return t.length?`
    <section class="pw-notices" aria-labelledby="pw-avisos-title">
      <h2 class="pw-section-label" id="pw-avisos-title">${g(`bell`,`pw-icon pw-icon--sm`)} Avisos por barrio (${t.length})</h2>
      <ul class="pw-notice-list" role="list">
        ${t.map(e=>{let t=/seguridad|perro suelto/i.test(e.tipo||``);return`
            <li class="pw-notice ${t?`pw-notice--danger`:``}">
              ${g(t?`alertTriangle`:`mapPin`,`pw-icon`)}
              <div>
                <p class="pw-notice-head"><strong>${A(e.barrio||`Barrio sin cargar`)}</strong>${e.tipo?` · ${A(e.tipo)}`:``}</p>
                <p>${A(e.mensaje||e.titulo||``)}</p>
                <p class="pw-notice-meta">${e.vigenteHasta?`Vigente hasta el ${A(Pr(e.vigenteHasta))}`:`Vigente hoy`}${e.creadoPorNombre?` · Avisó ${A(e.creadoPorNombre)}`:``}</p>
              </div>
            </li>
          `}).join(``)}
      </ul>
    </section>
  `:``}function gi(e,t,n){return`${e}_${t}_${Sr[n]}`}function _i(e,t,n=Zr().usuario){return`${e}_${n||`sin-usuario`}_${Sr[t]}`}var vi=new Map;function yi(e,t){let n=new Map(v.cached(e,{desde:t}).map(e=>[e.id,e]));return vi.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function bi(e){let t=O.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===xr;return{step:r?0:Math.max(br[e.estado]??0,n),noSale:r,times:t,record:e}}function xi(e,t,n){let r=yi(`paseos`,e);return Object.fromEntries(n.filter(e=>e.id).map(n=>[n.id,bi(r.get(gi(e,n.id,t)))]))}function Si(e,t){return t.dog.id&&e[t.dog.id]||bi(null)}function Ci(e,t){let n=e.filter(e=>Si(t,e).noSale).length,r=e.filter(e=>!Si(t,e).noSale&&Si(t,e).step>=O.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function wi(e,t){let n=yi(`checklists`,e).get(_i(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:Jr.filter(e=>r[e.item]===!0).map(e=>e.item)}}function Ti(e){let t=new Map,n=(e,n)=>{e&&n&&t.set(String(e),String(n))};return[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]].forEach(([e,t])=>{v.cached(e,t).forEach(e=>{n(e.creadoPor,e.creadoPorNombre),n(e.actualizadoPor,e.actualizadoPorNombre),O.forEach(t=>n(e[`${t.field}Por`],e[`${t.field}PorNombre`]))})}),t}function Ei(e,t){return e?ei(e)?`vos`:ti(e,t):y}function Di(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:hr,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Oi(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Di(e.actualizadoEn);return`Último cambio: ${Ei(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}function ki(e,t,n){let r=O[t].field,i=e?.[`${r}Por`];return!i||ei(i)?``:e[`${r}PorNombre`]||ti(i,n)}var Ai=Promise.resolve();function ji(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&vi.set(r,n);let i=Ai.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await v.save(e,i);return k.syncError&&=``,t}catch(e){return k.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,pa(k.syncError),null}finally{r&&vi.get(r)===n&&vi.delete(r),va()}});return Ai=i.catch(()=>null),i}function Mi(e,t,n,r){let i=t.now.iso,a={id:gi(i,e.dog.id,t.shift),fecha:i,perroId:e.dog.id,perroNombre:e.dog.name,turno:t.shift,ruta:e.route.ruta,...n};return N(r),ji(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&N(`${r} Sin señal: se enviará cuando haya señal.`)})}function Ni(e,t){let n=e.now.iso,r=Object.fromEntries(Jr.map(e=>[e.item,t.includes(e.item)])),i={id:_i(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=Jr.length};return ji(`checklists`,i,{optimisticRecord:i})}var M={key:``,stops:[],ready:!1};function Pi(e){let t=`${e}|${Zr().usuario||``}`;if(M.key===t)return;M.stops.forEach(e=>e()),M.key=t,M.stops=[],M.ready=!1;let n=[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]];Promise.allSettled(n.map(([e,t])=>v.list(e,t))).then(t=>{let n=t.find(e=>e.status===`rejected`);return n&&(k.syncError=`No se pudieron traer los datos del equipo: ${n.reason?.message||`error del servidor`}`,pa(k.syncError)),Ii(e)}).catch(()=>null).finally(()=>{M.key===t&&(M.ready=!0,va(),M.stops=n.map(([e,t])=>v.watch(e,t)))})}var Fi=!1;async function Ii(e){if(Fi)return;Fi=!0;let t=Ar(gr,null),n=Ar(_r,null);if(!t&&!n)return;let r=[],i=yi(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&Sr[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=C.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=gi(e,t,o),c=bi(i.get(s)),l=Math.min(n.length,O.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:O[l-1].estado};O.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(ji(`paseos`,u,{optimisticRecord:u}))})});let a=yi(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!Sr[o]||!Array.isArray(n))return;let s=n.filter(e=>Jr.some(t=>t.item===e));s.length&&!a.has(_i(e,o))&&r.push(Ni({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(gr),localStorage.removeItem(_r)}catch{}r.length&&N(`Se subió al equipo lo que tenías marcado en este celular.`)}}function Li(){let e=Ar(vr,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function Ri(e){return`
    <div class="pw-shell">
      ${Bi()}
      ${e}
    </div>
  `}function zi(){let e=j();Pi(e.now.iso);let t=li(e);pi(e,t.shown),Ea.iso=e.now.iso,Ea.shift=Ir(e.now),Ea.minute=e.now.minutes;let n=ui(t.shown),r=e.isToday?xi(e.iso,e.shift,n.map(e=>e.dog)):{},i=Ti(e.now.iso);return`
    <main class="pw-main" id="pw-inicio">
      ${Vi()}
      ${Hi()}
      ${hi(e)}
      ${Wi(e,t,n,r,i)}
      <div class="pw-routes" id="pw-perros" tabindex="-1" aria-label="Perros de la ruta">
        ${t.shown.length?t.shown.map(n=>Xi(n,e,t,r,i)).join(``):`
            <div class="pw-empty">
              <p><strong>No hay rutas cargadas para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
              <p>Si te pidieron un paseo, confirmalo con el coordinador o con Juan.</p>
            </div>
          `}
      </div>
      <div class="pw-columns">
        ${$i(e,t,i)}
        ${ea(e,n.map(e=>e.dog))}
      </div>
      <footer class="pw-footer">
        <p>Rutas y horarios: los arma el coordinador. Punto de partida: ${A(b.officialSources.routes)} (12/11/2026).</p>
        <p>Lo que marcás acá lo ven ${$r()?`el paseador, `:`tu ayudante, `}Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `}function Bi(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel ${$r()?`del ayudante de paseador`:`del paseador`}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>${$r()?`Ayudante`:`Paseador`} · ${A(Qr())}</small>
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
  `}function Vi(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${g(`uploadCloud`,`pw-icon`)}<span>${A(n)}</span></p>`),k.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${g(`alertTriangle`,`pw-icon`)}
        <span>${A(k.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function Hi(){return k.routeChange?`
    <div class="pw-change" data-pw-change>
      ${g(`route`,`pw-icon pw-icon--lg`)}
      <div>
        <strong>${A(k.routeChange.text)}</strong>
        <p>Lo cambió el coordinador. Aviso recibido a las ${A(k.routeChange.time)}.</p>
      </div>
      <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-change-ok>Entendido</button>
    </div>
  `:``}function Ui(e){let t=e.flatMap(e=>e.stops.map(e=>e.hora)).filter(Boolean).sort(),n=e.flatMap(e=>e.stops.map(e=>e.salida)).filter(Boolean).sort();return t.length?`${t[0]} a ${n[n.length-1]||t[t.length-1]}`:``}function Wi(e,t,n,r,i){let a=t.helping,o=t.mine[0]||null,s=e.isToday?`hoy, ${e.day.toLowerCase()}`:`${e.day.toLowerCase()} ${Pr(e.iso)}`,c;c=a?`Acompañás a ${A(ti(a.paseador,i)||`un paseador sin asignar`)} en ${A(a.ruta)}`:o?t.mine.length>1?`Tus rutas de ${s}: ${A(Lr(t.mine.map(e=>e.ruta)))}`:`Tu ruta de ${s}: ${A(o.ruta)}`:`Rutas de ${s} · turno ${e.shift.toLowerCase()}`;let l=`Hola, ${A(Qr())}`,u=e.isToday?`${l} · ${e.now.date} · turno ${e.shift.toLowerCase()}`:`${l} · Planificación: no es hoy`,d=[...new Set(t.shown.map(e=>e.supervisor).filter(Boolean))],f=d.length?Lr(d):wr[e.shift].supervisor,p=Ui(t.shown)||Rr(e.shift),m=n.filter(e=>e.dog.status!==`Activo`),h=Wr(n.map(e=>e.dog)),ee=[];if(t.assigned&&t.shown.length===1){let e=t.shown[0];a?ee.push(`<li>Paseador: <b>${A(ti(e.paseador,i)||`Pendiente de confirmar`)}</b></li>`):ee.push(`<li>Ayudante: ${e.ayudante?`<b>${A(ti(e.ayudante,i))}</b>`:`sin ayudante`}</li>`)}return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${u}</p>
          <h1 id="pw-today-title" tabindex="-1">${c}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${n.length}</b> ${n.length===1?`perro`:`perros`}</li>
            <li>${A(p)}</li>
            <li>Supervisa: ${A(f)}</li>
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
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${k.pickerOpen}" aria-controls="pw-picker">
            ${g(`sliders`,`pw-icon`)}
            ${k.pickerOpen?`Cerrar selector`:`Cambiar día o turno`}
          </button>
        </div>
      </div>
      ${k.pickerOpen?Ki(e):``}
      ${t.fromPlanilla?`
        <p class="pw-source pw-source--warn">${g(`alertCircle`,`pw-icon`)}<span><b>Ruta tomada de la planilla, falta que el coordinador la confirme.</b> Horarios de BASE RUTAS (12/11/2026).</span></p>
      `:``}
      ${Gi(e,t)}
      ${qi(e,n,m,h,r)}
    </section>
  `}function Gi(e,t){let n=[];if(!t.assigned&&t.elsewhere.length){let r=t.elsewhere[0];n.push(`
      <p class="pw-source">
        ${g(`route`,`pw-icon`)}
        <span>${e.isToday?`Hoy`:`Ese día`} figurás en la ruta <b>${A(r.ruta)}</b> (turno ${r.turno.toLowerCase()}).</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-shift="${r.turno}">Ver turno ${r.turno.toLowerCase()}</button>
      </p>
    `)}return!t.assigned&&t.ofShift.length&&n.push(`
      <div class="pw-route-pick" role="group" aria-labelledby="pw-route-pick-label">
        <p id="pw-route-pick-label"><strong>¿En qué ruta estás ${e.isToday?`hoy`:`ese día`}?</strong>
          <span>No figurás como paseador ni ayudante en este turno. Si es un error, avisale al coordinador.</span></p>
        ${t.ofShift.length>1?`
          <div class="pw-route-chips">
            ${t.ofShift.map(e=>`
              <button type="button" class="pw-chip pw-chip--wide ${t.picked===e.ruta?`is-active`:``}" data-pw-route="${A(e.ruta)}" aria-pressed="${t.picked===e.ruta}">
                ${A(e.ruta)}<small>${e.stops.length} ${e.stops.length===1?`perro`:`perros`}${e.paseador?` · ${A(ti(e.paseador))}`:``}</small>
              </button>
            `).join(``)}
            <button type="button" class="pw-chip pw-chip--wide ${t.picked?``:`is-active`}" data-pw-route="" aria-pressed="${!t.picked}">
              Todas<small>${t.ofShift.length} rutas</small>
            </button>
          </div>
          <p class="pw-muted pw-small">Lo que elijas queda recordado en este celular.</p>
        `:``}
      </div>
    `),n.join(``)}function Ki(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
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
              ${t}<small>${Rr(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function qi(e,t,n,r,i){let a=[],o=t.map(e=>e.dog);r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${Gr(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let s=o.filter(qr);if(s.length){let e=!$r()&&s.length>Xr;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${Lr(s.map(e=>e.name))}`,text:e?`Según el inventario tenés ${Xr} ${Xr===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${Lr(n.map(e=>e.dog.name))}`,text:n.length===1?`Figura en la ruta con estado "${A(n[0].dog.status)}". No lo retires sin confirmarlo con el coordinador o con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con el coordinador o con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=wi(e.now.iso,e.shift).checked.length,r=Ci(t,i);n<Jr.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${Jr.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return a.length?`
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
  `:``}function Ji(e,t){if(e.fuente===`dia`){let n=e.record.actualizadoPor?Ei(e.record.actualizadoPor,t):``,r=e.record.actualizadoEn?Di(e.record.actualizadoEn):``;return`Cambio del día${n?` cargado por ${n}`:``}${r?` a las ${r}`:``}.`}return e.fuente===`plantilla`?`Plantilla semanal del coordinador.`:`Planilla RPJ (sin confirmar).`}function Yi(e,t,n){let r=e.stops.filter(e=>e.canSave);if(!e.stops.length)return``;if(!t.isToday){let t=e.stops[0];return`
      <div class="pw-next" data-pw-next="${A(e.ruta)}">
        <p class="pw-next-label">Primer retiro</p>
        <p class="pw-next-main">${A(t.dog.name)}${t.hora?` · ${A(t.hora)}`:``}</p>
      </div>
    `}let i=r.filter(e=>!Si(n,e).noSale&&Si(n,e).step===0),a=r.filter(e=>{let t=Si(n,e);return!t.noSale&&t.step>0&&t.step<O.length}),o,s,c,l;if(i.length)c=i[0].hora,o=i.filter(e=>e.hora===c),s=`Próximo`,l=`retiro`;else if(a.length){let e=[...a].sort((e,t)=>String(e.salida||`99:99`).localeCompare(String(t.salida||`99:99`)));c=e[0].salida,o=e.filter(e=>e.salida===c),s=`Próxima entrega`,l=`entrega`}else return`
      <div class="pw-next pw-next--done" data-pw-next="${A(e.ruta)}">
        <p class="pw-next-label">${A(e.ruta)}</p>
        <p class="pw-next-main">${g(`checkCircle`,`pw-icon pw-icon--lg`)} Ruta completa</p>
      </div>
    `;return`
    <div class="pw-next ${Vr(c,t.now.minutes,l).kind===`late`?`is-late`:``}" data-pw-next="${A(e.ruta)}">
      <p class="pw-next-label">${l===`entrega`?`Todos retirados · próxima entrega prevista`:`Retiro que sigue`}</p>
      <p class="pw-next-main">${s===`Próximo`?`Próximo: `:``}${A(Lr(o.map(e=>e.dog.name)))}${c?` · ${A(c)}`:``}</p>
      <p class="pw-next-time">${Hr(c,t.now.minutes,l)}</p>
      <div class="pw-next-actions">
        ${o.map(t=>{let r=Si(n,t);return`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-from-next="${A(e.ruta)}" data-pw-step="${A(t.dog.id)}" ${M.ready?``:`aria-disabled="true"`}>
              ${M.ready?`${O[r.step].action}${o.length>1?`: ${A(t.dog.name)}`:``}`:`Cargando lo marcado…`}
            </button>
          `}).join(``)}
      </div>
    </div>
  `}function Xi(e,t,n,r,i){let a=Wr(e.stops.map(e=>e.dog)),o=Ci(e.stops,r),s=o.toWalk?Math.round(o.delivered/o.toWalk*100):100,c=`pw-ruta-${e.ruta.replace(/[^a-z0-9]+/gi,`-`)}`,l=[];return!n.helping&&e.paseador&&!ei(e.paseador)&&l.push(`Paseador: ${ti(e.paseador,i)}`),n.helping&&e.ayudante&&!ei(e.ayudante)&&l.push(`Ayudante: ${ti(e.ayudante,i)}`),!n.assigned&&e.ayudante&&l.push(`Ayudante: ${ti(e.ayudante,i)}`),`
    <section class="pw-section pw-route" aria-labelledby="${c}">
      <div class="pw-section-head">
        <div>
          <h2 id="${c}">Ruta ${A(e.ruta)} <span class="pw-count">${e.stops.length}</span></h2>
          <p class="pw-muted">${A(Ji(e,i))} En orden, con la hora de retiro.${l.length?` ${A(l.join(` · `))}.`:``}</p>
          ${e.notas?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${A(e.notas)}</p>`:``}
        </div>
        ${t.isToday&&e.stops.length?`
          <div class="pw-progress" aria-label="Avance de la ruta ${A(e.ruta)}">
            <strong>${o.delivered} de ${o.toWalk} entregados${o.noSale?` · ${o.noSale} no ${o.noSale===1?`sale`:`salen`}`:``}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${s}%"></span></span>
          </div>
        `:``}
      </div>

      ${Yi(e,t,r)}

      ${a.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${g(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en esta ruta</strong>
            <ul>${Gr(a).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${A(e.supervisor||wr[t.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      `:``}

      ${!t.isToday&&e.stops.length?`
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      `:``}

      ${e.stops.length?`
        <ol class="pw-dogs" role="list">
          ${e.stops.map((n,o)=>Qi({...n,route:e},o,t,Si(r,n),Kr(n.dog,a),i)).join(``)}
        </ol>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros en ${A(e.ruta)} para este turno.</strong></p>
          <p>Si te pidieron un paseo, confirmalo con el coordinador.</p>
        </div>
      `}
      <p class="pw-muted pw-legend">
        Categoría operativa: <b>SIN EVALUAR</b> salvo que se indique otra. ${A(Vt[`SIN EVALUAR`])}
        Fuente: Registro maestro, 14/08/2026.
      </p>
    </section>
  `}function Zi(e){return!e.nota||/^bozal$/i.test(e.nota)&&qr(e.dog)||/^no juntar/i.test(e.nota)&&e.dog.safety.some(e=>Ur(e)===`danger`)?``:e.nota}function Qi(e,t,n,r,i,a){let{dog:o}=e,{times:s,noSale:c,record:l}=r,u=Math.min(r.step,O.length),d=!c&&u>=O.length,f=Oi(l,a),p=o.safety.filter(e=>Ur(e)===`danger`).join(` `),m=i.filter(e=>!p.includes(e)),h=o.safety.filter(e=>Ur(e)!==`info`),ee=o.safety.filter(e=>Ur(e)===`info`),te=o.status!==`Activo`,ne=h.length||i.length||te,re=Zi(e),ie=e.minutos||o.minutes,ae=n.isToday&&e.canSave,oe=``;return n.isToday&&!c&&!d&&e.canSave&&(oe=u===0?Hr(e.hora,n.now.minutes,`retiro`):e.salida?Hr(e.salida,n.now.minutes,`entrega`):``),`
    <li class="pw-dog ${ne?`has-alert`:``} ${d?`is-done`:``} ${c?`is-nosale`:``}" data-pw-dog="${A(o.id)}">
      <div class="pw-dog-time">
        <span class="pw-dog-order" aria-label="Orden ${t+1}">${t+1}</span>
        <span class="pw-dog-hora">${e.hora?`${g(`clock`,`pw-icon pw-icon--sm`)} Retiro ${A(e.hora)}`:`Hora de retiro: ${y.toLowerCase()}`}</span>
        ${oe}
      </div>
      <div class="pw-dog-head">
        <h3>${A(o.name)}</h3>
        <span class="pw-dog-facts">${A(o.size)} · ${ie?`${ie} min`:`Duración: ${y.toLowerCase()}`}${e.salida?` · vuelve ~${A(e.salida)}`:``}</span>
      </div>

      ${ne?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${A(o.name)}">
          ${te?`
            <li class="pw-alert pw-alert--warn">
              ${g(`alertCircle`,`pw-icon`)}
              <span>${A(o.status)}: ${A(o.review||`su estado no es Activo.`)} Confirmalo con el coordinador o con Juan antes de retirarlo.</span>
            </li>
          `:``}
          ${h.map(e=>`
            <li class="pw-alert pw-alert--${Ur(e)}">
              ${g(Ur(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${A(e)}${Ur(e)===`danger`&&i.length?`<b class="pw-today-tag">En esta ruta: ${Lr(i)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${m.length?`
            <li class="pw-alert pw-alert--danger">
              ${g(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${Lr(m)}<b class="pw-today-tag">En esta ruta</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${ee.map(e=>`<p class="pw-dog-note">${g(`users`,`pw-icon pw-icon--sm`)} ${A(e)}</p>`).join(``)}
      ${re?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${A(re)}</p>`:``}
      ${o.review&&!te?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${A(o.review)}</p>`:``}
      ${o.unknown?`<p class="pw-dog-review"><b>Perro nuevo en la ruta:</b> sin ficha en esta página (tamaño y alertas: ${y.toLowerCase()}). Preguntale al coordinador.</p>`:``}
      <p class="pw-dog-category"><span>${A(o.category||`SIN EVALUAR`)}</span> ${o.unknown?y:`Registro maestro 14/08/2026`}</p>

      ${n.isToday&&!e.canSave?`
        <p class="pw-note">Este perro no tiene identificador en la ruta: no se puede marcar. Avisale al coordinador.</p>
      `:``}

      ${ae?`
        ${c?`
          <p class="pw-nosale-label">${g(`x`,`pw-icon`)} No sale en este turno</p>
        `:`
          <ol class="pw-steps" aria-label="Avance de ${A(o.name)}">
            ${O.map((e,t)=>{let n=t<u?ki(l,t,a):``;return`
                <li class="${t<u?`is-done`:``} ${t===u?`is-next`:``}">
                  <span class="pw-step-dot" aria-hidden="true">${t<u?g(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
                  <span>${e.label}${t<u?`<small>${s[t]?A(s[t]):`Sin hora`}</small>`:``}${n?`<small class="pw-marker">Marcó ${A(n)}</small>`:``}</span>
                  <span class="pw-sr">${t<u?`hecho`:`pendiente`}</span>
                </li>
              `}).join(``)}
          </ol>
        `}
        ${l?.nota?`<p class="pw-dog-nota"><b>Nota:</b> ${A(l.nota)}</p>`:``}
        ${f?`<p class="pw-dog-change ${l.pendiente?`is-pending`:``}">${A(f)}</p>`:``}
        <div class="pw-dog-actions">
          ${c?``:d?`
            <p class="pw-done-label">${g(`checkCircle`,`pw-icon`)} Entregado ${A(s[O.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${A(o.id)}" ${M.ready?``:`aria-disabled="true"`}>
              ${M.ready?O[u].action:`Cargando lo marcado…`}
            </button>
          `}
          ${!c&&u===0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${A(o.id)}" ${M.ready?``:`aria-disabled="true"`} aria-label="${A(o.name)} no sale en este turno">No sale</button>
          `:``}
          ${c||u>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${A(o.id)}" aria-label="Deshacer el último paso de ${A(o.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function $i(e,t,n){let{checked:r,record:i}=wi(e.now.iso,e.shift),a=r.length>=Jr.length,o=Oi(i,n),s=t.helping?ti(t.helping.paseador,n):``;return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">${$r()?`Tu checklist, hoy turno ${e.shift.toLowerCase()}. El inventario no asigna equipo al ayudante (${y.toLowerCase()}): revisá${s?` con ${A(s)}`:``} que esté todo lo del paseador.`:`Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.`}</p>
        </div>
        <span class="pw-count ${a?`is-ok`:``}">${r.length}/${Jr.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${Jr.map(e=>{let t=r.includes(e.item),n=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
            <li>
              <input class="pw-check-input" type="checkbox" id="${n}" data-pw-equip="${A(e.item)}" ${t?`checked`:``} />
              <label class="pw-check" for="${n}">
                <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                <span class="pw-check-text">${A(e.item)}</span>
                <span class="pw-check-qty">${e.sebastian}</span>
              </label>
            </li>
          `}).join(``)}
      </ul>
      <div class="pw-row">
        ${a?`<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`:`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      ${o?`<p class="pw-dog-change ${i?.pendiente?`is-pending`:``}">${A(o)}</p>`:``}
      <p class="pw-status" role="status">${A(k.equipStatus)}</p>
      ${Yr.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${Yr.map(e=>`${A(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function ea(e,t){let n=Li(),r=[...t.map(e=>e.name),Dr];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=k.previewOpen?ia(n,e):null;return`
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
                  <span class="pw-check-text"><b>${t+1}.</b> ${A(e)}</span>
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
              <input type="checkbox" id="pw-inc-dog-${t}" data-pw-field="dogs" value="${A(e)}" ${n.dogs.includes(e)?`checked`:``} />
              <label for="pw-inc-dog-${t}">${A(e)}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <div class="pw-grid-2">
        <label class="pw-field">Hora
          <input type="time" data-pw-field="hora" value="${A(n.hora||e.now.time)}" />
        </label>
        <label class="pw-field">Lugar
          <input type="text" data-pw-field="lugar" value="${A(n.lugar)}" placeholder="Ej.: plaza, esquina (sin domicilios)" autocomplete="off" />
        </label>
      </div>

      <p class="pw-hint">Escribí lo que viste y oíste. Ej.: “tiró de la correa y gruñó”, no “se puso agresivo”.</p>

      <label class="pw-field">Antes: ¿qué estaba pasando?
        <textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto a 3 metros">${A(n.antes)}</textarea>
      </label>
      <label class="pw-field">Conducta: ¿qué hizo el perro? <span class="pw-req">(obligatorio)</span>
        <textarea data-pw-field="conducta" rows="2" placeholder="Ej.: se paró en dos patas, ladró y tiró hacia el otro perro">${A(n.conducta)}</textarea>
      </label>
      <label class="pw-field">¿Qué hiciste vos?
        <textarea data-pw-field="accion" rows="2" placeholder="Ej.: corté distancia, crucé la calle y lo senté">${A(n.accion)}</textarea>
      </label>
      <label class="pw-field">Después: ¿cómo quedó?
        <textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto y siguió el paseo">${A(n.despues)}</textarea>
      </label>

      <fieldset class="pw-fieldset">
        <legend>Nivel de riesgo <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-seg pw-seg--risk">
          ${Tr.map(e=>`
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
          ${Er.map((e,t)=>`
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
        <button class="pw-btn pw-btn--ghost ${k.confirmClear?`is-confirm`:``}" type="button" data-pw-clear>
          ${k.confirmClear?`¿Seguro? Tocá de nuevo`:n.registroId?`Empezar otro reporte`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${k.incidentStatus.startsWith(`Falta`)||k.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${A(k.incidentStatus)}</p>

      ${i&&i.ok?ta(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function ta(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${A(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${na(e)}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${g(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function na(e){return`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(e)}`}function ra(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(Or)?.[0]}}function ia(e,t){let{missing:n,word:r}=ra(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=Ir(t.now),a=oa(),o=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,s=aa(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,$r()?`Ayudante de paseador: ${Qr()}${a.paseador?` (con ${a.paseador})`:``}`:`Paseador: ${Qr()}`,`Ruta: ${a.rutas||`Pendiente de confirmar`}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,o(`Lesiones`,e.lesiones),o(`Lugar`,e.lugar),``,o(`Antes`,e.antes),o(`Conducta observada`,e.conducta),o(`Qué hice`,e.accion),o(`Después`,e.despues),``,`Protocolo:`,...s].join(`
`)}}function aa(e){return Wt.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function oa(){let e=j(),t=li({...e,day:e.now.day,iso:e.now.iso,isToday:!0,shift:Ir(e.now)}),n=Ti(e.now.iso);return{rutas:t.shown.map(e=>e.ruta).join(`, `),paseador:t.helping?ti(t.helping.paseador,n):``}}function sa(e,t){let n=e.dogs.map(e=>C.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:aa(e),ruta:oa().rutas,titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function ca(e,t=!1){k.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),N(e)}function la(e,t){if(k.incidentSavedText===t)return Promise.resolve(null);k.incidentSavedText=t;let n=j();return ji(`incidentes`,()=>sa({...e,registroId:Li().registroId||e.registroId},n)).then(e=>{if(!e)return k.incidentSavedText=``,null;let t=Ar(vr,null);return t&&jr(vr,{...t,registroId:e.id}),ca(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function ua(){let e=Li(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function da(){let e=ua();return jr(vr,e),e}function fa(e){if(!k.previewOpen)return;let t=ia(e,j()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),k.previewOpen=!1,k.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=k.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=na(t.text))}function N(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function pa(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var ma=[`data-pw-from-next`,`data-pw-route`,`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function ha(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=ma.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]${t===`data-pw-step`?`:not([data-pw-from-next])`:``}`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function ga(){let e=document.activeElement,t=ha(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var _a=0;function va(){clearTimeout(_a),_a=setTimeout(()=>{document.querySelector(`.pw-shell`)&&ga()},80)}function P(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function ya(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function ba(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:ya(),block:`start`}),t.focus({preventScroll:!0}))}async function xa(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function Sa(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return op(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return k.syncError=``,P(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return ba(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return k.pickerOpen=!k.pickerOpen,P(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=Nr(),t=n.dataset.pwDay;return k.day=t===e.day?null:t,P(`[data-pw-day="${t}"]`),N(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return k.shift=r.dataset.pwShift,P(`[data-pw-shift="${k.shift}"]`),N(`Mostrando el turno ${k.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return k.day=null,k.shift=null,k.pickerOpen=!1,P(`#pw-today-title`),N(`Mostrando hoy.`),!0;if(e.target.closest(`[data-pw-change-ok]`))return k.routeChange=null,P(`#pw-today-title`),!0;let i=e.target.closest(`[data-pw-route]`);if(i){let e=j(),t=i.dataset.pwRoute;return ci(e,t),P(`[data-pw-route="${CSS.escape(t)}"]`),N(t?`Mostrando la ruta ${t}. Queda recordada en este celular.`:`Mostrando todas las rutas del turno.`),!0}let a=e.target.closest(`[data-pw-step]`);if(a){let e=a.dataset.pwStep,t=a.dataset.pwFromNext,n=j(),r=di(n,e);if(!n.isToday||!r?.canSave||!M.ready)return!0;let i=r.dog,o=xi(n.now.iso,n.shift,[i])[e];if(o.noSale||o.step>=O.length)return!0;let s=O[o.step],c=Zr(),l={estado:s.estado};if(O.forEach((e,t)=>{t>=o.step||(l[e.field]=o.times[t],o.record?.[`${e.field}Por`]&&(l[`${e.field}Por`]=o.record[`${e.field}Por`],l[`${e.field}PorNombre`]=o.record[`${e.field}PorNombre`]||``))}),l[s.field]=n.now.time,l[`${s.field}Por`]=c.usuario||``,l[`${s.field}PorNombre`]=c.nombre||``,Mi(r,n,l,`${i.name}: ${s.done.toLowerCase()} a las ${n.now.time}.`),t){$();let e=document.querySelector(`[data-pw-from-next="${CSS.escape(t)}"]`)||document.querySelector(`[data-pw-next="${CSS.escape(t)}"]`)?.closest(`section`)?.querySelector(`h2`);e&&!e.hasAttribute(`tabindex`)&&e.tagName===`H2`&&e.setAttribute(`tabindex`,`-1`),e?.focus({preventScroll:!0})}else P(o.step+1>=O.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`);return!0}let o=e.target.closest(`[data-pw-nosale]`);if(o){let e=o.dataset.pwNosale,t=j(),n=di(t,e);return t.isToday&&n?.canSave&&M.ready&&(Mi(n,t,{estado:xr},`${n.dog.name}: no sale en este turno.`),P(`[data-pw-undo="${CSS.escape(e)}"]`)),!0}let s=e.target.closest(`[data-pw-undo]`);if(s){let e=s.dataset.pwUndo,t=j(),n=di(t,e);if(!t.isToday||!n?.canSave||!M.ready)return!0;let r=n.dog,i=xi(t.now.iso,t.shift,[r])[e];if(i.noSale){let a=i.times.reduce((e,t,n)=>t?n+1:e,0);return Mi(n,t,{estado:a?O[a-1].estado:`pendiente`},`${r.name}: se deshizo "no sale".`),P(a>=O.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(!i.step)return!0;let a=i.step-1,o={estado:a?O[a-1].estado:`pendiente`};return O.forEach((e,t)=>{o[e.field]=t<a?i.times[t]:``,t>=a&&(o[`${e.field}Por`]=``,o[`${e.field}PorNombre`]=``)}),Mi(n,t,o,`${r.name}: se deshizo "${O[a].done.toLowerCase()}".`),P(`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(e.target.closest(`[data-pw-equip-all]`))return Ni(j(),Jr.map(e=>e.item)),k.equipStatus=`Equipo completo. ¡A salir!`,P(`[data-pw-equip-reset]`),N(k.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return Ni(j(),[]),k.equipStatus=`Lista de equipo desmarcada.`,P(`[data-pw-equip-all]`),N(k.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=da(),t=ia(e,j());return k.confirmClear=!1,t.ok?(k.previewOpen=!0,k.incidentStatus=k.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,P(`[data-pw-message]`),N(k.incidentStatus),la(e,t.text),!0):(k.previewOpen=!1,k.incidentStatus=t.missing.length?`Falta completar: ${Lr(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,P(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),N(k.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=Li(),t=ia(e,j());return t.ok&&la(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=Li(),n=ia(t,j());return n.ok&&la(t,n.text),xa(e).then(e=>{k.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=k.incidentStatus,t.classList.toggle(`is-warn`,!e)),N(k.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!k.confirmClear)return k.confirmClear=!0,P(`[data-pw-clear]`),!0;let e=!!Li().registroId;try{localStorage.removeItem(vr)}catch{}return k.confirmClear=!1,k.previewOpen=!1,k.incidentSavedText=``,k.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,P(`#pw-incidente`),N(k.incidentStatus),!0}if(k.confirmClear&&!e.target.closest(`[data-pw-clear]`)){k.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=Li().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function Ca(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=j(),{checked:n}=wi(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return Ni(e,i),k.equipStatus=i.length>=Jr.length?`Equipo completo. ¡A salir!`:``,P(`[data-pw-equip="${CSS.escape(r)}"]`),k.equipStatus&&N(k.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(fa(da()),!0):!1}function wa(e){e.target.closest?.(`[data-pw-field]`)&&fa(da())}function Ta(){_e.push(Sa),ve.push(Ca),document.addEventListener(`input`,wa),$e(e=>{[`paseos`,`checklists`,`incidentes`,`rutas`,`plantillas`,`avisos`].includes(e)&&va()}),window.addEventListener(`online`,va),window.addEventListener(`offline`,va),setInterval(Da,15e3)}var Ea={iso:``,shift:``,minute:-1};function Da(){if(!document.querySelector(`.pw-shell`))return;let e=Nr();e.iso!==Ea.iso||Ir(e)!==Ea.shift?va():e.minutes!==Ea.minute&&(Ea.minute=e.minutes,document.querySelectorAll(`[data-pw-countdown]`).forEach(t=>{let n=Vr(t.dataset.pwCountdown,e.minutes,t.dataset.pwMode);t.textContent=n.text,t.className=`pw-cd pw-cd--${n.kind}`,t.closest(`.pw-next`)?.classList.toggle(`is-late`,n.kind===`late`)}))}var Oa=`America/Argentina/Buenos_Aires`,ka=[`manana`,`tarde`],Aa=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,ja=/(\d[\s.-]?){8,}/,Ma=10,Na=15,Pa=[`paseos`,`checklists`,`incidentes`,`plantillas`,`rutas`,`avisos`,`solicitudes`,`observaciones`,`cierres`],Fa=7,Ia={admin:`Admin`,supervisor:`Supervisor`,coordinador:`Coordinación`,paseador:`Paseador`,ayudante:`Ayudante de paseador`},La=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],Ra=[`no sale`,`agregar perro`,`cambiar hora`,`cambiar paseador o ayudante`,`otro`],za={pendiente:{label:`Pendiente`,tone:`warn`},aplicado:{label:`Aplicado`,tone:`ok`},rechazado:{label:`Rechazado`,tone:`danger`}},Ba=$t(),F={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,observationDraft:`paseosJuanSupervisor_observacionBorrador`,avisoDraft:`paseosJuanSupervisor_avisoBorrador`,requestDraft:`paseosJuanSupervisor_pedidoBorrador`},Va={observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},Ha=null,Ua=null,Wa=null,Ga=new Map,Ka=new Set,qa=new Set,Ja=new Map,Ya=new Map,Xa=new Set,Za=new Map,Qa=new Set,$a=new Map,eo=!1,to=!1,no=null,ro=``,io=`idle`;function I(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function ao(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function L(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function oo(e){try{localStorage.removeItem(e)}catch{}}var so=8e3;function R(e,t,n=`ok`){Ha={area:e,text:t,tone:n,at:Date.now()}}function co(e){return Ha&&Date.now()-Ha.at>so&&(Ha=null),Ha&&Ha.area===e?Ha:null}function lo(e){let t=co(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?I(t.text):``}</p>
  `}function uo(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function fo(e,t,n){return`${e} ${e===1?t:n}`}function po(e){let t=String(e||``).match(/^(\d{1,2}):(\d{2})/);return t?Number(t[1])*60+Number(t[2]):null}function mo(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function ho(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function go(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Oa,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:S[(n+6)%7]}}function _o(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function vo(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:y}function yo(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function bo(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Oa,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function xo(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:pt(t)}function So(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function Co(e){return e.minutes<810?`manana`:`tarde`}function wo(e){let t=ho(e);return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function To(e,t){let n=x[e];return t.minutes<po(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=po(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function Eo(){return _.user()||{}}function Do(e){let t=Eo();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function Oo(e,t){if(!e)return``;if(t?.actualizadoPor===e&&t.actualizadoPorNombre)return t.actualizadoPorNombre;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=Eo();if(n.usuario===e&&n.nombre)return n.nombre;let r=It.find(t=>t.id===e);if(r)return r.name;for(let t of[`checklists`,`paseos`,`incidentes`])for(let n of z(t)){if(n.creadoPor===e&&n.creadoPorNombre)return n.creadoPorNombre;if(n.actualizadoPor===e&&n.actualizadoPorNombre)return n.actualizadoPorNombre}return e}function ko(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=Oo(e.actualizadoPor||e.creadoPor,e),r=bo(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function Ao(e){let t=pt();return e===`plantillas`||e===`avisos`?{}:e===`observaciones`?{desde:_o(t,-6)}:e===`solicitudes`?{desde:_o(t,-2)}:{desde:t}}function jo(){_.token()&&Pa.forEach(e=>{let t=Ao(e),n=`${e}|${t.desde||``}`;Qa.has(n)||(Qa.add(n),e===`solicitudes`&&Ho(),v.watch(e,t),v.list(e,t).then(()=>{Xa.add(e),Za.delete(e)}).catch(t=>{Xa.add(e),Za.set(e,t?.message||`No se pudieron traer los datos.`)}).finally(Bo))})}function z(e){let t=new Map(v.cached(e,Ao(e)).map(e=>[e.id,e]));return Ja.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function Mo(e,t,n,r,i=`ok`){if(!t.id)return No(e,t,n,r,i);let a=`${e}:${t.id}`,o=(Ya.get(a)||Promise.resolve()).then(()=>No(e,t,n,r,i));return Ya.set(a,o),o.then(()=>{Ya.get(a)===o&&Ya.delete(a)}),o}async function No(e,t,n,r,i){try{let a=await v.save(e,t);if(a.pendiente)R(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=Ja.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&Ja.set(t,a),R(n,r,i)}return a}catch(e){return R(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function Po(e,t,n,r){try{return await v.remove(e,t),Ja.delete(`${e}:${t}`),R(n,r,`info`),!0}catch(e){return R(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function Fo(e=!0){if(!_.token())return;let t=await Promise.allSettled(Pa.map(e=>v.list(e,Ao(e))));if(t.forEach((e,t)=>{Xa.add(Pa[t]),e.status===`rejected`?Za.set(Pa[t],e.reason?.message||`No se pudieron traer los datos.`):Za.delete(Pa[t])}),!e)return;let n=t.find(e=>e.status===`rejected`);n?R(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?R(`sync`,`Datos actualizados a las ${go().time} hs.`):R(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),V(`sv-refresh`)}function Io(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function Lo(){no=null,Io()&&document.querySelector(`.sv-shell`)&&zo()}function Ro(){let e=ao(F.folds,{}),t=!1;document.querySelectorAll(`.sv-shell [data-sv-fold]`).forEach(n=>{e[n.dataset.svFold]!==n.open&&(e[n.dataset.svFold]=n.open,t=!0)}),t&&L(F.folds,e),document.querySelectorAll(`.sv-shell [data-sv-stop-more]`).forEach(e=>{e.open?Ka.add(e.dataset.svStopMore):Ka.delete(e.dataset.svStopMore)})}function zo(){Ro();let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>2&&window.scrollTo(0,r),!t)return;let i=document.getElementById(t);if(i&&(i.focus({preventScroll:!0}),n&&typeof i.setSelectionRange==`function`))try{i.setSelectionRange(n[0],n[1])}catch{}}function Bo(){no||=setTimeout(Lo,40)}function Vo(){Io()&&document.querySelector(`.sv-shell`)&&go().time!==ro&&document.activeElement?.tagName!==`SELECT`&&zo()}function Ho(){eo||=(z(`solicitudes`).forEach(e=>$a.set(e.id,e.estado||`pendiente`)),!0)}function Uo(){let e=Eo().usuario,t=[];if(z(`solicitudes`).forEach(n=>{let r=n.estado||`pendiente`,i=$a.get(n.id);eo&&i&&i!==r&&r!==`pendiente`&&n.creadoPor===e&&t.push(n),$a.set(n.id,r)}),!t.length)return;let n=t.filter(e=>e.estado===`aplicado`);R(`requests`,`El coordinador ${t.map(e=>`${e.estado===`aplicado`?`aplicó`:`rechazó`} «${ys(e)}»${e.respuesta?`: ${e.respuesta}`:``}`).join(` · `)}.${n.length?` La ruta ya muestra el cambio.`:``}`,n.length?`ok`:`info`),n.length&&(v.list(`rutas`,Ao(`rutas`)).catch(()=>{}),v.list(`plantillas`,Ao(`plantillas`)).catch(()=>{}))}function Wo(){to||(to=!0,$e(e=>{Pa.includes(e)&&(Xa.add(e),e===`solicitudes`&&Uo(),Bo())}),window.addEventListener(`online`,Bo),window.addEventListener(`offline`,Bo),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Io()&&Fo(!1)}),setInterval(Vo,1e4))}function Go(){try{return Object.values(Va).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function Ko(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=Zo(e.dogId),n=yo(e.fecha)||xo(So(e.id))||pt();return{id:mo(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:x[e.shift]?.label||``,titulo:`Observación: ${t?t.name:y}`,autorAnterior:e.autor||``,migrado:!0}}async function qo(e,t){try{return await v.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function Jo(){if(io!==`idle`||!_.token()||!Go()||!navigator.onLine)return;io=`running`;let e=0,t=0,n=``,r=ao(Va.observations,[]),i=[];for(let a of r){let r=Ko(a);if(!r)continue;let o=await qo(`observaciones`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?L(Va.observations,i):oo(Va.observations);let a=ao(Va.closure,{}),o=Object.entries(a).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&ka.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(o.length){let r=o.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await v.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,s]of o){let[o,c]=a.split(`|`),l=`${o}_${c}`;if(i.has(l))continue;let u=await qo(`cierres`,{id:l,fecha:o,turno:x[c].label,notas:String(s.notas||``),resumen:``,cerrado:!!s.cerrado,horaCierre:s.cerrado?String(s.cerrado):``,migrado:!0});u?(r[a]=s,t+=1,n=u):e+=1}Object.keys(r).length?L(Va.closure,r):oo(Va.closure)}else t+=o.length}else oo(Va.closure);io=`done`,(e||t)&&R(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),Bo()}function B(){let e=go(),t=ao(F.view,{}),n=Co(e),r=t.date===e.iso&&ka.includes(t.shift)?t.shift:n;return{day:e.dayName,shift:r,now:e,isToday:!0,isCurrent:r===n,fecha:e.iso,fechaLabel:e.label}}function Yo(e){L(F.view,{date:go().iso,shift:e})}function Xo(e,t=!1){let n=ao(F.folds,{});return typeof n[e]==`boolean`?n[e]:t}function Zo(e){return C.find(t=>t.id===e)}function Qo(e){let t=ho(e);return C.find(e=>ho(e.name)===t)}function $o(e){return(e?.safety||[]).some(e=>/bozal/i.test(e))}function es(e){return(e?.safety||[]).find(e=>/bozal/i.test(e))||``}function ts(e,t){return ho(e)===ho(t)}function ns(e){let t=e.perroId&&Zo(e.perroId)||e.perroNombre&&Qo(e.perroNombre)||null,n=Number(e.minutos)||t?.minutes||null;return{perroId:t?.id||e.perroId||``,perroNombre:e.perroNombre||t?.name||`Pendiente de confirmar`,hora:po(e.hora)===null?``:String(e.hora).slice(0,5),minutos:n,nota:e.nota||``,dog:t}}function rs(e,t){let n=Array.isArray(e.paradas)?e.paradas:Array.isArray(e.perros)?e.perros.map(e=>({perroId:e,perroNombre:Zo(e)?.name||e,hora:``})):[];return{code:e.ruta||e.id||`Pendiente de confirmar`,source:t,record:e,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,stops:n.map(ns)}}function is(e){let t=new Map;z(`plantillas`).filter(t=>ts(t.dia,e.day)&&wo(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,rs(e,`plantilla`))),z(`rutas`).filter(t=>t.fecha===e.fecha&&wo(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,rs(e,`dia`)));let n=!(Xa.has(`plantillas`)&&Xa.has(`rutas`)),r=!1;return t.size||(Ba.filter(t=>ts(t.dia,e.day)&&wo(t.turno)===e.shift).forEach(e=>t.set(e.ruta,rs(e,`planilla`))),r=t.size>0),{routes:[...t.values()].sort((e,t)=>e.code.localeCompare(t.code)),fallback:r,loading:n}}function as(e){return e.source===`dia`?`Cambio del día (coordinador)`:e.source===`plantilla`?`Plantilla semanal (coordinador)`:`Planilla RPJ (respaldo)`}function os(e){let t=new Map;return e.forEach(e=>e.stops.forEach(e=>{e.dog&&!t.has(e.dog.id)&&t.set(e.dog.id,e.dog)})),[...t.values()]}function ss(e,t,n){return`${e}_${t}_${n}`}function cs(){return new Map(z(`paseos`).map(e=>[e.id,e]))}function ls(e,t,n){let r=t?.estado||`pendiente`,i=po(e.hora),a=Number(e.minutos)||null,o=po(t?.horaRetiro),s=[`retirado`,`paseando`,`entregado`].includes(r),c=o??i,l=s&&o!==null&&i!==null?o-i:0,u=l>Ma,d={estado:r,retirado:s,record:t,pickupDelay:l,pickupLate:u,planned:i,minutos:a};if(r===`no-sale`)return{...d,kind:`nosale`,label:`No sale`,tone:`neutral`,live:`nosale`};if(r===`entregado`){let e=po(t?.horaEntrega),n=e!==null&&c!==null?e-c:null,r=n!==null&&a?n>a+Na:!1;return{...d,kind:`entregado`,label:`Entregado${t?.horaEntrega?` ${t.horaEntrega}`:``}`,tone:`ok`,live:`entregado`,duration:n,deliveryLate:r,late:u||r}}if(s){let e=c===null?null:n-c;if(e!==null&&a&&e>a+Na)return{...d,kind:`demorada`,label:`Entrega demorada ${e-a} min`,tone:`danger`,live:`atrasado`,walked:e,late:!0};let i=r===`paseando`?`Paseando`:`Retirado${t?.horaRetiro?` ${t.horaRetiro}`:``}`;return{...d,kind:`curso`,label:i,tone:`info`,live:`atiempo`,walked:e,late:u}}if(i===null)return{...d,kind:`sinhora`,label:`Hora sin confirmar`,tone:`neutral`,live:`atiempo`};let f=n-i;return f>Ma?{...d,kind:`atrasado`,label:`Atrasado ${f} min`,tone:`danger`,live:`atrasado`,delay:f,late:!0}:f>=0?{...d,kind:`ahora`,label:`Retirar ahora`,tone:`warn`,live:`atiempo`,delay:f}:{...d,kind:`espera`,label:`Retira ${e.hora}`,tone:`neutral`,live:`atiempo`}}function us(e,t,n=cs()){return t.stops.map(t=>{let r=t.perroId?ss(e.fecha,t.perroId,e.shift):``;return{stop:t,id:r,status:ls(t,r?n.get(r):null,e.now.minutes)}})}function ds(e){let t={atiempo:0,atrasado:0,entregado:0,nosale:0};return e.forEach(({status:e})=>{t[e.live]+=1}),t}function fs(e,t){return z(`checklists`).filter(n=>n.fecha===e&&(wo(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function ps(e,t,n){return n&&fs(e,t).find(r=>r.id===`${e}_${n}_${t}`||r.creadoPor===n)||null}function ms(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>hs(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:Oo(e.creadoPor||e.actualizadoPor,e),at:bo(e.actualizadoEn||e.creadoEn)}}function hs(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):y}function gs(e){return z(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function _s(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>Zo(e)?.name||e);return t.length?uo(t):y}function vs(e){return z(`avisos`).filter(t=>(t.vigenteHasta?t.vigenteHasta>=e:t.fecha===e)&&(!t.fecha||t.fecha<=e)).sort((e,t)=>Number(t.tipo===`seguridad`)-Number(e.tipo===`seguridad`)||String(t.fecha||``).localeCompare(String(e.fecha||``)))}function ys(e){return`${e.tipo||`Cambio`}${e.perroNombre?` · ${e.perroNombre}`:``}${e.ruta?` · ${e.ruta}`:``}`}function bs(e,t){return z(`solicitudes`).filter(n=>n.fecha===e&&wo(n.turno)===t)}function xs(e){let t=Eo().usuario;return z(`solicitudes`).filter(n=>(n.creadoPor?n.creadoPor===t:n.pendiente)&&(n.fecha>=e||(n.estado||`pendiente`)===`pendiente`)).sort((e,t)=>String(t.creadoEn||`9`).localeCompare(String(e.creadoEn||`9`)))}function Ss(e,t=``,n=``,r=!1){let i=n?Zo(n):null;return{fecha:e.fecha,shift:e.shift,ruta:t,perroId:i?.id||``,perroNombre:i?.name||``,tipo:i?`no sale`:`otro`,detalle:``,motivo:``,urgente:!1,open:r}}function Cs(e){let t=ao(F.requestDraft,{});return t.fecha!==e.fecha||t.shift!==e.shift?Ss(e):{...Ss(e),...t}}function ws(e){let t=new Set,n=[];return e.forEach(r=>{let i=new Set(r.stops.map(e=>e.dog?.name).filter(Boolean));r.stops.forEach(({dog:a})=>{(a?.incompatibleWith||[]).forEach(o=>{let s=[a.name,o].sort().join(`|`);if(t.has(s))return;let c=i.has(o)?r:e.find(e=>e.stops.some(e=>e.dog?.name===o));c&&(t.add(s),n.push({a:a.name,b:o,sameRoute:c===r,route:r.code,otherRoute:c.code}))})})}),n.sort((e,t)=>Number(t.sameRoute)-Number(e.sameRoute))}function Ts(e){let t=os(e),n=ws(e),r=t.filter($o),i=t.filter(e=>e.status!==`Activo`),a=t.filter(e=>e.review&&e.status===`Activo`),o=t.filter(e=>e.category===`SIN EVALUAR`),s=e.flatMap(e=>e.stops.filter(e=>!e.dog).map(t=>`${t.perroNombre} (${e.code})`)),c=[];return n.length&&c.push({tone:`danger`,icon:`alertTriangle`,title:n.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${n.length} parejas que no pueden ir juntas`,lines:n.map(e=>`No juntar: ${e.a} con ${e.b}${e.sameRoute?` (los dos en ${e.route})`:` (${e.route} y ${e.otherRoute}: que no se crucen)`}.`),action:n.some(e=>e.sameRoute)?`Que no caminen juntos. Si la ruta los junta, pedile el cambio al coordinador.`:`Que los paseadores no se crucen con esos perros.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),r.length&&c.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${fo(r.length,`perro`,`perros`)}`,lines:r.map(e=>`${e.name}: ${es(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),i.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${i.length===1?`sale ${i[0].name}`:`salen ${i.length} perros`}`,lines:i.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),s.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`${fo(s.length,`perro de la ruta no tiene`,`perros de la ruta no tienen`)} ficha`,lines:s.map(e=>`${e}: ${y}.`),action:`No se puede marcar el retiro desde acá. Pedile al coordinador que lo revise.`,source:`Fuente: rutas del coordinador y registro de perros.`}),a.length&&c.push({tone:`info`,icon:`fileText`,title:`${fo(a.length,`perro tiene`,`perros tienen`)} datos a revisar`,lines:a.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${Ft}.`}),o.length>1&&c.push({tone:`info`,icon:`eye`,title:`${o.length} perros salen en grupo SIN EVALUAR`,lines:[`${Vt[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),c}var Es=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function Ds(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function Os(e){return{...Ds(e),...ao(F.observationDraft,{})}}function ks(){let e=Ao(`observaciones`).desde;return z(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function As(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${Eo().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function js(e){return[`Observación de conducta — ${b.name}`,`Perro: ${e.perroNombre||Zo(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${vo(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${As(e)}`].join(`
`)}function Ms(e){return`${e.fecha}_${e.shift}`}function Ns(e){return z(`cierres`).find(t=>t.id===Ms(e))||null}function Ps(e){return Wa&&Wa.id===Ms(e)?Wa.notas:Ns(e)?.notas||``}function Fs(e,t){return e?Oo(e,t):``}function Is(e,t){let n=cs(),r=t.flatMap(t=>us(e,t,n).map(e=>({...e,route:t}))),i=r.filter(e=>e.status.kind!==`nosale`);return{items:r,going:i,late:i.filter(e=>e.status.late),onTime:i.filter(e=>!e.status.late),noSale:r.filter(e=>e.status.kind===`nosale`),delivered:i.filter(e=>e.status.kind===`entregado`),notPicked:i.filter(e=>!e.status.retirado),notDelivered:i.filter(e=>e.status.retirado&&e.status.kind!==`entregado`)}}function Ls(e){let{stop:t,status:n}=e,r=[];return n.kind===`atrasado`&&r.push(`sin retiro, previsto ${t.hora} (${n.delay} min)`),n.pickupLate&&r.push(`retiro previsto ${t.hora}, retirado ${n.record?.horaRetiro} (+${n.pickupDelay} min)`),n.kind===`demorada`&&r.push(`entrega demorada: ${n.walked} min de ${n.minutos} previstos`),n.deliveryLate&&r.push(`entrega demorada: ${n.duration} min de ${n.minutos} previstos`),`${t.perroNombre} (${r.join(`; `)||`con atraso`})`}function Rs(e,t){let n=x[e.shift],{routes:r,fallback:i}=is(e),a=Is(e,r),o=t||Ns(e),s=ws(r),c=os(r).filter($o),l=ks().filter(t=>t.fecha===e.fecha&&wo(t.turno)===e.shift),u=gs(e.fecha),d=bs(e.fecha,e.shift),f=Ps(e),p=Eo(),m=zs(e,r),h=e=>e.length?e.map(e=>e.stop.perroNombre).join(`, `):`ninguno`,ee=[`Cierre de turno — ${b.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisó: ${p.nombre||`Pendiente de confirmar`}`,`Rutas${i?` (tomadas de la planilla RPJ)`:``}:`,...r.map(e=>`- ${e.code}: paseador ${Fs(e.paseador)||`Pendiente de confirmar`}${e.ayudante?`, ayudante ${Fs(e.ayudante)}`:``} · ${fo(e.stops.length,`perro`,`perros`)}`),`Cumplimiento: ${a.onTime.length} a tiempo · ${a.late.length} con atraso · ${a.noSale.length} no salieron (de ${a.items.length} previstos)`,`- Con atraso: ${a.late.length?a.late.map(Ls).join(`; `):`ninguno`}`,`- No salieron: ${h(a.noSale)}`,`- Sin retiro marcado: ${h(a.notPicked)}`,`- Sin entrega marcada: ${h(a.notDelivered)}`,`Entregados: ${a.delivered.length} de ${a.going.length}`,`Checklist del equipo: ${m.length?m.map(e=>`${e.name}: ${e.checklist?ms(e.checklist).complete?`equipo completo`:`incompleto${ms(e.checklist).missing.length?` (falta ${ms(e.checklist).missing.join(`, `)})`:``}`:`sin cargar`}`).join(`; `):`sin equipo asignado`}`,`Incidentes del día: ${u.length?u.map(e=>`${e.hora||`sin hora`} ${e.titulo||_s(e)}`).join(`; `):`ninguno cargado`}`,`Pedidos de cambio al coordinador: ${d.length?d.map(e=>`${ys(e)} (${za[e.estado]?.label||`Pendiente`})`).join(`; `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${s.length?s.map(e=>`${e.a} con ${e.b}`).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${c.length?c.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${l.length}`,`Notas del supervisor: ${f.trim()||`sin notas`}`];return o?.cerrado&&ee.push(`Turno cerrado a las ${o.horaCierre||bo(o.actualizadoEn)||`Pendiente de confirmar`} hs por ${Oo(o.actualizadoPor,o)||`Pendiente de confirmar`}.`),ee.join(`
`)}function zs(e,t){let n=new Map,r=(e,t,r)=>{if(!e)return;let i=n.get(e)||{usuario:e,name:Oo(e),roles:[]};i.roles.push(`${t} ${r}`),n.set(e,i)};return t.forEach(e=>{r(e.paseador,`Paseador`,e.code),r(e.ayudante,`Ayudante`,e.code)}),fs(e.fecha,e.shift).forEach(e=>{let t=e.creadoPor||String(e.id).split(`_`)[1];t&&!n.has(t)&&n.set(t,{usuario:t,name:Oo(t,e),roles:[`Sin ruta asignada`]})}),[...n.values()].map(t=>({...t,checklist:ps(e.fecha,e.shift,t.usuario)}))}function Bs(e){return`
    <div class="sv-shell">
      ${Vs()}
      ${e}
    </div>
  `}function Vs(){let e=Eo();return`
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
          <strong>${I(e.nombre||`Pendiente de confirmar`)}</strong>
          <small>${I(Ia[e.rol]||e.rol||``)}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${g(`logOut`,`sv-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function Hs(){jo();let e=B();ro=e.now.time;let t=is(e),n=`
    <main class="sv-main" id="sv-main">
      ${Us()}
      ${Ws(e)}
      ${Ks(e,t)}
      ${Js(e)}
      ${Ys(e,t.routes)}
      ${$s(e,t)}
      ${ac(e)}
      ${oc(e,os(t.routes))}
      ${cc(e)}
      ${lc()}
    </main>
  `;return io===`idle`&&Go()&&setTimeout(Jo,0),n}function Us(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=[...new Set(Za.values())],r=t||e||n.length?`warn`:`ok`,i=`${e} cambio${e===1?` espera`:`s esperan`} señal para enviarse.`,a=t?`Sin señal: ves lo último guardado en este teléfono.${e?` ${i}`:``}`:e?i:n.length?`No se pudieron traer algunos datos: ${n.join(` `)}`:`Datos compartidos con el equipo. Se actualizan solos.`;return`
    <section class="sv-sync is-${r}" aria-label="Estado de los datos">
      <p class="sv-sync-text" aria-live="polite">${g(r===`ok`?`radio`:`uploadCloud`,`sv-icon`)} <span>${I(a)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${lo(`sync`)}
    </section>
  `}function Ws(e){let t=gs(e.fecha);return t.length?`
    <section class="sv-card sv-incidents" aria-labelledby="sv-incidents-title">
      <div class="sv-section-head">
        <h2 id="sv-incidents-title" class="sv-title">${g(`alertTriangle`,`sv-icon`)} ${t.length===1?`Hay 1 incidente cargado hoy`:`Hay ${t.length} incidentes cargados hoy`}</h2>
        <p>${t.length===1?`Revisalo`:`Revisalos`} antes de seguir con el turno.</p>
      </div>
      <ul class="sv-incident-list">
        ${t.map(e=>`
          <li class="sv-incident">
            <div class="sv-saved-head">
              <strong>${I(e.titulo||`Incidente`)}</strong>
              <span>${e.hora?`${I(e.hora)} hs · `:``}${I(_s(e))}${e.lugar?` · ${I(e.lugar)}`:``}${e.barrio?` · ${I(e.barrio)}`:``}</span>
            </div>
            ${e.riesgo||e.lesiones?`
              <p class="sv-chips">
                ${e.riesgo?`<span class="sv-tag is-danger">Riesgo: ${I(e.riesgo)}</span>`:``}
                ${e.lesiones?`<span class="sv-tag is-warn">Lesiones: ${I(e.lesiones)}</span>`:``}
              </p>
            `:``}
            <dl class="sv-obs-detail">
              ${[[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Protocolo`,e.protocolo]].filter(([,e])=>e).map(([e,t])=>`<div><dt>${e}</dt><dd>${I(t)}</dd></div>`).join(``)}
            </dl>
            <p class="sv-source">${I(ko(e,`Cargó`))}</p>
          </li>
        `).join(``)}
      </ul>
    </section>
  `:``}function Gs(e,t){let n=zs(e,t),r=e.now.minutes>=po(x[e.shift].from);return n.length?`
    <div class="sv-team">
      <h2 class="sv-subtitle">Equipo del turno: checklist de salida</h2>
      <ul class="sv-team-list">
        ${n.map(e=>{let t=e.checklist?ms(e.checklist):null,n=t?e.checklist.pendiente?`info`:t.complete?`ok`:`danger`:r?`warn`:`info`,i=t?t.complete?`Salió con el equipo completo.`:`Equipo incompleto${t.missing.length?`. Falta: ${t.missing.join(`, `)}`:``}.`:`Todavía no cargó el checklist.`;return`
            <li class="sv-note is-${n}">
              ${g(t?.complete?`checkCircle`:`alertTriangle`,`sv-icon`)}
              <strong>${I(e.name)}</strong> <small>(${I(e.roles.join(`, `))})</small>:
              ${I(i)} ${t?.at?`<small>${I(t.at)} hs</small>`:``}
            </li>
          `}).join(``)}
      </ul>
    </div>
  `:`<p class="sv-note is-info"><strong>Equipo del turno:</strong> ${y}. La ruta no tiene paseador asignado y nadie cargó el checklist.</p>`}function Ks(e,t){let n=x[e.shift],r=To(e.shift,e.now),i=Eo(),a=t.routes.flatMap(t=>us(e,t)),o=ds(a),s=t.routes.map(e=>e.supervisor).filter(Boolean),c=[...new Set(s)].join(` y `)||n.supervisor;return`
    <section class="sv-hero sv-now" aria-labelledby="sv-now-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">Ahora · ${I(e.day)} ${e.now.label} · ${e.now.time} hs</p>
          <h1 id="sv-now-title">Turno ${n.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${n.from} a ${n.to} hs
            <span class="sv-moment is-${r.tone}">${r.label}</span>
          </p>
          <p class="sv-source">Supervisa ${I(i.nombre||`Pendiente de confirmar`)}${c&&c!==i.nombre?` · Según la ruta: ${I(c)}`:``}.</p>
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno de hoy">
            ${ka.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${x[t].label}
                <small>${t===Co(e.now)?`Turno actual`:`${x[t].from} a ${x[t].to}`}</small>
              </button>
            `).join(``)}
          </div>
        </div>
      </div>

      ${e.isCurrent?``:`<p class="sv-note is-info">Estás mirando el turno ${n.label.toLowerCase()} de hoy. El turno actual es el de la ${x[Co(e.now)].label.toLowerCase()}.</p>`}

      <div class="sv-counter" role="status" aria-live="polite" aria-label="Cumplimiento del turno">
        <p class="sv-counter-line">
          <span class="sv-count is-ok"><b>${o.atiempo}</b> a tiempo</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count ${o.atrasado?`is-danger`:``}"><b>${o.atrasado}</b> ${o.atrasado===1?`atrasado`:`atrasados`}</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count"><b>${o.entregado}</b> ${o.entregado===1?`entregado`:`entregados`}</span>
        </p>
        <p class="sv-source">${fo(a.length,`perro previsto`,`perros previstos`)}${o.nosale?` · ${o.nosale} no ${o.nosale===1?`sale`:`salen`}`:``} · Atrasado: pasó la hora de retiro + ${Ma} min. Entrega demorada: el paseo superó lo previsto + ${Na} min. Se recalcula cada minuto.</p>
      </div>

      ${t.fallback?`
        <p class="sv-note is-warn">${g(`alertCircle`,`sv-icon`)} <strong>Rutas tomadas de la planilla.</strong> ${t.loading?`Cargando las rutas del coordinador…`:`El coordinador todavía no cargó en la app la ruta de ${I(e.day.toLowerCase())} a la ${n.label.toLowerCase()}.`} Paseador y ayudante: ${y}.</p>
      `:``}

      ${Gs(e,t.routes)}
    </section>
  `}function qs(e){return{barrio:``,tipo:La[0],mensaje:``,vigenteHasta:e.fecha,...ao(F.avisoDraft,{})}}function Js(e){let t=vs(e.fecha),n=qs(e),r=Xo(`aviso-form`);return`
    <section class="sv-card sv-avisos" aria-labelledby="sv-avisos-title">
      <div class="sv-section-head">
        <h2 id="sv-avisos-title" class="sv-title">${g(`mapPin`,`sv-icon`)} Avisos por barrio vigentes</h2>
        <p>${t.length?`Lo que el equipo tiene que saber hoy en cada barrio.`:Xa.has(`avisos`)?`No hay avisos vigentes.`:`Cargando avisos…`}</p>
      </div>
      ${t.length?`
        <ul class="sv-aviso-list">
          ${t.map(e=>`
            <li class="sv-aviso ${e.tipo===`seguridad`||e.tipo===`perro suelto`?`is-danger`:``}">
              <div class="sv-saved-head">
                <strong>${I(e.barrio||`Pendiente de confirmar`)}</strong>
                <span class="sv-tag ${e.tipo===`seguridad`||e.tipo===`perro suelto`?`is-danger`:`is-warn`}">${I(e.tipo||`otro`)}</span>
              </div>
              <p>${I(e.mensaje||``)}</p>
              <p class="sv-source">${e.vigenteHasta?`Vigente hasta ${I(vo(e.vigenteHasta))}`:`Vigente hoy`} · ${I(ko(e,`Cargó`))}</p>
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
              <input type="text" id="sv-aviso-barrio" data-sv-aviso="barrio" list="sv-barrios" value="${I(n.barrio)}" autocomplete="off" required />
              <datalist id="sv-barrios">${en.map(e=>`<option value="${I(e)}"></option>`).join(``)}</datalist>
            </label>
            <label class="sv-field" for="sv-aviso-tipo">Tipo
              <select id="sv-aviso-tipo" data-sv-aviso="tipo">
                ${La.map(e=>`<option value="${e}" ${e===n.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
              </select>
            </label>
          </div>
          <label class="sv-field" for="sv-aviso-mensaje">Qué pasa
            <span class="sv-field-hint" id="sv-aviso-mensaje-hint">Ej.: corte de calle en la entrada sur hasta las 12. Entrar por la otra puerta.</span>
            <textarea id="sv-aviso-mensaje" rows="2" data-sv-aviso="mensaje" aria-describedby="sv-aviso-mensaje-hint" required>${I(n.mensaje)}</textarea>
          </label>
          <label class="sv-field sv-field-short" for="sv-aviso-hasta">Vigente hasta
            <input type="date" id="sv-aviso-hasta" data-sv-aviso="vigenteHasta" value="${I(n.vigenteHasta)}" min="${e.fecha}" required />
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-aviso-save">${g(`send`,`sv-icon`)} Publicar aviso</button>
          </div>
        </form>
      </details>
      ${lo(`aviso`)}
    </section>
  `}function Ys(e,t){if(!t.some(e=>e.stops.length))return``;let n=Ts(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${g(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Bozales e incompatibles primero. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>Xs(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos-detector" ${Xo(`avisos-detector`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>Xs(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function Xs(e,t){return`
    <li class="sv-warning is-${e.tone}">
      <div class="sv-warning-head">
        ${t?`<span class="sv-rank" aria-label="Prioridad ${t}">${t}</span>`:`<span class="sv-warning-icon">${g(e.icon,`sv-icon`)}</span>`}
        <h3>${I(e.title)}</h3>
      </div>
      <ul class="sv-warning-lines">
        ${e.lines.map(e=>`<li>${I(e)}</li>`).join(``)}
      </ul>
      <p class="sv-warning-action"><strong>Qué hacer:</strong> ${I(e.action)}</p>
      <p class="sv-source">${I(e.source)}</p>
    </li>
  `}function Zs(e){let t=e.dog,n=(t?.safety||[]).map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?I(e):`<b>${I(e)}</b>`}</li>`});if(e.nota&&!(t?.safety||[]).some(t=>ho(t).includes(ho(e.nota)))){let t=/no juntar/i.test(e.nota)?`danger`:/bozal/i.test(e.nota)?`warn`:`info`;n.push(`<li class="sv-chip is-${t}"><b>Ruta:</b> ${I(e.nota)}</li>`)}return t&&t.status!==`Activo`&&n.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${I(t.status)}</li>`),t||n.unshift(`<li class="sv-chip is-danger"><b>Sin ficha:</b> ${y}</li>`),n.length?`<ul class="sv-chips" aria-label="Avisos de ${I(e.perroNombre)}">${n.join(``)}</ul>`:``}function Qs(e,t,n){let r=Eo(),i=x[e.shift],a=Fs(t.paseador),o=n.filter(e=>e.status.live===`atrasado`),s=ds(n),c=[`Hola${a?` ${a}`:``}, te escribe ${r.nombre||`el supervisor`} (supervisión ${b.name}).`,`Ruta ${t.code}, turno ${i.label.toLowerCase()} ${e.fechaLabel}: ${s.entregado} entregados de ${n.length-s.nosale}.`];return o.length?(c.push(`Veo atrasados: ${o.map(e=>`${e.stop.perroNombre} (${e.status.kind===`demorada`?`entrega demorada`:`retiro ${e.stop.hora}`}, ${e.status.label.replace(/^\D+/,``)})`).join(`; `)}.`),c.push(`¿Cómo vienen? Avisame si necesitás ayuda.`)):c.push(`¿Cómo vienen? Avisame cualquier cosa.`),c.join(`
`)}function $s(e,t){let{routes:n}=t;if(!n.length)return`
      <section class="sv-card" aria-labelledby="sv-routes-title">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno</h2>
        <p class="sv-empty">${t.loading?`Cargando rutas…`:`No hay rutas cargadas para ${I(e.day.toLowerCase())} a la ${x[e.shift].label.toLowerCase()} (ni en la app ni en la planilla).`}</p>
        ${nc(e,``,``,`Pedir una ruta al coordinador`)}
        ${ic(e,``,``)}
      </section>
    `;let r=cs(),i=new Set(n.flatMap(e=>e.stops.map(e=>e.perroId)).filter(Boolean)),a=z(`paseos`).filter(t=>t.fecha===e.fecha&&String(t.id).endsWith(`_${e.shift}`)&&t.perroId&&!i.has(t.perroId));return`
    <section class="sv-routes" aria-labelledby="sv-routes-title">
      <div class="sv-section-head sv-routes-head">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno: retiro y entrega</h2>
        <p>Las arma el coordinador. Vos controlás que se cumplan. Si hay que cambiar algo, pedíselo con «Pedir cambio al coordinador».</p>
      </div>
      ${n.map(t=>ec(e,t,r)).join(``)}
      ${a.length?`
        <div class="sv-card">
          <h3 class="sv-subtitle">Marcados fuera de la ruta</h3>
          <ul class="sv-extra-list">
            ${a.map(e=>`<li class="sv-note is-info"><strong>${I(e.perroNombre||e.perroId)}</strong>: ${I(e.estado||`pendiente`)}. ${I(ko(e))}</li>`).join(``)}
          </ul>
        </div>
      `:``}
    </section>
  `}function ec(e,t,n){let r=us(e,t,n),i=ds(r),a=Fs(t.paseador),o=Fs(t.ayudante),s=bs(e.fecha,e.shift).filter(e=>e.ruta===t.code&&!e.perroId),c=`control-${t.code}`;return`
    <article class="sv-card sv-route-card" aria-labelledby="sv-route-${mo(t.code)}">
      <div class="sv-route-head">
        <div>
          <h3 id="sv-route-${mo(t.code)}" class="sv-route-title"><span class="sv-route-code">${I(t.code)}</span> ${fo(t.stops.length,`perro`,`perros`)}</h3>
          <p class="sv-route-people">
            <span>${g(`userCheck`,`sv-icon`)} Paseador: <strong>${I(a||`Pendiente de confirmar`)}</strong></span>
            <span>${g(`users`,`sv-icon`)} Ayudante: <strong>${I(o||(t.source===`planilla`?`Pendiente de confirmar`:`sin ayudante`))}</strong></span>
          </p>
          <p class="sv-source">${I(as(t))}${t.record.actualizadoEn&&t.source!==`planilla`?` · ${I(ko(t.record,`Último cambio de`))}`:``}</p>
          ${t.notas?`<p class="sv-hint">Notas de la ruta: ${I(t.notas)}</p>`:``}
        </div>
        <p class="sv-route-counts">
          <span class="sv-tag is-ok">${i.atiempo} a tiempo</span>
          <span class="sv-tag ${i.atrasado?`is-danger`:`is-neutral`}">${fo(i.atrasado,`atrasado`,`atrasados`)}</span>
          <span class="sv-tag is-neutral">${fo(i.entregado,`entregado`,`entregados`)}</span>
        </p>
      </div>
      <div class="sv-actions">
        <a class="sv-button" id="sv-wa-${mo(t.code)}" href="https://wa.me/?text=${encodeURIComponent(Qs(e,t,r))}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`sv-icon`)} ${a?`Escribirle a ${I(a)} por WhatsApp`:`Escribir al paseador por WhatsApp`}
        </a>
        ${nc(e,t.code,``,`Pedir cambio al coordinador`)}
      </div>
      ${rc(s)}
      ${ic(e,t.code,``)}
      ${lo(c)}
      <ol class="sv-stop-list">
        ${r.map(n=>tc(e,t,n)).join(``)}
      </ol>
    </article>
  `}function tc(e,t,n){let{stop:r,id:i,status:a}=n,o=i&&qa.has(i),s=a.record,c=mo(`${t.code}-${r.perroId||r.perroNombre}`),l=[s?.horaRetiro&&a.retirado?`Retiro ${s.horaRetiro}`:``,s?.horaPaseo&&a.retirado?`Paseo ${s.horaPaseo}`:``,s?.horaEntrega&&a.kind===`entregado`?`Entrega ${s.horaEntrega}`:``].filter(Boolean),u=bs(e.fecha,e.shift).filter(e=>e.perroId&&e.perroId===r.perroId),d=Ga.has(i)?Ga.get(i):s?.nota||``,f=Ka.has(i)||Ga.has(i)&&Ga.get(i)!==(s?.nota||``),p=a.kind===`entregado`&&a.late?`<span class="sv-tag is-warn">Con atraso</span>`:a.kind===`curso`&&a.pickupLate?`<span class="sv-tag is-warn">Retiro +${a.pickupDelay} min</span>`:``;return`
    <li class="sv-stop is-${a.kind}">
      <div class="sv-stop-time">
        <strong>${I(r.hora||`--:--`)}</strong>
        <small>${r.minutos?`${r.minutos} min`:`min sin confirmar`}</small>
      </div>
      <div class="sv-stop-body">
        <div class="sv-stop-head">
          <h4>${I(r.perroNombre)}</h4>
          <span class="sv-state is-${a.tone}">${I(a.label)}</span>
          ${p}
        </div>
        ${Zs(r)}
        ${l.length||s?`
          <p class="sv-source">${I(l.join(` · `))}${l.length?` · `:``}${I(ko(s))}</p>
        `:``}
        ${s?.nota?`<p class="sv-stop-note"><b>Nota para el paseador:</b> ${I(s.nota)}</p>`:``}
        ${rc(u)}
        ${r.perroId?`
          <div class="sv-stop-actions" ${o?`aria-busy="true"`:``}>
            ${a.kind===`nosale`?`
              <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${c}" data-sv-absent="${r.perroId}" data-ruta="${I(t.code)}" aria-label="Deshacer: ${I(r.perroNombre)} sí sale">Deshacer «no sale»</button>
            `:`
              <button type="button" class="sv-button ${a.retirado?`is-checked`:`sv-button-primary`}" id="sv-pickup-${c}" data-sv-pickup="${r.perroId}" data-ruta="${I(t.code)}" aria-pressed="${a.retirado}" aria-label="${a.retirado?`Desmarcar retiro de ${I(r.perroNombre)}`:`Marcar a ${I(r.perroNombre)} como retirado`}">
                ${a.retirado?`${g(`checkCircle`,`sv-icon`)} Retirado`:`Retirado`}
              </button>
              <button type="button" class="sv-button ${a.kind===`entregado`?`is-checked`:``}" id="sv-deliver-${c}" data-sv-deliver="${r.perroId}" data-ruta="${I(t.code)}" aria-pressed="${a.kind===`entregado`}" ${a.retirado?``:`disabled`} aria-label="${a.kind===`entregado`?`Desmarcar entrega de ${I(r.perroNombre)}`:`Marcar a ${I(r.perroNombre)} como entregado`}">
                ${a.kind===`entregado`?`${g(`checkCircle`,`sv-icon`)} Entregado`:`Entregado`}
              </button>
              ${a.retirado?``:`<button type="button" class="sv-button sv-button-quiet" id="sv-absent-${c}" data-sv-absent="${r.perroId}" data-ruta="${I(t.code)}" aria-label="${I(r.perroNombre)} no sale">No sale</button>`}
            `}
          </div>
          <details class="sv-stop-more" data-sv-stop-more="${i}" ${f?`open`:``}>
            <summary>Nota para el paseador y pedido de cambio</summary>
            <div class="sv-stop-more-body">
              <label class="sv-field" for="sv-note-${c}">Nota para el paseador
                <span class="sv-field-hint" id="sv-note-${c}-hint">La ve en su ruta. Sin datos de tutores.</span>
                <input type="text" id="sv-note-${c}" data-sv-note="${i}" value="${I(d)}" maxlength="200" aria-describedby="sv-note-${c}-hint" autocomplete="off" />
              </label>
              <div class="sv-actions">
                <button type="button" class="sv-button" id="sv-note-save-${c}" data-sv-note-save="${r.perroId}" data-ruta="${I(t.code)}">Guardar nota</button>
                ${nc(e,t.code,r.perroId,`Pedir cambio al coordinador`)}
              </div>
            </div>
          </details>
          ${ic(e,t.code,r.perroId)}
        `:`<p class="sv-hint">Sin ficha en el registro de perros: no se puede marcar desde acá.</p>`}
      </div>
    </li>
  `}function nc(e,t,n,r){return`<button type="button" class="sv-button sv-button-quiet" id="${mo(`sv-req-open-${t||`turno`}-${n||`ruta`}`)}" data-sv-request-open data-ruta="${I(t)}" data-dog="${I(n)}">${g(`send`,`sv-icon`)} ${I(r)}</button>`}function rc(e){return e.length?`
    <ul class="sv-request-badges">
      ${e.map(e=>{let t=za[e.estado]||za.pendiente;return`<li class="sv-tag is-${t.tone}">Pedido «${I(e.tipo||`cambio`)}»: ${t.label}${e.pendiente?` (sin enviar)`:``}</li>`}).join(``)}
    </ul>
  `:``}function ic(e,t,n){let r=Cs(e);return!r.open||r.ruta!==t||(r.perroId||``)!==(n||``)?``:`
    <form class="sv-form sv-request-form" data-sv-request-form novalidate aria-labelledby="sv-req-title">
      <h4 id="sv-req-title">Pedir cambio al coordinador · ${I(`${t?`Ruta ${t}`:`Turno ${x[e.shift].label.toLowerCase()}`}${r.perroNombre?` · ${r.perroNombre}`:``}`)}</h4>
      <p class="sv-hint">El coordinador lo aplica en la ruta y te responde. Hoy, ${I(e.fechaLabel)}.</p>
      <label class="sv-field" for="sv-req-tipo">Qué hay que cambiar
        <select id="sv-req-tipo" data-sv-req="tipo">
          ${Ra.map(e=>`<option value="${e}" ${e===r.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
        </select>
      </label>
      <label class="sv-field" for="sv-req-detalle">Detalle${r.tipo===`no sale`?` (opcional)`:``}
        <span class="sv-field-hint" id="sv-req-detalle-hint">Ej.: retirarlo 10:30 en vez de 10:00. O: sumar a Paco a la ruta.</span>
        <textarea id="sv-req-detalle" rows="2" data-sv-req="detalle" aria-describedby="sv-req-detalle-hint">${I(r.detalle)}</textarea>
      </label>
      <label class="sv-field" for="sv-req-motivo">Qué pasó o con quién hablaste
        <span class="sv-field-hint" id="sv-req-motivo-hint">Ej.: hablé con la familia, hoy no está. Sin teléfonos ni domicilios.</span>
        <textarea id="sv-req-motivo" rows="2" data-sv-req="motivo" aria-describedby="sv-req-motivo-hint" required>${I(r.motivo)}</textarea>
      </label>
      <label class="sv-check" for="sv-req-urgente">
        <input type="checkbox" id="sv-req-urgente" data-sv-req="urgente" ${r.urgente?`checked`:``} />
        <span>Urgente: afecta al turno de ahora</span>
      </label>
      <div class="sv-actions">
        <button type="submit" class="sv-button sv-button-primary" id="sv-req-save">${g(`send`,`sv-icon`)} Enviar pedido</button>
        <button type="button" class="sv-button" id="sv-req-cancel" data-sv-request-cancel>Cancelar</button>
      </div>
      ${lo(`request-form`)}
    </form>
  `}function ac(e){let t=xs(e.fecha),n=t.filter(e=>(e.estado||`pendiente`)===`pendiente`).length;return`
    <details class="sv-fold" data-sv-fold="pedidos" ${Xo(`pedidos`,!0)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`send`,`sv-icon`)} Mis pedidos de cambio</span>
        <span class="sv-fold-meta">${t.length?`${n} pendiente${n===1?``:`s`} de ${t.length}`:Xa.has(`solicitudes`)?`Sin pedidos`:`Cargando…`}</span>
      </summary>
      <div class="sv-fold-body">
        ${lo(`requests`)}
        ${t.length?`
          <ul class="sv-request-list">
            ${t.map(e=>{let t=za[e.estado]||za.pendiente,n=e.actualizadoPor&&e.actualizadoPor!==e.creadoPor?ko(e,`Respondió`):``;return`
                <li class="sv-request is-${t.tone}">
                  <div class="sv-saved-head">
                    <strong>${e.urgente?`<span class="sv-tag is-danger">Urgente</span> `:``}${I(ys(e))}</strong>
                    <span class="sv-state is-${t.tone}">${t.label}</span>
                  </div>
                  <p class="sv-source">${I(vo(e.fecha))} · Turno ${I(String(e.turno||``).toLowerCase()||`Pendiente de confirmar`)} · ${e.pendiente?`Se enviará cuando haya señal.`:`Pedido a las ${I(bo(e.creadoEn))} hs`}</p>
                  <dl class="sv-obs-detail">
                    ${e.detalle?`<div><dt>Detalle</dt><dd>${I(e.detalle)}</dd></div>`:``}
                    <div><dt>Motivo</dt><dd>${I(e.motivo||`Pendiente de confirmar`)}</dd></div>
                    <div><dt>Respuesta del coordinador</dt><dd>${I(e.respuesta||((e.estado||`pendiente`)===`pendiente`?`Todavía no respondió.`:`Sin comentario.`))}</dd></div>
                  </dl>
                  ${n?`<p class="sv-source">${I(n)}</p>`:``}
                </li>
              `}).join(``)}
          </ul>
        `:`<p class="sv-empty">Todavía no pediste cambios. Usá «Pedir cambio al coordinador» en una ruta o en un perro.</p>`}
      </div>
    </details>
  `}function oc(e,t){let n=Xo(`observaciones`),r=Os(e),i=ks(),a=new Set(t.map(e=>e.id)),o=C.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} en ${Fa} días`:`Sin registros`}</span>
      </summary>
      <div class="sv-fold-body">
        <p class="sv-note is-info">Describí lo que se vio y se oyó, no lo que creés que siente el perro. No uses etiquetas como «agresivo», «malo» o «dominante». Sin datos de tutores.</p>
        <form class="sv-obs-form" data-sv-obs-form novalidate>
          <div class="sv-form-grid sv-form-grid-3">
            <label class="sv-field" for="sv-obs-dog">Perro
              <select id="sv-obs-dog" data-sv-obs="dogId" required>
                <option value="">Elegí un perro</option>
                ${t.length?`<optgroup label="De este turno">${t.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${I(e.name)}</option>`).join(``)}</optgroup>`:``}
                <optgroup label="Otros perros">${o.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${I(e.name)}</option>`).join(``)}</optgroup>
              </select>
            </label>
            <label class="sv-field" for="sv-obs-fecha">Fecha (DD/MM/AAAA)
              <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${I(r.fecha)}" inputmode="numeric" placeholder="${e.now.label}" maxlength="10" autocomplete="off" required />
            </label>
            <label class="sv-field" for="sv-obs-hora">Hora (opcional)
              <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${I(r.hora)}" />
            </label>
          </div>
          ${Es.map(e=>`
            <label class="sv-field" for="sv-obs-${e.key}">${e.label}
              <span class="sv-field-hint" id="sv-obs-${e.key}-hint">${e.hint}</span>
              ${e.type===`input`?`<input type="text" id="sv-obs-${e.key}" data-sv-obs="${e.key}" value="${I(r[e.key])}" aria-describedby="sv-obs-${e.key}-hint" required />`:`<textarea id="sv-obs-${e.key}" rows="2" data-sv-obs="${e.key}" aria-describedby="sv-obs-${e.key}-hint" required>${I(r[e.key])}</textarea>`}
            </label>
          `).join(``)}
          <label class="sv-check" for="sv-obs-seguimiento">
            <input type="checkbox" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${r.seguimiento?`checked`:``} />
            <span>Requiere seguimiento (avisar a Juan)</span>
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-obs-save">${g(`checkCircle`,`sv-icon`)} Guardar observación</button>
          </div>
          ${lo(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${Fa} días</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>sc(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function sc(e){let t=Ua===e.id,n=e.perroNombre||Zo(e.perroId)?.name||`Pendiente de confirmar`;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${I(n)}</strong>
        <span>${I(vo(e.fecha))}${e.hora?` · ${I(e.hora)} hs`:``}${e.lugar?` · ${I(e.lugar)}`:``}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${I(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Reacción</dt><dd>${I(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${I(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Resultado</dt><dd>${I(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${I(As(e))}</p>
      <div class="sv-actions">
        ${t?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${g(`copy`,`sv-icon`)} Copiar texto</button>
          ${Do(e)?`<button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function cc(e){let t=Xo(`cierre`),n=Ns(e),r=Rs(e),i=n?.cerrado?n.horaCierre||bo(n.actualizadoEn):``;return`
    <details class="sv-fold" data-sv-fold="cierre" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`flag`,`sv-icon`)} Cerrar el turno ${x[e.shift].label.toLowerCase()}</span>
        <span class="sv-fold-meta">${n?.cerrado?`Cerrado ${I(i)} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        ${n?`<p class="sv-source">${I(n.cerrado?ko(n,`Lo cerró`):ko(n,`Última nota de`))}</p>`:``}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${I(Ps(e))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar (incluye el cumplimiento del horario)
          <textarea id="sv-close-summary" class="sv-summary" rows="16" readonly>${I(r)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${g(`copy`,`sv-icon`)} Copiar resumen</button>
          ${n?.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${g(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${lo(`closure`)}
      </div>
    </details>
  `}function lc(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${Xo(`referencias`)?`open`:``}>
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
          <li>Rutas y horarios: los arma el coordinador (plantilla semanal y cambios del día). Respaldo: ${b.officialSources.routes}, leída el ${Ft}.</li>
          <li>Perros: ${b.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador. Incidentes y checklist los carga el equipo en la calle.</li>
          <li>Avisos por barrio, pedidos de cambio, observaciones y cierres se comparten con el equipo según permisos.</li>
        </ul>
      </div>
    </details>
  `}function V(e){if(!e)return zo();Ro(),$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function uc(){return go().time}async function dc(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function fc(e,t,n){let r=is(e).routes.find(e=>e.code===t),i=r?.stops.find(e=>e.perroId===n);return r&&i?{route:r,stop:i}:null}function pc(e,t,n,r){let i=ss(e.fecha,n.perroId,e.shift),a=cs().get(i),o={id:i,fecha:e.fecha,...r};return a||Object.assign(o,{perroId:n.perroId,perroNombre:n.perroNombre,turno:x[e.shift].label}),a?.ruta!==t.code&&(o.ruta=t.code),o}async function mc(e,t,n,r){let i=B(),a=fc(i,e,t);if(!a)return;let{route:o,stop:s}=a,c=ss(i.fecha,t,i.shift);if(qa.has(c))return;let l=cs().get(c),u=ls(s,l,i.now.minutes),d=uc(),f={horaRetiro:``,horaPaseo:``,horaEntrega:``},p=s.perroNombre,m=null,h=``,ee=`ok`;if(n===`retiro`){if(u.retirado)m={estado:`pendiente`,...f},h=`${p}: retiro desmarcado.`,ee=`info`;else{m={estado:`retirado`,horaRetiro:d};let e=u.planned===null?0:i.now.minutes-u.planned;h=`${p}: retirado a las ${d} hs${e>Ma?` (${e} min después de lo previsto)`:``}.`}}else if(n===`entrega`){if(!u.retirado)return;u.kind===`entregado`?(m={estado:l?.horaPaseo?`paseando`:`retirado`,horaEntrega:``},h=`${p}: entrega desmarcada.`,ee=`info`):(m={estado:`entregado`,horaEntrega:d},h=`${p}: entregado a las ${d} hs.`)}else if(n===`no-sale`){if(u.kind===`nosale`)m={estado:`pendiente`},h=`${p}: vuelve a la lista.`;else{if(u.retirado)return;m={estado:`no-sale`,...f},h=`${p}: no sale hoy. Si cambia la ruta, pedíselo al coordinador.`}}m&&(qa.add(c),await Mo(`paseos`,pc(i,o,s,m),`control-${o.code}`,h,ee),qa.delete(c),V(r))}async function hc(e,t,n){let r=B(),i=fc(r,e,t);if(!i)return;let{route:a,stop:o}=i,s=ss(r.fecha,t,r.shift),c=String(Ga.has(s)?Ga.get(s):document.querySelector(`[data-sv-note="${s}"]`)?.value||``).trim();if(ja.test(c))return R(`control-${a.code}`,`La nota parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),V(n);await Mo(`paseos`,pc(r,a,o,{nota:c}),`control-${a.code}`,c?`Nota para el paseador guardada en ${o.perroNombre}.`:`Nota de ${o.perroNombre} borrada.`)&&Ga.delete(s),V(n)}async function gc(e){let t=B(),n=qs(t);e.querySelectorAll(`[data-sv-aviso]`).forEach(e=>{n[e.dataset.svAviso]=e.value}),L(F.avisoDraft,n);let r=n.barrio.trim(),i=n.mensaje.trim();if(!r||!i)return R(`aviso`,`Falta completar: ${uo([!r&&`barrio`,!i&&`qué pasa`].filter(Boolean))}.`,`error`),V(r?`sv-aviso-mensaje`:`sv-aviso-barrio`);if(!/^\d{4}-\d{2}-\d{2}$/.test(n.vigenteHasta)||n.vigenteHasta<t.fecha)return R(`aviso`,`Elegí hasta cuándo vale el aviso (hoy, ${t.fechaLabel}, o después).`,`error`),V(`sv-aviso-hasta`);if(ja.test(i)||ja.test(r))return R(`aviso`,`El aviso parece tener un teléfono. Sacalo: los avisos no llevan datos de contacto.`,`error`),V(`sv-aviso-mensaje`);let a=La.includes(n.tipo)?n.tipo:`otro`;return await Mo(`avisos`,{fecha:t.fecha,barrio:r,tipo:a,mensaje:i,vigenteHasta:n.vigenteHasta,titulo:`${a[0].toUpperCase()}${a.slice(1)} · ${r}`},`aviso`,`Aviso de ${r} publicado. Lo ve el equipo.`)&&L(F.avisoDraft,{barrio:``,tipo:La[0],mensaje:``,vigenteHasta:t.fecha}),V(`sv-aviso-save`)}async function _c(e){let t=B(),n=Cs(t);e.querySelectorAll(`[data-sv-req]`).forEach(e=>{n[e.dataset.svReq]=e.type===`checkbox`?e.checked:e.value}),L(F.requestDraft,n);let r=String(n.detalle||``).trim(),i=String(n.motivo||``).trim(),a=[];if(!r&&n.tipo!==`no sale`&&a.push(`detalle`),i||a.push(`qué pasó o con quién hablaste`),a.length)return R(`request-form`,`Falta completar: ${uo(a)}.`,`error`),V(!r&&n.tipo!==`no sale`?`sv-req-detalle`:`sv-req-motivo`);if(ja.test(r)||ja.test(i))return R(`request-form`,`El pedido parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),V(`sv-req-motivo`);let o=Ra.includes(n.tipo)?n.tipo:`otro`,s=x[t.shift].label,c={fecha:t.fecha,turno:s,ruta:n.ruta||``,tipo:o,perroId:n.perroId||``,perroNombre:n.perroNombre||``,detalle:r||(o===`no sale`?`${n.perroNombre||`El perro`} no sale hoy.`:``),motivo:i,urgente:!!n.urgente,estado:`pendiente`,respuesta:``,titulo:`${n.urgente?`URGENTE · `:``}${o[0].toUpperCase()}${o.slice(1)}${n.perroNombre?` · ${n.perroNombre}`:``}${n.ruta?` · ${n.ruta}`:``} · ${s} ${t.fechaLabel}`},l=await Mo(`solicitudes`,c,n.ruta?`control-${n.ruta}`:`requests`,`Pedido enviado al coordinador: ${ys(c)}. Lo vas a ver en «Mis pedidos de cambio».`);return l?(l.pendiente||$a.set(l.id,`pendiente`),L(F.requestDraft,Ss(t)),V(mo(`sv-req-open-${n.ruta||`turno`}-${n.perroId||`ruta`}`))):(Ha&&(Ha.area=`request-form`),V(`sv-req-save`))}async function vc(e){let t=B(),n=Os(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),L(F.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),Es.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())});let i=yo(n.fecha);if(!r.length&&!i)return R(`observation`,`Escribí una fecha real como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),V(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return R(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),V(`sv-obs-fecha`);if(r.length)return R(`observation`,`Falta completar: ${uo(r)}.`,`error`),V(n.dogId?n.fecha?`sv-obs-${Es.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=Es.find(e=>Aa.test(n[e.key]));if(a){let e=n[a.key].match(Aa)[2];return R(`observation`,`En «${a.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),V(`sv-obs-${a.key}`)}let o=Zo(n.dogId);return await Mo(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:x[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada. La ve el equipo.`)&&L(F.observationDraft,Ds(t)),V(`sv-obs-save`)}async function yc(e,t,n,r){let i=Ms(e),a=Ps(e),o=Eo(),s=Rs(e,{...Ns(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoPorNombre:o.nombre,actualizadoEn:new Date().toISOString(),pendiente:!1});await Mo(`cierres`,{id:i,fecha:e.fecha,turno:x[e.shift].label,notas:a,resumen:s,...t},`closure`,n,t.cerrado===!1?`info`:`ok`)&&Wa?.id===i&&Wa.notas===a&&(Wa=null),V(r)}function bc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return op(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return Fo(!0),!0;let n=t.closest(`[data-sv-shift]`);if(n)return Yo(n.dataset.svShift),V(n.id),!0;let r=t.closest(`[data-sv-pickup]`);if(r)return mc(r.dataset.ruta,r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return mc(i.dataset.ruta,i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=mo(`${a.dataset.ruta}-${a.dataset.svAbsent}`),t=B(),n=cs().get(ss(t.fecha,a.dataset.svAbsent,t.shift))?.estado===`no-sale`;return mc(a.dataset.ruta,a.dataset.svAbsent,`no-sale`,n?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-note-save]`);if(o)return hc(o.dataset.ruta,o.dataset.svNoteSave,o.id),!0;let s=t.closest(`[data-sv-request-open]`);if(s){let e=B(),t=Cs(e),n=s.dataset.ruta||``,r=s.dataset.dog||``,i=t.open&&t.ruta===n&&(t.perroId||``)===r;return L(F.requestDraft,i?t:Ss(e,n,r,!0)),V(`sv-req-tipo`),!0}if(t.closest(`[data-sv-request-cancel]`)){let e=B(),t=Cs(e);return L(F.requestDraft,Ss(e)),V(mo(`sv-req-open-${t.ruta||`turno`}-${t.perroId||`ruta`}`)),!0}let c=t.closest(`[data-sv-obs-copy]`);if(c){let e=ks().find(e=>e.id===c.dataset.svObsCopy);return e&&dc(js(e)).then(e=>{R(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),V(c.id)}),!0}let l=t.closest(`[data-sv-obs-delete]`);if(l)return Ua=l.dataset.svObsDelete,V(`sv-obs-del-no-${Ua}`),!0;let u=t.closest(`[data-sv-obs-delete-ok]`);if(u)return Ua=null,Po(`observaciones`,u.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>V(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=Ua;return Ua=null,V(`sv-obs-del-${e}`),!0}return t.closest(`[data-sv-close-copy]`)?(dc(Rs(B()),`sv-close-summary`).then(e=>{R(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),V(`sv-close-copy`)}),!0):t.closest(`[data-sv-close-done]`)?(yc(B(),{cerrado:!0,horaCierre:uc()},`Turno marcado como cerrado. No te olvides de copiar el resumen.`,`sv-close-copy`),!0):t.closest(`[data-sv-close-reopen]`)?(yc(B(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0):!1}function xc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;let n=B();if(t.matches(`[data-sv-obs]`)){let e=Os(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,L(F.observationDraft,e),!0}if(t.matches(`[data-sv-aviso]`)){let e=qs(n);return e[t.dataset.svAviso]=t.value,L(F.avisoDraft,e),!0}if(t.matches(`[data-sv-req]`)){let e=Cs(n);return e[t.dataset.svReq]=t.type===`checkbox`?t.checked:t.value,L(F.requestDraft,e),t.tagName===`SELECT`&&V(t.id),!0}return t.matches(`[data-sv-close-notes]`)?(Wa={id:Ms(n),notas:t.value},t.value===(Ns(n)?.notas||``)?(Wa=null,!0):(yc(n,{},`Notas del cierre guardadas.`),!0)):!1}function Sc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=B();if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=Os(n);e[t.dataset.svObs]=t.value,L(F.observationDraft,e)}else if(t.matches(`[data-sv-aviso]`)){let e=qs(n);e[t.dataset.svAviso]=t.value,L(F.avisoDraft,e)}else if(t.matches(`[data-sv-req]`)&&t.type!==`checkbox`){let e=Cs(n);e[t.dataset.svReq]=t.value,L(F.requestDraft,e)}else if(t.matches(`[data-sv-note]`))Ga.set(t.dataset.svNote,t.value),Ka.add(t.dataset.svNote);else if(t.matches(`[data-sv-close-notes]`)){Wa={id:Ms(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=Rs(n))}}function Cc(e){let t=e.target;t.closest?.(`.sv-shell`)&&(t.matches?.(`[data-sv-obs-form]`)?(e.preventDefault(),vc(t)):t.matches?.(`[data-sv-aviso-form]`)?(e.preventDefault(),gc(t)):t.matches?.(`[data-sv-request-form]`)&&(e.preventDefault(),_c(t)))}function wc(e){let t=e.target;if(e.key!==`Enter`||!t.matches?.(`.sv-shell [data-sv-note]`))return;e.preventDefault();let n=t.closest(`.sv-stop-more-body`)?.querySelector(`[data-sv-note-save]`);n&&hc(n.dataset.ruta,n.dataset.svNoteSave,t.id)}function Tc(e){let t=e.target;if(t.matches?.(`[data-sv-stop-more]`)){t.open?Ka.add(t.dataset.svStopMore):Ka.delete(t.dataset.svStopMore);return}if(!t.matches?.(`[data-sv-fold]`))return;let n=ao(F.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,L(F.folds,n))}function Ec(){_e.push(bc),ve.push(xc),document.addEventListener(`input`,Sc),document.addEventListener(`submit`,Cc),document.addEventListener(`keydown`,wc),document.addEventListener(`toggle`,Tc,!0),Wo()}var H={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,pagos:`paseosJuan_coord_pagos`,borradores:`paseosJuan_coord_borradores`},Dc=`paseosJuan_coord_secciones`;function Oc(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function kc(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ac(e){try{localStorage.removeItem(e)}catch{}}var jc=null,Mc=null;function Nc(e,t,n=`ok`){jc={section:e,text:t,tone:n},n===`error`?Lc(t):Ic(t)}function Pc(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function Fc(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function Ic(e){Fc(Pc(`coord-live`,`status`,`polite`),e)}function Lc(e){Fc(Pc(`coord-alerta`,`alert`,`assertive`),e)}var Rc=`America/Argentina/Buenos_Aires`;function U(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function zc(){return new Date(new Date().toLocaleString(`en-US`,{timeZone:Rc}))}function Bc(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function Vc(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:Rc,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function Hc(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(i,r-1,n));return a.getUTCFullYear()!==i||a.getUTCMonth()!==r-1||a.getUTCDate()!==n?null:`${i}-${String(r).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`}function Uc(){return Bc(pt())}function Wc(){return pt(new Date(Date.now()-5184e5))}function Gc(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}var Kc={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function qc(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>Kc[e]).join(`, `):`Sin días en rutas`}function Jc(e){let t=Bl.map(t=>{let n=S.filter(n=>Gt(e,n,t));return n.length?`${t.toLowerCase()}: ${qc(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function Yc(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Xc(e,t=!1){let n=Oc(Dc,{});return e in n?!!n[e]:t}function Zc(e,t){kc(Dc,{...Oc(Dc,{}),[e]:t})}var Qc=new Set;function $c(){return document.documentElement.dataset.motion===`calm`}function el(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:$c()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}function tl(){return _.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}var nl=[`pedidos`,`fichas`,`resueltos`,`pagos`],rl=[`observaciones`,`incidentes`];function il(e){return rl.includes(e)?{desde:Wc()}:{}}function al(e){return v.cached(e,il(e))}var ol=new Set,sl=new Map,cl=new Map,ll=!1,ul=!1;function dl(){ll||(ll=!0,$e(e=>{[...nl,...rl].includes(e)&&(ol.add(e),sl.delete(e),ml())}),window.addEventListener(`online`,ml),window.addEventListener(`offline`,ml))}function fl(){let e=_.user();e&&[...nl,...rl].forEach(t=>{let n=il(t),r=`${e.usuario}|${n.desde||``}`,i=cl.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};cl.set(t,a),v.list(t,n).then(()=>{ol.add(t),sl.delete(t)}).catch(e=>{e.status!==401&&(sl.set(t,e.message),Lc(e.message))}).finally(()=>{cl.get(t)===a&&(a.stop=v.watch(t,n)),ml(),Ll()})})}function pl(){[...cl.values()].forEach(e=>e.stop?.()),cl.clear(),sl.clear(),fl()}function ml(){ul||(ul=!0,requestAnimationFrame(()=>{ul=!1,document.querySelector(`.coord-shell`)&&hl()}))}function hl(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;Xl.has(t)||(Yl[t]=eu(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function gl(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}var _l=[`nuevo`,`en-curso`,`resuelto`];function vl(e){return e.estado===`curso`?`en-curso`:_l.includes(e.estado)?e.estado:`nuevo`}function yl(){return al(`pedidos`).slice().sort(gl)}function bl(){return al(`fichas`).slice().sort(gl)}function xl(){return al(`pagos`).slice().sort(gl)}function Sl(){let e={};return al(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function Cl(e){return e.datos?.perro||e.perro||``}function wl(e){return e.filter(e=>e.origen===`web`&&vl(e)===`nuevo`)}function Tl(e){let t=_.user();return!t||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function El(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${Vc(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${U(e.creadoPorNombre)}${e.creadoEn?` el ${Vc(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre||e.cambioPorNombre;n.push(`Último cambio${t?` de ${U(t)}`:``}: ${Vc(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var Dl=new Set;async function Ol(e,t,{section:n,ok:r}){try{let i=await v.save(e,t);return Nc(n,i.pendiente?`${r} Sin señal: se enviará cuando vuelva.`:r),i}catch(e){return Nc(n,`No se pudo guardar: ${e.message}`,`error`),null}finally{ml()}}async function kl(e,t,{section:n,ok:r}){try{await v.remove(e,t.id),Mc={col:e,record:t,section:n},Nc(n,r),jc.undo=!0}catch(e){Nc(n,`No se pudo borrar: ${e.message}`,`error`)}finally{ml()}}function Al(e,t){Dl.has(e)||(Dl.add(e),Promise.resolve().then(t).finally(()=>Dl.delete(e)))}var jl=!1,Ml=!1,Nl=``,Pl=/^[a-z0-9][a-z0-9_.-]{0,90}$/i;function Fl(e){let t=`ant_${String(e||``)}`;return Pl.test(String(e||``))?t:void 0}function Il(){let e=pt(),t=[];Oc(H.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:H.pedidos,oldId:n.id,col:`pedidos`,data:{id:Fl(n.id),fecha:Hc(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:_l.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),Oc(H.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:H.altas,oldId:r,col:`fichas`,data:{id:Fl(r),fecha:Hc(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})}),Oc(H.pagos,[]).forEach(n=>{let r=Number(String(n.montoTexto||n.monto||``).replace(/[^\d]/g,``))||0;t.push({key:H.pagos,oldId:n.id,col:`pagos`,data:{id:Fl(n.id),fecha:Hc(n.fecha)||e,concepto:`Pago de ${n.perro||`Pendiente de confirmar`}`,perroNombre:n.perro||``,monto:r,medio:n.medio||``,comprobante:n.comprobante||``,nota:n.nota||``,pasadoAlLibro:!!n.enLibro,migrado:!0}})});let n=new Set(al(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(Oc(H.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:H.resueltos,oldId:e,skip:!0});return}let i=C.find(t=>t.id===e);t.push({key:H.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function Ll(){if(!(jl||Ml)&&nl.every(e=>ol.has(e))){Ml=!0;try{let e=Oc(H.borradores,{});Object.entries(e).forEach(([e,t])=>{Yl[e]||(Yl[e]=t)}),Ac(H.borradores);let t=Il();if(!t.length){jl=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await v.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[H.pedidos,H.altas,H.pagos].forEach(e=>{let t=Oc(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?kc(e,t):Ac(e)});let a=Object.fromEntries(Object.entries(Oc(H.resueltos,{})).filter(([e])=>n.has(`${H.resueltos}|${e}`)));Object.keys(a).length?kc(H.resueltos,a):Ac(H.resueltos),r&&(Nl=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo. Ahora los ve el resto del equipo según su rol.`,Ic(Nl)),n.size?(sl.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),Lc(sl.get(`migracion`))):jl=!0}finally{Ml=!1,ml()}}}var Rl=C.filter(e=>e.status===`Activo`),zl=S.filter(e=>e!==`Domingo`),Bl=[`Mañana`,`Tarde`];function Vl(e){return e.safety.some(e=>/bozal/i.test(e))}function Hl(e,t){return Kt(e,t).filter(e=>e.status===`Activo`)}var Ul=C.filter(e=>e.review||e.status!==`Activo`);function Wl(e,t){let n=Hl(e,t),r=new Set(n.map(e=>e.name)),i=new Map;return n.forEach(e=>{(e.incompatibleWith||[]).forEach(t=>{if(!r.has(t))return;let n=[e.name,t].sort().join(` y `);i.set(n,n)})}),[...i.keys()]}function Gl(){let e=new Map;return zl.forEach(t=>{Bl.forEach(n=>{Wl(t,n).forEach(r=>{e.has(r)||e.set(r,{});let i=e.get(r);i[n]=[...i[n]||[],t]})})}),[...e.entries()].map(([e,t])=>({pair:e,detail:Object.entries(t).map(([e,t])=>`${e.toLowerCase()}: ${qc(t).toLowerCase()}`).join(` · `)}))}function Kl(){let e=new Set(C.map(e=>e.name)),t=new Set;return C.forEach(n=>(n.incompatibleWith||[]).forEach(n=>!e.has(n)&&t.add(n))),[...t]}function ql(){return zl.map(e=>{let t=Hl(e,`Mañana`),n=Hl(e,`Tarde`),r=new Set([...t,...n].filter(Vl).map(e=>e.name));return{day:e,manana:t.length,tarde:n.length,total:t.length+n.length,muzzle:[...r],conflicts:Wl(e,`Mañana`).length+Wl(e,`Tarde`).length}})}function Jl(){let e=Sl();return Ul.filter(t=>!e[t.id])}var Yl={},Xl=new Set;function Zl(e){return Yl[e]||{}}function Ql(e,t){Yl[e]=t,Xl.delete(e)}function $l(e){delete Yl[e],Xl.add(e)}function eu(e){let t={...Zl(e.dataset.coordForm)};return e.querySelectorAll(`[name]`).forEach(n=>{if(n.type!==`file`){if(n.type===`checkbox`){let r=e.querySelectorAll(`[name="${n.name}"]`);t[n.name]=[...r].filter(e=>e.checked).map(e=>e.value)}else t[n.name]=n.value}}),t}function tu(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${U(r)}" ${i?`placeholder="${U(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function nu(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``} ${s?`required`:``}>
        ${r.map(e=>`<option ${e===i?`selected`:``}>${U(e)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function ru(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``}={}){let c=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}</label>
      <textarea id="${c}" name="${t}" rows="3" ${i?`placeholder="${U(i)}"`:``} ${a?`aria-describedby="${c}-hint"`:``} ${s}>${U(r)}</textarea>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function iu(e,t,n,r,i){let a=`coord-${e}-${t}`;return`
    <div class="coord-field">
      <span class="coord-label" id="${a}-label">${n}</span>
      <div class="coord-file">
        <input class="coord-file-input" id="${a}" type="file" accept=".jpg,.jpeg,.png,.pdf" data-coord-file="${e}" data-coord-file-field="${t}" aria-labelledby="${a}-label ${a}-button" aria-describedby="${a}-hint" />
        <label class="coord-btn is-secondary is-compact" for="${a}" id="${a}-button">${g(`fileUp`,`coord-icon`)}<span>${r?`Cambiar archivo`:`Elegir archivo`}</span></label>
        <span class="coord-file-name" data-coord-file-name>${r?U(r):`Ningún archivo elegido`}</span>
      </div>
      <small id="${a}-hint">${i}</small>
    </div>
  `}function au(e){if(!jc||jc.section!==e)return``;let t=jc.undo?`<button class="coord-link" type="button" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${jc.tone}">${g(jc.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${U(jc.text)}</span>${t}</p>`}function W(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?g(r,`coord-icon`):``}<span>${e}</span></button>`}function ou({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${Xc(e,s)?`open`:``}>
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
  `}function G(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function su(e){return e.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${U(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${g(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${U(e)}</li>`).join(``)}
    </ul>
  `:``}function cu(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${U(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function lu(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${uu()}
      ${e}
    </div>
  `}function uu(){return`
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
  `}function du(){dl(),fl();let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${fu()}
      ${mu()}
      ${gu()}
      ${Tu()}
      ${Du()}
      ${Pu()}
      ${Fu()}
      ${Iu()}
      <p class="coord-footnote">
        Rutas y datos de perros al ${Ft}. Fuentes: ${U(b.officialSources.dogs)} y ${U(b.officialSources.routes)}.
        Pedidos, fichas, datos resueltos y pagos se guardan en los datos compartidos del equipo.
      </p>
    </main>
  `;return jc=null,Xl.clear(),e}function fu(){let e=v.pendingCount(),t=navigator.onLine===!1,n=[...new Set(sl.values())],r=[];return e?r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>${e} ${e===1?`cambio pendiente`:`cambios pendientes`} sin señal.</b> Se ${e===1?`envía solo`:`envían solos`} cuando vuelva.</span></p>`):t&&r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva.</span></p>`),n.length&&r.push(`<div class="coord-sync is-error">${g(`alertCircle`,`coord-icon`)}<span>${n.map(U).join(` `)}</span>${W(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),Nl&&r.push(`<p class="coord-sync is-ok">${g(`uploadCloud`,`coord-icon`)}<span>${U(Nl)}</span></p>`),r.length?`<div class="coord-sync-list">${r.join(``)}</div>`:``}function pu(e){if(!e.length)return``;let t=e.slice(0,3);return`
    <div class="coord-web-alert" role="note" aria-labelledby="coord-web-alert-title">
      <h2 id="coord-web-alert-title">${g(`bell`,`coord-icon`)}<span>${e.length===1?`Pedido nuevo desde la web`:`${e.length} pedidos nuevos desde la web`}</span></h2>
      <ul>
        ${t.map(e=>{let t=e.datos||{},n=t.mordida&&t.mordida!==`No`;return`
            <li>
              <div>
                <strong>${U(t.perro||`Pendiente de confirmar`)}</strong>
                <span>${U([t.responsable,t.zona].filter(Boolean).join(` · `)||`Pendiente de confirmar`)} · ${U(Vc(e.creadoEn)||Bc(e.fecha))}</span>
                ${n?`<span class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>Mordida: ${U(t.mordida)}</span></span>`:``}
              </div>
              ${W(`Ver pedido`,`data-coord-goto-pedido="${U(e.id)}"`,`primary`,`arrowRight`)}
            </li>
          `}).join(``)}
      </ul>
      ${e.length>t.length?`<p>Y ${e.length-t.length} más en el tablero de pedidos.</p>`:``}
    </div>
  `}function mu(){let e=qt(zc()),t=tl(),n=Jl(),r=yl(),i=r.filter(e=>vl(e)!==`resuelto`),a=r.filter(e=>vl(e)===`nuevo`).length,o=wl(r),s=Hl(e,`Mañana`),c=Hl(e,`Tarde`),l=[...new Set([...s,...c].filter(Vl).map(e=>e.name))],u=[...Wl(e,`Mañana`).map(e=>`${e} (mañana)`),...Wl(e,`Tarde`).map(e=>`${e} (tarde)`)],d=s.length+c.length===0,f;if(o.length){let e=o[o.length-1],t=e.datos||{};f={text:`Escribile a <b>${U(t.responsable||`quien hizo el pedido`)}</b> por la evaluación de <b>${U(t.perro||`su perro`)}</b>.`,action:W(`Ver pedido`,`data-coord-goto-pedido="${U(e.id)}"`,`primary`,`arrowRight`)}}else if(n.length){let e=n[0];f={text:`Confirmá el dato de <b>${U(e.name)}</b>: ${U(e.review||`estado "${e.status}"`)}`,action:W(`Ir a ${U(e.name)}`,`data-coord-goto-dog="${e.id}"`,`primary`,`arrowRight`)}}else if(i.length){let e=i[i.length-1];f={text:`Avanzá con el pedido más viejo: <b>${U(e.titulo||e.tipo)}</b>.`,action:W(`Ver pedido`,`data-coord-goto-pedido="${U(e.id)}"`,`primary`,`arrowRight`)}}else f={text:`No hay datos ni pedidos pendientes. Revisá la carga de la semana.`,action:W(`Ver carga`,`data-coord-open="carga"`,`primary`,`arrowRight`)};return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${e} ${Uc()}</p>
        <p class="coord-greeting">Hola, ${U(t.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
        <p class="coord-owner">A cargo: ${U(t.nombre)}</p>
      </div>

      ${pu(o)}

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Datos a confirmar</h2>
            <p class="coord-big"><b>${n.length}</b> <span>de ${Ul.length} perros</span></p>
            <p>${n.length?`Diferencias entre planillas o perros sin ruta.`:`Todo confirmado.`}</p>
          </div>
          ${W(`Ver la lista`,`data-coord-goto="coord-datos"`,`secondary`)}
        </li>
        <li class="coord-priority ${o.length?`is-alert`:a?`is-warn`:``}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Pedidos abiertos</h2>
            <p class="coord-big"><b>${i.length}</b> <span>${a?`${a} sin empezar`:i.length===1?`pedido`:`pedidos`}</span></p>
            <p>${r.length?`Consultas, evaluaciones de la web y avisos de clientes.`:ol.has(`pedidos`)?`Todavía no hay pedidos.`:`Cargando pedidos…`}</p>
          </div>
          ${W(r.length?`Ver pedidos`:`Cargar un pedido`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${u.length?`is-alert`:``}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Hoy en la calle</h2>
            ${d?`<p class="coord-big"><b>0</b> <span>perros</span></p><p>No hay rutas cargadas para hoy.</p>`:`<p class="coord-big"><b>${s.length}</b> <span>mañana</span> <b>${c.length}</b> <span>tarde</span></p>
                 ${l.length?`<p class="coord-inline-alert">${g(`alertTriangle`,`coord-icon`)}<span>Con bozal: ${U(Yc(l))}</span></p>`:``}
                 ${u.length?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>No juntar, comparten turno: ${U(Yc(u))}</span></p>`:``}`}
          </div>
          ${W(`Ver carga de la semana`,`data-coord-open="carga"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function hu(e,t){let n=t?t.actualizadoPorNombre||t.resueltoPorNombre||t.creadoPorNombre:``;return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${U(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?G(`Activo`,`neutral`):G(U(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${U(e.plan)} · ${U(e.size)} · ${U(Jc(e))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${U(e.review||`Estado "${e.status}".`)}</p>
      ${su(e)}
      ${t?.nota?`<p class="coord-meta">${U(t.nota)}</p>`:``}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Resuelto${n?` por ${U(n)}`:``}${t.actualizadoEn?` el ${Vc(t.actualizadoEn)}`:``}${t.pendiente?` (sin señal: se enviará cuando vuelva)`:``}</span></p>${W(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:W(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function gu(){let e=Sl(),t=Ul.filter(t=>!e[t.id]),n=Ul.filter(t=>e[t.id]),r=t.slice(0,4),i=t.slice(4),a=Kl();return`
    <section class="coord-block" id="coord-datos" tabindex="-1" aria-labelledby="coord-datos-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-datos-title">Datos a confirmar</h2>
          <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
        </div>
        <div class="coord-progress" aria-label="${n.length} de ${Ul.length} resueltos">
          <b>${n.length}/${Ul.length}</b><span>resueltos</span>
          <span class="coord-progress-bar" aria-hidden="true"><i style="width:${Math.round(n.length/Ul.length*100)}%"></i></span>
        </div>
      </div>
      ${au(`datos`)}
      ${t.length?`<ul class="coord-review-list">${r.map(e=>hu(e)).join(``)}</ul>`:`<p class="coord-empty">${g(`checkCircle`,`coord-icon`)}No quedan datos por confirmar.</p>`}
      ${i.length?`
        <details class="coord-more" ${Xc(`datosMas`)?`open`:``}>
          <summary data-coord-toggle="datosMas">Ver los otros ${i.length} pendientes ${g(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${i.map(e=>hu(e)).join(``)}</ul>
        </details>`:``}
      ${n.length?`
        <details class="coord-more" ${Xc(`datosResueltos`)?`open`:``}>
          <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${n.map(t=>hu(t,e[t.id])).join(``)}</ul>
        </details>`:``}
      ${a.length?`<p class="coord-note">${g(`alertCircle`,`coord-icon`)}<span>También a confirmar: ${U(Yc(a))} figura en "no juntar con" pero no está en la lista de perros.</span></p>`:``}
      <p class="coord-note">${g(`fileText`,`coord-icon`)}<span>Lo que marcás como resuelto lo ven Juan y coordinación. El cambio todavía debe incorporarse al ${U(b.officialSources.dogs.toLowerCase())}.</span></p>
    </section>
  `}var _u=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],vu=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],yu=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],bu={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function xu(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function Su(e,t){let n=e.datos||{};if(!n.telefono)return``;let r=xu(n.telefono);if(!r)return`<p class="coord-inline-alert">${g(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina. Escribile a mano.</span></p>`;let i=`${n.responsable?`Hola ${n.responsable}`:`Hola`}, te escribo de Paseos Juan por el pedido de evaluación de ${n.perro||`tu perro`}.`;return`<a class="coord-btn is-${t}" href="https://wa.me/${r}?text=${encodeURIComponent(i)}" target="_blank" rel="noopener noreferrer">${g(`message`,`coord-icon`)}<span>Escribirle por WhatsApp</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`}function Cu(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return cu([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function wu(e,t){let n=vl(e),r=e.origen===`web`,i=e.datos||{},a=U(e.id),o=t.get(e.id),s={nuevo:W(`Empezar`,`data-coord-pedido-move="${a}" data-estado="en-curso"`,`secondary`)+W(`Resolver`,`data-coord-pedido-move="${a}" data-estado="resuelto"`,`ghost`),"en-curso":W(`Resolver`,`data-coord-pedido-move="${a}" data-estado="resuelto"`,`secondary`)+W(`Volver a nuevo`,`data-coord-pedido-move="${a}" data-estado="nuevo"`,`ghost`),resuelto:W(`Reabrir`,`data-coord-pedido-move="${a}" data-estado="en-curso"`,`secondary`)}[n],c=`pedido-${e.id}`,l=n!==`resuelto`||Qc.has(c),u=(r||/evaluaci/i.test(e.tipo||``))&&!o&&n!==`resuelto`,d=r?n===`resuelto`?`<details class="coord-card-more" ${l?`open`:``}><summary data-coord-mem-toggle="${U(c)}">Ver datos del formulario ${g(`chevronDown`,`coord-icon`)}</summary>${Cu(e)}</details>`:Cu(e):`
      <p class="coord-card-dog">${g(`pawPrint`,`coord-icon`)}${U(Cl(e)||`Pendiente de confirmar`)}</p>
      ${e.detalle?`<p>${U(e.detalle)}</p>`:``}
    `;return`
    <li class="coord-card ${r?`is-web`:``}" id="coord-pedido-${a}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${U(r?i.perro||`Pendiente de confirmar`:e.tipo||`Pedido`)}</strong>
        <small>${r?U(e.tipo||`Formulario web`):`${U(Bc(e.fecha))}${i.canal||e.canal?` · ${U(i.canal||e.canal)}`:``}`}</small>
      </div>
      ${r?`<p class="coord-badges">${G(`Formulario web`,`warn`)}</p>`:``}
      ${d}
      ${El(e,{web:r})}
      ${o?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Ficha creada para ${U(o.perroNombre)}</span></p>`:``}
      <div class="coord-actions">
        ${n===`resuelto`?``:Su(e,`primary`)}
        ${s}
        ${u?W(`Armar ficha con estos datos`,`data-coord-pedido-ficha="${a}"`,`ghost`,`userPlus`):``}
        ${n===`resuelto`&&Tl(e)?W(`Borrar`,`data-coord-pedido-delete="${a}"`,`ghost`):``}
      </div>
    </li>
  `}function Tu(){let e=yl(),t=Zl(`pedido`),n=e.filter(e=>vl(e)!==`resuelto`).length,r=wl(e).length,i=C.map(e=>e.name),a=new Map(bl().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),o=!ol.has(`pedidos`)&&!e.length,s=`
    ${au(`pedidos`)}
    <div class="coord-board">
      ${yu.map(([t,n])=>{let r=e.filter(e=>vl(e)===t);return t===`nuevo`&&r.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`)),`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(e=>wu(e,a)).join(``)}</ul>`:`<p class="coord-empty is-small">${o?`Cargando…`:t===`nuevo`?`Sin pedidos nuevos.`:t===`en-curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>

    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${nu(`pedido`,`tipo`,`Tipo de pedido`,_u,{value:t.tipo})}
        ${tu(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre del perro o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${nu(`pedido`,`canal`,`Llegó por`,vu,{value:t.canal})}
        ${ru(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${i.map(e=>`<option value="${U(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${W(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>
  `;return ou({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Los del formulario de la web y los que cargás vos. Los ve todo coordinación.`,badges:`${r?G(`${r} ${r===1?`nuevo`:`nuevos`} de la web`,`alert`):``}${n?G(`${n} abiertos`,`warn`):G(`Sin pedidos abiertos`,`neutral`)}`,body:s,open:r>0})}var Eu=[`Pendiente de confirmar`,`Sí`,`No`];function Du(){let e=Zl(`alta`),t=bl(),n=Array.isArray(e.dias)?e.dias:[],r=[`Pendiente de confirmar`,...Rt.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${g(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${au(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${e.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>`:``}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${tu(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${nu(`alta`,`tamano`,`Tamaño`,[`Pendiente de confirmar`,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${tu(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${tu(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${nu(`alta`,`sexo`,`Sexo`,[`Pendiente de confirmar`,`Macho`,`Hembra`],{value:e.sexo})}
          ${nu(`alta`,`castrado`,`Castrado o castrada`,Eu,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${tu(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${tu(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${tu(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${nu(`alta`,`zona`,`Zona`,[`Pendiente de confirmar`,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${tu(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${nu(`alta`,`vacunas`,`Vacunas al día`,Eu,{value:e.vacunas})}
          ${iu(`alta`,`carnet`,`Carnet de vacunas`,e.carnet,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
          ${tu(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${ru(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${nu(`alta`,`sujecion`,`Collar o pechera`,[`Pendiente de confirmar`,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${nu(`alta`,`bozal`,`Usa bozal`,Eu,{value:e.bozal})}
          ${nu(`alta`,`correa`,`Tiene correa propia`,Eu,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${e.relatoTutor?ru(`alta`,`relatoTutor`,`Lo que contó el tutor en el formulario (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${ru(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,placeholder:`Ej.: se acerca con la cola baja y se aleja si el otro ladra`,span:!1})}
          ${ru(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${ru(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${tu(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${nu(`alta`,`plan`,`Plan pedido`,r,{value:e.plan,hint:`Precios oficiales en la tabla de planes.`})}
          ${nu(`alta`,`turno`,`Turno`,[`Pendiente de confirmar`,`Mañana`,`Tarde`],{value:e.turno})}
          <div class="coord-field is-wide">
            <span class="coord-label" id="coord-alta-dias-label">Días pedidos</span>
            <div class="coord-days" role="group" aria-labelledby="coord-alta-dias-label">
              ${zl.map(e=>`
                <label class="coord-day"><input type="checkbox" name="dias" value="${e}" ${n.includes(e)?`checked`:``} /><span>${e}</span></label>
              `).join(``)}
            </div>
          </div>
          <div class="coord-field">
            <span class="coord-label">Categoría</span>
            <p class="coord-fixed">${G(`SIN EVALUAR`,`neutral`)}</p>
          </div>
          <div class="coord-field">
            <span class="coord-label">Primer paseo</span>
            <p class="coord-fixed">${G(`Individual`,`neutral`)}</p>
          </div>
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
                <strong>${U(e.perroNombre||t.nombre||`Pendiente de confirmar`)}</strong>
                <small>Alta ${U(Bc(e.fecha))}</small>
              </div>
              <p class="coord-badges">${G(U(e.categoria||`SIN EVALUAR`),`neutral`)} ${G(`Primer paseo individual`,`warn`)} ${e.estado===`borrador`?G(`Borrador`,`neutral`):``}</p>
              <p>${U(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:t.tamano)} · Plan: ${U(!t.plan||t.plan===`Pendiente de confirmar`?`pendiente`:t.plan)} · Días: ${n.length?U(qc(n).toLowerCase()):`pendientes`} · Turno: ${U(!t.turno||t.turno===`Pendiente de confirmar`?`pendiente`:t.turno.toLowerCase())}</p>
              ${t.bozal===`Sí`||t.noJuntar?`<ul class="coord-safety">
                ${t.bozal===`Sí`?`<li class="is-alert">${g(`alertTriangle`,`coord-icon`)}Usa bozal</li>`:``}
                ${t.noJuntar?`<li class="is-alert">${g(`alertTriangle`,`coord-icon`)}No juntar con ${U(t.noJuntar)}</li>`:``}
              </ul>`:``}
              ${El(e)}
              <div class="coord-actions">
                ${W(`Copiar ficha`,`data-coord-alta-copy="${U(e.id)}"`,`ghost`,`copy`)}
                ${Tl(e)?W(`Borrar`,`data-coord-alta-delete="${U(e.id)}"`,`ghost`):``}
              </div>
            </li>
          `}).join(``)}
        </ul>
        <p class="coord-note">${g(`fileText`,`coord-icon`)}<span>Estas fichas todavía deben incorporarse al ${U(b.officialSources.dogs.toLowerCase())}.</span></p>
      `:`<p class="coord-empty is-small">${ol.has(`fichas`)?`Todavía no hay perros nuevos cargados.`:`Cargando fichas…`}</p>`}
    </div>
  `;return ou({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?G(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function Ou(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${Bc(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; carnet: ${n(t.carnet)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):y}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function ku(e){let t=Gc(e),n=zl.map(Gc),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return zl.slice(e,t+1)}return zl.filter((e,r)=>t.includes(n[r]))}function Au(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>Gc(t.zona)===Gc(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:y,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:y,dias:ku(t.dias)}}function ju(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>C.find(t=>t.id===e)?.name||e);return t.length?Yc(t):``}function Mu(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||gl(e,t)}function Nu(e,t){let n=ju(e),r=e.titulo||(t===`incidente`?`Incidente`:`Observación`),i=e.riesgo?String(e.riesgo):``,a=t===`incidente`?[[`Perro`,n],[`Lugar`,e.lugar],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Perro`,n],[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]];return`
    <li class="coord-card coord-feed-item ${t===`incidente`?`is-incident`:``}">
      <div class="coord-card-head">
        <strong>${U(r)}</strong>
        <small>${U(Bc(e.fecha))}${e.hora?` · ${U(e.hora)}`:``}</small>
      </div>
      ${i?`<p class="coord-badges">${G(`Riesgo: ${U(i)}`,/alto|grave/i.test(i)?`alert`:`warn`)}</p>`:``}
      ${cu(a)}
      ${El(e)}
    </li>
  `}function Pu(){let e=al(`incidentes`).filter(e=>!e.fecha||e.fecha>=Wc()).sort(Mu),t=al(`observaciones`).filter(e=>!e.fecha||e.fecha>=Wc()).sort(Mu),n=e=>!ol.has(e),r=`
    <p class="coord-note">${g(`eye`,`coord-icon`)}<span>Solo lectura. Las cargan los paseadores y supervisión. Se muestran los últimos 7 días (desde el ${U(Bc(Wc()))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${e.length}</span></h3>
        ${e.length?`<ul class="coord-card-list">${e.map(e=>Nu(e,`incidente`)).join(``)}</ul>`:`<p class="coord-empty is-small">${n(`incidentes`)?`Cargando…`:`Sin incidentes en los últimos 7 días.`}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${t.length}</span></h3>
        ${t.length?`<ul class="coord-card-list">${t.map(e=>Nu(e,`observacion`)).join(``)}</ul>`:`<p class="coord-empty is-small">${n(`observaciones`)?`Cargando…`:`Sin observaciones en los últimos 7 días.`}</p>`}
      </section>
    </div>
  `;return ou({key:`actividad`,id:`coord-actividad`,iconName:`activity`,title:`Observaciones e incidentes`,intro:`Lo que registró el equipo en la calle en los últimos 7 días.`,badges:`${e.length?G(`${e.length} ${e.length===1?`incidente`:`incidentes`}`,`alert`):``}${t.length?G(`${t.length} ${t.length===1?`observación`:`observaciones`}`,`neutral`):``}`,body:r})}function Fu(){let e=ql(),t=qt(zc()),n=Math.max(...e.map(e=>e.total),1),r=e.filter(e=>e.total===n).map(e=>e.day),i=Gl(),a=Rl.filter(e=>zl.some(t=>Bl.every(n=>Gt(e,t,n)))).map(e=>e.name),o=C.filter(e=>e.status!==`Activo`).map(e=>`${e.name} (${e.status.toLowerCase()})`),s=`
    ${i.length?`
      <div class="coord-alert-box" role="note">
        <h3>${g(`alertTriangle`,`coord-icon`)}Perros que no se pueden juntar y comparten turno</h3>
        <ul>${i.map(e=>`<li><b>${U(e.pair)}</b> · ${U(e.detail)}</li>`).join(``)}</ul>
        <p>Según ${U(b.officialSources.routes)}. Revisá que no vayan en el mismo grupo.</p>
      </div>`:``}
    <div class="coord-table-wrap">
      <table class="coord-table">
        <caption>Perros activos por día y turno (rutas del ${Ft}). Día con más carga: ${U(Yc(r.map(e=>e.toLowerCase())))}, ${n} paseos.</caption>
        <thead>
          <tr><th scope="col">Día</th><th scope="col">Mañana</th><th scope="col">Tarde</th><th scope="col">Total</th><th scope="col">Bozal</th></tr>
        </thead>
        <tbody>
          ${e.map(e=>`
            <tr class="${e.day===t?`is-today`:``} ${e.total===n?`is-max`:``}">
              <th scope="row"><span class="coord-day-name">${e.day}</span>${e.day===t?`<span class="coord-tag">Hoy</span>`:``}</th>
              <td>${e.manana}</td>
              <td>${e.tarde}</td>
              <td><span class="coord-total"><b>${e.total}</b><span class="coord-bar" aria-hidden="true"><i style="width:${Math.round(e.total/n*100)}%"></i></span></span></td>
              <td><span class="coord-cell-alerts">${e.muzzle.length}${e.conflicts?`<span class="coord-tag is-alert">${g(`alertTriangle`,`coord-icon`)}${e.conflicts}<span class="coord-sr-only"> ${e.conflicts===1?`cruce`:`cruces`} a revisar</span></span>`:``}</span></td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
    <ul class="coord-notes">
      <li>Bozal: perros con bozal ese día. El ícono de alerta marca cuántos cruces de "no juntar" hay ese día.</li>
      <li>Domingo: sin rutas cargadas.</li>
      ${a.length?`<li>${U(Yc(a))} ${a.length===1?`sale`:`salen`} en los dos turnos el mismo día y cuenta${a.length===1?``:`n`} en ambos.</li>`:``}
      ${o.length?`<li>No se cuentan: ${U(Yc(o))}.</li>`:``}
    </ul>
  `;return ou({key:`carga`,id:`coord-carga`,iconName:`chart`,title:`Carga por día y turno`,intro:`Calculada con las rutas reales. Incluye bozales y cruces a revisar.`,badges:i.length?G(`${i.length} ${i.length===1?`cruce`:`cruces`} a revisar`,`alert`):``,body:s})}function Iu(){let e=xl(),t=Zl(`pago`),n=e.filter(e=>!e.pasadoAlLibro).length,r=[`Elegí un perro`,...Rl.map(e=>e.name).sort((e,t)=>e.localeCompare(t,`es`)),`Otro (anotalo en la nota)`],i=`
    <div class="coord-rule is-info" role="note">
      ${g(`fileText`,`coord-icon`)}
      <p><b>Fuente oficial:</b> el ${U(b.officialSources.money)} y la hoja Cobranza semanal. Esto es solo un registro de apoyo para no olvidarte de pasar un pago. No anotes alias ni datos bancarios: el detalle de pago se envía por WhatsApp.</p>
    </div>
    ${au(`pagos`)}
    <form class="coord-form" data-coord-form="pago" novalidate>
      <h3>Anotar un pago recibido</h3>
      <div class="coord-grid">
        ${nu(`pago`,`perro`,`Perro`,r,{value:t.perro,required:!0})}
        ${tu(`pago`,`monto`,`Monto recibido`,{value:t.monto,required:!0,attrs:`inputmode="numeric" autocomplete="off"`,hint:`El que figura en el comprobante. Solo números.`})}
        ${nu(`pago`,`medio`,`Medio de pago`,[`Transferencia`,`Efectivo`,`Otro`],{value:t.medio})}
        ${tu(`pago`,`fecha`,`Fecha del pago`,{value:t.fecha||Uc(),placeholder:`DD/MM/AAAA`,attrs:`inputmode="numeric"`,hint:`Formato DD/MM/AAAA.`})}
        ${iu(`pago`,`comprobante`,`Comprobante`,t.comprobante,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
        ${tu(`pago`,`nota`,`Nota`,{value:t.nota,placeholder:`Opcional`})}
      </div>
      <div class="coord-actions">${W(`Guardar registro`,`data-coord-pago-save`,`primary`,`plus`)}</div>
    </form>

    <div class="coord-subblock">
      <h3>Pagos anotados <span>${e.length}</span></h3>
      ${e.length?`
        <ul class="coord-pay-list">
          ${e.map(e=>`
            <li class="coord-pay ${e.pasadoAlLibro?`is-done`:``}">
              <div class="coord-pay-main">
                <strong>${U(e.perroNombre||e.concepto||`Pendiente de confirmar`)}</strong>
                <span>${U(Number.isFinite(Number(e.monto))&&e.monto!==``?w(e.monto):y)} · ${U(e.medio||`Pendiente de confirmar`)} · ${U(Bc(e.fecha))}</span>
                ${e.comprobante?`<small>Comprobante: ${U(e.comprobante)}</small>`:`<small>Sin comprobante</small>`}
                ${e.nota?`<small>${U(e.nota)}</small>`:``}
                ${El(e)}
              </div>
              ${e.pasadoAlLibro?G(`Pasado al Libro contable`,`ok`):G(`Falta pasar al Libro contable`,`warn`)}
              <div class="coord-actions">
                ${W(e.pasadoAlLibro?`Marcar como no pasado`:`Ya lo pasé al Libro`,`data-coord-pago-libro="${U(e.id)}"`,e.pasadoAlLibro?`ghost`:`secondary`,e.pasadoAlLibro?``:`checkCircle`)}
                ${Tl(e)?W(`Borrar`,`data-coord-pago-delete="${U(e.id)}"`,`ghost`):``}
              </div>
            </li>
          `).join(``)}
        </ul>
      `:`<p class="coord-empty is-small">${ol.has(`pagos`)?`No hay pagos anotados.`:`Cargando pagos…`}</p>`}
    </div>
  `;return ou({key:`pagos`,id:`coord-pagos`,iconName:`wallet`,title:`Pagos`,intro:`Registro de apoyo compartido con Juan. La fuente oficial es el Libro contable.`,badges:n?G(`${n} sin pasar al Libro`,`warn`):``,body:i})}function Lu(e,t,n){Zc(e,!0),$(),el(t,n)}function Ru(e){try{(navigator.clipboard?.writeText(e))?.catch?.(()=>{})}catch{}}function zu(e,t){return e.find(e=>e.id===t)}function Bu(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target.closest(`[data-coord-toggle]`);if(t){let e=t.parentElement;return Zc(t.dataset.coordToggle,!e.open),!0}let n=e.target.closest(`[data-coord-mem-toggle]`);if(n){let e=n.dataset.coordMemToggle;return n.parentElement.open?Qc.delete(e):Qc.add(e),!0}if(e.target.closest(`[data-coord-retry]`))return pl(),jl=!1,Ic(`Volviendo a pedir los datos.`),!0;let r=e.target.closest(`[data-coord-goto]`);if(r)return el(r.dataset.coordGoto),!0;let i=e.target.closest(`[data-coord-goto-dog]`);if(i){let e=i.dataset.coordGotoDog;return Jl().findIndex(t=>t.id===e)>=4&&(Zc(`datosMas`,!0),$()),el(`coord-dato-${e}`),!0}let a=e.target.closest(`[data-coord-goto-pedido]`);if(a)return Lu(`pedidos`,`coord-pedido-${a.dataset.coordGotoPedido}`),!0;let o=e.target.closest(`[data-coord-open]`);if(o){let e=o.dataset.coordOpen,t=e===`pedidos`&&!yl().length?`#coord-pedido-tipo`:null;return Lu(e,`coord-${e}`,t),!0}if(e.target.closest(`[data-coord-undo]`)){let e=Mc;if(Mc=null,e){let{pendiente:t,...n}=e.record;Al(`undo`,()=>Ol(e.col,n,{section:e.section,ok:`Listo, se recuperó.`}))}return!0}let s=e.target.closest(`[data-coord-resolve]`);if(s){let e=s.dataset.coordResolve,t=C.find(t=>t.id===e);return Al(`resuelto-${e}`,async()=>{await Ol(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{section:`datos`,ok:`${t?.name||e}: marcado como resuelto.`})&&el(`coord-datos`)}),!0}let c=e.target.closest(`[data-coord-unresolve]`);if(c){let e=c.dataset.coordUnresolve,t=C.find(t=>t.id===e);return Al(`resuelto-${e}`,()=>Ol(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{section:`datos`,ok:`${t?.name||e}: volvió a pendientes.`})),!0}if(e.target.closest(`[data-coord-pedido-save]`)){let t=eu(e.target.closest(`[data-coord-form]`));if(Ql(`pedido`,t),!t.perro?.trim()&&!t.detalle?.trim())return Nc(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),el(`coord-pedidos`,`#coord-pedido-perro`),!0;let n=t.tipo||_u[0],r=t.perro?.trim()||``;return Al(`pedido-save`,async()=>{await Ol(`pedidos`,{fecha:pt(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:t.detalle?.trim()||``,datos:{perro:r,canal:t.canal||vu[0]}},{section:`pedidos`,ok:`Pedido guardado en "Nuevo".`})&&$l(`pedido`)}),!0}let l=e.target.closest(`[data-coord-pedido-move]`);if(l){let e=l.dataset.coordPedidoMove,t=l.dataset.estado;return Al(`pedido-${e}`,()=>Ol(`pedidos`,{id:e,estado:t},{section:`pedidos`,ok:`Pedido movido a "${bu[t]}".`})),!0}let u=e.target.closest(`[data-coord-pedido-delete]`);if(u){let e=zu(yl(),u.dataset.coordPedidoDelete);return e&&Al(`pedido-${e.id}`,()=>kl(`pedidos`,e,{section:`pedidos`,ok:`Pedido borrado.`})),!0}let d=e.target.closest(`[data-coord-pedido-ficha]`);if(d){let e=zu(yl(),d.dataset.coordPedidoFicha);return e&&(Yl.alta=Au(e),Nc(`alta`,`Formulario completado con el pedido de ${Cl(e)||`la web`}. Revisalo y guardalo.`),Lu(`alta`,`coord-alta`,`#coord-alta-nombre`)),!0}if(e.target.closest(`[data-coord-alta-save]`)){let t=eu(e.target.closest(`[data-coord-form]`));if(Ql(`alta`,t),!t.nombre?.trim())return Nc(`alta`,`Falta el nombre del perro.`,`error`),$(),el(`coord-alta`,`#coord-alta-nombre`),!0;let n=t.nombre.trim(),r={...t,nombre:n,dias:Array.isArray(t.dias)?t.dias:[],primerPaseo:`Individual`};return Al(`alta-save`,async()=>{await Ol(`fichas`,{fecha:pt(),perroNombre:n,datos:r,categoria:`SIN EVALUAR`,estado:`lista`},{section:`alta`,ok:`Ficha de ${n} guardada. Arranca SIN EVALUAR y con primer paseo individual.`})&&($l(`alta`),el(`coord-alta`))}),!0}if(e.target.closest(`[data-coord-alta-clear]`))return $l(`alta`),Nc(`alta`,`Formulario vacío.`),$(),!0;let f=e.target.closest(`[data-coord-alta-copy]`);if(f){let e=zu(bl(),f.dataset.coordAltaCopy);return e&&Ru(Ou(e)),Nc(`alta`,`Ficha copiada. Pegala en el registro maestro.`),$(),!0}let p=e.target.closest(`[data-coord-alta-delete]`);if(p){let e=zu(bl(),p.dataset.coordAltaDelete);return e&&Al(`ficha-${e.id}`,()=>kl(`fichas`,e,{section:`alta`,ok:`Ficha borrada.`})),!0}if(e.target.closest(`[data-coord-pago-save]`)){let t=eu(e.target.closest(`[data-coord-form]`));Ql(`pago`,t);let n=String(t.monto||``).replace(/[^\d]/g,``),r=Hc(t.fecha||Uc()),i=!t.perro||t.perro===`Elegí un perro`?[`Elegí el perro.`,`#coord-pago-perro`]:n?r?null:[`La fecha no es válida. Usá DD/MM/AAAA.`,`#coord-pago-fecha`]:[`Falta el monto del comprobante.`,`#coord-pago-monto`];return i?(Nc(`pagos`,i[0],`error`),$(),el(`coord-pagos`,i[1]),!0):(Al(`pago-save`,async()=>{await Ol(`pagos`,{fecha:r,concepto:`Pago de ${t.perro}`,perroNombre:t.perro,monto:Number(n),medio:t.medio||`Transferencia`,comprobante:t.comprobante||``,nota:t.nota?.trim()||``,pasadoAlLibro:!1},{section:`pagos`,ok:`Pago de ${t.perro} anotado. Acordate de pasarlo al Libro contable.`})&&$l(`pago`)}),!0)}let m=e.target.closest(`[data-coord-pago-libro]`);if(m){let e=zu(xl(),m.dataset.coordPagoLibro);if(!e)return!0;let t=!e.pasadoAlLibro;return Al(`pago-${e.id}`,()=>Ol(`pagos`,{id:e.id,pasadoAlLibro:t},{section:`pagos`,ok:t?`Marcado como pasado al Libro contable.`:`Marcado como pendiente de pasar al Libro.`})),!0}let h=e.target.closest(`[data-coord-pago-delete]`);if(h){let e=zu(xl(),h.dataset.coordPagoDelete);return e&&Al(`pago-${e.id}`,()=>kl(`pagos`,e,{section:`pagos`,ok:`Registro borrado.`})),!0}return!1}function Vu(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;let n=t.closest(`[data-coord-file]`);if(n){let e=n.dataset.coordFile,t=n.files?.[0],r=n.closest(`[data-coord-form]`),i=r?eu(r):Zl(e);t&&(i[n.dataset.coordFileField]=t.name),Ql(e,i);let a=n.parentElement.querySelector(`[data-coord-file-name]`);return a&&t&&(a.textContent=t.name),!0}let r=t.closest(`[data-coord-form]`);return r?(Ql(r.dataset.coordForm,eu(r)),!0):!1}function Hu(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`.coord-btn.is-primary`)?.click())}function Uu(){_e.push(Bu),ve.push(Vu),document.addEventListener(`submit`,Hu)}var Wu=`paseosJuanAdmin_prioridadesHechas`,Gu=`paseosJuanAdmin_seccionesAbiertas`,Ku=`America/Argentina/Buenos_Aires`,qu=[`Pequeño`,`Mediano`,`Grande`],Ju=x.manana.label,Yu=x.tarde.label,Xu=[`paseos`,`incidentes`,`checklists`,`pedidos`,`rutas`,`plantillas`,`avisos`],Zu=[`pagos`,`clientes`],Qu=10,$u=[`Efectivo`,`Transferencia`,`Naranja X`],ed=`Libro contable del Sistema de Gestión`,td=``,K={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,adminLoaded:!1,adminError:``,pagosMes:null,lateSignature:``,msgs:{users:null,live:null,pagos:null}},nd=()=>({fecha:pt(),concepto:``,monto:``,medio:``,pasadoAlLibro:!1}),q={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{},pago:nd()};function J(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Y(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function X(e,t,n){return`${e} ${e===1?t:n}`}var rd={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function id(e){let t=S.filter(t=>e.includes(t)),n=t.map(e=>S.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${rd[t[0]]} a ${rd[t[t.length-1]]}`:t.map(e=>rd[e]).join(`, `)}function ad(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:Ku,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:S.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function od(){return ae(Wu)}function sd(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function cd(){return new Set(ae(Gu))}function ld(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Ku,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function ud(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Ku,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function dd(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function fd(){return _.user()||{usuario:``,nombre:``,rol:`admin`}}function pd(e){return String(e||``).trim().split(/\s+/)[0]||``}function md(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function hd(e,t){return[`pedidos`,`plantillas`,`avisos`,...Zu].includes(e)?{}:{desde:t}}function gd(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function _d(e){return e.hora||ld(e.creadoEn)}function vd(e=new Date){let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:Ku,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),n=e=>Number(t.find(t=>t.type===e)?.value||0);return n(`hour`)%24*60+n(`minute`)}function yd(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}var bd=810;function xd(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``)}function Sd(e,t){let n=v.cached(`rutas`,hd(`rutas`,e)).filter(t=>t.fecha===e),r=v.cached(`plantillas`,hd(`plantillas`,e)).filter(e=>xd(e.dia)===xd(t)),i=!r.length,a=i?$t().filter(e=>xd(e.dia)===xd(t)):r,o=new Map;a.forEach(e=>o.set(e.ruta||e.id,{...e,fuente:i?`planilla`:`plantilla`})),n.forEach(e=>o.set(e.ruta||String(e.id).slice(11),{...e,fuente:`dia`}));let s=e=>(e.paradas||[]).map(e=>e.hora||`99:99`).sort()[0]||`99:99`,c=[...o.values()].sort((e,t)=>s(e).localeCompare(s(t))||String(e.ruta).localeCompare(String(t.ruta)));return{list:c,fromSheet:c.some(e=>e.fuente===`planilla`)}}function Cd(e,t,n){let r=(e,t)=>e.perroId&&t.perroId?e.perroId===t.perroId:xd(e.perroNombre)&&xd(e.perroNombre)===xd(t.perroNombre),i=t=>e.reduce((e,n)=>e+(n.paradas||[]).filter(e=>r(t,e)).length,0);return e.map(e=>{let a=gd({turno:e.turno}),o=(e.paradas||[]).map(e=>{let o=t.filter(t=>r(e,t)),s=o.find(e=>gd(e)===a)||(o.length===1&&i(e)===1?o[0]:null),c=s?.estado||`pendiente`,l=yd(e.hora),u=`a-tiempo`;return c===`entregado`?u=`entregado`:c===`no-sale`?u=`no-sale`:c===`pendiente`&&l!==null&&n>l+Qu&&(u=`atrasado`),{...e,paseo:s,estado:c,status:u,prevista:l,atraso:u===`atrasado`?n-l:0}}),s=e=>o.filter(t=>t.status===e).length;return{route:e,shift:a,stops:o,aTiempo:s(`a-tiempo`),atrasados:s(`atrasado`),entregados:s(`entregado`),noSale:s(`no-sale`)}})}function wd(e){return v.cached(`avisos`,hd(`avisos`,e)).filter(t=>{let n=t.fecha||String(t.creadoEn||``).slice(0,10),r=t.vigenteHasta||n;return n&&n<=e&&r>=e}).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``)))}function Td(){let e=pt(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=v.cached(`paseos`,hd(`paseos`,e)).filter(t),i=v.cached(`incidentes`,hd(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),a=v.cached(`checklists`,hd(`checklists`,e)).filter(t).sort(n),o=v.cached(`pedidos`,hd(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),s=[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>gd(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}}),c=vd(),l=Sd(e,ad().dayName),u=Cd(l.list,r,c),d=u.flatMap(e=>e.stops.filter(e=>e.status===`atrasado`).map(t=>({...t,route:e.route})));return{hoy:e,paseos:r,incidentes:i,checklists:a,pedidosNuevos:o,shifts:s,nowMin:c,effective:l,compliance:u,late:d,lateNow:d.filter(e=>e.prevista<bd==c<bd),avisos:wd(e)}}function Ed(e){return e.late.map(e=>`${e.route.ruta}:${e.perroId||e.perroNombre}`).join(`|`)}function Dd(){let e=pt();K.adminLoaded||(K.adminLoaded=!0,Od().finally(()=>{Zu.forEach(t=>v.watch(t,hd(t,e)))})),K.liveDay!==e&&(K.liveDay=e,kd(!1).finally(()=>{Xu.forEach(t=>v.watch(t,hd(t,e)))}))}async function Od(){let e=pt(),t=await Promise.allSettled(Zu.map(t=>v.list(t,hd(t,e)))),n=[...new Set(t.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],r=K.adminError;K.adminError=n.join(` `),K.adminError&&Z(`pagos`,`No se pudieron traer pagos o clientes: ${K.adminError}`,!0),r!==K.adminError&&Q()}async function kd(e){let t=pt(),n=await Promise.allSettled(Xu.map(e=>v.list(e,hd(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=K.liveError;K.liveError=r.join(` `),K.liveError?Z(`live`,`No se pudieron actualizar los datos del día: ${K.liveError}`,!0):e?Z(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Z(`live`,`Datos del día actualizados.`),(e||i!==K.liveError)&&Q()}var Ad={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},jd={admin:`todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.`,coordinador:`arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.`,supervisor:`controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.`,paseador:`hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.`,ayudante:`acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.`,marketing:`pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.`};function Md(e){let t=(nt[e]||[]).filter(e=>Ad[e]).map(t=>e===`ayudante`&&t===`paseador`?`Paseador (modo ayudante)`:Ad[t]);return`${t.length?`Paneles: ${Y(t)}.`:`Todavía no tiene panel.`} Qué hace: ${jd[e]||`Pendiente de confirmar`}`}function Nd(){return K.usersLoading=!0,at.list().then(e=>{K.users=e,K.usersError=``}).catch(e=>{K.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,K.usersError,!0)}).finally(()=>{K.usersLoading=!1,Q()})}function Pd(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function Fd(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function Id(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!Fd(e))return e}}function Ld(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){K.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function Rd(e){let t=K.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?J(t.text):``}</p>`}function zd(){Object.entries(K.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function Q(){if(!md()||_.user()?.rol!==`admin`)return;let e=document.activeElement,t=e?.id,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.getElementById(t);if(r&&(r.focus({preventScroll:!0}),n))try{r.setSelectionRange(...n)}catch{}}function Bd(){return C.filter(e=>e.status===`Activo`&&e.days.length>0)}function Vd(){let e=Bd(),t=S.map(t=>{let n=e.filter(e=>Gt(e,t,Ju)).length,r=e.filter(e=>Gt(e,t,Yu)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function Hd(){let e=Bd(),t=new Map(C.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return C.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[Ju,Yu].forEach(e=>{let t=S.filter(t=>Gt(o,t,e)&&Gt(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Ud(){return Bd().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function Wd(){return C.filter(e=>e.review||e.status!==`Activo`)}function Gd(e){return e===Ju?x.manana.route:x.tarde.routes.join(` o `)}function Kd(e=Td()){let{conflicts:t}=Hd(),n=C.filter(e=>e.status!==`Activo`),r=Wd(),i=Ud().filter(e=>e.category===`SIN EVALUAR`),a=Bd(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${Y(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${_d(n)?` a las ${_d(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${Y(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(e.lateNow.length){let t=e.lateNow.length,n=e.nowMin<bd?`mañana`:`tarde`,r=e.lateNow.slice().sort((e,t)=>t.atraso-e.atraso),i=r[0],a=r.slice(0,3).map(e=>`${e.perroNombre} (${e.hora}, ${e.route.ruta})`),o=[...new Set(r.map(e=>e.route.ruta))],c=i.route.supervisor||ef(i.route.paseador)||`el supervisor del turno`;e.paseos.length?s.push({id:`atrasos-${e.hoy}-${n}-${t}`,tag:`Atrasos`,tone:`warning`,title:`${X(t,`perro atrasado`,`perros atrasados`)} en el turno ${n}`,detail:`${Y(a)}${t>3?` y ${X(t-3,`más`,`más`)}`:``}. Pasaron más de ${Qu} minutos de la hora prevista y nadie marcó el retiro.`,action:`Preguntale a ${c} qué pasa con ${i.perroNombre} (retiro previsto ${i.hora}, ruta ${o.join(` y `)}).`,target:`adm-cumplimiento`,targetLabel:t===1?`Ver el atraso`:`Ver los atrasos`}):s.push({id:`atrasos-sin-marcas-${e.hoy}-${n}`,tag:`Atrasos`,tone:`warning`,title:`Nadie marcó retiros hoy: ${X(t,`perro figura`,`perros figuran`)} pasados de hora en el turno ${n}`,detail:`Según la ruta de hoy, ${Y(a)}${t>3?` y ${X(t-3,`más`,`más`)}`:``} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,action:`Preguntale a ${c} si el equipo está marcando los retiros en la página del paseador.`,target:`adm-cumplimiento`,targetLabel:`Ver el cumplimiento`})}if(e.pedidosNuevos.length){let t=e.pedidosNuevos.length,n=e=>e.titulo||e.tipo||`Pedido sin título`,r=e.pedidosNuevos.slice(0,3).map(n),i=n(e.pedidosNuevos[t-1]);s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}`,tag:`Pedidos`,tone:`info`,title:`${X(t,`pedido nuevo`,`pedidos nuevos`)} sin responder`,detail:`${Y(r)}${t>3?` y ${X(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.`,action:t===1?`Respondé el pedido “${i}”.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${i}”.`,target:`adm-vivo`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(Gd).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${Y(r)}. Hay ${X(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${Y(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${X(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${Y(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${Y(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${Y(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${Y(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function qd(){let e=Bd(),t=[],n=[];e.forEach(e=>{let r=Rt.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=Rt.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function Jd(e){return`
    <div class="adm-shell">
      ${Yd()}
      ${e}
    </div>
  `}function Yd(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${g(`lock`,`adm-icon-sm`)} ${J(fd().nombre)} · ${J(rt[fd().rol]||fd().rol)}</span>
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
  `}function Xd(){Dd(),K.users===null&&!K.usersLoading&&!K.usersError&&Nd();let e=Td();K.lateSignature=Ed(e);let t=Kd(e),n=od(),r=cd();return setTimeout(zd,60),`
    <main class="adm-page" id="adm-main">
      ${Zd(t,n,e)}
      ${pf(e)}
      ${xf()}
      ${bf()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${g(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${g(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${Cf(r)}
        ${wf(r)}
        ${Rf(r)}
        ${Ff(r)}
        ${Ef(r)}
        ${kf(r)}
        ${Af(r)}
        ${zf(r)}
      </div>
      ${Bf()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function Zd(e,t,n){let{dayName:r,date:i}=ad(),a=Bd(),o=a.filter(e=>Gt(e,r,Ju)).length,s=a.filter(e=>Gt(e,r,Yu)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${X(o,`perro`,`perros`)} a la mañana y ${X(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=pd(fd().nombre);return`
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
  `}var Qd={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function $d(e){let{dayName:t}=ad();return Bd().filter(n=>Gt(n,t,e)).length}function ef(e){return K.users?.find(t=>t.usuario===e)?.nombre||e||``}function tf(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=ld(e.actualizadoEn);return`Actualizado por ${ef(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||ef(e.creadoPor),r=ld(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function nf(e){let t={manana:{title:`Turno mañana`,hours:`${x.manana.from} a ${x.manana.to}`,planned:$d(Ju)},tarde:{title:`Turno tarde`,hours:`${x.tarde.from} a ${x.tarde.to}`,planned:$d(Yu)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
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
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=Qd[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${J(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${J(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${J(tf(e))}${e.nota?` · Nota: ${J(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function rf(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${g(`alertTriangle`,`adm-icon-sm`)} ${X(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${J(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${_d(e)?`<span class="adm-muted">${J(_d(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${J(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${J(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${tf(e,!0)?`<p class="adm-note">${J(tf(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function af(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}var of={"a-tiempo":{label:`A tiempo`,tone:`ok`},atrasado:{label:`Atrasado`,tone:`danger`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}},sf={dia:`Cambio del día`,plantilla:`Plantilla semanal`,planilla:`Planilla BASE RUTAS`};function cf(e){let t=Qd[e.estado]||{label:e.estado},n=[`Retiro previsto ${e.hora||`pendiente de confirmar`}`];return e.status===`atrasado`?n.push(`${e.atraso} min de atraso`):e.paseo&&n.push(t.label),e.paseo?.horaRetiro&&n.push(`retirado ${e.paseo.horaRetiro}`),e.paseo?.horaEntrega&&n.push(`entregado ${e.paseo.horaEntrega}`),n.join(` · `)}function lf(e){let{route:t,stops:n}=e,r=n.length-e.noSale,i=`ruta-${t.ruta}`,a=[t.paseador?`Paseador: ${ef(t.paseador)}`:`Paseador: sin asignar`,t.ayudante?`Ayudante: ${ef(t.ayudante)}`:``,t.supervisor?`Supervisa: ${t.supervisor}`:``].filter(Boolean).join(` · `),o=n.filter(e=>e.status===`atrasado`).sort((e,t)=>t.atraso-e.atraso);return`
    <article class="adm-shift adm-route ${o.length?`has-late`:``}" aria-labelledby="adm-route-${J(t.ruta)}">
      <h4 id="adm-route-${J(t.ruta)}">${J(t.ruta||`Ruta sin código`)} <span class="adm-th-sub">${J(t.turno||`Turno sin indicar`)} · ${J(sf[t.fuente]||``)}</span></h4>
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
            ${n.map(e=>{let t=of[e.status];return e.status===`a-tiempo`&&(t=e.estado===`pendiente`?{label:`Por retirar · a tiempo`,tone:`neutral`}:{label:`${(Qd[e.estado]||{label:e.estado}).label} · a tiempo`,tone:`info`}),`
                <li>
                  <span class="adm-dog-name">${J(e.hora||`--:--`)} · ${J(e.perroNombre||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${J(t.label)}${e.paseo?.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${J(cf(e))}${e.nota?` · Nota: ${J(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ol>
        </details>
      `:`<p class="adm-empty">Esta ruta no tiene paradas cargadas.</p>`}
    </article>
  `}function uf(e){let{compliance:t,effective:n,late:r}=e;return`
    <div class="adm-compliance" id="adm-cumplimiento" tabindex="-1" role="region" aria-labelledby="adm-compliance-title">
      <h3 id="adm-compliance-title">${g(`route`,`adm-icon-sm`)} Cumplimiento por ruta ${r.length?`<span class="adm-count adm-count--danger">${X(r.length,`atrasado`,`atrasados`)}</span>`:``}</h3>
      <p class="adm-note">Atrasado = pasaron más de ${Qu} minutos de la hora prevista y nadie marcó el retiro. Hora de Argentina.</p>
      ${n.fromSheet?`
        <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${y.toLowerCase()}.</span></p>
      `:``}
      ${t.length?`
        <div class="adm-live-grid">${t.map(lf).join(``)}</div>
      `:`<p class="adm-empty">Hoy no hay rutas: ni cambios del día, ni plantilla, ni paseos en la planilla.</p>`}
    </div>
  `}var df={"perro suelto":`danger`,seguridad:`danger`,"obra o corte":`warning`,clima:`info`,"cambio de horario":`info`};function ff(e){let{avisos:t}=e;return`
    <div class="adm-avisos" id="adm-avisos" role="region" aria-labelledby="adm-avisos-title">
      <h3 id="adm-avisos-title">${g(`mapPin`,`adm-icon-sm`)} Avisos por barrio vigentes <span class="adm-count">${t.length}</span></h3>
      ${t.length?`
        <ul class="adm-aviso-list">
          ${t.map(e=>`
            <li class="adm-aviso">
              <div class="adm-aviso-head">
                <strong>${J(e.barrio||`Barrio sin indicar`)}</strong>
                <span class="adm-pill adm-pill--${df[e.tipo]||`neutral`}">${J(e.tipo||`otro`)}</span>
                <span class="adm-muted">${e.vigenteHasta?`Hasta el ${J(dd(e.vigenteHasta))}`:`Solo hoy`}</span>
              </div>
              <p>${J(e.mensaje||e.titulo||``)}</p>
              ${tf(e,!0)?`<p class="adm-note">${J(tf(e,!0))}.</p>`:``}
            </li>
          `).join(``)}
        </ul>
      `:`<p class="adm-empty">No hay avisos vigentes por barrio.</p>`}
    </div>
  `}function pf(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${J(dd(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó.</p>`:``}
      ${Rd(`live`)}

      ${e.incidentes.length?rf(e.incidentes):`
        <p class="adm-live-ok">${g(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      ${uf(e)}
      ${ff(e)}

      <div class="adm-live-grid">
        ${e.shifts.map(nf).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=af(e);return`
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
                  <span class="adm-dog-meta">${J(dd(e.fecha)||ud(e.creadoEn))} · ${e.origen===`web`?`Formulario web`:J(e.creadoPorNombre||`Cargado en la app`)}</span>
                </li>
              `).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${X(r.length-6,`pedido más`,`pedidos más`)}.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos.</p>`}
        </article>
      </div>
    </section>
  `}function mf(e){return Object.entries(rt).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function hf(){let e=K.credential;if(!e)return``;let t=Ld(e);return`
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
  `}function gf(){let e=q.crear;return`
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
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${mf(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${J(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${J(rt[e.rol]||e.rol)}:</strong> ${J(Md(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${g(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function _f(e){let t=!e.activo;return`
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
  `}function vf(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${J(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${J(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function yf(e,t){let n=e.usuario===t,r=q.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${ud(e.ultimoIngreso)} ${ld(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${ud(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
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
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${J(e.usuario)}">${mf(r)}</select>
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
      ${!n&&K.resetFor===e.usuario?_f(e):``}
      ${!n&&K.confirmOff===e.usuario?vf(e):``}
    </li>
  `}function bf(){let e=fd().usuario,t=(K.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=K.users===null&&K.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:K.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>yf(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${K.users?`${X(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${hf()}

      <div class="adm-form-actions">
        <button class="adm-button ${K.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${K.showCreate}" aria-controls="adm-create">
          ${g(K.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${K.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${K.showCreate?gf():``}
      ${Rd(`users`)}
      ${r}

      <h3 class="adm-subtitle">Qué puede ver cada rol</h3>
      <ul class="adm-role-help">
        ${Object.keys(rt).map(e=>`<li><strong>${rt[e]}:</strong> ${J(Md(e))}</li>`).join(``)}
      </ul>
    </section>
  `}function xf(){let{conflicts:e,missing:t,notRouted:n}=Hd(),r=Ud();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${g(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${Ft}).</p>
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
                  <td>${J(e.shift)} · ${J(Gd(e.shift))}</td>
                  <td>${J(id(e.days))}</td>
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
            <span class="adm-safety-meta">${J(e.shifts.join(` y `))} · ${J(id(e.days))}</span>
            <span class="adm-safety-notes">${e.safety.map(e=>`<span class="adm-pill adm-pill--danger">${J(e)}</span>`).join(``)}</span>
          </li>
        `).join(``)}
      </ul>

      ${t.length||n.length?`
        <ul class="adm-footnotes">
          ${t.map(e=>`<li>${J(e.dog)} figura “no juntar con ${J(e.other)}”, pero ${J(e.other)} no está en el registro: ${y}.</li>`).join(``)}
          ${n.map(e=>`<li>${J(e.dog)} y ${J(e.other)} figuran “no juntar”. Hoy ${J(e.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join(``)}
        </ul>
      `:``}
    </section>
  `}function Sf(e,t,{title:n,summary:r,iconName:i},a){return`
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
  `}function Cf(e){let t=Wd().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return Sf(`adm-datos`,e,{title:`Datos a revisar`,summary:`${X(t.length,`perro`,`perros`)} · ${X(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${J(b.officialSources.dogs)}).</p>
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
  `)}function wf(e){let t=Vd();return Sf(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${J(t.busiest.length?Y(t.busiest):`Sin datos`)} (${X(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${Ft}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
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
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${rd[e.day]}</span>
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
  `)}function Tf(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function Ef(e){let t=Bd(),n=Vd(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${Ft}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${Ft}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...Ut,...i];return Sf(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${Tf(e.kind)}">${J(e.kind)}</span>
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
  `)}var Df={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},Of=[{role:`Admin`,who:Lt.admin,can:[`Ve y decide sobre todo el sistema`,`Usuarios, pagos e indicadores`,`Único rol que ve y carga pagos`]},{role:`Coordinador`,who:`${Lt.coordinador} (${y.toLowerCase()})`,can:[`Armar rutas y horarios (plantilla semanal y cambios del día)`,`Gestionar los clientes de los paseos`,`Atender pedidos y cargar fichas`,`Avisar lo que pasa en cada barrio`,`No ve plata`]},{role:`Supervisor`,who:Lt.supervisor,can:[`Controlar los paseos del momento`,`Quién falta retirar y atrasos contra el horario`,`Entregas, incidentes y equipo`,`Ve las rutas, no las arma`]},{role:`Paseador`,who:Lt.paseador,can:[`Hacer su ruta del turno, en orden y con horario`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`]},{role:`Ayudante de paseador`,who:y,can:[`Acompañar al paseador en su ruta`,`Marcar pasos`,`Reportar incidentes`,`Sin datos de clientes`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function kf(e){return Sf(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${X(It.length,`persona`,`personas`)} · ${Of.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${It.map(e=>{let t=Df[e.role];return`
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${J(e.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${J(e.label)}</span>
            </div>
            <p>${J(e.tasks)}</p>
            <p class="adm-person-panel">Panel: ${t?`<a href="${t.path}" data-link>${t.panel}</a>`:`<span class="adm-pending">${y}</span>`}</p>
          </li>
        `}).join(``)}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${Of.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${J(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${J(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function Af(e){return Sf(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${Rt.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${qu.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${Rt.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${qu.map(t=>`<td>${w(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${qu.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${qu.map(e=>`<td>${w(zt[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${qu.map(e=>`<td>${w(zt[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Bt.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${y.toLowerCase()}.</p>
  `)}function jf(e){let[t,n]=String(e).split(`-`).map(Number);if(!t||!n)return e;let r=new Intl.DateTimeFormat(`es-AR`,{month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(Date.UTC(t,n-1,15)));return r.charAt(0).toUpperCase()+r.slice(1)}function Mf(e){let t=String(e||``).replace(/[$\s]/g,``);return t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):/^\d{1,3}(\.\d{3})+$/.test(t)&&(t=t.replace(/\./g,``)),/^\d+(\.\d+)?$/.test(t)?Number(t):NaN}function Nf(){let e=v.cached(`pagos`,hd(`pagos`)).slice().sort((e,t)=>String(t.fecha||``).localeCompare(String(e.fecha||``))||String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),t=pt().slice(0,7),n=[...new Set([t,...e.map(e=>String(e.fecha||``).slice(0,7)).filter(e=>/^\d{4}-\d{2}$/.test(e))])].sort().reverse(),r=K.pagosMes&&(K.pagosMes===`todos`||n.includes(K.pagosMes))?K.pagosMes:t,i=r===`todos`?e:e.filter(e=>String(e.fecha||``).startsWith(r)),a=e.filter(e=>!e.pasadoAlLibro),o=i.reduce((e,t)=>e+(Number(t.monto)||0),0),s=e.filter(e=>{let t=K.users?.find(t=>t.usuario===e.creadoPor)?.rol;return t&&t!==`admin`});return{all:e,months:n,mes:r,filtered:i,faltan:a,faltanMes:i.filter(e=>!e.pasadoAlLibro),total:o,deOtros:s}}function Pf(e){let t=K.users?.find(t=>t.usuario===e.creadoPor),n=t&&t.rol!==`admin`,r=Number(e.monto),i=e.monto!==``&&e.monto!==null&&e.monto!==void 0&&Number.isFinite(r);return`
    <li class="adm-pago ${e.pasadoAlLibro?``:`is-missing`}">
      <div class="adm-pago-main">
        <span class="adm-pago-date">${J(dd(e.fecha)||ud(e.creadoEn)||`Pendiente de confirmar`)}</span>
        <strong class="adm-pago-concept">${J(e.concepto||`Sin concepto`)}</strong>
        <span class="adm-pago-amount">${i?J(w(r)):y}</span>
      </div>
      <div class="adm-pago-meta">
        <span class="adm-pill adm-pill--neutral">${J(e.medio||`Medio sin indicar`)}</span>
        <span class="adm-pill ${e.pasadoAlLibro?`adm-pill--ok`:`adm-pill--warning`}">${e.pasadoAlLibro?`Pasado al Libro`:`Falta pasar al Libro`}</span>
        ${e.pendiente?`<span class="adm-pill adm-pill--info">Se enviará cuando haya señal</span>`:``}
        ${n?`<span class="adm-pill adm-pill--info">Lo cargó ${J(rt[t.rol]||t.rol)} antes del cambio</span>`:``}
      </div>
      ${tf(e,!0)?`<p class="adm-note">${J(tf(e,!0))}.</p>`:``}
      <button class="adm-link-button" type="button" data-adm-pago-libro="${J(e.id)}" aria-pressed="${e.pasadoAlLibro?`true`:`false`}">
        ${e.pasadoAlLibro?`Desmarcar “pasado al Libro”`:`Marcar como pasado al Libro`}
      </button>
    </li>
  `}function Ff(e){let t=Nf(),n=q.pago,r=t.filtered.slice(0,20),i=t.mes===`todos`?`todos los meses`:jf(t.mes).toLowerCase();return Sf(`adm-pagos`,e,{title:`Pagos · registro de apoyo`,summary:t.faltan.length?`${X(t.faltan.length,`pago falta`,`pagos faltan`)} pasar al Libro contable`:`Nada pendiente de pasar al Libro contable`,iconName:`receipt`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: ${ed}</strong>
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
          <datalist id="adm-pago-medios">${$u.map(e=>`<option value="${J(e)}"></option>`).join(``)}</datalist>
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
    ${Rd(`pagos`)}

    <div class="adm-pagos-head">
      <label class="adm-field adm-field--inline" for="adm-pagos-mes">
        <span>Mes</span>
        <select class="adm-input adm-input--sm" id="adm-pagos-mes" data-adm-pagos-mes>
          ${t.months.map(e=>`<option value="${e}" ${e===t.mes?`selected`:``}>${J(jf(e))}</option>`).join(``)}
          <option value="todos" ${t.mes===`todos`?`selected`:``}>Todos los meses</option>
        </select>
      </label>
      <p class="adm-pagos-summary">
        <strong>${X(t.filtered.length,`pago`,`pagos`)}</strong> en ${J(i)} · suma ${J(w(t.total))} ·
        <strong class="${t.faltanMes.length?`adm-text-warning`:``}" data-adm-pagos-faltan>${t.faltanMes.length} sin pasar al Libro</strong>${t.mes!==`todos`&&t.faltan.length!==t.faltanMes.length?` (${t.faltan.length} contando todos los meses)`:``}
      </p>
    </div>
    ${t.deOtros.length?`<p class="adm-note">${t.deOtros.length===1?`1 pago lo cargó`:`${t.deOtros.length} pagos los cargó`} otro rol antes del cambio de roles (el coordinador ya no ve plata). Se ven acá con la marca “antes del cambio”.</p>`:``}
    ${r.length?`
      <ul class="adm-pago-list" aria-label="Pagos de ${J(i)}">${r.map(Pf).join(``)}</ul>
      ${t.filtered.length>r.length?`<p class="adm-note">Se muestran los últimos ${r.length}. Hay ${X(t.filtered.length-r.length,`pago más`,`pagos más`)} en ${J(i)}.</p>`:``}
    `:`<p class="adm-empty">No hay pagos cargados en ${J(i)}.</p>`}
    <p class="adm-note">La suma es solo de este registro de apoyo: no reemplaza al Libro contable.</p>
  `)}var If=[[`activo`,`Activos`],[`pausa`,`En pausa`],[`baja`,`Baja`]];function Lf(){let e=v.cached(`clientes`,hd(`clientes`)),t=new Map;e.forEach(e=>{let n=String(e.barrio||``).trim()||`Sin barrio`;t.has(n)||t.set(n,{barrio:n,activo:0,pausa:0,baja:0,otro:0});let r=t.get(n),i=String(e.estado||``).toLowerCase();If.some(([e])=>e===i)?r[i]+=1:r.otro+=1});let n=[...t.values()].sort((e,t)=>t.activo-e.activo||e.barrio.localeCompare(t.barrio)),r={activo:0,pausa:0,baja:0,otro:0};return n.forEach(e=>Object.keys(r).forEach(t=>{r[t]+=e[t]})),{total:e.length,rows:n,totals:r}}function Rf(e){let t=Lf(),n=t.totals.otro>0;return Sf(`adm-clientes`,e,{title:`Clientes por barrio`,summary:t.total?`${X(t.totals.activo,`activo`,`activos`)} · ${t.totals.pausa} en pausa · ${t.totals.baja} de baja`:`Todavía no hay clientes cargados en la app`,iconName:`mapPin`},`
    <p class="adm-lead">Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>
    ${t.total?`
      <div class="adm-table-wrap">
        <table class="adm-table adm-clients">
          <caption class="adm-sr-only">Clientes por barrio y estado</caption>
          <thead>
            <tr><th scope="col">Barrio</th>${If.map(([,e])=>`<th scope="col">${e}</th>`).join(``)}${n?`<th scope="col">Sin estado</th>`:``}</tr>
          </thead>
          <tbody>
            ${t.rows.map(e=>`
              <tr><th scope="row">${J(e.barrio)}</th>${If.map(([t])=>`<td>${e[t]}</td>`).join(``)}${n?`<td>${e.otro}</td>`:``}</tr>
            `).join(``)}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total</th>${If.map(([e])=>`<td>${t.totals[e]}</td>`).join(``)}${n?`<td>${t.totals.otro}</td>`:``}</tr>
          </tfoot>
        </table>
      </div>
    `:`<p class="adm-empty">El coordinador todavía no cargó clientes en la app.</p>`}
  `)}function zf(e){let t=qd();return Sf(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${J(b.officialSources.money)}. Esta sección no muestra montos cobrados: los pagos que anotes de apoyo están en <a class="adm-inline-link" href="#adm-pagos" data-adm-goto="adm-pagos">Pagos</a>.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${w(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${X(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${w(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${w(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${X(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${y.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${J(e)}: ${Y(t.excluded.filter(t=>t.plan===e).map(e=>J(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function Bf(){let e=b.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${Ft}.</strong> Perros: ${J(e.dogs)}. Rutas: ${J(e.routes)}. Plata: ${J(e.money)}.</p>
      <p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${ed}.</p>
    </footer>
  `}function Vf(){let{dayName:e,date:t}=ad(),n=Td(),r=Kd(n),i=od(),a=r.find(e=>!i.includes(e.id)),o=Vd(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,`Perros atrasados (más de ${Qu} min sin retiro): ${n.late.length}. Avisos por barrio vigentes: ${n.avisos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${Y(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${Ft}.`].join(`
`)}async function Hf(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function Uf(e){td=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=td)},60)}function Wf(){sd(Gu,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function Gf(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,Wf());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function Kf(e){return e.target.closest(`[data-admin-logout]`)?(K.credential=null,K.users=null,K.usersError=``,K.liveDay=null,K.adminLoaded=!1,K.pagosMes=null,q.pago=nd(),op(`/salir`),!0):!1}function qf(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function Jf(e,t){K.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function Yf(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),K.busy))return;let n=t.dataset.admForm;if(n===`pago`)await Xf(t);else if(n===`crear`){let e=q.crear,n=e.nombre.trim(),r=Pd(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?K.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:rt[e.rol]?Fd(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Z(`users`,a,!0),Q();return}Jf(t,!0);try{let t=await at.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});K.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},q.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},K.showCreate=!1,Z(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),K.busy=!1,await Nd(),qf(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),K.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=K.users?.find(t=>t.usuario===e),r=q.reset.pin.trim(),i=n?Fd(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}Jf(t,!0);try{let t=!n.activo;await at.save({usuario:e,pin:r,...t?{activo:!0}:{}}),K.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},K.resetFor=null,q.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),K.busy=!1,await Nd(),qf(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),K.busy=!1,Q()}}}async function Xf(e){let t=q.pago,n=t.concepto.trim(),r=t.medio.trim(),i=Mf(t.monto),a=``;if(/^\d{4}-\d{2}-\d{2}$/.test(t.fecha)?n.length<2?a=`Escribí el concepto (por ejemplo, el plan y la semana).`:(!Number.isFinite(i)||i<=0)&&(a=`Escribí el monto en pesos, solo números (por ejemplo 35000).`):a=`Elegí la fecha del pago.`,a)Z(`pagos`,a,!0),Q();else{Jf(e,!0);try{let e=await v.save(`pagos`,{fecha:t.fecha,concepto:n,monto:i,medio:r,pasadoAlLibro:t.pasadoAlLibro===!0});q.pago=nd(),K.pagosMes=t.fecha.slice(0,7),Z(`pagos`,e.pendiente?`Se enviará cuando haya señal. Queda anotado en este dispositivo.`:`Listo: pago de ${w(i)} guardado${t.pasadoAlLibro?``:`. Acordate de pasarlo al Libro contable`}.`)}catch(e){Z(`pagos`,e.message||`No se pudo guardar el pago.`,!0)}finally{K.busy=!1,Q()}}}async function Zf(e){let t=v.cached(`pagos`,hd(`pagos`)).find(t=>t.id===e);if(!t||K.busy)return;K.busy=!0;let n=!t.pasadoAlLibro;try{let r=await v.save(`pagos`,{id:e,fecha:t.fecha,pasadoAlLibro:n}),i=`${t.concepto||`El pago`}${t.fecha?` del ${dd(t.fecha)}`:``}`;Z(`pagos`,r.pendiente?`Se enviará cuando haya señal.`:n?`Listo: ${i} quedó como pasado al Libro.`:`Listo: ${i} quedó como pendiente de pasar al Libro.`)}catch(e){Z(`pagos`,e.message||`No se pudo cambiar la marca.`,!0)}finally{K.busy=!1,Q(),qf(`[data-adm-pago-libro="${CSS.escape(e)}"]`)}}async function Qf(e,t,n){if(!K.busy){K.busy=!0;try{await e(),Z(`users`,t),K.busy=!1,await Nd()}catch(e){Z(`users`,e.message||n,!0),K.busy=!1,Q()}}}function $f(e){if(e.target.closest(`[data-adm-create-toggle]`))return K.showCreate=!K.showCreate,K.resetFor=null,K.confirmOff=null,$(),qf(K.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return K.usersError=``,Nd().then(()=>{K.usersError||(Z(`users`,`Lista de usuarios actualizada.`),Q())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;q[e].pin=Id();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=q[e].pin),Uf(`PIN generado: ${q[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=K.users?.find(t=>t.usuario===e);if(!t)return!0;let r=q.roles[e]||t.rol;return r===t.rol?(Z(`users`,`${t.nombre} ya tiene el rol ${rt[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Q(),!0):(Qf(async()=>{await at.save({usuario:e,rol:r}),delete q.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${rt[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return K.resetFor=K.resetFor===e?null:e,K.confirmOff=null,q.reset.pin=``,$(),K.resetFor&&qf(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=K.resetFor||``;return K.resetFor=null,q.reset.pin=``,$(),qf(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return K.confirmOff=i.dataset.admOff,K.resetFor=null,$(),qf(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=K.confirmOff||``;return K.confirmOff=null,$(),qf(`[data-adm-off="${CSS.escape(e)}"]`),Uf(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=K.users?.find(t=>t.usuario===e);return K.confirmOff=null,Qf(()=>at.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}if(e.target.closest(`[data-adm-cred-copy]`))return K.credential&&Hf(Ld(K.credential)).then(e=>{Uf(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0;if(e.target.closest(`[data-adm-cred-hide]`))return K.credential=null,$(),qf(`#adm-usuarios`),Uf(`Listo. El PIN ya no se muestra.`),!0;if(e.target.closest(`[data-adm-live-refresh]`))return kd(!0),!0;let o=e.target.closest(`[data-adm-pago-libro]`);return o?(Zf(o.dataset.admPagoLibro),!0):!1}function ep(e){let t=e.target.closest?.(`[data-adm-pagos-mes]`);if(t){e.type===`change`&&K.pagosMes!==t.value&&(K.pagosMes=t.value,Q(),Uf(`Pagos de ${t.value===`todos`?`todos los meses`:jf(t.value).toLowerCase()}.`));return}let n=e.target.closest?.(`[data-adm-draft]`);if(!n)return;let r=n.dataset.admDraft,i=n.dataset.admKey,a=n.type===`checkbox`?n.checked:n.value;if(r===`roles`?q.roles[i]=a:q[r][i]=a,r===`crear`&&i===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${J(rt[n.value]||n.value)}:</strong> ${J(Md(n.value))}`)}}function tp(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=od(),r=n.includes(e);return sd(Wu,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),Uf(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),Gf(n.dataset.admGoto),!0;if($f(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),Wf(),Uf(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(Hf(Vf()).then(e=>{Uf(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function np(e){if(e.target.matches?.(`[data-adm-section]`)&&Wf(),e.target.matches?.(`[data-adm-dogs]`)){let t=e.target.dataset.admDogs;e.target.open?K.openDogs.add(t):K.openDogs.delete(t)}}function rp(){_e.push(Kf),ye.push(tp),document.addEventListener(`toggle`,np,!0),document.addEventListener(`submit`,Yf),document.addEventListener(`input`,ep),document.addEventListener(`change`,ep),$e(e=>{(Xu.includes(e)||Zu.includes(e))&&Q()}),setInterval(()=>{if(!md()||_.user()?.rol!==`admin`||document.visibilityState!==`visible`)return;let e=Ed(Td());e!==K.lateSignature&&(K.lateSignature=e,Q())},3e4),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var ip=document.querySelector(`#app`);function ap(e){return e.replace(/\/+$/,``)||`/`}function op(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ce(),wt(),Pt(),mr(),Ta(),Ec(),Uu(),rp(),document.addEventListener(`click`,e=>{if(be(_e,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),op(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{be(ve,e)});function $(){let e=ap(window.location.pathname);if(e===`/`){ip.innerHTML=ht(),cp();return}if(e===`/login`){ip.innerHTML=Ot(),cp();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),_.clear(),ip.innerHTML=Ot(),cp();return}if(e===`/registro`||e===`/register`){ip.innerHTML=At(),cp();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(ip.innerHTML=sp(r),cp()):(ip.innerHTML=pe(),cp())}function sp(e){if(e===`cliente`)return lp(e);let t=_.user();return t?(nt[t.rol]||[]).includes(e)?lp(e):jt(e):(window.history.replaceState({},``,`/login?volver=/${e}`),Ot())}function cp(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=me()+ge(),document.body.classList.toggle(`menu-locked`,e.menuOpen),He(),Ve()}function lp(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:Xd,coordinador:du,supervisor:Hs,paseador:zi,cliente:zn}[e]();return i?Ri(o):a?Bs(o):e===`coordinador`?lu(o):e===`admin`?Jd(o):oe(`
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