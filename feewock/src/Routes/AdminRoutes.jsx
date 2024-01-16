import {Routes ,  Route } from "react-router-dom";
import AdminDashboard from "../components/Admin/Dashboard/AdminDashboard";
import UserManagement from "../components/Admin/AdminUserManagement/UserManagement";
import EmployeeManagement from '../components/Admin/EmployeeManagement/EmployeeManagement'
import MainService from "../components/Admin/AdminService/MainService";
import SubService from "../components/Admin/AdminService/SubService";
import EmployeePostion from "../components/Admin/EmployeePosition/EmployeePostion";
import EditMainService from "../components/Admin/AdminService/EditMainService";
import EmployeeEditPosition from "../components/Admin/EmployeePosition/EmployeeEditPosition";
import AddSubService from "../components/Admin/AdminService/AddSubService";
import EmployeeIndivual from "../components/Admin/EmployeeIndivual/EmployeeIndivual";

export default function AdminRoutes() {
    return (
        
        <Routes  >
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/employeemanagement" element={<EmployeeManagement />} />
            <Route path="/employeeindivual" element={<EmployeeIndivual />} />
            <Route path="mainservice" element={<MainService />} />
            <Route path="/mainservice/:id/edit" element={<EditMainService />} />
            <Route path="/subservice" element={<SubService />} />
            <Route path="/position" element={<EmployeePostion />} />
            <Route path="/position/:id/edit" element={<EmployeeEditPosition />} />  
            
        </Routes>
    )
}