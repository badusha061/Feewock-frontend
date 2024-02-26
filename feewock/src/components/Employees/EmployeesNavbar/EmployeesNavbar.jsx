import React, { useEffect, useState } from 'react'
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useSelector , useDispatch} from 'react-redux';
import { cleartoken } from '../../../actions/TokenAction';
import './Notification.css'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Spinner from '../../../utils/Spinner'
import useAxios from '../../../AxiosConfig/Axios'


function EmployeesNavbar() {
    const axiosInstance = useAxios()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [details , setDetails] = useState([])
    const [notifications , setNotification] = useState([])
    const naviagate = useNavigate()
    const employeeDetailsJson = localStorage.getItem('userDetails')
    const Employee =JSON.parse(employeeDetailsJson)
    const EmployeeId = Employee.id
    const [count , setCount] = useState('')
    const [token , setToken] = useState('')

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userDetails');
    setToken('')
    dispatch(cleartoken())
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
        title: "Successfully Logged Out"
      });
    naviagate('/login')
  }


    let Links =[
        {name:"HOME",link:"/employee/employeedashboard"},
        {name:"PROFILE",link:"/employee/employeeprofile"},
        {name:"CHAT",link:"/employee/listuser"},
        {name:"POST",link:"/employee/post"},
        {name:"AVAILABLILITY",link:"/employee/availibile"},
        {name:"BOOKING",link:"/employee/booking"},
        {name:"SERVICE",link:"/employee/service"},
      ];

      let [open, setOpen] = useState(false);


      const client = new W3CWebSocket(`ws://localhost:8001/ws/notification/${EmployeeId}/`) 
      useEffect(() => {
        const handleMessage = (event) => {    
          const data = JSON.parse(event.data);
          console.log(data);
          setDetails(data.message)
          setNotification(data.message.message)
          setCount(data.count_number)
        };
    
        const handleOpen = () => {
          console.log('web socket is connected');

        };
    
        client.addEventListener('open', handleOpen);
        client.addEventListener('message', handleMessage);
    

        return () => {
          client.removeEventListener('open', handleOpen);
          client.removeEventListener('message', handleMessage);
          client.close();
        };
      }, []);
    


      const handleCancel = () => {
        setNotification(false)
      }

      const handleNavigate = () => {
          navigate('/employee/booking')
      }

      const handleNotification = () => {
        naviagate('/employee/notification')
      }

      useEffect(() => {
          GetEmployeeData()
      },[EmployeeId])

      const GetEmployeeData = async() => {
        if(EmployeeId){
        const response = await axiosInstance.get(`/employees/notification/${EmployeeId}/`)
        if (response.status === 200){
            setCount(response.data)
        }
      }
    }


  return (
    <div className='shadow-md w-full  top-0 left-0'>
    <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
     <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
         
         <span className=' text-custom-blue' >FEEWOCK</span>
     </div>
     <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
         {
             open ? <XMarkIcon/> : <Bars3BottomRightIcon />
         }
     </div>
     <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
         {
             Links.map((link , index) => (
             <NavLink
             end
             to={link.link}
             key={index}
             activeClassName="active-link"
             style={({ isActive }) => ({
              color: isActive ? 'red' : 'initial', 
            })}
             >
              <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                  <a className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</a>
              </li>
             </NavLink>
             ))
            
         }

            <div className='ml-4'> 
            <button onClick={handleNotification} className="button">
              <svg viewBox="0 0 448 512" className="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
              <span className="absolute inset-0 object-right-top -mr-6">
                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                      {count}
                    </div>
                  </span>
            </button> 
            </div>  

         <button onClick={handleLogout} className='btn bg-custom-blue text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>LOGOUT</button>
     </ul>
         
          {notifications && notifications.length > 0 ? (
            <div className="modal-overlay">
            <div className="notifications-modal">
            <div className="notifications-container">
            <div className="success">
              <div className="flex">
                <div className="flex-shrink-0">
                  
                  <svg className="succes-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <div className="success-prompt-wrap">
                  <p className="success-prompt-heading">New appointment created
                  </p><div className="success-prompt-prompt">
                    <p>Name:{details.appointment_details.name}.</p>
                    <p>Phone Number:{details.appointment_details.phone_number}.</p>
                    <p>Location:{details.appointment_details.location}.</p>
                    <p>Service Amount:{details.appointment_details.service_amount}.</p>
                    <p>Date:{details.appointment_details.date}.</p>
                    <p>Time:{details.appointment_details.service_time}.</p>

                  </div>
                    <div className="success-button-container">
                      <button onClick={handleNavigate} type="button" className="success-button-main">View status</button>
                      <button onClick={handleCancel} type="button" className="success-button-secondary">Dismiss</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
          ):null}


    </div>
 </div>
  )
}

export default EmployeesNavbar