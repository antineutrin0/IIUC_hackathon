import { Globe, Edit2 } from "lucide-react";
const LanguagesSection = ({ languages, onEdit }) => {
  const proficiencyColors = {
    'Basic': 'bg-gray-100 text-gray-700',
    'Conversational': 'bg-blue-100 text-blue-700',
    'Fluent': 'bg-green-100 text-green-700',
    'Native': 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-black flex items-center gap-2">
          <Globe className="text-green-600" size={24} />
          Languages
        </h2>
        <button
          onClick={onEdit}
          className="text-green-600 hover:text-green-700"
        >
          <Edit2 size={18} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {languages.map((lang, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="font-medium text-black mb-1">{lang.name}</span>
            <span className={`px-3 py-1 rounded text-sm font-medium text-center ${proficiencyColors[lang.proficiency]}`}>
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LanguagesSection;