import React, { useEffect, useState } from 'react';
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


function Navbar() {
  
  const axiosInstance = useAxios()
  const [user , setUser] = useState([])
  const [modal , setModal] = useState(false)
  const [isLoading , setIsLaoding] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [notifications , setNotification] = useState([])
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [token , setToken] = useState('')

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    setToken(access_token)
  },[token])




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

  }
  let  userId 
  if(userDetails && userDetails.id){
    userId = userDetails.id
  }
  const client = new W3CWebSocket(`ws://localhost:8000/ws/notificationuser/test/`) 

  useEffect(() => {
    GetUserData()

  },[userId])
  
  useEffect(() => {
    const handleMessage = (event) => {


      const data = JSON.parse(event.data);
      setNotification(data.message)
    };

    const handleOpen = () => {

    };

    client.addEventListener('open', handleOpen);
    client.addEventListener('message', handleMessage);


    return () => {
      client.removeEventListener('open', handleOpen);
      client.removeEventListener('message', handleMessage);
      client.close();
    };
  }, []);

  
  const GetUserData = async() => {
    const  response =  await axiosInstance.get(`/api/userindivual/${userId}/`)
    console.log(response);
    if (response.status === 200){
        setUser(response.data)
        setIsLaoding(false)
    }else{
        console.log(response);
    }
}

  if(isLoading){
    return <Spinner />
  }

  const handleCancel = () => {
    setNotification(false)
  }

  const handleNavigate = () => {
    navigate('/bookinglist',{state:userId})
  }

  const handleNotification = () => {
    navigate('/usernotification')
  }

  const handleToggile = () => {
    setModal(!modal)
  }


  return (
    <>

<div className=' container mx-auto '>
<body className="bg-cyan-400">
  <nav className=" bg-white shadow md:flex md:items-center md:justify-between">
    <div className="flex justify-between items-center ">
      
    <NavLink to="/"  >
      <span className="text-2xl font-[Poppins] cursor-pointer">
          <img className="h-20 inline"
            src={icon}/>   
      </span>
    </NavLink>
 

      <span className="text-3xl cursor-pointer mx-2 md:hidden block">
        <ion-icon name="menu" onclick={handleToggile}></ion-icon>
      </span>
      
    </div>



    <ul className=" flex text-xs gap-4 md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
    
    <NavLink to="/" activeClassName="active-link" >
      <li className="mx-4 my-6 md:my-0">
        <div className=' flex items-center space-x-1.5'>
        <FaHome className="fill-current text-custom-blue"  size={25} />
        <a href="#" className=" font-semibold  hover:text-custom-blue duration-500">HOME</a>
        </div>
      </li>
    </NavLink>

    
    <NavLink to="/postlist" activeClassName="active-link" >
    <li className="mx-4 my-6 md:my-0">
      <div className=' flex items-center space-x-1.5'>
        <MdOutlineTravelExplore className="fill-current text-custom-blue" size={25}  />
        <a href="#" className=" font-semibold  hover:text-custom-blue duration-500">EXPLORE</a>
      </div>
      </li>
      </NavLink>
    
      <NavLink to="/service">
      <li className="mx-4 my-6 md:my-0">
        <div className=' flex  items-center space-x-1.5'>
        <MdMiscellaneousServices className="fill-current text-custom-blue"  size={25} />
        <a href="#" className="font-semibold  hover:text-custom-blue duration-500">SERVICE</a>
      </div>
      </li>
      </NavLink>

      {/* <li className="mx-4 my-6 md:my-0">
        <a href="#" className="font-semibold text-xs  hover:text-custom-blue duration-500">ABOUT</a>
      </li> */}

      <li className="mx-4 my-6 md:my-0">
      <div className=' flex items-center space-x-1.5 '>
        <IoMdContact   className="fill-current text-custom-blue"  size={25}  />
        <a href="#" className="font-semibold  hover:text-custom-blue duration-500">CONTACT</a>
      </div>
      </li>


      
      
   


      {token ? (
          <>
            <li>
                 {/* <button onClick={handleNotification}  className="button">
                 <svg viewBox="0 0 448 512" className="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
               </button>  */}
               <div  onClick={handleNotification} className='flex cursor-pointer  '>
                  <IoNotificationsCircle className="fill-current text-custom-blue"  size={30} />
               </div>

            </li>

            <div className="border-l-2 h-16 bg-custom-blue"></div>

            <li>
              <NavLink to={`/userprofile/${userId}`}>
              <div className=' flex justify-center  items-center w-8 h-8 bg-custom-blue rounded-full ' >
                  <FaRegUserCircle className="fill-current text-white"  />
              </div>
              </NavLink>
            </li>
                
            <li>
                {/* <button className="Btn" onClick={handleLogout}>
                <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                <div className="text">Logout</div>
              </button> */}
            <div className=' flex items-center space-x-2 ' >
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
        <a href="#" className="font-semibold  hover:text-custom-blue duration-500">EXPERT</a>
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