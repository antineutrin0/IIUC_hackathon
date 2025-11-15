import { ExternalLink, BookOpen, Tag } from "lucide-react";

const ResourceCard = ({ resource, onClick }) => {
  const thumbnailColors = {
    purple: 'bg-gradient-to-br from-purple-600 to-purple-800',
    teal: 'bg-gradient-to-br from-teal-500 to-teal-700',
    orange: 'bg-gradient-to-br from-orange-500 to-red-600',
    yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
    green: 'bg-gradient-to-br from-green-500 to-green-700'
  };

  // Get a color based on platform or random
  const getColor = () => {
    const colors = Object.keys(thumbnailColors);
    const platformColors = {
      'youtube': 'orange',
      'coursera': 'blue',
      'udemy': 'purple',
      'edx': 'teal',
      'codecademy': 'yellow',
      'freecodecamp': 'green'
    };
    
    const platform = (resource.platform || '').toLowerCase();
    return platformColors[platform] || colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      onClick={() => onClick(resource)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100"
    >
      <div className="flex gap-4">
        <div className={`w-64 h-40 ${thumbnailColors[getColor()]} flex items-center justify-center flex-shrink-0`}>
          <BookOpen className="text-white" size={48} />
        </div>
        
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-black text-lg hover:text-green-600 flex-1">
              {resource.title}
            </h3>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="ml-2 text-green-600 hover:text-green-700"
            >
              <ExternalLink size={20} />
            </a>
          </div>
          
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {resource.description || 'No description available'}
          </p>
          
          {resource.platform && (
            <p className="text-gray-600 text-sm mb-3 font-medium">
              Platform: {resource.platform}
            </p>
          )}
          
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              resource.cost === 'Free' 
                ? 'bg-green-100 text-green-700' 
                : resource.cost === 'Paid' 
                ? 'bg-blue-100 text-blue-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {resource.cost || 'Free'}
            </span>
          </div>
          
          {resource.relatedSkills && resource.relatedSkills.length > 0 && (
            <div className="flex items-start gap-2">
              <Tag size={16} className="text-gray-500 mt-1 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {resource.relatedSkills.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs capitalize"
                  >
                    {skill}
                  </span>
                ))}
                {resource.relatedSkills.length > 5 && (
                  <span className="px-2 py-1 text-gray-500 text-xs">
                    +{resource.relatedSkills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;