import React, { useEffect, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../../utils/Spinner';
import useAxios from '../../AxiosConfig/Axios'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

function ServicePayment() {
    const navigate = useNavigate()
    const axiosInstance = useAxios()
    const [isLoading , setIsLaoding] = useState(false)
    const [service , setService] = useState([])
    const location = useLocation()
    const state = location.state
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let  UserId 
    if(userDetails && userDetails.id){
      UserId = userDetails.id
    }

    let appointment
    let action 
    if(state){
        appointment = state.appointment
        action = state.action
    }
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    const cardElementOptions = {
        style: {
          base: {
            fontSize: '16px',
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
          },
        },
      };


    useEffect(() => {
        if(!state){
            navigate('/bookinglist')
        }else{
            GetService()
        }
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



    const HandlePayment =  () => {
        axios.post(`${BASE_URL}/booking/cashondelivery/${appointment}/`)
        .then((response) => {
            if(response.status === 200){
                toast.success('Successfully Conformed')
                navigate('/bookinglist',{state:UserId})

            }
        })
        .catch((error) => {
            toast.error('Server Side error',error)
        })
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
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-400">Complete your service by providing your payment details.</p>
       
        <div className="">
        
        
   


        <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900"> Reward </p>
            <p className="font-semibold text-gray-900">$0</p>
            </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            {service.length !== 0 ? (
                <p className="text-2xl font-semibold text-gray-900">${service.appointment.service_amount}</p>
            ):null}
        </div>
        </div>

            

        <button onClick={HandlePayment} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Conform Service </button>
        </div>
  
        
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          />

       
    </Layouts>
 
  )
}

export default ServicePayment
