export interface Visualization2D {
  id: string;
  name: string;
  description: string;
  category: '2d';
  type: 'function' | 'parametric' | 'polar' | 'implicit';
  formula: string;
  defaultParams?: Record<string, number>;
}

export interface Visualization3D {
  id: string;
  name: string;
  description: string;
  category: '3d';
  type: 'surface' | 'parametric' | 'solid';
  formula: string;
  defaultParams?: Record<string, number>;
}

export type Visualization = Visualization2D | Visualization3D;

export const visualizations2D: Visualization2D[] = [
  {
    id: 'sin',
    name: 'Sinus funksiyasi',
    description: 'y = A·sin(Bx + C)',
    category: '2d',
    type: 'function',
    formula: 'sin',
    defaultParams: { A: 1, B: 1, C: 0 }
  },
  {
    id: 'cos',
    name: 'Kosinus funksiyasi',
    description: 'y = A·cos(Bx + C)',
    category: '2d',
    type: 'function',
    formula: 'cos',
    defaultParams: { A: 1, B: 1, C: 0 }
  },
  {
    id: 'tan',
    name: 'Tangens funksiyasi',
    description: 'y = A·tan(Bx)',
    category: '2d',
    type: 'function',
    formula: 'tan',
    defaultParams: { A: 1, B: 1 }
  },
  {
    id: 'parabola',
    name: 'Parabola',
    description: 'y = Ax² + Bx + C',
    category: '2d',
    type: 'function',
    formula: 'parabola',
    defaultParams: { A: 1, B: 0, C: 0 }
  },
  {
    id: 'cubic',
    name: 'Kubik funksiya',
    description: 'y = Ax³ + Bx² + Cx + D',
    category: '2d',
    type: 'function',
    formula: 'cubic',
    defaultParams: { A: 1, B: 0, C: 0, D: 0 }
  },
  {
    id: 'exponential',
    name: 'Eksponensial funksiya',
    description: 'y = A·eᴮˣ',
    category: '2d',
    type: 'function',
    formula: 'exp',
    defaultParams: { A: 1, B: 1 }
  },
  {
    id: 'logarithm',
    name: 'Logarifmik funksiya',
    description: 'y = A·ln(Bx)',
    category: '2d',
    type: 'function',
    formula: 'log',
    defaultParams: { A: 1, B: 1 }
  },
  {
    id: 'circle',
    name: 'Aylana',
    description: 'x² + y² = R²',
    category: '2d',
    type: 'parametric',
    formula: 'circle',
    defaultParams: { R: 3 }
  },
  {
    id: 'ellipse',
    name: 'Ellips',
    description: 'x²/a² + y²/b² = 1',
    category: '2d',
    type: 'parametric',
    formula: 'ellipse',
    defaultParams: { a: 4, b: 2 }
  },
  {
    id: 'hyperbola',
    name: 'Giperbola',
    description: 'x²/a² - y²/b² = 1',
    category: '2d',
    type: 'parametric',
    formula: 'hyperbola',
    defaultParams: { a: 2, b: 1 }
  },
  {
    id: 'spiral',
    name: 'Arximed spirali',
    description: 'r = a + bθ',
    category: '2d',
    type: 'polar',
    formula: 'spiral',
    defaultParams: { a: 0, b: 0.5 }
  },
  {
    id: 'rose',
    name: 'Atirgul egri chizig\'i',
    description: 'r = A·cos(nθ)',
    category: '2d',
    type: 'polar',
    formula: 'rose',
    defaultParams: { A: 4, n: 4 }
  },
  {
    id: 'lissajous',
    name: 'Lissaju figurasi',
    description: 'x = A·sin(at), y = B·sin(bt)',
    category: '2d',
    type: 'parametric',
    formula: 'lissajous',
    defaultParams: { A: 4, B: 4, a: 3, b: 2 }
  },
  {
    id: 'cardioid',
    name: 'Kardioid',
    description: 'r = a(1 + cos(θ))',
    category: '2d',
    type: 'polar',
    formula: 'cardioid',
    defaultParams: { a: 2 }
  },
  {
    id: 'heart',
    name: 'Yurak shakli',
    description: 'Parametrik yurak egri chizig\'i',
    category: '2d',
    type: 'parametric',
    formula: 'heart',
    defaultParams: { scale: 3 }
  }
];

export const visualizations3D: Visualization3D[] = [
  {
    id: 'sphere',
    name: 'Sfera',
    description: 'x² + y² + z² = R²',
    category: '3d',
    type: 'solid',
    formula: 'sphere',
    defaultParams: { R: 2 }
  },
  {
    id: 'torus',
    name: 'Tor',
    description: 'Halqa shaklidagi sirt',
    category: '3d',
    type: 'solid',
    formula: 'torus',
    defaultParams: { R: 2, r: 0.7 }
  },
  {
    id: 'cone',
    name: 'Konus',
    description: 'z² = x² + y²',
    category: '3d',
    type: 'solid',
    formula: 'cone',
    defaultParams: { height: 3, radius: 1.5 }
  },
  {
    id: 'cylinder',
    name: 'Silindr',
    description: 'x² + y² = R²',
    category: '3d',
    type: 'solid',
    formula: 'cylinder',
    defaultParams: { R: 1.5, height: 3 }
  },
  {
    id: 'paraboloid',
    name: 'Paraboloid',
    description: 'z = x² + y²',
    category: '3d',
    type: 'surface',
    formula: 'paraboloid',
    defaultParams: { scale: 0.5 }
  },
  {
    id: 'hyperboloid',
    name: 'Giperboloid',
    description: 'x²/a² + y²/b² - z²/c² = 1',
    category: '3d',
    type: 'surface',
    formula: 'hyperboloid',
    defaultParams: { a: 1, b: 1, c: 1 }
  },
  {
    id: 'saddle',
    name: 'Egar yuzasi',
    description: 'z = x² - y²',
    category: '3d',
    type: 'surface',
    formula: 'saddle',
    defaultParams: { scale: 0.5 }
  },
  {
    id: 'wave',
    name: 'To\'lqin yuzasi',
    description: 'z = sin(x)·cos(y)',
    category: '3d',
    type: 'surface',
    formula: 'wave',
    defaultParams: { amplitude: 1, frequency: 1 }
  },
  {
    id: 'ripple',
    name: 'To\'lqinlanish',
    description: 'z = sin(√(x² + y²))',
    category: '3d',
    type: 'surface',
    formula: 'ripple',
    defaultParams: { amplitude: 1, frequency: 2 }
  },
  {
    id: 'helix',
    name: 'Spiral (3D)',
    description: 'x = cos(t), y = sin(t), z = t',
    category: '3d',
    type: 'parametric',
    formula: 'helix',
    defaultParams: { radius: 2, pitch: 0.5, turns: 5 }
  },
  {
    id: 'mobius',
    name: 'Möbius lentasi',
    description: 'Bir tomonli sirt',
    category: '3d',
    type: 'surface',
    formula: 'mobius',
    defaultParams: { width: 1, radius: 2 }
  },
  {
    id: 'klein',
    name: 'Klein shishasi',
    description: 'Chegarasiz sirt',
    category: '3d',
    type: 'surface',
    formula: 'klein',
    defaultParams: { scale: 1 }
  }
];
