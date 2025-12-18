import { useEffect, useRef, useState } from 'react';

interface TopicVisualizationProps {
  topicId: string;
}

export const TopicVisualization = ({ topicId }: TopicVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 80 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
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

    const width = dimensions.width;
    const height = dimensions.height;
    let t = 0;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw based on topic
      switch (topicId) {
        case 'M1':
          drawDerivatives(ctx, width, height, t);
          break;
        case 'M2':
          drawExtremums(ctx, width, height, t);
          break;
        case 'M3':
          drawIndefiniteIntegral(ctx, width, height, t);
          break;
        case 'M4':
          drawTrigIntegrals(ctx, width, height, t);
          break;
        case 'M5':
          drawDefiniteIntegral(ctx, width, height, t);
          break;
        case 'M6':
          drawImproperIntegral(ctx, width, height, t);
          break;
        case 'M7':
          drawMultivariable(ctx, width, height, t);
          break;
        case 'M8':
          drawPartialDerivatives(ctx, width, height, t);
          break;
        case 'M9':
          drawDiffEqBasics(ctx, width, height, t);
          break;
        case 'M10':
          drawSpecialDiffEq(ctx, width, height, t);
          break;
        case 'M11':
          drawHigherOrderDiffEq(ctx, width, height, t);
          break;
        case 'M12':
          drawLinearDiffEq(ctx, width, height, t);
          break;
        case 'M13':
          drawNumericalSeries(ctx, width, height, t);
          break;
        case 'M14':
          drawConvergence(ctx, width, height, t);
          break;
        case 'M15':
          drawFunctionalSeries(ctx, width, height, t);
          break;
        case 'M16':
          drawTaylorFourier(ctx, width, height, t);
          break;
        case 'M17':
          drawDoubleIntegral(ctx, width, height, t);
          break;
        case 'M18':
          drawTripleIntegral(ctx, width, height, t);
          break;
        default:
          drawDefault(ctx, width, height, t);
      }

      t += 0.03;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [topicId, dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="rounded-lg w-full h-full"
      />
    </div>
  );
};

// M1: Yuqori tartibli hosilalar - f(x) va f'(x)
function drawDerivatives(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  
  // f(x) = x³ - asosiy funksiya (ko'k)
  ctx.beginPath();
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = (x - w/2) / 20;
    const y = centerY - (Math.pow(normalX, 3) - 3 * normalX) * 5 * Math.sin(t * 0.5 + 1);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, Math.max(5, Math.min(h - 5, y)));
  }
  ctx.stroke();

  // f'(x) = 3x² - hosila (yashil, animatsiyali)
  const progress = (Math.sin(t) + 1) / 2;
  ctx.beginPath();
  ctx.strokeStyle = `rgba(34, 197, 94, ${0.5 + progress * 0.5})`;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 2]);
  for (let x = 0; x < w * progress; x++) {
    const normalX = (x - w/2) / 20;
    const y = centerY - (3 * Math.pow(normalX, 2) - 3) * 3;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, Math.max(5, Math.min(h - 5, y)));
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

