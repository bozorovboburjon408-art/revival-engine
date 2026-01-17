import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FormulaCategorySection } from "@/components/formulas/FormulaCategorySection";
import { formulaCategories } from "@/lib/formulas";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { useLanguage } from "@/hooks/useLanguage";

const Formulas = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = formulaCategories
    .map((category) => ({
      ...category,
      formulas: category.formulas.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.formulas.length > 0);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-16 bg-gradient-to-b from-primary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="font-display text-4xl md:text-5xl mb-4 text-foreground">
                  {t.formulas.title}
                </h1>
                <p className="text-muted-foreground text-lg mb-8">
                  {t.formulas.subtitle}
                </p>
                
                {/* Search */}
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={t.formulas.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-card border-border"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Navigation */}
          <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
                {formulaCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {category.title}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Formulas Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4 space-y-16">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <FormulaCategorySection key={category.id} category={category} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    "{searchQuery}" {t.formulas.noFormulasFound}
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Formulas;