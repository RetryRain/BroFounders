import AuthLeftPanel from "@/sections/AuthLeftPanel";
import { Outlet } from "react-router-dom";
import "material-symbols/rounded.css";

export default function Authentication() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-background">
      {/* LEFT SIDE */}
      <AuthLeftPanel />

      {/* RIGHT SIDE */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-24 bg-dark-background">
        <Outlet />
      </div>
    </div>
  );
}
