import express from "express";
import { signup } from "../../contollers/auth/auth.js";

const router = express.Router();

router.post("/signup", signup);

export default router;
