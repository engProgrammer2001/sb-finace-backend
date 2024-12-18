import multer from "multer";
import Favicon from "../models/favicon.model.js";

// Multer Configuration for File Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};


export const upload = multer({ storage, fileFilter });

export const uploadFaviconLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    // Save file path to database
    const newLogo = new Favicon({
      image: req.file.path, 
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
export const getAllFaviconLogo = async (req, res) => {
  try {
    const logos = await Favicon.find().sort({ createdAt: -1 });
    res.status(200).json(logos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// delete logo
export const deleteFaviconLogo = async (req, res) => {
  try {
    const logo = await Favicon.findByIdAndDelete(req.params.id);
    if (!logo) {
      return res.status(404).json({ message: "Logo not found." });
    }
    res.status(200).json({ message: "Logo deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
