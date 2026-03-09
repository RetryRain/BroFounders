import ProjectCard from "@/sections/Projects/ProjectCard";
import type { Project } from "@/types/project";

export default function Featured() {
  const featuredProjects: Project[] = [
    {
      _id: "featured-1",
      title: "Rust Systems Engine",
      blurb: "Build a high-performance CLI for distributed log processing.",
      description:
        "Master ownership, memory safety and zero-cost abstractions while building a real Rust system tool.",
      techStack: ["Rust", "CLI", "Systems"],
      goals: [],
      lookingFor: "Systems engineers interested in Rust internals",
      members: [],
      maxMembers: 8,
      broadcast: "",
      status: "open",
      level: "advanced",
      user: { _id: "1", name: "Featured Host" },
      createdAt: new Date().toISOString(),
    },
    {
      _id: "featured-2",
      title: "K8s Native Lab",
      blurb: "Design self-healing microservices with Kubernetes CRDs.",
      description:
        "Learn orchestration patterns, scaling and resilience with a production style cluster project.",
      techStack: ["Kubernetes", "Go", "DevOps"],
      goals: [],
      lookingFor: "Developers interested in cloud-native architecture",
      members: [],
      maxMembers: 5,
      broadcast: "",
      status: "open",
      level: "intermediate",
      user: { _id: "2", name: "Featured Host" },
      createdAt: new Date().toISOString(),
    },
    {
      _id: "featured-3",
      title: "3D Web UX",
      blurb: "Build immersive interfaces with Three.js and WebGL.",
      description:
        "Push modern frontend interaction through 3D visualizations and real-time rendering.",
      techStack: ["Three.js", "WebGL", "React"],
      goals: [],
      lookingFor: "Creative frontend devs interested in 3D UX",
      members: [],
      maxMembers: 4,
      broadcast: "",
      status: "closed",
      level: "advanced",
      user: { _id: "3", name: "Featured Host" },
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <section className="max-w-300 w-full px-6 md:px-10 py-12 md:py-16 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 md:w-16 h-1.5 bg-accent rounded-full"></div>

          <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
            Featured Projects
          </h2>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featuredProjects.map((project) => (
          <ProjectCard key={project._id} project={project} onClick={() => {}} />
        ))}
      </div>
    </section>
  );
}
