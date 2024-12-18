import express from "express";
import {
  deleteFaviconLogo,
  getAllFaviconLogo,
  upload,
  uploadFaviconLogo,
} from "../controllers/favicon.controller.js";

const router = express.Router();


router.post("/upload-favicon-logo", upload.single("image"), uploadFaviconLogo);
router.get("/get-all-favicon-logo", getAllFaviconLogo);
router.delete("/delete-favicon-logo/:id", deleteFaviconLogo);




export default router;
