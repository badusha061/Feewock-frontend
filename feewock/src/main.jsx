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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  >
      <Route path='' element={<Homepage />} />
      <Route path='register/' element={<Register />} />
      <Route path='register/otp' element={<Otp />} />
      <Route path='login' element={<Login />} />
      <Route path='service' element={<Service />} />
      <Route path='service/:id' element={<EmployeeList />} />
      <Route path='views/:id' element={<Views />} />
      <Route path='/admin/*' element={<ProtectedRoute allowedRoles={[1]}><AdminRoutes /> </ProtectedRoute> } />
      <Route path='/employee/*' element={<ProtectedRoute allowedRoles={[2]}><EmployeeRoutes /> </ProtectedRoute> }  />
      <Route path='chat' element={<OneOneChat />} />
      <Route path='userprofile/:id' element={<ProtectedRoute allowedRoles={[3]}><UserProfile /> </ProtectedRoute> } />
      <Route path='postlist' element={<PostListUser />} />
      <Route path="/employee/employeeregister" element={<EmployeeRegister />} />
        <Route path="/employee/employeeregister/otp" element={<EmployeeOtp />} />
    </Route>
  )
    
)



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  // </React.StrictMode>,
)
