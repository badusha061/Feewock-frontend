import React, { useState } from 'react'
import Layouts from '../../layouts/Layouts'
import {BsChevronCompactRight , BsChevronCompactLeft} from 'react-icons/bs'


function Homepage() {
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
      url:"https://www.questionpro.com/blog/wp-content/uploads/2022/05/service-quality.jpg",
    },
    {
      url:"https://www.questionpro.com/blog/wp-content/uploads/2022/05/service-quality.jpg",
    },
    {
      url:"https://www.questionpro.com/blog/wp-content/uploads/2022/05/service-quality.jpg",
    },
    {
      url:"https://www.questionpro.com/blog/wp-content/uploads/2022/05/service-quality.jpg",
    },
  ]
  
  return (
    <>
    <Layouts>

    <div className=' max-w-[1400px] h-[780px] w-full py-16 px-4 relative group: '>
    <div style={{backgroundImage : `url(${slides[currentIndex].url})`, backgroundSize: 'cover'}} className='w-full h-full rounded-2xl bg-cover duration-500'>
            <div className=' hidden group-hover:block absolute [50%] -translate-x-0   translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer '>
                <BsChevronCompactLeft  onClick={prvsSlice} size={30} />
            </div>
            <div className='hidden group-hover:block  absolute [50%] -translate-x-0   translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlice} size={30} />
            </div>
        </div>
    </div>
      </Layouts>
    </>
  )
}

export default Homepage