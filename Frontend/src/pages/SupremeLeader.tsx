import { useEffect, useState } from "react";
import DashboardLayout from "@/sections/Dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useNotificationStore } from "@/store/notifications";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  isBanned?: boolean;
}

export default function SupremeLeader() {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  if (!user?.isAdmin) {
    return <div className="p-10 text-center">Access denied.</div>;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const showToast = useNotificationStore((s) => s.showToast);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err: any) {
        showToast("error", err?.response?.data || "Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      showToast("success", "User deleted.");
    } catch (err: any) {
      showToast("error", err?.response?.data || "Failed to delete user.");
    }
  };

  const handleBan = async (id: string) => {
    try {
      const res = await api.patch(`/users/${id}/ban`);
      setUsers((prev) => prev.map((u) => (u._id === id ? res.data : u)));
      showToast("success", "User banned.");
    } catch (err: any) {
      showToast("error", err?.response?.data || "Failed to ban user.");
    }
  };

  const handleUnban = async (id: string) => {
    try {
      const res = await api.patch(`/users/${id}/unban`);
      setUsers((prev) => prev.map((u) => (u._id === id ? res.data : u)));
      showToast("success", "User unbanned.");
    } catch (err: any) {
      showToast("error", err?.response?.data || "Failed to unban user.");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-extrabold text-white mb-6">
          User Administration
        </h1>

        <Card className="bg-white/5 border-white/10 rounded-2xl">
          <CardContent className="p-6">
            {loading ? (
              <p className="text-muted-foreground text-sm">Loading users...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-white/10 text-muted-foreground">
                    <tr>
                      <th className="text-left py-3">Name</th>
                      <th className="text-left py-3">Email</th>
                      <th className="text-left py-3">Role</th>
                      <th className="text-left py-3">User ID</th>
                      <th className="text-left py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="py-3 font-medium text-white">
                          {u.name}
                        </td>

                        <td className="py-3 text-muted-foreground">
                          {u.email}
                        </td>

                        <td className="py-3">
                          {u.isAdmin ? (
                            <span className="text-purple font-semibold">
                              Admin
                            </span>
                          ) : (
                            <span className="text-muted-foreground">User</span>
                          )}
                        </td>

                        <td className="py-3 font-mono text-xs text-muted-foreground">
                          {u._id}
                        </td>

                        <td className="py-3 flex gap-2">
                          {!u.isAdmin && (
                            <>
                              {u.isBanned ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUnban(u._id)}
                                >
                                  Unban
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleBan(u._id)}
                                >
                                  Ban
                                </Button>
                              )}

                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(u._id)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <p className="text-muted-foreground text-sm mt-4">
                    No users found.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
