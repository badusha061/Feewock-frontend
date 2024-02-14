import React, { useEffect, useReducer, useState , useMemo } from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import DataTable from 'react-data-table-component'
import useAxios from '../../../AxiosConfig/Axios.js'
import ServicePaymentIndivual from './ServicePaymentIndivual.jsx'


function ServicePayment() {
    const useAxiosInstance = useAxios();
    const [appointment , setAppointment] = useState([])
    const [modal , setModal] = useState(false)
    const [appointmentId , setAppointmentId] = useState('')

        useEffect(() => {
            GetOrderService()
        },[])

    let GetOrderService = async () => {
    
        let response = await useAxiosInstance.get('/booking/adminorderlist')
        if(response.status === 200){
            setAppointment(response.data)
        }
    }
  

    const conditionalRowStyles  = [
        {
          when: row => row.is_active || !row.is_active,
          style: {
            backgroundColor: '#fffff',
            fontWeight:'bold',
          
          },
    
          
        },
        
      ]

    const coloumn = [

        {
          name:'ID',
          selector : row => row.id,
          sortable : true
        },
        {
          name:"User",
          selector : row => row.user.first_name,
          sortable:true
    
        },
        {
          name:"Employee",
          selector : row => row.employee.username
    
        },
       
        {
          name:"Service Amount",
          selector : row => row.service_amount  
    
        },

        {
            name:"views",
            cell : (row) => {
              return(
                <button className= "bg-transparent hover:bg-custom-voilate text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={ () => handleModal(row) } >VIEWS</button> 
              );
            },
        
        },
       
        {
            name:"Payment Method",
            selector : row => row.payment_method  
        },
        {
            name:"Payment Status",
            selector : row => row.payment_status  
        },
       

        
      ] 

      const handleModal = (row) => {
            setModal(true)
            setAppointmentId(row.id)
      }
      const handleCancel = () => {
        setModal(false)
      }


  return (
    <AdminLayouts>
           <DataTable
      columns ={coloumn}
      data = {appointment}
      pagination
      selectableRows
      conditionalRowStyles={conditionalRowStyles}
      customStyles={{
        headCells : {
          style: {
            paddingLeft: '8px',
            paddingRight : '8px',
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

      {modal && (
            <ServicePaymentIndivual close={handleCancel} id={appointmentId} />
      )}

    </AdminLayouts>
  )
}

export default ServicePayment
