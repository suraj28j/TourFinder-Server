import express from 'express'
import { createBooking } from '../controller/bookingController.js';
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

// http://localhost:8000/api/v1/booking/...
router.post("/createbooking",authenticate,createBooking);

export default router;