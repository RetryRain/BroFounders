import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
}

export default function SuccessModal({ open, onClose, mode }: Props) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 animate-in fade-in slide-in-from-top-4">
      <div className="bg-card border border-white/10 shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-4 backdrop-blur-xl">
        <span className="material-symbols-rounded text-purple text-2xl">
          check_circle
        </span>

        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm">
            {mode === "edit"
              ? "Project updated successfully"
              : "Project launched successfully"}
          </span>
          <span className="text-muted-foreground text-xs">
            Redirected to discovery
          </span>
        </div>
      </div>
    </div>
  );
}
