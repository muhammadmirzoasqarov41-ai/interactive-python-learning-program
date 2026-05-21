import { useState, type ReactNode } from "react";
import type { AuthFormData } from "../types";
import { Badge, Button, Card, Icon } from "./ui";

export function AuthScreen({
  onLogin,
  onRegister,
  loading,
  error,
  mode,
}: {
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (form: AuthFormData) => Promise<void>;
  loading: boolean;
  error?: string | null;
  mode: string;
}) {
  const [tab, setTab] = useState<"login" | "register">("register");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState<AuthFormData>({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.18),_transparent_35%),linear-gradient(135deg,_#020617,_#111827_40%,_#0f172a)]" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />

      <div className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-emerald-500/20 bg-slate-950/70 p-8 backdrop-blur-xl sm:p-10">
          <Badge color="emerald">Premium Python Cohort</Badge>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            PyMentor endi bepul kurs emas, real premium learning platform bo‘lyapti.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Birinchi ikki dars bepul. Keyingi yo‘l premium access key bilan ochiladi. Har bir savolda Teacher AI yoningizda bo‘ladi, lekin javobni tayyor qilib bermaydi.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Feature icon="book" title="Structured path" text="1-int tugamasdan 2-float ochilmaydi." />
            <Feature icon="key" title="Access key" text="3-darsdan boshlab premium lock ishlaydi." />
            <Feature icon="sparkles" title="Teacher AI" text="Hint, debug va yo'nalish beradi." />
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-400">
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">Bepul: `int`, `float`</span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">Premium: qolgan 9 ta modul</span>
            <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2">Mode: {mode === "mock" ? "Demo" : "Firebase"}</span>
          </div>

          {mode === "mock" && (
            <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
              Demo rejimida admin sinovi uchun `admin@pymentor.dev / Admin123!` ishlatishingiz mumkin. Firebase env qo‘shilganda app avtomatik real backend rejimiga o‘tadi.
            </div>
          )}
        </div>

        <Card className="rounded-[2rem] border-white/10 bg-slate-950/80 p-6 sm:p-8">
          <div className="mb-6 flex rounded-2xl bg-slate-900/80 p-1">
            <button
              onClick={() => setTab("register")}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${tab === "register" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
            >
              Ro'yxatdan o'tish
            </button>
            <button
              onClick={() => setTab("login")}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition ${tab === "login" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-white"}`}
            >
              Kirish
            </button>
          </div>

          {tab === "register" ? (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void onRegister(registerForm);
              }}
            >
              <Field label="Ism">
                <input
                  value={registerForm.fullName}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  placeholder="Ali Valiyev"
                  className={inputClass}
                />
              </Field>
              <Field label="Telefon">
                <input
                  value={registerForm.phone}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="+998 90 123 45 67"
                  className={inputClass}
                />
              </Field>
              <Field label="Gmail">
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@gmail.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Parol">
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(event) => setRegisterForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder="Kamida 6 ta belgi"
                  className={inputClass}
                />
              </Field>

              {error && <ErrorBox error={error} />}

              <Button
                onClick={() => undefined}
                variant="success"
                size="lg"
                className="w-full"
                disabled={
                  loading ||
                  !registerForm.fullName.trim() ||
                  !registerForm.phone.trim() ||
                  !registerForm.email.trim() ||
                  registerForm.password.length < 6
                }
              >
                {loading ? "Yaratilmoqda..." : "Akkaunt yaratish"}
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void onLogin(loginForm.email, loginForm.password);
              }}
            >
              <Field label="Gmail">
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, email: event.target.value }))}
                  placeholder="you@gmail.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Parol">
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm((prev) => ({ ...prev, password: event.target.value }))}
                  placeholder="Parolingiz"
                  className={inputClass}
                />
              </Field>

              {error && <ErrorBox error={error} />}

              <Button
                onClick={() => undefined}
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading || !loginForm.email.trim() || !loginForm.password.trim()}
              >
                {loading ? "Kirilmoqda..." : "Tizimga kirish"}
                <Icon name="arrow" className="h-4 w-4" />
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div className="font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-slate-400">{text}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-slate-300">{label}</div>
      {children}
    </label>
  );
}

function ErrorBox({ error }: { error: string }) {
  return <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>;
}

const inputClass =
  "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20";
