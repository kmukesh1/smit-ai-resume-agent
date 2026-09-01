import { BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader({ onGuide }: { onGuide: () => void }) {
  return (
    <header className="no-print border-b border-border bg-surface">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-fg">
            <FileText className="size-5" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-primary sm:text-2xl">
              AI Resume Agent
            </h1>
            <p className="text-xs text-muted sm:text-sm">
              Created by <span className="font-semibold text-fg">Asst. Prof. Mukesh Kumar</span>
              {" · "}CSE Department, SMIT
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={onGuide} className="h-10">
            <BookOpen className="size-4" />
            How to Use / Student Guide
          </Button>
          <span className="inline-flex h-10 items-center gap-1.5 rounded-full border border-success/20 bg-success-soft px-3 text-xs font-semibold text-success">
            <span className="size-1.5 rounded-full bg-success" />
            ATS 1-Page
          </span>
          <span className="inline-flex h-10 items-center rounded-full bg-navy px-3 text-xs font-semibold text-navy-fg">
            SMIT CSE
          </span>
        </div>
      </div>
    </header>
  );
}
