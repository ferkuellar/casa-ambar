# Casa Ámbar E-commerce

Fundación técnica para el e-commerce boutique premium de Casa Ámbar, una joyería fina preparada para crecer hacia catálogo, productos, pagos, leads, CRM y SEO técnico.

Estado actual: **Fase 1 — Identidad Visual y Frontend Base**.

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
│   └── auditoria-fase1.md
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

Fase 2 debe enfocarse en catálogo base y modelo de productos: productos, categorías, colecciones, imágenes, serializers, endpoints y pruebas API mínimas. No conviene avanzar a Stripe o carrito antes de tener el dominio de productos estable.
