import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/sections/Projects/ProjectCard";
import type { Project } from "@/types/project";
import { useNotificationStore } from "@/store/notifications";

interface Props {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

/*
Extract URL even if buried inside messy broadcast text

Works with:
https://discord.gg/abc
http://example.com
www.google.com
google.com
*/
function extractLink(text?: string) {
  if (!text) return null;

  const regex =
    /((https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)/i;

  const match = text.match(regex);
  if (!match) return null;

  let url = match[0];

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  return url;
}

export default function MyTeamsRightPanel({ project, onOpenDetails }: Props) {
  const showToast = useNotificationStore((s) => s.showToast);

  const workspaceLink = extractLink(project.broadcast);

  const handleCopyId = (id: string, name: string) => {
    navigator.clipboard.writeText(id);
    showToast("success", `${name}'s ID copied to clipboard`);
  };

  const handleLaunchWorkspace = () => {
    if (!workspaceLink) {
      showToast("error", "No workspace link detected in broadcast.");
      return;
    }

    try {
      window.open(workspaceLink, "_blank", "noopener,noreferrer");
      showToast("success", "Workspace launched.");
    } catch {
      showToast("error", "Failed to launch workspace.");
    }
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
        {/* Project Members */}
        <Card className="p-8 rounded-2xl bg-white/5 border-white/10">
          <h3 className="text-lg font-bold text-white mb-6">Project Members</h3>

          <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1">
            {project.members.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-white font-medium">{member.name}</span>

                  {member._id === project.user._id && (
                    <span className="text-[10px] text-purple ml-2">
                      (Big Bro)
                    </span>
                  )}
                </div>

                <button
                  title="Copy User ID"
                  onClick={() => handleCopyId(member._id, member.name)}
                  className="flex items-center justify-center size-7 rounded-md hover:bg-white/10 transition"
                >
                  <span className="cursor-pointer material-symbols-rounded text-sm text-muted-foreground">
                    content_copy
                  </span>
                </button>
              </div>
            ))}
          </div>

          <Button
            onClick={handleLaunchWorkspace}
            disabled={!workspaceLink}
            className="cursor-pointer w-full bg-purple hover:bg-purple/90 text-white font-bold uppercase tracking-widest disabled:opacity-50"
          >
            Launch Workspace
          </Button>
        </Card>

        {/* Project Card */}
        <div className="min-w-0">
          <ProjectCard
            project={project}
            onClick={() => onOpenDetails(project)}
            showToast={showToast}
          />
        </div>
      </div>
    </div>
  );
}
