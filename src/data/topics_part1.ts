import type { Topic } from "../types";

// Topic 1: int
const intTopic: Topic = {
  id: "int",
  title: "int",
  subtitle: "Butun sonlar (Integer)",
  icon: "🔢",
  accent: "from-sky-500 to-blue-600",
  difficulty: "Beginner",
  intro:
    "Xush kelibsiz! Bugun siz Python'ning eng oddiy, lekin eng muhim data type'ini o'rganasiz — int. Bu soddagina son, lekin har bir dasturda u sizning eng yaqin do'stingiz bo'ladi.",
  definition:
    "`int` (integer) — bu butun son. Ya'ni, kasrsiz son. Masalan: -3, 0, 7, 1000000. Python'da int'ning chekkasi yo'q — istalgancha katta son saqlay olasiz (boshqa tillarda bu imkon yo'q!).",
  analogy:
    "Tasavvur qiling: `int` — bu **pul qutisidagi tangalar soni**. Siz 3 ta tanga, 0 ta tanga yoki 1 million tanga sanashingiz mumkin — lekin hech qachon '3.5 ta tanga' bo'lmaydi. Faqat to'liq sonlar!",
  syntax: `# int yaratishning 4 usuli
x = 10              # oddiy int
y = -500            # manfiy int
z = 1_000_000       # past chiziq bilan o'qish oson
big = int("42")     # string'dan int'ga aylantirish

type(x)   # <class 'int'>`,
  examples: [
    {
      code: `age = 25\nprint(age)\nprint(type(age))`,
      explanation:
        "Bu yerda `age` — int. `type(age)` deb so'rasangiz, Python `<class 'int'>` deb javob beradi. Ya'ni, bu butun son ekanini aytadi.",
    },
    {
      code: `a = 10\nb = 3\nprint(a + b)   # 13\nprint(a / b)   # 3.333... (float!)\nprint(a // b)  # 3 (butun bo'linish)\nprint(a % b)   # 1 (qoldiq)`,
      explanation:
        "Ehtiyot! `a / b` natijasi float bo'ladi, int emas. Butun bo'linish uchun `//` ishlating.",
    },
    {
      code: `price = 99_999\nprint(price)  # 99999`,
      explanation:
        "Python 3.6+ da katta sonlarni o'qish oson bo'lishi uchun `_` ishlatsangiz bo'ladi. Faqat o'qish uchun — qiymatga ta'sir qilmaydi.",
    },
  ],
  lineByLine: [
    { line: "x = 10", explanation: "O'ng tomonda 10 (int) turibdi, uni `x` degan qutiga joyladik." },
    { line: "y = x + 5", explanation: "Avval `x + 5` hisoblanadi (15), keyin natija `y` ga yoziladi." },
    { line: "print(type(x))", explanation: "`type()` funksiyasi x'ning turini ko'rsatadi — `<class 'int'>` chiqadi." },
    { line: "z = int('42')", explanation: "String `'42'` ni int'ga aylantirdik. Agar `'hello'` bersangiz — ValueError chiqadi!" },
  ],
  commonMistakes: [
    {
      mistake: "String ichidagi sonni arifmetikada ishlatish",
      code: `age = "25"\nprint(age + 1)  # TypeError!`,
      why: "`'25'` bu string, `1` bu int. Python ularni qo'shishni bilmaydi — chunki ular har xil turda.",
      fix: `age = int("25")\nprint(age + 1)  # 26 ✓`,
    },
    {
      mistake: "`/` ishlatib int kutish",
      code: `print(10 / 2)  # 5.0 — float!`,
      why: "Python 3 da `/` har doim float qaytaradi. Hatto 10 / 2 ham `5.0` bo'ladi.",
      fix: `print(10 // 2)  # 5 — butun bo'linish`,
    },
    {
      mistake: "O'qib bo'lmaydigan string'ni int'ga aylantirish",
      code: `n = int("hello")  # ValueError`,
      why: "`int()` faqat raqamli string'larni tushunadi. `int('42')` ishlaydi, `int('42a')` ishlamaydi.",
      fix: `try:\n    n = int(user_input)\nexcept ValueError:\n    print("Son kiriting!")`,
    },
  ],
  whereUsed: [
    "Yosh, narx, miqdor — har qanday sanash",
    "Loop'dagi counter (masalan: `for i in range(10)`)",
    "List indexlari (`list[5]`)",
    "Fayllar hajmi, vaqt, masofa",
    "Matematik hisob-kitoblar",
  ],
  exercises: [
    {
      id: "int-1",
      prompt: "Quyidagi kod natijasini bashorat qiling:",
      codeSnippet: "x = 17\ny = 5\nprint(x // y)",
      question: "Nima chiqadi? (faqat son yozing)",
      expected: ["3"],
      hint: "`//` bu butun bo'linish. 17 / 5 = 3.4, butun qismi = 3",
      type: "output",
    },
    {
      id: "int-2",
      prompt: "Qaysi turda?",
      codeSnippet: "x = 10\ny = 10 / 2\nprint(type(y))",
      question: "y ning turi nima? (to'liq yozing, masalan: int yoki float)",
      expected: ["float", "<class 'float'>", "class float"],
      hint: "`/` har doim float qaytaradi, hatto 10 / 2 ham!",
      type: "type",
    },
    {
      id: "int-3",
      prompt: "Xatoni tuzating. Quyidagi kod ishlashi kerak (yig'indisi 30):",
      codeSnippet: 'a = "15"\nb = 15\nprint(a + b)',
      question: "To'g'ri ishlaydigan kodni yozing (print qatorini tuzating)",
      expected: ["print(int(a) + b)", "print(int(a)+b)", "print(b + int(a))"],
      hint: "`a` ni int'ga aylantirish kerak: `int(a)`",
      type: "fix",
    },
    {
      id: "int-4",
      prompt: "Qoldiqni toping:",
      codeSnippet: "print(23 % 7)",
      question: "Natija nima?",
      expected: ["2"],
      hint: "`%` bu qoldiq. 23 = 7×3 + ?",
      type: "output",
    },
  ],
  quiz: [
    {
      id: "int-q1",
      question: "Quyidagilardan qaysi biri int EMAS?",
      options: ["42", "-100", "3.0", "0"],
      correctIndex: 2,
      explanation: "`3.0` — bu float, chunki nuqta bor. Int'da nuqta bo'lmaydi.",
    },
    {
      id: "int-q2",
      question: "`print(7 // 2)` natijasi nima?",
      options: ["3.5", "3", "4", "Error"],
      correctIndex: 1,
      explanation: "`//` butun bo'linish — pastga yaxlitlaydi. 7/2 = 3.5, pastga = 3.",
    },
    {
      id: "int-q3",
      question: "`int('007')` natijasi?",
      options: ["'007'", "7", "Error", "700"],
      correctIndex: 1,
      explanation: "Boshidagi nollar e'tiborga olinmaydi. `007` → `7`.",
    },
    {
      id: "int-q4",
      question: "`type(1_000)` nima qaytaradi?",
      options: ["string", "float", "int", "Error"],
      correctIndex: 2,
      explanation: "`_` faqat o'qish osonligi uchun. Aslida bu oddiy `1000` int.",
    },
  ],
  project: {
    title: "Oddiy Kalkulyator",
    description:
      "Foydalanuvchidan 2 ta son so'rab, ularning yig'indisi, ayirmasi, ko'paytmasi, butun bo'linmasi va qoldig'ini chiqaradigan dastur yozing.",
    tasks: [
      "2 ta int o'zgaruvchi yarating",
      "+, -, *, //, % amallarini ishlating",
      "Har bir natijani chiroyli qilib print qiling",
    ],
    starterCode: `# Kalkulyator\na = 17\nb = 5\n\n# TODO: natijalarni hisoblang\n\nprint("Yig'indi:", ...)\nprint("Ayirma:", ...)\nprint("Ko'paytma:", ...)\nprint("Butun bo'linish:", ...)\nprint("Qoldiq:", ...)`,
    solutionCode: `a = 17\nb = 5\n\nprint("Yig'indi:", a + b)         # 22\nprint("Ayirma:", a - b)           # 12\nprint("Ko'paytma:", a * b)        # 85\nprint("Butun bo'linish:", a // b) # 3\nprint("Qoldiq:", a % b)           # 2`,
    checkPoints: ["a va b o'zgaruvchilar mavjud", "5 ta amal ishlatilgan", "print ishlatilgan"],
  },
  trickyQuestions: [
    {
      question: "Python'da int'ning maksimal qiymati qancha?",
      answer:
        "Chegarasi YO'Q! Boshqa tillarda (Java, C++) int 32 yoki 64 bit. Python'da esa — RAM yetguncha istalgancha katta son saqlaysiz. `10**1000` ham ishlaydi!",
    },
    {
      question: "`-7 // 2` natijasi nima? Kutilgan javob: -3, lekin...",
      answer:
        "Natija: **-4**. Python `//` da pastga (−∞ tomon) yaxlitlaydi. -3.5 pastga = -4. Bu boshqa tillardan farq qiladi!",
      code: "print(-7 // 2)  # -4",
    },
  ],
};

