import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNotificationStore } from "@/store/notifications";
import { Link } from "react-router-dom";

interface Project {
  _id: string;
  title: string;
  members: string[];
}

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function MyTeamsLeftPanel({ selectedId, onSelect }: Props) {
  const [teams, setTeams] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const showToast = useNotificationStore((s) => s.showToast);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await api.get(`/projects/my-teams`);
        setTeams(res.data);
      } catch {
        showToast("error", "Failed to load your squads.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [showToast]);

  return (
    <Card className="bg-white/5 border-white/10 p-6 rounded-2xl h-full flex flex-col">
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-6">
        My Teams
      </h3>

      {/* Scroll Area */}
      <div className="flex-1 min-h-0 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-purple/40 scrollbar-track-transparent">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <span className="material-symbols-rounded animate-spin text-muted-foreground text-2xl">
              progress_activity
            </span>
          </div>
        ) : teams.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active squads yet.</p>
        ) : (
          teams.map((team) => (
            <SquadItem
              key={team._id}
              title={team.title}
              memberCount={team.members?.length ?? 0}
              active={selectedId === team._id}
              onClick={() => onSelect(team._id)}
            />
          ))
        )}
      </div>

      <Link to="/projects">
        <Button
          variant="outline"
          className="cursor-pointer w-full mt-6 border-dashed border-white/20 text-muted-foreground hover:text-white hover:border-white/40"
        >
          <span className="material-symbols-rounded mr-2">add</span>
          Browse New Projects
        </Button>
      </Link>
    </Card>
  );
}

/* ================= Squad Item ================= */

function SquadItem({
  title,
  memberCount,
  active,
  onClick,
}: {
  title: string;
  memberCount: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`px-4 py-3 rounded-lg cursor-pointer transition ${
        active ? "bg-white/5 border border-purple/30" : "hover:bg-white/5"
      }`}
    >
      <p className="text-sm font-semibold text-white truncate">{title}</p>

      <p className="text-[10px] text-muted-foreground mt-1">
        {memberCount} Members
      </p>
    </div>
  );
}
