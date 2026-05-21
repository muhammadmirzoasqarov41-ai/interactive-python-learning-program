import { useState } from "react";
import type { Topic, Exercise } from "../types";
import { CodeBlock, Button, Icon, Card, Badge, ProgressBar, useConfetti } from "./ui";
import { ensureTopicProgress } from "../hooks/useProgress";
import type { AppState, TeacherAssistRequest, TeacherAssistResponse } from "../types";
import { TeacherAssistant } from "./TeacherAssistant";

type SectionId =
  | "intro"
  | "learn"
  | "mistakes"
  | "exercises"
  | "quiz"
  | "project"
  | "tricky";

const SECTIONS: { id: SectionId; title: string; icon: string }[] = [
  { id: "intro", title: "Kirish", icon: "👋" },
  { id: "learn", title: "O'rganish", icon: "📖" },
  { id: "mistakes", title: "Xatolar", icon: "⚠️" },
  { id: "exercises", title: "Mashqlar", icon: "💪" },
  { id: "quiz", title: "Quiz", icon: "🎯" },
  { id: "project", title: "Loyiha", icon: "🛠️" },
  { id: "tricky", title: "Qiyin savollar", icon: "🧠" },
];

export function TopicView({
  topic,
  state,
  onBack,
  onExerciseDone,
  onQuizDone,
  onProjectDone,
  onComplete,
  onAskTeacher,
}: {
  topic: Topic;
  state: AppState;
  onBack: () => void;
  onExerciseDone: (id: string) => void;
  onQuizDone: (score: number) => void;
  onProjectDone: () => void;
  onComplete: () => void;
  onAskTeacher: (request: TeacherAssistRequest) => Promise<TeacherAssistResponse>;
}) {
  const [section, setSection] = useState<SectionId>("intro");
  const progress = ensureTopicProgress(state, topic.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      {/* Topic Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <Icon name="back" className="h-4 w-4" />
          Dashboard'ga qaytish
        </button>

        <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:flex-row sm:items-center">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${topic.accent} text-3xl shadow-lg`}>
            {topic.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Badge color={topic.difficulty === "Beginner" ? "emerald" : "amber"}>
                {topic.difficulty}
              </Badge>
              {progress.completed && <Badge color="violet">✓ Tugallangan</Badge>}
            </div>
            <h1 className="mt-2 font-mono text-3xl font-bold text-white">{topic.title}</h1>
            <p className="text-slate-400">{topic.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              section === s.id
                ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.title}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="min-h-[400px]">
        {section === "intro" && <IntroSection topic={topic} onNext={() => setSection("learn")} />}
        {section === "learn" && <LearnSection topic={topic} onNext={() => setSection("mistakes")} />}
        {section === "mistakes" && <MistakesSection topic={topic} onNext={() => setSection("exercises")} />}
        {section === "exercises" && (
          <ExercisesSection
            topic={topic}
            state={state}
            onExerciseDone={onExerciseDone}
            onNext={() => setSection("quiz")}
            onAskTeacher={onAskTeacher}
          />
        )}
        {section === "quiz" && (
          <QuizSection
            topic={topic}
            onQuizDone={onQuizDone}
            onNext={() => setSection("project")}
            onAskTeacher={onAskTeacher}
          />
        )}
        {section === "project" && (
          <ProjectSection
            topic={topic}
            done={progress.projectDone}
            onProjectDone={onProjectDone}
            onNext={() => setSection("tricky")}
          />
        )}
        {section === "tricky" && (
          <TrickySection topic={topic} onComplete={() => { onComplete(); onBack(); }} />
        )}
      </div>
    </div>
  );
}

// INTRO SECTION
function IntroSection({ topic, onNext }: { topic: Topic; onNext: () => void }) {
  return (
    <Card className="p-6 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-2xl font-bold text-white">Keling boshlaymiz! 🚀</h2>
        <p className="mb-6 text-lg leading-relaxed text-slate-300">{topic.intro}</p>

        <div className="mb-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-300">
            <span>📌</span> Bugun nimalarni o'rganasiz:
          </div>
          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> {topic.title} nima va qanday ishlatiladi</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Real hayotdan analogiya va misollar</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Eng keng tarqalgan xatolar va yechimlari</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Amaliy mashqlar va quiz</li>
            <li className="flex items-start gap-2"><span className="text-emerald-400">✓</span> Mini-loyiha</li>
          </ul>
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} variant="primary" size="lg">
            O'rganishni boshlash
            <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

// LEARN SECTION
function LearnSection({ topic, onNext }: { topic: Topic; onNext: () => void }) {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <span>📚</span> Definition — nima bu?
        </h2>
        <p className="text-slate-300">{renderInlineCode(topic.definition)}</p>
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <span>💡</span> Analogy — tushunish oson
        </h2>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-slate-300 italic">
          {renderInlineCode(topic.analogy)}
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <span>⚙️</span> Syntax — qanday yoziladi
        </h2>
        <CodeBlock code={topic.syntax} title={`${topic.title} syntax`} />
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <span>🔍</span> Misollar (line-by-line tushuntirish bilan)
        </h2>
        <div className="space-y-4">
          {topic.examples.map((ex, i) => (
            <div key={i} className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <div className="mb-2 text-xs font-bold uppercase text-violet-400">Misol {i + 1}</div>
              <CodeBlock code={ex.code} />
              <p className="mt-2 text-sm text-slate-300">{ex.explanation}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <span>🔬</span> Line-by-Line (qator-qator tahlil)
        </h2>
        <div className="space-y-3">
          {topic.lineByLine.map((l, i) => (
            <div key={i} className="flex gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-3">
              <code className="shrink-0 rounded-md bg-slate-900 px-2 py-1 font-mono text-sm text-emerald-300">
                {l.line}
              </code>
              <p className="text-sm text-slate-300">{l.explanation}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 sm:p-8">
        <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
          <span>🌍</span> Qayerda ishlatiladi?
        </h2>
        <ul className="space-y-2">
          {topic.whereUsed.map((w, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-300">
                {i + 1}
              </span>
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" size="lg">
          Keyingi: Xatolar
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// MISTAKES SECTION
function MistakesSection({ topic, onNext }: { topic: Topic; onNext: () => void }) {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
          <span>⚠️</span> Eng keng tarqalgan xatolar
        </h2>
        <p className="mb-6 text-slate-400">
          Bu xatolarni har bir yangi dasturchi qiladi. Ularni oldindan bilsangiz — vaqtingizni tejaysiz!
        </p>

        <div className="space-y-5">
          {topic.commonMistakes.map((m, i) => (
            <div key={i} className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <Badge color="rose">Xato #{i + 1}</Badge>
                <h3 className="font-bold text-white">{m.mistake}</h3>
              </div>
              <CodeBlock code={m.code} title="❌ Xato kod" />
              <div className="my-3 flex gap-2 text-sm">
                <span className="font-bold text-rose-300">Nega?</span>
                <span className="text-slate-300">{m.why}</span>
              </div>
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <div className="mb-1 text-xs font-bold uppercase text-emerald-400">✓ To'g'ri yechim</div>
                <CodeBlock code={m.fix} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" size="lg">
          Keyingi: Mashqlar
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// EXERCISES SECTION
function ExercisesSection({
  topic,
  state,
  onExerciseDone,
  onNext,
  onAskTeacher,
}: {
  topic: Topic;
  state: AppState;
  onExerciseDone: (id: string) => void;
  onNext: () => void;
  onAskTeacher: (request: TeacherAssistRequest) => Promise<TeacherAssistResponse>;
}) {
  const progress = ensureTopicProgress(state, topic.id);
  const doneCount = progress.exercisesDone.length;
  const totalCount = topic.exercises.length;
  const allDone = doneCount === totalCount;

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <span>💪</span> Mashqlar
          </h2>
          <Badge color={allDone ? "emerald" : "violet"}>
            {doneCount}/{totalCount} tugadi
          </Badge>
        </div>
        <p className="mb-4 text-slate-400">
          Har bir savolga javob bering. Noto'g'ri bo'lsa — mentor tushuntirib beradi.
        </p>
        <ProgressBar value={doneCount} max={totalCount} color="emerald" />
      </Card>

      {topic.exercises.map((ex, idx) => (
        <ExerciseCard
          key={ex.id}
          exercise={ex}
          topic={topic}
          index={idx + 1}
          done={progress.exercisesDone.includes(ex.id)}
          onDone={() => onExerciseDone(ex.id)}
          onAskTeacher={onAskTeacher}
        />
      ))}

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" size="lg">
          Keyingi: Quiz
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function ExerciseCard({
  exercise,
  topic,
  index,
  done,
  onDone,
  onAskTeacher,
}: {
  exercise: Exercise;
  topic: Topic;
  index: number;
  done: boolean;
  onDone: () => void;
  onAskTeacher: (request: TeacherAssistRequest) => Promise<TeacherAssistResponse>;
}) {
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const check = () => {
    const trimmed = answer.trim().toLowerCase().replace(/\s+/g, "");
    const correct = exercise.expected.some((e) => {
      const expectedNorm = e.trim().toLowerCase().replace(/\s+/g, "");
      return trimmed === expectedNorm || trimmed.includes(expectedNorm);
    });

    if (correct) {
      setStatus("correct");
      onDone();
    } else {
      setStatus("wrong");
      setAttempts((a) => a + 1);
      if (attempts >= 1) setShowHint(true);
    }
  };

  const reset = () => {
    setAnswer("");
    setStatus("idle");
  };

  return (
    <Card className={`p-5 sm:p-6 ${status === "correct" ? "border-emerald-500/40 bg-emerald-500/5" : status === "wrong" ? "border-rose-500/30" : ""}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge color="violet">Mashq #{index}</Badge>
          <Badge color="slate">{exercise.type}</Badge>
        </div>
        {done && <Badge color="emerald">✓ Bajarildi</Badge>}
      </div>

      <p className="mb-3 text-slate-200">{exercise.prompt}</p>

      {exercise.codeSnippet && <CodeBlock code={exercise.codeSnippet} title="Kod" />}

      <p className="mt-3 font-medium text-white">{exercise.question}</p>

      {status === "correct" ? (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <Icon name="check" className="h-5 w-5" /> Ajoyib! Javob to'g'ri! 🎉
          </div>
          <p className="mt-1 text-sm text-slate-300">
            Sizga +25 XP qo'shildi. Keyingisiga o'ting!
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && answer.trim() && check()}
            placeholder="Javobingizni yozing..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button onClick={check} disabled={!answer.trim()} variant="primary" size="md">
              Tekshirish
            </Button>
            <Button onClick={() => setShowHint((s) => !s)} variant="ghost" size="md">
              💡 {showHint ? "Yashirish" : "Ko'rsatish"}
            </Button>
            {status === "wrong" && (
              <Button onClick={reset} variant="secondary" size="md">
                Qayta urinish
              </Button>
            )}
          </div>

          {showHint && (
            <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-sm text-amber-200">
              <strong>💡 Yo'riqnoma:</strong> {exercise.hint}
            </div>
          )}

          <TeacherAssistant
            request={{
              topicId: topic.id,
              topicTitle: topic.title,
              prompt: exercise.prompt,
              question: exercise.question,
              codeSnippet: exercise.codeSnippet,
              learnerAnswer: answer,
              hint: exercise.hint,
              mode: "exercise",
            }}
            onAsk={onAskTeacher}
          />

          {status === "wrong" && (
            <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
              <div className="mb-2 flex items-center gap-2 font-bold text-rose-300">
                <Icon name="x" className="h-5 w-5" /> Noto'g'ri — tushuntirib beraman
              </div>
              <p className="text-sm text-slate-300">
                {getExplanation(exercise)}
              </p>
              <p className="mt-2 text-sm text-slate-400">
                <strong>Urinishlar:</strong> {attempts}. Xatolardan o'rganamiz — qayta urinib ko'ring!
              </p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function getExplanation(ex: Exercise): string {
  if (ex.type === "output") {
    return `Kodni qatorma-qator o'qing: avval o'zgaruvchilar, keyin amallar, keyin natija. Kutilgan javob: ${ex.expected[0]}`;
  }
  if (ex.type === "type") {
    return `type() funksiyasi qanday qiymat qaytarishini o'ylab ko'ring. Masalan, float — kasr son.`;
  }
  if (ex.type === "fix") {
    return `Xatoni topish uchun: xato xabarini o'qing va qaysi qator muammo ekanligini toping.`;
  }
  return `Kodni diqqat bilan o'qing va mantiqiy javobni toping.`;
}

// QUIZ SECTION
function QuizSection({
  topic,
  onQuizDone,
  onNext,
  onAskTeacher,
}: {
  topic: Topic;
  onQuizDone: (score: number) => void;
  onNext: () => void;
  onAskTeacher: (request: TeacherAssistRequest) => Promise<TeacherAssistResponse>;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const confetti = useConfetti();

  const q = topic.quiz[current];
  const total = topic.quiz.length;

  const submit = () => {
    if (selected === null) return;
    setShowAnswer(true);
    if (selected === q.correctIndex) setCorrect((c) => c + 1);
  };

  const next = () => {
    if (current + 1 >= total) {
      const score = Math.round((correct / total) * 100);
      onQuizDone(score);
      if (score >= 80) confetti.trigger();
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  if (finished) {
    const score = Math.round((correct / total) * 100);
    return (
      <>
        {confetti.overlay}
        <Card className="p-8 text-center">
          <div className="mb-4 text-6xl">{score >= 80 ? "🏆" : score >= 50 ? "👍" : "📚"}</div>
          <h2 className="mb-2 text-3xl font-bold text-white">
            {score >= 80 ? "Ajoyib!" : score >= 50 ? "Yaxshi!" : "Davom eting!"}
          </h2>
          <p className="mb-6 text-slate-400">
            Siz <span className="font-bold text-white">{correct}/{total}</span> savolga to'g'ri javob berdingiz
          </p>
          <div className="mx-auto mb-6 max-w-sm">
            <ProgressBar value={score} max={100} color={score >= 80 ? "emerald" : "amber"} />
            <div className="mt-2 text-sm text-slate-400">
              Natija: <span className="font-bold text-white">{score}%</span>
            </div>
          </div>
          <Button onClick={onNext} variant="primary" size="lg">
            Keyingi: Loyiha
            <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </Card>
      </>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <span>🎯</span> Quiz
          </h2>
          <Badge color="violet">
            {current + 1}/{total}
          </Badge>
        </div>
        <ProgressBar value={current + 1} max={total} color="violet" />
      </Card>

      <Card className="p-6 sm:p-8">
        <p className="mb-4 text-lg text-white">{q.question}</p>
        {q.code && <CodeBlock code={q.code} />}

        <div className="mt-4 space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correctIndex;
            const isSelected = selected === i;
            const showCorrect = showAnswer && isCorrect;
            const showWrong = showAnswer && isSelected && !isCorrect;

            return (
              <button
                key={i}
                onClick={() => !showAnswer && setSelected(i)}
                disabled={showAnswer}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  showCorrect
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-200"
                    : showWrong
                    ? "border-rose-500 bg-rose-500/10 text-rose-200"
                    : isSelected
                    ? "border-violet-500 bg-violet-500/10 text-white"
                    : "border-slate-700 bg-slate-950/50 text-slate-200 hover:border-slate-600 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                      showCorrect
                        ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                        : showWrong
                        ? "border-rose-400 bg-rose-500/20 text-rose-200"
                        : isSelected
                        ? "border-violet-400 bg-violet-500/20 text-violet-200"
                        : "border-slate-600 text-slate-400"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="font-mono text-sm">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div
            className={`mt-4 rounded-xl border p-4 ${
              selected === q.correctIndex
                ? "border-emerald-500/30 bg-emerald-500/5"
                : "border-rose-500/30 bg-rose-500/5"
            }`}
          >
            <div className="mb-1 font-bold text-white">
              {selected === q.correctIndex ? "✓ To'g'ri!" : "✗ Noto'g'ri"}
            </div>
            <p className="text-sm text-slate-300">{q.explanation}</p>
          </div>
        )}

        <TeacherAssistant
          request={{
            topicId: topic.id,
            topicTitle: topic.title,
            prompt: q.question,
            question: q.question,
            codeSnippet: q.code,
            learnerAnswer: selected !== null ? q.options[selected] : "",
            hint: q.explanation,
            mode: "quiz",
          }}
          onAsk={onAskTeacher}
        />

        <div className="mt-6 flex justify-between">
          <div />
          {!showAnswer ? (
            <Button onClick={submit} disabled={selected === null} variant="primary" size="md">
              Javobni tasdiqlash
            </Button>
          ) : (
            <Button onClick={next} variant="primary" size="md">
              {current + 1 >= total ? "Natijani ko'rish" : "Keyingi savol"}
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

// PROJECT SECTION
function ProjectSection({
  topic,
  done,
  onProjectDone,
  onNext,
}: {
  topic: Topic;
  done: boolean;
  onProjectDone: () => void;
  onNext: () => void;
}) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <span>🛠️</span> Amaliy Loyiha: {topic.project.title}
          </h2>
          {done && <Badge color="emerald">✓ Tugallangan</Badge>}
        </div>
        <p className="mb-4 text-slate-300">{topic.project.description}</p>

        <div className="mb-4">
          <h3 className="mb-2 font-semibold text-white">📝 Vazifalar:</h3>
          <ul className="space-y-2">
            {topic.project.tasks.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-300">
                  {i + 1}
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="mb-2 font-semibold text-white">💻 Boshlang'ich kod:</h3>
        <CodeBlock code={topic.project.starterCode} title="Starter code" />

        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={() => setShowSolution((s) => !s)} variant="secondary" size="md">
            {showSolution ? "Yechimni yashirish" : "🔍 Yechimni ko'rish"}
          </Button>
          {!done && (
            <Button onClick={onProjectDone} variant="success" size="md">
              ✓ Loyihani tugatdim (+75 XP)
            </Button>
          )}
        </div>

        {showSolution && (
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <h4 className="mb-2 font-bold text-emerald-300">✓ Namuna yechim:</h4>
            <CodeBlock code={topic.project.solutionCode} />
            <div className="mt-3 text-sm text-slate-400">
              <strong>Tekshirish punktlari:</strong>
              <ul className="mt-1 space-y-1">
                {topic.project.checkPoints.map((cp, i) => (
                  <li key={i}>• {cp}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} variant="primary" size="lg">
          Keyingi: Qiyin savollar
          <Icon name="arrow" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// TRICKY SECTION
function TrickySection({ topic, onComplete }: { topic: Topic; onComplete: () => void }) {
  const [revealed, setRevealed] = useState<number[]>([]);
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
          <span>🧠</span> Qiyin savollar (Pro uchun)
        </h2>
        <p className="mb-6 text-slate-400">
          Bu savollar sizni chuqur o'ylashga majbur qiladi. Avval o'zingiz javobni o'ylab ko'ring, keyin ko'rsating.
        </p>

        <div className="space-y-4">
          {topic.trickyQuestions.map((tq, i) => (
            <div key={i} className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
              <p className="mb-2 font-bold text-white">{tq.question}</p>
              {tq.code && <CodeBlock code={tq.code} />}
              <button
                onClick={() => setRevealed((r) => (r.includes(i) ? r : [...r, i]))}
                className="mt-3 text-sm font-medium text-violet-300 hover:text-violet-200"
              >
                {revealed.includes(i) ? "👁️ Yashirish" : "👀 Javobni ko'rsatish"}
              </button>
              {revealed.includes(i) && (
                <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-100">
                  <strong className="text-emerald-300">✓ Javob:</strong>
                  <div className="mt-1">{tq.answer}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-6 text-center">
          <div className="mb-2 text-4xl">🎉</div>
          <h3 className="mb-2 text-xl font-bold text-white">Tabriklayman!</h3>
          <p className="mb-4 text-slate-300">
            Siz <span className="font-mono font-bold text-violet-300">{topic.title}</span> mavzusini to'liq tugatdingiz!
          </p>
          <Button onClick={onComplete} variant="primary" size="lg">
            Dashboard'ga qaytish
            <Icon name="arrow" className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Helper: render inline code blocks (text with `code` in it)
function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("`") && p.endsWith("`") ? (
          <code key={i} className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-violet-300">
            {p.slice(1, -1)}
          </code>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}
