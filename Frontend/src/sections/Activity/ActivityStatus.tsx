import { Card } from "@/components/ui/card";

export default function ActivityStatus() {
  return (
    <div className="mt-8 sm:mt-10">
      <h3 className="text-lg font-bold text-white mb-4">
        Application Status Overview
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 rounded-xl flex items-center justify-between bg-white/5 border-white/10">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-1 truncate">
              Zig Graphics Engine
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-orange-400/10 text-orange-400 border-orange-400/20">
              Under Review
            </span>
          </div>
          <span className="material-symbols-rounded text-muted-foreground/40">
            pending
          </span>
        </Card>

        <Card className="p-4 rounded-xl flex items-center justify-between bg-white/5 border-white/10">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-1 truncate">
              Real-time Analytics
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-green-500/10 text-green-500 border-green-500/20">
              Accepted
            </span>
          </div>
          <span className="material-symbols-rounded text-green-500/40">
            check_circle
          </span>
        </Card>

        <Card className="p-4 rounded-xl flex items-center justify-between bg-white/5 border-white/10">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground mb-1 truncate">
              Kotlin Multiplatform
            </p>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-red-400/10 text-red-400 border-red-400/20">
              Waitlisted
            </span>
          </div>
          <span className="material-symbols-rounded text-muted-foreground/40">
            hourglass_empty
          </span>
        </Card>
      </div>
    </div>
  );
}
