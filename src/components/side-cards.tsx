import { CheckCircle2, Quote } from "lucide-react";

const STANDARDS = [
  {
    title: "Zero Hallucination",
    body: "Uses only verified student input.",
  },
  {
    title: "STAR Bullets",
    body: "Action Verb + Task + Impact.",
  },
  {
    title: "Projects First",
    body: "Prioritizes tech builds for placements.",
  },
];

export function SideCards() {
  return (
    <div className="no-print mt-4 grid gap-4 lg:grid-cols-2">
      <div className="rounded-[18px] border border-border bg-surface p-5 shadow-card">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <span className="flex size-5 items-center justify-center rounded-full border border-primary text-[10px] text-primary">
            +
          </span>
          Placement ATS Standards
        </h3>
        <ul className="mt-4 space-y-3">
          {STANDARDS.map((s) => (
            <li key={s.title} className="flex gap-2.5 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
              <p>
                <span className="font-semibold">{s.title}:</span>{" "}
                <span className="text-muted">{s.body}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[18px] bg-navy p-5 text-navy-fg shadow-card">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Quote className="size-4 text-navy-muted" />
          Asst. Prof. Mukesh Kumar's Advice
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-navy-fg/95">
          &ldquo;Always align your top technical projects directly with the target job
          role and state your tech stack explicitly for campus placement drives.&rdquo;
        </p>
        <p className="mt-5 border-t border-white/15 pt-3 text-xs text-navy-muted">
          Department of CSE, SMIT
        </p>
      </div>
    </div>
  );
}

export function HowStudentsUse() {
  const steps = [
    "Pick a track (SDE, AI, or Cloud) so skills match the drive.",
    "Enter only genuine CGPA, projects, and internships.",
    "Use STAR bullets: verb + what you built + measurable impact.",
    "Polish with AI, then print the 1-page ATS sheet.",
  ];
  return (
    <div className="no-print mt-4 rounded-[18px] border border-border bg-surface p-5 shadow-card">
      <h3 className="text-sm font-semibold tracking-wide uppercase">
        How SMIT students use this agent
      </h3>
      <ol className="mt-3 grid gap-2 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-2 text-sm text-muted">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-semibold text-primary">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
