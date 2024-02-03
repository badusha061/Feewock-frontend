import React from 'react'
import EmployeesNavbar from '../components/Employees/EmployeesNavbar/EmployeesNavbar'
import Footer from '../components/Footer/Footer'

function EmployeeLoyouts({children}) {
  return (
    <>
   
        <EmployeesNavbar />
            {children}
        <Footer />
    </>
  )
}

export default EmployeeLoyouts