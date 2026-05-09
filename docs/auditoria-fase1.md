# Auditoría Fase 1 — Identidad Visual y Frontend Base

## 1. Auditoría inicial

Estado encontrado después de Fase 0:

- El proyecto tenía frontend, backend, documentación inicial y healthcheck operativo.
- El frontend estaba concentrado principalmente en `App.tsx`.
- Existía `HealthCheck.tsx` conectado a `VITE_API_BASE_URL`.
- No había sistema de componentes, layout global ni estructura de secciones.

Estado de Tailwind:

- Tailwind estaba configurado y funcional.
- Los tokens eran mínimos: `amberGold`, `warmBlack` e `ivory`.
- Faltaba una paleta completa Casa Ámbar, tipografías de marca y utilidades visuales reutilizables.

Estado de `App.tsx`:

- Contenía header, hero, healthcheck y footer en un solo archivo.
- Era suficiente para Fase 0, pero no escalaba bien hacia catálogo o páginas futuras.

Estado de estructura de componentes:

- Solo existía `frontend/src/components/HealthCheck.tsx`.
- No existían carpetas `layout`, `sections`, `ui` ni constantes compartidas.

Riesgos antes de implementar:

- Duplicación futura de estilos.
- Acoplamiento visual en `App.tsx`.
- Falta de navegación responsive.
- Falta de base reusable para botones, cards y contenedores.
- Riesgo de avanzar a catálogo sin una identidad visual estable.

Qué se decidió refactorizar:

- Extraer layout semántico a `MainLayout`.
- Crear `Navbar` y `Footer`.
- Crear componentes UI base.
- Crear secciones editoriales para Home.
- Mantener `HealthCheck` con menor protagonismo visual.

## 2. Plan técnico

Sistema visual a construir:

- Paleta Casa Ámbar en Tailwind.
- Tipografías diferenciadas para titulares y texto.
- Base cálida, sobria, editorial y responsive.
- Estilo inspirado en lujo discreto: espacio visual, composición limpia y jerarquía tipográfica.

Componentes base planeados:

- `Button`
- `Card`
- `Container`
- `SectionHeader`
- `Navbar`
- `Footer`
- `MainLayout`

Layout general:

- `Navbar` sticky en el encabezado.
- `main` con secciones de Home.
- `Footer` con navegación, contacto placeholder, horarios y ubicación.

Enfoque responsive:

- Mobile-first.
- Menú mobile sin dependencias externas.
- Grid responsive para hero, colecciones, historia y beneficios.
- Estados hover/focus accesibles.

Qué se dejó fuera intencionalmente:

- Catálogo real conectado al backend.
- Productos reales.
- Carrito.
- Stripe.
- Login.
- CRM.
- Blog.
- Deploy.
- Animaciones pesadas.

## 3. Archivos creados

- `frontend/src/components/layout/Navbar.tsx`
- `frontend/src/components/layout/Footer.tsx`
- `frontend/src/components/layout/MainLayout.tsx`
- `frontend/src/components/ui/Button.tsx`
- `frontend/src/components/ui/Card.tsx`
- `frontend/src/components/ui/Container.tsx`
- `frontend/src/components/ui/SectionHeader.tsx`
- `frontend/src/components/sections/HeroSection.tsx`
- `frontend/src/components/sections/CollectionsPreview.tsx`
- `frontend/src/components/sections/FeaturedStory.tsx`
- `frontend/src/components/sections/TrustSection.tsx`
- `frontend/src/lib/cn.ts`
- `frontend/src/constants/site.ts`
- `docs/auditoria-fase1.md`

## 4. Archivos modificados

- `frontend/src/App.tsx`
- `frontend/src/index.css`
- `frontend/src/components/HealthCheck.tsx`
- `frontend/tailwind.config.js`
- `frontend/index.html`
- `README.md`
- `docs/architecture.md`
- `docs/setup.md`

## 5. Implementación

Cómo quedó el layout:

- `MainLayout` envuelve `Navbar`, `main` y `Footer`.
- `App.tsx` solo compone secciones: Hero, colecciones, historia, beneficios y healthcheck técnico.

Cómo quedó el sistema visual:

- Paleta Casa Ámbar definida en Tailwind como `amber.black`, `amber.espresso`, `amber.gold`, `amber.softGold`, `amber.cream`, `amber.ivory`, `amber.stone`, `amber.muted` y `amber.line`.
- Tipografías base: Cormorant Garamond para titulares e Inter para cuerpo.
- Se agregaron `shadow.premium` y `rounded.brand`.

Qué componentes se crearon:

