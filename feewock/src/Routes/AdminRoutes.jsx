import {Routes ,  Route } from "react-router-dom";
import AdminDashboard from "../components/Admin/Dashboard/AdminDashboard";
import UserManagement from "../components/Admin/AdminUserManagement/UserManagement";
import AdminLayouts from "../layouts/AdminLayouts";
import EmployeeManagement from '../components/Admin/EmployeeManagement/EmployeeManagement'
import MainService from "../components/Admin/AdminService/MainService";
import SubService from "../components/Admin/AdminService/SubService";
import EmployeePostion from "../components/Admin/EmployeePosition/EmployeePostion";
import AdminNavbar from "../components/Admin/Navbar/AdminNavbar";


export default function AdminRoutes() {
    return (
        
        <Routes  >
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/employeemanagement" element={<EmployeeManagement />} />
            <Route path="/mainservice" element={<MainService />} />
            <Route path="/subservice" element={<SubService />} />
            <Route path="/position" element={<EmployeePostion />} />
            
        </Routes>
    )
}