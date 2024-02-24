import React, { useEffect, useState, useReducer, useRef } from 'react'
import Layouts from '../../layouts/Layouts'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../AxiosConfig/Axios';
import './PostListUser.css'
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../utils/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';
import Reached from './Reached';

import { FcLike } from "react-icons/fc";




function PostListUser() {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const axiosInstance = useAxios()
    const navigate = useNavigate()
    const [post, setPost] = useState([])
    const [page, setPage] = useState(1)
    const [likedata, setLikedata] = useState([])
    const [isLoading, setIsloading] = useState(true)

    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const [hasMore, setHasMore] = useState(true);
    useEffect(() => {
        GetPost()
        GetLike()
    }, [ignored, BASE_URL])
    const GetLike = async (e) => {
        const response = await axiosInstance.get('post/like/')
        if (response.status === 200) {
            setLikedata(response.data)
        }
    }
    const GetPost = async (e) => {
        const response = await axios.get(`${BASE_URL}/post/list/`)
        console.log(response.data, '!!!!!!!!!!!!!!!1');
        if (response.status === 200) {
            // setPost(prvsData => [...prvsData, ...response.data])
            setPost(response.data)
            setIsloading(false)
            setHasMore(response.data.next !== null);

        }
    }
    if (isLoading) {
        return <Spinner />
    }

    const handleClick = async (e, id) => {
        e.preventDefault()
        navigate(`/views/${id}`)
    }

    const userDetailsJson = localStorage.getItem('userDetails')
    const user = JSON.parse(userDetailsJson)

    let currentuser
    if (user) {
        currentuser = user.id
    }

    const handleLike = async (e, id) => {
        let userId
        if (user) {
            userId = user.id
        } else {
            toast.error("Plase Login")
            forceUpdate()
            return false
        }
        if (userId && id) {
            const response = await axiosInstance.post(`post/like/`, {
                user: userId,
                post: id
            })
            if (response.status === 201) {
                toast.success('Successfully Liked!')
                forceUpdate()
                return true
            }
        }
    }

    const handleUnlike = async (e, postId) => {
        console.log('clicked');
        const response = await axiosInstance.delete(`post/unlike/${postId}/`)
        if (response.status === 200) {
            toast.success('Successfully Unliked! ')
            forceUpdate()
            return true
        }
    }


    return (
        <Layouts>

            {/* <InfiniteScroll
        dataLength={post.length}
        next={GetPost}
        hasMore={hasMore} 
        loader={<Loading />}
        endMessage={<Reached />}
        > */}

            <>

                {post.map((data, index) => (
                    <div key={index} className="container  mx-auto px-20">

                        <div className="p-3 px-6 min-h-48 flex justify-center items-center">
                            <custom-card3>
                                <div className="rounded-md shadow-md sm:w-96 bg-coolGray-900 text-coolGray-100">
                                    <div className="flex items-center justify-between p-3">
                                        <div className="flex hover:cursor-pointer   items-center space-x-2">
                                            <img
                                                alt=""
                                                onClick={(e) => handleClick(e, data.employee.id)}
                                                className="object-cover  object-center w-8 h-8 rounded-full shadow-sm bg-coolGray-500 border-coolGray-700"
                                                src={data.employee.images}

                                            />
                                            <div
                                                className="-space-y-1"

                                            >
                                                <h2
                                                    className="text-sm capitalize font-semibold leading-none"

                                                >
                                                    {data.employee.username}
                                                </h2>
                                                <p> Ac service  , Plumber </p>
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

                                                <div

                                                    className="checkmark">
                                                    {likedata.some(post => post.post === data.id && post.user === currentuser) ? (
                                                        <button onClick={(e) => handleUnlike(e, data.id)}>
                                                            <FcLike size={35} style={{ cursor: 'pointer' }} />
                                                        </button>
                                                   

                                                    ) : (
                                                        <>


                                                <div onChange={(e) => handleLike(e, data.id)} className="heart-container" title="Like">
                                                            <input type="checkbox" className="checkbox" id="Give-It-An-Id"/>
                                                            <div className="svg-container">
                                                                <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                                                    </path>
                                                                </svg>
                                                                <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                                                    </path>
                                                                </svg>
                                                                <svg className="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
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

            </>


            {/* </InfiniteScroll> */}



            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </Layouts>
    )
}

export default PostListUser
