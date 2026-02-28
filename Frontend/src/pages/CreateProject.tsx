import CreateProjectHeader from "@/sections/CreateProjectHeader";
import CreateProjectLayout from "@/sections/CreateProjectLayout";
import DashboardLayout from "@/sections/DashboardLayout";

export default function HostProject() {
  return (
    <DashboardLayout>
      <CreateProjectHeader />
      <CreateProjectLayout />
    </DashboardLayout>
  );
}
