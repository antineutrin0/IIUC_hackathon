import { Play, Star } from "lucide-react";

const ResourceCard = ({ resource, onClick }) => {
  const thumbnailColors = {
    purple: 'bg-gradient-to-br from-purple-600 to-purple-800',
    teal: 'bg-gradient-to-br from-teal-500 to-teal-700',
    orange: 'bg-gradient-to-br from-orange-500 to-red-600',
    yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
    green: 'bg-gradient-to-br from-green-500 to-green-700'
  };

  return (
    <div
      onClick={() => onClick(resource)}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100"
    >
      <div className="flex gap-4">
        <div className={`w-64 h-40 ${thumbnailColors[resource.thumbnail]} flex items-center justify-center flex-shrink-0`}>
          <Play className="text-white" size={48} />
        </div>
        
        <div className="flex-1 p-4">
          <h3 className="font-semibold text-black text-lg mb-2 hover:text-green-600">
            {resource.title}
          </h3>
          
          <p className="text-gray-700 text-sm mb-2 line-clamp-2">
            {resource.description}
          </p>
          
          <p className="text-gray-600 text-sm mb-3">{resource.instructor}</p>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-black">{resource.rating}</span>
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(resource.rating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">({resource.reviews.toLocaleString()})</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{resource.duration}</span>
            <span>•</span>
            <span>{resource.lectures} lectures</span>
            <span>•</span>
            <span>{resource.level}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResourceCard;