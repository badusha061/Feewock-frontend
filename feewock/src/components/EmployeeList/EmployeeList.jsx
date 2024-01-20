import React, { useEffect , useReducer , useState} from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import test from './Images/test.jpeg'

function EmployeeList() {
    const location = useLocation()
    const params = useParams()
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

  return (
    <Layouts>
    <div>

    <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-3xl dark:text-black"> {servicedetails.name} </h1>

    <div className='flex  justify-around'>
        {employees.map((data , index) => (

            <div className='flex'>
            <div className="flex flex-col shadow-2xl bg-white rounded-3xl">
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                    <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                        <h2
                        className="text-md text-center font-medium tracking-tighter text-black lg:text-3xl"
                        >
                            {data.username}
                        </h2>
                        <div className=' w-24 '>
                        <p className="mt-2 text-sm text-black"> {data.location} </p>
                        </div>
                    </div>
                    <div className="mt-6">
                    <img className="w-32 h-32 rounded-lg " src={test} alt="" />
                    </div>
                    </div>
                </div>

                <div className="flex px-6 pb-8 sm:px-8">
                    <a
                    aria-describedby="tier-company"
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-custom-blue border-2 border-black rounded-full nline-flex hover:bg-white hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    href="#"
                    >
                    VIEWS
                    </a>
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