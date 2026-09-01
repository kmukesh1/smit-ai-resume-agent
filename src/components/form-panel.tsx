import {
  Brain,
  Cloud,
  Code2,
  ClipboardPaste,
  Eraser,
  ListChecks,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextArea, TextField } from "@/components/ui/field";
import { TRACKS } from "@/lib/tracks";
import { parseQuickPaste } from "@/lib/parse-paste";
import { useResumeStore } from "@/store/resume-store";
import { cn } from "@/lib/utils";

export function FormPanel() {
  const {
    data,
    mode,
    track,
    paste,
    setField,
    setProject,
    setExperience,
    addProject,
    addExperience,
    setMode,
    setPaste,
    applyTrack,
    loadSample,
    clearAll,
    merge,
    setNotice,
  } = useResumeStore();

  return (
    <div className="rounded-[22px] border border-border bg-surface p-5 shadow-card sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight">Welcome Student</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        Welcome to AI Resume Agent — created by{" "}
        <span className="font-semibold text-fg">Asst. Prof. Mukesh Kumar</span> for SMIT
        students. Enter your details below to build your career.
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
          Quick Track Templates
        </p>
        <div className="flex gap-1 rounded-md border border-border p-0.5">
          <button
            type="button"
            onClick={() => setMode("guided")}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded px-2.5 text-xs font-medium",
              mode === "guided" ? "bg-primary-soft text-primary" : "text-muted",
            )}
          >
            <ListChecks className="size-3.5" />
            Guided
          </button>
          <button
            type="button"
            onClick={() => setMode("paste")}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded px-2.5 text-xs font-medium",
              mode === "paste" ? "bg-primary-soft text-primary" : "text-muted",
            )}
          >
            <ClipboardPaste className="size-3.5" />
            Quick Paste
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {TRACKS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => applyTrack(t.id)}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-medium",
              track === t.id
                ? "border-primary bg-primary-soft text-primary"
                : "border-border bg-surface text-fg hover:border-primary/40",
            )}
          >
            {t.id === "sde" ? (
              <Code2 className="size-3.5" />
            ) : t.id === "ai" ? (
              <Brain className="size-3.5" />
            ) : (
              <Cloud className="size-3.5" />
            )}
            {t.label}
          </button>
        ))}
        <button
          type="button"
          onClick={clearAll}
          className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-muted hover:text-fg"
        >
          <Eraser className="size-3.5" />
          Clear
        </button>
      </div>

      {mode === "paste" ? (
        <div className="mt-6 space-y-3">
          <TextArea
            rows={12}
            value={paste}
            placeholder={`Name: Rohan Sengupta\nTarget Role: SDE Intern\nEmail: rohan.smit@gmail.com\nSkills: Python, React...\nEducation: B.Tech CSE, SMIT, CGPA 8.74`}
            onChange={(e) => setPaste(e.target.value)}
          />
          <Button
            type="button"
            onClick={() => {
              merge(parseQuickPaste(paste));
              setNotice("Quick paste applied. Review fields in Guided mode.");
              setMode("guided");
            }}
          >
            Apply paste
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-7">
          <section>
            <h3 className="mb-3 text-[11px] font-semibold tracking-wide text-muted uppercase">
              1. Personal & Contact Info
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                placeholder="Full Name (e.g. Rohan Sengupta) *"
                value={data.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
              />
              <TextField
                placeholder="Target Role (e.g. SDE Intern) *"
                value={data.targetRole}
                onChange={(e) => setField("targetRole", e.target.value)}
              />
              <TextField
                placeholder="Email (e.g. rohan.smit@gmail.com)"
                value={data.email}
                onChange={(e) => setField("email", e.target.value)}
              />
              <TextField
                placeholder="Phone (e.g. +91 98765 43210)"
                value={data.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
              <TextField
                placeholder="LinkedIn URL"
                value={data.linkedin}
                onChange={(e) => setField("linkedin", e.target.value)}
              />
              <TextField
                placeholder="GitHub URL"
                value={data.github}
                onChange={(e) => setField("github", e.target.value)}
              />
              <TextField
                placeholder="LeetCode URL"
                value={data.leetcode}
                onChange={(e) => setField("leetcode", e.target.value)}
              />
              <TextField
                placeholder="Location"
                value={data.location}
                onChange={(e) => setField("location", e.target.value)}
              />
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-[11px] font-semibold tracking-wide text-muted uppercase">
              2. Education & CGPA
            </h3>
            <TextArea
              rows={3}
              value={data.education}
              onChange={(e) => setField("education", e.target.value)}
            />
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold tracking-wide text-muted uppercase">
                3. Technical Skills *
              </h3>
              <span className="rounded-full bg-chip px-2 py-0.5 text-[10px] font-semibold tracking-wide text-primary uppercase">
                High priority
              </span>
            </div>
            <TextArea
              rows={4}
              placeholder={"Languages: ...\nFrameworks: ...\nTools: ..."}
              value={data.skills}
              onChange={(e) => setField("skills", e.target.value)}
            />
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold tracking-wide text-muted uppercase">
                4. Projects (projects first)
              </h3>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary"
              >
                <Plus className="size-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {data.projects.map((p, i) => (
                <div key={i} className="rounded-lg border border-border bg-surface-muted p-3">
                  <p className="mb-2 text-xs font-semibold text-muted">Project {i + 1}</p>
                  <div className="grid gap-2">
                    <TextField
                      placeholder="Title"
                      value={p.title}
                      onChange={(e) => setProject(i, { title: e.target.value })}
                    />
                    <TextField
                      placeholder="Tech stack"
                      value={p.tech}
                      onChange={(e) => setProject(i, { tech: e.target.value })}
                    />
                    <TextField
                      placeholder="GitHub / live link"
                      value={p.link}
                      onChange={(e) => setProject(i, { link: e.target.value })}
                    />
                    <TextArea
                      rows={3}
                      placeholder="STAR bullets — one per line"
                      value={p.bullets}
                      onChange={(e) => setProject(i, { bullets: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold tracking-wide text-muted uppercase">
                5. Experience / Internships
              </h3>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary"
              >
                <Plus className="size-3.5" /> Add
              </button>
            </div>
            <div className="space-y-4">
              {data.experience.map((e, i) => (
                <div key={i} className="grid gap-2 rounded-lg border border-border p-3">
                  <TextField
                    placeholder="Role"
                    value={e.role}
                    onChange={(ev) => setExperience(i, { role: ev.target.value })}
                  />
                  <div className="grid gap-2 sm:grid-cols-2">
                    <TextField
                      placeholder="Organization"
                      value={e.org}
                      onChange={(ev) => setExperience(i, { org: ev.target.value })}
                    />
                    <TextField
                      placeholder="Dates"
                      value={e.dates}
                      onChange={(ev) => setExperience(i, { dates: ev.target.value })}
                    />
                  </div>
                  <TextArea
                    rows={3}
                    placeholder="STAR bullets — one per line"
                    value={e.bullets}
                    onChange={(ev) => setExperience(i, { bullets: ev.target.value })}
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-[11px] font-semibold tracking-wide text-muted uppercase">
              6. Achievements & certifications
            </h3>
            <TextArea
              rows={4}
              placeholder="Hackathons, NPTEL, AWS, SIH — one per line"
              value={data.achievements}
              onChange={(e) => setField("achievements", e.target.value)}
            />
          </section>

          <section>
            <h3 className="mb-3 text-[11px] font-semibold tracking-wide text-muted uppercase">
              7. Additional notes
            </h3>
            <TextArea
              rows={2}
              value={data.extra}
              onChange={(e) => setField("extra", e.target.value)}
            />
          </section>

          <Button type="button" variant="outline" className="w-full" onClick={loadSample}>
            Load Sample Profile
          </Button>
        </div>
      )}
    </div>
  );
}
