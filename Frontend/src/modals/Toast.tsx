import { useEffect } from "react";

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

  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 animate-in fade-in slide-in-from-top-4">
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

        <div className="flex flex-col">
          <span className="text-white font-semibold text-sm">{message}</span>
        </div>
      </div>
    </div>
  );
}
