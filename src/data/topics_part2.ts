import type { Topic } from "../types";

// Topic 5: list
const listTopic: Topic = {
  id: "list",
  title: "list",
  subtitle: "Ro'yxatlar (List)",
  icon: "📋",
  accent: "from-violet-500 to-purple-600",
  difficulty: "Beginner",
  intro:
    "List — bu Python'ning eng ko'p ishlatiladigan tuzilma turlaridan biri. Bir nechta qiymatni bir joyda saqlash uchun ideal!",
  definition:
    "`list` — tartiblangan, o'zgartirsa bo'ladigan (mutable), takrorlanishi mumkin bo'lgan elementlar to'plami. `[` va `]` qavslar bilan yoziladi.",
  analogy:
    "List — bu **poezd vagonlari**. Har bir vagon — bitta element. Vagonlarning o'z tartibi bor (1, 2, 3...). Siz vagon qo'shishingiz, olib tashlashingiz yoki almashtirishingiz mumkin. Bir xil vagonlar ham bo'lishi mumkin!",
  syntax: `# List yaratish
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]  # har xil turlar!
empty = []

# Asosiy amallar
nums = [10, 20, 30]
nums[0]           # 10 (indeks 0 dan)
nums[-1]          # 30 (oxirgi)
nums[1:3]         # [20, 30] (slice)
len(nums)         # 3
nums.append(40)   # [10, 20, 30, 40]
nums.pop()        # 40 ni olib tashlaydi
nums[0] = 99      # [99, 20, 30] (o'zgartirish)`,
  examples: [
    {
      code: `fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.insert(1, "mango")  # 1-indeksga qo'shish
print(fruits)  # ['apple', 'mango', 'banana', 'cherry', 'date']`,
      explanation: "`append()` oxiriga qo'shadi, `insert()` — ixtiyoriy joyga.",
    },
    {
      code: `# List comprehension — qisqa yo'l
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]`,
      explanation: "List comprehension — list yaratishning chiroyli usuli. `[ifoda for o'zgaruvchi in manba if shart]`.",
    },
    {
      code: `# EHTIYOT: mutable!
a = [1, 2, 3]
b = a        # b ham a'ga havola!
b[0] = 99
print(a)     # [99, 2, 3] (!)
print(b)     # [99, 2, 3]`,
      explanation: "List'ni nusxalash uchun `b = a[:]` yoki `b = a.copy()` ishlatish kerak!",
    },
  ],
  lineByLine: [
    { line: "nums = [1, 2, 3]", explanation: "3 ta int'dan iborat list yaratildi." },
    { line: "nums.append(4)", explanation: "Oxiriga 4 qo'shildi. Endi `[1, 2, 3, 4]`." },
    { line: "print(nums[1])", explanation: "1-indeksdagi element — `2` (0 dan boshlanadi!)." },
    { line: "nums.reverse()", explanation: "List teskarisiga aylantiriladi. `[4, 3, 2, 1]`." },
  ],
  commonMistakes: [
    {
      mistake: "List'ni noto'g'ri nusxalash",
      code: `a = [1, 2, 3]\nb = a\nb[0] = 99\nprint(a)  # [99, 2, 3] — a ham o'zgardi!`,
      why: "`b = a` nusxalamaydi, faqat havola (reference). `a` va `b` bitta list!",
      fix: `a = [1, 2, 3]\nb = a.copy()  # yoki b = a[:]\nb[0] = 99\nprint(a)  # [1, 2, 3] ✓`,
    },
    {
      mistake: "Loop ichida list'dan element o'chirish",
      code: `nums = [1, 2, 3, 4, 5]\nfor n in nums:\n    if n > 2:\n        nums.remove(n)\n# kutilmagan natija!`,
      why: "Loop davomida list o'lchami o'zgaryapti — indekslar buziladi.",
      fix: `nums = [1, 2, 3, 4, 5]\nnums = [n for n in nums if n <= 2]  # ✓\n# yoki\nnums = list(filter(lambda n: n <= 2, nums))`,
    },
  ],
  whereUsed: [
    "Foydalanuvchilar ro'yxati",
    "To-do list, shopping cart",
    "Ma'lumotlarni saqlash (CSV qatorlari)",
    "Loop'lar (`for x in list`)",
    "Stack va Queue tuzilmalari",
  ],
  exercises: [
    {
      id: "list-1",
      prompt: "Natijani toping:",
      codeSnippet: "x = [1, 2, 3]\nx.append(4)\nprint(x[1])",
      question: "Nima chiqadi?",
      expected: ["2"],
      hint: "`[1]` — ikkinchi element. `append` oxiriga qo'shadi, indeks o'zgarmaydi.",
      type: "output",
    },
    {
      id: "list-2",
      prompt: "List comprehension natijasi?",
      codeSnippet: "print([x*2 for x in [1, 2, 3]])",
      question: "Nima chiqadi? (list ko'rinishida)",
      expected: ["[2, 4, 6]"],
      hint: "Har bir elementni 2 ga ko'paytiramiz.",
      type: "output",
    },
    {
      id: "list-3",
      prompt: "Nima chiqadi?",
      codeSnippet: "a = [1, 2, 3]\nb = a\nb[0] = 99\nprint(a[0])",
      question: "a[0] ning qiymati?",
      expected: ["99"],
      hint: "`b = a` havola — bitta list!",
      type: "output",
    },
  ],
  quiz: [
    {
      id: "list-q1",
      question: "List mutable — bu nima degani?",
      options: ["Uni o'zgartirib bo'lmaydi", "Uni o'zgartirsa bo'ladi", "U faqat sonlardan", "U bo'sh"],
      correctIndex: 1,
      explanation: "Mutable = o'zgartirsa bo'ladi. `nums[0] = 99` ishlaydi.",
    },
    {
      id: "list-q2",
      question: "`[1, 2, 3] + [4, 5]` natijasi?",
      options: ["[5, 7]", "[1, 2, 3, 4, 5]", "Error", "[[1,2,3], [4,5]]"],
      correctIndex: 1,
      explanation: "`+` list'larni birlashtiradi (concatenation).",
    },
    {
      id: "list-q3",
      question: "List'dan element o'chirish usuli?",
      options: ["del list[0]", "list.remove(x)", "list.pop()", "Barchasi to'g'ri"],
      correctIndex: 3,
      explanation: "Uchalasi ham ishlaydi. `del` indeks bilan, `remove` qiymat bilan, `pop` oxirgisini.",
    },
  ],
  project: {
    title: "To-Do List Ilovasi",
    description: "Foydalanuvchi vazifalar qo'sha, o'chira va ko'ra oladigan oddiy To-Do List yarating.",
    tasks: [
      "Bo'sh list yarating",
      "3 ta vazifa qo'shing (append)",
      "1 tasini o'chiring (remove)",
      "Qolganlarni chiqaring",
    ],
    starterCode: `# To-Do List
todos = []

# TODO: 3 ta vazifa qo'shing
todos.append(...)
todos.append(...)
todos.append(...)

# TODO: birinchisini o'chiring
todos.remove(...)

# TODO: qolganlarni chiqaring
for task in todos:
    print("-", task)`,
    solutionCode: `todos = []
todos.append("Kitob o'qish")
todos.append("Sport")
todos.append("Uyga yordam")

todos.remove("Sport")

for task in todos:
    print("-", task)
# - Kitob o'qish
# - Uyga yordam`,
    checkPoints: ["List yaratilgan", "append() ishlatilgan", "remove() ishlatilgan", "Loop ishlatilgan"],
  },
  trickyQuestions: [
    {
      question: "`[] * 3` natijasi nima?",
      answer: "`[]` (bo'sh list). Bo'sh listni takrorlash ham bo'sh list beradi.",
      code: "print([] * 3)  # []",
    },
    {
      question: "`[[0]] * 3` bilan ehtiyot bo'ling!",
      answer:
        "Bu `[[], [], []]` EMAS — bu `[[0], [0], [0]]`, lekin ular bitta list'ning havolasi! Bittasini o'zgartirsangiz, hammasi o'zgaradi.",
      code: "matrix = [[0]] * 3\nmatrix[0][0] = 99\nprint(matrix)  # [[99], [99], [99]] (!)\n\n# To'g'ri usul:\nmatrix = [[0] for _ in range(3)]\nmatrix[0][0] = 99\nprint(matrix)  # [[99], [0], [0]] ✓",
    },
  ],
};

