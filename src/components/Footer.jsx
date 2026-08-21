import { useState } from 'react'
import { Youtube, Facebook, Linkedin, Github, Snowflake } from 'lucide-react'

const SOCIALS = [
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/",
    Icon: Youtube,
    color: "#FF4D4D",
  },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100081220335415",
    Icon: Facebook,
    color: "#5B9CFF",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rupanjal-borphukan-97872a229/",
    Icon: Linkedin,
    color: "#5FC9E8",
  },
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/rupanjal-06",
    Icon: Github,
    color: "#E8F6FF",
  },
];

function SnowLight({ social }) {
  const [revealed, setRevealed] = useState(false)
  const { label, href, Icon, color } = social

  // First click melts the snowball to reveal the brand icon.
  // Second click (on the now-revealed icon) opens the link.
  function handleClick() {
    if (!revealed) {
      setRevealed(true)
      return
    }
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        aria-expanded={revealed}
        aria-label={revealed ? `Open ${label}` : `Reveal ${label} icon`}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-white/90 animate-glowPulse transition-transform hover:scale-105"
      >
        <Snowflake
          size={20}
          className={`text-midnight transition-opacity duration-200 ${revealed ? 'opacity-0' : 'opacity-100'}`}
        />
        <span
          className={`absolute inset-0 grid place-items-center rounded-full bg-frost transition-all duration-200 ${
            revealed ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
          }`}
        >
          <Icon size={22} style={{ color }} />
        </span>
      </button>

      <span
        className={`font-mono text-[11px] tracking-widest uppercase transition-all ${
          revealed ? 'text-ice opacity-100' : 'text-mute opacity-0'
        }`}
      >
        {revealed ? `${label}` : ''}
      </span>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative z-10 mt-4">
      {/* snow drift mound covering the footer */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full text-frost"
        aria-hidden="true"
      >
        <path
          d="M0,64 C180,110 320,10 480,48 C640,86 720,20 900,50 C1080,80 1220,20 1440,60 L1440,120 L0,120 Z"
          fill="currentColor"
        />
        <path
          d="M0,80 C200,120 340,40 520,66 C700,92 820,40 980,68 C1140,96 1300,44 1440,78 L1440,120 L0,120 Z"
          fill="#0B1622"
        />
      </svg>

      <div className="bg-frost px-6 pb-14 pt-2">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-ice/70 uppercase mb-10">
            Find me around the web
          </p>

          <div className="flex flex-wrap items-start justify-center gap-10">
            {SOCIALS.map((social) => (
              <SnowLight key={social.key} social={social} />
            ))}
          </div>

          <p className="mt-16 font-body text-xs text-mute/70">
            © {new Date().getFullYear()} Rupanjal Borphukan . Portfolio 
          </p>
        </div>
      </div>
    </footer>
  )
}
