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

La pantalla inicial debe mostrar el estado del backend como conectado.
