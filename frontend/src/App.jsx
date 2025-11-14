import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import Verify from './pages/Verify'
import Navbar from './components/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import ChangePassword from './pages/ChangePassword'
import JobBoardHome from './components/home/JobBoardHome'
import ResourcePage from './components/resource/ResourcePage'
import UserProfilePage from './components/profile/UserProfilePage'
import Recruiter from './components/recruiter/Recruiter'
import CVJobComparison from './components/home/JobCompare'

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Home /></>
  },
  {
   path:'/home',
   element:<JobBoardHome></JobBoardHome>
  },
  {
    path: '/resources',
    element:<ResourcePage></ResourcePage>,
  },
  {
    path:'/user/profile',
    element:<UserProfilePage></UserProfilePage>
  },
  //  {
  //   path: '/recruiter',
  //   element: <Recruiter></Recruiter>,
  // },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/verify',
    element: <VerifyEmail />
  },
  {
    path: '/verify/:token',
    element: <Verify />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/verify-otp/:email',
    element: <VerifyOTP />
  },
  {
    path: '/change-password/:email',
    element: <ChangePassword />
  },
  {
    path: '/cmp',
    element: <CVJobComparison />
  }
  ,
  
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
