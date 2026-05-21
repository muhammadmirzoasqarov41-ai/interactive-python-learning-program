import type { Topic } from "../types";

// Topic 8: set
const setTopic: Topic = {
  id: "set",
  title: "set",
  subtitle: "To'plam (Set)",
  icon: "🎯",
  accent: "from-fuchsia-500 to-pink-700",
  difficulty: "Beginner",
  intro:
    "Set — bu takrorlanmaydigan elementlar to'plami. Agar sizga faqat 'bor yoki yo'q' kerak bo'lsa (tartib muhim emas) — set ishlating!",
  definition:
    "`set` — tartibsiz, takrorlanmaydigan, mutable elementlar to'plami. `{` va `}` bilan yoziladi (lekin dict bilan adashtirmang — `:` yo'q!).",
  analogy:
    "Set — bu **qutidagi rangli qog'ozlar**. Har bir rang faqat 1 marta bo'ladi. Qaysi tartibda yotishi muhim emas — faqat 'qaysi ranglar bor' muhim.",
  syntax: `# Set yaratish
colors = {"red", "green", "blue"}
nums = {1, 2, 3, 2, 1}  # takrorlar o'chadi!
print(nums)  # {1, 2, 3}

empty_set = set()  # bo'sh set ({} bu dict!)

# Asosiy amallar
a = {1, 2, 3}
b = {2, 3, 4}
print(a | b)   # {1, 2, 3, 4} — birlashma (union)
print(a & b)   # {2, 3}       — kesishma (intersection)
print(a - b)   # {1}          — ayirma (difference)
print(a ^ b)   # {1, 4}       — simmetrik ayirma`,
  examples: [
    {
      code: `# Takrorlarni o'chirish
nums = [1, 2, 2, 3, 3, 3, 4]
unique = list(set(nums))
print(unique)  # [1, 2, 3, 4] (tartib o'zgarishi mumkin)`,
      explanation: "Set'ga aylantirish — takrorlarni o'chirishning eng tez usuli!",
    },
    {
      code: `# A'zolik tekshiruvi — JUDA TEZ!
users = {"ali", "vali", "sarvar"}
print("ali" in users)    # True — O(1) tezlikda!
print("hasan" in users)  # False

# List bilan solishtiring (sekinroq):
users_list = ["ali", "vali", "sarvar"]
print("ali" in users_list)  # True, lekin O(n) sekin`,
      explanation: "Set'da qidirish list'dan ancha tez — chunki hash ishlatadi.",
    },
    {
      code: `# Set metodlari
s = {1, 2, 3}
s.add(4)       # {1, 2, 3, 4}
s.remove(2)    # {1, 3, 4}
s.discard(99)  # xato bermaydi (remove esa beradi)
s.update([5, 6])  # {1, 3, 4, 5, 6}`,
      explanation: "`discard()` va `remove()` farqi: `discard` mavjud bo'lmagan elementda xato bermaydi.",
    },
  ],
  lineByLine: [
    { line: "s = {1, 2, 2, 3}", explanation: "Set yaratildi — takrorlar avtomatik o'chadi: `{1, 2, 3}`." },
    { line: "s.add(4)", explanation: "4 qo'shildi. Agar 4 allaqachon bo'lsa, hech narsa bo'lmaydi." },
    { line: 'print("x" in s)', explanation: "A'zolik tekshiruvi — juda tez (O(1))." },
    { line: "print(a & b)", explanation: "Kesishma — ikkalasida ham bor elementlar." },
  ],
  commonMistakes: [
    {
      mistake: "Bo'sh set yaratishda `{}` ishlatish",
      code: `s = {}\nprint(type(s))  # <class 'dict'> — bu dict!`,
      why: "`{}` bu dict. Set uchun `set()` funksiyasini ishlating.",
      fix: `s = set()\nprint(type(s))  # <class 'set'> ✓`,
    },
    {
      mistake: "Set ichida mutable elementlar saqlash",
      code: `s = {[1, 2], [3, 4]}  # TypeError: unhashable type 'list'`,
      why: "Set elementlari ham hashable (immutable) bo'lishi kerak. List — mutable.",
      fix: `s = {(1, 2), (3, 4)}  # tuple ishlating ✓`,
    },
  ],
  whereUsed: [
    "Takrorlarni o'chirish",
    "Tez a'zolik tekshiruvi (`in`)",
    "Matematik to'plam amallari",
    "Unique foydalanuvchilar, teglar",
    "Set intersection — umumiy do'stlar",
  ],
  exercises: [
    {
      id: "set-1",
      prompt: "Natijani toping:",
      codeSnippet: "print(len({1, 2, 2, 3, 3, 3}))",
      question: "Nima chiqadi?",
      expected: ["3"],
      hint: "Takrorlar o'chadi → {1, 2, 3}. 3 ta element.",
      type: "output",
    },
    {
      id: "set-2",
      prompt: "Kesishma natijasi?",
      codeSnippet: "a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)",
      question: "Nima chiqadi? (to'plam)",
      expected: ["{3, 4}"],
      hint: "`&` — ikkalasida ham bor: 3 va 4.",
      type: "output",
    },
    {
      id: "set-3",
      prompt: "Type nima?",
      codeSnippet: "x = {}\nprint(type(x))",
      question: "x ning turi? (set yoki dict)",
      expected: ["dict", "<class 'dict'>"],
      hint: "`{}` bu dict! Bo'sh set uchun `set()` kerak.",
      type: "type",
    },
  ],
  quiz: [
    {
      id: "set-q1",
      question: "Set'da takror elementlar saqlanadimi?",
      options: ["Ha", "Yo'q", "Faqat 2 tagacha", "Birinchi saqlanadi"],
      correctIndex: 1,
      explanation: "Set'da har bir element faqat 1 marta bo'ladi.",
    },
    {
      id: "set-q2",
      question: "`{1,2} | {2,3}` natijasi?",
      options: ["{1,2,3}", "{2}", "{1,3}", "Error"],
      correctIndex: 0,
      explanation: "`|` — birlashma (union). Hammasini birlashtiradi.",
    },
    {
      id: "set-q3",
      question: "Bo'sh set qanday yaratiladi?",
      options: ["{}", "set()", "[]", "None"],
      correctIndex: 1,
      explanation: "`set()` — bo'sh set. `{}` — bu bo'sh dict!",
    },
  ],
  project: {
    title: "O'xshash Musiqalar",
    description: "2 ta foydalanuvchining musiqalar ro'yxati berilgan — ularning umumiy sevimli musiqalarini toping.",
    tasks: [
      "2 ta list yarating (musiqalar)",
      "Set'larga aylantiring",
      "Intersection (&) bilan umumiy musiqalarni toping",
    ],
    starterCode: `user1_songs = ["Shape", "Love", "Rain", "Sun"]
user2_songs = ["Rain", "Moon", "Love", "Star"]

# TODO: set'larga aylantiring
set1 = ...
set2 = ...

# TODO: umumiy musiqalarni toping
common = ...

print("Umumiy:", common)`,
    solutionCode: `user1_songs = ["Shape", "Love", "Rain", "Sun"]
user2_songs = ["Rain", "Moon", "Love", "Star"]

set1 = set(user1_songs)
set2 = set(user2_songs)

common = set1 & set2
print("Umumiy:", common)  # {'Love', 'Rain'}`,
    checkPoints: ["set() ishlatilgan", "& operatori ishlatilgan", "Umumiy musiqalar topildi"],
  },
  trickyQuestions: [
    {
      question: "Nega set'da qidirish list'dan tez?",
      answer:
        "Set ichida **hash jadvali** ishlatiladi. Har bir elementning hash qiymati hisoblanadi va u bo'yicha indekslanadi. Qidirish O(1) — element sonidan qat'i nazar bir xil tez. List esa O(n) — har birini tekshirish kerak.",
    },
  ],
};

