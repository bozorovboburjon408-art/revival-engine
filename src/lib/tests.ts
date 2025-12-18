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
  },
  {
    id: "sequences-series",
    title: "Qatorlar va ketma-ketliklar",
    category: "Qatorlar",
    icon: "ListOrdered",
    description: "Arifmetik va geometrik progressiyalar",
    timeLimit: 15,
    questions: [
      {
        id: "ss1",
        question: "Arifmetik progressiyada a₁ = 3, d = 4. a₅ = ?",
        options: ["15", "19", "23", "27"],
        correctAnswer: 1,
        explanation: "aₙ = a₁ + (n-1)d = 3 + 4·4 = 19",
        difficulty: "easy"
      },
      {
        id: "ss2",
        question: "Geometrik progressiyada b₁ = 2, q = 3. b₄ = ?",
        options: ["18", "27", "54", "162"],
        correctAnswer: 2,
        explanation: "bₙ = b₁·qⁿ⁻¹ = 2·3³ = 54",
        difficulty: "easy"
      },
      {
        id: "ss3",
        question: "AP: 2, 5, 8, 11, ... Sₙ formulasi?",
        options: ["n(n+1)/2", "n(3n-1)/2", "n(3n+1)/2", "n²"],
        correctAnswer: 2,
        explanation: "Sₙ = n(2a₁ + (n-1)d)/2 = n(4 + 3n - 3)/2 = n(3n+1)/2",
        difficulty: "medium"
      },
      {
        id: "ss4",
        question: "GP: 1, 2, 4, 8, ... S₆ = ?",
        options: ["31", "63", "127", "255"],
        correctAnswer: 1,
        explanation: "Sₙ = b₁(qⁿ-1)/(q-1) = 1·(2⁶-1)/1 = 63",
        difficulty: "medium"
      },
      {
        id: "ss5",
        question: "Cheksiz kamayuvchi GP yig'indisi: b₁ = 8, q = 1/2",
        options: ["8", "12", "16", "24"],
        correctAnswer: 2,
        explanation: "S = b₁/(1-q) = 8/(1-0.5) = 16",
        difficulty: "medium"
      },
      {
        id: "ss6",
        question: "AP da a₃ = 7, a₇ = 19. d = ?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        explanation: "a₇ - a₃ = 4d, 19 - 7 = 12 = 4d, d = 3",
        difficulty: "medium"
      },
      {
        id: "ss7",
        question: "1 + 2 + 3 + ... + 100 = ?",
        options: ["4950", "5000", "5050", "5100"],
        correctAnswer: 2,
        explanation: "Sₙ = n(n+1)/2 = 100·101/2 = 5050",
        difficulty: "easy"
      },
      {
        id: "ss8",
        question: "GP: 3, 6, 12, ... 10 ta hadning yig'indisi?",
        options: ["3069", "3072", "3075", "6141"],
        correctAnswer: 0,
        explanation: "Sₙ = 3(2¹⁰-1)/(2-1) = 3·1023 = 3069",
        difficulty: "hard"
      },
      {
        id: "ss9",
        question: "AP ning birinchi 20 hadining yig'indisi 710. a₁ = 2 bo'lsa, d = ?",
        options: ["2", "3", "4", "5"],
        correctAnswer: 1,
        explanation: "Sₙ = n(2a₁ + (n-1)d)/2. 710 = 20(4 + 19d)/2, d = 3",
        difficulty: "hard"
      },
      {
        id: "ss10",
        question: "0.333... = 0.3 + 0.03 + 0.003 + ... = ?",
        options: ["1/4", "1/3", "3/10", "3/9"],
        correctAnswer: 1,
        explanation: "Bu cheksiz GP: S = 0.3/(1-0.1) = 0.3/0.9 = 1/3",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "vectors-basics",
    title: "Vektorlar",
    category: "Vektorlar",
    icon: "Move",
    description: "Vektor amallari va xossalari",
    timeLimit: 15,
    questions: [
      {
        id: "vb1",
        question: "a⃗ = (3, 4) vektorning uzunligi?",
        options: ["5", "7", "12", "25"],
        correctAnswer: 0,
        explanation: "|a⃗| = √(3² + 4²) = √25 = 5",
        difficulty: "easy"
      },
      {
        id: "vb2",
        question: "a⃗ = (2, 3), b⃗ = (1, -2). a⃗ + b⃗ = ?",
        options: ["(3, 1)", "(1, 5)", "(3, 5)", "(1, 1)"],
        correctAnswer: 0,
        explanation: "a⃗ + b⃗ = (2+1, 3+(-2)) = (3, 1)",
        difficulty: "easy"
      },
      {
        id: "vb3",
        question: "a⃗ = (4, -3). 2a⃗ = ?",
        options: ["(8, 6)", "(8, -6)", "(2, -1.5)", "(6, -1)"],
        correctAnswer: 1,
        explanation: "2a⃗ = (2·4, 2·(-3)) = (8, -6)",
        difficulty: "easy"
      },
      {
        id: "vb4",
        question: "a⃗ = (1, 2), b⃗ = (3, 4). a⃗ · b⃗ (skalyar ko'paytma) = ?",
        options: ["10", "11", "14", "5"],
        correctAnswer: 1,
        explanation: "a⃗ · b⃗ = 1·3 + 2·4 = 3 + 8 = 11",
        difficulty: "medium"
      },
      {
        id: "vb5",
        question: "Ikkita vektor perpendikulyar bo'lsa, ularning skalyar ko'paytmasi?",
        options: ["1", "0", "-1", "undefined"],
        correctAnswer: 1,
        explanation: "Perpendikulyar vektorlar uchun a⃗ · b⃗ = 0",
        difficulty: "medium"
      },
      {
        id: "vb6",
        question: "a⃗ = (1, 0, 0), b⃗ = (0, 1, 0). a⃗ × b⃗ = ?",
        options: ["(0, 0, 1)", "(0, 0, -1)", "(1, 1, 0)", "(0, 0, 0)"],
        correctAnswer: 0,
        explanation: "i × j = k, shuning uchun a⃗ × b⃗ = (0, 0, 1)",
        difficulty: "medium"
      },
      {
        id: "vb7",
        question: "a⃗ = (2, -1, 3) vektorning uzunligi?",
        options: ["√10", "√12", "√14", "√16"],
        correctAnswer: 2,
        explanation: "|a⃗| = √(4 + 1 + 9) = √14",
        difficulty: "medium"
      },
      {
        id: "vb8",
        question: "a⃗ = (1, 1), b⃗ = (1, -1) orasidagi burchak?",
        options: ["0°", "45°", "90°", "180°"],
        correctAnswer: 2,
        explanation: "a⃗ · b⃗ = 1 - 1 = 0, perpendikulyar, burchak 90°",
        difficulty: "hard"
      },
      {
        id: "vb9",
        question: "a⃗ = (3, 4) vektorning birlik vektori?",
        options: ["(3/5, 4/5)", "(3/7, 4/7)", "(1, 1)", "(0.6, 0.8)"],
        correctAnswer: 0,
        explanation: "e⃗ = a⃗/|a⃗| = (3/5, 4/5)",
        difficulty: "hard"
      },
      {
        id: "vb10",
        question: "a⃗ = (1, 2, 2), b⃗ = (2, -2, 1). Ular orasidagi burchakning kosinusi?",
        options: ["0", "1/9", "2/9", "1/3"],
        correctAnswer: 2,
        explanation: "cos θ = (a⃗·b⃗)/(|a⃗||b⃗|) = (2-4+2)/(3·3) = 0... Qayta: 2-4+2=0, cos=0",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "matrices-basics",
    title: "Matrisalar",
    category: "Matrisalar",
    icon: "Grid3X3",
    description: "Matrisalar ustida amallar",
    timeLimit: 15,
    questions: [
      {
        id: "mb1",
        question: "2×2 birlik matrisaning determinanti?",
        options: ["0", "1", "2", "4"],
        correctAnswer: 1,
        explanation: "Birlik matrisaning determinanti doim 1 ga teng",
        difficulty: "easy"
      },
      {
        id: "mb2",
        question: "A = [1 2; 3 4]. det(A) = ?",
        options: ["-2", "2", "10", "-10"],
        correctAnswer: 0,
        explanation: "det = 1·4 - 2·3 = 4 - 6 = -2",
        difficulty: "easy"
      },
      {
        id: "mb3",
        question: "A = [2 0; 0 3]. A ning izi (trace) = ?",
        options: ["5", "6", "0", "2"],
        correctAnswer: 0,
        explanation: "Iz = diagonal elementlar yig'indisi = 2 + 3 = 5",
        difficulty: "easy"
      },
      {
        id: "mb4",
        question: "A = [1 2; 3 4], B = [5 6; 7 8]. A + B = ?",
        options: ["[6 8; 10 12]", "[5 12; 21 32]", "[6 8; 9 12]", "[4 4; 4 4]"],
        correctAnswer: 0,
        explanation: "Matrisalarni qo'shishda mos elementlar qo'shiladi",
        difficulty: "easy"
      },
      {
        id: "mb5",
        question: "3×3 birlik matrisaning rangi?",
        options: ["0", "1", "2", "3"],
        correctAnswer: 3,
        explanation: "Birlik matrisaning rangi uning o'lchamiga teng",
        difficulty: "medium"
      },
      {
        id: "mb6",
        question: "A = [1 2; 3 4]. A⁻¹ mavjudmi?",
        options: ["Ha, det ≠ 0", "Yo'q, det = 0", "Faqat 3×3 bo'lsa", "Noma'lum"],
        correctAnswer: 0,
        explanation: "det(A) = -2 ≠ 0, demak teskari matritsa mavjud",
        difficulty: "medium"
      },
      {
        id: "mb7",
        question: "A = [1 0; 0 1], B = [2 3; 4 5]. A·B = ?",
        options: ["[2 3; 4 5]", "[1 0; 0 1]", "[3 3; 4 6]", "[2 0; 0 5]"],
        correctAnswer: 0,
        explanation: "Birlik matrisaga ko'paytirish matrisani o'zgartirmaydi",
        difficulty: "medium"
      },
      {
        id: "mb8",
        question: "A = [a b; c d]. det(A) = 0 bo'lsa, A qanday?",
        options: ["Birlik", "Singulyar", "Simmetrik", "Diagonal"],
        correctAnswer: 1,
        explanation: "det = 0 bo'lgan matritsa singulyar deyiladi",
        difficulty: "medium"
      },
      {
        id: "mb9",
        question: "A = [2 1; 1 2]. Xos qiymatlari?",
        options: ["1 va 2", "1 va 3", "2 va 3", "0 va 4"],
        correctAnswer: 1,
        explanation: "det(A - λI) = 0, (2-λ)² - 1 = 0, λ = 1 yoki 3",
        difficulty: "hard"
      },
      {
        id: "mb10",
        question: "3×3 matritsa uchun det(2A) = ?",
        options: ["2·det(A)", "4·det(A)", "8·det(A)", "6·det(A)"],
        correctAnswer: 2,
        explanation: "det(kA) = kⁿ·det(A), bu yerda n=3, 2³ = 8",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "limits-basics",
    title: "Limitlar",
    category: "Limitlar",
    icon: "ArrowRight",
    description: "Funksiyalar limiti va davomlilik",
    timeLimit: 15,
    questions: [
      {
        id: "lb1",
        question: "lim(x→2) (x² - 4)/(x - 2) = ?",
        options: ["0", "2", "4", "∞"],
        correctAnswer: 2,
        explanation: "(x² - 4)/(x - 2) = (x-2)(x+2)/(x-2) = x + 2. x→2 da 4",
        difficulty: "easy"
      },
      {
        id: "lb2",
        question: "lim(x→0) sin(x)/x = ?",
        options: ["0", "1", "∞", "undefined"],
        correctAnswer: 1,
        explanation: "Bu birinchi ajoyib limit: lim sin(x)/x = 1",
        difficulty: "easy"
      },
      {
        id: "lb3",
        question: "lim(x→∞) 1/x = ?",
        options: ["0", "1", "∞", "-∞"],
        correctAnswer: 0,
        explanation: "x cheksizlikka intilganda 1/x nolga intiladi",
        difficulty: "easy"
      },
      {
        id: "lb4",
        question: "lim(x→0) (1 + x)^(1/x) = ?",
        options: ["1", "2", "e", "∞"],
        correctAnswer: 2,
        explanation: "Bu ikkinchi ajoyib limit: (1 + 1/n)ⁿ → e",
        difficulty: "medium"
      },
      {
        id: "lb5",
        question: "lim(x→0) (eˣ - 1)/x = ?",
        options: ["0", "1", "e", "∞"],
        correctAnswer: 1,
        explanation: "Bu standart limit: lim(eˣ - 1)/x = 1",
        difficulty: "medium"
      },
      {
        id: "lb6",
        question: "lim(x→∞) (2x² + 3x)/(x² + 1) = ?",
        options: ["0", "2", "3", "∞"],
        correctAnswer: 1,
        explanation: "Yuqori darajalar teng, koeffitsientlar nisbati: 2/1 = 2",
        difficulty: "medium"
      },
      {
        id: "lb7",
        question: "lim(x→0) tan(x)/x = ?",
        options: ["0", "1", "∞", "undefined"],
        correctAnswer: 1,
        explanation: "tan(x)/x = sin(x)/(x·cos(x)) → 1·1 = 1",
        difficulty: "medium"
      },
      {
        id: "lb8",
        question: "lim(x→0) (1 - cos(x))/x² = ?",
        options: ["0", "1/2", "1", "2"],
        correctAnswer: 1,
        explanation: "L'Hopital yoki 1-cos(x) ≈ x²/2, limit = 1/2",
        difficulty: "hard"
      },
      {
        id: "lb9",
        question: "lim(x→∞) (1 + 3/x)^x = ?",
        options: ["1", "e", "e³", "3e"],
        correctAnswer: 2,
        explanation: "(1 + 3/x)^x = ((1 + 3/x)^(x/3))³ → e³",
        difficulty: "hard"
      },
      {
        id: "lb10",
        question: "lim(x→0) ln(1+x)/x = ?",
        options: ["0", "1", "e", "ln2"],
        correctAnswer: 1,
        explanation: "Bu standart limit: ln(1+x)/x → 1",
        difficulty: "hard"
      }
    ]
  },
  {
    id: "logarithms-advanced",
    title: "Logarifmlar",
    category: "Logarifmlar",
    icon: "Sigma",
    description: "Logarifmik ifodalar va tenglamalar",
    timeLimit: 15,
    questions: [
      {
        id: "la1",
        question: "log₁₀100 = ?",
        options: ["1", "2", "10", "100"],
        correctAnswer: 1,
        explanation: "10² = 100, shuning uchun log₁₀100 = 2",
        difficulty: "easy"
      },
      {
        id: "la2",
        question: "ln(e) = ?",
        options: ["0", "1", "e", "2.718"],
        correctAnswer: 1,
        explanation: "ln(e) = logₑ(e) = 1",
        difficulty: "easy"
      },
      {
        id: "la3",
        question: "log₂16 = ?",
        options: ["2", "3", "4", "8"],
        correctAnswer: 2,
        explanation: "2⁴ = 16, shuning uchun log₂16 = 4",
        difficulty: "easy"
      },
      {
        id: "la4",
        question: "log₃(1/9) = ?",
        options: ["-2", "-1", "1", "2"],
        correctAnswer: 0,
        explanation: "3⁻² = 1/9, shuning uchun log₃(1/9) = -2",
        difficulty: "medium"
      },
      {
        id: "la5",
        question: "log₂8 + log₂4 = ?",
        options: ["5", "6", "7", "12"],
        correctAnswer: 0,
        explanation: "log₂8 = 3, log₂4 = 2, jami = 5 yoki log₂32 = 5",
        difficulty: "medium"
      },
      {
        id: "la6",
        question: "log₅125 - log₅5 = ?",
        options: ["1", "2", "3", "25"],
        correctAnswer: 1,
        explanation: "log₅(125/5) = log₅25 = 2",
        difficulty: "medium"
      },
      {
        id: "la7",
        question: "2^(log₂5) = ?",
        options: ["2", "5", "10", "25"],
        correctAnswer: 1,
        explanation: "a^(logₐx) = x, shuning uchun 2^(log₂5) = 5",
        difficulty: "medium"
      },
      {
        id: "la8",
        question: "log₄16 · log₁₆4 = ?",
        options: ["1", "2", "4", "8"],
        correctAnswer: 0,
        explanation: "log₄16 = 2, log₁₆4 = 1/2, 2 · 1/2 = 1",
        difficulty: "hard"
      },
      {
        id: "la9",
        question: "logₐb · logᵦc · log꜀a = ?",
        options: ["0", "1", "abc", "a+b+c"],
        correctAnswer: 1,
        explanation: "Zanjir qoidasi bo'yicha bu ko'paytma 1 ga teng",
        difficulty: "hard"
      },
      {
        id: "la10",
        question: "log₂x = 3, log₂y = 5. log₂(x²y) = ?",
        options: ["8", "11", "15", "16"],
        correctAnswer: 1,
        explanation: "log₂(x²y) = 2log₂x + log₂y = 2·3 + 5 = 11",
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
