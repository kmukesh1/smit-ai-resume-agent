import { createServerFn } from "@tanstack/react-start";
import type { ResumeData } from "./resume-model";

export const polishResume = createServerFn({ method: "POST" })
  .validator((input: ResumeData) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI polish is not available right now." };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 1400,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "You rewrite student resume bullets for campus ATS. Keep only verified facts from the input. Use STAR: action verb + task + impact. Never invent companies, metrics, or tools. Return JSON only matching {projects:[{title,tech,bullets,link}], experience:[{role,org,dates,bullets}], achievements:string}. bullets is newline-separated, max 3 lines each.",
          },
          {
            role: "user",
            content: JSON.stringify({
              targetRole: data.targetRole,
              projects: data.projects,
              experience: data.experience,
              achievements: data.achievements,
            }),
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `AI request failed (${res.status}). Try again.` };
    }

    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const text = body.choices[0]?.message.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return { ok: false as const, error: "AI returned an unexpected format." };
    }

    try {
      const parsed = JSON.parse(jsonMatch[0]) as Partial<ResumeData>;
      return { ok: true as const, patch: parsed };
    } catch {
      return { ok: false as const, error: "Could not parse AI output." };
    }
  });
