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

**Mexanik ma'nosi:** 
- Agar $s(t)$ - jism bosib o'tgan yo'l bo'lsa
- $v(t) = s'(t)$ - tezlik
- $a(t) = s''(t) = v'(t)$ - tezlanish

**Geometrik ma'nosi:** Ikkinchi hosila egri chiziqning egriligini (qavariqlik/botiqlik) aniqlaydi.

## 2. Asosiy funksiyalarning hosilalari jadvali

| Funksiya $f(x)$ | $f'(x)$ | $f''(x)$ | $f'''(x)$ |
|-----------------|---------|----------|-----------|
| $x^n$ | $nx^{n-1}$ | $n(n-1)x^{n-2}$ | $n(n-1)(n-2)x^{n-3}$ |
| $e^x$ | $e^x$ | $e^x$ | $e^x$ |
| $a^x$ | $a^x \\ln a$ | $a^x (\\ln a)^2$ | $a^x (\\ln a)^3$ |
| $\\sin x$ | $\\cos x$ | $-\\sin x$ | $-\\cos x$ |
| $\\cos x$ | $-\\sin x$ | $-\\cos x$ | $\\sin x$ |
| $\\ln x$ | $\\frac{1}{x}$ | $-\\frac{1}{x^2}$ | $\\frac{2}{x^3}$ |
| $\\tan x$ | $\\frac{1}{\\cos^2 x}$ | $\\frac{2\\sin x}{\\cos^3 x}$ | — |
| $\\arcsin x$ | $\\frac{1}{\\sqrt{1-x^2}}$ | $\\frac{x}{(1-x^2)^{3/2}}$ | — |
| $\\arctan x$ | $\\frac{1}{1+x^2}$ | $\\frac{-2x}{(1+x^2)^2}$ | — |

## 3. n-tartibli hosila

$$y^{(n)} = f^{(n)}(x) = \\frac{d^n y}{dx^n}$$

### Maxsus funksiyalarning n-hosilalari:

$$(x^m)^{(n)} = \\frac{m!}{(m-n)!}x^{m-n} \\quad (m \\geq n)$$

$$(e^{ax})^{(n)} = a^n e^{ax}$$

$$(\\sin x)^{(n)} = \\sin\\left(x + \\frac{\\pi n}{2}\\right)$$

$$(\\cos x)^{(n)} = \\cos\\left(x + \\frac{\\pi n}{2}\\right)$$

$$(\\ln x)^{(n)} = \\frac{(-1)^{n-1}(n-1)!}{x^n}$$

$$\\left(\\frac{1}{ax+b}\\right)^{(n)} = \\frac{(-1)^n n! \\cdot a^n}{(ax+b)^{n+1}}$$

## 4. Leybnits formulasi

Ko'paytmaning n-hosilasi:

$$(uv)^{(n)} = \\sum_{k=0}^{n} C_n^k \\cdot u^{(n-k)} \\cdot v^{(k)}$$

bu yerda $C_n^k = \\frac{n!}{k!(n-k)!}$ — binomial koeffitsient.

**Yoyilgan ko'rinishi:**

$$(uv)^{(n)} = u^{(n)}v + nu^{(n-1)}v' + \\frac{n(n-1)}{2!}u^{(n-2)}v'' + ... + uv^{(n)}$$

## 5. Differensiallar

**Birinchi tartibli differensial:**
$$dy = f'(x)dx$$

**Ikkinchi tartibli differensial:**
$$d^2y = f''(x)dx^2$$

**n-tartibli differensial:**
$$d^ny = f^{(n)}(x)dx^n$$

**Xossa:** $dy = f'(x)dx$ dan $f'(x) = \\frac{dy}{dx}$

## 6. Parametrik funksiyaning hosilalari

Agar $x = x(t)$, $y = y(t)$ bo'lsa:

