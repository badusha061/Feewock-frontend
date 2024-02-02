import React,{useState} from 'react'
import control from './Image/control.png'
import user from './Image/User.png'
import home from './Image/home.png'
import employee from './Image/Employee.png'
import mainservice from './Image/mainservice.png'
import subservice from './Image/subservice.png'
import position from './Image/position.png'
import banner from './Image/banner.png'


import { NavLink } from 'react-router-dom'

function AdminSideBar() {
    const [open, setOpen] = useState(true);
  return (
    <div className="flex">
    <div
      className={` ${
        open ? "w-72" : "w-20 "
      } bg-custom-voilate h-screen p-5  pt-8 relative duration-300 `}
    >
      <img
        src= {control}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src=''
          className={`cursor-pointer duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Feewock
        </h1>
      </div>
      <ul className="pt-6">
        <NavLink to="/admin/dashboard" >
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4' >
            <img src={home} alt='logo' />
            <span className={`${!open && "hidden"} origin-left duration-200 font-bold text-lg `}>
                Dashboard
            </span>
          </li>
        </NavLink>
          <br />
        <NavLink to='/admin/usermanagement' >
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4' >
            <img src={user} alt='logo' />
            <span className={`${!open && "hidden"} origin-left duration-200 font-bold text-lg`}>
                User Management
            </span>
          </li>
        </NavLink>
          <br />
        <NavLink to='/admin/employeemanagement'>
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4' >
            <img src={employee} alt='logo' />
            <span className={`${!open && "hidden"} origin-left duration-200 font-bold text-lg `}>
                Employees Management
            </span>
          </li>
          </NavLink>
          <br />
          <NavLink to="/admin/mainservice">
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4' >
            <img src={mainservice} alt='logo' />
            <span className={`${!open && "hidden"} origin-left duration-200 font-bold text-lg `}>
                Main Services
            </span>
          </li>
          </NavLink>
          <br />
          <NavLink to="/admin/subservice">
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4' >
            <img src={subservice} alt='logo' />
            <span className={`${!open && "hidden"} origin-left duration-200 font-bold text-lg `}>
                Sub Service
            </span>
          </li>
          </NavLink>
          <br />
        
          <NavLink to="/admin/banner">
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4' >
            <img src={banner} alt='logo' />
            <span className={`${!open && "hidden"} origin-left duration-200 font-bold text-lg `}>
                User Banner
            </span>
          </li>
          </NavLink>
         
      </ul>
    </div>
  </div>
  )
}

export default AdminSideBar