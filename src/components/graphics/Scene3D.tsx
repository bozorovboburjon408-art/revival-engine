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

export const Scene3D = ({ visualization }: Scene3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0.5, y: 0, z: 0 });
  const [params, setParams] = useState(visualization.defaultParams || {});
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setParams(visualization.defaultParams || {});
  }, [visualization]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const fov = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    // Helpers
    const project = (p: Point3D): { x: number; y: number; z: number } => {
      const scale = fov / (fov + p.z);
      return {
        x: p.x * scale + centerX,
        y: -p.y * scale + centerY,
        z: p.z
      };
    };

    const rotateX = (p: Point3D, a: number): Point3D => {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
    };

    const rotateY = (p: Point3D, a: number): Point3D => {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
    };

    const rotateZ = (p: Point3D, a: number): Point3D => {
      const c = Math.cos(a), s = Math.sin(a);
      return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
    };

    const transform = (p: Point3D): Point3D => {
      const r = rotationRef.current;
      let t = rotateX(p, r.x);
      t = rotateY(t, r.y);
      t = rotateZ(t, r.z);
      return t;
    };

    const cross = (a: Point3D, b: Point3D): Point3D => ({
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    });

    const sub = (a: Point3D, b: Point3D): Point3D => ({
      x: a.x - b.x, y: a.y - b.y, z: a.z - b.z
    });

    const normalize = (v: Point3D): Point3D => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return len > 0.001 ? { x: v.x / len, y: v.y / len, z: v.z / len } : { x: 0, y: 0, z: 1 };
    };

    const dot = (a: Point3D, b: Point3D): number => a.x * b.x + a.y * b.y + a.z * b.z;

    // Generate mesh grid
    const generateGrid = (): Point3D[][] => {
      const { R = 2, r = 0.7, height = 3, radius = 1.5, scale = 0.5,
              amplitude = 1, frequency = 1, pitch = 0.5, turns = 5,
              width: mobiusWidth = 1 } = params;
      const s = 70;
      const grid: Point3D[][] = [];
      let rows: number, cols: number;

      switch (visualization.formula) {
        case 'sphere':
          rows = 20; cols = 30;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const phi = (i / rows) * Math.PI;
            for (let j = 0; j <= cols; j++) {
              const theta = (j / cols) * Math.PI * 2;
              row.push({
                x: R * s * Math.sin(phi) * Math.cos(theta),
                y: R * s * Math.cos(phi),
                z: R * s * Math.sin(phi) * Math.sin(theta)
              });
            }
            grid.push(row);
          }
          break;

        case 'torus':
          rows = 24; cols = 36;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const u = (i / rows) * Math.PI * 2;
            for (let j = 0; j <= cols; j++) {
              const v = (j / cols) * Math.PI * 2;
              row.push({
                x: (R + r * Math.cos(v)) * Math.cos(u) * s,
                y: r * Math.sin(v) * s,
                z: (R + r * Math.cos(v)) * Math.sin(u) * s
              });
            }
            grid.push(row);
          }
          break;

        case 'cone':
          rows = 20; cols = 30;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const h = (i / rows);
            const rr = (1 - h) * radius;
            for (let j = 0; j <= cols; j++) {
              const theta = (j / cols) * Math.PI * 2;
              row.push({
                x: rr * Math.cos(theta) * s,
                y: (h * height - height / 2) * s,
                z: rr * Math.sin(theta) * s
              });
            }
            grid.push(row);
          }
          break;

        case 'cylinder':
          rows = 20; cols = 30;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const h = (i / rows - 0.5) * height;
            for (let j = 0; j <= cols; j++) {
              const theta = (j / cols) * Math.PI * 2;
              row.push({
                x: R * Math.cos(theta) * s,
                y: h * s,
                z: R * Math.sin(theta) * s
              });
            }
            grid.push(row);
          }
          break;

        case 'paraboloid':
          rows = 25; cols = 30;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const rr = (i / rows) * 2;
            for (let j = 0; j <= cols; j++) {
              const theta = (j / cols) * Math.PI * 2;
              const x = rr * Math.cos(theta);
              const z = rr * Math.sin(theta);
              const y = scale * (x * x + z * z) - 1;
              row.push({ x: x * s, y: y * s, z: z * s });
            }
            grid.push(row);
          }
          break;

        case 'saddle':
          rows = 25; cols = 25;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const x = (i / rows - 0.5) * 4;
            for (let j = 0; j <= cols; j++) {
              const z = (j / cols - 0.5) * 4;
              const y = scale * (x * x - z * z);
              row.push({ x: x * s * 0.5, y: y * s * 0.5, z: z * s * 0.5 });
            }
            grid.push(row);
          }
          break;

        case 'wave':
          rows = 30; cols = 30;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const x = (i / rows - 0.5) * 6;
            for (let j = 0; j <= cols; j++) {
              const z = (j / cols - 0.5) * 6;
              const y = amplitude * Math.sin(frequency * x) * Math.cos(frequency * z);
              row.push({ x: x * s * 0.35, y: y * s * 0.35, z: z * s * 0.35 });
            }
            grid.push(row);
          }
          break;

        case 'ripple':
          rows = 30; cols = 30;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const x = (i / rows - 0.5) * 6;
            for (let j = 0; j <= cols; j++) {
              const z = (j / cols - 0.5) * 6;
              const dist = Math.sqrt(x * x + z * z);
              const y = amplitude * Math.sin(frequency * dist * 2) / (dist + 0.5);
              row.push({ x: x * s * 0.35, y: y * s * 0.35, z: z * s * 0.35 });
            }
            grid.push(row);
          }
          break;

        case 'helix':
          rows = 80; cols = 12;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const t = (i / rows) * turns * Math.PI * 2;
            const cx = R * Math.cos(t) * s * 0.4;
            const cy = pitch * t * s * 0.08;
            const cz = R * Math.sin(t) * s * 0.4;
            for (let j = 0; j <= cols; j++) {
              const angle = (j / cols) * Math.PI * 2;
              const tubeR = 12;
              row.push({
                x: cx + tubeR * Math.cos(angle) * Math.cos(t),
                y: cy + tubeR * Math.sin(angle),
                z: cz + tubeR * Math.cos(angle) * Math.sin(t)
              });
            }
            grid.push(row);
          }
          break;

        case 'hyperboloid':
          rows = 25; cols = 30;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const v = (i / rows - 0.5) * 2.5;
            for (let j = 0; j <= cols; j++) {
              const u = (j / cols) * Math.PI * 2;
              const x = Math.cosh(v) * Math.cos(u);
              const z = Math.cosh(v) * Math.sin(u);
              const y = Math.sinh(v);
              row.push({ x: x * s * 0.35, y: y * s * 0.35, z: z * s * 0.35 });
            }
            grid.push(row);
          }
          break;

        case 'mobius':
          rows = 50; cols = 12;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const u = (i / rows) * Math.PI * 2;
            for (let j = 0; j <= cols; j++) {
              const v = (j / cols - 0.5) * mobiusWidth;
              const x = (R + v * Math.cos(u / 2)) * Math.cos(u);
              const y = v * Math.sin(u / 2);
              const z = (R + v * Math.cos(u / 2)) * Math.sin(u);
              row.push({ x: x * s * 0.45, y: y * s * 0.45, z: z * s * 0.45 });
            }
            grid.push(row);
          }
          break;

        case 'klein':
          rows = 40; cols = 20;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const u = (i / rows) * Math.PI * 2;
            for (let j = 0; j <= cols; j++) {
              const v = (j / cols) * Math.PI * 2;
              const rr = 4 * (1 - Math.cos(u) / 2);
              let x: number, y: number, z: number;
              if (u < Math.PI) {
                x = 6 * Math.cos(u) * (1 + Math.sin(u)) + rr * Math.cos(u) * Math.cos(v);
                y = 16 * Math.sin(u) + rr * Math.sin(u) * Math.cos(v);
              } else {
                x = 6 * Math.cos(u) * (1 + Math.sin(u)) + rr * Math.cos(v + Math.PI);
                y = 16 * Math.sin(u);
              }
              z = rr * Math.sin(v);
              row.push({ x: x * s * 0.07, y: (y - 8) * s * 0.07, z: z * s * 0.07 });
            }
            grid.push(row);
          }
          break;

        default:
          rows = 20; cols = 30;
          for (let i = 0; i <= rows; i++) {
            const row: Point3D[] = [];
            const phi = (i / rows) * Math.PI;
            for (let j = 0; j <= cols; j++) {
              const theta = (j / cols) * Math.PI * 2;
              row.push({
                x: 80 * Math.sin(phi) * Math.cos(theta),
                y: 80 * Math.cos(phi),
                z: 80 * Math.sin(phi) * Math.sin(theta)
              });
            }
            grid.push(row);
          }
      }

      return grid;
    };

    // Light direction
    const lightDir = normalize({ x: 0.3, y: 0.8, z: 0.5 });

    const render = () => {
      // Clear
      ctx.fillStyle = 'hsl(222, 47%, 8%)';
      ctx.fillRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'hsl(222, 47%, 15%)';
      ctx.lineWidth = 0.5;
      for (let i = -3; i <= 3; i++) {
        const p1 = project(transform({ x: i * 80, y: 0, z: -240 }));
        const p2 = project(transform({ x: i * 80, y: 0, z: 240 }));
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        const p3 = project(transform({ x: -240, y: 0, z: i * 80 }));
        const p4 = project(transform({ x: 240, y: 0, z: i * 80 }));
        ctx.beginPath();
        ctx.moveTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.stroke();
      }

      const grid = generateGrid();
      const rows = grid.length - 1;
      const cols = grid[0].length - 1;

      // Create triangles
      type Triangle = {
        p1: Point3D; p2: Point3D; p3: Point3D;
        avgZ: number;
        normal: Point3D;
        centerY: number;
      };

      const triangles: Triangle[] = [];

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          // Get original points
          const a = grid[i][j];
          const b = grid[i][j + 1];
          const c = grid[i + 1][j + 1];
          const d = grid[i + 1][j];

          // Transform points
          const ta = transform(a);
          const tb = transform(b);
          const tc = transform(c);
          const td = transform(d);

          // Triangle 1: a, b, c
          const n1 = normalize(cross(sub(tb, ta), sub(tc, ta)));
          const avgZ1 = (ta.z + tb.z + tc.z) / 3;
          triangles.push({
            p1: ta, p2: tb, p3: tc,
            avgZ: avgZ1,
            normal: n1,
            centerY: (ta.y + tb.y + tc.y) / 3
          });

          // Triangle 2: a, c, d
          const n2 = normalize(cross(sub(tc, ta), sub(td, ta)));
          const avgZ2 = (ta.z + tc.z + td.z) / 3;
          triangles.push({
            p1: ta, p2: tc, p3: td,
            avgZ: avgZ2,
            normal: n2,
            centerY: (ta.y + tc.y + td.y) / 3
          });
        }
      }

      // Sort by depth - farthest first (painter's algorithm)
      triangles.sort((a, b) => b.avgZ - a.avgZ);

      // Draw triangles
      for (const tri of triangles) {
        // Simple back-face culling based on normal z
        // Skip faces pointing away from camera
        if (tri.normal.z > 0.1) continue;

        // Project
        const proj1 = project(tri.p1);
        const proj2 = project(tri.p2);
        const proj3 = project(tri.p3);

        // Lighting
        let brightness = -dot(tri.normal, lightDir);
        brightness = Math.max(0.2, Math.min(1, brightness * 0.7 + 0.3));

        // Color based on height
        const hue = 35 + (tri.centerY / 120) * 30;
        const sat = 75;
        const light = 25 + brightness * 45;

        ctx.fillStyle = `hsl(${hue}, ${sat}%, ${light}%)`;
        ctx.strokeStyle = `hsl(${hue}, ${sat}%, ${Math.max(10, light - 12)}%)`;
        ctx.lineWidth = 0.5;

        ctx.beginPath();
        ctx.moveTo(proj1.x, proj1.y);
        ctx.lineTo(proj2.x, proj2.y);
        ctx.lineTo(proj3.x, proj3.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Auto rotate
      if (autoRotate) {
        rotationRef.current.y += 0.006;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationRef.current);
  }, [visualization, params, autoRotate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      rotationRef.current.x += dy * 0.008;
      rotationRef.current.y += dx * 0.008;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetRotation = () => {
    rotationRef.current = { x: 0.5, y: 0, z: 0 };
  };

  const paramKeys = Object.keys(visualization.defaultParams || {});

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full rounded-lg cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center gap-2"
        >
          {autoRotate ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {autoRotate ? "To'xtatish" : "Aylantirish"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetRotation}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Qaytarish
        </Button>
      </div>

      {paramKeys.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
          {paramKeys.map((key) => {
            const defaultVal = visualization.defaultParams?.[key] ?? 1;
            const min = defaultVal * 0.1;
            const max = defaultVal * 3;
            return (
              <div key={key} className="space-y-2">
                <Label className="text-sm">
                  {key}: {(params[key] ?? defaultVal).toFixed(2)}
                </Label>
                <Slider
                  value={[params[key] ?? defaultVal]}
                  onValueChange={([value]) =>
                    setParams(prev => ({ ...prev, [key]: value }))
                  }
                  min={min}
                  max={max}
                  step={(max - min) / 50}
                  className="w-full"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
