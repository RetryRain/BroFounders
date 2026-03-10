import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Projects from "./pages/Projects";
import Activity from "./pages/Activity";
import LoginPanel from "./sections/Authentication/LoginPanel";
import RegisterPanel from "./sections/Authentication/RegisterPanel";
import ProtectedRoute from "./sections/ProtectedRoute";
import CreateProject from "./pages/CreateProject";
import MyTeams from "./pages/MyTeams";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";
import ForgotPassword from "./pages/ForgotPassword";
import NotificationLoader from "./sections/NotificationLoader";
import GithubSuccess from "./pages/githubSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />

        {/* AUTH */}
        <Route path="auth" element={<Authentication />}>
          <Route index element={<LoginPanel />} />
          <Route path="login" element={<LoginPanel />} />
          <Route path="register" element={<RegisterPanel />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="github-success" element={<GithubSuccess />} />
        </Route>

        {/* PASSWORD RESET */}
        <Route path="/reset-password/:token" element={<PasswordReset />} />

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="projects" element={<Projects />} />
          <Route path="projects/create-project" element={<CreateProject />} />
          <Route path="projects/edit/:id" element={<CreateProject />} />
          <Route path="my-teams" element={<MyTeams />} />
          <Route path="activity" element={<Activity />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <NotificationLoader />
    </BrowserRouter>
  );
}

export default App;
