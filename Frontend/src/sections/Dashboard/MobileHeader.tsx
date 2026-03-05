import { useNavigate } from "react-router-dom";

export default function MobileHeader() {
  const navigate = useNavigate();

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

      <button className="size-8 rounded-full bg-purple/20 border border-purple/30 flex items-center justify-center text-purple">
        <span className="material-symbols-rounded text-xl">more_vert</span>
      </button>
    </header>
  );
}
