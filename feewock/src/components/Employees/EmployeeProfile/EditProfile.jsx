import React, { useEffect, useReducer, useState } from 'react'
import Swal from 'sweetalert2';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';


function EditProfile({close , EmployeeId}) {
  const [data , setData] = useState([]);
  const [errors , setErrors] = useState({})
  const [employee , setEmployee] = useState([])
  const [edit , setEdit] = useState({
    username:'',
    email:'',
    phone_number:'',
    city:'',
    state:'',
    gender:'',
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

  const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const animatedComponents = makeAnimated();
  


  useEffect(() => {   
    const fetchData = async () => {
        try{
            const instance  =  axios.create({
                    baseURL:`${BASE_URL}/service/subservice`
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

    useEffect(() => {
      const instance = axios.create({
        baseURL:`${BASE_URL}/dashboard/employeeindivual/${EmployeeId}/`,
        //   headers: {
        //     'Authorization': `Bearer ${access_token}`,
        //     'Content-Type': 'application/json',  
        // },
      })
      instance.get('')
      .then((response)=> {
        console.log(response.data);
        setEmployee(response.data)
        setEdit(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
    },[EmployeeId])

    const handleSelect = async (value) => {
      console.log(value.label);
    
      try {
        const results = await geocodeByAddress(value.label);
        const { lat, lng } = await getLatLng(results[0]);
    
        setEdit((prevEmployee) => ({
          ...prevEmployee,
          latitude: lat,
          longitude: lng,
          location: value.label, 
        }));
      } catch (error) {
        console.error('Error fetching geolocation:', error);
      }
    };
    
  

    const handleOption = (selections) => {
      const selectid = selections.map((options) => options.value)
      setEmployee({
        ...employee,
        service: selectid,
      });
    }
  
    const handleClick = (e) => {
      e.preventDefault()
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
      
      setErrors(validateError)
      console.log(edit);

      if(Object.keys(validateError).length === 0){
        const instance = axios.create({
          baseURL:`${BASE_URL}/employees/employeeedit/${EmployeeId}/`,
          //   headers: {
          //     'Authorization': `Bearer ${access_token}`,
          //     'Content-Type': 'application/json',  
          // },
        })
        instance.put('',edit)
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
            title: "Successfully Edited"
          });
          close()
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
    <div className="container max-w-screen-md mx-auto mt-10 mb-10 bg-white  rounded-2xl shadow-2xl  overflow-hidden">
    <div className="flex">
        <div className="w-1/3 border-r border-gray-200">
            <div className="flex flex-col items-center text-center p-4 pt-8">
              {employee.images ? (
                <img className="rounded-full w-32 h-32 mt-5" src={employee.images} alt="Profile"/>
              ):(
                <img className="rounded-full w-32 h-32 mt-5" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="Profile"/>
              )}
            </div>
        </div>
        <div className="w-2/3 pl-4 pr-4">
        <div className='flex justify-end'>
            <button
            onClick={close}
                className="inline-flex items-center px-4 py-2 bg-custom-blue transition ease-in-out delay-75 hover:bg-custom-blue text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 translate-y-1">
                Close
            </button>
        </div>

            <div className="p-4 pb-5">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold"> Edit Profile </h4>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Username</label>
                    <input value={edit.username}  onChange={(e) => setEdit({...edit, username: e.target.value})}   type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your username"  />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input  value={edit.email}  onChange={(e) => setEdit({...edit, email: e.target.value})}   type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your Email" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Phone Number</label>
                    <input type="text"  value={edit.phone_number}  onChange={(e) => setEdit({...edit, phone_number: e.target.value})}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your Phone number" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">State</label>
                    <input type="text"  value={edit.state}  onChange={(e) => setEdit({...edit, state: e.target.value})}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your State" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">City</label>
                    <input type="text"  value={edit.city}  onChange={(e) => setEdit({...edit, city: e.target.value})}   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your City" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Gender</label>
                    <select
                     value={edit.gender}  onChange={(e) => setEdit({...edit, gender: e.target.value})} 
                    id="countries" className="bg-white border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled>Select Your Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="N">Non-binary</option>
                      <option value="P">Prefer not to say</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Username</label>
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-black dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
          </div>
          <input  value={edit.dob}  onChange={(e) => setEdit({...edit, dob: e.target.value})}  datepicker type="date" className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-white dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>      
          </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Loctions</label>
                    <GooglePlacesAutocomplete
                     selectProps={{
                      onChange: handleSelect,
                      placeholder:"Enter Your Location",
          
                    }}
                    apiKey='AIzaSyAsc69G6yC0OKUVzNm5o90_EvDHHNL7wxE'
                    />  
                </div>

                <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Service</label>
                <Select
                    onChange={handleOption}
                     components={animatedComponents}
                      isMulti
                      options={options}
                     
                    />  
                </div>


                <div className="mb-4">
                    <label  className="block text-sm font-bold mb-2">Adhar Number</label>
                    <input  value={edit.adhar_number}  onChange={(e) => setEdit({...edit, adhar_number: e.target.value})}  type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your Adhar Number" />
                </div>


                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Address</label>
                    <input  value={edit.address}  onChange={(e) => setEdit({...edit, address: e.target.value})}   type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your Address" />
                </div>

                <button
                  onClick={handleClick}
                  className="py-2 px-4 bg-custom-blue hover:bg-black focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                >
                  Submit
                </button>
               
            </div>
        </div>
    </div>
</div>


  )
}

export default EditProfile