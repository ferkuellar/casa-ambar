# Setup Casa Ámbar E-commerce

## Requisitos

- Python 3.11 o superior recomendado.
- Node.js 18 o superior recomendado.
- npm.

## Instalación backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py runserver
```

## Instalación frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Build de validación frontend:

```bash
npm run build
```

## Variables de entorno

Backend:

```env
SECRET_KEY=change-me
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

Frontend:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Cómo correr ambos servicios

Terminal 1:

```bash
cd backend
.venv\Scripts\activate
python manage.py runserver
```

Terminal 2:

```bash
cd frontend
npm run dev
```

## Cómo validar healthcheck

Abrir:

```txt
http://localhost:8000/api/health/
```

Respuesta esperada:

```json
{
  "status": "ok",
  "service": "casa-ambar-api",
  "phase": "fase-0"
}
```

Luego abrir:

```txt
http://localhost:5173
```

La pantalla inicial debe mostrar el layout premium de Casa Ámbar y el estado del backend como conectado en la sección técnica final.

## Cómo validar catálogo frontend

Con backend y frontend activos, abrir:

```txt
http://localhost:5173/catalogo
http://localhost:5173/colecciones
```

Si existe una categoría activa con slug `anillos`, abrir:

```txt
http://localhost:5173/colecciones/anillos
```

Validar:

- El catálogo muestra productos desde `/api/catalog/products/`.
- El filtro de categoría consulta `/api/catalog/products/?category={slug}`.
- Los filtros de destacados y cotización actualizan resultados.
- Si el backend está apagado, se muestra estado de error.
- Si no hay productos activos, se muestra estado vacío.

## Cómo validar catálogo API

Con backend activo:

```txt
http://localhost:8000/api/catalog/categories/
http://localhost:8000/api/catalog/collections/
http://localhost:8000/api/catalog/products/
http://localhost:8000/api/catalog/products/?featured=true
```

Si existe un producto con slug `anillo-aurora`:

```txt
http://localhost:8000/api/catalog/products/anillo-aurora/
```

## Tests backend

```bash
cd backend
.venv\Scripts\activate
python manage.py test
```

## Validación visual Fase 2

La Home debe mostrar:

- Hero principal.
- Colecciones.
- Productos destacados mock.
- Diseño personalizado.
- Confianza.
- Testimonios placeholder.
- CTA WhatsApp.
- Newsletter visual sin envío real.
- Healthcheck técnico al final.

## Validación funcional Fase 4

La aplicación debe exponer:

- `/` para Home.
- `/catalogo` para catálogo de productos.
- `/colecciones` para categorías comerciales.
- `/colecciones/:categorySlug` para productos filtrados por categoría.

El frontend requiere:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```
