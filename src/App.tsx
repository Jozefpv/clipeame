
import Login from "./pages/access/Login";
import Begin from "./pages/access/Begin"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home";
import ProtectedRoute from "./guards/ProtectedRoute";
import Register from "./pages/access/Register";
import VerifyEmail from "./pages/access/VerifyEmail";
import ChooseUsername from "./pages/access/ChooseUsername";
import UserConfig from "./pages/config/UserConfig";
import Dashboard from "./pages/dashboard/Dashboard";
import Welcome from "./pages/dashboard/Welcome";
import Campaign from "./pages/dashboard/Campaign-page.tsx";

export default function App() {
  return (
    <>
      <div className="h-screen w-screen flex flex-row bg-zinc-900">
      <div className="h-screen w-screen flex bg-zinc-900">
        <Routes>
          <Route path="/begin" element={<Begin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyEmail/>} />
            <Route path="/choose" element={<ChooseUsername />} />

            <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/config" element={<UserConfig />} />
              <Route path="/campaign/:campaignId" element={<Campaign />} />
            </Route>
          </Route>
        </Routes>
      </div>
      </div>
    </>
  );
}
