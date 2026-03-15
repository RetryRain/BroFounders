import "material-symbols/rounded.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative max-w-6xl w-full px-6 sm:px-12 py-20 mx-auto flex flex-col items-center text-center gap-0">
      {/* ── Ambient glows ── */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-175 h-175 bg-accent/25 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-75 h-75 bg-secondary/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-75 h-75 bg-primary/20 blur-[140px] rounded-full pointer-events-none" />

      {/* ── Main heading ── */}
      <h1
        className="text-white font-black leading-[0.88] tracking-tighter max-w-5xl mb-10"
        style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
      >
        YOU DON'T
        <br />
        HAVE TO
        <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-secondary to-white">
          FEEL READY.
        </span>
      </h1>
      <p className="text-white/60 text-xs font-medium tracking-wide translate-x-30 md:translate-x-60 mb-5">
        - cuz you are!
      </p>
      {/* ── Thin rule ── */}
      <div className="w-16 h-px bg-linear-to-r from-transparent via-white/30 to-transparent mb-10" />

      {/* ── Body copy ── */}
      <p className="text-white/55 text-lg sm:text-xl md:text-2xl max-w-2xl leading-[1.75] mb-6">
        BroFounders connects developers, marketers, designers, and builders who
        aren't "elite" yet — but are{" "}
        <em className="text-white/80 not-italic">capable and hungry.</em>
      </p>
      <p className="text-white font-semibold text-lg sm:text-xl md:text-2xl max-w-2xl leading-[1.75] decoration-accent decoration-2 underline-offset-4 mb-6">
        Find teammates at your level, experiment with new stacks, and build
        projects together.
      </p>

      {/* ── CTA Buttons ── */}
      <div className="flex flex-col sm:flex-row gap-5 mt-5">
        <Link to="/projects">
          <button className="group flex h-14 sm:h-16 px-10 sm:px-14 items-center justify-center gap-3 rounded-full bg-primary text-white text-base sm:text-lg font-black tracking-wide shadow-2xl shadow-primary/40 hover:-translate-y-1 hover:shadow-primary/60 transition-all duration-200 border border-white/10">
            FIND BUILDERS
            <span className="material-symbols-rounded text-lg group-hover:translate-x-1 transition-transform duration-200">
              arrow_forward
            </span>
          </button>
        </Link>

        <Link to="/projects">
          <button className="flex h-14 sm:h-16 px-10 sm:px-14 items-center justify-center gap-3 rounded-full bg-white/6 text-white text-base sm:text-lg font-black tracking-wide border border-white/20 hover:bg-white/12 hover:-translate-y-1 transition-all duration-200 backdrop-blur-sm">
            START A PROJECT
            <span className="material-symbols-rounded text-lg">edit</span>
          </button>
        </Link>
      </div>

      {/* ── Social proof row ── */}
      <div className="flex items-center gap-6 mt-12 text-white/35 text-sm">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-rounded text-base text-accent/70">
            verified
          </span>
          Free forever
        </span>
        <span className="w-px h-4 bg-white/15" />
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-rounded text-base text-accent/70">
            groups
          </span>
          Collaborate
        </span>
        <span className="w-px h-4 bg-white/15" />
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-rounded text-base text-accent/70">
            bolt
          </span>
          Try new things
        </span>
      </div>
    </section>
  );
}
