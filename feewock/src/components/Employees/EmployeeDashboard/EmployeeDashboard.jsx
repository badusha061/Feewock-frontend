import React from 'react'
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts'
import banner from './Images/banner.png'
import banner1 from './Images/banner1.jpg'
import banner2 from './Images/banner2.jpg'


function EmployeeDashboard() {
  return (
    <EmployeeLoyouts>
      <div className="relative">
    <header className="absolute inset-x-0 top-0 z-10 w-full">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
                <div className="flex-shrink-0">
                    <a href="#" title="" className="flex">
                        <img className="w-auto h-8" src='' alt="" />
                    </a>
                </div>

                <button type="button" className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                    <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>

                    <svg className="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

            </div>
        </div>
    </header>

    <section className="bg-custom-blue rounded-xl  overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                <div className="absolute bottom-0 right-0 hidden lg:block">
                    <img className="object-contain w-auto h-48" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/curved-lines.png" alt="" />
                </div>

                <div className="relative px-4 pt-24 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:py-24 lg:text-left">
                    <h1 className="text-4xl font-bold text-white sm:text-6xl xl:text-8xl">
                        WELCOM TO <br />
                        FEEWOCK.
                    </h1>
                    <p className="mt-8 text-xl text-white">We help you to make your remote work life easier. Build a distruction free working experience.</p>

                
                    <p className="mt-5 text-base text-white">Instant access . No credit card required</p>
                </div>

                <div className="absolute right-0 z-10 -bottom-16 lg:top-24 lg:-left-20">
                    <img className="w-32 h-32 md:w-40 md:h-40" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/3/circular-text.png" alt="" />
                </div>
            </div>

            <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
                <div className="absolute inset-0">
                    <img className="object-cover w-full h-full scale-150" src={banner2} alt="" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

            
            </div>
        </div>
    </section>
</div>

    </EmployeeLoyouts>
  )
}

export default EmployeeDashboard