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
  showToast: (type: "success" | "error", message: string) => void;
}

export function ProjectDetailsBody({
  project,
  currentUser,
  onEdit,
  onDelete,
  showToast,
}: Props) {
  const { description, techStack, goals, status, lookingFor } = project;

  const isHost =
    currentUser &&
    project.user &&
    String(currentUser._id) === String(project.user._id);
  const isAdmin = currentUser?.isAdmin;

  const canDelete =
    isAdmin || (isHost && (status === "open" || status === "in-progress"));
  const canUpdate = isAdmin || (isHost && status === "open");

  const handleShare = async () => {
    const url = `${window.location.origin}/projects?project=${project._id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: project.title,
          text: project.blurb,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        showToast("success", "Project link copied to clipboard");
      }
    } catch {
      showToast("error", "Failed to share project");
    }
  };

  return (
    <div className="px-6 py-6 sm:p-10 overflow-y-auto flex-1 text-foreground min-h-0">
      {/* Tag */}
      <div className="mb-8 sm:mb-10">
        <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest">
          Tags
        </h3>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {techStack.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 bg-white/5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10"
            >
              <span className="material-symbols-rounded text-xs">stacks</span>
              <span className="text-[11px] sm:text-xs font-extrabold text-white">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="mb-8 sm:mb-12">
        <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-4 sm:mb-6 uppercase tracking-widest">
          Goals
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-sidebar/10 border border-sidebar/20"
            >
              <span className="material-symbols-rounded text-purple bg-white p-1.5 sm:p-2 rounded-xl shadow-sm shrink-0">
                target
              </span>

              <p className="text-sm md:text-base text-muted-foreground">
                {goal}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="mb-8 sm:mb-10">
        <h3 className="text-purple font-extrabold text-[11px] sm:text-sm mb-3 sm:mb-4 uppercase tracking-widest">
          Description
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

      {/* Footer */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 sm:pt-8 border-t border-white/10">
        <Button
          variant="ghost"
          onClick={handleShare}
          className="cursor-pointer text-muted-foreground hover:text-background hover:bg-black font-bold text-sm justify-center sm:justify-start"
        >
          <span className="material-symbols-rounded mr-2">share</span>
          Share Project
        </Button>

        {canUpdate && (
          <Button
            className="cursor-pointer hover:text-green-600"
            variant="outline"
            onClick={() => onEdit(project._id)}
          >
            <span className="material-symbols-rounded mr-2">edit</span>
            Edit Project
          </Button>
        )}

        {canDelete && (
          <Button
            className="cursor-pointer"
            variant="destructive"
            onClick={() => onDelete(project._id)}
          >
            <span className="material-symbols-rounded mr-2">delete</span>
            Delete Project
          </Button>
        )}
      </div>
    </div>
  );
}
