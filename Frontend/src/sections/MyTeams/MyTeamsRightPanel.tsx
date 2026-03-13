import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/sections/Projects/ProjectCard";
import type { Project } from "@/types/project";
import { useNotificationStore } from "@/store/notifications";

interface Props {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export default function MyTeamsRightPanel({ project, onOpenDetails }: Props) {
  const showToast = useNotificationStore((s) => s.showToast);

  const handleCopyId = (id: string, name: string) => {
    navigator.clipboard.writeText(id);
    showToast("success", `${name}'s ID copied to clipboard`);
  };

  return (
    <div className="min-w-0">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white mb-2 wrap-break-word">
          {project.title}
        </h2>

        <p className="text-muted-foreground wrap-break-word line-clamp-2">
          {project.blurb}
        </p>
      </div>

      {/* Broadcast */}
      <Card className="p-6 rounded-2xl mb-8 bg-white/5 border-white/10">
        <h4 className="text-sm font-bold text-white mb-2">Host Broadcast</h4>

        <p className="text-sm text-muted-foreground wrap-break-word">
          {project.broadcast}
        </p>
      </Card>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 min-w-0">
        {/* Development Environment */}
        <Card className="p-8 rounded-2xl bg-white/5 border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">
            Development Environment
          </h3>

          <div className="space-y-3 mb-6">
            {project.members.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-white font-medium">{member.name}</span>

                  {member._id === project.user._id && (
                    <span className="text-[10px] text-purple ml-2">(Host)</span>
                  )}
                </div>

                <button
                  title="Copy ID"
                  onClick={() => handleCopyId(member._id, member.name)}
                  className="flex items-center justify-center size-7 rounded-md hover:bg-white/10 transition"
                >
                  <span className="material-symbols-rounded text-sm text-muted-foreground">
                    content_copy
                  </span>
                </button>
              </div>
            ))}
          </div>

          <Button className="w-full bg-purple hover:bg-purple/90 text-white font-bold uppercase tracking-widest">
            Launch Workspace
          </Button>
        </Card>

        {/* Project Card */}
        <div className="min-w-0">
          <ProjectCard
            project={project}
            onClick={() => onOpenDetails(project)}
          />
        </div>
      </div>
    </div>
  );
}
