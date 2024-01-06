import React, { useEffect, useState , useRef} from 'react'
import './Otp.css';
import { useSelector } from 'react-redux';
import { auth } from '../../config/firebase';
import {RecaptchaVerifier , signInWithPhoneNumber} from  'firebase/auth';


function Otp() {
  const [otp , setOtp] = useState('')
  const [verify , setVerify ] = useState('')
  const usernumber =   useSelector(state => state.registration.number)

    const sendOtp = async () => {
      try{
        if(auth){
          console.log(auth);
          let recaptchaverifier = new RecaptchaVerifier("recaptcha",{},auth)
          console.log(recaptchaverifier,'1111');
          let conformation = await signInWithPhoneNumber(auth , usernumber , recaptchaverifier)
          console.log(conformation);
        }
      }catch(error){
        console.log(error);
      }
    }
  
    useEffect(() => {
      sendOtp()
    },[usernumber])    

        return (
        <>
      <div className='flex items-center justify-center'>
      <form className="otp-Form">
      <span className="mainHeading">Enter OTP</span>
      <p className="otpSubheading">We have sent a verification code to your mobile number</p>
      <div className="inputContainer">
        <input required="required" maxLength="1" type="text" className="otp-input" id="otp-input1" />
        <input required="required" maxLength="1" type="text" className="otp-input" id="otp-input2" />
        <input required="required" maxLength="1" type="text" className="otp-input" id="otp-input3"/>
        <input required="required" maxLength="1" type="text" className="otp-input" id="otp-input4" /> 
        
      </div>
        <button className="verifyButton" type="submit">Verify</button>
          <button className="exitBtn">×</button>
          <p className="resendNote">Didn't receive the code? <button className="resendBtn">Resend Code</button></p>
      </form>
      </div> 

          <div id="recaptcha">

          </div>
        </>
        
        )
      }

export default Otp