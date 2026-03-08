import DashboardLayout from "@/sections/Dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const API = import.meta.env.VITE_API_URL;

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState("");

  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setUser(parsed);
    setName(parsed.name);
  }, []);

  const hasChanges = user && name !== user.name;

  const handleSave = async () => {
    try {
      if (!user) return;

      setSaving(true);

      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.put(
        `${API}/users/${user._id}`,
        { name },
        { headers: { "x-auth-token": token } },
      );

      const updatedUser = res.data;

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(updatedUser);
      setName(updatedUser.name);
    } catch {
      console.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleSendReset = async () => {
    try {
      if (!user) return;

      setSendingReset(true);

      await axios.post(`${API}/auth/forgot-password`, {
        email: user.email,
      });

      alert("Password reset email sent.");
    } catch {
      alert("Failed to send reset email.");
    } finally {
      setSendingReset(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) return;

      setDeleting(true);

      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`${API}/users/${user._id}`, {
        headers: { "x-auth-token": token },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/auth";
    } catch {
      console.error("Failed to delete account");
    } finally {
      setDeleting(false);
      setDeleteOpen(false);
    }
  };

  const handleCancel = () => {
    if (!user) return;

    setName(user.name);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-8 sm:py-10 px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Manage Your Profile
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground">
            Update your personal information and account security.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="bg-white/5 border-white/10 rounded-2xl mb-6 sm:mb-8">
          <CardContent className="p-5 sm:p-6 space-y-6">
            {/* User ID */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  User ID
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  Your unique account identifier.
                </p>
              </div>

              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-full sm:w-64">
                <div className="text-xs font-mono text-white/80 truncate">
                  {user?._id}
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(user?._id || "")}
                  className="text-white/50 hover:text-purple transition"
                >
                  <span className="material-symbols-rounded text-sm">
                    content_copy
                  </span>
                </button>
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  Display Name
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  How you appear to squad members.
                </p>
              </div>

              <Input
                className="w-full sm:w-64 bg-white/5 border-white/10"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-semibold text-white text-sm sm:text-base">
                  Email Address
                </p>

                <p className="text-xs sm:text-sm text-muted-foreground">
                  Primary email for notifications.
                </p>
              </div>

              <Input
                type="email"
                readOnly
                className="w-full sm:w-64 bg-white/5 border-white/10 opacity-70 cursor-not-allowed"
                value={user?.email || ""}
              />
            </div>

            {/* Password Reset */}
            <div>
              <p className="font-semibold text-white text-sm sm:text-base mb-2">
                Password
              </p>

              <Button
                onClick={handleSendReset}
                disabled={sendingReset}
                className="bg-purple hover:bg-purple/90 text-white w-full sm:w-auto"
              >
                {sendingReset
                  ? "Sending reset email..."
                  : "Send Password Reset Email"}
              </Button>

              <p className="text-[11px] sm:text-xs text-muted-foreground mt-2">
                We'll send a secure link to your email to reset your password.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save / Cancel */}
        {hasChanges && (
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 mb-8">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="text-muted-foreground hover:text-white w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-purple hover:bg-purple/90 text-white px-6 w-full sm:w-auto"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}

        {/* Danger Zone */}
        <Card className="rounded-2xl border border-red-500/30 bg-red-500/5">
          <CardContent className="p-5 sm:p-6">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-red-400 mb-3">
              Danger Zone
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back.
            </p>

            <Button
              variant="outline"
              onClick={() => setDeleteOpen(true)}
              className="border-red-500/40 text-red-400 hover:bg-red-500/20 w-full sm:w-auto"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-card border border-white/10 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400 flex items-center gap-2 text-sm sm:text-base">
              <span className="material-symbols-rounded">warning</span>
              Delete Account
            </AlertDialogTitle>

            <AlertDialogDescription className="text-xs sm:text-sm text-muted-foreground mt-2">
              This action cannot be undone. All your projects and activity will
              be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-6">
            <AlertDialogCancel className="bg-muted hover:bg-muted/80">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
            >
              {deleting ? "Deleting..." : "Yes, Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
}
