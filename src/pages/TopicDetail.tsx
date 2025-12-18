import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getTopicById } from "@/lib/mathTopics";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const TopicDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = getTopicById(topicId || "");

  if (!topic) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl mb-4">Mavzu topilmadi</h1>
            <Link to="/library"><Button>Kutubxonaga qaytish</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="border-b border-border/40 bg-secondary/30">
          <div className="container px-4 py-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">Bosh sahifa</Link>
              <span>/</span>
              <Link to="/library" className="hover:text-foreground transition-colors">Kutubxona</Link>
              <span>/</span>
              <span className="text-foreground">{topic.id}</span>
            </nav>
          </div>
        </div>
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
          <div className="container relative z-10 px-4">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                {topic.id}
              </div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">{topic.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{topic.description}</p>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="glass-card rounded-2xl p-8 md:p-12">
                <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-table:text-sm prose-th:bg-secondary/50 prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border prose-table:border-collapse">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {topic.content}
                  </ReactMarkdown>
                </article>
              </div>
              <div className="mt-8">
                <Link to="/library"><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" />Kutubxonaga qaytish</Button></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TopicDetail;
