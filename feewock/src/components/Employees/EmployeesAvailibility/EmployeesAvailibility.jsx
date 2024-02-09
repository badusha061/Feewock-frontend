import React, { useEffect, useReducer, useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box } from '@mui/material';
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts';
import Conform from './Conform';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import useAxios from '../../../AxiosConfig/Axios'

function EmployeesAvailability() {
    const axiosInstance = useAxios()
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [date , setDate] = useState('')
    const[data , setData] = useState([])
    const [modal , setModal] = useState(false)
    const employeeDetailsJson = localStorage.getItem('userDetails')
    const Employee =JSON.parse(employeeDetailsJson)

    let employeeId 
    if(Employee){
        employeeId = Employee.id 
    }

    useEffect(() => {
        GetDate()
    },[employeeId, reducer])
    
    const GetDate = async () => {
        const response  = await axiosInstance.get(`/employees/indivual/${employeeId}/`)
        if(response.status === 200){
            setData(response.data)
        }
    }



    const handleDateChange = (date) => {
        if(date.isBefore(dayjs(), 'day')){
            toast.error('Date Cannot Be Past')
            return false
        }else{
            setSelectedDate(date);
            setDate(date.format('YYYY-MM-DD'))
        }
      };

    const handleButton = () => {
        if(date){
            setModal(true)
        }else{
            toast.error('Select a Date')
            return false
        }
    }

    const closeModal = () => {
        setModal(false)
        forceUpdate()
    }

    const handleDelete = async (e, id) => {
      e.preventDefault()
      const response = await axiosInstance.delete(`/employees/delete/${id}/`,id)
      if(response.status === 204){
          toast.success('Successfully removed')
          forceUpdate()
          return true
      }
    }


    const renderDay = (day, _value, DayComponentProps) => {
        console.log('render is working');
        const formattedDate = day.format('YYYY-MM-DD');
        const isAvailable = data.some((item) => {
            console.log('Checking:', item.date, formattedDate, item.is_available);
            return item.date === formattedDate && item.is_available;
          });
        
        console.log('Render Day:', formattedDate, isAvailable);

        return (
          <DayComponentProps
            {...DayComponentProps}
            style={{
              ...DayComponentProps.style,
              backgroundColor: isAvailable ? 'red' : 'inherit',
              color: isAvailable ? 'white' : 'inherit',
              borderRadius: '50%',
            }}
          />
        );
      };


  return (
    <EmployeeLoyouts>

            {modal && (
            <Box    
                position="fixed"
                top="50%"
                left="50%"
                className="transform -translate-x-1/2 -translate-y-1/2"
                zIndex="9999"
                backgroundColor="white"
                padding="2rem"
                boxShadow="md"
            >
                <Conform close={closeModal} date={date} employeeId={employeeId} />
            </Box>
            )}


      <LocalizationProvider dateAdapter={AdapterDayjs}>

     

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginTop="2rem"
          className="bg-gradient-to-r  bg-custom-blue text-black p-4 rounded-lg shadow-md"
        >
            
        
          <StaticDatePicker
            key={selectedDate}
            orientation="landscape"
            value={selectedDate}  
            onChange={(newDate) => {
                handleDateChange(newDate)
                handleButton()
            }}
            onAccept={handleButton}
            renderDay={renderDay}
            renderInput={(props) => (
              <Box
                padding="1rem"
                border="1px solid #ccc"
                borderRadius="4px"
                display="inline-block"
                className="border-2 border-gray-300 bg-white text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                {props.inputProps.value}
              </Box>
            )}
          />
            <Toaster
        position="top-center"
        reverseOrder={false}
        />
          
        </Box>
      </LocalizationProvider>


      <div className="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1 p-4 mt-16">
    <h2 className="flex gap-3 items-center m-auto text-lg font-bold md:flex-col md:gap-2">
        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round"
            stroke-linejoin="round" className="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>ABSENCE DAYS
    </h2>

    <ul className="flex  flex-col gap-3.5 w-full sm:max-w-md m-auto">

            {data.map((employee , index) => (

            <li className="w-full bg-gray-100 dark:bg-white/5 p-3 rounded-md">
              {employee.date}
            
            <div className=' pt-4'>
            <button onClick={(e) =>handleDelete(e, employee.id)} className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
              <svg
                stroke="currentColor"
                viewBox="0  0  24  24"
                fill="none"
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19  7l-.867  12.142A2  2  0  0116.138  21H7.862a2  2  0  01-1.995-1.858L5  7m5  4v6m4-6v6m1-10V4a1  1  0  00-1-1h-4a1  1  0  00-1  1v3M4  7h16"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                ></path>
              </svg>
              Delete
            </button>
            </div>

          </li>
            ))}

       
    </ul>
</div>
    </EmployeeLoyouts>
  );
}

export default EmployeesAvailability;
