import type { ResumeData } from "./resume-model";

export type TrackId = "sde" | "ai" | "cloud";

export const TRACKS: {
  id: TrackId;
  label: string;
  hint: string;
  patch: Partial<ResumeData>;
}[] = [
  {
    id: "sde",
    label: "SDE / Full Stack",
    hint: "Campus SDE, intern, and full-stack roles",
    patch: {
      targetRole: "SDE Intern",
      skills:
        "Languages: C++, Java, Python, JavaScript, TypeScript, SQL\nFrameworks: React.js, Node.js, Express, Next.js, Tailwind CSS\nTools: Git, GitHub, Docker, REST APIs, MongoDB, PostgreSQL, Postman",
    },
  },
  {
    id: "ai",
    label: "AI & Data Science",
    hint: "ML intern, data, and applied AI roles",
    patch: {
      targetRole: "AI / Data Science Intern",
      skills:
        "Languages: Python, SQL, C++, Java\nML: scikit-learn, PyTorch, Pandas, NumPy, spaCy\nTools: Jupyter, Git, Streamlit, Flask, REST APIs, AWS S3",
    },
  },
  {
    id: "cloud",
    label: "Cloud / DevOps",
    hint: "Cloud intern, SRE, and platform roles",
    patch: {
      targetRole: "Cloud / DevOps Intern",
      skills:
        "Languages: Python, Bash, JavaScript, SQL\nCloud: AWS (EC2, S3, IAM, Lambda), Docker, Linux\nTools: Git, GitHub Actions, Nginx, Terraform basics, Prometheus",
    },
  },
];
