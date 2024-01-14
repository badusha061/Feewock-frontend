import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


function EmployeeRegister() {
  const [employee , setEmployee] = useState({
    username:'',
    email:'',
    phone_number:'',
    role:2,
    city:'',
    state:'',
    gender:'',
    dob:'',
    type_of_work:'',
    location:'',
    position:[20],
    address:'',
    adhar_number:'',
    password1:'',
    password2:'',
  })

  const [arr , setArr] = useState([])

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
          console.error('Server Response:', error.response.data);
        }
    }
    fetchData();
},[BASE_URL,reducer])

const options = data.map(item => ({
  value: item.id,
  label:item.name
}));


const handlClick = (e) => {
  e.preventDefault()
  const instance = axios.create({
    baseURL:`${BASE_URL}/employee/`
  })
  console.log(employee);
  instance.post('',employee)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error.config);
  })
}
 
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
          value={employee.username}
          onChange={(e) => setEmployee({...employee , username:e.target.value})}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            id="username" />
        </div>
    
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">Email</label>
          <input
          onChange={(e) => setEmployee({...employee , email:e.target.value})}
          value={employee.email}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            
          />
        </div>  

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="phone_number">Phone Number</label>
          <input
          onChange={(e) => setEmployee({...employee , phone_number:e.target.value})}
          value={employee.phone_number}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="phone_number"
            id="phone_number" />
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="state">State</label>
          <input
          onChange={(e) => setEmployee({...employee , state:e.target.value})}
          value={employee.state}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="state"
            id="state" />
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="city">City</label>
          <input
          onChange={(e) => setEmployee({...employee , city:e.target.value})}
          value={employee.city}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="city"
            id="city" />
        </div>


        <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="gender">Select Gender</label>
          <select
          value={employee.gender}
          onChange={(e) => setEmployee({...employee, gender: e.target.value})}
          id="countries" className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected value="M">Male</option>
            <option value="F">Female</option>
            <option value="N">Non-binary</option>
            <option value="P">Prefer not to say</option>
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
          <input
          value={employee.dob}
          onChange={(e) => setEmployee({...employee , dob:e.target.value})}
          datepicker type="date" className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
        </div>
          </div>

          <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="type_of_work">Type Of Work</label>
          <select 
          value={employee.type_of_work}
          onChange={(e) => setEmployee({...employee, type_of_work : e.target.value})}
          id="countries" className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Full Time</option>
            <option value="PT">Part Time</option>
            <option value="CT">Contract</option>
            <option value="IT">Intership</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="location">Location</label>
          <input
          value={employee.location}
          onChange={(e) => setEmployee({...employee , location:e.target.value})}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="location"
            id="location"
            
          />
        </div>
    

            <div>
            <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
          onChange={(e) => setArr(e)}
          />
            </div>
  

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="adhar_number">ADHAR Number</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="adhar_number"
            id="adhar_number"
          value={employee.adhar_number}
          onChange={(e) => setEmployee({...employee , adhar_number:e.target.value})}
            
          />
        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="address">Address</label>
          <input
          value={employee.address}
          onChange={(e) => setEmployee({...employee , address:e.target.value})}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="address"
            id="address" />
        </div>


        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Password</label>
          <input
          onChange={(e) => setEmployee({...employee , password1:e.target.value})}
          value={employee.password1}
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="conform_password">Confirm Password</label>
          <input
          onChange={(e) => setEmployee({...employee , password2:e.target.value})}
          value={employee.password2}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="password"
            id="conform_password"
            
          />
        </div>
      </div>
      <div className="mt-5">
        <button
        onClick={handlClick}
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