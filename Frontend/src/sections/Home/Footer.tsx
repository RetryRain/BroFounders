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
              BroFounders
            </h2>

            <p className="text-foreground/80 text-xs sm:text-sm leading-relaxed">
              BroFounders is a community where imperfect builders collaborate on
              real projects, learn new stacks, and grow together through
              execution. No gatekeeping. No interviews. Just people building.
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
                <span className="material-symbols-rounded text-xl">mail</span>
              </a>

              <a href="#" className="hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M9.04 15.35l-.39 5.47c.56 0 .8-.24 1.09-.52l2.62-2.5 5.43 3.98c.99.55 1.7.26 1.96-.92l3.56-16.64.01-.01c.31-1.45-.52-2.02-1.48-1.66L1.59 9.36c-1.38.55-1.36 1.32-.23 1.67l5.52 1.72L19.7 5.32c.6-.39 1.15-.17.7.22" />
                </svg>
              </a>

              <a href="#" className="hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 127.14 96.36"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M107.7 8.07A105.15 105.15 0 0081.47 0a72.06 72.06 0 00-3.36 6.92A97.68 97.68 0 0049 6.92 72.37 72.37 0 0045.64 0a105.89 105.89 0 00-26.25 8.07C2.79 32.65-2.13 56.6.33 80.21a105.73 105.73 0 0032.17 16.15 77.7 77.7 0 006.84-11.13 68.42 68.42 0 01-10.78-5.16c.91-.67 1.8-1.36 2.66-2.08a75.57 75.57 0 0064.32 0c.87.72 1.76 1.41 2.66 2.08a68.68 68.68 0 01-10.79 5.16 77.2 77.2 0 006.84 11.13A105.25 105.25 0 00126.8 80.2c3.14-27.49-5.33-51.19-19.1-72.13zM42.45 65.69c-6.27 0-11.42-5.78-11.42-12.9s5.04-12.9 11.42-12.9c6.41 0 11.52 5.81 11.42 12.9 0 7.12-5.04 12.9-11.42 12.9zm42.24 0c-6.27 0-11.42-5.78-11.42-12.9s5.04-12.9 11.42-12.9c6.41 0 11.52 5.81 11.42 12.9 0 7.12-5.01 12.9-11.42 12.9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-foreground/60 text-center">
          <p>© {new Date().getFullYear()} BroFounders</p>
          <p>Made by a Builder. For Builders.</p>
        </div>
      </div>
    </footer>
  );
}
