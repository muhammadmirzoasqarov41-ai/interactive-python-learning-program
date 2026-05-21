import { ALL_TOPICS } from "../data/topics";
import { ensureTopicProgress } from "../hooks/useProgress";
import type { AppState, LearningGate, UserProfile } from "../types";
import { Badge, Button, Card, Icon, ProgressBar } from "./ui";

export function Dashboard({
  state,
  profile,
  onSelectTopic,
  onFinalExam,
  onProfile,
  onAdmin,
  onAccessKey,
  getGate,
  mode,
}: {
  state: AppState;
  profile: UserProfile;
  onSelectTopic: (id: string) => void;
  onFinalExam: () => void;
  onProfile: () => void;
  onAdmin: () => void;
  onAccessKey: () => void;
  getGate: (topicId: string) => LearningGate;
  mode: string;
}) {
  const completedCount = Object.values(state.topicProgress).filter((p) => p.completed).length;
  const totalTopics = ALL_TOPICS.length;
  const progressPct = (completedCount / totalTopics) * 100;
  const allTopicsCompleted = completedCount === totalTopics;
  const canTakeFinal = completedCount >= 2;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-8 overflow-hidden rounded-[2rem] border border-slate-800 bg-[linear-gradient(135deg,rgba(5,150,105,0.18),rgba(15,23,42,0.95)_38%,rgba(245,158,11,0.16))] p-6 sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
              <Icon name="sparkles" className="h-3 w-3" />
              {profile.isPremium ? "Premium student" : "Free track"} · Mode: {mode === "mock" ? "Demo" : "Firebase"}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Salom, {profile.fullName}. Python yo‘lingiz ancha jiddiy tus oldi.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              `int` va `float` bepul. Qolgan modullar premium access key bilan ochiladi. Har bir mashq yonida Teacher AI bor va u sizni yechimga yaqinlashtiradi.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={onProfile} variant="secondary" size="lg">
                <Icon name="user" className="h-4 w-4" />
                Profile
              </Button>
              <Button onClick={onAccessKey} variant="success" size="lg">
                <Icon name="key" className="h-4 w-4" />
                Access Key
              </Button>
              {profile.role === "admin" && (
                <Button onClick={onAdmin} variant="ghost" size="lg" className="border border-amber-500/20 bg-amber-500/10 text-amber-100">
                  <Icon name="shield" className="h-4 w-4" />
                  Admin panel
                </Button>
              )}
            </div>
          </div>

          <div className="grid w-full gap-4 sm:grid-cols-3 lg:w-auto lg:min-w-[420px]">
            <Metric title="Level" value={`${state.level}`} description={`${state.totalXP} XP`} />
            <Metric title="Progress" value={`${Math.round(progressPct)}%`} description={`${completedCount}/${totalTopics} dars`} />
            <Metric
              title="Plan"
              value={profile.isPremium ? "Premium" : "Free"}
              description={profile.premiumExpiresAt ? `Expiry ${new Date(profile.premiumExpiresAt).toLocaleDateString("uz-UZ")}` : "Access key bilan ochiladi"}
            />
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Learning Roadmap</h2>
            <Badge color="emerald">{completedCount} tugallangan</Badge>
          </div>
          <ProgressBar value={completedCount} max={totalTopics} color="emerald" />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <RoadmapItem index={1} title="int" text="Birinchi dars, ochiq." active />
            <RoadmapItem index={2} title="float" text="int tugagach ochiladi." active={completedCount >= 1} />
            <RoadmapItem index={3} title="premium track" text="Access key bilan ochiladi." active={profile.isPremium} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Premium eslatma</h2>
            <Badge color="amber">Monetization</Badge>
          </div>
          <p className="text-sm leading-7 text-slate-300">
            Agar user birinchi 2 ta bepul darsni tugatsa, 3-darsga o‘tishda access key talab qilinadi. Shunda unga Telegram orqali `@cyberscmmr` ga murojaat qilish xabari ko‘rsatiladi.
          </p>
          <Button onClick={onAccessKey} variant="primary" size="md" className="mt-4">
            Access Key bo'limi
          </Button>
        </Card>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Darslar</h2>
        <Badge color="slate">{profile.email}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_TOPICS.map((topic, idx) => {
          const progress = ensureTopicProgress(state, topic.id);
          const gate = getGate(topic.id);
          const isCompleted = progress.completed;
          const progressValue = getTopicCompletion(progress);

          return (
            <button
              key={topic.id}
              onClick={() => onSelectTopic(topic.id)}
              className={`group relative overflow-hidden rounded-3xl border p-5 text-left transition ${
                gate.locked
                  ? "border-slate-800 bg-slate-900/40 opacity-90"
                  : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900 hover:shadow-2xl hover:shadow-emerald-500/5"
              }`}
            >
              <div className="absolute right-4 top-4 text-xs font-bold text-slate-600">
                #{String(idx + 1).padStart(2, "0")}
              </div>
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${topic.accent} text-3xl shadow-lg`}>
                {topic.icon}
              </div>

              <div className="mb-3 flex items-center gap-2">
                <h3 className="font-mono text-lg font-bold text-white">{topic.title}</h3>
                <Badge color={idx < 2 ? "emerald" : "amber"}>{idx < 2 ? "Free" : "Premium"}</Badge>
              </div>
              <p className="mb-4 text-sm text-slate-400">{topic.subtitle}</p>
              <ProgressBar value={progressValue} max={100} color={isCompleted ? "emerald" : "violet"} />

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span>{progress.exercisesDone.length}/{topic.exercises.length} mashq</span>
                  <span>{progress.quizScore}% quiz</span>
                </div>
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400">
                    <Icon name="check" className="h-3 w-3" />
                    Tugadi
                  </span>
                ) : gate.locked ? (
                  <span className="inline-flex items-center gap-1 text-amber-300">
                    <Icon name="lock" className="h-3 w-3" />
                    Locked
                  </span>
                ) : (
                  <span className="text-sky-300">Open</span>
                )}
              </div>

              {gate.locked && gate.message && (
                <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-3 py-3 text-sm text-amber-100">
                  {gate.message}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <div className={`relative overflow-hidden rounded-3xl border p-8 ${allTopicsCompleted ? "border-amber-500/30 bg-gradient-to-br from-amber-950 via-slate-900 to-orange-950" : "border-slate-800 bg-slate-900/50"}`}>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-4xl shadow-lg shadow-amber-500/30">
                🏆
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Final Imtihon</h2>
                <p className="text-slate-400">
                  {canTakeFinal
                    ? "Bepul track tugagach ham final exam ishlayveradi, lekin premium yo'l bilan ko'proq tayyor bo'lasiz."
                    : "Avval kamida 2 ta darsni tugating."}
                </p>
              </div>
            </div>
            <Button onClick={onFinalExam} variant={canTakeFinal ? "primary" : "secondary"} size="lg" disabled={!canTakeFinal}>
              <Icon name="trophy" className="h-4 w-4" />
              {state.finalExamTaken ? "Qayta topshirish" : "Boshlash"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-bold text-white">{value}</div>
      <div className="mt-1 text-sm text-slate-400">{description}</div>
    </div>
  );
}

function RoadmapItem({
  index,
  title,
  text,
  active,
}: {
  index: number;
  title: string;
  text: string;
  active: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-4 ${active ? "border-emerald-500/20 bg-emerald-500/10" : "border-slate-800 bg-slate-950/60"}`}>
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Step {index}</div>
      <div className="mt-2 font-semibold text-white">{title}</div>
      <div className="mt-1 text-sm text-slate-400">{text}</div>
    </div>
  );
}

function getTopicCompletion(p: { exercisesDone: string[]; quizScore: number; projectDone: boolean }) {
  let score = 0;
  score += Math.min(40, p.exercisesDone.length * 15);
  score += p.quizScore * 0.3;
  if (p.projectDone) score += 30;
  return Math.min(100, Math.round(score));
}
