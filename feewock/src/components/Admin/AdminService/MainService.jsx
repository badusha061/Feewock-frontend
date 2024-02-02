import React, { useEffect, useMemo, useState , useReducer} from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import DataTable from 'react-data-table-component';
import './MainService.css'
import {  useNavigate } from 'react-router-dom';
import EditMainService from './EditMainService';
import Swal from 'sweetalert2';
import useAxios from '../../../AxiosConfig/Axios';


function MainService() {
    const [open , setOpen] = useState(false)
    const [selectdata , setSelectdata] = useState([])
    const useAxiosInstance = useAxios();

    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const navigate = useNavigate()
    const [add , setAdd] = useState({
        name:''
    })
    const [search , setSearch] = useState('')
    const [data , setData] = useState([]);

    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {   
        GetMainService()
    },[BASE_URL,reducer])

    let GetMainService = async () => {
    
      let response = await useAxiosInstance.get(`${BASE_URL}/service/createmainservice`)
      if(response.status === 200){
        setData(response.data)
      }
   
  }

    const filteredData = useMemo(() => {
        return data.filter(row => row.is_active === true)
    },[data])

   const searchdata = useMemo(() => {
    return filteredData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
   },[search])
   
   const renderData = searchdata.length > 0 ? searchdata : filteredData;

    const handleDelete = ({id}) => {
        try{
            const instance  =  useAxiosInstance.create({
                baseURL:`${BASE_URL}/service/updatemainservice/${id}/`
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
                    title: "Successfully Deleted Position"
                  });
                forceUpdate()
               })
               .catch((error) => {
                console.log(error);
               })
        }catch(error){
          
        }
    }
    const handleEdit = (row) => {
        setOpen(true)
        setSelectdata(row.id)
        }
    const conditionalRowStyles  = [
        {
          when: row => row.is_active,
          style: {
            backgroundColor: '#fffff',
            fontWeight:'bold',
          
          },        
    
          
        },
        {
          when: row => !row.is_active,
          style: {backgroundColor: '#f2dede'} 
        }
      ]


    const column = [
        {
            name:"ID",
            selector : (row) => row.id,
            sortable : true
        },
        {
            name:"Name",
            selector : (row) => row.name
            
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
    const handleChange = (e) => {
        setAdd((prevAdd) =>({
            ...prevAdd,
            name:e.target.value
        }))
    }
    const handleAdd = async  (e) =>{
        e.preventDefault()
        if(!add.name.trim()){
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
                title: 'Main Service Name is Cannot be Empty',
              });
              return false
            }
        try{
                const response = await useAxiosInstance.post(`/service/createmainservice`, add)
                console.log(response);
                if(response.status === 201){
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
                          title: "Successfully Added Position"
                        });
                      forceUpdate()
                }
   
                
        }catch(error){
            if(error.response.data.name[0] === 'main service with this name already exists.'){
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
                    title: 'Main Service Name is Already taken',
                  });
                  return false
            }
        }
    }

    const handleClose = () => {
        setOpen(false)
        forceUpdate()
    }

  return (
    <AdminLayouts>

        <div className="flex items-center justify-between p-5">
        <div className="input-container">
        <input required="" placeholder="Service Name"  onChange={handleChange} type="text" />
        <button className="invite-btn" onClick={handleAdd} type="button">
            ADD 
        </button>
        
        </div>

            <div className="flex items-center"> 
                <div className="rounded-lg bg-gray-200 p-5">
                    <div className="flex">
                        <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                            <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                            </svg>
                        </div>
                        <input type="text"  placeholder="Search........" className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0" onChange={(e) => setSearch(e.target.value)}  id="" />
                        <input type="button" value="Search" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-custom-voilate  hover:cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </div>

          <DataTable
          columns={column}
        
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
            <EditMainService open={open} selectdata={selectdata} onClose={handleClose} />
    </AdminLayouts>
  )
}

export default MainService