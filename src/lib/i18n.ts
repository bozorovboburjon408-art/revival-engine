export type Language = 'uz' | 'en';

export const translations = {
  uz: {
    // Navigation
    nav: {
      library: "Kutubxona",
      formulas: "Formulalar",
      tests: "Testlar",
      graphics: "Grafika",
      replayAnimation: "Animatsiyani qayta ko'rish",
    },
    // Hero Section
    hero: {
      badge: "Interaktiv matematika platformasi",
      title: "Matematikani",
      titleHighlight: "osonlashtiring",
      subtitle: "Hosilalar, integrallar, differensial tenglamalar va boshqa mavzularni",
      subtitleHighlight: "interaktiv",
      subtitleEnd: "tarzda o'rganing",
      cta: "Boshlash",
      stats: {
        topics: "Mavzular",
        formulas: "Formulalar",
        examples: "Misollar",
      },
    },
    // Features Section
    features: {
      badge: "Asosiy imkoniyatlar",
      title: "To'rtta kuchli",
      titleHighlight: "bo'lim",
      subtitle: "Matematikani o'rganish uchun zarur bo'lgan barcha vositalar bir joyda",
      view: "Ko'rish",
      library: {
        title: "Kutubxona",
        description: "18 ta mavzu bo'yicha to'liq nazariy materiallar. Hosilalardan integrallar, qatorgacha.",
      },
      formulas: {
        title: "Formulalar",
        description: "174+ matematik formulalar. Algebra, geometriya, trigonometriya va boshqalar.",
      },
      tests: {
        title: "Test bo'limi",
        description: "Mavzular bo'yicha testlar. Savollar va avtomatik natijalar.",
      },
      graphics: {
        title: "Grafika",
        description: "Funksiyalar grafiklarini interaktiv tarzda chizing. Formuladan grafik.",
      },
    },
    // Topics Preview
    topics: {
      badge: "Mavzular",
      title: "O'rganishni",
      titleHighlight: "boshlang",
      subtitle: "Eng ko'p o'rganiladigan matematik mavzular",
      viewAll: "Barcha mavzularni ko'rish",
    },
    // Footer
    footer: {
      description: "Matematikani interaktiv tarzda o'rganing. Hosilalardan tortib differensial tenglamalargacha.",
      navigation: "Navigatsiya",
      moreTopics: "Mavzular",
      help: "Yordam",
      contact: "Bog'lanish",
      rights: "Barcha huquqlar himoyalangan.",
    },
    // Common
    common: {
      learnMore: "Batafsil",
      back: "Orqaga",
      next: "Keyingi",
      previous: "Oldingi",
      search: "Qidirish",
      loading: "Yuklanmoqda...",
    },
  },
  en: {
    // Navigation
    nav: {
      library: "Library",
      formulas: "Formulas",
      tests: "Tests",
      graphics: "Graphics",
      replayAnimation: "Replay Animation",
    },
    // Hero Section
    hero: {
      badge: "Interactive Math Platform",
      title: "Make Math",
      titleHighlight: "Simple",
      subtitle: "Learn derivatives, integrals, differential equations and more",
      subtitleHighlight: "interactively",
      subtitleEnd: "",
      cta: "Get Started",
      stats: {
        topics: "Topics",
        formulas: "Formulas",
        examples: "Examples",
      },
    },
    // Features Section
    features: {
      badge: "Key Features",
      title: "Four Powerful",
      titleHighlight: "Sections",
      subtitle: "All the tools you need to learn mathematics in one place",
      view: "View",
      library: {
        title: "Library",
        description: "Complete theoretical materials on 18 topics. From derivatives to integrals and series.",
      },
      formulas: {
        title: "Formulas",
        description: "174+ mathematical formulas. Algebra, geometry, trigonometry and more.",
      },
      tests: {
        title: "Test Section",
        description: "Topic-based tests with automatic results.",
      },
      graphics: {
        title: "Graphics",
        description: "Draw function graphs interactively. From formula to graph.",
      },
    },
    // Topics Preview
    topics: {
      badge: "Topics",
      title: "Start",
      titleHighlight: "Learning",
      subtitle: "Most studied mathematical topics",
      viewAll: "View All Topics",
    },
    // Footer
    footer: {
      description: "Learn mathematics interactively. From derivatives to differential equations.",
      navigation: "Navigation",
      moreTopics: "Topics",
      help: "Help",
      contact: "Contact",
      rights: "All rights reserved.",
    },
    // Common
    common: {
      learnMore: "Learn More",
      back: "Back",
      next: "Next",
      previous: "Previous",
      search: "Search",
      loading: "Loading...",
    },
  },
} as const;

// Create a flexible type that allows both languages' values
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends object ? DeepStringify<T[K]> : string;
};

export type TranslationKeys = DeepStringify<typeof translations.uz>;
