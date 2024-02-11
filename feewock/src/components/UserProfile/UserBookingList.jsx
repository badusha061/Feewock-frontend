import React, { useEffect, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAxios from '../../AxiosConfig/Axios'
import Spinner from '../../utils/Spinner'

function UserBookingList() {
    const navigate = useNavigate()
    const axiosInstance = useAxios()
    const [isLoading , setIsLaoding] = useState(true)
    const [appointment , setAppointment] = useState([])
    const location = useLocation()
    const userId = location.state
    useEffect(() => {
        GetAppointment()
    },[userId])

    const GetAppointment = async () => {
        const response = await axiosInstance.get(`/booking/userlist/${userId}/`)
        if(response.status === 200){
            setAppointment(response.data)
            console.log(response.data);
            setIsLaoding(false)
        }
    }

    if(isLoading){
        return <Spinner />
    }

    const handlePayment = (e , action_id , appointment_id) => {
        console.log(action_id);
        console.log(appointment_id);
        navigate('/payment',{state:{appointment:appointment_id, action:action_id}})
    }
  
  return (
    <Layouts>

    <section className="py-10 bg-custom-blue sm:py-16 lg:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">BOOKING LISTING</h2>
        </div>

        <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full lg:gap-14">

        {appointment.map((data , index) => (


            <div key={index} className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
                <div className="flex flex-col justify-between flex-1 px-5 py-6">
                    <div className="flex-shrink-0">
                        <span className="block text-xs font-semibold tracking-widest text-custom-blue uppercase"> FEEWOCK </span>
                    </div>

                    <div className="flex-1 mt-6">
                        <p className="text-2xl font-semibold">
                            <a href="#" title="" className="text-black"> Every need, one solution. </a>
                        </p>
                        <p className="mt-4 text-base text-black">Employee Name:{data.appointment.employee.username}  </p>
                        <p className="mt-4 text-base text-black"> Your Name: {data.appointment.name} </p>
                        <p className="mt-4 text-base text-black">Location:{data.appointment.location} </p>
                        <p className="mt-4 text-base text-black">Service Amount:{data.appointment.service_amount} </p>
                        <p className="mt-4 text-base text-black">Service Date:{data.appointment.date} </p>
                        <p className="mt-4 text-base text-black">Service Time: {data.appointment.service_time} </p>
                        <p className="mt-4  uppercase text-bold font-bold text-black">Service Status: {data.action} </p>


                    </div>
                </div>

            {data.action === 'accepted' ? (
                 <div className="border-t border-gray-200">
                 <div className="flex">
                     <div className="flex items-center flex-1 px-6 py-5">
                         <span className="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate">
                         <button onClick={(e) => handlePayment(e ,data.id, data.appointment.id)} type="button" class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
                         <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                             Go to payment
                         </button>   
                         </span>
                     </div>
                 </div>
             </div>
            ):(
                <div className="border-t border-gray-200">
                <div className="flex">
                    <div className="flex items-center flex-1 px-6 py-5">
                        <span className="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate">
                            <p className="mt-4  uppercase text-bold font-bold text-black">Reason: {data.comment} </p>
                        </span>
                    </div>
                </div>
            </div>
            )}
               
            </div>

        ))} 
        
        </div>

    </div>
    </section>
    </Layouts>

  )
}

export default UserBookingList
