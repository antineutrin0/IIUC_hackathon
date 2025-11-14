import { useState } from "react";
import Modal from "./Modal";
import { Save } from "lucide-react";

const EditCvModal = ({ isOpen, onClose, cvText = "", cvLink = "", onSave }) => {
  const [text, setText] = useState(cvText);
  const [link, setLink] = useState(cvLink);

  if (isOpen && (text === "" && cvText)) setText(cvText);
  if (isOpen && (link === "" && cvLink)) setLink(cvLink);

  const handleSave = () => {
    onSave({ cvText: text, cvLink: link });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit CV">
      <div className="space-y-4">
        <label className="block text-sm">CV Text / Summary</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={6} className="w-full border rounded-2xl" />

        <label className="block text-sm">CV Link (public URL)</label>
        <input value={link} onChange={e => setLink(e.target.value)} className="w-full border rounded-2xl" />

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"><Save size={16} /> Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCvModal;
