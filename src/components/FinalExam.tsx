import { useState } from "react";
import { FINAL_EXAM } from "../data/finalExam";
import { Button, Icon, Card, Badge, ProgressBar, CodeBlock, useConfetti } from "./ui";
import type { TeacherAssistRequest, TeacherAssistResponse } from "../types";
import { TeacherAssistant } from "./TeacherAssistant";

export function FinalExam({
  onBack,
  onSubmit,
  onAskTeacher,
}: {
  onBack: () => void;
  onSubmit: (score: number) => void;
  onAskTeacher: (request: TeacherAssistRequest) => Promise<TeacherAssistResponse>;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const confetti = useConfetti();

  const total = FINAL_EXAM.length;
  const q = FINAL_EXAM[current];

  const submit = () => {
    if (selected === null) return;
    setShowAnswer(true);
    if (selected === q.correctIndex) setCorrect((c) => c + 1);
  };

  const next = () => {
    if (current + 1 >= total) {
      const score = Math.round((correct / total) * 100);
      onSubmit(score);
      if (score >= 80) confetti.trigger();
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowAnswer(false);
    }
  };

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Card className="p-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 text-5xl shadow-2xl shadow-amber-500/30">
            🏆
          </div>
          <h1 className="mb-3 text-4xl font-bold text-white">Final Imtihon</h1>
          <p className="mb-6 text-slate-400">
            Barcha 11 ta mavzudan test. 15 ta savol. 80%+ natija — <span className="text-amber-300">Python Fundamentals Master</span> sertifikati!
          </p>

          <div className="mb-8 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <div className="text-3xl font-bold text-amber-300">15</div>
              <div className="text-xs text-slate-400">savol</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <div className="text-3xl font-bold text-amber-300">80%</div>
              <div className="text-xs text-slate-400">minimal</div>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
              <div className="text-3xl font-bold text-amber-300">🎓</div>
              <div className="text-xs text-slate-400">sertifikat</div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button onClick={onBack} variant="secondary" size="lg">
              Ortga
            </Button>
            <Button onClick={() => setStarted(true)} variant="primary" size="lg">
              Boshlash
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (finished) {
    const score = Math.round((correct / total) * 100);
    const passed = score >= 80;
    return (
      <>
        {confetti.overlay}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <Card className={`p-8 text-center ${passed ? "border-amber-500/30" : ""}`}>
            <div className="mb-4 text-7xl">{passed ? "🎓" : "📚"}</div>
            <h1 className="mb-3 text-4xl font-bold text-white">
              {passed ? "Tabriklayman!" : "Yana urinib ko'ring!"}
            </h1>
            <p className="mb-6 text-lg text-slate-300">
              Siz <span className="font-bold text-amber-300">{correct}/{total}</span> savolga to'g'ri javob berdingiz
            </p>
            <div className="mx-auto mb-6 max-w-md">
              <ProgressBar value={score} max={100} color={passed ? "emerald" : "amber"} />
              <div className="mt-2 text-2xl font-bold text-white">{score}%</div>
            </div>

            {passed ? (
              <div className="mb-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6">
                <div className="mb-2 text-5xl">🏆</div>
                <div className="text-xl font-bold text-amber-200">Siz Python Fundamentals Master bo'ldingiz!</div>
                <p className="mt-2 text-sm text-slate-300">
                  Sertifikatingiz tayyor. Uni yuklab olishingiz mumkin.
                </p>
              </div>
            ) : (
              <div className="mb-6 rounded-xl border border-slate-700 bg-slate-950/50 p-4 text-slate-300">
                Kamida 80% kerak. Mavzularni qayta o'qib, yana urinib ko'ring!
              </div>
            )}

            <div className="flex justify-center gap-3">
              <Button onClick={onBack} variant="secondary" size="lg">
                Dashboard
              </Button>
              <Button
                onClick={() => {
                  setCurrent(0);
                  setSelected(null);
                  setShowAnswer(false);
                  setCorrect(0);
                  setFinished(false);
                }}
                variant="primary"
                size="lg"
              >
                Qayta topshirish
              </Button>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <Card className="mb-4 p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge color="amber">FINAL</Badge>
            <span className="text-sm text-slate-400">
              Savol {current + 1} / {total}
            </span>
          </div>
          <div className="text-sm font-bold text-white">
            {correct} ✓
          </div>
        </div>
        <ProgressBar value={current + 1} max={total} color="amber" />
      </Card>

      <Card className="p-6 sm:p-8">
        <p className="mb-4 text-lg font-medium text-white">{q.question}</p>
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
                    ? "border-amber-500 bg-amber-500/10 text-white"
                    : "border-slate-700 bg-slate-950/50 text-slate-200 hover:border-slate-600 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                      showCorrect
                        ? "border-emerald-400 bg-emerald-500/20"
                        : showWrong
                        ? "border-rose-400 bg-rose-500/20"
                        : isSelected
                        ? "border-amber-400 bg-amber-500/20"
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
            topicId: "final-exam",
            topicTitle: "Final Exam",
            prompt: q.question,
            question: q.question,
            codeSnippet: q.code,
            learnerAnswer: selected !== null ? q.options[selected] : "",
            hint: q.explanation,
            mode: "final",
          }}
          onAsk={onAskTeacher}
        />

        <div className="mt-6 flex justify-end">
          {!showAnswer ? (
            <Button onClick={submit} disabled={selected === null} variant="primary" size="md">
              Javobni tasdiqlash
            </Button>
          ) : (
            <Button onClick={next} variant="primary" size="md">
              {current + 1 >= total ? "Natijani ko'rish" : "Keyingi"}
              <Icon name="arrow" className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
