import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "@/sections/Dashboard/DashboardLayout";
import MyTeamsLeftPanel from "@/sections/MyTeams/MyTeamsLeftPanel";
import MyTeamsRightPanel from "@/sections/MyTeams/MyTeamsRightPanel";
import EmptyTeamsState from "@/sections/EmptyTeamsState";
import ProjectDetails from "@/modals/ProjectDetails";
import type { Project } from "@/types/project";
import { useNotificationStore } from "@/store/notifications";

const API = import.meta.env.VITE_API_URL;

export default function MyTeams() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsProject, setDetailsProject] = useState<Project | null>(null);

  const setNewTeam = useNotificationStore((s) => s.setNewTeam);

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    setNewTeam(false);
  }, []);

  useEffect(() => {
    if (!selectedId) return;

    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API}/projects/${selectedId}`, {
          headers: { "x-auth-token": token },
        });

        const projectData = res.data;

        setProject(projectData);

        if (window.innerWidth < 1024) {
          setDetailsProject(projectData);
          setDetailsOpen(true);
        }
      } catch {
        console.error("Failed to fetch project");
      }
    };

    fetchProject();
  }, [selectedId]);

  const handleOpenDetails = (project: Project) => {
    setDetailsProject(project);
    setDetailsOpen(true);
  };

  const handleProjectDeleted = (id: string) => {
    if (project?._id === id) {
      setProject(null);
      setSelectedId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="lg:h-[calc(100vh-6rem)] lg:overflow-hidden flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-[320px] lg:shrink-0 lg:overflow-y-auto">
          <MyTeamsLeftPanel selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        <div className="flex-1 lg:overflow-y-auto">
          {project ? (
            <MyTeamsRightPanel
              project={project}
              onOpenDetails={handleOpenDetails}
            />
          ) : (
            <EmptyTeamsState />
          )}
        </div>
      </div>

      <ProjectDetails
        project={detailsProject}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        currentUser={currentUser}
        onProjectDeleted={handleProjectDeleted}
        hideJoin
      />
    </DashboardLayout>
  );
}
