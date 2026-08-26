import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GuideDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-end justify-center bg-fg/40 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-lg overflow-auto rounded-2xl bg-surface p-6 shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="guide-title" className="text-lg font-semibold">
            Student Guide
          </h2>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-muted hover:bg-bg">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            This agent builds a one-page ATS resume from your own facts. It will not invent
            internships, ranks, or tools.
          </p>
          <p>
            <span className="font-semibold text-fg">1. Track templates</span> fill a role-aligned
            skill list. Keep only technologies you can defend in an interview.
          </p>
          <p>
            <span className="font-semibold text-fg">2. Projects first.</span> Campus recruiters
            scan builds before internships. Three strong projects beat six weak ones.
          </p>
          <p>
            <span className="font-semibold text-fg">3. STAR bullets.</span> Start with an action
            verb, name the task, end with impact (time saved, users, accuracy).
          </p>
          <p>
            <span className="font-semibold text-fg">4. Print 1-page.</span> Use the browser print
            dialog and choose Save as PDF. Keep it on a single A4 page.
          </p>
        </div>
        <Button className="mt-5 w-full" onClick={onClose}>
          Got it
        </Button>
      </div>
    </div>
  );
}
