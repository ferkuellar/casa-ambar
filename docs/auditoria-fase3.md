# Auditoría Fase 3 — Catálogo Base y Modelo de Productos

## 1. Auditoría inicial

Estado encontrado después de Fase 2:

- Frontend con Home premium completa, data mock local y documentación de Fase 2.
- Backend Django base con app `core`, endpoint `/api/health/`, DRF y CORS configurados.
- No existía app de catálogo, modelos de producto, serializers, viewsets ni rutas de catálogo.

Estado del backend Django:

- Proyecto `config` operativo.
- SQLite local ya configurado.
- `manage.py check` funcionaba antes de introducir catálogo.

Estado de DRF:

- `rest_framework` estaba instalado y declarado en `INSTALLED_APPS`.
- Configuración base de renderers/parsers JSON activa.

Estado de CORS:

- `django-cors-headers` estaba instalado y configurado.
- `CORS_ALLOWED_ORIGINS` se lee desde variable de entorno.
- No se modificó la política CORS en esta fase.

Estado de apps existentes:

- Solo existía `apps.core`.
- No había apps `products`, `categories` o similares, por lo que se creó `apps.catalog`.

Riesgos antes de implementar:

- Mezclar catálogo con `core` habría generado acoplamiento temprano.
- `ImageField` requiere Pillow.
- Media local no es una solución productiva.
- Endpoints públicos deben evitar escritura.
- SQLite sigue siendo temporal.

Qué se decidió refactorizar o conservar:

- Se conservó `core` y `/api/health/`.
- Se agregó `catalog` como app separada.
- Se agregó `MEDIA_URL` y `MEDIA_ROOT` para desarrollo.
- Se agregó Pillow a `requirements.txt` porque `ProductImage.image` usa `ImageField`.

## 2. Plan técnico

Modelos planeados:

- `Category`
- `Collection`
- `Product`
- `ProductImage`

Relación entre modelos:

- `Product.category` usa `ForeignKey` hacia `Category`.
- `Product.collections` usa `ManyToManyField` hacia `Collection`.
- `ProductImage.product` usa `ForeignKey` hacia `Product` con `related_name="images"`.

Enfoque de serializers:

- Serializers explícitos para categorías, colecciones e imágenes.
- `ProductListSerializer` ligero para listados.
- `ProductDetailSerializer` completo para detalle por slug.
- `primary_image` se calcula desde imagen primaria o primera imagen disponible.

Enfoque de ViewSets:

- `ReadOnlyModelViewSet` para endpoints públicos.
- `lookup_field = "slug"`.
- Filtros simples en `get_queryset()` sin agregar `django-filter`.

Rutas API:

- `GET /api/catalog/categories/`
- `GET /api/catalog/categories/{slug}/`
- `GET /api/catalog/collections/`
- `GET /api/catalog/collections/{slug}/`
- `GET /api/catalog/products/`
- `GET /api/catalog/products/{slug}/`

Alcance explícito:

- Catálogo base, admin Django, serializers, viewsets, rutas, migración y tests mínimos.

Qué se dejó fuera intencionalmente:

- Carrito.
- Stripe.
- Órdenes.
- Login/JWT.
- CRM.
- Blog.
- Deploy.
- Panel admin custom en React.
- Cloudinary/S3.
- Inventario avanzado.
- Cupones.
- Checkout.

## 3. Archivos creados

- `backend/apps/catalog/__init__.py`
- `backend/apps/catalog/apps.py`
- `backend/apps/catalog/models.py`
- `backend/apps/catalog/admin.py`
- `backend/apps/catalog/serializers.py`
- `backend/apps/catalog/views.py`
- `backend/apps/catalog/urls.py`
- `backend/apps/catalog/tests.py`
- `backend/apps/catalog/migrations/__init__.py`
- `backend/apps/catalog/migrations/0001_initial.py`
- `docs/auditoria-fase3.md`

## 4. Archivos modificados

- `backend/config/settings.py`
- `backend/config/urls.py`
- `backend/requirements.txt`
- `README.md`
- `docs/architecture.md`
- `docs/setup.md`

## 5. Implementación

Cómo quedaron los modelos:

- `Category`: nombre, slug único, descripción, orden, activo y timestamps.
- `Collection`: nombre, slug único, descripción, hero text, destacado, orden, activo y timestamps.
- `Product`: categoría, colecciones, nombre, slug único, descripciones, material, piedra, talla, precios con `DecimalField`, SKU opcional único, stock no negativo, destacado, activo, requiere cotización y campos SEO.
- `ProductImage`: imagen local, alt text, orden, primaria, relación a producto y timestamps.

Cómo quedó el Django Admin:

- Categorías y colecciones con búsqueda, filtros y slug prepopulado.
- Productos con filtros por categoría, colecciones, destacado, cotización y activo.
- `ProductImageInline` dentro de producto.
- `ProductImageAdmin` registrado para revisión directa de imágenes.

Cómo quedaron serializers:

- `CategorySerializer`
- `CollectionSerializer`
- `ProductImageSerializer`
- `ProductListSerializer`
- `ProductDetailSerializer`

Cómo quedaron viewsets:

- `CategoryViewSet`
- `CollectionViewSet`
- `ProductViewSet`

Todos son de solo lectura pública.

Cómo quedaron rutas API:

- `apps.catalog.urls` usa `DefaultRouter`.
- `config.urls` incluye `path("api/catalog/", include("apps.catalog.urls"))`.
- `/api/health/` se conserva.

