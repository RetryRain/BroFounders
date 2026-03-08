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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteProjectDialog({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-card border border-white/10 text-foreground rounded-2xl w-[92vw] sm:max-w-md p-5 sm:p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg sm:text-xl font-bold text-red-400 flex items-center gap-2">
            <span className="material-symbols-rounded text-base sm:text-lg">
              warning
            </span>
            Delete Project
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">
            This action cannot be undone. All project data, interests and
            activity will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:gap-2">
          <AlertDialogCancel className="bg-muted hover:bg-muted/80 text-foreground w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 w-full sm:w-auto flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="material-symbols-rounded animate-spin text-sm">
                progress_activity
              </span>
            )}
            {loading ? "Deleting..." : "Yes, Delete Project"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
