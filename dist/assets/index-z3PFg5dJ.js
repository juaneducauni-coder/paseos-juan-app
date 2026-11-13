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
  `}function ze(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){Oe=!Oe,Re(),Oe?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);De={...De,[e]:n},Ae(),Ie(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else Oe&&!e.target.closest(`#a11y-root`)&&(Oe=!1,Re())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Oe&&(Oe=!1,Re(),document.querySelector(`.a11y-toggle`)?.focus())}),je.addEventListener?.(`change`,Ie),Me.addEventListener?.(`change`,Ie),Ie()}var Be={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function Ve(){Be.frame&&cancelAnimationFrame(Be.frame),Be.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Pe(),r=Ne()?[22,52,39]:[184,218,198],i=Ne()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Be.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Be.lastDraw>33&&(Be.lastDraw=e,s(e/1e3)),Be.frame=requestAnimationFrame(l)}Be.frame=requestAnimationFrame(l)}function He(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ue=`pj_sesion`,We=`pj_pendientes`,Ge=`pj_cache_`,Ke=6e4;fetch(`/api/salud`).then(e=>e.json()).then(e=>{/provisorio/i.test(e.almacenamiento||``)&&(Ke=3e5)}).catch(()=>{});var qe=new Set,Je=new Map,Ye=new Set;document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Ye.forEach(e=>e())});function Xe(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ze(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Qe(e){qe.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function $e(e){return qe.add(e),()=>qe.delete(e)}var et=class extends Error{constructor(e,t){super(t),this.status=e}};async function tt(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=_.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new et(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(_.clear(),Qe(`sesion`)),!o.ok||s.ok===!1)throw new et(o.status,s.error||`Error del servidor.`);return s}var _={token:()=>Xe(Ue,null)?.token||null,user:()=>Xe(Ue,null)?.user||null,set(e,t){Ze(Ue,{token:e,user:t}),Qe(`sesion`)},clear(){try{localStorage.removeItem(Ue),Object.keys(localStorage).filter(e=>e.startsWith(Ge)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return tt(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await tt(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return _.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await tt(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return _.set(i.token,i.user),i.user},async refresh(){let e=_.token();if(!e)return null;let t=await tt(`/api/auth/me`);return t.user&&_.token()===e&&_.set(e,t.user),t.user},async changePin(e,t){let n=await tt(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return _.set(n.token,n.user),n.user},logout(){_.clear(),Qe(`sesion`)}},nt={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],ayudante:[`paseador`],marketing:[]},rt={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,ayudante:`Ayudante de paseador`,marketing:`Marketing`};function it(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`,ayudante:`/paseador`}[e]||`/`}var at={list:async()=>(await tt(`/api/usuarios`)).usuarios,save:async e=>(await tt(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>tt(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function ot(e,t={}){return`${Ge}${e}_${t.desde||``}_${t.prefijo||``}`}function st(e,t){let n=Xe(We,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var v={cached(e,t={}){return st(e,Xe(ot(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await tt(`/api/registros?${n}`),i=localStorage.getItem(ot(e,t));return Ze(ot(e,t),r.registros),i!==JSON.stringify(r.registros)&&Qe(e),st(e,r.registros)}catch(n){if(n.status===0)return v.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=ct(n.fecha);try{let t=await tt(`/api/registros`,{method:`POST`,body:{col:e,...n}});return lt(e,t.registro),Qe(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Xe(We,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:_.user()?.usuario,at:Date.now()}),Ze(We,a),Qe(e),{...n,pendiente:!0}}},async remove(e,t){await tt(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{Ze(e,Xe(e,[]).filter(e=>e.id!==t))}),Qe(e)},pendingCount(){return Xe(We,[]).length},watch(e,t={}){let n=ot(e,t);if(Je.has(n))return Je.get(n);let r=()=>{document.visibilityState===`visible`&&_.token()&&v.list(e,t).catch(()=>{})};r(),Ye.add(r);let i=setInterval(r,Ke);setTimeout(()=>{clearInterval(i),i=setInterval(r,Ke)},3e3);let a=()=>{Ye.delete(r),clearInterval(i),Je.delete(n)};return Je.set(n,a),a}};function ct(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function lt(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Ge}${e}_`)).forEach(e=>{let n=Xe(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Ze(e,n)})}var ut=!1;async function dt(){if(ut||!_.token())return 0;let e=_.user()?.usuario,t=Xe(We,[]);if(!t.length)return 0;ut=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await tt(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});lt(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Ze(We,Xe(We,[]).filter(e=>!n.has(e.at))),ut=!1,r.forEach(e=>Qe(e))}return n.size}window.addEventListener(`online`,()=>dt()),setInterval(()=>dt(),3e4);async function ft(e){return tt(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function y(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}var pt=1600;async function mt(e){if(!/^image\/(jpeg|png|webp)$/.test(e.type))return e;try{let t=await createImageBitmap(e),n=Math.min(1,pt/Math.max(t.width,t.height));if(n===1&&e.size<921600)return e;let r=document.createElement(`canvas`);r.width=Math.round(t.width*n),r.height=Math.round(t.height*n),r.getContext(`2d`).drawImage(t,0,0,r.width,r.height);let i=await new Promise(e=>r.toBlob(e,`image/jpeg`,.82));return i?new File([i],e.name.replace(/\.\w+$/,``)+`.jpg`,{type:`image/jpeg`}):e}catch{return e}}function ht(e){return new Promise((t,n)=>{let r=new FileReader;r.onload=()=>t(String(r.result).split(`,`)[1]||``),r.onerror=()=>n(new et(400,`No se pudo leer el archivo.`)),r.readAsDataURL(e)})}async function gt(e){if(!e)throw new et(400,`Elegí un archivo.`);if(!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(e.type))throw new et(400,`Solo se aceptan fotos (JPG, PNG, WEBP) o PDF.`);let t=await mt(e);if(t.size>3670016)throw new et(413,`El archivo es muy pesado (máximo 3,5 MB).`);return{nombre:t.name,mime:t.type,base64:await ht(t)}}function _t(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function vt(){return oe(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${yt()}
      ${bt()}
      ${xt()}
      ${Tt()}
      <a class="whatsapp" href="${re(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function yt(){return`
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
  `}function bt(){return`
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

    ${St()}

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
  `}function xt(){return`
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
  `}function St(){return`
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

        ${Ct()}
      </div>
    </section>
  `}function Ct(){return _t()?`
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
  `}function wt(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`),e.get(`carnet`)?.size?`Carnet de vacunas: lo adjunté en el formulario de la página.`:null].filter(e=>e!==null).join(`
`)}function Tt(){return`
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
  `}function Et(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(re(wt(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`;let a=i.get(`carnet`),o=Object.fromEntries([...i.entries()].filter(([e])=>e!==`carnet`));(async()=>{if(a&&a.size)try{o.carnet=await gt(a)}catch(e){n.textContent=`${e.message} Tu pedido igual se envía; el carnet mandalo por WhatsApp.`}await ft(o)})().then(()=>{n.textContent=o.carnet?`Listo: recibimos tu pedido y el carnet. Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`:`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function Dt(){document.addEventListener(`submit`,Et)}var Ot=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),kt={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function At(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function jt(){let e=_.user();if(e)return Mt(e);kt.necesitaConfiguracion===null&&!kt.cargando&&(kt.cargando=!0,_.status().then(e=>{kt.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{kt={...kt,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{kt.cargando=!1,$()}));let t=kt.necesitaConfiguracion===!0;return oe(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${kt.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Código de configuración <input name="codigo" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Te lo pasó JUAN 3.0" /></label>`:``}
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>`}
        <p class="acc-status ${kt.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${Ot(kt.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function Mt(e){return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${Ot(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${Ot(e.usuario)}</strong> (${Ot(e.rol)}).</p>
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
  `)}function Nt(){return oe(`
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
  `)}function Pt(e){let t=_.user(),n=nt[t?.rol]||[];return oe(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${Ot(t?.nombre)}</strong> (${Ot(t?.rol)}) y la página de ${Ot(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function Ft(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function It(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return Ft(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return Ft(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return Ft(t,`Completá usuario y PIN.`,!0);i.disabled=!0,Ft(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await _.changePin(r.actual,r.nuevo);t.reset(),Ft(t,`Listo: tu PIN quedó cambiado.`),it(e.rol)!==`/`&&setTimeout(()=>Hm(it(e.rol)),900);return}let e=n===`setup`?await _.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin,codigo:r.codigo}):await _.login(r.usuario,r.pin);if(kt={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){Hm(`/login`);return}let i=At();Hm(i&&(nt[e.rol]||[]).includes(i.slice(1))?i:it(e.rol))}catch(e){Ft(t,e instanceof et?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function Lt(){document.addEventListener(`submit`,It)}var b=`Pendiente de confirmar`,Rt=`12/11/2026`,x={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},zt=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Bt={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},S={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},C=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],Vt=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],Ht={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Ut=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Wt={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},w=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),Gt=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Kt=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],qt=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function Jt(e,t,n){return!!e.schedule?.[t]?.includes(n)}function Yt(e=new Date){return C[(e.getDay()+6)%7]}function Xt(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var Zt=[[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Flora`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,20,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Lunes`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Coqui`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Manolo`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Lunes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Martes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:15`,`Forest`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:30`,`Sam`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:45`,`Coqui`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:00`,`Manolo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Séptima`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Rambo`,20,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam ni Cashi`],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Morris`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:45`,`Lokaku`,45,`Bozal`],[`Miércoles`,`Mañana`,`PJ_1M`,`11:00`,`Paco`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Tayler`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Duque`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:30`,`Rambo`,20,``],[`Miércoles`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:30`,`Annie`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:45`,`Séptima`,45,`Sin días contratados cargados`],[`Miércoles`,`Tarde`,`PJ_2T`,`16:00`,`Milo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:15`,`Flora`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Jueves`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`11:00`,`Rambo`,20,``],[`Jueves`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`14:45`,`Forest`,45,`Bozal`],[`Jueves`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Jueves`,`Tarde`,`PJ_1T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Jueves`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`16:15`,`Rambo`,20,`Revisar duración`],[`Viernes`,`Mañana`,`PJ_1M`,`09:45`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Runa`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:50`,`Kiara`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Flora`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Viernes`,`Tarde`,`PJ_2T`,`14:45`,`Coqui`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`16:00`,`Séptima`,45,`Sin días contratados cargados`],[`Viernes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Viernes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,5,`Revisar duración`],[`Sábado`,`Mañana`,`PJ_1M`,`09:15`,`Sam`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`14:45`,`Forest`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Roma`,55,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Milo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`16:00`,`Tayler`,45,``]],Qt={"Lunes|Mañana":`Juan`,"Lunes|Tarde":`Nicolás`,"Martes|Mañana":`Juan`,"Martes|Tarde":`Nicolás`,"Miércoles|Mañana":`Juan`,"Miércoles|Tarde":`Nicolás`,"Jueves|Mañana":`Juan`,"Jueves|Tarde":`Nicolás`,"Viernes|Mañana":`Nicolás`,"Viernes|Tarde":`Nicolás`,"Sábado|Mañana":`Juan`,"Sábado|Tarde":`Juan`},$t=new Map(w.map(e=>[e.name,e]));function en(e,t){let[n,r]=e.split(`:`).map(Number),i=n*60+r+Number(t||0);return`${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}var tn=Zt.map(([e,t,n,r,i,a,o])=>({dia:e,turno:t,ruta:n,hora:r,perroId:$t.get(i)?.id||null,perroNombre:i,minutos:a,salida:en(r,a),nota:o}));function nn(){let e=new Map;return tn.forEach(t=>{let n=`${t.ruta}_${t.dia.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}`;e.has(n)||e.set(n,{id:n,dia:t.dia,turno:t.turno,ruta:t.ruta,paseador:``,ayudante:``,supervisor:Qt[`${t.dia}|${t.turno}`]||``,paradas:[],origen:`Planilla RPJ, BASE RUTAS (12/11/2026)`}),e.get(n).paradas.push({perroId:t.perroId,perroNombre:t.perroNombre,hora:t.hora,minutos:t.minutos,nota:t.nota})}),[...e.values()].map(e=>({...e,paradas:e.paradas.sort((e,t)=>e.hora.localeCompare(t.hora))}))}var rn=[`Mapuche Country Club`,`La Lonja`,`Pilar (otros barrios)`],an={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},on=`Tu perro`,sn={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},cn=[`Pequeño`,`Mediano`,`Grande`],ln=C.filter(e=>e!==`Domingo`),un={Mañana:S.manana,Tarde:S.tarde};function dn(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function fn(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function pn(){let e=dn(an.plan,null);if(!e||typeof e!=`object`)return{...sn};let t=Vt.find(t=>t.id===e.planId)?e.planId:sn.planId,n=cn.includes(e.size)?e.size:sn.size,r=un[e.shift]?e.shift:sn.shift,i=Array.isArray(e.days)?ln.filter(t=>e.days.includes(t)):sn.days;return{planId:t,size:n,shift:r,days:i.length?i:sn.days}}function mn(){let e=dn(an.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function hn(){let e=dn(an.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function gn(e){let t=dn(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function _n(){let e=dn(an.carnet,null);return e&&typeof e.name==`string`?e:null}function T(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function vn(e){return`https://wa.me/${x.whatsapp}?text=${encodeURIComponent(e)}`}function yn(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function bn(e,t){return new Date(e.getTime()+t*864e5)}function xn(e){return C[(e.getUTCDay()+6)%7]}function Sn(e){return e.toISOString().slice(0,10)}function Cn(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function wn(e){let[t,n,r]=e.split(`-`).map(Number);return Cn(new Date(Date.UTC(t,n-1,r)))}function Tn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function En(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function Dn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function On(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function kn(e,t,n){return`${e} ${e===1?t:n}`}function An(){let e=pn(),t=Vt.find(t=>t.id===e.planId),n=un[e.shift],r=mn(),i=yn(),a=Sn(i.date),o=hn().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||on}}function jn(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=xn(r.date),s=En(n.from),c=En(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function Mn(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=bn(a.date,e);r.days.includes(xn(t))&&(e===0&&a.minutes>En(i.to)||n&&o.has(Sn(t))||s.push(t))}return s}var Nn=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],Pn=Nn.flatMap(e=>e.fields);function Fn(e,t){return!!String(e[t]??``).trim()}function In(e,t){return t.fields.filter(t=>Fn(e,t.key)).length}function Ln(e){return Pn.filter(t=>Fn(e,t.key)).length}function Rn(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function zn(e){let{ficha:t}=e,n=[],r=Nn.find(e=>e.id===`emergencia`);In(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),_n()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=Ln(t);return i<Pn.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${Pn.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function Bn(e){return e.todayIso<=r.until}var Vn={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function Hn(e,t,n=``){Vn.status[e]={message:t,html:n}}function Un(e){let t=Vn.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${T(t.message)} ${t.html}`.trim():``}</p>`}function Wn(){return`
    <div class="cl-page" data-cl-root>
      ${Gn(An())}
    </div>
  `}function Gn(e){return`
    <p class="cl-demo-note">
      ${g(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${Kn(e)}
    ${Xn(e)}
    ${Qn()}
    ${$n(e)}
    ${er(e)}
    ${tr(e)}
    <div class="cl-two-col">
      ${or()}
      ${sr(e)}
    </div>
    ${Bn(e)?cr():``}
    ${lr()}
  `}function Kn(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=jn(e),c=Rn(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=Mn(e,1)[0],d=u&&Sn(u)===e.todayIso,f=zn(e),p={libre:`Los días de paseo de tu plan son ${On(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${g(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${T(a)}</strong>
            <small>${T(i.name)} · ${T(r.size)} · Turno ${T(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${T(xn(t.date))} ${Cn(t.date)}</p>
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
        <div data-cl-region="alertas-hoy">${Jn(c,!0)}</div>
        ${Yn(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${g(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:T(xn(u))}</p>
            <p class="cl-next-date">${d?`${T(xn(u))} ${Cn(u)}`:Cn(u)}</p>
            <p class="cl-next-shift">Turno ${T(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${b}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${qn(e,f)}</div>
        </article>
      </div>
    </section>
  `}function qn(e,t=zn(e)){return t.length?`
    <ol class="cl-pending-list">
      ${t.map((e,t)=>`
        <li>
          <button type="button" class="cl-pending-item" data-cl-go="${e.go}">
            <span class="cl-pending-num" aria-hidden="true">${t+1}</span>
            <span>
              <strong>${T(e.text)}</strong>
              <small>${T(e.detail)}</small>
            </span>
            ${g(`arrowRight`,`cl-icon-sm`)}
          </button>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="cl-all-done">${g(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function Jn(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${g(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${T(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function Yn(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=bn(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${C.map((e,t)=>bn(a,t)).map(e=>{let t=Sn(e),a=xn(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${Cn(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${Dn(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function Xn(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${g(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${vn(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${T(x.whatsappLabel)}</small></span>
      </a>
      ${Bn(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${g(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${T(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function Zn(){return`Ahora: tema ${Ne()?`oscuro`:`claro`} · movimiento ${Pe()?`calmo (sin movimiento)`:`normal`}.`}function Qn(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${g(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${Zn()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function $n(e){let t=Mn(e,10);return`
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
                ${t.map(t=>`<option value="${Sn(t)}">${T(xn(t))} ${Cn(t)} · turno ${T(e.settings.shift.toLowerCase())}</option>`).join(``)}
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
          ${Un(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${T(xn(Tn(e.date)))} ${wn(e.date)}</strong>
                    ${e.reason?`<small>${T(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${T(e.date)}" aria-label="Quitar la ausencia del ${wn(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function er(e){let{plan:t,settings:n,shift:r}=e,i=Ht[n.size],a=n.days.length===t.walks;return`
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
          <p class="cl-plan-name">${T(t.name)}</p>
          <p class="cl-plan-walks">${kn(t.walks,`paseo`,`paseos`)} por semana · ${T(n.size)}</p>
          <p class="cl-plan-price"><b>${Xt(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${ln.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${Dn(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${T(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${b}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${g(`alertCircle`,`cl-icon-sm`)} El ${T(t.name)} incluye ${kn(t.walks,`paseo`,`paseos`)} por semana y hay ${kn(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${T(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${Vt.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${T(e.name)}</strong>
            <span>${kn(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${Xt(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${T(n.size.toLowerCase())}):</strong> individual ${Xt(i.individual)} · en grupo ${Xt(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Ut.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${Vn.openGroups.has(`plan`)?`open`:``}>
        <summary>${g(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${Vt.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${T(e.name)} · ${kn(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${cn.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(un).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${ln.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${Un(`plan`)}
        </div>
      </details>
    </section>
  `}function tr(e){let{ficha:t}=e,n=Ln(t),r=Pn.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${T(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${b}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${nr(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${T(Wt[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${b}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${Jn(Rn(t))}</div>

      <div class="cl-ficha-groups">
        ${Nn.map(e=>ir(e,t)).join(``)}
      </div>
      ${Un(`ficha`)}
    </section>
  `}function nr(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function rr(e,t){let n=In(e,t);return n===t.fields.length?`<span class="cl-count is-done">${g(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${b.toLowerCase()}</span>`}function ir(e,t){let n=Vn.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${g(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${rr(t,e)}</span>
        ${g(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>ar(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function ar(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${b}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${T(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${T(e.placeholder||`Pendiente de confirmar`)}">${T(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${T(r)}" placeholder="${T(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${Fn(t,e.key)?``:b}</small>`:``}
    </label>
  `}function or(){let e=_n();return`
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
        <div><dt>Archivo</dt><dd>${e?T(e.name):`Sin archivo`}</dd></div>
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${T(e.date)}`:b}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${vn(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${g(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${Un(`carnet`)}
    </section>
  `}function sr(e){let t=gn(an.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${g(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${Xt(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${vn(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
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
              <span><strong>${T(e.name)}</strong><small>Cargado el ${T(e.date)} · Pendiente de confirmación</small></span>
            </li>
          `).join(``)}
        </ul>
        <a class="cl-btn is-secondary" href="${vn(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${g(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${Un(`comprobante`)}
    </section>
  `}function cr(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${g(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${T(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${T(r.title)}</h2>
        <p>${T(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${vn(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function lr(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${g(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${Vn.resetArmed?`is-danger`:``}" data-cl-reset>
        ${Vn.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${Un(`privacidad`)}
    </section>
  `}function ur(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=Gn(An()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function dr(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=An();Object.entries({pendientes:()=>qn(t),"alertas-hoy":()=>Jn(Rn(t.ficha),!0),"alertas-ficha":()=>Jn(Rn(t.ficha)),"ficha-progreso":()=>nr(Ln(t.ficha),Pn.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),Nn.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=rr(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=Fn(t.ficha,e.dataset.clFieldState)?``:b})}function fr(e,t,n=``){Hn(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${T(t)} ${n}`.trim())}function pr(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,Vn.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Pe()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function mr(){return Cn(yn().date)}function hr(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return pr(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=An(),r=hn().filter(t=>t.date!==e);r.push({date:e,reason:t}),fn(an.ausencias,r);let i=vn([`Hola, aviso que ${n.dogName===on?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${xn(Tn(e)).toLowerCase()} ${wn(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),Hn(`ausencia`,`Listo: anotamos la ausencia del ${wn(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),ur(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return fn(an.ausencias,hn().filter(t=>t.date!==e)),Hn(`ausencia`,`Quitamos la ausencia del ${wn(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),ur(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=Vt.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(fr(`plan`,`El ${r.name} incluye ${kn(r.walks,`paseo`,`paseos`)} por semana: elegí ${kn(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(fn(an.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),Hn(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),ur(`[data-cl-plan-save]`),!0):(fr(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return Vn.resetArmed?(Object.values(an).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),Vn.resetArmed=!1,Vn.status={},Hn(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),ur(`[data-cl-reset]`),!0):(Vn.resetArmed=!0,ur(`[data-cl-reset]`),!0);if(Vn.resetArmed&&!e.target.closest(`[data-cl-reset]`)){Vn.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function gr(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:mr()};if(t.dataset.clFile===`carnet`)fn(an.carnet,n),Hn(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),ur(`[data-cl-status='carnet']`);else{let t=[n,...gn(an.comprobantes)].slice(0,10);fn(an.comprobantes,t),Hn(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),ur(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=mn();fr(`ficha`,fn(an.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function _r(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=mn();fn(an.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),dr()}function vr(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?Vn.openGroups.add(t.dataset.clDetails):Vn.openGroups.delete(t.dataset.clDetails))}function yr(){_e.push(hr),ve.push(gr),document.addEventListener(`input`,_r),document.addEventListener(`toggle`,vr,!0),Fe(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${Zn()} Se guarda solo en este dispositivo.`)})}var br=`America/Argentina/Buenos_Aires`,xr=`paseosJuan_paseador_progreso`,Sr=`paseosJuan_paseador_equipo`,Cr=`paseosJuan_paseador_incidente`,wr=`paseosJuan_paseador_ruta`,E=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],Tr={pendiente:0,retirado:1,paseando:2,entregado:3},Er=`no-sale`,Dr={Mañana:`manana`,Tarde:`tarde`},Or=/^[a-z0-9][a-z0-9_.-]{0,60}$/i,kr={Mañana:S.manana,Tarde:S.tarde},Ar=[`Bajo`,`Medio`,`Alto`],jr=[`No se ven`,`Sí`,`No sé`],Mr=`Perro externo`,Nr=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,Pr=nn(),D={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``,routeChange:null};function O(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Fr(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ir(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Lr(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim().toLowerCase()}function Rr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:br,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:Yt(t)}}function zr(e){let[t,n,r]=String(e).split(`-`);return r?`${r}/${n}/${t}`:e}function Br(e,t){let n=(C.indexOf(e)-C.indexOf(t.day)+7)%7,[r,i,a]=t.iso.split(`-`).map(Number);return new Date(Date.UTC(r,i-1,a+n)).toISOString().slice(0,10)}function Vr(e){return e.minutes<810?`Mañana`:`Tarde`}function Hr(){let e=Rr(),t=D.day||e.day,n=D.shift||Vr(e),r=t===e.day;return{now:e,day:t,shift:n,isToday:r,iso:r?e.iso:Br(t,e)}}function Ur(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Wr(e){let t=kr[e];return`${t.from} a ${t.to}`}function Gr(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}function Kr(e){if(e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t} h ${n} min`:`${t} h`}function qr(e,t,n=`retiro`){let r=Gr(e);if(r===null)return{text:`Hora: ${b.toLowerCase()}`,kind:`info`};let i=r-t;return i>0?{text:`${n===`entrega`?`Entrega `:``}${n===`entrega`?`en`:`En`} ${Kr(i)}`,kind:i<=10?`soon`:`ok`}:i===0?{text:n===`entrega`?`Entrega ahora`:`Ahora`,kind:`soon`}:{text:n===`entrega`?`Entrega con ${Kr(-i)} de atraso`:`${Kr(-i)} de atraso`,kind:`late`}}function Jr(e,t,n=`retiro`){let r=qr(e,t,n);return`<span class="pw-cd pw-cd--${r.kind}" data-pw-countdown="${O(e)}" data-pw-mode="${n}">${O(r.text)}</span>`}function Yr(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function Xr(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function Zr(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${Ur(i)}`),t=t.filter(e=>!e.includes(r))}return n}function Qr(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function $r(e){return e.safety.some(e=>/bozal/i.test(e))}var ei=Gt.filter(e=>e.sebastian>0),ti=Gt.filter(e=>e.sebastian===0&&e.juan>0),ni=Gt.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function ri(){return _.user()||{}}function ii(){return ri().nombre||`equipo`}function ai(){return ri().rol===`ayudante`}function oi(e){let t=ri();if(!e||!t.usuario)return!1;let n=Lr(e);return n===Lr(t.usuario)||t.nombre&&n===Lr(t.nombre)}function si(e,t=new Map){if(!e)return``;if(oi(e))return ri().nombre||String(e);let n=String(e);return t.get(n)||t.get(Lr(n))||zt.find(e=>e.id===Lr(n))?.name||n}function ci(e,t){return Lr(e)===Lr(t)}function li(e){return Lr(e).startsWith(`tarde`)?`Tarde`:`Mañana`}function ui(e){return w.find(t=>t.id===e.perroId)||w.find(t=>Lr(t.name)===Lr(e.perroNombre))||{id:Or.test(String(e.perroId||``))?String(e.perroId):``,name:String(e.perroNombre||`Perro sin nombre`),size:b,minutes:null,safety:[],status:`Activo`,unknown:!0}}function di(e,t){let n=(Array.isArray(e.paradas)?e.paradas:[]).filter(e=>e&&(e.perroId||e.perroNombre)).map((e,t)=>{let n=ui(e),r=Number(e.minutos)||n.minutes||null,i=Gr(e.hora)===null?``:String(e.hora).trim().padStart(5,`0`);return{index:t,dog:n,hora:i,minutos:r,salida:i&&r?en(i,r):``,nota:String(e.nota||``).trim(),canSave:!!n.id}}).sort((e,t)=>(Gr(e.hora)??9999)-(Gr(t.hora)??9999)||e.index-t.index);return{ruta:String(e.ruta||`Pendiente de confirmar`),turno:li(e.turno),dia:e.dia||``,paseador:String(e.paseador||``),ayudante:String(e.ayudante||``),supervisor:String(e.supervisor||``),notas:String(e.notas||``),fuente:t,record:e,stops:n}}function fi(e,t,n){let r=new Map;v.cached(`rutas`,{desde:n}).filter(t=>t.fecha===e&&t.ruta&&Array.isArray(t.paradas)).sort((e,t)=>String(e.actualizadoEn||``).localeCompare(String(t.actualizadoEn||``))).forEach(e=>r.set(e.ruta,e));let i=v.cached(`plantillas`).filter(e=>e.ruta&&Array.isArray(e.paradas)),a=i.length===0,o=new Map;return(a?Pr:i).filter(e=>ci(e.dia,t)).forEach(e=>o.set(e.ruta,di(e,a?`planilla`:`plantilla`))),r.forEach((e,t)=>o.set(t,di(e,`dia`))),[...o.values()].sort((e,t)=>e.turno===t.turno?e.ruta.localeCompare(t.ruta):e.turno===`Mañana`?-1:1)}function pi(e){let t=Fr(wr,{})?.[ri().usuario||``];return t&&t.iso===e.iso&&t.turno===e.shift?t.ruta:``}function mi(e,t){let n=Fr(wr,{}),r=n&&typeof n==`object`?n:{};r[ri().usuario||``]=t?{iso:e.iso,turno:e.shift,ruta:t}:null,Ir(wr,r)}function hi(e){let t=fi(e.iso,e.day,e.now.iso),n=t.filter(t=>t.turno===e.shift),r=n.filter(e=>oi(e.paseador)||oi(e.ayudante)),i=t.filter(t=>t.turno!==e.shift&&(oi(t.paseador)||oi(t.ayudante))),a=r.length?``:n.some(t=>t.ruta===pi(e))?pi(e):``,o=r.length?r:a?n.filter(e=>e.ruta===a):n;return{all:t,ofShift:n,mine:r,elsewhere:i,picked:a,shown:o,assigned:r.length>0,helping:r.find(e=>oi(e.ayudante)&&!oi(e.paseador))||null,fromPlanilla:o.some(e=>e.fuente===`planilla`)}}function gi(e){return e.flatMap(e=>e.stops.map(t=>({...t,route:e})))}function _i(e,t){return gi(hi(e).shown).find(e=>e.dog.id===t)||null}var vi=new Map;function yi(e,t){if(!e.isToday||!k.ready)return;let n=[];t.forEach(r=>{let i=`${e.iso}|${r.turno}|${r.ruta}`,a=new Map(r.stops.map(e=>[e.dog.id||Lr(e.dog.name),e])),o=vi.get(i);if(vi.set(i,a),!o)return;let s=[...a.entries()].filter(([e])=>!o.has(e)).map(([,e])=>`${e.dog.name}${e.hora?` (${e.hora})`:``}`),c=[...o.entries()].filter(([e])=>!a.has(e)).map(([,e])=>e.dog.name),l=[...a.entries()].filter(([e,t])=>o.has(e)&&o.get(e).hora!==t.hora).map(([e,t])=>`${t.dog.name} pasa de ${o.get(e).hora||`sin hora`} a ${t.hora||`sin hora`}`),u=[];s.length&&u.push(`se ${s.length===1?`sumó`:`sumaron`} ${Ur(s)}`),c.length&&u.push(`se ${c.length===1?`quitó`:`quitaron`} ${Ur(c)}`),l.length&&u.push(`cambió el horario: ${Ur(l)}`),u.length&&n.push(`${t.length>1?`${r.ruta}: `:``}${u.join(` / `)}`)}),n.length&&(D.routeChange={text:`La ruta cambió: ${n.join(`. `)}.`,time:e.now.time},A(D.routeChange.text))}function bi(e){return v.cached(`avisos`).filter(t=>{let n=String(t.fecha||``),r=String(t.vigenteHasta||``);return n&&n>e?!1:r?r>=e:n===e}).sort((e,t)=>String(t.actualizadoEn||t.fecha||``).localeCompare(String(e.actualizadoEn||e.fecha||``)))}function xi(e){let t=bi(e.now.iso);return t.length?`
    <section class="pw-notices" aria-labelledby="pw-avisos-title">
      <h2 class="pw-section-label" id="pw-avisos-title">${g(`bell`,`pw-icon pw-icon--sm`)} Avisos por barrio (${t.length})</h2>
      <ul class="pw-notice-list" role="list">
        ${t.map(e=>{let t=/seguridad|perro suelto/i.test(e.tipo||``);return`
            <li class="pw-notice ${t?`pw-notice--danger`:``}">
              ${g(t?`alertTriangle`:`mapPin`,`pw-icon`)}
              <div>
                <p class="pw-notice-head"><strong>${O(e.barrio||`Barrio sin cargar`)}</strong>${e.tipo?` · ${O(e.tipo)}`:``}</p>
                <p>${O(e.mensaje||e.titulo||``)}</p>
                <p class="pw-notice-meta">${e.vigenteHasta?`Vigente hasta el ${O(zr(e.vigenteHasta))}`:`Vigente hoy`}${e.creadoPorNombre?` · Avisó ${O(e.creadoPorNombre)}`:``}</p>
              </div>
            </li>
          `}).join(``)}
      </ul>
    </section>
  `:``}function Si(e,t,n){return`${e}_${t}_${Dr[n]}`}function Ci(e,t,n=ri().usuario){return`${e}_${n||`sin-usuario`}_${Dr[t]}`}var wi=new Map;function Ti(e,t){let n=new Map(v.cached(e,{desde:t}).map(e=>[e.id,e]));return wi.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function Ei(e){let t=E.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===Er;return{step:r?0:Math.max(Tr[e.estado]??0,n),noSale:r,times:t,record:e}}function Di(e,t,n){let r=Ti(`paseos`,e);return Object.fromEntries(n.filter(e=>e.id).map(n=>[n.id,Ei(r.get(Si(e,n.id,t)))]))}function Oi(e,t){return t.dog.id&&e[t.dog.id]||Ei(null)}function ki(e,t){let n=e.filter(e=>Oi(t,e).noSale).length,r=e.filter(e=>!Oi(t,e).noSale&&Oi(t,e).step>=E.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function Ai(e,t){let n=Ti(`checklists`,e).get(Ci(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:ei.filter(e=>r[e.item]===!0).map(e=>e.item)}}function ji(e){let t=new Map,n=(e,n)=>{e&&n&&t.set(String(e),String(n))};return[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]].forEach(([e,t])=>{v.cached(e,t).forEach(e=>{n(e.creadoPor,e.creadoPorNombre),n(e.actualizadoPor,e.actualizadoPorNombre),E.forEach(t=>n(e[`${t.field}Por`],e[`${t.field}PorNombre`]))})}),t}function Mi(e,t){return e?oi(e)?`vos`:si(e,t):b}function Ni(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:br,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Pi(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Ni(e.actualizadoEn);return`Último cambio: ${Mi(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}function Fi(e,t,n){let r=E[t].field,i=e?.[`${r}Por`];return!i||oi(i)?``:e[`${r}PorNombre`]||si(i,n)}var Ii=Promise.resolve();function Li(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&wi.set(r,n);let i=Ii.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await v.save(e,i);return D.syncError&&=``,t}catch(e){return D.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,ya(D.syncError),null}finally{r&&wi.get(r)===n&&wi.delete(r),wa()}});return Ii=i.catch(()=>null),i}function Ri(e,t,n,r){let i=t.now.iso,a={id:Si(i,e.dog.id,t.shift),fecha:i,perroId:e.dog.id,perroNombre:e.dog.name,turno:t.shift,ruta:e.route.ruta,...n};return A(r),Li(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&A(`${r} Sin señal: se enviará cuando haya señal.`)})}function zi(e,t){let n=e.now.iso,r=Object.fromEntries(ei.map(e=>[e.item,t.includes(e.item)])),i={id:Ci(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=ei.length};return Li(`checklists`,i,{optimisticRecord:i})}var k={key:``,stops:[],ready:!1};function Bi(e){let t=`${e}|${ri().usuario||``}`;if(k.key===t)return;k.stops.forEach(e=>e()),k.key=t,k.stops=[],k.ready=!1;let n=[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]];Promise.allSettled(n.map(([e,t])=>v.list(e,t))).then(t=>{let n=t.find(e=>e.status===`rejected`);return n&&(D.syncError=`No se pudieron traer los datos del equipo: ${n.reason?.message||`error del servidor`}`,ya(D.syncError)),Hi(e)}).catch(()=>null).finally(()=>{k.key===t&&(k.ready=!0,wa(),k.stops=n.map(([e,t])=>v.watch(e,t)))})}var Vi=!1;async function Hi(e){if(Vi)return;Vi=!0;let t=Fr(xr,null),n=Fr(Sr,null);if(!t&&!n)return;let r=[],i=Ti(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&Dr[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=w.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=Si(e,t,o),c=Ei(i.get(s)),l=Math.min(n.length,E.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:E[l-1].estado};E.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(Li(`paseos`,u,{optimisticRecord:u}))})});let a=Ti(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!Dr[o]||!Array.isArray(n))return;let s=n.filter(e=>ei.some(t=>t.item===e));s.length&&!a.has(Ci(e,o))&&r.push(zi({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(xr),localStorage.removeItem(Sr)}catch{}r.length&&A(`Se subió al equipo lo que tenías marcado en este celular.`)}}function Ui(){let e=Fr(Cr,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function Wi(e){return`
    <div class="pw-shell">
      ${Ki()}
      ${e}
    </div>
  `}function Gi(){let e=Hr();Bi(e.now.iso);let t=hi(e);yi(e,t.shown),Ma.iso=e.now.iso,Ma.shift=Vr(e.now),Ma.minute=e.now.minutes;let n=gi(t.shown),r=e.isToday?Di(e.iso,e.shift,n.map(e=>e.dog)):{},i=ji(e.now.iso);return`
    <main class="pw-main" id="pw-inicio">
      ${qi()}
      ${Ji()}
      ${xi(e)}
      ${Xi(e,t,n,r,i)}
      <div class="pw-routes" id="pw-perros" tabindex="-1" aria-label="Perros de la ruta">
        ${t.shown.length?t.shown.map(n=>na(n,e,t,r,i)).join(``):`
            <div class="pw-empty">
              <p><strong>No hay rutas cargadas para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
              <p>Si te pidieron un paseo, confirmalo con el coordinador o con Juan.</p>
            </div>
          `}
      </div>
      <div class="pw-columns">
        ${aa(e,t,i)}
        ${oa(e,n.map(e=>e.dog))}
      </div>
      <footer class="pw-footer">
        <p>Rutas y horarios: los arma el coordinador. Punto de partida: ${O(x.officialSources.routes)} (12/11/2026).</p>
        <p>Lo que marcás acá lo ven ${ai()?`el paseador, `:`tu ayudante, `}Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `}function Ki(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel ${ai()?`del ayudante de paseador`:`del paseador`}">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>${ai()?`Ayudante`:`Paseador`} · ${O(ii())}</small>
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
  `}function qi(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${g(`uploadCloud`,`pw-icon`)}<span>${O(n)}</span></p>`),D.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${g(`alertTriangle`,`pw-icon`)}
        <span>${O(D.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function Ji(){return D.routeChange?`
    <div class="pw-change" data-pw-change>
      ${g(`route`,`pw-icon pw-icon--lg`)}
      <div>
        <strong>${O(D.routeChange.text)}</strong>
        <p>Lo cambió el coordinador. Aviso recibido a las ${O(D.routeChange.time)}.</p>
      </div>
      <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-change-ok>Entendido</button>
    </div>
  `:``}function Yi(e){let t=e.flatMap(e=>e.stops.map(e=>e.hora)).filter(Boolean).sort(),n=e.flatMap(e=>e.stops.map(e=>e.salida)).filter(Boolean).sort();return t.length?`${t[0]} a ${n[n.length-1]||t[t.length-1]}`:``}function Xi(e,t,n,r,i){let a=t.helping,o=t.mine[0]||null,s=e.isToday?`hoy, ${e.day.toLowerCase()}`:`${e.day.toLowerCase()} ${zr(e.iso)}`,c;c=a?`Acompañás a ${O(si(a.paseador,i)||`un paseador sin asignar`)} en ${O(a.ruta)}`:o?t.mine.length>1?`Tus rutas de ${s}: ${O(Ur(t.mine.map(e=>e.ruta)))}`:`Tu ruta de ${s}: ${O(o.ruta)}`:`Rutas de ${s} · turno ${e.shift.toLowerCase()}`;let l=`Hola, ${O(ii())}`,u=e.isToday?`${l} · ${e.now.date} · turno ${e.shift.toLowerCase()}`:`${l} · Planificación: no es hoy`,d=[...new Set(t.shown.map(e=>e.supervisor).filter(Boolean))],f=d.length?Ur(d):kr[e.shift].supervisor,p=Yi(t.shown)||Wr(e.shift),m=n.filter(e=>e.dog.status!==`Activo`),h=Xr(n.map(e=>e.dog)),ee=[];if(t.assigned&&t.shown.length===1){let e=t.shown[0];a?ee.push(`<li>Paseador: <b>${O(si(e.paseador,i)||`Pendiente de confirmar`)}</b></li>`):ee.push(`<li>Ayudante: ${e.ayudante?`<b>${O(si(e.ayudante,i))}</b>`:`sin ayudante`}</li>`)}return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${u}</p>
          <h1 id="pw-today-title" tabindex="-1">${c}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${n.length}</b> ${n.length===1?`perro`:`perros`}</li>
            <li>${O(p)}</li>
            <li>Supervisa: ${O(f)}</li>
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
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${D.pickerOpen}" aria-controls="pw-picker">
            ${g(`sliders`,`pw-icon`)}
            ${D.pickerOpen?`Cerrar selector`:`Cambiar día o turno`}
          </button>
        </div>
      </div>
      ${D.pickerOpen?Qi(e):``}
      ${t.fromPlanilla?`
        <p class="pw-source pw-source--warn">${g(`alertCircle`,`pw-icon`)}<span><b>Ruta tomada de la planilla, falta que el coordinador la confirme.</b> Horarios de BASE RUTAS (12/11/2026).</span></p>
      `:``}
      ${Zi(e,t)}
      ${$i(e,n,m,h,r)}
    </section>
  `}function Zi(e,t){let n=[];if(!t.assigned&&t.elsewhere.length){let r=t.elsewhere[0];n.push(`
      <p class="pw-source">
        ${g(`route`,`pw-icon`)}
        <span>${e.isToday?`Hoy`:`Ese día`} figurás en la ruta <b>${O(r.ruta)}</b> (turno ${r.turno.toLowerCase()}).</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-shift="${r.turno}">Ver turno ${r.turno.toLowerCase()}</button>
      </p>
    `)}return!t.assigned&&t.ofShift.length&&n.push(`
      <div class="pw-route-pick" role="group" aria-labelledby="pw-route-pick-label">
        <p id="pw-route-pick-label"><strong>¿En qué ruta estás ${e.isToday?`hoy`:`ese día`}?</strong>
          <span>No figurás como paseador ni ayudante en este turno. Si es un error, avisale al coordinador.</span></p>
        ${t.ofShift.length>1?`
          <div class="pw-route-chips">
            ${t.ofShift.map(e=>`
              <button type="button" class="pw-chip pw-chip--wide ${t.picked===e.ruta?`is-active`:``}" data-pw-route="${O(e.ruta)}" aria-pressed="${t.picked===e.ruta}">
                ${O(e.ruta)}<small>${e.stops.length} ${e.stops.length===1?`perro`:`perros`}${e.paseador?` · ${O(si(e.paseador))}`:``}</small>
              </button>
            `).join(``)}
            <button type="button" class="pw-chip pw-chip--wide ${t.picked?``:`is-active`}" data-pw-route="" aria-pressed="${!t.picked}">
              Todas<small>${t.ofShift.length} rutas</small>
            </button>
          </div>
          <p class="pw-muted pw-small">Lo que elijas queda recordado en este celular.</p>
        `:``}
      </div>
    `),n.join(``)}function Qi(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
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
              ${t}<small>${Wr(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function $i(e,t,n,r,i){let a=[],o=t.map(e=>e.dog);r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${Zr(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let s=o.filter($r);if(s.length){let e=!ai()&&s.length>ni;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${Ur(s.map(e=>e.name))}`,text:e?`Según el inventario tenés ${ni} ${ni===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${Ur(n.map(e=>e.dog.name))}`,text:n.length===1?`Figura en la ruta con estado "${O(n[0].dog.status)}". No lo retires sin confirmarlo con el coordinador o con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con el coordinador o con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=Ai(e.now.iso,e.shift).checked.length,r=ki(t,i);n<ei.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${ei.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return a.length?`
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
  `:``}function ea(e,t){if(e.fuente===`dia`){let n=e.record.actualizadoPor?Mi(e.record.actualizadoPor,t):``,r=e.record.actualizadoEn?Ni(e.record.actualizadoEn):``;return`Cambio del día${n?` cargado por ${n}`:``}${r?` a las ${r}`:``}.`}return e.fuente===`plantilla`?`Plantilla semanal del coordinador.`:`Planilla RPJ (sin confirmar).`}function ta(e,t,n){let r=e.stops.filter(e=>e.canSave);if(!e.stops.length)return``;if(!t.isToday){let t=e.stops[0];return`
      <div class="pw-next" data-pw-next="${O(e.ruta)}">
        <p class="pw-next-label">Primer retiro</p>
        <p class="pw-next-main">${O(t.dog.name)}${t.hora?` · ${O(t.hora)}`:``}</p>
      </div>
    `}let i=r.filter(e=>!Oi(n,e).noSale&&Oi(n,e).step===0),a=r.filter(e=>{let t=Oi(n,e);return!t.noSale&&t.step>0&&t.step<E.length}),o,s,c,l;if(i.length)c=i[0].hora,o=i.filter(e=>e.hora===c),s=`Próximo`,l=`retiro`;else if(a.length){let e=[...a].sort((e,t)=>String(e.salida||`99:99`).localeCompare(String(t.salida||`99:99`)));c=e[0].salida,o=e.filter(e=>e.salida===c),s=`Próxima entrega`,l=`entrega`}else return`
      <div class="pw-next pw-next--done" data-pw-next="${O(e.ruta)}">
        <p class="pw-next-label">${O(e.ruta)}</p>
        <p class="pw-next-main">${g(`checkCircle`,`pw-icon pw-icon--lg`)} Ruta completa</p>
      </div>
    `;return`
    <div class="pw-next ${qr(c,t.now.minutes,l).kind===`late`?`is-late`:``}" data-pw-next="${O(e.ruta)}">
      <p class="pw-next-label">${l===`entrega`?`Todos retirados · próxima entrega prevista`:`Retiro que sigue`}</p>
      <p class="pw-next-main">${s===`Próximo`?`Próximo: `:``}${O(Ur(o.map(e=>e.dog.name)))}${c?` · ${O(c)}`:``}</p>
      <p class="pw-next-time">${Jr(c,t.now.minutes,l)}</p>
      <div class="pw-next-actions">
        ${o.map(t=>{let r=Oi(n,t);return`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-from-next="${O(e.ruta)}" data-pw-step="${O(t.dog.id)}" ${k.ready?``:`aria-disabled="true"`}>
              ${k.ready?`${E[r.step].action}${o.length>1?`: ${O(t.dog.name)}`:``}`:`Cargando lo marcado…`}
            </button>
          `}).join(``)}
      </div>
    </div>
  `}function na(e,t,n,r,i){let a=Xr(e.stops.map(e=>e.dog)),o=ki(e.stops,r),s=o.toWalk?Math.round(o.delivered/o.toWalk*100):100,c=`pw-ruta-${e.ruta.replace(/[^a-z0-9]+/gi,`-`)}`,l=[];return!n.helping&&e.paseador&&!oi(e.paseador)&&l.push(`Paseador: ${si(e.paseador,i)}`),n.helping&&e.ayudante&&!oi(e.ayudante)&&l.push(`Ayudante: ${si(e.ayudante,i)}`),!n.assigned&&e.ayudante&&l.push(`Ayudante: ${si(e.ayudante,i)}`),`
    <section class="pw-section pw-route" aria-labelledby="${c}">
      <div class="pw-section-head">
        <div>
          <h2 id="${c}">Ruta ${O(e.ruta)} <span class="pw-count">${e.stops.length}</span></h2>
          <p class="pw-muted">${O(ea(e,i))} En orden, con la hora de retiro.${l.length?` ${O(l.join(` · `))}.`:``}</p>
          ${e.notas?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${O(e.notas)}</p>`:``}
        </div>
        ${t.isToday&&e.stops.length?`
          <div class="pw-progress" aria-label="Avance de la ruta ${O(e.ruta)}">
            <strong>${o.delivered} de ${o.toWalk} entregados${o.noSale?` · ${o.noSale} no ${o.noSale===1?`sale`:`salen`}`:``}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${s}%"></span></span>
          </div>
        `:``}
      </div>

      ${ta(e,t,r)}

      ${a.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${g(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en esta ruta</strong>
            <ul>${Zr(a).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${O(e.supervisor||kr[t.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      `:``}

      ${!t.isToday&&e.stops.length?`
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      `:``}

      ${e.stops.length?`
        <ol class="pw-dogs" role="list">
          ${e.stops.map((n,o)=>ia({...n,route:e},o,t,Oi(r,n),Qr(n.dog,a),i)).join(``)}
        </ol>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros en ${O(e.ruta)} para este turno.</strong></p>
          <p>Si te pidieron un paseo, confirmalo con el coordinador.</p>
        </div>
      `}
      <p class="pw-muted pw-legend">
        Categoría operativa: <b>SIN EVALUAR</b> salvo que se indique otra. ${O(Wt[`SIN EVALUAR`])}
        Fuente: Registro maestro, 14/08/2026.
      </p>
    </section>
  `}function ra(e){return!e.nota||/^bozal$/i.test(e.nota)&&$r(e.dog)||/^no juntar/i.test(e.nota)&&e.dog.safety.some(e=>Yr(e)===`danger`)?``:e.nota}function ia(e,t,n,r,i,a){let{dog:o}=e,{times:s,noSale:c,record:l}=r,u=Math.min(r.step,E.length),d=!c&&u>=E.length,f=Pi(l,a),p=o.safety.filter(e=>Yr(e)===`danger`).join(` `),m=i.filter(e=>!p.includes(e)),h=o.safety.filter(e=>Yr(e)!==`info`),ee=o.safety.filter(e=>Yr(e)===`info`),te=o.status!==`Activo`,ne=h.length||i.length||te,re=ra(e),ie=e.minutos||o.minutes,ae=n.isToday&&e.canSave,oe=``;return n.isToday&&!c&&!d&&e.canSave&&(oe=u===0?Jr(e.hora,n.now.minutes,`retiro`):e.salida?Jr(e.salida,n.now.minutes,`entrega`):``),`
    <li class="pw-dog ${ne?`has-alert`:``} ${d?`is-done`:``} ${c?`is-nosale`:``}" data-pw-dog="${O(o.id)}">
      <div class="pw-dog-time">
        <span class="pw-dog-order" aria-label="Orden ${t+1}">${t+1}</span>
        <span class="pw-dog-hora">${e.hora?`${g(`clock`,`pw-icon pw-icon--sm`)} Retiro ${O(e.hora)}`:`Hora de retiro: ${b.toLowerCase()}`}</span>
        ${oe}
      </div>
      <div class="pw-dog-head">
        <h3>${O(o.name)}</h3>
        <span class="pw-dog-facts">${O(o.size)} · ${ie?`${ie} min`:`Duración: ${b.toLowerCase()}`}${e.salida?` · vuelve ~${O(e.salida)}`:``}</span>
      </div>

      ${ne?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${O(o.name)}">
          ${te?`
            <li class="pw-alert pw-alert--warn">
              ${g(`alertCircle`,`pw-icon`)}
              <span>${O(o.status)}: ${O(o.review||`su estado no es Activo.`)} Confirmalo con el coordinador o con Juan antes de retirarlo.</span>
            </li>
          `:``}
          ${h.map(e=>`
            <li class="pw-alert pw-alert--${Yr(e)}">
              ${g(Yr(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${O(e)}${Yr(e)===`danger`&&i.length?`<b class="pw-today-tag">En esta ruta: ${Ur(i)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${m.length?`
            <li class="pw-alert pw-alert--danger">
              ${g(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${Ur(m)}<b class="pw-today-tag">En esta ruta</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${ee.map(e=>`<p class="pw-dog-note">${g(`users`,`pw-icon pw-icon--sm`)} ${O(e)}</p>`).join(``)}
      ${re?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${O(re)}</p>`:``}
      ${o.review&&!te?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${O(o.review)}</p>`:``}
      ${o.unknown?`<p class="pw-dog-review"><b>Perro nuevo en la ruta:</b> sin ficha en esta página (tamaño y alertas: ${b.toLowerCase()}). Preguntale al coordinador.</p>`:``}
      <p class="pw-dog-category"><span>${O(o.category||`SIN EVALUAR`)}</span> ${o.unknown?b:`Registro maestro 14/08/2026`}</p>

      ${n.isToday&&!e.canSave?`
        <p class="pw-note">Este perro no tiene identificador en la ruta: no se puede marcar. Avisale al coordinador.</p>
      `:``}

      ${ae?`
        ${c?`
          <p class="pw-nosale-label">${g(`x`,`pw-icon`)} No sale en este turno</p>
        `:`
          <ol class="pw-steps" aria-label="Avance de ${O(o.name)}">
            ${E.map((e,t)=>{let n=t<u?Fi(l,t,a):``;return`
                <li class="${t<u?`is-done`:``} ${t===u?`is-next`:``}">
                  <span class="pw-step-dot" aria-hidden="true">${t<u?g(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
                  <span>${e.label}${t<u?`<small>${s[t]?O(s[t]):`Sin hora`}</small>`:``}${n?`<small class="pw-marker">Marcó ${O(n)}</small>`:``}</span>
                  <span class="pw-sr">${t<u?`hecho`:`pendiente`}</span>
                </li>
              `}).join(``)}
          </ol>
        `}
        ${l?.nota?`<p class="pw-dog-nota"><b>Nota:</b> ${O(l.nota)}</p>`:``}
        ${f?`<p class="pw-dog-change ${l.pendiente?`is-pending`:``}">${O(f)}</p>`:``}
        <div class="pw-dog-actions">
          ${c?``:d?`
            <p class="pw-done-label">${g(`checkCircle`,`pw-icon`)} Entregado ${O(s[E.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${O(o.id)}" ${k.ready?``:`aria-disabled="true"`}>
              ${k.ready?E[u].action:`Cargando lo marcado…`}
            </button>
          `}
          ${!c&&u===0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${O(o.id)}" ${k.ready?``:`aria-disabled="true"`} aria-label="${O(o.name)} no sale en este turno">No sale</button>
          `:``}
          ${c||u>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${O(o.id)}" aria-label="Deshacer el último paso de ${O(o.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function aa(e,t,n){let{checked:r,record:i}=Ai(e.now.iso,e.shift),a=r.length>=ei.length,o=Pi(i,n),s=t.helping?si(t.helping.paseador,n):``;return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">${ai()?`Tu checklist, hoy turno ${e.shift.toLowerCase()}. El inventario no asigna equipo al ayudante (${b.toLowerCase()}): revisá${s?` con ${O(s)}`:``} que esté todo lo del paseador.`:`Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.`}</p>
        </div>
        <span class="pw-count ${a?`is-ok`:``}">${r.length}/${ei.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${ei.map(e=>{let t=r.includes(e.item),n=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
            <li>
              <input class="pw-check-input" type="checkbox" id="${n}" data-pw-equip="${O(e.item)}" ${t?`checked`:``} />
              <label class="pw-check" for="${n}">
                <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                <span class="pw-check-text">${O(e.item)}</span>
                <span class="pw-check-qty">${e.sebastian}</span>
              </label>
            </li>
          `}).join(``)}
      </ul>
      <div class="pw-row">
        ${a?`<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`:`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      ${o?`<p class="pw-dog-change ${i?.pendiente?`is-pending`:``}">${O(o)}</p>`:``}
      <p class="pw-status" role="status">${O(D.equipStatus)}</p>
      ${ti.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${ti.map(e=>`${O(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function oa(e,t){let n=Ui(),r=[...t.map(e=>e.name),Mr];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=D.previewOpen?ua(n,e):null;return`
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
          ${qt.map((e,t)=>{let r=`pw-proto-${t}`;return`
              <li>
                <input class="pw-check-input" type="checkbox" id="${r}" data-pw-field="protocolo" value="${t}" ${n.protocolo.includes(t)?`checked`:``} />
                <label class="pw-check pw-check--step" for="${r}">
                  <span class="pw-check-box" aria-hidden="true">${g(`checkCircle`,`pw-icon`)}</span>
                  <span class="pw-check-text"><b>${t+1}.</b> ${O(e)}</span>
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
              <input type="checkbox" id="pw-inc-dog-${t}" data-pw-field="dogs" value="${O(e)}" ${n.dogs.includes(e)?`checked`:``} />
              <label for="pw-inc-dog-${t}">${O(e)}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <div class="pw-grid-2">
        <label class="pw-field">Hora
          <input type="time" data-pw-field="hora" value="${O(n.hora||e.now.time)}" />
        </label>
        <label class="pw-field">Lugar
          <input type="text" data-pw-field="lugar" value="${O(n.lugar)}" placeholder="Ej.: plaza, esquina (sin domicilios)" autocomplete="off" />
        </label>
      </div>

      <p class="pw-hint">Escribí lo que viste y oíste. Ej.: “tiró de la correa y gruñó”, no “se puso agresivo”.</p>

      <label class="pw-field">Antes: ¿qué estaba pasando?
        <textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto a 3 metros">${O(n.antes)}</textarea>
      </label>
      <label class="pw-field">Conducta: ¿qué hizo el perro? <span class="pw-req">(obligatorio)</span>
        <textarea data-pw-field="conducta" rows="2" placeholder="Ej.: se paró en dos patas, ladró y tiró hacia el otro perro">${O(n.conducta)}</textarea>
      </label>
      <label class="pw-field">¿Qué hiciste vos?
        <textarea data-pw-field="accion" rows="2" placeholder="Ej.: corté distancia, crucé la calle y lo senté">${O(n.accion)}</textarea>
      </label>
      <label class="pw-field">Después: ¿cómo quedó?
        <textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto y siguió el paseo">${O(n.despues)}</textarea>
      </label>

      <fieldset class="pw-fieldset">
        <legend>Nivel de riesgo <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-seg pw-seg--risk">
          ${Ar.map(e=>`
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
          ${jr.map((e,t)=>`
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
        <button class="pw-btn pw-btn--ghost ${D.confirmClear?`is-confirm`:``}" type="button" data-pw-clear>
          ${D.confirmClear?`¿Seguro? Tocá de nuevo`:n.registroId?`Empezar otro reporte`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${D.incidentStatus.startsWith(`Falta`)||D.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${O(D.incidentStatus)}</p>

      ${i&&i.ok?sa(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function sa(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${O(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${ca(e)}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${g(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function ca(e){return`https://wa.me/${x.whatsapp}?text=${encodeURIComponent(e)}`}function la(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(Nr)?.[0]}}function ua(e,t){let{missing:n,word:r}=la(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=Vr(t.now),a=fa(),o=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,s=da(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,ai()?`Ayudante de paseador: ${ii()}${a.paseador?` (con ${a.paseador})`:``}`:`Paseador: ${ii()}`,`Ruta: ${a.rutas||`Pendiente de confirmar`}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,o(`Lesiones`,e.lesiones),o(`Lugar`,e.lugar),``,o(`Antes`,e.antes),o(`Conducta observada`,e.conducta),o(`Qué hice`,e.accion),o(`Después`,e.despues),``,`Protocolo:`,...s].join(`
`)}}function da(e){return qt.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function fa(){let e=Hr(),t=hi({...e,day:e.now.day,iso:e.now.iso,isToday:!0,shift:Vr(e.now)}),n=ji(e.now.iso);return{rutas:t.shown.map(e=>e.ruta).join(`, `),paseador:t.helping?si(t.helping.paseador,n):``}}function pa(e,t){let n=e.dogs.map(e=>w.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:da(e),ruta:fa().rutas,titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function ma(e,t=!1){D.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),A(e)}function ha(e,t){if(D.incidentSavedText===t)return Promise.resolve(null);D.incidentSavedText=t;let n=Hr();return Li(`incidentes`,()=>pa({...e,registroId:Ui().registroId||e.registroId},n)).then(e=>{if(!e)return D.incidentSavedText=``,null;let t=Fr(Cr,null);return t&&Ir(Cr,{...t,registroId:e.id}),ma(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function ga(){let e=Ui(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function _a(){let e=ga();return Ir(Cr,e),e}function va(e){if(!D.previewOpen)return;let t=ua(e,Hr()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),D.previewOpen=!1,D.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=D.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=ca(t.text))}function A(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function ya(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var ba=[`data-pw-from-next`,`data-pw-route`,`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function xa(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=ba.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]${t===`data-pw-step`?`:not([data-pw-from-next])`:``}`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function Sa(){let e=document.activeElement,t=xa(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var Ca=0;function wa(){clearTimeout(Ca),Ca=setTimeout(()=>{document.querySelector(`.pw-shell`)&&Sa()},80)}function j(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function Ta(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function Ea(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:Ta(),block:`start`}),t.focus({preventScroll:!0}))}async function Da(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function Oa(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return Hm(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return D.syncError=``,j(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return Ea(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return D.pickerOpen=!D.pickerOpen,j(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=Rr(),t=n.dataset.pwDay;return D.day=t===e.day?null:t,j(`[data-pw-day="${t}"]`),A(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return D.shift=r.dataset.pwShift,j(`[data-pw-shift="${D.shift}"]`),A(`Mostrando el turno ${D.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return D.day=null,D.shift=null,D.pickerOpen=!1,j(`#pw-today-title`),A(`Mostrando hoy.`),!0;if(e.target.closest(`[data-pw-change-ok]`))return D.routeChange=null,j(`#pw-today-title`),!0;let i=e.target.closest(`[data-pw-route]`);if(i){let e=Hr(),t=i.dataset.pwRoute;return mi(e,t),j(`[data-pw-route="${CSS.escape(t)}"]`),A(t?`Mostrando la ruta ${t}. Queda recordada en este celular.`:`Mostrando todas las rutas del turno.`),!0}let a=e.target.closest(`[data-pw-step]`);if(a){let e=a.dataset.pwStep,t=a.dataset.pwFromNext,n=Hr(),r=_i(n,e);if(!n.isToday||!r?.canSave||!k.ready)return!0;let i=r.dog,o=Di(n.now.iso,n.shift,[i])[e];if(o.noSale||o.step>=E.length)return!0;let s=E[o.step],c=ri(),l={estado:s.estado};if(E.forEach((e,t)=>{t>=o.step||(l[e.field]=o.times[t],o.record?.[`${e.field}Por`]&&(l[`${e.field}Por`]=o.record[`${e.field}Por`],l[`${e.field}PorNombre`]=o.record[`${e.field}PorNombre`]||``))}),l[s.field]=n.now.time,l[`${s.field}Por`]=c.usuario||``,l[`${s.field}PorNombre`]=c.nombre||``,Ri(r,n,l,`${i.name}: ${s.done.toLowerCase()} a las ${n.now.time}.`),t){$();let e=document.querySelector(`[data-pw-from-next="${CSS.escape(t)}"]`)||document.querySelector(`[data-pw-next="${CSS.escape(t)}"]`)?.closest(`section`)?.querySelector(`h2`);e&&!e.hasAttribute(`tabindex`)&&e.tagName===`H2`&&e.setAttribute(`tabindex`,`-1`),e?.focus({preventScroll:!0})}else j(o.step+1>=E.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`);return!0}let o=e.target.closest(`[data-pw-nosale]`);if(o){let e=o.dataset.pwNosale,t=Hr(),n=_i(t,e);return t.isToday&&n?.canSave&&k.ready&&(Ri(n,t,{estado:Er},`${n.dog.name}: no sale en este turno.`),j(`[data-pw-undo="${CSS.escape(e)}"]`)),!0}let s=e.target.closest(`[data-pw-undo]`);if(s){let e=s.dataset.pwUndo,t=Hr(),n=_i(t,e);if(!t.isToday||!n?.canSave||!k.ready)return!0;let r=n.dog,i=Di(t.now.iso,t.shift,[r])[e];if(i.noSale){let a=i.times.reduce((e,t,n)=>t?n+1:e,0);return Ri(n,t,{estado:a?E[a-1].estado:`pendiente`},`${r.name}: se deshizo "no sale".`),j(a>=E.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(!i.step)return!0;let a=i.step-1,o={estado:a?E[a-1].estado:`pendiente`};return E.forEach((e,t)=>{o[e.field]=t<a?i.times[t]:``,t>=a&&(o[`${e.field}Por`]=``,o[`${e.field}PorNombre`]=``)}),Ri(n,t,o,`${r.name}: se deshizo "${E[a].done.toLowerCase()}".`),j(`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(e.target.closest(`[data-pw-equip-all]`))return zi(Hr(),ei.map(e=>e.item)),D.equipStatus=`Equipo completo. ¡A salir!`,j(`[data-pw-equip-reset]`),A(D.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return zi(Hr(),[]),D.equipStatus=`Lista de equipo desmarcada.`,j(`[data-pw-equip-all]`),A(D.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=_a(),t=ua(e,Hr());return D.confirmClear=!1,t.ok?(D.previewOpen=!0,D.incidentStatus=D.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,j(`[data-pw-message]`),A(D.incidentStatus),ha(e,t.text),!0):(D.previewOpen=!1,D.incidentStatus=t.missing.length?`Falta completar: ${Ur(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,j(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),A(D.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=Ui(),t=ua(e,Hr());return t.ok&&ha(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=Ui(),n=ua(t,Hr());return n.ok&&ha(t,n.text),Da(e).then(e=>{D.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=D.incidentStatus,t.classList.toggle(`is-warn`,!e)),A(D.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!D.confirmClear)return D.confirmClear=!0,j(`[data-pw-clear]`),!0;let e=!!Ui().registroId;try{localStorage.removeItem(Cr)}catch{}return D.confirmClear=!1,D.previewOpen=!1,D.incidentSavedText=``,D.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,j(`#pw-incidente`),A(D.incidentStatus),!0}if(D.confirmClear&&!e.target.closest(`[data-pw-clear]`)){D.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=Ui().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function ka(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=Hr(),{checked:n}=Ai(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return zi(e,i),D.equipStatus=i.length>=ei.length?`Equipo completo. ¡A salir!`:``,j(`[data-pw-equip="${CSS.escape(r)}"]`),D.equipStatus&&A(D.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(va(_a()),!0):!1}function Aa(e){e.target.closest?.(`[data-pw-field]`)&&va(_a())}function ja(){_e.push(Oa),ve.push(ka),document.addEventListener(`input`,Aa),$e(e=>{[`paseos`,`checklists`,`incidentes`,`rutas`,`plantillas`,`avisos`].includes(e)&&wa()}),window.addEventListener(`online`,wa),window.addEventListener(`offline`,wa),setInterval(Na,15e3)}var Ma={iso:``,shift:``,minute:-1};function Na(){if(!document.querySelector(`.pw-shell`))return;let e=Rr();e.iso!==Ma.iso||Vr(e)!==Ma.shift?wa():e.minutes!==Ma.minute&&(Ma.minute=e.minutes,document.querySelectorAll(`[data-pw-countdown]`).forEach(t=>{let n=qr(t.dataset.pwCountdown,e.minutes,t.dataset.pwMode);t.textContent=n.text,t.className=`pw-cd pw-cd--${n.kind}`,t.closest(`.pw-next`)?.classList.toggle(`is-late`,n.kind===`late`)}))}var Pa=`America/Argentina/Buenos_Aires`,Fa=[`manana`,`tarde`],Ia=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,La=/(\d[\s.-]?){8,}/,Ra=10,za=15,Ba=[`paseos`,`checklists`,`incidentes`,`plantillas`,`rutas`,`avisos`,`solicitudes`,`observaciones`,`cierres`],Va=7,Ha={admin:`Admin`,supervisor:`Supervisor`,coordinador:`Coordinación`,paseador:`Paseador`,ayudante:`Ayudante de paseador`},Ua=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],Wa=[`no sale`,`agregar perro`,`cambiar hora`,`cambiar paseador o ayudante`,`otro`],Ga={pendiente:{label:`Pendiente`,tone:`warn`},aplicado:{label:`Aplicado`,tone:`ok`},rechazado:{label:`Rechazado`,tone:`danger`}},Ka=nn(),M={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,observationDraft:`paseosJuanSupervisor_observacionBorrador`,avisoDraft:`paseosJuanSupervisor_avisoBorrador`,requestDraft:`paseosJuanSupervisor_pedidoBorrador`},qa={observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},Ja=null,Ya=null,Xa=null,Za=new Map,Qa=new Set,$a=new Set,eo=new Map,to=new Map,no=new Set,ro=new Map,io=new Set,ao=new Map,oo=!1,so=!1,co=null,lo=``,uo=`idle`;function N(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function fo(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function P(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function po(e){try{localStorage.removeItem(e)}catch{}}var mo=8e3;function F(e,t,n=`ok`){Ja={area:e,text:t,tone:n,at:Date.now()}}function ho(e){return Ja&&Date.now()-Ja.at>mo&&(Ja=null),Ja&&Ja.area===e?Ja:null}function go(e){let t=ho(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?N(t.text):``}</p>
  `}function _o(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function vo(e,t,n){return`${e} ${e===1?t:n}`}function yo(e){let t=String(e||``).match(/^(\d{1,2}):(\d{2})/);return t?Number(t[1])*60+Number(t[2]):null}function bo(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function xo(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function So(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Pa,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:C[(n+6)%7]}}function Co(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function wo(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:b}function To(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function Eo(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Pa,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Do(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:y(t)}function Oo(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function ko(e){return e.minutes<810?`manana`:`tarde`}function Ao(e){let t=xo(e);return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function jo(e,t){let n=S[e];return t.minutes<yo(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=yo(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function Mo(){return _.user()||{}}function No(e){let t=Mo();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function Po(e,t){if(!e)return``;if(t?.actualizadoPor===e&&t.actualizadoPorNombre)return t.actualizadoPorNombre;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=Mo();if(n.usuario===e&&n.nombre)return n.nombre;let r=zt.find(t=>t.id===e);if(r)return r.name;for(let t of[`checklists`,`paseos`,`incidentes`])for(let n of Ro(t)){if(n.creadoPor===e&&n.creadoPorNombre)return n.creadoPorNombre;if(n.actualizadoPor===e&&n.actualizadoPorNombre)return n.actualizadoPorNombre}return e}function Fo(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=Po(e.actualizadoPor||e.creadoPor,e),r=Eo(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function Io(e){let t=y();return e===`plantillas`||e===`avisos`?{}:e===`observaciones`?{desde:Co(t,-6)}:e===`solicitudes`?{desde:Co(t,-2)}:{desde:t}}function Lo(){_.token()&&Ba.forEach(e=>{let t=Io(e),n=`${e}|${t.desde||``}`;io.has(n)||(io.add(n),e===`solicitudes`&&Yo(),v.watch(e,t),v.list(e,t).then(()=>{no.add(e),ro.delete(e)}).catch(t=>{no.add(e),ro.set(e,t?.message||`No se pudieron traer los datos.`)}).finally(qo))})}function Ro(e){let t=new Map(v.cached(e,Io(e)).map(e=>[e.id,e]));return eo.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function zo(e,t,n,r,i=`ok`){if(!t.id)return Bo(e,t,n,r,i);let a=`${e}:${t.id}`,o=(to.get(a)||Promise.resolve()).then(()=>Bo(e,t,n,r,i));return to.set(a,o),o.then(()=>{to.get(a)===o&&to.delete(a)}),o}async function Bo(e,t,n,r,i){try{let a=await v.save(e,t);if(a.pendiente)F(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=eo.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&eo.set(t,a),F(n,r,i)}return a}catch(e){return F(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function Vo(e,t,n,r){try{return await v.remove(e,t),eo.delete(`${e}:${t}`),F(n,r,`info`),!0}catch(e){return F(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function Ho(e=!0){if(!_.token())return;let t=await Promise.allSettled(Ba.map(e=>v.list(e,Io(e))));if(t.forEach((e,t)=>{no.add(Ba[t]),e.status===`rejected`?ro.set(Ba[t],e.reason?.message||`No se pudieron traer los datos.`):ro.delete(Ba[t])}),!e)return;let n=t.find(e=>e.status===`rejected`);n?F(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?F(`sync`,`Datos actualizados a las ${So().time} hs.`):F(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),I(`sv-refresh`)}function Uo(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function Wo(){co=null,Uo()&&document.querySelector(`.sv-shell`)&&Ko()}function Go(){let e=fo(M.folds,{}),t=!1;document.querySelectorAll(`.sv-shell [data-sv-fold]`).forEach(n=>{e[n.dataset.svFold]!==n.open&&(e[n.dataset.svFold]=n.open,t=!0)}),t&&P(M.folds,e),document.querySelectorAll(`.sv-shell [data-sv-stop-more]`).forEach(e=>{e.open?Qa.add(e.dataset.svStopMore):Qa.delete(e.dataset.svStopMore)})}function Ko(){Go();let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>2&&window.scrollTo(0,r),!t)return;let i=document.getElementById(t);if(i&&(i.focus({preventScroll:!0}),n&&typeof i.setSelectionRange==`function`))try{i.setSelectionRange(n[0],n[1])}catch{}}function qo(){co||=setTimeout(Wo,40)}function Jo(){Uo()&&document.querySelector(`.sv-shell`)&&So().time!==lo&&document.activeElement?.tagName!==`SELECT`&&Ko()}function Yo(){oo||=(Ro(`solicitudes`).forEach(e=>ao.set(e.id,e.estado||`pendiente`)),!0)}function Xo(){let e=Mo().usuario,t=[];if(Ro(`solicitudes`).forEach(n=>{let r=n.estado||`pendiente`,i=ao.get(n.id);oo&&i&&i!==r&&r!==`pendiente`&&n.creadoPor===e&&t.push(n),ao.set(n.id,r)}),!t.length)return;let n=t.filter(e=>e.estado===`aplicado`);F(`requests`,`El coordinador ${t.map(e=>`${e.estado===`aplicado`?`aplicó`:`rechazó`} «${Ds(e)}»${e.respuesta?`: ${e.respuesta}`:``}`).join(` · `)}.${n.length?` La ruta ya muestra el cambio.`:``}`,n.length?`ok`:`info`),n.length&&(v.list(`rutas`,Io(`rutas`)).catch(()=>{}),v.list(`plantillas`,Io(`plantillas`)).catch(()=>{}))}function Zo(){so||(so=!0,$e(e=>{Ba.includes(e)&&(no.add(e),e===`solicitudes`&&Xo(),qo())}),window.addEventListener(`online`,qo),window.addEventListener(`offline`,qo),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Uo()&&Ho(!1)}),setInterval(Jo,1e4))}function Qo(){try{return Object.values(qa).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function $o(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=as(e.dogId),n=To(e.fecha)||Do(Oo(e.id))||y();return{id:bo(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:S[e.shift]?.label||``,titulo:`Observación: ${t?t.name:b}`,autorAnterior:e.autor||``,migrado:!0}}async function es(e,t){try{return await v.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function ts(){if(uo!==`idle`||!_.token()||!Qo()||!navigator.onLine)return;uo=`running`;let e=0,t=0,n=``,r=fo(qa.observations,[]),i=[];for(let a of r){let r=$o(a);if(!r)continue;let o=await es(`observaciones`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?P(qa.observations,i):po(qa.observations);let a=fo(qa.closure,{}),o=Object.entries(a).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&Fa.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(o.length){let r=o.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await v.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,s]of o){let[o,c]=a.split(`|`),l=`${o}_${c}`;if(i.has(l))continue;let u=await es(`cierres`,{id:l,fecha:o,turno:S[c].label,notas:String(s.notas||``),resumen:``,cerrado:!!s.cerrado,horaCierre:s.cerrado?String(s.cerrado):``,migrado:!0});u?(r[a]=s,t+=1,n=u):e+=1}Object.keys(r).length?P(qa.closure,r):po(qa.closure)}else t+=o.length}else po(qa.closure);uo=`done`,(e||t)&&F(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),qo()}function ns(){let e=So(),t=fo(M.view,{}),n=ko(e),r=t.date===e.iso&&Fa.includes(t.shift)?t.shift:n;return{day:e.dayName,shift:r,now:e,isToday:!0,isCurrent:r===n,fecha:e.iso,fechaLabel:e.label}}function rs(e){P(M.view,{date:So().iso,shift:e})}function is(e,t=!1){let n=fo(M.folds,{});return typeof n[e]==`boolean`?n[e]:t}function as(e){return w.find(t=>t.id===e)}function os(e){let t=xo(e);return w.find(e=>xo(e.name)===t)}function ss(e){return(e?.safety||[]).some(e=>/bozal/i.test(e))}function cs(e){return(e?.safety||[]).find(e=>/bozal/i.test(e))||``}function ls(e,t){return xo(e)===xo(t)}function us(e){let t=e.perroId&&as(e.perroId)||e.perroNombre&&os(e.perroNombre)||null,n=Number(e.minutos)||t?.minutes||null;return{perroId:t?.id||e.perroId||``,perroNombre:e.perroNombre||t?.name||`Pendiente de confirmar`,hora:yo(e.hora)===null?``:String(e.hora).slice(0,5),minutos:n,nota:e.nota||``,dog:t}}function ds(e,t){let n=Array.isArray(e.paradas)?e.paradas:Array.isArray(e.perros)?e.perros.map(e=>({perroId:e,perroNombre:as(e)?.name||e,hora:``})):[];return{code:e.ruta||e.id||`Pendiente de confirmar`,source:t,record:e,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,stops:n.map(us)}}function fs(e){let t=new Map;Ro(`plantillas`).filter(t=>ls(t.dia,e.day)&&Ao(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,ds(e,`plantilla`))),Ro(`rutas`).filter(t=>t.fecha===e.fecha&&Ao(t.turno)===e.shift).forEach(e=>t.set(e.ruta||e.id,ds(e,`dia`)));let n=!(no.has(`plantillas`)&&no.has(`rutas`)),r=!1;return t.size||(Ka.filter(t=>ls(t.dia,e.day)&&Ao(t.turno)===e.shift).forEach(e=>t.set(e.ruta,ds(e,`planilla`))),r=t.size>0),{routes:[...t.values()].sort((e,t)=>e.code.localeCompare(t.code)),fallback:r,loading:n}}function ps(e){return e.source===`dia`?`Cambio del día (coordinador)`:e.source===`plantilla`?`Plantilla semanal (coordinador)`:`Planilla RPJ (respaldo)`}function ms(e){let t=new Map;return e.forEach(e=>e.stops.forEach(e=>{e.dog&&!t.has(e.dog.id)&&t.set(e.dog.id,e.dog)})),[...t.values()]}function hs(e,t,n){return`${e}_${t}_${n}`}function gs(){return new Map(Ro(`paseos`).map(e=>[e.id,e]))}function _s(e,t,n){let r=t?.estado||`pendiente`,i=yo(e.hora),a=Number(e.minutos)||null,o=yo(t?.horaRetiro),s=[`retirado`,`paseando`,`entregado`].includes(r),c=o??i,l=s&&o!==null&&i!==null?o-i:0,u=l>Ra,d={estado:r,retirado:s,record:t,pickupDelay:l,pickupLate:u,planned:i,minutos:a};if(r===`no-sale`)return{...d,kind:`nosale`,label:`No sale`,tone:`neutral`,live:`nosale`};if(r===`entregado`){let e=yo(t?.horaEntrega),n=e!==null&&c!==null?e-c:null,r=n!==null&&a?n>a+za:!1;return{...d,kind:`entregado`,label:`Entregado${t?.horaEntrega?` ${t.horaEntrega}`:``}`,tone:`ok`,live:`entregado`,duration:n,deliveryLate:r,late:u||r}}if(s){let e=c===null?null:n-c;if(e!==null&&a&&e>a+za)return{...d,kind:`demorada`,label:`Entrega demorada ${e-a} min`,tone:`danger`,live:`atrasado`,walked:e,late:!0};let i=r===`paseando`?`Paseando`:`Retirado${t?.horaRetiro?` ${t.horaRetiro}`:``}`;return{...d,kind:`curso`,label:i,tone:`info`,live:`atiempo`,walked:e,late:u}}if(i===null)return{...d,kind:`sinhora`,label:`Hora sin confirmar`,tone:`neutral`,live:`atiempo`};let f=n-i;return f>Ra?{...d,kind:`atrasado`,label:`Atrasado ${f} min`,tone:`danger`,live:`atrasado`,delay:f,late:!0}:f>=0?{...d,kind:`ahora`,label:`Retirar ahora`,tone:`warn`,live:`atiempo`,delay:f}:{...d,kind:`espera`,label:`Retira ${e.hora}`,tone:`neutral`,live:`atiempo`}}function vs(e,t,n=gs()){return t.stops.map(t=>{let r=t.perroId?hs(e.fecha,t.perroId,e.shift):``;return{stop:t,id:r,status:_s(t,r?n.get(r):null,e.now.minutes)}})}function ys(e){let t={atiempo:0,atrasado:0,entregado:0,nosale:0};return e.forEach(({status:e})=>{t[e.live]+=1}),t}function bs(e,t){return Ro(`checklists`).filter(n=>n.fecha===e&&(Ao(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function xs(e,t,n){return n&&bs(e,t).find(r=>r.id===`${e}_${n}_${t}`||r.creadoPor===n)||null}function Ss(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>Cs(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:Po(e.creadoPor||e.actualizadoPor,e),at:Eo(e.actualizadoEn||e.creadoEn)}}function Cs(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):b}function ws(e){return Ro(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function Ts(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>as(e)?.name||e);return t.length?_o(t):b}function Es(e){return Ro(`avisos`).filter(t=>(t.vigenteHasta?t.vigenteHasta>=e:t.fecha===e)&&(!t.fecha||t.fecha<=e)).sort((e,t)=>Number(t.tipo===`seguridad`)-Number(e.tipo===`seguridad`)||String(t.fecha||``).localeCompare(String(e.fecha||``)))}function Ds(e){return`${e.tipo||`Cambio`}${e.perroNombre?` · ${e.perroNombre}`:``}${e.ruta?` · ${e.ruta}`:``}`}function Os(e,t){return Ro(`solicitudes`).filter(n=>n.fecha===e&&Ao(n.turno)===t)}function ks(e){let t=Mo().usuario;return Ro(`solicitudes`).filter(n=>(n.creadoPor?n.creadoPor===t:n.pendiente)&&(n.fecha>=e||(n.estado||`pendiente`)===`pendiente`)).sort((e,t)=>String(t.creadoEn||`9`).localeCompare(String(e.creadoEn||`9`)))}function As(e,t=``,n=``,r=!1){let i=n?as(n):null;return{fecha:e.fecha,shift:e.shift,ruta:t,perroId:i?.id||``,perroNombre:i?.name||``,tipo:i?`no sale`:`otro`,detalle:``,motivo:``,urgente:!1,open:r}}function js(e){let t=fo(M.requestDraft,{});return t.fecha!==e.fecha||t.shift!==e.shift?As(e):{...As(e),...t}}function Ms(e){let t=new Set,n=[];return e.forEach(r=>{let i=new Set(r.stops.map(e=>e.dog?.name).filter(Boolean));r.stops.forEach(({dog:a})=>{(a?.incompatibleWith||[]).forEach(o=>{let s=[a.name,o].sort().join(`|`);if(t.has(s))return;let c=i.has(o)?r:e.find(e=>e.stops.some(e=>e.dog?.name===o));c&&(t.add(s),n.push({a:a.name,b:o,sameRoute:c===r,route:r.code,otherRoute:c.code}))})})}),n.sort((e,t)=>Number(t.sameRoute)-Number(e.sameRoute))}function Ns(e){let t=ms(e),n=Ms(e),r=t.filter(ss),i=t.filter(e=>e.status!==`Activo`),a=t.filter(e=>e.review&&e.status===`Activo`),o=t.filter(e=>e.category===`SIN EVALUAR`),s=e.flatMap(e=>e.stops.filter(e=>!e.dog).map(t=>`${t.perroNombre} (${e.code})`)),c=[];return n.length&&c.push({tone:`danger`,icon:`alertTriangle`,title:n.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${n.length} parejas que no pueden ir juntas`,lines:n.map(e=>`No juntar: ${e.a} con ${e.b}${e.sameRoute?` (los dos en ${e.route})`:` (${e.route} y ${e.otherRoute}: que no se crucen)`}.`),action:n.some(e=>e.sameRoute)?`Que no caminen juntos. Si la ruta los junta, pedile el cambio al coordinador.`:`Que los paseadores no se crucen con esos perros.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),r.length&&c.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${vo(r.length,`perro`,`perros`)}`,lines:r.map(e=>`${e.name}: ${cs(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),i.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${i.length===1?`sale ${i[0].name}`:`salen ${i.length} perros`}`,lines:i.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),s.length&&c.push({tone:`warn`,icon:`alertCircle`,title:`${vo(s.length,`perro de la ruta no tiene`,`perros de la ruta no tienen`)} ficha`,lines:s.map(e=>`${e}: ${b}.`),action:`No se puede marcar el retiro desde acá. Pedile al coordinador que lo revise.`,source:`Fuente: rutas del coordinador y registro de perros.`}),a.length&&c.push({tone:`info`,icon:`fileText`,title:`${vo(a.length,`perro tiene`,`perros tienen`)} datos a revisar`,lines:a.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${Rt}.`}),o.length>1&&c.push({tone:`info`,icon:`eye`,title:`${o.length} perros salen en grupo SIN EVALUAR`,lines:[`${Wt[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),c}var Ps=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function Fs(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function Is(e){return{...Fs(e),...fo(M.observationDraft,{})}}function Ls(){let e=Io(`observaciones`).desde;return Ro(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function Rs(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${Mo().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function zs(e){return[`Observación de conducta — ${x.name}`,`Perro: ${e.perroNombre||as(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${wo(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${Rs(e)}`].join(`
`)}function Bs(e){return`${e.fecha}_${e.shift}`}function Vs(e){return Ro(`cierres`).find(t=>t.id===Bs(e))||null}function Hs(e){return Xa&&Xa.id===Bs(e)?Xa.notas:Vs(e)?.notas||``}function Us(e,t){return e?Po(e,t):``}function Ws(e,t){let n=gs(),r=t.flatMap(t=>vs(e,t,n).map(e=>({...e,route:t}))),i=r.filter(e=>e.status.kind!==`nosale`);return{items:r,going:i,late:i.filter(e=>e.status.late),onTime:i.filter(e=>!e.status.late),noSale:r.filter(e=>e.status.kind===`nosale`),delivered:i.filter(e=>e.status.kind===`entregado`),notPicked:i.filter(e=>!e.status.retirado),notDelivered:i.filter(e=>e.status.retirado&&e.status.kind!==`entregado`)}}function Gs(e){let{stop:t,status:n}=e,r=[];return n.kind===`atrasado`&&r.push(`sin retiro, previsto ${t.hora} (${n.delay} min)`),n.pickupLate&&r.push(`retiro previsto ${t.hora}, retirado ${n.record?.horaRetiro} (+${n.pickupDelay} min)`),n.kind===`demorada`&&r.push(`entrega demorada: ${n.walked} min de ${n.minutos} previstos`),n.deliveryLate&&r.push(`entrega demorada: ${n.duration} min de ${n.minutos} previstos`),`${t.perroNombre} (${r.join(`; `)||`con atraso`})`}function Ks(e,t){let n=S[e.shift],{routes:r,fallback:i}=fs(e),a=Ws(e,r),o=t||Vs(e),s=Ms(r),c=ms(r).filter(ss),l=Ls().filter(t=>t.fecha===e.fecha&&Ao(t.turno)===e.shift),u=ws(e.fecha),d=Os(e.fecha,e.shift),f=Hs(e),p=Mo(),m=qs(e,r),h=e=>e.length?e.map(e=>e.stop.perroNombre).join(`, `):`ninguno`,ee=[`Cierre de turno — ${x.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisó: ${p.nombre||`Pendiente de confirmar`}`,`Rutas${i?` (tomadas de la planilla RPJ)`:``}:`,...r.map(e=>`- ${e.code}: paseador ${Us(e.paseador)||`Pendiente de confirmar`}${e.ayudante?`, ayudante ${Us(e.ayudante)}`:``} · ${vo(e.stops.length,`perro`,`perros`)}`),`Cumplimiento: ${a.onTime.length} a tiempo · ${a.late.length} con atraso · ${a.noSale.length} no salieron (de ${a.items.length} previstos)`,`- Con atraso: ${a.late.length?a.late.map(Gs).join(`; `):`ninguno`}`,`- No salieron: ${h(a.noSale)}`,`- Sin retiro marcado: ${h(a.notPicked)}`,`- Sin entrega marcada: ${h(a.notDelivered)}`,`Entregados: ${a.delivered.length} de ${a.going.length}`,`Checklist del equipo: ${m.length?m.map(e=>`${e.name}: ${e.checklist?Ss(e.checklist).complete?`equipo completo`:`incompleto${Ss(e.checklist).missing.length?` (falta ${Ss(e.checklist).missing.join(`, `)})`:``}`:`sin cargar`}`).join(`; `):`sin equipo asignado`}`,`Incidentes del día: ${u.length?u.map(e=>`${e.hora||`sin hora`} ${e.titulo||Ts(e)}`).join(`; `):`ninguno cargado`}`,`Pedidos de cambio al coordinador: ${d.length?d.map(e=>`${Ds(e)} (${Ga[e.estado]?.label||`Pendiente`})`).join(`; `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${s.length?s.map(e=>`${e.a} con ${e.b}`).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${c.length?c.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${l.length}`,`Notas del supervisor: ${f.trim()||`sin notas`}`];return o?.cerrado&&ee.push(`Turno cerrado a las ${o.horaCierre||Eo(o.actualizadoEn)||`Pendiente de confirmar`} hs por ${Po(o.actualizadoPor,o)||`Pendiente de confirmar`}.`),ee.join(`
`)}function qs(e,t){let n=new Map,r=(e,t,r)=>{if(!e)return;let i=n.get(e)||{usuario:e,name:Po(e),roles:[]};i.roles.push(`${t} ${r}`),n.set(e,i)};return t.forEach(e=>{r(e.paseador,`Paseador`,e.code),r(e.ayudante,`Ayudante`,e.code)}),bs(e.fecha,e.shift).forEach(e=>{let t=e.creadoPor||String(e.id).split(`_`)[1];t&&!n.has(t)&&n.set(t,{usuario:t,name:Po(t,e),roles:[`Sin ruta asignada`]})}),[...n.values()].map(t=>({...t,checklist:xs(e.fecha,e.shift,t.usuario)}))}function Js(e){return`
    <div class="sv-shell">
      ${Ys()}
      ${e}
    </div>
  `}function Ys(){let e=Mo();return`
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
          <strong>${N(e.nombre||`Pendiente de confirmar`)}</strong>
          <small>${N(Ha[e.rol]||e.rol||``)}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${g(`logOut`,`sv-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function Xs(){Lo();let e=ns();lo=e.now.time;let t=fs(e),n=`
    <main class="sv-main" id="sv-main">
      ${Zs()}
      ${Qs(e)}
      ${ec(e,t)}
      ${nc(e)}
      ${rc(e,t.routes)}
      ${sc(e,t)}
      ${pc(e)}
      ${mc(e,ms(t.routes))}
      ${gc(e)}
      ${_c()}
    </main>
  `;return uo===`idle`&&Qo()&&setTimeout(ts,0),n}function Zs(){let e=v.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=[...new Set(ro.values())],r=t||e||n.length?`warn`:`ok`,i=`${e} cambio${e===1?` espera`:`s esperan`} señal para enviarse.`,a=t?`Sin señal: ves lo último guardado en este teléfono.${e?` ${i}`:``}`:e?i:n.length?`No se pudieron traer algunos datos: ${n.join(` `)}`:`Datos compartidos con el equipo. Se actualizan solos.`;return`
    <section class="sv-sync is-${r}" aria-label="Estado de los datos">
      <p class="sv-sync-text" aria-live="polite">${g(r===`ok`?`radio`:`uploadCloud`,`sv-icon`)} <span>${N(a)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${go(`sync`)}
    </section>
  `}function Qs(e){let t=ws(e.fecha);return t.length?`
    <section class="sv-card sv-incidents" aria-labelledby="sv-incidents-title">
      <div class="sv-section-head">
        <h2 id="sv-incidents-title" class="sv-title">${g(`alertTriangle`,`sv-icon`)} ${t.length===1?`Hay 1 incidente cargado hoy`:`Hay ${t.length} incidentes cargados hoy`}</h2>
        <p>${t.length===1?`Revisalo`:`Revisalos`} antes de seguir con el turno.</p>
      </div>
      <ul class="sv-incident-list">
        ${t.map(e=>`
          <li class="sv-incident">
            <div class="sv-saved-head">
              <strong>${N(e.titulo||`Incidente`)}</strong>
              <span>${e.hora?`${N(e.hora)} hs · `:``}${N(Ts(e))}${e.lugar?` · ${N(e.lugar)}`:``}${e.barrio?` · ${N(e.barrio)}`:``}</span>
            </div>
            ${e.riesgo||e.lesiones?`
              <p class="sv-chips">
                ${e.riesgo?`<span class="sv-tag is-danger">Riesgo: ${N(e.riesgo)}</span>`:``}
                ${e.lesiones?`<span class="sv-tag is-warn">Lesiones: ${N(e.lesiones)}</span>`:``}
              </p>
            `:``}
            <dl class="sv-obs-detail">
              ${[[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Protocolo`,e.protocolo]].filter(([,e])=>e).map(([e,t])=>`<div><dt>${e}</dt><dd>${N(t)}</dd></div>`).join(``)}
            </dl>
            <p class="sv-source">${N(Fo(e,`Cargó`))}</p>
          </li>
        `).join(``)}
      </ul>
    </section>
  `:``}function $s(e,t){let n=qs(e,t),r=e.now.minutes>=yo(S[e.shift].from);return n.length?`
    <div class="sv-team">
      <h2 class="sv-subtitle">Equipo del turno: checklist de salida</h2>
      <ul class="sv-team-list">
        ${n.map(e=>{let t=e.checklist?Ss(e.checklist):null,n=t?e.checklist.pendiente?`info`:t.complete?`ok`:`danger`:r?`warn`:`info`,i=t?t.complete?`Salió con el equipo completo.`:`Equipo incompleto${t.missing.length?`. Falta: ${t.missing.join(`, `)}`:``}.`:`Todavía no cargó el checklist.`;return`
            <li class="sv-note is-${n}">
              ${g(t?.complete?`checkCircle`:`alertTriangle`,`sv-icon`)}
              <strong>${N(e.name)}</strong> <small>(${N(e.roles.join(`, `))})</small>:
              ${N(i)} ${t?.at?`<small>${N(t.at)} hs</small>`:``}
            </li>
          `}).join(``)}
      </ul>
    </div>
  `:`<p class="sv-note is-info"><strong>Equipo del turno:</strong> ${b}. La ruta no tiene paseador asignado y nadie cargó el checklist.</p>`}function ec(e,t){let n=S[e.shift],r=jo(e.shift,e.now),i=Mo(),a=t.routes.flatMap(t=>vs(e,t)),o=ys(a),s=t.routes.map(e=>e.supervisor).filter(Boolean),c=[...new Set(s)].join(` y `)||n.supervisor;return`
    <section class="sv-hero sv-now" aria-labelledby="sv-now-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">Ahora · ${N(e.day)} ${e.now.label} · ${e.now.time} hs</p>
          <h1 id="sv-now-title">Turno ${n.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${n.from} a ${n.to} hs
            <span class="sv-moment is-${r.tone}">${r.label}</span>
          </p>
          <p class="sv-source">Supervisa ${N(i.nombre||`Pendiente de confirmar`)}${c&&c!==i.nombre?` · Según la ruta: ${N(c)}`:``}.</p>
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno de hoy">
            ${Fa.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${S[t].label}
                <small>${t===ko(e.now)?`Turno actual`:`${S[t].from} a ${S[t].to}`}</small>
              </button>
            `).join(``)}
          </div>
        </div>
      </div>

      ${e.isCurrent?``:`<p class="sv-note is-info">Estás mirando el turno ${n.label.toLowerCase()} de hoy. El turno actual es el de la ${S[ko(e.now)].label.toLowerCase()}.</p>`}

      <div class="sv-counter" role="status" aria-live="polite" aria-label="Cumplimiento del turno">
        <p class="sv-counter-line">
          <span class="sv-count is-ok"><b>${o.atiempo}</b> a tiempo</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count ${o.atrasado?`is-danger`:``}"><b>${o.atrasado}</b> ${o.atrasado===1?`atrasado`:`atrasados`}</span>
          <span class="sv-count-sep" aria-hidden="true">·</span>
          <span class="sv-count"><b>${o.entregado}</b> ${o.entregado===1?`entregado`:`entregados`}</span>
        </p>
        <p class="sv-source">${vo(a.length,`perro previsto`,`perros previstos`)}${o.nosale?` · ${o.nosale} no ${o.nosale===1?`sale`:`salen`}`:``} · Atrasado: pasó la hora de retiro + ${Ra} min. Entrega demorada: el paseo superó lo previsto + ${za} min. Se recalcula cada minuto.</p>
      </div>

      ${t.fallback?`
        <p class="sv-note is-warn">${g(`alertCircle`,`sv-icon`)} <strong>Rutas tomadas de la planilla.</strong> ${t.loading?`Cargando las rutas del coordinador…`:`El coordinador todavía no cargó en la app la ruta de ${N(e.day.toLowerCase())} a la ${n.label.toLowerCase()}.`} Paseador y ayudante: ${b}.</p>
      `:``}

      ${$s(e,t.routes)}
    </section>
  `}function tc(e){return{barrio:``,tipo:Ua[0],mensaje:``,vigenteHasta:e.fecha,...fo(M.avisoDraft,{})}}function nc(e){let t=Es(e.fecha),n=tc(e),r=is(`aviso-form`);return`
    <section class="sv-card sv-avisos" aria-labelledby="sv-avisos-title">
      <div class="sv-section-head">
        <h2 id="sv-avisos-title" class="sv-title">${g(`mapPin`,`sv-icon`)} Avisos por barrio vigentes</h2>
        <p>${t.length?`Lo que el equipo tiene que saber hoy en cada barrio.`:no.has(`avisos`)?`No hay avisos vigentes.`:`Cargando avisos…`}</p>
      </div>
      ${t.length?`
        <ul class="sv-aviso-list">
          ${t.map(e=>`
            <li class="sv-aviso ${e.tipo===`seguridad`||e.tipo===`perro suelto`?`is-danger`:``}">
              <div class="sv-saved-head">
                <strong>${N(e.barrio||`Pendiente de confirmar`)}</strong>
                <span class="sv-tag ${e.tipo===`seguridad`||e.tipo===`perro suelto`?`is-danger`:`is-warn`}">${N(e.tipo||`otro`)}</span>
              </div>
              <p>${N(e.mensaje||``)}</p>
              <p class="sv-source">${e.vigenteHasta?`Vigente hasta ${N(wo(e.vigenteHasta))}`:`Vigente hoy`} · ${N(Fo(e,`Cargó`))}</p>
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
              <input type="text" id="sv-aviso-barrio" data-sv-aviso="barrio" list="sv-barrios" value="${N(n.barrio)}" autocomplete="off" required />
              <datalist id="sv-barrios">${rn.map(e=>`<option value="${N(e)}"></option>`).join(``)}</datalist>
            </label>
            <label class="sv-field" for="sv-aviso-tipo">Tipo
              <select id="sv-aviso-tipo" data-sv-aviso="tipo">
                ${Ua.map(e=>`<option value="${e}" ${e===n.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
              </select>
            </label>
          </div>
          <label class="sv-field" for="sv-aviso-mensaje">Qué pasa
            <span class="sv-field-hint" id="sv-aviso-mensaje-hint">Ej.: corte de calle en la entrada sur hasta las 12. Entrar por la otra puerta.</span>
            <textarea id="sv-aviso-mensaje" rows="2" data-sv-aviso="mensaje" aria-describedby="sv-aviso-mensaje-hint" required>${N(n.mensaje)}</textarea>
          </label>
          <label class="sv-field sv-field-short" for="sv-aviso-hasta">Vigente hasta
            <input type="date" id="sv-aviso-hasta" data-sv-aviso="vigenteHasta" value="${N(n.vigenteHasta)}" min="${e.fecha}" required />
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-aviso-save">${g(`send`,`sv-icon`)} Publicar aviso</button>
          </div>
        </form>
      </details>
      ${go(`aviso`)}
    </section>
  `}function rc(e,t){if(!t.some(e=>e.stops.length))return``;let n=Ns(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${g(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Bozales e incompatibles primero. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>ic(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos-detector" ${is(`avisos-detector`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>ic(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function ic(e,t){return`
    <li class="sv-warning is-${e.tone}">
      <div class="sv-warning-head">
        ${t?`<span class="sv-rank" aria-label="Prioridad ${t}">${t}</span>`:`<span class="sv-warning-icon">${g(e.icon,`sv-icon`)}</span>`}
        <h3>${N(e.title)}</h3>
      </div>
      <ul class="sv-warning-lines">
        ${e.lines.map(e=>`<li>${N(e)}</li>`).join(``)}
      </ul>
      <p class="sv-warning-action"><strong>Qué hacer:</strong> ${N(e.action)}</p>
      <p class="sv-source">${N(e.source)}</p>
    </li>
  `}function ac(e){let t=e.dog,n=(t?.safety||[]).map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?N(e):`<b>${N(e)}</b>`}</li>`});if(e.nota&&!(t?.safety||[]).some(t=>xo(t).includes(xo(e.nota)))){let t=/no juntar/i.test(e.nota)?`danger`:/bozal/i.test(e.nota)?`warn`:`info`;n.push(`<li class="sv-chip is-${t}"><b>Ruta:</b> ${N(e.nota)}</li>`)}return t&&t.status!==`Activo`&&n.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${N(t.status)}</li>`),t||n.unshift(`<li class="sv-chip is-danger"><b>Sin ficha:</b> ${b}</li>`),n.length?`<ul class="sv-chips" aria-label="Avisos de ${N(e.perroNombre)}">${n.join(``)}</ul>`:``}function oc(e,t,n){let r=Mo(),i=S[e.shift],a=Us(t.paseador),o=n.filter(e=>e.status.live===`atrasado`),s=ys(n),c=[`Hola${a?` ${a}`:``}, te escribe ${r.nombre||`el supervisor`} (supervisión ${x.name}).`,`Ruta ${t.code}, turno ${i.label.toLowerCase()} ${e.fechaLabel}: ${s.entregado} entregados de ${n.length-s.nosale}.`];return o.length?(c.push(`Veo atrasados: ${o.map(e=>`${e.stop.perroNombre} (${e.status.kind===`demorada`?`entrega demorada`:`retiro ${e.stop.hora}`}, ${e.status.label.replace(/^\D+/,``)})`).join(`; `)}.`),c.push(`¿Cómo vienen? Avisame si necesitás ayuda.`)):c.push(`¿Cómo vienen? Avisame cualquier cosa.`),c.join(`
`)}function sc(e,t){let{routes:n}=t;if(!n.length)return`
      <section class="sv-card" aria-labelledby="sv-routes-title">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno</h2>
        <p class="sv-empty">${t.loading?`Cargando rutas…`:`No hay rutas cargadas para ${N(e.day.toLowerCase())} a la ${S[e.shift].label.toLowerCase()} (ni en la app ni en la planilla).`}</p>
        ${uc(e,``,``,`Pedir una ruta al coordinador`)}
        ${fc(e,``,``)}
      </section>
    `;let r=gs(),i=new Set(n.flatMap(e=>e.stops.map(e=>e.perroId)).filter(Boolean)),a=Ro(`paseos`).filter(t=>t.fecha===e.fecha&&String(t.id).endsWith(`_${e.shift}`)&&t.perroId&&!i.has(t.perroId));return`
    <section class="sv-routes" aria-labelledby="sv-routes-title">
      <div class="sv-section-head sv-routes-head">
        <h2 id="sv-routes-title" class="sv-title">${g(`route`,`sv-icon`)} Rutas del turno: retiro y entrega</h2>
        <p>Las arma el coordinador. Vos controlás que se cumplan. Si hay que cambiar algo, pedíselo con «Pedir cambio al coordinador».</p>
      </div>
      ${n.map(t=>cc(e,t,r)).join(``)}
      ${a.length?`
        <div class="sv-card">
          <h3 class="sv-subtitle">Marcados fuera de la ruta</h3>
          <ul class="sv-extra-list">
            ${a.map(e=>`<li class="sv-note is-info"><strong>${N(e.perroNombre||e.perroId)}</strong>: ${N(e.estado||`pendiente`)}. ${N(Fo(e))}</li>`).join(``)}
          </ul>
        </div>
      `:``}
    </section>
  `}function cc(e,t,n){let r=vs(e,t,n),i=ys(r),a=Us(t.paseador),o=Us(t.ayudante),s=Os(e.fecha,e.shift).filter(e=>e.ruta===t.code&&!e.perroId),c=`control-${t.code}`;return`
    <article class="sv-card sv-route-card" aria-labelledby="sv-route-${bo(t.code)}">
      <div class="sv-route-head">
        <div>
          <h3 id="sv-route-${bo(t.code)}" class="sv-route-title"><span class="sv-route-code">${N(t.code)}</span> ${vo(t.stops.length,`perro`,`perros`)}</h3>
          <p class="sv-route-people">
            <span>${g(`userCheck`,`sv-icon`)} Paseador: <strong>${N(a||`Pendiente de confirmar`)}</strong></span>
            <span>${g(`users`,`sv-icon`)} Ayudante: <strong>${N(o||(t.source===`planilla`?`Pendiente de confirmar`:`sin ayudante`))}</strong></span>
          </p>
          <p class="sv-source">${N(ps(t))}${t.record.actualizadoEn&&t.source!==`planilla`?` · ${N(Fo(t.record,`Último cambio de`))}`:``}</p>
          ${t.notas?`<p class="sv-hint">Notas de la ruta: ${N(t.notas)}</p>`:``}
        </div>
        <p class="sv-route-counts">
          <span class="sv-tag is-ok">${i.atiempo} a tiempo</span>
          <span class="sv-tag ${i.atrasado?`is-danger`:`is-neutral`}">${vo(i.atrasado,`atrasado`,`atrasados`)}</span>
          <span class="sv-tag is-neutral">${vo(i.entregado,`entregado`,`entregados`)}</span>
        </p>
      </div>
      <div class="sv-actions">
        <a class="sv-button" id="sv-wa-${bo(t.code)}" href="https://wa.me/?text=${encodeURIComponent(oc(e,t,r))}" target="_blank" rel="noopener noreferrer">
          ${g(`message`,`sv-icon`)} ${a?`Escribirle a ${N(a)} por WhatsApp`:`Escribir al paseador por WhatsApp`}
        </a>
        ${uc(e,t.code,``,`Pedir cambio al coordinador`)}
      </div>
      ${dc(s)}
      ${fc(e,t.code,``)}
      ${go(c)}
      <ol class="sv-stop-list">
        ${r.map(n=>lc(e,t,n)).join(``)}
      </ol>
    </article>
  `}function lc(e,t,n){let{stop:r,id:i,status:a}=n,o=i&&$a.has(i),s=a.record,c=bo(`${t.code}-${r.perroId||r.perroNombre}`),l=[s?.horaRetiro&&a.retirado?`Retiro ${s.horaRetiro}`:``,s?.horaPaseo&&a.retirado?`Paseo ${s.horaPaseo}`:``,s?.horaEntrega&&a.kind===`entregado`?`Entrega ${s.horaEntrega}`:``].filter(Boolean),u=Os(e.fecha,e.shift).filter(e=>e.perroId&&e.perroId===r.perroId),d=Za.has(i)?Za.get(i):s?.nota||``,f=Qa.has(i)||Za.has(i)&&Za.get(i)!==(s?.nota||``),p=a.kind===`entregado`&&a.late?`<span class="sv-tag is-warn">Con atraso</span>`:a.kind===`curso`&&a.pickupLate?`<span class="sv-tag is-warn">Retiro +${a.pickupDelay} min</span>`:``;return`
    <li class="sv-stop is-${a.kind}">
      <div class="sv-stop-time">
        <strong>${N(r.hora||`--:--`)}</strong>
        <small>${r.minutos?`${r.minutos} min`:`min sin confirmar`}</small>
      </div>
      <div class="sv-stop-body">
        <div class="sv-stop-head">
          <h4>${N(r.perroNombre)}</h4>
          <span class="sv-state is-${a.tone}">${N(a.label)}</span>
          ${p}
        </div>
        ${ac(r)}
        ${l.length||s?`
          <p class="sv-source">${N(l.join(` · `))}${l.length?` · `:``}${N(Fo(s))}</p>
        `:``}
        ${s?.nota?`<p class="sv-stop-note"><b>Nota para el paseador:</b> ${N(s.nota)}</p>`:``}
        ${dc(u)}
        ${r.perroId?`
          <div class="sv-stop-actions" ${o?`aria-busy="true"`:``}>
            ${a.kind===`nosale`?`
              <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${c}" data-sv-absent="${r.perroId}" data-ruta="${N(t.code)}" aria-label="Deshacer: ${N(r.perroNombre)} sí sale">Deshacer «no sale»</button>
            `:`
              <button type="button" class="sv-button ${a.retirado?`is-checked`:`sv-button-primary`}" id="sv-pickup-${c}" data-sv-pickup="${r.perroId}" data-ruta="${N(t.code)}" aria-pressed="${a.retirado}" aria-label="${a.retirado?`Desmarcar retiro de ${N(r.perroNombre)}`:`Marcar a ${N(r.perroNombre)} como retirado`}">
                ${a.retirado?`${g(`checkCircle`,`sv-icon`)} Retirado`:`Retirado`}
              </button>
              <button type="button" class="sv-button ${a.kind===`entregado`?`is-checked`:``}" id="sv-deliver-${c}" data-sv-deliver="${r.perroId}" data-ruta="${N(t.code)}" aria-pressed="${a.kind===`entregado`}" ${a.retirado?``:`disabled`} aria-label="${a.kind===`entregado`?`Desmarcar entrega de ${N(r.perroNombre)}`:`Marcar a ${N(r.perroNombre)} como entregado`}">
                ${a.kind===`entregado`?`${g(`checkCircle`,`sv-icon`)} Entregado`:`Entregado`}
              </button>
              ${a.retirado?``:`<button type="button" class="sv-button sv-button-quiet" id="sv-absent-${c}" data-sv-absent="${r.perroId}" data-ruta="${N(t.code)}" aria-label="${N(r.perroNombre)} no sale">No sale</button>`}
            `}
          </div>
          <details class="sv-stop-more" data-sv-stop-more="${i}" ${f?`open`:``}>
            <summary>Nota para el paseador y pedido de cambio</summary>
            <div class="sv-stop-more-body">
              <label class="sv-field" for="sv-note-${c}">Nota para el paseador
                <span class="sv-field-hint" id="sv-note-${c}-hint">La ve en su ruta. Sin datos de tutores.</span>
                <input type="text" id="sv-note-${c}" data-sv-note="${i}" value="${N(d)}" maxlength="200" aria-describedby="sv-note-${c}-hint" autocomplete="off" />
              </label>
              <div class="sv-actions">
                <button type="button" class="sv-button" id="sv-note-save-${c}" data-sv-note-save="${r.perroId}" data-ruta="${N(t.code)}">Guardar nota</button>
                ${uc(e,t.code,r.perroId,`Pedir cambio al coordinador`)}
              </div>
            </div>
          </details>
          ${fc(e,t.code,r.perroId)}
        `:`<p class="sv-hint">Sin ficha en el registro de perros: no se puede marcar desde acá.</p>`}
      </div>
    </li>
  `}function uc(e,t,n,r){return`<button type="button" class="sv-button sv-button-quiet" id="${bo(`sv-req-open-${t||`turno`}-${n||`ruta`}`)}" data-sv-request-open data-ruta="${N(t)}" data-dog="${N(n)}">${g(`send`,`sv-icon`)} ${N(r)}</button>`}function dc(e){return e.length?`
    <ul class="sv-request-badges">
      ${e.map(e=>{let t=Ga[e.estado]||Ga.pendiente;return`<li class="sv-tag is-${t.tone}">Pedido «${N(e.tipo||`cambio`)}»: ${t.label}${e.pendiente?` (sin enviar)`:``}</li>`}).join(``)}
    </ul>
  `:``}function fc(e,t,n){let r=js(e);return!r.open||r.ruta!==t||(r.perroId||``)!==(n||``)?``:`
    <form class="sv-form sv-request-form" data-sv-request-form novalidate aria-labelledby="sv-req-title">
      <h4 id="sv-req-title">Pedir cambio al coordinador · ${N(`${t?`Ruta ${t}`:`Turno ${S[e.shift].label.toLowerCase()}`}${r.perroNombre?` · ${r.perroNombre}`:``}`)}</h4>
      <p class="sv-hint">El coordinador lo aplica en la ruta y te responde. Hoy, ${N(e.fechaLabel)}.</p>
      <label class="sv-field" for="sv-req-tipo">Qué hay que cambiar
        <select id="sv-req-tipo" data-sv-req="tipo">
          ${Wa.map(e=>`<option value="${e}" ${e===r.tipo?`selected`:``}>${e[0].toUpperCase()}${e.slice(1)}</option>`).join(``)}
        </select>
      </label>
      <label class="sv-field" for="sv-req-detalle">Detalle${r.tipo===`no sale`?` (opcional)`:``}
        <span class="sv-field-hint" id="sv-req-detalle-hint">Ej.: retirarlo 10:30 en vez de 10:00. O: sumar a Paco a la ruta.</span>
        <textarea id="sv-req-detalle" rows="2" data-sv-req="detalle" aria-describedby="sv-req-detalle-hint">${N(r.detalle)}</textarea>
      </label>
      <label class="sv-field" for="sv-req-motivo">Qué pasó o con quién hablaste
        <span class="sv-field-hint" id="sv-req-motivo-hint">Ej.: hablé con la familia, hoy no está. Sin teléfonos ni domicilios.</span>
        <textarea id="sv-req-motivo" rows="2" data-sv-req="motivo" aria-describedby="sv-req-motivo-hint" required>${N(r.motivo)}</textarea>
      </label>
      <label class="sv-check" for="sv-req-urgente">
        <input type="checkbox" id="sv-req-urgente" data-sv-req="urgente" ${r.urgente?`checked`:``} />
        <span>Urgente: afecta al turno de ahora</span>
      </label>
      <div class="sv-actions">
        <button type="submit" class="sv-button sv-button-primary" id="sv-req-save">${g(`send`,`sv-icon`)} Enviar pedido</button>
        <button type="button" class="sv-button" id="sv-req-cancel" data-sv-request-cancel>Cancelar</button>
      </div>
      ${go(`request-form`)}
    </form>
  `}function pc(e){let t=ks(e.fecha),n=t.filter(e=>(e.estado||`pendiente`)===`pendiente`).length;return`
    <details class="sv-fold" data-sv-fold="pedidos" ${is(`pedidos`,!0)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`send`,`sv-icon`)} Mis pedidos de cambio</span>
        <span class="sv-fold-meta">${t.length?`${n} pendiente${n===1?``:`s`} de ${t.length}`:no.has(`solicitudes`)?`Sin pedidos`:`Cargando…`}</span>
      </summary>
      <div class="sv-fold-body">
        ${go(`requests`)}
        ${t.length?`
          <ul class="sv-request-list">
            ${t.map(e=>{let t=Ga[e.estado]||Ga.pendiente,n=e.actualizadoPor&&e.actualizadoPor!==e.creadoPor?Fo(e,`Respondió`):``;return`
                <li class="sv-request is-${t.tone}">
                  <div class="sv-saved-head">
                    <strong>${e.urgente?`<span class="sv-tag is-danger">Urgente</span> `:``}${N(Ds(e))}</strong>
                    <span class="sv-state is-${t.tone}">${t.label}</span>
                  </div>
                  <p class="sv-source">${N(wo(e.fecha))} · Turno ${N(String(e.turno||``).toLowerCase()||`Pendiente de confirmar`)} · ${e.pendiente?`Se enviará cuando haya señal.`:`Pedido a las ${N(Eo(e.creadoEn))} hs`}</p>
                  <dl class="sv-obs-detail">
                    ${e.detalle?`<div><dt>Detalle</dt><dd>${N(e.detalle)}</dd></div>`:``}
                    <div><dt>Motivo</dt><dd>${N(e.motivo||`Pendiente de confirmar`)}</dd></div>
                    <div><dt>Respuesta del coordinador</dt><dd>${N(e.respuesta||((e.estado||`pendiente`)===`pendiente`?`Todavía no respondió.`:`Sin comentario.`))}</dd></div>
                  </dl>
                  ${n?`<p class="sv-source">${N(n)}</p>`:``}
                </li>
              `}).join(``)}
          </ul>
        `:`<p class="sv-empty">Todavía no pediste cambios. Usá «Pedir cambio al coordinador» en una ruta o en un perro.</p>`}
      </div>
    </details>
  `}function mc(e,t){let n=is(`observaciones`),r=Is(e),i=Ls(),a=new Set(t.map(e=>e.id)),o=w.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} en ${Va} días`:`Sin registros`}</span>
      </summary>
      <div class="sv-fold-body">
        <p class="sv-note is-info">Describí lo que se vio y se oyó, no lo que creés que siente el perro. No uses etiquetas como «agresivo», «malo» o «dominante». Sin datos de tutores.</p>
        <form class="sv-obs-form" data-sv-obs-form novalidate>
          <div class="sv-form-grid sv-form-grid-3">
            <label class="sv-field" for="sv-obs-dog">Perro
              <select id="sv-obs-dog" data-sv-obs="dogId" required>
                <option value="">Elegí un perro</option>
                ${t.length?`<optgroup label="De este turno">${t.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${N(e.name)}</option>`).join(``)}</optgroup>`:``}
                <optgroup label="Otros perros">${o.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${N(e.name)}</option>`).join(``)}</optgroup>
              </select>
            </label>
            <label class="sv-field" for="sv-obs-fecha">Fecha (DD/MM/AAAA)
              <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${N(r.fecha)}" inputmode="numeric" placeholder="${e.now.label}" maxlength="10" autocomplete="off" required />
            </label>
            <label class="sv-field" for="sv-obs-hora">Hora (opcional)
              <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${N(r.hora)}" />
            </label>
          </div>
          ${Ps.map(e=>`
            <label class="sv-field" for="sv-obs-${e.key}">${e.label}
              <span class="sv-field-hint" id="sv-obs-${e.key}-hint">${e.hint}</span>
              ${e.type===`input`?`<input type="text" id="sv-obs-${e.key}" data-sv-obs="${e.key}" value="${N(r[e.key])}" aria-describedby="sv-obs-${e.key}-hint" required />`:`<textarea id="sv-obs-${e.key}" rows="2" data-sv-obs="${e.key}" aria-describedby="sv-obs-${e.key}-hint" required>${N(r[e.key])}</textarea>`}
            </label>
          `).join(``)}
          <label class="sv-check" for="sv-obs-seguimiento">
            <input type="checkbox" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${r.seguimiento?`checked`:``} />
            <span>Requiere seguimiento (avisar a Juan)</span>
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-obs-save">${g(`checkCircle`,`sv-icon`)} Guardar observación</button>
          </div>
          ${go(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${Va} días</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>hc(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function hc(e){let t=Ya===e.id,n=e.perroNombre||as(e.perroId)?.name||`Pendiente de confirmar`;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${N(n)}</strong>
        <span>${N(wo(e.fecha))}${e.hora?` · ${N(e.hora)} hs`:``}${e.lugar?` · ${N(e.lugar)}`:``}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${N(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Reacción</dt><dd>${N(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${N(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Resultado</dt><dd>${N(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${N(Rs(e))}</p>
      <div class="sv-actions">
        ${t?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${g(`copy`,`sv-icon`)} Copiar texto</button>
          ${No(e)?`<button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function gc(e){let t=is(`cierre`),n=Vs(e),r=Ks(e),i=n?.cerrado?n.horaCierre||Eo(n.actualizadoEn):``;return`
    <details class="sv-fold" data-sv-fold="cierre" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`flag`,`sv-icon`)} Cerrar el turno ${S[e.shift].label.toLowerCase()}</span>
        <span class="sv-fold-meta">${n?.cerrado?`Cerrado ${N(i)} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        ${n?`<p class="sv-source">${N(n.cerrado?Fo(n,`Lo cerró`):Fo(n,`Última nota de`))}</p>`:``}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${N(Hs(e))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar (incluye el cumplimiento del horario)
          <textarea id="sv-close-summary" class="sv-summary" rows="16" readonly>${N(r)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${g(`copy`,`sv-icon`)} Copiar resumen</button>
          ${n?.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${g(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${go(`closure`)}
      </div>
    </details>
  `}function _c(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${is(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${g(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(Wt).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas y horarios: los arma el coordinador (plantilla semanal y cambios del día). Respaldo: ${x.officialSources.routes}, leída el ${Rt}.</li>
          <li>Perros: ${x.officialSources.dogs}.</li>
          <li>Retiros y entregas son el mismo registro que marca el paseador. Incidentes y checklist los carga el equipo en la calle.</li>
          <li>Avisos por barrio, pedidos de cambio, observaciones y cierres se comparten con el equipo según permisos.</li>
        </ul>
      </div>
    </details>
  `}function I(e){if(!e)return Ko();Go(),$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function vc(){return So().time}async function yc(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function bc(e,t,n){let r=fs(e).routes.find(e=>e.code===t),i=r?.stops.find(e=>e.perroId===n);return r&&i?{route:r,stop:i}:null}function xc(e,t,n,r){let i=hs(e.fecha,n.perroId,e.shift),a=gs().get(i),o={id:i,fecha:e.fecha,...r};return a||Object.assign(o,{perroId:n.perroId,perroNombre:n.perroNombre,turno:S[e.shift].label}),a?.ruta!==t.code&&(o.ruta=t.code),o}async function Sc(e,t,n,r){let i=ns(),a=bc(i,e,t);if(!a)return;let{route:o,stop:s}=a,c=hs(i.fecha,t,i.shift);if($a.has(c))return;let l=gs().get(c),u=_s(s,l,i.now.minutes),d=vc(),f={horaRetiro:``,horaPaseo:``,horaEntrega:``},p=s.perroNombre,m=null,h=``,ee=`ok`;if(n===`retiro`){if(u.retirado)m={estado:`pendiente`,...f},h=`${p}: retiro desmarcado.`,ee=`info`;else{m={estado:`retirado`,horaRetiro:d};let e=u.planned===null?0:i.now.minutes-u.planned;h=`${p}: retirado a las ${d} hs${e>Ra?` (${e} min después de lo previsto)`:``}.`}}else if(n===`entrega`){if(!u.retirado)return;u.kind===`entregado`?(m={estado:l?.horaPaseo?`paseando`:`retirado`,horaEntrega:``},h=`${p}: entrega desmarcada.`,ee=`info`):(m={estado:`entregado`,horaEntrega:d},h=`${p}: entregado a las ${d} hs.`)}else if(n===`no-sale`){if(u.kind===`nosale`)m={estado:`pendiente`},h=`${p}: vuelve a la lista.`;else{if(u.retirado)return;m={estado:`no-sale`,...f},h=`${p}: no sale hoy. Si cambia la ruta, pedíselo al coordinador.`}}m&&($a.add(c),await zo(`paseos`,xc(i,o,s,m),`control-${o.code}`,h,ee),$a.delete(c),I(r))}async function Cc(e,t,n){let r=ns(),i=bc(r,e,t);if(!i)return;let{route:a,stop:o}=i,s=hs(r.fecha,t,r.shift),c=String(Za.has(s)?Za.get(s):document.querySelector(`[data-sv-note="${s}"]`)?.value||``).trim();if(La.test(c))return F(`control-${a.code}`,`La nota parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),I(n);await zo(`paseos`,xc(r,a,o,{nota:c}),`control-${a.code}`,c?`Nota para el paseador guardada en ${o.perroNombre}.`:`Nota de ${o.perroNombre} borrada.`)&&Za.delete(s),I(n)}async function wc(e){let t=ns(),n=tc(t);e.querySelectorAll(`[data-sv-aviso]`).forEach(e=>{n[e.dataset.svAviso]=e.value}),P(M.avisoDraft,n);let r=n.barrio.trim(),i=n.mensaje.trim();if(!r||!i)return F(`aviso`,`Falta completar: ${_o([!r&&`barrio`,!i&&`qué pasa`].filter(Boolean))}.`,`error`),I(r?`sv-aviso-mensaje`:`sv-aviso-barrio`);if(!/^\d{4}-\d{2}-\d{2}$/.test(n.vigenteHasta)||n.vigenteHasta<t.fecha)return F(`aviso`,`Elegí hasta cuándo vale el aviso (hoy, ${t.fechaLabel}, o después).`,`error`),I(`sv-aviso-hasta`);if(La.test(i)||La.test(r))return F(`aviso`,`El aviso parece tener un teléfono. Sacalo: los avisos no llevan datos de contacto.`,`error`),I(`sv-aviso-mensaje`);let a=Ua.includes(n.tipo)?n.tipo:`otro`;return await zo(`avisos`,{fecha:t.fecha,barrio:r,tipo:a,mensaje:i,vigenteHasta:n.vigenteHasta,titulo:`${a[0].toUpperCase()}${a.slice(1)} · ${r}`},`aviso`,`Aviso de ${r} publicado. Lo ve el equipo.`)&&P(M.avisoDraft,{barrio:``,tipo:Ua[0],mensaje:``,vigenteHasta:t.fecha}),I(`sv-aviso-save`)}async function Tc(e){let t=ns(),n=js(t);e.querySelectorAll(`[data-sv-req]`).forEach(e=>{n[e.dataset.svReq]=e.type===`checkbox`?e.checked:e.value}),P(M.requestDraft,n);let r=String(n.detalle||``).trim(),i=String(n.motivo||``).trim(),a=[];if(!r&&n.tipo!==`no sale`&&a.push(`detalle`),i||a.push(`qué pasó o con quién hablaste`),a.length)return F(`request-form`,`Falta completar: ${_o(a)}.`,`error`),I(!r&&n.tipo!==`no sale`?`sv-req-detalle`:`sv-req-motivo`);if(La.test(r)||La.test(i))return F(`request-form`,`El pedido parece tener un teléfono. Sacalo: acá no van datos de tutores.`,`error`),I(`sv-req-motivo`);let o=Wa.includes(n.tipo)?n.tipo:`otro`,s=S[t.shift].label,c={fecha:t.fecha,turno:s,ruta:n.ruta||``,tipo:o,perroId:n.perroId||``,perroNombre:n.perroNombre||``,detalle:r||(o===`no sale`?`${n.perroNombre||`El perro`} no sale hoy.`:``),motivo:i,urgente:!!n.urgente,estado:`pendiente`,respuesta:``,titulo:`${n.urgente?`URGENTE · `:``}${o[0].toUpperCase()}${o.slice(1)}${n.perroNombre?` · ${n.perroNombre}`:``}${n.ruta?` · ${n.ruta}`:``} · ${s} ${t.fechaLabel}`},l=await zo(`solicitudes`,c,n.ruta?`control-${n.ruta}`:`requests`,`Pedido enviado al coordinador: ${Ds(c)}. Lo vas a ver en «Mis pedidos de cambio».`);return l?(l.pendiente||ao.set(l.id,`pendiente`),P(M.requestDraft,As(t)),I(bo(`sv-req-open-${n.ruta||`turno`}-${n.perroId||`ruta`}`))):(Ja&&(Ja.area=`request-form`),I(`sv-req-save`))}async function Ec(e){let t=ns(),n=Is(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),P(M.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),Ps.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())});let i=To(n.fecha);if(!r.length&&!i)return F(`observation`,`Escribí una fecha real como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),I(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return F(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),I(`sv-obs-fecha`);if(r.length)return F(`observation`,`Falta completar: ${_o(r)}.`,`error`),I(n.dogId?n.fecha?`sv-obs-${Ps.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=Ps.find(e=>Ia.test(n[e.key]));if(a){let e=n[a.key].match(Ia)[2];return F(`observation`,`En «${a.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),I(`sv-obs-${a.key}`)}let o=as(n.dogId);return await zo(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:S[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada. La ve el equipo.`)&&P(M.observationDraft,Fs(t)),I(`sv-obs-save`)}async function Dc(e,t,n,r){let i=Bs(e),a=Hs(e),o=Mo(),s=Ks(e,{...Vs(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoPorNombre:o.nombre,actualizadoEn:new Date().toISOString(),pendiente:!1});await zo(`cierres`,{id:i,fecha:e.fecha,turno:S[e.shift].label,notas:a,resumen:s,...t},`closure`,n,t.cerrado===!1?`info`:`ok`)&&Xa?.id===i&&Xa.notas===a&&(Xa=null),I(r)}function Oc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return Hm(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return Ho(!0),!0;let n=t.closest(`[data-sv-shift]`);if(n)return rs(n.dataset.svShift),I(n.id),!0;let r=t.closest(`[data-sv-pickup]`);if(r)return Sc(r.dataset.ruta,r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return Sc(i.dataset.ruta,i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=bo(`${a.dataset.ruta}-${a.dataset.svAbsent}`),t=ns(),n=gs().get(hs(t.fecha,a.dataset.svAbsent,t.shift))?.estado===`no-sale`;return Sc(a.dataset.ruta,a.dataset.svAbsent,`no-sale`,n?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-note-save]`);if(o)return Cc(o.dataset.ruta,o.dataset.svNoteSave,o.id),!0;let s=t.closest(`[data-sv-request-open]`);if(s){let e=ns(),t=js(e),n=s.dataset.ruta||``,r=s.dataset.dog||``,i=t.open&&t.ruta===n&&(t.perroId||``)===r;return P(M.requestDraft,i?t:As(e,n,r,!0)),I(`sv-req-tipo`),!0}if(t.closest(`[data-sv-request-cancel]`)){let e=ns(),t=js(e);return P(M.requestDraft,As(e)),I(bo(`sv-req-open-${t.ruta||`turno`}-${t.perroId||`ruta`}`)),!0}let c=t.closest(`[data-sv-obs-copy]`);if(c){let e=Ls().find(e=>e.id===c.dataset.svObsCopy);return e&&yc(zs(e)).then(e=>{F(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),I(c.id)}),!0}let l=t.closest(`[data-sv-obs-delete]`);if(l)return Ya=l.dataset.svObsDelete,I(`sv-obs-del-no-${Ya}`),!0;let u=t.closest(`[data-sv-obs-delete-ok]`);if(u)return Ya=null,Vo(`observaciones`,u.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>I(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=Ya;return Ya=null,I(`sv-obs-del-${e}`),!0}return t.closest(`[data-sv-close-copy]`)?(yc(Ks(ns()),`sv-close-summary`).then(e=>{F(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),I(`sv-close-copy`)}),!0):t.closest(`[data-sv-close-done]`)?(Dc(ns(),{cerrado:!0,horaCierre:vc()},`Turno marcado como cerrado. No te olvides de copiar el resumen.`,`sv-close-copy`),!0):t.closest(`[data-sv-close-reopen]`)?(Dc(ns(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0):!1}function kc(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;let n=ns();if(t.matches(`[data-sv-obs]`)){let e=Is(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,P(M.observationDraft,e),!0}if(t.matches(`[data-sv-aviso]`)){let e=tc(n);return e[t.dataset.svAviso]=t.value,P(M.avisoDraft,e),!0}if(t.matches(`[data-sv-req]`)){let e=js(n);return e[t.dataset.svReq]=t.type===`checkbox`?t.checked:t.value,P(M.requestDraft,e),t.tagName===`SELECT`&&I(t.id),!0}return t.matches(`[data-sv-close-notes]`)?(Xa={id:Bs(n),notas:t.value},t.value===(Vs(n)?.notas||``)?(Xa=null,!0):(Dc(n,{},`Notas del cierre guardadas.`),!0)):!1}function Ac(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=ns();if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=Is(n);e[t.dataset.svObs]=t.value,P(M.observationDraft,e)}else if(t.matches(`[data-sv-aviso]`)){let e=tc(n);e[t.dataset.svAviso]=t.value,P(M.avisoDraft,e)}else if(t.matches(`[data-sv-req]`)&&t.type!==`checkbox`){let e=js(n);e[t.dataset.svReq]=t.value,P(M.requestDraft,e)}else if(t.matches(`[data-sv-note]`))Za.set(t.dataset.svNote,t.value),Qa.add(t.dataset.svNote);else if(t.matches(`[data-sv-close-notes]`)){Xa={id:Bs(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=Ks(n))}}function jc(e){let t=e.target;t.closest?.(`.sv-shell`)&&(t.matches?.(`[data-sv-obs-form]`)?(e.preventDefault(),Ec(t)):t.matches?.(`[data-sv-aviso-form]`)?(e.preventDefault(),wc(t)):t.matches?.(`[data-sv-request-form]`)&&(e.preventDefault(),Tc(t)))}function Mc(e){let t=e.target;if(e.key!==`Enter`||!t.matches?.(`.sv-shell [data-sv-note]`))return;e.preventDefault();let n=t.closest(`.sv-stop-more-body`)?.querySelector(`[data-sv-note-save]`);n&&Cc(n.dataset.ruta,n.dataset.svNoteSave,t.id)}function Nc(e){let t=e.target;if(t.matches?.(`[data-sv-stop-more]`)){t.open?Qa.add(t.dataset.svStopMore):Qa.delete(t.dataset.svStopMore);return}if(!t.matches?.(`[data-sv-fold]`))return;let n=fo(M.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,P(M.folds,n))}function Pc(){_e.push(Oc),ve.push(kc),document.addEventListener(`input`,Ac),document.addEventListener(`submit`,jc),document.addEventListener(`keydown`,Mc),document.addEventListener(`toggle`,Nc,!0),Zo()}var Fc={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,borradores:`paseosJuan_coord_borradores`},Ic=`paseosJuan_coord_secciones`;function Lc(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function Rc(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function zc(e){try{localStorage.removeItem(e)}catch{}}var Bc=null,Vc=null;function L(e,t,n=`ok`){Bc={section:e,text:t,tone:n},n===`error`?Gc(t):Wc(t)}function Hc(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function Uc(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function Wc(e){Uc(Hc(`coord-live`,`status`,`polite`),e)}function Gc(e){Uc(Hc(`coord-alerta`,`alert`,`assertive`),e)}var Kc=`America/Argentina/Buenos_Aires`;function R(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function qc(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function Jc(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:Kc,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function Yc(e){let t=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e||``));if(!t)return!1;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(n,r-1,i));return a.getUTCFullYear()===n&&a.getUTCMonth()===r-1&&a.getUTCDate()===i}function Xc(e,t){let[n,r,i]=e.split(`-`).map(Number);return new Date(Date.UTC(n,r-1,i+t)).toISOString().slice(0,10)}function Zc(e){let[t,n,r]=e.split(`-`).map(Number);return C[(new Date(Date.UTC(t,n-1,r)).getUTCDay()+6)%7]}function Qc(e){return`${Zc(e)} ${qc(e)}`}function $c(e){return Xc(y(),-e)}function el(e,t=6){let n=[],r=y();for(let i=0;i<70&&n.length<t;i+=1){let t=Xc(r,i);Zc(t)===e&&n.push(t)}return n}function z(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase().trim()}function tl(e){return z(e)}function nl(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}var rl={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function il(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>rl[e]||e).join(`, `):`Sin días`}function al(e){let t=hl.map(t=>{let n=C.filter(n=>Jt(e,n,t));return n.length?`${t.toLowerCase()}: ${il(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function ol(e,t=!1){let n=Lc(Ic,{});return e in n?!!n[e]:t}function sl(e,t){Rc(Ic,{...Lc(Ic,{}),[e]:t})}var cl=new Set;function ll(){return document.documentElement.dataset.motion===`calm`}function ul(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:ll()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}function B(e){requestAnimationFrame(()=>document.getElementById(e)?.focus({preventScroll:!1}))}function dl(){return _.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}function fl(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``));if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n>23||r>59?null:n*60+r}function pl(e){return fl(e)!==null}function V(e){let t=fl(e);return t===null?``:`${String(Math.floor(t/60)).padStart(2,`0`)}:${String(t%60).padStart(2,`0`)}`}var ml=C.filter(e=>e!==`Domingo`),hl=[`Mañana`,`Tarde`],gl={Mañana:`09:00`,Tarde:`14:45`},_l=new Map(w.map(e=>[e.id,e])),vl=new Map(w.map(e=>[z(e.name),e])),yl=w.filter(e=>e.review||e.status!==`Activo`);function bl(e){return e.perroId&&_l.get(e.perroId)||vl.get(z(e.perroNombre))||null}function xl(e){return!!e?.safety?.some(e=>/bozal/i.test(e))}function Sl(e){if(!e)return``;let t=z(e),n=zt.find(e=>e.id===t||z(e.name)===t||z(e.name.split(` `)[0])===t);return n?n.name:e}var Cl={solicitudes:()=>({desde:$c(14)}),plantillas:()=>({}),rutas:()=>({desde:y()}),clientes:()=>({}),avisos:()=>({}),pedidos:()=>({}),fichas:()=>({}),resueltos:()=>({}),observaciones:()=>({desde:$c(6)}),incidentes:()=>({desde:$c(6)})},wl=Object.keys(Cl),Tl=[`pedidos`,`fichas`,`resueltos`];function El(e){return v.cached(e,Cl[e]())}var Dl=new Set,Ol=new Map,kl=new Map,Al=!1,jl=!1;function Ml(){Al||(Al=!0,$e(e=>{wl.includes(e)&&(Dl.add(e),Ol.delete(e),Fl())}),window.addEventListener(`online`,Fl),window.addEventListener(`offline`,Fl))}function Nl(){let e=_.user();e&&wl.forEach(t=>{let n=Cl[t](),r=`${e.usuario}|${n.desde||``}`,i=kl.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};kl.set(t,a),v.list(t,n).then(()=>{Dl.add(t),Ol.delete(t)}).catch(e=>{e.status!==401&&(Ol.set(t,e.message),Gc(e.message))}).finally(()=>{kl.get(t)===a&&(a.stop=v.watch(t,n)),Fl(),Ql()})})}function Pl(){[...kl.values()].forEach(e=>e.stop?.()),kl.clear(),Ol.clear(),Nl()}function Fl(){jl||(jl=!0,requestAnimationFrame(()=>{jl=!1,document.querySelector(`.coord-shell`)&&Il()}))}function Il(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;_d.has(t)||(gd[t]=xd(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function Ll(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}function Rl(e){let t=_.user();return!t||!e||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function zl(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${Jc(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${R(e.creadoPorNombre)}${e.creadoEn?` el ${Jc(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre;n.push(`Último cambio${t?` de ${R(t)}`:``}: ${Jc(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var Bl=new Set;async function Vl(e,t,{section:n,ok:r}){try{let i=await v.save(e,t);return L(n,i.pendiente?`${r} Sin señal: se enviará cuando vuelva.`:r),i}catch(e){return L(n,`No se pudo guardar: ${e.message}`,`error`),null}finally{Fl()}}async function Hl(e,t,{section:n,ok:r,undo:i=!0}){try{return await v.remove(e,t.id),Vc=i?{col:e,record:t,section:n}:null,L(n,r),Bc.undo=i,!0}catch(e){return L(n,`No se pudo borrar: ${e.message}`,`error`),!1}finally{Fl()}}function Ul(e,t){Bl.has(e)||(Bl.add(e),Promise.resolve().then(t).finally(()=>Bl.delete(e)))}var Wl=!1,Gl=!1,Kl=``,ql=/^[a-z0-9][a-z0-9_.-]{0,90}$/i,Jl=[`nuevo`,`en-curso`,`resuelto`];function Yl(e){return ql.test(String(e||``))?`ant_${String(e)}`:void 0}function Xl(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let n=`${t[3]}-${t[2].padStart(2,`0`)}-${t[1].padStart(2,`0`)}`;return Yc(n)?n:null}function Zl(){let e=y(),t=[];Lc(Fc.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:Fc.pedidos,oldId:n.id,col:`pedidos`,data:{id:Yl(n.id),fecha:Xl(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:Jl.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),Lc(Fc.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:Fc.altas,oldId:r,col:`fichas`,data:{id:Yl(r),fecha:Xl(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})});let n=new Set(El(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(Lc(Fc.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:Fc.resueltos,oldId:e,skip:!0});return}let i=_l.get(e);t.push({key:Fc.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function Ql(){if(!(Wl||Gl)&&Tl.every(e=>Dl.has(e))){Gl=!0;try{let e=Lc(Fc.borradores,{});Object.entries(e).forEach(([e,t])=>{e!==`pago`&&!gd[e]&&(gd[e]=t)}),zc(Fc.borradores);let t=Zl();if(!t.length){Wl=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await v.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[Fc.pedidos,Fc.altas].forEach(e=>{let t=Lc(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?Rc(e,t):zc(e)});let a=Object.fromEntries(Object.entries(Lc(Fc.resueltos,{})).filter(([e])=>n.has(`${Fc.resueltos}|${e}`)));Object.keys(a).length?Rc(Fc.resueltos,a):zc(Fc.resueltos),r&&(Kl=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo.`,Wc(Kl)),n.size?(Ol.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),Gc(Ol.get(`migracion`))):Wl=!0}finally{Gl=!1,Fl()}}}var $l={Mañana:0,Tarde:1},eu=/^[A-Z0-9][A-Z0-9_]{1,19}$/;function tu(e){return e&&Array.isArray(e.paradas)&&e.ruta&&e.dia}function nu(e,t){return($l[e.turno]??9)-($l[t.turno]??9)||String(e.ruta).localeCompare(String(t.ruta))}function ru(e,t){return`${e}_${tl(t)}`}function iu(e,t){return`${e}_${t}`}function au(){return El(`plantillas`).filter(tu)}function ou(){return El(`rutas`).filter(e=>tu(e)&&e.fecha)}function su(e){return au().filter(t=>t.dia===e).sort(nu)}function cu(e){let t=Zc(e),n=new Map(ou().filter(t=>t.fecha===e).map(e=>[e.ruta,e])),r=su(t).map(e=>{let t=n.get(e.ruta);return n.delete(e.ruta),t?{...t,origen:`dia`,plantillaId:e.id}:{...e,origen:`plantilla`,plantillaId:e.id}});return n.forEach(e=>r.push({...e,origen:`dia`,plantillaId:``})),r.sort(nu)}function lu(e){return(e.paradas||[]).filter(e=>pl(e.hora)).map(e=>e.hora).sort((e,t)=>fl(e)-fl(t))}function uu(e){let t=lu(e);return t.length?t.length===1?V(t[0]):`${V(t[0])} a ${V(t[t.length-1])}`:`Sin horarios`}function du(e){let t=lu(e);return t.length?en(V(t[t.length-1]),15):gl[e.turno]||`09:00`}function fu(e){let t=fl(e.hora);return t===null?null:[t,t+(Number(e.minutos)||45)]}function pu(e,t){return e&&t&&e[0]<t[1]&&t[0]<e[1]}function mu(e,t=[]){let n=[],r=new Map,i=(e,t)=>{n.push(t),e.forEach(e=>r.set(e,[...r.get(e)||[],t]))},a=(e.paradas||[]).map((e,t)=>({stop:e,index:t,dog:bl(e),win:fu(e)}));a.forEach(({stop:e,index:t,dog:n,win:r})=>{let a=e.perroNombre||n?.name||`Pendiente de confirmar`;r||i([t],`${a}: falta la hora de retiro.`),n?n.status!==`Activo`&&i([t],`${a}: estado «${n.status}».`):i([t],`${a}: no está en el registro de perros (perro sin ficha).`)});let o=new Map;for(let e=0;e<a.length;e+=1)for(let t=e+1;t<a.length;t+=1){let n=a[e],r=a[t];if(!n.dog||!r.dog)continue;if(n.dog.id===r.dog.id){i([n.index,r.index],`${n.dog.name} está dos veces en esta ruta.`);continue}if(!pu(n.win,r.win))continue;((n.dog.incompatibleWith||[]).includes(r.dog.name)||(r.dog.incompatibleWith||[]).includes(n.dog.name))&&i([n.index,r.index],`No juntar: ${n.dog.name} y ${r.dog.name} van en la misma franja (${V(n.stop.hora)} y ${V(r.stop.hora)}).`);let s=n.dog.size===`Pequeño`&&r.dog.size===`Grande`?n:r.dog.size===`Pequeño`&&n.dog.size===`Grande`?r:null;if(s){let e=s===n?r:n;o.has(s.index)||o.set(s.index,{small:s,bigs:[]}),o.get(s.index).bigs.push(e)}}return o.forEach(({small:e,bigs:t})=>{let n=[...new Set(t.map(e=>e.dog.name))];i([e.index,...t.map(e=>e.index)],`Tamaños mezclados: ${e.dog.name} (pequeño) comparte franja con ${nl(n)} (${n.length===1?`grande`:`grandes`}).`)}),t.filter(t=>t.ruta!==e.ruta).forEach(e=>{(e.paradas||[]).forEach(t=>{let n=bl(t);a.forEach(({index:r,dog:a,win:o})=>{a&&n&&a.id===n.id&&pu(o,fu(t))&&i([r],`${a.name} también está en ${e.ruta} a las ${V(t.hora)}.`)})})}),{list:[...new Set(n)],byStop:r}}function hu(e){return mu(e,su(e.dia))}function gu(e,t){return mu(e,cu(t))}function _u(e,{fecha:t}={}){let n=[`*Ruta ${t?`${e.ruta} · ${Qc(t)} · ${e.turno}`:`${e.ruta} · ${e.dia} · ${e.turno} (plantilla semanal)`}*`,`Paseador: ${Sl(e.paseador)||`Pendiente de confirmar`} | Ayudante: ${Sl(e.ayudante)||`sin ayudante`} | Supervisa: ${Sl(e.supervisor)||`Pendiente de confirmar`}`],r=(e.paradas||[]).slice().sort((e,t)=>(fl(e.hora)??9999)-(fl(t.hora)??9999));return r.forEach((e,t)=>{let r=bl(e),i=[];e.nota&&i.push(e.nota),xl(r)&&!/bozal/i.test(e.nota||``)&&i.push(`Usa bozal`),n.push(`${t+1}) ${V(e.hora)||`sin hora`} ${e.perroNombre||r?.name||`Pendiente de confirmar`} · ${Number(e.minutos)||45} min${i.length?` · ${i.join(` · `)}`:``}`)}),r.length||n.push(`Sin perros cargados.`),e.notas&&n.push(`Notas: ${e.notas}`),n.join(`
`)}var H=null,vu=``,yu=``,bu=``,xu=!1,Su=``,Cu=``;function wu(){return Lc(Ic,{}).rutasVista===`dia`?`dia`:`semana`}function Tu(e){Rc(Ic,{...Lc(Ic,{}),rutasVista:e})}function Eu(){let e=y();return(!Yc(Cu)||Cu<e)&&(Cu=e),Cu}function Du(e){return(e||[]).map(e=>({perroId:e.perroId||``,perroNombre:e.perroNombre||bl(e)?.name||``,hora:V(e.hora)||e.hora||``,minutos:Number(e.minutos)||45,nota:e.nota||``}))}function Ou(e,{modo:t,fecha:n=``,nuevo:r=!1,solicitud:i=null}={}){H={modo:t,fecha:n,nuevo:r,id:t===`plantilla`?ru(e.ruta,e.dia):iu(n,e.ruta),dia:t===`dia`?Zc(n):e.dia,turno:e.turno,ruta:e.ruta,paseador:e.paseador||``,ayudante:e.ayudante||``,supervisor:e.supervisor||``,notas:e.notas||``,paradas:Du(e.paradas),plantillaId:e.plantillaId||(t===`plantilla`?e.id:``),existeDia:t===`dia`&&e.origen===`dia`?e:null,soloDia:t===`plantilla`&&el(e.dia)[0]||``,solicitudId:i?.id||``,precarga:``,respuesta:``,sucio:!1},vu=``,yu=``,bu=``}function ku(){H=null,vu=``,yu=``,bu=``}function Au(e,t){let n=t===`Mañana`?`M`:`T`;for(let t=1;t<10;t+=1){let r=`PJ_${t}${n}`;if(!e.some(e=>e.ruta===r))return r}return`PJ_X${n}`}function ju(){if(!H)return{list:[],byStop:new Map};let e=H.modo===`plantilla`?su(H.dia):cu(H.fecha);return mu(H,e)}function Mu(e,t){let n=pl(yu)?V(yu):du(H);H.paradas.push({perroId:e?.id||``,perroNombre:e?.name||t,hora:n,minutos:e?.minutes||45,nota:e?.incompatibleWith?.length?`No juntar con ${nl(e.incompatibleWith)}`:xl(e)?`Bozal`:``}),H.sucio=!0,vu=``,yu=``}function Nu(){H.paradas.sort((e,t)=>(fl(e.hora)??9999)-(fl(t.hora)??9999)),H.sucio=!0}function Pu(){return{dia:H.dia,turno:H.turno,ruta:H.ruta,paseador:H.paseador.trim(),ayudante:H.ayudante.trim(),supervisor:H.supervisor.trim(),notas:H.notas.trim(),paradas:Du(H.paradas)}}function Fu(){let e=String(H.ruta||``).trim().toUpperCase().replace(/\s+/g,`_`);if(!eu.test(e))return[`El código de la ruta tiene que ser como PJ_1M (letras, números y guion bajo).`,`coord-ed-ruta`];if(H.ruta=e,H.nuevo&&(H.modo===`plantilla`?au().some(t=>t.id===ru(e,H.dia)):cu(H.fecha).some(t=>t.ruta===e)))return[`Ya hay una ruta ${e} ese día. Elegí otro código o editá la que existe.`,`coord-ed-ruta`];let t=H.paradas.findIndex(e=>!pl(e.hora));return t>=0?[`Falta la hora de retiro de ${H.paradas[t].perroNombre||`un perro`}.`,`coord-ed-hora-${t}`]:null}var Iu={},Lu=``;function Ru(){return El(`solicitudes`).slice().sort(Ll)}function zu(){return Ru().filter(e=>(e.estado||`pendiente`)===`pendiente`).sort((e,t)=>Number(!!t.urgente)-Number(!!e.urgente)||String(e.fecha||``).localeCompare(String(t.fecha||``))||Ll(t,e))}function Bu(e){return e.perroId&&_l.get(e.perroId)?_l.get(e.perroId):vl.get(z(e.perroNombre))||null}function Vu(e){let t=/(\d{1,2})\s*[:.h]\s*(\d{2})/.exec(String(e||``));return t?V(`${t[1]}:${t[2]}`):``}function Hu(e){let t=Yc(e.fecha)?e.fecha:y(),n=Bu(e),r=cu(t),i=e.ruta?r.find(t=>t.ruta===e.ruta):null;!i&&n&&(i=r.find(t=>(!e.turno||t.turno===e.turno)&&(t.paradas||[]).some(e=>bl(e)?.id===n.id))),!i&&e.turno&&(i=r.find(t=>t.turno===e.turno));let a=!i;if(!i){let n=e.turno||`Mañana`;i={ruta:e.ruta||Au(r,n),dia:Zc(t),turno:n,paradas:[],origen:`plantilla`}}Ou(i,{modo:`dia`,fecha:t,nuevo:a,solicitud:e});let o=z(e.tipo),s=n?H.paradas.findIndex(e=>bl(e)?.id===n.id):H.paradas.findIndex(t=>z(t.perroNombre)===z(e.perroNombre)),c=Vu(e.detalle),l=n?.name||e.perroNombre||`el perro`;o===`no sale`?s>=0?(H.paradas.splice(s,1),H.precarga=`Ya saqué a ${l} de la ruta. Revisá y guardá.`):H.precarga=`${l} no está en esta ruta: revisá a mano.`:o===`cambiar hora`?s>=0&&c?(H.paradas[s].hora=c,H.precarga=`Ya cambié la hora de ${l} a las ${c}. Revisá y guardá.`):H.precarga=`No pude precargar la hora nueva: cambiala a mano.`:o===`agregar perro`?s>=0?H.precarga=`${l} ya estaba en la ruta: revisá la hora.`:n||e.perroNombre?(c&&(yu=c),Mu(n,e.perroNombre),H.precarga=`Ya agregué a ${l} a las ${H.paradas[H.paradas.length-1].hora}. Revisá y guardá.`):H.precarga=`No dice qué perro agregar: buscalo abajo.`:H.precarga=`Este cambio se hace a mano: revisá el pedido y ajustá la ruta.`,H.sucio=!0,H.respuesta=``}var Uu=[[`activo`,`Activo`],[`pausa`,`En pausa`],[`baja`,`De baja`]],Wu=[b,...Vt.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`,`Otro (anotalo en notas)`],Gu=[b,`Mañana`,`Tarde`,`Mañana y tarde`],Ku=[`obra o corte`,`perro suelto`,`clima`,`seguridad`,`cambio de horario`,`otro`],qu=``;function Ju(){return El(`clientes`).slice().sort((e,t)=>String(e.nombre||``).localeCompare(String(t.nombre||``),`es`))}function Yu(){return El(`avisos`).slice().sort(Ll)}function Xu(e,t=y()){return Yc(e.vigenteHasta)?e.vigenteHasta>=t:(e.fecha||``)===t}function Zu(){return Yu().filter(e=>Xu(e))}function Qu(e){let t=new Map;return e.forEach(e=>{let n=e.barrio||`Sin barrio`;t.has(n)||t.set(n,[]),t.get(n).push(e)}),[...t.entries()].sort((e,t)=>e[0].localeCompare(t[0],`es`))}function $u(){let e=new Map;return[...rn,...Ju().map(e=>e.barrio),...Yu().map(e=>e.barrio)].forEach(t=>{let n=String(t||``).trim();n&&!e.has(z(n))&&e.set(z(n),n)}),[...e.values()].sort((e,t)=>e.localeCompare(t,`es`))}function ed(e){return[`*Aviso Paseos Juan · ${e.barrio||`Sin barrio`}*`,`Tipo: ${e.tipo||`otro`}`,e.mensaje||``,`Vigente hasta: ${Yc(e.vigenteHasta)?qc(e.vigenteHasta):qc(e.fecha)}`].filter(Boolean).join(`
`)}var td=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],nd=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],rd=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],id={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function ad(e){return e.estado===`curso`?`en-curso`:Jl.includes(e.estado)?e.estado:`nuevo`}function od(){return El(`pedidos`).slice().sort(Ll)}function sd(){return El(`fichas`).slice().sort(Ll)}function cd(){let e={};return El(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function ld(e){return e.datos?.perro||e.perro||``}function ud(e){return e.filter(e=>e.origen===`web`&&ad(e)===`nuevo`)}function dd(){let e=cd();return yl.filter(t=>!e[t.id])}function fd(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function pd(e,t,n=`secondary`,r=`Escribirle por WhatsApp`){if(!e)return``;let i=fd(e);return i?`<a class="coord-btn is-${n}" href="https://wa.me/${i}?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${g(`message`,`coord-icon`)}<span>${r}</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`:`<p class="coord-inline-alert">${g(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina.</span></p>`}var md=ml;function hd(e){let t=z(e),n=md.map(z),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return md.slice(e,t+1)}return md.filter((e,r)=>t.includes(n[r]))}var gd={},_d=new Set;function vd(e){return gd[e]||{}}function yd(e,t){gd[e]=t,_d.delete(e)}function bd(e){delete gd[e],_d.add(e)}function xd(e){let t={...vd(e.dataset.coordForm)},n=new Set;return e.querySelectorAll(`[name]`).forEach(r=>{if(r.type!==`file`){if(r.type===`checkbox`){if(n.has(r.name))return;n.add(r.name);let i=e.querySelectorAll(`[name="${r.name}"]`);t[r.name]=[...i].filter(e=>e.checked).map(e=>e.value)}else t[r.name]=r.value}}),t}function Sd(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
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
  `}function Cd(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``,required:c=!1}={}){let l=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${l}">${n}${c?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <textarea id="${l}" name="${t}" rows="3" ${i?`placeholder="${R(i)}"`:``} ${a?`aria-describedby="${l}-hint"`:``} ${s}>${R(r)}</textarea>
      ${a?`<small id="${l}-hint">${a}</small>`:``}
    </div>
  `}function wd(e,t){return`
    <div class="coord-field is-wide">
      <span class="coord-label" id="coord-${e}-dias-label">Días</span>
      <div class="coord-days" role="group" aria-labelledby="coord-${e}-dias-label">
        ${ml.map(n=>`
          <label class="coord-day"><input type="checkbox" id="coord-${e}-dia-${tl(n)}" name="dias" value="${n}" ${t.includes(n)?`checked`:``} /><span>${n}</span></label>
        `).join(``)}
      </div>
    </div>
  `}function Td(e){if(!Bc||Bc.section!==e)return``;let t=Bc.undo?`<button class="coord-link" type="button" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${Bc.tone}">${g(Bc.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${R(Bc.text)}</span>${t}</p>`}function W(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?g(r,`coord-icon`):``}<span>${e}</span></button>`}function Ed({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${ol(e,s)?`open`:``}>
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
  `}function G(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function Dd(e){return e?.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${R(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${g(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${R(e)}</li>`).join(``)}
    </ul>
  `:``}function Od(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${R(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function kd(e,t){return e.length?`
    <div class="coord-warn-box" role="note" ${t?`id="${t}"`:``}>
      <h3>${g(`alertTriangle`,`coord-icon`)}<span>${e.length===1?`1 aviso para revisar`:`${e.length} avisos para revisar`}</span></h3>
      <ul>${e.map(e=>`<li>${R(e)}</li>`).join(``)}</ul>
      <p>No bloquea el guardado: revisalo antes de mandar la ruta.</p>
    </div>
  `:``}var Ad=`
  <datalist id="coord-team-users">${zt.map(e=>`<option value="${R(e.id)}">${R(e.name)} · ${R(e.label)}</option>`).join(``)}</datalist>
  <datalist id="coord-team-names">${zt.map(e=>`<option value="${R(e.name.split(` `)[0])}">${R(e.name)}</option>`).join(``)}</datalist>
`;function jd(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Md()}
      ${e}
    </div>
  `}function Md(){return`
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
  `}function Nd(){Ml(),Nl();let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${Pd()}
      ${Id()}
      ${Rd()}
      ${zd()}
      ${qd()}
      ${Qd()}
      ${$d()}
      ${nf()}
      ${of()}
      ${cf()}
      ${mf()}
      <p class="coord-footnote">
        Rutas de partida: ${R(x.officialSources.routes)} (${Rt}). Datos de perros: ${R(x.officialSources.dogs)}.
        Rutas, clientes, avisos y pedidos se guardan en los datos compartidos del equipo. Los pagos los ve solo Juan.
      </p>
      ${Ad}
    </main>
  `;return Bc=null,_d.clear(),e}function Pd(){let e=v.pendingCount(),t=navigator.onLine===!1,n=[...new Set(Ol.values())],r=[];return e?r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>${e} ${e===1?`cambio pendiente`:`cambios pendientes`} sin señal.</b> Se ${e===1?`envía solo`:`envían solos`} cuando vuelva.</span></p>`):t&&r.push(`<p class="coord-sync is-warn">${g(`clock`,`coord-icon`)}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva.</span></p>`),n.length&&r.push(`<div class="coord-sync is-error">${g(`alertCircle`,`coord-icon`)}<span>${n.map(R).join(` `)}</span>${W(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),Kl&&r.push(`<p class="coord-sync is-ok">${g(`uploadCloud`,`coord-icon`)}<span>${R(Kl)}</span></p>`),r.length?`<div class="coord-sync-list">${r.join(``)}</div>`:``}function Fd(e,{compact:t=!1}={}){let n=R(e.id),r=e.estado||`pendiente`,i=e.perroNombre||Bu(e)?.name||``,a=e.creadoPorNombre?`${e.creadoPorNombre}${e.creadoEn?`, ${Jc(e.creadoEn)}`:``}`:b,o=e.titulo||[e.tipo,i].filter(Boolean).join(`: `),s=Lu===e.id;return`
    <li class="coord-sol ${e.urgente?`is-urgent`:``} is-${R(r)}" id="coord-sol-${n}" tabindex="-1">
      <div class="coord-sol-head">
        <strong>${R(o||`Pedido de cambio`)}</strong>
        <span class="coord-badges">${e.urgente?G(`Urgente`,`alert`):``}${r===`aplicado`?G(`Aplicado`,`ok`):G(r===`rechazado`?`Rechazado`:`Pendiente`,`warn`)}</span>
      </div>
      <p class="coord-sol-where">${g(`route`,`coord-icon`)}<span>${R([e.fecha?Qc(e.fecha):``,e.turno,e.ruta].filter(Boolean).join(` · `)||`Pendiente de confirmar`)}</span></p>
      ${Od([[`Qué cambiar`,e.detalle],[`Por qué`,e.motivo],[`Pidió`,a],[`Respuesta`,e.respuesta]],t?`is-compact`:``)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      ${r===`pendiente`?`
        ${s?`
          <div class="coord-reject">
            <label for="coord-rechazo-${n}">Respuesta para el supervisor <span class="coord-required">(obligatorio)</span></label>
            <textarea id="coord-rechazo-${n}" rows="2" data-coord-rechazo="${n}" placeholder="Ej.: Ese día no hay lugar en la ruta; lo pasamos al lunes.">${R(Iu[e.id]||``)}</textarea>
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
  `}function Id(){let e=y(),t=dl(),n=ud(od()),r=zu(),i=r.filter(e=>e.urgente),a=au().length>0,o=cu(e),s=o.reduce((t,n)=>t+gu(n,e).list.length,0),c=o.reduce((e,t)=>e+(t.paradas||[]).length,0),l=Zu(),u=Qu(l).map(([e])=>e),d=dd(),f;if(i.length)f={text:`Resolvé el pedido urgente de <b>${R(i[0].creadoPorNombre||`supervisión`)}</b>: ${R(i[0].titulo||i[0].tipo||`cambio de ruta`)}.`,action:W(`Aplicar`,`data-coord-sol-aplicar="${R(i[0].id)}"`,`primary`,`arrowRight`)};else if(n.length){let e=n[n.length-1],t=e.datos||{};f={text:`Escribile a <b>${R(t.responsable||`quien hizo el pedido`)}</b> por la evaluación de <b>${R(t.perro||`su perro`)}</b>.`,action:W(`Ver pedido`,`data-coord-goto-pedido="${R(e.id)}"`,`primary`,`arrowRight`)}}else f=!a&&Dl.has(`plantillas`)?{text:`Cargá las rutas de la planilla RPJ para tener la semana armada.`,action:W(`Ir a rutas`,`data-coord-goto="coord-rutas"`,`primary`,`arrowRight`)}:r.length?{text:`Respondé el pedido de cambio de <b>${R(r[0].creadoPorNombre||`supervisión`)}</b>.`,action:W(`Aplicar`,`data-coord-sol-aplicar="${R(r[0].id)}"`,`primary`,`arrowRight`)}:s?{text:`Revisá ${s===1?`el aviso`:`los ${s} avisos`} de las rutas de hoy.`,action:W(`Ver rutas de hoy`,`data-coord-ver-dia="${e}"`,`primary`,`arrowRight`)}:d.length?{text:`Confirmá el dato de <b>${R(d[0].name)}</b>: ${R(d[0].review||`estado "${d[0].status}"`)}`,action:W(`Ver datos`,`data-coord-open="datos"`,`primary`,`arrowRight`)}:{text:`Todo en orden. Mirá las rutas del día siguiente.`,action:W(`Ver el día siguiente`,`data-coord-ver-dia="${Xc(e,1)}"`,`primary`,`arrowRight`)};let p=r.slice(0,3);return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${Qc(e)}</p>
        <p class="coord-greeting">Hola, ${R(t.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
      </div>

      ${r.length?`
        <div class="coord-sol-alert" id="coord-sol-urgente" tabindex="-1">
          <h2>${g(`bell`,`coord-icon`)}<span>${r.length===1?`1 pedido de cambio del supervisor`:`${r.length} pedidos de cambio del supervisor`}</span></h2>
          ${Td(`solicitudes`)}
          <ul class="coord-sol-list">${p.map(e=>Fd(e,{compact:!0})).join(``)}</ul>
          ${r.length>p.length?`<p>Y ${r.length-p.length} más. ${W(`Ver todos`,`data-coord-open="solicitudes"`,`ghost`)}</p>`:``}
        </div>`:Td(`solicitudes`)}

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-alert`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Pedidos nuevos de la web</h2>
            <p class="coord-big"><b>${n.length}</b> <span>${n.length,`sin responder`}</span></p>
            <p>${n.length?R(nl(n.slice(0,3).map(e=>e.datos?.perro||`Pendiente de confirmar`))):Dl.has(`pedidos`)?`No hay pedidos nuevos.`:`Cargando pedidos…`}</p>
          </div>
          ${W(`Ver pedidos`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${a?s?`is-alert`:`is-ok`:`is-warn`}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Rutas de hoy</h2>
            ${!a&&!o.length?`<p class="coord-big"><b>0</b> <span>rutas</span></p><p>${Dl.has(`plantillas`)?`Todavía no hay rutas cargadas.`:`Cargando rutas…`}</p>`:`<p class="coord-big"><b>${o.length}</b> <span>${o.length===1?`ruta`:`rutas`}</span> <b>${c}</b> <span>paseos</span></p>
                 ${s?`<p class="coord-inline-alert is-strong">${g(`alertTriangle`,`coord-icon`)}<span>${s} ${s===1?`aviso`:`avisos`} para revisar</span></p>`:`<p>Sin avisos.</p>`}`}
          </div>
          ${W(a?`Ver rutas de hoy`:`Cargar rutas`,a?`data-coord-ver-dia="${e}"`:`data-coord-goto="coord-rutas"`,`secondary`)}
        </li>
        <li class="coord-priority ${l.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Avisos de barrio vigentes</h2>
            <p class="coord-big"><b>${l.length}</b> <span>${u.length===1?`en 1 barrio`:`en ${u.length} barrios`}</span></p>
            <p>${l.length?R(nl(u.slice(0,3))):`Sin avisos vigentes.`}</p>
          </div>
          ${W(l.length?`Ver avisos`:`Cargar un aviso`,l.length?`data-coord-goto="coord-avisos-vigentes"`:`data-coord-open="avisos"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function Ld(e,{history:t=!1}={}){let n=R(e.id);return`
    <li class="coord-aviso ${t?`is-old`:``}">
      <div class="coord-aviso-head">
        ${t?`<strong>${R(e.barrio||`Sin barrio`)}</strong>`:``}
        ${G(R(e.tipo||`otro`),e.tipo===`seguridad`||e.tipo===`perro suelto`?`alert`:`warn`)}
        <small>${t?`Venció`:`Hasta`} el ${R(qc(Yc(e.vigenteHasta)?e.vigenteHasta:e.fecha))}</small>
      </div>
      <p>${R(e.mensaje||e.titulo||``)}</p>
      ${zl(e)}
      <div class="coord-actions">
        ${W(`Copiar para WhatsApp`,`data-coord-aviso-copy="${n}"`,`ghost`,`copy`)}
        ${t?``:W(`Ya no está vigente`,`data-coord-aviso-fin="${n}"`,`ghost`)}
      </div>
    </li>
  `}function Rd(){let e=Zu();return e.length?`
    <section class="coord-block coord-avisos-strip" id="coord-avisos-vigentes" tabindex="-1" aria-labelledby="coord-avisos-vig-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-avisos-vig-title">Avisos vigentes por barrio</h2>
          <p>Lo que el equipo tiene que saber hoy en cada barrio.</p>
        </div>
        ${W(`Cargar un aviso`,`data-coord-open="avisos"`,`secondary`,`plus`)}
      </div>
      ${Td(`avisosTop`)}
      <div class="coord-barrios">
        ${Qu(e).map(([e,t])=>`
          <section class="coord-barrio" aria-label="Avisos en ${R(e)}">
            <h3>${g(`mapPin`,`coord-icon`)}<span>${R(e)}</span> <small>${t.length}</small></h3>
            <ul class="coord-aviso-list">${t.map(e=>Ld(e)).join(``)}</ul>
          </section>
        `).join(``)}
      </div>
    </section>
  `:``}function zd(){let e=au(),t=!Dl.has(`plantillas`)&&!e.length,n;if(H)n=Kd();else if(t)n=`<p class="coord-empty">${g(`clock`,`coord-icon`)}Cargando rutas…</p>`;else if(!e.length||Su)n=Bd();else{let e=wu();n=`
      <div class="coord-seg" role="group" aria-label="Qué querés ver">
        <button type="button" class="coord-seg-btn" id="coord-vista-semana" data-coord-vista="semana" aria-pressed="${e===`semana`}">${g(`calendarCheck`,`coord-icon`)}<span>Semana (se repite)</span></button>
        <button type="button" class="coord-seg-btn" id="coord-vista-dia" data-coord-vista="dia" aria-pressed="${e===`dia`}">${g(`route`,`coord-icon`)}<span>Un día puntual</span></button>
      </div>
      ${e===`semana`?Hd():Ud()}
    `}return`
    <section class="coord-block coord-routes" id="coord-rutas" tabindex="-1" aria-labelledby="coord-rutas-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-rutas-title">Rutas y horarios</h2>
          <p>La <b>semana</b> se repite todas las semanas. Si un día puntual cambia algo, guardalo <b>solo para ese día</b>: la semana no se toca.</p>
        </div>
      </div>
      ${Td(`rutas`)}
      ${n}
    </section>
  `}function Bd(){let e=nn(),t=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <div class="coord-carga">
      <p>Todavía no hay rutas armadas en la app. Podés arrancar con las rutas reales de la planilla RPJ (hoja BASE RUTAS, leída el 12/11/2026): <b>${e.length} rutas</b> y <b>${t} paseos</b> con su hora de retiro. Después las cambiás acá.</p>
      ${Su?`<p class="coord-note" role="status">${g(`clock`,`coord-icon`)}<span>${R(Su)}</span></p>`:``}
      ${xu?`
        <div class="coord-confirm" role="group" aria-labelledby="coord-carga-q">
          <p id="coord-carga-q"><b>¿Confirmás?</b> Se guardan ${e.length} rutas como semana base. Las ve todo el equipo.</p>
          <div class="coord-actions">
            ${W(`Sí, cargar las rutas`,`id="coord-carga-ok" data-coord-carga-ok`,`primary`,`checkCircle`)}
            ${W(`Cancelar`,`id="coord-carga-cancel" data-coord-carga-cancel`,`ghost`)}
          </div>
        </div>`:`<button class="coord-btn is-primary coord-btn-big" type="button" id="coord-carga" data-coord-carga>${g(`uploadCloud`,`coord-icon`)}<span>Cargar las rutas de la planilla RPJ</span></button>`}
      <p class="coord-meta">No incluye a «Llak» (jueves tarde): el nombre no coincide con ningún perro. Paseador y ayudante quedan para completar.</p>
    </div>
  `}function Vd(e,{warnings:t,attrs:n}){let r=(e.paradas||[]).length;return`
    <button type="button" class="coord-wroute ${t?`is-alert`:``}" ${n}>
      <span class="coord-wroute-top"><strong>${R(e.ruta)}</strong>${t?`<span class="coord-wroute-warn">${g(`alertTriangle`,`coord-icon`)}${t}<span class="coord-sr-only"> ${t===1?`aviso`:`avisos`}</span></span>`:``}</span>
      <span>${r} ${r===1?`perro`:`perros`} · ${R(uu(e))}</span>
      <small>${e.paseador?R(Sl(e.paseador)):`Sin paseador`}</small>
    </button>
  `}function Hd(){let e=au(),t=Zc(y()),n=e.some(e=>e.dia===`Domingo`)?C:ml,r=e.reduce((e,t)=>e+t.paradas.length,0);return`
    <p class="coord-meta">${e.length} rutas · ${r} paseos por semana. Tocá una ruta para editar sus horarios.</p>
    <div class="coord-week">
      ${n.map(e=>`
        <section class="coord-wday ${e===t?`is-today`:``}" aria-labelledby="coord-wday-${tl(e)}">
          <h3 id="coord-wday-${tl(e)}">${e}${e===t?` <span class="coord-tag">Hoy</span>`:``}</h3>
          ${hl.map(t=>`
              <div class="coord-wturno">
                <p class="coord-wturno-label">${t}</p>
                ${su(e).filter(e=>e.turno===t).map(n=>Vd(n,{warnings:hu(n).list.length,attrs:`id="coord-wr-${R(n.id)}" data-coord-edit-plantilla="${R(n.id)}" aria-label="Editar ${R(n.ruta)} del ${e.toLowerCase()} a la ${t.toLowerCase()}"`})).join(``)}
                <button type="button" class="coord-wadd" id="coord-wadd-${tl(e)}-${tl(t)}" data-coord-new-route data-dia="${e}" data-turno="${t}">${g(`plus`,`coord-icon`)}<span>Ruta</span><span class="coord-sr-only"> nueva el ${e.toLowerCase()} a la ${t.toLowerCase()}</span></button>
              </div>
            `).join(``)}
        </section>
      `).join(``)}
    </div>
  `}function Ud(){let e=y(),t=Eu(),n=cu(t),r=n.reduce((e,t)=>e+(t.paradas||[]).length,0);return`
    <div class="coord-dayview">
      <div class="coord-day-pick">
        <div class="coord-field">
          <label for="coord-rutas-fecha">Día</label>
          <input id="coord-rutas-fecha" type="date" value="${t}" min="${e}" max="${Xc(e,90)}" data-coord-rutas-fecha />
        </div>
        <div class="coord-day-quick">
          ${W(`Hoy`,`id="coord-dia-hoy" data-coord-ver-dia="${e}"`,t===e?`secondary`:`ghost`)}
          ${W(`Día siguiente`,`id="coord-dia-manana" data-coord-ver-dia="${Xc(e,1)}"`,t===Xc(e,1)?`secondary`:`ghost`)}
        </div>
      </div>
      <h3 class="coord-day-title">${R(Qc(t))} · ${n.length} ${n.length===1?`ruta`:`rutas`} · ${r} paseos</h3>
      ${n.length?`<div class="coord-actions">${W(`Copiar todas las rutas del día`,`id="coord-copy-dia" data-coord-copy-dia="${t}"`,`ghost`,`copy`)}</div>`:`<p class="coord-empty is-small">No hay rutas para este día.</p>`}
      <ul class="coord-dayroutes">
        ${n.map(e=>{let n=gu(e,t),r=(e.paradas||[]).slice().sort((e,t)=>(fl(e.hora)??9999)-(fl(t.hora)??9999));return`
            <li class="coord-dayroute ${n.list.length?`is-alert`:``}">
              <div class="coord-card-head">
                <strong>${R(e.ruta)} · ${R(e.turno)}</strong>
                ${e.origen===`dia`?G(`Cambio solo para este día`,`warn`):G(`Igual que la semana`,`neutral`)}
              </div>
              <p>${r.length} ${r.length===1?`perro`:`perros`} · ${R(uu(e))} · Paseador: ${R(Sl(e.paseador)||`Pendiente de confirmar`)}${e.ayudante?` · Ayudante: ${R(Sl(e.ayudante))}`:``}</p>
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
        ${hl.map(e=>W(`Ruta extra solo este día (${e.toLowerCase()})`,`id="coord-extra-${tl(e)}" data-coord-new-dia data-turno="${e}" data-fecha="${t}"`,`ghost`,`plus`)).join(``)}
      </div>
    </div>
  `}function Wd(e,t,n){let r=bl(e),i=n.byStop.get(t)||[],a=pl(e.hora)?en(V(e.hora),e.minutos||45):``,o=H.paradas.length-1,s=e.perroNombre||r?.name||`Pendiente de confirmar`;return`
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
          <input id="coord-ed-hora-${t}" type="time" step="300" value="${R(V(e.hora))}" data-coord-stop="${t}" data-k="hora" ${pl(e.hora)?``:`aria-invalid="true"`} />
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
  `}function Gd(){if(!H)return``;let e=z(vu);if(!e)return`<p class="coord-meta">Escribí el nombre del perro. Se agrega a la hora de arriba.</p>`;let t=new Set(H.paradas.map(e=>bl(e)?.id).filter(Boolean)),n=w.filter(t=>z(t.name).includes(e)).slice(0,6),r=w.some(t=>z(t.name)===e),i=pl(yu)?V(yu):du(H);return`
    <ul class="coord-results">
      ${n.map(e=>`
        <li>
          <button type="button" class="coord-result" id="coord-add-${e.id}" data-coord-add-dog="${e.id}">
            ${g(`plus`,`coord-icon`)}
            <span><b>${R(e.name)}</b> <small>${R(e.size)} · ${R(al(e))}</small></span>
            ${e.status===`Activo`?``:G(R(e.status),`alert`)}
            ${t.has(e.id)?G(`Ya está en la ruta`,`warn`):``}
            <span class="coord-result-hora">${i}</span>
          </button>
        </li>`).join(``)}
      ${!r&&vu.trim().length>=2?`
        <li>
          <button type="button" class="coord-result is-free" id="coord-add-libre" data-coord-add-libre>
            ${g(`plus`,`coord-icon`)}<span>Agregar «${R(vu.trim())}» (perro sin ficha)</span><span class="coord-result-hora">${i}</span>
          </button>
        </li>`:``}
    </ul>
    ${n.length?``:`<p class="coord-meta">No hay perros con ese nombre en el registro.</p>`}
  `}function Kd(){let e=H,t=ju(),n=e.solicitudId?Ru().find(t=>t.id===e.solicitudId):null,r=e.modo===`plantilla`,i=r?el(e.dia):[],a=pl(yu)?V(yu):du(e);return`
    <div class="coord-editor ${r?`is-plantilla`:`is-dia`}" id="coord-editor" tabindex="-1" aria-labelledby="coord-editor-title">
      <div class="coord-editor-mode" role="note">
        ${g(r?`calendarCheck`:`alertTriangle`,`coord-icon`)}
        <div>
          <p class="coord-editor-kicker">${r?`Estás editando la SEMANA`:`Estás editando SOLO UN DÍA`}</p>
          <h3 id="coord-editor-title">${R(e.ruta)} · ${r?`${R(e.dia)} · ${R(e.turno)}`:`${R(Qc(e.fecha))} · ${R(e.turno)}`}</h3>
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

      ${Td(`editor`)}

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
            <input id="coord-ed-buscar" type="search" value="${R(vu)}" data-coord-ed-search autocomplete="off" placeholder="Nombre del perro" aria-controls="coord-ed-results" />
          </div>
          <div class="coord-field coord-add-hora">
            <label for="coord-ed-nueva-hora">Hora de retiro</label>
            <input id="coord-ed-nueva-hora" type="time" step="300" value="${R(a)}" data-coord-ed-hora aria-describedby="coord-ed-nueva-hora-hint" />
            <small id="coord-ed-nueva-hora-hint">Sugerida: la última + 15 min.</small>
          </div>
        </div>
        <div id="coord-ed-results" aria-live="polite">${Gd()}</div>
      </div>

      <div class="coord-stops-head">
        <h4>Paradas en orden <span>${e.paradas.length}</span></h4>
        ${e.paradas.length>1?W(`Ordenar por hora`,`id="coord-ed-sort" data-coord-ed-sort`,`ghost`,`clock`):``}
      </div>
      ${e.paradas.length?`<ol class="coord-stops">${e.paradas.map((e,n)=>Wd(e,n,t)).join(``)}</ol>`:`<p class="coord-empty is-small">La ruta no tiene perros todavía. Buscalos arriba.</p>`}

      ${kd(t.list,`coord-ed-warnings`)}

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
                ${i.map(t=>`<option value="${t}" ${t===e.soloDia?`selected`:``}>${R(Qc(t))}${t===y()?` (hoy)`:``}${ou().some(n=>n.id===iu(t,e.ruta))?` · ya tiene un cambio: se reemplaza`:``}</option>`).join(``)}
              </select>
            </div>
            ${W(`Guardar solo para ese día`,`id="coord-ed-save-dia" data-coord-ed-save="dia"`,`secondary`)}
          </div>`:`
          <div class="coord-save-box is-main">
            <p><b>Guardar solo para el ${R(Qc(e.fecha).toLowerCase())}.</b>${n?` El pedido del supervisor queda como aplicado.`:``}</p>
            ${W(`Guardar solo para el ${R(qc(e.fecha))}`,`id="coord-ed-save" data-coord-ed-save="dia"`,`primary`,`checkCircle`)}
          </div>
          ${e.existeDia&&Rl(e.existeDia)?`
            <div class="coord-save-box">
              <p>¿Ese día tiene que quedar igual que la semana?</p>
              ${W(`Volver a la ruta de la semana`,`id="coord-ed-revert" data-coord-ed-revert`,`ghost`)}
            </div>`:``}`}
      </div>

      ${bu===`salir`?`
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
  `}function qd(){let e=Ru(),t=zu(),n=e.filter(e=>(e.estado||`pendiente`)!==`pendiente`),r=`
    <p class="coord-note">${g(`users`,`coord-icon`)}<span>El supervisor mira las rutas y, si habló con alguien o pasó algo, te pide el cambio. Vos lo aplicás o lo rechazás con una respuesta: la ve el supervisor.</span></p>
    ${Td(`solicitudesTodas`)}
    <h3 class="coord-subtitle">Pendientes <span>${t.length}</span></h3>
    ${t.length?`<ul class="coord-sol-list">${t.map(e=>Fd(e)).join(``)}</ul>`:`<p class="coord-empty is-small">${Dl.has(`solicitudes`)?`No hay pedidos pendientes.`:`Cargando…`}</p>`}
    ${n.length?`
      <details class="coord-more" ${ol(`solHist`)?`open`:``}>
        <summary data-coord-toggle="solHist">Respondidos en las últimas 2 semanas (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-sol-list">${n.map(e=>Fd(e,{compact:!0})).join(``)}</ul>
      </details>`:``}
  `;return Ed({key:`solicitudes`,id:`coord-solicitudes`,iconName:`bell`,title:`Pedidos de cambio del supervisor`,intro:`Aplicalos en la ruta del día o respondé por qué no.`,badges:t.length?G(`${t.length} ${t.length===1?`pendiente`:`pendientes`}`,`alert`):G(`Al día`,`neutral`),body:r})}function Jd(e){return(Array.isArray(e)?e:[]).map(e=>_l.get(e)?.name||e)}function Yd(e){let t=R(e.id),n=Uu.find(([t])=>t===e.estado)||Uu[0],r=Jd(e.perros);return`
    <li class="coord-card coord-cliente is-${R(n[0])}">
      <div class="coord-card-head">
        <strong>${R(e.nombre||`Pendiente de confirmar`)}</strong>
        ${G(n[1],n[0]===`activo`?`ok`:n[0]===`pausa`?`warn`:`neutral`)}
      </div>
      ${Od([[`Perros`,r.length?nl(r):b],[`Barrio`,e.barrio],[`Plan`,e.plan&&e.plan!==`Pendiente de confirmar`?e.plan:``],[`Días`,Array.isArray(e.dias)&&e.dias.length?il(e.dias):``],[`Turno`,e.turno&&e.turno!==`Pendiente de confirmar`?e.turno:``],[`Teléfono`,e.telefono],[`Notas`,e.notas]],`is-compact`)}
      ${e.pendiente?`<p class="coord-meta is-pending">${g(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``}
      <div class="coord-actions">
        ${pd(e.telefono,`Hola ${e.nombre||``}, te escribo de Paseos Juan.`.replace(` ,`,`,`),`secondary`,`WhatsApp`)}
        ${W(`Editar`,`id="coord-cli-edit-${t}" data-coord-cliente-edit="${t}"`,`ghost`,`sliders`)}
      </div>
    </li>
  `}function Xd(){let e=z(qu),t=Ju();return e?t.filter(t=>z([t.nombre,t.barrio,t.telefono,t.notas,...Jd(t.perros)].join(` `)).includes(e)):t}function Zd(){let e=Xd();return e.length?`<ul class="coord-card-list is-grid">${e.map(Yd).join(``)}</ul>`:`<p class="coord-empty is-small">${Dl.has(`clientes`)?qu?`Ningún cliente coincide con la búsqueda.`:`Todavía no hay clientes cargados.`:`Cargando clientes…`}</p>`}function Qd(){let e=Ju(),t=vd(`cliente`),n=!!t.id,r=Array.isArray(t.perros)?t.perros:[],i=Array.isArray(t.dias)?t.dias:[],a=e.filter(e=>(e.estado||`activo`)===`activo`).length,o=w.slice().sort((e,t)=>e.name.localeCompare(t.name,`es`)),s=`
    ${Td(`clientes`)}
    <div class="coord-field coord-search">
      <label for="coord-clientes-buscar">Buscar cliente</label>
      <input id="coord-clientes-buscar" type="search" value="${R(qu)}" data-coord-clientes-buscar placeholder="Tutor, perro o barrio" autocomplete="off" aria-controls="coord-clientes-lista" />
    </div>
    <div id="coord-clientes-lista" aria-live="polite">${Zd()}</div>

    <form class="coord-form" id="coord-cliente-form" data-coord-form="cliente" novalidate tabindex="-1">
      <h3>${n?`Editando a ${R(t.nombre||`un cliente`)}`:`Cargar un cliente`}</h3>
      ${t.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Completado con los datos de un pedido. Revisalo antes de guardar.</span></p>`:``}
      <input type="hidden" name="id" value="${R(t.id||``)}" />
      <input type="hidden" name="pedidoId" value="${R(t.pedidoId||``)}" />
      <div class="coord-grid">
        ${Sd(`cliente`,`nombre`,`Nombre del tutor`,{value:t.nombre,required:!0,attrs:`autocomplete="off"`})}
        ${Sd(`cliente`,`telefono`,`Teléfono`,{value:t.telefono,type:`tel`,attrs:`autocomplete="off" inputmode="tel"`,hint:`Celular con código de área (ej.: 11 1234-5678).`})}
        ${Sd(`cliente`,`barrio`,`Barrio`,{value:t.barrio,attrs:`list="coord-barrios" autocomplete="off"`,hint:`Elegí uno o escribí otro.`})}
        ${U(`cliente`,`plan`,`Plan`,Wu,{value:t.plan||`Pendiente de confirmar`})}
        ${U(`cliente`,`turno`,`Turno`,Gu,{value:t.turno||`Pendiente de confirmar`})}
        ${U(`cliente`,`estado`,`Estado`,Uu,{value:t.estado||`activo`})}
        <div class="coord-field is-wide">
          <span class="coord-label" id="coord-cliente-perros-label">Perros${r.length?` (${r.length})`:``}</span>
          <input id="coord-cliente-perros-buscar" type="search" data-coord-filter-perros placeholder="Filtrar perros" autocomplete="off" aria-label="Filtrar la lista de perros" />
          <div class="coord-checks" role="group" aria-labelledby="coord-cliente-perros-label">
            ${o.map(e=>`<label class="coord-check" data-name="${R(z(e.name))}"><input type="checkbox" id="coord-cliente-perro-${e.id}" name="perros" value="${e.id}" ${r.includes(e.id)?`checked`:``} /><span>${R(e.name)} <small>${R(e.size)}</small></span></label>`).join(``)}
          </div>
          <small>Si el perro todavía no está en el registro, anotalo en notas y cargá su ficha en «Alta de perro nuevo».</small>
        </div>
        ${wd(`cliente`,i)}
        ${Cd(`cliente`,`notas`,`Notas`,{value:t.notas,hint:`Lo operativo: llaves, portería, horarios. Sin datos de salud ni de pago.`})}
      </div>
      <datalist id="coord-barrios">${$u().map(e=>`<option value="${R(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">
        ${W(n?`Guardar cambios`:`Guardar cliente`,`id="coord-cliente-save" data-coord-cliente-save`,`primary`,`plus`)}
        ${n||t.pedidoId?W(`Cancelar`,`data-coord-cliente-cancel`,`ghost`):``}
      </div>
    </form>
  `;return Ed({key:`clientes`,id:`coord-clientes`,iconName:`users`,title:`Clientes`,intro:`Tutores, sus perros, plan, días y turno. Solo lo ven Juan y coordinación.`,badges:e.length?G(`${a} ${a===1?`activo`:`activos`}`,`neutral`):``,body:s})}function $d(){let e=vd(`aviso`),t=y(),n=Yu(),r=n.filter(e=>Xu(e,t)),i=n.filter(e=>!Xu(e,t)).slice(0,20),a=`
    ${Td(`avisos`)}
    <form class="coord-form" data-coord-form="aviso" novalidate>
      <h3>Cargar un aviso</h3>
      <div class="coord-grid">
        ${Sd(`aviso`,`barrio`,`Barrio`,{value:e.barrio,required:!0,attrs:`list="coord-barrios-aviso" autocomplete="off"`})}
        ${U(`aviso`,`tipo`,`Tipo`,Ku,{value:e.tipo||Ku[0]})}
        ${Sd(`aviso`,`vigenteHasta`,`Vigente hasta`,{value:e.vigenteHasta||t,type:`date`,attrs:`min="${t}"`})}
        ${Cd(`aviso`,`mensaje`,`Qué pasa`,{value:e.mensaje,required:!0,placeholder:`Ej.: Corte de calle en la entrada principal. Entrar por la puerta 2.`})}
      </div>
      <datalist id="coord-barrios-aviso">${$u().map(e=>`<option value="${R(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${W(`Guardar aviso`,`id="coord-aviso-save" data-coord-aviso-save`,`primary`,`plus`)}</div>
    </form>
    <div class="coord-subblock">
      <h3>Vigentes <span>${r.length}</span></h3>
      ${r.length?`<p class="coord-meta">Están arriba, agrupados por barrio.</p>`:`<p class="coord-empty is-small">${Dl.has(`avisos`)?`No hay avisos vigentes.`:`Cargando…`}</p>`}
    </div>
    ${i.length?`
      <details class="coord-more" ${ol(`avisosViejos`)?`open`:``}>
        <summary data-coord-toggle="avisosViejos">Avisos vencidos (${i.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-aviso-list">${i.map(e=>Ld(e,{history:!0})).join(``)}</ul>
      </details>`:``}
  `;return Ed({key:`avisos`,id:`coord-avisos`,iconName:`mapPin`,title:`Avisos por barrio`,intro:`Obras, cortes, perros sueltos, clima o seguridad. Los ve todo el equipo.`,badges:r.length?G(`${r.length} ${r.length===1?`vigente`:`vigentes`}`,`warn`):``,body:a})}function ef(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return Od([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function tf(e,t,n){let r=ad(e),i=e.origen===`web`,a=e.datos||{},o=R(e.id),s=t.get(e.id),c=n.get(e.id),l={nuevo:W(`Empezar`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)+W(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`ghost`),"en-curso":W(`Resolver`,`data-coord-pedido-move="${o}" data-estado="resuelto"`,`secondary`)+W(`Volver a nuevo`,`data-coord-pedido-move="${o}" data-estado="nuevo"`,`ghost`),resuelto:W(`Reabrir`,`data-coord-pedido-move="${o}" data-estado="en-curso"`,`secondary`)}[r],u=`pedido-${e.id}`,d=r!==`resuelto`||cl.has(u),f=(i||/evaluaci/i.test(e.tipo||``))&&!s&&r!==`resuelto`,p=i?r===`resuelto`?`<details class="coord-card-more" ${d?`open`:``}><summary data-coord-mem-toggle="${R(u)}">Ver datos del formulario ${g(`chevronDown`,`coord-icon`)}</summary>${ef(e)}</details>`:ef(e):`<p class="coord-card-dog">${g(`pawPrint`,`coord-icon`)}${R(ld(e)||`Pendiente de confirmar`)}</p>${e.detalle?`<p>${R(e.detalle)}</p>`:``}`,m=a.responsable?`Hola ${a.responsable}`:`Hola`;return`
    <li class="coord-card ${i?`is-web`:``}" id="coord-pedido-${o}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${R(i?a.perro||`Pendiente de confirmar`:e.tipo||`Pedido`)}</strong>
        <small>${i?R(e.tipo||`Formulario web`):`${R(qc(e.fecha))}${a.canal?` · ${R(a.canal)}`:``}`}</small>
      </div>
      ${i?`<p class="coord-badges">${G(`Formulario web`,`warn`)}</p>`:``}
      ${p}
      ${zl(e,{web:i})}
      ${s?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Ficha creada para ${R(s.perroNombre)}</span></p>`:``}
      ${c?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Cliente cargado: ${R(c.nombre)}</span></p>`:``}
      <div class="coord-actions">
        ${r!==`resuelto`&&i?pd(a.telefono,`${m}, te escribo de Paseos Juan por el pedido de evaluación de ${a.perro||`tu perro`}.`,`primary`):``}
        ${l}
        ${!c&&(i||a.responsable)?W(`Convertir en cliente`,`data-coord-pedido-cliente="${o}"`,`ghost`,`userPlus`):``}
        ${f?W(`Armar ficha con estos datos`,`data-coord-pedido-ficha="${o}"`,`ghost`,`fileText`):``}
        ${r===`resuelto`&&Rl(e)?W(`Borrar`,`data-coord-pedido-delete="${o}"`,`ghost`):``}
      </div>
    </li>
  `}function nf(){let e=od(),t=vd(`pedido`),n=e.filter(e=>ad(e)!==`resuelto`).length,r=ud(e).length,i=new Map(sd().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),a=new Map(Ju().filter(e=>e.pedidoId).map(e=>[e.pedidoId,e])),o=!Dl.has(`pedidos`)&&!e.length,s=`
    ${Td(`pedidos`)}
    <div class="coord-board">
      ${rd.map(([t,n])=>{let r=e.filter(e=>ad(e)===t);return t===`nuevo`&&r.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`)),`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(e=>tf(e,i,a)).join(``)}</ul>`:`<p class="coord-empty is-small">${o?`Cargando…`:t===`nuevo`?`Sin pedidos nuevos.`:t===`en-curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${U(`pedido`,`tipo`,`Tipo de pedido`,td,{value:t.tipo})}
        ${Sd(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre del perro o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${U(`pedido`,`canal`,`Llegó por`,nd,{value:t.canal})}
        ${Cd(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${w.map(e=>`<option value="${R(e.name)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${W(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>
  `;return Ed({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Los del formulario de la web y los que cargás vos.`,badges:`${r?G(`${r} ${r===1?`nuevo`:`nuevos`} de la web`,`alert`):``}${n?G(`${n} abiertos`,`warn`):G(`Sin pedidos abiertos`,`neutral`)}`,body:s,open:r>0})}function rf(e){let t=e.datos||{},n=vl.get(z(t.perro));return{pedidoId:e.id,nombre:t.responsable||``,telefono:t.telefono||``,barrio:[t.zona,t.referencia].filter(Boolean).join(` · `),perros:n?[n.id]:[],plan:b,dias:hd(t.dias),turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,estado:`activo`,notas:[`Desde el pedido del ${qc(e.fecha)}.`,!n&&t.perro?`Perro: ${t.perro} (todavía sin ficha en el registro).`:``].filter(Boolean).join(` `)}}function af(e,t){let n=t?t.actualizadoPorNombre||t.creadoPorNombre:``;return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${R(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?G(`Activo`,`neutral`):G(R(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${R(e.plan)} · ${R(e.size)} · ${R(al(e))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${R(e.review||`Estado "${e.status}".`)}</p>
      ${Dd(e)}
      ${t?.nota?`<p class="coord-meta">${R(t.nota)}</p>`:``}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${g(`checkCircle`,`coord-icon`)}<span>Resuelto${n?` por ${R(n)}`:``}${t.actualizadoEn?` el ${Jc(t.actualizadoEn)}`:``}${t.pendiente?` (sin señal: se enviará cuando vuelva)`:``}</span></p>${W(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:W(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function of(){let e=cd(),t=yl.filter(t=>!e[t.id]),n=yl.filter(t=>e[t.id]),r=`
    <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
    ${Td(`datos`)}
    ${t.length?`<ul class="coord-review-list">${t.map(e=>af(e)).join(``)}</ul>`:`<p class="coord-empty">${g(`checkCircle`,`coord-icon`)}No quedan datos por confirmar.</p>`}
    ${n.length?`
      <details class="coord-more" ${ol(`datosResueltos`)?`open`:``}>
        <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${g(`chevronDown`,`coord-icon`)}</summary>
        <ul class="coord-review-list">${n.map(t=>af(t,e[t.id])).join(``)}</ul>
      </details>`:``}
    <p class="coord-note">${g(`fileText`,`coord-icon`)}<span>El cambio todavía debe incorporarse al ${R(x.officialSources.dogs.toLowerCase())}.</span></p>
  `;return Ed({key:`datos`,id:`coord-datos`,iconName:`help`,title:`Datos a confirmar`,intro:`${n.length} de ${yl.length} resueltos.`,badges:t.length?G(`${t.length} pendientes`,`warn`):G(`Todo confirmado`,`ok`),body:r})}var sf=[b,`Sí`,`No`];function cf(){let e=vd(`alta`),t=sd(),n=Array.isArray(e.dias)?e.dias:[],r=[b,...Vt.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${g(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${Td(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${e.pedidoId?`<p class="coord-note">${g(`clipboardCheck`,`coord-icon`)}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>`:``}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${Sd(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${U(`alta`,`tamano`,`Tamaño`,[b,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${Sd(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${Sd(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${U(`alta`,`sexo`,`Sexo`,[b,`Macho`,`Hembra`],{value:e.sexo})}
          ${U(`alta`,`castrado`,`Castrado o castrada`,sf,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${Sd(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${Sd(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${Sd(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${U(`alta`,`zona`,`Zona`,[b,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${Sd(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${U(`alta`,`vacunas`,`Vacunas al día`,sf,{value:e.vacunas})}
          ${Sd(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${Cd(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${U(`alta`,`sujecion`,`Collar o pechera`,[b,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${U(`alta`,`bozal`,`Usa bozal`,sf,{value:e.bozal})}
          ${U(`alta`,`correa`,`Tiene correa propia`,sf,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${e.relatoTutor?Cd(`alta`,`relatoTutor`,`Lo que contó el tutor en el formulario (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${Cd(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,span:!1})}
          ${Cd(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${Cd(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${Sd(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${U(`alta`,`plan`,`Plan pedido`,r,{value:e.plan})}
          ${U(`alta`,`turno`,`Turno`,[b,`Mañana`,`Tarde`],{value:e.turno})}
          ${wd(`alta`,n)}
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
                <small>Alta ${R(qc(e.fecha))}</small>
              </div>
              <p class="coord-badges">${G(R(e.categoria||`SIN EVALUAR`),`neutral`)} ${G(`Primer paseo individual`,`warn`)}</p>
              <p>${R(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:t.tamano)} · Días: ${n.length?R(il(n).toLowerCase()):`pendientes`} · Turno: ${R(!t.turno||t.turno===`Pendiente de confirmar`?`pendiente`:t.turno.toLowerCase())}</p>
              ${zl(e)}
              <div class="coord-actions">
                ${W(`Copiar ficha`,`data-coord-alta-copy="${R(e.id)}"`,`ghost`,`copy`)}
                ${Rl(e)?W(`Borrar`,`data-coord-alta-delete="${R(e.id)}"`,`ghost`):``}
              </div>
            </li>`}).join(``)}
        </ul>`:`<p class="coord-empty is-small">${Dl.has(`fichas`)?`Todavía no hay perros nuevos cargados.`:`Cargando fichas…`}</p>`}
    </div>
  `;return Ed({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?G(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function lf(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${qc(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):b}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function uf(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>z(t.zona)===z(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:b,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,dias:hd(t.dias)}}function df(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>_l.get(e)?.name||e);return t.length?nl(t):``}function ff(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||Ll(e,t)}function pf(e,t){let n=df(e),r=e.titulo||(t===`incidente`?`Incidente`:`Observación`),i=e.riesgo?String(e.riesgo):``,a=t===`incidente`?[[`Perro`,n],[`Lugar`,e.lugar],[`Barrio`,e.barrio],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Perro`,n],[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]];return`
    <li class="coord-card coord-feed-item ${t===`incidente`?`is-incident`:``}">
      <div class="coord-card-head">
        <strong>${R(r)}</strong>
        <small>${R(qc(e.fecha))}${e.hora?` · ${R(e.hora)}`:``}</small>
      </div>
      ${i?`<p class="coord-badges">${G(`Riesgo: ${R(i)}`,/alto|grave/i.test(i)?`alert`:`warn`)}</p>`:``}
      ${Od(a)}
      ${zl(e)}
    </li>
  `}function mf(){let e=$c(6),t=El(`incidentes`).filter(t=>!t.fecha||t.fecha>=e).sort(ff),n=El(`observaciones`).filter(t=>!t.fecha||t.fecha>=e).sort(ff),r=`
    <p class="coord-note">${g(`eye`,`coord-icon`)}<span>Solo lectura. Las cargan los paseadores y supervisión. Últimos 7 días (desde el ${R(qc(e))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${t.length}</span></h3>
        ${t.length?`<ul class="coord-card-list">${t.map(e=>pf(e,`incidente`)).join(``)}</ul>`:`<p class="coord-empty is-small">${Dl.has(`incidentes`)?`Sin incidentes en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${n.length}</span></h3>
        ${n.length?`<ul class="coord-card-list">${n.map(e=>pf(e,`observacion`)).join(``)}</ul>`:`<p class="coord-empty is-small">${Dl.has(`observaciones`)?`Sin observaciones en los últimos 7 días.`:`Cargando…`}</p>`}
      </section>
    </div>
  `;return Ed({key:`actividad`,id:`coord-actividad`,iconName:`activity`,title:`Observaciones e incidentes`,intro:`Lo que registró el equipo en la calle en los últimos 7 días.`,badges:`${t.length?G(`${t.length} ${t.length===1?`incidente`:`incidentes`}`,`alert`):``}${n.length?G(`${n.length} ${n.length===1?`observación`:`observaciones`}`,`neutral`):``}`,body:r})}function hf(e,t,n){sl(e,!0),$(),ul(t,n)}async function gf(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function _f(e,t,n){gf(e).then(e=>{L(t,e?n:`No se pudo copiar. Probá de nuevo o copialo a mano.`,e?`ok`:`error`),Fl()})}function vf(e,t){return e.find(e=>e.id===t)}function yf(e){Cu=e,Tu(`dia`),$(),ul(`coord-rutas`)}async function bf(e){let t=Fu();if(t){L(`editor`,t[0],`error`),$(),B(t[1]);return}let n=Pu(),r=H,i;if(e===`plantilla`)i=await Vl(`plantillas`,{id:ru(n.ruta,n.dia),...n},{section:`rutas`,ok:`${n.ruta} del ${n.dia.toLowerCase()} guardada en la semana. Se repite todas las semanas.`});else{let e=r.modo===`plantilla`?r.soloDia:r.fecha;if(!Yc(e)){L(`editor`,`Elegí el día.`,`error`),$();return}if(i=await Vl(`rutas`,{id:iu(e,n.ruta),fecha:e,...n,dia:Zc(e),basadaEn:r.plantillaId||``},{section:`rutas`,ok:`${n.ruta}: cambio guardado solo para el ${Qc(e).toLowerCase()}. La semana no cambió.`}),i&&r.solicitudId){let t=Ru().find(e=>e.id===r.solicitudId);await Vl(`solicitudes`,{id:r.solicitudId,fecha:Yc(t?.fecha)?t.fecha:e,estado:`aplicado`,respuesta:r.respuesta.trim()||`Aplicado en la ruta ${n.ruta} del ${qc(e)}.`},{section:`rutas`,ok:`Cambio aplicado y pedido del supervisor marcado como aplicado.`})}i&&(Cu=e,Tu(`dia`))}i&&H===r&&(ku(),$(),ul(`coord-rutas`))}function xf(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target,n=t.closest(`[data-coord-toggle]`);if(n){let e=n.parentElement;return sl(n.dataset.coordToggle,!e.open),!0}let r=t.closest(`[data-coord-mem-toggle]`);if(r){let e=r.dataset.coordMemToggle;return r.parentElement.open?cl.delete(e):cl.add(e),!0}if(t.closest(`[data-coord-retry]`))return Pl(),Wl=!1,Wc(`Volviendo a pedir los datos.`),!0;let i=t.closest(`[data-coord-goto]`);if(i)return ul(i.dataset.coordGoto),!0;let a=t.closest(`[data-coord-goto-pedido]`);if(a)return hf(`pedidos`,`coord-pedido-${a.dataset.coordGotoPedido}`),!0;let o=t.closest(`[data-coord-open]`);if(o){let e=o.dataset.coordOpen,t={avisos:`#coord-aviso-barrio`,clientes:`#coord-clientes-buscar`}[e]||null;return hf(e,`coord-${e}`,t),!0}if(t.closest(`[data-coord-undo]`)){let e=Vc;if(Vc=null,e){let{pendiente:t,...n}=e.record;Ul(`undo`,()=>Vl(e.col,n,{section:e.section,ok:`Listo, se recuperó.`}))}return!0}let s=t.closest(`[data-coord-vista]`);if(s)return Tu(s.dataset.coordVista),$(),B(`coord-vista-${s.dataset.coordVista}`),!0;let c=t.closest(`[data-coord-ver-dia]`);if(c)return H?(ul(`coord-rutas`),!0):(yf(c.dataset.coordVerDia),!0);if(t.closest(`[data-coord-carga]`))return xu=!0,$(),B(`coord-carga-ok`),!0;if(t.closest(`[data-coord-carga-cancel]`))return xu=!1,$(),B(`coord-carga`),!0;if(t.closest(`[data-coord-carga-ok]`))return Ul(`carga`,async()=>{let e=nn(),t=0,n=0,r=``;for(let i of e){Su=`Guardando ${t+1} de ${e.length}…`,Fl();try{let e=await v.save(`plantillas`,i);t+=1,e.pendiente&&(n+=1)}catch(e){r=e.message}}xu=!1,Su=``,r?L(`rutas`,`Se guardaron ${t} de ${e.length} rutas. Error: ${r}`,`error`):L(`rutas`,`Listo: ${t} rutas cargadas en la semana.${n?` Sin señal: se envían cuando vuelva.`:``}`),Tu(`semana`),Fl()}),!0;let l=t.closest(`[data-coord-edit-plantilla]`);if(l){let e=vf(au(),l.dataset.coordEditPlantilla);return e&&(Ou(e,{modo:`plantilla`}),$(),ul(`coord-editor`)),!0}let u=t.closest(`[data-coord-new-route]`);if(u){let{dia:e,turno:t}=u.dataset;return Ou({ruta:Au(su(e),t),dia:e,turno:t,paradas:[],supervisor:``},{modo:`plantilla`,nuevo:!0}),$(),ul(`coord-editor`,`#coord-ed-ruta`),!0}let d=t.closest(`[data-coord-edit-dia]`);if(d){let e=d.dataset.fecha,t=cu(e).find(e=>e.ruta===d.dataset.coordEditDia);return t&&(Ou(t,{modo:`dia`,fecha:e}),$(),ul(`coord-editor`)),!0}let f=t.closest(`[data-coord-new-dia]`);if(f){let{fecha:e,turno:t}=f.dataset;return Ou({ruta:Au(cu(e),t),dia:Zc(e),turno:t,paradas:[]},{modo:`dia`,fecha:e,nuevo:!0}),$(),ul(`coord-editor`,`#coord-ed-ruta`),!0}let p=t.closest(`[data-coord-copy-ruta]`);if(p){let e=p.dataset.fecha,t=cu(e).find(e=>e.ruta===p.dataset.coordCopyRuta);return t&&_f(_u(t,{fecha:e}),`rutas`,`${t.ruta} copiada. Pegala en el grupo de WhatsApp del equipo.`),!0}let m=t.closest(`[data-coord-copy-dia]`);if(m){let e=m.dataset.coordCopyDia;return _f(cu(e).map(t=>_u(t,{fecha:e})).join(`

`),`rutas`,`Rutas del ${Qc(e).toLowerCase()} copiadas.`),!0}if(H){let e=t.closest(`[data-coord-add-dog]`);if(e){let t=_l.get(e.dataset.coordAddDog);return t&&(Mu(t),Wc(`${t.name} agregado a las ${H.paradas[H.paradas.length-1].hora}.`),$(),B(`coord-ed-buscar`)),!0}if(t.closest(`[data-coord-add-libre]`)){let e=vu.trim();return e&&(Mu(null,e),Wc(`${e} agregado como perro sin ficha.`),$(),B(`coord-ed-buscar`)),!0}let n=t.closest(`[data-coord-stop-up]`),r=t.closest(`[data-coord-stop-down]`);if(n||r){let e=Number((n||r).dataset[n?`coordStopUp`:`coordStopDown`]),t=n?e-1:e+1;if(t>=0&&t<H.paradas.length){[H.paradas[e],H.paradas[t]]=[H.paradas[t],H.paradas[e]],H.sucio=!0,$();let r=document.getElementById(`coord-ed-${n?`up`:`down`}-${t}`);B(r&&!r.disabled?r.id:`coord-ed-hora-${t}`),Wc(`${H.paradas[t].perroNombre} ahora es la parada ${t+1}.`)}return!0}let i=t.closest(`[data-coord-stop-del]`);if(i){let e=Number(i.dataset.coordStopDel),[t]=H.paradas.splice(e,1);return H.sucio=!0,Wc(`${t?.perroNombre||`Perro`} quitado de la ruta.`),$(),B(H.paradas.length?`coord-ed-hora-${Math.min(e,H.paradas.length-1)}`:`coord-ed-buscar`),!0}if(t.closest(`[data-coord-ed-sort]`))return Nu(),Wc(`Paradas ordenadas por hora.`),$(),B(`coord-ed-sort`),!0;let a=t.closest(`[data-coord-ed-save]`);if(a)return Ul(`editor-save`,()=>bf(a.dataset.coordEdSave)),!0;if(t.closest(`[data-coord-ed-revert]`)){let e=H.existeDia;return Ul(`editor-revert`,async()=>{await Hl(`rutas`,e,{section:`rutas`,ok:`${e.ruta} del ${qc(e.fecha)} vuelve a ser igual que la semana.`,undo:!1})&&(ku(),Fl())}),!0}if(t.closest(`[data-coord-ed-copy]`))return _f(_u(Pu(),H.modo===`dia`?{fecha:H.fecha}:{}),`editor`,`Ruta copiada. Pegala en el grupo de WhatsApp del equipo.`),!0;if(t.closest(`[data-coord-ed-close]`))return H.sucio?(bu=`salir`,$(),B(`coord-ed-close-cancel`)):(ku(),$(),ul(`coord-rutas`)),!0;if(t.closest(`[data-coord-ed-close-ok]`))return ku(),$(),ul(`coord-rutas`),!0;if(t.closest(`[data-coord-ed-close-cancel]`))return bu=``,$(),B(`coord-ed-close`),!0}let h=t.closest(`[data-coord-sol-aplicar]`);if(h){let e=vf(Ru(),h.dataset.coordSolAplicar);return e?H?.sucio&&H.solicitudId!==e.id?(L(`editor`,`Primero guardá o cerrá la ruta que estás editando.`,`error`),$(),ul(`coord-editor`),!0):(Hu(e),$(),ul(`coord-editor`),!0):!0}let ee=t.closest(`[data-coord-sol-rechazar]`);if(ee)return Lu=ee.dataset.coordSolRechazar,$(),B(`coord-rechazo-${Lu}`),!0;if(t.closest(`[data-coord-sol-rechazar-cancel]`)){let e=Lu;return Lu=``,$(),B(`coord-rechazar-${e}`),!0}let te=t.closest(`[data-coord-sol-rechazar-ok]`);if(te){let e=te.dataset.coordSolRechazarOk,n=(document.getElementById(`coord-rechazo-${e}`)?.value||Iu[e]||``).trim(),r=t.closest(`#coord-solicitudes`)?`solicitudesTodas`:`solicitudes`;if(n.length<3)return L(r,`Escribí una respuesta corta para el supervisor.`,`error`),Iu[e]=n,$(),B(`coord-rechazo-${e}`),!0;let i=vf(Ru(),e);return Ul(`sol-${e}`,async()=>{await Vl(`solicitudes`,{id:e,fecha:Yc(i?.fecha)?i.fecha:y(),estado:`rechazado`,respuesta:n},{section:r,ok:`Pedido rechazado. El supervisor ve tu respuesta.`})&&(delete Iu[e],Lu=``)}),!0}if(t.closest(`[data-coord-cliente-save]`)){let e=xd(t.closest(`[data-coord-form]`));if(yd(`cliente`,e),!e.nombre?.trim())return L(`clientes`,`Falta el nombre del tutor.`,`error`),$(),B(`coord-cliente-nombre`),!0;let n={nombre:e.nombre.trim(),telefono:e.telefono?.trim()||``,barrio:e.barrio?.trim()||``,perros:Array.isArray(e.perros)?e.perros:[],plan:e.plan||`Pendiente de confirmar`,dias:Array.isArray(e.dias)?e.dias:[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas?.trim()||``};return e.id&&(n.id=e.id),e.pedidoId&&(n.pedidoId=e.pedidoId),Ul(`cliente-save`,async()=>{if(await Vl(`clientes`,n,{section:`clientes`,ok:e.id?`Cambios de ${n.nombre} guardados.`:`${n.nombre} quedó cargado como cliente.`})&&(bd(`cliente`),e.pedidoId&&!e.id)){let t=vf(od(),e.pedidoId);t&&ad(t)===`nuevo`&&await v.save(`pedidos`,{id:t.id,estado:`en-curso`}).catch(()=>{})}}),!0}if(t.closest(`[data-coord-cliente-cancel]`))return bd(`cliente`),L(`clientes`,`Formulario vacío.`),$(),!0;let ne=t.closest(`[data-coord-cliente-edit]`);if(ne){let e=vf(Ju(),ne.dataset.coordClienteEdit);return e&&(gd.cliente={id:e.id,pedidoId:e.pedidoId||``,nombre:e.nombre||``,telefono:e.telefono||``,barrio:e.barrio||``,perros:e.perros||[],plan:e.plan||`Pendiente de confirmar`,dias:e.dias||[],turno:e.turno||`Pendiente de confirmar`,estado:e.estado||`activo`,notas:e.notas||``},_d.delete(`cliente`),$(),ul(`coord-cliente-form`,`#coord-cliente-nombre`)),!0}if(t.closest(`[data-coord-aviso-save]`)){let e=xd(t.closest(`[data-coord-form]`));yd(`aviso`,e);let n=y(),r=e.barrio?.trim()?e.mensaje?.trim()?e.vigenteHasta&&(!Yc(e.vigenteHasta)||e.vigenteHasta<n)?[`La fecha de «vigente hasta» tiene que ser hoy o después.`,`coord-aviso-vigenteHasta`]:null:[`Escribí qué pasa.`,`coord-aviso-mensaje`]:[`Falta el barrio.`,`coord-aviso-barrio`];if(r)return L(`avisos`,r[0],`error`),$(),B(r[1]),!0;let i=e.barrio.trim(),a=Ku.includes(e.tipo)?e.tipo:`otro`;return Ul(`aviso-save`,async()=>{await Vl(`avisos`,{fecha:n,barrio:i,tipo:a,mensaje:e.mensaje.trim(),vigenteHasta:e.vigenteHasta||n,titulo:`${a[0].toUpperCase()}${a.slice(1)} en ${i}`},{section:`avisos`,ok:`Aviso de ${i} guardado. Ya lo ve el equipo.`})&&bd(`aviso`)}),!0}let re=t.closest(`[data-coord-aviso-copy]`);if(re){let e=vf(Yu(),re.dataset.coordAvisoCopy),n=t.closest(`#coord-avisos`)?`avisos`:`avisosTop`;return e&&_f(ed(e),n,`Aviso copiado. Pegalo en el grupo de WhatsApp del equipo.`),!0}let g=t.closest(`[data-coord-aviso-fin]`);if(g){let e=vf(Yu(),g.dataset.coordAvisoFin);return e&&Ul(`aviso-${e.id}`,()=>Vl(`avisos`,{id:e.id,vigenteHasta:Xc(y(),-1)},{section:`avisos`,ok:`Aviso de ${e.barrio||`barrio`} marcado como terminado.`})),!0}let ie=t.closest(`[data-coord-resolve]`);if(ie){let e=ie.dataset.coordResolve,t=_l.get(e);return Ul(`resuelto-${e}`,()=>Vl(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{section:`datos`,ok:`${t?.name||e}: marcado como resuelto.`})),!0}let ae=t.closest(`[data-coord-unresolve]`);if(ae){let e=ae.dataset.coordUnresolve,t=_l.get(e);return Ul(`resuelto-${e}`,()=>Vl(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{section:`datos`,ok:`${t?.name||e}: volvió a pendientes.`})),!0}if(t.closest(`[data-coord-pedido-save]`)){let e=xd(t.closest(`[data-coord-form]`));if(yd(`pedido`,e),!e.perro?.trim()&&!e.detalle?.trim())return L(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),B(`coord-pedido-perro`),!0;let n=e.tipo||td[0],r=e.perro?.trim()||``;return Ul(`pedido-save`,async()=>{await Vl(`pedidos`,{fecha:y(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:e.detalle?.trim()||``,datos:{perro:r,canal:e.canal||nd[0]}},{section:`pedidos`,ok:`Pedido guardado en "Nuevo".`})&&bd(`pedido`)}),!0}let oe=t.closest(`[data-coord-pedido-move]`);if(oe){let e=oe.dataset.coordPedidoMove,t=oe.dataset.estado;return Ul(`pedido-${e}`,()=>Vl(`pedidos`,{id:e,estado:t},{section:`pedidos`,ok:`Pedido movido a "${id[t]}".`})),!0}let se=t.closest(`[data-coord-pedido-delete]`);if(se){let e=vf(od(),se.dataset.coordPedidoDelete);return e&&Ul(`pedido-${e.id}`,()=>Hl(`pedidos`,e,{section:`pedidos`,ok:`Pedido borrado.`})),!0}let ce=t.closest(`[data-coord-pedido-cliente]`);if(ce){let e=vf(od(),ce.dataset.coordPedidoCliente);return e&&(gd.cliente=rf(e),_d.delete(`cliente`),L(`clientes`,`Formulario completado con el pedido de ${e.datos?.responsable||`la web`}. Revisalo y guardalo.`),hf(`clientes`,`coord-cliente-form`,`#coord-cliente-nombre`)),!0}let le=t.closest(`[data-coord-pedido-ficha]`);if(le){let e=vf(od(),le.dataset.coordPedidoFicha);return e&&(gd.alta=uf(e),_d.delete(`alta`),L(`alta`,`Formulario completado con el pedido de ${ld(e)||`la web`}. Revisalo y guardalo.`),hf(`alta`,`coord-alta`,`#coord-alta-nombre`)),!0}if(t.closest(`[data-coord-alta-save]`)){let e=xd(t.closest(`[data-coord-form]`));if(yd(`alta`,e),!e.nombre?.trim())return L(`alta`,`Falta el nombre del perro.`,`error`),$(),B(`coord-alta-nombre`),!0;let n=e.nombre.trim(),r={...e,nombre:n,dias:Array.isArray(e.dias)?e.dias:[],primerPaseo:`Individual`};return Ul(`alta-save`,async()=>{await Vl(`fichas`,{fecha:y(),perroNombre:n,datos:r,categoria:`SIN EVALUAR`,estado:`lista`},{section:`alta`,ok:`Ficha de ${n} guardada. Arranca SIN EVALUAR y con primer paseo individual.`})&&bd(`alta`)}),!0}if(t.closest(`[data-coord-alta-clear]`))return bd(`alta`),L(`alta`,`Formulario vacío.`),$(),!0;let ue=t.closest(`[data-coord-alta-copy]`);if(ue){let e=vf(sd(),ue.dataset.coordAltaCopy);return e&&_f(lf(e),`alta`,`Ficha copiada. Pegala en el registro maestro.`),!0}let de=t.closest(`[data-coord-alta-delete]`);if(de){let e=vf(sd(),de.dataset.coordAltaDelete);return e&&Ul(`ficha-${e.id}`,()=>Hl(`fichas`,e,{section:`alta`,ok:`Ficha borrada.`})),!0}return!1}function Sf(e){let t=e.target;if(t.closest?.(`.coord-shell`)){if(H){if(t.matches(`[data-coord-ed-search]`)){vu=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=Gd());return}if(t.matches(`[data-coord-ed-hora]`)){yu=t.value;let e=document.getElementById(`coord-ed-results`);e&&(e.innerHTML=Gd());return}if(t.matches(`[data-coord-ed-field]`)){H[t.dataset.coordEdField]=t.value,H.sucio=!0;return}if(t.matches(`[data-coord-stop]`)){let e=H.paradas[Number(t.dataset.coordStop)];e&&(e[t.dataset.k]=(t.dataset.k,t.value),H.sucio=!0);return}}if(t.matches(`[data-coord-rechazo]`))Iu[t.dataset.coordRechazo]=t.value;else if(t.matches(`[data-coord-clientes-buscar]`)){qu=t.value;let e=document.getElementById(`coord-clientes-lista`);e&&(e.innerHTML=Zd())}else if(t.matches(`[data-coord-filter-perros]`)){let e=z(t.value);t.parentElement.querySelectorAll(`.coord-check`).forEach(t=>{t.hidden=!!e&&!t.dataset.name.includes(e)&&!t.querySelector(`input`).checked})}}}function Cf(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;if(t.matches(`[data-coord-rutas-fecha]`))return Yc(t.value)&&(Cu=t.value,Fl()),!0;if(H&&t.matches(`[data-coord-stop]`)){let e=H.paradas[Number(t.dataset.coordStop)];return e&&(e[t.dataset.k]=t.dataset.k===`minutos`?Number(t.value)||45:t.value,H.sucio=!0,t.dataset.k!==`nota`&&Fl()),!0}if(H&&t.matches(`[data-coord-ed-field]`))return H[t.dataset.coordEdField]=t.value,H.sucio=!0,!0;if(t.matches(`[data-coord-ed-hora], [data-coord-ed-search], [data-coord-rechazo], [data-coord-clientes-buscar], [data-coord-filter-perros]`))return!0;let n=t.closest(`[data-coord-form]`);if(n){if(yd(n.dataset.coordForm,xd(n)),n.dataset.coordForm===`cliente`&&t.name===`perros`){let e=document.getElementById(`coord-cliente-perros-label`),t=(gd.cliente.perros||[]).length;e&&(e.textContent=`Perros${t?` (${t})`:``}`)}return!0}return!1}function wf(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`.coord-btn.is-primary`)?.click())}function Tf(e){e.key===`Enter`&&e.target.matches?.(`.coord-shell [data-coord-ed-search]`)&&(e.preventDefault(),document.querySelector(`#coord-ed-results .coord-result`)?.click())}function Ef(){_e.push(xf),ve.push(Cf),document.addEventListener(`input`,Sf),document.addEventListener(`submit`,wf),document.addEventListener(`keydown`,Tf)}var Df=`paseosJuanAdmin_prioridadesHechas`,Of=`paseosJuanAdmin_seccionesAbiertas`,kf=`America/Argentina/Buenos_Aires`,Af=[`Pequeño`,`Mediano`,`Grande`],jf=S.manana.label,Mf=S.tarde.label,Nf=[`paseos`,`incidentes`,`checklists`,`pedidos`,`rutas`,`plantillas`,`avisos`],Pf=[`pagos`,`clientes`],Ff=10,If=[`Efectivo`,`Transferencia`,`Naranja X`],Lf=`Libro contable del Sistema de Gestión`,Rf=``,K={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,adminLoaded:!1,adminError:``,pagosMes:null,lateSignature:``,msgs:{users:null,live:null,pagos:null}},zf=()=>({fecha:y(),concepto:``,monto:``,medio:``,pasadoAlLibro:!1}),q={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{},pago:zf()};function J(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Y(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function X(e,t,n){return`${e} ${e===1?t:n}`}var Bf={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Vf(e){let t=C.filter(t=>e.includes(t)),n=t.map(e=>C.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${Bf[t[0]]} a ${Bf[t[t.length-1]]}`:t.map(e=>Bf[e]).join(`, `)}function Hf(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:kf,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:C.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function Uf(){return ae(Df)}function Wf(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Gf(){return new Set(ae(Of))}function Kf(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:kf,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function qf(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:kf,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function Jf(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function Yf(){return _.user()||{usuario:``,nombre:``,rol:`admin`}}function Xf(e){return String(e||``).trim().split(/\s+/)[0]||``}function Zf(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function Qf(e,t){return[`pedidos`,`plantillas`,`avisos`,...Pf].includes(e)?{}:{desde:t}}function $f(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function ep(e){return e.hora||Kf(e.creadoEn)}function tp(e=new Date){let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:kf,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),n=e=>Number(t.find(t=>t.type===e)?.value||0);return n(`hour`)%24*60+n(`minute`)}function np(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}var rp=810;function ip(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``)}function ap(e,t){let n=v.cached(`rutas`,Qf(`rutas`,e)).filter(t=>t.fecha===e),r=v.cached(`plantillas`,Qf(`plantillas`,e)).filter(e=>ip(e.dia)===ip(t)),i=!r.length,a=i?nn().filter(e=>ip(e.dia)===ip(t)):r,o=new Map;a.forEach(e=>o.set(e.ruta||e.id,{...e,fuente:i?`planilla`:`plantilla`})),n.forEach(e=>o.set(e.ruta||String(e.id).slice(11),{...e,fuente:`dia`}));let s=e=>(e.paradas||[]).map(e=>e.hora||`99:99`).sort()[0]||`99:99`,c=[...o.values()].sort((e,t)=>s(e).localeCompare(s(t))||String(e.ruta).localeCompare(String(t.ruta)));return{list:c,fromSheet:c.some(e=>e.fuente===`planilla`)}}function op(e,t,n){let r=(e,t)=>e.perroId&&t.perroId?e.perroId===t.perroId:ip(e.perroNombre)&&ip(e.perroNombre)===ip(t.perroNombre),i=t=>e.reduce((e,n)=>e+(n.paradas||[]).filter(e=>r(t,e)).length,0);return e.map(e=>{let a=$f({turno:e.turno}),o=(e.paradas||[]).map(e=>{let o=t.filter(t=>r(e,t)),s=o.find(e=>$f(e)===a)||(o.length===1&&i(e)===1?o[0]:null),c=s?.estado||`pendiente`,l=np(e.hora),u=`a-tiempo`;return c===`entregado`?u=`entregado`:c===`no-sale`?u=`no-sale`:c===`pendiente`&&l!==null&&n>l+Ff&&(u=`atrasado`),{...e,paseo:s,estado:c,status:u,prevista:l,atraso:u===`atrasado`?n-l:0}}),s=e=>o.filter(t=>t.status===e).length;return{route:e,shift:a,stops:o,aTiempo:s(`a-tiempo`),atrasados:s(`atrasado`),entregados:s(`entregado`),noSale:s(`no-sale`)}})}function sp(e){return v.cached(`avisos`,Qf(`avisos`,e)).filter(t=>{let n=t.fecha||String(t.creadoEn||``).slice(0,10),r=t.vigenteHasta||n;return n&&n<=e&&r>=e}).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``)))}function cp(){let e=y(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=v.cached(`paseos`,Qf(`paseos`,e)).filter(t),i=v.cached(`incidentes`,Qf(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),a=v.cached(`checklists`,Qf(`checklists`,e)).filter(t).sort(n),o=v.cached(`pedidos`,Qf(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),s=[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>$f(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}}),c=tp(),l=ap(e,Hf().dayName),u=op(l.list,r,c),d=u.flatMap(e=>e.stops.filter(e=>e.status===`atrasado`).map(t=>({...t,route:e.route})));return{hoy:e,paseos:r,incidentes:i,checklists:a,pedidosNuevos:o,shifts:s,nowMin:c,effective:l,compliance:u,late:d,lateNow:d.filter(e=>e.prevista<rp==c<rp),avisos:sp(e)}}function lp(e){return e.late.map(e=>`${e.route.ruta}:${e.perroId||e.perroNombre}`).join(`|`)}function up(){let e=y();K.adminLoaded||(K.adminLoaded=!0,dp().finally(()=>{Pf.forEach(t=>v.watch(t,Qf(t,e)))})),K.liveDay!==e&&(K.liveDay=e,fp(!1).finally(()=>{Nf.forEach(t=>v.watch(t,Qf(t,e)))}))}async function dp(){let e=y(),t=await Promise.allSettled(Pf.map(t=>v.list(t,Qf(t,e)))),n=[...new Set(t.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],r=K.adminError;K.adminError=n.join(` `),K.adminError&&Z(`pagos`,`No se pudieron traer pagos o clientes: ${K.adminError}`,!0),r!==K.adminError&&Q()}async function fp(e){let t=y(),n=await Promise.allSettled(Nf.map(e=>v.list(e,Qf(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=K.liveError;K.liveError=r.join(` `),K.liveError?Z(`live`,`No se pudieron actualizar los datos del día: ${K.liveError}`,!0):e?Z(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Z(`live`,`Datos del día actualizados.`),(e||i!==K.liveError)&&Q()}var pp={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},mp={admin:`todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.`,coordinador:`arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.`,supervisor:`controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.`,paseador:`hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.`,ayudante:`acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.`,marketing:`pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.`};function hp(e){let t=(nt[e]||[]).filter(e=>pp[e]).map(t=>e===`ayudante`&&t===`paseador`?`Paseador (modo ayudante)`:pp[t]);return`${t.length?`Paneles: ${Y(t)}.`:`Todavía no tiene panel.`} Qué hace: ${mp[e]||`Pendiente de confirmar`}`}function gp(){return K.usersLoading=!0,at.list().then(e=>{K.users=e,K.usersError=``}).catch(e=>{K.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,K.usersError,!0)}).finally(()=>{K.usersLoading=!1,Q()})}function _p(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function vp(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function yp(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!vp(e))return e}}function bp(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){K.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function xp(e){let t=K.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?J(t.text):``}</p>`}function Sp(){Object.entries(K.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function Q(){if(!Zf()||_.user()?.rol!==`admin`)return;let e=document.activeElement,t=e?.id,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.getElementById(t);if(r&&(r.focus({preventScroll:!0}),n))try{r.setSelectionRange(...n)}catch{}}function Cp(){return w.filter(e=>e.status===`Activo`&&e.days.length>0)}function wp(){let e=Cp(),t=C.map(t=>{let n=e.filter(e=>Jt(e,t,jf)).length,r=e.filter(e=>Jt(e,t,Mf)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function Tp(){let e=Cp(),t=new Map(w.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return w.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[jf,Mf].forEach(e=>{let t=C.filter(t=>Jt(o,t,e)&&Jt(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Ep(){return Cp().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function Dp(){return w.filter(e=>e.review||e.status!==`Activo`)}function Op(e){return e===jf?S.manana.route:S.tarde.routes.join(` o `)}function kp(e=cp()){let{conflicts:t}=Tp(),n=w.filter(e=>e.status!==`Activo`),r=Dp(),i=Ep().filter(e=>e.category===`SIN EVALUAR`),a=Cp(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${Y(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${ep(n)?` a las ${ep(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${Y(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(e.lateNow.length){let t=e.lateNow.length,n=e.nowMin<rp?`mañana`:`tarde`,r=e.lateNow.slice().sort((e,t)=>t.atraso-e.atraso),i=r[0],a=r.slice(0,3).map(e=>`${e.perroNombre} (${e.hora}, ${e.route.ruta})`),o=[...new Set(r.map(e=>e.route.ruta))],c=i.route.supervisor||Lp(i.route.paseador)||`el supervisor del turno`;e.paseos.length?s.push({id:`atrasos-${e.hoy}-${n}-${t}`,tag:`Atrasos`,tone:`warning`,title:`${X(t,`perro atrasado`,`perros atrasados`)} en el turno ${n}`,detail:`${Y(a)}${t>3?` y ${X(t-3,`más`,`más`)}`:``}. Pasaron más de ${Ff} minutos de la hora prevista y nadie marcó el retiro.`,action:`Preguntale a ${c} qué pasa con ${i.perroNombre} (retiro previsto ${i.hora}, ruta ${o.join(` y `)}).`,target:`adm-cumplimiento`,targetLabel:t===1?`Ver el atraso`:`Ver los atrasos`}):s.push({id:`atrasos-sin-marcas-${e.hoy}-${n}`,tag:`Atrasos`,tone:`warning`,title:`Nadie marcó retiros hoy: ${X(t,`perro figura`,`perros figuran`)} pasados de hora en el turno ${n}`,detail:`Según la ruta de hoy, ${Y(a)}${t>3?` y ${X(t-3,`más`,`más`)}`:``} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,action:`Preguntale a ${c} si el equipo está marcando los retiros en la página del paseador.`,target:`adm-cumplimiento`,targetLabel:`Ver el cumplimiento`})}if(e.pedidosNuevos.length){let t=e.pedidosNuevos.length,n=e=>e.titulo||e.tipo||`Pedido sin título`,r=e.pedidosNuevos.slice(0,3).map(n),i=n(e.pedidosNuevos[t-1]);s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}`,tag:`Pedidos`,tone:`info`,title:`${X(t,`pedido nuevo`,`pedidos nuevos`)} sin responder`,detail:`${Y(r)}${t>3?` y ${X(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.`,action:t===1?`Respondé el pedido “${i}”.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${i}”.`,target:`adm-vivo`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(Op).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${Y(r)}. Hay ${X(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${Y(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${X(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${Y(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${Y(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${Y(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${Y(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function Ap(){let e=Cp(),t=[],n=[];e.forEach(e=>{let r=Vt.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=Vt.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function jp(e){return`
    <div class="adm-shell">
      ${Mp()}
      ${e}
    </div>
  `}function Mp(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${g(`lock`,`adm-icon-sm`)} ${J(Yf().nombre)} · ${J(rt[Yf().rol]||Yf().rol)}</span>
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
  `}function Np(){up(),K.users===null&&!K.usersLoading&&!K.usersError&&gp();let e=cp();K.lateSignature=lp(e);let t=kp(e),n=Uf(),r=Gf();return setTimeout(Sp,60),`
    <main class="adm-page" id="adm-main">
      ${Pp(t,n,e)}
      ${Yp(e)}
      ${rm()}
      ${nm()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${g(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${g(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${am(r)}
        ${om(r)}
        ${bm(r)}
        ${_m(r)}
        ${cm(r)}
        ${dm(r)}
        ${fm(r)}
        ${xm(r)}
      </div>
      ${Sm()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function Pp(e,t,n){let{dayName:r,date:i}=Hf(),a=Cp(),o=a.filter(e=>Jt(e,r,jf)).length,s=a.filter(e=>Jt(e,r,Mf)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${X(o,`perro`,`perros`)} a la mañana y ${X(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=Xf(Yf().nombre);return`
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
  `}var Fp={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function Ip(e){let{dayName:t}=Hf();return Cp().filter(n=>Jt(n,t,e)).length}function Lp(e){return K.users?.find(t=>t.usuario===e)?.nombre||e||``}function Rp(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=Kf(e.actualizadoEn);return`Actualizado por ${Lp(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||Lp(e.creadoPor),r=Kf(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function zp(e){let t={manana:{title:`Turno mañana`,hours:`${S.manana.from} a ${S.manana.to}`,planned:Ip(jf)},tarde:{title:`Turno tarde`,hours:`${S.tarde.from} a ${S.tarde.to}`,planned:Ip(Mf)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
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
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=Fp[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${J(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${J(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${J(Rp(e))}${e.nota?` · Nota: ${J(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function Bp(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${g(`alertTriangle`,`adm-icon-sm`)} ${X(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${J(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${ep(e)?`<span class="adm-muted">${J(ep(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${J(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${J(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${Rp(e,!0)?`<p class="adm-note">${J(Rp(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function Vp(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}var Hp={"a-tiempo":{label:`A tiempo`,tone:`ok`},atrasado:{label:`Atrasado`,tone:`danger`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}},Up={dia:`Cambio del día`,plantilla:`Plantilla semanal`,planilla:`Planilla BASE RUTAS`};function Wp(e){let t=Fp[e.estado]||{label:e.estado},n=[`Retiro previsto ${e.hora||`pendiente de confirmar`}`];return e.status===`atrasado`?n.push(`${e.atraso} min de atraso`):e.paseo&&n.push(t.label),e.paseo?.horaRetiro&&n.push(`retirado ${e.paseo.horaRetiro}`),e.paseo?.horaEntrega&&n.push(`entregado ${e.paseo.horaEntrega}`),n.join(` · `)}function Gp(e){let{route:t,stops:n}=e,r=n.length-e.noSale,i=`ruta-${t.ruta}`,a=[t.paseador?`Paseador: ${Lp(t.paseador)}`:`Paseador: sin asignar`,t.ayudante?`Ayudante: ${Lp(t.ayudante)}`:``,t.supervisor?`Supervisa: ${t.supervisor}`:``].filter(Boolean).join(` · `),o=n.filter(e=>e.status===`atrasado`).sort((e,t)=>t.atraso-e.atraso);return`
    <article class="adm-shift adm-route ${o.length?`has-late`:``}" aria-labelledby="adm-route-${J(t.ruta)}">
      <h4 id="adm-route-${J(t.ruta)}">${J(t.ruta||`Ruta sin código`)} <span class="adm-th-sub">${J(t.turno||`Turno sin indicar`)} · ${J(Up[t.fuente]||``)}</span></h4>
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
            ${n.map(e=>{let t=Hp[e.status];return e.status===`a-tiempo`&&(t=e.estado===`pendiente`?{label:`Por retirar · a tiempo`,tone:`neutral`}:{label:`${(Fp[e.estado]||{label:e.estado}).label} · a tiempo`,tone:`info`}),`
                <li>
                  <span class="adm-dog-name">${J(e.hora||`--:--`)} · ${J(e.perroNombre||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${J(t.label)}${e.paseo?.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${J(Wp(e))}${e.nota?` · Nota: ${J(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ol>
        </details>
      `:`<p class="adm-empty">Esta ruta no tiene paradas cargadas.</p>`}
    </article>
  `}function Kp(e){let{compliance:t,effective:n,late:r}=e;return`
    <div class="adm-compliance" id="adm-cumplimiento" tabindex="-1" role="region" aria-labelledby="adm-compliance-title">
      <h3 id="adm-compliance-title">${g(`route`,`adm-icon-sm`)} Cumplimiento por ruta ${r.length?`<span class="adm-count adm-count--danger">${X(r.length,`atrasado`,`atrasados`)}</span>`:``}</h3>
      <p class="adm-note">Atrasado = pasaron más de ${Ff} minutos de la hora prevista y nadie marcó el retiro. Hora de Argentina.</p>
      ${n.fromSheet?`
        <p class="adm-warn-box">${g(`alertCircle`,`adm-icon-sm`)} <span>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${b.toLowerCase()}.</span></p>
      `:``}
      ${t.length?`
        <div class="adm-live-grid">${t.map(Gp).join(``)}</div>
      `:`<p class="adm-empty">Hoy no hay rutas: ni cambios del día, ni plantilla, ni paseos en la planilla.</p>`}
    </div>
  `}var qp={"perro suelto":`danger`,seguridad:`danger`,"obra o corte":`warning`,clima:`info`,"cambio de horario":`info`};function Jp(e){let{avisos:t}=e;return`
    <div class="adm-avisos" id="adm-avisos" role="region" aria-labelledby="adm-avisos-title">
      <h3 id="adm-avisos-title">${g(`mapPin`,`adm-icon-sm`)} Avisos por barrio vigentes <span class="adm-count">${t.length}</span></h3>
      ${t.length?`
        <ul class="adm-aviso-list">
          ${t.map(e=>`
            <li class="adm-aviso">
              <div class="adm-aviso-head">
                <strong>${J(e.barrio||`Barrio sin indicar`)}</strong>
                <span class="adm-pill adm-pill--${qp[e.tipo]||`neutral`}">${J(e.tipo||`otro`)}</span>
                <span class="adm-muted">${e.vigenteHasta?`Hasta el ${J(Jf(e.vigenteHasta))}`:`Solo hoy`}</span>
              </div>
              <p>${J(e.mensaje||e.titulo||``)}</p>
              ${Rp(e,!0)?`<p class="adm-note">${J(Rp(e,!0))}.</p>`:``}
            </li>
          `).join(``)}
        </ul>
      `:`<p class="adm-empty">No hay avisos vigentes por barrio.</p>`}
    </div>
  `}function Yp(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${J(Jf(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó.</p>`:``}
      ${xp(`live`)}

      ${e.incidentes.length?Bp(e.incidentes):`
        <p class="adm-live-ok">${g(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      ${Kp(e)}
      ${Jp(e)}

      <div class="adm-live-grid">
        ${e.shifts.map(zp).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=Vp(e);return`
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
                  <span class="adm-dog-meta">${J(Jf(e.fecha)||qf(e.creadoEn))} · ${e.origen===`web`?`Formulario web`:J(e.creadoPorNombre||`Cargado en la app`)}</span>
                </li>
              `).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${X(r.length-6,`pedido más`,`pedidos más`)}.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos.</p>`}
        </article>
      </div>
    </section>
  `}function Xp(e){return Object.entries(rt).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function Zp(){let e=K.credential;if(!e)return``;let t=bp(e);return`
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
  `}function Qp(){let e=q.crear;return`
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${J(Y(zt.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>
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
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${Xp(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${J(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${J(rt[e.rol]||e.rol)}:</strong> ${J(hp(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${g(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function $p(e){let t=!e.activo;return`
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
  `}function em(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${J(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${J(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function tm(e,t){let n=e.usuario===t,r=q.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${qf(e.ultimoIngreso)} ${Kf(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${qf(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
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
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${J(e.usuario)}">${Xp(r)}</select>
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
      ${!n&&K.resetFor===e.usuario?$p(e):``}
      ${!n&&K.confirmOff===e.usuario?em(e):``}
    </li>
  `}function nm(){let e=Yf().usuario,t=(K.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=K.users===null&&K.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:K.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>tm(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${g(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${K.users?`${X(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${Zp()}

      <div class="adm-form-actions">
        <button class="adm-button ${K.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${K.showCreate}" aria-controls="adm-create">
          ${g(K.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${K.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${K.showCreate?Qp():``}
      ${xp(`users`)}
      ${r}

      <h3 class="adm-subtitle">Qué puede ver cada rol</h3>
      <ul class="adm-role-help">
        ${Object.keys(rt).map(e=>`<li><strong>${rt[e]}:</strong> ${J(hp(e))}</li>`).join(``)}
      </ul>
    </section>
  `}function rm(){let{conflicts:e,missing:t,notRouted:n}=Tp(),r=Ep();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${g(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${Rt}).</p>
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
                    ${[e.a,e.b].filter(e=>/día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(w.find(t=>t.name===e)?.review||``)).map(e=>`<span class="adm-row-note">Días de ${J(e)}: dato a revisar</span>`).join(``)}
                  </th>
                  <td>${J(e.shift)} · ${J(Op(e.shift))}</td>
                  <td>${J(Vf(e.days))}</td>
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
            <span class="adm-safety-meta">${J(e.shifts.join(` y `))} · ${J(Vf(e.days))}</span>
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
  `}function im(e,t,{title:n,summary:r,iconName:i},a){return`
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
  `}function am(e){let t=Dp().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return im(`adm-datos`,e,{title:`Datos a revisar`,summary:`${X(t.length,`perro`,`perros`)} · ${X(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${J(x.officialSources.dogs)}).</p>
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
  `)}function om(e){let t=wp();return im(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${J(t.busiest.length?Y(t.busiest):`Sin datos`)} (${X(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${Rt}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
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
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${Bf[e.day]}</span>
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
      <li>Mañana: ruta ${S.manana.route}, supervisa ${S.manana.supervisor}. Tarde: rutas ${S.tarde.routes.join(` y `)}, supervisa ${S.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${J(Kt.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function sm(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function cm(e){let t=Cp(),n=wp(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${Rt}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${Rt}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...Kt,...i];return im(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${sm(e.kind)}">${J(e.kind)}</span>
          <strong class="adm-fact-value">${J(e.value)}</strong>
          <span class="adm-fact-label">${J(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${J(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner">
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(Wt).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${J(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var lm={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},um=[{role:`Admin`,who:Bt.admin,can:[`Ve y decide sobre todo el sistema`,`Usuarios, pagos e indicadores`,`Único rol que ve y carga pagos`]},{role:`Coordinador`,who:`${Bt.coordinador} (${b.toLowerCase()})`,can:[`Armar rutas y horarios (plantilla semanal y cambios del día)`,`Gestionar los clientes de los paseos`,`Atender pedidos y cargar fichas`,`Avisar lo que pasa en cada barrio`,`No ve plata`]},{role:`Supervisor`,who:Bt.supervisor,can:[`Controlar los paseos del momento`,`Quién falta retirar y atrasos contra el horario`,`Entregas, incidentes y equipo`,`Ve las rutas, no las arma`]},{role:`Paseador`,who:Bt.paseador,can:[`Hacer su ruta del turno, en orden y con horario`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`]},{role:`Ayudante de paseador`,who:b,can:[`Acompañar al paseador en su ruta`,`Marcar pasos`,`Reportar incidentes`,`Sin datos de clientes`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function dm(e){return im(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${X(zt.length,`persona`,`personas`)} · ${um.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${zt.map(e=>{let t=lm[e.role];return`
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
      ${um.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${J(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${J(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function fm(e){return im(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${Vt.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${Af.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${Vt.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${Af.map(t=>`<td>${Xt(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${Af.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${Af.map(e=>`<td>${Xt(Ht[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${Af.map(e=>`<td>${Xt(Ht[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Ut.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${b.toLowerCase()}.</p>
  `)}function pm(e){let[t,n]=String(e).split(`-`).map(Number);if(!t||!n)return e;let r=new Intl.DateTimeFormat(`es-AR`,{month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(Date.UTC(t,n-1,15)));return r.charAt(0).toUpperCase()+r.slice(1)}function mm(e){let t=String(e||``).replace(/[$\s]/g,``);return t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):/^\d{1,3}(\.\d{3})+$/.test(t)&&(t=t.replace(/\./g,``)),/^\d+(\.\d+)?$/.test(t)?Number(t):NaN}function hm(){let e=v.cached(`pagos`,Qf(`pagos`)).slice().sort((e,t)=>String(t.fecha||``).localeCompare(String(e.fecha||``))||String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),t=y().slice(0,7),n=[...new Set([t,...e.map(e=>String(e.fecha||``).slice(0,7)).filter(e=>/^\d{4}-\d{2}$/.test(e))])].sort().reverse(),r=K.pagosMes&&(K.pagosMes===`todos`||n.includes(K.pagosMes))?K.pagosMes:t,i=r===`todos`?e:e.filter(e=>String(e.fecha||``).startsWith(r)),a=e.filter(e=>!e.pasadoAlLibro),o=i.reduce((e,t)=>e+(Number(t.monto)||0),0),s=e.filter(e=>{let t=K.users?.find(t=>t.usuario===e.creadoPor)?.rol;return t&&t!==`admin`});return{all:e,months:n,mes:r,filtered:i,faltan:a,faltanMes:i.filter(e=>!e.pasadoAlLibro),total:o,deOtros:s}}function gm(e){let t=K.users?.find(t=>t.usuario===e.creadoPor),n=t&&t.rol!==`admin`,r=Number(e.monto),i=e.monto!==``&&e.monto!==null&&e.monto!==void 0&&Number.isFinite(r);return`
    <li class="adm-pago ${e.pasadoAlLibro?``:`is-missing`}">
      <div class="adm-pago-main">
        <span class="adm-pago-date">${J(Jf(e.fecha)||qf(e.creadoEn)||`Pendiente de confirmar`)}</span>
        <strong class="adm-pago-concept">${J(e.concepto||`Sin concepto`)}</strong>
        <span class="adm-pago-amount">${i?J(Xt(r)):b}</span>
      </div>
      <div class="adm-pago-meta">
        <span class="adm-pill adm-pill--neutral">${J(e.medio||`Medio sin indicar`)}</span>
        <span class="adm-pill ${e.pasadoAlLibro?`adm-pill--ok`:`adm-pill--warning`}">${e.pasadoAlLibro?`Pasado al Libro`:`Falta pasar al Libro`}</span>
        ${e.pendiente?`<span class="adm-pill adm-pill--info">Se enviará cuando haya señal</span>`:``}
        ${n?`<span class="adm-pill adm-pill--info">Lo cargó ${J(rt[t.rol]||t.rol)} antes del cambio</span>`:``}
      </div>
      ${Rp(e,!0)?`<p class="adm-note">${J(Rp(e,!0))}.</p>`:``}
      <button class="adm-link-button" type="button" data-adm-pago-libro="${J(e.id)}" aria-pressed="${e.pasadoAlLibro?`true`:`false`}">
        ${e.pasadoAlLibro?`Desmarcar “pasado al Libro”`:`Marcar como pasado al Libro`}
      </button>
    </li>
  `}function _m(e){let t=hm(),n=q.pago,r=t.filtered.slice(0,20),i=t.mes===`todos`?`todos los meses`:pm(t.mes).toLowerCase();return im(`adm-pagos`,e,{title:`Pagos · registro de apoyo`,summary:t.faltan.length?`${X(t.faltan.length,`pago falta`,`pagos faltan`)} pasar al Libro contable`:`Nada pendiente de pasar al Libro contable`,iconName:`receipt`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: ${Lf}</strong>
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
          <datalist id="adm-pago-medios">${If.map(e=>`<option value="${J(e)}"></option>`).join(``)}</datalist>
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
    ${xp(`pagos`)}

    <div class="adm-pagos-head">
      <label class="adm-field adm-field--inline" for="adm-pagos-mes">
        <span>Mes</span>
        <select class="adm-input adm-input--sm" id="adm-pagos-mes" data-adm-pagos-mes>
          ${t.months.map(e=>`<option value="${e}" ${e===t.mes?`selected`:``}>${J(pm(e))}</option>`).join(``)}
          <option value="todos" ${t.mes===`todos`?`selected`:``}>Todos los meses</option>
        </select>
      </label>
      <p class="adm-pagos-summary">
        <strong>${X(t.filtered.length,`pago`,`pagos`)}</strong> en ${J(i)} · suma ${J(Xt(t.total))} ·
        <strong class="${t.faltanMes.length?`adm-text-warning`:``}" data-adm-pagos-faltan>${t.faltanMes.length} sin pasar al Libro</strong>${t.mes!==`todos`&&t.faltan.length!==t.faltanMes.length?` (${t.faltan.length} contando todos los meses)`:``}
      </p>
    </div>
    ${t.deOtros.length?`<p class="adm-note">${t.deOtros.length===1?`1 pago lo cargó`:`${t.deOtros.length} pagos los cargó`} otro rol antes del cambio de roles (el coordinador ya no ve plata). Se ven acá con la marca “antes del cambio”.</p>`:``}
    ${r.length?`
      <ul class="adm-pago-list" aria-label="Pagos de ${J(i)}">${r.map(gm).join(``)}</ul>
      ${t.filtered.length>r.length?`<p class="adm-note">Se muestran los últimos ${r.length}. Hay ${X(t.filtered.length-r.length,`pago más`,`pagos más`)} en ${J(i)}.</p>`:``}
    `:`<p class="adm-empty">No hay pagos cargados en ${J(i)}.</p>`}
    <p class="adm-note">La suma es solo de este registro de apoyo: no reemplaza al Libro contable.</p>
  `)}var vm=[[`activo`,`Activos`],[`pausa`,`En pausa`],[`baja`,`Baja`]];function ym(){let e=v.cached(`clientes`,Qf(`clientes`)),t=new Map;e.forEach(e=>{let n=String(e.barrio||``).trim()||`Sin barrio`;t.has(n)||t.set(n,{barrio:n,activo:0,pausa:0,baja:0,otro:0});let r=t.get(n),i=String(e.estado||``).toLowerCase();vm.some(([e])=>e===i)?r[i]+=1:r.otro+=1});let n=[...t.values()].sort((e,t)=>t.activo-e.activo||e.barrio.localeCompare(t.barrio)),r={activo:0,pausa:0,baja:0,otro:0};return n.forEach(e=>Object.keys(r).forEach(t=>{r[t]+=e[t]})),{total:e.length,rows:n,totals:r}}function bm(e){let t=ym(),n=t.totals.otro>0;return im(`adm-clientes`,e,{title:`Clientes por barrio`,summary:t.total?`${X(t.totals.activo,`activo`,`activos`)} · ${t.totals.pausa} en pausa · ${t.totals.baja} de baja`:`Todavía no hay clientes cargados en la app`,iconName:`mapPin`},`
    <p class="adm-lead">Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>
    ${t.total?`
      <div class="adm-table-wrap">
        <table class="adm-table adm-clients">
          <caption class="adm-sr-only">Clientes por barrio y estado</caption>
          <thead>
            <tr><th scope="col">Barrio</th>${vm.map(([,e])=>`<th scope="col">${e}</th>`).join(``)}${n?`<th scope="col">Sin estado</th>`:``}</tr>
          </thead>
          <tbody>
            ${t.rows.map(e=>`
              <tr><th scope="row">${J(e.barrio)}</th>${vm.map(([t])=>`<td>${e[t]}</td>`).join(``)}${n?`<td>${e.otro}</td>`:``}</tr>
            `).join(``)}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total</th>${vm.map(([e])=>`<td>${t.totals[e]}</td>`).join(``)}${n?`<td>${t.totals.otro}</td>`:``}</tr>
          </tfoot>
        </table>
      </div>
    `:`<p class="adm-empty">El coordinador todavía no cargó clientes en la app.</p>`}
  `)}function xm(e){let t=Ap();return im(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${g(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${J(x.officialSources.money)}. Esta sección no muestra montos cobrados: los pagos que anotes de apoyo están en <a class="adm-inline-link" href="#adm-pagos" data-adm-goto="adm-pagos">Pagos</a>.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${Xt(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${X(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${Xt(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${Xt(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${X(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${b.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${J(e)}: ${Y(t.excluded.filter(t=>t.plan===e).map(e=>J(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function Sm(){let e=x.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${Rt}.</strong> Perros: ${J(e.dogs)}. Rutas: ${J(e.routes)}. Plata: ${J(e.money)}.</p>
      <p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${Lf}.</p>
    </footer>
  `}function Cm(){let{dayName:e,date:t}=Hf(),n=cp(),r=kp(n),i=Uf(),a=r.find(e=>!i.includes(e.id)),o=wp(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,`Perros atrasados (más de ${Ff} min sin retiro): ${n.late.length}. Avisos por barrio vigentes: ${n.avisos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${Y(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${Rt}.`].join(`
`)}async function wm(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function Tm(e){Rf=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=Rf)},60)}function Em(){Wf(Of,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function Dm(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,Em());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function Om(e){return e.target.closest(`[data-admin-logout]`)?(K.credential=null,K.users=null,K.usersError=``,K.liveDay=null,K.adminLoaded=!1,K.pagosMes=null,q.pago=zf(),Hm(`/salir`),!0):!1}function km(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function Am(e,t){K.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function jm(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),K.busy))return;let n=t.dataset.admForm;if(n===`pago`)await Mm(t);else if(n===`crear`){let e=q.crear,n=e.nombre.trim(),r=_p(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?K.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:rt[e.rol]?vp(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Z(`users`,a,!0),Q();return}Am(t,!0);try{let t=await at.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});K.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},q.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},K.showCreate=!1,Z(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),K.busy=!1,await gp(),km(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),K.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=K.users?.find(t=>t.usuario===e),r=q.reset.pin.trim(),i=n?vp(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}Am(t,!0);try{let t=!n.activo;await at.save({usuario:e,pin:r,...t?{activo:!0}:{}}),K.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},K.resetFor=null,q.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),K.busy=!1,await gp(),km(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),K.busy=!1,Q()}}}async function Mm(e){let t=q.pago,n=t.concepto.trim(),r=t.medio.trim(),i=mm(t.monto),a=``;if(/^\d{4}-\d{2}-\d{2}$/.test(t.fecha)?n.length<2?a=`Escribí el concepto (por ejemplo, el plan y la semana).`:(!Number.isFinite(i)||i<=0)&&(a=`Escribí el monto en pesos, solo números (por ejemplo 35000).`):a=`Elegí la fecha del pago.`,a)Z(`pagos`,a,!0),Q();else{Am(e,!0);try{let e=await v.save(`pagos`,{fecha:t.fecha,concepto:n,monto:i,medio:r,pasadoAlLibro:t.pasadoAlLibro===!0});q.pago=zf(),K.pagosMes=t.fecha.slice(0,7),Z(`pagos`,e.pendiente?`Se enviará cuando haya señal. Queda anotado en este dispositivo.`:`Listo: pago de ${Xt(i)} guardado${t.pasadoAlLibro?``:`. Acordate de pasarlo al Libro contable`}.`)}catch(e){Z(`pagos`,e.message||`No se pudo guardar el pago.`,!0)}finally{K.busy=!1,Q()}}}async function Nm(e){let t=v.cached(`pagos`,Qf(`pagos`)).find(t=>t.id===e);if(!t||K.busy)return;K.busy=!0;let n=!t.pasadoAlLibro;try{let r=await v.save(`pagos`,{id:e,fecha:t.fecha,pasadoAlLibro:n}),i=`${t.concepto||`El pago`}${t.fecha?` del ${Jf(t.fecha)}`:``}`;Z(`pagos`,r.pendiente?`Se enviará cuando haya señal.`:n?`Listo: ${i} quedó como pasado al Libro.`:`Listo: ${i} quedó como pendiente de pasar al Libro.`)}catch(e){Z(`pagos`,e.message||`No se pudo cambiar la marca.`,!0)}finally{K.busy=!1,Q(),km(`[data-adm-pago-libro="${CSS.escape(e)}"]`)}}async function Pm(e,t,n){if(!K.busy){K.busy=!0;try{await e(),Z(`users`,t),K.busy=!1,await gp()}catch(e){Z(`users`,e.message||n,!0),K.busy=!1,Q()}}}function Fm(e){if(e.target.closest(`[data-adm-create-toggle]`))return K.showCreate=!K.showCreate,K.resetFor=null,K.confirmOff=null,$(),km(K.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return K.usersError=``,gp().then(()=>{K.usersError||(Z(`users`,`Lista de usuarios actualizada.`),Q())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;q[e].pin=yp();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=q[e].pin),Tm(`PIN generado: ${q[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=K.users?.find(t=>t.usuario===e);if(!t)return!0;let r=q.roles[e]||t.rol;return r===t.rol?(Z(`users`,`${t.nombre} ya tiene el rol ${rt[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Q(),!0):(Pm(async()=>{await at.save({usuario:e,rol:r}),delete q.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${rt[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return K.resetFor=K.resetFor===e?null:e,K.confirmOff=null,q.reset.pin=``,$(),K.resetFor&&km(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=K.resetFor||``;return K.resetFor=null,q.reset.pin=``,$(),km(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return K.confirmOff=i.dataset.admOff,K.resetFor=null,$(),km(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=K.confirmOff||``;return K.confirmOff=null,$(),km(`[data-adm-off="${CSS.escape(e)}"]`),Tm(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=K.users?.find(t=>t.usuario===e);return K.confirmOff=null,Pm(()=>at.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}if(e.target.closest(`[data-adm-cred-copy]`))return K.credential&&wm(bp(K.credential)).then(e=>{Tm(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0;if(e.target.closest(`[data-adm-cred-hide]`))return K.credential=null,$(),km(`#adm-usuarios`),Tm(`Listo. El PIN ya no se muestra.`),!0;if(e.target.closest(`[data-adm-live-refresh]`))return fp(!0),!0;let o=e.target.closest(`[data-adm-pago-libro]`);return o?(Nm(o.dataset.admPagoLibro),!0):!1}function Im(e){let t=e.target.closest?.(`[data-adm-pagos-mes]`);if(t){e.type===`change`&&K.pagosMes!==t.value&&(K.pagosMes=t.value,Q(),Tm(`Pagos de ${t.value===`todos`?`todos los meses`:pm(t.value).toLowerCase()}.`));return}let n=e.target.closest?.(`[data-adm-draft]`);if(!n)return;let r=n.dataset.admDraft,i=n.dataset.admKey,a=n.type===`checkbox`?n.checked:n.value;if(r===`roles`?q.roles[i]=a:q[r][i]=a,r===`crear`&&i===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${J(rt[n.value]||n.value)}:</strong> ${J(hp(n.value))}`)}}function Lm(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=Uf(),r=n.includes(e);return Wf(Df,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),Tm(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),Dm(n.dataset.admGoto),!0;if(Fm(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),Em(),Tm(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(wm(Cm()).then(e=>{Tm(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function Rm(e){if(e.target.matches?.(`[data-adm-section]`)&&Em(),e.target.matches?.(`[data-adm-dogs]`)){let t=e.target.dataset.admDogs;e.target.open?K.openDogs.add(t):K.openDogs.delete(t)}}function zm(){_e.push(Om),ye.push(Lm),document.addEventListener(`toggle`,Rm,!0),document.addEventListener(`submit`,jm),document.addEventListener(`input`,Im),document.addEventListener(`change`,Im),$e(e=>{(Nf.includes(e)||Pf.includes(e))&&Q()}),setInterval(()=>{if(!Zf()||_.user()?.rol!==`admin`||document.visibilityState!==`visible`)return;let e=lp(cp());e!==K.lateSignature&&(K.lateSignature=e,Q())},3e4),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var Bm=document.querySelector(`#app`);function Vm(e){return e.replace(/\/+$/,``)||`/`}function Hm(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ce(),Dt(),Lt(),yr(),ja(),Pc(),Ef(),zm(),document.addEventListener(`click`,e=>{if(be(_e,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),Hm(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{be(ve,e)});function $(){let e=Vm(window.location.pathname);if(e===`/`){Bm.innerHTML=vt(),Wm();return}if(e===`/login`){Bm.innerHTML=jt(),Wm();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),_.clear(),Bm.innerHTML=jt(),Wm();return}if(e===`/registro`||e===`/register`){Bm.innerHTML=Nt(),Wm();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(Bm.innerHTML=Um(r),Wm()):(Bm.innerHTML=pe(),Wm())}function Um(e){if(e===`cliente`)return Gm(e);let t=_.user();return t?(nt[t.rol]||[]).includes(e)?Gm(e):Pt(e):(window.history.replaceState({},``,`/login?volver=/${e}`),jt())}function Wm(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=me()+ge(),document.body.classList.toggle(`menu-locked`,e.menuOpen),He(),Ve()}function Gm(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:Np,coordinador:Nd,supervisor:Xs,paseador:Gi,cliente:Wn}[e]();return i?Wi(o):a?Js(o):e===`coordinador`?jd(o):e===`admin`?jp(o):oe(`
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