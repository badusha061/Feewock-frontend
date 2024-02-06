import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RedirectIfAuthenticated = ({ to = "/", children }) => {
    const userdetails = useSelector((state) => state.token);
    const authtoken = userdetails.token;
    const DetailsJson = localStorage.getItem('userDetails')
    const details =JSON.parse(DetailsJson)
    if (authtoken) {
      const authrole = details.role
      if(details){
         if(authrole === 1){
            return <Navigate to='/admin/dashboard' />
         }
         if(authrole === 2){
            return <Navigate to='/employee/employeedashboard' />
         }
         if(authrole === 3){
            return <Navigate to={to} />;
         }
      }
       
    }
   
    return children;
   };
   
   export default RedirectIfAuthenticated;