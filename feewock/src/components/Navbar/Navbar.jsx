import React, { useEffect, useState } from 'react';
import icon from './image/icon.png'
import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { useSelector , useDispatch} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser}   from "@fortawesome/free-solid-svg-icons"
import { cleartoken } from '../../actions/TokenAction';
import Swal from 'sweetalert2';



function Navbar() {
  const dispatch = useDispatch()
  const t = useSelector(state => state.token.token)
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
  return (
    <>

      
<body className="bg-cyan-400">
  <nav className=" bg-white shadow md:flex md:items-center md:justify-between">
    <div className="flex justify-between items-center ">
      <span className="text-2xl font-[Poppins] cursor-pointer">
          <img className="h-20 inline"
            src={icon}/>
       
      </span>

      <span className="text-3xl cursor-pointer mx-2 md:hidden block">
        <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
      </span>
    </div>

    <ul className=" flex gap-4 md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
    <NavLink to="/" classNameName={({ isActive }) => isActive ? "active" : ""}>
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl   font-semibold  hover:text-custom-blue duration-500">HOME</a>
      </li>
    </NavLink>
    
    <NavLink to="/postlist">
    <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl font-semibold  hover:text-custom-blue duration-500">EXPLORE</a>
      </li>
      </NavLink>
    
      <NavLink to="/service">
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl font-semibold  hover:text-custom-blue duration-500">SERVICE</a>
      </li>
      </NavLink>

      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl font-semibold  hover:text-custom-blue duration-500">ABOUT</a>
      </li>
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl font-semibold  hover:text-custom-blue duration-500">CONTACT</a>
      </li>

      <NavLink to='/employee/employeeregister' >
      <li className="mx-4 my-6 md:my-0">
        <a href="#" className="text-xl font-semibold  hover:text-custom-blue duration-500">EXPERT</a>
      </li>
      </NavLink>


      {token ? (
          <>
            <li>
              <NavLink to={`/userprofile/${userId}`}>
                    <button >
                    <FontAwesomeIcon icon={faUser} />  
                    </button>
                    </NavLink>
            </li>
                
            <li>

            <button className="button">
              <svg viewBox="0 0 448 512" className="bell"><path d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg>
            </button>

            </li>

            <li>
              
                <button className="Btn" onClick={handleLogout}>
        
                <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                
                <div className="text">Logout</div>
              </button>
             
          </li> 

          </>
        ): (
          <>
          <li>
        <NavLink to="/login">
        <button className="w-[150px] bg-custom-blue h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#000000] before:to-[#000000] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
          Login
        </button>
        </NavLink>
        </li>

          <li>
          <NavLink to="/register">
            <button className="w-[150px]  bg-custom-blue h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#000000] before:to-[#000000] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
              Registration
            </button>
            </NavLink>
          </li>
        
          </>
        )}


    </ul>
  </nav>



</body>

    </>
  )
}

export default Navbar