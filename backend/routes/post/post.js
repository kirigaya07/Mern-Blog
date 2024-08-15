import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import { create } from "../../contollers/post/post.js";

const router = express.Router();

router.post("/create", verifyToken, create);

export default router;
