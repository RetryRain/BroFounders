import "material-symbols/rounded.css";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarLink from "./SidebarLink";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Auth");
  };

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="lg:hidden top-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mt-4">
              <span className="material-symbols-rounded">menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 bg-sidebar text-sidebar-foreground p-0 border-sidebar-border"
          >
            <SidebarContent onLogout={handleLogout} />
          </SheetContent>
        </Sheet>
      </div>

      {/* ================= DESKTOP ================= */}
      <aside className="hidden lg:flex w-64 bg-sidebar text-sidebar-foreground flex-col fixed inset-y-0 left-0 border-r border-sidebar-border">
        <SidebarContent onLogout={handleLogout} />
      </aside>
    </>
  );
}

/* ================= REUSABLE CONTENT ================= */

function SidebarContent({ onLogout }: { onLogout: () => void }) {
  return (
    <>
      {/* Logo */}
      <Link to={"/"}>
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
        <Link to={"/projects"}>
          <SidebarLink
            icon={<span className="material-symbols-rounded">dashboard</span>}
            label="Discovery"
            active
          />
        </Link>
        <SidebarLink
          icon={<span className="material-symbols-rounded">groups</span>}
          label="My Teams"
        />
        <SidebarLink
          icon={<span className="material-symbols-rounded">folder</span>}
          label="Resources"
        />
        <Link to={"/activity"}>
          <SidebarLink
            icon={
              <span className="material-symbols-rounded">notifications</span>
            }
            label="Activity"
          />
        </Link>
        <SidebarLink
          icon={<span className="material-symbols-rounded">settings</span>}
          label="Settings"
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
        <div className="h-10 w-10 rounded-full bg-purple/20 border border-primary/30"></div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">Alex Rivera</p>
          <p className="text-xs text-muted-foreground truncate">
            Senior Builder
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
