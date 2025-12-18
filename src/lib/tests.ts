export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Test {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  timeLimit: number; // in minutes
  questions: TestQuestion[];
}

export const tests: Test[] = [
  {
    id: "algebra-basics",
    title: "Algebra asoslari",
    category: "Algebra",
    icon: "Variable",
    description: "Algebraning asosiy tushunchalari va amallar",
    timeLimit: 15,
    questions: [
      {
        id: "ab1",
        question: "(a + b)² formulasining to'g'ri yoyilmasi qaysi?",
        options: ["a² + b²", "a² + 2ab + b²", "a² - 2ab + b²", "a² + ab + b²"],
        correctAnswer: 1,
        explanation: "(a + b)² = a² + 2ab + b² - qisqa ko'paytirish formulasi",
        difficulty: "easy"
      },
      {
        id: "ab2",
        question: "x² - 9 ifodani ko'paytuvchilarga ajrating",
        options: ["(x - 3)²", "(x + 3)²", "(x - 3)(x + 3)", "(x - 9)(x + 1)"],
        correctAnswer: 2,
        explanation: "a² - b² = (a - b)(a + b) formulasi bo'yicha",
        difficulty: "easy"
      },
      {
        id: "ab3",
        question: "2x + 6 = 14 tenglamaning yechimi nima?",
        options: ["x = 2", "x = 4", "x = 6", "x = 8"],
        correctAnswer: 1,
        explanation: "2x = 14 - 6 = 8, x = 4",
        difficulty: "easy"
      },
      {
        id: "ab4",
        question: "x² - 5x + 6 = 0 tenglamaning ildizlari yig'indisi nechaga teng?",
        options: ["5", "6", "-5", "-6"],
        correctAnswer: 0,
        explanation: "Vieta formulasi bo'yicha: x₁ + x₂ = -b/a = 5",
        difficulty: "medium"
      },
      {
        id: "ab5",
        question: "log₂8 nechaga teng?",
        options: ["2", "3", "4", "8"],
        correctAnswer: 1,
        explanation: "2³ = 8, shuning uchun log₂8 = 3",
        difficulty: "medium"
      },
      {
        id: "ab6",
        question: "(a³ + b³) ni ko'paytuvchilarga ajrating",
        options: ["(a + b)(a² + ab + b²)", "(a + b)(a² - ab + b²)", "(a - b)(a² + ab + b²)", "(a + b)³"],
        correctAnswer: 1,
        explanation: "a³ + b³ = (a + b)(a² - ab + b²) - kublar yig'indisi formulasi",
        difficulty: "medium"
      },
      {
        id: "ab7",
        question: "x² + 4x + 4 = 0 tenglamaning nechta ildizi bor?",
        options: ["0", "1", "2", "Cheksiz"],
        correctAnswer: 1,
        explanation: "D = 16 - 16 = 0, bitta ildiz: x = -2",
        difficulty: "medium"
      },
      {
        id: "ab8",
        question: "3^x = 81 bo'lsa, x = ?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 2,
        explanation: "3⁴ = 81, shuning uchun x = 4",
        difficulty: "medium"
      },
      {
        id: "ab9",
        question: "x² - 7x + 12 = 0 tenglamaning ildizlari ko'paytmasi?",
        options: ["7", "12", "-7", "-12"],
        correctAnswer: 1,
        explanation: "Vieta formulasi: x₁ · x₂ = c/a = 12",
        difficulty: "hard"
      },
      {
        id: "ab10",
        question: "log₃27 + log₃9 = ?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 0,
        explanation: "log₃27 = 3, log₃9 = 2, jami = 5",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "geometry-basics",
    title: "Geometriya asoslari",
    category: "Geometriya",
    icon: "Triangle",
    description: "Geometrik shakllar va ularning xossalari",
    timeLimit: 15,
    questions: [
      {
        id: "gb1",
        question: "To'g'ri burchakli uchburchakda katetlar 3 va 4. Gipotenuza nechaga teng?",
        options: ["5", "6", "7", "12"],
        correctAnswer: 0,
        explanation: "Pifagor teoremasi: c² = 3² + 4² = 25, c = 5",
        difficulty: "easy"
      },
      {
        id: "gb2",
        question: "Radiusi 7 cm bo'lgan doira yuzi?",
        options: ["14π cm²", "49π cm²", "7π cm²", "28π cm²"],
        correctAnswer: 1,
        explanation: "S = πr² = π · 7² = 49π cm²",
        difficulty: "easy"
      },
      {
        id: "gb3",
        question: "Uchburchakning ichki burchaklari yig'indisi?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: 1,
        explanation: "Har qanday uchburchakning ichki burchaklari yig'indisi 180°",
        difficulty: "easy"
      },
      {
        id: "gb4",
        question: "Asosi 10 cm, balandligi 6 cm bo'lgan uchburchak yuzi?",
        options: ["30 cm²", "60 cm²", "16 cm²", "15 cm²"],
        correctAnswer: 0,
        explanation: "S = ½ · a · h = ½ · 10 · 6 = 30 cm²",
        difficulty: "easy"
      },
      {
        id: "gb5",
        question: "Trapetsiya katta va kichik asoslari 12 va 8, balandligi 5. Yuzi?",
        options: ["40", "50", "60", "100"],
        correctAnswer: 1,
        explanation: "S = (a + b) · h / 2 = (12 + 8) · 5 / 2 = 50",
        difficulty: "medium"
      },
      {
        id: "gb6",
        question: "Radiusi 5 bo'lgan shar hajmi?",
        options: ["(500/3)π", "(250/3)π", "(125/3)π", "(625/3)π"],
        correctAnswer: 0,
        explanation: "V = (4/3)πr³ = (4/3)π · 125 = (500/3)π",
        difficulty: "medium"
      },
      {
        id: "gb7",
        question: "Muntazam oltiburchakning bir burchagi?",
        options: ["90°", "108°", "120°", "135°"],
        correctAnswer: 2,
        explanation: "(n-2)·180°/n = (6-2)·180°/6 = 120°",
        difficulty: "medium"
      },
      {
        id: "gb8",
        question: "Diagonallari 6 va 8 bo'lgan romb yuzi?",
        options: ["24", "48", "14", "28"],
        correctAnswer: 0,
        explanation: "S = d₁ · d₂ / 2 = 6 · 8 / 2 = 24",
        difficulty: "medium"
      },
      {
        id: "gb9",
        question: "Silindrning radiusi 3, balandligi 10. Hajmi?",
        options: ["30π", "60π", "90π", "180π"],
        correctAnswer: 2,
        explanation: "V = πr²h = π · 9 · 10 = 90π",
        difficulty: "hard"
      },
      {
        id: "gb10",
        question: "Konus radiusi 4, balandligi 9. Hajmi?",
        options: ["48π", "36π", "144π", "72π"],
        correctAnswer: 0,
        explanation: "V = (1/3)πr²h = (1/3)π · 16 · 9 = 48π",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "trigonometry-basics",
    title: "Trigonometriya asoslari",
    category: "Trigonometriya",
    icon: "Waves",
    description: "Trigonometrik funksiyalar va ayniyatlar",
    timeLimit: 15,
    questions: [
      {
        id: "tb1",
        question: "sin²x + cos²x = ?",
        options: ["0", "1", "2", "sin2x"],
        correctAnswer: 1,
        explanation: "Bu trigonometriyaning asosiy ayniyati",
        difficulty: "easy"
      },
      {
        id: "tb2",
        question: "sin 30° = ?",
        options: ["0", "1/2", "√2/2", "√3/2"],
        correctAnswer: 1,
        explanation: "sin 30° = 1/2 - standart qiymat",
        difficulty: "easy"
      },
      {
        id: "tb3",
        question: "cos 60° = ?",
        options: ["0", "1/2", "√2/2", "√3/2"],
        correctAnswer: 1,
        explanation: "cos 60° = 1/2 - standart qiymat",
        difficulty: "easy"
      },
      {
        id: "tb4",
        question: "tan 45° = ?",
        options: ["0", "1", "√3", "undefined"],
        correctAnswer: 1,
        explanation: "tan 45° = sin45°/cos45° = 1",
        difficulty: "easy"
      },
      {
        id: "tb5",
        question: "sin 2x = ?",
        options: ["2sinx", "2cosx", "2sinx·cosx", "sin²x - cos²x"],
        correctAnswer: 2,
        explanation: "sin 2x = 2sinx·cosx - ikkilangan burchak formulasi",
        difficulty: "medium"
      },
      {
        id: "tb6",
        question: "cos 2x ning qaysi ifodasi TO'G'RI EMAS?",
        options: ["cos²x - sin²x", "2cos²x - 1", "1 - 2sin²x", "2sinx·cosx"],
        correctAnswer: 3,
        explanation: "2sinx·cosx = sin2x, cos2x emas",
        difficulty: "medium"
      },
      {
        id: "tb7",
        question: "tan x = sin x / cos x bo'lsa, 1 + tan²x = ?",
        options: ["sec²x", "csc²x", "cot²x", "sin²x"],
        correctAnswer: 0,
        explanation: "1 + tan²x = sec²x = 1/cos²x",
        difficulty: "medium"
      },
      {
        id: "tb8",
        question: "sin(90° - x) = ?",
        options: ["sin x", "cos x", "-sin x", "-cos x"],
        correctAnswer: 1,
        explanation: "sin(90° - x) = cos x - keltirish formulasi",
        difficulty: "medium"
      },
      {
        id: "tb9",
        question: "sin(a + b) = ?",
        options: ["sina·cosb + cosa·sinb", "sina·cosb - cosa·sinb", "cosa·cosb + sina·sinb", "cosa·cosb - sina·sinb"],
        correctAnswer: 0,
        explanation: "sin(a+b) = sina·cosb + cosa·sinb - qo'shish formulasi",
        difficulty: "hard"
      },
      {
        id: "tb10",
        question: "cos(a - b) = ?",
        options: ["cosa·cosb + sina·sinb", "cosa·cosb - sina·sinb", "sina·cosb + cosa·sinb", "sina·cosb - cosa·sinb"],
        correctAnswer: 0,
        explanation: "cos(a-b) = cosa·cosb + sina·sinb - ayirish formulasi",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "calculus-basics",
    title: "Matematik analiz",
    category: "Analiz",
    icon: "TrendingUp",
    description: "Hosilalar va integrallar",
    timeLimit: 20,
    questions: [
      {
        id: "cb1",
        question: "(x³)' = ?",
        options: ["x²", "3x²", "3x³", "x³"],
        correctAnswer: 1,
        explanation: "(xⁿ)' = nxⁿ⁻¹, shuning uchun (x³)' = 3x²",
        difficulty: "easy"
      },
      {
        id: "cb2",
        question: "(sin x)' = ?",
        options: ["sin x", "cos x", "-sin x", "-cos x"],
        correctAnswer: 1,
        explanation: "Sinusning hosilasi kosinusga teng",
        difficulty: "easy"
      },
      {
        id: "cb3",
        question: "(eˣ)' = ?",
        options: ["eˣ", "xeˣ⁻¹", "eˣ⁻¹", "x·eˣ"],
        correctAnswer: 0,
        explanation: "Eksponensial funksiyaning hosilasi o'ziga teng",
        difficulty: "easy"
      },
      {
        id: "cb4",
        question: "(ln x)' = ?",
        options: ["ln x", "1/x", "x", "eˣ"],
        correctAnswer: 1,
        explanation: "(ln x)' = 1/x",
        difficulty: "easy"
      },
      {
        id: "cb5",
        question: "∫x² dx = ?",
        options: ["x³ + C", "x³/3 + C", "2x + C", "x²/2 + C"],
        correctAnswer: 1,
        explanation: "∫xⁿdx = xⁿ⁺¹/(n+1) + C",
        difficulty: "medium"
      },
      {
        id: "cb6",
        question: "∫cos x dx = ?",
        options: ["cos x + C", "sin x + C", "-sin x + C", "-cos x + C"],
        correctAnswer: 1,
        explanation: "Kosinusning integrali sinusga teng",
        difficulty: "medium"
      },
      {
        id: "cb7",
        question: "(x² · eˣ)' = ? (ko'paytma qoidasi)",
        options: ["2x·eˣ", "x²·eˣ", "2x·eˣ + x²·eˣ", "x²·eˣ - 2x·eˣ"],
        correctAnswer: 2,
        explanation: "(uv)' = u'v + uv' = 2x·eˣ + x²·eˣ",
        difficulty: "medium"
      },
      {
        id: "cb8",
        question: "∫eˣ dx = ?",
        options: ["eˣ + C", "eˣ/x + C", "x·eˣ + C", "eˣ⁺¹ + C"],
        correctAnswer: 0,
        explanation: "Eksponensialning integrali o'ziga teng",
        difficulty: "medium"
      },
      {
        id: "cb9",
        question: "f(x) = x³ - 3x ning kritik nuqtalari?",
        options: ["x = 0", "x = ±1", "x = ±3", "x = 3"],
        correctAnswer: 1,
        explanation: "f'(x) = 3x² - 3 = 0, x² = 1, x = ±1",
        difficulty: "hard"
      },
      {
        id: "cb10",
        question: "∫₀¹ x² dx = ?",
        options: ["1", "1/2", "1/3", "1/4"],
        correctAnswer: 2,
        explanation: "[x³/3]₀¹ = 1/3 - 0 = 1/3",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "probability-basics",
    title: "Ehtimollik nazariyasi",
    category: "Ehtimollik",
    icon: "Percent",
    description: "Ehtimollik va kombinatorika asoslari",
    timeLimit: 15,
    questions: [
      {
        id: "pb1",
        question: "Bir zar tashlaganda 6 tushish ehtimoli?",
        options: ["1/2", "1/3", "1/6", "1/12"],
        correctAnswer: 2,
        explanation: "P = 1/6 (6 ta imkoniyatdan 1 tasi)",
        difficulty: "easy"
      },
      {
        id: "pb2",
        question: "5! = ?",
        options: ["20", "60", "120", "720"],
        correctAnswer: 2,
        explanation: "5! = 5·4·3·2·1 = 120",
        difficulty: "easy"
      },
      {
        id: "pb3",
        question: "C₅² = ?",
        options: ["5", "10", "20", "25"],
        correctAnswer: 1,
        explanation: "C₅² = 5!/(2!·3!) = 120/(2·6) = 10",
        difficulty: "easy"
      },
      {
        id: "pb4",
        question: "Ikki zar tashlaganda yig'indi 7 bo'lish ehtimoli?",
        options: ["1/6", "1/12", "5/36", "6/36"],
        correctAnswer: 3,
        explanation: "6 ta qulay kombinatsiya (1+6, 2+5, ...) / 36 = 6/36 = 1/6",
        difficulty: "medium"
      },
      {
        id: "pb5",
        question: "A₅³ = ?",
        options: ["10", "20", "60", "120"],
        correctAnswer: 2,
        explanation: "A₅³ = 5!/(5-3)! = 5!/2! = 120/2 = 60",
        difficulty: "medium"
      },
      {
        id: "pb6",
        question: "Tanga 3 marta tashlaganda hammasi bosh tushish ehtimoli?",
        options: ["1/2", "1/4", "1/8", "1/16"],
        correctAnswer: 2,
        explanation: "P = (1/2)³ = 1/8",
        difficulty: "medium"
      },
      {
        id: "pb7",
        question: "10 ta kitobdan 3 tasini tanlash usullari soni?",
        options: ["30", "120", "720", "1000"],
        correctAnswer: 1,
        explanation: "C₁₀³ = 10!/(3!·7!) = 120",
        difficulty: "medium"
      },
      {
        id: "pb8",
        question: "P(A) = 0.3, P(B) = 0.4, A va B mustaqil. P(A∩B) = ?",
        options: ["0.7", "0.12", "0.1", "0.58"],
        correctAnswer: 1,
        explanation: "Mustaqil hodisalar uchun P(A∩B) = P(A)·P(B) = 0.12",
        difficulty: "hard"
      },
      {
        id: "pb9",
        question: "MATEMATIKA so'zidagi harflardan nechta turli so'z yasash mumkin?",
        options: ["10!", "10!/4!", "10!/(2!·2!·2!)", "10!/(3!·2!·2!)"],
        correctAnswer: 2,
        explanation: "M-2ta, A-3ta, T-2ta, E-1ta, I-1ta, K-1ta. Javob: 10!/(2!·3!·2!)",
        difficulty: "hard"
      },
      {
        id: "pb10",
        question: "Bernulli formulasi: 5 ta sinovda 3 ta muvaffaqiyat, p=0.6",
        options: ["C₅³·0.6³·0.4²", "C₅³·0.6²·0.4³", "5³·0.6³·0.4²", "0.6³·0.4²"],
        correctAnswer: 0,
        explanation: "P₅(3) = C₅³·p³·q² = C₅³·0.6³·0.4²",
        difficulty: "hard"
      }
    ]
  }
];

export const getTestById = (id: string): Test | undefined => {
  return tests.find(test => test.id === id);
};

export const getTestsByCategory = (category: string): Test[] => {
  return tests.filter(test => test.category === category);
};
