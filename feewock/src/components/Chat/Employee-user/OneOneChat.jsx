import React, { useEffect, useState , useReducer , useRef } from 'react'
import Layouts from '../../../layouts/Layouts'
import { json, useLocation, useNavigate } from 'react-router-dom'
import useAxios from '../../../AxiosConfig/Axios'
import Swal from 'sweetalert2';
import { w3cwebsocket as W3CWebSocket  } from 'websocket';


function OneOneChat() {
    const navigate = useNavigate()
    const [data , setData] = useState([])
    const [messages , setMessages] = useState([])
    const [users , setUser] = useState([])
    const location = useLocation()
    const UserDetailsJson = localStorage.getItem('userDetails')
    const UserDetails = JSON.parse(UserDetailsJson) 
    const user_Id = UserDetails === null ? null : UserDetails.id
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
    if(Employee.role === 3){
        employeeId = location.state?.employeeId
        userId = Employee.id
        sender = userId
        receiver = employeeId
        currentUser = userId
    }else if (Employee.role === 2){
        userId = location.state?.UserId;
        employeeId = location.state?.EmployeeId;
        sender = employeeId
        receiver = userId
        currentUser = employeeId
    }




    



    // useEffect(() => {
    //     const instance = axiosInstance.create({
    //         baseURL:`${BASE_URL}/dashboard/employeeindivualPermsion/${employeeId}/`,
    //           headers: {
    //             'Authorization': `Bearer ${access_token}`,
    //             'Content-Type': 'application/json',  
    //         },
    //       })
    //       instance.get('')
    //       .then((response)=> {
    //         setData(response.data)
    //       })
    //       .catch((error) => {
    //         if(error.response.status === 401){
    //             const Toast = Swal.mixin({
    //                 toast: true,
    //                 position: 'top-end',
    //                 showConfirmButton: false,
    //                 timer: 3000,
    //                 timerProgressBar: true,
    //                 didOpen: (toast) => {
    //                   toast.onmouseenter = Swal.stopTimer;
    //                   toast.onmouseleave = Swal.resumeTimer;
    //                 },
                    
    //               });
                  
    //               Toast.fire({
    //                 icon: 'error',
    //                 title: 'Please Login',
    //               });
    //             navigate('/login')
    //         }
    //         console.log(error.response.status);
    //       })
    // },[BASE_URL , reducer])





    useEffect(() => {
        GetMessage()
    },[employeeId , userId])

    const GetMessage = async () => {
        const response = await axiosInstance.get(`${BASE_URL}/chat/message/${sender}/${receiver}/`)
        if(response.status === 200){
            console.log(response.data);
            setMessages(response.data)
        }else{
            console.log('something error');
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
    useEffect(() => {

        client.onmessage = (event) => {
            console.log('before come the message',event.data);
            try{
                const dataFromServer = JSON.parse(event.data);
                console.log('after message',dataFromServer);
                if (dataFromServer) {
                  if(dataFromServer.sender === userId){
                    console.log('id',dataFromServer.id);
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
                    console.log('employee ',dataFromServer.sender);
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
    },[])



  return (
    <Layouts>

    <>
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
            {/* <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                <div className="flex flex-row items-center justify-center h-12 w-full">
                <div
                    className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
                >
                    <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                    </svg>
                </div>
                <div className="ml-2 text-custom-blue font-bold text-2xl">FeeWock</div>
                </div>
                <div
                className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                >
                <div className="h-20 w-20 rounded-full border overflow-hidden">
                    {data.images ? (
                         <img
                         src={data.images}
                         alt="Avatar"
                         className="h-full w-full"
                         />
                    ):(
                        <img
                        src="https://avatars3.githubusercontent.com/u/2763884?s=128"
                        alt="Avatar"
                        className="h-full w-full"
                        />
                    )}
                </div>
                <div className="text-sm font-bold mt-2">{data.username} </div>
                {data.service ? (
                    data.service.map((s, index) => (
                        <div className="text-xs text-gray-500"> {s.name} </div>
                    ))
                ):(
                    <div className="text-xs text-gray-500"> No Service</div>
                )}
                <div className="flex flex-row items-center mt-3">
                    <div
                    className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
                    >
                    <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                    </div>
                {data.is_active === true ? (
                    <div className="leading-none ml-1 text-xs">Active</div>

                ):(
                    <div className="leading-none ml-1 text-xs">No Active</div>
                )}
                </div>
                </div>
          
            </div> */}
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
                                src={users.images}
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
                                <img src={data.images} alt="U" className="w-full h-full rounded-full" />
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
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
  </Layouts>

  )
}

export default OneOneChat
