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

  const hostName = project.user?.name ?? "Unknown";
  const hostID = project.user?._id ?? "Unknown";

  const hostInitials = hostName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        flex flex-col gap-6
        w-full md:w-75 lg:w-[320px]
        bg-sidebar
        border-t md:border-t-0 md:border-l border-white/5
        p-5 md:p-6 shrink-0
      "
    >
      {/* Close Button */}
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

      {/* Host */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Host
        </p>

        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <div className="size-8 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center text-xs font-bold text-purple">
            {hostInitials}
          </div>

          <span className="text-sm font-semibold text-white truncate">
            {hostName}
          </span>
        </div>
      </div>

      {/* Host ID */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Host ID
        </p>

        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <div className="text-xs font-mono text-white/80 truncate max-w-35">
            {hostID}
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(hostID)}
            className="text-white/50 hover:text-purple transition"
          >
            <span className="material-symbols-rounded text-sm">
              content_copy
            </span>
          </button>
        </div>
      </div>

      {/* Availability */}
      <section>
        <h3 className="text-purple font-extrabold text-[10px] mb-3 uppercase tracking-widest opacity-80">
          Availability
        </h3>

        <div className="bg-white/5 p-4 rounded-[1.5rem] border border-white/10 flex flex-col items-center">
          <div className="relative flex items-center justify-center mb-3">
            <svg viewBox="0 0 120 120" className="w-28 h-28">
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-white/10"
              />

              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={
                  2 * Math.PI * 48 - (percentage / 100) * 2 * Math.PI * 48
                }
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
                className="text-purple transition-all duration-500"
              />
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-black text-white leading-none">
                {memberCount}/{maxMembers}
              </span>

              <span className="text-[9px] font-black text-purple/60 uppercase tracking-widest mt-1">
                Slots
              </span>
            </div>
          </div>

          <p className="text-xs font-bold text-muted-foreground text-center">
            Join {memberCount} others exploring this stack
          </p>

          {status === "open" && !hideJoin && (
            <Button
              onClick={onJoin}
              className="mt-4 w-full bg-purple hover:bg-purple/90 text-white rounded-xl font-black text-sm shadow-lg shadow-purple/40"
            >
              <span className="material-symbols-rounded mr-2">
                rocket_launch
              </span>
              Join Project
            </Button>
          )}
        </div>
      </section>

      {/* Project ID */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          Project ID
        </p>

        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
          <div className="text-xs font-mono text-white/80 truncate max-w-35">
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
