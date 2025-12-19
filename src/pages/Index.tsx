import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TopicsPreview } from "@/components/home/TopicsPreview";
import { useSplash } from "@/App";
import { PageTransition } from "@/components/PageTransition";

const Index = () => {
  const { replaySplash } = useSplash();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header onReplaySplash={replaySplash} />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <TopicsPreview />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
