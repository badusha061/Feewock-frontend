import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {  setRegistrationData } from '../../actions/RegisterAction';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css'
import Layouts from '../../layouts/Layouts';
import Swal from 'sweetalert2';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';



function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user , setUser] = useState({
    first_name:'',
    last_name:'',
    email:'',
    phone_number:'',
    role:3,
    location:null,
    password1:'',
    password2:'',
  })



  const [errors , setErrors] = useState({})

  const handlechagnge = (e) => {
    setUser({...user,[e.target.id] : e.target.value});
  };

  const handleSelect = async (value) => {  
    try {

      setUser((prevEmployee) => ({
        ...prevEmployee,
        location: value.label, 
      }));
    } catch (error) {
      console.error('Error fetching geolocation:', error);
    }
  };

  const registration = (e) => {
     e.preventDefault()

    const validateError = {}

    if(!user.first_name.trim()){
        validateError.first_name = "First Name is Not Empty"
    }
    if(!user.last_name.trim()){
      validateError.last_name = "Last Name is Not Empty"
    }
    if(!user.email.trim()){
      validateError.email = "Email is Not Empty"
    } else if(!/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(user.email)){
      validateError.email = "Email Should be Correct"
    }

    if(!user.phone_number.trim()){
      validateError.phone_number = "Phone not Empty"
    }else if (user.phone_number.length != 10){
      validateError.phone_number = "Phone Number Should Contain 10 Digits"
    }

    if(user.location === null){
      validateError.location = "Locaion Cannot be Empty"
    }

    if(!user.password1.trim()){
      validateError.password1 = "Password Cannot be Empty"
    }else if (!user.password2.trim()){
      validateError.password2 =  "Conform Password Cannot be Empty"
    }else if (user.password1 != user.password2){
      validateError.password1 = "Password Do not Match"
    }else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(user.password1)){
      validateError.password1 = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
    }

    console.log(user);

    setErrors(validateError)

    if(Object.keys(validateError).length === 0){
      const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
      const instance = axios.create({
        baseURL:`${BASE_URL}/user/`,
      })
      console.log(user);
      instance.post('',user)
      .then(response => {
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
          title: "Successfully Created Account"
        });
        dispatch(setRegistrationData(response.data))
        navigate('/register/otp')
      })
      .catch((error) => {
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
          title: 'Email Or Phone number is already taken Please Change',
        });
      })
    } else {
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
        title: 'All Condition Should be Satisfied',
      });
    }
   
  }
 

  return (

    <Layouts>
<div className="relative py-3 sm:max-w-xl sm:mx-auto no-scrollbar">
  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-lg rounded-3xl sm:p-10">
  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-black">User Registration</h1>

    <div className="max-w-md mx-auto">
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="first_name">First Name</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            id="first_name"
            value={user.first_name}
            onChange={handlechagnge}
          />
          {errors.first_name && <span className=' text-red-700 font-bold ' > {errors.first_name} </span>}
        </div>


        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="last_name">Last Name</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            id="last_name"
            value={user.last_name}
            onChange={handlechagnge}
          />
          {errors.last_name && <span className=' text-red-700 font-bold ' > {errors.last_name} </span>}
        </div>
      
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">Email</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            value={user.email}
            onChange={handlechagnge}
          />
          {errors.email && <span className=' text-red-700 font-bold ' > {errors.email} </span>}

        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="number">Phone number</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="number"
            id="phone_number"
            value={user.phone_number}
            onChange={handlechagnge}
          />
          {errors.phone_number && <span className=' text-red-700 font-bold ' > {errors.phone_number} </span>}

        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block"   htmlFor="location"> Location </label>
          <GooglePlacesAutocomplete
          apiKey='AIzaSyAsc69G6yC0OKUVzNm5o90_EvDHHNL7wxE'
          selectProps={{
            onChange: handleSelect,
            placeholder:"Enter Your Location",

          }}
          />  
          {errors.location && <span className=' text-red-700 font-bold ' > {errors.location} </span>}

        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Password</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password1"
            value={user.password1}
            onChange={handlechagnge}
          />
          {errors.password1 && <span className=' text-red-700 font-bold ' > {errors.password1} </span>}

        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="conform_password">Confirm Password</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password2"
            value={user.password2}
            onChange={handlechagnge}
          />
          {errors.password2 && <span className=' text-red-700 font-bold ' > {errors.password2} </span>}

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
        <NavLink to="/login">
          <a
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            href="#"
          >
            have an account? Log in
          </a>
        </NavLink>
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        <NavLink to="/employee/employeeregister">
          <a
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            href="#"
          >
            Are you searching for job? 
          </a>
        </NavLink>
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
      </div>
    </div>
  </div>
</div>

    </Layouts>
  
  )
}

export default Register 