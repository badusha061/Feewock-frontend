import React, { useReducer } from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { useState , useEffect , useMemo } from 'react'
import './EmployeePosition.css'
import EmployeeEditPosition from './EmployeeEditPosition';
import Swal from 'sweetalert2';



function EmployeePostion() {
    const [open , setOpen] = useState(false)
    const [selectdata , setSelectdata] = useState([])

    const [data , setData] = useState([])
    const [add , setAdd] =  useState({
        name:''
    })
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const [search , setSearch] = useState('')

    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
      const fetchdata = async () => {
          try{
              const instance  =  axios.create({
                  baseURL:`${BASE_URL}/service/postion `
                 })
                 instance.get('')
                 .then((response) => {
                    setData(response.data)
                 })
                 .catch((error) => {
                  console.log(error);
                 })
          }catch(error){
              console.log('the error is the ',error);
          }
      }
      fetchdata();
  },[BASE_URL , reducer])

  const filteredData = useMemo(() => {
    return data.filter(row => row.is_active === true)
  },[data])

  const conditionalRowStyles  = [
    {
      when: row => row.is_active || !row.is_active,
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
      name:"Name Of Positions",
      selector : (row) => row.name,
      sortable : true

    },
    {
      name:"Actions",
      cell : (row) => {
        return (
            <>
               <button  className= "bg-transparent hover:bg-custom-voilate text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleEdit(row)} >Edit</button>
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

    const handleAdd = (e) =>{
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
            title: 'Name is Cannot be Empty',
          });
          return false
        }
        try{
            const instance  =  axios.create({
                baseURL:`${BASE_URL}/service/postion`
            })
            console.log(instance);
                console.log(add);
            instance.post('',add)
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
                title: "Successfully Added Position"
              });
                forceUpdate();
            })
            .catch((error) => {
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
                title: 'Name is Already taken',
              });
            })
        }catch(error){
            console.log('the error is the ',error);
        }
    }

    const handleDelete = ({id}) => {
        try{
            const instance  =  axios.create({
                baseURL:`${BASE_URL}/service/updatepostion/${id}/`
               })
               instance.delete('')
               .then((response) => {
                console.log(response);
                forceUpdate()
                
               })
               .catch((error) => {
                console.log(error);
               })
        }catch(error){
            console.log('the error is the ',error);
        }
    }

    const handleEdit = (row) => {
        setSelectdata(row.id)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        forceUpdate()

    }

    const searchdata = useMemo(() => {
        return filteredData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
       },[search])
       
       const renderData = searchdata.length > 0 ? searchdata : filteredData;
  return (
    <AdminLayouts>

        <div className="flex items-center justify-between p-5">
        <div className="input-container">
        <input onChange={handleChange} required="" placeholder="Service Name" type="text" />
        <button onClick={handleAdd} className="invite-btn"type="button">
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
          <EmployeeEditPosition open={open}  onClose={handleClose} selectdata={selectdata} close={handleClose} />

    </AdminLayouts>
  )
}

export default EmployeePostion