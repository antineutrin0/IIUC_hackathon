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
import JobDetailsPage from "./components/home/JobDetails";
import SuggestedJobsPage from "./components/home/SuggestedJobsPage";
import SuggestedResourcesPage from "./components/home/SuggestedResourcesPage";
import RoadmapPopup from "./components/Roadmap/RoadmapPopup";
import CareerRoadmapPage from "./pages/CareerRoadmapPage";

const router = createBrowserRouter([
  {
    element: <AppLayout />,   // <-- Wrap everything with layout
    children: [
      {
        path: '/',
        element: <><Navbar/><Home /></>
      },
      {
        path:'/find-jobs',
        element:<><Navbar/><JobBoardHome /></>
      },
      {
        path: '/resources',
        element:<><Navbar/><ResourcePage /></>
      },
      {
        path:'/user/profile',
        element:<><Navbar/><UserProfilePage /></>
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
        element: <><Navbar/><AiJobCompare /></>
      },
      {
        path: '/roadmap/:jobId',
        element: <><Navbar/><RoadmapDashboard /></>
      },
      {
        path:'/uploadfile',
        element:<><Navbar/><FileUploader /></>
      },
      {
        path:'/user/profile',
        element:<><Navbar/><UserProfilePage /></>
      },
      {
        path:'/jobs/:id',
        element:<><Navbar/><JobDetailsPage></JobDetailsPage></>
      },
      {
        path:'/suggested-resources',
        element:<><Navbar/><SuggestedResourcesPage></SuggestedResourcesPage></>
      },
      {
        path:'/suggested-jobs',
        element:<><Navbar/><SuggestedJobsPage></SuggestedJobsPage></>
      },
      {
        path:'/roadmap-popup',
        element:<RoadmapPopup />
      },
      ,
      {
        path:'/career-roadmap',
        element:<><Navbar/><CareerRoadmapPage /></>
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
