import { useEffect, useRef, useState } from 'react';
import { Visualization3D } from '@/lib/visualizations';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface Scene3DProps {
  visualization: Visualization3D;
}

type Point3D = { x: number; y: number; z: number };

const project = (point: Point3D, width: number, height: number, fov: number): { x: number; y: number; scale: number } => {
  const factor = fov / (fov + point.z);
  return {
    x: point.x * factor + width / 2,
    y: -point.y * factor + height / 2,
    scale: factor
  };
};

const rotateX = (point: Point3D, angle: number): Point3D => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos
  };
};

const rotateY = (point: Point3D, angle: number): Point3D => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos
  };
};

const rotateZ = (point: Point3D, angle: number): Point3D => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos - point.y * sin,
    y: point.x * sin + point.y * cos,
    z: point.z
  };
};

export const Scene3D = ({ visualization }: Scene3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [params, setParams] = useState(visualization.defaultParams || {});
  const [rotation, setRotation] = useState({ x: 0.5, y: 0, z: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setParams(visualization.defaultParams || {});
  }, [visualization]);

  const generatePoints = (): Point3D[] => {
    const points: Point3D[] = [];
    const { R = 2, r = 0.7, height = 3, radius = 1.5, scale = 0.5,
            amplitude = 1, frequency = 1, pitch = 0.5, turns = 5,
            width: mobiusWidth = 1 } = params;
    const s = 80;

    switch (visualization.formula) {
      case 'sphere':
        for (let i = 0; i <= 20; i++) {
          for (let j = 0; j <= 40; j++) {
            const phi = (i / 20) * Math.PI;
            const theta = (j / 40) * Math.PI * 2;
            points.push({
              x: R * s * Math.sin(phi) * Math.cos(theta),
              y: R * s * Math.sin(phi) * Math.sin(theta),
              z: R * s * Math.cos(phi)
            });
          }
        }
        break;

      case 'torus':
        for (let i = 0; i <= 30; i++) {
          for (let j = 0; j <= 30; j++) {
            const u = (i / 30) * Math.PI * 2;
            const v = (j / 30) * Math.PI * 2;
            points.push({
              x: (R + r * Math.cos(v)) * Math.cos(u) * s,
              y: (R + r * Math.cos(v)) * Math.sin(u) * s,
              z: r * Math.sin(v) * s
            });
          }
        }
        break;

      case 'cone':
        for (let i = 0; i <= 20; i++) {
          for (let j = 0; j <= 30; j++) {
            const h = (i / 20) * height;
            const r = (1 - i / 20) * radius;
            const theta = (j / 30) * Math.PI * 2;
            points.push({
              x: r * Math.cos(theta) * s,
              y: (h - height / 2) * s,
              z: r * Math.sin(theta) * s
            });
          }
        }
        break;

      case 'cylinder':
        for (let i = 0; i <= 20; i++) {
          for (let j = 0; j <= 30; j++) {
            const h = (i / 20 - 0.5) * height;
            const theta = (j / 30) * Math.PI * 2;
            points.push({
              x: R * Math.cos(theta) * s,
              y: h * s,
              z: R * Math.sin(theta) * s
            });
          }
        }
        break;

      case 'paraboloid':
        for (let i = 0; i <= 25; i++) {
          for (let j = 0; j <= 30; j++) {
            const r = (i / 25) * 2;
            const theta = (j / 30) * Math.PI * 2;
            const x = r * Math.cos(theta);
            const z = r * Math.sin(theta);
            const y = scale * (x * x + z * z);
            points.push({ x: x * s, y: (y - 1) * s, z: z * s });
          }
        }
        break;

      case 'saddle':
        for (let i = 0; i <= 25; i++) {
          for (let j = 0; j <= 25; j++) {
            const x = (i / 25 - 0.5) * 4;
            const z = (j / 25 - 0.5) * 4;
            const y = scale * (x * x - z * z);
            points.push({ x: x * s * 0.5, y: y * s * 0.5, z: z * s * 0.5 });
          }
        }
        break;

      case 'wave':
        for (let i = 0; i <= 30; i++) {
          for (let j = 0; j <= 30; j++) {
            const x = (i / 30 - 0.5) * 6;
            const z = (j / 30 - 0.5) * 6;
            const y = amplitude * Math.sin(frequency * x) * Math.cos(frequency * z);
            points.push({ x: x * s * 0.4, y: y * s * 0.4, z: z * s * 0.4 });
          }
        }
        break;

      case 'ripple':
        for (let i = 0; i <= 30; i++) {
          for (let j = 0; j <= 30; j++) {
            const x = (i / 30 - 0.5) * 6;
            const z = (j / 30 - 0.5) * 6;
            const dist = Math.sqrt(x * x + z * z);
            const y = amplitude * Math.sin(frequency * dist * 2) / (dist + 0.5);
            points.push({ x: x * s * 0.4, y: y * s * 0.4, z: z * s * 0.4 });
          }
        }
        break;

      case 'helix':
        for (let i = 0; i <= 200; i++) {
          const t = (i / 200) * turns * Math.PI * 2;
          points.push({
            x: R * Math.cos(t) * s * 0.5,
            y: pitch * t * s * 0.1,
            z: R * Math.sin(t) * s * 0.5
          });
        }
        break;

      case 'hyperboloid':
        for (let i = 0; i <= 25; i++) {
          for (let j = 0; j <= 30; j++) {
            const v = (i / 25 - 0.5) * 3;
            const u = (j / 30) * Math.PI * 2;
            const x = Math.cosh(v) * Math.cos(u);
            const z = Math.cosh(v) * Math.sin(u);
            const y = Math.sinh(v);
            points.push({ x: x * s * 0.4, y: y * s * 0.4, z: z * s * 0.4 });
          }
        }
        break;

      case 'mobius':
        for (let i = 0; i <= 50; i++) {
          for (let j = 0; j <= 10; j++) {
            const u = (i / 50) * Math.PI * 2;
            const v = (j / 10 - 0.5) * mobiusWidth;
            const x = (R + v * Math.cos(u / 2)) * Math.cos(u);
            const y = (R + v * Math.cos(u / 2)) * Math.sin(u);
            const z = v * Math.sin(u / 2);
            points.push({ x: x * s * 0.5, y: z * s * 0.5, z: y * s * 0.5 });
          }
        }
        break;

      case 'klein':
        for (let i = 0; i <= 40; i++) {
          for (let j = 0; j <= 20; j++) {
            const u = (i / 40) * Math.PI * 2;
            const v = (j / 20) * Math.PI * 2;
            const r = 4 * (1 - Math.cos(u) / 2);
            let x, y, z;
            if (u < Math.PI) {
              x = 6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(u) * Math.cos(v);
              y = 16 * Math.sin(u) + r * Math.sin(u) * Math.cos(v);
            } else {
              x = 6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(v + Math.PI);
              y = 16 * Math.sin(u);
            }
            z = r * Math.sin(v);
            points.push({ x: x * s * 0.08, y: (y - 8) * s * 0.08, z: z * s * 0.08 });
          }
        }
        break;

      default:
        for (let i = 0; i <= 20; i++) {
          for (let j = 0; j <= 20; j++) {
            const phi = (i / 20) * Math.PI;
            const theta = (j / 20) * Math.PI * 2;
            points.push({
              x: 100 * Math.sin(phi) * Math.cos(theta),
              y: 100 * Math.sin(phi) * Math.sin(theta),
              z: 100 * Math.cos(phi)
            });
          }
        }
    }

    return points;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const fov = 300;

    const render = () => {
      ctx.fillStyle = 'hsl(222, 47%, 8%)';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'hsl(222, 47%, 15%)';
      ctx.lineWidth = 0.5;
      const gridSize = 100;
      for (let i = -3; i <= 3; i++) {
        const start = project(rotateY(rotateX({ x: i * gridSize, y: 0, z: -300 }, rotation.x), rotation.y), width, height, fov);
        const end = project(rotateY(rotateX({ x: i * gridSize, y: 0, z: 300 }, rotation.x), rotation.y), width, height, fov);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
      for (let i = -3; i <= 3; i++) {
        const start = project(rotateY(rotateX({ x: -300, y: 0, z: i * gridSize }, rotation.x), rotation.y), width, height, fov);
        const end = project(rotateY(rotateX({ x: 300, y: 0, z: i * gridSize }, rotation.x), rotation.y), width, height, fov);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      const points = generatePoints();
      
      // Transform and project points
      const projected = points.map(p => {
        let transformed = rotateX(p, rotation.x);
        transformed = rotateY(transformed, rotation.y);
        transformed = rotateZ(transformed, rotation.z);
        return { ...project(transformed, width, height, fov), z: transformed.z };
      });

      // Sort by depth
      projected.sort((a, b) => b.z - a.z);

      // Draw points
      projected.forEach(p => {
        const hue = 47 + (p.z / 200) * 30;
        const lightness = 50 + (p.z / 300) * 20;
        ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        const size = Math.max(1, 3 * p.scale);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (autoRotate) {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.01
        }));
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationRef.current);
  }, [visualization, params, rotation, autoRotate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      setRotation(prev => ({
        x: prev.x + dy * 0.01,
        y: prev.y + dx * 0.01,
        z: prev.z
      }));
      setLastMouse({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation({ x: 0.5, y: 0, z: 0 });
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
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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
                min={0.1}
                max={5}
                step={0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
