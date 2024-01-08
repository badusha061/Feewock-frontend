import {Routes ,  Route } from "react-router-dom";
import AdminDashboard from "../components/Admin/Dashboard/AdminDashboard";
import UserManagement from "../components/Admin/AdminUserManagement/UserManagement";

export default function AdminRoutes() {
    return (

        <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/usermanagement" element={<UserManagement />} />
        
        </Routes>
    )
}