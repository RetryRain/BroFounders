import "material-symbols/rounded.css";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarLink from "./SidebarLink";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Just read from localStorage — no fetching
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
    <>
      {/* MOBILE */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <span className="material-symbols-rounded">menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 bg-sidebar text-sidebar-foreground p-0 border-sidebar-border"
          >
            <SidebarContent
              user={user}
              onLogout={handleLogout}
              pathname={location.pathname}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP */}
      <aside className="hidden lg:flex w-64 bg-sidebar text-sidebar-foreground flex-col fixed inset-y-0 left-0 border-r border-sidebar-border">
        <SidebarContent
          user={user}
          onLogout={handleLogout}
          pathname={location.pathname}
        />
      </aside>
    </>
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
  return (
    <>
      {/* Logo */}
      <Link to="/">
        <div className="p-8 flex items-center gap-3">
          <div className="size-10 bg-purple rounded-sm flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-symbols-rounded text-primary-foreground">
              rocket_launch
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Project Hub
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

        <SidebarLink
          icon={<span className="material-symbols-rounded">groups</span>}
          label="My Teams"
          active={pathname.startsWith("/teams")}
        />

        <SidebarLink
          icon={<span className="material-symbols-rounded">folder</span>}
          label="Resources"
          active={pathname.startsWith("/resources")}
        />

        <Link to="/activity">
          <SidebarLink
            icon={
              <span className="material-symbols-rounded">notifications</span>
            }
            label="Activity"
            active={pathname.startsWith("/activity")}
          />
        </Link>

        <SidebarLink
          icon={<span className="material-symbols-rounded">settings</span>}
          label="Settings"
          active={pathname.startsWith("/settings")}
        />
      </nav>

      {/* Storage */}
      <div className="p-4 mt-auto">
        <div className="rounded-xl p-4 bg-card border border-border backdrop-blur-sm">
          <p className="text-xs text-muted-foreground mb-2 uppercase font-bold tracking-wider">
            Storage
          </p>
          <Progress value={62} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">6.2GB of 10GB used</p>
        </div>
      </div>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-purple/20 border border-primary/30" />

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
