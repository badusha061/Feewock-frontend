import React, { useEffect , useReducer , useState} from 'react'
import Layouts from '../../layouts/Layouts'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
import LocationModal from './LocationModal'
import test from './Image/repair.png'
import { MdOutlineArrowForwardIos } from "react-icons/md";


function Service() {
    const [modalOpen, setModalOpen] = useState(false);
    const [data , setData] = useState({
      latitude:'',
      longitude:''
    })

    const naviagate= useNavigate()
    const [records , setRecords] = useState([])
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
  
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    useEffect(() => {
        const instance = axios.create({
            baseURL:`${BASE_URL}/service/userlist`
          })
          instance.get('')
          .then((response) => {
            setRecords(response.data)
          })
          .catch((error) => {
            console.log(error);
          })
    },[BASE_URL , reducer])

    const handleSubmit =(e,sub) => {
      if(data.latitude && data.longitude){
        naviagate(`/service/${sub.id}`,{state:{data}});
      }else{
        setModalOpen(true)
      }
    }

    useEffect(() => {
      setModalOpen(true)

     }, []);
     
     const handleCancel = () => {
      setModalOpen(false)
     }

     const handleConform = () => {
      navigator.geolocation.getCurrentPosition((position) => {
              setData((data) => ({
                ...data,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              }));
          })
      setModalOpen(false)
     }  
   
  return (
    <Layouts>
        

  <div className=' container mx-auto' >

    <div className=' flex space-x-1.5' >

    <div className=' rounded-lg flex items-center  cursor-pointer  hover:shadow-xl  justify-around bg-slate-200 h-[100px] w-1/4 ' >
    <div className=' flex justify-center  items-center  w-20 h-20 bg-custom-blue rounded-full ' >
        <img src={test} className='w-10' alt="" />
    </div>
        <div className=' ml-4' >
            <h3 className=' font-bold' > Electrification </h3>
            <p className=' text-custom-blue' >
              <span className='border-b border-custom-blue'>
               See employees 
              </span>
            </p>
        </div>
        <div className=' ml-4' >
          <MdOutlineArrowForwardIos />
        </div>
    </div>

    <div className=' flex items-center  cursor-pointer  hover:shadow-xl  justify-around bg-slate-200 h-[100px] w-1/4 ' >
    <div className=' flex justify-center  items-center  w-20 h-20 bg-custom-blue rounded-full ' >
        <img src={test} className='w-10' alt="" />
    </div>
        <div className=' ml-4' >
            <h3 className=' font-bold' > Electrification </h3>
            <p className=' text-custom-blue' >
              <span className='border-b border-custom-blue'>
               See employees 
              </span>
            </p>
        </div>
        <div className=' ml-4' >
          <MdOutlineArrowForwardIos />
        </div>
    </div>
    <div className=' flex items-center  cursor-pointer  hover:shadow-xl  justify-around bg-slate-200 h-[100px] w-1/4 ' >
    <div className=' flex justify-center  items-center  w-20 h-20 bg-custom-blue rounded-full ' >
        <img src={test} className='w-10' alt="" />
    </div>
        <div className=' ml-4' >
            <h3 className=' font-bold' > Electrification </h3>
            <p className=' text-custom-blue' >
              <span className='border-b border-custom-blue'>
               See employees 
              </span>
            </p>
        </div>
        <div className=' ml-4' >
          <MdOutlineArrowForwardIos />
        </div>
    </div>
    <div className=' flex items-center  cursor-pointer  hover:shadow-xl  justify-around bg-slate-200 h-[100px] w-1/4 ' >
    <div className=' flex justify-center  items-center  w-20 h-20 bg-custom-blue rounded-full ' >
        <img src={test} className='w-10' alt="" />
    </div>
        <div className=' ml-4' >
            <h3 className=' font-bold' > Electrification </h3>
            <p className=' text-custom-blue' >
              <span className='border-b border-custom-blue'>
               See employees 
              </span>
            </p>
        </div>
        <div className=' ml-4' >
          <MdOutlineArrowForwardIos />
        </div>
    </div>

</div>
</div>


{modalOpen && <LocationModal close={handleCancel} handleConform={handleConform} setOpenModal={setModalOpen} />}  



{records.map((data , index ) => 

<div className='ml-40 flex flex-col mb-8' key={index}>

<h1 className='font-bold text-lg mb-4' > {data.name} </h1>


<div className="flex justify-between">
  {data.subservice.map((sub , index) => 
    <div
    onClick={(e) => handleSubmit(e,sub)}
    key={index}
    className={`w-48 h-64 rounded-3xl hover:cursor-pointer hover:shadow-2xl transition-shadow duration-300 bg-white shadow-lg flex flex-col items-center justify-center mt-4 ${index % 5 !== 0 ? 'ml-4' : ''}`}
  >
    <img src={sub.Image} alt="" className="w-32 h-32" />
    <h1  className="mt-4 font-bold"> {sub.name} </h1>
  </div>
    
  )}

</div>
</div>


)}




    </Layouts>
  )
}

export default Service