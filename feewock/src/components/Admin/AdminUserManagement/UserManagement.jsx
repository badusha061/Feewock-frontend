import React, { useEffect, useReducer, useState } from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import ConfirmationModal from '../../Conformation/ConfirmationModal'

function UserManagement() {
  const [open, setOpen] = useState(true)
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const cancelButtonRef = useRef(null)
  const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
  
  let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const handleBlock = async ({id}) => {
    const instance = axios.create({
      baseURL:`${BASE_URL}/dashboard/userlist/${id}/block`
    })
    instance.put('')
    .then((response) => {
      console.log(response);
      forceUpdate()
    })
    .catch((error) => {
      console.log(error);
    })
  }
  const handleUnBlock = async ({id}) => {
    const instance = axios.create({
      baseURL:`${BASE_URL}/dashboard/userlist/${id}/unblock`
    })
    instance.put('')
    .then((response) => {
      console.log(response);
      forceUpdate()
    })
    .catch((error) => {
      console.log(error);
    })
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
const coloumn = [

    {
      name:'ID',
      selector : row => row.id,
      sortable : true
    },
    {
      name:"First Name",
      selector : row => row.first_name ,
      sortable:true

    },
    {
      name:"Last Name",
      selector : row => row.last_name

    },
    {
      name:"Email",
      selector : row => row.email

    },
    {
      name:"PhoneNumber",
      selector : row => row.phone_number

    },
    {
      name:"Locations",
      selector : row => row.location  

    },
    {
      name: "Status",
      cell: (row) => {
        return (
          row.is_active === true ? 
          <button className= "bg-transparent hover:bg-custom-voilate text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleBlock(row)}>BLOCK</button> :
          <button className= "bg-transparent hover:bg-custom-voilate text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => handleUnBlock(row)}>UNBLOCK</button>
        );
      },
    }
    
  ]  

  const [records , setRecords ] = useState([])
  useEffect(() => {
    
    const instance = axios.create({
      baseURL:`${BASE_URL}/dashboard/userlist`
    })
    instance.get('')
    .then((response) => {
      console.log(response.data);
      setRecords(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
  },[reducer , BASE_URL])
  return (
    <>






    <AdminLayouts>
      <DataTable
      columns ={coloumn}
      data = {records}
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
     

    </AdminLayouts>
    </>
  )
}

export default UserManagement 