$$y'_x = \\frac{y'_t}{x'_t} = \\frac{dy/dt}{dx/dt}$$

$$y''_{xx} = \\frac{(y'_x)'_t}{x'_t} = \\frac{y''_t x'_t - y'_t x''_t}{(x'_t)^3}$$

## 7. Yashirin funksiyaning hosilalari

$F(x,y) = 0$ tenglama berilgan bo'lsa:

$$y' = -\\frac{F'_x}{F'_y}$$

$$y'' = -\\frac{F''_{xx}(F'_y)^2 - 2F''_{xy}F'_xF'_y + F''_{yy}(F'_x)^2}{(F'_y)^3}$$

## 8. Misollar

**Misol 1:** $y = x^5$ funksiyaning hosilalari:
- $y' = 5x^4$
- $y'' = 20x^3$  
- $y''' = 60x^2$
- $y^{(4)} = 120x$
- $y^{(5)} = 120$
- $y^{(6)} = 0$

**Misol 2:** $(x^2 e^x)^{(3)}$ ni toping (Leybnits formulasi):

$u = x^2$, $v = e^x$

$u' = 2x$, $u'' = 2$, $u''' = 0$

$v' = v'' = v''' = e^x$

$$(x^2 e^x)^{(3)} = x^2 e^x + 3 \\cdot 2x \\cdot e^x + 3 \\cdot 2 \\cdot e^x = e^x(x^2 + 6x + 6)$$

**Misol 3:** $y = \\sin 2x$ ning 50-hosilasini toping:

$$y^{(50)} = 2^{50} \\sin\\left(2x + \\frac{50\\pi}{2}\\right) = 2^{50} \\sin(2x + 25\\pi) = -2^{50}\\sin 2x$$
` 
  },
  { 
    id: "M2", 
    title: "Funksiyaning monotonligi va ekstremumi", 
    description: "Kritik va ekstremum nuqtalari, grafigi botiqligi va qavariqligi.", 
    content: `# Funksiyaning Monotonligi va Ekstremumi

## 1. Monotonlik shartlari

### Zaruriy shart:
Agar funksiya $(a,b)$ oraliqda o'suvchi bo'lsa, u holda $f'(x) \\geq 0$

### Yetarli shartlar:

| Shart | Natija |
|-------|--------|
| $f'(x) > 0$ barcha $x \\in (a,b)$ uchun | Funksiya **qat'iy o'sadi** ↗ |
| $f'(x) < 0$ barcha $x \\in (a,b)$ uchun | Funksiya **qat'iy kamayadi** ↘ |
| $f'(x) \\geq 0$ barcha $x \\in (a,b)$ uchun | Funksiya **o'sadi** |
| $f'(x) \\leq 0$ barcha $x \\in (a,b)$ uchun | Funksiya **kamayadi** |

## 2. Kritik nuqtalar

**Kritik nuqta** — $f'(x_0) = 0$ yoki $f'(x_0)$ mavjud bo'lmagan nuqta.

**Statsionar nuqta** — $f'(x_0) = 0$ bo'lgan nuqta.

### Kritik nuqtalarni topish algoritmi:
1. $f'(x)$ ni toping
2. $f'(x) = 0$ tenglamani yeching
3. $f'(x)$ mavjud bo'lmagan nuqtalarni toping

## 3. Lokal ekstremum

### Birinchi yetarli shart:

$x_0$ — kritik nuqta bo'lsin.

| $f'(x)$ ishorasi o'zgarishi | Natija |
|----------------------------|--------|
| $+$ dan $-$ ga | **Lokal maksimum** |
| $-$ dan $+$ ga | **Lokal minimum** |
| Ishora o'zgarmasa | Ekstremum yo'q |

### Ikkinchi yetarli shart:

Agar $f'(x_0) = 0$ va $f''(x_0) \\neq 0$:

| Shart | Natija |
|-------|--------|
| $f''(x_0) < 0$ | **Lokal maksimum** |
| $f''(x_0) > 0$ | **Lokal minimum** |
| $f''(x_0) = 0$ | Qo'shimcha tekshiruv kerak |

### Uchinchi yetarli shart:

Agar $f'(x_0) = f''(x_0) = ... = f^{(n-1)}(x_0) = 0$, lekin $f^{(n)}(x_0) \\neq 0$:

- $n$ juft va $f^{(n)}(x_0) < 0$ → **maksimum**
- $n$ juft va $f^{(n)}(x_0) > 0$ → **minimum**
- $n$ toq → ekstremum yo'q

## 4. Global ekstremum (eng katta/kichik qiymat)

$[a, b]$ yopiq oraliqda uzluksiz funksiyaning eng katta va eng kichik qiymatlarini topish:

1. Barcha kritik nuqtalarni toping: $x_1, x_2, ..., x_k$
2. Funksiya qiymatlarini hisoblang: $f(a), f(x_1), ..., f(x_k), f(b)$
3. Eng katta va eng kichik qiymatlarni tanlang

$$f_{max} = \\max\\{f(a), f(x_1), ..., f(x_k), f(b)\\}$$
$$f_{min} = \\min\\{f(a), f(x_1), ..., f(x_k), f(b)\\}$$

## 5. Qavariqlik va botiqlik

### Ta'riflar:

**Botiq (pastga qarab):** Urinma grafik ostida yotadi
$$f''(x) > 0$$

**Qavariq (yuqoriga qarab):** Urinma grafik ustida yotadi  
$$f''(x) < 0$$

### Egilish nuqtasi

**Egilish nuqtasi** — qavariqlik turi o'zgaradigan nuqta.

**Zaruriy shart:** $f''(x_0) = 0$ yoki mavjud emas

**Yetarli shart:** $f''(x)$ ishora almashtiriladi $x_0$ nuqtada

## 6. Asimptotalar

### Vertikal asimptota:
$$\\lim_{x \\to a^{\\pm}} f(x) = \\pm\\infty$$

### Gorizontal asimptota:
$$\\lim_{x \\to \\pm\\infty} f(x) = b \\quad \\Rightarrow \\quad y = b$$

### Qiya asimptota:
$$y = kx + b$$

$$k = \\lim_{x \\to \\infty} \\frac{f(x)}{x}, \\quad b = \\lim_{x \\to \\infty} [f(x) - kx]$$

## 7. Funksiya grafigini to'liq tekshirish

### Algoritm:

1. **Aniqlanish sohasi** $D(f)$
2. **Juftlik/toqlik:** $f(-x) = f(x)$ yoki $f(-x) = -f(x)$
3. **Davriylik:** $f(x+T) = f(x)$
4. **Nol nuqtalari:** $f(x) = 0$
5. **Kritik nuqtalar:** $f'(x) = 0$
6. **Monotonlik va ekstremumlar**
7. **Egilish nuqtalari:** $f''(x) = 0$
8. **Qavariqlik/botiqlik**
9. **Asimptotalar**
10. **Qo'shimcha nuqtalar va grafik**

## 8. Misollar

**Misol 1:** $f(x) = x^3 - 3x + 2$ ni tekshiring.

$f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$

Kritik nuqtalar: $x = -1, x = 1$

$f''(x) = 6x$

| $x$ | $-1$ | $1$ |
|-----|------|-----|
| $f''(x)$ | $-6 < 0$ | $6 > 0$ |
| Natija | Maksimum | Minimum |
| $f(x)$ | $4$ | $0$ |

Egilish nuqtasi: $x = 0$, $f(0) = 2$

**Misol 2:** $f(x) = \\frac{x^2}{x-1}$ asimptotalari:

Vertikal: $x = 1$

Qiya: $k = \\lim_{x \\to \\infty} \\frac{x^2}{x(x-1)} = 1$

$b = \\lim_{x \\to \\infty} \\left(\\frac{x^2}{x-1} - x\\right) = \\lim_{x \\to \\infty} \\frac{x}{x-1} = 1$

Qiya asimptota: $y = x + 1$
` 
  },
  { 
    id: "M3", 
    title: "Aniqmas integral", 
    description: "Boshlang'ich funksiya va aniqmas integralning ta'rifi, xossalari.", 
    content: `# Aniqmas Integral

## 1. Asosiy tushunchalar

### Boshlang'ich funksiya

$F(x)$ funksiya $(a,b)$ oraliqda $f(x)$ ning **boshlang'ich funksiyasi** deyiladi, agar:

$$F'(x) = f(x), \\quad \\forall x \\in (a,b)$$

**Teorema:** Agar $F(x)$ boshlang'ich funksiya bo'lsa, $F(x) + C$ ham boshlang'ich funksiya ($C$ — ixtiyoriy konstanta).

### Aniqmas integral

$$\\int f(x)dx = F(x) + C$$

bu yerda $C$ — integrallash konstantasi.

## 2. Asosiy xossalari

$$\\left(\\int f(x)dx\\right)' = f(x)$$

$$d\\left(\\int f(x)dx\\right) = f(x)dx$$

$$\\int dF(x) = F(x) + C$$

$$\\int f'(x)dx = f(x) + C$$

### Chiziqlilik:

$$\\int [f(x) \\pm g(x)]dx = \\int f(x)dx \\pm \\int g(x)dx$$

$$\\int k \\cdot f(x)dx = k \\cdot \\int f(x)dx, \\quad k = const$$

## 3. Asosiy integrallash formulalari

### Elementar funksiyalar:

$$\\int 0 \\, dx = C$$

$$\\int 1 \\, dx = x + C$$

$$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$$

$$\\int \\frac{1}{x} dx = \\ln|x| + C$$

$$\\int e^x dx = e^x + C$$

$$\\int a^x dx = \\frac{a^x}{\\ln a} + C \\quad (a > 0, a \\neq 1)$$

### Trigonometrik funksiyalar:

$$\\int \\sin x \\, dx = -\\cos x + C$$

$$\\int \\cos x \\, dx = \\sin x + C$$

$$\\int \\tan x \\, dx = -\\ln|\\cos x| + C$$

$$\\int \\cot x \\, dx = \\ln|\\sin x| + C$$

$$\\int \\frac{1}{\\cos^2 x} dx = \\tan x + C$$

$$\\int \\frac{1}{\\sin^2 x} dx = -\\cot x + C$$

$$\\int \\frac{1}{\\sin x} dx = \\ln\\left|\\tan\\frac{x}{2}\\right| + C$$

$$\\int \\frac{1}{\\cos x} dx = \\ln\\left|\\tan\\left(\\frac{x}{2}+\\frac{\\pi}{4}\\right)\\right| + C$$

### Teskari trigonometrik funksiyalar:

$$\\int \\frac{1}{\\sqrt{1-x^2}} dx = \\arcsin x + C = -\\arccos x + C$$

$$\\int \\frac{1}{1+x^2} dx = \\arctan x + C = -\\text{arccot } x + C$$

$$\\int \\frac{1}{\\sqrt{x^2 \\pm a^2}} dx = \\ln|x + \\sqrt{x^2 \\pm a^2}| + C$$

$$\\int \\frac{1}{a^2 + x^2} dx = \\frac{1}{a}\\arctan\\frac{x}{a} + C$$

$$\\int \\frac{1}{a^2 - x^2} dx = \\frac{1}{2a}\\ln\\left|\\frac{a+x}{a-x}\\right| + C$$

$$\\int \\frac{1}{\\sqrt{a^2 - x^2}} dx = \\arcsin\\frac{x}{a} + C$$

### Giperbolik funksiyalar:

$$\\int \\sinh x \\, dx = \\cosh x + C$$

$$\\int \\cosh x \\, dx = \\sinh x + C$$

## 4. O'rniga qo'yish usuli

Agar $x = \\varphi(t)$, $dx = \\varphi'(t)dt$, unda:

$$\\int f(x)dx = \\int f(\\varphi(t)) \\cdot \\varphi'(t)dt$$

### Teskari o'rniga qo'yish:

$$\\int f(\\varphi(x)) \\cdot \\varphi'(x)dx = \\int f(t)dt \\Big|_{t=\\varphi(x)}$$

### Ko'p ishlatiladigan o'rniga qo'yishlar:

| Integral turi | O'rniga qo'yish |
|---------------|-----------------|
| $\\int f(ax+b)dx$ | $t = ax + b$ |
| $\\int f(\\sqrt{x})dx$ | $t = \\sqrt{x}$ |
| $\\int f(e^x)e^x dx$ | $t = e^x$ |
| $\\int f(\\ln x)\\frac{dx}{x}$ | $t = \\ln x$ |
| $\\int f(\\sin x)\\cos x \\, dx$ | $t = \\sin x$ |
| $\\int f(\\cos x)\\sin x \\, dx$ | $t = \\cos x$ |
| $\\int f(\\tan x)\\frac{dx}{\\cos^2 x}$ | $t = \\tan x$ |

## 5. Bo'laklab integrallash

$$\\int u \\, dv = uv - \\int v \\, du$$

### $u$ va $dv$ ni tanlash qoidasi (LIPET):

1. **L** — Logarifm ($\\ln x$, $\\log x$)
2. **I** — Teskari trigonometrik ($\\arcsin$, $\\arctan$, ...)
3. **P** — Polinom ($x^n$)
4. **E** — Eksponenta ($e^x$, $a^x$)
5. **T** — Trigonometrik ($\\sin$, $\\cos$, ...)

$u$ — ro'yxatda oldinroq turgan, $dv$ — qolgani.

### Takroriy bo'laklab integrallash:

Ba'zi integrallar uchun bo'laklab integrallash 2 marta qo'llaniladi:

$$\\int e^x \\sin x \\, dx = \\frac{e^x(\\sin x - \\cos x)}{2} + C$$

$$\\int e^x \\cos x \\, dx = \\frac{e^x(\\sin x + \\cos x)}{2} + C$$

## 6. Ratsional kasrlarni integrallash

### Oddiy kasrlarga ajratish:

$$\\frac{P(x)}{Q(x)} = \\frac{A_1}{x-a_1} + ... + \\frac{B}{(x-b)^k} + \\frac{Mx+N}{x^2+px+q} + ...$$

### Asosiy integrallar:

$$\\int \\frac{dx}{x-a} = \\ln|x-a| + C$$

$$\\int \\frac{dx}{(x-a)^n} = \\frac{-1}{(n-1)(x-a)^{n-1}} + C \\quad (n \\neq 1)$$

$$\\int \\frac{dx}{x^2+a^2} = \\frac{1}{a}\\arctan\\frac{x}{a} + C$$

$$\\int \\frac{x \\, dx}{x^2+a^2} = \\frac{1}{2}\\ln(x^2+a^2) + C$$

## 7. Misollar

**Misol 1:** $\\int x e^x dx$ (bo'laklab)

$u = x$, $dv = e^x dx$ → $du = dx$, $v = e^x$

$$= xe^x - \\int e^x dx = xe^x - e^x + C = e^x(x-1) + C$$

**Misol 2:** $\\int \\ln x \\, dx$

$u = \\ln x$, $dv = dx$ → $du = \\frac{dx}{x}$, $v = x$

$$= x\\ln x - \\int x \\cdot \\frac{dx}{x} = x\\ln x - x + C = x(\\ln x - 1) + C$$

**Misol 3:** $\\int \\frac{2x+3}{x^2+3x+2} dx$

$x^2+3x+2 = (x+1)(x+2)$

$\\frac{2x+3}{(x+1)(x+2)} = \\frac{A}{x+1} + \\frac{B}{x+2}$

$A = 1$, $B = 1$

$$= \\int \\frac{dx}{x+1} + \\int \\frac{dx}{x+2} = \\ln|x+1| + \\ln|x+2| + C$$
` 
  },
  { 
    id: "M4", 
    title: "Trigonometrik va irratsional integrallar", 
    description: "Trigonometrik funksiyalar qatnashgan funksiyalarni integrallash.", 
    content: `# Trigonometrik va Irratsional Integrallar

## 1. Asosiy trigonometrik formulalar

### Asosiy ayniyatlar:

$$\\sin^2 x + \\cos^2 x = 1$$

$$1 + \\tan^2 x = \\frac{1}{\\cos^2 x} = \\sec^2 x$$

$$1 + \\cot^2 x = \\frac{1}{\\sin^2 x} = \\csc^2 x$$

### Ikkilangan burchak formulalari:

$$\\sin 2x = 2\\sin x \\cos x$$

$$\\cos 2x = \\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x$$

### Darajani pasaytirish:

$$\\sin^2 x = \\frac{1 - \\cos 2x}{2}$$

$$\\cos^2 x = \\frac{1 + \\cos 2x}{2}$$

$$\\sin x \\cos x = \\frac{\\sin 2x}{2}$$

### Ko'paytmani yig'indiga aylantirish:

$$\\sin\\alpha\\cos\\beta = \\frac{1}{2}[\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)]$$

$$\\cos\\alpha\\cos\\beta = \\frac{1}{2}[\\cos(\\alpha-\\beta) + \\cos(\\alpha+\\beta)]$$

$$\\sin\\alpha\\sin\\beta = \\frac{1}{2}[\\cos(\\alpha-\\beta) - \\cos(\\alpha+\\beta)]$$

## 2. $\\int \\sin^m x \\cos^n x \\, dx$ integrallar

### 1-holat: $m$ yoki $n$ toq

Toq darajali funksiyadan bir daraja ajratib, o'rniga qo'yish qo'llaniladi.

**Misol:** $\\int \\sin^3 x \\cos^2 x \\, dx$

$$= \\int \\sin^2 x \\cos^2 x \\cdot \\sin x \\, dx = \\int (1-\\cos^2 x)\\cos^2 x \\sin x \\, dx$$

$t = \\cos x$, $dt = -\\sin x \\, dx$

$$= -\\int (1-t^2)t^2 dt = -\\int (t^2 - t^4)dt = -\\frac{t^3}{3} + \\frac{t^5}{5} + C$$

$$= -\\frac{\\cos^3 x}{3} + \\frac{\\cos^5 x}{5} + C$$

### 2-holat: $m$ va $n$ juft

Darajani pasaytirish formulalari qo'llaniladi.

**Misol:** $\\int \\sin^2 x \\cos^2 x \\, dx$

$$= \\int \\frac{1-\\cos 2x}{2} \\cdot \\frac{1+\\cos 2x}{2} dx = \\frac{1}{4}\\int (1-\\cos^2 2x)dx$$

$$= \\frac{1}{4}\\int \\sin^2 2x \\, dx = \\frac{1}{4}\\int \\frac{1-\\cos 4x}{2}dx = \\frac{x}{8} - \\frac{\\sin 4x}{32} + C$$

## 3. $\\int \\tan^m x \\sec^n x \\, dx$ va $\\int \\cot^m x \\csc^n x \\, dx$

### Asosiy usullar:

| Shart | Usul |
|-------|------|
| $n$ juft | $t = \\tan x$ (yoki $\\cot x$) |
| $m$ toq | $t = \\sec x$ (yoki $\\csc x$) |

**Misol:** $\\int \\tan^3 x \\sec x \\, dx$

$$= \\int \\tan^2 x \\cdot \\sec x \\tan x \\, dx = \\int (\\sec^2 x - 1)\\sec x \\tan x \\, dx$$

$t = \\sec x$, $dt = \\sec x \\tan x \\, dx$

$$= \\int (t^2 - 1)dt = \\frac{t^3}{3} - t + C = \\frac{\\sec^3 x}{3} - \\sec x + C$$

## 4. Universal trigonometrik o'rniga qo'yish

$$t = \\tan \\frac{x}{2}$$

$$\\sin x = \\frac{2t}{1+t^2}, \\quad \\cos x = \\frac{1-t^2}{1+t^2}, \\quad dx = \\frac{2dt}{1+t^2}$$

$$\\tan x = \\frac{2t}{1-t^2}, \\quad x = 2\\arctan t$$

**Misol:** $\\int \\frac{dx}{3 + 5\\cos x}$

$$= \\int \\frac{1}{3 + 5 \\cdot \\frac{1-t^2}{1+t^2}} \\cdot \\frac{2dt}{1+t^2} = \\int \\frac{2dt}{3(1+t^2) + 5(1-t^2)}$$

$$= \\int \\frac{2dt}{8 - 2t^2} = \\int \\frac{dt}{4-t^2} = \\frac{1}{4}\\ln\\left|\\frac{2+t}{2-t}\\right| + C$$

$$= \\frac{1}{4}\\ln\\left|\\frac{2+\\tan(x/2)}{2-\\tan(x/2)}\\right| + C$$

## 5. Irratsional integrallar

### 5.1 Chiziqli irratsionallik

$\\int R\\left(x, \\sqrt[n]{\\frac{ax+b}{cx+d}}\\right) dx$

**O'rniga qo'yish:** $t = \\sqrt[n]{\\frac{ax+b}{cx+d}}$

**Misol:** $\\int \\frac{dx}{x + \\sqrt{x+1}}$

$t = \\sqrt{x+1}$, $x = t^2 - 1$, $dx = 2t \\, dt$

$$= \\int \\frac{2t \\, dt}{t^2 - 1 + t} = \\int \\frac{2t \\, dt}{t^2 + t - 1}$$

### 5.2 Trigonometrik o'rniga qo'yishlar

| Integral turi | O'rniga qo'yish |
|---------------|-----------------|
| $\\int R(x, \\sqrt{a^2-x^2}) dx$ | $x = a\\sin t$ yoki $x = a\\cos t$ |
| $\\int R(x, \\sqrt{x^2+a^2}) dx$ | $x = a\\tan t$ yoki $x = a\\sinh t$ |
| $\\int R(x, \\sqrt{x^2-a^2}) dx$ | $x = \\frac{a}{\\cos t}$ yoki $x = a\\cosh t$ |

**Misol:** $\\int \\sqrt{a^2 - x^2} \\, dx$

$x = a\\sin t$, $dx = a\\cos t \\, dt$

$\\sqrt{a^2 - x^2} = a\\cos t$

$$= \\int a\\cos t \\cdot a\\cos t \\, dt = a^2 \\int \\cos^2 t \\, dt = a^2 \\int \\frac{1+\\cos 2t}{2}dt$$

$$= \\frac{a^2}{2}\\left(t + \\frac{\\sin 2t}{2}\\right) + C = \\frac{a^2}{2}(t + \\sin t \\cos t) + C$$

$$= \\frac{a^2}{2}\\arcsin\\frac{x}{a} + \\frac{x\\sqrt{a^2-x^2}}{2} + C$$

## 6. Eyler almashtirishlari

$\\int R(x, \\sqrt{ax^2+bx+c}) dx$ uchun:

### 1-almashtirish ($a > 0$):
$$\\sqrt{ax^2+bx+c} = t \\pm x\\sqrt{a}$$

### 2-almashtirish ($c > 0$):
$$\\sqrt{ax^2+bx+c} = tx \\pm \\sqrt{c}$$

### 3-almashtirish (haqiqiy ildizlar mavjud):
Agar $ax^2+bx+c = a(x-x_1)(x-x_2)$:
$$\\sqrt{ax^2+bx+c} = t(x-x_1)$$

## 7. Binomial integrallar

$$\\int x^m(a+bx^n)^p dx$$

Bu integral elementar funksiyalar orqali ifodalanadi, agar:
1. $p$ — butun son
2. $\\frac{m+1}{n}$ — butun son
3. $\\frac{m+1}{n} + p$ — butun son

## 8. Misollar

**Misol 1:** $\\int \\frac{dx}{\\sin x + \\cos x}$

$t = \\tan(x/2)$:

$$= \\int \\frac{2dt/(1+t^2)}{\\frac{2t}{1+t^2} + \\frac{1-t^2}{1+t^2}} = \\int \\frac{2dt}{2t + 1 - t^2} = \\int \\frac{2dt}{-(t^2-2t-1)}$$

$$= \\int \\frac{2dt}{-(t-1)^2+2} = \\sqrt{2}\\arctan\\frac{t-1}{\\sqrt{2}} + C$$

**Misol 2:** $\\int \\frac{x^2}{\\sqrt{x^2+4}} dx$

$x = 2\\tan t$:

$$= \\int \\frac{4\\tan^2 t}{2\\sec t} \\cdot 2\\sec^2 t \\, dt = 4\\int \\tan^2 t \\sec t \\, dt$$

$$= 4\\int (\\sec^2 t - 1)\\sec t \\, dt = 4\\int (\\sec^3 t - \\sec t)dt$$
` 
  },
  { 
    id: "M5", 
    title: "Aniq integral", 
    description: "Aniq integralga keltiriluvchi masalalar, Nyuton-Leybnits formulasi.", 
    content: `# Aniq Integral

## 1. Ta'rif (Riman integrali)

$[a, b]$ kesmada aniqlangan $f(x)$ funksiya uchun:

1. Kesmani $n$ ta qismga bo'lamiz: $a = x_0 < x_1 < ... < x_n = b$
2. Har bir $[x_{i-1}, x_i]$ dan $\\xi_i$ nuqta tanlaymiz
3. Integral yig'indisi: $\\sigma_n = \\sum_{i=1}^{n} f(\\xi_i) \\Delta x_i$, bu yerda $\\Delta x_i = x_i - x_{i-1}$

$$\\int_a^b f(x)dx = \\lim_{\\max\\Delta x_i \\to 0} \\sum_{i=1}^{n} f(\\xi_i) \\Delta x_i$$

## 2. Nyuton-Leybnits formulasi

$$\\int_a^b f(x)dx = F(b) - F(a) = F(x) \\Big|_a^b$$

bu yerda $F(x)$ — $f(x)$ ning boshlang'ich funksiyasi.

## 3. Asosiy xossalari

### Chiziqlilik:
$$\\int_a^b [\\alpha f(x) + \\beta g(x)]dx = \\alpha\\int_a^b f(x)dx + \\beta\\int_a^b g(x)dx$$

### Chegaralarni almashtirish:
$$\\int_a^a f(x)dx = 0$$

$$\\int_a^b f(x)dx = -\\int_b^a f(x)dx$$

### Qo'shimchalik:
$$\\int_a^b f(x)dx = \\int_a^c f(x)dx + \\int_c^b f(x)dx$$

### Baholash:
Agar $m \\leq f(x) \\leq M$ bo'lsa:
$$m(b-a) \\leq \\int_a^b f(x)dx \\leq M(b-a)$$

### Modulli baholash:
$$\\left|\\int_a^b f(x)dx\\right| \\leq \\int_a^b |f(x)|dx$$

## 4. O'rtacha qiymat teoremalari

### Birinchi o'rtacha qiymat teoremasi:
$$\\int_a^b f(x)dx = f(c)(b-a)$$
bu yerda $c \\in [a, b]$

### Ikkinchi o'rtacha qiymat teoremasi:
Agar $g(x)$ monoton bo'lsa:
$$\\int_a^b f(x)g(x)dx = g(a)\\int_a^c f(x)dx + g(b)\\int_c^b f(x)dx$$

### Integralning o'rtacha qiymati:
$$f_{avg} = \\frac{1}{b-a}\\int_a^b f(x)dx$$

## 5. Integrallash usullari

### O'rniga qo'yish:
$$\\int_a^b f(x)dx = \\int_{\\alpha}^{\\beta} f(\\varphi(t))\\varphi'(t)dt$$
bu yerda $x = \\varphi(t)$, $\\varphi(\\alpha) = a$, $\\varphi(\\beta) = b$

### Bo'laklab integrallash:
$$\\int_a^b u \\, dv = uv \\Big|_a^b - \\int_a^b v \\, du$$

## 6. Juft va toq funksiyalar uchun

### Simmetrik oraliqda:

Agar $f(x)$ **juft** ($f(-x) = f(x)$):
$$\\int_{-a}^{a} f(x)dx = 2\\int_0^a f(x)dx$$

Agar $f(x)$ **toq** ($f(-x) = -f(x)$):
$$\\int_{-a}^{a} f(x)dx = 0$$

### Davriy funksiya:
Agar $f(x+T) = f(x)$:
$$\\int_a^{a+T} f(x)dx = \\int_0^T f(x)dx$$

## 7. Geometrik tadbiqlari

### Egri chiziq ostidagi yuza:
$$S = \\int_a^b |f(x)| dx$$

### Ikki egri chiziq orasidagi yuza:
$$S = \\int_a^b |f(x) - g(x)| dx$$

### Parametrik egri uchun yuza:
$$S = \\int_{t_1}^{t_2} |y(t) \\cdot x'(t)| dt$$

### Qutb koordinatalarida yuza:
$$S = \\frac{1}{2}\\int_{\\alpha}^{\\beta} r^2(\\varphi) d\\varphi$$

### Aylanish jismi hajmi (Ox atrofida):
$$V_x = \\pi \\int_a^b [f(x)]^2 dx$$

### Aylanish jismi hajmi (Oy atrofida):
$$V_y = 2\\pi \\int_a^b x|f(x)| dx$$

### Yoy uzunligi:
$$L = \\int_a^b \\sqrt{1 + [f'(x)]^2} dx$$

### Parametrik egri yoyi uzunligi:
$$L = \\int_{t_1}^{t_2} \\sqrt{[x'(t)]^2 + [y'(t)]^2} dt$$

### Qutb koordinatalarida yoy:
$$L = \\int_{\\alpha}^{\\beta} \\sqrt{r^2 + (r')^2} d\\varphi$$

### Aylanish sirti yuzasi:
$$S = 2\\pi \\int_a^b |f(x)|\\sqrt{1+[f'(x)]^2} dx$$

## 8. Fizik tadbiqlari

### Ish:
$$A = \\int_a^b F(x) dx$$

### Og'irlik markazi:
$$\\bar{x} = \\frac{\\int_a^b x \\cdot \\rho(x) dx}{\\int_a^b \\rho(x) dx}$$

### Statik moment:
$$M_y = \\int_a^b x \\cdot f(x) dx$$

### Inersiya momenti:
$$I = \\int_a^b x^2 \\cdot \\rho(x) dx$$

## 9. Misollar

**Misol 1:** $\\int_0^2 x^2 dx$

$$= \\frac{x^3}{3} \\Big|_0^2 = \\frac{8}{3} - 0 = \\frac{8}{3}$$

**Misol 2:** $y = x^2$ va $y = x$ orasidagi yuza ($0 \\leq x \\leq 1$):

$$S = \\int_0^1 (x - x^2)dx = \\left(\\frac{x^2}{2} - \\frac{x^3}{3}\\right)\\Big|_0^1 = \\frac{1}{2} - \\frac{1}{3} = \\frac{1}{6}$$

**Misol 3:** $y = \\sqrt{x}$ egri chiziqning $[0, 4]$ dagi yoy uzunligi:

$y' = \\frac{1}{2\\sqrt{x}}$

$$L = \\int_0^4 \\sqrt{1 + \\frac{1}{4x}} dx$$

**Misol 4:** $y = x^2$ egri chiziqning $[0, 1]$ dagi Ox atrofida aylanishidan hosil bo'lgan jism hajmi:

$$V = \\pi\\int_0^1 x^4 dx = \\pi \\cdot \\frac{x^5}{5}\\Big|_0^1 = \\frac{\\pi}{5}$$
` 
  },
  { 
    id: "M6", 
    title: "Xosmas integrallar", 
    description: "Chegaralari cheksiz xosmas integrallar.", 
    content: `# Xosmas Integrallar

## 1. Birinchi tur (cheksiz chegarali)

### Ta'rif:

$$\\int_a^{+\\infty} f(x)dx = \\lim_{b \\to +\\infty} \\int_a^b f(x)dx$$

$$\\int_{-\\infty}^b f(x)dx = \\lim_{a \\to -\\infty} \\int_a^b f(x)dx$$

$$\\int_{-\\infty}^{+\\infty} f(x)dx = \\int_{-\\infty}^c f(x)dx + \\int_c^{+\\infty} f(x)dx$$

Agar limit mavjud va chekli bo'lsa — integral **yaqinlashadi** (konvergent).
Agar limit mavjud bo'lmasa yoki cheksiz bo'lsa — integral **yaqinlashmaydi** (divergent).

### Asosiy misollar:

$$\\int_1^{+\\infty} \\frac{1}{x^p} dx = \\begin{cases} \\frac{1}{p-1} & \\text{agar } p > 1 \\text{ (yaqinlashadi)} \\\\ +\\infty & \\text{agar } p \\leq 1 \\text{ (yaqinlashmaydi)} \\end{cases}$$

$$\\int_0^{+\\infty} e^{-ax} dx = \\frac{1}{a} \\quad (a > 0)$$

$$\\int_0^{+\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$$ (Eyler-Puasson integrali)

## 2. Ikkinchi tur (chegaralanmagan funksiya)

Agar $f(x)$ da $x = a$ nuqtada uzilish bo'lsa:

$$\\int_a^b f(x)dx = \\lim_{\\varepsilon \\to 0^+} \\int_{a+\\varepsilon}^b f(x)dx$$

Agar $f(x)$ da $x = b$ nuqtada uzilish bo'lsa:

$$\\int_a^b f(x)dx = \\lim_{\\varepsilon \\to 0^+} \\int_a^{b-\\varepsilon} f(x)dx$$

Agar $f(x)$ da $x = c \\in (a,b)$ nuqtada uzilish bo'lsa:

$$\\int_a^b f(x)dx = \\int_a^c f(x)dx + \\int_c^b f(x)dx$$

### Asosiy misol:

$$\\int_0^1 \\frac{1}{x^p} dx = \\begin{cases} \\frac{1}{1-p} & \\text{agar } p < 1 \\text{ (yaqinlashadi)} \\\\ +\\infty & \\text{agar } p \\geq 1 \\text{ (yaqinlashmaydi)} \\end{cases}$$

## 3. Yaqinlashish alomatlari

### Solishtirish alomati:

Agar $0 \\leq f(x) \\leq g(x)$ barcha $x \\geq a$ uchun:

- $\\int_a^{+\\infty} g(x)dx$ yaqinlashsa → $\\int_a^{+\\infty} f(x)dx$ ham yaqinlashadi
- $\\int_a^{+\\infty} f(x)dx$ yaqinlashmasa → $\\int_a^{+\\infty} g(x)dx$ ham yaqinlashmaydi

### Limitli solishtirish alomati:

$$\\lim_{x \\to +\\infty} \\frac{f(x)}{g(x)} = L$$

- $0 < L < \\infty$: ikkala integral bir xil xulq-atvorda
- $L = 0$: $\\int g$ yaqinlashsa → $\\int f$ yaqinlashadi
- $L = \\infty$: $\\int g$ yaqinlashmasa → $\\int f$ yaqinlashmaydi

### Etalon integrallar bilan solishtirish:

$x \\to +\\infty$ da: $\\int_a^{+\\infty} \\frac{1}{x^p}dx$ bilan solishtiramiz

$x \\to 0^+$ da: $\\int_0^a \\frac{1}{x^p}dx$ bilan solishtiramiz

## 4. Absolut va shartli yaqinlashish

### Absolut yaqinlashish:
Agar $\\int_a^{+\\infty} |f(x)|dx$ yaqinlashsa, integral **absolut yaqinlashadi**.

**Teorema:** Absolut yaqinlashuvchi integral yaqinlashadi.

### Shartli yaqinlashish:
Agar $\\int_a^{+\\infty} f(x)dx$ yaqinlashsa, lekin $\\int_a^{+\\infty} |f(x)|dx$ yaqinlashmasa, integral **shartli yaqinlashadi**.

### Dirixle alomati:
Agar:
1. $F(x) = \\int_a^x f(t)dt$ chegaralangan
2. $g(x)$ monoton kamayadi va $\\lim_{x \\to \\infty} g(x) = 0$

U holda $\\int_a^{+\\infty} f(x)g(x)dx$ yaqinlashadi.

### Abel alomati:
Agar:
1. $\\int_a^{+\\infty} f(x)dx$ yaqinlashadi
2. $g(x)$ monoton va chegaralangan

U holda $\\int_a^{+\\infty} f(x)g(x)dx$ yaqinlashadi.

## 5. Gamma va Beta funksiyalari

### Gamma funksiya:
$$\\Gamma(\\alpha) = \\int_0^{+\\infty} x^{\\alpha-1}e^{-x}dx \\quad (\\alpha > 0)$$

**Xossalari:**
- $\\Gamma(\\alpha + 1) = \\alpha \\cdot \\Gamma(\\alpha)$
- $\\Gamma(n+1) = n!$ (natural $n$ uchun)
- $\\Gamma(1) = 1$
- $\\Gamma(1/2) = \\sqrt{\\pi}$

### Beta funksiya:
$$B(\\alpha, \\beta) = \\int_0^1 x^{\\alpha-1}(1-x)^{\\beta-1}dx \\quad (\\alpha, \\beta > 0)$$

**Xossalari:**
- $B(\\alpha, \\beta) = B(\\beta, \\alpha)$
- $B(\\alpha, \\beta) = \\frac{\\Gamma(\\alpha)\\Gamma(\\beta)}{\\Gamma(\\alpha+\\beta)}$

## 6. Asosiy qiymat (Koshi)

$$v.p. \\int_{-\\infty}^{+\\infty} f(x)dx = \\lim_{R \\to +\\infty} \\int_{-R}^{R} f(x)dx$$

**Misol:** 
$$\\int_{-\\infty}^{+\\infty} x \\, dx$$ yaqinlashmaydi, lekin
$$v.p. \\int_{-\\infty}^{+\\infty} x \\, dx = \\lim_{R \\to \\infty} \\int_{-R}^{R} x \\, dx = 0$$

## 7. Misollar

**Misol 1:** $\\int_1^{+\\infty} \\frac{1}{x^2} dx$

$$= \\lim_{b \\to +\\infty} \\left[-\\frac{1}{x}\\right]_1^b = \\lim_{b \\to +\\infty} \\left(-\\frac{1}{b} + 1\\right) = 1$$

**Misol 2:** $\\int_0^1 \\frac{1}{\\sqrt{x}} dx$

$$= \\lim_{\\varepsilon \\to 0^+} [2\\sqrt{x}]_{\\varepsilon}^1 = 2 - 0 = 2$$

**Misol 3:** $\\int_0^{+\\infty} e^{-x} dx$

$$= \\lim_{b \\to +\\infty} [-e^{-x}]_0^b = 0 - (-1) = 1$$

**Misol 4:** $\\int_1^{+\\infty} \\frac{\\sin x}{x^2} dx$ yaqinlashadimi?

$\\left|\\frac{\\sin x}{x^2}\\right| \\leq \\frac{1}{x^2}$ va $\\int_1^{+\\infty} \\frac{1}{x^2}dx$ yaqinlashadi.

Demak, $\\int_1^{+\\infty} \\frac{\\sin x}{x^2} dx$ **absolut yaqinlashadi**.

**Misol 5:** $\\int_0^{+\\infty} \\frac{\\sin x}{x} dx$ (Dirixle integrali)

Bu integral **shartli yaqinlashadi** va:
$$\\int_0^{+\\infty} \\frac{\\sin x}{x} dx = \\frac{\\pi}{2}$$
` 
  },
  { 
    id: "M7", 
    title: "Ko'p o'zgaruvchili funksiyalar", 
    description: "Ko'p o'zgaruvchili funksiyaning ta'rifi, xususiy hosilalari.", 
    content: `# Ko'p O'zgaruvchili Funksiyalar

## 1. Asosiy tushunchalar

### Ta'rif:
$z = f(x, y)$ — ikki o'zgaruvchili funksiya, agar har bir $(x, y) \\in D$ juftlikka yagona $z$ qiymat mos kelsa.

### Aniqlanish sohasi:
$D \\subset \\mathbb{R}^2$ — tekislikdagi nuqtalar to'plami

### Qiymatlar to'plami:
$E = \\{z : z = f(x, y), (x, y) \\in D\\}$

### Daraja chiziqlari:
$f(x, y) = c$ — funksiyaning daraja chizig'i (kontur chizig'i)

## 2. Limit va uzluksizlik

### Limit:
$$\\lim_{(x,y) \\to (x_0, y_0)} f(x, y) = L$$

agar ixtiyoriy $\\varepsilon > 0$ uchun shunday $\\delta > 0$ topilsaki:
$$0 < \\sqrt{(x-x_0)^2 + (y-y_0)^2} < \\delta \\Rightarrow |f(x,y) - L| < \\varepsilon$$

### Uzluksizlik:
$f(x, y)$ $(x_0, y_0)$ nuqtada **uzluksiz**, agar:
$$\\lim_{(x,y) \\to (x_0, y_0)} f(x, y) = f(x_0, y_0)$$

### Muhim xususiyat:
Ikki o'zgaruvchili funksiya uchun limit yo'nalishga bog'liq bo'lishi mumkin!

## 3. Xususiy hosilalar

### Ta'rif:

$x$ bo'yicha xususiy hosila ($y$ ni konstanta deb):

$$\\frac{\\partial f}{\\partial x} = f_x = f'_x = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x, y) - f(x, y)}{\\Delta x}$$

$y$ bo'yicha xususiy hosila ($x$ ni konstanta deb):

$$\\frac{\\partial f}{\\partial y} = f_y = f'_y = \\lim_{\\Delta y \\to 0} \\frac{f(x, y + \\Delta y) - f(x, y)}{\\Delta y}$$

### Geometrik ma'no:
- $f_x(x_0, y_0)$ — $y = y_0$ tekislikdagi kesim egri chiziqning urinma burchagi
- $f_y(x_0, y_0)$ — $x = x_0$ tekislikdagi kesim egri chiziqning urinma burchagi

### Xususiy hosilalar jadvali:

| $f(x,y)$ | $f_x$ | $f_y$ |
|----------|-------|-------|
| $x^n y^m$ | $nx^{n-1}y^m$ | $mx^n y^{m-1}$ |
| $e^{xy}$ | $ye^{xy}$ | $xe^{xy}$ |
| $\\sin(xy)$ | $y\\cos(xy)$ | $x\\cos(xy)$ |
| $\\ln(x^2+y^2)$ | $\\frac{2x}{x^2+y^2}$ | $\\frac{2y}{x^2+y^2}$ |
| $\\arctan(y/x)$ | $\\frac{-y}{x^2+y^2}$ | $\\frac{x}{x^2+y^2}$ |

## 4. To'liq differensial

### Ta'rif:
$$df = \\frac{\\partial f}{\\partial x} dx + \\frac{\\partial f}{\\partial y} dy = f_x dx + f_y dy$$

### To'liq o'sish:
$$\\Delta f = f(x + \\Delta x, y + \\Delta y) - f(x, y)$$

### Differensiallanish sharti:
$f$ differensiallanuvchi, agar:
$$\\Delta f = f_x \\Delta x + f_y \\Delta y + \\alpha \\Delta x + \\beta \\Delta y$$
bu yerda $\\alpha, \\beta \\to 0$ $\\Delta x, \\Delta y \\to 0$ da.

### Teorema:
Agar $f_x$ va $f_y$ mavjud va uzluksiz bo'lsa, $f$ differensiallanuvchi.

## 5. Gradient

$$\\nabla f = \\text{grad } f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right) = f_x \\vec{i} + f_y \\vec{j}$$

### Xossalari:
- $|\\nabla f|$ — funksiyaning eng tez o'sish tezligi
- $\\nabla f$ yo'nalishi — eng tez o'sish yo'nalishi
- $-\\nabla f$ yo'nalishi — eng tez kamayish yo'nalishi
- $\\nabla f \\perp$ daraja chiziqlari

### Gradient xossalari:
$$\\nabla(f + g) = \\nabla f + \\nabla g$$
$$\\nabla(cf) = c \\nabla f$$
$$\\nabla(fg) = f\\nabla g + g\\nabla f$$
$$\\nabla\\left(\\frac{f}{g}\\right) = \\frac{g\\nabla f - f\\nabla g}{g^2}$$

## 6. Yo'nalish bo'yicha hosila

$\\vec{l} = (\\cos \\alpha, \\cos \\beta)$ — birlik vektor bo'lsa:

$$\\frac{\\partial f}{\\partial l} = \\nabla f \\cdot \\vec{l} = f_x \\cos \\alpha + f_y \\cos \\beta$$

### Gradient orqali:
$$\\frac{\\partial f}{\\partial l} = |\\nabla f| \\cos \\theta$$

bu yerda $\\theta$ — $\\nabla f$ va $\\vec{l}$ orasidagi burchak.

### Maxsus holatlar:
- $\\theta = 0$: $\\frac{\\partial f}{\\partial l} = |\\nabla f|$ (maksimal)
- $\\theta = \\pi$: $\\frac{\\partial f}{\\partial l} = -|\\nabla f|$ (minimal)
- $\\theta = \\pi/2$: $\\frac{\\partial f}{\\partial l} = 0$ (daraja chizig'i bo'ylab)

## 7. Murakkab funksiyaning hosilasi (zanjir qoidasi)

### Holat 1: $z = f(u, v)$, $u = u(x)$, $v = v(x)$

$$\\frac{dz}{dx} = \\frac{\\partial f}{\\partial u}\\frac{du}{dx} + \\frac{\\partial f}{\\partial v}\\frac{dv}{dx}$$

### Holat 2: $z = f(u, v)$, $u = u(x, y)$, $v = v(x, y)$

$$\\frac{\\partial z}{\\partial x} = \\frac{\\partial f}{\\partial u}\\frac{\\partial u}{\\partial x} + \\frac{\\partial f}{\\partial v}\\frac{\\partial v}{\\partial x}$$

$$\\frac{\\partial z}{\\partial y} = \\frac{\\partial f}{\\partial u}\\frac{\\partial u}{\\partial y} + \\frac{\\partial f}{\\partial v}\\frac{\\partial v}{\\partial y}$$

## 8. Yashirin funksiyaning hosillari

$F(x, y, z) = 0$ tenglama berilgan bo'lsa ($z = z(x, y)$):

$$\\frac{\\partial z}{\\partial x} = -\\frac{F_x}{F_z}, \\quad \\frac{\\partial z}{\\partial y} = -\\frac{F_y}{F_z}$$

## 9. Misollar

**Misol 1:** $f(x, y) = x^2y + 3xy^2 - 2y$

$$f_x = 2xy + 3y^2$$
$$f_y = x^2 + 6xy - 2$$

$(1, 2)$ nuqtada:
- $f_x(1, 2) = 2 \\cdot 1 \\cdot 2 + 3 \\cdot 4 = 16$
- $f_y(1, 2) = 1 + 12 - 2 = 11$

Gradient: $\\nabla f(1, 2) = (16, 11)$

$|\\nabla f| = \\sqrt{256 + 121} = \\sqrt{377}$

**Misol 2:** $f(x, y) = x^2 + y^2$ funksiyaning $\\vec{l} = (3/5, 4/5)$ yo'nalishidagi hosilasi $(1, 2)$ nuqtada:

$\\nabla f = (2x, 2y)$, $(1, 2)$ da: $\\nabla f = (2, 4)$

$$\\frac{\\partial f}{\\partial l} = 2 \\cdot \\frac{3}{5} + 4 \\cdot \\frac{4}{5} = \\frac{6 + 16}{5} = \\frac{22}{5}$$
` 
  },
  { 
    id: "M8", 
    title: "Yuqori tartibli xususiy hosilalar", 
    description: "Yuqori tartibli xususiy hosilalar va differensiallar.", 
    content: `# Yuqori Tartibli Xususiy Hosilalar

## 1. Ikkinchi tartibli xususiy hosilalar

### Ta'riflar:

$$f_{xx} = \\frac{\\partial^2 f}{\\partial x^2} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial x}\\right)$$

$$f_{yy} = \\frac{\\partial^2 f}{\\partial y^2} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial y}\\right)$$

### Aralash hosilalar:

$$f_{xy} = \\frac{\\partial^2 f}{\\partial y \\partial x} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial x}\\right)$$

$$f_{yx} = \\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial y}\\right)$$

