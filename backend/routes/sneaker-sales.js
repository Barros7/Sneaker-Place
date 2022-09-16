import express from "express";
import salesController from "../controllers/sales.js";
import { validateRequestBody, validateDataIntegrity } from "./../middleware.js";

const router = express.Router();

router.get("/getAll", salesController.getAll);
router.get("/get",validateRequestBody, validateDataIntegrity, salesController.get);
router.put("/create",validateRequestBody, validateDataIntegrity, salesController.create);

export default router;
