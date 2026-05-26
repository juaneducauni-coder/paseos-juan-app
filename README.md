# Paseos Juan

SPA estatica para perfilar la experiencia por tipo de usuario:

- Landing publica para visitantes en `/`.
- Acceso en `/login`, registro en `/registro` y compatibilidad con `/register`.
- Dashboards por rol:
  - `/admin`
  - `/coordinador`
  - `/supervisor`
  - `/paseador`
  - `/cliente`
  - Se conservan tambien las rutas legacy `/dashboard/*`.

## Como correrlo

No requiere dependencias. Servir el directorio con cualquier servidor estatico:

```bash
python3 -m http.server 4173
```

Luego abrir `http://localhost:4173`.

## Estructura

- `index.html`: entrada de la SPA.
- `login/`, `registro/`, `register/`, `admin/`, `coordinador/`, `supervisor/`, `paseador/`, `cliente/` y `dashboard/*/`: entradas HTML espejo para que las rutas funcionen al abrir directo con un servidor estatico simple.
- `src/app.js`: rutas, roles, datos mock y vistas.
- `src/styles.css`: sistema visual responsive y mobile-first.

La logica de roles queda centralizada en `ROLES`, para facilitar una futura migracion a app movil o backend real de permisos.
