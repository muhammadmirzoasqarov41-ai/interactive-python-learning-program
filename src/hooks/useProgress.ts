import { useCallback, useEffect, useMemo, useState } from "react";
import type { AppState, TopicProgress } from "../types";

const STORAGE_PREFIX = "pymentor_state_v2";

const baseDefaultState: AppState = {
  currentTopic: null,
  currentView: "dashboard",
  topicProgress: {},
  totalXP: 0,
  level: 1,
  achievements: [],
  darkMode: true,
  studentName: "",
  finalExamTaken: false,
  finalExamScore: 0,
};

function buildStorageKey(scope: string) {
  return `${STORAGE_PREFIX}_${scope}`;
}

function loadState(storageKey: string): AppState {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return baseDefaultState;
    const parsed = JSON.parse(raw);
    return { ...baseDefaultState, ...parsed };
  } catch {
    return baseDefaultState;
  }
}

function saveState(storageKey: string, state: AppState) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
  } catch {
    // ignore persistence failures
  }
}

export function xpForLevel(level: number): number {
  return Math.floor((level * (level - 1) * 100) / 2);
}

export function levelFromXP(xp: number): number {
  let lvl = 1;
  while (xpForLevel(lvl + 1) <= xp) {
    lvl++;
  }
  return lvl;
}

export function ensureTopicProgress(state: AppState, topicId: string): TopicProgress {
  if (!state.topicProgress[topicId]) {
    return {
      completed: false,
      xp: 0,
      quizScore: 0,
      exercisesDone: [],
      projectDone: false,
      lastVisited: Date.now(),
    };
  }
  return state.topicProgress[topicId];
}

export function useProgress(scope: string, studentName: string) {
  const storageKey = useMemo(() => buildStorageKey(scope), [scope]);
  const [state, setState] = useState<AppState>(() => loadState(storageKey));

  useEffect(() => {
    setState((prev) => {
      const loaded = loadState(storageKey);
      return {
        ...loaded,
        studentName: studentName || loaded.studentName,
      };
    });
  }, [storageKey, studentName]);

  useEffect(() => {
    saveState(storageKey, state);
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state, storageKey]);

  useEffect(() => {
    if (!studentName || state.studentName === studentName) return;
    setState((prev) => ({ ...prev, studentName }));
  }, [studentName, state.studentName]);

  const update = useCallback((updater: (s: AppState) => AppState) => {
    setState((prev) => {
      const next = updater(prev);
      next.level = levelFromXP(next.totalXP);
      return next;
    });
  }, []);

  const setStudentName = useCallback(
    (name: string) => update((s) => ({ ...s, studentName: name })),
    [update]
  );

  const toggleDark = useCallback(() => update((s) => ({ ...s, darkMode: !s.darkMode })), [update]);

  const goToTopic = useCallback(
    (id: string) =>
      update((s) => ({
        ...s,
        currentTopic: id,
        currentView: "topic",
        topicProgress: {
          ...s.topicProgress,
          [id]: {
            ...ensureTopicProgress(s, id),
            lastVisited: Date.now(),
          },
        },
      })),
    [update]
  );

  const goToDashboard = useCallback(
    () => update((s) => ({ ...s, currentView: "dashboard", currentTopic: null })),
    [update]
  );

  const goToProfile = useCallback(
    () => update((s) => ({ ...s, currentView: "profile", currentTopic: null })),
    [update]
  );

  const goToFinalExam = useCallback(
    () => update((s) => ({ ...s, currentView: "final" })),
    [update]
  );

  const goToCertificate = useCallback(
    () => update((s) => ({ ...s, currentView: "certificate" })),
    [update]
  );

  const markExerciseDone = useCallback(
    (topicId: string, exerciseId: string) =>
      update((s) => {
        const tp = ensureTopicProgress(s, topicId);
        if (tp.exercisesDone.includes(exerciseId)) return s;
        return {
          ...s,
          totalXP: s.totalXP + 25,
          topicProgress: {
            ...s.topicProgress,
            [topicId]: { ...tp, exercisesDone: [...tp.exercisesDone, exerciseId] },
          },
        };
      }),
    [update]
  );

  const markQuizScore = useCallback(
    (topicId: string, score: number) =>
      update((s) => {
        const tp = ensureTopicProgress(s, topicId);
        const xp = Math.round((score / 100) * 50);
        return {
          ...s,
          totalXP: s.totalXP + xp,
          topicProgress: {
            ...s.topicProgress,
            [topicId]: { ...tp, quizScore: Math.max(tp.quizScore, score) },
          },
        };
      }),
    [update]
  );

  const completeTopic = useCallback(
    (topicId: string) =>
      update((s) => {
        const tp = ensureTopicProgress(s, topicId);
        if (tp.completed) return s;
        return {
          ...s,
          totalXP: s.totalXP + 100,
          topicProgress: {
            ...s.topicProgress,
            [topicId]: { ...tp, completed: true },
          },
        };
      }),
    [update]
  );

  const markProjectDone = useCallback(
    (topicId: string) =>
      update((s) => {
        const tp = ensureTopicProgress(s, topicId);
        if (tp.projectDone) return s;
        return {
          ...s,
          totalXP: s.totalXP + 75,
          topicProgress: {
            ...s.topicProgress,
            [topicId]: { ...tp, projectDone: true },
          },
        };
      }),
    [update]
  );

  const unlockAchievement = useCallback(
    (id: string) =>
      update((s) => {
        if (s.achievements.includes(id)) return s;
        return { ...s, achievements: [...s.achievements, id], totalXP: s.totalXP + 20 };
      }),
    [update]
  );

  const submitFinalExam = useCallback(
    (score: number) =>
      update((s) => ({
        ...s,
        finalExamTaken: true,
        finalExamScore: Math.max(s.finalExamScore, score),
      })),
    [update]
  );

  const resetProgress = useCallback(() => {
    setState({ ...baseDefaultState, studentName });
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey, studentName]);

  return {
    state,
    setStudentName,
    toggleDark,
    goToTopic,
    goToDashboard,
    goToProfile,
    goToFinalExam,
    goToCertificate,
    markExerciseDone,
    markQuizScore,
    completeTopic,
    markProjectDone,
    unlockAchievement,
    submitFinalExam,
    resetProgress,
  };
}