// Topic 6: tuple
const tupleTopic: Topic = {
  id: "tuple",
  title: "tuple",
  subtitle: "O'zgarmas ro'yxat (Tuple)",
  icon: "📦",
  accent: "from-rose-500 to-pink-600",
  difficulty: "Beginner",
  intro:
    "Tuple — list'ning o'zgarmas (immutable) versiyasi. Agar ma'lumot o'zgarmasligi kerak bo'lsa — tuple ishlating!",
  definition:
    "`tuple` — tartiblangan, o'zgartirib bo'lmaydigan (immutable) elementlar to'plami. `(` va `)` bilan yoziladi.",
  analogy:
    "Tuple — bu **muhrlangan konvert**. Ichidagi narsa o'zgarmaydi. Siz konvertning nusxasini olishingiz yoki ichini ko'rishingiz mumkin — lekin o'zgartira olmaysiz. Bu xavfsizlik!",
  syntax: `# Tuple yaratish
point = (10, 20)
rgb = (255, 128, 0)
single = (42,)  # 1 elementli tuple — vergul shart!
not_tuple = (42)  # bu int — vergul yo'q

# Asosiy amallar
t = (1, 2, 3)
t[0]         # 1
t[-1]        # 3
t[1:3]       # (2, 3)
len(t)       # 3
# t[0] = 99  # TypeError! — o'zgartirib bo'lmaydi`,
  examples: [
    {
      code: `# Unpacking — tuple'ni ochish
point = (10, 20)
x, y = point
print(x, y)  # 10 20

# Swap — o'rin almashtirish
a, b = 1, 2
a, b = b, a
print(a, b)  # 2 1`,
      explanation: "Tuple unpacking — eng chiroyli Python trick'lardan biri!",
    },
    {
      code: `# Funksiyadan bir nechta qiymat qaytarish
def min_max(nums):
    return min(nums), max(nums)

result = min_max([3, 1, 4, 1, 5])
print(result)  # (1, 5)
lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)  # 1 5`,
      explanation: "Python funksiyalari aslida bitta tuple qaytaradi — ko'p qiymat qaytarish oson!",
    },
    {
      code: `# Tuple vs List
import sys
list_size = sys.getsizeof([1, 2, 3])
tuple_size = sys.getsizeof((1, 2, 3))
print(f"List: {list_size} bytes")
print(f"Tuple: {tuple_size} bytes")  # Tuple kichikroq!`,
      explanation: "Tuple list'dan tezroq va kamroq xotira oladi — chunki o'zgarmaydi.",
    },
  ],
  lineByLine: [
    { line: "t = (1, 2, 3)", explanation: "3 elementli tuple yaratildi." },
    { line: "print(t[0])", explanation: "Birinchi element — `1` (indeks 0)." },
    { line: "x, y, z = t", explanation: "Unpacking — har bir element alohida o'zgaruvchiga." },
    { line: "single = (42,)", explanation: "1 elementli tuple — vergul shart! `(42)` bu int." },
  ],
  commonMistakes: [
    {
      mistake: "1 elementli tuple yaratishda vergul unutish",
      code: `t = (42)\nprint(type(t))  # <class 'int'> — bu tuple emas!`,
      why: "Qavslar matematik guruhlash uchun ham ishlatiladi. Vergul bo'lmasa — bu oddiy int.",
      fix: `t = (42,)  # vergul qo'shing!\nprint(type(t))  # <class 'tuple'> ✓`,
    },
    {
      mistake: "Tuple'ni o'zgartirishga urinish",
      code: `t = (1, 2, 3)\nt[0] = 99  # TypeError!`,
      why: "Tuple immutable — o'zgartirib bo'lmaydi. List ishlating agar o'zgarishi kerak bo'lsa.",
      fix: `t = (1, 2, 3)\nt = (99,) + t[1:]  # yangi tuple yaratish ✓`,
    },
  ],
  whereUsed: [
    "Koordinatalar (x, y, z)",
    "RGB ranglar (255, 128, 0)",
    "Funksiyadan ko'p qiymat qaytarish",
    "Dictionary kalitlari (list kalit bo'la olmaydi, tuple bo'ladi!)",
    "O'zgarmas ma'lumotlar (sana, vaqt, konfiguratsiya)",
  ],
  exercises: [
    {
      id: "tuple-1",
      prompt: "Natijani toping:",
      codeSnippet: "t = (10, 20, 30)\nprint(t[1])",
      question: "Nima chiqadi?",
      expected: ["20"],
      hint: "Indeks 1 — ikkinchi element.",
      type: "output",
    },
    {
      id: "tuple-2",
      prompt: "Type nima?",
      codeSnippet: "x = (5)\nprint(type(x))",
      question: "x ning turi? (int yoki tuple)",
      expected: ["int", "<class 'int'>"],
      hint: "Vergul yo'q — bu int!",
      type: "type",
    },
    {
      id: "tuple-3",
      prompt: "Unpacking natijasi?",
      codeSnippet: "a, b = (100, 200)\nprint(a + b)",
      question: "Natija?",
      expected: ["300"],
      hint: "a = 100, b = 200. 100 + 200 = ?",
      type: "output",
    },
  ],
  quiz: [
    {
      id: "tuple-q1",
      question: "Tuple va list'ning asosiy farqi?",
      options: ["Tuple tezroq", "Tuple o'zgarmaydi (immutable)", "Tuple faqat sonlardan", "Farq yo'q"],
      correctIndex: 1,
      explanation: "Tuple immutable — elementlarini o'zgartirib bo'lmaydi.",
    },
    {
      id: "tuple-q2",
      question: "Qaysi biri 1 elementli tuple?",
      options: ["(1)", "(1,)", "[1]", "{1}"],
      correctIndex: 1,
      explanation: "`(1,)` — vergul bilan. `(1)` bu oddiy int.",
    },
    {
      id: "tuple-q3",
      question: "Tuple'ni dict kaliti sifatida ishlatsa bo'ladimi?",
      options: ["Ha", "Yo'q", "Faqat string bilan", "Faqat int bilan"],
      correctIndex: 0,
      explanation: "Ha! Tuple immutable, shuning uchun dict kaliti bo'la oladi. List esa — yo'q.",
    },
  ],
  project: {
    title: "Koordinata Tizimi",
    description: "2 ta nuqta (tuple sifatida) yarating va ular orasidagi masofani hisoblang: d = √((x2-x1)² + (y2-y1)²)",
    tasks: [
      "2 ta (x, y) tuple yarating",
      "Unpacking bilan x va y'larni oling",
      "Masofani hisoblang (math.sqrt)",
    ],
    starterCode: `import math

p1 = (0, 0)
p2 = (3, 4)

# TODO: unpacking
x1, y1 = ...
x2, y2 = ...

# TODO: masofa
dist = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
print("Masofa:", dist)`,
    solutionCode: `import math

p1 = (0, 0)
p2 = (3, 4)

x1, y1 = p1
x2, y2 = p2

dist = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
print("Masofa:", dist)  # 5.0`,
    checkPoints: ["Tuple'lar yaratilgan", "Unpacking ishlatilgan", "math.sqrt ishlatilgan"],
  },
  trickyQuestions: [
    {
      question: "`(1, 2) + (3, 4)` natijasi nima?",
      answer: "`(1, 2, 3, 4)`. Tuple'larni `+` bilan birlashtirish mumkin — lekin bu yangi tuple yaratadi.",
      code: "print((1, 2) + (3, 4))  # (1, 2, 3, 4)",
    },
  ],
};

