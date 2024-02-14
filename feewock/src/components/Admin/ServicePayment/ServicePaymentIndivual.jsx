import React, { useEffect , useState} from 'react'
import useAxios from '../../../AxiosConfig/Axios.js'

function ServicePaymentIndivual({close , id}) {
    const useAxiosInstance = useAxios();
    const [appointment , setAppointment] = useState([])

    useEffect(() => {
        GetService()
    },[id])

    const GetService = async () => {
        let response = await useAxiosInstance.get(`/booking/adminindivualorderlist/${id}/`)
        if(response.status === 200){
            setAppointment(response.data)
            console.log(response.data);
        }
    }

  return (
    <div className='flex justify-center h-screen'>
    <div className="fixed left-auto right-auto   w-2/5  z-10  inset-0 overflow-y-auto">
    <div  className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
                <div className="flex flex-col justify-between flex-1 px-5 py-6">
                    <div className="flex-shrink-0">
                        <span className="block text-xs font-semibold tracking-widest  text-custom-blue uppercase"> FEEWOCK </span>
                    </div>

                <div className=' flex justify-end'>
                <button onClick={close} type="button" className="bg-white   rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div> 
            
                    <div className="flex-1 mt-6">
                        <p className="text-2xl font-semibold">
                            <a href="#" title="" className="text-black"> Every need, one solution. </a>
                        </p>
                        <p className="mt-4 uppercase font-bold  text-base text-black">ID : {appointment.id} </p>
                        <p className="mt-4 uppercase font-bold text-base text-black"> User Name : {appointment.name} </p>
                        <p className="mt-4 uppercase font-bold text-base text-black">Employee Name : {appointment.employee?.username} </p>
                        <p className="mt-4 uppercase font-bold text-base text-black">Phone Number : {appointment.phone_number} </p>
                        <p className="mt-4 uppercase font-bold text-base text-black">Locations : {appointment.location} </p>
                        <p className="mt-4 uppercase font-bold text-base text-black">Service Amount : {appointment.service_amount} </p>
                        <p className="mt-4 uppercase font-bold text-base text-black">Service Date: {appointment.date} </p>
                    {appointment.payment_method === 'ST' ? (
                        <p className="mt-4 uppercase font-bold text-base text-black">Payment Method: Stripe</p>

                    ) : appointment.payment_method === 'CO' ? (
                        <p className="mt-4 uppercase font-bold text-base text-black">Payment Method: cash on Delivery </p>

                    ): appointment.payment_method === 'PD' ?(
                        <p className="mt-4 uppercase font-bold text-base text-black">Payment Method: not paid </p>
                    ):null}

                    {appointment.payment_status === 'PD' ?(
                        <p className="mt-4 uppercase font-bold text-base text-black">Payment Status : pending </p>
                    ): appointment.payment_status === 'PY' ? (
                        <p className="mt-4 uppercase font-bold text-base text-black">Payment Status: paid </p>
                    ):appointment.payment_status === 'FL' ? (
                        <p className="mt-4 uppercase font-bold text-base text-black">Payment Status : failed </p>
                    ):null}
                        <p className="mt-4 uppercase font-bold text-base text-black">Payment Time: {appointment.service_time} </p>
                       

                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServicePaymentIndivual
