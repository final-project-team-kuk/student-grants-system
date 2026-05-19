import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainComponent } from "../MainComponent"
import Dashboard from "../Dashboard"
import Login from "../Login"
import Register from "../Register"
import AdminRequests from "../AdminRequests"
import Navbar from "./NavBar"
import HeadSteps from "../HeadSteps" 
import AdminRequestDetails from "../AdminRequestDetails";

// 1. מייבאים את קומפוננטת הסטטוס (שימי לב שהשם הפיזי של הקובץ הוא statusRequest (2))
import ScholarshipStatus from "../statusRequest (2)"

export const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainComponent />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin-requests" element={<AdminRequests />} />
                    <Route path="/admin-request-details/:id" element={<AdminRequestDetails />} />
                    
                    {/* 3. שינינו את הנתיב כך שיפעיל את המעטפת */}
                    <Route path="/HeadSteps" element={<HeadSteps />} />
                    
                    {/* 2. הוספת הנתיב החדש עבור עמוד הסטטוס */}
                    <Route path="/request-status" element={<ScholarshipStatus />} />
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}