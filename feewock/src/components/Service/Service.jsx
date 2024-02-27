import React, { useEffect , useReducer , useState} from 'react'
import Layouts from '../../layouts/Layouts'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
import LocationModal from './LocationModal'
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
        




{modalOpen && <LocationModal close={handleCancel} handleConform={handleConform} setOpenModal={setModalOpen} />}  



{records.map((data , index ) => 

<div className=' container mx-auto ml-40 flex flex-col mb-8' key={index}>

<h1 className=' uppercase sm:font-bold' > {data.name} </h1>

<div className=' m-4 gap-4 grid sm:grid-cols-4' >
{data.subservice.map((sub , index) => (

<div onClick={(e) => handleSubmit(e, sub)} className=' rounded-xl flex items-center  cursor-pointer  hover:shadow-xl  justify-around bg-slate-200 h-[100px] ' >
<div className=' flex justify-center  items-center  w-20 h-20 bg-white rounded-full ' >
    <img src={sub.Image} className='w-10 object-cover  ' alt="" />
</div>
    <div className=' ml-4' >
        <h3 className=' capitalize font-extrabold' >  {sub.name}</h3>
        <p className=' text-custom-blue text-base ' >
          <span className='border-b text-base  border-custom-blue'>
           See employees 
          </span>
        </p>
    </div>
    <div className=' ml-4' >
      <MdOutlineArrowForwardIos />
    </div>
</div>
))}

</div>

</div>


)}




    </Layouts>
  )
}

export default Service