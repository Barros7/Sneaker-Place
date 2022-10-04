import express from "express";
import {createUser, login} from "../controllers/login.js";

const router = express.Router();

router.post("/login",login);
router.post("/signIn", createUser);
router.post("/updateUser", updateUser);

export default router;
