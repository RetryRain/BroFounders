import { useEffect, useState } from "react";
import DashboardLayout from "../sections/Dashboard/DashboardLayout";
import ActivityHeader from "@/sections/Activity/ActivityHeader";
import ActivityCard from "@/sections/Activity/ActivityCard";
import { useNotificationStore } from "@/store/notifications";
import api from "@/lib/api";

export default function Activity() {
  const [activeTab, setActiveTab] = useState<"sent" | "received">("received");

  const [sent, setSent] = useState<any[]>([]);
  const [received, setReceived] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const setUnreadActivity = useNotificationStore((s) => s.setUnreadActivity);
  const showToast = useNotificationStore((s) => s.showToast);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (activeTab === "sent") {
        const res = await api.get(`/interests/me`);

        setSent(res.data.data);
      } else {
        const res = await api.get(`/interests/received/me`);

        setReceived(res.data);

        const hasPending = res.data.some(
          (item: any) => item.status === "pending",
        );

        setUnreadActivity(hasPending);
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

  // clear notification when page opens
  useEffect(() => {
    setUnreadActivity(false);
  }, []);

  const handleResponse = async (
    interestId: string,
    status: "accepted" | "rejected",
  ) => {
    try {
      await api.patch(`/interests/${interestId}`, { status });

      showToast("success", `Request ${status}.`);

      const updated = received.map((item) =>
        item._id === interestId ? { ...item, status } : item,
      );

      setReceived(updated);

      const hasPending = updated.some((item) => item.status === "pending");
      setUnreadActivity(hasPending);
    } catch (err: any) {
      showToast("error", err?.response?.data || "Failed to respond.");
    }
  };

  return (
    <DashboardLayout>
      <ActivityHeader />

      <ActivityCard
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sent={sent}
        received={received}
        loading={loading}
        onRespond={handleResponse}
      />
    </DashboardLayout>
  );
}