### Shvarts teoremasi:
Agar $f_{xy}$ va $f_{yx}$ uzluksiz bo'lsa:
$$f_{xy} = f_{yx}$$

## 2. n-tartibli xususiy hosilalar

$$\\frac{\\partial^n f}{\\partial x^k \\partial y^{n-k}}$$

### Hosilalar soni:
$n$-tartibli xususiy hosilalar soni $n+1$ ta (Shvarts teoremasi hisobga olinsa).

### Belgilashlar:
$$f_{xxy} = \\frac{\\partial^3 f}{\\partial y \\partial x^2}$$

$$f_{xyy} = \\frac{\\partial^3 f}{\\partial y^2 \\partial x}$$

## 3. Gessian matritsasi

$$H = \\begin{pmatrix} f_{xx} & f_{xy} \\\\ f_{yx} & f_{yy} \\end{pmatrix}$$

### Gessian determinanti:

$$|H| = \\det(H) = f_{xx} \\cdot f_{yy} - (f_{xy})^2$$

### Uch o'zgaruvchili funksiya uchun:

$$H = \\begin{pmatrix} f_{xx} & f_{xy} & f_{xz} \\\\ f_{yx} & f_{yy} & f_{yz} \\\\ f_{zx} & f_{zy} & f_{zz} \\end{pmatrix}$$

