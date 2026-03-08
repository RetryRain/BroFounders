import { Button } from "@/components/ui/button";
import type { Project } from "../types/project";

interface Props {
  project: Project;
  onClose: () => void;
  onJoin: () => void;
  hideJoin?: boolean;
}

export function ProjectDetailsSidebar({
  project,
  onClose,
  onJoin,
  hideJoin = false,
}: Props) {
  const { members, maxMembers, status } = project;
  const memberCount = members.length;
  const percentage = (memberCount / maxMembers) * 100;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="
        flex flex-col gap-10
        w-full md:w-[320px] lg:w-90
        bg-sidebar
        border-t md:border-t-0 md:border-l border-white/5
        p-6 md:p-10 shrink-0
        md:h-full md:overflow-y-auto
      "
    >
      {/* Close Button — desktop only */}
      <div className="hidden md:flex justify-end">
        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className="text-white/50 hover:text-white"
        >
          <span className="material-symbols-rounded">close</span>
        </Button>
      </div>

      {/* Availability */}
      <section>
        <h3 className="text-purple font-extrabold text-[10px] mb-5 uppercase tracking-widest opacity-80">
          Availability
        </h3>

        {/* Desktop: centered column with large ring */}
        <div className="hidden md:flex bg-white/5 p-6 rounded-[2rem] border border-white/10 flex-col items-center">
          <div className="relative flex items-center justify-center mb-4">
            <svg className="w-32 h-32">
              <circle
                className="text-white/10"
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                className="text-purple transition-all duration-500"
                cx="64"
                cy="64"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 64 64)"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-white leading-none">
                {memberCount}/{maxMembers}
              </span>
              <span className="text-[10px] font-black text-purple/60 uppercase tracking-widest mt-1">
                Slots
              </span>
            </div>
          </div>

          <p className="text-sm font-bold text-muted-foreground text-center">
            Join {memberCount} others exploring this stack
          </p>

          {status === "open" && !hideJoin && (
            <Button
              onClick={onJoin}
              className="mt-6 w-full bg-purple hover:bg-purple/90 text-white rounded-2xl font-black text-base shadow-xl shadow-purple/40"
            >
              <span className="material-symbols-rounded mr-2">
                rocket_launch
              </span>
              Join Project
            </Button>
          )}
        </div>

        {/* Mobile: compact horizontal row with small ring */}
        <div className="md:hidden bg-white/5 p-5 rounded-[2rem] border border-white/10 flex items-center gap-4 overflow-hidden">
          {/* Small ring */}
          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-20 h-20">
              <circle
                className="text-white/10"
                cx="40"
                cy="40"
                r="34"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                className="text-purple transition-all duration-500"
                cx="40"
                cy="40"
                r="34"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 34}
                strokeDashoffset={
                  2 * Math.PI * 34 - (percentage / 100) * 2 * Math.PI * 34
                }
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-lg font-black text-white leading-none">
                {memberCount}/{maxMembers}
              </span>
              <span className="text-[8px] font-black text-purple/60 uppercase tracking-widest mt-0.5">
                Slots
              </span>
            </div>
          </div>

          {/* Text + button */}
          <div className="flex flex-col gap-3 flex-1 min-w-0 overflow-hidden">
            <p className="text-sm font-bold text-muted-foreground">
              Join {memberCount} others exploring this stack
            </p>

            {status === "open" && !hideJoin && (
              <Button
                onClick={onJoin}
                className="w-full max-w-full bg-purple hover:bg-purple/90 text-white rounded-2xl font-black text-sm shadow-xl shadow-purple/40"
              >
                <span className="material-symbols-rounded mr-2 shrink-0">
                  rocket_launch
                </span>
                <span className="sm:hidden">Join</span>
                <span className="hidden sm:inline">Join Project</span>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Project ID */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Project ID
        </p>
        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <div className="text-xs font-mono text-white/80 truncate max-w-45">
            {project._id}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(project._id)}
            className="text-white/50 hover:text-purple transition"
          >
            <span className="material-symbols-rounded text-sm">
              content_copy
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
