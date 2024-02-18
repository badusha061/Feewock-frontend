import React, { useEffect, useState } from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import useAxios from '../../../AxiosConfig/Axios';
import Spinner from '../../../utils/Spinner.jsx'
import { PieChart } from '@mui/x-charts/PieChart';

function AdminDashboard() {
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
    count_cashondelivery:''
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
          count_cashondelivery:response.data.count_cashondelivery
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


    {/* <div
  className="group flex flex-col justify-start items-start gap-2 w-96 h-56 duration-500 relative rounded-lg p-4 bg-purple-500 hover:-translate-y-2 hover:shadow-xl shadow-purple-400"
>
  <div
    className="absolute duration-700 shadow-md group-hover:-translate-y-4 group-hover:-translate-x-4 -bottom-10 -right-10 w-1/2 h-1/2 rounded-lg bg-purple-400"
    alt="image here"
  ></div>

  <div className="">
    <h2 className="text-2xl font-bold mb-2 text-white">Elegant Card</h2>
    <p className="text-gray-200 line-clamp-3">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean convallis
      magna quis lectus fermentum, quis scelerisque orci pellentesque. Duis id
      porta justo. Sed ac enim id justo tincidunt hendrerit id ac lectus.
      Pellentesque maximus posuere tortor vitae consequat.
    </p>
  </div>
  <button
    className="hover:bg-purple-400 bg-purple-600 text-white mt-6 rounded p-2 px-6"
  >
    Explore
  </button>
</div> */}



    </AdminLayouts>
    </>
  )
}

export default AdminDashboard