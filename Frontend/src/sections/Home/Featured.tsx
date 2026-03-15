import ProjectCard from "@/sections/Projects/ProjectCard";
import type { Project } from "@/types/project";

export default function Featured() {
  const featuredProjects: Project[] = [
    {
      _id: "featured-1",
      title: "Built By People Like You",
      blurb: "These aren't corporate products or startup unicorns.",
      description: "",
      techStack: ["Builders", "Curiosity", "Shipping"],
      goals: [],
      lookingFor: "",
      members: [],
      maxMembers: 5,
      broadcast: "",
      status: "open",
      level: "beginner",
      user: { _id: "1", name: "BroFounders" },
      createdAt: new Date().toISOString(),
    },
    {
      _id: "featured-2",
      title: "No Experts Required",
      blurb:
        "You don't need to be the best. You just need to be alive, curious and willing ",
      description: "",
      techStack: ["Experimenting", "Learning", "Building"],
      goals: [],
      lookingFor: "",
      members: [],
      maxMembers: 5,
      broadcast: "",
      status: "open",
      level: "intermediate",
      user: { _id: "2", name: "BroFounders" },
      createdAt: new Date().toISOString(),
    },
    {
      _id: "featured-3",
      title: "Small Teams, Big Learning",
      blurb:
        "Great projects don't always start with huge teams. Sometimes all it takes is a couple.",
      description: "",
      techStack: ["Teamwork", "Ideas", "Execution"],
      goals: [],
      lookingFor: "",
      members: [],
      maxMembers: 5,
      broadcast: "",
      status: "open",
      level: "chaos",
      user: { _id: "3", name: "BroFounders" },
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <section className="max-w-300 w-full px-6 md:px-10 py-15 md:py-30 mx-auto">
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
