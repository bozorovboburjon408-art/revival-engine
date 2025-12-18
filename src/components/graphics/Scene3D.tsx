import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, Grid, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Visualization3D } from '@/lib/visualizations';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RotateCcw, Play, Pause } from 'lucide-react';

interface Scene3DProps {
  visualization: Visualization3D;
}

interface MeshProps {
  visualization: Visualization3D;
  params: Record<string, number>;
  autoRotate: boolean;
}

const VisualizationMesh = ({ visualization, params, autoRotate }: MeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate) {
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * 0.5;
      }
      if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.5;
      }
    }
  });

  const geometry = useMemo(() => {
    const { R = 2, r = 0.7, height = 3, radius = 1.5, scale = 0.5, 
            a = 1, b = 1, c = 1, amplitude = 1, frequency = 1,
            width = 1 } = params;

    switch (visualization.formula) {
      case 'sphere':
        return new THREE.SphereGeometry(R, 64, 64);
      case 'torus':
        return new THREE.TorusGeometry(R, r, 32, 100);
      case 'cone':
        return new THREE.ConeGeometry(radius, height, 64);
      case 'cylinder':
        return new THREE.CylinderGeometry(R, R, height, 64);
      case 'paraboloid': {
        const geo = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const size = 32;
        
        for (let i = 0; i <= size; i++) {
          for (let j = 0; j <= size; j++) {
            const x = (i / size - 0.5) * 4;
            const y = (j / size - 0.5) * 4;
            const z = scale * (x * x + y * y);
            vertices.push(x, z - 2, y);
          }
        }
        
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const a = i * (size + 1) + j;
            const b = a + 1;
            const c = a + size + 1;
            const d = c + 1;
            indices.push(a, b, d, a, d, c);
          }
        }
        
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geo.setIndex(indices);
        geo.computeVertexNormals();
        return geo;
      }
      case 'saddle': {
        const geo = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const size = 32;
        
        for (let i = 0; i <= size; i++) {
          for (let j = 0; j <= size; j++) {
            const x = (i / size - 0.5) * 4;
            const y = (j / size - 0.5) * 4;
            const z = scale * (x * x - y * y);
            vertices.push(x, z, y);
          }
        }
        
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const a = i * (size + 1) + j;
            const b = a + 1;
            const c = a + size + 1;
            const d = c + 1;
            indices.push(a, b, d, a, d, c);
          }
        }
        
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geo.setIndex(indices);
        geo.computeVertexNormals();
        return geo;
      }
      case 'wave': {
        const geo = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const size = 64;
        
        for (let i = 0; i <= size; i++) {
          for (let j = 0; j <= size; j++) {
            const x = (i / size - 0.5) * 8;
            const y = (j / size - 0.5) * 8;
            const z = amplitude * Math.sin(frequency * x) * Math.cos(frequency * y);
            vertices.push(x, z, y);
          }
        }
        
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const a = i * (size + 1) + j;
            const b = a + 1;
            const c = a + size + 1;
            const d = c + 1;
            indices.push(a, b, d, a, d, c);
          }
        }
        
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geo.setIndex(indices);
        geo.computeVertexNormals();
        return geo;
      }
      case 'ripple': {
        const geo = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const size = 64;
        
        for (let i = 0; i <= size; i++) {
          for (let j = 0; j <= size; j++) {
            const x = (i / size - 0.5) * 8;
            const y = (j / size - 0.5) * 8;
            const dist = Math.sqrt(x * x + y * y);
            const z = amplitude * Math.sin(frequency * dist) / (dist + 1);
            vertices.push(x, z, y);
          }
        }
        
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const a = i * (size + 1) + j;
            const b = a + 1;
            const c = a + size + 1;
            const d = c + 1;
            indices.push(a, b, d, a, d, c);
          }
        }
        
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geo.setIndex(indices);
        geo.computeVertexNormals();
        return geo;
      }
      case 'hyperboloid': {
        const geo = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const size = 32;
        
        for (let i = 0; i <= size; i++) {
          for (let j = 0; j <= size; j++) {
            const u = (i / size) * Math.PI * 2;
            const v = (j / size - 0.5) * 4;
            const x = a * Math.cosh(v) * Math.cos(u);
            const y = c * Math.sinh(v);
            const z = b * Math.cosh(v) * Math.sin(u);
            vertices.push(x, y, z);
          }
        }
        
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            const a = i * (size + 1) + j;
            const b = a + 1;
            const c = a + size + 1;
            const d = c + 1;
            indices.push(a, b, d, a, d, c);
          }
        }
        
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geo.setIndex(indices);
        geo.computeVertexNormals();
        return geo;
      }
      case 'mobius': {
        const geo = new THREE.BufferGeometry();
        const vertices: number[] = [];
        const indices: number[] = [];
        const size = 64;
        const halfWidth = width / 2;
        
        for (let i = 0; i <= size; i++) {
          for (let j = 0; j <= size / 4; j++) {
            const u = (i / size) * Math.PI * 2;
            const v = (j / (size / 4) - 0.5) * 2 * halfWidth;
            const x = (R + v * Math.cos(u / 2)) * Math.cos(u);
            const y = (R + v * Math.cos(u / 2)) * Math.sin(u);
            const z = v * Math.sin(u / 2);
            vertices.push(x, z, y);
          }
        }
        
        const cols = size / 4 + 1;
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size / 4; j++) {
            const a = i * cols + j;
            const b = a + 1;
            const c = a + cols;
            const d = c + 1;
            indices.push(a, b, d, a, d, c);
          }
        }
        
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geo.setIndex(indices);
        geo.computeVertexNormals();
        return geo;
      }
      default:
        return new THREE.SphereGeometry(2, 32, 32);
    }
  }, [visualization.formula, params]);

  const helixPoints = useMemo(() => {
    if (visualization.formula !== 'helix') return null;
    
    const { radius = 2, pitch = 0.5, turns = 5 } = params;
    const points: [number, number, number][] = [];
    const steps = turns * 100;
    
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * turns * Math.PI * 2;
      points.push([
        radius * Math.cos(t),
        pitch * t,
        radius * Math.sin(t)
      ]);
    }
    
    return points;
  }, [visualization.formula, params]);

  if (visualization.formula === 'helix' && helixPoints) {
    return (
      <group ref={groupRef}>
        <Line points={helixPoints} color="#f4d03f" lineWidth={3} />
      </group>
    );
  }

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshPhongMaterial 
        color="#f4d03f" 
        side={THREE.DoubleSide}
        wireframe={visualization.type === 'surface'}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

export const Scene3D = ({ visualization }: Scene3DProps) => {
  const [params, setParams] = useState(visualization.defaultParams || {});
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    setParams(visualization.defaultParams || {});
  }, [visualization]);

  const resetView = () => {
    setParams(visualization.defaultParams || {});
  };

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] rounded-lg border border-border overflow-hidden bg-slate-900">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <VisualizationMesh 
            visualization={visualization} 
            params={params} 
            autoRotate={autoRotate}
          />
          <Grid 
            args={[10, 10]} 
            cellSize={1}
            cellThickness={0.5}
            cellColor="#334155"
            sectionSize={5}
            sectionThickness={1}
            sectionColor="#475569"
            fadeDistance={30}
            fadeStrength={1}
            position={[0, -3, 0]}
          />
          <OrbitControls enableDamping dampingFactor={0.05} />
        </Canvas>
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