// Topic 9: NoneType
const noneTopic: Topic = {
  id: "none",
  title: "NoneType",
  subtitle: "Hech narsa (None)",
  icon: "🕳️",
  accent: "from-slate-500 to-gray-700",
  difficulty: "Beginner",
  intro:
    "None — Python'da 'hech narsa' yoki 'qiymat yo'q' degan ma'noni bildiradi. Boshqa tillardagi `null` yoki `undefined` ga o'xshaydi.",
  definition:
    "`None` — bu NoneType turidagi yagona qiymat. 'Qiymat yo'q', 'bo'sh', 'aniqlanmagan' ma'nosida ishlatiladi.",
  analogy:
    "None — bu **bo'sh quti**. Quti bor, lekin ichida hech narsa yo'q. Bu 0 ham emas, bo'sh string ham emas — bu **hech narsa**!",
  syntax: `# None yaratish
x = None
print(x)           # None
print(type(x))     # <class 'NoneType'>

# Tekshirish
if x is None:      # ✓ (to'g'ri usul)
    print("Bo'sh")

if x == None:      # ✗ (ishlaydi, lekin PEP 8 tavsiya etmaydi)
    print("Bo'sh")`,
  examples: [
    {
      code: `# Funksiya hech narsa qaytarmasa → None
def greet(name):
    print(f"Salom, {name}")
    # return yo'q!

result = greet("Ali")
print(result)  # None`,
      explanation: "Har bir Python funksiyasi qiymat qaytaradi. `return` bo'lmasa — `None` qaytadi.",
    },
    {
      code: `# Default qiymat sifatida
def find_user(user_id, default=None):
    users = {1: "Ali", 2: "Vali"}
    return users.get(user_id, default)

print(find_user(1))      # Ali
print(find_user(99))     # None
print(find_user(99, "Yo'q"))  # Yo'q`,
      explanation: "`None` — default qiymat uchun ideal. 'Agar topilmasa, hech narsa' degani.",
    },
    {
      code: `# EHTIYOT: None bilan arifmetika
x = None
print(x + 1)  # TypeError!
print(bool(x))  # False (falsy)`,
      explanation: "None bilan arifmetika qilib bo'lmaydi. Lekin `bool(None)` = False.",
    },
  ],
  lineByLine: [
    { line: "x = None", explanation: "`x` ga `None` qiymati berildi — 'hech narsa'." },
    { line: "print(x is None)", explanation: "`is` — identifikatsiya tekshiruvi. None uchun `is` ishlatiladi." },
    { line: "print(x == None)", explanation: "Ishlaydi, lekin PEP 8 bo'yicha `is None` yaxshiroq." },
    { line: "if x:", explanation: "None — falsy, shuning uchun `if None:` ishga tushmaydi." },
  ],
  commonMistakes: [
    {
      mistake: "`==` bilan None tekshirish",
      code: `if x == None:  # ✗ (ishlaydi, lekin to'g'ri emas)`,
      why: "PEP 8 bo'yicha None uchun `is` yoki `is not` ishlatiladi.",
      fix: `if x is None:  # ✓\nif x is not None:  # ✓`,
    },
    {
      mistake: "None bilan arifmetika",
      code: `x = None\nprint(x + 1)  # TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'`,
      why: "None — son emas, string emas. U bilan arifmetika qilib bo'lmaydi.",
      fix: `if x is not None:\n    print(x + 1)`,
    },
  ],
  whereUsed: [
    "Funksiyalar hech narsa qaytarmasa",
    "Default qiymatlar (parametrlar)",
    "Mavjud bo'lmagan ma'lumotlar",
    "O'zgaruvchini 'tozalash'",
    "Optional (ixtiyoriy) qiymatlar",
  ],
  exercises: [
    {
      id: "none-1",
      prompt: "Natijani toping:",
      codeSnippet: "def foo():\n    pass\nprint(foo())",
      question: "Nima chiqadi?",
      expected: ["none"],
      hint: "return bo'lmasa → None qaytadi.",
      type: "output",
    },
    {
      id: "none-2",
      prompt: "bool(None) nima?",
      codeSnippet: "print(bool(None))",
      question: "Natija? (True yoki False)",
      expected: ["false"],
      hint: "None — falsy.",
      type: "output",
    },
    {
      id: "none-3",
      prompt: "To'g'ri tekshirishni tanlang:",
      codeSnippet: "x = None",
      question: "Qaysi biri to'g'ri? (to'liq if qatorini yozing)",
      expected: ["if x is none:", "if x is none"],
      hint: "None uchun `is` ishlatiladi.",
      type: "write",
    },
  ],
  quiz: [
    {
      id: "none-q1",
      question: "None nima turda?",
      options: ["int", "bool", "NoneType", "null"],
      correctIndex: 2,
      explanation: "None — NoneType turidagi yagona qiymat.",
    },
    {
      id: "none-q2",
      question: "None qanday tekshiriladi?",
      options: ["== None", "is None", "= None", "equals None"],
      correctIndex: 1,
      explanation: "PEP 8 bo'yicha `is None` to'g'ri usul.",
    },
    {
      id: "none-q3",
      question: "Funksiya return bermasa nima qaytaradi?",
      options: ["0", "''", "None", "Error"],
      correctIndex: 2,
      explanation: "Har bir Python funksiyasi qiymat qaytaradi. return bo'lmasa — None.",
    },
  ],
  project: {
    title: "Kontakt Qidiruvchi",
    description: "Kontaktlar ro'yxatida ism bo'yicha qidiring. Topilmasa — None qaytaring. Keyin None'ni to'g'ri tekshiring.",
    tasks: [
      "Dict yarating (ism → telefon)",
      "Qidiruv funksiyasi yozing",
      "Topilmasa None qaytarsin",
      "Natijani if bilan tekshiring",
    ],
    starterCode: `contacts = {"Ali": "123", "Vali": "456"}

def find(name):
    # TODO: topilsa telefon, topilmasa None
    return contacts.get(name)

result = find("Sarvar")

# TODO: to'g'ri tekshirish
if result is None:
    print("Topilmadi")
else:
    print("Telefon:", result)`,
    solutionCode: `contacts = {"Ali": "123", "Vali": "456"}

def find(name):
    return contacts.get(name)

result = find("Sarvar")

if result is None:
    print("Topilmadi")
else:
    print("Telefon:", result)`,
    checkPoints: ["get() ishlatilgan", "None qaytadi", "is None tekshiruvi bor"],
  },
  trickyQuestions: [
    {
      question: "None va False o'rtasida farq bormi?",
      answer:
        "Ha! `None` — 'qiymat yo'q', `False` — mantiqiy 'yolg'on'. Ikkalasi ham falsy (if da o'xshash ishlaydi), lekin ular har xil tushuncha. Masalan: `if user:` — bu user mavjud bo'lmasligini (None) ham, user 'faol emas'ligini (False) ham anglatishi mumkin. Aniq bo'lish uchun `is None` ishlatiladi.",
    },
  ],
};

