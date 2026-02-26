import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Status = "open" | "in-progress" | "closed";

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  members: number;
  maxMembers: number;
  status: Status;
  weeksLeft?: number;
}

export default function ProjectCard({
  title,
  description,
  tags,
  members,
  maxMembers,
  status,
  weeksLeft,
}: ProjectCardProps) {
  const statusStyle: Record<Status, string> = {
    open: "bg-sidebar text-green-400 border border-sidebar/30",
    "in-progress":
      "bg-orange-400/20 text-orange-400 border border-orange-400/30",
    closed: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
  };

  return (
    <Card className="glass-card rounded-2xl p-0 hover:-translate-y-1 transition-all cursor-pointer group border-white/10 bg-card-background shadow-none">
      <CardContent className="p-6">
        {/* Top */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <Badge
              className={`uppercase text-[10px] tracking-widest font-bold px-2.5 py-1 rounded-full ${statusStyle[status]}`}
            >
              {status}
            </Badge>

            {weeksLeft && status === "open" && (
              <Badge className="bg-white/5 border border-white/10 uppercase text-[10px] tracking-widest font-bold px-2.5 py-1 rounded-full">
                {weeksLeft} Weeks Left
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="group-hover:text-white transition-colors"
          >
            <span className="material-symbols-rounded">bookmark</span>
          </Button>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        {/* Description */}
        <p className="text-sm line-clamp-2 mb-6">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              className="px-3 py-1 bg-purple/30 rounded-xs text-indigo-bloom text-xs font-semibold border border-indigo-bloom/20"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="px-6 py-6 pt-0 border-t border-white/5 flex justify-between items-center">
        {/* Members */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {Array.from({ length: Math.min(members, 2) }).map((_, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-bg-dark bg-slate-400"
              />
            ))}

            {members > 2 && (
              <div className="w-8 h-8 rounded-full border-2 border-bg-dark flex items-center justify-center bg-indigo-bloom text-[10px] font-bold">
                +{members - 2}
              </div>
            )}
          </div>

          <span className="text-sm font-medium">
            {members}/{maxMembers} Members
          </span>
        </div>

        {/* Right Icon */}
        {status === "closed" ? (
          <span className="material-symbols-rounded /40">check_circle</span>
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
