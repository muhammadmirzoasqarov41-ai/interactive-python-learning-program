// Core domain types for PyMentor

export interface CodeExample {
  code: string;
  explanation: string;
}

export interface LineExplanation {
  line: string;
  explanation: string;
}

export interface CommonMistake {
  mistake: string;
  code: string;
  why: string;
  fix: string;
}

export interface Exercise {
  id: string;
  prompt: string;
  codeSnippet?: string;
  question: string;
  expected: string[];
  hint: string;
  type: "output" | "type" | "fix" | "write" | "prediction";
}

export interface QuizQuestion {
  id: string;
  question: string;
  code?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MiniProject {
  title: string;
  description: string;
  tasks: string[];
  starterCode: string;
  solutionCode: string;
  checkPoints: string[];
}

export interface TrickyQuestion {
  question: string;
  code?: string;
  answer: string;
}

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accent: string;
  difficulty: "Beginner" | "Intermediate";
  intro: string;
  definition: string;
  analogy: string;
  syntax: string;
  examples: CodeExample[];
  lineByLine: LineExplanation[];
  commonMistakes: CommonMistake[];
  whereUsed: string[];
  exercises: Exercise[];
  quiz: QuizQuestion[];
  project: MiniProject;
  trickyQuestions: TrickyQuestion[];
}

export interface TopicProgress {
  completed: boolean;
  xp: number;
  quizScore: number;
  exercisesDone: string[];
  projectDone: boolean;
  lastVisited: number;
}

export interface AppState {
  currentTopic: string | null;
  currentView: "dashboard" | "topic" | "final" | "certificate" | "profile";
  topicProgress: Record<string, TopicProgress>;
  totalXP: number;
  level: number;
  achievements: string[];
  darkMode: boolean;
  studentName: string;
  finalExamTaken: boolean;
  finalExamScore: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (state: AppState) => boolean;
}

export interface AuthFormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface AuthSession {
  uid: string;
  email: string;
  idToken: string;
  refreshToken?: string;
  displayName?: string;
  expiresAt?: number;
  claims?: Record<string, unknown>;
}

export interface UserProfile {
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
}

export interface AccessKeyRecord {
  id: string;
  code: string;
  durationDays: number;
  expiresAt: string | null;
  createdAt: string | null;
  createdBy: string;
  isUsed: boolean;
  usedBy: string | null;
  usedAt: string | null;
  status: "active" | "used" | "expired" | "revoked";
  note: string;
}

export interface TeacherAssistRequest {
  topicId: string;
  topicTitle: string;
  prompt: string;
  question: string;
  codeSnippet?: string;
  learnerAnswer?: string;
  hint?: string;
  mode: "exercise" | "quiz" | "final";
}

export interface TeacherAssistResponse {
  message: string;
  nextStep: string;
  caution?: string;
}

export interface AdminOverview {
  keys: AccessKeyRecord[];
  stats: {
    total: number;
    active: number;
    used: number;
    expired: number;
  };
}

export interface ProfileUpdateInput {
  fullName: string;
  phone: string;
}

export interface CreateAccessKeyInput {
  durationDays: number;
  note: string;
}

export interface LearningGate {
  locked: boolean;
  reason: "available" | "complete_previous" | "finish_free_track" | "premium_required";
  message?: string;
}
