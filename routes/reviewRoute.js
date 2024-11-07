import express from 'express'
import { createReview, getReview } from '../controller/reviewController.js';
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

// "http://localhost:8000/api/v1/tour/review"
router.post("/createreview",authenticate, createReview);
router.get("/getreview/:id",getReview);

export default router;