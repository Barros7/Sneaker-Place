import express from "express";
import Login from "../controllers/login.js";

const router = express.Router();

router.get("/login", Login);

export default router;
