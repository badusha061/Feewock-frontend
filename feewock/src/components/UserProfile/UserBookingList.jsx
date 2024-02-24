import React, { useEffect, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useAxios from '../../AxiosConfig/Axios'
import Spinner from '../../utils/Spinner'
import UserReviews from '../Reviews/UserReviews'
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

function UserBookingList() {

    const navigate = useNavigate()
    const [reviewmodal, setReviewModal] = useState(false)
    const [appointmentId, setAppointmentId] = useState('')
    const [actionId, setActionId] = useState('')
    const axiosInstance = useAxios()
    const [isLoading, setIsLaoding] = useState(true)
    const [appointment, setAppointment] = useState([])
    const [employee, setEmployee] = useState('')
    const location = useLocation()
    const userId = location.state
    const [modal, setModal] = useState(false)
    useEffect(() => {
        GetAppointment()
    }, [userId])

    const GetAppointment = async () => {
        const response = await axiosInstance.get(`/booking/userlist/${userId}/`)
        if (response.status === 200) {
            setAppointment(response.data)
            console.log(response.data);
            setIsLaoding(false)
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    const handleModal = (e, action_id, appointment_id) => {
        setModal(true)
        setAppointmentId(appointment_id)
        setActionId(action_id)
    }

    const handleCancel = () => {
        setModal(false)
        setReviewModal(false)
    }

    const handleCashondelivery = () => {
        navigate('/payment', { state: { appointment: appointmentId, action: actionId } })
    }

    const handlePayment = async () => {
        if (appointmentId) {
            const response = await axiosInstance.post(`/payment/create-checkout-session/${appointmentId}/`)
            window.location.href = response.data.message.url
        }
    }

    const handleReviewsModal = (e, id) => {
        setReviewModal(true)
        setEmployee(id)
    }





    return (
        <Layouts>


            <section className="relative py-10 bg-custom-blue sm:py-16 lg:py-24">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">BOOKING LISTING</h2>
                    </div>

                    <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full lg:gap-14">

                        {appointment.map((data, index) => (


                            <div key={index} className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
                                <div className="flex flex-col justify-between flex-1 px-5 py-6">
                                    <div className="flex-shrink-0">
                                        <span className="block text-xs font-semibold tracking-widest text-custom-blue uppercase"> FEEWOCK </span>
                                    </div>

                                    <div className="flex-1 mt-6">
                                        <p className="text-2xl font-semibold">
                                            <a href="#" title="" className=" uppercase text-lg text-black"> Every need, one solution. </a>
                                        </p>
                                        <p className="mt-4 capitalize text-base text-black">Employee Name:{data.appointment.employee.username}  </p>
                                        <p className="mt-4 capitalize text-base text-black"> Your Name: {data.appointment.name} </p>
                                        <p className="mt-4  capitalize text-base text-black">Location:{data.appointment.location} </p>
                                        <p className="mt-4 capitalize  text-base text-black">Service Amount:{data.appointment.service_amount} </p>
                                        <p className="mt-4  capitalize text-base text-black">Service Date:{data.appointment.date} </p>
                                        <p className="mt-4 capitalize text-base text-black">Service Time: {data.appointment.service_time} </p>
                                        {data.appointment.payment_status === 'PY' || data.appointment.payment_method === 'CO' ? (
                                            <>
                                                {data.appointment.payment_method === 'ST' ? (

                                                    <>
                                                        <p className="mt-4  uppercase font-bold  text-black">Payment Method: Stripe</p>
                                                        <p className="mt-4  uppercase font-bold  text-black">Payment Time: {data.appointment.paid_at} </p>
                                                        {data.appointment.employee_status === 'coming' ? (
                                                            <p className="mt-4  uppercase font-bold  text-black">service status: COMING  </p>
                                                        ) : data.appointment.employee_status === 'on_the_way' ? (
                                                            <p className="mt-4  uppercase font-bold  text-black">service status: ON THE WAY </p>
                                                        ) : (
                                                            <p className="mt-4  uppercase font-bold  text-black">service status: NEAREST </p>
                                                        )}


                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="mt-4  uppercase font-bold  text-black">Payment Method: Cash on Delivery</p>
                                                        <p className="mt-4  uppercase font-bold  text-black">Payment Time: Not paid</p>
                                                        {data.appointment.employee_status === 'coming' ? (
                                                            <p className="mt-4  uppercase font-bold  text-black">service status: COMING  </p>
                                                        ) : data.appointment.employee_status === 'on_the_way' ? (
                                                            <p className="mt-4  uppercase font-bold  text-black">service status: ON THE WAY </p>
                                                        ) : (
                                                            <p className="mt-4  uppercase font-bold  text-black">service status: NEAREST </p>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <p className="mt-4  uppercase  font-bold text-black">Service Status: {data.action} </p>
                                        )}


                                    </div>
                                </div>

                                {data.appointment.payment_status === 'PY' || data.appointment.payment_method === 'CO' ? (
                                    <>
                                        {data.appointment.payment_status === 'PY' ? (
                                            <>


                                                <div className="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
                                                    <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                                                        <div className="text-green-500">
                                                            <svg className="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        </div>
                                                        <div className="text-sm  font-bold ml-3">Success Payment.</div>
                                                    </div>
                                                </div>


                                                <button onClick={(e) => handleReviewsModal(e, data.appointment.employee.id)} className="flex items-center bg-black gap-1 px-4 py-2 cursor-pointer text-white font-semibold tracking-widest rounded-md hover:bg-custom-blue duration-300 hover:gap-2 hover:translate-x-3">
                                                    Add Reviews
                                                    <svg className="w-5 h-5"
                                                        stroke="currentColor"
                                                        stroke-width="1.5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                                            stroke-linejoin="round"
                                                            stroke-linecap="round">
                                                        </path>
                                                    </svg>
                                                </button>

                                            </>
                                        ) : (

                                            <>
                                                <div className="relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
                                                    <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                                                        <div className="text-green-500">
                                                            <svg className="w-6 sm:w-5 h-6 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        </div>
                                                        <div className="text-sm  font-bold ml-3">Success Conformation.</div>
                                                    </div>
                                                </div>


                                                <button onClick={(e) => handleReviewsModal(e, data.appointment.employee.id)} className="flex items-center bg-black gap-1 px-4 py-2 cursor-pointer text-white font-semibold tracking-widest rounded-md hover:bg-custom-blue duration-300 hover:gap-2 hover:translate-x-3">
                                                    Add Reviews
                                                    <svg className="w-5 h-5"
                                                        stroke="currentColor"
                                                        stroke-width="1.5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                                            stroke-linejoin="round"
                                                            stroke-linecap="round">
                                                        </path>
                                                    </svg>
                                                </button>



                                            </>

                                        )}
                                    </>
                                ) : (
                                    <>
                                        {data.action === 'accepted' ? (
                                            <div className="border-t border-gray-200">
                                                <div className="flex">
                                                    <div className="flex items-center flex-1 px-6 py-5">
                                                        <span className="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate">
                                                            <button onClick={(e) => handleModal(e, data.id, data.appointment.id)} type="button" class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2">
                                                                <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path></svg>
                                                                Go to payment
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
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
                                    </>
                                )}

                            </div>

                        ))}

                    </div>




                </div>
            </section>
            {modal ? (
                <div className='flex justify-center h-screen'>
                    <div className="fixed left-auto right-auto   w-2/5  z-10  inset-0 overflow-y-auto">
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            <p className="mt-8 text-lg font-medium">Payment Methods</p>
                            <form className="mt-5 grid gap-6">

                                <div className="relative">

                                    <button onClick={handleCancel} type="button" className="bg-white   rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <input onClick={handleCashondelivery} className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                                        <img className="w-14 object-contain" src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/05/cashondelivery1.jpg" alt="" />
                                        <div className="ml-5">
                                            <span className="mt-2 font-semibold">Cash On Delivery</span>
                                            <p className="text-slate-500 text-sm leading-6">After completing service</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="relative">
                                    <input onClick={handlePayment} className="peer hidden" id="radio_2" type="radio" name="radio" checked />
                                    <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                    <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                                        <img className="w-14 object-contain" src="https://chartmogul.com/blog/wp-content/uploads/2020/12/why_stripe_popular_blog-scaled.jpeg" alt="" />
                                        <div className="ml-5">
                                            <span className="mt-2 font-semibold">Online Payment</span>
                                            <p className="text-slate-500 text-sm leading-6">Go though strip payment</p>
                                        </div>
                                    </label>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            ) : null}


            {reviewmodal ? (
                <UserReviews cancel={handleCancel} user={userId} employee={employee} />
            ) : null}

            <Toaster
                position="top-center"
                reverseOrder={false}
            />

        </Layouts>

    )
}

export default UserBookingList
