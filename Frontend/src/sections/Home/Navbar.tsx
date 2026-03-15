import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import logowithname from "@/assets/900pxBroFounders.svg";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/20 px-6 md:px-20 py-4 bg-background/90 backdrop-blur-xl z-50">
      {/* LEFT */}
      <div className="flex items-center gap-10">
        <img src={logowithname} className="w-auto h-15 rounded-2xl" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <a className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
            EXPLORE
          </a>

          <a className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
            HOW IT WORKS
          </a>

          <a className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
            COMMUNITY
          </a>
        </nav>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 justify-end gap-4 items-center">
        {/* Search (desktop only) */}
        <div className="hidden md:flex min-w-40 max-w-64 h-10">
          <div className="flex w-full h-full items-center rounded-xl bg-white/10 overflow-hidden">
            <div className="flex items-center justify-center px-3 text-foreground/60 cursor-pointer">
              <span className="material-symbols-rounded text-[18px]">
                search
              </span>
            </div>

            <Input
              placeholder="Search stacks..."
              className="h-full flex-1 bg-transparent dark:bg-transparent border-none shadow-none text-sm text-white placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

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
            <button className="lg:hidden text-white">
              <span className="material-symbols-rounded text-[26px]">menu</span>
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-background border-white/20 text-white"
          >
            <div className="flex flex-col gap-6 mt-20 text-center">
              <a className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
                EXPLORE
              </a>

              <a className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
                HOW IT WORKS
              </a>

              <a className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide">
                COMMUNITY
              </a>

              <button className="mt-6 mx-3 flex h-10 px-6 items-center justify-center rounded-full bg-white text-background text-sm font-black transition-all hover:bg-secondary active:scale-95 cursor-pointer">
                GET STARTED
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
