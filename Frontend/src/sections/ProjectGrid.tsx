import { useState } from "react";
import ProjectCard from "./ProjectCard";
import type { ProjectCardProps } from "./ProjectCard";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProjectDetails from "./ProjectDetails";

const projects: ProjectCardProps[] = [
  {
    title: "Decentralized Asset Hub",
    description:
      "Building a high-performance cross-chain liquidity protocol using Rust and Substrate.Building a high-performance cross-chain liquidity protocol using Rust and Substrate.Building a high-performance cross-chain liquidity protocol using Rust and Substrate.Building a high-performance cross-chain liquidity protocol using Rust and Substrate.Building a high-performance cross-chain liquidity protocol using Rust and Substrate.",
    tags: ["Rust", "Solana", "Wasm"],
    members: 2,
    maxMembers: 5,
    status: "open",
    weeksLeft: 3,
  },
  {
    title: "Real-time Analytics Engine",
    description:
      "Streaming data processing pipeline for high-throughput IoT sensors using Go and Kafka.",
    tags: ["Go", "gRPC", "Redis"],
    members: 4,
    maxMembers: 4,
    status: "in-progress",
  },
  {
    title: "AI Collaborative Editor",
    description:
      "NextJS based collaborative workspace with integrated LLM pairing capabilities.",
    tags: ["Next.js", "Python", "OpenAI"],
    members: 1,
    maxMembers: 3,
    status: "open",
  },
  {
    title: "Kotlin Multiplatform App",
    description:
      "Mobile first productivity tool sharing logic between Android and iOS via KMP.",
    tags: ["Kotlin", "Compose", "SwiftUI"],
    members: 3,
    maxMembers: 3,
    status: "closed",
  },
];

const ITEMS_PER_PAGE = 6;

export default function ProjectGrid() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentProjects = projects.slice(start, start + ITEMS_PER_PAGE);

  const [selectedProject, setSelectedProject] =
    useState<ProjectCardProps | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (project: ProjectCardProps) => {
    setSelectedProject(project);
    setOpen(true);
  };

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {currentProjects.map((project) => (
          <div key={project.title} onClick={() => handleOpen(project)}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="cursor-pointer"
            />
          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, i) => (
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
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <ProjectDetails
        project={selectedProject}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