## 4. Ekstremum shartlari

### Kritik nuqtalar:
$f_x(x_0, y_0) = 0$ va $f_y(x_0, y_0) = 0$

### Ikkinchi tartibli shartlar:

$(x_0, y_0)$ kritik nuqtada:

| Shart | Natija |
|-------|--------|
| $\\|H\\| > 0$ va $f_{xx} > 0$ | **Lokal minimum** |
| $\\|H\\| > 0$ va $f_{xx} < 0$ | **Lokal maksimum** |
| $\\|H\\| < 0$ | **Egar nuqtasi** (ekstremum yo'q) |
| $\\|H\\| = 0$ | Qo'shimcha tekshiruv kerak |

### n o'zgaruvchili funksiya uchun:

Silvestr mezoni: Gessian matritsasining bosh minorlari tekshiriladi.

## 5. Ikkinchi tartibli differensial

$$d^2f = f_{xx}dx^2 + 2f_{xy}dxdy + f_{yy}dy^2$$

### Umumiy formula:
$$d^n f = \\sum_{k=0}^{n} C_n^k \\frac{\\partial^n f}{\\partial x^k \\partial y^{n-k}} dx^k dy^{n-k}$$

### Simvolik yozuv:
$$d^n f = \\left(dx \\frac{\\partial}{\\partial x} + dy \\frac{\\partial}{\\partial y}\\right)^n f$$

## 6. Teylor formulasi (ikki o'zgaruvchili)

$$f(x_0+h, y_0+k) = f(x_0, y_0) + df + \\frac{1}{2!}d^2f + ... + \\frac{1}{n!}d^nf + R_n$$

bu yerda $dx = h$, $dy = k$.

### Yoyilgan ko'rinishi:

$$f(x_0+h, y_0+k) = f(x_0, y_0) + f_x h + f_y k$$
$$+ \\frac{1}{2}(f_{xx}h^2 + 2f_{xy}hk + f_{yy}k^2) + ...$$

## 7. Differensial operatorlar

### Laplas operatori:

$$\\Delta f = \\nabla^2 f = f_{xx} + f_{yy}$$

Uch o'zgaruvchili:
$$\\Delta f = f_{xx} + f_{yy} + f_{zz}$$

### Garmonik funksiya:
$f$ **garmonik**, agar $\\Delta f = 0$

**Misollar:**
- $f = \\ln\\sqrt{x^2+y^2}$ — garmonik
- $f = e^x \\cos y$ — garmonik

### Divergensiya:
$$\\text{div } \\vec{F} = \\nabla \\cdot \\vec{F} = \\frac{\\partial P}{\\partial x} + \\frac{\\partial Q}{\\partial y} + \\frac{\\partial R}{\\partial z}$$

### Rotor (aylanma):
$$\\text{rot } \\vec{F} = \\nabla \\times \\vec{F} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ P & Q & R \\end{vmatrix}$$

## 8. Shartli ekstremum (Lagranj usuli)

### Masala:
$f(x, y)$ ning ekstremumini topish, $g(x, y) = 0$ sharti bilan.

### Lagranj funksiyasi:
$$L(x, y, \\lambda) = f(x, y) + \\lambda g(x, y)$$

### Sistema:
$$\\begin{cases} L_x = f_x + \\lambda g_x = 0 \\\\ L_y = f_y + \\lambda g_y = 0 \\\\ L_\\lambda = g(x, y) = 0 \\end{cases}$$

### Ko'p shartli masala:
$g_1(x,y,z) = 0$, $g_2(x,y,z) = 0$ shartlari bilan:

$$L = f + \\lambda_1 g_1 + \\lambda_2 g_2$$

## 9. Misollar

**Misol 1:** $f(x, y) = x^3 + y^3 - 3xy$ ekstremumlarini toping.

$f_x = 3x^2 - 3y = 0 \\Rightarrow y = x^2$

$f_y = 3y^2 - 3x = 0 \\Rightarrow x = y^2$

Sistemadan: $x = x^4 \\Rightarrow x(x^3-1) = 0$

Kritik nuqtalar: $(0, 0)$ va $(1, 1)$

$f_{xx} = 6x$, $f_{yy} = 6y$, $f_{xy} = -3$

**$(1, 1)$ da:**
$|H| = 36 - 9 = 27 > 0$, $f_{xx} = 6 > 0$ → **minimum**, $f(1,1) = -1$

**$(0, 0)$ da:**
$|H| = 0 - 9 = -9 < 0$ → **egar nuqtasi**

**Misol 2:** $f(x,y) = xy$ ning ekstremumini $x + y = 1$ sharti bilan toping.

$L = xy + \\lambda(x + y - 1)$

$L_x = y + \\lambda = 0$
$L_y = x + \\lambda = 0$
$L_\\lambda = x + y - 1 = 0$

Yechim: $x = y = 1/2$, $\\lambda = -1/2$

$f(1/2, 1/2) = 1/4$ — **maksimum**
` 
  },
  { 
    id: "M9", 
    title: "Differensial tenglamalar asoslari", 
    description: "Differensial tenglama keltiriluvchi masalalar.", 
    content: `# Differensial Tenglamalar Asoslari

## 1. Asosiy tushunchalar

### Ta'rif:
**Differensial tenglama (DT)** — noma'lum funksiya va uning hosilalarini o'z ichiga olgan tenglama.

$$F(x, y, y', y'', ..., y^{(n)}) = 0$$

### Terminologiya:

| Tushuncha | Ta'rifi |
|-----------|---------|
| **Tartib** | Eng yuqori hosila tartibi |
| **Oddiy DT** | Bir o'zgaruvchili noma'lum funksiya |
| **Xususiy DT** | Ko'p o'zgaruvchili noma'lum funksiya |

### Yechim turlari:

- **Umumiy yechim** — $n$ ta ixtiyoriy konstantali yechim (tartibga teng)
- **Xususiy yechim** — konstantalarga aniq qiymat berilgan yechim
- **Singular (g'ayrioddiy) yechim** — umumiy yechimdan olinmaydigan yechim

## 2. Koshi masalasi

DT ni boshlang'ich shartlar bilan yechish:

### Birinchi tartibli:
$$y' = f(x, y), \\quad y(x_0) = y_0$$

### n-tartibli:
$$y^{(n)} = f(x, y, y', ..., y^{(n-1)})$$
$$y(x_0) = y_0, \\quad y'(x_0) = y_1, \\quad ..., \\quad y^{(n-1)}(x_0) = y_{n-1}$$

### Mavjudlik va yagonalik teoremasi (Pikar-Lindelyof):
Agar $f(x, y)$ va $\\frac{\\partial f}{\\partial y}$ uzluksiz bo'lsa, Koshi masalasining yagona yechimi mavjud.

## 3. Ajratiluvchi o'zgaruvchili DT

### Ko'rinishi:
$$g(y)dy = f(x)dx$$

yoki

$$y' = f(x) \\cdot g(y)$$

### Yechish usuli:
$$\\int g(y)dy = \\int f(x)dx + C$$

### Misol 1:
$y' = xy$

$$\\frac{dy}{y} = x \\, dx$$

$$\\ln|y| = \\frac{x^2}{2} + C_1$$

$$y = Ce^{x^2/2}$$

### Misol 2:
$y' = y^2$, $y(0) = 1$

$$\\frac{dy}{y^2} = dx \\Rightarrow -\\frac{1}{y} = x + C$$

$y(0) = 1$: $C = -1$

$$y = \\frac{1}{1-x}$$

## 4. Bir jinsli DT

### Ko'rinishi:
$$y' = f\\left(\\frac{y}{x}\\right)$$

### Alomati:
$y' = \\frac{M(x,y)}{N(x,y)}$ da $M$ va $N$ bir xil darajali bir jinsli funksiyalar.

### O'rniga qo'yish:
$y = ux$, $y' = u'x + u$

### Natija:
$u'x + u = f(u) \\Rightarrow \\frac{du}{f(u) - u} = \\frac{dx}{x}$

### Misol:
$y' = \\frac{y}{x} + \\tan\\frac{y}{x}$

$u = y/x$: $u'x + u = u + \\tan u$

$$\\frac{du}{\\tan u} = \\frac{dx}{x}$$

$$\\cos u \\, du / \\sin u = dx/x$$

$$\\ln|\\sin u| = \\ln|x| + C$$

$$\\sin\\frac{y}{x} = Cx$$

## 5. Chiziqli DT (birinchi tartib)

### Ko'rinishi:
$$y' + p(x)y = q(x)$$

### Bir jinsli ($q(x) = 0$):
$$y_h = Ce^{-\\int p(x)dx}$$

### Bir jinsli emas ($q(x) \\neq 0$):

**Usul 1: Konstantani variatsiyalash (Lagranj)**

$y = C(x) \\cdot e^{-\\int p \\, dx}$ deb qo'yamiz.

**Usul 2: Integrallovchi ko'paytiruvchi**

$\\mu = e^{\\int p(x)dx}$ bo'lsa:

$$y = \\frac{1}{\\mu}\\left(\\int q(x)\\mu \\, dx + C\\right)$$

### Umumiy formula:
$$y = e^{-\\int p \\, dx} \\left( \\int q \\cdot e^{\\int p \\, dx} dx + C \\right)$$

### Misol:
$y' + 2y = e^{-x}$

$p = 2$, $q = e^{-x}$

$\\mu = e^{2x}$

$$y = e^{-2x}\\left(\\int e^{-x} \\cdot e^{2x} dx + C\\right) = e^{-2x}(e^x + C) = e^{-x} + Ce^{-2x}$$

## 6. Bernulli tenglamasi

### Ko'rinishi:
$$y' + p(x)y = q(x)y^n \\quad (n \\neq 0, 1)$$

### O'rniga qo'yish:
$z = y^{1-n}$, $z' = (1-n)y^{-n}y'$

### Natija (chiziqli DT):
$$z' + (1-n)p(x)z = (1-n)q(x)$$

### Misol:
$y' + y = xy^3$

$n = 3$, $z = y^{-2}$, $z' = -2y^{-3}y'$

$$-\\frac{z'}{2} + z = x \\Rightarrow z' - 2z = -2x$$

Bu chiziqli DT.

## 7. Rikatti tenglamasi

### Ko'rinishi:
$$y' = p(x)y^2 + q(x)y + r(x)$$

### Yechish usuli:
Agar xususiy yechim $y_1$ ma'lum bo'lsa:

$y = y_1 + \\frac{1}{z}$ almashtiramiz → Bernulli tenglamasiga keladi.

## 8. Geometrik va fizik masalalar

### Ortogonal trayektoriyalar:
$F(x, y, C) = 0$ egri chiziqlar oilasiga ortogonal trayektoriyalar:

1. $C$ ni yo'q qilamiz → $y' = f(x, y)$
2. $y'$ ni $-1/y'$ ga almashtiramiz
3. Yangi DTni yechamiz

### Radioaktiv yemirilish:
$$\\frac{dN}{dt} = -\\lambda N \\Rightarrow N = N_0 e^{-\\lambda t}$$

### Nyuton sovish qonuni:
$$\\frac{dT}{dt} = -k(T - T_a) \\Rightarrow T = T_a + (T_0 - T_a)e^{-kt}$$

### Populyatsiya o'sishi:
$$\\frac{dP}{dt} = kP \\Rightarrow P = P_0 e^{kt}$$

### Logistik o'sish:
$$\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{M}\\right)$$

## 9. Misollar

**Misol 1:** Tezlanish $a = 10 - v$ bo'lsa, $v(0) = 0$ da tezlikni toping.

$$\\frac{dv}{dt} = 10 - v$$

$$\\frac{dv}{10-v} = dt$$

$$-\\ln|10-v| = t + C$$

$v(0) = 0$: $C = -\\ln 10$

$$v = 10(1 - e^{-t})$$

**Misol 2:** $y' = \\frac{2xy}{x^2 - y^2}$

Bu bir jinsli DT. $y = ux$:

$$u'x + u = \\frac{2u}{1-u^2}$$

$$u'x = \\frac{2u - u + u^3}{1-u^2} = \\frac{u + u^3}{1-u^2} = \\frac{u(1+u^2)}{1-u^2}$$

$$\\frac{(1-u^2)du}{u(1+u^2)} = \\frac{dx}{x}$$
` 
  },
  { 
    id: "M10", 
    title: "Maxsus tipli differensial tenglamalar", 
    description: "Bir jinsli va chiziqli differensial tenglamalar.", 
    content: `# Maxsus Tipli Differensial Tenglamalar

## 1. To'liq differensial tenglama

### Ko'rinishi:
$$M(x,y)dx + N(x,y)dy = 0$$

### To'liqlik sharti:
$$\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}$$

### Yechish algoritmi:

1. To'liqlikni tekshiring
2. $U(x,y)$ ni toping: $\\frac{\\partial U}{\\partial x} = M$, $\\frac{\\partial U}{\\partial y} = N$

**Usul:**
$$U = \\int M \\, dx + \\varphi(y)$$

$\\frac{\\partial U}{\\partial y} = N$ dan $\\varphi(y)$ ni topamiz.

3. Umumiy yechim: $U(x,y) = C$

### Misol:
$(2xy + 3)dx + (x^2 + 4y)dy = 0$

$M = 2xy + 3$, $N = x^2 + 4y$

$M_y = 2x$, $N_x = 2x$ ✓ To'liq!

$U = \\int (2xy + 3)dx = x^2y + 3x + \\varphi(y)$

$U_y = x^2 + \\varphi'(y) = x^2 + 4y$

$\\varphi'(y) = 4y \\Rightarrow \\varphi(y) = 2y^2$

**Yechim:** $x^2y + 3x + 2y^2 = C$

## 2. Integrallovchi ko'paytiruvchi

Agar tenglama to'liq bo'lmasa, $\\mu(x,y)$ topamiz:

$$\\mu M dx + \\mu N dy = 0$$ to'liq bo'lsin.

### Alohida holatlar:

**1. $\\mu = \\mu(x)$ bo'lsa:**

$$\\frac{1}{\\mu}\\frac{d\\mu}{dx} = \\frac{M_y - N_x}{N} = f(x)$$

$$\\mu = e^{\\int f(x)dx}$$

**2. $\\mu = \\mu(y)$ bo'lsa:**

$$\\frac{1}{\\mu}\\frac{d\\mu}{dy} = \\frac{N_x - M_y}{M} = g(y)$$

$$\\mu = e^{\\int g(y)dy}$$

**3. $\\mu = \\mu(xy)$ bo'lsa:**

$t = xy$ deb qo'yamiz.

**4. $\\mu = \\mu(x/y)$ yoki $\\mu = \\mu(y/x)$ bo'lsa:**

### Misol:
$(y + xy^2)dx - xdy = 0$

$M = y + xy^2$, $N = -x$

$M_y = 1 + 2xy$, $N_x = -1$

$\\frac{M_y - N_x}{N} = \\frac{2 + 2xy}{-x} = -\\frac{2(1+xy)}{x}$ — $x$ ga bog'liq emas!

$\\frac{N_x - M_y}{M} = \\frac{-2-2xy}{y(1+xy)} = \\frac{-2}{y}$ — faqat $y$ ga bog'liq!

$\\mu = e^{\\int -2/y \\, dy} = e^{-2\\ln|y|} = \\frac{1}{y^2}$

## 3. Klero tenglamasi

### Ko'rinishi:
$$y = xy' + f(y')$$

### Yechish:
$p = y'$ deb belgilaymiz:
$$y = xp + f(p)$$

Differensiallaymiz:
$$dy = p \\, dx = p \\, dx + x \\, dp + f'(p)dp$$

$$0 = (x + f'(p))dp$$

### Umumiy yechim:
$dp = 0 \\Rightarrow p = C$

$$y = Cx + f(C)$$ — to'g'ri chiziqlar oilasi

### Singular yechim:
$x + f'(p) = 0 \\Rightarrow x = -f'(p)$

$y = -pf'(p) + f(p)$ — konvert (envelope)

### Misol:
$y = xy' + (y')^2$

$f(p) = p^2$

Umumiy yechim: $y = Cx + C^2$

Singular yechim: $x = -2p$, $y = -2p \\cdot p + p^2 = -p^2$

$p = -x/2$: $y = -x^2/4$ — parabola

## 4. Lagrandj tenglamasi

### Ko'rinishi:
$$y = x\\varphi(y') + \\psi(y')$$

### Yechish:
$p = y'$ deb:
$$y = x\\varphi(p) + \\psi(p)$$

$dy = p \\, dx$:
$$p \\, dx = \\varphi(p)dx + x\\varphi'(p)dp + \\psi'(p)dp$$

$$[p - \\varphi(p)]dx = [x\\varphi'(p) + \\psi'(p)]dp$$

$$\\frac{dx}{dp} - \\frac{\\varphi'(p)}{p - \\varphi(p)}x = \\frac{\\psi'(p)}{p - \\varphi(p)}$$

Bu $x$ ga nisbatan chiziqli DT.

## 5. Tartibni pasaytirish mumkin bo'lgan tenglamalar

### Turi 1: $y$ yo'q — $F(x, y', y'') = 0$

**O'rniga qo'yish:** $p = y'$, $p' = y''$

$F(x, p, p') = 0$ — birinchi tartibli DT

### Turi 2: $x$ yo'q — $F(y, y', y'') = 0$

**O'rniga qo'yish:** $p = y'$, $y'' = p\\frac{dp}{dy}$

$F(y, p, p\\frac{dp}{dy}) = 0$ — birinchi tartibli DT

### Misol:
$yy'' = (y')^2$

$p = y'$, $y'' = p\\frac{dp}{dy}$:

$yp\\frac{dp}{dy} = p^2$

$\\frac{dp}{p} = \\frac{dy}{y}$

$\\ln|p| = \\ln|y| + C_1$

$p = C_1 y$, ya'ni $y' = C_1 y$

$\\frac{dy}{y} = C_1 dx$

$\\ln|y| = C_1 x + C_2$

**Yechim:** $y = C_2 e^{C_1 x}$

## 6. Ortogonal trayektoriyalar

### Algoritm:

1. $F(x, y, C) = 0$ oilasidan $C$ ni yo'q qiling → DT hosil bo'ladi
2. $y'$ ni $-\\frac{1}{y'}$ ga (yoki $\\frac{dx}{dy}$ ni $-\\frac{dy}{dx}$ ga) almashtiramiz
3. Hosil bo'lgan DTni yechamiz

### Misol:
$y = Cx^2$ parabolalar oilasiga ortogonal trayektoriyalar.

$y' = 2Cx$, $C = y/x^2$:

$y' = \\frac{2y}{x}$

Ortogonal: $y' = -\\frac{x}{2y}$

$2y \\, dy = -x \\, dx$

$y^2 = -\\frac{x^2}{2} + C$

**Ortogonal trayektoriyalar:** $x^2 + 2y^2 = C$ — ellipslar

## 7. Isoklinalar usuli

**Isoklina** — bir xil burchakli tangentlar egri chizig'i.

$y' = f(x, y) = k$ — $k$ burchakli isoklina

### Grafik yechim algoritmi:
1. Turli $k$ lar uchun isoklinalarni chizing
2. Har bir isoklinada $k$ burchakli chiziqchalar chizing
3. Yechim egri chiziqlarini chizing

## 8. Misollar

**Misol 1:** $(3x^2 + 6xy^2)dx + (6x^2y + 4y^3)dy = 0$

$M_y = 12xy$, $N_x = 12xy$ ✓

$U = \\int (3x^2 + 6xy^2)dx = x^3 + 3x^2y^2 + \\varphi(y)$

$U_y = 6x^2y + \\varphi'(y) = 6x^2y + 4y^3$

$\\varphi(y) = y^4$

**Yechim:** $x^3 + 3x^2y^2 + y^4 = C$

**Misol 2:** $y = xy' - \\frac{1}{y'}$ (Klero)

Umumiy yechim: $y = Cx - \\frac{1}{C}$

Singular: $x = -\\frac{1}{p^2}$, $y = -\\frac{1}{p} - \\frac{1}{p} = -\\frac{2}{p}$

$p^2 = -1/x$, $y^2 = 4/p^2 = -4x$

**Singular yechim:** $y^2 = -4x$ (parabola)
` 
  },
  { 
    id: "M11", 
    title: "Yuqori tartibli differensial tenglamalar", 
    description: "Yuqori tartibli DT uchun Koshi masalasi.", 
    content: `# Yuqori Tartibli Differensial Tenglamalar

## 1. n-tartibli DT

### Umumiy ko'rinishi:
$$F(x, y, y', y'', ..., y^{(n)}) = 0$$

### Normal ko'rinishi:
$$y^{(n)} = f(x, y, y', ..., y^{(n-1)})$$

### Koshi masalasi:
$$y(x_0) = y_0, \\quad y'(x_0) = y_1, \\quad ..., \\quad y^{(n-1)}(x_0) = y_{n-1}$$

### Umumiy yechim:
$$y = \\varphi(x, C_1, C_2, ..., C_n)$$

## 2. O'zgarmas koeffitsientli bir jinsli chiziqli DT

### Ko'rinishi:
$$y^{(n)} + a_1 y^{(n-1)} + ... + a_{n-1}y' + a_n y = 0$$

### Xarakteristik tenglama:
$$k^n + a_1 k^{n-1} + ... + a_{n-1}k + a_n = 0$$

### Yechim ildizlarga qarab:

| Ildiz turi | Umumiy yechimga qo'shiladi |
|------------|----------------------------|
| $k$ — haqiqiy oddiy | $C e^{kx}$ |
| $k$ — haqiqiy $m$-karrali | $(C_1 + C_2 x + ... + C_m x^{m-1})e^{kx}$ |
| $k = \\alpha \\pm \\beta i$ — kompleks juft | $e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)$ |
| $k = \\alpha \\pm \\beta i$ — $m$-karrali | $e^{\\alpha x}[(C_1 + ... + C_m x^{m-1})\\cos\\beta x + (D_1 + ... + D_m x^{m-1})\\sin\\beta x]$ |

## 3. Ikkinchi tartibli DT

### Ko'rinishi:
$$y'' + py' + qy = 0$$

### Xarakteristik tenglama:
$$k^2 + pk + q = 0$$

### Diskriminant:
$$D = p^2 - 4q$$

### Yechimlar:

| Holat | Umumiy yechim |
|-------|---------------|
| $D > 0$: $k_1 \\neq k_2$ | $y = C_1 e^{k_1 x} + C_2 e^{k_2 x}$ |
| $D = 0$: $k_1 = k_2 = k$ | $y = (C_1 + C_2 x)e^{kx}$ |
| $D < 0$: $k = \\alpha \\pm \\beta i$ | $y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)$ |

### Misollar:

**1.** $y'' - 5y' + 6y = 0$

$k^2 - 5k + 6 = 0 \\Rightarrow k_1 = 2, k_2 = 3$

$$y = C_1 e^{2x} + C_2 e^{3x}$$

**2.** $y'' - 4y' + 4y = 0$

$k^2 - 4k + 4 = 0 \\Rightarrow k = 2$ (ikki karrali)

$$y = (C_1 + C_2 x)e^{2x}$$

**3.** $y'' + 2y' + 5y = 0$

$k^2 + 2k + 5 = 0 \\Rightarrow k = -1 \\pm 2i$

$$y = e^{-x}(C_1 \\cos 2x + C_2 \\sin 2x)$$

## 4. Bir jinsli emas chiziqli DT

### Ko'rinishi:
$$y^{(n)} + a_1 y^{(n-1)} + ... + a_n y = f(x)$$

### Yechim strukturasi:
$$y = y_h + y_p$$

- $y_h$ — bir jinsli DT umumiy yechimi
- $y_p$ — bir jinsli emas DT xususiy yechimi

## 5. Noaniq koeffitsientlar usuli

### Jadval:

| $f(x)$ ko'rinishi | $y_p$ ko'rinishi |
|-------------------|------------------|
| $P_n(x)$ | $x^s Q_n(x)$ |
| $e^{\\alpha x}$ | $x^s A e^{\\alpha x}$ |
| $P_n(x)e^{\\alpha x}$ | $x^s Q_n(x)e^{\\alpha x}$ |
| $\\cos\\beta x$ yoki $\\sin\\beta x$ | $x^s(A\\cos\\beta x + B\\sin\\beta x)$ |
| $e^{\\alpha x}\\cos\\beta x$ yoki $e^{\\alpha x}\\sin\\beta x$ | $x^s e^{\\alpha x}(A\\cos\\beta x + B\\sin\\beta x)$ |
| $P_n(x)e^{\\alpha x}\\cos\\beta x$ | $x^s e^{\\alpha x}[Q_n(x)\\cos\\beta x + R_n(x)\\sin\\beta x]$ |

**$s$ ni aniqlash:**
- $s = 0$ agar $\\alpha$ (yoki $\\alpha \\pm \\beta i$) ildiz emas
- $s = m$ agar $\\alpha$ (yoki $\\alpha \\pm \\beta i$) $m$-karrali ildiz

### Misol:
$y'' - 3y' + 2y = e^{3x}$

Xar. tenglama: $k^2 - 3k + 2 = 0 \\Rightarrow k = 1, 2$

$y_h = C_1 e^x + C_2 e^{2x}$

$\\alpha = 3$ ildiz emas, $s = 0$

$y_p = Ae^{3x}$

$9Ae^{3x} - 9Ae^{3x} + 2Ae^{3x} = e^{3x}$

$2A = 1 \\Rightarrow A = 1/2$

$$y = C_1 e^x + C_2 e^{2x} + \\frac{1}{2}e^{3x}$$

## 6. Konstantalarni variatsiyalash usuli

### Ikkinchi tartibli DT uchun:

$y'' + py' + qy = f(x)$

Bir jinsli yechim: $y_h = C_1 y_1 + C_2 y_2$

Xususiy yechim: $y_p = u_1(x)y_1 + u_2(x)y_2$

### Sistema:
$$\\begin{cases} u_1'y_1 + u_2'y_2 = 0 \\\\ u_1'y_1' + u_2'y_2' = f(x) \\end{cases}$$

### Yechim:
$$u_1' = -\\frac{y_2 f}{W}, \\quad u_2' = \\frac{y_1 f}{W}$$

bu yerda $W = y_1 y_2' - y_1' y_2$ — Vronskian.

### Misol:
$y'' + y = \\tan x$

$y_h = C_1 \\cos x + C_2 \\sin x$

$y_1 = \\cos x$, $y_2 = \\sin x$

$W = \\cos^2 x + \\sin^2 x = 1$

$u_1' = -\\sin x \\tan x = -\\frac{\\sin^2 x}{\\cos x}$

$u_2' = \\cos x \\tan x = \\sin x$

$u_1 = -\\int \\frac{1-\\cos^2 x}{\\cos x}dx = \\sin x - \\ln|\\sec x + \\tan x|$

$u_2 = -\\cos x$

$$y_p = (\\sin x - \\ln|\\sec x + \\tan x|)\\cos x - \\cos x \\sin x$$

$$y_p = -\\cos x \\ln|\\sec x + \\tan x|$$

## 7. Eyler tenglamasi

### Ko'rinishi:
$$x^n y^{(n)} + a_1 x^{n-1} y^{(n-1)} + ... + a_{n-1}xy' + a_n y = f(x)$$

### O'rniga qo'yish:
$x = e^t$ (yoki $t = \\ln x$)

$$xy' = \\frac{dy}{dt}, \\quad x^2y'' = \\frac{d^2y}{dt^2} - \\frac{dy}{dt}, ...$$

### Natija:
O'zgarmas koeffitsientli DTga keladi.

### Misol:
$x^2 y'' - 2xy' + 2y = 0$

$x = e^t$:

$\\frac{d^2y}{dt^2} - \\frac{dy}{dt} - 2\\frac{dy}{dt} + 2y = 0$

$\\frac{d^2y}{dt^2} - 3\\frac{dy}{dt} + 2y = 0$

$k^2 - 3k + 2 = 0 \\Rightarrow k = 1, 2$

$y = C_1 e^t + C_2 e^{2t} = C_1 x + C_2 x^2$

## 8. Sistemalar

### Ko'rinishi:
$$\\begin{cases} x' = ax + by \\\\ y' = cx + dy \\end{cases}$$

### Matritsali ko'rinishi:
$$\\vec{X}' = A\\vec{X}$$

### Yechim:
Xos qiymatlar va xos vektorlar orqali.

$\\lambda_1, \\lambda_2$ — xos qiymatlar, $\\vec{v}_1, \\vec{v}_2$ — xos vektorlar:

$$\\vec{X} = C_1 \\vec{v}_1 e^{\\lambda_1 t} + C_2 \\vec{v}_2 e^{\\lambda_2 t}$$
` 
  },
  { 
    id: "M12", 
    title: "Chiziqli differensial tenglamalar", 
    description: "Chiziqli bir jinsli differensial tenglamalar.", 
    content: `# Chiziqli Differensial Tenglamalar

## 1. n-tartibli chiziqli DT

### Umumiy ko'rinishi:
$$y^{(n)} + p_1(x)y^{(n-1)} + ... + p_{n-1}(x)y' + p_n(x)y = f(x)$$

### Bir jinsli:
$$L[y] = y^{(n)} + p_1(x)y^{(n-1)} + ... + p_n(x)y = 0$$

### Bir jinsli emas:
$$L[y] = f(x)$$

## 2. Chiziqli operator xossalari

$$L[y_1 + y_2] = L[y_1] + L[y_2]$$

$$L[cy] = cL[y]$$

### Superpozitsiya printsipi:
Agar $y_1, y_2, ..., y_k$ — bir jinsli DT yechimlari, u holda:

$$y = C_1 y_1 + C_2 y_2 + ... + C_k y_k$$

ham yechim.

## 3. Vronskian determinanti

### Ta'rifi:
$$W(y_1, y_2, ..., y_n) = \\begin{vmatrix} y_1 & y_2 & ... & y_n \\\\ y_1' & y_2' & ... & y_n' \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ y_1^{(n-1)} & y_2^{(n-1)} & ... & y_n^{(n-1)} \\end{vmatrix}$$

### Xossalari:

**Teorema 1:** Agar $y_1, ..., y_n$ — bir jinsli DT yechimlari, unda:
- $W \\neq 0$ barcha $x$ uchun — yechimlar chiziqli erkli (fundamental sistema)
- $W = 0$ barcha $x$ uchun — yechimlar chiziqli bog'liq

**Teorema 2 (Liuvill-Ostrogradskiy):**
$$W(x) = W(x_0) \\cdot e^{-\\int_{x_0}^{x} p_1(t)dt}$$

### Ikkinchi tartib uchun:
$$W = y_1 y_2' - y_1' y_2$$

## 4. Fundamental sistema

$y_1, y_2, ..., y_n$ — **fundamental sistema**, agar:
1. Hammasi bir jinsli DT yechimlari
2. Chiziqli erkli ($W \\neq 0$)

### Umumiy yechim:
$$y_h = C_1 y_1 + C_2 y_2 + ... + C_n y_n$$

## 5. Konstantalarni variatsiyalash (Lagranj usuli)

### n-tartibli DT uchun:

$L[y] = f(x)$ bo'lsa, $y_p = u_1 y_1 + u_2 y_2 + ... + u_n y_n$

### Sistema:
$$\\begin{cases} u_1' y_1 + u_2' y_2 + ... + u_n' y_n = 0 \\\\ u_1' y_1' + u_2' y_2' + ... + u_n' y_n' = 0 \\\\ \\vdots \\\\ u_1' y_1^{(n-1)} + u_2' y_2^{(n-1)} + ... + u_n' y_n^{(n-1)} = f(x) \\end{cases}$$

### Kramer formulasi:
$$u_k' = \\frac{W_k}{W}$$

bu yerda $W_k$ — $W$ ning $k$-ustunini $(0, 0, ..., 0, f(x))$ bilan almashtirilgani.

## 6. Yechimning mavjudligi va yagonaligi

### Teorema:
Agar $p_1(x), ..., p_n(x), f(x)$ $(a, b)$ oraliqda uzluksiz bo'lsa, Koshi masalasining yagona yechimi mavjud.

### Oqibat:
Bir jinsli DT yechimining nol nuqtalari (ildizlari) izolyatsiyalangan.

## 7. Sturm-Liuvill masalasi

### Chegaraviy masala:
$$-(p(x)y')' + q(x)y = \\lambda r(x)y, \\quad x \\in [a, b]$$

$$\\alpha_1 y(a) + \\alpha_2 y'(a) = 0$$
$$\\beta_1 y(b) + \\beta_2 y'(b) = 0$$

### Xos qiymatlar va xos funksiyalar:
$\\lambda_1 < \\lambda_2 < ... < \\lambda_n < ...$ — xos qiymatlar

$y_1, y_2, ..., y_n, ...$ — xos funksiyalar

### Ortogonallik:
$$\\int_a^b r(x) y_m(x) y_n(x) dx = 0 \\quad (m \\neq n)$$

## 8. Grin funksiyasi

### Chegaraviy masala:
$$L[y] = f(x), \\quad y(a) = y(b) = 0$$

### Grin funksiyasi $G(x, \\xi)$:
$$y(x) = \\int_a^b G(x, \\xi) f(\\xi) d\\xi$$

### Xossalari:
1. $G$ — $x$ bo'yicha uzluksiz
2. $L[G] = 0$ ($x \\neq \\xi$ uchun)
3. $G(a, \\xi) = G(b, \\xi) = 0$
4. $G_x(\\xi+0, \\xi) - G_x(\\xi-0, \\xi) = -\\frac{1}{p(\\xi)}$

## 9. O'zgaruvchan koeffitsientli DT yechimlari

### Darajali qatorlar usuli:

$y = \\sum_{n=0}^{\\infty} a_n (x - x_0)^n$

Koeffitsientlarni rekurrent formuladan topamiz.

### Frobenius usuli (regulyar singular nuqta):

$y = (x - x_0)^r \\sum_{n=0}^{\\infty} a_n (x - x_0)^n$

## 10. Misollar

**Misol 1:** $y'' - 3y' + 2y = e^{3x}$

$y_h = C_1 e^x + C_2 e^{2x}$

$W = e^x \\cdot 2e^{2x} - e^x \\cdot e^{2x} = e^{3x}$

$u_1' = -\\frac{e^{2x} \\cdot e^{3x}}{e^{3x}} = -e^{2x} \\Rightarrow u_1 = -\\frac{e^{2x}}{2}$

$u_2' = \\frac{e^x \\cdot e^{3x}}{e^{3x}} = e^x \\Rightarrow u_2 = e^x$

$y_p = -\\frac{e^{2x}}{2} \\cdot e^x + e^x \\cdot e^{2x} = \\frac{e^{3x}}{2}$

$$y = C_1 e^x + C_2 e^{2x} + \\frac{e^{3x}}{2}$$

**Misol 2:** $y'' + y = \\sec x$

$y_1 = \\cos x$, $y_2 = \\sin x$, $W = 1$

$u_1' = -\\sin x \\cdot \\sec x = -\\tan x$

$u_2' = \\cos x \\cdot \\sec x = 1$

$u_1 = \\ln|\\cos x|$, $u_2 = x$

$$y_p = \\cos x \\ln|\\cos x| + x\\sin x$$

$$y = C_1 \\cos x + C_2 \\sin x + \\cos x \\ln|\\cos x| + x\\sin x$$
` 
  },
  { 
    id: "M13", 
    title: "Sonli qatorlar", 
    description: "Sonli qatorning asosiy tushunchalari.", 
    content: `# Sonli Qatorlar

## 1. Asosiy tushunchalar

### Ta'rif:
**Sonli qator** — cheksiz yig'indi:

$$\\sum_{n=1}^{\\infty} a_n = a_1 + a_2 + a_3 + ... + a_n + ...$$

- $a_n$ — qatorning $n$-hadi (umumiy hadi)
- $S_n = a_1 + a_2 + ... + a_n$ — $n$-qisman yig'indi

### Yaqinlashish:
Qator **yaqinlashadi** (konvergent), agar:
$$S = \\lim_{n \\to \\infty} S_n$$
mavjud va chekli. $S$ — qator yig'indisi.

Aks holda qator **yaqinlashmaydi** (divergent).

## 2. Zaruriy yaqinlashish sharti

### Teorema:
Agar $\\sum a_n$ yaqinlashsa, u holda:
$$\\lim_{n \\to \\infty} a_n = 0$$

**MUHIM:** Bu shart zaruriy, lekin yetarli emas!

### Teskari aytilishi (divergentlik uchun):
Agar $\\lim_{n \\to \\infty} a_n \\neq 0$, qator yaqinlashmaydi.

## 3. Asosiy qatorlar

### Geometrik qator:
$$\\sum_{n=0}^{\\infty} q^n = 1 + q + q^2 + ... = \\begin{cases} \\frac{1}{1-q} & |q| < 1 \\\\ \\text{yaqinlashmaydi} & |q| \\geq 1 \\end{cases}$$

### Umumlashgan geometrik qator:
$$\\sum_{n=0}^{\\infty} aq^n = \\frac{a}{1-q} \\quad (|q| < 1)$$

### Garmonik qator:
$$\\sum_{n=1}^{\\infty} \\frac{1}{n} = 1 + \\frac{1}{2} + \\frac{1}{3} + ...$$

Bu qator **yaqinlashmaydi**!

### Umumlashgan garmonik qator (p-qator):
$$\\sum_{n=1}^{\\infty} \\frac{1}{n^p} = \\begin{cases} \\text{yaqinlashadi} & p > 1 \\\\ \\text{yaqinlashmaydi} & p \\leq 1 \\end{cases}$$

**Maxsus qiymatlar:**
- $\\sum \\frac{1}{n^2} = \\frac{\\pi^2}{6}$
- $\\sum \\frac{1}{n^4} = \\frac{\\pi^4}{90}$

### Telescoping qator:
$$\\sum_{n=1}^{\\infty} \\frac{1}{n(n+1)} = \\sum \\left(\\frac{1}{n} - \\frac{1}{n+1}\\right) = 1$$

## 4. Qator xossalari

### Chiziqlilik:
$$\\sum (a_n + b_n) = \\sum a_n + \\sum b_n$$ (ikkala qator yaqinlashsa)

$$\\sum c \\cdot a_n = c \\sum a_n$$

### Qoldiq:
$$r_n = S - S_n = a_{n+1} + a_{n+2} + ...$$

Agar qator yaqinlashsa: $\\lim_{n \\to \\infty} r_n = 0$

### Guruhlab yozish:
Yaqinlashuvchi qatorda hadlarni guruhlab yozish mumkin.

## 5. Musbat hadli qatorlar

### Teorema (chegaralanganlik):
Musbat hadli qator yaqinlashadi ⟺ qisman yig'indilar chegaralangan.

### Baholash:
Agar $0 \\leq a_n \\leq b_n$ barcha $n$ uchun:
- $\\sum b_n$ yaqinlashsa → $\\sum a_n$ yaqinlashadi
- $\\sum a_n$ yaqinlashmasa → $\\sum b_n$ yaqinlashmaydi

## 6. Alternativ (ishorasi almashuvchi) qatorlar

### Ko'rinishi:
$$\\sum_{n=1}^{\\infty} (-1)^{n+1} a_n = a_1 - a_2 + a_3 - a_4 + ...$$

bu yerda $a_n > 0$.

### Leybnits alomati:
Agar:
1. $a_n > 0$
2. $a_n \\geq a_{n+1}$ (monoton kamayuvchi)
3. $\\lim_{n \\to \\infty} a_n = 0$

U holda qator **yaqinlashadi** va $|r_n| \\leq a_{n+1}$

### Misol:
$$\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} = 1 - \\frac{1}{2} + \\frac{1}{3} - \\frac{1}{4} + ... = \\ln 2$$

## 7. Absolut va shartli yaqinlashish

### Ta'riflar:
- Qator **absolut yaqinlashadi**, agar $\\sum |a_n|$ yaqinlashsa
- Qator **shartli yaqinlashadi**, agar $\\sum a_n$ yaqinlashsa, lekin $\\sum |a_n|$ yaqinlashmasa

### Teorema:
Absolut yaqinlashuvchi qator yaqinlashadi.

### Riman teoremasi:
Shartli yaqinlashuvchi qatorda hadlarni qayta joylashtirish orqali qator yig'indisini ixtiyoriy songa aylantirish mumkin!

## 8. Ko'paytma va Koshi ko'paytmasi

### Qatorlar ko'paytmasi:
Agar $\\sum a_n = A$ va $\\sum b_n = B$ absolut yaqinlashsa:

$$\\left(\\sum a_n\\right)\\left(\\sum b_n\\right) = \\sum c_n = AB$$

bu yerda $c_n = \\sum_{k=0}^{n} a_k b_{n-k}$ (Koshi ko'paytmasi)

## 9. Misollar

**Misol 1:** $\\sum_{n=1}^{\\infty} \\frac{1}{n^2+n}$

$$\\frac{1}{n^2+n} = \\frac{1}{n(n+1)} = \\frac{1}{n} - \\frac{1}{n+1}$$

$$S_n = \\left(1 - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) + ... = 1 - \\frac{1}{n+1}$$

$$S = \\lim_{n \\to \\infty} S_n = 1$$

**Misol 2:** $\\sum_{n=1}^{\\infty} \\frac{2^n + 3^n}{6^n}$

$$= \\sum \\left(\\frac{1}{3}\\right)^n + \\sum \\left(\\frac{1}{2}\\right)^n = \\frac{1/3}{1-1/3} + \\frac{1/2}{1-1/2} = \\frac{1}{2} + 1 = \\frac{3}{2}$$

**Misol 3:** $\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n^2}$ — absolut yaqinlashadimi?

$\\sum \\frac{1}{n^2}$ yaqinlashadi ($p = 2 > 1$).

Demak, qator **absolut yaqinlashadi**.
` 
  },
  { 
    id: "M14", 
    title: "Qatorlarning yaqinlashish alomatlari", 
    description: "Dalamber alomati, Koshi alomatlari.", 
    content: `# Qatorlarning Yaqinlashish Alomatlari

## 1. Solishtirish alomati

### Birinchi shakli:
Agar $0 \\leq a_n \\leq b_n$ barcha $n \\geq N$ uchun:

- $\\sum b_n$ yaqinlashsa → $\\sum a_n$ **yaqinlashadi**
- $\\sum a_n$ yaqinlashmasa → $\\sum b_n$ **yaqinlashmaydi**

### Limitli shakli:
$$L = \\lim_{n \\to \\infty} \\frac{a_n}{b_n}$$

| $L$ qiymati | Natija |
|-------------|--------|
| $0 < L < \\infty$ | Qatorlar bir xil xulq-atvorda |
| $L = 0$ | $\\sum b_n$ yaqinlashsa → $\\sum a_n$ yaqinlashadi |
| $L = \\infty$ | $\\sum b_n$ yaqinlashmasa → $\\sum a_n$ yaqinlashmaydi |

### Etalon qatorlar:
- $\\sum \\frac{1}{n^p}$: $p > 1$ — yaqinlashadi, $p \\leq 1$ — yaqinlashmaydi
- $\\sum q^n$: $|q| < 1$ — yaqinlashadi, $|q| \\geq 1$ — yaqinlashmaydi

## 2. Dalamber alomati (nisba alomati)

$$D = \\lim_{n \\to \\infty} \\left| \\frac{a_{n+1}}{a_n} \\right|$$

| $D$ qiymati | Natija |
|-------------|--------|
| $D < 1$ | Qator **absolut yaqinlashadi** |
| $D > 1$ | Qator **yaqinlashmaydi** |
| $D = 1$ | Alomat **javob bermaydi** |

### Kuchaytirilgan shakli:
$$\\underline{D} = \\liminf \\left| \\frac{a_{n+1}}{a_n} \\right|, \\quad \\overline{D} = \\limsup \\left| \\frac{a_{n+1}}{a_n} \\right|$$

- $\\overline{D} < 1$ → yaqinlashadi
- $\\underline{D} > 1$ → yaqinlashmaydi

### Qo'llanilishi:
Dalamber alomati **faktoriallar va darajalar** qatnashgan qatorlar uchun qulay.

## 3. Koshi alomati (ildiz alomati)

$$K = \\lim_{n \\to \\infty} \\sqrt[n]{|a_n|}$$

| $K$ qiymati | Natija |
|-------------|--------|
| $K < 1$ | Qator **absolut yaqinlashadi** |
| $K > 1$ | Qator **yaqinlashmaydi** |
| $K = 1$ | Alomat **javob bermaydi** |

### Kuchaytirilgan shakli (Koshi-Adamar):
$$\\overline{K} = \\limsup \\sqrt[n]{|a_n|}$$

- $\\overline{K} < 1$ → yaqinlashadi
- $\\overline{K} > 1$ → yaqinlashmaydi

### Qo'llanilishi:
Koshi alomati **$n$-darajalar** qatnashgan qatorlar uchun qulay.

### Muhim tengsizlik:
$$\\underline{D} \\leq \\underline{K} \\leq \\overline{K} \\leq \\overline{D}$$

Shuning uchun Koshi alomati Dalamber alomatidan "kuchli".

## 4. Integral alomati (Makloren-Koshi)

Agar $f(x) \\geq 0$, monoton kamayuvchi va $f(n) = a_n$:

$$\\sum_{n=1}^{\\infty} a_n \\text{ va } \\int_1^{\\infty} f(x)dx$$

**bir vaqtda yaqinlashadi** yoki **bir vaqtda yaqinlashmaydi**.

### Baholash:
$$\\int_1^{\\infty} f(x)dx \\leq \\sum_{n=1}^{\\infty} a_n \\leq a_1 + \\int_1^{\\infty} f(x)dx$$

### Misol:
$\\sum \\frac{1}{n \\ln n}$ ($n \\geq 2$)

$\\int_2^{\\infty} \\frac{dx}{x \\ln x} = \\ln(\\ln x) \\Big|_2^{\\infty} = \\infty$

Qator **yaqinlashmaydi**.

## 5. Raabe alomati

$$R = \\lim_{n \\to \\infty} n\\left(\\frac{a_n}{a_{n+1}} - 1\\right) = \\lim_{n \\to \\infty} n\\left(1 - \\frac{a_{n+1}}{a_n}\\right)$$

| $R$ qiymati | Natija |
|-------------|--------|
| $R > 1$ | Qator **yaqinlashadi** |
| $R < 1$ | Qator **yaqinlashmaydi** |
| $R = 1$ | Alomat **javob bermaydi** |

### Qo'llanilishi:
Dalamber alomati $D = 1$ bo'lganda Raabe alomati ishlatiladi.

## 6. Kummer alomati

$c_n > 0$ bo'lsin.

$$K = \\lim_{n \\to \\infty} \\left( c_n \\frac{a_n}{a_{n+1}} - c_{n+1} \\right)$$

| $K$ qiymati | Natija |
|-------------|--------|
| $K > 0$ | Qator **yaqinlashadi** |
| $K < 0$ va $\\sum 1/c_n$ yaqinlashmasa | Qator **yaqinlashmaydi** |

### Maxsus holatlar:
- $c_n = 1$ → Dalamber alomati
- $c_n = n$ → Raabe alomati

## 7. Gauss alomati

$$\\frac{a_n}{a_{n+1}} = 1 + \\frac{\\lambda}{n} + \\frac{\\theta_n}{n^{1+\\varepsilon}}$$

bu yerda $|\\theta_n| \\leq M$, $\\varepsilon > 0$.

| $\\lambda$ qiymati | Natija |
|-------------------|--------|
| $\\lambda > 1$ | Qator **yaqinlashadi** |
| $\\lambda \\leq 1$ | Qator **yaqinlashmaydi** |

## 8. Bertran alomati

$$B = \\lim_{n \\to \\infty} \\ln n \\left[ n\\left(\\frac{a_n}{a_{n+1}} - 1\\right) - 1 \\right]$$

| $B$ qiymati | Natija |
|-------------|--------|
| $B > 1$ | Qator **yaqinlashadi** |
| $B < 1$ | Qator **yaqinlashmaydi** |

## 9. Misollar

**Misol 1 (Dalamber):** $\\sum \\frac{n!}{n^n}$

$$D = \\lim \\frac{(n+1)!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{n!} = \\lim \\frac{(n+1)n^n}{(n+1)^{n+1}} = \\lim \\left(\\frac{n}{n+1}\\right)^n = \\frac{1}{e} < 1$$

**Yaqinlashadi!**

**Misol 2 (Koshi):** $\\sum \\left(\\frac{n}{2n+1}\\right)^n$

$$K = \\lim \\frac{n}{2n+1} = \\frac{1}{2} < 1$$

**Yaqinlashadi!**

**Misol 3 (Integral):** $\\sum \\frac{1}{n^2 + 1}$

$\\int_1^{\\infty} \\frac{dx}{x^2+1} = \\arctan x \\Big|_1^{\\infty} = \\frac{\\pi}{2} - \\frac{\\pi}{4} = \\frac{\\pi}{4}$

**Yaqinlashadi!**

**Misol 4 (Raabe):** $\\sum \\frac{1 \\cdot 3 \\cdot 5 \\cdot ... \\cdot (2n-1)}{2 \\cdot 4 \\cdot 6 \\cdot ... \\cdot 2n}$

$D = \\lim \\frac{2n}{2n+1} = 1$ (Dalamber javob bermaydi)

$R = \\lim n\\left(\\frac{2n+1}{2n} - 1\\right) = \\lim \\frac{n}{2n} = \\frac{1}{2} < 1$

**Yaqinlashmaydi!**
` 
  },
  { 
    id: "M15", 
    title: "Funksional qatorlar", 
    description: "Funksional qatorlar, darajali qatorlar.", 
    content: `# Funksional Qatorlar

## 1. Asosiy tushunchalar

### Ta'rif:
**Funksional qator:**

$$\\sum_{n=1}^{\\infty} u_n(x) = u_1(x) + u_2(x) + u_3(x) + ...$$

### Yaqinlashish sohasi:
Qator yaqinlashadigan $x$ qiymatlar to'plami.

### Yig'indi funksiya:
$$S(x) = \\sum_{n=1}^{\\infty} u_n(x)$$

### Qoldiq:
$$r_n(x) = S(x) - S_n(x) = \\sum_{k=n+1}^{\\infty} u_k(x)$$

## 2. Yaqinlashish turlari

### Nuqtaviy yaqinlashish:
Har bir $x_0 \\in E$ uchun:
$$\\forall \\varepsilon > 0, \\exists N(\\varepsilon, x_0): n > N \\Rightarrow |S_n(x_0) - S(x_0)| < \\varepsilon$$

### Tekis yaqinlashish:
$$\\forall \\varepsilon > 0, \\exists N(\\varepsilon): \\forall n > N, \\forall x \\in E: |S_n(x) - S(x)| < \\varepsilon$$

Ekvivalent shart:
$$\\lim_{n \\to \\infty} \\sup_{x \\in E} |r_n(x)| = 0$$

## 3. Tekis yaqinlashish alomatlari

### Veyershtrass alomati (M-test):
Agar $|u_n(x)| \\leq M_n$ barcha $x \\in E$ uchun va $\\sum M_n$ yaqinlashsa, funksional qator **tekis va absolut yaqinlashadi**.

### Dirixle alomati:
Agar:
1. $\\sum a_n(x)$ qisman yig'indilari tekis chegaralangan
2. $b_n(x)$ monoton $b_n(x) \\to 0$ tekis

U holda $\\sum a_n(x)b_n(x)$ tekis yaqinlashadi.

### Abel alomati:
Agar:
1. $\\sum a_n(x)$ tekis yaqinlashadi
2. $b_n(x)$ monoton va tekis chegaralangan

U holda $\\sum a_n(x)b_n(x)$ tekis yaqinlashadi.

## 4. Tekis yaqinlashish xossalari

### Uzluksizlik teoremasi:
Agar $u_n(x)$ uzluksiz va $\\sum u_n(x)$ tekis yaqinlashsa, yig'indi funksiya $S(x)$ ham **uzluksiz**.

### Hadma-had integrallash:
Agar $\\sum u_n(x)$ $[a, b]$ da tekis yaqinlashsa:
$$\\int_a^b S(x)dx = \\sum_{n=1}^{\\infty} \\int_a^b u_n(x)dx$$

### Hadma-had differensiallash:
Agar:
1. $\\sum u_n(x)$ nuqtaviy yaqinlashadi
2. $u_n(x)$ differensiallanuvchi
3. $\\sum u_n'(x)$ tekis yaqinlashadi

U holda:
$$S'(x) = \\sum_{n=1}^{\\infty} u_n'(x)$$

## 5. Darajali qatorlar

### Ta'rif:
$$\\sum_{n=0}^{\\infty} a_n(x-x_0)^n = a_0 + a_1(x-x_0) + a_2(x-x_0)^2 + ...$$

### Yaqinlashish radiusi:

**Koshi-Adamar formulasi:**
$$R = \\frac{1}{\\limsup \\sqrt[n]{|a_n|}}$$

**Dalamber formulasi:**
$$R = \\lim_{n \\to \\infty} \\left| \\frac{a_n}{a_{n+1}} \\right|$$

### Yaqinlashish oralig'i:
$(x_0 - R, x_0 + R)$

Chegaralarda alohida tekshiriladi.

| $R$ qiymati | Yaqinlashish |
|-------------|--------------|
| $R = 0$ | Faqat $x = x_0$ da |
| $R = \\infty$ | Hamma joyda |
| $0 < R < \\infty$ | $(x_0 - R, x_0 + R)$ ichida |

## 6. Darajali qator xossalari

### Abel teoremasi:
Agar $\\sum a_n c^n$ yaqinlashsa, qator $|x| < |c|$ da absolut yaqinlashadi.

### Tekis yaqinlashish:
Darajali qator $[x_0 - r, x_0 + r]$ ($r < R$) da tekis yaqinlashadi.

### Yig'indi funksiyaning uzluksizligi:
Yaqinlashish oralig'ida yig'indi funksiya uzluksiz.

### Hadma-had integrallash va differensiallash:
Yaqinlashish radiusi saqlanadi:

$$\\int_0^x S(t)dt = \\sum_{n=0}^{\\infty} \\frac{a_n}{n+1}x^{n+1}$$

$$S'(x) = \\sum_{n=1}^{\\infty} n a_n x^{n-1}$$

## 7. Asosiy darajali qatorlar

$$e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + ... \\quad (R = \\infty)$$

$$\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - ... \\quad (R = \\infty)$$

$$\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - ... \\quad (R = \\infty)$$

$$\\ln(1+x) = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^n}{n} = x - \\frac{x^2}{2} + \\frac{x^3}{3} - ... \\quad (R = 1)$$

$$\\frac{1}{1-x} = \\sum_{n=0}^{\\infty} x^n = 1 + x + x^2 + ... \\quad (R = 1)$$

$$\\frac{1}{1+x} = \\sum_{n=0}^{\\infty} (-1)^n x^n = 1 - x + x^2 - ... \\quad (R = 1)$$

$$\\arctan x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{2n+1} = x - \\frac{x^3}{3} + \\frac{x^5}{5} - ... \\quad (R = 1)$$

$$(1+x)^\\alpha = \\sum_{n=0}^{\\infty} \\binom{\\alpha}{n} x^n \\quad (R = 1)$$

bu yerda $\\binom{\\alpha}{n} = \\frac{\\alpha(\\alpha-1)...(\\alpha-n+1)}{n!}$

## 8. Misollar

**Misol 1:** $\\sum_{n=1}^{\\infty} \\frac{x^n}{n}$ yaqinlashish radiusi:

$$R = \\lim \\frac{1/n}{1/(n+1)} = \\lim \\frac{n+1}{n} = 1$$

$x = 1$: $\\sum \\frac{1}{n}$ — yaqinlashmaydi

$x = -1$: $\\sum \\frac{(-1)^n}{n}$ — yaqinlashadi

**Yaqinlashish sohasi:** $[-1, 1)$

**Misol 2:** $\\sum_{n=0}^{\\infty} n! x^n$

$$R = \\lim \\frac{n!}{(n+1)!} = \\lim \\frac{1}{n+1} = 0$$

Faqat $x = 0$ da yaqinlashadi.

**Misol 3:** $\\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$

$$R = \\lim \\frac{n!}{(n+1)!} \\cdot \\frac{n+1}{1} = \\lim (n+1) \\cdot \\frac{1}{n+1} = \\infty$$

Hamma joyda yaqinlashadi (bu $e^x$).
` 
  },
  { 
    id: "M16", 
    title: "Teylor va Fure qatorlari", 
    description: "Funksiyalarni Teylor va Makloren qatorlariga yoyish.", 
    content: `# Teylor va Fure Qatorlari

## 1. Teylor formulasi

### Ta'rif:
$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(x_0)}{n!}(x-x_0)^n$$

### Teylor qoldig'i:
**Lagranj shakli:**
$$R_n(x) = \\frac{f^{(n+1)}(\\xi)}{(n+1)!}(x-x_0)^{n+1}$$

bu yerda $\\xi$ — $x$ va $x_0$ orasida.

**Koshi shakli:**
$$R_n(x) = \\frac{f^{(n+1)}(\\xi)}{n!}(x-\\xi)^n(x-x_0)$$

### Yaqinlashish sharti:
$$\\lim_{n \\to \\infty} R_n(x) = 0$$

## 2. Makloren qatori ($x_0 = 0$)

$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(0)}{n!}x^n = f(0) + f'(0)x + \\frac{f''(0)}{2!}x^2 + ...$$

