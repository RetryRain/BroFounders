import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNotificationStore } from "@/store/notifications";

const API = import.meta.env.VITE_API_URL;

export default function NotificationLoader() {
  const setUnreadActivity = useNotificationStore((s) => s.setUnreadActivity);
  const setNewTeam = useNotificationStore((s) => s.setNewTeam);
  const location = useLocation();

  useEffect(() => {
    const checkNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        /* Activity notifications */
        const activityRes = await axios.get(`${API}/interests/received/me`, {
          headers: { "x-auth-token": token },
        });

        const hasPending = activityRes.data.some(
          (item: any) => item.status === "pending",
        );

        if (location.pathname.startsWith("/activity")) {
          setUnreadActivity(false);
        } else {
          setUnreadActivity(hasPending);
        }

        /* Team notifications */
        const teamRes = await axios.get(`${API}/projects/my-teams`, {
          headers: { "x-auth-token": token },
        });

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
