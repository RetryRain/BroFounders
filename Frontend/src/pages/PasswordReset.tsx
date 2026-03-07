import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function PasswordReset() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (password.length < 5)
      return alert("Password must be at least 6 characters.");

    if (password !== confirm) return alert("Passwords do not match.");

    try {
      setLoading(true);

      await axios.post(`${API}/auth/reset-password`, {
        token,
        password,
      });

      alert("Password reset successful.");
      navigate("/auth");
    } catch {
      alert("Invalid or expired reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-background text-white">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-96">
        <h1 className="text-xl font-bold mb-6">Reset Password</h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full mb-4 p-3 rounded bg-white/10"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full mb-6 p-3 rounded bg-white/10"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-purple py-3 rounded font-bold"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
