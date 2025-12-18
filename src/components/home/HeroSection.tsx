import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      
      {/* Animated Blobs */}
      <div className="blob w-[600px] h-[600px] bg-primary/20 -top-32 -left-32" />
      <div className="blob w-[500px] h-[500px] bg-purple-500/20 top-1/4 -right-32" style={{ animationDelay: "2s" }} />
      <div className="blob w-[400px] h-[400px] bg-pink-500/15 bottom-0 left-1/4" style={{ animationDelay: "4s" }} />
      <div className="blob w-[300px] h-[300px] bg-amber-500/15 bottom-1/4 right-1/4" style={{ animationDelay: "6s" }} />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-medium mb-10 animate-fade-in">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="gradient-text font-semibold">Interaktiv matematika platformasi</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-8 animate-slide-up">
            Matematikani{" "}
            <span className="relative">
              <span className="gradient-text">osonlashtiring</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(262 83% 58%)" />
                    <stop offset="50%" stopColor="hsl(292 84% 61%)" />
                    <stop offset="100%" stopColor="hsl(330 81% 60%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Hosilalar, integrallar, differensial tenglamalar va boshqa mavzularni{" "}
            <span className="text-foreground font-medium">interaktiv</span> tarzda o'rganing
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/library">
              <Button variant="hero" size="xl" className="gap-3 group min-w-[200px]">
                <BookOpen className="w-5 h-5" />
                Boshlash
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-20 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {[
              { value: "18+", label: "Mavzular", icon: "📚" },
              { value: "174+", label: "Formulalar", icon: "📐" },
              { value: "∞", label: "Misollar", icon: "🔢" },
            ].map((stat, i) => (
              <div 
                key={stat.label} 
                className="group glass-card p-6 rounded-2xl hover-lift cursor-default"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
