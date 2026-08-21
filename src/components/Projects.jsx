import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import projects from '../data/projects.js'

function SnowCap() {
  // Decorative drift of snow resting along the top edge of a card.
  return (
    <svg
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      className="absolute -top-[1px] left-0 h-4 w-full text-white/90"
      aria-hidden="true"
    >
      <path
        d="M0,14 Q10,2 22,12 T46,10 T70,14 T96,8 T122,13 T148,9 T174,14 T200,10 L200,0 L0,0 Z"
        fill="currentColor"
        opacity="0.12"
      />
    </svg>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${index * 90}ms` }}
      className="reveal group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 hover:border-ice/30 hover:bg-white/[0.06] transition-colors"
    >
      <SnowCap />

      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-ice/70">{project.id}</span>
        <ArrowUpRight
          size={18}
          className="text-mute group-hover:text-ice group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold text-snowlight">
        {project.title}
      </h3>
      <p className="mt-2 font-body text-sm text-mute leading-relaxed">
        {project.description}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-ice/80"
          >
            {tag}
          </li>
        ))}
      </ul>
    </a>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs tracking-[0.3em] text-ice/80 uppercase">
          Selected work
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-snowlight">
          Projects, laid out like fresh snow
        </h2>
        <p className="mt-3 max-w-xl font-body text-mute">
          A few things I've built recently. Each card is dusted with the same snow
          that's falling across the page.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
