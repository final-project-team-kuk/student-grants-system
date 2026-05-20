import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainComponent } from "../MainComponent";
import Dashboard from "../Dashboard";
import FromStepTwo from "../FromStepTwo";
import Login from "../Login";
import Register from "../Register";
import Navbar from "./NavBar";
import ScholarshipStatus from "../statusRequest.jsx";
import HeaderSteps from "../HeadSteps";

// ─── FIX: redirect to /login if not authenticated ────────────────────────────
const RequireAuth = ({ auth, children }) => {
  return auth?.user ? children : <Navigate to="/login" replace />;
};

export const Router = ({ auth }) => {
  return (
    <BrowserRouter>
      <Navbar auth={auth} />
      <Routes>
        <Route path="/" element={<MainComponent />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={
  <RequireAuth auth={auth}><Dashboard auth={auth} /></RequireAuth>
} />
        <Route path="/request-status" element={<RequireAuth auth={auth}><ScholarshipStatus /></RequireAuth>} />
        <Route path="/from-step-two" element={<RequireAuth auth={auth}><FromStepTwo /></RequireAuth>} />
        <Route path="/HeadSteps" element={<RequireAuth auth={auth}><HeaderSteps /></RequireAuth>} />

        {/* ─── FIX: pass auth prop to Login so it can call auth.login() ──── */}
        <Route path="/login" element={<Login auth={auth} />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};