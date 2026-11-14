# Resumen de la noche para Juan — 14/11/2026

**Todo está en la rama de prueba `claude/quirky-shannon-ih7yx1`. NO está publicado en la página oficial.** Para publicar, escribí "publicá en main".

## Lo más importante (3 cosas)

1. **Chats y avisos funcionando.** Grupos del equipo (Equipo, Calle, Coordinación), mensajes directos, chat con cada cliente y comunidad de clientes con moderación. Respuestas rápidas de un toque ("Llegué", "Perro suelto"). Sin señal, el mensaje se guarda y se manda solo.
2. **Clientes con su página real.** Vos aprobás el alta (días y turno) y mandás el enlace por WhatsApp. El cliente ve el paseo de hoy con foto, los avisos automáticos ("Retiramos a…", "Entregamos a…"), su próximo paseo y el alias completo para pagar.
3. **Todo más fácil en el celular.** Dos auditorías rol por rol y una revisión de código: palabras completas, sin códigos internos, avisos que no tapan botones, precios que se ven enteros, y varios errores arreglados.

## Qué se hizo

- **Paseador y ayudante:** el ayudante lleva la muslera y el paseador la pechera. "Ruta 1" en vez de "PJ_1M". Un incidente avisa solo en el chat Calle (en rojo si es urgente).
- **Supervisor:** ve la foto del paseo en la tarjeta del perro; pedido "Cambiar de ruta", que avisa solo en el chat Coordinación.
- **Coordinador:** edita una ruta sin tener que cargar todas; no se pisan rutas guardadas.
- **Admin:** altas de clientes, alias de pago (lo cargás vos), moderación, pestaña Mensajes. Las prioridades urgentes no quedan plegadas.
- **Tienda:** sección "Importados — próximamente" con 9 productos, demora estimada (50 días de fabricación + 3 meses en barco) y "Avisame cuando llegue". Sin precios inventados.
- **Manual** (`/manual`): historias cortas con dibujos, una por rol, con accesos directos.
- **Seguridad:** una auditoría encontró que un paseador podía mandarle a un cliente un aviso falso firmado por "Paseos Juan" (por ejemplo, pedir que transfiera a otro alias). Arreglado. Solo vos generás enlaces de clientes.
- **Vercel:** las versiones de prueba no se armaban (el plan gratis permite 12 funciones y había 14). Arreglado y comprobado.
- **Pruebas:** 45 pruebas del servidor y recorrido en el navegador sin fallas.

## Necesita tu decisión

1. **Alias de cobro:** copialo desde la app de Naranja X y cargalo en Admin → Plata (o pasámelo). No lo encontré en tu Drive ni en tu Gmail.
2. **Respuestas rápidas:** hoy "Perro suelto" se manda con un toque. ¿Lo dejamos así?
3. **Mensajes sin señal:** uno que pasa más de 3 horas sin salir ya no se manda solo. ¿Está bien ese tiempo?
4. **Botón de WhatsApp del aviso urgente:** va a tu número. ¿Querés otro (por ejemplo, el del supervisor)?
5. **Datos de perros** que no coinciden entre planillas (Bocha sin ruta, Coqui de baja o no, días de Ron y Otto, y otros): lista completa en `asistente/investigacion/2026-11-14-investigacion.md`, sección 6.

## Para Gemini y ChatGPT

Encargos listos para pegar en `asistente/encargos/2026-11-14-gemini-chatgpt.md`: auditoría visual con capturas e ilustraciones (Gemini), términos y privacidad y textos de avisos (ChatGPT).

## Detalle hora por hora

`asistente/encargos/2026-11-14-bitacora-noche.md`

**PRÓXIMO PASO:** copiá el alias desde la app de Naranja X y cargalo en Admin → Plata.
