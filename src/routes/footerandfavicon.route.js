import express from "express";
import {
  deleteFooterLogo,
  getAllFooterLogo,
  upload,
  uploadFooterLogo,
} from "../controllers/footerandfavicon.controller.js";

const router = express.Router();

router.post("/upload-footer-logo", upload.single("image"), uploadFooterLogo);
router.get("/get-all-footer-logo", getAllFooterLogo);
router.delete("/delete-footer-logo/:id", deleteFooterLogo);

export default router;
