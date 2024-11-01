import express from 'express'
import { createTour, getAllTour, getSingleTour } from '../controller/TourController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post("/createtour",authenticate, restrict("admin"), createTour);
router.get("/getalltour", getAllTour);
router.get("/getsingletour/:id",getSingleTour)

export default router;