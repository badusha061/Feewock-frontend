import React, { useEffect, useReducer, useState } from 'react'
import Layouts from '../../layouts/Layouts'
import { useParams } from 'react-router-dom'
import useAxios from '../../AxiosConfig/Axios'
import Swal from 'sweetalert2';
import EditProfileUser from './EditProfileUser.jsx'
import { useLocation, useNavigate } from 'react-router-dom'
import Spinner from '../../utils/Spinner.jsx'
import { FaRegUserCircle } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";



function UserProfile() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('userprofile')
    const [data, setData] = useState([])
    const [isLoading, setIsLaoding] = useState(true)
    const params = useParams()
    const UserId = params.id
    const axiosInstance = useAxios()
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0)
    let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    useEffect(() => {
        GetUserData()
    }, [BASE_URL, reducer])

    const GetUserData = async () => {
        const response = await axiosInstance.get(`${BASE_URL}/api/userindivual/${UserId}/`)
        if (response.status === 200) {
            setData(response.data)
            setIsLaoding(false)
        } else {
            console.log(response);
        }
    }
    const handleButton = () => {
        document.getElementById('ImageInput').click();
    }

    const handleImage = async (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        console.log('firls is the', file);
        if (file) {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } }
            const formData = new FormData();

            formData.append('images', file)
            const response = await axiosInstance.put(`${BASE_URL}/api/userimages/${UserId}/`, formData, config);
            if (response.status === 200) {
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
                    title: "Successfully Updated Image"
                });
                forceUpdate()
            } else {
                console.log('something error ');
            }
        } else {
            console.log('not');
        }
    }

    const [modal, setModal] = useState(false)
    const handleModal = () => {
        setModal(true)
    }
    const handleClose = () => {
        setModal(false)
        forceUpdate()
    }
    if (isLoading) {
        return <Spinner />
    }

    const handleTab = (tab) => {
        if (tab === 'booking') {
            setActiveTab(tab)
            navigate('/bookinglist', { state: UserId })
        } else {
            setActiveTab(tab)
        }
    }

    return (
        <Layouts>
            <div className=' container max-auto  ' >
                <div className="col-span-8 sm:col-span-8">
                    <div className=' h-10 bg-white shadow-lg  w-[65%] flex mx-auto' >
                        <div onClick={() => handleTab('userprofile')} className={` flex  rounded-xl items-center gap-2 cursor-pointer justify-center w-1/2 uppercase ${activeTab === 'userprofile' ? 'bg-custom-blue text-white ' : ' text-black '} `} >
                            <FaRegUserCircle />
                            My Profile
                        </div>
                        <div onClick={() => handleTab('booking')} className={` cursor-pointer flex rounded-xl  gap-2 items-center justify-center w-1/2 uppercase ${activeTab === 'booking' ? 'bg-custom-blue text-white' : 'text-black'} `}  >
                            <FaAddressBook />
                            my booking
                        </div>
                    </div>
                </div>
            </div>

            {activeTab === 'userprofile' ? (
                <>
                    <div className=' justify-center items-center' >
                        <div className=' mt-4 flex justify-center' >
                            <h1 className=' font-bold uppercase text-2xl' > profile </h1>
                        </div>
                        <div className="flex flex-col mt-4 items-center">
                            {data.images ? (
                                <img src={data.images} className=" w-48 h-48 object-cover bg-gray-300 rounded-full mb-4 shrink-0">
                                </img>
                            ) : (
                                <img src="https://iau.edu.lc/wp-content/uploads/2016/09/dummy-image.jpg" className=" w-48 h-48 object-cover bg-gray-300 rounded-full mb-4 shrink-0">
                                </img>
                            )}
                            <input type="file" accept='image/*' onChange={handleImage} style={{ display: 'none' }} id='ImageInput' />
                            <span onClick={handleButton} className=' text-custom-blue uppercase  underline cursor-pointer' > change icon </span>
                        </div>

                    </div>

                    {modal && (
                        <div className="fixed inset-0 z-50 overflow-auto">
                            <EditProfileUser close={handleClose} UserId={UserId} />
                        </div>
                    )}

                    <div className=' mt-6 flex justify-center items-center ' >
                        <div className=' mx-auto w-[40%]   ' >
                        <section className="mb-2 border p-4  rounded-lg  bg-neutral-100">
                            <div className="mx-auto">
                                <div className="card md:flex max-w-lg">
                                    <div className="flex-grow text-center md:text-left">
                                        <p className="font-bold">First Name</p>
                                        <p className="mt-2 mb-3"> {data.first_name} </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mb-2 border p-4 rounded-lg  bg-neutral-100">
                            <div className="mx-auto">
                                <div className="card md:flex max-w-lg">
                                    <div className="flex-grow text-center md:text-left">
                                        <p className="font-bold">Last Name</p>
                                        <p className="mt-2 mb-3"> {data.last_name} </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mb-2 border p-4 rounded-lg  bg-neutral-100">
                            <div className="mx-auto">
                                <div className="card md:flex max-w-lg">
                                    <div className="flex-grow text-center md:text-left">
                                        <p className="font-bold">Email</p>
                                        <p className="mt-2 mb-3">{data.email}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="mb-2 border p-4 rounded-lg  bg-neutral-100">
                            <div className="mx-auto">
                                <div className="card md:flex max-w-lg">
                                    <div className="flex-grow text-center md:text-left">
                                        <p className="font-bold">Phone Number</p>
                                        <p className="mt-2 mb-3"> {data.phone_number} </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-2 border  p-4 rounded-lg  bg-neutral-100">
                            <div className="mx-auto">
                                <div className="card md:flex max-w-lg">
                                    <div className="flex-grow text-center md:text-left">
                                        <p className="font-bold">Location</p>
                                        <p className="mt-2 mb-3"> {data.location} </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className=' flex justify-center items-center mt-4 ' >
                            <button
                                onClick={handleModal}
                                className="hover:shadow-form flex  uppercase gap-3 items-center justify-center  pb-5 rounded-md bg-custom-blue py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                <FaUserEdit size={25} />
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    </div>


                </>

            ) : null}
        </Layouts>

    )
}

export default UserProfile
