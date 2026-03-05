import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/sections/Discovery/ProjectCard";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export default function MyTeamsRightPanel({ project, onOpenDetails }: Props) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white mb-2">{project.title}</h2>
        <p className="text-muted-foreground">{project.blurb}</p>
      </div>

      {/* Broadcast */}
      {project.broadcast && (
        <Card className="p-6 rounded-2xl mb-8 bg-white/5 border-white/10">
          <h4 className="text-sm font-bold text-white mb-2">Host Broadcast</h4>
          <p className="text-sm text-muted-foreground">{project.broadcast}</p>
        </Card>
      )}

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Development Environment */}
        <Card className="p-8 rounded-2xl bg-white/5 border-white/10 text-center flex flex-col items-center">
          <h3 className="text-lg font-bold text-white mb-2">
            Development Environment
          </h3>

          <p className="text-sm text-muted-foreground mb-8">
            Launch your pre-configured container.
          </p>

          <Button className="w-full bg-purple hover:bg-purple/90 text-white font-bold uppercase tracking-widest">
            Launch Workspace
          </Button>
        </Card>

        {/* Project Card → Opens Modal */}
        <ProjectCard project={project} onClick={() => onOpenDetails(project)} />
      </div>
    </div>
  );
}
