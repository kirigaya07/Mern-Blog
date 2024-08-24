import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import {
  CreateComment,
  deleteComment,
  editComment,
  GetPostComment,
  likeComment,
} from "../../contollers/comment/comment.js";

const router = express.Router();

router.post("/create", verifyToken, CreateComment);
router.get("/getPostComments/:postId", GetPostComment);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);

export default router;
