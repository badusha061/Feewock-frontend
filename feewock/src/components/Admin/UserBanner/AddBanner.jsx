import React, { useEffect, useReducer, useState , useMemo } from 'react'
import useAxios from '../../../AxiosConfig/Axios';
import Swal from 'sweetalert2';



function AddBanner({close}) {
  const useAxiosInstance = useAxios();
  const[add , setAdd] = useState({
    titile:'',
    image:null
  })

  const[image , setImage] = useState({
    image:null
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!add.titile.trim()){
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
        title: 'Titile cannot be empty',
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
    
    const formData = new FormData();
    formData.append('image', add.image)
    formData.append('titile', add.titile)
    const config = {headers:{'Content-Type':'multipart/form-data'}}
    const response = await useAxiosInstance.post(`/banner/list`,formData, config)
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
          title: "Successfully Added Banner"
        });
        close()
    }
  }


  return (
    <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Add Banner
                </h3>
                <button
                  className="p-1 ml-auto bg-black border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={close}
                >
                  <span className="bg-black text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>

              <div className="relative p-6 flex-auto">

              <form>
                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    {image.image ? (
                      <img  className="h-16 w-16 object-cover rounded-full" src={image.image} alt="Current profile photo" />
                      ):null}
                  </div>
                  <label className="block">
                    <span className="sr-only  ">Choose profile photo</span>
                    <input type="file"  
                    onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                    const file = e.target.files[0];
                                    const url = URL.createObjectURL(file);
                                    setAdd((prevPost) => ({ ...prevPost, image: file }));
                                    setImage((prevPost) => ({ ...prevPost, image: url }));
                                }
                            }} 
                      className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-custom-blue
                      hover:file:bg-violet-100
                    "/>
                  </label>
                </div>
                <div className="mb-6 relative">
                <label htmlFor="input" className="block text-sm font-extrabold text-gray-700 mb-1"
                  >Enter Titile</label>
                <div className="relative">
                  <input
                  value={add.titile}
                    onChange={(e) => {
                      setAdd((prevPost) => ({ ...prevPost, titile: e.target.value }));
                    }}
                    type="text"
                    id="input"
                    name="input"
                    className="mt-1 p-4 border-2 border-custom-blue rounded-md focus:outline-none focus:border-custom-blue  w-full transition duration-300 ease-in-out placeholder-gray-500 bg-gray-100"
                    placeholder="Type in ..."
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2 19l-2 2m0 0l2-2m-2 2h16a2 2 0 002-2V5a2 2 0 00-2-2H2a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              </form>

              </div>


              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={close} 
                  >
                  Close
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-custom-blue text-white active:bg-custom-blue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black">

        </div>
      </>
  )
}

export default AddBanner
