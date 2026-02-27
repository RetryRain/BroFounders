import AuthLeftPanel from "@/sections/AuthLeftPanel";
import { Outlet } from "react-router-dom";
import "material-symbols/rounded.css";
import AuthLayout from "@/sections/AuthLayout";

export default function Authentication() {
  return (
    <>
      <AuthLayout>
        <AuthLeftPanel />
        <Outlet />
      </AuthLayout>
    </>
  );
}
