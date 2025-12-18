import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TopicInteractiveVisualizationProps {
  topicId: string;
}

interface VisualizationConfig {
  title: string;
  description: string;
  labels?: { color: string; text: string }[];
}

const visualizationConfigs: Record<string, VisualizationConfig> = {
  M1: {
    title: "Hosila va uning grafik talqini",
    description: "Ko'k chiziq - f(x) = x³ - 3x funksiyasi. Yashil chiziq - f'(x) = 3x² - 3 hosilasi. Hosila funksiyaning o'sish/kamayish tezligini ko'rsatadi.",
    labels: [
      { color: '#3b82f6', text: 'f(x) - asosiy funksiya' },
      { color: '#22c55e', text: "f'(x) - hosila" },
      { color: '#ef4444', text: 'Urinma chiziq' }
    ]
  },
  M2: {
    title: "Funksiya ekstremum nuqtalari",
    description: "Qizil nuqta - maksimum (f'(x) = 0 va f''(x) < 0). Yashil nuqta - minimum (f'(x) = 0 va f''(x) > 0).",
    labels: [
      { color: '#8b5cf6', text: 'f(x) funksiya' },
      { color: '#ef4444', text: 'Maksimum' },
      { color: '#22c55e', text: 'Minimum' }
    ]
  },
  M3: {
    title: "Aniqmas integral",
    description: "Sariq chiziq - f(x) = cos(x). Ko'k chiziq - F(x) = sin(x) + C integral. Integral - funksiya ostidagi maydonga teng.",
    labels: [
      { color: '#f59e0b', text: 'f(x) - integrallanuvchi' },
      { color: '#3b82f6', text: 'F(x) - integral' }
    ]
  },
  M4: {
    title: "Trigonometrik funksiyalar",
    description: "sin(x) va cos(x) funksiyalari. Ular 2π davrga ega va bir-biridan π/2 ga siljigan.",
    labels: [
      { color: '#ef4444', text: 'sin(x)' },
      { color: '#3b82f6', text: 'cos(x)' }
    ]
  },
  M5: {
    title: "Aniq integral - egri chiziq ostidagi maydon",
    description: "Yashil maydon - ∫[a,b] f(x)dx. Animatsiya integralni Riman yig'indisi orqali ko'rsatadi.",
    labels: [
      { color: '#22c55e', text: 'f(x) funksiya' },
      { color: 'rgba(34, 197, 94, 0.4)', text: '∫f(x)dx maydon' }
    ]
  },
  M6: {
    title: "Xosmas integral",
    description: "1/x² funksiyasi x → ∞ da 0 ga intiladi. Integral yaqinlashishi yoki uzoqlashishi mumkin.",
    labels: [
      { color: '#f97316', text: '1/x² funksiya' },
      { color: 'rgba(249, 115, 22, 0.3)', text: 'Cheksiz maydon' }
    ]
  },
  M7: {
    title: "Ko'p o'zgaruvchili funksiya sirti",
    description: "z = f(x,y) funksiyasining 3D sirt ko'rinishi. Har bir nuqtada z qiymati x va y ga bog'liq.",
    labels: [
      { color: '#8b5cf6', text: 'z = f(x,y) sirt' }
    ]
  },
  M8: {
    title: "Gradient vektor maydoni",
    description: "∇f = (∂f/∂x, ∂f/∂y) - gradient vektori eng tez o'sish yo'nalishini ko'rsatadi.",
    labels: [
      { color: '#ec4899', text: 'Gradient vektorlar' }
    ]
  },
  M9: {
    title: "Differensial tenglama yechimlari oilasi",
    description: "Har xil boshlang'ich shartlar bilan bir xil DT ning turli yechimlari.",
    labels: [
      { color: '#3b82f6', text: 'y₁(x) - 1-yechim' },
      { color: '#22c55e', text: 'y₂(x) - 2-yechim' },
      { color: '#f59e0b', text: 'y₃(x) - 3-yechim' }
    ]
  },
  M10: {
    title: "So'nuvchi tebranish",
    description: "y'' + 2y' + y = 0 tenglamasining yechimi. Eksponensial so'nish bilan tebranish.",
    labels: [
      { color: '#ec4899', text: 'y(x) yechim' },
      { color: 'rgba(236, 72, 153, 0.4)', text: '±e^(-x) konvert' }
    ]
  },
  M11: {
    title: "Ikkinchi tartibli DT",
    description: "y'' = f(x,y,y') tenglamasining murakkab tebranish yechimi.",
    labels: [
      { color: '#14b8a6', text: 'y(x) - yechim' },
      { color: 'rgba(20, 184, 166, 0.5)', text: "y''(x) - ikkinchi hosila" }
    ]
  },
  M12: {
    title: "Chiziqli DT superpozitsiya prinsipi",
    description: "y = C₁y₁ + C₂y₂ - umumiy yechim ikki xususiy yechimning chiziqli kombinatsiyasi.",
    labels: [
      { color: '#6366f1', text: 'Umumiy yechim' }
    ]
  },
  M13: {
    title: "Qator qisman yig'indilari",
    description: "Sₙ = Σaₖ (k=1 dan n gacha). n oshganda yig'indi limitga yaqinlashadi.",
    labels: [
      { color: '#3b82f6', text: 'Qator hadlari' },
      { color: '#ef4444', text: 'Yig\'indi S' }
    ]
  },
  M14: {
    title: "Qatorning yaqinlashishi",
    description: "aₙ → L ketma-ketlik L limitga yaqinlashadi. ε-atrofi ichida qoladi.",
    labels: [
      { color: '#8b5cf6', text: 'aₙ hadlar' },
      { color: '#22c55e', text: 'L - limit' }
    ]
  },
  M15: {
    title: "Qatorning funksiyaga yaqinlashishi",
    description: "Sₙ(x) qisman yig'indilari f(x) funksiyaga yaqinlashadi.",
    labels: [
      { color: '#94a3b8', text: 'f(x) - maqsad' },
      { color: '#f59e0b', text: 'Sₙ(x) - yaqinlashma' }
    ]
  },
  M16: {
    title: "Teylor qatori yaqinlashmasi",
    description: "sin(x) ≈ x - x³/3! + x⁵/5! - ... Hadlar qo'shilganda aniqlik oshadi.",
    labels: [
      { color: '#94a3b8', text: 'sin(x) - asl funksiya' },
      { color: '#f59e0b', text: 'Teylor yaqinlashmasi' }
    ]
  },
  M17: {
    title: "Ikki o'lchovli integral",
    description: "∬ f(x,y) dA - D soha ustida integrallash. Hajmni ifodalaydi.",
    labels: [
      { color: '#22c55e', text: 'D - integrallash sohasi' }
    ]
  },
  M18: {
    title: "Uch o'lchovli integral",
    description: "∭ f(x,y,z) dV - V hajm ustida integrallash.",
    labels: [
      { color: '#8b5cf6', text: 'V - integrallash hajmi' }
    ]
  }
};

