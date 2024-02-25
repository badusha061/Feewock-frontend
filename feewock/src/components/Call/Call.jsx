import React, { useEffect } from 'react'
import Layouts from '../../layouts/Layouts'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import useAxios from '../../AxiosConfig/Axios'



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
        const appId = '1866354141'
        const serverSecret  = '6c0cfad2591d940a63fccea53d278c5a'
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverSecret ,
          roomId,
          '26',
          'ibrahim'
        )
      console.log(roomId);
      console.log(appId);
      console.log(serverSecret);
      console.log(kitToken);
      const zc =   ZegoUIKitPrebuilt.create(kitToken)
      console.log(zc);
      try{
         zc.joinRoom({
          container:element,
          scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall
          },
  
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
