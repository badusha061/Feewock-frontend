import React from 'react'
import AdminNavbar from '../components/Admin/Navbar/AdminNavbar'
import AdminSideBar from '../components/Admin/SideBar/AdminSideBar'

function AdminLayouts({children}) {
  return (
    <>
    <AdminNavbar />
            {children}
    <AdminSideBar />
    </>
  )
}

export default AdminLayouts