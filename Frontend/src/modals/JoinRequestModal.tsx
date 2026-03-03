import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  loading?: boolean; // 👈 add this
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
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border border-white/10 rounded-3xl p-8 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">
            Why should the host accept you?
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell them what you bring to the table..."
            className="bg-white/5 border-white/10 focus:ring-purple rounded-2xl min-h-30 text-sm"
          />

          <div className="flex justify-end gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-muted-foreground"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-purple hover:bg-purple/90 text-white rounded-xl font-bold disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
