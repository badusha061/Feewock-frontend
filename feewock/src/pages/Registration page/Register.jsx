import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { setRegistrationData } from '../../actions/RegisterAction';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css'
import Layouts from '../../layouts/Layouts';


function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user , setUser] = useState({
    first_name:'',
    last_name:'',
    username:'',
    email:'',
    number:'',
    location:'',
    password:'',
    conform_password:'',
  })

  const [error , seError] = useState({
    first_name:'',
    last_name:'',
    username:'',
    email:'',
    number:'',
    location:'',
    password:'',
    conform_password:'',
  })

  const handlechagnge = (e) => {
    setUser({...user,[e.target.id] : e.target.value});
  };


  const registration = (e) => {
     e.preventDefault()

    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const instance = axios.create({
      baseURL:`${BASE_URL}/api/register/`,
    })
    instance.post('',user)
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }
 

  return (

    <Layouts>

    <div className="relative py-3 sm:max-w-xl sm:mx-auto no-scrollbar  ">
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0     shadow-lg  rounded-3xl sm:p-10">
      <div className="max-w-md mx-auto">
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block"htmlFor="first_name">First Name</label>
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="text"
              id="first_name"
              value={user.first_name}
              onChange={handlechagnge}
            />
          </div>
          <div>
            <label
            className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="last_name"
              >Last Name</label
            >
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="text"
              id="last_name"
              value={user.last_name}
              onChange={handlechagnge}
            />
          </div>
          <div>
            <label
            className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="username"
              >Username</label
            >
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              value={user.username}
              onChange={handlechagnge}
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="email"
              >Eamil</label
              
            >
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              value={user.email}
              onChange={handlechagnge}
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="number"
              >Phone  number </label
            >
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="number"
              id="number"
              value={user.number}
              onChange={handlechagnge}
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="location"
              >Location</label
            >
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="location"
              id="location"
              value={user.location}
              onChange={handlechagnge}
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="password"
              >Password</label
            >
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              value={user.password}
              onChange={handlechagnge}
            />
          </div>
          <div>
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="conform_password"
              >Conform Password</label
            >
            <input
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              type="password"
              id="conform_password"
              value={user.conform_password}
              onChange={handlechagnge}
            />
          </div>
        </div>
        
         
       
        </div>
  
        <div className="mt-5">
          <button
            className="py-2 px-4 bg-custom-blue hover:bg-black focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            type="submit"
            onClick={(e) => registration(e)}
          >
            Sign up
          </button>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <NavLink to="/login">          <a
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            href="#"
            >have an account? Log in</a
          >
          </NavLink>
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
    </Layouts>
  
  )
}

export default Register 