import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../sections/DashboardLayout";
import { DiscoveryHeader } from "../sections/DiscoveryHeader";
import ProjectGrid from "../sections/ProjectGrid";
import ProjectDetails from "../sections/ProjectDetails";
import type { Project } from "../types/project";

const API = import.meta.env.VITE_API_URL;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const handleSelect = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleProjectDeleted = (id: string) => {
    setProjects((prev) => prev.filter((p) => p._id !== id));
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API}/projects?page=${page}&limit=12`);

        setProjects(res.data.data);
        setPages(res.data.pages);
        setError(null);
      } catch {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page]);

  return (
    <DashboardLayout>
      <DiscoveryHeader />
      <ProjectGrid
        projects={projects}
        page={page}
        pages={pages}
        setPage={setPage}
        loading={loading}
        error={error}
        onSelect={handleSelect}
      />
      <ProjectDetails
        project={selectedProject}
        open={open}
        onOpenChange={setOpen}
        currentUser={currentUser}
        onProjectDeleted={handleProjectDeleted}
      />
    </DashboardLayout>
  );
}
