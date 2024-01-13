import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom'


function EmployeeRegister() {
  const [data , setData] = useState([]);
  const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {   
    const fetchData = async () => {
        try{
            const instance  =  axios.create({
                baseURL:`${BASE_URL}/service/postion`
               })
               instance.get('')
               .then((response) => {
                setData(response.data)
               })
               .catch((error) => {
                console.log(error);
               })
        }catch(error){
            console.log('the error is the ',error);
        }
    }
    fetchData();
},[BASE_URL,reducer])

  return (
    <>
   <div className="relative py-3 sm:max-w-xl sm:mx-auto no-scrollbar">
  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-lg rounded-3xl sm:p-10">
  <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-black">Employee Registration</h1>
    <div className="max-w-md mx-auto">
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="username">Username</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            id="username" />
        </div>
    
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">Email</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            
          />
        </div>  

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="phone_number">Phone Number</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="phone_number"
            id="phone_number" />
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="state">State</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="state"
            id="state" />
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="city">City</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="city"
            id="city" />
        </div>


        <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="gender">Select Gender</label>
          <select id="countries" className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Male</option>
            <option value="US">Female</option>
            <option value="CA">Non-binary</option>
            <option value="FR">Prefer not to say</option>
          </select>
        </div>
        
          <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="dob">Date of birth</label>
            
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-black dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
          </div>
          <input datepicker type="date" className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
        </div>
          </div>

          <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="type_of_work">Type Of Work</label>
          <select id="countries" className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Full Time</option>
            <option value="US">Part Time</option>
            <option value="CA">Contract</option>
            <option value="FR">Intership</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="location">Location</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="location"
            id="location"
            
          />
        </div>
        <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="postion">Positions</label>
          <select id="countries" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {data.map((data , index ) =>{
              <option key={index} value={data.id} selected>{data.name}</option>

            })}
          </select>
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="adhar_number">ADHAR Number</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="adhar_number"
            id="adhar_number"
            
          />
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="address">Address</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="address"
            id="address" />
        </div>


        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Password</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="conform_password">Confirm Password</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="password"
            id="conform_password"
            
          />
        </div>
      </div>
      <div className="mt-5">
        <button
          className="py-2 px-4 bg-custom-blue hover:bg-black focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="submit"
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
    </div>
  </div>
</div>

    </>
  )
}

export default EmployeeRegister