import "material-symbols/rounded.css";
import paperPlane from "@/assets/paper-plane.svg";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import SidebarLink from "./SidebarLink";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMemo, useState, useRef, useEffect } from "react";
import { useNotificationStore } from "@/store/notifications";
import api from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user: User | null = useMemo(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <aside className="hidden lg:flex w-64 bg-sidebar text-sidebar-foreground flex-col fixed inset-y-0 left-0 border-r border-sidebar-border">
      <SidebarContent
        user={user}
        onLogout={handleLogout}
        pathname={location.pathname}
      />
    </aside>
  );
}

function SidebarContent({
  user,
  onLogout,
  pathname,
}: {
  user: User | null;
  onLogout: () => void;
  pathname: string;
}) {
  const hasUnreadActivity = useNotificationStore((s) => s.hasUnreadActivity);
  const hasNewTeam = useNotificationStore((s) => s.hasNewTeam);
  const showToast = useNotificationStore((s) => s.showToast);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!popoverRef.current) return;
      if (!popoverRef.current.contains(e.target as Node)) {
        setFeedbackOpen(false);
      }
    };

    if (feedbackOpen) {
      document.addEventListener("mousedown", handler);
    }

    return () => document.removeEventListener("mousedown", handler);
  }, [feedbackOpen]);

  const submitFeedback = async () => {
    const trimmed = message.trim();

    if (!trimmed) {
      showToast("error", "Feedback cannot be empty.");
      return;
    }

    if (trimmed.length < 3) {
      showToast("error", "Feedback must be at least 3 characters.");
      return;
    }

    try {
      setSending(true);

      await api.post("/feedback", {
        message: trimmed,
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

  return (
    <>
      {/* Logo */}
      <Link to="/">
        <div className="p-8 flex items-center gap-3">
          <div className="size-10 bg-purple rounded-sm flex items-center justify-center shadow-lg shadow-primary/20">
            {/* <span className="material-symbols-rounded text-primary-foreground">
              rocket_launch
            </span> */}
            <img src={paperPlane} className="rounded-sm scale-120" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Bro Founders
          </h2>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4 space-y-1">
        <Link to="/projects">
          <SidebarLink
            icon={<span className="material-symbols-rounded">dashboard</span>}
            label="Discovery"
            active={pathname.startsWith("/projects")}
          />
        </Link>

        <Link to="/my-teams">
          <SidebarLink
            icon={
              <div className="relative">
                <span className="material-symbols-rounded">groups</span>
                {hasNewTeam && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                )}
              </div>
            }
            label="My Teams"
            active={pathname.startsWith("/my-teams")}
          />
        </Link>

        <Link to="/activity">
          <SidebarLink
            icon={
              <div className="relative">
                <span className="material-symbols-rounded">notifications</span>
                {hasUnreadActivity && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                )}
              </div>
            }
            label="Activity"
            active={pathname.startsWith("/activity")}
          />
        </Link>

        <Link to="/profile">
          <SidebarLink
            icon={
              <span className="material-symbols-rounded">account_circle</span>
            }
            label="Profile"
            active={pathname.startsWith("/profile")}
          />
        </Link>
      </nav>

      {/* Feedback trigger */}
      <div className="p-4  border-sidebar-border relative">
        <button
          onClick={() => setFeedbackOpen((p) => !p)}
          className="flex items-center gap-3 w-full px-4 py-3 text-sm opacity-70 hover:opacity-100"
        >
          <span className="material-symbols-rounded">chat</span>
          Share Feedback
        </button>

        {feedbackOpen && (
          <div
            ref={popoverRef}
            className="absolute bottom-16 left-4 right-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-semibold text-white">
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
              disabled={sending || message.trim().length < 3}
              className="w-full mt-3 bg-purple hover:bg-purple/90 text-white text-xs flex items-center justify-center"
            >
              {sending ? (
                <span className="material-symbols-rounded animate-spin text-sm">
                  progress_activity
                </span>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </div>
        )}
      </div>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-purple/20 border border-primary/30 flex items-center justify-center text-xs font-bold text-purple">
          {user?.name
            ?.split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "?"}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">
            {user?.name ?? "Loading..."}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user?.email}
          </p>
        </div>

        <Button
          onClick={onLogout}
          variant="ghost"
          size="icon"
          className="cursor-pointer"
        >
          <span className="material-symbols-rounded">logout</span>
        </Button>
      </div>
    </>
  );
}
