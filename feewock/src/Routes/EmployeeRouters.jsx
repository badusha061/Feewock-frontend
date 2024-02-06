import { Routes ,Route } from "react-router-dom";
import EmployeeDashboard from "../components/Employees/EmployeeDashboard/EmployeeDashboard";
import EmployeeProfile from "../components/Employees/EmployeeProfile/EmployeeProfile";
import EmployeeUserChat from '../components/Employees/EmployeeUserChat/EmployeeUserChat'
import EmployeeUserLIst from '../components/Employees/EmployeeUserChat/EmployeeUserLIst'
import Post from "../components/Employees/EmployeesPost/Post";
import EmployeesAvailibility from "../components/Employees/EmployeesAvailibility/EmployeesAvailibility";


export default function EmployeeRoutes () {
    return (
    <Routes>
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/availibile" element={<EmployeesAvailibility />} />
        <Route path="/employeeprofile" element={<EmployeeProfile />} />
        <Route path="/chat" element={<EmployeeUserChat />} />
        <Route path="/post" element={<Post />} />
        <Route path="/listuser" element={<EmployeeUserLIst />} />
    </Routes>
    )
  
}