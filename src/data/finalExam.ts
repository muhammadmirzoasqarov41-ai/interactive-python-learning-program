import type { QuizQuestion } from "../types";

// Final Exam — barcha 11 ta mavzudan
export const FINAL_EXAM: QuizQuestion[] = [
  // int
  {
    id: "final-1",
    question: "`print(17 // 3)` natijasi nima?",
    code: "print(17 // 3)",
    options: ["5.666", "5", "6", "Error"],
    correctIndex: 1,
    explanation: "`//` butun bo'linish — pastga yaxlitlaydi. 17/3 = 5.66, butun = 5.",
  },
  // float
  {
    id: "final-2",
    question: "`print(0.1 + 0.2 == 0.3)` natijasi?",
    options: ["True", "False", "Error", "0.3"],
    correctIndex: 1,
    explanation: "Float aniq emas! 0.1+0.2 = 0.30000000000000004. `math.isclose()` ishlating.",
  },
  // string
  {
    id: "final-3",
    question: "`'python'[::-1]` natijasi?",
    code: "print('python'[::-1])",
    options: ["'python'", "'nohtyp'", "'pytho'", "Error"],
    correctIndex: 1,
    explanation: "`[::-1]` — string'ni teskari qiladi. 'python' → 'nohtyp'.",
  },
  // bool
  {
    id: "final-4",
    question: "`True + True + False` natijasi?",
    options: ["TrueTrueFalse", "2", "1", "Error"],
    correctIndex: 1,
    explanation: "bool — int'ning subclass'i. True=1, False=0. 1+1+0 = 2.",
  },
  // list
  {
    id: "final-5",
    question: "Nima chiqadi?",
    code: "a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))",
    options: ["3", "4", "Error", "None"],
    correctIndex: 1,
    explanation: "`b = a` — havola. `a` va `b` bitta list. `b` o'zgarsa, `a` ham o'zgaradi.",
  },
  // tuple
  {
    id: "final-6",
    question: "Qaysi biri 1 elementli tuple?",
    options: ["(1)", "(1,)", "tuple(1)", "[1]"],
    correctIndex: 1,
    explanation: "`(1,)` — vergul bilan. `(1)` bu oddiy int.",
  },
  // dict
  {
    id: "final-7",
    question: "Qaysi biri dict kaliti bo'la olmaydi?",
    options: ["'name'", "42", "(1, 2)", "[1, 2]"],
    correctIndex: 3,
    explanation: "List mutable — hashable emas. Dict kaliti immutable bo'lishi kerak.",
  },
  // set
  {
    id: "final-8",
    question: "`{1, 2, 3} & {2, 3, 4}` natijasi?",
    options: ["{1,2,3,4}", "{2,3}", "{1,4}", "Error"],
    correctIndex: 1,
    explanation: "`&` — kesishma. Ikkalasida ham bor: 2 va 3.",
  },
  // NoneType
  {
    id: "final-9",
    question: "None'ni qanday tekshirish to'g'ri?",
    options: ["if x == None", "if x is None", "if x = None", "if None(x)"],
    correctIndex: 1,
    explanation: "PEP 8 bo'yicha `is None` to'g'ri usul.",
  },
  // complex
  {
    id: "final-10",
    question: "`(3+4j).real` natijasi?",
    options: ["3.0", "4.0", "3+4j", "7.0"],
    correctIndex: 0,
    explanation: "`real` — haqiqiy qism: 3.0.",
  },
  // bytes
  {
    id: "final-11",
    question: "`len(b'hello')` natijasi?",
    options: ["1", "5", "10", "Error"],
    correctIndex: 1,
    explanation: "ASCII belgilar — har biri 1 bayt. 5 ta harf = 5 bayt.",
  },
  // Mixed
  {
    id: "final-12",
    question: "Qaysi biri mutable EMAS?",
    options: ["list", "dict", "set", "tuple"],
    correctIndex: 3,
    explanation: "Tuple immutable. List, dict, set — mutable.",
  },
  {
    id: "final-13",
    question: "`type({})` nima qaytaradi?",
    options: ["set", "dict", "list", "tuple"],
    correctIndex: 1,
    explanation: "`{}` — bu dict! Bo'sh set uchun `set()` kerak.",
  },
  {
    id: "final-14",
    question: "`print(bool([]))` natijasi?",
    options: ["True", "False", "[]", "Error"],
    correctIndex: 1,
    explanation: "Bo'sh list — falsy. `bool([])` = False.",
  },
  {
    id: "final-15",
    question: "`'5' + 5` natijasi?",
    code: "print('5' + 5)",
    options: ["'55'", "10", "'5'5", "TypeError"],
    correctIndex: 3,
    explanation: "String + int — TypeError! `'5' + str(5)` = '55'.",
  },
];
