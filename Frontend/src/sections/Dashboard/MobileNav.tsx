import { Link, useLocation } from "react-router-dom";
import { useNotificationStore } from "@/store/notifications";

export default function MobileNav() {
  const location = useLocation();

  const hasUnreadActivity = useNotificationStore((s) => s.hasUnreadActivity);

  const hasNewTeam = useNotificationStore((s) => s.hasNewTeam);

  const navItem = (to: string, icon: string, label: string) => {
    const active = location.pathname.startsWith(to);

    return (
      <Link
        to={to}
        className={`flex flex-col items-center justify-center gap-1 transition-colors ${
          active ? "text-purple" : "text-foreground/50"
        }`}
      >
        <div className="relative">
          <span className="material-symbols-rounded">{icon}</span>

          {to === "/activity" && hasUnreadActivity && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          )}

          {to === "/my-teams" && hasNewTeam && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          )}
        </div>

        <span className="text-[10px] font-bold uppercase tracking-tight">
          {label}
        </span>
      </Link>
    );
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 bg-sidebar/95 backdrop-blur-xl border-t border-white/10 h-20 px-6 flex items-center justify-between z-50">
      {navItem("/projects", "explore", "Discovery")}
      {navItem("/my-teams", "groups", "My Teams")}
      {navItem("/activity", "notifications", "Activity")}
      {navItem("/profile", "account_circle", "Profile")}
    </nav>
  );
}
