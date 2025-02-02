import express from "express";
import { createReservation, getReservations, removeReservation } from "../controllers/reservation.controller.js";

const router = express.Router();

router.get("/", getReservations);
router.post("/", createReservation);
router.delete("/:id", removeReservation);

export default router;
 