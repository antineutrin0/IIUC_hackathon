import { useState, useEffect } from "react";
import Modal from "./Modal";
import { Save } from "lucide-react";
import axios from "axios";
import { getData } from "@/context/userContext";
import { useNavigate } from "react-router-dom";

const EditCvModal = ({ isOpen, onClose, cvText = "", cvLink = "", onSave }) => {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const { user } = getData();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  // ✔ Load cvText + cvLink when modal opens
  useEffect(() => {
    if (isOpen) {
      setText(cvText || "");
      setLink(cvLink || "");
    }
  }, [isOpen, cvText, cvLink]);

  const handleSave = async (e) => {
    setText(e.target.value);
    setLink(e.target.value);
    const newtext = text
      .replace(/[^a-zA-Z0-9 .,;:!?@()\n\r]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    console.log("Saving CV data:", { newtext, link });

    try {
      const res = await axios.post(
        `https://iiuc-hackathon-backend.vercel.app/profile/update-from-cv`,
        {
          cvText: text,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data) {
        navigate("/user/profile");
      }

      console.log("Profile updated:", res.data);
      onSave?.(); // optional callback
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response?.data || err.message,
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit CV">
      <div className="space-y-4">
        <label className="block text-sm">CV Text / Summary</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full border rounded-2xl"
        />

        <label className="block text-sm">CV Link (public URL)</label>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full border rounded-2xl"
        />

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
          >
            <Save size={16} /> Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCvModal;
