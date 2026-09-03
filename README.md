# `>_ CYBERSEC` — Cybersecurity Student Portfolio

A modern, professional, fully responsive portfolio for a B.Tech Cybersecurity
student — built with plain **HTML5 + CSS3 + JavaScript** (no frameworks, no
build step, no external requests). Open `index.html` in any browser or host it
on any static server / GitHub Pages.

**Design:** dark glassmorphism dashboard aesthetic · green/cyan/blue accents ·
subtle particles + grid + terminal animations · accessibility & reduced-motion
support · everything driven by one editable data file.

---

## 1. Make it yours (5-minute setup)

All personal content lives in **`assets/js/data.js`** — one file, fully
commented, zero HTML knowledge required.

| What | Where in `data.js` |
| --- | --- |
| Name, role, headline, email, location | `config` |
| GitHub / LinkedIn / TryHackMe / HTB links | `config` (link fields) |
| Profile photo | `config.profileImage` → add `assets/img/profile.jpg` (or keep `""` for the auto monogram) |
| Hero typing phrases | `typing` |
| About intro / goals / philosophy / journey timeline | `about` |
| Degree, university, subjects, education timeline | `education` |
| Skill groups & honest progress bars | `skillGroups` |
| Tools & "what I learned" info cards | `toolGroups` |
| Project cards & categories | `projects` |
| Labs on TryHackMe / HTB / personal / CTF | `labs`, `labProfiles` |
| Certificates + filters | `certificates` |
| Learning dashboard topics | `learningTopics` |
| Career roadmap stages & 3 career paths | `roadmapStages`, `careers` |
| Blog / security notes (10 articles) | `blogPosts` |
| GitHub showcase stats & repos | `github` (stats) + `config` (username) |
| Achievements | `achievements` |
| Resume summary / highlights | `resume` |
| Footer / nav labels | `nav`, `footerLinks` |

> Keep levels honest: the site intentionally shows `Beginner`/`Intermediate`
> bars and says so — change `level` and `pct` only as your skills actually grow.

### Links you must replace before sharing
Every placeholder URL is centralised in `config`
(`githubUrl`, `linkedinUrl`, `tryhackmeUrl`, …) and in the `url` fields of
`labProfiles` / tool entries. Search for `your-` inside `data.js` to find all
of them at once.

---

## 2. Preview locally

Open `index.html` directly in a browser, or run a tiny static server
(no Node needed):

```bash
# any python 3
python3 -m http.server 8000

# or the bundled zero-dependency Perl server (Git Bash / macOS / Linux)
perl tools/serve.pl 8899
```

then open http://localhost:8000 (or :8899).

## 3. Resume: download & view

- **View Resume** opens the resume in a modal with **Print / Save as PDF**.
- **Download Resume** generates a **real `.pdf` in the browser** from your
  `data.js` content — nothing to maintain separately.
- To use your *own* PDF instead, drop the file in the project and set
  `config.resumePdfPath` (e.g. `"assets/img/resume.pdf"`); the Download button
  will then serve that file.

## 4. Contact form behaviour

The form validates input and — since this repo intentionally contains **no
backend and no API keys** — opens the visitor's mail client with a pre-filled
message on submit (with a honeypot field and full client-side validation).

To receive submissions through a service instead:

1. Create a free [Formspree](https://formspree.io) form (or EmailJS project).
2. Add the endpoint in `config` (e.g. `contactEndpoint: "https://formspree.io/f/xxxx"`).
3. In `assets/js/main.js` → `initContactForm()`, replace the `mailto` block
   with the small `fetch` branch (commented right above it).

Never commit real API keys — use Formspree-style endpoints that are safe to
expose.

---

## 5. Project structure

```
index.html            semantic page skeleton (all sections + meta)
assets/
  css/style.css       design system: tokens, layout, animations, responsive
  js/data.js          ★ CENTRAL DATA — edit this
  js/main.js          rendering + behaviour (nav, filters, modals, form, fx)
  img/favicon.svg     browser favicon
  img/og-cover.svg    social share image
  img/…               optional: profile.jpg, project screenshots
```

No inline `<style>` or `<script>` blocks in the markup; dynamic markup is
built with escaped text only (no `innerHTML` from user input), a
Content-Security-Policy meta is present, and nothing in the repo is a secret.

## 6. Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3…).
Always serve over **HTTPS**.

Add these security headers at your host/CDN if possible:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

The site makes **no third-party requests** — no fonts, no trackers, no APIs —
so it loads fast and stays private.

## 7. Tips

- Project / certificate "images" are decorative placeholders by design; add
  real screenshots to `assets/img/` and set the `image` field when you have
  them.
- Respect the owners of any platform/lab names you display once you add real
  entries — and only claim work you actually completed.
- Content updates are pure data edits — you never need to touch markup or CSS.
