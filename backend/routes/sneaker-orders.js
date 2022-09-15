import express from "express";
import orderController from "../controllers/order.js";

const router = express.Router();

router.get("/getOrder", orderController.get);
router.put("/createOrder", orderController.create);

export default router;
