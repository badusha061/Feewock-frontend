import { Routes ,Route } from "react-router-dom";
import EmployeeDashboard from "../components/Employees/EmployeeDashboard/EmployeeDashboard";
import EmployeeRegister from "../components/Employees/EmployeeRegister/EmployeeRegister";


export default function EmployeeRoutes () {
    return (
    <Routes>
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/employeeregister" element={<EmployeeRegister />} />
    </Routes>
    )
  
}