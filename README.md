# 🐍 PyMentor — Python Fundamentals Interactive Course

> Python'ning 11 ta asosiy data type'ini chuqur o'rganish uchun interaktiv, gamifikatsiyalangan platforma.

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)

## ✨ Xususiyatlari

- **11 ta mavzu** — int, float, str, bool, list, tuple, dict, set, NoneType, complex, bytes
- **Chuqur tushuntirishlar** — definition, real-life analogy, syntax, misollar (line-by-line)
- **Xatolar bo'limi** — eng keng tarqalgan xatolar va yechimlar
- **Interaktiv mashqlar** — output prediction, type detection, code fixing
- **Quiz tizimi** — har bir mavzu uchun mini-quiz
- **Amaliy loyihalar** — har bir mavzuda real-world loyiha
- **Qiyin savollar** — chuqur o'ylashga majbur qiluvchi savollar
- **Final Exam** — barcha mavzulardan 15 ta savol
- **XP va Level system** — gamifikatsiya
- **Achievement badges** — yutuqlar
- **Certificate** — 80%+ natija bilan "Python Fundamentals Master" sertifikati
- **Dark/Light mode** — qulay tema
- **Local save** — progress brauzerda saqlanadi
- **Syntax highlighting** — Python kodi chiroyli ko'rsatiladi
- **Responsive design** — mobil va desktop

## 🏗️ Arxitektura

```
pymenor/
├── index.html                  # Entry point
├── src/
│   ├── App.tsx                 # Main app + router
│   ├── main.tsx                # React mount
│   ├── index.css               # Tailwind + animations
│   ├── types.ts                # TypeScript interfaces
│   ├── hooks/
│   │   └── useProgress.ts      # Progress state (localStorage)
│   ├── data/
│   │   ├── topics.ts           # All topics index
│   │   ├── topics_part1.ts     # int, float, str, bool
│   │   ├── topics_part2.ts     # list, tuple, dict
│   │   ├── topics_part3.ts     # set, None, complex, bytes
│   │   └── finalExam.ts        # 15 ta final savol
│   ├── components/
│   │   ├── ui.tsx              # CodeBlock, Button, Card, etc.
│   │   ├── Header.tsx          # Top bar (XP, level, dark mode)
│   │   ├── Dashboard.tsx       # Mavzular grid + welcome
│   │   ├── TopicView.tsx       # Mavzu sahifasi (7 ta bo'lim)
│   │   ├── FinalExam.tsx       # Final imtihon
│   │   └── Certificate.tsx     # Sertifikat (yuklab olish)
│   └── utils/
│       └── cn.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Quick Start

### Talablar

- **Node.js** 18+ (LTS tavsiya etiladi)
- **npm** 9+ yoki **yarn**

### O'rnatish

```bash
# 1. Repozitoriyani klonlash
git clone <repo-url>
cd pymenor

# 2. Dependencies o'rnatish
npm install

