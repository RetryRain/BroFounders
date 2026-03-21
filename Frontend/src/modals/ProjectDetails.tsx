import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Project } from "../types/project";
import { ProjectDetailsHeader } from "./ProjectDetailsHeader";
import { ProjectDetailsBody } from "./ProjectDetailsBody";
import { ProjectDetailsSidebar } from "./ProjectDetailsSidebar";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import JoinRequestModal from "@/modals/JoinRequestModal";
import api from "@/lib/api";

interface ProjectDetailsProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: {
    _id: string;
    isAdmin?: boolean;
  } | null;
  hideJoin?: boolean;
  onProjectDeleted: (id: string) => void;
  showToast: (type: "success" | "error", message: string) => void;
}

// ─── Modal History Hook ────────────────────────────────────────────────────────
// On mobile, when a full-screen modal is open the browser back button would
// normally navigate away from the page. This hook pushes a phantom history
// entry when the modal opens so that pressing back simply closes the modal
// instead of leaving the page.
function useModalHistory(open: boolean, onClose: () => void) {
  // Stable reference so the popstate listener never goes stale
  const stableOnClose = useCallback(onClose, [onClose]);

  useEffect(() => {
    if (!open) return;

    // Push a sentinel entry so the stack has something to pop
    window.history.pushState({ modal: true }, "");

    const handlePopState = () => {
      // Back button was pressed — close the modal, don't navigate
      stableOnClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);

      // If the modal was closed by any means OTHER than the back button
      // (e.g. clicking ✕, backdrop, delete flow) the sentinel entry is
      // still sitting on the history stack. Remove it so the user's real
      // back navigation isn't swallowed on the next tap.
      if (window.history.state?.modal) {
        window.history.back();
      }
    };
  }, [open, stableOnClose]);
}
// ──────────────────────────────────────────────────────────────────────────────

export default function ProjectDetails({
  project,
  open,
  onOpenChange,
  currentUser,
  hideJoin = false,
  onProjectDeleted,
  showToast,
}: ProjectDetailsProps) {
  if (!project) return null;

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [joining, setJoining] = useState(false);

  const navigate = useNavigate();

  // ── Back-button fix: intercept mobile back to close modal ──────────────────
  useModalHistory(open, () => onOpenChange(false));

  const handleEdit = (id: string) => {
    onOpenChange(false);
    navigate(`/projects/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await api.delete(`/projects/${project._id}`);

      showToast("success", "Project deleted successfully.");

      onProjectDeleted(project._id);
      setDeleteOpen(false);
      onOpenChange(false);
    } catch (err: any) {
      console.error("Delete failed:", err?.response?.data || err.message);
      showToast("error", err?.response?.data || "Failed to delete project.");
    } finally {
      setDeleting(false);
    }
  };

  const handleJoinRequest = async (message: string) => {
    try {
      setJoining(true);

      await api.post(`/interests/${project._id}`, { message });

      showToast("success", "Join request sent successfully.");

      setJoinOpen(false);
    } catch (err: any) {
      showToast("error", err?.response?.data || "Failed to send join request.");
    } finally {
      setJoining(false);
    }
  };

  return (
    <>
      <JoinRequestModal
        open={joinOpen}
        onClose={() => setJoinOpen(false)}
        onSubmit={handleJoinRequest}
        loading={joining}
      />

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="
          mt-5
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
          <DialogTitle className="sr-only">Project Details</DialogTitle>

          <DialogDescription className="sr-only">
            View full details of the selected project
          </DialogDescription>

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
            {/* LEFT COLUMN — on mobile this scrolls and sidebar flows in at the bottom */}
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-purple/40 scrollbar-track-transparent">
              <ProjectDetailsHeader project={project} />

              <ProjectDetailsBody
                project={project}
                currentUser={currentUser}
                onEdit={handleEdit}
                onDelete={() => setDeleteOpen(true)}
                showToast={showToast}
              />

              {/* Sidebar flows inline on mobile */}
              <div className="md:hidden">
                <ProjectDetailsSidebar
                  project={project}
                  onClose={() => onOpenChange(false)}
                  onJoin={() => setJoinOpen(true)}
                  hideJoin={hideJoin}
                />
              </div>
            </div>

            {/* RIGHT COLUMN — desktop only fixed sidebar */}
            <div className="hidden md:flex h-full">
              <ProjectDetailsSidebar
                project={project}
                onClose={() => onOpenChange(false)}
                onJoin={() => setJoinOpen(true)}
                hideJoin={hideJoin}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-card border border-white/10 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400 flex items-center gap-2">
              <span className="material-symbols-rounded">warning</span>
              Delete Project
            </AlertDialogTitle>

            <AlertDialogDescription className="text-muted-foreground mt-2">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="cursor-pointer bg-muted hover:text-green-500 hover:bg-muted/80">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
            >
              {deleting ? "Deleting..." : "Yes, Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
