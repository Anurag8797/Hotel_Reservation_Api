import Room from "../models/Room.model.js";
import Hotel from "../models/Hotel.model.js";
import { createError } from "../utils/error.util.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const saveRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: saveRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(201).json({
      status: "Room has been created.",
      saveRoom,
    });
  } catch (err) {
    next(err);
  }
};


export const updateRoom = async (req, res, next) => {
    try {
      const updateRoom = await Room.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        status: "Room has been updated.",
        updateRoom,
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const deleteRoom = async (req, res, next) => {
      const hotelId = req.params.hotelId;
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id},
        });
      } catch (err) {
        next(err);
      }
    try {
      await Room.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success, Room has been deleted!",
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const getRoom = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id);
      res.status(200).json({
        status: "success",
        room,
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const getRooms = async (req, res, next) => {
    try {
      const rooms = await Room.find();
      res.status(200).json({
        status: "success",
        rooms,
      });
    } catch (err) {
      next(err);
    }
  };
