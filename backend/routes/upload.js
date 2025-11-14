import express from "express";
import upload from "../config/multer.js";

const uploadRoute = express.Router();

uploadRoute.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Cloudinary automatically uploads the file
    const fileUrl = req.file.path;   // secure cloudinary URL

    return res.json({
      success: true,
      url: fileUrl
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

export default uploadRoute;
