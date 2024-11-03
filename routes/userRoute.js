import express from 'express'
import { updateUser } from '../controller/userController.js';
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

router.put("/updateuser/:id",authenticate,updateUser);

export default router;