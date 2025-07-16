import React from 'react'
import { Outlet } from 'react-router'

const Guest = () => {
    console.log("guest");

  return (
    <Outlet />
  )
}

export default Guest