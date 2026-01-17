import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mathTopics } from "@/lib/mathTopics";
import { BookOpen, ChevronRight } from "lucide-react";
import { TopicVisualization } from "@/components/library/TopicVisualization";
import { PageTransition } from "@/components/PageTransition";
import { useLanguage } from "@/hooks/useLanguage";

const Library = () => {
  const { t } = useLanguage();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
            <div className="container relative z-10 px-4">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  <BookOpen className="w-4 h-4" />
                  {t.library.badge}
                </div>
                <h1 className="font-display text-5xl md:text-6xl mb-4">
                  {t.library.title} <span className="gradient-text">{t.library.titleHighlight}</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  {t.library.subtitle}
                </p>
              </div>
            </div>
          </section>
          <section className="py-16">
            <div className="container px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mathTopics.map((topic) => (
                  <Link key={topic.id} to={`/library/${topic.id}`} className="group">
                    <div className="glass-card rounded-xl p-6 h-full hover-lift">
                      <div className="flex flex-col gap-4">
                        {/* Animatsiyali vizualizatsiya */}
                        <div className="w-full h-20 rounded-lg overflow-hidden bg-background/50 border border-border/30">
                          <TopicVisualization topicId={topic.id} />
                        </div>
                        
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                              <span className="font-display text-sm text-primary-foreground">{topic.id}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-base mb-1 group-hover:text-primary transition-colors">{topic.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2">{topic.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all flex-shrink-0 mt-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Library;