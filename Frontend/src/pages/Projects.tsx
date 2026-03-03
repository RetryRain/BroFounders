import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../sections/Dashboard/DashboardLayout";
import { DiscoveryHeader } from "../sections/Discovery/Discovery";
import ProjectGrid from "../sections/Discovery/ProjectGrid";
import ProjectDetails from "../modals/ProjectDetails";
import type { Project } from "../types/project";
import { useLocation } from "react-router-dom";
import Toast from "@/modals/Toast";

const API = import.meta.env.VITE_API_URL;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const location = useLocation();

  // 🔥 Toast State (single system)
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastMessage, setToastMessage] = useState("");

  const handleSelect = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleProjectDeleted = (id: string) => {
    setProjects((prev) => prev.filter((p) => p._id !== id));

    setToastType("success");
    setToastMessage("Project deleted successfully");
    setToastOpen(true);
  };

  // 🔥 Fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${API}/projects?page=${page}&limit=12&search=${encodeURIComponent(
            debouncedSearch,
          )}`,
        );

        setProjects(res.data.data);
        setPages(res.data.pages);
      } catch {
        setToastType("error");
        setToastMessage("Failed to load projects");
        setToastOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, debouncedSearch]);

  // 🔥 Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset to page 1 when searching
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // 🔥 Success Navigation Toast (from create/edit)
  useEffect(() => {
    if (location.state?.success) {
      setToastType("success");
      setToastMessage(
        location.state.success === "updated"
          ? "Project updated successfully"
          : "Project launched successfully",
      );
      setToastOpen(true);

      // Prevent repeat on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <DashboardLayout>
      <DiscoveryHeader search={search} setSearch={setSearch} />

      <ProjectGrid
        projects={projects}
        page={page}
        pages={pages}
        setPage={setPage}
        loading={loading}
        error={null}
        onSelect={handleSelect}
      />

      <ProjectDetails
        project={selectedProject}
        open={open}
        onOpenChange={setOpen}
        currentUser={currentUser}
        onProjectDeleted={handleProjectDeleted}
      />

      {/* 🔥 Floating Toast */}
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type={toastType}
        message={toastMessage}
      />
    </DashboardLayout>
  );
}
