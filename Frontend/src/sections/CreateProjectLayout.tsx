import CreateProjectDetailsForm from "./CreateProjectDetailsForm";
import ProjectCard from "../sections/ProjectCard";
import GoalsCard from "./GoalsCard";
import type { Project } from "@/types/project";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  title: Project["title"];
  setTitle: Dispatch<SetStateAction<Project["title"]>>;

  blurb: Project["blurb"];
  setBlurb: Dispatch<SetStateAction<Project["blurb"]>>;

  description: Project["description"];
  setDescription: Dispatch<SetStateAction<Project["description"]>>;

  techStack: Project["techStack"];
  setTechStack: Dispatch<SetStateAction<Project["techStack"]>>;

  level: Project["level"];
  setLevel: Dispatch<SetStateAction<Project["level"]>>;

  maxMembers: Project["maxMembers"];
  setMaxMembers: Dispatch<SetStateAction<Project["maxMembers"]>>;

  goals: Project["goals"];
  setGoals: Dispatch<SetStateAction<Project["goals"]>>;

  lookingFor: Project["lookingFor"];
  setLookingFor: Dispatch<SetStateAction<Project["lookingFor"]>>;

  broadcast: Project["broadcast"];
  setBroadcast: Dispatch<SetStateAction<Project["broadcast"]>>;
}

export default function CreateProjectLayout({
  title,
  setTitle,
  blurb,
  setBlurb,
  description,
  setDescription,
  techStack,
  setTechStack,
  level,
  setLevel,
  maxMembers,
  setMaxMembers,
  goals,
  setGoals,
  lookingFor,
  setLookingFor,
  broadcast,
  setBroadcast,
}: Props) {
  // Live Preview Project
  const previewProject: Project = {
    _id: "preview",
    title,
    blurb,
    description,
    techStack,
    goals,
    lookingFor,
    members: [],
    maxMembers,
    broadcast: broadcast,
    status: "open",
    level,
    user: { _id: "preview-user", name: "You" },
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT — FORM */}
      <div className="lg:col-span-7">
        <CreateProjectDetailsForm
          title={title}
          setTitle={setTitle}
          blurb={blurb}
          setBlurb={setBlurb}
          description={description}
          setDescription={setDescription}
          techStack={techStack}
          setTechStack={setTechStack}
          level={level}
          setLevel={setLevel}
          maxMembers={maxMembers}
          setMaxMembers={setMaxMembers}
          lookingFor={lookingFor}
          setLookingFor={setLookingFor}
          broadcast={broadcast}
          setBroadcast={setBroadcast}
        />
      </div>

      {/* RIGHT — LIVE PREVIEW */}
      <div className="lg:col-span-5">
        <ProjectCard project={previewProject} onClick={() => {}} />
        <GoalsCard goals={goals} setGoals={setGoals} />
      </div>
    </div>
  );
}
