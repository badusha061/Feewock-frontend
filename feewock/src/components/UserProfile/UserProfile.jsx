import React, { useEffect , useReducer ,useState } from 'react'
import Layouts from '../../layouts/Layouts'
import { useParams } from 'react-router-dom'
import useAxios from '../../AxiosConfig/Axios'
import user from './Images/user.png'
import email from './Images/email.png'
import location from './Images/location.png'
import mobile from './Images/mobile.png'
import Swal from 'sweetalert2';
import EditProfileUser from './EditProfileUser.jsx'                          
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../../utils/Spinner.jsx'



function UserProfile() {
    const navigate = useNavigate()
    const [data , setData] = useState([])
    const [isLoading , setIsLaoding] = useState(true)
    const params = useParams()
    const UserId = params.id
    const axiosInstance = useAxios()
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
       GetUserData()
    },[BASE_URL, reducer])

    const GetUserData = async() => {
        const  response =  await axiosInstance.get(`${BASE_URL}/api/userindivual/${UserId}/`)
        if (response.status === 200){
            setData(response.data)
            setIsLaoding(false)
        }else{
            console.log(response);
        }
    }
    const handleButton = () => {
        document.getElementById('ImageInput').click();
    }

    const handleImage = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        console.log('firls is the',file);
        if(file){
            const config = {headers:{'Content-Type':'multipart/form-data'}}
            const formData = new FormData();
            
            formData.append('images',file)
            const response = await axiosInstance.put(`${BASE_URL}/api/userimages/${UserId}/`, formData,config);
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
    const handleModal = () => {
        setModal(true)
    }
    const handleClose = () => {
        setModal(false)
        forceUpdate()
    }
    const handleNavigate = () => {
        navigate('/bookinglist',{state:UserId})
    }
    if(isLoading){
        return <Spinner />
    }
  
  return (
    <Layouts>

    <div className="bg-gray-100">
    <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
                <div className="bg-white  shadow rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        {data.images ? (
                              <img src={data.images} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
                              </img>
                        ):(
                            <img src="https://randomuser.me/api/portraits/men/94.jpg" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">
                            </img>
                        )}
                       
                        <input type="file"  accept='image/*' onChange={handleImage} style={{ display: 'none' }} id='ImageInput' />
                        <button  onClick={handleButton}  className=" hover:bg-black bg-custom-blue text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Change
                        </button>
                        <h1 className="text-xl font-bold">{data.first_name} {data.last_name}</h1>
                      <div className=' flex'>
                      <button onClick={handleModal} className="flex p-2.5 bg-custom-blue rounded-lg hover:rounded-3xl hover:bg-black transition-all duration-300 text-white mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                        </button>
                        <button
                        onClick={handleNavigate}
                            className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-custom-blue hover:bg-white hover:text-[#7747FF] focus:text-[#7747FF] focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200"
                            >
                           Booking
                        </button>

                      </div>
                    
                            
            
                    </div>                 
                </div>
               
            </div>
            <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">

                {modal && (
                    <div className="fixed inset-0 z-50 overflow-auto">
                    <EditProfileUser close={handleClose}  UserId={UserId} />
                    </div>
                )}
        <h2 className="  text-xl font-bold mb-4">About Me</h2>                                  
                <table>
                    <tbody>
                        <tr>
                            <td><img src={user} className='w-5' alt="" /></td>
                            <td className='font-semibold text-lg'>  {data.first_name} </td>
                        </tr>
                        <tr>
                            <td><img src={user} className='w-5' alt="" /></td>
                            <td className='font-semibold text-lg'>{data.last_name}</td>
                        </tr>
                        <tr>
                            <td><img src={email} className='w-5' alt="" /></td>
                            <td className='font-semibold text-lg'>{data.email}</td>
                        </tr>
                        <tr>
                            <td><img src={mobile} className='w-5' alt="" /></td>
                            <td className=' font-semibold  text-lg'>{data.phone_number}</td>
                        </tr>
                        <tr>
                            <td><img src={location} className='w-5' alt="" /></td>
                            <td className='font-semibold text-lg'>{data.location}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</div>
</div>
    </Layouts>
  
  )
}

export default UserProfile
