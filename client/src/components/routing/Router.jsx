import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainComponent } from "../MainComponent"
import Dashboard from "../Dashboard"
import Login from "../Login"
import Register from "../Register"
import AdminRequests from "../admin-requests.jsx"
import Navbar from "./NavBar"

// 1. מחקנו את הייבוא הישיר של FromStepTwo
// 2. הבאנו במקומו את קומפוננטת המעטפת שלך (שימי לב לנתיב הקובץ)
import HeadSteps from "../HeadSteps" 

export const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainComponent />} />
                 <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin-requests" element={<AdminRequests />} />
                    
                    {/* 3. שינינו את הנתיב כך שיפעיל את המעטפת */}
                    <Route path="/HeadSteps" element={<HeadSteps />} />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}