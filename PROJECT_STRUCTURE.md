# 📋 Loyiha strukturasi

```
pymenor/
│
├── 📄 index.html                    # HTML entry point
├── 📄 package.json                  # NPM packages
├── 📄 tsconfig.json                 # TypeScript config
├── 📄 vite.config.ts                # Vite build config
├── 📄 README.md                     # Dokumentatsiya
├── 📄 PROJECT_STRUCTURE.md          # Bu fayl
│
└── 📁 src/
    ├── 📄 main.tsx                  # React DOM mount
    ├── 📄 App.tsx                   # Asosiy app komponenti
    ├── 📄 index.css                 # Global styles + animations
    ├── 📄 types.ts                  # TypeScript interfeyslari
    │
    ├── 📁 hooks/
    │   └── 📄 useProgress.ts        # Progress state management
    │                                 - localStorage
    │                                 - XP, level, achievements
    │
    ├── 📁 data/                     # Kontent (barcha mavzular)
    │   ├── 📄 topics.ts             # 11 ta mavzu index
    │   ├── 📄 topics_part1.ts       # int, float, str, bool
    │   ├── 📄 topics_part2.ts       # list, tuple, dict
    │   ├── 📄 topics_part3.ts       # set, None, complex, bytes
    │   └── 📄 finalExam.ts          # 15 ta final savol
    │
    ├── 📁 components/               # UI komponentlari
    │   ├── 📄 ui.tsx                # UI primitives
    │   │   - CodeBlock (syntax highlighting)
    │   │   - Button, Card, Badge
    │   │   - ProgressBar, Icon
    │   │   - useConfetti hook
    │   ├── 📄 Header.tsx            # Top bar
    │   ├── 📄 Dashboard.tsx         # Welcome + mavzular grid
    │   ├── 📄 TopicView.tsx         # Mavzu sahifasi
    │   │   - IntroSection
    │   │   - LearnSection
    │   │   - MistakesSection
    │   │   - ExercisesSection
    │   │   - QuizSection
    │   │   - ProjectSection
    │   │   - TrickySection
    │   ├── 📄 FinalExam.tsx         # Final imtihon
    │   └── 📄 Certificate.tsx       # Sertifikat
    │
    └── 📁 utils/
        └── 📄 cn.ts                 # Classname helper
```

## 📊 Fayl o'lchamlari (taxminan)

| Fayl | Qator | Vazifasi |
|------|-------|----------|
| `types.ts` | ~70 | TypeScript interfeyslari |
| `useProgress.ts` | ~180 | State management |
| `topics_part1.ts` | ~300 | 4 ta mavzu |
| `topics_part2.ts` | ~300 | 3 ta mavzu |
| `topics_part3.ts` | ~350 | 4 ta mavzu |
| `finalExam.ts` | ~130 | Final savollar |
| `ui.tsx` | ~230 | UI primitives + syntax highlighting |
| `Header.tsx` | ~70 | Header |
| `Dashboard.tsx` | ~220 | Dashboard |
| `TopicView.tsx` | ~550 | Mavzu sahifasi |
| `FinalExam.tsx` | ~230 | Final imtihon |
| `Certificate.tsx` | ~150 | Sertifikat |
| **Jami** | **~2780** | — |

## 🎯 Dizayn tamoyillari

### 1. Modularlik
Har bir mavzu alohida data obyekt sifatida. Yangi mavzu qo'shish oson:
```typescript
const newTopic: Topic = {
  id: "frozenset",
  title: "frozenset",
  // ... barcha maydonlar
};
ALL_TOPICS.push(newTopic);
```

### 2. Type Safety
TypeScript — barcha xatolar compile-time'da topiladi.

### 3. Performance
- Lazy rendering (faqat ko'rinadigan qismlar)
- LocalStorage batching
- Minimal re-renders (React hooks)

### 4. Accessibility
- Semantic HTML
- Keyboard navigation
- ARIA labels
- High contrast

### 5. Progressive Enhancement
JavaScript yo'q bo'lsa ham asosiy UI ko'rinadi.

## 🔄 Data Flow

```
User Action
    ↓
App.tsx (router)
    ↓
useProgress hook
    ↓
setState + localStorage
    ↓
Re-render
    ↓
UI update
```

## 🎨 UI/UX Flow

```
┌─────────────────────────────────────────┐
│           Welcome Screen                │
│   (ism kiritish)                        │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│           Dashboard                     │
│   - 11 ta mavzu grid                    │
│   - Progress stats                      │
│   - Achievements                        │
│   - Final Exam button                   │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│           TopicView                     │
│   ┌─ Intro                              │
│   ├─ Learn                              │
│   ├─ Mistakes                           │
│   ├─ Exercises                          │
│   ├─ Quiz                               │
│   ├─ Project                            │
│   └─ Tricky                             │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│           Final Exam                    │
│   (15 ta savol)                         │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│           Certificate                   │
│   (agar 80%+ bo'lsa)                    │
└─────────────────────────────────────────┘
```

## 🔐 Xavfsizlik

- Hech qanday tashqi API chaqiruvi yo'q
- Foydalanuvchi ma'lumotlari faqat lokal saqlanadi
- XSS himoyasi (React auto-escape)
- CSP header tavsiya etiladi

## 🚀 Kelajak rejalar

- [ ] Backend (Node.js + PostgreSQL) qo'shish
- [ ] User auth (login/register)
- [ ] Cloud sync (multi-device)
- [ ] Code playground (Pyodide)
- [ ] Voice explanations
- [ ] Multi-language support
- [ ] Leaderboard
- [ ] Social sharing
- [ ] Mobile app (React Native)

## 📚 Qo'shimcha resurslar

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)
- [Python Docs](https://docs.python.org/3/)
