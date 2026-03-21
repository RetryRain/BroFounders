import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.tsx";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
      <Analytics />
      <SpeedInsights />
    </GoogleOAuthProvider>
  </StrictMode>,
);

// Double rAF ensures React has committed its first paint before we fade out
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const splash = document.getElementById("splash");
    if (splash) {
      splash.classList.add("hidden");
      splash.addEventListener("transitionend", () => splash.remove(), {
        once: true,
      });
    }
  });
});
