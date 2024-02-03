import axios from 'axios';
import React, { useEffect , useState , useReducer } from 'react'
import Swal from 'sweetalert2'; 
import SubService from './SubService'
import useAxios from '../../../AxiosConfig/Axios';

function  AddSubService({open , onClose}) {
   const useAxiosInstance = useAxios();
   
    if(!open) return null

    const [add , setAdd] = useState({
        name:'',
        mainservice:'',
        image:null,
    })

    const [data , setData] = useState([]);
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    const [render , setRender] = useState(0)

    useEffect(() => {   
      const fetchData = async () => {
        try {
          const response = await useAxiosInstance.get(`/service/createmainservice`);
          setData(response.data)
      } catch (error) {
          console.error('Error while sending data to the backend:', error);
      }
      }
      fetchData();
  },[BASE_URL])
  
 

    const handleChange = async (e) => {
        e.preventDefault();
        if(!add.name.trim()){
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
            title: 'Service Name is Cannot be Empty',
          });
          return false
        }

        if(!add.mainservice.trim()){
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
            title: 'Main service is Compulsary',
          });
          return false
        }
        if(add.image === null){
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
            title: 'Image cannot be empty',
          });
          return false
        }
        const config = {headers:{'Content-Type':'multipart/form-data'}}
        const formData = new FormData();  
        formData.append("name",add.name)
        formData.append("Image",add.image)
        formData.append("mainservice", String(parseInt(add.mainservice, 10)));
        console.log(formData);
        try {
        const response = await useAxiosInstance.post(`/service/createsubservice`, formData,config);
        console.log(response.status);
        if(response.status === 201){
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Added Service"
          });

          setRender(render+1)
          onClose()
          
        }
        
        } catch (error) {
          if(error.message === "Request failed with status code 400"){
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
              title: 'Service Name is Already taken',
            });
            return false
          }
        console.log('the error',error);
        }
    };
  
 
  return (
        
          <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    ADD SERVICE
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                <div className="input-container">
                  <input 
                  value={add.name}
                  onChange={(e) => setAdd({...add, name:e.target.value})}
                  placeholder="Service Name"   type="text" />
                </div>
                  <br />
                <div className='input-container'>

                <div className="relative group rounded-lg w-64 bg-gray-50 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg before:[box-shadow:-60px_20px_10px_10px_#F9B0B9]">
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
          <option value="" disabled>Select Main Service</option>
            {data.map((data, index) => (
              <option  key={index} value={data.id}  >{data.name}</option>
              ))}

            </select>
            </div>
          </div>
          <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
            <input
            onChange={(e) => setAdd({...add, image:e.target.files[0] })}
            accept="image/*" 
            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" aria-describedby="file_input_help" id="image" type="file"/>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
          </div>
          </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                  onClick={onClose}
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleChange}
                    className="bg-custom-voilate text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          {render > 0 && <SubService render={render} />}

        </>


  )
}

export default AddSubService