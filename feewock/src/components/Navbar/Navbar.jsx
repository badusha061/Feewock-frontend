import React, { useEffect, useReducer, useState } from 'react';
import icon from './image/icon.png'
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useSelector , useDispatch} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser}   from "@fortawesome/free-solid-svg-icons"
import { cleartoken } from '../../actions/TokenAction';
import Swal from 'sweetalert2';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Usernotification from '../../notification/usernotification';
import { FaHome } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoNotificationsCircle } from "react-icons/io5";
import useAxios from '../../AxiosConfig/Axios';
import Spinner from '../../utils/Spinner';
import { IoIosLogOut } from "react-icons/io";

function Navbar() {
  
  const axiosInstance = useAxios()
  const [user , setUser] = useState([])
  const [modal , setModal] = useState(false)
  const [logout , setLogout] = useState(false)
  const [isLoading , setIsLaoding] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notifications , setNotification] = useState([])
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [token , setToken] = useState('')
  const [count , setCount] = useState('')
  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    setToken(access_token)
  },[token])
  const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)




  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userDetails')
    dispatch(cleartoken())
    setToken('')
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
    forceUpdate()
    handleCancel()
  }
  let  userId 
  if(userDetails && userDetails.id){
    userId = userDetails.id
  }
  


  useEffect(() => {
    GetUserData()
    GetNotitficationCount()
  },[userId,reducer])
  
  useEffect(() => {

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      setNotification(data.message.message)
      setCount(data.count_number)
    };



    const handleOpen = () => {
    };

    if(userId){
      const client = new W3CWebSocket(`ws://localhost:8001/ws/notificationuser/${userId}/`) 
      client.addEventListener('open', handleOpen);
      client.addEventListener('message', handleMessage);
  
      return () => {
        client.removeEventListener('open', handleOpen);
        client.removeEventListener('message', handleMessage);
  
        client.close();
      };
    }



  }, []);

  
  const GetUserData = async() => {
    if (userId){
      const  response =  await axiosInstance.get(`/api/userindivual/${userId}/`)
      if (response.status === 200){
          setUser(response.data)
          setIsLaoding(false)
      }
    }
}

  const GetNotitficationCount = async() => {
    if(userId){
      const response = await axiosInstance.get(`/api/notification/${userId}/`)
      if (response.status === 200){
          setCount(response.data)
      }
    }
  }

  if(userId){
    if(isLoading){
      return <Spinner />
    }
  }

  const handleCancel = () => {
    setNotification(false)
    setLogout(false)
  }

  const handleNavigate = () => {
    navigate('/bookinglist',{state:userId})
  }

  const handleNotification = () => {
    navigate('/usernotification')
  }

  const handleToggile = () => {
    setModal(true)
  }


  const handleModal = () => {
    setLogout(true)
  }

  return (
    <>

<div className=' container mx-auto '>
<body className="bg-cyan-400">
  <nav className=" bg-white shadow md:flex md:items-center md:justify-between">
    <div className="flex justify-between items-center ">
      
    <NavLink

    to="/"  >
      <span className="text-2xl font-[Poppins] cursor-pointer">
          <img className="h-20 inline"
            src={icon}/>   
      </span>
    </NavLink>
 

      <span className="text-3xl cursor-pointer mx-2 md:hidden block" >
        <ion-icon name="menu" ></ion-icon>
      </span>
      
    </div>



    {/* <ul className=" flex text-xs gap-4 md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500"> */}
    
    <ul className={`flex text-xs gap-4 md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 ${modal ? 'opacity-100 top-0' : 'opacity-0 top-[-400px]'}`} transition-all ease-in duration-500>
    <NavLink
            style={({ isActive }) => {
              return isActive ? { color: '#3E84A8'} : {};
            }}
    to="/" activeClassName="active-link" >
      <li className="mx-4 my-6 md:my-0">
        <div className=' flex items-center space-x-1.5'>
        <FaHome className="fill-current text-custom-blue"  size={25} />
        <a href="#" className=" font-semibold  hover:text-custom-blue duration-500">HOME</a>
        </div>
      </li>
    </NavLink>

    
    <NavLink 
    style={({ isActive }) => {
      return isActive ? { color: '#3E84A8'} : {};
    }}
    
    to="/postlist" activeClassName="active-link" >
    <li className="mx-4 my-6 md:my-0">
      <div className=' flex items-center space-x-1.5'>
        <MdOutlineTravelExplore className="fill-current text-custom-blue" size={25}  />
        <a href="#" className=" font-semibold  hover:text-custom-blue duration-500">EXPLORE</a>
      </div>
      </li>
      </NavLink>
    
      <NavLink 
      style={({ isActive }) => {
        return isActive ? { color: '#3E84A8'} : {};
      }}
      to="/service">
      <li className="mx-4 my-6 md:my-0">
        <div className=' flex  items-center space-x-1.5'>
        <MdMiscellaneousServices className="fill-current text-custom-blue"  size={25} />
        <a href="#" className="font-semibold  hover:text-custom-blue duration-500">SERVICE</a>
      </div>
      </li>
      </NavLink>

    <NavLink 
    style={({ isActive }) => {
      return isActive ? { color: '#3E84A8'} : {};
    }}
    to="/contact">
      <li className="mx-4 my-6 md:my-0">
      <div className=' flex items-center space-x-1.5 '>
        <IoMdContact   className="fill-current text-custom-blue"  size={25}  />
        <a href="#" className="font-semibold  hover:text-custom-blue duration-500">CONTACT</a>
      </div>
      </li>
    </NavLink>


      
      
   


      {token ? (
        <>
        <div  className="border-l-2 h-16 rounded-full  bg-custom-blue"></div>
            <li  >
                <button onClick={handleNotification} className="py-4 px-1 relative border-2   border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Cart">
                    <IoNotificationsCircle className="fill-current  text-custom-blue"  size={30} />
                  <span className="absolute inset-0 object-right-top -mr-6">
                    <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                      {count}
                    </div>
                  </span>
                </button>
            </li>


            <li>
              <NavLink to={`/userprofile/${userId}`}>
              <div className=' flex justify-center  items-center w-8 h-8 bg-custom-blue rounded-full ' >
                  <FaRegUserCircle className="fill-current text-white"  />
              </div>
              </NavLink>
            </li>
                
            <li>
       
            <div onClick={handleModal} className=' flex items-center space-x-2 ' >
              <p className="font-semibold  cursor-pointer hover:text-custom-blue duration-500 " >{user.first_name} </p>
              <div className=' flex cursor-pointer' >
                <IoIosArrowDown />
              </div>
          </div>
          </li> 
          </>
        ): (
          <>

    <NavLink to='/employee/employeeregister' >
      <li className="mx-4 my-6 md:my-0">
      <button
              type="button"
              className="inline-block rounded bg-custom-blue px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              EXPERT
            </button>
      </li>
      </NavLink>

          <li>
        <NavLink to="/login">

        <button
              type="button"
              className="inline-block rounded bg-custom-blue px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              Login
            </button>


        </NavLink>
        </li>

          <li>
          <NavLink to="/register">
          <button
              type="button"
              className="inline-block rounded bg-custom-blue px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light">
              Register
            </button>
            </NavLink>
          </li>
        
          </>
        )}


    { logout && (

      <div className="absolute right-0 z-10 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div className="py-1" role="none">
        <NavLink to={`/userprofile/${userId}`} >
        <div  className=' flex  items-center' >
        <a href="#" className="text-black block uppercase px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
        <FaRegUserCircle className="fill-current text-custom-blue"  size={27} />
        </div>
        </NavLink>
          <div onClick={handleLogout}  className=' flex  items-center' >
          <button type="submit" className="text-black uppercase block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
          <IoIosLogOut className="fill-current text-custom-blue"  size={30} />
          </div>
      </div>
    </div>

    )}

    { notifications === "Your service is Accepted."  ? (
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
              <p className="success-prompt-heading">Your service is Accepted.
              </p>
                <div className="success-button-container">
                  <button onClick={handleNavigate} type="button" className="success-button-main">View status</button>
                  <button onClick={handleCancel} type="button" className="success-button-secondary">CANCEL</button>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      ): notifications === "Your service is Rejected." ? (
        <>
        
        <div className="modal-overlay">
         <div className="notifications-modal">
         <div className="notifications-container">
         <div className="error-alert">
           <div className="flex">
             <div onClick={handleCancel} className="flex-shrink-0">
              
               <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http:www.w3.org/2000/svg" className="error-svg">
                 <path clip-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" fill-rule="evenodd"></path>
               </svg>
             </div>
             <div className="error-prompt-container">
               <p className="error-prompt-heading">Your service is Rejected.
               </p>
             </div>
           
           </div>
         </div>
       </div>
       </div>
       </div>
        </>
      ):null}
    </ul>

  </nav>
</body>
</div>


        


    </>
  )
}

export default Navbar