- `Button` con variantes `primary`, `secondary` y `ghost`, tamaños `sm`, `md` y `lg`.
- `Card` para bloques editoriales y colecciones.
- `Container` para ancho máximo y padding responsive.
- `SectionHeader` para jerarquía consistente de secciones.
- `Navbar` responsive con menú mobile accesible.
- `Footer` responsive con información institucional.

Cómo se resolvió responsive:

- Se usaron grids mobile-first.
- El menú desktop aparece desde `lg`.
- El menú mobile usa botón con `aria-label` y `aria-expanded`.
- Las secciones cambian de una columna a dos o tres columnas según viewport.

Cómo se integró HealthCheck:

- Se mantuvo la consulta a `${VITE_API_BASE_URL}/health/`.
- Se movió a una sección técnica discreta al final de la Home.
- Se ajustó visualmente a la paleta Casa Ámbar.

Qué decisiones de diseño se tomaron:

- No se usaron imágenes reales todavía para evitar contenido falso de producto.
- El hero usa un bloque visual editorial abstracto como placeholder elegante.
- Se priorizó navegación limpia, contraste razonable y composición sobria.

## 6. Validación

Comandos:

```bash
cd frontend
npm install
npm run dev
npm run build
```

Si existe lint:

```bash
npm run lint
```

Validar backend si HealthCheck depende de API:

```bash
cd backend
.venv\Scripts\activate
python manage.py runserver
```

Validaciones esperadas:

- Frontend carga en `http://localhost:5173`.
- Home muestra layout premium.
- Navbar responsive funciona.
- Footer renderiza correctamente.
- HealthCheck consulta backend.
- `npm run build` termina sin errores.
- No hay imports rotos.

Validación ejecutada:

- `npm run build`: completado sin errores. TypeScript, Tailwind y Vite compilaron correctamente.
- `npm audit --audit-level=moderate`: 0 vulnerabilidades.
- `GET http://127.0.0.1:8000/api/health/`: respondió `status=ok`, `service=casa-ambar-api`, `phase=fase-0`.
- `GET http://127.0.0.1:5173`: respondió HTTP 200.
- No existe script `lint` en `package.json`, por lo que no se ejecutó lint automatizado.

Nota operativa: PowerShell muestra warnings del perfil local `PSReadLine`, pero no afectaron la validación del proyecto.

## 7. Riesgos

- Aún no hay imágenes reales de producto.
- Aún no hay catálogo backend.
- SEO completo queda pendiente.
- Tipografías externas pueden afectar performance si no se optimizan.
- Estilo visual pendiente de validación con cliente.
- Sin pruebas automatizadas de UI todavía.
- El menú mobile no tiene pruebas automatizadas de interacción.

## 8. Auditoría final

Estado final de la fase:

- Fase 1 completada con sistema visual base Casa Ámbar.
- Home inicial premium construida con secciones editoriales y placeholders.
- HealthCheck sigue integrado y validado contra backend local.
- No se implementó catálogo real, carrito, Stripe, login, CRM ni deploy.

Evaluación de calidad de código:

- Componentes separados por responsabilidad.
- `App.tsx` limpio.
- No se agregó lógica de negocio prematura.
- No se implementó catálogo real ni pagos.

Revisión de limpieza:

- Build final ejecutado sin errores.
- No se detectaron imports rotos.
- `App.tsx` quedó como composición limpia de secciones.
- La lógica interactiva queda limitada al menú mobile y al healthcheck.

Revisión responsive:

- Estructura mobile-first implementada.

Revisión accesibilidad básica:

- Menú mobile con `aria-label` y `aria-expanded`.
- Foco visible global configurado.
- Links y botones mantienen estados hover/focus.

Pendientes:

- Validación visual con cliente.
- Imágenes reales o dirección fotográfica.
- Pruebas UI cuando existan flujos interactivos reales.

Recomendación para Fase 2:

- Fase 2 — Catálogo base y modelo de productos: productos, categorías, colecciones, imágenes, serializers, endpoints y pruebas API mínimas.

Checklist obligatorio:

- [x] Tailwind configurado o validado
- [x] Paleta Casa Ámbar definida
- [x] Tipografías base definidas
- [x] Layout general creado
- [x] Navbar creado
- [x] Footer creado
- [x] Button component creado
- [x] Card component creado
- [x] Container component creado
- [x] SectionHeader component creado
- [x] Home inicial premium creada
- [x] Responsive base validado
- [x] HealthCheck integrado
- [x] Build frontend sin errores
- [x] No hay imports muertos
- [x] No se implementó funcionalidad fuera de alcance
