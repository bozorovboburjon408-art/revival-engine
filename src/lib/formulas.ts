export interface Formula {
  id: string;
  name: string;
  formula: string;
  description?: string;
}

export interface FormulaCategory {
  id: string;
  title: string;
  icon: string;
  formulas: Formula[];
}

export const formulaCategories: FormulaCategory[] = [
  {
    id: "algebra",
    title: "Algebra",
    icon: "Variable",
    formulas: [
      { id: "a1", name: "Kvadrat tenglama", formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}", description: "ax² + bx + c = 0 tenglamaning yechimlari" },
      { id: "a2", name: "Vieta formulasi", formula: "x_1 + x_2 = -\\frac{b}{a}, \\quad x_1 \\cdot x_2 = \\frac{c}{a}" },
      { id: "a3", name: "Qisqa ko'paytirish", formula: "(a + b)^2 = a^2 + 2ab + b^2" },
      { id: "a4", name: "Qisqa ko'paytirish", formula: "(a - b)^2 = a^2 - 2ab + b^2" },
      { id: "a5", name: "Kvadratlar ayirmasi", formula: "a^2 - b^2 = (a - b)(a + b)" },
      { id: "a6", name: "Kublar yig'indisi", formula: "a^3 + b^3 = (a + b)(a^2 - ab + b^2)" },
      { id: "a7", name: "Kublar ayirmasi", formula: "a^3 - b^3 = (a - b)(a^2 + ab + b^2)" },
      { id: "a8", name: "Binom formulasi", formula: "(a + b)^n = \\sum_{k=0}^{n} C_n^k a^{n-k} b^k" },
    ]
  },
  {
    id: "geometry",
    title: "Geometriya",
    icon: "Triangle",
    formulas: [
      { id: "g1", name: "Uchburchak yuzi", formula: "S = \\frac{1}{2} \\cdot a \\cdot h", description: "a - asos, h - balandlik" },
      { id: "g2", name: "Pifagor teoremasi", formula: "c^2 = a^2 + b^2", description: "To'g'ri burchakli uchburchak" },
      { id: "g3", name: "Geron formulasi", formula: "S = \\sqrt{p(p-a)(p-b)(p-c)}", description: "p = (a+b+c)/2 - yarim perimetr" },
      { id: "g4", name: "Aylana uzunligi", formula: "C = 2\\pi r" },
      { id: "g5", name: "Doira yuzi", formula: "S = \\pi r^2" },
      { id: "g6", name: "Shar hajmi", formula: "V = \\frac{4}{3}\\pi r^3" },
      { id: "g7", name: "Shar sirti", formula: "S = 4\\pi r^2" },
      { id: "g8", name: "Silindr hajmi", formula: "V = \\pi r^2 h" },
      { id: "g9", name: "Konus hajmi", formula: "V = \\frac{1}{3}\\pi r^2 h" },
    ]
  },
  {
    id: "trigonometry",
    title: "Trigonometriya",
    icon: "Waves",
    formulas: [
      { id: "t1", name: "Asosiy ayniyat", formula: "\\sin^2 x + \\cos^2 x = 1" },
      { id: "t2", name: "Tangens", formula: "\\tan x = \\frac{\\sin x}{\\cos x}" },
      { id: "t3", name: "Kotangens", formula: "\\cot x = \\frac{\\cos x}{\\sin x}" },
      { id: "t4", name: "Qo'shish formulasi", formula: "\\sin(a + b) = \\sin a \\cos b + \\cos a \\sin b" },
      { id: "t5", name: "Qo'shish formulasi", formula: "\\cos(a + b) = \\cos a \\cos b - \\sin a \\sin b" },
      { id: "t6", name: "Ikkilangan burchak", formula: "\\sin 2x = 2 \\sin x \\cos x" },
      { id: "t7", name: "Ikkilangan burchak", formula: "\\cos 2x = \\cos^2 x - \\sin^2 x" },
      { id: "t8", name: "Sinuslar teoremasi", formula: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R" },
      { id: "t9", name: "Kosinuslar teoremasi", formula: "c^2 = a^2 + b^2 - 2ab\\cos C" },
    ]
  },
  {
    id: "calculus",
    title: "Matematik Analiz",
    icon: "TrendingUp",
    formulas: [
      { id: "c1", name: "Hosila ta'rifi", formula: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}" },
      { id: "c2", name: "Daraja hosila", formula: "(x^n)' = nx^{n-1}" },
      { id: "c3", name: "Ko'paytma hosila", formula: "(uv)' = u'v + uv'" },
      { id: "c4", name: "Bo'linma hosila", formula: "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}" },
      { id: "c5", name: "Murakkab funksiya", formula: "(f(g(x)))' = f'(g(x)) \\cdot g'(x)" },
      { id: "c6", name: "Eksponenta hosila", formula: "(e^x)' = e^x" },
      { id: "c7", name: "Logarifm hosila", formula: "(\\ln x)' = \\frac{1}{x}" },
      { id: "c8", name: "Sinus hosila", formula: "(\\sin x)' = \\cos x" },
      { id: "c9", name: "Kosinus hosila", formula: "(\\cos x)' = -\\sin x" },
    ]
  },
  {
    id: "integrals",
    title: "Integrallar",
    icon: "Sigma",
    formulas: [
      { id: "i1", name: "Daraja integrali", formula: "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C, \\quad n \\neq -1" },
      { id: "i2", name: "Eksponenta integrali", formula: "\\int e^x dx = e^x + C" },
      { id: "i3", name: "Logarifm integrali", formula: "\\int \\frac{1}{x} dx = \\ln|x| + C" },
      { id: "i4", name: "Sinus integrali", formula: "\\int \\sin x dx = -\\cos x + C" },
      { id: "i5", name: "Kosinus integrali", formula: "\\int \\cos x dx = \\sin x + C" },
      { id: "i6", name: "Aniq integral", formula: "\\int_a^b f(x) dx = F(b) - F(a)" },
      { id: "i7", name: "Bo'laklab integrallash", formula: "\\int u dv = uv - \\int v du" },
    ]
  },
  {
    id: "probability",
    title: "Ehtimollik",
    icon: "Percent",
    formulas: [
      { id: "p1", name: "Klassik ehtimollik", formula: "P(A) = \\frac{m}{n}", description: "m - qulay hodisalar, n - barcha hodisalar" },
      { id: "p2", name: "Qo'shish qoidasi", formula: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)" },
      { id: "p3", name: "Ko'paytirish qoidasi", formula: "P(A \\cap B) = P(A) \\cdot P(B|A)" },
      { id: "p4", name: "Bernulli formulasi", formula: "P_n(k) = C_n^k p^k q^{n-k}" },
      { id: "p5", name: "Matematik kutilma", formula: "E(X) = \\sum_{i} x_i \\cdot P(x_i)" },
      { id: "p6", name: "Dispersiya", formula: "D(X) = E(X^2) - (E(X))^2" },
      { id: "p7", name: "O'rtacha kvadratik", formula: "\\sigma = \\sqrt{D(X)}" },
    ]
  },
  {
    id: "combinatorics",
    title: "Kombinatorika",
    icon: "Grid3X3",
    formulas: [
      { id: "k1", name: "Faktorial", formula: "n! = 1 \\cdot 2 \\cdot 3 \\cdot ... \\cdot n" },
      { id: "k2", name: "O'rin almashtirish", formula: "P_n = n!" },
      { id: "k3", name: "Joylashtirish", formula: "A_n^k = \\frac{n!}{(n-k)!}" },
      { id: "k4", name: "Binom koeffitsient", formula: "C_n^k = \\frac{n!}{k!(n-k)!}" },
      { id: "k5", name: "Binom xossasi", formula: "C_n^k = C_n^{n-k}" },
      { id: "k6", name: "Paskal uchburchagi", formula: "C_n^k = C_{n-1}^{k-1} + C_{n-1}^k" },
    ]
  },
];
