import { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProjectsSection from './ProjectSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import LanguagesSection from './LanguagesSection';
import EditProfileModal from './EditProfileModel';
import { FileText } from 'lucide-react';
import React from 'react';
import demoProfile from './demoProfile';

const UserProfilePage = () => {
  const [profile, setProfile] = useState(demoProfile);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSaveProfile = (updatedData) => {
    setProfile({ ...profile, ...updatedData });
    // In real app: API call to update profile
    console.log('Profile updated:', updatedData);
  };

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