# 3. Development server ishga tushirish
npm run dev
```

Brauzerda oching: **http://localhost:5173**

### Production Build

```bash
npm run build
```

Natija `dist/` papkasida bo'ladi. Bitta `index.html` fayl — barcha JS va CSS inline qilingan.

### Preview Production

```bash
npm run preview
```

## 📦 Dependencies

```
react ^18
react-dom ^18
tailwindcss ^4
typescript ^5
vite ^7
```

Barcha dependencies `package.json` da ko'rsatilgan.

## 💾 Ma'lumotlar bazasi strukturasi

PyMentor **client-side** app — ma'lumotlar bazasi yo'q. Barcha ma'lumotlar brauzerning `localStorage`ida saqlanadi.

### LocalStorage Schema

```typescript
interface AppState {
  currentTopic: string | null;
  currentView: "dashboard" | "topic" | "final" | "certificate";
  topicProgress: Record<string, {
    completed: boolean;
    xp: number;
    quizScore: number;
    exercisesDone: string[];
    projectDone: boolean;
    lastVisited: number; // timestamp
  }>;
  totalXP: number;
  level: number;          // calculated from totalXP
  achievements: string[]; // unlocked achievement IDs
  darkMode: boolean;
  studentName: string;
  finalExamTaken: boolean;
  finalExamScore: number; // 0-100
}
```

Storage key: `pymentor_state_v1`

### Nega localStorage?

- ✅ Zero-config (server talab qilinmaydi)
- ✅ Tez (network delay yo'q)
- ✅ Offline ishlaydi
- ✅ Foydalanuvchi ma'lumotlari shaxsiy qoladi
- ⚠️ Brauzer tozalansa yo'qoladi (future: backend qo'shish mumkin)

## 🎮 Gamification

### XP System

| Amal | XP |
|------|-----|
| Mashq bajarish | +25 |
| Quiz tugatish | +0-50 (natijaga qarab) |
| Loyiha tugatish | +75 |
| Mavzuni tugatish | +100 |
| Achievement | +20 |

### Level Formula

```
level = floor((1 + sqrt(1 + 8 * xp / 100)) / 2)
```

| Level | XP |
|-------|-----|
| 1 | 0 |
| 2 | 100 |
| 3 | 300 |
| 4 | 600 |
| 5 | 1000 |

### Achievements

| ID | Icon | Shart |
|----|------|-------|
| `first_topic` | 🌱 | 1 mavzu tugatildi |
| `five_topics` | 🚀 | 5 mavzu tugatildi |
| `all_topics` | 👑 | 11 mavzu tugatildi |
| `perfect_quiz` | 💯 | 1 ta quiz 100% |
| `final_master` | 🎓 | Final 80%+ |
| `first_100_xp` | ⚡ | 100 XP |

## 🌐 Deployment

### Vercel (tavsiya etiladi)

```bash
# 1. Vercel CLI o'rnatish
npm i -g vercel

# 2. Deploy
vercel
```

**Yoki GitHub'ga push qiling** — Vercel avtomatik deploy qiladi.

### Netlify

1. GitHub reposini Netlify'ga ulang
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages

```bash
# 1. Build
npm run build

# 2. gh-pages paketini o'rnatish
npm install -D gh-pages

# 3. Deploy
npm run deploy
```

### Docker

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t pymenor .
docker run -p 8080:80 pymenor
```

## 🔧 Konfiguratsiya

### Environment Variables

Hozircha env variable'lar yo'q. Agar backend qo'shmoqchi bo'lsangiz:

```bash
# .env
VITE_API_URL=https://your-api.com
```

### TypeScript

`tsconfig.json` — strict mode yoqilgan.

### Tailwind

`tailwind.config.js` — default konfiguratsiya. Custom ranglar `src/components/ui.tsx`da.

## 📝 Foydalanish

1. **Welcome screen** — ismingizni kiriting
2. **Dashboard** — 11 ta mavzuni ko'ring
3. **Mavzuni tanlang** — 7 ta bo'lim:
   - 👋 Kirish
   - 📖 O'rganish (definition, analogy, syntax, examples)
   - ⚠️ Xatolar
   - 💪 Mashqlar
   - 🎯 Quiz
   - 🛠️ Loyiha
   - 🧠 Qiyin savollar
4. **Final Exam** — 15 ta savol
5. **Certificate** — 80%+ natija bilan sertifikat

## 🐛 Troubleshooting

### "npm: command not found"
Node.js o'rnating: https://nodejs.org

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Build error
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### LocalStorage tozalash
Browser DevTools → Application → Local Storage → `pymentor_state_v1` ni o'chiring

## 🤝 Contributing

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/amazing`)
3. Commit qiling (`git commit -m 'feat: add amazing feature'`)
4. Push qiling (`git push origin feature/amazing`)
5. Pull Request oching

## 📄 License

MIT License — bepul foydalaning, o'zgartiring, ulashing!

## 👨‍🏫 Muallif

**PyMentor** — Python'ni o'rganishning eng yaxshi usuli.

## 🙏 Acknowledgments

- Python Software Foundation — Python tili uchun
- React team — UI framework
- Tailwind Labs — CSS framework
- Barcha o'rganuvchilarga — ilhom uchun

---

<div align="center">

**🐍 PyMentor bilan Python'ni seving! 🐍**

[Report Bug](issues) · [Request Feature](issues)

</div>
