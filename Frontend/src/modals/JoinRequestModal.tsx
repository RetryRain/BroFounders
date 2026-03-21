import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  loading?: boolean;
}

export default function JoinRequestModal({
  open,
  onClose,
  onSubmit,
  loading,
}: Props) {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSubmit(message.trim());
  };

  // Clear message only when modal closes
  useEffect(() => {
    if (!open) {
      setMessage("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 w-[92vw] sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-lg sm:text-xl font-bold">
            Say something before you join
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            No need to impress — just say what you're interested in building.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 sm:mt-6 space-y-5 sm:space-y-6">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What caught your interest? What would you like to work on?"
            className="bg-white/5 border-white/10 focus:ring-purple rounded-xl sm:rounded-2xl min-h-24 sm:min-h-30 text-sm"
          />

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-muted-foreground cursor-pointer"
            >
              Nevermind
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="cursor-pointer bg-purple hover:bg-purple/90 text-white rounded-lg sm:rounded-xl font-bold text-sm flex items-center gap-2 disabled:opacity-60"
            >
              {loading && (
                <span className="material-symbols-rounded animate-spin text-sm">
                  progress_activity
                </span>
              )}
              {loading ? "Sending..." : "Join Project"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
