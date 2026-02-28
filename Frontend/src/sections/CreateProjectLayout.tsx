import { useState } from "react";
import ProjectDetailsForm from "../sections/ProjectDetailsForm";
import ProjectCard from "../sections/ProjectCard";

export default function CreateProjectLayout() {
  const [title, setTitle] = useState("Decentralized Asset Hub");
  const [description, setDescription] = useState(
    "Building a high-performance cross-chain liquidity protocol using Rust and Substrate. Aiming for low latency and high security.",
  );
  const [tags, setTags] = useState<string[]>(["Rust", "Solana", "Wasm"]);
  const [maxMembers, setMaxMembers] = useState(5);
  const members = 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT */}
      <div className="lg:col-span-7">
        <ProjectDetailsForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          tags={tags}
          setTags={setTags}
          maxMembers={maxMembers}
          setMaxMembers={setMaxMembers}
        />
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-5">
        <ProjectCard
          title={title}
          description={description}
          tags={tags}
          members={members}
          maxMembers={maxMembers}
          status="open"
        />
      </div>
    </div>
  );
}
