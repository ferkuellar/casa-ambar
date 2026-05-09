# Auditoría Fase 0 — Fundación del Proyecto

## 1. Auditoría inicial

Estado inicial encontrado: el repositorio en `D:\projects\casa-ambar` solo contenía `.git`; no existía frontend, backend, documentación ni configuración de proyecto.

No existía proyecto previo funcional que preservar. Git reportó `dubious ownership` porque el filesystem no registra ownership, por lo que no se ejecutaron operaciones destructivas ni cambios de configuración global durante la implementación.

Riesgos detectados antes de implementar:

- No había estructura base ni convenciones locales.
- No existían dependencias instaladas ni entorno virtual.
- No había documentación de setup.
- El hosting final aún no está confirmado.

Decisiones tomadas para no sobreingenierizar:

- Se creó solo la base frontend/backend de Fase 0.
- Se usó SQLite temporal para desarrollo.
- Se expuso únicamente un endpoint de healthcheck.
- No se implementaron catálogo, productos, carrito, login, Stripe, CRM ni deploy.

## 2. Plan técnico

Se iba a construir una fundación técnica separada entre frontend y backend para Casa Ámbar.

El backend debía quedar listo con Django, Django REST Framework, CORS local, variables de entorno y `GET /api/health/`.

El frontend debía quedar listo con React, Vite, TypeScript, TailwindCSS, cliente API centralizado y una pantalla inicial premium conectada al backend.

Alcance explícito de Fase 0:

- Estructura base del repositorio.
- Configuración backend.
- Configuración frontend.
- Healthcheck integrado.
- Documentación inicial.
- Auditoría técnica.

Quedó fuera intencionalmente:

- Catálogo real.
- Productos.
- Carrito.
- Stripe.
- Login.
- Autenticación JWT.
- PostgreSQL.
- Deploy.
- CRM.
- Blog.
- Panel admin custom.

## 3. Archivos creados

- `.gitignore`
- `README.md`
- `backend/.env.example`
- `backend/manage.py`
- `backend/requirements.txt`
- `backend/config/__init__.py`
- `backend/config/settings.py`
- `backend/config/urls.py`
- `backend/config/asgi.py`
- `backend/config/wsgi.py`
- `backend/apps/__init__.py`
- `backend/apps/core/__init__.py`
- `backend/apps/core/apps.py`
- `backend/apps/core/urls.py`
- `backend/apps/core/views.py`
- `frontend/.env.example`
- `frontend/index.html`
- `frontend/package-lock.json`
- `frontend/package.json`
- `frontend/postcss.config.js`
- `frontend/tailwind.config.js`
- `frontend/tsconfig.json`
- `frontend/tsconfig.node.json`
- `frontend/vite.config.ts`
- `frontend/src/App.tsx`
- `frontend/src/main.tsx`
- `frontend/src/index.css`
- `frontend/src/lib/api.ts`
- `frontend/src/vite-env.d.ts`
- `frontend/src/components/HealthCheck.tsx`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/auditoria-fase0.md`

## 4. Archivos modificados

No existían archivos de proyecto previos. Todos los archivos de Fase 0 fueron creados desde cero.

Archivos ajustados durante la validación:

- `backend/config/settings.py`: se simplificó la lectura de variables de entorno con `os.environ`.
- `frontend/package.json`: se movieron dependencias de tooling a `devDependencies` y se actualizó Vite para resolver vulnerabilidades de audit.
- `frontend/src/vite-env.d.ts`: se agregó soporte de tipos para `import.meta.env`.
- `docs/auditoria-fase0.md`: se actualizó con resultados reales de validación.

## 5. Implementación

Backend creado/configurado:

- Proyecto Django `config`.
- App `core` dentro de `backend/apps/core`.
- Django REST Framework configurado.
- `django-cors-headers` configurado para desarrollo local.
- Variables base leídas desde `.env`.
- SQLite configurado como base temporal.
- Idioma `es-mx` y zona horaria `America/Chihuahua`.

Frontend creado/configurado:

- React + Vite + TypeScript.
- TailwindCSS.
- Pantalla inicial con estética sobria premium para Casa Ámbar.
- Cliente API centralizado en `frontend/src/lib/api.ts`.

Healthcheck implementado:

- Backend expone `GET /api/health/`.
- Frontend consulta `${VITE_API_BASE_URL}/health/`.
- El componente muestra estados cargando, conectado y error.

Variables de entorno creadas:

- `backend/.env.example`
- `frontend/.env.example`

Documentación creada:

- `README.md`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/auditoria-fase0.md`

