import multer from "multer";
import Logo from "../models/logo.model.js";

// Multer Configuration for File Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

// File Filter (Optional: Accept only image types)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Upload Middleware
export const upload = multer({ storage, fileFilter });

// Controller to Handle Upload
export const uploadLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    // Save file path to database
    const newLogo = new Logo({
      image: req.file.path, // Store file path
    });

    await newLogo.save();

    res.status(201).json({
      message: "Logo uploaded successfully.",
      logoUrl: `http://localhost:5000/${req.file.path}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// get all images.
export const getAllLogos = async (req, res) => {
  try {
    const logos = await Logo.find().sort({ createdAt: -1 });
    res.status(200).json(logos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// delete logo
export const deleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findByIdAndDelete(req.params.id);
    if (!logo) {
      return res.status(404).json({ message: "Logo not found." });
    }
    res.status(200).json({ message: "Logo deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
