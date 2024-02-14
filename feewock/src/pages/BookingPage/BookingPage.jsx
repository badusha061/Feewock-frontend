import React, { useEffect, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import Calendar from 'react-calendar';
import useAxios from '../../AxiosConfig/Axios'
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import Spinner from '../../utils/Spinner';
import './Booking.css'
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'; 
import { w3cwebsocket as W3CWebSocket } from "websocket";



function BookingPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const employeeId = location.state.employeeId;
    const userId = location.state.userId;
    const[IsloadingEmployee , setIsLaodingEmployee] = useState(true)
    const [isloadingUser , setIsLaodingUser] = useState(true)
    const axiosInstance = useAxios()
    const [user , setUser]= useState([])
    const [data, setData] = useState()

    useEffect(() => {
        GetDate()
        GetUser()
    },[employeeId , userId])

    const GetUser = async () => {
        const response = await axiosInstance.get(`api/userindivual/${userId}/`)
        if(response.status === 200){
            setUser(response.data)
            setIsLaodingUser(false)
            
        }
    }

    const [send , setSend] = useState({
        user : userId,
        employee:employeeId,
        name:'',
        phone_number: '',
        location:'',
        service_amount:'',
        date:'',
        service_time:''
    })

    useEffect(() => {
        setSend(prevState => ({
            ...prevState,
            name: user?.first_name || '',
            phone_number: user?.phone_number || '',
            location: user?.location || '',
          }));
    },[user])


    const GetDate = async () => {
        const response = await axiosInstance.get(`employees/indivual/${employeeId}/`)
        if(response.status === 200){
            setData(response.data)
            setIsLaodingEmployee(false)
        }
    }

   

    const isAbsentOnDate = (date) => {
        if (Array.isArray(data)) {
            const dateStr = date.toISOString().split('T')[0];
          return data.some((absence) => absence.date === dateStr && !absence.is_available);
        }
        return false; 
      };
      

    const tileClassName = ({ date, view }) => {
        if (view === 'month' && isAbsentOnDate(date)) {
          return 'red-mark';  
        }
      };

      if(isloadingUser || IsloadingEmployee){
        return <Spinner />
      }
      
      const handleChange = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        const currentDate = new Date()
        const givenDate = new Date(dateStr)
        if(givenDate < currentDate){
            toast.error('Cannot Be Past')   
            return false
        }
        const isDateInData = data.some((d) => d.date === dateStr && !d.is_available)
        if(isDateInData){
            toast.error('Employees Is Absent')
            return false
        }
        setSend((prvs) => ({
            ...prvs,
            date: dateStr,
        }))
      }
      
    const client = new W3CWebSocket(`ws://localhost:8000/ws/notification/test/`) 

 
  
      const isWebsocketConnect = () => {
        return client.readyState === WebSocket.OPEN;
      }


      const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(isWebsocketConnect);
        if(isWebsocketConnect){
            try{
                if(!send.service_amount.trim()){
                    toast.error('Service Amount Cannot be Empty')
                    return false
                }
                if(!send.date.trim()){
                    toast.error('Take Your Service Date ')
                    return false
                }
                if(!send.service_time.trim()){
                    toast.error('Please take your time')
                    return false
                }
                const response = await axiosInstance.post('booking/appointment',send)
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
                        title: "Successfully Booking"
                      });
                    navigate(`/userprofile/${userId}`)
                    return true
                }
            }catch(error){
                console.log(error);
            }
    
        }else{
            console.log('not connected');
        }
 
      }

  return (
    <Layouts>
    
        <div className="w-screen">
    <div className="relative mx-auto mt-20 mb-20 max-w-screen-lg overflow-hidden rounded-t-xl bg-custom-blue py-32 text-center shadow-xl shadow-gray-300">
        <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">Book an appointment</h1>
        <p className="mt-6 text-lg text-white">Get an appointment with our experienced Employee</p>
        <img className="absolute top-0 left-0 -z-10 h-full w-full object-cover" src="" alt="" />
    </div>

    <div className="mx-auto grid max-w-screen-lg px-6 pb-20">
     
    

    <div className=' flex  justify-between '>
      
        <div className=' flex-grow'>

        <div className="flex items-center justify-center p-12">
 
 <div className="mx-auto w-full max-w-[550px] bg-white">
     <form>
      
         <div className="mb-5">
             <label htmlFor="first_name" className="mb-3 block text-base font-medium text-[#07074D]">
                 Name
             </label>
             <input value={user.first_name} onChange={(e) => setSend((prvs) => ({...prvs , name:e.target.value }) )} type="text" name="name" id="name" placeholder="Full Name"
                 className="w-full  rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-custom-blue focus:shadow-md" />
         </div>
         <div className="mb-5">
             <label htmlFor="phone_number" className="mb-3 block text-base font-medium text-[#07074D]">
                 Phone Number
             </label>
             <input value={user.phone_number} onChange={(e) => setSend((prvs) => ({...prvs , phone_number:e.target.value }) )} type="text" name="phone" id="phone" placeholder="Enter your phone number"
                 className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-custom-blue focus:shadow-md" />
         </div>
         <div className="mb-5">
             <label htmlFor="location" className="mb-3 block text-base font-medium text-[#07074D]">
                Locations
             </label>
             <input value={user.location} onChange={(e) => setSend((prvs) => ({...prvs , location:e.target.value }) )}  type="text" name="location" id="location" placeholder="Enter your location"
                 className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-custom-blue focus:shadow-md" />
         </div>
         <div className="mb-5">
             <label htmlFor="location" className="mb-3 block text-base font-medium text-[#07074D]">
                Negotiable Amount
             </label>
             <input value={send.service_amount} onChange={(e) => setSend((prvs) => ({...prvs , service_amount:e.target.value }) ) } type="text" name="amount" id="amount" placeholder="Enter your Service Amount"
                 className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-custom-blue focus:shadow-md" />
         </div>
         <div className="-mx-3 flex flex-wrap">
             <div className="w-full px-3 sm:w-1/2">
                 <div className="mb-5">
                     <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                         Date
                     </label>
                     <input  value={send.date} name="date" id="date"
                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-custom-blue focus:shadow-md" />
                 </div>
             </div>
             <div className="w-full px-3 sm:w-1/2">
                 <div className="mb-5">
                     <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                         Time
                     </label>
                     <input value={send.service_time} onChange={(e) => setSend((prvs) => ({...prvs , service_time:e.target.value }) ) } type="time" name="time" id="time"
                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-custom-blue focus:shadow-md" />
                 </div>
             </div>
         </div>

        

         <div>
             <button
             onClick={handleSubmit}
                 className="hover:shadow-form w-full rounded-md bg-custom-blue py-3 px-8 text-center text-base font-semibold text-white outline-none">
                 Book Appointment
             </button>
         </div>
         
        
     </form>
 </div>
 </div>

            
        </div> 
        <div>
       
        <div class="flex items-center me-4">
            <input checked id="red-checkbox"  value="" class="w-8  h-8  bg-[#ffbcbab3] border-black rounded focus:ring-2  "/>
            <label htmlFor="red-checkbox" class="ms-2 text-sm font-medium text-black dark:text-black">EMPLOYEE ABSENCE DAYS</label>

        </div>

        <div className=' flex-shrink-0'>
        <Calendar
        value={send.date}
        onChange={handleChange}
            tileClassName={tileClassName}
            />
        </div>
        </div>
       

    </div>

    <Toaster
        position="top-center"
        reverseOrder={false}
        />
 
       

    </div>
    </div>

    </Layouts>
  )
}

export default BookingPage
