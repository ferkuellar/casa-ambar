# Casa Ámbar E-commerce

Fundación técnica para el e-commerce boutique premium de Casa Ámbar, una joyería fina preparada para crecer hacia catálogo, productos, pagos, leads, CRM y SEO técnico.

Estado actual: **Fase 3 — Catálogo Base y Modelo de Productos**.

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
│   ├── .env.example
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── sections/
│   │   │   └── ui/
│   │   ├── constants/
│   │   └── lib/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
├── docs/
│   ├── architecture.md
│   ├── setup.md
│   ├── auditoria-fase0.md
│   ├── auditoria-fase1.md
│   ├── auditoria-fase2.md
│   └── auditoria-fase3.md
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

## Próxima fase recomendada

Fase 4 debe enfocarse en integración de catálogo en frontend: consumir API desde React, mostrar catálogo real, página por categoría, página de producto y estados loading/error/empty.
