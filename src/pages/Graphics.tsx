import { useState, Suspense, lazy } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Graph2D } from "@/components/graphics/Graph2D";
import { VisualizationCard } from "@/components/graphics/VisualizationCard";
import { visualizations2D, visualizations3D, Visualization2D, Visualization3D } from "@/lib/visualizations";
import { Search, LineChart, Box, MousePointer2, Move, ZoomIn, Loader2 } from "lucide-react";

// Lazy load 3D component to avoid breaking the app if there are issues
const Scene3D = lazy(() => import("@/components/graphics/Scene3D").then(mod => ({ default: mod.Scene3D })));

const Scene3DFallback = () => (
  <div className="h-[400px] rounded-lg border border-border bg-slate-900 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
      <p className="text-muted-foreground">3D muhit yuklanmoqda...</p>
    </div>
  </div>
);

const Graphics = () => {
  const [activeTab, setActiveTab] = useState<'2d' | '3d'>('2d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selected2D, setSelected2D] = useState<Visualization2D>(visualizations2D[0]);
  const [selected3D, setSelected3D] = useState<Visualization3D>(visualizations3D[0]);

  const filtered2D = visualizations2D.filter(v => 
    v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filtered3D = visualizations3D.filter(v => 
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
            Interaktiv 2D va 3D matematik vizualizatsiyalar. Funksiyalar, yuzalar va 
            geometrik shakllarni o'rganing.
          </p>
        </div>

        {/* Controls hint */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MousePointer2 className="h-4 w-4" />
            <span>Suring - Aylantirish</span>
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

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as '2d' | '3d')} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <TabsList className="grid grid-cols-2 w-full sm:w-auto">
              <TabsTrigger value="2d" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                2D Grafika
              </TabsTrigger>
              <TabsTrigger value="3d" className="flex items-center gap-2">
                <Box className="h-4 w-4" />
                3D Grafika
              </TabsTrigger>
            </TabsList>

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

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Visualization List */}
            <div className="lg:col-span-1">
              <TabsContent value="2d" className="mt-0">
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
              </TabsContent>

              <TabsContent value="3d" className="mt-0">
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-3">
                    {filtered3D.map((viz) => (
                      <VisualizationCard
                        key={viz.id}
                        visualization={viz}
                        isSelected={selected3D.id === viz.id}
                        onClick={() => setSelected3D(viz)}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>

            {/* Visualization Canvas */}
            <div className="lg:col-span-2">
              <TabsContent value="2d" className="mt-0">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">{selected2D.name}</h2>
                    <p className="text-muted-foreground font-mono">{selected2D.description}</p>
                  </div>
                  <Graph2D visualization={selected2D} />
                </div>
              </TabsContent>

              <TabsContent value="3d" className="mt-0">
                <div className="bg-card rounded-xl p-4 border border-border">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold">{selected3D.name}</h2>
                    <p className="text-muted-foreground font-mono">{selected3D.description}</p>
                  </div>
                  <Suspense fallback={<Scene3DFallback />}>
                    <Scene3D visualization={selected3D} />
                  </Suspense>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <div className="text-3xl font-bold text-primary">{visualizations2D.length}</div>
            <div className="text-sm text-muted-foreground">2D Vizualizatsiyalar</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border text-center">
            <div className="text-3xl font-bold text-purple-400">{visualizations3D.length}</div>
            <div className="text-sm text-muted-foreground">3D Vizualizatsiyalar</div>
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
