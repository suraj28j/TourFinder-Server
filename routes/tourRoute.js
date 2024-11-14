import express from 'express'
import { createTour, findTour, getAllTour, getSingleTour, updateTour } from '../controller/tourController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

// "http://localhost:8000/api/v1/tour/..."
router.post("/createtour", authenticate, restrict("admin"), createTour);
router.put("/updatetour/:id",authenticate, updateTour); // restrict("admin")
router.get("/getalltour", getAllTour);
router.get("/getsingletour/:id", getSingleTour);
router.get("/findtour/:city",findTour);

export default router;