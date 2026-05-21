import { useState } from "react";
import type { TeacherAssistRequest, TeacherAssistResponse } from "../types";
import { Badge, Button, Card, Icon } from "./ui";

export function TeacherAssistant({
  request,
  onAsk,
}: {
  request: TeacherAssistRequest;
  onAsk: (request: TeacherAssistRequest) => Promise<TeacherAssistResponse>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<TeacherAssistResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk() {
    setLoading(true);
    setError(null);
    try {
      const result = await onAsk(request);
      setResponse(result);
      setOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Teacher AI javob bera olmadi.");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => void handleAsk()} variant="ghost" size="md" className="border border-violet-500/20 bg-violet-500/5 text-violet-200 hover:bg-violet-500/10">
          <Icon name="sparkles" className="h-4 w-4" />
          {loading ? "Teacher AI o'ylayapti..." : "Teacher AI yordam"}
        </Button>
        <Badge color="violet">Only hints</Badge>
      </div>

      {open && (
        <Card className="mt-3 border-violet-500/20 bg-violet-500/5 p-4">
          {error ? (
            <div className="text-sm text-rose-200">{error}</div>
          ) : response ? (
            <div className="space-y-3 text-sm">
              <div>
                <div className="mb-1 font-semibold text-violet-200">Teacher AI</div>
                <div className="text-slate-200">{response.message}</div>
              </div>
              <div>
                <div className="mb-1 font-semibold text-emerald-200">Keyingi qadam</div>
                <div className="text-slate-200">{response.nextStep}</div>
              </div>
              {response.caution && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-amber-100">
                  {response.caution}
                </div>
              )}
            </div>
          ) : null}
        </Card>
      )}
    </div>
  );
}
