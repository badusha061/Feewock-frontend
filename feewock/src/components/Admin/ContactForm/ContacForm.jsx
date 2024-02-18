import React, { useEffect, useState } from 'react'
import AdminLayouts from '../../../layouts/AdminLayouts'
import DataTable from 'react-data-table-component'
import useAxios from '../../../AxiosConfig/Axios'

function ContacForm() {
    const [contact , setContact] = useState([])
     const useAxiosInstance = useAxios();

    const coloumn = [

        {
          name:'ID',
          selector : row => row.id,
          sortable : true
        },
        {
          name:"Name",
          selector : row => row.name ,
          sortable:true
    
        },
        {
          name:"Email",
          selector : row => row.email
    
        },
        {
          name:"Number",
          selector : row => row.number
    
        },
        {
          name:"Location",
          selector : row => row.location
    
        },
        {
          name:"Message",
          selector : row => row.message  
    
        }, 
      ]  

      useEffect(() => {
        GetCotact()
      },[])

      const GetCotact = async () => {
        const response = await useAxiosInstance.get('contact/contactadmin')
        if(response.status === 200){
            setContact(response.data)
            console.log(response.data);
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

  return (
    <AdminLayouts>
        
      <DataTable
      columns ={coloumn}
      data = {contact}
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
     
    </AdminLayouts>
  )
}


export default ContacForm
