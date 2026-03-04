import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MyTeamsLeftPanel() {
  return (
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