// M2: Funksiyaning monotonligi va ekstremumi
function drawExtremums(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  
  // Parabola shaklidagi funksiya
  ctx.beginPath();
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = (x - w/2) / 25;
    const y = centerY - (Math.sin(normalX * 2) * 20 + Math.cos(normalX) * 10);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Minimum va maksimum nuqtalar
  const pulse = Math.abs(Math.sin(t * 2));
  
  // Maksimum
  ctx.beginPath();
  ctx.fillStyle = `rgba(239, 68, 68, ${0.5 + pulse * 0.5})`;
  ctx.arc(w * 0.25, centerY - 25, 4 + pulse * 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Minimum
  ctx.beginPath();
  ctx.fillStyle = `rgba(34, 197, 94, ${0.5 + pulse * 0.5})`;
  ctx.arc(w * 0.75, centerY + 15, 4 + pulse * 2, 0, Math.PI * 2);
  ctx.fill();
}

// M3: Aniqmas integral - F(x) = ∫f(x)dx
function drawIndefiniteIntegral(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  
  // f(x) - integraldagi funksiya
  ctx.beginPath();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = (x - w/2) / 30;
    const y = centerY - Math.cos(normalX * 2) * 15;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // F(x) - integral (animatsiyali)
  const progress = (Math.sin(t) + 1) / 2;
  ctx.beginPath();
  ctx.strokeStyle = `rgba(59, 130, 246, ${0.6 + progress * 0.4})`;
  ctx.lineWidth = 2.5;
  for (let x = 0; x < w; x++) {
    const normalX = (x - w/2) / 30;
    const y = centerY - Math.sin(normalX * 2) * 15 * (0.5 + progress * 0.5);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // ∫ belgisi
  ctx.font = 'bold 20px serif';
  ctx.fillStyle = `rgba(139, 92, 246, ${0.5 + progress * 0.5})`;
  ctx.fillText('∫', 5, h - 10);
}

// M4: Trigonometrik integrallar
function drawTrigIntegrals(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  
  // sin(x)
  ctx.beginPath();
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = x / 15 + t;
    const y = centerY - Math.sin(normalX) * 20;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // cos(x)
  ctx.beginPath();
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = x / 15 + t;
    const y = centerY - Math.cos(normalX) * 20;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// M5: Aniq integral - area under curve
function drawDefiniteIntegral(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h * 0.6;
  const startX = w * 0.2;
  const endX = w * 0.8;
  
  // Area fill (animated)
  const progress = (Math.sin(t) + 1) / 2;
  ctx.beginPath();
  ctx.moveTo(startX, centerY);
  for (let x = startX; x <= startX + (endX - startX) * progress; x++) {
    const normalX = (x - w/2) / 20;
    const y = centerY - Math.sin(normalX + 1) * 20 - 10;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(startX + (endX - startX) * progress, centerY);
  ctx.closePath();
  ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
  ctx.fill();

  // Curve
  ctx.beginPath();
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = (x - w/2) / 20;
    const y = centerY - Math.sin(normalX + 1) * 20 - 10;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Vertical lines at bounds
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(startX, centerY);
  ctx.lineTo(startX, centerY - 30);
  ctx.moveTo(endX, centerY);
  ctx.lineTo(endX, centerY - 25);
  ctx.stroke();
  ctx.setLineDash([]);
}

// M6: Xosmas integrallar - curve to infinity
function drawImproperIntegral(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h * 0.7;
  
  // 1/x² kabi funksiya
  ctx.beginPath();
  ctx.strokeStyle = '#f97316';
  ctx.lineWidth = 2;
  for (let x = 10; x < w; x++) {
    const normalX = x / 20;
    const y = centerY - (30 / Math.pow(normalX, 1.5)) * Math.abs(Math.sin(t * 0.5 + 1));
    if (x === 10) ctx.moveTo(x, Math.max(5, y));
    else ctx.lineTo(x, Math.max(5, Math.min(h - 5, y)));
  }
  ctx.stroke();

  // ∞ belgisi
  ctx.font = 'bold 16px serif';
  ctx.fillStyle = `rgba(249, 115, 22, ${(Math.sin(t * 2) + 1) / 2})`;
  ctx.fillText('∞', w - 20, 15);
}

// M7: Ko'p o'zgaruvchili funksiyalar - 3D surface
function drawMultivariable(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // 3D sirt ko'rinishi
  for (let i = 0; i < 8; i++) {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 + i * 0.08})`;
    ctx.lineWidth = 1;
    
    const offsetY = i * 6;
    for (let x = 0; x < w; x++) {
      const normalX = (x - w/2) / 20;
      const y = h/2 - Math.sin(normalX + t + i * 0.3) * 10 - offsetY;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  
  // z o'qi
  ctx.strokeStyle = '#666';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(10, h - 10);
  ctx.lineTo(10, 10);
  ctx.moveTo(10, h - 10);
  ctx.lineTo(w - 10, h - 20);
  ctx.stroke();
}

// M8: Xususiy hosilalar - gradient vectors
function drawPartialDerivatives(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // Grid of gradient arrows
  const gridSize = 20;
  const arrowLen = 8;
  
  for (let x = gridSize; x < w - 10; x += gridSize) {
    for (let y = gridSize; y < h - 10; y += gridSize) {
      const angle = Math.atan2(y - h/2, x - w/2) + t;
      const len = arrowLen * (0.5 + Math.sin(t + x/20) * 0.5);
      
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${(x + y + t * 50) % 360}, 70%, 60%)`;
      ctx.lineWidth = 1.5;
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
      ctx.stroke();
      
      // Arrow head
      ctx.beginPath();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.arc(x + Math.cos(angle) * len, y + Math.sin(angle) * len, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// M9: Differensial tenglamalar asoslari
function drawDiffEqBasics(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  
  // Multiple solution curves (family of solutions)
  for (let c = -2; c <= 2; c++) {
    ctx.beginPath();
    ctx.strokeStyle = `hsla(${200 + c * 30}, 70%, 60%, 0.7)`;
    ctx.lineWidth = 1.5;
    
    for (let x = 0; x < w; x++) {
      const normalX = (x - 10) / 30;
      const y = centerY - (Math.exp(-normalX * 0.5) * Math.sin(normalX * 2 + t) + c * 0.3) * 15;
      if (x === 0) ctx.moveTo(x, Math.max(5, Math.min(h - 5, y)));
      else ctx.lineTo(x, Math.max(5, Math.min(h - 5, y)));
    }
    ctx.stroke();
  }
}

// M10: Maxsus tipli DT
function drawSpecialDiffEq(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  
  // Homogeneous equation solution
  ctx.beginPath();
  ctx.strokeStyle = '#ec4899';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = x / 20;
    const y = centerY - Math.exp(-normalX * 0.3) * Math.cos(normalX + t) * 25;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, Math.max(5, Math.min(h - 5, y)));
  }
  ctx.stroke();
  
  // Damping envelope
  ctx.setLineDash([3, 3]);
  ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const normalX = x / 20;
    const y = centerY - Math.exp(-normalX * 0.3) * 25;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const normalX = x / 20;
    const y = centerY + Math.exp(-normalX * 0.3) * 25;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
}

// M11: Yuqori tartibli DT
function drawHigherOrderDiffEq(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  
  // Complex oscillation (2nd order)
  ctx.beginPath();
  ctx.strokeStyle = '#14b8a6';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = x / 15;
    const y = centerY - (Math.sin(normalX + t) * Math.cos(normalX * 0.5)) * 20;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  
  // Second derivative indicator
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(20, 184, 166, 0.4)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < w; x++) {
    const normalX = x / 15;
    const y = centerY - (-Math.sin(normalX + t) * Math.cos(normalX * 0.5) - Math.sin(normalX + t) * 0.25 * Math.sin(normalX * 0.5)) * 15;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, Math.max(5, Math.min(h - 5, y)));
  }
  ctx.stroke();
}

// M12: Chiziqli DT
function drawLinearDiffEq(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  
  // Linear combination of solutions
  const c1 = Math.sin(t);
  const c2 = Math.cos(t);
  
  ctx.beginPath();
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = x / 20;
    const y = centerY - (c1 * Math.exp(-normalX * 0.5) + c2 * Math.exp(-normalX * 0.3) * Math.sin(normalX)) * 20;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, Math.max(5, Math.min(h - 5, y)));
  }
  ctx.stroke();
}

