import React from 'react'
import { Outlet } from 'react-router'

const Default = () => {
  console.log("default");
  return (
    <Outlet />
  )
}

export default Default