## 6. Validación

Comandos para validar:

```bash
# Backend
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

# Frontend
cd frontend
npm install
npm run dev
```

Validaciones esperadas:

- Backend responde en `/api/health/`.
- Frontend carga en `localhost:5173`.
- Frontend consulta backend correctamente.

Validación técnica ejecutada durante la fase:

- `python --version`: Python 3.12.10.
- `node --version`: Node v24.15.0.
- `npm --version`: npm 11.12.1.
- `python -m venv .venv`: entorno virtual creado correctamente.
- `.venv\Scripts\python.exe -m pip install -r requirements.txt`: dependencias backend instaladas correctamente.
- `.venv\Scripts\python.exe manage.py check`: sin issues.
- `.venv\Scripts\python.exe manage.py migrate --noinput`: migraciones base aplicadas correctamente.
- `npm install`: dependencias frontend instaladas correctamente.
- `npm run build`: TypeScript y Vite compilaron correctamente.
- `npm audit --audit-level=moderate`: 0 vulnerabilidades.
- `GET http://127.0.0.1:8000/api/health/`: respondió `status=ok`, `service=casa-ambar-api`, `phase=fase-0`.
- `GET http://127.0.0.1:5173`: respondió HTTP 200.

Nota operativa: los comandos de PowerShell muestran warnings del perfil local `PSReadLine`, pero no bloquearon la validación del proyecto.

## 7. Riesgos

- Hosting aún no confirmado.
- CORS solo configurado para desarrollo.
- SQLite temporal.
- Sin autenticación todavía.
- Sin manejo productivo de secretos.
- Sin pipeline CI/CD todavía.
- Sin PostgreSQL ni migraciones de dominio.
- Sin pruebas automatizadas porque todavía no hay lógica de negocio.
- El entorno local usa Node 24; si el hosting/build server usa otra versión, conviene fijar versión con `.nvmrc` o documentación de runtime en la siguiente fase.

## 8. Auditoría final

Estado final de la fase:

- Fundación frontend/backend creada.
- Healthcheck backend implementado.
- Frontend conectado al backend mediante variable de entorno.
- Documentación inicial creada.
- No se implementó funcionalidad fuera de alcance.

Calidad del código:

- Estructura simple y escalable.
- Separación clara entre API, UI y configuración.
- Sin secretos reales hardcodeados.
- Dependencias limitadas al alcance de Fase 0.

Pendientes:

- Confirmar hosting final.
- Definir modelo de datos de catálogo.
- Definir estrategia de productos, inventario e imágenes.
- Definir estrategia SEO.
- Agregar pruebas cuando exista lógica de negocio.
- Agregar CI/CD cuando se confirme flujo de deploy.

Recomendaciones para Fase 1:

- Modelar catálogo inicial: productos, categorías, colecciones e imágenes.
- Definir contratos API antes de construir UI de catálogo.
- Preparar PostgreSQL si el entorno de hosting lo permite.
- Agregar validaciones, serializers y pruebas básicas de API.

Checklist de cierre:

- [x] Backend corre localmente
- [x] Frontend corre localmente
- [x] Healthcheck funciona
- [x] Variables .env.example creadas
- [x] Documentación creada
- [x] No hay secretos hardcodeados
- [x] Estructura lista para Fase 1
