import express from "express";
import {createUser, login} from "../controllers/login.js";

const router = express.Router();

router.get("/login", login);
router.post("/signIn", createUser);

export default router;
