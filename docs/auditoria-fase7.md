# Auditoría Fase 7 — Carrito Básico

## 1. Auditoría inicial

Después de Fase 6 el proyecto ya tenía catálogo, ficha individual de producto, leads y formularios reales. El cambio visual más reciente ajustó Casa Ámbar hacia una tienda boutique de piezas curadas, con referencia Axels para una experiencia ecommerce más directa.

`ProductCard` mostraba imagen, nombre, categoría, descripción, precio o cotización, CTA “Ver detalle” y CTA de cotización. No agregaba productos al carrito.

`ProductActions` en la ficha de producto mostraba CTAs hacia WhatsApp/cotización y convivía con `ProductInterestForm`. No existía intención de compra directa.

`Navbar` usaba rutas internas y menú móvil, pero no tenía botón de carrito. `MainLayout` montaba `Navbar`, contenido y `Footer`, sin overlays globales.

Los tipos de catálogo distinguían `ProductListItem` y `ProductDetail`, con `price`, `price_label` y `requires_quote`, suficientes para decidir si un producto puede entrar al carrito. Existían helpers como `routes`, `cn` y `whatsapp`, pero no había helpers de dinero, storage o normalización a producto de carrito.

Riesgos antes de implementar: agregar productos bajo cotización por error, guardar objetos grandes en `localStorage`, duplicar lógica de precio, romper el Navbar mobile, crear una experiencia que parezca checkout real sin tener pagos, y calcular totales frontend que luego no coincidan con backend.

Se decidió conservar backend, API, formularios y diseño base. La fase se limitó al frontend con Context API, drawer lateral, persistencia local y CTAs de intención de compra.

## 2. Plan técnico

La estrategia de estado global fue crear `CartContext` con `useReducer`, exponer acciones a través de `useCart` y montar `CartProvider` alrededor de la app.

La estructura del carrito guarda `CartProduct` mínimo: id, slug, nombre, precio, etiqueta, imagen, categoría y flag de cotización. No se guarda `ProductDetail` completo.

La persistencia en `localStorage` se encapsuló en `cartStorage.ts`, con `try/catch`, validación de arreglo y tolerancia a datos corruptos.

`CartDrawer` se montaría una sola vez en `MainLayout`, con overlay, cierre por botón, overlay y tecla Escape.

`Navbar` integraría `CartButton` visible en desktop y mobile.

`ProductCard` permitiría agregar productos con precio válido y mostrar cotización para productos sin precio o bajo cotización.

`ProductActions` usaría “Agregar al carrito” cuando el producto tenga precio y “Solicitar cotización” cuando requiera cotización.

Los productos `requires_quote=true` o sin precio válido quedarían fuera del carrito por regla de negocio.

Quedaron fuera intencionalmente: Stripe Checkout, órdenes backend, pagos, login/JWT, CRM avanzado, inventario avanzado, cupones, envíos, cálculo fiscal, persistencia backend, wishlist, deploy y panel admin custom.

## 3. Archivos creados

```txt
frontend/src/context/CartContext.tsx
frontend/src/hooks/useCart.ts
frontend/src/types/cart.ts
frontend/src/lib/cartStorage.ts
frontend/src/lib/formatMoney.ts
frontend/src/lib/cartProduct.ts
frontend/src/components/cart/CartDrawer.tsx
frontend/src/components/cart/CartItem.tsx
frontend/src/components/cart/CartSummary.tsx
frontend/src/components/cart/CartButton.tsx
frontend/src/components/cart/EmptyCart.tsx
docs/auditoria-fase7.md
```

## 4. Archivos modificados

```txt
frontend/src/main.tsx
frontend/src/components/layout/MainLayout.tsx
frontend/src/components/layout/Navbar.tsx
frontend/src/components/catalog/ProductCard.tsx
frontend/src/components/product/ProductActions.tsx
README.md
docs/architecture.md
docs/setup.md
```

## 5. Implementación

`CartContext` quedó con `items`, `isOpen`, `itemCount`, `subtotal` y acciones para abrir/cerrar/toggle, agregar, remover, actualizar cantidad, incrementar, decrementar y vaciar carrito.

`useCart` lee el contexto y lanza un error claro si se usa fuera de `CartProvider`.

`localStorage` quedó encapsulado en `cartStorage.ts` con `CART_STORAGE_KEY`, `loadCartItems`, `saveCartItems` y `clearCartItems`. Si el storage falla o está corrupto, la app no se rompe.

`CartDrawer` quedó como panel lateral derecho con `role="dialog"`, `aria-modal`, overlay, cierre por Escape, bloqueo de scroll del body y layout responsive.

`CartItem` muestra imagen o placeholder, nombre, categoría, precio unitario, cantidad editable, subtotal por item, botones +/-, y acción eliminar.

