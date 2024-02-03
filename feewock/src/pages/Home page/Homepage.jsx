import React, { useEffect, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { useSelector } from "react-redux";


function Homepage() {
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;


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
    },[])    
    const GetBanner = async () => {
      const response = await axios.get(`${BASE_URL}/banner/listuser`)
      if(response.status === 200){
        setBanner(response.data)
      }
    }

  return (
    <>
    <Layouts>

    <section className="pt-10 overflow-hidden bg-gray-50 md:pt-0 sm:pt-16 2xl:pt-16">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <div>
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-7xl">Find The Right Expert</h2>

                <button
                  className="relative overflow-hidden rounded-lg h-12 mt-6 bg-custom-blue "
                >
                  <span className="relative text-white font-bold px-8 py-8"> Contact Now</span>
                </button>

            </div>

            <div className="relative">

              <Slider {...settings} >
                {banner.map((data , index) => (
                  <img className=" w-[600] h-[470]    shadow-2xl  rounded-xl xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" key={index} src={data.image} alt="images" />
                ))}
              </Slider>
            </div>
        </div>
    </div>
</section>


      </Layouts>
    </>
  )
}

export default Homepage