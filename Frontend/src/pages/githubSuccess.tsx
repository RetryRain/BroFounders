import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function GithubSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const login = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/auth/login");
        return;
      }

      try {
        localStorage.setItem("token", token);

        const me = await axios.get(`${API}/users/me`, {
          headers: { "x-auth-token": token },
        });

        localStorage.setItem("user", JSON.stringify(me.data));

        navigate("/projects");
      } catch {
        localStorage.removeItem("token");
        navigate("/auth/login");
      }
    };

    login();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      Logging you in...
    </div>
  );
}
