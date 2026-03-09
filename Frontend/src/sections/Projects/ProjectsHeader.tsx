import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  search: string;
  setSearch: (v: string) => void;
}

export function ProjectsHeader({ search, setSearch }: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
      {/* LEFT */}
      <div className="text-center lg:text-left">
        <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">
          Project Discovery
        </h1>

        <p className="text-muted-foreground text-xs sm:text-base max-w-md mx-auto lg:mx-0">
          Find your next tech stack to master with a global community.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            search
          </span>

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tech stacks..."
            className="pl-10 pr-10 h-11 sm:h-12 rounded-xl sm:rounded-2xl w-full text-sm"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-purple transition"
            >
              <span className="material-symbols-rounded text-sm">close</span>
            </button>
          )}
        </div>

        {/* Button */}
        <Link to="/projects/create-project" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto h-11 sm:h-12 gap-2 bg-purple text-sm sm:text-base font-bold hover:bg-purple/70 rounded-xl sm:rounded-2xl">
            <span className="material-symbols-rounded text-base">
              add_circle
            </span>
            Host Project
          </Button>
        </Link>
      </div>
    </div>
  );
}
