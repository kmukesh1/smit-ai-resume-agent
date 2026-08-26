import { createFileRoute } from "@tanstack/react-router";
import { Printer, Sparkles, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/app-header";
import { FormPanel } from "@/components/form-panel";
import { GuideDialog } from "@/components/guide-dialog";
import { ResumeSheet } from "@/components/resume-preview";
import { HowStudentsUse, SideCards } from "@/components/side-cards";
import { Button } from "@/components/ui/button";
import { polishResume } from "@/lib/polish";
import { hasCore } from "@/lib/resume-model";
import { useResumeStore } from "@/store/resume-store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { data, hydrate, merge, notice, setNotice } = useResumeStore();
  const [guide, setGuide] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  async function onPolish() {
    if (!hasCore(data)) {
      setError("Add name, target role, and skills first.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await polishResume({ data });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      merge({
        projects: result.patch.projects ?? data.projects,
        experience: result.patch.experience ?? data.experience,
        achievements: result.patch.achievements ?? data.achievements,
      });
      setNotice("STAR bullets polished from your verified input.");
    } catch {
      setError("Could not reach AI polish. Your live preview still works.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <AppHeader onGuide={() => setGuide(true)} />
      <main className="mx-auto grid max-w-[1320px] gap-5 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start sm:px-6">
        <FormPanel />
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 no-print">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
                Live ATS Resume Preview
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10"
                disabled={busy}
                onClick={onPolish}
              >
                <Sparkles className="size-3.5" />
                {busy ? "Polishing…" : "Polish STAR with AI"}
              </Button>
              <Button size="sm" className="h-10" onClick={() => window.print()}>
                <Printer className="size-3.5" />
                Print 1-Page PDF
              </Button>
            </div>
          </div>
          {notice ? (
            <p className="no-print mb-3 rounded-md bg-success-soft px-3 py-2 text-xs text-success">
              {notice}
            </p>
          ) : null}
          {error ? (
            <p className="no-print mb-3 flex items-center gap-2 rounded-md bg-chip px-3 py-2 text-xs text-danger">
              <CircleAlert className="size-3.5" />
              {error}
            </p>
          ) : null}
          <ResumeSheet data={data} />
          <SideCards />
          <HowStudentsUse />
        </div>
      </main>
      <GuideDialog open={guide} onClose={() => setGuide(false)} />
    </div>
  );
}
