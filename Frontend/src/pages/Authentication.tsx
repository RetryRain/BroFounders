import AuthLeftPanel from "@/sections/Authentication/AuthLeftPanel";
import { Outlet } from "react-router-dom";
import "material-symbols/rounded.css";
import AuthLayout from "@/sections/Authentication/AuthLayout";

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
