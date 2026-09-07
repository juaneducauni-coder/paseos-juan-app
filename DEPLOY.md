# Cómo desplegar Paseos Juan

Esta app **no funciona en Vercel** (ver explicación abajo). Necesita un servidor que corra siempre y tenga disco persistente para la base de datos SQLite.

## Por qué no Vercel

Vercel está pensado para sitios estáticos y funciones que arrancan, responden y se apagan. Esta app es un servidor Express que queda corriendo y escribe en `data/paseosjuan.db`. En Vercel ese archivo no persiste entre invocaciones — se perdería la información. Por eso el despliegue automático que tenías conectado falla.

**Acción necesaria de tu parte:** desde tu cuenta de Vercel (vercel.com → el proyecto `paseos-juan-app` → Settings → Git), desconectá este repositorio para que deje de intentar desplegarlo solo y de marcar el Pull Request en rojo. Yo no tengo acceso a tu cuenta de Vercel para hacerlo.

## Opción recomendada: Render

1. Entrá a [render.com](https://render.com) con tu cuenta (podés loguearte con GitHub).
2. "New" → "Web Service" → elegí el repo `paseos-juan-app` y la rama que quieras desplegar.
3. Render va a detectar el `render.yaml` que dejé en el repo y va a proponer:
   - Plan **Starter** (de pago, hoy ronda los USD 7/mes) — necesario para el disco persistente donde vive la base de datos.
   - Un disco de 1 GB montado en `data/`, así la información sobrevive a reinicios y redespliegues.
4. Confirmá y esperá el primer deploy (unos minutos).
5. Una vez arriba, entrá como administrador y **cambiá las 5 contraseñas de prueba** (`Cambiar123!`).

### Si no querés pagar todavía (solo para probar)

Podés desplegar en el plan gratuito de Render sacando la sección `disk` del `render.yaml`, pero la base de datos se borra cada vez que el servicio se reinicia o se redespliega (Render apaga los servicios gratis por inactividad). Sirve para mostrar la app, no para operar con datos reales.

## Alternativa: Railway

También funciona bien porque soporta procesos persistentes:

1. [railway.app](https://railway.app) → "New Project" → "Deploy from GitHub repo".
2. Railway detecta el `npm start` solo, no hace falta configuración extra.
3. Agregá un **Volume** (Settings del servicio → Volumes) montado en la carpeta `data/` del proyecto, para que la base de datos persista.
4. Railway te da una URL pública apenas termina el build.

## Variables de entorno

No hace falta configurar ninguna para que la app arranque. Opcionalmente podés fijar `PORT` (por defecto usa el que te asigne la plataforma o 4173 en local).
