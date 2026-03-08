import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function MobileHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const handleFeedback = () => {
    window.open("https://forms.gle/your-form", "_blank");
  };

  return (
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
            <span className="material-symbols-rounded text-xl">more_vert</span>
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
  );
}
