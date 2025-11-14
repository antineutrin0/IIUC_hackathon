import { useState } from "react";
import Modal from "./Modal";
import { Save, Plus, Trash } from "lucide-react";

const emptyLang = () => ({ name: "", proficiency: "Conversational" });

const EditLanguagesModal = ({ isOpen, onClose, languages = [], onSave }) => {
  const [list, setList] = useState(languages || []);
  if (isOpen && list.length === 0 && languages.length > 0) setList(languages);

  const handleAdd = () => setList(prev => [...prev, emptyLang()]);
  const handleRemove = (i) => setList(prev => prev.filter((_, idx) => idx !== i));
  const handleChange = (i, field, value) => setList(prev => prev.map((it, idx) => idx === i ? { ...it, [field]: value } : it));

  const handleSave = () => {
    const normalized = list.map(l => ({ name: l.name.trim(), proficiency: l.proficiency }));
    onSave({ languages: normalized });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Languages">
      <div className="space-y-4">
        {list.map((l, idx) => (
          <div key={idx} className="bg-white p-3 rounded border flex items-center gap-2">
            <input placeholder="Language" value={l.name} onChange={(e) => handleChange(idx, "name", e.target.value)} className="flex-1" />
            <select value={l.proficiency} onChange={(e) => handleChange(idx, "proficiency", e.target.value)}>
              <option>Basic</option>
              <option>Conversational</option>
              <option>Fluent</option>
              <option>Native</option>
            </select>
            <button onClick={() => handleRemove(idx)} className="text-red-500"><Trash size={16} /></button>
          </div>
        ))}

        <div className="flex gap-2">
          <button onClick={handleAdd} className="px-3 py-2 border rounded flex items-center gap-2"><Plus size={14} /> Add</button>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditLanguagesModal;