`CartSummary` muestra número de piezas, subtotal, nota operativa, “Checkout próximamente” deshabilitado, CTA WhatsApp y botón para vaciar carrito.

`CartButton` quedó integrado en Navbar con contador de piezas y `aria-label`.

`ProductCard` ahora muestra “Agregar” para productos con precio válido y “Cotizar” para productos bajo cotización. “Ver detalle” se conserva.

`ProductActions` ahora usa CTA principal “Agregar al carrito” si el producto tiene precio válido. Si requiere cotización, usa “Solicitar cotización” y no agrega al carrito.

Los productos `requires_quote` no entran al carrito porque `toCartProduct()` devuelve `null`. El subtotal se calcula desde `parseMoneyValue(product.price)`.

No se implementó Stripe, checkout real, órdenes ni pagos. El carrito representa intención de compra y selección local.

## 6. Validación

Comandos frontend:

```bash
cd frontend
npm install
npm run dev
npm run build
```

No existe script `npm run lint` en `frontend/package.json`, por lo que no se ejecutó lint.

Backend solo es necesario para cargar productos reales:

```bash
cd backend
.venv\Scripts\activate
python manage.py runserver
```

Validaciones esperadas:

- Frontend carga en `http://localhost:5173`.
- Navbar muestra botón de carrito.
- `CartDrawer` abre y cierra correctamente.
- Producto con precio se puede agregar al carrito.
- Producto sin precio o `requires_quote` no se agrega al carrito.
- Agregar producto existente incrementa cantidad.
- Se puede eliminar producto.
- Se puede incrementar/decrementar cantidad.
- Subtotal se calcula correctamente.
- Carrito persiste al refrescar página.
- Vaciar carrito limpia `localStorage`.
- `ProductCard` no rompe diseño.
- `ProductActions` no rompe diseño.
- `npm run build` termina sin errores.
- No hay imports rotos.

Validación ejecutada:

```bash
cd frontend
npm run build
```

Resultado: build correcto con `tsc --noEmit && vite build`.

## 7. Riesgos

- Carrito solo persiste en `localStorage`, no en backend.
- Subtotal frontend es provisional.
- No hay Stripe ni checkout todavía.
- No hay órdenes backend todavía.
- No hay validación de inventario real.
- No hay reserva de stock.
- `localStorage` puede ser limpiado por el usuario.
- Productos bajo cotización no entran al carrito por decisión de negocio.
- No hay impuestos/envío todavía.

## 8. Auditoría final

La Fase 7 queda implementada con carrito básico frontend, drawer lateral, contador en Navbar, persistencia local y acciones de carrito en catálogo y ficha de producto.

La calidad de código es adecuada para esta fase: estado global pequeño, helpers separados, componentes de carrito dedicados, normalización explícita de producto y reglas claras para productos bajo cotización.

La persistencia en `localStorage` está protegida con `try/catch` y validación básica. La integración con productos evita guardar objetos grandes y evita agregar productos sin precio válido.

Responsive y accesibilidad base están cubiertos con drawer mobile-first, botones táctiles, `role="dialog"`, `aria-modal`, labels de cantidad y botones con `aria-label`.

Pendientes: checkout real, órdenes backend, validación de inventario, reserva de stock, impuestos/envío, pruebas frontend automatizadas y cálculo autoritativo de totales en backend.

Recomendación para Fase 8: implementar Stripe Checkout con modelo `Order`, modelo `OrderItem`, endpoint `create-checkout-session`, integración con Stripe Checkout, páginas success/cancel, webhook de pago exitoso y guardado de orden pagada.

- [x] CartContext creado
- [x] useCart creado
- [x] Tipos de carrito creados
- [x] localStorage implementado de forma segura
- [x] CartDrawer creado
- [x] CartItem creado
- [x] CartSummary creado
- [x] CartButton creado
- [x] EmptyCart creado
- [x] Navbar integra carrito
- [x] ProductCard permite agregar productos con precio
- [x] ProductActions permite agregar productos con precio
- [x] Productos requires_quote no entran al carrito
- [x] Cantidades se pueden modificar
- [x] Productos se pueden eliminar
- [x] Subtotal se calcula correctamente
- [x] Carrito persiste al refrescar
- [x] Build frontend sin errores
- [x] No hay imports muertos
- [x] No se implementó funcionalidad fuera de alcance

## 9. Enunciado del commit

```txt
feat(cart): add basic shopping cart with drawer and persistence
```

Descripción breve:

```txt
- Add CartContext, useCart and localStorage persistence
- Add cart drawer, cart items, summary and navbar cart button
- Integrate add-to-cart actions in product cards and product detail
- Handle quote-only products outside the cart flow
- Add Fase 7 audit documentation
```
