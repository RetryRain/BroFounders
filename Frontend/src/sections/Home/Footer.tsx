import "material-symbols/rounded.css";

export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-300 mx-auto px-6 py-14 sm:py-20 flex flex-col gap-12 sm:gap-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-12 text-center md:text-left">
          {/* Project Identity */}
          <div className="flex flex-col gap-4 sm:gap-6 max-w-md mx-auto md:mx-0">
            <h2 className="text-white text-xl sm:text-2xl font-black tracking-tighter">
              BuildTogether
            </h2>

            <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed">
              A collaborative space where developers build real-world projects,
              master new stacks, and grow through execution — not tutorials.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center md:items-start">
            <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
              Explore
            </h4>

            <div className="flex flex-col gap-3 sm:gap-4 text-foreground/70 text-xs sm:text-sm font-bold">
              <a href="#" className="hover:text-white transition-colors">
                Projects
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Workflow
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Community
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center md:items-start">
            <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
              Connect
            </h4>

            <div className="flex gap-6 text-foreground/70">
              <a href="#" className="hover:text-white transition-colors">
                <span className="material-symbols-rounded text-xl">code</span>
              </a>

              <a href="#" className="hover:text-white transition-colors">
                <span className="material-symbols-rounded text-xl">
                  alternate_email
                </span>
              </a>

              <a href="#" className="hover:text-white transition-colors">
                <span className="material-symbols-rounded text-xl">chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-foreground/60 text-center">
          <p>© {new Date().getFullYear()} BuildTogether</p>
          <p>Built by developers. For developers.</p>
        </div>
      </div>
    </footer>
  );
}
