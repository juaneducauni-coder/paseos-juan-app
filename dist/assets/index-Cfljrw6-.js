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
  `):``}var be=[],xe=[],Se=[];function Ce(e,t){for(let n of e)if(n(t))return!0;return!1}function we(t){let n=t.target.closest(`[data-chat-select]`);if(n)return localStorage.setItem(`paseosJuanActiveChat`,n.dataset.chatSelect),$(),!0;let r=t.target.closest(`[data-chat-send-shared]`);if(r){let e=r.dataset.chatSendShared,t=document.querySelector(`[data-chat-input-shared="${e}"]`),n=t?.value?.trim();if(!n)return!0;let i=r.dataset.chatRole,a=r.dataset.chatSender;return ae(e,i,a,n)&&(t&&(t.value=``),localStorage.removeItem(`paseosJuanChatDraft`),$()),!0}let i=t.target.closest(`[data-chat-quick-shared]`);if(i){let e=i.dataset.chatQuickShared,t=i.dataset.chatRole,n=i.dataset.chatSender,r=i.dataset.chatConversation;return ae(r,t,n,e)&&$(),!0}return t.target.closest(`[data-menu-toggle]`)?(e.menuOpen=!e.menuOpen,$(),!0):t.target.closest(`[data-menu-close]`)?(e.menuOpen=!1,$(),!0):t.target.closest(`[data-chat-toggle]`)?(e.chatOpen=!e.chatOpen,$(),!0):t.target.closest(`[data-chat-close]`)?(e.chatOpen=!1,$(),!0):!1}function Te(e){let t=e.target.closest(`[data-modal-action]`);if(t){if(t.dataset.modalAction===`close`&&ee(),t.dataset.modalAction===`confirm-pay`){let e=u();e.alerts=[{id:`alert-`+Date.now(),dog:`Pago cliente`,type:`Pago por confirmar`,level:`Medio`,description:`Cliente subió comprobante.`},...e.alerts||[]],d(e),te(`Comprobante enviado. Estado: Pago por confirmar.`),ee()}return t.dataset.modalAction===`save-prices`&&(te(`Precios actualizados correctamente.`),ee()),!0}return e.target.closest(`[data-modal-backdrop]`)&&e.target===e.target.closest(`[data-modal-backdrop]`)?(ee(),!0):!1}function Ee(){be.push(we),Se.push(Te)}var De=`paseosJuan_accesibilidad`,Oe={theme:`auto`,motion:`auto`},ke=new Set,Ae=Me(),je=!1;function Me(){try{let e=JSON.parse(localStorage.getItem(De));return{...Oe,...e||{}}}catch{return{...Oe}}}function Ne(){try{localStorage.setItem(De,JSON.stringify(Ae))}catch{}}var Pe=window.matchMedia(`(prefers-color-scheme: dark)`),Fe=window.matchMedia(`(prefers-reduced-motion: reduce)`);function Ie(){return Ae.theme===`oscuro`||Ae.theme!==`claro`&&Pe.matches}function Le(){return Ae.motion===`calmo`||Ae.motion!==`normal`&&Fe.matches}function Re(e){return ke.add(e),()=>ke.delete(e)}function ze(){let e=document.documentElement;e.dataset.theme=Ie()?`dark`:`light`,e.dataset.motion=Le()?`calm`:`normal`,e.style.colorScheme=Ie()?`dark`:`light`;let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,Ie()?`#0f1512`:`#f7f5ef`),Ve(),ke.forEach(e=>e({dark:Ie(),calm:Le()}))}function Be(e,t,n,r){let i=r===t;return`<button type="button" class="a11y-option ${i?`is-active`:``}" data-a11y-set="${e}:${t}" aria-pressed="${i}">${n}</button>`}function Ve(){let e=document.getElementById(`a11y-root`);e||(e=document.createElement(`div`),e.id=`a11y-root`,document.body.appendChild(e)),e.innerHTML=`
    <button type="button" class="a11y-toggle" data-a11y-toggle aria-expanded="${je}" aria-controls="a11y-panel" aria-label="Opciones de accesibilidad: tema y movimiento">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"></path>
      </svg>
    </button>
    <section class="a11y-panel ${je?`is-open`:``}" id="a11y-panel" role="dialog" aria-label="Accesibilidad" ${je?``:`hidden`}>
      <header>
        <strong>Accesibilidad</strong>
        <button type="button" class="a11y-close" data-a11y-toggle aria-label="Cerrar">×</button>
      </header>
      <div class="a11y-group" role="group" aria-label="Tema">
        <span>Tema</span>
        <div class="a11y-options">
          ${Be(`theme`,`claro`,`Claro`,Ae.theme)}
          ${Be(`theme`,`oscuro`,`Oscuro`,Ae.theme)}
          ${Be(`theme`,`auto`,`Automático`,Ae.theme)}
        </div>
      </div>
      <div class="a11y-group" role="group" aria-label="Movimiento">
        <span>Movimiento</span>
        <div class="a11y-options">
          ${Be(`motion`,`normal`,`Normal`,Ae.motion)}
          ${Be(`motion`,`calmo`,`Calmo`,Ae.motion)}
          ${Be(`motion`,`auto`,`Automático`,Ae.motion)}
        </div>
        <small>El modo calmo apaga animaciones y el fondo en movimiento. Recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</small>
      </div>
    </section>
  `}function He(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){je=!je,Ve(),je?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);Ae={...Ae,[e]:n},Ne(),ze(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else je&&!e.target.closest(`#a11y-root`)&&(je=!1,Ve())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&je&&(je=!1,Ve(),document.querySelector(`.a11y-toggle`)?.focus())}),Pe.addEventListener?.(`change`,ze),Fe.addEventListener?.(`change`,ze),ze()}var Ue={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function We(){Ue.frame&&cancelAnimationFrame(Ue.frame),Ue.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Le(),r=Ie()?[22,52,39]:[184,218,198],i=Ie()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Ue.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Ue.lastDraw>33&&(Ue.lastDraw=e,s(e/1e3)),Ue.frame=requestAnimationFrame(l)}Ue.frame=requestAnimationFrame(l)}function Ge(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ke=`pj_sesion`,qe=`pj_pendientes`,Je=`pj_cache_`,Ye=6e4;fetch(`/api/salud`).then(e=>e.json()).then(e=>{/provisorio/i.test(e.almacenamiento||``)&&(Ye=3e5)}).catch(()=>{});var Xe=new Set,Ze=new Map,Qe=new Set;document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Qe.forEach(e=>e())});function $e(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function et(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function tt(e){Xe.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function nt(e){return Xe.add(e),()=>Xe.delete(e)}var rt=class extends Error{constructor(e,t){super(t),this.status=e}};async function m(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=h.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new rt(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(h.clear(),tt(`sesion`)),!o.ok||s.ok===!1)throw new rt(o.status,s.error||`Error del servidor.`);return s}var h={token:()=>$e(Ke,null)?.token||null,user:()=>$e(Ke,null)?.user||null,set(e,t){et(Ke,{token:e,user:t}),tt(`sesion`)},clear(){try{localStorage.removeItem(Ke),Object.keys(localStorage).filter(e=>e.startsWith(Je)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return m(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await m(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return h.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await m(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return h.set(i.token,i.user),i.user},async refresh(){let e=h.token();if(!e)return null;let t=await m(`/api/auth/me`);return t.user&&h.token()===e&&h.set(e,t.user),t.user},async changePin(e,t){let n=await m(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return h.set(n.token,n.user),n.user},logout(){h.clear(),tt(`sesion`)}},it={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],ayudante:[`paseador`],marketing:[]},at={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,ayudante:`Ayudante de paseador`,marketing:`Marketing`};function ot(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`,ayudante:`/paseador`}[e]||`/`}var st={list:async()=>(await m(`/api/usuarios`)).usuarios,save:async e=>(await m(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>m(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function ct(e,t={}){return`${Je}${e}_${t.desde||``}_${t.prefijo||``}`}function lt(e,t){let n=$e(qe,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var g={cached(e,t={}){return lt(e,$e(ct(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await m(`/api/registros?${n}`),i=localStorage.getItem(ct(e,t));return et(ct(e,t),r.registros),i!==JSON.stringify(r.registros)&&tt(e),lt(e,r.registros)}catch(n){if(n.status===0)return g.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=ut(n.fecha);try{let t=await m(`/api/registros`,{method:`POST`,body:{col:e,...n}});return dt(e,t.registro),tt(e),t.registro}catch(t){if(t.status!==0)throw t;let r=$e(qe,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:h.user()?.usuario,at:Date.now()}),et(qe,a),tt(e),{...n,pendiente:!0}}},async remove(e,t){await m(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${Je}${e}_`)).forEach(e=>{et(e,$e(e,[]).filter(e=>e.id!==t))}),tt(e)},pendingCount(){return $e(qe,[]).length},watch(e,t={}){let n=ct(e,t);if(Ze.has(n))return Ze.get(n);let r=()=>{document.visibilityState===`visible`&&h.token()&&g.list(e,t).catch(()=>{})};r(),Qe.add(r);let i=setInterval(r,Ye);setTimeout(()=>{clearInterval(i),i=setInterval(r,Ye)},3e3);let a=()=>{Qe.delete(r),clearInterval(i),Ze.delete(n)};return Ze.set(n,a),a}};function ut(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function dt(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Je}${e}_`)).forEach(e=>{let n=$e(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),et(e,n)})}var ft=!1;async function pt(){if(ft||!h.token())return 0;let e=h.user()?.usuario,t=$e(qe,[]);if(!t.length)return 0;ft=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await m(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});dt(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{et(qe,$e(qe,[]).filter(e=>!n.has(e.at))),ft=!1,r.forEach(e=>tt(e))}return n.size}window.addEventListener(`online`,()=>pt()),setInterval(()=>pt(),3e4);async function mt(e){return m(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function _(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}function ht(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function gt(){return le(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${_t()}
      ${vt()}
      ${yt()}
      ${Ct()}
      <a class="whatsapp" href="${oe(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function _t(){return`
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
  `}function vt(){return`
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

    ${bt()}

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
  `}function yt(){return`
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
  `}function bt(){return`
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

        ${xt()}
      </div>
    </section>
  `}function xt(){return ht()?`
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
  `}function St(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`)].filter(e=>e!==null).join(`
`)}function Ct(){return`
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
  `}function wt(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(oe(St(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,mt(Object.fromEntries(i)).then(()=>{n.textContent=`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function Tt(){document.addEventListener(`submit`,wt)}var Et=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),Dt={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function Ot(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function kt(){let e=h.user();if(e)return At(e);Dt.necesitaConfiguracion===null&&!Dt.cargando&&(Dt.cargando=!0,h.status().then(e=>{Dt.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{Dt={...Dt,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{Dt.cargando=!1,$()}));let t=Dt.necesitaConfiguracion===!0;return le(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${Dt.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Código de configuración <input name="codigo" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Te lo pasó JUAN 3.0" /></label>`:``}
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>`}
        <p class="acc-status ${Dt.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${Et(Dt.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function At(e){return le(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${Et(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${Et(e.usuario)}</strong> (${Et(e.rol)}).</p>
        <div class="acc-actions">
          ${ot(e.rol)===`/`?``:`<a class="acc-button" href="${ot(e.rol)}" data-link>Ir a mi panel</a>`}
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
  `)}function jt(){return le(`
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
  `)}function Mt(e){let t=h.user(),n=it[t?.rol]||[];return le(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${Et(t?.nombre)}</strong> (${Et(t?.rol)}) y la página de ${Et(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function Nt(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function Pt(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return Nt(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return Nt(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return Nt(t,`Completá usuario y PIN.`,!0);i.disabled=!0,Nt(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await h.changePin(r.actual,r.nuevo);t.reset(),Nt(t,`Listo: tu PIN quedó cambiado.`),ot(e.rol)!==`/`&&setTimeout(()=>Cf(ot(e.rol)),900);return}let e=n===`setup`?await h.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin,codigo:r.codigo}):await h.login(r.usuario,r.pin);if(Dt={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){Cf(`/login`);return}let i=Ot();Cf(i&&(it[e.rol]||[]).includes(i.slice(1))?i:ot(e.rol))}catch(e){Nt(t,e instanceof rt?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function Ft(){document.addEventListener(`submit`,Pt)}var v=`Pendiente de confirmar`,It=`12/11/2026`,y={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},Lt=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Rt={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},b={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},x=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],zt=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],Bt={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Vt=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Ht={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},S=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),Ut=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Wt=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],Gt=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function Kt(e,t,n){return!!e.schedule?.[t]?.includes(n)}function qt(e,t){return S.filter(n=>Kt(n,e,t))}function Jt(e=new Date){return x[(e.getDay()+6)%7]}function C(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var Yt=[[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Lunes`,`Mañana`,`PJ_1M`,`09:00`,`Flora`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,20,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Lunes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Lunes`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:00`,`Coqui`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Manolo`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Lunes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Lunes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Lunes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Martes`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Martes`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Martes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:15`,`Forest`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:30`,`Sam`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`15:45`,`Coqui`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:00`,`Manolo`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Séptima`,45,``],[`Martes`,`Tarde`,`PJ_1T`,`16:15`,`Rambo`,20,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`No juntar con Lokaku, Sam ni Cashi`],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Morris`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:15`,`Kiara`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`10:45`,`Lokaku`,45,`Bozal`],[`Miércoles`,`Mañana`,`PJ_1M`,`11:00`,`Paco`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Tayler`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:15`,`Duque`,45,``],[`Miércoles`,`Mañana`,`PJ_1M`,`11:30`,`Rambo`,20,``],[`Miércoles`,`Tarde`,`PJ_2T`,`14:45`,`Caipi`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Miércoles`,`Tarde`,`PJ_2T`,`15:30`,`Annie`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`15:45`,`Séptima`,45,`Sin días contratados cargados`],[`Miércoles`,`Tarde`,`PJ_2T`,`16:00`,`Milo`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:15`,`Flora`,45,``],[`Miércoles`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,20,`Revisar duración`],[`Jueves`,`Mañana`,`PJ_1M`,`09:00`,`Pistacho`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Sonia`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:15`,`Wendy`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`09:30`,`Zeus`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Cashi`,45,`Bozal`],[`Jueves`,`Mañana`,`PJ_1M`,`10:00`,`Kiara`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:15`,`Flora`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Tayler`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`10:45`,`Duque`,45,``],[`Jueves`,`Mañana`,`PJ_1M`,`11:00`,`Rambo`,20,``],[`Jueves`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`14:45`,`Forest`,45,`Bozal`],[`Jueves`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Jueves`,`Tarde`,`PJ_1T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Jueves`,`Tarde`,`PJ_1T`,`15:30`,`Coqui`,45,``],[`Jueves`,`Tarde`,`PJ_2T`,`16:15`,`Rambo`,20,`Revisar duración`],[`Viernes`,`Mañana`,`PJ_1M`,`09:45`,`Pistacho`,45,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Wendy`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Sonia`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:00`,`Runa`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:15`,`Cashi`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`10:50`,`Kiara`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Flora`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Duque`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:00`,`Tayler`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Rambo`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Morris`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:15`,`Zeus`,45,``],[`Viernes`,`Mañana`,`PJ_1M`,`11:30`,`Lokaku`,45,`Bozal`],[`Viernes`,`Tarde`,`PJ_2T`,`14:45`,`Coqui`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`14:45`,`Caipi`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Paco`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:00`,`Annie`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Frida`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`15:15`,`Natividad`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Sam`,45,`Revisar: no figura contratado este día`],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Otto`,45,``],[`Viernes`,`Tarde`,`PJ_2T`,`15:15`,`Ron`,45,``],[`Viernes`,`Tarde`,`PJ_1T`,`16:00`,`Séptima`,45,`Sin días contratados cargados`],[`Viernes`,`Tarde`,`PJ_1T`,`16:30`,`Jack`,20,`Revisar duración`],[`Viernes`,`Tarde`,`PJ_1T`,`16:45`,`Rambo`,5,`Revisar duración`],[`Sábado`,`Mañana`,`PJ_1M`,`09:15`,`Sam`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`14:45`,`Forest`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Roma`,55,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Manolo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`15:00`,`Milo`,45,``],[`Sábado`,`Tarde`,`PJ_1T`,`16:00`,`Tayler`,45,``]],Xt={"Lunes|Mañana":`Juan`,"Lunes|Tarde":`Nicolás`,"Martes|Mañana":`Juan`,"Martes|Tarde":`Nicolás`,"Miércoles|Mañana":`Juan`,"Miércoles|Tarde":`Nicolás`,"Jueves|Mañana":`Juan`,"Jueves|Tarde":`Nicolás`,"Viernes|Mañana":`Nicolás`,"Viernes|Tarde":`Nicolás`,"Sábado|Mañana":`Juan`,"Sábado|Tarde":`Juan`},Zt=new Map(S.map(e=>[e.name,e]));function Qt(e,t){let[n,r]=e.split(`:`).map(Number),i=n*60+r+Number(t||0);return`${String(Math.floor(i/60)).padStart(2,`0`)}:${String(i%60).padStart(2,`0`)}`}var $t=Yt.map(([e,t,n,r,i,a,o])=>({dia:e,turno:t,ruta:n,hora:r,perroId:Zt.get(i)?.id||null,perroNombre:i,minutos:a,salida:Qt(r,a),nota:o}));function en(){let e=new Map;return $t.forEach(t=>{let n=`${t.ruta}_${t.dia.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}`;e.has(n)||e.set(n,{id:n,dia:t.dia,turno:t.turno,ruta:t.ruta,paseador:``,ayudante:``,supervisor:Xt[`${t.dia}|${t.turno}`]||``,paradas:[],origen:`Planilla RPJ, BASE RUTAS (12/11/2026)`}),e.get(n).paradas.push({perroId:t.perroId,perroNombre:t.perroNombre,hora:t.hora,minutos:t.minutos,nota:t.nota})}),[...e.values()].map(e=>({...e,paradas:e.paradas.sort((e,t)=>e.hora.localeCompare(t.hora))}))}var w={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},tn=`Tu perro`,nn={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},rn=[`Pequeño`,`Mediano`,`Grande`],an=x.filter(e=>e!==`Domingo`),on={Mañana:b.manana,Tarde:b.tarde};function sn(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function cn(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function ln(){let e=sn(w.plan,null);if(!e||typeof e!=`object`)return{...nn};let t=zt.find(t=>t.id===e.planId)?e.planId:nn.planId,n=rn.includes(e.size)?e.size:nn.size,r=on[e.shift]?e.shift:nn.shift,i=Array.isArray(e.days)?an.filter(t=>e.days.includes(t)):nn.days;return{planId:t,size:n,shift:r,days:i.length?i:nn.days}}function un(){let e=sn(w.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function dn(){let e=sn(w.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function fn(e){let t=sn(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function pn(){let e=sn(w.carnet,null);return e&&typeof e.name==`string`?e:null}function T(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function mn(e){return`https://wa.me/${y.whatsapp}?text=${encodeURIComponent(e)}`}function hn(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function gn(e,t){return new Date(e.getTime()+t*864e5)}function _n(e){return x[(e.getUTCDay()+6)%7]}function vn(e){return e.toISOString().slice(0,10)}function yn(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function bn(e){let[t,n,r]=e.split(`-`).map(Number);return yn(new Date(Date.UTC(t,n-1,r)))}function xn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function Sn(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function Cn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function wn(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function Tn(e,t,n){return`${e} ${e===1?t:n}`}function En(){let e=ln(),t=zt.find(t=>t.id===e.planId),n=on[e.shift],r=un(),i=hn(),a=vn(i.date),o=dn().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||tn}}function Dn(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=_n(r.date),s=Sn(n.from),c=Sn(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function On(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=gn(a.date,e);r.days.includes(_n(t))&&(e===0&&a.minutes>Sn(i.to)||n&&o.has(vn(t))||s.push(t))}return s}var kn=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],An=kn.flatMap(e=>e.fields);function jn(e,t){return!!String(e[t]??``).trim()}function Mn(e,t){return t.fields.filter(t=>jn(e,t.key)).length}function Nn(e){return An.filter(t=>jn(e,t.key)).length}function Pn(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function Fn(e){let{ficha:t}=e,n=[],r=kn.find(e=>e.id===`emergencia`);Mn(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),pn()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=Nn(t);return i<An.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${An.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function In(e){return e.todayIso<=r.until}var E={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function Ln(e,t,n=``){E.status[e]={message:t,html:n}}function Rn(e){let t=E.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${T(t.message)} ${t.html}`.trim():``}</p>`}function zn(){return`
    <div class="cl-page" data-cl-root>
      ${Bn(En())}
    </div>
  `}function Bn(e){return`
    <p class="cl-demo-note">
      ${p(`help`,`cl-icon-sm`)}
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
  `}function Vn(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=Dn(e),c=Pn(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=On(e,1)[0],d=u&&vn(u)===e.todayIso,f=Fn(e),ee={libre:`Los días de paseo de tu plan son ${wn(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${p(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${T(a)}</strong>
            <small>${T(i.name)} · ${T(r.size)} · Turno ${T(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${T(_n(t.date))} ${yn(t.date)}</p>
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
          <p class="cl-fine">El estado sigue el horario del turno. El seguimiento en vivo todavía no está disponible. Horario exacto de retiro: <strong>${v}</strong> (te lo confirmamos por WhatsApp).</p>
        `:``}
        <div data-cl-region="alertas-hoy">${Un(c,!0)}</div>
        ${Wn(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${p(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:T(_n(u))}</p>
            <p class="cl-next-date">${d?`${T(_n(u))} ${yn(u)}`:yn(u)}</p>
            <p class="cl-next-shift">Turno ${T(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${v}</p>
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
              <strong>${T(e.text)}</strong>
              <small>${T(e.detail)}</small>
            </span>
            ${p(`arrowRight`,`cl-icon-sm`)}
          </button>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="cl-all-done">${p(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function Un(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${p(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${T(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function Wn(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=gn(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${x.map((e,t)=>gn(a,t)).map(e=>{let t=vn(e),a=_n(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
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
          ${p(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${mn(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${T(y.whatsappLabel)}</small></span>
      </a>
      ${In(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${p(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${T(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function Kn(){return`Ahora: tema ${Ie()?`oscuro`:`claro`} · movimiento ${Le()?`calmo (sin movimiento)`:`normal`}.`}function qn(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${p(`eye`,`cl-icon`)}</span>
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
                ${t.map(t=>`<option value="${vn(t)}">${T(_n(t))} ${yn(t)} · turno ${T(e.settings.shift.toLowerCase())}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-absence-reason"><span>Motivo <span class="cl-optional">(opcional)</span></span>
              <input id="cl-absence-reason" type="text" maxlength="140" placeholder="Por ejemplo: viaje" data-cl-absence-reason />
            </label>
            <button type="button" class="cl-btn" data-cl-absence-save>
              ${p(`message`,`cl-icon-sm`)} Avisar por WhatsApp
            </button>
            <p class="cl-fine">Se abre WhatsApp con el mensaje listo: solo tenés que tocar Enviar. El aviso también queda anotado en este dispositivo.</p>
          `:`<p>${v}: no hay próximos paseos con los días de tu plan.</p>`}
          ${Rn(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${T(_n(xn(e.date)))} ${bn(e.date)}</strong>
                    ${e.reason?`<small>${T(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${T(e.date)}" aria-label="Quitar la ausencia del ${bn(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function Yn(e){let{plan:t,settings:n,shift:r}=e,i=Bt[n.size],a=n.days.length===t.walks;return`
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
          <p class="cl-plan-walks">${Tn(t.walks,`paseo`,`paseos`)} por semana · ${T(n.size)}</p>
          <p class="cl-plan-price"><b>${C(t.prices[n.size])}</b> <span>por semana</span></p>
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
          <div><dt>Turno</dt><dd>${T(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${v}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${p(`alertCircle`,`cl-icon-sm`)} El ${T(t.name)} incluye ${Tn(t.walks,`paseo`,`paseos`)} por semana y hay ${Tn(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${T(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${zt.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${T(e.name)}</strong>
            <span>${Tn(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${C(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${T(n.size.toLowerCase())}):</strong> individual ${C(i.individual)} · en grupo ${C(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Vt.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${E.openGroups.has(`plan`)?`open`:``}>
        <summary>${p(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${zt.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${T(e.name)} · ${Tn(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
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
        <span class="cl-section-icon">${p(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${T(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${v}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${Zn(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${T(Ht[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${v}.</p>
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
  `}function Qn(e,t){let n=Mn(e,t);return n===t.fields.length?`<span class="cl-count is-done">${p(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${v.toLowerCase()}</span>`}function $n(e,t){let n=E.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${p(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${Qn(t,e)}</span>
        ${p(`chevronDown`,`cl-icon-sm cl-chevron`)}
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
        <option value="">${v}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${T(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${T(e.placeholder||`Pendiente de confirmar`)}">${T(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${T(r)}" placeholder="${T(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${jn(t,e.key)?``:v}</small>`:``}
    </label>
  `}function tr(){let e=pn();return`
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
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${T(e.date)}`:v}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${mn(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${Rn(`carnet`)}
    </section>
  `}function nr(e){let t=fn(w.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${C(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${mn(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
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
        <a class="cl-btn is-secondary" href="${mn(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${p(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${Rn(`comprobante`)}
    </section>
  `}function rr(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${p(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${T(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${T(r.title)}</h2>
        <p>${T(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${mn(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function ir(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${p(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${E.resetArmed?`is-danger`:``}" data-cl-reset>
        ${E.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${Rn(`privacidad`)}
    </section>
  `}function ar(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=Bn(En()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function or(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=En();Object.entries({pendientes:()=>Hn(t),"alertas-hoy":()=>Un(Pn(t.ficha),!0),"alertas-ficha":()=>Un(Pn(t.ficha)),"ficha-progreso":()=>Zn(Nn(t.ficha),An.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),kn.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=Qn(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=jn(t.ficha,e.dataset.clFieldState)?``:v})}function sr(e,t,n=``){Ln(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${T(t)} ${n}`.trim())}function cr(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,E.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Le()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function lr(){return yn(hn().date)}function ur(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return cr(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=En(),r=dn().filter(t=>t.date!==e);r.push({date:e,reason:t}),cn(w.ausencias,r);let i=mn([`Hola, aviso que ${n.dogName===tn?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${_n(xn(e)).toLowerCase()} ${bn(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),Ln(`ausencia`,`Listo: anotamos la ausencia del ${bn(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),ar(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return cn(w.ausencias,dn().filter(t=>t.date!==e)),Ln(`ausencia`,`Quitamos la ausencia del ${bn(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),ar(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=zt.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(sr(`plan`,`El ${r.name} incluye ${Tn(r.walks,`paseo`,`paseos`)} por semana: elegí ${Tn(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(cn(w.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),Ln(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),ar(`[data-cl-plan-save]`),!0):(sr(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return E.resetArmed?(Object.values(w).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),E.resetArmed=!1,E.status={},Ln(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),ar(`[data-cl-reset]`),!0):(E.resetArmed=!0,ar(`[data-cl-reset]`),!0);if(E.resetArmed&&!e.target.closest(`[data-cl-reset]`)){E.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function dr(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:lr()};if(t.dataset.clFile===`carnet`)cn(w.carnet,n),Ln(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),ar(`[data-cl-status='carnet']`);else{let t=[n,...fn(w.comprobantes)].slice(0,10);cn(w.comprobantes,t),Ln(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),ar(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=un();sr(`ficha`,cn(w.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function fr(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=un();cn(w.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),or()}function pr(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?E.openGroups.add(t.dataset.clDetails):E.openGroups.delete(t.dataset.clDetails))}function mr(){be.push(ur),xe.push(dr),document.addEventListener(`input`,fr),document.addEventListener(`toggle`,pr,!0),Re(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${Kn()} Se guarda solo en este dispositivo.`)})}var hr=`America/Argentina/Buenos_Aires`,gr=`paseosJuan_paseador_progreso`,_r=`paseosJuan_paseador_equipo`,vr=`paseosJuan_paseador_incidente`,yr=`paseosJuan_paseador_ruta`,D=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],br={pendiente:0,retirado:1,paseando:2,entregado:3},xr=`no-sale`,Sr={Mañana:`manana`,Tarde:`tarde`},Cr=/^[a-z0-9][a-z0-9_.-]{0,60}$/i,wr={Mañana:b.manana,Tarde:b.tarde},Tr=[`Bajo`,`Medio`,`Alto`],Er=[`No se ven`,`Sí`,`No sé`],Dr=`Perro externo`,Or=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,kr=en(),O={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``,routeChange:null};function k(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Ar(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function jr(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Mr(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).trim().toLowerCase()}function Nr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:hr,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:Jt(t)}}function Pr(e){let[t,n,r]=String(e).split(`-`);return r?`${r}/${n}/${t}`:e}function Fr(e,t){let n=(x.indexOf(e)-x.indexOf(t.day)+7)%7,[r,i,a]=t.iso.split(`-`).map(Number);return new Date(Date.UTC(r,i-1,a+n)).toISOString().slice(0,10)}function Ir(e){return e.minutes<810?`Mañana`:`Tarde`}function A(){let e=Nr(),t=O.day||e.day,n=O.shift||Ir(e),r=t===e.day;return{now:e,day:t,shift:n,isToday:r,iso:r?e.iso:Fr(t,e)}}function Lr(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Rr(e){let t=wr[e];return`${t.from} a ${t.to}`}function zr(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}function Br(e){if(e<60)return`${e} min`;let t=Math.floor(e/60),n=e%60;return n?`${t} h ${n} min`:`${t} h`}function Vr(e,t,n=`retiro`){let r=zr(e);if(r===null)return{text:`Hora: ${v.toLowerCase()}`,kind:`info`};let i=r-t;return i>0?{text:`${n===`entrega`?`Entrega `:``}${n===`entrega`?`en`:`En`} ${Br(i)}`,kind:i<=10?`soon`:`ok`}:i===0?{text:n===`entrega`?`Entrega ahora`:`Ahora`,kind:`soon`}:{text:n===`entrega`?`Entrega con ${Br(-i)} de atraso`:`${Br(-i)} de atraso`,kind:`late`}}function Hr(e,t,n=`retiro`){let r=Vr(e,t,n);return`<span class="pw-cd pw-cd--${r.kind}" data-pw-countdown="${k(e)}" data-pw-mode="${n}">${k(r.text)}</span>`}function Ur(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function Wr(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function Gr(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${Lr(i)}`),t=t.filter(e=>!e.includes(r))}return n}function Kr(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function qr(e){return e.safety.some(e=>/bozal/i.test(e))}var Jr=Ut.filter(e=>e.sebastian>0),Yr=Ut.filter(e=>e.sebastian===0&&e.juan>0),Xr=Ut.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function Zr(){return h.user()||{}}function Qr(){return Zr().nombre||`equipo`}function $r(){return Zr().rol===`ayudante`}function ei(e){let t=Zr();if(!e||!t.usuario)return!1;let n=Mr(e);return n===Mr(t.usuario)||t.nombre&&n===Mr(t.nombre)}function ti(e,t=new Map){if(!e)return``;if(ei(e))return Zr().nombre||String(e);let n=String(e);return t.get(n)||t.get(Mr(n))||Lt.find(e=>e.id===Mr(n))?.name||n}function ni(e,t){return Mr(e)===Mr(t)}function ri(e){return Mr(e).startsWith(`tarde`)?`Tarde`:`Mañana`}function ii(e){return S.find(t=>t.id===e.perroId)||S.find(t=>Mr(t.name)===Mr(e.perroNombre))||{id:Cr.test(String(e.perroId||``))?String(e.perroId):``,name:String(e.perroNombre||`Perro sin nombre`),size:v,minutes:null,safety:[],status:`Activo`,unknown:!0}}function ai(e,t){let n=(Array.isArray(e.paradas)?e.paradas:[]).filter(e=>e&&(e.perroId||e.perroNombre)).map((e,t)=>{let n=ii(e),r=Number(e.minutos)||n.minutes||null,i=zr(e.hora)===null?``:String(e.hora).trim().padStart(5,`0`);return{index:t,dog:n,hora:i,minutos:r,salida:i&&r?Qt(i,r):``,nota:String(e.nota||``).trim(),canSave:!!n.id}}).sort((e,t)=>(zr(e.hora)??9999)-(zr(t.hora)??9999)||e.index-t.index);return{ruta:String(e.ruta||`Pendiente de confirmar`),turno:ri(e.turno),dia:e.dia||``,paseador:String(e.paseador||``),ayudante:String(e.ayudante||``),supervisor:String(e.supervisor||``),notas:String(e.notas||``),fuente:t,record:e,stops:n}}function oi(e,t,n){let r=new Map;g.cached(`rutas`,{desde:n}).filter(t=>t.fecha===e&&t.ruta&&Array.isArray(t.paradas)).sort((e,t)=>String(e.actualizadoEn||``).localeCompare(String(t.actualizadoEn||``))).forEach(e=>r.set(e.ruta,e));let i=g.cached(`plantillas`).filter(e=>e.ruta&&Array.isArray(e.paradas)),a=i.length===0,o=new Map;return(a?kr:i).filter(e=>ni(e.dia,t)).forEach(e=>o.set(e.ruta,ai(e,a?`planilla`:`plantilla`))),r.forEach((e,t)=>o.set(t,ai(e,`dia`))),[...o.values()].sort((e,t)=>e.turno===t.turno?e.ruta.localeCompare(t.ruta):e.turno===`Mañana`?-1:1)}function si(e){let t=Ar(yr,{})?.[Zr().usuario||``];return t&&t.iso===e.iso&&t.turno===e.shift?t.ruta:``}function ci(e,t){let n=Ar(yr,{}),r=n&&typeof n==`object`?n:{};r[Zr().usuario||``]=t?{iso:e.iso,turno:e.shift,ruta:t}:null,jr(yr,r)}function li(e){let t=oi(e.iso,e.day,e.now.iso),n=t.filter(t=>t.turno===e.shift),r=n.filter(e=>ei(e.paseador)||ei(e.ayudante)),i=t.filter(t=>t.turno!==e.shift&&(ei(t.paseador)||ei(t.ayudante))),a=r.length?``:n.some(t=>t.ruta===si(e))?si(e):``,o=r.length?r:a?n.filter(e=>e.ruta===a):n;return{all:t,ofShift:n,mine:r,elsewhere:i,picked:a,shown:o,assigned:r.length>0,helping:r.find(e=>ei(e.ayudante)&&!ei(e.paseador))||null,fromPlanilla:o.some(e=>e.fuente===`planilla`)}}function ui(e){return e.flatMap(e=>e.stops.map(t=>({...t,route:e})))}function di(e,t){return ui(li(e).shown).find(e=>e.dog.id===t)||null}var fi=new Map;function pi(e,t){if(!e.isToday||!j.ready)return;let n=[];t.forEach(r=>{let i=`${e.iso}|${r.turno}|${r.ruta}`,a=new Map(r.stops.map(e=>[e.dog.id||Mr(e.dog.name),e])),o=fi.get(i);if(fi.set(i,a),!o)return;let s=[...a.entries()].filter(([e])=>!o.has(e)).map(([,e])=>`${e.dog.name}${e.hora?` (${e.hora})`:``}`),c=[...o.entries()].filter(([e])=>!a.has(e)).map(([,e])=>e.dog.name),l=[...a.entries()].filter(([e,t])=>o.has(e)&&o.get(e).hora!==t.hora).map(([e,t])=>`${t.dog.name} pasa de ${o.get(e).hora||`sin hora`} a ${t.hora||`sin hora`}`),u=[];s.length&&u.push(`se ${s.length===1?`sumó`:`sumaron`} ${Lr(s)}`),c.length&&u.push(`se ${c.length===1?`quitó`:`quitaron`} ${Lr(c)}`),l.length&&u.push(`cambió el horario: ${Lr(l)}`),u.length&&n.push(`${t.length>1?`${r.ruta}: `:``}${u.join(` / `)}`)}),n.length&&(O.routeChange={text:`La ruta cambió: ${n.join(`. `)}.`,time:e.now.time},M(O.routeChange.text))}function mi(e){return g.cached(`avisos`).filter(t=>{let n=String(t.fecha||``),r=String(t.vigenteHasta||``);return n&&n>e?!1:r?r>=e:n===e}).sort((e,t)=>String(t.actualizadoEn||t.fecha||``).localeCompare(String(e.actualizadoEn||e.fecha||``)))}function hi(e){let t=mi(e.now.iso);return t.length?`
    <section class="pw-notices" aria-labelledby="pw-avisos-title">
      <h2 class="pw-section-label" id="pw-avisos-title">${p(`bell`,`pw-icon pw-icon--sm`)} Avisos por barrio (${t.length})</h2>
      <ul class="pw-notice-list" role="list">
        ${t.map(e=>{let t=/seguridad|perro suelto/i.test(e.tipo||``);return`
            <li class="pw-notice ${t?`pw-notice--danger`:``}">
              ${p(t?`alertTriangle`:`mapPin`,`pw-icon`)}
              <div>
                <p class="pw-notice-head"><strong>${k(e.barrio||`Barrio sin cargar`)}</strong>${e.tipo?` · ${k(e.tipo)}`:``}</p>
                <p>${k(e.mensaje||e.titulo||``)}</p>
                <p class="pw-notice-meta">${e.vigenteHasta?`Vigente hasta el ${k(Pr(e.vigenteHasta))}`:`Vigente hoy`}${e.creadoPorNombre?` · Avisó ${k(e.creadoPorNombre)}`:``}</p>
              </div>
            </li>
          `}).join(``)}
      </ul>
    </section>
  `:``}function gi(e,t,n){return`${e}_${t}_${Sr[n]}`}function _i(e,t,n=Zr().usuario){return`${e}_${n||`sin-usuario`}_${Sr[t]}`}var vi=new Map;function yi(e,t){let n=new Map(g.cached(e,{desde:t}).map(e=>[e.id,e]));return vi.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function bi(e){let t=D.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===xr;return{step:r?0:Math.max(br[e.estado]??0,n),noSale:r,times:t,record:e}}function xi(e,t,n){let r=yi(`paseos`,e);return Object.fromEntries(n.filter(e=>e.id).map(n=>[n.id,bi(r.get(gi(e,n.id,t)))]))}function Si(e,t){return t.dog.id&&e[t.dog.id]||bi(null)}function Ci(e,t){let n=e.filter(e=>Si(t,e).noSale).length,r=e.filter(e=>!Si(t,e).noSale&&Si(t,e).step>=D.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function wi(e,t){let n=yi(`checklists`,e).get(_i(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:Jr.filter(e=>r[e.item]===!0).map(e=>e.item)}}function Ti(e){let t=new Map,n=(e,n)=>{e&&n&&t.set(String(e),String(n))};return[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]].forEach(([e,t])=>{g.cached(e,t).forEach(e=>{n(e.creadoPor,e.creadoPorNombre),n(e.actualizadoPor,e.actualizadoPorNombre),D.forEach(t=>n(e[`${t.field}Por`],e[`${t.field}PorNombre`]))})}),t}function Ei(e,t){return e?ei(e)?`vos`:ti(e,t):v}function Di(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:hr,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Oi(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Di(e.actualizadoEn);return`Último cambio: ${Ei(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}function ki(e,t,n){let r=D[t].field,i=e?.[`${r}Por`];return!i||ei(i)?``:e[`${r}PorNombre`]||ti(i,n)}var Ai=Promise.resolve();function ji(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&vi.set(r,n);let i=Ai.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await g.save(e,i);return O.syncError&&=``,t}catch(e){return O.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,pa(O.syncError),null}finally{r&&vi.get(r)===n&&vi.delete(r),va()}});return Ai=i.catch(()=>null),i}function Mi(e,t,n,r){let i=t.now.iso,a={id:gi(i,e.dog.id,t.shift),fecha:i,perroId:e.dog.id,perroNombre:e.dog.name,turno:t.shift,ruta:e.route.ruta,...n};return M(r),ji(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&M(`${r} Sin señal: se enviará cuando haya señal.`)})}function Ni(e,t){let n=e.now.iso,r=Object.fromEntries(Jr.map(e=>[e.item,t.includes(e.item)])),i={id:_i(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=Jr.length};return ji(`checklists`,i,{optimisticRecord:i})}var j={key:``,stops:[],ready:!1};function Pi(e){let t=`${e}|${Zr().usuario||``}`;if(j.key===t)return;j.stops.forEach(e=>e()),j.key=t,j.stops=[],j.ready=!1;let n=[[`paseos`,{desde:e}],[`checklists`,{desde:e}],[`rutas`,{desde:e}],[`plantillas`,{}],[`avisos`,{}]];Promise.allSettled(n.map(([e,t])=>g.list(e,t))).then(t=>{let n=t.find(e=>e.status===`rejected`);return n&&(O.syncError=`No se pudieron traer los datos del equipo: ${n.reason?.message||`error del servidor`}`,pa(O.syncError)),Ii(e)}).catch(()=>null).finally(()=>{j.key===t&&(j.ready=!0,va(),j.stops=n.map(([e,t])=>g.watch(e,t)))})}var Fi=!1;async function Ii(e){if(Fi)return;Fi=!0;let t=Ar(gr,null),n=Ar(_r,null);if(!t&&!n)return;let r=[],i=yi(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&Sr[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=S.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=gi(e,t,o),c=bi(i.get(s)),l=Math.min(n.length,D.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:D[l-1].estado};D.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(ji(`paseos`,u,{optimisticRecord:u}))})});let a=yi(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!Sr[o]||!Array.isArray(n))return;let s=n.filter(e=>Jr.some(t=>t.item===e));s.length&&!a.has(_i(e,o))&&r.push(Ni({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(gr),localStorage.removeItem(_r)}catch{}r.length&&M(`Se subió al equipo lo que tenías marcado en este celular.`)}}function Li(){let e=Ar(vr,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function Ri(e){return`
    <div class="pw-shell">
      ${Bi()}
      ${e}
    </div>
  `}function zi(){let e=A();Pi(e.now.iso);let t=li(e);pi(e,t.shown),Ea.iso=e.now.iso,Ea.shift=Ir(e.now),Ea.minute=e.now.minutes;let n=ui(t.shown),r=e.isToday?xi(e.iso,e.shift,n.map(e=>e.dog)):{},i=Ti(e.now.iso);return`
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
        <p>Rutas y horarios: los arma el coordinador. Punto de partida: ${k(y.officialSources.routes)} (12/11/2026).</p>
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
          <small>${$r()?`Ayudante`:`Paseador`} · ${k(Qr())}</small>
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
  `}function Vi(){let e=g.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${p(`uploadCloud`,`pw-icon`)}<span>${k(n)}</span></p>`),O.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${p(`alertTriangle`,`pw-icon`)}
        <span>${k(O.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function Hi(){return O.routeChange?`
    <div class="pw-change" data-pw-change>
      ${p(`route`,`pw-icon pw-icon--lg`)}
      <div>
        <strong>${k(O.routeChange.text)}</strong>
        <p>Lo cambió el coordinador. Aviso recibido a las ${k(O.routeChange.time)}.</p>
      </div>
      <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-change-ok>Entendido</button>
    </div>
  `:``}function Ui(e){let t=e.flatMap(e=>e.stops.map(e=>e.hora)).filter(Boolean).sort(),n=e.flatMap(e=>e.stops.map(e=>e.salida)).filter(Boolean).sort();return t.length?`${t[0]} a ${n[n.length-1]||t[t.length-1]}`:``}function Wi(e,t,n,r,i){let a=t.helping,o=t.mine[0]||null,s=e.isToday?`hoy, ${e.day.toLowerCase()}`:`${e.day.toLowerCase()} ${Pr(e.iso)}`,c;c=a?`Acompañás a ${k(ti(a.paseador,i)||`un paseador sin asignar`)} en ${k(a.ruta)}`:o?t.mine.length>1?`Tus rutas de ${s}: ${k(Lr(t.mine.map(e=>e.ruta)))}`:`Tu ruta de ${s}: ${k(o.ruta)}`:`Rutas de ${s} · turno ${e.shift.toLowerCase()}`;let l=`Hola, ${k(Qr())}`,u=e.isToday?`${l} · ${e.now.date} · turno ${e.shift.toLowerCase()}`:`${l} · Planificación: no es hoy`,d=[...new Set(t.shown.map(e=>e.supervisor).filter(Boolean))],f=d.length?Lr(d):wr[e.shift].supervisor,ee=Ui(t.shown)||Rr(e.shift),te=n.filter(e=>e.dog.status!==`Activo`),ne=Wr(n.map(e=>e.dog)),re=[];if(t.assigned&&t.shown.length===1){let e=t.shown[0];a?re.push(`<li>Paseador: <b>${k(ti(e.paseador,i)||`Pendiente de confirmar`)}</b></li>`):re.push(`<li>Ayudante: ${e.ayudante?`<b>${k(ti(e.ayudante,i))}</b>`:`sin ayudante`}</li>`)}return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${u}</p>
          <h1 id="pw-today-title" tabindex="-1">${c}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${n.length}</b> ${n.length===1?`perro`:`perros`}</li>
            <li>${k(ee)}</li>
            <li>Supervisa: ${k(f)}</li>
            ${re.join(``)}
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
      ${O.pickerOpen?Ki(e):``}
      ${t.fromPlanilla?`
        <p class="pw-source pw-source--warn">${p(`alertCircle`,`pw-icon`)}<span><b>Ruta tomada de la planilla, falta que el coordinador la confirme.</b> Horarios de BASE RUTAS (12/11/2026).</span></p>
      `:``}
      ${Gi(e,t)}
      ${qi(e,n,te,ne,r)}
    </section>
  `}function Gi(e,t){let n=[];if(!t.assigned&&t.elsewhere.length){let r=t.elsewhere[0];n.push(`
      <p class="pw-source">
        ${p(`route`,`pw-icon`)}
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
                ${k(e.ruta)}<small>${e.stops.length} ${e.stops.length===1?`perro`:`perros`}${e.paseador?` · ${k(ti(e.paseador))}`:``}</small>
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
          ${x.map(n=>`
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
  `}function qi(e,t,n,r,i){let a=[],o=t.map(e=>e.dog);r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${Gr(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let s=o.filter(qr);if(s.length){let e=!$r()&&s.length>Xr;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${Lr(s.map(e=>e.name))}`,text:e?`Según el inventario tenés ${Xr} ${Xr===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${Lr(n.map(e=>e.dog.name))}`,text:n.length===1?`Figura en la ruta con estado "${k(n[0].dog.status)}". No lo retires sin confirmarlo con el coordinador o con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con el coordinador o con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=wi(e.now.iso,e.shift).checked.length,r=Ci(t,i);n<Jr.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${Jr.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return a.length?`
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
  `:``}function Ji(e,t){if(e.fuente===`dia`){let n=e.record.actualizadoPor?Ei(e.record.actualizadoPor,t):``,r=e.record.actualizadoEn?Di(e.record.actualizadoEn):``;return`Cambio del día${n?` cargado por ${n}`:``}${r?` a las ${r}`:``}.`}return e.fuente===`plantilla`?`Plantilla semanal del coordinador.`:`Planilla RPJ (sin confirmar).`}function Yi(e,t,n){let r=e.stops.filter(e=>e.canSave);if(!e.stops.length)return``;if(!t.isToday){let t=e.stops[0];return`
      <div class="pw-next" data-pw-next="${k(e.ruta)}">
        <p class="pw-next-label">Primer retiro</p>
        <p class="pw-next-main">${k(t.dog.name)}${t.hora?` · ${k(t.hora)}`:``}</p>
      </div>
    `}let i=r.filter(e=>!Si(n,e).noSale&&Si(n,e).step===0),a=r.filter(e=>{let t=Si(n,e);return!t.noSale&&t.step>0&&t.step<D.length}),o,s,c,l;if(i.length)c=i[0].hora,o=i.filter(e=>e.hora===c),s=`Próximo`,l=`retiro`;else if(a.length){let e=[...a].sort((e,t)=>String(e.salida||`99:99`).localeCompare(String(t.salida||`99:99`)));c=e[0].salida,o=e.filter(e=>e.salida===c),s=`Próxima entrega`,l=`entrega`}else return`
      <div class="pw-next pw-next--done" data-pw-next="${k(e.ruta)}">
        <p class="pw-next-label">${k(e.ruta)}</p>
        <p class="pw-next-main">${p(`checkCircle`,`pw-icon pw-icon--lg`)} Ruta completa</p>
      </div>
    `;return`
    <div class="pw-next ${Vr(c,t.now.minutes,l).kind===`late`?`is-late`:``}" data-pw-next="${k(e.ruta)}">
      <p class="pw-next-label">${l===`entrega`?`Todos retirados · próxima entrega prevista`:`Retiro que sigue`}</p>
      <p class="pw-next-main">${s===`Próximo`?`Próximo: `:``}${k(Lr(o.map(e=>e.dog.name)))}${c?` · ${k(c)}`:``}</p>
      <p class="pw-next-time">${Hr(c,t.now.minutes,l)}</p>
      <div class="pw-next-actions">
        ${o.map(t=>{let r=Si(n,t);return`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-from-next="${k(e.ruta)}" data-pw-step="${k(t.dog.id)}" ${j.ready?``:`aria-disabled="true"`}>
              ${j.ready?`${D[r.step].action}${o.length>1?`: ${k(t.dog.name)}`:``}`:`Cargando lo marcado…`}
            </button>
          `}).join(``)}
      </div>
    </div>
  `}function Xi(e,t,n,r,i){let a=Wr(e.stops.map(e=>e.dog)),o=Ci(e.stops,r),s=o.toWalk?Math.round(o.delivered/o.toWalk*100):100,c=`pw-ruta-${e.ruta.replace(/[^a-z0-9]+/gi,`-`)}`,l=[];return!n.helping&&e.paseador&&!ei(e.paseador)&&l.push(`Paseador: ${ti(e.paseador,i)}`),n.helping&&e.ayudante&&!ei(e.ayudante)&&l.push(`Ayudante: ${ti(e.ayudante,i)}`),!n.assigned&&e.ayudante&&l.push(`Ayudante: ${ti(e.ayudante,i)}`),`
    <section class="pw-section pw-route" aria-labelledby="${c}">
      <div class="pw-section-head">
        <div>
          <h2 id="${c}">Ruta ${k(e.ruta)} <span class="pw-count">${e.stops.length}</span></h2>
          <p class="pw-muted">${k(Ji(e,i))} En orden, con la hora de retiro.${l.length?` ${k(l.join(` · `))}.`:``}</p>
          ${e.notas?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${k(e.notas)}</p>`:``}
        </div>
        ${t.isToday&&e.stops.length?`
          <div class="pw-progress" aria-label="Avance de la ruta ${k(e.ruta)}">
            <strong>${o.delivered} de ${o.toWalk} entregados${o.noSale?` · ${o.noSale} no ${o.noSale===1?`sale`:`salen`}`:``}</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${s}%"></span></span>
          </div>
        `:``}
      </div>

      ${Yi(e,t,r)}

      ${a.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${p(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en esta ruta</strong>
            <ul>${Gr(a).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${k(e.supervisor||wr[t.shift].supervisor)} antes de salir.</p>
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
          <p><strong>Sin perros en ${k(e.ruta)} para este turno.</strong></p>
          <p>Si te pidieron un paseo, confirmalo con el coordinador.</p>
        </div>
      `}
      <p class="pw-muted pw-legend">
        Categoría operativa: <b>SIN EVALUAR</b> salvo que se indique otra. ${k(Ht[`SIN EVALUAR`])}
        Fuente: Registro maestro, 14/08/2026.
      </p>
    </section>
  `}function Zi(e){return!e.nota||/^bozal$/i.test(e.nota)&&qr(e.dog)||/^no juntar/i.test(e.nota)&&e.dog.safety.some(e=>Ur(e)===`danger`)?``:e.nota}function Qi(e,t,n,r,i,a){let{dog:o}=e,{times:s,noSale:c,record:l}=r,u=Math.min(r.step,D.length),d=!c&&u>=D.length,f=Oi(l,a),ee=o.safety.filter(e=>Ur(e)===`danger`).join(` `),te=i.filter(e=>!ee.includes(e)),ne=o.safety.filter(e=>Ur(e)!==`info`),re=o.safety.filter(e=>Ur(e)===`info`),ie=o.status!==`Activo`,ae=ne.length||i.length||ie,oe=Zi(e),se=e.minutos||o.minutes,ce=n.isToday&&e.canSave,le=``;return n.isToday&&!c&&!d&&e.canSave&&(le=u===0?Hr(e.hora,n.now.minutes,`retiro`):e.salida?Hr(e.salida,n.now.minutes,`entrega`):``),`
    <li class="pw-dog ${ae?`has-alert`:``} ${d?`is-done`:``} ${c?`is-nosale`:``}" data-pw-dog="${k(o.id)}">
      <div class="pw-dog-time">
        <span class="pw-dog-order" aria-label="Orden ${t+1}">${t+1}</span>
        <span class="pw-dog-hora">${e.hora?`${p(`clock`,`pw-icon pw-icon--sm`)} Retiro ${k(e.hora)}`:`Hora de retiro: ${v.toLowerCase()}`}</span>
        ${le}
      </div>
      <div class="pw-dog-head">
        <h3>${k(o.name)}</h3>
        <span class="pw-dog-facts">${k(o.size)} · ${se?`${se} min`:`Duración: ${v.toLowerCase()}`}${e.salida?` · vuelve ~${k(e.salida)}`:``}</span>
      </div>

      ${ae?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${k(o.name)}">
          ${ie?`
            <li class="pw-alert pw-alert--warn">
              ${p(`alertCircle`,`pw-icon`)}
              <span>${k(o.status)}: ${k(o.review||`su estado no es Activo.`)} Confirmalo con el coordinador o con Juan antes de retirarlo.</span>
            </li>
          `:``}
          ${ne.map(e=>`
            <li class="pw-alert pw-alert--${Ur(e)}">
              ${p(Ur(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${k(e)}${Ur(e)===`danger`&&i.length?`<b class="pw-today-tag">En esta ruta: ${Lr(i)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${te.length?`
            <li class="pw-alert pw-alert--danger">
              ${p(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${Lr(te)}<b class="pw-today-tag">En esta ruta</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${re.map(e=>`<p class="pw-dog-note">${p(`users`,`pw-icon pw-icon--sm`)} ${k(e)}</p>`).join(``)}
      ${oe?`<p class="pw-dog-nota"><b>Nota de la ruta:</b> ${k(oe)}</p>`:``}
      ${o.review&&!ie?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${k(o.review)}</p>`:``}
      ${o.unknown?`<p class="pw-dog-review"><b>Perro nuevo en la ruta:</b> sin ficha en esta página (tamaño y alertas: ${v.toLowerCase()}). Preguntale al coordinador.</p>`:``}
      <p class="pw-dog-category"><span>${k(o.category||`SIN EVALUAR`)}</span> ${o.unknown?v:`Registro maestro 14/08/2026`}</p>

      ${n.isToday&&!e.canSave?`
        <p class="pw-note">Este perro no tiene identificador en la ruta: no se puede marcar. Avisale al coordinador.</p>
      `:``}

      ${ce?`
        ${c?`
          <p class="pw-nosale-label">${p(`x`,`pw-icon`)} No sale en este turno</p>
        `:`
          <ol class="pw-steps" aria-label="Avance de ${k(o.name)}">
            ${D.map((e,t)=>{let n=t<u?ki(l,t,a):``;return`
                <li class="${t<u?`is-done`:``} ${t===u?`is-next`:``}">
                  <span class="pw-step-dot" aria-hidden="true">${t<u?p(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
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
            <p class="pw-done-label">${p(`checkCircle`,`pw-icon`)} Entregado ${k(s[D.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${k(o.id)}" ${j.ready?``:`aria-disabled="true"`}>
              ${j.ready?D[u].action:`Cargando lo marcado…`}
            </button>
          `}
          ${!c&&u===0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${k(o.id)}" ${j.ready?``:`aria-disabled="true"`} aria-label="${k(o.name)} no sale en este turno">No sale</button>
          `:``}
          ${c||u>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${k(o.id)}" aria-label="Deshacer el último paso de ${k(o.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function $i(e,t,n){let{checked:r,record:i}=wi(e.now.iso,e.shift),a=r.length>=Jr.length,o=Oi(i,n),s=t.helping?ti(t.helping.paseador,n):``;return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">${$r()?`Tu checklist, hoy turno ${e.shift.toLowerCase()}. El inventario no asigna equipo al ayudante (${v.toLowerCase()}): revisá${s?` con ${k(s)}`:``} que esté todo lo del paseador.`:`Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.`}</p>
        </div>
        <span class="pw-count ${a?`is-ok`:``}">${r.length}/${Jr.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${Jr.map(e=>{let t=r.includes(e.item),n=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
            <li>
              <input class="pw-check-input" type="checkbox" id="${n}" data-pw-equip="${k(e.item)}" ${t?`checked`:``} />
              <label class="pw-check" for="${n}">
                <span class="pw-check-box" aria-hidden="true">${p(`checkCircle`,`pw-icon`)}</span>
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
      ${Yr.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${Yr.map(e=>`${k(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function ea(e,t){let n=Li(),r=[...t.map(e=>e.name),Dr];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=O.previewOpen?ia(n,e):null;return`
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
          ${Gt.map((e,t)=>{let r=`pw-proto-${t}`;return`
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
          ${p(`fileText`,`pw-icon`)}
          Armar mensaje para Juan
        </button>
        <button class="pw-btn pw-btn--ghost ${O.confirmClear?`is-confirm`:``}" type="button" data-pw-clear>
          ${O.confirmClear?`¿Seguro? Tocá de nuevo`:n.registroId?`Empezar otro reporte`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${O.incidentStatus.startsWith(`Falta`)||O.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${k(O.incidentStatus)}</p>

      ${i&&i.ok?ta(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function ta(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${k(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${na(e)}" target="_blank" rel="noopener noreferrer">
          ${p(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${p(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function na(e){return`https://wa.me/${y.whatsapp}?text=${encodeURIComponent(e)}`}function ra(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(Or)?.[0]}}function ia(e,t){let{missing:n,word:r}=ra(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=Ir(t.now),a=oa(),o=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,s=aa(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,$r()?`Ayudante de paseador: ${Qr()}${a.paseador?` (con ${a.paseador})`:``}`:`Paseador: ${Qr()}`,`Ruta: ${a.rutas||`Pendiente de confirmar`}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,o(`Lesiones`,e.lesiones),o(`Lugar`,e.lugar),``,o(`Antes`,e.antes),o(`Conducta observada`,e.conducta),o(`Qué hice`,e.accion),o(`Después`,e.despues),``,`Protocolo:`,...s].join(`
`)}}function aa(e){return Gt.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function oa(){let e=A(),t=li({...e,day:e.now.day,iso:e.now.iso,isToday:!0,shift:Ir(e.now)}),n=Ti(e.now.iso);return{rutas:t.shown.map(e=>e.ruta).join(`, `),paseador:t.helping?ti(t.helping.paseador,n):``}}function sa(e,t){let n=e.dogs.map(e=>S.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:aa(e),ruta:oa().rutas,titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function ca(e,t=!1){O.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),M(e)}function la(e,t){if(O.incidentSavedText===t)return Promise.resolve(null);O.incidentSavedText=t;let n=A();return ji(`incidentes`,()=>sa({...e,registroId:Li().registroId||e.registroId},n)).then(e=>{if(!e)return O.incidentSavedText=``,null;let t=Ar(vr,null);return t&&jr(vr,{...t,registroId:e.id}),ca(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function ua(){let e=Li(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function da(){let e=ua();return jr(vr,e),e}function fa(e){if(!O.previewOpen)return;let t=ia(e,A()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),O.previewOpen=!1,O.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=O.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=na(t.text))}function M(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function pa(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var ma=[`data-pw-from-next`,`data-pw-route`,`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function ha(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=ma.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]${t===`data-pw-step`?`:not([data-pw-from-next])`:``}`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function ga(){let e=document.activeElement,t=ha(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var _a=0;function va(){clearTimeout(_a),_a=setTimeout(()=>{document.querySelector(`.pw-shell`)&&ga()},80)}function N(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function ya(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function ba(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:ya(),block:`start`}),t.focus({preventScroll:!0}))}async function xa(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function Sa(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return Cf(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return O.syncError=``,N(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return ba(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return O.pickerOpen=!O.pickerOpen,N(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=Nr(),t=n.dataset.pwDay;return O.day=t===e.day?null:t,N(`[data-pw-day="${t}"]`),M(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return O.shift=r.dataset.pwShift,N(`[data-pw-shift="${O.shift}"]`),M(`Mostrando el turno ${O.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return O.day=null,O.shift=null,O.pickerOpen=!1,N(`#pw-today-title`),M(`Mostrando hoy.`),!0;if(e.target.closest(`[data-pw-change-ok]`))return O.routeChange=null,N(`#pw-today-title`),!0;let i=e.target.closest(`[data-pw-route]`);if(i){let e=A(),t=i.dataset.pwRoute;return ci(e,t),N(`[data-pw-route="${CSS.escape(t)}"]`),M(t?`Mostrando la ruta ${t}. Queda recordada en este celular.`:`Mostrando todas las rutas del turno.`),!0}let a=e.target.closest(`[data-pw-step]`);if(a){let e=a.dataset.pwStep,t=a.dataset.pwFromNext,n=A(),r=di(n,e);if(!n.isToday||!r?.canSave||!j.ready)return!0;let i=r.dog,o=xi(n.now.iso,n.shift,[i])[e];if(o.noSale||o.step>=D.length)return!0;let s=D[o.step],c=Zr(),l={estado:s.estado};if(D.forEach((e,t)=>{t>=o.step||(l[e.field]=o.times[t],o.record?.[`${e.field}Por`]&&(l[`${e.field}Por`]=o.record[`${e.field}Por`],l[`${e.field}PorNombre`]=o.record[`${e.field}PorNombre`]||``))}),l[s.field]=n.now.time,l[`${s.field}Por`]=c.usuario||``,l[`${s.field}PorNombre`]=c.nombre||``,Mi(r,n,l,`${i.name}: ${s.done.toLowerCase()} a las ${n.now.time}.`),t){$();let e=document.querySelector(`[data-pw-from-next="${CSS.escape(t)}"]`)||document.querySelector(`[data-pw-next="${CSS.escape(t)}"]`)?.closest(`section`)?.querySelector(`h2`);e&&!e.hasAttribute(`tabindex`)&&e.tagName===`H2`&&e.setAttribute(`tabindex`,`-1`),e?.focus({preventScroll:!0})}else N(o.step+1>=D.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`);return!0}let o=e.target.closest(`[data-pw-nosale]`);if(o){let e=o.dataset.pwNosale,t=A(),n=di(t,e);return t.isToday&&n?.canSave&&j.ready&&(Mi(n,t,{estado:xr},`${n.dog.name}: no sale en este turno.`),N(`[data-pw-undo="${CSS.escape(e)}"]`)),!0}let s=e.target.closest(`[data-pw-undo]`);if(s){let e=s.dataset.pwUndo,t=A(),n=di(t,e);if(!t.isToday||!n?.canSave||!j.ready)return!0;let r=n.dog,i=xi(t.now.iso,t.shift,[r])[e];if(i.noSale){let a=i.times.reduce((e,t,n)=>t?n+1:e,0);return Mi(n,t,{estado:a?D[a-1].estado:`pendiente`},`${r.name}: se deshizo "no sale".`),N(a>=D.length?`[data-pw-undo="${CSS.escape(e)}"]`:`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(!i.step)return!0;let a=i.step-1,o={estado:a?D[a-1].estado:`pendiente`};return D.forEach((e,t)=>{o[e.field]=t<a?i.times[t]:``,t>=a&&(o[`${e.field}Por`]=``,o[`${e.field}PorNombre`]=``)}),Mi(n,t,o,`${r.name}: se deshizo "${D[a].done.toLowerCase()}".`),N(`[data-pw-step="${CSS.escape(e)}"]:not([data-pw-from-next])`),!0}if(e.target.closest(`[data-pw-equip-all]`))return Ni(A(),Jr.map(e=>e.item)),O.equipStatus=`Equipo completo. ¡A salir!`,N(`[data-pw-equip-reset]`),M(O.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return Ni(A(),[]),O.equipStatus=`Lista de equipo desmarcada.`,N(`[data-pw-equip-all]`),M(O.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=da(),t=ia(e,A());return O.confirmClear=!1,t.ok?(O.previewOpen=!0,O.incidentStatus=O.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,N(`[data-pw-message]`),M(O.incidentStatus),la(e,t.text),!0):(O.previewOpen=!1,O.incidentStatus=t.missing.length?`Falta completar: ${Lr(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,N(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),M(O.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=Li(),t=ia(e,A());return t.ok&&la(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=Li(),n=ia(t,A());return n.ok&&la(t,n.text),xa(e).then(e=>{O.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=O.incidentStatus,t.classList.toggle(`is-warn`,!e)),M(O.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!O.confirmClear)return O.confirmClear=!0,N(`[data-pw-clear]`),!0;let e=!!Li().registroId;try{localStorage.removeItem(vr)}catch{}return O.confirmClear=!1,O.previewOpen=!1,O.incidentSavedText=``,O.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,N(`#pw-incidente`),M(O.incidentStatus),!0}if(O.confirmClear&&!e.target.closest(`[data-pw-clear]`)){O.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=Li().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function Ca(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=A(),{checked:n}=wi(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return Ni(e,i),O.equipStatus=i.length>=Jr.length?`Equipo completo. ¡A salir!`:``,N(`[data-pw-equip="${CSS.escape(r)}"]`),O.equipStatus&&M(O.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(fa(da()),!0):!1}function wa(e){e.target.closest?.(`[data-pw-field]`)&&fa(da())}function Ta(){be.push(Sa),xe.push(Ca),document.addEventListener(`input`,wa),nt(e=>{[`paseos`,`checklists`,`incidentes`,`rutas`,`plantillas`,`avisos`].includes(e)&&va()}),window.addEventListener(`online`,va),window.addEventListener(`offline`,va),setInterval(Da,15e3)}var Ea={iso:``,shift:``,minute:-1};function Da(){if(!document.querySelector(`.pw-shell`))return;let e=Nr();e.iso!==Ea.iso||Ir(e)!==Ea.shift?va():e.minutes!==Ea.minute&&(Ea.minute=e.minutes,document.querySelectorAll(`[data-pw-countdown]`).forEach(t=>{let n=Vr(t.dataset.pwCountdown,e.minutes,t.dataset.pwMode);t.textContent=n.text,t.className=`pw-cd pw-cd--${n.kind}`,t.closest(`.pw-next`)?.classList.toggle(`is-late`,n.kind===`late`)}))}var Oa=`America/Argentina/Buenos_Aires`,ka=[`manana`,`tarde`],Aa=[`Paseador asignado`,`Sebastián`],ja=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,Ma=[`paseos`,`checklists`,`incidentes`,`observaciones`,`rutas`,`cierres`],Na=7,Pa={admin:`Admin`,supervisor:`Supervisor`,coordinador:`Coordinación`,paseador:`Paseador`},P={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,routeDraft:`paseosJuanSupervisor_rutaBorrador`,observationDraft:`paseosJuanSupervisor_observacionBorrador`},Fa={routes:`paseosJuanSupervisor_rutas`,observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},Ia=null,La=null,Ra=null,za=null,Ba=new Set,Va=new Map,Ha=new Map,Ua=!1,Wa=null,Ga=`idle`;function F(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Ka(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function qa(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Ja(e){try{localStorage.removeItem(e)}catch{}}function I(e,t,n=`ok`){Ia={area:e,text:t,tone:n}}function Ya(e){return Ia&&Ia.area===e?Ia:null}function Xa(e){let t=Ya(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?F(t.text):``}</p>
  `}function Za(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function Qa(e){let[t,n]=String(e).split(`:`).map(Number);return t*60+n}function $a(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Oa,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:x[(n+6)%7]}}function eo(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function to(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:v}function no(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function ro(e){return x[(new Date(`${e}T12:00:00Z`).getUTCDay()+6)%7]}function io(e,t){let n=x.indexOf(ro(t));return eo(t,(x.indexOf(e)-n+7)%7)}function ao(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Oa,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function oo(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:_(t)}function so(e){return e.minutes<Qa(`13:30`)?`manana`:`tarde`}function co(e){let t=String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase();return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function lo(e){let t=b[e];return t.routes||[t.route]}function uo(e,t){let n=b[e];return t.minutes<Qa(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=Qa(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function fo(){return h.user()||{}}function po(e){let t=fo();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function mo(e,t){if(!e)return``;if(t?.actualizadoPor===e&&t.actualizadoPorNombre)return t.actualizadoPorNombre;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=fo();return n.usuario===e&&n.nombre?n.nombre:Lt.find(t=>t.id===e)?.name||e}function ho(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=mo(e.actualizadoPor||e.creadoPor,e),r=ao(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function go(e){let t=_();return{desde:e===`observaciones`?eo(t,-6):t}}function _o(){h.token()&&Ma.forEach(e=>g.watch(e,go(e)))}function vo(e){let t=new Map(g.cached(e,go(e)).map(e=>[e.id,e]));return Va.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function yo(e,t,n,r,i=`ok`){if(!t.id)return bo(e,t,n,r,i);let a=`${e}:${t.id}`,o=(Ha.get(a)||Promise.resolve()).then(()=>bo(e,t,n,r,i));return Ha.set(a,o),o.then(()=>{Ha.get(a)===o&&Ha.delete(a)}),o}async function bo(e,t,n,r,i){try{let a=await g.save(e,t);if(a.pendiente)I(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=Va.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&Va.set(t,a),I(n,r,i)}return a}catch(e){return I(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function xo(e,t,n,r){try{return await g.remove(e,t),Va.delete(`${e}:${t}`),I(n,r,`info`),!0}catch(e){return I(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function So(e=!0){if(!h.token())return;let t=await Promise.allSettled(Ma.map(e=>g.list(e,go(e))));if(!e)return;let n=t.find(e=>e.status===`rejected`);n?I(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?I(`sync`,`Datos actualizados a las ${$a().time} hs.`):I(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),R(`sv-refresh`)}function Co(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function wo(){Wa=null,Co()&&document.querySelector(`.sv-shell`)&&Eo()}function To(){let e=Ka(P.folds,{}),t=!1;document.querySelectorAll(`.sv-shell [data-sv-fold]`).forEach(n=>{e[n.dataset.svFold]!==n.open&&(e[n.dataset.svFold]=n.open,t=!0)}),t&&qa(P.folds,e)}function Eo(){To();let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.getElementById(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}function Do(){Wa||=setTimeout(wo,40)}function Oo(){Ua||(Ua=!0,nt(e=>{Ma.includes(e)&&Do()}),window.addEventListener(`online`,Do),window.addEventListener(`offline`,Do),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&Co()&&So(!1)}))}function ko(){try{return Object.values(Fa).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function Ao(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function jo(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function Mo(e){if(!e||typeof e!=`object`||!Array.isArray(e.dogIds)||!ka.includes(e.shift))return null;let t=no(String(e.savedAt||``).slice(0,10))||oo(jo(e.id))||_(),n=x.includes(e.day)?io(e.day,t):t,r=b[e.shift].label;return{id:Ao(`${n}_${e.id||Date.now()}`),fecha:n,turno:r,ruta:e.route||``,paseador:e.walker||Aa[0],perros:e.dogIds.filter(e=>qo(e)),conflictos:Array.isArray(e.conflicts)?e.conflicts:[],medida:e.reason||``,notas:e.notes||``,titulo:`Ruta ${e.route||``} · ${r} · ${to(n)}`,migrado:!0}}function No(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=qo(e.dogId),n=no(e.fecha)||oo(jo(e.id))||_();return{id:Ao(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:b[e.shift]?.label||``,titulo:`Observación: ${t?t.name:v}`,autorAnterior:e.autor||``,migrado:!0}}async function Po(e,t){try{return await g.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function Fo(){if(Ga!==`idle`||!h.token()||!ko()||!navigator.onLine)return;Ga=`running`;let e=0,t=0,n=``,r=Ka(Fa.routes,[]),i=[];for(let a of r){let r=Mo(a);if(!r)continue;let o=await Po(`rutas`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?qa(Fa.routes,i):Ja(Fa.routes);let a=Ka(Fa.observations,[]),o=[];for(let r of a){let i=No(r);if(!i)continue;let a=await Po(`observaciones`,i);a?(o.push(r),t+=1,n=a):e+=1}o.length?qa(Fa.observations,o):Ja(Fa.observations);let s=Ka(Fa.closure,{}),c=Object.entries(s).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&ka.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(c.length){let r=c.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await g.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,o]of c){let[s,c]=a.split(`|`),l=`${s}_${c}`;if(i.has(l))continue;let u=await Po(`cierres`,{id:l,fecha:s,turno:b[c].label,notas:String(o.notas||``),resumen:``,cerrado:!!o.cerrado,horaCierre:o.cerrado?String(o.cerrado):``,migrado:!0});u?(r[a]=o,t+=1,n=u):e+=1}Object.keys(r).length?qa(Fa.closure,r):Ja(Fa.closure)}else t+=c.length}else Ja(Fa.closure);Ga=`done`,(e||t)&&I(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),Do()}function L(){let e=$a(),t=Ka(P.view,{}),n={day:e.dayName,shift:so(e)},r=t.date===e.iso?{...n,...t}:n;x.includes(r.day)||(r.day=n.day),ka.includes(r.shift)||(r.shift=n.shift);let i=r.day===e.dayName,a=i?e.iso:io(r.day,e.iso);return{day:r.day,shift:r.shift,now:e,isToday:i,fecha:a,fechaLabel:to(a)}}function Io(e){qa(P.view,{date:$a().iso,day:e.day,shift:e.shift})}function Lo(e,t=!1){let n=Ka(P.folds,{});return typeof n[e]==`boolean`?n[e]:t}function Ro(e,t,n){return`${e}_${t}_${n}`}function zo(){return new Map(vo(`paseos`).map(e=>[e.id,e]))}function Bo(e){let t=e?.estado||`pendiente`,n=t===`no-sale`,r=[`retirado`,`paseando`,`entregado`].includes(t);return{record:e,estado:t,noSale:n,retirado:r,paseando:t===`paseando`,entregado:t===`entregado`,horaRetiro:r&&e?.horaRetiro||``,horaPaseo:r&&e?.horaPaseo||``,horaEntrega:t===`entregado`&&e?.horaEntrega||``,nota:e?.nota||``}}function Vo(e,t){let n=zo(),r={};return t.forEach(t=>{r[t.id]=Bo(n.get(Ro(e.fecha,t.id,e.shift)))}),r}function Ho(e,t){return vo(`checklists`).filter(n=>n.fecha===e&&(co(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function Uo(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>Wo(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:mo(e.actualizadoPor||e.creadoPor,e),at:ao(e.actualizadoEn||e.creadoEn)}}function Wo(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):v}function Go(e){return vo(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function Ko(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>qo(e)?.name||e);return t.length?Za(t):v}function qo(e){return S.find(t=>t.id===e)}function Jo(e,t){return qt(e,b[t].label)}function Yo(e){return e.safety.some(e=>/bozal/i.test(e))}function Xo(e){return e.safety.find(e=>/bozal/i.test(e))||``}function Zo(e){let t=new Set(e.map(e=>e.name)),n=new Set,r=[];return e.forEach(e=>{(e.incompatibleWith||[]).forEach(i=>{if(!t.has(i))return;let a=[e.name,i].sort().join(`|`);n.has(a)||(n.add(a),r.push([e.name,i]))})}),r}function Qo(e){let t=new Set(e.map(e=>e.size));return{pairs:Zo(e),muzzle:e.filter(Yo),review:e.filter(e=>e.review),inactive:e.filter(e=>e.status!==`Activo`),unevaluated:e.filter(e=>e.category===`SIN EVALUAR`),sizeMix:t.has(`Pequeño`)&&t.has(`Grande`)}}function $o(e){return e.map(([e,t])=>`${e} con ${t}`)}function es(e){let t=Qo(e),n=[];if(t.pairs.length&&n.push({tone:`danger`,icon:`alertTriangle`,title:t.pairs.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${t.pairs.length} parejas que no pueden ir juntas`,lines:$o(t.pairs).map(e=>`No juntar: ${e}.`),action:`Armá grupos o rutas separadas antes de salir.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),t.muzzle.length&&n.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${t.muzzle.length} perro${t.muzzle.length===1?``:`s`}`,lines:t.muzzle.map(e=>`${e.name}: ${Xo(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),t.inactive.length&&n.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${t.inactive.length===1?`sale ${t.inactive[0].name}`:`salen ${t.inactive.length} perros`}`,lines:t.inactive.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),t.review.length){let e=t.review.filter(e=>e.status===`Activo`);e.length&&n.push({tone:`info`,icon:`fileText`,title:`${e.length} perro${e.length===1?` tiene`:`s tienen`} datos a revisar`,lines:e.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${It}.`})}return t.unevaluated.length>1&&n.push({tone:`info`,icon:`eye`,title:`${t.unevaluated.length} perros salen en grupo SIN EVALUAR`,lines:[`${Ht[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),n}function ts(e){let t=Array.isArray(e.conflictos)?e.conflictos:e.conflictos?[String(e.conflictos)]:[];return{id:e.id,record:e,route:e.ruta||`Pendiente de confirmar`,walker:e.paseador||Aa[0],dogIds:Array.isArray(e.perros)?e.perros:[],notes:e.notas||``,conflicts:t,reason:e.medida||``}}function ns(e,t){return vo(`rutas`).filter(n=>n.fecha===e&&co(n.turno)===t).sort((e,t)=>String(e.ruta||``).localeCompare(String(t.ruta||``))||String(e.creadoEn||``).localeCompare(String(t.creadoEn||``))).map(ts)}function rs(e){return{day:e.day,fecha:e.fecha,shift:e.shift,route:lo(e.shift)[0],walker:Aa[0],dogIds:[],notes:``,confirm:!1,reason:``,showAll:!1,editingId:null}}function is(e){let t=Ka(P.routeDraft,{});if(t.day!==e.day||t.shift!==e.shift||t.fecha&&t.fecha!==e.fecha)return rs(e);let n={...rs(e),...t,fecha:e.fecha};return n.dogIds=Array.isArray(n.dogIds)?n.dogIds.filter(e=>qo(e)):[],lo(e.shift).includes(n.route)||(n.route=lo(e.shift)[0]),Aa.includes(n.walker)||(n.walker=Aa[0]),n.editingId&&!ns(e.fecha,e.shift).some(e=>e.id===n.editingId)&&(n.editingId=null),n}function as(e){qa(P.routeDraft,e)}function os(e){let t=e.dogIds.map(qo).filter(Boolean),n=Qo(t),r=new Set(Jo(e.day,e.shift).map(e=>e.id)),i=ns(e.fecha,e.shift).filter(t=>t.id!==e.editingId),a=[],o=[];if($o(n.pairs).forEach(e=>a.push({tone:`danger`,text:`Incompatibles: ${e}. No pueden ir en la misma ruta.`})),n.sizeMix){let e=t.filter(e=>e.size===`Pequeño`).map(e=>e.name),n=t.filter(e=>e.size===`Grande`).map(e=>e.name);a.push({tone:`warn`,text:`Tamaños mezclados: pequeños (${e.join(`, `)}) con grandes (${n.join(`, `)}).`})}return n.muzzle.forEach(e=>o.push({tone:`warn`,text:`${e.name}: ${Xo(e)}. Confirmá el bozal antes de salir.`})),n.inactive.forEach(e=>o.push({tone:`warn`,text:`${e.name} figura como «${e.status}». Confirmá con Juan antes de sumarlo.`})),t.filter(e=>!r.has(e.id)).forEach(t=>o.push({tone:`info`,text:`${t.name} no figura en BASE RUTAS para ${e.day} a la ${b[e.shift].label.toLowerCase()}.`})),t.forEach(e=>{let t=i.find(t=>t.dogIds.includes(e.id));t&&o.push({tone:`info`,text:`${e.name} ya está en la ruta ${t.route} guardada para este turno.`})}),{dogs:t,conflicts:a,warnings:o}}var ss=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function cs(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function ls(e){return{...cs(e),...Ka(P.observationDraft,{})}}function us(){let e=go(`observaciones`).desde;return vo(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function ds(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${fo().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function fs(e){return[`Observación de conducta — ${y.name}`,`Perro: ${e.perroNombre||qo(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${to(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${ds(e)}`].join(`
`)}function ps(e){return`${e.fecha}_${e.shift}`}function ms(e){return vo(`cierres`).find(t=>t.id===ps(e))||null}function hs(e){return za&&za.id===ps(e)?za.notas:ms(e)?.notas||``}function gs(e,t,n){let r=b[e.shift],i=Vo(e,t),a=n||ms(e),o=Qo(t),s=ns(e.fecha,e.shift),c=t.filter(e=>!i[e.id].noSale),l=c.filter(e=>i[e.id].retirado),u=c.filter(e=>i[e.id].entregado),d=t.filter(e=>i[e.id].noSale),f=c.filter(e=>!i[e.id].entregado),ee=us().filter(t=>t.fecha===e.fecha&&co(t.turno)===e.shift),te=Go(e.fecha),ne=Ho(e.fecha,e.shift).map(Uo),re=hs(e),ie=fo(),ae=[`Cierre de turno — ${y.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${r.label} (${r.from} a ${r.to} hs) · Supervisó: ${ie.nombre||`Pendiente de confirmar`}${ie.nombre===r.supervisor?``:` (según planilla: ${r.supervisor})`}`,`Rutas: ${lo(e.shift).join(` y `)}`,...s.map(e=>`- ${e.route} (${e.walker}): ${e.dogIds.map(e=>qo(e)?.name).filter(Boolean).join(`, `)}${e.conflicts.length?` · conflicto confirmado, medida: ${e.reason||`Pendiente de confirmar`}`:``}`),`Perros previstos: ${t.length}`,`Retirados: ${l.length} de ${c.length} · Entregados: ${u.length} de ${c.length}`,`No salieron: ${d.length?d.map(e=>e.name).join(`, `):`ninguno`}`,`Sin entrega marcada: ${f.length?f.map(e=>e.name).join(`, `):`ninguno`}`,`Checklist del paseador: ${ne.length?ne.map(e=>`${e.who}: ${e.complete?`equipo completo`:`incompleto${e.missing.length?` (falta ${e.missing.join(`, `)})`:``}`}`).join(`; `):`sin cargar`}`,`Incidentes del día: ${te.length?te.map(e=>`${e.hora||`sin hora`} ${e.titulo||Ko(e)}`).join(`; `):`ninguno cargado`}`,`Seguridad del turno:`,`- No juntar: ${o.pairs.length?$o(o.pairs).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${o.muzzle.length?o.muzzle.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${ee.length}`,`Notas del supervisor: ${re.trim()||`sin notas`}`];return a?.cerrado&&ae.push(`Turno cerrado a las ${a.horaCierre||ao(a.actualizadoEn)||`Pendiente de confirmar`} hs por ${mo(a.actualizadoPor,a)||`Pendiente de confirmar`}.`),ae.join(`
`)}function _s(e){return`
    <div class="sv-shell">
      ${vs()}
      ${e}
    </div>
  `}function vs(){let e=fo();return`
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
      <div class="sv-header-end">
        <p class="sv-user">
          <strong>${F(e.nombre||`Pendiente de confirmar`)}</strong>
          <small>${F(Pa[e.rol]||e.rol||``)}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${p(`logOut`,`sv-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function ys(){_o();let e=L(),t=Jo(e.day,e.shift),n=`
    <main class="sv-main" id="sv-main">
      ${bs()}
      ${xs(e)}
      ${Cs(e,t)}
      ${ws(e,t)}
      ${Ds(e,t)}
      ${ks(e)}
      ${js(e,t)}
      ${Ns(e,t)}
      ${Ps()}
    </main>
  `;return Ia=null,Ga===`idle`&&ko()&&setTimeout(Fo,0),n}function bs(){let e=g.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=t||e?`warn`:`ok`,r=`${e} cambio${e===1?` espera`:`s esperan`} señal para enviarse.`,i=t?`Sin señal: ves lo último guardado en este teléfono.${e?` ${r}`:``}`:e?r:`Datos compartidos con el equipo. Se actualizan solos cada minuto.`;return`
    <section class="sv-sync is-${n}" aria-label="Estado de los datos">
      <p class="sv-sync-text">${p(t||e?`uploadCloud`:`radio`,`sv-icon`)} <span>${F(i)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${Xa(`sync`)}
    </section>
  `}function xs(e){let t=e.now.iso,n=Go(t);return n.length?`
    <section class="sv-card sv-incidents" aria-labelledby="sv-incidents-title">
      <div class="sv-section-head">
        <h2 id="sv-incidents-title" class="sv-title">${p(`alertTriangle`,`sv-icon`)} ${n.length===1?`Hay 1 incidente cargado hoy`:`Hay ${n.length} incidentes cargados hoy`}</h2>
        <p>${e.isToday?``:`Son de hoy, ${e.now.label}. `}${n.length===1?`Revisalo`:`Revisalos`} antes de seguir con el turno.</p>
      </div>
      <ul class="sv-incident-list">
        ${n.map(e=>`
          <li class="sv-incident">
            <div class="sv-saved-head">
              <strong>${F(e.titulo||`Incidente`)}</strong>
              <span>${e.hora?`${F(e.hora)} hs · `:``}${F(Ko(e))}${e.lugar?` · ${F(e.lugar)}`:``}</span>
            </div>
            ${e.riesgo||e.lesiones?`
              <p class="sv-chips">
                ${e.riesgo?`<span class="sv-tag is-danger">Riesgo: ${F(e.riesgo)}</span>`:``}
                ${e.lesiones?`<span class="sv-tag is-warn">Lesiones: ${F(e.lesiones)}</span>`:``}
              </p>
            `:``}
            <dl class="sv-obs-detail">
              ${[[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Protocolo`,e.protocolo]].filter(([,e])=>e).map(([e,t])=>`<div><dt>${e}</dt><dd>${F(t)}</dd></div>`).join(``)}
            </dl>
            <p class="sv-source">${F(ho(e,`Cargó`))}</p>
          </li>
        `).join(``)}
      </ul>
    </section>
  `:``}function Ss(e){if(!e.isToday)return``;let t=Ho(e.fecha,e.shift);return t.length?`
    <div class="sv-team-check">
      ${t.map(e=>{let t=Uo(e);return`
          <p class="sv-note ${e.pendiente?`is-info`:t.complete?`is-ok`:`is-danger`}">
            ${p(t.complete?`checkCircle`:`alertTriangle`,`sv-icon`)}
            <strong>Checklist de ${F(t.who||`Pendiente de confirmar`)}:</strong>
            ${t.complete?`salió con el equipo completo.`:`equipo incompleto${t.missing.length?`. Falta: ${F(t.missing.join(`, `))}`:``}.`}
            ${t.at?`<small>(${F(t.at)} hs)</small>`:``}
          </p>
        `}).join(``)}
    </div>
  `:`
      <div class="sv-team-check sv-note ${e.now.minutes>=Qa(b[e.shift].from)?`is-warn`:`is-info`}">
        <strong>Checklist de salida:</strong> el paseador todavía no lo cargó para este turno.
      </div>
    `}function Cs(e,t){let n=b[e.shift],r=fo(),i=e.isToday?uo(e.shift,e.now):null,a=e.shift===`manana`?`tarde`:`manana`,o=Jo(e.day,a).length,s=ns(e.fecha,e.shift),c=lo(e.shift),l=t.filter(e=>e.status===`Activo`).length;return`
    <section class="sv-hero" aria-labelledby="sv-hero-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">${e.isToday?`Hoy · ${F(e.day)} ${e.now.label}`:`Planificación · ${F(e.day)} ${e.fechaLabel}`}</p>
          <h1 id="sv-hero-title">Turno ${n.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${n.from} a ${n.to} hs · Supervisa <strong>${F(r.nombre||`Pendiente de confirmar`)}</strong>
            ${i?`<span class="sv-moment is-${i.tone}">${i.label}</span>`:``}
          </p>
          ${r.nombre===n.supervisor?``:`<p class="sv-source">Según la planilla, este turno lo supervisa ${F(n.supervisor)}.</p>`}
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno">
            ${ka.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${b[t].label}
                <small>${Jo(e.day,t).length} perros</small>
              </button>
            `).join(``)}
          </div>
          <label class="sv-field sv-field-inline" for="sv-day">Día
            <select id="sv-day" data-sv-day>
              ${x.map(t=>`<option value="${t}" ${t===e.day?`selected`:``}>${t}${t===e.now.dayName?` (hoy)`:``}</option>`).join(``)}
            </select>
          </label>
          ${e.isToday?``:`<button type="button" class="sv-button sv-button-quiet" id="sv-today" data-sv-today>Volver a hoy</button>`}
        </div>
      </div>

      ${e.isToday?``:`
        <p class="sv-note is-info">Estás mirando ${F(e.day)} ${e.fechaLabel} para planificar. El control de retiro y entrega se usa solo el día de hoy.</p>
      `}

      ${Ss(e)}

      <dl class="sv-stats">
        <div><dt>Perros en el turno</dt><dd>${t.length}${l===t.length?``:` <small>(${l} activos)</small>`}</dd></div>
        <div><dt>Turno ${b[a].label.toLowerCase()}</dt><dd>${o} <small>perros</small></dd></div>
      </dl>

      <ul class="sv-route-list" aria-label="Rutas del turno">
        ${c.map(e=>{let n=s.find(t=>t.route===e),r=n?`${n.dogIds.length} perros (ruta armada)`:c.length===1?`${t.length} perros`:`Reparto: ${v}`;return`
            <li>
              <span class="sv-route-code">${e}</span>
              <span class="sv-route-walker">${p(`userCheck`,`sv-icon`)} ${F(n?.walker||Aa[0])}</span>
              <span class="sv-route-count">${r}</span>
            </li>
          `}).join(``)}
      </ul>
      ${c.length>1&&s.length<c.length?`
        <p class="sv-hint">La planilla no dice qué perros van en cada ruta de la tarde: armalas en «Armar rutas del turno».</p>
      `:``}
    </section>
  `}function ws(e,t){if(!t.length)return`
      <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
        <h2 id="sv-safety-title" class="sv-title">${p(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p class="sv-empty">No hay perros cargados en BASE RUTAS para ${F(e.day)} a la ${b[e.shift].label.toLowerCase()}.</p>
      </section>
    `;let n=es(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${p(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Lo primero que tenés que resolver antes de salir. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>Ts(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos" ${Lo(`avisos`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>Ts(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function Ts(e,t){return`
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
  `}function Es(e){let t=e.safety.map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?F(e):`<b>${F(e)}</b>`}</li>`});return e.status!==`Activo`&&t.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${F(e.status)}</li>`),e.review&&t.push(`<li class="sv-chip is-info"><b>Dato a revisar</b></li>`),e.category!==`SIN EVALUAR`&&t.push(`<li class="sv-chip is-neutral"><b>${F(e.category)}</b> · ${F(e.categorySource)}</li>`),t.length?`<ul class="sv-chips" aria-label="Avisos de ${F(e.name)}">${t.join(``)}</ul>`:``}function Ds(e,t){let n=Lo(`perros`,!0),r=Vo(e,t),i=t.filter(e=>!r[e.id].noSale),a=i.filter(e=>r[e.id].retirado).length,o=i.filter(e=>r[e.id].entregado).length,s=t.length-i.length,c=t.length&&t.every(e=>e.category===`SIN EVALUAR`);return`
    <details class="sv-fold" data-sv-fold="perros" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`clipboardCheck`,`sv-icon`)} Perros del turno: retiro y entrega</span>
        <span class="sv-fold-meta">${e.isToday?`Retirados ${a}/${i.length} · Entregados ${o}/${i.length}`:`${t.length} perros`}</span>
      </summary>
      <div class="sv-fold-body">
        ${t.length?`
          ${e.isToday?`
            <div class="sv-progress" aria-hidden="true"><span style="width:${i.length?Math.round(o/i.length*100):0}%"></span></div>
            <p class="sv-hint">Tocá «Retirado» al levantar a cada perro y «Entregado» al dejarlo. Es el mismo registro que marca el paseador desde su celular: lo que marca uno lo ve el otro.${s?` No salen hoy: ${s}.`:``}</p>
          `:``}
          ${c?`<p class="sv-hint">Categoría de todos: <strong>SIN EVALUAR</strong> · Fuente: Registro maestro de perros, 14/08/2026.</p>`:``}
          <ul class="sv-dog-list">
            ${t.map(t=>Os(t,r[t.id],e)).join(``)}
          </ul>
          ${Xa(`control`)}
        `:`<p class="sv-empty">No hay perros para este día y turno.</p>`}
      </div>
    </details>
  `}function Os(e,t,n){let r=n.isToday,i=t.noSale,a=Ba.has(Ro(n.fecha,e.id,n.shift)),o=[t.horaRetiro?`Retiro ${t.horaRetiro} hs`:``,t.horaPaseo?`Paseo ${t.horaPaseo} hs`:``,t.horaEntrega?`Entrega ${t.horaEntrega} hs`:``].filter(Boolean),s=r&&t.record?`
    <div class="sv-dog-meta">
      ${t.paseando?`<p class="sv-tag is-info">Paseando ahora</p>`:``}
      ${o.length?`<p>${F(o.join(` · `))}</p>`:``}
      ${t.nota?`<p><b>Nota:</b> ${F(t.nota)}</p>`:``}
      <p class="sv-source">${F(ho(t.record))}</p>
    </div>
  `:``;return`
    <li class="sv-dog ${i?`is-absent`:``} ${t.entregado?`is-done`:``}">
      <div class="sv-dog-info">
        <div class="sv-dog-head">
          <h3>${F(e.name)}</h3>
          ${r&&!i&&!t.retirado?`<button type="button" class="sv-link" id="sv-absent-${e.id}" data-sv-absent="${e.id}" aria-label="${F(e.name)} no sale hoy">No sale hoy</button>`:``}
        </div>
        <p>${F(e.size)} · ${e.minutes?`${e.minutes} min`:v} · ${F(e.plan)}</p>
        ${Es(e)}
      </div>
      ${r?`
        <div class="sv-dog-actions" ${a?`aria-busy="true"`:``}>
          ${i?`
            <p class="sv-dog-state">No sale hoy</p>
            <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${e.id}" data-sv-absent="${e.id}" aria-label="Deshacer: ${F(e.name)} sí sale hoy">Deshacer</button>
          `:`
            <button type="button" class="sv-button ${t.retirado?`is-checked`:`sv-button-primary`}" id="sv-pickup-${e.id}" data-sv-pickup="${e.id}" aria-pressed="${t.retirado}" aria-label="${t.retirado?`Desmarcar retiro de ${F(e.name)}`:`Marcar a ${F(e.name)} como retirado`}">
              ${t.retirado?`${p(`checkCircle`,`sv-icon`)} Retirado ${F(t.horaRetiro)}`:`Retirado`}
            </button>
            <button type="button" class="sv-button ${t.entregado?`is-checked`:``}" id="sv-deliver-${e.id}" data-sv-deliver="${e.id}" aria-pressed="${t.entregado}" ${t.retirado?``:`disabled`} aria-label="${t.entregado?`Desmarcar entrega de ${F(e.name)}`:`Marcar a ${F(e.name)} como entregado`}">
              ${t.entregado?`${p(`checkCircle`,`sv-icon`)} Entregado ${F(t.horaEntrega)}`:`Entregado`}
            </button>
          `}
          ${s}
        </div>
      `:``}
    </li>
  `}function ks(e){let t=Lo(`rutas`),n=is(e),r=os(n),i=ns(e.fecha,e.shift),a=new Set(Jo(e.day,e.shift).map(e=>e.id)),o=n.showAll?S:S.filter(e=>a.has(e.id)||n.dogIds.includes(e.id)),s=i.filter(e=>e.id!==n.editingId),c=r.conflicts.length>0,l=`${F(e.day)} ${e.fechaLabel} · ${b[e.shift].label.toLowerCase()}`;return`
    <details class="sv-fold" data-sv-fold="rutas" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`route`,`sv-icon`)} Armar rutas del turno</span>
        <span class="sv-fold-meta">${i.length?`${i.length} guardada${i.length===1?``:`s`}`:`Sin rutas armadas`}</span>
      </summary>
      <div class="sv-fold-body">
        ${i.length?`
          <h3 class="sv-subtitle">Rutas guardadas · ${l}</h3>
          <ul class="sv-saved-routes">
            ${i.map(e=>As(e)).join(``)}
          </ul>
        `:``}

        <form class="sv-builder" data-sv-route-form novalidate>
          <h3 class="sv-subtitle">${n.editingId?`Editar ruta`:`Nueva ruta`} · ${l}</h3>
          <div class="sv-form-grid">
            <label class="sv-field" for="sv-route-code">Ruta
              <select id="sv-route-code" data-sv-route-field="route">
                ${lo(e.shift).map(e=>`<option ${e===n.route?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label class="sv-field" for="sv-route-walker">Paseador
              <select id="sv-route-walker" data-sv-route-field="walker">
                ${Aa.map(e=>`<option ${e===n.walker?`selected`:``}>${e}</option>`).join(``)}
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
                ${o.map(e=>{let t=n.dogIds.includes(e.id),r=s.find(t=>t.dogIds.includes(e.id)),i=[Yo(e)?`<span class="sv-tag is-warn">Bozal</span>`:``,e.incompatibleWith?.length?`<span class="sv-tag is-danger">No juntar con ${F(Za(e.incompatibleWith,`ni`))}</span>`:``,e.status===`Activo`?``:`<span class="sv-tag is-danger">${F(e.status)}</span>`,a.has(e.id)?``:`<span class="sv-tag is-info">Fuera de este turno</span>`,r?`<span class="sv-tag is-neutral">Ya en ${F(r.route)}</span>`:``].join(``);return`
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
          ${Xa(`route`)}
        </form>
      </div>
    </details>
  `}function As(e){let t=e.dogIds.map(e=>qo(e)?.name).filter(Boolean),n=La===e.id,r=e.record,i=r.pendiente?`Se enviará cuando haya señal.`:`Armó ${r.creadoPorNombre||`Pendiente de confirmar`}${r.creadoEn?` a las ${ao(r.creadoEn)} hs`:``}${r.actualizadoPor&&r.actualizadoPor!==r.creadoPor?` · Cambió ${mo(r.actualizadoPor,r)} a las ${ao(r.actualizadoEn)} hs`:``}.`;return`
    <li class="sv-saved ${e.conflicts.length?`has-conflict`:``}">
      <div class="sv-saved-head">
        <strong>${F(e.route)}</strong>
        <span>${F(e.walker)} · ${t.length} perros</span>
      </div>
      <p>${t.map((e,t)=>`${t+1}. ${F(e)}`).join(` · `)}</p>
      ${e.conflicts.length?`
        <div class="sv-note is-warn">
          <strong>Guardada con conflicto confirmado.</strong>
          <ul>${e.conflicts.map(e=>`<li>${F(e)}</li>`).join(``)}</ul>
          <span>Medida: ${F(e.reason||`Pendiente de confirmar`)}</span>
        </div>
      `:``}
      ${e.notes?`<p class="sv-hint">Notas: ${F(e.notes)}</p>`:``}
      <p class="sv-source">${F(i)}</p>
      <div class="sv-actions">
        ${n?`
          <button type="button" class="sv-button sv-button-danger" id="sv-route-del-ok-${e.id}" data-sv-route-delete-ok="${e.id}">Sí, borrar ${F(e.route)}</button>
          <button type="button" class="sv-button" id="sv-route-del-no-${e.id}" data-sv-route-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-route-edit-${e.id}" data-sv-route-edit="${e.id}">Editar</button>
          ${po(r)?`<button type="button" class="sv-button" id="sv-route-del-${e.id}" data-sv-route-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function js(e,t){let n=Lo(`observaciones`),r=ls(e),i=us(),a=new Set(t.map(e=>e.id)),o=S.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} en ${Na} días`:`Sin registros`}</span>
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
          ${ss.map(e=>`
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
          ${Xa(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${Na} días</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>Ms(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function Ms(e){let t=Ra===e.id,n=e.perroNombre||qo(e.perroId)?.name||`Pendiente de confirmar`;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${F(n)}</strong>
        <span>${F(to(e.fecha))}${e.hora?` · ${F(e.hora)} hs`:``}${e.lugar?` · ${F(e.lugar)}`:``}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${F(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Reacción</dt><dd>${F(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${F(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Resultado</dt><dd>${F(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${F(ds(e))}</p>
      <div class="sv-actions">
        ${t?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${p(`copy`,`sv-icon`)} Copiar texto</button>
          ${po(e)?`<button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function Ns(e,t){let n=Lo(`cierre`),r=ms(e);if(!e.isToday)return`
      <details class="sv-fold" data-sv-fold="cierre" ${n?`open`:``}>
        <summary>
          <span class="sv-fold-title">${p(`flag`,`sv-icon`)} Cerrar el turno</span>
          <span class="sv-fold-meta">Solo para hoy</span>
        </summary>
        <div class="sv-fold-body">
          <p class="sv-empty">El cierre se hace el mismo día del turno. Tocá «Volver a hoy».</p>
        </div>
      </details>
    `;let i=gs(e,t),a=r?.cerrado?r.horaCierre||ao(r.actualizadoEn):``;return`
    <details class="sv-fold" data-sv-fold="cierre" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`flag`,`sv-icon`)} Cerrar el turno</span>
        <span class="sv-fold-meta">${r?.cerrado?`Cerrado ${F(a)} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        ${r?`<p class="sv-source">${F(r.cerrado?ho(r,`Lo cerró`):ho(r,`Última nota de`))}</p>`:``}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${F(hs(e))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar
          <textarea id="sv-close-summary" class="sv-summary" rows="14" readonly>${F(i)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${p(`copy`,`sv-icon`)} Copiar resumen</button>
          ${r?.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${p(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${Xa(`closure`)}
      </div>
    </details>
  `}function Ps(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${Lo(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(Ht).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas, días y turnos: ${y.officialSources.routes}, leída el ${It}.</li>
          <li>Perros: ${y.officialSources.dogs}.</li>
          <li>Qué perros van en PJ_1T y en PJ_2T: ${v}.</li>
          <li>Retiros, rutas, observaciones y cierres se comparten con el equipo (paseador, coordinación y Juan, según permisos). Incidentes y checklist los carga el paseador.</li>
        </ul>
      </div>
    </details>
  `}function R(e){if(!e)return Eo();To(),$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function Fs(){return $a().time}async function Is(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}async function Ls(e,t,n){let r=L();if(!r.isToday)return;let i=qo(e);if(!i)return;let a=Ro(r.fecha,e,r.shift);if(Ba.has(a))return;let o=Bo(zo().get(a)),s=Fs(),c={horaRetiro:``,horaPaseo:``,horaEntrega:``},l=null,u=``,d=`ok`;if(t===`retiro`)o.retirado?(l={estado:`pendiente`,...c},u=`${i.name}: retiro desmarcado.`,d=`info`):(l={estado:`retirado`,horaRetiro:s},u=`${i.name}: retirado a las ${s} hs.`);else if(t===`entrega`){if(!o.retirado)return;o.entregado?(l={estado:o.horaPaseo?`paseando`:`retirado`,horaEntrega:``},u=`${i.name}: entrega desmarcada.`,d=`info`):(l={estado:`entregado`,horaEntrega:s},u=`${i.name}: entregado a las ${s} hs.`)}else if(t===`no-sale`){if(o.noSale)l={estado:`pendiente`},u=`${i.name}: vuelve a la lista.`;else{if(o.retirado)return;l={estado:`no-sale`,...c},u=`${i.name}: no sale hoy.`}}l&&(Ba.add(a),await yo(`paseos`,{id:a,fecha:r.fecha,perroId:i.id,perroNombre:i.name,turno:b[r.shift].label,...l},`control`,u,d),Ba.delete(a),R(n))}async function Rs(){let e=L(),t=is(e),n=os(t);if(!n.dogs.length)return I(`route`,`Elegí al menos un perro para guardar la ruta.`,`error`),R(`sv-route-save`);if(n.conflicts.length&&!t.confirm)return I(`route`,`La ruta tiene conflictos: marcá «Revisé el conflicto» para guardarla igual.`,`error`),R(`sv-route-confirm`);if(n.conflicts.length&&!t.reason.trim())return I(`route`,`Escribí qué medida vas a tomar para guardar una ruta con conflicto.`,`error`),R(`sv-route-reason`);let r=b[e.shift].label,i=n.conflicts.map(e=>e.text),a={fecha:e.fecha,turno:r,ruta:t.route,paseador:t.walker,perros:n.dogs.map(e=>e.id),conflictos:i,medida:i.length?t.reason.trim():``,notas:t.notes.trim(),titulo:`Ruta ${t.route} · ${r} · ${e.fechaLabel}${i.length?` · con conflicto confirmado`:``}`};return t.editingId&&(a.id=t.editingId),await yo(`rutas`,a,`route`,`Ruta ${t.route} guardada con ${a.perros.length} perros${i.length?` (conflicto confirmado)`:``}. La ve el equipo.`)&&as(rs(e)),R(`sv-route-save`)}async function zs(e){let t=L(),n=ls(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),qa(P.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),ss.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())});let i=no(n.fecha);if(!r.length&&!i)return I(`observation`,`Escribí una fecha real como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),R(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return I(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),R(`sv-obs-fecha`);if(r.length)return I(`observation`,`Falta completar: ${Za(r)}.`,`error`),R(n.dogId?n.fecha?`sv-obs-${ss.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=ss.find(e=>ja.test(n[e.key]));if(a){let e=n[a.key].match(ja)[2];return I(`observation`,`En «${a.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),R(`sv-obs-${a.key}`)}let o=qo(n.dogId);return await yo(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:b[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada. La ve el equipo.`)&&qa(P.observationDraft,cs(t)),R(`sv-obs-save`)}async function Bs(e,t,n,r){let i=ps(e),a=hs(e),o=fo(),s={...ms(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoPorNombre:o.nombre,actualizadoEn:new Date().toISOString(),pendiente:!1},c=gs(e,Jo(e.day,e.shift),s);await yo(`cierres`,{id:i,fecha:e.fecha,turno:b[e.shift].label,notas:a,resumen:c,...t},`closure`,n,t.cerrado===!1?`info`:`ok`)&&za?.id===i&&za.notas===a&&(za=null),R(r)}function Vs(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return Cf(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return So(!0),!0;let n=t.closest(`[data-sv-shift]`);if(n)return Io({...L(),shift:n.dataset.svShift}),R(n.id),!0;if(t.closest(`[data-sv-today]`)){let e=$a();return Io({day:e.dayName,shift:so(e)}),R(`sv-day`),!0}let r=t.closest(`[data-sv-pickup]`);if(r)return Ls(r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return Ls(i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=a.dataset.svAbsent,t=L(),n=Bo(zo().get(Ro(t.fecha,e,t.shift))).noSale;return Ls(e,`no-sale`,n?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-order]`);if(o){let e=is(L()),t=e.dogIds,n=t.indexOf(o.dataset.dog),r=o.dataset.svOrder===`up`?n-1:n+1;n>=0&&r>=0&&r<t.length&&([t[n],t[r]]=[t[r],t[n]],as(e));let i=t.indexOf(o.dataset.dog);return R((o.dataset.svOrder===`up`?i===0:i===t.length-1)?`sv-${o.dataset.svOrder===`up`?`down`:`up`}-${o.dataset.dog}`:o.id),!0}if(t.closest(`[data-sv-route-reset]`))return as(rs(L())),I(`route`,`Borrador vacío.`,`info`),R(`sv-route-code`),!0;let s=t.closest(`[data-sv-route-edit]`);if(s){let e=L(),t=ns(e.fecha,e.shift).find(e=>e.id===s.dataset.svRouteEdit);return t&&(as({day:e.day,fecha:e.fecha,shift:e.shift,route:t.route,walker:t.walker,dogIds:[...t.dogIds],notes:t.notes||``,confirm:!1,reason:t.reason||``,showAll:!1,editingId:t.id}),I(`route`,`Editando ${t.route}. Si sigue con conflicto, vas a tener que confirmarlo de nuevo.`,`info`)),R(`sv-route-code`),!0}let c=t.closest(`[data-sv-route-delete]`);if(c)return La=c.dataset.svRouteDelete,R(`sv-route-del-no-${La}`),!0;let l=t.closest(`[data-sv-route-delete-ok]`);if(l){let e=l.dataset.svRouteDeleteOk,t=L(),n=ns(t.fecha,t.shift).find(t=>t.id===e);return La=null,xo(`rutas`,e,`route`,`Ruta ${n?.route||``} borrada.`).then(n=>{n&&is(t).editingId===e&&as(rs(t)),R(`sv-route-code`)}),!0}if(t.closest(`[data-sv-route-delete-cancel]`)){let e=La;return La=null,R(`sv-route-del-${e}`),!0}let u=t.closest(`[data-sv-obs-copy]`);if(u){let e=us().find(e=>e.id===u.dataset.svObsCopy);return e&&Is(fs(e)).then(e=>{I(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),R(u.id)}),!0}let d=t.closest(`[data-sv-obs-delete]`);if(d)return Ra=d.dataset.svObsDelete,R(`sv-obs-del-no-${Ra}`),!0;let f=t.closest(`[data-sv-obs-delete-ok]`);if(f)return Ra=null,xo(`observaciones`,f.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>R(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=Ra;return Ra=null,R(`sv-obs-del-${e}`),!0}if(t.closest(`[data-sv-close-copy]`)){let e=L();return Is(gs(e,Jo(e.day,e.shift)),`sv-close-summary`).then(e=>{I(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),R(`sv-close-copy`)}),!0}return t.closest(`[data-sv-close-done]`)?(Bs(L(),{cerrado:!0,horaCierre:Fs()},`Turno marcado como cerrado. No te olvides de copiar el resumen.`,`sv-close-copy`),!0):t.closest(`[data-sv-close-reopen]`)?(Bs(L(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0):!1}function Hs(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.matches(`[data-sv-day]`))return Io({...L(),day:t.value}),R(`sv-day`),!0;let n=L();if(t.matches(`[data-sv-route-field]`)){let e=is(n);return e[t.dataset.svRouteField]=t.value,as(e),t.tagName===`SELECT`&&R(t.id),!0}if(t.matches(`[data-sv-route-all]`)){let e=is(n);return e.showAll=t.checked,as(e),R(t.id),!0}if(t.matches(`[data-sv-route-dog]`)){let e=is(n),r=t.dataset.svRouteDog;return e.dogIds=t.checked?[...new Set([...e.dogIds,r])]:e.dogIds.filter(e=>e!==r),e.confirm=!1,as(e),R(t.id),!0}if(t.matches(`[data-sv-route-confirm]`)){let e=is(n);return e.confirm=t.checked,as(e),!0}if(t.matches(`[data-sv-obs]`)){let e=ls(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,qa(P.observationDraft,e),!0}return t.matches(`[data-sv-close-notes]`)?!n.isToday||(za={id:ps(n),notas:t.value},t.value===(ms(n)?.notas||``)?(za=null,!0):(Bs(n,{},`Notas del cierre guardadas.`),!0)):!1}function Us(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=L();if(t.matches(`[data-sv-route-field]`)&&t.tagName!==`SELECT`){let e=is(n);e[t.dataset.svRouteField]=t.value,as(e)}else if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=ls(n);e[t.dataset.svObs]=t.value,qa(P.observationDraft,e)}else if(t.matches(`[data-sv-close-notes]`)){za={id:ps(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=gs(n,Jo(n.day,n.shift)))}}function Ws(e){let t=e.target;t.matches?.(`[data-sv-route-form]`)?(e.preventDefault(),Rs()):t.matches?.(`[data-sv-obs-form]`)&&(e.preventDefault(),zs(t))}function Gs(e){let t=e.target;if(!t.matches?.(`[data-sv-fold]`))return;let n=Ka(P.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,qa(P.folds,n))}function Ks(){be.push(Vs),xe.push(Hs),document.addEventListener(`input`,Us),document.addEventListener(`submit`,Ws),document.addEventListener(`toggle`,Gs,!0),Oo()}var z={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,pagos:`paseosJuan_coord_pagos`,borradores:`paseosJuan_coord_borradores`},qs=`paseosJuan_coord_secciones`;function Js(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function Ys(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Xs(e){try{localStorage.removeItem(e)}catch{}}var Zs=null,Qs=null;function $s(e,t,n=`ok`){Zs={section:e,text:t,tone:n},n===`error`?rc(t):nc(t)}function ec(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function tc(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function nc(e){tc(ec(`coord-live`,`status`,`polite`),e)}function rc(e){tc(ec(`coord-alerta`,`alert`,`assertive`),e)}var ic=`America/Argentina/Buenos_Aires`;function B(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function ac(){return new Date(new Date().toLocaleString(`en-US`,{timeZone:ic}))}function oc(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function sc(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:ic,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function cc(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(i,r-1,n));return a.getUTCFullYear()!==i||a.getUTCMonth()!==r-1||a.getUTCDate()!==n?null:`${i}-${String(r).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`}function lc(){return oc(_())}function uc(){return _(new Date(Date.now()-5184e5))}function dc(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}var fc={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function pc(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>fc[e]).join(`, `):`Sin días en rutas`}function mc(e){let t=ol.map(t=>{let n=x.filter(n=>Kt(e,n,t));return n.length?`${t.toLowerCase()}: ${pc(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function hc(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function gc(e,t=!1){let n=Js(qs,{});return e in n?!!n[e]:t}function _c(e,t){Ys(qs,{...Js(qs,{}),[e]:t})}var vc=new Set;function yc(){return document.documentElement.dataset.motion===`calm`}function bc(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:yc()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}function xc(){return h.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}var Sc=[`pedidos`,`fichas`,`resueltos`,`pagos`],Cc=[`observaciones`,`incidentes`];function wc(e){return Cc.includes(e)?{desde:uc()}:{}}function Tc(e){return g.cached(e,wc(e))}var Ec=new Set,Dc=new Map,Oc=new Map,kc=!1,Ac=!1;function jc(){kc||(kc=!0,nt(e=>{[...Sc,...Cc].includes(e)&&(Ec.add(e),Dc.delete(e),Pc())}),window.addEventListener(`online`,Pc),window.addEventListener(`offline`,Pc))}function Mc(){let e=h.user();e&&[...Sc,...Cc].forEach(t=>{let n=wc(t),r=`${e.usuario}|${n.desde||``}`,i=Oc.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};Oc.set(t,a),g.list(t,n).then(()=>{Ec.add(t),Dc.delete(t)}).catch(e=>{e.status!==401&&(Dc.set(t,e.message),rc(e.message))}).finally(()=>{Oc.get(t)===a&&(a.stop=g.watch(t,n)),Pc(),rl()})})}function Nc(){[...Oc.values()].forEach(e=>e.stop?.()),Oc.clear(),Dc.clear(),Mc()}function Pc(){Ac||(Ac=!0,requestAnimationFrame(()=>{Ac=!1,document.querySelector(`.coord-shell`)&&Fc()}))}function Fc(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;gl.has(t)||(hl[t]=bl(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function Ic(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}var Lc=[`nuevo`,`en-curso`,`resuelto`];function Rc(e){return e.estado===`curso`?`en-curso`:Lc.includes(e.estado)?e.estado:`nuevo`}function zc(){return Tc(`pedidos`).slice().sort(Ic)}function Bc(){return Tc(`fichas`).slice().sort(Ic)}function Vc(){return Tc(`pagos`).slice().sort(Ic)}function Hc(){let e={};return Tc(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function Uc(e){return e.datos?.perro||e.perro||``}function Wc(e){return e.filter(e=>e.origen===`web`&&Rc(e)===`nuevo`)}function Gc(e){let t=h.user();return!t||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function Kc(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${sc(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${B(e.creadoPorNombre)}${e.creadoEn?` el ${sc(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre||e.cambioPorNombre;n.push(`Último cambio${t?` de ${B(t)}`:``}: ${sc(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${p(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var qc=new Set;async function Jc(e,t,{section:n,ok:r}){try{let i=await g.save(e,t);return $s(n,i.pendiente?`${r} Sin señal: se enviará cuando vuelva.`:r),i}catch(e){return $s(n,`No se pudo guardar: ${e.message}`,`error`),null}finally{Pc()}}async function Yc(e,t,{section:n,ok:r}){try{await g.remove(e,t.id),Qs={col:e,record:t,section:n},$s(n,r),Zs.undo=!0}catch(e){$s(n,`No se pudo borrar: ${e.message}`,`error`)}finally{Pc()}}function Xc(e,t){qc.has(e)||(qc.add(e),Promise.resolve().then(t).finally(()=>qc.delete(e)))}var Zc=!1,Qc=!1,$c=``,el=/^[a-z0-9][a-z0-9_.-]{0,90}$/i;function tl(e){let t=`ant_${String(e||``)}`;return el.test(String(e||``))?t:void 0}function nl(){let e=_(),t=[];Js(z.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:z.pedidos,oldId:n.id,col:`pedidos`,data:{id:tl(n.id),fecha:cc(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:Lc.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),Js(z.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:z.altas,oldId:r,col:`fichas`,data:{id:tl(r),fecha:cc(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})}),Js(z.pagos,[]).forEach(n=>{let r=Number(String(n.montoTexto||n.monto||``).replace(/[^\d]/g,``))||0;t.push({key:z.pagos,oldId:n.id,col:`pagos`,data:{id:tl(n.id),fecha:cc(n.fecha)||e,concepto:`Pago de ${n.perro||`Pendiente de confirmar`}`,perroNombre:n.perro||``,monto:r,medio:n.medio||``,comprobante:n.comprobante||``,nota:n.nota||``,pasadoAlLibro:!!n.enLibro,migrado:!0}})});let n=new Set(Tc(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(Js(z.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:z.resueltos,oldId:e,skip:!0});return}let i=S.find(t=>t.id===e);t.push({key:z.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function rl(){if(!(Zc||Qc)&&Sc.every(e=>Ec.has(e))){Qc=!0;try{let e=Js(z.borradores,{});Object.entries(e).forEach(([e,t])=>{hl[e]||(hl[e]=t)}),Xs(z.borradores);let t=nl();if(!t.length){Zc=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await g.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[z.pedidos,z.altas,z.pagos].forEach(e=>{let t=Js(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?Ys(e,t):Xs(e)});let a=Object.fromEntries(Object.entries(Js(z.resueltos,{})).filter(([e])=>n.has(`${z.resueltos}|${e}`)));Object.keys(a).length?Ys(z.resueltos,a):Xs(z.resueltos),r&&($c=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo. Ahora los ve el resto del equipo según su rol.`,nc($c)),n.size?(Dc.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),rc(Dc.get(`migracion`))):Zc=!0}finally{Qc=!1,Pc()}}}var il=S.filter(e=>e.status===`Activo`),al=x.filter(e=>e!==`Domingo`),ol=[`Mañana`,`Tarde`];function sl(e){return e.safety.some(e=>/bozal/i.test(e))}function cl(e,t){return qt(e,t).filter(e=>e.status===`Activo`)}var ll=S.filter(e=>e.review||e.status!==`Activo`);function ul(e,t){let n=cl(e,t),r=new Set(n.map(e=>e.name)),i=new Map;return n.forEach(e=>{(e.incompatibleWith||[]).forEach(t=>{if(!r.has(t))return;let n=[e.name,t].sort().join(` y `);i.set(n,n)})}),[...i.keys()]}function dl(){let e=new Map;return al.forEach(t=>{ol.forEach(n=>{ul(t,n).forEach(r=>{e.has(r)||e.set(r,{});let i=e.get(r);i[n]=[...i[n]||[],t]})})}),[...e.entries()].map(([e,t])=>({pair:e,detail:Object.entries(t).map(([e,t])=>`${e.toLowerCase()}: ${pc(t).toLowerCase()}`).join(` · `)}))}function fl(){let e=new Set(S.map(e=>e.name)),t=new Set;return S.forEach(n=>(n.incompatibleWith||[]).forEach(n=>!e.has(n)&&t.add(n))),[...t]}function pl(){return al.map(e=>{let t=cl(e,`Mañana`),n=cl(e,`Tarde`),r=new Set([...t,...n].filter(sl).map(e=>e.name));return{day:e,manana:t.length,tarde:n.length,total:t.length+n.length,muzzle:[...r],conflicts:ul(e,`Mañana`).length+ul(e,`Tarde`).length}})}function ml(){let e=Hc();return ll.filter(t=>!e[t.id])}var hl={},gl=new Set;function _l(e){return hl[e]||{}}function vl(e,t){hl[e]=t,gl.delete(e)}function yl(e){delete hl[e],gl.add(e)}function bl(e){let t={..._l(e.dataset.coordForm)};return e.querySelectorAll(`[name]`).forEach(n=>{if(n.type!==`file`){if(n.type===`checkbox`){let r=e.querySelectorAll(`[name="${n.name}"]`);t[n.name]=[...r].filter(e=>e.checked).map(e=>e.value)}else t[n.name]=n.value}}),t}function V(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${B(r)}" ${i?`placeholder="${B(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function H(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``} ${s?`required`:``}>
        ${r.map(e=>`<option ${e===i?`selected`:``}>${B(e)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function xl(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``}={}){let c=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}</label>
      <textarea id="${c}" name="${t}" rows="3" ${i?`placeholder="${B(i)}"`:``} ${a?`aria-describedby="${c}-hint"`:``} ${s}>${B(r)}</textarea>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function Sl(e,t,n,r,i){let a=`coord-${e}-${t}`;return`
    <div class="coord-field">
      <span class="coord-label" id="${a}-label">${n}</span>
      <div class="coord-file">
        <input class="coord-file-input" id="${a}" type="file" accept=".jpg,.jpeg,.png,.pdf" data-coord-file="${e}" data-coord-file-field="${t}" aria-labelledby="${a}-label ${a}-button" aria-describedby="${a}-hint" />
        <label class="coord-btn is-secondary is-compact" for="${a}" id="${a}-button">${p(`fileUp`,`coord-icon`)}<span>${r?`Cambiar archivo`:`Elegir archivo`}</span></label>
        <span class="coord-file-name" data-coord-file-name>${r?B(r):`Ningún archivo elegido`}</span>
      </div>
      <small id="${a}-hint">${i}</small>
    </div>
  `}function Cl(e){if(!Zs||Zs.section!==e)return``;let t=Zs.undo?`<button class="coord-link" type="button" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${Zs.tone}">${p(Zs.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${B(Zs.text)}</span>${t}</p>`}function U(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?p(r,`coord-icon`):``}<span>${e}</span></button>`}function wl({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${gc(e,s)?`open`:``}>
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
  `}function W(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function Tl(e){return e.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${B(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${p(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${B(e)}</li>`).join(``)}
    </ul>
  `:``}function El(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${B(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function Dl(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Ol()}
      ${e}
    </div>
  `}function Ol(){return`
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
        <a class="coord-btn is-ghost is-compact" href="/salir" data-link>
          ${p(`logOut`,`coord-icon`)}<span>Salir</span>
        </a>
      </div>
    </header>
  `}function kl(){jc(),Mc();let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${Al()}
      ${Ml()}
      ${Pl()}
      ${Ul()}
      ${Gl()}
      ${Ql()}
      ${$l()}
      ${eu()}
      <p class="coord-footnote">
        Rutas y datos de perros al ${It}. Fuentes: ${B(y.officialSources.dogs)} y ${B(y.officialSources.routes)}.
        Pedidos, fichas, datos resueltos y pagos se guardan en los datos compartidos del equipo.
      </p>
    </main>
  `;return Zs=null,gl.clear(),e}function Al(){let e=g.pendingCount(),t=navigator.onLine===!1,n=[...new Set(Dc.values())],r=[];return e?r.push(`<p class="coord-sync is-warn">${p(`clock`,`coord-icon`)}<span><b>${e} ${e===1?`cambio pendiente`:`cambios pendientes`} sin señal.</b> Se ${e===1?`envía solo`:`envían solos`} cuando vuelva.</span></p>`):t&&r.push(`<p class="coord-sync is-warn">${p(`clock`,`coord-icon`)}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva.</span></p>`),n.length&&r.push(`<div class="coord-sync is-error">${p(`alertCircle`,`coord-icon`)}<span>${n.map(B).join(` `)}</span>${U(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),$c&&r.push(`<p class="coord-sync is-ok">${p(`uploadCloud`,`coord-icon`)}<span>${B($c)}</span></p>`),r.length?`<div class="coord-sync-list">${r.join(``)}</div>`:``}function jl(e){if(!e.length)return``;let t=e.slice(0,3);return`
    <div class="coord-web-alert" role="note" aria-labelledby="coord-web-alert-title">
      <h2 id="coord-web-alert-title">${p(`bell`,`coord-icon`)}<span>${e.length===1?`Pedido nuevo desde la web`:`${e.length} pedidos nuevos desde la web`}</span></h2>
      <ul>
        ${t.map(e=>{let t=e.datos||{},n=t.mordida&&t.mordida!==`No`;return`
            <li>
              <div>
                <strong>${B(t.perro||`Pendiente de confirmar`)}</strong>
                <span>${B([t.responsable,t.zona].filter(Boolean).join(` · `)||`Pendiente de confirmar`)} · ${B(sc(e.creadoEn)||oc(e.fecha))}</span>
                ${n?`<span class="coord-inline-alert is-strong">${p(`alertTriangle`,`coord-icon`)}<span>Mordida: ${B(t.mordida)}</span></span>`:``}
              </div>
              ${U(`Ver pedido`,`data-coord-goto-pedido="${B(e.id)}"`,`primary`,`arrowRight`)}
            </li>
          `}).join(``)}
      </ul>
      ${e.length>t.length?`<p>Y ${e.length-t.length} más en el tablero de pedidos.</p>`:``}
    </div>
  `}function Ml(){let e=Jt(ac()),t=xc(),n=ml(),r=zc(),i=r.filter(e=>Rc(e)!==`resuelto`),a=r.filter(e=>Rc(e)===`nuevo`).length,o=Wc(r),s=cl(e,`Mañana`),c=cl(e,`Tarde`),l=[...new Set([...s,...c].filter(sl).map(e=>e.name))],u=[...ul(e,`Mañana`).map(e=>`${e} (mañana)`),...ul(e,`Tarde`).map(e=>`${e} (tarde)`)],d=s.length+c.length===0,f;if(o.length){let e=o[o.length-1],t=e.datos||{};f={text:`Escribile a <b>${B(t.responsable||`quien hizo el pedido`)}</b> por la evaluación de <b>${B(t.perro||`su perro`)}</b>.`,action:U(`Ver pedido`,`data-coord-goto-pedido="${B(e.id)}"`,`primary`,`arrowRight`)}}else if(n.length){let e=n[0];f={text:`Confirmá el dato de <b>${B(e.name)}</b>: ${B(e.review||`estado "${e.status}"`)}`,action:U(`Ir a ${B(e.name)}`,`data-coord-goto-dog="${e.id}"`,`primary`,`arrowRight`)}}else if(i.length){let e=i[i.length-1];f={text:`Avanzá con el pedido más viejo: <b>${B(e.titulo||e.tipo)}</b>.`,action:U(`Ver pedido`,`data-coord-goto-pedido="${B(e.id)}"`,`primary`,`arrowRight`)}}else f={text:`No hay datos ni pedidos pendientes. Revisá la carga de la semana.`,action:U(`Ver carga`,`data-coord-open="carga"`,`primary`,`arrowRight`)};return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${e} ${lc()}</p>
        <p class="coord-greeting">Hola, ${B(t.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
        <p class="coord-owner">A cargo: ${B(t.nombre)}</p>
      </div>

      ${jl(o)}

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Datos a confirmar</h2>
            <p class="coord-big"><b>${n.length}</b> <span>de ${ll.length} perros</span></p>
            <p>${n.length?`Diferencias entre planillas o perros sin ruta.`:`Todo confirmado.`}</p>
          </div>
          ${U(`Ver la lista`,`data-coord-goto="coord-datos"`,`secondary`)}
        </li>
        <li class="coord-priority ${o.length?`is-alert`:a?`is-warn`:``}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Pedidos abiertos</h2>
            <p class="coord-big"><b>${i.length}</b> <span>${a?`${a} sin empezar`:i.length===1?`pedido`:`pedidos`}</span></p>
            <p>${r.length?`Consultas, evaluaciones de la web y avisos de clientes.`:Ec.has(`pedidos`)?`Todavía no hay pedidos.`:`Cargando pedidos…`}</p>
          </div>
          ${U(r.length?`Ver pedidos`:`Cargar un pedido`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${u.length?`is-alert`:``}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Hoy en la calle</h2>
            ${d?`<p class="coord-big"><b>0</b> <span>perros</span></p><p>No hay rutas cargadas para hoy.</p>`:`<p class="coord-big"><b>${s.length}</b> <span>mañana</span> <b>${c.length}</b> <span>tarde</span></p>
                 ${l.length?`<p class="coord-inline-alert">${p(`alertTriangle`,`coord-icon`)}<span>Con bozal: ${B(hc(l))}</span></p>`:``}
                 ${u.length?`<p class="coord-inline-alert is-strong">${p(`alertTriangle`,`coord-icon`)}<span>No juntar, comparten turno: ${B(hc(u))}</span></p>`:``}`}
          </div>
          ${U(`Ver carga de la semana`,`data-coord-open="carga"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function Nl(e,t){let n=t?t.actualizadoPorNombre||t.resueltoPorNombre||t.creadoPorNombre:``;return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${B(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?W(`Activo`,`neutral`):W(B(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${B(e.plan)} · ${B(e.size)} · ${B(mc(e))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${B(e.review||`Estado "${e.status}".`)}</p>
      ${Tl(e)}
      ${t?.nota?`<p class="coord-meta">${B(t.nota)}</p>`:``}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}<span>Resuelto${n?` por ${B(n)}`:``}${t.actualizadoEn?` el ${sc(t.actualizadoEn)}`:``}${t.pendiente?` (sin señal: se enviará cuando vuelva)`:``}</span></p>${U(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:U(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function Pl(){let e=Hc(),t=ll.filter(t=>!e[t.id]),n=ll.filter(t=>e[t.id]),r=t.slice(0,4),i=t.slice(4),a=fl();return`
    <section class="coord-block" id="coord-datos" tabindex="-1" aria-labelledby="coord-datos-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-datos-title">Datos a confirmar</h2>
          <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
        </div>
        <div class="coord-progress" aria-label="${n.length} de ${ll.length} resueltos">
          <b>${n.length}/${ll.length}</b><span>resueltos</span>
          <span class="coord-progress-bar" aria-hidden="true"><i style="width:${Math.round(n.length/ll.length*100)}%"></i></span>
        </div>
      </div>
      ${Cl(`datos`)}
      ${t.length?`<ul class="coord-review-list">${r.map(e=>Nl(e)).join(``)}</ul>`:`<p class="coord-empty">${p(`checkCircle`,`coord-icon`)}No quedan datos por confirmar.</p>`}
      ${i.length?`
        <details class="coord-more" ${gc(`datosMas`)?`open`:``}>
          <summary data-coord-toggle="datosMas">Ver los otros ${i.length} pendientes ${p(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${i.map(e=>Nl(e)).join(``)}</ul>
        </details>`:``}
      ${n.length?`
        <details class="coord-more" ${gc(`datosResueltos`)?`open`:``}>
          <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${p(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${n.map(t=>Nl(t,e[t.id])).join(``)}</ul>
        </details>`:``}
      ${a.length?`<p class="coord-note">${p(`alertCircle`,`coord-icon`)}<span>También a confirmar: ${B(hc(a))} figura en "no juntar con" pero no está en la lista de perros.</span></p>`:``}
      <p class="coord-note">${p(`fileText`,`coord-icon`)}<span>Lo que marcás como resuelto lo ven Juan y coordinación. El cambio todavía debe incorporarse al ${B(y.officialSources.dogs.toLowerCase())}.</span></p>
    </section>
  `}var Fl=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],Il=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],Ll=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],Rl={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function zl(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function Bl(e,t){let n=e.datos||{};if(!n.telefono)return``;let r=zl(n.telefono);if(!r)return`<p class="coord-inline-alert">${p(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina. Escribile a mano.</span></p>`;let i=`${n.responsable?`Hola ${n.responsable}`:`Hola`}, te escribo de Paseos Juan por el pedido de evaluación de ${n.perro||`tu perro`}.`;return`<a class="coord-btn is-${t}" href="https://wa.me/${r}?text=${encodeURIComponent(i)}" target="_blank" rel="noopener noreferrer">${p(`message`,`coord-icon`)}<span>Escribirle por WhatsApp</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`}function Vl(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return El([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function Hl(e,t){let n=Rc(e),r=e.origen===`web`,i=e.datos||{},a=B(e.id),o=t.get(e.id),s={nuevo:U(`Empezar`,`data-coord-pedido-move="${a}" data-estado="en-curso"`,`secondary`)+U(`Resolver`,`data-coord-pedido-move="${a}" data-estado="resuelto"`,`ghost`),"en-curso":U(`Resolver`,`data-coord-pedido-move="${a}" data-estado="resuelto"`,`secondary`)+U(`Volver a nuevo`,`data-coord-pedido-move="${a}" data-estado="nuevo"`,`ghost`),resuelto:U(`Reabrir`,`data-coord-pedido-move="${a}" data-estado="en-curso"`,`secondary`)}[n],c=`pedido-${e.id}`,l=n!==`resuelto`||vc.has(c),u=(r||/evaluaci/i.test(e.tipo||``))&&!o&&n!==`resuelto`,d=r?n===`resuelto`?`<details class="coord-card-more" ${l?`open`:``}><summary data-coord-mem-toggle="${B(c)}">Ver datos del formulario ${p(`chevronDown`,`coord-icon`)}</summary>${Vl(e)}</details>`:Vl(e):`
      <p class="coord-card-dog">${p(`pawPrint`,`coord-icon`)}${B(Uc(e)||`Pendiente de confirmar`)}</p>
      ${e.detalle?`<p>${B(e.detalle)}</p>`:``}
    `;return`
    <li class="coord-card ${r?`is-web`:``}" id="coord-pedido-${a}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${B(r?i.perro||`Pendiente de confirmar`:e.tipo||`Pedido`)}</strong>
        <small>${r?B(e.tipo||`Formulario web`):`${B(oc(e.fecha))}${i.canal||e.canal?` · ${B(i.canal||e.canal)}`:``}`}</small>
      </div>
      ${r?`<p class="coord-badges">${W(`Formulario web`,`warn`)}</p>`:``}
      ${d}
      ${Kc(e,{web:r})}
      ${o?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}<span>Ficha creada para ${B(o.perroNombre)}</span></p>`:``}
      <div class="coord-actions">
        ${n===`resuelto`?``:Bl(e,`primary`)}
        ${s}
        ${u?U(`Armar ficha con estos datos`,`data-coord-pedido-ficha="${a}"`,`ghost`,`userPlus`):``}
        ${n===`resuelto`&&Gc(e)?U(`Borrar`,`data-coord-pedido-delete="${a}"`,`ghost`):``}
      </div>
    </li>
  `}function Ul(){let e=zc(),t=_l(`pedido`),n=e.filter(e=>Rc(e)!==`resuelto`).length,r=Wc(e).length,i=S.map(e=>e.name),a=new Map(Bc().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),o=!Ec.has(`pedidos`)&&!e.length,s=`
    ${Cl(`pedidos`)}
    <div class="coord-board">
      ${Ll.map(([t,n])=>{let r=e.filter(e=>Rc(e)===t);return t===`nuevo`&&r.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`)),`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(e=>Hl(e,a)).join(``)}</ul>`:`<p class="coord-empty is-small">${o?`Cargando…`:t===`nuevo`?`Sin pedidos nuevos.`:t===`en-curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>

    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${H(`pedido`,`tipo`,`Tipo de pedido`,Fl,{value:t.tipo})}
        ${V(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre del perro o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${H(`pedido`,`canal`,`Llegó por`,Il,{value:t.canal})}
        ${xl(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${i.map(e=>`<option value="${B(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${U(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>
  `;return wl({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Los del formulario de la web y los que cargás vos. Los ve todo coordinación.`,badges:`${r?W(`${r} ${r===1?`nuevo`:`nuevos`} de la web`,`alert`):``}${n?W(`${n} abiertos`,`warn`):W(`Sin pedidos abiertos`,`neutral`)}`,body:s,open:r>0})}var Wl=[`Pendiente de confirmar`,`Sí`,`No`];function Gl(){let e=_l(`alta`),t=Bc(),n=Array.isArray(e.dias)?e.dias:[],r=[`Pendiente de confirmar`,...zt.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${p(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${Cl(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${e.pedidoId?`<p class="coord-note">${p(`clipboardCheck`,`coord-icon`)}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>`:``}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${V(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${H(`alta`,`tamano`,`Tamaño`,[`Pendiente de confirmar`,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${V(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${V(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${H(`alta`,`sexo`,`Sexo`,[`Pendiente de confirmar`,`Macho`,`Hembra`],{value:e.sexo})}
          ${H(`alta`,`castrado`,`Castrado o castrada`,Wl,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${V(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${V(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${V(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${H(`alta`,`zona`,`Zona`,[`Pendiente de confirmar`,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${V(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${H(`alta`,`vacunas`,`Vacunas al día`,Wl,{value:e.vacunas})}
          ${Sl(`alta`,`carnet`,`Carnet de vacunas`,e.carnet,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
          ${V(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${xl(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${H(`alta`,`sujecion`,`Collar o pechera`,[`Pendiente de confirmar`,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${H(`alta`,`bozal`,`Usa bozal`,Wl,{value:e.bozal})}
          ${H(`alta`,`correa`,`Tiene correa propia`,Wl,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${e.relatoTutor?xl(`alta`,`relatoTutor`,`Lo que contó el tutor en el formulario (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${xl(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,placeholder:`Ej.: se acerca con la cola baja y se aleja si el otro ladra`,span:!1})}
          ${xl(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${xl(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${V(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${H(`alta`,`plan`,`Plan pedido`,r,{value:e.plan,hint:`Precios oficiales en la tabla de planes.`})}
          ${H(`alta`,`turno`,`Turno`,[`Pendiente de confirmar`,`Mañana`,`Tarde`],{value:e.turno})}
          <div class="coord-field is-wide">
            <span class="coord-label" id="coord-alta-dias-label">Días pedidos</span>
            <div class="coord-days" role="group" aria-labelledby="coord-alta-dias-label">
              ${al.map(e=>`
                <label class="coord-day"><input type="checkbox" name="dias" value="${e}" ${n.includes(e)?`checked`:``} /><span>${e}</span></label>
              `).join(``)}
            </div>
          </div>
          <div class="coord-field">
            <span class="coord-label">Categoría</span>
            <p class="coord-fixed">${W(`SIN EVALUAR`,`neutral`)}</p>
          </div>
          <div class="coord-field">
            <span class="coord-label">Primer paseo</span>
            <p class="coord-fixed">${W(`Individual`,`neutral`)}</p>
          </div>
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
                <strong>${B(e.perroNombre||t.nombre||`Pendiente de confirmar`)}</strong>
                <small>Alta ${B(oc(e.fecha))}</small>
              </div>
              <p class="coord-badges">${W(B(e.categoria||`SIN EVALUAR`),`neutral`)} ${W(`Primer paseo individual`,`warn`)} ${e.estado===`borrador`?W(`Borrador`,`neutral`):``}</p>
              <p>${B(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:t.tamano)} · Plan: ${B(!t.plan||t.plan===`Pendiente de confirmar`?`pendiente`:t.plan)} · Días: ${n.length?B(pc(n).toLowerCase()):`pendientes`} · Turno: ${B(!t.turno||t.turno===`Pendiente de confirmar`?`pendiente`:t.turno.toLowerCase())}</p>
              ${t.bozal===`Sí`||t.noJuntar?`<ul class="coord-safety">
                ${t.bozal===`Sí`?`<li class="is-alert">${p(`alertTriangle`,`coord-icon`)}Usa bozal</li>`:``}
                ${t.noJuntar?`<li class="is-alert">${p(`alertTriangle`,`coord-icon`)}No juntar con ${B(t.noJuntar)}</li>`:``}
              </ul>`:``}
              ${Kc(e)}
              <div class="coord-actions">
                ${U(`Copiar ficha`,`data-coord-alta-copy="${B(e.id)}"`,`ghost`,`copy`)}
                ${Gc(e)?U(`Borrar`,`data-coord-alta-delete="${B(e.id)}"`,`ghost`):``}
              </div>
            </li>
          `}).join(``)}
        </ul>
        <p class="coord-note">${p(`fileText`,`coord-icon`)}<span>Estas fichas todavía deben incorporarse al ${B(y.officialSources.dogs.toLowerCase())}.</span></p>
      `:`<p class="coord-empty is-small">${Ec.has(`fichas`)?`Todavía no hay perros nuevos cargados.`:`Cargando fichas…`}</p>`}
    </div>
  `;return wl({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?W(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function Kl(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${oc(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; carnet: ${n(t.carnet)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):v}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function ql(e){let t=dc(e),n=al.map(dc),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return al.slice(e,t+1)}return al.filter((e,r)=>t.includes(n[r]))}function Jl(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>dc(t.zona)===dc(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:v,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:v,dias:ql(t.dias)}}function Yl(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>S.find(t=>t.id===e)?.name||e);return t.length?hc(t):``}function Xl(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||Ic(e,t)}function Zl(e,t){let n=Yl(e),r=e.titulo||(t===`incidente`?`Incidente`:`Observación`),i=e.riesgo?String(e.riesgo):``,a=t===`incidente`?[[`Perro`,n],[`Lugar`,e.lugar],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Perro`,n],[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]];return`
    <li class="coord-card coord-feed-item ${t===`incidente`?`is-incident`:``}">
      <div class="coord-card-head">
        <strong>${B(r)}</strong>
        <small>${B(oc(e.fecha))}${e.hora?` · ${B(e.hora)}`:``}</small>
      </div>
      ${i?`<p class="coord-badges">${W(`Riesgo: ${B(i)}`,/alto|grave/i.test(i)?`alert`:`warn`)}</p>`:``}
      ${El(a)}
      ${Kc(e)}
    </li>
  `}function Ql(){let e=Tc(`incidentes`).filter(e=>!e.fecha||e.fecha>=uc()).sort(Xl),t=Tc(`observaciones`).filter(e=>!e.fecha||e.fecha>=uc()).sort(Xl),n=e=>!Ec.has(e),r=`
    <p class="coord-note">${p(`eye`,`coord-icon`)}<span>Solo lectura. Las cargan los paseadores y supervisión. Se muestran los últimos 7 días (desde el ${B(oc(uc()))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${e.length}</span></h3>
        ${e.length?`<ul class="coord-card-list">${e.map(e=>Zl(e,`incidente`)).join(``)}</ul>`:`<p class="coord-empty is-small">${n(`incidentes`)?`Cargando…`:`Sin incidentes en los últimos 7 días.`}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${t.length}</span></h3>
        ${t.length?`<ul class="coord-card-list">${t.map(e=>Zl(e,`observacion`)).join(``)}</ul>`:`<p class="coord-empty is-small">${n(`observaciones`)?`Cargando…`:`Sin observaciones en los últimos 7 días.`}</p>`}
      </section>
    </div>
  `;return wl({key:`actividad`,id:`coord-actividad`,iconName:`activity`,title:`Observaciones e incidentes`,intro:`Lo que registró el equipo en la calle en los últimos 7 días.`,badges:`${e.length?W(`${e.length} ${e.length===1?`incidente`:`incidentes`}`,`alert`):``}${t.length?W(`${t.length} ${t.length===1?`observación`:`observaciones`}`,`neutral`):``}`,body:r})}function $l(){let e=pl(),t=Jt(ac()),n=Math.max(...e.map(e=>e.total),1),r=e.filter(e=>e.total===n).map(e=>e.day),i=dl(),a=il.filter(e=>al.some(t=>ol.every(n=>Kt(e,t,n)))).map(e=>e.name),o=S.filter(e=>e.status!==`Activo`).map(e=>`${e.name} (${e.status.toLowerCase()})`),s=`
    ${i.length?`
      <div class="coord-alert-box" role="note">
        <h3>${p(`alertTriangle`,`coord-icon`)}Perros que no se pueden juntar y comparten turno</h3>
        <ul>${i.map(e=>`<li><b>${B(e.pair)}</b> · ${B(e.detail)}</li>`).join(``)}</ul>
        <p>Según ${B(y.officialSources.routes)}. Revisá que no vayan en el mismo grupo.</p>
      </div>`:``}
    <div class="coord-table-wrap">
      <table class="coord-table">
        <caption>Perros activos por día y turno (rutas del ${It}). Día con más carga: ${B(hc(r.map(e=>e.toLowerCase())))}, ${n} paseos.</caption>
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
      ${a.length?`<li>${B(hc(a))} ${a.length===1?`sale`:`salen`} en los dos turnos el mismo día y cuenta${a.length===1?``:`n`} en ambos.</li>`:``}
      ${o.length?`<li>No se cuentan: ${B(hc(o))}.</li>`:``}
    </ul>
  `;return wl({key:`carga`,id:`coord-carga`,iconName:`chart`,title:`Carga por día y turno`,intro:`Calculada con las rutas reales. Incluye bozales y cruces a revisar.`,badges:i.length?W(`${i.length} ${i.length===1?`cruce`:`cruces`} a revisar`,`alert`):``,body:s})}function eu(){let e=Vc(),t=_l(`pago`),n=e.filter(e=>!e.pasadoAlLibro).length,r=[`Elegí un perro`,...il.map(e=>e.name).sort((e,t)=>e.localeCompare(t,`es`)),`Otro (anotalo en la nota)`],i=`
    <div class="coord-rule is-info" role="note">
      ${p(`fileText`,`coord-icon`)}
      <p><b>Fuente oficial:</b> el ${B(y.officialSources.money)} y la hoja Cobranza semanal. Esto es solo un registro de apoyo para no olvidarte de pasar un pago. No anotes alias ni datos bancarios: el detalle de pago se envía por WhatsApp.</p>
    </div>
    ${Cl(`pagos`)}
    <form class="coord-form" data-coord-form="pago" novalidate>
      <h3>Anotar un pago recibido</h3>
      <div class="coord-grid">
        ${H(`pago`,`perro`,`Perro`,r,{value:t.perro,required:!0})}
        ${V(`pago`,`monto`,`Monto recibido`,{value:t.monto,required:!0,attrs:`inputmode="numeric" autocomplete="off"`,hint:`El que figura en el comprobante. Solo números.`})}
        ${H(`pago`,`medio`,`Medio de pago`,[`Transferencia`,`Efectivo`,`Otro`],{value:t.medio})}
        ${V(`pago`,`fecha`,`Fecha del pago`,{value:t.fecha||lc(),placeholder:`DD/MM/AAAA`,attrs:`inputmode="numeric"`,hint:`Formato DD/MM/AAAA.`})}
        ${Sl(`pago`,`comprobante`,`Comprobante`,t.comprobante,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
        ${V(`pago`,`nota`,`Nota`,{value:t.nota,placeholder:`Opcional`})}
      </div>
      <div class="coord-actions">${U(`Guardar registro`,`data-coord-pago-save`,`primary`,`plus`)}</div>
    </form>

    <div class="coord-subblock">
      <h3>Pagos anotados <span>${e.length}</span></h3>
      ${e.length?`
        <ul class="coord-pay-list">
          ${e.map(e=>`
            <li class="coord-pay ${e.pasadoAlLibro?`is-done`:``}">
              <div class="coord-pay-main">
                <strong>${B(e.perroNombre||e.concepto||`Pendiente de confirmar`)}</strong>
                <span>${B(Number.isFinite(Number(e.monto))&&e.monto!==``?C(e.monto):v)} · ${B(e.medio||`Pendiente de confirmar`)} · ${B(oc(e.fecha))}</span>
                ${e.comprobante?`<small>Comprobante: ${B(e.comprobante)}</small>`:`<small>Sin comprobante</small>`}
                ${e.nota?`<small>${B(e.nota)}</small>`:``}
                ${Kc(e)}
              </div>
              ${e.pasadoAlLibro?W(`Pasado al Libro contable`,`ok`):W(`Falta pasar al Libro contable`,`warn`)}
              <div class="coord-actions">
                ${U(e.pasadoAlLibro?`Marcar como no pasado`:`Ya lo pasé al Libro`,`data-coord-pago-libro="${B(e.id)}"`,e.pasadoAlLibro?`ghost`:`secondary`,e.pasadoAlLibro?``:`checkCircle`)}
                ${Gc(e)?U(`Borrar`,`data-coord-pago-delete="${B(e.id)}"`,`ghost`):``}
              </div>
            </li>
          `).join(``)}
        </ul>
      `:`<p class="coord-empty is-small">${Ec.has(`pagos`)?`No hay pagos anotados.`:`Cargando pagos…`}</p>`}
    </div>
  `;return wl({key:`pagos`,id:`coord-pagos`,iconName:`wallet`,title:`Pagos`,intro:`Registro de apoyo compartido con Juan. La fuente oficial es el Libro contable.`,badges:n?W(`${n} sin pasar al Libro`,`warn`):``,body:i})}function tu(e,t,n){_c(e,!0),$(),bc(t,n)}function nu(e){try{(navigator.clipboard?.writeText(e))?.catch?.(()=>{})}catch{}}function ru(e,t){return e.find(e=>e.id===t)}function iu(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target.closest(`[data-coord-toggle]`);if(t){let e=t.parentElement;return _c(t.dataset.coordToggle,!e.open),!0}let n=e.target.closest(`[data-coord-mem-toggle]`);if(n){let e=n.dataset.coordMemToggle;return n.parentElement.open?vc.delete(e):vc.add(e),!0}if(e.target.closest(`[data-coord-retry]`))return Nc(),Zc=!1,nc(`Volviendo a pedir los datos.`),!0;let r=e.target.closest(`[data-coord-goto]`);if(r)return bc(r.dataset.coordGoto),!0;let i=e.target.closest(`[data-coord-goto-dog]`);if(i){let e=i.dataset.coordGotoDog;return ml().findIndex(t=>t.id===e)>=4&&(_c(`datosMas`,!0),$()),bc(`coord-dato-${e}`),!0}let a=e.target.closest(`[data-coord-goto-pedido]`);if(a)return tu(`pedidos`,`coord-pedido-${a.dataset.coordGotoPedido}`),!0;let o=e.target.closest(`[data-coord-open]`);if(o){let e=o.dataset.coordOpen,t=e===`pedidos`&&!zc().length?`#coord-pedido-tipo`:null;return tu(e,`coord-${e}`,t),!0}if(e.target.closest(`[data-coord-undo]`)){let e=Qs;if(Qs=null,e){let{pendiente:t,...n}=e.record;Xc(`undo`,()=>Jc(e.col,n,{section:e.section,ok:`Listo, se recuperó.`}))}return!0}let s=e.target.closest(`[data-coord-resolve]`);if(s){let e=s.dataset.coordResolve,t=S.find(t=>t.id===e);return Xc(`resuelto-${e}`,async()=>{await Jc(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{section:`datos`,ok:`${t?.name||e}: marcado como resuelto.`})&&bc(`coord-datos`)}),!0}let c=e.target.closest(`[data-coord-unresolve]`);if(c){let e=c.dataset.coordUnresolve,t=S.find(t=>t.id===e);return Xc(`resuelto-${e}`,()=>Jc(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{section:`datos`,ok:`${t?.name||e}: volvió a pendientes.`})),!0}if(e.target.closest(`[data-coord-pedido-save]`)){let t=bl(e.target.closest(`[data-coord-form]`));if(vl(`pedido`,t),!t.perro?.trim()&&!t.detalle?.trim())return $s(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),bc(`coord-pedidos`,`#coord-pedido-perro`),!0;let n=t.tipo||Fl[0],r=t.perro?.trim()||``;return Xc(`pedido-save`,async()=>{await Jc(`pedidos`,{fecha:_(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:t.detalle?.trim()||``,datos:{perro:r,canal:t.canal||Il[0]}},{section:`pedidos`,ok:`Pedido guardado en "Nuevo".`})&&yl(`pedido`)}),!0}let l=e.target.closest(`[data-coord-pedido-move]`);if(l){let e=l.dataset.coordPedidoMove,t=l.dataset.estado;return Xc(`pedido-${e}`,()=>Jc(`pedidos`,{id:e,estado:t},{section:`pedidos`,ok:`Pedido movido a "${Rl[t]}".`})),!0}let u=e.target.closest(`[data-coord-pedido-delete]`);if(u){let e=ru(zc(),u.dataset.coordPedidoDelete);return e&&Xc(`pedido-${e.id}`,()=>Yc(`pedidos`,e,{section:`pedidos`,ok:`Pedido borrado.`})),!0}let d=e.target.closest(`[data-coord-pedido-ficha]`);if(d){let e=ru(zc(),d.dataset.coordPedidoFicha);return e&&(hl.alta=Jl(e),$s(`alta`,`Formulario completado con el pedido de ${Uc(e)||`la web`}. Revisalo y guardalo.`),tu(`alta`,`coord-alta`,`#coord-alta-nombre`)),!0}if(e.target.closest(`[data-coord-alta-save]`)){let t=bl(e.target.closest(`[data-coord-form]`));if(vl(`alta`,t),!t.nombre?.trim())return $s(`alta`,`Falta el nombre del perro.`,`error`),$(),bc(`coord-alta`,`#coord-alta-nombre`),!0;let n=t.nombre.trim(),r={...t,nombre:n,dias:Array.isArray(t.dias)?t.dias:[],primerPaseo:`Individual`};return Xc(`alta-save`,async()=>{await Jc(`fichas`,{fecha:_(),perroNombre:n,datos:r,categoria:`SIN EVALUAR`,estado:`lista`},{section:`alta`,ok:`Ficha de ${n} guardada. Arranca SIN EVALUAR y con primer paseo individual.`})&&(yl(`alta`),bc(`coord-alta`))}),!0}if(e.target.closest(`[data-coord-alta-clear]`))return yl(`alta`),$s(`alta`,`Formulario vacío.`),$(),!0;let f=e.target.closest(`[data-coord-alta-copy]`);if(f){let e=ru(Bc(),f.dataset.coordAltaCopy);return e&&nu(Kl(e)),$s(`alta`,`Ficha copiada. Pegala en el registro maestro.`),$(),!0}let ee=e.target.closest(`[data-coord-alta-delete]`);if(ee){let e=ru(Bc(),ee.dataset.coordAltaDelete);return e&&Xc(`ficha-${e.id}`,()=>Yc(`fichas`,e,{section:`alta`,ok:`Ficha borrada.`})),!0}if(e.target.closest(`[data-coord-pago-save]`)){let t=bl(e.target.closest(`[data-coord-form]`));vl(`pago`,t);let n=String(t.monto||``).replace(/[^\d]/g,``),r=cc(t.fecha||lc()),i=!t.perro||t.perro===`Elegí un perro`?[`Elegí el perro.`,`#coord-pago-perro`]:n?r?null:[`La fecha no es válida. Usá DD/MM/AAAA.`,`#coord-pago-fecha`]:[`Falta el monto del comprobante.`,`#coord-pago-monto`];return i?($s(`pagos`,i[0],`error`),$(),bc(`coord-pagos`,i[1]),!0):(Xc(`pago-save`,async()=>{await Jc(`pagos`,{fecha:r,concepto:`Pago de ${t.perro}`,perroNombre:t.perro,monto:Number(n),medio:t.medio||`Transferencia`,comprobante:t.comprobante||``,nota:t.nota?.trim()||``,pasadoAlLibro:!1},{section:`pagos`,ok:`Pago de ${t.perro} anotado. Acordate de pasarlo al Libro contable.`})&&yl(`pago`)}),!0)}let te=e.target.closest(`[data-coord-pago-libro]`);if(te){let e=ru(Vc(),te.dataset.coordPagoLibro);if(!e)return!0;let t=!e.pasadoAlLibro;return Xc(`pago-${e.id}`,()=>Jc(`pagos`,{id:e.id,pasadoAlLibro:t},{section:`pagos`,ok:t?`Marcado como pasado al Libro contable.`:`Marcado como pendiente de pasar al Libro.`})),!0}let ne=e.target.closest(`[data-coord-pago-delete]`);if(ne){let e=ru(Vc(),ne.dataset.coordPagoDelete);return e&&Xc(`pago-${e.id}`,()=>Yc(`pagos`,e,{section:`pagos`,ok:`Registro borrado.`})),!0}return!1}function au(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;let n=t.closest(`[data-coord-file]`);if(n){let e=n.dataset.coordFile,t=n.files?.[0],r=n.closest(`[data-coord-form]`),i=r?bl(r):_l(e);t&&(i[n.dataset.coordFileField]=t.name),vl(e,i);let a=n.parentElement.querySelector(`[data-coord-file-name]`);return a&&t&&(a.textContent=t.name),!0}let r=t.closest(`[data-coord-form]`);return r?(vl(r.dataset.coordForm,bl(r)),!0):!1}function ou(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`.coord-btn.is-primary`)?.click())}function su(){be.push(iu),xe.push(au),document.addEventListener(`submit`,ou)}var cu=`paseosJuanAdmin_prioridadesHechas`,lu=`paseosJuanAdmin_seccionesAbiertas`,uu=`America/Argentina/Buenos_Aires`,du=[`Pequeño`,`Mediano`,`Grande`],fu=b.manana.label,pu=b.tarde.label,mu=[`paseos`,`incidentes`,`checklists`,`pedidos`,`rutas`,`plantillas`,`avisos`],hu=[`pagos`,`clientes`],gu=10,_u=[`Efectivo`,`Transferencia`,`Naranja X`],vu=`Libro contable del Sistema de Gestión`,yu=``,G={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,adminLoaded:!1,adminError:``,pagosMes:null,lateSignature:``,msgs:{users:null,live:null,pagos:null}},bu=()=>({fecha:_(),concepto:``,monto:``,medio:``,pasadoAlLibro:!1}),K={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{},pago:bu()};function q(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function J(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Y(e,t,n){return`${e} ${e===1?t:n}`}var xu={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Su(e){let t=x.filter(t=>e.includes(t)),n=t.map(e=>x.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${xu[t[0]]} a ${xu[t[t.length-1]]}`:t.map(e=>xu[e]).join(`, `)}function Cu(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:uu,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:x.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function wu(){return ce(cu)}function Tu(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Eu(){return new Set(ce(lu))}function Du(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:uu,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function Ou(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:uu,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function ku(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function Au(){return h.user()||{usuario:``,nombre:``,rol:`admin`}}function ju(e){return String(e||``).trim().split(/\s+/)[0]||``}function Mu(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function X(e,t){return[`pedidos`,`plantillas`,`avisos`,...hu].includes(e)?{}:{desde:t}}function Nu(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function Pu(e){return e.hora||Du(e.creadoEn)}function Fu(e=new Date){let t=new Intl.DateTimeFormat(`en-GB`,{timeZone:uu,hour:`2-digit`,minute:`2-digit`,hour12:!1}).formatToParts(e),n=e=>Number(t.find(t=>t.type===e)?.value||0);return n(`hour`)%24*60+n(`minute`)}function Iu(e){let t=/^(\d{1,2}):(\d{2})$/.exec(String(e||``).trim());return t?Number(t[1])*60+Number(t[2]):null}var Lu=810;function Ru(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``)}function zu(e,t){let n=g.cached(`rutas`,X(`rutas`,e)).filter(t=>t.fecha===e),r=g.cached(`plantillas`,X(`plantillas`,e)).filter(e=>Ru(e.dia)===Ru(t)),i=!r.length,a=i?en().filter(e=>Ru(e.dia)===Ru(t)):r,o=new Map;a.forEach(e=>o.set(e.ruta||e.id,{...e,fuente:i?`planilla`:`plantilla`})),n.forEach(e=>o.set(e.ruta||String(e.id).slice(11),{...e,fuente:`dia`}));let s=e=>(e.paradas||[]).map(e=>e.hora||`99:99`).sort()[0]||`99:99`,c=[...o.values()].sort((e,t)=>s(e).localeCompare(s(t))||String(e.ruta).localeCompare(String(t.ruta)));return{list:c,fromSheet:c.some(e=>e.fuente===`planilla`)}}function Bu(e,t,n){let r=(e,t)=>e.perroId&&t.perroId?e.perroId===t.perroId:Ru(e.perroNombre)&&Ru(e.perroNombre)===Ru(t.perroNombre),i=t=>e.reduce((e,n)=>e+(n.paradas||[]).filter(e=>r(t,e)).length,0);return e.map(e=>{let a=Nu({turno:e.turno}),o=(e.paradas||[]).map(e=>{let o=t.filter(t=>r(e,t)),s=o.find(e=>Nu(e)===a)||(o.length===1&&i(e)===1?o[0]:null),c=s?.estado||`pendiente`,l=Iu(e.hora),u=`a-tiempo`;return c===`entregado`?u=`entregado`:c===`no-sale`?u=`no-sale`:c===`pendiente`&&l!==null&&n>l+gu&&(u=`atrasado`),{...e,paseo:s,estado:c,status:u,prevista:l,atraso:u===`atrasado`?n-l:0}}),s=e=>o.filter(t=>t.status===e).length;return{route:e,shift:a,stops:o,aTiempo:s(`a-tiempo`),atrasados:s(`atrasado`),entregados:s(`entregado`),noSale:s(`no-sale`)}})}function Vu(e){return g.cached(`avisos`,X(`avisos`,e)).filter(t=>{let n=t.fecha||String(t.creadoEn||``).slice(0,10),r=t.vigenteHasta||n;return n&&n<=e&&r>=e}).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``)))}function Hu(){let e=_(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=g.cached(`paseos`,X(`paseos`,e)).filter(t),i=g.cached(`incidentes`,X(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),a=g.cached(`checklists`,X(`checklists`,e)).filter(t).sort(n),o=g.cached(`pedidos`,X(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),s=[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>Nu(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}}),c=Fu(),l=zu(e,Cu().dayName),u=Bu(l.list,r,c),d=u.flatMap(e=>e.stops.filter(e=>e.status===`atrasado`).map(t=>({...t,route:e.route})));return{hoy:e,paseos:r,incidentes:i,checklists:a,pedidosNuevos:o,shifts:s,nowMin:c,effective:l,compliance:u,late:d,lateNow:d.filter(e=>e.prevista<Lu==c<Lu),avisos:Vu(e)}}function Uu(e){return e.late.map(e=>`${e.route.ruta}:${e.perroId||e.perroNombre}`).join(`|`)}function Wu(){let e=_();G.adminLoaded||(G.adminLoaded=!0,Gu().finally(()=>{hu.forEach(t=>g.watch(t,X(t,e)))})),G.liveDay!==e&&(G.liveDay=e,Ku(!1).finally(()=>{mu.forEach(t=>g.watch(t,X(t,e)))}))}async function Gu(){let e=_(),t=await Promise.allSettled(hu.map(t=>g.list(t,X(t,e)))),n=[...new Set(t.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],r=G.adminError;G.adminError=n.join(` `),G.adminError&&Z(`pagos`,`No se pudieron traer pagos o clientes: ${G.adminError}`,!0),r!==G.adminError&&Q()}async function Ku(e){let t=_(),n=await Promise.allSettled(mu.map(e=>g.list(e,X(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=G.liveError;G.liveError=r.join(` `),G.liveError?Z(`live`,`No se pudieron actualizar los datos del día: ${G.liveError}`,!0):e?Z(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Z(`live`,`Datos del día actualizados.`),(e||i!==G.liveError)&&Q()}var qu={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},Ju={admin:`todo: usuarios, pagos e indicadores. Es el único que ve y carga pagos.`,coordinador:`arma las rutas y los horarios (plantilla semanal y cambios del día), gestiona los clientes, atiende pedidos, carga fichas y avisa lo que pasa en cada barrio. Ve paseos, incidentes y cierres. No ve plata ni checklists.`,supervisor:`controla que se cumplan los paseos del momento: quién falta retirar, atrasos, entregas, incidentes y equipo. Carga paseos, checklists, incidentes, cierres y avisos. Ve las rutas pero no las arma. No ve clientes, pedidos ni plata.`,paseador:`hace su ruta del turno, en orden y con horario: carga paseos, checklists, incidentes y observaciones. Ve rutas y avisos. No ve clientes, pedidos, fichas ni plata.`,ayudante:`acompaña al paseador en su ruta: marca pasos y reporta incidentes y observaciones. Ve rutas y avisos. Sin datos de clientes ni plata.`,marketing:`pedidos (incluye los del formulario web) y avisos por barrio para comunicar. Nada de la operación ni plata.`};function Yu(e){let t=(it[e]||[]).filter(e=>qu[e]).map(t=>e===`ayudante`&&t===`paseador`?`Paseador (modo ayudante)`:qu[t]);return`${t.length?`Paneles: ${J(t)}.`:`Todavía no tiene panel.`} Qué hace: ${Ju[e]||`Pendiente de confirmar`}`}function Xu(){return G.usersLoading=!0,st.list().then(e=>{G.users=e,G.usersError=``}).catch(e=>{G.usersError=e.message||`No se pudo traer la lista de usuarios.`,Z(`users`,G.usersError,!0)}).finally(()=>{G.usersLoading=!1,Q()})}function Zu(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function Qu(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function $u(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!Qu(e))return e}}function ed(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Z(e,t,n=!1){G.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function td(e){let t=G.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?q(t.text):``}</p>`}function nd(){Object.entries(G.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function Q(){if(!Mu()||h.user()?.rol!==`admin`)return;let e=document.activeElement,t=e?.id,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.getElementById(t);if(r&&(r.focus({preventScroll:!0}),n))try{r.setSelectionRange(...n)}catch{}}function rd(){return S.filter(e=>e.status===`Activo`&&e.days.length>0)}function id(){let e=rd(),t=x.map(t=>{let n=e.filter(e=>Kt(e,t,fu)).length,r=e.filter(e=>Kt(e,t,pu)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function ad(){let e=rd(),t=new Map(S.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return S.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[fu,pu].forEach(e=>{let t=x.filter(t=>Kt(o,t,e)&&Kt(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function od(){return rd().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function sd(){return S.filter(e=>e.review||e.status!==`Activo`)}function cd(e){return e===fu?b.manana.route:b.tarde.routes.join(` o `)}function ld(e=Hu()){let{conflicts:t}=ad(),n=S.filter(e=>e.status!==`Activo`),r=sd(),i=od().filter(e=>e.category===`SIN EVALUAR`),a=rd(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${J(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${Pu(n)?` a las ${Pu(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${J(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(e.lateNow.length){let t=e.lateNow.length,n=e.nowMin<Lu?`mañana`:`tarde`,r=e.lateNow.slice().sort((e,t)=>t.atraso-e.atraso),i=r[0],a=r.slice(0,3).map(e=>`${e.perroNombre} (${e.hora}, ${e.route.ruta})`),o=[...new Set(r.map(e=>e.route.ruta))],c=i.route.supervisor||_d(i.route.paseador)||`el supervisor del turno`;e.paseos.length?s.push({id:`atrasos-${e.hoy}-${n}-${t}`,tag:`Atrasos`,tone:`warning`,title:`${Y(t,`perro atrasado`,`perros atrasados`)} en el turno ${n}`,detail:`${J(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Pasaron más de ${gu} minutos de la hora prevista y nadie marcó el retiro.`,action:`Preguntale a ${c} qué pasa con ${i.perroNombre} (retiro previsto ${i.hora}, ruta ${o.join(` y `)}).`,target:`adm-cumplimiento`,targetLabel:t===1?`Ver el atraso`:`Ver los atrasos`}):s.push({id:`atrasos-sin-marcas-${e.hoy}-${n}`,tag:`Atrasos`,tone:`warning`,title:`Nadie marcó retiros hoy: ${Y(t,`perro figura`,`perros figuran`)} pasados de hora en el turno ${n}`,detail:`Según la ruta de hoy, ${J(a)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``} ya tendrían que estar retirados. En la app no hay ningún paseo marcado hoy.`,action:`Preguntale a ${c} si el equipo está marcando los retiros en la página del paseador.`,target:`adm-cumplimiento`,targetLabel:`Ver el cumplimiento`})}if(e.pedidosNuevos.length){let t=e.pedidosNuevos.length,n=e=>e.titulo||e.tipo||`Pedido sin título`,r=e.pedidosNuevos.slice(0,3).map(n),i=n(e.pedidosNuevos[t-1]);s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}`,tag:`Pedidos`,tone:`info`,title:`${Y(t,`pedido nuevo`,`pedidos nuevos`)} sin responder`,detail:`${J(r)}${t>3?` y ${Y(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.`,action:t===1?`Respondé el pedido “${i}”.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${i}”.`,target:`adm-vivo`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(cd).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${J(r)}. Hay ${Y(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${J(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${Y(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${J(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${J(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${J(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${J(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function ud(){let e=rd(),t=[],n=[];e.forEach(e=>{let r=zt.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=zt.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function dd(e){return`
    <div class="adm-shell">
      ${fd()}
      ${e}
    </div>
  `}function fd(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${p(`lock`,`adm-icon-sm`)} ${q(Au().nombre)} · ${q(at[Au().rol]||Au().rol)}</span>
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
  `}function pd(){Wu(),G.users===null&&!G.usersLoading&&!G.usersError&&Xu();let e=Hu();G.lateSignature=Uu(e);let t=ld(e),n=wu(),r=Eu();return setTimeout(nd,60),`
    <main class="adm-page" id="adm-main">
      ${md(t,n,e)}
      ${kd(e)}
      ${Ld()}
      ${Id()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${p(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${p(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${zd(r)}
        ${Bd(r)}
        ${ef(r)}
        ${Zd(r)}
        ${Hd(r)}
        ${Gd(r)}
        ${Kd(r)}
        ${tf(r)}
      </div>
      ${nf()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function md(e,t,n){let{dayName:r,date:i}=Cu(),a=rd(),o=a.filter(e=>Kt(e,r,fu)).length,s=a.filter(e=>Kt(e,r,pu)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${Y(o,`perro`,`perros`)} a la mañana y ${Y(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=ju(Au().nombre);return`
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${q(r)} ${q(i)}</p>
        <h1 id="adm-hero-title">Hola${u?`, ${q(u)}`:``}</h1>
        <p class="adm-hero-sub">${l}</p>
        ${n.incidentes.length?`
          <p class="adm-hero-alert">${p(`alertTriangle`,`adm-icon-sm`)} ${Y(n.incidentes.length,`incidente cargado hoy`,`incidentes cargados hoy`)}. Está primero en tus prioridades.</p>
        `:``}
      </div>

      ${c?`
        <div class="adm-next" aria-labelledby="adm-next-title">
          <p class="adm-next-label" id="adm-next-title">${p(`arrowRight`,`adm-icon-sm`)} Próximo paso</p>
          <p class="adm-next-text">${q(c.action)}</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-done="${c.id}">
              ${p(`checkCircle`,`adm-icon-sm`)} Listo, ya lo hice
            </button>
            <button class="adm-button adm-button--ghost" type="button" data-adm-goto="${c.target}">
              ${q(c.targetLabel)}
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
  `}var hd={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function gd(e){let{dayName:t}=Cu();return rd().filter(n=>Kt(n,t,e)).length}function _d(e){return G.users?.find(t=>t.usuario===e)?.nombre||e||``}function vd(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=Du(e.actualizadoEn);return`Actualizado por ${_d(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||_d(e.creadoPor),r=Du(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function yd(e){let t={manana:{title:`Turno mañana`,hours:`${b.manana.from} a ${b.manana.to}`,planned:gd(fu)},tarde:{title:`Turno tarde`,hours:`${b.tarde.from} a ${b.tarde.to}`,planned:gd(pu)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
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
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=hd[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${q(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${q(vd(e))}${e.nota?` · Nota: ${q(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function bd(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${p(`alertTriangle`,`adm-icon-sm`)} ${Y(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${q(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${Pu(e)?`<span class="adm-muted">${q(Pu(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${q(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${q(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${vd(e,!0)?`<p class="adm-note">${q(vd(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function xd(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}var Sd={"a-tiempo":{label:`A tiempo`,tone:`ok`},atrasado:{label:`Atrasado`,tone:`danger`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}},Cd={dia:`Cambio del día`,plantilla:`Plantilla semanal`,planilla:`Planilla BASE RUTAS`};function wd(e){let t=hd[e.estado]||{label:e.estado},n=[`Retiro previsto ${e.hora||`pendiente de confirmar`}`];return e.status===`atrasado`?n.push(`${e.atraso} min de atraso`):e.paseo&&n.push(t.label),e.paseo?.horaRetiro&&n.push(`retirado ${e.paseo.horaRetiro}`),e.paseo?.horaEntrega&&n.push(`entregado ${e.paseo.horaEntrega}`),n.join(` · `)}function Td(e){let{route:t,stops:n}=e,r=n.length-e.noSale,i=`ruta-${t.ruta}`,a=[t.paseador?`Paseador: ${_d(t.paseador)}`:`Paseador: sin asignar`,t.ayudante?`Ayudante: ${_d(t.ayudante)}`:``,t.supervisor?`Supervisa: ${t.supervisor}`:``].filter(Boolean).join(` · `),o=n.filter(e=>e.status===`atrasado`).sort((e,t)=>t.atraso-e.atraso);return`
    <article class="adm-shift adm-route ${o.length?`has-late`:``}" aria-labelledby="adm-route-${q(t.ruta)}">
      <h4 id="adm-route-${q(t.ruta)}">${q(t.ruta||`Ruta sin código`)} <span class="adm-th-sub">${q(t.turno||`Turno sin indicar`)} · ${q(Cd[t.fuente]||``)}</span></h4>
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
            ${n.map(e=>{let t=Sd[e.status];return e.status===`a-tiempo`&&(t=e.estado===`pendiente`?{label:`Por retirar · a tiempo`,tone:`neutral`}:{label:`${(hd[e.estado]||{label:e.estado}).label} · a tiempo`,tone:`info`}),`
                <li>
                  <span class="adm-dog-name">${q(e.hora||`--:--`)} · ${q(e.perroNombre||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${q(t.label)}${e.paseo?.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${q(wd(e))}${e.nota?` · Nota: ${q(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ol>
        </details>
      `:`<p class="adm-empty">Esta ruta no tiene paradas cargadas.</p>`}
    </article>
  `}function Ed(e){let{compliance:t,effective:n,late:r}=e;return`
    <div class="adm-compliance" id="adm-cumplimiento" tabindex="-1" role="region" aria-labelledby="adm-compliance-title">
      <h3 id="adm-compliance-title">${p(`route`,`adm-icon-sm`)} Cumplimiento por ruta ${r.length?`<span class="adm-count adm-count--danger">${Y(r.length,`atrasado`,`atrasados`)}</span>`:``}</h3>
      <p class="adm-note">Atrasado = pasaron más de ${gu} minutos de la hora prevista y nadie marcó el retiro. Hora de Argentina.</p>
      ${n.fromSheet?`
        <p class="adm-warn-box">${p(`alertCircle`,`adm-icon-sm`)} <span>Todavía no hay plantilla de hoy cargada en la app: se usan los horarios de la planilla BASE RUTAS (12/11/2026). Paseadores sin asignar: ${v.toLowerCase()}.</span></p>
      `:``}
      ${t.length?`
        <div class="adm-live-grid">${t.map(Td).join(``)}</div>
      `:`<p class="adm-empty">Hoy no hay rutas: ni cambios del día, ni plantilla, ni paseos en la planilla.</p>`}
    </div>
  `}var Dd={"perro suelto":`danger`,seguridad:`danger`,"obra o corte":`warning`,clima:`info`,"cambio de horario":`info`};function Od(e){let{avisos:t}=e;return`
    <div class="adm-avisos" id="adm-avisos" role="region" aria-labelledby="adm-avisos-title">
      <h3 id="adm-avisos-title">${p(`mapPin`,`adm-icon-sm`)} Avisos por barrio vigentes <span class="adm-count">${t.length}</span></h3>
      ${t.length?`
        <ul class="adm-aviso-list">
          ${t.map(e=>`
            <li class="adm-aviso">
              <div class="adm-aviso-head">
                <strong>${q(e.barrio||`Barrio sin indicar`)}</strong>
                <span class="adm-pill adm-pill--${Dd[e.tipo]||`neutral`}">${q(e.tipo||`otro`)}</span>
                <span class="adm-muted">${e.vigenteHasta?`Hasta el ${q(ku(e.vigenteHasta))}`:`Solo hoy`}</span>
              </div>
              <p>${q(e.mensaje||e.titulo||``)}</p>
              ${vd(e,!0)?`<p class="adm-note">${q(vd(e,!0))}.</p>`:``}
            </li>
          `).join(``)}
        </ul>
      `:`<p class="adm-empty">No hay avisos vigentes por barrio.</p>`}
    </div>
  `}function kd(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${p(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${q(ku(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó.</p>`:``}
      ${td(`live`)}

      ${e.incidentes.length?bd(e.incidentes):`
        <p class="adm-live-ok">${p(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      ${Ed(e)}
      ${Od(e)}

      <div class="adm-live-grid">
        ${e.shifts.map(yd).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=xd(e);return`
                  <li>
                    <span><strong>${q(e.creadoPorNombre||e.creadoPor||`Sin nombre`)}</strong> · ${q(e.turno||`Turno sin indicar`)}</span>
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
                  <span><strong>${q(e.titulo||e.tipo||`Pedido sin título`)}</strong></span>
                  <span class="adm-dog-meta">${q(ku(e.fecha)||Ou(e.creadoEn))} · ${e.origen===`web`?`Formulario web`:q(e.creadoPorNombre||`Cargado en la app`)}</span>
                </li>
              `).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${Y(r.length-6,`pedido más`,`pedidos más`)}.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos.</p>`}
        </article>
      </div>
    </section>
  `}function Ad(e){return Object.entries(at).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function jd(){let e=G.credential;if(!e)return``;let t=ed(e);return`
    <div class="adm-cred" id="adm-cred" tabindex="-1" role="region" aria-labelledby="adm-cred-title">
      <p class="adm-tag adm-tag--warning">Solo se muestra ahora</p>
      <h3 id="adm-cred-title">${e.tipo===`alta`?`Usuario creado: ${q(e.nombre)}`:`PIN nuevo de ${q(e.nombre)}`}</h3>
      <p>Copiá este mensaje y mandáselo por WhatsApp:</p>
      <p class="adm-cred-text">${q(t)}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="button" data-adm-cred-copy>${p(`copy`,`adm-icon-sm`)} Copiar mensaje</button>
        <a class="adm-button adm-button--ghost" href="https://wa.me/?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${p(`message`,`adm-icon-sm`)} Abrir WhatsApp</a>
        <button class="adm-button adm-button--ghost" type="button" data-adm-cred-hide>Listo, ya lo mandé</button>
      </div>
      <p class="adm-note">Este PIN no queda guardado en la página: cuando tocás “Listo” desaparece. Si se pierde, resetealo.</p>
    </div>
  `}function Md(){let e=K.crear;return`
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${q(J(Lt.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>
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
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${Ad(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${q(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${q(at[e.rol]||e.rol)}:</strong> ${q(Yu(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${p(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function Nd(e){let t=!e.activo;return`
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
  `}function Pd(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${q(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${q(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function Fd(e,t){let n=e.usuario===t,r=K.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${Ou(e.ultimoIngreso)} ${Du(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${Ou(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
    <li class="adm-user-row ${e.activo?``:`is-off`}">
      <div class="adm-user-head">
        <strong>${q(e.nombre)}</strong>
        <span class="adm-muted">usuario: ${q(e.usuario)}</span>
        <span class="adm-pill adm-pill--neutral">${q(at[e.rol]||e.rol)}</span>
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
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${q(e.usuario)}">${Ad(r)}</select>
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
      ${!n&&G.resetFor===e.usuario?Nd(e):``}
      ${!n&&G.confirmOff===e.usuario?Pd(e):``}
    </li>
  `}function Id(){let e=Au().usuario,t=(G.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=G.users===null&&G.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:G.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>Fd(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${p(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${G.users?`${Y(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${jd()}

      <div class="adm-form-actions">
        <button class="adm-button ${G.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${G.showCreate}" aria-controls="adm-create">
          ${p(G.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${G.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${G.showCreate?Md():``}
      ${td(`users`)}
      ${r}

      <h3 class="adm-subtitle">Qué puede ver cada rol</h3>
      <ul class="adm-role-help">
        ${Object.keys(at).map(e=>`<li><strong>${at[e]}:</strong> ${q(Yu(e))}</li>`).join(``)}
      </ul>
    </section>
  `}function Ld(){let{conflicts:e,missing:t,notRouted:n}=ad(),r=od();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${p(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${It}).</p>
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
                  <td>${q(e.shift)} · ${q(cd(e.shift))}</td>
                  <td>${q(Su(e.days))}</td>
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
            <span class="adm-safety-meta">${q(e.shifts.join(` y `))} · ${q(Su(e.days))}</span>
            <span class="adm-safety-notes">${e.safety.map(e=>`<span class="adm-pill adm-pill--danger">${q(e)}</span>`).join(``)}</span>
          </li>
        `).join(``)}
      </ul>

      ${t.length||n.length?`
        <ul class="adm-footnotes">
          ${t.map(e=>`<li>${q(e.dog)} figura “no juntar con ${q(e.other)}”, pero ${q(e.other)} no está en el registro: ${v}.</li>`).join(``)}
          ${n.map(e=>`<li>${q(e.dog)} y ${q(e.other)} figuran “no juntar”. Hoy ${q(e.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join(``)}
        </ul>
      `:``}
    </section>
  `}function Rd(e,t,{title:n,summary:r,iconName:i},a){return`
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
  `}function zd(e){let t=sd().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return Rd(`adm-datos`,e,{title:`Datos a revisar`,summary:`${Y(t.length,`perro`,`perros`)} · ${Y(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${q(y.officialSources.dogs)}).</p>
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
  `)}function Bd(e){let t=id();return Rd(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${q(t.busiest.length?J(t.busiest):`Sin datos`)} (${Y(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${It}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-load">
        <caption class="adm-sr-only">Perros por día y turno</caption>
        <thead>
          <tr>
            <th scope="col">Día</th>
            <th scope="col">Mañana <span class="adm-th-sub">${b.manana.from} a ${b.manana.to}</span></th>
            <th scope="col">Tarde <span class="adm-th-sub">${b.tarde.from} a ${b.tarde.to}</span></th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          ${t.rows.map(e=>{let n=t.busiest.includes(e.day);return`
              <tr class="${n?`is-busiest`:``}">
                <th scope="row">
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${xu[e.day]}</span>
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
      <li>Mañana: ruta ${b.manana.route}, supervisa ${b.manana.supervisor}. Tarde: rutas ${b.tarde.routes.join(` y `)}, supervisa ${b.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${q(Wt.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function Vd(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function Hd(e){let t=rd(),n=id(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${It}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${It}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...Wt,...i];return Rd(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${Vd(e.kind)}">${q(e.kind)}</span>
          <strong class="adm-fact-value">${q(e.value)}</strong>
          <span class="adm-fact-label">${q(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${q(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner">
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(Ht).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${q(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var Ud={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},Wd=[{role:`Admin`,who:Rt.admin,can:[`Ve y decide sobre todo el sistema`,`Usuarios, pagos e indicadores`,`Único rol que ve y carga pagos`]},{role:`Coordinador`,who:`${Rt.coordinador} (${v.toLowerCase()})`,can:[`Armar rutas y horarios (plantilla semanal y cambios del día)`,`Gestionar los clientes de los paseos`,`Atender pedidos y cargar fichas`,`Avisar lo que pasa en cada barrio`,`No ve plata`]},{role:`Supervisor`,who:Rt.supervisor,can:[`Controlar los paseos del momento`,`Quién falta retirar y atrasos contra el horario`,`Entregas, incidentes y equipo`,`Ve las rutas, no las arma`]},{role:`Paseador`,who:Rt.paseador,can:[`Hacer su ruta del turno, en orden y con horario`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`]},{role:`Ayudante de paseador`,who:v,can:[`Acompañar al paseador en su ruta`,`Marcar pasos`,`Reportar incidentes`,`Sin datos de clientes`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function Gd(e){return Rd(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${Y(Lt.length,`persona`,`personas`)} · ${Wd.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${Lt.map(e=>{let t=Ud[e.role];return`
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${q(e.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${q(e.label)}</span>
            </div>
            <p>${q(e.tasks)}</p>
            <p class="adm-person-panel">Panel: ${t?`<a href="${t.path}" data-link>${t.panel}</a>`:`<span class="adm-pending">${v}</span>`}</p>
          </li>
        `}).join(``)}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${Wd.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${q(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${q(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function Kd(e){return Rd(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${zt.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${du.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${zt.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${du.map(t=>`<td>${C(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${du.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${du.map(e=>`<td>${C(Bt[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${du.map(e=>`<td>${C(Bt[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Vt.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${v.toLowerCase()}.</p>
  `)}function qd(e){let[t,n]=String(e).split(`-`).map(Number);if(!t||!n)return e;let r=new Intl.DateTimeFormat(`es-AR`,{month:`long`,year:`numeric`,timeZone:`UTC`}).format(new Date(Date.UTC(t,n-1,15)));return r.charAt(0).toUpperCase()+r.slice(1)}function Jd(e){let t=String(e||``).replace(/[$\s]/g,``);return t.includes(`,`)?t=t.replace(/\./g,``).replace(`,`,`.`):/^\d{1,3}(\.\d{3})+$/.test(t)&&(t=t.replace(/\./g,``)),/^\d+(\.\d+)?$/.test(t)?Number(t):NaN}function Yd(){let e=g.cached(`pagos`,X(`pagos`)).slice().sort((e,t)=>String(t.fecha||``).localeCompare(String(e.fecha||``))||String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),t=_().slice(0,7),n=[...new Set([t,...e.map(e=>String(e.fecha||``).slice(0,7)).filter(e=>/^\d{4}-\d{2}$/.test(e))])].sort().reverse(),r=G.pagosMes&&(G.pagosMes===`todos`||n.includes(G.pagosMes))?G.pagosMes:t,i=r===`todos`?e:e.filter(e=>String(e.fecha||``).startsWith(r)),a=e.filter(e=>!e.pasadoAlLibro),o=i.reduce((e,t)=>e+(Number(t.monto)||0),0),s=e.filter(e=>{let t=G.users?.find(t=>t.usuario===e.creadoPor)?.rol;return t&&t!==`admin`});return{all:e,months:n,mes:r,filtered:i,faltan:a,faltanMes:i.filter(e=>!e.pasadoAlLibro),total:o,deOtros:s}}function Xd(e){let t=G.users?.find(t=>t.usuario===e.creadoPor),n=t&&t.rol!==`admin`,r=Number(e.monto),i=e.monto!==``&&e.monto!==null&&e.monto!==void 0&&Number.isFinite(r);return`
    <li class="adm-pago ${e.pasadoAlLibro?``:`is-missing`}">
      <div class="adm-pago-main">
        <span class="adm-pago-date">${q(ku(e.fecha)||Ou(e.creadoEn)||`Pendiente de confirmar`)}</span>
        <strong class="adm-pago-concept">${q(e.concepto||`Sin concepto`)}</strong>
        <span class="adm-pago-amount">${i?q(C(r)):v}</span>
      </div>
      <div class="adm-pago-meta">
        <span class="adm-pill adm-pill--neutral">${q(e.medio||`Medio sin indicar`)}</span>
        <span class="adm-pill ${e.pasadoAlLibro?`adm-pill--ok`:`adm-pill--warning`}">${e.pasadoAlLibro?`Pasado al Libro`:`Falta pasar al Libro`}</span>
        ${e.pendiente?`<span class="adm-pill adm-pill--info">Se enviará cuando haya señal</span>`:``}
        ${n?`<span class="adm-pill adm-pill--info">Lo cargó ${q(at[t.rol]||t.rol)} antes del cambio</span>`:``}
      </div>
      ${vd(e,!0)?`<p class="adm-note">${q(vd(e,!0))}.</p>`:``}
      <button class="adm-link-button" type="button" data-adm-pago-libro="${q(e.id)}" aria-pressed="${e.pasadoAlLibro?`true`:`false`}">
        ${e.pasadoAlLibro?`Desmarcar “pasado al Libro”`:`Marcar como pasado al Libro`}
      </button>
    </li>
  `}function Zd(e){let t=Yd(),n=K.pago,r=t.filtered.slice(0,20),i=t.mes===`todos`?`todos los meses`:qd(t.mes).toLowerCase();return Rd(`adm-pagos`,e,{title:`Pagos · registro de apoyo`,summary:t.faltan.length?`${Y(t.faltan.length,`pago falta`,`pagos faltan`)} pasar al Libro contable`:`Nada pendiente de pasar al Libro contable`,iconName:`receipt`},`
    <div class="adm-official">
      ${p(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: ${vu}</strong>
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
          <datalist id="adm-pago-medios">${_u.map(e=>`<option value="${q(e)}"></option>`).join(``)}</datalist>
        </label>
      </div>
      <label class="adm-check" for="adm-pago-libro">
        <input id="adm-pago-libro" type="checkbox" ${n.pasadoAlLibro?`checked`:``} data-adm-draft="pago" data-adm-key="pasadoAlLibro" />
        <span>Ya lo pasé al Libro contable</span>
      </label>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" id="adm-pago-guardar" type="submit">${p(`plus`,`adm-icon-sm`)} Guardar pago</button>
      </div>
    </form>
    ${td(`pagos`)}

    <div class="adm-pagos-head">
      <label class="adm-field adm-field--inline" for="adm-pagos-mes">
        <span>Mes</span>
        <select class="adm-input adm-input--sm" id="adm-pagos-mes" data-adm-pagos-mes>
          ${t.months.map(e=>`<option value="${e}" ${e===t.mes?`selected`:``}>${q(qd(e))}</option>`).join(``)}
          <option value="todos" ${t.mes===`todos`?`selected`:``}>Todos los meses</option>
        </select>
      </label>
      <p class="adm-pagos-summary">
        <strong>${Y(t.filtered.length,`pago`,`pagos`)}</strong> en ${q(i)} · suma ${q(C(t.total))} ·
        <strong class="${t.faltanMes.length?`adm-text-warning`:``}" data-adm-pagos-faltan>${t.faltanMes.length} sin pasar al Libro</strong>${t.mes!==`todos`&&t.faltan.length!==t.faltanMes.length?` (${t.faltan.length} contando todos los meses)`:``}
      </p>
    </div>
    ${t.deOtros.length?`<p class="adm-note">${t.deOtros.length===1?`1 pago lo cargó`:`${t.deOtros.length} pagos los cargó`} otro rol antes del cambio de roles (el coordinador ya no ve plata). Se ven acá con la marca “antes del cambio”.</p>`:``}
    ${r.length?`
      <ul class="adm-pago-list" aria-label="Pagos de ${q(i)}">${r.map(Xd).join(``)}</ul>
      ${t.filtered.length>r.length?`<p class="adm-note">Se muestran los últimos ${r.length}. Hay ${Y(t.filtered.length-r.length,`pago más`,`pagos más`)} en ${q(i)}.</p>`:``}
    `:`<p class="adm-empty">No hay pagos cargados en ${q(i)}.</p>`}
    <p class="adm-note">La suma es solo de este registro de apoyo: no reemplaza al Libro contable.</p>
  `)}var Qd=[[`activo`,`Activos`],[`pausa`,`En pausa`],[`baja`,`Baja`]];function $d(){let e=g.cached(`clientes`,X(`clientes`)),t=new Map;e.forEach(e=>{let n=String(e.barrio||``).trim()||`Sin barrio`;t.has(n)||t.set(n,{barrio:n,activo:0,pausa:0,baja:0,otro:0});let r=t.get(n),i=String(e.estado||``).toLowerCase();Qd.some(([e])=>e===i)?r[i]+=1:r.otro+=1});let n=[...t.values()].sort((e,t)=>t.activo-e.activo||e.barrio.localeCompare(t.barrio)),r={activo:0,pausa:0,baja:0,otro:0};return n.forEach(e=>Object.keys(r).forEach(t=>{r[t]+=e[t]})),{total:e.length,rows:n,totals:r}}function ef(e){let t=$d(),n=t.totals.otro>0;return Rd(`adm-clientes`,e,{title:`Clientes por barrio`,summary:t.total?`${Y(t.totals.activo,`activo`,`activos`)} · ${t.totals.pausa} en pausa · ${t.totals.baja} de baja`:`Todavía no hay clientes cargados en la app`,iconName:`mapPin`},`
    <p class="adm-lead">Resumen de solo lectura de lo que carga el coordinador. Sin teléfonos ni domicilios.</p>
    ${t.total?`
      <div class="adm-table-wrap">
        <table class="adm-table adm-clients">
          <caption class="adm-sr-only">Clientes por barrio y estado</caption>
          <thead>
            <tr><th scope="col">Barrio</th>${Qd.map(([,e])=>`<th scope="col">${e}</th>`).join(``)}${n?`<th scope="col">Sin estado</th>`:``}</tr>
          </thead>
          <tbody>
            ${t.rows.map(e=>`
              <tr><th scope="row">${q(e.barrio)}</th>${Qd.map(([t])=>`<td>${e[t]}</td>`).join(``)}${n?`<td>${e.otro}</td>`:``}</tr>
            `).join(``)}
          </tbody>
          <tfoot>
            <tr><th scope="row">Total</th>${Qd.map(([e])=>`<td>${t.totals[e]}</td>`).join(``)}${n?`<td>${t.totals.otro}</td>`:``}</tr>
          </tfoot>
        </table>
      </div>
    `:`<p class="adm-empty">El coordinador todavía no cargó clientes en la app.</p>`}
  `)}function tf(e){let t=ud();return Rd(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${p(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${q(y.officialSources.money)}. Esta sección no muestra montos cobrados: los pagos que anotes de apoyo están en <a class="adm-inline-link" href="#adm-pagos" data-adm-goto="adm-pagos">Pagos</a>.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${C(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${Y(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${C(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${C(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${Y(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${v.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${q(e)}: ${J(t.excluded.filter(t=>t.plan===e).map(e=>q(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function nf(){let e=y.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${It}.</strong> Perros: ${q(e.dogs)}. Rutas: ${q(e.routes)}. Plata: ${q(e.money)}.</p>
      <p>Esta página no muestra teléfonos ni domicilios de tutores. Los pagos anotados acá son un registro de apoyo (solo admin): la fuente oficial es el ${vu}.</p>
    </footer>
  `}function rf(){let{dayName:e,date:t}=Cu(),n=Hu(),r=ld(n),i=wu(),a=r.find(e=>!i.includes(e.id)),o=id(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,`Perros atrasados (más de ${gu} min sin retiro): ${n.late.length}. Avisos por barrio vigentes: ${n.avisos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${J(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${It}.`].join(`
`)}async function af(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function of(e){yu=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=yu)},60)}function sf(){Tu(lu,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function cf(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,sf());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function lf(e){return e.target.closest(`[data-admin-logout]`)?(G.credential=null,G.users=null,G.usersError=``,G.liveDay=null,G.adminLoaded=!1,G.pagosMes=null,K.pago=bu(),Cf(`/salir`),!0):!1}function uf(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function df(e,t){G.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function ff(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),G.busy))return;let n=t.dataset.admForm;if(n===`pago`)await pf(t);else if(n===`crear`){let e=K.crear,n=e.nombre.trim(),r=Zu(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?G.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:at[e.rol]?Qu(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Z(`users`,a,!0),Q();return}df(t,!0);try{let t=await st.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});G.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},K.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},G.showCreate=!1,Z(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),G.busy=!1,await Xu(),uf(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo crear el usuario.`,!0),G.busy=!1,Q()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=G.users?.find(t=>t.usuario===e),r=K.reset.pin.trim(),i=n?Qu(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Z(`users`,i,!0),Q();return}df(t,!0);try{let t=!n.activo;await st.save({usuario:e,pin:r,...t?{activo:!0}:{}}),G.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},G.resetFor=null,K.reset.pin=``,Z(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),G.busy=!1,await Xu(),uf(`#adm-cred`)}catch(e){Z(`users`,e.message||`No se pudo cambiar el PIN.`,!0),G.busy=!1,Q()}}}async function pf(e){let t=K.pago,n=t.concepto.trim(),r=t.medio.trim(),i=Jd(t.monto),a=``;if(/^\d{4}-\d{2}-\d{2}$/.test(t.fecha)?n.length<2?a=`Escribí el concepto (por ejemplo, el plan y la semana).`:(!Number.isFinite(i)||i<=0)&&(a=`Escribí el monto en pesos, solo números (por ejemplo 35000).`):a=`Elegí la fecha del pago.`,a)Z(`pagos`,a,!0),Q();else{df(e,!0);try{let e=await g.save(`pagos`,{fecha:t.fecha,concepto:n,monto:i,medio:r,pasadoAlLibro:t.pasadoAlLibro===!0});K.pago=bu(),G.pagosMes=t.fecha.slice(0,7),Z(`pagos`,e.pendiente?`Se enviará cuando haya señal. Queda anotado en este dispositivo.`:`Listo: pago de ${C(i)} guardado${t.pasadoAlLibro?``:`. Acordate de pasarlo al Libro contable`}.`)}catch(e){Z(`pagos`,e.message||`No se pudo guardar el pago.`,!0)}finally{G.busy=!1,Q()}}}async function mf(e){let t=g.cached(`pagos`,X(`pagos`)).find(t=>t.id===e);if(!t||G.busy)return;G.busy=!0;let n=!t.pasadoAlLibro;try{let r=await g.save(`pagos`,{id:e,fecha:t.fecha,pasadoAlLibro:n}),i=`${t.concepto||`El pago`}${t.fecha?` del ${ku(t.fecha)}`:``}`;Z(`pagos`,r.pendiente?`Se enviará cuando haya señal.`:n?`Listo: ${i} quedó como pasado al Libro.`:`Listo: ${i} quedó como pendiente de pasar al Libro.`)}catch(e){Z(`pagos`,e.message||`No se pudo cambiar la marca.`,!0)}finally{G.busy=!1,Q(),uf(`[data-adm-pago-libro="${CSS.escape(e)}"]`)}}async function hf(e,t,n){if(!G.busy){G.busy=!0;try{await e(),Z(`users`,t),G.busy=!1,await Xu()}catch(e){Z(`users`,e.message||n,!0),G.busy=!1,Q()}}}function gf(e){if(e.target.closest(`[data-adm-create-toggle]`))return G.showCreate=!G.showCreate,G.resetFor=null,G.confirmOff=null,$(),uf(G.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return G.usersError=``,Xu().then(()=>{G.usersError||(Z(`users`,`Lista de usuarios actualizada.`),Q())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;K[e].pin=$u();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=K[e].pin),of(`PIN generado: ${K[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=G.users?.find(t=>t.usuario===e);if(!t)return!0;let r=K.roles[e]||t.rol;return r===t.rol?(Z(`users`,`${t.nombre} ya tiene el rol ${at[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Q(),!0):(hf(async()=>{await st.save({usuario:e,rol:r}),delete K.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${at[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return G.resetFor=G.resetFor===e?null:e,G.confirmOff=null,K.reset.pin=``,$(),G.resetFor&&uf(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=G.resetFor||``;return G.resetFor=null,K.reset.pin=``,$(),uf(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return G.confirmOff=i.dataset.admOff,G.resetFor=null,$(),uf(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=G.confirmOff||``;return G.confirmOff=null,$(),uf(`[data-adm-off="${CSS.escape(e)}"]`),of(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=G.users?.find(t=>t.usuario===e);return G.confirmOff=null,hf(()=>st.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}if(e.target.closest(`[data-adm-cred-copy]`))return G.credential&&af(ed(G.credential)).then(e=>{of(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0;if(e.target.closest(`[data-adm-cred-hide]`))return G.credential=null,$(),uf(`#adm-usuarios`),of(`Listo. El PIN ya no se muestra.`),!0;if(e.target.closest(`[data-adm-live-refresh]`))return Ku(!0),!0;let o=e.target.closest(`[data-adm-pago-libro]`);return o?(mf(o.dataset.admPagoLibro),!0):!1}function _f(e){let t=e.target.closest?.(`[data-adm-pagos-mes]`);if(t){e.type===`change`&&G.pagosMes!==t.value&&(G.pagosMes=t.value,Q(),of(`Pagos de ${t.value===`todos`?`todos los meses`:qd(t.value).toLowerCase()}.`));return}let n=e.target.closest?.(`[data-adm-draft]`);if(!n)return;let r=n.dataset.admDraft,i=n.dataset.admKey,a=n.type===`checkbox`?n.checked:n.value;if(r===`roles`?K.roles[i]=a:K[r][i]=a,r===`crear`&&i===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${q(at[n.value]||n.value)}:</strong> ${q(Yu(n.value))}`)}}function vf(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=wu(),r=n.includes(e);return Tu(cu,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),of(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),cf(n.dataset.admGoto),!0;if(gf(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),sf(),of(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(af(rf()).then(e=>{of(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function yf(e){if(e.target.matches?.(`[data-adm-section]`)&&sf(),e.target.matches?.(`[data-adm-dogs]`)){let t=e.target.dataset.admDogs;e.target.open?G.openDogs.add(t):G.openDogs.delete(t)}}function bf(){be.push(lf),Se.push(vf),document.addEventListener(`toggle`,yf,!0),document.addEventListener(`submit`,ff),document.addEventListener(`input`,_f),document.addEventListener(`change`,_f),nt(e=>{(mu.includes(e)||hu.includes(e))&&Q()}),setInterval(()=>{if(!Mu()||h.user()?.rol!==`admin`||document.visibilityState!==`visible`)return;let e=Uu(Hu());e!==G.lateSignature&&(G.lateSignature=e,Q())},3e4),window.addEventListener(`online`,()=>Q()),window.addEventListener(`offline`,()=>Q())}var xf=document.querySelector(`#app`);function Sf(e){return e.replace(/\/+$/,``)||`/`}function Cf(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ee(),Tt(),Ft(),mr(),Ta(),Ks(),su(),bf(),document.addEventListener(`click`,e=>{if(Ce(be,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),Cf(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{Ce(xe,e)});function $(){let e=Sf(window.location.pathname);if(e===`/`){xf.innerHTML=gt(),Tf();return}if(e===`/login`){xf.innerHTML=kt(),Tf();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),h.clear(),xf.innerHTML=kt(),Tf();return}if(e===`/registro`||e===`/register`){xf.innerHTML=jt(),Tf();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(xf.innerHTML=wf(r),Tf()):(xf.innerHTML=ge(),Tf())}function wf(e){if(e===`cliente`)return Ef(e);let t=h.user();return t?(it[t.rol]||[]).includes(e)?Ef(e):Mt(e):(window.history.replaceState({},``,`/login?volver=/${e}`),kt())}function Tf(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=_e()+ye(),document.body.classList.toggle(`menu-locked`,e.menuOpen),Ge(),We()}function Ef(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:pd,coordinador:kl,supervisor:ys,paseador:zi,cliente:zn}[e]();return i?Ri(o):a?_s(o):e===`coordinador`?Dl(o):e===`admin`?dd(o):le(`
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
  `,e)}He(),nt(e=>{e===`sesion`&&$()}),h.user()&&(h.refresh().catch(()=>{}),pt()),Re(()=>We()),$(),document.addEventListener(`click`,e=>{Ce(Se,e)});