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


function Homepage() {
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const [isloading , setIsLoading] = useState(true)
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


  return (
    <>
    <Layouts>

    <section className="pt-10 overflow-hidden bg-white md:pt-0 sm:pt-16 2xl:pt-16">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-7xl">Find The Right Expert</h2>

                <button
                // onClick={handle}
                  className="relative overflow-hidden rounded-lg h-12 mt-6 bg-custom-blue "
                >
                  <span className="relative text-white font-bold px-8 py-8"> Contact Now</span>
                </button>

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
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Create a free account</h3>
                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>

                <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700"> 2 </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Build your website</h3>
                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
                </div>

                <div>
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                        <span className="text-xl font-semibold text-gray-700"> 3 </span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Release & Launch</h3>
                    <p className="mt-4 text-base text-gray-600">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</p>
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
    </>
  )
}

export default Homepage