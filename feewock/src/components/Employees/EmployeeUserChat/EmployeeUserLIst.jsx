import React, { useEffect, useState , useReducer } from 'react'
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts'
import { json, useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../../../AxiosConfig/Axios'
import Swal from 'sweetalert2';
import { w3cwebsocket as W3CWebSocket  } from 'websocket';
import { data } from 'autoprefixer';
import Spinner from '../../../utils/Spinner';

function EmployeeUserLIst() {
    const navigate = useNavigate()
    const employeeDetailsJson = localStorage.getItem('userDetails')
    const Employee =JSON.parse(employeeDetailsJson)
    const EmployeeId = Employee.id
    const [users , setUsers] = useState([])
    const [isLoadingChat , setIsLaodingChat] = useState(true)
    const axiosInstance = useAxios()
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    
    useEffect(() => {
        GetUsers()
      },[BASE_URL])
      const GetUsers = async() => {
        const response = await axiosInstance.get(`${BASE_URL}/chat/employeemessage/${EmployeeId}/`)
        if(response.status === 200){
            setUsers(response.data)
            setIsLaodingChat(false)
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


    const HandleCick = (e , id) => {
        navigate('/chat',{ state: { UserId: id, EmployeeId: EmployeeId } })
    }

    if(isLoadingChat){
      return <Spinner />
    }

  return (
    <EmployeeLoyouts>

    <div className="py-10 h-screen bg-gray-300 px-2">
    <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
            <div className="w-full p-4">
                <div className="relative"> <input type="text" className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md" placeholder="Search..."/> <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i> </div>
                <ul>
                    {users.map((data , index) => (
                    <li onClick={(e) =>  HandleCick(e , data.id)} className="flex justify-between items-center bg-white mt-2 p-2 hover:shadow-lg rounded cursor-pointer transition">
                         {data.images ? (

                         <div key={index}  className="flex ml-2"> <img src={`${BASE_URL}${data.images}`} width="40" alt='image' height="40" className="rounded-full" />
                             <div   className="flex flex-col ml-2"> <span className="font-medium capitalize text-black" key={index} > {data.first_name} {data.last_name} </span> 
                             </div>
                         </div>
                         ):(
                            <div key={index} className="flex ml-2"> <img src="https://i.imgur.com/aq39RMA.jpg" width="40" height="40" className="rounded-full" />
                            <div className="flex flex-col ml-2"> <span className="font-medium capitalize text-black"> {data.first_name} {data.last_name} </span> 
                            </div>
                            </div>
                         )}

                     </li>
                    ))}
                   
                </ul>
            </div>
        </div>
    </div>
</div>
</EmployeeLoyouts>

  )
}

export default EmployeeUserLIst