## 3. Asosiy Makloren qatorlari

### Eksponensial va trigonometrik:

$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + ... = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!} \\quad (R = \\infty)$$

$$\\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - ... = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!} \\quad (R = \\infty)$$

$$\\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - ... = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!} \\quad (R = \\infty)$$

$$\\sinh x = x + \\frac{x^3}{3!} + \\frac{x^5}{5!} + ... = \\sum_{n=0}^{\\infty} \\frac{x^{2n+1}}{(2n+1)!} \\quad (R = \\infty)$$

$$\\cosh x = 1 + \\frac{x^2}{2!} + \\frac{x^4}{4!} + ... = \\sum_{n=0}^{\\infty} \\frac{x^{2n}}{(2n)!} \\quad (R = \\infty)$$

### Logarifmik va ratsional:

$$\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - ... = \\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1} x^n}{n} \\quad (-1 < x \\leq 1)$$

$$\\ln(1-x) = -x - \\frac{x^2}{2} - \\frac{x^3}{3} - ... = -\\sum_{n=1}^{\\infty} \\frac{x^n}{n} \\quad (-1 \\leq x < 1)$$

$$\\frac{1}{1-x} = 1 + x + x^2 + x^3 + ... = \\sum_{n=0}^{\\infty} x^n \\quad (|x| < 1)$$

