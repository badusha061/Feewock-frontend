import React, { useEffect, useReducer, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useSelector } from "react-redux";
import QueryString from 'query-string';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import useAxios from '../../AxiosConfig/Axios'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../utils/Spinner'
import { MdAddCall } from "react-icons/md";
import icon from '../../components/Navbar/image/icon.png'


function Homepage() {
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const [isloading , setIsLoading] = useState(true)
    const [reviews , setReviews] = useState([])
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const navigate = useNavigate()
    const settings = {
        
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,       
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },],};

 

    const [banner , setBanner] = useState([])
    useEffect(() => {
      GetBanner()
      GetReviews()
    },[reducer])    
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let  UserId 
    if(userDetails && userDetails.id){
      UserId = userDetails.id
    }
    const GetBanner = async () => {
      const response = await axios.get(`${BASE_URL}/banner/listuser`)
      if(response.status === 200){
        setBanner(response.data)
        setIsLoading(false)
      }
    }

    const GetReviews = async () => {
      const response = await axios.get(`${BASE_URL}/reviews/listuser`)
      console.log(response.data);
      if (response.status === 200){
        setReviews(response.data)
      }
    }


    useEffect(() => {

      const values = QueryString.parse(location.search);
      if (values.success) {
          toast.success('Your payment is Success')

          const appointmenId = values.appointment_id

          if(appointmenId){
            axios.post(`${BASE_URL}/booking/stripsuccess/${appointmenId}/`)
            .then((response) => {
              if(response.status === 200){
                  navigate('/bookinglist',{state:UserId})
              }
            })
            .catch((error) => {
              console.log('error is the', error);
            })
          }
      }
      if (values.canceled) {
        toast.error('Your Payment is canceled..')   
      }
    }, []);

    if(isloading){
      return <Spinner />
    }

    const handlecontat = () => {
        navigate('/contact')
    }

    const handleService = () => {
      navigate('/service')
    }

  return (
    <>
    <Layouts>

    <section className="pt-10 overflow-hidden bg-white md:pt-0 sm:pt-16 2xl:pt-16">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div >
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-7xl">Find The Right Expert</h2>
                <div onClick={handlecontat} className='hover:cursor-pointer  hover:shadow-2xl flex items-center  justify-around bg-custom-blue w-48  h-14 rounded-md mt-6' >
                      <div className=' flex gap-4' >
                        <MdAddCall className="fill-current text-white"  size={20} />
                        <span className="text-white font-bold"  > Contact Now </span>
                      </div>
                </div>
              </div>      
            <div className="relative  mt-6 ">
              <Slider {...settings} >
                {banner.map((data , index) => (
                  <img className=" w-[600] h-[470]    shadow-2xl  rounded-xl xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" key={index} src={data.image} alt="images" />
                ))}
              </Slider>
            </div>
        </div>
    </div>
</section>




<section className="py-10 bg-white sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
           
            <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Unlimited access to 100+ services</h2>
        </div>

        <div className="grid grid-cols-1  shadow-lg gap-5 mt-12 sm:grid-cols-3 lg:mt-20 lg:gap-x-12">
            <div onClick={handleService} className="transition-all shadow-2xl hover:cursor-pointer duration-200 bg-white hover:shadow-xl">
            <div className="flex flex-col  bg-white rounded-3xl">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                <div>
                  <h2
                    className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl"
                  >
                    SERVICE
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">Access Service.</p>
                </div>
                <div className="mt-6">
                  <p>
                    <span className="text-3xl font-light tracking-tight text-black">
                    Join India's largest service Network  
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>

            </div>

            <div className="transition-all  hover:cursor-pointer shadow-2xl duration-200 bg-white hover:shadow-xl">
            <div className="flex flex-col bg-white rounded-3xl">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                <div>
                  <h2
                    className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl"
                  >
                    PRODUCT
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">coming soon.....</p>
                </div>
                <div className="mt-6">
                  <p>
                    <span className="text-3xl font-light tracking-tight text-black">
                    Life is for service
                    </span>
                  </p>
                </div>
              </div>
            </div>
         
          </div>

            </div>

            <div className="transition-all shadow-2xl hover:cursor-pointer duration-200 bg-white hover:shadow-xl">
            <div className="flex flex-col bg-white rounded-3xl">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                <div>
                  <h2
                    className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl"
                  >
                    TAXI
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">coming soon.....</p>
                </div>
                <div className="mt-6">
                  <p>
                    <span className="text-3xl font-light tracking-tight text-black">
                    Days go on and on. They don't end.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
            </div>
        </div>
    </div>
</section>


<section className="py-10 bg-white sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">How does it work?</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.</p>
        </div>

        <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
            </div>

            <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700"> 1 </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">BOOK A SERVICE</h3>
                    <p className="mt-4 text-base text-gray-600">Select from our wide  range service  in your city on web / mobile app ,review prices , set location date time .</p>
                </div>

                <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700"> 2 </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">SERVICE DELIVERY</h3>
                    <p className="mt-4 text-base text-gray-600">Our service experts will contact you for any additional information , and will be there at the scheduled time sit.</p>
                </div>

                <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700"> 3 </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">PAY &  LEAVE  FEEDBACK </h3>
                    <p className="mt-4 text-base text-gray-600">On completion of service,pay  via the selected payment mode , and a receipt will be generated We.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="py-10 bg-white sm:py-16 lg:py-24">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">What our customers say</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">"Every need, one solution."</p>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
                  
          {reviews.map((data ,index) => (
            <div className="overflow-hidden shadow-xl hover:cursor-pointer bg-white rounded-md">
                <div className="px-5 py-6">
                    <div className="flex items-center justify-between">
                      {data.user.images ? (
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src={`${BASE_URL}${data.user.images}`} alt="" />
                      ):(
                        <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="data:image/jpeg;base64,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" alt="" />
                      )}
                        <div className="min-w-0 ml-3 mr-auto">
                            <p className="text-base font-semibold text-black truncate"> {data.user.first_name} </p>
                            <p className="text-sm text-gray-600 truncate">@darrels</p>
                        </div>
                        <a href="#" title="" className="inline-block text-sky-500">
                                <img className="w-16 h-16"     src={icon} alt="" />                            
                        </a>
                    </div>
                    <blockquote className="mt-5">
                        <p className="text-base  text-gray-800">
                            {data.content}
                            <span className="block text-custom-blue">#HAPPY CUSTOMER</span>
                        </p>
                    </blockquote>
                </div>
            </div>
        ))}

        </div>
    </div>
</section>



<section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Discount Service</h2>
            <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">"Every need, one solution."</p>
        </div>
<div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
      

      <div className="overflow-hidden relative w-56 h-64 bg-custom-blue rounded-2xl text-gray-50 flex flex-col justify-end items-center gap-2">
        <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current">
          <path stroke-width="8" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z" className="svg-stroke-primary">
          </path>
        </svg>
        <div className="flex flex-col items-center">
          <p className="text-xl font-extrabold">Discount</p>
          <p className="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-gray-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-gray-200 before:w-12 before:h-0.5">Up to</p>
        </div>
        <span className="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">70%</span>
        <button className="z-10 duration-500 font-bold px-4 py-2 bg-gray-50 text-sky-500 hover:bg-sky-500 hover:text-gray-50">Shop now</button>
        <p className="text-xs mb-1">*Variable prices</p>
      </div>

      <div className="overflow-hidden relative w-56 h-64 bg-custom-blue rounded-2xl text-gray-50 flex flex-col justify-end items-center gap-2">
        <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current">
          <path stroke-width="8" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z" className="svg-stroke-primary">
          </path>
        </svg>
        <div className="flex flex-col items-center">
          <p className="text-xl font-extrabold">Discount</p>
          <p className="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-gray-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-gray-200 before:w-12 before:h-0.5">Up to</p>
        </div>
        <span className="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">70%</span>
        <button className="z-10 duration-500 font-bold px-4 py-2 bg-gray-50 text-sky-500 hover:bg-sky-500 hover:text-gray-50">Shop now</button>
        <p className="text-xs mb-1">*Variable prices</p>
      </div>

      <div className="overflow-hidden relative w-56 h-64 bg-custom-blue rounded-2xl text-gray-50 flex flex-col justify-end items-center gap-2">
        <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current">
          <path stroke-width="8" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z" className="svg-stroke-primary">
          </path>
        </svg>
        <div className="flex flex-col items-center">
          <p className="text-xl font-extrabold">Discount</p>
          <p className="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-gray-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-gray-200 before:w-12 before:h-0.5">Up to</p>
        </div>
        <span className="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">70%</span>
        <button className="z-10 duration-500 font-bold px-4 py-2 bg-gray-50 text-sky-500 hover:bg-sky-500 hover:text-gray-50">Shop now</button>
        <p className="text-xs mb-1">*Variable prices</p>
      </div>


      <div className="overflow-hidden relative w-56 h-64 bg-custom-blue rounded-2xl text-gray-50 flex flex-col justify-end items-center gap-2">
        <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="absolute opacity-30 -rotate-12 -bottom-12 -right-12 w-40 h-40 stroke-current">
          <path stroke-width="8" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M65.8,46.1V30.3a15.8,15.8,0,1,0-31.6,0V46.1M22.4,38.2H77.6l4,47.3H18.4Z" className="svg-stroke-primary">
          </path>
        </svg>
        <div className="flex flex-col items-center">
          <p className="text-xl font-extrabold">Discount</p>
          <p className="relative text-xs inline-block after:absolute after:content-[''] after:ml-2 after:top-1/2 after:bg-gray-200 after:w-12 after:h-0.5   before:absolute before:content-[''] before:-ml-14 before:top-1/2 before:bg-gray-200 before:w-12 before:h-0.5">Up to</p>
        </div>
        <span className="font-extrabold text-7xl -skew-x-12 -skew-y-12 -mt-1 mb-5">70%</span>
        <button className="z-10 duration-500 font-bold px-4 py-2 bg-gray-50 text-sky-500 hover:bg-sky-500 hover:text-gray-50">Shop now</button>
        <p className="text-xs mb-1">*Variable prices</p>
      </div>



      </div>
  </div>
</section>



  <Toaster
          position="top-center"
          reverseOrder={false}
          />
      </Layouts>
    </>
  )
}

export default Homepage