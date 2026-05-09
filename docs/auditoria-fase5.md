# Auditoría Fase 5 — Página Individual de Producto

## 1. Auditoría inicial

Después de Fase 4 el frontend ya tenía React Router con rutas `/`, `/catalogo`, `/colecciones` y `/colecciones/:categorySlug`. `App.tsx` funcionaba como router limpio dentro de `MainLayout`.

`ProductCard` y `ProductGrid` ya existían para catálogo y relacionados potenciales. `ProductCard` mostraba producto, precio o etiqueta comercial, CTA de consulta y un CTA de detalle deshabilitado. `ProductGrid` renderizaba cards y estado vacío.

`catalogApi.ts` ya centralizaba categorías, colecciones, productos y `getProductBySlug(slug)`. `types/catalog.ts` ya tenía `ProductDetail` alineado con el serializer DRF de Fase 3, incluyendo `images`, `collections`, `material`, `stone`, `size`, `sku`, `stock`, `meta_title` y `meta_description`.

El endpoint detail de producto existía como `GET /api/catalog/products/{slug}/` y el serializer real devolvía categoría como objeto, colecciones como arreglo e imágenes con `image_url`.

Riesgos antes de implementar: CTA de detalle sin ruta real, ausencia de galería, ausencia de JSON-LD, relacionados no implementados, número de WhatsApp todavía placeholder, imágenes locales de desarrollo y SEO limitado por React/Vite sin SSR.

Se decidió conservar el cliente API, los tipos existentes, el sistema visual premium y `ProductGrid`. Se refactorizó solo lo necesario: `ProductCard` para enlazar a detalle, `routes.ts` para helper de producto, y `catalogApi.ts` para relacionados básicos.

## 2. Plan técnico

Se planificó agregar la ruta `/producto/:slug` y crear `ProductDetailPage` como componente de composición, no como componente visual gigante.

Los componentes planeados fueron `ProductGallery`, `ProductInfo`, `ProductTechnicalDetails`, `ProductActions`, `RelatedProducts` y `ProductJsonLd`.

La galería usaría la imagen primaria primero, thumbnails accesibles y placeholder premium si no hay imágenes. No se usarían carruseles ni librerías externas.

Los CTAs quedarían orientados a operación asistida: botón principal para consultar precio o solicitar compra y botón WhatsApp funcional. No se integraría Stripe ni carrito.

Los productos relacionados se resolverían por categoría con `getProducts({ category })`, excluyendo el producto actual y limitando resultados.

El JSON-LD Product se generaría con `JSON.stringify`, usando solo datos reales disponibles: nombre, descripción, SKU si existe, imágenes si existen, marca y oferta básica.

Quedaron fuera intencionalmente: carrito real, Stripe Checkout, órdenes, login, CRM, wishlist, reviews reales, inventario avanzado, recomendador avanzado, deploy y panel admin custom.

## 3. Archivos creados

```txt
frontend/src/pages/ProductDetailPage.tsx
frontend/src/components/product/ProductGallery.tsx
frontend/src/components/product/ProductInfo.tsx
frontend/src/components/product/ProductTechnicalDetails.tsx
frontend/src/components/product/ProductActions.tsx
frontend/src/components/product/RelatedProducts.tsx
frontend/src/components/product/ProductJsonLd.tsx
docs/auditoria-fase5.md
```

## 4. Archivos modificados

```txt
frontend/src/App.tsx
frontend/src/components/catalog/ProductCard.tsx
frontend/src/services/catalogApi.ts
frontend/src/lib/routes.ts
README.md
docs/architecture.md
docs/setup.md
```

## 5. Implementación

`/producto/:slug` quedó registrada en `App.tsx` y renderiza `ProductDetailPage`.

`ProductDetailPage` lee `slug` con `useParams`, consulta `getProductBySlug(slug)`, carga relacionados por `product.category.slug`, maneja loading/error/empty y compone galería, información, acciones, detalles técnicos, relacionados y JSON-LD.

`ProductGallery` ordena imágenes colocando primero la primaria, muestra imagen principal, thumbnails accesibles con `aria-label` y `aria-pressed`, y usa placeholder premium cuando no hay imágenes.

`ProductInfo` muestra categoría, H1 único con nombre del producto, descripción corta, descripción comercial y precio o `price_label`. Si `requires_quote` es verdadero, muestra badge “Bajo cotización”.

`ProductTechnicalDetails` muestra material, piedra, talla/medida, SKU, disponibilidad y colecciones. Los campos vacíos no se renderizan. La disponibilidad se expresa como “Disponible” si `stock > 0` y como “Bajo pedido o consultar disponibilidad” si no hay stock.

`ProductActions` incluye CTA principal y CTA WhatsApp, ambos orientados a operación asistida mediante `buildWhatsAppLink`. El texto principal cambia entre “Consultar precio” y “Solicitar compra” según `requires_quote`. No procesa pagos.

