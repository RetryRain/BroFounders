import { useState } from "react";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "@/store/notifications";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const showToast = useNotificationStore((s) => s.showToast);

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const RATE_LIMIT_KEY = "forgot_password_attempts";
  const MAX_ATTEMPTS = 2;
  const WINDOW_MS = 10 * 60 * 1000;

  const handleSend = async () => {
    if (!email) return;

    const now = Date.now();

    const attempts = JSON.parse(
      localStorage.getItem(RATE_LIMIT_KEY) || "[]",
    ) as number[];

    const recentAttempts = attempts.filter((t) => now - t < WINDOW_MS);

    if (recentAttempts.length >= MAX_ATTEMPTS) {
      showToast("error", "Too many requests. Try again later.");
      return;
    }

    try {
      setSending(true);

      await api.post(`/auth/forgot-password`, { email });

      const updatedAttempts = [...recentAttempts, now];
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(updatedAttempts));

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
    <div className="min-h-screen sm:min-h-0 flex items-center justify-center bg-dark-background text-white px-4">
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
          className="w-full bg-purple hover:bg-purple/90 cursor-pointer"
        >
          {sending ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>
    </div>
  );
}
