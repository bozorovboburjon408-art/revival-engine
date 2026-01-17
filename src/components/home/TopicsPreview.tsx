import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { mathTopics } from "@/lib/mathTopics";

export const TopicsPreview = () => {
  const previewTopics = mathTopics.slice(0, 6);

  return (
    <section className="py-24 md:py-32">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Mavzular <span className="gradient-text">ro'yxati</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Matematik analiz va differensial tenglamalar bo'yicha 18 ta to'liq mavzu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {previewTopics.map((topic, index) => (
            <Link
              key={topic.id}
              to={`/library/${topic.id}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="glass-card rounded-xl p-6 h-full hover-lift">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg text-primary">{topic.id}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/library">
            <Button variant="hero" size="lg" className="gap-2 group">
              Barcha mavzularni ko'rish
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
