import React from 'react'

const LoadingState = ({ size }) => {
  
  return <span className={`loading loading-spinner loading-${size}`}></span>
}

export default LoadingState