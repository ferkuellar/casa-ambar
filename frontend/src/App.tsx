import { Route, Routes } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import { routes } from "./lib/routes";
import { CatalogPage } from "./pages/CatalogPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CollectionsPage } from "./pages/CollectionsPage";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";


export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.catalog} element={<CatalogPage />} />
        <Route path={routes.collections} element={<CollectionsPage />} />
        <Route path="/colecciones/:categorySlug" element={<CategoryPage />} />
        <Route path="/producto/:slug" element={<ProductDetailPage />} />
      </Routes>
    </MainLayout>
  );
}
