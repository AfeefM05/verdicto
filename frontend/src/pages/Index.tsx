import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import { AdvancedTimeline } from "@/components/AdvancedTimeline";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      
      <AdvancedTimeline />
    </div>
  );
};

export default Index;