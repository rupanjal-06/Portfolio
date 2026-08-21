import profileImg from "../imgh.jpg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
    >
      {/* eyebrow label */}
      <p className="mb-6 font-mono text-s tracking-[0.3em] text-ice/80 uppercase">
        Welcome, it's snowing
      </p>

      {/* oval profile portrait */}
      <div className="group relative mb-8">
        <div
          className="absolute -inset-4 rounded-[50%] bg-ice/10 blur-2xl transition-all duration-500 group-hover:-inset-7 group-hover:bg-ice/30 group-hover:blur-[42px]"
          aria-hidden="true"
        />
        <div className="relative h-52 w-40 md:h-64 md:w-48 overflow-hidden rounded-[50%] border-4 border-ice/30 shadow-[0_0_50px_rgba(159,216,234,0.35)] bg-frost transition-shadow duration-500 group-hover:shadow-[0_0_85px_rgba(159,216,234,0.6)]">
          <img
            src={profileImg}
            alt="Rupanjal Borphukan"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
          {/* <div
            className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-frost to-midnight font-display text-4xl text-ice"
          >
            YN
          </div> */}
        </div>

        {/* snow drops off the bottom rim on hover */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10"
          aria-hidden="true"
        >
          {[18, 34, 50, 66, 82].map((left, i) => (
            <span
              key={left}
              className="drip-flake"
              style={{ left: `${left}%`, animationDelay: `${i * 0.28}s` }}
            />
          ))}
        </div>
      </div>

      {/* two-line introduction */}
      <h1 className="font-display text-3xl md:text-4xl font-mono text-snowlight max-w-2xl leading-tight">
        Hi, meet your Mechanical Design enthusiast — I turn ideas into designs
        as clean as fresh snow.
      </h1>
      <p className="mt-4 font-body text-base md:text-lg text-mute max-w-xl">
        A Mechanical Engineer who turns bold ideas into precise, practical
        designs.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-full bg-ice/90 px-6 py-3 font-body text-sm font-medium text-midnight hover:bg-ice transition-colors"
        >
          See my work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/15 px-6 py-3 font-body text-sm font-medium text-snowlight hover:bg-white/5 transition-colors"
        >
          Get in touch
        </a>
      </div>

      {/* <p className="mt-16 font-mono text-[11px] tracking-widest text-mute/70 uppercase">
        tap a snowflake ✦
      </p> */}
      <p className="mt-16 font-mono text-[11px] tracking-widest uppercase text-white animate-pulse drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] [text-shadow:0_0_5px_#fff,0_0_12px_#bae6fd,0_0_22px_#7dd3fc]">
        tap a snowflake ✦
      </p>
    </section>
  );
}
