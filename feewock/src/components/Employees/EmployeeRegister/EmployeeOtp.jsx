import React, { useEffect, useState } from 'react'
import './EmployeeOtp.css'
import { useSelector ,useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EmployeeOtp() {
  const navigate = useNavigate()
  const [otp  , setOpt] = useState({                                                                  
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',

  })

  const employeedetails = useSelector(state => state.employeeregistration)


  const handleChange = (e) => {
    setOpt({...otp,[e.target.id] : e.target.value})
  }
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleSubmit =(e) => {
    e.preventDefault()
    const formattedData = {
      otp: Object.values(otp).join(''), 
    };
    const instance = axios.create({
      baseURL:`${BASE_URL}/employee/${employeedetails.id}/verify_otp/`
    })
    instance.patch('',formattedData)
    .then((response) => {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Successfully Verified Your Account"
      });
        navigate('/login')
    })
    .catch((error) => {
      console.log('error',error);
    })
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    const instance = axios.create({
      baseURL:`${BASE_URL}/employee/${employeedetails.id}/generate_otp/`
    })
    instance.patch('')
    .then((response)=>{
      if(response.data === "max otp try reached , try after an hour"){
        console.log('time limited exceed');
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
          title: 'max otp try reached , try after an hour',
        });
      return false 
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Successfully Generate new OTP"
        });
      } 
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const [countDown ,setCountDown] = useState(120)
  const [isTimeOver , setIsTimeOver]  = useState(false)

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCountDown(prevCountdown => {
  //       if (prevCountdown > 0) {
  //         return prevCountdown - 1;
  //       } else {
  //         clearInterval(intervalId);
  //         setIsTimeOver(true);
  //         return 0;
  //       }
  //     });
  //   }, 1000); 

  //   return () => clearInterval(intervalId); 
  // }, []);

  return (
<div className='flex items-center  justify-center'>
      <form className="otp-Form">
      <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">EMPLOYEE OTP</h2>
      <span className="mainHeading">Enter OTP</span>
      <p className="otpSubheading">We have sent a verification code to your email</p>
      <div className="inputContainer">
        <input required="required"
         maxLength="1" type="text" className="otp-input" id="otp-input1"
         onChange={(e) => handleChange(e)}
         />
        <input required="required"
         maxLength="1" type="text" className="otp-input" id="otp-input2"
         onChange={(e) => handleChange(e)}
         
         />
        <input 
        required="required" maxLength="1" type="text" className="otp-input" id="otp-input3"
        onChange={(e) => handleChange(e)}
        
        />
        <input 
        required="required" maxLength="1" type="text" className="otp-input" id="otp-input4"
        onChange={(e) => handleChange(e)}
        
        /> 
        
      </div>
      {/* {!isTimeOver ? (
        <button className="verifyButton" >
          Your OTP will be Expire in {countDown} seconds
        </button>

      ):(
        <button className="verifyButton" >
          Sorry Your OTP time is Over Please Try Again
        </button>
      )} */}
        
        <button className="verifyButton" type="submit" onClick={handleSubmit} >Verify</button>
          <button className="exitBtn">×</button>
          <p className="resendNote">Didn't receive the code? 
          <button
           className="resendBtn"
          onClick={handleGenerate} 
           >Resend Code</button></p>
      </form>
      </div> 
    
  )
}

export default EmployeeOtp