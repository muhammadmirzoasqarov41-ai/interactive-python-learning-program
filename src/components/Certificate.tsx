import { useRef } from "react";
import { Button, Icon, Card } from "./ui";
import type { AppState } from "../types";

export function Certificate({
  state,
  onBack,
}: {
  state: AppState;
  onBack: () => void;
}) {
  const certRef = useRef<HTMLDivElement>(null);
  const date = new Date().toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const downloadImage = async () => {
    if (!certRef.current) return;
    // Use canvas via html-to-image-style manual drawing — but simpler: save as HTML
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Certificate</title>
<style>
body{font-family:system-ui,-apple-system,sans-serif;margin:0;padding:40px;background:#f5f5f5;display:flex;justify-content:center;align-items:center;min-height:100vh}
.cert{width:800px;background:linear-gradient(135deg,#fef3c7,#fff);border:8px double #d97706;padding:60px;text-align:center;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.1)}
h1{font-size:48px;color:#92400e;margin:0 0 10px}
.sub{font-size:20px;color:#78350f;margin-bottom:40px}
.name{font-size:42px;color:#7c2d12;font-weight:bold;margin:20px 0;border-bottom:2px solid #d97706;padding-bottom:20px;display:inline-block}
.desc{font-size:18px;color:#44403c;margin:30px auto;max-width:600px;line-height:1.6}
.score{font-size:24px;color:#b45309;font-weight:bold;margin:20px 0}
.footer{display:flex;justify-content:space-between;margin-top:60px;color:#78350f;font-size:14px}
.seal{font-size:64px;margin:20px 0}
</style></head><body>
<div class="cert">
<div style="font-size:64px">🏆</div>
<h1>CERTIFICATE</h1>
<div class="sub">of Achievement</div>
<p style="color:#78350f">This certificate is proudly presented to</p>
<div class="name">${state.studentName}</div>
<div class="desc">
for successfully completing the <strong>Python Fundamentals Master</strong> course, demonstrating mastery of all 11 core data types including int, float, str, bool, list, tuple, dict, set, NoneType, complex, and bytes.
</div>
<div class="score">Final Exam Score: ${state.finalExamScore}%</div>
<div class="seal">🎓</div>
<div class="footer">
<div>Date: ${date}</div>
<div>PyMentor Academy</div>
<div>Python Master</div>
</div>
</div>
</body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PyMentor_Certificate_${state.studentName.replace(/\s/g, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <Icon name="back" className="h-4 w-4" />
          Dashboard'ga qaytish
        </button>
        <Button onClick={downloadImage} variant="primary" size="md">
          ⬇️ Yuklab olish
        </Button>
      </div>

      <div
        ref={certRef}
        className="relative overflow-hidden rounded-3xl border-8 border-double border-amber-600 bg-gradient-to-br from-amber-50 via-white to-amber-50 p-8 shadow-2xl dark:from-amber-950 dark:via-slate-900 dark:to-amber-950 sm:p-16"
      >
        {/* Corner ornaments */}
        <div className="absolute left-4 top-4 text-4xl opacity-30">✨</div>
        <div className="absolute right-4 top-4 text-4xl opacity-30">✨</div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-30">✨</div>
        <div className="absolute bottom-4 right-4 text-4xl opacity-30">✨</div>

        <div className="text-center">
          <div className="mb-4 text-7xl">🏆</div>
          <h1 className="mb-2 text-5xl font-bold tracking-wider text-amber-900 dark:text-amber-200 sm:text-6xl">
            CERTIFICATE
          </h1>
          <p className="mb-8 text-xl tracking-widest text-amber-700 dark:text-amber-400">
            OF ACHIEVEMENT
          </p>

          <p className="mb-4 text-lg text-slate-700 dark:text-slate-300">
            This certificate is proudly presented to
          </p>

          <div className="mb-8 inline-block border-b-4 border-double border-amber-600 pb-4 px-8">
            <div className="text-4xl font-bold tracking-wide text-amber-900 dark:text-amber-200 sm:text-5xl">
              {state.studentName}
            </div>
          </div>

          <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            for successfully completing the{" "}
            <span className="font-bold text-amber-700 dark:text-amber-400">
              Python Fundamentals Master
            </span>{" "}
            course, demonstrating mastery of all 11 core data types and passing the final examination.
          </p>

          <div className="mb-6 text-2xl font-bold text-amber-700 dark:text-amber-400">
            Final Exam Score: {state.finalExamScore}%
          </div>

          <div className="mb-8 text-7xl">🎓</div>

          <div className="flex items-end justify-between gap-4 border-t-2 border-amber-700/20 pt-6 text-sm text-amber-800 dark:text-amber-300">
            <div className="flex-1">
              <div className="border-b border-amber-700/30 pb-1">{date}</div>
              <div className="mt-1 text-xs uppercase tracking-wider">Date Issued</div>
            </div>
            <div className="flex-1">
              <div className="border-b border-amber-700/30 pb-1">PyMentor Academy</div>
              <div className="mt-1 text-xs uppercase tracking-wider">Institution</div>
            </div>
            <div className="flex-1">
              <div className="border-b border-amber-700/30 pb-1">Python Master</div>
              <div className="mt-1 text-xs uppercase tracking-wider">Title Awarded</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Card className="p-6">
          <h3 className="mb-2 font-bold text-white">🎉 Tabriklaymiz!</h3>
          <p className="text-slate-300">
            Siz Python'ning 11 ta asosiy data type'ini to'liq o'zlashtirdingiz. Endi siz haqiqiy Python dasturchisi sifatida mustaqil loyihalar yarata olasiz! Keyingi qadam: OOP, fayllar bilan ishlash, va real-world loyihalar.
          </p>
        </Card>
      </div>
    </div>
  );
}
