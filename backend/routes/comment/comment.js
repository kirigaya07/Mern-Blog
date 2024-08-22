import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import {
  CreateComment,
  GetPostComment,
} from "../../contollers/comment/comment.js";

const router = express.Router();

router.post("/create", verifyToken, CreateComment);
router.get("/getPostComments/:postId", GetPostComment);

export default router;
