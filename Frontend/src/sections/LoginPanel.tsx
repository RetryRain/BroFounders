import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function LoginPanel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Login
      const res = await axios.post(`${API}/auth`, {
        email: form.email,
        password: form.password,
      });

      const token = res.data.token;

      // 2️⃣ Store token
      localStorage.setItem("token", token);

      // 3️⃣ Fetch user profile
      const me = await axios.get(`${API}/users/me`, {
        headers: { "x-auth-token": token },
      });

      // 4️⃣ Store user
      localStorage.setItem("user", JSON.stringify(me.data));

      // 5️⃣ Navigate
      navigate("/projects");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data || "Login failed");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">
          Enter your details to access your projects.
        </p>
      </div>

      <Card className="p-8 space-y-6 shadow-xl border">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot password?
              </a>
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
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" className="w-full cursor-pointer">
              Google
            </Button>
            <Button type="button" className="w-full cursor-pointer">
              GitHub
            </Button>
          </div>
        </form>
      </Card>

      <p className="mt-8 text-center text-sm text-muted-foreground">
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
