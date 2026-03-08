import "material-symbols/rounded.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="max-w-300 w-full px-6 sm:px-8 md:px-10 py-10 sm:py-12 md:py-16 mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div className="flex flex-col gap-6 sm:gap-8 lg:w-3/5">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary text-background px-3 sm:px-4 py-1.5 rounded-full w-fit border border-white/40 shadow-xl shadow-primary/20">
            <span className="material-symbols-rounded text-sm sm:text-base">
              rocket_launch
            </span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">
              Join 5,000+ Builders
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
            CODE <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-secondary to-white">
              WITHOUT LIMITS.
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-foreground text-base sm:text-xl md:text-2xl max-w-xl leading-relaxed font-normal">
            Master any stack.{" "}
            <span className="text-white font-bold underline decoration-accent decoration-2 underline-offset-4">
              Build real projects
            </span>{" "}
            with the world's most ambitious developers.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mt-2 sm:mt-4">
            <Link to="/projects">
              <button className="group flex h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 items-center justify-center rounded-full bg-primary text-white text-sm sm:text-lg md:text-xl font-black shadow-2xl shadow-primary/50 hover:-translate-y-0.5 transition-all border border-white/20 cursor-pointer">
                FIND PROJECTS
                <span className="material-symbols-rounded ml-2 text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </button>
            </Link>

            <Link to="/projects">
              <button className="flex h-12 sm:h-14 md:h-16 px-6 sm:px-8 md:px-10 items-center justify-center rounded-full bg-white/10 text-white text-sm sm:text-lg md:text-xl font-black border-2 border-white/40 hover:bg-white/20 transition-all backdrop-blur-sm cursor-pointer">
                HOST A SQUAD
                <span className="material-symbols-rounded ml-2 text-base group-hover:translate-x-1 transition-transform">
                  edit
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block lg:w-2/5 relative">
          {/* Glow blob */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/30 blur-[100px] rounded-full"></div>

          <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden border-2 border-white/20 bg-white/10 backdrop-blur-3xl p-8 flex items-center justify-center group cursor-pointer shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>

            <div className="z-10 flex flex-col items-center gap-4">
              <span
                className="material-symbols-rounded text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-transform duration-500 group-hover:scale-110"
                style={{ fontSize: 320 }}
              >
                terminal
              </span>

              <div className="px-6 py-3 bg-background rounded-xl border border-white/30 text-xs sm:text-sm font-mono text-green-500 font-bold">
                git checkout -b feature/world-class
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
