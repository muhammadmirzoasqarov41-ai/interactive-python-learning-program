import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";

initializeApp();

const db = getFirestore();
const auth = getAuth();
const telegramHandle = "@cyberscmmr";
const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || "";
const groqApiKey = process.env.GROQ_API_KEY || "";

type UserProfile = {
  uid: string;
  fullName: string;
  phone: string;
  email: string;
  role: "user" | "admin";
  isPremium: boolean;
  premiumActivatedAt: string | null;
  premiumExpiresAt: string | null;
  accessKeyCode: string | null;
  telegramHandle: string;
  completedTopics: string[];
  createdAt: string | null;
  updatedAt: string | null;
};

function json(res: Parameters<typeof onRequest>[1], status: number, body: unknown) {
  res.status(status).json(body);
}

function setCors(res: Parameters<typeof onRequest>[1]) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
}

function randomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 6 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}

function serializeTimestamp(value: FirebaseFirestore.Timestamp | FirebaseFirestore.FieldValue | null | undefined) {
  if (!value || !(value instanceof Timestamp)) return null;
  return value.toDate().toISOString();
}

function mapUserProfile(snapshot: FirebaseFirestore.DocumentSnapshot): UserProfile {
  const data = snapshot.data() || {};
  return {
    uid: String(data.uid || snapshot.id),
    fullName: String(data.fullName || ""),
    phone: String(data.phone || ""),
    email: String(data.email || ""),
    role: data.role === "admin" ? "admin" : "user",
    isPremium: Boolean(data.isPremium),
    premiumActivatedAt: serializeTimestamp(data.premiumActivatedAt),
    premiumExpiresAt: serializeTimestamp(data.premiumExpiresAt),
    accessKeyCode: data.accessKeyCode ? String(data.accessKeyCode) : null,
    telegramHandle: String(data.telegramHandle || telegramHandle),
    completedTopics: Array.isArray(data.completedTopics) ? data.completedTopics.map(String) : [],
    createdAt: serializeTimestamp(data.createdAt),
    updatedAt: serializeTimestamp(data.updatedAt),
  };
}

async function requireUser(req: Parameters<typeof onRequest>[0]) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw new HttpError(401, "Authorization token topilmadi.");
  }

  const token = header.slice("Bearer ".length);
  return auth.verifyIdToken(token);
}

async function requireAdmin(req: Parameters<typeof onRequest>[0]) {
  const decoded = await requireUser(req);
  if (decoded.admin === true) return decoded;

  const userDoc = await db.collection("users").doc(decoded.uid).get();
  if (userDoc.exists && userDoc.data()?.role === "admin") return decoded;

  throw new HttpError(403, "Admin access talab qilinadi.");
}

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function ensureProfile(decoded: Awaited<ReturnType<typeof requireUser>>, input?: { fullName?: string; phone?: string }) {
  const ref = db.collection("users").doc(decoded.uid);
  const existing = await ref.get();
  const isSuperAdmin = Boolean(superAdminEmail && decoded.email === superAdminEmail);

  if (!existing.exists) {
    await ref.set({
      uid: decoded.uid,
      fullName: input?.fullName || decoded.name || "",
      phone: input?.phone || "",
      email: decoded.email || "",
      role: isSuperAdmin ? "admin" : "user",
      isPremium: isSuperAdmin,
      premiumActivatedAt: isSuperAdmin ? FieldValue.serverTimestamp() : null,
      premiumExpiresAt: isSuperAdmin ? Timestamp.fromDate(new Date(Date.now() + 3650 * 24 * 60 * 60 * 1000)) : null,
      accessKeyCode: null,
      telegramHandle,
      completedTopics: [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  } else {
    const updatePayload: Record<string, unknown> = {
      updatedAt: FieldValue.serverTimestamp(),
    };
    if (input?.fullName) updatePayload.fullName = input.fullName;
    if (input?.phone) updatePayload.phone = input.phone;
    if (isSuperAdmin) updatePayload.role = "admin";
    await ref.set(updatePayload, { merge: true });
  }

  if (isSuperAdmin && decoded.admin !== true) {
    await auth.setCustomUserClaims(decoded.uid, { admin: true });
  }

  const fresh = await ref.get();
  return mapUserProfile(fresh);
}

async function buildAdminOverview() {
  const snapshot = await db.collection("accessKeys").orderBy("createdAt", "desc").limit(100).get();
  const keys = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      code: String(data.code || ""),
      durationDays: Number(data.durationDays || 0),
      expiresAt: serializeTimestamp(data.expiresAt),
      createdAt: serializeTimestamp(data.createdAt),
      createdBy: String(data.createdBy || ""),
      isUsed: Boolean(data.isUsed),
      usedBy: data.usedBy ? String(data.usedBy) : null,
      usedAt: serializeTimestamp(data.usedAt),
      status: String(data.status || "active"),
      note: String(data.note || ""),
    };
  });

  return {
    keys,
    stats: {
      total: keys.length,
      active: keys.filter((key) => key.status === "active").length,
      used: keys.filter((key) => key.status === "used").length,
      expired: keys.filter((key) => key.status === "expired").length,
    },
  };
}

