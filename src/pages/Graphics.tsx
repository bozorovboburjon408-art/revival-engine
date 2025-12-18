import { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Graph2D } from "@/components/graphics/Graph2D";
import { VisualizationCard } from "@/components/graphics/VisualizationCard";
import { visualizations2D, Visualization2D } from "@/lib/visualizations";
import { Search, MousePointer2, Move, ZoomIn } from "lucide-react";

const Graphics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selected2D, setSelected2D] = useState<Visualization2D>(visualizations2D[0]);

  const filtered2D = visualizations2D.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Matematik <span className="text-primary">Grafika</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interaktiv 2D matematik vizualizatsiyalar. Funksiyalar va 
            geometrik shakllarni o'rganing.
          </p>
        </div>

        {/* Controls hint */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MousePointer2 className="h-4 w-4" />
            <span>Suring - Ko'chirish</span>
          </div>
          <div className="flex items-center gap-2">
            <ZoomIn className="h-4 w-4" />
            <span>G'ildirak - Kattalashtirish</span>
          </div>
          <div className="flex items-center gap-2">
            <Move className="h-4 w-4" />
            <span>Slayderlar - Parametrlar</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-end mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Visualization List */}
          <div className="lg:col-span-1">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-3">
                {filtered2D.map((viz) => (
                  <VisualizationCard
                    key={viz.id}
                    visualization={viz}
                    isSelected={selected2D.id === viz.id}
                    onClick={() => setSelected2D(viz)}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Visualization Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{selected2D.name}</h2>
                <p className="text-muted-foreground font-mono">{selected2D.description}</p>
              </div>
              <Graph2D visualization={selected2D} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <div className="text-3xl font-bold text-primary">{visualizations2D.length}</div>
            <div className="text-sm text-muted-foreground">2D Vizualizatsiyalar</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <div className="text-3xl font-bold text-blue-400">∞</div>
            <div className="text-sm text-muted-foreground">Parametr kombinatsiyalari</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <div className="text-3xl font-bold text-green-400">100%</div>
            <div className="text-sm text-muted-foreground">Interaktiv</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Graphics;
