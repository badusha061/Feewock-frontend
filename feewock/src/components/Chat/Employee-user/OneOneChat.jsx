import React, { useEffect, useState , useReducer , useRef } from 'react'
import Layouts from '../../../layouts/Layouts'
import { json, useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../../../AxiosConfig/Axios'
import Swal from 'sweetalert2';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts'


function OneOneChat() {
    const navigate = useNavigate()
    const [data , setData] = useState([])
    const [messages , setMessages] = useState([])
    const [users , setUser] = useState([])
    const [employee , setEmployee] = useState([])
    const location = useLocation()
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const axiosInstance = useAxios()
    const messageRef = useRef()

    const currentUsers = localStorage.getItem('userDetails')
    const Employee =JSON.parse(currentUsers)
    let employeeId 
    let userId 
    let sender 
    let receiver
    let  currentUser
    let currentrole 
    if(Employee){
        if(Employee.role === 3){
            employeeId = location.state?.employeeId
            userId = Employee.id
            sender = userId
            receiver = employeeId
            currentUser = userId
            currentrole = 3
        }else if (Employee.role === 2){
            userId = location.state?.UserId;
            employeeId = location.state?.EmployeeId;
            sender = employeeId
            receiver = userId
            currentUser = employeeId
            currentrole = 2
        }
    }else{
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
        title: 'Please Login',
      });
    
    }

 
    useEffect(() => {
        if(!Employee){
        navigate('/login')
        }
        GetUser()
        GetEmployee()
    },[])



    


   





    const GetUser = async () => {
        const response = await axiosInstance.get(`${BASE_URL}/dashboard/employeeindivualPermsion/${employeeId}/`)
        if (response.status === 200){
            setEmployee(response.data)
        }
    }

    const GetEmployee = async () => {
        const response = await axiosInstance.get(`${BASE_URL}/api/userindivual/${userId}/`)
        if(response.status === 200){
            setUser(response.data)
        }
    }



    const handleMessage = (e) => {
        e.preventDefault();
        if (client.readyState === W3CWebSocket.OPEN) {  
            client.send(JSON.stringify({ text: messageRef.current.value , sender: sender }));
            messageRef.current.value = "";
        } else {
            console.error('WebSocket not open yet. Message not sent.');
        }
    }


    const client = new W3CWebSocket(`ws://localhost:8000/ws/chat/${sender}_${receiver}/`) 

    const GetMessage = async () => {

     
        await axiosInstance.get(`${BASE_URL}/chat/message/${sender}/${receiver}/`)
        .then((response) => {
            setMessages(response.data)
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        })

        client.onmessage = (event) => {
            console.log('before come the message',event.data);
            try{
                const dataFromServer = JSON.parse(event.data);
                console.log('after message',dataFromServer);
                if (dataFromServer) {
                  if(dataFromServer.sender === userId){
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                          id :dataFromServer.id,
                          message: dataFromServer.text,
                          sender: {id:userId},
                          receiver:{id:employeeId}
                        },
                      ]);

                  }else if(dataFromServer.sender ===  employeeId){
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id :dataFromServer.id,
                            message: dataFromServer.text,
                            sender: {id:employeeId},
                            receiver:{id:userId}
                          },
                      ]);

                  }
                }
            }catch(error){
                console.log('the error is the',error);
            }
        };

        client.onopen = () => {
            console.log('websocket client connected');
        }
        
        
        client.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
        client.onclose = () => {
            console.log('WebSocket client disconnected');
        };
        return  () => {
            client.close()
        }
    }

    useEffect(() => {
        GetMessage()

        return () => {
            client.close()
        }
    },[sender,receiver])




  return (
   

    <>
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
            <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
           <div className="flex flex-col h-full overflow-x-auto mb-4">
            {messages.map((message, index) => (
                <div className="flex flex-col h-full" key={index}>
                <div className="grid grid-cols-12 gap-y-2">
                    {message.sender.id === currentUser ? (
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                            <img
                            src=''
                            alt="U"
                            className="w-full h-full rounded-full"
                            />
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{message.message}</div>
                        </div>
                        </div>
                    </div>
                    ) : (
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                            <img src='' alt="U" className="w-full h-full rounded-full" />
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{message.message}</div>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            ))}
            </div>

            <div
                className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
                <div>
                <button
                    className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                >
                    <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    ></path>
                    </svg>
                </button>
                </div>
                <div className="flex-grow ml-4">
                <div className="relative w-full">
                    <input
                    ref={messageRef}
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button
                    className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                    >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    </button>
                </div>
                </div>
                <div className="ml-4">
                <button
                onClick={handleMessage}
                    className="flex items-center justify-center bg-custom-blue hover:bg-custom-blue rounded-xl text-white px-4 py-1 flex-shrink-0"
                >
                    <span>Send</span>
                    <span className="ml-2">
                    <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"  
                        fill="none"
                        stroke="currentColor"   
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                    </svg>
                    </span>
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</>



  )
}

export default OneOneChat
