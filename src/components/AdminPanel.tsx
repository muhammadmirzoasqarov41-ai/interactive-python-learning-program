import { useEffect, useState } from "react";
import type { AccessKeyRecord } from "../types";
import { Badge, Button, Card, Icon } from "./ui";
import type { AdminOverview } from "../hooks/useAuthSession";

export function AdminPanel({
  onLoad,
  onCreate,
  onBackHome,
  onLogout,
  isAllowed,
}: {
  onLoad: () => Promise<AdminOverview>;
  onCreate: (durationDays: number, note: string) => Promise<AccessKeyRecord>;
  onBackHome: () => void;
  onLogout: () => Promise<void>;
  isAllowed: boolean;
}) {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [durationDays, setDurationDays] = useState(30);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isAllowed) {
      setLoading(false);
      return;
    }
    void refresh();
  }, [isAllowed]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await onLoad();
      setOverview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Admin ma'lumotlari yuklanmadi.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    setCreating(true);
    setError(null);
    setSuccess(null);
    try {
      const created = await onCreate(durationDays, note.trim());
      setSuccess(`Yangi key yaratildi: ${created.code}`);
      setNote("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Key yaratilmadi.");
    } finally {
      setCreating(false);
    }
  }

  if (!isAllowed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Card className="p-8 text-center">
          <div className="mb-4 text-5xl">🔒</div>
          <h1 className="text-3xl font-bold text-white">Admin access kerak</h1>
          <p className="mt-3 text-slate-400">
            `/admin` bo‘limi faqat admin user uchun ochiladi.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={onBackHome} variant="secondary" size="lg">
              Asosiy sahifa
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge color="amber">/admin</Badge>
          <h1 className="mt-3 text-3xl font-bold text-white">Admin Panel</h1>
          <p className="mt-2 text-slate-400">
            Access key yaratish, premium holatni nazorat qilish va monetizatsiya oqimini boshqarish shu yerda.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={onBackHome} variant="secondary" size="md">
            Kursga qaytish
          </Button>
          <Button onClick={() => void onLogout()} variant="ghost" size="md" className="text-rose-300">
            Logout
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white">Yangi access key</h2>
          <p className="mt-2 text-sm text-slate-400">
            Key random yaratiladi. Muddat kunlarda beriladi.
          </p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <div className="mb-2 text-sm font-medium text-slate-300">Muddat (kun)</div>
              <input
                type="number"
                value={durationDays}
                min={1}
                onChange={(event) => setDurationDays(Math.max(1, Number(event.target.value) || 1))}
                className={inputClass}
              />
            </label>
            <label className="block">
              <div className="mb-2 text-sm font-medium text-slate-300">Izoh</div>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={4}
                placeholder="Masalan: 30 kunlik premium, may kampaniyasi"
                className={`${inputClass} resize-none`}
              />
            </label>
            <Button onClick={() => void handleCreate()} variant="primary" size="lg" className="w-full" disabled={creating}>
              {creating ? "Yaratilmoqda..." : "Random access key yaratish"}
              <Icon name="key" className="h-4 w-4" />
            </Button>
          </div>

          {(success || error) && (
            <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${error ? "border-rose-500/20 bg-rose-500/10 text-rose-200" : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"}`}>
              {error || success}
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <Stat title="Jami" value={`${overview?.stats.total || 0}`} />
            <Stat title="Active" value={`${overview?.stats.active || 0}`} />
            <Stat title="Used" value={`${overview?.stats.used || 0}`} />
            <Stat title="Expired" value={`${overview?.stats.expired || 0}`} />
          </div>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Yaratilgan keylar</h2>
              <Button onClick={() => void refresh()} variant="ghost" size="sm">
                Yangilash
              </Button>
            </div>

            {loading ? (
              <div className="text-sm text-slate-400">Ma'lumotlar yuklanmoqda...</div>
            ) : overview && overview.keys.length > 0 ? (
              <div className="space-y-3">
                {overview.keys.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="font-mono text-lg font-bold tracking-[0.25em] text-white">{item.code}</div>
                        <div className="mt-1 text-sm text-slate-400">
                          {item.durationDays} kun · {item.note || "Izoh yo'q"}
                        </div>
                      </div>
                      <Badge color={badgeColor(item.status)}>{item.status}</Badge>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-400 sm:grid-cols-3">
                      <div>Yaratilgan: {formatDate(item.createdAt)}</div>
                      <div>Ishlatilgan: {item.usedAt ? formatDate(item.usedAt) : "Hali yo'q"}</div>
                      <div>Expiry: {formatDate(item.expiresAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-400">Hozircha keylar yo'q.</div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <Card className="border-slate-800 bg-slate-900/70 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
    </Card>
  );
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("uz-UZ") : "Noma'lum";
}

function badgeColor(status: string) {
  if (status === "active") return "emerald";
  if (status === "used") return "amber";
  if (status === "expired") return "rose";
  return "slate";
}

const inputClass =
  "w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20";
