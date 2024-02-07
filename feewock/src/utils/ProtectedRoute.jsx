import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';



const ProtectedRoute  = ({allowedRoles , children}) => {
    const userdetails = useSelector((state) => state.token);
    const authtoken = userdetails.token
    const DetailsJson = localStorage.getItem('userDetails')
    const details =JSON.parse(DetailsJson)
    if(details){  
        const authrole = details.role
        if (!authtoken || !allowedRoles.includes(authrole)) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
                
              });
              
              Toast.fire({
                icon: 'error',
                title: 'You do not have right',
              });
            return <Navigate to="/login" />;
         } 
         return children
    }
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        
      });
      
      Toast.fire({
        icon: 'error',
        title: 'You do not have right',
      });
    return <Navigate to="/login" />;
    
};

export default ProtectedRoute