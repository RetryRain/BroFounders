import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ProjectCardProps } from "./ProjectCard";
import { ProjectDetailsHeader } from "./ProjectDetailsHeader";
import { ProjectDetailsBody } from "./ProjectDetailsBody";
import { ProjectDetailsSidebar } from "./ProjectDetailsSidebar";
import { Button } from "@/components/ui/button";

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
          bg-card shadow-2xl
          border-0 sm:border sm:border-white/10
        "
      >
        {/* Mobile-only close button — sidebar (which holds the close btn) is hidden on mobile */}
        <div className="md:hidden absolute top-4 right-4 z-50">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-white/50 hover:text-white bg-sidebar/80 backdrop-blur-sm rounded-full"
          >
            <span className="material-symbols-rounded">close</span>
          </Button>
        </div>
        {/* overflow-hidden here — each column manages its own scroll */}
        <div className="flex h-full flex-col md:flex-row overflow-hidden">
          {/* LEFT COLUMN — scrolls independently, header scrolls with body */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-purple/40 scrollbar-track-transparent">
            <ProjectDetailsHeader
              title={title}
              description={description}
              status={status}
            />
            <ProjectDetailsBody
              description={description}
              tags={tags}
              members={members}
              maxMembers={maxMembers}
              status={status}
            />
          </div>

          {/* RIGHT COLUMN — never scrolls, so close button stays pinned */}
          <ProjectDetailsSidebar
            members={members}
            maxMembers={maxMembers}
            onClose={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
