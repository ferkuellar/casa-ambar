# Arquitectura Casa Ámbar E-commerce

## Visión general

Casa Ámbar usa una arquitectura separada entre frontend y backend para mantener responsabilidades claras desde la fase inicial.

- Frontend: React, Vite, TypeScript y TailwindCSS.
- Backend: Django y Django REST Framework.
- Base de datos actual: SQLite para desarrollo local.
- Base de datos futura: PostgreSQL cuando el proyecto avance a datos reales.

## Razón de React + Django

React con Vite permite construir una experiencia de compra rápida, modular y flexible para una marca boutique. Django aporta una base madura para APIs, administración futura, seguridad, modelos de datos y crecimiento hacia operaciones de e-commerce.

## Flujo actual de desarrollo

1. El frontend corre en `http://localhost:5173`.
2. El backend corre en `http://localhost:8000`.
3. El frontend consume `VITE_API_BASE_URL`.
4. La API expone `GET /api/health/` para validar conectividad.

## Futuro flujo e-commerce

En fases posteriores, el frontend consumirá endpoints de productos, categorías, inventario, leads, checkout y contenido SEO. El backend podrá concentrar reglas de negocio, validaciones, pagos con Stripe, administración y persistencia en PostgreSQL.

## Decisiones técnicas de Fase 0

- Se separó `frontend/` y `backend/` para facilitar despliegues independientes.
- Se configuró DRF desde el inicio para evitar migraciones estructurales innecesarias después.
- Se agregó CORS solo para desarrollo local.
- Se dejó SQLite como base temporal para reducir fricción inicial.
- No se implementó autenticación, catálogo, carrito, pagos ni CRM para mantener el alcance limpio.

## Decisiones técnicas de Fase 1

- Se creó un sistema visual base en Tailwind con tokens Casa Ámbar.
- Se separó el frontend en layout, secciones, componentes UI, constantes y utilidades.
- `App.tsx` quedó como composición de página, sin lógica visual concentrada.
- La home usa placeholders editoriales sin datos reales para no adelantar catálogo.
- `HealthCheck` se mantiene como bloque técnico discreto conectado a la API de Fase 0.
- Se importan dos familias de Google Fonts: Cormorant Garamond para titulares e Inter para texto. La carga se documenta como decisión visual y debe revisarse en performance cuando exista SEO productivo.

## Decisiones técnicas de Fase 2

- La Home se transformó en una página comercial completa orientada a marca, confianza y captación.
- Los datos de colecciones, productos destacados, pasos, confianza y testimonios viven en `frontend/src/constants/home.ts`.
- Los tipos de Home viven en `frontend/src/types/home.ts` para evitar acoplar estructura de datos a componentes.
- El CTA de WhatsApp usa `siteConfig.whatsappNumber`, `siteConfig.whatsappMessage` y `buildWhatsAppLink`.
- El newsletter es solo UI placeholder; no envía datos ni crea integración externa.
- No se conectó catálogo real, carrito, Stripe, CRM ni modelos Django.

## Decisiones técnicas de Fase 3

- Se creó `apps.catalog` como app única para categorías, colecciones, productos e imágenes.
- Se usó `DecimalField` para precios; no se usan floats para dinero.
- Los endpoints públicos de catálogo son `ReadOnlyModelViewSet`.
- Las rutas viven bajo `/api/catalog/` y usan `slug` como lookup público.
- Los filtros básicos se implementan en `get_queryset()` para evitar agregar `django-filter` antes de necesitarlo.
- `ProductImage` usa `ImageField` con media local para desarrollo; producción deberá migrar a almacenamiento externo.
- El Django Admin queda como primer panel operativo de catálogo.
- No se implementaron carrito, órdenes, pagos, login/JWT ni panel admin custom.
