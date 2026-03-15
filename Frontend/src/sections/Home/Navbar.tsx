import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import logowithname from "@/assets/900pxBroFounders.svg";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/20 px-6 md:px-20 py-4 bg-background/90 backdrop-blur-xl z-50">
      {/* LEFT */}
      <div className="flex items-center gap-4 md:gap-8 lg:gap-10">
        <img
          src={logowithname}
          className="h-10 md:h-12 lg:h-15 w-auto rounded-2xl cursor-pointer"
        />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <a className="cursor-pointer text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
            EXPLORE
          </a>

          <a className="cursor-pointer text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
            HOW IT WORKS
          </a>

          <a className="cursor-pointer text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
            COMMUNITY
          </a>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 justify-end gap-4 items-center">
        {/* Feedback Button */}
        <button className="hidden md:flex h-10 px-5 items-center justify-center rounded-full bg-white/10 text-white text-sm font-bold transition-all hover:bg-white/20 active:scale-95 cursor-pointer">
          FEEDBACK!
        </button>

        {/* Desktop Button */}
        <Link to={"/projects"}>
          <div className="hidden sm:flex gap-3">
            <button className="flex h-10 px-6 items-center justify-center rounded-full bg-white text-background text-sm font-black transition-all hover:bg-primary hover:text-white active:scale-95 cursor-pointer">
              GET STARTED
            </button>
          </div>
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden text-white cursor-pointer">
              <span className="material-symbols-rounded text-[26px]">menu</span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-background border-white/20 text-white"
          >
            <div className="flex flex-col gap-6 mt-20 text-center">
              <a className="cursor-pointer text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
                EXPLORE
              </a>

              <a className="cursor-pointer text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
                HOW IT WORKS
              </a>

              <a className="cursor-pointer text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
                COMMUNITY
              </a>

              <button className="cursor-pointer mt-4 flex h-10 px-6 items-center justify-center rounded-full bg-white/10 text-white text-sm font-bold transition-all hover:bg-white/20 active:scale-95">
                FEEDBACK
              </button>

              <button className="cursor-pointer mt-2 mx-3 flex h-10 px-6 items-center justify-center rounded-full bg-white text-background text-sm font-black transition-all hover:bg-secondary active:scale-95">
                GET STARTED
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
