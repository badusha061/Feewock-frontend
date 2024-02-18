import {Routes ,  Route } from "react-router-dom";
import AdminDashboard from "../components/Admin/Dashboard/AdminDashboard";
import UserManagement from "../components/Admin/AdminUserManagement/UserManagement";
import EmployeeManagement from '../components/Admin/EmployeeManagement/EmployeeManagement'
import MainService from "../components/Admin/AdminService/MainService";
import SubService from "../components/Admin/AdminService/SubService";
import EditMainService from "../components/Admin/AdminService/EditMainService";
import EmployeeIndivual from "../components/Admin/EmployeeIndivual/EmployeeIndivual";
import UserBanner from "../components/Admin/UserBanner/UserBanner";
import ServicePayment from "../components/Admin/ServicePayment/ServicePayment";
import ContacForm from "../components/Admin/ContactForm/ContacForm";

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
            <Route path="/banner" element={<UserBanner />} />
            <Route path="/payment" element={<ServicePayment />} />
            <Route path="/contact" element={<ContacForm />} />

        </Routes>
    )
}