// Topic 2: float
const floatTopic: Topic = {
  id: "float",
  title: "float",
  subtitle: "Kasr sonlar (Floating Point)",
  icon: "🌊",
  accent: "from-cyan-500 to-teal-600",
  difficulty: "Beginner",
  intro:
    "Endi kasr sonlarga o'tamiz! Float — bu nuqtali sonlar. Narx, masofa, foiz, ilmiy hisoblar — hammasi float bilan ishlaydi.",
  definition:
    "`float` (floating point) — bu kasr son. Ya'ni, nuqta bilan yoziladigan son: 3.14, -0.5, 2.0, 1e10.",
  analogy:
    "Tasavvur qiling: `float` — bu **tortida tortiladigan meva**. Siz 1.5 kg olma, 0.250 kg uzum tortishingiz mumkin. Har bir gramm muhim — bu float'ning ishi.",
  syntax: `pi = 3.14159\ntemp = -20.5\nsci = 1.5e10    # 1.5 × 10^10 = 15000000000.0\nzero = 0.0\n\nprint(type(pi))  # <class 'float'>`,
  examples: [
    {
      code: `price = 19.99\nqty = 3\ntotal = price * qty\nprint(total)  # 59.97\nprint(type(total))  # <class 'float'>`,
      explanation: "Narxlar har doim float, chunki tiyin (cents) kerak.",
    },
    {
      code: `# EHTIYOT! Float aniq emas!\nprint(0.1 + 0.2)  # 0.30000000000000004 (!)\nprint(0.1 + 0.2 == 0.3)  # False (!)`,
      explanation:
        "Bu bug emas — bu kompyuter arifmetikasi. Float'lar kompyuterda aniq saqlanmaydi. Shuning uchun taqqoslashda `math.isclose()` ishlatiladi.",
    },
    {
      code: `import math\nprint(math.isclose(0.1 + 0.2, 0.3))  # True ✓`,
      explanation: "`math.isclose()` — float'larni to'g'ri taqqoslash usuli.",
    },
  ],
  lineByLine: [
    { line: "x = 3.14", explanation: "`x` ga float qiymat berildi — kasr son." },
    { line: "y = float(5)", explanation: "int `5` ni float `5.0` ga aylantirdik." },
    { line: "z = 1e3", explanation: "Ilmiy yozuv: 1 × 10³ = 1000.0. Natija float." },
    { line: "print(round(x, 1))", explanation: "`round()` — yaxlitlash. `3.14` → `3.1` (1 ta kasr xonasi)." },
  ],
  commonMistakes: [
    {
      mistake: "`0.1 + 0.2 == 0.3` deb taqqoslash",
      code: `print(0.1 + 0.2 == 0.3)  # False!`,
      why: "Float'lar aniq saqlanmaydi. 0.1 + 0.2 aslida 0.30000000000000004.",
      fix: `import math\nprint(math.isclose(0.1 + 0.2, 0.3))  # True`,
    },
    {
      mistake: "Float'ni int'ga aylantirganda yaxlitlanadi deb o'ylash",
      code: `print(int(3.9))  # 3 (truncation, yaxlitlash EMAS)`,
      why: "`int()` faqat kasr qismini kesib tashlaydi, yaxlitlamaydi.",
      fix: `print(round(3.9))  # 4 ✓ (yaxlitlash)`,
    },
  ],
  whereUsed: [
    "Narxlar va pul (19.99 $)",
    "Temperatura (36.6°)",
    "Foiz hisoblash (0.085)",
    "Ilmiy hisoblar, muhandislik",
    "Grafika va koordinatalar (x=10.5, y=20.3)",
  ],
  exercises: [
    {
      id: "float-1",
      prompt: "Natijani bashorat qiling:",
      codeSnippet: "print(0.1 + 0.2 == 0.3)",
      question: "Natija nima? (True yoki False)",
      expected: ["false"],
      hint: "Float'lar aniq emas! 0.1 + 0.2 = 0.30000000000000004",
      type: "output",
    },
    {
      id: "float-2",
      prompt: "Yaxlitlang:",
      codeSnippet: "x = 3.75\nprint(round(x, 1))",
      question: "Natija?",
      expected: ["3.8"],
      hint: "`round(x, 1)` — 1 ta kasr xonasi. 3.75 → 3.8",
      type: "output",
    },
    {
      id: "float-3",
      prompt: "Nima chiqadi?",
      codeSnippet: "print(int(9.99))",
      question: "Natija?",
      expected: ["9"],
      hint: "`int()` yaxlitlamaydi — faqat kesadi!",
      type: "output",
    },
  ],
  quiz: [
    {
      id: "fl-q1",
      question: "`type(5.0)` nima qaytaradi?",
      options: ["int", "float", "string", "number"],
      correctIndex: 1,
      explanation: "Nuqta bor → float. Hatto `5.0` ham float, chunki kasr qismi bor.",
    },
    {
      id: "fl-q2",
      question: "`print(2 / 2)` natijasi?",
      options: ["1", "1.0", "Error", "0.5"],
      correctIndex: 1,
      explanation: "`/` har doim float qaytaradi. `1.0` chiqadi.",
    },
    {
      id: "fl-q3",
      question: "Float'larni to'g'ri taqqoslash uchun nima ishlatish kerak?",
      options: ["==", "is", "math.isclose()", "equals()"],
      correctIndex: 2,
      explanation: "`math.isclose()` float'larning yaqinligini tekshiradi.",
    },
  ],
  project: {
    title: "BMI Kalkulyator",
    description: "Bo'y (metr) va vazn (kg) dan BMI (Body Mass Index) ni hisoblang: BMI = vazn / (bo'y * bo'y)",
    tasks: [
      "vazn va boy float o'zgaruvchilarini yarating",
      "BMI ni hisoblang",
      "Natijani 1 kasr xonasigacha yaxlitlang",
    ],
    starterCode: `vazn = 70.5  # kg\nboy = 1.75   # metr\n\n# TODO: BMI ni hisoblang\nbmi = ...\n\n# TODO: yaxlitlab print qiling\nprint(...)`,
    solutionCode: `vazn = 70.5\nboy = 1.75\nbmi = vazn / (boy * boy)\nprint("BMI:", round(bmi, 1))  # 23.0`,
    checkPoints: ["BMI formula to'g'ri", "round() ishlatilgan", "float natija chiqqan"],
  },
  trickyQuestions: [
    {
      question: "Nima uchun 0.1 + 0.2 == 0.3 False?",
      answer:
        "Kompyuterlar float'larni **binary** (2 asosli) sistemada saqlaydi. 0.1 ni binary'da aniq ifodalab bo'lmaydi — shuning uchun kichik xatolar paydo bo'ladi. Bu Python'ning emas, barcha tillarning muammosi (IEEE 754 standarti).",
    },
  ],
};

