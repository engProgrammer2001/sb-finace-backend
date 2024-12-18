import express from "express";

import {
  deleteLogo,
  getAllLogos,
  upload,
  uploadLogo,
} from "../controllers/uploadLogo.controller.js";
const router = express.Router();

router.post("/upload-logo", upload.single("image"), uploadLogo);
router.get("/get-all-logo", getAllLogos);
router.delete("/delete-logo/:id", deleteLogo);

export default router;
