import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const API = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API}/projects/my-teams`, {
          headers: { "x-auth-token": token },
        });

        setTeams(res.data);
      } catch (err) {
        console.error("Failed to load teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <Card className="bg-white/5 border-white/10 p-6 rounded-2xl">
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-6">
        Active Squads
      </h3>

      <div className="space-y-2">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
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
