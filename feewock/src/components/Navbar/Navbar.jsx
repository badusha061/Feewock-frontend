import React, { useEffect, useState } from 'react';
import icon from './image/icon.png'
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser}   from "@fortawesome/free-solid-svg-icons"


function Navbar() {
  const t = useSelector(state => state.token.token)
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [token , setToken] = useState('')

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')
    setToken(access_token)
  },[token])

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userDetails')
    setToken('')
  }
  let  userId 
  if(userDetails && userDetails.id){
    userId = userDetails.id
  }
  return (
    <>

       <div className="w-screen   justify-between items-center inline-flex shadow-lg ">
        <img src={icon} alt="navbaricon"  className='w-[140px] h-[28]'/>
        <div className="justify-start items-center gap-10 flex">
          
        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer">Home</div>
          </NavLink>

        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer">About</div>
        <NavLink to="/service">
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Service</div>
        </NavLink>
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Help</div>
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Contact</div>
        <NavLink to='/employee/employeeregister' >
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Expert</div>
        </NavLink>


        {token ? (
          <>
                  <NavLink to={`/userprofile/${userId}`}>
                  <button >
                  <FontAwesomeIcon icon={faUser} />  
                  </button>
                  </NavLink>
                  
                <button class="Btn" onClick={handleLogout}>
        
                <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                
                <div class="text">Logout</div>
              </button>
              <div>
                <button>

                </button>
              </div>
          </>
        ): (
          <>
        <NavLink to="/login">
        <button className="w-[150px] bg-custom-blue h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#000000] before:to-[#000000] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
          Login
        </button>
        </NavLink>

        <NavLink to="/register">
        <button className="w-[150px]  bg-custom-blue h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#000000] before:to-[#000000] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
          Registration
        </button>
        </NavLink>
          </>
        )}
       

        </div>
       </div>
      
    </>
  )
}

export default Navbar