async function generateUniqueAccessKey() {
  for (let i = 0; i < 20; i += 1) {
    const code = randomCode();
    const existing = await db.collection("accessKeys").where("code", "==", code).limit(1).get();
    if (existing.empty) return code;
  }
  throw new HttpError(500, "Unique access key yaratib bo'lmadi.");
}

async function createAccessKey(adminUid: string, durationDays: number, note: string) {
  const code = await generateUniqueAccessKey();
  const ref = db.collection("accessKeys").doc();
  const expiresAt = Timestamp.fromDate(new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000));

  await ref.set({
    code,
    durationDays,
    expiresAt,
    createdAt: FieldValue.serverTimestamp(),
    createdBy: adminUid,
    isUsed: false,
    usedBy: null,
    usedAt: null,
    status: "active",
    note,
  });

  const saved = await ref.get();
  const data = saved.data() || {};
  return {
    id: saved.id,
    code,
    durationDays,
    expiresAt: serializeTimestamp(data.expiresAt),
    createdAt: serializeTimestamp(data.createdAt),
    createdBy: adminUid,
    isUsed: false,
    usedBy: null,
    usedAt: null,
    status: "active",
    note,
  };
}

async function activateAccessKey(uid: string, code: string) {
  const normalized = code.trim().toUpperCase();
  if (!/^[A-Z0-9]{6}$/.test(normalized)) {
    throw new HttpError(400, "Access key 6 belgili harf va raqamdan iborat bo'lishi kerak.");
  }

  const query = await db.collection("accessKeys").where("code", "==", normalized).limit(1).get();
  if (query.empty) throw new HttpError(404, "Access key topilmadi.");

  const keyRef = query.docs[0].ref;
  const userRef = db.collection("users").doc(uid);

  await db.runTransaction(async (transaction) => {
    const keySnap = await transaction.get(keyRef);
    const userSnap = await transaction.get(userRef);

    if (!keySnap.exists) throw new HttpError(404, "Access key topilmadi.");
    if (!userSnap.exists) throw new HttpError(404, "User profile topilmadi.");

    const keyData = keySnap.data()!;
    if (keyData.isUsed || keyData.status !== "active") {
      throw new HttpError(400, "Bu access key allaqachon ishlatilgan yoki faol emas.");
    }

    const durationDays = Number(keyData.durationDays || 30);
    const expiresAt = Timestamp.fromDate(new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000));

    transaction.update(keyRef, {
      isUsed: true,
      usedBy: uid,
      usedAt: FieldValue.serverTimestamp(),
      status: "used",
      expiresAt,
    });

    transaction.update(userRef, {
      isPremium: true,
      premiumActivatedAt: FieldValue.serverTimestamp(),
      premiumExpiresAt: expiresAt,
      accessKeyCode: normalized,
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  return mapUserProfile(await userRef.get());
}

async function teacherAssist(uid: string, payload: Record<string, unknown>) {
  const prompt = String(payload.prompt || "");
  const question = String(payload.question || "");
  const codeSnippet = String(payload.codeSnippet || "");
  const learnerAnswer = String(payload.learnerAnswer || "");
  const hint = String(payload.hint || "");
  const topicTitle = String(payload.topicTitle || "Python topic");

  await db.collection("aiLogs").add({
    uid,
    topicTitle,
    mode: String(payload.mode || "exercise"),
    createdAt: FieldValue.serverTimestamp(),
  });

  if (!groqApiKey) {
    return {
      message: hint || "Koddagi tur va mantiq oqimini yana bir marta tekshirib ko'ring.",
      nextStep: "Avval muammo qaysi qatorda ekanini aniqlang, keyin o'sha qatordagi qiymat turlarini aytib chiqing.",
      caution: "Groq API key hali sozlanmagan. Shuning uchun fallback mentor javobi qaytdi.",
    };
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${groqApiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are Teacher AI inside a premium Python learning platform. Never give the final answer directly. Give concise hints, point out the concept gap, and suggest one next debugging step. Be supportive and brief. Reply as JSON with keys: message, nextStep, caution.",
        },
        {
          role: "user",
          content: JSON.stringify({
            topicTitle,
            prompt,
            question,
            codeSnippet,
            learnerAnswer,
            hint,
          }),
        },
      ],
      response_format: {
        type: "json_object",
      },
    }),
  });

  if (!response.ok) {
    throw new HttpError(502, "Groq API javob bera olmadi.");
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new HttpError(502, "Teacher AI bo'sh javob qaytardi.");
  }

  return JSON.parse(content) as {
    message: string;
    nextStep: string;
    caution?: string;
  };
}

