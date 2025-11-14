import React, { useState } from "react";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");

  // HANDLE FILE SELECTION
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setUploadedUrl("");
  };

  // HANDLE UPLOAD
  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await fetch("http://localhost:8000/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Upload failed");
        setUploading(false);
        return;
      }

      setUploadedUrl(data.url); // Cloudinary URL
      setUploading(false);
    } catch (err) {
      setError("Upload error. Try again.");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload a File</h2>

      {/* File Input */}
      <div className="border border-gray-300 p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition">
        <input
          type="file"
          className="w-full"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full mt-4 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {/* Error */}
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

      {/* Success */}
      {uploadedUrl && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-700 font-medium">File uploaded successfully!</p>
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline break-all"
          >
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
