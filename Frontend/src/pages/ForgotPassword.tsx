import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Toast from "@/modals/Toast";

const API = import.meta.env.VITE_API_URL;

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToastType(type);
    setToastMessage(message);
    setToastOpen(true);
  };

  const handleSend = async () => {
    if (!email) return;

    try {
      setSending(true);

      await axios.post(`${API}/auth/forgot-password`, { email });

      showToast("success", "Password reset link has been sent.");

      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch {
      showToast("error", "Failed to send reset email.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-background text-white px-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Forgot Password</h1>

        <p className="text-sm text-muted-foreground mb-6">
          Enter your email and we'll send a reset link.
        </p>

        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />

        <Button
          onClick={handleSend}
          disabled={sending}
          className="w-full bg-purple hover:bg-purple/90"
        >
          {sending ? "Sending..." : "Send Reset Link"}
        </Button>
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
