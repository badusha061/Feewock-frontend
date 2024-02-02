import React, { useEffect, useState } from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import { useScrollTrigger } from '@mui/material';
import './Employee.css'
import useAxios from '../../../AxiosConfig/Axios';



function EmployeeIndivual({ employeeId, close }) {
  const [data, setData] = useState([])
  let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const useAxiosInstance = useAxios();


  useEffect(() => {
    GetEmployee()
  }, [BASE_URL])

  const GetEmployee = async () => {
    const response = await useAxiosInstance.get(`${BASE_URL}/dashboard/employeeindivualPermsion/${employeeId}/`)
    if(response.status === 200){
      setData(response.data)
    }
  }

  return (
    <>
 
 <div className="wrapper rounded-full shadow-2xl">
        <div className="user-card">
            <div className="user-card-img">
              {data.images ?(
              <img src={data.images} alt=""/>
              ):(
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
              )}
            </div>
            <div className="user-card-info">
              <h2> {data.username} </h2>
              <p><span>Email:</span> {data.email} </p>
              <p><span>Location:</span> {data.location} </p>
              {data.gender === 'M' ? (
              <p><span>Gender:</span> Male</p>
              ) : data.gender === 'F' ? (
                <p><span>Gender:</span> Female</p>
              ) : data.gender === 'N' ? (
                <p><span>Gender:</span>Binary</p>
              ) : (
                <p><span>Gender:</span> Not Prefer to say</p>
              )}
              <p><span>City:</span> {data.city} </p>
              <p><span>State:</span> {data.state} </p>
              <p><span>Date of birth:</span> {data.dob} </p>
              <p><span>Phone Number:</span> {data.phone_number} </p>
              {data.service ? (
                  data.service.map((dat, index) => (
                    <p key={index}>
                      <span>Service:</span> {dat.name}
                    </p>
                  ))
                ) : (
                  <div className="px-4">No service</div>
                )}
              {data.type_of_work === 'FT' ? (
                <p><span>Type Of workers:</span> Full Time</p>
              ) : data.type_of_work === 'PT' ? (
                <p><span>Type Of workers:</span> Part Time </p>
              ) : data.type_of_work === 'CT' ? (
                <p><span>Type Of workers:</span> Contract </p>
              ) : (
                <p><span>Type Of workers:</span> Internship </p>
              )}
              <p><span> Adhar Number:</span> {data.adhar_number} </p>
              <p><span>Address:</span> {data.address} </p>
              
            </div>
            <button
            onClick={close}
            className="inline-flex items-center px-4 py-2 bg-custom-voilate transition ease-in-out delay-75 hover:bg-custom-voilate text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
            Close
          </button>

        </div>
        
    </div>


    </>
  )
}

export default EmployeeIndivual;
