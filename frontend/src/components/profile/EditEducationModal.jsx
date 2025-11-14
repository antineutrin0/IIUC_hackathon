import { useState } from "react";
import Modal from "./Modal";
import { Save, Plus, Trash } from "lucide-react";

const emptyEducation = () => ({
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startYear: "",
  endYear: "",
  grade: ""
});

const EditEducationModal = ({ isOpen, onClose, education = [], onSave }) => {
  const [list, setList] = useState(education || []);

  if (isOpen && list.length === 0 && education.length > 0) {
    setList(education);
  }

  const handleAdd = () => setList(prev => [...prev, emptyEducation()]);
  const handleRemove = (i) => setList(prev => prev.filter((_, idx) => idx !== i));
  const handleChange = (i, field, value) => setList(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  const handleSave = () => {
    // convert string years to numbers where applicable
    const normalized = list.map(e => ({
      ...e,
      startYear: e.startYear ? Number(e.startYear) : undefined,
      endYear: e.endYear ? Number(e.endYear) : undefined,
    }));
    onSave({ education: normalized });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Education">
      <div className="space-y-4 max-h-[60vh] overflow-auto">
        {list.map((edu, idx) => (
          <div key={idx} className="bg-white p-3 rounded border">
            <div className="flex justify-between items-center mb-2">
              <strong>Education {idx + 1}</strong>
              <button onClick={() => handleRemove(idx)} className="text-red-500">
                <Trash size={16} />
              </button>
            </div>

            <input placeholder="Institution" value={edu.institution} onChange={e => handleChange(idx, 'institution', e.target.value)} className="w-full mb-2" />
            <input placeholder="Degree" value={edu.degree} onChange={e => handleChange(idx, 'degree', e.target.value)} className="w-full mb-2" />
            <input placeholder="Field of Study" value={edu.fieldOfStudy} onChange={e => handleChange(idx, 'fieldOfStudy', e.target.value)} className="w-full mb-2" />

            <div className="flex gap-2">
              <input type="number" placeholder="Start Year" value={edu.startYear || ""} onChange={e => handleChange(idx, 'startYear', e.target.value)} className="w-1/2" />
              <input type="number" placeholder="End Year" value={edu.endYear || ""} onChange={e => handleChange(idx, 'endYear', e.target.value)} className="w-1/2" />
            </div>

            <input placeholder="Grade (optional)" value={edu.grade} onChange={e => handleChange(idx, 'grade', e.target.value)} className="w-full mt-2" />
          </div>
        ))}

        <div className="flex gap-2">
          <button onClick={handleAdd} className="px-3 py-2 border rounded flex items-center gap-2">
            <Plus size={14} /> Add education
          </button>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2">
            <Save size={16} /> Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditEducationModal;
