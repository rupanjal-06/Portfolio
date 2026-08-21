import { Snowflake, FileText } from 'lucide-react'
const RESUME_URL =
  "https://drive.google.com/file/d/1hLiIm3Axj0zaqRR2-iHCUkbg7C1DBkyP/view?usp=sharing";

export default function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-auto max-w-5xl mt-4 px-5">
        <div className="flex items-center justify-between py-3 pl-5 pr-2">
          <a
            href="#hero"
            aria-label="Back to top"
            className="group flex items-center justify-center rounded-full p-1"
          >
            <Snowflake
              size={26}
              className="text-ice transition-transform duration-500 group-hover:rotate-90"
            />
          </a>

          <div className="flex items-center gap-1">
            <a
              href="#about"
              className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm text-mute hover:text-snowlight hover:bg-white/5 transition-colors"
            >
              <Snowflake size={14} className="text-ice/70 group-hover:scale-110 transition-transform" />
              <span className="font-body">About</span>
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm text-mute hover:text-snowlight hover:bg-white/5 transition-colors"
            >
              <FileText size={14} className="text-ice/70 group-hover:scale-110 transition-transform" />
              <span className="font-body">Resume</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
