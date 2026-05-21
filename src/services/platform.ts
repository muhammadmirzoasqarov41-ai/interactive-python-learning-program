import type {
  AccessKeyRecord,
  AdminOverview,
  AuthFormData,
  AuthSession,
  CreateAccessKeyInput,
  ProfileUpdateInput,
  TeacherAssistRequest,
  TeacherAssistResponse,
  UserProfile,
} from "../types";

const SESSION_KEY = "pymentor_auth_session_v1";
const MOCK_USERS_KEY = "pymentor_mock_users_v1";
const MOCK_KEYS_KEY = "pymentor_mock_access_keys_v1";
const ADMIN_TELEGRAM = "@cyberscmmr";

const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const authMode = firebaseApiKey && apiBaseUrl ? "firebase-rest" : "mock";

function nowIso() {
  return new Date().toISOString();
}

function futureIso(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function randomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function decodeJwt(token: string): Record<string, unknown> {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return {};
  }
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function persistSession(session: AuthSession | null) {
  if (!session) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  writeJson(SESSION_KEY, session);
}

function restoreSession(): AuthSession | null {
  const session = readJson<AuthSession | null>(SESSION_KEY, null);
  if (!session) return null;
  if (session.expiresAt && session.expiresAt < Date.now()) {
    persistSession(null);
    return null;
  }
  return session;
}

function defaultProfile(session: AuthSession, seed?: Partial<UserProfile>): UserProfile {
  return {
    uid: session.uid,
    fullName: seed?.fullName || session.displayName || "Student",
    phone: seed?.phone || "",
    email: session.email,
    role: seed?.role || "user",
    isPremium: seed?.isPremium || false,
    premiumActivatedAt: seed?.premiumActivatedAt || null,
    premiumExpiresAt: seed?.premiumExpiresAt || null,
    accessKeyCode: seed?.accessKeyCode || null,
    telegramHandle: ADMIN_TELEGRAM,
    completedTopics: seed?.completedTopics || [],
    createdAt: seed?.createdAt || nowIso(),
    updatedAt: nowIso(),
  };
}

function toSession(authPayload: {
  localId: string;
  email: string;
  idToken: string;
  refreshToken?: string;
  displayName?: string;
  expiresIn?: string;
}): AuthSession {
  const claims = decodeJwt(authPayload.idToken);
  const expiresInMs = Number(authPayload.expiresIn || 3600) * 1000;
  return {
    uid: authPayload.localId,
    email: authPayload.email,
    idToken: authPayload.idToken,
    refreshToken: authPayload.refreshToken,
    displayName: authPayload.displayName,
    expiresAt: Date.now() + expiresInMs,
    claims,
  };
}

async function fetchIdentity(path: string, body: object) {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/${path}?key=${firebaseApiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(normalizeFirebaseError(data?.error?.message || "Authentication failed"));
  }
  return data;
}

function normalizeFirebaseError(message: string) {
  const map: Record<string, string> = {
    EMAIL_EXISTS: "Bu email allaqachon ro'yxatdan o'tgan.",
    EMAIL_NOT_FOUND: "Bunday email topilmadi.",
    INVALID_PASSWORD: "Parol noto'g'ri.",
    USER_DISABLED: "Bu akkaunt o'chirilgan.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "Juda ko'p urinish bo'ldi, keyinroq urinib ko'ring.",
  };
  return map[message] || message;
}

async function callApi<T>(session: AuthSession, path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.idToken}`,
      ...(init?.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || "Server so'rovi bajarilmadi.");
  }
  return data as T;
}

type MockUserRecord = {
  session: AuthSession;
  password: string;
  profile: UserProfile;
};

function seedMockState() {
  const users = readJson<Record<string, MockUserRecord>>(MOCK_USERS_KEY, {});
  const keys = readJson<AccessKeyRecord[]>(MOCK_KEYS_KEY, []);

  const hasAdmin = Object.values(users).some((user) => user.profile.role === "admin");
  if (!hasAdmin) {
    const adminSession: AuthSession = {
      uid: "admin-local",
      email: "admin@pymentor.dev",
      idToken: "mock-admin-token",
      displayName: "Admin",
      claims: { admin: true },
    };
    users[adminSession.uid] = {
      session: adminSession,
      password: "Admin123!",
      profile: defaultProfile(adminSession, {
        fullName: "PyMentor Admin",
        role: "admin",
        isPremium: true,
        premiumActivatedAt: nowIso(),
        premiumExpiresAt: futureIso(3650),
      }),
    };
  }

  if (keys.length === 0) {
    keys.push({
      id: "seed-key-1",
      code: "PYM123",
      durationDays: 30,
      expiresAt: futureIso(30),
      createdAt: nowIso(),
      createdBy: "admin-local",
      isUsed: false,
      usedBy: null,
      usedAt: null,
      status: "active",
      note: "Demo premium key",
    });
  }

  writeJson(MOCK_USERS_KEY, users);
  writeJson(MOCK_KEYS_KEY, keys);
}

seedMockState();

async function mockEnsureProfile(session: AuthSession) {
  const users = readJson<Record<string, MockUserRecord>>(MOCK_USERS_KEY, {});
  const record = users[session.uid];
  if (!record) {
    throw new Error("Mock user topilmadi.");
  }
  persistSession(record.session);
  return record.profile;
}

function updateStoredMockUser(uid: string, updater: (current: MockUserRecord) => MockUserRecord) {
  const users = readJson<Record<string, MockUserRecord>>(MOCK_USERS_KEY, {});
  const current = users[uid];
  if (!current) throw new Error("User topilmadi.");
  users[uid] = updater(current);
  writeJson(MOCK_USERS_KEY, users);
  return users[uid];
}

export const platform = {
  mode: authMode,
  adminTelegramUrl: "https://t.me/cyberscmmr",

  async register(form: AuthFormData) {
    if (authMode === "firebase-rest") {
      const created = await fetchIdentity("accounts:signUp", {
        email: form.email,
        password: form.password,
        returnSecureToken: true,
      });
      const updated = await fetchIdentity("accounts:update", {
        idToken: created.idToken,
        displayName: form.fullName,
        returnSecureToken: true,
      });
      const session = toSession({
        localId: updated.localId,
        email: updated.email,
        idToken: updated.idToken,
        refreshToken: updated.refreshToken,
        displayName: updated.displayName,
        expiresIn: updated.expiresIn,
      });
      persistSession(session);
      const profile = await callApi<UserProfile>(session, "/profile/sync", {
        method: "POST",
        body: JSON.stringify({ fullName: form.fullName, phone: form.phone }),
      });
      return { session, profile };
    }

    const users = readJson<Record<string, MockUserRecord>>(MOCK_USERS_KEY, {});
    const exists = Object.values(users).some((user) => user.profile.email === form.email);
    if (exists) throw new Error("Bu email allaqachon ro'yxatdan o'tgan.");

    const session: AuthSession = {
      uid: crypto.randomUUID(),
      email: form.email,
      idToken: `mock-${crypto.randomUUID()}`,
      displayName: form.fullName,
      claims: { admin: false },
    };
    const profile = defaultProfile(session, {
      fullName: form.fullName,
      phone: form.phone,
    });
    users[session.uid] = { session, password: form.password, profile };
    writeJson(MOCK_USERS_KEY, users);
    persistSession(session);
    return { session, profile };
  },

  async login(email: string, password: string) {
    if (authMode === "firebase-rest") {
      const result = await fetchIdentity("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });
      const session = toSession(result);
      persistSession(session);
      const profile = await callApi<UserProfile>(session, "/profile/sync", {
        method: "POST",
        body: JSON.stringify({}),
      });
      return { session, profile };
    }

    const users = readJson<Record<string, MockUserRecord>>(MOCK_USERS_KEY, {});
    const record = Object.values(users).find((user) => user.profile.email === email);
    if (!record || record.password !== password) {
      throw new Error("Email yoki parol noto'g'ri.");
    }
    persistSession(record.session);
    return { session: record.session, profile: record.profile };
  },

  async logout() {
    persistSession(null);
  },

  async restore() {
    const session = restoreSession();
    if (!session) return null;
    const profile = authMode === "firebase-rest"
      ? await callApi<UserProfile>(session, "/profile", { method: "GET" })
      : await mockEnsureProfile(session);
    return { session, profile };
  },

  async updateProfile(session: AuthSession, input: ProfileUpdateInput) {
    if (authMode === "firebase-rest") {
      return callApi<UserProfile>(session, "/profile", {
        method: "PATCH",
        body: JSON.stringify(input),
      });
    }

    const record = updateStoredMockUser(session.uid, (current) => ({
      ...current,
      session: { ...current.session, displayName: input.fullName },
      profile: {
        ...current.profile,
        fullName: input.fullName,
        phone: input.phone,
        updatedAt: nowIso(),
      },
    }));
    persistSession(record.session);
    return record.profile;
  },

  async syncCompletedTopics(session: AuthSession, completedTopics: string[]) {
    if (authMode === "firebase-rest") {
      await callApi<UserProfile>(session, "/profile/completed-topics", {
        method: "POST",
        body: JSON.stringify({ completedTopics }),
      });
      return;
    }

    updateStoredMockUser(session.uid, (current) => ({
      ...current,
      profile: {
        ...current.profile,
        completedTopics,
        updatedAt: nowIso(),
      },
    }));
  },

  async activateAccessKey(session: AuthSession, code: string) {
    if (authMode === "firebase-rest") {
      return callApi<UserProfile>(session, "/access-keys/activate", {
        method: "POST",
        body: JSON.stringify({ code }),
      });
    }

    const keys = readJson<AccessKeyRecord[]>(MOCK_KEYS_KEY, []);
    const normalized = code.trim().toUpperCase();
    const key = keys.find((item) => item.code === normalized);
    if (!key) throw new Error("Access key topilmadi.");
    if (key.isUsed || key.status !== "active") throw new Error("Bu access key allaqachon ishlatilgan.");

    const usedAt = nowIso();
    key.isUsed = true;
    key.usedBy = session.uid;
    key.usedAt = usedAt;
    key.status = "used";
    key.expiresAt = futureIso(key.durationDays);
    writeJson(MOCK_KEYS_KEY, keys);

    const record = updateStoredMockUser(session.uid, (current) => ({
      ...current,
      profile: {
        ...current.profile,
        isPremium: true,
        premiumActivatedAt: usedAt,
        premiumExpiresAt: futureIso(key.durationDays),
        accessKeyCode: key.code,
        updatedAt: nowIso(),
      },
    }));
    return record.profile;
  },

  async teacherAssist(session: AuthSession, request: TeacherAssistRequest) {
    if (authMode === "firebase-rest") {
      return callApi<TeacherAssistResponse>(session, "/teacher-assist", {
        method: "POST",
        body: JSON.stringify(request),
      });
    }

    return {
      message: request.hint || "Masalani yana bir bor o'qib, qiymatlar turi bir-biriga mos keladimi deb tekshirib ko'ring.",
      nextStep: request.codeSnippet ? "Koddagi har bir qatorda qanday tur ishlayotganini aytib chiqing." : "Savoldagi asosiy tushunchani bitta jumlada izohlang.",
      caution: "Teacher AI demo rejimida ishlayapti, shu sabab chuqur tahlil uchun Firebase va Groq sozlang.",
    };
  },

  async getAdminOverview(session: AuthSession) {
    if (authMode === "firebase-rest") {
      return callApi<AdminOverview>(session, "/admin/overview", { method: "GET" });
    }

    const keys = readJson<AccessKeyRecord[]>(MOCK_KEYS_KEY, []);
    return {
      keys: [...keys].sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")),
      stats: {
        total: keys.length,
        active: keys.filter((item) => item.status === "active").length,
        used: keys.filter((item) => item.status === "used").length,
        expired: keys.filter((item) => item.status === "expired").length,
      },
    };
  },

  async createAccessKey(session: AuthSession, input: CreateAccessKeyInput) {
    if (authMode === "firebase-rest") {
      return callApi<AccessKeyRecord>(session, "/admin/access-keys", {
        method: "POST",
        body: JSON.stringify(input),
      });
    }

    const code = randomCode();
    const key: AccessKeyRecord = {
      id: crypto.randomUUID(),
      code,
      durationDays: input.durationDays,
      expiresAt: futureIso(input.durationDays),
      createdAt: nowIso(),
      createdBy: session.uid,
      isUsed: false,
      usedBy: null,
      usedAt: null,
      status: "active",
      note: input.note,
    };
    const keys = readJson<AccessKeyRecord[]>(MOCK_KEYS_KEY, []);
    keys.unshift(key);
    writeJson(MOCK_KEYS_KEY, keys);
    return key;
  },
};
