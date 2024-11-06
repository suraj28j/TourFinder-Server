import express from 'express'
import { createTour, getAllTour, getSingleTour, updateReview, updateTour } from '../controller/TourController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

// "http://localhost:8000/api/v1/tour/..."
router.post("/createtour", authenticate, restrict("admin"), createTour);
router.put("/updatetour/:id", authenticate, restrict("admin"), updateTour);
router.post("/updatereview/:id", updateReview);
router.get("/getalltour", getAllTour);
router.get("/getsingletour/:id", getSingleTour);
router.get("/search/", getAllTour);


export default router;