import { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RotateCcw, Plus, Trash2, Crosshair, TrendingUp, AreaChart } from "lucide-react";
import { toast } from "sonner";
import { PageTransition } from "@/components/PageTransition";
import { useLanguage } from "@/hooks/useLanguage";

interface FunctionItem {
  id: string;
  expression: string;
  color: string;
}

interface Point {
  x: number;
  y: number;
}

interface IntegralBounds {
  a: number;
  b: number;
  funcIndex: number;
}

const COLORS = ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6'];

const Graphics = () => {
  const { t, language } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const progressRef = useRef(0);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });
  const [functions, setFunctions] = useState<FunctionItem[]>([
    { id: '1', expression: 'sin(x)', color: COLORS[0] }
  ]);
  const [newExpression, setNewExpression] = useState('');
  const [zoom, setZoom] = useState(50);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [cursorPos, setCursorPos] = useState<Point | null>(null);
  const [cursorValues, setCursorValues] = useState<{expr: string, y: number, color: string}[]>([]);
  const [roots, setRoots] = useState<{expr: string, points: number[], color: string}[]>([]);
  const [intersections, setIntersections] = useState<Point[]>([]);
  const [showIntegral, setShowIntegral] = useState(false);
  const [integralBounds, setIntegralBounds] = useState<IntegralBounds>({ a: 0, b: 3.14, funcIndex: 0 });
  const [integralValue, setIntegralValue] = useState<number | null>(null);
  const [manualX, setManualX] = useState<string>('');
  const [manualXPoint, setManualXPoint] = useState<number | null>(null);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  // Handle canvas resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = Math.floor(rect.width - 32) || 800;
        const newHeight = Math.max(400, Math.floor(newWidth * 0.6));
        setCanvasSize({ width: newWidth, height: newHeight });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Parse and evaluate mathematical expression
  const evaluateExpression = useCallback((expr: string, x: number): number | null => {
    try {
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
  }, []);

  // Calculate derivative numerically
  const calculateDerivative = useCallback((expr: string, x: number): number | null => {
    const h = 0.0001;
    const y1 = evaluateExpression(expr, x - h);
    const y2 = evaluateExpression(expr, x + h);
    if (y1 === null || y2 === null) return null;
    return (y2 - y1) / (2 * h);
  }, [evaluateExpression]);

  // Find roots (where function crosses X axis)
  const findRoots = useCallback((expr: string): number[] => {
    const roots: number[] = [];
    const step = 0.1;
    
    for (let x = -10; x < 10; x += step) {
      const y1 = evaluateExpression(expr, x);
      const y2 = evaluateExpression(expr, x + step);
      
      if (y1 !== null && y2 !== null && y1 * y2 < 0) {
        // Newton-Raphson refinement
        let root = (x + x + step) / 2;
        for (let i = 0; i < 10; i++) {
          const y = evaluateExpression(expr, root);
          const dy = calculateDerivative(expr, root);
          if (y === null || dy === null || Math.abs(dy) < 0.0001) break;
          root = root - y / dy;
        }
        
        // Avoid duplicates
        if (!roots.some(r => Math.abs(r - root) < 0.01)) {
          roots.push(Math.round(root * 1000) / 1000);
        }
      }
    }
    
    return roots;
  }, [evaluateExpression, calculateDerivative]);

  // Find intersections between two functions
  const findIntersections = useCallback((expr1: string, expr2: string): Point[] => {
    const points: Point[] = [];
    const step = 0.1;
    
    for (let x = -10; x < 10; x += step) {
      const diff1 = (evaluateExpression(expr1, x) ?? 0) - (evaluateExpression(expr2, x) ?? 0);
      const diff2 = (evaluateExpression(expr1, x + step) ?? 0) - (evaluateExpression(expr2, x + step) ?? 0);
      
      if (diff1 * diff2 < 0) {
        // Binary search for exact point
        let left = x, right = x + step;
        for (let i = 0; i < 20; i++) {
          const mid = (left + right) / 2;
          const diffMid = (evaluateExpression(expr1, mid) ?? 0) - (evaluateExpression(expr2, mid) ?? 0);
          if (diff1 * diffMid < 0) right = mid;
          else left = mid;
        }
        
        const px = (left + right) / 2;
        const py = evaluateExpression(expr1, px);
        if (py !== null) {
          points.push({ 
            x: Math.round(px * 1000) / 1000, 
            y: Math.round(py * 1000) / 1000 
          });
        }
      }
    }
    
    return points;
  }, [evaluateExpression]);

  // Calculate definite integral using Simpson's rule
  const calculateIntegral = useCallback((expr: string, a: number, b: number): number | null => {
    const n = 1000; // Number of intervals (must be even)
    const h = (b - a) / n;
    
    let sum = 0;
    const y0 = evaluateExpression(expr, a);
    const yn = evaluateExpression(expr, b);
    
    if (y0 === null || yn === null) return null;
    
    sum += y0 + yn;
    
    for (let i = 1; i < n; i++) {
      const x = a + i * h;
      const y = evaluateExpression(expr, x);
      if (y === null) return null;
      
      if (i % 2 === 0) {
        sum += 2 * y;
      } else {
        sum += 4 * y;
      }
    }
    
    return (h / 3) * sum;
  }, [evaluateExpression]);

  // Calculate roots and intersections when functions change
  useEffect(() => {
    const newRoots = functions.map(f => ({
      expr: f.expression,
      points: findRoots(f.expression),
      color: f.color
    }));
    setRoots(newRoots);

    const newIntersections: Point[] = [];
    for (let i = 0; i < functions.length; i++) {
      for (let j = i + 1; j < functions.length; j++) {
        const pts = findIntersections(functions[i].expression, functions[j].expression);
        newIntersections.push(...pts);
      }
    }
    setIntersections(newIntersections);
  }, [functions, findRoots, findIntersections]);

  // Calculate integral when bounds or function changes
  useEffect(() => {
    if (showIntegral && functions[integralBounds.funcIndex]) {
      const value = calculateIntegral(
        functions[integralBounds.funcIndex].expression,
        integralBounds.a,
        integralBounds.b
      );
      setIntegralValue(value);
    }
  }, [showIntegral, integralBounds, functions, calculateIntegral]);

  // Reset animation when functions or canvas size change
  useEffect(() => {
    progressRef.current = 0;
    setAnimationKey(prev => prev + 1);
  }, [functions, canvasSize]);

  // Draw graph with animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvasSize.width;
    const height = canvasSize.height;
    const centerX = width / 2 + offset.x;
    const centerY = height / 2 + offset.y;
    const scale = zoom;

    const drawFrame = () => {
      // Clear
      ctx.fillStyle = 'hsl(222, 47%, 8%)';
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'hsl(222, 47%, 15%)';
      ctx.lineWidth = 1;

      const gridSpacing = scale;
      for (let x = centerX % gridSpacing; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = centerY % gridSpacing; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Axes
      ctx.strokeStyle = 'hsl(222, 47%, 40%)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = 'hsl(222, 47%, 60%)';
      ctx.font = '12px monospace';

      const minX = Math.floor(-centerX / scale);
      const maxX = Math.ceil((width - centerX) / scale);
      const minY = Math.floor(-(height - centerY) / scale);
      const maxY = Math.ceil(centerY / scale);

      for (let i = minX; i <= maxX; i++) {
        if (i === 0) continue;
        const x = centerX + i * scale;
        if (x > 20 && x < width - 20) {
          ctx.fillText(i.toString(), x - 5, centerY + 15);
        }
      }

      for (let i = minY; i <= maxY; i++) {
        if (i === 0) continue;
        const y = centerY - i * scale;
        if (y > 15 && y < height - 15) {
          ctx.fillText(i.toString(), centerX + 5, y + 4);
        }
      }

      ctx.fillText('0', centerX + 5, centerY + 15);

      // Draw integral area (shaded region)
      if (showIntegral && functions[integralBounds.funcIndex] && progressRef.current >= width) {
        const func = functions[integralBounds.funcIndex];
        const a = Math.min(integralBounds.a, integralBounds.b);
        const b = Math.max(integralBounds.a, integralBounds.b);
        
        ctx.beginPath();
        ctx.moveTo(centerX + a * scale, centerY);
        
        // Draw curve from a to b
        for (let x = a; x <= b; x += 0.02) {
          const y = evaluateExpression(func.expression, x);
          if (y !== null) {
            const px = centerX + x * scale;
            const py = centerY - y * scale;
            ctx.lineTo(px, py);
          }
        }
        
        // Close path back to X axis
        ctx.lineTo(centerX + b * scale, centerY);
        ctx.closePath();
        
        // Fill with semi-transparent color
        ctx.fillStyle = func.color + '40'; // 40 = 25% opacity
        ctx.fill();
        
        // Draw boundary lines
        ctx.strokeStyle = func.color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        // Left boundary (x = a)
        ctx.beginPath();
        const ya = evaluateExpression(func.expression, a);
        if (ya !== null) {
          ctx.moveTo(centerX + a * scale, centerY);
          ctx.lineTo(centerX + a * scale, centerY - ya * scale);
          ctx.stroke();
        }
        
        // Right boundary (x = b)
        ctx.beginPath();
        const yb = evaluateExpression(func.expression, b);
        if (yb !== null) {
          ctx.moveTo(centerX + b * scale, centerY);
          ctx.lineTo(centerX + b * scale, centerY - yb * scale);
          ctx.stroke();
        }
        
        ctx.setLineDash([]);
        
        // Labels for a and b
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`a=${a}`, centerX + a * scale - 15, centerY + 30);
        ctx.fillText(`b=${b}`, centerX + b * scale - 15, centerY + 30);
      }

      // Draw functions with animation
      functions.forEach((func, funcIndex) => {
        if (!func.expression.trim()) return;

        const funcDelay = funcIndex * 80;
        const funcProgress = Math.max(0, progressRef.current - funcDelay);
        const funcWidth = Math.min(width, funcProgress);

        if (funcWidth <= 0) return;

        ctx.strokeStyle = func.color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.shadowColor = func.color;
        ctx.shadowBlur = funcWidth < width ? 10 : 0;

        ctx.beginPath();

        let isFirst = true;
        let lastY: number | null = null;

        for (let px = 0; px < funcWidth; px++) {
          const x = (px - centerX) / scale;
          const y = evaluateExpression(func.expression, x);

          if (y !== null) {
            const py = centerY - y * scale;

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
        ctx.shadowBlur = 0;
      });

      // Draw roots (X axis intersections)
      if (progressRef.current >= width) {
        roots.forEach(root => {
          root.points.forEach(x => {
            const px = centerX + x * scale;
            const py = centerY;
            
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = root.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
          });
        });

        // Draw function intersections
        intersections.forEach(point => {
          const px = centerX + point.x * scale;
          const py = centerY - point.y * scale;
          
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
        });
      }

      // Draw manual X point
      if (manualXPoint !== null && progressRef.current >= width) {
        const px = centerX + manualXPoint * scale;

        // Vertical line (solid, more visible)
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
        ctx.stroke();

        // Draw points on each function
        functions.forEach(func => {
          const y = evaluateExpression(func.expression, manualXPoint);
          if (y !== null) {
            const pointY = centerY - y * scale;
            
            // Outer glow
            ctx.beginPath();
            ctx.arc(px, pointY, 10, 0, Math.PI * 2);
            ctx.fillStyle = func.color + '40';
            ctx.fill();
            
            // Inner point
            ctx.beginPath();
            ctx.arc(px, pointY, 6, 0, Math.PI * 2);
            ctx.fillStyle = func.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Value label
            ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
            ctx.fillRect(px + 12, pointY - 12, 80, 20);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 11px monospace';
            ctx.fillText(`y = ${y.toFixed(3)}`, px + 16, pointY + 2);
          }
        });

        // X label at bottom
        ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`x = ${manualXPoint}`, px - 25, height - 10);
      }

      // Draw cursor crosshair and values
      if (cursorPos && !isDragging && manualXPoint === null) {
        const px = centerX + cursorPos.x * scale;
        const py = centerY - cursorPos.y * scale;

        // Vertical line
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw points on each function
        functions.forEach(func => {
          const y = evaluateExpression(func.expression, cursorPos.x);
          if (y !== null) {
            const pointY = centerY - y * scale;
            ctx.beginPath();
            ctx.arc(px, pointY, 5, 0, Math.PI * 2);
            ctx.fillStyle = func.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });

        // Coordinate display
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(px + 10, py - 25, 100, 20);
        ctx.fillStyle = '#fff';
        ctx.font = '12px monospace';
        ctx.fillText(`(${cursorPos.x.toFixed(2)}, ${cursorPos.y.toFixed(2)})`, px + 15, py - 10);
      }

      // Continue animation
      if (progressRef.current < width + functions.length * 80) {
        progressRef.current += 12;
        animationRef.current = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [functions, zoom, offset, animationKey, evaluateExpression, cursorPos, isDragging, roots, intersections, showIntegral, integralBounds, manualXPoint, canvasSize]);

  const addFunction = () => {
    if (!newExpression.trim()) {
      toast.error(language === 'uz' ? "Funksiya kiriting" : "Enter a function");
      return;
    }
    
    const testResult = evaluateExpression(newExpression, 1);
    if (testResult === null) {
      toast.error(language === 'uz' ? "Noto'g'ri funksiya formati" : "Invalid function format");
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
    toast.success(language === 'uz' ? "Funksiya qo'shildi" : "Function added");
  };

  const removeFunction = (id: string) => {
    if (functions.length === 1) {
      toast.error(language === 'uz' ? "Kamida bitta funksiya bo'lishi kerak" : "At least one function is required");
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
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;
    
    const px = (e.clientX - rect.left) * scaleX;
    const py = (e.clientY - rect.top) * scaleY;
    
    const centerX = canvasSize.width / 2 + offset.x;
    const centerY = canvasSize.height / 2 + offset.y;
    
    const x = (px - centerX) / zoom;
    const y = (centerY - py) / zoom;
    
    setCursorPos({ x, y });

    // Calculate function values at cursor
    const values = functions.map(f => ({
      expr: f.expression,
      y: evaluateExpression(f.expression, x) ?? 0,
      color: f.color
    })).filter(v => v.y !== null);
    setCursorValues(values);

    if (isDragging) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setCursorPos(null);
    setCursorValues([]);
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
    <PageTransition>
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t.graphics.title} <span className="text-primary">{t.graphics.titleHighlight}</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.graphics.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{language === 'uz' ? 'Funksiyalar' : 'Functions'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {functions.map((func) => (
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

            {/* X Value Calculator */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Crosshair className="h-4 w-4" />
                  {t.graphics.pointOnGraph}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Manual X input */}
                <div className="flex items-center gap-2">
                  <Label className="text-sm whitespace-nowrap">x =</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={manualX}
                    onChange={(e) => {
                      setManualX(e.target.value);
                      const val = parseFloat(e.target.value);
                      setManualXPoint(isNaN(val) ? null : val);
                    }}
                      placeholder={t.graphics.enterX}
                      className="h-8 font-mono text-sm"
                  />
                </div>

                {/* Show values for manual X or cursor */}
                {(manualXPoint !== null || cursorPos) && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      {manualXPoint !== null ? `x = ${manualXPoint}` : cursorPos ? `x = ${cursorPos.x.toFixed(3)} (${language === 'uz' ? 'kursor' : 'cursor'})` : ''}
                    </div>
                    {functions.map((func, i) => {
                      const xVal = manualXPoint !== null ? manualXPoint : cursorPos?.x;
                      if (xVal === undefined) return null;
                      const y = evaluateExpression(func.expression, xVal);
                      return (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: func.color }} />
                            <span className="font-mono text-muted-foreground">{func.expression}</span>
                          </div>
                          <span className="font-mono font-semibold">
                            {y !== null ? y.toFixed(4) : '—'}
                          </span>
                        </div>
                      );
                    })}
                    
                    {/* Derivative */}
                    {functions.length > 0 && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <TrendingUp className="h-3 w-3" /> {t.graphics.derivative} (f₁)
                          </span>
                          <span className="font-mono">
                            {calculateDerivative(
                              functions[0].expression, 
                              manualXPoint !== null ? manualXPoint : cursorPos?.x ?? 0
                            )?.toFixed(4) ?? '—'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Integral Calculator */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AreaChart className="h-4 w-4" />
                    {t.graphics.integral}
                  </span>
                  <Switch
                    checked={showIntegral}
                    onCheckedChange={setShowIntegral}
                  />
                </CardTitle>
              </CardHeader>
              {showIntegral && (
                <CardContent className="space-y-4">
                  {/* Function selector */}
                  <div className="space-y-2">
                    <Label className="text-xs">{language === 'uz' ? 'Funksiya' : 'Function'}</Label>
                    <div className="flex flex-wrap gap-1">
                      {functions.map((f, i) => (
                        <Button
                          key={f.id}
                          variant={integralBounds.funcIndex === i ? "default" : "outline"}
                          size="sm"
                          className="font-mono text-xs h-7"
                          onClick={() => setIntegralBounds(prev => ({ ...prev, funcIndex: i }))}
                        >
                          <div 
                            className="w-2 h-2 rounded-full mr-1" 
                            style={{ backgroundColor: f.color }} 
                          />
                          {f.expression}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Bounds inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">a ({language === 'uz' ? "boshlang'ich" : 'start'})</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={integralBounds.a}
                        onChange={(e) => setIntegralBounds(prev => ({ 
                          ...prev, 
                          a: parseFloat(e.target.value) || 0 
                        }))}
                        className="h-8 font-mono text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">b ({language === 'uz' ? 'oxirgi' : 'end'})</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={integralBounds.b}
                        onChange={(e) => setIntegralBounds(prev => ({ 
                          ...prev, 
                          b: parseFloat(e.target.value) || 0 
                        }))}
                        className="h-8 font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Result */}
                  {integralValue !== null && (
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-xs text-muted-foreground mb-1">
                        ∫<sub>{integralBounds.a}</sub><sup>{integralBounds.b}</sup> {functions[integralBounds.funcIndex]?.expression} dx =
                      </div>
                      <div className="text-2xl font-bold font-mono text-primary">
                        {integralValue.toFixed(6)}
                      </div>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>

            {/* Roots */}
            {roots.some(r => r.points.length > 0) && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t.graphics.roots}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {roots.filter(r => r.points.length > 0).map((r, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: r.color }} />
                        <span className="font-mono">{r.expr}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {r.points.map((p, j) => (
                          <Badge key={j} variant="secondary" className="font-mono text-xs">
                            x = {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Intersections */}
            {intersections.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{t.graphics.intersections}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {intersections.map((p, i) => (
                      <Badge key={i} variant="outline" className="font-mono text-xs bg-yellow-500/10 border-yellow-500/30">
                        ({p.x}, {p.y})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Examples */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{language === 'uz' ? 'Misollar' : 'Examples'}</CardTitle>
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
                <CardTitle className="text-lg">{language === 'uz' ? 'Boshqarish' : 'Controls'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t.graphics.zoom}: {zoom}</Label>
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
                  {t.graphics.reset}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Graph Canvas */}
          <div className="lg:col-span-2" ref={containerRef}>
            <Card>
              <CardContent className="p-4">
                <canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  className="w-full rounded-lg cursor-crosshair bg-background"
                  style={{ maxHeight: '70vh' }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={handleMouseLeave}
                  onWheel={handleWheel}
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  {language === 'uz' ? "Suring - ko'chirish | G'ildirak - kattalashtirish" : "Drag - move | Wheel - zoom"} | 
                  <span className="text-primary"> ● </span>{language === 'uz' ? 'Nol nuqta' : 'Root'} | 
                  <span className="text-yellow-500"> ● </span>{t.graphics.intersections}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Graphics;
