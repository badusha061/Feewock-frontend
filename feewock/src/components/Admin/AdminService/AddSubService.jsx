import axios from 'axios';
import React, { useEffect , useState , useReducer } from 'react'

function AddSubService({open}) {
   
    if(!open) return null
    const [add , setAdd] = useState({
        name:'',
        mainservice:'',
        image:null,
    })

    const [data , setData] = useState([]);
    const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  
    useEffect(() => {   
      const fetchData = async () => {
          try{
              const instance  =  axios.create({
                  baseURL:`${BASE_URL}/service/createmainservice`
                 })
                 instance.get('')
                 .then((response) => {
                  setData(response.data)
                 })
                 .catch((error) => {
                  console.log(error);
                 })
          }catch(error){
              console.log('the error is the ',error);
          }
      }
      fetchData();
  },[BASE_URL,reducer])
  
 

    const handleChange = async (e) => {
        e.preventDefault();
    
        console.log('add image', add.image);
        console.log('add name', add.name);
        console.log('add mainservice', add.mainservice);
    
        const formData = new FormData();

        console.log('Before appending any data:', formData);
        
        formData.append('image', add.image);
        console.log('After appending image:', formData);
        
        formData.append('mainservice', add.mainservice);
        console.log('After appending mainservice:', formData);
        
        formData.append('name', add.name);
        console.log('After appending name:', formData);
        
        console.log('Final FormData:', formData);
        

    
        try {
        const response = await axios.post(`${BASE_URL}/service/subservice`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
    
        console.log(response.data);
        } catch (error) {
        console.error('Error while sending data to the backend:', error);
        }
    };
  
 
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        
  <div
    className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10"
  >
    <div className=' flex items-center justify-center '>
             <h1  className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black" > ADD SERVICE </h1>
    </div>
    <div className="max-w-md mx-auto">
      <div className="flex items-center space-x-5 justify-center">
      
      </div>
      <div className="mt-5">
        <label
          className="font-semibold text-sm text-gray-600 pb-1 block"
          htmlFor="name"
          >Service Name</label>
        <input
            value={add.name}
            onChange={(e) => setAdd({...add, name:e.target.value})}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          type="text"
          id="name"
        />
      </div> 
    <div className='mt-5'>

    <div
            className="relative group rounded-lg w-64 bg-gray-50 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]"
            >
            <svg
                y="0"
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                width="100"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                height="100"
                className="w-8 h-8 absolute right-0 -rotate-45 stroke-pink-300 top-1.5 group-hover:rotate-0 duration-300"
            >
                <path
                stroke-width="4"
                stroke-linejoin="round"
                stroke-linecap="round"
                fill="none"
                d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
                className="svg-stroke-primary"
                ></path>
            </svg>
            <select value={add.mainservice} onChange={(e) => setAdd({...add, mainservice:e.target.value})} className="appearance-none hover:placeholder-shown:bg-emerald-500 relative text-black bg-transparent ring-0 outline-none border border-neutral-500  placeholder-violet-700 text-sm font-bold rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5">
            {data.map((data, index) => (
                <option  key={index} value={data.id}  >{data.name}</option>
                ))}

            </select>


            </div>

    </div>
    <div className='mt-5'>
        
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
            <input
            onChange={(e) => setAdd({...add, image:e.target.files[0] })}
            accept="image/*" 
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" aria-describedby="file_input_help" id="image" type="file"/>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
    </div>
  
      <div className="mt-5">
        <button
        onClick={handleChange}
          className="py-2 px-4 bg-custom-voilate hover:bg-custom-voilate focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="submit"
        >
          Add Service
        </button>
      </div>
   
    </div>
  </div>
</div>


  )
}

export default AddSubService