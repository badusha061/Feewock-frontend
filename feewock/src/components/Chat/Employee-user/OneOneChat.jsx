import React, { useEffect, useState , useReducer , useRef } from 'react'
import { json, useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../../../AxiosConfig/Axios'
import Swal from 'sweetalert2';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import  EmojiPicker  from 'emoji-picker-react';



function OneOneChat() {
    const navigate = useNavigate()
    const [choosenemoji , setChooseneemoji] = useState(null)
    const [emoji , setEmoji] = useState(false)
    const [data , setData] = useState([])
    const [messages , setMessages] = useState([])
    const [users , setUser] = useState([])
    const [employee , setEmployee] = useState([])
    const [message , setMessage] = useState('')
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
        if(!message.trim()){
            toast.error('Cannot be empty')
            return false
        }
        const messageValue = message
        if (client.readyState === W3CWebSocket.OPEN) {  
            client.send(JSON.stringify({ text: messageValue , sender: sender }));
            setMessage('')
            setEmoji(false)
        } else {
            console.error('WebSocket not open yet. Message not sent.');
        }
    }


    const client = new W3CWebSocket(`ws://localhost:8001/ws/chat/${sender}_${receiver}/`) 

   useEffect(() => {
        GetMessage()
   },[sender , receiver])

   const GetMessage = async () => {

        await axiosInstance.get(`${BASE_URL}/chat/message/${sender}/${receiver}/`)
        .then((response) => {
            setMessages(response.data)
            console.log('message is the ',response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
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
        
    
    },[sender , receiver])


    useEffect(() => {
        client.onmessage = (event) => {
            
            try{
                const dataFromServer = JSON.parse(event.data);
                if (dataFromServer) {
                    const newMessage = {
                        id: dataFromServer.messages.id,
                        message:dataFromServer.message,
                        sender:{id:dataFromServer.messages.sender.id},
                        receiver:{id:dataFromServer.messages.receiver.id},
                        date:dataFromServer.messages.date,
                        is_read:dataFromServer.messages.is_read
                    };

                setMessages((prevMessages) => [...prevMessages, newMessage]);
                         
                }
                }catch(error){
                    console.log('the error is the',error);
                }
            };
    },[sender , receiver])

    const handleEmoji = () => {
        setEmoji(true)
    }

    const handleInputEmoji = (emoji) => {
        const emojiChar = emoji.emoji
        setMessage((prvs) => prvs + emojiChar)
    }

    const handleCancel = () => {
        setEmoji(false)
    }

  return (
   

    <>
    <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
            <div
            className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
            >
           <div className="flex flex-col h-full overflow-x-auto mb-4">
            {messages && messages.map((message, index) => (
                <div className="flex flex-col h-full" key={index}>
                <div className="grid grid-cols-12 gap-y-2">
                    {message.sender.id === currentUser ? (
                    <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                            {employee.id === currentUser ? (
                                 <img
                                 src={employee.images}
                                 alt="U"
                                 className="w-full h-full rounded-full"
                                 />
                            ):(
                                <img
                                 src={users.images}
                                 alt="U"
                                 className="w-full h-full rounded-full"
                                 />
                            )}
                           
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div className="font-bold text-xs text-gray-500 mb-1"> {moment.utc(message.date).local().startOf('seconds').fromNow()} </div>
                            
                            <div className=' flex '>
                            {message.is_read === true ? (
                                 <div>
                                 {typeof message.message === 'object' ? (
                                     <>
                                     <div>{message.message.message}</div>
                                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                     <polyline points="20 6 9 17 4 12"></polyline>
                                     </svg>
     
     
                                     </>
                                 ) : (
                                     <>
                                     <div>{message.message}</div>
                                     <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                     <polyline points="20 6 9 17 4 12"></polyline>
                                     </svg>
     
     
     
                                     </>
                                 )}
                                 </div>
                            ):(
                                <div>
                                 {typeof message.message === 'object' ? (
                                     <>
                                     <div>{message.message.message}</div>
                                    
     
     
                                     </>
                                 ) : (
                                     <>
                                     <div>{message.message}</div>
                                    
     
     
     
                                     </>
                                 )}
                                 </div>
                            )}
                           

                            

                            </div>
                           

 

                        </div>
                        </div>
                    </div>
                    ) : (
                    <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                            {users.id === currentUser ? (
                                <img src={employee.images} alt="U" className="w-full h-full rounded-full" />

                            ):(
                                <img src={users.images} alt="U" className="w-full h-full rounded-full" />
                            )}
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                        <div className="font-bold text-xs text-gray-500 mb-1"> {moment.utc(message.date).local().startOf('seconds').fromNow()} </div>

                             <div>
                             {typeof message.message === 'object' ? (
                                 <>
                                 
                                 <div>{message.message.message}</div>
                                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                 <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
 
 
                                 </>
                             ) : (
                                 <>
                                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                 <polyline points="20 6 9 17 4 12"></polyline>
                                 </svg>
 
 
                                 <div>{message.message}</div>
                                 </>
                             )}
                           
 
                             </div>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
                </div>
            ))}
            </div>

            {emoji && (
                <div className='flex justify-center' >    
                    <EmojiPicker  onEmojiClick={handleInputEmoji} />
                </div>
            )}

            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ml-4">
                <div className="relative w-full">
                    <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button
                    onClick={handleEmoji}
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
    <Toaster
                position="top-center"
                reverseOrder={false}
                />
</>



  )
}

export default OneOneChat
