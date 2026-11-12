(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(){return{users:n(`paseosJuan_users`,[]),clients:n(`paseosJuan_clients`,[]),dogs:n(`paseosJuan_dogs`,[]),routes:n(`paseosJuan_routes`,[]),payments:n(`paseosJuan_payments`,[]),alerts:n(`paseosJuan_alerts`,[]),reports:n(`paseosJuan_reports`,[]),chats:n(`paseosJuan_chats`,[]),settings:n(`paseosJuan_settings`,{})}}function t(e){e.users&&localStorage.setItem(`paseosJuan_users`,JSON.stringify(e.users)),e.clients&&localStorage.setItem(`paseosJuan_clients`,JSON.stringify(e.clients)),e.dogs&&localStorage.setItem(`paseosJuan_dogs`,JSON.stringify(e.dogs)),e.routes&&localStorage.setItem(`paseosJuan_routes`,JSON.stringify(e.routes)),e.payments&&localStorage.setItem(`paseosJuan_payments`,JSON.stringify(e.payments)),e.alerts&&localStorage.setItem(`paseosJuan_alerts`,JSON.stringify(e.alerts)),e.reports&&localStorage.setItem(`paseosJuan_reports`,JSON.stringify(e.reports)),e.chats&&localStorage.setItem(`paseosJuan_chats`,JSON.stringify(e.chats)),e.settings&&localStorage.setItem(`paseosJuan_settings`,JSON.stringify(e.settings)),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function n(e,t){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch{return t}}function r(e,t=null){localStorage.setItem(`paseosJuanActiveModal`,JSON.stringify({type:e,data:t})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function i(){localStorage.removeItem(`paseosJuanActiveModal`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}function a(e,t=`success`){localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:e,type:t,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`))}var o=[{id:`conv-laura-kiara`,clientName:`Laura`,dogs:[`Kiara`,`Cashi`],status:`Abierto`,lastUpdated:Date.now()-1e5,messages:[{id:`msg-1`,conversationId:`conv-laura-kiara`,senderRole:`cliente`,senderName:`Laura`,text:`¿Mañana hay paseo?`,timestamp:`10:30`,read:!1,type:`normal`}]},{id:`conv-martin-bruno`,clientName:`Martín`,dogs:[`Bruno`],status:`Documentación pendiente`,lastUpdated:Date.now()-2e5,messages:[{id:`msg-2`,conversationId:`conv-martin-bruno`,senderRole:`cliente`,senderName:`Martín`,text:`Ya subí el carnet de vacunas.`,timestamp:`10:15`,read:!0,type:`normal`},{id:`msg-3`,conversationId:`conv-martin-bruno`,senderRole:`coordinador`,senderName:`Coordinador`,text:`Perfecto, lo revisamos y te avisamos si falta algo.`,timestamp:`10:18`,read:!0,type:`normal`}]},{id:`conv-sol-pistacho`,clientName:`Sol`,dogs:[`Pistacho`],status:`Consulta comercial`,lastUpdated:Date.now()-3e5,messages:[{id:`msg-4`,conversationId:`conv-sol-pistacho`,senderRole:`cliente`,senderName:`Sol`,text:`Quiero consultar el Plan 2.`,timestamp:`09:00`,read:!1,type:`normal`}]}];function s(){let e=localStorage.getItem(`paseosJuanChatMessages`);if(e)try{return JSON.parse(e)}catch{return o}return localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(o)),o}function c(e){return[`cliente`,`coordinador`,`supervisor`,`admin`].includes(e)}function l(e,t,n,r,i=`normal`){if(!c(t))return localStorage.setItem(`paseosJuanToast`,JSON.stringify({message:`Solo coordinación o supervisión pueden responder al cliente.`,type:`error`,id:Date.now()})),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)),!1;let a=s(),o=a.findIndex(t=>t.id===e);if(o===-1)return!1;let l=new Date,u=l.getHours().toString().padStart(2,`0`),d=l.getMinutes().toString().padStart(2,`0`),f={id:`msg-${Date.now()}`,conversationId:e,senderRole:t,senderName:n,text:r,timestamp:`${u}:${d}`,read:!1,type:i};return a[o].messages.push(f),a[o].lastUpdated=Date.now(),localStorage.setItem(`paseosJuanChatMessages`,JSON.stringify(a)),!0}var u={admin:{label:`Admin`,route:`/admin`,legacyRoute:`/dashboard/admin`,intent:`Control total del negocio, permisos, usuarios, finanzas y configuracion.`},coordinador:{label:`Coordinador`,route:`/coordinador`,legacyRoute:`/dashboard/coordinador`,intent:`Gestion operativa diaria, asignaciones, rutas, agenda y comunicacion.`},supervisor:{label:`Supervisor`,route:`/supervisor`,legacyRoute:`/dashboard/supervisor`,intent:`Control grupal, seguridad, calidad de paseos e incidentes.`},paseador:{label:`Paseador`,route:`/paseador`,legacyRoute:`/dashboard/paseador`,intent:`Ejecucion de paseos, retiros, entregas, reportes y metricas personales.`},cliente:{label:`Cliente`,route:`/cliente`,legacyRoute:`/dashboard/cliente`,intent:`Seguimiento del perro, confianza, pagos, planes y contacto.`},visitante:{label:`Visitante`,route:`/visitante`,intent:`Visualizacion publica, informacion comercial y reserva de evaluacion.`}},d={whatsapp:`5491151460864`,whatsappLabel:`11 5146-0864`,zone:`Pilar y La Lonja`},f={title:`Muestra gratis de DogPro o CatPro + un paseo de regalo`,detail:`Abierta a cualquier persona: no hace falta ser cliente ni hacer una visita previa.`,until:`2026-12-01`,untilLabel:`01/12/2026`};function p(e){return`https://wa.me/${d.whatsapp}?text=${encodeURIComponent(e)}`}function m(e=new Date){return e<=new Date(`${f.until}T23:59:59-03:00`)}var ee=[{id:`luna`,name:`Luna`,breed:`Mestiza`,age:`4 anos`,energy:`Alta`,behavior:`Sociable, tira al inicio`,risk:`Medio`,compatibility:`Mejor con perros adultos tranquilos`,observations:`Evitar motos y cruces muy ruidosos.`,vet:`Vet Palermo`,vaccines:`Completo`},{id:`tango`,name:`Tango`,breed:`Caniche`,age:`7 anos`,energy:`Media`,behavior:`Ansioso en retiros`,risk:`Bajo`,compatibility:`Compatible con grupos pequenos`,observations:`Premiar al salir del ascensor.`,vet:`San Roque`,vaccines:`Refuerzo pendiente en 30 dias`},{id:`nala`,name:`Nala`,breed:`Border Collie`,age:`2 anos`,energy:`Muy alta`,behavior:`Necesita estructura`,risk:`Medio`,compatibility:`No juntar con perros reactivos`,observations:`Usar correa larga solo en zona segura.`,vet:`Animal Care`,vaccines:`Completo`}],h=[{id:`walk-103`,time:`Hoy 10:00`,zone:`Palermo Chico`,status:`Esperando retiro`,dogs:[`Luna`,`Tango`,`Nala`],walker:`Mica`,route:[`Ugarteche 2980`,`Cabello 3600`,`Parque Las Heras`,`Republica Arabe Siria 2900`],earnings:`$18.500`},{id:`walk-102`,time:`Ayer 16:30`,zone:`Botanico`,status:`Entregado`,dogs:[`Luna`,`Roco`],walker:`Mica`,route:[`Guemes 4200`,`Jardin Botanico`,`Santa Fe 3900`],earnings:`$12.000`}],g=[{id:`bruno`,name:`Bruno`,size:`Mediano`,energy:`Alta`,risk:`Bajo`,behavior:`Sociable, tira al inicio`,location:`Casa 12`,note:`Usar correa corta los primeros cinco minutos.`},{id:`luna`,name:`Luna`,size:`Mediano`,energy:`Alta`,risk:`Medio`,behavior:`Sociable, evitar motos`,location:`Casa 18`,note:`Bajar ritmo cerca de avenidas o ruidos fuertes.`},{id:`tango`,name:`Tango`,size:`Pequeño`,energy:`Media`,risk:`Bajo`,behavior:`Ansioso en retiros`,location:`Torre Norte`,note:`Premiar calma al salir del edificio.`},{id:`kiara`,name:`Kiara`,size:`Mediano`,energy:`Media`,risk:`Bajo`,behavior:`Buena, camina estable`,location:`Casa 25`,note:`Mantener posición central del grupo.`},{id:`cashi`,name:`Cashi`,size:`Pequeño`,energy:`Media`,risk:`Bajo`,behavior:`Tranquila`,location:`Casa 25`,note:`Puede ir cerca de Tango.`},{id:`caipi`,name:`Caipi`,size:`Mediano`,energy:`Alta`,risk:`Medio`,behavior:`Activa, requiere control inicial`,location:`Casa 31`,note:`Separar de estímulos al iniciar el paseo.`}],te=[`Correas revisadas`,`Agua cargada`,`Bolsitas disponibles`,`Bozales necesarios`,`Botiquín básico`,`Teléfono con batería`],ne=[`Preparación`,`Retiro`,`Paseo en curso`,`Regreso`,`Entregado`],_=[`Avisar demora`,`Perro retirado`,`Paseo iniciado`,`Paseo finalizado`,`Contactar supervisor`],v=[{id:`sebastian`,name:`Sebastián`,role:`Paseador`,group:`Grupo A`,schedule:`15:00 - 16:30`,status:`En retiro`,dogs:6},{id:`bauti`,name:`Bauti`,role:`Paseador`,group:`Grupo B`,schedule:`15:00 - 16:30`,status:`Pendiente de inicio`,dogs:6}],y=[{id:`grupo-a`,name:`Grupo A`,walker:`Sebastián`,averageRisk:`Medio`,status:`En retiro`,dogs:[[`Bruno`,`Bajo`],[`Luna`,`Medio`],[`Tango`,`Bajo`],[`Kiara`,`Bajo`],[`Cashi`,`Bajo`],[`Caipi`,`Medio`]]},{id:`grupo-b`,name:`Grupo B`,walker:`Bauti`,averageRisk:`Medio`,status:`Pendiente`,dogs:[[`Manolo`,`Bajo`],[`Nole`,`Bajo`],[`Ron`,`Medio`],[`Coqui`,`Bajo`],[`Forest`,`Medio`],[`Pistacho`,`Bajo`]]}],b=[{id:`bruno`,dog:`Bruno`,location:`Casa 12`,walker:`Sebastián`,status:`Retirado`,eta:`15:10`},{id:`luna`,dog:`Luna`,location:`Casa 18`,walker:`Sebastián`,status:`Retirado`,eta:`15:15`},{id:`tango`,dog:`Tango`,location:`Torre Norte`,walker:`Sebastián`,status:`Pendiente`,eta:`15:20`},{id:`manolo`,dog:`Manolo`,location:`Casa 30`,walker:`Bauti`,status:`Pendiente`,eta:`15:10`},{id:`forest`,dog:`Forest`,location:`Casa 41`,walker:`Bauti`,status:`Pendiente`,eta:`15:25`}],x=[{id:`luna`,dog:`Luna`,type:`Riesgo medio`,level:`Medio`,description:`Evitar cruces con motos y perros externos.`},{id:`forest`,dog:`Forest`,type:`Uso de bozal`,level:`Medio`,description:`Confirmar bozal antes de integrar al grupo.`},{id:`ron`,dog:`Ron`,type:`Energía alta`,level:`Medio`,description:`Requiere control inicial en los primeros minutos.`}],re=[`Paseadores presentes`,`Equipamiento revisado`,`Bozales confirmados cuando corresponde`,`Botiquín disponible`,`Rutas verificadas`,`Clientes críticos revisados`,`Comunicación con equipo activa`],S=[{id:`report-luna`,walker:`Sebastián`,dog:`Luna`,type:`Cruce con perro externo`,level:`Medio`,status:`Pendiente de revisión`,description:`Se evitó cruce directo y se mantuvo distancia operativa.`},{id:`report-forest`,walker:`Bauti`,dog:`Forest`,type:`Bozal confirmado`,level:`Bajo`,status:`Revisado`,description:`Bozal colocado antes de integrarlo al grupo.`}],C=[{id:`bruno`,name:`Bruno`,risk:`Bajo`,energy:`Alta`,recommended:`Paseador`},{id:`luna`,name:`Luna`,risk:`Medio`,energy:`Alta`,recommended:`Supervisor`,reason:`Evitar motos y perros externos`},{id:`tango`,name:`Tango`,risk:`Bajo`,energy:`Media`,recommended:`Paseador`},{id:`kiara`,name:`Kiara`,risk:`Bajo`,energy:`Media`,recommended:`Paseador`},{id:`cashi`,name:`Cashi`,risk:`Bajo`,energy:`Media`,recommended:`Paseador`},{id:`caipi`,name:`Caipi`,risk:`Medio`,energy:`Alta`,recommended:`Supervisor`,reason:`Requiere control inicial`},{id:`forest`,name:`Forest`,risk:`Medio`,energy:`Media`,recommended:`Supervisor`,reason:`Requiere bozal confirmado`},{id:`ron`,name:`Ron`,risk:`Medio`,energy:`Alta`,recommended:`Supervisor`,reason:`Energía alta y carácter fuerte`},{id:`manolo`,name:`Manolo`,risk:`Bajo`,energy:`Media`,recommended:`Paseador`},{id:`pistacho`,name:`Pistacho`,risk:`Bajo`,energy:`Media`,recommended:`Paseador`}],w=[{id:`bruno`,name:`Bruno`,zone:`Mapuche Norte`,location:`Casa 12`,energy:`Alta`,risk:`Bajo`,compatibility:`Buena`},{id:`luna`,name:`Luna`,zone:`Mapuche Norte`,location:`Casa 18`,energy:`Alta`,risk:`Medio`,compatibility:`Evitar motos y perros externos`},{id:`tango`,name:`Tango`,zone:`Mapuche Norte`,location:`Torre Norte`,energy:`Media`,risk:`Bajo`,compatibility:`Compatible con grupos pequeños`},{id:`kiara`,name:`Kiara`,zone:`Mapuche Norte`,location:`Casa 25`,energy:`Media`,risk:`Bajo`,compatibility:`Buena`},{id:`cashi`,name:`Cashi`,zone:`Mapuche Norte`,location:`Casa 25`,energy:`Media`,risk:`Bajo`,compatibility:`Tranquila`},{id:`caipi`,name:`Caipi`,zone:`Mapuche Norte`,location:`Casa 31`,energy:`Alta`,risk:`Medio`,compatibility:`Requiere control inicial`},{id:`manolo`,name:`Manolo`,zone:`Mapuche Sur`,location:`Casa 30`,energy:`Media`,risk:`Bajo`,compatibility:`Buena`},{id:`nole`,name:`Nole`,zone:`Mapuche Sur`,location:`Casa 34`,energy:`Media`,risk:`Bajo`,compatibility:`Buena`},{id:`ron`,name:`Ron`,zone:`Mapuche Sur`,location:`Casa 37`,energy:`Alta`,risk:`Medio`,compatibility:`Controlar inicio`},{id:`coqui`,name:`Coqui`,zone:`Mapuche Sur`,location:`Casa 39`,energy:`Media`,risk:`Bajo`,compatibility:`Buena`},{id:`forest`,name:`Forest`,zone:`Mapuche Sur`,location:`Casa 41`,energy:`Media`,risk:`Medio`,compatibility:`Requiere bozal confirmado`},{id:`pistacho`,name:`Pistacho`,zone:`Mapuche Sur`,location:`Casa 45`,energy:`Media`,risk:`Bajo`,compatibility:`Buena`}],T=[{id:`laura`,client:`Laura`,dogs:`Kiara y Cashi`,plan:`Plan 2`,amount:`$72.500`,status:`Al día`,due:`15 del mes`,lastPayment:`Confirmado`},{id:`martin`,client:`Martín`,dogs:`Bruno`,plan:`Plan 2`,amount:`$37.500`,status:`Pendiente`,due:`15 del mes`,lastPayment:`Sin confirmar`},{id:`sol`,client:`Sol`,dogs:`Pistacho`,plan:`Plan 2`,amount:`$37.500`,status:`Pago por confirmar`,due:`15 del mes`,lastPayment:`Pendiente`},{id:`vilma`,client:`Vilma`,dogs:`Frida y Natividad`,plan:`Plan 1`,amount:`$45.900`,status:`Deuda`,due:`10 del mes`,lastPayment:`Vencido`}],ie=[{id:`hist-laura`,client:`Laura`,dogs:`Kiara y Cashi`,amount:`$72.500`,method:`Transferencia`,date:`15/05`,status:`Confirmado`,notes:`Pago mensual acreditado.`,receipt:`comprobante-laura.pdf`},{id:`hist-martin`,client:`Martín`,dogs:`Bruno`,amount:`$37.500`,method:`Transferencia`,date:`Pendiente`,status:`Sin pagar`,notes:`Pago pendiente de recepción.`,receipt:``},{id:`hist-sol`,client:`Sol`,dogs:`Pistacho`,amount:`$37.500`,method:`Mercado Pago`,date:`14/05`,status:`Por confirmar`,notes:`Comprobante recibido, pendiente de validación.`,receipt:`mp-sol.jpg`}],E=`dejandohuellas.plan`,ae=[[`Perros activos`,`24`,`pawPrint`],[`Clientes activos`,`18`,`users`],[`Paseadores activos`,`3`,`userCheck`],[`Supervisores`,`1`,`shieldCheck`],[`Coordinadores`,`1`,`briefcase`],[`Ingresos del mes`,`$1.240.000`,`wallet`],[`Cobros pendientes`,`$185.000`,`creditCard`],[`Alertas críticas`,`4`,`alertTriangle`]],D=[[`Admin / Dirección`,`Control total del sistema, permisos, precios y reportes generales.`,`shieldCheck`],[`Coordinador`,`Clientes, perros nuevos, documentación, cobros, evaluaciones y comunicación.`,`briefcase`],[`Supervisor`,`Campo, rutas, paseadores, reemplazos, asignación de perros y control operativo.`,`radar`],[`Paseador`,`Ejecución del paseo, checklist, perros asignados, ruta y reportes.`,`route`],[`Cliente`,`Seguimiento de su perro, pagos, documentación, beneficios y chat.`,`pawPrint`]],O=[[`Juan`,`Admin`,`Activo`],[`Coordinador demo`,`Coordinador`,`Activo`],[`Nico`,`Supervisor`,`Activo`],[`Sebastián`,`Paseador`,`Activo`],[`Martín`,`Cliente`,`Activo`]],oe=[[`Coordinador`,`3 evaluaciones derivadas`,`fileText`],[`Supervisor`,`2 grupos controlados`,`radar`],[`Paseadores`,`1 reporte operativo`,`activity`],[`Clientes`,`5 solicitudes abiertas`,`message`],[`Cobros`,`$85.000 pendiente`,`wallet`],[`Incidentes`,`1 alerta crítica`,`alertTriangle`]],k=[[`Laura`,`Kiara y Cashi`,`Mapuche Norte`,`Plan 2`,`Aprobada`,`Al día`],[`Martín`,`Bruno`,`Mapuche Norte`,`Plan 2`,`Pendiente`,`Pago pendiente`],[`Sol`,`Pistacho`,`Mapuche Sur`,`Plan 2`,`Aprobada`,`Por confirmar`],[`Vilma`,`Frida y Natividad`,`Mapuche Centro`,`Plan 1`,`Revisión`,`Deuda`]],A=[`Configurar roles`,`Configurar permisos`,`Configurar zonas`,`Configurar planes`,`Configurar límites de perros`,`Configurar alias de pago`,`Configurar mensajes automáticos`,`Configurar documentación requerida`],se=[[`Forest`,`Bozal obligatorio`,`Confirmar antes de integrarlo al grupo.`],[`Martín`,`Pago pendiente`,`Enviar recordatorio y pedir comprobante.`],[`Bruno`,`Documentación pendiente`,`Solicitar carnet actualizado.`],[`Paseador ausente`,`Cobertura de ruta`,`Asignar reemplazo o supervisor.`]],ce=[{id:`nuevo-ingreso`,type:`Nuevo ingreso`,client:`Martín`,dog:`Bruno`,zone:`Mapuche Norte`,status:`Perfil por completar`,detail:`Cliente nuevo solicita integrar a Bruno al grupo de tarde.`},{id:`consulta-plan`,type:`Consulta de plan`,client:`Sol`,dog:`Pistacho`,zone:`Mapuche Sur`,status:`Consulta abierta`,detail:`Quiere conocer disponibilidad y precios del Plan 2.`},{id:`evaluacion-inicial`,type:`Evaluación inicial`,client:`Laura`,dog:`Kiara`,zone:`Mapuche Norte`,status:`Lista para evaluación`,detail:`Requiere coordinación con supervisor para primera salida controlada.`},{id:`cambio-conducta`,type:`Cambio de conducta`,client:`Vilma`,dog:`Frida`,zone:`Mapuche Centro`,status:`Revisión de riesgo`,detail:`Cliente informó mayor reactividad ante perros externos.`},{id:`documentacion-pendiente`,type:`Documentación pendiente`,client:`Martín`,dog:`Bruno`,zone:`Mapuche Norte`,status:`Falta carnet`,detail:`Solicitar carnet de vacunas actualizado antes de confirmar plan.`}],le=[{name:`Correa reforzada`,price:`$19.900`,tag:`Seguridad`,icon:`packageCheck`,description:`Ideal para paseos controlados y perros con fuerza media o alta.`},{name:`Kit paseo`,price:`$34.500`,tag:`Equipamiento`,icon:`shoppingBag`,description:`Incluye accesorios básicos para una rutina más ordenada y segura.`},{name:`Snacks naturales`,price:`$8.900`,tag:`Premios`,icon:`bone`,description:`Premios simples para reforzar buenas conductas antes o después del paseo.`}],j=[`Pequeño`,`Mediano`,`Grande`],M=[{name:`Plan 1`,walks:`3 paseos semanales`,prices:[`$24.000`,`$27.000`,`$30.000`],benefits:[`Descuento con entrenador canino`]},{name:`Plan 2`,walks:`5 paseos semanales`,prices:[`$35.000`,`$37.500`,`$40.000`],benefits:[`Descuento con entrenador canino`,`Descuento con veterinaria`]},{name:`Plan 3`,walks:`6 paseos semanales`,prices:[`$39.000`,`$42.000`,`$45.000`],benefits:[`Descuento con entrenador canino`,`Descuento con veterinaria`,`Descuento en baño en seco`]}],ue=[[`2 perros`,`10%`],[`3 perros`,`20%`],[`4 perros`,`30%`]],de=[{size:`Pequeño`,individual:`$10.000`,group:`$8.000`},{size:`Mediano`,individual:`$12.000`,group:`$10.000`},{size:`Grande`,individual:`$14.000`,group:`$12.000`}],fe=[[`Admin`,`Control total`],[`Coordinador`,`Gestion operativa`],[`Supervisor`,`Control grupal`],[`Paseador`,`Ejecucion de paseos`],[`Cliente`,`Seguimiento de su perro`],[`Visitante`,`Solo visualizacion publica`]],pe=[[`Inicio`,`/`,`home`],[`Sobre nosotros`,`/#sobre-nosotros`,`shieldCheck`],[`Planes`,`/#planes`,`calendarCheck`],[`Compromiso`,`/#testimonios`,`message`],[`Preguntas frecuentes`,`/#faq`,`help`],[`Contacto`,`/#contacto`,`mail`],[`Login`,`/login`,`logIn`],[`Registro`,`/registro`,`userPlus`]],N=document.querySelector(`#app`),P=!1,F=!1,I;function L(e,t=`line-icon`){let n=`class="${t}" viewBox="0 0 24 24" aria-hidden="true"`,r={activity:`<path d="M4 12h4l2-6 4 12 2-6h4" />`,arrowRight:`<path d="M5 12h14" /><path d="m13 6 6 6-6 6" />`,briefcase:`<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><path d="M4 7h16v12H4z" /><path d="M9 12h6" />`,briefcaseMedical:`<path d="M10 6V5a2 2 0 0 1 4 0v1" /><path d="M4 7h16v12H4z" /><path d="M12 11v5" /><path d="M9.5 13.5h5" />`,calendarCheck:`<path d="M7 3v4" /><path d="M17 3v4" /><path d="M4 8h16" /><path d="M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="m9 15 2 2 4-5" />`,camera:`<path d="M14 6 13 4h-2L10 6H6a2 2 0 0 0-2 2v10h16V8a2 2 0 0 0-2-2Z" /><circle cx="12" cy="13" r="3" />`,checkCircle:`<circle cx="12" cy="12" r="9" /><path d="m8.5 12 2.4 2.4 4.9-5" />`,chart:`<path d="M4 19V5" /><path d="M4 19h16" /><path d="M8 15V9" /><path d="M12 15V6" /><path d="M16 15v-4" />`,clipboardCheck:`<path d="M9 4h6l1 2h3v15H5V6h3l1-2Z" /><path d="M9 4h6" /><path d="m8.5 14 2 2 4.8-5" />`,clock:`<circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />`,alertCircle:`<circle cx="12" cy="12" r="9" /><path d="M12 7v6" /><path d="M12 17h.01" />`,alertTriangle:`<path d="M12 3 22 20H2L12 3Z" /><path d="M12 9v5" /><path d="M12 17h.01" />`,archive:`<rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v12h14V8" /><path d="M10 12h4" />`,bell:`<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" />`,bone:`<path d="M7.5 8.5a3 3 0 1 1 2-5.2 3 3 0 0 1 5 0 3 3 0 1 1 2 5.2l-8 7a3 3 0 1 1-2-5.2 3 3 0 0 1 0-3.6 3 3 0 0 1 1 1.8Z" />`,chevronDown:`<path d="m6 9 6 6 6-6" />`,compass:`<circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />`,creditCard:`<rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /><path d="M7 15h4" />`,database:`<ellipse cx="12" cy="5" rx="7" ry="3" /><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" /><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />`,copy:`<rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />`,dollarSign:`<path d="M12 2v20" /><path d="M17 6.5c-1.2-1-2.8-1.5-5-1.5-3 0-5 1.4-5 3.5 0 5 10 2.5 10 7.5 0 2.1-2 3.5-5 3.5-2.2 0-4-.6-5.5-1.8" />`,droplets:`<path d="M7 3C5 6 4 8.2 4 10a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" /><path d="M17 3c-2 3-3 5.2-3 7a3 3 0 0 0 6 0c0-1.8-1-4-3-7Z" />`,eye:`<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="3" />`,fileCheck:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="m8.5 15 2 2 4.5-5" />`,fileText:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M8 13h8" /><path d="M8 17h5" />`,fileUp:`<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z" /><path d="M14 3v6h6" /><path d="M12 17v-6" /><path d="m9 14 3-3 3 3" />`,heartPulse:`<path d="M20.5 8.8c0 5.2-8.5 10.2-8.5 10.2S3.5 14 3.5 8.8A4.3 4.3 0 0 1 11 6a4.3 4.3 0 0 1 9.5 2.8Z" /><path d="M7 12h3l1-2 2 5 1.5-3H17" />`,help:`<circle cx="12" cy="12" r="9" /><path d="M9.8 9a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.2-1.7 2.6" /><path d="M12 17h.01" />`,home:`<path d="m4 11 8-7 8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-6h4v6" />`,logIn:`<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M4 12h10" /><path d="m10 8 4 4-4 4" />`,logOut:`<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" /><path d="M14 12H4" /><path d="m18 8 4 4-4 4" />`,lock:`<rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /><path d="M12 15v2" />`,mail:`<path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" />`,mapPin:`<path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" /><circle cx="12" cy="10" r="2.4" />`,medal:`<path d="M8 3h8l-2 5h-4L8 3Z" /><circle cx="12" cy="14" r="5" /><path d="m10.5 14 1 1.2 2.2-2.4" />`,message:`<path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8 8 0 1 1 21 12Z" />`,navigation:`<path d="m12 2 7 19-7-4-7 4 7-19Z" />`,packageCheck:`<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4.5 8 12 12.2 19.5 8" /><path d="M12 21v-8.8" /><path d="m9.2 16 1.8 1.8 3.8-4.1" />`,pawPrint:`<circle cx="8" cy="9" r="1.6" /><circle cx="12" cy="7" r="1.7" /><circle cx="16" cy="9" r="1.6" /><circle cx="18" cy="13" r="1.5" /><path d="M7.5 16.4c.8-2.1 2.4-3.3 4.5-3.3s3.7 1.2 4.5 3.3c.5 1.4-.5 2.6-1.9 2.3l-1.5-.4a4.5 4.5 0 0 0-2.2 0l-1.5.4c-1.4.3-2.4-.9-1.9-2.3Z" />`,play:`<circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4V8Z" />`,flag:`<path d="M5 21V4" /><path d="M5 4h12l-1.5 4L17 12H5" />`,radar:`<circle cx="12" cy="12" r="8" /><path d="M12 12 17 7" /><path d="M12 4v2" /><path d="M12 18v2" /><path d="M4 12h2" /><path d="M18 12h2" />`,radio:`<path d="M4 9h16v11H4z" /><path d="m8 9 8-6" /><circle cx="8" cy="14" r="2" /><path d="M14 14h3" /><path d="M14 17h2" />`,plus:`<path d="M12 5v14" /><path d="M5 12h14" />`,receipt:`<path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1 2-1V3Z" /><path d="M8 7h8" /><path d="M8 11h8" /><path d="M8 15h5" />`,route:`<circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />`,shieldCheck:`<path d="M12 3 20 6v6c0 5-3.4 8-8 9-4.6-1-8-4-8-9V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" />`,send:`<path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" />`,settings:`<path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 3.6-.2-.1a1.7 1.7 0 0 0-2 .3l-.3.2a1.7 1.7 0 0 0-1 1.5V23H9.8v-.5a1.7 1.7 0 0 0-1-1.5l-.3-.2a1.7 1.7 0 0 0-2-.3l-.2.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-3.6.2.1a1.7 1.7 0 0 0 2-.3l.3-.2a1.7 1.7 0 0 0 1-1.5V1h4.4v.5a1.7 1.7 0 0 0 1 1.5l.3.2a1.7 1.7 0 0 0 2 .3l.2-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1Z" />`,sliders:`<path d="M4 6h8" /><path d="M16 6h4" /><path d="M14 4v4" /><path d="M4 12h4" /><path d="M12 12h8" /><path d="M10 10v4" /><path d="M4 18h10" /><path d="M18 18h2" /><path d="M16 16v4" />`,shoppingBag:`<path d="M6 8h12l-1 13H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /><path d="M9.5 14h5" />`,uploadCloud:`<path d="M16 16 12 12l-4 4" /><path d="M12 12v9" /><path d="M20 17.6A5 5 0 0 0 18 8h-1.3A7 7 0 0 0 3 10.4" /><path d="M5 18a4 4 0 0 1 0-8" />`,userCheck:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="m16 13 2 2 4-5" />`,userPlus:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 8v6" /><path d="M15 11h6" />`,users:`<circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 11a3 3 0 0 0 0-6" /><path d="M17 20a5 5 0 0 0-2-4" />`,wallet:`<path d="M19 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10H5a3 3 0 0 1-3-3V6" /><path d="M16 13h.01" />`,x:`<path d="M6 6 18 18" /><path d="M18 6 6 18" />`};return`<svg ${n} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${r[e]||r.shieldCheck}</svg>`}function me(e){return e.replace(/\/+$/,``)||`/`}function R(e){if(e.includes(`#`)){let[t,n]=e.split(`#`);window.history.pushState({},``,`${t||window.location.pathname}#${n}`),P=!1,z(),requestAnimationFrame(()=>document.getElementById(n)?.scrollIntoView({behavior:`smooth`}));return}window.history.pushState({},``,e),P=!1,z()}window.addEventListener(`popstate`,z),window.addEventListener(`paseosJuanStoreUpdate`,z),window.addEventListener(`storage`,e=>{e.key===`paseosJuanChatMessages`&&z()}),document.addEventListener(`click`,n=>{let r=n.target.closest(`[data-chat-select]`);if(r){localStorage.setItem(`paseosJuanActiveChat`,r.dataset.chatSelect),z();return}let i=n.target.closest(`[data-chat-send-shared]`);if(i){let e=i.dataset.chatSendShared,t=document.querySelector(`[data-chat-input-shared="${e}"]`),n=t?.value?.trim();if(!n)return;let r=i.dataset.chatRole,a=i.dataset.chatSender;l(e,r,a,n)&&(t&&(t.value=``),localStorage.removeItem(`paseosJuanChatDraft`),z());return}let o=n.target.closest(`[data-chat-quick-shared]`);if(o){let e=o.dataset.chatQuickShared,t=o.dataset.chatRole,n=o.dataset.chatSender,r=o.dataset.chatConversation;l(r,t,n,e)&&z();return}if(n.target.closest(`[data-menu-toggle]`)){P=!P,z();return}if(n.target.closest(`[data-menu-close]`)){P=!1,z();return}let s=n.target.closest(`[data-demo-register]`);if(s){n.preventDefault();let e=s.closest(`form`),t={name:e?.querySelector(`[name='clientName']`)?.value?.trim()||`Cliente demo`,email:e?.querySelector(`[name='email']`)?.value?.trim()||`cliente@demo.com`,dogName:e?.querySelector(`[name='dogName']`)?.value?.trim()||`Mi perro`,dogSize:e?.querySelector(`[name='dogSize']`)?.value||`Mediano`};localStorage.setItem(`paseosJuanDemoClient`,JSON.stringify(t)),R(`/cliente`);return}let c=n.target.closest(`[data-login]`);if(c){n.preventDefault(),R(ve(c.closest(`form`)?.querySelector(`[name='email']`)?.value?.trim()||``));return}if(n.target.closest(`[data-clear-demo]`)){localStorage.removeItem(`paseosJuanDemoClient`),z();return}if(n.target.closest(`[data-coordinator-logout]`)){R(`/login`);return}if(n.target.closest(`[data-admin-logout]`)){R(`/login`);return}let u=n.target.closest(`[data-coordinator-save-dog]`);if(u){let n=u.dataset.coordinatorSaveDog,r=u.closest(`.coordinator-intake`),i=r?r.querySelectorAll(`input, select, textarea`):[],o=`Nuevo Perro`,s=`Cliente`,c=`Mapuche Norte`;i.forEach(e=>{e.placeholder?.includes(`Bruno`)&&(o=e.value||o),e.placeholder?.includes(`Martín Rivas`)&&(s=e.value||s)});let l=e();l.dogs=[{id:`dog-`+Date.now(),name:o,client:s,zone:c,energy:`Media`,risk:`Medio`,compatibility:`A evaluar`},...l.dogs||[]],l.clients=[{client:s,dogs:o,zone:c,plan:`Plan 1`,documentation:`Pendiente`,status:`Activo`},...l.clients||[]],n===`evaluation`&&(l.alerts=[{id:`alert-`+Date.now(),dog:o,type:`Evaluación inicial`,level:`Medio`,description:`Derivado por coordinador. Cliente: ${s}`},...l.alerts||[]]),t(l),a(n===`evaluation`?`Perro guardado y enviado a evaluación.`:`Perro guardado correctamente.`);return}let d=n.target.closest(`[data-coordinator-request-action]`);if(d){localStorage.setItem(`paseosJuanCoordinatorRequestFeedback`,`${d.dataset.coordinatorRequestAction} registrado para ${d.dataset.requestDog}.`),z();return}if(n.target.closest(`[data-send-supervisor]`)){let n=e();n.alerts=[{id:`alert-`+Date.now(),dog:`Perro derivado`,type:`Derivación`,level:`Medio`,description:`Enviado por coordinador para revisión.`},...n.alerts||[]],t(n),a(`Solicitud enviada al supervisor.`);return}if(n.target.closest(`[data-chat-toggle]`)){F=!F,z();return}if(n.target.closest(`[data-chat-close]`)){F=!1,z();return}if(n.target.closest(`[data-walker-logout]`)){localStorage.removeItem(`paseosJuanWalkerShift`),R(`/login`);return}if(n.target.closest(`[data-walker-start]`)){localStorage.setItem(`paseosJuanWalkerShift`,`started`),localStorage.setItem(`paseosJuanWalkerFeedback`,`Jornada iniciada`),z();return}if(n.target.closest(`[data-walker-incident]`)){document.getElementById(`reporte-operativo`)?.scrollIntoView({behavior:`smooth`});return}if(n.target.closest(`[data-checklist-confirm]`)){let e=V(`paseosJuanWalkerChecklist`),t=te.every(t=>e.includes(t));localStorage.setItem(`paseosJuanChecklistFeedback`,t?`Checklist confirmado.`:`Completá el checklist antes de iniciar el paseo.`),localStorage.setItem(`paseosJuanChecklistConfirmed`,t?`true`:`false`),z();return}let f=n.target.closest(`[data-walk-step]`);if(f){localStorage.setItem(`paseosJuanWalkStep`,f.dataset.walkStep),z();return}let p=n.target.closest(`[data-dog-retired]`);if(p){let e=H(`paseosJuanDogStatuses`);e[p.dataset.dogRetired]=`Retirado`,localStorage.setItem(`paseosJuanDogStatuses`,JSON.stringify(e)),z();return}let m=n.target.closest(`[data-dog-detail]`);if(m){let e=localStorage.getItem(`paseosJuanDogDetail`)===m.dataset.dogDetail?``:m.dataset.dogDetail;e?localStorage.setItem(`paseosJuanDogDetail`,e):localStorage.removeItem(`paseosJuanDogDetail`),z();return}if(n.target.closest(`[data-open-route]`)){localStorage.setItem(`paseosJuanWalkerFeedback`,`Ruta operativa abierta en modo demo.`),z();return}let ee=n.target.closest(`[data-quick-command]`);if(ee){localStorage.setItem(`paseosJuanQuickCommand`,`${ee.dataset.quickCommand} enviado.`),z();return}if(n.target.closest(`[data-save-material]`)){let e=document.querySelector(`[data-material-comment]`)?.value?.trim();e&&localStorage.setItem(`paseosJuanMaterialComment`,e),localStorage.setItem(`paseosJuanMaterialFeedback`,`Material guardado correctamente.`),z();return}if(n.target.closest(`[data-send-report]`)){localStorage.setItem(`paseosJuanReportFeedback`,`Reporte registrado correctamente.`),z();return}if(n.target.closest(`[data-supervisor-logout]`)){localStorage.removeItem(`paseosJuanSupervisorShift`),R(`/login`);return}if(n.target.closest(`[data-supervisor-start]`)){localStorage.setItem(`paseosJuanSupervisorShift`,`active`),localStorage.setItem(`paseosJuanSupervisorFeedback`,`Supervisión activa`),z();return}if(n.target.closest(`[data-open-create-route]`)){localStorage.setItem(`paseosJuanCreateRouteOpen`,`true`),localStorage.removeItem(`paseosJuanCreateRouteFeedback`),z();return}if(n.target.closest(`[data-close-create-route]`)){localStorage.setItem(`paseosJuanCreateRouteOpen`,`false`),localStorage.removeItem(`paseosJuanCreateRouteFeedback`),z();return}if(n.target.closest(`[data-create-route]`)){let n=K(),r=Se(n);if(r.errors.length){localStorage.setItem(`paseosJuanCreateRouteFeedback`,r.errors[0]),z();return}let i=J(),o={id:`route-${Date.now()}`,name:n.name||`${n.routeType===`Ruta cubierta por supervisor`?`Ruta cubierta`:`Ruta`} - ${n.zone}`,walker:n.walker,routeType:n.routeType,zone:n.zone,start:n.start||`15:00`,dogIds:n.order,notes:n.notes,status:`Lista para confirmar`},s=e();s.routes=[o,...s.routes||[]],t(s),localStorage.setItem(`paseosJuanCreatedRoutes`,JSON.stringify([o,...i])),localStorage.setItem(`paseosJuanCreateRouteOpen`,`false`),localStorage.removeItem(`paseosJuanRouteDraft`),a(`Ruta creada correctamente.`);return}let h=n.target.closest(`[data-route-order]`);if(h){let e=K(),t=h.dataset.dogId,n=e.order.indexOf(t);if(n===-1)return;h.dataset.routeOrder===`up`&&n>0&&([e.order[n-1],e.order[n]]=[e.order[n],e.order[n-1]]),h.dataset.routeOrder===`down`&&n<e.order.length-1&&([e.order[n+1],e.order[n]]=[e.order[n],e.order[n+1]]),h.dataset.routeOrder===`remove`&&(e.selectedDogIds=e.selectedDogIds.filter(e=>e!==t),e.order=e.order.filter(e=>e!==t)),q(e),z();return}let g=n.target.closest(`[data-route-confirm]`);if(g){let e=J().map(e=>e.id===g.dataset.routeConfirm?{...e,status:`Ruta confirmada`}:e);localStorage.setItem(`paseosJuanCreatedRoutes`,JSON.stringify(e)),z();return}let ne=n.target.closest(`[data-route-edit]`);if(ne){let e=J().find(e=>e.id===ne.dataset.routeEdit);if(!e)return;q({name:e.name,walker:e.walker,routeType:e.routeType,zone:e.zone,start:e.start,selectedDogIds:e.dogIds,order:e.dogIds,notes:e.notes||``}),localStorage.setItem(`paseosJuanCreateRouteOpen`,`true`),z();return}let _=n.target.closest(`[data-route-delete]`);if(_){let e=J().filter(e=>e.id!==_.dataset.routeDelete);localStorage.setItem(`paseosJuanCreatedRoutes`,JSON.stringify(e)),z();return}if(n.target.closest(`[data-route-contact]`)){localStorage.setItem(`paseosJuanSupervisorMessageFeedback`,`Mensaje enviado al paseador de la ruta.`),z();return}let v=n.target.closest(`[data-register-payment]`);if(v){localStorage.setItem(`paseosJuanPaymentModal`,`register`),localStorage.setItem(`paseosJuanSelectedPaymentClient`,v.dataset.registerPayment),localStorage.removeItem(`paseosJuanPaymentFeedback`),z();return}let y=n.target.closest(`[data-payment-reminder]`);if(y){localStorage.setItem(`paseosJuanPaymentModal`,`reminder`),localStorage.setItem(`paseosJuanSelectedPaymentClient`,y.dataset.paymentReminder),localStorage.removeItem(`paseosJuanPaymentFeedback`),z();return}if(n.target.closest(`[data-close-payment-modal]`)){localStorage.removeItem(`paseosJuanPaymentModal`),localStorage.removeItem(`paseosJuanSelectedPaymentClient`),z();return}let b=n.target.closest(`[data-confirm-payment]`);if(b){let e=Y(b.dataset.confirmPayment);if(!e)return;let t=H(`paseosJuanPaymentStatuses`);t[e.id]=`Al día`,localStorage.setItem(`paseosJuanPaymentStatuses`,JSON.stringify(t)),localStorage.setItem(`paseosJuanPaymentLast-${e.id}`,`Confirmado`),De({id:`payment-${Date.now()}`,client:e.client,dogs:e.dogs,amount:document.querySelector(`[data-payment-amount]`)?.value?.trim()||e.amount,method:document.querySelector(`[data-payment-method]`)?.value||`Transferencia`,date:document.querySelector(`[data-payment-date]`)?.value?.trim()||`Hoy`,status:`Confirmado`,notes:document.querySelector(`[data-payment-notes]`)?.value?.trim()||`Pago registrado por coordinación.`,receipt:localStorage.getItem(`paseosJuanPaymentReceipt-${e.id}`)||``}),localStorage.removeItem(`paseosJuanPaymentModal`),localStorage.setItem(`paseosJuanPaymentFeedback`,`Pago registrado correctamente.`),z();return}let x=n.target.closest(`[data-mark-reminder-sent]`);if(x){let e=Y(x.dataset.markReminderSent);if(!e)return;De({id:`reminder-${Date.now()}`,client:e.client,dogs:e.dogs,amount:e.amount,method:`Recordatorio`,date:`Hoy`,status:`Recordatorio enviado`,notes:`Recordatorio enviado.`,receipt:``}),localStorage.removeItem(`paseosJuanPaymentModal`),localStorage.setItem(`paseosJuanPaymentFeedback`,`Recordatorio enviado.`),z();return}if(n.target.closest(`[data-copy-payment-alias]`)){navigator.clipboard?.writeText(E).catch(()=>{}),localStorage.setItem(`paseosJuanPaymentFeedback`,`Alias copiado: ${E}`),z();return}let S=n.target.closest(`[data-copy-reminder]`);if(S){let e=Y(S.dataset.copyReminder),t=document.querySelector(`[data-reminder-message]`)?.value?.trim()||(e?Oe(e):``);t&&navigator.clipboard?.writeText(t).catch(()=>{}),localStorage.setItem(`paseosJuanPaymentFeedback`,`Mensaje de recordatorio copiado.`),z();return}let C=n.target.closest(`[data-whatsapp-reminder]`);if(C){let e=Y(C.dataset.whatsappReminder),t=document.querySelector(`[data-reminder-message]`)?.value?.trim()||(e?Oe(e):``);t&&window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,`_blank`,`noopener`),localStorage.setItem(`paseosJuanPaymentFeedback`,`Recordatorio listo para enviar por WhatsApp.`),z();return}if(n.target.closest(`[data-payment-history]`)){document.getElementById(`historial-cobros`)?.scrollIntoView({behavior:`smooth`});return}if(n.target.closest(`[data-payment-chat]`)){localStorage.setItem(`paseosJuanPaymentFeedback`,`Chat con cliente preparado para cobros.`),z();return}let w=n.target.closest(`[data-resolve-payment-alert]`);if(w){let e=V(`paseosJuanResolvedPaymentAlerts`);localStorage.setItem(`paseosJuanResolvedPaymentAlerts`,JSON.stringify([...new Set([...e,w.dataset.resolvePaymentAlert])])),z();return}if(n.target.closest(`[data-manage-absence]`)){localStorage.setItem(`paseosJuanSupervisorMode`,`cover`),localStorage.setItem(`paseosJuanSupervisorFeedback`,`Modo cobertura por ausencia activado.`),z();return}if(n.target.closest(`[data-activate-companion-top]`)){localStorage.setItem(`paseosJuanSupervisorMode`,`companion`),localStorage.setItem(`paseosJuanCompanionFeedback`,`Acompañamiento activado.`),z();return}if(n.target.closest(`[data-contact-walkers-top]`)){localStorage.setItem(`paseosJuanSupervisorMessageFeedback`,`Mensaje preparado para todos los paseadores.`),document.getElementById(`comunicacion-equipo`)?.scrollIntoView({behavior:`smooth`});return}if(n.target.closest(`[data-supervisor-create-alert]`)){localStorage.setItem(`paseosJuanSupervisorExtraAlert`,`true`),localStorage.setItem(`paseosJuanSupervisorFeedback`,`Alerta demo creada.`),z();return}if(n.target.closest(`[data-companion-activate]`)){localStorage.setItem(`paseosJuanSupervisorMode`,`companion`),localStorage.setItem(`paseosJuanCompanionFeedback`,`Acompañamiento activado.`),z();return}if(n.target.closest(`[data-companion-suggest]`)){localStorage.setItem(`paseosJuanSharedAssignments`,JSON.stringify(be())),localStorage.setItem(`paseosJuanCompanionFeedback`,`Distribución sugerida aplicada.`),z();return}if(n.target.closest(`[data-companion-sensitive]`)){localStorage.setItem(`paseosJuanSharedAssignments`,JSON.stringify(be())),localStorage.setItem(`paseosJuanCompanionFeedback`,`Perros sensibles reasignados al supervisor.`),z();return}if(n.target.closest(`[data-companion-confirm]`)){let e=W(U());localStorage.setItem(`paseosJuanCompanionFeedback`,e.errors.length?`Revisá los límites antes de confirmar.`:`Distribución compartida confirmada.`),z();return}if(n.target.closest(`[data-companion-contact]`)){localStorage.setItem(`paseosJuanSupervisorMessageFeedback`,`Mensaje enviado al paseador acompañado.`),z();return}let T=n.target.closest(`[data-shared-assign]`);if(T){let e=U();e[T.dataset.dogId]=T.dataset.sharedAssign,localStorage.setItem(`paseosJuanSharedAssignments`,JSON.stringify(e)),localStorage.removeItem(`paseosJuanCompanionFeedback`),z();return}if(n.target.closest(`[data-supervisor-close-shift]`)){localStorage.setItem(`paseosJuanSupervisorClosureFeedback`,`Jornada cerrada correctamente.`),localStorage.setItem(`paseosJuanSupervisorFeedback`,`Jornada cerrada correctamente.`),z();return}let ie=n.target.closest(`[data-walker-message]`);if(ie){localStorage.setItem(`paseosJuanSupervisorMessageFeedback`,`Mensaje enviado a ${ie.dataset.walkerMessage}.`),z();return}let ae=n.target.closest(`[data-walker-delay]`);if(ae){localStorage.setItem(`paseosJuanSupervisorMessageFeedback`,`Demora reportada para ${ae.dataset.walkerDelay}.`),z();return}let D=n.target.closest(`[data-pickup-action]`);if(D){let e=H(`paseosJuanPickupStatuses`);e[D.dataset.pickupId]=D.dataset.pickupAction,localStorage.setItem(`paseosJuanPickupStatuses`,JSON.stringify(e)),z();return}let O=n.target.closest(`[data-alert-reviewed]`);if(O){let e=V(`paseosJuanReviewedAlerts`);localStorage.setItem(`paseosJuanReviewedAlerts`,JSON.stringify([...new Set([...e,O.dataset.alertReviewed])])),z();return}let oe=n.target.closest(`[data-alert-notify]`);if(oe){localStorage.setItem(`paseosJuanSupervisorMessageFeedback`,`Paseador notificado por alerta de ${oe.dataset.alertNotify}.`),z();return}if(n.target.closest(`[data-supervisor-checklist-confirm]`)){let e=V(`paseosJuanSupervisorChecklist`),t=re.every(t=>e.includes(t));localStorage.setItem(`paseosJuanSupervisorChecklistFeedback`,t?`Supervisión confirmada.`:`Faltan puntos críticos por confirmar.`),localStorage.setItem(`paseosJuanSupervisorChecklistConfirmed`,t?`true`:`false`),t&&localStorage.setItem(`paseosJuanSupervisorChecklistDetails`,`false`),z();return}if(n.target.closest(`[data-supervisor-checklist-view]`)){localStorage.setItem(`paseosJuanSupervisorChecklistDetails`,`true`),z();return}if(n.target.closest(`[data-supervisor-checklist-edit]`)){localStorage.setItem(`paseosJuanSupervisorChecklistDetails`,`true`),localStorage.setItem(`paseosJuanSupervisorChecklistConfirmed`,`false`),localStorage.removeItem(`paseosJuanSupervisorChecklistFeedback`),z();return}let k=n.target.closest(`[data-supervisor-quick-message]`);if(k){localStorage.setItem(`paseosJuanSupervisorDraft`,k.dataset.supervisorQuickMessage),z();return}if(n.target.closest(`[data-supervisor-send-message]`)){localStorage.setItem(`paseosJuanSupervisorMessageFeedback`,`Mensaje enviado correctamente.`),localStorage.removeItem(`paseosJuanSupervisorDraft`),z();return}let A=n.target.closest(`[data-report-action]`);if(A){let e=H(`paseosJuanSupervisorReportStatuses`);e[A.dataset.reportId]=A.dataset.reportAction,localStorage.setItem(`paseosJuanSupervisorReportStatuses`,JSON.stringify(e)),z();return}if(n.target.closest(`[data-closure-confirm]`)){localStorage.setItem(`paseosJuanSupervisorClosureFeedback`,`Jornada cerrada correctamente.`),z();return}let se=n.target.closest(`[data-link]`);se&&(n.preventDefault(),R(se.getAttribute(`href`)))}),document.addEventListener(`change`,e=>{let t=e.target.closest(`[data-vaccine-file]`);if(!t)return;let n=t.files?.[0];n&&(localStorage.setItem(`paseosJuanVaccineFile`,n.name),localStorage.setItem(`paseosJuanVaccineStatus`,`Pendiente de revisión`),z())}),document.addEventListener(`change`,e=>{let t=e.target.closest(`[data-checklist-item]`);if(t){let e=V(`paseosJuanWalkerChecklist`),n=t.dataset.checklistItem,r=t.checked?[...new Set([...e,n])]:e.filter(e=>e!==n);localStorage.setItem(`paseosJuanWalkerChecklist`,JSON.stringify(r)),localStorage.removeItem(`paseosJuanChecklistFeedback`),z();return}let n=e.target.closest(`[data-walker-media]`);if(n){let e=n.files?.[0];if(!e)return;localStorage.setItem(`paseosJuanWalkerMedia${n.dataset.walkerMedia}`,e.name),z();return}let r=e.target.closest(`[data-report-file]`);if(r){let e=r.files?.[0];if(!e)return;localStorage.setItem(`paseosJuanReportFile`,e.name),z();return}let i=e.target.closest(`[data-supervisor-checklist-item]`);if(i){let e=V(`paseosJuanSupervisorChecklist`),t=i.dataset.supervisorChecklistItem,n=i.checked?[...new Set([...e,t])]:e.filter(e=>e!==t);localStorage.setItem(`paseosJuanSupervisorChecklist`,JSON.stringify(n)),localStorage.removeItem(`paseosJuanSupervisorChecklistFeedback`),z();return}let a=e.target.closest(`[data-supervisor-mode]`);if(a){localStorage.setItem(`paseosJuanSupervisorMode`,a.value),z();return}let o=e.target.closest(`[data-companion-walker]`);if(o){localStorage.setItem(`paseosJuanCompanionWalker`,o.value),z();return}let s=e.target.closest(`[data-companion-route]`);if(s){localStorage.setItem(`paseosJuanCompanionRoute`,s.value),z();return}let c=e.target.closest(`[data-create-route-type]`);if(c){localStorage.setItem(`paseosJuanCreateRouteType`,c.value),z();return}let l=e.target.closest(`[data-coordinator-document]`);if(l){let e=l.files?.[0];e&&(localStorage.setItem(`paseosJuanCoordinatorDocument`,e.name),z());return}let u=e.target.closest(`[data-payment-receipt]`);if(u){let e=u.files?.[0],t=u.dataset.paymentReceipt;e&&t&&(localStorage.setItem(`paseosJuanPaymentReceipt-${t}`,e.name),z());return}let d=e.target.closest(`[data-route-draft]`);if(d){let e=K();e[d.dataset.routeDraft]=d.value,q(e),z();return}let f=e.target.closest(`[data-route-dog]`);if(f){let e=K(),t=f.dataset.routeDog;f.checked?(e.selectedDogIds=[...new Set([...e.selectedDogIds,t])],e.order=[...e.order.filter(t=>e.selectedDogIds.includes(t)),t]):(e.selectedDogIds=e.selectedDogIds.filter(e=>e!==t),e.order=e.order.filter(e=>e!==t)),q(e),z()}});function z(){let e=me(window.location.pathname);if(e===`/`){N.innerHTML=Ie(),B();return}if(e===`/login`){N.innerHTML=We(`login`),B();return}if(e===`/registro`||e===`/register`){N.innerHTML=We(`register`),B();return}let t=e.slice(1);if(u[t]&&t!==`visitante`){N.innerHTML=Ge(t),B();return}let n=e.match(/^\/dashboard\/([a-z]+)$/);if(n&&u[n[1]]){N.innerHTML=Ge(n[1]),B();return}N.innerHTML=bn(),B()}function B(){let e=document.getElementById(`global-overlay`);e||(e=document.createElement(`div`),e.id=`global-overlay`,document.body.appendChild(e)),e.innerHTML=xn()+Sn(),document.body.classList.toggle(`menu-locked`,P),he()}function he(){I?.disconnect(),I=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`is-visible`),I.unobserve(e.target))})},{threshold:.14}),document.querySelectorAll(`.reveal`).forEach(e=>I.observe(e))}function ge(){try{return JSON.parse(localStorage.getItem(`paseosJuanDemoClient`))}catch{return null}}function _e(){return{fileName:localStorage.getItem(`paseosJuanVaccineFile`),status:localStorage.getItem(`paseosJuanVaccineStatus`)||`Pendiente de revisión`}}function V(e){try{let t=JSON.parse(localStorage.getItem(e));return Array.isArray(t)?t:[]}catch{return[]}}function H(e){try{let t=JSON.parse(localStorage.getItem(e));return t&&typeof t==`object`&&!Array.isArray(t)?t:{}}catch{return{}}}function ve(e){let t=e.toLowerCase();return t.includes(`admin`)?`/admin`:t.includes(`coordinador`)?`/coordinador`:t.includes(`supervisor`)?`/supervisor`:t.includes(`paseador`)||t.includes(`sebastian`)?`/paseador`:`/cliente`}function U(){let e=H(`paseosJuanSharedAssignments`);return C.reduce((t,n)=>(t[n.id]=e[n.id]||`unassigned`,t),{})}function ye(e){return Object.values(e).reduce((e,t)=>(t===`walker`&&(e.walker+=1),t===`supervisor`&&(e.supervisor+=1),e),{walker:0,supervisor:0})}function W(e){let t=ye(e),n=t.walker+t.supervisor,r=[],i=[];return t.walker>6&&r.push(`El paseador no puede llevar más de 6 perros.`),t.supervisor>4&&r.push(`El supervisor no puede llevar más de 4 perros en acompañamiento.`),n>10&&r.push(`El equipo paseador + supervisor no puede superar 10 perros.`),C.forEach(t=>{t.recommended===`Supervisor`&&e[t.id]===`walker`&&i.push(`${t.name}: Este perro requiere revisión. Se recomienda manejo del supervisor.`)}),{counts:t,total:n,errors:r,warnings:i}}function be(){let e={},t=0,n=0;return C.forEach(r=>{if(r.recommended===`Supervisor`&&n<4){e[r.id]=`supervisor`,n+=1;return}if(t<6){e[r.id]=`walker`,t+=1;return}if(n<4){e[r.id]=`supervisor`,n+=1;return}e[r.id]=`unassigned`}),e}function G(e){return w.find(t=>t.id===e)}function K(){let e=H(`paseosJuanRouteDraft`),t=Array.isArray(e.selectedDogIds)?e.selectedDogIds:[],n=Array.isArray(e.order)?e.order:[],r=[...n.filter(e=>t.includes(e)),...t.filter(e=>!n.includes(e))];return{name:e.name||`Ruta A - Mapuche Norte`,walker:e.walker||``,routeType:e.routeType||`Ruta normal`,zone:e.zone||`Mapuche Norte`,start:e.start||`15:00`,selectedDogIds:t,order:r,notes:e.notes||``}}function q(e){localStorage.setItem(`paseosJuanRouteDraft`,JSON.stringify(e)),localStorage.removeItem(`paseosJuanCreateRouteFeedback`)}function J(){return V(`paseosJuanCreatedRoutes`)}function xe(e){let t=e.map(G).filter(Boolean),n=t.filter(e=>e.risk===`Medio`||e.risk===`Alto`).length,r=t.filter(e=>e.energy===`Alta`).length,i=[];return n>2&&i.push(`Grupo con riesgo medio elevado. Revisar antes de confirmar.`),r>3&&i.push(`Grupo con energía alta acumulada. Revisar distribución.`),t.some(e=>e.id===`forest`)&&i.push(`Forest requiere bozal confirmado antes de salir.`),t.some(e=>e.id===`luna`)&&i.push(`Luna: evitar motos y perros externos.`),i}function Se(e){let t=[],n=xe(e.order),r=e.order.length;return e.walker||t.push(`Seleccioná un paseador responsable.`),r||t.push(`Seleccioná al menos un perro.`),e.routeType===`Ruta normal`&&r>6&&t.push(`Ruta normal: el paseador no puede llevar más de 6 perros.`),e.routeType===`Ruta cubierta por supervisor`&&r>7&&t.push(`Ruta cubierta por supervisor: Nico no puede llevar más de 7 perros.`),e.routeType===`Ruta acompañada por supervisor`&&r>10&&t.push(`Ruta acompañada por supervisor: el equipo no puede superar 10 perros.`),{errors:t,warnings:n}}function Ce(e){let t=e.map(G).filter(Boolean);return t.some(e=>e.risk===`Alto`)?`Alto`:t.some(e=>e.risk===`Medio`)?`Medio`:`Bajo`}function we(e){return J().find(t=>t.walker===e)}function Y(e){let t=H(`paseosJuanPaymentStatuses`);return T.map(e=>({...e,status:t[e.id]||e.status,lastPayment:localStorage.getItem(`paseosJuanPaymentLast-${e.id}`)||e.lastPayment})).find(t=>t.id===e)}function Te(){return T.map(e=>Y(e.id))}function Ee(){return[...V(`paseosJuanPaymentHistory`),...ie]}function De(e){localStorage.setItem(`paseosJuanPaymentHistory`,JSON.stringify([e,...V(`paseosJuanPaymentHistory`)]))}function Oe(e){return`Hola, ${e.client}. Te recordamos que está pendiente el pago del plan de ${e.dogs}.

Plan: ${e.plan}
Monto: ${e.amount}

Podés transferir al alias:
${E}

Cuando lo hagas, por favor envianos el comprobante para registrarlo.

Gracias.`}function X(e,t=`visitante`){return`
    ${Ne(t)}
    ${Pe()}
    ${Fe(e)}
  `}function ke(e){return`
    <div class="walker-shell">
      ${qe()}
      ${e}
    </div>
  `}function Ae(e){return`
    <div class="walker-shell supervisor-shell">
      ${Je()}
      ${e}
    </div>
  `}function je(e){return`
    <div class="coordinator-shell">
      ${Ye()}
      ${e}
    </div>
  `}function Me(e){return`
    <div class="admin-shell">
      ${Xe()}
      ${e}
    </div>
  `}function Ne(e){return`
    <header class="topbar ${P?`menu-is-open`:``}">
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
        <button class="menu-button ${P?`is-open`:``}" type="button" data-menu-toggle aria-expanded="${P}" aria-label="Abrir menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  `}function Pe(){return`
    <div class="menu-backdrop ${P?`is-open`:``}" data-menu-close></div>
    <aside class="mobile-menu ${P?`is-open`:``}" aria-hidden="${!P}">
      <div class="mobile-menu-head">
        <a class="menu-brand" href="/" data-link>
          <img src="/paseos-juan-logo.png" alt="" />
          <span>
            <strong>Paseos Juan</strong>
            <small>Más que un simple paseo</small>
          </span>
        </a>
        <button class="menu-close" type="button" data-menu-close aria-label="Cerrar menu">${L(`x`)}</button>
      </div>
      <nav class="menu-nav" aria-label="Menu principal">
        ${pe.map(([e,t,n])=>`
          <a href="${t}" data-link>
            <span>${L(n,`menu-icon`)}</span>
            ${e}
          </a>
        `).join(``)}
      </nav>
      <a class="menu-evaluation" href="/#evaluacion" data-link>Pedí tu evaluación</a>
      <a class="menu-whatsapp" href="${p(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">
        WhatsApp ${d.whatsappLabel}
      </a>
    </aside>
  `}function Fe(e){return`<div class="smooth-wrapper">${e}</div>`}function Ie(){return X(`
    <main>
      ${Le()}
      ${Re()}
      ${ze()}
      ${Ue()}
      <a class="whatsapp" href="${p(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer" aria-label="Escribinos por WhatsApp">WhatsApp</a>
    </main>
  `)}function Le(){return`
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
          experiencia segura, activa y equilibrada. Cuidado y confianza como en casa, en ${d.zone}.
        </p>
        <div class="hero-actions">
          <a class="primary-button" href="#evaluacion" data-link>Pedí tu evaluación</a>
          <a class="secondary-button" href="#sobre-nosotros" data-link>Conocé más</a>
        </div>
      </div>
      <div class="hero-media reveal">
        <div class="dog-frame">
          <img src="/hero-dog-premium.png" alt="Perro entrenado con estética premium de Paseos Juan" />
          <div class="dog-glass-card">
            <span class="glass-icon">${L(`radar`)}</span>
            <strong>Control total</strong>
            <span>Seguimiento operativo durante todo el paseo.</span>
          </div>
        </div>
      </div>
      <a class="scroll-indicator" href="#sobre-nosotros" data-link>
        <span>Scroll</span>
        <b>${L(`chevronDown`)}</b>
      </a>
    </section>
  `}function Re(){return`
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

    ${Be()}

    <section class="trust-section reveal" id="testimonios">
      <div>
        <p class="eyebrow">Nuestro compromiso</p>
        <blockquote>
          "Que tu perro esté tan bien cuidado como cuando lo cuidás vos."
        </blockquote>
        <cite>Paseos Juan · ${d.zone}</cite>
      </div>
      <div class="faq" id="faq">
        <h3>Preguntas frecuentes</h3>
        ${$(`¿Cómo empieza el servicio?`,`Con una evaluación inicial para conocer conducta, energía, vacunas y compatibilidades.`)}
        ${$(`¿En qué zona trabajan?`,`En ${d.zone}. Si estás cerca y no sabés si llegamos, escribinos y te confirmamos.`)}
        ${$(`¿Qué pasa si mi perro no se lleva bien con otros perros?`,`Lo evaluamos antes de sumarlo a un grupo. Si necesita paseo individual o una adaptación, te lo contamos antes de empezar.`)}
        ${$(`¿Cómo consulto disponibilidad?`,`Escribinos por WhatsApp al ${d.whatsappLabel} o completá el formulario de evaluación.`)}
      </div>
    </section>
  `}function ze(){return`
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
  `}function Be(){return`
    <section class="pricing-section reveal" id="planes">
      <div class="pricing-heading">
        <div>
          <p class="eyebrow">Tarifario</p>
          <h2>Planes por semana y por perro.</h2>
        </div>
        <aside class="discount-card">
          <h3>Descuentos</h3>
          ${ue.map(([e,t])=>`
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
          ${j.map(e=>`<strong>${e}</strong>`).join(``)}
        </div>
        ${M.map(e=>gn(e)).join(``)}
      </div>

      <div class="pricing-details-grid">
        <article class="panel benefits-panel">
          <h3>Beneficios del plan</h3>
          ${M.map(e=>`
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
          ${de.map(e=>`
            <div class="single-price-row">
              <strong>${e.size}</strong>
              <span>Individual <b>${e.individual}</b></span>
              <span>Grupo <b>${e.group}</b></span>
            </div>
          `).join(``)}
        </article>

        ${Ve()}
      </div>
    </section>
  `}function Ve(){return m()?`
      <aside class="panel products-panel promo-panel">
        <p class="eyebrow">Promo hasta el ${f.untilLabel}</p>
        <h3>${f.title}</h3>
        <p>${f.detail}</p>
        <a class="primary-button" href="${p(`Hola, quiero la muestra gratis de DogPro o CatPro y el paseo de regalo.`)}" target="_blank" rel="noreferrer">Quiero la promo</a>
      </aside>
    `:`
    <aside class="panel products-panel promo-panel">
      <h3>¿Tenés dudas?</h3>
      <p>Escribinos y te contamos qué plan le conviene a tu perro.</p>
      <a class="primary-button" href="${p(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">Escribinos</a>
    </aside>
  `}function He(e){let t=(t,n)=>(e.get(n)||``).toString().trim()?`${t}: ${e.get(n).toString().trim()}`:null;return[`Hola, quiero pedir una evaluación para mi perro.`,``,`*Perro*`,t(`Nombre`,`perro`),t(`Edad`,`edad`),t(`Tamaño`,`tamano`),t(`Raza o cruza`,`raza`),``,`*Conducta y energía*`,t(`Energía`,`energia`),t(`Se lleva bien con otros perros`,`perros`),t(`Mordió o intentó morder`,`mordida`),t(`Observaciones`,`conducta`),``,`*Responsable*`,t(`Nombre`,`responsable`),t(`Teléfono`,`telefono`),t(`Zona`,`zona`),t(`Referencia`,`referencia`),``,`*Preferencias*`,t(`Tipo`,`tipo`),t(`Horario`,`horario`),t(`Días`,`dias`),t(`Comentario`,`comentario`)].filter(e=>e!==null).join(`
`)}document.addEventListener(`submit`,e=>{let t=e.target.closest(`[data-evaluation-form]`);if(!t)return;e.preventDefault();let n=t.querySelector(`[data-evaluation-status]`),r=[...t.querySelectorAll(`[required]`)].filter(e=>!e.value.trim());if(t.querySelectorAll(`[required]`).forEach(e=>e.toggleAttribute(`aria-invalid`,r.includes(e))),r.length){n.textContent=`Completá el nombre del perro, tu nombre y tu teléfono para poder contactarte.`,n.classList.add(`is-error`),r[0].focus();return}n.classList.remove(`is-error`),n.textContent=`Listo. Se abrió WhatsApp con tus respuestas: solo falta tocar Enviar.`,window.open(p(He(new FormData(t))),`_blank`,`noopener`)});function Ue(){return`
    <footer class="footer reveal">
      <a class="menu-brand" href="/" data-link>
        <img src="/paseos-juan-logo.png" alt="" />
        <span>
          <strong>Paseos Juan</strong>
          <small>Más que un simple paseo</small>
        </span>
      </a>
      <p>Paseos grupales profesionales con orden, seguridad y bienestar. ${d.zone}.</p>
      <a class="footer-whatsapp" href="${p(`Hola, quiero información sobre los paseos de Paseos Juan.`)}" target="_blank" rel="noreferrer">WhatsApp ${d.whatsappLabel}</a>
    </footer>
  `}function We(e){let t=e===`login`;return X(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">${t?`Acceso`:`Nuevo perfil`}</p>
        <h1>${t?`Entrar a Paseos Juan`:`Crear cuenta`}</h1>
        <p>
          La misma base de perfiles soporta cliente, paseador y roles operativos.
          Luego puede conectarse a autenticación real sin cambiar el routing.
        </p>
      </section>
      <form class="auth-card reveal">
        ${t?``:`<label>Nombre <input name="clientName" placeholder="Tu nombre" /></label>`}
        <label>Email <input name="email" type="email" placeholder="nombre@email.com" /></label>
        <label>Contraseña <input name="password" type="password" placeholder="********" /></label>
        ${t?``:`
          <label>Nombre del perro <input name="dogName" placeholder="Ej. Luna" /></label>
          <label>Tamaño del perro
            <select name="dogSize">
              <option>Pequeño</option>
              <option selected>Mediano</option>
              <option>Grande</option>
            </select>
          </label>
          <label>Tipo de usuario
            <select name="userType">
              <option>Cliente</option>
              <option>Paseador</option>
              <option>Coordinador</option>
              <option>Supervisor</option>
            </select>
          </label>
        `}
        ${t?`<button class="primary-button" type="button" data-login>Ingresar</button>`:`<button class="primary-button" type="button" data-demo-register>Crear cuenta demo</button>`}
        <a href="${t?`/registro`:`/login`}" data-link>
          ${t?`Crear una cuenta`:`Ya tengo cuenta`}
        </a>
      </form>
    </main>
  `)}function Ge(e){let t=u[e],n=e===`cliente`,r=e===`paseador`,i=e===`supervisor`,a={admin:lt,coordinador:xt,supervisor:Lt,paseador:Ke,cliente:ct}[e]();return r?ke(a):i?Ae(a):e===`coordinador`?je(a):e===`admin`?Me(a):X(`
    <main class="dashboard ${n?`dashboard-client`:``}">
      ${n?``:`
        <aside class="sidebar reveal">
          <p class="eyebrow">Perfil activo</p>
          <h1>${t.label}</h1>
          <p>${t.intent}</p>
          <div class="permission-list">
            ${fe.map(([t,n])=>`
              <div class="${t.toLowerCase()===e?`selected`:``}">
                <strong>${t}</strong>
                <small>${n}</small>
              </div>
            `).join(``)}
          </div>
        </aside>
      `}
      <section class="dashboard-content reveal">
        ${a}
      </section>
    </main>
    ${n?hn():``}
  `,e)}function Ke(){let e=Number(localStorage.getItem(`paseosJuanWalkStep`)||0),t=localStorage.getItem(`paseosJuanWalkerShift`)===`started`,n=e===4?`Finalizado`:t?`En curso`:`Pendiente de inicio`;return`
    <main class="walker-dashboard">
      ${Ze(t)}
      ${Qe(n)}
      <section class="walker-two-column">
        ${$e()}
        ${et(e)}
      </section>
      ${tt()}
      <section class="walker-two-column">
        ${rt()}
        ${it()}
      </section>
      <section class="walker-two-column">
        ${at()}
        ${ot()}
      </section>
      ${mn(`paseador`,`Historial operativo`,`Solo lectura. La comunicación con clientes la gestiona coordinación o supervisión.`)}
    </main>
  `}function qe(){return`
    <header class="walker-header">
      <a class="walker-brand" href="/paseador" data-link aria-label="Paseos Juan Operativo">
        <span class="walker-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Operativo</strong>
          <small>Panel paseador</small>
        </span>
      </a>
      <div class="walker-header-actions">
        <span class="walker-online"><b></b> Online</span>
        <button class="walker-ghost-button" type="button" data-walker-logout>
          ${L(`logOut`,`walker-button-icon`)}
          Cerrar sesión
        </button>
      </div>
    </header>
  `}function Je(){return`
    <header class="walker-header supervisor-header">
      <a class="walker-brand" href="/supervisor" data-link aria-label="Paseos Juan Control">
        <span class="walker-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Control</strong>
          <small>Panel supervisor</small>
        </span>
      </a>
      <div class="walker-header-actions">
        <span class="walker-online"><b></b> Online</span>
        <button class="walker-ghost-button" type="button" data-supervisor-logout>
          ${L(`logOut`,`walker-button-icon`)}
          Cerrar sesión
        </button>
      </div>
    </header>
  `}function Ye(){return`
    <header class="coordinator-header">
      <a class="coordinator-brand" href="/coordinador" data-link aria-label="Paseos Juan Gestión">
        <span class="coordinator-logo">
          <img src="/paseos-juan-logo-green.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Gestión</strong>
          <small>Panel coordinador</small>
        </span>
      </a>
      <div class="coordinator-header-actions">
        <span class="coordinator-online"><b></b> Online</span>
        <button class="secondary-button" type="button" data-coordinator-logout>
          ${L(`logOut`,`walker-button-icon`)}
          Cerrar sesión
        </button>
      </div>
    </header>
  `}function Xe(){return`
    <header class="admin-header">
      <a class="admin-brand" href="/admin" data-link aria-label="Paseos Juan Admin">
        <span class="admin-logo">
          <img src="/paseos-juan-logo-white.svg" alt="" />
        </span>
        <span>
          <strong>Paseos Juan Admin</strong>
          <small>Dirección general</small>
        </span>
      </a>
      <div class="admin-header-actions">
        <span class="admin-chip"><b></b> Online</span>
        <span class="admin-chip is-role">${L(`lock`,`walker-button-icon`)} Administrador</span>
        <button class="admin-secondary-button" type="button" data-admin-logout>
          ${L(`logOut`,`walker-button-icon`)}
          Cerrar sesión
        </button>
      </div>
    </header>
  `}function Ze(e){let t=localStorage.getItem(`paseosJuanWalkerFeedback`);return`
    <section class="walker-shift-card reveal">
      <div class="walker-shift-copy">
        <p class="walker-eyebrow">Modo operativo</p>
        <h1>Hola, Sebastián</h1>
        <p>Jornada asignada, perros, ruta y reportes organizados en un solo lugar.</p>
        <div class="walker-shift-meta">
          <span>Grupo tarde</span>
          <span>Inicio: 15:00 hs</span>
          <span>Zona: Mapuche Country Club</span>
          <span>Referente operativo: Nico</span>
        </div>
      </div>
      <div class="walker-shift-actions">
        <span class="walker-shift-state">${e?`Jornada iniciada`:`Jornada pendiente`}</span>
        <button class="walker-primary-button" type="button" data-walker-start>
          ${L(`play`,`walker-button-icon`)}
          ${e?`Jornada iniciada`:`Iniciar jornada`}
        </button>
        <button class="walker-secondary-button" type="button" data-walker-incident>
          ${L(`alertTriangle`,`walker-button-icon`)}
          Reportar incidente
        </button>
        ${t?`<small class="walker-feedback">${t}</small>`:``}
      </div>
    </section>
  `}function Qe(e){return`
    <section class="walker-summary-grid reveal">
      ${[[`Grupo asignado`,`Grupo tarde · 15:00 hs`,`calendarCheck`],[`Perros asignados`,`${g.length} perros`,`pawPrint`],[`Duración estimada`,`60 minutos`,`clock`],[`Estado actual`,e,`shieldCheck`]].map(([e,t,n])=>`
        <article class="walker-summary-card">
          <span>${L(n)}</span>
          <small>${e}</small>
          <strong>${t}</strong>
        </article>
      `).join(``)}
    </section>
  `}function $e(){let e=V(`paseosJuanWalkerChecklist`),t=localStorage.getItem(`paseosJuanChecklistFeedback`),n=localStorage.getItem(`paseosJuanChecklistConfirmed`)===`true`;return`
    <section class="walker-panel reveal">
      ${Z(`Checklist táctico`,`Confirmá el equipamiento antes de retirar perros.`,`clipboardCheck`)}
      <div class="tactical-checklist">
        ${te.map(t=>`
          <label class="tactical-check ${e.includes(t)?`is-checked`:``}">
            <input data-checklist-item="${t}" type="checkbox" ${e.includes(t)?`checked`:``} />
            <span>${L(`checkCircle`)}</span>
            ${t}
          </label>
        `).join(``)}
      </div>
      <button class="walker-primary-button" type="button" data-checklist-confirm>Confirmar checklist</button>
      ${t?`<p class="walker-form-feedback ${n?`is-success`:`is-warning`}">${t}</p>`:``}
    </section>
  `}function et(e){return`
    <section class="walker-panel reveal">
      ${Z(`Estado del paseo`,`Avanzá la operación según el momento real del grupo.`,`flag`)}
      <div class="walk-progress">
        ${ne.map((t,n)=>`
          <div class="walk-step ${n===e?`is-active`:``} ${n<e?`is-done`:``}">
            <b>${n+1}</b>
            <span>${t}</span>
          </div>
        `).join(``)}
      </div>
      <div class="walk-action-grid">
        ${[[`Iniciar retiro`,1],[`Iniciar paseo`,2],[`Finalizar paseo`,3],[`Confirmar entregas`,4]].map(([t,n])=>`
          <button class="walker-secondary-button ${e>=n?`is-complete`:``}" type="button" data-walk-step="${n}">
            ${t}
          </button>
        `).join(``)}
      </div>
    </section>
  `}function tt(){return`
    <section class="walker-section reveal">
      <div class="walker-section-heading">
        <p class="walker-eyebrow">Unidad asignada</p>
        <h2>Perros del grupo</h2>
        <p>Perros del grupo y observaciones críticas para ejecutar el paseo con control.</p>
      </div>
      <div class="assigned-dog-grid">
        ${[...(e().dogs||[]).map(e=>({id:e.id,name:e.name,size:`Mediano`,energy:e.energy,risk:e.risk,behavior:e.compatibility,location:`Asignado nuevo`,note:``})),...g].map(e=>nt(e)).join(``)}
      </div>
    </section>
  `}function nt(e){let t=H(`paseosJuanDogStatuses`)[e.id]||`Pendiente de retiro`,n=localStorage.getItem(`paseosJuanDogDetail`)===e.id;return`
    <article class="assigned-dog-card ${t===`Retirado`?`is-retired`:``}">
      <div class="assigned-dog-head">
        <div>
          <small>${t}</small>
          <h3>${e.name}</h3>
        </div>
        <span class="dog-status-icon">${L(t===`Retirado`?`checkCircle`:`pawPrint`)}</span>
      </div>
      <div class="dog-chip-row">
        <span>${e.size}</span>
        <span>Energía ${e.energy}</span>
        <span class="risk-chip risk-${e.risk.toLowerCase()}">Riesgo ${e.risk}</span>
      </div>
      <p>${e.behavior}</p>
      ${n?`
        <div class="dog-detail-box">
          <span>${L(`mapPin`,`walker-button-icon`)} ${e.location}</span>
          <span>${e.note}</span>
        </div>
      `:``}
      <div class="dog-card-actions">
        <button class="walker-primary-button" type="button" data-dog-retired="${e.id}">
          Marcar retirado
        </button>
        <button class="walker-secondary-button" type="button" data-dog-detail="${e.id}">
          ${n?`Ocultar detalle`:`Ver detalle`}
        </button>
      </div>
    </article>
  `}function rt(){return`
    <section class="walker-panel route-panel reveal">
      ${Z(`Ruta operativa`,`Orden sugerido de retiro y entrega según ubicación y organización del grupo.`,`route`)}
      <div class="route-stats">
        <span>Zona: <b>Mapuche Country Club</b></span>
        <span>Tiempo estimado: <b>60 minutos</b></span>
        <span>Distancia estimada: <b>3.2 km</b></span>
      </div>
      <ol class="operative-route-list">
        ${[...(e().dogs||[]).map(e=>({id:e.id,name:e.name,location:`Asignado nuevo`})),...g].map((e,t)=>`
          <li>
            <b>${t+1}</b>
            <span><strong>${e.name}</strong><small>${e.location}</small></span>
          </li>
        `).join(``)}
      </ol>
      <button class="walker-primary-button" type="button" data-open-route>
        ${L(`navigation`,`walker-button-icon`)}
        Abrir ruta
      </button>
    </section>
  `}function it(){let e=localStorage.getItem(`paseosJuanQuickCommand`);return`
    <section class="walker-panel reveal">
      ${Z(`Comandos rápidos`,`Mensajes operativos para avisar novedades sin perder tiempo.`,`message`)}
      <div class="quick-command-grid">
        ${_.map(e=>`
          <button type="button" data-quick-command="${e}">
            ${L(`send`,`walker-button-icon`)}
            ${e}
          </button>
        `).join(``)}
      </div>
      ${e?`<p class="walker-form-feedback is-success">${e}</p>`:``}
    </section>
  `}function at(){let e=localStorage.getItem(`paseosJuanWalkerMediaPhoto`),t=localStorage.getItem(`paseosJuanWalkerMediaVideo`),n=localStorage.getItem(`paseosJuanMaterialComment`)||``,r=localStorage.getItem(`paseosJuanMaterialFeedback`);return`
    <section class="walker-panel reveal">
      ${Z(`Material del paseo`,`Cargá fotos, videos o comentarios que luego puedan compartirse con el cliente.`,`camera`)}
      <div class="walker-upload-grid">
        ${st(`Subir foto`,`Photo`,`.jpg,.jpeg,.png`,e)}
        ${st(`Subir video corto`,`Video`,`.mp4`,t)}
      </div>
      <label class="walker-field">Comentario del paseo
        <textarea data-material-comment placeholder="Ej. Grupo estable, buen ritmo, sin novedades.">${n}</textarea>
      </label>
      <button class="walker-primary-button" type="button" data-save-material>Guardar material</button>
      <small class="walker-muted">Formatos permitidos: JPG, PNG o MP4.</small>
      ${r?`<p class="walker-form-feedback is-success">${r}</p>`:``}
    </section>
  `}function ot(){let e=localStorage.getItem(`paseosJuanReportFile`),t=localStorage.getItem(`paseosJuanReportFeedback`);return`
    <section class="walker-panel reveal" id="reporte-operativo">
      ${Z(`Reporte operativo`,`Registrá cualquier situación relevante durante el paseo.`,`alertTriangle`)}
      <div class="walker-form-grid">
        <label class="walker-field">Perro involucrado
          <select>
            ${g.map(e=>`<option>${e.name}</option>`).join(``)}
          </select>
        </label>
        <label class="walker-field">Tipo de incidente
          <select>
            <option>Tirón fuerte</option>
            <option>Cruce con perro externo</option>
            <option>Pelea</option>
            <option>Lesión</option>
            <option>Escape</option>
            <option>Otro</option>
          </select>
        </label>
        <label class="walker-field">Nivel de riesgo
          <select>
            <option>Bajo</option>
            <option>Medio</option>
            <option>Alto</option>
          </select>
        </label>
        <label class="walker-field">Subir foto/video opcional
          <input data-report-file type="file" accept=".jpg,.jpeg,.png,.mp4" />
          <small>${e||`Sin archivo adjunto`}</small>
        </label>
      </div>
      <label class="walker-field">Descripción
        <textarea placeholder="Describir situación, perro involucrado y acción tomada."></textarea>
      </label>
      <button class="walker-primary-button" type="button" data-send-report>Enviar reporte</button>
      ${t?`<p class="walker-form-feedback is-success">${t}</p>`:``}
    </section>
  `}function st(e,t,n,r){let i=`walker-media-${t.toLowerCase()}`;return`
    <div class="walker-upload-field">
      <input id="${i}" data-walker-media="${t}" type="file" accept="${n}" />
      <label for="${i}">
        ${L(`uploadCloud`)}
        <strong>${e}</strong>
        <small>${r||`Sin archivo cargado`}</small>
      </label>
    </div>
  `}function Z(e,t,n){return`
    <header class="walker-panel-head">
      <span>${L(n)}</span>
      <div>
        <h2>${e}</h2>
        <p>${t}</p>
      </div>
    </header>
  `}function ct(){let e=ge();return`
    <section class="client-hero-card">
      <div class="client-hero-copy">
        <p class="eyebrow">Perfil cliente</p>
        <h2>Hola, ${e?.name?.split(` `)[0]||`Martín`}</h2>
        <p>Todo lo que necesitás para seguir la experiencia de tu perro con Paseos Juan.</p>
        <small>Estado del paseo, documentación, beneficios, pagos y comunicación en un solo lugar.</small>
        <button class="primary-button">Solicitar evaluación inicial</button>
      </div>
      <div class="client-highlight-grid">
        ${[{title:`Próximo paseo`,text:`Revisá el estado y horario estimado del próximo paseo.`,icon:`calendarCheck`},{title:`Mi perro`,text:`Consultá datos, conducta, vacunas y observaciones importantes.`,icon:`pawPrint`},{title:`Beneficios`,text:`Accedé a beneficios del plan, productos recomendados y comunicación directa.`,icon:`shieldCheck`}].map(e=>`
          <article class="client-highlight-card">
            <span>${L(e.icon)}</span>
            <strong>${e.title}</strong>
            <p>${e.text}</p>
          </article>
        `).join(``)}
      </div>
    </section>
    ${e?`
      <article class="panel demo-client-card">
        <div>
          <p class="eyebrow">Cuenta demo activa</p>
          <h3>${e.dogName}</h3>
          <small>${e.email} · Tamaño ${e.dogSize}</small>
        </div>
        <button class="ghost-button" type="button" data-clear-demo>Salir demo</button>
      </article>
    `:``}
    <div class="dashboard-grid">
      <article class="panel wide">
        <h3>Estado del próximo paseo</h3>
        <div class="status-track">
          ${[`Esperando retiro`,`Retirado`,`Paseando`,`Regresando`,`Entregado`].map((e,t)=>`
            <span class="${t===0?`current`:``}">${e}</span>
          `).join(``)}
        </div>
      </article>
      <article class="panel">
        <h3>Notificaciones</h3>
        ${[`Retiro programado 10:00`,`Vacuna de Tango pendiente`,`Nuevo album disponible`].map(e=>`
          <div class="notice">${e}</div>
        `).join(``)}
      </article>
    </div>
    <section class="dog-grid">
      ${ee.slice(0,2).map(e=>vn(e)).join(``)}
    </section>
    ${fn()}
    <div class="dashboard-grid">
      <article class="panel">
        <h3>Crear perfil de perro</h3>
        <label>Edad <input placeholder="Ej. 3 anos" /></label>
        <label>Raza <input placeholder="Ej. Labrador" /></label>
        <label>Conducta <textarea placeholder="Sociable, reactivo, miedos, rutinas"></textarea></label>
        <label>Veterinario <input placeholder="Nombre y telefono" /></label>
        <label>Vacunas <input placeholder="Estado de vacunas" /></label>
      </article>
      <article class="panel">
        <h3>Pagos y planes</h3>
        <div class="client-plan-list">
          ${M.map(e=>_n(e)).join(``)}
        </div>
        <button class="secondary-button" data-client-action="pay-online">Pagar online</button>
      </article>
      <article class="panel">
        <h3>Cambios de conducta</h3>
        <textarea placeholder="Contanos que cambio observaste"></textarea>
        <button class="secondary-button">Reportar cambio</button>
      </article>
      <article class="panel">
        <h3>Seguimiento en tiempo real</h3>
        <strong class="metric">Futuro</strong>
        <small>La vista queda reservada para mapa, ubicacion y ETA del paseo.</small>
      </article>
    </div>
    <article class="panel">
      <h3>Historial y material del paseo</h3>
      <div class="media-grid">
        <div>Foto paseo</div>
        <div>Video corto</div>
        <div>Reporte final</div>
      </div>
    </article>
    ${pn()}
  `}function lt(){return`
    <main class="admin-dashboard">
      ${ut()}
      ${dt()}
      <section class="admin-two-column">
        ${ft()}
        ${yt()}
      </section>
      <section class="admin-two-column">
        ${pt()}
        ${ht()}
      </section>
      <section class="admin-two-column">
        ${mt()}
        ${gt()}
      </section>
      ${_t()}
      <section class="admin-two-column">
        ${vt()}
        ${bt()}
      </section>
    </main>
  `}function ut(){return`
    <section class="admin-hero">
      <div>
        <p class="admin-eyebrow">Centro directivo</p>
        <h1>Dirección general</h1>
        <p>Control total del sistema: operación, equipo, clientes, cobros, permisos, precios y reportes.</p>
      </div>
      <div class="admin-action-grid">
        ${[[`Ver reportes`,`fileUp`,`reports`],[`Gestionar usuarios`,`radar`,`users`],[`Configurar precios`,`creditCard`,`prices`],[`Revisar alertas`,`alertTriangle`,`alerts`]].map(([e,t,n],r)=>`
          <button class="${r===0?`admin-primary-button`:`admin-secondary-button`}" type="button" data-admin-action="${n}">
            ${L(t,`walker-button-icon`)}
            ${e}
          </button>
        `).join(``)}
      </div>
    </section>
  `}function dt(){return`
    <section class="admin-summary-section">
      <div class="admin-section-title">
        <p class="admin-eyebrow">Panorama</p>
        <h2>Resumen general</h2>
      </div>
      <div class="admin-summary-grid">
        ${ae.map(([e,t,n],r)=>`
          <article class="admin-card admin-summary-card ${r===5?`is-featured`:``}">
            <span>${L(n)}</span>
            <small>${e}</small>
            <strong>${t}</strong>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function Q(e,t,n){return`
    <header class="admin-panel-head">
      <span>${L(n)}</span>
      <div>
        <p class="admin-eyebrow">${e}</p>
        <h2>${t}</h2>
      </div>
    </header>
  `}function ft(){return`
    <section class="admin-panel">
      ${Q(`Solo admin`,`Jerarquía operativa`,`shieldCheck`)}
      <div class="admin-hierarchy-list">
        ${D.map(([e,t,n])=>`
          <article class="admin-hierarchy-item">
            <span>${L(n)}</span>
            <div>
              <strong>${e}</strong>
              <p>${t}</p>
            </div>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function pt(){return`
    <section class="admin-panel">
      ${Q(`Accesos`,`Usuarios y permisos`,`users`)}
      <div class="admin-table-list">
        ${O.map(([e,t,n])=>`
          <article class="admin-table-row">
            <div>
              <strong>${e}</strong>
              <small>${t}</small>
            </div>
            <span class="admin-status">${n}</span>
            <div class="admin-row-actions">
              <button class="admin-secondary-button" type="button" data-admin-action="user-change-role">Cambiar rol</button>
              <button class="admin-secondary-button" type="button" data-admin-action="user-toggle">Activar/desactivar</button>
              <button class="admin-secondary-button" type="button" data-admin-action="user-permissions">Ver permisos</button>
            </div>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function mt(){return`
    <section class="admin-panel">
      ${Q(`Configuración global`,`Precios y planes`,`sliders`)}
      <div class="admin-price-grid">
        ${M.map((e,t)=>`
          <article class="admin-price-card ${t===1?`is-featured`:``}">
            <small>${e.walks}</small>
            <strong>${e.name}</strong>
            ${j.map((t,n)=>`
              <div>
                <span>${t}</span>
                <b>${e.prices[n]}</b>
              </div>
            `).join(``)}
            <button class="admin-secondary-button" type="button" data-admin-action="edit-plan">Editar plan</button>
          </article>
        `).join(``)}
      </div>
      <div class="admin-discount-row">
        ${ue.map(([e,t])=>`<span>${e}: <b>${t}</b></span>`).join(``)}
      </div>
    </section>
  `}function ht(){let e=692e4,t=V(`paseosJuanPaymentHistory`);t.forEach(t=>{if(t.status===`Confirmado`){let n=t.amount.replace(/[^0-9]/g,``);e+=parseInt(n,10)||0}});let n=[[`Ingresos estimados`,`$8.400.000`],[`Cobrado`,`$`+e.toLocaleString(`es-AR`)],[`Pendiente`,`$245.000`],[`Deuda`,`$85.000`],[`Pagos por confirmar`,t.length?`Ver historial`:`2`],[`Costos operativos`,`$3.100.000`],[`Resultado estimado`,`$5.300.000`]];return`
    <section class="admin-panel">
      ${Q(`Dirección financiera`,`Finanzas generales`,`wallet`)}
      <div class="admin-finance-grid">
        ${n.map(([e,t],n)=>`
          <article class="${n===6?`is-featured`:``}">
            <small>${e}</small>
            <strong>${t}</strong>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function gt(){return`
    <section class="admin-panel">
      ${Q(`Inteligencia operativa`,`Reportes operativos`,`fileText`)}
      <div class="admin-report-grid">
        ${oe.map(([e,t,n])=>`
          <article>
            <span>${L(n)}</span>
            <strong>${e}</strong>
            <p>${t}</p>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function _t(){return`
    <section class="admin-panel">
      ${Q(`Base general`,`Clientes y perros`,`database`)}
      <div class="admin-client-grid">
        ${[...(e().clients||[]).map(e=>[e.client,e.dogs,e.zone,e.plan,e.documentation,e.status]),...k].map(([e,t,n,r,i,a])=>`
          <article class="admin-client-row">
            <div><small>Cliente</small><strong>${e}</strong><span>${t}</span></div>
            <div><small>Zona</small><strong>${n}</strong><span>${r}</span></div>
            <div><small>Documentación</small><strong>${i}</strong><span>${a}</span></div>
            <div class="admin-row-actions">
              <button class="admin-secondary-button" type="button" data-admin-action="view-client">Ver ficha</button>
              <button class="admin-secondary-button" type="button" data-admin-action="audit-client">Auditar</button>
            </div>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function vt(){return`
    <section class="admin-panel">
      ${Q(`Sistema`,`Configuración del sistema`,`settings`)}
      <div class="admin-settings-grid">
        ${A.map(e=>`
          <button class="admin-setting-button" type="button" data-admin-action="settings">
            ${L(`settings`,`walker-button-icon`)}
            ${e}
          </button>
        `).join(``)}
      </div>
    </section>
  `}function yt(){return`
    <section class="admin-panel admin-alert-panel">
      ${Q(`Riesgo`,`Alertas críticas`,`alertTriangle`)}
      <div class="admin-alert-list">
        ${[...(e().alerts||[]).map(e=>[e.dog,e.type,e.description]),...se].map(([e,t,n])=>`
          <article>
            <span>${e}</span>
            <strong>${t}</strong>
            <p>${n}</p>
            <button class="admin-secondary-button" type="button" data-admin-action="review-alert">Revisar</button>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function bt(){let e=s();return`
    <section class="admin-panel">
      ${Q(`Auditoría`,`Auditoría de comunicación`,`message`)}
      <p class="admin-muted">Cliente escribe. Coordinador responde. Supervisor responde. Paseador solo lectura. Admin audita el historial.</p>
      <div class="admin-audit-list">
        ${e.map(e=>{let t=e.messages[e.messages.length-1];return`
            <article>
              <div>
                <strong>${e.clientName}</strong>
                <small>${e.dogs.join(`, `)} · ${e.status}</small>
              </div>
              <p>${t?.senderName||`Sistema`}: ${t?.text||`Sin mensajes`}</p>
              <span>${t?.timestamp||`--:--`}</span>
            </article>
          `}).join(``)}
      </div>
    </section>
  `}function xt(){return`
    <main class="dashboard coordinator-dashboard">
      <section class="dashboard-content">
        ${St()}
        ${Ct()}
        ${wt()}
        ${Tt()}
        ${Et()}
        ${mn(`coordinador`,`Chat con clientes`,`Coordinación y supervisor pueden responder. El cliente escribe desde su perfil y paseador queda solo lectura.`)}
        ${Dt()}
      </section>
    </main>
  `}function St(){return`
    <section class="coordinator-hero">
      <div>
        <p class="eyebrow">Centro de gestión</p>
        <h1>Coordinación diaria</h1>
        <p>Clientes, perros nuevos, documentación, chat, cobros, evaluaciones y derivaciones al supervisor en un solo panel.</p>
      </div>
      <div class="coordinator-hero-stats">
        <span><b>5</b><small>Solicitudes abiertas</small></span>
        <span><b>3</b><small>Evaluaciones a coordinar</small></span>
        <span><b>4</b><small>Alertas de cobro</small></span>
      </div>
    </section>
  `}function Ct(){let e=localStorage.getItem(`paseosJuanCoordinatorDogFeedback`);return`
    <section class="coordinator-module coordinator-intake" id="agregar-perro">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Nuevo ingreso</p>
          <h2>Agregar perro nuevo</h2>
          <p>Completá la ficha base para crear el perfil, revisar documentación y decidir si corresponde evaluación.</p>
        </div>
      </div>
      <div class="coordinator-form-grid">
        <label>Nombre del perro <input placeholder="Ej. Bruno" /></label>
        <label>Edad <input placeholder="Ej. 3 años" /></label>
        <label>Raza o cruza <input placeholder="Ej. mestizo, labrador, cruza" /></label>
        <label>Tamaño
          <select>
            <option>Pequeño</option>
            <option selected>Mediano</option>
            <option>Grande</option>
          </select>
        </label>
        <label>Energía
          <select>
            <option>Baja</option>
            <option selected>Media</option>
            <option>Alta</option>
          </select>
        </label>
        <label>Conducta <input placeholder="Ej. sociable, tira al inicio" /></label>
        <label>Sociabilidad
          <select>
            <option>Buena con perros</option>
            <option>Depende del grupo</option>
            <option>Requiere evaluación</option>
          </select>
        </label>
        <label>Antecedentes de agresividad
          <select>
            <option>No</option>
            <option>Depende del estímulo</option>
            <option>Sí</option>
          </select>
        </label>
        <label>Nombre del cliente <input placeholder="Ej. Martín Rivas" /></label>
        <label>WhatsApp <input placeholder="+54 9 11..." /></label>
        <label>Dirección <input placeholder="Casa, torre o referencia" /></label>
        <label>Zona
          <select>
            <option>Mapuche Norte</option>
            <option>Mapuche Sur</option>
            <option>Mapuche Centro</option>
            <option>Otra zona</option>
          </select>
        </label>
        <label>Vacunas/documentación
          <input data-coordinator-document type="file" accept=".jpg,.jpeg,.png,.pdf" />
          <small>${localStorage.getItem(`paseosJuanCoordinatorDocument`)||`JPG, PNG o PDF`}</small>
        </label>
        <label>Servicio solicitado
          <select>
            <option>Evaluación inicial</option>
            <option>Paseo grupal</option>
            <option>Consulta de plan</option>
            <option>Cambio de conducta</option>
          </select>
        </label>
        <label>Estado interno
          <select>
            <option>Nuevo ingreso</option>
            <option>Documentación pendiente</option>
            <option>Listo para evaluación</option>
            <option>En revisión de riesgo</option>
          </select>
        </label>
        <label class="span-2">Observaciones internas
          <textarea placeholder="Datos clave para coordinación y supervisor"></textarea>
        </label>
      </div>
      <div class="coordinator-action-row">
        <button class="secondary-button" type="button" data-coordinator-save-dog="save">Guardar perro</button>
        <button class="primary-button" type="button" data-coordinator-save-dog="evaluation">Guardar y enviar a evaluación</button>
      </div>
      ${e?`<p class="coordinator-feedback">${e}</p>`:``}
    </section>
  `}function wt(){let e=localStorage.getItem(`paseosJuanCoordinatorRequestFeedback`);return`
    <section class="coordinator-module">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Entrada comercial y operativa</p>
          <h2>Solicitudes de clientes</h2>
          <p>Clasificá consultas, documentación pendiente, evaluaciones iniciales y cambios de conducta.</p>
        </div>
        ${e?`<span class="coordinator-feedback is-compact">${e}</span>`:``}
      </div>
      <div class="coordinator-request-grid">
        ${ce.map(e=>`
          <article class="coordinator-request-card">
            <div class="coordinator-request-head">
              <span>${e.type}</span>
              <b>${e.status}</b>
            </div>
            <h3>${e.client}</h3>
            <p>${e.dog} · ${e.zone}</p>
            <small>${e.detail}</small>
            <div class="coordinator-request-actions">
              ${[`Ver solicitud`,`Hablar con cliente`,`Crear perfil`,`Enviar a evaluación`].map(t=>`
                <button class="secondary-button" type="button" data-coordinator-request-action="${t}" data-request-dog="${e.dog}">
                  ${t}
                </button>
              `).join(``)}
            </div>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function Tt(){let e=localStorage.getItem(`paseosJuanCoordinatorSupervisorFeedback`);return`
    <section class="coordinator-module">
      <div class="coordinator-module-head">
        <div>
          <p class="eyebrow">Derivación operativa</p>
          <h2>Enviar al supervisor</h2>
          <p>Derivá perros que requieren evaluación, integración al grupo, revisión de riesgo o seguimiento de conducta.</p>
        </div>
      </div>
      <div class="coordinator-form-grid compact">
        <label>Perro
          <select>
            ${[`Bruno`,`Luna`,`Pistacho`,`Frida`,`Kiara`,`Forest`].map(e=>`<option>${e}</option>`).join(``)}
          </select>
        </label>
        <label>Cliente <input placeholder="Nombre del cliente" /></label>
        <label>Zona
          <select>
            <option>Mapuche Norte</option>
            <option>Mapuche Sur</option>
            <option>Mapuche Centro</option>
          </select>
        </label>
        <label>Motivo
          <select>
            <option>Evaluación inicial</option>
            <option>Integración a grupo</option>
            <option>Cambio de conducta</option>
            <option>Revisión de riesgo</option>
          </select>
        </label>
        <label class="span-2">Observaciones
          <textarea placeholder="Conducta, energía, documentación o punto crítico a revisar"></textarea>
        </label>
      </div>
      <div class="coordinator-action-row">
        <button class="primary-button" type="button" data-send-supervisor>Enviar al supervisor</button>
      </div>
      ${e?`<p class="coordinator-feedback">${e}</p>`:``}
    </section>
  `}function Et(){return`
    <section class="coordinator-operations-grid">
      <article class="coordinator-module">
        <div class="coordinator-module-head">
          <div>
            <p class="eyebrow">Agenda</p>
            <h2>Paseos y evaluaciones</h2>
          </div>
        </div>
        ${h.map(e=>yn(e)).join(``)}
      </article>
      <article class="coordinator-module">
        <div class="coordinator-module-head">
          <div>
            <p class="eyebrow">Prioridades</p>
            <h2>Alertas de gestión</h2>
          </div>
        </div>
        ${[`Documentación de Bruno pendiente`,`Frida requiere revisión de conducta`,`Sol consultó Plan 2`,`Vilma registra deuda`].map(e=>`
          <div class="notice">${e}</div>
        `).join(``)}
      </article>
    </section>
  `}function Dt(){return`
    <section class="payments-dashboard reveal">
      ${jt()}
      ${Mt()}
      <div class="payments-heading">
        <div>
          <p class="eyebrow">Cobros y pagos</p>
          <h2>Cobros y pagos</h2>
          <p>Controlá planes activos, pagos pendientes, deudas y recordatorios a clientes.</p>
        </div>
        <span class="payments-permissions">Coordinador: cobros, recordatorios, comprobantes y comunicación.</span>
      </div>
      ${Ot()}
      <div class="payments-layout">
        ${Pt()}
        ${Ft()}
      </div>
      ${kt()}
      ${Nt()}
    </section>
  `}function Ot(){return`
    <div class="payments-summary-grid">
      ${[[`Total a cobrar`,`$245.000`,`wallet`],[`Cobrado`,`$160.000`,`creditCard`],[`Pendiente`,`$85.000`,`receipt`],[`Clientes con deuda`,`4 clientes`,`alertTriangle`],[`Pagos por confirmar`,`2 pagos`,`checkCircle`]].map(([e,t,n])=>`
        <article class="payment-summary-card">
          <span>${L(n)}</span>
          <small>${e}</small>
          <strong>${t}</strong>
        </article>
      `).join(``)}
    </div>
  `}function kt(){return`
    <section class="payments-panel">
      <div class="payments-section-head">
        <div>
          <h3>Clientes y cobros</h3>
          <p>Planes activos, vencimientos, estado de pago y acciones rápidas.</p>
        </div>
      </div>
      <div class="client-payments-grid">
        ${Te().map(e=>At(e)).join(``)}
      </div>
    </section>
  `}function At(e){return`
    <article class="client-payment-card">
      <div class="client-payment-head">
        <div>
          <small>${e.plan}</small>
          <h4>${e.client}</h4>
          <p>${e.dogs}</p>
        </div>
        <span class="payment-status ${It(e.status)}">${e.status}</span>
      </div>
      <div class="payment-detail-grid">
        <span><small>Monto</small><b>${e.amount}</b></span>
        <span><small>Vencimiento</small><b>${e.due}</b></span>
        <span><small>Último pago</small><b>${e.lastPayment}</b></span>
      </div>
      <div class="payment-actions">
        <button class="secondary-button" type="button" data-register-payment="${e.id}">Registrar pago</button>
        <button class="secondary-button" type="button" data-payment-reminder="${e.id}">Enviar recordatorio</button>
        <button class="secondary-button" type="button" data-payment-history="${e.id}">Ver historial</button>
        <button class="secondary-button" type="button" data-payment-chat="${e.id}">Hablar con cliente</button>
      </div>
    </article>
  `}function jt(){if(localStorage.getItem(`paseosJuanPaymentModal`)!==`register`)return``;let e=Y(localStorage.getItem(`paseosJuanSelectedPaymentClient`));if(!e)return``;let t=localStorage.getItem(`paseosJuanPaymentReceipt-${e.id}`);return`
    <section class="payment-modal-backdrop">
      <div class="payment-modal">
        <header class="payment-modal-head">
          <div>
            <p class="eyebrow">Registrar pago</p>
            <h3>Registrar pago</h3>
          </div>
          <button type="button" data-close-payment-modal aria-label="Cerrar">${L(`x`,`walker-button-icon`)}</button>
        </header>
        <div class="payment-form-grid">
          <label>Cliente <input value="${e.client}" readonly /></label>
          <label>Perro/perros <input value="${e.dogs}" readonly /></label>
          <label>Monto recibido <input data-payment-amount value="${e.amount}" /></label>
          <label>Método de pago
            <select data-payment-method>
              <option>Transferencia</option>
              <option>Efectivo</option>
              <option>Mercado Pago</option>
              <option>Otro</option>
            </select>
          </label>
          <label>Fecha de pago <input data-payment-date placeholder="Ej. 24/05" /></label>
          <label>Comprobante
            <input data-payment-receipt="${e.id}" type="file" accept=".jpg,.jpeg,.png,.pdf" />
            <small>${t||`Imagen o PDF`}</small>
          </label>
          <label class="span-2">Observaciones
            <textarea data-payment-notes placeholder="Detalle del pago, comprobante o aclaración"></textarea>
          </label>
        </div>
        <footer class="payment-modal-actions">
          <button class="secondary-button" type="button" data-close-payment-modal>Cancelar</button>
          <button class="primary-button" type="button" data-confirm-payment="${e.id}">Confirmar pago</button>
        </footer>
      </div>
    </section>
  `}function Mt(){if(localStorage.getItem(`paseosJuanPaymentModal`)!==`reminder`)return``;let e=Y(localStorage.getItem(`paseosJuanSelectedPaymentClient`));return e?`
    <section class="payment-modal-backdrop">
      <div class="payment-modal">
        <header class="payment-modal-head">
          <div>
            <p class="eyebrow">Recordatorio de pago</p>
            <h3>Recordatorio de pago</h3>
          </div>
          <button type="button" data-close-payment-modal aria-label="Cerrar">${L(`x`,`walker-button-icon`)}</button>
        </header>
        <label class="payment-reminder-message">Mensaje editable
          <textarea data-reminder-message>${Oe(e)}</textarea>
        </label>
        <footer class="payment-modal-actions">
          <button class="secondary-button" type="button" data-copy-reminder="${e.id}">${L(`copy`,`walker-button-icon`)} Copiar mensaje</button>
          <button class="secondary-button" type="button" data-whatsapp-reminder="${e.id}">${L(`message`,`walker-button-icon`)} Enviar por WhatsApp</button>
          <button class="primary-button" type="button" data-mark-reminder-sent="${e.id}">Marcar recordatorio enviado</button>
        </footer>
      </div>
    </section>
  `:``}function Nt(){return`
    <section class="payments-panel" id="historial-cobros">
      <div class="payments-section-head">
        <div>
          <h3>Historial de cobros</h3>
          <p>Pagos, recordatorios, comprobantes y observaciones de coordinación.</p>
        </div>
      </div>
      <div class="payment-history-list">
        ${Ee().map(e=>`
          <article class="payment-history-row">
            <div><small>Cliente</small><strong>${e.client}</strong><span>${e.dogs}</span></div>
            <div><small>Monto</small><strong>${e.amount}</strong><span>${e.method}</span></div>
            <div><small>Fecha</small><strong>${e.date}</strong><span>${e.status}</span></div>
            <div><small>Observaciones</small><span>${e.notes}</span><b>${e.receipt||`Sin comprobante`}</b></div>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function Pt(){let e=localStorage.getItem(`paseosJuanPaymentFeedback`);return`
    <article class="payments-panel payment-alias-card">
      <span>${L(`wallet`)}</span>
      <div>
        <h3>Datos de transferencia</h3>
        <p>Usá este alias para enviar recordatorios de pago a clientes.</p>
        <strong>${E}</strong>
      </div>
      <button class="primary-button" type="button" data-copy-payment-alias>${L(`copy`,`walker-button-icon`)} Copiar alias</button>
      ${e?`<small class="payment-feedback">${e}</small>`:``}
    </article>
  `}function Ft(){let e=V(`paseosJuanResolvedPaymentAlerts`);return`
    <section class="payments-panel">
      <div class="payments-section-head">
        <div>
          <h3>Alertas de cobro</h3>
          <p>Casos que requieren seguimiento administrativo.</p>
        </div>
      </div>
      <div class="payment-alert-list">
        ${[[`martin`,`Martín`,`$37.500`,`Pendiente`,`Enviar recordatorio y pedir comprobante.`],[`sol`,`Sol`,`$37.500`,`Pago por confirmar`,`Validar comprobante recibido.`],[`vilma`,`Vilma`,`$45.900`,`Deuda`,`Contactar y coordinar regularización.`],[`laura`,`Laura`,`$72.500`,`Al día`,`Pago confirmado.`]].filter(([t])=>!e.includes(t)).map(([e,t,n,r,i])=>`
          <article class="payment-alert-card">
            <span class="payment-status ${It(r)}">${r}</span>
            <strong>${t}</strong>
            <small>${n}</small>
            <p>${i}</p>
            <div class="payment-actions">
              <button class="secondary-button" type="button" data-resolve-payment-alert="${e}">Resolver</button>
              <button class="secondary-button" type="button" data-payment-chat="${e}">Hablar con cliente</button>
            </div>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function It(e){return e.toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replaceAll(` `,`-`)}function Lt(){return`
    <main class="walker-dashboard supervisor-dashboard">
      ${Rt()}
      ${Bt()}
      ${Ut()}
      ${zt()}
      ${Gt()}
      ${tn()}
      ${nn()}
      ${rn()}
      <section class="walker-two-column">
        ${an()}
        ${on()}
      </section>
      <section class="walker-two-column">
        ${sn()}
        ${cn()}
      </section>
      ${mn(`supervisor`,`Chat operativo con clientes`,`Comunicación directa para novedades de campo, seguridad y seguimiento.`)}
      ${ln()}
    </main>
  `}function Rt(){let e=localStorage.getItem(`paseosJuanSupervisorShift`)===`active`,t=localStorage.getItem(`paseosJuanSupervisorFeedback`);return`
    <section class="walker-shift-card supervisor-command-card reveal">
      <div class="walker-shift-copy">
        <p class="walker-eyebrow">Modo supervisión</p>
        <h1>Hola, Nico</h1>
        <p>Controlá paseadores, perros, grupos, riesgos y reportes desde un solo panel.</p>
        <p class="supervisor-command-note">
          El supervisor puede acompañar rutas complejas y tomar el control de los perros con carácter más fuerte, sin superar los límites operativos del equipo.
        </p>
        <div class="walker-shift-meta">
          <span>Turno: Tarde</span>
          <span>Inicio operativo: 15:00 hs</span>
          <span>Zona: Mapuche Country Club</span>
          <span>Paseadores activos: 2</span>
          <span>Perros totales: 12</span>
        </div>
      </div>
      <div class="walker-shift-actions">
        <span class="walker-shift-state">${e?`Supervisión activa`:`Supervisión pendiente`}</span>
        <button class="walker-primary-button create-route-main-button" type="button" data-open-create-route>
          ${L(`plus`,`walker-button-icon`)}
          Crear ruta
        </button>
        <button class="walker-secondary-button" type="button" data-manage-absence>
          ${L(`userCheck`,`walker-button-icon`)}
          Gestionar ausencia
        </button>
        <button class="walker-secondary-button" type="button" data-activate-companion-top>
          ${L(`users`,`walker-button-icon`)}
          Activar acompañamiento
        </button>
        <button class="walker-secondary-button" type="button" data-contact-walkers-top>
          ${L(`message`,`walker-button-icon`)}
          Contactar paseadores
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-create-alert>
          ${L(`bell`,`walker-button-icon`)}
          Crear alerta
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-close-shift>
          ${L(`flag`,`walker-button-icon`)}
          Cerrar jornada
        </button>
        <button class="walker-secondary-button low-priority-action" type="button" data-supervisor-start>
          ${L(`radio`,`walker-button-icon`)}
          Iniciar supervisión
        </button>
        ${t?`<small class="walker-feedback">${t}</small>`:``}
      </div>
    </section>
  `}function zt(){let e=V(`paseosJuanReviewedAlerts`),t=Math.max(0,un().filter(t=>!e.includes(t.id)).length);return`
    <section class="walker-summary-grid supervisor-summary-grid reveal">
      ${[[`Perros del día`,`12 perros`,`pawPrint`],[`Paseadores activos`,`2 paseadores`,`users`],[`Grupos activos`,`2 grupos`,`route`],[`Alertas abiertas`,`${t} alerta${t===1?``:`s`}`,`alertTriangle`],[`Estado general`,`Operación estable`,`shieldCheck`]].map(([e,t,n])=>`
        <article class="walker-summary-card supervisor-summary-card">
          <span>${L(n)}</span>
          <small>${e}</small>
          <strong>${t}</strong>
        </article>
      `).join(``)}
    </section>
  `}function Bt(){if(localStorage.getItem(`paseosJuanCreateRouteOpen`)!==`true`)return``;let e=K(),t=Se(e),n=localStorage.getItem(`paseosJuanCreateRouteFeedback`),r=e.order.map(G).filter(Boolean),i=e.routeType===`Ruta acompañada por supervisor`,a=U(),o=W(a),s=C.filter(e=>a[e.id]===`walker`),c=C.filter(e=>a[e.id]===`supervisor`);return`
    <section class="route-modal-backdrop reveal">
      <div class="route-modal">
        <header class="route-modal-head">
          <div>
            <p class="walker-eyebrow">Nueva ruta de campo</p>
            <h2>Crear ruta</h2>
          </div>
          <button type="button" class="route-modal-close" data-close-create-route aria-label="Cerrar">${L(`x`,`walker-button-icon`)}</button>
        </header>

        <div class="route-form-grid">
          <label class="walker-field">Nombre de la ruta
            <input data-route-draft="name" value="${e.name}" placeholder="Ruta A - Mapuche Norte" />
          </label>
          <label class="walker-field">Paseador responsable
            <select data-route-draft="walker">
              <option value="">Seleccionar paseador</option>
              <option ${e.walker===`Sebastián`?`selected`:``}>Sebastián</option>
              <option ${e.walker===`Bauti`?`selected`:``}>Bauti</option>
              <option ${e.walker===`Nico supervisor / reemplazo de emergencia`?`selected`:``}>Nico supervisor / reemplazo de emergencia</option>
            </select>
          </label>
          <label class="walker-field">Tipo de ruta
            <select data-route-draft="routeType">
              <option ${e.routeType===`Ruta normal`?`selected`:``}>Ruta normal</option>
              <option ${e.routeType===`Ruta acompañada por supervisor`?`selected`:``}>Ruta acompañada por supervisor</option>
              <option ${e.routeType===`Ruta cubierta por supervisor`?`selected`:``}>Ruta cubierta por supervisor</option>
            </select>
          </label>
          <label class="walker-field">Zona
            <select data-route-draft="zone">
              <option ${e.zone===`Mapuche Norte`?`selected`:``}>Mapuche Norte</option>
              <option ${e.zone===`Mapuche Sur`?`selected`:``}>Mapuche Sur</option>
              <option ${e.zone===`Mapuche Centro`?`selected`:``}>Mapuche Centro</option>
              <option ${e.zone===`Otra zona`?`selected`:``}>Otra zona</option>
            </select>
          </label>
          <label class="walker-field">Horario de inicio
            <input data-route-draft="start" value="${e.start}" placeholder="15:00" />
          </label>
        </div>

        ${i?`
          <div class="route-accompanied-detail">
            <span><small>Paseador responsable</small><b>${e.walker||`Sin seleccionar`}</b></span>
            <span><small>Supervisor acompañante</small><b>Nico</b></span>
            <span><small>Perros del paseador</small><b>${s.map(e=>e.name).join(`, `)||`Sin asignar`}</b></span>
            <span><small>Perros del supervisor</small><b>${c.map(e=>e.name).join(`, `)||`Sin asignar`}</b></span>
            <span><small>Total máximo</small><b>${o.total}/10 perros</b></span>
          </div>
        `:``}

        ${Vt(e)}
        ${Ht(r)}

        <label class="walker-field">Observaciones de ruta
          <textarea data-route-draft="notes" placeholder="Evitar motos cerca de Casa 18. Confirmar bozal de Forest.">${e.notes}</textarea>
        </label>

        <div class="route-validation-list">
          ${t.errors.map(e=>`<p class="walker-form-feedback is-warning">${e}</p>`).join(``)}
          ${t.warnings.map(e=>`<p class="walker-form-feedback is-warning">${e}</p>`).join(``)}
          ${n?`<p class="walker-form-feedback is-warning">${n}</p>`:``}
        </div>

        <footer class="route-modal-actions">
          <button class="walker-secondary-button" type="button" data-close-create-route>Cancelar</button>
          <button class="walker-primary-button" type="button" data-create-route>Crear ruta</button>
        </footer>
      </div>
    </section>
  `}function Vt(t){return`
    <section class="dog-selection-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Selección de perros</h3>
          <p>Elegí los perros de la ruta. Cada tarjeta muestra zona, ubicación, energía, riesgo y compatibilidad.</p>
        </div>
        <span>${t.selectedDogIds.length} seleccionados</span>
      </div>
      <div class="route-dog-list">
        ${[...(e().dogs||[]).map(e=>({id:e.id,name:e.name,zone:e.zone,location:`A asignar`,energy:e.energy,risk:e.risk,compatibility:e.compatibility})),...w].map(e=>`
          <label class="route-dog-option ${t.selectedDogIds.includes(e.id)?`is-selected`:``}">
            <input data-route-dog="${e.id}" type="checkbox" ${t.selectedDogIds.includes(e.id)?`checked`:``} />
            <span>${e.name}</span>
            <small>${e.zone} · ${e.location} · Energía ${e.energy} · Riesgo ${e.risk}</small>
            <em>${e.compatibility}</em>
          </label>
        `).join(``)}
      </div>
    </section>
  `}function Ht(e){return`
    <section class="route-order-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Orden de retiro</h3>
          <p>Orden sugerido según selección. Podés subir, bajar o quitar sin drag and drop.</p>
        </div>
      </div>
      <ol class="route-order-list">
        ${e.length?e.map((e,t)=>`
          <li>
            <b>${t+1}</b>
            <span><strong>${e.name}</strong><small>${e.location}</small></span>
            <div>
              <button type="button" data-dog-id="${e.id}" data-route-order="up">Subir</button>
              <button type="button" data-dog-id="${e.id}" data-route-order="down">Bajar</button>
              <button type="button" data-dog-id="${e.id}" data-route-order="remove">Quitar</button>
            </div>
          </li>
        `).join(``):`<li class="empty-route-order">Seleccioná perros para ver el orden.</li>`}
      </ol>
    </section>
  `}function Ut(){let e=J();return`
    <section class="walker-section created-routes-board reveal">
      ${dn(`Rutas creadas`,`Rutas armadas por supervisión y listas para confirmar o ajustar.`)}
      ${e.length?`
        <div class="created-route-grid">
          ${e.map(e=>Wt(e)).join(``)}
        </div>
      `:`
        <div class="empty-routes-state">
          <span>${L(`route`)}</span>
          <div>
            <h3>Sin rutas creadas</h3>
            <p>Usá el botón principal + Crear ruta para asignar perros a un paseador.</p>
          </div>
          <button class="walker-primary-button" type="button" data-open-create-route>${L(`plus`,`walker-button-icon`)} Crear ruta</button>
        </div>
      `}
    </section>
  `}function Wt(e){let t=e.dogIds.map(G).filter(Boolean),n=Ce(e.dogIds);return`
    <article class="created-route-card">
      <div class="created-route-head">
        <div>
          <small>${e.status}</small>
          <h3>${e.name}</h3>
        </div>
        <span class="risk-chip risk-${n.toLowerCase()}">${n}</span>
      </div>
      <div class="created-route-meta">
        <span><small>Responsable</small><b>${e.walker}</b></span>
        <span><small>Tipo</small><b>${e.routeType}</b></span>
        <span><small>Zona</small><b>${e.zone}</b></span>
        <span><small>Horario</small><b>${e.start}</b></span>
        <span><small>Perros</small><b>${t.length}/${e.routeType===`Ruta normal`?`6`:e.routeType===`Ruta cubierta por supervisor`?`7`:`10`}</b></span>
      </div>
      <ol class="created-route-dog-list">
        ${t.map((e,t)=>`<li><b>${t+1}.</b> ${e.name} — ${e.location}</li>`).join(``)}
      </ol>
      ${e.notes?`<p class="created-route-notes">${e.notes}</p>`:``}
      <div class="created-route-actions">
        <button class="walker-primary-button" type="button" data-route-confirm="${e.id}">Confirmar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-edit="${e.id}">Editar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-delete="${e.id}">Eliminar ruta</button>
        <button class="walker-secondary-button" type="button" data-route-contact="${e.id}">Contactar paseador</button>
      </div>
    </article>
  `}function Gt(){let e=localStorage.getItem(`paseosJuanSupervisorMode`)||`general`;return`
    <section class="walker-panel companion-mode-panel reveal">
      ${Z(`Acompañamiento de paseador`,`Cuando un grupo requiere más control, el supervisor puede acompañar al paseador y encargarse de los perros más fuertes o conflictivos.`,`users`)}
      <div class="companion-mode-copy">
        <label class="walker-field">Modo del supervisor
          <select data-supervisor-mode>
            <option value="general" ${e===`general`?`selected`:``}>Supervisión general de campo</option>
            <option value="companion" ${e===`companion`?`selected`:``}>Acompañar a un paseador</option>
            <option value="cover" ${e===`cover`?`selected`:``}>Cubrir ruta por ausencia</option>
          </select>
        </label>
        <div class="companion-rule-grid">
          <span><b>6</b><small>Paseador solo</small></span>
          <span><b>7</b><small>Supervisor cubriendo emergencia</small></span>
          <span><b>10</b><small>Equipo acompañado</small></span>
          <span><b>4</b><small>Perros bajo supervisor</small></span>
        </div>
      </div>
      ${e===`companion`?qt():Kt(e)}
    </section>
  `}function Kt(e){let t=e===`cover`;return`
    <div class="companion-empty-state">
      <span>${L(t?`route`:`shieldCheck`)}</span>
      <div>
        <h3>${t?`Ruta cubierta por supervisor`:`Supervisión general activa`}</h3>
        <p>
          ${t?`En ausencia de paseador, el supervisor puede cubrir una ruta de emergencia con máximo 7 perros.`:`Usá este modo para monitorear paseadores, grupos, alertas, retiros y entregas desde el centro de control.`}
        </p>
      </div>
      <button class="walker-primary-button" type="button" data-companion-activate>Activar acompañamiento</button>
    </div>
  `}function qt(){let e=localStorage.getItem(`paseosJuanCompanionWalker`)||`Sebastián`,t=localStorage.getItem(`paseosJuanCompanionRoute`)||`Ruta A`,n=U(),r=W(n),i=localStorage.getItem(`paseosJuanCompanionFeedback`);return`
    <div class="companion-config-grid">
      <label class="walker-field">Seleccionar paseador acompañado
        <select data-companion-walker>
          <option ${e===`Sebastián`?`selected`:``}>Sebastián</option>
          <option ${e===`Bauti`?`selected`:``}>Bauti</option>
        </select>
      </label>
      <label class="walker-field">Seleccionar ruta
        <select data-companion-route>
          <option ${t===`Ruta A`?`selected`:``}>Ruta A</option>
          <option ${t===`Ruta B`?`selected`:``}>Ruta B</option>
        </select>
      </label>
    </div>
    ${Jt(e,t,n,r)}
    ${Zt(n)}
    ${Qt(e,n,r)}
    ${$t(e,n,r)}
    <div class="companion-action-row">
      <button class="walker-primary-button" type="button" data-companion-suggest>${L(`navigation`,`walker-button-icon`)} Sugerir distribución</button>
      <button class="walker-secondary-button" type="button" data-companion-confirm>Confirmar distribución compartida</button>
      <button class="walker-secondary-button" type="button" data-companion-sensitive>Reasignar perros sensibles</button>
      <button class="walker-secondary-button" type="button" data-companion-sensitive>Pasar perros conflictivos al supervisor</button>
      <button class="walker-secondary-button" type="button" data-companion-contact>Contactar paseador</button>
    </div>
    ${i?`<p class="walker-form-feedback ${r.errors.length?`is-warning`:`is-success`}">${i}</p>`:``}
  `}function Jt(e,t,n,r){let i=C.filter(e=>n[e.id]===`walker`),a=C.filter(e=>n[e.id]===`supervisor`);return`
    <section class="shared-distribution">
      <div class="shared-distribution-head">
        <div>
          <h3>Distribución operativa · ${t}</h3>
          <p>El supervisor acompaña sin reemplazar al paseador y toma control de los perros más delicados.</p>
        </div>
        <span>Total del equipo: <b>${r.total}/10 perros</b></span>
      </div>
      <div class="shared-columns">
        ${Yt(`Paseador`,e,`Perros bajo manejo del paseador`,`${r.counts.walker}/6 perros`,i)}
        ${Yt(`Supervisor`,`Nico`,`Perros de mayor control`,`${r.counts.supervisor}/4 perros`,a)}
      </div>
      ${en(r)}
    </section>
  `}function Yt(e,t,n,r,i){return`
    <article class="shared-handler-card">
      <small>${e}</small>
      <h3>${t}</h3>
      <p>${n}</p>
      <span class="shared-capacity">${r}</span>
      <div class="shared-assigned-list">
        ${i.length?i.map(e=>Xt(e)).join(``):`<em>Sin perros asignados</em>`}
      </div>
    </article>
  `}function Xt(e){return`
    <div>
      <strong>${e.name}</strong>
      <span class="risk-chip risk-${e.risk.toLowerCase()}">${e.risk}</span>
    </div>
  `}function Zt(e){return`
    <section class="conflict-assignment">
      <div class="shared-distribution-head">
        <div>
          <h3>Asignación de perros</h3>
          <p>Los perros de riesgo medio, energía alta, bozal o carácter fuerte deben priorizar manejo del supervisor.</p>
        </div>
      </div>
      <div class="conflict-dog-grid">
        ${C.map(t=>{let n=e[t.id],r=t.recommended===`Supervisor`&&n===`walker`;return`
            <article class="conflict-dog-card ${r?`needs-review`:``}">
              <div class="conflict-dog-head">
                <div>
                  <small>Manejo recomendado: ${t.recommended}</small>
                  <h4>${t.name}</h4>
                </div>
                <span class="risk-chip risk-${t.risk.toLowerCase()}">${t.risk}</span>
              </div>
              <div class="dog-chip-row">
                <span>Energía ${t.energy}</span>
                <span>${n===`walker`?`Asignado a paseador`:n===`supervisor`?`Asignado a supervisor`:`Sin asignar`}</span>
              </div>
              ${t.reason?`<p>${t.reason}</p>`:`<p>Perfil apto para manejo operativo estándar.</p>`}
              ${r?`<p class="assignment-warning">Este perro requiere revisión. Se recomienda manejo del supervisor.</p>`:``}
              <div class="assignment-button-row">
                <button type="button" data-dog-id="${t.id}" data-shared-assign="walker">Paseador</button>
                <button type="button" data-dog-id="${t.id}" data-shared-assign="supervisor">Supervisor</button>
                <button type="button" data-dog-id="${t.id}" data-shared-assign="unassigned">Sin asignar</button>
              </div>
            </article>
          `}).join(``)}
      </div>
    </section>
  `}function Qt(e,t,n){let r=C.filter(e=>t[e.id]===`supervisor`);return`
    <section class="shared-route-summary">
      <div>
        <p class="walker-eyebrow">Distribución compartida</p>
        <h3>Equipo acompañado</h3>
      </div>
      <div class="closure-metrics">
        <span><small>Paseador</small><strong>${e} — ${n.counts.walker}/6 perros</strong></span>
        <span><small>Supervisor</small><strong>Nico — ${n.counts.supervisor}/4 perros</strong></span>
        <span><small>Total</small><strong>${n.total}/10 perros</strong></span>
      </div>
      <div class="supervisor-controlled-dogs">
        <strong>Perros bajo control del supervisor</strong>
        <p>${r.length?r.map(e=>e.name).join(`, `):`Sin perros asignados al supervisor.`}</p>
        <small>Motivo: Perros con mayor energía, riesgo medio, bozal o carácter fuerte.</small>
      </div>
    </section>
  `}function $t(e,t,n){let r=localStorage.getItem(`paseosJuanCreateRouteType`)||`Ruta normal`,i=r===`Ruta acompañada por supervisor`,a=C.filter(e=>t[e.id]===`walker`),o=C.filter(e=>t[e.id]===`supervisor`);return`
    <section class="create-route-panel">
      <div class="shared-distribution-head">
        <div>
          <h3>Crear ruta</h3>
          <p>Configuración demo para rutas normales, acompañadas o cubiertas por supervisor.</p>
        </div>
      </div>
      <label class="walker-field">Tipo de ruta
        <select data-create-route-type>
          <option ${r===`Ruta normal`?`selected`:``}>Ruta normal</option>
          <option ${r===`Ruta acompañada por supervisor`?`selected`:``}>Ruta acompañada por supervisor</option>
          <option ${r===`Ruta cubierta por supervisor`?`selected`:``}>Ruta cubierta por supervisor</option>
        </select>
      </label>
      ${i?`
        <div class="create-route-detail-grid">
          <span><small>Paseador responsable</small><b>${e}</b></span>
          <span><small>Supervisor acompañante</small><b>Nico</b></span>
          <span><small>Perros del paseador</small><b>${a.map(e=>e.name).join(`, `)||`Sin asignar`}</b></span>
          <span><small>Perros del supervisor</small><b>${o.map(e=>e.name).join(`, `)||`Sin asignar`}</b></span>
          <span><small>Total máximo</small><b>${n.total}/10 perros</b></span>
        </div>
      `:``}
    </section>
  `}function en(e){let t=[...e.errors,...e.warnings];return t.length?`
    <div class="distribution-messages">
      ${t.map(e=>`<p class="walker-form-feedback is-warning">${e}</p>`).join(``)}
    </div>
  `:`<p class="walker-form-feedback is-success">Distribución dentro de los límites operativos.</p>`}function tn(){return`
    <section class="walker-section reveal">
      ${dn(`Paseadores activos`,`Seguimiento del equipo en operación.`)}
      <div class="supervisor-walker-grid">
        ${v.map(e=>{let t=we(e.name);return`
            <article class="supervisor-walker-card">
              <div class="assigned-dog-head">
                <div>
                  <small>${e.role}</small>
                  <h3>${e.name}</h3>
                </div>
                <span class="dog-status-icon">${L(`userCheck`)}</span>
              </div>
              <div class="supervisor-detail-grid">
                <span><small>Ruta asignada</small><b>${t?.name||e.group}</b></span>
                <span><small>Horario</small><b>${t?.start||e.schedule}</b></span>
                <span><small>Estado</small><b>${t?.status||e.status}</b></span>
                <span><small>Perros asignados</small><b>${t?.dogIds?.length||e.dogs}</b></span>
              </div>
              <div class="dog-card-actions">
                <button class="walker-secondary-button" type="button">Ver grupo</button>
                <button class="walker-secondary-button" type="button" data-walker-message="${e.name}">Enviar mensaje</button>
                <button class="walker-secondary-button" type="button" data-walker-delay="${e.name}">Reportar demora</button>
              </div>
            </article>
          `}).join(``)}
      </div>
    </section>
  `}function nn(){return`
    <section class="walker-section reveal">
      ${dn(`Grupos asignados`,`Distribución de perros por paseador y nivel de riesgo.`)}
      <div class="supervisor-group-grid">
        ${y.map(e=>`
          <article class="supervisor-group-card">
            <div class="supervisor-group-head">
              <span>${L(`route`)}</span>
              <div>
                <small>${e.name} — ${e.walker}</small>
                <h3>${e.dogs.length} perros asignados</h3>
              </div>
            </div>
            <div class="route-stats">
              <span>Riesgo promedio: <b>${e.averageRisk}</b></span>
              <span>Estado: <b>${e.status}</b></span>
            </div>
            <div class="compact-dog-list">
              ${e.dogs.map(([e,t])=>`
                <div>
                  <strong>${e}</strong>
                  <span class="risk-chip risk-${t.toLowerCase()}">${t}</span>
                </div>
              `).join(``)}
            </div>
            <button class="walker-primary-button" type="button">${L(`eye`,`walker-button-icon`)} Revisar grupo</button>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function rn(){let e=H(`paseosJuanPickupStatuses`);return`
    <section class="walker-panel supervisor-control-panel reveal">
      ${Z(`Control de retiros y entregas`,`Validá que cada perro sea retirado y entregado correctamente.`,`clipboardCheck`)}
      <div class="pickup-list">
        ${b.map(t=>{let n=e[t.id]||t.status;return`
            <article class="pickup-row">
              <div><small>Perro</small><strong>${t.dog}</strong></div>
              <div><small>Ubicación</small><span>${t.location}</span></div>
              <div><small>Paseador</small><span>${t.walker}</span></div>
              <div><small>Estado</small><span class="status-chip">${n}</span></div>
              <div><small>Hora estimada</small><span>${t.eta}</span></div>
              <div class="pickup-actions">
                <button type="button" data-pickup-id="${t.id}" data-pickup-action="Retirado">Marcar retirado</button>
                <button type="button" data-pickup-id="${t.id}" data-pickup-action="Entregado">Marcar entregado</button>
                <button type="button">${L(`eye`,`walker-button-icon`)} Ver detalle</button>
              </div>
            </article>
          `}).join(``)}
      </div>
    </section>
  `}function an(){let e=V(`paseosJuanReviewedAlerts`);return`
    <section class="walker-panel reveal">
      ${Z(`Alertas operativas`,`Situaciones que requieren atención del supervisor.`,`alertTriangle`)}
      <div class="risk-alert-list">
        ${un().map(t=>{let n=e.includes(t.id);return`
            <article class="risk-alert-card risk-${t.level.toLowerCase()} ${n?`is-reviewed`:``}">
              <div>
                <small>${t.type}</small>
                <h3>${t.dog}</h3>
              </div>
              <span class="risk-chip risk-${t.level.toLowerCase()}">${n?`Revisada`:t.level}</span>
              <p>${t.description}</p>
              <div class="dog-card-actions">
                <button class="walker-secondary-button" type="button" data-alert-reviewed="${t.id}">Marcar revisada</button>
                <button class="walker-secondary-button" type="button" data-alert-notify="${t.dog}">Notificar paseador</button>
              </div>
            </article>
          `}).join(``)}
      </div>
    </section>
  `}function on(){let e=V(`paseosJuanSupervisorChecklist`),t=localStorage.getItem(`paseosJuanSupervisorChecklistFeedback`),n=localStorage.getItem(`paseosJuanSupervisorChecklistConfirmed`)===`true`,r=localStorage.getItem(`paseosJuanSupervisorChecklistDetails`)!==`false`;return n&&!r?`
      <section class="walker-panel reveal" style="background: #13291c; border: 1px solid rgba(31, 143, 90, 0.45);">
        <header class="walker-panel-head">
          <span style="color: rgba(31, 143, 90, 1);">${L(`checkCircle`)}</span>
          <div>
            <h2 style="color: #f4f1e8;">Supervisión confirmada</h2>
            <p style="color: #9ca39d;">Todos los puntos críticos fueron revisados antes de iniciar la operación.</p>
          </div>
        </header>
        <div style="color: #9ca39d; margin-top: -10px; margin-bottom: 20px; font-size: 0.9rem;">
          <ul style="margin: 0; padding-left: 20px; list-style-type: disc;">
            <li>Paseadores presentes</li>
            <li>Rutas verificadas</li>
            <li>Equipamiento confirmado</li>
            <li>Comunicación activa</li>
          </ul>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="walker-secondary-button" style="border-radius: 9999px; padding: 4px 16px; font-size: 0.85rem; min-height: 36px; border-color: rgba(31, 143, 90, 0.45); color: #f4f1e8;" type="button" data-supervisor-checklist-view>Ver checklist</button>
          <button class="walker-secondary-button" style="border-radius: 9999px; padding: 4px 16px; font-size: 0.85rem; min-height: 36px; border-color: rgba(31, 143, 90, 0.45); color: #f4f1e8;" type="button" data-supervisor-checklist-edit>Editar revisión</button>
        </div>
      </section>
    `:`
    <section class="walker-panel reveal">
      ${Z(`Checklist de supervisión`,`Confirmaciones mínimas antes y durante la operación.`,`clipboardCheck`)}
      <div class="tactical-checklist">
        ${re.map(t=>`
          <label class="tactical-check ${e.includes(t)?`is-checked`:``}">
            <input data-supervisor-checklist-item="${t}" type="checkbox" ${e.includes(t)?`checked`:``} />
            <span>${L(`checkCircle`)}</span>
            ${t}
          </label>
        `).join(``)}
      </div>
      <button class="walker-primary-button" type="button" data-supervisor-checklist-confirm>Confirmar supervisión</button>
      ${t?`<p class="walker-form-feedback ${n?`is-success`:`is-warning`}">${t}</p>`:``}
    </section>
  `}function sn(){let e=localStorage.getItem(`paseosJuanSupervisorMessageFeedback`),t=localStorage.getItem(`paseosJuanSupervisorDraft`)||``;return`
    <section class="walker-panel reveal">
      ${Z(`Comunicación con equipo`,`Enviá mensajes rápidos a paseadores o coordinación.`,`message`)}
      <label class="walker-field">Destinatario
        <select>
          <option>Sebastián</option>
          <option>Bauti</option>
          <option>Todos los paseadores</option>
          <option>Coordinador</option>
        </select>
      </label>
      <div class="quick-command-grid">
        ${[`Avisar cambio de ruta`,`Reforzar control`,`Confirmar retiro`,`Solicitar foto`,`Contactar coordinación`].map(e=>`
          <button type="button" data-supervisor-quick-message="${e}">
            ${L(`send`,`walker-button-icon`)}
            ${e}
          </button>
        `).join(``)}
      </div>
      <label class="walker-field">Mensaje
        <textarea placeholder="Escribí una instrucción operativa...">${t}</textarea>
      </label>
      <button class="walker-primary-button" type="button" data-supervisor-send-message>Enviar mensaje</button>
      ${e?`<p class="walker-form-feedback is-success">${e}</p>`:``}
    </section>
  `}function cn(){let e=H(`paseosJuanSupervisorReportStatuses`);return`
    <section class="walker-panel reveal">
      ${Z(`Reportes recibidos`,`Incidentes o novedades enviadas por paseadores.`,`fileText`)}
      <div class="received-report-list">
        ${S.map(t=>`
          <article class="received-report-card">
            <div>
              <small>${t.walker} · ${t.dog}</small>
              <h3>${t.type}</h3>
            </div>
            <span class="risk-chip risk-${t.level.toLowerCase()}">${t.level}</span>
            <p>${t.description}</p>
            <small>Estado: ${e[t.id]||t.status}</small>
            <div class="dog-card-actions">
              <button class="walker-secondary-button" type="button" data-report-id="${t.id}" data-report-action="Revisado">${L(`eye`,`walker-button-icon`)} Revisar</button>
              <button class="walker-secondary-button" type="button" data-report-id="${t.id}" data-report-action="Archivado">${L(`archive`,`walker-button-icon`)} Archivar</button>
              <button class="walker-secondary-button" type="button" data-walker-message="${t.walker}">Contactar paseador</button>
            </div>
          </article>
        `).join(``)}
      </div>
    </section>
  `}function ln(){let e=localStorage.getItem(`paseosJuanSupervisorClosureFeedback`);return`
    <section class="walker-panel supervisor-closure-panel reveal">
      ${Z(`Cierre de jornada`,`Resumen operativo antes de finalizar el turno.`,`flag`)}
      <div class="closure-metrics">
        ${[[`Perros paseados`,`12`],[`Grupos completados`,`2`],[`Incidentes abiertos`,`1`],[`Material pendiente`,`2`],[`Estado general`,`Estable`]].map(([e,t])=>`<span><small>${e}</small><strong>${t}</strong></span>`).join(``)}
      </div>
      <div class="closure-checklist">
        ${[`Todos los perros entregados`,`Reportes revisados`,`Material cargado`,`Paseadores confirmados`,`Clientes notificados si corresponde`].map(e=>`<span>${L(`checkCircle`,`walker-button-icon`)} ${e}</span>`).join(``)}
      </div>
      <button class="walker-primary-button" type="button" data-closure-confirm>Cerrar jornada</button>
      ${e?`<p class="walker-form-feedback is-success">${e}</p>`:``}
    </section>
  `}function un(){let e=localStorage.getItem(`paseosJuanSupervisorExtraAlert`)===`true`?[{id:`demo-extra`,dog:`Caipi`,type:`Control inicial`,level:`Medio`,description:`Nueva alerta demo creada para revisar al iniciar el grupo.`}]:[];return[...x,...e]}function dn(e,t){return`
    <div class="walker-section-heading">
      <p class="walker-eyebrow">Centro de control</p>
      <h2>${e}</h2>
      <p>${t}</p>
    </div>
  `}function fn(){let e=_e(),t=!!e.fileName;return`
    <section class="panel vaccination-card">
      <div class="vaccination-copy">
        <span class="document-icon">${L(t?`fileCheck`:`uploadCloud`)}</span>
        <div>
          <p class="eyebrow">Documentación del perro</p>
          <h3>Vacunas y documentación</h3>
          <p>
            Subí una foto o PDF del carnet de vacunas para mantener la información del perro
            actualizada.
          </p>
        </div>
      </div>
      <div class="vaccination-upload-box">
        <input id="vaccine-file" data-vaccine-file type="file" accept=".jpg,.jpeg,.png,.pdf" />
        <label for="vaccine-file">
          ${L(`fileUp`)}
          <strong>${t?`Cambiar archivo`:`Subir documentación`}</strong>
          <small>Formatos permitidos: JPG, PNG o PDF.</small>
        </label>
      </div>
      <div class="vaccination-status">
        <span>
          <small>Estado de revisión</small>
          <strong>${e.status}</strong>
        </span>
        <span>
          <small>Archivo cargado</small>
          <strong>${t?e.fileName:`Sin archivo cargado`}</strong>
        </span>
      </div>
    </section>
  `}function pn(){return`
    <section class="client-benefits">
      <div class="client-benefits-heading">
        <p class="eyebrow">Beneficios de ser parte de Paseos Juan</p>
        <h3>Productos recomendados para tu perro</h3>
        <p>
          Equipamiento y productos seleccionados para mejorar la seguridad, la rutina y la
          experiencia del paseo.
        </p>
      </div>
      <div class="product-benefit-grid">
        ${le.map(e=>`
          <article class="product-benefit-card">
            <span class="product-icon">${L(e.icon)}</span>
            <small>${e.tag}</small>
            <h4>${e.name}</h4>
            <p>${e.description}</p>
            <strong>${e.price}</strong>
            <button class="secondary-button" type="button">Consultar producto</button>
          </article>
        `).join(``)}
      </div>
      <p class="product-benefit-note">
        Los productos recomendados pueden variar según tamaño, conducta y necesidades de cada perro.
      </p>
    </section>
  `}function mn(e,t,n){let r=s();r.sort((e,t)=>t.lastUpdated-e.lastUpdated);let i=localStorage.getItem(`paseosJuanActiveChat`)||r[0]?.id,a=r.find(e=>e.id===i),o=c(e),l=[];e===`coordinador`?l=[`Pedir carnet de vacunas`,`Enviar alias de pago`,`Pedir comprobante`,`Coordinar evaluación`,`Enviar planes`,`Derivar al supervisor`]:e===`supervisor`&&(l=[`Avisar demora`,`Confirmar retiro`,`Confirmar entrega`,`Consultar cambio de conducta`,`Avisar situación de campo`]);let u=e===`coordinador`?`Coordinador`:e===`supervisor`?`Nico (Supervisor)`:`Paseador`;return`
    <section class="shared-chat-panel reveal ${e===`supervisor`||e===`paseador`?`dark-panel`:``}">
      <header class="chat-panel-header">
        <div>
          <h2>${t}</h2>
          <p>${n}</p>
        </div>
      </header>
      <div class="chat-panel-layout">
        <aside class="chat-conversations-list">
          ${r.map(e=>`
            <button class="chat-conversation-item ${e.id===i?`is-active`:``}" data-chat-select="${e.id}">
              <strong>${e.clientName}</strong>
              <small>${e.dogs.join(`, `)}</small>
              <em>${e.status}</em>
            </button>
          `).join(``)}
        </aside>
        
        ${a?`
          <div class="chat-active-window">
            <div class="chat-active-header">
              <strong>${a.clientName} · ${a.dogs.join(`, `)}</strong>
              <span class="status-pill">${a.status}</span>
            </div>
            
            <div class="chat-messages-area">
              ${a.messages.map(t=>`
                <div class="chat-message-bubble ${t.senderRole===e?`is-mine`:`is-other`}">
                  <div class="chat-message-meta">
                    <b>${t.senderName}</b>
                    <time>${t.timestamp}</time>
                  </div>
                  <div class="chat-message-text">${t.text}</div>
                </div>
              `).join(``)}
            </div>

            ${o?`
              <div class="chat-input-area">
                <div class="chat-quick-actions-row">
                  ${l.map(t=>`
                    <button class="chat-quick-pill" type="button" data-chat-quick-shared="${t}" data-chat-role="${e}" data-chat-sender="${u}" data-chat-conversation="${a.id}">
                      ${t}
                    </button>
                  `).join(``)}
                </div>
                <div class="chat-compose-row">
                  <input type="text" placeholder="Escribir mensaje..." data-chat-input-shared="${a.id}" />
                  <button class="primary-button" type="button" data-chat-send-shared="${a.id}" data-chat-role="${e}" data-chat-sender="${u}">
                    Enviar
                  </button>
                </div>
              </div>
            `:`
              <div class="chat-readonly-banner">
                <p>Solo lectura. Los mensajes al cliente los responde coordinación o supervisión.</p>
              </div>
            `}
          </div>
        `:`
          <div class="chat-empty-state">
            <p>Seleccioná una conversación para ver los mensajes.</p>
          </div>
        `}
      </div>
    </section>
  `}function hn(){let e=s(),t=ge()?.name?.split(` `)[0]||`Martín`,n=e.find(e=>e.id===`conv-martin-bruno`)||e[1];return localStorage.getItem(`paseosJuanChatDraft`),`
    <aside class="floating-chat ${F?`is-open`:``}" aria-live="polite">
      <div class="chat-window">
        <div class="chat-head">
          <span class="chat-head-icon">${L(`message`)}</span>
          <span>
            <strong>Paseos Juan</strong>
            <small>Consultas sobre paseos, pagos o cambios de conducta.</small>
          </span>
          <button type="button" data-chat-close aria-label="Cerrar chat">${L(`x`)}</button>
        </div>
        <div class="chat-messages-area floating-chat-messages">
          <div class="chat-message-bubble is-other">
            <div class="chat-message-meta"><b>Soporte</b></div>
            <div class="chat-message-text">Hola, ¿en qué podemos ayudarte hoy?</div>
          </div>
          ${n.messages.map(e=>`
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
            <button type="button" data-chat-quick-shared="${e}" data-chat-role="cliente" data-chat-sender="${t}" data-chat-conversation="${n.id}">
              ${L(`alertCircle`)} ${e}
            </button>
          `).join(``)}
        </div>
        <div class="chat-compose">
          <textarea data-chat-input-shared="${n.id}" placeholder="Escribí tu consulta..."></textarea>
          <button class="primary-button" type="button" data-chat-send-shared="${n.id}" data-chat-role="cliente" data-chat-sender="${t}">
            ${L(`send`)} Enviar
          </button>
        </div>
      </div>
      <button class="chat-bubble" type="button" data-chat-toggle>
        ${L(`message`)}
        <span>Ayuda</span>
      </button>
    </aside>
  `}function gn(e){return`
    <article class="price-card">
      <strong>${e.name}</strong>
      <small>${e.walks}</small>
      <div class="plan-price-list">
        ${j.map((t,n)=>`
          <div>
            <span>${t}</span>
            <b>${e.prices[n]}</b>
          </div>
        `).join(``)}
      </div>
      <a class="ghost-button" href="${p(`Hola, quiero consultar por el ${e.name} (${e.walks}) para mi perro.`)}" target="_blank" rel="noreferrer">Consultar</a>
    </article>
  `}function _n(e){return`
    <article class="compact-plan-card">
      <span>
        <strong>${e.name}</strong>
        <small>${e.walks}</small>
      </span>
      <b>${e.prices[0]} - ${e.prices[2]}</b>
    </article>
  `}function $(e,t){return`
    <details>
      <summary>${e}</summary>
      <p>${t}</p>
    </details>
  `}function vn(e,t=!1){return`
    <article class="dog-card">
      <div class="dog-card-header">
        <span class="dog-avatar">${e.name.slice(0,1)}</span>
        <span>
          <strong>${e.name}</strong>
          <small>${e.breed} · ${e.age}</small>
        </span>
      </div>
      <dl>
        <div><dt>Conducta</dt><dd>${e.behavior}</dd></div>
        <div><dt>Energia</dt><dd>${e.energy}</dd></div>
        <div><dt>Riesgo</dt><dd><span class="risk ${e.risk.toLowerCase()}">${e.risk}</span></dd></div>
        <div><dt>Compatibilidad</dt><dd>${e.compatibility}</dd></div>
        <div><dt>Observaciones</dt><dd>${e.observations}</dd></div>
        ${t?``:`
          <div><dt>Veterinario</dt><dd>${e.vet}</dd></div>
          <div><dt>Vacunas</dt><dd>${e.vaccines}</dd></div>
        `}
      </dl>
    </article>
  `}function yn(e){return`
    <div class="list-row">
      <span>
        <strong>${e.time} · ${e.zone}</strong>
        <small>${e.dogs.join(`, `)} · Paseador: ${e.walker}</small>
      </span>
      <span class="status-pill">${e.status}</span>
    </div>
  `}function bn(){return X(`
    <main class="auth-layout">
      <section class="auth-copy reveal">
        <p class="eyebrow">404</p>
        <h1>Ruta no encontrada</h1>
        <p>Volver a la landing pública o entrar a un dashboard por rol.</p>
        <a class="primary-button" href="/" data-link>Ir al inicio</a>
      </section>
    </main>
  `)}z();function xn(){let e=localStorage.getItem(`paseosJuanActiveModal`);if(!e)return``;let{type:t,data:n}=JSON.parse(e),r=``;switch(t){case`admin-reports`:r=`<h3>Reportes operativos</h3><p>Reportes filtrables. (Demo)</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-users`:r=`<h3>Usuarios y permisos</h3><p>Gestionar usuarios demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-prices`:r=`<h3>Precios y planes</h3><p>Editar precios y descuentos.</p><button class='primary-button' data-modal-action='save-prices'>Guardar cambios</button> <button data-modal-action='close'>Cerrar</button>`;break;case`admin-alerts`:r=`<h3>Alertas críticas</h3><p>Resolver alertas operativas.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-client`:r=`<h3>Ficha del cliente</h3><p>Detalle demo del cliente.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-audit`:r=`<h3>Auditoría</h3><p>Auditoría de cambios y chats.</p><button data-modal-action='close'>Cerrar</button>`;break;case`admin-settings`:r=`<h3>Configuración del sistema</h3><p>Opciones generales demo.</p><button data-modal-action='close'>Cerrar</button>`;break;case`client-pay`:r=`<h3>Pago online (Demo)</h3><p>Alias: dejandohuellas.plan</p><label>Subir comprobante <input type='file' accept='image/*,.pdf' /></label><button class='primary-button' data-modal-action='confirm-pay'>Enviar comprobante</button> <button data-modal-action='close'>Cerrar</button>`;break;default:r=`<h3>Modal</h3><button data-modal-action='close'>Cerrar</button>`}return`
    <div class="modal-backdrop" data-modal-backdrop>
      <div class="modal-content panel" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; width: 90%; max-width: 500px;">
        ${r}
      </div>
    </div>
  `}function Sn(){let e=localStorage.getItem(`paseosJuanToast`);if(!e)return``;let t=JSON.parse(e);return setTimeout(()=>{localStorage.getItem(`paseosJuanToast`)&&(localStorage.removeItem(`paseosJuanToast`),window.dispatchEvent(new Event(`paseosJuanStoreUpdate`)))},3e3),`
    <div class="toast is-${t.type}" style="position:fixed; bottom: 20px; right: 20px; z-index: 10000; padding: 12px 24px; background: ${t.type===`error`?`#ef4444`:`#10b981`}; color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
      ${t.message}
    </div>
  `}document.addEventListener(`click`,n=>{let o=n.target.closest(`[data-modal-action]`);if(o){if(o.dataset.modalAction===`close`&&i(),o.dataset.modalAction===`confirm-pay`){let n=e();n.alerts=[{id:`alert-`+Date.now(),dog:`Pago cliente`,type:`Pago por confirmar`,level:`Medio`,description:`Cliente subió comprobante.`},...n.alerts||[]],t(n),a(`Comprobante enviado. Estado: Pago por confirmar.`),i()}o.dataset.modalAction===`save-prices`&&(a(`Precios actualizados correctamente.`),i());return}if(n.target.closest(`[data-modal-backdrop]`)&&n.target===n.target.closest(`[data-modal-backdrop]`)){i();return}let s=n.target.closest(`[data-client-action]`);s&&s.dataset.clientAction===`pay-online`&&r(`client-pay`);let c=n.target.closest(`[data-admin-action]`);if(c){let e=c.dataset.adminAction;e===`reports`&&r(`admin-reports`),e===`users`&&r(`admin-users`),e===`prices`&&r(`admin-prices`),e===`alerts`&&r(`admin-alerts`),e===`user-change-role`&&a(`Rol actualizado (Demo)`),e===`user-toggle`&&a(`Usuario activado/desactivado (Demo)`,`warning`),e===`user-permissions`&&r(`admin-users`),e===`edit-plan`&&r(`admin-prices`),e===`view-client`&&r(`admin-client`),e===`audit-client`&&r(`admin-audit`),e===`settings`&&r(`admin-settings`),e===`review-alert`&&a(`Alerta resuelta.`);return}});