$$\\frac{1}{1+x} = 1 - x + x^2 - x^3 + ... = \\sum_{n=0}^{\\infty} (-1)^n x^n \\quad (|x| < 1)$$

$$\\frac{1}{(1-x)^2} = 1 + 2x + 3x^2 + ... = \\sum_{n=1}^{\\infty} nx^{n-1} \\quad (|x| < 1)$$

### Teskari trigonometrik:

$$\\arctan x = x - \\frac{x^3}{3} + \\frac{x^5}{5} - ... = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{2n+1} \\quad (|x| \\leq 1)$$

$$\\arcsin x = x + \\frac{x^3}{6} + \\frac{3x^5}{40} + ... \\quad (|x| \\leq 1)$$

### Binomial qator:

$$(1+x)^\\alpha = 1 + \\alpha x + \\frac{\\alpha(\\alpha-1)}{2!}x^2 + \\frac{\\alpha(\\alpha-1)(\\alpha-2)}{3!}x^3 + ...$$

Maxsus holatlar:
- $\\sqrt{1+x} = 1 + \\frac{x}{2} - \\frac{x^2}{8} + \\frac{x^3}{16} - ...$
- $\\frac{1}{\\sqrt{1+x}} = 1 - \\frac{x}{2} + \\frac{3x^2}{8} - ...$

