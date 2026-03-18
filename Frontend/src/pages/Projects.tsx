import { useEffect, useState } from "react";
import api from "@/lib/api";
import DashboardLayout from "../sections/Dashboard/DashboardLayout";
import { ProjectsHeader } from "../sections/Projects/ProjectsHeader";
import ProjectGrid from "../sections/Projects/ProjectGrid";
import ProjectDetails from "../modals/ProjectDetails";
import type { Project } from "../types/project";
import { useLocation } from "react-router-dom";
import { useNotificationStore } from "@/store/notifications";

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

  /* MULTI STATUS FILTER */
  const [filters, setFilters] = useState<("open" | "in-progress" | "closed")[]>(
    ["open", "in-progress"],
  );

  const location = useLocation();
  const showToast = useNotificationStore((s) => s.showToast);

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

        const res = await api.get("/projects", {
          params: {
            page,
            limit: 12,
            search: debouncedSearch,
            status: filters.join(","), // send multiple statuses
          },
        });

        setProjects(res.data.data);
        setPages(res.data.pages);
      } catch {
        showToast("error", "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [page, debouncedSearch, filters]);

  /* ---------------- Debounce Search ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters]);

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
        const res = await api.get(`/projects/${projectId}`);

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
      <ProjectsHeader
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      <ProjectGrid
        projects={projects}
        page={page}
        pages={pages}
        setPage={setPage}
        loading={loading}
        error={null}
        onSelect={handleSelect}
        showToast={showToast}
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
    </DashboardLayout>
  );
}
