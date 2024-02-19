import React, { useEffect, useReducer, useState } from 'react'
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts';
import useAxios from '../../../AxiosConfig/Axios'
import Spinner from '../../../utils/Spinner';
import { FaEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

function EmployeeService() {
  const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
  let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [data , setData] = useState([])
  const [modalData , setModalData] = useState([])
  const [modal ,setModal] = useState(false)
  const [Id , setId] = useState('')
  const [dropdown , setDropDown] = useState(false)
  const [isLoading , setIsLaoding] = useState(true)
  const axiosInstance = useAxios()
  const employeeDetailsJson = localStorage.getItem('userDetails')
  const Employee =JSON.parse(employeeDetailsJson)
  const EmployeeId = Employee.id

  useEffect(() => {
    GetAppointment()
  },[EmployeeId , reducer])

  const GetAppointment = async () => {
    const response =  await axiosInstance.get(`/booking/employeeside/${EmployeeId}/`)
    if (response.status === 200){
      setData(response.data)
      setIsLaoding(false)
    }
  }

  if(isLoading){
    return <Spinner />
  }
  const handleModal = async (e , id) => {
    const response = await axiosInstance.get(`/booking/employeesideindivual/${id}/`)
    if (response.status === 200){
      setModalData(response.data)
      setModal(true)
    }
    
 
  }
  const handleCancel = () => {
    setModal(false)
    setDropDown(false)
  }
  const handleDropDown = (e , id) => {
    setDropDown(true)
    setId(id)
  }

  const handleEmployeeStatus = async (e, status) => {
    e.preventDefault()
    console.log(status);
    const response = await axiosInstance.post(`/booking/employeestatus/${Id}/`, {status})
    console.log(response);
    if (response.status === 200){
        toast.success('Successfully Updated Your Status')
        handleCancel()
        forceUpdate()
        return true
    }
  }
  return (
    <EmployeeLoyouts>
      

<div className="bg-white p-8 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">Service  conformation</h2>
			<span className="text-xs">All Service</span>
		</div>
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd" />
				</svg>
				<input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."/>
          </div>
		
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Name
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Location
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Service Amount
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Service Method
								</th>
                <th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									views
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
            {dropdown ? (
                      <div className="absolute  flex  right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                         <div onClick={handleCancel} className='hover: cursor-pointer' >
                            <IoMdClose size={20} />
                          </div>
                      <div className="py-1" role="none">
                        <a href="#" onClick={(e) => handleEmployeeStatus(e , 1)} className="text-gray-700 block px-4 py-2 uppercase text-sm" role="menuitem"  tabindex="-1" id="menu-item-0">Coming </a>
                        <a href="#" onClick={(e) => handleEmployeeStatus(e , 2)}  className="text-gray-700 block px-4 py-2 uppercase text-sm" role="menuitem" tabindex="-1" id="menu-item-1">On the Way</a>
                        <a href="#" onClick={(e) => handleEmployeeStatus(e , 3)}  className="text-gray-700 block px-4 py-2 uppercase text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Nearest</a>
                      </div>
                    </div>
                  ):null}
            {data.map((data , index) => (

							<tr>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div className="flex items-center">
										<div className="flex-shrink-0 w-10 h-10">
											<img className="w-full h-full rounded-full" src={`${BASE_URL}${data.user.images}`} alt="" />
                                        </div>
											<div className="ml-3">
												<p className="text-gray-900 uppercase whitespace-no-wrap">
													{data.user.first_name} {data.user.last_name}
												</p>
											</div>
										</div>
								</td>
								<td className="px-5 py-5 border-b uppercase border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap"> {data.location} </p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										{data.service_amount}
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {data.payment_method === 'ST' ? (

									<p className="text-gray-900 whitespace-no-wrap">
										ONLINE PAYMENT
									</p>
                  ): data.payment_method === 'CO' ? (
                    
									<p className="text-gray-900 whitespace-no-wrap">
                  CASH ON DELIVERY
                </p>
                  ):(
                    <p className="text-gray-900 whitespace-no-wrap">
                     PENDING
                  </p>
                  )}
								</td>
								<td  onClick={(e) => handleModal(e , data.id)} className="px-5 py-5 hover:cursor-pointer  border-b border-gray-200 bg-white text-sm">
                  <FaEye size={25} />
								</td>
              
                <td onClick={(e) => handleDropDown(e , data.id)} className="px-5 py-5 border-b hover:cursor-pointer border-gray-200 bg-white text-sm">
									<span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
									<span className="relative uppercase "> {data.employee_status} </span>
									</span>
             

								</td>
      
							</tr>
              
            ))}


						
						</tbody>
					</table>
					

				</div>
			</div>
		</div>
	</div>

  {modal ? (
    <div
    className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full ">

  <div  className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
                <div className="flex flex-col justify-between flex-1 px-5 py-6">
                    <div className=" flex gap-36 flex-shrink-0">
                        <span className="block text-xs font-semibold tracking-widest text-custom-blue uppercase"> FEEWOCK </span>
                          <div onClick={handleCancel} className=' hover: cursor-pointer' >
                            <IoMdClose size={20} />
                          </div>
                    </div>
                    <div className="flex-1 mt-6">
                        <p className="text-2xl font-semibold">
                            <a href="#" title="" className=" uppercase text-lg text-black"> Every need, one solution. </a>
                        </p>
                        <p className="mt-4 capitalize text-base text-black">USER NAME: {modalData.name}  </p>
                        <p className="mt-4 capitalize text-base text-black"> SERVICE LOCATION:{modalData.location}  </p>
                        <p className="mt-4  capitalize text-base text-black">USER NUMBER: {modalData.phone_number} </p>
                        <p className="mt-4 capitalize  text-base text-black">SERVICE AMOUNT: {modalData.service_amount} </p>
                        <p className="mt-4  capitalize text-base text-black">SERVICE DATE: {modalData.date} </p>
                        <p className="mt-4 capitalize text-base text-black">SERVICE TIME: {modalData.service_time} </p>
                        {modalData.payment_method === 'ST' ? (
                          <p className="mt-4 capitalize text-base text-black">PAYMENT METHOD: ONLINE PAYMENT </p>
                        ): modalData.payment_method === 'CO' ? (
                          <p className="mt-4 capitalize text-base text-black">PAYMENT METHOD: CASH ON DELIVERY </p>
                        ):(
                          <p className="mt-4 capitalize text-base text-black">PAYMENT METHOD: PENDING  </p>
                        )}

                    </div>
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

export default EmployeeService
