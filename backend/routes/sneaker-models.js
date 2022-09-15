import express from "express";
import sModelController from "../controllers/s-models.js";

const router = express.Router();

router.get("/getModel", sModelController.get);
router.post("/updateModel", sModelController.update);
router.put("/createModel", sModelController.create);

export default router;
