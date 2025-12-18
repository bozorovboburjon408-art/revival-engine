import { useState, useEffect, useRef } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface FunctionItem {
  id: string;
  expression: string;
  color: string;
}

const COLORS = ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6'];

const Graphics = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functions, setFunctions] = useState<FunctionItem[]>([
    { id: '1', expression: 'sin(x)', color: COLORS[0] }
  ]);
  const [newExpression, setNewExpression] = useState('');
  const [zoom, setZoom] = useState(50);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Parse and evaluate mathematical expression
  const evaluateExpression = (expr: string, x: number): number | null => {
    try {
      // Replace math functions
      let parsed = expr
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/log/g, 'Math.log')
        .replace(/ln/g, 'Math.log')
        .replace(/exp/g, 'Math.exp')
        .replace(/pow/g, 'Math.pow')
        .replace(/pi/gi, 'Math.PI')
        .replace(/e(?![x])/g, 'Math.E')
        .replace(/\^/g, '**');
      
      // Handle implicit multiplication: 2x -> 2*x, x2 -> x*2
      parsed = parsed.replace(/(\d)([x])/gi, '$1*$2');
      parsed = parsed.replace(/([x])(\d)/gi, '$1*$2');
      parsed = parsed.replace(/(\))(\d)/g, '$1*$2');
      parsed = parsed.replace(/(\d)(\()/g, '$1*$2');
      parsed = parsed.replace(/(\))(\()/g, '$1*$2');
      parsed = parsed.replace(/(x)(\()/gi, '$1*$2');
      parsed = parsed.replace(/(\))(x)/gi, '$1*$2');
      parsed = parsed.replace(/(x)(Math)/gi, '$1*$2');
      
      const fn = new Function('x', `return ${parsed}`);
      const result = fn(x);
      
      if (!isFinite(result) || isNaN(result)) return null;
      return result;
    } catch {
      return null;
    }
  };

  // Draw graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2 + offset.x;
    const centerY = height / 2 + offset.y;
    const scale = zoom;

    // Clear
    ctx.fillStyle = 'hsl(222, 47%, 8%)';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'hsl(222, 47%, 15%)';
    ctx.lineWidth = 1;

    // Vertical grid lines
    const gridSpacing = scale;
    for (let x = centerX % gridSpacing; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = centerY % gridSpacing; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'hsl(222, 47%, 40%)';
    ctx.lineWidth = 2;

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = 'hsl(222, 47%, 60%)';
    ctx.font = '12px monospace';

    // X axis numbers
    for (let i = -10; i <= 10; i++) {
      if (i === 0) continue;
      const x = centerX + i * scale;
      if (x > 0 && x < width) {
        ctx.fillText(i.toString(), x - 5, centerY + 15);
      }
    }

    // Y axis numbers
    for (let i = -10; i <= 10; i++) {
      if (i === 0) continue;
      const y = centerY - i * scale;
      if (y > 0 && y < height) {
        ctx.fillText(i.toString(), centerX + 5, y + 4);
      }
    }

    // Origin
    ctx.fillText('0', centerX + 5, centerY + 15);

    // Draw functions
    functions.forEach(func => {
      if (!func.expression.trim()) return;

      ctx.strokeStyle = func.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      let isFirst = true;
      let lastY: number | null = null;

      for (let px = 0; px < width; px++) {
        const x = (px - centerX) / scale;
        const y = evaluateExpression(func.expression, x);

        if (y !== null) {
          const py = centerY - y * scale;

          // Check for discontinuity
          if (lastY !== null && Math.abs(py - lastY) > height / 2) {
            ctx.stroke();
            ctx.beginPath();
            isFirst = true;
          }

          if (isFirst) {
            ctx.moveTo(px, py);
            isFirst = false;
          } else {
            ctx.lineTo(px, py);
          }
          lastY = py;
        } else {
          if (!isFirst) {
            ctx.stroke();
            ctx.beginPath();
            isFirst = true;
          }
          lastY = null;
        }
      }
      ctx.stroke();
    });

  }, [functions, zoom, offset]);

  const addFunction = () => {
    if (!newExpression.trim()) {
      toast.error("Funksiya kiriting");
      return;
    }
    
    // Test if expression is valid
    const testResult = evaluateExpression(newExpression, 1);
    if (testResult === null) {
      toast.error("Noto'g'ri funksiya formati");
      return;
    }

    const newId = Date.now().toString();
    const colorIndex = functions.length % COLORS.length;
    setFunctions([...functions, { 
      id: newId, 
      expression: newExpression, 
      color: COLORS[colorIndex] 
    }]);
    setNewExpression('');
    toast.success("Funksiya qo'shildi");
  };

  const removeFunction = (id: string) => {
    if (functions.length === 1) {
      toast.error("Kamida bitta funksiya bo'lishi kerak");
      return;
    }
    setFunctions(functions.filter(f => f.id !== id));
  };

  const updateFunction = (id: string, expression: string) => {
    setFunctions(functions.map(f => 
      f.id === id ? { ...f, expression } : f
    ));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -5 : 5;
    setZoom(prev => Math.max(20, Math.min(150, prev + delta)));
  };

  const resetView = () => {
    setZoom(50);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Funksiya <span className="text-primary">Grafigi</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Matematik funksiyalarni yozing va grafiklarini ko'ring. 
            Bir nechta funksiyalarni solishtiring.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Funksiyalar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Existing functions */}
                {functions.map((func, index) => (
                  <div key={func.id} className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full shrink-0"
                      style={{ backgroundColor: func.color }}
                    />
                    <span className="text-muted-foreground">y =</span>
                    <Input
                      value={func.expression}
                      onChange={(e) => updateFunction(func.id, e.target.value)}
                      className="font-mono flex-1"
                      placeholder="sin(x)"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFunction(func.id)}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* Add new function */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <span className="text-muted-foreground">y =</span>
                  <Input
                    value={newExpression}
                    onChange={(e) => setNewExpression(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addFunction()}
                    className="font-mono flex-1"
                    placeholder="cos(x)"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={addFunction}
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Misollar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['x^2', 'sin(x)', 'cos(x)', '1/x', 'sqrt(x)', 'abs(x)', 'x^3', '2^x', 'log(x)'].map(expr => (
                    <Button
                      key={expr}
                      variant="secondary"
                      size="sm"
                      className="font-mono text-xs"
                      onClick={() => setNewExpression(expr)}
                    >
                      {expr}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Controls */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Boshqarish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Kattalashtirish: {zoom}</Label>
                  <input
                    type="range"
                    min="20"
                    max="150"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={resetView}
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Qaytarish
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Graph Canvas */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-4">
                <canvas
                  ref={canvasRef}
                  width={700}
                  height={500}
                  className="w-full rounded-lg cursor-grab active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onWheel={handleWheel}
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Suring - ko'chirish | G'ildirak - kattalashtirish
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Graphics;
