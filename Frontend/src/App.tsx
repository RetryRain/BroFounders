import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import Projects from "./pages/Projects";
import Activity from "./pages/Activity";
import LoginPanel from "./sections/LoginPanel";
import RegisterPanel from "./sections/RegisterPanel";
import ProtectedRoute from "./sections/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Auth" element={<Authentication />}>
            <Route index element={<LoginPanel />} />
            <Route path="login" element={<LoginPanel />} />
            <Route path="register" element={<RegisterPanel />} />
          </Route>

          {/* Protected Section */}
          <Route element={<ProtectedRoute />}>
            <Route path="/Projects" element={<Projects />} />
            <Route path="/Activity" element={<Activity />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