// Topic 3: string
const stringTopic: Topic = {
  id: "string",
  title: "str",
  subtitle: "Matnlar (String)",
  icon: "📝",
  accent: "from-amber-500 to-orange-600",
  difficulty: "Beginner",
  intro:
    "String — bu matn. Dasturlashning 50%+ vaqti matn bilan ishlaydi: ism, xabar, fayl nomi, URL — hammasi string!",
  definition:
    "`str` (string) — bu harflar, raqamlar va belgilardan tashkil topgan matn. Qo'shtirnoq (' yoki \") ichiga olinadi.",
  analogy:
    "String — bu **munchoqli zanjir**. Har bir munchoq bitta belgi (harf, raqam, bo'sh joy). Siz zanjirni uzaytira, qisqartira, ulay olasiz — lekin har bir munchoq joyida.",
  syntax: `# String yaratish\nname = "Ali"\nmsg = 'Salom'\nmulti = """Ko'p\nqatorli\nmatn"""

# Asosiy metodlar
s = "Python"
len(s)           # 6
s.upper()        # "PYTHON"
s.lower()        # "python"
s[0]             # "P" (birinchi belgi)
s[-1]            # "n" (oxirgi belgi)
s[0:3]           # "Pyt" (slice)`,
  examples: [
    {
      code: `name = "Aziza"\ngreeting = f"Salom, {name}!"\nprint(greeting)  # Salom, Aziza!`,
      explanation:
        "`f\"\"` — bu **f-string** (formatted string). `{}` ichida o'zgaruvchi yoki ifoda yozishingiz mumkin. Eng qulay usul!",
    },
    {
      code: `text = "Hello World"\nprint(text.split())      # ['Hello', 'World']\nprint(text.replace("World", "Python"))  # Hello Python\nprint("World" in text)   # True`,
      explanation: "String metodlari juda ko'p: `split`, `replace`, `find`, `strip`, `startswith` va boshqalar.",
    },
    {
      code: `emoji = "🎉"\nprint(emoji * 5)  # 🎉🎉🎉🎉🎉\nprint(len(emoji))  # 1`,
      explanation: "String'ni songa ko'paytirish — takrorlash. Emoji ham bitta belgi (unicode).",
    },
  ],
  lineByLine: [
    { line: 's = "Python"', explanation: "String yaratildi. 6 ta belgidan iborat." },
    { line: "print(s[0])", explanation: "Birinchi belgi — indeks 0 dan boshlanadi! `'P'` chiqadi." },
    { line: "print(s[-1])", explanation: "Oxirgi belgi — manfiy indeks bilan. `'n'` chiqadi." },
    { line: 'print(f"{s} is cool")', explanation: "f-string: `{s}` o'rniga `Python` qo'yiladi." },
  ],
  commonMistakes: [
    {
      mistake: "String'ni o'zgartirishga urinish",
      code: `s = "Hello"\ns[0] = "J"  # TypeError: 'str' object does not support item assignment`,
      why: "String **immutable** — o'zgartirib bo'lmaydi. Yangi string yarating.",
      fix: `s = "Hello"\ns = "J" + s[1:]  # "Jello" ✓`,
    },
    {
      mistake: "Qo'shtirnoq ichidagi qo'shtirnoq",
      code: `s = "U dedi "Salom""  # SyntaxError`,
      why: "Qo'shtirnoqlar to'g'ri yopilmagan.",
      fix: `s = "U dedi 'Salom'"  # ✓\n# yoki\ns = 'U dedi "Salom"'  # ✓\n# yoki\ns = "U dedi \\"Salom\\""  # escape`,
    },
  ],
  whereUsed: [
    "Foydalanuvchi ismi, email, parol",
    "Xabarlar (SMS, email, chat)",
    "URL'lar va fayl yo'llari",
    "Ma'lumotlarni saqlash (JSON, CSV)",
    "UI'dagi yozuvlar (tugmalar, sarlavhalar)",
  ],
  exercises: [
    {
      id: "str-1",
      prompt: "Natijani toping:",
      codeSnippet: 's = "Python"\nprint(s[1:4])',
      question: "Nima chiqadi?",
      expected: ["yth"],
      hint: "Slice [1:4] — 1-indeksdan 4-gacha (4 kirmaydi). `y, t, h`",
      type: "output",
    },
    {
      id: "str-2",
      prompt: "Nima chiqadi?",
      codeSnippet: 'print("ha" * 3)',
      question: "Natija?",
      expected: ["hahaha"],
      hint: "String × son = takrorlash",
      type: "output",
    },
    {
      id: "str-3",
      prompt: "f-string to'ldiring:",
      codeSnippet: 'name = "Ali"\nage = 25\nprint(f"... yoshda")',
      question: "To'liq print qatorini yozing (natija: 'Ali 25 yoshda')",
      expected: ['print(f"{name} {age} yoshda")', "print(f'{name} {age} yoshda')"],
      hint: "`{name} {age}` — f-string ichida",
      type: "write",
    },
  ],
  quiz: [
    {
      id: "str-q1",
      question: "`len('salom')` natijasi?",
      options: ["4", "5", "6", "Error"],
      correctIndex: 1,
      explanation: "'salom' — 5 ta harf: s-a-l-o-m.",
    },
    {
      id: "str-q2",
      question: "`'python'[0]` nima qaytaradi?",
      options: ["'p'", "'python'", "'0'", "Error"],
      correctIndex: 0,
      explanation: "Indeks 0 dan boshlanadi. `[0]` — birinchi belgi 'p'.",
    },
    {
      id: "str-q3",
      question: "String immutable — bu nima degani?",
      options: ["U katta", "Uni o'zgartirib bo'lmaydi", "U faqat harflardan iborat", "U raqamli"],
      correctIndex: 1,
      explanation: "Immutable = o'zgartirib bo'lmaydi. `s[0] = 'X'` ishlamaydi.",
    },
  ],
  project: {
    title: "Ism Tahlilchi",
    description: "Foydalanuvchining ismini olib: uzunligini, bosh harf bilan, katta harflar bilan, teskari yozilishini chiqaring.",
    tasks: [
      "ism o'zgaruvchisini yarating",
      "len() bilan uzunlikni toping",
      "title(), upper(), slice[::-1] ishlating",
    ],
    starterCode: `ism = "alisher"

# TODO: uzunligi
print("Uzunlik:", ...)

# TODO: bosh harf bilan
print("Chiroyli:", ...)

# TODO: KATTA HARF
print("Katta:", ...)

# TODO: teskari
print("Teskari:", ...)`,
    solutionCode: `ism = "alisher"
print("Uzunlik:", len(ism))
print("Chiroyli:", ism.title())
print("Katta:", ism.upper())
print("Teskari:", ism[::-1])`,
    checkPoints: ["len() ishlatilgan", "title()/upper() ishlatilgan", "[::-1] slice ishlatilgan"],
  },
  trickyQuestions: [
    {
      question: "`'a' * 0` natijasi nima?",
      answer: "Bo'sh string `''`. Har qanday string × 0 = bo'sh string.",
      code: "print('a' * 0)  # ''",
    },
    {
      question: "String ichida har doim yangi string yaratiladi. Nega?",
      answer:
        "Chunki string **immutable**. `'hello' + ' world'` — bu ikkala string o'zgarmaydi, yangi `'hello world'` string yaratiladi. Bu xavfsiz, lekin ko'p stringlarni birlashtirishda sekin bo'lishi mumkin.",
    },
  ],
};

