export type Project = {
  title: string;
  tech: string;
  bullets: string;
  link: string;
};

export type Experience = {
  role: string;
  org: string;
  dates: string;
  bullets: string;
};

export type ResumeData = {
  fullName: string;
  targetRole: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  leetcode: string;
  location: string;
  education: string;
  skills: string;
  projects: Project[];
  experience: Experience[];
  achievements: string;
  extra: string;
};

export const emptyResume = (): ResumeData => ({
  fullName: "",
  targetRole: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  leetcode: "",
  location: "Chennai, India",
  education:
    "B.Tech in Computer Science & Engineering | Sikkim Manipal Institute of Technology (SMIT) | 2022 - 2026 | CGPA: ",
  skills: "",
  projects: [
    { title: "", tech: "", bullets: "", link: "" },
    { title: "", tech: "", bullets: "", link: "" },
    { title: "", tech: "", bullets: "", link: "" },
  ],
  experience: [{ role: "", org: "", dates: "", bullets: "" }],
  achievements: "",
  extra: "",
});

export const STORAGE_KEY = "smit-ai-resume-agent-v1";

export function splitLines(text: string): string[] {
  return text
    .split(/\n+/)
    .map((l) => l.replace(/^[\s•\-*]+/, "").trim())
    .filter(Boolean);
}

export function hasCore(data: ResumeData): boolean {
  return Boolean(data.fullName.trim() && data.targetRole.trim() && data.skills.trim());
}
