import express from 'express'
import { createTour, getAllTour, getSingleTour, updateTour } from '../controller/TourController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post("/createtour",authenticate, restrict("admin"), createTour);
router.put("/updatetour/:id",authenticate, restrict("admin"),updateTour);
router.get("/getalltour", getAllTour);
router.get("/getsingletour/:id",getSingleTour);
router.get("/search/", getAllTour);


export default router;