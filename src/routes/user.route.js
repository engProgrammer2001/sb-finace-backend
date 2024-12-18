import express from "express";
import { getAllUsers, getUserProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/update-profile", isAuthenticated, updateProfile);
router.get("/get-user-profile", isAuthenticated, getUserProfile);
router.get("/get-all-user-profile", isAuthenticated, getAllUsers);




export default router;
