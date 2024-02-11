import React, { useEffect, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useNavigate } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Spinner from '../../utils/Spinner';
import useAxios from '../../AxiosConfig/Axios'

function ServicePayment() {
    const navigate = useNavigate()
    const axiosInstance = useAxios()
    const [isLoading , setIsLaoding] = useState(false)
    const [service , setService] = useState([])
    const [modal , setModal] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const location = useLocation()
    const state = location.state
    const appointment = state.appointment
    const action = state.action
    useEffect(() => {
        GetService()
    },[action])

    const GetService = async() => {
        if (action){
            const response = await  axiosInstance.get(`/booking/indivual/${action}/`)
            if(response.status === 200){
                setService(response.data)
                console.log(response.data);
                setIsLaoding(false)
            }
        }else{
            navigate('/bookinglist')
        }
    }

    if(isLoading){
        return <Spinner />
    }

    const handleModalTrue= () => {
        setModal(true)
    }

    const handleModalFalse = () => {
        setModal(false)
    }

  return (
    <Layouts>
          <div  className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
  <div  className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
    <div  className="relative">
      <ul  className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
        <li  className="flex items-center space-x-3 text-left sm:space-x-4">
          <a  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
            ><svg xmlns="http://www.w3.org/2000/svg"  className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
          ></a>
          <span  className="font-semibold text-gray-900">Service Accepted</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg"  className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li  className="flex items-center space-x-3 text-left sm:space-x-4">
          <a  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
          <span  className="font-semibold text-gray-900">Payment</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg"  className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </ul>
    </div>
  </div>
        </div>
        <div  className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div  className="px-4 pt-8">
            <p  className="text-xl font-medium">Service Summary</p>
            <p  className="text-gray-400">Check your service. And select a suitable service payment method.</p>
            <div  className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <p  className="mt-8 text-lg font-medium">Payment Methods</p>
            <form  className="mt-5 grid gap-6">
            <div  className="relative">
                <input onClick={handleModalTrue} className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                <span  className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                <img  className="w-14 object-contain" src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/05/cashondelivery1.jpg" alt="" />
                <div  className="ml-5">
                    <span  className="mt-2 font-semibold">Cash On Delivery</span>
                    <p  className="text-slate-500 text-sm leading-6">After completing service</p>
                </div>
                </label>
            </div>
            <div  className="relative">
                <input onClick={handleModalFalse} className="peer hidden" id="radio_2" type="radio" name="radio" checked />
                <span  className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                <img  className="w-14 object-contain" src="https://chartmogul.com/blog/wp-content/uploads/2020/12/why_stripe_popular_blog-scaled.jpeg" alt="" />
                <div  className="ml-5">
                    <span  className="mt-2 font-semibold">Online Payment</span>
                    <p  className="text-slate-500 text-sm leading-6">Go though strip payment</p>
                </div>
                </label>
            </div>
            </form>

            </div>

            
            <div className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
                <div className="flex flex-col justify-between flex-1 px-5 py-6">
                    <div className="flex-shrink-0">
                        <span className="block text-xs font-semibold tracking-widest text-custom-blue uppercase"> FEEWOCK </span>
                    </div>

                    <div className="flex-1 mt-6">
                        <p className="text-2xl font-semibold">
                            <a href="#" title="" className="text-black"> Every need, one solution. </a>
                        </p>
                    {service.length !== 0 ? (
                        <>
                          <p className="mt-4 text-base text-black"> Your Name: {service.appointment.name}</p>
                          <p className="mt-4 text-base text-black">Employee Name: {service.appointment.employee.username} </p>
                          <p className="mt-4 text-base text-black">Location: {service.appointment.location}</p>
                          <p className="mt-4 text-base text-black">Service Amount: {service.appointment.service_amount} </p>
                          <p className="mt-4 text-base text-black">Service Date: {service.appointment.date}</p>
                          <p className="mt-4 text-base text-black">Service Time: {service.appointment.service_time} </p>
                        </>
                    ):null}
                  
                    </div>
                </div>               
            </div>
    
        </div>
    {modal === false ? (
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-400">Complete your service by providing your payment details.</p>
        <div className="">
        <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
        <div className="relative">
            <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            </div>
        </div>
        <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
        <div className="relative">
            <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
            </svg>
            </div>
        </div>
        <label for="card-no" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
        <div className="flex">
            <div className="relative w-7/12 flex-shrink-0">
            <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                </svg>
            </div>
            </div>
            <input type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
            <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
        </div>
        <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
        <div className="flex flex-col sm:flex-row">
            <div className="relative flex-shrink-0 sm:w-7/12">
            <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" />
            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
            </div>
            </div>
            <select type="text" name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500">
            <option value="State">State</option>
            </select>
            <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP" />
        </div>

        <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Subtotal</p>
            <p className="font-semibold text-gray-900">$399.00</p>
            </div>
            <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Shipping</p>
            <p className="font-semibold text-gray-900">$8.00</p>
            </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">$408.00</p>
        </div>
        </div>
        <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
        </div>
    ):(
        <>
            <h1> cash on Delivery </h1>
        </>
    )}
        
        </div>

       
    </Layouts>
  )
}

export default ServicePayment
