import React, { useState } from 'react'
import useAxios from '../../AxiosConfig/Axios'
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'; 


function UserReviews({cancel , user , employee}) {
    const axiosInstance = useAxios()
	const [rating , setRating] = useState({
		user:user,
		employee:employee,
		content:'',
		star_rating:'',
	})



	const handleSubmit = async (e) => {
		if(!rating.content.trim()){
			toast.error('Please write your Feedback')
			return false
		}
		if(!rating.star_rating){
			toast.error('Please write your Feedback Star')
			return false
		}
		e.preventDefault()
		const response = await axiosInstance.post('/reviews/create',rating)
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
				title: "Successfully Added Your Reviews"
			  });
			cancel()
			
		}
		
	}

  return (
	<div className='flex justify-center h-screen'>
		<div className="fixed left-auto right-auto   w-2/5  z-10  inset-0 overflow-y-auto">
    		<div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-900 dark:text-gray-100">
		<div className="flex flex-col items-center w-full">
			<h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
				<div className="flex flex-col items-center py-6 space-y-3">
			<span className="text-center">How was your experience?</span>
			<div className="flex space-x-3">
				{[1,2,3,4,5].map((d , index) => (
					<button value={d} onClick={() => setRating({...rating , star_rating:d}) } type="button" title={`Rate ${d} stars`}  aria-label={`Rate ${d} stars`}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-10 h-10 ${index < rating.star_rating ? 'dark:text-yellow-500' : 'dark:text-gray-600'}`}>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
						</svg>
					</button>
				))}
			</div>
		</div>
		<div className="flex flex-col w-full">
			<textarea 
			value={rating.content}
			onChange={(e) => setRating({...rating,content:e.target.value})}
			rows="3" placeholder="Message..." className="p-4 rounded-md resize-none dark:text-gray-100 dark:bg-gray-900"></textarea>
			<button onClick={handleSubmit} type="button" className="py-4 my-8 font-semibold rounded-md dark:text-gray-900 dark:bg-violet-400">Leave feedback</button>
		</div>
	</div>
	<div onClick={cancel} className="flex items-center justify-center">
		<a rel="noopener noreferrer"  className="text-sm dark:text-gray-400">Maybe later</a>
	</div>

	<Toaster
  position="top-center"
  reverseOrder={false}
  />

</div>
</div>
</div>
 
  )
}

export default UserReviews
