import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: Props) {
  const { title, blurb, techStack, members, maxMembers, status, level } =
    project;

  const memberCount = members.length;

  const statusStyle: Record<Project["status"], string> = {
    open: "bg-green-500/20 text-green-400 border border-green-400/30",
    "in-progress":
      "bg-orange-400/20 text-orange-400 border border-orange-400/30",
    closed: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
  };
  const levelStyle: Record<Project["level"], string> = {
    beginner: "bg-emerald-500/15 text-emerald-400 border border-emerald-400/30",
    intermediate: "bg-blue-500/15 text-blue-400 border border-blue-400/30",
    advanced: "bg-purple-500/15 text-purple-400 border border-purple-400/30",
    chaos: "bg-red-500/15 text-red-400 border border-red-400/30",
  };

  return (
    <Card
      onClick={onClick}
      className="glass-card rounded-2xl p-0 hover:-translate-y-1 transition-all cursor-pointer group border-white/10 bg-card-background shadow-none"
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <Badge
              className={`uppercase text-[10px] tracking-widest font-bold px-2.5 py-1 rounded-full ${statusStyle[status]}`}
            >
              {status.replace("-", " ")}
            </Badge>

            <Badge
              className={`uppercase text-[10px] tracking-widest font-bold px-2.5 py-1 rounded-full ${levelStyle[level]}`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="group-hover:text-white transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="material-symbols-rounded">bookmark</span>
          </Button>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 wrap-break-word">
          {title}
        </h3>

        <p className="text-sm line-clamp-2 mb-6 wrap-break-word">
          {blurb || "Add a short project pitch..."}
        </p>

        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 6).map((tech) => (
            <Badge
              key={tech}
              className="px-3 py-1 bg-purple/30 rounded-xs text-indigo-bloom text-xs font-semibold border border-indigo-bloom/20 max-w-full"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-6 py-6 pt-0 border-t border-white/5 flex justify-between items-center">
        <span className="text-sm font-medium">
          {memberCount}/{maxMembers} Members
        </span>

        {status === "closed" ? (
          <span className="material-symbols-rounded">check_circle</span>
        ) : status === "in-progress" ? (
          <span className="material-symbols-rounded">lock</span>
        ) : (
          <span className="material-symbols-rounded group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