Cómo se configuró media en desarrollo:

- `MEDIA_URL = "media/"`
- `MEDIA_ROOT = BASE_DIR / "media"`
- `config.urls` sirve media solo cuando `DEBUG=True`.

Cómo se validó CORS/DRF:

- DRF se validó con serializers, viewsets, router, tests API y endpoints HTTP.
- CORS no fue modificado.

Decisiones de diseño técnico:

- No se agregó `django-filter` para mantener dependencias mínimas.
- Se usa `PROTECT` en categoría para evitar borrar categorías con productos asociados.
- Se usa `CASCADE` en imágenes porque dependen del producto.
- Se usa `distinct()` en productos para evitar duplicados al filtrar por colecciones.

## 6. Validación

Comandos:

```bash
cd backend
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py test
python manage.py runserver
```

Validaciones esperadas:

- `/api/health/` responde 200.
- `/api/catalog/categories/` responde 200.
- `/api/catalog/collections/` responde 200.
- `/api/catalog/products/` responde 200.
- `/api/catalog/products/?featured=true` responde 200.
- `/api/catalog/products/{slug}/` responde 200 si existe producto.
- Django Admin muestra Category, Collection, Product y ProductImage.
- Tests mínimos pasan.

Validación ejecutada:

- `pip install -r requirements.txt`: OK. Instaló Pillow para `ImageField`.
- `python manage.py makemigrations catalog`: OK. Creó `0001_initial.py`.
- `python manage.py check`: OK, sin issues.
- `python manage.py migrate --noinput`: OK.
- `python manage.py test`: OK, 5 tests pasan.
- Datos demo mínimos locales creados con Django shell para validación HTTP.
- `GET /api/health/`: OK, `status=ok`.
- `GET /api/catalog/categories/`: OK, 1 registro local.
- `GET /api/catalog/collections/`: OK, 1 registro local.
- `GET /api/catalog/products/`: OK, 1 registro local.
- `GET /api/catalog/products/?featured=true`: OK, 1 registro local.
- `GET /api/catalog/products/anillo-aurora/`: OK, detalle por slug.

Nota operativa:

- PowerShell muestra warnings del perfil local `PSReadLine`, pero no afectaron la validación.
- Una validación HTTP paralela tuvo una carrera de proceso local; se repitió secuencialmente y fue correcta.

## 7. Riesgos

- SQLite sigue siendo temporal.
- Media local no es adecuada para producción.
- Sin autenticación para administración fuera de Django Admin.
- Endpoints públicos son solo lectura por ahora.
- Sin paginación avanzada todavía.
- Sin búsqueda avanzada todavía.
- Sin integración frontend real todavía.
- Sin Cloudinary/S3 todavía.
- Sin control avanzado de inventario.
- Datos demo locales no son fixture versionado.
- No hay permisos de escritura API porque el panel operativo será Django Admin.

## 8. Auditoría final

Estado final de la fase:

- Fase 3 completada con app `catalog`, modelos, admin, serializers, viewsets, rutas, migración y tests mínimos.

Evaluación de calidad de código:

- Modelos claros y separados.
- Serializers explícitos.
- ViewSets simples.
- API pública solo lectura.
- No se implementó funcionalidad fuera de alcance.

Revisión de modelos:

- Slugs únicos.
- Precios con `DecimalField`.
- Stock no negativo con `PositiveIntegerField`.
- Relaciones con `related_name` claros.

Revisión de serializers:

- Listado de producto ligero.
- Detalle de producto completo.
- Imágenes serializadas con URL absoluta cuando hay request.

Revisión de endpoints:

- Rutas bajo `/api/catalog/`.
- Lookup por slug.
- Filtros básicos implementados por category, collection, featured, active y requires_quote.

Revisión de admin:

- Modelos registrados.
- Slugs prepopulados.
- Filtros y búsqueda útiles.
- Inline de imágenes en producto.

Revisión de pruebas:

- Tests de modelos y API creados.
- 5 tests pasan.

Pendientes:

- Integrar catálogo real en frontend.
- Definir carga definitiva de imágenes.
- Agregar paginación y búsqueda cuando el catálogo crezca.
- Migrar a PostgreSQL en fase posterior.
- Definir fixture o seed formal si se requiere demo reproducible.

Recomendación para Fase 4:

- Fase 4 — Integración de catálogo en frontend: consumir API desde React, mostrar catálogo real, página por categoría, página de producto y estados loading/error/empty.

Checklist obligatorio:

- [x] App catalog creada o validada
- [x] Modelo Category creado
- [x] Modelo Collection creado
- [x] Modelo Product creado
- [x] Modelo ProductImage creado
- [x] Migraciones creadas
- [x] Modelos registrados en Django Admin
- [x] Serializers creados
- [x] ViewSets creados
- [x] Rutas API creadas
- [x] Filtros básicos implementados
- [x] Media configurada para desarrollo
- [x] Tests mínimos creados
- [x] Tests pasan o se documenta motivo
- [x] DRF validado
- [x] CORS no fue roto
- [x] No se implementó funcionalidad fuera de alcance

## 9. Enunciado del commit

```txt
feat(catalog): add base product catalog API and admin models
```

Descripción breve:

- Add Category, Collection, Product and ProductImage models
- Register catalog models in Django Admin
- Add DRF serializers, read-only viewsets and catalog routes
- Add basic API tests and Fase 3 audit documentation
