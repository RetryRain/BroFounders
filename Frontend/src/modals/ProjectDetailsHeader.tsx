import { Badge } from "@/components/ui/badge";
import type { Project } from "../types/project";

interface Props {
  project: Project;
}

export function ProjectDetailsHeader({ project }: Props) {
  const { title, blurb, status, level } = project;
  const levelStyle: Record<Project["level"], string> = {
    beginner: "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30",
    intermediate: "bg-blue-500/15 text-blue-400 border border-blue-400/30",
    advanced: "bg-purple-500/15 text-purple-400 border border-purple-400/30",
    chaos: "bg-red-500/15 text-red-400 border border-red-400/30",
  };

  const statusStyle: Record<Project["status"], string> = {
    open: "bg-green-500/20 text-green-400 border border-green-400/30",
    "in-progress":
      "bg-orange-400/20 text-orange-400 border border-orange-400/30",
    closed: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
  };

  return (
    <div className="bg-sidebar px-6 py-6 sm:px-10 sm:py-10 flex justify-between items-start">
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Desktop Badges */}
        <div className="hidden sm:flex gap-3">
          <Badge
            className={`uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full ${statusStyle[status]}`}
          >
            {status} Project
          </Badge>

          <Badge
            className={`uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full ${levelStyle[level]}`}
          >
            {level}
          </Badge>
        </div>

        {/* Mobile Level Badge */}
        <Badge className="sm:hidden self-start bg-white/10 text-muted-foreground border border-white/10 uppercase tracking-widest text-[10px] px-3 py-1 rounded-full">
          {level} Level
        </Badge>

        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
          {title}
        </h2>

        {/* Blurb instead of full description */}
        <p className="text-sm sm:text-base text-muted-foreground font-medium">
          {blurb}
        </p>
      </div>
    </div>
  );
}
