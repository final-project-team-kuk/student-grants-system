import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainComponent } from "../MainComponent"
import Dashboard from "../Dashboard"
import FromStepTwo from "../FromStepTwo"
import Login from "../Login"
import Register from "../Register"
import AdminRequests from "../admin-requests.jsx"
import Navbar from "./NavBar"

export const Router =() =>{
    return<>
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-requests" element={<AdminRequests />} />
            <Route path="/form-step-two" element={<FromStepTwo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
    </>
}
