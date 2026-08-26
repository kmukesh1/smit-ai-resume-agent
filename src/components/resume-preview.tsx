import { FileUp } from "lucide-react";
import { hasCore, splitLines, type ResumeData } from "@/lib/resume-model";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-3">
      <h3 className="border-b border-fg/80 pb-0.5 text-[11px] font-bold tracking-[0.12em] uppercase">
        {title}
      </h3>
      <div className="mt-1.5">{children}</div>
    </section>
  );
}

function BulletList({ text }: { text: string }) {
  const lines = splitLines(text);
  if (!lines.length) return null;
  return (
    <ul className="ml-4 list-disc space-y-0.5 text-[12.5px] leading-snug text-fg">
      {lines.map((l) => (
        <li key={l}>{l}</li>
      ))}
    </ul>
  );
}

export function ResumeSheet({ data }: { data: ResumeData }) {
  const contacts = [
    data.email,
    data.phone,
    data.location,
    data.linkedin ? "LinkedIn" : "",
    data.github ? "GitHub" : "",
    data.leetcode ? "LeetCode" : "",
  ].filter(Boolean);

  return (
    <article
      id="resume-sheet"
      className="min-h-[640px] rounded-[18px] border border-dashed border-border-strong bg-surface px-6 py-6 text-fg shadow-card sm:px-8"
    >
      {!hasCore(data) ? (
        <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-xl border border-border bg-surface-muted text-muted">
            <FileUp className="size-6" />
          </div>
          <p className="text-base font-semibold">Resume Preview Will Appear Here</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Fill in your genuine academic and technical details on the left, or click{" "}
            <span className="font-semibold text-fg">Load Sample Profile</span> to test resume
            generation instantly.
          </p>
        </div>
      ) : (
        <div className="font-resume">
          <header className="text-center">
            <h2 className="text-[22px] font-bold tracking-tight uppercase">
              {data.fullName}
            </h2>
            <p className="mt-0.5 text-[12.5px] font-medium text-primary">{data.targetRole}</p>
            <p className="mt-1 text-[11.5px] text-fg/80">
              {contacts.map((c, i) => {
                const isLink =
                  (c === "LinkedIn" && data.linkedin) ||
                  (c === "GitHub" && data.github) ||
                  (c === "LeetCode" && data.leetcode);
                const href =
                  c === "LinkedIn"
                    ? data.linkedin
                    : c === "GitHub"
                      ? data.github
                      : c === "LeetCode"
                        ? data.leetcode
                        : c.includes("@")
                          ? `mailto:${c}`
                          : undefined;
                return (
                  <span key={c}>
                    {i > 0 ? <span className="mx-1.5 text-subtle">|</span> : null}
                    {isLink || href ? (
                      <a href={href} className="underline-offset-2 hover:underline">
                        {c}
                      </a>
                    ) : (
                      c
                    )}
                  </span>
                );
              })}
            </p>
          </header>

          {data.education.trim() ? (
            <Section title="Education">
              <p className="text-[12.5px] leading-snug">{data.education}</p>
            </Section>
          ) : null}

          {data.skills.trim() ? (
            <Section title="Technical Skills">
              <div className="space-y-0.5 text-[12.5px] leading-snug">
                {splitLines(data.skills).map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </Section>
          ) : null}

          {data.projects.some((p) => p.title.trim()) ? (
            <Section title="Projects">
              <div className="space-y-2">
                {data.projects
                  .filter((p) => p.title.trim())
                  .map((p) => (
                    <div key={p.title}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <p className="text-[13px] font-semibold">{p.title}</p>
                        {p.link ? (
                          <a
                            href={p.link}
                            className="text-[11px] text-primary underline-offset-2 hover:underline"
                          >
                            Link
                          </a>
                        ) : null}
                      </div>
                      {p.tech ? (
                        <p className="text-[11.5px] text-muted">{p.tech}</p>
                      ) : null}
                      <BulletList text={p.bullets} />
                    </div>
                  ))}
              </div>
            </Section>
          ) : null}

          {data.experience.some((e) => e.role.trim() || e.org.trim()) ? (
            <Section title="Experience">
              <div className="space-y-2">
                {data.experience
                  .filter((e) => e.role.trim() || e.org.trim())
                  .map((e) => (
                    <div key={`${e.role}-${e.org}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <p className="text-[13px] font-semibold">
                          {e.role}
                          {e.org ? <span className="font-medium"> — {e.org}</span> : null}
                        </p>
                        {e.dates ? <p className="text-[11.5px] text-muted">{e.dates}</p> : null}
                      </div>
                      <BulletList text={e.bullets} />
                    </div>
                  ))}
              </div>
            </Section>
          ) : null}

          {data.achievements.trim() ? (
            <Section title="Achievements">
              <BulletList text={data.achievements} />
            </Section>
          ) : null}

          {data.extra.trim() ? (
            <Section title="Additional">
              <p className="text-[12.5px] leading-snug">{data.extra}</p>
            </Section>
          ) : null}
        </div>
      )}
    </article>
  );
}
