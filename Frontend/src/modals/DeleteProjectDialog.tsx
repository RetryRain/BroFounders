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
      <AlertDialogContent className="bg-card border border-white/10 text-foreground rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-red-400 flex items-center gap-2">
            <span className="material-symbols-rounded">warning</span>
            Delete Project
          </AlertDialogTitle>

          <AlertDialogDescription className="text-muted-foreground text-sm mt-2">
            This action cannot be undone. All project data, interests and
            activity will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel className="bg-muted hover:bg-muted/80 text-foreground">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
          >
            {loading ? "Deleting..." : "Yes, Delete Project"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
