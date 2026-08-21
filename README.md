# Winter Portfolio

A snow-themed personal portfolio built with Vite, React, and Tailwind CSS.

## Features

- Transparent, icon-only navbar — a spinning snowflake logo, plus **About**
  and **Resume** links
- Custom snow cursor across the whole site, glowing on every click
- Hero section with a two-line intro and an oval profile portrait that
  glows and drips snow off the bottom rim on hover
- **About** section with background, education, and a link to Projects
- Full-page falling snow — click/tap anywhere to burst nearby flakes
- **Projects** section as frosted-glass cards; each opens its GitHub repo
  in a new tab
- **Contact** section — a snow-styled card with Name / Contact details /
  Message, opens the visitor's email client pre-filled on submit
- A hover-to-growl polar bear before the footer (synthesized sound, no
  audio file needed)
- Footer buried in a snow drift with 4 glowing snowballs — first click
  melts the snowball to reveal the brand icon, second click opens the link

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Personalize before you deploy

- `src/components/Hero.jsx` — your name and two intro lines
- `public/profile.jpg` — your photo (falls back to initials if missing)
- `src/components/Navbar.jsx` — `RESUME_URL`, your Google Drive resume link
- `src/data/projects.js` — your real projects, each `link` pointing to its
  GitHub repo
- `src/components/Contact.jsx` — the `mailto:` address the form sends to
- `src/components/Footer.jsx` — the `SOCIALS` array with your real
  YouTube, Facebook, LinkedIn, and GitHub URLs
- `src/components/About.jsx` — your background and education
- `index.html` — the `<title>` and meta description

## Notes

- The custom cursor and snowfall both respect `prefers-reduced-motion`.
- The custom cursor only replaces the default on mouse/trackpad devices —
  touch devices keep native behavior.
- The polar bear's growl uses the Web Audio API, so browsers require one
  click/tap anywhere on the page before it can play (standard autoplay
  policy) — after that, hovering the bear works freely.
- Snow density scales with viewport size automatically.
- Colors, fonts, and custom keyframes live in `tailwind.config.js`.
