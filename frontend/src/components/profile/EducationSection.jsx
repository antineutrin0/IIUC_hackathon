import { Edit2, GraduationCap, Plus } from "lucide-react";

const EducationSection = ({ education, onEdit, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black flex items-center gap-2">
          <GraduationCap className="text-green-600" size={24} />
          Education
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

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={idx} className="border-l-2 border-green-600 pl-4">
            <h3 className="font-semibold text-black">{edu.degree} in {edu.fieldOfStudy}</h3>
            <p className="text-gray-700">{edu.institution}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <span>{edu.startYear} - {edu.endYear}</span>
              {edu.grade && <span>• {edu.grade}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EducationSection;