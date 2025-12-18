export interface MathTopic {
  id: string;
  title: string;
  description: string;
  content: string;
}

export const mathTopics: MathTopic[] = [
  { 
    id: "M1", 
    title: "Yuqori tartibli hosilalar", 
    description: "Ikkinchi tartibli hosilaning mexanik ma'nosi, hosilaning tadbiqlari, funksiyaning differensiali.", 
    content: `# Yuqori Tartibli Hosilalar

## 1. Ikkinchi tartibli hosila

Agar $f'(x)$ funksiya ham differensiallanuvchi bo'lsa, uning hosilasi **ikkinchi tartibli hosila** deyiladi:

$$y'' = f''(x) = \\frac{d^2y}{dx^2} = (f'(x))'$$

**Mexanik ma'nosi:** Agar $s(t)$ - jism yo'li bo'lsa, $s''(t)$ - tezlanish.

## 2. Asosiy formulalar

| Funksiya | Birinchi hosila | Ikkinchi hosila |
|----------|-----------------|-----------------|
| $x^n$ | $nx^{n-1}$ | $n(n-1)x^{n-2}$ |
| $e^x$ | $e^x$ | $e^x$ |
| $\\sin x$ | $\\cos x$ | $-\\sin x$ |
| $\\cos x$ | $-\\sin x$ | $-\\cos x$ |
| $\\ln x$ | $\\frac{1}{x}$ | $-\\frac{1}{x^2}$ |

## 3. n-tartibli hosila

$$y^{(n)} = f^{(n)}(x) = \\frac{d^n y}{dx^n}$$

**Leybnits formulasi** (ko'paytmaning n-hosilasi):

$$(uv)^{(n)} = \\sum_{k=0}^{n} C_n^k \\cdot u^{(n-k)} \\cdot v^{(k)}$$

bu yerda $C_n^k = \\frac{n!}{k!(n-k)!}$

## 4. Differensial

Birinchi tartibli differensial: $dy = f'(x)dx$

Ikkinchi tartibli differensial: $d^2y = f''(x)dx^2$

n-tartibli differensial: $d^ny = f^{(n)}(x)dx^n$

## 5. Misol

$y = x^4$ funksiyaning hosilalari:
- $y' = 4x^3$
- $y'' = 12x^2$  
- $y''' = 24x$
- $y^{(4)} = 24$
- $y^{(5)} = 0$
` 
  },
  { 
    id: "M2", 
    title: "Funksiyaning monotonligi va ekstremumi", 
    description: "Kritik va ekstremum nuqtalari, grafigi botiqligi va qavariqligi.", 
    content: `# Funksiyaning Monotonligi va Ekstremumi

## 1. Monotonlik shartlari

Agar $f'(x) > 0$ bo'lsa — funksiya **o'sadi** ↗

Agar $f'(x) < 0$ bo'lsa — funksiya **kamayadi** ↘

## 2. Kritik nuqtalar

**Kritik nuqta** — $f'(x) = 0$ yoki $f'(x)$ mavjud bo'lmagan nuqta.

## 3. Ekstremum (eng katta/kichik qiymatlar)

**Birinchi yetarli shart:**
- $f'(x)$ ishorasi "+" dan "−" ga o'tsa → **maksimum**
- $f'(x)$ ishorasi "−" dan "+" ga o'tsa → **minimum**

**Ikkinchi yetarli shart:**
Agar $f'(x_0) = 0$ bo'lsa:
- $f''(x_0) < 0$ → **maksimum**
- $f''(x_0) > 0$ → **minimum**

## 4. Qavariqlik va botiqlik

$$f''(x) > 0 \\Rightarrow \\text{botiq (pastga qarab)}$$
$$f''(x) < 0 \\Rightarrow \\text{qavariq (yuqoriga qarab)}$$

**Egilish nuqtasi** — qavariqlik o'zgaradigan nuqta ($f''(x) = 0$)

## 5. Funksiya grafigini tekshirish algoritmi

1. Aniqlanish sohasini toping
2. $f'(x) = 0$ tenglamani yeching (kritik nuqtalar)
3. Monotonlikni aniqlang
4. Ekstremumlarni toping
5. $f''(x) = 0$ tenglamani yeching (egilish nuqtalari)
6. Qavariqlikni aniqlang
7. Asimptotalarni toping
8. Grafikni chizing

## 6. Misol

$f(x) = x^3 - 3x$ funksiyani tekshiring:

$f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$

Kritik nuqtalar: $x = -1, x = 1$

$f''(x) = 6x$

$x = -1$: $f''(-1) = -6 < 0$ → **maksimum**, $f(-1) = 2$

$x = 1$: $f''(1) = 6 > 0$ → **minimum**, $f(1) = -2$
` 
  },
  { 
    id: "M3", 
    title: "Aniqmas integral", 
    description: "Boshlang'ich funksiya va aniqmas integralning ta'rifi, xossalari.", 
    content: `# Aniqmas Integral

## 1. Ta'rif

$F(x)$ funksiya $f(x)$ ning **boshlang'ich funksiyasi** deyiladi, agar:

$$F'(x) = f(x)$$

**Aniqmas integral:**

$$\\int f(x)dx = F(x) + C$$

bu yerda $C$ — ixtiyoriy konstanta.

## 2. Asosiy integrallash formulalari

$$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$$

$$\\int \\frac{1}{x} dx = \\ln|x| + C$$

$$\\int e^x dx = e^x + C$$

$$\\int a^x dx = \\frac{a^x}{\\ln a} + C$$

$$\\int \\sin x \\, dx = -\\cos x + C$$

$$\\int \\cos x \\, dx = \\sin x + C$$

$$\\int \\frac{1}{\\cos^2 x} dx = \\tan x + C$$

$$\\int \\frac{1}{\\sin^2 x} dx = -\\cot x + C$$

$$\\int \\frac{1}{1+x^2} dx = \\arctan x + C$$

$$\\int \\frac{1}{\\sqrt{1-x^2}} dx = \\arcsin x + C$$

## 3. Xossalari

$$\\int (f + g)dx = \\int f \\, dx + \\int g \\, dx$$

$$\\int k \\cdot f(x)dx = k \\cdot \\int f(x)dx$$

## 4. O'rniga qo'yish usuli

Agar $x = \\varphi(t)$, unda:

$$\\int f(x)dx = \\int f(\\varphi(t)) \\cdot \\varphi'(t)dt$$

## 5. Bo'laklab integrallash

$$\\int u \\, dv = uv - \\int v \\, du$$

**Misol:** $\\int x \\cdot e^x dx$

$u = x$, $dv = e^x dx$, $du = dx$, $v = e^x$

$$\\int x \\cdot e^x dx = x \\cdot e^x - \\int e^x dx = xe^x - e^x + C = e^x(x-1) + C$$
` 
  },
  { 
    id: "M4", 
    title: "Trigonometrik va irratsional integrallar", 
    description: "Trigonometrik funksiyalar qatnashgan funksiyalarni integrallash.", 
    content: `# Trigonometrik va Irratsional Integrallar

## 1. Asosiy trigonometrik formulalar

$$\\sin^2 x + \\cos^2 x = 1$$

$$\\sin^2 x = \\frac{1 - \\cos 2x}{2}$$

$$\\cos^2 x = \\frac{1 + \\cos 2x}{2}$$

$$\\sin x \\cos x = \\frac{\\sin 2x}{2}$$

## 2. $\\int \\sin^n x \\, dx$ va $\\int \\cos^n x \\, dx$ integrallar

Agar $n$ toq son bo'lsa, bir daraja ajratib o'rniga qo'yish usulidan foydalanamiz.

**Misol:** $\\int \\sin^3 x \\, dx$

$$= \\int \\sin^2 x \\cdot \\sin x \\, dx = \\int (1-\\cos^2 x) \\sin x \\, dx$$

$t = \\cos x$, $dt = -\\sin x \\, dx$

$$= -\\int (1-t^2)dt = -t + \\frac{t^3}{3} + C = -\\cos x + \\frac{\\cos^3 x}{3} + C$$

## 3. Universal trigonometrik o'rniga qo'yish

$$t = \\tan \\frac{x}{2}$$

$$\\sin x = \\frac{2t}{1+t^2}, \\quad \\cos x = \\frac{1-t^2}{1+t^2}, \\quad dx = \\frac{2dt}{1+t^2}$$

## 4. Irratsional integrallar

**Turi 1:** $\\int R(x, \\sqrt[n]{\\frac{ax+b}{cx+d}}) dx$

O'rniga qo'yish: $t = \\sqrt[n]{\\frac{ax+b}{cx+d}}$

**Turi 2:** $\\int R(x, \\sqrt{a^2-x^2}) dx$

O'rniga qo'yish: $x = a\\sin t$ yoki $x = a\\cos t$

**Turi 3:** $\\int R(x, \\sqrt{x^2+a^2}) dx$

O'rniga qo'yish: $x = a\\tan t$

**Turi 4:** $\\int R(x, \\sqrt{x^2-a^2}) dx$

O'rniga qo'yish: $x = \\frac{a}{\\cos t}$

## 5. Eyler almashtirishlari

$\\int R(x, \\sqrt{ax^2+bx+c}) dx$ uchun:

1. $a > 0$: $\\sqrt{ax^2+bx+c} = t \\pm x\\sqrt{a}$
2. $c > 0$: $\\sqrt{ax^2+bx+c} = tx \\pm \\sqrt{c}$
3. Ildizlar mavjud: $\\sqrt{ax^2+bx+c} = t(x-x_1)$
` 
  },
  { 
    id: "M5", 
    title: "Aniq integral", 
    description: "Aniq integralga keltiriluvchi masalalar, Nyuton-Leybnits formulasi.", 
    content: `# Aniq Integral

## 1. Ta'rif (Riman integrali)

$$\\int_a^b f(x)dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i) \\Delta x_i$$

## 2. Nyuton-Leybnits formulasi

$$\\int_a^b f(x)dx = F(b) - F(a) = F(x) \\Big|_a^b$$

bu yerda $F(x)$ — $f(x)$ ning boshlang'ich funksiyasi.

## 3. Xossalari

$$\\int_a^a f(x)dx = 0$$

$$\\int_a^b f(x)dx = -\\int_b^a f(x)dx$$

$$\\int_a^b f(x)dx = \\int_a^c f(x)dx + \\int_c^b f(x)dx$$

$$\\int_a^b [f(x) \\pm g(x)]dx = \\int_a^b f(x)dx \\pm \\int_a^b g(x)dx$$

$$\\int_a^b k \\cdot f(x)dx = k \\cdot \\int_a^b f(x)dx$$

## 4. Geometrik tadbiqlari

**Yuzani hisoblash:**

$$S = \\int_a^b |f(x)| dx$$

**Ikki egri chiziq orasidagi yuza:**

$$S = \\int_a^b |f(x) - g(x)| dx$$

**Aylanish jismi hajmi (Ox atrofida):**

$$V = \\pi \\int_a^b [f(x)]^2 dx$$

**Yoy uzunligi:**

$$L = \\int_a^b \\sqrt{1 + [f'(x)]^2} dx$$

## 5. O'rtacha qiymat teoremasi

$$f(c) = \\frac{1}{b-a} \\int_a^b f(x)dx$$

bu yerda $c \\in [a, b]$

## 6. Misol

$\\int_0^2 x^2 dx$ ni hisoblang:

$$\\int_0^2 x^2 dx = \\frac{x^3}{3} \\Big|_0^2 = \\frac{8}{3} - 0 = \\frac{8}{3}$$

**Yuza misoli:** $y = x^2$ va $y = x$ orasidagi yuza (0 dan 1 gacha):

$$S = \\int_0^1 (x - x^2)dx = \\frac{x^2}{2} - \\frac{x^3}{3} \\Big|_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$$
` 
  },
  { 
    id: "M6", 
    title: "Xosmas integrallar", 
    description: "Chegaralari cheksiz xosmas integrallar.", 
    content: `# Xosmas Integrallar

## 1. Birinchi tur (cheksiz chegarali)

$$\\int_a^{+\\infty} f(x)dx = \\lim_{b \\to +\\infty} \\int_a^b f(x)dx$$

$$\\int_{-\\infty}^b f(x)dx = \\lim_{a \\to -\\infty} \\int_a^b f(x)dx$$

$$\\int_{-\\infty}^{+\\infty} f(x)dx = \\int_{-\\infty}^c f(x)dx + \\int_c^{+\\infty} f(x)dx$$

Agar limit mavjud va chekli bo'lsa — integral **yaqinlashadi**.

## 2. Muhim misol

$$\\int_1^{+\\infty} \\frac{1}{x^p} dx = \\begin{cases} \\frac{1}{p-1} & \\text{agar } p > 1 \\\\ +\\infty & \\text{agar } p \\leq 1 \\end{cases}$$

## 3. Ikkinchi tur (chegaralanmagan funksiya)

Agar $f(x)$ da $x = a$ nuqtada uzilish bo'lsa:

$$\\int_a^b f(x)dx = \\lim_{\\varepsilon \\to 0^+} \\int_{a+\\varepsilon}^b f(x)dx$$

## 4. Solishtirish alomati

Agar $0 \\leq f(x) \\leq g(x)$ barcha $x \\geq a$ uchun:

- $\\int_a^{+\\infty} g(x)dx$ yaqinlashsa → $\\int_a^{+\\infty} f(x)dx$ ham yaqinlashadi
- $\\int_a^{+\\infty} f(x)dx$ yaqinlashmasa → $\\int_a^{+\\infty} g(x)dx$ ham yaqinlashmaydi

## 5. Absolut yaqinlashish

Agar $\\int_a^{+\\infty} |f(x)|dx$ yaqinlashsa, u holda $\\int_a^{+\\infty} f(x)dx$ **absolut yaqinlashadi**.

## 6. Misollar

**Misol 1:** $\\int_1^{+\\infty} \\frac{1}{x^2} dx$

$$= \\lim_{b \\to +\\infty} \\left[-\\frac{1}{x}\\right]_1^b = \\lim_{b \\to +\\infty} \\left(-\\frac{1}{b} + 1\\right) = 1$$

**Misol 2:** $\\int_0^1 \\frac{1}{\\sqrt{x}} dx$

$$= \\lim_{\\varepsilon \\to 0^+} \\int_{\\varepsilon}^1 x^{-1/2} dx = \\lim_{\\varepsilon \\to 0^+} [2\\sqrt{x}]_{\\varepsilon}^1 = 2 - 0 = 2$$

**Misol 3:** $\\int_0^{+\\infty} e^{-x} dx = [-e^{-x}]_0^{+\\infty} = 0 - (-1) = 1$
` 
  },
  { 
    id: "M7", 
    title: "Ko'p o'zgaruvchili funksiyalar", 
    description: "Ko'p o'zgaruvchili funksiyaning ta'rifi, xususiy hosilalari.", 
    content: `# Ko'p O'zgaruvchili Funksiyalar

## 1. Ta'rif

$z = f(x, y)$ — ikki o'zgaruvchili funksiya.

**Aniqlanish sohasi** $D$ — $(x, y)$ nuqtalar to'plami.

## 2. Limit va uzluksizlik

$$\\lim_{(x,y) \\to (x_0, y_0)} f(x, y) = L$$

Funksiya $(x_0, y_0)$ da uzluksiz, agar:
$$\\lim_{(x,y) \\to (x_0, y_0)} f(x, y) = f(x_0, y_0)$$

## 3. Xususiy hosilalar

$x$ bo'yicha xususiy hosila ($y$ ni konstanta deb):

$$\\frac{\\partial f}{\\partial x} = f_x = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x, y) - f(x, y)}{\\Delta x}$$

$y$ bo'yicha xususiy hosila ($x$ ni konstanta deb):

$$\\frac{\\partial f}{\\partial y} = f_y = \\lim_{\\Delta y \\to 0} \\frac{f(x, y + \\Delta y) - f(x, y)}{\\Delta y}$$

## 4. Gradient

$$\\nabla f = \\text{grad } f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right)$$

Gradient eng tez o'sish yo'nalishini ko'rsatadi.

## 5. To'liq differensial

$$df = \\frac{\\partial f}{\\partial x} dx + \\frac{\\partial f}{\\partial y} dy$$

## 6. Yo'nalish bo'yicha hosila

$\\vec{l} = (\\cos \\alpha, \\cos \\beta)$ yo'nalishi bo'yicha:

$$\\frac{\\partial f}{\\partial l} = \\frac{\\partial f}{\\partial x} \\cos \\alpha + \\frac{\\partial f}{\\partial y} \\cos \\beta$$

## 7. Misol

$f(x, y) = x^2y + 3xy^2 - 2y$ funksiya uchun:

$$f_x = 2xy + 3y^2$$

$$f_y = x^2 + 6xy - 2$$

$(1, 2)$ nuqtada:
- $f_x(1, 2) = 2 \\cdot 1 \\cdot 2 + 3 \\cdot 4 = 16$
- $f_y(1, 2) = 1 + 12 - 2 = 11$

Gradient: $\\nabla f(1, 2) = (16, 11)$
` 
  },
  { 
    id: "M8", 
    title: "Yuqori tartibli xususiy hosilalar", 
    description: "Yuqori tartibli xususiy hosilalar va differensiallar.", 
    content: `# Yuqori Tartibli Xususiy Hosilalar

## 1. Ikkinchi tartibli xususiy hosilalar

$$f_{xx} = \\frac{\\partial^2 f}{\\partial x^2} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial x}\\right)$$

$$f_{yy} = \\frac{\\partial^2 f}{\\partial y^2} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial y}\\right)$$

**Aralash hosilalar:**

$$f_{xy} = \\frac{\\partial^2 f}{\\partial y \\partial x} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial x}\\right)$$

$$f_{yx} = \\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial y}\\right)$$

## 2. Shvarts teoremasi

Agar aralash hosilalar uzluksiz bo'lsa:

$$f_{xy} = f_{yx}$$

## 3. Gessian matritsasi

$$H = \\begin{pmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{pmatrix}$$

**Gessian determinanti:**

$$|H| = f_{xx} \\cdot f_{yy} - (f_{xy})^2$$

## 4. Ekstremum shartlari

$(x_0, y_0)$ kritik nuqtada ($f_x = f_y = 0$):

- $|H| > 0$ va $f_{xx} > 0$ → **minimum**
- $|H| > 0$ va $f_{xx} < 0$ → **maksimum**
- $|H| < 0$ → **egar nuqtasi** (ekstremum yo'q)
- $|H| = 0$ → qo'shimcha tekshiruv kerak

## 5. Ikkinchi tartibli differensial

$$d^2f = f_{xx}dx^2 + 2f_{xy}dxdy + f_{yy}dy^2$$

## 6. Laplas operatori

$$\\Delta f = \\nabla^2 f = f_{xx} + f_{yy}$$

Agar $\\Delta f = 0$ bo'lsa, $f$ **garmonik funksiya** deyiladi.

## 7. Misol

$f(x, y) = x^3 + y^3 - 3xy$ funksiyaning ekstremumlarini toping.

$f_x = 3x^2 - 3y = 0 \\Rightarrow y = x^2$

$f_y = 3y^2 - 3x = 0 \\Rightarrow x = y^2$

Kritik nuqtalar: $(0, 0)$ va $(1, 1)$

$f_{xx} = 6x$, $f_{yy} = 6y$, $f_{xy} = -3$

$(1, 1)$ da: $|H| = 36 - 9 = 27 > 0$, $f_{xx} = 6 > 0$ → **minimum**

$(0, 0)$ da: $|H| = 0 - 9 = -9 < 0$ → **egar nuqtasi**
` 
  },
  { 
    id: "M9", 
    title: "Differensial tenglamalar asoslari", 
    description: "Differensial tenglama keltiriluvchi masalalar.", 
    content: `# Differensial Tenglamalar Asoslari

## 1. Ta'rif

**Differensial tenglama (DT)** — noma'lum funksiya va uning hosilalarini o'z ichiga olgan tenglama.

$$F(x, y, y', y'', ..., y^{(n)}) = 0$$

**Tartib** — eng yuqori hosila tartibi.

## 2. Yechim turlari

- **Umumiy yechim** — $n$ ta ixtiyoriy konstantali yechim
- **Xususiy yechim** — konstantalarga aniq qiymat berilgan yechim
- **Singular yechim** — umumiy yechimdan olinmaydigan yechim

## 3. Koshi masalasi

DT ni boshlang'ich shartlar bilan yechish:

$$y' = f(x, y), \\quad y(x_0) = y_0$$

## 4. Ajratiluvchi o'zgaruvchili DT

$$g(y)dy = f(x)dx$$

**Yechish:** Ikkala tomonni integrallaymiz.

**Misol:** $y' = xy$

$$\\frac{dy}{y} = x \\, dx$$

$$\\ln|y| = \\frac{x^2}{2} + C$$

$$y = Ce^{x^2/2}$$

## 5. Bir jinsli DT

$$y' = f\\left(\\frac{y}{x}\\right)$$

**O'rniga qo'yish:** $y = ux$, $y' = u'x + u$

## 6. Chiziqli DT (birinchi tartib)

$$y' + p(x)y = q(x)$$

**Yechim (konstantalarni variatsiyalash usuli):**

$$y = e^{-\\int p \\, dx} \\left( \\int q \\cdot e^{\\int p \\, dx} dx + C \\right)$$

## 7. Bernulli tenglamasi

$$y' + p(x)y = q(x)y^n \\quad (n \\neq 0, 1)$$

**O'rniga qo'yish:** $z = y^{1-n}$

## 8. Misol

$y' + 2y = e^{-x}$ tenglamasini yeching.

$p(x) = 2$, $q(x) = e^{-x}$

Integrallovchi omil: $\\mu = e^{\\int 2dx} = e^{2x}$

$$y = e^{-2x}\\left(\\int e^{-x} \\cdot e^{2x} dx + C\\right)$$

$$y = e^{-2x}(e^x + C) = e^{-x} + Ce^{-2x}$$
` 
  },
  { 
    id: "M10", 
    title: "Maxsus tipli differensial tenglamalar", 
    description: "Bir jinsli va chiziqli differensial tenglamalar.", 
    content: `# Maxsus Tipli Differensial Tenglamalar

## 1. To'liq differensial tenglama

$$M(x,y)dx + N(x,y)dy = 0$$

**To'liqlik sharti:** $\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}$

Unda mavjud $U(x,y)$: $dU = Mdx + Ndy$

**Yechim:** $U(x,y) = C$

## 2. Integrallovchi ko'paytiruvchi

Agar tenglama to'liq bo'lmasa, $\\mu(x,y)$ topamiz:

$$\\mu M dx + \\mu N dy = 0$$ to'liq bo'lsin.

Agar $\\frac{M_y - N_x}{N}$ faqat $x$ ga bog'liq bo'lsa:

$$\\mu = e^{\\int \\frac{M_y - N_x}{N} dx}$$

## 3. Rikatti tenglamasi

$$y' = p(x)y^2 + q(x)y + r(x)$$

Agar xususiy yechim $y_1$ ma'lum bo'lsa, $y = y_1 + \\frac{1}{z}$ almashtiramiz.

## 4. Klero tenglamasi

$$y = xy' + f(y')$$

**Yechish:** $y' = p$ deb belgilaymiz:

$$y = xp + f(p)$$

Differensiallash: $(x + f'(p))dp = 0$

**Umumiy yechim:** $y = Cx + f(C)$

**Singular yechim:** $x = -f'(p)$, $y = xp + f(p)$

## 5. Lagrandj tenglamasi

$$y = x\\varphi(y') + \\psi(y')$$

$y' = p$ deb, $x$ ni $p$ ning funksiyasi sifatida topamiz.

## 6. Trayektoriyalar oilasi

**Ortogonal trayektoriyalar** — berilgan egri chiziqlar oilasiga perpendikulyar chiziqlar.

$F(x, y, C) = 0$ oilasi uchun:

1. $C$ ni yo'q qilamiz
2. $y'$ ni $-\\frac{1}{y'}$ ga almashtiramiz
3. Yangi DTni yechamiz

## 7. Misol

$(2xy + 3)dx + (x^2 + 4y)dy = 0$

$M = 2xy + 3$, $N = x^2 + 4y$

$M_y = 2x$, $N_x = 2x$ ✓ To'liq!

$U = \\int (2xy + 3)dx = x^2y + 3x + \\varphi(y)$

$U_y = x^2 + \\varphi'(y) = x^2 + 4y$

$\\varphi'(y) = 4y \\Rightarrow \\varphi(y) = 2y^2$

**Yechim:** $x^2y + 3x + 2y^2 = C$
` 
  },
  { 
    id: "M11", 
    title: "Yuqori tartibli differensial tenglamalar", 
    description: "Yuqori tartibli DT uchun Koshi masalasi.", 
    content: `# Yuqori Tartibli Differensial Tenglamalar

## 1. Umumiy ko'rinish

$$F(x, y, y', y'', ..., y^{(n)}) = 0$$

**Koshi masalasi boshlang'ich shartlari:**

$$y(x_0) = y_0, \\quad y'(x_0) = y_1, \\quad ..., \\quad y^{(n-1)}(x_0) = y_{n-1}$$

## 2. Tartibni pasaytirish usullari

### 2.1 $y$ yo'q: $F(x, y', y'') = 0$

O'rniga qo'yish: $y' = p$, $y'' = p'$

### 2.2 $x$ yo'q: $F(y, y', y'') = 0$

O'rniga qo'yish: $y' = p$, $y'' = p\\frac{dp}{dy}$

## 3. Ikkinchi tartibli chiziqli DT

$$y'' + p(x)y' + q(x)y = f(x)$$

**Bir jinsli:** $f(x) = 0$

**Bir jinsli emas:** $f(x) \\neq 0$

## 4. O'zgarmas koeffitsientli bir jinsli DT

$$y'' + py' + qy = 0$$

**Xarakteristik tenglama:** $k^2 + pk + q = 0$

**Ildizlarga qarab yechim:**

| Ildizlar | Umumiy yechim |
|----------|---------------|
| $k_1 \\neq k_2$ (haqiqiy) | $y = C_1e^{k_1x} + C_2e^{k_2x}$ |
| $k_1 = k_2 = k$ (takroriy) | $y = (C_1 + C_2x)e^{kx}$ |
| $k = \\alpha \\pm \\beta i$ (kompleks) | $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$ |

## 5. Bir jinsli emas DT yechimi

$$y = y_h + y_p$$

- $y_h$ — bir jinsli DT yechimi
- $y_p$ — xususiy yechim

## 6. Noaniq koeffitsientlar usuli

$f(x) = e^{\\alpha x}P_n(x)$ uchun:

- $\\alpha$ ildiz emas: $y_p = e^{\\alpha x}Q_n(x)$
- $\\alpha$ oddiy ildiz: $y_p = xe^{\\alpha x}Q_n(x)$
- $\\alpha$ ikki karrali ildiz: $y_p = x^2e^{\\alpha x}Q_n(x)$

## 7. Misol

$y'' - 5y' + 6y = 0$

Xarakteristik tenglama: $k^2 - 5k + 6 = 0$

$(k-2)(k-3) = 0 \\Rightarrow k_1 = 2, k_2 = 3$

**Umumiy yechim:** $y = C_1e^{2x} + C_2e^{3x}$
` 
  },
  { 
    id: "M12", 
    title: "Chiziqli differensial tenglamalar", 
    description: "Chiziqli bir jinsli differensial tenglamalar.", 
    content: `# Chiziqli Differensial Tenglamalar

## 1. n-tartibli chiziqli DT

$$y^{(n)} + p_1(x)y^{(n-1)} + ... + p_{n-1}(x)y' + p_n(x)y = f(x)$$

## 2. Yechimlar superpozitsiyasi

Agar $y_1, y_2$ — bir jinsli DT yechimlari bo'lsa, $C_1y_1 + C_2y_2$ ham yechim.

## 3. Vronskian determinanti

$$W(y_1, y_2, ..., y_n) = \\begin{vmatrix} y_1 & y_2 & ... & y_n \\\\ y_1' & y_2' & ... & y_n' \\\\ ... & ... & ... & ... \\\\ y_1^{(n-1)} & y_2^{(n-1)} & ... & y_n^{(n-1)} \\end{vmatrix}$$

Yechimlar chiziqli erkli ⟺ $W \\neq 0$

## 4. Konstantalarni variatsiyalash usuli

$y'' + py' + qy = f(x)$ uchun:

Bir jinsli yechim: $y_h = C_1y_1 + C_2y_2$

Xususiy yechim qidiramiz: $y_p = u_1(x)y_1 + u_2(x)y_2$

**Sistema:**
$$u_1'y_1 + u_2'y_2 = 0$$
$$u_1'y_1' + u_2'y_2' = f(x)$$

**Yechim:**
$$u_1 = -\\int \\frac{y_2 f}{W} dx, \\quad u_2 = \\int \\frac{y_1 f}{W} dx$$

## 5. O'zgarmas koeffitsientli sistemalar

$$\\vec{y}' = A\\vec{y}$$

**Yechim:** $\\vec{y} = \\vec{v}e^{\\lambda x}$, bu yerda $\\lambda$ — $A$ ning xos qiymati, $\\vec{v}$ — xos vektor.

## 6. Chiziqli operatorlar

$$L[y] = y^{(n)} + p_1y^{(n-1)} + ... + p_ny$$

**Xossalari:**
- $L[y_1 + y_2] = L[y_1] + L[y_2]$
- $L[cy] = cL[y]$

## 7. Misol

$y'' - 3y' + 2y = e^{3x}$ ni yeching.

**Bir jinsli yechim:** $k^2 - 3k + 2 = 0 \\Rightarrow k = 1, 2$

$y_h = C_1e^x + C_2e^{2x}$

**Xususiy yechim:** $y_p = Ae^{3x}$ (3 ildiz emas)

$9Ae^{3x} - 9Ae^{3x} + 2Ae^{3x} = e^{3x}$

$2A = 1 \\Rightarrow A = \\frac{1}{2}$

**Umumiy yechim:** $y = C_1e^x + C_2e^{2x} + \\frac{1}{2}e^{3x}$
` 
  },
  { 
    id: "M13", 
    title: "Sonli qatorlar", 
    description: "Sonli qatorning asosiy tushunchalari.", 
    content: `# Sonli Qatorlar

## 1. Ta'rif

**Sonli qator** — cheksiz yig'indi:

$$\\sum_{n=1}^{\\infty} a_n = a_1 + a_2 + a_3 + ...$$

**Qisman yig'indi:** $S_n = a_1 + a_2 + ... + a_n$

## 2. Yaqinlashish

Qator **yaqinlashadi**, agar:

$$\\lim_{n \\to \\infty} S_n = S$$

mavjud va chekli. Aks holda qator **yaqinlashmaydi**.

## 3. Zaruriy shart

Agar qator yaqinlashsa, $\\lim_{n \\to \\infty} a_n = 0$

**Eslatma:** Bu yetarli shart emas!

## 4. Geometrik qator

$$\\sum_{n=0}^{\\infty} q^n = 1 + q + q^2 + ... = \\frac{1}{1-q} \\quad (|q| < 1)$$

$|q| \\geq 1$ bo'lsa, qator yaqinlashmaydi.

## 5. Garmonik qator

$$\\sum_{n=1}^{\\infty} \\frac{1}{n} = 1 + \\frac{1}{2} + \\frac{1}{3} + ...$$

Bu qator **yaqinlashmaydi** (divergent)!

## 6. Umumlashgan garmonik qator

$$\\sum_{n=1}^{\\infty} \\frac{1}{n^p} = \\begin{cases} \\text{yaqinlashadi} & p > 1 \\\\ \\text{yaqinlashmaydi} & p \\leq 1 \\end{cases}$$

## 7. Alternativ (ishorasi almashuvchi) qator

$$\\sum_{n=1}^{\\infty} (-1)^{n+1} a_n = a_1 - a_2 + a_3 - ...$$

**Leybnits alomati:** Agar $a_n > 0$, $a_n \\geq a_{n+1}$, va $\\lim a_n = 0$, qator yaqinlashadi.

## 8. Absolut va shartli yaqinlashish

- **Absolut yaqinlashish:** $\\sum |a_n|$ yaqinlashadi
- **Shartli yaqinlashish:** $\\sum a_n$ yaqinlashadi, lekin $\\sum |a_n|$ yaqinlashmaydi

## 9. Misollar

**Misol 1:** $\\sum_{n=1}^{\\infty} \\frac{1}{2^n} = \\frac{1/2}{1-1/2} = 1$

**Misol 2:** $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} = 1 - \\frac{1}{2} + \\frac{1}{3} - ... = \\ln 2$

(Shartli yaqinlashadi)
` 
  },
  { 
    id: "M14", 
    title: "Qatorlarning yaqinlashish alomatlari", 
    description: "Dalamber alomati, Koshi alomatlari.", 
    content: `# Qatorlarning Yaqinlashish Alomatlari

## 1. Solishtirish alomati

Agar $0 \\leq a_n \\leq b_n$ barcha $n$ uchun:

- $\\sum b_n$ yaqinlashsa → $\\sum a_n$ yaqinlashadi
- $\\sum a_n$ yaqinlashmasa → $\\sum b_n$ yaqinlashmaydi

## 2. Limitli solishtirish alomati

$$\\lim_{n \\to \\infty} \\frac{a_n}{b_n} = L$$

- $0 < L < \\infty$: ikkala qator bir xil xulq-atvorda
- $L = 0$: $\\sum b_n$ yaqinlashsa → $\\sum a_n$ yaqinlashadi
- $L = \\infty$: $\\sum b_n$ yaqinlashmasa → $\\sum a_n$ yaqinlashmaydi

## 3. Dalamber alomati (nisba alomati)

$$L = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|$$

- $L < 1$: qator **absolut yaqinlashadi**
- $L > 1$: qator **yaqinlashmaydi**
- $L = 1$: alomat javob bermaydi

## 4. Koshi alomati (ildiz alomati)

$$L = \\lim_{n \\to \\infty} \\sqrt[n]{|a_n|}$$

- $L < 1$: qator **absolut yaqinlashadi**
- $L > 1$: qator **yaqinlashmaydi**
- $L = 1$: alomat javob bermaydi

## 5. Integral alomati

Agar $f(x) \\geq 0$, monoton kamayuvchi va $f(n) = a_n$:

$$\\sum_{n=1}^{\\infty} a_n \\text{ va } \\int_1^{\\infty} f(x)dx$$

bir vaqtda yaqinlashadi yoki yaqinlashmaydi.

## 6. Raabe alomati

$$R = \\lim_{n \\to \\infty} n\\left(\\frac{a_n}{a_{n+1}} - 1\\right)$$

- $R > 1$: yaqinlashadi
- $R < 1$: yaqinlashmaydi
- $R = 1$: javob bermaydi

## 7. Misollar

**Misol 1 (Dalamber):** $\\sum \\frac{n!}{n^n}$

$$L = \\lim \\frac{(n+1)!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{n!} = \\lim \\frac{n^n}{(n+1)^n} = \\lim \\left(\\frac{n}{n+1}\\right)^n = \\frac{1}{e} < 1$$

**Yaqinlashadi!**

**Misol 2 (Koshi):** $\\sum \\left(\\frac{n}{2n+1}\\right)^n$

$$L = \\lim \\frac{n}{2n+1} = \\frac{1}{2} < 1$$

**Yaqinlashadi!**
` 
  },
  { 
    id: "M15", 
    title: "Funksional qatorlar", 
    description: "Funksional qatorlar, darajali qatorlar.", 
    content: `# Funksional Qatorlar

## 1. Ta'rif

**Funksional qator:**

$$\\sum_{n=1}^{\\infty} u_n(x) = u_1(x) + u_2(x) + u_3(x) + ...$$

**Yaqinlashish sohasi** — qator yaqinlashadigan $x$ qiymatlar to'plami.

## 2. Tekis yaqinlashish

Qator $[a, b]$ da **tekis yaqinlashadi**, agar:

$$\\forall \\varepsilon > 0, \\exists N: \\forall n > N, \\forall x \\in [a,b]: |S_n(x) - S(x)| < \\varepsilon$$

## 3. Veyershtrass alomati

Agar $|u_n(x)| \\leq M_n$ barcha $x \\in [a,b]$ uchun va $\\sum M_n$ yaqinlashsa, funksional qator tekis yaqinlashadi.

## 4. Darajali qatorlar

$$\\sum_{n=0}^{\\infty} a_n(x-x_0)^n = a_0 + a_1(x-x_0) + a_2(x-x_0)^2 + ...$$

## 5. Yaqinlashish radiusi

$$R = \\lim_{n \\to \\infty} \\left| \\frac{a_n}{a_{n+1}} \\right| = \\frac{1}{\\lim \\sqrt[n]{|a_n|}}$$

**Yaqinlashish oralig'i:** $(x_0 - R, x_0 + R)$

- $R = 0$: faqat $x = x_0$ da yaqinlashadi
- $R = \\infty$: hamma joyda yaqinlashadi

## 6. Darajali qator xossalari

1. **Uzluksizlik:** Yaqinlashish oralig'ida yig'indi funksiya uzluksiz
2. **Integrallash:** Hadma-had integrallanadi
3. **Differensiallash:** Hadma-had differensiallanadi

## 7. Asosiy darajali qatorlar

$$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + ...$$

$$\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - ...$$

$$\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - ...$$

$$\\ln(1+x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - ... \\quad (|x| \\leq 1)$$

$$\\frac{1}{1-x} = \\sum_{n=0}^{\\infty} x^n = 1 + x + x^2 + ... \\quad (|x| < 1)$$

## 8. Misol

$\\sum_{n=1}^{\\infty} \\frac{x^n}{n}$ qatorning yaqinlashish radiusini toping.

$$R = \\lim \\frac{1/n}{1/(n+1)} = \\lim \\frac{n+1}{n} = 1$$

Yaqinlashish oralig'i: $(-1, 1)$
` 
  },
  { 
    id: "M16", 
    title: "Teylor va Fure qatorlari", 
    description: "Funksiyalarni Teylor va Makloren qatorlariga yoyish.", 
    content: `# Teylor va Fure Qatorlari

## 1. Teylor formulasi

$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n$$

## 2. Makloren qatori ($x_0 = 0$)

$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!}x^n = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + ...$$

## 3. Asosiy Makloren qatorlari

$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + ... \\quad (R = \\infty)$$

$$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - ... \\quad (R = \\infty)$$

$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - ... \\quad (R = \\infty)$$

$$\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - ... \\quad (R = 1)$$

$$(1+x)^\\alpha = 1 + \\alpha x + \\frac{\\alpha(\\alpha-1)}{2!}x^2 + ... \\quad (R = 1)$$

$$\\arctan x = x - \\frac{x^3}{3} + \\frac{x^5}{5} - ... \\quad (R = 1)$$

## 4. Fure qatori

$f(x)$ funksiya $[-\\pi, \\pi]$ oraliqda:

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} (a_n \\cos nx + b_n \\sin nx)$$

**Fure koeffitsientlari:**

$$a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) dx$$

$$a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) dx$$

$$b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) dx$$

## 5. Toq va juft funksiyalar uchun

**Juft funksiya** ($f(-x) = f(x)$): $b_n = 0$

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} a_n \\cos nx$$

**Toq funksiya** ($f(-x) = -f(x)$): $a_n = 0$

$$f(x) = \\sum_{n=1}^{\\infty} b_n \\sin nx$$

## 6. Parseval tengligsi

$$\\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} [f(x)]^2 dx = \\frac{a_0^2}{2} + \\sum_{n=1}^{\\infty} (a_n^2 + b_n^2)$$

## 7. Misol

$f(x) = x$ funksiyani $[-\\pi, \\pi]$ da Fure qatoriga yoying.

$f(x)$ toq funksiya, shuning uchun $a_n = 0$.

$$b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} x \\sin(nx) dx = \\frac{2(-1)^{n+1}}{n}$$

$$x = 2\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} \\sin nx = 2\\left(\\sin x - \\frac{\\sin 2x}{2} + \\frac{\\sin 3x}{3} - ...\\right)$$
` 
  },
  { 
    id: "M17", 
    title: "Ikki o'lchovli integral", 
    description: "Ikki o'lchovli integral, xossalari.", 
    content: `# Ikki O'lchovli Integral

## 1. Ta'rif

$$\\iint_D f(x, y) dA = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i, y_i) \\Delta A_i$$

## 2. Xossalari

$$\\iint_D [f + g] dA = \\iint_D f \\, dA + \\iint_D g \\, dA$$

$$\\iint_D cf \\, dA = c \\iint_D f \\, dA$$

$$\\iint_{D_1 \\cup D_2} f \\, dA = \\iint_{D_1} f \\, dA + \\iint_{D_2} f \\, dA$$

## 3. Hisoblash (Dekart koordinatalarida)

**I tur sohasi** ($a \\leq x \\leq b$, $\\varphi_1(x) \\leq y \\leq \\varphi_2(x)$):

$$\\iint_D f(x,y) dA = \\int_a^b \\left[ \\int_{\\varphi_1(x)}^{\\varphi_2(x)} f(x,y) dy \\right] dx$$

**II tur sohasi** ($c \\leq y \\leq d$, $\\psi_1(y) \\leq x \\leq \\psi_2(y)$):

$$\\iint_D f(x,y) dA = \\int_c^d \\left[ \\int_{\\psi_1(y)}^{\\psi_2(y)} f(x,y) dx \\right] dy$$

## 4. Qutb koordinatalarida

$x = r\\cos\\theta$, $y = r\\sin\\theta$, $dA = r \\, dr \\, d\\theta$

$$\\iint_D f(x,y) dA = \\iint_D f(r\\cos\\theta, r\\sin\\theta) \\cdot r \\, dr \\, d\\theta$$

## 5. O'zgaruvchilarni almashtirish

$x = x(u,v)$, $y = y(u,v)$ bo'lsa:

$$\\iint_D f(x,y) dx \\, dy = \\iint_{D'} f(x(u,v), y(u,v)) |J| \\, du \\, dv$$

**Yakobian:**

$$J = \\frac{\\partial(x,y)}{\\partial(u,v)} = \\begin{vmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{vmatrix}$$

## 6. Geometrik tadbiqlari

**Yuza:** $S = \\iint_D dA$

**Hajm:** $V = \\iint_D f(x,y) dA$ (agar $f \\geq 0$)

**Sirt yuzasi:** $S = \\iint_D \\sqrt{1 + f_x^2 + f_y^2} \\, dA$

## 7. Misol

$\\iint_D xy \\, dA$, $D$: $0 \\leq x \\leq 1$, $0 \\leq y \\leq x$

$$= \\int_0^1 \\int_0^x xy \\, dy \\, dx = \\int_0^1 x \\cdot \\frac{y^2}{2} \\Big|_0^x dx$$

$$= \\int_0^1 \\frac{x^3}{2} dx = \\frac{x^4}{8} \\Big|_0^1 = \\frac{1}{8}$$
` 
  },
  { 
    id: "M18", 
    title: "Uch o'lchovli integral", 
    description: "Uch o'lchovli integral va tadbiqlari.", 
    content: `# Uch O'lchovli Integral

## 1. Ta'rif

$$\\iiint_V f(x, y, z) dV = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i, y_i, z_i) \\Delta V_i$$

## 2. Hisoblash (Dekart koordinatalarida)

$$\\iiint_V f \\, dV = \\int_a^b \\int_{\\varphi_1(x)}^{\\varphi_2(x)} \\int_{\\psi_1(x,y)}^{\\psi_2(x,y)} f(x,y,z) \\, dz \\, dy \\, dx$$

## 3. Silindirik koordinatalarda

$x = r\\cos\\theta$, $y = r\\sin\\theta$, $z = z$

$$dV = r \\, dr \\, d\\theta \\, dz$$

$$\\iiint_V f \\, dV = \\iiint f(r\\cos\\theta, r\\sin\\theta, z) \\cdot r \\, dr \\, d\\theta \\, dz$$

## 4. Sferik koordinatalarda

$x = \\rho\\sin\\phi\\cos\\theta$, $y = \\rho\\sin\\phi\\sin\\theta$, $z = \\rho\\cos\\phi$

$$dV = \\rho^2 \\sin\\phi \\, d\\rho \\, d\\phi \\, d\\theta$$

**Chegaralar:**
- $\\rho \\geq 0$ — radiusvektor
- $0 \\leq \\phi \\leq \\pi$ — polar burchak
- $0 \\leq \\theta < 2\\pi$ — azimut burchak

## 5. Geometrik va fizik tadbiqlari

**Hajm:**
$$V = \\iiint_V dV$$

**Massa** (zichlik $\\rho(x,y,z)$ bo'lsa):
$$m = \\iiint_V \\rho(x,y,z) dV$$

**Massa markazi:**
$$\\bar{x} = \\frac{1}{m}\\iiint_V x\\rho \\, dV, \\quad \\bar{y} = \\frac{1}{m}\\iiint_V y\\rho \\, dV, \\quad \\bar{z} = \\frac{1}{m}\\iiint_V z\\rho \\, dV$$

**Inersiya momenti** ($Oz$ o'qi atrofida):
$$I_z = \\iiint_V (x^2 + y^2)\\rho \\, dV$$

## 6. Sharning hajmi (sferik koordinatalar)

$$V = \\int_0^{2\\pi} \\int_0^{\\pi} \\int_0^R \\rho^2 \\sin\\phi \\, d\\rho \\, d\\phi \\, d\\theta$$

$$= \\int_0^{2\\pi} d\\theta \\cdot \\int_0^{\\pi} \\sin\\phi \\, d\\phi \\cdot \\int_0^R \\rho^2 d\\rho$$

$$= 2\\pi \\cdot 2 \\cdot \\frac{R^3}{3} = \\frac{4\\pi R^3}{3}$$

## 7. Misol

$\\iiint_V z \\, dV$, $V$: $x^2 + y^2 \\leq 1$, $0 \\leq z \\leq 2$

Silindirik koordinatalarda:

$$= \\int_0^{2\\pi} \\int_0^1 \\int_0^2 z \\cdot r \\, dz \\, dr \\, d\\theta$$

$$= \\int_0^{2\\pi} d\\theta \\cdot \\int_0^1 r \\, dr \\cdot \\int_0^2 z \\, dz$$

$$= 2\\pi \\cdot \\frac{1}{2} \\cdot 2 = 2\\pi$$
` 
  }
];

export const getTopicById = (id: string): MathTopic | undefined => {
  return mathTopics.find(topic => topic.id === id);
};
