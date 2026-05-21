import { useEffect, useState } from "react";
import { platform } from "../services/platform";
import type {
  AdminOverview,
  AuthFormData,
  AuthSession,
  ProfileUpdateInput,
  TeacherAssistRequest,
  TeacherAssistResponse,
  UserProfile,
} from "../types";

type SessionState = {
  session: AuthSession | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
};

export function useAuthSession() {
  const [state, setState] = useState<SessionState>({
    session: null,
    profile: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;
    platform
      .restore()
      .then((result) => {
        if (!mounted) return;
        setState({
          session: result?.session || null,
          profile: result?.profile || null,
          loading: false,
          error: null,
        });
      })
      .catch((error: Error) => {
        if (!mounted) return;
        setState({ session: null, profile: null, loading: false, error: error.message });
      });
    return () => {
      mounted = false;
    };
  }, []);

  const setSessionState = (session: AuthSession, profile: UserProfile) => {
    setState({ session, profile, loading: false, error: null });
  };

  return {
    ...state,
    mode: platform.mode,
    adminTelegramUrl: platform.adminTelegramUrl,

    async register(form: AuthFormData) {
      const result = await platform.register(form);
      setSessionState(result.session, result.profile);
      return result;
    },

    async login(email: string, password: string) {
      const result = await platform.login(email, password);
      setSessionState(result.session, result.profile);
      return result;
    },

    async logout() {
      await platform.logout();
      setState({ session: null, profile: null, loading: false, error: null });
    },

    async updateProfile(input: ProfileUpdateInput) {
      if (!state.session) throw new Error("Session topilmadi.");
      const profile = await platform.updateProfile(state.session, input);
      setState((prev) => ({ ...prev, profile }));
      return profile;
    },

    async syncCompletedTopics(completedTopics: string[]) {
      if (!state.session) return;
      await platform.syncCompletedTopics(state.session, completedTopics);
      setState((prev) =>
        prev.profile
          ? {
              ...prev,
              profile: {
                ...prev.profile,
                completedTopics,
              },
            }
          : prev
      );
    },

    async activateAccessKey(code: string) {
      if (!state.session) throw new Error("Session topilmadi.");
      const profile = await platform.activateAccessKey(state.session, code);
      setState((prev) => ({ ...prev, profile }));
      return profile;
    },

    async teacherAssist(request: TeacherAssistRequest) {
      if (!state.session) throw new Error("Session topilmadi.");
      return platform.teacherAssist(state.session, request);
    },

    async getAdminOverview() {
      if (!state.session) throw new Error("Session topilmadi.");
      return platform.getAdminOverview(state.session);
    },

    async createAccessKey(durationDays: number, note: string) {
      if (!state.session) throw new Error("Session topilmadi.");
      return platform.createAccessKey(state.session, { durationDays, note });
    },
  };
}

export function isAdminSession(session: AuthSession | null, profile: UserProfile | null) {
  return Boolean(session?.claims?.admin || profile?.role === "admin");
}

export type { AdminOverview, TeacherAssistResponse };
