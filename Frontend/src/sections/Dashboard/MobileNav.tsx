import { Link, useLocation } from "react-router-dom";

export default function MobileNav() {
  const location = useLocation();

  const navItem = (to: string, icon: string, label: string) => {
    const active = location.pathname.startsWith(to);

    return (
      <Link
        to={to}
        className={`flex flex-col items-center justify-center gap-1 transition-colors ${
          active ? "text-purple" : "text-foreground/50"
        }`}
      >
        <span className="material-symbols-rounded">{icon}</span>
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
      {navItem("/settings", "settings", "Settings")}
    </nav>
  );
}
