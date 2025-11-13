import { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProjectsSection from './ProjectSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import LanguagesSection from './LanguagesSection';
import EditProfileModal from './EditProfileModel';
import { FileText, Loader2 } from 'lucide-react';
import React from 'react';
import demoProfile from './demoProfile';
import { getData } from '@/context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UserProfilePage = () => {
  const { user, loading: userLoading } = getData();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(demoProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      // Wait for user context to load
      if (userLoading) return;

      // Redirect to login if no user
      if (!user) {
        toast.error('Please login to view your profile');
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const res = await axios.get(`http://localhost:8000/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          setProfile(res.data.profile || demoProfile);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Failed to load profile data');
        toast.error('Failed to load profile');
        
        // If unauthorized, redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, userLoading, navigate]);

  const handleSaveProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.put(
        `http://localhost:8000/user/profile`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.data.success) {
        setProfile({ ...profile, ...updatedData });
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Failed to update profile');
    }
  };

  // Show loading state
  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
       <div className="max-w-5xl mx-auto p-6">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          onEdit={() => setIsEditModalOpen(true)}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <ProjectsSection
              projects={profile.projects}
              onEdit={() => console.log('Edit projects')}
              onAdd={() => console.log('Add project')}
            />

            <EducationSection
              education={profile.education}
              onEdit={() => console.log('Edit education')}
              onAdd={() => console.log('Add education')}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <SkillsSection
              skills={profile.skills}
              onEdit={() => console.log('Edit skills')}
            />

            <LanguagesSection
              languages={profile.languages}
              onEdit={() => console.log('Edit languages')}
            />

            {/* Additional Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                <FileText className="text-green-600" size={20} />
                Profile Completion
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-green-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Add more projects and certifications to complete your profile!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
