import express from "express";
import {
  deleteLoanData,
  getLoanData,
  PostLoanData,
} from "../controllers/applyLoan.controller.js";

const router = express.Router();


router.post("/apply-loan", PostLoanData);
router.get("/get-loan-data", getLoanData);
router.delete("/delete-loan-data/:id", deleteLoanData);

export default router;
