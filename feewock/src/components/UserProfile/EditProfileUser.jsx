import React,{useState , useReducer , useEffect} from 'react'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import useAxios from '../../AxiosConfig/Axios'
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';


function EditProfileUser({close , UserId}) {
    const [data , setData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        phone_number:'',
        location:'',
        longitude:'',
        latitude:''
    })
    const [errors , setErrors] = useState({})
    const axiosInstance = useAxios()
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;



    const handleSelect = async (value) => {
      
        try {
          const results = await geocodeByAddress(value.label);
          const { lat, lng } = await getLatLng(results[0]);
      
          setData((prevEmployee) => ({
            ...prevEmployee,
            latitude: lat,
            longitude: lng,
            location: value.label, 
          }));
        } catch (error) {
          console.error('Error fetching geolocation:', error);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validateError = {}

        if(!data.first_name.trim()){
            validateError.first_name = "First Name is Not Empty"
        }
        if(!data.last_name.trim()){
        validateError.last_name = "Last Name is Not Empty"
        }
        if(!data.email.trim()){
        validateError.email = "Email is Not Empty"
        } else if(!/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(data.email)){
        validateError.email = "Email Should be Correct"
        }

        if(!data.phone_number.trim()){
        validateError.phone_number = "Phone not Empty"
        }else if (data.phone_number.length != 10){
        validateError.phone_number = "Phone Number Should Contain 10 Digits"
        }

        if(data.location === null){
        validateError.location = "Locaion Cannot be Empty"
        }
        console.log(data);
        setErrors(validateError)

        if(Object.keys(validateError).length === 0){
            const response = await axiosInstance.put(`/api/userindivual/${UserId}/`,data)
            if(response.status === 200){
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
            }
        }else{
            toast.error('All Condition Should be statisfied.')
            return false
        }
       
    }
  return (
    <div className="container max-w-screen-md mx-auto mt-10 mb-10 bg-white  rounded-2xl shadow-2xl  overflow-hidden">
    <div className="flex">
        <div className="w-1/3 border-r border-gray-200">
            <div className="flex flex-col items-center text-center p-4 pt-8">
           
                {data.images ? (
                <img className="rounded-full w-32 h-32 mt-5" src={data.images} alt="Profile"/>

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
                    <label className="block text-sm font-bold mb-2">First Name</label>
                    <input  value={data.first_name} onChange={(e) => setData({...data , first_name :e.target.value})} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your username"  />
                    {errors.first_name && <span className=' text-red-700 font-bold ' > {errors.first_name} </span>}
                    
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Last Name</label>
                    <input  value={data.last_name} onChange={(e) => setData({...data, last_name :e.target.value})}   type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your username"  />
                    {errors.last_name && <span className=' text-red-700 font-bold ' > {errors.last_name} </span>}  
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input  value={data.email} onChange={(e) => setData({...data, email: e.target.value})}   type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your Email" />
                    {errors.email && <span className=' text-red-700 font-bold ' > {errors.email} </span>}   
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Phone Number</label>
                    <input value={data.phone_number} onChange={(e) => setData({...data , phone_number :e.target.value})}    type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter Your Email" />
                    {errors.phone_number && <span className=' text-red-700 font-bold ' > {errors.phone_number} </span>}
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
                    {errors.location && <span className=' text-red-700 font-bold ' > {errors.location} </span>}
                </div>

                <button
                onClick={handleSubmit}
                  className="py-2 px-4 bg-custom-blue hover:bg-black focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  type="submit"
                >
                  Submit
                </button>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    />
            </div>
        </div>
    </div>
</div>
  )
}

export default EditProfileUser
