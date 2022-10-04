import express from "express";
import {createUser, updateUser, login} from "../controllers/login.js";

const router = express.Router();

router.post("/login",login);
router.post("/signIn", createUser);
router.put("/updateUser", updateUser);

export default router;
