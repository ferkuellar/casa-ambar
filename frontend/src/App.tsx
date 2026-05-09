import { HealthCheck } from "./components/HealthCheck";
import { MainLayout } from "./components/layout/MainLayout";
import { CollectionsSection } from "./components/sections/CollectionsSection";
import { CustomDesignSection } from "./components/sections/CustomDesignSection";
import { FeaturedProductsSection } from "./components/sections/FeaturedProductsSection";
import { HeroSection } from "./components/sections/HeroSection";
import { NewsletterSection } from "./components/sections/NewsletterSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { TrustSection } from "./components/sections/TrustSection";
import { WhatsAppCTASection } from "./components/sections/WhatsAppCTASection";
import { Container } from "./components/ui/Container";
import { SectionHeader } from "./components/ui/SectionHeader";


export default function App() {
  return (
    <MainLayout>
      <HeroSection />
      <CollectionsSection />
      <FeaturedProductsSection />
      <CustomDesignSection />
      <TrustSection />
      <TestimonialsSection />
      <WhatsAppCTASection />
      <NewsletterSection />
      <section className="border-t border-amber-line bg-amber-ivory py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <SectionHeader
              eyebrow="Estado técnico"
              title="Base conectada"
              description="La experiencia visual queda lista para crecer sobre la API creada en Fase 0."
            />
            <HealthCheck />
          </div>
        </Container>
      </section>
    </MainLayout>
  );
}
