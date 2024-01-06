import React from 'react'


function Homepage() {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'))
  return (
    <>
    {userDetails ? (

      <h1> welcom to Feewock {userDetails.username} </h1>
    ): (
      <h1> hello world </h1>
    )}
    </>
  )
}

export default Homepage