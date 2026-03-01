import { Button } from "@/components/ui/button";
import type { Project } from "../types/project";

interface Props {
  project: Project;
  currentUser: {
    _id: string;
    isAdmin?: boolean;
  } | null;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function ProjectDetailsBody({
  project,
  currentUser,
  onEdit,
  onDelete,
}: Props) {
  const {
    description,
    techStack,
    goals,
    members,
    maxMembers,
    status,
    lookingFor,
  } = project;

  const memberCount = members.length;
  const percentage = (memberCount / maxMembers) * 100;
  const isHost =
    currentUser &&
    project.user &&
    String(currentUser._id) === String(project.user._id);
  const isAdmin = currentUser?.isAdmin;
  const canDelete =
    isAdmin || (isHost && (status === "open" || status === "in-progress"));
  const canUpdate = isAdmin || (isHost && status === "open");

  return (
    <div className="px-6 py-6 sm:p-10 overflow-y-auto flex-1 text-foreground min-h-0">
      {/* Tech Stack */}
      <div className="mb-8 sm:mb-10">
        <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest">
          Tech Stack
        </h3>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {techStack.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10"
            >
              <span className="material-symbols-rounded text-xs">code</span>
              <span className="text-[11px] sm:text-xs font-extrabold text-white">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Outcomes (Goals from backend) */}
      <div className="mb-8 sm:mb-12">
        <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest">
          Learning Outcomes
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-sidebar/10 border border-sidebar/20"
            >
              <span className="material-symbols-rounded text-purple bg-white p-1.5 sm:p-2 rounded-xl shadow-sm shrink-0">
                school
              </span>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {goal}
                </p>
              </div>
            </div>
          ))}
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

      {/* Looking For */}
      <div className="mb-8 sm:mb-10">
        <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-3 sm:mb-4 uppercase tracking-widest">
          Looking For
        </h3>

        <p className="text-base sm:text-lg font-medium text-foreground/80">
          {lookingFor}
        </p>
      </div>

      {/* Mobile Availability */}
      <div className="md:hidden mb-8">
        <h3 className="text-purple font-extrabold text-[10px] mb-4 uppercase tracking-widest opacity-80">
          Availability
        </h3>

        <div className="bg-white/5 p-5 rounded-[2rem] border border-white/10 flex items-center gap-6">
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

          <p className="text-sm font-bold text-muted-foreground">
            Join {memberCount} others exploring this stack
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 sm:pt-8 border-t border-white/10">
        <Button
          variant="ghost"
          className="text-muted-foreground hover:text-purple font-bold text-sm justify-center sm:justify-start"
        >
          <span className="material-symbols-rounded mr-2">share</span>
          Share Project
        </Button>

        {canUpdate && (
          <Button variant="outline" onClick={() => onEdit(project._id)}>
            <span className="material-symbols-rounded mr-2">edit</span>
            Edit Project
          </Button>
        )}

        {canDelete && (
          <Button variant="destructive" onClick={() => onDelete(project._id)}>
            <span className="material-symbols-rounded mr-2">delete</span>
            Delete Project
          </Button>
        )}
      </div>
    </div>
  );
}
