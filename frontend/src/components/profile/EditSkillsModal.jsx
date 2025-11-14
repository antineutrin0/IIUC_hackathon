import { useState } from "react";
import Modal from "./Modal";
import { Save } from "lucide-react";

const EditSkillsModal = ({ isOpen, onClose, skills = [], onSave }) => {
  const [input, setInput] = useState("");
  const [list, setList] = useState(skills || []);

  if (isOpen && list.length === 0 && skills.length > 0) setList(skills);

  const addSkill = () => {
    const s = input.trim();
    if (!s) return;
    const normalized = s.toLowerCase();
    if (list.map(x => x.toLowerCase()).includes(normalized)) {
      setInput("");
      return;
    }
    setList(prev => [...prev, s]);
    setInput("");
  };

  const removeSkill = (idx) => setList(prev => prev.filter((_, i) => i !== idx));

  const handleSave = () => {
    // backend schema will set to lowercased & unique, but we send array
    onSave({ skills: list });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Skills">
      <div className="space-y-4">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a skill and press Add" className="flex-1" />
          <button onClick={addSkill} className="px-3 py-2 border rounded">Add</button>
        </div>

        <div className="flex flex-wrap gap-2">
          {list.map((s, i) => (
            <span key={i} className="bg-white px-3 py-1 rounded border flex items-center gap-2">
              {s}
              <button onClick={() => removeSkill(i)} className="text-red-500">x</button>
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSkillsModal;
