import express from 'express'
import { createTour } from '../controller/TourController.js';

const router = express.Router();

router.post("/createtour",createTour);

export default router;