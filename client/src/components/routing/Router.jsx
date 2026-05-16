import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainComponent } from "../MainComponent"
import Dashboard from "../Dashboard"
import FromStepTwo from "../FromStepTwo"
import Login from "../Login"
import Register from "../Register"
import StatusRequestPage from "../statusRequest2.jsx"
import AdminRequests from "../admin-requests.jsx"
import Navbar from "./NavBar"
import StudentLogin from "../StudentLogin.jsx"

const AppRoutes = () => {
    return <>
        <Navbar />
        <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-requests" element={<AdminRequests />} />
            <Route path="/from-step-two" element={<FromStepTwo />} />
            <Route path="/status" element={<StatusRequestPage />} />
            <Route path="/status-request" element={<StatusRequestPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/student-login" element={<StudentLogin />} />

        </Routes>
    </>
}

export const Router =() =>{
    return<>
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
    </>
}
