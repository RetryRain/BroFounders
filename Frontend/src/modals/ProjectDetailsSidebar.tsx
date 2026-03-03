import { Button } from "@/components/ui/button";
import type { Project } from "../types/project";

interface Props {
  project: Project;
  onClose: () => void;
  onJoin: () => void;
}

export function ProjectDetailsSidebar({ project, onClose, onJoin }: Props) {
  const { members, maxMembers, status } = project;

  const memberCount = members.length;
  const percentage = (memberCount / maxMembers) * 100;

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="
        hidden md:flex
        w-[320px] lg:w-90
        bg-sidebar
        flex-col gap-10
        border-l border-white/5
        p-10 shrink-0
        overflow-y-auto
      "
    >
      {/* Close Button */}
      <div className="flex justify-end">
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

        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 flex flex-col items-center">
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

          {/* Join Button (Desktop) */}
          {status === "open" && (
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
      </section>
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Project ID
        </p>

        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <div className="text-xs font-mono text-white/80 truncate max-w-45">
            {project._id}
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(project._id);
            }}
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
