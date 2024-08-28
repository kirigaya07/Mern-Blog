import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import {
  create,
  deletepost,
  getPost,
  updatepost,
} from "../../contollers/post/post.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPost);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);

export default router;