`RelatedProducts` renderiza “También te puede interesar” usando `ProductGrid` cuando hay relacionados. Si no hay relacionados, no renderiza la sección.

`ProductJsonLd` renderiza `<script type="application/ld+json">` con schema Product básico, marca Casa Ámbar, imágenes cuando existen, SKU cuando existe y oferta básica en MXN. Si no hay precio, omite `offers.price`.

Los estados `loading`, `error` y `empty` usan `CatalogState`. La accesibilidad se cuidó con H1 único, alt text, botones con texto claro, foco visible y thumbnails accionables por teclado. El responsive usa grids mobile-first.

## 6. Validación

Comandos frontend:

```bash
cd frontend
npm install
npm run dev
npm run build
```

No existe script `npm run lint` en `frontend/package.json`, por lo que no se ejecutó lint.

Comandos backend si se valida integración:

```bash
cd backend
.venv\Scripts\activate
python manage.py runserver
```

Validaciones esperadas:

- Frontend carga en `http://localhost:5173`.
- `/producto/:slug` carga producto existente.
- Producto inexistente muestra estado amigable.
- Galería muestra imágenes o placeholder.
- Información técnica no muestra campos vacíos.
- CTA WhatsApp genera URL correctamente.
- `ProductCard` enlaza a `/producto/:slug`.
- Productos relacionados se muestran si existen.
- JSON-LD se renderiza en la página.
- `npm run build` termina sin errores.
- No hay imports rotos.

Validaciones API esperadas:

- Backend responde en `/api/health/`.
- Backend responde en `/api/catalog/products/`.
- Backend responde en `/api/catalog/products/{slug}/`.

Validación ejecutada:

```bash
cd frontend
npm run build
```

Resultado: build correcto con `tsc --noEmit && vite build`.

También se ejecutó:

```bash
cd backend
.venv\Scripts\python.exe manage.py test
```

Resultado: 5 pruebas ejecutadas correctamente, sin issues de system check.

## 7. Riesgos

- No hay Stripe todavía, por lo que Comprar no procesa pagos.
- Número WhatsApp puede seguir como placeholder.
- Imágenes locales no son óptimas para producción.
- React/Vite no ofrece SSR nativo para SEO completo.
- Productos relacionados son básicos por categoría.
- No hay reviews reales todavía.
- No hay carrito ni órdenes todavía.
- Sin pruebas automatizadas frontend todavía.

## 8. Auditoría final

La Fase 5 queda implementada con ficha individual de producto conectada a API real, galería, información comercial, detalles técnicos, CTAs, relacionados y JSON-LD.

La calidad del código se mantiene adecuada: `ProductDetailPage` compone componentes pequeños, el fetch sigue centralizado en `catalogApi.ts`, los tipos siguen alineados al serializer y no se agregó estado global ni dependencias nuevas.

El routing quedó actualizado con `/producto/:slug`. La integración API usa slug codificado en `getProductBySlug` y relacionados por categoría. Los componentes respetan el sistema visual existente y mantienen responsive base.

La accesibilidad básica incluye H1 único, alt text, estados legibles, foco visible y thumbnails con `aria-label`. El SEO básico incluye JSON-LD Product, contenido visible descriptivo y alt text, con la limitación de no tener SSR.

Pendientes: Stripe/carrito/órdenes, leads formales, reviews, SEO SSR o prerendering, pruebas automatizadas frontend y almacenamiento productivo de imágenes.

Recomendación para Fase 6: implementar leads y cotizaciones con formulario “Me interesa esta pieza”, formulario de diseño personalizado, modelo `Lead` en Django, API para guardar leads, vista de leads en Django Admin y notificación básica por email.

- [x] Ruta /producto/:slug implementada
- [x] ProductDetailPage creada
- [x] ProductGallery creada
- [x] ProductInfo creada
- [x] ProductTechnicalDetails creada
- [x] ProductActions creada
- [x] RelatedProducts creada
- [x] ProductJsonLd creado
- [x] ProductCard enlaza a detalle
- [x] getProductBySlug validado
- [x] Productos relacionados implementados
- [x] CTA WhatsApp implementado
- [x] Estados loading/error/empty implementados
- [x] Responsive base validado
- [x] Accesibilidad básica revisada
- [x] Build frontend sin errores
- [x] No hay imports muertos
- [x] No se implementó funcionalidad fuera de alcance

## 9. Enunciado del commit

```txt
feat(product): add premium product detail page
```

Descripción breve:

```txt
- Add /producto/:slug route and product detail page
- Add product gallery, technical details, actions and related products
- Add WhatsApp CTA and basic Product JSON-LD
- Update ProductCard navigation to product detail
- Add Fase 5 audit documentation
```
