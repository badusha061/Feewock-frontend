import React, { useEffect , useReducer , useState} from 'react'
import Layouts from '../../layouts/Layouts'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Service() {
    const naviagate= useNavigate()
    const [records , setRecords] = useState([])
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
  
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    useEffect(() => {
        const instance = axios.create({
            baseURL:`${BASE_URL}/service/list`
          })
          instance.get('')
          .then((response) => {
            console.log(response.data);
            setRecords(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
    },[BASE_URL , reducer])
    const handleSubmit =(e,sub) => {
      naviagate(`/service/${sub.id}`)
    }
  return (
    <Layouts>
        
<div className="flex items-center justify-between text-center mx-auto max-w-lg h-20">
   <input type="text" className="font-inherit font-normal text-base text-gray-700 bg-gray-200 border-none rounded-full px-4 py-2 transition-all duration-500 ease-in-out mr-[-2rem]" placeholder="Type your text" />
   <button className="border-none bg-gray-200 mt-[0.1em]">
       {/* <svg className="h-4 w-4 text-gray-700" aria-hidden="true" viewBox="0 0 24 24">
           <g>
               <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
           </g>
       </svg> */}
   </button>
</div>

{records.map((data , index ) => 

<div className='ml-40 flex flex-col mb-8' key={index}>
<h1 className='font-bold text-lg mb-4' > {data.name} </h1>

<div className="flex flex-wrap">
  {data.subservice.map((sub , index) => 
    <div
    onClick={(e) => handleSubmit(e,sub)}
    key={index}
    className={`w-48 h-64 rounded-3xl hover:cursor-pointer hover:shadow-2xl transition-shadow duration-300 bg-white shadow-lg flex flex-col items-center justify-center mt-4 ${index % 5 !== 0 ? 'ml-4' : ''}`}
  >
    <img src={sub.Image} alt="" className="w-32 h-32" />
    <h1  className="mt-4 font-bold"> {sub.name} </h1>
  </div>
    
  )}

</div>
</div>


)}




    </Layouts>
  )
}

export default Service