// Topic 10: complex
const complexTopic: Topic = {
  id: "complex",
  title: "complex",
  subtitle: "Kompleks sonlar",
  icon: "🌀",
  accent: "from-purple-500 to-indigo-700",
  difficulty: "Intermediate",
  intro:
    "Complex — bu haqiqiy va mavhum qismdan iborat son. Matematika, fizika, muhandislik va signallarni qayta ishlashda ishlatiladi.",
  definition:
    "`complex` — haqiqiy (real) va mavhum (imaginary) qismdan tashkil topgan son. Mavhum qism `j` harfi bilan yoziladi (matematikadagi `i`).",
  analogy:
    "Complex son — bu **2D koordinata**. X o'qi — haqiqiy qism, Y o'qi — mavhum qism. `(3+4j)` — bu koordinata tekisligidagi nuqta!",
  syntax: `# Complex son yaratish
z = 3 + 4j
print(z)            # (3+4j)
print(type(z))      # <class 'complex'>

# Haqiqiy va mavhum qismlar
print(z.real)       # 3.0
print(z.imag)       # 4.0

# complex() funksiyasi
z2 = complex(3, 4)  # (3+4j)

# Modul (uzunlik)
print(abs(z))       # 5.0 (Pifagor: √(3²+4²))

# Konjugat (mavhum qism ishorasini o'zgartirish)
print(z.conjugate())  # (3-4j)`,
  examples: [
    {
      code: `# Asosiy amallar
a = 2 + 3j
b = 1 - 2j

print(a + b)  # (3+1j)
print(a - b)  # (1+5j)
print(a * b)  # (8-1j) — (2+3j)(1-2j) = 2-4j+3j-6j² = 2-j+6 = 8-j
print(a / b)  # (-0.8+1.4j)`,
      explanation: "Complex sonlar bilan barcha arifmetik amallar ishlaydi!",
    },
    {
      code: `# cmath moduli — complex uchun maxsus funksiyalar
import cmath
z = 1 + 1j

print(cmath.phase(z))   # 0.7853... (burchak, radianlarda)
print(abs(z))           # 1.4142... (modul)
print(cmath.polar(z))   # (1.4142..., 0.7853...) — polar koordinatalar
print(cmath.sqrt(-1))   # 1j — manfiy sonning ildizi!`,
      explanation: "`cmath` — complex sonlar uchun maxsus kutubxona. `math` faqat haqiqiy sonlar uchun.",
    },
    {
      code: `# Haqiqiy hayotda: elektr muhandisligi
# Impedans (qarshilik) = Resistance + Reactance*j
R = 100     # ohm
X = 50      # ohm
Z = complex(R, X)
print(f"Impedans: {Z} ohm")
print(f"Magnituda: {abs(Z):.2f} ohm")
print(f"Faza: {cmath.phase(Z):.2f} radian")`,
      explanation: "Complex sonlar elektr muhandisligida juda keng qo'llaniladi.",
    },
  ],
  lineByLine: [
    { line: "z = 3 + 4j", explanation: "Complex son: 3 (haqiqiy) + 4j (mavhum). `j` — mavhum birlik." },
    { line: "print(z.real)", explanation: "Haqiqiy qism — `3.0` (har doim float!)." },
    { line: "print(z.imag)", explanation: "Mavhum qism — `4.0`." },
    { line: "print(abs(z))", explanation: "Modul (uzunlik) — √(3²+4²) = 5." },
  ],
  commonMistakes: [
    {
      mistake: "`i` o'rniga `j` ishlatishni unutish",
      code: `z = 3 + 4i  # SyntaxError: invalid syntax`,
      why: "Python'da mavhum birlik `j` (matematikadagi `i`). `i` ishlamaydi.",
      fix: `z = 3 + 4j  # ✓`,
    },
    {
      mistake: "`j` ni yolg'iz ishlatish",
      code: `z = 3 + j  # NameError: name 'j' is not defined`,
      why: "`j` yolg'iz o'zgaruvchi hisoblanadi. Mavhum birlik uchun `1j` kerak.",
      fix: `z = 3 + 1j  # ✓`,
    },
  ],
  whereUsed: [
    "Elektr muhandisligi (impedans)",
    "Signal qayta ishlash (FFT)",
    "Kvant fizikasi",
    "Kompyuter grafikasi (fraktallar)",
    "Matematik tadqiqotlar",
  ],
  exercises: [
    {
      id: "complex-1",
      prompt: "Natijani toping:",
      codeSnippet: "z = 3 + 4j\nprint(z.real)",
      question: "Nima chiqadi?",
      expected: ["3.0", "3"],
      hint: "`real` — haqiqiy qism. Har doim float!",
      type: "output",
    },
    {
      id: "complex-2",
      prompt: "Modul?",
      codeSnippet: "print(abs(3 + 4j))",
      question: "Natija?",
      expected: ["5.0", "5"],
      hint: "Pifagor: √(3²+4²) = 5",
      type: "output",
    },
    {
      id: "complex-3",
      prompt: "Xatoni tuzating:",
      codeSnippet: "z = 3 + 4i  # SyntaxError",
      question: "To'g'ri yozing",
      expected: ["z = 3 + 4j", "z=3+4j"],
      hint: "Python'da mavhum birlik — `j`.",
      type: "fix",
    },
  ],
  quiz: [
    {
      id: "complex-q1",
      question: "Python'da mavhum birlik qaysi harf?",
      options: ["i", "j", "k", "x"],
      correctIndex: 1,
      explanation: "Python'da `j` ishlatiladi (matematikadagi `i`).",
    },
    {
      id: "complex-q2",
      question: "`(2+3j).imag` natijasi?",
      options: ["2.0", "3.0", "3j", "(2+3j)"],
      correctIndex: 1,
      explanation: "`imag` — mavhum qism: `3.0`.",
    },
    {
      id: "complex-q3",
      question: "Complex sonning moduli qanday topiladi?",
      options: ["len(z)", "abs(z)", "mod(z)", "sqrt(z)"],
      correctIndex: 1,
      explanation: "`abs(z)` — complex sonning modulini qaytaradi.",
    },
  ],
  project: {
    title: "Kompleks Kalkulyator",
    description: "2 ta complex sonning yig'indisi, ayirmasi, ko'paytmasi va modulini hisoblang.",
    tasks: [
      "2 ta complex son yarating",
      "4 ta amal bajaring (+, -, *, abs)",
      "Natijalarni chiqaring",
    ],
    starterCode: `a = 2 + 3j
b = 1 - 2j

# TODO: amallar
print("Yig'indi:", ...)
print("Ayirma:", ...)
print("Ko'paytma:", ...)
print("a moduli:", ...)
print("b moduli:", ...)`,
    solutionCode: `a = 2 + 3j
b = 1 - 2j

print("Yig'indi:", a + b)      # (3+1j)
print("Ayirma:", a - b)        # (1+5j)
print("Ko'paytma:", a * b)     # (8-1j)
print("a moduli:", abs(a))     # 3.6055...
print("b moduli:", abs(b))     # 2.2360...`,
    checkPoints: ["Complex sonlar yaratilgan", "4 ta amal ishlatilgan", "abs() ishlatilgan"],
  },
  trickyQuestions: [
    {
      question: "Nega Python'da `i` emas `j`?",
      answer:
        "Muhandislikda (elektr, signal qayta ishlash) an'anaviy ravishda `j` ishlatiladi — chunki `i` allaqachon tok (current) uchun ishlatilgan. Python muhandislarga qulay bo'lishi uchun `j` ni tanlagan.",
    },
  ],
};

