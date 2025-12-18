import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import type { Formula } from "@/lib/formulas";

interface FormulaCardProps {
  formula: Formula;
}

export const FormulaCard = ({ formula }: FormulaCardProps) => {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mathRef.current) {
      katex.render(formula.formula, mathRef.current, {
        throwOnError: false,
        displayMode: true,
      });
    }
  }, [formula.formula]);

  return (
    <div className="group relative bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      <div className="relative">
        <h4 className="font-medium text-foreground mb-3">{formula.name}</h4>
        <div 
          ref={mathRef}
          className="text-lg overflow-x-auto py-2 text-foreground"
        />
        {formula.description && (
          <p className="text-sm text-muted-foreground mt-2">{formula.description}</p>
        )}
      </div>
    </div>
  );
};
