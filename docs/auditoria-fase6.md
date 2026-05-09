# Auditoría Fase 6 — Leads y Cotizaciones

## 1. Auditoría inicial

Después de Fase 5 el proyecto tenía catálogo y ficha individual de producto conectados a la API real. El backend contaba con `apps.core` y `apps.catalog`, pero no existía app de leads, CRM ni modelo para capturar oportunidades comerciales.

El frontend tenía `ProductDetailPage` con galería, información técnica, CTAs, relacionados y JSON-LD. `CustomDesignSection` era principalmente editorial con CTA a WhatsApp. `NewsletterSection` seguía como contacto/newsletter visual sin envío real.

Los servicios API existentes eran `lib/api.ts`, `catalogApi.ts` y el helper de WhatsApp. No existía `leadsApi.ts`, tipos de leads ni componentes de formulario reutilizables.

Riesgos antes de implementar: pérdida de oportunidades comerciales al depender solo de WhatsApp, falta de persistencia de solicitudes, newsletter sin envío real, ausencia de validación backend para leads, ausencia de Admin operativo para seguimiento, y endpoint público nuevo sin CAPTCHA/rate limiting.

Se decidió conservar el sistema visual, `lib/api.ts`, `ProductDetailPage`, `CustomDesignSection` y `NewsletterSection`, refactorizando solo lo necesario para integrar formularios reales. En backend se creó una app dedicada `apps.leads` para no mezclar CRM con catálogo.

## 2. Plan técnico

El modelo planeado fue `Lead`, con `lead_type`, `status`, datos de contacto, mensaje, relación opcional a producto, snapshot del nombre del producto, ocasión, rango de presupuesto, método de contacto preferido, fuente y timestamps.

La API pública se diseñó como `POST /api/leads/` usando `APIView`, sin exponer listado ni detalle público. Las validaciones backend requerirían nombre, al menos email o teléfono, y mensaje para contacto general y diseño personalizado.

La notificación email se implementaría con `send_mail` y `EmailBackend` de consola por defecto en desarrollo. Un fallo de email no debía romper la creación del lead.

Django Admin mostraría leads con filtros, búsqueda, `status` editable en lista y fieldsets para operación real.

En frontend se crearían tipos `LeadPayload`/`LeadResponse`, servicio `createLead`, `LeadForm` reutilizable y wrappers `ProductInterestForm`, `CustomDesignForm` y `ContactForm`.

Las integraciones serían: formulario de interés en `ProductDetailPage`, formulario de diseño en `CustomDesignSection`, y contacto general reemplazando el newsletter visual en `NewsletterSection`.

Quedaron fuera intencionalmente: carrito, Stripe, órdenes, login/JWT, CRM avanzado, pipeline comercial, automatizaciones complejas, WhatsApp API real, newsletter real, deploy, panel admin custom, adjuntos, subida de imágenes, CAPTCHA y rate limiting.

## 3. Archivos creados

```txt
backend/apps/leads/__init__.py
backend/apps/leads/apps.py
backend/apps/leads/models.py
backend/apps/leads/admin.py
backend/apps/leads/serializers.py
backend/apps/leads/views.py
backend/apps/leads/urls.py
backend/apps/leads/services.py
backend/apps/leads/tests.py
backend/apps/leads/migrations/__init__.py
backend/apps/leads/migrations/0001_initial.py
frontend/src/types/leads.ts
frontend/src/services/leadsApi.ts
frontend/src/components/forms/FormField.tsx
frontend/src/components/forms/LeadForm.tsx
frontend/src/components/forms/ProductInterestForm.tsx
frontend/src/components/forms/CustomDesignForm.tsx
frontend/src/components/forms/ContactForm.tsx
docs/auditoria-fase6.md
```

## 4. Archivos modificados

```txt
backend/config/settings.py
backend/config/urls.py
backend/.env.example
frontend/src/components/ui/Button.tsx
frontend/src/pages/ProductDetailPage.tsx
frontend/src/components/sections/CustomDesignSection.tsx
frontend/src/components/sections/NewsletterSection.tsx
README.md
docs/architecture.md
docs/setup.md
```

## 5. Implementación

El modelo `Lead` quedó en `apps.leads.models` con choices para tipo, estado y método de contacto preferido. `product` es opcional y usa `SET_NULL`; `product_name_snapshot` conserva el nombre comercial aunque el producto cambie.

El Admin registra `Lead` con `list_display`, `list_filter`, `search_fields`, `readonly_fields`, `list_editable` para `status` y fieldsets organizados en datos del cliente, interés/producto, seguimiento y metadatos.

`LeadCreateSerializer` acepta datos públicos de creación, valida nombre, contacto mínimo y mensaje cuando aplica. No acepta `status`. En `create()` asigna `product_name_snapshot` si existe producto.

`POST /api/leads/` quedó implementado con `LeadCreateAPIView`. Solo permite creación pública; `GET /api/leads/` devuelve método no permitido y no expone listado.

El envío básico de email vive en `send_lead_notification(lead)`. Usa `LEADS_NOTIFICATION_EMAIL`, `DEFAULT_FROM_EMAIL` y `EMAIL_BACKEND`. Si el email falla, la vista captura la excepción y mantiene la creación del lead.

En frontend, `LeadForm` centraliza campos, validación, submit, estados `idle/submitting/success/error` y mensajes. `FormField` evita duplicar markup de inputs y textarea.