// M13: Sonli qatorlar - sum visualization
function drawNumericalSeries(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const n = Math.floor((Math.sin(t) + 1) * 5) + 3;
  const barWidth = w / 12;
  
  // Bars representing series terms
  for (let i = 1; i <= n; i++) {
    const barHeight = (1 / i) * 50;
    const x = i * (barWidth + 2);
    const y = h - 10 - barHeight;
    
    ctx.fillStyle = `hsla(${220 + i * 20}, 70%, 60%, 0.8)`;
    ctx.fillRect(x, y, barWidth, barHeight);
  }
  
  // Sum line
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += 1 / i;
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(0, h - 10 - sum * 15);
  ctx.lineTo(w, h - 10 - sum * 15);
  ctx.stroke();
  ctx.setLineDash([]);
}

// M14: Yaqinlashish alomatlari
function drawConvergence(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h * 0.6;
  const limit = centerY - 20;
  
  // Converging sequence
  for (let i = 1; i <= 10; i++) {
    const x = i * (w / 11);
    const y = limit + (30 / i) * Math.pow(-1, i) * Math.cos(t);
    
    ctx.beginPath();
    ctx.fillStyle = `hsla(${280 - i * 15}, 70%, 60%, 0.9)`;
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Limit line
  ctx.strokeStyle = 'rgba(34, 197, 94, 0.8)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(0, limit);
  ctx.lineTo(w, limit);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // L label
  ctx.font = 'bold 12px serif';
  ctx.fillStyle = '#22c55e';
  ctx.fillText('L', w - 15, limit - 5);
}

// M15: Funksional qatorlar
function drawFunctionalSeries(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  const n = Math.floor((Math.sin(t * 0.5) + 1) * 3) + 1;
  
  // Partial sums
  for (let k = 1; k <= n; k++) {
    ctx.beginPath();
    ctx.strokeStyle = `hsla(${200 + k * 40}, 70%, 60%, ${0.3 + k * 0.2})`;
    ctx.lineWidth = k === n ? 2 : 1;
    
    for (let x = 0; x < w; x++) {
      const normalX = (x - w/2) / 15;
      let y = 0;
      for (let i = 1; i <= k; i++) {
        y += Math.pow(-1, i+1) * Math.pow(normalX, 2*i-1) / (2*i-1);
      }
      const plotY = centerY - y * 10;
      if (x === 0) ctx.moveTo(x, Math.max(5, Math.min(h - 5, plotY)));
      else ctx.lineTo(x, Math.max(5, Math.min(h - 5, plotY)));
    }
    ctx.stroke();
  }
}

// M16: Teylor va Fure qatorlari
function drawTaylorFourier(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  const terms = Math.floor((Math.sin(t * 0.3) + 1) * 3) + 1;
  
  // Target function (sin x)
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x++) {
    const normalX = (x - w/2) / 15;
    const y = centerY - Math.sin(normalX) * 20;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  
  // Taylor approximation
  ctx.beginPath();
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const normalX = (x - w/2) / 15;
    let y = 0;
    let factorial = 1;
    for (let n = 0; n < terms; n++) {
      if (n > 0) factorial *= (2*n) * (2*n + 1);
      y += Math.pow(-1, n) * Math.pow(normalX, 2*n + 1) / factorial;
    }
    const plotY = centerY - y * 20;
    if (x === 0) ctx.moveTo(x, Math.max(5, Math.min(h - 5, plotY)));
    else ctx.lineTo(x, Math.max(5, Math.min(h - 5, plotY)));
  }
  ctx.stroke();
}

