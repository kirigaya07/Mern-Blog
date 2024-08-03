import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user/user.js";
import authRoutes from "./routes/auth/auth.js";

dotenv.config();

const url = process.env.MONGODB_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
