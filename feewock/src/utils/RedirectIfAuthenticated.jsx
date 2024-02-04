import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ to = "/", children }) => {
    const userdetails = useSelector((state) => state.token);
    const authtoken = userdetails.token;
   
    if (authtoken) {
       return <Navigate to={to} />;
    }
   
    return children;
   };
   
   export default RedirectIfAuthenticated;