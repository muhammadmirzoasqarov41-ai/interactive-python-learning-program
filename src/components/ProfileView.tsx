import { useState, type ReactNode } from "react";
import type { AppState, UserProfile } from "../types";
import { Badge, Button, Card, Icon } from "./ui";

export function ProfileView({
  profile,
  state,
  onBack,
  onSave,
  onActivateKey,
  onLogout,
  telegramUrl,
}: {
  profile: UserProfile;
  state: AppState;
  onBack: () => void;
  onSave: (input: { fullName: string; phone: string }) => Promise<void>;
  onActivateKey: (code: string) => Promise<void>;
  onLogout: () => Promise<void>;
  telegramUrl: string;
}) {
  const [fullName, setFullName] = useState(profile.fullName);
  const [phone, setPhone] = useState(profile.phone);
  const [accessKey, setAccessKey] = useState("");
  const [saving, setSaving] = useState(false);
  const [activating, setActivating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const completedCount = Object.values(state.topicProgress).filter((item) => item.completed).length;

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      await onSave({ fullName: fullName.trim(), phone: phone.trim() });
      setMessage("Profil ma'lumotlari yangilandi.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Saqlashda xatolik bo'ldi.");
    } finally {
      setSaving(false);
    }
  }

  async function handleActivate() {
    setActivating(true);
    setMessage(null);
    setError(null);
    try {
      await onActivateKey(accessKey.trim().toUpperCase());
      setAccessKey("");
      setMessage("Access key muvaffaqiyatli aktivlashtirildi.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Access key faollashmadi.");
    } finally {
      setActivating(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <Icon name="back" className="h-4 w-4" />
        Dashboard'ga qaytish
      </button>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <Badge color={profile.isPremium ? "amber" : "slate"}>
                {profile.isPremium ? "Premium active" : "Free plan"}
              </Badge>
              <h1 className="mt-3 text-3xl font-bold text-white">Profil va sozlamalar</h1>
              <p className="mt-2 text-slate-400">
                User ma'lumotlari, premium access va learning holati shu yerda boshqariladi.
              </p>
            </div>
            <Button onClick={() => void onLogout()} variant="ghost" size="sm" className="text-rose-300">
              Chiqish
            </Button>
          </div>

          <div className="space-y-4">
            <Field label="Ism">
              <input value={fullName} onChange={(event) => setFullName(event.target.value)} className={inputClass} />
            </Field>
            <Field label="Telefon">
              <input value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} />
            </Field>
            <Field label="Gmail">
              <input value={profile.email} disabled className={`${inputClass} cursor-not-allowed opacity-70`} />
            </Field>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={() => void handleSave()} variant="primary" size="md" disabled={saving || !fullName.trim() || !phone.trim()}>
              {saving ? "Saqlanmoqda..." : "Ma'lumotni saqlash"}
            </Button>
          </div>

          {(message || error) && (
            <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${error ? "border-rose-500/20 bg-rose-500/10 text-rose-200" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"}`}>
              {error || message}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Access Key</h2>
              <Badge color="violet">6 belgili</Badge>
            </div>
            <p className="mb-4 text-sm text-slate-400">
              Access key admindan olinadi. Shu yerga kiritib premium darslarni ochasiz.
            </p>
            <input
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value.toUpperCase().slice(0, 6))}
              placeholder="A7K2P9"
              className={`${inputClass} font-mono uppercase tracking-[0.3em]`}
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button onClick={() => void handleActivate()} variant="success" size="md" disabled={activating || accessKey.trim().length < 6}>
                {activating ? "Tekshirilmoqda..." : "Activate Key"}
              </Button>
              <a
                href={telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
              >
                Get Key
              </a>
            </div>
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
              Keyingi darslikga o'tish uchun access key sotib oling. Adminga Telegram orqali murojaat qiling: `@cyberscmmr`
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-white">O'quv holati</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Stat title="Tugallangan dars" value={`${completedCount}`} />
              <Stat title="Umumiy XP" value={`${state.totalXP}`} />
              <Stat title="Level" value={`${state.level}`} />
              <Stat title="Final exam" value={state.finalExamTaken ? `${state.finalExamScore}%` : "Topshirilmagan"} />
            </div>
            <div className="mt-4 text-sm text-slate-400">
              Premium muddati: {profile.premiumExpiresAt ? new Date(profile.premiumExpiresAt).toLocaleDateString("uz-UZ") : "Faol emas"}
            </div>
          </Card>
        </div>
      </div>
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

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20";
