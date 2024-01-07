import React, { useEffect, useState , useRef} from 'react'
import './Otp.css';
import { useSelector } from 'react-redux';
import { auth } from '../../config/firebase';
import {RecaptchaVerifier , signInWithPhoneNumber} from  'firebase/auth';


function Otp() {
  const [phone , setPhone] = useState('')
  const [otp , setOtp] = useState('')
  const [verify , setVerify ] = useState('')

  const handleChange = async () => {
      try{
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
        let signinwithphonenumber = await signInWithPhoneNumber(auth , phone , recaptchaVerifier)
        console.log(signinwithphonenumber);
      }catch(error){
        console.log(error);
      }
  }

        return (
    <>
      <div className='flex items-center  justify-center'>
      <form className="otp-Form">
      <div className="bg-white p-4 rounded-lg max-w-[350px]">
            <label className="text-gray-600 text-sm">
                Phone number
            </label>  
            <div className="relative mt-2 max-w-xs text-gray-500">
                <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                    <select className="text-sm outline-none rounded-lg h-full">
                        <option>US</option>
                        <option>ES</option>
                        <option>MR</option>
                    </select>
                </div>
                <input 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                 placeholder="+91 63390933" 
                 className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg" />
            </div>
        </div>
        <button onClick={handleChange} className="verifyButton" type="submit">Enter number</button>
        <div id='recaptcha-container'>

        </div>
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

         
        </>
        
        )
      }

export default Otp