// Topic 11: bytes
const bytesTopic: Topic = {
  id: "bytes",
  title: "bytes",
  subtitle: "Baytlar (Bytes)",
  icon: "💾",
  accent: "from-teal-500 to-cyan-700",
  difficulty: "Intermediate",
  intro:
    "Bytes — bu xom (raw) ma'lumotlar: rasmlar, audio, video, fayllar. Har bir element 0 dan 255 gacha bo'lgan son (1 bayt).",
  definition:
    "`bytes` — immutable baytlar ketma-ketligi. Har bir element 0-255 orasidagi butun son. `b'...'` prefiksi bilan yoziladi.",
  analogy:
    "Bytes — bu **kompyuter xotirasidagi xom ma'lumot**. String — bu odam o'qiydigan matn, bytes — bu kompyuter tushunadigan 0 va 1'lar ketma-ketligi.",
  syntax: `# Bytes yaratish
data = b"hello"
print(data)          # b'hello'
print(type(data))    # <class 'bytes'>

# Har bir element — int (0-255)
print(data[0])       # 104 (ASCII 'h')
print(list(data))    # [104, 101, 108, 108, 111]

# bytes() funksiyasi
data2 = bytes([65, 66, 67])  # b'ABC'

# String ↔ Bytes
text = "Salom"
encoded = text.encode("utf-8")  # string → bytes
decoded = encoded.decode("utf-8")  # bytes → string
print(decoded)  # Salom`,
  examples: [
    {
      code: `# Fayl o'qish (binary rejim)
# with open("image.png", "rb") as f:
#     data = f.read()  # bytes qaytadi

# Bytes uzunligi
data = b"hello"
print(len(data))  # 5 (5 bayt)

# ASCII qiymatlar
for byte in b"ABC":
    print(byte)  # 65, 66, 67`,
      explanation: "Har bir ASCII belgi 1 bayt. UTF-8 da o'zbek harflari 2 bayt.",
    },
    {
      code: `# Kodirovka muammosi
text = "Salom"
utf8 = text.encode("utf-8")
latin = text.encode("latin-1")

print(len(utf8))    # 10 (o'zbek harflari 2 bayt)
print(len(latin))   # 5 (lotin 1 bayt)
print(utf8)         # b'Salom'
print(latin)        # b'Salom'

# Noto'g'ri dekodlash
try:
    utf8.decode("latin-1")
except UnicodeDecodeError as e:
    print("Xato:", e)`,
      explanation: "Kodirovka — bu string va bytes o'rtasidagi tarjimon. Noto'g'ri kodirovka — buzilgan matn!",
    },
    {
      code: `# Hex ko'rinishi (odamlar uchun)
data = bytes([255, 0, 128, 64])
print(data.hex())  # 'ff008040'

# Hex'dan bytes
hex_str = "48656c6c6f"
print(bytes.fromhex(hex_str))  # b'Hello'`,
      explanation: "Hex — bytes'ni odam o'qiydigan ko'rinishda ifodalash.",
    },
  ],
  lineByLine: [
    { line: 'data = b"hello"', explanation: "`b` prefiksi — bu bytes literal. 5 ta ASCII belgi." },
    { line: "print(data[0])", explanation: "Birinchi bayt — `104` (ASCII 'h'). Baytlar — int!" },
    { line: 'text = data.decode("utf-8")', explanation: "Bytes → string. UTF-8 kodirovkasi bilan." },
    { line: 'encoded = "Salom".encode("utf-8")', explanation: "String → bytes. UTF-8 kodirovkasi bilan." },
  ],
  commonMistakes: [
    {
      mistake: "Bytes ichida 255 dan katta son",
      code: `data = bytes([256])  # ValueError: bytes must be in range(0, 256)`,
      why: "Har bir bayt 0-255 orasida bo'lishi kerak. 256 = 2 bayt!",
      fix: `data = bytes([255])  # ✓`,
    },
    {
      mistake: "Bytes'ni o'zgartirishga urinish",
      code: `data = b"hello"\ndata[0] = 104  # TypeError: 'bytes' object does not support item assignment`,
      why: "Bytes immutable — string kabi. O'zgartirish uchun `bytearray` ishlating.",
      fix: `data = bytearray(b"hello")  # mutable\ndata[0] = 104  # ✓`,
    },
  ],
  whereUsed: [
    "Fayllarni o'qish/yozish (rasm, audio, video)",
    "Tarmoq (network) ma'lumotlari",
    "Kriptografiya (parollar, hashlar)",
    "Ma'lumotlar bazasi (BLOB)",
    "Binary protokollar",
  ],
  exercises: [
    {
      id: "bytes-1",
      prompt: "Natijani toping:",
      codeSnippet: 'print(len(b"hello"))',
      question: "Nima chiqadi?",
      expected: ["5"],
      hint: "ASCII belgilar — har biri 1 bayt. 5 ta harf = 5 bayt.",
      type: "output",
    },
    {
      id: "bytes-2",
      prompt: "ASCII qiymati?",
      codeSnippet: 'print(b"A"[0])',
      question: "Natija?",
      expected: ["65"],
      hint: "ASCII jadvalida 'A' = 65.",
      type: "output",
    },
    {
      id: "bytes-3",
      prompt: "String'ga aylantiring:",
      codeSnippet: 'data = b"hello"\n# TODO: string\'ga aylantiring',
      question: "To'liq kod qatorini yozing (natija: 'hello' string)",
      expected: ['print(data.decode("utf-8"))', "print(data.decode('utf-8'))", "data.decode('utf-8')", 'data.decode("utf-8")'],
      hint: "`decode()` — bytes'dan string'ga.",
      type: "write",
    },
  ],
  quiz: [
    {
      id: "bytes-q1",
      question: "Bytes'ning har bir elementi qanday oraliqda?",
      options: ["0-1", "0-255", "0-1024", "-128-127"],
      correctIndex: 1,
      explanation: "Bayt = 8 bit. 2⁸ = 256 qiymat (0-255).",
    },
    {
      id: "bytes-q2",
      question: "Bytes mutable'mi?",
      options: ["Ha", "Yo'q (immutable)", "Ba'zan", "Faqat ASCII uchun"],
      correctIndex: 1,
      explanation: "Bytes immutable. Mutable versiya — `bytearray`.",
    },
    {
      id: "bytes-q3",
      question: "String → bytes qanday?",
      options: ["str.to_bytes()", "encode()", "bytes(str)", "convert()"],
      correctIndex: 1,
      explanation: "`'text'.encode('utf-8')` — string → bytes.",
    },
  ],
  project: {
    title: "Oddiy Hash Generator",
    description: "String'ni bytes'ga aylantiring va uning hex ko'rinishini chiqaring (oddiy hash simulyatsiyasi).",
    tasks: [
      "String oling",
      "UTF-8 bilan bytes'ga aylantiring",
      "Hex ko'rinishini chiqaring",
      "Uzunligini ham ko'rsating",
    ],
    starterCode: `text = "Python is awesome!"

# TODO: bytes'ga aylantiring
data = ...

# TODO: hex ko'rinishi
hex_str = ...

# TODO: uzunlik
length = ...

print(f"Text: {text}")
print(f"Bytes: {data}")
print(f"Hex: {hex_str}")
print(f"Length: {length} bytes")`,
    solutionCode: `text = "Python is awesome!"

data = text.encode("utf-8")
hex_str = data.hex()
length = len(data)

print(f"Text: {text}")
print(f"Bytes: {data}")
print(f"Hex: {hex_str}")
print(f"Length: {length} bytes")`,
    checkPoints: ["encode() ishlatilgan", ".hex() ishlatilgan", "len() ishlatilgan"],
  },
  trickyQuestions: [
    {
      question: "Nega o'zbek matni UTF-8 da 2 bayt, lotin 1 bayt?",
      answer:
        "UTF-8 — o'zgaruvchan uzunlikdagi kodirovka. ASCII belgilar (a-z, A-Z, 0-9) 1 bayt. O'zbek, rus, arab harflari 2 bayt. Xitoy, yapon belgilari 3-4 bayt. Bu xotirani tejaydi — ko'p matnlar ASCII bo'lgani uchun.",
    },
  ],
};

export { setTopic, noneTopic, complexTopic, bytesTopic };
