import React, { useEffect, useState } from 'react';
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
    },[employeeId])
    
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
        console.log('working');
        if(date){
            setModal(true)
        }else{
            toast.error('Select a Date')
            return false
        }
    }

    const closeModal = () => {
        console.log('come');
        setModal(false)
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
    </EmployeeLoyouts>
  );
}

export default EmployeesAvailability;
