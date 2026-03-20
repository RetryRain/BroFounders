import { useState } from "react";
import ProjectCard from "@/sections/Projects/ProjectCard";
import type { Project } from "@/types/project";

/* TEMP inline toast (since you said duplicate for now) */
function Toast({
  open,
  type,
  message,
}: {
  open: boolean;
  type: "success" | "error";
  message: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`px-5 py-3 rounded-xl text-sm font-semibold shadow-lg ${
          type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
}

export default function Featured() {
  const [toast, setToast] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ open: true, type, message });

    setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 2500);
  };

  const featuredProjects: Project[] = [
    {
      _id: "featured-1",
      title: "Built By People Like You",
      blurb:
        "Not unicorns. Not polished. Just people figuring it out and shipping anyway.",
      description: "",
      techStack: ["Builders", "Curiosity", "Shipping"],
      goals: [],
      lookingFor: "",
      members: [
        { _id: "u1", name: "A" },
        { _id: "u2", name: "B" },
        { _id: "u3", name: "C" },
      ],
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
      blurb: "You don’t need to be great. You just need to start.",
      description: "",
      techStack: ["Experimenting", "Learning", "Building"],
      goals: [],
      lookingFor: "",
      members: [
        { _id: "u1", name: "A" },
        { _id: "u2", name: "B" },
        { _id: "u3", name: "C" },
        { _id: "u4", name: "D" },
      ],
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
      blurb: "You need the right 2–3 people who actually build.",
      description: "",
      techStack: ["Teamwork", "Ideas", "Execution"],
      goals: [],
      lookingFor: "",
      members: [{ _id: "u3", name: "C" }],
      maxMembers: 2,
      broadcast: "",
      status: "open",
      level: "chaos",
      user: { _id: "3", name: "BroFounders" },
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <>
      {/* SECTION */}
      <section className="max-w-300 w-full px-6 md:px-10 py-15 md:pt-30 md:pb-20 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 md:w-16 h-1.5 bg-accent rounded-full"></div>

            <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight uppercase">
              FIND YOUR PROJECT
            </h2>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onClick={() => {}}
              showToast={showToast} // ✅ FIX
            />
          ))}
        </div>
      </section>

      {/* Toast */}
      <Toast {...toast} />
    </>
  );
}
