import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  filters: ("open" | "in-progress" | "closed")[];
  setFilters: (v: ("open" | "in-progress" | "closed")[]) => void;
}

export function ProjectsHeader({
  search,
  setSearch,
  filters,
  setFilters,
}: Props) {
  const pill =
    "flex-1 px-4 py-1.5 rounded-full text-xs font-bold transition-all text-center whitespace-nowrap";

  const toggleFilter = (status: "open" | "in-progress" | "closed") => {
    if (filters.includes(status)) {
      setFilters(filters.filter((f) => f !== status));
    } else {
      setFilters([...filters, status]);
    }
  };

  const isActive = (status: "open" | "in-progress" | "closed") =>
    filters.includes(status);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
      {/* LEFT */}
      <div className="text-center lg:text-left">
        <h1 className="text-xl sm:text-3xl font-bold text-white mb-2">
          Project Discovery
        </h1>
        <p className="text-muted-foreground text-xs sm:text-base max-w-md mx-auto lg:mx-0">
          Find people to build with — learn whatever you need along the way.
        </p>
      </div>

      {/* Status Filter Pills */}
      <div className="flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/10 w-full lg:w-auto">
        <button
          onClick={() => toggleFilter("open")}
          className={`${pill} cursor-pointer ${
            isActive("open")
              ? "bg-purple text-white shadow"
              : "text-muted-foreground hover:text-white hover:bg-white/10"
          }`}
        >
          Open
        </button>

        <button
          onClick={() => toggleFilter("in-progress")}
          className={`${pill} cursor-pointer ${
            isActive("in-progress")
              ? "bg-purple text-white shadow"
              : "text-muted-foreground hover:text-white hover:bg-white/10"
          }`}
        >
          In Progress
        </button>

        <button
          onClick={() => toggleFilter("closed")}
          className={`${pill} cursor-pointer ${
            isActive("closed")
              ? "bg-purple text-white shadow"
              : "text-muted-foreground hover:text-white hover:bg-white/10"
          }`}
        >
          Closed
        </button>
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

        {/* Host Button */}
        <Link to="/projects/create-project" className="w-full sm:w-auto">
          <Button className="cursor-pointer w-full sm:w-auto h-11 sm:h-12 gap-2 bg-purple text-sm sm:text-base font-bold hover:bg-purple/70 rounded-xl sm:rounded-2xl">
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
