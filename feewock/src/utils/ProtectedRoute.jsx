import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute  = ({allowedRoles , children}) => {
    const userdetails = useSelector((state) => state.token);
    const authtoken = userdetails.token
    const DetailsJson = localStorage.getItem('userDetails')
    const details =JSON.parse(DetailsJson)
    if(details){
        const authrole = details.role
        if (!authtoken || !allowedRoles.includes(authrole)) {
            return <Navigate to="/login" />;
         } 
         return children
    }
    return <Navigate to="/login" />;
    
};

export default ProtectedRoute