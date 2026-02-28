import ProjectCard from "./ProjectCard";
import type { Project } from "@/types/project";
import type { Dispatch, SetStateAction } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  projects: Project[];
  page: number;
  pages: number;

  setPage: Dispatch<SetStateAction<number>>;
  loading: boolean;
  error: string | null;
  onSelect: (project: Project) => void;
}

export default function ProjectGrid({
  projects,
  page,
  pages,
  setPage,
  loading,
  error,
  onSelect,
}: Props) {
  if (loading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-card animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!projects.length) return <div>No projects found.</div>;

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onClick={() => onSelect(project)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={`cursor-pointer ${page === 1 && "opacity-50 pointer-events-none"}`}
            />
          </PaginationItem>

          {Array.from({ length: pages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
                className="cursor-pointer"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(Math.min(page + 1, pages))}
              className={`cursor-pointer ${page === pages && "opacity-50 pointer-events-none"}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
