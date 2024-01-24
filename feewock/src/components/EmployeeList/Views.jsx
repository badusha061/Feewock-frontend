import React,{useState , useReducer, useEffect} from 'react'
import Layouts from '../../layouts/Layouts'
import { useParams } from 'react-router-dom'
import background from './Images/background.jpg'
import axios from 'axios'

function Views() {
    const [data , setData] = useState([])
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const params = useParams()
    const employeeId = params.id 
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    useEffect(() => {
        const instance = axios.create({
            baseURL:`${BASE_URL}/dashboard/employeeindivual/${employeeId}/`,
            //   headers: {
            //     'Authorization': `Bearer ${access_token}`,
            //     'Content-Type': 'application/json',  
            // },
          })
          instance.get('')
          .then((response)=> {
            console.log(response.data);
            setData(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
    },[BASE_URL , reducer])

  return (
<Layouts >

    

         <div className="h-1200 w-1000 mx-auto ">
            <header className="h-64 w-full bg-cover" style={{backgroundImage: `url(${background})` }}></header>
            <main className="flex flex-col items-center justify-center h-150 w-150 rounded-full mx-auto relative top-[-90px] text-center border-10 border-white">
                <div className='flex items-center justify-center'>
                {data.images ? (
                    <img src={data.images} className="rounded-2xl shadow-lg h-full w-72"/>
                ):(
                    <img src="https://i.pravatar.cc/300?img=7" className="rounded-2xl shadow-lg h-full w-72"/>
                )}
                </div>
                <div className="mt-4 text-black text-xl tracking-[2px]">
                ★★★★★
                </div>
                <span className="font-bold"> {data.username} </span>
                <div class="group relative flex inline-flex">
            <button>
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

        <div className='flex justify-center'>
            <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black">{data.username} Activity</h2>
        </div>



</Layouts>
  )
}

export default Views
