import React, { useEffect, useState } from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import useAxios from '../../../AxiosConfig/Axios';
import Spinner from '../../../utils/Spinner.jsx'
import { PieChart } from '@mui/x-charts/PieChart';

function AdminDashboard() {
  let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const useAxiosInstance = useAxios();
  const [isLoading , setIsLoading] = useState(true)
  const [data , setData] = useState({
    total_users:'',
    total_employees:'',
    total_service:'',
    total_cashondelivery:'',
    total_earnings:'',
    total_strip:'',
    count_strip:'',
    count_cashondelivery:'',
    recend_service:[],
  })
  useEffect(() => {
    GetData()
  },[])

  const GetData = async () => {
    const response = await useAxiosInstance.get('/admindashboard/adminlist')
    if(response.status === 200){
        setData((prvs) => ({
          ...prvs,
          total_users:response.data.total_user,
          total_employees:response.data.total_employee,
          total_service:response.data.total_service,
          total_cashondelivery:response.data.total_cashondelivery,
          total_strip:response.data.total_strip,
          total_earnings:response.data.total_earnings,
          count_strip:response.data.count_strip,
          count_cashondelivery:response.data.count_cashondelivery,
          recend_service:response.data.recend_history
        }))
        setIsLoading(false)
    }
  }

  if(isLoading){
    return <Spinner />
  }




  return (
    <>
    <AdminLayouts>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-custom-voilate p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">TOTAL USER</h2>
                    <p className="text-3xl font-bold mt-2"> {data.total_users} </p>
                </div>
                <div className="bg-white p-3 rounded-full">
                    <svg className="text-custom-voilate h-6  object-cover w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                          <FaRegUserCircle size={25} />
                    </svg>
                </div>
            </div>
            <div className="mt-4">
                <span className="text-sm">Great progress! Keep up the good work.</span>
            </div>
        </div>

        <div className=" bg-custom-voilate p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">TOTAL EMPLOYEES</h2>
                    <p className="text-3xl font-bold mt-2"> {data.total_employees} </p>
                </div>
                <div className="bg-white p-3 rounded-full">
                    <svg className="text-custom-voilate h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                          <FaUserCog size={25} />
                    </svg>
                </div>
            </div>
            <div className="mt-4">
                <span className="text-sm">Keep moving! You're doing great.</span>
            </div>
        </div>
        <div className=" bg-custom-voilate p-6 rounded-lg shadow-lg text-white">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">TOTAL SERVICES</h2>
                    <p className="text-3xl font-bold mt-2"> {data.total_service} </p>
                </div>
                <div className="bg-white p-3 rounded-full">
                    <svg className="text-custom-voilate h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <MdMiscellaneousServices size={25} />

                    </svg>
                </div>
            </div>
            <div className="mt-4">
                <span className="text-sm">Overall system performance</span>
            </div>
        </div>
    </div>

<div className='flex  bg-white shadow-2xl h-[60%] rounded-xl mt-4' >

    <div
      style={{
        background: 'linear-gradient(319deg, #663dff  0%, #aa00ff  37%, #cc4499  100%)',
      }}
    className="card  mt-5 ml-4 relative h-[260px] w-[400px] flex flex-col justify-end px-6 py-10 text-white rounded-3xl gap-8 ">
      <h1 className=' uppercase  font-bold' > TOTAL EARNINGS </h1>
  <p className="text-2xl  font-medium">${data.total_earnings}</p>
  <div className="flex justify-between gap-10">
    <p className="text-base font-medium">ONLINE: ${data.total_strip} </p>
    <p className="text-base font-medium">CASH ON DELIVERY: ${data.total_cashondelivery} </p>

    
    <div className="self-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 58 36" height="36" width="58">
        <circle fill-opacity="0.62" fill="#F9CCD1" r="18" cy="18" cx="18"></circle>
        <circle fill="#424242" r="18" cy="18" cx="40" opacity="0.36"></circle>
      </svg>
    </div>
  </div>
</div>

    <div className=' flex mt-10' >
    <PieChart
          series={[
            {
              data: [
                { id: 0, value: data.count_strip, label: 'ONLINE' },
                { id: 1, value: data.count_cashondelivery, label: 'CASH' },
              ],
            },
          ]}
          width={450}
          height={250}
          options={{
            legend: {
              labels: {
                fontColor: 'black', 
              },
            }
          }
        }
          />
      </div>

    </div>

      
<section className="antialiased bg-white shadow-2xl text-gray-600 h-screen px-4">
    <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-white">
                <h2 className="font-semibold text-gray-800"> Recend Service Oder </h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Email</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Spent</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Country</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {data.recend_service.map((data , index) => (

                            <tr>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src={`${BASE_URL}${data.user.images}`} width="40" height="40" alt="Alex Shatov"/></div>
                                        <div className="font-medium text-gray-800">{data.user.first_name} {data.user.last_name}</div>
                                    </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left">{data.user.email} </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-left font-medium text-green-500">₹ {data.service_amount} </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    <div className="text-lg truncate text-center">{data.user.location} </div>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>





    </AdminLayouts>
    </>
  )
}

export default AdminDashboard