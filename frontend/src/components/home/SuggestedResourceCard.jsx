import { ExternalLink, BookOpen, Tag, CheckCircle2, Lightbulb, GraduationCap, Rocket, TrendingUp } from "lucide-react";

const SuggestedResourceCard = ({ resource, matchDetails }) => {
  const thumbnailColors = {
    purple: 'bg-gradient-to-br from-purple-600 to-purple-800',
    teal: 'bg-gradient-to-br from-teal-500 to-teal-700',
    orange: 'bg-gradient-to-br from-orange-500 to-red-600',
    yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-700',
    green: 'bg-gradient-to-br from-green-500 to-green-700'
  };

  // Get a color based on platform
  const getColor = () => {
    const platformColors = {
      'youtube': 'orange',
      'coursera': 'blue',
      'udemy': 'purple',
      'edx': 'teal',
      'codecademy': 'yellow',
      'freecodecamp': 'green'
    };
    
    const platform = (resource.platform || '').toLowerCase();
    return platformColors[platform] || 'blue';
  };

  // Get match percentage color
  const getMatchColor = (score) => {
    if (score >= 60) return 'bg-green-500';
    if (score >= 40) return 'bg-blue-500';
    if (score >= 20) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const handleClick = () => {
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-blue-600">
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail Section */}
        <div className={`md:w-80 h-48 md:h-auto ${thumbnailColors[getColor()]} flex items-center justify-center flex-shrink-0 relative`}>
          <BookOpen className="text-white" size={64} />
          
          {/* Match Score Badge on Thumbnail */}
          <div className={`absolute top-4 right-4 w-16 h-16 rounded-full ${getMatchColor(resource.matchScore)} flex items-center justify-center shadow-lg`}>
            <div className="absolute inset-1 bg-white rounded-full flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-gray-800">{resource.matchScore}</span>
              <span className="text-xs text-gray-600 font-medium">Match</span>
            </div>
          </div>

          {/* Cost Badge */}
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold shadow-md ${
              resource.cost === 'Free' 
                ? 'bg-green-500 text-white' 
                : resource.cost === 'Paid' 
                ? 'bg-blue-500 text-white'
                : 'bg-yellow-500 text-white'
            }`}>
              {resource.cost || 'Free'}
            </span>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-black text-xl mb-1 hover:text-blue-600 transition-colors cursor-pointer" onClick={handleClick}>
                {resource.title}
              </h3>
              {resource.platform && (
                <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                    {resource.platform}
                  </span>
                </p>
              )}
            </div>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={22} />
            </a>
          </div>
          
          {/* Description */}
          <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">
            {resource.description || 'Enhance your skills with this comprehensive learning resource'}
          </p>

          {/* Why Recommended Section */}
          {matchDetails && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="text-blue-600" size={20} />
                <h4 className="font-semibold text-gray-800 text-sm">Why This Resource is Perfect For You</h4>
              </div>
              
              <div className="space-y-2">
                {/* Matching Skills - Improve existing */}
                {matchDetails.improvementSkills && matchDetails.improvementSkills.length > 0 && (
                  <div className="flex items-start gap-2">
                    <TrendingUp className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                    <div className="flex-1">
                      <span className="text-sm text-gray-700 font-medium">
                        Improve your existing skills:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {matchDetails.improvementSkills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium capitalize">
                            {skill}
                          </span>
                        ))}
                        {matchDetails.improvementSkills.length > 4 && (
                          <span className="px-2 py-0.5 text-green-700 text-xs font-medium">
                            +{matchDetails.improvementSkills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* New Skills to Learn */}
                {matchDetails.newSkills && matchDetails.newSkills.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Rocket className="text-purple-600 flex-shrink-0 mt-0.5" size={16} />
                    <div className="flex-1">
                      <span className="text-sm text-gray-700 font-medium">
                        Learn new skills:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {matchDetails.newSkills.slice(0, 4).map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium capitalize">
                            {skill}
                          </span>
                        ))}
                        {matchDetails.newSkills.length > 4 && (
                          <span className="px-2 py-0.5 text-purple-700 text-xs font-medium">
                            +{matchDetails.newSkills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Career Goal Match */}
                {matchDetails.careerMatch && (
                  <div className="flex items-start gap-2">
                    <GraduationCap className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-gray-700">
                      <span className="font-medium">Aligns with your career goals</span> - Perfect for your target role
                    </span>
                  </div>
                )}

                {/* Education Match */}
                {matchDetails.educationMatch && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-teal-600 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-gray-700">
                      <span className="font-medium">Matches your field of study</span> - Relevant to your academic background
                    </span>
                  </div>
                )}

                {/* Project Stack Match */}
                {matchDetails.projectMatch && (
                  <div className="flex items-start gap-2">
                    <Tag className="text-orange-600 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm text-gray-700">
                      <span className="font-medium">Enhances your project skills</span> - Useful for your current projects
                    </span>
                  </div>
                )}
              </div>

              {/* Relevance Bar */}
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Relevance Score</span>
                  <span className="text-xs font-bold text-blue-600">{resource.matchScore}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getMatchColor(resource.matchScore)} transition-all duration-500`}
                    style={{ width: `${resource.matchScore}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Skills Tags */}
          {resource.relatedSkills && resource.relatedSkills.length > 0 && (
            <div className="flex items-start gap-2 pt-3 border-t border-gray-200">
              <Tag size={16} className="text-gray-500 mt-1 flex-shrink-0" />
              <div className="flex flex-wrap gap-1.5">
                {resource.relatedSkills.slice(0, 6).map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium capitalize border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
                {resource.relatedSkills.length > 6 && (
                  <span className="px-3 py-1 text-gray-500 text-xs font-medium">
                    +{resource.relatedSkills.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleClick}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              Start Learning
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedResourceCard;