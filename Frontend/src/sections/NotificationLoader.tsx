import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "@/lib/api";
import { useNotificationStore } from "@/store/notifications";

export default function NotificationLoader() {
  const setUnreadActivity = useNotificationStore((s) => s.setUnreadActivity);
  const setNewTeam = useNotificationStore((s) => s.setNewTeam);
  const location = useLocation();

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        /* Activity notifications */
        const activityRes = await api.get(`/interests/received/me`);

        const hasPending = activityRes.data.some(
          (item: any) => item.status === "pending",
        );

        if (location.pathname.startsWith("/activity")) {
          setUnreadActivity(false);
        } else {
          setUnreadActivity(hasPending);
        }

        /* Team notifications */
        const teamRes = await api.get(`/projects/my-teams`);

        const prevCount = localStorage.getItem("teamCount");

        if (!prevCount) {
          localStorage.setItem("teamCount", teamRes.data.length);
        } else {
          const prev = parseInt(prevCount);
          const current = teamRes.data.length;

          if (current > prev) {
            setNewTeam(true);
          }

          localStorage.setItem("teamCount", current.toString());
        }

        if (location.pathname.startsWith("/my-teams")) {
          setNewTeam(false);
        }
      } catch {
        setUnreadActivity(false);
        setNewTeam(false);
      }
    };

    checkNotifications();

    const interval = setInterval(checkNotifications, 30000);

    return () => clearInterval(interval);
  }, [setUnreadActivity, setNewTeam, location.pathname]);

  return null;
}
