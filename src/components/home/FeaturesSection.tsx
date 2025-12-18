import { Link } from "react-router-dom";
import { BookOpen, Calculator, ClipboardList, LineChart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: BookOpen,
    title: "Kutubxona",
    description: "18 ta mavzu bo'yicha to'liq nazariy materiallar. Hosilalardan integrallar, qatorgacha.",
    href: "/library",
    gradient: "from-blue-500 to-indigo-600",
    delay: "0s"
  },
  {
    icon: Calculator,
    title: "AI Kalkulyator",
    description: "Sun'iy intellekt yordamida istalgan matematik masalani yeching. Batafsil yechim bilan.",
    href: "/calculator",
    gradient: "from-emerald-500 to-teal-600",
    delay: "0.1s"
  },
  {
    icon: ClipboardList,
    title: "Test bo'limi",
    description: "Mavzular bo'yicha testlar. AI tomonidan tuzilgan savollar va avtomatik natijalar.",
    href: "/tests",
    gradient: "from-orange-500 to-amber-600",
    delay: "0.2s"
  },
  {
    icon: LineChart,
    title: "Grafika",
    description: "Funksiyalar grafiklarini interaktiv tarzda chizing. 2D va 3D vizualizatsiya.",
    href: "/graphics",
    gradient: "from-purple-500 to-pink-600",
    delay: "0.3s"
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            To'rtta kuchli <span className="gradient-text">bo'lim</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Matematikani o'rganish uchun zarur bo'lgan barcha vositalar bir joyda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                to={feature.href}
                className="group animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="glass-card rounded-2xl p-8 h-full hover-lift">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
                    "bg-gradient-to-br shadow-lg",
                    feature.gradient
                  )}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="font-display text-2xl mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary font-medium">
                    Ko'rish
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
