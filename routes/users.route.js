import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser, verifyToken } from "../utils/verifyToken.util.js";

const router = express.Router();

//UPDATE
router.put("/:id",verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser , deleteUser);

//GET
router.get("/:id", verifyUser , getUser);

//GET ALL
router.get("/", verifyAdmin , getUsers);

export default router;
