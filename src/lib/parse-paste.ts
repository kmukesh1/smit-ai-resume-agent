import { emptyResume, type ResumeData } from "./resume-model";

function grab(text: string, keys: string[]): string {
  for (const key of keys) {
    const re = new RegExp(`${key}\\s*[:\\-]\\s*(.+)`, "i");
    const m = text.match(re);
    if (m?.[1]) return m[1].trim();
  }
  return "";
}

export function parseQuickPaste(raw: string): ResumeData {
  const data = emptyResume();
  const text = raw.trim();
  if (!text) return data;

  data.fullName = grab(text, ["Name", "Full Name"]) || text.split("\n")[0] || "";
  data.targetRole = grab(text, ["Target Role", "Role", "Position"]);
  data.email = grab(text, ["Email"]);
  data.phone = grab(text, ["Phone", "Mobile"]);
  data.linkedin = grab(text, ["LinkedIn"]);
  data.github = grab(text, ["GitHub"]);
  data.leetcode = grab(text, ["LeetCode"]);
  data.location = grab(text, ["Location", "City"]) || data.location;
  data.education = grab(text, ["Education"]) || data.education;

  const skillsMatch = text.match(/Skills?:([\s\S]*?)(?:Projects?:|Experience:|Achievements?:|$)/i);
  if (skillsMatch) data.skills = skillsMatch[1].trim();

  const ach = text.match(/Achievements?:([\s\S]*?)(?:Extra:|$)/i);
  if (ach) data.achievements = ach[1].trim();

  return data;
}
