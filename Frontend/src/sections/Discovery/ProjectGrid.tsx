import ProjectCard from "../Discovery/ProjectCard";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-40 sm:h-48 bg-card animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );

  if (error)
    return (
      <div className="text-xs sm:text-sm text-muted-foreground">{error}</div>
    );

  if (!projects.length)
    return (
      <div className="md:text-6xl text-4xl text-muted-foreground text-center">
        Create a project and team up!
      </div>
    );

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onClick={() => onSelect(project)}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination>
        <PaginationContent className="flex-wrap justify-center gap-1 sm:gap-2 text-sm">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className={`cursor-pointer ${
                page === 1 && "opacity-50 pointer-events-none"
              }`}
            />
          </PaginationItem>

          {Array.from({ length: pages }).map((_, i) => {
            const p = i + 1;

            if (pages > 5 && Math.abs(page - p) > 2) return null;

            return (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === p}
                  onClick={() => setPage(p)}
                  className="cursor-pointer text-xs sm:text-sm px-2 sm:px-3"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(Math.min(page + 1, pages))}
              className={`cursor-pointer ${
                page === pages && "opacity-50 pointer-events-none"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
