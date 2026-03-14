import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/store/notifications";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function MobileHeader() {
  const navigate = useNavigate();
  const showToast = useNotificationStore((s) => s.showToast);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const handleFeedback = () => {
    setFeedbackOpen(true);
  };

  const submitFeedback = async () => {
    if (!message.trim()) {
      showToast("error", "Feedback cannot be empty.");
      return;
    }

    try {
      setSending(true);

      await api.post("/feedback", {
        message,
        page: window.location.pathname,
      });

      showToast("success", "Thanks for the feedback!");

      setMessage("");
      setFeedbackOpen(false);
    } catch (err: any) {
      const msg = err?.response?.data || "Failed to send feedback.";

      showToast("error", msg);
    } finally {
      setSending(false);
    }
  };

  // ESC key closes modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFeedbackOpen(false);
    };

    if (feedbackOpen) window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [feedbackOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-dark-background/80 backdrop-blur-md border-b border-white/5 h-16 flex items-center px-5 justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground/80">
            <span className="material-symbols-rounded">arrow_back</span>
          </button>

          <h1 className="text-lg font-bold text-white tracking-tight">
            Workspace Launcher
          </h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="size-8 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center text-purple">
              <span className="material-symbols-rounded text-xl">
                more_vert
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="bg-card border border-white/10 text-white"
          >
            <DropdownMenuItem
              onClick={handleFeedback}
              className="cursor-pointer gap-2"
            >
              <span className="material-symbols-rounded text-sm">feedback</span>
              Feedback
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer gap-2 text-red-400"
            >
              <span className="material-symbols-rounded text-sm">logout</span>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Feedback Modal */}
      {feedbackOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setFeedbackOpen(false)}
        >
          <div
            className="w-full max-w-md bg-card border border-white/10 rounded-xl p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-white">
                How can we improve?
              </h3>

              <button
                onClick={() => setFeedbackOpen(false)}
                className="text-muted-foreground hover:text-white"
              >
                <span className="material-symbols-rounded text-sm">close</span>
              </button>
            </div>

            <Textarea
              rows={3}
              placeholder="Tell us what's on your mind..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-xs"
            />

            <Button
              onClick={submitFeedback}
              disabled={sending}
              className="w-full mt-3 bg-purple hover:bg-purple/90 text-white text-xs"
            >
              {sending ? "Sending..." : "Submit Feedback"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
