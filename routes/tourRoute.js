import express from 'express'
import { createTour, getAllTour } from '../controller/TourController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post("/createtour",authenticate, restrict("admin"), createTour);
router.get("/getalltour", getAllTour);

export default router;