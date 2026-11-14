# Cobrar online con Naranja X — investigación (13/11/2026)

## Conclusión en 3 líneas

1. Naranja X **sí** tiene link de pago, QR interoperable y Cobro Tap para personas físicas, todo desde la app. **No encontré** API pública, checkout integrable ni webhooks para una web propia.
2. Por eso, con Naranja X sola, la confirmación del pago en la app de Paseos Juan **sigue siendo manual** (el admin aprueba).
3. Recomendación: seguir con Naranja X y aprobación manual, sumando link de pago o QR por plan. Pasar a una pasarela con API (Mercado Pago) solo si la aprobación manual se vuelve un problema.

## Cómo leer este documento

- **Dato oficial**: leído en la página de Naranja X. El sitio naranjax.com estaba caído el 13/11/2026 (mostraba "Estamos trabajando para volver pronto"), así que leí las copias guardadas en Wayback Machine del **04/11/2026**. Dejo el link oficial; la copia está en `web.archive.org/web/2026/<link>`.
- **Terceros**: notas, buscadores o páginas que no son de Naranja X.
- **Suposición** y **Recomendación**: marcadas aparte.
- Las comisiones "pueden cambiar sin previo aviso" (lo dice Naranja X). Confirmá siempre en la app antes de decidir.

## 1. Qué productos de cobro existen

