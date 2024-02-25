import React,{useState} from 'react'
import control from './Image/control.png'
import { IoIosHome } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { GiVerticalBanner } from "react-icons/gi";
import { FaBorderAll } from "react-icons/fa";
import { NavLink } from 'react-router-dom'
import { MdContactMail } from "react-icons/md";

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
        <NavLink 

          end
        style={({ isActive }) => {
          return isActive ? { color: 'black'} : {};
        }}
        to="/admin/dashboard" >
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2' >
            <IoIosHome size={30} />
            <span className={`${!open && "hidden"} origin-left  uppercase  duration-200   text-sm font-normal `}>
                Dashboard
            </span>
          </li>
        </NavLink>

        <NavLink 
        style={({ isActive }) => {
          return isActive ? { color: '#3E84A8'} : {};
        }}
        to='/admin/usermanagement' >
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2' >
            <FaUsers size={30} />
            <span className={`${!open && "hidden"} origin-left uppercase  text-sm font-normal duration-200  `}>
                User Management
            </span>
          </li>
        </NavLink>

        <NavLink 
        style={({ isActive }) => {
          return isActive ? { color: '#3E84A8'} : {};
        }}
        to='/admin/employeemanagement'>
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 ' >
            <FaUsersCog  size={30} />
            <span className={`${!open && "hidden"} origin-left uppercase  duration-200 font-normal text-sm `}>
                Employees Management
            </span>
          </li>
          </NavLink>

          <NavLink 
          style={({ isActive }) => {
            return isActive ? { color: '#3E84A8'} : {};
          }}
          to="/admin/mainservice">
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 ' >
            <MdOutlineMiscellaneousServices size={30} />
            <span className={`${!open && "hidden"} origin-left duration-200 font-normal text-sm  uppercase  `}>
                Main Services
            </span>
          </li>
          </NavLink>


          <NavLink
          style={({ isActive }) => {
            return isActive ? { color: '#3E84A8'} : {};
          }}
          to="/admin/subservice">
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 ' >
            <GrServices size={30} />
            <span className={`${!open && "hidden"} origin-left duration-200 font-normal text-sm  uppercase  `}>
                Sub Service
            </span>
          </li>
          </NavLink>
        
          <NavLink 
            style={({ isActive }) => {
              return isActive ? { color: '#3E84A8'} : {};
            }}
          to="/admin/banner">
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 ' >
            <GiVerticalBanner  size={30} />
            <span className={`${!open && "hidden"} origin-left duration-200  font-normal text-sm uppercase  `}>
                User Banner
            </span>
          </li>
          </NavLink>

          <NavLink 
          style={({ isActive }) => {
            return isActive ? { color: '#3E84A8'} : {};
          }}
          to="/admin/payment">
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 ' >
            <FaBorderAll size={30} />
            <span className={`${!open && "hidden"} origin-left duration-200 font-normal text-sm uppercase   `}>
                Service Order
            </span>
          </li>
          </NavLink>

          <NavLink 
          style={({ isActive }) => {
            return isActive ? { color: '#3E84A8'} : {};
          }}
          to="/admin/contact">
          <li className= 'flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-white text-sm items-center gap-x-4 mt-2 ' >
          <MdContactMail size={30} />
            <span className={`${!open && "hidden"} origin-left duration-200 font-normal text-sm uppercase   `}>
                Contact
            </span>
          </li>
          </NavLink>
         
      </ul>
    </div>
  </div>
  )
}

export default AdminSideBar