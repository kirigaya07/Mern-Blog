import express from "express";
import { google, signup } from "../../contollers/auth/auth.js";
import { signin } from "../../contollers/auth/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);

export default router;
