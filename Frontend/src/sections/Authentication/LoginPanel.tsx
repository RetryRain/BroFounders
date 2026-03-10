import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Toast from "@/modals/Toast";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const API = import.meta.env.VITE_API_URL;

export default function LoginPanel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  /* Toast */
  const [toastOpen, setToastOpen] = useState(false);
  const [toastType, setToastType] = useState<"success" | "error">("error");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setToastType(type);
    setToastMessage(message);
    setToastOpen(true);
  };

  /*
  Shared login logic
  */
  const loginWithToken = async (token: string) => {
    localStorage.setItem("token", token);

    const me = await axios.get(`${API}/users/me`, {
      headers: { "x-auth-token": token },
    });

    localStorage.setItem("user", JSON.stringify(me.data));
  };

  /*
  Detect GitHub OAuth errors
  */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error === "github") {
      showToast("error", "GitHub login failed");
    }
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/auth`, {
        email: form.email,
        password: form.password,
      });

      await loginWithToken(res.data.token);

      navigate("/projects");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        showToast("error", err.response?.data || "Login failed");
      } else {
        showToast("error", "Something went wrong");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md px-2 sm:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Enter your details to access your projects.
        </p>
      </div>

      {/* Card */}
      <Card className="p-5 sm:p-8 space-y-6 shadow-xl border">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input onChange={handleChange} id="email" type="email" required />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                to="/auth/forgot-password"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Input
              onChange={handleChange}
              id="password"
              type="password"
              required
            />
          </div>

          {/* Remember */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={form.remember}
              onCheckedChange={(checked) =>
                setForm((prev) => ({
                  ...prev,
                  remember: Boolean(checked),
                }))
              }
            />

            <Label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me for 30 days
            </Label>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full cursor-pointer">
            Sign In →
          </Button>

          {/* Separator */}
          <div className="relative my-5 sm:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Google */}
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await axios.post(`${API}/auth/google`, {
                    token: credentialResponse.credential,
                  });

                  await loginWithToken(res.data.token);

                  navigate("/projects");
                } catch {
                  showToast("error", "Google login failed");
                }
              }}
              onError={() => showToast("error", "Google login failed")}
            />

            {/* GitHub */}
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => {
                window.location.href = `${API}/auth/github`;
              }}
            >
              GitHub
            </Button>
          </div>
        </form>
      </Card>

      {/* Footer */}
      <p className="mt-6 sm:mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/auth/register"
          className="font-bold text-primary hover:underline"
        >
          Sign up for free
        </Link>
      </p>

      {/* Toast */}
      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        type={toastType}
        message={toastMessage}
      />
    </div>
  );
}
