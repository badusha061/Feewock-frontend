import React, { useState } from 'react'
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts'
import banner from './Images/banner.png'
import banner1 from './Images/banner1.jpg'
import banner2 from './Images/banner2.jpg'
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";



function EmployeeDashboard() {
    const [currentIndex , setCurrentIndex] = useState(0)
    const prvsSlice = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex)
    }
    const nextSlice = () => {
        const isLastSlice = currentIndex === slides.length - 1;
        const newIndex = isLastSlice ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }
    
  const slides = [
    {
      url:"https://cdn.pixabay.com/photo/2018/05/09/22/40/career-3386334_640.jpg",
    },
  
  ]
  return (
    <EmployeeLoyouts>


<div className=' max-w-[1400px] h-[780px] w-full  px-4 relative group: '>
    <div style={{backgroundImage : `url(${slides[currentIndex].url})`, backgroundSize: 'cover'}} className='w-full h-full rounded-2xl bg-cover duration-500'>
            <div className=' hidden group-hover:block absolute [50%] -translate-x-0   translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer '>
                <BsChevronCompactLeft size={30}  onClick={prvsSlice} />

            </div>
            <div className='hidden group-hover:block  absolute [50%] -translate-x-0   translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight size={30} onClick={nextSlice} />

            </div>
        </div>

</div>


    </EmployeeLoyouts>
  )
}

export default EmployeeDashboard