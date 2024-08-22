import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import { CreateComment } from "../../contollers/comment/comment.js";

const router = express.Router();

router.post("/create", verifyToken, CreateComment);

export default router;
