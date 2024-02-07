import React,{useState , useReducer, useEffect} from 'react'
import Layouts from '../../layouts/Layouts'
import { Navigate, useNavigate, useParams  } from 'react-router-dom'
import background from './Images/background.jpg'
import call from './Images/call.png'
import axios from 'axios'
import Spinner from '../../utils/Spinner'
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import useAxios from '../../AxiosConfig/Axios';


function Views() {
    const axiosInstance = useAxios()
    const [data , setData] = useState([])
    const [post , setPost] = useState([])
    const [tab , setTab] = useState(false)
    const [likedata , setLikedata] = useState([])
    const [isLoadingPost , setIsLaodingPost] = useState(true)
    const [isLoadingEmployee , setIsLaodingEmployee] = useState(true)
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const params = useParams()
    const navigate = useNavigate()
    const employeeId = params.id 
    const access_token = localStorage.getItem('access_token')
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    useEffect(() => {
        const instance = axios.create({
            baseURL:`${BASE_URL}/dashboard/employeeindivual/${employeeId}/`,
          })
          instance.get('')
          .then((response)=> {
            setData(response.data)
            setIsLaodingEmployee(false)
          })
          .catch((error) => {
            console.log(error);
          })
    },[BASE_URL , reducer])

      useEffect(() => {
        GetPost()
        GetLike()
      },[BASE_URL,employeeId , reducer])

    const GetPost = async (e) => {
      const response = await axios.get(`${BASE_URL}/post/listuser/${employeeId}/`)
      if(response.status === 200){
          setPost(response.data)
          setIsLaodingPost(false)
      }
  }

  const GetLike = async (e) => {
    const response = await axiosInstance.get('post/like/')
    if(response.status === 200){
        setLikedata(response.data)
        
    }
}

    const handleSubmit = () => {
      navigate('/chat',{state:{employeeId}})
    }

    const handleTrue = () => {
        setTab(true)
    }
    const handleFalse = () => {
        setTab(false)
    }
    if(isLoadingEmployee || isLoadingPost){
        return <Spinner />
    }

    const userDetailsJson = localStorage.getItem('userDetails')
    const user =JSON.parse(userDetailsJson)

    let currentuser 
    if(user){
        currentuser = user.id
    }

    const handleLike = async (e , id) => {
       let userId
        if(user){
            userId = user.id
        }else{
            toast.error("Plase Login")
            forceUpdate()
            return false
        }
        if(userId  && id){
            const response = await axiosInstance.post(`post/like/`,{
                    user:userId,
                    post:id
            })
            if(response.status === 201){
                toast.success('Successfully Liked!')
                forceUpdate()
            }
        }
    }

    const handleUnlike = async (e, postId) => {
        const response = await axiosInstance.delete(`post/unlike/${postId}/`)
        if(response.status === 200){
            toast.success('Successfully Unliked! ')
            forceUpdate()
        }
    }
    const handleAppoinment =  (e) => {
        e.preventDefault()
        if(user){
            let userId = user.id 
            // data = {
            //     employeeId:employeeId,
            //     userId:userId
            // }  
            console.log(userId);   
            navigate('/booking',{state:{employeeId:employeeId,userId:userId}})
        }else{
            toast.error('please login')
            return false
        }
    }
  return (
<Layouts >

    

         <div className="h-1200 w-1000 mx-auto ">
            <header className="h-64 w-full bg-cover" style={{backgroundImage: `url(${background})` }}></header>
            <main className="flex flex-col items-center justify-center h-150 w-150 rounded-full mx-auto relative top-[-90px] text-center border-10 border-white">
           

                <div class="flex items-center">
                    <svg class="w-8 h-8 ms-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-8 h-8 ms-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-8 h-8 ms-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-8 h-8 ms-3 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg class="w-8 h-8 ms-3 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                </div>

                <div className='flex items-center justify-center'>
                {data.images ? (
                    <img src={data.images} className="rounded-2xl shadow-lg h-full w-72"/>
                ):(
                    <img src="https://i.pravatar.cc/300?img=7" className="rounded-2xl shadow-lg h-full w-72"/>
                )}
                </div>
                

           

                <span className="font-bold"> {data.username} </span>
                <div class=" flex  flex-row gap-4 ">
            <button
            onClick={handleSubmit}
            >
                <svg
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                height="44"
                width="44"
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 hover:scale-125 duration-200 hover:stroke-custom-blue"
                fill="none"
                >
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M8 9h8"></path>
                <path d="M8 13h6"></path>
                <path
                    d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"
                ></path>
                </svg>
            </button>
            <span
                className="absolute -top-14 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                >Message <span> </span></span>
                <   img className=' w-7 h-9 hover:cursor-pointer' src={call} alt="" />
                </div>
                
                <button onClick={handleAppoinment} className="relative group cursor-pointer text-sky-50  overflow-hidden h-16 w-64 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold">

                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-40 h-40 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-900"></div>
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-32 h-32 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-800"></div>
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-24 h-24 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-700"></div>
                <div className="absolute top-3 right-20 group-hover:top-12 group-hover:-right-12 z-10 w-14 h-14 rounded-full group-hover:scale-150 group-hover:opacity-50 duration-500 bg-sky-600"></div>
                <p className="z-10">Appointment Booking</p>
                </button>
        </main>
  


        </div>

        <div className=''>
        <div class="max-w-2xl mx-auto">
    
    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px "  data-tabs-toggle="#myTabContent" role="tablist">
            <li className="mr-2 flex-1" role="presentation">
                <button onClick={handleFalse} className="inline-block  text-black hover:text-custom-blue hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-bold text-center border-transparent border-b-2 dark:text-black dark:hover:text-custom-blue" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">POST</button>
            </li>
            <li className="mr-2 flex-1" role="presentation">
                <button onClick={handleTrue} className="inline-block text-black hover:text-custom-blue hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-bold text-center border-transparent border-b-2 dark:text-black dark:hover:text-custom-blue active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">REVIEWS</button>
            </li>
           
        </ul>
    </div>
        </div>


        {tab === false ? (
                <>
                <div className="container mx-auto">
                <div className="flex flex-wrap -mx-4">
                {post.map((data , index ) => (
                <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
        
                <div className="p-3 px-6 min-h-48  ">
                <custom-card3>
                    <div className="rounded-md shadow-md sm:w-96 bg-coolGray-900 text-coolGray-100">
                    <div className="flex items-center justify-between p-3">
                        <div className="flex hover:cursor-pointer   items-center space-x-2">
                        <img
                            alt=""
                            
                            className="object-cover  object-center w-8 h-8 rounded-full shadow-sm bg-coolGray-500 border-coolGray-700"
                            src={data.employee.images}
                        
                        />
                        <div
                            className="-space-y-1"
                        
                        >
                            <h2
                            className="text-sm font-semibold leading-none"

                            >
                            {data.employee.username}
                            </h2>
                        </div>
                        </div>
                        <button
                        title="Open options"
                        type="button"
                        >
                        <svg
                            className="w-5 h-5 fill-current"
                        
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z" />
                            <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z" />
                            <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z" />
                        </svg>
                        </button>
                    </div>
                    <img
                        alt=""
                        className="object-cover object-center w-full h-72 bg-coolGray-500"
                        src={data.image}
                    
                    />
                    <div
                        className="p-3"
                    
                    >
                        <div
                        className="items-center justify-between"
                    
                        >
                        <div className="con-like">
                            <input 

                            className="like" type="checkbox" title="like"/>
                            <div 
                            
                            className="checkmark">
                                {likedata.some(post => post.post === data.id && post.user === currentuser) ? (
                                <>
                                    <button onClick={(e) => handleUnlike(e, data.id)} className="bg-white rounded">
                                    <FontAwesomeIcon 
                                            icon={faHeart} 
                                            className='text-red-600 ' 
                                            style={{ fontSize: '26px' }} 
                                        />
                                    </button>
                                    
                                </>

                                ):(
                                    <>
                                    <div onChange={(e) => handleLike(e , data.id)} title="Like" className="heart-container">
                                <input  id="Give-It-An-Id" className="checkbox" type="checkbox"/>
                                <div className="svg-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-outline" viewBox="0 0 24 24">
                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                        </path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-filled" viewBox="0 0 24 24">
                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                        </path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="svg-celebrate">
                                        <polygon points="10,10 20,20"></polygon>
                                        <polygon points="10,50 20,50"></polygon>
                                        <polygon points="20,80 30,70"></polygon>
                                        <polygon points="90,10 80,20"></polygon>
                                        <polygon points="90,50 80,50"></polygon>
                                        <polygon points="80,80 70,70"></polygon>
                                    </svg>
                                </div>
                            </div>

                            </>
                                )}
                                    
                            </div>
                            
                            </div>
                            <h1 className='  font-bold'> {data.likes_count} Likes </h1>
                        

                    
                        </div>
                                
                        <div
                        className="flex flex-wrap items-center pt-3 pb-1"
                    
                        >
                        
                        </div>
                        <div
                        className="space-y-3"
                    
                        >
                        <p className="  font-bold text-sm">
                            <span className="text-base font-semibold">
                            {data.captions}
                            </span>
                        
                        </p>

                        <p>{moment.utc(data.created_at).local().startOf('seconds').fromNow()}</p>
                        </div>
                    </div>
                    </div>
                </custom-card3>
                </div>
            </div>
        ))}
        
     </div>
     </div>

        <Toaster
                position="top-center"
                reverseOrder={false}
                />
                
                </>

        ):(
         <>
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        

        <div className="grid max-w-xl grid-cols-1 mx-auto mt-8 text-center lg:max-w-full sm:mt-12 lg:mt-20 lg:grid-cols-3 gap-x-6 xl:gap-x-12 gap-y-6">
            <div className="overflow-hidden bg-white rounded-md shadow">
                <div className="px-8 py-12">
                    <div className="relative w-24 h-24 mx-auto">
                        <img className="relative object-cover w-24 h-24 mx-auto rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-1.jpg" alt="" />
                        <div className="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <blockquote className="mt-7">
                        <p className="text-lg text-black">“Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat”</p>
                    </blockquote>
                    <p className="text-base font-semibold tex-tblack mt-9">Jenny Wilson</p>
                    <p className="mt-1 text-base text-gray-600">Project Manager at Microsoft</p>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md shadow">
                <div className="px-8 py-12">
                    <div className="relative w-24 h-24 mx-auto">
                        <img className="relative object-cover w-24 h-24 mx-auto rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-2.jpg" alt="" />
                        <div className="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <blockquote className="mt-7">
                        <p className="text-lg text-black">“Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat”</p>
                    </blockquote>
                    <p className="text-base font-semibold tex-tblack mt-9">Robert Fox</p>
                    <p className="mt-1 text-base text-gray-600">Founder at Brain.co</p>
                </div>
            </div>

            <div className="overflow-hidden bg-white rounded-md shadow">
                <div className="px-8 py-12">
                    <div className="relative w-24 h-24 mx-auto">
                        <img className="relative object-cover w-24 h-24 mx-auto rounded-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/testimonials/1/avatar-3.jpg" alt="" />
                        <div className="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                            <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <blockquote className="mt-7">
                        <p className="text-lg text-black">“Amet minim mollit non deserunt ullam co est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat”</p>
                    </blockquote>
                    <p className="text-base font-semibold tex-tblack mt-9">Kristin Watson</p>
                    <p className="mt-1 text-base text-gray-600">UX Designer at Google</p>
                </div>
            </div>
        </div>
    </div>

         </>
        )}
          
  
        </div>



</Layouts>
  )
}

export default Views
