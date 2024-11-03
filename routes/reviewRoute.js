import express from 'express'
import { createReview, getReview } from '../controller/reviewController.js';

const router = express.Router();

// "http://localhost:8000/api/v1/tour/review"
router.post("/review", createReview);
router.get("/review/:id",getReview);

export default router;