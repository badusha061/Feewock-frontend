import React, { useState } from 'react'
import Layouts from '../../layouts/Layouts'
import axios from 'axios'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { constructFrom } from 'date-fns';

function ContactForm() {
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const [contactform , setContactForm] = useState({
        name:'',
        email:'',
        number:'',
        location:'',
        message:''
    })

    const [error , setError] = useState({})

    const handleClick = async (e) => {
        e.preventDefault()
        const validateError = {}

        if(!contactform.name.trim()){
            validateError.name = "Name Cannot be Empty"
        }
        if(!contactform.email.trim()){
            validateError.email = "Email Cannot be Empty"
        }else if(!/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(contactform.email)){
            validateError.email = "Email Must  be This Format"
        }
        if(!contactform.number.trim()){
            validateError.number = "Number Cannot be Empty"
        }else if(contactform.number.length != 10){
            validateError.number = "Number Must be 10 Digits"
        }
        if(!contactform.message.trim()){
            validateError.message = "Message Cannot be Empty"
        }
        if(!contactform.location.trim()){
            validateError.location = "Location Cannot be Empty"
        }
        setError(validateError)
        if(Object.keys(validateError).length === 0){
            const response = await axios.post(`${BASE_URL}/contact/contactuser`,contactform)
            if(response.status === 201){
                toast.success("Succesfully Added Your Contact , We will connect you")
                setContactForm({
                    name: '',
                    email: '',
                    number: '',
                    location: '',
                    message: ''
                  });
                return true
            }
        }
    }

  return (
    <Layouts>

    <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Contact us</h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">"Every need, one solution."</p>
        </div>

        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
            <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
                <div className="overflow-hidden bg-white rounded-xl">
                    <div className="p-6">
                        <svg className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                        <p className="mt-6 text-lg font-medium text-gray-900">+91 9744880311</p>
                        <p className="mt-1 text-lg font-medium text-gray-900">+91 9048015441</p>
                    </div>
                </div>

                <div className="overflow-hidden bg-white rounded-xl">
                    <div className="p-6">
                        <svg className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-6 text-lg font-medium text-gray-900">feewock@gmail.com</p>
                        <p className="mt-1 text-lg font-medium text-gray-900">vahab@gmail.com</p>
                    </div>
                </div>

                <div className="overflow-hidden bg-white rounded-xl">
                    <div className="p-6">
                        <svg className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">Feroke Kozhikode Kerala, INDIA</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 overflow-hidden bg-white rounded-xl">
                <div className="px-6 py-12 sm:p-12">
                    <h3 className="text-3xl font-semibold text-center text-gray-900">Send us a message</h3>

                    <form action="#" method="POST" className="mt-14">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                            <div>
                                <label for="" className="text-base font-medium text-gray-900"> Your name </label>
                                <div className="mt-2.5 relative">
                                    <input
                                    value={contactform.name}
                                    onChange={(e) => setContactForm( (prvs) => ({...prvs, name:e.target.value}))}
                                    type="text" name="" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    {error.name && <span className=' text-red-700 font-bold ' > {error.name} </span>}

                                </div>
                            </div>

                            <div>
                                <label for="" className="text-base font-medium text-gray-900"> Email address </label>
                                <div className="mt-2.5 relative">
                                    <input 
                                    value={contactform.email}
                                    onChange={(e) => setContactForm( (prvs) =>  ({...prvs, email:e.target.value}))}
                                    type="email" name="" id="" placeholder="Enter your Email" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    {error.email && <span className=' text-red-700 font-bold ' > {error.email} </span>}
                                </div>
                            </div>

                            <div>
                                <label for="" className="text-base font-medium text-gray-900"> Phone number </label>
                                <div className="mt-2.5 relative">
                                    <input 
                                    value={contactform.number}
                                    onChange={(e) => setContactForm( (prvs) =>  ({...prvs, number:e.target.value}))}    
                                    type="tel" name="" id="" placeholder="Enter your Phone Number" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    {error.number && <span className=' text-red-700 font-bold ' > {error.number} </span>}
                                </div>
                            </div>

                            <div>
                                <label for="" className="text-base font-medium text-gray-900"> Location </label>
                                <div className="mt-2.5 relative">
                                    <input
                                    value={contactform.location}
                                    onChange={(e) => setContactForm(  (prvs) =>  ({...prvs, location:e.target.value}))} 
                                    type="text" name="" id="" placeholder="Enter your Location" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600" />
                                    {error.location && <span className=' text-red-700 font-bold ' > {error.location} </span>}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label for="" className="text-base font-medium text-gray-900"> Message </label>
                                <div className="mt-2.5 relative">
                                    <textarea name="" id="" placeholder=""
                                    value={contactform.message}
                                    onChange={(e) => setContactForm(  (prvs) =>  ({...prvs, message:e.target.value}))} 
                                    className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-blue-600 caret-blue-600" rows="4"></textarea>
                                    {error.message && <span className=' text-red-700 font-bold ' > {error.message} </span>}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <button type="submit" 
                                onClick={handleClick}
                                className="inline-flex items-center justify-center w-full px-4 py-4 mt-2 text-base font-semibold text-white transition-all duration-200 bg-custom-blue border border-transparent rounded-md focus:outline-none hover:bg-custom-blue focus:bg-custom-blue">
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<Toaster
                position="top-center"
                reverseOrder={false}
                />
</Layouts>

  )
}

export default ContactForm
