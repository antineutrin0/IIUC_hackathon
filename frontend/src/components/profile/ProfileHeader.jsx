import { Edit2, User, Mail, Phone, MapPin } from "lucide-react";

const ProfileHeader = ({ profile, onEdit }) => {
  const availabilityLabels = {
    student: 'Student',
    employed: 'Currently Employed',
    unemployed: 'Unemployed',
    looking: 'Actively Looking',
    open_to_work: 'Open to Work',
    not_looking: 'Not Looking'
  };

  const availabilityColors = {
    open_to_work: 'bg-green-100 text-green-700',
    looking: 'bg-blue-100 text-blue-700',
    employed: 'bg-gray-100 text-gray-700',
    student: 'bg-purple-100 text-purple-700',
    unemployed: 'bg-orange-100 text-orange-700',
    not_looking: 'bg-red-100 text-red-700'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
            <User className="text-green-600" size={64} />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-3xl font-bold text-black mb-1">{profile.user.name}</h1>
              <p className="text-lg text-gray-700">{profile.headline}</p>
            </div>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${availabilityColors[profile.availability]}`}>
              {availabilityLabels[profile.availability]}
            </span>
            {profile.isPublic && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Public Profile
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-green-600" />
              <span>{profile.user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-green-600" />
              <span>{profile.user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-green-600" />
              <span>{profile.address.city}, {profile.address.state}, {profile.address.country}</span>
            </div>
          </div>
        </div>
      </div>

      {profile.bio && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-black mb-2">About</h3>
          <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        </div>
      )}

      {profile.targetRoles.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-black mb-2">Target Roles</h3>
          <div className="flex flex-wrap gap-2">
            {profile.targetRoles.map((role, idx) => (
              <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm font-medium">
                {role}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileHeader;