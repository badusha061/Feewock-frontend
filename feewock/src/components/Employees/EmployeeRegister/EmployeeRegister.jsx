import React from 'react'
import { NavLink } from 'react-router-dom'

function EmployeeRegister() {
  return (
    <>
   <div className="relative py-3 sm:max-w-xl sm:mx-auto no-scrollbar">
  <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-lg rounded-3xl sm:p-10">
    <h1> Employee Registrations </h1>
    <div className="max-w-md mx-auto">
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="first_name">First Name</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            id="first_name"
            
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="last_name">Last Name</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            id="last_name"
         
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="username">Username</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="text"
            id="username"
            
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="email">Email</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="email"
            id="email"
            
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="number">Phone number</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="number"
            id="number"
            
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="location">Location</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="location"
            id="location"
            
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="password">Password</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            
          />
        </div>
        <div>
          <label className="font-semibold text-sm text-gray-600 pb-1 block" htmlFor="conform_password">Confirm Password</label>
          <input
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            type="password"
            id="conform_password"
            
          />
        </div>
      </div>
      <div className="mt-5">
        <button
          className="py-2 px-4 bg-custom-blue hover:bg-black focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="submit"
        >
          Sign up
        </button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        <NavLink to="/employee/employeelogin">
          <a
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            href="#"
          >
            have an account? Log in
          </a>
        </NavLink>
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default EmployeeRegister