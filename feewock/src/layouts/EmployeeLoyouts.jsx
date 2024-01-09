import React from 'react'
import EmployeesNavbar from '../components/Employees/EmployeesNavbar/EmployeesNavbar'
import EmployeesFooter from '../components/Employees/EmployeesFooter/EmployeesFooter'

function EmployeeLoyouts({children}) {
  return (
    <>
   
        <EmployeesNavbar />
            {children}
        <EmployeesFooter />

    </>
  )
}

export default EmployeeLoyouts