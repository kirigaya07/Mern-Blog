import express from "express";
import { test } from "../../contollers/user/user.js";

const router = express.Router();

router.get("/test", test);

export default router;
