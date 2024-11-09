import express from 'express'
import { updateUser } from '../controller/userController.js';
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

// http://localhost:8000/api/v1/user/updateuser/...
router.put("/updateuser/:id",authenticate,updateUser);

export default router;