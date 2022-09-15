import express from "express";
import salesController from "../controllers/sales.js";

const router = express.Router();

router.get("/getSale", salesController.get);
router.put("/createSale", salesController.create);

export default router;
