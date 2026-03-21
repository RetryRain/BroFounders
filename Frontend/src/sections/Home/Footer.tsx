import "material-symbols/rounded.css";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="w-full mt-20 border-t border-white/10 bg-black/40 backdrop-blur-xl"
    >
      <div className="max-w-300 mx-auto px-6 py-14 sm:py-20 flex flex-col gap-12 sm:gap-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-12 text-center md:text-left">
          {/* Project Identity */}
          <div className="flex flex-col gap-4 sm:gap-6 max-w-md mx-auto md:mx-0">
            <h2 className="text-white text-xl sm:text-2xl font-black tracking-tighter">
              BroFounders
            </h2>

            <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed">
              BroFounders is where people who aren't “ready” build anyway. No
              gatekeeping. No interviews. Just people showing up and creating
              real things together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center md:items-start">
            <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
              Explore
            </h4>

            <div className="flex flex-col gap-3 sm:gap-4 text-foreground/70 text-xs sm:text-sm font-bold">
              <a
                href="#featured"
                className="hover:text-white transition-colors"
              >
                Projects
              </a>
              <a
                href="#workflow"
                className="hover:text-white transition-colors"
              >
                Workflow
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ's
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4 sm:gap-6 items-center md:items-start">
            <h4 className="text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em]">
              Connect
            </h4>

            <div className="flex gap-6 text-foreground/70">
              <a
                href="mailto:hello@brofounders.com?body=Hey%20Bro,"
                className="hover:text-white transition-colors"
              >
                <span className="material-symbols-rounded text-xl">mail</span>
              </a>

              <a
                href="https://t.me/brofounders"
                className="hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M9.04 15.35l-.39 5.47c.56 0 .8-.24 1.09-.52l2.62-2.5 5.43 3.98c.99.55 1.7.26 1.96-.92l3.56-16.64.01-.01c.31-1.45-.52-2.02-1.48-1.66L1.59 9.36c-1.38.55-1.36 1.32-.23 1.67l5.52 1.72L19.7 5.32c.6-.39 1.15-.17.7.22" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-foreground/60 text-center">
          <p>© {new Date().getFullYear()} BroFounders</p>
          <p>For people who stopped waiting and started building.</p>
        </div>
      </div>
    </footer>
  );
}
