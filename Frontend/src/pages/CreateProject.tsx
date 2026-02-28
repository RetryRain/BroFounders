import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { Project } from "@/types/project";

import DashboardLayout from "@/sections/DashboardLayout";
import CreateProjectHeader from "@/sections/CreateProjectHeader";
import CreateProjectLayout from "@/sections/CreateProjectLayout";

const API = import.meta.env.VITE_API_URL;

export default function CreateProject() {
  const navigate = useNavigate();

  // =========================
  // FORM STATE
  // =========================
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);

  const [level, setLevel] = useState<Project["level"]>("intermediate");
  const [maxMembers, setMaxMembers] = useState(5);
  const [goals, setGoals] = useState<string[]>(["", "", "", ""]);
  const [lookingFor, setLookingFor] = useState("");
  const [broadcast, setBroadcast] = useState("");

  // =========================
  // SUBMIT STATE
  // =========================
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =========================
  // SUBMIT HANDLER
  // =========================
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in.");
        return;
      }

      const cleanedGoals = goals
        .map((g) => g.trim())
        .filter((g) => g.length > 0);

      if (!title || !blurb || !description || !lookingFor || !broadcast) {
        setError("Please fill all required fields.");
        return;
      }

      if (techStack.length < 1) {
        setError("Select at least one tech stack.");
        return;
      }

      if (cleanedGoals.length < 1) {
        setError("At least one goal is required.");
        return;
      }

      await axios.post(
        `${API}/projects`,
        {
          title,
          blurb,
          description,
          techStack,
          level,
          goals: cleanedGoals,
          lookingFor,
          maxMembers,
          broadcast,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      navigate("/projects");
    } catch (err: any) {
      setError(err?.response?.data || "Failed to launch project.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      {/* HEADER */}
      <CreateProjectHeader onLaunch={handleSubmit} submitting={submitting} />

      {/* ERROR DISPLAY */}
      {error && (
        <div className="mb-6 text-red-400 text-sm font-medium">{error}</div>
      )}

      {/* FORM + PREVIEW */}
      <CreateProjectLayout
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
        goals={goals}
        setGoals={setGoals}
        lookingFor={lookingFor}
        setLookingFor={setLookingFor}
        broadcast={broadcast}
        setBroadcast={setBroadcast}
      />
    </DashboardLayout>
  );
}
