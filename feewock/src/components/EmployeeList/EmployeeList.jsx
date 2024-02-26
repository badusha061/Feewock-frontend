import React, { useEffect , useReducer , useState} from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import test from './Images/test.jpeg'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineArrowForwardIos } from "react-icons/md";


function EmployeeList() {
    const location = useLocation()
    const params = useParams()
    const navigate  = useNavigate()

    const service_id = params.id 
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const [search , setSearch] = useState('')
    const [employees , setEmployees] = useState([])
    const [servicedetails , setServicedetails] = useState([])
    
    

    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
      const data = location.state.data
        const instance = axios.create({
            baseURL:`${BASE_URL}/list/employees/${service_id}/`,
            params:data
          })
          console.log(data);
          instance.get('')
          .then((response) => {
            console.log(response.data);
            setEmployees(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
    },[BASE_URL,reducer])

    useEffect(() => {
        const instance = axios.create({
            baseURL:`${BASE_URL}/service/updatesuberviceuser/${service_id}/`
          })
          instance.get('')
          .then((response) => {
            setServicedetails(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
    },[BASE_URL,reducer])

    const handleViews = (dataId) => {
      navigate(`/views/${dataId}`)
    }

  return (
    <Layouts>

   <div className='container mx-auto px-5'>
    <h1 className="mb-4 text-center text-4xl uppercase  leading-none tracking-tight text-black md:text-5xl lg:text-3xl dark:text-black"> {servicedetails.name} </h1>

    <div className=' m-4 gap-4 grid sm:grid-cols-4 '>
        {employees.map((data , index) => (
            <>
                <div  onClick={() => handleViews(data.id)} className=" rounded-[30px] cursor-pointer bg-white h-full shadow-lg">
                <div className='flex  mt-4 justify-center' >
                  {data.images ? (

                    <img  className=' object-cover rounded-full h-32 w-32' src={data.images} alt="Sunset in the mountains"/>
                  ):(
                    <img  className=' object-cover rounded-full h-32 w-32' src="https://iau.edu.lc/wp-content/uploads/2016/09/dummy-image.jpg" alt="Sunset in the mountains"/>
                  )}
                </div>
                <div className="px-6 py-4">
                  <div className='flex items-center space-x-1.5 ' >
                      <HiOutlineLocationMarker className="text-custom-blue"  size={25} />
                      <div className="font-bold truncate text-xl mb-2">{data.location}</div>
                  </div>
                  <div className=' flex items-center justify-center space-x-1.5 ' >
                  <p className=" text-gray-700 text-base">
                      {data.username}
                  </p>
                    <MdOutlineArrowForwardIos />
                  </div>
                </div>
                
              </div>
            </>
        ))}
    </div>
</div>



    </Layouts>
  )
}

export default EmployeeList