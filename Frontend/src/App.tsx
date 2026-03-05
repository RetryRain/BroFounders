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
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="auth" element={<Authentication />}>
            <Route index element={<LoginPanel />} />
            <Route path="login" element={<LoginPanel />} />
            <Route path="register" element={<RegisterPanel />} />
          </Route>

          {/* Protected Section */}
          <Route element={<ProtectedRoute />}>
            <Route path="projects" element={<Projects />} />
            <Route path="projects/create-project" element={<CreateProject />} />
            <Route path="projects/edit/:id" element={<CreateProject />} />
            <Route path="my-teams" element={<MyTeams />} />
            <Route path="activity" element={<Activity />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
