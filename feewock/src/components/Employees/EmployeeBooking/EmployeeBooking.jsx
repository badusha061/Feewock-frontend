import React, { useEffect, useReducer, useState } from 'react'
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts'
import icon from '../../Navbar/image/icon.png'
import useAxios from '../../../AxiosConfig/Axios'
import Spinner from '../../../utils/Spinner'
import { data } from 'autoprefixer'
import Swal from 'sweetalert2'; 
import { w3cwebsocket as W3CWebSocket } from "websocket";


function EmployeeBooking() {
    const axiosInstance = useAxios()
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const employeeDetailsJson = localStorage.getItem('userDetails')
    const Employee =JSON.parse(employeeDetailsJson)
    const [isLoading , setIsloading] = useState(true)
    const [accept , setAccept] = useState(false)
    const [reject , setReject] = useState(false)
    const [final , setFinal] = useState('')
    const [reason , setReason] = useState('')
    let EmployeeId
    if(Employee){
        EmployeeId = Employee.id
    }
    const [appoitment , setAppoitment] = useState()
    useEffect(() => {
        GetAppotment()
        GetEmployeeAction()
    },[EmployeeId , reducer])

    const GetAppotment = async () => {
        const response = await axiosInstance.get(`/booking/appointment/${EmployeeId}/`)
        if(response.status === 200){
            setAppoitment(response.data)
            setIsloading(false)

        }
    }
  
    const [actions , setActions] = useState([])
    const GetEmployeeAction = async () => {
        const response = await axiosInstance.get('/booking/action')
        if(response.status === 200){
            setActions(response.data)
            console.log(response.data);

        }
    }

    if(isLoading){
        return <Spinner />
    }

    const handleAccept = (e ,id) => {
        e.preventDefault()
        setAccept(true)
        console.log(id);
        setFinal(id)
    }
    const handleReject = async (e, id) => {
        e.preventDefault()
        setReject(true)
        setFinal(id)
    }
    const client = new W3CWebSocket(`ws://localhost:8000/ws/notificationuser/test/`) 
    const isWebsocketConnect = () => {
        return client.readyState === WebSocket.OPEN;
      }

    const FinalAccept = async () => {
        if(isWebsocketConnect){
            if(final){
                const response = await axiosInstance.post('/booking/action', {
                    appointment:final,
                    action:'accepted'
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
                        title: "Successfully Accepted Service"
                      });
                    handleClose()
                    return true
                }
            }
    
        }else{
            console.log('websocket is not connected');
        }
        
    }

    const FinalReject = async () => {
        if(isWebsocketConnect){
            if(reason){
                if(final){
                    const response = await axiosInstance.post('/booking/action', {
                        appointment:final,
                        action:'rejected',
                        comment:reason
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
                            title: "Successfully Rejected Service"
                          });
                        handleClose()
                        return true
                    }
                }
            }else{
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
                    title: 'Please Enter Your Reason',
                  });
                  return false
            }
        }else{
            console.log('web socket is not connected');
        }
       
       
    }

    const handleClose = () => {
        setAccept(false)
        setReject(false)
        forceUpdate()
    }
  return (
    <EmployeeLoyouts>
    
    {appoitment ? (
         <div className=' pt-4'>

         <div className=' pl-12 pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
  
          {appoitment.map((data , index) => (
  
          <div className="relative w-60  h-auto bg-gray-50 rounded-2xl p-4  shadow shadow-sky-800 flex flex-col justify-around items-stretch">
              <img className='  w-28 ' src={icon} alt="" />
          <span className="text-black uppercase font-semibold text-xl">Appoitment</span>
          <div class="flex gap-2 text-sm text-gray-500 border-b pb-2">
              <p class="">Name:</p>
              <p className=' capitalize'> {data.name} </p>
          </div>
          <div class="flex gap-2 capitalize text-sm text-gray-500 border-b pb-2">
              <p class="">Service Amount:</p>
              <p className=' capitalize'> {data.service_amount} </p>
          </div>
          <div class="flex gap-2 text-sm text-gray-500 border-b pb-2">
              <p class="">Phone Number:</p>
              <p> {data.phone_number} </p>
          </div>
          <div class="flex gap-2 text-sm text-gray-500 border-b pb-2">
              <p class="">Locations:</p>
              <p className=' capitalize' > {data.location} </p>
          </div>
          <div class="flex gap-2 text-sm text-gray-500 border-b pb-2">
              <p class="">Date:</p>
              <p> {data.date} </p>
          </div>
          <div class="flex gap-2 text-sm text-gray-500 border-b pb-2">
              <p class="">Time:</p>
              <p> {data.service_time} </p>
          </div>
        {actions.find(obj => obj.appointment === data.id) ? (
            <>
            </>
        ):(
            <div className="flex flex-col gap-2">
              <button onClick={(e) => handleAccept(e, data.id)} className="border-2  bg-custom-blue py-1 rounded text-gray-50 hover:bg-black">ACCEPT</button>
              <button onClick={(e) => handleReject(e, data.id)} className="border-2   bg-red-700 py-1 rounded hover:bg-red-900 ">REJECT</button>
          </div>
        )}
          

          </div>
          ))} 
          </div> 
      </div>
    ):null}
   
   {accept ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            <div
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                    <div
                        className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg className="h-6 w-6 text-green-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            CONFORMATION
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm leading-5 text-gray-500">
                                Are You Canform to take this service
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                        <button onClick={FinalAccept} type="button"
                            className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Accept
                        </button>
                    </span>
                    <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                        <button onClick={handleClose} type="button"
                            className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                            Cancel
                        </button>
                    </span>
                </div>
            </div>
        </div>
        </div>
   ):null}

    {reject ? (
        <>  
        <div
        className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
        <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative">
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
            <h4 className="text-xl font-semibold mt-6">Are you sure you want to reject  it?</h4>
            <div>
            <label htmlFor="inputname" className="block text-gray-800 font-semibold text-sm"
                >Reason Why</label
            >
            <div className=" flex justify-center mt-2">
                <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                type="text"
                name="inputname"
                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                />
            </div>
            <label className="pt-1 block text-gray-500 text-sm">Why you Reject this service</label>
            </div>

          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={FinalReject} type="button"
              className="px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500">Reject</button>
            <button onClick={handleClose} type="button"
              className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200">Cancel</button>
          </div>
        </div>
      </div>
      </>

    ):null}


    </EmployeeLoyouts>
  )
}

export default EmployeeBooking
