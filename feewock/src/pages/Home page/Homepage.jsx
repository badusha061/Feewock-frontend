import React, { useEffect, useState } from 'react'
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
    },[])    
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

  <Toaster
          position="top-center"
          reverseOrder={false}
          />
      </Layouts>
    </>
  )
}

export default Homepage