// Topic 7: dict
const dictTopic: Topic = {
  id: "dict",
  title: "dict",
  subtitle: "Lug'at (Dictionary)",
  icon: "📖",
  accent: "from-indigo-500 to-blue-700",
  difficulty: "Beginner",
  intro:
    "Dict — bu kalit-qiymat juftlari. Real hayotdagi lug'atga o'xshaydi: so'z (kalit) va uning ma'nosi (qiymat). Python'ning eng kuchli tuzilmasi!",
  definition:
    "`dict` (dictionary) — tartibsiz (Python 3.7+ dan tartiblangan), kalit-qiymat juftlari to'plami. `{` va `}` bilan yoziladi, kalit va qiymat `:` bilan ajratiladi.",
  analogy:
    "Dict — bu **telefon kitobi**. Har bir ism (kalit) uchun telefon raqami (qiymat) bor. Siz ism bo'yicha tez qidira olasiz — lekin raqam bo'yicha qidirish sekinroq.",
  syntax: `# Dict yaratish
person = {
    "name": "Ali",
    "age": 25,
    "city": "Toshkent"
}

# Qiymat olish
person["name"]           # "Ali"
person.get("age")        # 25
person.get("job", "N/A") # "N/A" (default)

# O'zgartirish
person["age"] = 26
person["job"] = "Dev"    # yangi kalit qo'shish

# O'chirish
del person["city"]`,
  examples: [
    {
      code: `user = {"name": "Ali", "age": 25}

# Kalitlarni tekshirish
if "name" in user:
    print(user["name"])  # Ali

# Barcha kalitlar va qiymatlar
print(user.keys())    # dict_keys(['name', 'age'])
print(user.values())  # dict_values(['Ali', 25])
print(user.items())   # dict_items([('name', 'Ali'), ('age', 25)])`,
      explanation: "`keys()`, `values()`, `items()` — dict bilan ishlashning asosiy metodlari.",
    },
    {
      code: `# Loop bilan dict
scores = {"math": 90, "physics": 85, "chemistry": 88}

for subject, score in scores.items():
    print(f"{subject}: {score}")
# math: 90
# physics: 85
# chemistry: 88`,
      explanation: "`items()` — kalit va qiymatni birga qaytaradi. Loop uchun ideal!",
    },
    {
      code: `# Dict comprehension
squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Filtrlash
high_scores = {k: v for k, v in scores.items() if v >= 88}
print(high_scores)  # {'math': 90, 'chemistry': 88}`,
      explanation: "Dict comprehension — qisqa va chiroyli dict yaratish usuli.",
    },
  ],
  lineByLine: [
    { line: 'd = {"a": 1, "b": 2}', explanation: "2 ta kalit-qiymat juftidan iborat dict yaratildi." },
    { line: 'print(d["a"])', explanation: "`'a'` kalitining qiymati — `1`." },
    { line: 'd["c"] = 3', explanation: "Yangi kalit `'c'` qo'shildi, qiymati `3`." },
    { line: 'del d["a"]', explanation: "`'a'` kaliti o'chirildi." },
  ],
  commonMistakes: [
    {
      mistake: "Mavjud bo'lmagan kalitni olish",
      code: `d = {"a": 1}\nprint(d["b"])  # KeyError!`,
      why: "`['b']` — agar kalit yo'q bo'lsa, xato chiqadi.",
      fix: `d = {"a": 1}\nprint(d.get("b", 0))  # 0 (default) ✓\n# yoki\nif "b" in d:\n    print(d["b"])`,
    },
    {
      mistake: "Dict kaliti sifatida list ishlatish",
      code: `d = {[1, 2]: "value"}  # TypeError: unhashable type`,
      why: "Dict kaliti **hashable** bo'lishi kerak — ya'ni, immutable. List mutable — ishlamaydi.",
      fix: `d = {(1, 2): "value"}  # tuple ishlatish ✓`,
    },
  ],
  whereUsed: [
    "Foydalanuvchi ma'lumotlari (profile)",
    "Konfiguratsiya fayllari",
    "JSON ma'lumotlari",
    "Cache (tez xotira)",
    "API javoblari",
    "Ma'lumotlar bazasi yozuvlari",
  ],
  exercises: [
    {
      id: "dict-1",
      prompt: "Natijani toping:",
      codeSnippet: 'd = {"a": 1, "b": 2}\nprint(d["a"] + d["b"])',
      question: "Nima chiqadi?",
      expected: ["3"],
      hint: "`d['a']` = 1, `d['b']` = 2. 1 + 2 = 3",
      type: "output",
    },
    {
      id: "dict-2",
      prompt: "get() natijasi?",
      codeSnippet: 'd = {"x": 10}\nprint(d.get("y", 99))',
      question: "Natija?",
      expected: ["99"],
      hint: "`'y'` kaliti yo'q — default qiymat `99` qaytadi.",
      type: "output",
    },
    {
      id: "dict-3",
      prompt: "Xatoni tuzating:",
      codeSnippet: 'd = {"name": "Ali"}\nprint(d["age"])  # KeyError',
      question: "get() bilan tuzating (default: 0)",
      expected: ['print(d.get("age", 0))', "print(d.get('age', 0))"],
      hint: "`d.get('age', 0)` — agar yo'q bo'lsa, 0 qaytaradi.",
      type: "fix",
    },
  ],
  quiz: [
    {
      id: "dict-q1",
      question: "Dict kaliti sifatida qaysi biri ishlamaydi?",
      options: ["string", "int", "tuple", "list"],
      correctIndex: 3,
      explanation: "List mutable — hashable emas. Dict kaliti immutable bo'lishi kerak.",
    },
    {
      id: "dict-q2",
      question: "`len({'a': 1, 'b': 2, 'c': 3})` natijasi?",
      options: ["2", "3", "6", "Error"],
      correctIndex: 1,
      explanation: "`len()` — kalitlar soni. 3 ta kalit → 3.",
    },
    {
      id: "dict-q3",
      question: "Dict'da bir xil kalit 2 marta bo'lsa nima bo'ladi?",
      options: ["Error", "Ikkalasi saqlanadi", "Oxirgisi yoziladi", "Birinchi saqlanadi"],
      correctIndex: 2,
      explanation: "Kalitlar unique — oxirgi qiymat birinchisini o'chiradi.",
      code: "d = {'a': 1, 'a': 2}\nprint(d)  # {'a': 2}",
    },
  ],
  project: {
    title: "Telefon Kitobi",
    description: "Foydalanuvchilarni qo'shish, qidirish va o'chirish mumkin bo'lgan telefon kitobi yarating.",
    tasks: [
      "Bo'sh dict yarating",
      "3 ta kontakt qo'shing",
      "Bittasini qidiring (get)",
      "Bittasini o'chiring (del)",
    ],
    starterCode: `# Telefon kitobi
contacts = {}

# TODO: 3 ta kontakt qo'shing
contacts[...] = ...
contacts[...] = ...
contacts[...] = ...

# TODO: "Ali" ni qidiring
print(contacts.get(..., "Topilmadi"))

# TODO: birinchisini o'chiring
del contacts[...]

# Qolganlarni chiqaring
for name, phone in contacts.items():
    print(f"{name}: {phone}")`,
    solutionCode: `contacts = {}

contacts["Ali"] = "+998901234567"
contacts["Vali"] = "+998917654321"
contacts["Sardor"] = "+998931112233"

print(contacts.get("Ali", "Topilmadi"))

del contacts["Vali"]

for name, phone in contacts.items():
    print(f"{name}: {phone}")`,
    checkPoints: ["Dict yaratilgan", "3 ta kontakt qo'shilgan", "get() ishlatilgan", "del ishlatilgan"],
  },
  trickyQuestions: [
    {
      question: "Dict tartiblanganmi?",
      answer:
        "Python 3.7+ dan — **ha**, kiritilgan tartibda saqlanadi. Avvalgi versiyalarda tartib yo'q edi. Lekin dict'ning asosiy kuchi — tez qidirish (O(1) time complexity).",
    },
  ],
};

export { listTopic, tupleTopic, dictTopic };
