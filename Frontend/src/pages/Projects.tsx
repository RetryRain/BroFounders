import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../sections/Dashboard/DashboardLayout";
import { ProjectsHeader } from "../sections/Projects/ProjectsHeader";
import ProjectGrid from "../sections/Projects/ProjectGrid";
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

  /* ---------------- Toast State ---------------- */
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToastType(type);
    setToastMessage(message);
    setToastOpen(true);
  };

  /* ---------------- Select Project ---------------- */
  const handleSelect = (project: Project) => {
    const url = new URL(window.location.href);
    url.searchParams.set("project", project._id);
    window.history.replaceState({}, "", url);

    setSelectedProject(project);
    setOpen(true);
  };

  /* ---------------- Delete Handler ---------------- */
  const handleProjectDeleted = (id: string) => {
    setProjects((prev) => prev.filter((p) => p._id !== id));
    showToast("success", "Project deleted successfully");
  };

  /* ---------------- Fetch Projects ---------------- */
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
        showToast("error", "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, debouncedSearch]);

  /* ---------------- Debounce Search ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  /* ---------------- Navigation Toast ---------------- */
  useEffect(() => {
    if (location.state?.success) {
      showToast(
        "success",
        location.state.success === "updated"
          ? "Project updated successfully"
          : "Project launched successfully",
      );

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  /* ---------------- Deep Link Modal Loader ---------------- */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectId = params.get("project");

    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/projects/${projectId}`, {
          headers: token ? { "x-auth-token": token } : {},
        });

        setSelectedProject(res.data);
        setOpen(true);
      } catch (err) {
        console.error("Failed to load shared project", err);
      }
    };

    fetchProject();
  }, [location.search]);

  return (
    <DashboardLayout>
      <ProjectsHeader search={search} setSearch={setSearch} />

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
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            const url = new URL(window.location.href);
            url.searchParams.delete("project");
            window.history.replaceState({}, "", url.pathname);
          }
        }}
        currentUser={currentUser}
        onProjectDeleted={handleProjectDeleted}
        showToast={showToast}
      />

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type={toastType}
        message={toastMessage}
      />
    </DashboardLayout>
  );
}
