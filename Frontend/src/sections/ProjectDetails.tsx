import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Project } from "../types/project";
import { ProjectDetailsHeader } from "./ProjectDetailsHeader";
import { ProjectDetailsBody } from "./ProjectDetailsBody";
import { ProjectDetailsSidebar } from "./ProjectDetailsSidebar";
import axios from "axios";

interface ProjectDetailsProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: {
    _id: string;
    isAdmin?: boolean;
  } | null;
  onProjectDeleted: (id: string) => void;
}

const API = import.meta.env.VITE_API_URL;

export default function ProjectDetails({
  project,
  open,
  onOpenChange,
  currentUser,
  onProjectDeleted,
}: ProjectDetailsProps) {
  if (!project) return null;

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`${API}/projects/${id}`, {
        headers: { "x-auth-token": token },
      });

      // Remove from parent state
      onProjectDeleted(id);

      // Close modal
      onOpenChange(false);
    } catch (err: any) {
      console.error("Delete failed:", err?.response?.data || err.message);
    }
  };

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
        {/* Mobile Close Button */}
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

        {/* Layout */}
        <div className="flex h-full flex-col md:flex-row overflow-hidden">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-purple/40 scrollbar-track-transparent">
            <ProjectDetailsHeader project={project} />

            <ProjectDetailsBody
              project={project}
              currentUser={currentUser}
              onDelete={handleDelete}
            />
          </div>

          {/* RIGHT COLUMN */}
          <ProjectDetailsSidebar
            project={project}
            onClose={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
