# 🚀 Deployment Guide

PyMentor'ni production'ga chiqarish bo'yicha to'liq qo'llanma.

## 📋 Pre-deployment Checklist

- [ ] `npm run build` muvaffaqiyatli
- [ ] Barcha mavzular to'liq
- [ ] Final Exam ishlayapti
- [ ] Certificate generatsiya ishlayapti
- [ ] LocalStorage saqlash ishlayapti
- [ ] Dark/Light mode ishlayapti
- [ ] Responsive dizayn tekshirilgan

## 🌐 Deployment variantlari

### 1. Vercel (Eng oson — tavsiya etiladi)

**Vaqt:** 2 daqiqa  
**Narx:** Bepul (hobby plan)

```bash
# 1. Vercel CLI o'rnating
npm i -g vercel

# 2. Loyihani deploy qiling
vercel

# 3. Production'ga chiqarish
vercel --prod
```

**Yoki (tavsiya):**
1. GitHub reposini yarating
2. [vercel.com](https://vercel.com) da signup qiling
3. "Import Project" → GitHub reposini tanlang
4. Auto-deploy yoqiladi

**Konfiguratsiya:**
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### 2. Netlify

**Vaqt:** 3 daqiqa  
**Narx:** Bepul

```bash
# 1. Netlify CLI o'rnating
npm i -g netlify-cli

# 2. Build
npm run build

# 3. Deploy
netlify deploy --prod --dir=dist
```

**Yoki:**
1. [netlify.com](https://netlify.com) ga kiring
2. GitHub reposini ulang
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### 3. GitHub Pages

**Vaqt:** 5 daqiqa  
**Narx:** Bepul

```bash
# 1. gh-pages paketini o'rnating
npm install -D gh-pages

# 2. package.json'ga script qo'shing
# "deploy": "npm run build && gh-pages -d dist"

# 3. Deploy
npm run deploy
```

**GitHub repo settings:**
- Settings → Pages
- Source: `gh-pages` branch

### 4. Cloudflare Pages

**Vaqt:** 3 daqiqa  
**Narx:** Bepul (unlimited)

1. [pages.cloudflare.com](https://pages.cloudflare.com)
2. "Create a project" → Connect to Git
3. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`

### 5. Docker

**Vaqt:** 10 daqiqa  
**Narx:** Server narxi

`Dockerfile`:
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
```

```bash
# Build
docker build -t pymenor .

# Run
docker run -d -p 8080:80 pymenor
```

### 6. Self-hosted (VPS)

**Vaqt:** 30 daqiqa  
**Narx:** $5-20/oy

```bash
# 1. Server'ga SSH
ssh user@your-server.com

# 2. Node.js o'rnatish
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Nginx o'rnatish
sudo apt install nginx

# 4. Loyihani klonlash
git clone <your-repo>
cd pymenor

# 5. Build
npm ci
npm run build

# 6. Nginx konfiguratsiyasi
sudo nano /etc/nginx/sites-available/pymenor
```

Nginx config:
```nginx
server {
    listen 80;
    server_name pymenor.com;
    root /home/user/pymenor/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # SSL (Let's Encrypt)
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/pymenor.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/pymenor.com/privkey.pem;
}
```

```bash
# 7. Saytni yoqish
sudo ln -s /etc/nginx/sites-available/pymenor /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 8. SSL sertifikat
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d pymenor.com
```

## 🔧 Environment Variables

Hozircha env variable'lar yo'q. Agar qo'shmoqchi bo'lsangiz:

```bash
# .env.production
VITE_API_URL=https://api.pymenor.com
VITE_ANALYTICS_ID=UA-XXXXX-X
```

## 📊 Performance Optimization

### Build optimization

`vite.config.ts` ga qo'shing:
```typescript
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
      },
    },
  },
}
```

### Image optimization

Rasmlarni WebP formatida saqlang va lazy loading qiling.

### Caching

Nginx yoki CDN da static assets uchun cache:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔍 Monitoring

### Analytics

Google Analytics qo'shish:
```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

### Error tracking

Sentry qo'shish:
```bash
npm install @sentry/react
```

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## 🔄 CI/CD

### GitHub Actions

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🛡️ Security

### Content Security Policy

Nginx da:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
```

### HTTPS

Har doim HTTPS ishlating (Let's Encrypt bepul).

### Dependencies audit

```bash
npm audit
npm audit fix
```

## 📈 Scaling

PyMentor static site — cheksiz scale qiladi:
- CDN orqali (Cloudflare, Vercel, Netlify)
- Global edge locations
- Zero server maintenance

## 🆘 Troubleshooting

### Build error
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on refresh (SPA routing)
Nginx da `try_files $uri $uri/ /index.html;` qo'shing.

### CORS error
Backend qo'shsangiz, CORS header'larni sozlang.

### LocalStorage quota exceeded
Foydalanuvchiga xabar bering va eski ma'lumotlarni tozalang.

## ✅ Post-deployment

- [ ] Saytni tekshiring (barcha sahifalar)
- [ ] Mobile versiyani tekshiring
- [ ] Performance test (Lighthouse)
- [ ] Analytics ishlayotganini tekshiring
- [ ] Error tracking ishlayotganini tekshiring
- [ ] SEO meta taglarini tekshiring
- [ ] SSL sertifikatini tekshiring

## 📞 Yordam

Muammo bo'lsa:
1. [GitHub Issues](issues) oching
2. Email: support@pymenor.com
3. Discord: [PyMentor Community](https://discord.gg/pymenor)

---

**Muvaffaqiyatli deploy! 🚀**
