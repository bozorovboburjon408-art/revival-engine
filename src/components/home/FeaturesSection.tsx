import { Link } from "react-router-dom";
import { BookOpen, Calculator, ClipboardList, LineChart, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BookOpen,
    title: "Kutubxona",
    description: "18 ta mavzu bo'yicha to'liq nazariy materiallar. Hosilalardan integrallar, qatorgacha.",
    href: "/library",
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    bgGlow: "bg-blue-500/20",
    delay: "0s"
  },
  {
    icon: Calculator,
    title: "AI Kalkulyator",
    description: "Sun'iy intellekt yordamida istalgan matematik masalani yeching. Batafsil yechim bilan.",
    href: "/calculator",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    bgGlow: "bg-emerald-500/20",
    delay: "0.1s"
  },
  {
    icon: ClipboardList,
    title: "Test bo'limi",
    description: "Mavzular bo'yicha testlar. AI tomonidan tuzilgan savollar va avtomatik natijalar.",
    href: "/tests",
    gradient: "from-orange-400 via-amber-500 to-yellow-500",
    bgGlow: "bg-orange-500/20",
    delay: "0.2s"
  },
  {
    icon: LineChart,
    title: "Grafika",
    description: "Funksiyalar grafiklarini interaktiv tarzda chizing. Formuladan grafik.",
    href: "/graphics",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    bgGlow: "bg-purple-500/20",
    delay: "0.3s"
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/50 to-transparent" />
      <div className="blob w-[500px] h-[500px] bg-primary/10 -top-20 -right-20" />
      <div className="blob w-[400px] h-[400px] bg-purple-500/10 bottom-0 -left-20" style={{ animationDelay: "3s" }} />

      <div className="container px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Asosiy imkoniyatlar</span>
          </div>
          <h2 className="text-4xl md:text-6xl mb-6">
            To'rtta kuchli <span className="gradient-text">bo'lim</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Matematikani o'rganish uchun zarur bo'lgan barcha vositalar bir joyda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                to={feature.href}
                className="group animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="relative glass-card rounded-3xl p-8 h-full hover-lift overflow-hidden">
                  {/* Glow effect on hover */}
                  <div className={cn(
                    "absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    feature.bgGlow
                  )} />

                  <div className={cn(
                    "relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                    "bg-gradient-to-br shadow-xl",
                    feature.gradient
                  )}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <span>Ko'rish</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
