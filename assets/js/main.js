/* =========================================================================
   CYBERSEC PORTFOLIO — MAIN SCRIPT
   -------------------------------------------------------------------------
   Reads window.SITE_DATA (assets/js/data.js) and renders the site.

   Table of contents:
     1. helpers & icons
     2. seo / meta
     3. page loader
     4. navigation (render, menu, scrollspy, progress)
     5. hero (text, typing, terminal, orbit)
     6. about / education
     7. skills
     8. tools (+ modal)
     9. projects (+ filters)
    10. labs
    11. certificates (+ filters + lightbox)
    12. learning dashboard (+ counters)
    13. roadmap (+ expandable careers)
    14. blog (+ article reader)
    15. github showcase
    16. achievements
    17. resume (preview, view modal, PDF download)
    18. contact form
    19. footer
    20. shared modal manager
    21. motion (reveal, ripple, particles, cursor glow, back-to-top)

   Security notes:
   - Every dynamic string is escaped before insertion (esc()).
   - No innerHTML is ever built from user input.
   - No API keys / secrets live in this project by design.
   ========================================================================= */

(() => {
  "use strict";

  const DATA = window.SITE_DATA;
  const CONFIG = DATA ? DATA.config : null;

  /* ============ 1. HELPERS & ICONS ============ */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---- inline SVG icons (stroke style, 24 viewBox) ---- */
  const S = (paths, vb) =>
    `<svg viewBox="${vb || "0 0 24 24"}" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

  const ICONS = {
    home: S("<path d='M3 10.5 12 3l9 7.5'/><path d='M5 9.5V21h14V9.5'/><path d='M9.5 21v-6h5v6'/>"),
    user: S("<circle cx='12' cy='8' r='4'/><path d='M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5'/>"),
    skills: S("<rect x='5' y='5' width='14' height='14' rx='2'/><rect x='9.5' y='9.5' width='5' height='5'/><path d='M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2'/>"),
    tools: S("<path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z'/>"),
    projects: S("<path d='M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/>"),
    labs: S("<path d='M2 12h20'/><path d='M4 12a8 8 0 0 0 16 0'/><path d='M12 4v3'/><path d='M7 7l3 3M17 7l-3 3'/>"),
    certificates: S("<circle cx='12' cy='9' r='5'/><path d='M8.8 13.4 7.5 21l4.5-2.6L16.5 21l-1.3-7.6'/>"),
    learning: S("<path d='M2 4h5a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z'/><path d='M22 4h-5a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h6z'/>"),
    roadmap: S("<path d='M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z'/><path d='M9 4v14M15 6v14'/>"),
    resume: S("<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><path d='M14 2v6h6'/><path d='M9 13h6M9 17h6'/>"),
    contact: S("<path d='M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z'/><path d='m22 7-10 6L2 7'/>"),
    github: S("<path d='M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21'/>"),
    linkedin: S("<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A6 6 0 0 1 16 8z'/><rect x='2' y='9' width='4' height='12'/><circle cx='4' cy='4' r='2'/>"),
    mail: S("<rect x='2' y='4' width='20' height='16' rx='2'/><path d='m22 7-10 6L2 7'/>"),
    download: S("<path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><path d='M7 10l5 5 5-5'/><path d='M12 15V3'/>"),
    external: S("<path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'/><path d='M15 3h6v6'/><path d='M10 14 21 3'/>"),
    arrowRight: S("<path d='M5 12h14'/><path d='m12 5 7 7-7 7'/>"),
    arrowDown: S("<path d='M12 5v14'/><path d='m19 12-7 7-7-7'/>"),
    chevronDown: S("<path d='m6 9 6 6 6-6'/>"),
    close: S("<path d='M18 6 6 18M6 6l12 12'/>"),
    eye: S("<path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z'/><circle cx='12' cy='12' r='3'/>"),
    shield: S("<path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/>"),
    lock: S("<rect x='3' y='11' width='18' height='11' rx='2'/><path d='M7 11V7a5 5 0 0 1 10 0v4'/>"),
    bulb: S("<path d='M9 18h6M10 21h4'/><path d='M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.4 1 2.5h6c0-1.1.3-1.9 1-2.5A6 6 0 0 0 12 3z'/>"),
    target: S("<circle cx='12' cy='12' r='9'/><circle cx='12' cy='12' r='5'/><circle cx='12' cy='12' r='1'/>"),
    zap: S("<path d='M13 2 3 14h8l-1 8 11-14h-8z'/>"),
    rocket: S("<path d='M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2c1-1 1-2.5 0-3.5s-2.5-1-3 0z'/><path d='M14 4c3.5-.5 6.5 2.5 6 6l-4 4-3-3z'/><path d='M14 4c-4 0-8 3-10 8l3 3c5-2 8-6 8-10z'/>"),
    search: S("<circle cx='11' cy='11' r='7'/><path d='m21 21-4-4'/>"),
    activity: S("<path d='M22 12h-4l-3 9L9 3l-3 9H2'/>"),
    key: S("<circle cx='7.5' cy='15.5' r='4.5'/><path d='m11 12 10-10M17 6l3 3M15 8l2 2'/>"),
    monitor: S("<rect x='2' y='3' width='20' height='14' rx='2'/><path d='M8 21h8M12 17v4'/>"),
    code: S("<path d='m16 18 6-6-6-6'/><path d='m8 6-6 6 6 6'/>"),
    star: S("<path d='m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2l-5-4.9 6.9-1z'/>"),
    fork: S("<circle cx='6' cy='6' r='2.5'/><circle cx='18' cy='6' r='2.5'/><circle cx='12' cy='18' r='2.5'/><path d='M6 8.5v1A3.5 3.5 0 0 0 9.5 13h5a3.5 3.5 0 0 0 3.5-3.5v-1'/><path d='M12 15.5V13'/>"),
    calendar: S("<rect x='3' y='4' width='18' height='18' rx='2'/><path d='M16 2v4M8 2v4M3 10h18'/>"),
    grad: S("<path d='m22 9-10-5L2 9l10 5 10-5z'/><path d='M6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5'/>"),
    check: S("<path d='M20 6 9 17l-5-5'/>"),
    print: S("<path d='M6 9V2h12v7'/><path d='M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2'/><rect x='6' y='14' width='12' height='8'/>"),
    mapPin: S("<path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z'/><circle cx='12' cy='10' r='3'/>"),
    alert: S("<path d='M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'/><path d='M12 9v4M12 17h.01'/>"),
    info: S("<circle cx='12' cy='12' r='9'/><path d='M12 8h.01M12 12v5'/>"),
    globe: S("<circle cx='12' cy='12' r='9'/><path d='M3 12h18'/><path d='M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z'/>"),
    cloud: S("<path d='M18 10h-1.3A7 7 0 0 0 5 10.2 4.5 4.5 0 0 0 6.5 19H18a4 4 0 0 0 0-9z'/>"),
    award: S("<circle cx='12' cy='8' r='6'/><path d='M8.8 13.4 7.5 21l4.5-2.6L16.5 21l-1.3-7.6'/>"),
  };

  const hueColor = (name) => {
    const map = {
      green: "#00e18f", cyan: "#2ad4ff", blue: "#5b8cff", violet: "#a06bff",
      amber: "#ffd166", rose: "#ff7d9c", orange: "#ff9f5a",
    };
    return map[name] || map.green;
  };
  const HUE_LIST = ["green", "cyan", "blue", "violet", "amber", "rose", "orange"];

  /* monogram: initials of the first letters of up to 2 meaningful words */
  const glyphOf = (name, icon) => {
    if (icon) return esc(icon);
    const words = String(name).split(/[^A-Za-z0-9]+/).filter(Boolean).slice(0, 2);
    const g = words.map((w) => w[0]).join("").toUpperCase().slice(0, 3);
    return g || "?";
  };

  const initialsOf = (personName) =>
    String(personName || "?")
      .replace(/[^A-Za-z ]/g, " ")
      .split(/\s+/).filter(Boolean).slice(0, 2)
      .map((w) => w[0]).join("").toUpperCase() || "?";

  /* ============ 2. SEO / META ============ */
  function renderMeta() {
    if (!CONFIG) return;
    const name = CONFIG.name;
    const title = name + " | Cybersecurity Student & Aspiring Security Professional";
    document.title = title;
    const setMeta = (sel, attr, val) => {
      const el = $(sel);
      if (el && val) el.setAttribute(attr, val);
    };
    setMeta('meta[name="description"]', "content", "Portfolio of " + name + " — " + CONFIG.role.toLowerCase() + ". Exploring " + CONFIG.heroSub);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", "Actively learning, practicing and building toward a professional cybersecurity career.");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", "Actively learning, practicing and building toward a professional cybersecurity career.");
    setMeta('meta[name="author"]', "content", name);
    setMeta('meta[name="theme-color"]', "content", "#04100c");

    /* structured data */
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: name,
      jobTitle: CONFIG.role,
      url: typeof location !== "undefined" ? location.origin + location.pathname : undefined,
      email: CONFIG.email,
      alumniOf: DATA.education && DATA.education.university ? { "@type": "CollegeOrUniversity", name: DATA.education.university } : undefined,
      sameAs: [CONFIG.githubUrl, CONFIG.linkedinUrl].filter(Boolean),
    });
    document.head.appendChild(ld);
  }

  /* ============ 3. PAGE LOADER ============ */
  function bootLoader() {
    const screen = $("#bootScreen");
    if (!screen) return;
    if (reduceMotion.matches) { screen.classList.add("done"); return; }
    const linesEl = $("#bootLines");
    const lines = [
      "> initializing secure interface",
      "> loading: skills / labs / projects",
      "> system status: <span class='ok'>OK</span>",
    ];
    const fill = $("#bootBarFill");
    let i = 0;
    const printLine = () => {
      if (i >= lines.length) return;
      const div = document.createElement("div");
      div.innerHTML = lines[i];       // static, safe strings only
      linesEl.appendChild(div);
      i++;
      if (i < lines.length) setTimeout(printLine, 230);
    };
    setTimeout(printLine, 60);
    if (fill) { fill.style.transition = "width .9s cubic-bezier(.22,.8,.25,1)"; fill.style.width = "100%"; }
    setTimeout(() => screen.classList.add("done"), 1250);
    setTimeout(() => { if (screen.parentNode) screen.parentNode.removeChild(screen); }, 2000);
  }

  /* ============ 4. NAVIGATION ============ */
  function renderNav() {
    const list = $("#navList");
    if (!list) return;
    const iconOf = { home: "home", about: "user", skills: "skills", tools: "tools", projects: "projects", labs: "labs", certificates: "certificates", learning: "learning", roadmap: "roadmap", resume: "resume", contact: "contact" };
    const html = (DATA.nav || [])
      .map((item, i) => {
        const t = item.target || "";
        const ico = ICONS[iconOf[t]] || ICONS.info;
        return `<li><a href="#${esc(t)}" data-spy="${esc(t)}"><span class="menu-ico" aria-hidden="true">${ico}</span>${esc(item.label)}</a></li>`;
      })
      .join("");
    list.innerHTML = html;

    /* mobile menu toggle */
    const toggle = $("#menuToggle");
    const navEl = $("#navLinks");
    const closeMenu = () => {
      navEl.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation menu");
    };
    const toggleMenu = () => {
      const open = navEl.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    };
    toggle.addEventListener("click", toggleMenu);
    list.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navEl.classList.contains("open")) { closeMenu(); toggle.focus(); }
    });
    /* reset state when viewport grows back to desktop */
    const mq = window.matchMedia("(min-width: 1280px)");
    const onDesktop = (ev) => { if (ev.matches) closeMenu(); };
    if (mq.addEventListener) mq.addEventListener("change", onDesktop); else mq.addListener(onDesktop);
  }

  function navScrollFx() {
    const header = $("#siteHeader");
    const bar = $("#navProgress");
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (header) header.classList.toggle("scrolled", y > 8);
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function scrollSpy() {
    const targets = (DATA.nav || []).map((n) => n.target).filter(Boolean);
    const links = $$(".nav-links a[data-spy]");
    const setActive = (id) => {
      links.forEach((a) => {
        const on = a.getAttribute("data-spy") === id;
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    targets.forEach((id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ============ 5. HERO ============ */
  function renderHero() {
    if (!CONFIG) return;
    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

    set("heroStatusText", esc(CONFIG.heroStatusText));
    set("heroName", esc(CONFIG.firstName || CONFIG.name));
    set("heroRole", esc(CONFIG.role));
    set("heroSub", esc(CONFIG.heroSub));

    const extAttrs = 'target="_blank" rel="noopener noreferrer"';
    set("heroCta", [
      '<a class="btn btn-primary" href="#projects">' + ICONS.projects + "View Projects</a>",
      '<button type="button" class="btn btn-ghost" id="ctaResume">' + ICONS.download + "Download Resume</button>",
      CONFIG.githubUrl ? '<a class="btn btn-ghost" href="' + esc(CONFIG.githubUrl) + '" ' + extAttrs + ">" + ICONS.github + "GitHub</a>" : "",
      CONFIG.linkedinUrl ? '<a class="btn btn-ghost" href="' + esc(CONFIG.linkedinUrl) + '" ' + extAttrs + ">" + ICONS.linkedin + "LinkedIn</a>" : "",
      '<a class="btn btn-ghost" href="#contact">' + ICONS.contact + "Contact Me</a>",
    ].filter(Boolean).join(""));

    const dl = $("#ctaResume");
    if (dl) dl.addEventListener("click", () => downloadResume());

    /* orbit chips */
    const orbitHtml = (DATA.orbit || []).map((o, i) =>
      '<span class="orbit-chip o' + (i + 1) + '" style="--c:' + hueColor(o.hue) + '">' + esc(o.text) + "</span>"
    ).join("");

    const termStatus =
      "<span>mode: <b>learning</b></span><span>scope: <b>labs</b></span><span>ethics: <b>always</b></span>" +
      (CONFIG.availability ? "<span>status: <b>" + esc(CONFIG.availability) + "</b></span>" : "");

    set("heroVisual",
      '<div class="term" role="img" aria-label="Terminal window with example commands">' +
        '<div class="term-head" aria-hidden="true"><span class="term-dot"></span><span class="term-dot"></span><span class="term-dot"></span><span class="term-title">user@cybersec: ~</span></div>' +
        '<div class="term-body" id="termBody"></div>' +
        '<div class="term-status">' + termStatus + "</div>" +
      "</div>" + orbitHtml
    );
    runTerminal();
  }

  function runTerminal() {
    const body = $("#termBody");
    if (!body) return;
    const script = DATA.heroTerminal || [];
    const draw = (lines) => {
      const frag = document.createDocumentFragment();
      lines.forEach((ln) => {
        const div = document.createElement("div");
        div.className = "term-line";
        if (ln.kind === "cmd") {
          div.append("$ ", document.createTextNode(ln.text));
        } else {
          div.style.color = "var(--cyan)";
          div.textContent = ln.text;
        }
        frag.appendChild(div);
      });
      body.textContent = "";
      body.appendChild(frag);
      const cur = document.createElement("span");
      cur.className = "term-cursor";
      body.appendChild(cur);
    };
    if (reduceMotion.matches) {
      const full = [];
      script.forEach((c) => { full.push({ kind: "cmd", text: c.cmd }); if (c.out) full.push({ kind: "out", text: c.out }); });
      draw(full);
      return;
    }
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (document.body.contains(body)) {
        const lines = [];
        for (const c of script) {
          lines.push({ kind: "cmd", text: c.cmd });
          draw(lines);
          await wait(650);
          if (c.out) { lines.push({ kind: "out", text: c.out }); draw(lines); await wait(900); }
        }
        await wait(2600);
      }
    })();
  }

  function typewriter() {
    const el = $("#typedLine");
    if (!el || !DATA.typing || !DATA.typing.length) return;
    let phrase = 0;
    let pos = 0;
    let deleting = false;

    if (reduceMotion.matches) { el.textContent = DATA.typing[0]; return; }

    const speed = () => (deleting ? 32 : 62);
    const tick = () => {
      const word = DATA.typing[phrase];
      if (!deleting) {
        pos++;
        el.textContent = word.slice(0, pos);
        if (pos === word.length) { deleting = true; setTimeout(tick, 1600); return; }
      } else {
        pos--;
        el.textContent = word.slice(0, pos);
        if (pos === 0) { deleting = false; phrase = (phrase + 1) % DATA.typing.length; }
      }
      setTimeout(tick, speed());
    };
    setTimeout(tick, 900);
  }

  /* ============ 6. ABOUT / EDUCATION ============ */
  function renderAbout() {
    const A = DATA.about;
    if (!A) return;
    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

    /* profile header */
    const avatar =
      CONFIG.profileImage
        ? '<img src="' + esc(CONFIG.profileImage) + '" alt="' + esc(CONFIG.profileImageAlt || "Profile photo of " + CONFIG.name) + '">'
        : esc(initialsOf(CONFIG.name));
    const socials =
      (CONFIG.githubUrl ? '<a class="icon-btn" href="' + esc(CONFIG.githubUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">' + ICONS.github + "</a>" : "") +
      (CONFIG.linkedinUrl ? '<a class="icon-btn" href="' + esc(CONFIG.linkedinUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">' + ICONS.linkedin + "</a>" : "") +
      '<a class="icon-btn" href="mailto:' + esc(CONFIG.email) + '" aria-label="Send an email">' + ICONS.mail + "</a>";
    set("aboutProfile",
      '<div class="avatar" role="img" aria-label="Avatar for ' + esc(CONFIG.name) + '">' + avatar + "</div>" +
      "<div><h3>" + esc(CONFIG.name) + "</h3>" +
      '<p class="role-line">' + esc(CONFIG.headline || CONFIG.role) + "</p>" +
      '<div class="social-row">' + socials + "</div></div>"
    );

    set("aboutIntro", (A.intro || []).map((p) => "<p>" + esc(p) + "</p>").join(""));
    set("aboutGoals", block("Career goals", "target", A.goals));
    set("aboutPhilosophy", block("Learning philosophy", "bulb", A.philosophy));
    set("aboutObjectives", block("Future objectives", "rocket", A.objectives));
    set("aboutTags", (A.tags || []).map((t) => '<span class="chip">' + esc(t) + "</span>").join(""));

    set("quickFacts",
      '<ul>' + (A.quickFacts || []).map((q) => '<li><span class="k">' + esc(q.k) + '</span><span class="v">' + esc(q.v) + "</span></li>").join("") + "</ul>"
    );

    /* journey timeline */
    const states = { done: "Completed", active: "In progress", next: "Upcoming" };
    const pills = { done: "pill-green", active: "pill-cyan", next: "pill-dim" };
    const html = (A.journey || []).map((j, i) =>
      "<li class='is-" + esc(j.state) + "'>" +
        '<span class="journey-node" aria-hidden="true"></span>' +
        '<div class="journey-step">' + esc(j.step) +
          '<span class="pill ' + pills[j.state] + '">' + (states[j.state] || "") + "</span>" +
        "</div>" +
        '<p class="journey-note">' + esc(j.note) + "</p>" +
      "</li>"
    ).join("");
    set("journeyTimeline", html);
  }

  function block(title, icon, text) {
    return '<div class="detail-block"><h4>' + (ICONS[icon] || "") + esc(title) + "</h4><p>" + esc(text) + "</p></div>";
  }

  function renderEducation() {
    const E = DATA.education;
    if (!E) return;
    const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

    const detailChips = (E.details || []).map((d) => '<span class="chip"><i aria-hidden="true">' + esc(d.value) + "</i></span>").join("");
    set("eduBody",
      '<div class="edu-degree"><p class="section-kicker">' + esc(E.degree) + "</p>" +
        "<h3>" + esc(E.branch) + "</h3>" +
        '<p class="uni-line">' + esc(E.university) + "</p>" +
        '<div class="edu-chips">' + detailChips + "</div></div>" +
      (E.relevantSubjects && E.relevantSubjects.length
        ? '<div class="edu-subjects"><h4>Relevant subjects</h4><div class="subj-wrap">' +
          E.relevantSubjects.map((s) => '<span class="subj-chip">' + esc(s) + "</span>").join("") + "</div></div>"
        : "")
    );

    const tl = (E.timeline || []).map((t) =>
      '<div class="edu-item"><span class="edu-dot" aria-hidden="true"></span>' +
        '<div class="period">' + esc(t.period) + "</div>" +
        "<h4>" + esc(t.title) + "</h4>" +
        '<div class="org">' + esc(t.org) + "</div>" +
        "<p>" + esc(t.note) + "</p></div>"
    ).join("");
    set("eduTimeline", tl);
  }

  /* ============ 7. SKILLS ============ */
  const levelPill = { Beginner: "pill-cyan", Intermediate: "pill-green", Advanced: "pill-violet" };

  function renderSkills() {
    const grid = $("#skillsGrid");
    if (!grid) return;
    const iconOf = { Security: "shield", Networking: "globe", "Operating Systems": "monitor", Programming: "code", Cloud: "cloud" };
    const html = (DATA.skillGroups || []).map((group, gi) => {
      const icon = ICONS[iconOf[group.name] || "shield"];
      return (
        '<article class="glass-card skill-group reveal" data-delay="' + (gi % 3) + '">' +
          '<div class="skill-group-head"><span class="icotile icotile-lg" style="--c:' + hueColor(HUE_LIST[gi % HUE_LIST.length]) + '">' + icon + "</span>" +
            "<div><h3>" + esc(group.name) + "</h3><p>" + esc(group.intro || "") + "</p></div></div>" +
          '<div class="skill-list">' +
            (group.skills || []).map((sk, si) => {
              const hue = hueColor(HUE_LIST[(gi * 2 + si) % HUE_LIST.length]);
              return (
                '<div class="skill">' +
                  '<div class="skill-top"><span class="skill-name"><span class="icotile icotile-sm" style="--c:' + hue + '" aria-hidden="true">' + esc(glyphOf(sk.name, sk.icon)) + "</span>" +
                    "<span>" + esc(sk.name) + "</span></span>" +
                    '<span class="skill-meta"><span class="pill ' + (levelPill[sk.level] || "pill-dim") + '">' + esc(sk.level || "") + "</span>" +
                    '<span class="skill-pct" data-pct="' + (sk.pct || 0) + '">' + (sk.pct || 0) + "%</span></span></div>" +
                  '<div class="skill-bar"><i data-pct="' + (sk.pct || 0) + '"></i></div>' +
                "</div>"
              );
            }).join("") +
          "</div>" +
        "</article>"
      );
    }).join("");
    grid.innerHTML = html;

    const dis = $("#skillsDisclaimer");
    if (dis) dis.textContent = DATA.skillsDisclaimer || "";
  }

  /* ============ 8. TOOLS ============ */
  function renderTools() {
    const root = $("#toolsBody");
    if (!root) return;
    let cardIndex = 0;
    const groupIcon = { Reconnaissance: "search", "Web Security": "shield", "Network Analysis": "activity", Pentesting: "target", "Password Auditing": "key", "Operating Systems": "monitor", Development: "code" };
    const html = (DATA.toolGroups || []).map((group) => {
      const hue = hueColor(HUE_LIST[cardIndex % HUE_LIST.length]);
      const cards = (group.tools || []).map((tool) => {
        const h = hueColor(HUE_LIST[cardIndex++ % HUE_LIST.length]);
        return (
          '<button type="button" class="tool-card" data-tool="' + esc(tool.name) + '" aria-haspopup="dialog" style="--c:' + h + '">' +
            '<span class="icotile" style="--c:' + h + '" aria-hidden="true">' + esc(glyphOf(tool.name, tool.icon)) + "</span>" +
            '<span class="tool-info"><span class="tool-name">' + esc(tool.name) + '</span><span class="tool-tag">' + esc(tool.tag || "") + "</span></span>" +
            '<span class="chev" aria-hidden="true">' + ICONS.arrowRight + "</span>" +
          "</button>"
        );
      }).join("");
      return (
        '<div class="tool-group reveal">' +
          '<div class="tool-group-head"><span class="icotile icotile-lg" style="--c:' + hue + '" aria-hidden="true">' + (ICONS[groupIcon[group.name]] || ICONS.tools) + "</span>" +
            "<h3>" + esc(group.name) + '</h3><span class="line" aria-hidden="true"></span></div>' +
          '<div class="tool-grid">' + cards + "</div>" +
        "</div>"
      );
    }).join("");
    root.innerHTML = html;

    $$(".tool-card", root).forEach((card) => {
      card.addEventListener("click", () => {
        const name = card.getAttribute("data-tool");
        const tool = (DATA.toolGroups || []).flatMap((g) => g.tools || []).find((t) => t.name === name);
        if (tool) openToolModal(tool);
      });
    });
  }

  function openToolModal(tool) {
    const hue = hueColor("green");
    const related = (tool.relatedProjects || []).map((pid) => {
      const p = (DATA.projects || []).find((x) => x.id === pid);
      return p ? '<button type="button" class="chip chip-link" data-go-project="' + esc(p.id) + '">' + esc(p.title) + "</button>" : "";
    }).join("");
    const ext = tool.url ? '<a class="btn btn-ghost btn-sm" href="' + esc(tool.url) + '" target="_blank" rel="noopener noreferrer">' + ICONS.external + "Official site</a>" : "";

    openModal(
      '<div class="tool-modal-head">' +
        '<span class="icotile icotile-lg" style="--c:' + hue + '" aria-hidden="true">' + esc(glyphOf(tool.name, tool.icon)) + "</span>" +
        "<div><h3>" + esc(tool.name) + '</h3><p class="tag-line mono">' + esc(tool.tag || "") + "</p></div>" +
      "</div>" +
      '<div class="modal-rule" aria-hidden="true"></div>' +
      '<div class="m-about"><p>' + esc(tool.about) + "</p></div>" +
      '<div class="m-blocks">' +
        '<div class="m-block"><h4>What it is used for</h4><p>' + esc(tool.usedFor) + "</p></div>" +
        '<div class="m-block"><h4>What I learned</h4><p>' + esc(tool.learned) + "</p></div>" +
      "</div>" +
      (related ? '<div class="m-related"><h4>Related projects</h4><div style="display:flex;flex-wrap:wrap;gap:8px">' + related + "</div></div>" : "") +
      '<div class="m-actions">' + ext + "</div>"
    );
  }

  /* ============ 9. PROJECTS ============ */
  let projectFilter = "All";

  function renderProjectFilters() {
    const bar = $("#projectFilters");
    if (!bar) return;
    const cats = ["All"].concat(DATA.projectFilters || []);
    const html = cats.map((c, i) =>
      '<button type="button" class="chip" data-filter="' + esc(c) + '"' + (c === projectFilter ? ' data-active="true"' : "") + ">" +
        (i === 0 ? "All" : esc(c)) + "</button>"
    ).join("");
    bar.innerHTML = html;
    bar.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        projectFilter = chip.getAttribute("data-filter");
        bar.querySelectorAll(".chip").forEach((c) => c.setAttribute("data-active", c === chip ? "true" : "false"));
        renderProjectGrid();
      });
    });
  }

  function catHue(category) {
    const i = (DATA.projectFilters || []).indexOf(category);
    return hueColor(HUE_LIST[Math.max(i, 0) % HUE_LIST.length]);
  }

  function projectCard(p, i) {
    const hue = catHue(p.category);
    const repo = p.repo;
    const demo = p.demo;
    const img = p.image
      ? '<img src="' + esc(p.image) + '" alt="Screenshot of the ' + esc(p.title) + ' project">'
      : "";
    const glyph = '<span class="big-glyph" aria-hidden="true">' + esc(glyphOf(p.title, p.icon)) + "</span>";
    const actions = [];
    if (repo) {
      actions.push('<a class="btn btn-ghost btn-sm" href="' + esc(repo) + '" target="_blank" rel="noopener noreferrer">' + ICONS.github + "GitHub</a>");
    }
    if (demo) {
      actions.push('<a class="btn btn-primary btn-sm" href="' + esc(demo) + '" target="_blank" rel="noopener noreferrer">' + ICONS.external + "Live Demo</a>");
    }
    if (!actions.length && CONFIG.githubUrl) {
      actions.push('<a class="btn btn-ghost btn-sm" href="' + esc(CONFIG.githubUrl) + '" target="_blank" rel="noopener noreferrer">' + ICONS.github + "GitHub Profile</a>");
    }
    return (
      '<article class="project-card reveal" data-cat="' + esc(p.category) + '" style="--c:' + hue + '">' +
        '<div class="proj-banner">' + img + glyph +
          '<span class="proj-cat">' + esc(p.category) + '</span><span class="proj-scan" aria-hidden="true"></span></div>' +
        '<div class="proj-body">' +
          "<h3>" + esc(p.title) + "</h3>" +
          '<p class="proj-desc">' + esc(p.short) + "</p>" +
          '<p class="proj-learned">' + ICONS.bulb + "<span>Learned: " + esc(p.learned) + "</span></p>" +
          '<div class="proj-tech">' + (p.tech || []).map((t) => "<span>" + esc(t) + "</span>").join("") + "</div>" +
          '<div class="proj-actions">' + actions.join("") + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderProjectGrid() {
    const grid = $("#projectGrid");
    const empty = $("#projectsEmpty");
    if (!grid) return;
    const all = DATA.projects || [];
    const shown = projectFilter === "All" ? all : all.filter((p) => p.category === projectFilter);
    grid.innerHTML = shown.map((p, i) => projectCard(p, i)).join("");
    if (empty) empty.hidden = shown.length > 0;
    refreshReveal();
  }

  /* ============ 10. LABS ============ */
  function renderLabs() {
    const profiles = $("#labProfiles");
    const list = $("#labList");
    if (!profiles || !list) return;
    const platHue = { "TryHackMe": "green", "Hack The Box": "cyan", Personal: "blue", CTF: "violet" };

    const phtml = (DATA.labProfiles || []).map((p) => {
      const hue = platHue[p.platform] || "green";
      const link = p.url
        ? '<a class="btn btn-sm btn-ghost" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">Profile ' + ICONS.external + "</a>"
        : "";
      return (
        '<div class="glass-card lab-profile reveal">' +
          '<span class="icotile icotile-lg" style="--c:' + hueColor(hue) + '" aria-hidden="true">' + esc(p.platform.slice(0, 2).toUpperCase()) + "</span>" +
          '<div class="p-body"><h3>' + esc(p.platform) + "</h3><p>" + esc(p.note || "") + "</p></div>" +
          link +
        "</div>"
      );
    }).join("");
    profiles.innerHTML = phtml;

    const statusPill = (s) => {
      if (s === "Completed") return '<span class="pill pill-green">' + ICONS.check + "Completed</span>";
      if (s === "In Progress") return '<span class="pill pill-cyan">' + ICONS.activity + "In Progress</span>";
      return '<span class="pill pill-dim" style="border-style:dashed">' + ICONS.calendar + "Planned</span>";
    };
    const diffPill = (d) => {
      const cls = d === "Easy" ? "pill-green" : d === "Medium" ? "pill-amber" : "pill-rose";
      return '<span class="pill ' + cls + '">' + esc(d) + "</span>";
    };

    const head =
      '<div class="lab-head" aria-hidden="true"><span>Platform</span><span>Lab / Room</span><span>Topic</span><span>Difficulty</span><span>Status</span><span>Completed</span><span></span></div>';
    const rows = (DATA.labs || []).map((lab) => {
      const hue = platHue[lab.platform] || "green";
      const link = lab.url ? '<a class="lab-link" href="' + esc(lab.url) + '" target="_blank" rel="noopener noreferrer">Open ' + ICONS.external + "</a>" : "";
      return (
        '<div class="lab-row" role="row">' +
          '<div class="platform" data-label="Platform"><span class="plat-chip" style="color:' + hueColor(hue) + ";background:" + colorBg(hue) + ";border:1px solid " + hueColor(hue) + "33" + '">' + esc(lab.platform) + "</span></div>" +
          '<div class="name-cell" data-label="Lab"><strong>' + esc(lab.name) + "</strong></div>" +
          '<div class="topic-cell" data-label="Topic">' + esc(lab.topic) + "<small>" + esc((lab.skills || []).join(" · ")) + "</small></div>" +
          '<div class="diff-cell" data-label="Difficulty">' + diffPill(lab.difficulty) + "</div>" +
          '<div class="status-cell" data-label="Status">' + statusPill(lab.status) + "</div>" +
          '<div class="date-cell" data-label="Date">' + esc(lab.date || "—") + "</div>" +
          '<div class="link-cell">' + link + "</div>" +
        "</div>"
      );
    }).join("");
    list.innerHTML = head + rows;
  }

  const colorBg = (hueName) => {
    const h = hueColor(hueName);
    return h + "14";
  };

  /* ============ 11. CERTIFICATES ============ */
  let certFilter = "All";

  function renderCertFilters() {
    const bar = $("#certFilters");
    if (!bar) return;
    const cats = ["All"].concat(DATA.certificateFilters || []);
    bar.innerHTML = cats.map((c) =>
      '<button type="button" class="chip" data-filter="' + esc(c) + '"' + (c === certFilter ? ' data-active="true"' : "") + ">" + esc(c) + "</button>"
    ).join("");
    bar.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        certFilter = chip.getAttribute("data-filter");
        bar.querySelectorAll(".chip").forEach((c) => c.setAttribute("data-active", c === chip ? "true" : "false"));
        renderCertGrid();
      });
    });
  }

  function certArt(cert, large) {
    const L = large ? " cert-large" : "";
    return (
      '<div class="cert-art' + L + '" aria-hidden="true">' +
        '<span class="cert-seal">' + ICONS.award.replace('width="16" height="16"', 'width="18" height="18"') + "</span>" +
        '<div class="cert-art-inner">' +
          '<div class="art-org">' + esc(cert.org) + "</div>" +
          '<div class="art-title">' + esc(cert.title) + "</div>" +
          '<div class="art-recipient">awarded to ' + esc(CONFIG.name) + "</div>" +
          '<div class="art-date">' + esc(cert.date) + (cert.credentialId ? " &nbsp;•&nbsp; " + esc(cert.credentialId) : "") + "</div>" +
        "</div>" +
      "</div>"
    );
  }

  function certCard(cert, i) {
    const hue = hueColor(HUE_LIST[i % HUE_LIST.length]);
    return (
      '<article class="cert-card reveal" data-cert="' + i + '" tabindex="0" role="button" aria-haspopup="dialog" aria-label="Open certificate: ' + esc(cert.title) + '" style="--c:' + hue + '">' +
        certArt(cert, false) +
        '<div class="cert-body">' +
          "<h3>" + esc(cert.title) + "</h3>" +
          '<div class="cert-org">' + ICONS.shield + '<span>' + esc(cert.org) + "</span></div>" +
          '<div class="cert-skills">' + (cert.skills || []).map((s) => "<span>" + esc(s) + "</span>").join("") + "</div>" +
          '<div class="cert-foot"><span class="cert-date">' + esc(cert.date) + "</span>" +
            '<span class="cert-view">View ' + ICONS.arrowRight + "</span></div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderCertGrid() {
    const grid = $("#certGrid");
    const empty = $("#certsEmpty");
    if (!grid) return;
    const all = DATA.certificates || [];
    const shown = certFilter === "All" ? all : all.filter((c) => c.category === certFilter);
    grid.innerHTML = shown.map((c, i) => certCard(c, i)).join("");
    if (empty) empty.hidden = shown.length > 0;
    refreshReveal();

    $$(".cert-card", grid).forEach((card) => {
      const open = () => {
        const idx = Number(card.getAttribute("data-cert"));
        const list = certFilter === "All" ? all : all.filter((c) => c.category === certFilter);
        const cert = list[idx];
        if (cert) openCertModal(cert);
      };
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });
  }

  function openCertModal(cert) {
    const ver =
      cert.verifyUrl
        ? '<a class="btn btn-ghost btn-sm" href="' + esc(cert.verifyUrl) + '" target="_blank" rel="noopener noreferrer">' + ICONS.external + "Verify Certificate</a>"
        : "";
    const cred = cert.credentialId
      ? '<div><b>Credential ID</b><span>' + esc(cert.credentialId) + "</span></div>" : "";
    openModal(
      '<div class="cert-modal">' +
        certArt(cert, true) +
        '<div class="cert-modal-details">' +
          "<div><b>Issuing organization</b><span>" + esc(cert.org) + "</span></div>" +
          "<div><b>Date</b><span>" + esc(cert.date) + "</span></div>" +
          cred +
          "<div><b>Skills</b><span>" + esc((cert.skills || []).join(", ")) + "</span></div>" +
        "</div>" +
        '<div class="m-actions" style="justify-content:center">' + ver + "</div>" +
      "</div>",
      true
    );
  }

  /* ============ 12. LEARNING DASHBOARD ============ */
  function renderLearning() {
    const strip = $("#metricStrip");
    const topics = $("#learningTopics");
    if (!strip || !topics) return;

    const t = DATA.learningTopics || [];
    const completed = t.filter((x) => x.status === "Completed").length;
    const learning = t.filter((x) => x.status === "Learning").length;
    const planned = t.filter((x) => x.status === "Planned").length;
    const labsDone = (DATA.labs || []).filter((l) => l.status === "Completed").length;
    const certsDone = (DATA.certificates || []).filter((c) => c.date && c.date !== "Planned").length;

    const tiles = [
      { n: completed, l: "Topics Completed" },
      { n: learning, l: "Topics Learning" },
      { n: planned, l: "Topics Planned" },
      { n: (DATA.projects || []).length, l: "Projects Built" },
      { n: labsDone, l: "Labs Completed" },
      { n: certsDone, l: "Certificates Earned" },
    ];
    strip.innerHTML = tiles.map((tile, i) =>
      '<div class="metric-tile reveal" data-delay="' + (i % 4) + '"><strong data-count="' + tile.n + '">0</strong><span>' + tile.l + "</span></div>"
    ).join("");

    const statusInfo = {
      Completed: { pill: "pill-green", hue: "green" },
      Learning: { pill: "pill-cyan", hue: "cyan" },
      Planned: { pill: "pill-amber", hue: "amber" },
    };
    topics.innerHTML = t.map((topic) => {
      const si = statusInfo[topic.status] || statusInfo.Planned;
      const hue = hueColor(si.hue);
      return (
        '<div class="topic-card reveal" style="--c:' + hue + '">' +
          '<div class="topic-head"><span class="icotile" style="--c:' + hue + '" aria-hidden="true">' + esc(glyphOf(topic.name, topic.icon)) + "</span>" +
            '<span class="t-name">' + esc(topic.name) + "</span>" +
            '<span class="pill ' + si.pill + '">' + esc(topic.status) + "</span></div>" +
          '<p class="topic-detail">' + esc(topic.detail || "") + "</p>" +
          '<div class="topic-pct"><span data-pct="' + (topic.pct || 0) + '">' + (topic.pct || 0) + "%</span></div>" +
          '<div class="topic-bar"><i data-pct="' + (topic.pct || 0) + '"></i></div>' +
        "</div>"
      );
    }).join("");
  }

  /* ============ 13. ROADMAP ============ */
  function renderRoadmap() {
    const flow = $("#roadmapFlow");
    const careers = $("#careerGrid");
    if (!flow || !careers) return;

    flow.innerHTML = (DATA.roadmapStages || []).map((stage, i) => {
      const card =
        '<div class="stage-card reveal" data-delay="' + (i % 3) + '">' +
          '<div><span class="stage-num">' + String(i + 1).padStart(2, "0") + "</span>" +
          "<h3>" + esc(stage.title) + "</h3></div>" +
          '<div class="stage-items">' + (stage.items || []).map((it) => "<span>" + esc(it) + "</span>").join("") + "</div>" +
        "</div>";
      const arrow = i < DATA.roadmapStages.length - 1
        ? '<div class="stage-arrow" aria-hidden="true">' + ICONS.arrowDown + "</div>" : "";
      return card + arrow;
    }).join("");

    careers.innerHTML = (DATA.careers || []).map((c, i) => {
      const hue = hueColor(HUE_LIST[i % HUE_LIST.length]);
      return (
        '<div class="glass-card career-card reveal" data-delay="' + (i % 3) + '" style="--c:' + hue + '">' +
          '<div class="career-head" role="button" tabindex="0" aria-expanded="false" aria-controls="careerBody' + i + '">' +
            '<span class="icotile icotile-lg" style="--c:' + hue + '" aria-hidden="true">' + esc(glyphOf(c.title, c.icon)) + "</span>" +
            '<span class="c-body"><h3>' + esc(c.title) + "</h3><p>" + esc(c.summary) + "</p></span>" +
            '<span class="career-toggle" aria-hidden="true">' + ICONS.chevronDown + "</span>" +
          "</div>" +
          '<div class="career-body" id="careerBody' + i + '"><div class="career-body-inner"><div class="career-content">' +
            '<div><h4>Skills I need to build</h4><ul>' + (c.skills || []).map((s) => "<li>" + esc(s) + "</li>").join("") + "</ul></div>" +
            '<div><h4>Tools to master</h4><ul>' + (c.tools || []).map((s) => "<li>" + esc(s) + "</li>").join("") + "</ul></div>" +
            '<p class="career-goal">' + esc(c.goal || "") + "</p>" +
          "</div></div></div>" +
        "</div>"
      );
    }).join("");

    $$(".career-head", careers).forEach((head) => {
      const toggle = () => {
        const open = head.getAttribute("aria-expanded") === "true";
        const card = head.closest(".career-card");
        card.classList.toggle("open", !open);
        head.setAttribute("aria-expanded", String(!open));
      };
      head.addEventListener("click", toggle);
      head.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
      });
    });
  }

  /* ============ 14. BLOG ============ */
  const blogHue = (cat) => {
    const map = {
      Linux: "green", Networking: "blue", "Web Security": "cyan", "Ethical Hacking": "violet",
      Cybersecurity: "amber", "Defensive Security": "orange", Cloud: "cyan", Programming: "violet",
    };
    return hueColor(map[cat] || "green");
  };

  function renderBlog() {
    const grid = $("#blogGrid");
    if (!grid) return;
    grid.innerHTML = (DATA.blogPosts || []).map((post, i) => {
      const hue = blogHue(post.category);
      const codeLine = i % 2 === 0 ? "# note-" + String(i + 1).padStart(3, "0") : "~/notes/learn-" + String(i + 1) + ".md";
      return (
        '<article class="glass-card blog-card reveal" data-post="' + i + '" tabindex="0" role="button" aria-label="Read article: ' + esc(post.title) + '">' +
          '<div class="blog-cover" style="--c:' + hue + '"><span class="code-glyph" aria-hidden="true">' + esc(codeLine) + "</span></div>" +
          '<div class="blog-body">' +
            '<div class="blog-meta"><span class="blog-cat" style="color:' + hue + '">' + esc(post.category) + "</span>" +
              '<span>' + esc(post.date) + "</span><span aria-hidden='true'>·</span><span>" + esc(post.readTime || "5 min") + " read</span></div>" +
            "<h3>" + esc(post.title) + "</h3>" +
            '<p class="blog-desc">' + esc(post.desc) + "</p>" +
            '<span class="read-more">Read More ' + ICONS.arrowRight + "</span>" +
          "</div>" +
        "</article>"
      );
    }).join("");

    const open = (i) => {
      const post = (DATA.blogPosts || [])[i];
      if (!post) return;
      const blocks = (post.body || []).map((b) => {
        if (b.t === "h") return "<h4>" + esc(b.v) + "</h4>";
        if (b.t === "li") return "<li>" + esc(b.v) + "</li>";
        if (b.t === "ul") return "<ul>" + (b.v || []).map((x) => "<li>" + esc(x) + "</li>").join("") + "</ul>";
        return "<p>" + esc(b.v) + "</p>";
      }).join("");
      openModal(
        '<article class="article">' +
          '<div class="article-head">' +
            '<div class="blog-meta"><span class="blog-cat" style="color:' + blogHue(post.category) + '">' + esc(post.category) + "</span>" +
              "<span>" + esc(post.date) + "</span><span>" + esc(post.readTime || "5 min") + " read</span></div>" +
            "<h3>" + esc(post.title) + "</h3>" +
          "</div>" +
          '<div class="article-body">' + blocks + "</div>" +
        "</article>",
        true
      );
    };
    $$(".blog-card", grid).forEach((card) => {
      const i = Number(card.getAttribute("data-post"));
      card.addEventListener("click", () => open(i));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
    });
  }

  /* ============ 15. GITHUB SHOWCASE ============ */
  function renderGithub() {
    const profile = $("#ghProfile");
    const repos = $("#ghRepos");
    if (!profile || !repos) return;
    const gh = DATA.github || {};
    const user = CONFIG.githubUsername || "your-github-username";
    const extAttrs = 'target="_blank" rel="noopener noreferrer"';

    const langColor = { Python: "#3572A5", "Shell / Bash": "#89e051", "HTML / CSS": "#e34c26", JavaScript: "#f1e05a", Markdown: "#083fa1" };

    profile.innerHTML =
      '<div class="gh-head">' +
        '<div class="gh-avatar" aria-hidden="true">' + ICONS.github.replace('width="16" height="16"', 'width="26" height="26"') + "</div>" +
        "<div><h3>" + esc(user) + "</h3><a class='gh-handle' href='" + esc(CONFIG.githubUrl) + "' " + extAttrs + ">" + esc(CONFIG.githubUrl.replace(/^https?:\/\//, "")) + "</a></div>" +
      "</div>" +
      '<div class="gh-stats">' +
        '<div class="gh-stat"><strong data-count="' + (gh.repoCount || 0) + '">0</strong><span>Repositories</span></div>' +
        '<div class="gh-stat"><strong data-count="' + (gh.starsTotal || 0) + '">0</strong><span>Stars</span></div>' +
        '<div class="gh-stat"><strong data-count="' + (gh.followers || 0) + '">0</strong><span>Followers</span></div>' +
      "</div>" +
      '<div class="gh-langs">' + (gh.languages || []).map((l) => {
        const c = langColor[l.name] || "#8b949e";
        return '<div class="gh-lang-row"><div class="lang-top"><span>' + esc(l.name) + "</span><span>" + (l.pct || 0) + "%</span></div>" +
          '<div class="gh-lang-bar"><i data-pct="' + (l.pct || 0) + '" style="--lc:' + c + '"></i></div></div>';
      }).join("") + "</div>" +
      '<div class="gh-contrib"><h4>Contribution activity (sample)</h4>' + heatGrid(user) +
        '<p class="gh-heat-note">' + (gh.contributions || 0) + " contributions in the last 12 months · sample data — plug in the GitHub API when you are ready</p></div>" +
      '<div class="m-actions"><a class="btn btn-primary btn-sm" href="' + esc(CONFIG.githubUrl) + '" ' + extAttrs + ">" + ICONS.github + "View GitHub Profile</a></div>";

    repos.innerHTML = (gh.featuredRepos || []).map((r) => {
      const c = langColor[r.language] || "#8b949e";
      return (
        '<div class="glass-card gh-repo reveal">' +
          '<div class="gh-repo-top"><span class="icotile icotile-sm" style="--c:#5b8cff">' + esc((r.name || "R").slice(0, 2).toUpperCase()) + "</span>" +
            '<a class="gh-repo-name" href="' + esc(CONFIG.githubUrl) + "/" + esc(r.name) + '" ' + extAttrs + ">" + ICONS.github + esc(r.name) + "</a></div>" +
          '<p class="gh-repo-desc">' + esc(r.desc) + "</p>" +
          '<div class="gh-repo-meta">' +
            '<span><i class="lang-dot" style="background:' + c + '"></i>' + esc(r.language) + "</span>" +
            "<span>" + ICONS.star + " " + (r.stars || 0) + "</span>" +
            "<span>" + ICONS.fork + " " + (r.forks || 0) + "</span>" +
            '<a class="btn btn-sm btn-ghost" href="' + esc(CONFIG.githubUrl) + "/" + esc(r.name) + '" ' + extAttrs + ">Open " + ICONS.external + "</a>" +
          "</div>" +
        "</div>"
      );
    }).join("");
  }

  function heatGrid(seedStr) {
    /* deterministic pseudo-random so the sample grid is stable */
    let seed = 7;
    for (let i = 0; i < seedStr.length; i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
    const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    let cells = "";
    const weeks = 24;
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < 7; d++) {
        const r = rand();
        const cls = r < 0.52 ? "" : r < 0.68 ? " l1" : r < 0.8 ? " l2" : r < 0.9 ? " l3" : " l4";
        cells += "<i class='" + cls.trim() + "'></i>";
      }
    }
    return '<div class="gh-heat" role="img" aria-label="Sample GitHub contribution grid">' + cells + "</div>";
  }

  /* ============ 16. ACHIEVEMENTS ============ */
  function renderAchievements() {
    const grid = $("#achievementGrid");
    if (!grid) return;
    grid.innerHTML = (DATA.achievements || []).map((a, i) => {
      const hue = hueColor(HUE_LIST[i % HUE_LIST.length]);
      return (
        '<div class="glass-card ach-card reveal" data-delay="' + (i % 3) + '">' +
          '<div class="ach-top">' +
            '<span class="icotile icotile-lg" style="--c:' + hue + '" aria-hidden="true">' + esc(glyphOf(a.title, a.icon)) + "</span>" +
            "<h3>" + esc(a.title) + "</h3>" +
            '<span class="ach-when">' + esc(a.when || "") + "</span>" +
          "</div>" +
          '<span class="pill pill-green" style="width:max-content">' + esc(a.tag || "") + "</span>" +
          '<p class="ach-desc">' + esc(a.desc) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* ============ 17. RESUME ============ */
  function resumeData() {
    const E = DATA.education || {};
    const projects = (DATA.projects || []).slice(0, 3);
    const certs = (DATA.certificates || []).filter((c) => c.date && c.date !== "Planned").slice(0, 6);
    return {
      name: CONFIG.name,
      title: CONFIG.role,
      contact: [CONFIG.email, CONFIG.location, "github.com/" + CONFIG.githubUsername, CONFIG.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "")].filter(Boolean).join("  |  "),
      summary: DATA.resume.summary,
      sections: [
        {
          title: "Education",
          items: [
            { lead: E.degree + " — " + E.branch, org: E.university, note: (E.details || []).map((d) => d.label + ": " + d.value).join(" · ") },
          ],
        },
        { title: "Technical Skills", paras: [DATA.resume.keySkills] },
        { title: "Highlight Projects", bullets: projects.map((p) => p.title + " — " + p.short) },
        { title: "Certifications", bullets: certs.map((c) => c.title + " (" + c.org + ")") },
        { title: "Highlights", bullets: DATA.resume.highlightLines || [] },
        { title: "Labs & Platforms", paras: [(DATA.labProfiles || []).map((p) => p.platform).join(", ") + " — " + (DATA.labs || []).length + " labs tracked"] },
      ],
    };
  }

  function resumeDocHTML(rd) {
    const listIco = ICONS.check;
    const sections = rd.sections.map((s) => {
      let inner = "";
      if (s.items) {
        inner = s.items.map((it) =>
          '<div class="r-item"><span class="r-item-title">' + esc(it.lead) + '</span><div class="r-item-org">' + esc(it.org || "") + '</div><div class="r-item-note">' + esc(it.note || "") + "</div></div>"
        ).join("");
      }
      if (s.paras) inner = s.paras.map((p) => "<p>" + esc(p) + "</p>").join("");
      if (s.bullets) inner = "<ul>" + s.bullets.map((b) => "<li>" + esc(b) + "</li>").join("") + "</ul>";
      return '<div class="r-section"><h4>' + esc(s.title) + "</h4>" + inner + "</div>";
    }).join("");
    return (
      '<div class="resume-doc">' +
        '<div class="resume-head"><h3>' + esc(rd.name) + "</h3>" +
          '<div class="r-title">' + esc(rd.title) + "</div>" +
          '<div class="r-contact">' + esc(rd.contact) + "</div></div>" +
        '<div class="r-section"><h4>Summary</h4><p>' + esc(rd.summary) + "</p></div>" +
        sections +
      "</div>"
    );
  }

  function renderResume() {
    const prev = $("#resumePreview");
    if (!prev) return;
    const rd = resumeData();
    prev.innerHTML = resumeDocHTML(rd);

    const hint = $("#resumeHint");
    if (hint) {
      hint.textContent = CONFIG.resumePdfPath
        ? "Downloading " + CONFIG.resumePdfPath + " — replace that file to update your resume."
        : "A resume.pdf is generated from the data on this page when you click Download — add a file path in data.js (resumePdfPath) to use your own PDF instead.";
    }

    const downloadBtn = $("#resumeDownload");
    if (downloadBtn) downloadBtn.addEventListener("click", () => downloadResume());

    const viewBtn = $("#resumeView");
    viewBtn.addEventListener("click", () => {
      const inner = resumeDocHTML(resumeData());
      openModal(
        '<div class="cert-modal" style="text-align:left">' + inner +
          '<div class="m-actions"><button type="button" class="btn btn-primary btn-sm" id="resumePrint">' + ICONS.print + "Print / Save as PDF</button></div>" +
        "</div>",
        true
      );
      const printBtn = $("#resumePrint");
      if (printBtn) {
        printBtn.addEventListener("click", () => printResumeDoc(resumeData()));
      }
    });
  }

  function printResumeDoc(rd) {
    const html =
      "<!DOCTYPE html><html><head><meta charset='utf-8'><title>" + esc(rd.name) + " — Resume</title><style>" +
      "@page{size:A4;margin:16mm}body{font-family:Segoe UI,Arial,sans-serif;font-size:11.5px;color:#1c2321;line-height:1.5;max-width:170mm;margin:0 auto}h1{font-size:21px;margin:0 0 2px}hr{border:0;border-top:1px solid #0aa06e;margin:10px 0}.t{color:#0a7a55;font-weight:600;font-size:12px}.ct{font-family:Consolas,monospace;font-size:10px;color:#4b5b55;margin-top:4px}h2{font-family:Consolas,monospace;font-size:10px;letter-spacing:1.6px;text-transform:uppercase;color:#0a7a55;border-bottom:1px solid #d4e5de;padding-bottom:2px;margin:12px 0 6px}p{margin:0 0 6px}ul{margin:0 0 6px;padding-left:16px}li{margin-bottom:2px}.r-title{color:#0a7a55;font-weight:600}.org{color:#0a7a55;font-weight:600}.note{color:#4b5b55;font-size:10.5px}" +
      "</style></head><body>" + printableResumeHTML(rd) + "</body></html>";
    const frame = document.createElement("iframe");
    frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
    document.body.appendChild(frame);
    const doc = frame.contentDocument;
    doc.open();
    doc.write(html);
    doc.close();
    frame.contentWindow.onafterprint = () => { document.body.removeChild(frame); };
    setTimeout(() => { try { frame.contentWindow.print(); } catch (e) { document.body.removeChild(frame); } }, 250);
  }

  function printableResumeHTML(rd) {
    const sec = rd.sections.map((s) => {
      let inner = "";
      if (s.items) inner = s.items.map((it) => "<p><b>" + esc(it.lead) + "</b><br><span class='org'>" + esc(it.org || "") + "</span>" + (it.note ? "<br><span class='note'>" + esc(it.note) + "</span>" : "") + "</p>").join("");
      if (s.paras) inner = s.paras.map((p) => "<p>" + esc(p) + "</p>").join("");
      if (s.bullets) inner = "<ul>" + s.bullets.map((b) => "<li>" + esc(b) + "</li>").join("") + "</ul>";
      return "<h2>" + esc(s.title) + "</h2>" + inner;
    }).join("");
    return (
      "<h1>" + esc(rd.name) + "</h1>" +
      '<div class="r-title">' + esc(rd.title) + "</div>" +
      '<div class="ct">' + esc(rd.contact) + "</div>" +
      "<hr><h2>Summary</h2><p>" + esc(rd.summary) + "</p>" + sec
    );
  }

  /* ---- client-side PDF generation (no libraries, no network) ---- */
  const pdfAscii = (s) =>
    String(s)
      .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-").replace(/\u2022/g, "-").replace(/\u00B7/g, "-")
      .replace(/\u2192/g, ">").replace(/\u00A0/g, " ")
      .replace(/[\x00-\x1F]/g, " ").replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

  const pdfEscape = (s) => pdfAscii(s).replace(/[^\x20-\x7E]/g, " ");

  function pdfTextWidth(text, size) {
    let w = 0;
    for (const ch of text) {
      if (/[MW@%&]/.test(ch)) w += 0.86;
      else if (/[mwBDOQRCG]/.test(ch)) w += 0.74;
      else if (/[#AUVYXLKZHNIJ]/.test(ch)) w += 0.62;
      else w += 0.51;
    }
    return w * size;
  }

  function wrapPdfLine(text, size, maxWidth) {
    const words = String(text).split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? cur + " " + w : w;
      if (pdfTextWidth(test, size) <= maxWidth || !cur) cur = test;
      else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines;
  }

  function downloadResume() {
    try {
      if (CONFIG.resumePdfPath) {
        const a = document.createElement("a");
        a.href = CONFIG.resumePdfPath;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      }
      const bytes = buildResumePdf();
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = CONFIG.firstName + "-resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (err) {
      console.error("PDF generation failed:", err);
      const msg = $("#resumeHint");
      if (msg) msg.textContent = "Could not build the PDF automatically. Set resumePdfPath in data.js to link your own resume file.";
    }
  }

  function buildResumePdf() {
    const rd = resumeData();
    const pageW = 595.28, pageH = 841.89, margin = 48, maxW = pageW - margin * 2;
    const objs = [];
    const push = (o) => objs.push(o);

    /* build drawable plan */
    const plan = [];
    const content = [];
    let y = pageH - margin - 20;

    const fitSize = (text, size) => {
      while (size > 6 && wrapPdfLine(text, size, maxW).length > 1 && pdfTextWidth(text, size) > maxW * 1.05) size -= 0.25;
      return size;
    };

    plan.push({ text: rd.name, size: 19, font: "F2", gap: 2 });
    plan.push({ text: rd.title, size: 10.5, font: "F2", color: "0.18 0.55 0.42", gap: 4 });
    plan.push({ text: rd.contact, size: 8, font: "F1", color: "0.32 0.38 0.36", gap: 10, rule: true });
    plan.push({ text: rd.summary, size: 9.5, font: "F1", gap: 6 });
    rd.sections.forEach((s) => {
      plan.push({ text: s.title.toUpperCase(), size: 10, font: "F2", color: "0.06 0.62 0.45", gap: 5, rule: true, spaceBefore: 6 });
      if (s.items) {
        s.items.forEach((it) => {
          const lead = it.lead + (it.org ? "  —  " + it.org : "");
          plan.push({ text: lead, size: 9.5, font: "F2", gap: 1 });
          if (it.note) plan.push({ text: it.note, size: 9, font: "F1", color: "0.3 0.36 0.34", gap: 3 });
        });
      }
      if (s.paras) s.paras.forEach((p) => plan.push({ text: p, size: 9.5, font: "F1", gap: 3 }));
      if (s.bullets) s.bullets.forEach((b) => plan.push({ text: "-  " + b, size: 9.3, font: "F1", gap: 2.5 }));
    });

    /* lay out lines */
    const ops = [];
    const draw = (ln) => {
      const gap = (ln.gap || 0) * (9.5 / (ln.size || 9.5));
      const leading = (ln.size || 9.5) * 1.28 + gap;
      if (ln.spaceBefore) y -= ln.spaceBefore * 1.9;
      if (y < margin + 12) {
        /* realistically never reached with this compact content, but stay safe */
        y = pageH - margin - 14;
      }
      if (ln.rule) {
        const ry = y + 2.4;
        ops.push("0.16 0.55 0.42 rg");
        ops.push(margin.toFixed(2) + " " + ry.toFixed(2) + " " + maxW.toFixed(2) + " 0.7 re f");
      }
      if (ln.color) ops.push(ln.color + " rg");
      ops.push("BT");
      ops.push("/" + (ln.font || "F1") + " " + (ln.size || 9.5).toFixed(2) + " Tf");
      ops.push(margin.toFixed(2) + " " + y.toFixed(2) + " Td");
      ops.push("(" + pdfEscape(ln.text) + ") Tj");
      ops.push("ET");
      ops.push("0 0 0 rg");
      y -= leading;
    };

    /* flatten each plan entry into one or more wrapped lines */
    plan.forEach((entry) => {
      if (entry.text) {
        const size = fitSize(entry.text, entry.size);
        const lines = wrapPdfLine(entry.text, size, maxW);
        lines.forEach((lnText, i) => {
          if (i === 0 && entry.spaceBefore) {
            /* apply before first physical line of this entry */
          }
          draw({ text: lnText, size, font: entry.font, color: entry.color, gap: i === lines.length - 1 ? entry.gap : 0, rule: i === 0 ? entry.rule : false, spaceBefore: i === 0 ? entry.spaceBefore : 0 });
        });
      } else if (entry.rule) {
        draw(entry);
      }
    });

    /* assemble pdf objects */
    const stream = ops.join("\n") + "\n";
    const objects = [];
    objects[0] = null; // 1-based later
    objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
    objects[2] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
    objects[3] =
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 " + pageW.toFixed(2) + " " + pageH.toFixed(2) + "] " +
      "/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>";
    objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
    objects[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";
    objects[6] = "<< /Length " + stream.length + " >>\nstream\n" + stream + "endstream";

    /* byte offsets + xref */
    /* keep every byte ASCII so string offsets match file offsets */
    let out = "%PDF-1.4\n";
    const offsets = [];
    for (let i = 1; i < objects.length; i++) {
      offsets[i] = out.length;
      out += i + " 0 obj\n" + objects[i] + "\nendobj\n";
    }
    const xrefPos = out.length;
    out += "xref\n0 " + objects.length + "\n";
    out += "0000000000 65535 f \n";
    for (let i = 1; i < objects.length; i++) {
      out += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
    }
    out += "trailer\n<< /Size " + objects.length + " /Root 1 0 R >>\nstartxref\n" + xrefPos + "\n%%EOF";
    return out;
  }

  /* ============ 18. CONTACT FORM ============ */
  function renderContactInfo() {
    const list = $("#contactList");
    const note = $("#contactNote");
    if (!list) return;
    const emailItem =
      '<li><a class="contact-row" href="mailto:' + esc(CONFIG.email) + '" style="display:flex;align-items:center;gap:14px;color:inherit;text-decoration:none">' +
        '<span class="c-ico" style="--c:#00e18f">' + ICONS.mail + "</span>" +
        '<span><span class="c-label">Email</span><span class="c-value">' + esc(CONFIG.email) + "</span></span></a></li>";
    const gitItem =
      CONFIG.githubUrl
        ? '<li><a class="contact-row" href="' + esc(CONFIG.githubUrl) + '" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:14px;color:inherit;text-decoration:none">' +
          '<span class="c-ico" style="--c:#5b8cff">' + ICONS.github + "</span>" +
          '<span><span class="c-label">GitHub</span><span class="c-value">@' + esc(CONFIG.githubUsername) + "</span></span></a></li>" : "";
    const linItem =
      CONFIG.linkedinUrl
        ? '<li><a class="contact-row" href="' + esc(CONFIG.linkedinUrl) + '" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:center;gap:14px;color:inherit;text-decoration:none">' +
          '<span class="c-ico" style="--c:#2ad4ff">' + ICONS.linkedin + "</span>" +
          '<span><span class="c-label">LinkedIn</span><span class="c-value">' + esc(CONFIG.linkedinUrl.replace(/^https?:\/\/(www\.)?/, "")) + "</span></span></a></li>" : "";
    const locItem =
      CONFIG.location
        ? '<li style="display:flex;align-items:center;gap:14px;padding:13px 6px;border-bottom:1px dashed rgba(148,216,196,.1)">' +
          '<span class="c-ico" style="--c:#ffd166">' + ICONS.mapPin + "</span>" +
          '<span><span class="c-label">Location</span><span class="c-value">' + esc(CONFIG.location) + "</span></span></li>" : "";
    list.innerHTML = emailItem + gitItem + linItem + locItem;
    if (note) {
      note.textContent = CONFIG.availability + ". I reply fastest by email — usually within a day or two.";
    }
  }

  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    const status = $("#formStatus");
    const name = $("#cf-name"), email = $("#cf-email"), subject = $("#cf-subject"), message = $("#cf-message");
    const honeypot = $("#cf-website");
    const errMap = { name: $("#err-name"), email: $("#err-email"), subject: $("#err-subject"), message: $("#err-message") };

    const showErr = (field, msg) => {
      const fld = form.querySelector('[name="' + field + '"]');
      if (fld) fld.closest(".form-field").classList.add("has-error");
      const box = errMap[field];
      if (box) { box.textContent = msg; box.hidden = false; }
    };
    const clearErr = (field) => {
      const fld = form.querySelector('[name="' + field + '"]');
      const box = errMap[field];
      fld.closest(".form-field").classList.remove("has-error");
      if (box) { box.textContent = ""; box.hidden = true; }
    };
    const validators = {
      name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters)."),
      email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."),
      subject: (v) => (v.trim().length >= 3 ? "" : "Please add a short subject."),
      message: (v) => (v.trim().length >= 10 ? "" : "Your message should be at least 10 characters."),
    };
    const fields = [name, email, subject, message];

    fields.forEach((f) => {
      f.addEventListener("blur", () => {
        const err = validators[f.name](f.value);
        if (err) showErr(f.name, err); else clearErr(f.name);
      });
      f.addEventListener("input", () => clearErr(f.name));
    });

    const setStatus = (kind, text) => {
      status.className = "form-status " + kind;
      status.innerHTML = (kind === "ok" ? ICONS.check + " " : ICONS.alert + " ") + esc(text);
      status.hidden = false;
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstBad = null;
      let ok = true;
      fields.forEach((f) => {
        const err = validators[f.name](f.value);
        if (err) { showErr(f.name, err); ok = false; if (!firstBad) firstBad = f; }
      });
      if (!ok) { setStatus("err", "Please fix the highlighted fields and try again."); if (firstBad) firstBad.focus(); return; }
      /* honeypot — bots fill hidden field; silently accept so bots learn nothing */
      if (honeypot && honeypot.value.trim() !== "") {
        setStatus("ok", "Message received. Thank you!");
        form.reset();
        return;
      }
      const payload = {
        name: name.value.trim().slice(0, 120),
        email: email.value.trim().slice(0, 160),
        subject: subject.value.trim().slice(0, 180),
        message: message.value.trim().slice(0, 2000),
      };
      const sendBtn = $("#cf-send");
      sendBtn.disabled = true;
      const body =
        "Hi, my name is " + payload.name + " (" + payload.email + ").\n\n" + payload.message + "\n\n— sent from the CYBERSEC portfolio contact form";
      const mailto = "mailto:" + encodeURIComponent(CONFIG.email) + "?subject=" + encodeURIComponent(payload.subject) + "&body=" + encodeURIComponent(body.slice(0, 1800));

      /* No backend or keys in this repo: open the visitor's mail client
         with a pre-filled message. To POST to a service instead (e.g.
         Formspree), add a contactEndpoint URL in data.js and uncomment
         the fetch branch below. */
      setStatus("ok", "Opening your email app with the message pre-filled…");
      window.setTimeout(() => { window.location.href = mailto; }, 350);
      window.setTimeout(() => {
        form.reset();
        sendBtn.disabled = false;
        status.hidden = true;
      }, 6000);
    });
  }

  /* ============ 19. FOOTER ============ */
  function renderFooter() {
    const links = $("#footerLinks");
    const social = $("#footerSocial");
    if (links) {
      links.innerHTML = (DATA.footerLinks || []).map((l) =>
        '<li><a href="#' + esc(l.target) + '">' + esc(l.label) + "</a></li>"
      ).join("");
    }
    if (social) {
      let items = "";
      if (CONFIG.githubUrl) items += '<li><a href="' + esc(CONFIG.githubUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="GitHub">' + ICONS.github + "GitHub</a></li>";
      if (CONFIG.linkedinUrl) items += '<li><a href="' + esc(CONFIG.linkedinUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' + ICONS.linkedin + "LinkedIn</a></li>";
      social.innerHTML = items;
    }
    const set = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    const desc = $("#footerDesc");
    if (desc) desc.textContent = "A " + CONFIG.role.toLowerCase() + " — documenting the journey from student to security professional through labs, projects and notes.";
    set("footerLocation", CONFIG.location ? CONFIG.location : "");
    set("footerEmail", CONFIG.email);
    set("copyright", "\u00A9 " + new Date().getFullYear() + " " + CONFIG.name + ". All Rights Reserved.");
  }

  /* ============ 20. SHARED MODAL ============ */
  let lastModalFocus = null;
  const modalBox = $("#modalBox");
  const backdrop = $("#modalBackdrop");
  const modalCloseBtn = $("#modalClose");

  function openModal(html, wide) {
    if (!backdrop || !modalBox) return;
    lastModalFocus = document.activeElement;
    $("#modalContent").innerHTML = html;
    modalBox.classList.toggle("modal-wide", !!wide);
    backdrop.classList.add("open");
    backdrop.hidden = false;
    document.body.classList.add("modal-open");
    modalCloseBtn.focus();
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.classList.remove("open");
    document.body.classList.remove("modal-open");
    setTimeout(() => { backdrop.hidden = true; }, 300);
    if (lastModalFocus && lastModalFocus.focus) lastModalFocus.focus();
  }

  function initModal() {
    modalCloseBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && backdrop && !backdrop.hidden) closeModal();
      if (e.key === "Tab" && backdrop && !backdrop.hidden) {
        const focusables = backdrop.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    /* modal-internal "jump to project" links */
    document.addEventListener("click", (e) => {
      const go = e.target.closest("[data-go-project]");
      if (!go) return;
      const pid = go.getAttribute("data-go-project");
      const p = (DATA.projects || []).find((x) => x.id === pid);
      closeModal();
      if (p) {
        projectFilter = "All";
        const bar = $("#projectFilters");
        if (bar) bar.querySelectorAll(".chip").forEach((c) => c.setAttribute("data-active", c.getAttribute("data-filter") === "All" ? "true" : "false"));
        renderProjectGrid();
        const sec = document.getElementById("projects");
        if (sec) sec.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
      }
    });
  }

  /* ============ 21. MOTION ============ */
  const revealObserver = window.IntersectionObserver
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            animateBars(en.target);
            animateCounts(en.target);
            revealObserver.unobserve(en.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" })
    : null;

  function refreshReveal() {
    if (!window.IntersectionObserver) {
      $$(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    $$(".reveal:not(.in)").forEach((el) => revealObserver.observe(el));
  }

  function animateBars(root) {
    /* every progress bar is an <i data-pct=".."> element — animate its width */
    $$("i[data-pct]", root).forEach((el) => {
      const target = Number(el.getAttribute("data-pct")) || 0;
      el.style.width = reduceMotion.matches ? target + "%" : "0%";
      if (!reduceMotion.matches) {
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.width = target + "%"; }));
      }
    });
  }

  function animateCounts(root) {
    $$("[data-count]", root).forEach((el) => {
      const target = Number(el.getAttribute("data-count")) || 0;
      if (reduceMotion.matches) { el.textContent = target; return; }
      const dur = 1100;
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  function rippleFx() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const d = Math.max(rect.width, rect.height);
      const span = document.createElement("span");
      span.className = "ripple-ink";
      span.style.width = span.style.height = d + "px";
      span.style.left = e.clientX - rect.left - d / 2 + "px";
      span.style.top = e.clientY - rect.top - d / 2 + "px";
      btn.appendChild(span);
      setTimeout(() => span.remove(), 700);
    });
  }

  function backTopFx() {
    const btn = $("#backTop");
    if (!btn) return;
    const onScroll = () => {
      const show = (window.scrollY || 0) > 650;
      btn.classList.toggle("show", show);
      btn.hidden = !show;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion.matches ? "auto" : "smooth" }));
  }

  function cursorGlow() {
    if (reduceMotion.matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const glow = document.createElement("div");
    glow.style.cssText =
      "position:fixed;width:280px;height:280px;border-radius:50%;pointer-events:none;z-index:-1;" +
      "background:radial-gradient(circle, rgba(0,225,143,0.06), transparent 65%);transform:translate(-50%,-50%);left:0;top:0";
    document.body.appendChild(glow);
    let tx = window.innerWidth / 2, ty = window.innerHeight / 3, cx = tx, cy = ty, raf = null;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; if (!raf) loop(); }, { passive: true });
    const loop = () => {
      cx += (tx - cx) * 0.09;
      cy += (ty - cy) * 0.09;
      glow.style.transform = "translate(" + (cx - 140) + "px," + (cy - 140) + "px)";
      raf = null;
      if (Math.abs(tx - cx) > 1 || Math.abs(ty - cy) > 1) raf = requestAnimationFrame(loop);
    };
  }

  function particlesFx() {
    const canvas = $("#fx-canvas");
    if (!canvas) return;
    if (reduceMotion.matches) return;
    const ctx = canvas.getContext("2d");
    const colors = ["0,225,143", "42,212,255", "91,140,255"];
    let W, H, parts = [], raf = null, running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = W < 640 ? 26 : Math.min(70, Math.floor((W * H) / 28000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.6, c: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const frame = () => {
      if (!running) { raf = null; return; }
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
      }
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            const alpha = 0.07 * (1 - Math.sqrt(d2) / 110);
            ctx.strokeStyle = "rgba(120,220,190," + alpha.toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(" + a.c + ",0.55)";
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      running = !document.hidden;
      if (running && !raf) raf = requestAnimationFrame(frame);
    });
    raf = requestAnimationFrame(frame);
  }

  /* ============ INIT ============ */
  let revealTicking = false;
  function onScrollReveal() {
    if (revealTicking) return;
    revealTicking = true;
    requestAnimationFrame(() => { refreshReveal(); revealTicking = false; });
  }

  function init() {
    if (!DATA || !CONFIG) {
      document.body.innerHTML = "<p style='padding:40px;font-family:monospace'>Could not load site data (assets/js/data.js).</p>";
      return;
    }
    renderMeta();
    renderNav();
    navScrollFx();
    renderHero();
    typewriter();
    renderAbout();
    renderEducation();
    renderSkills();
    renderTools();
    renderProjectFilters();
    renderProjectGrid();
    renderLabs();
    renderCertFilters();
    renderCertGrid();
    renderLearning();
    renderRoadmap();
    renderBlog();
    renderGithub();
    renderAchievements();
    renderResume();
    renderContactInfo();
    initContactForm();
    renderFooter();
    initModal();
    scrollSpy();
    rippleFx();
    backTopFx();
    cursorGlow();
    particlesFx();
    bootLoader();
    refreshReveal();
    window.addEventListener("scroll", onScrollReveal, { passive: true });
    window.addEventListener("load", refreshReveal);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
