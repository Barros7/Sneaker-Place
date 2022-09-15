import express from "express";
import {createUser, login} from "../controllers/login.js";

const router = express.Router();

router.get("/login", login);
router.post("/sign_in", createUser);
router.post("/log_out", login);

export default router;
