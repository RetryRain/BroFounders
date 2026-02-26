import LoginPanel from "../sections/LoginPanel";
import AuthLeftPanel from "@/sections/AuthLeftPanel";

export default function Authentication() {
  return (
    <>
      {/* LEFT SIDE */}
      <AuthLeftPanel />
      {/* RIGHT SIDE */}
      <LoginPanel />
    </>
  );
}
