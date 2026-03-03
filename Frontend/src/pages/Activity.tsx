import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../sections/DashboardLayout";
import ActivityHeader from "@/sections/ActivityHeader";
import ActivityCard from "@/sections/ActivityCard";
import ActivityStatus from "@/sections/ActivityStatus";
import Toast from "@/modals/Toast";

const API = import.meta.env.VITE_API_URL;

export default function Activity() {
  const [activeTab, setActiveTab] = useState<"sent" | "received">("received");

  const [sent, setSent] = useState<any[]>([]);
  const [received, setReceived] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToastType(type);
    setToastMessage(message);
    setToastOpen(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        showToast("error", "You must be logged in.");
        return;
      }

      if (activeTab === "sent") {
        const res = await axios.get(`${API}/interests/me`, {
          headers: { "x-auth-token": token },
        });
        setSent(res.data.data);
      } else {
        const res = await axios.get(`${API}/interests/received/me`, {
          headers: { "x-auth-token": token },
        });
        setReceived(res.data);
      }
    } catch (err: any) {
      showToast("error", err?.response?.data || "Failed to fetch activity.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleResponse = async (
    interestId: string,
    status: "accepted" | "rejected",
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.patch(
        `${API}/interests/${interestId}`,
        { status },
        { headers: { "x-auth-token": token } },
      );

      showToast("success", `Request ${status}.`);

      // update state instead of reload
      setReceived((prev) =>
        prev.map((item) =>
          item._id === interestId ? { ...item, status } : item,
        ),
      );
    } catch (err: any) {
      showToast("error", err?.response?.data || "Failed to respond.");
    }
  };

  return (
    <DashboardLayout>
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type={toastType}
        message={toastMessage}
      />

      <ActivityHeader />

      <ActivityCard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sent={sent}
        received={received}
        loading={loading}
        onRespond={handleResponse}
      />

      <ActivityStatus />
    </DashboardLayout>
  );
}
