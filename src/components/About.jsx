export default function About() {
  return (
    <section id="about" className="relative z-10 px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs tracking-[0.3em] text-ice/80 uppercase">
          About
        </p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-snowlight">
          A little about me
        </h2>
        <p className="mt-6 font-body text-mute leading-relaxed">
          I'm Rupanjal Borphukan, a Mechanical Engineering student at NIT
          Silchar passionate about mechanical design, CAD, robotics, and
          automation. I enjoy building practical solutions and turning
          engineering ideas into detailed designs.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-semibold text-snowlight">
              Background
            </h3>
            <p className="mt-3 font-body text-sm text-mute leading-relaxed">
              My background combines mechanical engineering fundamentals with
              hands-on CAD and design experience. I work with SolidWorks,
              AutoCAD, FEA, and Ansys Workbench, and I enjoy challenging myself
              through technical projects and competitions.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-snowlight">
              Education
            </h3>
            <p className="mt-3 font-body text-sm text-mute leading-relaxed">
              <span className="text-snowlight">
                B.Tech, Mechanical Engineering
              </span>
              <br />
              NIT Silchar, 2025 – 2029
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-display text-lg font-semibold text-snowlight">
            Projects
          </h3>
          <p className="mt-3 font-body text-sm text-mute leading-relaxed">
            A few things I've shipped recently — take a look!
          </p>
          <a
            href="#projects"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 font-body text-sm text-snowlight hover:bg-white/5 transition-colors"
          >
            View projects
          </a>
        </div>
      </div>
    </section>
  );
}
