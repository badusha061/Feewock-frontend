import React from 'react';
import icon from './image/icon.png'

function Navbar() {
  return (
    <>

       <div className="w-screen fixed justify-between items-center inline-flex shadow-lg ">
        <img src={icon} alt="navbaricon"  className='w-[140px] h-[28]'/>
        <div className="justify-start items-center gap-10 flex">
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Home</div>
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer">About</div>
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Service</div>
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Help</div>
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Contact</div>
        <div className="text-black text-[23] font-medium font-['Inter'] cursor-pointer ">Expert</div>
        <button className="w-[150px] bg-custom-blue h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#000000] before:to-[#000000] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
          Login
        </button>
        <button className="w-[150px]  bg-custom-blue h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#000000] before:to-[#000000] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
          Registration
        </button>
        </div>
       </div>
      
    </>
  )
}

export default Navbar