| Producto | ¿Existe? | Para quién | Fuente |
|---|---|---|---|
| Link de pago | Sí. "Generá un link con el monto a cobrar y lo enviás por Whatsapp o redes sociales" | Persona física | [Comercios](https://www.naranjax.com/comercios) |
| QR interoperable (dinámico o estático) | Sí. Cobra de Mercado Pago, Ualá, Modo, bancos | Persona física | [Código QR](https://www.naranjax.com/codigo-qr-comercios) |
| Cobro Tap (tarjeta contra el celular) | Sí. Solo Android con NFC | Persona física | [Cobro Tap](https://www.naranjax.com/cobro-tap-comercios) |
| Cobro PIX (turistas de Brasil) | Sí | Con la app | [Soluciones de cobro](https://www.naranjax.com/soluciones-de-cobro) |
| Terminal de cobro | Sí, pero es adherir una terminal de otra marca (Payway, Clover, Getnet, Posnet) para aceptar tarjeta de crédito Naranja X | Física y jurídica | [Comercios](https://www.naranjax.com/comercios) |
| "Ecommerce" | Existe, pero es "Agregá Naranja X como opción de pago en tu Tienda online": acepta **solo la tarjeta de crédito Naranja X**, con alta por formulario. No es un checkout para todos los medios | Física y jurídica | [Comercios](https://www.naranjax.com/comercios) |
| Débito automático (cobro recurrente) | Existe, pero figura **solo para personas jurídicas** y solo con tarjeta de crédito Naranja X ("cobros mensuales") | Persona jurídica | [Comercios](https://www.naranjax.com/comercios) |
| Suscripciones con cualquier medio de pago | **No encontré** | — | Pendiente de confirmar |
| Cuenta negocio | Sí. Caja de ahorro separada, con alias propio del negocio y sin costo de mantenimiento | Quien ya cobra con la app | [Cuenta negocio](https://www.naranjax.com/cuenta-negocio) |

Notas:

- "Toque Naranja X" (el lector) aparece en notas viejas del blog. En las páginas de noviembre de 2026 ya no figura en el menú: el producto vigente es **Cobro Tap**. Si el lector se sigue vendiendo: Pendiente de confirmar.
- El link de pago está mencionado, pero **no tiene página propia** con condiciones. Si el link sirve para varios pagos o es de un solo uso, y si vence: Pendiente de confirmar (probarlo en la app).
- Débito automático "mensual": Paseos Juan cobra por semana, así que no encaja ni aunque Juan fuera persona jurídica.

## 2. API para desarrolladores

**No existe API pública documentada de Naranja X para cobrar en una web propia.** Lo digo claro: no encontré portal de desarrolladores, credenciales, checkout web ni webhooks de confirmación.

- Dato oficial: la página de comercios menciona "botón de pago", "integración API y plugins para plataformas conocidas" en un texto general, sin link a documentación, sin nombrar plataformas y sin explicar cómo se accede. [Comercios](https://www.naranjax.com/comercios)
- Dato oficial: el único camino visible es el formulario de alta "Ecommerce" (tarjeta de crédito Naranja X). No pude leer el formulario (bloqueado). Qué integración entrega: Pendiente de confirmar.
- Dato oficial: los cobros de la app corren sobre **Nave**, "el ecosistema de cobros disponible dentro de la app Naranja X", unidad del Banco Galicia. [Código QR](https://www.naranjax.com/codigo-qr-comercios)
- Terceros: Nave tendría una API de pagos con credenciales que se piden a Nave, un plugin para WooCommerce, una app en Tiendanube y un SDK no oficial en Node.js. No vi documentación oficial. Fuentes: [SDK no oficial](https://github.com/emilioastarita/sdk-nave-nodejs), [directorio de plugins](https://www.xpay.sh/directory/woocommerce/plugins/nave-for-woocommerce/), [Tiendanube](https://www.tiendanube.com/tienda-aplicaciones-nube/nave).
- Pendiente de confirmar: si Nave da credenciales a una persona física con una web propia (no Tiendanube ni WooCommerce) y si avisa los pagos por webhook.

## 3. Comisiones y plazos

Dato oficial (copias del 04/11/2026):

| Producto | Medio de pago | Acreditación | Comisión |
|---|---|---|---|
| QR | Dinero en cuenta | Inmediata | 0,8% + IVA |
| QR | Tarjeta de débito | Inmediata | 1,2% + IVA |
| QR | Tarjeta de crédito | Inmediata | 4,5% + IVA |
| Cobro Tap | Tarjeta de débito | Inmediata | 1,2% + IVA |
| Cobro Tap | Tarjeta de crédito | Inmediata | 4,5% + IVA |
| Link de pago | — | — | **Pendiente de confirmar** (no está publicada) |

Fuentes: [Código QR](https://www.naranjax.com/codigo-qr-comercios), [Cobro Tap](https://www.naranjax.com/cobro-tap-comercios).

- Promo oficial del QR: 0% con dinero en cuenta "los primeros 3 meses o hasta 1.000 UVAs". [Código QR](https://www.naranjax.com/codigo-qr-comercios)
- Sin costo fijo mensual: "Solo pagás una comisión por cada venta". [Soluciones de cobro](https://www.naranjax.com/soluciones-de-cobro)
- Ojo, hay una diferencia entre páginas oficiales: la de soluciones dice que para Tap, link y QR elegís el plazo ("en el día, a 2, a 14 o a 60 días") y que la comisión depende del plazo. Las tablas de arriba muestran solo "Inmediata". Lo que vale es lo que te muestre la app.
- Notas viejas del blog citan 3,15% y 5,79%. Las descarto por antiguas.

Transferencia por alias y QR interoperable:

- QR (Transferencias 3.0): el que paga nunca paga comisión; el comercio paga entre 6 y 8 por mil más IVA. Fuente: [BCRA](https://www.bcra.gob.ar/transferencias-3-0/). Coincide con el 0,8% de Naranja X.
- Transferencia común a la cuenta (lo que hace Juan hoy): Naranja X dice que la Cuenta negocio no tiene costo de mantenimiento y recibe transferencias de cualquier cuenta, y no publica comisión por recibirlas. [Cuenta negocio](https://www.naranjax.com/cuenta-negocio). Si hay costo o tope por uso comercial: **Pendiente de confirmar**.

## 4. Requisitos

Dato oficial ([Comercios](https://www.naranjax.com/comercios)):

- **Persona física**: DNI vigente, ser mayor de 18 y la app (Android o iOS). Se activa desde "Hacer un cobro", creando el perfil de negocio.
- **Persona jurídica**: CUIT activo, estatuto o acta societaria, datos bancarios e información de la actividad. Alta por formulario web.
- Cobro Tap: solo Android con NFC.

Pendiente de confirmar:

- Si piden monotributo o constancia fiscal para cobrar con link o QR. La página no lo pide; no dice nada sobre facturación.
- Límites de monto por cobro o por mes.

Suposición: cobrar como negocio no cambia la obligación de facturar. Eso se consulta con el contador, no con Naranja X.

## 5. Alternativas

**(a) Link de pago de Naranja X pegado en la app (uno por plan)**

- A favor: el cliente paga con tarjeta o billetera sin salir del celular; la plata cae en la misma cuenta.
- En contra: se arma a mano; comisión no publicada; no se sabe si el link se puede reutilizar; la app de Paseos Juan no se entera sola del pago.

**(b) Alias o QR con comprobante y aprobación manual (lo de hoy, mejorado)**

- A favor: ya funciona; la transferencia es lo más barato; cero desarrollo nuevo.
- En contra: depende de que el admin mire y apruebe; el comprobante se puede falsificar, así que hay que chequear contra el movimiento real en la app de Naranja X.

**(c) Pasarela con API (Mercado Pago) y después pasar la plata a Naranja X**

- A favor: confirmación automática. Dato oficial de Mercado Pago: Checkout Pro crea una preferencia de pago por API y avisa por webhook con firma secreta, y el servidor tiene que responder en 22 segundos. Encaja con Vercel Functions. Fuentes: [Checkout Pro](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/overview), [notificaciones](https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/notifications).
- En contra: más cara y con desarrollo. Las comisiones de Mercado Pago las vi solo en terceros (entre 1,49% y 6,29% más IVA según el plazo, y cambian por provincia): **Pendiente de confirmar** en la cuenta de Mercado Pago. Suma una cuenta más y el paso de mover la plata.

## 6. Recomendación

La forma más simple hoy es **(b) + (a)**: mantener Naranja X y la aprobación manual, pero darle al cliente un botón de pago por plan.

1. **Juan activa el perfil de negocio** en la app de Naranja X ("Hacer un cobro") y anota la comisión real del link de pago y si el link se puede reutilizar.
2. **En la app de Paseos Juan, cada plan muestra "Pagar"**: abre el link de pago de ese plan (o el QR). La transferencia con comprobante queda como segunda opción.
3. **El admin aprueba** cuando le llega la notificación de cobro de Naranja X, comparando monto y fecha con el pedido en la pestaña Plata.

Por qué: no hay API confirmada de Naranja X, así que la confirmación automática hoy solo se consigue con otra pasarela, que cuesta más y pide desarrollo. Con pocos clientes y planes semanales, aprobar a mano es barato.

Cuándo cambiar a (c): si la aprobación manual genera demoras o errores todas las semanas.

**PRÓXIMO PASO:** abrí la app de Naranja X, entrá a "Hacer un cobro", generá un link de pago de prueba y fijate qué comisión te muestra y si el mismo link acepta más de un pago.
