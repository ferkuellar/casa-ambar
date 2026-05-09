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
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=no-reply@casaambar.local
LEADS_NOTIFICATION_EMAIL=ventas@casaambar.local
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

## Validación funcional Fase 5

Con backend y frontend activos, abrir una ficha de producto existente:

```txt
http://localhost:5173/producto/{productSlug}
```

Validar:

- `ProductCard` navega a `/producto/:slug` desde catálogo y relacionados.
- La ficha carga desde `/api/catalog/products/{slug}/`.
- La galería muestra imágenes o placeholder premium.
- Los thumbnails cambian la imagen principal cuando hay más de una imagen.
- La información técnica oculta campos vacíos.
- El CTA de WhatsApp genera un enlace `wa.me` con mensaje de producto.
- El botón de compra queda preparado visualmente sin procesar pagos.
- Los productos relacionados salen de la misma categoría.
- El JSON-LD Product se renderiza en la página.

## Validación funcional Fase 6

Aplicar migraciones:

```bash
cd backend
.venv\Scripts\activate
python manage.py migrate
```

Validar endpoint de leads con backend activo:

```txt
POST http://localhost:8000/api/leads/
```

Payload ejemplo:

```json
{
  "lead_type": "GENERAL_CONTACT",
  "name": "Cliente Demo",
  "email": "cliente@example.com",
  "phone": "",
  "message": "Me interesa conocer más sobre Casa Ámbar.",
  "preferred_contact_method": "EMAIL",
  "source": "home_contact"
}
```

Validar:

- `POST /api/leads/` crea lead válido.
- `GET /api/leads/` responde método no permitido; no hay listado público.
- Django Admin muestra `Lead`.
- El email de notificación se imprime en consola con `EmailBackend` de desarrollo.
- El formulario de producto aparece en `/producto/:slug`.
- El formulario de diseño personalizado aparece en la Home.
- El formulario de contacto general aparece en la sección `#contacto`.
- Los formularios muestran estados de envío, éxito y error.
