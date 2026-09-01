(function () {
    var KEY = "smit-ai-resume-agent-v2";
    function el(id) { return document.getElementById(id); }
    function esc(s) {
      return String(s || "").replace(/[&<>"']/g, function (c) {
        if (c === "&") return "\u0026amp;";
        if (c === "<") return "\u0026lt;";
        if (c === ">") return "\u0026gt;";
        if (c === '"') return "\u0026quot;";
        return "\u0026#39;";
      });
    }
    function lines(t) {
      return String(t || "").split(/\n+/).map(function (s) {
        return s.replace(/^[\s\u2022\-*]+/, "").trim();
      }).filter(Boolean);
    }
    function empty() {
      return {
        fullName: "", targetRole: "", email: "", phone: "", linkedin: "", github: "", leetcode: "",
        location: "Chennai, India",
        education: "B.Tech in Computer Science & Engineering | Sikkim Manipal Institute of Technology (SMIT) | 2022 - 2026 | CGPA: ",
        skills: "",
        projects: [
          { title: "", tech: "", bullets: "", link: "" },
          { title: "", tech: "", bullets: "", link: "" },
          { title: "", tech: "", bullets: "", link: "" }
        ],
        experience: [{ role: "", org: "", dates: "", bullets: "" }],
        achievements: "", extra: ""
      };
    }
    var SAMPLE = {
      fullName: "Rohan Sengupta", targetRole: "SDE Intern", email: "rohan.smit@gmail.com",
      phone: "+91 98765 43210", linkedin: "https://linkedin.com/in/rohansengupta",
      github: "https://github.com/rohansengupta", leetcode: "https://leetcode.com/rohansengupta",
      location: "Chennai, India",
      education: "B.Tech in Computer Science & Engineering | Sikkim Manipal Institute of Technology (SMIT) | 2022 - 2026 | CGPA: 8.74",
      skills: "Languages: C++, Java, Python, JavaScript, TypeScript, SQL\nFrameworks: React.js, Node.js, Express, Tailwind CSS\nTools: Git, GitHub, Docker, AWS (EC2, S3), MongoDB, PostgreSQL, REST APIs, Postman",
      projects: [
        { title: "Smart Campus Attendance System", tech: "React, Node.js, Express, MongoDB, Tailwind CSS", bullets: "Built a full-stack web app with QR-code check-in and a faculty analytics dashboard.\nCut manual attendance marking time by ~70% for 4 lab sections.\nDesigned REST APIs and role-based access for students and faculty.", link: "https://github.com/rohansengupta/smart-attendance" },
        { title: "AI-Powered Resume Analyzer", tech: "Python, Flask, React, spaCy, scikit-learn", bullets: "Scored student resumes against job descriptions using NLP keyword matching.\nShipped a React UI with instant match reports for campus placement prep.\nImproved keyword coverage of sample resumes from 42% to 81% after iteration.", link: "https://github.com/rohansengupta/ai-resume-analyzer" },
        { title: "Real-time Collaborative Code Editor", tech: "React, Node.js, Socket.io, Monaco Editor", bullets: "Created a multi-user editor with live cursors, syntax highlighting, and preview.\nHandled concurrent edits over WebSockets with room-based sessions.\nUsed by 30+ classmates during a 48-hour hackathon.", link: "https://github.com/rohansengupta/collab-code-editor" }
      ],
      experience: [
        { role: "Software Development Intern", org: "TechNova Solutions", dates: "May 2025 – July 2025", bullets: "Shipped REST APIs in Node.js and Express used by the intern product squad.\nPartnered with frontend to integrate React views with backend services.\nOptimized database queries and reduced API p95 response time by 35%." },
        { role: "Teaching Assistant — Data Structures", org: "CSE Department, SMIT", dates: "Aug 2024 – Dec 2024", bullets: "Ran weekly labs for 60+ students on arrays, trees, and graphs.\nDebugged assignments and published sample solutions after each lab." }
      ],
      achievements: "Winner — SMIT Hackathon 2025 (AI Track)\nSmart India Hackathon 2024 — Finalist\nAWS Cloud Practitioner Certified\nNPTEL Data Structures & Algorithms (Elite + Silver)",
      extra: "Open to internships for 2026 campus placements."
    };
    var TRACKS = {
      sde: { targetRole: "SDE Intern", skills: "Languages: C++, Java, Python, JavaScript, TypeScript, SQL\nFrameworks: React.js, Node.js, Express, Next.js, Tailwind CSS\nTools: Git, GitHub, Docker, REST APIs, MongoDB, PostgreSQL, Postman" },
      ai: { targetRole: "AI / Data Science Intern", skills: "Languages: Python, SQL, C++, Java\nML: scikit-learn, PyTorch, Pandas, NumPy, spaCy\nTools: Jupyter, Git, Streamlit, Flask, REST APIs, AWS S3" },
      cloud: { targetRole: "Cloud / DevOps Intern", skills: "Languages: Python, Bash, JavaScript, SQL\nCloud: AWS (EC2, S3, IAM, Lambda), Docker, Linux\nTools: Git, GitHub Actions, Nginx, Terraform basics, Prometheus" }
    };
    var FIELDS = ["fullName","targetRole","email","phone","linkedin","github","leetcode","location","education","skills","achievements","extra"];
    var data = empty();
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        data = empty();
        FIELDS.forEach(function (k) { if (parsed[k] != null) data[k] = parsed[k]; });
        if (Array.isArray(parsed.projects) && parsed.projects.length) data.projects = parsed.projects;
        if (Array.isArray(parsed.experience) && parsed.experience.length) data.experience = parsed.experience;
      }
    } catch (e) {}
    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
    }
    function bindFields() {
      FIELDS.forEach(function (k) {
        var node = el(k);
        if (!node) return;
        node.value = data[k] || "";
        node.oninput = function () { data[k] = node.value; save(); draw(); };
      });
      var pRoot = el("projects");
      if (pRoot) {
        pRoot.innerHTML = data.projects.map(function (p, i) {
          return '<div class="proj">' +
            '<input data-p="'+i+'" data-k="title" placeholder="Title" value="'+esc(p.title)+'" />' +
            '<input data-p="'+i+'" data-k="tech" placeholder="Tech stack" value="'+esc(p.tech)+'" style="margin-top:8px" />' +
            '<input data-p="'+i+'" data-k="link" placeholder="GitHub / live link" value="'+esc(p.link)+'" style="margin-top:8px" />' +
            '<textarea data-p="'+i+'" data-k="bullets" placeholder="STAR bullets — one per line" style="margin-top:8px">'+esc(p.bullets)+'</textarea></div>';
        }).join("");
        pRoot.querySelectorAll("[data-p]").forEach(function (n) {
          n.oninput = function () {
            data.projects[+n.getAttribute("data-p")][n.getAttribute("data-k")] = n.value;
            save(); draw();
          };
        });
      }
      var eRoot = el("experience");
      if (eRoot) {
        eRoot.innerHTML = data.experience.map(function (e, i) {
          return '<div class="proj">' +
            '<input data-e="'+i+'" data-k="role" placeholder="Role" value="'+esc(e.role)+'" />' +
            '<div class="grid2" style="margin-top:8px">' +
            '<input data-e="'+i+'" data-k="org" placeholder="Organization" value="'+esc(e.org)+'" />' +
            '<input data-e="'+i+'" data-k="dates" placeholder="Dates" value="'+esc(e.dates)+'" /></div>' +
            '<textarea data-e="'+i+'" data-k="bullets" placeholder="STAR bullets — one per line" style="margin-top:8px">'+esc(e.bullets)+'</textarea></div>';
        }).join("");
        eRoot.querySelectorAll("[data-e]").forEach(function (n) {
          n.oninput = function () {
            data.experience[+n.getAttribute("data-e")][n.getAttribute("data-k")] = n.value;
            save(); draw();
          };
        });
      }
    }
    function bullets(t) {
      return lines(t).map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("");
    }
    function draw() {
      var sheet = el("sheet");
      if (!sheet) return;
      var d = data;
      var ready = d.fullName.trim() && d.targetRole.trim() && d.skills.trim();
      if (!ready) {
        sheet.innerHTML = '<div class="empty"><div><strong style="color:var(--fg);font-size:16px">Resume Preview Will Appear Here</strong><p>Fill your details on the left, or click Load Sample Profile.</p></div></div>';
        return;
      }
      var href = { LinkedIn: d.linkedin, GitHub: d.github, LeetCode: d.leetcode };
      var contacts = [d.email, d.phone, d.location, d.linkedin ? "LinkedIn" : "", d.github ? "GitHub" : "", d.leetcode ? "LeetCode" : ""].filter(Boolean);
      var html = '<div class="resume"><h2 class="name">' + esc(d.fullName).toUpperCase() + '</h2>';
      html += '<div class="role">' + esc(d.targetRole) + '</div>';
      html += '<div class="contacts">' + contacts.map(function (c) {
        return href[c] ? '<a href="' + esc(href[c]) + '">' + c + "</a>" : esc(c);
      }).join(" · ") + "</div>";
      if (d.education.trim()) html += '<div class="sec"><h3>Education</h3><p>' + esc(d.education) + "</p></div>";
      html += '<div class="sec"><h3>Technical Skills</h3>' + lines(d.skills).map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("") + "</div>";
      if (d.projects.some(function (p) { return p.title.trim(); })) {
        html += '<div class="sec"><h3>Projects</h3>' + d.projects.filter(function (p) { return p.title.trim(); }).map(function (p) {
          return "<p><strong>" + esc(p.title) + "</strong>" + (p.tech ? " — " + esc(p.tech) : "") + "</p><ul>" + bullets(p.bullets) + "</ul>";
        }).join("") + "</div>";
      }
      if (d.experience.some(function (e) { return (e.role || "").trim(); })) {
        html += '<div class="sec"><h3>Experience</h3>' + d.experience.filter(function (e) { return (e.role || "").trim(); }).map(function (e) {
          return "<p><strong>" + esc(e.role) + "</strong>" + (e.org ? " — " + esc(e.org) : "") +
            (e.dates ? ' <span style="color:var(--muted)">' + esc(e.dates) + "</span>" : "") + "</p><ul>" + bullets(e.bullets) + "</ul>";
        }).join("") + "</div>";
      }
      if (d.achievements.trim()) html += '<div class="sec"><h3>Achievements</h3><ul>' + bullets(d.achievements) + "</ul></div>";
      if (d.extra.trim()) html += '<div class="sec"><h3>Additional</h3><p>' + esc(d.extra) + "</p></div>";
      html += "</div>";
      sheet.innerHTML = html;
    }
    function refresh() { bindFields(); draw(); }
    el("btnSample").onclick = function () { data = JSON.parse(JSON.stringify(SAMPLE)); save(); refresh(); };
    el("btnClear").onclick = function () {
      data = empty(); save(); refresh();
      document.querySelectorAll("[data-track]").forEach(function (b) { b.classList.remove("on"); });
    };
    el("btnPrint").onclick = function () { window.print(); };
    el("btnGuide").onclick = function () { el("guide").classList.add("on"); };
    el("btnGuideClose").onclick = function () { el("guide").classList.remove("on"); };
    el("guide").onclick = function (ev) { if (ev.target === el("guide")) el("guide").classList.remove("on"); };
    document.querySelectorAll("[data-track]").forEach(function (b) {
      b.onclick = function () {
        var t = TRACKS[b.getAttribute("data-track")];
        if (!t) return;
        data.targetRole = t.targetRole; data.skills = t.skills;
        document.querySelectorAll("[data-track]").forEach(function (x) { x.classList.remove("on"); });
        b.classList.add("on");
        save(); refresh();
      };
    });
    refresh();
  })();
