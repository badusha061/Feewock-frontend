import React, { useEffect, useState , useReducer } from 'react'
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts'
import username from './Images/user.png'
import eamil from './Images/email.png'
import gender from './Images/gender.png'
import mobile from './Images/mobile.png'
import dob from './Images/date-of-birth.png'
import city from './Images/city.png'
import state from './Images/state.png'
import address from './Images/address.png'
import adhar from './Images/adhar-number.png'
import work from './Images/work.png'
import service from './Images/service.png'
import location from './Images/location.png'
import Swal from 'sweetalert2';
import EditProfile from './EditProfile'
import useAxios from '../../../AxiosConfig/Axios'
import Spinner from '../../../utils/Spinner'    


function EmployeeProfile() {

    const [data , setData] = useState([])
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const axiosInstance = useAxios()
    const [isLoading , setIsLaoding] = useState(true)
    const employeeDetailsJson = localStorage.getItem('userDetails')
    const Employee =JSON.parse(employeeDetailsJson)
    const EmployeeId = Employee.id

    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
        GetEmployeeData()
    },[BASE_URL , reducer])

    const GetEmployeeData = async() => {
        const response = await axiosInstance.get(`${BASE_URL}/dashboard/employeeindivualPermsion/${EmployeeId}/`)
        if (response.status === 200){
            setData(response.data)
            setIsLaoding(false)

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
                title: 'Unauthorized please Login',
              });
              return false
        }
    }

    // if(isLoading){
    //     return <Spinner />
    // }
    
    const handleButton = () => {
        document.getElementById('ImageInput').click();
    }


    const handleImage = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        if(file){
            const config = {headers:{'Content-Type':'multipart/form-data'}}
            const formData = new FormData();
            
            formData.append('images',file)
            const response = await axiosInstance.put(`${BASE_URL}/employees/employeeupdate/${EmployeeId}/`, formData,config);
            if(response.status === 200){
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
                    title: "Successfully Updated Image"
                  });
                forceUpdate()
            }else{
                console.log('something error ');
            }
        }else{
            console.log('not');
        }
    }

  

    const [modal , setModal] = useState(false)

    const CancelModal = () => {
        setModal(false)
    }
    const handleModal = (e) => {
        console.log('clicked');
        setModal(true)
    }

  return (
    <EmployeeLoyouts>
              <section className="py-10 bg-custom-blue rounded-3xl sm:py-16 lg:py-24">
          <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="mx-auto text-left md:max-w-lg lg:max-w-2xl md:text-center">
                  <h2 className="text-3xl uppercase font-bold leading-tight text-white sm:text-4xl lg:text-5xl lg:leading-tight">
                      {data.username}
                  </h2>
              </div>

              <div className="grid grid-cols-1 mt-8 md:mt-20 gap-y-6 md:grid-cols-2 gap-x-10">
                  <div>
                    {data.images ? (
                      <img className="w-full rounded-lg mx-auto sm:max-w-xs" src={data.images} alt="" />
                    ):(
                      <img className="w-full rounded-lg mx-auto sm:max-w-xs" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/2/business-man.jpg" alt="" />
                    )}
                      <div className=' flex justify-center  '>
                        <input accept='image/*' type='file' onChange={handleImage} style={{ display: 'none' }} id='ImageInput' />
                      <button onClick={handleButton} className="w-[150px] bg-white h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-black before:to-black before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 hover:text-white text-black"> Change Profile </button>

                      </div>
                  </div>

                  <div>
                      <h3 className="text-lg font-semibold text-white">Hey! {data.username},</h3>
                      <p className="mt-4 text-lg text-white">We are on a mission to revolutionize the unorganized services sector by leveraging technology. Our goal is to facilitate customers in connecting with verified professionals nearby, while also assisting these experts in finding customers with minimal investment.</p>
                  </div>
              </div>
          </div>
      </section>
            {modal && (
                <div className="fixed inset-0 z-50 overflow-auto">
                    <EditProfile close={CancelModal} EmployeeId={EmployeeId} />
                </div>
            )}


                        
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg className="h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <h1 className="tracking-wide uppercase text-3xl font-bold"> About Me </h1>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm gap-4">
                            <div className="grid grid-cols-2  ">
                              <img className='h-6 px-4 ' src={username} alt="" />
                              <div className="px-4  capitalize "> {data.username} </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <img className='h-6 px-4 ' src={eamil} alt="" />
                                <div className="px-4 capitalize "> {data.email} </div>
                            </div>
                            <div className="grid grid-cols-2">
                            <img className='h-6 px-4 ' src={gender} alt="" />
                            {data.gender === 'M' ? (
                            <div className="px-4 capitalize ">Male</div>
                            ) : data.gender === 'F' ? (
                            <div className="px-4 ">Female</div>
                            ) : data.gender === 'N' ? (
                            <div className="px-4 ">Non Binary</div>
                            ) : (
                            <div className="px-4 ">Prefer Not Say</div>
                            )}
                            </div>
                            <div className="grid grid-cols-2">
                                <img className='h-6 px-4 ' src={mobile} alt="" />
                                <div className="px-4 ">+91{data.phone_number}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <img className='h-6 px-4 ' src={dob} alt="" />
                                <div className="px-4 "> {data.dob}</div>
                            </div>

                            <div className="grid grid-cols-2">
                               <img className='h-6 px-4 ' src={city} alt="" />
                                <div className="px-4 capitalize "> {data.city} </div>
                            </div>
                           
                            <div className="grid grid-cols-2">
                               <img className='h-6 px-4 ' src={state} alt="" />
                                <div className="px-4 capitalize "> {data.state} </div>
                            </div>
                           

                            <div className="grid grid-cols-2">
                               <img className='h-6 px-4 ' src={address} alt="" />
                                <div className="px-4 capitalize "> {data.address} </div>
                            </div>
                            <div className="grid grid-cols-2">
                               <img className='h-6 px-4 ' src={adhar} alt="" />
                                <div className="px-4 "> {data.adhar_number} </div>
                            </div>
                            <div className="grid grid-cols-2">
                               <img className='h-6 px-4 ' src={work} alt="" />
                                {data.type_of_work === 'FT' ? (
                                <div className="px-4 ">Full Time</div>
                                ) : data.type_of_work === 'PT' ? (
                                <div className="px-4 ">Part Time</div>
                                ) : data.type_of_work === 'CT' ? (
                                <div className="px-4 ">Contract</div>
                                ) : (
                                <div className="px-4 ">Internship</div>
                                )}
                            </div>

                            <div className="grid grid-cols-2">
                               <img className='h-6 px-4 ' src={service} alt="" />
                               {data.service ? (
                                data.service.map((service, index) => (
                                    <div key={index} className="px-4">
                                    {service.name}
                                    </div>
                                ))
                                ) : (
                                <div className="px-4">No service</div>
                                )}
                            </div>

                              
                            <div className="grid grid-cols-2">
                               <img className='h-6 px-4 ' src={location} alt="" />
                                <div className="px-4 "> {data.location} </div>
                            </div>
                      
                        </div>
                    </div>
                    <button onClick={handleModal} className="block w-full text-black text-sm font-semibold rounded-lg hover:text-white hover:bg-custom-blue focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit Your Profile</button>
                </div>

    </EmployeeLoyouts>
  )
}

export default EmployeeProfile