async function router(req: Parameters<typeof onRequest>[0], res: Parameters<typeof onRequest>[1]) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    if (req.path === "/profile/sync" && req.method === "POST") {
      const decoded = await requireUser(req);
      const body = req.body as { fullName?: string; phone?: string };
      json(res, 200, await ensureProfile(decoded, body));
      return;
    }

    if (req.path === "/profile" && req.method === "GET") {
      const decoded = await requireUser(req);
      const profile = await ensureProfile(decoded);
      json(res, 200, profile);
      return;
    }

    if (req.path === "/profile" && req.method === "PATCH") {
      const decoded = await requireUser(req);
      const body = req.body as { fullName?: string; phone?: string };
      const ref = db.collection("users").doc(decoded.uid);
      await ref.set(
        {
          fullName: body.fullName || decoded.name || "",
          phone: body.phone || "",
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      json(res, 200, mapUserProfile(await ref.get()));
      return;
    }

    if (req.path === "/profile/completed-topics" && req.method === "POST") {
      const decoded = await requireUser(req);
      const body = req.body as { completedTopics?: string[] };
      await db.collection("users").doc(decoded.uid).set(
        {
          completedTopics: Array.isArray(body.completedTopics) ? body.completedTopics : [],
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
      json(res, 200, { ok: true });
      return;
    }

    if (req.path === "/access-keys/activate" && req.method === "POST") {
      const decoded = await requireUser(req);
      const body = req.body as { code?: string };
      json(res, 200, await activateAccessKey(decoded.uid, String(body.code || "")));
      return;
    }

    if (req.path === "/teacher-assist" && req.method === "POST") {
      const decoded = await requireUser(req);
      json(res, 200, await teacherAssist(decoded.uid, (req.body as Record<string, unknown>) || {}));
      return;
    }

    if (req.path === "/admin/overview" && req.method === "GET") {
      await requireAdmin(req);
      json(res, 200, await buildAdminOverview());
      return;
    }

    if (req.path === "/admin/access-keys" && req.method === "POST") {
      const decoded = await requireAdmin(req);
      const body = req.body as { durationDays?: number; note?: string };
      const durationDays = Math.max(1, Number(body.durationDays || 30));
      json(res, 200, await createAccessKey(decoded.uid, durationDays, String(body.note || "")));
      return;
    }

    throw new HttpError(404, "Route topilmadi.");
  } catch (error) {
    if (error instanceof HttpError) {
      json(res, error.status, { error: error.message });
      return;
    }

    console.error(error);
    json(res, 500, { error: "Ichki server xatoligi." });
  }
}

export const api = onRequest({ cors: false, region: "us-central1", secrets: [] }, router);
