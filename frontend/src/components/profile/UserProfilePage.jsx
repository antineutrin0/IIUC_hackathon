import { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProjectsSection from './ProjectSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import LanguagesSection from './LanguagesSection';
import EditProfileModal from './EditProfileModel';
import EditProjectsModal from './EditProjectsModal';
import EditEducationModal from './EditEducationModal';
import EditSkillsModal from './EditSkillsModal';
import EditLanguagesModal from './EditLanguagesModal';
import EditCvModal from './EditCvModal';
import { FileText, Loader2 } from 'lucide-react';
import React from 'react';
import { getData } from '@/context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const demoProfile = {
  _id: 'demo',
  username: 'Demo User',
  email: 'demo@example.com',
  headline: 'Full-Stack Developer',
  bio: 'This is a demo profile.',
  availability: 'open_to_work',
  isPublic: true,
  targetRoles: ['Full-Stack Engineer'],
  skills: ['react', 'nodejs'],
  languages: [{ name: 'English', proficiency: 'Fluent' }],
  projects: [],
  education: [],
  cvText: '',
  cvLink: '',
};



const UserProfilePage = () => {
  const { user, loading: userLoading } = getData();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(demoProfile);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditProjectsOpen, setIsEditProjectsOpen] = useState(false);
  const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const [isEditSkillsOpen, setIsEditSkillsOpen] = useState(false);
  const [isEditLanguagesOpen, setIsEditLanguagesOpen] = useState(false);
  const [isEditCvOpen, setIsEditCvOpen] = useState(false);
  const [isEditCv, setIsEditCv] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleUpdateCv = async (cvData) => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await axios.put(
      "http://localhost:8000/user/profile/cv",
      cvData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
       setProfile(res.data.profile);
      toast.success("CV Updated Successfully");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update CV");
  }
};


  // Fetch user profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      if (userLoading) return;

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
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.success && res.data.profile) {
          setProfile(res.data.profile);
        } else {
          // fallback if API shape different
          setProfile(res.data?.profile || demoProfile);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile data');
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, userLoading, navigate]);

  /**
   * handleSaveProfile
   * Receives a partial update object (e.g. { headline, bio } or { projects: [...] })
   * Sends to backend and merges into local state on success.
   */
  const handleSaveProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Not authenticated');
        navigate('/login');
        return;
      }

      const res = await axios.put(`http://localhost:8000/user/profile`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // If backend returns updated profile, prefer that. Otherwise merge optimistic update.
      if (res.data?.success) {
        const serverProfile = res.data.profile || null;
        setProfile(prev => (serverProfile ? serverProfile : { ...prev, ...updatedData }));
        toast.success('Profile updated successfully');
      } else {
        toast.error(res.data?.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Profile update failed:', err);
      toast.error('Failed to update profile');
    }
  };

  // loading UI
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

  // error UI
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
          onEdit={() => setIsEditProfileOpen(true)}
           onEditCv={() => setIsEditCv(true)}
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <ProjectsSection
              projects={profile.projects || []}
              onEdit={() => setIsEditProjectsOpen(true)}
              onAdd={() => setIsEditProjectsOpen(true)}
            />

            <EducationSection
              education={profile.education || []}
              onEdit={() => setIsEditEducationOpen(true)}
              onAdd={() => setIsEditEducationOpen(true)}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <SkillsSection skills={profile.skills || []} onEdit={() => setIsEditSkillsOpen(true)} />

            <LanguagesSection
              languages={profile.languages || []}
              onEdit={() => setIsEditLanguagesOpen(true)}
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

        {/* Modals */}
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          profile={profile}
          onSave={(partial) => {
            handleSaveProfile(partial);
            setIsEditProfileOpen(false);
          }}
        />

        <EditProjectsModal
          isOpen={isEditProjectsOpen}
          onClose={() => setIsEditProjectsOpen(false)}
          projects={profile.projects || []}
          onSave={(partial) => {
            // partial expected to be { projects: [...] }
            handleSaveProfile(partial);
            setIsEditProjectsOpen(false);
          }}
        />

        <EditEducationModal
          isOpen={isEditEducationOpen}
          onClose={() => setIsEditEducationOpen(false)}
          education={profile.education || []}
          onSave={(partial) => {
            // partial expected to be { education: [...] }
            handleSaveProfile(partial);
            setIsEditEducationOpen(false);
          }}
        />

        <EditSkillsModal
          isOpen={isEditSkillsOpen}
          onClose={() => setIsEditSkillsOpen(false)}
          skills={profile.skills || []}
          onSave={(partial) => {
            // partial expected to be { skills: [...] }
            handleSaveProfile(partial);
            setIsEditSkillsOpen(false);
          }}
        />

        <EditLanguagesModal
          isOpen={isEditLanguagesOpen}
          onClose={() => setIsEditLanguagesOpen(false)}
          languages={profile.languages || []}
          onSave={(partial) => {
            // partial expected to be { languages: [...] }
            handleSaveProfile(partial);
            setIsEditLanguagesOpen(false);
          }}
        />

            <EditCvModal
        isOpen={isEditCv}
        onClose={() => setIsEditCv(false)}
        profile={profile}
        onSave={handleUpdateCv}
      />

      </div>
    </div>
  );
};

export default UserProfilePage;
