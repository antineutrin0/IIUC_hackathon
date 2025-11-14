import { useState } from "react";
import Modal from "./Modal";
import { Save, Plus, Trash } from "lucide-react";

const emptyProject = () => ({
  title: "",
  description: "",
  link: "",
  techStack: "",
  startDate: "",
  endDate: "",
  isOngoing: false,
});

const EditProjectsModal = ({ isOpen, onClose, projects = [], onSave }) => {
  const [list, setList] = useState(projects.map(p => ({ ...p, techStack: (p.techStack || []).join(', ') })) || []);

  // Reset when modal opens with fresh data
  if (isOpen && list.length === 0 && projects.length > 0) {
    // ensure initial load
    setList(projects.map(p => ({ ...p, techStack: (p.techStack || []).join(', ') })));
  }

  const handleAdd = () => setList(prev => [...prev, emptyProject()]);

  const handleRemove = (idx) => setList(prev => prev.filter((_, i) => i !== idx));

  const handleChange = (idx, field, value) =>
    setList(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));

  const handleSave = () => {
    // convert techStack string -> array of trimmed unique strings
    const normalized = list.map(p => ({
      ...p,
      techStack: (p.techStack || "")
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
    }));
    onSave({ projects: normalized });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Projects">
      <div className="space-y-4 max-h-[60vh] overflow-auto">
        {list.map((p, idx) => (
          <div key={idx} className="bg-white p-3 rounded border">
            <div className="flex justify-between items-center mb-2">
              <strong>Project {idx + 1}</strong>
              <button onClick={() => handleRemove(idx)} className="text-red-500">
                <Trash size={16} />
              </button>
            </div>

            <input className="w-full mb-2" placeholder="Title"
              value={p.title}
              onChange={(e) => handleChange(idx, "title", e.target.value)} />

            <textarea className="w-full mb-2" rows={2} placeholder="Description"
              value={p.description}
              onChange={(e) => handleChange(idx, "description", e.target.value)} />

            <input className="w-full mb-2" placeholder="Link (optional)"
              value={p.link}
              onChange={(e) => handleChange(idx, "link", e.target.value)} />

            <input className="w-full mb-2" placeholder="Tech stack (comma separated)"
              value={p.techStack}
              onChange={(e) => handleChange(idx, "techStack", e.target.value)} />

            <div className="flex gap-2">
              <input type="date" value={p.startDate?.slice(0,10) || ""} onChange={(e)=>handleChange(idx,"startDate", e.target.value)} />
              <input type="date" value={p.endDate?.slice(0,10) || ""} onChange={(e)=>handleChange(idx,"endDate", e.target.value)} />
              <label className="flex items-center gap-1 ml-auto">
                <input type="checkbox" checked={p.isOngoing} onChange={(e)=>handleChange(idx,"isOngoing", e.target.checked)} />
                Ongoing
              </label>
            </div>
          </div>
        ))}

        <div className="flex gap-2">
          <button onClick={handleAdd} className="px-3 py-2 border rounded flex items-center gap-2">
            <Plus size={14} /> Add project
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

export default EditProjectsModal;