`ProductInterestForm` se integró en `ProductDetailPage` con `lead_type=PRODUCT_INTEREST`, `product=product.id`, `source=product_detail` y mensaje prellenado con el nombre de la pieza.

`CustomDesignForm` se integró en `CustomDesignSection`, manteniendo los pasos editoriales y agregando captura real de ocasión, presupuesto y mensaje.

`ContactForm` reemplazó el newsletter visual en `NewsletterSection` para convertir esa sección en captura real de contacto general.

La seguridad básica se cuidó evitando listado público, ignorando `status` del cliente, validando en serializer y sin hardcodear emails internos en frontend. La validación frontend mejora UX, pero la validación autoritativa queda en backend.

## 6. Validación

Comandos backend:

```bash
cd backend
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py test
python manage.py runserver
```

Comandos frontend:

```bash
cd frontend
npm install
npm run dev
npm run build
```

No existe script `npm run lint` en `frontend/package.json`, por lo que no se ejecutó lint.

Validaciones API esperadas:

- Backend responde en `/api/health/`.
- `POST /api/leads/` crea lead válido.
- `POST /api/leads/` rechaza lead sin name.
- `POST /api/leads/` rechaza lead sin email y sin phone.
- No existe listado público de leads.
- Django Admin muestra Leads.
- Email en consola se genera en desarrollo.

Payload ejemplo para validar:

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

Validaciones frontend esperadas:

- Formulario “Me interesa esta pieza” renderiza en `/producto/:slug`.
- Formulario diseño personalizado renderiza correctamente.
- Formulario contacto general renderiza correctamente.
- Validaciones frontend funcionan.
- Submit exitoso muestra mensaje success.
- Error de API muestra mensaje error.
- Botón se deshabilita mientras envía.
- `npm run build` termina sin errores.

Validación ejecutada:

```bash
cd backend
.venv\Scripts\python.exe manage.py makemigrations leads
.venv\Scripts\python.exe manage.py migrate
.venv\Scripts\python.exe manage.py test
```

Resultado: migración `leads.0001_initial` creada/aplicada y 12 pruebas backend correctas.

```bash
cd frontend
npm run build
```

Resultado: build correcto con `tsc --noEmit && vite build`.

## 7. Riesgos

- Endpoint público de leads aún no tiene CAPTCHA.
- Sin rate limiting todavía.
- Email usa backend de consola en desarrollo.
- No hay CRM avanzado todavía.
- No hay autenticación de panel custom.
- Validación telefónica aún es flexible.
- No hay integración WhatsApp API real.
- No hay automatización de seguimiento.
- SQLite sigue siendo temporal.

## 8. Auditoría final

La Fase 6 queda implementada con captura real de leads en backend y frontend. Casa Ámbar ya puede recibir solicitudes desde producto, diseño personalizado y contacto general antes de tener carrito o pagos.

La calidad de código es adecuada para esta fase: la app `leads` separa responsabilidades, el endpoint público es create-only, el serializer concentra validaciones y los formularios frontend reutilizan una base común.

El modelo `Lead` cubre los tres flujos actuales y deja un estado operativo para seguimiento en Django Admin. La API pública no expone listado ni detalle de leads. El email básico está desacoplado en `services.py` y no rompe la creación si falla.

Los formularios tienen estados visibles, validación local, labels, autocomplete, botón disabled durante envío y mensajes de error/éxito. El responsive conserva el estilo boutique de Casa Ámbar.

Pendientes: CAPTCHA, rate limiting, validación telefónica más estricta si se requiere, emails productivos, pipeline CRM, métricas de conversión, pruebas frontend automatizadas y migración futura a PostgreSQL.

Recomendación para Fase 7: implementar carrito básico con estado global del carrito, agregar producto, eliminar producto, cambiar cantidad, cart drawer lateral, persistencia en localStorage y resumen de compra, sin Stripe todavía.

- [x] App leads creada o validada
- [x] Modelo Lead creado
- [x] Migraciones creadas
- [x] Lead registrado en Django Admin
- [x] Serializer de creación creado
- [x] Endpoint POST /api/leads/ creado
- [x] Listado público de leads no expuesto
- [x] Notificación básica por email implementada
- [x] Tests backend mínimos creados
- [x] Tipos frontend de leads creados
- [x] Servicio leadsApi creado
- [x] LeadForm reutilizable creado
- [x] ProductInterestForm creado
- [x] CustomDesignForm creado
- [x] ContactForm creado
- [x] Integración en ProductDetailPage realizada
- [x] Integración en CustomDesignSection realizada
- [x] Integración de contacto/newsletter realizada
- [x] Estados loading/success/error implementados
- [x] Validaciones frontend implementadas
- [x] Validaciones backend implementadas
- [x] Build frontend sin errores
- [x] Tests backend pasan o se documenta motivo
- [x] No se implementó funcionalidad fuera de alcance

## 9. Enunciado del commit

```txt
feat(leads): add lead capture forms and API
```

Descripción breve:

```txt
- Add Lead model, admin, serializer and public create endpoint
- Add basic email notification for new leads
- Add reusable frontend lead forms for product interest, custom design and contact
- Integrate lead capture into product detail and home sections
- Add validation, states and Fase 6 audit documentation
```
