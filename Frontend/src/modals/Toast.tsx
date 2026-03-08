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
          fixed top-4 left-1/2 -translate-x-1/2
          translate-y-0
          w-[92vw] sm:w-auto
          max-w-sm
          p-0
          border-0
          bg-transparent
          shadow-none
        "
      >
        <div
          className={`
            shadow-2xl rounded-xl sm:rounded-2xl
            px-4 sm:px-6 py-3 sm:py-4
            flex items-center gap-3 sm:gap-4
            backdrop-blur-xl border
            ${isSuccess ? "bg-card border-white/10" : "bg-red-500/10 border-red-500/30"}
          `}
        >
          <span
            className={`material-symbols-rounded text-lg sm:text-2xl ${
              isSuccess ? "text-purple" : "text-red-400"
            }`}
          >
            {isSuccess ? "check_circle" : "error"}
          </span>

          <span className="text-white font-semibold text-xs sm:text-sm leading-snug wrap-break-word">
            {message}
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
