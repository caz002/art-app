import express from "express";
import {
    handleRegister,
    handleLogin,
    handleLogout,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

export default router;
