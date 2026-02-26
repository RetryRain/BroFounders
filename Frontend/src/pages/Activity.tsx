import DashboardLayout from "../sections/DashboardLayout";
import "material-symbols/rounded.css";
import ActivityHeader from "@/sections/ActivityHeader";
import ActivityCard from "@/sections/ActivityCard";
import ActivityStatus from "@/sections/ActivityStatus";

export default function Activity() {
  return (
    <DashboardLayout>
      <ActivityHeader />
      <ActivityCard />
      <ActivityStatus />
    </DashboardLayout>
  );
}
