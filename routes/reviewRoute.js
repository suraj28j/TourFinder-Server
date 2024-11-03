import express from 'express'
import { createReview } from '../controller/reviewController.js';

const router = express.Router();

// "http://localhost:8000/api/v1/tour/review"
router.post("/review", createReview);


export default router;