// Topic 4: bool
const boolTopic: Topic = {
  id: "bool",
  title: "bool",
  subtitle: "Mantiqiy qiymat (Boolean)",
  icon: "✅",
  accent: "from-emerald-500 to-green-600",
  difficulty: "Beginner",
  intro:
    "Bool — dasturlashning miyasi! U faqat ikkita qiymatga ega: `True` yoki `False`. Shartlar (if), tsikllar (while) — hammasi bool bilan ishlaydi.",
  definition:
    "`bool` (boolean) — mantiqiy tur. Faqat 2 ta qiymat: `True` (rost) yoki `False` (yolg'on). Bosh harf bilan yoziladi!",
  analogy:
    "Bool — bu **chiroq kaliti**. Faqat 2 holat: YONIQ (True) yoki O'CHIQ (False). O'rta holat yo'q!",
  syntax: `is_student = True\nis_admin = False

# Taqqoslash → bool
print(5 > 3)      # True
print(5 == 3)     # False
print(5 != 3)     # True

# Mantiqiy operatorlar
print(True and False)  # False
print(True or False)   # True
print(not True)        # False`,
  examples: [
    {
      code: `age = 20\ncan_vote = age >= 18\nprint(can_vote)  # True\nprint(type(can_vote))  # <class 'bool'>`,
      explanation: "Taqqoslash (`>=`, `==`, `<`, `!=`) har doim bool qaytaradi.",
    },
    {
      code: `if age >= 18:\n    print("Voyaga yetgan")\nelse:\n    print("Voyaga yetmagan")`,
      explanation: "`if` shartlari bool qabul qiladi. True bo'lsa ichidagi kod ishlaydi.",
    },
    {
      code: `# Bool sifatida "truthy" va "falsy" qiymatlar\nprint(bool(0))       # False\nprint(bool(1))       # True\nprint(bool(""))      # False (bo'sh string)\nprint(bool("hi"))    # True\nprint(bool([]))      # False (bo'sh list)\nprint(bool([1, 2]))  # True`,
      explanation:
        "Python'da 0, '', [], {}, None, False — **falsy** (yolg'ondek ishlaydi). Qolganlari — **truthy**.",
    },
  ],
  lineByLine: [
    { line: "x = True", explanation: "`x` — bool turidagi o'zgaruvchi. Qiymati: rost." },
    { line: "y = (5 > 3)", explanation: "5 katta 3 dan? Ha → `True`. Qavs ixtiyoriy." },
    { line: "z = x and y", explanation: "`and` — ikkalasi True bo'lsagina True. Bu yerda `True`." },
    { line: "print(not x)", explanation: "`not` — teskarisini qiladi. `not True` = `False`." },
  ],
  commonMistakes: [
    {
      mistake: "Kichik harf bilan yozish",
      code: `x = true   # NameError: name 'true' is not defined\ny = TRUE   # NameError`,
      why: "Python'da bool qiymatlar `True` va `False` — bosh harf bilan!",
      fix: `x = True   # ✓\ny = False  # ✓`,
    },
    {
      mistake: "`==` o'rniga `=` ishlatish",
      code: `if x = 5:   # SyntaxError`,
      why: "`=` — qiymat berish. `==` — taqqoslash. Shartda `==` kerak!",
      fix: `if x == 5:   # ✓`,
    },
  ],
  whereUsed: [
    "`if/else` shartlarida",
    "`while` tsikllarida",
    "Flag'lar (masalan: `is_active = False`)",
    "Foydalanuvchi ruxsatlari (admin?, banned?)",
    "Form validation (to'g'ri to'ldirildimi?)",
  ],
  exercises: [
    {
      id: "bool-1",
      prompt: "Natijani toping:",
      codeSnippet: "print(bool(''))",
      question: "Natija? (True yoki False)",
      expected: ["false"],
      hint: "Bo'sh string — falsy (yolg'on).",
      type: "output",
    },
    {
      id: "bool-2",
      prompt: "Natija?",
      codeSnippet: "print(True and False or True)",
      question: "Natija?",
      expected: ["true"],
      hint: "`and` avval, keyin `or`. `True and False = False`. `False or True = True`.",
      type: "output",
    },
    {
      id: "bool-3",
      prompt: "Xatoni toping:",
      codeSnippet: "if 5 = 5:\n    print('yes')",
      question: "Qaysi belgi xato? (= ni to'g'risiga almashtiring — javob: bitta belgi)",
      expected: ["==", "="],
      hint: "Shartda taqqoslash kerak — `==`",
      type: "fix",
    },
  ],
  quiz: [
    {
      id: "bool-q1",
      question: "Qaysi biri falsy?",
      options: ["1", "'hello'", "0", "[1, 2]"],
      correctIndex: 2,
      explanation: "`0` — falsy. 1, bo'sh bo'lmagan string va list — truthy.",
    },
    {
      id: "bool-q2",
      question: "`not False` natijasi?",
      options: ["True", "False", "None", "Error"],
      correctIndex: 0,
      explanation: "`not` — teskarisini qiladi. `not False` = `True`.",
    },
    {
      id: "bool-q3",
      question: "`True + True` natijasi?",
      options: ["TrueTrue", "2", "True", "Error"],
      correctIndex: 1,
      explanation: "Bool — int'ning subclass'i! `True = 1`, `False = 0`. `1 + 1 = 2`.",
    },
  ],
  project: {
    title: "Yosh Tekshiruvchi",
    description: "Foydalanuvchi yoshiga qarab: bola (0-12), o'smir (13-17), katta (18-64), qariya (65+) kategoriyalarini aniqlang.",
    tasks: [
      "age o'zgaruvchisini yarating",
      "4 ta bool shart yozing",
      "if/elif/else bilan kategoriyani chiqaring",
    ],
    starterCode: `age = 20

is_child = ...
is_teen = ...
is_adult = ...
is_senior = ...

if is_child:
    print("Bola")
elif is_teen:
    print("O'smir")
elif is_adult:
    print("Katta")
else:
    print("Qariya")`,
    solutionCode: `age = 20
is_child = 0 <= age <= 12
is_teen = 13 <= age <= 17
is_adult = 18 <= age <= 64
is_senior = age >= 65

if is_child:
    print("Bola")
elif is_teen:
    print("O'smir")
elif is_adult:
    print("Katta")
else:
    print("Qariya")`,
    checkPoints: ["4 ta bool shart bor", "if/elif/else to'g'ri", "Kategoriya chiqdi"],
  },
  trickyQuestions: [
    {
      question: "`True + 1` natijasi nima?",
      answer:
        "`2`. Chunki Python'da `bool` — `int` ning subclass'i. `True = 1`, `False = 0`. Shuning uchun `True + 1 = 1 + 1 = 2`.",
      code: "print(True + 1)  # 2\nprint(False * 10)  # 0",
    },
  ],
};

export { intTopic, floatTopic, stringTopic, boolTopic };
