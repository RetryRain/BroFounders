import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Toast from "@/modals/Toast";

const API = import.meta.env.VITE_API_URL;

export default function PasswordReset() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  /* Toast */
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToastType(type);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleReset = async () => {
    if (password.length < 6)
      return showToast("error", "Password must be at least 6 characters.");

    if (password !== confirm)
      return showToast("error", "Passwords do not match.");

    try {
      setLoading(true);

      await axios.post(`${API}/auth/reset-password`, {
        token,
        password,
      });

      showToast("success", "Password reset successful.");

      setTimeout(() => {
        navigate("/auth");
      }, 1200);
    } catch {
      showToast("error", "Invalid or expired reset link.");
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

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type={toastType}
        message={toastMessage}
      />
    </div>
  );
}
