import { Play, Star } from "lucide-react";


const ResourceDetails = ({ resource, onBack }) => {
  const thumbnailColors = {
    purple: 'bg-gradient-to-br from-purple-600 to-purple-800',
    teal: 'bg-gradient-to-br from-teal-500 to-teal-700',
    orange: 'bg-gradient-to-br from-orange-500 to-red-600',
    yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
    green: 'bg-gradient-to-br from-green-500 to-green-700'
  };

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-7xl mx-auto p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-black hover:text-green-600 mb-6"
        >
          <X size={20} />
          Back to Resources
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Preview */}
            <div className={`${thumbnailColors[resource.thumbnail]} rounded-lg overflow-hidden mb-6 relative`}>
              <div className="aspect-video flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="text-green-600 ml-1" size={32} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded text-sm font-medium text-black">
                Preview this course
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-black mb-4">{resource.title}</h1>
              
              <p className="text-gray-700 text-lg mb-6">{resource.description}</p>

              <div className="flex items-center gap-2 mb-6">
                {resource.cost === 'Free' && (
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded text-sm font-medium">
                    Free tutorial
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-black text-lg">{resource.rating}</span>
                  <div className="flex text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(resource.rating) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({resource.reviews.toLocaleString()} ratings)</span>
                </div>
                <span className="text-gray-600">{resource.students.toLocaleString()} students</span>
              </div>

              <div className="flex items-center gap-1 text-gray-700 mb-4">
                <Clock size={20} />
                <span>{resource.duration} of on-demand video</span>
              </div>

              <div className="mb-6">
                <p className="text-gray-700">
                  Created by <span className="text-green-600 font-medium">{resource.instructor}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Globe size={20} />
                <span>{resource.languages.join(', ')}</span>
              </div>
            </div>

            {/* Course Description Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-2xl font-bold text-black mb-4">Description</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {resource.description}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This comprehensive course covers everything you need to know to get started with {resource.relatedSkills.join(', ')}. 
                  You'll learn from industry experts and gain practical, hands-on experience through real-world projects.
                </p>
                <h3 className="text-xl font-semibold text-black mb-3">What you'll learn</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">Master the fundamentals and advanced concepts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">Build real-world projects from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">Learn best practices and industry standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-gray-700">Get hands-on experience with practical exercises</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-black mb-4">Related Skills</h2>
              <div className="flex flex-wrap gap-2">
                {resource.relatedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-md font-medium capitalize"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-2xl font-bold text-black mb-4">
                {resource.cost === 'Free' ? 'Free' : 'Enroll Now'}
              </h3>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg mb-4">
                Enroll now
              </button>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Platform:</span>
                  <span className="font-medium text-black">{resource.platform}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-black">{resource.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lectures:</span>
                  <span className="font-medium text-black">{resource.lectures}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium text-black">{resource.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Students:</span>
                  <span className="font-medium text-black">{resource.students.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-black mb-3">This course includes:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Play size={16} className="text-green-600" />
                    {resource.duration} on-demand video
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen size={16} className="text-green-600" />
                    {resource.lectures} lectures
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe size={16} className="text-green-600" />
                    Available in {resource.languages.length} languages
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResourceDetails;