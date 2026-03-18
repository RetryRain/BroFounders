import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import { GoogleLogin } from "@react-oauth/google";
import { useNotificationStore } from "@/store/notifications";

const API = import.meta.env.VITE_API_URL;

export default function LoginPanel() {
  const navigate = useNavigate();
  const showToast = useNotificationStore((s) => s.showToast);

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  /*
  Shared login logic
  */
  const loginWithToken = async (token: string) => {
    localStorage.setItem("token", token);

    const me = await api.get(`/users/me`);

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
      const res = await api.post(`/auth`, {
        email: form.email,
        password: form.password,
        remember: form.remember,
      });

      await loginWithToken(res.data.token);

      navigate("/projects");
    } catch (err: any) {
      if (err?.response) {
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome Back!</h2>
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
                  const res = await api.post(`/auth/google`, {
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
              className="w-full p-5 rounded-[5px] cursor-pointer flex items-center justify-center gap-2 h-10 bg-black text-white hover:bg-black/90 border border-neutral-700"
              onClick={() => {
                window.location.href = `${API}/auth/github`;
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-white"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12A11.5 11.5 0 008 22.94c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.74.08-.74 1.21.09 1.84 1.24 1.84 1.24 1.08 1.85 2.84 1.31 3.53 1 .11-.79.42-1.31.76-1.61-2.67-.31-5.48-1.34-5.48-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.57.12-3.27 0 0 1.01-.32 3.3 1.23A11.44 11.44 0 0112 6.8c1.02 0 2.05.14 3.01.41 2.28-1.55 3.29-1.23 3.29-1.23.67 1.7.25 2.96.12 3.27.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.64-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              Continue with GitHub
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
    </div>
  );
}
