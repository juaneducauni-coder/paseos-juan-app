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
  `}function Ve(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){Ae=!Ae,Be(),Ae?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);m={...m,[e]:n},Me(),Re(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else Ae&&!e.target.closest(`#a11y-root`)&&(Ae=!1,Be())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&Ae&&(Ae=!1,Be(),document.querySelector(`.a11y-toggle`)?.focus())}),Ne.addEventListener?.(`change`,Re),Pe.addEventListener?.(`change`,Re),Re()}var He={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function Ue(){He.frame&&cancelAnimationFrame(He.frame),He.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Ie(),r=Fe()?[22,52,39]:[184,218,198],i=Fe()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=He.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-He.lastDraw>33&&(He.lastDraw=e,s(e/1e3)),He.frame=requestAnimationFrame(l)}He.frame=requestAnimationFrame(l)}function We(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var Ge=`pj_sesion`,Ke=`pj_pendientes`,qe=`pj_cache_`,Je=6e4,Ye=new Set,Xe=new Map;function Ze(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Qe(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function $e(e){Ye.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function et(e){return Ye.add(e),()=>Ye.delete(e)}var tt=class extends Error{constructor(e,t){super(t),this.status=e}};async function h(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=g.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new tt(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(g.clear(),$e(`sesion`)),!o.ok||s.ok===!1)throw new tt(o.status,s.error||`Error del servidor.`);return s}var g={token:()=>Ze(Ge,null)?.token||null,user:()=>Ze(Ge,null)?.user||null,set(e,t){Qe(Ge,{token:e,user:t}),$e(`sesion`)},clear(){try{localStorage.removeItem(Ge),Object.keys(localStorage).filter(e=>e.startsWith(qe)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return h(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await h(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return g.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await h(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return g.set(i.token,i.user),i.user},async refresh(){let e=g.token();if(!e)return null;let t=await h(`/api/auth/me`);return t.user&&g.token()===e&&g.set(e,t.user),t.user},async changePin(e,t){let n=await h(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return g.set(n.token,n.user),n.user},logout(){g.clear(),$e(`sesion`)}},nt={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],marketing:[]};function rt(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`}[e]||`/`}var it={list:async()=>(await h(`/api/usuarios`)).usuarios,save:async e=>(await h(`/api/usuarios`,{method:`POST`,body:e})).usuario,deactivate:e=>h(`/api/usuarios?usuario=${encodeURIComponent(e)}`,{method:`DELETE`})};function at(e,t={}){return`${qe}${e}_${t.desde||``}_${t.prefijo||``}`}function ot(e,t){let n=Ze(Ke,[]).filter(t=>t.col===e&&t.op===`save`);if(!n.length)return t;let r=new Map(t.map(e=>[e.id,e]));return n.forEach(e=>r.set(e.data.id,{...r.get(e.data.id)||{},...e.data,pendiente:!0})),[...r.values()]}var _={cached(e,t={}){return ot(e,Ze(at(e,t),[]))},async list(e,t={}){let n=new URLSearchParams({col:e});t.desde&&n.set(`desde`,t.desde),t.prefijo&&n.set(`prefijo`,t.prefijo);try{let r=await h(`/api/registros?${n}`),i=localStorage.getItem(at(e,t));return Qe(at(e,t),r.registros),i!==JSON.stringify(r.registros)&&$e(e),ot(e,r.registros)}catch(n){if(n.status===0)return _.cached(e,t);throw n}},async save(e,t){let n={...t};n.id||=st(n.fecha);try{let t=await h(`/api/registros`,{method:`POST`,body:{col:e,...n}});return ct(e,t.registro),$e(e),t.registro}catch(t){if(t.status!==0)throw t;let r=Ze(Ke,[]),i=r.find(t=>t.col===e&&t.data.id===n.id),a=r.filter(t=>t!==i&&(t.col!==e||t.data.id!==n.id));return a.push({op:`save`,col:e,data:{...i?.data||{},...n},usuario:g.user()?.usuario,at:Date.now()}),Qe(Ke,a),$e(e),{...n,pendiente:!0}}},async remove(e,t){await h(`/api/registros?col=${encodeURIComponent(e)}&id=${encodeURIComponent(t)}`,{method:`DELETE`}),Object.keys(localStorage).filter(t=>t.startsWith(`${qe}${e}_`)).forEach(e=>{Qe(e,Ze(e,[]).filter(e=>e.id!==t))}),$e(e)},pendingCount(){return Ze(Ke,[]).length},watch(e,t={}){let n=at(e,t);if(Xe.has(n))return Xe.get(n);let r=()=>{document.visibilityState===`visible`&&g.token()&&_.list(e,t).catch(()=>{})};r();let i=setInterval(r,Je),a=()=>{clearInterval(i),Xe.delete(n)};return Xe.set(n,a),a}};function st(e){let t=e||new Date().toISOString().slice(0,10),n=Math.random().toString(16).slice(2,8);return`${t}_${Date.now().toString(36)}_${n}`}function ct(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${qe}${e}_`)).forEach(e=>{let n=Ze(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Qe(e,n)})}var lt=!1;async function ut(){if(lt||!g.token())return 0;let e=g.user()?.usuario,t=Ze(Ke,[]);if(!t.length)return 0;lt=!0;let n=new Set,r=new Set;try{for(let i of t)if(i.usuario&&i.usuario!==e)n.add(i.at);else try{if(i.op===`save`){let e=await h(`/api/registros`,{method:`POST`,body:{col:i.col,...i.data}});ct(i.col,e.registro),r.add(i.col)}n.add(i.at)}catch(e){e.status!==0&&n.add(i.at)}}finally{Qe(Ke,Ze(Ke,[]).filter(e=>!n.has(e.at))),lt=!1,r.forEach(e=>$e(e))}return n.size}window.addEventListener(`online`,()=>ut()),setInterval(()=>ut(),3e4);async function dt(e){return h(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function v(e=new Date){return new Intl.DateTimeFormat(`en-CA`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`}).format(e)}function ft(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function pt(){return le(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${mt()}
      ${ht()}
      ${gt()}
      ${bt()}
      <a class="whatsapp" href="${oe(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function mt(){return`
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
  `}function ht(){return`
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

    ${_t()}

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
  `}function gt(){return`
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
  `}function _t(){return`
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

        ${vt()}
      </div>
    </section>
  `}function vt(){return ft()?`
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
  `}function yt(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`)].filter(e=>e!==null).join(`
`)}function bt(){return`
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
  `}function xt(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(oe(yt(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,dt(Object.fromEntries(i)).then(()=>{n.textContent=`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function St(){document.addEventListener(`submit`,xt)}var Ct=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),y={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function wt(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function Tt(){let e=g.user();if(e)return Et(e);y.necesitaConfiguracion===null&&!y.cargando&&(y.cargando=!0,g.status().then(e=>{y.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{y={...y,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{y.cargando=!1,$()}));let t=y.necesitaConfiguracion===!0;return le(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${y.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>`}
        <p class="acc-status ${y.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${Ct(y.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function Et(e){return le(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${Ct(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${Ct(e.usuario)}</strong> (${Ct(e.rol)}).</p>
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
  `)}function Dt(){return le(`
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
  `)}function Ot(e){let t=g.user(),n=nt[t?.rol]||[];return le(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${Ct(t?.nombre)}</strong> (${Ct(t?.rol)}) y la página de ${Ct(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function kt(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function At(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return kt(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return kt(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return kt(t,`Completá usuario y PIN.`,!0);i.disabled=!0,kt(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){let e=await g.changePin(r.actual,r.nuevo);t.reset(),kt(t,`Listo: tu PIN quedó cambiado.`),rt(e.rol)!==`/`&&setTimeout(()=>ed(rt(e.rol)),900);return}let e=n===`setup`?await g.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin}):await g.login(r.usuario,r.pin);if(y={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1},e.debeCambiarPin){ed(`/login`);return}let i=wt();ed(i&&(nt[e.rol]||[]).includes(i.slice(1))?i:rt(e.rol))}catch(e){kt(t,e instanceof tt?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function jt(){document.addEventListener(`submit`,At)}var b=`Pendiente de confirmar`,Mt=`12/11/2026`,x={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},Nt=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Pt={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},S={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},C=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],Ft=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],It={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Lt=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],Rt={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},w=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),zt=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],Bt=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],Vt=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function Ht(e,t,n){return!!e.schedule?.[t]?.includes(n)}function Ut(e,t){return w.filter(n=>Ht(n,e,t))}function Wt(e=new Date){return C[(e.getDay()+6)%7]}function T(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var E={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},Gt=`Tu perro`,Kt={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},qt=[`Pequeño`,`Mediano`,`Grande`],Jt=C.filter(e=>e!==`Domingo`),Yt={Mañana:S.manana,Tarde:S.tarde};function Xt(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Zt(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function Qt(){let e=Xt(E.plan,null);if(!e||typeof e!=`object`)return{...Kt};let t=Ft.find(t=>t.id===e.planId)?e.planId:Kt.planId,n=qt.includes(e.size)?e.size:Kt.size,r=Yt[e.shift]?e.shift:Kt.shift,i=Array.isArray(e.days)?Jt.filter(t=>e.days.includes(t)):Kt.days;return{planId:t,size:n,shift:r,days:i.length?i:Kt.days}}function $t(){let e=Xt(E.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function en(){let e=Xt(E.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function tn(e){let t=Xt(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function nn(){let e=Xt(E.carnet,null);return e&&typeof e.name==`string`?e:null}function D(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function rn(e){return`https://wa.me/${x.whatsapp}?text=${encodeURIComponent(e)}`}function an(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function on(e,t){return new Date(e.getTime()+t*864e5)}function sn(e){return C[(e.getUTCDay()+6)%7]}function cn(e){return e.toISOString().slice(0,10)}function ln(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function un(e){let[t,n,r]=e.split(`-`).map(Number);return ln(new Date(Date.UTC(t,n-1,r)))}function dn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function fn(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function pn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function mn(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function hn(e,t,n){return`${e} ${e===1?t:n}`}function gn(){let e=Qt(),t=Ft.find(t=>t.id===e.planId),n=Yt[e.shift],r=$t(),i=an(),a=cn(i.date),o=en().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||Gt}}function _n(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=sn(r.date),s=fn(n.from),c=fn(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function vn(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=on(a.date,e);r.days.includes(sn(t))&&(e===0&&a.minutes>fn(i.to)||n&&o.has(cn(t))||s.push(t))}return s}var yn=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],bn=yn.flatMap(e=>e.fields);function xn(e,t){return!!String(e[t]??``).trim()}function Sn(e,t){return t.fields.filter(t=>xn(e,t.key)).length}function Cn(e){return bn.filter(t=>xn(e,t.key)).length}function wn(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function Tn(e){let{ficha:t}=e,n=[],r=yn.find(e=>e.id===`emergencia`);Sn(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),nn()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=Cn(t);return i<bn.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${bn.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function En(e){return e.todayIso<=r.until}var O={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function Dn(e,t,n=``){O.status[e]={message:t,html:n}}function On(e){let t=O.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${D(t.message)} ${t.html}`.trim():``}</p>`}function kn(){return`
    <div class="cl-page" data-cl-root>
      ${An(gn())}
    </div>
  `}function An(e){return`
    <p class="cl-demo-note">
      ${p(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${jn(e)}
    ${Fn(e)}
    ${Ln()}
    ${Rn(e)}
    ${zn(e)}
    ${Bn(e)}
    <div class="cl-two-col">
      ${Gn()}
      ${Kn(e)}
    </div>
    ${En(e)?qn():``}
    ${Jn()}
  `}function jn(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=_n(e),c=wn(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=vn(e,1)[0],d=u&&cn(u)===e.todayIso,f=Tn(e),ee={libre:`Los días de paseo de tu plan son ${mn(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${p(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${D(a)}</strong>
            <small>${D(i.name)} · ${D(r.size)} · Turno ${D(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${D(sn(t.date))} ${ln(t.date)}</p>
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
          <p class="cl-fine">El estado sigue el horario del turno. El seguimiento en vivo todavía no está disponible. Horario exacto de retiro: <strong>${b}</strong> (te lo confirmamos por WhatsApp).</p>
        `:``}
        <div data-cl-region="alertas-hoy">${Nn(c,!0)}</div>
        ${Pn(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${p(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:D(sn(u))}</p>
            <p class="cl-next-date">${d?`${D(sn(u))} ${ln(u)}`:ln(u)}</p>
            <p class="cl-next-shift">Turno ${D(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${b}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${Mn(e,f)}</div>
        </article>
      </div>
    </section>
  `}function Mn(e,t=Tn(e)){return t.length?`
    <ol class="cl-pending-list">
      ${t.map((e,t)=>`
        <li>
          <button type="button" class="cl-pending-item" data-cl-go="${e.go}">
            <span class="cl-pending-num" aria-hidden="true">${t+1}</span>
            <span>
              <strong>${D(e.text)}</strong>
              <small>${D(e.detail)}</small>
            </span>
            ${p(`arrowRight`,`cl-icon-sm`)}
          </button>
        </li>
      `).join(``)}
    </ol>
  `:`<p class="cl-all-done">${p(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function Nn(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${p(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${D(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function Pn(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=on(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${C.map((e,t)=>on(a,t)).map(e=>{let t=cn(e),a=sn(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${ln(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${pn(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function Fn(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${p(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${rn(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${D(x.whatsappLabel)}</small></span>
      </a>
      ${En(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${p(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${D(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function In(){return`Ahora: tema ${Fe()?`oscuro`:`claro`} · movimiento ${Ie()?`calmo (sin movimiento)`:`normal`}.`}function Ln(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${p(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${In()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function Rn(e){let t=vn(e,10);return`
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
                ${t.map(t=>`<option value="${cn(t)}">${D(sn(t))} ${ln(t)} · turno ${D(e.settings.shift.toLowerCase())}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-absence-reason"><span>Motivo <span class="cl-optional">(opcional)</span></span>
              <input id="cl-absence-reason" type="text" maxlength="140" placeholder="Por ejemplo: viaje" data-cl-absence-reason />
            </label>
            <button type="button" class="cl-btn" data-cl-absence-save>
              ${p(`message`,`cl-icon-sm`)} Avisar por WhatsApp
            </button>
            <p class="cl-fine">Se abre WhatsApp con el mensaje listo: solo tenés que tocar Enviar. El aviso también queda anotado en este dispositivo.</p>
          `:`<p>${b}: no hay próximos paseos con los días de tu plan.</p>`}
          ${On(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${D(sn(dn(e.date)))} ${un(e.date)}</strong>
                    ${e.reason?`<small>${D(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${D(e.date)}" aria-label="Quitar la ausencia del ${un(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function zn(e){let{plan:t,settings:n,shift:r}=e,i=It[n.size],a=n.days.length===t.walks;return`
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
          <p class="cl-plan-name">${D(t.name)}</p>
          <p class="cl-plan-walks">${hn(t.walks,`paseo`,`paseos`)} por semana · ${D(n.size)}</p>
          <p class="cl-plan-price"><b>${T(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${Jt.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${pn(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${D(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${b}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${p(`alertCircle`,`cl-icon-sm`)} El ${D(t.name)} incluye ${hn(t.walks,`paseo`,`paseos`)} por semana y hay ${hn(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${D(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${Ft.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${D(e.name)}</strong>
            <span>${hn(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${T(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${D(n.size.toLowerCase())}):</strong> individual ${T(i.individual)} · en grupo ${T(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Lt.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${O.openGroups.has(`plan`)?`open`:``}>
        <summary>${p(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${Ft.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${D(e.name)} · ${hn(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${qt.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(Yt).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${Jt.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${On(`plan`)}
        </div>
      </details>
    </section>
  `}function Bn(e){let{ficha:t}=e,n=Cn(t),r=bn.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${D(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${b}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${Vn(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${D(Rt[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${b}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${Nn(wn(t))}</div>

      <div class="cl-ficha-groups">
        ${yn.map(e=>Un(e,t)).join(``)}
      </div>
      ${On(`ficha`)}
    </section>
  `}function Vn(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function Hn(e,t){let n=Sn(e,t);return n===t.fields.length?`<span class="cl-count is-done">${p(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${b.toLowerCase()}</span>`}function Un(e,t){let n=O.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${p(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${Hn(t,e)}</span>
        ${p(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>Wn(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function Wn(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${b}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${D(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${D(e.placeholder||`Pendiente de confirmar`)}">${D(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${D(r)}" placeholder="${D(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${xn(t,e.key)?``:b}</small>`:``}
    </label>
  `}function Gn(){let e=nn();return`
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
        <div><dt>Archivo</dt><dd>${e?D(e.name):`Sin archivo`}</dd></div>
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${D(e.date)}`:b}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${rn(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${On(`carnet`)}
    </section>
  `}function Kn(e){let t=tn(E.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${T(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${rn(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
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
              <span><strong>${D(e.name)}</strong><small>Cargado el ${D(e.date)} · Pendiente de confirmación</small></span>
            </li>
          `).join(``)}
        </ul>
        <a class="cl-btn is-secondary" href="${rn(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${p(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${On(`comprobante`)}
    </section>
  `}function qn(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${p(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${D(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${D(r.title)}</h2>
        <p>${D(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${rn(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function Jn(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${p(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${O.resetArmed?`is-danger`:``}" data-cl-reset>
        ${O.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${On(`privacidad`)}
    </section>
  `}function Yn(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=An(gn()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function Xn(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=gn();Object.entries({pendientes:()=>Mn(t),"alertas-hoy":()=>Nn(wn(t.ficha),!0),"alertas-ficha":()=>Nn(wn(t.ficha)),"ficha-progreso":()=>Vn(Cn(t.ficha),bn.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),yn.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=Hn(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=xn(t.ficha,e.dataset.clFieldState)?``:b})}function Zn(e,t,n=``){Dn(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${D(t)} ${n}`.trim())}function Qn(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,O.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Ie()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function $n(){return ln(an().date)}function er(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return Qn(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=gn(),r=en().filter(t=>t.date!==e);r.push({date:e,reason:t}),Zt(E.ausencias,r);let i=rn([`Hola, aviso que ${n.dogName===Gt?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${sn(dn(e)).toLowerCase()} ${un(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),Dn(`ausencia`,`Listo: anotamos la ausencia del ${un(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),Yn(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return Zt(E.ausencias,en().filter(t=>t.date!==e)),Dn(`ausencia`,`Quitamos la ausencia del ${un(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),Yn(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=Ft.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(Zn(`plan`,`El ${r.name} incluye ${hn(r.walks,`paseo`,`paseos`)} por semana: elegí ${hn(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(Zt(E.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),Dn(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),Yn(`[data-cl-plan-save]`),!0):(Zn(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return O.resetArmed?(Object.values(E).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),O.resetArmed=!1,O.status={},Dn(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),Yn(`[data-cl-reset]`),!0):(O.resetArmed=!0,Yn(`[data-cl-reset]`),!0);if(O.resetArmed&&!e.target.closest(`[data-cl-reset]`)){O.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function tr(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:$n()};if(t.dataset.clFile===`carnet`)Zt(E.carnet,n),Dn(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),Yn(`[data-cl-status='carnet']`);else{let t=[n,...tn(E.comprobantes)].slice(0,10);Zt(E.comprobantes,t),Dn(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),Yn(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=$t();Zn(`ficha`,Zt(E.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function nr(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=$t();Zt(E.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),Xn()}function rr(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?O.openGroups.add(t.dataset.clDetails):O.openGroups.delete(t.dataset.clDetails))}function ir(){be.push(er),xe.push(tr),document.addEventListener(`input`,nr),document.addEventListener(`toggle`,rr,!0),Le(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${In()} Se guarda solo en este dispositivo.`)})}var ar=`America/Argentina/Buenos_Aires`,or=`paseosJuan_paseador_progreso`,sr=`paseosJuan_paseador_equipo`,cr=`paseosJuan_paseador_incidente`,k=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`,field:`horaRetiro`,estado:`retirado`},{label:`Paseo`,action:`Marcar en paseo`,done:`En paseo`,field:`horaPaseo`,estado:`paseando`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`,field:`horaEntrega`,estado:`entregado`}],lr={pendiente:0,retirado:1,paseando:2,entregado:3},ur=`no-sale`,dr={Mañana:`manana`,Tarde:`tarde`},fr={Mañana:S.manana,Tarde:S.tarde},pr=[`Bajo`,`Medio`,`Alto`],mr=[`No se ven`,`Sí`,`No sé`],hr=`Perro externo`,gr=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,A={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,incidentSavedText:``,equipStatus:``,syncError:``};function j(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function _r(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function vr(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function yr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:ar,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:Wt(t)}}function br(e){return e.minutes<810?`Mañana`:`Tarde`}function M(){let e=yr(),t=A.day||e.day;return{now:e,day:t,shift:A.shift||br(e),isToday:t===e.day}}function xr(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Sr(e){let t=fr[e];return`${t.from} a ${t.to}`}function Cr(e){let t=fr[e],n=t.routes||[t.route];return n.length>1?`Rutas ${xr(n)}`:`Ruta ${n[0]}`}function wr(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function Tr(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function Er(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${xr(i)}`),t=t.filter(e=>!e.includes(r))}return n}function Dr(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function Or(e){return e.safety.some(e=>/bozal/i.test(e))}var kr=zt.filter(e=>e.sebastian>0),Ar=zt.filter(e=>e.sebastian===0&&e.juan>0),jr=zt.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function Mr(){return g.user()||{}}function Nr(){return Mr().nombre||`equipo`}function Pr(e,t,n){return`${e}_${t}_${dr[n]}`}function Fr(e,t,n=Mr().usuario){return`${e}_${n||`sin-usuario`}_${dr[t]}`}var Ir=new Map;function Lr(e,t){let n=new Map(_.cached(e,{desde:t}).map(e=>[e.id,e]));return Ir.forEach((t,r)=>{r.startsWith(`${e}:`)&&n.set(t.id,{...n.get(t.id)||{},...t,enviando:!0})}),n}function Rr(e){let t=k.map(t=>e?.[t.field]?String(e[t.field]):``);if(!e)return{step:0,noSale:!1,times:t,record:null};let n=t.reduce((e,t,n)=>t?n+1:e,0),r=e.estado===ur;return{step:r?0:Math.max(lr[e.estado]??0,n),noSale:r,times:t,record:e}}function zr(e,t,n){let r=Lr(`paseos`,e);return Object.fromEntries(n.map(n=>[n.id,Rr(r.get(Pr(e,n.id,t)))]))}function Br(e,t){let n=e.filter(e=>t[e.id]?.noSale).length,r=e.filter(e=>!t[e.id]?.noSale&&t[e.id]?.step>=k.length).length;return{noSale:n,delivered:r,toWalk:e.length-n,closed:r+n===e.length}}function Vr(e,t){let n=Lr(`checklists`,e).get(Fr(e,t)),r=n?.items&&typeof n.items==`object`?n.items:{};return{record:n,checked:kr.filter(e=>r[e.item]===!0).map(e=>e.item)}}function Hr(e){let t=new Map;return[`paseos`,`checklists`].forEach(n=>{_.cached(n,{desde:e}).forEach(e=>{e.creadoPor&&e.creadoPorNombre&&t.set(e.creadoPor,e.creadoPorNombre)})}),t}function Ur(e,t){return e?e===Mr().usuario?`vos`:t.get(e)||e:`Pendiente de confirmar`}function Wr(e){let t=new Date(e);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:ar,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function Gr(e,t){if(!e)return``;if(e.enviando)return`Guardando…`;if(e.pendiente)return`Sin señal: se enviará solo.`;if(!e.actualizadoEn)return``;let n=Wr(e.actualizadoEn);return`Último cambio: ${Ur(e.actualizadoPor,t)}${n?`, ${n} hs`:``}.`}var Kr=Promise.resolve();function qr(e,t,{optimisticRecord:n}={}){let r=n?`${e}:${n.id}`:``;r&&Ir.set(r,n);let i=Kr.then(async()=>{let i=typeof t==`function`?t():t;try{let t=await _.save(e,i);return A.syncError&&=``,t}catch(e){return A.syncError=`No se guardó: ${e?.message||`error del servidor`} Probá de nuevo.`,Si(A.syncError),null}finally{r&&Ir.get(r)===n&&Ir.delete(r),Di()}});return Kr=i.catch(()=>null),i}function Jr(e,t,n,r){let i=t.now.iso,a={id:Pr(i,e.id,t.shift),fecha:i,perroId:e.id,perroNombre:e.name,turno:t.shift,...n};return P(r),qr(`paseos`,a,{optimisticRecord:a}).then(e=>{e?.pendiente&&P(`${r} Sin señal: se enviará cuando haya señal.`)})}function Yr(e,t){let n=e.now.iso,r=Object.fromEntries(kr.map(e=>[e.item,t.includes(e.item)])),i={id:Fr(n,e.shift),fecha:n,turno:e.shift,items:r,completo:t.length>=kr.length};return qr(`checklists`,i,{optimisticRecord:i})}var N={key:``,stops:[],ready:!1};function Xr(e){let t=`${e}|${Mr().usuario||``}`;N.key!==t&&(N.stops.forEach(e=>e()),N.key=t,N.stops=[],N.ready=!1,Promise.all([_.list(`paseos`,{desde:e}),_.list(`checklists`,{desde:e})]).then(()=>Qr(e)).catch(e=>{A.syncError=`No se pudieron traer los datos del equipo: ${e?.message||`error del servidor`}`,Si(A.syncError),Di()}).finally(()=>{N.key===t&&(N.ready=!0,Di(),N.stops=[_.watch(`paseos`,{desde:e}),_.watch(`checklists`,{desde:e})])}))}var Zr=!1;async function Qr(e){if(Zr)return;Zr=!0;let t=_r(or,null),n=_r(sr,null);if(!t&&!n)return;let r=[],i=Lr(`paseos`,e);Object.entries(t&&typeof t==`object`?t:{}).forEach(([t,n])=>{let[a,o]=t.split(`|`);a===e&&dr[o]&&n&&typeof n==`object`&&Object.entries(n).forEach(([t,n])=>{let a=w.find(e=>e.id===t);if(!a||!Array.isArray(n)||!n.length)return;let s=Pr(e,t,o),c=Rr(i.get(s)),l=Math.min(n.length,k.length);if(c.noSale||c.step>=l)return;let u={id:s,fecha:e,perroId:a.id,perroNombre:a.name,turno:o,estado:k[l-1].estado};k.forEach((e,t)=>{u[e.field]=t<l?c.times[t]||String(n[t]||``):``}),r.push(qr(`paseos`,u,{optimisticRecord:u}))})});let a=Lr(`checklists`,e);if(Object.entries(n&&typeof n==`object`?n:{}).forEach(([t,n])=>{let[i,o]=t.split(`|`);if(i!==e||!dr[o]||!Array.isArray(n))return;let s=n.filter(e=>kr.some(t=>t.item===e));s.length&&!a.has(Fr(e,o))&&r.push(Yr({now:{iso:e},shift:o},s))}),(await Promise.all(r)).every(Boolean)){try{localStorage.removeItem(or),localStorage.removeItem(sr)}catch{}r.length&&P(`Se subió al equipo lo que tenías marcado en este celular.`)}}function $r(){let e=_r(cr,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[],registroId:typeof e.registroId==`string`?e.registroId:``}}function ei(e){return`
    <div class="pw-shell">
      ${ni()}
      ${e}
    </div>
  `}function ti(){let e=M(),t=Ut(e.day,e.shift),n=t.filter(e=>e.status===`Activo`),r=t.filter(e=>e.status!==`Activo`),i=Tr(t);Xr(e.now.iso);let a=e.isToday?zr(e.now.iso,e.shift,n):{};return`
    <main class="pw-main" id="pw-inicio">
      ${ri()}
      ${ii(e,n,r,i,a)}
      ${si(e,n,r,i,a)}
      <div class="pw-columns">
        ${li(e)}
        ${ui(e,t)}
      </div>
      <footer class="pw-footer">
        <p>Datos: ${j(x.officialSources.routes)} e Inventario de equipamiento, actualizados el ${Mt}.</p>
        <p>Lo que marcás acá lo ven Juan y quien supervisa el turno. Sin señal, se guarda y se envía solo.</p>
      </footer>
    </main>
  `}function ni(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel del paseador">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>Paseador · ${j(Nr())}</small>
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
  `}function ri(){let e=_.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=``;e?n=`Sin señal: ${e} ${e===1?`cambio se enviará solo`:`cambios se enviarán solos`}.`:t&&(n=`Sin señal. Lo que marques queda guardado y se envía solo cuando vuelva.`);let r=[];return n&&r.push(`<p class="pw-sync-msg pw-sync-msg--offline">${p(`uploadCloud`,`pw-icon`)}<span>${j(n)}</span></p>`),A.syncError&&r.push(`
      <div class="pw-sync-msg pw-sync-msg--error">
        ${p(`alertTriangle`,`pw-icon`)}
        <span>${j(A.syncError)}</span>
        <button class="pw-btn pw-btn--ghost pw-btn--compact" type="button" data-pw-dismiss-error>Cerrar aviso</button>
      </div>
    `),`<div class="pw-sync" aria-live="polite" data-pw-sync>${r.join(``)}</div>`}function ii(e,t,n,r,i){let a=fr[e.shift],o=e.isToday?`Hoy, ${e.day.toLowerCase()} · turno ${e.shift.toLowerCase()}`:`${e.day} · turno ${e.shift.toLowerCase()}`,s=`Hola, ${j(Nr())}`;return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${e.isToday?`${s} · ${e.now.date}`:`${s} · Planificación: no es hoy`}</p>
          <h1 id="pw-today-title">${o}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${t.length}</b> ${t.length===1?`perro`:`perros`}</li>
            <li>${Sr(e.shift)}</li>
            <li>Supervisa: ${j(a.supervisor)}</li>
            <li>${Cr(e.shift)}</li>
          </ul>
        </div>
        <div class="pw-today-actions">
          ${e.isToday?``:`
            <button class="pw-btn pw-btn--primary" type="button" data-pw-today>
              ${p(`calendarCheck`,`pw-icon`)}
              Volver a hoy
            </button>
          `}
          <button class="pw-btn pw-btn--ghost" type="button" data-pw-picker aria-expanded="${A.pickerOpen}" aria-controls="pw-picker">
            ${p(`sliders`,`pw-icon`)}
            ${A.pickerOpen?`Cerrar selector`:`Cambiar día o turno`}
          </button>
        </div>
      </div>
      ${A.pickerOpen?ai(e):``}
      ${oi(e,t,n,r,i)}
    </section>
  `}function ai(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
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
              ${t}<small>${Sr(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function oi(e,t,n,r,i){let a=[];r.length&&a.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${Er(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let o=t.filter(Or);if(o.length){let e=o.length>jr;a.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${xr(o.map(e=>e.name))}`,text:e?`Según el inventario tenés ${jr} ${jr===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&a.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${xr(n.map(e=>e.name))}`,text:n.length===1?`Figura en la ruta con estado "${j(n[0].status)}". No lo retires sin confirmarlo con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=Vr(e.now.iso,e.shift).checked.length,r=Br(t,i);n<kr.length?a.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${kr.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):a.push({kind:r.closed?`ok`:`info`,icon:r.closed?`checkCircle`:`pawPrint`,title:`Entregados: ${r.delivered} de ${r.toWalk}${r.noSale?` · ${r.noSale} no ${r.noSale===1?`sale`:`salen`}`:``}`,text:r.closed?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return t.length?a.length?`
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
    `}function si(e,t,n,r,i){let a=Br(t,i),o=a.toWalk?Math.round(a.delivered/a.toWalk*100):100,s=e.isToday?Hr(e.now.iso):new Map;return`
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
            <ul>${Er(r).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${j(fr[e.shift].supervisor)} antes de salir.</p>
          </div>
        </div>
      `:``}

      ${n.map(e=>`
        <div class="pw-banner pw-banner--warn">
          ${p(`alertCircle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>${j(e.name)}: ${j(e.status)}</strong>
            <p>${j(e.review||`Figura en la ruta, pero su estado no es Activo.`)} No lo retires sin confirmarlo con Juan.</p>
          </div>
        </div>
      `).join(``)}

      ${!e.isToday&&t.length?`
        <p class="pw-note">Estás viendo otro día: el avance (retiro, paseo y entrega) se marca solo el día del paseo.</p>
      `:``}

      ${t.length?`
        <ul class="pw-dogs" role="list">
          ${t.map(t=>ci(t,e,i[t.id]||Rr(null),Dr(t,r),s)).join(``)}
        </ul>
        <p class="pw-muted pw-legend">
          Categoría operativa de todos los perros: <b>SIN EVALUAR</b>. ${j(Rt[`SIN EVALUAR`])}
          Fuente: Registro maestro, 14/08/2026.
        </p>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
          <p>Probá otro día o turno con “Cambiar día o turno”.</p>
        </div>
      `}
    </section>
  `}function ci(e,t,n,r,i){let{times:a,noSale:o,record:s}=n,c=Math.min(n.step,k.length),l=!o&&c>=k.length,u=Gr(s,i),d=e.safety.filter(e=>wr(e)===`danger`).join(` `),f=r.filter(e=>!d.includes(e)),ee=e.safety.filter(e=>wr(e)!==`info`),te=e.safety.filter(e=>wr(e)===`info`),ne=ee.length||r.length;return`
    <li class="pw-dog ${ne?`has-alert`:``} ${l?`is-done`:``} ${o?`is-nosale`:``}" data-pw-dog="${e.id}">
      <div class="pw-dog-head">
        <h3>${j(e.name)}</h3>
        <span class="pw-dog-facts">${j(e.size)} · ${e.minutes?`${e.minutes} min`:`Duración pendiente de confirmar`}</span>
      </div>

      ${ne?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${j(e.name)}">
          ${ee.map(e=>`
            <li class="pw-alert pw-alert--${wr(e)}">
              ${p(wr(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${j(e)}${wr(e)===`danger`&&r.length?`<b class="pw-today-tag">En este turno: ${xr(r)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${f.length?`
            <li class="pw-alert pw-alert--danger">
              ${p(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${xr(f)}<b class="pw-today-tag">En este turno</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${te.map(e=>`<p class="pw-dog-note">${p(`users`,`pw-icon pw-icon--sm`)} ${j(e)}</p>`).join(``)}
      ${e.review?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${j(e.review)}</p>`:``}
      <p class="pw-dog-category"><span>SIN EVALUAR</span> Registro maestro 14/08/2026</p>

      ${t.isToday?`
        ${o?`
          <p class="pw-nosale-label">${p(`x`,`pw-icon`)} No sale en este turno</p>
        `:`
          <ol class="pw-steps" aria-label="Avance de ${j(e.name)}">
            ${k.map((e,t)=>`
              <li class="${t<c?`is-done`:``} ${t===c?`is-next`:``}">
                <span class="pw-step-dot" aria-hidden="true">${t<c?p(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
                <span>${e.label}${t<c?`<small>${a[t]?j(a[t]):`Sin hora`}</small>`:``}</span>
                <span class="pw-sr">${t<c?`hecho`:`pendiente`}</span>
              </li>
            `).join(``)}
          </ol>
        `}
        ${s?.nota?`<p class="pw-dog-nota"><b>Nota:</b> ${j(s.nota)}</p>`:``}
        ${u?`<p class="pw-dog-change ${s.pendiente?`is-pending`:``}">${j(u)}</p>`:``}
        <div class="pw-dog-actions">
          ${o?``:l?`
            <p class="pw-done-label">${p(`checkCircle`,`pw-icon`)} Entregado ${j(a[k.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${e.id}" ${N.ready?``:`aria-disabled="true"`}>
              ${N.ready?k[c].action:`Cargando lo marcado…`}
            </button>
          `}
          ${!o&&c===0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-nosale="${e.id}" ${N.ready?``:`aria-disabled="true"`} aria-label="${j(e.name)} no sale en este turno">No sale</button>
          `:``}
          ${o||c>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${e.id}" aria-label="Deshacer el último paso de ${j(e.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function li(e){let{checked:t,record:n}=Vr(e.now.iso,e.shift),r=t.length>=kr.length,i=Gr(n,Hr(e.now.iso));return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.</p>
        </div>
        <span class="pw-count ${r?`is-ok`:``}">${t.length}/${kr.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${kr.map(e=>{let n=t.includes(e.item),r=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
            <li>
              <input class="pw-check-input" type="checkbox" id="${r}" data-pw-equip="${j(e.item)}" ${n?`checked`:``} />
              <label class="pw-check" for="${r}">
                <span class="pw-check-box" aria-hidden="true">${p(`checkCircle`,`pw-icon`)}</span>
                <span class="pw-check-text">${j(e.item)}</span>
                <span class="pw-check-qty">${e.sebastian}</span>
              </label>
            </li>
          `}).join(``)}
      </ul>
      <div class="pw-row">
        ${r?`<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`:`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      ${i?`<p class="pw-dog-change ${n?.pendiente?`is-pending`:``}">${j(i)}</p>`:``}
      <p class="pw-status" role="status">${j(A.equipStatus)}</p>
      ${Ar.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${Ar.map(e=>`${j(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function ui(e,t){let n=$r(),r=[...t.map(e=>e.name),hr];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=A.previewOpen?mi(n,e):null;return`
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
          ${Vt.map((e,t)=>{let r=`pw-proto-${t}`;return`
              <li>
                <input class="pw-check-input" type="checkbox" id="${r}" data-pw-field="protocolo" value="${t}" ${n.protocolo.includes(t)?`checked`:``} />
                <label class="pw-check pw-check--step" for="${r}">
                  <span class="pw-check-box" aria-hidden="true">${p(`checkCircle`,`pw-icon`)}</span>
                  <span class="pw-check-text"><b>${t+1}.</b> ${j(e)}</span>
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
              <input type="checkbox" id="pw-inc-dog-${t}" data-pw-field="dogs" value="${j(e)}" ${n.dogs.includes(e)?`checked`:``} />
              <label for="pw-inc-dog-${t}">${j(e)}</label>
            </span>
          `).join(``)}
        </div>
      </fieldset>

      <div class="pw-grid-2">
        <label class="pw-field">Hora
          <input type="time" data-pw-field="hora" value="${j(n.hora||e.now.time)}" />
        </label>
        <label class="pw-field">Lugar
          <input type="text" data-pw-field="lugar" value="${j(n.lugar)}" placeholder="Ej.: plaza, esquina (sin domicilios)" autocomplete="off" />
        </label>
      </div>

      <p class="pw-hint">Escribí lo que viste y oíste. Ej.: “tiró de la correa y gruñó”, no “se puso agresivo”.</p>

      <label class="pw-field">Antes: ¿qué estaba pasando?
        <textarea data-pw-field="antes" rows="2" placeholder="Ej.: pasó un perro suelto a 3 metros">${j(n.antes)}</textarea>
      </label>
      <label class="pw-field">Conducta: ¿qué hizo el perro? <span class="pw-req">(obligatorio)</span>
        <textarea data-pw-field="conducta" rows="2" placeholder="Ej.: se paró en dos patas, ladró y tiró hacia el otro perro">${j(n.conducta)}</textarea>
      </label>
      <label class="pw-field">¿Qué hiciste vos?
        <textarea data-pw-field="accion" rows="2" placeholder="Ej.: corté distancia, crucé la calle y lo senté">${j(n.accion)}</textarea>
      </label>
      <label class="pw-field">Después: ¿cómo quedó?
        <textarea data-pw-field="despues" rows="2" placeholder="Ej.: se calmó en 1 minuto y siguió el paseo">${j(n.despues)}</textarea>
      </label>

      <fieldset class="pw-fieldset">
        <legend>Nivel de riesgo <span class="pw-req">(obligatorio)</span></legend>
        <div class="pw-seg pw-seg--risk">
          ${pr.map(e=>`
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
          ${mr.map((e,t)=>`
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
        <button class="pw-btn pw-btn--ghost ${A.confirmClear?`is-confirm`:``}" type="button" data-pw-clear>
          ${A.confirmClear?`¿Seguro? Tocá de nuevo`:n.registroId?`Empezar otro reporte`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${A.incidentStatus.startsWith(`Falta`)||A.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${j(A.incidentStatus)}</p>

      ${i&&i.ok?di(i.text):``}
      <p class="pw-muted pw-small">Al armar el mensaje, el reporte queda guardado en la app para Juan y supervisión. Mientras lo escribís, el borrador queda solo en este celular.</p>
    </section>
  `}function di(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${j(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${fi(e)}" target="_blank" rel="noopener noreferrer">
          ${p(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${p(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function fi(e){return`https://wa.me/${x.whatsapp}?text=${encodeURIComponent(e)}`}function pi(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(gr)?.[0]}}function mi(e,t){let{missing:n,word:r}=pi(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=br(t.now),a=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,o=hi(e).map(e=>`- ${e}`);return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,`Paseador: ${Nr()}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,a(`Lesiones`,e.lesiones),a(`Lugar`,e.lugar),``,a(`Antes`,e.antes),a(`Conducta observada`,e.conducta),a(`Qué hice`,e.accion),a(`Después`,e.despues),``,`Protocolo:`,...o].join(`
`)}}function hi(e){return Vt.map((t,n)=>{let r=t.split(/[:.]/)[0];return`${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`})}function gi(e,t){let n=e.dogs.map(e=>w.find(t=>t.name===e)?.id).filter(Boolean),r=e.dogs.join(`, `);return{...e.registroId?{id:e.registroId}:{},fecha:t.now.iso,hora:e.hora||t.now.time,perros:n,perroNombre:r,lugar:e.lugar.trim(),antes:e.antes.trim(),conducta:e.conducta.trim(),accion:e.accion.trim(),despues:e.despues.trim(),riesgo:e.riesgo,lesiones:e.lesiones,protocolo:hi(e),titulo:`Incidente: ${r} · riesgo ${e.riesgo.toLowerCase()}`}}function _i(e,t=!1){A.incidentStatus=e;let n=document.querySelector(`[data-pw-incident-status]`);n&&(n.textContent=e,n.classList.toggle(`is-warn`,t)),P(e)}function vi(e,t){if(A.incidentSavedText===t)return Promise.resolve(null);A.incidentSavedText=t;let n=M();return qr(`incidentes`,()=>gi({...e,registroId:$r().registroId||e.registroId},n)).then(e=>{if(!e)return A.incidentSavedText=``,null;let t=_r(cr,null);return t&&vr(cr,{...t,registroId:e.id}),_i(e.pendiente?`Sin señal: el reporte se guardará en la app cuando vuelva. Igual mandalo por WhatsApp.`:`Reporte guardado en la app. Ahora mandalo por WhatsApp a Juan.`),e})}function yi(){let e=$r(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function bi(){let e=yi();return vr(cr,e),e}function xi(e){if(!A.previewOpen)return;let t=mi(e,M()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),A.previewOpen=!1,A.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=A.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=fi(t.text))}function P(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function Si(e){let t=document.getElementById(`pw-live-error`);t||(t=document.createElement(`div`),t.id=`pw-live-error`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`assertive`),t.setAttribute(`role`,`alert`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}var Ci=[`data-pw-step`,`data-pw-undo`,`data-pw-nosale`,`data-pw-equip`,`data-pw-day`,`data-pw-shift`];function wi(e){if(!e||e===document.body||!e.closest?.(`.pw-shell`))return``;if(e.id)return`#${CSS.escape(e.id)}`;let t=Ci.find(t=>e.hasAttribute(t));if(t)return`[${t}="${CSS.escape(e.getAttribute(t))}"]`;let n=e.dataset.pwField;if(n)return e.type===`checkbox`||e.type===`radio`?`[data-pw-field="${n}"][value="${CSS.escape(e.value)}"]`:`[data-pw-field="${n}"]`;let r=[...e.attributes].find(e=>e.name.startsWith(`data-pw-`));return r?`[${r.name}]`:``}function Ti(){let e=document.activeElement,t=wi(e),n=e&&typeof e.selectionStart==`number`?[e.selectionStart,e.selectionEnd]:null;if($(),!t)return;let r=document.querySelector(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}var Ei=0;function Di(){clearTimeout(Ei),Ei=setTimeout(()=>{document.querySelector(`.pw-shell`)&&Ti()},80)}function F(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function Oi(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function ki(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:Oi(),block:`start`}),t.focus({preventScroll:!0}))}async function Ai(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function ji(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return ed(`/salir`),!0;if(e.target.closest(`[data-pw-dismiss-error]`))return A.syncError=``,F(`#pw-today-title`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return ki(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return A.pickerOpen=!A.pickerOpen,F(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=yr(),t=n.dataset.pwDay;return A.day=t===e.day?null:t,F(`[data-pw-day="${t}"]`),P(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return A.shift=r.dataset.pwShift,F(`[data-pw-shift="${A.shift}"]`),P(`Mostrando el turno ${A.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return A.day=null,A.shift=null,A.pickerOpen=!1,F(`#pw-today-title`),P(`Mostrando hoy.`),!0;let i=e.target.closest(`[data-pw-step]`);if(i){let e=i.dataset.pwStep,t=M(),n=w.find(t=>t.id===e);if(!t.isToday||!n||!N.ready)return!0;let r=zr(t.now.iso,t.shift,[n])[e];if(r.noSale||r.step>=k.length)return!0;let a=k[r.step],o={estado:a.estado};return k.forEach((e,t)=>{t<r.step&&(o[e.field]=r.times[t])}),o[a.field]=t.now.time,Jr(n,t,o,`${n.name}: ${a.done.toLowerCase()} a las ${t.now.time}.`),F(r.step+1>=k.length?`[data-pw-undo="${e}"]`:`[data-pw-step="${e}"]`),!0}let a=e.target.closest(`[data-pw-nosale]`);if(a){let e=a.dataset.pwNosale,t=M(),n=w.find(t=>t.id===e);return t.isToday&&n&&N.ready&&(Jr(n,t,{estado:ur},`${n.name}: no sale en este turno.`),F(`[data-pw-undo="${e}"]`)),!0}let o=e.target.closest(`[data-pw-undo]`);if(o){let e=o.dataset.pwUndo,t=M(),n=w.find(t=>t.id===e);if(!t.isToday||!n||!N.ready)return!0;let r=zr(t.now.iso,t.shift,[n])[e];if(r.noSale){let i=r.times.reduce((e,t,n)=>t?n+1:e,0);return Jr(n,t,{estado:i?k[i-1].estado:`pendiente`},`${n.name}: se deshizo "no sale".`),F(i>=k.length?`[data-pw-undo="${e}"]`:`[data-pw-step="${e}"]`),!0}if(!r.step)return!0;let i=r.step-1,a={estado:i?k[i-1].estado:`pendiente`};return k.forEach((e,t)=>{a[e.field]=t<i?r.times[t]:``}),Jr(n,t,a,`${n.name}: se deshizo "${k[i].done.toLowerCase()}".`),F(`[data-pw-step="${e}"]`),!0}if(e.target.closest(`[data-pw-equip-all]`))return Yr(M(),kr.map(e=>e.item)),A.equipStatus=`Equipo completo. ¡A salir!`,F(`[data-pw-equip-reset]`),P(A.equipStatus),!0;if(e.target.closest(`[data-pw-equip-reset]`))return Yr(M(),[]),A.equipStatus=`Lista de equipo desmarcada.`,F(`[data-pw-equip-all]`),P(A.equipStatus),!0;if(e.target.closest(`[data-pw-generate]`)){let e=bi(),t=mi(e,M());return A.confirmClear=!1,t.ok?(A.previewOpen=!0,A.incidentStatus=A.incidentSavedText===t.text?`Mensaje listo. El reporte ya está guardado en la app.`:`Mensaje listo. Guardando el reporte en la app…`,F(`[data-pw-message]`),P(A.incidentStatus),vi(e,t.text),!0):(A.previewOpen=!1,A.incidentStatus=t.missing.length?`Falta completar: ${xr(t.missing.map(e=>e.label))}.`:`Cambiá “${t.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,F(t.missing.length?t.missing[0].focus:`[data-pw-field="conducta"]`),P(A.incidentStatus),!0)}if(e.target.closest(`[data-pw-whatsapp]`)){let e=$r(),t=mi(e,M());return t.ok&&vi(e,t.text),!1}if(e.target.closest(`[data-pw-copy]`)){let e=document.querySelector(`[data-pw-message]`)?.value||``,t=$r(),n=mi(t,M());return n.ok&&vi(t,n.text),Ai(e).then(e=>{A.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=A.incidentStatus,t.classList.toggle(`is-warn`,!e)),P(A.incidentStatus)}),!0}if(e.target.closest(`[data-pw-clear]`)){if(!A.confirmClear)return A.confirmClear=!0,F(`[data-pw-clear]`),!0;let e=!!$r().registroId;try{localStorage.removeItem(cr)}catch{}return A.confirmClear=!1,A.previewOpen=!1,A.incidentSavedText=``,A.incidentStatus=e?`Formulario limpio. El reporte anterior sigue guardado en la app.`:`Reporte borrado.`,F(`#pw-incidente`),P(A.incidentStatus),!0}if(A.confirmClear&&!e.target.closest(`[data-pw-clear]`)){A.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=$r().registroId?`Empezar otro reporte`:`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function Mi(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=M(),{checked:n}=Vr(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return Yr(e,i),A.equipStatus=i.length>=kr.length?`Equipo completo. ¡A salir!`:``,F(`[data-pw-equip="${CSS.escape(r)}"]`),A.equipStatus&&P(A.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(xi(bi()),!0):!1}function Ni(e){e.target.closest?.(`[data-pw-field]`)&&xi(bi())}function Pi(){be.push(ji),xe.push(Mi),document.addEventListener(`input`,Ni),et(e=>{(e===`paseos`||e===`checklists`||e===`incidentes`)&&Di()}),window.addEventListener(`online`,Di),window.addEventListener(`offline`,Di)}var Fi=`America/Argentina/Buenos_Aires`,Ii=[`manana`,`tarde`],Li=[`Paseador asignado`,`Sebastián`],Ri=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,zi=[`paseos`,`checklists`,`incidentes`,`observaciones`,`rutas`,`cierres`],Bi=7,Vi={admin:`Admin`,supervisor:`Supervisor`,coordinador:`Coordinación`,paseador:`Paseador`},I={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,routeDraft:`paseosJuanSupervisor_rutaBorrador`,observationDraft:`paseosJuanSupervisor_observacionBorrador`},Hi={routes:`paseosJuanSupervisor_rutas`,observations:`paseosJuanSupervisor_observaciones`,closure:`paseosJuanSupervisor_cierre`},Ui=null,Wi=null,Gi=null,Ki=null,qi=new Set,Ji=new Map,Yi=new Map,Xi=!1,Zi=null,Qi=`idle`;function L(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function $i(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function ea(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function ta(e){try{localStorage.removeItem(e)}catch{}}function R(e,t,n=`ok`){Ui={area:e,text:t,tone:n}}function na(e){return Ui&&Ui.area===e?Ui:null}function ra(e){let t=na(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?L(t.text):``}</p>
  `}function ia(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function aa(e){let[t,n]=String(e).split(`:`).map(Number);return t*60+n}function oa(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Fi,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:C[(n+6)%7]}}function sa(e,t){let n=new Date(`${e}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)}function ca(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:b}function la(e){let t=String(e||``).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);if(!t)return null;let n=`${t[3]}-${t[2]}-${t[1]}`,r=new Date(`${n}T12:00:00Z`);return!Number.isNaN(r.getTime())&&r.toISOString().slice(0,10)===n?n:null}function ua(e){return C[(new Date(`${e}T12:00:00Z`).getUTCDay()+6)%7]}function da(e,t){let n=C.indexOf(ua(t));return sa(t,(C.indexOf(e)-n+7)%7)}function fa(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:Fi,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).format(t)}function pa(e){let t=new Date(e||``);return Number.isNaN(t.getTime())?null:v(t)}function ma(e){return e.minutes<aa(`13:30`)?`manana`:`tarde`}function ha(e){let t=String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase();return t.startsWith(`man`)?`manana`:t.startsWith(`tar`)?`tarde`:null}function ga(e){let t=S[e];return t.routes||[t.route]}function _a(e,t){let n=S[e];return t.minutes<aa(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=aa(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function va(){return g.user()||{}}function ya(e){let t=va();return!e||e.pendiente?!1:t.rol===`admin`||e.creadoPor&&e.creadoPor===t.usuario}function ba(e,t){if(!e)return``;if(t?.creadoPor===e&&t.creadoPorNombre)return t.creadoPorNombre;let n=va();return n.usuario===e&&n.nombre?n.nombre:Nt.find(t=>t.id===e)?.name||e}function xa(e,t=`Marcó`){if(!e)return``;if(e.pendiente)return`Se enviará cuando haya señal.`;let n=ba(e.actualizadoPor||e.creadoPor,e),r=fa(e.actualizadoEn||e.creadoEn);return n?`${t} ${n}${r?` a las ${r} hs`:``}.`:``}function Sa(e){let t=v();return{desde:e===`observaciones`?sa(t,-6):t}}function Ca(){g.token()&&zi.forEach(e=>_.watch(e,Sa(e)))}function wa(e){let t=new Map(_.cached(e,Sa(e)).map(e=>[e.id,e]));return Ji.forEach((n,r)=>{if(!r.startsWith(`${e}:`))return;let i=t.get(n.id);(!i||!i.pendiente&&String(i.actualizadoEn||``)<String(n.actualizadoEn||``))&&t.set(n.id,n)}),[...t.values()]}function Ta(e,t,n,r,i=`ok`){if(!t.id)return Ea(e,t,n,r,i);let a=`${e}:${t.id}`,o=(Yi.get(a)||Promise.resolve()).then(()=>Ea(e,t,n,r,i));return Yi.set(a,o),o.then(()=>{Yi.get(a)===o&&Yi.delete(a)}),o}async function Ea(e,t,n,r,i){try{let a=await _.save(e,t);if(a.pendiente)R(n,`${r} Sin señal: se enviará cuando haya conexión.`,`info`);else{let t=`${e}:${a.id}`,o=Ji.get(t);(!o||String(o.actualizadoEn||``)<=String(a.actualizadoEn||``))&&Ji.set(t,a),R(n,r,i)}return a}catch(e){return R(n,e?.message||`No se pudo guardar. Probá de nuevo.`,`error`),null}}async function Da(e,t,n,r){try{return await _.remove(e,t),Ji.delete(`${e}:${t}`),R(n,r,`info`),!0}catch(e){return R(n,e?.message||`No se pudo borrar. Probá de nuevo.`,`error`),!1}}async function Oa(e=!0){if(!g.token())return;let t=await Promise.allSettled(zi.map(e=>_.list(e,Sa(e))));if(!e)return;let n=t.find(e=>e.status===`rejected`);n?R(`sync`,n.reason?.message||`No se pudieron traer los datos.`,`error`):navigator.onLine?R(`sync`,`Datos actualizados a las ${oa().time} hs.`):R(`sync`,`Sin señal: ves lo último que se guardó en este teléfono.`,`info`),B(`sv-refresh`)}function ka(){return window.location.pathname.replace(/\/+$/,``)===`/supervisor`}function Aa(){Zi=null,ka()&&document.querySelector(`.sv-shell`)&&ja()}function ja(){let e=document.activeElement,t=e?.id||``,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.getElementById(t);if(r&&(r.focus({preventScroll:!0}),n&&typeof r.setSelectionRange==`function`))try{r.setSelectionRange(n[0],n[1])}catch{}}function Ma(){Zi||=setTimeout(Aa,40)}function Na(){Xi||(Xi=!0,et(e=>{zi.includes(e)&&Ma()}),window.addEventListener(`online`,Ma),window.addEventListener(`offline`,Ma),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&ka()&&Oa(!1)}))}function Pa(){try{return Object.values(Hi).some(e=>localStorage.getItem(e)!==null)}catch{return!1}}function Fa(e){return String(e).replace(/[^a-z0-9_.-]/gi,`-`).slice(0,100)}function Ia(e){let t=Number(String(e||``).replace(/^\D+/,``));return Number.isFinite(t)&&t>0xe8d4a51000?new Date(t).toISOString():null}function La(e){if(!e||typeof e!=`object`||!Array.isArray(e.dogIds)||!Ii.includes(e.shift))return null;let t=la(String(e.savedAt||``).slice(0,10))||pa(Ia(e.id))||v(),n=C.includes(e.day)?da(e.day,t):t,r=S[e.shift].label;return{id:Fa(`${n}_${e.id||Date.now()}`),fecha:n,turno:r,ruta:e.route||``,paseador:e.walker||Li[0],perros:e.dogIds.filter(e=>Qa(e)),conflictos:Array.isArray(e.conflicts)?e.conflicts:[],medida:e.reason||``,notas:e.notes||``,titulo:`Ruta ${e.route||``} · ${r} · ${ca(n)}`,migrado:!0}}function Ra(e){if(!e||typeof e!=`object`||!e.dogId)return null;let t=Qa(e.dogId),n=la(e.fecha)||pa(Ia(e.id))||v();return{id:Fa(`${n}_${e.id||Date.now()}`),fecha:n,hora:e.hora||``,perroId:e.dogId,perroNombre:t?t.name:``,lugar:e.lugar||``,estimulo:e.estimulo||``,reaccion:e.reaccion||``,accion:e.accion||``,resultado:e.resultado||``,seguimiento:!!e.seguimiento,turno:S[e.shift]?.label||``,titulo:`Observación: ${t?t.name:b}`,autorAnterior:e.autor||``,migrado:!0}}async function za(e,t){try{return await _.save(e,t),null}catch(e){return e?.message||`Error al subir.`}}async function Ba(){if(Qi!==`idle`||!g.token()||!Pa()||!navigator.onLine)return;Qi=`running`;let e=0,t=0,n=``,r=$i(Hi.routes,[]),i=[];for(let a of r){let r=La(a);if(!r)continue;let o=await za(`rutas`,r);o?(i.push(a),t+=1,n=o):e+=1}i.length?ea(Hi.routes,i):ta(Hi.routes);let a=$i(Hi.observations,[]),o=[];for(let r of a){let i=Ra(r);if(!i)continue;let a=await za(`observaciones`,i);a?(o.push(r),t+=1,n=a):e+=1}o.length?ea(Hi.observations,o):ta(Hi.observations);let s=$i(Hi.closure,{}),c=Object.entries(s).filter(([e,t])=>{let[n,r]=e.split(`|`);return/^\d{4}-\d{2}-\d{2}$/.test(n)&&Ii.includes(r)&&t&&(String(t.notas||``).trim()||t.cerrado)});if(c.length){let r=c.map(([e])=>e.split(`|`)[0]).sort()[0],i=null;try{i=new Set((await _.list(`cierres`,{desde:r})).filter(e=>!e.pendiente).map(e=>e.id))}catch(e){n=e?.message||`No se pudieron revisar los cierres.`}if(i){let r={};for(let[a,o]of c){let[s,c]=a.split(`|`),l=`${s}_${c}`;if(i.has(l))continue;let u=await za(`cierres`,{id:l,fecha:s,turno:S[c].label,notas:String(o.notas||``),resumen:``,cerrado:!!o.cerrado,horaCierre:o.cerrado?String(o.cerrado):``,migrado:!0});u?(r[a]=o,t+=1,n=u):e+=1}Object.keys(r).length?ea(Hi.closure,r):ta(Hi.closure)}else t+=c.length}else ta(Hi.closure);Qi=`done`,(e||t)&&R(`sync`,t?`Se subieron ${e} registros de la versión anterior y ${t} no se pudieron subir (${n}). Quedan en este teléfono.`:`Se subieron ${e} registro${e===1?``:`s`} que estaban solo en este teléfono (versión anterior). Ahora los ve el equipo.`,t?`error`:`ok`),Ma()}function z(){let e=oa(),t=$i(I.view,{}),n={day:e.dayName,shift:ma(e)},r=t.date===e.iso?{...n,...t}:n;C.includes(r.day)||(r.day=n.day),Ii.includes(r.shift)||(r.shift=n.shift);let i=r.day===e.dayName,a=i?e.iso:da(r.day,e.iso);return{day:r.day,shift:r.shift,now:e,isToday:i,fecha:a,fechaLabel:ca(a)}}function Va(e){ea(I.view,{date:oa().iso,day:e.day,shift:e.shift})}function Ha(e,t=!1){let n=$i(I.folds,{});return typeof n[e]==`boolean`?n[e]:t}function Ua(e,t,n){return`${e}_${t}_${n}`}function Wa(){return new Map(wa(`paseos`).map(e=>[e.id,e]))}function Ga(e){let t=e?.estado||`pendiente`,n=t===`no-sale`,r=[`retirado`,`paseando`,`entregado`].includes(t);return{record:e,estado:t,noSale:n,retirado:r,paseando:t===`paseando`,entregado:t===`entregado`,horaRetiro:r&&e?.horaRetiro||``,horaPaseo:r&&e?.horaPaseo||``,horaEntrega:t===`entregado`&&e?.horaEntrega||``,nota:e?.nota||``}}function Ka(e,t){let n=Wa(),r={};return t.forEach(t=>{r[t.id]=Ga(n.get(Ua(e.fecha,t.id,e.shift)))}),r}function qa(e,t){return wa(`checklists`).filter(n=>n.fecha===e&&(ha(n.turno)===t||String(n.id).endsWith(`_${t}`)))}function Ja(e){let t=e.items&&typeof e.items==`object`?Object.entries(e.items):[],n=t.filter(([,e])=>!e).map(([e])=>Ya(e));return{complete:typeof e.completo==`boolean`?e.completo:t.length>0&&!n.length,missing:n,who:ba(e.actualizadoPor||e.creadoPor,e),at:fa(e.actualizadoEn||e.creadoEn)}}function Ya(e){let t=String(e).replace(/[_-]+/g,` `).replace(/([a-z])([A-Z])/g,`$1 $2`).trim().toLowerCase();return t?t[0].toUpperCase()+t.slice(1):b}function Xa(e){return wa(`incidentes`).filter(t=>t.fecha===e).sort((e,t)=>String(e.hora||e.creadoEn||``).localeCompare(String(t.hora||t.creadoEn||``)))}function Za(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:[]).map(e=>Qa(e)?.name||e);return t.length?ia(t):b}function Qa(e){return w.find(t=>t.id===e)}function $a(e,t){return Ut(e,S[t].label)}function eo(e){return e.safety.some(e=>/bozal/i.test(e))}function to(e){return e.safety.find(e=>/bozal/i.test(e))||``}function no(e){let t=new Set(e.map(e=>e.name)),n=new Set,r=[];return e.forEach(e=>{(e.incompatibleWith||[]).forEach(i=>{if(!t.has(i))return;let a=[e.name,i].sort().join(`|`);n.has(a)||(n.add(a),r.push([e.name,i]))})}),r}function ro(e){let t=new Set(e.map(e=>e.size));return{pairs:no(e),muzzle:e.filter(eo),review:e.filter(e=>e.review),inactive:e.filter(e=>e.status!==`Activo`),unevaluated:e.filter(e=>e.category===`SIN EVALUAR`),sizeMix:t.has(`Pequeño`)&&t.has(`Grande`)}}function io(e){return e.map(([e,t])=>`${e} con ${t}`)}function ao(e){let t=ro(e),n=[];if(t.pairs.length&&n.push({tone:`danger`,icon:`alertTriangle`,title:t.pairs.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${t.pairs.length} parejas que no pueden ir juntas`,lines:io(t.pairs).map(e=>`No juntar: ${e}.`),action:`Armá grupos o rutas separadas antes de salir.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),t.muzzle.length&&n.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${t.muzzle.length} perro${t.muzzle.length===1?``:`s`}`,lines:t.muzzle.map(e=>`${e.name}: ${to(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),t.inactive.length&&n.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${t.inactive.length===1?`sale ${t.inactive[0].name}`:`salen ${t.inactive.length} perros`}`,lines:t.inactive.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),t.review.length){let e=t.review.filter(e=>e.status===`Activo`);e.length&&n.push({tone:`info`,icon:`fileText`,title:`${e.length} perro${e.length===1?` tiene`:`s tienen`} datos a revisar`,lines:e.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${Mt}.`})}return t.unevaluated.length>1&&n.push({tone:`info`,icon:`eye`,title:`${t.unevaluated.length} perros salen en grupo SIN EVALUAR`,lines:[`${Rt[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),n}function oo(e){let t=Array.isArray(e.conflictos)?e.conflictos:e.conflictos?[String(e.conflictos)]:[];return{id:e.id,record:e,route:e.ruta||`Pendiente de confirmar`,walker:e.paseador||Li[0],dogIds:Array.isArray(e.perros)?e.perros:[],notes:e.notas||``,conflicts:t,reason:e.medida||``}}function so(e,t){return wa(`rutas`).filter(n=>n.fecha===e&&ha(n.turno)===t).sort((e,t)=>String(e.ruta||``).localeCompare(String(t.ruta||``))||String(e.creadoEn||``).localeCompare(String(t.creadoEn||``))).map(oo)}function co(e){return{day:e.day,fecha:e.fecha,shift:e.shift,route:ga(e.shift)[0],walker:Li[0],dogIds:[],notes:``,confirm:!1,reason:``,showAll:!1,editingId:null}}function lo(e){let t=$i(I.routeDraft,{});if(t.day!==e.day||t.shift!==e.shift||t.fecha&&t.fecha!==e.fecha)return co(e);let n={...co(e),...t,fecha:e.fecha};return n.dogIds=Array.isArray(n.dogIds)?n.dogIds.filter(e=>Qa(e)):[],ga(e.shift).includes(n.route)||(n.route=ga(e.shift)[0]),Li.includes(n.walker)||(n.walker=Li[0]),n.editingId&&!so(e.fecha,e.shift).some(e=>e.id===n.editingId)&&(n.editingId=null),n}function uo(e){ea(I.routeDraft,e)}function fo(e){let t=e.dogIds.map(Qa).filter(Boolean),n=ro(t),r=new Set($a(e.day,e.shift).map(e=>e.id)),i=so(e.fecha,e.shift).filter(t=>t.id!==e.editingId),a=[],o=[];if(io(n.pairs).forEach(e=>a.push({tone:`danger`,text:`Incompatibles: ${e}. No pueden ir en la misma ruta.`})),n.sizeMix){let e=t.filter(e=>e.size===`Pequeño`).map(e=>e.name),n=t.filter(e=>e.size===`Grande`).map(e=>e.name);a.push({tone:`warn`,text:`Tamaños mezclados: pequeños (${e.join(`, `)}) con grandes (${n.join(`, `)}).`})}return n.muzzle.forEach(e=>o.push({tone:`warn`,text:`${e.name}: ${to(e)}. Confirmá el bozal antes de salir.`})),n.inactive.forEach(e=>o.push({tone:`warn`,text:`${e.name} figura como «${e.status}». Confirmá con Juan antes de sumarlo.`})),t.filter(e=>!r.has(e.id)).forEach(t=>o.push({tone:`info`,text:`${t.name} no figura en BASE RUTAS para ${e.day} a la ${S[e.shift].label.toLowerCase()}.`})),t.forEach(e=>{let t=i.find(t=>t.dogIds.includes(e.id));t&&o.push({tone:`info`,text:`${e.name} ya está en la ruta ${t.route} guardada para este turno.`})}),{dogs:t,conflicts:a,warnings:o}}var po=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function mo(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function ho(e){return{...mo(e),...$i(I.observationDraft,{})}}function go(){let e=Sa(`observaciones`).desde;return wa(`observaciones`).filter(t=>String(t.fecha||``)>=e).sort((e,t)=>`${t.fecha||``} ${t.hora||``} ${t.creadoEn||``}`.localeCompare(`${e.fecha||``} ${e.hora||``} ${e.creadoEn||``}`))}function _o(e){return e.migrado&&e.autorAnterior?`${e.autorAnterior} (versión anterior; la subió ${e.creadoPorNombre||`Pendiente de confirmar`})`:e.pendiente&&!e.creadoPorNombre?`${va().nombre||`Pendiente de confirmar`} (se enviará cuando haya señal)`:e.creadoPorNombre||`Pendiente de confirmar`}function vo(e){return[`Observación de conducta — ${x.name}`,`Perro: ${e.perroNombre||Qa(e.perroId)?.name||`Pendiente de confirmar`}`,`Fecha: ${ca(e.fecha)}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar||`Pendiente de confirmar`}`,`Estímulo: ${e.estimulo||`Pendiente de confirmar`}`,`Reacción: ${e.reaccion||`Pendiente de confirmar`}`,`Acción: ${e.accion||`Pendiente de confirmar`}`,`Resultado: ${e.resultado||`Pendiente de confirmar`}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${_o(e)}`].join(`
`)}function yo(e){return`${e.fecha}_${e.shift}`}function bo(e){return wa(`cierres`).find(t=>t.id===yo(e))||null}function xo(e){return Ki&&Ki.id===yo(e)?Ki.notas:bo(e)?.notas||``}function So(e,t,n){let r=S[e.shift],i=Ka(e,t),a=n||bo(e),o=ro(t),s=so(e.fecha,e.shift),c=t.filter(e=>!i[e.id].noSale),l=c.filter(e=>i[e.id].retirado),u=c.filter(e=>i[e.id].entregado),d=t.filter(e=>i[e.id].noSale),f=c.filter(e=>!i[e.id].entregado),ee=go().filter(t=>t.fecha===e.fecha&&ha(t.turno)===e.shift),te=Xa(e.fecha),ne=qa(e.fecha,e.shift).map(Ja),re=xo(e),ie=va(),ae=[`Cierre de turno — ${x.name}`,`Fecha: ${e.fechaLabel} (${e.day})`,`Turno: ${r.label} (${r.from} a ${r.to} hs) · Supervisó: ${ie.nombre||`Pendiente de confirmar`}${ie.nombre===r.supervisor?``:` (según planilla: ${r.supervisor})`}`,`Rutas: ${ga(e.shift).join(` y `)}`,...s.map(e=>`- ${e.route} (${e.walker}): ${e.dogIds.map(e=>Qa(e)?.name).filter(Boolean).join(`, `)}${e.conflicts.length?` · conflicto confirmado, medida: ${e.reason||`Pendiente de confirmar`}`:``}`),`Perros previstos: ${t.length}`,`Retirados: ${l.length} de ${c.length} · Entregados: ${u.length} de ${c.length}`,`No salieron: ${d.length?d.map(e=>e.name).join(`, `):`ninguno`}`,`Sin entrega marcada: ${f.length?f.map(e=>e.name).join(`, `):`ninguno`}`,`Checklist del paseador: ${ne.length?ne.map(e=>`${e.who}: ${e.complete?`equipo completo`:`incompleto${e.missing.length?` (falta ${e.missing.join(`, `)})`:``}`}`).join(`; `):`sin cargar`}`,`Incidentes del día: ${te.length?te.map(e=>`${e.hora||`sin hora`} ${e.titulo||Za(e)}`).join(`; `):`ninguno cargado`}`,`Seguridad del turno:`,`- No juntar: ${o.pairs.length?io(o.pairs).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${o.muzzle.length?o.muzzle.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${ee.length}`,`Notas del supervisor: ${re.trim()||`sin notas`}`];return a?.cerrado&&ae.push(`Turno cerrado a las ${a.horaCierre||fa(a.actualizadoEn)||`Pendiente de confirmar`} hs por ${ba(a.actualizadoPor,a)||`Pendiente de confirmar`}.`),ae.join(`
`)}function Co(e){return`
    <div class="sv-shell">
      ${wo()}
      ${e}
    </div>
  `}function wo(){let e=va();return`
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
          <strong>${L(e.nombre||`Pendiente de confirmar`)}</strong>
          <small>${L(Vi[e.rol]||e.rol||``)}</small>
        </p>
        <button class="sv-button sv-button-quiet" type="button" id="sv-logout" data-sv-logout>
          ${p(`logOut`,`sv-icon`)}
          Salir
        </button>
      </div>
    </header>
  `}function To(){Ca();let e=z(),t=$a(e.day,e.shift),n=`
    <main class="sv-main" id="sv-main">
      ${Eo()}
      ${Do(e)}
      ${ko(e,t)}
      ${Ao(e,t)}
      ${No(e,t)}
      ${Fo(e)}
      ${Lo(e,t)}
      ${zo(e,t)}
      ${Bo()}
    </main>
  `;return Ui=null,Qi===`idle`&&Pa()&&setTimeout(Ba,0),n}function Eo(){let e=_.pendingCount(),t=typeof navigator<`u`&&navigator.onLine===!1,n=t||e?`warn`:`ok`,r=`${e} cambio${e===1?` espera`:`s esperan`} señal para enviarse.`,i=t?`Sin señal: ves lo último guardado en este teléfono.${e?` ${r}`:``}`:e?r:`Datos compartidos con el equipo. Se actualizan solos cada minuto.`;return`
    <section class="sv-sync is-${n}" aria-label="Estado de los datos">
      <p class="sv-sync-text">${p(t||e?`uploadCloud`:`radio`,`sv-icon`)} <span>${L(i)}</span></p>
      <button type="button" class="sv-button sv-button-quiet" id="sv-refresh" data-sv-refresh>Actualizar ahora</button>
      ${ra(`sync`)}
    </section>
  `}function Do(e){let t=e.now.iso,n=Xa(t);return n.length?`
    <section class="sv-card sv-incidents" aria-labelledby="sv-incidents-title">
      <div class="sv-section-head">
        <h2 id="sv-incidents-title" class="sv-title">${p(`alertTriangle`,`sv-icon`)} ${n.length===1?`Hay 1 incidente cargado hoy`:`Hay ${n.length} incidentes cargados hoy`}</h2>
        <p>${e.isToday?``:`Son de hoy, ${e.now.label}. `}${n.length===1?`Revisalo`:`Revisalos`} antes de seguir con el turno.</p>
      </div>
      <ul class="sv-incident-list">
        ${n.map(e=>`
          <li class="sv-incident">
            <div class="sv-saved-head">
              <strong>${L(e.titulo||`Incidente`)}</strong>
              <span>${e.hora?`${L(e.hora)} hs · `:``}${L(Za(e))}${e.lugar?` · ${L(e.lugar)}`:``}</span>
            </div>
            ${e.riesgo||e.lesiones?`
              <p class="sv-chips">
                ${e.riesgo?`<span class="sv-tag is-danger">Riesgo: ${L(e.riesgo)}</span>`:``}
                ${e.lesiones?`<span class="sv-tag is-warn">Lesiones: ${L(e.lesiones)}</span>`:``}
              </p>
            `:``}
            <dl class="sv-obs-detail">
              ${[[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Protocolo`,e.protocolo]].filter(([,e])=>e).map(([e,t])=>`<div><dt>${e}</dt><dd>${L(t)}</dd></div>`).join(``)}
            </dl>
            <p class="sv-source">${L(xa(e,`Cargó`))}</p>
          </li>
        `).join(``)}
      </ul>
    </section>
  `:``}function Oo(e){if(!e.isToday)return``;let t=qa(e.fecha,e.shift);return t.length?`
    <div class="sv-team-check">
      ${t.map(e=>{let t=Ja(e);return`
          <p class="sv-note ${e.pendiente?`is-info`:t.complete?`is-ok`:`is-danger`}">
            ${p(t.complete?`checkCircle`:`alertTriangle`,`sv-icon`)}
            <strong>Checklist de ${L(t.who||`Pendiente de confirmar`)}:</strong>
            ${t.complete?`salió con el equipo completo.`:`equipo incompleto${t.missing.length?`. Falta: ${L(t.missing.join(`, `))}`:``}.`}
            ${t.at?`<small>(${L(t.at)} hs)</small>`:``}
          </p>
        `}).join(``)}
    </div>
  `:`
      <div class="sv-team-check sv-note ${e.now.minutes>=aa(S[e.shift].from)?`is-warn`:`is-info`}">
        <strong>Checklist de salida:</strong> el paseador todavía no lo cargó para este turno.
      </div>
    `}function ko(e,t){let n=S[e.shift],r=va(),i=e.isToday?_a(e.shift,e.now):null,a=e.shift===`manana`?`tarde`:`manana`,o=$a(e.day,a).length,s=so(e.fecha,e.shift),c=ga(e.shift),l=t.filter(e=>e.status===`Activo`).length;return`
    <section class="sv-hero" aria-labelledby="sv-hero-title">
      <div class="sv-hero-top">
        <div class="sv-hero-copy">
          <p class="sv-eyebrow">${e.isToday?`Hoy · ${L(e.day)} ${e.now.label}`:`Planificación · ${L(e.day)} ${e.fechaLabel}`}</p>
          <h1 id="sv-hero-title">Turno ${n.label.toLowerCase()}</h1>
          <p class="sv-hero-sub">
            ${n.from} a ${n.to} hs · Supervisa <strong>${L(r.nombre||`Pendiente de confirmar`)}</strong>
            ${i?`<span class="sv-moment is-${i.tone}">${i.label}</span>`:``}
          </p>
          ${r.nombre===n.supervisor?``:`<p class="sv-source">Según la planilla, este turno lo supervisa ${L(n.supervisor)}.</p>`}
        </div>
        <div class="sv-picker">
          <div class="sv-segment" role="group" aria-label="Turno">
            ${Ii.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${S[t].label}
                <small>${$a(e.day,t).length} perros</small>
              </button>
            `).join(``)}
          </div>
          <label class="sv-field sv-field-inline" for="sv-day">Día
            <select id="sv-day" data-sv-day>
              ${C.map(t=>`<option value="${t}" ${t===e.day?`selected`:``}>${t}${t===e.now.dayName?` (hoy)`:``}</option>`).join(``)}
            </select>
          </label>
          ${e.isToday?``:`<button type="button" class="sv-button sv-button-quiet" id="sv-today" data-sv-today>Volver a hoy</button>`}
        </div>
      </div>

      ${e.isToday?``:`
        <p class="sv-note is-info">Estás mirando ${L(e.day)} ${e.fechaLabel} para planificar. El control de retiro y entrega se usa solo el día de hoy.</p>
      `}

      ${Oo(e)}

      <dl class="sv-stats">
        <div><dt>Perros en el turno</dt><dd>${t.length}${l===t.length?``:` <small>(${l} activos)</small>`}</dd></div>
        <div><dt>Turno ${S[a].label.toLowerCase()}</dt><dd>${o} <small>perros</small></dd></div>
      </dl>

      <ul class="sv-route-list" aria-label="Rutas del turno">
        ${c.map(e=>{let n=s.find(t=>t.route===e),r=n?`${n.dogIds.length} perros (ruta armada)`:c.length===1?`${t.length} perros`:`Reparto: ${b}`;return`
            <li>
              <span class="sv-route-code">${e}</span>
              <span class="sv-route-walker">${p(`userCheck`,`sv-icon`)} ${L(n?.walker||Li[0])}</span>
              <span class="sv-route-count">${r}</span>
            </li>
          `}).join(``)}
      </ul>
      ${c.length>1&&s.length<c.length?`
        <p class="sv-hint">La planilla no dice qué perros van en cada ruta de la tarde: armalas en «Armar rutas del turno».</p>
      `:``}
    </section>
  `}function Ao(e,t){if(!t.length)return`
      <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
        <h2 id="sv-safety-title" class="sv-title">${p(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p class="sv-empty">No hay perros cargados en BASE RUTAS para ${L(e.day)} a la ${S[e.shift].label.toLowerCase()}.</p>
      </section>
    `;let n=ao(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${p(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Lo primero que tenés que resolver antes de salir. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>jo(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos" ${Ha(`avisos`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>jo(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function jo(e,t){return`
    <li class="sv-warning is-${e.tone}">
      <div class="sv-warning-head">
        ${t?`<span class="sv-rank" aria-label="Prioridad ${t}">${t}</span>`:`<span class="sv-warning-icon">${p(e.icon,`sv-icon`)}</span>`}
        <h3>${L(e.title)}</h3>
      </div>
      <ul class="sv-warning-lines">
        ${e.lines.map(e=>`<li>${L(e)}</li>`).join(``)}
      </ul>
      <p class="sv-warning-action"><strong>Qué hacer:</strong> ${L(e.action)}</p>
      <p class="sv-source">${L(e.source)}</p>
    </li>
  `}function Mo(e){let t=e.safety.map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?L(e):`<b>${L(e)}</b>`}</li>`});return e.status!==`Activo`&&t.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${L(e.status)}</li>`),e.review&&t.push(`<li class="sv-chip is-info"><b>Dato a revisar</b></li>`),e.category!==`SIN EVALUAR`&&t.push(`<li class="sv-chip is-neutral"><b>${L(e.category)}</b> · ${L(e.categorySource)}</li>`),t.length?`<ul class="sv-chips" aria-label="Avisos de ${L(e.name)}">${t.join(``)}</ul>`:``}function No(e,t){let n=Ha(`perros`,!0),r=Ka(e,t),i=t.filter(e=>!r[e.id].noSale),a=i.filter(e=>r[e.id].retirado).length,o=i.filter(e=>r[e.id].entregado).length,s=t.length-i.length,c=t.length&&t.every(e=>e.category===`SIN EVALUAR`);return`
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
            ${t.map(t=>Po(t,r[t.id],e)).join(``)}
          </ul>
          ${ra(`control`)}
        `:`<p class="sv-empty">No hay perros para este día y turno.</p>`}
      </div>
    </details>
  `}function Po(e,t,n){let r=n.isToday,i=t.noSale,a=qi.has(Ua(n.fecha,e.id,n.shift)),o=[t.horaRetiro?`Retiro ${t.horaRetiro} hs`:``,t.horaPaseo?`Paseo ${t.horaPaseo} hs`:``,t.horaEntrega?`Entrega ${t.horaEntrega} hs`:``].filter(Boolean),s=r&&t.record?`
    <div class="sv-dog-meta">
      ${t.paseando?`<p class="sv-tag is-info">Paseando ahora</p>`:``}
      ${o.length?`<p>${L(o.join(` · `))}</p>`:``}
      ${t.nota?`<p><b>Nota:</b> ${L(t.nota)}</p>`:``}
      <p class="sv-source">${L(xa(t.record))}</p>
    </div>
  `:``;return`
    <li class="sv-dog ${i?`is-absent`:``} ${t.entregado?`is-done`:``}">
      <div class="sv-dog-info">
        <div class="sv-dog-head">
          <h3>${L(e.name)}</h3>
          ${r&&!i&&!t.retirado?`<button type="button" class="sv-link" id="sv-absent-${e.id}" data-sv-absent="${e.id}" aria-label="${L(e.name)} no sale hoy">No sale hoy</button>`:``}
        </div>
        <p>${L(e.size)} · ${e.minutes?`${e.minutes} min`:b} · ${L(e.plan)}</p>
        ${Mo(e)}
      </div>
      ${r?`
        <div class="sv-dog-actions" ${a?`aria-busy="true"`:``}>
          ${i?`
            <p class="sv-dog-state">No sale hoy</p>
            <button type="button" class="sv-button sv-button-quiet" id="sv-absent-${e.id}" data-sv-absent="${e.id}" aria-label="Deshacer: ${L(e.name)} sí sale hoy">Deshacer</button>
          `:`
            <button type="button" class="sv-button ${t.retirado?`is-checked`:`sv-button-primary`}" id="sv-pickup-${e.id}" data-sv-pickup="${e.id}" aria-pressed="${t.retirado}" aria-label="${t.retirado?`Desmarcar retiro de ${L(e.name)}`:`Marcar a ${L(e.name)} como retirado`}">
              ${t.retirado?`${p(`checkCircle`,`sv-icon`)} Retirado ${L(t.horaRetiro)}`:`Retirado`}
            </button>
            <button type="button" class="sv-button ${t.entregado?`is-checked`:``}" id="sv-deliver-${e.id}" data-sv-deliver="${e.id}" aria-pressed="${t.entregado}" ${t.retirado?``:`disabled`} aria-label="${t.entregado?`Desmarcar entrega de ${L(e.name)}`:`Marcar a ${L(e.name)} como entregado`}">
              ${t.entregado?`${p(`checkCircle`,`sv-icon`)} Entregado ${L(t.horaEntrega)}`:`Entregado`}
            </button>
          `}
          ${s}
        </div>
      `:``}
    </li>
  `}function Fo(e){let t=Ha(`rutas`),n=lo(e),r=fo(n),i=so(e.fecha,e.shift),a=new Set($a(e.day,e.shift).map(e=>e.id)),o=n.showAll?w:w.filter(e=>a.has(e.id)||n.dogIds.includes(e.id)),s=i.filter(e=>e.id!==n.editingId),c=r.conflicts.length>0,l=`${L(e.day)} ${e.fechaLabel} · ${S[e.shift].label.toLowerCase()}`;return`
    <details class="sv-fold" data-sv-fold="rutas" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`route`,`sv-icon`)} Armar rutas del turno</span>
        <span class="sv-fold-meta">${i.length?`${i.length} guardada${i.length===1?``:`s`}`:`Sin rutas armadas`}</span>
      </summary>
      <div class="sv-fold-body">
        ${i.length?`
          <h3 class="sv-subtitle">Rutas guardadas · ${l}</h3>
          <ul class="sv-saved-routes">
            ${i.map(e=>Io(e)).join(``)}
          </ul>
        `:``}

        <form class="sv-builder" data-sv-route-form novalidate>
          <h3 class="sv-subtitle">${n.editingId?`Editar ruta`:`Nueva ruta`} · ${l}</h3>
          <div class="sv-form-grid">
            <label class="sv-field" for="sv-route-code">Ruta
              <select id="sv-route-code" data-sv-route-field="route">
                ${ga(e.shift).map(e=>`<option ${e===n.route?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label class="sv-field" for="sv-route-walker">Paseador
              <select id="sv-route-walker" data-sv-route-field="walker">
                ${Li.map(e=>`<option ${e===n.walker?`selected`:``}>${e}</option>`).join(``)}
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
                ${o.map(e=>{let t=n.dogIds.includes(e.id),r=s.find(t=>t.dogIds.includes(e.id)),i=[eo(e)?`<span class="sv-tag is-warn">Bozal</span>`:``,e.incompatibleWith?.length?`<span class="sv-tag is-danger">No juntar con ${L(ia(e.incompatibleWith,`ni`))}</span>`:``,e.status===`Activo`?``:`<span class="sv-tag is-danger">${L(e.status)}</span>`,a.has(e.id)?``:`<span class="sv-tag is-info">Fuera de este turno</span>`,r?`<span class="sv-tag is-neutral">Ya en ${L(r.route)}</span>`:``].join(``);return`
                    <li>
                      <label class="sv-pick ${t?`is-selected`:``}" for="sv-pick-${e.id}">
                        <input type="checkbox" id="sv-pick-${e.id}" data-sv-route-dog="${e.id}" ${t?`checked`:``} />
                        <span class="sv-pick-name">${L(e.name)} <small>${L(e.size)}</small></span>
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
                    <span><b>${t+1}.</b> ${L(e.name)}</span>
                    <span class="sv-order-buttons">
                      <button type="button" class="sv-mini" id="sv-up-${e.id}" data-sv-order="up" data-dog="${e.id}" ${t===0?`disabled`:``} aria-label="Subir a ${L(e.name)}">Subir</button>
                      <button type="button" class="sv-mini" id="sv-down-${e.id}" data-sv-order="down" data-dog="${e.id}" ${t===r.dogs.length-1?`disabled`:``} aria-label="Bajar a ${L(e.name)}">Bajar</button>
                    </span>
                  </li>
                `).join(``)}
              </ol>
            </div>
          `:``}

          <div class="sv-check-results" aria-live="polite">
            ${r.conflicts.map(e=>`<p class="sv-note is-${e.tone}">${p(`alertTriangle`,`sv-icon`)} ${L(e.text)}</p>`).join(``)}
            ${r.warnings.map(e=>`<p class="sv-note is-${e.tone}">${L(e.text)}</p>`).join(``)}
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
                <textarea id="sv-route-reason" rows="2" data-sv-route-field="reason" placeholder="Ej.: Pistacho va con el supervisor, separado del grupo.">${L(n.reason)}</textarea>
              </label>
            </fieldset>
          `:``}

          <label class="sv-field" for="sv-route-notes">Notas de la ruta (opcional)
            <textarea id="sv-route-notes" rows="2" data-sv-route-field="notes" placeholder="Ej.: Retirar primero a los perros con bozal.">${L(n.notes)}</textarea>
          </label>

          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-route-save">${p(`checkCircle`,`sv-icon`)} ${n.editingId?`Guardar cambios`:`Guardar ruta`}</button>
            <button type="button" class="sv-button" id="sv-route-reset" data-sv-route-reset>${n.editingId?`Cancelar edición`:`Vaciar`}</button>
          </div>
          ${ra(`route`)}
        </form>
      </div>
    </details>
  `}function Io(e){let t=e.dogIds.map(e=>Qa(e)?.name).filter(Boolean),n=Wi===e.id,r=e.record,i=r.pendiente?`Se enviará cuando haya señal.`:`Armó ${r.creadoPorNombre||`Pendiente de confirmar`}${r.creadoEn?` a las ${fa(r.creadoEn)} hs`:``}${r.actualizadoPor&&r.actualizadoPor!==r.creadoPor?` · Cambió ${ba(r.actualizadoPor,r)} a las ${fa(r.actualizadoEn)} hs`:``}.`;return`
    <li class="sv-saved ${e.conflicts.length?`has-conflict`:``}">
      <div class="sv-saved-head">
        <strong>${L(e.route)}</strong>
        <span>${L(e.walker)} · ${t.length} perros</span>
      </div>
      <p>${t.map((e,t)=>`${t+1}. ${L(e)}`).join(` · `)}</p>
      ${e.conflicts.length?`
        <div class="sv-note is-warn">
          <strong>Guardada con conflicto confirmado.</strong>
          <ul>${e.conflicts.map(e=>`<li>${L(e)}</li>`).join(``)}</ul>
          <span>Medida: ${L(e.reason||`Pendiente de confirmar`)}</span>
        </div>
      `:``}
      ${e.notes?`<p class="sv-hint">Notas: ${L(e.notes)}</p>`:``}
      <p class="sv-source">${L(i)}</p>
      <div class="sv-actions">
        ${n?`
          <button type="button" class="sv-button sv-button-danger" id="sv-route-del-ok-${e.id}" data-sv-route-delete-ok="${e.id}">Sí, borrar ${L(e.route)}</button>
          <button type="button" class="sv-button" id="sv-route-del-no-${e.id}" data-sv-route-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-route-edit-${e.id}" data-sv-route-edit="${e.id}">Editar</button>
          ${ya(r)?`<button type="button" class="sv-button" id="sv-route-del-${e.id}" data-sv-route-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function Lo(e,t){let n=Ha(`observaciones`),r=ho(e),i=go(),a=new Set(t.map(e=>e.id)),o=w.filter(e=>!a.has(e.id));return`
    <details class="sv-fold" data-sv-fold="observaciones" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`eye`,`sv-icon`)} Registrar observación de conducta</span>
        <span class="sv-fold-meta">${i.length?`${i.length} en ${Bi} días`:`Sin registros`}</span>
      </summary>
      <div class="sv-fold-body">
        <p class="sv-note is-info">Describí lo que se vio y se oyó, no lo que creés que siente el perro. No uses etiquetas como «agresivo», «malo» o «dominante». Sin datos de tutores.</p>
        <form class="sv-obs-form" data-sv-obs-form novalidate>
          <div class="sv-form-grid sv-form-grid-3">
            <label class="sv-field" for="sv-obs-dog">Perro
              <select id="sv-obs-dog" data-sv-obs="dogId" required>
                <option value="">Elegí un perro</option>
                ${t.length?`<optgroup label="De este turno">${t.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${L(e.name)}</option>`).join(``)}</optgroup>`:``}
                <optgroup label="Otros perros">${o.map(e=>`<option value="${e.id}" ${r.dogId===e.id?`selected`:``}>${L(e.name)}</option>`).join(``)}</optgroup>
              </select>
            </label>
            <label class="sv-field" for="sv-obs-fecha">Fecha (DD/MM/AAAA)
              <input type="text" id="sv-obs-fecha" data-sv-obs="fecha" value="${L(r.fecha)}" inputmode="numeric" placeholder="${e.now.label}" maxlength="10" autocomplete="off" required />
            </label>
            <label class="sv-field" for="sv-obs-hora">Hora (opcional)
              <input type="time" id="sv-obs-hora" data-sv-obs="hora" value="${L(r.hora)}" />
            </label>
          </div>
          ${po.map(e=>`
            <label class="sv-field" for="sv-obs-${e.key}">${e.label}
              <span class="sv-field-hint" id="sv-obs-${e.key}-hint">${e.hint}</span>
              ${e.type===`input`?`<input type="text" id="sv-obs-${e.key}" data-sv-obs="${e.key}" value="${L(r[e.key])}" aria-describedby="sv-obs-${e.key}-hint" required />`:`<textarea id="sv-obs-${e.key}" rows="2" data-sv-obs="${e.key}" aria-describedby="sv-obs-${e.key}-hint" required>${L(r[e.key])}</textarea>`}
            </label>
          `).join(``)}
          <label class="sv-check" for="sv-obs-seguimiento">
            <input type="checkbox" id="sv-obs-seguimiento" data-sv-obs="seguimiento" ${r.seguimiento?`checked`:``} />
            <span>Requiere seguimiento (avisar a Juan)</span>
          </label>
          <div class="sv-actions">
            <button type="submit" class="sv-button sv-button-primary" id="sv-obs-save">${p(`checkCircle`,`sv-icon`)} Guardar observación</button>
          </div>
          ${ra(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas por el equipo · últimos ${Bi} días</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>Ro(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function Ro(e){let t=Gi===e.id,n=e.perroNombre||Qa(e.perroId)?.name||`Pendiente de confirmar`;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${L(n)}</strong>
        <span>${L(ca(e.fecha))}${e.hora?` · ${L(e.hora)} hs`:``}${e.lugar?` · ${L(e.lugar)}`:``}</span>
      </div>
      ${e.seguimiento?`<p class="sv-tag is-warn">Requiere seguimiento</p>`:``}
      <dl class="sv-obs-detail">
        <div><dt>Estímulo</dt><dd>${L(e.estimulo||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Reacción</dt><dd>${L(e.reaccion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Acción</dt><dd>${L(e.accion||`Pendiente de confirmar`)}</dd></div>
        <div><dt>Resultado</dt><dd>${L(e.resultado||`Pendiente de confirmar`)}</dd></div>
      </dl>
      <p class="sv-source">Registró: ${L(_o(e))}</p>
      <div class="sv-actions">
        ${t?`
          <button type="button" class="sv-button sv-button-danger" id="sv-obs-del-ok-${e.id}" data-sv-obs-delete-ok="${e.id}">Sí, borrar</button>
          <button type="button" class="sv-button" id="sv-obs-del-no-${e.id}" data-sv-obs-delete-cancel>No borrar</button>
        `:`
          <button type="button" class="sv-button" id="sv-obs-copy-${e.id}" data-sv-obs-copy="${e.id}">${p(`copy`,`sv-icon`)} Copiar texto</button>
          ${ya(e)?`<button type="button" class="sv-button" id="sv-obs-del-${e.id}" data-sv-obs-delete="${e.id}">Borrar</button>`:``}
        `}
      </div>
    </li>
  `}function zo(e,t){let n=Ha(`cierre`),r=bo(e);if(!e.isToday)return`
      <details class="sv-fold" data-sv-fold="cierre" ${n?`open`:``}>
        <summary>
          <span class="sv-fold-title">${p(`flag`,`sv-icon`)} Cerrar el turno</span>
          <span class="sv-fold-meta">Solo para hoy</span>
        </summary>
        <div class="sv-fold-body">
          <p class="sv-empty">El cierre se hace el mismo día del turno. Tocá «Volver a hoy».</p>
        </div>
      </details>
    `;let i=So(e,t),a=r?.cerrado?r.horaCierre||fa(r.actualizadoEn):``;return`
    <details class="sv-fold" data-sv-fold="cierre" ${n?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`flag`,`sv-icon`)} Cerrar el turno</span>
        <span class="sv-fold-meta">${r?.cerrado?`Cerrado ${L(a)} hs`:`Abierto`}</span>
      </summary>
      <div class="sv-fold-body">
        ${r?`<p class="sv-source">${L(r.cerrado?xa(r,`Lo cerró`):xa(r,`Última nota de`))}</p>`:``}
        <label class="sv-field" for="sv-close-notes">Notas del supervisor (opcional)
          <span class="sv-field-hint" id="sv-close-notes-hint">Novedades del turno, sin datos de tutores. Se guardan al salir del campo y se suman al resumen.</span>
          <textarea id="sv-close-notes" rows="3" data-sv-close-notes aria-describedby="sv-close-notes-hint">${L(xo(e))}</textarea>
        </label>
        <label class="sv-field" for="sv-close-summary">Resumen para copiar
          <textarea id="sv-close-summary" class="sv-summary" rows="14" readonly>${L(i)}</textarea>
        </label>
        <div class="sv-actions">
          <button type="button" class="sv-button sv-button-primary" id="sv-close-copy" data-sv-close-copy>${p(`copy`,`sv-icon`)} Copiar resumen</button>
          ${r?.cerrado?`<button type="button" class="sv-button" id="sv-close-reopen" data-sv-close-reopen>Reabrir turno</button>`:`<button type="button" class="sv-button" id="sv-close-done" data-sv-close-done>${p(`flag`,`sv-icon`)} Marcar turno cerrado</button>`}
        </div>
        ${ra(`closure`)}
      </div>
    </details>
  `}function Bo(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${Ha(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(Rt).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas, días y turnos: ${x.officialSources.routes}, leída el ${Mt}.</li>
          <li>Perros: ${x.officialSources.dogs}.</li>
          <li>Qué perros van en PJ_1T y en PJ_2T: ${b}.</li>
          <li>Retiros, rutas, observaciones y cierres se comparten con el equipo (paseador, coordinación y Juan, según permisos). Incidentes y checklist los carga el paseador.</li>
        </ul>
      </div>
    </details>
  `}function B(e){if(!e)return ja();$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function Vo(){return oa().time}async function Ho(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}async function Uo(e,t,n){let r=z();if(!r.isToday)return;let i=Qa(e);if(!i)return;let a=Ua(r.fecha,e,r.shift);if(qi.has(a))return;let o=Ga(Wa().get(a)),s=Vo(),c={horaRetiro:``,horaPaseo:``,horaEntrega:``},l=null,u=``,d=`ok`;if(t===`retiro`)o.retirado?(l={estado:`pendiente`,...c},u=`${i.name}: retiro desmarcado.`,d=`info`):(l={estado:`retirado`,horaRetiro:s},u=`${i.name}: retirado a las ${s} hs.`);else if(t===`entrega`){if(!o.retirado)return;o.entregado?(l={estado:o.horaPaseo?`paseando`:`retirado`,horaEntrega:``},u=`${i.name}: entrega desmarcada.`,d=`info`):(l={estado:`entregado`,horaEntrega:s},u=`${i.name}: entregado a las ${s} hs.`)}else if(t===`no-sale`){if(o.noSale)l={estado:`pendiente`},u=`${i.name}: vuelve a la lista.`;else{if(o.retirado)return;l={estado:`no-sale`,...c},u=`${i.name}: no sale hoy.`}}l&&(qi.add(a),await Ta(`paseos`,{id:a,fecha:r.fecha,perroId:i.id,perroNombre:i.name,turno:S[r.shift].label,...l},`control`,u,d),qi.delete(a),B(n))}async function Wo(){let e=z(),t=lo(e),n=fo(t);if(!n.dogs.length)return R(`route`,`Elegí al menos un perro para guardar la ruta.`,`error`),B(`sv-route-save`);if(n.conflicts.length&&!t.confirm)return R(`route`,`La ruta tiene conflictos: marcá «Revisé el conflicto» para guardarla igual.`,`error`),B(`sv-route-confirm`);if(n.conflicts.length&&!t.reason.trim())return R(`route`,`Escribí qué medida vas a tomar para guardar una ruta con conflicto.`,`error`),B(`sv-route-reason`);let r=S[e.shift].label,i=n.conflicts.map(e=>e.text),a={fecha:e.fecha,turno:r,ruta:t.route,paseador:t.walker,perros:n.dogs.map(e=>e.id),conflictos:i,medida:i.length?t.reason.trim():``,notas:t.notes.trim(),titulo:`Ruta ${t.route} · ${r} · ${e.fechaLabel}${i.length?` · con conflicto confirmado`:``}`};return t.editingId&&(a.id=t.editingId),await Ta(`rutas`,a,`route`,`Ruta ${t.route} guardada con ${a.perros.length} perros${i.length?` (conflicto confirmado)`:``}. La ve el equipo.`)&&uo(co(e)),B(`sv-route-save`)}async function Go(e){let t=z(),n=ho(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),ea(I.observationDraft,n);let r=[];n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),po.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())});let i=la(n.fecha);if(!r.length&&!i)return R(`observation`,`Escribí una fecha real como DD/MM/AAAA, por ejemplo ${t.now.label}.`,`error`),B(`sv-obs-fecha`);if(!r.length&&i>t.now.iso)return R(`observation`,`La fecha no puede ser posterior a hoy.`,`error`),B(`sv-obs-fecha`);if(r.length)return R(`observation`,`Falta completar: ${ia(r)}.`,`error`),B(n.dogId?n.fecha?`sv-obs-${po.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let a=po.find(e=>Ri.test(n[e.key]));if(a){let e=n[a.key].match(Ri)[2];return R(`observation`,`En «${a.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),B(`sv-obs-${a.key}`)}let o=Qa(n.dogId);return await Ta(`observaciones`,{fecha:i,hora:n.hora||``,perroId:n.dogId,perroNombre:o?.name||``,lugar:n.lugar.trim(),estimulo:n.estimulo.trim(),reaccion:n.reaccion.trim(),accion:n.accion.trim(),resultado:n.resultado.trim(),seguimiento:!!n.seguimiento,turno:S[t.shift].label,titulo:`Observación: ${o?.name||`Pendiente de confirmar`}${n.seguimiento?` (requiere seguimiento)`:``}`},`observation`,`Observación de ${o?.name||`Pendiente de confirmar`} guardada. La ve el equipo.`)&&ea(I.observationDraft,mo(t)),B(`sv-obs-save`)}async function Ko(e,t,n,r){let i=yo(e),a=xo(e),o=va(),s={...bo(e)||{},...t,notas:a,actualizadoPor:o.usuario,actualizadoEn:new Date().toISOString(),pendiente:!1},c=So(e,$a(e.day,e.shift),s);await Ta(`cierres`,{id:i,fecha:e.fecha,turno:S[e.shift].label,notas:a,resumen:c,...t},`closure`,n,t.cerrado===!1?`info`:`ok`)&&Ki?.id===i&&Ki.notas===a&&(Ki=null),B(r)}function qo(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return ed(`/salir`),!0;if(t.closest(`[data-sv-refresh]`))return Oa(!0),!0;let n=t.closest(`[data-sv-shift]`);if(n)return Va({...z(),shift:n.dataset.svShift}),B(n.id),!0;if(t.closest(`[data-sv-today]`)){let e=oa();return Va({day:e.dayName,shift:ma(e)}),B(`sv-day`),!0}let r=t.closest(`[data-sv-pickup]`);if(r)return Uo(r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return Uo(i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=a.dataset.svAbsent,t=z(),n=Ga(Wa().get(Ua(t.fecha,e,t.shift))).noSale;return Uo(e,`no-sale`,n?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-order]`);if(o){let e=lo(z()),t=e.dogIds,n=t.indexOf(o.dataset.dog),r=o.dataset.svOrder===`up`?n-1:n+1;n>=0&&r>=0&&r<t.length&&([t[n],t[r]]=[t[r],t[n]],uo(e));let i=t.indexOf(o.dataset.dog);return B((o.dataset.svOrder===`up`?i===0:i===t.length-1)?`sv-${o.dataset.svOrder===`up`?`down`:`up`}-${o.dataset.dog}`:o.id),!0}if(t.closest(`[data-sv-route-reset]`))return uo(co(z())),R(`route`,`Borrador vacío.`,`info`),B(`sv-route-code`),!0;let s=t.closest(`[data-sv-route-edit]`);if(s){let e=z(),t=so(e.fecha,e.shift).find(e=>e.id===s.dataset.svRouteEdit);return t&&(uo({day:e.day,fecha:e.fecha,shift:e.shift,route:t.route,walker:t.walker,dogIds:[...t.dogIds],notes:t.notes||``,confirm:!1,reason:t.reason||``,showAll:!1,editingId:t.id}),R(`route`,`Editando ${t.route}. Si sigue con conflicto, vas a tener que confirmarlo de nuevo.`,`info`)),B(`sv-route-code`),!0}let c=t.closest(`[data-sv-route-delete]`);if(c)return Wi=c.dataset.svRouteDelete,B(`sv-route-del-no-${Wi}`),!0;let l=t.closest(`[data-sv-route-delete-ok]`);if(l){let e=l.dataset.svRouteDeleteOk,t=z(),n=so(t.fecha,t.shift).find(t=>t.id===e);return Wi=null,Da(`rutas`,e,`route`,`Ruta ${n?.route||``} borrada.`).then(n=>{n&&lo(t).editingId===e&&uo(co(t)),B(`sv-route-code`)}),!0}if(t.closest(`[data-sv-route-delete-cancel]`)){let e=Wi;return Wi=null,B(`sv-route-del-${e}`),!0}let u=t.closest(`[data-sv-obs-copy]`);if(u){let e=go().find(e=>e.id===u.dataset.svObsCopy);return e&&Ho(vo(e)).then(e=>{R(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),B(u.id)}),!0}let d=t.closest(`[data-sv-obs-delete]`);if(d)return Gi=d.dataset.svObsDelete,B(`sv-obs-del-no-${Gi}`),!0;let f=t.closest(`[data-sv-obs-delete-ok]`);if(f)return Gi=null,Da(`observaciones`,f.dataset.svObsDeleteOk,`observation`,`Observación borrada.`).then(()=>B(`sv-obs-save`)),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=Gi;return Gi=null,B(`sv-obs-del-${e}`),!0}if(t.closest(`[data-sv-close-copy]`)){let e=z();return Ho(So(e,$a(e.day,e.shift)),`sv-close-summary`).then(e=>{R(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),B(`sv-close-copy`)}),!0}return t.closest(`[data-sv-close-done]`)?(Ko(z(),{cerrado:!0,horaCierre:Vo()},`Turno marcado como cerrado. No te olvides de copiar el resumen.`,`sv-close-copy`),!0):t.closest(`[data-sv-close-reopen]`)?(Ko(z(),{cerrado:!1,horaCierre:``},`Turno reabierto.`,`sv-close-done`),!0):!1}function Jo(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.matches(`[data-sv-day]`))return Va({...z(),day:t.value}),B(`sv-day`),!0;let n=z();if(t.matches(`[data-sv-route-field]`)){let e=lo(n);return e[t.dataset.svRouteField]=t.value,uo(e),t.tagName===`SELECT`&&B(t.id),!0}if(t.matches(`[data-sv-route-all]`)){let e=lo(n);return e.showAll=t.checked,uo(e),B(t.id),!0}if(t.matches(`[data-sv-route-dog]`)){let e=lo(n),r=t.dataset.svRouteDog;return e.dogIds=t.checked?[...new Set([...e.dogIds,r])]:e.dogIds.filter(e=>e!==r),e.confirm=!1,uo(e),B(t.id),!0}if(t.matches(`[data-sv-route-confirm]`)){let e=lo(n);return e.confirm=t.checked,uo(e),!0}if(t.matches(`[data-sv-obs]`)){let e=ho(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,ea(I.observationDraft,e),!0}return t.matches(`[data-sv-close-notes]`)?!n.isToday||(Ki={id:yo(n),notas:t.value},t.value===(bo(n)?.notas||``)?(Ki=null,!0):(Ko(n,{},`Notas del cierre guardadas.`),!0)):!1}function Yo(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=z();if(t.matches(`[data-sv-route-field]`)&&t.tagName!==`SELECT`){let e=lo(n);e[t.dataset.svRouteField]=t.value,uo(e)}else if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=ho(n);e[t.dataset.svObs]=t.value,ea(I.observationDraft,e)}else if(t.matches(`[data-sv-close-notes]`)){Ki={id:yo(n),notas:t.value};let e=document.getElementById(`sv-close-summary`);e&&(e.value=So(n,$a(n.day,n.shift)))}}function Xo(e){let t=e.target;t.matches?.(`[data-sv-route-form]`)?(e.preventDefault(),Wo()):t.matches?.(`[data-sv-obs-form]`)&&(e.preventDefault(),Go(t))}function Zo(e){let t=e.target;if(!t.matches?.(`[data-sv-fold]`))return;let n=$i(I.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,ea(I.folds,n))}function Qo(){be.push(qo),xe.push(Jo),document.addEventListener(`input`,Yo),document.addEventListener(`submit`,Xo),document.addEventListener(`toggle`,Zo,!0),Na()}var V={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,pagos:`paseosJuan_coord_pagos`,borradores:`paseosJuan_coord_borradores`},$o=`paseosJuan_coord_secciones`;function es(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function ts(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function ns(e){try{localStorage.removeItem(e)}catch{}}var rs=null,is=null;function as(e,t,n=`ok`){rs={section:e,text:t,tone:n},n===`error`?ls(t):cs(t)}function os(e,t,n){let r=document.getElementById(e);return r||(r=document.createElement(`div`),r.id=e,r.className=`coord-sr-only`,r.setAttribute(`role`,t),r.setAttribute(`aria-live`,n),document.body.appendChild(r)),r}function ss(e,t){e.textContent=``,window.setTimeout(()=>{e.textContent=t},40)}function cs(e){ss(os(`coord-live`,`status`,`polite`),e)}function ls(e){ss(os(`coord-alerta`,`alert`,`assertive`),e)}var us=`America/Argentina/Buenos_Aires`;function H(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function ds(){return new Date(new Date().toLocaleString(`en-US`,{timeZone:us}))}function fs(e){let t=/^(\d{4})-(\d{2})-(\d{2})/.exec(String(e||``));return t?`${t[3]}/${t[2]}/${t[1]}`:String(e||``)}function ps(e){let t=new Date(e);if(!e||Number.isNaN(t.getTime()))return``;let n=Object.fromEntries(new Intl.DateTimeFormat(`es-AR`,{timeZone:us,day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(t).map(e=>[e.type,e.value]));return`${n.day}/${n.month}/${n.year} ${n.hour}:${n.minute}`}function ms(e){let t=/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(String(e||``));if(!t)return null;let[,n,r,i]=t.map(Number),a=new Date(Date.UTC(i,r-1,n));return a.getUTCFullYear()!==i||a.getUTCMonth()!==r-1||a.getUTCDate()!==n?null:`${i}-${String(r).padStart(2,`0`)}-${String(n).padStart(2,`0`)}`}function hs(){return fs(v())}function gs(){return v(new Date(Date.now()-5184e5))}function _s(e){return String(e||``).normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase()}var vs={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function ys(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>vs[e]).join(`, `):`Sin días en rutas`}function bs(e){let t=fc.map(t=>{let n=C.filter(n=>Ht(e,n,t));return n.length?`${t.toLowerCase()}: ${ys(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function xs(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Ss(e,t=!1){let n=es($o,{});return e in n?!!n[e]:t}function Cs(e,t){ts($o,{...es($o,{}),[e]:t})}var ws=new Set;function Ts(){return document.documentElement.dataset.motion===`calm`}function Es(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:Ts()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}function Ds(){return g.user()||{usuario:``,nombre:`Pendiente de confirmar`,rol:``}}var Os=[`pedidos`,`fichas`,`resueltos`,`pagos`],ks=[`observaciones`,`incidentes`];function As(e){return ks.includes(e)?{desde:gs()}:{}}function js(e){return _.cached(e,As(e))}var Ms=new Set,Ns=new Map,Ps=new Map,Fs=!1,Is=!1;function Ls(){Fs||(Fs=!0,et(e=>{[...Os,...ks].includes(e)&&(Ms.add(e),Ns.delete(e),Bs())}),window.addEventListener(`online`,Bs),window.addEventListener(`offline`,Bs))}function Rs(){let e=g.user();e&&[...Os,...ks].forEach(t=>{let n=As(t),r=`${e.usuario}|${n.desde||``}`,i=Ps.get(t);if(i?.key===r)return;i?.stop?.();let a={key:r,stop:null};Ps.set(t,a),_.list(t,n).then(()=>{Ms.add(t),Ns.delete(t)}).catch(e=>{e.status!==401&&(Ns.set(t,e.message),ls(e.message))}).finally(()=>{Ps.get(t)===a&&(a.stop=_.watch(t,n)),Bs(),lc()})})}function zs(){[...Ps.values()].forEach(e=>e.stop?.()),Ps.clear(),Ns.clear(),Rs()}function Bs(){Is||(Is=!0,requestAnimationFrame(()=>{Is=!1,document.querySelector(`.coord-shell`)&&Vs()}))}function Vs(){document.querySelectorAll(`.coord-shell [data-coord-form]`).forEach(e=>{let t=e.dataset.coordForm;Sc.has(t)||(xc[t]=Ec(e))});let e=document.activeElement,t=e?.closest?.(`.coord-shell`)&&e.id?e.id:null,n=null;try{t&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}let r=window.scrollY;if($(),Math.abs(window.scrollY-r)>1&&window.scrollTo(0,r),t){let e=document.getElementById(t);if(e){e.focus({preventScroll:!0});try{n&&e.setSelectionRange(n[0],n[1])}catch{}}}}function Hs(e,t){return String(t.creadoEn||`9999`).localeCompare(String(e.creadoEn||`9999`))}var Us=[`nuevo`,`en-curso`,`resuelto`];function Ws(e){return e.estado===`curso`?`en-curso`:Us.includes(e.estado)?e.estado:`nuevo`}function Gs(){return js(`pedidos`).slice().sort(Hs)}function Ks(){return js(`fichas`).slice().sort(Hs)}function qs(){return js(`pagos`).slice().sort(Hs)}function Js(){let e={};return js(`resueltos`).forEach(t=>{t.resuelto&&(e[t.perroId||t.id]=t)}),e}function Ys(e){return e.datos?.perro||e.perro||``}function Xs(e){return e.filter(e=>e.origen===`web`&&Ws(e)===`nuevo`)}function Zs(e){let t=g.user();return!t||e.pendiente||!e.creadoEn?!1:t.rol===`admin`||e.creadoPor===t.usuario&&Date.now()-Date.parse(e.creadoEn)<864e5}function Qs(e,{web:t=!1}={}){let n=[];if(t?n.push(`Llegó por la página web${e.creadoEn?` el ${ps(e.creadoEn)}`:``}`):e.creadoPorNombre&&n.push(`Cargado por ${H(e.creadoPorNombre)}${e.creadoEn?` el ${ps(e.creadoEn)}`:``}`),e.actualizadoEn&&e.actualizadoEn!==e.creadoEn){let t=e.actualizadoPorNombre||e.cambioPorNombre;n.push(`Último cambio${t?` de ${H(t)}`:``}: ${ps(e.actualizadoEn)}`)}let r=e.pendiente?`<p class="coord-meta is-pending">${p(`clock`,`coord-icon`)}<span>Sin señal: se enviará cuando vuelva.</span></p>`:``;return`${n.length?`<p class="coord-meta">${n.join(` · `)}</p>`:``}${r}`}var $s=new Set;async function ec(e,t,{section:n,ok:r}){try{let i=await _.save(e,t);return as(n,i.pendiente?`${r} Sin señal: se enviará cuando vuelva.`:r),i}catch(e){return as(n,`No se pudo guardar: ${e.message}`,`error`),null}finally{Bs()}}async function tc(e,t,{section:n,ok:r}){try{await _.remove(e,t.id),is={col:e,record:t,section:n},as(n,r),rs.undo=!0}catch(e){as(n,`No se pudo borrar: ${e.message}`,`error`)}finally{Bs()}}function nc(e,t){$s.has(e)||($s.add(e),Promise.resolve().then(t).finally(()=>$s.delete(e)))}var rc=!1,ic=!1,ac=``,oc=/^[a-z0-9][a-z0-9_.-]{0,90}$/i;function sc(e){let t=`ant_${String(e||``)}`;return oc.test(String(e||``))?t:void 0}function cc(){let e=v(),t=[];es(V.pedidos,[]).forEach(n=>{let r=n.tipo||`Otro`;t.push({key:V.pedidos,oldId:n.id,col:`pedidos`,data:{id:sc(n.id),fecha:ms(n.fecha)||e,tipo:r,estado:n.estado===`curso`?`en-curso`:Us.includes(n.estado)?n.estado:`nuevo`,titulo:`${r}: ${n.perro||`sin perro indicado`}`,detalle:n.detalle||``,origen:`app`,datos:{perro:n.perro||``,canal:n.canal||``},migrado:!0}})}),es(V.altas,[]).forEach(n=>{let{id:r,fecha:i,supervisor:a,categoria:o,primerPaseo:s,...c}=n;t.push({key:V.altas,oldId:r,col:`fichas`,data:{id:sc(r),fecha:ms(i)||e,perroNombre:n.nombre||`Pendiente de confirmar`,datos:{...c,primerPaseo:`Individual`},categoria:`SIN EVALUAR`,estado:`lista`,migrado:!0}})}),es(V.pagos,[]).forEach(n=>{let r=Number(String(n.montoTexto||n.monto||``).replace(/[^\d]/g,``))||0;t.push({key:V.pagos,oldId:n.id,col:`pagos`,data:{id:sc(n.id),fecha:ms(n.fecha)||e,concepto:`Pago de ${n.perro||`Pendiente de confirmar`}`,perroNombre:n.perro||``,monto:r,medio:n.medio||``,comprobante:n.comprobante||``,nota:n.nota||``,pasadoAlLibro:!!n.enLibro,migrado:!0}})});let n=new Set(js(`resueltos`).map(e=>e.perroId||e.id));return Object.entries(es(V.resueltos,{})).forEach(([e,r])=>{if(n.has(e)){t.push({key:V.resueltos,oldId:e,skip:!0});return}let i=w.find(t=>t.id===e);t.push({key:V.resueltos,oldId:e,col:`resueltos`,data:{id:e,perroId:e,perroNombre:i?.name||e,resuelto:!0,nota:`Marcado como resuelto el ${r} en un solo dispositivo (versión anterior de la página).`,migrado:!0}})}),t}async function lc(){if(!(rc||ic)&&Os.every(e=>Ms.has(e))){ic=!0;try{let e=es(V.borradores,{});Object.entries(e).forEach(([e,t])=>{xc[e]||(xc[e]=t)}),ns(V.borradores);let t=cc();if(!t.length){rc=!0;return}let n=new Set,r=0,i=``;for(let e of t)if(!e.skip)try{await _.save(e.col,e.data),r+=1}catch(t){n.add(`${e.key}|${e.oldId}`),i=t.message}[V.pedidos,V.altas,V.pagos].forEach(e=>{let t=es(e,[]).filter(t=>n.has(`${e}|${t.id}`));t.length?ts(e,t):ns(e)});let a=Object.fromEntries(Object.entries(es(V.resueltos,{})).filter(([e])=>n.has(`${V.resueltos}|${e}`)));Object.keys(a).length?ts(V.resueltos,a):ns(V.resueltos),r&&(ac=`Subimos ${r} ${r===1?`registro que estaba guardado`:`registros que estaban guardados`} solo en este dispositivo. Ahora los ve el resto del equipo según su rol.`,cs(ac)),n.size?(Ns.set(`migracion`,`Quedaron ${n.size} registros de este dispositivo sin subir: ${i}`),ls(Ns.get(`migracion`))):rc=!0}finally{ic=!1,Bs()}}}var uc=w.filter(e=>e.status===`Activo`),dc=C.filter(e=>e!==`Domingo`),fc=[`Mañana`,`Tarde`];function pc(e){return e.safety.some(e=>/bozal/i.test(e))}function mc(e,t){return Ut(e,t).filter(e=>e.status===`Activo`)}var hc=w.filter(e=>e.review||e.status!==`Activo`);function gc(e,t){let n=mc(e,t),r=new Set(n.map(e=>e.name)),i=new Map;return n.forEach(e=>{(e.incompatibleWith||[]).forEach(t=>{if(!r.has(t))return;let n=[e.name,t].sort().join(` y `);i.set(n,n)})}),[...i.keys()]}function _c(){let e=new Map;return dc.forEach(t=>{fc.forEach(n=>{gc(t,n).forEach(r=>{e.has(r)||e.set(r,{});let i=e.get(r);i[n]=[...i[n]||[],t]})})}),[...e.entries()].map(([e,t])=>({pair:e,detail:Object.entries(t).map(([e,t])=>`${e.toLowerCase()}: ${ys(t).toLowerCase()}`).join(` · `)}))}function vc(){let e=new Set(w.map(e=>e.name)),t=new Set;return w.forEach(n=>(n.incompatibleWith||[]).forEach(n=>!e.has(n)&&t.add(n))),[...t]}function yc(){return dc.map(e=>{let t=mc(e,`Mañana`),n=mc(e,`Tarde`),r=new Set([...t,...n].filter(pc).map(e=>e.name));return{day:e,manana:t.length,tarde:n.length,total:t.length+n.length,muzzle:[...r],conflicts:gc(e,`Mañana`).length+gc(e,`Tarde`).length}})}function bc(){let e=Js();return hc.filter(t=>!e[t.id])}var xc={},Sc=new Set;function Cc(e){return xc[e]||{}}function wc(e,t){xc[e]=t,Sc.delete(e)}function Tc(e){delete xc[e],Sc.add(e)}function Ec(e){let t={...Cc(e.dataset.coordForm)};return e.querySelectorAll(`[name]`).forEach(n=>{if(n.type!==`file`){if(n.type===`checkbox`){let r=e.querySelectorAll(`[name="${n.name}"]`);t[n.name]=[...r].filter(e=>e.checked).map(e=>e.value)}else t[n.name]=n.value}}),t}function U(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${H(r)}" ${i?`placeholder="${H(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function W(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``} ${s?`required`:``}>
        ${r.map(e=>`<option ${e===i?`selected`:``}>${H(e)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function Dc(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0,attrs:s=``}={}){let c=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}</label>
      <textarea id="${c}" name="${t}" rows="3" ${i?`placeholder="${H(i)}"`:``} ${a?`aria-describedby="${c}-hint"`:``} ${s}>${H(r)}</textarea>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function Oc(e,t,n,r,i){let a=`coord-${e}-${t}`;return`
    <div class="coord-field">
      <span class="coord-label" id="${a}-label">${n}</span>
      <div class="coord-file">
        <input class="coord-file-input" id="${a}" type="file" accept=".jpg,.jpeg,.png,.pdf" data-coord-file="${e}" data-coord-file-field="${t}" aria-labelledby="${a}-label ${a}-button" aria-describedby="${a}-hint" />
        <label class="coord-btn is-secondary is-compact" for="${a}" id="${a}-button">${p(`fileUp`,`coord-icon`)}<span>${r?`Cambiar archivo`:`Elegir archivo`}</span></label>
        <span class="coord-file-name" data-coord-file-name>${r?H(r):`Ningún archivo elegido`}</span>
      </div>
      <small id="${a}-hint">${i}</small>
    </div>
  `}function kc(e){if(!rs||rs.section!==e)return``;let t=rs.undo?`<button class="coord-link" type="button" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${rs.tone}">${p(rs.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${H(rs.text)}</span>${t}</p>`}function G(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?p(r,`coord-icon`):``}<span>${e}</span></button>`}function Ac({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${Ss(e,s)?`open`:``}>
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
  `}function K(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function jc(e){return e.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${H(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${p(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${H(e)}</li>`).join(``)}
    </ul>
  `:``}function Mc(e,t=``){let n=e.filter(([,e])=>String(e??``).trim());return n.length?`
    <dl class="coord-data ${t}">
      ${n.map(([e,t,n])=>`<div class="${n?`is-${n}`:``}"><dt>${e}</dt><dd>${H(t)}</dd></div>`).join(``)}
    </dl>
  `:``}function Nc(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Pc()}
      ${e}
    </div>
  `}function Pc(){return`
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
  `}function Fc(){Ls(),Rs();let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${Ic()}
      ${Rc()}
      ${Bc()}
      ${Yc()}
      ${Zc()}
      ${il()}
      ${al()}
      ${ol()}
      <p class="coord-footnote">
        Rutas y datos de perros al ${Mt}. Fuentes: ${H(x.officialSources.dogs)} y ${H(x.officialSources.routes)}.
        Pedidos, fichas, datos resueltos y pagos se guardan en los datos compartidos del equipo.
      </p>
    </main>
  `;return rs=null,Sc.clear(),e}function Ic(){let e=_.pendingCount(),t=navigator.onLine===!1,n=[...new Set(Ns.values())],r=[];return e?r.push(`<p class="coord-sync is-warn">${p(`clock`,`coord-icon`)}<span><b>${e} ${e===1?`cambio pendiente`:`cambios pendientes`} sin señal.</b> Se ${e===1?`envía solo`:`envían solos`} cuando vuelva.</span></p>`):t&&r.push(`<p class="coord-sync is-warn">${p(`clock`,`coord-icon`)}<span><b>Sin señal.</b> Lo que cargues queda guardado y se envía cuando vuelva.</span></p>`),n.length&&r.push(`<div class="coord-sync is-error">${p(`alertCircle`,`coord-icon`)}<span>${n.map(H).join(` `)}</span>${G(`Reintentar`,`data-coord-retry`,`secondary`)}</div>`),ac&&r.push(`<p class="coord-sync is-ok">${p(`uploadCloud`,`coord-icon`)}<span>${H(ac)}</span></p>`),r.length?`<div class="coord-sync-list">${r.join(``)}</div>`:``}function Lc(e){if(!e.length)return``;let t=e.slice(0,3);return`
    <div class="coord-web-alert" role="note" aria-labelledby="coord-web-alert-title">
      <h2 id="coord-web-alert-title">${p(`bell`,`coord-icon`)}<span>${e.length===1?`Pedido nuevo desde la web`:`${e.length} pedidos nuevos desde la web`}</span></h2>
      <ul>
        ${t.map(e=>{let t=e.datos||{},n=t.mordida&&t.mordida!==`No`;return`
            <li>
              <div>
                <strong>${H(t.perro||`Pendiente de confirmar`)}</strong>
                <span>${H([t.responsable,t.zona].filter(Boolean).join(` · `)||`Pendiente de confirmar`)} · ${H(ps(e.creadoEn)||fs(e.fecha))}</span>
                ${n?`<span class="coord-inline-alert is-strong">${p(`alertTriangle`,`coord-icon`)}<span>Mordida: ${H(t.mordida)}</span></span>`:``}
              </div>
              ${G(`Ver pedido`,`data-coord-goto-pedido="${H(e.id)}"`,`primary`,`arrowRight`)}
            </li>
          `}).join(``)}
      </ul>
      ${e.length>t.length?`<p>Y ${e.length-t.length} más en el tablero de pedidos.</p>`:``}
    </div>
  `}function Rc(){let e=Wt(ds()),t=Ds(),n=bc(),r=Gs(),i=r.filter(e=>Ws(e)!==`resuelto`),a=r.filter(e=>Ws(e)===`nuevo`).length,o=Xs(r),s=mc(e,`Mañana`),c=mc(e,`Tarde`),l=[...new Set([...s,...c].filter(pc).map(e=>e.name))],u=[...gc(e,`Mañana`).map(e=>`${e} (mañana)`),...gc(e,`Tarde`).map(e=>`${e} (tarde)`)],d=s.length+c.length===0,f;if(o.length){let e=o[o.length-1],t=e.datos||{};f={text:`Escribile a <b>${H(t.responsable||`quien hizo el pedido`)}</b> por la evaluación de <b>${H(t.perro||`su perro`)}</b>.`,action:G(`Ver pedido`,`data-coord-goto-pedido="${H(e.id)}"`,`primary`,`arrowRight`)}}else if(n.length){let e=n[0];f={text:`Confirmá el dato de <b>${H(e.name)}</b>: ${H(e.review||`estado "${e.status}"`)}`,action:G(`Ir a ${H(e.name)}`,`data-coord-goto-dog="${e.id}"`,`primary`,`arrowRight`)}}else if(i.length){let e=i[i.length-1];f={text:`Avanzá con el pedido más viejo: <b>${H(e.titulo||e.tipo)}</b>.`,action:G(`Ver pedido`,`data-coord-goto-pedido="${H(e.id)}"`,`primary`,`arrowRight`)}}else f={text:`No hay datos ni pedidos pendientes. Revisá la carga de la semana.`,action:G(`Ver carga`,`data-coord-open="carga"`,`primary`,`arrowRight`)};return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${e} ${hs()}</p>
        <p class="coord-greeting">Hola, ${H(t.nombre)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
        <p class="coord-owner">A cargo: ${H(t.nombre)}</p>
      </div>

      ${Lc(o)}

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Datos a confirmar</h2>
            <p class="coord-big"><b>${n.length}</b> <span>de ${hc.length} perros</span></p>
            <p>${n.length?`Diferencias entre planillas o perros sin ruta.`:`Todo confirmado.`}</p>
          </div>
          ${G(`Ver la lista`,`data-coord-goto="coord-datos"`,`secondary`)}
        </li>
        <li class="coord-priority ${o.length?`is-alert`:a?`is-warn`:``}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Pedidos abiertos</h2>
            <p class="coord-big"><b>${i.length}</b> <span>${a?`${a} sin empezar`:i.length===1?`pedido`:`pedidos`}</span></p>
            <p>${r.length?`Consultas, evaluaciones de la web y avisos de clientes.`:Ms.has(`pedidos`)?`Todavía no hay pedidos.`:`Cargando pedidos…`}</p>
          </div>
          ${G(r.length?`Ver pedidos`:`Cargar un pedido`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${u.length?`is-alert`:``}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Hoy en la calle</h2>
            ${d?`<p class="coord-big"><b>0</b> <span>perros</span></p><p>No hay rutas cargadas para hoy.</p>`:`<p class="coord-big"><b>${s.length}</b> <span>mañana</span> <b>${c.length}</b> <span>tarde</span></p>
                 ${l.length?`<p class="coord-inline-alert">${p(`alertTriangle`,`coord-icon`)}<span>Con bozal: ${H(xs(l))}</span></p>`:``}
                 ${u.length?`<p class="coord-inline-alert is-strong">${p(`alertTriangle`,`coord-icon`)}<span>No juntar, comparten turno: ${H(xs(u))}</span></p>`:``}`}
          </div>
          ${G(`Ver carga de la semana`,`data-coord-open="carga"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function zc(e,t){let n=t?t.actualizadoPorNombre||t.resueltoPorNombre||t.creadoPorNombre:``;return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${H(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?K(`Activo`,`neutral`):K(H(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${H(e.plan)} · ${H(e.size)} · ${H(bs(e))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${H(e.review||`Estado "${e.status}".`)}</p>
      ${jc(e)}
      ${t?.nota?`<p class="coord-meta">${H(t.nota)}</p>`:``}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}<span>Resuelto${n?` por ${H(n)}`:``}${t.actualizadoEn?` el ${ps(t.actualizadoEn)}`:``}${t.pendiente?` (sin señal: se enviará cuando vuelva)`:``}</span></p>${G(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:G(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function Bc(){let e=Js(),t=hc.filter(t=>!e[t.id]),n=hc.filter(t=>e[t.id]),r=t.slice(0,4),i=t.slice(4),a=vc();return`
    <section class="coord-block" id="coord-datos" tabindex="-1" aria-labelledby="coord-datos-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-datos-title">Datos a confirmar</h2>
          <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
        </div>
        <div class="coord-progress" aria-label="${n.length} de ${hc.length} resueltos">
          <b>${n.length}/${hc.length}</b><span>resueltos</span>
          <span class="coord-progress-bar" aria-hidden="true"><i style="width:${Math.round(n.length/hc.length*100)}%"></i></span>
        </div>
      </div>
      ${kc(`datos`)}
      ${t.length?`<ul class="coord-review-list">${r.map(e=>zc(e)).join(``)}</ul>`:`<p class="coord-empty">${p(`checkCircle`,`coord-icon`)}No quedan datos por confirmar.</p>`}
      ${i.length?`
        <details class="coord-more" ${Ss(`datosMas`)?`open`:``}>
          <summary data-coord-toggle="datosMas">Ver los otros ${i.length} pendientes ${p(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${i.map(e=>zc(e)).join(``)}</ul>
        </details>`:``}
      ${n.length?`
        <details class="coord-more" ${Ss(`datosResueltos`)?`open`:``}>
          <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${p(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${n.map(t=>zc(t,e[t.id])).join(``)}</ul>
        </details>`:``}
      ${a.length?`<p class="coord-note">${p(`alertCircle`,`coord-icon`)}<span>También a confirmar: ${H(xs(a))} figura en "no juntar con" pero no está en la lista de perros.</span></p>`:``}
      <p class="coord-note">${p(`fileText`,`coord-icon`)}<span>Lo que marcás como resuelto lo ven Juan y coordinación. El cambio todavía debe incorporarse al ${H(x.officialSources.dogs.toLowerCase())}.</span></p>
    </section>
  `}var Vc=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],Hc=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],Uc=[[`nuevo`,`Nuevo`],[`en-curso`,`En curso`],[`resuelto`,`Resuelto`]],Wc={nuevo:`Nuevo`,"en-curso":`En curso`,resuelto:`Resuelto`};function Gc(e){let t=String(e||``).replace(/\D/g,``);if(t.startsWith(`00`)&&(t=t.slice(2)),t.startsWith(`54`)&&(t=t.slice(2),t.startsWith(`9`)&&(t=t.slice(1))),t.startsWith(`0`)&&(t=t.slice(1)),t.length===12){let e=[2,3,4].find(e=>t.slice(e,e+2)===`15`);e&&(t=t.slice(0,e)+t.slice(e+2))}return t.length===10?`549${t}`:``}function Kc(e,t){let n=e.datos||{};if(!n.telefono)return``;let r=Gc(n.telefono);if(!r)return`<p class="coord-inline-alert">${p(`alertCircle`,`coord-icon`)}<span>Revisá el teléfono: no parece un celular de Argentina. Escribile a mano.</span></p>`;let i=`${n.responsable?`Hola ${n.responsable}`:`Hola`}, te escribo de Paseos Juan por el pedido de evaluación de ${n.perro||`tu perro`}.`;return`<a class="coord-btn is-${t}" href="https://wa.me/${r}?text=${encodeURIComponent(i)}" target="_blank" rel="noopener noreferrer">${p(`message`,`coord-icon`)}<span>Escribirle por WhatsApp</span><span class="coord-sr-only"> (se abre en otra pestaña)</span></a>`}function qc(e){let t=e.datos||{},n=t.mordida&&t.mordida!==`No`,r=[t.edad,t.tamano,t.raza].filter(Boolean).join(` · `),i=[t.tipo,t.horario,t.dias].filter(Boolean).join(` · `);return Mc([[`Perro`,r?`${t.perro||`Pendiente de confirmar`} (${r})`:t.perro||`Pendiente de confirmar`],[`Mordió o intentó morder`,t.mordida,n?`alert`:``],[`Con otros perros`,t.perros,t.perros===`No`?`warn`:``],[`Energía`,t.energia],[`Conducta`,t.conducta],[`Responsable`,t.responsable],[`Teléfono`,t.telefono],[`Zona`,[t.zona,t.referencia].filter(Boolean).join(` · `)],[`Quiere`,i],[`Comentario`,t.comentario]])}function Jc(e,t){let n=Ws(e),r=e.origen===`web`,i=e.datos||{},a=H(e.id),o=t.get(e.id),s={nuevo:G(`Empezar`,`data-coord-pedido-move="${a}" data-estado="en-curso"`,`secondary`)+G(`Resolver`,`data-coord-pedido-move="${a}" data-estado="resuelto"`,`ghost`),"en-curso":G(`Resolver`,`data-coord-pedido-move="${a}" data-estado="resuelto"`,`secondary`)+G(`Volver a nuevo`,`data-coord-pedido-move="${a}" data-estado="nuevo"`,`ghost`),resuelto:G(`Reabrir`,`data-coord-pedido-move="${a}" data-estado="en-curso"`,`secondary`)}[n],c=`pedido-${e.id}`,l=n!==`resuelto`||ws.has(c),u=(r||/evaluaci/i.test(e.tipo||``))&&!o&&n!==`resuelto`,d=r?n===`resuelto`?`<details class="coord-card-more" ${l?`open`:``}><summary data-coord-mem-toggle="${H(c)}">Ver datos del formulario ${p(`chevronDown`,`coord-icon`)}</summary>${qc(e)}</details>`:qc(e):`
      <p class="coord-card-dog">${p(`pawPrint`,`coord-icon`)}${H(Ys(e)||`Pendiente de confirmar`)}</p>
      ${e.detalle?`<p>${H(e.detalle)}</p>`:``}
    `;return`
    <li class="coord-card ${r?`is-web`:``}" id="coord-pedido-${a}" tabindex="-1">
      <div class="coord-card-head">
        <strong>${H(r?i.perro||`Pendiente de confirmar`:e.tipo||`Pedido`)}</strong>
        <small>${r?H(e.tipo||`Formulario web`):`${H(fs(e.fecha))}${i.canal||e.canal?` · ${H(i.canal||e.canal)}`:``}`}</small>
      </div>
      ${r?`<p class="coord-badges">${K(`Formulario web`,`warn`)}</p>`:``}
      ${d}
      ${Qs(e,{web:r})}
      ${o?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}<span>Ficha creada para ${H(o.perroNombre)}</span></p>`:``}
      <div class="coord-actions">
        ${n===`resuelto`?``:Kc(e,`primary`)}
        ${s}
        ${u?G(`Armar ficha con estos datos`,`data-coord-pedido-ficha="${a}"`,`ghost`,`userPlus`):``}
        ${n===`resuelto`&&Zs(e)?G(`Borrar`,`data-coord-pedido-delete="${a}"`,`ghost`):``}
      </div>
    </li>
  `}function Yc(){let e=Gs(),t=Cc(`pedido`),n=e.filter(e=>Ws(e)!==`resuelto`).length,r=Xs(e).length,i=w.map(e=>e.name),a=new Map(Ks().filter(e=>e.datos?.pedidoId).map(e=>[e.datos.pedidoId,e])),o=!Ms.has(`pedidos`)&&!e.length,s=`
    ${kc(`pedidos`)}
    <div class="coord-board">
      ${Uc.map(([t,n])=>{let r=e.filter(e=>Ws(e)===t);return t===`nuevo`&&r.sort((e,t)=>Number(t.origen===`web`)-Number(e.origen===`web`)),`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(e=>Jc(e,a)).join(``)}</ul>`:`<p class="coord-empty is-small">${o?`Cargando…`:t===`nuevo`?`Sin pedidos nuevos.`:t===`en-curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>

    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido que llegó por otro lado</h3>
      <div class="coord-grid">
        ${W(`pedido`,`tipo`,`Tipo de pedido`,Vc,{value:t.tipo})}
        ${U(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre del perro o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${W(`pedido`,`canal`,`Llegó por`,Hc,{value:t.canal})}
        ${Dc(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${i.map(e=>`<option value="${H(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${G(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>
  `;return Ac({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Los del formulario de la web y los que cargás vos. Los ve todo coordinación.`,badges:`${r?K(`${r} ${r===1?`nuevo`:`nuevos`} de la web`,`alert`):``}${n?K(`${n} abiertos`,`warn`):K(`Sin pedidos abiertos`,`neutral`)}`,body:s,open:r>0})}var Xc=[`Pendiente de confirmar`,`Sí`,`No`];function Zc(){let e=Cc(`alta`),t=Ks(),n=Array.isArray(e.dias)?e.dias:[],r=[`Pendiente de confirmar`,...Ft.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${p(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${kc(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      ${e.pedidoId?`<p class="coord-note">${p(`clipboardCheck`,`coord-icon`)}<span>Formulario completado con los datos del pedido web. Revisalos antes de guardar.</span></p>`:``}
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${U(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${W(`alta`,`tamano`,`Tamaño`,[`Pendiente de confirmar`,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${U(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${U(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${W(`alta`,`sexo`,`Sexo`,[`Pendiente de confirmar`,`Macho`,`Hembra`],{value:e.sexo})}
          ${W(`alta`,`castrado`,`Castrado o castrada`,Xc,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Lo ven solo Juan, coordinación y supervisión.</p>
        <div class="coord-grid">
          ${U(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${U(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${U(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${W(`alta`,`zona`,`Zona`,[`Pendiente de confirmar`,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
          ${U(`alta`,`referencia`,`Barrio o referencia`,{value:e.referencia,attrs:`autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${W(`alta`,`vacunas`,`Vacunas al día`,Xc,{value:e.vacunas})}
          ${Oc(`alta`,`carnet`,`Carnet de vacunas`,e.carnet,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
          ${U(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${Dc(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${W(`alta`,`sujecion`,`Collar o pechera`,[`Pendiente de confirmar`,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${W(`alta`,`bozal`,`Usa bozal`,Xc,{value:e.bozal})}
          ${W(`alta`,`correa`,`Tiene correa propia`,Xc,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${e.relatoTutor?Dc(`alta`,`relatoTutor`,`Lo que contó el tutor en el formulario (no observado)`,{value:e.relatoTutor,attrs:`readonly`}):``}
          ${Dc(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,placeholder:`Ej.: se acerca con la cola baja y se aleja si el otro ladra`,span:!1})}
          ${Dc(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${Dc(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${U(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${W(`alta`,`plan`,`Plan pedido`,r,{value:e.plan,hint:`Precios oficiales en la tabla de planes.`})}
          ${W(`alta`,`turno`,`Turno`,[`Pendiente de confirmar`,`Mañana`,`Tarde`],{value:e.turno})}
          <div class="coord-field is-wide">
            <span class="coord-label" id="coord-alta-dias-label">Días pedidos</span>
            <div class="coord-days" role="group" aria-labelledby="coord-alta-dias-label">
              ${dc.map(e=>`
                <label class="coord-day"><input type="checkbox" name="dias" value="${e}" ${n.includes(e)?`checked`:``} /><span>${e}</span></label>
              `).join(``)}
            </div>
          </div>
          <div class="coord-field">
            <span class="coord-label">Categoría</span>
            <p class="coord-fixed">${K(`SIN EVALUAR`,`neutral`)}</p>
          </div>
          <div class="coord-field">
            <span class="coord-label">Primer paseo</span>
            <p class="coord-fixed">${K(`Individual`,`neutral`)}</p>
          </div>
        </div>
      </fieldset>
      <div class="coord-actions">
        ${G(`Guardar ficha`,`data-coord-alta-save`,`primary`,`plus`)}
        ${G(`Vaciar formulario`,`data-coord-alta-clear`,`ghost`)}
      </div>
    </form>

    <div class="coord-subblock">
      <h3>Fichas cargadas <span>${t.length}</span></h3>
      ${t.length?`
        <ul class="coord-card-list is-grid">
          ${t.map(e=>{let t=e.datos||{},n=Array.isArray(t.dias)?t.dias:[];return`
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${H(e.perroNombre||t.nombre||`Pendiente de confirmar`)}</strong>
                <small>Alta ${H(fs(e.fecha))}</small>
              </div>
              <p class="coord-badges">${K(H(e.categoria||`SIN EVALUAR`),`neutral`)} ${K(`Primer paseo individual`,`warn`)} ${e.estado===`borrador`?K(`Borrador`,`neutral`):``}</p>
              <p>${H(!t.tamano||t.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:t.tamano)} · Plan: ${H(!t.plan||t.plan===`Pendiente de confirmar`?`pendiente`:t.plan)} · Días: ${n.length?H(ys(n).toLowerCase()):`pendientes`} · Turno: ${H(!t.turno||t.turno===`Pendiente de confirmar`?`pendiente`:t.turno.toLowerCase())}</p>
              ${t.bozal===`Sí`||t.noJuntar?`<ul class="coord-safety">
                ${t.bozal===`Sí`?`<li class="is-alert">${p(`alertTriangle`,`coord-icon`)}Usa bozal</li>`:``}
                ${t.noJuntar?`<li class="is-alert">${p(`alertTriangle`,`coord-icon`)}No juntar con ${H(t.noJuntar)}</li>`:``}
              </ul>`:``}
              ${Qs(e)}
              <div class="coord-actions">
                ${G(`Copiar ficha`,`data-coord-alta-copy="${H(e.id)}"`,`ghost`,`copy`)}
                ${Zs(e)?G(`Borrar`,`data-coord-alta-delete="${H(e.id)}"`,`ghost`):``}
              </div>
            </li>
          `}).join(``)}
        </ul>
        <p class="coord-note">${p(`fileText`,`coord-icon`)}<span>Estas fichas todavía deben incorporarse al ${H(x.officialSources.dogs.toLowerCase())}.</span></p>
      `:`<p class="coord-empty is-small">${Ms.has(`fichas`)?`Todavía no hay perros nuevos cargados.`:`Cargando fichas…`}</p>`}
    </div>
  `;return Ac({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?K(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function Qc(e){let t=e.datos||{},n=e=>e||`Pendiente de confirmar`;return[`Ficha de alta: ${e.perroNombre||t.nombre} (cargada el ${fs(e.fecha)}${e.creadoPorNombre?` por ${e.creadoPorNombre}`:``})`,`Categoría: ${e.categoria||`SIN EVALUAR`}. Primer paseo: individual.`,`Identificación: ${n(t.tamano)}; raza o cruza: ${n(t.raza)}; edad: ${n(t.edad)}; sexo: ${n(t.sexo)}; castrado/a: ${n(t.castrado)}.`,`Tutor: ${n(t.tutor)}; contacto: ${n(t.contacto)}; emergencia: ${n(t.emergencia)}; zona: ${n(t.zona)}${t.referencia?` (${t.referencia})`:``}.`,`Salud: vacunas al día: ${n(t.vacunas)}; carnet: ${n(t.carnet)}; veterinaria: ${n(t.veterinario)}; observaciones: ${n(t.salud)}.`,`Equipo: ${n(t.sujecion)}; bozal: ${n(t.bozal)}; correa propia: ${n(t.correa)}.`,t.relatoTutor?`Lo que contó el tutor (no observado): ${t.relatoTutor.replace(/\n/g,`; `)}.`:``,`Con otros perros: ${n(t.conPerros)}. Con personas: ${n(t.conPersonas)}. Lo alteran: ${n(t.estimulos)}. No juntar con: ${t.noJuntar||`Sin indicación`}.`,`Servicio: ${n(t.plan)}; días: ${Array.isArray(t.dias)&&t.dias.length?t.dias.join(`, `):b}; turno: ${n(t.turno)}.`].filter(Boolean).join(`
`)}function $c(e){let t=_s(e),n=dc.map(_s),r=/(lunes|martes|miercoles|jueves|viernes|sabado)\s+(?:a|al|hasta)\s+(?:el\s+)?(lunes|martes|miercoles|jueves|viernes|sabado)/.exec(t);if(r){let e=n.indexOf(r[1]),t=n.indexOf(r[2]);if(e>=0&&t>=e)return dc.slice(e,t+1)}return dc.filter((e,r)=>t.includes(n[r]))}function el(e){let t=e.datos||{},n=[`Pilar`,`La Lonja`].find(e=>_s(t.zona)===_s(e)),r=[t.energia?`Energía: ${t.energia}`:``,t.perros?`Se lleva bien con otros perros: ${t.perros}`:``,t.mordida?`Mordió o intentó morder: ${t.mordida}`:``,t.conducta?`Conducta: ${t.conducta}`:``,t.comentario?`Comentario: ${t.comentario}`:``].filter(Boolean).join(`
`);return{pedidoId:e.id,nombre:t.perro||``,tamano:[`Pequeño`,`Mediano`,`Grande`].includes(t.tamano)?t.tamano:b,raza:t.raza||``,edad:t.edad||``,tutor:t.responsable||``,contacto:t.telefono||``,zona:n||(t.zona?`Otra zona`:`Pendiente de confirmar`),referencia:[n?``:t.zona,t.referencia].filter(Boolean).join(` · `),relatoTutor:r,turno:[`Mañana`,`Tarde`].includes(t.horario)?t.horario:b,dias:$c(t.dias)}}function tl(e){if(e.perroNombre)return e.perroNombre;let t=(Array.isArray(e.perros)?e.perros:e.perroId?[e.perroId]:[]).map(e=>w.find(t=>t.id===e)?.name||e);return t.length?xs(t):``}function nl(e,t){return`${t.fecha||``} ${t.hora||``}`.localeCompare(`${e.fecha||``} ${e.hora||``}`)||Hs(e,t)}function rl(e,t){let n=tl(e),r=e.titulo||(t===`incidente`?`Incidente`:`Observación`),i=e.riesgo?String(e.riesgo):``,a=t===`incidente`?[[`Perro`,n],[`Lugar`,e.lugar],[`Antes`,e.antes],[`Conducta`,e.conducta],[`Acción`,e.accion],[`Después`,e.despues],[`Lesiones`,e.lesiones,e.lesiones&&!/^no/i.test(e.lesiones)?`alert`:``],[`Protocolo`,e.protocolo]]:[[`Perro`,n],[`Lugar`,e.lugar],[`Estímulo`,e.estimulo],[`Reacción`,e.reaccion],[`Acción`,e.accion],[`Resultado`,e.resultado]];return`
    <li class="coord-card coord-feed-item ${t===`incidente`?`is-incident`:``}">
      <div class="coord-card-head">
        <strong>${H(r)}</strong>
        <small>${H(fs(e.fecha))}${e.hora?` · ${H(e.hora)}`:``}</small>
      </div>
      ${i?`<p class="coord-badges">${K(`Riesgo: ${H(i)}`,/alto|grave/i.test(i)?`alert`:`warn`)}</p>`:``}
      ${Mc(a)}
      ${Qs(e)}
    </li>
  `}function il(){let e=js(`incidentes`).filter(e=>!e.fecha||e.fecha>=gs()).sort(nl),t=js(`observaciones`).filter(e=>!e.fecha||e.fecha>=gs()).sort(nl),n=e=>!Ms.has(e),r=`
    <p class="coord-note">${p(`eye`,`coord-icon`)}<span>Solo lectura. Las cargan los paseadores y supervisión. Se muestran los últimos 7 días (desde el ${H(fs(gs()))}).</span></p>
    <div class="coord-feed">
      <section class="coord-subblock" aria-labelledby="coord-feed-inc">
        <h3 id="coord-feed-inc">Incidentes <span>${e.length}</span></h3>
        ${e.length?`<ul class="coord-card-list">${e.map(e=>rl(e,`incidente`)).join(``)}</ul>`:`<p class="coord-empty is-small">${n(`incidentes`)?`Cargando…`:`Sin incidentes en los últimos 7 días.`}</p>`}
      </section>
      <section class="coord-subblock" aria-labelledby="coord-feed-obs">
        <h3 id="coord-feed-obs">Observaciones <span>${t.length}</span></h3>
        ${t.length?`<ul class="coord-card-list">${t.map(e=>rl(e,`observacion`)).join(``)}</ul>`:`<p class="coord-empty is-small">${n(`observaciones`)?`Cargando…`:`Sin observaciones en los últimos 7 días.`}</p>`}
      </section>
    </div>
  `;return Ac({key:`actividad`,id:`coord-actividad`,iconName:`activity`,title:`Observaciones e incidentes`,intro:`Lo que registró el equipo en la calle en los últimos 7 días.`,badges:`${e.length?K(`${e.length} ${e.length===1?`incidente`:`incidentes`}`,`alert`):``}${t.length?K(`${t.length} ${t.length===1?`observación`:`observaciones`}`,`neutral`):``}`,body:r})}function al(){let e=yc(),t=Wt(ds()),n=Math.max(...e.map(e=>e.total),1),r=e.filter(e=>e.total===n).map(e=>e.day),i=_c(),a=uc.filter(e=>dc.some(t=>fc.every(n=>Ht(e,t,n)))).map(e=>e.name),o=w.filter(e=>e.status!==`Activo`).map(e=>`${e.name} (${e.status.toLowerCase()})`),s=`
    ${i.length?`
      <div class="coord-alert-box" role="note">
        <h3>${p(`alertTriangle`,`coord-icon`)}Perros que no se pueden juntar y comparten turno</h3>
        <ul>${i.map(e=>`<li><b>${H(e.pair)}</b> · ${H(e.detail)}</li>`).join(``)}</ul>
        <p>Según ${H(x.officialSources.routes)}. Revisá que no vayan en el mismo grupo.</p>
      </div>`:``}
    <div class="coord-table-wrap">
      <table class="coord-table">
        <caption>Perros activos por día y turno (rutas del ${Mt}). Día con más carga: ${H(xs(r.map(e=>e.toLowerCase())))}, ${n} paseos.</caption>
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
      ${a.length?`<li>${H(xs(a))} ${a.length===1?`sale`:`salen`} en los dos turnos el mismo día y cuenta${a.length===1?``:`n`} en ambos.</li>`:``}
      ${o.length?`<li>No se cuentan: ${H(xs(o))}.</li>`:``}
    </ul>
  `;return Ac({key:`carga`,id:`coord-carga`,iconName:`chart`,title:`Carga por día y turno`,intro:`Calculada con las rutas reales. Incluye bozales y cruces a revisar.`,badges:i.length?K(`${i.length} ${i.length===1?`cruce`:`cruces`} a revisar`,`alert`):``,body:s})}function ol(){let e=qs(),t=Cc(`pago`),n=e.filter(e=>!e.pasadoAlLibro).length,r=[`Elegí un perro`,...uc.map(e=>e.name).sort((e,t)=>e.localeCompare(t,`es`)),`Otro (anotalo en la nota)`],i=`
    <div class="coord-rule is-info" role="note">
      ${p(`fileText`,`coord-icon`)}
      <p><b>Fuente oficial:</b> el ${H(x.officialSources.money)} y la hoja Cobranza semanal. Esto es solo un registro de apoyo para no olvidarte de pasar un pago. No anotes alias ni datos bancarios: el detalle de pago se envía por WhatsApp.</p>
    </div>
    ${kc(`pagos`)}
    <form class="coord-form" data-coord-form="pago" novalidate>
      <h3>Anotar un pago recibido</h3>
      <div class="coord-grid">
        ${W(`pago`,`perro`,`Perro`,r,{value:t.perro,required:!0})}
        ${U(`pago`,`monto`,`Monto recibido`,{value:t.monto,required:!0,attrs:`inputmode="numeric" autocomplete="off"`,hint:`El que figura en el comprobante. Solo números.`})}
        ${W(`pago`,`medio`,`Medio de pago`,[`Transferencia`,`Efectivo`,`Otro`],{value:t.medio})}
        ${U(`pago`,`fecha`,`Fecha del pago`,{value:t.fecha||hs(),placeholder:`DD/MM/AAAA`,attrs:`inputmode="numeric"`,hint:`Formato DD/MM/AAAA.`})}
        ${Oc(`pago`,`comprobante`,`Comprobante`,t.comprobante,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
        ${U(`pago`,`nota`,`Nota`,{value:t.nota,placeholder:`Opcional`})}
      </div>
      <div class="coord-actions">${G(`Guardar registro`,`data-coord-pago-save`,`primary`,`plus`)}</div>
    </form>

    <div class="coord-subblock">
      <h3>Pagos anotados <span>${e.length}</span></h3>
      ${e.length?`
        <ul class="coord-pay-list">
          ${e.map(e=>`
            <li class="coord-pay ${e.pasadoAlLibro?`is-done`:``}">
              <div class="coord-pay-main">
                <strong>${H(e.perroNombre||e.concepto||`Pendiente de confirmar`)}</strong>
                <span>${H(Number.isFinite(Number(e.monto))&&e.monto!==``?T(e.monto):b)} · ${H(e.medio||`Pendiente de confirmar`)} · ${H(fs(e.fecha))}</span>
                ${e.comprobante?`<small>Comprobante: ${H(e.comprobante)}</small>`:`<small>Sin comprobante</small>`}
                ${e.nota?`<small>${H(e.nota)}</small>`:``}
                ${Qs(e)}
              </div>
              ${e.pasadoAlLibro?K(`Pasado al Libro contable`,`ok`):K(`Falta pasar al Libro contable`,`warn`)}
              <div class="coord-actions">
                ${G(e.pasadoAlLibro?`Marcar como no pasado`:`Ya lo pasé al Libro`,`data-coord-pago-libro="${H(e.id)}"`,e.pasadoAlLibro?`ghost`:`secondary`,e.pasadoAlLibro?``:`checkCircle`)}
                ${Zs(e)?G(`Borrar`,`data-coord-pago-delete="${H(e.id)}"`,`ghost`):``}
              </div>
            </li>
          `).join(``)}
        </ul>
      `:`<p class="coord-empty is-small">${Ms.has(`pagos`)?`No hay pagos anotados.`:`Cargando pagos…`}</p>`}
    </div>
  `;return Ac({key:`pagos`,id:`coord-pagos`,iconName:`wallet`,title:`Pagos`,intro:`Registro de apoyo compartido con Juan. La fuente oficial es el Libro contable.`,badges:n?K(`${n} sin pasar al Libro`,`warn`):``,body:i})}function sl(e,t,n){Cs(e,!0),$(),Es(t,n)}function cl(e){try{(navigator.clipboard?.writeText(e))?.catch?.(()=>{})}catch{}}function ll(e,t){return e.find(e=>e.id===t)}function ul(e){if(!e.target.closest(`.coord-shell`))return!1;let t=e.target.closest(`[data-coord-toggle]`);if(t){let e=t.parentElement;return Cs(t.dataset.coordToggle,!e.open),!0}let n=e.target.closest(`[data-coord-mem-toggle]`);if(n){let e=n.dataset.coordMemToggle;return n.parentElement.open?ws.delete(e):ws.add(e),!0}if(e.target.closest(`[data-coord-retry]`))return zs(),rc=!1,cs(`Volviendo a pedir los datos.`),!0;let r=e.target.closest(`[data-coord-goto]`);if(r)return Es(r.dataset.coordGoto),!0;let i=e.target.closest(`[data-coord-goto-dog]`);if(i){let e=i.dataset.coordGotoDog;return bc().findIndex(t=>t.id===e)>=4&&(Cs(`datosMas`,!0),$()),Es(`coord-dato-${e}`),!0}let a=e.target.closest(`[data-coord-goto-pedido]`);if(a)return sl(`pedidos`,`coord-pedido-${a.dataset.coordGotoPedido}`),!0;let o=e.target.closest(`[data-coord-open]`);if(o){let e=o.dataset.coordOpen,t=e===`pedidos`&&!Gs().length?`#coord-pedido-tipo`:null;return sl(e,`coord-${e}`,t),!0}if(e.target.closest(`[data-coord-undo]`)){let e=is;if(is=null,e){let{pendiente:t,...n}=e.record;nc(`undo`,()=>ec(e.col,n,{section:e.section,ok:`Listo, se recuperó.`}))}return!0}let s=e.target.closest(`[data-coord-resolve]`);if(s){let e=s.dataset.coordResolve,t=w.find(t=>t.id===e);return nc(`resuelto-${e}`,async()=>{await ec(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!0,nota:``},{section:`datos`,ok:`${t?.name||e}: marcado como resuelto.`})&&Es(`coord-datos`)}),!0}let c=e.target.closest(`[data-coord-unresolve]`);if(c){let e=c.dataset.coordUnresolve,t=w.find(t=>t.id===e);return nc(`resuelto-${e}`,()=>ec(`resueltos`,{id:e,perroId:e,perroNombre:t?.name||e,resuelto:!1,nota:``},{section:`datos`,ok:`${t?.name||e}: volvió a pendientes.`})),!0}if(e.target.closest(`[data-coord-pedido-save]`)){let t=Ec(e.target.closest(`[data-coord-form]`));if(wc(`pedido`,t),!t.perro?.trim()&&!t.detalle?.trim())return as(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),Es(`coord-pedidos`,`#coord-pedido-perro`),!0;let n=t.tipo||Vc[0],r=t.perro?.trim()||``;return nc(`pedido-save`,async()=>{await ec(`pedidos`,{fecha:v(),tipo:n,estado:`nuevo`,origen:`app`,titulo:`${n}: ${r||`sin perro indicado`}`,detalle:t.detalle?.trim()||``,datos:{perro:r,canal:t.canal||Hc[0]}},{section:`pedidos`,ok:`Pedido guardado en "Nuevo".`})&&Tc(`pedido`)}),!0}let l=e.target.closest(`[data-coord-pedido-move]`);if(l){let e=l.dataset.coordPedidoMove,t=l.dataset.estado;return nc(`pedido-${e}`,()=>ec(`pedidos`,{id:e,estado:t},{section:`pedidos`,ok:`Pedido movido a "${Wc[t]}".`})),!0}let u=e.target.closest(`[data-coord-pedido-delete]`);if(u){let e=ll(Gs(),u.dataset.coordPedidoDelete);return e&&nc(`pedido-${e.id}`,()=>tc(`pedidos`,e,{section:`pedidos`,ok:`Pedido borrado.`})),!0}let d=e.target.closest(`[data-coord-pedido-ficha]`);if(d){let e=ll(Gs(),d.dataset.coordPedidoFicha);return e&&(xc.alta=el(e),as(`alta`,`Formulario completado con el pedido de ${Ys(e)||`la web`}. Revisalo y guardalo.`),sl(`alta`,`coord-alta`,`#coord-alta-nombre`)),!0}if(e.target.closest(`[data-coord-alta-save]`)){let t=Ec(e.target.closest(`[data-coord-form]`));if(wc(`alta`,t),!t.nombre?.trim())return as(`alta`,`Falta el nombre del perro.`,`error`),$(),Es(`coord-alta`,`#coord-alta-nombre`),!0;let n=t.nombre.trim(),r={...t,nombre:n,dias:Array.isArray(t.dias)?t.dias:[],primerPaseo:`Individual`};return nc(`alta-save`,async()=>{await ec(`fichas`,{fecha:v(),perroNombre:n,datos:r,categoria:`SIN EVALUAR`,estado:`lista`},{section:`alta`,ok:`Ficha de ${n} guardada. Arranca SIN EVALUAR y con primer paseo individual.`})&&(Tc(`alta`),Es(`coord-alta`))}),!0}if(e.target.closest(`[data-coord-alta-clear]`))return Tc(`alta`),as(`alta`,`Formulario vacío.`),$(),!0;let f=e.target.closest(`[data-coord-alta-copy]`);if(f){let e=ll(Ks(),f.dataset.coordAltaCopy);return e&&cl(Qc(e)),as(`alta`,`Ficha copiada. Pegala en el registro maestro.`),$(),!0}let ee=e.target.closest(`[data-coord-alta-delete]`);if(ee){let e=ll(Ks(),ee.dataset.coordAltaDelete);return e&&nc(`ficha-${e.id}`,()=>tc(`fichas`,e,{section:`alta`,ok:`Ficha borrada.`})),!0}if(e.target.closest(`[data-coord-pago-save]`)){let t=Ec(e.target.closest(`[data-coord-form]`));wc(`pago`,t);let n=String(t.monto||``).replace(/[^\d]/g,``),r=ms(t.fecha||hs()),i=!t.perro||t.perro===`Elegí un perro`?[`Elegí el perro.`,`#coord-pago-perro`]:n?r?null:[`La fecha no es válida. Usá DD/MM/AAAA.`,`#coord-pago-fecha`]:[`Falta el monto del comprobante.`,`#coord-pago-monto`];return i?(as(`pagos`,i[0],`error`),$(),Es(`coord-pagos`,i[1]),!0):(nc(`pago-save`,async()=>{await ec(`pagos`,{fecha:r,concepto:`Pago de ${t.perro}`,perroNombre:t.perro,monto:Number(n),medio:t.medio||`Transferencia`,comprobante:t.comprobante||``,nota:t.nota?.trim()||``,pasadoAlLibro:!1},{section:`pagos`,ok:`Pago de ${t.perro} anotado. Acordate de pasarlo al Libro contable.`})&&Tc(`pago`)}),!0)}let te=e.target.closest(`[data-coord-pago-libro]`);if(te){let e=ll(qs(),te.dataset.coordPagoLibro);if(!e)return!0;let t=!e.pasadoAlLibro;return nc(`pago-${e.id}`,()=>ec(`pagos`,{id:e.id,pasadoAlLibro:t},{section:`pagos`,ok:t?`Marcado como pasado al Libro contable.`:`Marcado como pendiente de pasar al Libro.`})),!0}let ne=e.target.closest(`[data-coord-pago-delete]`);if(ne){let e=ll(qs(),ne.dataset.coordPagoDelete);return e&&nc(`pago-${e.id}`,()=>tc(`pagos`,e,{section:`pagos`,ok:`Registro borrado.`})),!0}return!1}function dl(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;let n=t.closest(`[data-coord-file]`);if(n){let e=n.dataset.coordFile,t=n.files?.[0],r=n.closest(`[data-coord-form]`),i=r?Ec(r):Cc(e);t&&(i[n.dataset.coordFileField]=t.name),wc(e,i);let a=n.parentElement.querySelector(`[data-coord-file-name]`);return a&&t&&(a.textContent=t.name),!0}let r=t.closest(`[data-coord-form]`);return r?(wc(r.dataset.coordForm,Ec(r)),!0):!1}function fl(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`.coord-btn.is-primary`)?.click())}function pl(){be.push(ul),xe.push(dl),document.addEventListener(`submit`,fl)}var ml=`paseosJuanAdmin_prioridadesHechas`,hl=`paseosJuanAdmin_seccionesAbiertas`,gl=`America/Argentina/Buenos_Aires`,_l=[`Pequeño`,`Mediano`,`Grande`],vl=S.manana.label,yl=S.tarde.label,bl=[`paseos`,`incidentes`,`checklists`,`pedidos`],xl=``,q={users:null,usersLoading:!1,usersError:``,showCreate:!1,resetFor:null,confirmOff:null,credential:null,busy:!1,openDogs:new Set,liveDay:null,liveError:``,msgs:{users:null,live:null}},J={crear:{nombre:``,usuario:``,rol:`paseador`,pin:``},reset:{pin:``},roles:{}};function Y(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function X(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Z(e,t,n){return`${e} ${e===1?t:n}`}var Sl={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Cl(e){let t=C.filter(t=>e.includes(t)),n=t.map(e=>C.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${Sl[t[0]]} a ${Sl[t[t.length-1]]}`:t.map(e=>Sl[e]).join(`, `)}function wl(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:gl,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:C.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function Tl(){return ce(ml)}function El(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Dl(){return new Set(ce(hl))}function Ol(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:gl,hour:`2-digit`,minute:`2-digit`,hour12:!1}).format(t)}function kl(e){let t=new Date(e);return!e||Number.isNaN(t.getTime())?``:new Intl.DateTimeFormat(`es-AR`,{timeZone:gl,day:`2-digit`,month:`2-digit`,year:`numeric`}).format(t)}function Al(e){let[t,n,r]=String(e||``).split(`-`);return t&&n&&r?`${r}/${n}/${t}`:``}function jl(){return g.user()||{usuario:``,nombre:``,rol:`admin`}}function Ml(e){return String(e||``).trim().split(/\s+/)[0]||``}function Nl(){return/^\/(dashboard\/)?admin\/?$/.test(window.location.pathname)}function Pl(e,t){return e===`pedidos`?{}:{desde:t}}function Fl(e){let t=String(e.turno||``).toLowerCase();return t.startsWith(`ma`)?`manana`:t.startsWith(`ta`)?`tarde`:/_manana$/.test(e.id||``)?`manana`:/_tarde$/.test(e.id||``)?`tarde`:`otro`}function Il(e){return e.hora||Ol(e.creadoEn)}function Ll(){let e=v(),t=t=>(t.fecha||String(t.creadoEn||``).slice(0,10))===e,n=(e,t)=>String(t.actualizadoEn||t.creadoEn||``).localeCompare(String(e.actualizadoEn||e.creadoEn||``)),r=_.cached(`paseos`,Pl(`paseos`,e)).filter(t);return{hoy:e,paseos:r,incidentes:_.cached(`incidentes`,Pl(`incidentes`,e)).filter(t).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),checklists:_.cached(`checklists`,Pl(`checklists`,e)).filter(t).sort(n),pedidosNuevos:_.cached(`pedidos`,Pl(`pedidos`,e)).filter(e=>(e.estado||`nuevo`)===`nuevo`).sort((e,t)=>String(t.creadoEn||``).localeCompare(String(e.creadoEn||``))),shifts:[`manana`,`tarde`,`otro`].map(e=>{let t=r.filter(t=>Fl(t)===e),n=(...e)=>t.filter(t=>e.includes(t.estado||`pendiente`)).length;return{key:e,rows:t,total:t.length,noSale:n(`no-sale`),salen:t.length-n(`no-sale`),retirados:n(`retirado`,`paseando`,`entregado`),paseando:n(`paseando`),entregados:n(`entregado`),pendientes:n(`pendiente`)}})}}function Rl(){let e=v();q.liveDay!==e&&(q.liveDay=e,zl(!1).finally(()=>{bl.forEach(t=>_.watch(t,Pl(t,e)))}))}async function zl(e){let t=v(),n=await Promise.allSettled(bl.map(e=>_.list(e,Pl(e,t)))),r=[...new Set(n.filter(e=>e.status===`rejected`).map(e=>e.reason?.message||`No se pudieron traer los datos.`))],i=q.liveError;q.liveError=r.join(` `),q.liveError?Q(`live`,`No se pudieron actualizar los datos del día: ${q.liveError}`,!0):e?Q(`live`,navigator.onLine===!1?`Sin conexión: se muestra lo último que llegó.`:`Datos del día actualizados.`):i&&Q(`live`,`Datos del día actualizados.`),(e||i!==q.liveError)&&Zl()}var Bl={admin:`Admin`,coordinador:`Coordinador`,supervisor:`Supervisor`,paseador:`Paseador`,marketing:`Marketing`},Vl={admin:`Admin`,coordinador:`Coordinación`,supervisor:`Supervisor`,paseador:`Paseador`},Hl={admin:`ve y carga todo, y crea usuarios.`,coordinador:`ve paseos, incidentes, rutas y cierres; carga pedidos, fichas, observaciones y pagos de apoyo. No ve checklists.`,supervisor:`ve y carga paseos, checklists, incidentes, observaciones, rutas y cierres; ve fichas. No ve pedidos ni pagos.`,paseador:`ve y carga paseos, checklists, incidentes y observaciones; ve las rutas. No ve pedidos, fichas ni pagos.`,marketing:`ve y carga pedidos (incluye los del formulario web). Nada de la operación.`};function Ul(e){let t=(nt[e]||[]).filter(e=>Vl[e]).map(e=>Vl[e]);return`${t.length?`Paneles: ${X(t)}.`:`Todavía no tiene panel.`} Datos: ${Hl[e]||`Pendiente de confirmar`}`}function Wl(){return q.usersLoading=!0,it.list().then(e=>{q.users=e,q.usersError=``}).catch(e=>{q.usersError=e.message||`No se pudo traer la lista de usuarios.`,Q(`users`,q.usersError,!0)}).finally(()=>{q.usersLoading=!1,Zl()})}function Gl(e){return String(e||``).trim().toLowerCase().normalize(`NFD`).replace(/[̀-ͯ]/g,``)}function Kl(e){return/^\d{6,8}$/.test(e)?/^(\d)\1+$/.test(e)||`0123456789`.includes(e)||`9876543210`.includes(e)?`Ese PIN es muy fácil de adivinar. Elegí otro.`:``:`El PIN tiene que tener entre 6 y 8 números.`}function ql(){for(;;){let e=[...crypto.getRandomValues(new Uint8Array(6))].map(e=>String(e%10)).join(``);if(!Kl(e))return e}}function Jl(e){let t=`${window.location.origin}/login`;return e.tipo===`alta`?`Tu usuario de la app de Paseos Juan es ${e.usuario} y tu PIN inicial es ${e.pin}. Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`:`Tu PIN nuevo de la app de Paseos Juan es ${e.pin} (tu usuario es ${e.usuario}). Entrá en ${t} y cambialo desde 'Cambiar mi PIN'.`}function Q(e,t,n=!1){q.msgs[e]=t?{text:t,error:n,fresh:!0}:null}function Yl(e){let t=q.msgs[e];return`<p class="adm-msg ${t?.error?`is-error`:``}" role="status" aria-live="polite" data-adm-msg="${e}">${t&&!t.fresh?Y(t.text):``}</p>`}function Xl(){Object.entries(q.msgs).forEach(([e,t])=>{if(!t?.fresh)return;let n=document.querySelector(`[data-adm-msg="${e}"]`);n&&(n.textContent=t.text,t.fresh=!1)})}function Zl(){if(!Nl()||g.user()?.rol!==`admin`)return;let e=document.activeElement,t=e?.id,n=null;try{e&&typeof e.selectionStart==`number`&&(n=[e.selectionStart,e.selectionEnd])}catch{n=null}if($(),!t)return;let r=document.getElementById(t);if(r&&(r.focus({preventScroll:!0}),n))try{r.setSelectionRange(...n)}catch{}}function Ql(){return w.filter(e=>e.status===`Activo`&&e.days.length>0)}function $l(){let e=Ql(),t=C.map(t=>{let n=e.filter(e=>Ht(e,t,vl)).length,r=e.filter(e=>Ht(e,t,yl)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function eu(){let e=Ql(),t=new Map(w.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return w.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[vl,yl].forEach(e=>{let t=C.filter(t=>Ht(o,t,e)&&Ht(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function tu(){return Ql().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function nu(){return w.filter(e=>e.review||e.status!==`Activo`)}function ru(e){return e===vl?S.manana.route:S.tarde.routes.join(` o `)}function iu(e=Ll()){let{conflicts:t}=eu(),n=w.filter(e=>e.status!==`Activo`),r=nu(),i=tu().filter(e=>e.category===`SIN EVALUAR`),a=Ql(),o=a.filter(e=>e.category===`SIN EVALUAR`),s=[];if(e.incidentes.length){let t=e.incidentes.length,n=e.incidentes[0],r=[...new Set(e.incidentes.map(e=>e.perroNombre).filter(Boolean))],i=n.creadoPorNombre||`quien lo cargó`;s.push({id:`incidentes-${e.hoy}-${t}`,tag:`Incidente de hoy`,tone:`danger`,title:t===1?`Hubo un incidente hoy${r.length?` con ${r[0]}`:``}`:`Hubo ${t} incidentes hoy${r.length?` (${X(r)})`:``}`,detail:`${t>1?`El último lo cargó`:`Lo cargó`} ${i}${Il(n)?` a las ${Il(n)}`:``}. Riesgo: ${n.riesgo||`Pendiente de confirmar`}. Lesiones: ${n.lesiones||`Pendiente de confirmar`}.`,action:`Leé el incidente${r.length?` de ${X(r)}`:``} y hablá con ${i} antes de que termine el día.`,target:`adm-vivo`,targetLabel:t===1?`Ver el incidente`:`Ver los incidentes`})}if(t.length){let e=t.map(e=>e.a).concat(t.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(e).sort((t,n)=>e[n]-e[t])[0],r=[...new Set(t.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(t.map(e=>e.shift))],a=i.map(ru).join(` y `);s.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${X(r)}. Hay ${Z(t.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${X(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(e.pedidosNuevos.length){let t=e.pedidosNuevos.length,n=e=>e.titulo||e.tipo||`Pedido sin título`,r=e.pedidosNuevos.slice(0,3).map(n),i=n(e.pedidosNuevos[t-1]);s.push({id:`pedidos-${e.pedidosNuevos[0].id}-${t}`,tag:`Pedidos`,tone:`info`,title:`${Z(t,`pedido nuevo`,`pedidos nuevos`)} sin responder`,detail:`${X(r)}${t>3?` y ${Z(t-3,`más`,`más`)}`:``}. Llegan del formulario de la web o los carga el equipo.`,action:t===1?`Respondé el pedido “${i}”.`:`Respondé los ${t} pedidos nuevos, empezando por el más viejo: “${i}”.`,target:`adm-vivo`,targetLabel:t===1?`Ver el pedido`:`Ver los pedidos`})}if(r.length){let e=n.map(e=>e.name);s.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${Z(r.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:n.length?`Primero el estado de ${X(e)}: ${n.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:n.length?`Decidí el estado de ${X(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(o.length){let e=i.length?i:o.slice(0,5);s.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${o.length} de ${a.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${X(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${X(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return s.slice(0,3)}function au(){let e=Ql(),t=[],n=[];e.forEach(e=>{let r=Ft.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=Ft.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function ou(e){return`
    <div class="adm-shell">
      ${su()}
      ${e}
    </div>
  `}function su(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${p(`lock`,`adm-icon-sm`)} ${Y(jl().nombre)} · ${Y(Bl[jl().rol]||jl().rol)}</span>
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
  `}function cu(){Rl(),q.users===null&&!q.usersLoading&&!q.usersError&&Wl();let e=Ll(),t=iu(e),n=Tl(),r=Dl();return setTimeout(Xl,60),`
    <main class="adm-page" id="adm-main">
      ${lu(t,n,e)}
      ${_u(e)}
      ${Tu()}
      ${wu()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${p(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${p(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${Du(r)}
        ${Ou(r)}
        ${Au(r)}
        ${Nu(r)}
        ${Pu(r)}
        ${Fu(r)}
      </div>
      ${Iu()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function lu(e,t,n){let{dayName:r,date:i}=wl(),a=Ql(),o=a.filter(e=>Ht(e,r,vl)).length,s=a.filter(e=>Ht(e,r,yl)).length,c=e.find(e=>!t.includes(e.id)),l=o+s?`Según BASE RUTAS, hoy salen ${Z(o,`perro`,`perros`)} a la mañana y ${Z(s,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`,u=Ml(jl().nombre);return`
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${Y(r)} ${Y(i)}</p>
        <h1 id="adm-hero-title">Hola${u?`, ${Y(u)}`:``}</h1>
        <p class="adm-hero-sub">${l}</p>
        ${n.incidentes.length?`
          <p class="adm-hero-alert">${p(`alertTriangle`,`adm-icon-sm`)} ${Z(n.incidentes.length,`incidente cargado hoy`,`incidentes cargados hoy`)}. Está primero en tus prioridades.</p>
        `:``}
      </div>

      ${c?`
        <div class="adm-next" aria-labelledby="adm-next-title">
          <p class="adm-next-label" id="adm-next-title">${p(`arrowRight`,`adm-icon-sm`)} Próximo paso</p>
          <p class="adm-next-text">${Y(c.action)}</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-done="${c.id}">
              ${p(`checkCircle`,`adm-icon-sm`)} Listo, ya lo hice
            </button>
            <button class="adm-button adm-button--ghost" type="button" data-adm-goto="${c.target}">
              ${Y(c.targetLabel)}
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
                <h3>${Y(e.title)}</h3>
                <p>${Y(e.detail)}</p>
                <button class="adm-link-button" type="button" data-adm-done="${e.id}" aria-pressed="${r}">
                  ${r?`Desmarcar`:`Marcar como hecho`}
                </button>
              </div>
            </li>
          `}).join(``)}
      </ol>
      <p class="adm-note">Las marcas de “hecho” se guardan solo en este dispositivo.</p>
    </section>
  `}var uu={pendiente:{label:`Por retirar`,tone:`neutral`},retirado:{label:`Retirado`,tone:`info`},paseando:{label:`Paseando`,tone:`info`},entregado:{label:`Entregado`,tone:`ok`},"no-sale":{label:`No sale`,tone:`warning`}};function du(e){let{dayName:t}=wl();return Ql().filter(n=>Ht(n,t,e)).length}function fu(e){return q.users?.find(t=>t.usuario===e)?.nombre||e||``}function pu(e,t=!1){if(!t&&e.actualizadoPor&&e.actualizadoPor!==e.creadoPor){let t=Ol(e.actualizadoEn);return`Actualizado por ${fu(e.actualizadoPor)}${t?` a las ${t}`:``}`}let n=e.creadoPorNombre||fu(e.creadoPor),r=Ol(t?e.creadoEn:e.actualizadoEn||e.creadoEn);return n?`Cargado por ${n}${r?` a las ${r}`:``}`:r?`Cargado a las ${r}`:``}function mu(e){let t={manana:{title:`Turno mañana`,hours:`${S.manana.from} a ${S.manana.to}`,planned:du(vl)},tarde:{title:`Turno tarde`,hours:`${S.tarde.from} a ${S.tarde.to}`,planned:du(yl)},otro:{title:`Sin turno indicado`,hours:``,planned:null}}[e.key];if(e.key===`otro`&&!e.total)return``;let n=e.salen?e.entregados/e.salen:0,r=`perros-${e.key}`;return`
    <article class="adm-shift" aria-labelledby="adm-shift-${e.key}">
      <h3 id="adm-shift-${e.key}">${t.title}${t.hours?` <span class="adm-th-sub">${t.hours}</span>`:``}</h3>
      ${e.total?`
        <p class="adm-shift-big"><strong>${e.entregados}</strong> de ${Z(e.salen,`perro entregado`,`perros entregados`)}</p>
        <span class="adm-progress" aria-hidden="true"><span style="--v:${n.toFixed(3)}"></span></span>
        <ul class="adm-shift-stats">
          <li><strong>${e.retirados}</strong> retirados</li>
          <li><strong>${e.paseando}</strong> paseando</li>
          <li><strong>${e.pendientes}</strong> por retirar</li>
          ${e.noSale?`<li><strong>${e.noSale}</strong> no ${e.noSale===1?`sale`:`salen`}</li>`:``}
        </ul>
        <details class="adm-inner adm-dogs" data-adm-dogs="${r}" ${q.openDogs.has(r)?`open`:``}>
          <summary>Ver los ${e.total} perros</summary>
          <ul class="adm-dog-list">
            ${e.rows.slice().sort((e,t)=>String(e.perroNombre||``).localeCompare(String(t.perroNombre||``))).map(e=>{let t=uu[e.estado||`pendiente`]||{label:e.estado,tone:`neutral`};return`
                <li>
                  <span class="adm-dog-name">${Y(e.perroNombre||e.perroId||`Perro sin nombre`)}</span>
                  <span class="adm-pill adm-pill--${t.tone}">${Y(t.label)}${e.pendiente?` · sin enviar`:``}</span>
                  <span class="adm-dog-meta">${Y(pu(e))}${e.nota?` · Nota: ${Y(e.nota)}`:``}</span>
                </li>
              `}).join(``)}
          </ul>
        </details>
      `:`<p class="adm-empty">Todavía nadie cargó paseos de este turno.</p>`}
      ${t.planned===null?``:`<p class="adm-note">Previstos según BASE RUTAS: ${t.planned}.${e.total?` “Retirados” incluye a los que ya están paseando o entregados.`:``}</p>`}
    </article>
  `}function hu(e){let t=[[`perroNombre`,`Perro`],[`lugar`,`Lugar`],[`antes`,`Antes`],[`conducta`,`Qué pasó`],[`accion`,`Qué se hizo`],[`despues`,`Después`],[`lesiones`,`Lesiones`],[`protocolo`,`Protocolo`]];return`
    <div class="adm-incidents" role="region" aria-labelledby="adm-inc-title">
      <h3 id="adm-inc-title">${p(`alertTriangle`,`adm-icon-sm`)} ${Z(e.length,`incidente hoy`,`incidentes hoy`)}</h3>
      <ul class="adm-incident-list">
        ${e.map(e=>`
          <li class="adm-incident">
            <div class="adm-incident-head">
              <strong>${Y(e.titulo||e.perroNombre||`Incidente`)}</strong>
              ${Il(e)?`<span class="adm-muted">${Y(Il(e))} h</span>`:``}
              ${e.riesgo?`<span class="adm-pill adm-pill--danger">Riesgo: ${Y(e.riesgo)}</span>`:``}
            </div>
            <dl class="adm-incident-facts">
              ${t.filter(([t])=>e[t]&&!(t===`perroNombre`&&!e.titulo)).map(([t,n])=>`
                <div><dt>${n}</dt><dd>${Y(Array.isArray(e[t])?e[t].join(`, `):e[t])}</dd></div>
              `).join(``)}
            </dl>
            ${pu(e,!0)?`<p class="adm-note">${Y(pu(e,!0))}.</p>`:``}
          </li>
        `).join(``)}
      </ul>
    </div>
  `}function gu(e){let t=e.items&&typeof e.items==`object`?Object.values(e.items):[],n=t.filter(Boolean).length;return{complete:e.completo===!0||t.length>0&&n===t.length,text:t.length?`${n} de ${t.length} ítems`:``}}function _u(e){let t=navigator.onLine===!1,{checklists:n,pedidosNuevos:r}=e;return`
    <section class="adm-live" id="adm-vivo" tabindex="-1" aria-labelledby="adm-live-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${p(`radio`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-live-title">El día en vivo</h2>
          <p>Lo que carga el equipo hoy, ${Y(Al(e.hoy))}. Se actualiza solo cada minuto.</p>
        </div>
        <button class="adm-button adm-button--ghost adm-panel-action" type="button" data-adm-live-refresh>Actualizar ahora</button>
      </header>
      ${t?`<p class="adm-msg is-error">Sin conexión: ves lo último que llegó.</p>`:``}
      ${Yl(`live`)}

      ${e.incidentes.length?hu(e.incidentes):`
        <p class="adm-live-ok">${p(`checkCircle`,`adm-icon-sm`)} Sin incidentes cargados hoy.</p>
      `}

      <div class="adm-live-grid">
        ${e.shifts.map(mu).join(``)}

        <article class="adm-shift" aria-labelledby="adm-live-check">
          <h3 id="adm-live-check">Checklist antes de salir</h3>
          ${n.length?`
            <ul class="adm-mini-list">
              ${n.map(e=>{let t=gu(e);return`
                  <li>
                    <span><strong>${Y(e.creadoPorNombre||e.creadoPor||`Sin nombre`)}</strong> · ${Y(e.turno||`Turno sin indicar`)}</span>
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
                  <span><strong>${Y(e.titulo||e.tipo||`Pedido sin título`)}</strong></span>
                  <span class="adm-dog-meta">${Y(Al(e.fecha)||kl(e.creadoEn))} · ${e.origen===`web`?`Formulario web`:Y(e.creadoPorNombre||`Cargado en la app`)}</span>
                </li>
              `).join(``)}
            </ul>
            ${r.length>6?`<p class="adm-note">Y ${Z(r.length-6,`pedido más`,`pedidos más`)}.</p>`:``}
          `:`<p class="adm-empty">No hay pedidos nuevos.</p>`}
        </article>
      </div>
    </section>
  `}function vu(e){return Object.entries(Bl).map(([t,n])=>`<option value="${t}" ${t===e?`selected`:``}>${n}</option>`).join(``)}function yu(){let e=q.credential;if(!e)return``;let t=Jl(e);return`
    <div class="adm-cred" id="adm-cred" tabindex="-1" role="region" aria-labelledby="adm-cred-title">
      <p class="adm-tag adm-tag--warning">Solo se muestra ahora</p>
      <h3 id="adm-cred-title">${e.tipo===`alta`?`Usuario creado: ${Y(e.nombre)}`:`PIN nuevo de ${Y(e.nombre)}`}</h3>
      <p>Copiá este mensaje y mandáselo por WhatsApp:</p>
      <p class="adm-cred-text">${Y(t)}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="button" data-adm-cred-copy>${p(`copy`,`adm-icon-sm`)} Copiar mensaje</button>
        <a class="adm-button adm-button--ghost" href="https://wa.me/?text=${encodeURIComponent(t)}" target="_blank" rel="noopener noreferrer">${p(`message`,`adm-icon-sm`)} Abrir WhatsApp</a>
        <button class="adm-button adm-button--ghost" type="button" data-adm-cred-hide>Listo, ya lo mandé</button>
      </div>
      <p class="adm-note">Este PIN no queda guardado en la página: cuando tocás “Listo” desaparece. Si se pierde, resetealo.</p>
    </div>
  `}function bu(){let e=J.crear;return`
    <form class="adm-form" id="adm-create" data-adm-form="crear" novalidate aria-labelledby="adm-create-title">
      <h3 id="adm-create-title">Crear usuario</h3>
      <p class="adm-note">Equipo autorizado: ${Y(X(Nt.map(e=>e.name)))}. Si vas a sumar a otra persona, confirmalo antes.</p>
      <div class="adm-form-grid">
        <label class="adm-field" for="adm-crear-nombre">
          <span>Nombre</span>
          <input class="adm-input" id="adm-crear-nombre" name="nombre" autocomplete="off" maxlength="60" required placeholder="Ej. Sebastián" value="${Y(e.nombre)}" data-adm-draft="crear" data-adm-key="nombre" />
        </label>
        <label class="adm-field" for="adm-crear-usuario">
          <span>Usuario <small>para entrar, sin espacios</small></span>
          <input class="adm-input" id="adm-crear-usuario" name="usuario" autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="31" required placeholder="Ej. sebastian" value="${Y(e.usuario)}" data-adm-draft="crear" data-adm-key="usuario" />
        </label>
        <label class="adm-field" for="adm-crear-rol">
          <span>Rol</span>
          <select class="adm-input" id="adm-crear-rol" name="rol" data-adm-draft="crear" data-adm-key="rol">${vu(e.rol)}</select>
        </label>
        <div class="adm-field">
          <label for="adm-crear-pin"><span>PIN inicial <small>6 a 8 números</small></span></label>
          <div class="adm-pin-row">
            <input class="adm-input" id="adm-crear-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${Y(e.pin)}" data-adm-draft="crear" data-adm-key="pin" />
            <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="crear">Generar</button>
          </div>
        </div>
      </div>
      <p class="adm-role-hint" data-adm-role-hint aria-live="polite"><strong>${Y(Bl[e.rol]||e.rol)}:</strong> ${Y(Ul(e.rol))}</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${p(`userPlus`,`adm-icon-sm`)} Crear usuario</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-create-toggle>Cancelar</button>
      </div>
    </form>
  `}function xu(e){let t=!e.activo;return`
    <form class="adm-form adm-form--inline" data-adm-form="reset" data-adm-usuario="${Y(e.usuario)}" novalidate aria-labelledby="adm-reset-title">
      <p id="adm-reset-title"><strong>${t?`Reactivar`:`Resetear el PIN de`} ${Y(e.nombre)}.</strong> ${t?`Va a poder entrar de nuevo con este PIN.`:`Se cierra su sesión en todos lados y entra con el PIN nuevo.`}</p>
      <label for="adm-reset-pin"><span>PIN nuevo <small>6 a 8 números</small></span></label>
      <div class="adm-pin-row">
        <input class="adm-input" id="adm-reset-pin" name="pin" inputmode="numeric" pattern="[0-9]*" autocomplete="off" maxlength="8" required value="${Y(J.reset.pin)}" data-adm-draft="reset" data-adm-key="pin" />
        <button class="adm-button adm-button--ghost" type="button" data-adm-gen-pin="reset">Generar</button>
      </div>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--primary" type="submit">${t?`Reactivar`:`Guardar PIN nuevo`}</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-reset-cancel>Cancelar</button>
      </div>
    </form>
  `}function Su(e){return`
    <div class="adm-confirm" id="adm-confirm" tabindex="-1" role="group" aria-labelledby="adm-confirm-text">
      <p id="adm-confirm-text"><strong>¿Desactivar a ${Y(e.nombre)}?</strong> No va a poder entrar y se cierra su sesión. Lo que cargó queda guardado. Después lo podés reactivar con un PIN nuevo.</p>
      <div class="adm-form-actions">
        <button class="adm-button adm-button--danger" type="button" data-adm-off-confirm="${Y(e.usuario)}">Sí, desactivar</button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-off-cancel>Cancelar</button>
      </div>
    </div>
  `}function Cu(e,t){let n=e.usuario===t,r=J.roles[e.usuario]||e.rol,i=e.ultimoIngreso?`Último ingreso: ${kl(e.ultimoIngreso)} ${Ol(e.ultimoIngreso)}`:`Todavía no ingresó`,a=e.creadoEn?` · Creado el ${kl(e.creadoEn)}`:``,o=String(e.usuario).replace(/[^a-z0-9_-]/gi,`_`);return`
    <li class="adm-user-row ${e.activo?``:`is-off`}">
      <div class="adm-user-head">
        <strong>${Y(e.nombre)}</strong>
        <span class="adm-muted">usuario: ${Y(e.usuario)}</span>
        <span class="adm-pill adm-pill--neutral">${Y(Bl[e.rol]||e.rol)}</span>
        ${e.activo?``:`<span class="adm-pill adm-pill--warning">Desactivado</span>`}
        ${n?`<span class="adm-pill adm-pill--ok">Sos vos</span>`:``}
      </div>
      <p class="adm-user-meta">${Y(i)}${Y(a)}</p>
      ${n?`
        <p class="adm-note">Tu PIN lo cambiás en <a class="adm-inline-link" href="/login" data-link>Cambiar mi PIN</a>. No podés cambiar tu propio rol ni desactivarte.</p>
      `:e.activo?`
        <div class="adm-user-actions">
          <div class="adm-role-change">
            <label for="adm-rol-${o}">Rol</label>
            <select class="adm-input adm-input--sm" id="adm-rol-${o}" data-adm-draft="roles" data-adm-key="${Y(e.usuario)}">${vu(r)}</select>
            <button class="adm-button adm-button--ghost" type="button" data-adm-role-save="${Y(e.usuario)}">Cambiar rol</button>
          </div>
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${Y(e.usuario)}" aria-expanded="${q.resetFor===e.usuario}">Resetear PIN</button>
          <button class="adm-button adm-button--ghost adm-button--danger-ghost" type="button" data-adm-off="${Y(e.usuario)}">Desactivar</button>
        </div>
      `:`
        <div class="adm-user-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-reset="${Y(e.usuario)}" aria-expanded="${q.resetFor===e.usuario}">Reactivar con PIN nuevo</button>
        </div>
      `}
      ${!n&&q.resetFor===e.usuario?xu(e):``}
      ${!n&&q.confirmOff===e.usuario?Su(e):``}
    </li>
  `}function wu(){let e=jl().usuario,t=(q.users||[]).slice().sort((e,t)=>(t.activo===!0)-(e.activo===!0)||String(e.nombre).localeCompare(String(t.nombre))),n=t.filter(e=>e.activo).length,r;return r=q.users===null&&q.usersLoading?`<p class="adm-empty">Cargando usuarios…</p>`:q.users===null?`<p class="adm-empty">No se pudo traer la lista. Tocá “Actualizar lista”.</p>`:t.length?`<ul class="adm-user-list">${t.map(t=>Cu(t,e)).join(``)}</ul>`:`<p class="adm-empty">Todavía no hay usuarios.</p>`,`
    <section class="adm-users" id="adm-usuarios" tabindex="-1" aria-labelledby="adm-users-title">
      <header class="adm-panel-head">
        <span class="adm-panel-icon">${p(`users`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-users-title">Usuarios y accesos</h2>
          <p>${q.users?`${Z(n,`usuario activo`,`usuarios activos`)}. `:``}Quién entra a la app y qué puede ver. Los PIN guardados nunca se muestran.</p>
        </div>
      </header>

      ${yu()}

      <div class="adm-form-actions">
        <button class="adm-button ${q.showCreate?`adm-button--ghost`:`adm-button--primary`}" type="button" data-adm-create-toggle aria-expanded="${q.showCreate}" aria-controls="adm-create">
          ${p(q.showCreate?`x`:`userPlus`,`adm-icon-sm`)} ${q.showCreate?`Cerrar el formulario`:`Crear usuario`}
        </button>
        <button class="adm-button adm-button--ghost" type="button" data-adm-users-refresh>Actualizar lista</button>
      </div>
      ${q.showCreate?bu():``}
      ${Yl(`users`)}
      ${r}

      <h3 class="adm-subtitle">Qué puede ver cada rol</h3>
      <ul class="adm-role-help">
        ${Object.keys(Bl).map(e=>`<li><strong>${Bl[e]}:</strong> ${Y(Ul(e))}</li>`).join(``)}
      </ul>
    </section>
  `}function Tu(){let{conflicts:e,missing:t,notRouted:n}=eu(),r=tu();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${p(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${Mt}).</p>
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
                    ${Y(e.a)} y ${Y(e.b)}
                    ${[e.a,e.b].filter(e=>/día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(w.find(t=>t.name===e)?.review||``)).map(e=>`<span class="adm-row-note">Días de ${Y(e)}: dato a revisar</span>`).join(``)}
                  </th>
                  <td>${Y(e.shift)} · ${Y(ru(e.shift))}</td>
                  <td>${Y(Cl(e.days))}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      `:`<p class="adm-empty">No hay perros “no juntar” que compartan turno en BASE RUTAS.</p>`}

      <ul class="adm-safety-list" aria-label="Indicaciones de seguridad por perro">
        ${r.map(e=>`
          <li>
            <strong>${Y(e.name)}</strong>
            <span class="adm-safety-meta">${Y(e.shifts.join(` y `))} · ${Y(Cl(e.days))}</span>
            <span class="adm-safety-notes">${e.safety.map(e=>`<span class="adm-pill adm-pill--danger">${Y(e)}</span>`).join(``)}</span>
          </li>
        `).join(``)}
      </ul>

      ${t.length||n.length?`
        <ul class="adm-footnotes">
          ${t.map(e=>`<li>${Y(e.dog)} figura “no juntar con ${Y(e.other)}”, pero ${Y(e.other)} no está en el registro: ${b}.</li>`).join(``)}
          ${n.map(e=>`<li>${Y(e.dog)} y ${Y(e.other)} figuran “no juntar”. Hoy ${Y(e.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join(``)}
        </ul>
      `:``}
    </section>
  `}function Eu(e,t,{title:n,summary:r,iconName:i},a){return`
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
  `}function Du(e){let t=nu().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return Eu(`adm-datos`,e,{title:`Datos a revisar`,summary:`${Z(t.length,`perro`,`perros`)} · ${Z(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${Y(x.officialSources.dogs)}).</p>
    <ul class="adm-review-list">
      ${t.map(e=>`
        <li class="${e.status===`Activo`?``:`is-status`}">
          <div class="adm-review-head">
            <strong>${Y(e.name)}</strong>
            <span class="adm-muted">${Y(e.id)} · ${Y(e.plan)}</span>
            <span class="adm-pill ${e.status===`Activo`?`adm-pill--neutral`:`adm-pill--warning`}">${Y(e.status)}</span>
          </div>
          <p>${Y(e.review||`Pendiente de confirmar`)}</p>
        </li>
      `).join(``)}
    </ul>
  `)}function Ou(e){let t=$l();return Eu(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${Y(t.busiest.length?X(t.busiest):`Sin datos`)} (${Z(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${Mt}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
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
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${Sl[e.day]}</span>
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
      <li>“Total” suma las salidas del día. ${X(t.twoShifts.map(e=>e.name))} ${t.twoShifts.length===1?`sale`:`salen`} en los dos turnos, por eso cuentan dos veces.</li>
      <li>Mañana: ruta ${S.manana.route}, supervisa ${S.manana.supervisor}. Tarde: rutas ${S.tarde.routes.join(` y `)}, supervisa ${S.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${Y(Bt.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function ku(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function Au(e){let t=Ql(),n=$l(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${Mt}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${Mt}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...Bt,...i];return Eu(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${ku(e.kind)}">${Y(e.kind)}</span>
          <strong class="adm-fact-value">${Y(e.value)}</strong>
          <span class="adm-fact-label">${Y(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${Y(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner">
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(Rt).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${Y(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var ju={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},Mu=[{role:`Admin`,who:Pt.admin,can:[`Ve y decide sobre todo el sistema`,`Equipo, permisos, precios y reportes`]},{role:`Coordinador`,who:`${Pt.coordinador} (${b.toLowerCase()})`,can:[`Alta de perros`,`Editar datos del cliente`,`Responder el chat de clientes`,`Registrar pagos de apoyo`,`Revisar documentación`,`Derivar al supervisor`]},{role:`Supervisor`,who:Pt.supervisor,can:[`Armar rutas y asignar perros`,`Responder el chat de clientes`,`Gestionar ausencias`,`Controlar a los paseadores`,`Revisar alertas`]},{role:`Paseador`,who:Pt.paseador,can:[`Ver su ruta`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`,`Subir fotos`,`Leer el chat interno`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function Nu(e){return Eu(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${Z(Nt.length,`persona`,`personas`)} · ${Mu.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones. Los accesos a la app (usuario, rol y PIN) se manejan en <a class="adm-inline-link" href="#adm-usuarios" data-adm-goto="adm-usuarios">Usuarios y accesos</a>.</p>
    <ul class="adm-team">
      ${Nt.map(e=>{let t=ju[e.role];return`
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${Y(e.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${Y(e.label)}</span>
            </div>
            <p>${Y(e.tasks)}</p>
            <p class="adm-person-panel">Panel: ${t?`<a href="${t.path}" data-link>${t.panel}</a>`:`<span class="adm-pending">${b}</span>`}</p>
          </li>
        `}).join(``)}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${Mu.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${Y(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${Y(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function Pu(e){return Eu(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${Ft.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${_l.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${Ft.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${_l.map(t=>`<td>${T(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${_l.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${_l.map(e=>`<td>${T(It[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${_l.map(e=>`<td>${T(It[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Lt.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${b.toLowerCase()}.</p>
  `)}function Fu(e){let t=au();return Eu(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${p(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${Y(x.officialSources.money)}. Esta página no muestra montos reales.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${T(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${Z(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
      <div class="adm-table-wrap">
        <table class="adm-table adm-billing">
          <caption class="adm-sr-only">Cálculo de la facturación teórica por plan</caption>
          <thead><tr><th scope="col">Plan</th><th scope="col">Perros</th><th scope="col">Subtotal teórico</th></tr></thead>
          <tbody>
            ${t.byPlan.map(e=>`
              <tr><th scope="row">${e.plan.name}</th><td>${e.count}</td><td>${T(e.subtotal)}</td></tr>
            `).join(``)}
          </tbody>
          <tfoot><tr><th scope="row">Total teórico</th><td>${t.included.length}</td><td>${T(t.total)}</td></tr></tfoot>
        </table>
      </div>
      ${t.excluded.length?`
        <p class="adm-note">No incluye ${Z(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${b.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${Y(e)}: ${X(t.excluded.filter(t=>t.plan===e).map(e=>Y(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function Iu(){let e=x.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${Mt}.</strong> Perros: ${Y(e.dogs)}. Rutas: ${Y(e.routes)}. Plata: ${Y(e.money)}.</p>
      <p>Esta página no guarda datos de tutores, teléfonos, domicilios ni pagos.</p>
    </footer>
  `}function Lu(){let{dayName:e,date:t}=wl(),n=Ll(),r=iu(n),i=Tl(),a=r.find(e=>!i.includes(e.id)),o=$l(),s=(e,t)=>{let r=n.shifts.find(t=>t.key===e);return r.total?`${t}: ${r.entregados} de ${r.salen} entregados, ${r.retirados} retirados.`:`${t}: sin paseos cargados.`};return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...r.map((e,t)=>`${t+1}. ${e.title}${i.includes(e.id)?` (hecho)`:``}`),``,`Hoy en la app:`,s(`manana`,`Mañana`),s(`tarde`,`Tarde`),`Incidentes de hoy: ${n.incidentes.length}. Pedidos nuevos: ${n.pedidosNuevos.length}.`,``,`Carga semanal: ${o.weekTotal} salidas. Más carga: ${X(o.busiest)} (${o.maxTotal}).`,``,`PRÓXIMO PASO: ${a?a.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${Mt}.`].join(`
`)}async function Ru(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function zu(e){xl=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=xl)},60)}function Bu(){El(hl,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function Vu(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,Bu());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function Hu(e){return e.target.closest(`[data-admin-logout]`)?(q.credential=null,q.users=null,q.usersError=``,ed(`/salir`),!0):!1}function Uu(e){requestAnimationFrame(()=>document.querySelector(e)?.focus())}function Wu(e,t){q.busy=t,e?.querySelectorAll(`button`).forEach(e=>{e.disabled=t})}async function Gu(e){let t=e.target.closest?.(`[data-adm-form]`);if(!t||!t.closest(`.adm-shell`)||(e.preventDefault(),q.busy))return;let n=t.dataset.admForm;if(n===`crear`){let e=J.crear,n=e.nombre.trim(),r=Gl(e.usuario),i=e.pin.trim(),a=``;if(a=n.length<2?`Escribí el nombre.`:/^[a-z][a-z0-9._-]{2,30}$/.test(r)?q.users?.some(e=>e.usuario===r)?`Ya existe el usuario “${r}”. Si querés cambiarle el PIN, usá “Resetear PIN” en la lista.`:Bl[e.rol]?Kl(i):`Elegí un rol.`:`El usuario tiene que tener entre 3 y 31 letras o números, sin espacios, y empezar con una letra.`,a){Q(`users`,a,!0),Zl();return}Wu(t,!0);try{let t=await it.save({nombre:n,usuario:r,rol:e.rol,pin:i,crear:!0});q.credential={tipo:`alta`,usuario:t.usuario,nombre:t.nombre,pin:i},J.crear={nombre:``,usuario:``,rol:`paseador`,pin:``},q.showCreate=!1,Q(`users`,`Listo: se creó el usuario ${t.usuario}. Mandale el mensaje.`),q.busy=!1,await Wl(),Uu(`#adm-cred`)}catch(e){Q(`users`,e.message||`No se pudo crear el usuario.`,!0),q.busy=!1,Zl()}}else if(n===`reset`){let e=t.dataset.admUsuario,n=q.users?.find(t=>t.usuario===e),r=J.reset.pin.trim(),i=n?Kl(r):`No encontré ese usuario. Actualizá la lista.`;if(i){Q(`users`,i,!0),Zl();return}Wu(t,!0);try{let t=!n.activo;await it.save({usuario:e,pin:r,...t?{activo:!0}:{}}),q.credential={tipo:`reset`,usuario:e,nombre:n.nombre,pin:r},q.resetFor=null,J.reset.pin=``,Q(`users`,t?`Listo: ${n.nombre} quedó activo con un PIN nuevo.`:`Listo: ${n.nombre} tiene PIN nuevo y se cerró su sesión.`),q.busy=!1,await Wl(),Uu(`#adm-cred`)}catch(e){Q(`users`,e.message||`No se pudo cambiar el PIN.`,!0),q.busy=!1,Zl()}}}async function Ku(e,t,n){if(!q.busy){q.busy=!0;try{await e(),Q(`users`,t),q.busy=!1,await Wl()}catch(e){Q(`users`,e.message||n,!0),q.busy=!1,Zl()}}}function qu(e){if(e.target.closest(`[data-adm-create-toggle]`))return q.showCreate=!q.showCreate,q.resetFor=null,q.confirmOff=null,$(),Uu(q.showCreate?`#adm-crear-nombre`:`[data-adm-create-toggle]`),!0;if(e.target.closest(`[data-adm-users-refresh]`))return q.usersError=``,Wl().then(()=>{q.usersError||(Q(`users`,`Lista de usuarios actualizada.`),Zl())}),!0;let t=e.target.closest(`[data-adm-gen-pin]`);if(t){let e=t.dataset.admGenPin;J[e].pin=ql();let n=document.getElementById(e===`crear`?`adm-crear-pin`:`adm-reset-pin`);return n&&(n.value=J[e].pin),zu(`PIN generado: ${J[e].pin.split(``).join(` `)}.`),!0}let n=e.target.closest(`[data-adm-role-save]`);if(n){let e=n.dataset.admRoleSave,t=q.users?.find(t=>t.usuario===e);if(!t)return!0;let r=J.roles[e]||t.rol;return r===t.rol?(Q(`users`,`${t.nombre} ya tiene el rol ${Bl[r]}. Elegí otro en la lista y tocá “Cambiar rol”.`,!0),Zl(),!0):(Ku(async()=>{await it.save({usuario:e,rol:r}),delete J.roles[e]},`Listo: ${t.nombre} ahora tiene el rol ${Bl[r]}.`,`No se pudo cambiar el rol.`),!0)}let r=e.target.closest(`[data-adm-reset]`);if(r){let e=r.dataset.admReset;return q.resetFor=q.resetFor===e?null:e,q.confirmOff=null,J.reset.pin=``,$(),q.resetFor&&Uu(`#adm-reset-pin`),!0}if(e.target.closest(`[data-adm-reset-cancel]`)){let e=q.resetFor||``;return q.resetFor=null,J.reset.pin=``,$(),Uu(`[data-adm-reset="${CSS.escape(e)}"]`),!0}let i=e.target.closest(`[data-adm-off]`);if(i)return q.confirmOff=i.dataset.admOff,q.resetFor=null,$(),Uu(`#adm-confirm`),!0;if(e.target.closest(`[data-adm-off-cancel]`)){let e=q.confirmOff||``;return q.confirmOff=null,$(),Uu(`[data-adm-off="${CSS.escape(e)}"]`),zu(`Cancelado: no se desactivó a nadie.`),!0}let a=e.target.closest(`[data-adm-off-confirm]`);if(a){let e=a.dataset.admOffConfirm,t=q.users?.find(t=>t.usuario===e);return q.confirmOff=null,Ku(()=>it.deactivate(e),`Listo: ${t?.nombre||e} quedó desactivado y ya no puede entrar.`,`No se pudo desactivar.`),!0}return e.target.closest(`[data-adm-cred-copy]`)?(q.credential&&Ru(Jl(q.credential)).then(e=>{zu(e?`Mensaje copiado. Pegalo en WhatsApp.`:`No se pudo copiar. Seleccioná el texto y copialo a mano.`)}),!0):e.target.closest(`[data-adm-cred-hide]`)?(q.credential=null,$(),Uu(`#adm-usuarios`),zu(`Listo. El PIN ya no se muestra.`),!0):e.target.closest(`[data-adm-live-refresh]`)?(zl(!0),!0):!1}function Ju(e){let t=e.target.closest?.(`[data-adm-draft]`);if(!t)return;let n=t.dataset.admDraft,r=t.dataset.admKey;if(n===`roles`?J.roles[r]=t.value:J[n][r]=t.value,n===`crear`&&r===`rol`){let e=document.querySelector(`[data-adm-role-hint]`);e&&(e.innerHTML=`<strong>${Y(Bl[t.value]||t.value)}:</strong> ${Y(Ul(t.value))}`)}}function Yu(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=Tl(),r=n.includes(e);return El(ml,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),zu(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return e.preventDefault(),Vu(n.dataset.admGoto),!0;if(qu(e))return!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),Bu(),zu(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(Ru(Lu()).then(e=>{zu(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function Xu(e){if(e.target.matches?.(`[data-adm-section]`)&&Bu(),e.target.matches?.(`[data-adm-dogs]`)){let t=e.target.dataset.admDogs;e.target.open?q.openDogs.add(t):q.openDogs.delete(t)}}function Zu(){be.push(Hu),Se.push(Yu),document.addEventListener(`toggle`,Xu,!0),document.addEventListener(`submit`,Gu),document.addEventListener(`input`,Ju),document.addEventListener(`change`,Ju),et(e=>{bl.includes(e)&&Zl()}),window.addEventListener(`online`,()=>Zl()),window.addEventListener(`offline`,()=>Zl())}var Qu=document.querySelector(`#app`);function $u(e){return e.replace(/\/+$/,``)||`/`}function ed(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ee(),St(),jt(),ir(),Pi(),Qo(),pl(),Zu(),document.addEventListener(`click`,e=>{if(Ce(be,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),ed(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{Ce(xe,e)});function $(){let e=$u(window.location.pathname);if(e===`/`){Qu.innerHTML=pt(),nd();return}if(e===`/login`){Qu.innerHTML=Tt(),nd();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),g.clear(),Qu.innerHTML=Tt(),nd();return}if(e===`/registro`||e===`/register`){Qu.innerHTML=Dt(),nd();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(Qu.innerHTML=td(r),nd()):(Qu.innerHTML=ge(),nd())}function td(e){if(e===`cliente`)return rd(e);let t=g.user();return t?(nt[t.rol]||[]).includes(e)?rd(e):Ot(e):(window.history.replaceState({},``,`/login?volver=/${e}`),Tt())}function nd(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=_e()+ye(),document.body.classList.toggle(`menu-locked`,e.menuOpen),We(),Ue()}function rd(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:cu,coordinador:Fc,supervisor:To,paseador:ti,cliente:kn}[e]();return i?ei(o):a?Co(o):e===`coordinador`?Nc(o):e===`admin`?ou(o):le(`
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