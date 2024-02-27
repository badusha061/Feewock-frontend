import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Swal from 'sweetalert2';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import Layouts from '../../../layouts/Layouts';
import { setEmployeeRegistrationData } from '../../../actions/EmployeeRegistrationAction';

const animatedComponents = makeAnimated();

  
function EmployeeRegister() {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [employee , setEmployee] = useState({
    username:'',
    email:'',
    phone_number:'',
    role:2,
    city:'',
    state:'',
    gender:'M',
    dob:'',
    type_of_work:'',
    location:null,
    service:[],
    address:'',
    adhar_number:'',
    password1:'',
    password2:'',
    longitude:'',
    latitude:''
  })

  const [errors , setErrors] = useState({})
  
  const [data , setData] = useState([]);
  const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  useEffect(() => {   
    const fetchData = async () => {
        try{
            const instance  =  axios.create({
                baseURL:`${BASE_URL}/service/subserviceemployee`
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

const handleOption = (selections) => {
  const selectid = selections.map((options) => options.value)
  setEmployee({
    ...employee,
    service: selectid,
  });
}


const handleSelect = async (value) => {
  console.log(value.label);

  try {
    const results = await geocodeByAddress(value.label);
    const { lat, lng } = await getLatLng(results[0]);

    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      latitude: lat,
      longitude: lng,
      location: value.label, 
    }));
  } catch (error) {
    console.error('Error fetching geolocation:', error);
  }
};





const handlClick = (e) => {
  e.preventDefault()
  console.log(employee);
  const validateError = {}
  if(!employee.username.trim()){
    validateError.username = "Username Not be Empty"
  }
  if(!employee.email.trim()){
    validateError.email = "Email Not be Empty"
  }else if (!/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(employee.email)){
    validateError.email = "Email should be Corract"
  }
  if(!employee.phone_number.trim()){
    validateError.phone_number = "Phone Number Cannot be Empty"
  }else if (employee.phone_number.length != 10){
    validateError.phone_number = "Phone  Number Should Contain 10 Digits"
  }else if (!/^[0-9]+$/.test(employee.phone_number)){
    validateError.phone_number = "Phone Number must contain only numeric characters"
  }
  if(!employee.city.trim()){
    validateError.city = "City Cannot be Empty"
  }
  if(!employee.state.trim()){
    validateError.state = "State Cannot be Empty"
  }
  if(!employee.gender.trim()){
    validateError.gender = "Gender Cannot be Empty"
  } 
  if(employee.location === null){
    validateError.location = "location cannot be Empty"
  }
  const current = new Date()
  const inputAge = new Date(employee.dob)
  const age = current.getFullYear() - inputAge.getFullYear()
  if(!employee.dob.trim){
    validateError.dob = "Date Of Birth Cannot be Empty"
  }else if (age < 18){
    validateError.gender = "Age must be at least 18 years old."
  }
  if(!employee.type_of_work.trim()){
    validateError.type_of_work = "Work Types Canot be Empty"
  }

  if(employee.service.length === 0){
    validateError.service = "Please Take Any Position"
  }
  if(!employee.address.trim()){
    validateError.address = "Address Cannot be Empty"
  }
  if(!employee.adhar_number.trim()){
    validateError.adhar_number = "Adhar Number Cannot Empty"
  }else if(employee.adhar_number.length != 12){
    validateError.adhar_number = "Adhar Card Number is 12 digits"
  }else if (!/^[0-9]+$/.test(employee.adhar_number)){
    validateError.adhar_number = "Adhar Car Number must contain only numeric characters"
  }else if (!/^[2-9][0-9]*$/.test(employee.adhar_number)){
    validateError.adhar_number = "Adhar number cannot start with 0 or 1. "
  }
  if(!employee.password1.trim){
    validateError.password1 = "Password Cannot be Empty"
  }
  if (!employee.password2.trim){
    validateError.password2 = "Canform password Cannot be Empty"
  }else if (employee.password1 != employee.password2){
    validateError.password1 = "Password Cannot be Match"
  }else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(employee.password1)){
    validateError.password1 = "Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
  }

  setErrors(validateError)
  console.log(employee);
  if(Object.keys(validateError).length === 0){
    const instance = axios.create({
      baseURL:`${BASE_URL}/employee/`
    })
    console.log(employee);
    instance.post('',employee)
    .then((response) => {
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
      console.log(response.data.id);
      const employeeId = {id:response.data.id}
      console.log('employee', employeeId);
      console.log('employee', employeeId);
      console.log('employee', employeeId);
      console.log('employee', employeeId);

      dispatch(setEmployeeRegistrationData(employeeId))
      navigate('/employee/employeeregister/otp')
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
        title: 'Phone number or Email is already taken please enter Another',
      });
    })
  }else{
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
    <>
    <Layouts>
   <div className="relative py-3 sm:max-w-xl sm:mx-auto no-scrollbar">
  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-lg rounded-3xl sm:p-10">
  <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-3xl dark:text-black">Experts Registration</h1>
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
          {errors.username && <span className=' text-red-700 font-bold ' > {errors.username} </span>}

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
          {errors.email && <span className=' text-red-700 font-bold ' > {errors.email} </span>}

        </div>  

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="phone_number">Phone Number</label>
          <input
          onChange={(e) => setEmployee({...employee , phone_number:e.target.value})}
          value={employee.phone_number}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="phone_number"
            id="phone_number" />
          {errors.phone_number && <span className=' text-red-700 font-bold ' > {errors.phone_number} </span>}

        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="state">State</label>
          <input
          onChange={(e) => setEmployee({...employee , state:e.target.value})}
          value={employee.state}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="state"
            id="state" />
          {errors.state && <span className=' text-red-700 font-bold ' > {errors.state} </span>}

        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="city">City</label>
          <input
          onChange={(e) => setEmployee({...employee , city:e.target.value})}
          value={employee.city}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="city"
            id="city" />
          {errors.city && <span className=' text-red-700 font-bold ' > {errors.city} </span>}

        </div>


        <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="gender">Select Gender</label>
          <select
          value={employee.gender}
          onChange={(e) => setEmployee({...employee, gender: e.target.value})}
          id="countries" className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="" disabled>Select Your Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="N">Non-binary</option>
            <option value="P">Prefer not to say</option>
          </select>
          {errors.gender && <span className=' text-red-700 font-bold ' > {errors.gender} </span>}

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
          {errors.dob && <span className=' text-red-700 font-bold ' > {errors.dob} </span>}

        </div>
          </div>

          <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="type_of_work">Type Of Work</label>
          <select 
          value={employee.type_of_work}
          onChange={(e) => setEmployee({...employee, type_of_work : e.target.value})}
          id="countries" className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="" disabled>Select Your Job Time</option>
            <option value="FT">Full Time</option>
            <option value="PT">Part Time</option>
            <option value="CT">Contract</option>
            <option value="IT">Intership</option>
          </select>
          {errors.type_of_work && <span className=' text-red-700 font-bold ' > {errors.type_of_work} </span>}

        </div>

        <div>
        <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="location">Select Your Location</label>
        <GooglePlacesAutocomplete
          apiKey='AIzaSyAsc69G6yC0OKUVzNm5o90_EvDHHNL7wxE'
          selectProps={{
            onChange: handleSelect,
            placeholder:"Enter Your Location",

          }}
        />  
        </div>
    

            <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="position">Select Postions</label>
            <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={handleOption}
          />
          {errors.position && <span className=' text-red-700 font-bold ' > {errors.position} </span>}

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
          {errors.adhar_number && <span className=' text-red-700 font-bold ' > {errors.adhar_number} </span>}

        </div>

        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="address">Address</label>
          <input
          value={employee.address}
          onChange={(e) => setEmployee({...employee , address:e.target.value})}

            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="address"
            id="address" />
          {errors.address && <span className=' text-red-700 font-bold ' > {errors.address} </span>}

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
          {errors.password1 && <span className=' text-red-700 font-bold ' > {errors.password1} </span>}

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
          {errors.password2 && <span className=' text-red-700 font-bold ' > {errors.password2} </span>}

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
</Layouts>
    </>
  )
}

export default EmployeeRegister