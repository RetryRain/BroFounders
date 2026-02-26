import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ProjectCardProps } from "./ProjectCard";

interface ProjectDetailsProps {
  project: ProjectCardProps | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectDetails({
  project,
  open,
  onOpenChange,
}: ProjectDetailsProps) {
  if (!project) return null;

  const { title, description, tags, members, maxMembers, status } = project;

  const percentage = (members / maxMembers) * 100;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          p-0
          w-screen max-w-none
          sm:w-[90vw] sm:max-w-none
          lg:w-[75vw] lg:max-w-275
          h-screen sm:h-[90vh]
          overflow-hidden
          sm:rounded-[2.5rem] rounded-none
          bg-card
          shadow-2xl
          border-0 sm:border sm:border-white/10
        "
      >
        {/* Outer scroll container for very small screens */}
        <div className="flex h-full flex-col overflow-hidden">
          {/* Mobile top bar with close button */}
          <div className="flex items-center justify-between px-5 pt-4 pb-1 sm:hidden bg-sidebar border-b-2">
            <Badge className="bg-purple/20 text-purple border border-purple/40 uppercase tracking-widest text-[10px] px-3 py-1 rounded-full">
              {status} Project
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-white/50 hover:text-white -mr-1"
            >
              <span className="material-symbols-rounded">close</span>
            </Button>
          </div>

          {/* Main layout: stacks on mobile, side-by-side on md+ */}
          <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
            {/* ── LEFT SIDE ── */}
            <div className="flex-1 flex flex-col overflow-hidden min-h-0">
              {/* HEADER */}
              <div className="bg-sidebar px-6 py-6 sm:px-10 sm:py-10 flex justify-between items-start">
                <div className="flex flex-col gap-2 sm:gap-3">
                  {/* Badges hidden on mobile (shown in top bar instead) */}
                  <div className="hidden sm:flex gap-3">
                    <Badge className="bg-purple/20 text-purple border border-purple/40 uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full">
                      {status} Project
                    </Badge>
                    <Badge className="bg-white/10 text-muted-foreground border border-white/10 uppercase tracking-widest text-[11px] px-4 py-1.5 rounded-full">
                      Intermediate Level
                    </Badge>
                  </div>
                  {/* Show level badge on mobile below top bar */}
                  <Badge className="sm:hidden self-start bg-white/10 text-muted-foreground border border-white/10 uppercase tracking-widest text-[10px] px-3 py-1 rounded-full">
                    Intermediate Level
                  </Badge>

                  <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                    {title}
                  </h2>

                  <p className="text-sm sm:text-base text-muted-foreground font-medium line-clamp-3 sm:line-clamp-none">
                    {description}
                  </p>
                </div>
              </div>

              {/* CONTENT — scrollable */}
              <div className="px-6 py-6 sm:p-10 overflow-y-auto flex-1 text-foreground min-h-0">
                {/* Tech Stack */}
                <div className="mb-8 sm:mb-10">
                  <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {tags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10"
                      >
                        <span className="material-symbols-rounded text-xs">
                          code
                        </span>
                        <span className="text-[11px] sm:text-xs font-extrabold text-white">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div className="mb-8 sm:mb-12">
                  <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest">
                    Learning Outcomes
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-sidebar/10 border border-sidebar/20">
                      <span className="material-symbols-rounded text-purple bg-white p-1.5 sm:p-2 rounded-xl shadow-sm shrink-0">
                        memory
                      </span>
                      <div>
                        <h4 className="font-bold text-foreground text-sm sm:text-base">
                          Memory Safety in Rust
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Master production-grade memory management and safety
                          patterns.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-sidebar/10 border border-sidebar/20">
                      <span className="material-symbols-rounded text-purple bg-white p-1.5 sm:p-2 rounded-xl shadow-sm shrink-0">
                        layers
                      </span>
                      <div>
                        <h4 className="font-bold text-foreground text-sm sm:text-base">
                          Substrate Framework
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Deep dive into pallet development and custom runtime
                          logic.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mission */}
                <div className="mb-8 sm:mb-10">
                  <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-3 sm:mb-4 uppercase tracking-widest">
                    Project Mission
                  </h3>
                  <p className="leading-relaxed text-base sm:text-lg font-medium text-foreground/80">
                    {description}
                  </p>
                </div>

                {/* Availability card — mobile only (replaces sidebar slot) */}
                <div className="md:hidden mb-8">
                  <h3 className="text-purple font-extrabold text-[10px] mb-4 uppercase tracking-widest opacity-80">
                    Availability
                  </h3>
                  <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10 flex items-center gap-6">
                    {/* Smaller donut on mobile */}
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
                            2 * Math.PI * 34 -
                            (percentage / 100) * 2 * Math.PI * 34
                          }
                          strokeLinecap="round"
                          transform="rotate(-90 40 40)"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-lg font-black text-white leading-none">
                          {members}/{maxMembers}
                        </span>
                        <span className="text-[8px] font-black text-purple/60 uppercase tracking-widest mt-0.5">
                          Slots
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">
                      Join {members} others exploring this stack
                    </p>
                  </div>
                </div>

                {/* Footer actions */}
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 sm:pt-8 border-t border-white/10">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-purple font-bold text-sm justify-center sm:justify-start"
                  >
                    <span className="material-symbols-rounded mr-2">share</span>
                    Share Project
                  </Button>

                  {status === "open" && (
                    <Button className="bg-purple hover:bg-purple/90 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-purple/40 w-full sm:w-auto">
                      <span className="material-symbols-rounded mr-2">
                        rocket_launch
                      </span>
                      Join Project
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR — desktop only ── */}
            <div className="hidden md:flex w-[320px] lg:w-90 bg-sidebar flex-col gap-10 overflow-y-auto border-l border-white/5 p-10 shrink-0">
              {/* Close */}
              <div className="flex justify-end">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
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
                        {members}/{maxMembers}
                      </span>
                      <span className="text-[10px] font-black text-purple/60 uppercase tracking-widest mt-1">
                        Slots
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-muted-foreground text-center">
                    Join {members} others exploring this stack
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
