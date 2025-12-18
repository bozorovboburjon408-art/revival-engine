export interface MathTopic {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const mathTopics: MathTopic[] = [
  { id: "M1", title: "Yuqori tartibli hosilalar", description: "Ikkinchi tartibli hosilaning mexanik ma'nosi, hosilaning tadbiqlari, funksiyaning differensiali.", content: "# Yuqori Tartibli Hosilalar\n\n## 1. Ikkinchi tartibli hosila\n\n$$y'' = f''(x) = (f'(x))'$$" },
  { id: "M2", title: "Funksiyaning monotonligi va ekstremumi", description: "Kritik va ekstremum nuqtalari, grafigi botiqligi va qavariqligi.", content: "# Monotonlik va Ekstremum" },
  { id: "M3", title: "Aniqmas integral", description: "Boshlang'ich funksiya va aniqmas integralning ta'rifi, xossalari.", content: "# Aniqmas Integral" },
  { id: "M4", title: "Trigonometrik va irratsional integrallar", description: "Trigonometrik funksiyalar qatnashgan funksiyalarni integrallash.", content: "# Trigonometrik Integrallar" },
  { id: "M5", title: "Aniq integral", description: "Aniq integralga keltiriluvchi masalalar, Nyuton-Leybnits formulasi.", content: "# Aniq Integral" },
  { id: "M6", title: "Xosmas integrallar", description: "Chegaralari cheksiz xosmas integrallar.", content: "# Xosmas Integrallar" },
  { id: "M7", title: "Ko'p o'zgaruvchili funksiyalar", description: "Ko'p o'zgaruvchili funksiyaning ta'rifi, xususiy hosilalari.", content: "# Ko'p O'zgaruvchili Funksiyalar" },
  { id: "M8", title: "Yuqori tartibli xususiy hosilalar", description: "Yuqori tartibli xususiy hosilalar va differensiallar.", content: "# Yuqori Tartibli Xususiy Hosilalar" },
  { id: "M9", title: "Differensial tenglamalar asoslari", description: "Differensial tenglama keltiriluvchi masalalar.", content: "# Differensial Tenglamalar" },
  { id: "M10", title: "Maxsus tipli differensial tenglamalar", description: "Bir jinsli va chiziqli differensial tenglamalar.", content: "# Maxsus Tipli DT" },
  { id: "M11", title: "Yuqori tartibli differensial tenglamalar", description: "Yuqori tartibli DT uchun Koshi masalasi.", content: "# Yuqori Tartibli DT" },
  { id: "M12", title: "Chiziqli differensial tenglamalar", description: "Chiziqli bir jinsli differensial tenglamalar.", content: "# Chiziqli DT" },
  { id: "M13", title: "Sonli qatorlar", description: "Sonli qatorning asosiy tushunchalari.", content: "# Sonli Qatorlar" },
  { id: "M14", title: "Qatorlarning yaqinlashish alomatlari", description: "Dalamber alomati, Koshi alomatlari.", content: "# Yaqinlashish Alomatlari" },
  { id: "M15", title: "Funksional qatorlar", description: "Funksional qatorlar, darajali qatorlar.", content: "# Funksional Qatorlar" },
  { id: "M16", title: "Teylor va Fure qatorlari", description: "Funksiyalarni Teylor va Makloren qatorlariga yoyish.", content: "# Teylor va Fure Qatorlari" },
  { id: "M17", title: "Ikki o'lchovli integral", description: "Ikki o'lchovli integral, xossalari.", content: "# Ikki O'lchovli Integral" },
  { id: "M18", title: "Uch o'lchovli integral", description: "Uch o'lchovli integral va tadbiqlari.", content: "# Uch O'lchovli Integral" },
];

export const getTopicById = (id: string): MathTopic | undefined => {
  return mathTopics.find(topic => topic.id === id);
};
