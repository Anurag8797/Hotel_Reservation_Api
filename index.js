import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import authRoute from "./routes/auth.route.js";
import usersRoute from "./routes/users.route.js";
import hotelsRoute from "./routes/hotels.route.js";
import roomsRoute from "./routes/rooms.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors({
  origin:"http://localhost:3000"
}));
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDb.");
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("monogDb disconnected😞");
});

//middleware
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8000, () => {
  connect();
  console.log("Connected to backend😊");
});