// M17: Ikki o'lchovli integral - 2D region
function drawDoubleIntegral(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // Animated grid representing integration region
  const gridSize = 10;
  const progress = (Math.sin(t) + 1) / 2;
  
  for (let x = 20; x < w - 20; x += gridSize) {
    for (let y = 20; y < h - 20; y += gridSize) {
      const dist = Math.sqrt(Math.pow(x - w/2, 2) + Math.pow(y - h/2, 2));
      if (dist < 30 + progress * 15) {
        const alpha = 0.3 + (1 - dist / 50) * 0.5;
        ctx.fillStyle = `hsla(${160 + dist * 2}, 70%, 50%, ${alpha})`;
        ctx.fillRect(x, y, gridSize - 1, gridSize - 1);
      }
    }
  }
  
  // Integration symbol
  ctx.font = 'bold 14px serif';
  ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
  ctx.fillText('∬', 3, 15);
}

// M18: Uch o'lchovli integral - 3D volume
function drawTripleIntegral(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // 3D cube wireframe with animation
  const cx = w / 2;
  const cy = h / 2;
  const size = 25;
  const angle = t * 0.5;
  
  // Rotate cube vertices
  const vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
  ].map(([x, y, z]) => {
    const rx = x * Math.cos(angle) - z * Math.sin(angle);
    const rz = x * Math.sin(angle) + z * Math.cos(angle);
    return [cx + rx * size, cy + y * size * 0.6 - rz * size * 0.3];
  });
  
  const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7]
  ];
  
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 1.5;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(vertices[a][0], vertices[a][1]);
    ctx.lineTo(vertices[b][0], vertices[b][1]);
    ctx.stroke();
  });
  
  // Fill some faces with transparency
  ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
  ctx.beginPath();
  ctx.moveTo(vertices[0][0], vertices[0][1]);
  ctx.lineTo(vertices[1][0], vertices[1][1]);
  ctx.lineTo(vertices[5][0], vertices[5][1]);
  ctx.lineTo(vertices[4][0], vertices[4][1]);
  ctx.closePath();
  ctx.fill();
  
  // Integration symbol
  ctx.font = 'bold 12px serif';
  ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
  ctx.fillText('∭', 3, 15);
}

// Default animation
function drawDefault(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const centerY = h / 2;
  ctx.beginPath();
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 2;
  for (let x = 0; x < w; x++) {
    const y = centerY - Math.sin(x / 10 + t) * 15;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}
