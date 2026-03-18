import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  onLaunch: () => void;
  submitting: boolean;
  title: string;
  mode: "create" | "edit";
}

export default function CreateProjectHeader({
  onLaunch,
  submitting,
  mode,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 sm:gap-6 mb-8 sm:mb-10">
      {/* LEFT */}
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 text-primary font-bold text-xs sm:text-sm uppercase tracking-widest mb-2">
          <span className="material-symbols-rounded text-sm">auto_awesome</span>
          <span>Creation Studio</span>
        </div>

        <h1 className="text-xl sm:text-3xl font-bold text-white">
          Assemble Your Bros
        </h1>

        <p className="text-muted-foreground text-xs sm:text-base mt-1 max-w-md mx-auto lg:mx-0">
          Set the stage for your collaborative masterpiece.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
        <Link to="/projects">
          <Button
            variant="outline"
            className="cursor-pointer w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base font-bold rounded-full hover:text-purple"
          >
            <span className="material-symbols-rounded">arrow_back</span>
            Back
          </Button>
        </Link>

        <Button
          onClick={onLaunch}
          disabled={submitting}
          className="cursor-pointer w-full sm:w-auto h-11 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-bold rounded-full disabled:opacity-50"
        >
          {submitting
            ? mode === "edit"
              ? "Updating..."
              : "Launching..."
            : mode === "edit"
              ? "Update Project"
              : "Create Project"}
        </Button>
      </div>
    </div>
  );
}
