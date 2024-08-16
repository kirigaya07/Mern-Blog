import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import { create, getPost } from "../../contollers/post/post.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPost);

export default router;
