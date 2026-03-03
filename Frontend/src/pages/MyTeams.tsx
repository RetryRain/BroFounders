import DashboardLayout from "@/sections/Dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyTeams() {
  return (
    <DashboardLayout>
      {/* ================= PAGE HEADER ================= */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white mb-2">My Teams</h1>
        <p className="text-muted-foreground">
          Manage and launch your active squads.
        </p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        {/* ================= LEFT: SQUAD LIST ================= */}
        <Card className="bg-white/5 border-white/10 p-6 rounded-2xl">
          <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-6">
            Active Squads
          </h3>

          <div className="space-y-3">
            <SquadItem active />
            <SquadItem />
            <SquadItem />
          </div>

          <Button
            variant="outline"
            className="w-full mt-6 border-dashed border-white/20 text-muted-foreground hover:text-white hover:border-white/40"
          >
            <span className="material-symbols-rounded mr-2">add</span>
            Browse New Squads
          </Button>
        </Card>

        {/* ================= RIGHT: SQUAD DETAILS ================= */}
        <div>
          {/* Squad Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-black text-white">
                Decentralized Asset Hub
              </h2>
              <Badge className="bg-white/5 border border-white/10 text-xs uppercase tracking-widest">
                Rust / Wasm
              </Badge>
            </div>

            <p className="text-muted-foreground">
              A secure marketplace for digital asset management.
            </p>
          </div>

          {/* Host Broadcast */}
          <Card className="p-6 rounded-2xl mb-8 bg-white/5 border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-white">
                  Host Broadcast
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">
                  2 hours ago
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Staging updated with the new Rust bridge implementation. Please
                check #dev-logs before launching.
              </p>
            </div>
          </Card>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 rounded-2xl bg-white/5 border-white/10 text-center flex flex-col items-center">
              <div className="size-16 rounded-full bg-purple/10 flex items-center justify-center mb-6">
                <span className="material-symbols-rounded text-purple text-3xl">
                  terminal
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Development Environment
              </h3>

              <p className="text-sm text-muted-foreground mb-8">
                Launch your pre-configured container.
              </p>

              <Button className="w-full bg-purple hover:bg-purple/90 text-white font-bold uppercase tracking-widest">
                Launch Workspace
              </Button>
            </Card>

            <Card className="p-8 rounded-2xl bg-white/5 border-white/10 text-center flex flex-col items-center">
              <div className="size-16 rounded-full bg-muted/10 flex items-center justify-center mb-6">
                <span className="material-symbols-rounded text-muted-foreground text-3xl">
                  chat
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Squad Communication
              </h3>

              <p className="text-sm text-muted-foreground mb-8">
                Coordinate tasks and share progress.
              </p>

              <Button
                variant="outline"
                className="w-full border-white/20 text-muted-foreground hover:bg-white/5"
              >
                Open Discord
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ================= Squad Item Component ================= */
function SquadItem({ active = false }: { active?: boolean }) {
  return (
    <div
      className={`p-4 rounded-xl cursor-pointer transition ${
        active ? "bg-white/5 border border-purple/30" : "hover:bg-white/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-white truncate">
            Decentralized Asset Hub
          </h4>
          <p className="text-[10px] text-muted-foreground mt-1">4 Online</p>
        </div>

        <span className="material-symbols-rounded text-purple text-sm">
          chevron_right
        </span>
      </div>
    </div>
  );
}
