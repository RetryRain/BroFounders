import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  type: "success" | "error";
  message: string;
}

export default function Toast({ open, onClose, type, message }: Props) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [open, onClose]);

  const isSuccess = type === "success";

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="
          top-6
          translate-y-0
          left-1/2
          -translate-x-1/2
          fixed
          w-auto
          max-w-fit
          p-0
          border-0
          bg-transparent
          shadow-none
        "
      >
        <div
          className={`shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-4 backdrop-blur-xl border
          ${
            isSuccess
              ? "bg-card border-white/10"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          <span
            className={`material-symbols-rounded text-2xl ${
              isSuccess ? "text-purple" : "text-red-400"
            }`}
          >
            {isSuccess ? "check_circle" : "error"}
          </span>

          <span className="text-white font-semibold text-sm">{message}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
