import DashboardLayout from "@/sections/Dashboard/DashboardLayout";
import MyTeamsHeader from "@/sections/MyTeams/MyTeamsHeader";
import MyTeamsLeftPanel from "@/sections/MyTeams/MyTeamsLeftPanel";
import MyTeamsRightPanel from "@/sections/MyTeams/MyTeamsRightPanel";

export default function MyTeams() {
  return (
    <DashboardLayout>
      <MyTeamsHeader />
      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        <MyTeamsLeftPanel />
        <MyTeamsRightPanel />
      </div>
    </DashboardLayout>
  );
}
