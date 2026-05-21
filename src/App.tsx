import { useEffect, useMemo, useState } from "react";
import { AdminPanel } from "./components/AdminPanel";
import { AuthScreen } from "./components/AuthScreen";
import { Certificate } from "./components/Certificate";
import { Dashboard } from "./components/Dashboard";
import { FinalExam } from "./components/FinalExam";
import { Header } from "./components/Header";
import { ProfileView } from "./components/ProfileView";
import { TopicView } from "./components/TopicView";
import { Card, Button } from "./components/ui";
import { useAuthSession, isAdminSession } from "./hooks/useAuthSession";
import { useProgress } from "./hooks/useProgress";
import { ALL_TOPICS, getTopicById } from "./data/topics";
import type { LearningGate } from "./types";

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return {
    pathname,
    navigate(nextPath: string) {
      if (nextPath !== window.location.pathname) {
        window.history.pushState({}, "", nextPath);
        setPathname(nextPath);
      }
    },
  };
}

function hasPremium(profile: ReturnType<typeof useAuthSession>["profile"]) {
  if (!profile?.isPremium) return false;
  if (!profile.premiumExpiresAt) return true;
  return new Date(profile.premiumExpiresAt).getTime() > Date.now();
}

export default function App() {
  const auth = useAuthSession();
  const path = usePathname();
  const profile = auth.profile;
  const course = useProgress(auth.session?.uid || "guest", profile?.fullName || "");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [paywallMessage, setPaywallMessage] = useState<string | null>(null);

  const completedTopics = useMemo(
    () =>
      Object.entries(course.state.topicProgress)
        .filter(([, progress]) => progress.completed)
        .map(([topicId]) => topicId),
    [course.state.topicProgress]
  );

  useEffect(() => {
    const completedCount = Object.values(course.state.topicProgress).filter((p) => p.completed).length;
    if (completedCount >= 1) course.unlockAchievement("first_topic");
    if (completedCount >= 5) course.unlockAchievement("five_topics");
    if (completedCount >= ALL_TOPICS.length) course.unlockAchievement("all_topics");
    if (course.state.totalXP >= 100) course.unlockAchievement("first_100_xp");
    const perfectQuiz = Object.values(course.state.topicProgress).some((p) => p.quizScore === 100);
    if (perfectQuiz) course.unlockAchievement("perfect_quiz");
    if (course.state.finalExamScore >= 80) course.unlockAchievement("final_master");
  }, [course, course.state]);

  useEffect(() => {
    if (!auth.session || !profile) return;
    if (JSON.stringify(profile.completedTopics) === JSON.stringify(completedTopics)) return;
    void auth.syncCompletedTopics(completedTopics);
  }, [auth, auth.session, profile, completedTopics]);

  const getGate = (topicId: string): LearningGate => {
    const topicIndex = ALL_TOPICS.findIndex((topic) => topic.id === topicId);
    if (topicIndex <= 0) {
      return { locked: false, reason: "available" };
    }

    const firstTopic = ensureCompleted(ALL_TOPICS[0].id, course.state.topicProgress);
    if (topicIndex === 1) {
      return firstTopic
        ? { locked: false, reason: "available" }
        : {
            locked: true,
            reason: "complete_previous",
            message: "Avval 1-dars `int` ni to'liq tugating. Shundan keyin `float` ochiladi.",
          };
    }

    const secondTopic = ensureCompleted(ALL_TOPICS[1].id, course.state.topicProgress);
    if (!firstTopic || !secondTopic) {
      return {
        locked: true,
        reason: "finish_free_track",
        message: "Avval bepul 2 ta darsni tugating: `int` va `float`.",
      };
    }

    if (!hasPremium(profile)) {
      return {
        locked: true,
        reason: "premium_required",
        message:
          "Keyingi darslikga o'tish uchun access key sotib oling! Adminga telegram orqali murojaat qiling @cyberscmmr Narxlar arzon ulgurib qoling!",
      };
    }

    return { locked: false, reason: "available" };
  };

  const currentTopic = course.state.currentTopic ? getTopicById(course.state.currentTopic) : null;

  async function handleRegister(form: Parameters<typeof auth.register>[0]) {
    setAuthBusy(true);
    setAuthError(null);
    try {
      await auth.register(form);
      path.navigate("/");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Ro'yxatdan o'tishda xatolik bo'ldi.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleLogin(email: string, password: string) {
    setAuthBusy(true);
    setAuthError(null);
    try {
      await auth.login(email, password);
      path.navigate("/");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Kirishda xatolik bo'ldi.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleLogout() {
    await auth.logout();
    course.resetProgress();
    path.navigate("/");
  }

  function handleTopicSelect(topicId: string) {
    const gate = getGate(topicId);
    if (gate.locked) {
      setPaywallMessage(gate.message || "Bu dars hozircha yopiq.");
      return;
    }
    course.goToTopic(topicId);
  }

  function handleReset() {
    if (confirm("Rostdan ham shu userning barcha progress'ni o'chirmoqchimisiz?")) {
      course.resetProgress();
    }
  }

  function handleFinalExamSubmit(score: number) {
    course.submitFinalExam(score);
    if (score >= 80) {
      window.setTimeout(() => course.goToCertificate(), 1200);
    }
  }

  const showAdmin = path.pathname === "/admin";

  if (auth.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-200">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 px-6 py-5">
          Session yuklanmoqda...
        </div>
      </div>
    );
  }

  if (!auth.session || !profile) {
    return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} loading={authBusy} error={authError} mode={auth.mode} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(249,115,22,0.15),_transparent_30%),linear-gradient(180deg,_#020617,_#0f172a)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.18) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <Header
        state={course.state}
        profile={profile}
        onHome={() => {
          path.navigate("/");
          course.goToDashboard();
        }}
        onProfile={() => {
          path.navigate("/");
          course.goToProfile();
        }}
        onAdmin={() => path.navigate("/admin")}
        onToggleDark={course.toggleDark}
        onReset={handleReset}
      />

      {showAdmin ? (
        <AdminPanel
          isAllowed={isAdminSession(auth.session, profile)}
          onLoad={auth.getAdminOverview}
          onCreate={auth.createAccessKey}
          onBackHome={() => path.navigate("/")}
          onLogout={handleLogout}
        />
      ) : (
        <>
          {course.state.currentView === "dashboard" && (
            <Dashboard
              state={course.state}
              profile={profile}
              onSelectTopic={handleTopicSelect}
              onFinalExam={course.goToFinalExam}
              onProfile={course.goToProfile}
              onAdmin={() => path.navigate("/admin")}
              onAccessKey={course.goToProfile}
              getGate={getGate}
              mode={auth.mode}
            />
          )}

          {course.state.currentView === "profile" && (
            <ProfileView
              profile={profile}
              state={course.state}
              onBack={course.goToDashboard}
              onSave={auth.updateProfile}
              onActivateKey={auth.activateAccessKey}
              onLogout={handleLogout}
              telegramUrl={auth.adminTelegramUrl}
            />
          )}

          {course.state.currentView === "topic" && currentTopic && (
            <TopicView
              topic={currentTopic}
              state={course.state}
              onBack={course.goToDashboard}
              onExerciseDone={(exId) => course.markExerciseDone(currentTopic.id, exId)}
              onQuizDone={(score) => course.markQuizScore(currentTopic.id, score)}
              onProjectDone={() => course.markProjectDone(currentTopic.id)}
              onComplete={() => course.completeTopic(currentTopic.id)}
              onAskTeacher={auth.teacherAssist}
            />
          )}

          {course.state.currentView === "final" && (
            <FinalExam onBack={course.goToDashboard} onSubmit={handleFinalExamSubmit} onAskTeacher={auth.teacherAssist} />
          )}

          {course.state.currentView === "certificate" && (
            <Certificate state={course.state} onBack={course.goToDashboard} />
          )}
        </>
      )}

      {paywallMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <Card className="max-w-xl border-amber-500/20 bg-slate-950/95 p-6">
            <h2 className="text-2xl font-bold text-white">Dars hozircha qulfda</h2>
            <p className="mt-3 leading-7 text-slate-300">{paywallMessage}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => setPaywallMessage(null)} variant="secondary" size="md">
                Yopish
              </Button>
              <Button
                onClick={() => {
                  setPaywallMessage(null);
                  course.goToProfile();
                }}
                variant="primary"
                size="md"
              >
                Access Key bo'limi
              </Button>
            </div>
          </Card>
        </div>
      )}

      <footer className="mt-16 border-t border-slate-800 bg-slate-950/50 py-6 text-center text-xs text-slate-500">
        <p>PyMentor Premium — Teacher AI, premium gating va access key bilan ishlovchi Python learning program</p>
        <p className="mt-1">Support: @cyberscmmr</p>
      </footer>
    </div>
  );
}

function ensureCompleted(topicId: string, progress: Record<string, { completed: boolean }>) {
  return Boolean(progress[topicId]?.completed);
}
