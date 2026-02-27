import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function RegisterPanel() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!form.terms) return alert("Accept the terms first.");
    if (form.password !== form.confirmPassword)
      return alert("Passwords do not match.");

    try {
      const res = await axios.post(`${API}/users`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/projects");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data || "Request failed");
      } else {
        alert("Something unexpected happened");
      }
    }
  };
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
        <p className="text-muted-foreground">
          Start building projects with the community.
        </p>
      </div>
      <Card className="p-8 space-y-6 shadow-xl border">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {/* Terms */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={form.terms}
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, terms: Boolean(checked) }))
              }
            />
            <Label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed"
            >
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </Label>
          </div>
          {/* Submit */}
          <Button type="submit" className="w-full cursor-pointer">
            Create Account →
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
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
            >
              GitHub
            </Button>
          </div>
        </form>
      </Card>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-bold text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
