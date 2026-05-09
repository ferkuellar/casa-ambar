# Casa Ámbar E-commerce

Fundación técnica para el e-commerce boutique premium de Casa Ámbar, una joyería fina preparada para crecer hacia catálogo, productos, pagos, leads, CRM y SEO técnico.

Estado actual: **Fase 6 — Leads y Cotizaciones**.

## Stack técnico

- Frontend: React, Vite, TypeScript, TailwindCSS.
- Backend: Django, Django REST Framework.
- Base de datos actual: SQLite en desarrollo.
- Base de datos futura: PostgreSQL.
- Pagos futuros: Stripe.

## Estructura del proyecto

```txt
casa-ambar-ecommerce/
├── backend/
│   ├── config/
│   ├── apps/
│   │   └── core/
│   │   └── catalog/
│   │   └── leads/
│   ├── .env.example
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── catalog/
│   │   │   ├── layout/
│   │   │   ├── sections/
│   │   │   └── ui/
│   │   ├── constants/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
├── docs/
│   ├── architecture.md
│   ├── setup.md
│   ├── auditoria-fase0.md
│   ├── auditoria-fase1.md
│   ├── auditoria-fase2.md
│   ├── auditoria-fase3.md
│   ├── auditoria-fase4.md
│   ├── auditoria-fase5.md
│   └── auditoria-fase6.md
├── .gitignore
└── README.md
```

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py runserver
```

Tests backend:

```bash
python manage.py test
```

Healthcheck:

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

Catálogo API:

```txt
http://localhost:8000/api/catalog/categories/
http://localhost:8000/api/catalog/collections/
http://localhost:8000/api/catalog/products/
http://localhost:8000/api/catalog/products/?featured=true
http://localhost:8000/api/catalog/products/{slug}/
```

Leads API:

```txt
POST http://localhost:8000/api/leads/
```

Payload mínimo:

```json
{
  "lead_type": "GENERAL_CONTACT",
  "name": "Cliente Demo",
  "email": "cliente@example.com",
  "message": "Me interesa conocer más sobre Casa Ámbar.",
  "preferred_contact_method": "EMAIL",
  "source": "home_contact"
}
```

## Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Build de validación:

```bash
npm run build
```

Aplicación:

```txt
http://localhost:5173
```

La Home actual incluye hero premium, colecciones placeholder, productos destacados mock, diseño personalizado, confianza, testimonios placeholder, CTA WhatsApp configurable y newsletter visual sin envío real.

Rutas frontend de catálogo:

```txt
http://localhost:5173/
http://localhost:5173/catalogo
http://localhost:5173/colecciones
http://localhost:5173/colecciones/{categorySlug}
http://localhost:5173/producto/{productSlug}
```

El catálogo frontend consume:

```txt
GET /api/catalog/categories/
GET /api/catalog/categories/{slug}/
GET /api/catalog/products/
GET /api/catalog/products/?category={slug}
GET /api/catalog/products/?featured=true
GET /api/catalog/products/?requires_quote=true
GET /api/catalog/products/{slug}/
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

## Próxima fase recomendada

Fase 7 debe enfocarse en carrito básico: estado global del carrito, agregar producto, eliminar producto, cambiar cantidad, cart drawer lateral, persistencia en localStorage y resumen de compra, sin Stripe todavía.
