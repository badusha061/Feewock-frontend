import React, { useEffect , useReducer , useState} from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import test from './Images/test.jpeg'


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
            baseURL:`${BASE_URL}/service/updatesubervice/${service_id}/`
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
    <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-3xl dark:text-black"> {servicedetails.name} </h1>

    <div className='grid grid-cols-4 gap-4'>
        {employees.map((data , index) => (
            <div className='flex' key={index}>
                <div className="flex w-72 h-full flex-col justify-center items-center shadow-2xl bg-white rounded-3xl">
                    <div className="px-6 py-8 sm:p-10 sm:pb-6 text-center">
                        <h2 className="text-md font-medium tracking-tighter text-black lg:text-3xl mb-2">
                            {data.username}
                        </h2>
                        <p className="text-sm text-black">{data.location}</p>
                    </div>
                    <div className="mt-2">
                        {data.images ? (
                            <img className="w-32 h-32 rounded-lg" src={data.images} alt="" />
                        ) : (
                            <img className="w-32 h-32 rounded-lg" src={test} alt="" />
                        )}
                    </div>
                    <div className="flex px-6 pb-8 sm:px-8 mt-auto">
                    <button
                    onClick={() => handleViews(data.id)}
                      className="overflow-hidden  w-32 p-2 h-12 bg-custom-blue text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
                          >
                            VIEWS
                            <span
                              className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"
                            ></span>
                            <span
                              className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"
                            ></span>
                            <span
                              className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"
                            ></span>
                            <span
                              className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
                              >Explore!</span
                            >
                    </button>

                    </div>
                </div>
            </div>
        ))}
    </div>
</div>



    </Layouts>
  )
}

export default EmployeeList