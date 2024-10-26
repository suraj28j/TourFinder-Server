import express from 'express'
import { registerUser } from "../controller/authController.js";

const router = express.Router();

router.post("/registeruser",registerUser);

export default router;