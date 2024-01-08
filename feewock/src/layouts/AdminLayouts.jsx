import React from 'react'
import AdminNavbar from '../components/Admin/Navbar/AdminNavbar'
import AdminSideBar from '../components/Admin/SideBar/AdminSideBar'

function AdminLayouts({children}) {
  return (
    <div className="flex h-screen">
     <AdminSideBar />
     <div className="flex flex-col w-full ">
       <AdminNavbar />
       <main>{children}</main>
     </div>
   </div>
  )
}

export default AdminLayouts