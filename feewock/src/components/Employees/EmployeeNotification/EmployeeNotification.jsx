import React, { useEffect, useState , useReducer} from 'react'
import EmployeeLoyouts  from '../../../layouts/EmployeeLoyouts'
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import Spinner from '../../../utils/Spinner';
import useAxios from '../../../AxiosConfig/Axios';

function EmployeeNotification() {
    const axiosInstance = useAxios()
    const[modal , setModal] = useState(false)
    const [isLoading , setIsLoading] = useState(true)
    const [notifications , setNotification] = useState([])
    const employeeDetailsJson = localStorage.getItem('userDetails')
    const Employee =JSON.parse(employeeDetailsJson)
    const EmployeeId = Employee.id
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)

    const handleModal = () => {
        setModal(true)
    }
    useEffect(() => {
        GetNotification()
    },[reducer,EmployeeId])

    const GetNotification =  async  () => {
        const response = await axiosInstance.get(`/booking/employeenotification/${EmployeeId}/`)
        console.log(response.data.data);
        if(response.status === 200){
            setNotification(response.data.data)
            setIsLoading(false)
        }
    }
    if(isLoading){
        return <Spinner />
    }
    const handleClose = () => {
        setModal(false)
        forceUpdate()
    }
    const handleClick = async (e) => {
        e.preventDefault()
        const response = await axiosInstance.delete(`/booking/deleteemployee/${EmployeeId}/`)
        if(response.status === 200){
            toast.success("Successfully Removed all Notification")
            handleClose()
            return true
        }
    }
  return (
    <EmployeeLoyouts>

        
    <div className="h-screen grid place-items-center my-8">
  <div className="lg:w-2/5 sm:w-3/5 w-11/12 bg-gray-100 dark:bg-gray-800 rounded-xl mx-auto border p-10 shadow-sm">
    <div className="inline-flex items-center justify-between w-full">
      <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">Notifications</h3>
    
    </div>
    <p className="mt-8 font-medium text-gray-500 text-sm sm:text-base dark:text-white">Accept</p>
   
        {notifications.map((data , index) => (


            <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
            <div className=" inline-flex items-center justify-between w-full">

                <div className="inline-flex items-center">
                <img
                    src="data:image/png;base64,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"
                    alt="Training Icon" className="w-6 h-6 mr-3"/>
                <h3 className="font-bold text-base text-gray-800">Service Booking</h3>
                </div>
                <p className="text-xs text-gray-500">
                {moment.utc(data.created_at).local().startOf('seconds').fromNow()}
                </p>
            </div>
            <p className="mt-1 text-sm">
               {data.appointment.name}, {data.appointment.location}, {data.appointment.phone_number}, {data.appointment.service_amount}, {data.appointment.date}, {data.appointment.service_time}    
            </p>
            </div>



        ))}
  
 

    <button
    onClick={handleModal}
    className="inline-flex text-sm bg-white justify-center px-4 py-2 mt-12 w-full text-red-500 items-center rounded font-medium
     shadow border focus:outline-none transform active:scale-75 transition-transform duration-700 hover:bg-red-500
      hover:text-white hover:-translate-y-1 hover:scale-110 dark:hover:bg-white dark:text-gray-800 dark:hover:text-gray-800">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 sm:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    Clear all notifications
  </button>
  </div>
</div>

{modal ? (
     <div
    className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
    <div 
    onClick={handleClose} 
    className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
      <svg xmlns="http://www.w3.org/2000/svg"
        className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
        <path
          d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
          data-original="#000000"></path>
        <path
          d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
          data-original="#000000"></path>
      </svg>
      <div className="my-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 fill-red-500 inline" viewBox="0 0 24 24">
          <path
            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
            data-original="#000000" />
          <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
            data-original="#000000" />
        </svg>
        <h4 className="text-xl font-semibold mt-6">Are you sure you want to delete All notifications?</h4>
        <p className="text-sm text-gray-500 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor
          arcu,
          at fermentum dui. Maecenas</p>
      </div>
      <div className="flex flex-col space-y-2">
        <button 
        onClick={handleClick}
        type="button"
          className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500">Delete</button>
        <button 
        type="button"
        onClick={handleClose}
          className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200">Cancel</button>
      </div>
    </div>
  </div> 
):null}

<Toaster
  position="top-center"
  reverseOrder={false}
  />

    </EmployeeLoyouts>
  )
}

export default EmployeeNotification
