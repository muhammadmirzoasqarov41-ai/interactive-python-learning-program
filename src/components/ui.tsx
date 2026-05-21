import { useEffect, useState, type ReactNode } from "react";

// CodeBlock with syntax highlighting (simple custom)
export function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <div className="group relative my-3 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-950 dark:bg-black">
      {title && (
        <div className="flex items-center justify-between border-b border-slate-700/50 bg-slate-900/80 px-4 py-2 text-xs font-medium text-slate-400">
          <span>🐍 {title}</span>
          <CopyButton text={code} />
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-3 text-sm leading-relaxed">
        <code>
          <Highlighted code={code} />
        </code>
      </pre>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="rounded-md px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-700/50 hover:text-white"
    >
      {copied ? "✓ copied" : "copy"}
    </button>
  );
}

// Simple Python syntax highlighter
const PY_KEYWORDS = [
  "def",
  "class",
  "return",
  "if",
  "elif",
  "else",
  "for",
  "while",
  "in",
  "not",
  "and",
  "or",
  "is",
  "import",
  "from",
  "as",
  "try",
  "except",
  "finally",
  "with",
  "lambda",
  "pass",
  "break",
  "continue",
  "True",
  "False",
  "None",
  "print",
  "len",
  "range",
  "int",
  "float",
  "str",
  "bool",
  "list",
  "tuple",
  "dict",
  "set",
  "type",
  "del",
  "global",
  "nonlocal",
  "raise",
  "yield",
];

function Highlighted({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="mr-4 inline-block w-6 select-none text-right text-slate-600">{i + 1}</span>
          <span className="flex-1">{highlightLine(line)}</span>
        </div>
      ))}
    </>
  );
}

function highlightLine(line: string): ReactNode {
  // Comments
  if (line.trim().startsWith("#")) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  const parts: ReactNode[] = [];
  let rest = line;
  let key = 0;

  while (rest.length > 0) {
    // Find first meaningful token
    const commentIdx = rest.indexOf("#");
    const stringMatch = rest.match(/(""".*?"""|'''.*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|f"(?:\\.|[^"\\])*"|f'(?:\\.|[^'\\])*')/);
    const numMatch = rest.match(/\b(\d+(?:\.\d+)?(?:[eE][+-]?\d+)?j?)\b/);
    const wordMatch = rest.match(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/);

    const candidates: { idx: number; type: string; length: number; value: string }[] = [];
    if (stringMatch && stringMatch.index !== undefined) {
      candidates.push({ idx: stringMatch.index, type: "string", length: stringMatch[0].length, value: stringMatch[0] });
    }
    if (numMatch && numMatch.index !== undefined) {
      candidates.push({ idx: numMatch.index, type: "number", length: numMatch[0].length, value: numMatch[0] });
    }
    if (wordMatch && wordMatch.index !== undefined) {
      candidates.push({ idx: wordMatch.index, type: "word", length: wordMatch[0].length, value: wordMatch[0] });
    }
    if (commentIdx >= 0) {
      candidates.push({ idx: commentIdx, type: "comment", length: rest.length - commentIdx, value: rest.slice(commentIdx) });
    }

    if (candidates.length === 0) {
      parts.push(<span key={key++} className="text-slate-200">{rest}</span>);
      break;
    }

    candidates.sort((a, b) => a.idx - b.idx);
    const first = candidates[0];

    if (first.idx > 0) {
      parts.push(<span key={key++} className="text-slate-200">{rest.slice(0, first.idx)}</span>);
    }

    if (first.type === "string") {
      parts.push(<span key={key++} className="text-emerald-300">{first.value}</span>);
    } else if (first.type === "number") {
      parts.push(<span key={key++} className="text-amber-300">{first.value}</span>);
    } else if (first.type === "comment") {
      parts.push(<span key={key++} className="text-slate-500 italic">{first.value}</span>);
    } else if (first.type === "word") {
      if (PY_KEYWORDS.includes(first.value)) {
        parts.push(<span key={key++} className="text-violet-400 font-medium">{first.value}</span>);
      } else if (first.value[0] === first.value[0].toUpperCase() && first.value[0] !== first.value[0].toLowerCase()) {
        parts.push(<span key={key++} className="text-cyan-300">{first.value}</span>);
      } else {
        parts.push(<span key={key++} className="text-slate-100">{first.value}</span>);
      }
    }
    rest = rest.slice(first.idx + first.length);
  }

  return <>{parts}</>;
}

// Badge
export function Badge({ children, color = "violet" }: { children: ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    slate: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

// Progress Bar
export function ProgressBar({ value, max, color = "violet" }: { value: number; max: number; color?: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const gradients: Record<string, string> = {
    violet: "from-violet-500 to-indigo-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
  };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700/50">
      <div
        className={`h-full bg-gradient-to-r ${gradients[color]} transition-all duration-500 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// Button
export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}) {
  const variants: Record<string, string> = {
    primary: "bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:brightness-110",
    secondary: "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700",
    ghost: "text-slate-300 hover:bg-slate-800 hover:text-white",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// Card
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

// Confetti hook
export function useConfetti() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(t);
  }, [show]);

  const trigger = () => setShow(true);

  const overlay = show ? (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-3 w-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-20px",
            background: `hsl(${Math.random() * 360}, 90%, 60%)`,
            animation: `fall ${2 + Math.random() * 2}s linear forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  ) : null;

  return { trigger, overlay };
}

// Icon
export function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    python: (
      <>
        <path d="M12 2a6 6 0 0 0-6 6v3h6v1H5a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4h2v-3a4 4 0 0 1 4-4h6a4 4 0 0 0 4-4V8a6 6 0 0 0-6-6h-3zm-2 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
        <path d="M19 12h-2v3a4 4 0 0 1-4 4H7a4 4 0 0 0-4 4v1a6 6 0 0 0 6 6h3a6 6 0 0 0 6-6v-3h-6v-1h7a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4zm-5 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="currentColor" opacity="0.6" />
      </>
    ),
    trophy: (
      <>
        <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />
        <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />
        <path d="M6 3h12v8a6 6 0 0 1-12 0V3z M9 21h6 M12 17v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />
      </>
    ),
    home: (
      <path d="M3 12l9-9 9 9v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />
    ),
    check: <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" stroke="currentColor" fill="none" />,
    x: <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />,
    back: <path d="M19 12H5M11 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />
      </>
    ),
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />,
    zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="currentColor" />,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" fill="none" />,
    lock: (
      <>
        <rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 11V8a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="14" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M11 14h10M17 14v-3M20 14v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    sparkles: (
      <>
        <path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2z" fill="currentColor" />
        <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8L5 16zM19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" fill="currentColor" opacity="0.7" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </>
    ),
    shield: (
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" />
    ),
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      {paths[name] || null}
    </svg>
  );
}
