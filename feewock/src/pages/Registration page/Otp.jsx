import React, { useEffect, useState , useRef} from 'react'
import './Otp.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Otp() {
  const navigate = useNavigate()
  const [otp , setOtp] = useState(false)
  const details = useSelector(state => state.registration);
  const [verify , setVerify] = useState({
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',

  })
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    if(!otp){
      const instance = axios.create({
        baseURL:`${BASE_URL}/user/${details.id}/generate_otp/`
      }) 
      instance.patch('')
      .then((response) => {
        console.log(response);
        setOtp(true)
      })
      .catch((error) => {
        console.log(error);
      })
    }
 
  },[details.id , otp])

  const handleOtp = () => {
    setOtp(false)
  }

  const handleChange = (e) => {
    setVerify({...verify,[e.target.id] : e.target.value})
  }

  const verifyingotp = async (e) => {
    e.preventDefault();
    const formattedData = {
      otp: Object.values(verify).join(''), 
    };
    const instance = axios.create({
      baseURL:`${BASE_URL}/user/${details.id}/verify_otp/`
    })
    instance.patch('',formattedData)
    .then((respose) => {
      console.log(respose.data);
      navigate('/login')

    })
    .catch((error) => {
      console.log(error);
    })

    }

        return (
    <>
      <div className='flex items-center  justify-center'>
      <form className="otp-Form">
 
      <span className="mainHeading">Enter OTP</span>
      <p className="otpSubheading">We have sent a verification code to your mobile number</p>
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
        <button className="verifyButton" type="submit" onClick={verifyingotp}>Verify</button>
          <button className="exitBtn">×</button>
          <p className="resendNote">Didn't receive the code? 
          <button
           className="resendBtn"
           onClick={handleOtp}
           >Resend Code</button></p>
      </form>
      </div> 

         
        </>
        
        )
      }

export default Otp