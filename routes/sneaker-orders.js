import express from "express";
import orderController from "../controllers/order.js";
import { validateRequestBody, validateDataIntegrity } from "./../middleware.js";

const router = express.Router();

router.get("/getAll", orderController.getAll);
router.get("/getOrder",validateRequestBody, validateDataIntegrity, orderController.get);
router.put("/createOrder",validateRequestBody, validateDataIntegrity, orderController.create);

export default router;
