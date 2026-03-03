import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "@/types/project";

import DashboardLayout from "@/sections/Dashboard/DashboardLayout";
import CreateProjectHeader from "@/sections/CreateProject/CreateProjectHeader";
import CreateProjectLayout from "@/sections/CreateProject/CreateProjectLayout";
import Toast from "@/modals/Toast";

const API = import.meta.env.VITE_API_URL;

export default function CreateProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

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
  // UI STATE
  // =========================
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Toast (system errors only)
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [toastMessage, setToastMessage] = useState("");

  // =========================
  // FETCH PROJECT (EDIT MODE)
  // =========================
  useEffect(() => {
    if (!isEdit) return;

    const fetchProject = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API}/projects/${id}`, {
          headers: { "x-auth-token": token },
        });

        const p = res.data;

        setTitle(p.title);
        setBlurb(p.blurb);
        setDescription(p.description);
        setTechStack(p.techStack);
        setLevel(p.level);
        setMaxMembers(p.maxMembers);

        // Always ensure 4 goals
        const paddedGoals = [...p.goals];
        while (paddedGoals.length < 4) {
          paddedGoals.push("");
        }
        setGoals(paddedGoals);

        setLookingFor(p.lookingFor);
        setBroadcast(p.broadcast);
      } catch (err: any) {
        setError(err?.response?.data || "Failed to load project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, isEdit]);

  // =========================
  // SUBMIT HANDLER
  // =========================
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setToastType("error");
        setToastMessage("Session expired. Please log in again.");
        setToastOpen(true);

        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);

        return;
      }

      // if (!token) {
      //   navigate("/auth/login", {
      //     state: { error: "Please log in to continue." },
      //   });
      //   return;
      // }

      const cleanedGoals = goals
        .map((g) => g.trim())
        .filter((g) => g.length > 0);

      // Inline validation errors
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

      const payload = {
        title,
        blurb,
        description,
        techStack,
        level,
        goals: cleanedGoals,
        lookingFor,
        maxMembers,
        broadcast,
      };

      if (isEdit) {
        await axios.put(`${API}/projects/${id}`, payload, {
          headers: { "x-auth-token": token },
        });
      } else {
        await axios.post(`${API}/projects`, payload, {
          headers: { "x-auth-token": token },
        });
      }

      navigate("/projects", {
        state: {
          success: isEdit ? "updated" : "created",
        },
      });
    } catch (err: any) {
      setToastType("error");
      setToastMessage(
        err?.response?.data || "Something went wrong. Please try again.",
      );
      setToastOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center text-muted-foreground">
          Loading project...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <CreateProjectHeader
        onLaunch={handleSubmit}
        submitting={submitting}
        title={isEdit ? "Update Project" : "Launch Project"}
        mode={isEdit ? "edit" : "create"}
      />

      {/* Inline Validation Error */}
      {error && (
        <div className="mb-6 text-red-400 text-sm font-medium">{error}</div>
      )}

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

      {/* System Toast */}
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type={toastType}
        message={toastMessage}
      />
    </DashboardLayout>
  );
}
