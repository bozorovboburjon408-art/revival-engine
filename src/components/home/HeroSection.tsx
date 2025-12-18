import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-powered matematika platformasi
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 animate-slide-up">
            Matematikani{" "}
            <span className="gradient-text">osonlashtiring</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Hosilalar, integrallar, differensial tenglamalar va boshqa mavzularni interaktiv tarzda o'rganing
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/library">
              <Button variant="hero" size="xl" className="gap-2 group">
                Boshlash
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/calculator">
              <Button variant="glass" size="xl">
                AI Kalkulyator
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display gradient-text">18+</div>
              <div className="text-sm text-muted-foreground mt-1">Mavzular</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display gradient-text">∞</div>
              <div className="text-sm text-muted-foreground mt-1">Misollar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display gradient-text">AI</div>
              <div className="text-sm text-muted-foreground mt-1">Yechimlar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-2.5 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
