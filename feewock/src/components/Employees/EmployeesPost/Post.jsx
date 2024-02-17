import React, { useState  , useEffect ,useReducer } from 'react'
import EmployeeLoyouts from '../../../layouts/EmployeeLoyouts'
import AddPost from './AddPost'
import useAxios from '../../../AxiosConfig/Axios'
import Swal from 'sweetalert2';
import EditPost from './EditPost';
import DeleteConformation from './DeleteConformation';
import Spinner from '../../../utils/Spinner';

function Post() {
  const [data , setData] = useState([])
  const axiosInstance = useAxios()
  const [editModal , setEditModal] = useState(false)
  const [deleteModal , setDelete] = useState(false)
  const [post , setPost] = useState([])
  const [isLoadingPost , setIsLaodingPost] = useState(true)
  const[postId , setPostId] = useState('')
  const employeeDetailsJson = localStorage.getItem('userDetails')
  const Employee =JSON.parse(employeeDetailsJson)
  const EmployeeId = Employee.id
  const [reducer , forceUpdate] = useReducer( x => x + 1 , 0)

  let BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    GetEmployeeData()
    GetPost()
},[BASE_URL , reducer ])

const GetEmployeeData = async() => {
    const response = await axiosInstance.get(`${BASE_URL}/dashboard/employeeindivualPermsion/${EmployeeId}/`)
    if (response.status === 200){
        setData(response.data)
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
            title: 'Unauthorized please Login',
          });
          return false
    }
}

  const GetPost = async (e) => {
    const response = await axiosInstance.get(`${BASE_URL}/post/list/${EmployeeId}/`)
    if(response.status === 200){
      setPost(response.data)
      setIsLaodingPost(false)
    }else{
      console.log('something error');
    }
  }

  const [addModal , setAddModal] = useState(false)

  const cancelModal = () => {
    setAddModal(false)
    setEditModal(false)
    setDelete(false)
    forceUpdate()
  }
 

  const HandleEdit = (e,id) => {
    setPostId(id)
    setEditModal(true)
  }

  const HandleDelete = (e , id) => {
    setPostId(id)
    setDelete(true)
  }
  
  if(isLoadingPost){
    return <Spinner />
  }
  return (
   <EmployeeLoyouts>
        <div className=' px-6'>
        <div className=' flex justify-center mt-4 '>
          {data.username ? (
            <h4 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-black"> {data.username.toUpperCase()} ACTIVITY  </h4>
          ):null}
        </div>
        <div className=''>
            <button onClick={(e) => setAddModal(true)} className="bg-custom-blue text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out hover:bg-black active:bg-purple-900 focus:outline-none">
              Upload Photo
            </button>
        </div>
          {addModal ? (
              <AddPost close={cancelModal} forceUpdate={forceUpdate} />
          ):null }

          
          

      <div className='grid  shadow hover:cursor-pointer hover:shadow-2xl grid-cols-3 gap-4 mt-4'>
      
      

        {post.map((data , index) => (
          <div className="flex flex-col bg-white  shadow hover:shadow-2xl rounded-md py-4 px-6 border">
          <img className="w-full  h-72 object-cover rounded-t-lg" alt="Card Image" src={data.image} />
          <div className="p-4 flex justify-center ">
            <h2 className="text-xl capitalize font-semibold h-16 overflow-hidden overflow-ellipsis"> {data.captions} </h2>
          </div>

             {editModal ? (
                <EditPost close={cancelModal} id={postId}  />
             ): null}
            
            {deleteModal ? (
              <DeleteConformation close={cancelModal} id={postId} />
            ):null}

            <div className="flex justify-around items-center py-3">
                <div  onClick={ (e)=> HandleEdit(e , data.id) } className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                    <svg className="w-6 stroke-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    <button className="font-semibold text-sm text-green-700">Edit</button>
                </div>
                <div onClick={ (e)=> HandleDelete(e , data.id) }  className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer">
                  <svg className="w-6 stroke-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  <button className="font-semibold text-sm text-red-700">Delete</button>
                </div>
            </div>
          </div>

        ))}
      </div>
    </div>



   </EmployeeLoyouts>
  )
} 

export default Post
