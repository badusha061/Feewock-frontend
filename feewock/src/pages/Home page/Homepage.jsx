import React from 'react'
import Layouts from '../../layouts/Layouts'

function Homepage() {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  return (
    <>
    <Layouts>

      {userDetails ? (
        
        <h1> welcom to Feewock {userDetails.username} </h1>
        ): (
          <h1> hello world </h1>
          )}
      </Layouts>
    </>
  )
}

export default Homepage