import React from 'react'
import { Oval } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className='loading-screen'>
         {/* <Oval
    height={80}
    width={80}
    color="#FFD64E"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel='oval-loading'
    secondaryColor="white"
    strokeWidth={5}
    strokeWidthSecondary={1}
  
  /> */}
  <Oval
  ariaLabel="loading-indicator"
  height={100}
  width={100}
  strokeWidth={5}
  strokeWidthSecondary={1}
  color="#FFD64E"
  secondaryColor="transparent"
/>
  </div>
  )
}
