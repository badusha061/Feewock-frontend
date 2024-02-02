import React, { useState } from 'react'
import  Modal from 'react-modal'
import './EditMainService.css';
import AdminLayouts from '../../../layouts/AdminLayouts';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxios from '../../../AxiosConfig/Axios';



function EditMainService({open , onClose , selectdata}) {
    const [data , setData] = useState({
        name:''
    })
    const useAxiosInstance = useAxios();
    if(!open) return null

        const handleChange = (e) => {
            setData((prevAdd) =>({
                ...prevAdd,
                name:e.target.value
            }))
        }

        const handleSubmit = () => {
            if(!data.name.trim()){
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
                title: 'Main Service Name is Cannot be Empty',
              });
              return false
            }
            try{

                   const response = useAxiosInstance.put(`/service/updatemainservice/${selectdata}/`,data)
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
                        title: "Successfully Edited Position"
                      });
                      onClose()
                    }
                    
                    
            }catch(error){
              console.log(error.response.data.name[0]);
              if(error.response.data.name[0] === 'main service with this name already exists.'){
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
                  title: 'Main Service Name is Already taken',
                });
                return false
          }
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
                    EDIT MAIN SERVICE
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
        <input required="" placeholder="Postion Name"  onChange={handleChange} type="text" />
       
        
        </div>

                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                  onClick={handleSubmit}
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
        </>
   
  )
}

export default EditMainService