/* =========================================================================
   CYBERSEC PORTFOLIO — CENTRAL DATA / CONFIGURATION
   -------------------------------------------------------------------------
   This is the ONLY file you normally need to edit to make the site yours.

   ▸ PERSONAL DETAILS  → section 1
   ▸ NAVIGATION        → section 2
   ▸ HERO              → section 3
   ▸ ABOUT             → section 4
   ▸ EDUCATION         → section 5
   ▸ SKILLS            → section 6
   ▸ TOOLS             → section 7
   ▸ PROJECTS          → section 8
   ▸ LABS              → section 9
   ▸ CERTIFICATES      → section 10
   ▸ LEARNING          → section 11
   ▸ ROADMAP           → section 12
   ▸ BLOG / NOTES      → section 13
   ▸ GITHUB            → section 14
   ▸ ACHIEVEMENTS      → section 15
   ▸ RESUME            → section 16

   Rules:
   - Use plain text (no HTML). The site escapes everything it renders.
   - Never put API keys, passwords or real secrets here.
   - If you add an image (profile, project, certificate), put it in
     assets/img/ and reference it as "assets/img/your-file.png".
   ========================================================================= */

window.SITE_DATA = {

  /* =========================================================
     1. PERSONAL DETAILS  — change everything about YOU here
     ========================================================= */
  config: {
    name: "Shukla Sahil",
    firstName: "Sahil Shukla",                 // used for the monogram avatar
    role: "Cybersecurity Student & Aspiring Security Professional",
    headline: "B.Tech Computer Science (Cybersecurity) Student",
    location: "Haridwar, India",
    email: "shuklasahil259.com",

    /* Link URLs — replace with your real profiles */
    githubUsername: "shuklasahil259",
    githubUrl: "https://github.com/shuklasahil259",
    linkedinUrl: "https://www.linkedin.com/in/your-linkedin-username",
    tryhackmeUrl: "https://tryhackme.com/p/shuklasahil259",
    hacktheboxUrl: "https://app.hackthebox.com/profile/your-id",
    ctfTimeUrl: "https://ctftime.org/team/your-team-id",

    /* Profile photo: point to assets/img/profile.jpg (square, ~500px).
       Leave "" to use a clean monogram avatar instead. */
    profileImage: "",
    profileImageAlt: "",                   // describe the photo if you add one

    /* Subtitle under the name in the hero */
    heroStatusText: "Currently Learning Cybersecurity",

    /* Availability line shown in the hero terminal + footer */
    availability: "Open to internships & security roles",

    /* Text that appears under typed roles */
    heroSub:
      "Learning ethical hacking, web security, Linux, networking, SOC and cloud security — one lab at a time.",

    /* Resume: point this at a real PDF you add, or leave "" and the site
       will generate a PDF download from your data automatically. */
    resumePdfPath: "",                     // e.g. "assets/img/resume.pdf" or "resume.pdf"
  },

  /* =========================================================
     2. NAVIGATION (order shown in the header)
     target = id of the page section.
     ========================================================= */
  nav: [
    { label: "Home",        target: "home" },
    { label: "About",       target: "about" },
    { label: "Skills",      target: "skills" },
    { label: "Tools",       target: "tools" },
    { label: "Projects",    target: "projects" },
    { label: "Labs",        target: "labs" },
    { label: "Certificates", target: "certificates" },
    { label: "Learning",    target: "learning" },
    { label: "Roadmap",     target: "roadmap" },
    { label: "Resume",      target: "resume" },
    { label: "Contact",     target: "contact" },
  ],

  /* Footer quick links (subset of sections) */
  footerLinks: [
    { label: "Home",        target: "home" },
    { label: "About",       target: "about" },
    { label: "Projects",    target: "projects" },
    { label: "Certificates", target: "certificates" },
    { label: "Resume",      target: "resume" },
    { label: "Contact",     target: "contact" },
  ],

  /* =========================================================
     3. HERO
     typing  : phrases that rotate with the typewriter effect
     terminal: lines shown inside the terminal window on the right.
               out = "" means the command has no output.
     orbit   : small status chips floating around the terminal
     ========================================================= */
  typing: [
    "Cybersecurity Student",
    "Ethical Hacking Learner",
    "Web Security Enthusiast",
    "Linux Learner",
    "Future Security Professional",
  ],

  heroTerminal: [
    { cmd: "whoami",              out: "security-student" },
    { cmd: "cat mission.txt",     out: "learn -> practice -> secure" },
    { cmd: "ls ./labs",           out: "tryhackme  htb  ctf  personal" },
    { cmd: "sudo ./keep_learning", out: "[ OK ] curiosity is the exploit" },
  ],

  orbit: [
    { text: "Kali Linux",  hue: "green" },
    { text: "Burp Suite",  hue: "cyan" },
    { text: "nmap -sV",    hue: "blue" },
    { text: "Python3",     hue: "green" },
  ],

  /* =========================================================
     4. ABOUT
     ========================================================= */
  about: {
    intro: [
      "Hi — I'm a cybersecurity-focused student who loves understanding how systems work so I can figure out how they break. My day is split between lectures, Linux terminals and security labs where theory becomes hands-on skill.",
      "I believe real learning happens when you build, break and fix things yourself. That is exactly what this site documents: my skills, the tools I train with, the labs I complete and the projects I build along the way.",
    ],

    tags: [
      "Ethical Hacking", "Web Security", "Linux", "Networking",
      "Python & Bash", "SOC Basics", "Cloud Security",
    ],

    quickFacts: [
      { k: "Current Status", v: "B.Tech Student" },
      { k: "Focus Area",     v: "Offensive + Defensive Security" },
      { k: "Daily Driver",   v: "Kali Linux / VS Code" },
      { k: "Practice",       v: "TryHackMe · HTB · CTFs" },
      { k: "Interest",       v: "Web, network & cloud security" },
    ],

    /* Three short blocks under the intro */
    goals:
      "Short-term I am building strong fundamentals in Linux, networking and web security. Long-term I aim to grow into a professional security engineer who can both attack and defend — legally and ethically.",

    philosophy:
      "Learn by doing. I practice every topic in a lab before I claim to know it, document what I learn, and revisit weak areas until they become strengths.",

    objectives:
      "Complete structured learning paths, earn recognized entry certificates, publish notes on this site, join CTFs regularly, and land an internship where I can contribute to real security work.",

    /* The animated journey timeline */
    journey: [
      { step: "Started Cybersecurity", note: "Curiosity about how hacking works turned into a serious learning path.", state: "done" },
      { step: "Linux & Networking",    note: "Command line, file systems, permissions, TCP/IP and protocols.", state: "done" },
      { step: "Python & Bash",         note: "Scripting and automation to build small security tools.", state: "done" },
      { step: "Web Security",          note: "HTTP, OWASP Top 10, Burp Suite and web attack fundamentals.", state: "active" },
      { step: "Ethical Hacking",       note: "Recon, scanning, exploitation and reporting — only in legal labs.", state: "next" },
      { step: "SOC / Defensive Security", note: "Monitoring, log analysis, SIEM and incident response basics.", state: "next" },
      { step: "Cloud Security",        note: "AWS, IAM, security groups and secure cloud architecture.", state: "next" },
      { step: "Cybersecurity Professional", note: "An internship or role where I keep learning on the job.", state: "next" },
    ],
  },

  /* =========================================================
     5. EDUCATION
     ========================================================= */
  education: {
    degree: "Bachelor of Technology (B.Tech)",
    branch: "Computer Science & Engineering",
    university: "Gurukula Kangri (Deemed to be University) - GK(DU) / Faculty of Engineering and Technology",
    semester: "Semester 7 of 8",
    graduation: "Expected Graduation: 2027",

    relevantSubjects: [
      "Operating Systems", "Computer Networks", "Database Management",
      "Web Technologies", "Cryptography & Network Security",
      "Python Programming", "Information Security",
    ],

    details: [
      { label: "Branch",      value: "Computer Science & Engineering" },
      { label: "University",  value: "Gurukula Kangri (Deemed to be University) - GK(DU) / Faculty of Engineering and Technology" },
      { label: "Semester",    value: "Semester 7 of 8" },
      { label: "Graduation",  value: "Expected 2027" },
    ],

    /* Timeline of the academic journey (newest on top is fine) */
    timeline: [
      { period: "2023 – 2027", title: "B.Tech in Computer Science & Engineering", org: "Gurukula Kangri (Deemed to be University) - GK(DU) / Faculty of Engineering and Technology",
        note: "Focused on core CS with an eye on security: networks, OS, DBMS and cryptography." },
      { period: "2024", title: "Self-driven Cybersecurity Track", org: "TryHackMe · HTB · online courses",
        note: "Linux, networking, web security and offensive/defensive practice in legal labs." },
      { period: "2019 – 2023", title: "Higher Secondary School", org: "Sri Guru Ram Rai Public School",
        note: "Science stream — Mathematics, Physics and Computer Science." },
    ],
  },

  /* =========================================================
     6. SKILLS
     level must be one of: "Beginner" | "Intermediate" | "Advanced"
     pct should honestly match your level (adjust as you grow).
     icon is optional — a short label or emoji that shows in the tile;
     leave it "" and the tile shows the skill's initials.
     ========================================================= */
  skillGroups: [
    {
      name: "Security",
      intro: "Core security concepts I apply in labs.",
      skills: [
        { name: "Cybersecurity Fundamentals", level: "Intermediate", pct: 60, icon: "" },
        { name: "Ethical Hacking",            level: "Beginner",    pct: 35, icon: "" },
        { name: "Web Security",               level: "Beginner",    pct: 40, icon: "" },
        { name: "Vulnerability Assessment",   level: "Beginner",    pct: 30, icon: "" },
        { name: "Reconnaissance",             level: "Beginner",    pct: 40, icon: "" },
        { name: "Security Testing",           level: "Beginner",    pct: 25, icon: "" },
      ],
    },
    {
      name: "Networking",
      intro: "How data moves — the backbone of every attack and defense.",
      skills: [
        { name: "TCP/IP",                     level: "Intermediate", pct: 55, icon: "" },
        { name: "DNS",                        level: "Intermediate", pct: 50, icon: "" },
        { name: "HTTP / HTTPS",               level: "Intermediate", pct: 60, icon: "" },
        { name: "Ports & Protocols",          level: "Intermediate", pct: 55, icon: "" },
        { name: "Firewalls",                  level: "Beginner",    pct: 35, icon: "" },
        { name: "VPN",                        level: "Beginner",    pct: 30, icon: "" },
      ],
    },
    {
      name: "Operating Systems",
      intro: "Daily environments for learning and building.",
      skills: [
        { name: "Linux",                      level: "Intermediate", pct: 65, icon: "" },
        { name: "Kali Linux",                 level: "Intermediate", pct: 55, icon: "" },
        { name: "Windows",                    level: "Beginner",    pct: 40, icon: "" },
      ],
    },
    {
      name: "Programming",
      intro: "Languages I script and build with.",
      skills: [
        { name: "Python",                     level: "Intermediate", pct: 55, icon: "" },
        { name: "Bash",                       level: "Intermediate", pct: 50, icon: "" },
        { name: "SQL",                        level: "Beginner",    pct: 40, icon: "" },
        { name: "HTML",                       level: "Intermediate", pct: 70, icon: "" },
        { name: "CSS",                        level: "Intermediate", pct: 60, icon: "" },
        { name: "JavaScript",                 level: "Beginner",    pct: 40, icon: "" },
      ],
    },
    {
      name: "Cloud",
      intro: "Exploring secure cloud architecture on AWS.",
      skills: [
        { name: "AWS",                        level: "Beginner",    pct: 20, icon: "" },
        { name: "IAM",                        level: "Beginner",    pct: 20, icon: "" },
        { name: "Cloud Security",             level: "Beginner",    pct: 15, icon: "" },
        { name: "Security Groups",            level: "Beginner",    pct: 20, icon: "" },
      ],
    },
  ],

  /* Small disclaimer shown under the skill grid */
  skillsDisclaimer:
    "Skill bars reflect my honest, student-level progress today — not certifications. I update them as I practise more.",

  /* =========================================================
     7. TOOLS & TECHNOLOGIES
     about/usedFor/learned are shown in the info modal.
     relatedProjects: ids of projects in section 8 (or []).
     url: optional official site for the tool.
     ========================================================= */
  toolGroups: [
    {
      name: "Reconnaissance",
      tools: [
        { name: "Nmap", icon: "", tag: "network scanner", url: "https://nmap.org",
          about: "Nmap (Network Mapper) is a free, open-source tool that discovers hosts and services on a network by sending packets and analysing responses.",
          usedFor: "Port scanning, service/version detection, OS fingerprinting and scripting (NSE) during the reconnaissance phase.",
          learned: "Reading scan results, identifying open ports and services, and always testing only in my own lab or authorized targets.",
          relatedProjects: ["network-scanning-lab"] },
        { name: "Gobuster", icon: "", tag: "content discovery", url: "https://github.com/OJ/gobuster",
          about: "Gobuster is a fast directory/file and DNS busting tool written in Go.",
          usedFor: "Brute-forcing hidden directories and virtual hosts during web reconnaissance.",
          learned: "Enumerating web app structure and discovering endpoints that are not linked on the page.",
          relatedProjects: ["web-security-lab"] },
      ],
    },
    {
      name: "Web Security",
      tools: [
        { name: "Burp Suite", icon: "", tag: "web proxy", url: "https://portswigger.net/burp",
          about: "Burp Suite Community is an integrated platform for testing web application security, built around an intercepting proxy.",
          usedFor: "Intercepting and modifying HTTP requests, scanning requests with Repeater/Intruder, and learning OWASP Top 10 attacks.",
          learned: "How HTTP requests work end-to-end and how parameters, cookies and headers can be manipulated safely in lab environments.",
          relatedProjects: ["web-security-lab", "secure-web-app"] },
        { name: "OWASP ZAP", icon: "", tag: "web proxy", url: "https://www.zaproxy.org",
          about: "Zed Attack Proxy (ZAP) is a free, open-source web app security scanner maintained by the OWASP community.",
          usedFor: "Automated scanning, manual testing and fuzzing of web applications.",
          learned: "Comparing automated scanner output with manual verification so I can separate real issues from noise.",
          relatedProjects: ["vulnerability-lab"] },
      ],
    },
    {
      name: "Network Analysis",
      tools: [
        { name: "Wireshark", icon: "", tag: "packet analyzer", url: "https://www.wireshark.org",
          about: "Wireshark is the de-facto standard network protocol analyzer that captures and inspects packets in detail.",
          usedFor: "Following TCP streams, examining protocol handshakes and troubleshooting traffic.",
          learned: "Applying packet-level knowledge of HTTP, DNS and TCP to understand how network attacks actually look.",
          relatedProjects: ["network-scanning-lab", "log-analysis"] },
      ],
    },
    {
      name: "Pentesting",
      tools: [
        { name: "Metasploit", icon: "", tag: "exploitation framework", url: "https://www.metasploit.com",
          about: "Metasploit is an open-source framework for developing and executing exploit code against remote targets.",
          usedFor: "Studying real exploitation workflows and payloads — exclusively against intentionally vulnerable machines.",
          learned: "The full flow from scanning to exploitation, and the importance of post-exploitation discipline and cleanup.",
          relatedProjects: ["vulnerability-lab"] },
      ],
    },
    {
      name: "Password Auditing",
      tools: [
        { name: "John the Ripper", icon: "", tag: "password cracker", url: "https://www.openwall.com/john/",
          about: "John the Ripper is a fast password cracker that tests passwords against precomputed hashes and wordlists.",
          usedFor: "Auditing password strength by cracking hashes of my own test accounts.",
          learned: "Why weak and reused passwords fail fast, and how hashing/salting protects real systems.",
          relatedProjects: ["python-security-tool"] },
      ],
    },
    {
      name: "Operating Systems",
      tools: [
        { name: "Kali Linux", icon: "", tag: "security distro", url: "https://www.kali.org",
          about: "Kali is a Debian-based Linux distribution packed with hundreds of security tools.",
          usedFor: "My daily practice environment for scanning, web testing and scripting.",
          learned: "Efficient command-line workflows, tooling and keeping a lab environment organised.",
          relatedProjects: ["linux-security-lab"] },
        { name: "Linux", icon: "", tag: "core OS", url: "https://www.linux.org",
          about: "The open-source OS family that powers most servers and security work.",
          usedFor: "Shell automation, service management, file permissions and hardening practice.",
          learned: "The command line as a second language — users, permissions, processes and logs.",
          relatedProjects: ["linux-security-lab", "log-analysis"] },
        { name: "Windows", icon: "", tag: "core OS", url: "https://www.microsoft.com/windows",
          about: "The desktop OS used across most corporate environments.",
          usedFor: "Understanding Windows basics, PowerShell and Active Directory fundamentals.",
          learned: "How enterprise Windows environments are administered — and where the attack surface lives.",
          relatedProjects: [] },
      ],
    },
    {
      name: "Development",
      tools: [
        { name: "VS Code", icon: "", tag: "editor", url: "https://code.visualstudio.com",
          about: "A popular, extensible code editor.",
          usedFor: "Writing Python, Bash, HTML/CSS/JS and documentation.",
          learned: "Fast, keyboard-driven editing with useful security extensions.",
          relatedProjects: ["portfolio-website", "python-security-tool"] },
        { name: "Git", icon: "", tag: "version control", url: "https://git-scm.com",
          about: "Git tracks changes to files so every version of your work is recoverable.",
          usedFor: "Versioning every project and lab script I write.",
          learned: "Commits, branches, merges and clean commit messages as a professional habit.",
          relatedProjects: ["portfolio-website", "python-security-tool"] },
        { name: "GitHub", icon: "", tag: "code hosting", url: "https://github.com",
          about: "The platform where Git repositories are shared and collaborated on.",
          usedFor: "Hosting my public projects and this portfolio.",
          learned: "Publishing code, writing READMEs and showing progress publicly.",
          relatedProjects: ["portfolio-website"] },
      ],
    },
  ],

  /* =========================================================
     8. PROJECTS
     category must be one of projectFilters below (besides All).
     repo  : your GitHub URL for the project ("" hides the button)
     demo  : a live URL, or "" to hide the Live Demo button
     image : optional screenshot path in assets/img/; "" uses a
             generated CSS banner instead (no broken images)
     ========================================================= */
  projectFilters: [
    "Ethical Hacking", "Web Security", "Linux", "Networking",
    "Python", "Cloud", "Defensive Security",
  ],

  projects: [
    { id: "portfolio-website", title: "Cybersecurity Portfolio Website", category: "Web Security",
      icon: "", short: "The site you are looking at — a config-driven, single-page portfolio built with clean HTML, CSS and JavaScript.",
      tech: ["HTML5", "CSS3", "JavaScript", "GitHub Pages"],
      learned: "Building secure-by-design static sites: no secrets, sanitised rendering, CSP headers and accessibility-first markup.",
      repo: "", demo: "", image: "" },

    { id: "network-scanning-lab", title: "Network Scanning Lab", category: "Networking",
      icon: "", short: "A virtual lab (VMs + Docker) where I practise host discovery, port scanning and service enumeration.",
      tech: ["Nmap", "Wireshark", "VirtualBox", "Linux"],
      learned: "Reading scan output, identifying services by port, and responsible scanning only inside isolated lab networks.",
      repo: "", demo: "", image: "" },

    { id: "web-security-lab", title: "Web Security Testing Lab", category: "Web Security",
      icon: "", short: "Hands-on testing against intentionally vulnerable apps to learn how common web attacks work.",
      tech: ["Burp Suite", "OWASP ZAP", "DVWA", "HTTP"],
      learned: "Intercepting requests and understanding SQLi, XSS and broken auth from the attacker's perspective — legally.",
      repo: "", demo: "", image: "" },

    { id: "linux-security-lab", title: "Linux Security Lab", category: "Linux",
      icon: "", short: "A hardened Linux playground where I practise user permissions, service hardening and log review.",
      tech: ["Linux", "Bash", "Kali Linux", "Systemd"],
      learned: "File permissions, sudo rules, SSH hardening and auditing basics that every security role needs.",
      repo: "", demo: "", image: "" },

    { id: "python-security-tool", title: "Python Security Tool", category: "Python",
      icon: "", short: "Small Python utilities for security work — a port checker, hash cracker demo and log parser.",
      tech: ["Python 3", "Socket", "Argparse", "Git"],
      learned: "Turning security concepts into scripts and structuring code so it is readable and reusable.",
      repo: "", demo: "", image: "" },

    { id: "log-analysis", title: "Log Analysis Project", category: "Defensive Security",
      icon: "", short: "Analysing auth and web server logs with bash/awk to detect brute force and scanning behaviour.",
      tech: ["Bash", "awk", "grep", "Wireshark"],
      learned: "How defenders spot attackers — failed-login spikes, strange user agents and port scan signatures.",
      repo: "", demo: "", image: "" },

    { id: "vulnerability-lab", title: "Vulnerability Assessment Lab", category: "Ethical Hacking",
      icon: "", short: "A guided assessment of intentionally vulnerable VMs: recon, scanning, exploitation and reporting.",
      tech: ["Nmap", "Metasploit", "Burp Suite", "Kali Linux"],
      learned: "A repeatable assessment workflow and how to write a simple findings report with risk notes.",
      repo: "", demo: "", image: "" },

    { id: "secure-web-app", title: "Secure Web Application", category: "Web Security",
      icon: "", short: "A small web app built with security in mind: validation, parameterised queries and safe output handling.",
      tech: ["HTML", "CSS", "JavaScript", "SQL"],
      learned: "Implementing the OWASP guidance I study — input validation, escaping output and least privilege.",
      repo: "", demo: "", image: "" },
  ],

  /* =========================================================
     9. CYBERSECURITY LABS
     platform: "TryHackMe" | "Hack The Box" | "Personal" | "CTF"
     status:   "Completed" | "In Progress" | "Planned"
     difficulty: "Easy" | "Medium" | "Hard"
     date: completion date or "" for planned
     url: room / profile link ("" hides the button)
     ========================================================= */
  labProfiles: [
    { platform: "TryHackMe", url: "https://tryhackme.com/p/your-thm-username", note: "Daily practice platform" },
    { platform: "Hack The Box", url: "https://app.hackthebox.com/profile/your-id", note: "Academy + starting point machines" },
    { platform: "CTFtime", url: "https://ctftime.org/team/your-team-id", note: "CTF events & write-ups" },
  ],

  labs: [
    { platform: "TryHackMe", name: "Pre Security", topic: "Cyber fundamentals & networks", difficulty: "Easy", status: "Completed", skills: ["Networking", "Security Basics"], date: "Mar 2026", url: "" },
    { platform: "TryHackMe", name: "Linux Fundamentals", topic: "Linux command line", difficulty: "Easy", status: "Completed", skills: ["Linux", "Bash"], date: "Apr 2026", url: "" },
    { platform: "TryHackMe", name: "Network Fundamentals", topic: "TCP/IP, DNS, DHCP", difficulty: "Easy", status: "Completed", skills: ["Networking", "Protocols"], date: "Apr 2026", url: "" },
    { platform: "TryHackMe", name: "Web Fundamentals", topic: "HTTP & web requests", difficulty: "Easy", status: "Completed", skills: ["HTTP", "Web Security"], date: "May 2026", url: "" },
    { platform: "TryHackMe", name: "Burp Suite: The Basics", topic: "Intercepting web traffic", difficulty: "Easy", status: "In Progress", skills: ["Burp Suite", "Web Security"], date: "", url: "" },
    { platform: "Hack The Box", name: "Starting Point — Tier 1", topic: "Guided pentest basics", difficulty: "Easy", status: "In Progress", skills: ["Recon", "Exploitation Basics"], date: "", url: "" },
    { platform: "Personal", name: "Home Lab Build", topic: "VMs, network + monitoring", difficulty: "Medium", status: "Planned", skills: ["Virtualization", "Defensive Security"], date: "", url: "" },
    { platform: "CTF", name: "First CTF Event", topic: "Web + OSINT challenges", difficulty: "Easy", status: "Planned", skills: ["CTF", "Web Security"], date: "", url: "" },
  ],

  /* =========================================================
     10. CERTIFICATES
     category must be one of certificateFilters below.
     skills: shown as chips on the card.
     credentialId: real ID once you earn it ("" hides the line).
     viewUrl / verifyUrl: real links or "" (button hidden).
     ========================================================= */
  certificateFilters: ["Cybersecurity", "Linux", "Networking", "Cloud", "Programming"],

  certificates: [
    { title: "Pre Security Learning Path", org: "TryHackMe", date: "Mar 2026",
      category: "Networking", skills: ["Networking", "Security Basics"], credentialId: "", viewUrl: "", verifyUrl: "" },
    { title: "Introduction to Cyber Security", org: "TryHackMe", date: "Mar 2026",
      category: "Cybersecurity", skills: ["Cyber Fundamentals"], credentialId: "", viewUrl: "", verifyUrl: "" },
    { title: "Linux Fundamentals Path", org: "TryHackMe", date: "Apr 2026",
      category: "Linux", skills: ["Linux", "Command Line"], credentialId: "", viewUrl: "", verifyUrl: "" },
    { title: "Networking Basics", org: "TryHackMe", date: "Apr 2026",
      category: "Networking", skills: ["TCP/IP", "DNS"], credentialId: "", viewUrl: "", verifyUrl: "" },
    { title: "Responsive Web Design", org: "freeCodeCamp", date: "May 2026",
      category: "Programming", skills: ["HTML", "CSS"], credentialId: "", viewUrl: "", verifyUrl: "" },
    { title: "Python for Beginners", org: "Online course", date: "Jun 2026",
      category: "Programming", skills: ["Python 3"], credentialId: "", viewUrl: "", verifyUrl: "" },
    { title: "AWS Cloud Practitioner Essentials", org: "AWS Skill Builder", date: "Planned",
      category: "Cloud", skills: ["AWS", "Cloud Basics"], credentialId: "", viewUrl: "", verifyUrl: "" },
  ],

  /* =========================================================
     11. LEARNING DASHBOARD
     status: "Completed" | "Learning" | "Planned"
     pct: how far along the topic you are
     ========================================================= */
  learningTopics: [
    { name: "Linux",             icon: "", status: "Completed", pct: 50, detail: "Command line, users, permissions, services" },
    { name: "Networking",        icon: "", status: "Completed", pct: 65, detail: "TCP/IP, DNS, HTTP, ports and protocols" },
    { name: "Python",            icon: "", status: "Learning",  pct: 60,  detail: "Automation scripts and small security tools" },
    { name: "Web Security",      icon: "", status: "Learning",  pct: 45,  detail: "OWASP Top 10, Burp Suite practice" },
    { name: "Ethical Hacking",   icon: "", status: "Learning",  pct: 15,  detail: "Recon, scanning, exploitation in labs" },
    { name: "Cloud Security",    icon: "", status: "Planned",   pct: 5,   detail: "AWS, IAM, security groups" },
  ],

  /* =========================================================
     12. CAREER ROADMAP
     ========================================================= */
  roadmapStages: [
    { title: "Foundation", icon: "", items: ["Linux", "Networking", "Operating Systems", "Python", "Git"] },
    { title: "Security Fundamentals", icon: "", items: ["Cybersecurity Fundamentals", "Cryptography", "Authentication", "Access Control"] },
    { title: "Offensive Security", icon: "", items: ["Reconnaissance", "Web Security", "Vulnerability Assessment", "Penetration Testing", "CTF"] },
    { title: "Defensive Security", icon: "", items: ["SOC", "SIEM", "Log Analysis", "Incident Response", "Threat Detection"] },
    { title: "Cloud Security", icon: "", items: ["AWS", "IAM", "Cloud Networking", "Cloud Security"] },
  ],

  careers: [
    { title: "SOC Analyst", icon: "", summary: "Monitor networks for threats, triage alerts and respond to incidents as part of a Security Operations Center.",
      skills: ["SIEM (Splunk / Wazuh)", "Log Analysis", "Incident Response", "Threat Hunting", "Networking & OS knowledge"],
      tools: ["Wazuh", "Splunk", "Wireshark", "TheHive"], goal: "Entry certificates + defensive labs + log-analysis projects." },
    { title: "Penetration Tester", icon: "", summary: "Ethically attack systems to find vulnerabilities before criminals do, then report them clearly.",
      skills: ["Reconnaissance", "Web Security", "Exploitation", "Reporting", "Scripting (Python/Bash)"],
      tools: ["Nmap", "Burp Suite", "Metasploit", "Kali Linux"], goal: "Labs, CTFs and (later) recognized offensive certifications." },
    { title: "Cloud Security Engineer", icon: "", summary: "Secure cloud infrastructure — identity, networks and workloads — on platforms like AWS.",
      skills: ["AWS / IAM", "Cloud Networking", "Security Groups", "Compliance Basics", "Scripting"],
      tools: ["AWS Console & CLI", "CloudTrail", "GuardDuty", "Terraform (later)"], goal: "Cloud Practitioner cert first, then deeper AWS security." },
  ],

  /* =========================================================
     13. BLOG / SECURITY NOTES
     body: array of blocks. Type "p" = paragraph, "h" = heading,
           "li" = bullet point. Keep them useful but short.
     ========================================================= */
  blogPosts: [
    { title: "Linux Commands Every Security Learner Should Know", date: "May 2026", category: "Linux", readTime: "6 min",
      desc: "The commands I use daily: navigation, file permissions, processes, users and logs.",
      body: [
        { t: "p", v: "Linux powers most servers and most security tools, so the command line is the first real skill I invested in. Here is the core set I use every day." },
        { t: "h", v: "Files & permissions" },
        { t: "li", v: "ls -la, cd, cp, mv, rm and find help you move through a system quickly." },
        { t: "li", v: "chmod and chown control who can read, write or execute files — the foundation of Linux security." },
        { t: "li", v: "sudo -l shows exactly what you are allowed to run with elevated rights." },
        { t: "h", v: "Processes & users" },
        { t: "li", v: "ps aux, top and kill let you inspect and manage running processes." },
        { t: "li", v: "who, w and last show who is on the system and when they logged in." },
        { t: "li", v: "grep and awk turn huge log files into answers — grep 'Failed password' /var/log/auth.log is a classic." },
        { t: "h", v: "Networking basics" },
        { t: "li", v: "ip a, ss -tlnp and curl are the network commands I reach for before any scanning tool." },
      ] },
    { title: "Networking Basics for Cybersecurity", date: "May 2026", category: "Networking", readTime: "7 min",
      desc: "TCP/IP, DNS and HTTP explained the way security learners actually need them.",
      body: [
        { t: "p", v: "Every attack and every defense happens over a network. If you skip networking, security will always feel like guessing." },
        { t: "h", v: "TCP/IP in one paragraph" },
        { t: "p", v: "Data is split into packets with source and destination addresses (IP layer) and delivered to the right application via ports (TCP/UDP layer). The TCP handshake — SYN, SYN-ACK, ACK — establishes a reliable connection." },
        { t: "h", v: "Why DNS matters to attackers" },
        { t: "li", v: "DNS translates domain names to IP addresses — and is abused for phishing, tunneling and botnet communication." },
        { t: "li", v: "Knowing common ports (22 SSH, 80/443 web, 53 DNS) makes scan output readable instantly." },
        { t: "h", v: "HTTP for web security" },
        { t: "li", v: "Requests carry methods, headers, cookies and bodies — every web attack manipulates one of these." },
        { t: "li", v: "HTTPS encrypts the transport layer, not the application — injection flaws still work over HTTPS." },
      ] },
    { title: "Nmap Basics: My First Recon Tool", date: "May 2026", category: "Ethical Hacking", readTime: "8 min",
      desc: "Host discovery, port scanning and service detection — with the flags I actually use.",
      body: [
        { t: "p", v: "Reconnaissance is the first phase of any assessment, and Nmap is where most of us start. Run it only against systems you own or are allowed to test." },
        { t: "h", v: "The flags I use most" },
        { t: "li", v: "nmap -sV -p- target — scan all 65535 ports and detect service versions (slow but thorough)." },
        { t: "li", v: "nmap -sn 10.0.0.0/24 — quick host discovery on a lab subnet." },
        { t: "li", v: "-sC runs default scripts; -A enables OS and version detection in one go." },
        { t: "li", v: "-oA scan saves output in all formats so I can review it later." },
        { t: "h", v: "Reading the output" },
        { t: "li", v: "Open ports + versions tell you which services deserve deeper attention." },
        { t: "li", v: "Filtered vs closed ports hints at firewall rules between you and the target." },
        { t: "p", v: "The real skill is not typing flags — it is deciding what the results mean for the next phase of the test." },
      ] },
    { title: "HTTP & HTTPS Under the Hood", date: "Jun 2026", category: "Web Security", readTime: "6 min",
      desc: "Methods, status codes, headers, cookies and sessions — the grammar of web hacking.",
      body: [
        { t: "p", v: "Web security is application security, but the protocol underneath decides what you can manipulate. Burp Suite showed me HTTP like a debugger shows code." },
        { t: "h", v: "The anatomy of a request" },
        { t: "li", v: "Method (GET/POST/PUT/DELETE), path, headers (Host, Cookie, User-Agent) and an optional body." },
        { t: "li", v: "Status codes tell a story: 2xx success, 3xx redirects, 4xx client errors, 5xx server errors." },
        { t: "h", v: "Where attacks live" },
        { t: "li", v: "Parameters in URLs, bodies and headers are the inputs attackers manipulate — validate every one server-side." },
        { t: "li", v: "Cookies and sessions carry authentication state; flaws here become session hijacking." },
        { t: "li", v: "HTTPS protects data in transit but not logic bugs — an 'encrypted' site can still be fully vulnerable." },
      ] },
    { title: "SQL Injection Explained (And How to Prevent It)", date: "Jun 2026", category: "Web Security", readTime: "9 min",
      desc: "What SQLi is, how a basic payload works, and the fixes that stop it.",
      body: [
        { t: "p", v: "SQL injection happens when user input is concatenated straight into a database query. It is one of the oldest and still most dangerous web flaws." },
        { t: "h", v: "A minimal example" },
        { t: "li", v: "A login query like SELECT * FROM users WHERE name = '$input' breaks when $input contains a single quote that closes the string and lets an attacker append SQL." },
        { t: "li", v: "The classic payload ' OR '1'='1 returns every row and can bypass a login entirely." },
        { t: "h", v: "Prevention" },
        { t: "li", v: "Parameterised queries / prepared statements — the input is data, never code." },
        { t: "li", v: "Validate input types and lengths, and apply least-privilege DB accounts." },
        { t: "p", v: "I practise detection in lab apps and always verify with a second, manual check before calling something vulnerable." },
      ] },
    { title: "XSS: When a Website Runs Your Input", date: "Jun 2026", category: "Web Security", readTime: "8 min",
      desc: "Stored, reflected and DOM XSS — plus output encoding as the primary fix.",
      body: [
        { t: "p", v: "Cross-Site Scripting lets an attacker inject JavaScript that the browser runs in another user's session. Reflected XSS is in the URL, stored XSS lives in the database, and DOM XSS happens entirely in the browser." },
        { t: "h", v: "Why it matters" },
        { t: "li", v: "A single stored XSS can steal session cookies, rewrite pages, or perform actions as the victim." },
        { t: "li", v: "Testing payloads like <script>alert(1)</script> in lab apps teaches you where output is not encoded." },
        { t: "h", v: "Fixes" },
        { t: "li", v: "Context-aware output encoding is the core defense — encode for HTML, attributes, JS and URLs separately." },
        { t: "li", v: "A Content-Security-Policy with no unsafe-inline scripts limits damage even if injection slips through." },
      ] },
    { title: "Burp Suite for Beginners", date: "Jul 2026", category: "Web Security", readTime: "7 min",
      desc: "Proxy, Repeater and Intruder — the three features that taught me web requests.",
      body: [
        { t: "p", v: "Burp Suite Community is the free version of the industry-standard web testing tool. My workflow in three tools:" },
        { t: "h", v: "Proxy" },
        { t: "li", v: "Sets up a local proxy (default 127.0.0.1:8080). Point your browser at it, install the CA certificate, and every request appears in Burp." },
        { t: "h", v: "Repeater" },
        { t: "li", v: "Lets you take any captured request, tweak one part — a header, a parameter, a value — and send it again and again to observe the response." },
        { t: "h", v: "Intruder" },
        { t: "li", v: "Automates many requests with payload lists — great for testing how an app handles fuzzed input." },
        { t: "p", v: "Rule: only test targets you own or have written permission for. Burp is a knife, not a toy." },
      ] },
    { title: "Cybersecurity Fundamentals I Wish I Knew Earlier", date: "Jul 2026", category: "Cybersecurity", readTime: "5 min",
      desc: "The CIA triad, the kill chain and the mindset that separates hackers from criminals.",
      body: [
        { t: "p", v: "Three ideas changed how I study security more than any single tool." },
        { t: "h", v: "The CIA triad" },
        { t: "li", v: "Confidentiality — only authorized people can read it (encryption, access control)." },
        { t: "li", v: "Integrity — data has not been changed (hashing, checksums, signing)." },
        { t: "li", v: "Availability — systems stay up when needed (backups, redundancy, DDoS defense)." },
        { t: "h", v: "Attackers have a process too" },
        { t: "li", v: "Recon → weaponization → delivery → exploitation → installation → command & control → actions on objective." },
        { t: "li", v: "Defenders break that chain anywhere they can — often at detection, where the kill chain is loudest." },
        { t: "h", v: "Ethics is not optional" },
        { t: "p", v: "Authorization defines the difference between a penetration tester and a criminal. If you do not own it or have written permission, you do not touch it." },
      ] },
    { title: "SOC Basics: What Analysts Actually Do", date: "Aug 2026", category: "Defensive Security", readTime: "8 min",
      desc: "Triage, escalation, SIEM and the alert lifecycle — a student view of the blue team.",
      body: [
        { t: "p", v: "A SOC (Security Operations Center) watches an organisation's systems for signs of attack. Analysts sit between the noise of thousands of events and the handful that matter." },
        { t: "h", v: "The analyst loop" },
        { t: "li", v: "Monitor — SIEM tools aggregate logs from endpoints, servers and firewalls into searchable alerts." },
        { t: "li", v: "Triage — decide if an alert is a true positive, false positive or benign activity." },
        { t: "li", v: "Investigate — pull logs, correlate events, and answer who/what/when/where/how." },
        { t: "li", v: "Escalate or close — document everything; an incident report is a legal and learning artefact." },
        { t: "h", v: "Why I train for it" },
        { t: "p", v: "Defensive skills (log analysis, incident response, detection) are the most common entry point into security careers, and they make you a far better offensive tester later." },
      ] },
    { title: "Cloud Security: Starting on AWS", date: "Aug 2026", category: "Cloud", readTime: "7 min",
      desc: "IAM, security groups and the shared responsibility model — my first steps in the cloud.",
      body: [
        { t: "p", v: "Cloud moves security from 'what is on my server' to 'what is my configuration'. Most cloud breaches are misconfigurations, not hacked encryption." },
        { t: "h", v: "Start with IAM" },
        { t: "li", v: "IAM is who-can-do-what. Least privilege — the minimum permissions needed — is the single most important habit." },
        { t: "li", v: "Never use the root account for daily work. Create users, groups and roles instead." },
        { t: "h", v: "Network basics" },
        { t: "li", v: "Security groups act as firewalls at the instance level — allow only the ports you truly need." },
        { t: "li", v: "CloudTrail logs API calls; if something happens, that log is your evidence." },
        { t: "h", v: "Shared responsibility" },
        { t: "p", v: "The provider secures the cloud; you secure what is in the cloud. Knowing exactly where that line sits is the core skill." },
      ] },
  ],

  /* =========================================================
     14. GITHUB SHOWCASE (placeholder — edit in section 1 first)
     ========================================================= */
  github: {
    repoCount: 12,
    starsTotal: 8,
    followers: 5,
    contributions: 320,          // last-12-months placeholder
    languages: [
      { name: "Python", pct: 40 },
      { name: "Shell / Bash", pct: 25 },
      { name: "HTML / CSS", pct: 20 },
      { name: "JavaScript", pct: 15 },
    ],
    featuredRepos: [
      { name: "cybersecurity-portfolio", desc: "Config-driven personal portfolio (this site) — HTML, CSS, JS.", language: "JavaScript", stars: 3, forks: 0 },
      { name: "python-security-tools", desc: "Port scanner, hash demo and log parser written while learning Python.", language: "Python", stars: 2, forks: 0 },
      { name: "security-lab-notes", desc: "Write-ups and notes from TryHackMe, HTB and personal labs.", language: "Markdown", stars: 1, forks: 1 },
    ],
  },

  /* =========================================================
     15. ACHIEVEMENTS
     ========================================================= */
  achievements: [
    { icon: "", title: "Completed Pre Security path", tag: "Training", when: "2026",
      desc: "Finished the TryHackMe Pre Security learning path covering cyber fundamentals and networking." },
    { icon: "", title: "First machines rooted", tag: "Labs", when: "2026",
      desc: "Worked through beginner boxes end-to-end: recon, exploitation and documentation." },
    { icon: "", title: "Published security notes", tag: "Learning", when: "2026",
      desc: "Started public write-ups on this site — writing what I learn to make it stick." },
    { icon: "", title: "Built first security tools", tag: "Projects", when: "2026",
      desc: "Small but working Python and Bash tools: port checks, hash demos, log parsers." },
    { icon: "", title: "Attended campus security workshop", tag: "Event", when: "2025",
      desc: "Hands-on introduction to ethical hacking hosted at my college." },
    { icon: "", title: "First CTF attempts", tag: "CTF", when: "Planned",
      desc: "Training toward competing in team CTFs — web and OSINT categories first." },
  ],

  /* =========================================================
     16. RESUME
     summary + objective: plain-text paragraphs shown on the resume.
     keySkills: short line used on the printed resume.
     Everything else (education, projects, certificates, labs)
     is pulled automatically from the data above.
     ========================================================= */
  resume: {
    summary:
      "Cybersecurity-focused B.Tech Computer Science student building practical skills in Linux, networking, Python, web security and ethical hacking through structured labs and personal projects. Looking for an internship where I can learn from professionals and contribute real work.",

    keySkills:
      "Linux, Bash, Python, Networking (TCP/IP, DNS, HTTP), Web Security, Nmap, Burp Suite, Wireshark, Git/GitHub, HTML/CSS/JavaScript",

    highlightLines: [
      "Completed entry-level security learning paths on TryHackMe",
      "Hands-on with Nmap, Burp Suite, Wireshark and Kali Linux in lab environments",
      "Building and documenting personal security projects publicly on GitHub",
    ],
  },
};
