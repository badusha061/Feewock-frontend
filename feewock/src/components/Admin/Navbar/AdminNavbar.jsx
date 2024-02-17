import React, { useEffect } from 'react'
import { useState } from 'react';
import icon from './Image/icon.png'
import admin from './Image/vahab.jpg'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector , useDispatch} from 'react-redux';
import { cleartoken } from '../../../actions/TokenAction';


function AdminNavbar() {
  const dispatch = useDispatch()
  const[token , setToken] = useState('')
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    setToken(access_token)
  },[token])

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
    navigate('/login')
  }

  return (
    <>
         <nav className="w-full rounded bg-custom-voilate shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        {/* <a href="javascript:void(0)">
                            <h2 className="text-2xl font-bold">LOGO</h2>
                        </a> */}
                        {/* <div className=' w-14'>
                          <img src={icon} alt="" />
                        </div> */}
                

                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-blue-600">
                                {/* <a href="javascript:void(0)">Home</a> */}
                            </li>
                            <li className="text-white hover:text-blue-600">
                                <h6 className=' font-normal text-sm uppercase' >Muhammad Vahab</h6>
                            </li>
                            <li className="text-white hover:text-blue-600">
                                <img className=' w-6' src={admin} alt="admin" />
                            </li>
                            {token ? (
                               <li className="text-white hover:text-blue-600">
                               <button
                               onClick={handleLogout}
                                   className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-300 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                                     >
                                       <div
                                         className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
                                       >
                                         <svg fill="white" viewBox="0 0 512 512" className="w-4 h-4">
                                           <path
                                             d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                           ></path>
                                         </svg>
                                       </div>
                                       <div
                                         className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                       >
                                         Logout
                                       </div>
                                     </button>
   
                               </li>
                            ):null}
                           
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
       
    </>
  )
}

export default AdminNavbar