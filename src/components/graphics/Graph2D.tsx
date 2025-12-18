import { useEffect, useRef, useState } from 'react';
import { Visualization2D } from '@/lib/visualizations';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface Graph2DProps {
  visualization: Visualization2D;
}

export const Graph2D = ({ visualization }: Graph2DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params, setParams] = useState(visualization.defaultParams || {});
  const [zoom, setZoom] = useState(40);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setParams(visualization.defaultParams || {});
    setZoom(40);
    setOffset({ x: 0, y: 0 });
  }, [visualization]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2 + offset.x;
    const centerY = height / 2 + offset.y;

    // Clear canvas
    ctx.fillStyle = 'hsl(222, 47%, 11%)';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'hsl(222, 47%, 20%)';
    ctx.lineWidth = 0.5;

    for (let x = centerX % zoom; x < width; x += zoom) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = centerY % zoom; y < height; y += zoom) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw axes
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

    // Draw axis labels
    ctx.fillStyle = 'hsl(210, 40%, 70%)';
    ctx.font = '12px monospace';
    
    for (let i = -10; i <= 10; i++) {
      if (i !== 0) {
        const x = centerX + i * zoom;
        const y = centerY + i * zoom;
        if (x > 0 && x < width) {
          ctx.fillText(i.toString(), x - 4, centerY + 15);
        }
        if (y > 0 && y < height) {
          ctx.fillText((-i).toString(), centerX + 5, y + 4);
        }
      }
    }

    // Draw function
    ctx.strokeStyle = 'hsl(47, 100%, 68%)';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const evaluate = (x: number): number | null => {
      const { A = 1, B = 1, C = 0, D = 0, a = 1, b = 1 } = params;
      
      switch (visualization.formula) {
        case 'sin':
          return A * Math.sin(B * x + C);
        case 'cos':
          return A * Math.cos(B * x + C);
        case 'tan':
          const tanVal = A * Math.tan(B * x);
          return Math.abs(tanVal) > 10 ? null : tanVal;
        case 'parabola':
          return A * x * x + B * x + C;
        case 'cubic':
          return A * x * x * x + B * x * x + C * x + D;
        case 'exp':
          return A * Math.exp(B * x);
        case 'log':
          return x > 0 ? A * Math.log(B * x) : null;
        default:
          return Math.sin(x);
      }
    };

    const evaluateParametric = (t: number): { x: number; y: number } | null => {
      const { R = 3, a = 4, b = 2, A = 4, B = 4, scale = 3 } = params;
      
      switch (visualization.formula) {
        case 'circle':
          return { x: R * Math.cos(t), y: R * Math.sin(t) };
        case 'ellipse':
          return { x: a * Math.cos(t), y: b * Math.sin(t) };
        case 'hyperbola':
          return { x: a / Math.cos(t), y: b * Math.tan(t) };
        case 'lissajous':
          return { x: A * Math.sin(a * t), y: B * Math.sin(b * t) };
        case 'heart':
          return {
            x: scale * 16 * Math.pow(Math.sin(t), 3) / 16,
            y: scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16
          };
        default:
          return { x: Math.cos(t), y: Math.sin(t) };
      }
    };

    const evaluatePolar = (theta: number): number => {
      const { a = 0, b = 0.5, A = 4, n = 4 } = params;
      
      switch (visualization.formula) {
        case 'spiral':
          return a + b * theta;
        case 'rose':
          return A * Math.cos(n * theta);
        case 'cardioid':
          return a * (1 + Math.cos(theta));
        default:
          return 1;
      }
    };

    if (visualization.type === 'function') {
      let isFirst = true;
      for (let px = 0; px < width; px++) {
        const x = (px - centerX) / zoom;
        const y = evaluate(x);
        
        if (y !== null && !isNaN(y) && isFinite(y)) {
          const py = centerY - y * zoom;
          if (py > -100 && py < height + 100) {
            if (isFirst) {
              ctx.moveTo(px, py);
              isFirst = false;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            isFirst = true;
          }
        } else {
          isFirst = true;
        }
      }
    } else if (visualization.type === 'parametric') {
      let isFirst = true;
      const steps = 1000;
      const range = visualization.formula === 'hyperbola' ? Math.PI / 2.5 : Math.PI * 2;
      
      for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * range * 2 - range;
        const point = evaluateParametric(t);
        
        if (point && !isNaN(point.x) && !isNaN(point.y) && 
            isFinite(point.x) && isFinite(point.y) &&
            Math.abs(point.x) < 20 && Math.abs(point.y) < 20) {
          const px = centerX + point.x * zoom;
          const py = centerY - point.y * zoom;
          
          if (isFirst) {
            ctx.moveTo(px, py);
            isFirst = false;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          isFirst = true;
        }
      }
    } else if (visualization.type === 'polar') {
      let isFirst = true;
      const steps = 1000;
      const maxTheta = visualization.formula === 'spiral' ? 8 * Math.PI : 2 * Math.PI;
      
      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * maxTheta;
        const r = evaluatePolar(theta);
        
        if (!isNaN(r) && isFinite(r)) {
          const x = r * Math.cos(theta);
          const y = r * Math.sin(theta);
          const px = centerX + x * zoom;
          const py = centerY - y * zoom;
          
          if (isFirst) {
            ctx.moveTo(px, py);
            isFirst = false;
          } else {
            ctx.lineTo(px, py);
          }
        } else {
          isFirst = true;
        }
      }
    }

    ctx.stroke();
  }, [visualization, params, zoom, offset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -5 : 5;
    setZoom(prev => Math.max(10, Math.min(100, prev + delta)));
  };

  const resetView = () => {
    setZoom(40);
    setOffset({ x: 0, y: 0 });
    setParams(visualization.defaultParams || {});
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full rounded-lg border border-border cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button size="icon" variant="secondary" onClick={() => setZoom(prev => Math.min(100, prev + 10))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={() => setZoom(prev => Math.max(10, prev - 10))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={resetView}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg p-4 border border-border">
        <h3 className="font-semibold mb-3">Parametrlar</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(params).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <Label className="flex justify-between">
                <span>{key}</span>
                <span className="text-muted-foreground">{(value as number).toFixed(2)}</span>
              </Label>
              <Slider
                value={[value as number]}
                onValueChange={([v]) => setParams(prev => ({ ...prev, [key]: v }))}
                min={key === 'n' ? 1 : -5}
                max={key === 'n' ? 10 : 5}
                step={0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
