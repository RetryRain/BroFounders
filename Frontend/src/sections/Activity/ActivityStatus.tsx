import { Card } from "@/components/ui/card";

export default function ActivityStatus() {
  return (
    <>
      {/* STATUS OVERVIEW */}
      <div className="mt-10">
        <h3 className="text-lg font-bold text-white mb-4">
          Application Status Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card p-4 rounded-xl flex items-center justify-between bg-white/5 border-white/10">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
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

          <Card className="glass-card p-4 rounded-xl flex items-center justify-between bg-white/5 border-white/10">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
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

          <Card className="glass-card p-4 rounded-xl flex items-center justify-between bg-white/5 border-white/10">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
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
    </>
  );
}