export const TopicInteractiveVisualization = ({ topicId }: TopicInteractiveVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [param, setParam] = useState(0.5);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  const config = visualizationConfigs[topicId] || {
    title: "Matematik vizualizatsiya",
    description: "Interaktiv grafik ko'rinish",
    labels: []
  };

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = Math.min(containerRef.current.offsetWidth - 32, 800);
        setDimensions({ width, height: Math.min(width * 0.5, 350) });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.fillRect(0, 0, width, height);
      
      // Grid
      drawGrid(ctx, width, height);
      
      // Draw based on topic
      const t = timeRef.current;
      switch (topicId) {
        case 'M1': drawDerivativesDetailed(ctx, width, height, t, param); break;
        case 'M2': drawExtremumsDetailed(ctx, width, height, t); break;
        case 'M3': drawIntegralDetailed(ctx, width, height, t); break;
        case 'M4': drawTrigDetailed(ctx, width, height, t); break;
        case 'M5': drawDefiniteIntegralDetailed(ctx, width, height, t); break;
        case 'M6': drawImproperIntegralDetailed(ctx, width, height, t); break;
        case 'M7': drawSurfaceDetailed(ctx, width, height, t); break;
        case 'M8': drawGradientDetailed(ctx, width, height, t); break;
        case 'M9': drawDiffEqFamilyDetailed(ctx, width, height, t); break;
        case 'M10': drawDampedOscillation(ctx, width, height, t); break;
        case 'M11': drawSecondOrderDE(ctx, width, height, t); break;
        case 'M12': drawLinearCombination(ctx, width, height, t); break;
        case 'M13': drawSeriesSum(ctx, width, height, t); break;
        case 'M14': drawConvergenceDetailed(ctx, width, height, t); break;
        case 'M15': drawFunctionApprox(ctx, width, height, t); break;
        case 'M16': drawTaylorApprox(ctx, width, height, t); break;
        case 'M17': drawDoubleIntegralDetailed(ctx, width, height, t); break;
        case 'M18': drawTripleIntegralDetailed(ctx, width, height, t); break;
        default: drawDefaultDetailed(ctx, width, height, t);
      }

      if (isPlaying) {
        timeRef.current += 0.02;
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [topicId, dimensions, isPlaying, param]);

  const handleReset = () => {
    timeRef.current = 0;
    setParam(0.5);
  };

  return (
    <div ref={containerRef} className="mt-12 p-6 rounded-2xl bg-secondary/30 border border-border/50">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div>
          <h3 className="font-display text-xl text-foreground mb-2">{config.title}</h3>
          <p className="text-sm text-muted-foreground max-w-xl">{config.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? "To'xtatish" : "Boshlash"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      {config.labels && config.labels.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {config.labels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div 
                className="w-4 h-3 rounded" 
                style={{ backgroundColor: label.color }}
              />
              <span className="text-xs text-muted-foreground">{label.text}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="rounded-lg border border-border/30"
        />
      </div>

      {/* Parameter slider for some visualizations */}
      {(topicId === 'M1' || topicId === 'M5') && (
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">x nuqtasi:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={param}
            onChange={(e) => setParam(parseFloat(e.target.value))}
            className="flex-1 max-w-xs"
          />
          <span className="text-sm font-mono text-foreground">
            x = {((param - 0.5) * 6).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

// Grid drawing helper
function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.2)';
  ctx.lineWidth = 0.5;
  
  const gridSize = 30;
  for (let x = 0; x <= w; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, h/2);
  ctx.lineTo(w, h/2);
  ctx.moveTo(w/2, 0);
  ctx.lineTo(w/2, h);
  ctx.stroke();
}

// M1: Derivatives with tangent line
function drawDerivativesDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, param: number) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = 25;

  // f(x) = x³ - 3x
  ctx.beginPath();
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2.5;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    const y = Math.pow(x, 3) - 3 * x;
    const py = cy - y * scale;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();

  // f'(x) = 3x² - 3
  ctx.beginPath();
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    const y = 3 * Math.pow(x, 2) - 3;
    const py = cy - y * scale * 0.3;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Tangent line at point
  const tx = (param - 0.5) * 6;
  const ty = Math.pow(tx, 3) - 3 * tx;
  const slope = 3 * Math.pow(tx, 2) - 3;
  
  const px = cx + tx * scale;
  const py = cy - ty * scale;

  // Draw tangent
  ctx.beginPath();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  const tanLen = 80;
  ctx.moveTo(px - tanLen, py + slope * tanLen);
  ctx.lineTo(px + tanLen, py - slope * tanLen);
  ctx.stroke();

  // Point on curve
  ctx.beginPath();
  ctx.fillStyle = '#ef4444';
  ctx.arc(px, Math.max(15, Math.min(h - 15, py)), 6, 0, Math.PI * 2);
  ctx.fill();

  // Label
  ctx.font = '12px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`f'(${tx.toFixed(1)}) = ${slope.toFixed(2)}`, px + 10, Math.max(25, Math.min(h - 25, py - 10)));
}

// M2: Extremums
function drawExtremumsDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = 20;

  // f(x) = -x⁴ + 2x² + 0.5
  ctx.beginPath();
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2.5;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / (scale * 2);
    const y = -Math.pow(x, 4) + 2 * Math.pow(x, 2) + 0.5;
    const py = cy - y * scale * 3;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();

  // Mark critical points
  const criticalPoints = [
    { x: -1, type: 'max' },
    { x: 0, type: 'min' },
    { x: 1, type: 'max' }
  ];

  const pulse = (Math.sin(t * 3) + 1) / 2;

  criticalPoints.forEach(pt => {
    const px = cx + pt.x * scale * 2;
    const y = -Math.pow(pt.x, 4) + 2 * Math.pow(pt.x, 2) + 0.5;
    const py = cy - y * scale * 3;
    
    ctx.beginPath();
    ctx.fillStyle = pt.type === 'max' ? '#ef4444' : '#22c55e';
    ctx.arc(px, py, 8 + pulse * 4, 0, Math.PI * 2);
    ctx.fill();

    // Glow effect
    ctx.beginPath();
    ctx.fillStyle = pt.type === 'max' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)';
    ctx.arc(px, py, 15 + pulse * 8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Labels
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#ef4444';
  ctx.fillText('Max', cx - scale * 2 - 15, cy - 2.5 * scale * 3 - 20);
  ctx.fillText('Max', cx + scale * 2 - 15, cy - 2.5 * scale * 3 - 20);
  ctx.fillStyle = '#22c55e';
  ctx.fillText('Min', cx - 12, cy - 0.5 * scale * 3 + 25);
}

// M3: Indefinite integral
function drawIntegralDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = 25;

  // f(x) = cos(x)
  ctx.beginPath();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    const y = Math.cos(x);
    const py = cy - y * scale * 1.5;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // F(x) = sin(x) - animated drawing
  const progress = (t % 8) / 8;
  ctx.beginPath();
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;
  for (let px = 0; px < w * progress; px++) {
    const x = (px - cx) / scale;
    const y = Math.sin(x);
    const py = cy - y * scale * 1.5;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Integral symbol
  ctx.font = 'bold 28px serif';
  ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
  ctx.fillText('∫', 15, 40);
  ctx.font = '14px serif';
  ctx.fillText('cos(x)dx = sin(x) + C', 45, 35);
}

// M4: Trigonometric functions
function drawTrigDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = 25;

  // sin(x) - animated
  ctx.beginPath();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2.5;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale + t * 0.5;
    const y = Math.sin(x);
    const py = cy - y * scale * 1.5;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // cos(x) - animated
  ctx.beginPath();
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2.5;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale + t * 0.5;
    const y = Math.cos(x);
    const py = cy - y * scale * 1.5;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Period markers
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
  ctx.setLineDash([4, 4]);
  ctx.lineWidth = 1;
  [-Math.PI, 0, Math.PI, 2*Math.PI].forEach(x => {
    const px = cx + (x - t * 0.5) * scale;
    if (px > 0 && px < w) {
      ctx.beginPath();
      ctx.moveTo(px, cy - 50);
      ctx.lineTo(px, cy + 50);
      ctx.stroke();
    }
  });
  ctx.setLineDash([]);
}

// M5: Definite integral with Riemann sum
function drawDefiniteIntegralDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h * 0.6;
  const scale = 30;
  const a = -2, b = 2;

  // Function
  const f = (x: number) => Math.sin(x) + 1.5;

  // Riemann rectangles - animated
  const n = Math.floor((t % 10) * 3) + 4;
  const dx = (b - a) / n;
  
  for (let i = 0; i < n; i++) {
    const xi = a + i * dx;
    const px = cx + xi * scale;
    const yi = f(xi + dx/2);
    const rectH = yi * scale * 0.8;
    
    ctx.fillStyle = `hsla(${120 + i * 10}, 60%, 50%, 0.4)`;
    ctx.fillRect(px, cy - rectH, dx * scale, rectH);
    ctx.strokeStyle = `hsla(${120 + i * 10}, 60%, 50%, 0.8)`;
    ctx.lineWidth = 1;
    ctx.strokeRect(px, cy - rectH, dx * scale, rectH);
  }

  // Curve
  ctx.beginPath();
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 3;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    const y = f(x);
    const py = cy - y * scale * 0.8;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();

  // Bounds
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);
  [a, b].forEach(x => {
    const px = cx + x * scale;
    ctx.beginPath();
    ctx.moveTo(px, cy);
    ctx.lineTo(px, cy - f(x) * scale * 0.8);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  // Label
  ctx.font = '14px serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`n = ${n} to'rtburchak`, 15, 25);
}

// M6: Improper integral
function drawImproperIntegralDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cy = h * 0.7;
  const scale = 40;

  // Area under 1/x²
  const progress = (t % 6) / 6;
  ctx.beginPath();
  ctx.moveTo(30, cy);
  for (let px = 30; px < 30 + (w - 60) * progress; px++) {
    const x = (px - 10) / scale;
    if (x > 0.3) {
      const y = 1 / (x * x);
      const py = cy - y * scale * 0.8;
      ctx.lineTo(px, Math.max(10, py));
    }
  }
  ctx.lineTo(30 + (w - 60) * progress, cy);
  ctx.closePath();
  ctx.fillStyle = 'rgba(249, 115, 22, 0.3)';
  ctx.fill();

  // Curve
  ctx.beginPath();
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2.5;
  for (let px = 30; px < w; px++) {
    const x = (px - 10) / scale;
    if (x > 0.3) {
      const y = 1 / (x * x);
      const py = cy - y * scale * 0.8;
      if (px === 30) ctx.moveTo(px, Math.max(10, py));
      else ctx.lineTo(px, Math.max(10, py));
    }
  }
  ctx.stroke();

  // Infinity arrow
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(w - 50, cy);
  ctx.lineTo(w - 20, cy);
  ctx.lineTo(w - 30, cy - 8);
  ctx.moveTo(w - 20, cy);
  ctx.lineTo(w - 30, cy + 8);
  ctx.stroke();

  ctx.font = '20px serif';
  ctx.fillStyle = '#f97316';
  ctx.fillText('∞', w - 25, cy - 15);
}

// M7: 3D Surface
function drawSurfaceDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  
  // Isometric 3D surface
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `hsla(${260 + i * 3}, 70%, ${50 + i * 2}%, 0.7)`;
    ctx.lineWidth = 1.5;
    
    const z = (i - 7) * 8;
    for (let px = 0; px < w; px += 3) {
      const x = (px - cx) / 30;
      const y = Math.sin(x * 2 + t) * 20 * Math.cos(z / 50 + t * 0.5);
      const screenX = px;
      const screenY = cy - y - z;
      if (px === 0) ctx.moveTo(screenX, screenY);
      else ctx.lineTo(screenX, screenY);
    }
    ctx.stroke();
  }

  // Cross-sections
  for (let j = 0; j < 8; j++) {
    ctx.beginPath();
    ctx.strokeStyle = `hsla(180, 70%, 60%, 0.3)`;
    ctx.lineWidth = 1;
    
    const px = j * (w / 8);
    for (let i = 0; i < 15; i++) {
      const x = (px - cx) / 30;
      const z = (i - 7) * 8;
      const y = Math.sin(x * 2 + t) * 20 * Math.cos(z / 50 + t * 0.5);
      const screenY = cy - y - z;
      if (i === 0) ctx.moveTo(px, screenY);
      else ctx.lineTo(px, screenY);
    }
    ctx.stroke();
  }
}

// M8: Gradient field
function drawGradientDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const gridSize = 35;
  const arrowLen = 14;

  for (let x = gridSize; x < w - 20; x += gridSize) {
    for (let y = gridSize; y < h - 20; y += gridSize) {
      const dx = Math.sin((x - w/2) / 50 + t) * Math.cos((y - h/2) / 50);
      const dy = Math.cos((x - w/2) / 50) * Math.sin((y - h/2) / 50 + t);
      const mag = Math.sqrt(dx*dx + dy*dy);
      const angle = Math.atan2(dy, dx);
      
      const len = arrowLen * mag * 1.5;
      const endX = x + Math.cos(angle) * len;
      const endY = y + Math.sin(angle) * len;

      // Arrow body
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${(angle * 180 / Math.PI + 180) % 360}, 70%, 60%)`;
      ctx.lineWidth = 2;
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Arrow head
      ctx.beginPath();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.moveTo(endX, endY);
      ctx.lineTo(endX - Math.cos(angle - 0.5) * 6, endY - Math.sin(angle - 0.5) * 6);
      ctx.lineTo(endX - Math.cos(angle + 0.5) * 6, endY - Math.sin(angle + 0.5) * 6);
      ctx.closePath();
      ctx.fill();
    }
  }
}

// M9: Family of solutions
function drawDiffEqFamilyDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = 20;

  const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  for (let c = -2; c <= 2; c++) {
    ctx.beginPath();
    ctx.strokeStyle = colors[c + 2];
    ctx.lineWidth = 2.5;
    
    for (let px = 0; px < w; px++) {
      const x = (px - 20) / scale;
      const y = (c * 0.5 + 1) * Math.exp(-x * 0.3) * Math.sin(x + t);
      const py = cy - y * scale * 1.5;
      if (px === 0) ctx.moveTo(px, Math.max(10, Math.min(h - 10, py)));
      else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
    }
    ctx.stroke();
  }

  // Initial condition marker
  ctx.beginPath();
  ctx.fillStyle = '#ffffff';
  ctx.arc(20, cy, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('y(0) = C', 30, cy - 10);
}

// M10: Damped oscillation
function drawDampedOscillation(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = 25;

  // Envelope curves
  ctx.setLineDash([5, 5]);
  ctx.lineWidth = 1.5;
  
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
  for (let px = 0; px < w; px++) {
    const x = (px - 20) / scale;
    const y = 2 * Math.exp(-x * 0.3);
    const py = cy - y * scale;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, py));
  }
  ctx.stroke();

  ctx.beginPath();
  for (let px = 0; px < w; px++) {
    const x = (px - 20) / scale;
    const y = -2 * Math.exp(-x * 0.3);
    const py = cy - y * scale;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.min(h - 10, py));
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Main oscillation
  ctx.beginPath();
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 3;
  for (let px = 0; px < w; px++) {
    const x = (px - 20) / scale;
    const y = 2 * Math.exp(-x * 0.3) * Math.cos(x * 2 + t);
    const py = cy - y * scale;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();
}

// M11: Second order DE
function drawSecondOrderDE(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cy = h / 2;
  const scale = 25;

  // Complex oscillation
  ctx.beginPath();
  ctx.strokeStyle = '#14b8a6';
  ctx.lineWidth = 3;
  for (let px = 0; px < w; px++) {
    const x = (px - 20) / scale;
    const y = Math.sin(x + t) * Math.cos(x * 0.5) * 1.5;
    const py = cy - y * scale;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();

  // Second derivative indication
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
  ctx.lineWidth = 2;
  for (let px = 0; px < w; px++) {
    const x = (px - 20) / scale;
    const y = -Math.sin(x + t) * Math.cos(x * 0.5) - Math.sin(x + t) * 0.25 * Math.sin(x * 0.5);
    const py = cy - y * scale * 0.8;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();
}

// M12: Linear combination
function drawLinearCombination(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cy = h / 2;
  const scale = 30;

  const c1 = Math.sin(t);
  const c2 = Math.cos(t);

  // y1 component
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 4]);
  for (let px = 0; px < w; px++) {
    const x = (px - 20) / scale;
    const y = Math.exp(-x * 0.3) * c1;
    const py = cy - y * scale;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // Combined solution
  ctx.beginPath();
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 3;
  for (let px = 0; px < w; px++) {
    const x = (px - 20) / scale;
    const y = c1 * Math.exp(-x * 0.3) + c2 * Math.exp(-x * 0.5) * Math.sin(x);
    const py = cy - y * scale;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();
}

// M13: Series sum
function drawSeriesSum(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const n = Math.floor((t % 8) * 2) + 1;
  const barWidth = Math.min(40, (w - 100) / 15);
  const baseY = h - 40;

  let sum = 0;
  for (let i = 1; i <= Math.min(n, 12); i++) {
    const term = 1 / i;
    sum += term;
    const barHeight = term * 80;
    const x = 40 + (i - 1) * (barWidth + 5);
    
    ctx.fillStyle = `hsla(${200 + i * 15}, 70%, 55%, 0.8)`;
    ctx.fillRect(x, baseY - barHeight, barWidth, barHeight);
    
    ctx.font = '10px monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`1/${i}`, x + 2, baseY + 15);
  }

  // Sum line
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(30, baseY - sum * 25);
  ctx.lineTo(w - 30, baseY - sum * 25);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = '14px monospace';
  ctx.fillStyle = '#ef4444';
  ctx.fillText(`S${n} = ${sum.toFixed(3)}`, w - 100, baseY - sum * 25 - 10);
}

// M14: Convergence
function drawConvergenceDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cy = h / 2;
  const limit = cy - 30;

  // Limit line
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, limit);
  ctx.lineTo(w - 30, limit);
  ctx.stroke();

  // Epsilon band
  const epsilon = 30 * (0.3 + 0.7 * Math.abs(Math.sin(t * 0.5)));
  ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
  ctx.fillRect(30, limit - epsilon, w - 60, epsilon * 2);

  // Sequence points
  const n = 15;
  for (let i = 1; i <= n; i++) {
    const x = 30 + (i / n) * (w - 60);
    const deviation = (50 / i) * Math.pow(-1, i);
    const y = limit + deviation;
    
    ctx.beginPath();
    ctx.fillStyle = Math.abs(deviation) < epsilon ? '#22c55e' : '#8b5cf6';
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Labels
  ctx.font = '14px serif';
  ctx.fillStyle = '#22c55e';
  ctx.fillText('L', w - 25, limit - 5);
  ctx.font = '12px serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`ε = ${(epsilon / 30).toFixed(2)}`, w - 80, 25);
}

// M15: Function approximation
function drawFunctionApprox(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = 20;
  const n = Math.floor((t % 6) * 2) + 1;

  // Target function
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
  ctx.lineWidth = 2;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    const y = Math.atan(x);
    const py = cy - y * scale * 1.2;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Approximation
  ctx.beginPath();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.5;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    let y = 0;
    for (let k = 0; k < n; k++) {
      y += Math.pow(-1, k) * Math.pow(x, 2*k + 1) / (2*k + 1);
    }
    const py = cy - y * scale * 1.2;
    if (px === 0) ctx.moveTo(px, Math.max(10, Math.min(h - 10, py)));
    else ctx.lineTo(px, Math.max(10, Math.min(h - 10, py)));
  }
  ctx.stroke();

  ctx.font = '14px monospace';
  ctx.fillStyle = '#f59e0b';
  ctx.fillText(`n = ${n} had`, 20, 25);
}

// M16: Taylor approximation
function drawTaylorApprox(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const scale = 25;
  const terms = Math.floor((t % 8)) + 1;

  // sin(x)
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
  ctx.lineWidth = 2;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    const y = Math.sin(x);
    const py = cy - y * scale * 1.5;
    if (px === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Taylor series
  ctx.beginPath();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  for (let px = 0; px < w; px++) {
    const x = (px - cx) / scale;
    let y = 0;
    let factorial = 1;
    for (let n = 0; n < terms; n++) {
      if (n > 0) factorial *= (2*n) * (2*n + 1);
      y += Math.pow(-1, n) * Math.pow(x, 2*n + 1) / factorial;
    }
    const py = cy - y * scale * 1.5;
    if (px === 0) ctx.moveTo(px, Math.max(5, Math.min(h - 5, py)));
    else ctx.lineTo(px, Math.max(5, Math.min(h - 5, py)));
  }
  ctx.stroke();

  // Formula
  ctx.font = '12px serif';
  ctx.fillStyle = '#f59e0b';
  let formula = 'x';
  if (terms > 1) formula += ' - x³/3!';
  if (terms > 2) formula += ' + x⁵/5!';
  if (terms > 3) formula += ' - ...';
  ctx.fillText(`sin(x) ≈ ${formula}`, 15, 25);
  ctx.fillText(`(${terms} had)`, 15, 42);
}

// M17: Double integral region
function drawDoubleIntegralDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const gridSize = 12;
  const progress = (Math.sin(t) + 1) / 2;

  // Integration region (ellipse)
  for (let gx = 0; gx < w; gx += gridSize) {
    for (let gy = 0; gy < h; gy += gridSize) {
      const dx = (gx - cx) / 120;
      const dy = (gy - cy) / 80;
      const dist = dx*dx + dy*dy;
      
      if (dist < 1) {
        const phase = (gx + gy) / 100 - t;
        const alpha = dist < progress ? 0.6 : 0.2;
        ctx.fillStyle = `hsla(${140 + phase * 30}, 60%, 50%, ${alpha})`;
        ctx.fillRect(gx, gy, gridSize - 1, gridSize - 1);
      }
    }
  }

  // Region boundary
  ctx.beginPath();
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  ctx.ellipse(cx, cy, 120, 80, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Symbol
  ctx.font = 'bold 24px serif';
  ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
  ctx.fillText('∬', 15, 35);
  ctx.font = '14px serif';
  ctx.fillText('f(x,y) dA', 50, 30);
}

// M18: Triple integral volume
function drawTripleIntegralDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h / 2;
  const size = 60;
  const angle = t * 0.3;

  // 3D cube with rotation
  const vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
  ].map(([x, y, z]) => {
    // Rotate around Y axis
    const rx = x * Math.cos(angle) - z * Math.sin(angle);
    const rz = x * Math.sin(angle) + z * Math.cos(angle);
    // Rotate around X axis
    const ry = y * Math.cos(angle * 0.5) - rz * Math.sin(angle * 0.5);
    const rz2 = y * Math.sin(angle * 0.5) + rz * Math.cos(angle * 0.5);
    // Project to 2D
    return [cx + rx * size, cy + ry * size * 0.7 - rz2 * size * 0.3];
  });

  const faces = [
    { indices: [0, 1, 2, 3], color: 'rgba(139, 92, 246, 0.3)' },
    { indices: [4, 5, 6, 7], color: 'rgba(139, 92, 246, 0.4)' },
    { indices: [0, 1, 5, 4], color: 'rgba(99, 102, 241, 0.3)' },
    { indices: [2, 3, 7, 6], color: 'rgba(99, 102, 241, 0.4)' },
    { indices: [0, 3, 7, 4], color: 'rgba(168, 85, 247, 0.3)' },
    { indices: [1, 2, 6, 5], color: 'rgba(168, 85, 247, 0.4)' }
  ];

  // Draw faces
  faces.forEach(face => {
    ctx.beginPath();
    ctx.fillStyle = face.color;
    face.indices.forEach((vi, i) => {
      if (i === 0) ctx.moveTo(vertices[vi][0], vertices[vi][1]);
      else ctx.lineTo(vertices[vi][0], vertices[vi][1]);
    });
    ctx.closePath();
    ctx.fill();
  });

  // Draw edges
  const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7]
  ];

  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(vertices[a][0], vertices[a][1]);
    ctx.lineTo(vertices[b][0], vertices[b][1]);
    ctx.stroke();
  });

  // Grid inside
  const progress = (Math.sin(t * 2) + 1) / 2;
  const layers = 3;
  for (let l = 0; l < layers; l++) {
    const z = -1 + (l + 0.5) * 2 / layers;
    if (l / layers < progress) {
      const layerVerts = [[-1, -1, z], [1, -1, z], [1, 1, z], [-1, 1, z]].map(([x, y, z]) => {
        const rx = x * Math.cos(angle) - z * Math.sin(angle);
        const rz = x * Math.sin(angle) + z * Math.cos(angle);
        const ry = y * Math.cos(angle * 0.5) - rz * Math.sin(angle * 0.5);
        const rz2 = y * Math.sin(angle * 0.5) + rz * Math.cos(angle * 0.5);
        return [cx + rx * size * 0.8, cy + ry * size * 0.7 * 0.8 - rz2 * size * 0.3 * 0.8];
      });

      ctx.beginPath();
      ctx.fillStyle = `hsla(${260 + l * 20}, 60%, 50%, 0.3)`;
      layerVerts.forEach((v, i) => {
        if (i === 0) ctx.moveTo(v[0], v[1]);
        else ctx.lineTo(v[0], v[1]);
      });
      ctx.closePath();
      ctx.fill();
    }
  }

  // Symbol
  ctx.font = 'bold 22px serif';
  ctx.fillStyle = 'rgba(139, 92, 246, 0.9)';
  ctx.fillText('∭', 15, 35);
  ctx.font = '14px serif';
  ctx.fillText('f(x,y,z) dV', 50, 30);
}

// Default
function drawDefaultDetailed(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cy = h / 2;
  ctx.beginPath();
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2.5;
  for (let x = 0; x < w; x++) {
    const y = cy - Math.sin(x / 20 + t) * 40;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}
