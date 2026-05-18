import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MainComponent } from "../MainComponent";
import Dashboard from "../Dashboard";
import FromStepTwo from "../FromStepTwo";
import Login from "../Login";
import Register from "../Register";
import AdminRequests from "../admin-requests.jsx";
import Navbar from "./NavBar";

const RequireAuth = ({ auth, children }) => {
  return auth?.user ? children : <Navigate to="/login" replace />;
};

export const Router = ({ auth }) => {
  return (
    <BrowserRouter>
      <Navbar auth={auth} />
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/dashboard" element={<RequireAuth auth={auth}><Dashboard /></RequireAuth>} />
        <Route path="/admin-requests" element={<RequireAuth auth={auth}><AdminRequests /></RequireAuth>} />
        <Route path="/from-step-two" element={<RequireAuth auth={auth}><FromStepTwo /></RequireAuth>} />
        <Route path="/login" element={<Login auth={auth} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
