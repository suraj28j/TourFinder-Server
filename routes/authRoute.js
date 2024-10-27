import express from 'express'
import { loginUser, registerUser } from "../controller/authController.js";

const router = express.Router();

router.post("/registeruser",registerUser);
router.post("/loginuser",loginUser);


export default router;