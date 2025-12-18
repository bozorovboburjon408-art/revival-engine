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
type Face = { vertices: Point3D[]; normal: Point3D; center: Point3D };

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

const crossProduct = (a: Point3D, b: Point3D): Point3D => ({
  x: a.y * b.z - a.z * b.y,
  y: a.z * b.x - a.x * b.z,
  z: a.x * b.y - a.y * b.x
});

const normalize = (v: Point3D): Point3D => {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  return len > 0 ? { x: v.x / len, y: v.y / len, z: v.z / len } : { x: 0, y: 0, z: 1 };
};

const dot = (a: Point3D, b: Point3D): number => a.x * b.x + a.y * b.y + a.z * b.z;

const subtract = (a: Point3D, b: Point3D): Point3D => ({
  x: a.x - b.x,
  y: a.y - b.y,
  z: a.z - b.z
});

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

  const generateMesh = (): { grid: Point3D[][]; rows: number; cols: number } => {
    const { R = 2, r = 0.7, height = 3, radius = 1.5, scale = 0.5,
            amplitude = 1, frequency = 1, pitch = 0.5, turns = 5,
            width: mobiusWidth = 1 } = params;
    const s = 80;
    
    const grid: Point3D[][] = [];
    let rows = 0, cols = 0;

    switch (visualization.formula) {
      case 'sphere':
        rows = 25; cols = 40;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          for (let j = 0; j <= cols; j++) {
            const phi = (i / rows) * Math.PI;
            const theta = (j / cols) * Math.PI * 2;
            row.push({
              x: R * s * Math.sin(phi) * Math.cos(theta),
              y: R * s * Math.sin(phi) * Math.sin(theta),
              z: R * s * Math.cos(phi)
            });
          }
          grid.push(row);
        }
        break;

      case 'torus':
        rows = 30; cols = 40;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          for (let j = 0; j <= cols; j++) {
            const u = (i / rows) * Math.PI * 2;
            const v = (j / cols) * Math.PI * 2;
            row.push({
              x: (R + r * Math.cos(v)) * Math.cos(u) * s,
              y: (R + r * Math.cos(v)) * Math.sin(u) * s,
              z: r * Math.sin(v) * s
            });
          }
          grid.push(row);
        }
        break;

      case 'cone':
        rows = 25; cols = 40;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          const h = (i / rows) * height;
          const rr = (1 - i / rows) * radius;
          for (let j = 0; j <= cols; j++) {
            const theta = (j / cols) * Math.PI * 2;
            row.push({
              x: rr * Math.cos(theta) * s,
              y: (h - height / 2) * s,
              z: rr * Math.sin(theta) * s
            });
          }
          grid.push(row);
        }
        break;

      case 'cylinder':
        rows = 25; cols = 40;
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
        rows = 30; cols = 40;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          const rr = (i / rows) * 2;
          for (let j = 0; j <= cols; j++) {
            const theta = (j / cols) * Math.PI * 2;
            const x = rr * Math.cos(theta);
            const z = rr * Math.sin(theta);
            const y = scale * (x * x + z * z);
            row.push({ x: x * s, y: (y - 1) * s, z: z * s });
          }
          grid.push(row);
        }
        break;

      case 'saddle':
        rows = 30; cols = 30;
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
        rows = 40; cols = 40;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          const x = (i / rows - 0.5) * 6;
          for (let j = 0; j <= cols; j++) {
            const z = (j / cols - 0.5) * 6;
            const y = amplitude * Math.sin(frequency * x) * Math.cos(frequency * z);
            row.push({ x: x * s * 0.4, y: y * s * 0.4, z: z * s * 0.4 });
          }
          grid.push(row);
        }
        break;

      case 'ripple':
        rows = 40; cols = 40;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          const x = (i / rows - 0.5) * 6;
          for (let j = 0; j <= cols; j++) {
            const z = (j / cols - 0.5) * 6;
            const dist = Math.sqrt(x * x + z * z);
            const y = amplitude * Math.sin(frequency * dist * 2) / (dist + 0.5);
            row.push({ x: x * s * 0.4, y: y * s * 0.4, z: z * s * 0.4 });
          }
          grid.push(row);
        }
        break;

      case 'helix':
        rows = 100; cols = 15;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          const t = (i / rows) * turns * Math.PI * 2;
          const centerX = R * Math.cos(t) * s * 0.5;
          const centerY = pitch * t * s * 0.1;
          const centerZ = R * Math.sin(t) * s * 0.5;
          for (let j = 0; j <= cols; j++) {
            const angle = (j / cols) * Math.PI * 2;
            const tubeR = 15;
            const dx = tubeR * Math.cos(angle);
            const dy = tubeR * Math.sin(angle);
            row.push({
              x: centerX + dx * Math.cos(t),
              y: centerY + dy,
              z: centerZ + dx * Math.sin(t)
            });
          }
          grid.push(row);
        }
        break;

      case 'hyperboloid':
        rows = 30; cols = 40;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          const v = (i / rows - 0.5) * 3;
          for (let j = 0; j <= cols; j++) {
            const u = (j / cols) * Math.PI * 2;
            const x = Math.cosh(v) * Math.cos(u);
            const z = Math.cosh(v) * Math.sin(u);
            const y = Math.sinh(v);
            row.push({ x: x * s * 0.4, y: y * s * 0.4, z: z * s * 0.4 });
          }
          grid.push(row);
        }
        break;

      case 'mobius':
        rows = 60; cols = 15;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          const u = (i / rows) * Math.PI * 2;
          for (let j = 0; j <= cols; j++) {
            const v = (j / cols - 0.5) * mobiusWidth;
            const x = (R + v * Math.cos(u / 2)) * Math.cos(u);
            const y = (R + v * Math.cos(u / 2)) * Math.sin(u);
            const z = v * Math.sin(u / 2);
            row.push({ x: x * s * 0.5, y: z * s * 0.5, z: y * s * 0.5 });
          }
          grid.push(row);
        }
        break;

      case 'klein':
        rows = 50; cols = 25;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          const u = (i / rows) * Math.PI * 2;
          for (let j = 0; j <= cols; j++) {
            const v = (j / cols) * Math.PI * 2;
            const rr = 4 * (1 - Math.cos(u) / 2);
            let x, y, z;
            if (u < Math.PI) {
              x = 6 * Math.cos(u) * (1 + Math.sin(u)) + rr * Math.cos(u) * Math.cos(v);
              y = 16 * Math.sin(u) + rr * Math.sin(u) * Math.cos(v);
            } else {
              x = 6 * Math.cos(u) * (1 + Math.sin(u)) + rr * Math.cos(v + Math.PI);
              y = 16 * Math.sin(u);
            }
            z = rr * Math.sin(v);
            row.push({ x: x * s * 0.08, y: (y - 8) * s * 0.08, z: z * s * 0.08 });
          }
          grid.push(row);
        }
        break;

      default:
        rows = 25; cols = 40;
        for (let i = 0; i <= rows; i++) {
          const row: Point3D[] = [];
          for (let j = 0; j <= cols; j++) {
            const phi = (i / rows) * Math.PI;
            const theta = (j / cols) * Math.PI * 2;
            row.push({
              x: 100 * Math.sin(phi) * Math.cos(theta),
              y: 100 * Math.sin(phi) * Math.sin(theta),
              z: 100 * Math.cos(phi)
            });
          }
          grid.push(row);
        }
    }

    return { grid, rows, cols };
  };

  const generateFaces = (grid: Point3D[][], rows: number, cols: number): Face[] => {
    const faces: Face[] = [];
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const p1 = grid[i][j];
        const p2 = grid[i][j + 1];
        const p3 = grid[i + 1][j + 1];
        const p4 = grid[i + 1][j];
        
        // Calculate normal for lighting
        const v1 = subtract(p2, p1);
        const v2 = subtract(p4, p1);
        const normal = normalize(crossProduct(v1, v2));
        
        // Center of face for depth sorting
        const center = {
          x: (p1.x + p2.x + p3.x + p4.x) / 4,
          y: (p1.y + p2.y + p3.y + p4.y) / 4,
          z: (p1.z + p2.z + p3.z + p4.z) / 4
        };
        
        faces.push({
          vertices: [p1, p2, p3, p4],
          normal,
          center
        });
      }
    }
    
    return faces;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const fov = 300;
    
    const lightDir = normalize({ x: 0.5, y: 1, z: 0.8 });

    const render = () => {
      ctx.fillStyle = 'hsl(222, 47%, 6%)';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'hsl(222, 47%, 12%)';
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

      const { grid, rows, cols } = generateMesh();
      const faces = generateFaces(grid, rows, cols);
      
      // Transform faces
      const transformedFaces = faces.map(face => {
        const transformedVertices = face.vertices.map(p => {
          let t = rotateX(p, rotation.x);
          t = rotateY(t, rotation.y);
          t = rotateZ(t, rotation.z);
          return t;
        });
        
        let transformedNormal = rotateX(face.normal, rotation.x);
        transformedNormal = rotateY(transformedNormal, rotation.y);
        transformedNormal = rotateZ(transformedNormal, rotation.z);
        
        let transformedCenter = rotateX(face.center, rotation.x);
        transformedCenter = rotateY(transformedCenter, rotation.y);
        transformedCenter = rotateZ(transformedCenter, rotation.z);
        
        return {
          vertices: transformedVertices,
          normal: transformedNormal,
          center: transformedCenter
        };
      });

      // Sort by depth (painter's algorithm)
      transformedFaces.sort((a, b) => a.center.z - b.center.z);

      // Draw faces
      transformedFaces.forEach(face => {
        // Back-face culling
        const viewDir = normalize(face.center);
        if (dot(face.normal, viewDir) > 0.1) return;
        
        // Calculate lighting
        let brightness = dot(face.normal, lightDir);
        brightness = Math.max(0.2, Math.min(1, brightness * 0.5 + 0.5));
        
        // Project vertices
        const projected = face.vertices.map(v => project(v, width, height, fov));
        
        // Color based on depth and height
        const hue = 45 + (face.center.y / 150) * 20;
        const saturation = 85;
        const lightness = 35 + brightness * 35;
        
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`;
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        ctx.moveTo(projected[0].x, projected[0].y);
        for (let i = 1; i < projected.length; i++) {
          ctx.lineTo(projected[i].x, projected[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      if (autoRotate) {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.008
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
