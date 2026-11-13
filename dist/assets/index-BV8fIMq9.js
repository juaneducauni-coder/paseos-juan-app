(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={menuOpen:!1,chatOpen:!1,revealObserver:void 0},t={admin:{label:`Admin`,route:`/admin`,legacyRoute:`/dashboard/admin`,intent:`Control total del negocio, permisos, usuarios, finanzas y configuracion.`},coordinador:{label:`Coordinador`,route:`/coordinador`,legacyRoute:`/dashboard/coordinador`,intent:`Gestion operativa diaria, asignaciones, rutas, agenda y comunicacion.`},supervisor:{label:`Supervisor`,route:`/supervisor`,legacyRoute:`/dashboard/supervisor`,intent:`Control grupal, seguridad, calidad de paseos e incidentes.`},paseador:{label:`Paseador`,route:`/paseador`,legacyRoute:`/dashboard/paseador`,intent:`Ejecucion de paseos, retiros, entregas, reportes y metricas personales.`},cliente:{label:`Cliente`,route:`/cliente`,legacyRoute:`/dashboard/cliente`,intent:`Seguimiento del perro, confianza, pagos, planes y contacto.`},visitante:{label:`Visitante`,route:`/visitante`,intent:`Visualizacion publica, informacion comercial y reserva de evaluacion.`}},n={whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,zone:`Pilar y La Lonja`},r={title:`Muestra gratis de DogPro o CatPro + un paseo de regalo`,detail:`Abierta a cualquier persona: no hace falta ser cliente ni hacer una visita previa.`,until:`2026-12-01`,untilLabel:`01/12/2026`},i=[`Pequeño`,`Mediano`,`Grande`],a=[{name:`Plan 1`,walks:`3 paseos semanales`,prices:[`$24.000`,`$27.000`,`$30.000`],benefits:[`Descuento con entrenador canino`]},{name:`Plan 2`,walks:`5 paseos semanales`,prices:[`$35.000`,`$37.500`,`$40.000`],benefits:[`Descuento con entrenador canino`,`Descuento con veterinaria`]},{name:`Plan 3`,walks:`6 paseos semanales`,prices:[`$39.000`,`$42.000`,`$45.000`],benefits:[`Descuento con entrenador canino`,`Descuento con veterinaria`,`Descuento en baño en seco`]}],o=[[`2 perros`,`10%`],[`3 perros`,`20%`],[`4 perros`,`30%`]],s=[{size:`Pequeño`,individual:`$10.000`,group:`$8.000`},{size:`Mediano`,individual:`$12.000`,group:`$10.000`},{size:`Grande`,individual:`$14.000`,group:`$12.000`}],c=[[`Admin`,`Control total`],[`Coordinador`,`Gestion operativa`],[`Supervisor`,`Control grupal`],[`Paseador`,`Ejecucion de paseos`],[`Cliente`,`Seguimiento de su perro`],[`Visitante`,`Solo visualizacion publica`]],l=[[`Inicio`,`/`,`home`],[`Sobre nosotros`,`/#sobre-nosotros`,`shieldCheck`],[`Planes`,`/#planes`,`calendarCheck`],[`Compromiso`,`/#testimonios`,`message`],[`Preguntas frecuentes`,`/#faq`,`help`],[`Contacto`,`/#contacto`,`mail`],[`Login`,`/login`,`logIn`],[`Registro`,`/registro`,`userPlus`]];function u(){return{users:f(`paseosJuan_users`,[]),clients:f(`paseosJuan_clients`,[]),dogs:f(`paseosJuan_dogs`,[]),routes:f(`paseosJuan_routes`,[]),payments:f(`paseosJuan_payments`,[]),alerts:f(`paseosJuan_alerts`,[]),reports:f(`paseosJuan_reports`,[]),chats:f(`paseosJuan_chats`,[]),settings:f(`paseosJuan_settings`,{})}}function d(e){e.users&&localStorage.setItem(`paseosJuan_users`,JSON.stringify(e.users)),e.clients&&localStorage.setItem(`paseosJuan_clients`,JSON.stringify(e.clients)),e.dogs&&localStorage.setItem(`paseosJuan_dogs`,JSON.stringify(e.dogs)),e.routes&&localStorage.setItem(`paseosJuan_routes`,JSON.stringify(e.routes)),e.payments&&localStorage.setItem(`paseosJuan_payments`,JSON.stringify(e.payments)),e.alerts&&localStorage.setItem(`paseosJuan_alerts`,JSON.stringify(e.alerts)),e.reports&&localStorage.setItem(`paseosJuan_reports`,JSON.stringify(e.reports)),e.chats&&localStorage.setItem(`paseosJuan_chats`,JSON.stringify(e.chats)),e.settings&&localStorage.setItem(`paseosJuan_settings`,JSON.stringify(e.settings)),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function f(e,t){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function ee(){localStorage.removeItem(`paseosJuanActiveModal`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function te(e,t=`success`){localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:e,type:t,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}var ne=[{id:`conv-laura-kiara`,clientName:`Tutor de ejemplo 1`,dogs:[`Perro de ejemplo 1`],status:`Abierto`,lastUpdated:Date.now()-1e5,messages:[{id:`msg-1`,conversationId:`conv-laura-kiara`,senderRole:`cliente`,senderName:`Tutor de ejemplo 1`,text:`¿Mañana hay paseo?`,timestamp:`10:30`,read:!1,type:`normal`}]},{id:`conv-martin-bruno`,clientName:`Tutor de ejemplo 2`,dogs:[`Perro de ejemplo 2`],status:`Documentación pendiente`,lastUpdated:Date.now()-2e5,messages:[{id:`msg-2`,conversationId:`conv-martin-bruno`,senderRole:`cliente`,senderName:`Tutor de ejemplo 2`,text:`Ya subí el carnet de vacunas.`,timestamp:`10:15`,read:!0,type:`normal`},{id:`msg-3`,conversationId:`conv-martin-bruno`,senderRole:`coordinador`,senderName:`Coordinador`,text:`Perfecto, lo revisamos y te avisamos si falta algo.`,timestamp:`10:18`,read:!0,type:`normal`}]},{id:`conv-sol-pistacho`,clientName:`Tutor de ejemplo 3`,dogs:[`Perro de ejemplo 3`],status:`Consulta comercial`,lastUpdated:Date.now()-3e5,messages:[{id:`msg-4`,conversationId:`conv-sol-pistacho`,senderRole:`cliente`,senderName:`Tutor de ejemplo 3`,text:`Quiero consultar el Plan 2.`,timestamp:`09:00`,read:!1,type:`normal`}]}];function re(){let e=localStorage.getItem(`paseosJuanChatMessages`);if(e)try{return JSON.parse(e)}catch{return ne}return localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(ne)),ne}function ie(e){return[`cliente`,`coordinador`,`supervisor`,`admin`].includes(e)}function ae(e,t,n,r,i=`normal`){if(!ie(t))return localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:`Solo coordinación o supervisión pueden responder al cliente.`,type:`error`,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)),!1;let a=re(),o=a.findIndex(t=>t.id===e);if(o===-1)return!1;let s=new Date,c=s.getHours().toString().padStart(2,`0`),l=s.getMinutes().toString().padStart(2,`0`),u={id:`msg-${Date.now()}`,conversationId:e,senderRole:t,senderName:n,text:r,timestamp:`${c}:${l}`,read:!1,type:i};return a[o].messages.push(u),a[o].lastUpdated=Date.now(),localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(a)),!0}function oe(e){return`https://wa.me/${n.whatsapp}?text=${encodeURIComponent(e)}`}function p(e,t=`line-icon`){let n=`class="${t}" viewBox="0 0 24 24" aria-hidden="true"`,r={activity:`<path d="M4 12h4l2-6 4 12 2-6h4" />`,arrowRight:`<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,briefcase:`<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><path d="M4 7h16v12H4z" /><path d="M9 12h6" />`,briefcaseMedical:`<path d="M10 6V5a2 2 0 0 1 4 0v1" /><path d="M4 7h16v12H4z" /><path d="M12 11v5" /><path d="M9.5 13.5h5" />`,calendarCheck:`<path d="M7 3v4" /><path d="M17 3v4" /><path d="M4 8h16" /><path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="m9 15 2 2 4-5" />`,camera:`<path d="M14 6 13 4h-2L10 6H6a2 2 0 0 0-2 2v10h16V8a2 2 0 0 0-2-2Z" /><circle cx="12" cy="13" r="3" />`,checkCircle:`<circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.4 2.4 4.9-5" />`,chart:`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15V9" /><path d="M12 15V6" /><path d="M16 15v-4" />`,clipboardCheck:`<path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 4h6" /><path d="m8.5 14 2 2 4.8-5" />`,clock:`<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`,alertCircle:`<circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" />`,alertTriangle:`<path d="M12 3 22 20H2L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" />`,archive:`<rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v12h14V8" /><path d="M10 12h4" />`,bell:`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" />`,bone:`<path d="M7.5 8.5a3 3 0 1 1 2-5.2 3 3 0 0 1 5 0 3 3 0 1 1 2 5.2l-8 7a3 3 0 1 1-2-5.2 3 3 0 0 1 0-3.6 3 3 0 0 1 1 1.8Z" />`,chevronDown:`<path d="m6 9 6 6 6-6" />`,compass:`<circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />`,creditCard:`<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" />`,database:`<ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />`,copy:`<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,dollarSign:`<path d="M12 2v20" /><path d="M17 6.5c-1.2-1-2.8-1.5-5-1.5-3 0-5 1.4-5 3.5 0 5 10 2.5 10 7.5 0 2.1-2 3.5-5 3.5-2.2 0-4-.6-5.5-1.8" />`,droplets:`<path d="M7 3C5 6 4 8.2 4 10a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" /><path d="M17 3c-2 3-3 5.2-3 7a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" />`,eye:`<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />`,fileCheck:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="m8.5 15 2 2 4.5-5" />`,fileText:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M8 13h8" /><path d="M8 17h5" />`,fileUp:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M12 17v-6" /><path d="m9 14 3-3 3 3" />`,heartPulse:`<path d="M20.5 8.8c0 5.2-8.5 10.2-8.5 10.2S3.5 14 3.5 8.8A4.3 4.3 0 0 1 11 6a4.3 4.3 0 0 1 9.5 2.8Z" /><path d="M7 12h3l1-2 2 5 1.5-3H17" />`,help:`<circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.2-1.7 2.6" /><path d="M12 17h.01" />`,home:`<path d="m4 11 8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-6h4v6" />`,logIn:`<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M4 12h10" /><path d="m10 8 4 4-4 4" />`,logOut:`<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M14 12H4" /><path d="m18 8 4 4-4 4" />`,lock:`<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" />`,mail:`<path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />`,mapPin:`<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />`,medal:`<path d="M8 3h8l-2 5h-4L8 3Z" /><circle cx="12" cy="14" r="5" /><path d="m10.5 14 1 1.2 2.2-2.4" />`,message:`<path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8 8 0 1 1 21 12Z" />`,navigation:`<path d="m12 2 7 19-7-4-7 4 7-19Z" />`,packageCheck:`<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4.5 8 12 12.2 19.5 8" /><path d="M12 21v-8.8" /><path d="m9.2 16 1.8 1.8 3.8-4.1" />`,pawPrint:`<circle cx="8" cy="9" r="1.6" /><circle cx="12" cy="7" r="1.7" /><circle cx="16" cy="9" r="1.6" /><circle cx="18" cy="13" r="1.5" /><path d="M7.5 16.4c.8-2.1 2.4-3.3 4.5-3.3s3.7 1.2 4.5 3.3c.5 1.4-.5 2.6-1.9 2.3l-1.5-.4a4.5 4.5 0 0 0-2.2 0l-1.5.4c-1.4.3-2.4-.9-1.9-2.3Z" />`,play:`<circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" />`,flag:`<path d="M5 21V4" /><path d="M5 4h12l-1.5 4L17 12H5" />`,radar:`<circle cx="12" cy="12" r="8" /><path d="M12 12 17 7" /><path d="M12 4v2" /><path d="M12 18v2" /><path d="M4 12h2" /><path d="M18 12h2" />`,radio:`<path d="M4 9h16v11H4z" /><path d="m8 9 8-6" /><circle cx="8" cy="14" r="2" /><path d="M14 14h3" /><path d="M14 17h2" />`,plus:`<path d="M12 5v14" /><path d="M5 12h14" />`,receipt:`<path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1V3Z" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" />`,route:`<circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />`,shieldCheck:`<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" />`,send:`<path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" />`,settings:`<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 3.6-.2-.1a1.7 1.7 0 0 0-2 .3l-.3.2a1.7 1.7 0 0 0-1 1.5V23H9.8v-.5a1.7 1.7 0 0 0-1-1.5l-.3-.2a1.7 1.7 0 0 0-2-.3l-.2.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-3.6.2.1a1.7 1.7 0 0 0 2-.3l.3-.2a1.7 1.7 0 0 0 1-1.5V1h4.4v.5a1.7 1.7 0 0 0 1 1.5l.3.2a1.7 1.7 0 0 0 2 .3l.2-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z" />`,sliders:`<path d="M4 6h8" /><path d="M16 6h4" /><path d="M14 4v4" /><path d="M4 12h4" /><path d="M12 12h8" /><path d="M10 10v4" /><path d="M4 18h10" /><path d="M18 18h2" /><path d="M16 16v4" />`,shoppingBag:`<path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /><path d="M9.5 14h5" />`,uploadCloud:`<path d="M16 16 12 12l-4 4" /><path d="M12 12v9" /><path d="M20 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 0 0 3 10.4" /><path d="M5 18a4 4 0 0 1 0-8" />`,userCheck:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="m16 13 2 2 4-5" />`,userPlus:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 8v6" /><path d="M15 11h6" />`,users:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 11a3 3 0 0 0 0-6" /><path d="M17 20a5 5 0 0 0-2-4" />`,wallet:`<path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V6" /><path d="M16 13h.01" />`,x:`<path d="M6 6 18 18" /><path d="M18 6 6 18" />`};return`<svg ${n} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${r[e]||r.shieldCheck}</svg>`}function se(){try{return JSON.parse(localStorage.getItem(`paseosJuanDemoClient`))}catch{return null}}function ce(e){try{let t=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?t:[]}catch{return[]}}function le(e,t=`visitante`){return`
    ${ue(t)}
    ${de()}
    ${fe(e)}
  `}function ue(t){return`
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
  `}function de(){return`
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
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menu">${p(`x`)}</button>
      </div>
      <nav class="menu-nav" aria-label="Menu principal">
        ${l.map(([e,t,n])=>`
          <a href="${t}" data-link>
            <span>${p(n,`menu-icon`)}</span>
            ${e}
          </a>
        `).join(``)}
      </nav>
      <a class="menu-evaluation" href="/#evaluacion" data-link>Pedí tu evaluación</a>
      <a class="menu-whatsapp" href="${oe(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">
        WhatsApp ${n.whatsappLabel}
      </a>
    </aside>
  `}function fe(e){return`<div class="smooth-wrapper">${e}</div>`}function pe(){let t=re(),n=se()?.name?.split(` `)[0]||`Tutor de ejemplo`,r=t.find(e=>e.id===`conv-martin-bruno`)||t[1];return localStorage.getItem(`paseosJuanChatDraft`),`
    <aside class="floating-chat ${e.chatOpen?`is-open`:``}" aria-live="polite">
      <div class="chat-window">
        <div class="chat-head">
          <span class="chat-head-icon">${p(`message`)}</span>
          <span>
            <strong>Paseos Juan</strong>
            <small>Consultas sobre paseos, pagos o cambios de conducta.</small>
          </span>
          <button type="button" data-chat-close aria-label="Cerrar chat">${p(`x`)}</button>
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
              ${p(`alertCircle`)} ${e}
            </button>
          `).join(``)}
        </div>
        <div class="chat-compose">
          <textarea data-chat-input-shared="${r.id}" placeholder="Escribí tu consulta..."></textarea>
          <button class="primary-button" type="button" data-chat-send-shared="${r.id}" data-chat-role="cliente" data-chat-sender="${n}">
            ${p(`send`)} Enviar
          </button>
        </div>
      </div>
      <button class="chat-bubble" type="button" data-chat-toggle>
        ${p(`message`)}
        <span>Ayuda</span>
      </button>
    </aside>
  `}function me(e){return`
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
      <a class="ghost-button" href="${oe(`Hola, quiero consultar por el ${e.name} (${e.walks}) para mi perro.`)}" target="_blank" rel="noreferrer">Consultar</a>
    </article>
  `}function he(e,t){return`
    <details>
      <summary>${e}</summary>
      <p>${t}</p>
    </details>
  `}function ge(){return le(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">404</p>
        <h1>Ruta no encontrada</h1>
        <p>Volver a la landing pública o entrar a un dashboard por rol.</p>
        <a class="primary-button" href="/" data-link>Ir al inicio</a>
      </section>
    </main>
  `)}function _e(){let e=localStorage.getItem(`paseosJuanActiveModal`);if(!e)return``;let{type:t,data:n}=JSON.parse(e),r=``;switch(t){case`admin-reports`:r=`<h3>Reportes operativos</h3><p>Reportes filtrables. (Demo)</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-users`:r=`<h3>Usuarios y permisos</h3><p>Gestionar usuarios demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-prices`:r=`<h3>Precios y planes</h3><p>Editar precios y descuentos.</p><button class='primary-button' data-modal-action='save-prices'>Guardar cambios</button> <button data-modal-action='close'>Cerrar</button>`;break;case`admin-alerts`:r=`<h3>Alertas críticas</h3><p>Resolver alertas operativas.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-client`:r=`<h3>Ficha del cliente</h3><p>Detalle demo del cliente.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-audit`:r=`<h3>Auditoría</h3><p>Auditoría de cambios y chats.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-settings`:r=`<h3>Configuración del sistema</h3><p>Opciones generales demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`client-pay`:r=`<h3>Enviar comprobante</h3><p>El alias y el detalle de pago te los enviamos por WhatsApp. Cuando pagues, subí acá el comprobante.</p><label>Subir comprobante <input type='file' accept='image/*,.pdf' /></label><button class='primary-button' data-modal-action='confirm-pay'>Enviar comprobante</button> <button data-modal-action='close'>Cerrar</button>`;break;default:r=`<h3>Modal</h3><button data-modal-action='close'>Cerrar</button>`}return`
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal-content panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width: 90%; max-width: 500px;">
        ${r}
      </div>
    </div>
  `}var ve=null;function ye(){let e=null;try{e=JSON.parse(localStorage.getItem(`paseosJuanToast`))}catch{e=null}return e?(ve||=setTimeout(()=>{ve=null,localStorage.getItem(`paseosJuanToast`)&&(localStorage.removeItem(`paseosJuanToast`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)))},3500),`
    <div class="toast is-${e.type===`error`?`error`:`success`}" role="status" aria-live="polite">
      ${e.message}
    </div>
  `):``}var be=[],xe=[],Se=[];function Ce(e,t){for(let n of e)if(n(t))return!0;return!1}function we(t){let n=t.target.closest(`[data-chat-select]`);if(n)return localStorage.setItem(`paseosJuanActiveChat`,n.dataset.chatSelect),$(),!0;let r=t.target.closest(`[data-chat-send-shared]`);if(r){let e=r.dataset.chatSendShared,t=document.querySelector(`[data-chat-input-shared="${e}"]`),n=t?.value?.trim();if(!n)return!0;let i=r.dataset.chatRole,a=r.dataset.chatSender;return ae(e,i,a,n)&&(t&&(t.value=``),localStorage.removeItem(`paseosJuanChatDraft`),$()),!0}let i=t.target.closest(`[data-chat-quick-shared]`);if(i){let e=i.dataset.chatQuickShared,t=i.dataset.chatRole,n=i.dataset.chatSender,r=i.dataset.chatConversation;return ae(r,t,n,e)&&$(),!0}return t.target.closest(`[data-menu-toggle]`)?(e.menuOpen=!e.menuOpen,$(),!0):t.target.closest(`[data-menu-close]`)?(e.menuOpen=!1,$(),!0):t.target.closest(`[data-chat-toggle]`)?(e.chatOpen=!e.chatOpen,$(),!0):t.target.closest(`[data-chat-close]`)?(e.chatOpen=!1,$(),!0):!1}function Te(e){let t=e.target.closest(`[data-modal-action]`);if(t){if(t.dataset.modalAction===`close`&&ee(),t.dataset.modalAction===`confirm-pay`){let e=u();e.alerts=[{id:`alert-`+Date.now(),dog:`Pago cliente`,type:`Pago por confirmar`,level:`Medio`,description:`Cliente subió comprobante.`},...e.alerts||[]],d(e),te(`Comprobante enviado. Estado: Pago por confirmar.`),ee()}return t.dataset.modalAction===`save-prices`&&(te(`Precios actualizados correctamente.`),ee()),!0}return e.target.closest(`[data-modal-backdrop]`)&&e.target===e.target.closest(`[data-modal-backdrop]`)?(ee(),!0):!1}function Ee(){be.push(we),Se.push(Te)}var De=`paseosJuan_accesibilidad`,Oe={theme:`auto`,motion:`auto`},ke=new Set,m=je(),Ae=!1;function je(){try{let e=JSON.parse(localStorage.getItem(De));return{...Oe,...e||{}}}catch{return{...Oe}}}function Me(){try{localStorage.setItem(De,JSON.stringify(m))}catch{}}var Ne=window.matchMedia(`(prefers-color-scheme: dark)`),Pe=window.matchMedia(`(prefers-reduced-motion: reduce)`);function Fe(){return m.theme===`oscuro`||m.theme!==`claro`&&Ne.matches}function Ie(){return m.motion===`calmo`||m.motion!==`normal`&&Pe.matches}function Le(e){return ke.add(e),()=>ke.delete(e)}function Re(){let e=document.documentElement;e.dataset.theme=Fe()?`dark`:`light`,e.dataset.motion=Ie()?`calm`:`normal`,e.style.colorScheme=Fe()?`dark`:`light`;let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,Fe()?`#0f1512`:`#f7f5ef`),Be(),ke.forEach(e=>e({dark:Fe(),calm:Ie()}))}function ze(e,t,n,r){let i=r===t;return`<button type="button" class="a11y-option ${i?`is-active`:``}" data-a11y-set="${e}:${t}" aria-pressed="${i}">${n}</button>`}function Be(){let e=document.getElementById(`a11y-root`);e||(e=document.createElement(`div`),e.id=`a11y-root`,document.body.appendChild(e)),e.innerHTML=`
    <button type="button" class="a11y-toggle" data-a11y-toggle aria-expanded="${Ae}" aria-controls="a11y-panel" aria-label="Opciones de accesibilidad: tema y movimiento">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"></path>
      </svg>
    </button>
    <section class="a11y-panel ${Ae?`is-open`:``}" id="a11y-panel" role="dialog" aria-label="Accesibilidad" ${Ae?``:`hidden`}>
      <header>
        <strong>Accesibilidad</strong>
        <button type="button" class="a11y-close" data-a11y-toggle aria-label="Cerrar">×</button>
      </header>
      <div class="a11y-group" role="group" aria-label="Tema">
        <span>Tema</span>
        <div class="a11y-options">
          ${ze(`theme`,`claro`,`Claro`,m.theme)}
          ${ze(`theme`,`oscuro`,`Oscuro`,m.theme)}
          ${ze(`theme`,`auto`,`Automático`,m.theme)}
        </div>
      </div>
      <div class="a11y-group" role="group" aria-label="Movimiento">
        <span>Movimiento</span>
        <div class="a11y-options">
          ${ze(`motion`,`normal`,`Normal`,m.motion)}
          ${ze(`motion`,`calmo`,`Calmo`,m.motion)}
          ${ze(`motion`,`auto`,`Automático`,m.motion)}
        </div>
        <small>El modo calmo apaga animaciones y el fondo en movimiento. Recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</small>
      </div>
    </section>
  `}function Ve(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){Ae=!Ae,Be(),Ae?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);m={...m,[e]:n},Me(),Re(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else Ae&&!e.target.closest(`#a11y-root`)&&(Ae=!1,Be())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Ae&&(Ae=!1,Be(),document.querySelector(`.a11y-toggle`)?.focus())}),Ne.addEventListener?.(`change`,Re),Pe.addEventListener?.(`change`,Re),Re()}var He={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function Ue(){He.frame&&cancelAnimationFrame(He.frame),He.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Ie(),r=Fe()?[22,52,39]:[184,218,198],i=Fe()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=He.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-He.lastDraw>33&&(He.lastDraw=e,s(e/1e3)),He.frame=requestAnimationFrame(l)}He.frame=requestAnimationFrame(l)}function We(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ge=`pj_sesion`,Ke=`pj_pendientes`,qe=`pj_cache_`,Je=6e4,Ye=new Set,Xe=new Map;function Ze(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Qe(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function $e(e){Ye.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function et(e){return Ye.add(e),()=>Ye.delete(e)}var tt=class extends Error{constructor(e,t){super(t),this.status=e}};async function h(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=g.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new tt(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(g.clear(),$e(`sesion`)),!o.ok||s.ok===!1)throw new tt(o.status,s.error||`Error del servidor.`);return s}var g={token:()=>Ze(Ge,null)?.token||null,user:()=>Ze(Ge,null)?.user||null,set(e,t){Qe(Ge,{token:e,user:t}),$e(`sesion`)},clear(){try{localStorage.removeItem(Ge),Object.keys(localStorage).filter(e=>e.startsWith(qe)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return h(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await h(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return g.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await h(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return g.set(i.token,i.user),i.user},async refresh(){let e=g.token();if(!e)return null;let t=await h(`/api/auth/me`);return t.user&&g.token()===e&&g.set(e,t.user),t.user},async changePin(e,t){let n=await h(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return g.set(n.token,n.user),n.user},logout(){g.clear(),$e(`sesion`)}},nt={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],marketing:[]};function rt(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`}[e]||`/`}var it={list:async()=>(await h(`/api/usuarios`)).usuarios,save:async e=>(await h(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>h(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function at(e,t={}){return`${qe}${e}_${t.desde||``}_${t.prefijo||``}`}function ot(e,t){let n=Ze(Ke,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var _={cached(e,t={}){return ot(e,Ze(at(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await h(`/api/registros?${n}`),i=localStorage.getItem(at(e,t));return Qe(at(e,t),r.registros),i!==JSON.stringify(r.registros)&&$e(e),ot(e,r.registros)}catch(n){if(n.status===0)return _.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=st(n.fecha);try{let t=await h(`/api/registros`,{method:`POST`,body:{col:e,...n}});return ct(e,t.registro),$e(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Ze(Ke,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:g.user()?.usuario,at:Date.now()}),Qe(Ke,a),$e(e),{...n,pendiente:!0}}},async remove(e,t){await h(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${qe}${e}_`)).forEach(e=>{Qe(e,Ze(e,[]).filter(e=>e.id!==t))}),$e(e)},pendingCount(){return Ze(Ke,[]).length},watch(e,t={}){let n=at(e,t);if(Xe.has(n))return Xe.get(n);let r=()=>{document.visibilityState===`visible`&&g.token()&&_.list(e,t).catch(()=>{})};r();let i=setInterval(r,Je),a=()=>{clearInterval(i),Xe.delete(n)};return Xe.set(n,a),a}};function st(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function ct(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${qe}${e}_`)).forEach(e=>{let n=Ze(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Qe(e,n)})}var lt=!1;async function ut(){if(lt||!g.token())return 0;let e=g.user()?.usuario,t=Ze(Ke,[]);if(!t.length)return 0;lt=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await h(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});ct(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Qe(Ke,Ze(Ke,[]).filter(e=>!n.has(e.at))),lt=!1,r.forEach(e=>$e(e))}return n.size}window.addEventListener(`online`,()=>ut()),setInterval(()=>ut(),3e4);async function dt(e){return h(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function ft(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}function pt(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function mt(){return le(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${ht()}
      ${gt()}
      ${_t()}
      ${xt()}
      <a class="whatsapp" href="${oe(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
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
          <span class="glass-icon">${p(`radar`)}</span>
          <strong>Control total</strong>
          <span>Seguimiento operativo durante todo el paseo.</span>
        </div>
      </div>
      <a class="scroll-indicator" href="#sobre-nosotros" data-link>
        <span>Scroll</span>
        <b>${p(`chevronDown`)}</b>
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
        ${he(`¿Cómo empieza el servicio?`,`Con una evaluación inicial para conocer conducta, energía, vacunas y compatibilidades.`)}
        ${he(`¿En qué zona trabajan?`,`En ${n.zone}. Si estás cerca y no sabés si llegamos, escribinos y te confirmamos.`)}
        ${he(`¿Qué pasa si mi perro no se lleva bien con otros perros?`,`Lo evaluamos antes de sumarlo a un grupo. Si necesita paseo individual o una adaptación, te lo contamos antes de empezar.`)}
        ${he(`¿Cómo consulto disponibilidad?`,`Escribinos por WhatsApp al ${n.whatsappLabel} o completá el formulario de evaluación.`)}
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
        ${a.map(e=>me(e)).join(``)}
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
        <a class="primary-button" href="${oe(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
      </aside>
    `:`
    <aside class="panel products-panel promo-panel">
      <h3>¿Tenés dudas?</h3>
      <p>Escribinos y te contamos qué plan le conviene a tu perro.</p>
      <a class="primary-button" href="${oe(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">Escribinos</a>
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
      <a class="footer-whatsapp" href="${oe(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">WhatsApp ${n.whatsappLabel}</a>
    </footer>
  `}function St(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(oe(bt(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,dt(Object.fromEntries(i)).then(()=>{n.textContent=`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function Ct(){document.addEventListener(`submit`,St)}var wt=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),v={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function Tt(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function Et(){let e=g.user();if(e)return Dt(e);v.necesitaConfiguracion===null&&!v.cargando&&(v.cargando=!0,g.status().then(e=>{v.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{v={...v,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{v.cargando=!1,$()}));let t=v.necesitaConfiguracion===!0;return le(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${v.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>`}
        <p class="acc-status ${v.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${wt(v.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function Dt(e){return le(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${wt(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${wt(e.usuario)}</strong> (${wt(e.rol)}).</p>
        <div class="acc-actions">
          ${rt(e.rol)===`/`?``:`<a class="acc-button" href="${rt(e.rol)}" data-link>Ir a mi panel</a>`}
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
  `)}function Ot(){return le(`
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
  `)}function kt(e){let t=g.user(),n=nt[t?.rol]||[];return le(`
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
  `)}function At(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function jt(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return At(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return At(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return At(t,`Completá usuario y PIN.`,!0);i.disabled=!0,At(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await g.changePin(r.actual,r.nuevo);t.reset(),At(t,`Listo: tu PIN quedó cambiado.`),rt(e.rol)!==`/`&&setTimeout(()=>Zc(rt(e.rol)),900);return}let e=n===`setup`?await g.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin}):await g.login(r.usuario,r.pin);if(v={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){Zc(`/login`);return}let i=Tt();Zc(i&&(nt[e.rol]||[]).includes(i.slice(1))?i:rt(e.rol))}catch(e){At(t,e instanceof tt?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function Mt(){document.addEventListener(`submit`,jt)}var y=`Pendiente de confirmar`,Nt=`12/11/2026`,b={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},Pt=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Ft={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},x={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},S=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],It=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],Lt={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Rt=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],zt={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},C=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),Bt=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Vt=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],Ht=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function Ut(e,t,n){return!!e.schedule?.[t]?.includes(n)}function Wt(e,t){return C.filter(n=>Ut(n,e,t))}function Gt(e=new Date){return S[(e.getDay()+6)%7]}function Kt(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var w={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},qt=`Tu perro`,Jt={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},Yt=[`Pequeño`,`Mediano`,`Grande`],Xt=S.filter(e=>e!==`Domingo`),Zt={Mañana:x.manana,Tarde:x.tarde};function Qt(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function $t(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function en(){let e=Qt(w.plan,null);if(!e||typeof e!=`object`)return{...Jt};let t=It.find(t=>t.id===e.planId)?e.planId:Jt.planId,n=Yt.includes(e.size)?e.size:Jt.size,r=Zt[e.shift]?e.shift:Jt.shift,i=Array.isArray(e.days)?Xt.filter(t=>e.days.includes(t)):Jt.days;return{planId:t,size:n,shift:r,days:i.length?i:Jt.days}}function tn(){let e=Qt(w.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function nn(){let e=Qt(w.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function rn(e){let t=Qt(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function an(){let e=Qt(w.carnet,null);return e&&typeof e.name==`string`?e:null}function T(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function on(e){return`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(e)}`}function sn(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function cn(e,t){return new Date(e.getTime()+t*864e5)}function ln(e){return S[(e.getUTCDay()+6)%7]}function un(e){return e.toISOString().slice(0,10)}function dn(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function fn(e){let[t,n,r]=e.split(`-`).map(Number);return dn(new Date(Date.UTC(t,n-1,r)))}function pn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function mn(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function hn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function gn(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function _n(e,t,n){return`${e} ${e===1?t:n}`}function vn(){let e=en(),t=It.find(t=>t.id===e.planId),n=Zt[e.shift],r=tn(),i=sn(),a=un(i.date),o=nn().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||qt}}function yn(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=ln(r.date),s=mn(n.from),c=mn(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function bn(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=cn(a.date,e);r.days.includes(ln(t))&&(e===0&&a.minutes>mn(i.to)||n&&o.has(un(t))||s.push(t))}return s}var xn=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],Sn=xn.flatMap(e=>e.fields);function Cn(e,t){return!!String(e[t]??``).trim()}function wn(e,t){return t.fields.filter(t=>Cn(e,t.key)).length}function Tn(e){return Sn.filter(t=>Cn(e,t.key)).length}function En(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function Dn(e){let{ficha:t}=e,n=[],r=xn.find(e=>e.id===`emergencia`);wn(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),an()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=Tn(t);return i<Sn.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${Sn.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function On(e){return e.todayIso<=r.until}var E={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function kn(e,t,n=``){E.status[e]={message:t,html:n}}function An(e){let t=E.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${T(t.message)} ${t.html}`.trim():``}</p>`}function jn(){return`
    <div class="cl-page" data-cl-root>
      ${Mn(vn())}
    </div>
  `}function Mn(e){return`
    <p class="cl-demo-note">
      ${p(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${Nn(e)}
    ${Ln(e)}
    ${zn()}
    ${Bn(e)}
    ${Vn(e)}
    ${Hn(e)}
    <div class="cl-two-col">
      ${qn()}
      ${Jn(e)}
    </div>
    ${On(e)?Yn():``}
    ${Xn()}
  `}function Nn(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=yn(e),c=En(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=bn(e,1)[0],d=u&&un(u)===e.todayIso,f=Dn(e),ee={libre:`Los días de paseo de tu plan son ${gn(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${p(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${T(a)}</strong>
            <small>${T(i.name)} · ${T(r.size)} · Turno ${T(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${T(ln(t.date))} ${dn(t.date)}</p>
        <h1 id="cl-today-title" class="cl-today-title">${s.title}</h1>
        <p class="cl-lead">${ee}</p>
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
        <div data-cl-region="alertas-hoy">${Fn(c,!0)}</div>
        ${In(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${p(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:T(ln(u))}</p>
            <p class="cl-next-date">${d?`${T(ln(u))} ${dn(u)}`:dn(u)}</p>
            <p class="cl-next-shift">Turno ${T(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${y}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${Pn(e,f)}</div>
        </article>
      </div>
    </section>
  `}function Pn(e,t=Dn(e)){return t.length?`
    <ol class="cl-pending-list">
      ${t.map((e,t)=>`
        <li>
          <button type="button" class="cl-pending-item" data-cl-go="${e.go}">
            <span class="cl-pending-num" aria-hidden="true">${t+1}</span>
            <span>
              <strong>${T(e.text)}</strong>
              <small>${T(e.detail)}</small>
            </span>
            ${p(`arrowRight`,`cl-icon-sm`)}
          </button>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="cl-all-done">${p(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function Fn(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${p(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${T(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function In(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=cn(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${S.map((e,t)=>cn(a,t)).map(e=>{let t=un(e),a=ln(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${dn(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${hn(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function Ln(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${p(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${on(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${T(b.whatsappLabel)}</small></span>
      </a>
      ${On(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${p(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${T(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function Rn(){return`Ahora: tema ${Fe()?`oscuro`:`claro`} · movimiento ${Ie()?`calmo (sin movimiento)`:`normal`}.`}function zn(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${p(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${Rn()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function Bn(e){let t=bn(e,10);return`
    <section class="cl-card cl-section" id="cl-ausencia" aria-labelledby="cl-ausencia-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`bell`,`cl-icon`)}</span>
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
                ${t.map(t=>`<option value="${un(t)}">${T(ln(t))} ${dn(t)} · turno ${T(e.settings.shift.toLowerCase())}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-absence-reason"><span>Motivo <span class="cl-optional">(opcional)</span></span>
              <input id="cl-absence-reason" type="text" maxlength="140" placeholder="Por ejemplo: viaje" data-cl-absence-reason />
            </label>
            <button type="button" class="cl-btn" data-cl-absence-save>
              ${p(`message`,`cl-icon-sm`)} Avisar por WhatsApp
            </button>
            <p class="cl-fine">Se abre WhatsApp con el mensaje listo: solo tenés que tocar Enviar. El aviso también queda anotado en este dispositivo.</p>
          `:`<p>${y}: no hay próximos paseos con los días de tu plan.</p>`}
          ${An(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${T(ln(pn(e.date)))} ${fn(e.date)}</strong>
                    ${e.reason?`<small>${T(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${T(e.date)}" aria-label="Quitar la ausencia del ${fn(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function Vn(e){let{plan:t,settings:n,shift:r}=e,i=Lt[n.size],a=n.days.length===t.walks;return`
    <section class="cl-card cl-section" id="cl-plan" aria-labelledby="cl-plan-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`calendarCheck`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-plan-title" class="cl-h2" tabindex="-1">Tu plan</h2>
          <p>Precios oficiales por semana y por perro, según el tamaño.</p>
        </div>
      </header>

      <div class="cl-plan-summary">
        <div class="cl-plan-main">
          <p class="cl-eyebrow">Plan contratado (ejemplo)</p>
          <p class="cl-plan-name">${T(t.name)}</p>
          <p class="cl-plan-walks">${_n(t.walks,`paseo`,`paseos`)} por semana · ${T(n.size)}</p>
          <p class="cl-plan-price"><b>${Kt(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${Xt.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${hn(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${T(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${y}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${p(`alertCircle`,`cl-icon-sm`)} El ${T(t.name)} incluye ${_n(t.walks,`paseo`,`paseos`)} por semana y hay ${_n(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${T(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${It.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${T(e.name)}</strong>
            <span>${_n(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${Kt(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${T(n.size.toLowerCase())}):</strong> individual ${Kt(i.individual)} · en grupo ${Kt(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Rt.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${E.openGroups.has(`plan`)?`open`:``}>
        <summary>${p(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${It.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${T(e.name)} · ${_n(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${Yt.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(Zt).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${Xt.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${An(`plan`)}
        </div>
      </details>
    </section>
  `}function Hn(e){let{ficha:t}=e,n=Tn(t),r=Sn.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${T(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${y}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${Un(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${T(zt[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${y}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${Fn(En(t))}</div>

      <div class="cl-ficha-groups">
        ${xn.map(e=>Gn(e,t)).join(``)}
      </div>
      ${An(`ficha`)}
    </section>
  `}function Un(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function Wn(e,t){let n=wn(e,t);return n===t.fields.length?`<span class="cl-count is-done">${p(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${y.toLowerCase()}</span>`}function Gn(e,t){let n=E.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${p(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${Wn(t,e)}</span>
        ${p(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>Kn(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function Kn(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${y}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${T(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${T(e.placeholder||`Pendiente de confirmar`)}">${T(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${T(r)}" placeholder="${T(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${Cn(t,e.key)?``:y}</small>`:``}
    </label>
  `}function qn(){let e=an();return`
    <section class="cl-card cl-section" id="cl-vacunas" aria-labelledby="cl-vacunas-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(e?`fileCheck`:`uploadCloud`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-vacunas-title" class="cl-h2" tabindex="-1">Carnet de vacunas</h2>
          <p>Subí una foto o PDF del carnet. Lo revisamos antes de los paseos en grupo.</p>
        </div>
      </header>
      <div class="cl-upload">
        <input id="cl-vaccine-file" class="cl-file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" data-cl-file="carnet" />
        <label for="cl-vaccine-file" class="cl-upload-box">
          ${p(`fileUp`,`cl-icon`)}
          <strong>${e?`Cambiar archivo`:`Elegir foto o PDF`}</strong>
          <small>JPG, PNG o PDF</small>
        </label>
      </div>
      <dl class="cl-file-status">
        <div><dt>Archivo</dt><dd>${e?T(e.name):`Sin archivo`}</dd></div>
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${T(e.date)}`:y}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${on(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${An(`carnet`)}
    </section>
  `}function Jn(e){let t=rn(w.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${Kt(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${on(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon-sm`)} Pedir alias y detalle por WhatsApp
      </a>
      <div class="cl-upload">
        <input id="cl-receipt-file" class="cl-file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" data-cl-file="comprobante" />
        <label for="cl-receipt-file" class="cl-upload-box is-small">
          ${p(`receipt`,`cl-icon`)}
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
        <a class="cl-btn is-secondary" href="${on(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${p(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${An(`comprobante`)}
    </section>
  `}function Yn(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${p(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${T(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${T(r.title)}</h2>
        <p>${T(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${on(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function Xn(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${p(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${E.resetArmed?`is-danger`:``}" data-cl-reset>
        ${E.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${An(`privacidad`)}
    </section>
  `}function Zn(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=Mn(vn()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function Qn(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=vn();Object.entries({pendientes:()=>Pn(t),"alertas-hoy":()=>Fn(En(t.ficha),!0),"alertas-ficha":()=>Fn(En(t.ficha)),"ficha-progreso":()=>Un(Tn(t.ficha),Sn.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),xn.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=Wn(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=Cn(t.ficha,e.dataset.clFieldState)?``:y})}function $n(e,t,n=``){kn(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${T(t)} ${n}`.trim())}function er(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,E.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Ie()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function tr(){return dn(sn().date)}function nr(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return er(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=vn(),r=nn().filter(t=>t.date!==e);r.push({date:e,reason:t}),$t(w.ausencias,r);let i=on([`Hola, aviso que ${n.dogName===qt?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${ln(pn(e)).toLowerCase()} ${fn(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),kn(`ausencia`,`Listo: anotamos la ausencia del ${fn(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),Zn(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return $t(w.ausencias,nn().filter(t=>t.date!==e)),kn(`ausencia`,`Quitamos la ausencia del ${fn(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),Zn(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=It.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?($n(`plan`,`El ${r.name} incluye ${_n(r.walks,`paseo`,`paseos`)} por semana: elegí ${_n(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):($t(w.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),kn(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),Zn(`[data-cl-plan-save]`),!0):($n(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return E.resetArmed?(Object.values(w).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),E.resetArmed=!1,E.status={},kn(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),Zn(`[data-cl-reset]`),!0):(E.resetArmed=!0,Zn(`[data-cl-reset]`),!0);if(E.resetArmed&&!e.target.closest(`[data-cl-reset]`)){E.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function rr(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:tr()};if(t.dataset.clFile===`carnet`)$t(w.carnet,n),kn(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),Zn(`[data-cl-status='carnet']`);else{let t=[n,...rn(w.comprobantes)].slice(0,10);$t(w.comprobantes,t),kn(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),Zn(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=tn();$n(`ficha`,$t(w.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function ir(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=tn();$t(w.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),Qn()}function ar(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?E.openGroups.add(t.dataset.clDetails):E.openGroups.delete(t.dataset.clDetails))}function or(){be.push(nr),xe.push(rr),document.addEventListener(`input`,ir),document.addEventListener(`toggle`,ar,!0),Le(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${Rn()} Se guarda solo en este dispositivo.`)})}var sr=`America/Argentina/Buenos_Aires`,cr=`paseosJuan_paseador_progreso`,lr=`paseosJuan_paseador_equipo`,ur=`paseosJuan_paseador_incidente`,D=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],dr={pendiente:0,retirado:1,paseando:2,entregado:3},fr=`no-sale`,pr={Mañana:`manana`,Tarde:`tarde`},mr={Mañana:x.manana,Tarde:x.tarde},hr=[`Bajo`,`Medio`,`Alto`],gr=[`No se ven`,`Sí`,`No sé`],_r=`Perro externo`,vr=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,O={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``};function k(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function yr(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function br(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function xr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:sr,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:Gt(t)}}function Sr(e){return e.minutes<810?`Mañana`:`Tarde`}function A(){let e=xr(),t=O.day||e.day;return{now:e,day:t,shift:O.shift||Sr(e),isToday:t===e.day}}function Cr(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function wr(e){let t=mr[e];return`${t.from} a ${t.to}`}function Tr(e){let t=mr[e],n=t.routes||[t.route];return n.length>1?`Rutas ${Cr(n)}`:`Ruta ${n[0]}`}function Er(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function Dr(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function Or(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${Cr(i)}`),t=t.filter(e=>!e.includes(r))}return n}function kr(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function Ar(e){return e.safety.some(e=>/bozal/i.test(e))}var jr=Bt.filter(e=>e.sebastian>0),Mr=Bt.filter(e=>e.sebastian===0&&e.juan>0),Nr=Bt.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function Pr(){return g.user()||{}}function Fr(){return Pr().nombre||`equipo`}function Ir(e,t,n){return`${e}_${t}_${pr[n]}`}function Lr(e,t,n=Pr().usuario){return`${e}_${n||`sin-usuario`}_${pr[t]}`}var Rr=new Map;function zr(e,t){let n=new Map(_.cached(e,{desde:t}).map(e=>[e.id,e]));return Rr.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function Br(e){let t=D.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===fr;return{step:r?0:Math.max(dr[e.estado]??0,n),noSale:r,times:t,record:e}}function Vr(e,t,n){let r=zr(`paseos`,e);return Object.fromEntries(n.map(n=>[n.id,Br(r.get(Ir(e,n.id,t)))]))}function Hr(e,t){let n=e.filter(e=>t[e.id]?.noSale).length,r=e.filter(e=>!t[e.id]?.noSale&&t[e.id]?.step>=D.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function Ur(e,t){let n=zr(`checklists`,e).get(Lr(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:jr.filter(e=>r[e.item]===!0).map(e=>e.item)}}function Wr(e){let t=new Map;return[`paseos`,`checklists`].forEach(n=>{_.cached(n,{desde:e}).forEach(e=>{e.creadoPor&&e.creadoPorNombre&&t.set(e.creadoPor,e.creadoPorNombre)})}),t}function Gr(e,t){return e?e===Pr().usuario?`vos`:t.get(e)||e:`Pendiente de confirmar`}function Kr(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:sr,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function qr(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Kr(e.actualizadoEn);return`Último cambio: ${Gr(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}var Jr=Promise.resolve();function Yr(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&Rr.set(r,n);let i=Jr.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await _.save(e,i);return O.syncError&&=``,t}catch(e){return O.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,wi(O.syncError),null}finally{r&&Rr.get(r)===n&&Rr.delete(r),ki()}});return Jr=i.catch(()=>null),i}function Xr(e,t,n,r){let i=t.now.iso,a={id:Ir(i,e.id,t.shift),fecha:i,perroId:e.id,perroNombre:e.name,turno:t.shift,...n};return M(r),Yr(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&M(`${r} Sin señal: se enviará cuando haya señal.`)})}function Zr(e,t){let n=e.now.iso,r=Object.fromEntries(jr.map(e=>[e.item,t.includes(e.item)])),i={id:Lr(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=jr.length};return Yr(`checklists`,i,{optimisticRecord:i})}var j={key:``,stops:[],ready:!1};function Qr(e){let t=`${e}|${Pr().usuario||``}`;j.key!==t&&(j.stops.forEach(e=>e()),j.key=t,j.stops=[],j.ready=!1,Promise.all([_.list(`paseos`,{desde:e}),_.list(`checklists`,{desde:e})]).then(()=>ei(e)).catch(e=>{O.syncError=`No se pudieron traer los datos del equipo: ${e?.message||`error del servidor`}`,wi(O.syncError),ki()}).finally(()=>{j.key===t&&(j.ready=!0,ki(),j.stops=[_.watch(`paseos`,{desde:e}),_.watch(`checklists`,{desde:e})])}))}var $r=!1;async function ei(e){if($r)return;$r=!0;let t=yr(cr,null),n=yr(lr,null);if(!t&&!n)return;let r=[],i=zr(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&pr[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=C.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=Ir(e,t,o),c=Br(i.get(s)),l=Math.min(n.length,D.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:D[l-1].estado};D.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(Yr(`paseos`,u,{optimisticRecord:u}))})});let a=zr(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!pr[o]||!Array.isArray(n))return;let s=n.filter(e=>jr.some(t=>t.item===e));s.length&&!a.has(Lr(e,o))&&r.push(Zr({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(cr),localStorage.removeItem(lr)}catch{}r.length&&M(`Se subió al equipo lo que tenías marcado en este celular.`)}}function ti(){let e=yr(ur,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function ni(e){return`
    <div class="pw-shell">
      ${ii()}
      ${e}
    </div>
  `}function ri(){let e=A(),t=Wt(e.day,e.shift),n=t.filter(e=>e.status===`Activo`),r=t.filter(e=>e.status!==`Activo`),i=Dr(t);Qr(e.now.iso);let a=e.isToday?Vr(e.now.iso,e.shift,n):{};return`
    <main class="pw-main" id="pw-inicio">
      ${ai()}
      ${oi(e,n,r,i,a)}
      ${li(e,n,r,i,a)}
      <div class="pw-columns">
        ${di(e)}
        ${fi(e,t)}
      </div>
      <footer class="pw-footer">
        <p>Datos: ${k(b.officialSources.routes)} e Inventario de equipamiento, actualizados el ${Nt}.</p>
        <p>Lo que marcás acá lo ven Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `}function ii(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel del paseador">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>Paseador · ${k(Fr())}</small>
        </span>
      </a>
      <div class="pw-header-actions">
        <button class="pw-btn pw-btn--danger pw-btn--compact" type="button" data-pw-goto="pw-incidente">
          ${p(`alertTriangle`,`pw-icon`)}
          Incidente
        </button>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-logout>
          ${p(`logOut`,`pw-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function ai(){let e=_.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${p(`uploadCloud`,`pw-icon`)}<span>${k(n)}</span></p>`),O.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${p(`alertTriangle`,`pw-icon`)}
        <span>${k(O.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function oi(e,t,n,r,i){let a=mr[e.shift],o=e.isToday?`Hoy, ${e.day.toLowerCase()} · turno ${e.shift.toLowerCase()}`:`${e.day} · turno ${e.shift.toLowerCase()}`,s=`Hola, ${k(Fr())}`;return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${e.isToday?`${s} · ${e.now.date}`:`${s} · Planificación: no es hoy`}</p>
          <h1 id="pw-today-title">${o}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${t.length}</b> ${t.length===1?`perro`:`perros`}</li>
            <li>${wr(e.shift)}</li>
            <li>Supervisa: ${k(a.supervisor)}</li>
            <li>${Tr(e.shift)}</li>
          </ul>
        </div>
        <div class="pw-today-actions">
          ${e.isToday?``:`
            <button class="pw-btn pw-btn--primary" type="button" data-pw-today>
              ${p(`calendarCheck`,`pw-icon`)}
              Volver a hoy
            </button>
          `}
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${O.pickerOpen}" aria-controls="pw-picker">
            ${p(`sliders`,`pw-icon`)}
            ${O.pickerOpen?`Cerrar selector`:`Cambiar día o turno`}
          </button>
        </div>
      </div>
      ${O.pickerOpen?si(e):``}
      ${ci(e,t,n,r,i)}
    </section>
  `}function si(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
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
              ${t}<small>${wr(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function ci(e,t,n,r,i){let a=[];r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${Or(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let o=t.filter(Ar);if(o.length){let e=o.length>Nr;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${Cr(o.map(e=>e.name))}`,text:e?`Según el inventario tenés ${Nr} ${Nr===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${Cr(n.map(e=>e.name))}`,text:n.length===1?`Figura en la ruta con estado "${k(n[0].status)}". No lo retires sin confirmarlo con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=Ur(e.now.iso,e.shift).checked.length,r=Hr(t,i);n<jr.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${jr.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return t.length?a.length?`
    <div class="pw-priorities">
      <h2 class="pw-section-label">Lo primero</h2>
      <ol class="pw-prio-list">
        ${a.slice(0,3).map(e=>`
          <li>
            <button class="pw-prio pw-prio--${e.kind}" type="button" data-pw-goto="${e.goto}">
              <span class="pw-prio-icon" aria-hidden="true">${p(e.icon,`pw-icon`)}</span>
              <span class="pw-prio-text">
                <strong>${e.title}</strong>
                <span>${e.text}</span>
                <span class="pw-prio-go">${e.button} ${p(`arrowRight`,`pw-icon pw-icon--sm`)}</span>
              </span>
            </button>
          </li>
        `).join(``)}
      </ol>
    </div>
  `:``:`
      <div class="pw-empty">
        <p><strong>No hay perros cargados para este día y turno.</strong></p>
        <p>Si te pidieron un paseo, confirmalo con Juan.</p>
      </div>
    `}function li(e,t,n,r,i){let a=Hr(t,i),o=a.toWalk?Math.round(a.delivered/a.toWalk*100):100,s=e.isToday?Wr(e.now.iso):new Map;return`
    <section class="pw-section" id="pw-perros" aria-labelledby="pw-perros-title" tabindex="-1">
      <div class="pw-section-head">
        <div>
          <h2 id="pw-perros-title">Perros del turno <span class="pw-count">${t.length}</span></h2>
          <p class="pw-muted">Orden de la planilla RPJ. Horario de retiro por perro: Pendiente de confirmar.</p>
        </div>
        ${e.isToday&&t.length?`
          <div class="pw-progress" aria-label="Avance del turno">
            <strong>${a.delivered} de ${a.toWalk} entregados${a.noSale?` · ${a.noSale} no ${a.noSale===1?`sale`:`salen`}`:``}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${o}%"></span></span>
          </div>
        `:``}
      </div>

      ${r.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${p(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en este turno</strong>
            <ul>${Or(r).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${k(mr[e.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      `:``}

      ${n.map(e=>`
        <div class="pw-banner pw-banner--warn">
          ${p(`alertCircle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>${k(e.name)}: ${k(e.status)}</strong>
            <p>${k(e.review||`Figura en la ruta, pero su estado no es Activo.`)} No lo retires sin confirmarlo con Juan.</p>
          </div>
        </div>
      `).join(``)}

      ${!e.isToday&&t.length?`
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      `:``}

      ${t.length?`
        <ul class="pw-dogs" role="list">
          ${t.map(t=>ui(t,e,i[t.id]||Br(null),kr(t,r),s)).join(``)}
        </ul>
        <p class="pw-muted pw-legend">
          Categoría operativa de todos los perros: <b>SIN EVALUAR</b>. ${k(zt[`SIN EVALUAR`])}
          Fuente: Registro maestro, 14/08/2026.
        </p>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
          <p>Probá otro día o turno con “Cambiar día o turno”.</p>
        </div>
      `}
    </section>
  `}function ui(e,t,n,r,i){let{times:a,noSale:o,record:s}=n,c=Math.min(n.step,D.length),l=!o&&c>=D.length,u=qr(s,i),d=e.safety.filter(e=>Er(e)===`danger`).join(` `),f=r.filter(e=>!d.includes(e)),ee=e.safety.filter(e=>Er(e)!==`info`),te=e.safety.filter(e=>Er(e)===`info`),ne=ee.length||r.length;return`
    <li class="pw-dog ${ne?`has-alert`:``} ${l?`is-done`:``} ${o?`is-nosale`:``}" data-pw-dog="${e.id}">
      <div class="pw-dog-head">
        <h3>${k(e.name)}</h3>
        <span class="pw-dog-facts">${k(e.size)} · ${e.minutes?`${e.minutes} min`:`Duración pendiente de confirmar`}</span>
      </div>

      ${ne?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${k(e.name)}">
          ${ee.map(e=>`
            <li class="pw-alert pw-alert--${Er(e)}">
              ${p(Er(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${k(e)}${Er(e)===`danger`&&r.length?`<b class="pw-today-tag">En este turno: ${Cr(r)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${f.length?`
            <li class="pw-alert pw-alert--danger">
              ${p(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${Cr(f)}<b class="pw-today-tag">En este turno</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${te.map(e=>`<p class="pw-dog-note">${p(`users`,`pw-icon pw-icon--sm`)} ${k(e)}</p>`).join(``)}
      ${e.review?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${k(e.review)}</p>`:``}
      <p class="pw-dog-category"><span>SIN EVALUAR</span> Registro maestro 14/08/2026</p>

      ${t.isToday?`
        ${o?`
          <p class="pw-nosale-label">${p(`x`,`pw-icon`)} No sale en este turno</p>
        `:`
          <ol class="pw-steps" aria-label="Avance de ${k(e.name)}">
            ${D.map((e,t)=>`
              <li class="${t<c?`is-done`:``} ${t===c?`is-next`:``}">
                <span class="pw-step-dot" aria-hidden="true">${t<c?p(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
                <span>${e.label}${t<c?`<small>${a[t]?k(a[t]):`Sin hora`}</small>`:``}</span>
                <span class="pw-sr">${t<c?`hecho`:`pendiente`}</span>
              </li>
            `).join(``)}
          </ol>
        `}
        ${s?.nota?`<p class="pw-dog-nota"><b>Nota:</b> ${k(s.nota)}</p>`:``}
        ${u?`<p class="pw-dog-change ${s.pendiente?`is-pending`:``}">${k(u)}</p>`:``}
        <div class="pw-dog-actions">
          ${o?``:l?`
            <p class="pw-done-label">${p(`checkCircle`,`pw-icon`)} Entregado ${k(a[D.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${e.id}" ${j.ready?``:`aria-disabled="true"`}>
              ${j.ready?D[c].action:`Cargando lo marcado…`}
            </button>
          `}
          ${!o&&c===0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${e.id}" ${j.ready?``:`aria-disabled="true"`} aria-label="${k(e.name)} no sale en este turno">No sale</button>
          `:``}
          ${o||c>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${e.id}" aria-label="Deshacer el último paso de ${k(e.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function di(e){let{checked:t,record:n}=Ur(e.now.iso,e.shift),r=t.length>=jr.length,i=qr(n,Wr(e.now.iso));return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.</p>
        </div>
        <span class="pw-count ${r?`is-ok`:``}">${t.length}/${jr.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${jr.map(e=>{let n=t.includes(e.item),r=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
            <li>
              <input class="pw-check-input" type="checkbox" id="${r}" data-pw-equip="${k(e.item)}" ${n?`checked`:``} />
              <label class="pw-check" for="${r}">
                <span class="pw-check-box" aria-hidden="true">${p(`checkCircle`,`pw-icon`)}</span>
                <span class="pw-check-text">${k(e.item)}</span>
                <span class="pw-check-qty">${e.sebastian}</span>
              </label>
            </li>
          `}).join(``)}
      </ul>
      <div class="pw-row">
        ${r?`<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`:`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      ${i?`<p class="pw-dog-change ${n?.pendiente?`is-pending`:``}">${k(i)}</p>`:``}
      <p class="pw-status" role="status">${k(O.equipStatus)}</p>
      ${Mr.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${Mr.map(e=>`${k(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function fi(e,t){let n=ti(),r=[...t.map(e=>e.name),_r];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=O.previewOpen?gi(n,e):null;return`
    <section class="pw-section pw-card pw-incident" id="pw-incidente" aria-labelledby="pw-incidente-title" tabindex="-1">
      <div class="pw-section-head">
        <div>
          <h2 id="pw-incidente-title">${p(`alertTriangle`,`pw-icon`)} Reporte de incidente</h2>
          <p class="pw-muted">Primero la seguridad. El reporte se escribe después.</p>
        </div>
      </div>

      <fieldset class="pw-fieldset pw-protocol">
        <legend>Protocolo, en este orden</legend>
        <ol class="pw-protocol-list">
          ${Ht.map((e,t)=>{let r=`pw-proto-${t}`;return`
              <li>
                <input class="pw-check-input" type="checkbox" id="${r}" data-pw-field="protocolo" value="${t}" ${n.protocolo.includes(t)?`checked`:``} />
                <label class="pw-check pw-check--step" for="${r}">
                  <span class="pw-check-box" aria-hidden="true">${p(`checkCircle`,`pw-icon`)}</span>
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
          ${hr.map(e=>`
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
          ${gr.map((e,t)=>`
            <span class="pw-toggle">
              <input type="radio" name="pw-lesiones" id="pw-lesiones-${t}" data-pw-field="lesiones" value="${e}" ${n.lesiones===e?`checked`:``} />
              <label for="pw-lesiones-${t}">${e}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <div class="pw-row">
        <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-generate>
          ${p(`fileText`,`pw-icon`)}
          Armar mensaje para Juan
        </button>
        <button class="pw-btn pw-btn--ghost ${O.confirmClear?`is-confirm`:``}" type="button" data-pw-clear>
          ${O.confirmClear?`¿Seguro? Tocá de nuevo`:n.registroId?`Empezar otro reporte`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${O.incidentStatus.startsWith(`Falta`)||O.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${k(O.incidentStatus)}</p>

      ${i&&i.ok?pi(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function pi(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${k(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${mi(e)}" target="_blank" rel="noopener noreferrer">
          ${p(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${p(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function mi(e){return`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(e)}`}function hi(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(vr)?.[0]}}function gi(e,t){let{missing:n,word:r}=hi(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=Sr(t.now),a=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,o=_i(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,`Paseador: ${Fr()}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,a(`Lesiones`,e.lesiones),a(`Lugar`,e.lugar),``,a(`Antes`,e.antes),a(`Conducta observada`,e.conducta),a(`Qué hice`,e.accion),a(`Después`,e.despues),``,`Protocolo:`,...o].join(`
`)}}function _i(e){return Ht.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function vi(e,t){let n=e.dogs.map(e=>C.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:_i(e),titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function yi(e,t=!1){O.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),M(e)}function bi(e,t){if(O.incidentSavedText===t)return Promise.resolve(null);O.incidentSavedText=t;let n=A();return Yr(`incidentes`,()=>vi({...e,registroId:ti().registroId||e.registroId},n)).then(e=>{if(!e)return O.incidentSavedText=``,null;let t=yr(ur,null);return t&&br(ur,{...t,registroId:e.id}),yi(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function xi(){let e=ti(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function Si(){let e=xi();return br(ur,e),e}function Ci(e){if(!O.previewOpen)return;let t=gi(e,A()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),O.previewOpen=!1,O.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=O.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=mi(t.text))}function M(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function wi(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var Ti=[`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function Ei(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=Ti.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function Di(){let e=document.activeElement,t=Ei(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var Oi=0;function ki(){clearTimeout(Oi),Oi=setTimeout(()=>{document.querySelector(`.pw-shell`)&&Di()},80)}function N(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function Ai(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function ji(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:Ai(),block:`start`}),t.focus({preventScroll:!0}))}async function Mi(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function Ni(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return Zc(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return O.syncError=``,N(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return ji(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return O.pickerOpen=!O.pickerOpen,N(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=xr(),t=n.dataset.pwDay;return O.day=t===e.day?null:t,N(`[data-pw-day="${t}"]`),M(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return O.shift=r.dataset.pwShift,N(`[data-pw-shift="${O.shift}"]`),M(`Mostrando el turno ${O.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return O.day=null,O.shift=null,O.pickerOpen=!1,N(`#pw-today-title`),M(`Mostrando hoy.`),!0;let i=e.target.closest(`[data-pw-step]`);if(i){let e=i.dataset.pwStep,t=A(),n=C.find(t=>t.id===e);if(!t.isToday||!n||!j.ready)return!0;let r=Vr(t.now.iso,t.shift,[n])[e];if(r.noSale||r.step>=D.length)return!0;let a=D[r.step],o={estado:a.estado};return D.forEach((e,t)=>{t<r.step&&(o[e.field]=r.times[t])}),o[a.field]=t.now.time,Xr(n,t,o,`${n.name}: ${a.done.toLowerCase()} a las ${t.now.time}.`),N(r.step+1>=D.length?`[data-pw-undo="${e}"]`:`[data-pw-step="${e}"]`),!0}let a=e.target.closest(`[data-pw-nosale]`);if(a){let e=a.dataset.pwNosale,t=A(),n=C.find(t=>t.id===e);return t.isToday&&n&&j.ready&&(Xr(n,t,{estado:fr},`${n.name}: no sale en este turno.`),N(`[data-pw-undo="${e}"]`)),!0}let o=e.target.closest(`[data-pw-undo]`);if(o){let e=o.dataset.pwUndo,t=A(),n=C.find(t=>t.id===e);if(!t.isToday||!n||!j.ready)return!0;let r=Vr(t.now.iso,t.shift,[n])[e];if(r.noSale){let i=r.times.reduce((e,t,n)=>t?n+1:e,0);return Xr(n,t,{estado:i?D[i-1].estado:`pendiente`},`${n.name}: se deshizo "no sale".`),N(i>=D.length?`[data-pw-undo="${e}"]`:`[data-pw-step="${e}"]`),!0}if(!r.step)return!0;let i=r.step-1,a={estado:i?D[i-1].estado:`pendiente`};return D.forEach((e,t)=>{a[e.field]=t<i?r.times[t]:``}),Xr(n,t,a,`${n.name}: se deshizo "${D[i].done.toLowerCase()}".`),N(`[data-pw-step="${e}"]`),!0}if(e.target.closest(`[data-pw-equip-all]`))return Zr(A(),jr.map(e=>e.item)),O.equipStatus=`Equipo completo. ¡A salir!`,N(`[data-pw-equip-reset]`),M(O.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return Zr(A(),[]),O.equipStatus=`Lista de equipo desmarcada.`,N(`[data-pw-equip-all]`),M(O.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=Si(),t=gi(e,A());return O.confirmClear=!1,t.ok?(O.previewOpen=!0,O.incidentStatus=O.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,N(`[data-pw-message]`),M(O.incidentStatus),bi(e,t.text),!0):(O.previewOpen=!1,O.incidentStatus=t.missing.length?`Falta completar: ${Cr(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,N(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),M(O.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=ti(),t=gi(e,A());return t.ok&&bi(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=ti(),n=gi(t,A());return n.ok&&bi(t,n.text),Mi(e).then(e=>{O.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=O.incidentStatus,t.classList.toggle(`is-warn`,!e)),M(O.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!O.confirmClear)return O.confirmClear=!0,N(`[data-pw-clear]`),!0;let e=!!ti().registroId;try{localStorage.removeItem(ur)}catch{}return O.confirmClear=!1,O.previewOpen=!1,O.incidentSavedText=``,O.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,N(`#pw-incidente`),M(O.incidentStatus),!0}if(O.confirmClear&&!e.target.closest(`[data-pw-clear]`)){O.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=ti().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function Pi(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=A(),{checked:n}=Ur(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return Zr(e,i),O.equipStatus=i.length>=jr.length?`Equipo completo. ¡A salir!`:``,N(`[data-pw-equip="${CSS.escape(r)}"]`),O.equipStatus&&M(O.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(Ci(Si()),!0):!1}function Fi(e){e.target.closest?.(`[data-pw-field]`)&&Ci(Si())}function Ii(){be.push(Ni),xe.push(Pi),document.addEventListener(`input`,Fi),et(e=>{(e===`paseos`||e===`checklists`||e===`incidentes`)&&ki()}),window.addEventListener(`online`,ki),window.addEventListener(`offline`,ki)}var Li=`America/Argentina/Buenos_Aires`,Ri=[`manana`,`tarde`],zi=[`Paseador asignado`,`Sebastián`],Bi=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,P={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,control:`paseosJuanSupervisor_control`,closure:`paseosJuanSupervisor_cierre`,routes:`paseosJuanSupervisor_rutas`,routeDraft:`paseosJuanSupervisor_rutaBorrador`,observations:`paseosJuanSupervisor_observaciones`,observationDraft:`paseosJuanSupervisor_observacionBorrador`},Vi=null,Hi=null,Ui=null;function F(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Wi(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function I(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function L(e,t,n=`ok`){Vi={area:e,text:t,tone:n}}function Gi(e){return Vi&&Vi.area===e?Vi:null}function Ki(e){let t=Gi(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?F(t.text):``}</p>
  `}function qi(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function Ji(e){let[t,n]=String(e).split(`:`).map(Number);return t*60+n}function Yi(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Li,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:S[(n+6)%7]}}function Xi(e){return e.minutes<Ji(`13:30`)?`manana`:`tarde`}function Zi(e){let t=x[e];return t.routes||[t.route]}function Qi(e,t){let n=x[e];return t.minutes<Ji(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=Ji(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function R(){let e=Yi(),t=Wi(P.view,{}),n={day:e.dayName,shift:Xi(e)},r=t.date===e.iso?{...n,...t}:n;return S.includes(r.day)||(r.day=n.day),Ri.includes(r.shift)||(r.shift=n.shift),{...r,now:e,isToday:r.day===e.dayName}}function $i(e){I(P.view,{date:Yi().iso,day:e.day,shift:e.shift})}function ea(e,t=!1){let n=Wi(P.folds,{});return typeof n[e]==`boolean`?n[e]:t}function ta(e){return`${e.now.iso}|${e.shift}`}function na(e){return Wi(P.control,{})[ta(e)]||{}}function ra(e,t){let n=Wi(P.control,{});n[ta(e)]=t,I(P.control,n)}function ia(e){return Wi(P.closure,{})[ta(e)]||{}}function aa(e,t){let n=Wi(P.closure,{});n[ta(e)]=t,I(P.closure,n)}function oa(e){return C.find(t=>t.id===e)}function sa(e,t){return Wt(e,x[t].label)}function ca(e){return e.safety.some(e=>/bozal/i.test(e))}function la(e){return e.safety.find(e=>/bozal/i.test(e))||``}function ua(e){let t=new Set(e.map(e=>e.name)),n=new Set,r=[];return e.forEach(e=>{(e.incompatibleWith||[]).forEach(i=>{if(!t.has(i))return;let a=[e.name,i].sort().join(`|`);n.has(a)||(n.add(a),r.push([e.name,i]))})}),r}function da(e){let t=new Set(e.map(e=>e.size));return{pairs:ua(e),muzzle:e.filter(ca),review:e.filter(e=>e.review),inactive:e.filter(e=>e.status!==`Activo`),unevaluated:e.filter(e=>e.category===`SIN EVALUAR`),sizeMix:t.has(`Pequeño`)&&t.has(`Grande`)}}function fa(e){return e.map(([e,t])=>`${e} con ${t}`)}function pa(e){let t=da(e),n=[];if(t.pairs.length&&n.push({tone:`danger`,icon:`alertTriangle`,title:t.pairs.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${t.pairs.length} parejas que no pueden ir juntas`,lines:fa(t.pairs).map(e=>`No juntar: ${e}.`),action:`Armá grupos o rutas separadas antes de salir.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),t.muzzle.length&&n.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${t.muzzle.length} perro${t.muzzle.length===1?``:`s`}`,lines:t.muzzle.map(e=>`${e.name}: ${la(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),t.inactive.length&&n.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${t.inactive.length===1?`sale ${t.inactive[0].name}`:`salen ${t.inactive.length} perros`}`,lines:t.inactive.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),t.review.length){let e=t.review.filter(e=>e.status===`Activo`);e.length&&n.push({tone:`info`,icon:`fileText`,title:`${e.length} perro${e.length===1?` tiene`:`s tienen`} datos a revisar`,lines:e.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${Nt}.`})}return t.unevaluated.length>1&&n.push({tone:`info`,icon:`eye`,title:`${t.unevaluated.length} perros salen en grupo SIN EVALUAR`,lines:[`${zt[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),n}function ma(){return Wi(P.routes,[])}function ha(e){I(P.routes,e)}function ga(e,t){return ma().filter(n=>n.day===e&&n.shift===t)}function _a(e){return{day:e.day,shift:e.shift,route:Zi(e.shift)[0],walker:zi[0],dogIds:[],notes:``,confirm:!1,reason:``,showAll:!1,editingId:null}}function va(e){let t=Wi(P.routeDraft,{});if(t.day!==e.day||t.shift!==e.shift)return _a(e);let n={..._a(e),...t};return n.dogIds=Array.isArray(n.dogIds)?n.dogIds.filter(e=>oa(e)):[],Zi(e.shift).includes(n.route)||(n.route=Zi(e.shift)[0]),zi.includes(n.walker)||(n.walker=zi[0]),n}function ya(e){I(P.routeDraft,e)}function ba(e){let t=e.dogIds.map(oa).filter(Boolean),n=da(t),r=new Set(sa(e.day,e.shift).map(e=>e.id)),i=ga(e.day,e.shift).filter(t=>t.id!==e.editingId),a=[],o=[];if(fa(n.pairs).forEach(e=>a.push({tone:`danger`,text:`Incompatibles: ${e}. No pueden ir en la misma ruta.`})),n.sizeMix){let e=t.filter(e=>e.size===`Pequeño`).map(e=>e.name),n=t.filter(e=>e.size===`Grande`).map(e=>e.name);a.push({tone:`warn`,text:`Tamaños mezclados: pequeños (${e.join(`, `)}) con grandes (${n.join(`, `)}).`})}return n.muzzle.forEach(e=>o.push({tone:`warn`,text:`${e.name}: ${la(e)}. Confirmá el bozal antes de salir.`})),n.inactive.forEach(e=>o.push({tone:`warn`,text:`${e.name} figura como «${e.status}». Confirmá con Juan antes de sumarlo.`})),t.filter(e=>!r.has(e.id)).forEach(t=>o.push({tone:`info`,text:`${t.name} no figura en BASE RUTAS para ${e.day} a la ${x[e.shift].label.toLowerCase()}.`})),t.forEach(e=>{let t=i.find(t=>t.dogIds.includes(e.id));t&&o.push({tone:`info`,text:`${e.name} ya está en la ruta ${t.route} guardada para este turno.`})}),{dogs:t,conflicts:a,warnings:o}}var xa=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function Sa(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function Ca(e){return{...Sa(e),...Wi(P.observationDraft,{})}}function wa(){return Wi(P.observations,[])}function Ta(e){let t=oa(e.dogId);return[`Observación de conducta — ${b.name}`,`Perro: ${t?t.name:y}`,`Fecha: ${e.fecha}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar}`,`Estímulo: ${e.estimulo}`,`Reacción: ${e.reaccion}`,`Acción: ${e.accion}`,`Resultado: ${e.resultado}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${e.autor||`Pendiente de confirmar`}`].join(`
`)}function Ea(e,t){let n=x[e.shift],r=na(e),i=ia(e),a=da(t),o=ga(e.day,e.shift),s=t.filter(e=>!r[e.id]?.ausente),c=s.filter(e=>r[e.id]?.retiro),l=s.filter(e=>r[e.id]?.entrega),u=t.filter(e=>r[e.id]?.ausente),d=s.filter(e=>!r[e.id]?.entrega),f=wa().filter(t=>t.fecha===e.now.label&&t.shift===e.shift),ee=[`Cierre de turno — ${b.name}`,`Fecha: ${e.now.label} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisa: ${n.supervisor}`,`Rutas: ${Zi(e.shift).join(` y `)}`,...o.map(e=>`- ${e.route} (${e.walker}): ${e.dogIds.map(e=>oa(e)?.name).filter(Boolean).join(`, `)}`),`Perros previstos: ${t.length}`,`Retirados: ${c.length} de ${s.length} · Entregados: ${l.length} de ${s.length}`,`No salieron: ${u.length?u.map(e=>e.name).join(`, `):`ninguno`}`,`Sin entrega marcada: ${d.length?d.map(e=>e.name).join(`, `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${a.pairs.length?fa(a.pairs).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${a.muzzle.length?a.muzzle.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${f.length}`,`Notas del supervisor: ${i.notas?.trim()||`sin notas`}`];return i.cerrado&&ee.push(`Turno cerrado a las ${i.cerrado} hs.`),ee.join(`
`)}function Da(e){return`
    <div class="sv-shell">
      ${Oa()}
      ${e}
    </div>
  `}function Oa(){return`
    <header class="sv-header">
      <a class="sv-brand" href="/supervisor" data-link aria-label="Paseos Juan, panel de supervisión">
        <span class="sv-logo" aria-hidden="true">
          <img class="sv-logo-light" src="/paseos-juan-logo.png" alt="" />
          <img class="sv-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan</strong>
          <small>Supervisión de turno</small>
        </span>
      </a>
      <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
        ${p(`logOut`,`sv-icon`)}
        Salir
      </button>
    </header>
  `}function ka(){let e=R(),t=sa(e.day,e.shift),n=`
    <main class="sv-main" id="sv-main">
      ${Aa(e,t)}
      ${ja(e,t)}
      ${Pa(e,t)}
      ${Ia(e)}
      ${Ra(e,t)}
      ${Ba(e,t)}
      ${Va()}
    </main>
  `;return Vi=null,n}function Aa(e,t){let n=x[e.shift],r=e.isToday?Qi(e.shift,e.now):null,i=e.shift===`manana`?`tarde`:`manana`,a=sa(e.day,i).length,o=ga(e.day,e.shift),s=Zi(e.shift),c=t.filter(e=>e.status===`Activo`).length;return`
    <section class="sv-hero" aria-labelledby="sv-hero-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">${e.isToday?`Hoy · ${F(e.day)} ${e.now.label}`:`Planificación · ${F(e.day)}`}</p>
          <h1 id="sv-hero-title">Turno ${n.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${n.from} a ${n.to} hs · Supervisa <strong>${n.supervisor}</strong>
            ${r?`<span class="sv-moment is-${r.tone}">${r.label}</span>`:``}
          </p>
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno">
            ${Ri.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${x[t].label}
                <small>${sa(e.day,t).length} perros</small>
              </button>
            `).join(``)}
          </div>
          <label class="sv-field sv-field-inline" for="sv-day">Día
            <select id="sv-day" data-sv-day>
              ${S.map(t=>`<option value="${t}" ${t===e.day?`selected`:``}>${t}${t===e.now.dayName?` (hoy)`:``}</option>`).join(``)}
            </select>
          </label>
          ${e.isToday?``:`<button type="button" class="sv-button sv-button-quiet" id="sv-today" data-sv-today>Volver a hoy</button>`}
        </div>
      </div>

      ${e.isToday?``:`
        <p class="sv-note is-info">Estás mirando ${F(e.day)} para planificar. El control de retiro y entrega se usa solo el día de hoy.</p>
      `}

      <dl class="sv-stats">
        <div><dt>Perros en el turno</dt><dd>${t.length}${c===t.length?``:` <small>(${c} activos)</small>`}</dd></div>
        <div><dt>Turno ${x[i].label.toLowerCase()}</dt><dd>${a} <small>perros</small></dd></div>
      </dl>

      <ul class="sv-route-list" aria-label="Rutas del turno">
        ${s.map(e=>{let n=o.find(t=>t.route===e),r=n?`${n.dogIds.length} perros (ruta armada)`:s.length===1?`${t.length} perros`:`Reparto: ${y}`;return`
            <li>
              <span class="sv-route-code">${e}</span>
              <span class="sv-route-walker">${p(`userCheck`,`sv-icon`)} ${F(n?.walker||zi[0])}</span>
              <span class="sv-route-count">${r}</span>
            </li>
          `}).join(``)}
      </ul>
      ${s.length>1&&o.length<s.length?`
        <p class="sv-hint">La planilla no dice qué perros van en cada ruta de la tarde: armalas en «Armar rutas del turno».</p>
      `:``}
    </section>
  `}function ja(e,t){if(!t.length)return`
      <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
        <h2 id="sv-safety-title" class="sv-title">${p(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p class="sv-empty">No hay perros cargados en BASE RUTAS para ${F(e.day)} a la ${x[e.shift].label.toLowerCase()}.</p>
      </section>
    `;let n=pa(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${p(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Lo primero que tenés que resolver antes de salir. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>Ma(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos" ${ea(`avisos`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>Ma(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function Ma(e,t){return`
    <li class="sv-warning is-${e.tone}">
      <div class="sv-warning-head">
        ${t?`<span class="sv-rank" aria-label="Prioridad ${t}">${t}</span>`:`<span class="sv-warning-icon">${p(e.icon,`sv-icon`)}</span>`}
        <h3>${F(e.title)}</h3>
      </div>
      <ul class="sv-warning-lines">
        ${e.lines.map(e=>`<li>${F(e)}</li>`).join(``)}
      </ul>
      <p class="sv-warning-action"><strong>Qué hacer:</strong> ${F(e.action)}</p>
      <p class="sv-source">${F(e.source)}</p>
    </li>
  `}function Na(e){let t=e.safety.map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?F(e):`<b>${F(e)}</b>`}</li>`});return e.status!==`Activo`&&t.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${F(e.status)}</li>`),e.review&&t.push(`<li class="sv-chip is-info"><b>Dato a revisar</b></li>`),e.category!==`SIN EVALUAR`&&t.push(`<li class="sv-chip is-neutral"><b>${F(e.category)}</b> · ${F(e.categorySource)}</li>`),t.length?`<ul class="sv-chips" aria-label="Avisos de ${F(e.name)}">${t.join(``)}</ul>`:``}function Pa(e,t){let n=ea(`perros`,!0),r=na(e),i=t.filter(e=>!r[e.id]?.ausente),a=i.filter(e=>r[e.id]?.retiro).length,o=i.filter(e=>r[e.id]?.entrega).length,s=t.length-i.length,c=t.length&&t.every(e=>e.category===`SIN EVALUAR`);return`
    <details class="sv-fold" data-sv-fold="perros" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`clipboardCheck`,`sv-icon`)} Perros del turno: retiro y entrega</span>
        <span class="sv-fold-meta">${e.isToday?`Retirados ${a}/${i.length} · Entregados ${o}/${i.length}`:`${t.length} perros`}</span>
      </summary>
      <div class="sv-fold-body">
        ${t.length?`
          ${e.isToday?`
            <div class="sv-progress" aria-hidden="true"><span style="width:${i.length?Math.round(o/i.length*100):0}%"></span></div>
            <p class="sv-hint">Tocá «Retirado» al levantar a cada perro y «Entregado» al dejarlo. Se guarda la hora en este dispositivo.${s?` No salen hoy: ${s}.`:``}</p>
          `:``}
          ${c?`<p class="sv-hint">Categoría de todos: <strong>SIN EVALUAR</strong> · Fuente: Registro maestro de perros, 14/08/2026.</p>`:``}
          <ul class="sv-dog-list">
            ${t.map(t=>Fa(t,r[t.id]||{},e.isToday)).join(``)}
          </ul>
          ${Ki(`control`)}
        `:`<p class="sv-empty">No hay perros para este día y turno.</p>`}
      </div>
    </details>
  `}function Fa(e,t,n){let r=!!t.ausente;return`
    <li class="sv-dog ${r?`is-absent`:``} ${t.entrega?`is-done`:``}">
      <div class="sv-dog-info">
        <div class="sv-dog-head">
          <h3>${F(e.name)}</h3>
          ${n&&!r&&!t.retiro?`<button type="button" class="sv-link" id="sv-absent-${e.id}" data-sv-absent="${e.id}" aria-label="${F(e.name)} no sale hoy">No sale hoy</button>`:``}
        </div>
        <p>${F(e.size)} · ${e.minutes?`${e.minutes} min`:y} · ${F(e.plan)}</p>
        ${Na(e)}
      </div>
      ${n?`
        <div class="sv-dog-actions">
          ${r?`
            <p class="sv-dog-state">No sale hoy</p>
            <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${e.id}" data-sv-absent="${e.id}" aria-label="Deshacer: ${F(e.name)} sí sale hoy">Deshacer</button>
          `:`
            <button type="button" class="sv-button ${t.retiro?`is-checked`:`sv-button-primary`}" id="sv-pickup-${e.id}" data-sv-pickup="${e.id}" aria-pressed="${!!t.retiro}" aria-label="${t.retiro?`Desmarcar retiro de ${F(e.name)}`:`Marcar a ${F(e.name)} como retirado`}">
              ${t.retiro?`${p(`checkCircle`,`sv-icon`)} Retirado ${t.retiro}`:`Retirado`}
            </button>
            <button type="button" class="sv-button ${t.entrega?`is-checked`:``}" id="sv-deliver-${e.id}" data-sv-deliver="${e.id}" aria-pressed="${!!t.entrega}" ${t.retiro?``:`disabled`} aria-label="${t.entrega?`Desmarcar entrega de ${F(e.name)}`:`Marcar a ${F(e.name)} como entregado`}">
              ${t.entrega?`${p(`checkCircle`,`sv-icon`)} Entregado ${t.entrega}`:`Entregado`}
            </button>
          `}
        </div>
      `:``}
    </li>
  `}function Ia(e){let t=ea(`rutas`),n=va(e),r=ba(n),i=ga(e.day,e.shift),a=new Set(sa(e.day,e.shift).map(e=>e.id)),o=n.showAll?C:C.filter(e=>a.has(e.id)||n.dogIds.includes(e.id)),s=i.filter(e=>e.id!==n.editingId),c=r.conflicts.length>0;return`
    <details class="sv-fold" data-sv-fold="rutas" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`route`,`sv-icon`)} Armar rutas del turno</span>
        <span class="sv-fold-meta">${i.length?`${i.length} guardada${i.length===1?``:`s`}`:`Sin rutas armadas`}</span>
      </summary>
      <div class="sv-fold-body">
        ${i.length?`
          <h3 class="sv-subtitle">Rutas guardadas · ${F(e.day)} ${x[e.shift].label.toLowerCase()}</h3>
          <ul class="sv-saved-routes">
            ${i.map(e=>La(e)).join(``)}
          </ul>
        `:``}

        <form class="sv-builder" data-sv-route-form novalidate>
          <h3 class="sv-subtitle">${n.editingId?`Editar ruta`:`Nueva ruta`} · ${F(e.day)} ${x[e.shift].label.toLowerCase()}</h3>
          <div class="sv-form-grid">
            <label class="sv-field" for="sv-route-code">Ruta
              <select id="sv-route-code" data-sv-route-field="route">
                ${Zi(e.shift).map(e=>`<option ${e===n.route?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label class="sv-field" for="sv-route-walker">Paseador
              <select id="sv-route-walker" data-sv-route-field="walker">
                ${zi.map(e=>`<option ${e===n.walker?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
          </div>

          <fieldset class="sv-dog-picker">
            <legend>Perros de la ruta <span>(${n.dogIds.length} elegidos)</span></legend>
            <label class="sv-check" for="sv-route-all">
              <input type="checkbox" id="sv-route-all" data-sv-route-all ${n.showAll?`checked`:``} />
              <span>Mostrar también perros de otros días y turnos</span>
            </label>
            ${o.length?`
              <ul class="sv-pick-list">
                ${o.map(e=>{let t=n.dogIds.includes(e.id),r=s.find(t=>t.dogIds.includes(e.id)),i=[ca(e)?`<span class="sv-tag is-warn">Bozal</span>`:``,e.incompatibleWith?.length?`<span class="sv-tag is-danger">No juntar con ${F(qi(e.incompatibleWith,`ni`))}</span>`:``,e.status===`Activo`?``:`<span class="sv-tag is-danger">${F(e.status)}</span>`,a.has(e.id)?``:`<span class="sv-tag is-info">Fuera de este turno</span>`,r?`<span class="sv-tag is-neutral">Ya en ${r.route}</span>`:``].join(``);return`
                    <li>
                      <label class="sv-pick ${t?`is-selected`:``}" for="sv-pick-${e.id}">
                        <input type="checkbox" id="sv-pick-${e.id}" data-sv-route-dog="${e.id}" ${t?`checked`:``} />
                        <span class="sv-pick-name">${F(e.name)} <small>${F(e.size)}</small></span>
                        ${i?`<span class="sv-pick-tags">${i}</span>`:``}
                      </label>
                    </li>
                  `}).join(``)}
              </ul>
            `:`<p class="sv-empty">No hay perros en este turno. Marcá «Mostrar también perros de otros días y turnos».</p>`}
          </fieldset>

          ${r.dogs.length>1?`
            <div class="sv-order">
              <h4>Orden de retiro</h4>
              <ol>
                ${r.dogs.map((e,t)=>`
                  <li>
                    <span><b>${t+1}.</b> ${F(e.name)}</span>
                    <span class="sv-order-buttons">
                      <button type="button" class="sv-mini" id="sv-up-${e.id}" data-sv-order="up" data-dog="${e.id}" ${t===0?`disabled`:``} aria-label="Subir a ${F(e.name)}">Subir</button>
                      <button type="button" class="sv-mini" id="sv-down-${e.id}" data-sv-order="down" data-dog="${e.id}" ${t===r.dogs.length-1?`disabled`:``} aria-label="Bajar a ${F(e.name)}">Bajar</button>
                    </span>
                  </li>
                `).join(``)}
              </ol>
            </div>
          `:``}

          <div class="sv-check-results" aria-live="polite">
            ${r.conflicts.map(e=>`<p class="sv-note is-${e.tone}">${p(`alertTriangle`,`sv-icon`)} ${F(e.text)}</p>`).join(``)}
            ${r.warnings.map(e=>`<p class="sv-note is-${e.tone}">${F(e.text)}</p>`).join(``)}
            ${r.dogs.length&&!c&&!r.warnings.length?`<p class="sv-note is-ok">${p(`checkCircle`,`sv-icon`)} Sin incompatibles ni tamaños mezclados.</p>`:``}
          </div>

          ${c?`
            <fieldset class="sv-confirm">
              <legend>Esta ruta tiene ${r.conflicts.length===1?`un conflicto`:`${r.conflicts.length} conflictos`}</legend>
              <p>Lo más seguro es cambiar los perros. Si igual la necesitás así, confirmalo y escribí la medida que vas a tomar.</p>
              <label class="sv-check" for="sv-route-confirm">
                <input type="checkbox" id="sv-route-confirm" data-sv-route-confirm ${n.confirm?`checked`:``} />
                <span>Revisé el conflicto y quiero guardar la ruta igual</span>
              </label>
              <label class="sv-field" for="sv-route-reason">Medida que vas a tomar (obligatoria)
                <textarea id="sv-route-reason" rows="2" data-sv-route-field="reason" placeholder="Ej.: Pistacho va con el supervisor, separado del grupo.">${F(n.reason)}</textarea>
              </label>
            </fieldset>
          `:``}

          <label class="sv-field" for="sv-route-notes">Notas de la ruta (opcional)
            <textarea id="sv-route-notes" rows="2" data-sv-route-field="notes" placeholder="Ej.: Retirar primero a los perros con bozal.">${F(n.notes)}</textarea>
          </label>

          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-route-save">${p(`checkCircle`,`sv-icon`)} ${n.editingId?`Guardar cambios`:`Guardar ruta`}</button>
            <button type="button" class="sv-button" id="sv-route-reset" data-sv-route-reset>${n.editingId?`Cancelar edición`:`Vaciar`}</button>
          </div>
          ${Ki(`route`)}
        </form>
      </div>
    </details>
  `}function La(e){let t=e.dogIds.map(e=>oa(e)?.name).filter(Boolean),n=Hi===e.id;return`
    <li class="sv-saved ${e.conflicts?.length?`has-conflict`:``}">
      <div class="sv-saved-head">
        <strong>${F(e.route)}</strong>
        <span>${F(e.walker)} · ${t.length} perros</span>
      </div>
      <p>${t.map((e,t)=>`${t+1}. ${F(e)}`).join(` · `)}</p>
      ${e.conflicts?.length?`
        <div class="sv-note is-warn">
          <strong>Guardada con conflicto confirmado.</strong>
          <ul>${e.conflicts.map(e=>`<li>${F(e)}</li>`).join(``)}</ul>
          <span>Medida: ${F(e.reason)}</span>
        </div>
      `:``}
      ${e.notes?`<p class="sv-hint">Notas: ${F(e.notes)}</p>`:``}
      <p class="sv-source">Guardada ${F(e.savedAt)}</p>
      <div class="sv-actions">
        ${n?`
          <button type="button" class="sv-button sv-button-danger" id="sv-route-del-ok-${e.id}" data-sv-route-delete-ok="${e.id}">Sí, borrar ${F(e.route)}</button>
          <button type="button" class="sv-button" id="sv-route-del-no-${e.id}" data-sv-route-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-route-edit-${e.id}" data-sv-route-edit="${e.id}">Editar</button>
          <button type="button" class="sv-button" id="sv-route-del-${e.id}" data-sv-route-delete="${e.id}">Borrar</button>
        `}
      </div>
    </li>
  `}function Ra(e,t){let n=ea(`observaciones`),r=Ca(e),i=wa(),a=new Set(t.map(e=>e.id)),o=C.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} registrada${i.length===1?``:`s`}`:`Sin registros`}</span>
      </summary>
      <div class="sv-fold-body">
        <p class="sv-note is-info">Describí lo que se vio y se oyó, no lo que creés que siente el perro. No uses etiquetas como «agresivo», «malo» o «dominante». Sin datos de tutores.</p>
        <form class="sv-obs-form" data-sv-obs-form novalidate>
          <div class="sv-form-grid sv-form-grid-3">
            <label class="sv-field" for="sv-obs-dog">Perro
              <select id="sv-obs-dog" data-sv-obs="dogId" required>
                <option value="">Elegí un perro</option>
                ${t.length?`<optgroup label="De este turno">${t.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${F(e.name)}</option>`).join(``)}</optgroup>`:``}
                <optgroup label="Otros perros">${o.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${F(e.name)}</option>`).join(``)}</optgroup>
              </select>
            </label>
            <label class="sv-field" for="sv-obs-fecha">Fecha (DD/MM/AAAA)
              <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${F(r.fecha)}" inputmode="numeric" placeholder="${e.now.label}" maxlength="10" autocomplete="off" required />
            </label>
            <label class="sv-field" for="sv-obs-hora">Hora (opcional)
              <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${F(r.hora)}" />
            </label>
          </div>
          ${xa.map(e=>`
            <label class="sv-field" for="sv-obs-${e.key}">${e.label}
              <span class="sv-field-hint" id="sv-obs-${e.key}-hint">${e.hint}</span>
              ${e.type===`input`?`<input type="text" id="sv-obs-${e.key}" data-sv-obs="${e.key}" value="${F(r[e.key])}" aria-describedby="sv-obs-${e.key}-hint" required />`:`<textarea id="sv-obs-${e.key}" rows="2" data-sv-obs="${e.key}" aria-describedby="sv-obs-${e.key}-hint" required>${F(r[e.key])}</textarea>`}
            </label>
          `).join(``)}
          <label class="sv-check" for="sv-obs-seguimiento">
            <input type="checkbox" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${r.seguimiento?`checked`:``} />
            <span>Requiere seguimiento (avisar a Juan)</span>
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-obs-save">${p(`checkCircle`,`sv-icon`)} Guardar observación</button>
          </div>
          ${Ki(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas en este dispositivo</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>za(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function za(e){let t=oa(e.dogId),n=Ui===e.id;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${F(t?t.name:y)}</strong>
        <span>${F(e.fecha)}${e.hora?` · ${F(e.hora)} hs`:``} · ${F(e.lugar)}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${F(e.estimulo)}</dd></div>
        <div><dt>Reacción</dt><dd>${F(e.reaccion)}</dd></div>
        <div><dt>Acción</dt><dd>${F(e.accion)}</dd></div>
        <div><dt>Resultado</dt><dd>${F(e.resultado)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${F(e.autor||`Pendiente de confirmar`)}</p>
      <div class="sv-actions">
        ${n?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${p(`copy`,`sv-icon`)} Copiar texto</button>
          <button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>
        `}
      </div>
    </li>
  `}function Ba(e,t){let n=ea(`cierre`),r=ia(e);if(!e.isToday)return`
      <details class="sv-fold" data-sv-fold="cierre" ${n?`open`:``}>
        <summary>
          <span class="sv-fold-title">${p(`flag`,`sv-icon`)} Cerrar el turno</span>
          <span class="sv-fold-meta">Solo para hoy</span>
        </summary>
        <div class="sv-fold-body">
          <p class="sv-empty">El cierre se hace el mismo día del turno. Tocá «Volver a hoy».</p>
        </div>
      </details>
    `;let i=Ea(e,t);return`
    <details class="sv-fold" data-sv-fold="cierre" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`flag`,`sv-icon`)} Cerrar el turno</span>
        <span class="sv-fold-meta">${r.cerrado?`Cerrado ${r.cerrado} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${F(r.notas||``)}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar
          <textarea id="sv-close-summary" class="sv-summary" rows="14" readonly>${F(i)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${p(`copy`,`sv-icon`)} Copiar resumen</button>
          ${r.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${p(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${Ki(`closure`)}
      </div>
    </details>
  `}function Va(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${ea(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(zt).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas, días y turnos: ${b.officialSources.routes}, leída el ${Nt}.</li>
          <li>Perros: ${b.officialSources.dogs}.</li>
          <li>Qué perros van en PJ_1T y en PJ_2T: ${y}.</li>
          <li>Lo que cargás en esta pantalla se guarda solo en este dispositivo.</li>
        </ul>
      </div>
    </details>
  `}function z(e){$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function Ha(){return Yi().time}async function Ua(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function Wa(e,t,n){let r=R();if(!r.isToday)return;let i=na(r),a={...i[e]||{}},o=oa(e);t===`ausente`?(a.ausente=!a.ausente,a.ausente&&(delete a.retiro,delete a.entrega),L(`control`,a.ausente?`${o.name}: no sale hoy.`:`${o.name}: vuelve a la lista.`)):a[t]?(delete a[t],t===`retiro`&&delete a.entrega,L(`control`,`${o.name}: ${t===`retiro`?`retiro`:`entrega`} desmarcado.`,`info`)):(a[t]=Ha(),L(`control`,`${o.name}: ${t===`retiro`?`retirado`:`entregado`} a las ${a[t]} hs.`)),i[e]=a,ra(r,i),z(n)}function Ga(){let e=R(),t=va(e),n=ba(t);if(!n.dogs.length)return L(`route`,`Elegí al menos un perro para guardar la ruta.`,`error`),z(`sv-route-save`);if(n.conflicts.length&&!t.confirm)return L(`route`,`La ruta tiene conflictos: marcá «Revisé el conflicto» para guardarla igual.`,`error`),z(`sv-route-confirm`);if(n.conflicts.length&&!t.reason.trim())return L(`route`,`Escribí qué medida vas a tomar para guardar una ruta con conflicto.`,`error`),z(`sv-route-reason`);let r=Yi(),i={id:t.editingId||`ruta-${Date.now()}`,day:t.day,shift:t.shift,route:t.route,walker:t.walker,dogIds:n.dogs.map(e=>e.id),notes:t.notes.trim(),conflicts:n.conflicts.map(e=>e.text),reason:n.conflicts.length?t.reason.trim():``,savedAt:`${r.label} ${r.time} hs`},a=ma(),o=a.findIndex(e=>e.id===i.id);return o>=0?a[o]=i:a.push(i),ha(a),ya(_a(e)),L(`route`,`Ruta ${i.route} guardada con ${i.dogIds.length} perros${i.conflicts.length?` (conflicto confirmado)`:``}.`),z(`sv-route-save`)}function Ka(e){let t=R(),n=Ca(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),I(P.observationDraft,n);let r=[];if(n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),xa.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())}),!r.length&&!/^\d{2}\/\d{2}\/\d{4}$/.test(n.fecha.trim()))return L(`observation`,`Escribí la fecha como DD/MM/AAAA, por ejemplo 12/11/2026.`,`error`),z(`sv-obs-fecha`);if(r.length)return L(`observation`,`Falta completar: ${qi(r)}.`,`error`),z(n.dogId?n.fecha?`sv-obs-${xa.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let i=xa.find(e=>Bi.test(n[e.key]));if(i){let e=n[i.key].match(Bi)[2];return L(`observation`,`En «${i.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),z(`sv-obs-${i.key}`)}let a={...n,id:`obs-${Date.now()}`,shift:t.shift,autor:`Supervisión turno ${x[t.shift].label.toLowerCase()}`};return I(P.observations,[a,...wa()]),I(P.observationDraft,Sa(t)),L(`observation`,`Observación de ${oa(n.dogId)?.name} guardada en este dispositivo.`),z(`sv-obs-save`)}function qa(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return Zc(`/login`),!0;let n=t.closest(`[data-sv-shift]`);if(n)return $i({...R(),shift:n.dataset.svShift}),z(n.id),!0;if(t.closest(`[data-sv-today]`)){let e=Yi();return $i({day:e.dayName,shift:Xi(e)}),z(`sv-day`),!0}let r=t.closest(`[data-sv-pickup]`);if(r)return Wa(r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return Wa(i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=a.dataset.svAbsent,t=na(R())[e]?.ausente;return Wa(e,`ausente`,t?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-order]`);if(o){let e=va(R()),t=e.dogIds,n=t.indexOf(o.dataset.dog),r=o.dataset.svOrder===`up`?n-1:n+1;n>=0&&r>=0&&r<t.length&&([t[n],t[r]]=[t[r],t[n]],ya(e));let i=t.indexOf(o.dataset.dog);return z((o.dataset.svOrder===`up`?i===0:i===t.length-1)?`sv-${o.dataset.svOrder===`up`?`down`:`up`}-${o.dataset.dog}`:o.id),!0}if(t.closest(`[data-sv-route-reset]`))return ya(_a(R())),L(`route`,`Borrador vacío.`,`info`),z(`sv-route-code`),!0;let s=t.closest(`[data-sv-route-edit]`);if(s){let e=ma().find(e=>e.id===s.dataset.svRouteEdit);return e&&(ya({day:e.day,shift:e.shift,route:e.route,walker:e.walker,dogIds:[...e.dogIds],notes:e.notes||``,confirm:!1,reason:e.reason||``,showAll:!1,editingId:e.id}),L(`route`,`Editando ${e.route}. Si sigue con conflicto, vas a tener que confirmarlo de nuevo.`,`info`)),z(`sv-route-code`),!0}let c=t.closest(`[data-sv-route-delete]`);if(c)return Hi=c.dataset.svRouteDelete,z(`sv-route-del-no-${Hi}`),!0;let l=t.closest(`[data-sv-route-delete-ok]`);if(l){let e=l.dataset.svRouteDeleteOk,t=ma().find(t=>t.id===e);ha(ma().filter(t=>t.id!==e));let n=R();return va(n).editingId===e&&ya(_a(n)),Hi=null,L(`route`,`Ruta ${t?.route||``} borrada.`,`info`),z(`sv-route-code`),!0}if(t.closest(`[data-sv-route-delete-cancel]`)){let e=Hi;return Hi=null,z(`sv-route-del-${e}`),!0}let u=t.closest(`[data-sv-obs-copy]`);if(u){let e=wa().find(e=>e.id===u.dataset.svObsCopy);return e&&Ua(Ta(e)).then(e=>{L(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),z(u.id)}),!0}let d=t.closest(`[data-sv-obs-delete]`);if(d)return Ui=d.dataset.svObsDelete,z(`sv-obs-del-no-${Ui}`),!0;let f=t.closest(`[data-sv-obs-delete-ok]`);if(f)return I(P.observations,wa().filter(e=>e.id!==f.dataset.svObsDeleteOk)),Ui=null,L(`observation`,`Observación borrada.`,`info`),z(`sv-obs-save`),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=Ui;return Ui=null,z(`sv-obs-del-${e}`),!0}if(t.closest(`[data-sv-close-copy]`)){let e=R();return Ua(Ea(e,sa(e.day,e.shift)),`sv-close-summary`).then(e=>{L(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),z(`sv-close-copy`)}),!0}if(t.closest(`[data-sv-close-done]`)){let e=R();return aa(e,{...ia(e),cerrado:Ha()}),L(`closure`,`Turno marcado como cerrado. No te olvides de copiar el resumen.`),z(`sv-close-copy`),!0}if(t.closest(`[data-sv-close-reopen]`)){let e=R(),t=ia(e);return delete t.cerrado,aa(e,t),L(`closure`,`Turno reabierto.`,`info`),z(`sv-close-done`),!0}return!1}function Ja(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.matches(`[data-sv-day]`))return $i({...R(),day:t.value}),z(`sv-day`),!0;let n=R();if(t.matches(`[data-sv-route-field]`)){let e=va(n);return e[t.dataset.svRouteField]=t.value,ya(e),t.tagName===`SELECT`&&z(t.id),!0}if(t.matches(`[data-sv-route-all]`)){let e=va(n);return e.showAll=t.checked,ya(e),z(t.id),!0}if(t.matches(`[data-sv-route-dog]`)){let e=va(n),r=t.dataset.svRouteDog;return e.dogIds=t.checked?[...new Set([...e.dogIds,r])]:e.dogIds.filter(e=>e!==r),e.confirm=!1,ya(e),z(t.id),!0}if(t.matches(`[data-sv-route-confirm]`)){let e=va(n);return e.confirm=t.checked,ya(e),!0}if(t.matches(`[data-sv-obs]`)){let e=Ca(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,I(P.observationDraft,e),!0}return t.matches(`[data-sv-close-notes]`)?(aa(n,{...ia(n),notas:t.value}),!0):!1}function Ya(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=R();if(t.matches(`[data-sv-route-field]`)&&t.tagName!==`SELECT`){let e=va(n);e[t.dataset.svRouteField]=t.value,ya(e)}else if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=Ca(n);e[t.dataset.svObs]=t.value,I(P.observationDraft,e)}else if(t.matches(`[data-sv-close-notes]`)){aa(n,{...ia(n),notas:t.value});let e=document.getElementById(`sv-close-summary`);e&&(e.value=Ea(n,sa(n.day,n.shift)))}}function Xa(e){let t=e.target;t.matches?.(`[data-sv-route-form]`)?(e.preventDefault(),Ga()):t.matches?.(`[data-sv-obs-form]`)&&(e.preventDefault(),Ka(t))}function Za(e){let t=e.target;if(!t.matches?.(`[data-sv-fold]`))return;let n=Wi(P.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,I(P.folds,n))}function Qa(){be.push(qa),xe.push(Ja),document.addEventListener(`input`,Ya),document.addEventListener(`submit`,Xa),document.addEventListener(`toggle`,Za,!0)}var B={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,pagos:`paseosJuan_coord_pagos`,borradores:`paseosJuan_coord_borradores`,secciones:`paseosJuan_coord_secciones`};function $a(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function eo(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}var to=null,no=null;function V(e,t,n=`ok`){to={section:e,text:t,tone:n},ro(t)}function ro(e){let t=document.getElementById(`coord-live`);t||(t=document.createElement(`div`),t.id=`coord-live`,t.className=`coord-sr-only`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-live`,`polite`),document.body.appendChild(t)),t.textContent=``,window.setTimeout(()=>{t.textContent=e},40)}function H(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function io(){return new Date(new Date().toLocaleString(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`}))}function ao(e=io()){return`${String(e.getDate()).padStart(2,`0`)}/${String(e.getMonth()+1).padStart(2,`0`)}/${e.getFullYear()}`}function oo(e){return`${e}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}var so={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function co(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>so[e]).join(`, `):`Sin días en rutas`}function lo(e){let t=vo.map(t=>{let n=S.filter(n=>Ut(e,n,t));return n.length?`${t.toLowerCase()}: ${co(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function uo(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function fo(e,t=!1){let n=$a(B.secciones,{});return e in n?!!n[e]:t}function po(e,t){eo(B.secciones,{...$a(B.secciones,{}),[e]:t})}function mo(){return document.documentElement.dataset.motion===`calm`}function ho(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:mo()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}var go=C.filter(e=>e.status===`Activo`),_o=S.filter(e=>e!==`Domingo`),vo=[`Mañana`,`Tarde`];function yo(e){return e.safety.some(e=>/bozal/i.test(e))}function bo(e,t){return Wt(e,t).filter(e=>e.status===`Activo`)}var xo=C.filter(e=>e.review||e.status!==`Activo`);function So(e,t){let n=bo(e,t),r=new Set(n.map(e=>e.name)),i=new Map;return n.forEach(e=>{(e.incompatibleWith||[]).forEach(t=>{if(!r.has(t))return;let n=[e.name,t].sort().join(` y `);i.set(n,n)})}),[...i.keys()]}function Co(){let e=new Map;return _o.forEach(t=>{vo.forEach(n=>{So(t,n).forEach(r=>{e.has(r)||e.set(r,{});let i=e.get(r);i[n]=[...i[n]||[],t]})})}),[...e.entries()].map(([e,t])=>({pair:e,detail:Object.entries(t).map(([e,t])=>`${e.toLowerCase()}: ${co(t).toLowerCase()}`).join(` · `)}))}function wo(){let e=new Set(C.map(e=>e.name)),t=new Set;return C.forEach(n=>(n.incompatibleWith||[]).forEach(n=>!e.has(n)&&t.add(n))),[...t]}function To(){return _o.map(e=>{let t=bo(e,`Mañana`),n=bo(e,`Tarde`),r=new Set([...t,...n].filter(yo).map(e=>e.name));return{day:e,manana:t.length,tarde:n.length,total:t.length+n.length,muzzle:[...r],conflicts:So(e,`Mañana`).length+So(e,`Tarde`).length}})}function Eo(){return $a(B.resueltos,{})}function Do(){let e=Eo();return xo.filter(t=>!e[t.id])}function Oo(){return $a(B.pedidos,[])}function ko(){return $a(B.altas,[])}function Ao(){return $a(B.pagos,[])}function jo(e){return $a(B.borradores,{})[e]||{}}function Mo(e,t){eo(B.borradores,{...$a(B.borradores,{}),[e]:t})}function No(e){let t=$a(B.borradores,{});delete t[e],eo(B.borradores,t)}function Po(e){let t={...jo(e.dataset.coordForm)};return e.querySelectorAll(`[name]`).forEach(n=>{if(n.type!==`file`){if(n.type===`checkbox`){let r=e.querySelectorAll(`[name="${n.name}"]`);t[n.name]=[...r].filter(e=>e.checked).map(e=>e.value)}else t[n.name]=n.value}}),t}function Fo(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${H(r)}" ${i?`placeholder="${H(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function U(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``} ${s?`required`:``}>
        ${r.map(e=>`<option ${e===i?`selected`:``}>${H(e)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function Io(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0}={}){let s=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${s}">${n}</label>
      <textarea id="${s}" name="${t}" rows="3" ${i?`placeholder="${H(i)}"`:``} ${a?`aria-describedby="${s}-hint"`:``}>${H(r)}</textarea>
      ${a?`<small id="${s}-hint">${a}</small>`:``}
    </div>
  `}function Lo(e,t,n,r,i){let a=`coord-${e}-${t}`;return`
    <div class="coord-field">
      <span class="coord-label" id="${a}-label">${n}</span>
      <div class="coord-file">
        <input class="coord-file-input" id="${a}" type="file" accept=".jpg,.jpeg,.png,.pdf" data-coord-file="${e}" data-coord-file-field="${t}" aria-labelledby="${a}-label ${a}-button" aria-describedby="${a}-hint" />
        <label class="coord-btn is-secondary is-compact" for="${a}" id="${a}-button">${p(`fileUp`,`coord-icon`)}<span>${r?`Cambiar archivo`:`Elegir archivo`}</span></label>
        <span class="coord-file-name" data-coord-file-name>${r?H(r):`Ningún archivo elegido`}</span>
      </div>
      <small id="${a}-hint">${i}</small>
    </div>
  `}function Ro(e){if(!to||to.section!==e)return``;let t=to.undo?`<button class="coord-link" type="button" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${to.tone}">${p(to.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${H(to.text)}</span>${t}</p>`}function W(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?p(r,`coord-icon`):``}<span>${e}</span></button>`}function zo({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${fo(e,s)?`open`:``}>
      <summary data-coord-toggle="${e}">
        <span class="coord-section-icon">${p(n,`coord-icon`)}</span>
        <span class="coord-section-title">
          <h2>${r}</h2>
          <small>${i}</small>
        </span>
        <span class="coord-section-badges">${a}</span>
        <span class="coord-chevron">${p(`chevronDown`,`coord-icon`)}</span>
      </summary>
      <div class="coord-section-body">${o}</div>
    </details>
  `}function G(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function Bo(e){return e.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${H(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${p(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${H(e)}</li>`).join(``)}
    </ul>
  `:``}function Vo(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Ho()}
      ${e}
    </div>
  `}function Ho(){return`
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
          ${p(`eye`,`coord-icon`)}<span>Accesibilidad</span>
        </button>
        <button class="coord-btn is-ghost is-compact" type="button" data-coordinator-logout>
          ${p(`logOut`,`coord-icon`)}<span>Salir</span>
        </button>
      </div>
    </header>
  `}function Uo(){let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${Wo()}
      ${Ko()}
      ${Zo()}
      ${$o()}
      ${ts()}
      ${ns()}
      <p class="coord-footnote">
        Datos actualizados al ${Nt}. Fuentes: ${H(b.officialSources.dogs)} y ${H(b.officialSources.routes)}.
        Lo que cargás en esta página queda guardado solo en este dispositivo.
      </p>
    </main>
  `;return to=null,e}function Wo(){let e=io(),t=Gt(e),n=Do(),r=Oo(),i=r.filter(e=>e.estado!==`resuelto`),a=r.filter(e=>e.estado===`nuevo`).length,o=bo(t,`Mañana`),s=bo(t,`Tarde`),c=[...new Set([...o,...s].filter(yo).map(e=>e.name))],l=[...So(t,`Mañana`).map(e=>`${e} (mañana)`),...So(t,`Tarde`).map(e=>`${e} (tarde)`)],u=o.length+s.length===0,d=Ft.coordinador,f;if(n.length){let e=n[0];f={text:`Confirmá el dato de <b>${H(e.name)}</b>: ${H(e.review||`estado "${e.status}"`)}`,action:W(`Ir a ${H(e.name)}`,`data-coord-goto-dog="${e.id}"`,`primary`,`arrowRight`)}}else f=i.length?{text:`Avanzá con el pedido más viejo: <b>${H(i[i.length-1].tipo)}</b>.`,action:W(`Ver pedidos`,`data-coord-open="pedidos"`,`primary`,`arrowRight`)}:{text:`No hay datos ni pedidos pendientes. Revisá la carga de la semana.`,action:W(`Ver carga`,`data-coord-open="carga"`,`primary`,`arrowRight`)};return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${t} ${ao(e)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
        <p class="coord-owner">A cargo: ${H(d)} <span>(${y.toLowerCase()})</span></p>
      </div>

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Datos a confirmar</h2>
            <p class="coord-big"><b>${n.length}</b> <span>de ${xo.length} perros</span></p>
            <p>${n.length?`Diferencias entre planillas o perros sin ruta.`:`Todo confirmado en este dispositivo.`}</p>
          </div>
          ${W(`Ver la lista`,`data-coord-goto="coord-datos"`,`secondary`)}
        </li>
        <li class="coord-priority ${a?`is-warn`:``}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Pedidos abiertos</h2>
            <p class="coord-big"><b>${i.length}</b> <span>${a?`${a} sin empezar`:`pedidos`}</span></p>
            <p>${r.length?`Consultas, evaluaciones y avisos de clientes.`:`Todavía no cargaste pedidos.`}</p>
          </div>
          ${W(r.length?`Ver pedidos`:`Cargar un pedido`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${l.length?`is-alert`:``}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Hoy en la calle</h2>
            ${u?`<p class="coord-big"><b>0</b> <span>perros</span></p><p>No hay rutas cargadas para hoy.</p>`:`<p class="coord-big"><b>${o.length}</b> <span>mañana</span> <b>${s.length}</b> <span>tarde</span></p>
                 ${c.length?`<p class="coord-inline-alert">${p(`alertTriangle`,`coord-icon`)}<span>Con bozal: ${H(uo(c))}</span></p>`:``}
                 ${l.length?`<p class="coord-inline-alert is-strong">${p(`alertTriangle`,`coord-icon`)}<span>No juntar, comparten turno: ${H(uo(l))}</span></p>`:``}`}
          </div>
          ${W(`Ver carga de la semana`,`data-coord-open="carga"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function Go(e,t){return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${H(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?G(`Activo`,`neutral`):G(H(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${H(e.plan)} · ${H(e.size)} · ${H(lo(e))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${H(e.review||`Estado "${e.status}".`)}</p>
      ${Bo(e)}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}Resuelto el ${H(t)}</p>${W(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:W(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function Ko(){let e=Eo(),t=xo.filter(t=>!e[t.id]),n=xo.filter(t=>e[t.id]),r=t.slice(0,4),i=t.slice(4),a=wo();return`
    <section class="coord-block" id="coord-datos" tabindex="-1" aria-labelledby="coord-datos-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-datos-title">Datos a confirmar</h2>
          <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
        </div>
        <div class="coord-progress" aria-label="${n.length} de ${xo.length} resueltos">
          <b>${n.length}/${xo.length}</b><span>resueltos</span>
          <span class="coord-progress-bar" aria-hidden="true"><i style="width:${Math.round(n.length/xo.length*100)}%"></i></span>
        </div>
      </div>
      ${Ro(`datos`)}
      ${t.length?`<ul class="coord-review-list">${r.map(e=>Go(e)).join(``)}</ul>`:`<p class="coord-empty">${p(`checkCircle`,`coord-icon`)}No quedan datos por confirmar en este dispositivo.</p>`}
      ${i.length?`
        <details class="coord-more" ${fo(`datosMas`)?`open`:``}>
          <summary data-coord-toggle="datosMas">Ver los otros ${i.length} pendientes ${p(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${i.map(e=>Go(e)).join(``)}</ul>
        </details>`:``}
      ${n.length?`
        <details class="coord-more" ${fo(`datosResueltos`)?`open`:``}>
          <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${p(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${n.map(t=>Go(t,e[t.id])).join(``)}</ul>
        </details>`:``}
      ${a.length?`<p class="coord-note">${p(`alertCircle`,`coord-icon`)}<span>También a confirmar: ${H(uo(a))} figura en "no juntar con" pero no está en la lista de perros.</span></p>`:``}
      <p class="coord-note">${p(`fileText`,`coord-icon`)}<span>Marcar como resuelto queda solo en este dispositivo. El cambio todavía debe incorporarse al ${H(b.officialSources.dogs.toLowerCase())}.</span></p>
    </section>
  `}var qo=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],Jo=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],Yo=[[`nuevo`,`Nuevo`],[`curso`,`En curso`],[`resuelto`,`Resuelto`]];function Xo(e){let t={nuevo:W(`Empezar`,`data-coord-pedido-move="${e.id}:curso"`,`secondary`)+W(`Resolver`,`data-coord-pedido-move="${e.id}:resuelto"`,`secondary`),curso:W(`Resolver`,`data-coord-pedido-move="${e.id}:resuelto"`,`primary`)+W(`Volver a nuevo`,`data-coord-pedido-move="${e.id}:nuevo"`,`ghost`),resuelto:W(`Reabrir`,`data-coord-pedido-move="${e.id}:curso"`,`secondary`)+W(`Borrar`,`data-coord-pedido-delete="${e.id}"`,`ghost`)}[e.estado],n=e.tipo===`Evaluación inicial`&&e.estado!==`resuelto`;return`
    <li class="coord-card">
      <div class="coord-card-head">
        <strong>${H(e.tipo)}</strong>
        <small>${H(e.fecha)} · ${H(e.canal)}</small>
      </div>
      <p class="coord-card-dog">${p(`pawPrint`,`coord-icon`)}${H(e.perro||`Pendiente de confirmar`)}</p>
      ${e.detalle?`<p>${H(e.detalle)}</p>`:``}
      ${e.supervisor?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}Supervisor avisado</p>`:``}
      <div class="coord-actions">
        ${t}
        ${n&&!e.supervisor?W(`Avisar al supervisor`,`data-coord-pedido-supervisor="${e.id}"`,`ghost`,`send`):``}
      </div>
    </li>
  `}function Zo(){let e=Oo(),t=jo(`pedido`),n=e.filter(e=>e.estado!==`resuelto`).length,r=C.map(e=>e.name),i=`
    ${Ro(`pedidos`)}
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido</h3>
      <div class="coord-grid">
        ${U(`pedido`,`tipo`,`Tipo de pedido`,qo,{value:t.tipo})}
        ${Fo(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre del perro o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${U(`pedido`,`canal`,`Llegó por`,Jo,{value:t.canal})}
        ${Io(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${r.map(e=>`<option value="${H(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${W(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>

    <div class="coord-board">
      ${Yo.map(([t,n])=>{let r=e.filter(e=>e.estado===t);return`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(Xo).join(``)}</ul>`:`<p class="coord-empty is-small">${t===`nuevo`?`Sin pedidos nuevos.`:t===`curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>
  `;return zo({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Consultas de clientes, evaluaciones iniciales y avisos.`,badges:n?G(`${n} abiertos`,`warn`):G(`Sin pedidos abiertos`,`neutral`),body:i})}var Qo=[`Pendiente de confirmar`,`Sí`,`No`];function $o(){let e=jo(`alta`),t=ko(),n=Array.isArray(e.dias)?e.dias:[],r=[`Pendiente de confirmar`,...It.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${p(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${Ro(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${Fo(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${U(`alta`,`tamano`,`Tamaño`,[`Pendiente de confirmar`,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${Fo(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${Fo(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${U(`alta`,`sexo`,`Sexo`,[`Pendiente de confirmar`,`Macho`,`Hembra`],{value:e.sexo})}
          ${U(`alta`,`castrado`,`Castrado o castrada`,Qo,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Se guarda solo en este dispositivo.</p>
        <div class="coord-grid">
          ${Fo(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${Fo(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${Fo(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${U(`alta`,`zona`,`Zona`,[`Pendiente de confirmar`,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${U(`alta`,`vacunas`,`Vacunas al día`,Qo,{value:e.vacunas})}
          ${Lo(`alta`,`carnet`,`Carnet de vacunas`,e.carnet,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
          ${Fo(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${Io(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${U(`alta`,`sujecion`,`Collar o pechera`,[`Pendiente de confirmar`,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${U(`alta`,`bozal`,`Usa bozal`,Qo,{value:e.bozal})}
          ${U(`alta`,`correa`,`Tiene correa propia`,Qo,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${Io(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,placeholder:`Ej.: se acerca con la cola baja y se aleja si el otro ladra`,span:!1})}
          ${Io(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${Io(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${Fo(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${U(`alta`,`plan`,`Plan pedido`,r,{value:e.plan,hint:`Precios oficiales en la tabla de planes.`})}
          ${U(`alta`,`turno`,`Turno`,[`Pendiente de confirmar`,`Mañana`,`Tarde`],{value:e.turno})}
          <div class="coord-field is-wide">
            <span class="coord-label" id="coord-alta-dias-label">Días pedidos</span>
            <div class="coord-days" role="group" aria-labelledby="coord-alta-dias-label">
              ${_o.map(e=>`
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
      <h3>Altas cargadas en este dispositivo <span>${t.length}</span></h3>
      ${t.length?`
        <ul class="coord-card-list is-grid">
          ${t.map(e=>`
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${H(e.nombre)}</strong>
                <small>Alta ${H(e.fecha)}</small>
              </div>
              <p class="coord-badges">${G(`SIN EVALUAR`,`neutral`)} ${G(`Primer paseo individual`,`warn`)}</p>
              <p>${H(e.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:e.tamano)} · Plan: ${H(e.plan===`Pendiente de confirmar`?`pendiente`:e.plan)} · Días: ${e.dias?.length?H(co(e.dias).toLowerCase()):`pendientes`} · Turno: ${H(e.turno===`Pendiente de confirmar`?`pendiente`:e.turno.toLowerCase())}</p>
              ${e.bozal===`Sí`||e.noJuntar?`<ul class="coord-safety">
                ${e.bozal===`Sí`?`<li class="is-alert">${p(`alertTriangle`,`coord-icon`)}Usa bozal</li>`:``}
                ${e.noJuntar?`<li class="is-alert">${p(`alertTriangle`,`coord-icon`)}No juntar con ${H(e.noJuntar)}</li>`:``}
              </ul>`:``}
              ${e.supervisor?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}Supervisor avisado para el primer paseo</p>`:``}
              <div class="coord-actions">
                ${e.supervisor?``:W(`Avisar al supervisor`,`data-coord-alta-supervisor="${e.id}"`,`secondary`,`send`)}
                ${W(`Copiar ficha`,`data-coord-alta-copy="${e.id}"`,`ghost`,`copy`)}
                ${W(`Borrar`,`data-coord-alta-delete="${e.id}"`,`ghost`)}
              </div>
            </li>
          `).join(``)}
        </ul>
        <p class="coord-note">${p(`fileText`,`coord-icon`)}<span>Estas fichas todavía deben incorporarse al ${H(b.officialSources.dogs.toLowerCase())}.</span></p>
      `:`<p class="coord-empty is-small">Todavía no cargaste perros nuevos.</p>`}
    </div>
  `;return zo({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?G(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function es(e){return[`Ficha de alta: ${e.nombre} (cargada el ${e.fecha})`,`Categoría: SIN EVALUAR. Primer paseo: individual.`,`Identificación: ${e.tamano}; raza o cruza: ${e.raza||`Pendiente de confirmar`}; edad: ${e.edad||`Pendiente de confirmar`}; sexo: ${e.sexo}; castrado/a: ${e.castrado}.`,`Tutor: ${e.tutor||`Pendiente de confirmar`}; contacto: ${e.contacto||`Pendiente de confirmar`}; emergencia: ${e.emergencia||`Pendiente de confirmar`}; zona: ${e.zona}.`,`Salud: vacunas al día: ${e.vacunas}; carnet: ${e.carnet||`Pendiente de confirmar`}; veterinaria: ${e.veterinario||`Pendiente de confirmar`}; observaciones: ${e.salud||`Pendiente de confirmar`}.`,`Equipo: ${e.sujecion}; bozal: ${e.bozal}; correa propia: ${e.correa}.`,`Con otros perros: ${e.conPerros||`Pendiente de confirmar`}. Con personas: ${e.conPersonas||`Pendiente de confirmar`}. Lo alteran: ${e.estimulos||`Pendiente de confirmar`}. No juntar con: ${e.noJuntar||`Sin indicación`}.`,`Servicio: ${e.plan}; días: ${e.dias?.length?e.dias.join(`, `):y}; turno: ${e.turno}.`].join(`
`)}function ts(){let e=To(),t=Gt(io()),n=Math.max(...e.map(e=>e.total),1),r=e.filter(e=>e.total===n).map(e=>e.day),i=Co(),a=go.filter(e=>_o.some(t=>vo.every(n=>Ut(e,t,n)))).map(e=>e.name),o=C.filter(e=>e.status!==`Activo`).map(e=>`${e.name} (${e.status.toLowerCase()})`),s=`
    ${i.length?`
      <div class="coord-alert-box" role="note">
        <h3>${p(`alertTriangle`,`coord-icon`)}Perros que no se pueden juntar y comparten turno</h3>
        <ul>${i.map(e=>`<li><b>${H(e.pair)}</b> · ${H(e.detail)}</li>`).join(``)}</ul>
        <p>Según ${H(b.officialSources.routes)}. Revisá que no vayan en el mismo grupo.</p>
      </div>`:``}
    <div class="coord-table-wrap">
      <table class="coord-table">
        <caption>Perros activos por día y turno (rutas del ${Nt}). Día con más carga: ${H(uo(r.map(e=>e.toLowerCase())))}, ${n} paseos.</caption>
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
              <td><span class="coord-cell-alerts">${e.muzzle.length}${e.conflicts?`<span class="coord-tag is-alert">${p(`alertTriangle`,`coord-icon`)}${e.conflicts}<span class="coord-sr-only"> ${e.conflicts===1?`cruce`:`cruces`} a revisar</span></span>`:``}</span></td>
            </tr>
          `).join(``)}
        </tbody>
      </table>
    </div>
    <ul class="coord-notes">
      <li>Bozal: perros con bozal ese día. El ícono de alerta marca cuántos cruces de "no juntar" hay ese día.</li>
      <li>Domingo: sin rutas cargadas.</li>
      ${a.length?`<li>${H(uo(a))} ${a.length===1?`sale`:`salen`} en los dos turnos el mismo día y cuenta${a.length===1?``:`n`} en ambos.</li>`:``}
      ${o.length?`<li>No se cuentan: ${H(uo(o))}.</li>`:``}
    </ul>
  `;return zo({key:`carga`,id:`coord-carga`,iconName:`chart`,title:`Carga por día y turno`,intro:`Calculada con las rutas reales. Incluye bozales y cruces a revisar.`,badges:i.length?G(`${i.length} ${i.length===1?`cruce`:`cruces`} a revisar`,`alert`):``,body:s})}function ns(){let e=Ao(),t=jo(`pago`),n=e.filter(e=>!e.enLibro).length,r=[`Elegí un perro`,...go.map(e=>e.name).sort((e,t)=>e.localeCompare(t,`es`)),`Otro (anotalo en la nota)`],i=`
    <div class="coord-rule is-info" role="note">
      ${p(`fileText`,`coord-icon`)}
      <p><b>Fuente oficial:</b> el ${H(b.officialSources.money)} y la hoja Cobranza semanal. Acá no hay montos ni alias: esto es solo un registro de apoyo para no olvidarte de pasar un pago. El alias y el detalle de pago se envían por WhatsApp.</p>
    </div>
    ${Ro(`pagos`)}
    <form class="coord-form" data-coord-form="pago" novalidate>
      <h3>Anotar un pago recibido</h3>
      <div class="coord-grid">
        ${U(`pago`,`perro`,`Perro`,r,{value:t.perro,required:!0})}
        ${Fo(`pago`,`monto`,`Monto recibido`,{value:t.monto,required:!0,attrs:`inputmode="numeric" autocomplete="off"`,hint:`El que figura en el comprobante. Solo números.`})}
        ${U(`pago`,`medio`,`Medio de pago`,[`Transferencia`,`Efectivo`,`Otro`],{value:t.medio})}
        ${Fo(`pago`,`fecha`,`Fecha del pago`,{value:t.fecha||ao(),placeholder:`DD/MM/AAAA`,attrs:`inputmode="numeric"`})}
        ${Lo(`pago`,`comprobante`,`Comprobante`,t.comprobante,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
        ${Fo(`pago`,`nota`,`Nota`,{value:t.nota,placeholder:`Opcional`})}
      </div>
      <div class="coord-actions">${W(`Guardar registro`,`data-coord-pago-save`,`primary`,`plus`)}</div>
    </form>

    <div class="coord-subblock">
      <h3>Registros en este dispositivo <span>${e.length}</span></h3>
      ${e.length?`
        <ul class="coord-pay-list">
          ${e.map(e=>`
            <li class="coord-pay ${e.enLibro?`is-done`:``}">
              <div class="coord-pay-main">
                <strong>${H(e.perro)}</strong>
                <span>${H(e.montoTexto)} · ${H(e.medio)} · ${H(e.fecha)}</span>
                ${e.comprobante?`<small>Comprobante: ${H(e.comprobante)}</small>`:`<small>Sin comprobante</small>`}
                ${e.nota?`<small>${H(e.nota)}</small>`:``}
              </div>
              ${e.enLibro?G(`Pasado al Libro contable`,`ok`):G(`Falta pasar al Libro contable`,`warn`)}
              <div class="coord-actions">
                ${W(e.enLibro?`Marcar como no pasado`:`Ya lo pasé al Libro`,`data-coord-pago-libro="${e.id}"`,e.enLibro?`ghost`:`secondary`,e.enLibro?``:`checkCircle`)}
                ${W(`Borrar`,`data-coord-pago-delete="${e.id}"`,`ghost`)}
              </div>
            </li>
          `).join(``)}
        </ul>
      `:`<p class="coord-empty is-small">No hay pagos anotados en este dispositivo.</p>`}
    </div>
  `;return zo({key:`pagos`,id:`coord-pagos`,iconName:`wallet`,title:`Pagos`,intro:`Registro de apoyo. La fuente oficial es el Libro contable.`,badges:n?G(`${n} sin pasar al Libro`,`warn`):``,body:i})}function rs(e,t,n){po(e,!0),$(),ho(t,n)}function is(e,t){eo(e,t)}function as(e,t,n,r){let i=$a(e,[]),a=i.findIndex(e=>e.id===t);a<0||(no={key:e,item:i[a],index:a,section:n},i.splice(a,1),is(e,i),V(n,r),to.undo=!0)}function os(e,t,n){let r=u();r.alerts=[{id:`alert-${Date.now()}`,dog:e,type:t,level:`Medio`,description:n},...r.alerts||[]],d(r)}function ss(e){try{(navigator.clipboard?.writeText(e))?.catch?.(()=>{})}catch{}}function cs(e){if(!e.target.closest(`.coord-shell`))return!1;if(e.target.closest(`[data-coordinator-logout]`))return Zc(`/login`),!0;let t=e.target.closest(`[data-coord-toggle]`);if(t){let e=t.parentElement;return po(t.dataset.coordToggle,!e.open),!0}let n=e.target.closest(`[data-coord-goto]`);if(n)return ho(n.dataset.coordGoto),!0;let r=e.target.closest(`[data-coord-goto-dog]`);if(r){let e=r.dataset.coordGotoDog;return Do().findIndex(t=>t.id===e)>=4&&(po(`datosMas`,!0),$()),ho(`coord-dato-${e}`),!0}let i=e.target.closest(`[data-coord-open]`);if(i){let e=i.dataset.coordOpen,t=e===`pedidos`&&!Oo().length?`#coord-pedido-tipo`:null;return rs(e,`coord-${e}`,t),!0}if(e.target.closest(`[data-coord-undo]`)){if(no){let e=$a(no.key,[]);e.splice(no.index,0,no.item),is(no.key,e),V(no.section,`Listo, se recuperó.`),no=null}return $(),!0}let a=e.target.closest(`[data-coord-resolve]`);if(a){let e=a.dataset.coordResolve,t=C.find(t=>t.id===e);return eo(B.resueltos,{...Eo(),[e]:ao()}),V(`datos`,`${t?.name||e}: marcado como resuelto.`),to.undo=!1,no=null,$(),ho(`coord-datos`),!0}let o=e.target.closest(`[data-coord-unresolve]`);if(o){let e=o.dataset.coordUnresolve,t=Eo();return delete t[e],eo(B.resueltos,t),V(`datos`,`${C.find(t=>t.id===e)?.name||e}: volvió a pendientes.`),$(),!0}if(e.target.closest(`[data-coord-pedido-save]`)){let t=Po(e.target.closest(`[data-coord-form]`));if(!t.perro?.trim()&&!t.detalle?.trim())return Mo(`pedido`,t),V(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),ho(`coord-pedidos`,`#coord-pedido-perro`),!0;let n={id:oo(`pedido`),tipo:t.tipo||qo[0],perro:t.perro?.trim()||``,canal:t.canal||Jo[0],detalle:t.detalle?.trim()||``,estado:`nuevo`,fecha:ao()};return is(B.pedidos,[n,...Oo()]),No(`pedido`),V(`pedidos`,`Pedido guardado en "Nuevo".`),$(),!0}let s=e.target.closest(`[data-coord-pedido-move]`);if(s){let[e,t]=s.dataset.coordPedidoMove.split(`:`);return is(B.pedidos,Oo().map(n=>n.id===e?{...n,estado:t}:n)),V(`pedidos`,`Pedido movido a "${{nuevo:`Nuevo`,curso:`En curso`,resuelto:`Resuelto`}[t]}".`),$(),!0}let c=e.target.closest(`[data-coord-pedido-delete]`);if(c)return as(B.pedidos,c.dataset.coordPedidoDelete,`pedidos`,`Pedido borrado.`),$(),!0;let l=e.target.closest(`[data-coord-pedido-supervisor]`);if(l){let e=l.dataset.coordPedidoSupervisor,t=Oo().find(t=>t.id===e);return t&&(is(B.pedidos,Oo().map(t=>t.id===e?{...t,supervisor:!0,estado:t.estado===`nuevo`?`curso`:t.estado}:t)),V(`pedidos`,`Supervisor avisado. El pedido pasó a «En curso».`),os(t.perro||`Perro nuevo`,`Evaluación inicial`,`Pedido de evaluación derivado por coordinación. Primer paseo individual.`)),!0}if(e.target.closest(`[data-coord-alta-save]`)){let t=Po(e.target.closest(`[data-coord-form]`));if(!t.nombre?.trim())return Mo(`alta`,t),V(`alta`,`Falta el nombre del perro.`,`error`),$(),ho(`coord-alta`,`#coord-alta-nombre`),!0;let n={...t,id:oo(`alta`),nombre:t.nombre.trim(),dias:Array.isArray(t.dias)?t.dias:[],categoria:`SIN EVALUAR`,primerPaseo:`Individual`,fecha:ao()};return is(B.altas,[n,...ko()]),No(`alta`),V(`alta`,`Ficha de ${n.nombre} guardada en este dispositivo. Arranca SIN EVALUAR y con primer paseo individual.`),$(),ho(`coord-alta`),!0}if(e.target.closest(`[data-coord-alta-clear]`))return No(`alta`),V(`alta`,`Formulario vacío.`),$(),!0;let u=e.target.closest(`[data-coord-alta-supervisor]`);if(u){let e=u.dataset.coordAltaSupervisor,t=ko().find(t=>t.id===e);return t&&(is(B.altas,ko().map(t=>t.id===e?{...t,supervisor:!0}:t)),V(`alta`,`Supervisor avisado: ${t.nombre} necesita su primer paseo individual.`),os(t.nombre,`Perro nuevo`,`Alta nueva: SIN EVALUAR. Coordinar primer paseo individual.`)),!0}let d=e.target.closest(`[data-coord-alta-copy]`);if(d){let e=ko().find(e=>e.id===d.dataset.coordAltaCopy);return e&&ss(es(e)),V(`alta`,`Ficha copiada. Pegala en el registro maestro.`),$(),!0}let f=e.target.closest(`[data-coord-alta-delete]`);if(f)return as(B.altas,f.dataset.coordAltaDelete,`alta`,`Ficha borrada de este dispositivo.`),$(),!0;if(e.target.closest(`[data-coord-pago-save]`)){let t=Po(e.target.closest(`[data-coord-form]`)),n=String(t.monto||``).replace(/[^\d]/g,``);if(!t.perro||t.perro===`Elegí un perro`||!n)return Mo(`pago`,t),V(`pagos`,n?`Elegí el perro.`:`Falta el monto del comprobante.`,`error`),$(),ho(`coord-pagos`,n?`#coord-pago-perro`:`#coord-pago-monto`),!0;let r={id:oo(`pago`),perro:t.perro,montoTexto:Kt(Number(n)),medio:t.medio||`Transferencia`,fecha:t.fecha?.trim()||ao(),comprobante:t.comprobante||``,nota:t.nota?.trim()||``,enLibro:!1};return is(B.pagos,[r,...Ao()]),No(`pago`),V(`pagos`,`Pago de ${r.perro} anotado. Acordate de pasarlo al Libro contable.`),$(),!0}let ee=e.target.closest(`[data-coord-pago-libro]`);if(ee){let e=ee.dataset.coordPagoLibro,t=!1;return is(B.pagos,Ao().map(n=>n.id===e?(t=!n.enLibro,{...n,enLibro:t}):n)),V(`pagos`,t?`Marcado como pasado al Libro contable.`:`Marcado como pendiente de pasar al Libro.`),$(),!0}let te=e.target.closest(`[data-coord-pago-delete]`);return te?(as(B.pagos,te.dataset.coordPagoDelete,`pagos`,`Registro borrado.`),$(),!0):!1}function ls(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;let n=t.closest(`[data-coord-file]`);if(n){let e=n.dataset.coordFile,t=n.files?.[0],r=n.closest(`[data-coord-form]`),i=r?Po(r):jo(e);t&&(i[n.dataset.coordFileField]=t.name),Mo(e,i);let a=n.parentElement.querySelector(`[data-coord-file-name]`);return a&&t&&(a.textContent=t.name),!0}let r=t.closest(`[data-coord-form]`);return r?(Mo(r.dataset.coordForm,Po(r)),!0):!1}function us(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`.coord-btn.is-primary`)?.click())}function ds(){be.push(cs),xe.push(ls),document.addEventListener(`submit`,us)}var fs=`paseosJuanAdmin_prioridadesHechas`,ps=`paseosJuanAdmin_seccionesAbiertas`,ms=`America/Argentina/Buenos_Aires`,hs=[`Pequeño`,`Mediano`,`Grande`],gs=x.manana.label,_s=x.tarde.label,vs=[`paseos`,`incidentes`,`checklists`,`pedidos`],ys=``,K={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,msgs:{users:null,live:null}},q={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{}};function J(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Y(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function X(e,t,n){return`${e} ${e===1?t:n}`}var bs={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function xs(e){let t=S.filter(t=>e.includes(t)),n=t.map(e=>S.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${bs[t[0]]} a ${bs[t[t.length-1]]}`:t.map(e=>bs[e]).join(`, `)}function Ss(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:ms,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:S.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function Cs(){return ce(fs)}function ws(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ts(){return new Set(ce(ps))}function Es(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:ms,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function Ds(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:ms,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function Os(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function ks(){return g.user()||{usuario:``,nombre:``,rol:`admin`}}function As(e){return String(e||``).trim().split(/\s+/)[0]||``}function js(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function Ms(e,t){return e===`pedidos`?{}:{desde:t}}function Ns(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function Ps(e){return e.hora||Es(e.creadoEn)}function Fs(){let e=ft(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=_.cached(`paseos`,Ms(`paseos`,e)).filter(t);return{hoy:e,paseos:r,incidentes:_.cached(`incidentes`,Ms(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),checklists:_.cached(`checklists`,Ms(`checklists`,e)).filter(t).sort(n),pedidosNuevos:_.cached(`pedidos`,Ms(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),shifts:[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>Ns(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}})}}function Is(){let e=ft();K.liveDay!==e&&(K.liveDay=e,Ls(!1).finally(()=>{vs.forEach(t=>_.watch(t,Ms(t,e)))}))}async function Ls(e){let t=ft(),n=await Promise.allSettled(vs.map(e=>_.list(e,Ms(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=K.liveError;K.liveError=r.join(` `),K.liveError?Z(`live`,`No se pudieron actualizar los datos del día: ${K.liveError}`,!0):e?Z(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Z(`live`,`Datos del día actualizados.`),(e||i!==K.liveError)&&Q()}var Rs={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,marketing:`Marketing`},zs={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},Bs={admin:`ve y carga todo, y crea usuarios.`,coordinador:`ve paseos, incidentes, rutas y cierres; carga pedidos, fichas, observaciones y pagos de apoyo. No ve checklists.`,supervisor:`ve y carga paseos, checklists, incidentes, observaciones, rutas y cierres; ve fichas. No ve pedidos ni pagos.`,paseador:`ve y carga paseos, checklists, incidentes y observaciones; ve las rutas. No ve pedidos, fichas ni pagos.`,marketing:`ve y carga pedidos (incluye los del formulario web). Nada de la operación.`};function Vs(e){let t=(nt[e]||[]).filter(e=>zs[e]).map(e=>zs[e]);return`${t.length?`Paneles: ${Y(t)}.`:`Todavía no tiene panel.`} Datos: ${Bs[e]||`Pendiente de confirmar`}`}function Hs(){return K.usersLoading=!0,it.list().then(e=>{K.users=e,K.usersError=``}).catch(e=>{K.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,K.usersError,!0)}).finally(()=>{K.usersLoading=!1,Q()})}function Us(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function Ws(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function Gs(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!Ws(e))return e}}function Ks(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){K.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function qs(e){let t=K.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?J(t.text):``}</p>`}function Js(){Object.entries(K.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function Q(){if(!js()||g.user()?.rol!==`admin`)return;let e=document.activeElement,t=e?.id,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.getElementById(t);if(r&&(r.focus({preventScroll:!0}),n))try{r.setSelectionRange(...n)}catch{}}function Ys(){return C.filter(e=>e.status===`Activo`&&e.days.length>0)}function Xs(){let e=Ys(),t=S.map(t=>{let n=e.filter(e=>Ut(e,t,gs)).length,r=e.filter(e=>Ut(e,t,_s)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function Zs(){let e=Ys(),t=new Map(C.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return C.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[gs,_s].forEach(e=>{let t=S.filter(t=>Ut(o,t,e)&&Ut(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Qs(){return Ys().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function $s(){return C.filter(e=>e.review||e.status!==`Activo`)}function ec(e){return e===gs?x.manana.route:x.tarde.routes.join(` o `)}function tc(e=Fs()){let{conflicts:t}=Zs(),n=C.filter(e=>e.status!==`Activo`),r=$s(),i=Qs().filter(e=>e.category===`SIN EVALUAR`),a=Ys(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${Y(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${Ps(n)?` a las ${Ps(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${Y(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(ec).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${Y(r)}. Hay ${X(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${Y(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(e.pedidosNuevos.length){let t=e.pedidosNuevos.length,n=e=>e.titulo||e.tipo||`Pedido sin título`,r=e.pedidosNuevos.slice(0,3).map(n),i=n(e.pedidosNuevos[t-1]);s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}`,tag:`Pedidos`,tone:`info`,title:`${X(t,`pedido nuevo`,`pedidos nuevos`)} sin responder`,detail:`${Y(r)}${t>3?` y ${X(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.`,action:t===1?`Respondé el pedido “${i}”.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${i}”.`,target:`adm-vivo`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${X(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${Y(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${Y(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${Y(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${Y(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function nc(){let e=Ys(),t=[],n=[];e.forEach(e=>{let r=It.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=It.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function rc(e){return`
    <div class="adm-shell">
      ${ic()}
      ${e}
    </div>
  `}function ic(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${p(`lock`,`adm-icon-sm`)} ${J(ks().nombre)} · ${J(Rs[ks().rol]||ks().rol)}</span>
        <button class="adm-button adm-button--ghost" type="button" data-adm-a11y>
          ${p(`eye`,`adm-icon-sm`)}
          <span>Accesibilidad</span>
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-admin-logout>
          ${p(`logOut`,`adm-icon-sm`)}
          <span>Salir</span>
        </button>
      </div>
    </header>
  `}function ac(){Is(),K.users===null&&!K.usersLoading&&!K.usersError&&Hs();let e=Fs(),t=tc(e),n=Cs(),r=Ts();return setTimeout(Js,60),`
    <main class="adm-page" id="adm-main">
      ${oc(t,n,e)}
      ${mc(e)}
      ${Sc()}
      ${xc()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${p(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${p(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${wc(r)}
        ${Tc(r)}
        ${Dc(r)}
        ${Ac(r)}
        ${jc(r)}
        ${Mc(r)}
      </div>
      ${Nc()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function oc(e,t,n){let{dayName:r,date:i}=Ss(),a=Ys(),o=a.filter(e=>Ut(e,r,gs)).length,s=a.filter(e=>Ut(e,r,_s)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${X(o,`perro`,`perros`)} a la mañana y ${X(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=As(ks().nombre);return`
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${J(r)} ${J(i)}</p>
        <h1 id="adm-hero-title">Hola${u?`, ${J(u)}`:``}</h1>
        <p class="adm-hero-sub">${l}</p>
        ${n.incidentes.length?`
          <p class="adm-hero-alert">${p(`alertTriangle`,`adm-icon-sm`)} ${X(n.incidentes.length,`incidente cargado hoy`,`incidentes cargados hoy`)}. Está primero en tus prioridades.</p>
        `:``}
      </div>

      ${c?`
        <div class="adm-next" aria-labelledby="adm-next-title">
          <p class="adm-next-label" id="adm-next-title">${p(`arrowRight`,`adm-icon-sm`)} Próximo paso</p>
          <p class="adm-next-text">${J(c.action)}</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-done="${c.id}">
              ${p(`checkCircle`,`adm-icon-sm`)} Listo, ya lo hice
            </button>
            <button class="adm-button adm-button--ghost" type="button" data-adm-goto="${c.target}">
              ${J(c.targetLabel)}
            </button>
          </div>
        </div>
      `:`
        <div class="adm-next adm-next--done">
          <p class="adm-next-label">${p(`checkCircle`,`adm-icon-sm`)} Próximo paso</p>
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
  `}var sc={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function cc(e){let{dayName:t}=Ss();return Ys().filter(n=>Ut(n,t,e)).length}function lc(e){return K.users?.find(t=>t.usuario===e)?.nombre||e||``}function uc(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=Es(e.actualizadoEn);return`Actualizado por ${lc(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||lc(e.creadoPor),r=Es(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function dc(e){let t={manana:{title:`Turno mañana`,hours:`${x.manana.from} a ${x.manana.to}`,planned:cc(gs)},tarde:{title:`Turno tarde`,hours:`${x.tarde.from} a ${x.tarde.to}`,planned:cc(_s)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
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
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=sc[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${J(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${J(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${J(uc(e))}${e.nota?` · Nota: ${J(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function fc(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${p(`alertTriangle`,`adm-icon-sm`)} ${X(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${J(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${Ps(e)?`<span class="adm-muted">${J(Ps(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${J(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${J(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${uc(e,!0)?`<p class="adm-note">${J(uc(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function pc(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}function mc(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${p(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${J(Os(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó.</p>`:``}
      ${qs(`live`)}

      ${e.incidentes.length?fc(e.incidentes):`
        <p class="adm-live-ok">${p(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      <div class="adm-live-grid">
        ${e.shifts.map(dc).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=pc(e);return`
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
                  <span class="adm-dog-meta">${J(Os(e.fecha)||Ds(e.creadoEn))} · ${e.origen===`web`?`Formulario web`:J(e.creadoPorNombre||`Cargado en la app`)}</span>
                </li>
              `).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${X(r.length-6,`pedido más`,`pedidos más`)}.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos.</p>`}
        </article>
      </div>
    </section>
  `}function hc(e){return Object.entries(Rs).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function gc(){let e=K.credential;if(!e)return``;let t=Ks(e);return`
    <div class="adm-cred" id="adm-cred" tabindex="-1" role="region" aria-labelledby="adm-cred-title">
      <p class="adm-tag adm-tag--warning">Solo se muestra ahora</p>
      <h3 id="adm-cred-title">${e.tipo===`alta`?`Usuario creado: ${J(e.nombre)}`:`PIN nuevo de ${J(e.nombre)}`}</h3>
      <p>Copiá este mensaje y mandáselo por WhatsApp:</p>
      <p class="adm-cred-text">${J(t)}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="button" data-adm-cred-copy>${p(`copy`,`adm-icon-sm`)} Copiar mensaje</button>
        <a class="adm-button adm-button--ghost" href="https://wa.me/?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${p(`message`,`adm-icon-sm`)} Abrir WhatsApp</a>
        <button class="adm-button adm-button--ghost" type="button" data-adm-cred-hide>Listo, ya lo mandé</button>
      </div>
      <p class="adm-note">Este PIN no queda guardado en la página: cuando tocás “Listo” desaparece. Si se pierde, resetealo.</p>
    </div>
  `}function _c(){let e=q.crear;return`
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${J(Y(Pt.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>
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
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${hc(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${J(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${J(Rs[e.rol]||e.rol)}:</strong> ${J(Vs(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${p(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function vc(e){let t=!e.activo;return`
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
  `}function yc(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${J(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${J(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function bc(e,t){let n=e.usuario===t,r=q.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${Ds(e.ultimoIngreso)} ${Es(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${Ds(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
    <li class="adm-user-row ${e.activo?``:`is-off`}">
      <div class="adm-user-head">
        <strong>${J(e.nombre)}</strong>
        <span class="adm-muted">usuario: ${J(e.usuario)}</span>
        <span class="adm-pill adm-pill--neutral">${J(Rs[e.rol]||e.rol)}</span>
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
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${J(e.usuario)}">${hc(r)}</select>
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
      ${!n&&K.resetFor===e.usuario?vc(e):``}
      ${!n&&K.confirmOff===e.usuario?yc(e):``}
    </li>
  `}function xc(){let e=ks().usuario,t=(K.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=K.users===null&&K.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:K.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>bc(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${p(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${K.users?`${X(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${gc()}

      <div class="adm-form-actions">
        <button class="adm-button ${K.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${K.showCreate}" aria-controls="adm-create">
          ${p(K.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${K.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${K.showCreate?_c():``}
      ${qs(`users`)}
      ${r}

      <h3 class="adm-subtitle">Qué puede ver cada rol</h3>
      <ul class="adm-role-help">
        ${Object.keys(Rs).map(e=>`<li><strong>${Rs[e]}:</strong> ${J(Vs(e))}</li>`).join(``)}
      </ul>
    </section>
  `}function Sc(){let{conflicts:e,missing:t,notRouted:n}=Zs(),r=Qs();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${p(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${Nt}).</p>
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
                  <td>${J(e.shift)} · ${J(ec(e.shift))}</td>
                  <td>${J(xs(e.days))}</td>
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
            <span class="adm-safety-meta">${J(e.shifts.join(` y `))} · ${J(xs(e.days))}</span>
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
  `}function Cc(e,t,{title:n,summary:r,iconName:i},a){return`
    <details class="adm-section" id="${e}" data-adm-section="${e}" ${t.has(e)?`open`:``}>
      <summary>
        <span class="adm-section-icon">${p(i,`adm-icon`)}</span>
        <span class="adm-section-title">
          <span class="adm-section-name">${n}</span>
          <span class="adm-section-summary">${r}</span>
        </span>
        <span class="adm-chevron">${p(`chevronDown`,`adm-icon-sm`)}</span>
      </summary>
      <div class="adm-section-body">
        ${a}
      </div>
    </details>
  `}function wc(e){let t=$s().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return Cc(`adm-datos`,e,{title:`Datos a revisar`,summary:`${X(t.length,`perro`,`perros`)} · ${X(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
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
  `)}function Tc(e){let t=Xs();return Cc(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${J(t.busiest.length?Y(t.busiest):`Sin datos`)} (${X(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${Nt}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
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
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${bs[e.day]}</span>
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
      <li>Referencia: el máximo diario histórico fue de ${J(Vt.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function Ec(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function Dc(e){let t=Ys(),n=Xs(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${Nt}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${Nt}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...Vt,...i];return Cc(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${Ec(e.kind)}">${J(e.kind)}</span>
          <strong class="adm-fact-value">${J(e.value)}</strong>
          <span class="adm-fact-label">${J(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${J(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner">
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(zt).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${J(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var Oc={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},kc=[{role:`Admin`,who:Ft.admin,can:[`Ve y decide sobre todo el sistema`,`Equipo, permisos, precios y reportes`]},{role:`Coordinador`,who:`${Ft.coordinador} (${y.toLowerCase()})`,can:[`Alta de perros`,`Editar datos del cliente`,`Responder el chat de clientes`,`Registrar pagos de apoyo`,`Revisar documentación`,`Derivar al supervisor`]},{role:`Supervisor`,who:Ft.supervisor,can:[`Armar rutas y asignar perros`,`Responder el chat de clientes`,`Gestionar ausencias`,`Controlar a los paseadores`,`Revisar alertas`]},{role:`Paseador`,who:Ft.paseador,can:[`Ver su ruta`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`,`Subir fotos`,`Leer el chat interno`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function Ac(e){return Cc(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${X(Pt.length,`persona`,`personas`)} · ${kc.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${Pt.map(e=>{let t=Oc[e.role];return`
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
      ${kc.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${J(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${J(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function jc(e){return Cc(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${It.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${hs.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${It.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${hs.map(t=>`<td>${Kt(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${hs.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${hs.map(e=>`<td>${Kt(Lt[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${hs.map(e=>`<td>${Kt(Lt[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Rt.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${y.toLowerCase()}.</p>
  `)}function Mc(e){let t=nc();return Cc(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${p(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${J(b.officialSources.money)}. Esta página no muestra montos reales.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${Kt(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${X(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${Kt(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${Kt(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${X(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${y.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${J(e)}: ${Y(t.excluded.filter(t=>t.plan===e).map(e=>J(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function Nc(){let e=b.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${Nt}.</strong> Perros: ${J(e.dogs)}. Rutas: ${J(e.routes)}. Plata: ${J(e.money)}.</p>
      <p>Esta página no guarda datos de tutores, teléfonos, domicilios ni pagos.</p>
    </footer>
  `}function Pc(){let{dayName:e,date:t}=Ss(),n=Fs(),r=tc(n),i=Cs(),a=r.find(e=>!i.includes(e.id)),o=Xs(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${Y(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${Nt}.`].join(`
`)}async function Fc(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function Ic(e){ys=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=ys)},60)}function Lc(){ws(ps,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function Rc(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,Lc());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function zc(e){return e.target.closest(`[data-admin-logout]`)?(K.credential=null,K.users=null,K.usersError=``,Zc(`/salir`),!0):!1}function Bc(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function Vc(e,t){K.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function Hc(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),K.busy))return;let n=t.dataset.admForm;if(n===`crear`){let e=q.crear,n=e.nombre.trim(),r=Us(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?K.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:Rs[e.rol]?Ws(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Z(`users`,a,!0),Q();return}Vc(t,!0);try{let t=await it.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});K.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},q.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},K.showCreate=!1,Z(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),K.busy=!1,await Hs(),Bc(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),K.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=K.users?.find(t=>t.usuario===e),r=q.reset.pin.trim(),i=n?Ws(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}Vc(t,!0);try{let t=!n.activo;await it.save({usuario:e,pin:r,...t?{activo:!0}:{}}),K.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},K.resetFor=null,q.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),K.busy=!1,await Hs(),Bc(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),K.busy=!1,Q()}}}async function Uc(e,t,n){if(!K.busy){K.busy=!0;try{await e(),Z(`users`,t),K.busy=!1,await Hs()}catch(e){Z(`users`,e.message||n,!0),K.busy=!1,Q()}}}function Wc(e){if(e.target.closest(`[data-adm-create-toggle]`))return K.showCreate=!K.showCreate,K.resetFor=null,K.confirmOff=null,$(),Bc(K.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return K.usersError=``,Hs().then(()=>{K.usersError||(Z(`users`,`Lista de usuarios actualizada.`),Q())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;q[e].pin=Gs();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=q[e].pin),Ic(`PIN generado: ${q[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=K.users?.find(t=>t.usuario===e);if(!t)return!0;let r=q.roles[e]||t.rol;return r===t.rol?(Z(`users`,`${t.nombre} ya tiene el rol ${Rs[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Q(),!0):(Uc(async()=>{await it.save({usuario:e,rol:r}),delete q.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${Rs[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return K.resetFor=K.resetFor===e?null:e,K.confirmOff=null,q.reset.pin=``,$(),K.resetFor&&Bc(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=K.resetFor||``;return K.resetFor=null,q.reset.pin=``,$(),Bc(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return K.confirmOff=i.dataset.admOff,K.resetFor=null,$(),Bc(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=K.confirmOff||``;return K.confirmOff=null,$(),Bc(`[data-adm-off="${CSS.escape(e)}"]`),Ic(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=K.users?.find(t=>t.usuario===e);return K.confirmOff=null,Uc(()=>it.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}return e.target.closest(`[data-adm-cred-copy]`)?(K.credential&&Fc(Ks(K.credential)).then(e=>{Ic(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0):e.target.closest(`[data-adm-cred-hide]`)?(K.credential=null,$(),Bc(`#adm-usuarios`),Ic(`Listo. El PIN ya no se muestra.`),!0):e.target.closest(`[data-adm-live-refresh]`)?(Ls(!0),!0):!1}function Gc(e){let t=e.target.closest?.(`[data-adm-draft]`);if(!t)return;let n=t.dataset.admDraft,r=t.dataset.admKey;if(n===`roles`?q.roles[r]=t.value:q[n][r]=t.value,n===`crear`&&r===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${J(Rs[t.value]||t.value)}:</strong> ${J(Vs(t.value))}`)}}function Kc(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=Cs(),r=n.includes(e);return ws(fs,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),Ic(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),Rc(n.dataset.admGoto),!0;if(Wc(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),Lc(),Ic(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(Fc(Pc()).then(e=>{Ic(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function qc(e){if(e.target.matches?.(`[data-adm-section]`)&&Lc(),e.target.matches?.(`[data-adm-dogs]`)){let t=e.target.dataset.admDogs;e.target.open?K.openDogs.add(t):K.openDogs.delete(t)}}function Jc(){be.push(zc),Se.push(Kc),document.addEventListener(`toggle`,qc,!0),document.addEventListener(`submit`,Hc),document.addEventListener(`input`,Gc),document.addEventListener(`change`,Gc),et(e=>{vs.includes(e)&&Q()}),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var Yc=document.querySelector(`#app`);function Xc(e){return e.replace(/\/+$/,``)||`/`}function Zc(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ee(),Ct(),Mt(),or(),Ii(),Qa(),ds(),Jc(),document.addEventListener(`click`,e=>{if(Ce(be,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),Zc(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{Ce(xe,e)});function $(){let e=Xc(window.location.pathname);if(e===`/`){Yc.innerHTML=mt(),$c();return}if(e===`/login`){Yc.innerHTML=Et(),$c();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),g.clear(),Yc.innerHTML=Et(),$c();return}if(e===`/registro`||e===`/register`){Yc.innerHTML=Ot(),$c();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(Yc.innerHTML=Qc(r),$c()):(Yc.innerHTML=ge(),$c())}function Qc(e){if(e===`cliente`)return el(e);let t=g.user();return t?(nt[t.rol]||[]).includes(e)?el(e):kt(e):(window.history.replaceState({},``,`/login?volver=/${e}`),Et())}function $c(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=_e()+ye(),document.body.classList.toggle(`menu-locked`,e.menuOpen),We(),Ue()}function el(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:ac,coordinador:Uo,supervisor:ka,paseador:ri,cliente:jn}[e]();return i?ni(o):a?Da(o):e===`coordinador`?Vo(o):e===`admin`?rc(o):le(`
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
    ${r?pe():``}
  `,e)}Ve(),et(e=>{e===`sesion`&&$()}),g.user()&&(g.refresh().catch(()=>{}),ut()),Le(()=>Ue()),$(),document.addEventListener(`click`,e=>{Ce(Se,e)});