## 4. Fure qatori

### Ta'rif:
$f(x)$ funksiya $[-\\pi, \\pi]$ oraliqda:

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} (a_n \\cos nx + b_n \\sin nx)$$

### Fure koeffitsientlari:

$$a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) dx$$

$$a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) dx$$

$$b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) dx$$

### Kompleks shakli:

$$f(x) = \\sum_{n=-\\infty}^{\\infty} c_n e^{inx}$$

$$c_n = \\frac{1}{2\\pi} \\int_{-\\pi}^{\\pi} f(x) e^{-inx} dx$$

## 5. Juft va toq funksiyalar

### Juft funksiya ($f(-x) = f(x)$):
$b_n = 0$ (faqat kosinuslar)

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} a_n \\cos nx$$

$$a_n = \\frac{2}{\\pi} \\int_0^{\\pi} f(x) \\cos(nx) dx$$

### Toq funksiya ($f(-x) = -f(x)$):
$a_n = 0$ (faqat sinuslar)

$$f(x) = \\sum_{n=1}^{\\infty} b_n \\sin nx$$

$$b_n = \\frac{2}{\\pi} \\int_0^{\\pi} f(x) \\sin(nx) dx$$

## 6. Ixtiyoriy oraliq $[-L, L]$

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left(a_n \\cos\\frac{\\pi nx}{L} + b_n \\sin\\frac{\\pi nx}{L}\\right)$$

$$a_n = \\frac{1}{L} \\int_{-L}^{L} f(x) \\cos\\frac{\\pi nx}{L} dx$$

$$b_n = \\frac{1}{L} \\int_{-L}^{L} f(x) \\sin\\frac{\\pi nx}{L} dx$$

## 7. Parseval tengligsi

$$\\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} [f(x)]^2 dx = \\frac{a_0^2}{2} + \\sum_{n=1}^{\\infty} (a_n^2 + b_n^2)$$

### Qo'llanilishi:
Qatorlar yig'indisini hisoblash:

$f(x) = x$ uchun: $\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$

## 8. Yaqinlashish teoremalari

### Dirixle sharti:
Agar $f(x)$ bo'lakli monoton va chegaralangan bo'lsa, Fure qatori:
$$\\frac{f(x+0) + f(x-0)}{2}$$

ga yaqinlashadi.

### Tekis yaqinlashish:
Agar $f(x)$ uzluksiz va $f(-\\pi) = f(\\pi)$ bo'lsa, Fure qatori tekis yaqinlashadi.

## 9. Misollar

**Misol 1:** $f(x) = x$ ni $[-\\pi, \\pi]$ da Fure qatoriga yoying.

$f(x)$ toq funksiya → $a_n = 0$

$$b_n = \\frac{2}{\\pi} \\int_0^{\\pi} x \\sin(nx) dx = \\frac{2(-1)^{n+1}}{n}$$

$$x = 2\\sum_{n=1}^{\\infty} \\frac{(-1)^{n+1}}{n} \\sin nx = 2\\left(\\sin x - \\frac{\\sin 2x}{2} + \\frac{\\sin 3x}{3} - ...\\right)$$

**Misol 2:** $f(x) = |x|$ ni $[-\\pi, \\pi]$ da Fure qatoriga yoying.

