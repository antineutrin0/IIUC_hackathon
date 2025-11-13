import { Edit2, Code } from "lucide-react";

const SkillsSection = ({ skills, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black flex items-center gap-2">
          <Code className="text-green-600" size={24} />
          Skills
        </h2>
        <button
          onClick={onEdit}
          className="text-green-600 hover:text-green-700"
        >
          <Edit2 size={18} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-4 py-2 bg-green-50 text-green-600 rounded-lg font-medium capitalize"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
export default SkillsSection;