import { Briefcase, Calendar, ExternalLink, Edit2, Plus } from "lucide-react";
const ProjectsSection = ({ projects, onEdit, onAdd }) => {
  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black flex items-center gap-2">
          <Briefcase className="text-green-600" size={24} />
          Projects
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onAdd}
            className="text-green-600 hover:text-green-700"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={onEdit}
            className="text-green-600 hover:text-green-700"
          >
            <Edit2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {projects.map((project, idx) => (
          <div key={idx} className="border-l-2 border-green-600 pl-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-black text-lg">{project.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Calendar size={14} />
                  <span>
                    {formatDate(project.startDate)} - {project.isOngoing ? 'Present' : formatDate(project.endDate)}
                  </span>
                  {project.isOngoing && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                      Ongoing
                    </span>
                  )}
                </div>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>

            <p className="text-gray-700 mb-3">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm capitalize"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProjectsSection;