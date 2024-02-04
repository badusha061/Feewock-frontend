import React,{useState , useReducer, useEffect} from 'react'
import Layouts from '../../layouts/Layouts'
import { useNavigate, useParams } from 'react-router-dom'
import background from './Images/background.jpg'
import axios from 'axios'
import OneOneChat from '../Chat/Employee-user/OneOneChat'


function Views() {
    const [data , setData] = useState([])
    const [post , setPost] = useState([])
    const [tab , setTab] = useState(false)
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
          })
          .catch((error) => {
            console.log(error);
          })
    },[BASE_URL , reducer])

      useEffect(() => {
        GetPost()
      },[BASE_URL,employeeId])

    const GetPost = async (e) => {
      const response = await axios.get(`${BASE_URL}/post/listuser/${employeeId}/`)
      if(response.status === 200){
          setPost(response.data)
          console.log(response.data);
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
                <div class="group relative flex inline-flex">
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
                >Message Or Call  <span> </span></span>
                <button className="flex justify-center items-center w-16 h-16 rounded-full bg-black hover:bg-custom-blue focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" viewBox="0 0 46 46" height="46" fill="none" class="svg-icon text-white">
                    <path stroke-width="2" stroke-linecap="round" stroke="#fff" fill-rule="evenodd" d="m14.5037 27.0715c.819-.634 1.7094-1.1699 2.653-1.597.7621-.3521 1.2557-1.1094 1.2699-1.9488-.0073-1.1346.7466-2.1517 1.8673-2.3279 1.7701-.2782 3.5728-.2785 5.3429-.0005 1.1206.1759 1.8744 1.193 1.8669 2.3274.0206.8307.5066 1.5791 1.257 1.9359.981.4173 1.9093.9489 2.7657 1.5838.8765.5876 2.0467.4715 2.791-.2769l2.2507-2.2507c.4294-.4283.6617-1.0157.6414-1.6219-.0308-.5985-.314-1.1559-.7793-1.5337-2.5842-2.0976-5.6309-3.5496-8.888-4.2357-2.9976-.6659-6.1047-.6655-9.1023.0009-3.2453.7041-6.2835 2.1503-8.87655 4.2253l-.12568.1256c-.38501.38-.60996.8929-.62872 1.4334-.02687.6011.20148 1.1854.62847 1.6092l2.25008 2.2501c.7307.7914 1.9343.9202 2.8162.3015z" clip-rule="evenodd"></path>
                </svg>
                </button>
                </div>
        
        </main>
        </div>

        <div className=''>
        <div class="max-w-2xl mx-auto">
    
    <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px "  data-tabs-toggle="#myTabContent" role="tablist">
            <li className="mr-2 flex-1" role="presentation">
                <button onClick={handleFalse} className="inline-block text-black hover:text-custom-blue hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-black dark:hover:text-custom-blue" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">POST</button>
            </li>
            <li className="mr-2 flex-1" role="presentation">
                <button onClick={handleTrue} className="inline-block text-black hover:text-custom-blue hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-black dark:hover:text-custom-blue active" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">REVIEWS</button>
            </li>
           
        </ul>
    </div>
        </div>


        {tab === false ? (
            <div className=' grid grid-cols-3  gap-4 '>

            {post.map((data , index ) => (
            <div className="container  mx-auto px-20">
    
            <div
            className="p-3 px-6 min-h-48 flex  items-center"
          
            >
            <custom-card3>
                <div className="rounded-md shadow-md sm:w-96 bg-coolGray-900 text-coolGray-100">
                <div
                    className="flex items-center justify-between p-3"
                
                >
                    <div
                    className="flex hover:cursor-pointer   items-center space-x-2"
                  
                    >
                    <img
                        alt=""
                        className="object-cover  object-center w-8 h-8 rounded-full shadow-sm bg-coolGray-500 border-coolGray-700"
                        src={data.employee.images}
                     
                    />
                    <div
                        className="-space-y-1"
                    
                    >
                        <h2
                        className="text-sm uppercase font-semibold leading-none"
                    
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
                    <div className="flex items-center space-x-3">
                        <button
                        className="flex items-center justify-center"
                        title="Like post"
                        type="button"
                        >
                        <svg
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z" />
                        </svg>
                        </button>
                        <button
                        className="flex items-center justify-center"
                        title="Add a comment"
                        type="button"
                        >
                        <svg
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z" />
                        </svg>
                        </button>
                        <button
                        className="flex items-center justify-center"
                        title="Share post"
                        type="button"
                        >
                        <svg
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z" />
                        </svg>
                        </button>
                    </div>
                    <button
                        className="flex items-center justify-center"
                        title="Bookmark post"
                        type="button"
                    >
                        <svg
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z" />
                        </svg>
                    </button>
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
      
          </div>
        ):(
         <>
         </>
        )}
          
  
        </div>



</Layouts>
  )
}

export default Views
