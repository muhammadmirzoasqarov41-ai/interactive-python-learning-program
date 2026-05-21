import { xpForLevel } from "../hooks/useProgress";
import type { AppState, UserProfile } from "../types";
import { Button, Icon, ProgressBar } from "./ui";

export function Header({
  state,
  profile,
  onHome,
  onProfile,
  onAdmin,
  onToggleDark,
  onReset,
}: {
  state: AppState;
  profile: UserProfile | null;
  onHome: () => void;
  onProfile: () => void;
  onAdmin: () => void;
  onToggleDark: () => void;
  onReset: () => void;
}) {
  const nextLevelXP = xpForLevel(state.level + 1);
  const currentLevelXP = xpForLevel(state.level);
  const progressXP = state.totalXP - currentLevelXP;
  const neededXP = nextLevelXP - currentLevelXP;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button onClick={onHome} className="flex items-center gap-3 transition hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/20">
            <span className="text-2xl">🐍</span>
          </div>
          <div className="hidden text-left sm:block">
            <div className="text-sm font-bold tracking-tight text-white">PyMentor Premium</div>
            <div className="text-xs text-slate-400">{profile?.isPremium ? "Access unlocked" : "2 free modules"}</div>
          </div>
        </button>

        {profile && (
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2">
              <Icon name="star" className="h-4 w-4 text-amber-400" />
              <div className="text-sm">
                <span className="font-bold text-amber-300">{state.totalXP} XP</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-400">Level {state.level}</div>
                <div className="w-32">
                  <ProgressBar value={progressXP} max={neededXP} color="amber" />
                </div>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-slate-900 shadow-lg shadow-amber-500/30">
                {state.level}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
            title="Toggle theme"
          >
            <Icon name={state.darkMode ? "moon" : "sun"} className="h-4 w-4" />
          </button>
          {profile && (
            <Button onClick={onProfile} variant="ghost" size="sm">
              <Icon name="user" className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
          )}
          {profile?.role === "admin" && (
            <Button onClick={onAdmin} variant="ghost" size="sm" className="text-amber-200 hover:bg-amber-500/10">
              <Icon name="shield" className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          )}
          <Button onClick={onHome} variant="ghost" size="sm">
            <Icon name="home" className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Button>
          <Button onClick={onReset} variant="ghost" size="sm" className="text-rose-400 hover:bg-rose-500/10">
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
