import { Routes ,Route } from "react-router-dom";
import EmployeeDashboard from "../components/Employees/EmployeeDashboard/EmployeeDashboard";
import EmployeeProfile from "../components/Employees/EmployeeProfile/EmployeeProfile";
// import EditProfile from "../components/Employees/EmployeeProfile/EditProfile";
import EmployeeUserChat from '../components/Employees/EmployeeUserChat/EmployeeUserChat'
import EmployeeUserLIst from '../components/Employees/EmployeeUserChat/EmployeeUserLIst'
import Post from "../components/Employees/EmployeesPost/Post";
import EmployeeTest from "../components/Employees/EmployeeTest";


export default function EmployeeRoutes () {
    return (
    <Routes>
        <Route path="/employeedashboard" element={<EmployeeDashboard />} />
        <Route path="/employeeprofile" element={<EmployeeProfile />} />
        {/* <Route path="/test" element={<EmployeeTest  />} /> */}
        <Route path="/chat" element={<EmployeeUserChat />} />
        <Route path="/post" element={<Post />} />
        <Route path="/listuser" element={<EmployeeUserLIst />} />
    </Routes>
    )
  
}