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
  `):``}var be=[],xe=[],Se=[];function Ce(e,t){for(let n of e)if(n(t))return!0;return!1}function we(t){let n=t.target.closest(`[data-chat-select]`);if(n)return localStorage.setItem(`paseosJuanActiveChat`,n.dataset.chatSelect),$(),!0;let r=t.target.closest(`[data-chat-send-shared]`);if(r){let e=r.dataset.chatSendShared,t=document.querySelector(`[data-chat-input-shared="${e}"]`),n=t?.value?.trim();if(!n)return!0;let i=r.dataset.chatRole,a=r.dataset.chatSender;return ae(e,i,a,n)&&(t&&(t.value=``),localStorage.removeItem(`paseosJuanChatDraft`),$()),!0}let i=t.target.closest(`[data-chat-quick-shared]`);if(i){let e=i.dataset.chatQuickShared,t=i.dataset.chatRole,n=i.dataset.chatSender,r=i.dataset.chatConversation;return ae(r,t,n,e)&&$(),!0}return t.target.closest(`[data-menu-toggle]`)?(e.menuOpen=!e.menuOpen,$(),!0):t.target.closest(`[data-menu-close]`)?(e.menuOpen=!1,$(),!0):t.target.closest(`[data-chat-toggle]`)?(e.chatOpen=!e.chatOpen,$(),!0):t.target.closest(`[data-chat-close]`)?(e.chatOpen=!1,$(),!0):!1}function Te(e){let t=e.target.closest(`[data-modal-action]`);if(t){if(t.dataset.modalAction===`close`&&ee(),t.dataset.modalAction===`confirm-pay`){let e=u();e.alerts=[{id:`alert-`+Date.now(),dog:`Pago cliente`,type:`Pago por confirmar`,level:`Medio`,description:`Cliente subió comprobante.`},...e.alerts||[]],d(e),te(`Comprobante enviado. Estado: Pago por confirmar.`),ee()}return t.dataset.modalAction===`save-prices`&&(te(`Precios actualizados correctamente.`),ee()),!0}return e.target.closest(`[data-modal-backdrop]`)&&e.target===e.target.closest(`[data-modal-backdrop]`)?(ee(),!0):!1}function Ee(){be.push(we),Se.push(Te)}var De=`paseosJuan_accesibilidad`,Oe={theme:`auto`,motion:`auto`},ke=new Set,m=Ae(),h=!1;function Ae(){try{let e=JSON.parse(localStorage.getItem(De));return{...Oe,...e||{}}}catch{return{...Oe}}}function je(){try{localStorage.setItem(De,JSON.stringify(m))}catch{}}var Me=window.matchMedia(`(prefers-color-scheme: dark)`),Ne=window.matchMedia(`(prefers-reduced-motion: reduce)`);function Pe(){return m.theme===`oscuro`||m.theme!==`claro`&&Me.matches}function Fe(){return m.motion===`calmo`||m.motion!==`normal`&&Ne.matches}function Ie(e){return ke.add(e),()=>ke.delete(e)}function Le(){let e=document.documentElement;e.dataset.theme=Pe()?`dark`:`light`,e.dataset.motion=Fe()?`calm`:`normal`,e.style.colorScheme=Pe()?`dark`:`light`;let t=document.querySelector(`meta[name="theme-color"]`);t&&t.setAttribute(`content`,Pe()?`#0f1512`:`#f7f5ef`),ze(),ke.forEach(e=>e({dark:Pe(),calm:Fe()}))}function Re(e,t,n,r){let i=r===t;return`<button type="button" class="a11y-option ${i?`is-active`:``}" data-a11y-set="${e}:${t}" aria-pressed="${i}">${n}</button>`}function ze(){let e=document.getElementById(`a11y-root`);e||(e=document.createElement(`div`),e.id=`a11y-root`,document.body.appendChild(e)),e.innerHTML=`
    <button type="button" class="a11y-toggle" data-a11y-toggle aria-expanded="${h}" aria-controls="a11y-panel" aria-label="Opciones de accesibilidad: tema y movimiento">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"></path>
      </svg>
    </button>
    <section class="a11y-panel ${h?`is-open`:``}" id="a11y-panel" role="dialog" aria-label="Accesibilidad" ${h?``:`hidden`}>
      <header>
        <strong>Accesibilidad</strong>
        <button type="button" class="a11y-close" data-a11y-toggle aria-label="Cerrar">×</button>
      </header>
      <div class="a11y-group" role="group" aria-label="Tema">
        <span>Tema</span>
        <div class="a11y-options">
          ${Re(`theme`,`claro`,`Claro`,m.theme)}
          ${Re(`theme`,`oscuro`,`Oscuro`,m.theme)}
          ${Re(`theme`,`auto`,`Automático`,m.theme)}
        </div>
      </div>
      <div class="a11y-group" role="group" aria-label="Movimiento">
        <span>Movimiento</span>
        <div class="a11y-options">
          ${Re(`motion`,`normal`,`Normal`,m.motion)}
          ${Re(`motion`,`calmo`,`Calmo`,m.motion)}
          ${Re(`motion`,`auto`,`Automático`,m.motion)}
        </div>
        <small>El modo calmo apaga animaciones y el fondo en movimiento. Recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</small>
      </div>
    </section>
  `}function Be(){if(!document.querySelector(`meta[name="theme-color"]`)){let e=document.createElement(`meta`);e.name=`theme-color`,document.head.appendChild(e)}document.addEventListener(`click`,e=>{if(e.target.closest(`[data-a11y-toggle]`)){h=!h,ze(),h?document.querySelector(`#a11y-panel .a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.focus();return}let t=e.target.closest(`[data-a11y-set]`);if(t){let[e,n]=t.dataset.a11ySet.split(`:`);m={...m,[e]:n},je(),Le(),document.querySelector(`[data-a11y-set="${e}:${n}"]`)?.focus()}else h&&!e.target.closest(`#a11y-root`)&&(h=!1,ze())}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&h&&(h=!1,ze(),document.querySelector(`.a11y-toggle`)?.focus())}),Me.addEventListener?.(`change`,Le),Ne.addEventListener?.(`change`,Le),Le()}var Ve={frame:null,lastDraw:0,blobs:[{x:.84,r:.26,speed:.021,phase:0,sway:.05},{x:.66,r:.19,speed:.027,phase:2.1,sway:.07},{x:.94,r:.16,speed:.033,phase:4,sway:.04},{x:.18,r:.2,speed:.024,phase:1.2,sway:.06},{x:.04,r:.15,speed:.03,phase:3.3,sway:.05},{x:.42,r:.13,speed:.036,phase:5.2,sway:.08},{x:.56,r:.22,speed:.018,phase:.7,sway:.04}]};function He(){Ve.frame&&cancelAnimationFrame(Ve.frame),Ve.frame=null;let e=document.querySelector(`[data-lava]`);if(!e)return;let t=e.getContext(`2d`);if(!t)return;let n=Fe(),r=Pe()?[22,52,39]:[184,218,198],i=Pe()?[34,92,66]:[132,186,157],a;function o(){let n=Math.max(40,Math.ceil(window.innerWidth/4)),r=Math.max(40,Math.ceil(window.innerHeight/4));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,a=t.createImageData(n,r)),a||=t.createImageData(n,r)}function s(n){o();let{width:s,height:c}=e,l=Math.min(s,c),u=Ve.blobs.map(e=>{let t=Math.sin(n*e.speed*Math.PI*2+e.phase),r=1+.14*Math.sin(n*e.speed*5+e.phase*1.7),i=e.r*l*r;return{x:(e.x+e.sway*Math.sin(n*e.speed*3.1+e.phase))*s,y:(.5-.62*t)*c,rr:i*i}}),d=a.data,f=0;for(let e=0;e<c;e+=1)for(let t=0;t<s;t+=1){let n=0;for(let r of u){let i=t-r.x,a=e-r.y;n+=r.rr/(i*i+a*a+1)}let a=Math.min(1,Math.max(0,(n-.95)/.09)),o=Math.min(1,Math.max(0,(n-1.05)/1.6));d[f]=r[0]+(i[0]-r[0])*o,d[f+1]=r[1]+(i[1]-r[1])*o,d[f+2]=r[2]+(i[2]-r[2])*o,d[f+3]=a*255,f+=4}t.putImageData(a,0,0)}let c=performance.now()/1e3;if(n){s(c);return}function l(e){e-Ve.lastDraw>33&&(Ve.lastDraw=e,s(e/1e3)),Ve.frame=requestAnimationFrame(l)}Ve.frame=requestAnimationFrame(l)}function Ue(){e.revealObserver?.disconnect(),e.revealObserver=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`is-visible`),e.revealObserver.unobserve(t.target))})},{threshold:0,rootMargin:`0px 0px -8% 0px`}),document.querySelectorAll(`.reveal`).forEach(t=>e.revealObserver.observe(t))}var We=`pj_sesion`,Ge=`pj_pendientes`,Ke=`pj_cache_`,qe=new Set;function Je(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ye(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Xe(e){qe.forEach(t=>{try{t(e)}catch(e){console.error(e)}})}function Ze(e){return qe.add(e),()=>qe.delete(e)}var Qe=class extends Error{constructor(e,t){super(t),this.status=e}};async function $e(e,{method:t=`GET`,body:n,auth:r=!0}={}){let i={"Content-Type":`application/json`},a=g.token();r&&a&&(i.Authorization=`Bearer ${a}`);let o;try{o=await fetch(e,{method:t,headers:i,body:n?JSON.stringify(n):void 0})}catch{throw new Qe(0,`Sin conexión. Revisá la señal.`)}let s={};try{s=await o.json()}catch{s={ok:!1,error:`El servidor no respondió bien.`}}if(o.status===401&&r&&a&&(g.clear(),Xe(`sesion`)),!o.ok||s.ok===!1)throw new Qe(o.status,s.error||`Error del servidor.`);return s}var g={token:()=>Je(We,null)?.token||null,user:()=>Je(We,null)?.user||null,set(e,t){Ye(We,{token:e,user:t}),Xe(`sesion`)},clear(){try{localStorage.removeItem(We),Object.keys(localStorage).filter(e=>e.startsWith(Ke)).forEach(e=>localStorage.removeItem(e))}catch{}},async status(){return $e(`/api/auth/me`,{auth:!1})},async login(e,t){let n=await $e(`/api/auth/login`,{method:`POST`,body:{usuario:e,pin:t},auth:!1});return g.set(n.token,n.user),n.user},async setup({nombre:e,usuario:t,pin:n,codigo:r}){let i=await $e(`/api/auth/setup`,{method:`POST`,body:{nombre:e,usuario:t,pin:n,codigo:r},auth:!1});return g.set(i.token,i.user),i.user},async refresh(){let e=g.token();if(!e)return null;let t=await $e(`/api/auth/me`);return t.user&&g.token()===e&&g.set(e,t.user),t.user},async changePin(e,t){let n=await $e(`/api/auth/pin`,{method:`POST`,body:{actual:e,nuevo:t}});return g.set(n.token,n.user),n.user},logout(){g.clear(),Xe(`sesion`)}},et={admin:[`admin`,`coordinador`,`supervisor`,`paseador`,`cliente`],coordinador:[`coordinador`,`cliente`],supervisor:[`supervisor`,`paseador`,`cliente`],paseador:[`paseador`],marketing:[]};function tt(e){return{admin:`/admin`,coordinador:`/coordinador`,supervisor:`/supervisor`,paseador:`/paseador`}[e]||`/`}function nt(e,t){Object.keys(localStorage).filter(t=>t.startsWith(`${Ke}${e}_`)).forEach(e=>{let n=Je(e,[]),r=n.findIndex(e=>e.id===t.id);r>=0?n[r]=t:n.unshift(t),Ye(e,n)})}async function rt(){let e=Je(Ge,[]);if(!e.length||!g.token())return 0;let t=[];for(let n of e)try{if(n.op===`save`){let e=await $e(`/api/registros`,{method:`POST`,body:{col:n.col,...n.data}});nt(n.col,e.registro),Xe(n.col)}}catch(e){e.status===0&&t.push(n)}return Ye(Ge,t),e.length-t.length}window.addEventListener(`online`,()=>rt()),setInterval(()=>rt(),3e4);async function it(e){return $e(`/api/publico/evaluacion`,{method:`POST`,body:e,auth:!1})}function at(e=new Date){return e<=new Date(`${r.until}T23:59:59-03:00`)}function ot(){return le(`
    <canvas class="lava-lamp" data-lava aria-hidden="true"></canvas>
    <main class="landing-main">
      ${st()}
      ${ct()}
      ${lt()}
      ${pt()}
      <a class="whatsapp" href="${oe(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function st(){return`
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
  `}function ct(){return`
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

    ${ut()}

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
  `}function lt(){return`
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
  `}function ut(){return`
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

        ${dt()}
      </div>
    </section>
  `}function dt(){return at()?`
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
  `}function ft(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`)].filter(e=>e!==null).join(`
`)}function pt(){return`
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
  `}function mt(e){let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`);let i=new FormData(t);window.open(oe(ft(i)),`_blank`,`noopener`),n.textContent=`Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,it(Object.fromEntries(i)).then(()=>{n.textContent=`Listo: recibimos tu pedido y se abrió WhatsApp con tus respuestas. Solo falta tocar Enviar.`}).catch(()=>{n.textContent=`Se abrió WhatsApp con tus respuestas: tocá Enviar para que nos llegue.`})}function ht(){document.addEventListener(`submit`,mt)}var gt=e=>String(e??``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),_={necesitaConfiguracion:null,cargando:!1,mensaje:``,error:!1};function _t(){let e=new URLSearchParams(window.location.search).get(`volver`);return e&&/^\/[a-z]+$/.test(e)?e:null}function vt(){let e=g.user();if(e)return yt(e);_.necesitaConfiguracion===null&&!_.cargando&&(_.cargando=!0,g.status().then(e=>{_.necesitaConfiguracion=!!e.necesitaConfiguracion}).catch(e=>{_={..._,necesitaConfiguracion:!1,mensaje:e.message,error:!0}}).finally(()=>{_.cargando=!1,$()}));let t=_.necesitaConfiguracion===!0;return le(`
    <main class="acc-layout">
      <section class="acc-card" aria-labelledby="acc-titulo">
        <p class="acc-eyebrow">${t?`Primera vez`:`Equipo de Paseos Juan`}</p>
        <h1 id="acc-titulo">${t?`Creá el usuario administrador`:`Ingresar`}</h1>
        <p class="acc-lead">${t?`Todavía no hay usuarios. El primero que se crea es el administrador (Juan). Después, desde el panel del admin, se crean los usuarios del equipo.`:`Entrá con tu usuario y tu PIN. Si no tenés usuario, pedíselo a Juan.`}</p>
        ${_.necesitaConfiguracion===null?`<p class="acc-status" role="status">Conectando…</p>`:`
        <form class="acc-form" data-acc-form="${t?`setup`:`login`}" novalidate>
          ${t?`<label>Tu nombre <input name="nombre" autocomplete="name" required value="Juan Buitrago" /></label>`:``}
          <label>Usuario <input name="usuario" autocomplete="username" autocapitalize="none" spellcheck="false" required placeholder="Ej. juan" ${t?`value="juan"`:``} /></label>
          <label>PIN <input name="pin" type="password" inputmode="numeric" autocomplete="${t?`new-password`:`current-password`}" pattern="[0-9]*" minlength="6" maxlength="8" required placeholder="6 a 8 números" /></label>
          ${t?`<label>Repetí el PIN <input name="pin2" type="password" inputmode="numeric" autocomplete="new-password" minlength="6" maxlength="8" required /></label>
          <p class="acc-help">Elegí 6 a 8 números que no sean fáciles de adivinar (nada de 123456 ni tu fecha de nacimiento).</p>`:``}
          <button class="acc-button" type="submit">${t?`Crear y entrar`:`Entrar`}</button>
        </form>`}
        <p class="acc-status ${_.error?`is-error`:``}" data-acc-status role="status" aria-live="polite">${gt(_.mensaje)}</p>
        <p class="acc-foot"><a href="/" data-link>Volver a la página de Paseos Juan</a></p>
      </section>
    </main>
  `)}function yt(e){return le(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sesión abierta</p>
        <h1>Hola, ${gt(e.nombre.split(` `)[0])}</h1>
        <p class="acc-lead">Ya ingresaste como <strong>${gt(e.usuario)}</strong> (${gt(e.rol)}).</p>
        <div class="acc-actions">
          ${tt(e.rol)===`/`?``:`<a class="acc-button" href="${tt(e.rol)}" data-link>Ir a mi panel</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cerrar sesión</a>
        </div>
        <details class="acc-pin">
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
  `)}function bt(){return le(`
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
  `)}function xt(e){let t=g.user(),n=et[t?.rol]||[];return le(`
    <main class="acc-layout">
      <section class="acc-card">
        <p class="acc-eyebrow">Sin acceso</p>
        <h1>Esta página no es para tu usuario</h1>
        <p class="acc-lead">Ingresaste como <strong>${gt(t?.nombre)}</strong> (${gt(t?.rol)}) y la página de ${gt(e)} es de otro rol.${t?.rol===`marketing`?` Tu panel todavía está en preparación.`:``}</p>
        <div class="acc-actions">
          ${n[0]?`<a class="acc-button" href="/${n[0]}" data-link>Ir a mi panel</a>`:`<a class="acc-button" href="/" data-link>Ir al inicio</a>`}
          <a class="acc-button is-secondary" href="/salir" data-link>Cambiar de usuario</a>
        </div>
      </section>
    </main>
  `)}function St(e,t,n=!1){let r=e.closest(`.acc-card`)?.querySelector(`[data-acc-status]`);r&&(r.textContent=t,r.classList.toggle(`is-error`,n))}async function Ct(e){let t=e.target.closest(`[data-acc-form]`);if(!t)return;e.preventDefault();let n=t.dataset.accForm,r=Object.fromEntries(new FormData(t)),i=t.querySelector(`button[type=submit]`);if(n===`setup`&&r.pin!==r.pin2)return St(t,`Los dos PIN no coinciden.`,!0);if(n===`pin`&&r.nuevo!==r.nuevo2)return St(t,`Los dos PIN nuevos no coinciden.`,!0);if(n!==`pin`&&(!r.usuario||!r.pin))return St(t,`Completá usuario y PIN.`,!0);i.disabled=!0,St(t,n===`pin`?`Guardando…`:`Entrando…`);try{if(n===`pin`){await g.changePin(r.actual,r.nuevo),t.reset(),St(t,`Listo: tu PIN quedó cambiado.`);return}let e=n===`setup`?await g.setup({nombre:r.nombre,usuario:r.usuario,pin:r.pin}):await g.login(r.usuario,r.pin);_={necesitaConfiguracion:!1,cargando:!1,mensaje:``,error:!1};let i=_t();gs(i&&(et[e.rol]||[]).includes(i.slice(1))?i:tt(e.rol))}catch(e){St(t,e instanceof Qe?e.message:`No se pudo ingresar. Probá de nuevo.`,!0)}finally{i.disabled=!1}}function wt(){document.addEventListener(`submit`,Ct)}var v=`Pendiente de confirmar`,y=`12/11/2026`,b={name:`Paseos Juan`,zone:`Pilar y La Lonja`,claim:`Cuidado y confianza como en casa`,whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,officialSources:{money:`Libro contable del Sistema de Gestión (Google Sheets)`,dogs:`Registro maestro de perros`,routes:`Planilla RPJ, hoja BASE RUTAS`}},Tt=[{id:`juan`,name:`Juan Buitrago`,role:`admin`,label:`Fundador`,tasks:`Dirección, decisiones finales, operación, capacitación y protocolo de seguridad. Supervisa el turno mañana.`},{id:`sebastian`,name:`Sebastián`,role:`paseador`,label:`Paseador`,tasks:`Operación en la calle, seguridad durante los paseos, registro de conductas e incidentes.`},{id:`mateo`,name:`Mateo Pérez`,role:`marketing`,label:`Marketing (propuesto)`,tasks:`Comunicación, redes, captación y reactivación de clientes.`},{id:`nicolas`,name:`Nicolás`,role:`supervisor`,label:`Supervisor`,tasks:`Supervisa el turno tarde.`}],Et={admin:`Juan Buitrago`,coordinador:`Juan Buitrago`,supervisor:`Juan (mañana) y Nicolás (tarde)`,paseador:`Sebastián`,cliente:`Tutor de ejemplo`},x={manana:{label:`Mañana`,from:`09:00`,to:`12:15`,route:`PJ_1M`,supervisor:`Juan`},tarde:{label:`Tarde`,from:`14:45`,to:`17:05`,routes:[`PJ_1T`,`PJ_2T`],supervisor:`Nicolás`}},S=[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`,`Domingo`],C=[{id:`plan1`,name:`Plan 1`,walks:3,prices:{Pequeño:24e3,Mediano:27e3,Grande:3e4}},{id:`plan2`,name:`Plan 2`,walks:5,prices:{Pequeño:35e3,Mediano:37500,Grande:4e4}},{id:`plan3`,name:`Plan 3`,walks:6,prices:{Pequeño:39e3,Mediano:42e3,Grande:45e3}}],Dt={Pequeño:{individual:1e4,grupo:8e3},Mediano:{individual:12e3,grupo:1e4},Grande:{individual:14e3,grupo:12e3}},Ot=[{dogs:2,discount:`10%`},{dogs:3,discount:`20%`},{dogs:4,discount:`30%`}],kt={VERDE:`Puede participar en un paseo grupal habitual.`,AMARILLO:`Necesita atención especial, adaptación o selección cuidadosa del grupo.`,ROJO:`Paseo individual, medidas especiales o evaluación profesional antes de un grupo.`,"SIN EVALUAR":`Todavía no hay información suficiente para asignar una categoría.`},w=[{id:`PJ-001`,name:`Pistacho`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`,`No juntar con Lokaku, Sam, Rocky, Candombe ni Cashi`],incompatibleWith:[`Lokaku`,`Sam`,`Rocky`,`Candombe`,`Cashi`],status:`Activo`},{id:`PJ-002`,name:`Kiara`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Cashi (misma familia)`],status:`Activo`},{id:`PJ-003`,name:`Cashi`,size:`Pequeño`,plan:`Plan 2`,days:[`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal`],status:`Activo`,review:`Plan 2 son 5 paseos y en rutas figura 4 días.`},{id:`PJ-004`,name:`Zeus`,size:`Grande`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-005`,name:`Flora`,size:`Pequeño`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Miércoles:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-006`,name:`Wendy`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Sonia (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-007`,name:`Sonia`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Wendy (misma familia)`],status:`Activo`,review:`Plan 3 son 6 paseos y en rutas figura 5 días.`},{id:`PJ-008`,name:`Duque`,size:`Mediano`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Sale con Tayler (misma familia)`],status:`Activo`},{id:`PJ-009`,name:`Tayler`,size:`Grande`,plan:`Plan 3 + individual`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`],Martes:[`Mañana`],Miércoles:[`Mañana`],Jueves:[`Mañana`],Viernes:[`Mañana`],Sábado:[`Tarde`]},minutes:45,safety:[`Sale con Duque (misma familia)`],status:`Activo`,review:`En la tabla de precios figura como Taylor.`},{id:`PJ-010`,name:`Rambo`,size:`Pequeño`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Mañana`,`Tarde`],Martes:[`Mañana`,`Tarde`],Miércoles:[`Mañana`,`Tarde`],Jueves:[`Mañana`,`Tarde`],Viernes:[`Mañana`,`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`Sale dos veces por día y la planilla pide revisar la duración.`},{id:`PJ-011`,name:`Morris`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-012`,name:`Lokaku`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`],schedule:{Lunes:[`Mañana`],Miércoles:[`Mañana`],Viernes:[`Mañana`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Juan)`,`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`En la tabla de precios figura como Lukaku.`},{id:`PJ-013`,name:`Runa`,size:`Pequeño`,plan:`Sin plan (1 paseo)`,days:[`Viernes`],shifts:[`Mañana`],schedule:{Viernes:[`Mañana`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-014`,name:`Manolo`,size:`Grande`,plan:`Plan 6 + 1`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-015`,name:`Caipi`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-016`,name:`Frida`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Natividad (misma familia)`],status:`Activo`},{id:`PJ-017`,name:`Natividad`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[`Sale con Frida (misma familia)`],status:`Activo`},{id:`PJ-018`,name:`Annie`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`En la tabla de precios figura como Any.`},{id:`PJ-019`,name:`Sam`,size:`Mediano`,plan:`Plan 3`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`,`Sábado`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`],Sábado:[`Mañana`]},minutes:45,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Activo`,review:`La planilla marca lunes, miércoles, jueves y viernes como no contratados. El sábado sale a las 9:15, cuando Pistacho no sale.`},{id:`PJ-020`,name:`Otto`,size:`Mediano`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-021`,name:`Ron`,size:`Grande`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-022`,name:`Forest`,size:`Grande`,plan:`Plan 1`,days:[`Martes`,`Jueves`,`Sábado`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Jueves:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[`Usa bozal (responsable del bozal: Sebastián)`],status:`Activo`},{id:`PJ-023`,name:`Paco`,size:`Pequeño`,plan:`Plan 1`,days:[`Lunes`,`Miércoles`,`Viernes`],shifts:[`Mañana`,`Tarde`],schedule:{Lunes:[`Tarde`],Miércoles:[`Mañana`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`},{id:`PJ-024`,name:`Milo`,size:`Grande`,plan:`Plan 1`,days:[`Miércoles`,`Sábado`],shifts:[`Tarde`],schedule:{Miércoles:[`Tarde`],Sábado:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Plan 1 son 3 paseos y en rutas figura 2 días.`},{id:`PJ-025`,name:`Séptima`,size:`Pequeño`,plan:`Plan 1`,days:[`Martes`,`Miércoles`,`Viernes`],shifts:[`Tarde`],schedule:{Martes:[`Tarde`],Miércoles:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Activo`,review:`Nombre a confirmar: figura como Séptima, Septimo y Sep. Sin días contratados cargados.`},{id:`PJ-026`,name:`Jack`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Lunes`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Viernes:[`Tarde`]},minutes:20,safety:[],status:`Activo`,review:`La planilla pide revisar la duración.`},{id:`PJ-027`,name:`Roma`,size:`Pequeño`,plan:`Sin plan (2 paseos)`,days:[`Sábado`],shifts:[`Tarde`],schedule:{Sábado:[`Tarde`]},minutes:55,safety:[],status:`Activo`},{id:`PJ-028`,name:`Coqui`,size:`Mediano`,plan:`Plan 2`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`],shifts:[`Tarde`],schedule:{Lunes:[`Tarde`],Martes:[`Tarde`],Miércoles:[`Tarde`],Jueves:[`Tarde`],Viernes:[`Tarde`]},minutes:45,safety:[],status:`Baja informada`,review:`En Perros paseados (noviembre) figura "no pasea más", pero sigue en BASE RUTAS.`},{id:`PJ-029`,name:`Bocha`,size:`Grande`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-030`,name:`Candombe`,size:`Mediano`,plan:`Sin plan (3 paseos)`,days:[],shifts:[],schedule:{},minutes:null,safety:[`No juntar con Pistacho`],incompatibleWith:[`Pistacho`],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`},{id:`PJ-031`,name:`Momo`,size:`Mediano`,plan:`Plan 1`,days:[],shifts:[],schedule:{},minutes:null,safety:[],status:`Sin ruta cargada`,review:`Figura en la tabla de precios pero no en BASE RUTAS.`}].map(e=>({category:`SIN EVALUAR`,categorySource:`Registro maestro 14/08/2026`,...e})),At=[{item:`Correas`,total:8,juan:0,sebastian:8},{item:`Bebederos portátiles`,total:3,juan:1,sebastian:2},{item:`Ganchos de hierro`,total:9,juan:5,sebastian:4},{item:`Musleras`,total:3,juan:2,sebastian:1},{item:`Pecheras`,total:3,juan:2,sebastian:1},{item:`Cinturones`,total:3,juan:2,sebastian:1},{item:`Bozales grandes`,total:2,juan:1,sebastian:1},{item:`Bozales medianos`,total:1,juan:1,sebastian:0},{item:`Bozales chicos`,total:1,juan:1,sebastian:0},{item:`Cepillos`,total:6,juan:0,sebastian:6},{item:`Tijeras`,total:2,juan:0,sebastian:2}],jt=[{label:`Perros en la tabla de precios`,value:`27`,source:`Tabla de precios, 10/11/2026`,kind:`Dato`},{label:`Perros activos`,value:`18`,source:`Referencia del 24/09/2026`,kind:`Dato histórico`},{label:`Máximo diario histórico`,value:`29`,source:`04/08/2025`,kind:`Dato histórico`},{label:`Brecha propuesta`,value:`11 perros`,source:`Reunión de socios`,kind:`Meta de referencia`}],Mt=[`Seguridad inmediata: separar al perro del peligro si se puede hacer sin riesgo.`,`Revisar lesiones. La atención veterinaria va antes que cualquier trámite.`,`Avisar al tutor.`,`Registrar hechos observables: hora, lugar, personas y perros involucrados.`,`Prevención: contener, informar, corregir y medir la recuperación.`];function Nt(e,t,n){return!!e.schedule?.[t]?.includes(n)}function Pt(e,t){return w.filter(n=>Nt(n,e,t))}function Ft(e=new Date){return S[(e.getDay()+6)%7]}function T(e){return`$${Number(e).toLocaleString(`es-AR`)}`}var E={plan:`paseosJuan_cliente_plan`,ficha:`paseosJuan_cliente_ficha`,ausencias:`paseosJuan_cliente_ausencias`,carnet:`paseosJuan_cliente_carnet`,comprobantes:`paseosJuan_cliente_comprobantes`},It=`Tu perro`,Lt={planId:`plan2`,size:`Mediano`,shift:`Mañana`,days:[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`]},Rt=[`Pequeño`,`Mediano`,`Grande`],zt=S.filter(e=>e!==`Domingo`),Bt={Mañana:x.manana,Tarde:x.tarde};function Vt(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function Ht(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch{return!1}}function Ut(){let e=Vt(E.plan,null);if(!e||typeof e!=`object`)return{...Lt};let t=C.find(t=>t.id===e.planId)?e.planId:Lt.planId,n=Rt.includes(e.size)?e.size:Lt.size,r=Bt[e.shift]?e.shift:Lt.shift,i=Array.isArray(e.days)?zt.filter(t=>e.days.includes(t)):Lt.days;return{planId:t,size:n,shift:r,days:i.length?i:Lt.days}}function Wt(){let e=Vt(E.ficha,{});return e&&typeof e==`object`&&!Array.isArray(e)?e:{}}function Gt(){let e=Vt(E.ausencias,[]);return Array.isArray(e)?e.filter(e=>e&&typeof e.date==`string`):[]}function Kt(e){let t=Vt(e,[]);return Array.isArray(t)?t.filter(e=>e&&typeof e.name==`string`):[]}function qt(){let e=Vt(E.carnet,null);return e&&typeof e.name==`string`?e:null}function D(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function Jt(e){return`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(e)}`}function Yt(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value]));return{date:new Date(Date.UTC(Number(e.year),Number(e.month)-1,Number(e.day))),minutes:Number(e.hour)*60+Number(e.minute)}}function Xt(e,t){return new Date(e.getTime()+t*864e5)}function Zt(e){return S[(e.getUTCDay()+6)%7]}function Qt(e){return e.toISOString().slice(0,10)}function $t(e){return`${String(e.getUTCDate()).padStart(2,`0`)}/${String(e.getUTCMonth()+1).padStart(2,`0`)}/${e.getUTCFullYear()}`}function en(e){let[t,n,r]=e.split(`-`).map(Number);return $t(new Date(Date.UTC(t,n-1,r)))}function tn(e){let[t,n,r]=e.split(`-`).map(Number);return new Date(Date.UTC(t,n-1,r))}function nn(e){let[t,n]=e.split(`:`).map(Number);return t*60+n}function rn(e){return{Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`}[e]}function an(e){return e.length>1?`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`:e.join(``)}function on(e,t,n){return`${e} ${e===1?t:n}`}function sn(){let e=Ut(),t=C.find(t=>t.id===e.planId),n=Bt[e.shift],r=Wt(),i=Yt(),a=Qt(i.date),o=Gt().filter(e=>e.date>=a).sort((e,t)=>e.date.localeCompare(t.date));return{settings:e,plan:t,shift:n,ficha:r,now:i,todayIso:a,absences:o,absentDates:new Set(o.map(e=>e.date)),dogName:(r.nombre||``).trim()||It}}function cn(e){let{settings:t,shift:n,now:r,todayIso:i,absentDates:a}=e,o=Zt(r.date),s=nn(n.from),c=nn(n.to);return t.days.includes(o)?a.has(i)?{kind:`ausente`,title:`Hoy no sale: avisaste una ausencia`,step:-1}:r.minutes<s?{kind:`programado`,title:`Hoy sale a pasear`,step:0}:r.minutes<=c?{kind:`en-curso`,title:`Hoy sale a pasear`,step:1}:{kind:`terminado`,title:`El paseo de hoy ya pasó`,step:2}:{kind:`libre`,title:`Hoy no tiene paseo`,step:-1}}function ln(e,t=10,n=!0){let{settings:r,shift:i,now:a,absentDates:o}=e,s=[];for(let e=0;e<70&&s.length<t;e+=1){let t=Xt(a.date,e);r.days.includes(Zt(t))&&(e===0&&a.minutes>nn(i.to)||n&&o.has(Qt(t))||s.push(t))}return s}var un=[{id:`identificacion`,title:`Identificación`,iconName:`pawPrint`,fields:[{key:`nombre`,label:`Nombre`,placeholder:`Cómo se llama`},{key:`raza`,label:`Raza o cruza`},{key:`edad`,label:`Edad o fecha de nacimiento`},{key:`sexo`,label:`Sexo`,options:[`Macho castrado`,`Macho sin castrar`,`Hembra castrada`,`Hembra sin castrar`]},{key:`senas`,label:`Color y señas particulares`},{key:`chapita`,label:`Chapita o microchip`,options:[`Tiene chapita`,`Tiene microchip`,`Tiene los dos`,`No tiene`]},{key:`fotos`,label:`Fotos en las redes de Paseos Juan`,options:[`Autorizo`,`No autorizo`]}]},{id:`salud`,title:`Salud`,iconName:`heartPulse`,fields:[{key:`vacunas`,label:`Vacunas`,options:[`Al día`,`Atrasadas`,`No sé`]},{key:`desparasitacion`,label:`Última desparasitación`,placeholder:`Por ejemplo: 10/2026`},{key:`alergias`,label:`Alergias o medicación`},{key:`cuidados`,label:`Lesiones, cirugías o cuidados especiales`,textarea:!0},{key:`veterinaria`,label:`Veterinaria de referencia`}]},{id:`equipo`,title:`Equipo y paseo`,iconName:`shieldCheck`,fields:[{key:`equipo`,label:`Con qué sale`,placeholder:`Collar, pechera, correa…`},{key:`bozal`,label:`Bozal`,options:[`No usa bozal`,`Usa bozal`]},{key:`retiro`,label:`Indicaciones para el retiro y la entrega`,textarea:!0,placeholder:`Por ejemplo: quién lo entrega o si hay otro perro en la casa. No hace falta poner la dirección.`}]},{id:`comportamiento`,title:`Comportamiento y control`,iconName:`eye`,hint:`Contanos lo que ves que hace, con ejemplos. Así lo cuidamos mejor.`,fields:[{key:`otrosPerros`,label:`Con otros perros`,textarea:!0,placeholder:`Por ejemplo: se acerca moviendo la cola, o ladra cuando otro perro viene de frente.`},{key:`personas`,label:`Con personas y chicos`,textarea:!0},{key:`estimulos`,label:`Qué lo pone nervioso o le da miedo`,placeholder:`Motos, ruidos fuertes, bicicletas…`},{key:`correa`,label:`En la correa`,placeholder:`Si tira o si vuelve al llamarlo`},{key:`noJuntar`,label:`Perros con los que no debe juntarse`,placeholder:`Si no hay, escribí “ninguno”`}]},{id:`emergencia`,title:`Contacto de emergencia`,iconName:`users`,hint:`Alguien a quien llamar si no te encontramos a vos.`,fields:[{key:`contactoNombre`,label:`Nombre`},{key:`contactoRelacion`,label:`Relación`,placeholder:`Familiar, vecino, amigo…`},{key:`contactoTelefono`,label:`Teléfono`,type:`tel`,autocomplete:`tel`}]}],dn=un.flatMap(e=>e.fields);function fn(e,t){return!!String(e[t]??``).trim()}function pn(e,t){return t.fields.filter(t=>fn(e,t.key)).length}function mn(e){return dn.filter(t=>fn(e,t.key)).length}function hn(e){let t=[];e.bozal===`Usa bozal`&&t.push(`Usa bozal`);let n=String(e.noJuntar??``).trim();return n&&!/^ningun[oa]?\.?$/i.test(n)&&t.push(`No juntar con: ${n}`),t}function gn(e){let{ficha:t}=e,n=[],r=un.find(e=>e.id===`emergencia`);pn(t,r)<r.fields.length&&n.push({text:`Cargá un contacto de emergencia`,detail:`Por si no te encontramos durante el paseo.`,go:`ficha-emergencia`}),qt()||n.push({text:`Subí el carnet de vacunas`,detail:`Foto o PDF. Lo revisamos antes de los paseos en grupo.`,go:`cl-vacunas`});let i=mn(t);return i<dn.length&&n.push({text:`Completá la ficha de tu perro`,detail:`Tenés ${i} de ${dn.length} datos cargados.`,go:`cl-ficha`}),n.slice(0,3)}function _n(e){return e.todayIso<=r.until}var O={status:{},openGroups:new Set([`identificacion`]),resetArmed:!1};function vn(e,t,n=``){O.status[e]={message:t,html:n}}function yn(e){let t=O.status[e];return`<p class="cl-status" role="status" aria-live="polite" data-cl-status="${e}">${t?`${D(t.message)} ${t.html}`.trim():``}</p>`}function bn(){return`
    <div class="cl-page" data-cl-root>
      ${xn(sn())}
    </div>
  `}function xn(e){return`
    <p class="cl-demo-note">
      ${p(`help`,`cl-icon-sm`)}
      <span><strong>Página de ejemplo.</strong> El perro y el plan son de demostración. Lo que cargás se guarda solo en este dispositivo.</span>
    </p>
    ${Sn(e)}
    ${En(e)}
    ${On()}
    ${kn(e)}
    ${An(e)}
    ${jn(e)}
    <div class="cl-two-col">
      ${In()}
      ${Ln(e)}
    </div>
    ${_n(e)?Rn():``}
    ${zn()}
  `}function Sn(e){let{now:t,shift:n,settings:r,plan:i,dogName:a,ficha:o}=e,s=cn(e),c=hn(o),l=[`Programado`,`Turno en curso`,`Turno terminado`],u=ln(e,1)[0],d=u&&Qt(u)===e.todayIso,f=gn(e),ee={libre:`Los días de paseo de tu plan son ${an(r.days.map(e=>e.toLowerCase()))}.`,ausente:`Quedó anotado en este dispositivo. Si todavía no mandaste el aviso por WhatsApp, mandalo así el equipo se entera.`,programado:`Sale en el turno ${r.shift.toLowerCase()}, entre las ${n.from} y las ${n.to}.`,"en-curso":`Ahora es el horario del turno ${r.shift.toLowerCase()} (${n.from} a ${n.to}). El equipo te avisa por WhatsApp cuando lo retira y cuando lo entrega.`,terminado:`El turno ${r.shift.toLowerCase()} terminó a las ${n.to}. Si no te llegó el aviso de entrega, escribinos.`}[s.kind];return`
    <section class="cl-today" aria-labelledby="cl-today-title">
      <div class="cl-today-main cl-card">
        <div class="cl-dog-chip">
          <span class="cl-avatar">${p(`pawPrint`,`cl-icon`)}</span>
          <span>
            <strong data-cl-dogname>${D(a)}</strong>
            <small>${D(i.name)} · ${D(r.size)} · Turno ${D(r.shift.toLowerCase())}</small>
          </span>
        </div>
        <p class="cl-eyebrow">Hoy · ${D(Zt(t.date))} ${$t(t.date)}</p>
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
        <div data-cl-region="alertas-hoy">${wn(c,!0)}</div>
        ${Tn(e)}
      </div>

      <div class="cl-today-side">
        <article class="cl-card cl-next">
          <p class="cl-eyebrow">${p(`calendarCheck`,`cl-icon-sm`)} Próximo paseo</p>
          ${u?`
            <p class="cl-next-day">${d?`Hoy`:D(Zt(u))}</p>
            <p class="cl-next-date">${d?`${D(Zt(u))} ${$t(u)}`:$t(u)}</p>
            <p class="cl-next-shift">Turno ${D(r.shift.toLowerCase())} · ${n.from} a ${n.to}</p>
          `:`
            <p class="cl-next-day">${v}</p>
            <p class="cl-next-shift">No encontramos un próximo paseo con los días de tu plan.</p>
          `}
        </article>

        <article class="cl-card cl-pending" aria-labelledby="cl-pending-title">
          <h2 id="cl-pending-title" class="cl-h3">Tus pendientes</h2>
          <div data-cl-region="pendientes">${Cn(e,f)}</div>
        </article>
      </div>
    </section>
  `}function Cn(e,t=gn(e)){return t.length?`
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
  `:`<p class="cl-all-done">${p(`checkCircle`,`cl-icon-sm`)} Todo al día. Gracias por mantener la ficha completa.</p>`}function wn(e,t=!1){return e.length?`
    <div class="cl-alert ${t?`is-compact`:``}" role="note" aria-label="Alertas de seguridad">
      ${p(`alertTriangle`,`cl-icon`)}
      <div>
        <strong>Alertas de seguridad</strong>
        <ul>${e.map(e=>`<li>${D(e)}</li>`).join(``)}</ul>
      </div>
    </div>
  `:``}function Tn(e){let{now:t,settings:n,absentDates:r,todayIso:i}=e,a=Xt(t.date,-((t.date.getUTCDay()+6)%7));return`
    <div class="cl-week">
      <p class="cl-week-title">Esta semana</p>
      <ul class="cl-week-days">
        ${S.map((e,t)=>Xt(a,t)).map(e=>{let t=Qt(e),a=Zt(e),o=n.days.includes(a),s=o&&r.has(t),c=t===i,l=s?`ausencia avisada`:o?`con paseo`:`sin paseo`;return`
            <li class="${o?`has-walk`:``} ${s?`is-absent`:``} ${c?`is-today`:``}" aria-label="${a} ${$t(e)}: ${l}${c?` (hoy)`:``}">
              <span aria-hidden="true">${rn(a)}</span>
              <b aria-hidden="true">${e.getUTCDate()}</b>
              <i aria-hidden="true">${s?`Ausente`:o?`Paseo`:`—`}</i>
            </li>
          `}).join(``)}
      </ul>
    </div>
  `}function En(e){return`
    <nav class="cl-quick" aria-label="Acciones rápidas">
      ${[{label:`Avisar una ausencia`,go:`cl-ausencia`,iconName:`bell`},{label:`Subir carnet de vacunas`,go:`cl-vacunas`,iconName:`fileUp`}].map(e=>`
        <button type="button" class="cl-quick-btn" data-cl-go="${e.go}">
          ${p(e.iconName,`cl-icon`)}
          <span>${e.label}</span>
        </button>
      `).join(``)}
      <a class="cl-quick-btn is-whatsapp" href="${Jt(`Hola, tengo una consulta sobre los paseos de mi perro.`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon`)}
        <span>Hablar por WhatsApp <small>${D(b.whatsappLabel)}</small></span>
      </a>
      ${_n(e)?`
        <button type="button" class="cl-quick-btn" data-cl-go="cl-promo">
          ${p(`medal`,`cl-icon`)}
          <span>Ver la promo <small>Hasta el ${D(r.untilLabel)}</small></span>
        </button>
      `:``}
    </nav>
  `}function Dn(){return`Ahora: tema ${Pe()?`oscuro`:`claro`} · movimiento ${Fe()?`calmo (sin movimiento)`:`normal`}.`}function On(){return`
    <section class="cl-a11y cl-card" aria-labelledby="cl-a11y-title">
      <span class="cl-a11y-icon">${p(`eye`,`cl-icon`)}</span>
      <div>
        <h2 id="cl-a11y-title" class="cl-h3">Mirá la página como te quede más cómoda</h2>
        <p><strong>Modo oscuro:</strong> menos brillo, ideal de noche. <strong>Modo calmo:</strong> apaga animaciones y el fondo en movimiento; recomendado si tenés epilepsia fotosensible, migrañas o te mareás con el movimiento en pantalla.</p>
        <p class="cl-fine" data-cl-a11y-state>${Dn()} Se guarda solo en este dispositivo.</p>
      </div>
      <button type="button" class="cl-btn is-secondary" data-cl-open-a11y>Abrir opciones de accesibilidad</button>
    </section>
  `}function kn(e){let t=ln(e,10);return`
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
                ${t.map(t=>`<option value="${Qt(t)}">${D(Zt(t))} ${$t(t)} · turno ${D(e.settings.shift.toLowerCase())}</option>`).join(``)}
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
          ${yn(`ausencia`)}
        </div>
        <div class="cl-absence-list">
          <h3 class="cl-h4">Ausencias avisadas</h3>
          ${e.absences.length?`
            <ul class="cl-list">
              ${e.absences.map(e=>`
                <li>
                  <span>
                    <strong>${D(Zt(tn(e.date)))} ${en(e.date)}</strong>
                    ${e.reason?`<small>${D(e.reason)}</small>`:``}
                  </span>
                  <button type="button" class="cl-btn is-ghost is-small" data-cl-absence-remove="${D(e.date)}" aria-label="Quitar la ausencia del ${en(e.date)}">Quitar</button>
                </li>
              `).join(``)}
            </ul>
          `:`<p class="cl-empty">No avisaste ausencias. Todos los paseos de tu plan siguen en pie.</p>`}
        </div>
      </div>
    </section>
  `}function An(e){let{plan:t,settings:n,shift:r}=e,i=Dt[n.size],a=n.days.length===t.walks;return`
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
          <p class="cl-plan-walks">${on(t.walks,`paseo`,`paseos`)} por semana · ${D(n.size)}</p>
          <p class="cl-plan-price"><b>${T(t.prices[n.size])}</b> <span>por semana</span></p>
        </div>
        <dl class="cl-plan-facts">
          <div>
            <dt>Días</dt>
            <dd>
              <ul class="cl-day-chips" aria-label="Días contratados">
                ${zt.map(e=>`<li class="${n.days.includes(e)?`is-on`:``}" aria-label="${e}: ${n.days.includes(e)?`contratado`:`no contratado`}"><span aria-hidden="true">${rn(e)}</span></li>`).join(``)}
              </ul>
            </dd>
          </div>
          <div><dt>Turno</dt><dd>${D(n.shift)} · ${r.from} a ${r.to}</dd></div>
          <div><dt>Horario exacto de retiro</dt><dd>${v}</dd></div>
        </dl>
      </div>
      ${a?``:`<p class="cl-warning">${p(`alertCircle`,`cl-icon-sm`)} El ${D(t.name)} incluye ${on(t.walks,`paseo`,`paseos`)} por semana y hay ${on(n.days.length,`día cargado`,`días cargados`)}. Lo confirmamos por WhatsApp.</p>`}

      <h3 class="cl-h4">Todos los planes · tamaño ${D(n.size.toLowerCase())}</h3>
      <ul class="cl-plan-grid">
        ${C.map(e=>`
          <li class="cl-plan-card ${e.id===t.id?`is-current`:``}">
            ${e.id===t.id?`<span class="cl-badge">Tu plan</span>`:``}
            <strong>${D(e.name)}</strong>
            <span>${on(e.walks,`paseo`,`paseos`)} por semana</span>
            <b>${T(e.prices[n.size])}</b>
            <small>por semana</small>
          </li>
        `).join(``)}
      </ul>
      <div class="cl-plan-extra">
        <p><strong>Paseo suelto (${D(n.size.toLowerCase())}):</strong> individual ${T(i.individual)} · en grupo ${T(i.grupo)}.</p>
        <p><strong>Más de un perro en casa:</strong> ${Ot.map(e=>`${e.dogs} perros ${e.discount}`).join(` · `)} de descuento.</p>
        <p class="cl-fine">Fuente: tabla oficial de planes de Paseos Juan. El monto final de tu cuenta te lo confirmamos por WhatsApp.</p>
      </div>

      <details class="cl-details" data-cl-details="plan" ${O.openGroups.has(`plan`)?`open`:``}>
        <summary>${p(`sliders`,`cl-icon-sm`)} Cambiar el ejemplo</summary>
        <div class="cl-form cl-plan-form">
          <p class="cl-fine">Esto solo cambia lo que ves en este dispositivo. Para cambiar tu plan de verdad, escribinos por WhatsApp.</p>
          <div class="cl-form-row">
            <label for="cl-plan-id">Plan
              <select id="cl-plan-id" data-cl-plan-field="planId">
                ${C.map(e=>`<option value="${e.id}" ${e.id===t.id?`selected`:``}>${D(e.name)} · ${on(e.walks,`paseo`,`paseos`)}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-size">Tamaño
              <select id="cl-plan-size" data-cl-plan-field="size">
                ${Rt.map(e=>`<option ${e===n.size?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label for="cl-plan-shift">Turno
              <select id="cl-plan-shift" data-cl-plan-field="shift">
                ${Object.entries(Bt).map(([e,t])=>`<option value="${e}" ${e===n.shift?`selected`:``}>${e} (${t.from} a ${t.to})</option>`).join(``)}
              </select>
            </label>
          </div>
          <fieldset class="cl-days-field">
            <legend>Días de paseo</legend>
            <div class="cl-days-options">
              ${zt.map(e=>`
                <label class="cl-check">
                  <input type="checkbox" value="${e}" data-cl-plan-day ${n.days.includes(e)?`checked`:``} />
                  <span>${e}</span>
                </label>
              `).join(``)}
            </div>
          </fieldset>
          <button type="button" class="cl-btn" data-cl-plan-save>Guardar ejemplo</button>
          ${yn(`plan`)}
        </div>
      </details>
    </section>
  `}function jn(e){let{ficha:t}=e,n=mn(t),r=dn.length;return`
    <section class="cl-card cl-section" id="cl-ficha" aria-labelledby="cl-ficha-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`fileText`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-ficha-title" class="cl-h2" tabindex="-1">Ficha de <span data-cl-dogname>${D(e.dogName)}</span></h2>
          <p>Con estos datos cuidamos mejor a tu perro. Lo que falte figura como “${v}”. Se guarda solo en este dispositivo mientras lo escribís.</p>
        </div>
      </header>

      <div class="cl-ficha-top">
        <div class="cl-progress-wrap" data-cl-region="ficha-progreso">${Mn(n,r)}</div>
        <div class="cl-category">
          <span class="cl-category-tag">SIN EVALUAR</span>
          <p><strong>Categoría operativa.</strong> ${D(kt[`SIN EVALUAR`])} Todo perro nuevo empieza así y su primer paseo es individual. Fecha de evaluación: ${v}.</p>
        </div>
      </div>
      <div data-cl-region="alertas-ficha">${wn(hn(t))}</div>

      <div class="cl-ficha-groups">
        ${un.map(e=>Pn(e,t)).join(``)}
      </div>
      ${yn(`ficha`)}
    </section>
  `}function Mn(e,t){return`
    <p class="cl-progress-label"><strong>${e} de ${t}</strong> datos cargados</p>
    <div class="cl-progress" role="progressbar" aria-label="Ficha completa" aria-valuemin="0" aria-valuemax="${t}" aria-valuenow="${e}" aria-valuetext="${e} de ${t} datos cargados">
      <span style="width:${Math.round(e/t*100)}%"></span>
    </div>
  `}function Nn(e,t){let n=pn(e,t);return n===t.fields.length?`<span class="cl-count is-done">${p(`checkCircle`,`cl-icon-xs`)} Completo</span>`:`<span class="cl-count">${n} de ${t.fields.length} · ${v.toLowerCase()}</span>`}function Pn(e,t){let n=O.openGroups.has(e.id);return`
    <details class="cl-group" id="ficha-${e.id}" data-cl-details="${e.id}" ${n?`open`:``}>
      <summary>
        <span class="cl-group-icon">${p(e.iconName,`cl-icon-sm`)}</span>
        <span class="cl-group-title">${e.title}</span>
        <span data-cl-count="${e.id}">${Nn(t,e)}</span>
        ${p(`chevronDown`,`cl-icon-sm cl-chevron`)}
      </summary>
      <div class="cl-group-body">
        ${e.hint?`<p class="cl-fine">${e.hint}</p>`:``}
        <div class="cl-fields">
          ${e.fields.map(e=>Fn(e,t)).join(``)}
        </div>
      </div>
    </details>
  `}function Fn(e,t){let n=`cl-f-${e.key}`,r=t[e.key]??``,i=e.textarea?`is-wide`:``,a;return a=e.options?`
      <select id="${n}" data-cl-ficha="${e.key}">
        <option value="">${v}</option>
        ${e.options.map(e=>`<option ${e===r?`selected`:``}>${D(e)}</option>`).join(``)}
      </select>
    `:e.textarea?`<textarea id="${n}" rows="3" maxlength="600" data-cl-ficha="${e.key}" placeholder="${D(e.placeholder||`Pendiente de confirmar`)}">${D(r)}</textarea>`:`<input id="${n}" type="${e.type||`text`}" maxlength="140" ${e.autocomplete?`autocomplete="${e.autocomplete}"`:`autocomplete="off"`} data-cl-ficha="${e.key}" value="${D(r)}" placeholder="${D(e.placeholder||`Pendiente de confirmar`)}" />`,`
    <label class="cl-field ${i}" for="${n}">
      <span>${e.label}</span>
      ${a}
      ${e.placeholder&&!e.options?`<small class="cl-field-state" data-cl-field-state="${e.key}">${fn(t,e.key)?``:v}</small>`:``}
    </label>
  `}function In(){let e=qt();return`
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
        <div><dt>Estado</dt><dd>${e?`Pendiente de revisión · cargado el ${D(e.date)}`:v}</dd></div>
      </dl>
      <p class="cl-fine">La app todavía no envía archivos: queda anotado en este dispositivo. Para que lo revisemos, mandá la foto o el PDF por WhatsApp.</p>
      <a class="cl-btn is-secondary" href="${Jt(`Hola, te mando el carnet de vacunas de mi perro.`)}" target="_blank" rel="noreferrer">
        ${p(`message`,`cl-icon-sm`)} Mandar carnet por WhatsApp
      </a>
      ${yn(`carnet`)}
    </section>
  `}function Ln(e){let t=Kt(E.comprobantes);return`
    <section class="cl-card cl-section" id="cl-pagos" aria-labelledby="cl-pagos-title">
      <header class="cl-section-head">
        <span class="cl-section-icon">${p(`wallet`,`cl-icon`)}</span>
        <div>
          <h2 id="cl-pagos-title" class="cl-h2" tabindex="-1">Pagos</h2>
          <p>El alias y el detalle de pago te los enviamos por WhatsApp.</p>
        </div>
      </header>
      <p class="cl-price-ref">Precio de lista de tu plan: <strong>${T(e.plan.prices[e.settings.size])} por semana</strong>. El monto final te lo confirmamos por WhatsApp.</p>
      <a class="cl-btn" href="${Jt(`Hola, ¿me pasan el alias y el detalle de pago del plan de mi perro?`)}" target="_blank" rel="noreferrer">
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
        <a class="cl-btn is-secondary" href="${Jt(`Hola, te mando el comprobante de pago del plan de mi perro.`)}" target="_blank" rel="noreferrer">
          ${p(`message`,`cl-icon-sm`)} Mandar comprobante por WhatsApp
        </a>
      `:`<p class="cl-empty">Todavía no cargaste comprobantes.</p>`}
      ${yn(`comprobante`)}
    </section>
  `}function Rn(){return`
    <section class="cl-card cl-section cl-promo" id="cl-promo" aria-labelledby="cl-promo-title">
      <span class="cl-section-icon">${p(`medal`,`cl-icon`)}</span>
      <div>
        <p class="cl-eyebrow">Promo vigente hasta el ${D(r.untilLabel)}</p>
        <h2 id="cl-promo-title" class="cl-h2" tabindex="-1">${D(r.title)}</h2>
        <p>${D(r.detail)} Podés pasarla a quien quieras.</p>
      </div>
      <a class="cl-btn" href="${Jt(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
    </section>
  `}function zn(){return`
    <section class="cl-privacy" aria-labelledby="cl-privacy-title">
      <div>
        <h2 id="cl-privacy-title" class="cl-h4">${p(`lock`,`cl-icon-sm`)} Tus datos</h2>
        <p>La ficha, las ausencias y los archivos que anotás acá quedan solo en este dispositivo. No se comparten con nadie hasta que vos nos los mandes.</p>
      </div>
      <button type="button" class="cl-btn is-ghost ${O.resetArmed?`is-danger`:``}" data-cl-reset>
        ${O.resetArmed?`Tocá de nuevo para borrar todo`:`Borrar mis datos de este dispositivo`}
      </button>
      ${yn(`privacidad`)}
    </section>
  `}function Bn(e){let t=document.querySelector(`[data-cl-root]`);if(!t)return;let n=document.activeElement?.id;t.innerHTML=xn(sn()),(e&&t.querySelector(e)||n&&document.getElementById(n))?.focus({preventScroll:!0})}function Vn(){let e=document.querySelector(`[data-cl-root]`);if(!e)return;let t=sn();Object.entries({pendientes:()=>Cn(t),"alertas-hoy":()=>wn(hn(t.ficha),!0),"alertas-ficha":()=>wn(hn(t.ficha)),"ficha-progreso":()=>Mn(mn(t.ficha),dn.length)}).forEach(([t,n])=>{e.querySelectorAll(`[data-cl-region="${t}"]`).forEach(e=>{e.innerHTML=n()})}),un.forEach(n=>{let r=e.querySelector(`[data-cl-count="${n.id}"]`);r&&(r.innerHTML=Nn(t.ficha,n))}),e.querySelectorAll(`[data-cl-dogname]`).forEach(e=>{e.textContent=t.dogName}),e.querySelectorAll(`[data-cl-field-state]`).forEach(e=>{e.textContent=fn(t.ficha,e.dataset.clFieldState)?``:v})}function Hn(e,t,n=``){vn(e,t,n);let r=document.querySelector(`[data-cl-status="${e}"]`);r&&(r.innerHTML=`${D(t)} ${n}`.trim())}function Un(e){let t=document.getElementById(e);t&&(t.tagName===`DETAILS`&&(t.open=!0,O.openGroups.add(t.dataset.clDetails)),t.scrollIntoView({behavior:Fe()?`auto`:`smooth`,block:`start`}),(t.matches(`details`)?t.querySelector(`input, select, textarea`):t.querySelector(`[tabindex='-1']`))?.focus({preventScroll:!0}))}function Wn(){return $t(Yt().date)}function Gn(e){if(!e.target.closest(`[data-cl-root]`))return!1;let t=e.target.closest(`[data-cl-go]`);if(t)return Un(t.dataset.clGo),!0;if(e.target.closest(`[data-cl-open-a11y]`))return setTimeout(()=>{let e=document.getElementById(`a11y-panel`);e&&!e.hidden?e.querySelector(`.a11y-option.is-active`)?.focus():document.querySelector(`.a11y-toggle`)?.click()},0),!0;if(e.target.closest(`[data-cl-absence-save]`)){let e=document.querySelector(`[data-cl-absence-date]`)?.value,t=document.querySelector(`[data-cl-absence-reason]`)?.value?.trim()||``;if(!e)return!0;let n=sn(),r=Gt().filter(t=>t.date!==e);r.push({date:e,reason:t}),Ht(E.ausencias,r);let i=Jt([`Hola, aviso que ${n.dogName===It?`mi perro`:`mi perro ${n.dogName}`} no sale al paseo el ${Zt(tn(e)).toLowerCase()} ${en(e)} (turno ${n.settings.shift.toLowerCase()}).`,t?`Motivo: ${t}.`:``,`¡Gracias!`].filter(Boolean).join(` `));return window.open(i,`_blank`,`noopener`),vn(`ausencia`,`Listo: anotamos la ausencia del ${en(e)}. Si WhatsApp no se abrió,`,`<a href="${i}" target="_blank" rel="noreferrer">tocá acá para mandar el aviso</a>.`),Bn(`[data-cl-status='ausencia']`),!0}let n=e.target.closest(`[data-cl-absence-remove]`);if(n){let e=n.dataset.clAbsenceRemove;return Ht(E.ausencias,Gt().filter(t=>t.date!==e)),vn(`ausencia`,`Quitamos la ausencia del ${en(e)}. Si ya la habías avisado, contanos por WhatsApp que al final sale.`),Bn(`#cl-ausencia-title`),!0}if(e.target.closest(`[data-cl-plan-save]`)){let e=e=>document.querySelector(`[data-cl-plan-field="${e}"]`)?.value,t=[...document.querySelectorAll(`[data-cl-plan-day]:checked`)].map(e=>e.value),n=e(`planId`),r=C.find(e=>e.id===n);return t.length?r&&t.length!==r.walks?(Hn(`plan`,`El ${r.name} incluye ${on(r.walks,`paseo`,`paseos`)} por semana: elegí ${on(r.walks,`día`,`días`)} (marcaste ${t.length}).`),!0):(Ht(E.plan,{planId:n,size:e(`size`),shift:e(`shift`),days:t}),vn(`plan`,`Guardado. Actualizamos el plan, el paseo de hoy y el próximo paseo.`),Bn(`[data-cl-plan-save]`),!0):(Hn(`plan`,`Elegí al menos un día de paseo.`),!0)}if(e.target.closest(`[data-cl-reset]`))return O.resetArmed?(Object.values(E).forEach(e=>{try{localStorage.removeItem(e)}catch{}}),O.resetArmed=!1,O.status={},vn(`privacidad`,`Listo: borramos de este dispositivo la ficha, el plan de ejemplo, las ausencias y los archivos anotados.`),Bn(`[data-cl-reset]`),!0):(O.resetArmed=!0,Bn(`[data-cl-reset]`),!0);if(O.resetArmed&&!e.target.closest(`[data-cl-reset]`)){O.resetArmed=!1;let e=document.querySelector(`[data-cl-reset]`);e&&(e.classList.remove(`is-danger`),e.textContent=`Borrar mis datos de este dispositivo`)}return!1}function Kn(e){let t=e.target.closest(`[data-cl-file]`);if(t){let e=t.files?.[0];if(!e)return!1;let n={name:e.name,date:Wn()};if(t.dataset.clFile===`carnet`)Ht(E.carnet,n),vn(`carnet`,`Anotamos “${e.name}”. Ahora mandalo por WhatsApp para que lo revisemos.`),Bn(`[data-cl-status='carnet']`);else{let t=[n,...Kt(E.comprobantes)].slice(0,10);Ht(E.comprobantes,t),vn(`comprobante`,`Anotamos “${e.name}”. Mandalo por WhatsApp así lo confirmamos.`),Bn(`[data-cl-status='comprobante']`)}return!1}let n=e.target.closest(`[data-cl-ficha]`);if(n){let e=Wt();Hn(`ficha`,Ht(E.ficha,{...e,[n.dataset.clFicha]:n.value.trim()})?`Ficha guardada en este dispositivo.`:`No pudimos guardar en este dispositivo (¿modo privado?). Lo que escribas vale solo para esta visita.`)}return!1}function qn(e){let t=e.target.closest?.(`[data-cl-ficha]`);if(!t)return;let n=Wt();Ht(E.ficha,{...n,[t.dataset.clFicha]:t.value.trim()}),Vn()}function Jn(e){let t=e.target;t instanceof HTMLDetailsElement&&t.dataset.clDetails&&(t.open?O.openGroups.add(t.dataset.clDetails):O.openGroups.delete(t.dataset.clDetails))}function Yn(){be.push(Gn),xe.push(Kn),document.addEventListener(`input`,qn),document.addEventListener(`toggle`,Jn,!0),Ie(()=>{let e=document.querySelector(`[data-cl-a11y-state]`);e&&(e.textContent=`${Dn()} Se guarda solo en este dispositivo.`)})}var Xn=`America/Argentina/Buenos_Aires`,Zn=`Sebastián`,Qn=`paseosJuan_paseador_progreso`,$n=`paseosJuan_paseador_equipo`,er=`paseosJuan_paseador_incidente`,k=[{label:`Retiro`,action:`Marcar retirado`,done:`Retirado`},{label:`Paseo`,action:`Marcar paseado`,done:`Paseado`},{label:`Entrega`,action:`Marcar entregado`,done:`Entregado`}],tr={Mañana:x.manana,Tarde:x.tarde},nr=[`Bajo`,`Medio`,`Alto`],rr=[`No se ven`,`Sí`,`No sé`],ir=`Perro externo`,ar=/\b(agresiv\w*|mal[oa]s?|dominantes?)\b/i,A={day:null,shift:null,pickerOpen:!1,confirmClear:!1,previewOpen:!1,incidentStatus:``,equipStatus:``};function j(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function or(e,t){try{return JSON.parse(localStorage.getItem(e))??t}catch{return t}}function sr(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function cr(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Xn,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=new Date(Number(e.year),Number(e.month)-1,Number(e.day));return{iso:`${e.year}-${e.month}-${e.day}`,date:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),day:Ft(t)}}function lr(e){return e.minutes<810?`Mañana`:`Tarde`}function ur(){let e=cr(),t=A.day||e.day;return{now:e,day:t,shift:A.shift||lr(e),isToday:t===e.day}}function dr(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function fr(e){let t=tr[e];return`${t.from} a ${t.to}`}function pr(e){let t=tr[e],n=t.routes||[t.route];return n.length>1?`Rutas ${dr(n)}`:`Ruta ${n[0]}`}function mr(e){return/^no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`info`}function hr(e){let t=new Set(e.map(e=>e.name)),n=new Map;return e.forEach(e=>{(e.incompatibleWith||[]).forEach(r=>{if(!t.has(r))return;let i=[e.name,r].sort().join(`|`);n.set(i,[e.name,r].sort())})}),[...n.values()]}function gr(e){let t=e.map(e=>[...e]),n=[];for(;t.length;){let e={};t.flat().forEach(t=>{e[t]=(e[t]||0)+1});let r=Object.keys(e).sort((t,n)=>e[n]-e[t]||t.localeCompare(n))[0],i=t.filter(e=>e.includes(r)).map(e=>e.find(e=>e!==r)).sort();n.push(`${r} con ${dr(i)}`),t=t.filter(e=>!e.includes(r))}return n}function _r(e,t){return t.filter(t=>t.includes(e.name)).map(t=>t.find(t=>t!==e.name))}function vr(e){return e.safety.some(e=>/bozal/i.test(e))}var yr=At.filter(e=>e.sebastian>0),br=At.filter(e=>e.sebastian===0&&e.juan>0),xr=At.filter(e=>/^bozal/i.test(e.item)).reduce((e,t)=>e+t.sebastian,0);function Sr(e,t){return`${e}|${t}`}function Cr(e,t,n,r){let i=or(e,{}),a=Object.fromEntries(Object.entries(i).filter(([e])=>e.startsWith(t)));a[n]=r,sr(e,a)}function wr(e,t){return or(Qn,{})[Sr(e,t)]||{}}function Tr(e,t){let n=or($n,{})[Sr(e,t)];return Array.isArray(n)?n:[]}function Er(){let e=or(er,{});return{dogs:Array.isArray(e.dogs)?e.dogs:[],hora:e.hora||``,lugar:e.lugar||``,antes:e.antes||``,conducta:e.conducta||``,accion:e.accion||``,despues:e.despues||``,riesgo:e.riesgo||``,lesiones:e.lesiones||``,protocolo:Array.isArray(e.protocolo)?e.protocolo:[]}}function Dr(e){return`
    <div class="pw-shell">
      ${kr()}
      ${e}
    </div>
  `}function Or(){let e=ur(),t=Pt(e.day,e.shift),n=t.filter(e=>e.status===`Activo`),r=t.filter(e=>e.status!==`Activo`),i=hr(t);return`
    <main class="pw-main" id="pw-inicio">
      ${Ar(e,n,r,i)}
      ${Nr(e,n,r,i)}
      <div class="pw-columns">
        ${Fr(e)}
        ${Ir(e,t)}
      </div>
      <footer class="pw-footer">
        <p>Datos: ${j(b.officialSources.routes)} e Inventario de equipamiento, actualizados el ${y}.</p>
        <p>Lo que marcás en esta página se guarda solo en este celular.</p>
      </footer>
    </main>
  `}function kr(){return`
    <header class="pw-header">
      <a class="pw-brand" href="/paseador" data-link aria-label="Paseos Juan, panel del paseador">
        <span class="pw-logo" aria-hidden="true">
          <img class="pw-logo-light" src="/paseos-juan-logo-green.svg" alt="" />
          <img class="pw-logo-dark" src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span class="pw-brand-text">
          <strong>Paseos Juan</strong>
          <small>Paseador · ${Zn}</small>
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
  `}function Ar(e,t,n,r){let i=tr[e.shift],a=e.isToday?`Hoy, ${e.day.toLowerCase()} · turno ${e.shift.toLowerCase()}`:`${e.day} · turno ${e.shift.toLowerCase()}`;return`
    <section class="pw-card pw-today" aria-labelledby="pw-today-title">
      <div class="pw-today-head">
        <div>
          <p class="pw-kicker">${e.isToday?`Hola, ${Zn} · ${e.now.date}`:`Hola, ${Zn} · Planificación: no es hoy`}</p>
          <h1 id="pw-today-title">${a}</h1>
          <ul class="pw-meta" aria-label="Datos del turno">
            <li><b>${t.length}</b> ${t.length===1?`perro`:`perros`}</li>
            <li>${fr(e.shift)}</li>
            <li>Supervisa: ${j(i.supervisor)}</li>
            <li>${pr(e.shift)}</li>
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
      ${A.pickerOpen?jr(e):``}
      ${Mr(e,t,n,r)}
    </section>
  `}function jr(e){let t={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};return`
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
              ${t}<small>${fr(t)}</small>
            </button>
          `).join(``)}
        </div>
      </div>
    </div>
  `}function Mr(e,t,n,r){let i=[];r.length&&i.push({kind:`danger`,icon:`alertTriangle`,title:`No juntar en el mismo grupo`,text:`${gr(r).join(`. `)}.`,goto:`pw-perros`,button:`Ver perros`});let a=t.filter(vr);if(a.length){let e=a.length>xr;i.push({kind:`warn`,icon:`shieldCheck`,title:`Bozal: ${dr(a.map(e=>e.name))}`,text:e?`Según el inventario tenés ${xr} ${xr===1?`bozal`:`bozales`}. Confirmá con Juan antes de salir.`:`Llevá el bozal puesto en cada uno durante todo el paseo.`,goto:`pw-equipo`,button:`Ver equipo`})}if(n.length&&i.push({kind:`warn`,icon:`alertCircle`,title:`Confirmar antes de retirar: ${dr(n.map(e=>e.name))}`,text:n.length===1?`Figura en la ruta con estado "${j(n[0].status)}". No lo retires sin confirmarlo con Juan.`:`Figuran en la ruta pero su estado no es Activo. No los retires sin confirmarlo con Juan.`,goto:`pw-perros`,button:`Ver perros`}),e.isToday&&t.length){let n=Tr(e.now.iso,e.shift).length,r=wr(e.now.iso,e.shift),a=t.filter(e=>(r[e.id]||[]).length>=k.length).length;n<yr.length?i.push({kind:`info`,icon:`clipboardCheck`,title:`Equipo: ${n} de ${yr.length} listo`,text:`Revisá el equipo antes de retirar al primer perro.`,goto:`pw-equipo`,button:`Ir al equipo`}):i.push({kind:a===t.length?`ok`:`info`,icon:a===t.length?`checkCircle`:`pawPrint`,title:`Entregados: ${a} de ${t.length}`,text:a===t.length?`Turno completo. ¡Buen trabajo!`:`Equipo listo. Marcá cada retiro, paseo y entrega.`,goto:`pw-perros`,button:`Ver perros`})}return t.length?i.length?`
    <div class="pw-priorities">
      <h2 class="pw-section-label">Lo primero</h2>
      <ol class="pw-prio-list">
        ${i.slice(0,3).map(e=>`
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
    `}function Nr(e,t,n,r){let i=e.isToday?wr(e.now.iso,e.shift):{},a=t.filter(e=>(i[e.id]||[]).length>=k.length).length,o=t.length?Math.round(a/t.length*100):0;return`
    <section class="pw-section" id="pw-perros" aria-labelledby="pw-perros-title" tabindex="-1">
      <div class="pw-section-head">
        <div>
          <h2 id="pw-perros-title">Perros del turno <span class="pw-count">${t.length}</span></h2>
          <p class="pw-muted">Orden de la planilla RPJ. Horario de retiro por perro: Pendiente de confirmar.</p>
        </div>
        ${e.isToday&&t.length?`
          <div class="pw-progress" aria-label="Avance del turno">
            <strong>${a} de ${t.length} entregados</strong>
            <span class="pw-progress-bar" aria-hidden="true"><span style="width:${o}%"></span></span>
          </div>
        `:``}
      </div>

      ${r.length?`
        <div class="pw-banner pw-banner--danger" role="alert">
          ${p(`alertTriangle`,`pw-icon pw-icon--lg`)}
          <div>
            <strong>Hay perros que no se pueden juntar en este turno</strong>
            <ul>${gr(r).map(e=>`<li>${e}</li>`).join(``)}</ul>
            <p>Van en grupos distintos, nunca juntos.</p>
            <p>Si no sabés cómo armar los grupos, consultá con ${j(tr[e.shift].supervisor)} antes de salir.</p>
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
          ${t.map(t=>Pr(t,e,i[t.id]||[],_r(t,r))).join(``)}
        </ul>
        <p class="pw-muted pw-legend">
          Categoría operativa de todos los perros: <b>SIN EVALUAR</b>. ${j(kt[`SIN EVALUAR`])}
          Fuente: Registro maestro, 14/08/2026.
        </p>
      `:`
        <div class="pw-empty">
          <p><strong>Sin perros para ${e.day.toLowerCase()} a la ${e.shift.toLowerCase()}.</strong></p>
          <p>Probá otro día o turno con “Cambiar día o turno”.</p>
        </div>
      `}
    </section>
  `}function Pr(e,t,n,r){let i=Math.min(n.length,k.length),a=i>=k.length,o=e.safety.filter(e=>mr(e)===`danger`).join(` `),s=r.filter(e=>!o.includes(e)),c=e.safety.filter(e=>mr(e)!==`info`),l=e.safety.filter(e=>mr(e)===`info`),u=c.length||r.length;return`
    <li class="pw-dog ${u?`has-alert`:``} ${a?`is-done`:``}" data-pw-dog="${e.id}">
      <div class="pw-dog-head">
        <h3>${j(e.name)}</h3>
        <span class="pw-dog-facts">${j(e.size)} · ${e.minutes?`${e.minutes} min`:`Duración pendiente de confirmar`}</span>
      </div>

      ${u?`
        <ul class="pw-alerts" aria-label="Alertas de seguridad de ${j(e.name)}">
          ${c.map(e=>`
            <li class="pw-alert pw-alert--${mr(e)}">
              ${p(mr(e)===`danger`?`alertTriangle`:`shieldCheck`,`pw-icon`)}
              <span>${j(e)}${mr(e)===`danger`&&r.length?`<b class="pw-today-tag">En este turno: ${dr(r)}</b>`:``}</span>
            </li>
          `).join(``)}
          ${s.length?`
            <li class="pw-alert pw-alert--danger">
              ${p(`alertTriangle`,`pw-icon`)}
              <span>No juntar con ${dr(s)}<b class="pw-today-tag">En este turno</b></span>
            </li>
          `:``}
        </ul>
      `:``}

      ${l.map(e=>`<p class="pw-dog-note">${p(`users`,`pw-icon pw-icon--sm`)} ${j(e)}</p>`).join(``)}
      ${e.review?`<p class="pw-dog-review"><b>Dato a confirmar:</b> ${j(e.review)}</p>`:``}
      <p class="pw-dog-category"><span>SIN EVALUAR</span> Registro maestro 14/08/2026</p>

      ${t.isToday?`
        <ol class="pw-steps" aria-label="Avance de ${j(e.name)}">
          ${k.map((e,t)=>`
            <li class="${t<i?`is-done`:``} ${t===i?`is-next`:``}">
              <span class="pw-step-dot" aria-hidden="true">${t<i?p(`checkCircle`,`pw-icon pw-icon--sm`):t+1}</span>
              <span>${e.label}${t<i?`<small>${j(n[t])}</small>`:``}</span>
              <span class="pw-sr">${t<i?`hecho`:`pendiente`}</span>
            </li>
          `).join(``)}
        </ol>
        <div class="pw-dog-actions">
          ${a?`
            <p class="pw-done-label">${p(`checkCircle`,`pw-icon`)} Entregado ${j(n[k.length-1])}</p>
          `:`
            <button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-step="${e.id}">
              ${k[i].action}
            </button>
          `}
          ${i>0?`
            <button class="pw-btn pw-btn--ghost" type="button" data-pw-undo="${e.id}" aria-label="Deshacer el último paso de ${j(e.name)}">Deshacer</button>
          `:``}
        </div>
      `:``}
    </li>
  `}function Fr(e){let t=Tr(e.now.iso,e.shift),n=t.length>=yr.length;return`
    <section class="pw-section pw-card" id="pw-equipo" aria-labelledby="pw-equipo-title" tabindex="-1">
      <div class="pw-section-head pw-section-head--inline">
        <div>
          <h2 id="pw-equipo-title">Antes de salir</h2>
          <p class="pw-muted">Tu equipo según el inventario. Hoy, turno ${e.shift.toLowerCase()}.</p>
        </div>
        <span class="pw-count ${n?`is-ok`:``}">${t.length}/${yr.length}</span>
      </div>
      <ul class="pw-checklist" role="list">
        ${yr.map(e=>{let n=t.includes(e.item),r=`pw-eq-${e.item.toLowerCase().replace(/[^a-z0-9]+/gi,`-`)}`;return`
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
        ${n?`<button class="pw-btn pw-btn--ghost pw-btn--block" type="button" data-pw-equip-reset>Desmarcar todo</button>`:`<button class="pw-btn pw-btn--primary pw-btn--block" type="button" data-pw-equip-all>Tengo todo</button>`}
      </div>
      <p class="pw-status" role="status">${j(A.equipStatus)}</p>
      ${br.length?`
        <p class="pw-muted pw-small">Lo tiene Juan: ${br.map(e=>`${j(e.item.toLowerCase())} (${e.juan})`).join(`, `)}.</p>
      `:``}
    </section>
  `}function Ir(e,t){let n=Er(),r=[...t.map(e=>e.name),ir];n.dogs.forEach(e=>{r.includes(e)||r.unshift(e)});let i=A.previewOpen?Br(n,e):null;return`
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
          ${Mt.map((e,t)=>{let r=`pw-proto-${t}`;return`
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
          ${nr.map(e=>`
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
          ${rr.map((e,t)=>`
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
          ${A.confirmClear?`¿Seguro? Tocá de nuevo`:`Borrar reporte`}
        </button>
      </div>
      <p class="pw-status ${A.incidentStatus.startsWith(`Falta`)||A.incidentStatus.startsWith(`Cambiá`)?`is-warn`:``}" role="status" data-pw-incident-status>${j(A.incidentStatus)}</p>

      ${i&&i.ok?Lr(i.text):``}
      <p class="pw-muted pw-small">El borrador se guarda solo en este celular hasta que lo borres.</p>
    </section>
  `}function Lr(e){return`
    <div class="pw-preview" data-pw-preview>
      <label class="pw-field" for="pw-message">Mensaje listo</label>
      <textarea id="pw-message" class="pw-message" readonly rows="16" data-pw-message>${j(e)}</textarea>
      <div class="pw-row">
        <a class="pw-btn pw-btn--whatsapp pw-btn--block" data-pw-whatsapp href="${Rr(e)}" target="_blank" rel="noopener noreferrer">
          ${p(`message`,`pw-icon`)}
          Enviar por WhatsApp a Juan
        </a>
        <button class="pw-btn pw-btn--ghost" type="button" data-pw-copy>
          ${p(`copy`,`pw-icon`)}
          Copiar
        </button>
      </div>
    </div>
  `}function Rr(e){return`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(e)}`}function zr(e){let t=[];return e.dogs.length||t.push({label:`los perros involucrados`,focus:`[data-pw-field="dogs"]`}),e.conducta.trim()||t.push({label:`qué hizo el perro`,focus:`[data-pw-field="conducta"]`}),e.riesgo||t.push({label:`el nivel de riesgo`,focus:`[data-pw-field="riesgo"]`}),{missing:t,word:[e.antes,e.conducta,e.accion,e.despues,e.lugar].join(` `).match(ar)?.[0]}}function Br(e,t){let{missing:n,word:r}=zr(e);if(n.length||r)return{ok:!1,missing:n,word:r};let i=lr(t.now),a=(e,t)=>`${e}: ${t.trim()?t.trim():`Sin dato`}`,o=Mt.map((t,n)=>{let r=t.split(/[:.]/)[0];return`- ${e.protocolo.includes(n)?`Hecho`:`Pendiente`}: ${r}`});return{ok:!0,text:[`REPORTE DE INCIDENTE - Paseos Juan`,`Fecha: ${t.now.date} · Hora: ${e.hora||t.now.time} · Turno: ${i.toLowerCase()}`,`Paseador: ${Zn}`,`Perros: ${e.dogs.join(`, `)}`,`Nivel de riesgo: ${e.riesgo}`,a(`Lesiones`,e.lesiones),a(`Lugar`,e.lugar),``,a(`Antes`,e.antes),a(`Conducta observada`,e.conducta),a(`Qué hice`,e.accion),a(`Después`,e.despues),``,`Protocolo:`,...o].join(`
`)}}function Vr(){let e=Er(),t=document.getElementById(`pw-incidente`);return t&&([`hora`,`lugar`,`antes`,`conducta`,`accion`,`despues`].forEach(n=>{let r=t.querySelector(`[data-pw-field="${n}"]`);r&&(e[n]=r.value)}),e.dogs=[...t.querySelectorAll(`[data-pw-field="dogs"]:checked`)].map(e=>e.value),e.protocolo=[...t.querySelectorAll(`[data-pw-field="protocolo"]:checked`)].map(e=>Number(e.value)),e.riesgo=t.querySelector(`[data-pw-field="riesgo"]:checked`)?.value||``,e.lesiones=t.querySelector(`[data-pw-field="lesiones"]:checked`)?.value||``),e}function Hr(){let e=Vr();return sr(er,e),e}function Ur(e){if(!A.previewOpen)return;let t=Br(e,ur()),n=document.querySelector(`[data-pw-preview]`),r=document.querySelector(`[data-pw-incident-status]`);if(!t.ok){n?.remove(),A.previewOpen=!1,A.incidentStatus=`Cambiaste el reporte: tocá “Armar mensaje para Juan” de nuevo.`,r&&(r.textContent=A.incidentStatus,r.classList.add(`is-warn`));return}let i=document.querySelector(`[data-pw-message]`),a=document.querySelector(`[data-pw-whatsapp]`);i&&(i.value=t.text),a&&(a.href=Rr(t.text))}function M(e){let t=document.getElementById(`pw-live`);t||(t=document.createElement(`div`),t.id=`pw-live`,t.className=`pw-sr`,t.setAttribute(`aria-live`,`polite`),t.setAttribute(`role`,`status`),document.body.appendChild(t)),t.textContent=``,requestAnimationFrame(()=>{t.textContent=e})}function N(e){$(),e&&document.querySelector(e)?.focus({preventScroll:!0})}function Wr(){return document.documentElement.dataset.motion===`calm`?`auto`:`smooth`}function Gr(e){let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:Wr(),block:`start`}),t.focus({preventScroll:!0}))}async function Kr(e){try{return await navigator.clipboard.writeText(e),!0}catch{let e=document.querySelector(`[data-pw-message]`);if(!e)return!1;e.select();try{return document.execCommand(`copy`)}catch{return!1}}}function qr(e){if(!e.target.closest(`.pw-shell`))return!1;if(e.target.closest(`[data-pw-logout]`))return gs(`/login`),!0;let t=e.target.closest(`[data-pw-goto]`);if(t)return Gr(t.dataset.pwGoto),!0;if(e.target.closest(`[data-pw-picker]`))return A.pickerOpen=!A.pickerOpen,N(`[data-pw-picker]`),!0;let n=e.target.closest(`[data-pw-day]`);if(n){let e=cr(),t=n.dataset.pwDay;return A.day=t===e.day?null:t,N(`[data-pw-day="${t}"]`),M(`Mostrando ${t.toLowerCase()}.`),!0}let r=e.target.closest(`[data-pw-shift]`);if(r)return A.shift=r.dataset.pwShift,N(`[data-pw-shift="${A.shift}"]`),M(`Mostrando el turno ${A.shift.toLowerCase()}.`),!0;if(e.target.closest(`[data-pw-today]`))return A.day=null,A.shift=null,A.pickerOpen=!1,N(`#pw-today-title`),M(`Mostrando hoy.`),!0;let i=e.target.closest(`[data-pw-step]`);if(i){let e=i.dataset.pwStep,t=ur();if(!t.isToday)return!0;let n=wr(t.now.iso,t.shift),r=n[e]||[];if(r.length>=k.length)return!0;let a=k[r.length];n[e]=[...r,t.now.time],Cr(Qn,t.now.iso,Sr(t.now.iso,t.shift),n);let o=w.find(t=>t.id===e);return N(n[e].length>=k.length?`[data-pw-undo="${e}"]`:`[data-pw-step="${e}"]`),M(`${o?.name||`Perro`}: ${a.done.toLowerCase()} a las ${t.now.time}.`),!0}let a=e.target.closest(`[data-pw-undo]`);if(a){let e=a.dataset.pwUndo,t=ur(),n=wr(t.now.iso,t.shift),r=n[e]||[];if(!r.length)return!0;n[e]=r.slice(0,-1),Cr(Qn,t.now.iso,Sr(t.now.iso,t.shift),n);let i=w.find(t=>t.id===e);return N(`[data-pw-step="${e}"]`),M(`${i?.name||`Perro`}: se deshizo "${k[r.length-1].done.toLowerCase()}".`),!0}if(e.target.closest(`[data-pw-equip-all]`)){let e=ur();return Cr($n,e.now.iso,Sr(e.now.iso,e.shift),yr.map(e=>e.item)),A.equipStatus=`Equipo completo. ¡A salir!`,N(`[data-pw-equip-reset]`),M(A.equipStatus),!0}if(e.target.closest(`[data-pw-equip-reset]`)){let e=ur();return Cr($n,e.now.iso,Sr(e.now.iso,e.shift),[]),A.equipStatus=`Lista de equipo desmarcada.`,N(`[data-pw-equip-all]`),M(A.equipStatus),!0}if(e.target.closest(`[data-pw-generate]`)){let e=Br(Hr(),ur());return A.confirmClear=!1,e.ok?(A.previewOpen=!0,A.incidentStatus=`Mensaje listo. Revisalo y mandalo por WhatsApp.`,N(`[data-pw-message]`),M(A.incidentStatus),!0):(A.previewOpen=!1,A.incidentStatus=e.missing.length?`Falta completar: ${dr(e.missing.map(e=>e.label))}.`:`Cambiá “${e.word}” por lo que viste. Ej.: “gruñó y mostró los dientes”.`,N(e.missing.length?e.missing[0].focus:`[data-pw-field="conducta"]`),M(A.incidentStatus),!0)}if(e.target.closest(`[data-pw-copy]`))return Kr(document.querySelector(`[data-pw-message]`)?.value||``).then(e=>{A.incidentStatus=e?`Texto copiado. Pegalo en el chat con Juan.`:`No se pudo copiar: mantené apretado el texto y copialo a mano.`;let t=document.querySelector(`[data-pw-incident-status]`);t&&(t.textContent=A.incidentStatus,t.classList.toggle(`is-warn`,!e)),M(A.incidentStatus)}),!0;if(e.target.closest(`[data-pw-clear]`)){if(!A.confirmClear)return A.confirmClear=!0,N(`[data-pw-clear]`),!0;try{localStorage.removeItem(er)}catch{}return A.confirmClear=!1,A.previewOpen=!1,A.incidentStatus=`Reporte borrado.`,N(`#pw-incidente`),M(A.incidentStatus),!0}if(A.confirmClear&&!e.target.closest(`[data-pw-clear]`)){A.confirmClear=!1;let e=document.querySelector(`[data-pw-clear]`);e&&(e.textContent=`Borrar reporte`,e.classList.remove(`is-confirm`))}return!1}function Jr(e){let t=e.target.closest(`[data-pw-equip]`);if(t){let e=ur(),n=Tr(e.now.iso,e.shift),r=t.dataset.pwEquip,i=t.checked?[...new Set([...n,r])]:n.filter(e=>e!==r);return Cr($n,e.now.iso,Sr(e.now.iso,e.shift),i),A.equipStatus=i.length>=yr.length?`Equipo completo. ¡A salir!`:``,N(`[data-pw-equip="${r}"]`),A.equipStatus&&M(A.equipStatus),!0}return e.target.closest(`[data-pw-field]`)?(Ur(Hr()),!0):!1}function Yr(e){e.target.closest?.(`[data-pw-field]`)&&Ur(Hr())}function Xr(){be.push(qr),xe.push(Jr),document.addEventListener(`input`,Yr)}var Zr=`America/Argentina/Buenos_Aires`,Qr=[`manana`,`tarde`],$r=[`Paseador asignado`,`Sebastián`],ei=/(^|[^a-záéíóúñ])(agresiv[oa]s?|agresividad|mal[oa]s?|dominantes?|dominancia)(?=$|[^a-záéíóúñ])/i,P={view:`paseosJuanSupervisor_vista`,folds:`paseosJuanSupervisor_plegado`,control:`paseosJuanSupervisor_control`,closure:`paseosJuanSupervisor_cierre`,routes:`paseosJuanSupervisor_rutas`,routeDraft:`paseosJuanSupervisor_rutaBorrador`,observations:`paseosJuanSupervisor_observaciones`,observationDraft:`paseosJuanSupervisor_observacionBorrador`},ti=null,ni=null,ri=null;function F(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function I(e,t){try{let n=JSON.parse(localStorage.getItem(e));return n==null||Array.isArray(t)!==Array.isArray(n)||typeof n!=typeof t?t:n}catch{return t}}function L(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function R(e,t,n=`ok`){ti={area:e,text:t,tone:n}}function ii(e){return ti&&ti.area===e?ti:null}function ai(e){let t=ii(e);return`
    <p class="sv-status ${t?`is-${t.tone}`:``}" role="status" aria-live="polite">${t?F(t.text):``}</p>
  `}function oi(e,t=`y`){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} ${t} ${e[e.length-1]}`}function si(e){let[t,n]=String(e).split(`:`).map(Number);return t*60+n}function ci(){let e=Object.fromEntries(new Intl.DateTimeFormat(`en-CA`,{timeZone:Zr,year:`numeric`,month:`2-digit`,day:`2-digit`,hour:`2-digit`,minute:`2-digit`,hourCycle:`h23`}).formatToParts(new Date).map(e=>[e.type,e.value])),t=`${e.year}-${e.month}-${e.day}`,n=new Date(`${t}T12:00:00Z`).getUTCDay();return{iso:t,label:`${e.day}/${e.month}/${e.year}`,time:`${e.hour}:${e.minute}`,minutes:Number(e.hour)*60+Number(e.minute),dayName:S[(n+6)%7]}}function li(e){return e.minutes<si(`13:30`)?`manana`:`tarde`}function ui(e){let t=x[e];return t.routes||[t.route]}function di(e,t){let n=x[e];return t.minutes<si(n.from)?{label:`Arranca ${n.from} hs`,tone:`next`}:t.minutes<=si(n.to)?{label:`En curso`,tone:`live`}:{label:`Terminado`,tone:`done`}}function z(){let e=ci(),t=I(P.view,{}),n={day:e.dayName,shift:li(e)},r=t.date===e.iso?{...n,...t}:n;return S.includes(r.day)||(r.day=n.day),Qr.includes(r.shift)||(r.shift=n.shift),{...r,now:e,isToday:r.day===e.dayName}}function fi(e){L(P.view,{date:ci().iso,day:e.day,shift:e.shift})}function pi(e,t=!1){let n=I(P.folds,{});return typeof n[e]==`boolean`?n[e]:t}function mi(e){return`${e.now.iso}|${e.shift}`}function hi(e){return I(P.control,{})[mi(e)]||{}}function gi(e,t){let n=I(P.control,{});n[mi(e)]=t,L(P.control,n)}function _i(e){return I(P.closure,{})[mi(e)]||{}}function vi(e,t){let n=I(P.closure,{});n[mi(e)]=t,L(P.closure,n)}function yi(e){return w.find(t=>t.id===e)}function bi(e,t){return Pt(e,x[t].label)}function xi(e){return e.safety.some(e=>/bozal/i.test(e))}function Si(e){return e.safety.find(e=>/bozal/i.test(e))||``}function Ci(e){let t=new Set(e.map(e=>e.name)),n=new Set,r=[];return e.forEach(e=>{(e.incompatibleWith||[]).forEach(i=>{if(!t.has(i))return;let a=[e.name,i].sort().join(`|`);n.has(a)||(n.add(a),r.push([e.name,i]))})}),r}function wi(e){let t=new Set(e.map(e=>e.size));return{pairs:Ci(e),muzzle:e.filter(xi),review:e.filter(e=>e.review),inactive:e.filter(e=>e.status!==`Activo`),unevaluated:e.filter(e=>e.category===`SIN EVALUAR`),sizeMix:t.has(`Pequeño`)&&t.has(`Grande`)}}function Ti(e){return e.map(([e,t])=>`${e} con ${t}`)}function Ei(e){let t=wi(e),n=[];if(t.pairs.length&&n.push({tone:`danger`,icon:`alertTriangle`,title:t.pairs.length===1?`Hay 2 perros que no pueden ir juntos`:`Hay ${t.pairs.length} parejas que no pueden ir juntas`,lines:Ti(t.pairs).map(e=>`No juntar: ${e}.`),action:`Armá grupos o rutas separadas antes de salir.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),t.muzzle.length&&n.push({tone:`warn`,icon:`shieldCheck`,title:`Confirmá el bozal de ${t.muzzle.length} perro${t.muzzle.length===1?``:`s`}`,lines:t.muzzle.map(e=>`${e.name}: ${Si(e)}.`),action:`Que salga con el bozal puesto y revisado.`,source:`Fuente: indicaciones de seguridad de la planilla RPJ.`}),t.inactive.length&&n.push({tone:`warn`,icon:`alertCircle`,title:`Confirmá si ${t.inactive.length===1?`sale ${t.inactive[0].name}`:`salen ${t.inactive.length} perros`}`,lines:t.inactive.map(e=>`${e.name} (${e.status}): ${e.review||`Pendiente de confirmar`}`),action:`Preguntale a Juan antes de retirarlo.`,source:`Fuente: Perros paseados (noviembre) y BASE RUTAS.`}),t.review.length){let e=t.review.filter(e=>e.status===`Activo`);e.length&&n.push({tone:`info`,icon:`fileText`,title:`${e.length} perro${e.length===1?` tiene`:`s tienen`} datos a revisar`,lines:e.map(e=>`${e.name}: ${e.review}`),action:`No frena el paseo. Anotalo para coordinación.`,source:`Fuente: datos cargados al ${y}.`})}return t.unevaluated.length>1&&n.push({tone:`info`,icon:`eye`,title:`${t.unevaluated.length} perros salen en grupo SIN EVALUAR`,lines:[`${kt[`SIN EVALUAR`]} Observá cómo se comportan en grupo y registrá lo que veas.`],action:`Usá «Registrar observación de conducta».`,source:`Fuente: Registro maestro de perros, 14/08/2026.`}),n}function Di(){return I(P.routes,[])}function Oi(e){L(P.routes,e)}function ki(e,t){return Di().filter(n=>n.day===e&&n.shift===t)}function Ai(e){return{day:e.day,shift:e.shift,route:ui(e.shift)[0],walker:$r[0],dogIds:[],notes:``,confirm:!1,reason:``,showAll:!1,editingId:null}}function ji(e){let t=I(P.routeDraft,{});if(t.day!==e.day||t.shift!==e.shift)return Ai(e);let n={...Ai(e),...t};return n.dogIds=Array.isArray(n.dogIds)?n.dogIds.filter(e=>yi(e)):[],ui(e.shift).includes(n.route)||(n.route=ui(e.shift)[0]),$r.includes(n.walker)||(n.walker=$r[0]),n}function B(e){L(P.routeDraft,e)}function Mi(e){let t=e.dogIds.map(yi).filter(Boolean),n=wi(t),r=new Set(bi(e.day,e.shift).map(e=>e.id)),i=ki(e.day,e.shift).filter(t=>t.id!==e.editingId),a=[],o=[];if(Ti(n.pairs).forEach(e=>a.push({tone:`danger`,text:`Incompatibles: ${e}. No pueden ir en la misma ruta.`})),n.sizeMix){let e=t.filter(e=>e.size===`Pequeño`).map(e=>e.name),n=t.filter(e=>e.size===`Grande`).map(e=>e.name);a.push({tone:`warn`,text:`Tamaños mezclados: pequeños (${e.join(`, `)}) con grandes (${n.join(`, `)}).`})}return n.muzzle.forEach(e=>o.push({tone:`warn`,text:`${e.name}: ${Si(e)}. Confirmá el bozal antes de salir.`})),n.inactive.forEach(e=>o.push({tone:`warn`,text:`${e.name} figura como «${e.status}». Confirmá con Juan antes de sumarlo.`})),t.filter(e=>!r.has(e.id)).forEach(t=>o.push({tone:`info`,text:`${t.name} no figura en BASE RUTAS para ${e.day} a la ${x[e.shift].label.toLowerCase()}.`})),t.forEach(e=>{let t=i.find(t=>t.dogIds.includes(e.id));t&&o.push({tone:`info`,text:`${e.name} ya está en la ruta ${t.route} guardada para este turno.`})}),{dogs:t,conflicts:a,warnings:o}}var Ni=[{key:`lugar`,label:`Lugar`,hint:`Dónde pasó (calle, plaza, entrada del barrio). Sin domicilios.`,type:`input`},{key:`estimulo`,label:`Estímulo: qué pasó antes`,hint:`Ej.: se cruzó un perro suelto a 5 metros.`,type:`textarea`},{key:`reaccion`,label:`Reacción: qué hizo el perro`,hint:`Lo que se vio y se oyó. Ej.: ladró, se paró en dos patas y tiró de la correa.`,type:`textarea`},{key:`accion`,label:`Acción: qué hiciste vos`,hint:`Ej.: crucé de vereda y le di distancia.`,type:`textarea`},{key:`resultado`,label:`Resultado: cómo terminó`,hint:`Ej.: a los 30 segundos se calmó y siguió caminando.`,type:`textarea`}];function Pi(e){return{dogId:``,fecha:e.now.label,hora:``,lugar:``,estimulo:``,reaccion:``,accion:``,resultado:``,seguimiento:!1}}function Fi(e){return{...Pi(e),...I(P.observationDraft,{})}}function Ii(){return I(P.observations,[])}function Li(e){let t=yi(e.dogId);return[`Observación de conducta — ${b.name}`,`Perro: ${t?t.name:v}`,`Fecha: ${e.fecha}${e.hora?` · ${e.hora} hs`:``}`,`Lugar: ${e.lugar}`,`Estímulo: ${e.estimulo}`,`Reacción: ${e.reaccion}`,`Acción: ${e.accion}`,`Resultado: ${e.resultado}`,`Seguimiento: ${e.seguimiento?`Sí, requiere seguimiento`:`No`}`,`Registró: ${e.autor||`Pendiente de confirmar`}`].join(`
`)}function Ri(e,t){let n=x[e.shift],r=hi(e),i=_i(e),a=wi(t),o=ki(e.day,e.shift),s=t.filter(e=>!r[e.id]?.ausente),c=s.filter(e=>r[e.id]?.retiro),l=s.filter(e=>r[e.id]?.entrega),u=t.filter(e=>r[e.id]?.ausente),d=s.filter(e=>!r[e.id]?.entrega),f=Ii().filter(t=>t.fecha===e.now.label&&t.shift===e.shift),ee=[`Cierre de turno — ${b.name}`,`Fecha: ${e.now.label} (${e.day})`,`Turno: ${n.label} (${n.from} a ${n.to} hs) · Supervisa: ${n.supervisor}`,`Rutas: ${ui(e.shift).join(` y `)}`,...o.map(e=>`- ${e.route} (${e.walker}): ${e.dogIds.map(e=>yi(e)?.name).filter(Boolean).join(`, `)}`),`Perros previstos: ${t.length}`,`Retirados: ${c.length} de ${s.length} · Entregados: ${l.length} de ${s.length}`,`No salieron: ${u.length?u.map(e=>e.name).join(`, `):`ninguno`}`,`Sin entrega marcada: ${d.length?d.map(e=>e.name).join(`, `):`ninguno`}`,`Seguridad del turno:`,`- No juntar: ${a.pairs.length?Ti(a.pairs).join(`; `):`sin incompatibles en el turno`}`,`- Bozal: ${a.muzzle.length?a.muzzle.map(e=>e.name).join(`, `):`nadie en este turno`}`,`Observaciones de conducta registradas hoy en este turno: ${f.length}`,`Notas del supervisor: ${i.notas?.trim()||`sin notas`}`];return i.cerrado&&ee.push(`Turno cerrado a las ${i.cerrado} hs.`),ee.join(`
`)}function zi(e){return`
    <div class="sv-shell">
      ${Bi()}
      ${e}
    </div>
  `}function Bi(){return`
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
  `}function Vi(){let e=z(),t=bi(e.day,e.shift),n=`
    <main class="sv-main" id="sv-main">
      ${Hi(e,t)}
      ${Ui(e,t)}
      ${Ki(e,t)}
      ${Ji(e)}
      ${Xi(e,t)}
      ${Qi(e,t)}
      ${$i()}
    </main>
  `;return ti=null,n}function Hi(e,t){let n=x[e.shift],r=e.isToday?di(e.shift,e.now):null,i=e.shift===`manana`?`tarde`:`manana`,a=bi(e.day,i).length,o=ki(e.day,e.shift),s=ui(e.shift),c=t.filter(e=>e.status===`Activo`).length;return`
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
            ${Qr.map(t=>`
              <button type="button" id="sv-shift-${t}" class="sv-segment-option ${e.shift===t?`is-active`:``}" data-sv-shift="${t}" aria-pressed="${e.shift===t}">
                ${x[t].label}
                <small>${bi(e.day,t).length} perros</small>
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
        ${s.map(e=>{let n=o.find(t=>t.route===e),r=n?`${n.dogIds.length} perros (ruta armada)`:s.length===1?`${t.length} perros`:`Reparto: ${v}`;return`
            <li>
              <span class="sv-route-code">${e}</span>
              <span class="sv-route-walker">${p(`userCheck`,`sv-icon`)} ${F(n?.walker||$r[0])}</span>
              <span class="sv-route-count">${r}</span>
            </li>
          `}).join(``)}
      </ul>
      ${s.length>1&&o.length<s.length?`
        <p class="sv-hint">La planilla no dice qué perros van en cada ruta de la tarde: armalas en «Armar rutas del turno».</p>
      `:``}
    </section>
  `}function Ui(e,t){if(!t.length)return`
      <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
        <h2 id="sv-safety-title" class="sv-title">${p(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p class="sv-empty">No hay perros cargados en BASE RUTAS para ${F(e.day)} a la ${x[e.shift].label.toLowerCase()}.</p>
      </section>
    `;let n=Ei(t),r=n.slice(0,3),i=n.slice(3);return`
    <section class="sv-card sv-safety" aria-labelledby="sv-safety-title">
      <div class="sv-section-head">
        <h2 id="sv-safety-title" class="sv-title">${p(`shieldCheck`,`sv-icon`)} Seguridad del turno</h2>
        <p>Lo primero que tenés que resolver antes de salir. Máximo 3 prioridades.</p>
      </div>
      ${r.length?`
        <ol class="sv-priorities">
          ${r.map((e,t)=>Wi(e,t+1)).join(``)}
        </ol>
      `:`<p class="sv-note is-ok">Sin incompatibles, bozales ni datos a revisar en este turno.</p>`}
      ${i.length?`
        <details class="sv-more" data-sv-fold="avisos" ${pi(`avisos`)?`open`:``}>
          <summary>Más avisos del detector (${i.length})</summary>
          <ul class="sv-more-list">
            ${i.map(e=>Wi(e)).join(``)}
          </ul>
        </details>
      `:``}
    </section>
  `}function Wi(e,t){return`
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
  `}function Gi(e){let t=e.safety.map(e=>{let t=/no juntar/i.test(e)?`danger`:/bozal/i.test(e)?`warn`:`neutral`;return`<li class="sv-chip is-${t}">${t===`neutral`?F(e):`<b>${F(e)}</b>`}</li>`});return e.status!==`Activo`&&t.unshift(`<li class="sv-chip is-danger"><b>Estado:</b> ${F(e.status)}</li>`),e.review&&t.push(`<li class="sv-chip is-info"><b>Dato a revisar</b></li>`),e.category!==`SIN EVALUAR`&&t.push(`<li class="sv-chip is-neutral"><b>${F(e.category)}</b> · ${F(e.categorySource)}</li>`),t.length?`<ul class="sv-chips" aria-label="Avisos de ${F(e.name)}">${t.join(``)}</ul>`:``}function Ki(e,t){let n=pi(`perros`,!0),r=hi(e),i=t.filter(e=>!r[e.id]?.ausente),a=i.filter(e=>r[e.id]?.retiro).length,o=i.filter(e=>r[e.id]?.entrega).length,s=t.length-i.length,c=t.length&&t.every(e=>e.category===`SIN EVALUAR`);return`
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
            ${t.map(t=>qi(t,r[t.id]||{},e.isToday)).join(``)}
          </ul>
          ${ai(`control`)}
        `:`<p class="sv-empty">No hay perros para este día y turno.</p>`}
      </div>
    </details>
  `}function qi(e,t,n){let r=!!t.ausente;return`
    <li class="sv-dog ${r?`is-absent`:``} ${t.entrega?`is-done`:``}">
      <div class="sv-dog-info">
        <div class="sv-dog-head">
          <h3>${F(e.name)}</h3>
          ${n&&!r&&!t.retiro?`<button type="button" class="sv-link" id="sv-absent-${e.id}" data-sv-absent="${e.id}" aria-label="${F(e.name)} no sale hoy">No sale hoy</button>`:``}
        </div>
        <p>${F(e.size)} · ${e.minutes?`${e.minutes} min`:v} · ${F(e.plan)}</p>
        ${Gi(e)}
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
  `}function Ji(e){let t=pi(`rutas`),n=ji(e),r=Mi(n),i=ki(e.day,e.shift),a=new Set(bi(e.day,e.shift).map(e=>e.id)),o=n.showAll?w:w.filter(e=>a.has(e.id)||n.dogIds.includes(e.id)),s=i.filter(e=>e.id!==n.editingId),c=r.conflicts.length>0;return`
    <details class="sv-fold" data-sv-fold="rutas" ${t?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`route`,`sv-icon`)} Armar rutas del turno</span>
        <span class="sv-fold-meta">${i.length?`${i.length} guardada${i.length===1?``:`s`}`:`Sin rutas armadas`}</span>
      </summary>
      <div class="sv-fold-body">
        ${i.length?`
          <h3 class="sv-subtitle">Rutas guardadas · ${F(e.day)} ${x[e.shift].label.toLowerCase()}</h3>
          <ul class="sv-saved-routes">
            ${i.map(e=>Yi(e)).join(``)}
          </ul>
        `:``}

        <form class="sv-builder" data-sv-route-form novalidate>
          <h3 class="sv-subtitle">${n.editingId?`Editar ruta`:`Nueva ruta`} · ${F(e.day)} ${x[e.shift].label.toLowerCase()}</h3>
          <div class="sv-form-grid">
            <label class="sv-field" for="sv-route-code">Ruta
              <select id="sv-route-code" data-sv-route-field="route">
                ${ui(e.shift).map(e=>`<option ${e===n.route?`selected`:``}>${e}</option>`).join(``)}
              </select>
            </label>
            <label class="sv-field" for="sv-route-walker">Paseador
              <select id="sv-route-walker" data-sv-route-field="walker">
                ${$r.map(e=>`<option ${e===n.walker?`selected`:``}>${e}</option>`).join(``)}
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
                ${o.map(e=>{let t=n.dogIds.includes(e.id),r=s.find(t=>t.dogIds.includes(e.id)),i=[xi(e)?`<span class="sv-tag is-warn">Bozal</span>`:``,e.incompatibleWith?.length?`<span class="sv-tag is-danger">No juntar con ${F(oi(e.incompatibleWith,`ni`))}</span>`:``,e.status===`Activo`?``:`<span class="sv-tag is-danger">${F(e.status)}</span>`,a.has(e.id)?``:`<span class="sv-tag is-info">Fuera de este turno</span>`,r?`<span class="sv-tag is-neutral">Ya en ${r.route}</span>`:``].join(``);return`
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
          ${ai(`route`)}
        </form>
      </div>
    </details>
  `}function Yi(e){let t=e.dogIds.map(e=>yi(e)?.name).filter(Boolean),n=ni===e.id;return`
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
  `}function Xi(e,t){let n=pi(`observaciones`),r=Fi(e),i=Ii(),a=new Set(t.map(e=>e.id)),o=w.filter(e=>!a.has(e.id));return`
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
          ${Ni.map(e=>`
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
          ${ai(`observation`)}
        </form>

        ${i.length?`
          <h3 class="sv-subtitle">Registradas en este dispositivo</h3>
          <ul class="sv-obs-list">
            ${i.map(e=>Zi(e)).join(``)}
          </ul>
        `:``}
      </div>
    </details>
  `}function Zi(e){let t=yi(e.dogId),n=ri===e.id;return`
    <li class="sv-obs ${e.seguimiento?`needs-follow`:``}">
      <div class="sv-saved-head">
        <strong>${F(t?t.name:v)}</strong>
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
  `}function Qi(e,t){let n=pi(`cierre`),r=_i(e);if(!e.isToday)return`
      <details class="sv-fold" data-sv-fold="cierre" ${n?`open`:``}>
        <summary>
          <span class="sv-fold-title">${p(`flag`,`sv-icon`)} Cerrar el turno</span>
          <span class="sv-fold-meta">Solo para hoy</span>
        </summary>
        <div class="sv-fold-body">
          <p class="sv-empty">El cierre se hace el mismo día del turno. Tocá «Volver a hoy».</p>
        </div>
      </details>
    `;let i=Ri(e,t);return`
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
        ${ai(`closure`)}
      </div>
    </details>
  `}function $i(){return`
    <details class="sv-fold" data-sv-fold="referencias" ${pi(`referencias`)?`open`:``}>
      <summary>
        <span class="sv-fold-title">${p(`help`,`sv-icon`)} Categorías y fuentes</span>
        <span class="sv-fold-meta">Referencia</span>
      </summary>
      <div class="sv-fold-body">
        <dl class="sv-categories">
          ${Object.entries(kt).map(([e,t])=>`
            <div class="is-${e===`SIN EVALUAR`?`none`:e.toLowerCase()}"><dt>${e}</dt><dd>${t}</dd></div>
          `).join(``)}
        </dl>
        <p class="sv-hint">Las categorías son operativas, no diagnósticos. Hoy todos los perros figuran SIN EVALUAR (Registro maestro de perros, 14/08/2026).</p>
        <ul class="sv-sources">
          <li>Rutas, días y turnos: ${b.officialSources.routes}, leída el ${y}.</li>
          <li>Perros: ${b.officialSources.dogs}.</li>
          <li>Qué perros van en PJ_1T y en PJ_2T: ${v}.</li>
          <li>Lo que cargás en esta pantalla se guarda solo en este dispositivo.</li>
        </ul>
      </div>
    </details>
  `}function V(e){$(),e&&document.getElementById(e)?.focus({preventScroll:!0})}function ea(){return ci().time}async function ta(e,t){try{return await navigator.clipboard.writeText(e),!0}catch{let e=t&&document.getElementById(t);if(e){e.focus(),e.select();try{return document.execCommand(`copy`)}catch{return!1}}return!1}}function na(e,t,n){let r=z();if(!r.isToday)return;let i=hi(r),a={...i[e]||{}},o=yi(e);t===`ausente`?(a.ausente=!a.ausente,a.ausente&&(delete a.retiro,delete a.entrega),R(`control`,a.ausente?`${o.name}: no sale hoy.`:`${o.name}: vuelve a la lista.`)):a[t]?(delete a[t],t===`retiro`&&delete a.entrega,R(`control`,`${o.name}: ${t===`retiro`?`retiro`:`entrega`} desmarcado.`,`info`)):(a[t]=ea(),R(`control`,`${o.name}: ${t===`retiro`?`retirado`:`entregado`} a las ${a[t]} hs.`)),i[e]=a,gi(r,i),V(n)}function ra(){let e=z(),t=ji(e),n=Mi(t);if(!n.dogs.length)return R(`route`,`Elegí al menos un perro para guardar la ruta.`,`error`),V(`sv-route-save`);if(n.conflicts.length&&!t.confirm)return R(`route`,`La ruta tiene conflictos: marcá «Revisé el conflicto» para guardarla igual.`,`error`),V(`sv-route-confirm`);if(n.conflicts.length&&!t.reason.trim())return R(`route`,`Escribí qué medida vas a tomar para guardar una ruta con conflicto.`,`error`),V(`sv-route-reason`);let r=ci(),i={id:t.editingId||`ruta-${Date.now()}`,day:t.day,shift:t.shift,route:t.route,walker:t.walker,dogIds:n.dogs.map(e=>e.id),notes:t.notes.trim(),conflicts:n.conflicts.map(e=>e.text),reason:n.conflicts.length?t.reason.trim():``,savedAt:`${r.label} ${r.time} hs`},a=Di(),o=a.findIndex(e=>e.id===i.id);return o>=0?a[o]=i:a.push(i),Oi(a),B(Ai(e)),R(`route`,`Ruta ${i.route} guardada con ${i.dogIds.length} perros${i.conflicts.length?` (conflicto confirmado)`:``}.`),V(`sv-route-save`)}function ia(e){let t=z(),n=Fi(t);e.querySelectorAll(`[data-sv-obs]`).forEach(e=>{n[e.dataset.svObs]=e.type===`checkbox`?e.checked:e.value}),L(P.observationDraft,n);let r=[];if(n.dogId||r.push(`perro`),n.fecha||r.push(`fecha`),Ni.forEach(e=>{String(n[e.key]).trim()||r.push(e.label.split(`:`)[0].toLowerCase())}),!r.length&&!/^\d{2}\/\d{2}\/\d{4}$/.test(n.fecha.trim()))return R(`observation`,`Escribí la fecha como DD/MM/AAAA, por ejemplo 12/11/2026.`,`error`),V(`sv-obs-fecha`);if(r.length)return R(`observation`,`Falta completar: ${oi(r)}.`,`error`),V(n.dogId?n.fecha?`sv-obs-${Ni.find(e=>!String(n[e.key]).trim()).key}`:`sv-obs-fecha`:`sv-obs-dog`);let i=Ni.find(e=>ei.test(n[e.key]));if(i){let e=n[i.key].match(ei)[2];return R(`observation`,`En «${i.label.split(`:`)[0]}» aparece «${e}». Cambialo por lo que se vio: por ejemplo «ladró y tiró de la correa hacia el otro perro».`,`error`),V(`sv-obs-${i.key}`)}let a={...n,id:`obs-${Date.now()}`,shift:t.shift,autor:`Supervisión turno ${x[t.shift].label.toLowerCase()}`};return L(P.observations,[a,...Ii()]),L(P.observationDraft,Pi(t)),R(`observation`,`Observación de ${yi(n.dogId)?.name} guardada en este dispositivo.`),V(`sv-obs-save`)}function aa(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.closest(`[data-sv-logout]`))return gs(`/login`),!0;let n=t.closest(`[data-sv-shift]`);if(n)return fi({...z(),shift:n.dataset.svShift}),V(n.id),!0;if(t.closest(`[data-sv-today]`)){let e=ci();return fi({day:e.dayName,shift:li(e)}),V(`sv-day`),!0}let r=t.closest(`[data-sv-pickup]`);if(r)return na(r.dataset.svPickup,`retiro`,r.id),!0;let i=t.closest(`[data-sv-deliver]`);if(i)return na(i.dataset.svDeliver,`entrega`,i.id),!0;let a=t.closest(`[data-sv-absent]`);if(a){let e=a.dataset.svAbsent,t=hi(z())[e]?.ausente;return na(e,`ausente`,t?`sv-pickup-${e}`:`sv-absent-${e}`),!0}let o=t.closest(`[data-sv-order]`);if(o){let e=ji(z()),t=e.dogIds,n=t.indexOf(o.dataset.dog),r=o.dataset.svOrder===`up`?n-1:n+1;n>=0&&r>=0&&r<t.length&&([t[n],t[r]]=[t[r],t[n]],B(e));let i=t.indexOf(o.dataset.dog);return V((o.dataset.svOrder===`up`?i===0:i===t.length-1)?`sv-${o.dataset.svOrder===`up`?`down`:`up`}-${o.dataset.dog}`:o.id),!0}if(t.closest(`[data-sv-route-reset]`))return B(Ai(z())),R(`route`,`Borrador vacío.`,`info`),V(`sv-route-code`),!0;let s=t.closest(`[data-sv-route-edit]`);if(s){let e=Di().find(e=>e.id===s.dataset.svRouteEdit);return e&&(B({day:e.day,shift:e.shift,route:e.route,walker:e.walker,dogIds:[...e.dogIds],notes:e.notes||``,confirm:!1,reason:e.reason||``,showAll:!1,editingId:e.id}),R(`route`,`Editando ${e.route}. Si sigue con conflicto, vas a tener que confirmarlo de nuevo.`,`info`)),V(`sv-route-code`),!0}let c=t.closest(`[data-sv-route-delete]`);if(c)return ni=c.dataset.svRouteDelete,V(`sv-route-del-no-${ni}`),!0;let l=t.closest(`[data-sv-route-delete-ok]`);if(l){let e=l.dataset.svRouteDeleteOk,t=Di().find(t=>t.id===e);Oi(Di().filter(t=>t.id!==e));let n=z();return ji(n).editingId===e&&B(Ai(n)),ni=null,R(`route`,`Ruta ${t?.route||``} borrada.`,`info`),V(`sv-route-code`),!0}if(t.closest(`[data-sv-route-delete-cancel]`)){let e=ni;return ni=null,V(`sv-route-del-${e}`),!0}let u=t.closest(`[data-sv-obs-copy]`);if(u){let e=Ii().find(e=>e.id===u.dataset.svObsCopy);return e&&ta(Li(e)).then(e=>{R(`observation`,e?`Texto copiado. Pegalo en el registro o en WhatsApp.`:`No se pudo copiar automáticamente en este navegador.`,e?`ok`:`error`),V(u.id)}),!0}let d=t.closest(`[data-sv-obs-delete]`);if(d)return ri=d.dataset.svObsDelete,V(`sv-obs-del-no-${ri}`),!0;let f=t.closest(`[data-sv-obs-delete-ok]`);if(f)return L(P.observations,Ii().filter(e=>e.id!==f.dataset.svObsDeleteOk)),ri=null,R(`observation`,`Observación borrada.`,`info`),V(`sv-obs-save`),!0;if(t.closest(`[data-sv-obs-delete-cancel]`)){let e=ri;return ri=null,V(`sv-obs-del-${e}`),!0}if(t.closest(`[data-sv-close-copy]`)){let e=z();return ta(Ri(e,bi(e.day,e.shift)),`sv-close-summary`).then(e=>{R(`closure`,e?`Resumen copiado. Pegalo en el grupo del equipo.`:`No se pudo copiar: seleccioná el texto del resumen y copialo a mano.`,e?`ok`:`error`),V(`sv-close-copy`)}),!0}if(t.closest(`[data-sv-close-done]`)){let e=z();return vi(e,{..._i(e),cerrado:ea()}),R(`closure`,`Turno marcado como cerrado. No te olvides de copiar el resumen.`),V(`sv-close-copy`),!0}if(t.closest(`[data-sv-close-reopen]`)){let e=z(),t=_i(e);return delete t.cerrado,vi(e,t),R(`closure`,`Turno reabierto.`,`info`),V(`sv-close-done`),!0}return!1}function oa(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return!1;if(t.matches(`[data-sv-day]`))return fi({...z(),day:t.value}),V(`sv-day`),!0;let n=z();if(t.matches(`[data-sv-route-field]`)){let e=ji(n);return e[t.dataset.svRouteField]=t.value,B(e),t.tagName===`SELECT`&&V(t.id),!0}if(t.matches(`[data-sv-route-all]`)){let e=ji(n);return e.showAll=t.checked,B(e),V(t.id),!0}if(t.matches(`[data-sv-route-dog]`)){let e=ji(n),r=t.dataset.svRouteDog;return e.dogIds=t.checked?[...new Set([...e.dogIds,r])]:e.dogIds.filter(e=>e!==r),e.confirm=!1,B(e),V(t.id),!0}if(t.matches(`[data-sv-route-confirm]`)){let e=ji(n);return e.confirm=t.checked,B(e),!0}if(t.matches(`[data-sv-obs]`)){let e=Fi(n);return e[t.dataset.svObs]=t.type===`checkbox`?t.checked:t.value,L(P.observationDraft,e),!0}return t.matches(`[data-sv-close-notes]`)?(vi(n,{..._i(n),notas:t.value}),!0):!1}function sa(e){let t=e.target;if(!t.closest?.(`.sv-shell`))return;let n=z();if(t.matches(`[data-sv-route-field]`)&&t.tagName!==`SELECT`){let e=ji(n);e[t.dataset.svRouteField]=t.value,B(e)}else if(t.matches(`[data-sv-obs]`)&&t.type!==`checkbox`){let e=Fi(n);e[t.dataset.svObs]=t.value,L(P.observationDraft,e)}else if(t.matches(`[data-sv-close-notes]`)){vi(n,{..._i(n),notas:t.value});let e=document.getElementById(`sv-close-summary`);e&&(e.value=Ri(n,bi(n.day,n.shift)))}}function ca(e){let t=e.target;t.matches?.(`[data-sv-route-form]`)?(e.preventDefault(),ra()):t.matches?.(`[data-sv-obs-form]`)&&(e.preventDefault(),ia(t))}function la(e){let t=e.target;if(!t.matches?.(`[data-sv-fold]`))return;let n=I(P.folds,{});n[t.dataset.svFold]!==t.open&&(n[t.dataset.svFold]=t.open,L(P.folds,n))}function ua(){be.push(aa),xe.push(oa),document.addEventListener(`input`,sa),document.addEventListener(`submit`,ca),document.addEventListener(`toggle`,la,!0)}var H={resueltos:`paseosJuan_coord_resueltos`,pedidos:`paseosJuan_coord_pedidos`,altas:`paseosJuan_coord_altas`,pagos:`paseosJuan_coord_pagos`,borradores:`paseosJuan_coord_borradores`,secciones:`paseosJuan_coord_secciones`};function U(e,t){try{let n=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?Array.isArray(n)?n:t:n&&typeof n==`object`&&!Array.isArray(n)?n:t}catch{return t}}function da(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}var W=null,fa=null;function G(e,t,n=`ok`){W={section:e,text:t,tone:n},pa(t)}function pa(e){let t=document.getElementById(`coord-live`);t||(t=document.createElement(`div`),t.id=`coord-live`,t.className=`coord-sr-only`,t.setAttribute(`role`,`status`),t.setAttribute(`aria-live`,`polite`),document.body.appendChild(t)),t.textContent=``,window.setTimeout(()=>{t.textContent=e},40)}function K(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#39;`)}function ma(){return new Date(new Date().toLocaleString(`en-US`,{timeZone:`America/Argentina/Buenos_Aires`}))}function ha(e=ma()){return`${String(e.getDate()).padStart(2,`0`)}/${String(e.getMonth()+1).padStart(2,`0`)}/${e.getFullYear()}`}function ga(e){return`${e}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}var _a={Lunes:`lun`,Martes:`mar`,Miércoles:`mié`,Jueves:`jue`,Viernes:`vie`,Sábado:`sáb`,Domingo:`dom`};function va(e){return e?.length?[`Lunes`,`Martes`,`Miércoles`,`Jueves`,`Viernes`].every(t=>e.includes(t))?e.includes(`Sábado`)?`Lun a sáb`:`Lun a vie`:e.map(e=>_a[e]).join(`, `):`Sin días en rutas`}function ya(e){let t=Da.map(t=>{let n=S.filter(n=>Nt(e,n,t));return n.length?`${t.toLowerCase()}: ${va(n).toLowerCase()}`:``}).filter(Boolean);return t.length?t.join(` · `):`Sin días en rutas`}function ba(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function xa(e,t=!1){let n=U(H.secciones,{});return e in n?!!n[e]:t}function Sa(e,t){da(H.secciones,{...U(H.secciones,{}),[e]:t})}function Ca(){return document.documentElement.dataset.motion===`calm`}function wa(e,t){requestAnimationFrame(()=>{let n=document.getElementById(e);n&&(n.scrollIntoView({behavior:Ca()?`auto`:`smooth`,block:`start`}),((t?n.querySelector(t):null)||n).focus({preventScroll:!0}))})}var Ta=w.filter(e=>e.status===`Activo`),Ea=S.filter(e=>e!==`Domingo`),Da=[`Mañana`,`Tarde`];function Oa(e){return e.safety.some(e=>/bozal/i.test(e))}function ka(e,t){return Pt(e,t).filter(e=>e.status===`Activo`)}var Aa=w.filter(e=>e.review||e.status!==`Activo`);function ja(e,t){let n=ka(e,t),r=new Set(n.map(e=>e.name)),i=new Map;return n.forEach(e=>{(e.incompatibleWith||[]).forEach(t=>{if(!r.has(t))return;let n=[e.name,t].sort().join(` y `);i.set(n,n)})}),[...i.keys()]}function Ma(){let e=new Map;return Ea.forEach(t=>{Da.forEach(n=>{ja(t,n).forEach(r=>{e.has(r)||e.set(r,{});let i=e.get(r);i[n]=[...i[n]||[],t]})})}),[...e.entries()].map(([e,t])=>({pair:e,detail:Object.entries(t).map(([e,t])=>`${e.toLowerCase()}: ${va(t).toLowerCase()}`).join(` · `)}))}function Na(){let e=new Set(w.map(e=>e.name)),t=new Set;return w.forEach(n=>(n.incompatibleWith||[]).forEach(n=>!e.has(n)&&t.add(n))),[...t]}function Pa(){return Ea.map(e=>{let t=ka(e,`Mañana`),n=ka(e,`Tarde`),r=new Set([...t,...n].filter(Oa).map(e=>e.name));return{day:e,manana:t.length,tarde:n.length,total:t.length+n.length,muzzle:[...r],conflicts:ja(e,`Mañana`).length+ja(e,`Tarde`).length}})}function Fa(){return U(H.resueltos,{})}function Ia(){let e=Fa();return Aa.filter(t=>!e[t.id])}function La(){return U(H.pedidos,[])}function Ra(){return U(H.altas,[])}function za(){return U(H.pagos,[])}function Ba(e){return U(H.borradores,{})[e]||{}}function Va(e,t){da(H.borradores,{...U(H.borradores,{}),[e]:t})}function Ha(e){let t=U(H.borradores,{});delete t[e],da(H.borradores,t)}function Ua(e){let t={...Ba(e.dataset.coordForm)};return e.querySelectorAll(`[name]`).forEach(n=>{if(n.type!==`file`){if(n.type===`checkbox`){let r=e.querySelectorAll(`[name="${n.name}"]`);t[n.name]=[...r].filter(e=>e.checked).map(e=>e.value)}else t[n.name]=n.value}}),t}function q(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,type:o=`text`,required:s=!1,span:c=!1,attrs:l=``}={}){let u=`coord-${e}-${t}`;return`
    <div class="coord-field ${c?`is-wide`:``}">
      <label for="${u}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <input id="${u}" name="${t}" type="${o}" value="${K(r)}" ${i?`placeholder="${K(i)}"`:``} ${s?`required`:``} ${a?`aria-describedby="${u}-hint"`:``} ${l} />
      ${a?`<small id="${u}-hint">${a}</small>`:``}
    </div>
  `}function J(e,t,n,r,{value:i=``,hint:a=``,span:o=!1,required:s=!1}={}){let c=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${c}">${n}${s?` <span class="coord-required">(obligatorio)</span>`:``}</label>
      <select id="${c}" name="${t}" ${a?`aria-describedby="${c}-hint"`:``} ${s?`required`:``}>
        ${r.map(e=>`<option ${e===i?`selected`:``}>${K(e)}</option>`).join(``)}
      </select>
      ${a?`<small id="${c}-hint">${a}</small>`:``}
    </div>
  `}function Wa(e,t,n,{value:r=``,placeholder:i=``,hint:a=``,span:o=!0}={}){let s=`coord-${e}-${t}`;return`
    <div class="coord-field ${o?`is-wide`:``}">
      <label for="${s}">${n}</label>
      <textarea id="${s}" name="${t}" rows="3" ${i?`placeholder="${K(i)}"`:``} ${a?`aria-describedby="${s}-hint"`:``}>${K(r)}</textarea>
      ${a?`<small id="${s}-hint">${a}</small>`:``}
    </div>
  `}function Ga(e,t,n,r,i){let a=`coord-${e}-${t}`;return`
    <div class="coord-field">
      <span class="coord-label" id="${a}-label">${n}</span>
      <div class="coord-file">
        <input class="coord-file-input" id="${a}" type="file" accept=".jpg,.jpeg,.png,.pdf" data-coord-file="${e}" data-coord-file-field="${t}" aria-labelledby="${a}-label ${a}-button" aria-describedby="${a}-hint" />
        <label class="coord-btn is-secondary is-compact" for="${a}" id="${a}-button">${p(`fileUp`,`coord-icon`)}<span>${r?`Cambiar archivo`:`Elegir archivo`}</span></label>
        <span class="coord-file-name" data-coord-file-name>${r?K(r):`Ningún archivo elegido`}</span>
      </div>
      <small id="${a}-hint">${i}</small>
    </div>
  `}function Ka(e){if(!W||W.section!==e)return``;let t=W.undo?`<button class="coord-link" type="button" data-coord-undo>Deshacer</button>`:``;return`<p class="coord-flash is-${W.tone}">${p(W.tone===`error`?`alertCircle`:`checkCircle`,`coord-icon`)}<span>${K(W.text)}</span>${t}</p>`}function Y(e,t,n=`secondary`,r=``){return`<button class="coord-btn is-${n}" type="button" ${t}>${r?p(r,`coord-icon`):``}<span>${e}</span></button>`}function qa({key:e,id:t,iconName:n,title:r,intro:i,badges:a=``,body:o,open:s=!1}){return`
    <details class="coord-section" id="${t}" ${xa(e,s)?`open`:``}>
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
  `}function X(e,t=`neutral`){return`<span class="coord-badge is-${t}">${e}</span>`}function Ja(e){return e.safety?.length?`
    <ul class="coord-safety" aria-label="Indicaciones de seguridad de ${K(e.name)}">
      ${e.safety.map(e=>`<li class="${/bozal|no juntar/i.test(e)?`is-alert`:``}">${p(/bozal|no juntar/i.test(e)?`alertTriangle`:`users`,`coord-icon`)}${K(e)}</li>`).join(``)}
    </ul>
  `:``}function Ya(e){return`
    <div class="coord-shell">
      <a class="coord-skip" href="#coord-main">Saltar al contenido</a>
      ${Xa()}
      ${e}
    </div>
  `}function Xa(){return`
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
  `}function Za(){let e=`
    <main class="coord-main" id="coord-main" tabindex="-1">
      ${Qa()}
      ${eo()}
      ${ao()}
      ${so()}
      ${lo()}
      ${uo()}
      <p class="coord-footnote">
        Datos actualizados al ${y}. Fuentes: ${K(b.officialSources.dogs)} y ${K(b.officialSources.routes)}.
        Lo que cargás en esta página queda guardado solo en este dispositivo.
      </p>
    </main>
  `;return W=null,e}function Qa(){let e=ma(),t=Ft(e),n=Ia(),r=La(),i=r.filter(e=>e.estado!==`resuelto`),a=r.filter(e=>e.estado===`nuevo`).length,o=ka(t,`Mañana`),s=ka(t,`Tarde`),c=[...new Set([...o,...s].filter(Oa).map(e=>e.name))],l=[...ja(t,`Mañana`).map(e=>`${e} (mañana)`),...ja(t,`Tarde`).map(e=>`${e} (tarde)`)],u=o.length+s.length===0,d=Et.coordinador,f;if(n.length){let e=n[0];f={text:`Confirmá el dato de <b>${K(e.name)}</b>: ${K(e.review||`estado "${e.status}"`)}`,action:Y(`Ir a ${K(e.name)}`,`data-coord-goto-dog="${e.id}"`,`primary`,`arrowRight`)}}else f=i.length?{text:`Avanzá con el pedido más viejo: <b>${K(i[i.length-1].tipo)}</b>.`,action:Y(`Ver pedidos`,`data-coord-open="pedidos"`,`primary`,`arrowRight`)}:{text:`No hay datos ni pedidos pendientes. Revisá la carga de la semana.`,action:Y(`Ver carga`,`data-coord-open="carga"`,`primary`,`arrowRight`)};return`
    <section class="coord-today" aria-labelledby="coord-today-title">
      <div class="coord-today-head">
        <p class="coord-kicker">${t} ${ha(e)}</p>
        <h1 id="coord-today-title">Lo urgente de hoy</h1>
        <p class="coord-owner">A cargo: ${K(d)} <span>(${v.toLowerCase()})</span></p>
      </div>

      <ol class="coord-priorities">
        <li class="coord-priority ${n.length?`is-warn`:`is-ok`}">
          <span class="coord-priority-num" aria-hidden="true">1</span>
          <div>
            <h2>Datos a confirmar</h2>
            <p class="coord-big"><b>${n.length}</b> <span>de ${Aa.length} perros</span></p>
            <p>${n.length?`Diferencias entre planillas o perros sin ruta.`:`Todo confirmado en este dispositivo.`}</p>
          </div>
          ${Y(`Ver la lista`,`data-coord-goto="coord-datos"`,`secondary`)}
        </li>
        <li class="coord-priority ${a?`is-warn`:``}">
          <span class="coord-priority-num" aria-hidden="true">2</span>
          <div>
            <h2>Pedidos abiertos</h2>
            <p class="coord-big"><b>${i.length}</b> <span>${a?`${a} sin empezar`:`pedidos`}</span></p>
            <p>${r.length?`Consultas, evaluaciones y avisos de clientes.`:`Todavía no cargaste pedidos.`}</p>
          </div>
          ${Y(r.length?`Ver pedidos`:`Cargar un pedido`,`data-coord-open="pedidos"`,`secondary`)}
        </li>
        <li class="coord-priority ${l.length?`is-alert`:``}">
          <span class="coord-priority-num" aria-hidden="true">3</span>
          <div>
            <h2>Hoy en la calle</h2>
            ${u?`<p class="coord-big"><b>0</b> <span>perros</span></p><p>No hay rutas cargadas para hoy.</p>`:`<p class="coord-big"><b>${o.length}</b> <span>mañana</span> <b>${s.length}</b> <span>tarde</span></p>
                 ${c.length?`<p class="coord-inline-alert">${p(`alertTriangle`,`coord-icon`)}<span>Con bozal: ${K(ba(c))}</span></p>`:``}
                 ${l.length?`<p class="coord-inline-alert is-strong">${p(`alertTriangle`,`coord-icon`)}<span>No juntar, comparten turno: ${K(ba(l))}</span></p>`:``}`}
          </div>
          ${Y(`Ver carga de la semana`,`data-coord-open="carga"`,`secondary`)}
        </li>
      </ol>

      <div class="coord-next">
        <p><span class="coord-next-label">Próximo paso</span> ${f.text}</p>
        ${f.action}
      </div>
    </section>
  `}function $a(e,t){return`
    <li class="coord-review ${t?`is-resolved`:``}" id="coord-dato-${e.id}" tabindex="-1">
      <div class="coord-review-head">
        <h3>${K(e.name)} <small>${e.id}</small></h3>
        ${e.status===`Activo`?X(`Activo`,`neutral`):X(K(e.status),`alert`)}
      </div>
      <p class="coord-review-meta">${K(e.plan)} · ${K(e.size)} · ${K(ya(e))}</p>
      <p class="coord-review-what"><span>Qué confirmar</span>${K(e.review||`Estado "${e.status}".`)}</p>
      ${Ja(e)}
      <div class="coord-actions">
        ${t?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}Resuelto el ${K(t)}</p>${Y(`Deshacer`,`data-coord-unresolve="${e.id}"`,`ghost`)}`:Y(`Marcar como resuelto`,`data-coord-resolve="${e.id}"`,`primary`,`checkCircle`)}
      </div>
    </li>
  `}function eo(){let e=Fa(),t=Aa.filter(t=>!e[t.id]),n=Aa.filter(t=>e[t.id]),r=t.slice(0,4),i=t.slice(4),a=Na();return`
    <section class="coord-block" id="coord-datos" tabindex="-1" aria-labelledby="coord-datos-title">
      <div class="coord-block-head">
        <div>
          <h2 id="coord-datos-title">Datos a confirmar</h2>
          <p>Perros con datos que no coinciden entre planillas o con estado distinto de Activo. Cuando lo confirmes en la planilla, marcalo como resuelto.</p>
        </div>
        <div class="coord-progress" aria-label="${n.length} de ${Aa.length} resueltos">
          <b>${n.length}/${Aa.length}</b><span>resueltos</span>
          <span class="coord-progress-bar" aria-hidden="true"><i style="width:${Math.round(n.length/Aa.length*100)}%"></i></span>
        </div>
      </div>
      ${Ka(`datos`)}
      ${t.length?`<ul class="coord-review-list">${r.map(e=>$a(e)).join(``)}</ul>`:`<p class="coord-empty">${p(`checkCircle`,`coord-icon`)}No quedan datos por confirmar en este dispositivo.</p>`}
      ${i.length?`
        <details class="coord-more" ${xa(`datosMas`)?`open`:``}>
          <summary data-coord-toggle="datosMas">Ver los otros ${i.length} pendientes ${p(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${i.map(e=>$a(e)).join(``)}</ul>
        </details>`:``}
      ${n.length?`
        <details class="coord-more" ${xa(`datosResueltos`)?`open`:``}>
          <summary data-coord-toggle="datosResueltos">Resueltos (${n.length}) ${p(`chevronDown`,`coord-icon`)}</summary>
          <ul class="coord-review-list">${n.map(t=>$a(t,e[t.id])).join(``)}</ul>
        </details>`:``}
      ${a.length?`<p class="coord-note">${p(`alertCircle`,`coord-icon`)}<span>También a confirmar: ${K(ba(a))} figura en "no juntar con" pero no está en la lista de perros.</span></p>`:``}
      <p class="coord-note">${p(`fileText`,`coord-icon`)}<span>Marcar como resuelto queda solo en este dispositivo. El cambio todavía debe incorporarse al ${K(b.officialSources.dogs.toLowerCase())}.</span></p>
    </section>
  `}var to=[`Consulta`,`Evaluación inicial`,`Documentación`,`Cambio de días o plan`,`Ausencia`,`Otro`],no=[`WhatsApp`,`Llamada`,`En persona`,`Otro`],ro=[[`nuevo`,`Nuevo`],[`curso`,`En curso`],[`resuelto`,`Resuelto`]];function io(e){let t={nuevo:Y(`Empezar`,`data-coord-pedido-move="${e.id}:curso"`,`secondary`)+Y(`Resolver`,`data-coord-pedido-move="${e.id}:resuelto"`,`secondary`),curso:Y(`Resolver`,`data-coord-pedido-move="${e.id}:resuelto"`,`primary`)+Y(`Volver a nuevo`,`data-coord-pedido-move="${e.id}:nuevo"`,`ghost`),resuelto:Y(`Reabrir`,`data-coord-pedido-move="${e.id}:curso"`,`secondary`)+Y(`Borrar`,`data-coord-pedido-delete="${e.id}"`,`ghost`)}[e.estado],n=e.tipo===`Evaluación inicial`&&e.estado!==`resuelto`;return`
    <li class="coord-card">
      <div class="coord-card-head">
        <strong>${K(e.tipo)}</strong>
        <small>${K(e.fecha)} · ${K(e.canal)}</small>
      </div>
      <p class="coord-card-dog">${p(`pawPrint`,`coord-icon`)}${K(e.perro||`Pendiente de confirmar`)}</p>
      ${e.detalle?`<p>${K(e.detalle)}</p>`:``}
      ${e.supervisor?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}Supervisor avisado</p>`:``}
      <div class="coord-actions">
        ${t}
        ${n&&!e.supervisor?Y(`Avisar al supervisor`,`data-coord-pedido-supervisor="${e.id}"`,`ghost`,`send`):``}
      </div>
    </li>
  `}function ao(){let e=La(),t=Ba(`pedido`),n=e.filter(e=>e.estado!==`resuelto`).length,r=w.map(e=>e.name),i=`
    ${Ka(`pedidos`)}
    <form class="coord-form" data-coord-form="pedido" novalidate>
      <h3>Cargar un pedido</h3>
      <div class="coord-grid">
        ${J(`pedido`,`tipo`,`Tipo de pedido`,to,{value:t.tipo})}
        ${q(`pedido`,`perro`,`Perro`,{value:t.perro,placeholder:`Nombre del perro o «perro nuevo»`,attrs:`list="coord-dog-names" autocomplete="off"`})}
        ${J(`pedido`,`canal`,`Llegó por`,no,{value:t.canal})}
        ${Wa(`pedido`,`detalle`,`Qué hay que resolver`,{value:t.detalle,hint:`Sin teléfonos ni domicilios: solo lo necesario para resolverlo.`})}
      </div>
      <datalist id="coord-dog-names">${r.map(e=>`<option value="${K(e)}"></option>`).join(``)}</datalist>
      <div class="coord-actions">${Y(`Guardar pedido`,`data-coord-pedido-save`,`primary`,`plus`)}</div>
    </form>

    <div class="coord-board">
      ${ro.map(([t,n])=>{let r=e.filter(e=>e.estado===t);return`
          <section class="coord-column" aria-labelledby="coord-col-${t}">
            <h3 id="coord-col-${t}">${n} <span>${r.length}</span></h3>
            ${r.length?`<ul class="coord-card-list">${r.map(io).join(``)}</ul>`:`<p class="coord-empty is-small">${t===`nuevo`?`Sin pedidos nuevos.`:t===`curso`?`Nada en curso.`:`Todavía no hay resueltos.`}</p>`}
          </section>
        `}).join(``)}
    </div>
  `;return qa({key:`pedidos`,id:`coord-pedidos`,iconName:`clipboardCheck`,title:`Pedidos y evaluaciones`,intro:`Consultas de clientes, evaluaciones iniciales y avisos.`,badges:n?X(`${n} abiertos`,`warn`):X(`Sin pedidos abiertos`,`neutral`),body:i})}var oo=[`Pendiente de confirmar`,`Sí`,`No`];function so(){let e=Ba(`alta`),t=Ra(),n=Array.isArray(e.dias)?e.dias:[],r=[`Pendiente de confirmar`,...C.map(e=>`${e.name} (${e.walks} paseos por semana)`),`Paseo suelto`],i=`
    <div class="coord-rule" role="note">
      ${p(`shieldCheck`,`coord-icon`)}
      <p><b>Regla:</b> todo perro nuevo arranca <b>SIN EVALUAR</b> y su <b>primer paseo es individual</b>. Recién después se decide si puede sumarse a un grupo.</p>
    </div>
    ${Ka(`alta`)}
    <form class="coord-form" data-coord-form="alta" novalidate>
      <fieldset>
        <legend>Identificación</legend>
        <div class="coord-grid">
          ${q(`alta`,`nombre`,`Nombre del perro`,{value:e.nombre,required:!0})}
          ${J(`alta`,`tamano`,`Tamaño`,[`Pendiente de confirmar`,`Pequeño`,`Mediano`,`Grande`],{value:e.tamano})}
          ${q(`alta`,`raza`,`Raza o cruza`,{value:e.raza})}
          ${q(`alta`,`edad`,`Edad aproximada`,{value:e.edad})}
          ${J(`alta`,`sexo`,`Sexo`,[`Pendiente de confirmar`,`Macho`,`Hembra`],{value:e.sexo})}
          ${J(`alta`,`castrado`,`Castrado o castrada`,oo,{value:e.castrado})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Tutor y contacto de emergencia</legend>
        <p class="coord-fieldset-note">Se guarda solo en este dispositivo.</p>
        <div class="coord-grid">
          ${q(`alta`,`tutor`,`Nombre del tutor`,{value:e.tutor,attrs:`autocomplete="off"`})}
          ${q(`alta`,`contacto`,`Contacto del tutor`,{value:e.contacto,type:`tel`,attrs:`autocomplete="off"`})}
          ${q(`alta`,`emergencia`,`Contacto de emergencia`,{value:e.emergencia,attrs:`autocomplete="off"`})}
          ${J(`alta`,`zona`,`Zona`,[`Pendiente de confirmar`,`Pilar`,`La Lonja`,`Otra zona`],{value:e.zona})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Salud</legend>
        <div class="coord-grid">
          ${J(`alta`,`vacunas`,`Vacunas al día`,oo,{value:e.vacunas})}
          ${Ga(`alta`,`carnet`,`Carnet de vacunas`,e.carnet,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
          ${q(`alta`,`veterinario`,`Veterinaria de referencia`,{value:e.veterinario})}
          ${Wa(`alta`,`salud`,`Condiciones, alergias o medicación`,{value:e.salud,hint:`Lo que dice el tutor. Sin diagnósticos propios.`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Equipo</legend>
        <div class="coord-grid">
          ${J(`alta`,`sujecion`,`Collar o pechera`,[`Pendiente de confirmar`,`Collar`,`Pechera`,`Collar y pechera`],{value:e.sujecion})}
          ${J(`alta`,`bozal`,`Usa bozal`,oo,{value:e.bozal})}
          ${J(`alta`,`correa`,`Tiene correa propia`,oo,{value:e.correa})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Comportamiento observado</legend>
        <p class="coord-fieldset-note">Describí lo que se ve: qué pasó antes, qué hizo y qué pasó después. Sin etiquetas.</p>
        <div class="coord-grid">
          ${Wa(`alta`,`conPerros`,`Con otros perros`,{value:e.conPerros,placeholder:`Ej.: se acerca con la cola baja y se aleja si el otro ladra`,span:!1})}
          ${Wa(`alta`,`conPersonas`,`Con personas`,{value:e.conPersonas,span:!1})}
          ${Wa(`alta`,`estimulos`,`Situaciones que lo alteran`,{value:e.estimulos,placeholder:`Ej.: motos, bicicletas, ruidos fuertes`,span:!1})}
          ${q(`alta`,`noJuntar`,`No juntar con`,{value:e.noJuntar,attrs:`list="coord-dog-names" autocomplete="off"`})}
        </div>
      </fieldset>
      <fieldset>
        <legend>Servicio</legend>
        <div class="coord-grid">
          ${J(`alta`,`plan`,`Plan pedido`,r,{value:e.plan,hint:`Precios oficiales en la tabla de planes.`})}
          ${J(`alta`,`turno`,`Turno`,[`Pendiente de confirmar`,`Mañana`,`Tarde`],{value:e.turno})}
          <div class="coord-field is-wide">
            <span class="coord-label" id="coord-alta-dias-label">Días pedidos</span>
            <div class="coord-days" role="group" aria-labelledby="coord-alta-dias-label">
              ${Ea.map(e=>`
                <label class="coord-day"><input type="checkbox" name="dias" value="${e}" ${n.includes(e)?`checked`:``} /><span>${e}</span></label>
              `).join(``)}
            </div>
          </div>
          <div class="coord-field">
            <span class="coord-label">Categoría</span>
            <p class="coord-fixed">${X(`SIN EVALUAR`,`neutral`)}</p>
          </div>
          <div class="coord-field">
            <span class="coord-label">Primer paseo</span>
            <p class="coord-fixed">${X(`Individual`,`neutral`)}</p>
          </div>
        </div>
      </fieldset>
      <div class="coord-actions">
        ${Y(`Guardar ficha`,`data-coord-alta-save`,`primary`,`plus`)}
        ${Y(`Vaciar formulario`,`data-coord-alta-clear`,`ghost`)}
      </div>
    </form>

    <div class="coord-subblock">
      <h3>Altas cargadas en este dispositivo <span>${t.length}</span></h3>
      ${t.length?`
        <ul class="coord-card-list is-grid">
          ${t.map(e=>`
            <li class="coord-card">
              <div class="coord-card-head">
                <strong>${K(e.nombre)}</strong>
                <small>Alta ${K(e.fecha)}</small>
              </div>
              <p class="coord-badges">${X(`SIN EVALUAR`,`neutral`)} ${X(`Primer paseo individual`,`warn`)}</p>
              <p>${K(e.tamano===`Pendiente de confirmar`?`Tamaño pendiente`:e.tamano)} · Plan: ${K(e.plan===`Pendiente de confirmar`?`pendiente`:e.plan)} · Días: ${e.dias?.length?K(va(e.dias).toLowerCase()):`pendientes`} · Turno: ${K(e.turno===`Pendiente de confirmar`?`pendiente`:e.turno.toLowerCase())}</p>
              ${e.bozal===`Sí`||e.noJuntar?`<ul class="coord-safety">
                ${e.bozal===`Sí`?`<li class="is-alert">${p(`alertTriangle`,`coord-icon`)}Usa bozal</li>`:``}
                ${e.noJuntar?`<li class="is-alert">${p(`alertTriangle`,`coord-icon`)}No juntar con ${K(e.noJuntar)}</li>`:``}
              </ul>`:``}
              ${e.supervisor?`<p class="coord-done">${p(`checkCircle`,`coord-icon`)}Supervisor avisado para el primer paseo</p>`:``}
              <div class="coord-actions">
                ${e.supervisor?``:Y(`Avisar al supervisor`,`data-coord-alta-supervisor="${e.id}"`,`secondary`,`send`)}
                ${Y(`Copiar ficha`,`data-coord-alta-copy="${e.id}"`,`ghost`,`copy`)}
                ${Y(`Borrar`,`data-coord-alta-delete="${e.id}"`,`ghost`)}
              </div>
            </li>
          `).join(``)}
        </ul>
        <p class="coord-note">${p(`fileText`,`coord-icon`)}<span>Estas fichas todavía deben incorporarse al ${K(b.officialSources.dogs.toLowerCase())}.</span></p>
      `:`<p class="coord-empty is-small">Todavía no cargaste perros nuevos.</p>`}
    </div>
  `;return qa({key:`alta`,id:`coord-alta`,iconName:`userPlus`,title:`Alta de perro nuevo`,intro:`Ficha completa. Arranca SIN EVALUAR y con primer paseo individual.`,badges:t.length?X(`${t.length} ${t.length===1?`cargada`:`cargadas`}`,`neutral`):``,body:i})}function co(e){return[`Ficha de alta: ${e.nombre} (cargada el ${e.fecha})`,`Categoría: SIN EVALUAR. Primer paseo: individual.`,`Identificación: ${e.tamano}; raza o cruza: ${e.raza||`Pendiente de confirmar`}; edad: ${e.edad||`Pendiente de confirmar`}; sexo: ${e.sexo}; castrado/a: ${e.castrado}.`,`Tutor: ${e.tutor||`Pendiente de confirmar`}; contacto: ${e.contacto||`Pendiente de confirmar`}; emergencia: ${e.emergencia||`Pendiente de confirmar`}; zona: ${e.zona}.`,`Salud: vacunas al día: ${e.vacunas}; carnet: ${e.carnet||`Pendiente de confirmar`}; veterinaria: ${e.veterinario||`Pendiente de confirmar`}; observaciones: ${e.salud||`Pendiente de confirmar`}.`,`Equipo: ${e.sujecion}; bozal: ${e.bozal}; correa propia: ${e.correa}.`,`Con otros perros: ${e.conPerros||`Pendiente de confirmar`}. Con personas: ${e.conPersonas||`Pendiente de confirmar`}. Lo alteran: ${e.estimulos||`Pendiente de confirmar`}. No juntar con: ${e.noJuntar||`Sin indicación`}.`,`Servicio: ${e.plan}; días: ${e.dias?.length?e.dias.join(`, `):v}; turno: ${e.turno}.`].join(`
`)}function lo(){let e=Pa(),t=Ft(ma()),n=Math.max(...e.map(e=>e.total),1),r=e.filter(e=>e.total===n).map(e=>e.day),i=Ma(),a=Ta.filter(e=>Ea.some(t=>Da.every(n=>Nt(e,t,n)))).map(e=>e.name),o=w.filter(e=>e.status!==`Activo`).map(e=>`${e.name} (${e.status.toLowerCase()})`),s=`
    ${i.length?`
      <div class="coord-alert-box" role="note">
        <h3>${p(`alertTriangle`,`coord-icon`)}Perros que no se pueden juntar y comparten turno</h3>
        <ul>${i.map(e=>`<li><b>${K(e.pair)}</b> · ${K(e.detail)}</li>`).join(``)}</ul>
        <p>Según ${K(b.officialSources.routes)}. Revisá que no vayan en el mismo grupo.</p>
      </div>`:``}
    <div class="coord-table-wrap">
      <table class="coord-table">
        <caption>Perros activos por día y turno (rutas del ${y}). Día con más carga: ${K(ba(r.map(e=>e.toLowerCase())))}, ${n} paseos.</caption>
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
      ${a.length?`<li>${K(ba(a))} ${a.length===1?`sale`:`salen`} en los dos turnos el mismo día y cuenta${a.length===1?``:`n`} en ambos.</li>`:``}
      ${o.length?`<li>No se cuentan: ${K(ba(o))}.</li>`:``}
    </ul>
  `;return qa({key:`carga`,id:`coord-carga`,iconName:`chart`,title:`Carga por día y turno`,intro:`Calculada con las rutas reales. Incluye bozales y cruces a revisar.`,badges:i.length?X(`${i.length} ${i.length===1?`cruce`:`cruces`} a revisar`,`alert`):``,body:s})}function uo(){let e=za(),t=Ba(`pago`),n=e.filter(e=>!e.enLibro).length,r=[`Elegí un perro`,...Ta.map(e=>e.name).sort((e,t)=>e.localeCompare(t,`es`)),`Otro (anotalo en la nota)`],i=`
    <div class="coord-rule is-info" role="note">
      ${p(`fileText`,`coord-icon`)}
      <p><b>Fuente oficial:</b> el ${K(b.officialSources.money)} y la hoja Cobranza semanal. Acá no hay montos ni alias: esto es solo un registro de apoyo para no olvidarte de pasar un pago. El alias y el detalle de pago se envían por WhatsApp.</p>
    </div>
    ${Ka(`pagos`)}
    <form class="coord-form" data-coord-form="pago" novalidate>
      <h3>Anotar un pago recibido</h3>
      <div class="coord-grid">
        ${J(`pago`,`perro`,`Perro`,r,{value:t.perro,required:!0})}
        ${q(`pago`,`monto`,`Monto recibido`,{value:t.monto,required:!0,attrs:`inputmode="numeric" autocomplete="off"`,hint:`El que figura en el comprobante. Solo números.`})}
        ${J(`pago`,`medio`,`Medio de pago`,[`Transferencia`,`Efectivo`,`Otro`],{value:t.medio})}
        ${q(`pago`,`fecha`,`Fecha del pago`,{value:t.fecha||ha(),placeholder:`DD/MM/AAAA`,attrs:`inputmode="numeric"`})}
        ${Ga(`pago`,`comprobante`,`Comprobante`,t.comprobante,`Foto o PDF. Se guarda solo el nombre del archivo.`)}
        ${q(`pago`,`nota`,`Nota`,{value:t.nota,placeholder:`Opcional`})}
      </div>
      <div class="coord-actions">${Y(`Guardar registro`,`data-coord-pago-save`,`primary`,`plus`)}</div>
    </form>

    <div class="coord-subblock">
      <h3>Registros en este dispositivo <span>${e.length}</span></h3>
      ${e.length?`
        <ul class="coord-pay-list">
          ${e.map(e=>`
            <li class="coord-pay ${e.enLibro?`is-done`:``}">
              <div class="coord-pay-main">
                <strong>${K(e.perro)}</strong>
                <span>${K(e.montoTexto)} · ${K(e.medio)} · ${K(e.fecha)}</span>
                ${e.comprobante?`<small>Comprobante: ${K(e.comprobante)}</small>`:`<small>Sin comprobante</small>`}
                ${e.nota?`<small>${K(e.nota)}</small>`:``}
              </div>
              ${e.enLibro?X(`Pasado al Libro contable`,`ok`):X(`Falta pasar al Libro contable`,`warn`)}
              <div class="coord-actions">
                ${Y(e.enLibro?`Marcar como no pasado`:`Ya lo pasé al Libro`,`data-coord-pago-libro="${e.id}"`,e.enLibro?`ghost`:`secondary`,e.enLibro?``:`checkCircle`)}
                ${Y(`Borrar`,`data-coord-pago-delete="${e.id}"`,`ghost`)}
              </div>
            </li>
          `).join(``)}
        </ul>
      `:`<p class="coord-empty is-small">No hay pagos anotados en este dispositivo.</p>`}
    </div>
  `;return qa({key:`pagos`,id:`coord-pagos`,iconName:`wallet`,title:`Pagos`,intro:`Registro de apoyo. La fuente oficial es el Libro contable.`,badges:n?X(`${n} sin pasar al Libro`,`warn`):``,body:i})}function fo(e,t,n){Sa(e,!0),$(),wa(t,n)}function po(e,t){da(e,t)}function mo(e,t,n,r){let i=U(e,[]),a=i.findIndex(e=>e.id===t);a<0||(fa={key:e,item:i[a],index:a,section:n},i.splice(a,1),po(e,i),G(n,r),W.undo=!0)}function ho(e,t,n){let r=u();r.alerts=[{id:`alert-${Date.now()}`,dog:e,type:t,level:`Medio`,description:n},...r.alerts||[]],d(r)}function go(e){try{(navigator.clipboard?.writeText(e))?.catch?.(()=>{})}catch{}}function _o(e){if(!e.target.closest(`.coord-shell`))return!1;if(e.target.closest(`[data-coordinator-logout]`))return gs(`/login`),!0;let t=e.target.closest(`[data-coord-toggle]`);if(t){let e=t.parentElement;return Sa(t.dataset.coordToggle,!e.open),!0}let n=e.target.closest(`[data-coord-goto]`);if(n)return wa(n.dataset.coordGoto),!0;let r=e.target.closest(`[data-coord-goto-dog]`);if(r){let e=r.dataset.coordGotoDog;return Ia().findIndex(t=>t.id===e)>=4&&(Sa(`datosMas`,!0),$()),wa(`coord-dato-${e}`),!0}let i=e.target.closest(`[data-coord-open]`);if(i){let e=i.dataset.coordOpen,t=e===`pedidos`&&!La().length?`#coord-pedido-tipo`:null;return fo(e,`coord-${e}`,t),!0}if(e.target.closest(`[data-coord-undo]`)){if(fa){let e=U(fa.key,[]);e.splice(fa.index,0,fa.item),po(fa.key,e),G(fa.section,`Listo, se recuperó.`),fa=null}return $(),!0}let a=e.target.closest(`[data-coord-resolve]`);if(a){let e=a.dataset.coordResolve,t=w.find(t=>t.id===e);return da(H.resueltos,{...Fa(),[e]:ha()}),G(`datos`,`${t?.name||e}: marcado como resuelto.`),W.undo=!1,fa=null,$(),wa(`coord-datos`),!0}let o=e.target.closest(`[data-coord-unresolve]`);if(o){let e=o.dataset.coordUnresolve,t=Fa();return delete t[e],da(H.resueltos,t),G(`datos`,`${w.find(t=>t.id===e)?.name||e}: volvió a pendientes.`),$(),!0}if(e.target.closest(`[data-coord-pedido-save]`)){let t=Ua(e.target.closest(`[data-coord-form]`));if(!t.perro?.trim()&&!t.detalle?.trim())return Va(`pedido`,t),G(`pedidos`,`Escribí el perro o qué hay que resolver.`,`error`),$(),wa(`coord-pedidos`,`#coord-pedido-perro`),!0;let n={id:ga(`pedido`),tipo:t.tipo||to[0],perro:t.perro?.trim()||``,canal:t.canal||no[0],detalle:t.detalle?.trim()||``,estado:`nuevo`,fecha:ha()};return po(H.pedidos,[n,...La()]),Ha(`pedido`),G(`pedidos`,`Pedido guardado en "Nuevo".`),$(),!0}let s=e.target.closest(`[data-coord-pedido-move]`);if(s){let[e,t]=s.dataset.coordPedidoMove.split(`:`);return po(H.pedidos,La().map(n=>n.id===e?{...n,estado:t}:n)),G(`pedidos`,`Pedido movido a "${{nuevo:`Nuevo`,curso:`En curso`,resuelto:`Resuelto`}[t]}".`),$(),!0}let c=e.target.closest(`[data-coord-pedido-delete]`);if(c)return mo(H.pedidos,c.dataset.coordPedidoDelete,`pedidos`,`Pedido borrado.`),$(),!0;let l=e.target.closest(`[data-coord-pedido-supervisor]`);if(l){let e=l.dataset.coordPedidoSupervisor,t=La().find(t=>t.id===e);return t&&(po(H.pedidos,La().map(t=>t.id===e?{...t,supervisor:!0,estado:t.estado===`nuevo`?`curso`:t.estado}:t)),G(`pedidos`,`Supervisor avisado. El pedido pasó a «En curso».`),ho(t.perro||`Perro nuevo`,`Evaluación inicial`,`Pedido de evaluación derivado por coordinación. Primer paseo individual.`)),!0}if(e.target.closest(`[data-coord-alta-save]`)){let t=Ua(e.target.closest(`[data-coord-form]`));if(!t.nombre?.trim())return Va(`alta`,t),G(`alta`,`Falta el nombre del perro.`,`error`),$(),wa(`coord-alta`,`#coord-alta-nombre`),!0;let n={...t,id:ga(`alta`),nombre:t.nombre.trim(),dias:Array.isArray(t.dias)?t.dias:[],categoria:`SIN EVALUAR`,primerPaseo:`Individual`,fecha:ha()};return po(H.altas,[n,...Ra()]),Ha(`alta`),G(`alta`,`Ficha de ${n.nombre} guardada en este dispositivo. Arranca SIN EVALUAR y con primer paseo individual.`),$(),wa(`coord-alta`),!0}if(e.target.closest(`[data-coord-alta-clear]`))return Ha(`alta`),G(`alta`,`Formulario vacío.`),$(),!0;let u=e.target.closest(`[data-coord-alta-supervisor]`);if(u){let e=u.dataset.coordAltaSupervisor,t=Ra().find(t=>t.id===e);return t&&(po(H.altas,Ra().map(t=>t.id===e?{...t,supervisor:!0}:t)),G(`alta`,`Supervisor avisado: ${t.nombre} necesita su primer paseo individual.`),ho(t.nombre,`Perro nuevo`,`Alta nueva: SIN EVALUAR. Coordinar primer paseo individual.`)),!0}let d=e.target.closest(`[data-coord-alta-copy]`);if(d){let e=Ra().find(e=>e.id===d.dataset.coordAltaCopy);return e&&go(co(e)),G(`alta`,`Ficha copiada. Pegala en el registro maestro.`),$(),!0}let f=e.target.closest(`[data-coord-alta-delete]`);if(f)return mo(H.altas,f.dataset.coordAltaDelete,`alta`,`Ficha borrada de este dispositivo.`),$(),!0;if(e.target.closest(`[data-coord-pago-save]`)){let t=Ua(e.target.closest(`[data-coord-form]`)),n=String(t.monto||``).replace(/[^\d]/g,``);if(!t.perro||t.perro===`Elegí un perro`||!n)return Va(`pago`,t),G(`pagos`,n?`Elegí el perro.`:`Falta el monto del comprobante.`,`error`),$(),wa(`coord-pagos`,n?`#coord-pago-perro`:`#coord-pago-monto`),!0;let r={id:ga(`pago`),perro:t.perro,montoTexto:T(Number(n)),medio:t.medio||`Transferencia`,fecha:t.fecha?.trim()||ha(),comprobante:t.comprobante||``,nota:t.nota?.trim()||``,enLibro:!1};return po(H.pagos,[r,...za()]),Ha(`pago`),G(`pagos`,`Pago de ${r.perro} anotado. Acordate de pasarlo al Libro contable.`),$(),!0}let ee=e.target.closest(`[data-coord-pago-libro]`);if(ee){let e=ee.dataset.coordPagoLibro,t=!1;return po(H.pagos,za().map(n=>n.id===e?(t=!n.enLibro,{...n,enLibro:t}):n)),G(`pagos`,t?`Marcado como pasado al Libro contable.`:`Marcado como pendiente de pasar al Libro.`),$(),!0}let te=e.target.closest(`[data-coord-pago-delete]`);return te?(mo(H.pagos,te.dataset.coordPagoDelete,`pagos`,`Registro borrado.`),$(),!0):!1}function vo(e){let t=e.target;if(!t.closest?.(`.coord-shell`))return!1;let n=t.closest(`[data-coord-file]`);if(n){let e=n.dataset.coordFile,t=n.files?.[0],r=n.closest(`[data-coord-form]`),i=r?Ua(r):Ba(e);t&&(i[n.dataset.coordFileField]=t.name),Va(e,i);let a=n.parentElement.querySelector(`[data-coord-file-name]`);return a&&t&&(a.textContent=t.name),!0}let r=t.closest(`[data-coord-form]`);return r?(Va(r.dataset.coordForm,Ua(r)),!0):!1}function yo(e){let t=e.target.closest?.(`.coord-shell [data-coord-form]`);t&&(e.preventDefault(),t.querySelector(`.coord-btn.is-primary`)?.click())}function bo(){be.push(_o),xe.push(vo),document.addEventListener(`submit`,yo)}var xo=`paseosJuanAdmin_prioridadesHechas`,So=`paseosJuanAdmin_seccionesAbiertas`,Co=`America/Argentina/Buenos_Aires`,wo=[`Pequeño`,`Mediano`,`Grande`],To=x.manana.label,Eo=x.tarde.label,Do=``;function Z(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`)}function Q(e){return e.length<=1?e.join(``):`${e.slice(0,-1).join(`, `)} y ${e[e.length-1]}`}function Oo(e,t,n){return`${e} ${e===1?t:n}`}var ko={Lunes:`Lun`,Martes:`Mar`,Miércoles:`Mié`,Jueves:`Jue`,Viernes:`Vie`,Sábado:`Sáb`,Domingo:`Dom`};function Ao(e){let t=S.filter(t=>e.includes(t)),n=t.map(e=>S.indexOf(e));return n.length>=3&&n.every((e,t)=>t===0||e===n[t-1]+1)?`${ko[t[0]]} a ${ko[t[t.length-1]]}`:t.map(e=>ko[e]).join(`, `)}function jo(){let e=new Date,t=new Intl.DateTimeFormat(`es-AR`,{timeZone:Co,weekday:`long`,day:`2-digit`,month:`2-digit`,year:`numeric`}).formatToParts(e),n=e=>t.find(t=>t.type===e)?.value||``,r=n(`weekday`);return{dayName:S.find(e=>e.toLowerCase()===r.toLowerCase())||r,date:`${n(`day`)}/${n(`month`)}/${n(`year`)}`}}function Mo(){return ce(xo)}function No(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch{}}function Po(){return new Set(ce(So))}function Fo(){return w.filter(e=>e.status===`Activo`&&e.days.length>0)}function Io(){let e=Fo(),t=S.map(t=>{let n=e.filter(e=>Nt(e,t,To)).length,r=e.filter(e=>Nt(e,t,Eo)).length,i=e.filter(e=>e.days.includes(t)).length;return{day:t,morning:n,afternoon:r,total:n+r,distinct:i}}),n=Math.max(1,...t.map(e=>Math.max(e.morning,e.afternoon))),r=Math.max(...t.map(e=>e.total));return{rows:t,maxShift:n,maxTotal:r,busiest:t.filter(e=>e.total===r&&r>0).map(e=>e.day),weekTotal:t.reduce((e,t)=>e+t.total,0),twoShifts:e.filter(e=>e.shifts.length>1)}}function Lo(){let e=Fo(),t=new Map(w.map(e=>[e.name,e])),n=[],r=[],i=[],a=new Set;return w.forEach(o=>{(o.incompatibleWith||[]).forEach(s=>{let c=[o.name,s].sort().join(`|`);if(a.has(c))return;a.add(c);let l=t.get(s);l?!e.includes(o)||!e.includes(l)?i.push({dog:o.name,other:s,idle:e.includes(o)?l.name:o.name}):[To,Eo].forEach(e=>{let t=S.filter(t=>Nt(o,t,e)&&Nt(l,t,e));t.length&&n.push({a:o.name,b:l.name,shift:e,days:t})}):r.push({dog:o.name,other:s})})}),{conflicts:n,missing:r,notRouted:i}}function Ro(){return Fo().filter(e=>e.safety.some(e=>/bozal|no juntar/i.test(e)))}function zo(){return w.filter(e=>e.review||e.status!==`Activo`)}function Bo(e){return e===To?x.manana.route:x.tarde.routes.join(` o `)}function Vo(){let{conflicts:e}=Lo(),t=w.filter(e=>e.status!==`Activo`),n=zo(),r=Ro().filter(e=>e.category===`SIN EVALUAR`),i=Fo(),a=i.filter(e=>e.category===`SIN EVALUAR`),o=[];if(e.length){let t=e.map(e=>e.a).concat(e.map(e=>e.b)).reduce((e,t)=>({...e,[t]:(e[t]||0)+1}),{}),n=Object.keys(t).sort((e,n)=>t[n]-t[e])[0],r=[...new Set(e.flatMap(e=>[e.a,e.b]).filter(e=>e!==n))],i=[...new Set(e.map(e=>e.shift))],a=i.map(Bo).join(` y `);o.push({id:`seguridad-cruces`,tag:`Seguridad`,tone:`danger`,title:`${n} comparte turno con perros marcados “no juntar”`,detail:`Según BASE RUTAS, ${n} sale en el turno ${i.map(e=>e.toLowerCase()).join(` y `)} (ruta ${a}) los mismos días que ${Q(r)}. Hay ${Oo(e.length,`cruce`,`cruces`)} en la semana.`,action:`Confirmá con Sebastián cómo se separa a ${n} de ${Q(r)} en la ruta ${a}.`,target:`adm-seguridad`,targetLabel:`Ver los cruces`})}if(n.length){let e=t.map(e=>e.name);o.push({id:`datos-a-revisar`,tag:`Datos`,tone:`warning`,title:`${Oo(n.length,`perro tiene`,`perros tienen`)} datos a revisar`,detail:t.length?`Primero el estado de ${Q(e)}: ${t.length===1?`no está`:`no están`} claros entre la tabla de precios y BASE RUTAS. Los demás: plan que no coincide con los días, nombres distintos o duración.`:`Planes que no coinciden con los días, nombres distintos o duración a revisar.`,action:t.length?`Decidí el estado de ${Q(e)} y corregilo en la planilla.`:`Revisá la lista de datos a confirmar y corregí la planilla.`,target:`adm-datos`,targetLabel:`Ver la lista`})}if(a.length){let e=r.length?r:a.slice(0,5);o.push({id:`evaluaciones`,tag:`Evaluación`,tone:`info`,title:`${a.length} de ${i.length} perros en ruta siguen SIN EVALUAR`,detail:`Registro maestro del 14/08/2026. Conviene empezar por los que tienen bozal o “no juntar”: ${Q(e.map(e=>e.name))}.`,action:`Agendá la evaluación de ${Q(e.map(e=>e.name))}.`,target:`adm-seguridad`,targetLabel:`Ver indicaciones de seguridad`})}return o.slice(0,3)}function Ho(){let e=Fo(),t=[],n=[];e.forEach(e=>{let r=C.find(t=>t.name===e.plan),i=r?.prices[e.size];i?t.push({dog:e,plan:r,price:i}):n.push(e)});let r=C.map(e=>{let n=t.filter(t=>t.plan.id===e.id);return{plan:e,count:n.length,subtotal:n.reduce((e,t)=>e+t.price,0)}}),i=t.reduce((e,t)=>e+t.price,0);return{included:t,excluded:n,excludedPlans:[...new Set(n.map(e=>e.plan))],byPlan:r,total:i}}function Uo(e){return`
    <div class="adm-shell">
      ${Wo()}
      ${e}
    </div>
  `}function Wo(){return`
    <header class="adm-header">
      <a class="adm-brand" href="/admin" data-link aria-label="Paseos Juan, panel del admin">
        <span class="adm-logo"><img src="/paseos-juan-logo-white.svg" alt="" /></span>
        <span class="adm-brand-text">
          <strong>Paseos Juan</strong>
          <small>Panel del admin</small>
        </span>
      </a>
      <div class="adm-header-actions">
        <span class="adm-user">${p(`lock`,`adm-icon-sm`)} Juan Buitrago · Fundador</span>
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
  `}function Go(){let e=Vo(),t=Mo(),n=Po();return`
    <main class="adm-page" id="adm-main">
      ${Ko(e,t)}
      ${qo()}
      <div class="adm-toolbar" role="group" aria-label="Secciones">
        <p class="adm-toolbar-text">Todo lo demás, ordenado. Tocá un título para abrirlo.</p>
        <div class="adm-toolbar-actions">
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="open">${p(`chevronDown`,`adm-icon-sm`)} Abrir todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-expand="close">Cerrar todo</button>
          <button class="adm-button adm-button--ghost" type="button" data-adm-copy>${p(`copy`,`adm-icon-sm`)} Copiar resumen</button>
        </div>
      </div>
      <div class="adm-sections">
        ${Yo(n)}
        ${Xo(n)}
        ${Qo(n)}
        ${ts(n)}
        ${ns(n)}
        ${rs(n)}
      </div>
      ${is()}
      <p class="adm-sr-only" role="status" aria-live="polite" data-adm-status></p>
    </main>
  `}function Ko(e,t){let{dayName:n,date:r}=jo(),i=Fo(),a=i.filter(e=>Nt(e,n,To)).length,o=i.filter(e=>Nt(e,n,Eo)).length,s=e.find(e=>!t.includes(e.id)),c=a+o?`Hoy salen ${Oo(a,`perro`,`perros`)} a la mañana y ${Oo(o,`perro`,`perros`)} a la tarde.`:`Hoy no hay paseos cargados en BASE RUTAS.`;return`
    <section class="adm-hero" aria-labelledby="adm-hero-title">
      <div class="adm-hero-head">
        <p class="adm-eyebrow">${Z(n)} ${Z(r)}</p>
        <h1 id="adm-hero-title">Hola, Juan</h1>
        <p class="adm-hero-sub">${c}</p>
      </div>

      ${s?`
        <div class="adm-next" aria-labelledby="adm-next-title">
          <p class="adm-next-label" id="adm-next-title">${p(`arrowRight`,`adm-icon-sm`)} Próximo paso</p>
          <p class="adm-next-text">${Z(s.action)}</p>
          <div class="adm-next-actions">
            <button class="adm-button adm-button--primary" type="button" data-adm-done="${s.id}">
              ${p(`checkCircle`,`adm-icon-sm`)} Listo, ya lo hice
            </button>
            <button class="adm-button adm-button--ghost" type="button" data-adm-goto="${s.target}">
              ${Z(s.targetLabel)}
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
                <h3>${Z(e.title)}</h3>
                <p>${Z(e.detail)}</p>
                <button class="adm-link-button" type="button" data-adm-done="${e.id}" aria-pressed="${r}">
                  ${r?`Desmarcar`:`Marcar como hecho`}
                </button>
              </div>
            </li>
          `}).join(``)}
      </ol>
      <p class="adm-note">Las marcas de “hecho” se guardan solo en este dispositivo.</p>
    </section>
  `}function qo(){let{conflicts:e,missing:t,notRouted:n}=Lo(),r=Ro();return`
    <section class="adm-safety" id="adm-seguridad" tabindex="-1" aria-labelledby="adm-safety-title">
      <header class="adm-safety-head">
        <span class="adm-safety-icon">${p(`alertTriangle`,`adm-icon`)}</span>
        <div>
          <h2 id="adm-safety-title">Alertas de seguridad</h2>
          <p>Siempre visibles. Fuente: BASE RUTAS (${y}).</p>
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
                    ${Z(e.a)} y ${Z(e.b)}
                    ${[e.a,e.b].filter(e=>/día|lunes|martes|miércoles|jueves|viernes|sábado|contratad/i.test(w.find(t=>t.name===e)?.review||``)).map(e=>`<span class="adm-row-note">Días de ${Z(e)}: dato a revisar</span>`).join(``)}
                  </th>
                  <td>${Z(e.shift)} · ${Z(Bo(e.shift))}</td>
                  <td>${Z(Ao(e.days))}</td>
                </tr>
              `).join(``)}
            </tbody>
          </table>
        </div>
      `:`<p class="adm-empty">No hay perros “no juntar” que compartan turno en BASE RUTAS.</p>`}

      <ul class="adm-safety-list" aria-label="Indicaciones de seguridad por perro">
        ${r.map(e=>`
          <li>
            <strong>${Z(e.name)}</strong>
            <span class="adm-safety-meta">${Z(e.shifts.join(` y `))} · ${Z(Ao(e.days))}</span>
            <span class="adm-safety-notes">${e.safety.map(e=>`<span class="adm-pill adm-pill--danger">${Z(e)}</span>`).join(``)}</span>
          </li>
        `).join(``)}
      </ul>

      ${t.length||n.length?`
        <ul class="adm-footnotes">
          ${t.map(e=>`<li>${Z(e.dog)} figura “no juntar con ${Z(e.other)}”, pero ${Z(e.other)} no está en el registro: ${v}.</li>`).join(``)}
          ${n.map(e=>`<li>${Z(e.dog)} y ${Z(e.other)} figuran “no juntar”. Hoy ${Z(e.idle)} no tiene ruta cargada: si vuelve, revisá el turno.</li>`).join(``)}
        </ul>
      `:``}
    </section>
  `}function Jo(e,t,{title:n,summary:r,iconName:i},a){return`
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
  `}function Yo(e){let t=zo().sort((e,t)=>(e.status===`Activo`)-(t.status===`Activo`)),n=t.filter(e=>e.status!==`Activo`).length;return Jo(`adm-datos`,e,{title:`Datos a revisar`,summary:`${Oo(t.length,`perro`,`perros`)} · ${Oo(n,`con estado a definir`,`con estado a definir`)}`,iconName:`clipboardCheck`},`
    <p class="adm-lead">Inconsistencias entre BASE RUTAS, la tabla de precios y Perros paseados. Se corrigen en la planilla (fuente oficial: ${Z(b.officialSources.dogs)}).</p>
    <ul class="adm-review-list">
      ${t.map(e=>`
        <li class="${e.status===`Activo`?``:`is-status`}">
          <div class="adm-review-head">
            <strong>${Z(e.name)}</strong>
            <span class="adm-muted">${Z(e.id)} · ${Z(e.plan)}</span>
            <span class="adm-pill ${e.status===`Activo`?`adm-pill--neutral`:`adm-pill--warning`}">${Z(e.status)}</span>
          </div>
          <p>${Z(e.review||`Pendiente de confirmar`)}</p>
        </li>
      `).join(``)}
    </ul>
  `)}function Xo(e){let t=Io();return Jo(`adm-carga`,e,{title:`Carga semanal`,summary:`Más carga: ${Z(t.busiest.length?Q(t.busiest):`Sin datos`)} (${Oo(t.maxTotal,`salida`,`salidas`)})`,iconName:`chart`},`
    <p class="adm-lead">Perros por día y turno, calculado de BASE RUTAS (${y}). Solo perros activos: no cuenta bajas ni perros sin ruta. Cada barra lleva su número.</p>
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
                  <span class="adm-day-full">${e.day}</span><span class="adm-day-short" aria-hidden="true">${ko[e.day]}</span>
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
      <li>“Total” suma las salidas del día. ${Q(t.twoShifts.map(e=>e.name))} ${t.twoShifts.length===1?`sale`:`salen`} en los dos turnos, por eso cuentan dos veces.</li>
      <li>Mañana: ruta ${x.manana.route}, supervisa ${x.manana.supervisor}. Tarde: rutas ${x.tarde.routes.join(` y `)}, supervisa ${x.tarde.supervisor}.</li>
      <li>Referencia: el máximo diario histórico fue de ${Z(jt.find(e=>/máximo/i.test(e.label))?.value||`Pendiente de confirmar`)} perros (dato histórico).</li>
    </ul>
  `)}function Zo(e){return/meta/i.test(e)?`meta`:/hist/i.test(e)?`historico`:/calc/i.test(e)?`calculado`:`dato`}function Qo(e){let t=Fo(),n=Io(),r=t.filter(e=>e.category===`SIN EVALUAR`).length,i=[{label:`Perros con ruta activa`,value:String(t.length),source:`Calculado de BASE RUTAS, ${y}`,kind:`Calculado`},{label:`Salidas por semana`,value:String(n.weekTotal),source:`Calculado de BASE RUTAS, ${y}`,kind:`Calculado`},{label:`Perros evaluados`,value:`${t.length-r} de ${t.length}`,source:`Registro maestro, 14/08/2026`,kind:`Dato`}],a=[...jt,...i];return Jo(`adm-indicadores`,e,{title:`Indicadores del negocio`,summary:`${a.length} indicadores, cada uno con su fuente`,iconName:`activity`},`
    <p class="adm-lead">Cada número dice si es un dato, un dato histórico, un cálculo de esta página o una meta.</p>
    <ul class="adm-facts">
      ${a.map(e=>`
        <li class="adm-fact">
          <span class="adm-kind adm-kind--${Zo(e.kind)}">${Z(e.kind)}</span>
          <strong class="adm-fact-value">${Z(e.value)}</strong>
          <span class="adm-fact-label">${Z(e.label)}</span>
          <span class="adm-fact-source">Fuente: ${Z(e.source)}</span>
        </li>
      `).join(``)}
    </ul>
    <details class="adm-inner">
      <summary>Qué significa cada categoría de conducta</summary>
      <dl class="adm-categories">
        ${Object.entries(kt).map(([e,t])=>`
          <div><dt><span class="adm-cat adm-cat--${e.toLowerCase().replace(/\s+/g,`-`)}">${e}</span></dt><dd>${Z(t)}</dd></div>
        `).join(``)}
      </dl>
    </details>
  `)}var $o={admin:{panel:`Admin`,path:`/admin`},paseador:{panel:`Paseador`,path:`/paseador`},supervisor:{panel:`Supervisor`,path:`/supervisor`}},es=[{role:`Admin`,who:Et.admin,can:[`Ve y decide sobre todo el sistema`,`Equipo, permisos, precios y reportes`]},{role:`Coordinador`,who:`${Et.coordinador} (${v.toLowerCase()})`,can:[`Alta de perros`,`Editar datos del cliente`,`Responder el chat de clientes`,`Registrar pagos de apoyo`,`Revisar documentación`,`Derivar al supervisor`]},{role:`Supervisor`,who:Et.supervisor,can:[`Armar rutas y asignar perros`,`Responder el chat de clientes`,`Gestionar ausencias`,`Controlar a los paseadores`,`Revisar alertas`]},{role:`Paseador`,who:Et.paseador,can:[`Ver su ruta`,`Marcar retiro, paseo y entrega`,`Reportar incidentes`,`Subir fotos`,`Leer el chat interno`]},{role:`Cliente`,who:`Cada tutor, solo su perro`,can:[`Ver la ficha de su perro`,`Escribir al chat`,`Subir carnet de vacunas`,`Subir comprobante`,`Ver sus pagos`,`Ver el estado del paseo`]}];function ts(e){return Jo(`adm-equipo`,e,{title:`Equipo y permisos`,summary:`${Oo(Tt.length,`persona`,`personas`)} · ${es.length} roles`,iconName:`users`},`
    <p class="adm-lead">Equipo autorizado. Vos decidís la distribución final de funciones.</p>
    <ul class="adm-team">
      ${Tt.map(e=>{let t=$o[e.role];return`
          <li class="adm-person">
            <div class="adm-person-head">
              <strong>${Z(e.name)}</strong>
              <span class="adm-pill adm-pill--neutral">${Z(e.label)}</span>
            </div>
            <p>${Z(e.tasks)}</p>
            <p class="adm-person-panel">Panel: ${t?`<a href="${t.path}" data-link>${t.panel}</a>`:`<span class="adm-pending">${v}</span>`}</p>
          </li>
        `}).join(``)}
    </ul>
    <p class="adm-note">Otros paseadores figuran como “Paseador asignado”.</p>

    <h3 class="adm-subtitle">Permisos por rol</h3>
    <div class="adm-roles">
      ${es.map(e=>`
        <article class="adm-role">
          <h4>${e.role}</h4>
          <p class="adm-role-who">${Z(e.who)}</p>
          <ul>${e.can.map(e=>`<li>${Z(e)}</li>`).join(``)}</ul>
        </article>
      `).join(``)}
    </div>
  `)}function ns(e){return Jo(`adm-precios`,e,{title:`Planes y precios oficiales`,summary:`${C.length} planes semanales · paseo suelto · descuentos`,iconName:`creditCard`},`
    <p class="adm-lead">Precio semanal por perro, según tamaño. Fuente: hoja Planes actualizados y Tabla de precios (10/11/2026).</p>
    <div class="adm-table-wrap">
      <table class="adm-table adm-prices">
        <caption class="adm-sr-only">Planes semanales por tamaño</caption>
        <thead>
          <tr><th scope="col">Plan</th>${wo.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          ${C.map(e=>`
            <tr>
              <th scope="row">${e.name}<span class="adm-th-sub">${e.walks} paseos por semana</span></th>
              ${wo.map(t=>`<td>${T(e.prices[t])}</td>`).join(``)}
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
          <tr><th scope="col">Tipo</th>${wo.map(e=>`<th scope="col">${e}</th>`).join(``)}</tr>
        </thead>
        <tbody>
          <tr><th scope="row">Individual</th>${wo.map(e=>`<td>${T(Dt[e].individual)}</td>`).join(``)}</tr>
          <tr><th scope="row">En grupo</th>${wo.map(e=>`<td>${T(Dt[e].grupo)}</td>`).join(``)}</tr>
        </tbody>
      </table>
    </div>

    <h3 class="adm-subtitle">Descuento por varios perros</h3>
    <ul class="adm-discounts">
      ${Ot.map(e=>`<li><strong>${e.discount}</strong><span>${e.dogs} perros</span></li>`).join(``)}
    </ul>
    <p class="adm-note">En rutas hay planes que no están en esta tabla (por ejemplo “Plan 3 + individual” y “Plan 6 + 1”): su precio está ${v.toLowerCase()}.</p>
  `)}function rs(e){let t=Ho();return Jo(`adm-finanzas`,e,{title:`Finanzas`,summary:`Fuente oficial: Libro contable`,iconName:`wallet`},`
    <div class="adm-official">
      ${p(`fileCheck`,`adm-icon`)}
      <div>
        <strong>Fuente oficial: Libro contable</strong>
        <p>Lo cobrado, lo pendiente, las deudas y los costos están en el ${Z(b.officialSources.money)}. Esta página no muestra montos reales.</p>
      </div>
    </div>

    <div class="adm-theory">
      <p class="adm-tag adm-tag--warning">Teórica · sin descuentos · no es lo cobrado</p>
      <p class="adm-theory-label">Facturación teórica semanal</p>
      <p class="adm-theory-value">${T(t.total)}</p>
      <p class="adm-theory-help">Suma del precio de tabla de ${Oo(t.included.length,`perro activo`,`perros activos`)} con Plan 1, 2 o 3 según su tamaño. No aplica descuentos por varios perros ni acuerdos personales.</p>
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
        <p class="adm-note">No incluye ${Oo(t.excluded.length,`perro`,`perros`)} con planes fuera de la tabla (precio ${v.toLowerCase()}):</p>
        <ul class="adm-footnotes">
          ${t.excludedPlans.map(e=>`<li>${Z(e)}: ${Q(t.excluded.filter(t=>t.plan===e).map(e=>Z(e.name)))}.</li>`).join(``)}
        </ul>
      `:``}
    </div>
  `)}function is(){let e=b.officialSources;return`
    <footer class="adm-sources">
      <p><strong>Datos actualizados al ${y}.</strong> Perros: ${Z(e.dogs)}. Rutas: ${Z(e.routes)}. Plata: ${Z(e.money)}.</p>
      <p>Esta página no guarda datos de tutores, teléfonos, domicilios ni pagos.</p>
    </footer>
  `}function as(){let{dayName:e,date:t}=jo(),n=Vo(),r=Mo(),i=n.find(e=>!r.includes(e.id)),a=Io();return[`Paseos Juan · Resumen del admin · ${e} ${t}`,``,`Prioridades:`,...n.map((e,t)=>`${t+1}. ${e.title}${r.includes(e.id)?` (hecho)`:``}`),``,`Carga semanal: ${a.weekTotal} salidas. Más carga: ${Q(a.busiest)} (${a.maxTotal}).`,``,`PRÓXIMO PASO: ${i?i.action:`Revisar la carga semanal.`}`,``,`Datos de BASE RUTAS al ${y}.`].join(`
`)}async function os(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}function ss(e){Do=e,setTimeout(()=>{let e=document.querySelector(`[data-adm-status]`);e&&(e.textContent=Do)},60)}function cs(){No(So,[...document.querySelectorAll(`[data-adm-section]`)].filter(e=>e.open).map(e=>e.dataset.admSection))}function ls(e){let t=document.getElementById(e);if(!t)return;t.tagName===`DETAILS`&&(t.open=!0,cs());let n=document.documentElement.dataset.motion===`calm`;t.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`}),(t.tagName===`DETAILS`?t.querySelector(`summary`):t)?.focus({preventScroll:!0})}function us(e){return e.target.closest(`[data-admin-logout]`)?(gs(`/login`),!0):!1}function ds(e){if(!e.target.closest(`.adm-shell`))return!1;if(e.target.closest(`[data-adm-a11y]`))return document.querySelector(`.a11y-toggle`)?.click(),!0;let t=e.target.closest(`[data-adm-done]`);if(t){let e=t.dataset.admDone,n=Mo(),r=n.includes(e);return No(xo,r?n.filter(t=>t!==e):[...n,e]),$(),document.querySelector(`.adm-priority [data-adm-done="${e}"]`)?.focus({preventScroll:!0}),ss(r?`Prioridad desmarcada.`:`Prioridad marcada como hecha. Se actualizó el próximo paso.`),!0}let n=e.target.closest(`[data-adm-goto]`);if(n)return ls(n.dataset.admGoto),!0;let r=e.target.closest(`[data-adm-expand]`);if(r){let e=r.dataset.admExpand===`open`;return document.querySelectorAll(`[data-adm-section]`).forEach(t=>{t.open=e}),cs(),ss(e?`Secciones abiertas.`:`Secciones cerradas.`),!0}return e.target.closest(`[data-adm-copy]`)?(os(as()).then(e=>{ss(e?`Resumen copiado. Pegalo en WhatsApp o en tus notas.`:`No se pudo copiar. Probá de nuevo.`)}),!0):!1}function fs(e){e.target.matches?.(`[data-adm-section]`)&&cs()}function ps(){be.push(us),Se.push(ds),document.addEventListener(`toggle`,fs,!0)}var ms=document.querySelector(`#app`);function hs(e){return e.replace(/\/+$/,``)||`/`}function gs(t){if(t.includes(`#`)){let[n,r]=t.split(`#`);window.history.pushState({},``,`${n||window.location.pathname}#${r}`),e.menuOpen=!1,$(),requestAnimationFrame(()=>document.getElementById(r)?.scrollIntoView({behavior:`smooth`}))}else window.history.pushState({},``,t),e.menuOpen=!1,$()}window.addEventListener(`popstate`,$),window.addEventListener(`paseosJuanStoreUpdate`,$),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&$()}),Ee(),ht(),wt(),Yn(),Xr(),ua(),bo(),ps(),document.addEventListener(`click`,e=>{if(Ce(be,e))return;let t=e.target.closest(`[data-link]`);t&&(e.preventDefault(),gs(t.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{Ce(xe,e)});function $(){let e=hs(window.location.pathname);if(e===`/`){ms.innerHTML=ot(),vs();return}if(e===`/login`){ms.innerHTML=vt(),vs();return}if(e===`/salir`){window.history.replaceState({},``,`/login`),g.clear(),ms.innerHTML=vt(),vs();return}if(e===`/registro`||e===`/register`){ms.innerHTML=bt(),vs();return}let n=e.match(/^\/dashboard\/([a-z]+)$/),r=n?n[1]:e.slice(1);t[r]&&r!==`visitante`?(ms.innerHTML=_s(r),vs()):(ms.innerHTML=ge(),vs())}function _s(e){if(e===`cliente`)return ys(e);let t=g.user();return t?(et[t.rol]||[]).includes(e)?ys(e):xt(e):(window.history.replaceState({},``,`/login?volver=/${e}`),vt())}function vs(){let t=document.getElementById(`global-overlay`);t||(t=document.createElement(`div`),t.id=`global-overlay`,document.body.appendChild(t)),t.innerHTML=_e()+ye(),document.body.classList.toggle(`menu-locked`,e.menuOpen),Ue(),He()}function ys(e){let n=t[e],r=e===`cliente`,i=e===`paseador`,a=e===`supervisor`,o={admin:Go,coordinador:Za,supervisor:Vi,paseador:Or,cliente:bn}[e]();return i?Dr(o):a?zi(o):e===`coordinador`?Ya(o):e===`admin`?Uo(o):le(`
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
  `,e)}Be(),Ze(e=>{e===`sesion`&&$()}),g.user()&&(g.refresh().catch(()=>{}),rt()),Ie(()=>He()),$(),document.addEventListener(`click`,e=>{Ce(Se,e)});