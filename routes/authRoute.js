import express from 'express'
import { loginUser, registerUser } from "../controller/authController.js";

const router = express.Router();

// http://localhost:8000/api/v1/auth/...
router.post("/registeruser",registerUser);
router.post("/loginuser", loginUser);


export default router;