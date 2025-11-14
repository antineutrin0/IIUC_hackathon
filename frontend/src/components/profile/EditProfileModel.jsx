import { useState } from "react";
import Modal  from "./Modal";
import { Save } from "lucide-react";
import axios from "axios";

const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {

  console.log("Editing profile:", profile);
  const [formData, setFormData] = useState({
    headline: profile.headline,
    bio: profile.bio,
    availability: profile.availability,
    isPublic: profile.isPublic,
    targetRoles: profile.targetRoles.join(', ')
  });

const handleSave = async () => {
  try {
    const updatedData = {
      ...formData,
      targetRoles: formData.targetRoles
        .split(',')
        .map(role => role.trim())
        .filter(Boolean),
    };

    const response = await axios.put(
      'http://localhost:8000/user/profile',
      updatedData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    console.log('Profile updated successfully:', response.data);
    onSave(response.data);
    onClose();
  } catch (error) {
    console.error('Failed to update profile:', error.response?.data || error.message);
  }
};


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Headline
          </label>
          <input
            type="text"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="e.g., Full Stack Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Target Roles (comma separated)
          </label>
          <input
            type="text"
            value={formData.targetRoles}
            onChange={(e) => setFormData({ ...formData, targetRoles: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="e.g., Software Engineer, Full Stack Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Availability Status
          </label>
          <select
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="student">Student</option>
            <option value="employed">Currently Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="looking">Actively Looking</option>
            <option value="open_to_work">Open to Work</option>
            <option value="not_looking">Not Looking</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={formData.isPublic}
            onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
            className="mr-2 accent-green-600"
          />
          <label htmlFor="isPublic" className="text-sm text-black">
            Make profile public
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default EditProfileModal;