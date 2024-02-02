import React, { useReducer } from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useState , useEffect , useMemo } from 'react'
import AddSubService from './AddSubService';
import EditSubService from './EditSubService';
import Swal from 'sweetalert2';
import useAxios from '../../../AxiosConfig/Axios';


function SubService({render}) {
  const [open , setOpen] = useState(false)
  const [editopen , setEditOpen] = useState(false)
  const [data , setData] = useState([])
  const [search , setSearch] = useState('')
  const [selectid , setSelectid] = useState('')
  const useAxiosInstance = useAxios();
  let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)

    useEffect(() => {
      GetService()
  },[BASE_URL,reducer])

  const GetService = async () => {
    const response = await useAxiosInstance.get(`/service/subservice`)
    console.log(response.data);
    if(response.status === 200){
      setData(response.data)

    }
  }

const handleDelete = ({id}) => {
  try{
      const instance  =  useAxiosInstance.create({
          baseURL:`${BASE_URL}/service/updatesubervice/${id}/`
         })
         instance.delete('')
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
            title: "Successfully Deleted Service"
          });
          forceUpdate()
         })
         .catch((error) => {
          console.log(error);
         })
  }catch(error){
      console.log('the error is the ',error);
  }
}

 
  const conditionalRowStyles  = [
    {
      when: row => row.is_active || !row.is_active === true,
      style: {
        backgroundColor: '#fffff',
        fontWeight:'bold',
      
      },        

      
    }
  ]

  const columns = [
    {
      name:"ID",
      selector : (row) => row.id,
      sortable : true

    },
    {
      name:"Service Name",
      selector : (row) => row.name,
      sortable : true

    },
    {
      name:"MAIN Service",
      selector : (row) => row.mainservice.name,

    },
    {
      name:"Service Image",
      selector : (row) => row.Image,
      cell: (row) => <img src={row.Image} alt='service image' style={{ width: '50px', height: '50px' }} />,

    },
    {
      name:"Actions",
      cell : (row) => {
        return (
            <>
                <button className= "bg-transparent hover:bg-custom-voilate text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleEdit(row)} >Edit</button>
                <button className= "bg-transparent hover:bg-custom-voilate text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent  rounded" onClick={() => handleDelete(row)} >Delete</button>
            </>
        )
    }
    },

  ]
  const searchdata = useMemo(() => {
    return data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
   },[search])
  
   const renderData = searchdata.length > 0 ? searchdata : data;

   const handleAdd = () => {
      setOpen(true)
   }

   const handClose = () => {
    setOpen(false)
    fetchdata();

   }

   
   const handleEdit = (row) => {
    setEditOpen(true)
    setSelectid(row.id)
 }

 const handCloseEdit = () => {
  setOpen(false)
  forceUpdate();

 }
  
  return (
    <AdminLayouts>
      <div className=' flex justify-between '>

      <button
      onClick={handleAdd}
        title="Add New"
        className="group cursor-pointer outline-none hover:rotate-90 duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-blue-400 fill-none group-hover:fill-custom-voilate group-active:stroke-blue-200 group-active:fill-black group-active:duration-0 duration-300"

          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke-width="1.5"
            ></path>
            <path d="M8 12H16" stroke-width="1.5"></path>
            <path d="M12 16V8" stroke-width="1.5"></path>
          </svg>
    </button>

  
        <div className="flex items-center"> 
                <div className="rounded-lg bg-gray-200 p-5">
                    <div className="flex">
                        <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                            <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                            </svg>
                        </div>
                        <input type="text"  placeholder="Search........" className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0" onChange={(e) => setSearch(e.target.value)}  id="" />
                        <input type="button" value="Search" className="bg-custom-voilate p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-custom-voilate  hover:cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
      </div>
       
  <DataTable
          columns={columns}
          data={renderData}
          pagination
          selectableRows
          conditionalRowStyles={conditionalRowStyles}
          customStyles={{
            headCells : {
              style: {
                paddingLeft: '8px',
                paddingRight : '8ox',
                backgroundColor :'#551B8C',
                fontWeight : 'bold',
                color: '#ffffff', 
                borderBottom: '1px solid #ddd',
         
              },
            },
            cells : {
              style: {
                paddingLeft:'8px',
                paddingRight: '8px',
                borderBottom: '1px solid #ddd',
              }
            }
          }}

          >

          </DataTable>
      <AddSubService open={open} onClose={handClose} />
        <EditSubService open={editopen} selectId={selectid} onClose={handCloseEdit} />
    </AdminLayouts>
  )
}

export default SubService