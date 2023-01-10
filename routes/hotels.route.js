import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.controller.js";
import { verifyAdmin } from "../utils/verifyToken.util.js";

const router = express.Router();

//create
router.post("/", verifyAdmin, createHotel);

//update
router.put("/:id", verifyAdmin, updateHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

//get
router.get("/find/:id", getHotel);

//get all
router.get("/", getHotels);

//get hotel by cityName
router.get("/countByCity", countByCity);

//get hotel by hotelType
router.get("/countByType", countByType);

export default router;
