import React, { useEffect } from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import useAxios from '../../AxiosConfig/Axios'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';



function Call() {
    const axiosInstance = useAxios()
    const[data , setData] = useState([])
    const location = useLocation()
    const currentUsers = localStorage.getItem('userDetails')
    const Employee =JSON.parse(currentUsers)
    let employeeId 
    let userId 
    let  currentUser
    if(Employee){
        if(Employee.role === 3){
            userId = location.state?.userId;
            currentUser = userId
            employeeId = location.state?.employeeId
          }else if (Employee.role === 2){
            userId = location.state?.userId;
            employeeId = location.state?.employeeId
            currentUser = employeeId
        }
    }

    useEffect(() => {
      if(userId){
        GetUserData()
      }
    },[userId])

      const GetUserData = async() => {
        const  response =  await axiosInstance.get(`/api/userindivual/${userId}/`)
        if (response.status === 200){
            setData(response.data)
        }
    }

      const myMeeting = async (element) => {
        const roomId = `${userId}${employeeId}`
        const appId = 514898253;
        const serverSecret  = 'dd98666c2174b650527f7ee5bd5348e0'
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverSecret ,
          roomId,
          `${data.id}`,
          `${data.first_name}${data.last_name}` 
        )

      const zc =   ZegoUIKitPrebuilt.create(kitToken)
      try{
         zc.joinRoom({
          container:element,
          scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall
          },
  
        })

        zc.on('roomUserUpdate', (roomId , userUpdateType , userList) => {
          if(userUpdateType === 'ADD'){
            console.log('icoming call from :',userList[0]);
          }
        })
      }catch(error){
        console.log('the error is the',error);
      }
    }


  return (
    <Layouts>
      <div>
          <div ref={myMeeting} />
      </div>

    </Layouts>
  )
}

export default Call
