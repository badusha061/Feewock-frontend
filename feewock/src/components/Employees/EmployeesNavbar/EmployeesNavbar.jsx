import React, { useEffect, useState } from 'react'
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useSelector , useDispatch} from 'react-redux';
import { cleartoken } from '../../../actions/TokenAction';
import './Notification.css'
import  Notification from './Notification.jsx'
import { w3cwebsocket as W3CWebSocket } from "websocket";


function EmployeesNavbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [notitficationModal , setNotificationModal] = useState(false)
    const [notifications , setNotification] = useState([])
    const naviagate = useNavigate()

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

    const handleTrue = () => {
      setNotificationModal(true)
    }
    let Links =[
        {name:"HOME",link:"/employee/employeedashboard"},
        {name:"PROFILE",link:"/employee/employeeprofile"},
        {name:"CHAT",link:"/employee/listuser"},
        {name:"POST",link:"/employee/post"},
        {name:"AVAILABLILITY",link:"/employee/availibile"},
        {name:"BOOKING",link:"/employee/booking"},
        {name:"SERVICE",link:""},
      ];

      let [open, setOpen] = useState(false);


      const client = new W3CWebSocket(`ws://localhost:8000/ws/notification/test/`) 
      useEffect(() => {
        const handleMessage = (event) => {
          console.log(event);
   
    
          const data = JSON.parse(event.data);
          console.log(data);
          console.log(data.message);
          setNotification(data.message)
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
    
      if(notifications){
        console.log('the notification is the ',notifications);
      }
  return (
    <div className='shadow-md w-full  top-0 left-0'>
    <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
     <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
         <BookOpenIcon className='w-7 h-7 text-blue-600'/>
         <span>FEEWOCK</span>
     </div>
     <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
         {
             open ? <XMarkIcon/> : <Bars3BottomRightIcon />
         }
     </div>
     <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
         {
             Links.map((link) => (
             <li className='md:ml-8 md:my-0 my-7 font-semibold'>
                 <a href={link.link} className='text-gray-800 hover:text-blue-400 duration-500'>{link.name}</a>
             </li>))
            
         }
          <div className=' ml-4'> 
          <button onClick={handleTrue} className="button">

            <svg viewBox="0 0 448 512" className="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
          </button> 
          </div>

          {notifications ? (
              <h1>
                {notifications}
              </h1>
          ):null}
        
            
         
         <button onClick={handleLogout} className='btn bg-custom-blue text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static'>LOGOUT</button>
     </ul>
         
    </div>
 </div>
  )
}

export default EmployeesNavbar