import React, { useEffect } from 'react'
import useAxios from '../../../AxiosConfig/Axios'
import Swal from 'sweetalert2';


function Conform({close,date , employeeId}) {
  console.log(date , employeeId);
    const axiosInstance = useAxios()


    

    const handleSubmit = async () => {

        try{
          const response =  await axiosInstance.post(`/employees/employeeavailability`,{
              employees :employeeId,
              date : date,
              is_available:false
          })
          if(response.status === 201){
              const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  }
                });
                Toast.fire({
                  icon: "success",
                  title: "Successfully"
                });
                close()
              }
      }catch(error){
        console.log(error);
          if(error.response.data.date[0] === 'employees availability with this date already exists.'){
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
                  title: 'This Date is Already Take it Please Take Another',
                });
                return false
          }
      }
     
      
    }

    
  return (
    <div className="border rounded-lg shadow relative max-w-sm">
    <div className="flex justify-end p-2">
        <button onClick={close} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>

    <div className="p-6 pt-0 text-center">
        <svg className="w-20 h-20 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">Are you sure you want to unavailabile this days?</h3>
        
        <button
        onClick={handleSubmit}
         className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
        >
         Yes, I'm sure

        </button>
           
       <button
        onClick={close}
       className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
       >
       No, cancel

       </button>
        
     
    </div>
</div>
  )
}

export default Conform
