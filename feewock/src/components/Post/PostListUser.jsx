import React, { useEffect, useState , useReducer } from 'react'
import Layouts from '../../layouts/Layouts'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxios from '../../AxiosConfig/Axios';
import './PostListUser.css'

function PostListUser() {
    const axiosInstance = useAxios()
    const navigate = useNavigate()
    const [post , setPost] = useState([])
    const [like , setLike] = useState({
        user:'',
        post:''
    })
    const [likelength , setLikeLength] = useState('')
    const [likedata , setLikedata] = useState([])
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    useEffect(() => {
        GetPost()
        GetLike()
    },[BASE_URL])
    const GetLike = async (e) => {
        const response = await axiosInstance.get('post/like/')
        if(response.status === 200){
            setLikedata(response.data)
            setLikeLength(response.data.length)
        }
    }
    const GetPost = async (e) => {
        const response = await axios.get(`${BASE_URL}/post/list`)
        if(response.status === 200){
            setPost(response.data)
        }
    }

    const handleClick = async (e,id) => {
        e.preventDefault()
        navigate(`/views/${id}`)
    }

    const userDetailsJson = localStorage.getItem('userDetails')
    const user =JSON.parse(userDetailsJson)

    const handleLike = async(e, id) => {
        e.preventDefault()
        console.log(id);
        // let userId
        // if(user){
        //     userId = user.id
        //     console.log('user id is the ',userId);
        //     setLike(prevState => ({
        //         ...prevState,
        //         user: userId,
        //         post: id,
        //       }));
        // }else{
        //     const Toast = Swal.mixin({
        //         toast: true,
        //         position: 'top-end',
        //         showConfirmButton: false,
        //         timer: 3000,
        //         timerProgressBar: true,
        //         didOpen: (toast) => {
        //           toast.onmouseenter = Swal.stopTimer;
        //           toast.onmouseleave = Swal.resumeTimer;
        //         },
                
        //       });
              
        //       Toast.fire({
        //         icon: 'error',
        //         title: 'Please Login',
        //       });
        // }
        // if(userId  && id){
        //     console.log(like);
        //     const response = await axiosInstance.post('post/like',like)
        //     if(response.status === 201){
        //         console.log('success');
        //     }
        // }
    }

    const handleUnLike = async (e , id) => {
        e.preventDefault()
        console.log(id);
       let userId
        if(user){
            userId = user.id
            console.log('user id is the ',userId);
            setLike(prevState => ({
                ...prevState,
                user: userId,
                post: id,
              }));
        }else{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
                
              });
              
              Toast.fire({
                icon: 'error',
                title: 'Please Login',
              });
        }
        if(userId  && id){
            console.log(like);
            const response = await axiosInstance.post('post/like',like)
            if(response.status === 201){
                console.log('success');
            }
        }
    }
  return (
    <Layouts>

    {post.map((data , index ) => (
            <div key={index} className="container  mx-auto px-20">
    
            <div className="p-3 px-6 min-h-48 flex justify-center items-center">
            <custom-card3>
                <div className="rounded-md shadow-md sm:w-96 bg-coolGray-900 text-coolGray-100">
                <div className="flex items-center justify-between p-3">
                    <div className="flex hover:cursor-pointer   items-center space-x-2">
                    <img
                        alt=""
                        onClick={(e) => handleClick(e , data.employee.id)}
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
                    className="flex items-center justify-between"
                   
                    >
                    <div className="con-like">
                        <input 
                                onClick={(e) => handleLike(e ,data.id)}

                        className="like" type="checkbox" title="like"/>
                        <div 
                        
                        className="checkmark">
                            {likedata.some(post => post.post === data.id) ? (
                              <>
                                <h1> Liked post </h1>
                              </>

                            ):(
                                <>
                                <div onChange={(e) => handleUnLike(e , data.id)} title="Like" class="heart-container">
                            <input  id="Give-It-An-Id" class="checkbox" type="checkbox"/>
                            <div class="svg-container">
                                <svg xmlns="http://www.w3.org/2000/svg" class="svg-outline" viewBox="0 0 24 24">
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                    </path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" class="svg-filled" viewBox="0 0 24 24">
                                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                    </path>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" class="svg-celebrate">
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

                   
                   
                    </div>
                    <div
                    className="flex flex-wrap items-center pt-3 pb-1"
                   
                    >
                    
                    </div>
                    <div
                    className="space-y-3"
                  
                    >
                    <p
                        className="text-sm"
                      
                    >
                        <span className="text-base font-semibold">
                        {data.captions}
                        </span>
                    
                    </p>
                    </div>
                </div>
                </div>
            </custom-card3>
            </div>
        </div>
    ))}
    


  

    </Layouts>
  )
}

export default PostListUser
