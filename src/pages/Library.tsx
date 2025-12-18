import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { mathTopics } from "@/lib/mathTopics";
import { BookOpen, ChevronRight } from "lucide-react";

const Library = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
          <div className="container relative z-10 px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                18 ta mavzu
              </div>
              <h1 className="font-display text-5xl md:text-6xl mb-4">
                Matematik <span className="gradient-text">Kutubxona</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Matematik analiz va differensial tenglamalar bo'yicha to'liq nazariy materiallar
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
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 min-w-0">
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                          <span className="font-display text-lg text-primary-foreground">{topic.id}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{topic.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{topic.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all flex-shrink-0 mt-4" />
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
  );
};

export default Library;
