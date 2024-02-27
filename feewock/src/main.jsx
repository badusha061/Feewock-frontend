import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  Route, RouterProvider, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Homepage from './pages/Home page/Homepage.jsx'
import Register from './pages/Registration page/Register.jsx'
import Login from './pages/Login page/Login.jsx'
import Otp from './pages/Registration page/Otp.jsx'
import { Provider } from 'react-redux'
import {store , persistor} from './store/configureStore.js'
import { PersistGate } from 'redux-persist/integration/react'
import AdminRoutes from './Routes/AdminRoutes.jsx'
import EmployeeRoutes from './Routes/EmployeeRouters.jsx'
import Service from './components/Service/Service.jsx'
import EmployeeList from './components/EmployeeList/EmployeeList.jsx'
import Views from './components/EmployeeList/Views.jsx'
import OneOneChat from './components/Chat/Employee-user/OneOneChat.jsx'
import UserProfile from './components/UserProfile/UserProfile.jsx'
import PostListUser from './components/Post/PostListUser.jsx'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import EmployeeRegister from './components/Employees/EmployeeRegister/EmployeeRegister.jsx'
import EmployeeOtp from './components/Employees/EmployeeRegister/EmployeeOtp.jsx'
import RedirectIfAuthenticated from './utils/RedirectIfAuthenticated.jsx'
import BookingPage from './pages/BookingPage/BookingPage.jsx'
import UserBookingList from './components/UserProfile/UserBookingList.jsx'
import ServicePayment from './components/payment/ServicePayment.jsx'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Usernotification from './notification/usernotification.jsx'
import ContactForm from './components/Contact/ContactForm.jsx'
import ErrorPage from './pages/404page/ErrorPage.jsx'
import Call from './components/Call/Call.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  >
      <Route path='' element={<Homepage />} />


      {/* service listing and indivual service listing  and employee listing and post listing in the user side*/}
      <Route path='service' element={<Service />} />
      <Route path='service/:id' element={<EmployeeList />} />
      <Route path='views/:id' element={<Views />} />
      <Route path='postlist' element={<PostListUser />} />
      <Route path='contact' element={<ContactForm />} />

      <Route path='*' element={<ErrorPage />} />

      {/* employee and admin urls */}
      <Route path='/admin/*' element={<ProtectedRoute allowedRoles={[1]}><AdminRoutes /> </ProtectedRoute> } />
      <Route path='/employee/*' element={<ProtectedRoute allowedRoles={[2]}><EmployeeRoutes /> </ProtectedRoute> }  />
      
      {/* user profile and chat  and call */}
      <Route path='chat' element={<OneOneChat />} />
      <Route path='userprofile/:id' element={<ProtectedRoute allowedRoles={[3]}><UserProfile /> </ProtectedRoute> } />
      <Route path='call' element={<ProtectedRoute allowedRoles={[3]}> <Call /> </ProtectedRoute> } />
      


      {/* user booking*/}
      <Route path='booking/' element={<ProtectedRoute allowedRoles={[3]}><BookingPage /> </ProtectedRoute>} />
      <Route path='bookinglist' element={<ProtectedRoute allowedRoles={[3]}><UserBookingList /> </ProtectedRoute>} />
      <Route path='payment' element={<ProtectedRoute allowedRoles={[3]}><ServicePayment /> </ProtectedRoute>} />
      <Route path='usernotification' element={<ProtectedRoute allowedRoles={[3]}><Usernotification /> </ProtectedRoute>} />


      {/* user and employee and admin login */}
      <Route path='login' element={<RedirectIfAuthenticated > <Login /> </RedirectIfAuthenticated>  } />

      {/* user register  */}
      <Route path='register/' element={<RedirectIfAuthenticated> <Register /> </RedirectIfAuthenticated> } />
      <Route path='register/otp' element={<Otp />} />
      
      {/* employees register  */}
      <Route path="/employee/employeeregister" element={<RedirectIfAuthenticated> <EmployeeRegister /> </RedirectIfAuthenticated> } />
      <Route path="/employee/employeeregister/otp" element={<EmployeeOtp />} />
    </Route>
  )
    
)

const stripePromise = loadStripe('pk_test_51Oi81ySJ338jWYPQbr6xviCxeXBEYyaj3cG7T2Pt2LIXVBIv0AH8vtjojdKkrPriiKrUY41HXA8DAzKqxKm5vQ1o00w0rurnCt');


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Elements  stripe={stripePromise}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </Elements>
   
 
  // </React.StrictMode>,
)
