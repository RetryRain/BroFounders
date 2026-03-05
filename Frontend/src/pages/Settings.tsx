import DashboardLayout from "@/sections/Dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-0">
        {/* ================= Header ================= */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3">
            Settings
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage your profile and account security.
          </p>
        </div>

        {/* ================= Account Profile ================= */}
        <section className="mb-10 sm:mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple mb-4 sm:mb-5">
            Account Profile
          </h2>

          <Card className="bg-white/5 border-white/10 rounded-2xl">
            <CardContent className="p-5 sm:p-8 space-y-6 sm:space-y-8">
              {/* Display Name */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6 gap-4">
                <div className="sm:pr-6">
                  <p className="font-semibold text-white mb-1">Display Name</p>
                  <p className="text-sm text-muted-foreground">
                    How you appear to squad members.
                  </p>
                </div>

                <Input
                  className="w-full sm:w-64 bg-white/5 border-white/10"
                  defaultValue="Alex Rivera"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6 gap-4">
                <div className="sm:pr-6">
                  <p className="font-semibold text-white mb-1">Email Address</p>
                  <p className="text-sm text-muted-foreground">
                    Primary email for notifications.
                  </p>
                </div>

                <Input
                  type="email"
                  className="w-full sm:w-64 bg-white/5 border-white/10"
                  defaultValue="alex.r@devhub.com"
                />
              </div>

              {/* Profile Visibility */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                <div className="sm:pr-6">
                  <p className="font-semibold text-white mb-1">
                    Profile Visibility
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Make your profile discoverable.
                  </p>
                </div>

                <div className="w-12 h-6 bg-purple rounded-full relative shrink-0">
                  <div className="absolute right-1 top-1 size-4 bg-white rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ================= Footer Actions ================= */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4 mb-10 sm:mb-12">
          <Button
            variant="ghost"
            className="w-full sm:w-auto text-muted-foreground hover:text-white"
          >
            Cancel
          </Button>

          <Button className="w-full sm:w-auto bg-purple hover:bg-purple/90 text-white px-6">
            Save Changes
          </Button>
        </div>

        {/* ================= Danger Zone ================= */}
        <section>
          <Card className="rounded-2xl border border-red-500/30 bg-red-500/5">
            <CardContent className="p-5 sm:p-8">
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3 sm:mb-4">
                Danger Zone
              </h2>

              <p className="text-sm text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Once you delete your account, there is no going back. All your
                projects and squad contributions will be permanently removed.
              </p>

              <Button
                variant="outline"
                className="w-full sm:w-auto border-red-500/40 text-red-400 hover:bg-red-500/20"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
