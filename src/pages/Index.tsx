
import { MainLayout } from "@/components/Layout/MainLayout";
import { HeroSection } from "@/components/Home/HeroSection";
import { FeaturesSection } from "@/components/Home/FeaturesSection";
import { HowItWorksSection } from "@/components/Home/HowItWorksSection";
import { TestimonialsSection } from "@/components/Home/TestimonialsSection";
import { CTASection } from "@/components/Home/CTASection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
