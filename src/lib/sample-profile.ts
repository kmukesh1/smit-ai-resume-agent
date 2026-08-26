import type { ResumeData } from "./resume-model";

export const SAMPLE_PROFILE: ResumeData = {
  fullName: "Rohan Sengupta",
  targetRole: "SDE Intern",
  email: "rohan.smit@gmail.com",
  phone: "+91 98765 43210",
  linkedin: "https://linkedin.com/in/rohansengupta",
  github: "https://github.com/rohansengupta",
  leetcode: "https://leetcode.com/rohansengupta",
  location: "Chennai, India",
  education:
    "B.Tech in Computer Science & Engineering | Sikkim Manipal Institute of Technology (SMIT) | 2022 - 2026 | CGPA: 8.74",
  skills:
    "Languages: C++, Java, Python, JavaScript, TypeScript, SQL\nFrameworks: React.js, Node.js, Express, Tailwind CSS\nTools: Git, GitHub, Docker, AWS (EC2, S3), MongoDB, PostgreSQL, REST APIs, Postman",
  projects: [
    {
      title: "Smart Campus Attendance System",
      tech: "React, Node.js, Express, MongoDB, Tailwind CSS",
      bullets:
        "Built a full-stack web app with QR-code check-in and a faculty analytics dashboard.\nCut manual attendance marking time by ~70% for 4 lab sections.\nDesigned REST APIs and role-based access for students and faculty.",
      link: "https://github.com/rohansengupta/smart-attendance",
    },
    {
      title: "AI-Powered Resume Analyzer",
      tech: "Python, Flask, React, spaCy, scikit-learn",
      bullets:
        "Scored student resumes against job descriptions using NLP keyword matching.\nShipped a React UI with instant match reports for campus placement prep.\nImproved keyword coverage of sample resumes from 42% to 81% after iteration.",
      link: "https://github.com/rohansengupta/ai-resume-analyzer",
    },
    {
      title: "Real-time Collaborative Code Editor",
      tech: "React, Node.js, Socket.io, Monaco Editor",
      bullets:
        "Created a multi-user editor with live cursors, syntax highlighting, and preview.\nHandled concurrent edits over WebSockets with room-based sessions.\nUsed by 30+ classmates during a 48-hour hackathon.",
      link: "https://github.com/rohansengupta/collab-code-editor",
    },
  ],
  experience: [
    {
      role: "Software Development Intern",
      org: "TechNova Solutions",
      dates: "May 2025 – July 2025",
      bullets:
        "Shipped REST APIs in Node.js and Express used by the intern product squad.\nPartnered with frontend to integrate React views with backend services.\nOptimized database queries and reduced API p95 response time by 35%.",
    },
    {
      role: "Teaching Assistant — Data Structures",
      org: "CSE Department, SMIT",
      dates: "Aug 2024 – Dec 2024",
      bullets:
        "Ran weekly labs for 60+ students on arrays, trees, and graphs.\nDebugged assignments and published sample solutions after each lab.",
    },
  ],
  achievements:
    "Winner — SMIT Hackathon 2025 (AI Track)\nSmart India Hackathon 2024 — Finalist\nAWS Cloud Practitioner Certified\nNPTEL Data Structures & Algorithms (Elite + Silver)",
  extra: "Open to internships for 2026 campus placements. Comfortable with DSA in C++ and Java.",
};
