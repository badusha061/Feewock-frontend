import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {  Route, RouterProvider, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Layouts from './layouts/Layouts.jsx'
import Homepage from './pages/Home page/Homepage.jsx'
import Register from './pages/Registration page/Register.jsx'
import Login from './pages/Login page/Login.jsx'
import Otp from './pages/Registration page/Otp.jsx'
import { Provider } from 'react-redux'
import {store , persistor} from './store/configureStore.js'
import { PersistGate } from 'redux-persist/integration/react'
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  >
      <Route path='' element={<Homepage />} />
      <Route path='register/' element={<Register />} />
      <Route path='register/otp' element={<Otp />} />
      <Route path='login' element={<Login />} />
      <Route path='dashboard' element={<AdminDashboard />} />
    </Route>
  )
    
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
