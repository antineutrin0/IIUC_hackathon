import { useUserData } from '@/context/userContext'
import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user } = useUserData()
  return (
    <div>
      {
        user ? children : <Navigate to={'/login'} />
      }
    </div>
  )
}

export default ProtectedRoute
