import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, GitBranch, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/20 px-6 md:px-20 py-4 bg-background/90 backdrop-blur-xl z-50">
      {/* LEFT */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 text-accent">
          <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/40 cursor-pointer">
            <GitBranch className="size-5" />
          </div>

          <h2 className="text-white text-2xl font-black leading-tight tracking-tighter cursor-pointer">
            BuildTogether
          </h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide"
            href="#"
          >
            EXPLORE
          </a>
          <a
            className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide"
            href="#"
          >
            HOW IT WORKS
          </a>
          <a
            className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide"
            href="#"
          >
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
              <Search className="size-4" />
            </div>
            <Input
              placeholder="Search stacks..."
              className="h-full flex-1 bg-transparent dark:bg-transparent border-none shadow-none text-sm text-white placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Desktop Button */}
        <div className="hidden sm:flex gap-3">
          <button className="flex h-10 px-6 items-center justify-center rounded-full bg-white text-background text-sm font-black transition-all hover:bg-primary hover:text-white active:scale-95 cursor-pointer">
            GET STARTED
          </button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden text-white">
              <Menu className="size-6" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-background border-white/20 text-white"
          >
            <div className="flex flex-col gap-6 mt-20 text-center">
              <a
                className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide"
                href="#"
              >
                EXPLORE
              </a>

              <a
                className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide"
                href="#"
              >
                HOW IT WORKS
              </a>

              <a
                className="text-foreground/80 hover:text-white transition-all text-sm font-bold tracking-wide"
                href="#"
              >
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
