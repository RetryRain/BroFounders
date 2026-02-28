import DashboardLayout from "../sections/DashboardLayout";
import { DiscoveryHeader } from "../sections/DiscoveryHeader";
import ProjectGrid from "../sections/ProjectGrid";

export default function Projects() {
  return (
    <DashboardLayout>
      <DiscoveryHeader />
      <ProjectGrid />
    </DashboardLayout>
  );
}
