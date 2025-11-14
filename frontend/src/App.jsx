import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/Verify";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import JobBoardHome from "./components/home/JobBoardHome";
import ResourcePage from "./components/resource/ResourcePage";
import UserProfilePage from "./components/profile/UserProfilePage";
import Recruiter from "./components/recruiter/Recruiter";
import RoadmapDashboard from "./pages/RoadmapDashboard";
import AiJobCompare from "./components/home/JobCompare"; 
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatbotPage from './components/common/ChatbotPage';
import ChatbotButton from "./components/common/ChatbotButton";
import FileUploader from "./pages/fileUploader";
import CareerRoadmapPage from "./pages/CareerRoadmapPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,   // <-- Wrap everything with layout
    children: [
      {
        path: '/',
        element: <><Navbar /><Home /></>
      },
      {
        path:'/home',
        element:<JobBoardHome />
      },
      {
        path: '/resources',
        element:<ResourcePage />
      },
      {
        path:'/user/profile',
        element:<UserProfilePage />
      },
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
        path:'/chatpage',
        element:<ChatbotPage />
      },
      {
        path: '/compare/:jobId',
        element: <AiJobCompare />
      },
      {
        path: '/roadmap/:jobId',
        element: <RoadmapDashboard />
      },
      {
        path:'/uploadfile',
        element:<FileUploader />
      },
      {
        path:'/user/profile',
        element:<Navbar><UserProfilePage /></Navbar>
      },
      {
        path:'/career-roadmap',
        element:<CareerRoadmapPage />
      },
    ]
  }
]);
const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
