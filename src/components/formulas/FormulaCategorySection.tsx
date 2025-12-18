import { Variable, Triangle, Waves, TrendingUp, Sigma, Percent, Grid3X3, LucideIcon } from "lucide-react";
import { FormulaCard } from "./FormulaCard";
import type { FormulaCategory } from "@/lib/formulas";

const iconMap: Record<string, LucideIcon> = {
  Variable,
  Triangle,
  Waves,
  TrendingUp,
  Sigma,
  Percent,
  Grid3X3,
};

interface FormulaCategorySectionProps {
  category: FormulaCategory;
}

export const FormulaCategorySection = ({ category }: FormulaCategorySectionProps) => {
  const Icon = iconMap[category.icon] || Variable;

  return (
    <section id={category.id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="font-display text-2xl text-foreground">{category.title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.formulas.map((formula) => (
          <FormulaCard key={formula.id} formula={formula} />
        ))}
      </div>
    </section>
  );
};
