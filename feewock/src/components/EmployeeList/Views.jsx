import React, { useState, useReducer, useEffect } from 'react'
import Layouts from '../../layouts/Layouts'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../../utils/Spinner'
import moment from 'moment';
import { toast } from 'react-hot-toast';
import useAxios from '../../AxiosConfig/Axios';
import { MdAddIcCall } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { MdPreview } from "react-icons/md";
import { FcLike } from "react-icons/fc";



function Views() {
    const axiosInstance = useAxios()
    const [activeTab, setActiveTab] = useState('post')
    const [data, setData] = useState([])
    const [post, setPost] = useState([])
    const [tab, setTab] = useState(false)
    const [reviews, setReviews] = useState([])
    const [likedata, setLikedata] = useState([])
    const [isLoadingPost, setIsLaodingPost] = useState(true)
    const [isLoadingEmployee, setIsLaodingEmployee] = useState(true)
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0)
    const params = useParams()
    const navigate = useNavigate()
    const employeeId = params.id
    const access_token = localStorage.getItem('access_token')
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    useEffect(() => {
        const instance = axios.create({
            baseURL: `${BASE_URL}/dashboard/employeeindivual/${employeeId}/`,
        })
        instance.get('')
            .then((response) => {
                setData(response.data)
                setIsLaodingEmployee(false)
            })
            .catch((error) => {
                toast.error(error)
            })
    }, [BASE_URL, reducer])

    useEffect(() => {
        GetPost()
        GetLike()
        GetReviews()
    }, [BASE_URL, employeeId, reducer])

    const GetPost = async (e) => {
        const response = await axios.get(`${BASE_URL}/post/listuser/${employeeId}/`)
        if (response.status === 200) {
            setPost(response.data)
            setIsLaodingPost(false)
        }
    }

    const GetReviews = async (e) => {
        const response = await axios.get(`${BASE_URL}/reviews/list/${employeeId}/`)
        if (response.status === 200) {
            setReviews(response.data)
        }
    }

    const GetLike = async (e) => {
        const response = await axiosInstance.get('post/like/')
        if (response.status === 200) {
            setLikedata(response.data)

        }
    }

    const handleSubmit = () => {
        navigate('/chat', { state: { employeeId } })
    }

    if (isLoadingEmployee || isLoadingPost) {
        return <Spinner />
    }

    const userDetailsJson = localStorage.getItem('userDetails')
    const user = JSON.parse(userDetailsJson)

    let currentuser
    if (user) {
        currentuser = user.id
    }


    const handleAppoinment = (e) => {
        e.preventDefault()
        if (user) {
            let userId = user.id
            navigate('/booking', { state: { employeeId: employeeId, userId: userId } })
        } else {
            toast.error('please login')
            return false
        }
    }

    const handleCall = () => {
        if (user) {
            let userId = user.id
            navigate('/call', { state: { employeeId: employeeId, userId: userId } })
        } else {
            toast.error('please login')
            return false
        }
    }

    const handleTab = (tab) => {
        setActiveTab(tab)
    }

    return (
        <>
            <Layouts>
                <div className=' container ' >

                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white  shadow-lg  rounded-2xl p-6">
                                <div className="flex flex-col items-center">
                                    {data.images ? (
                                        <img src={data.images} className=" w-48 h-48 object-cover bg-gray-300 rounded-full mb-4 shrink-0">
                                        </img>
                                    ): (
                                        <img src="https://iau.edu.lc/wp-content/uploads/2016/09/dummy-image.jpg" className=" w-48 h-48 object-cover bg-gray-300 rounded-full mb-4 shrink-0">
                                        </img>
                                    )}
                                </div>
                                <h1 className=' uppercase' > {data.username} </h1>
                                <div className=' flex' >
                                    <FaRegStar />
                                    <FaRegStar />
                                    <FaRegStar />
                                    <FaRegStar />
                                    <FaRegStar />

                                </div>
                                <div className=' flex gap-4 mt-4 hover:shadow-2xl ' >
                                    <div onClick={handleCall} className=' flex items-center cursor-pointer  justify-center  w-24 h-12 rounded-md bg-custom-blue' >
                                        <MdAddIcCall className="fill-current text-white" size={30} />
                                    </div>
                                    <div onClick={handleSubmit} className=' flex items-center  cursor-pointer justify-center w-24 h-12 rounded-md bg-custom-blue' >
                                        <AiOutlineMessage className="fill-current text-white" size={30} />
                                    </div>
                                </div>
                                <div className=' flex  mt-4 ' >
                                    <button
                                        onClick={handleAppoinment}
                                        className="hover:shadow-form w-full flex  gap-3 items-center  pb-5 rounded-md bg-custom-blue py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                        <FaAddressBook size={25} />
                                        Book Now
                                    </button>
                                </div>
                            </div>



                        </div>

                        <div className="col-span-8 sm:col-span-8">
                            <div className=' h-10 bg-white shadow-lg  flex rounded-sm' >
                                <div onClick={() => handleTab('post')} className={` flex items-center gap-2 cursor-pointer justify-center w-1/2 uppercase ${activeTab === 'post' ? 'bg-custom-blue text-white ' : ' text-black '} `} >
                                    <BsFileEarmarkPostFill />
                                    post
                                </div>
                                <div onClick={() => handleTab('reviews')} className={` cursor-pointer flex  gap-2 items-center justify-center w-1/2 uppercase ${activeTab === 'reviews' ? 'bg-custom-blue text-white' : 'text-black'} `}  >
                                    <MdPreview />
                                    reviews
                                </div>
                            </div>



                            {activeTab === 'post' ? (
                                <>
                                {post.length > 0 ? (

                                    <div className=" grid grid-cols-2 gap-6  p-3 min-h-48 ">

                                        {post.map((data, index) => (
                                            
                                            <custom-card3 >
                                                
                                                <div className='relative hover:cursor-pointer' >

                                                    <img
                                                        alt=""
                                                        className="object-cover object-center w-full h-72"
                                                        src={data.image}
                                                        
                                                        />
                                                    <div className='absolute  hover:flex hover:items-center hover:gap-4  opacity-0 hover:opacity-100 hover:top-28 left-32    hover:font-bold hover:cursor-pointer'  >
                                                        <FcLike  style={30} />
                                                        <h1 className='uppercase  text-white ' > {data.likes_count} likes </h1>
                                                    </div>
                                                </div>
                                            </custom-card3>
                                        ))}
                                    </div>
                                ):(
                                    <h1 className=' uppercase' >
                                        no post
                                    </h1>
                                )}

                                </>
                            ) : (
                                <>
                                    {reviews.length > 0 ? (
                                        <div className=" grid grid-cols-2 gap-6  p-3 px-6 min-h-48 ">

                                            {reviews.map((data, index) => (

                                                <div key={index} className="overflow-hidden bg-white rounded-md shadow">
                                                    <div className="px-8 py-12">
                                                        <div className="relative w-24 h-24 mx-auto">
                                                            {data.user.images ? (
                                                                <img src={`${BASE_URL}${data.user.images}`} className="relative object-cover w-24 h-24 mx-auto rounded-full" alt="alt" />
                                                            ) : (
                                                                <img src="https://iau.edu.lc/wp-content/uploads/2016/09/dummy-image.jpg" className="relative object-cover w-24 h-24 mx-auto rounded-full" alt="alt" />
                                                            )}

                                                            <div className="absolute top-0 right-0 flex items-center justify-center bg-blue-600 rounded-full w-7 h-7">
                                                                <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path
                                                                        d="M20.309 17.708C22.196 15.66 22.006 13.03 22 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292zm-11.007 0C11.19 15.66 10.999 13.03 10.993 13V5a1 1 0 0 0-1-1h-6c-1.103 0-2 .897-2 2v7a1 1 0 0 0 1 1h3.078a2.89 2.89 0 0 1-.429 1.396c-.508.801-1.465 1.348-2.846 1.624l-.803.16V20h1c2.783 0 4.906-.771 6.309-2.292z"
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <blockquote className="mt-7">
                                                            <p className="text-lg uppercase font-bold text-black">“{data.content}”</p>
                                                        </blockquote>
                                                        <p className="text-base capitalize font-semibold tex-tblack mt-9"> {data.user.first_name} {data.user.last_name} </p>
                                                        <p className="mt-1 text-base capitalize text-gray-600"> {data.user.location} </p>
                                                        <p className="mt-1 text-base  text-gray-600"> {moment.utc(data.created_at).local().startOf('seconds').fromNow()} </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    ) : (
                                        <h1>
                                            NO REVIEWS
                                        </h1>
                                    )}
                                </>

                            )}



                        </div>



                    </div>
                </div>



            </Layouts>
        </>


    )
}

export default Views