$f(x)$ juft funksiya → $b_n = 0$

$$a_0 = \\frac{2}{\\pi} \\int_0^{\\pi} x \\, dx = \\pi$$

$$a_n = \\frac{2}{\\pi} \\int_0^{\\pi} x \\cos(nx) dx = \\frac{2((-1)^n - 1)}{\\pi n^2}$$

$$|x| = \\frac{\\pi}{2} - \\frac{4}{\\pi}\\left(\\cos x + \\frac{\\cos 3x}{9} + \\frac{\\cos 5x}{25} + ...\\right)$$

$x = 0$ qo'ysak: $\\sum_{n=0}^{\\infty} \\frac{1}{(2n+1)^2} = \\frac{\\pi^2}{8}$
` 
  },
  { 
    id: "M17", 
    title: "Ikki o'lchovli integral", 
    description: "Ikki o'lchovli integral, xossalari.", 
    content: `# Ikki O'lchovli Integral

## 1. Ta'rif (Riman integrali)

$$\\iint_D f(x, y) dA = \\lim_{\\|P\\| \\to 0} \\sum_{i=1}^{n} f(x_i, y_i) \\Delta A_i$$

bu yerda $\\|P\\|$ — bo'linishning diametri, $\\Delta A_i$ — maydonchalar yuzasi.

## 2. Xossalari

### Chiziqlilik:
$$\\iint_D [\\alpha f + \\beta g] dA = \\alpha \\iint_D f \\, dA + \\beta \\iint_D g \\, dA$$

### Qo'shimchalik:
$$\\iint_{D_1 \\cup D_2} f \\, dA = \\iint_{D_1} f \\, dA + \\iint_{D_2} f \\, dA$$

($D_1 \\cap D_2$ — nol o'lchovli)

### Baholash:
Agar $m \\leq f(x,y) \\leq M$ $D$ da:
$$m \\cdot S(D) \\leq \\iint_D f \\, dA \\leq M \\cdot S(D)$$

### O'rtacha qiymat teoremasi:
$$\\iint_D f \\, dA = f(\\xi, \\eta) \\cdot S(D)$$
bu yerda $(\\xi, \\eta) \\in D$

## 3. Hisoblash (Dekart koordinatalarida)

### I tur sohasi:
$D$: $a \\leq x \\leq b$, $\\varphi_1(x) \\leq y \\leq \\varphi_2(x)$

$$\\iint_D f(x,y) dA = \\int_a^b dx \\int_{\\varphi_1(x)}^{\\varphi_2(x)} f(x,y) dy$$

### II tur sohasi:
$D$: $c \\leq y \\leq d$, $\\psi_1(y) \\leq x \\leq \\psi_2(y)$

$$\\iint_D f(x,y) dA = \\int_c^d dy \\int_{\\psi_1(y)}^{\\psi_2(y)} f(x,y) dx$$

### Integrallash tartibini o'zgartirish:
$$\\int_a^b dx \\int_{\\varphi_1(x)}^{\\varphi_2(x)} f(x,y) dy = \\int_c^d dy \\int_{\\psi_1(y)}^{\\psi_2(y)} f(x,y) dx$$

## 4. Qutb koordinatalarida

### O'tish formulalari:
$x = r\\cos\\theta$, $y = r\\sin\\theta$

$$dA = r \\, dr \\, d\\theta$$

### Hisoblash:
$$\\iint_D f(x,y) dA = \\iint_{D'} f(r\\cos\\theta, r\\sin\\theta) \\cdot r \\, dr \\, d\\theta$$

### Tipik sohalar:

**Doira:** $D$: $x^2 + y^2 \\leq R^2$
$$\\iint_D f \\, dA = \\int_0^{2\\pi} d\\theta \\int_0^R f(r\\cos\\theta, r\\sin\\theta) \\cdot r \\, dr$$

**Halqa:** $D$: $r_1 \\leq \\sqrt{x^2+y^2} \\leq r_2$
$$\\iint_D f \\, dA = \\int_0^{2\\pi} d\\theta \\int_{r_1}^{r_2} f \\cdot r \\, dr$$

**Sektor:** $D$: $0 \\leq r \\leq R$, $\\alpha \\leq \\theta \\leq \\beta$
$$\\iint_D f \\, dA = \\int_{\\alpha}^{\\beta} d\\theta \\int_0^R f \\cdot r \\, dr$$

## 5. O'zgaruvchilarni almashtirish

$x = x(u,v)$, $y = y(u,v)$ bo'lsa:

$$\\iint_D f(x,y) dx \\, dy = \\iint_{D'} f(x(u,v), y(u,v)) |J| \\, du \\, dv$$

### Yakobian:
$$J = \\frac{\\partial(x,y)}{\\partial(u,v)} = \\begin{vmatrix} \\frac{\\partial x}{\\partial u} & \\frac{\\partial x}{\\partial v} \\\\ \\frac{\\partial y}{\\partial u} & \\frac{\\partial y}{\\partial v} \\end{vmatrix} = x_u y_v - x_v y_u$$

### Muhim almashtirish:
**Qutb:** $J = r$

**Elliptik:** $x = a\\rho\\cos\\theta$, $y = b\\rho\\sin\\theta$ → $J = ab\\rho$

## 6. Geometrik tadbiqlari

### Yuza:
$$S(D) = \\iint_D dA = \\iint_D dx \\, dy$$

### Sirt yuzasi:
$z = f(x,y)$ sirti uchun:
$$S = \\iint_D \\sqrt{1 + f_x^2 + f_y^2} \\, dA$$

### Hajm:
$z = f(x,y) \\geq 0$ ostidagi jism hajmi:
$$V = \\iint_D f(x,y) dA$$

Ikki sirt orasidagi hajm:
$$V = \\iint_D |f(x,y) - g(x,y)| dA$$

## 7. Fizik tadbiqlari

### Massa:
$$m = \\iint_D \\rho(x,y) dA$$

### Statik momentlar:
$$M_x = \\iint_D y \\cdot \\rho \\, dA, \\quad M_y = \\iint_D x \\cdot \\rho \\, dA$$

### Massa markazi:
$$\\bar{x} = \\frac{M_y}{m}, \\quad \\bar{y} = \\frac{M_x}{m}$$

### Inersiya momentlari:
$$I_x = \\iint_D y^2 \\rho \\, dA, \\quad I_y = \\iint_D x^2 \\rho \\, dA$$

$$I_0 = \\iint_D (x^2 + y^2) \\rho \\, dA = I_x + I_y$$

## 8. Misollar

**Misol 1:** $\\iint_D xy \\, dA$, $D$: uchburchak $x \\geq 0$, $y \\geq 0$, $x + y \\leq 1$

$$= \\int_0^1 dx \\int_0^{1-x} xy \\, dy = \\int_0^1 x \\cdot \\frac{y^2}{2} \\Big|_0^{1-x} dx$$

$$= \\int_0^1 \\frac{x(1-x)^2}{2} dx = \\frac{1}{2}\\int_0^1 (x - 2x^2 + x^3) dx$$

$$= \\frac{1}{2}\\left(\\frac{1}{2} - \\frac{2}{3} + \\frac{1}{4}\\right) = \\frac{1}{2} \\cdot \\frac{1}{12} = \\frac{1}{24}$$

**Misol 2:** Doira yuzasi $x^2 + y^2 \\leq R^2$

Qutb koordinatalarida:
$$S = \\int_0^{2\\pi} d\\theta \\int_0^R r \\, dr = 2\\pi \\cdot \\frac{R^2}{2} = \\pi R^2$$

**Misol 3:** $\\iint_D e^{x^2+y^2} dA$, $D$: $x^2 + y^2 \\leq 1$

$$= \\int_0^{2\\pi} d\\theta \\int_0^1 e^{r^2} \\cdot r \\, dr = 2\\pi \\cdot \\frac{e^{r^2}}{2}\\Big|_0^1 = \\pi(e - 1)$$

**Misol 4:** $z = 1 - x^2 - y^2$ paraboloid va $z = 0$ tekislik orasidagi jism hajmi

$D$: $x^2 + y^2 \\leq 1$

$$V = \\iint_D (1 - x^2 - y^2) dA = \\int_0^{2\\pi} d\\theta \\int_0^1 (1-r^2) \\cdot r \\, dr$$

$$= 2\\pi \\int_0^1 (r - r^3) dr = 2\\pi \\left(\\frac{1}{2} - \\frac{1}{4}\\right) = \\frac{\\pi}{2}$$
` 
  },
  { 
    id: "M18", 
    title: "Uch o'lchovli integral", 
    description: "Uch o'lchovli integral va tadbiqlari.", 
    content: `# Uch O'lchovli Integral

## 1. Ta'rif

$$\\iiint_V f(x, y, z) dV = \\lim_{\\|P\\| \\to 0} \\sum_{i=1}^{n} f(x_i, y_i, z_i) \\Delta V_i$$

## 2. Xossalari

### Chiziqlilik:
$$\\iiint_V [\\alpha f + \\beta g] dV = \\alpha \\iiint_V f \\, dV + \\beta \\iiint_V g \\, dV$$

### Qo'shimchalik:
$$\\iiint_{V_1 \\cup V_2} f \\, dV = \\iiint_{V_1} f \\, dV + \\iiint_{V_2} f \\, dV$$

### Baholash:
$$m \\cdot \\text{Vol}(V) \\leq \\iiint_V f \\, dV \\leq M \\cdot \\text{Vol}(V)$$

## 3. Hisoblash (Dekart koordinatalarida)

$$\\iiint_V f \\, dV = \\int_a^b dx \\int_{\\varphi_1(x)}^{\\varphi_2(x)} dy \\int_{\\psi_1(x,y)}^{\\psi_2(x,y)} f(x,y,z) dz$$

### Proyeksiya usuli:
1. $V$ ni $xy$-tekislikka proyeksiyalang ($D$ hosil bo'ladi)
2. Har bir $(x, y) \\in D$ uchun $z$ chegaralarini aniqlang: $z_1(x,y) \\leq z \\leq z_2(x,y)$

$$\\iiint_V f \\, dV = \\iint_D dA \\int_{z_1(x,y)}^{z_2(x,y)} f(x,y,z) dz$$

## 4. Silindirik koordinatalar

### O'tish formulalari:
$x = r\\cos\\theta$, $y = r\\sin\\theta$, $z = z$

$$dV = r \\, dr \\, d\\theta \\, dz$$

### Yakobian:
$$J = r$$

### Qo'llanilishi:
- $z$-o'q atrofida simmetriyaga ega jismlar
- Silindr, konus, paraboloid

### Hisoblash:
$$\\iiint_V f \\, dV = \\iiint f(r\\cos\\theta, r\\sin\\theta, z) \\cdot r \\, dr \\, d\\theta \\, dz$$

## 5. Sferik koordinatalar

### O'tish formulalari:
$x = \\rho\\sin\\phi\\cos\\theta$

$y = \\rho\\sin\\phi\\sin\\theta$

$z = \\rho\\cos\\phi$

### Chegaralar:
- $\\rho \\geq 0$ — markazdan masofa
- $0 \\leq \\phi \\leq \\pi$ — polar burchak ($z$-o'qidan)
- $0 \\leq \\theta < 2\\pi$ — azimut burchak ($xy$-tekislikda)

### Hajm elementi:
$$dV = \\rho^2 \\sin\\phi \\, d\\rho \\, d\\phi \\, d\\theta$$

### Yakobian:
$$J = \\rho^2 \\sin\\phi$$

### Qo'llanilishi:
- Shar va uning qismlari
- Sferik simmetriyaga ega jismlar

## 6. Geometrik tadbiqlari

### Hajm:
$$V = \\iiint_V dV$$

### Shar hajmi:
$$V = \\int_0^{2\\pi} d\\theta \\int_0^{\\pi} \\sin\\phi \\, d\\phi \\int_0^R \\rho^2 d\\rho$$

$$= 2\\pi \\cdot 2 \\cdot \\frac{R^3}{3} = \\frac{4\\pi R^3}{3}$$

### Konus hajmi:
$z^2 = x^2 + y^2$, $0 \\leq z \\leq h$

Silindirik koordinatalarda: $z = r$, $0 \\leq r \\leq h$

$$V = \\int_0^{2\\pi} d\\theta \\int_0^h dz \\int_0^z r \\, dr = 2\\pi \\int_0^h \\frac{z^2}{2} dz = \\frac{\\pi h^3}{3}$$

## 7. Fizik tadbiqlari

### Massa:
$$m = \\iiint_V \\rho(x,y,z) dV$$

### Massa markazi:
$$\\bar{x} = \\frac{1}{m}\\iiint_V x\\rho \\, dV$$

$$\\bar{y} = \\frac{1}{m}\\iiint_V y\\rho \\, dV$$

$$\\bar{z} = \\frac{1}{m}\\iiint_V z\\rho \\, dV$$

### Inersiya momentlari:

**O'qlar atrofida:**
$$I_x = \\iiint_V (y^2 + z^2)\\rho \\, dV$$

$$I_y = \\iiint_V (x^2 + z^2)\\rho \\, dV$$

$$I_z = \\iiint_V (x^2 + y^2)\\rho \\, dV$$

**Koordinata tekisliklari atrofida:**
$$I_{xy} = \\iiint_V z^2 \\rho \\, dV$$

$$I_{xz} = \\iiint_V y^2 \\rho \\, dV$$

$$I_{yz} = \\iiint_V x^2 \\rho \\, dV$$

**Koordinata boshi atrofida:**
$$I_0 = \\iiint_V (x^2 + y^2 + z^2)\\rho \\, dV$$

### Gravitatsiya potensiali:
$$U(P) = G\\iiint_V \\frac{\\rho(x,y,z)}{r} dV$$

bu yerda $r$ — $(x,y,z)$ dan $P$ gacha masofa.

## 8. Koordinata sistemalarini tanlash

| Jism shakli | Qulay koordinatalar |
|-------------|---------------------|
| Kuboid, parallelipiped | Dekart |
| Silindr | Silindirik |
| Shar, yarim shar | Sferik |
| Konus | Silindirik yoki sferik |
| Paraboloid | Silindirik |
| Ellipsoid | O'zgartirilgan sferik |

## 9. Misollar

**Misol 1:** $\\iiint_V z \\, dV$, $V$: silindr $x^2 + y^2 \\leq 1$, $0 \\leq z \\leq 2$

Silindirik koordinatalarda:

$$= \\int_0^{2\\pi} d\\theta \\int_0^1 r \\, dr \\int_0^2 z \\, dz$$

$$= 2\\pi \\cdot \\frac{1}{2} \\cdot 2 = 2\\pi$$

**Misol 2:** Shar hajmi $x^2 + y^2 + z^2 \\leq R^2$

Sferik koordinatalarda:

$$V = \\int_0^{2\\pi} d\\theta \\int_0^{\\pi} \\sin\\phi \\, d\\phi \\int_0^R \\rho^2 d\\rho$$

$$= 2\\pi \\cdot [-\\cos\\phi]_0^{\\pi} \\cdot \\frac{R^3}{3} = 2\\pi \\cdot 2 \\cdot \\frac{R^3}{3} = \\frac{4\\pi R^3}{3}$$

**Misol 3:** $\\iiint_V (x^2+y^2+z^2) dV$, $V$: shar $\\rho \\leq R$

$$= \\int_0^{2\\pi} d\\theta \\int_0^{\\pi} \\sin\\phi \\, d\\phi \\int_0^R \\rho^2 \\cdot \\rho^2 d\\rho$$

$$= 2\\pi \\cdot 2 \\cdot \\frac{R^5}{5} = \\frac{4\\pi R^5}{5}$$

**Misol 4:** Bir jinsli shar ($\\rho = const$) ning $z$-o'q atrofidagi inersiya momenti

$$I_z = \\rho \\iiint_V (x^2+y^2) dV = \\rho \\int_0^{2\\pi} d\\theta \\int_0^{\\pi} \\sin\\phi \\, d\\phi \\int_0^R r^2 \\sin^2\\phi \\cdot r^2 dr$$

Silindirik koordinatalarda hisoblash osonroq:

$$= \\rho \\int_0^{2\\pi} d\\theta \\int_{-R}^{R} dz \\int_0^{\\sqrt{R^2-z^2}} r^2 \\cdot r \\, dr$$

$$= \\frac{2\\pi\\rho}{4} \\int_{-R}^{R} (R^2-z^2)^2 dz = \\frac{8\\pi\\rho R^5}{15} = \\frac{2}{5}mR^2$$

bu yerda $m = \\frac{4\\pi R^3 \\rho}{3}$
` 
  }
];

export const getTopicById = (id: string): MathTopic | undefined => {
  return mathTopics.find(topic => topic.id === id);
};
