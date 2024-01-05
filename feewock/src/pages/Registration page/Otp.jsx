import React, { useState } from 'react'
import './Otp.css';
import { useSelector } from 'react-redux';
import { auth } from '../../config/firebase';
import {RecaptchaVerifier , signInWithPhoneNumber} from  'firebase/auth'


function Otp() {
 const [number , setNumber] = useState('')
 const [otp , setOtp] = useState('')
 const [verify , setVerify ] = useState('')

  const sendOtp = async () => {

    try{
        let recaptchaverifier = await new RecaptchaVerifier("recaptcha",{},auth)
        let conformation = await signInWithPhoneNumber(auth , number , recaptchaverifier)
        console.log(conformation);
    }catch(error){
      console.log(error);
    }
  }

  setNumber(useSelector(state => state.registration.number))

  return (
<div className='flex items-center justify-center'>
<form className="otp-Form">
 <span className="mainHeading">Enter OTP</span>
 <p className="otpSubheading">We have sent a verification code to your mobile number</p>
 <div className="inputContainer">
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input1" />
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input2" />
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input3"/>
  <input required="required" maxlength="1" type="text" className="otp-input" id="otp-input4" /> 
  
 </div>
  <button className="verifyButton" type="submit">Verify</button>
    <button className="exitBtn">×</button>
    <p className="resendNote">Didn't receive the code? <button className="resendBtn">Resend Code</button></p>
</form>
<div id='recaptchaverifier'>

</div>
</div> 
  
  )
}

export default Otp